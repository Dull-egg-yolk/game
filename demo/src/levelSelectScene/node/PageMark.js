
var PageMark = cc.Layer.extend({
	marks       : [],
	selectedIdx : 0,  //表示当前选择第几页
	ctor : function(pageNum){
		this._super();
		size = cc.winSize;
		this.initConfig();
		this.loadMark(pageNum);
		this.onSelectedIndex(0);
		
	},
	
	initConfig : function() {
		this.marks = [];
		selectedIdx = 0;
	},
	
	loadMark : function(pageNum){
	    var markSize = new cc.Sprite("res/ls/ls_mark01.png").getContentSize();
		var spaceX = markSize.width / 4;
		
		var startX = (size.width - pageNum * markSize.width - spaceX * (pageNum - 1)) / 2 + markSize.width / 2 ;
		for(var i = 0 ; i < pageNum ; i++){
			var x = startX + (markSize.width + spaceX) * i;
			var y = 320;
			var mark = new cc.Sprite("res/ls/ls_mark01.png");
			mark.setPosition(x, y);
			this.addChild(mark);
		
			this.marks.push(mark);
		}
	},
	
	onSelectedIndex : function(idx){
		if(this.marks[this.selectedIdx]){
		    this.marks[this.selectedIdx].setTexture("res/ls/ls_mark01.png");
		    this.marks[idx].setTexture("res/ls/ls_mark02.png");
			this.selectedIdx = idx;
		}else{
		    this.marks[idx].setTexture("res/ls/ls_mark02.png");
			this.selectedIdx = idx;
		}
	}
});