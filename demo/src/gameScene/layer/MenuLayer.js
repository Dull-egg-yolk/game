/**
 * 游戏中底部的菜单层
 */



var MenuLayer = BaseLayer.extend({
	panel : null,
	
	ctor : function(){
		this._oktouch = true;
		this._super();
		size = cc.winSize;
		this.loadPanel();
		this.loadButton();
	},
	
	loadPanel : function(){
		var panel = new cc.Sprite("res/menu_panel.png");
		panel.setScale(0, 0);
		panel.setPosition(size.width / 2 , 50);
		this.addChild(panel);

		this.panel = panel;
		
		this.runOpenAction();
	},
	
	loadButton : function(){
		var space = 22;
		var music = new cc.MenuItemImage(
			"res/com/music_normal.png",
			"res/com/music_selected.png",
			"res/com/music_selected.png",
			this.onMusicButtonEvent,
			this
		);
		music.setPosition(space + music.width / 2, 70);
		
		var sound = new cc.MenuItemImage(
				"res/com/sound_normal.png",
				"res/com/sound_selected.png",
				"res/com/sound_selected.png",
				this.onSoundButtonEvent,
				this
		);
		sound.setPosition(music.x + space + sound.width , 70);
		
		var replay = new cc.MenuItemImage(
				"res/com/replay_normal.png",
				"res/com/replay_selected.png",
				"res/com/replay_selected.png",
				this.onReplayButtonEvent,
				this
		);
		replay.setPosition(sound.x + space + replay.width , 70);
		
		var mainMenu = new cc.MenuItemImage(
				"res/com/mainmenu_normal.png",
				"res/com/mainmenu_selected.png",
				"res/com/mainmenu_selected.png",
				this.onMainMenuButtonEvent,
				this
		);
		mainMenu.setPosition(replay.x + space + mainMenu.width  , 70);
		
		var returnBtn = new cc.MenuItemImage(
			"res/com/return_normal.png",
			"res/com/return_selected.png",
			"res/com/return_selected.png",
			this.onReturnButtonEvent,
			this
		);
		returnBtn.setPosition(this.panel.width - returnBtn.width / 2 , 146);
		
		var menu = new cc.Menu(music,sound,replay,mainMenu,returnBtn);
		menu.setPosition(0,0);
		this.panel.addChild(menu);
	},
	
	onMusicButtonEvent : function(){
	    MusicManage.flag = !MusicManage.flag;
	    if(MusicManage.flag){
		MusicManage.play();
	    }else{
		MusicManage.stop();
	    }
	},

	onSoundButtonEvent : function(){
		SoundManage.playEffect(BTN_TOUCH);
	    SoundManage.flag = !SoundManage.flag;
	},
	
	onReplayButtonEvent : function(){
		cc.log("onReplayButton");
		SoundManage.playEffect(BTN_TOUCH);
		var scene = new GameScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	},
	
	onMainMenuButtonEvent : function(){
		cc.log("onMainMenuButton");
		SoundManage.playEffect(BTN_TOUCH);
		var scene = new MainMenuScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	},
	
	onReturnButtonEvent : function(){
		//this.setVisible(false);
	    	SoundManage.playEffect(BTN_TOUCH);
	    	this.runCloseAction();
	},
	
	runOpenAction : function(){
	    var move = cc.moveTo(0.5,size.width / 2 ,size.height / 2 );
	    var scale = cc.scaleTo(0.5, 1, 1);
	    var spw = cc.spawn(move,scale);

	    //var back = cc.moveBy(0.2, 20, -20);
	    //var seq = cc.sequence(spw,cc.delayTime(0.1),back);
	    this.panel.runAction(spw);
	},
	
	runCloseAction : function(){
	    //this.setVisible(false);
	    var move = cc.moveTo(0.5,size.width / 2,50);
	    var scale = cc.scaleTo(0.5, 0, 0);
	    var spw = cc.spawn(move,scale);
	    var seq = cc.sequence(spw,cc.callFunc(function(){
		this.removeFromParent(true);
	    },this));
	    this.panel.runAction(seq);
	}
	
});
