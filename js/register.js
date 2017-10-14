var app = new Vue({
	el:"#Table",
	data: {
		name:'',
		phone:'',
		office:'',
		identifyNum:'',
		identifyNum2:'',
		hash:'',
		secret:'',
		secretCode:'',
		isShow:'password',
		selected:'',
		apiUrl: 'http://120.24.211.212:7777/v1/users/signup',
		duanURL:'http://43.243.130.33:8860/sendSms',
		message:'',
		alldata:[],
		index_now:-1,
		edit_now:-1,
		countdown:60, 
		vcode:'获取验证码',
		vcodeShow:true,

	},
	created: function () {
	},
	mounted:function(){
		this.fetchData();
	},
	methods:{
		fetchData:function(){
			var that =this;
			//请求数据
			axios.get('http://120.24.211.212:7777/v1/dept')
			.then(function (response) {
				//部门返回的数据
				result = JSON.stringify(response);
				// console.log("返回的数据:"+result);
				// console.log("所需要的数据模型:"+ JSON.stringify(response.data.data.data));
				that.alldata = response.data.data.data;
				// console.log("查看赋值情况:"+ that.alldata[0].id);

			})
			.catch(function (error) {
				console.log("错误:"+error);
			});
		},

		identify:function(){
			let that = this;
			var instance = axios.create({
				timeout: 1000,
				async:true,
				crossDomain:true,
				params:{
					phone:that.phone,
				}
			});
			instance.get('http://120.24.211.212:7777/v1/users/requestcode')
			.then(function (response) {
				if (response.data.code != 200) {
					alert(response.data.message);
					return;
				}
				that.waitIdentify();
				console.log(JSON.stringify(response));
			})
			.catch(function (error) {
				console.log(error);
			});

		},

		waitIdentify:function(){
			console.log("开始倒计时");
			let me = this;
			this.vcodeShow = false;
			let interval = window.setInterval(function(){
				console.log("me.countdown"+me.countdown);
				if ((me.countdown-- ) <= 0 ) {
					
					me.countdown = 60;
					me.vcodeShow = true;
					me.vcode = "获取验证码";
					window.clearInterval(interval);
				}
				else{
					me.vcode = "还有"+me.countdown+"s获得验证码";
				}
			},1000);
		},
		confirm:function(){
			if (this.identifyNum == '') {
				window.alert("请先填写手机验证码。");
				return;
			}
			var result = '';
			var that = this;
			console.log("vcode:"+this.identifyNum);
			let param = new FormData();
			param.append("username",this.name);
			param.append("phone",this.phone);
			param.append("password",this.secret);
			param.append("confirm_password",this.secretCode);
			param.append("agree",true);
			param.append("vcode",this.identifyNum);

			axios.post(that.apiUrl, param)
			.then(function (response) {
				//注册返回的数据
				result = JSON.stringify(response);
				console.log("result："+result);
				//注册失败返回的数据
				let result2 = response.data.data.msg;
				//注册情况
				let msg1 = JSON.stringify(response.data.message);
				console.log("注册情况"+msg1);
				//注册情况返回成功字符
				if (msg1.indexOf("成功") > -1 ) {
					window.alert("注册成功"); 
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
	},
	register:function(){
		if (this.identifyNum == '') {
			alert("请先填写手机验证码。");
			return;
		}
		console.log("vcode:"+this.identifyNum);

	},

})
