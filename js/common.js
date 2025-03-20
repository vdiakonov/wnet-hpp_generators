var isIe = "Microsoft Internet Explorer" == navigator.appName;

function getObjectById( objectId) {
	// checkW3C DOM, then MSIE 4, then NN 4.
	if(document.getElementById && document.getElementById(objectId)) {
		return document.getElementById(objectId);
	} else if (document.all && document.all(objectId)) {
		return document.all(objectId);
	} else if (document.layers && document.layers[objectId]) {
		return document.layers[objectId];
	} else return null;
}

function changeObjectDisplayStyle( objectId, isDisplayed) {
	// first get a reference to the cross-browser style object and make sure the object exists
	obj = getObjectById( objectId);
	if(obj !== null){
		var objectStyle = obj.style;
		if(objectStyle) {
			objectStyle.display = isDisplayed ? '' : 'none';
			return true;
		} else return false; // we couldn't find the object's style, so we can't change its style
	} else return false; // we couldn't find the object, so we can't change its style
}

function changeObjectDisplayStyleAndDisable( objectId, isDisplayed) {

	if(changeObjectDisplayStyle(objectId, isDisplayed)){
		$('#'+objectId+ ' :input').attr("disabled", !isDisplayed);
		
		return true;
	}
	
	return false;
}

function changeObjectDisplayStyleIfExists( objectId, isDisplayed) {
	var obj = getObjectById( objectId);

	if( obj != null) {
		return changeObjectDisplayStyle( objectId, isDisplayed);
	}
	
	return false;
}

function changeObjectVisibility( objectId, newVisibility) {
	// first get a reference to the cross-browser style object and make sure the object exists
	var styleObject = getStyleObject(objectId);
	if(styleObject) {
		styleObject.visibility = newVisibility;
		return true;
	} else return false; // we couldn't find the object, so we can't change its visibility
}

function changeObjectDisplay( objectId, newDisplaySetting) {
	// first get a reference to the cross-browser style object and make sure the object exists
	var styleObject = getStyleObject(objectId);
	if(styleObject) {
		styleObject.display = newDisplaySetting;
		return true;
	} else {
		// we couldn't find the object, so we can't change its visibility
		return false;
	}
}

// function getStyleObject(string) -> returns style object
//  given a string containing the id of an object
//  the function returns the stylesheet of that object
//  or false if it can't find a stylesheet.  Handles
//  cross-browser compatibility issues.

function getStyleObject(objectId) {
	// checkW3C DOM, then MSIE 4, then NN 4.
	if(document.getElementById && document.getElementById(objectId)) {
		return document.getElementById(objectId).style;
	} else if (document.all && document.all(objectId)) {
		return document.all(objectId).style;
	} else if (document.layers && document.layers[objectId]) {
		return document.layers[objectId];
	} else return false;
}



//===================================================================================================
//Table rows manipulation functions
//===================================================================================================
function addTableRowIE( tbodyId, cellsHtml) {
	var table = getObjectById( tbodyId);
	var row = table.insertRow();

	for( j=0; j<cellsHtml.length; j++) {
		var cell = row.insertCell();
		cell.innerHTML = cellsHtml[j];
	}
	return row;
}

function addTableRowFF( tbodyId, cellsHtml) {
	var table = getObjectById( tbodyId);

	var row = document.createElement( "tr");
	table.appendChild( row);

	for( j=0; j<cellsHtml.length; j++) {
		var cell = document.createElement( "td");
		cell.innerHTML = cellsHtml[j];
		row.appendChild( cell);
	}
	return row;
}

function insertTableRowIE( tbodyId, cellsHtml, pos) {
    var rowHtml = '<tr>';
    for( j=0; j<cellsHtml.length; j++) {
		rowHtml += '<td>' + cellsHtml[j] + '</td>';
	}
    rowHtml+= '</tr>';
    $('#' + tbodyId).append(rowHtml);
    return $('#' + tbodyId + ' tr:last').get(0);
}

function insertTableRowFF( tbodyId, cellsHtml, pos) {
	var table = getObjectById( tbodyId);
	
	var row = document.createElement( "tr");
	var nextRow = table.getElementsByTagName( "tr")[pos];
	table.insertBefore( row, nextRow);
	for( j=0; j<cellsHtml.length; j++) {
		var cell = document.createElement( "td");
		cell.innerHTML = cellsHtml[j];
		row.appendChild( cell);
	}

	return row;
}

function addTableRow( tbodyId, cellsHtml) {
	if( isIe) return addTableRowIE( tbodyId, cellsHtml);
	else return addTableRowFF( tbodyId, cellsHtml);
}

function insertTableRow( tbodyId, cellsHtml, pos) {
	if( isIe) return insertTableRowIE( tbodyId, cellsHtml, pos);
	else return insertTableRowFF( tbodyId, cellsHtml, pos);
}

function deleteTableRow( tbodyId, rowId) {
	if( isIe) {
		var paramsTable = getObjectById( tbodyId);
		var origLength = paramsTable.rows.length;
		
		for ( var i=0; i<origLength; i++){
			if( paramsTable.rows[i].id == rowId) {
				var row = paramsTable.rows[i];
				paramsTable.deleteRow( i);
				return row;
			}
		}
	} else {
		var row = getObjectById( rowId);
		row.parentNode.removeChild( row);
		return row;
	}
}

function rewriteTableTabindexes(){
	var tcount = 0,
		icount = 0;
	$('table').each(function(){
		++tcount;
		$('button, select, input', this).each(function(){
			$(this).attr('tabindex', (tcount * 1000) + ++icount);
		})
	})
}

function toggleTableVisibility(tbodyId){
	$('#' + tbodyId).parents('table').toggle($('tr', '#' + tbodyId).length != 0);
}

function isInputTypeSupported( inputType) {
	if( inputType == "text") return true;
	var testType=document.createElement("input");
	testType.setAttribute("type", inputType);
	if(testType.type == "text") return false;
	else return true;
}

//===================================================================================================

function md5 ( string) {
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}

	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	 }

	 function F(x,y,z) { return (x & y) | ((~x) & z); }
	 function G(x,y,z) { return (x & z) | (y & (~z)); }
	 function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }

	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};

	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;

	string = Utf8Encode(string);

	x = ConvertToWordArray(string);

	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}

	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

	return temp.toLowerCase();
}

function moveOptionBetweenSelect( sourceId, targetId) {
	var selObj = getObjectById( sourceId);
	var i;

	for (i = 0; i < selObj.options.length; i++) {
		if (selObj.options[i].selected) {
			insertOption( selObj.options[i], targetId);
			selObj.remove( i);
			i--;
		}
	}
}

function validateRoleAssignment(sourceId, targetId) {
    var sourceObj = getObjectById( sourceId);
    var targetObj = getObjectById( targetId);
    var administratorSelected = false;
    var portfolioAdministratorSelected = false;
	var i;

	for (i = 0; i < sourceObj.options.length; i++) {
		if (sourceObj.options[i].selected) {
            if (sourceObj.options[i].text == 'Administrator') {
                administratorSelected = true;
                if(portfolioAdministratorSelected) {
                    return false;
                }
                for (j = 0; j < targetObj.options.length; j++) {  
                    if(targetObj.options[j].text == 'PortfolioAdministrator') {
                        return false;
                    }
                }
            }
            if (sourceObj.options[i].text == 'PortfolioAdministrator') {
                portfolioAdministratorSelected = true;
                if(administratorSelected) {
                    return false;
                }
                for (j = 0; j < targetObj.options.length; j++) {  
                    if(targetObj.options[j].text == 'Administrator' || targetObj.options[j].text == 'Billing') {
                        return false;
                    }
                }
            }
            if (sourceObj.options[i].text == 'Billing') {
                billingSelected = true;
                if(portfolioAdministratorSelected) {
                    return false;
                }
                for (j = 0; j < targetObj.options.length; j++) {  
                    if(targetObj.options[j].text == 'PortfolioAdministrator') {
                        return false;
                    }
                }
            }
		}
	}
    return true;
}

function clearMultipleSelect( id) {
    var selectObj = getObjectById( id);
    for (i = 0; i < selectObj.options.length; i++) {
			selectObj.remove( i);
            i--;
	}
}

function removeSelectOption(value, targetId) {
    var selectObj = getObjectById(targetId);
    for (i = 0; i < selectObj.options.length; i++) {
        if (value == selectObj.options[i].value) {
            selectObj.remove(i);
            return;
        }
    }
}

function insertOptionAlt( text, value, targetId, selected) {
    var option = $('<option />').html( text).val( value).attr('selected', selected);
    $(option).appendTo( $('#' + targetId));
}

function insertOption( elOptSrc, targetId) {
	var elOptNew = document.createElement( 'option');
	elOptNew.text = elOptSrc.text;
	elOptNew.value = elOptSrc.value;

	var elSel = getObjectById( targetId);
	var i;

	var elOptPrev = null;

	for (i = 0; i < elSel.options.length; i++) {
		if (elSel.options[i].text > elOptSrc.text) {
			elOptPrev = elSel.options[i];
			break;
		}
	}

	if( isIe) {
		elSel.add( elOptNew, i);
	} else {
		elSel.add( elOptNew, elOptPrev);
	}
}

function addSelectOptionAfterPos( value, text, targetId, startPos) {
    var option = $('<option />').html( text).val( value);
    var options = $('#' + targetId).find('option');

    for (i = startPos; i <= options.length; i++) {
        if( i == options.length) {
            $(option).appendTo( $('#' + targetId));
            return false;
        }

        var opt = options[i];

        var optTmp = $('<option />').html( text);
        
        if( $(opt).html() > $(optTmp).html()
        	|| ($(opt).html() == $(optTmp).html() && $(opt).val() > value)) {
            $(opt).before( option);
            return false;
        }
    }
}

function addSelectOption( value, text, targetId) {
	addSelectOptionAfterPos( value, text, targetId, 0);
}

function formatAmount( amount, minorUnitsNum) {
	var strAmount = new String( amount);

	var decSeparator = '.';
	
	var decSeparatorIndex = strAmount.indexOf( '.');
	if( decSeparatorIndex<0) {
		decSeparatorIndex = strAmount.indexOf( ',');
		if( decSeparatorIndex>0) {
			decSeparator = ',';
		}
	}

	if( decSeparatorIndex < 0 && minorUnitsNum!=0) {
		strAmount += decSeparator;
		decSeparatorIndex = strAmount.length - 1;
	}

		var actualFractionDigitsNum = strAmount.length - decSeparatorIndex - 1;

		for( var i=0; i< minorUnitsNum - actualFractionDigitsNum; i++) {
		strAmount += '0';
	}

	return strAmount;
}

function roundAmount( amount, minorUnitsNum) {
		var d = minorUnitsNum || 0;
		var m = Math.pow(10, d);
		var n = +(d ? amount * m : amount);
		n = n.toFixed(8); // Avoid rounding errors
		var i = Math.floor(n), f = n - i;
		var e = 1e-8; // Allow for rounding errors in f
		var r = (f > 0.5 - e && f < 0.5 + e) ?
			((i % 2 == 0) ? i : i + 1) : Math.round(n);
		return d ? r / m : r;
}

function roundAmountHalfUp(amount, minorUnits) {
    var power = Math.pow(10, minorUnits);
    return Math.round(amount * power) / power;
}

function isSafeNumber(value) {
	if($.isNumeric(value)) {
		return value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER;
	}

	return false;
}

function cleanCardNumber(cardnumber) {
	cardnumber = cardnumber.split(' ').join('');
	cardnumber = cardnumber.split('-').join('');
	return cardnumber;
}

function mask(toMask, startShown, lastShown, maskChar) {
    var maskedStr = "";

    if(toMask.trim().length !== 0) {
      if((startShown == 0 && lastShown == 0)
          || (startShown + lastShown >= toMask.trim().length || startShown < 0 || lastShown < 0)) {
          maskedStr = maskChar.repeat(toMask.trim().length);
      } else {
          maskedStr = toMask.replace(
    		  new RegExp("(.{"+startShown+"}).*(.{"+lastShown+"})","g"), 
    		  "$1"+ maskChar.repeat(toMask.length - startShown - lastShown) +"$2"
		  );
      }
    }

	return maskedStr;
}

String.prototype.trim = function() {
	a = this.replace(/^\s+/, '');
	return a.replace(/\s+$/, '');
};

function chooseSelectOption( selectId, currentValue) {
	var selectObj = getObjectById( selectId);

	for( var i=0; i<selectObj.length; i++) {
		if( selectObj.options[i].value == currentValue){
			selectObj.options[i].selected = true;
			return;
		}
	}
}

function axRequest(url, data, divToUpdate, callback){
	if(typeof callback != 'function') callback = axSuccess;
	if($(divToUpdate).length > 0) $(divToUpdate).empty().addClass('ajax-loading-nowidth');
	$.ajax({
		 type: 'POST',
		 url: url,
		 data: data,
		 dataType: 'html',
		 success: function(response) {
			if(callback !== axSuccess) axSuccess(response, divToUpdate);
			callback(response, divToUpdate);
			hidePreloader();
		 }				 
	});
}

function axSyncGetRequest(url, data){
	var result;
	$.ajax({
		 type: 'GET',
		 url: url,
		 async: false,
		 data: data,
		 dataType: 'xml',
		 success: function(response) {
		 	loading = false;
			result = response;
		 },
		 error: function(response){
		 	result = false;
		 }
	});
	return result;
}

function axSuccess(response, divToUpdate){
    var resp = $($.parseHTML(response));
    var respPageBody = $('.pageBody', resp);
    var pageBody = $('.pageBody');
    if (respPageBody.length > 0 && pageBody.length > 0) {
        pageBody.html(respPageBody.html());
    } else if ($(divToUpdate).length > 0) {
        $(divToUpdate).removeClass('ajax-loading-nowidth').html(response);
    }
}


function checkUnCheckAll( chkBoxName, isChecked) {
	$( "input:checkbox[name=" + chkBoxName + "]").each( function() {
        this.checked = isChecked;
   });
}

function setCheckboxEnabled( checkboxId, isEnabled, unCheckOnDisable) {
    unCheckOnDisable = typeof unCheckOnDisable !== 'undefined' ? unCheckOnDisable : true;
    var checkbox = $('input:checkbox[id=' + checkboxId + ']');
    if (checkbox.length) {
        checkbox.prop('disabled', !isEnabled);
        if (unCheckOnDisable && !isEnabled) checkbox.prop('checked', false);
    }
}

function decodeHTML(htmlText) {
    return $('<div/>').html(htmlText).text();
}

function markFieldRequired( rowId, isRequired) {
    var row =  $( "#" + rowId);
    if(row.length){
        if(isRequired){
            if($('.asterisk', row).length == 0) $('.fieldLabel', row).append('<span class="asterisk">*</span>');
        }else{
            $('span.asterisk', row).remove();
        };
    };
    $('.info').toggle($('.asterisk:visible').length > 0); 
}


function showElement(selector, show){
    var el = $(selector);
    if(el.length == 0) return false;
    if(typeof show == 'undefined') show = true;
    if(!show) {
		el.children('input, select').val('');
	}
	if(show && el.attr('id') === 'cardexpiryrow') {
		el.children('select[name=CCMONTH]').val('');
		el.children('select[name=CCYEAR]').val(String(new Date().getFullYear()).slice(2));
	}
	if(show && el.attr('id') === 'accountTypeRow') {
		el.children('select').prop('selectedIndex', 0);
	}
    el.toggle(show);
    return true;
}

function setTimeZoneFromGatewatToMerchant(timeZoneId){
    var selectedTimeZone = $("select[id*='gateway'] option:selected").attr('data-timezone');
    $('select[id*="timezoneid"]').val(selectedTimeZone);
}

if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
        'use strict';
        if (this == null) { // check if `this` is null or undefined
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        // To convert string to integer.
        count = +count;
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count |= 0; // floors and rounds-down it.
        if (str.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= (1 << 28)) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        while (count >>= 1) { // shift it by multiple of 2 because this is binary summation of series
            str += str; // binary summation
        }
        str += str.substring(0, str.length * count - str.length);
        return str;
    }
}

if (typeof Number.MIN_SAFE_INTEGER == "undefined") {
    Number.MIN_SAFE_INTEGER = -9007199254740991;
}
if (typeof Number.MAX_SAFE_INTEGER == "undefined") {
    Number.MAX_SAFE_INTEGER = 9007199254740991;
}
/*
$(document).ready(function(){
	$('#enhancedDataLink').on('click', function(){
		$('#enhancedData').toggle();
	});
}); */
