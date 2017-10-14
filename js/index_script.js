var app = new Vue({
	el:'#all',
	data:{
		HTitle:'生活圈',
		bodyCenter:'life_circe_item.html',
		beSelected:'life',
		LifeImg:'images/Home_selected.png',
		learnImg:"images/book.png",
		BBSImg:"images/note.png",
		MeImg:"images/my.png",
		seen: false,
	},
	methods:{
		returnGrey:function(){
			console.log(this.beSelected);
			if (this.beSelected == 'life') {
				this.LifeImg ='images/home.png';

			}
			else if(this.beSelected == 'learn'){
				this.learnImg='images/book.png';

			}
			else if (this.beSelected == 'BBS') {
				this.BBSImg ='images/note.png';

			}
			else if (this.beSelected == 'my1'){
				this.MeImg = 'images/my.png';
			}
			else{
				return;
			}
		},

		lifeCircle:function(){
			this.HTitle = '生活圈';
			this.LifeImg ='images/Home_selected.png';
			this.seen = false;
			this.returnGrey();
			this.beSelected ='life';
			this.bodyCenter = 'life_circe_item.html';

		},
		learnCircle:function(event){
			this.HTitle = '学习圈';
			this.learnImg = 'images/book_selected.png';
			this.seen = false;
			this.returnGrey();
			this.beSelected = 'learn';
			this.bodyCenter = 'Learn.html';

		},
		BBSCircle:function(event){
			this.HTitle = '党建论坛';
			this.BBSImg = 'images/Note_selected.png';
			this.seen = true;
			this.returnGrey();
			this.beSelected = 'BBS';
			this.bodyCenter = 'BBS.html';


		},
		MyCircle:function(event){
			this.HTitle = '我的档案';
			this.MeImg = 'images/my_selected.png';
			this.seen = false;
			this.returnGrey();
			this.beSelected = 'my1';
			this.bodyCenter = 'setting.html';
		},
		openNew:function(event){
			if (this.HTitle == '生活圈') {
				window.location.href=("./addMeeting.html");
			}
			else if (this.HTitle == '党建论坛') {
				window.location.href=("./addMessage.html");
			}else{
				return;
			}
		},
	},
})