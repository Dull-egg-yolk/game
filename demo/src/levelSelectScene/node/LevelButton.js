
var LEVEL_STAR_NUM = 3;

var LevelButton = ccui.Button.extend({
	level : 0,
	ctor : function(levelNum){
		this._super(
			"res/ls/ls_level_normal.png",
			"res/ls/ls_level_selected.png",
			"res/ls/ls_level_disable.png"
		);
		this.loadLevelNum(levelNum);
		this.level = levelNum;
		
		var levelInfo = LevelManage.getLevelInfo(levelNum);
		if(levelInfo){
		    this.loadStar(levelInfo.starNum);
		}else{
		    this.setEnabled(false);
		    this.setBright(false);
		}
	},
	
	loadLevelNum : function(level){
	    level = level || 0;
		this.setTitleText(level);
		this.setTitleFontSize(36);
	},
	
	loadStar : function(starNum){
		starNum = starNum || 0;
		var space = 5;
		for(var i = 0 ; i < starNum ; i++){
		    star = new cc.Sprite("res/ls/ls_star01.png");
			var x = 24 + 20 * i;
			var y = 26;
			star.setPosition(x, y);
			this.addChild(star);
		}
	}
});