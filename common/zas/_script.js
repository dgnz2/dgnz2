////////  art.zedign.com/common/zas/script.js ////////////////
// 
// 
thsBlg_zzl = "\x32\x33\x38\x31\x31\x35\x39\x30\x33\x35\x31\x34\x32\x30\x33\x37\x33\x36";
// 
if (typeof siteSection == "undefined") {
	siteSection = "main";
}
// 
// 
/////////////// funcs ////////////////////////
function affLocalize(objAmAffIds, strEPNId, strZzlId) {
	try {
		// v6
		// req: jq
		function zzlLocalize(strTLD, url) {
			if (strTLD) {
				switch (strTLD) {
					case 'UK':
					case 'JP':
					case 'NZ':
						strTLD = 'co.' + strTLD;
						break;
					case 'AU':
					case 'BR':
						strTLD = 'com.' + strTLD;
						break;
					case 'CA':
					case 'DE':
					case 'ES':
					case 'FR':
					case 'PT':
					case 'SE':
					case 'NL':
					case 'AT':
					case 'CH':
					case 'BE':
						strTLD = strTLD;
						break;
					default:
						strTLD = 'com';
				}
			}
			var affUrl, zProd, zAffTag;
			zProd = parseURL(url.replace(/[\?\&]rf\=[0-9]+/, ""));
			affUrl = 'https://www.zazzle.' + strTLD + zProd.path + zProd.querystring;
			zAffTag = (affUrl.match(/\?/) ? '&rf=' : '?rf=') + strZzlId;
			affUrl = affUrl + zAffTag;
			return affUrl;
		}

		function ebLocalize(strTLD, url) {
			if (strTLD) {
				switch (strTLD) {
					case 'AT':
						cntry = "5221-53469-19255-0";
						icep = "229473";
						break;
					case 'AU':
						cntry = "705-53470-19255-0";
						icep = "229515";
						break;
					case 'BE':
						cntry = "1553-53471-19255-0";
						icep = "229522";
						break;
					case 'CA':
						cntry = "706-53473-19255-0";
						icep = "229529";
						break;
					case 'CH':
						cntry = "5222-53480-19255-0";
						icep = "229536";
						break;
					case 'DE':
						cntry = "707-53477-19255-0";
						icep = "229487";
						break;
					case 'ES':
						cntry = "1185-53479-19255-0";
						icep = "229501";
						break;
					case 'FR':
						cntry = "709-53476-19255-0";
						icep = "229480";
						break;
					case 'IE':
						cntry = "5282-53468-19255-0";
						icep = "229543";
						break;
					case 'IN':
						cntry = "4686-53472-19255-0";
						icep = "229550";
						break;
					case 'IT':
						cntry = "724-53478-19255-0";
						icep = "229494";
						break;
					case 'NL':
						cntry = "1346-53482-19255-0";
						icep = "229557";
						break;
					case 'UK':
						cntry = "710-53481-19255-0";
						icep = "229508";
						break;
					default:
						cntry = "711-53200-19255-0";
						icep = "229466";
				}
			}
			var affUrl = url;
			affUrl = affUrl.replace(/\/[0-9]+\-[0-9]+\-19255\-0\//, '/' + cntry + '/');
			affUrl = affUrl.replace(/vectorid\=[0-9]+/, 'icep_vectorid=' + icep);
			return affUrl;
		}
		// 
		function amLocalize(itmId, strTLD) {
			if (strTLD) {
				switch (strTLD) {
					case 'JP':
						strTLD = 'co.jp';
						break;
					case 'GB':
					case 'JE':
					case 'GG':
					case 'IM':
					case 'IE':
					case 'UK':
						strTLD = 'co.uk';
						break;
					case 'CH':
					case 'AT':
						strTLD = 'de';
						break;
					case 'PT':
						strTLD = 'es';
						break;
					default:
						strTLD = (objAmAffIds[strTLD.toLowerCase()] != null ? strTLD.toLowerCase() : 'com');
						break;
				}
				affId = objAmAffIds[strTLD.toLowerCase()];
			}
			// OneLink Mod  DEL IF NOT USING OneLink <script> in html
			strTLD = (strTLD == 'ca' || strTLD == 'co.uk') ? "com" : strTLD;
			affId = thsBlg_amz.com; ///// default US tag for this site
			// /OneLink Mod
			return "https://www.amazon." + strTLD + "/exec/obidos/ASIN/" + itmId + "/" + affId;
		}
		// 
		function parseURL(href) {
			// v2 returns url parths as given. works with relative ones too.
			var match = href.match(/^(?:(https?\:)\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
			return match && {
				href: href,
				protocol: match[1],
				host: match[2],
				hostname: match[3],
				port: match[4],
				path: match[5],
				querystring: match[6],
				hash: match[7]
			}
		}
		// 
		$.ajax({
			method: "GET",
			dataType: "json",
			cache: true,
			/// for latest https://stackoverflow.com/q/391979
			url: "https://hutils.loxal.net/whois" // new 06/22
		}).done(function(json) {
			// console.log('affLocalize: json: ' + json)
			try {
				var strTLD = json.countryIso;
				// console.log('affLocalize: strTLD: ' + strTLD)
				// var strTLD = "AU"; // for tstng
				var zzlUrlReg = /zazzle\./;
				var epnUrlReg = /vectorid/;
				var amzUrlReg = RegExp("/([a-zA-Z0-9]{10})(?:[/?]|$)");
				$('a').each(function(index) {
					var url = unescape($(this).attr('href'));
					// AMZ
					if (url.match(amzUrlReg)) {
						var itmId = url.match(amzUrlReg)[1];
						// console.log(itmId)
						// amLocalize is OFF (USING ONELINK) (uncommnt to enable)
						// $(this).attr('href', amLocalize(itmId, strTLD));
					}
					// EPN
					if (url.match(epnUrlReg)) {
						$(this).attr('href', ebLocalize(strTLD, url));
					}
					// ZZL
					if (url.match(zzlUrlReg)) {
						$(this).attr('href', zzlLocalize(strTLD, url));
					}
				});
				// 
			} catch (e) {}
		}).fail(function(error) {
			// console.log(error);
		});
	} catch (e) {}
}
///////////////////  QS   //////////////////
/// qs.get("s") ...
/// if (qs2.contains("q")) {	pkSrQry = qs2.get("q"); }
function sc_qstrng(qs) {
	this.params = {};
	if (qs == null) qs = location.search.substring(1, location.search.length);
	if (qs.length == 0) return;
	qs = qs.replace(/\+/g, ' ');
	var args = qs.split('&');
	for (var i = 0; i < args.length; i++) {
		var pair = args[i].split('=');
		var name = decodeURIComponent(pair[0]);
		var value = (pair.length == 2) ? decodeURIComponent(pair[1]) : name;
		this.params[name] = value;
	}
}
sc_qstrng.prototype.get = function(key, default_) {
	var value = this.params[key];
	return (value != null) ? value : default_;
}
sc_qstrng.prototype.contains = function(key) {
	var value = this.params[key];
	return (value != null);
}
var qs = new sc_qstrng();
///////////////////  /QS   //////////////////
function gCSE(cseId, divId, phText, target) {
	// v5 - all inclusive new API cse 
	// best use within: $(window).on("load"...
	// REQ JQUERY
	// cse layout:full-width, theme:default
	// <div id="DivId"></div>
	// opt phText, 
	// divId: divId of container 
	// target : divId of results, or url of target pg or LEAVE UNDEFINED FOR AUTO ON SAME PG.
	var placeholder = (typeof phText === 'undefined') ? "" : phText;
	$.getScript('//www.google.com/cse/cse.js?cx=' + cseId)
		.done(function(script, textStatus) {
			var target = (typeof target === 'undefined') ? "one" : target;
			// appnd BooStr-negating styles...
			$('head').append('<style> input.gsc-input, .gsc-input-box, .gsc-input-box-hover, .gsc-input-box-focus, .gsc-search-button { box-sizing: content-box; line-height: normal; } .gsc-control-cse { margin: 0!important; padding: 0!important; } </style>');
			if (target == "one") {
				$('#' + divId).html('<div class="gcse-search"></div>');
			} else if (target.match(/\/\//)) {
				$('#' + divId).html('<div class="gcse-searchbox" data-resultsUrl="' + target + '" data-newWindow="true" data-queryParameterName="q" ></div>');
			} else {
				$('#' + divId).html('<div class="gcse-searchbox"></div>');
				$('#' + target).html('<div class="gcse-searchresults"></div>');
			}
			// console.log("done");
		})
		.fail(function(jqxhr, settings, exception) {
			// console.log("failed");
		});
	// 
	(function() {
		// cse call back
		window.__gcse = {
			callback: myCSECallback
		};

		function myCSECallback() {
			// console.log('EXECUTED');
			// rmve "Cstm srch" txt frm gcse input
			$('input.gsc-input').attr('placeholder', ' ' + placeholder);
		}
	})();
}

function viewport(percentage, property) {
	// v2 (vmax) - returns viewport % in pixels
	// property='vw','vh','vmax', usage: viewport(40, "vh")+'px';
	var w = Math.round((Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) * percentage / 100);
	var h = Math.round((Math.max(document.documentElement.clientHeight, window.innerHeight || 0)) * percentage / 100);
	if (property == "vw") {
		return w;
	}
	if (property == "vh") {
		return h;
	}
	if (property == "vmax") {
		if (w > h) {
			return w;
		}
		if (h > w) {
			return h;
		}
		if (w == h) {
			return w;
		}
	}
}

function addthis_a(aTid, divId, customUrlTitle, url, title, contId, inStyle, addServHtml) {
	/**
	- V3 - 
	*/
	var addthis_id = aTid;
	var markup = addServHtml;
	//
	if (customUrlTitle == "custom") {
		var customUrlHtml = ' addthis:url="' + url + '" addthis:title="' + title + '" class="addthis_button_';
		try {
			markup = addServHtml.replace(/class\="addthis_button_/gm, customUrlHtml);
		} catch (e) {}
	}
	var html = '<style>' + inStyle + '</style>' +
		'<div id="' + contId + '" class="addthis_toolbox addthis_32x32_style ' + contId + '"> ' + markup + '</div>';
	var addthis_config = addthis_config || {};
	addthis_config.pubid = addthis_id;
	// 
	if (document.getElementById('addthisAsyncScript')) {
		/////////////////////
	} else {
		var addthisScript = document.createElement('script');
		addthisScript.setAttribute('src', '//s7.addthis.com/js/300/addthis_widget.js#domready=1');
		addthisScript.setAttribute('id', 'addthisAsyncScript');
		document.body.appendChild(addthisScript);
	}
	document.getElementById(divId).insertAdjacentHTML("beforeend", html);
	try {
		addthis.toolbox('.' + contId);
	} catch (e) {}
}

function scRollToTopButton() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function paginateHTML(opt, pHref, pTxt, nHref, nTxt) {
	try {
		var pH = '<li><a href="' + pHref + '"> <b>&lt;&lt;</b> ' + pTxt + '</a></li> ';
		var nH = '<li><a href="' + nHref + '"> ' + nTxt + ' <b>&gt;&gt;</b> </a></li> ';
		// 
		if (opt == "single") {
			var b = (
				(pHref.trim().match(/_/igm)) ? pH : ''
			) + (
				(nHref.trim().match(/_/igm)) ? nH : ''
			);
		}
		// 
		if (opt == "item") {
			var b = (
				(pHref.trim().match(/.+/igm)) ? pH : ''
			) + (
				(nHref.trim().match(/.+/igm)) ? nH : ''
			);
		}
		// 
		var a = '<div style="margin:50px auto"> <center><h5> — MORE — </h5></center>' +
			'<nav style="text-transform:uppercase" aria-label="..."> <ul class="pager"> ' + b + '</ul> </nav> </div>';
		return a;
	} catch (e) {}
}
//////////////////   /funcs   ///////////////////////
//////////////////////  MAIN  ////////////////////////////
///////// ON ALL COMMON **BEFORE**
switch (siteSection) { // like if (abc == "cou") {}... 
	case "main":
		pthComn = '../common';
		break;
	case "item":
		pthComn = '../../../common';
		break;
	case "single":
		pthComn = '../../../common';
		break;
	default:
		pthComn = '/common';
}
// 
$('.container').prepend(
	// LOGO
	' <img style="display:block; margin:10px auto; width:125px" src="' + pthComn + '/zedign_logo.jpg" /> ');
// 
// 
if (siteSection == "main") {
	$('.container').append('<div id="allitems" class="row">');
	var html = "";
	$('.item').each(function(i) {
		var content = ($(this).attr('data-d')).split('|');
		// console.log(content[4]);
		html += '<hr/> <div id="' + content[0] + '" class="media"> <div class="media-left" style=""> <img style="width:' + viewport(25, 'vw') + 'px; max-width:130px;" class="lazy media-object" data-src="https://books.zedign.com/i/e/' + content[4] + '.jpg" src="" alt=""> </div> <div class="media-body"> <h3 class="media-heading">' + content[1] + '</h3>' +
		//// posters button
		' <a style="margin: 5px" href="' + content[0] + '/posters/" role="button" class="btn btn-default">Classic Posters</a> ' +
		//// other buttons depending on availability
		// signature-posters
		((content[5] == "y") ? ' <a style="margin: 5px" href="' + content[0] + '/signature-posters/" role="button" class="btn btn-default">Signature Posters</a> ' : "") +
		// postcards
		((content[6] == "y") ? ' <a style="margin: 5px" href="' + content[0] + '/postcards/" role="button" class="btn btn-default">Postcards</a> ' : "") +
		// 
		// 
		'' +
		/// buttons 
		// 
		'</div> </div> ';
	});
	$('#items').remove();
	$('#allitems').append(html);
	// 
	// 
	$(document).ready(function() {
		///// JQUERY LAZY  https://github.com/dkern/jquery.lazy
		// 1. prepare <img class="lazy" data-src="image.jpg" src="" <<< !IMP
		// 2. load content
		// 3. execute below
		if (jQuery().Lazy) {
			$('.lazy').Lazy({
				// your configuration goes here
				scrollDirection: 'vertical',
				effect: 'fadeIn',
				effectTime: 1000,
				visibleOnly: true,
				onError: function(element) {
					console.log('error loading ' + element.data('src'));
				}
			});
		}
	}); // (document).ready
}
//////////////////////  MAIN  ////////////////////////////
//
//////////////////////  ITEMPAGES  ////////////////////////////
if (siteSection == "item") {
	/// REMOVE HARDCODED LINKS
	$('.container > ul').remove();
	//// BREADCRUMS
	$('h1').before(
		//////// BREADCRUMBS
		'<ol class="breadcrumb" style="text-transform: capitalize"> <li><a href="/zas/">Home</a></li> <li><a href="../../#' + catslug + '">' + catname + '</a></li>  <li><a href="./">' + dirname + '</a></li> </ol>' +
		// 
		'');
	// ITEM BODY
	$('.container').append(
		'<div id="items" class="row">' +
		'');
	// 
	// 
	var html = "";
	$.each(aData.d.slice(1), function(i, data) { /// remove 1st empty item!
		// console.log(l);
		var item = data.split("|");
		var link = 'https://www.zazzle.com/' + item[0] + '?rf=238115903514203736';
		var img = ('https://rlv.zcache.com/' + item[1] + '?max_dim=500');
		var zas = item[2];
		var title = item[3].replace(/^(.+) \- (.+)$/, "$2");
		var slug = item[4];
		html += '<div class="col-sm-6 col-md-4"> <div class="thumbnail"> <a rel="nofollow" href="' + link + '"> <img style="width:200px" class="lazy" data-src="' + img + '" src="" alt="' + title + '"> <div class="caption"> <h4>' + title + '</h4> </div> </a>  ' +
		// 
		' <a href="' + slug + '.html" style="color:#444!important"> ' +
			'  <span class="glyphicon glyphicon-link" aria-hidden="true"></span>  &nbsp;  ' +
			'  <span class="glyphicon glyphicon-star" aria-hidden="true"></span>  &nbsp;  ' +
			'  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>  &nbsp;  ' +
			'</a>   ' +
		// 
		'     </div> </div>   ';
		// console.log(slug);
	});
	$('#items').append(html);
	// 
	//
	//////// PAGINATION //////////
	var prev = aData.p.trim() ? '../../' + aData.p.trim() + '/' + dirslug + '/' : "#";
	var next = aData.n.trim() ? '../../' + aData.n.trim() + '/' + dirslug + '/' : "#";
	$('.container').append(
		paginateHTML(
			siteSection,
			prev,
			aData.p.trim().replace(/\-/g, " "),
			next,
			aData.n.trim().replace(/\-/g, " ")
		)
	);
	// 
	$(document).ready(function() {
		///// JQUERY LAZY  https://github.com/dkern/jquery.lazy
		// 1. prepare <img class="lazy" data-src="image.jpg" src="" <<< !IMP
		// 2. load content
		// 3. execute below
		if (jQuery().Lazy) {
			$('.lazy').Lazy({
				// your configuration goes here
				scrollDirection: 'vertical',
				effect: 'fadeIn',
				effectTime: 1000,
				visibleOnly: true,
				onError: function(element) {
					console.log('error loading ' + element.data('src'));
				}
			});
		}
		/////
		///// LINK IN IFRAME MODAL jquery.modalLink
		// $.getScript("../../../common/modallink/jquery.modalLink-1.0.0.js")
		// 	.done(function() {
		// 		$('head').append('<link rel="stylesheet" href="../../../common/modallink/jquery.modalLink-1.0.0.css">');
		// 		// 
		// 		// 
		// 		$(".modal-link").modalLink({
		// 			width: viewport(90, 'vw'),
		// 			height: viewport(80, 'vh'),
		// 			showTitle: false,
		// 			showClose: true,
		// 			overlayOpacity: 0.6,
		// 			method: "GET", // GET, POST, REF, CLONE
		// 			disableScroll: true,
		// 			onHideScroll: function() {},
		// 			onShowScroll: function() {}
		// 		});
		// 	});
		////
	}); // (document).ready
}
//////////////////////  SINGLE  ////////////////////////////
if (siteSection == "single") {
	//// LOGO AND BREADCRUMS
	$('.container').append(
		//////// BREADCRUMBS
		'<ol class="breadcrumb" style="text-transform: capitalize"> <li><a href="/zas/">Home</a></li> <li><a href="../../#' + catslug + '">' + catname + '</a></li>  <li><a href="./">' + dirname + '</a></li> </ol>' +
		// 
		'');
	/// SINGLE BODY
	$('.container').append(
		// 
		'<div class="panel panel-default"> <div class="panel-heading"> </div> <div class="panel-body"> </div> <div class="panel-footer"> </div> </div>');
	//
	$('.panel-heading').html('<h3>' + $('h1').html() + '</h3>');
	$('h1').remove();
	$('p').appendTo('.panel-body');
	$('.panel-footer').html('<div class="row"><div class="col-xs-6"> <a role="button" class="btn btn-primary" href="' + $('p a').attr("href") + '" >  Details </a> </div><div class="col-xs-6"> <a role="button" class="btn btn-warning" href="' + $('p a').attr("href") + '" > Buy Now  </a> </div></div>');
	// 
	//////// PAGINATION //////////
	//
	$('.container').append(
		paginateHTML(
			siteSection,
			$('#prevnext li:eq(0) a').attr('href'),
			$('#prevnext li:eq(0) a').text(),
			$('#prevnext li:eq(1) a').attr('href'),
			$('#prevnext li:eq(1) a').text()
		)
	);
	/// remove hardcoded #prevnext
	$('#prevnext').remove();
	// 
	// 
	// 
}
///////// ON ALL COMMON **AFTER**
////////
//// COMMON FOOTER
$('.container').append('<div style="text-align:center; margin:100px auto"> <hr/> <div class="row"> <div class="col-lg-12"> <p>  &copy; The Zedign House | <a href="/privacy.html">Privacy Policy </a> &nbsp; &nbsp; &nbsp; <a rel="nofollow" href="https://twitter.com/zedign"> ' +
	'<span class="rrssb-icon"><svg width="26" height="26" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M24.253 8.756C24.69 17.08 18.297 24.182 9.97 24.62a15.093 15.093 0 0 1-8.86-2.32c2.702.18 5.375-.648 7.507-2.32a5.417 5.417 0 0 1-4.49-3.64c.802.13 1.62.077 2.4-.154a5.416 5.416 0 0 1-4.412-5.11 5.43 5.43 0 0 0 2.168.387A5.416 5.416 0 0 1 2.89 4.498a15.09 15.09 0 0 0 10.913 5.573 5.185 5.185 0 0 1 3.434-6.48 5.18 5.18 0 0 1 5.546 1.682 9.076 9.076 0 0 0 3.33-1.317 5.038 5.038 0 0 1-2.4 2.942 9.068 9.068 0 0 0 3.02-.85 5.05 5.05 0 0 1-2.48 2.71z"/></svg></span>' +
	' </a> </p> </div> </div></div>');
//
/////////////////    DYN_CATCHER   ///////////////////
// 
if (siteSection == "dyn_catcher") {
	// 
	// 
	if (qs.get("s") == "fdbk") {
		// 
		function formSubmit() {
			// alert('hello');
			// return false;
			//// join all fields in one to send
			$('#entry_703433844').val((
				$('input[name*="wikipedia_url"] ').val() +
				$('input[name*="namea"] ').val() +
				$('input[name*="emaila"] ').val() +
				$('input[name*="namec"] ').val() +
				$('input[name*="emailc"] ').val() +
				', ' + $('textarea[name*="messagec"] ').val()
				// 
			).trim());
			/// testing
			// alert(new URLSearchParams(new FormData(document.getElementById('fdbk'))).toString());
			// 
			// $('input[name*="group"] ').remove();
			// $('input[name*="wikipedia_url"] ').remove();
			// $('input[id*="name"] ').remove();
			// $('input[id*="email"] ').remove();
			// 
			$('form').trigger('goForward'); // api call for slideform to go forward to the last "thank you" slide
			return true;
		}
		// 
		$.getScript("../common/slideform/js/slideform.js")
			.done(function() {
				$.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js")
					.done(function() {
						$.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.min.js")
							.done(function() {
								var gdf = "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x6F\x63\x73\x2E\x67\x6F\x6F\x67\x6C\x65\x2E\x63\x6F\x6D\x2F\x66\x6F\x72\x6D\x73\x2F\x64\x2F\x65\x2F\x31\x46\x41\x49\x70\x51\x4C\x53\x63\x31\x79\x47\x32\x71\x79\x78\x4D\x76\x41\x76\x4B\x5A\x4F\x44\x78\x4A\x4B\x6E\x30\x6A\x4B\x37\x57\x4D\x2D\x76\x49\x73\x43\x57\x31\x34\x64\x44\x57\x7A\x30\x36\x2D\x46\x70\x6F\x7A\x35\x6C\x67\x2F\x66\x6F\x72\x6D\x52\x65\x73\x70\x6F\x6E\x73\x65";
								//place your code here, the scripts are all loaded
								$('head').append(
									'<link rel="stylesheet" href="../common/slideform/css/slideform.css">' +
									'<style>html, body { font-family:sans-serif; font-size:90%}</style>' +
									/// no messing with full size as it doesn't show properly
									// '<style>html, body { font-family:sans-serif; height: 100%; width: 100%; padding: 0; margin: 0; overflow: hidden; position: fixed; top: 0; bottom: 0; left: 0; right: 0; }</style>' +
									'');
								$('body').prepend('' +
									// 
									'<iframe name="OUR_hidden_iframe" id="OUR_hidden_iframe" style="display:none;" onload=""></iframe> ' +
									//  onsubmit="doit();"  
									'<form onsubmit="formSubmit();" action="' + gdf + '" name="unique_frm_name" id="fdbk" target="OUR_hidden_iframe">' +
									//
									////// first slide must be an intro for this thing to work
									'<div class="slideform-slide"> <div class="slideform-group">' +
									'<h1>Contact us </h1>' +
									'<p>Please use this form to contact us.</p>' +
									'</div> </div>' +
									// 
									// 1. menu
									'<div class="slideform-slide"> <div class="slideform-group">' +
									'<h2>Reason for contacting: </h2>' +
									'<h3>Please select one</h3>' +
									'<div class="options options-buttons">' +
									// Q1
									'<label for="" > <input type="radio" name="group1" value="reasona"> <span>Request to make a new Zedign Art Series book of a master\'s work not currently part of the series. </span> </label>' +
									// Q3
									'<label for="" > <input type="radio" name="group1" value="reasonc"> <span>Hire us to make a book for you</span> </label>' +
									// Q2
									'<label for="" onclick="window.top.location.href=\'https://art.zedign.com/order/\';return false;" > <input type="radio" name="group1" value="reasonb"> <span>Request a poster from an image </span> </label>' +
									// 
									'</div> </div> </div>' +
									// 
									// 2. sub menu
									'<div class="slideform-slide"> <div class="slideform-group">' +
									// Q1
									'<div data-condition="input.group1 == \'reasona\'">' +
									'<h2>Which Artist</h2><p>Enter a wikipedia URL (e.g. <a target="_blank" href="https://en.wikipedia.org/wiki/Claude_Monet">https://en.wikipedia.org/wiki/Claude_Monet</a>)</p>' +
									'<label><input data-msg="Please enter valid wikipedia url" pattern=".+[Ww]ikipedia.+" type="text" name="wikipedia_url" placeholder="URL"></label>' +
									'</div>' +
									// Q2
									'<div data-condition="input.group1 == \'reasonc\'">' +
									'<h2>Hire us for less</h2><p>If you\'re an artist with a portfolio of works of art, and wish to have it published in digital and paper formats… or an author with a manuscript who needs professional quality books designed… contact us. We\'ll give you a complete package of ebook and paper book, ready to be uploaded and published on Amazon. (We can even show you how to set up an Amazon account for yourself so that you will have complete control and rewards.)</p>' +
									'</div>' +
									// 
									'<div data-condition="input.group1 == \'reasonb\'"> </div>' +
									'</div> </div>' +
									// 
									// 3. form
									'<div class="slideform-slide"> <div class="slideform-group">' +
									/// Q1
									'<div data-condition="input.group1 == \'reasona\'"> ' +
									'<label> <span>Your Name</span> <input id="namea" type="text" name="namea" placeholder="Your name"> </label>' +
									'<label> <span>Your Email</span> <input id="emaila" type="text" name="emaila" placeholder="Your email"> </label> ' +
									// ' <input name="entry.703433844" id="entry_703433844" data-comment="Feedback" value="" type="hidden"> ' +
									'</div>' +
									// 
									/// Q2
									'<div data-condition="input.group1 == \'reasonc\'"> ' +
									'<label> <span>Your Name</span> <input id="namec" type="text" name="namec" placeholder="Your name"> </label>' +
									'<label> <span>Your Email</span> <input id="emailc" type="text" name="emailc" placeholder="Your email"> </label> ' +
									'<label> <span>Your Message</span> <textarea name="messagec"></textarea> </label>' +
									// '<input name="entry.703433844" id="entry_703433844" data-comment="Feedback" value="" type="hidden"> ' +
									'</div>' +
									// 
									'</div> </div>' +
									// 
									// 4. final submit button (combines allinto gd input)
									'<div class="slideform-slide"> <div class="slideform-group">' +
									'<p>Hit Submit to send...</p>' +
									'<input name="entry.703433844" id="entry_703433844" data-comment="Feedback" value="" type="hidden"> ' +
									'</div> </div>' +
									// 
									// 
									//// LAST THANK YOU SLIDE AFTER FORM SUBMIT VIA formSubmit()
									////// last slide must be a dummy like this for this thing to work
									'<div class="slideform-slide"> <div class="slideform-group">' +
									'<h2 _NOTANYMORE_style="height:' + viewport(25, "vh") + 'px;">Thank you! Your feedback is sent.<h2><div class="options options-list">' +
									'</div> </div> </div>' +
									// 
									// 
									// 
									// '<footer class="slideform-footer">' +
									// '<div class="buttons">' +
									// '<button class="slideform-btn slideform-btn-next">Next' +
									// '</button>' +
									// '<button class="slideform-btn slideform-btn-prev">Prev' +
									// '</button>' +
									// '</div>' +
									// '</footer>' +
									'</form>' +
									'');
								// 
								// 
								//// disable enter key on form because entering it doesn't send always!
								$('form').keypress(
									function(event) {
										if (event.which == '13') {
											event.preventDefault();
										}
									});
								// 
								var $form = $('form');
								$form.slideform({
									// submit: null,
									nextButtonText: 'Next',
									prevButtonText: 'Prev',
									submitButtonText: 'Submit',
									// 
									// submit: function(event, form) {
									// 	// $form.trigger('goForward');
									// 	// $form.submit();
									// },
									// form validation using jquery.validate
									// NEW: using html tags now
									//// NOTE: THIS IS JUST TO REQUIRE THE ENTIRE group1 of multiple choices,
									//// the <inputs> enterable fields are validated via html tags in markup
									validate: {
										rules: {
											group1: {
												required: true,
											},
											wikipedia_url: {
												required: true,
											}
											// 
										},
									},
									//// /form validation using jquery.validate
								});
							});
					});
			});
		// 
		// 
		// 
		// 
		// 
	}
	// 
	if (qs.get("s") == "amz") {
		var qry = decodeURIComponent(qs.get("n"));
		var title = decodeURIComponent(qs.get("a") || "");
		amzNtv_sync(
			'custom', // type
			qry, // qry
			'zdn-20', // affId
			'9732ec60fea4e122cb9626c8ab23caa2', // linkId
			title, // title
			'' // defCat
		);
		$.getScript("https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.14/iframeResizer.contentWindow.min.js")
			.done(function() {});
	}
	// 
}
// 
/////////////////    /DYN_CATCHER   ///////////////////
////////////////
///////////////
$(window).on("load", function() {
	// 
	affLocalize("", "", thsBlg_zzl);
	// 
});
//
//