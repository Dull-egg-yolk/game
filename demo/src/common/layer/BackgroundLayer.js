/**
 * 公用背景层
 */


var BackgroundLayer = cc.Layer.extend({
	
	ctor : function(){
		this._super();
		this.loadBg();
	},
	
	loadBg : function(){
		size = cc.winSize;
		var bg = new cc.Sprite("res/com/com_bg.png");
		bg.setPosition(size.width / 2, size.height / 2);
		this.addChild(bg);
	}
});