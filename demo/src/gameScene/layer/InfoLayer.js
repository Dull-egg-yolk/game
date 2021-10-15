
/**
 * 信息层(状态层),显示游戏相关的信息或状态
 */

var InfoLayer = cc.Layer.extend({
    levelLabel : null,
    scoreLabel : null,
    stepLabel  : null,
    
    ctor : function(){
	this._super();
	
	var levelInfo = LevelManage.levelInfo;
	this.loadLevelLabel(levelInfo.level);
	this.loadScoreLabel();
	this.loadStepsLabel(levelInfo.steps);
	
	//this.updateLevel(level);
    },
    
    loadLevelLabel : function(level){
		var label = new cc.LabelTTF("Level","Arial",30);
		label.setPosition(GC.w / 4, GC.h - 40);
		label.setColor(cc.color(0, 0, 0));
		this.addChild(label);
		
		this.levelLabel = new cc.LabelTTF(level,"Arial",30);
		this.levelLabel.setPosition(GC.w / 4, label.y - 40);
		this.levelLabel.setColor(cc.color(0, 0, 0));
		this.addChild(this.levelLabel);
    },
    
    loadScoreLabel : function(){
		var label = new cc.LabelTTF("Score","Arial",30);
		label.setPosition(GC.w / 2, GC.h - 40);
		label.setColor(cc.color(0, 0, 0));
		this.addChild(label);
	
		this.scoreLabel = new cc.LabelTTF("0","Arial",30);
		this.scoreLabel.setPosition(GC.w / 2, label.y - 40);
		this.scoreLabel.setColor(cc.color(0, 0, 0));
		this.addChild(this.scoreLabel);
    },
    
    loadStepsLabel : function(steps){
		var label = new cc.LabelTTF("Steps","Arial",30);
		label.setPosition(GC.w*3 / 4, GC.h - 40);
		label.setColor(cc.color(0, 0, 0));
		this.addChild(label);
	
		this.stepLabel = new cc.LabelTTF(steps,"Arial",30);
		this.stepLabel.setPosition(GC.w*3 / 4, label.y - 40);
		this.stepLabel.setColor(cc.color(0, 0, 0));
		this.addChild(this.stepLabel);
    },
    
    updateLevel : function(level){
    	level && this.levelLabel.setString(level);
    },
    
    updateScore : function(score){
    	score && this.scoreLabel.setString(score);
    },
    
    updateSteps : function(steps){
    	steps && this.stepLabel.setString(steps);
    }
});