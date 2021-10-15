
var PAGE_COL = 5;
var PAGE_ROW = 2;
var PAGE_COUNT = Math.ceil((Levels.length-1) / (PAGE_COL*PAGE_ROW));

var LSMainLayer = cc.Layer.extend({
	panel    : null,
	pageView : null,
	pageMark : null,
	lastBtn  : null,
	nextBtn  : null,
	
	ctor : function(){
		this._super();
		this.loadPanel();
		this.loadPageView();
		this.loadButton();
		this.loadPageMark();
		
		this.pageView.scrollToPage(0);
	},
	
	loadPanel : function(){
		size = cc.winSize;
		var panel = new cc.Sprite("res/ls/ls_panel.png");
		panel.setPosition(size.width / 2, size.height / 2);
		this.addChild(panel);
		
		this.panel = panel;
	},
	
	loadPageView : function(){
		var pageView = new ccui.PageView();
		pageView.setTouchEnabled(true);
		pageView.setContentSize(580,200);
		pageView.setPosition(25, 90);
		this.panel.addChild(pageView);
		this.pageView = pageView;
		pageView.addEventListener(this.onPageViewEvent.bind(this),pageView);
		pageView.setSwallowTouches(false);
		this.loadPage();
	},
	/*
	_loadPage : function() {
		for(var i = 0 ; i < PAGE_COUNT ; i++){
			var levelPage = new LevelPage(i);

			var page = new ccui.Layout();
			page.addChild(levelPage);
			this.pageView.addPage(page);
		}
	},*/
	
	loadPage : function() {
		for (var i = 0; i < PAGE_COUNT; ++i){
			var outerBox = new ccui.HBox();
			outerBox.setContentSize(cc.size(240.0, 130.0));

			for (var k = 0; k < PAGE_COL; ++k) {
				var innerBox = new ccui.VBox();

				for (var j = 0; j < PAGE_ROW; j++) {
					var levelNum = i * PAGE_COL * PAGE_ROW + j * PAGE_COL + k+1; //表示当前是第几关(从1开始)
					var btn = new LevelButton(levelNum);
					btn.setName("button " + j);
					btn.addTouchEventListener(this.onLevelButtonEvent.bind(this), this);
					innerBox.addChild(btn);
				}

				var parameter = new ccui.LinearLayoutParameter();
				parameter.setMargin({left: 50, top: 0, right: 50, bottom: 0});
				innerBox.setLayoutParameter(parameter);

				outerBox.addChild(innerBox);
			}
			this.pageView.insertPage(outerBox,i);
		}
	},
	
	loadPageMark : function(){
		var pageMark = new PageMark(PAGE_COUNT);
		//pageMark.setPosition(0, 0);
		this.addChild(pageMark);
		
		this.pageMark = pageMark;
	},
	
	loadButton : function(){
		var last = new cc.MenuItemImage(
			"res/ls/ls_last_normal.png",
			"res/ls/ls_last_normal.png",
			"res/ls/ls_last_disable.png",
			this.onLastButtonEvent,
			this
		);
		last.setPosition(20, 180);
		this.lastBtn = last;
		
		var next = new cc.MenuItemImage(
			"res/ls/ls_next_normal.png",
			"res/ls/ls_next_normal.png",
			"res/ls/ls_next_disable.png",
			this.onNextButtonEvent,
			this
		);
		next.setPosition(610, 180);
		this.nextBtn = next;
		
		var mainmenu = new cc.MenuItemImage(
			"res/com/mainmenu_normal.png",
			"res/com/mainmenu_selected.png",
			"res/com/mainmenu_selected.png",
			this.onMainMenuButtonEvent,
			this
		);
		mainmenu.setPosition(size.width / 2, 0);
		var menu = new cc.Menu(last,next,mainmenu);
		menu.setPosition(0, 0);
		this.panel.addChild(menu);
	},
	
	onMainMenuButtonEvent : function(){
	    SoundManage.playEffect(BTN_TOUCH);
		var scene = new MainMenuScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	},
	
	onLastButtonEvent : function(sender){
	    SoundManage.playEffect(BTN_TOUCH);
		var idx = this.pageView.getCurPageIndex();
		if(idx > 0){
		    this.pageView.scrollToPage(idx - 1);
		}
	},
	
	onNextButtonEvent : function(sender){
	    SoundManage.playEffect(BTN_TOUCH);
		var idx = this.pageView.getCurPageIndex();
		if(idx < PAGE_COUNT - 1){
			this.pageView.scrollToPage(idx + 1);
		}
	},
	
	onPageViewEvent : function(sender,type){
		switch(type){
		case ccui.PageView.EVENT_TURNING:
			var pageView = sender;
			var idx = pageView.getCurPageIndex();
			
			if(idx == 0){
				this.lastBtn.setEnabled(false);
			}else if(idx == PAGE_COUNT - 1){
				this.nextBtn.setEnabled(false);
			}else{
				this.lastBtn.setEnabled(true);
				this.nextBtn.setEnabled(true);
			}
			this.pageMark.onSelectedIndex(idx);
			break;
		default:
			break;
		}
	},
	
	onLevelButtonEvent : function(sender,type){
		switch (type) {
		case ccui.Widget.TOUCH_BEGAN:
			break;
		case ccui.Widget.TOUCH_MOVED:
			break;
		case ccui.Widget.TOUCH_ENDED:
		    	SoundManage.playEffect(BTN_TOUCH);
			var level = sender.level;
			LevelManage.initLevelConfig(level);
			this.gotoLevelInfoScene();
			break;

		default:
			break;
		}
	},
	
	gotoLevelInfoScene : function(){
		var scene = new LevelInfoScene();
		cc.director.runScene(new cc.TransitionFade(1,scene));
	}
	
	
});