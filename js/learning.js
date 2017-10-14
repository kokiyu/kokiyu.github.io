var app = new Vue({
	el:'#rootView',
	data:{
		api_url:"http://120.24.211.212:7777/v1/article?c_id=",
		id:null,
		token:null,
		alldata:[],
		learn:null,
	},
	created:function(){
		this.fetchData();
	},
	
	methods:{
		fetchData:function(){
 			//请求数据
 			var arr = sessionStorage.getItem('selectLearn');
 			this.learn = JSON.parse(arr);
 			this.getCookie();
 			this.axiosCreate({
 				'id': this.id,
 				'token':this.token,
 			})
 			.get(this.api_url+this.learn.id)
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
 			var url=JSON.stringify(event);
			sessionStorage.setItem('selectLearnSub',url);
 			console.log(url);
			window.location.href=("./learning_sub.html");
 		},
 		onBackClick:function(){
 			window.history.go(-1);
 		},
	},
});