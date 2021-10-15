

var AboutScene = cc.Scene.extend({
    onEnter : function(){
	this._super();
	var layer = new AboutLayer();
	this.addChild(layer);
    }
});


var AboutLayer = cc.Layer.extend({
    
    ctor : function(){
	this._super();
	this.loadBg();
	this.loadPanel();
	this.loadButton();
    },
    
    loadBg : function(){
	var bgLayer = new BackgroundLayer();
	this.addChild(bgLayer);
    },
    
    loadPanel : function() {
	var size = cc.winSize;
	var bg = new cc.Sprite("res/about_panel.png");
	bg.setPosition(size.width / 2, size.height / 2);
	this.addChild(bg);
    },
    
    loadButton : function(){
	var mainMenu = new cc.MenuItemImage(
		"res/com/mainmenu_normal.png",
		"res/com/mainmenu_selected.png",
		"res/com/mainmenu_selected.png",
		this.gotoMainMenuScene,
		this
	);
	mainMenu.setPosition(70, 50)
	
	var menu = new cc.Menu(mainMenu);
	menu.setPosition(0, 0);
	this.addChild(menu);
    },
    
    gotoMainMenuScene : function(){
    	SoundManage.playEffect(BTN_TOUCH);
    	var scene = new MainMenuScene();
    	cc.director.runScene(new cc.TransitionFade(1,scene));
    }
});