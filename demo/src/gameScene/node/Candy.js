


var Candy = cc.Sprite.extend({
    type : 0,
    row  : 0,
    col  : 0,
    
    ctor : function(type, row ,col){
	this._super("res/" + type + ".png");
	this.initConfig(type, row, col);
    },
    
    initConfig : function(type, row ,col){
	this.type = type ;
	this.row = row ;
	this.col = col;
    },
    //重新定义candy的类型及纹理
    reuse : function(type,row,col){
	this.setTexture("res/" + type + ".png");
	this.initConfig(type, row ,col);
    },
    
    unuse : function(){
	
    }
    
   

});

Candy.createRandomType = function(row,col){
    var type = parseInt(Math.random() * 4 + 1);
    cc.log("type:"+type);
    if(cc.pool.hasObject(Candy)){  //有没有空闲的对象，有就拿出来用，没有则创建
	return cc.pool.getFromPool(Candy,type,row,col);
    }else{
	return new Candy(type,row,col);
    }
}