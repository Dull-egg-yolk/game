



var MMMainLayer = cc.Layer.extend({
	ctor : function(){
		this._super();
		this.loadTitle();
		this.loadButton();
	},
	
	loadTitle : function() {
		size = cc.winSize;
		var title = new cc.Sprite("res/mm/mm_title.png");
		title.setScale(1.5, 1.5);
		title.setPosition(size.width / 2, size.height * 4 / 5);
		this.addChild(title);
		
		var move = cc.moveBy(0.5,0,10);
		var back = move.reverse();
		var seq = cc.sequence(move,back);
		
		title.runAction(seq.repeatForever());
	},
	
	loadButton : function(){
		var start = new cc.MenuItemImage(
			"res/mm/mm_start_normal.png",
			"res/mm/mm_start_selected.png",
			"res/mm/mm_start_selected.png",
			this.onStartButtonEvent,
			this
		);
		start.setPosition(size.width / 2, size.height / 2);
		
		var setting = new cc.MenuItemImage(
			"res/mm/mm_setting_normal.png",
			"res/mm/mm_setting_selected.png",
			"res/mm/mm_setting_selected.png",
			this.onSettingButtonEvent,
			this	
		);
		setting.setPosition(size.width / 2, size.height / 2 - 80);
		
		var about = new cc.MenuItemImage(
			"res/mm/mm_about_normal.png",
			"res/mm/mm_about_selected.png",
			"res/mm/mm_about_selected.png",
			this.onAboutButtonEvent,
			this	
		);
		about.setPosition(size.width / 2, size.height / 2 - 160);
		
		var exit = new cc.MenuItemImage(
			"res/mm/mm_exit_normal.png",
			"res/mm/mm_exit_selected.png",
			"res/mm/mm_exit_selected.png",
			this.onExitButtonEvent,
			this	
		);
		exit.setPosition(size.width / 2, size.height / 2 - 240);
		
		var menu = new cc.Menu(start,setting,about,exit);
		menu.setPosition(0,0);
		this.addChild(menu);
	},
	
	onStartButtonEvent : function(){
		SoundManage.playEffect(BTN_TOUCH);
		var scene = new LevelSelectScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	},
	
	onSettingButtonEvent : function(sender){
		SoundManage.playEffect(BTN_TOUCH);
		var scene = new SettingScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	},
	
	onAboutButtonEvent : function(){
		SoundManage.playEffect(BTN_TOUCH);
		var scene = new AboutScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	},
	
	onExitButtonEvent : function(){
		SoundManage.playEffect(BTN_TOUCH);
		cc.director.end();
	}
});