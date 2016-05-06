"use strict";

//Function to get from and to dates for the specific time window
function getTimePairFromWindow(timeWindow, dateString) {
	var dateString1 = "";
	var dateString2 = "";
	if (dateString != "") {
		var dateParameter = new Date(Date.parse((dateString).toString()));
		dateString1 = formatDate(dateParameter);

		var timeDifference = 5;//default 5 minutes time difference
		if (timeWindow == "1h") timeDifference = 5;//i.e. 5 minutes difference
		if (timeWindow == "1d") timeDifference = 60;//i.e. 1 hour difference
		if (timeWindow == "1w") timeDifference = 1440;//i.e. 1 day difference
		if (timeWindow == "1mo") timeDifference = 10080;//i.e. 1 week difference
		
		var toDate = dateParameter;
		toDate.setMinutes ( toDate.getMinutes() + timeDifference );
		dateString2 = formatDate(toDate);
		
		var dateTimePair = {fromDate:dateString1, toDate: dateString2};
		return dateTimePair;
	} else {
		var todayDate = new Date();
		dateString1 = formatDate(todayDate);
		var fromDate = new Date (dateString1);
		
		if (timeWindow == "1h") fromDate.setHours ( todayDate.getHours() - 1 );
		if (timeWindow == "1d") fromDate.setDate ( todayDate.getDate() - 1 );
		if (timeWindow == "1w") fromDate.setDate ( todayDate.getDate() - 7 );
		if (timeWindow == "1mo") fromDate.setMonth( todayDate.getMonth() - 1 );
		dateString2 = formatDate(fromDate);
		
		var dateTimePair = {fromDate:dateString2, toDate: dateString1};
		return dateTimePair;
	}
}

//Function to translate time window
function translateTimeWindow(window) {
	if (window == "1 hour") return "1h";
	if (window == "6 hour") return "6h";
	if (window == "12 hour") return "12h";
	if (window == "1 day") return "1d";
	if (window == "1 week") return "1w";
	if (window == "1 month") return "1mo";
	if (window == "1h") return "1 hour";
	if (window == "6h") return "6 hour";
	if (window == "12h") return "12 hour";
	if (window == "1d") return "1 day";
	if (window == "1w") return "1 week";
	if (window == "1mo") return "1 month";
	return window;
}

function addZero(x,n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

//Format Date in YYYY-MM-DDThh:mm:ss format
function formatDate(date) {
	var dd = date.getDate();
	var mm = date.getMonth()+1;//January is 0!
	var yyyy = (date.getFullYear());
	if(dd<10) dd='0'+dd;
	if(mm<10) mm='0'+mm;

	var hh = addZero(date.getHours(),2);
	var min = addZero(date.getMinutes(),2);
	var ss = addZero(date.getSeconds(),2);
	var milisec = addZero(date.getMilliseconds(),3);
	if (milisec != "" || milisec != 0 || milisec != "0") milisec = '.' + milisec;
	
	var formattedDateString = yyyy+'-'+mm+'-'+dd+'T'+hh+':'+min+':'+ss+milisec;
	return formattedDateString;
}

function calculateDateDisplayFormat(timeWindow) {
	var dateDisplayFormat = "D MMM YYYY, HH:mm";
	switch (timeWindow) {
		case "1h":
			dateDisplayFormat = "HH:mm";
			break;
		case "1d":
			dateDisplayFormat = "HH:mm";
			break;
		case "1w":
			dateDisplayFormat = "ddd, D MMM";
			break;
		case "1mo":
			dateDisplayFormat = "ddd, D MMM";
			break;
		default:
			break;
	}
	return dateDisplayFormat;
}

function calculateDateDisplayFormatForHistogram(timeWindow) {
	var dateDisplayFormat = "D MMM YYYY, HH:mm";
	switch (timeWindow) {
		case "1h":
			dateDisplayFormat = "ddd, D HH:mm";
			break;
		case "1d":
			dateDisplayFormat = "ddd, D HH:mm";
			break;
		case "1w":
			dateDisplayFormat = "ddd, D MMM HH:mm";
			break;
		case "1mo":
			dateDisplayFormat = "ddd, D MMM HH:mm";
			break;
		default:
			break;
	}
	return dateDisplayFormat;
}

//Folloing variable array is used for zoom graph 'zoomed' event call on Traffic Details section on Alert Details Page
var trafficDetailsDatesOnXAxis = [];

//Function to get Country ID By Country Code
function getCountryIDByCountryCode(countryCode) {
	var getCountryIDByCountryCode = {"AG":"01","BS":"02","BB":"03","BZ":"04","CA":"05","CR":"06","CU":"07","DM":"08","DO":"09","SV":"10","GD":"11","GT":"12","HT":"13","HN":"14","JM":"15","MX":"16","NI":"17","PA":"18","KN":"19","LC":"20","VC":"21","TT":"22","US":"23","GL":"24","AR":"25","BO":"26","BR":"27","CL":"28","CO":"29","EC":"30","FK":"31","GF":"32","GY":"33","PY":"34","PE":"35","SR":"36","UY":"37","VE":"38","DZ":"39","AO":"40","BJ":"41","BW":"42","BF":"43","BI":"44","CM":"45","CV":"46","CP":"47","TD":"48","KM":"49","CI":"50","CD":"51","DJ":"52","EG":"53","GQ":"54","ER":"55","ET":"56","GA":"57","GH":"58","GN":"59","GW":"60","KE":"61","LS":"62","LI":"63","LR":"64","MS":"65","MW":"66","ML":"67","MR":"68","MA":"69","MZ":"70","NA":"71","NE":"72","NG":"73","RW":"74","ST":"75","SN":"76","SC":"77","SL":"78","SO":"79","ZA":"80","SD":"81","SZ":"82","TZ":"83","TG":"84","TN":"85","UG":"86","WA":"87","ZM":"88","ZW":"89","GM":"90","CG":"91","MI":"92","AF":"93","AM":"94","AZ":"95","BD":"96","BT":"97","BN":"98","MM":"99","KH":"100","CN":"101","TP":"102","GE":"103","IN":"104","ID":"105","IA":"106","JP":"107","KZ":"108","KP":"109","KR":"110","KG":"111","LA":"112","MY":"113","MN":"114","NP":"115","PK":"116","PH":"117","RU":"118","SG":"119","LK":"120","TJ":"121","TH":"122","TM":"123","UZ":"124","VN":"125","TW":"126","HK":"127","MO":"128","AL":"129","AD":"130","AT":"131","BY":"132","BE":"133","BH":"134","BG":"135","HY":"136","CZ":"137","DK":"138","EE":"139","FI":"140","FR":"141","DE":"142","GR":"143","HU":"144","IS":"145","IR":"146","IT":"147","LV":"148","LN":"149","LT":"150","LU":"151","MK":"152","MT":"153","MV":"154","MC":"155","MG":"156","NL":"157","NO":"158","PL":"159","PT":"160","RO":"161","SM":"162","CS":"163","SK":"164","SI":"165","ES":"166","SE":"167","CH":"168","UA":"169","UK":"170","VA":"171","CY":"172","TK":"173","AU":"175","FJ":"176","KI":"177","MH":"178","FM":"179","NR":"180","NZ":"181","PW":"182","PG":"183","WS":"184","SB":"185","TO":"186","TV":"187","VU":"188","NC":"188","BA":"190","IZ":"191","IE":"192","JO":"193","KU":"194","LB":"195","OM":"196","QA":"197","SA":"198","SY":"199","AE":"200","YM":"201","PR":"202","KY":"203","SS":"204","KO":"205"};
	
	var countryID = getCountryIDByCountryCode[countryCode];
	return countryID;
}

//Function to format bytes
function formatBytes (bytes,decimals) {
	if (bytes == '' || bytes == undefined) return "-";
	if(bytes == 0) return '0 Byte';
	var k = 1000;
	var dm = decimals + 1 || 3;
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	var i = Math.floor(Math.log(bytes) / Math.log(k));
	return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
}

//Function to format miliseconds
function formatMiliseconds (miliseconds) {
	var seconds = Math.floor(miliseconds / 1000);
	var days = Math.floor(seconds / 86400);
	var hours = Math.floor((seconds % 86400) / 3600);
	var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
	var timeString = '';
	if(days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
	if(hours > 0) timeString += (hours > 1) ? (hours + " hours ") : (hours + " hour ");
	if(minutes > 0) timeString += (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");
	if(seconds > 0) timeString += (seconds > 1) ? (seconds + " seconds ") : (seconds + " second ");
	var ms = miliseconds % 1000;
    if(ms >= 0) timeString += (ms + " ms");
	return timeString;
}

function formatMicroseconds(microseconds) {
    return formatMiliseconds(Math.floor(microseconds / 1000));
}

var whitespace = " \t\n\r";
var isEmpty = function(s)
{
	return ((s == null) || (s.length == 0))
};

//Function to check for white space in a value
function isWhitespace(s) {
	var i;
	// Is s empty?
	if (isEmpty(s)) return true;

	// Search through string's characters one by one
	// until we find a non-whitespace character.
	// When we do, return false; if we don't, return true.
	for (i = 0; i < s.length; i++)
	{
		// Check that current character isn't whitespace.
		var c = s.charAt(i);

		if (whitespace.indexOf(c) == -1) return false;
	}

	// All characters are whitespace.
	return true;
}

//Function to check whether value is undefined or not
var checkForUndefined = function (value) {
	if (value != undefined) return value;
	else return "";
};

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
	
	milliseconds = (milliseconds > 0) ? ":" + milliseconds : "";

	return [hours, minutes, seconds];// + milliseconds;
}

String.prototype.capitalize = function(){
	return this.toLowerCase().replace( /\b\w/g, function (m) {
		return m.toUpperCase();
	});
};

function getCurrentTimeStamp() {
	var date = new Date();
	var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
	var am_pm = date.getHours() >= 12 ? "PM" : "AM";
	hours = hours < 10 ? "0" + hours : hours;
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	var time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
	return time;
}

function hasNumbers(t)
{
	return /\d/.test(t);
}

function isImage(src) {

    var deferred = $q.defer();

    var image = new Image();
    image.onerror = function() {
        deferred.resolve(false);
    };
    image.onload = function() {
        deferred.resolve(true);
    };
    image.src = src;

    return deferred.promise;
}

function toggleArrowNew(toggler, side){
	if(side=="left"){
		$(toggler).children(".open-arrow").css('display', 'block');
		$(toggler).children(".close-arrow").css('display', 'none');
	}else if(side=="right"){
		$(toggler).children(".close-arrow").css('display', 'block');
		$(toggler).children(".open-arrow").css('display', 'none');
	}
}

function getSideNew(listaClassi){
	var side;
	for(var i = 0; i<listaClassi.length; i++){
		if(listaClassi[i]=='sidebar-left'){
			side = "left";
			break;
		}else if(listaClassi[i]=='sidebar-right'){
			side = "right";
			break;
		}else{
			side = null;
		}
	}
	return side;
}

function doAnimationNew(container, containerWidth, sidebarSide, sidebarStatus){
	var toggler = container.children()[1];
	if(sidebarStatus=="opened"){
		if(sidebarSide=="left"){
			container.animate({
				left:-(containerWidth+2)
			});
			toggleArrowNew(toggler, "left");
		}else if(sidebarSide=="right"){
			container.animate({
				right:- (containerWidth +2)
			});
			toggleArrowNew(toggler, "right");
		}
		container.attr('data-status', 'closed');
	}else{
		if(sidebarSide=="left"){
			container.animate({
				left:0
			});
			toggleArrowNew(toggler, "right");
		}else if(sidebarSide=="right"){
			container.animate({
				right:0
			});
			toggleArrowNew(toggler, "left");
		}
		container.attr('data-status', 'opened');

	}
	
	if (flagForSearch) {
		var status = container.attr('data-status');
		if (status == 'opened') {
			$('.open-arrow').css("background", "url('img/icons/green-open-arrow.png')");
		}
		if (status == 'closed') {
			$('.close-arrow').css("background", "url('img/icons/green-close-arrow.png')");
		}
	}
}

//Following function is used to remove JSON object from array
Array.prototype.removeValue = function(name, value){
   var array = $.map(this, function(v,i){
      return v[name] === value ? null : v;
   });
   this.length = 0; //clear original array
   this.push.apply(this, array); //push all elements except the one we want to delete
}

//Following function is used to check For Login Details
function checkForLoginDetails() {
	if (isWhitespace($("#username").val())) {
		alert("Please enter your username");
		return false;
	}
	else if (isWhitespace($("#password").val())) {
		alert("Please enter your password");
		return false;
	}
	else {
		return true;
	}
}

//Function to check whether value is empty or not
var checkForEmpty = function (value) {
	if (value != '') return value;
	else return "{empty}";
};

function kFormatter (num) {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num
}

function nFormatter (value) {
	var n = value;
		var d = 2;
        if (n >= 0) {
            var x=(''+n).length,p=Math.pow,d=p(10,d);
            x-=x%3;
            return Math.round(n*d/p(10,x))/d+" KMGTPE"[x/3]
        } else {
            n = Math.abs(n);
            var x=(''+n).length,p=Math.pow,d=p(10,d);
            x-=x%3;
            return "-" + Math.round(n*d/p(10,x))/d+" KMGTPE"[x/3]
        }
}

function checkForNA (value) {
	if (value != '' && value != 'N/A') return value;
	else return "";
}

function capitalizeFirstLetter( value ) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}
