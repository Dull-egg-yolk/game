




var STMainLayer = cc.Layer.extend({
    panel : null,
    
    ctor : function(){
	this._super();
	size = cc.winSize;
	this.loadPanel();
	this.loadButton();
    },
    
    loadPanel : function(){
	var panel = new cc.Sprite("res/setting_panel.png");
	panel.setPosition(size.width / 2, size.height / 2);
	this.addChild(panel);
	
	this.panel = panel;
    },
    
    loadButton : function(){
	
	var music = new cc.MenuItemImage(
		"res/com/music_normal.png",
		"res/com/music_selected.png",
		"res/com/music_selected.png",
		this.onMusicButtonEvent,
		this
	);
	music.setPosition(120, 65);
	
	var sound = new cc.MenuItemImage(
		"res/com/sound_normal.png",
		"res/com/sound_selected.png",
		"res/com/sound_selected.png",
		this.onSoundButtonEvent,
		this
	);
	sound.setPosition(270, 65);
	
	var returnBtn = new cc.MenuItemImage(
		"res/com/return_normal.png",
		"res/com/return_selected.png",
		"res/com/return_selected.png",
		this.onReturnButtonEvent,
		this
	);
	returnBtn.setPosition(this.panel.width - returnBtn.width / 2 , 142);
	
	var menu = new cc.Menu(music,sound,returnBtn);
	menu.x = 0;
	menu.y = 0;
	this.panel.addChild(menu);
    },
    
    onMusicButtonEvent : function(){
	SoundManage.playEffect(BTN_TOUCH);
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
    
    onReturnButtonEvent : function(){
	cc.log("onMainMenuButton");
	SoundManage.playEffect(BTN_TOUCH);
	var scene = new MainMenuScene();
	cc.director.runScene(new cc.TransitionFade(1,scene));
    }
});