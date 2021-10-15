

/**
 * 游戏场景及相关层
 */


var GameScene = cc.Scene.extend({
    onEnter : function(){
	this._super();
	var layer = new GameLayer();
	this.addChild(layer);
    }
});



var GameLayer = cc.Layer.extend({
    backgroundLayer : null,
    mainLayer       : null,
    infoLayer       : null,
    
    ctor : function(){
	this._super();
	size = cc.winSize;
	this.loadBackgroundLayer();
	this.loadInfoLayer();
	this.loadMainLayer();
	this.loadButton();
    },
    
    loadBackgroundLayer : function(){
	var layer = new GBackgroundLayer();
	this.addChild(layer);
	
	this.backgroundLayer = layer;
    },
    
    loadMainLayer : function(){
	var layer = new GMainLayer(this);
	this.addChild(layer);
	
	this.mainLayer = layer;
    },
    
    loadInfoLayer : function(){
	var layer = new InfoLayer();
	this.addChild(layer);
	
	this.infoLayer = layer;
    },
    
    loadButton : function() {
	    var plus = new cc.MenuItemImage(
			"res/com/plus_normal.png",
			"res/com/plus_selected.png",
			"res/com/plus_selected.png",
			this.onPlusButtonEvent,
			this
		);
	    plus.setPosition(size.width / 2, 30);
		var menu = new cc.Menu(plus);
		menu.setPosition(0, 0);
		this.addChild(menu);
    },
    
    updateInfoLayerScore : function(score){
	if(score < 0)return;
	if(score){
	    LevelManage.score += score;
	    cc.log("LevelManage.score" + LevelManage.score);
	    this.showMessage(score);
	    this.infoLayer.updateScore(LevelManage.score);
	}
    },
    
    updateInfoLayerSteps : function(){
	LevelManage.steps--;
	this.infoLayer.updateSteps(LevelManage.steps);
    },
    
    showMessage : function(score){
	var label = new cc.LabelTTF("","arial",80);
	//label.setColor(cc.color(0, 110, 119));
	label.setPosition(GC.w2, GC.h2 + 200);
	this.addChild(label,5);
	label.setName("message");
	
	if(score >= 50 && score < 100){
	    label.setString("不错哦");
	    label.setColor(cc.color(220, 20, 20));
	}else if(score >= 100 && score < 200){
	    label.setString("非常好");
	    label.setColor(cc.color(240, 20, 20));
	}else if(score >= 200 ){
	    label.setString("牛逼啊");
	    label.setColor(cc.color(255, 10, 10));
	}
	
	var action = cc.blink(1, 3);
	var fade = new cc.FadeOut(0.1);
	var seq = cc.sequence(cc.delayTime(0.1),action,fade,cc.callFunc(function(){
	    this.removeChild(this.getChildByName("message"), true);
	}, this));
	label.runAction(seq);
    },
    
    onPlusButtonEvent : function(){
		SoundManage.playEffect(BTN_TOUCH);
		var menuLayer = new MenuLayer();
		this.addChild(menuLayer);
    }
    
    
});