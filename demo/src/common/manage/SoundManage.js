
var BTN_TOUCH = res.button_down_mp3;



var SoundManage = SoundManage || {
	flag    : true,  //音效控制标识，true表示打开,false关闭

	playEffect : function(soundId){
		if(this.flag){
			cc.audioEngine.playEffect(soundId);
		}
	},

	stopEffect : function(soundId){
		cc.audioEngine.stopEffect(soundId);
	},

	pauseEffect : function(soundId){
		cc.audioEngine.pauseEffect(soundId);
	},

	resumeEffect : function(soundId){
		cc.audioEngine.resumeEffect(soundId);
	}
}