


var SMainLayer = cc.Layer.extend({
	panel : null,
	ctor : function(){
		this._super();
		size = cc.winSize;
		var levelInfo = LevelManage.levelInfo;
		this.loadPanel();
		this.loadStar(LevelManage.starNum);
		this.loadScore(LevelManage.score, levelInfo.bestScore, levelInfo.targetScore);
		this.loadButton();
		LevelManage.updateLevelInfo();
	},

	loadPanel : function(){
		var panel = new cc.Sprite("res/sf/s_panel.png");
		panel.setPosition(size.width / 2 , size.height / 2);
		this.addChild(panel);

		this.panel = panel;
	},

	loadScore : function(score,bestScore,targetScore) {
		var label = new cc.LabelTTF(score+"","arial",32);
		//label.setAnchorPoint(0,0.5)
		label.setPosition(320, 270);
		this.panel.addChild(label);

		var label = new cc.LabelTTF(bestScore+"","arial",32);
		//label.setAnchorPoint(0,0.5)
		label.setPosition(320, 220);
		this.panel.addChild(label);

		var label = new cc.LabelTTF(targetScore+"","arial",32);
		//label.setAnchorPoint(0,0.5)
		label.setPosition(320, 170);
		this.panel.addChild(label);
	},

	loadStar : function(starNum){
		var space = 100;
		for(var i = 0 ; i < starNum ; i++){
			var starName = "res/sf/s_star0" + (i+1) + ".png";
			var star = new cc.Sprite(starName);
			this.panel.addChild(star);
			var x = 135 + space * i;
			var y = 0;
			if(i == 1){
				y = 363;
			}else{
				y = 344;
			}
			star.setPosition(x, y);
		}
	},

	loadButton : function(){

		var share = new cc.MenuItemImage(
				"res/com/share_normal.png",
				"res/com/share_selected.png",
				"res/com/share_selected.png",
				this.onShareButtonEvent,
				this
		);

		share.setPosition(240, 95);

		var mainMenu = new cc.MenuItemImage(
			"res/com/mainmenu_normal.png",
			"res/com/mainmenu_selected.png",
			"res/com/mainmenu_selected.png",
			this.onMainMenuButtonEvent,
			this
		);

		mainMenu.setPosition(160, 5);

		var forward = new cc.MenuItemImage(
			"res/com/forward_normal.png",
			"res/com/forward_selected.png",
			"res/com/forward_selected.png",
			this.onForwardButtonEvent,
			this
		);

		forward.setPosition(320, 5);

		var menu = new cc.Menu(share,mainMenu,forward);
		menu.setPosition(0,0);
		this.panel.addChild(menu);
	},

	onShareButtonEvent : function(sender){
		cc.log("分享成功");
		SoundManage.playEffect(BTN_TOUCH);
	},

	onMainMenuButtonEvent : function(){
	    	SoundManage.playEffect(BTN_TOUCH);
		var scene = new MainMenuScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	},

	onForwardButtonEvent : function(){
		cc.log("下一关");
		SoundManage.playEffect(BTN_TOUCH);
		LevelManage.initLevelConfig(++LevelManage.level);
		var scene = new LevelInfoScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	}
});