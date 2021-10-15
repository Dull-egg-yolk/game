
/**
 * 背景层
 */


var GBackgroundLayer = cc.Layer.extend({
    background : null,
    
    ctor : function(){
	this._super();
	var size = cc.winSize;
	this.background = new cc.Sprite("res/com/g_bg.png");
	/*cc.log("bgsize:"+this.background.width+":"+this.background.height);
	cc.log("ccsize:"+cc.winSize.width+":"+cc.winSize.height);
	cc.log("GCSize:"+GC.w+":"+GC.h);*/
	this.background.setPosition(GC.w2,GC.h2);
	this.addChild(this.background);
    }
});