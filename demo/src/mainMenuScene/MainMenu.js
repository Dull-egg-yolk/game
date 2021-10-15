

var MainMenuScene = cc.Scene.extend({
	onEnter : function(){
		this._super();
		var layer = new MainMenuLayer();
		this.addChild(layer);
	}
});


var MainMenuLayer  = cc.Layer.extend({
	backgroundLayer : null,
	mainLayer       : null,
	
	ctor : function(){
		this._super();
		this.loadBackgroundLayer();
		this.loadMainLayer();
	},
	
	loadBackgroundLayer : function(){
		var layer = new BackgroundLayer();
		this.addChild(layer);
		
		this.backgroundLayer = layer;
	},
	
	loadMainLayer : function(){
		var layer = new MMMainLayer();
		this.addChild(layer);
		
		this.mainLayer = layer;
	}
	
});