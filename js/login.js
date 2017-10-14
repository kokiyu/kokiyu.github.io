var app = new Vue({
	el:'#body',
	data:{
		account	:'',
		password:'',
		api:"http://120.24.211.212:7777/v1/users/signin",
		user_id:'',
	},
	methods:{
		login:function(){
			console.log("this.account:"+this.account);
			console.log("this.password:"+this.password);
			var that = this;
			axios.post(that.api, {
				account: that.account,
				password:that.password,
			})
			.then(function (response) {
				//注册返回的数据
				result = JSON.stringify(response);
				console.log(result);
				//登录失败返回的数据
	            //登录失败返回的数据
	            let result2 = response.data.data.msg;
				//注册情况
				let msg1 = JSON.stringify(response.data.message);
				console.log("登录情况："+msg1);
                //登录情况返回成功字符
                if (msg1.indexOf("成功") > -1 ) {
                	var dt=response.data.data.data;
                	that.token = dt.token;
                	that.id = dt.id;
                	that.user_id =dt.user_id;
                	document.cookie="id="+that.id;
                	document.cookie="token="+that.token; 
                	document.cookie="name="+that.account;
                	document.cookie ="numb="+that.user_id;
                	window.location.href=("./main.html");
                }
                else{
                	let finResult = result2.join("，");
                	console.log(finResult);
                	window.alert(finResult); 
                }

            })
			.catch(function (error) {
				console.log("错误:"+error);
			});

		},
		forgetSecret:function(){
			window.location.href=("./forgetSecret.html");
		},
	},
})