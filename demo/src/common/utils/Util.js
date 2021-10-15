

var Util = Util || {};

/**
 * @parameter data 数据源
 * 
 * @parameter params 可以传一个数组,排序依据。
 * 例如params=[param1,param2,param3],则当data[param1]相等时按param2排序
 * 
 * @parameter isAsc 排序方式，true升序（默认）,false降序
 */
Util.sortObject = function(data,params,isAsc){
	cc.log(isAsc);
	if(typeof(isAsc) == "undefined"){
		cc.log("undefault");
		isAsc = true;
	}
	//使用插入排序
	for(var i = 1; i < data.length; i++){
		var tmp = data[i];
		var j = i - 1;
		for(j = i - 1; j >= 0; j--){
			if(isAsc){
				if(Util.compareTo(tmp,data[j],params) < 0){
					data[j+1] = data[j]; 
				}else{
					break;
				}
			}else{
				if(Util.compareTo(tmp,data[j],params) > 0){
					data[j+1] = data[j]; 
				}else{
					break;
				}
			}
		}
		data[j+1] = tmp;
	}
	return data;
};

/**
 * @params obj1 对象1
 * @params obj2 对象2
 * @params params比较依据
 * return -1（obj1 < obj2），1（obj1 > obj2），0（obj1 = obj2）
 */
Util.compareTo = function(obj1,obj2,params){
	for(var i = 0; i < params.length;i++){
		if(obj1[params[i]] - obj2[params[i]] > 0){
			return 1;
		}else if(obj1[params[i]] - obj2[params[i]] < 0){
			return -1;
		}
	}
	return 0;
};
//获取某年某月共有几天。默认当前年月
Util.getDaySinMonth = function(year,month){
    year = parseInt(year) || Util.getYear();
    month = parseInt(month) || Util.getMonth();
    var temp = new Date(year+ "/" + (month+1) + "/" + 0);
    return temp.getDate();
};
//返回当前年份
Util.getYear = function(){
	return new Date().getFullYear();
};

//返回当前月份
Util.getMonth = function(){
	return new Date().getMonth() + 1;
};
//返回今天是这个月第几天
Util.getDate = function(){
	return new Date().getDate();
};

//返回某年某月某天是星期几(0周日-6周六)，默认今天
Util.getDay = function(year,month,day){
    year = parseInt(year) || Util.getYear();
    month = parseInt(month) || Util.getMonth();
    day = parseInt(day) || Util.getDate();
    return new Date(year + "/" + month + "/" + day).getDay();
};

//返回当前时间（秒）
Util.getTime = function(){
    return new Date().getTime();
};
//返回当前小时
Util.getHours = function(){
    return new Date().getHours();
};

//返回当前分钟
Util.getMinutes = function(){
    return new Date().getMinutes();
};

//返回当前秒
Util.getSeconds = function(){
    return new Date().getSeconds()();
};
//传入一个秒数，将其转化为时间字符串00：00：00格式
Util.getTimeString = function(seconds){
    seconds  = seconds || 0;
    var timeStr = "";
    var hours = Math.floor(seconds / (60*60));
    if(hours < 10){
	timeStr += "0" + hours;
    }else{
	timeStr +=  hours;
    }
    seconds = seconds % (60*60);
    
    var minutes = Math.floor(seconds / 60);
    if(minutes < 10){
	timeStr += ":0" + minutes;
    }else{
	timeStr += ":" + minutes;
    }
    seconds = seconds % 60;
    
    if(seconds < 10){
	timeStr += ":0" + seconds;
    }else{
	timeStr += ":" + seconds;
    }
    return timeStr;
};


/**
 * 从服务器获取json格式的数据
 * @param url 服务器地址
 * @param date 参数
 * @param successCallBack 成功回调
 * @param errorCallBack 错误回调
 * @returns
 */
Util.httpHelperGetJson = function(url,data,succCallBack,errorCallBack ){
    if(typeof (succCallBack) != "function"){
	succCallBack = function(){}
    }

    if(typeof (errorCallBack) != "function"){
	errorCallBack = function(){}
    }
    
    var xmlHttp = null;
    
    if(window.ActiveXObject){ //如果是IE浏览器    
	xmlHttp =  new ActiveXObject("Microsoft.XMLHTTP");    
    }else if(window.XMLHttpRequest){ //非IE浏览器    
	xmlHttp =  new XMLHttpRequest();    
    }

    var params = "";
    if(typeof(data)=="object"){
	//params += "data = {"
	var i = 0;
	for(key in data){
	    if(i == 0){
		params += (key+"="+data[key]);
		i++
	    }else{
		params += ("&" + key+"="+data[key]);
	    }
	}
	//params += "}";
    }
   
    xmlHttp.open("POST",url,true);
    xmlHttp.timeout = 5000;
    //xmlHttp.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
    //xmlHttp.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");
    xmlHttp.send(params);

    //var me=this;
    //===================  ajax回调
    xmlHttp.onreadystatechange = function(){

	cc.log("url="+url+"  params="+ JSON.stringify(params) );
	if(xmlHttp.readyState == 4){
	    if(xmlHttp.status == 200){
		cc.log("return data :",Util.strToUTF8(xmlHttp.responseText));
		var strData = "";
		if(xmlHttp.responseText.length>0){ //当内容为空时会有"[]"
		    var json = Util.strToJson(Util.strToUTF8(xmlHttp.responseText));
		    succCallBack(json);
		    return strData;
		}else{
		    cc.log("什么都没有，请检查网络");
		    return;
		}
	    }
	    else{
		//网络状态错误处理
		if(errorCallBack) {
		    cc.log("网络状态错误:"+xmlHttp.status);
		    JSON.stringify(errorCallBack);
		    errorCallBack();
		}
	    }
	}else{
	    //网络错误处理
	    if(errorCallBack) {
		cc.log("网络还没准备好:"+xmlHttp.readyState);
		errorCallBack();
	    }
	}
    }	
};

/**
 * 将字符串转化为Json对象
 */
Util.strToJson = function(str){
    var json = (new Function("return " + str))(); //将字符串转化为json方式1
    //var json = eval('(' + str + ')');           //将字符串转化为json方式2
    //var json = JSON.parse(str);             //将字符串转化为json方式3,这种方式键值需要加单引[{'a' : "123"}]
    return json;
};

/**
 * 传入一个秒数，将其转化为"xx天xx小时xx分钟"
 */
Util.timeTransform = function(timeValue){
    var timeString = "";
    var day = Math.floor(timeValue / (24*60*60));
    if(day > 0){
	timeString += day + "天";
    }

    timeValue = timeValue % (24*60*60);
    var hous =  Math.floor(timeValue / (60*60));
    if(hous > 0){
	timeString += hous + "小时";
    }

    timeValue = timeValue % (60*60);
    var minute =  Math.floor(timeValue / 60);
    timeString += minute + "分";


    //timeValue = timeValue / 60;
    //var second = timeValue;
    return timeString;
};

/**
 * 自定义的定时器
 */
Util.mySchedule = function(callback,interval) {
    var then = Date.now();
    interval = interval * 1000;
    this.schedule(function(){
	var now = Date.now();
	var delta = now - then;
	if(delta > interval){
	    then = now - (delta % interval);
	    callback.call(this);
	}
    }.bind(this), 0);
};

Util.strToUTF8 = function(strUtf8) {
    if(!strUtf8){
	return;
    }

    var bstr = "";  
    var nTotalChars = strUtf8.length; // total chars to be processed.  
    var nOffset = 0; // processing point on strUtf8  
    var nRemainingBytes = nTotalChars; // how many bytes left to be converted  
    var nOutputPosition = 0;  
    var iCode, iCode1, iCode2; // the value of the unicode.  
    while (nOffset < nTotalChars) {  
	iCode = strUtf8.charCodeAt(nOffset);  
	if ((iCode & 0x80) == 0) // 1 byte.  
	{  
	    if (nRemainingBytes < 1) // not enough data  
		break;  
	    bstr += String.fromCharCode(iCode & 0x7F);  
	    nOffset++;  
	    nRemainingBytes -= 1;  
	}  
	else if ((iCode & 0xE0) == 0xC0) // 2 bytes  
	{  
	    iCode1 = strUtf8.charCodeAt(nOffset + 1);  
	    if (nRemainingBytes < 2 || // not enough data  
		    (iCode1 & 0xC0) != 0x80) // invalid pattern  
	    {  
		break;  
	    }  
	    bstr += String  
	    .fromCharCode(((iCode & 0x3F) << 6) | (iCode1 & 0x3F));  
	    nOffset += 2;  
	    nRemainingBytes -= 2;  
	} else if ((iCode & 0xF0) == 0xE0) // 3 bytes  
	{  
	    iCode1 = strUtf8.charCodeAt(nOffset + 1);  
	    iCode2 = strUtf8.charCodeAt(nOffset + 2);  
	    if (nRemainingBytes < 3 || // not enough data  
		    (iCode1 & 0xC0) != 0x80 || // invalid pattern  
		    (iCode2 & 0xC0) != 0x80) {  
		break;  
	    }  
	    bstr += String.fromCharCode(((iCode & 0x0F) << 12)  
		    | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));  
	    nOffset += 3;  
	    nRemainingBytes -= 3;  
	} else 
	    // 4 or more bytes -- unsupported  
	    break;  
    }  
    if (nRemainingBytes != 0) { // bad UTF8 string.                  
	return "";  
    }  
    return bstr;  
};

//弧度转化为度数
Util.degrees = function(radian){
    return radian * 180 / Math.PI;
}

//度数转化为弧度
Util.radian = function(angle){
    return angle * Math.PI / 180;
}

