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

function commonFooter() {
	//// COMMON FOOTER
	$('.container').append('<div style="text-align:center; margin:100px auto"> <hr/> <div class="row"> <div class="col-lg-12"> <p>  &copy; The Zedign House | <a href="/privacy.html">Privacy Policy </a> &nbsp; &nbsp; &nbsp; <a rel="nofollow" href="https://twitter.com/zedign"> ' +
		'<span class="rrssb-icon"><svg width="26" height="26" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M24.253 8.756C24.69 17.08 18.297 24.182 9.97 24.62a15.093 15.093 0 0 1-8.86-2.32c2.702.18 5.375-.648 7.507-2.32a5.417 5.417 0 0 1-4.49-3.64c.802.13 1.62.077 2.4-.154a5.416 5.416 0 0 1-4.412-5.11 5.43 5.43 0 0 0 2.168.387A5.416 5.416 0 0 1 2.89 4.498a15.09 15.09 0 0 0 10.913 5.573 5.185 5.185 0 0 1 3.434-6.48 5.18 5.18 0 0 1 5.546 1.682 9.076 9.076 0 0 0 3.33-1.317 5.038 5.038 0 0 1-2.4 2.942 9.068 9.068 0 0 0 3.02-.85 5.05 5.05 0 0 1-2.48 2.71z"/></svg></span>' +
		' </a> </p> </div> </div></div>');
}

function monographPanel() {
	//// ------------ MONOGRAPH LINK -----------
	/// zasnum get from: aData.d[1] for "item", content for "single"
	var zasnum = "";
	zasnum = content.split("|")[2] || "";
	/// HTML "item":  $('#items').after and "single":  $('.container').append
	$('.container').append(' <a style="color:inherit;text-decoration:none;" href="https://books.zedign.com/zas/' + zasnum + '.html"><div style="max-width:320px;margin:10px auto;" class="media"> <div class="media-left"> <img style="width:100px" class="media-object" src="https://books.zedign.com/i/p/' + zasnum + '_2UPCO.png" alt=""> </div> <div class="media-body"> <p>Full monograph in digital and print editions: <i>' + catname + ' - Paintings &amp; Drawings</i> (Zedign Art Series Book #' + zasnum + ').</p> </div> </div></a> ');

}

function singlePagination() {

	// 
	//////// PAGINATION //////////
	//

	// $('.container').append(
	// 	paginateHTML(
	// 		siteSection,
	// 		$('#prevnext li:eq(0) a').attr('href'),
	// 		$('#prevnext li:eq(0) a').text(),
	// 		$('#prevnext li:eq(1) a').attr('href'),
	// 		$('#prevnext li:eq(1) a').text()
	// 	)
	// );

	var purl = ($('#prevnext li:eq(0) a').attr('href')).replace("../../",
		//
		"https://art.zedign.com/zas/" /// <<< prod!
		// "/art.zedign.com/zas/" // <<< testing!
	);

	var nurl = ($('#prevnext li:eq(1) a').attr('href')).replace("../../",
		//
		"https://art.zedign.com/zas/" /// <<< prod!
		// "/art.zedign.com/zas/" // <<< testing!
	);

	$('.container').append(
		'<table style="margin:10px auto;font-size:90%"><tr><td colspan="3" style="text-align:center"> &lt;&lt; BROWSE &gt;&gt; </td></tr><tr>' +
		'<td style="padding:5px;background:#aaa"><x-cmemblnk class="cmemblnk" href="' + purl + '"> </x-cmemblnk></td>' +
		'<td>&nbsp;&nbsp;</td>' +
		'<td style="padding:5px;background:#aaa"><x-cmemblnk class="cmemblnk" href="' + nurl + '"> </x-cmemblnk></td> </tr></table><hr/>'
	);

	// <x-cmemblnk class="cmemblnk" href="https://www..com/"> </x-cmemblnk>

	/// remove hardcoded #prevnext
	$('#prevnext').remove();

}

function image_src_of_housepages_standalone() {

	// v2
	// IMP: paints if EITHER above the fold already, or onscroll!
	// watches for full URL e.g. `<x-cmemblnk class="cmemblnk" href="https://www..com/"> </x-cmemblnk>`

	function paintIt(el) {
		try {

			if ((el.attr('href').trim()).match('\/')) {

				var url = el.attr('href').trim();
				console.log(url)
				// var slug = url.match('zedign.com/(.+)$')[1];
				var title = (el.text()).slice(0, -1);
				el.html('<div class="dddd_linkwrap">' +

					'<iframe class="dddd_iframe" src="../../../common/c/?s=imgsrc&n=' + url + '" scrolling="no" frameborder="0" border="0"></iframe>' +
					'<a class="dddd_link" href="' + url + '" target="_top"></a></div>' +
					'');

			} /// if 

		} catch (e) {}
	}

	if ($('x-cmemblnk').length) {

		$('head').append('<style>.places_mentioned_in_comment_v2 a {border-radius:5px; background:none; padding:0;} .cmemblnk {} .cmemblnk::after {display:none;} .dddd_iframe {background: url(../../../common/ldng.gif) no-repeat center; overflow:hidden; width:120px;height:144px;} .dddd_linkwrap {position: relative; width: 120px; height: 144px;} .dddd_link {position: absolute; top: 0; left: 0; width:120px!important; height: 144px!important;} </style>');

		$(document).ready(function() {

			$('.cmemblnk:not(.executed)').each(function() {

				var top_of_element = $(this).offset().top;
				var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();

				if (bottom_of_screen > top_of_element) {
					paintIt($(this));
					$(this).addClass('executed');

				}
			});

		});

		$(window).scroll(function() {
			$('.cmemblnk:not(.executed)').each(function() {
				var top_of_element = $(this).offset().top;
				var bottom_of_element = $(this).offset().top + $(this).outerHeight();
				var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
				var top_of_screen = $(window).scrollTop();
				if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {

					paintIt($(this));
					$(this).addClass('executed');

				} //// if bottom_of_screen

			}); // $('.cmemblnk:not 

		}); /// $(window).scroll

	}

	//
}

function shuffleArray(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// 		url: '/art.zedign.com/common/sitemap/posters.txt',

//  + "?max_dim=200";

function searchPosters(url, keyword, callback) {
	$.ajax({
		url: url,
		dataType: 'text',
		success: function(data) {
			var lines = data.split('\n');
			lines = shuffleArray(lines);
			var matches = lines.filter(line => line.includes(keyword));
			var index = 0;
			var loadMore = function() {
				if (index < matches.length) {
					var nextMatches = matches.slice(index, index + 5);
					index += 3;
					var divs = nextMatches.map(function(match) {
						var div = $('<div style="inline-block;height:100%"><a href="' + match + '"><img style="height:100%;width:auto" loading="lazy" src="" alt /></a></div>')[0];
						var url = div.querySelector('a').href;
						$.ajax({
							url: url,
							dataType: 'html',
							success: function(data) {
								data = data.replace(/_680\.jpg/igm, "_200.jpg"); // IMP: Replace **ALL** _680.jpg with _200.jpg in the HTML data or else it'll fetch both!
								console.log(data);
								var linkTag = $(data).filter('link[rel="image_src"]');
								if (linkTag.length > 0) {
									var imgSrc = linkTag.attr('href');
									imgSrc = imgSrc.replace("_680.jpg", "_200.jpg");
									div.querySelector('img').src = imgSrc;
								}
							}
						});
						return div;
					});
					callback(divs);
				}
			};
			loadMore();
			$('#results').scroll(function() {
				if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight || $(this).scrollLeft() + $(this).innerWidth() >= this.scrollWidth) {
					loadMore();
				}
			});
		}
	});
}

// 
// 
// 

///// orig /// keep!
// function searchPosters(url, keyword, callback) {
// 	$.ajax({
// 		url: url,
// 		dataType: 'text',
// 		success: function(data) {
// 			var lines = data.split('\n');
// 			lines = shuffleArray(lines);
// 			var matches = lines.filter(line => line.includes(keyword));
// 			var index = 0;
// 			var loadMore = function() {
// 				if (index < matches.length) {
// 					var nextMatches = matches.slice(index, index + 5);
// 					index += 3;
// 					var divs = nextMatches.map(function(match) {
// 						var div = $('<div style="inline-block;height:100%"><a href="' + match + '"><img style="height:100%;width:auto" loading="lazy" src="" alt /></a></div>')[0];
// 						var url = div.querySelector('a').href;
// 						$.ajax({
// 							url: url,
// 							dataType: 'html',
// 							success: function(data) {
// data = data.replace(/_680\.jpg/igm, "_200.jpg"); // IMP: Replace **ALL** _680.jpg with _200.jpg in the HTML data or else it'll fetch both!
// console.log(data);
// 								var linkTag = $(data).filter('link[rel="image_src"]');
// 								if (linkTag.length > 0) {
// 									var imgSrc = linkTag.attr('href');
// 									imgSrc = imgSrc.replace("_680.jpg", "_200.jpg");
// 									div.querySelector('img').src = imgSrc;
// 								}
// 							}
// 						});
// 						return div;
// 					});
// 					callback(divs);
// 				}
// 			};
// 			loadMore();
// 			$('#results').scroll(function() {
// 				if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight || $(this).scrollLeft() + $(this).innerWidth() >= this.scrollWidth) {
// 					loadMore();
// 				}
// 			});
// 		}
// 	});
// }

function embedded_images_lazyload() {
	// Define a function to load images
	var loadImages = function() {
		$('.lazyload').each(function() {
			var top_of_element = $(this).offset().top;
			var bottom_of_element = $(this).offset().top + $(this).outerHeight();
			var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
			var top_of_screen = $(window).scrollTop();

			if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
				// the element is visible, load the image
				var img = $(this).find('img');
				if (!img.data('loaded')) { // check if the image has not been loaded
					img.attr('src', img.data('src'));
					img.data('loaded', true); // mark the image as loaded
				}
			}
		});
	};

	// Call the function once to load images that are in view upon page load
	loadImages();

	// Call the function again whenever the window is scrolled
	$(window).scroll(loadImages);
}

//////////////////   /funcs   ///////////////////////

//////////////////////  MAIN  ////////////////////////////

$(document).ready(function() {

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
			//// classic posters button
			' <a style="background: #d8d9ff; margin: 5px" href="' + content[0] + '/posters/" role="button" class="btn btn-default">Classic Posters</a> ' +
			// 
			//// other buttons depending on availability
			// signature-posters
			((content[5] == "y") ? ' <a style="background: #fff2e7; margin: 5px" href="' + content[0] + '/signature-posters/" role="button" class="btn btn-default">Signature Posters</a> ' : "") +
			// postcards
			((content[6] == "y") ? ' <a style="background: #effcd1;  margin: 5px" href="' + content[0] + '/postcards/" role="button" class="btn btn-default">Postcards</a> ' : "") +
			// 
			// monographs
			((content[4].match(/[0-9]+/)) ? ' <a style="background: #e1f6f7; margin: 5px; font-size: 80%; padding: 5px;" href="https://books.zedign.com/zas/' + content[4] + '.html" role="button" class="btn btn-default">MONOGRAPH</a> ' : "") +
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
	/// ITEMPAGES ARE THESE: /zas/claude-monet/posters/ 
	if (siteSection == "item") {

		/// REMOVE HARDCODED LINKS
		$('.container > ul').remove();
		//// BREADCRUMS
		$('h1').before(
			//////// BREADCRUMBS
			'<ol class="breadcrumb" style="text-transform: uppercase"> <li><a href="/zas/">Home</a></li> <li><a href="../../#' + catslug + '">' + catname + '</a></li>  <li><a href="./">' + dirname + '</a></li> </ol>' +
			// 
			'');
		// ITEM BODY

		//// change bg to gradient to blend zaz's grey
		// if (window.location.href.indexOf("/posters/") > -1) {
		$('head').append('<style>#items .thumbnail {background:linear-gradient(to right, #b4b0af, #e6e4e5);} .thumbnail img {border-width:5px; border-style:solid; border-color: #b4b0af #e6e4e5 #e6e4e5 #b4b0af }</style>');
		// }

		$('.container').append('<div id="items" class="row">' + '');
		// 
		// 
		var html = "";
		$.each(aData.d.slice(1), function(i, data) { /// remove 1st empty item!
			// console.log(l);
			var items = data.split("|");

			// IMP! js var aData has trailing spaces because of gd limits workarounds!
			var item = items.map(item => item.trim());

			var link = 'https://www.zazzle.com/' + item[0] + '?rf=238115903514203736';

			var img = ('https://rlv.zcache.com/' + item[1] + '?max_dim=500');

			/// skip if product is deleted (we've put http://art.zedign.com/common/404.jpg in it in the source via gd)
			if (img.match(/404\.jpg/)) {
				return true; /// skip iteration
			}
			// img = img.match(/404\.jpg/) ? "http://art.zedign.com/common/404.jpg" : img;

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

		//// APPEND MONOGRAPH LINK
		/// zasnum get from: aData.d[1] for "item", content for "single"
		var zasnum = "";
		zasnum = aData.d[1].split("|")[2] || "";
		/// HTML "item":  $('#items').after and "single":  $('.container').append
		$('#items').after(' <a style="color:inherit;text-decoration:none;" href="https://books.zedign.com/zas/' + zasnum + '.html"><div style="max-width:320px;margin:10px auto;" class="media"> <div class="media-left"> <img style="width:100px" class="media-object" src="https://books.zedign.com/i/p/' + zasnum + '_2UPCO.png" alt=""> </div> <div class="media-body"> <p>Full monograph in digital and print editions: <i>' + catname + ' - Paintings &amp; Drawings</i> (Zedign Art Series Book #' + zasnum + ').</p> </div> </div></a> ');

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

	/// SINGLE ARE /zas/claude-monet/posters/a-corner-of-the-apartment_2261.html
	if (siteSection == "single") {

		//// LOGO AND BREADCRUMS
		$('.container').append(
			//////// BREADCRUMBS
			'<ol class="breadcrumb" style="text-transform: uppercase"> <li><a href="/zas/">Home</a></li> <li><a href="../../#' + catslug + '">' + catname + '</a></li>  <li><a href="./">' + dirname + '</a></li> </ol>' +
			// 
			'');

		//// change bg to gradient to blend zaz's grey
		// if (window.location.href.indexOf("/posters/") > -1) {
		$('head').append('<style> .panel-body {background:linear-gradient(to right, #b4b0af, #e6e4e5);} .panel-body img {border-width:5px; border-style:solid; border-color: #b4b0af #e6e4e5 #e6e4e5 #b4b0af} </style>');
		// }

		/// SINGLE BODY
		$('.container').append(
			// 
			'<div class="panel panel-default"> <div class="panel-heading"> </div> <div class="panel-body"> </div> <div class="panel-footer"> </div> </div>');
		//
		$('.panel-heading').prepend($('h1')); // Prepend it to .panel-heading
		$('p').appendTo('.panel-body');
		/// BUTTONS 
		$('.panel-footer').html('<div class="row"><div class="col-xs-6 text-right"> <a role="button" class="btn btn-primary" href="' + $('p a').attr("href") + '" >  Details </a> </div><div class="col-xs-6"> <a role="button" class="btn btn-warning" href="' + $('p a').attr("href") + '" > Buy Now  </a> </div></div>');

		singlePagination();

		monographPanel();

	}

	//////////////////////  /SINGLE  ////////////////////////////

	///////// ON ALL COMMON **AFTER** //////////////////////////

	commonFooter();

	///////// /ON ALL COMMON **AFTER** //////////////////////////

	/////////////////    DYN_CATCHER   ///////////////////
	// 
	if (siteSection == "dyn_catcher") {

		//// search
		if (qs.get("s") == "s") {

			$('body').append('<div id="your_carousel"></div>');

			var kw = qs.get("n");

			var url = '/art.zedign.com/common/sitemap/posters.txt';

			// var res = searchPosters(kw);

			// $('body').append(
			// '<style>#mother {height:200px; display: flex; justify-content: space-between; align-items: stretch;} #scroll-left, #scroll-right {background-color:grey; border: none; color: white; padding:0 2px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; transition-duration: 0.4s; cursor: pointer;} #scroll-left:hover, #scroll-right:hover { background-color:darkgrey; } #results{ flex-grow: 1; overflow-x: scroll; overflow-y: hidden; height: 100%; }</style>' +

			// '<div id="mother"> <button id="scroll-left">&#9668;</button> <div style="height:100%;display: flex; overflow-x: auto; overflow-y:hidden;" id="results"></div><button id="scroll-right">&#9658;</button></div>' +
			// '');

			// var url = '/art.zedign.com/common/sitemap/posters.txt';

			// searchPosters(url, 'portrait', function(divs) {
			// 	$('#results').append(divs);
			// });

			// $('#scroll-left').click(function() {
			// 	$('#results').animate({
			// 		scrollLeft: "-=100px"
			// 	}, "slow");
			// });

			// $('#scroll-right').click(function() {
			// 	$('#results').animate({
			// 		scrollLeft: "+=100px"
			// 	}, "slow");
			// });

			// // embedded_images_lazyload();

		}

		//// IMAGE_SRC_OF_LOCPAGES 1/2
		if (qs.get("s") == "imgsrc") {

			var url = qs.get("n");

			$.ajax({
				// 
				// 
				url: url,
				cache: true, //// IMPORTANT!
				success: function(data) {

					$('head').append('<style>body{margin:0;padding:0}</style>');
					// Create a temporary DOM element to parse the HTML data
					var tempDom = $('<output>').append($.parseHTML(data));
					var image_src = $('link[rel="image_src"]', tempDom).attr('href');
					// 
					var title = $('title', tempDom).text();
					title = (title).
					replace(/\s+/igm, " ").
					replace(/^(.+ \- )(.*)$/igm, "$2").
					replace(/\s+/igm, " ");

					// console.log(title);
					// 
					var elementHtml = $('#locpgsb2 .p1 > .ad > b', tempDom).text();

					$('head').append('<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">');

					$('body').append(
						// 
						'<style> ' +
						'.dddd_mother{overflow:hidden:width:120px;height:144px}' +
						//// title 
						'.dddd_w {font-family:Oswald,Arial,Helvetica,sans-serif; width:120px;font-weight: bold; text-transform:uppercase; font-size: 11px; line-height: 1em; text-align: center; height:24px; overflow:hidden;} .dddd { height: 24px; overflow: hidden; width:120px; display:table-cell;text-align:center; vertical-align:middle;color:black; background: darkgrey; line-height: 0.8;} ' +
						//// image
						' .container { width: 120px; height: 120px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; } .container::before { content: ""; background-image: url(\'' + image_src + '\'); background-size: cover; filter: blur(8px); position: absolute; width: 200%; height: 200%; top: -50%; left: -50%; } .fit-and-centered { position: relative; max-height: 100%; max-width: 100%; }' +
						'</style>' +
						// 

						'<div class="dddd_w">' +
						'<div class="dddd">' + title + '</div>' +
						'</div>' +
						//
						'<div class="container">' +
						' <img class="fit-and-centered" src="' + image_src + '" alt="your image"> ' +
						'</div>' +
						// 

						// 

						'');

				}
			});

		}

		// 

		// 
	}
	// 
	/////////////////    /DYN_CATCHER   ///////////////////
	////////////////
	///////////////

	image_src_of_housepages_standalone();

});

// $(window).on("load", function() {

// 	// 
// 	// affLocalize("", "", thsBlg_zzl);
// 	// 
// });
//
//