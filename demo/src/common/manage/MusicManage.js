

var defaultMusic  = res.music_bg01_mp3 ;


var MusicManage = MusicManage || {
	flag    : false,
	musicBg : defaultMusic,
	
	play : function(){
		if(this.flag){
			if(!cc.audioEngine.isMusicPlaying()){
				cc.audioEngine.playMusic(this.musicBg, true);
			}	
		}
	},
	
	stop : function(){
		if(cc.audioEngine.isMusicPlaying()){
			cc.audioEngine.stopMusic(this.musicBg);
		}
	},
	
	pause : function(){
		if(cc.audioEngine.isMusicPlaying()){
			cc.audioEngine.pauseMusic();
		}
	},
	
	resume : function(){
		if(!cc.audioEngine.isMusicPlaying()){
			cc.audioEngine.resumeMusic();
		}
	},
	
	setFlag : function(boolean){
		this.flag = boolean;
	},
	
	setBgMusic : function(res){
		this.musicBg = res;
	},
	
	setMusicVolume : function(volume){
		cc.audioEngine.setMusicVolume(volume);
	},
	
	getMusicVolume : function(){
		return cc.audioEngine.getMusicVolume();
	}
	
	
}