

var LevelManage = LevelManage || {
	unlockLevelCount  : 0,
	
	level             : 0,
	score             : 0,
	starNum           : 0,
	steps             : 0,
	
	levelInfo         : 0,
	
	
	//初始化
	initLevelConfig : function(level) {
	    var levelInfo = this.getLevelInfo(level);
	    //cc.log("levelInfo.starnum"+levelInfo.starNum);
	    this.level = parseInt(levelInfo.level);
	    this.score = 0;
	    this.starNum = 0;
	    this.bestScore = parseInt(levelInfo.bestScore);
	    this.targetScore = parseInt(levelInfo.targetScore);
	    this.steps = parseInt(levelInfo.steps);
	    
	    this.levelInfo = levelInfo;
	    
	    for(var i = 1 ; i < Levels.length ; i++){
			var str = cc.sys.localStorage.getItem(i+"");
			if(str == null || str == ""){
			    if(i-1 == 0){
			    	this.unlockLevelCount = 1;
			    }else{
			    	this.unlockLevelCount = i - 1;
			    }
			    break;
			}
	    }
	    
	    cc.log("unlock = "+ this.unlockLevelCount);
	    cc.log("selected = "+ this.level);
	    
	},
	
	
	/**
	 * 获取关卡的配置信息
	 * @param level 关卡
	 * @returns
	 */
	getLevelInfo : function(level){
	    	level = level || this.level;
		if(level < 0)return;
		//sys.localStorage.removeItem(level+"");
		cc.log(cc.sys.localStorage.getItem(level+""));
		
		var levelInfo = null;
		var str = cc.sys.localStorage.getItem(level+"");
		
		if(str == null || str == ""){
		    if(level == 1){
			levelInfo = Levels[level];
		    }else{
			levelInfo = null;
		    }
		}else{
		    levelInfo = JSON.parse(str);
		}
		return levelInfo;
	},
	
	addScore : function(score){
		this.score += score;
	},
	
	updateLevelInfo : function() {
	    if(this.score > this.levelInfo.bestScore){
		this.levelInfo.starNum = this.starNum;
		this.levelInfo.bestScore = this.score;
		cc.sys.localStorage.setItem(this.level+"",JSON.stringify(this.levelInfo));
	    }
	    
	    //是否解锁新的关卡
	    if(this.level == this.unlockLevelCount){
		this.unLockLevel();
	    }
	    
	},
	
	unLockLevel : function(){
	    this.unlockLevelCount++;
	    cc.log("解锁新关卡："+this.unlockLevelCount);
	    var levelInfo = Levels[this.level+1];
	    cc.sys.localStorage.setItem(this.unlockLevelCount+"",JSON.stringify(levelInfo));
	    cc.log("解锁新关卡："+JSON.stringify(levelInfo));
	}
	
	
}