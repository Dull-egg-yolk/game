

var LIMainLayer = cc.Layer.extend({
	panel : null,
	
	ctor : function(){
		this._super();
		size = cc.winSize;
		
		this.loadPanel();
		this.loadButton();
		var levelInfo = LevelManage.levelInfo;
		this.loadLevelInfo(levelInfo.level,levelInfo.starNum,levelInfo.bestScore, levelInfo.targetScore);
		
	},
	
	loadPanel : function(){
		var panel = new cc.Sprite("res/li/li_panel.png");
		panel.setPosition(size.width / 2 , size.height / 2);
		this.addChild(panel);
		
		this.panel = panel;
	},
	
	loadLevelInfo : function(level,starNum,bestScore,targetScore){
		var label = new cc.LabelTTF(level+"","arial",32);
		//label.setAnchorPoint(0,0.5)
		label.setPosition(320, 270);
		this.panel.addChild(label);
		
		var label = new cc.LabelTTF(bestScore+"","arial",32);
		//label.setAnchorPoint(0,0.5)
		label.setPosition(320, 216);
		this.panel.addChild(label);

		var label = new cc.LabelTTF(targetScore+"","arial",32);
		//label.setAnchorPoint(0,0.5)
		label.setPosition(320, 165);
		this.panel.addChild(label);
		
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
		var back = new cc.MenuItemImage(
			"res/com/back_normal.png",
			"res/com/back_selected.png",
			"res/com/back_selected.png",
			this.onBackButtonEvent,
			this
		);
		back.setPosition(100, 50);
		
		var play = new cc.MenuItemImage(
			"res/com/play_normal.png",
			"res/com/play_selected.png",
			"res/com/play_selected.png",
			this.onPlayButtonEvent,
			this
		);
		play.setPosition(250, 50);
		
		var mainMenu = new cc.MenuItemImage(
			"res/com/mainmenu_normal.png",
			"res/com/mainmenu_selected.png",
			"res/com/mainmenu_selected.png",
			this.onMainMenuButtonEvent,
			this
		);

		mainMenu.setPosition(400, 50);

		var menu = new cc.Menu(back,play,mainMenu);
		menu.setPosition(0,0);
		this.panel.addChild(menu);
	},
	
	onMainMenuButtonEvent : function(){
	    	SoundManage.playEffect(BTN_TOUCH);
		var scene = new MainMenuScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	},
	
	onPlayButtonEvent : function(){
	    	SoundManage.playEffect(BTN_TOUCH);
		var scene = new GameScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	},
	
	onBackButtonEvent : function(){
	    	SoundManage.playEffect(BTN_TOUCH);
		var scene = new LevelSelectScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	}
});