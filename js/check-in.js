var app = new Vue({
	el:"#all",
	data:{
		id:'',
		token:'',
		checkText:'开会前五分钟才可以签到，签到目前关闭',
		checkDis:'disabled',
		checkString:'',
		alldata:'',
		meetId:'',
		api_url:'http://120.24.211.212:7777/v1/meeting',
		rand_num:'',
	},
	created:function(){    

		this.fetchData();
	},

	methods:{

		onBackClick:function(){
			location.href="lifeDetail.html";
		},


		fetchData:function(){
			let id = "id" + "=";
			let token = "token" + "=";
			var cookie = document.cookie.split(';');
			let that =this;
			for(var i=0; i<cookie.length; i++){
				var c = cookie[i].trim();
				if (c.indexOf(id)==0){
					that.id = c.substring(id.length,c.length);
				}
				if (c.indexOf(token)==0) {
					that.token = c.substring(token.length,c.length);
				}
			}
			console.log("获得的id"+that.id +"获得的token:"+that.token);


			var url=JSON.stringify(location.search);
			var url = location.search;  
			var theRequest = new Object();
			if (url.indexOf("?") != -1) {
				var str = url.substr(1);
				strs = str.split("&");
				for(var i = 0; i < strs.length; i ++) {
					theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
				}
			}
			console.log(theRequest.meetId);

			this.meetId = theRequest.meetId;

			axios.create({
				timeout: 1000,
				async:true,
				crossDomain:true,
				headers: {
					'id': that.id,
					'token':that.token,
				},
			})
			.get(that.api_url+'/'+theRequest.meetId)
			.then(function (response) {
				console.log(JSON.stringify(response));
				that.alldata = response.data.data.data;
				that.rand_num = that.alldata.rand_num;
				that.dateCopare();
            })
			.catch(function (error) {
				console.log(error);
			});
		},



		dateCopare:function(){
			let now = new Date();
			let that = this;
			var t1 = this.alldata.start_time;
			var d1 = t1.replace(/\-/g, "/");
			let beginTime = new Date(d1);
			
			var t2 = this.alldata.end_time;
			var d2 = t2.replace(/\-/g, "/");
            let endtime = new Date(d2);


			var timePart = parseInt(beginTime - now) / 1000 / 60;
			var timePart2 = parseInt(now - endtime) / 1000 / 60;

           // console.log(parseInt(beginTimez - now) / 1000 / 60);
            if (timePart2 >=15) {
            	this.checkText = "会议已结束15分钟以上，无法打卡!"
            	return;
            }          
 

       //    if (timePart <=5) {
          this.checkText = "请输入打卡验证码:"+ this.rand_num;

//   }

},



sure:function(){

          let instances  =	axios.create({
           		timeout: 1000,
           		async:true,
           		crossDomain:true,
           		headers: {
           			'id': this.id,
           			'token':this.token,
           		},
           	})

            let formData = new FormData();
            formData.append('rand_num', this.rand_num);

            instances.put('http://120.24.211.212:7777/v1/attend/'+this.meetId,formData)
            	  .then(function (response) {
                      
                      if (response.data.code != 200) {
                      	console.log(JSON.stringify(response));
                      	alert(response.data.message);
                      }
                      else{
                      	console.log(JSON.stringify(response));
                      	alert("打卡成功!");
                      }


            	  })
            	  .catch(function (error) {
                console.log(error);
            });
},





},
})