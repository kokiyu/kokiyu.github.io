var app = new Vue({
	el:"#all",
	data:{
		alldata:[],
		api_url:"http://120.24.211.212:7777/v1/account/",
		name:'',
		nickname:'',
		sex:'',
		phone:'',
		birthday:'',
		education:'',
		hiredate:'',
		user_id:'',
	}, 
	created:function(){
		this.fetchData();
	},
	methods:{
		fetchData:function(){
			let id = "id" + "=";
			let token = "token" + "=";
			let that =this;
			var cookie = document.cookie.split(';');
			console.log(cookie);
			for(var i=0; i<cookie.length; i++) 
			{
				var c = cookie[i].trim().split('=');
				if (c[0].indexOf('id')>=0){
					this.id = c[1];
				}else if (c[0].indexOf('token')>=0) {
					this.token = c[1];
				}
				else if (c[0].indexOf('numb')>=0) {
					this.user_id = c[1];
				}
			}
			console.log("获得的id"+that.id +"获得的token:"+that.token);
			console.log("user_id:"+this.user_id);
			
			var instance = axios.create({
				timeout: 1000,
				async:true,
				crossDomain:true,
				headers: {
					'id': that.id,
					'token':that.token,
				},
			});

			let url = this.api_url+this.user_id;
			console.log(url);
			instance.get(url)
			.then(function (response) {

				if (response.data.code!=200) {
					alert(response.data.message);
					return;
				}
				console.log(JSON.stringify(response));
				that.alldata = response.data.data.data;
				that.nickname = that.alldata.nickname;
				that.sex = that.alldata.sex;
				that.phone = that.alldata.phone;
				that.birthday = that.alldata.birthday;
				that.education = that.alldata.education;
				that.hiredate = that.alldata.hiredate;
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		saveData:function(){
			console.log("保存");
			var instance = axios.create({
				timeout: 1000,
				async:true,
				crossDomain:true,
				headers: {
					'id': this.id,
					'token':this.token,
				},
			});

			let url = this.api_url+this.user_id;

			instance.put(url,{
				dept_id:1,
				nickname:this.nickname,
				sex:this.sex,
				birthday:this.birthday,
				education:this.education,
				hiredate:this.hiredate
			})
			.then(function (response) {
				if (response.data.code!=200) {
					alert(response.data.message);
					return;
				}
				alert(response.data.message);
			})
			.catch(function (error) {
				console.log(error);
			});
		},
	},
})