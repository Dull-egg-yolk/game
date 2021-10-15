



var FailScene = cc.Scene.extend({
	onEnter :function(){
		this._super();
		var layer = new FailLayer();
		this.addChild(layer);
	}
});

var FailLayer = cc.Layer.extend({
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
		var layer = new FMainLayer(10000,6000,3000);
		this.addChild(layer);
		this.mainLayer = layer;
	}

});