var app = new Vue({
	el:'.line',
	data:{
		api_url:"http://120.24.211.212:7777/v1/category",
		id:null,
		token:null,
		alldata:[],
	},
	created:function(){
		this.fetchData();
	},
	methods:{
		fetchData:function(){
 			//请求数据
 			this.getCookie();
 			this.axiosCreate({
 				'id': this.id,
 				'token':this.token,
 			})
 			.get(this.api_url)
 			.then(this.handleData)
 			.catch(function (error) {
 				console.log("错误:"+error);
 			})
 			;
 		},
 		handleData:function(response){
			//数据返回分类
			console.log(JSON.stringify(response));
			var rData=response.data;
			if (rData.code==200) {
				this.alldata = rData.data.data;
				console.log(this.row)
			}
			else {
				alert(rData.message);
			}
		},
 		getCookie:function(){
 			var cookie = document.cookie.split(';');
 			for(var i=0; i<cookie.length; i++) 
 			{
 				var c = cookie[i].trim().split('=');
 				if (c[0].indexOf('id')>=0){
 					this.id = c[1];
 				}else if (c[0].indexOf('token')>=0) {
 					this.token = c[1];
 				}
 			}
 			console.log(this.id+"::::"+this.token);
 		}, 
 		axiosCreate:function(headers){
 			return axios.create({
 				timeout: 1000,
 				async:true,
 				crossDomain:true,
 				headers: headers
 			});
 		},
 		onClick:function(event){
			var selectLearn = JSON.stringify(event);
			sessionStorage.setItem('selectLearn',selectLearn);
			console.log(selectLearn);
			window.top.location.href=("./learning.html");
		},
	},
});