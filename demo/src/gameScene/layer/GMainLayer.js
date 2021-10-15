

/**
 * 主要逻辑层。
 */



var GMainLayer = cc.Layer.extend({
    map      : [],
    mapPanel : null,
    update   : false,
    gameLayer : null,
    
    ctor : function(gameLayer){
	this._super();
	this.loadMapPanel();
	this.loadCandyMap();
	
	this.gameLayer = gameLayer;
	/*
	if("touches" in cc.sys.capabilities){
	    cc.log("touches");
	    cc.eventManager.addListener({
		event : cc.EventListener.TOUCH_ONE_BY_ONE,
		sawllow : true,
		onTouchBegan : this.onTouchBegan.bind(this)
	    }, this.mapPanel);
	}else{
	    cc.log("mouse");
	    cc.eventManager.addListener({
		event : cc.EventListener.MOUSE,
		OnMouseDown : this.onMouseDown.bind(this)
	    }, this.mapPanel);
	}*/
		cc.eventManager.addListener({
		    event : cc.EventListener.TOUCH_ONE_BY_ONE,
		    swallowTouches : true,
		    onTouchBegan : this.onTouchBegan.bind(this)
		}, this.mapPanel);
    },
    
    
    loadMapPanel : function(){
		var mapPanel = new cc.Layer();
		var x = (GC.w - CANDY_WIDTH * MAP_COL) / 2;
		var y = (GC.h - CANDY_HEIGHT * MAP_ROW) / 2;
		mapPanel.setPosition(x, y);
		
		var clippingNode = new cc.ClippingNode();
		clippingNode.addChild(mapPanel,1);
		this.addChild(clippingNode,2);
		
		var stencil = new cc.DrawNode();
		stencil.drawRect(cc.p(mapPanel.x,mapPanel.y), cc.p(mapPanel.x + CANDY_WIDTH * MAP_COL, mapPanel.y + CANDY_HEIGHT * MAP_ROW), cc.color(0, 0, 0), 2, cc.color(0, 0, 0));
		clippingNode.stencil = stencil;
		
		this.mapPanel = mapPanel;
    },
    
    loadCandyMap : function(){
		this.map = [];
		
		for(var row = 0; row < MAP_ROW ; row++){
		    var y = CANDY_HEIGHT * row + CANDY_HEIGHT / 2;
		    var row_i = [];
		    for(var col = 0 ; col < MAP_COL ; col++){
			var x = CANDY_WIDTH * col + CANDY_WIDTH / 2;
			
			var candy = Candy.createRandomType(row, col);
			candy.setPosition(x,y);
			this.mapPanel.addChild(candy);
			row_i.push(candy);
		    }
		    this.map.push(row_i);
		}
    },
    
    onTouchBegan : function(touch,event){
		SoundManage.playEffect(BTN_TOUCH);
		cc.log("onTouchBegan");
		var col = Math.floor((touch.getLocation().x - this.mapPanel.x) / CANDY_WIDTH);
		var row = Math.floor((touch.getLocation().y - this.mapPanel.y) / CANDY_HEIGHT);
		cc.log("row:"+row+"col:"+col);
		this.popCandy(row,col);
		return true;
    },

    onMouseDown : function(event){
		SoundManage.playEffect(BTN_TOUCH);
		cc.log("onMouseDown");
		var col = Math.floor((event.getLocationX() - this.mapPanel.x) / CANDY_WIDTH);
		var row = Math.floor((event.getLocationY() - this.mapPanel.y) / CANDY_HEIGHT);
		this.popCandy(row,col);
		return true;
    },
    
    popCandy : function(row,col){
		if(this.update){
		    return;
		}
		if(row < 0 || row >= MAP_ROW || col < 0 || col >= MAP_COL){
		    return
		}
		var joinCandy = [this.map[row][col]];
		var index = 0;
		
		var pushIntoJoinCandy = function(element){
		    if(joinCandy.indexOf(element) < 0){
			joinCandy.push(element);
		    }
		};
	    
		/*将joinCandy中的全部取出来与其相邻四周的类型对比，
		 *如果类型相同则将该candy加入joinCandy中，
		*直到没有相同的type循环结束
		*/
		while(index < joinCandy.length){
		    var candy = joinCandy[index];
			
		    var array = this.getCandyTypeEquals(candy.row, candy.col);
		    for(var i = 0 ; i < array.length ; i++){
			pushIntoJoinCandy(array[i]);
		    }
		    index++;
		}
		    
		if(joinCandy.length <= 1){
			return;
		}
		
		this.update = true;
		    
		for(var i = 0 ;i < joinCandy.length ; i++){
		    var candy = joinCandy[i];
		    this.map[candy.row][candy.col] = null;
		    cc.pool.putInPool(candy);//放入缓冲池
		    this.mapPanel.removeChild(candy,true);
		}
		    
		//更新数据
		this.gameLayer.updateInfoLayerSteps();
		var score = joinCandy.length * joinCandy.length ;
		this.gameLayer.updateInfoLayerScore(score);
		    
		this.generateNewCandy();
		this.checkSuccessOrFail();
    },
    
    
    getCandyTypeEquals : function(row,col) {
		var array = [];
		var candy = this.map[row][col];
		if(row-1 >= 0){
		    var bottomCandy = this.map[row-1][col];
		    if(bottomCandy && bottomCandy.type == candy.type){
			array.push(bottomCandy);
		    }
		}
		if(row+1 < MAP_ROW){
		    var topCandy = this.map[row+1][col];
		    if(topCandy && topCandy.type == candy.type){
			array.push(topCandy);
		    }
		}
		
		if( (col - 1) >= 0 ) {
		    var leftCandy = this.map[row][col-1];
		    if(leftCandy && leftCandy.type == candy.type){
			array.push(leftCandy);
		    } 
		}
		
		if( (col + 1) < MAP_COL){
		    var rightCandy = this.map[row][col+1];
		    if(rightCandy && rightCandy.type == candy.type){
			array.push(rightCandy);
		    }
		}
		
		return array;
    },
    
    generateNewCandy : function(){
		var maxTime = 0;
		for(var col = 0 ; col < MAP_COL ; col++){
		    var missCount = 0;
		    for(var row = 0 ; row < this.map.length ; row++){
			var candy = this.map[row][col];
			if(candy === null){
			    if(!this.map[MAP_ROW + missCount]){
				this.map[MAP_ROW + missCount] = [];//先添加一行
			    }
			    var candy = Candy.createRandomType((MAP_ROW + missCount ),col);
			    this.mapPanel.addChild(candy);
			    candy.x = candy.col * CANDY_WIDTH + CANDY_WIDTH / 2;
			    candy.y = candy.row * CANDY_HEIGHT + CANDY_HEIGHT / 2;
			   
			    this.map[candy.row][candy.col] = candy;
			    missCount++;
			}else{
			    if(missCount <= 0 || typeof candy === "undefined"){
				continue;
			    }
			    var fallLength = missCount;
			    if(fallLength > 0){
				//计算下落时间
				var durtion = Math.sqrt(2 * fallLength / FALL_ACCELERATION);
				if(durtion > maxTime){
				    maxTime = durtion;
				}
				var move = cc.moveTo(durtion, candy.x, candy.y - CANDY_HEIGHT * fallLength).easing(cc.easeIn(2));
				candy.runAction(move);
				candy.row -= fallLength;
				this.map[row][col] = null;
				this.map[candy.row][candy.col] = candy;  
			    }
			}
		    }
		}
		for(var i = this.map.length - 1; i >= MAP_ROW; i--){
		    this.map.splice(i,1);
		}
		this.scheduleOnce(this.finishCandysFall.bind(this), maxTime);
	    },
	    
	finishCandysFall : function(){
		this.update = false;
    },
    
    checkSuccessOrFail : function(){
		var score = LevelManage.score;
		var targetScore = LevelManage.levelInfo.targetScore;
		var steps = LevelManage.steps;
		if(score >= targetScore && steps >= 0){
		    score += steps * 100;
		    if(score >= targetScore && score < targetScore * 2){
		    	LevelManage.starNum = 1;
		    }else if(score >= targetScore * 2 && score < targetScore * 3){
		    	LevelManage.starNum = 2;
		    }else if(score >= targetScore * 3){
		    	LevelManage.starNum = 3;
		    }
	
		    LevelManage.score = score;
		    this.gotoSuccessScene();
		}

		if(steps <= 0 && score < targetScore){
		    this.gotoFailScene();
		}

    },

    gotoSuccessScene : function(){
    	var scene = new SuccessScene();
    	cc.director.runScene(new cc.TransitionFade(1,scene));
    },

    gotoFailScene : function(){
    	var scene = new FailScene();
    	cc.director.runScene(new cc.TransitionFade(1,scene));
    },
  
});