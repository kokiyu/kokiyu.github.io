var app = new Vue({
    el:"#all",
    data: {
        title:'',
        location:'',
        start_time:'',
        end_time:'',
        describe:'',
        dept_ids:'',
        id:'',
        token:'',
        api_url:'http://120.24.211.212:7777/v1/meeting',
        alldata:'',
        cardData:[],
        meetId:'',
        users:'',
        image:'',
        start_time:'',
        start_time2:'',
        end_time:'',
        end_time2:'',
        checkinid:'check-in.html?meetId='

    },
    created:function(){
        this.fetchData();
    },

    methods:{
        dakaData:function(){
            let that = this;
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
            var instance = axios.create({
                timeout: 1000,
                async:true,
                crossDomain:true,
                headers: {
                    'id': that.id,
                    'token':that.token,
                },
            });
            instance.get('http://120.24.211.212:7777/v1/attend/'+theRequest.meetId)
            .then(function (response) {
                console.log("打卡情况:"+JSON.stringify(response));
                that.cardData = response.data.data.data;

            })
            .catch(function (error) {
                console.log(error);
            });

        },

        cardPeople:function(){
            let that = this;
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

            var instance = axios.create({
                timeout: 1000,
                async:true,
                crossDomain:true,
                headers: {
                    'id': that.id,
                    'token':that.token,
                },
            });

            instance.post('http://120.24.211.212:7777/v1/attend',{
                meeting_id:that.meetId,
                users:that.users,
            })
            .then(function (response) {
                console.log("点名打卡人员:"+JSON.stringify(response));

            })
            .catch(function (error) {
                console.log(error);
            });

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
                that.title = that.alldata.title;
                that.location = that.alldata.location;
                that.start_time = that.alldata.start_time;
                that.end_time = that.alldata.end_time;
                that.describe = that.alldata.describe;
                that.dept_ids = that.alldata.dept_ids;
                that.start_time = that.alldata.start_time.substring(0,11);
                that.start_time2 = that.alldata.start_time.substring(11);
                that.end_time = that.alldata.end_time.substring(0,11);
                that.end_time2 = that.alldata.end_time.substring(11);
                that.checkinid = that.checkinid + that.alldata.id;
                if (that.alldata.image !="") {
                    that.image = that.alldata.image;
                    console.log("获取信息成功:"+that.alldata.title);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            that.dakaData();
        },
        saveData:function(){
            let that = this;
            var instance = axios.create({
                timeout: 1000,
                async:true,
                crossDomain:true,
                headers: {
                    'id': that.id,
                    'token':that.token,
                },
            });
            instance.put(that.api_url+'/'+that.meetId,{
                'title': that.title,
                'location': that.location,
                'start_time': that.start_time,
                'end_time': that.end_time,
                'describe': that.describe,
                'dept_ids': that.dept_ids,
                image:that.image,
                'users':that.users,
            })
            .then(function (response) {
                console.log(JSON.stringify(response));
                console.log("message:"+response.data.message);
                if (response.data.message == "修改成功") {
                    alert("修改成功！");
                    location.href = "meeting.html";
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        deleteDept:function(){
            var that = this;
            var url = that.api_url +'/' + this.meetId;
            console.log("删除的会议 ："+url);
            console.log(that.id);
            console.log(that.token);
            var instance = axios.create({
                timeout: 1000,
                async:true,
                crossDomain:true,
                headers: {
                    'id': that.id,
                    'token':that.token,
                },
            })
            .delete(url)
            .then(function (response) {
                console.log(JSON.stringify("删除后获得的响应:"+response));
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        fileClick:function(){
            document.getElementById('upload_file').click();
        },
        fileChange:function(el){
            if (!el.target.files[0].size){return;}
            var file= el.target.files[0];
            this.uploadFile(file);
        },
        uploadFile:function(file){ 
            let that=this;
            let files = new FormData();
            files.append('file',file,file.name);
            var instance = axios.create({
                timeout: 1000,
                async:true,
                crossDomain:true,
                headers: {
                    'id': that.id,
                    'token':that.token,
                },
            });
            axios.post('http://120.24.211.212:7777/v1/utils/file',files)
            .then(function(response){
                console.log(JSON.stringify(response));
                alert(response.data.message);
                if (response.data.code==200) {
                    that.image=response.data.data.image_url;
                }
            });
        },
        
      
    }, 
}) 