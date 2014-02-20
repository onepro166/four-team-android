$(function(){
    //NAV
    $('nav li').hover(function(){
        $(this).children('ul').stop().slideDown();
    });

    $('nav li').mouseleave(function(){
        $(this).children('ul').stop().slideUp();
    });

    //Setting Show/Hide
    $(".account.active").hover(function () {
        $(".setting").stop().slideDown();
    }, function () {
        $(".setting").stop().slideUp();
    });

    //Container Effect
    $(".container").animate({ "opacity": "1" }, 1000);

    //Auto Search
    $(".search-query").keyup(function () {
        var keyword = $(this).val();
        $.post("/search/autosearch", { keyword: keyword }, function (data) {
            $(".box-auto-search").html(data);
            $(".search-overplay").show();
            $("center").remove();
        });
    });

    $(".search-overplay").hover(function () {
        $(".auto-search").fadeOut(1000,function () {
            $(this).remove();
            $(".search-overplay").hide();
            $("center").remove();
        });
    });

    //Cart
    $(".buy").live("click", function () {
        var id = $(this).data("id");
        $.post("/cart/update", { id: id }, function (data) {
            $(".notice-cart").append('<div class="item remove' + data.id + '" data-id="' + data.id + '"><div class="close">x</div><img src="' + data.image + '" width="40" height="40" /><p>Đã thêm ' + data.name + ' vào giỏ hàng</p><div class="clearAll"></div></div>');
            $(".item.remove" + data.id).slideDown();
            $(".CountCart").text(data.CountCart);
            setTimeout(function () {
                $(".item.remove" + data.id).slideUp(500, function () {
                    $(".item.remove" + data.id).remove();
                });
                
            },4000);
        });
    });

    //Like Favorite
    $(".favorite").live("click", function () {
        var id = $(this).data("id");
        $.post("/account/favorite", { id: id }, function (data) {
            if (data.st == "success") {
                $(".data-" + id).removeClass("btn-success");
                $(".data-" + id).addClass("btn-danger");
                $(".data-" + id).removeClass("favorite");
                $(".data-" + id).addClass("dis-favorite");
                $(".data-" + id).html('<span class="icon-heart"></span>Đã thích');
                $(".notice-cart").append('<div class="item remove' + data.id + '" data-id="' + data.id + '"><div class="close">x</div><img src="' + data.image + '" width="40" height="40" /><p>Đã thêm ' + data.name + ' vào mục yêu thích của bạn</p><div class="clearAll"></div></div>');
                $(".item.remove" + data.id).slideDown();
                setTimeout(function () {
                    $(".item.remove" + data.id).slideUp(500, function () {
                        $(".item.remove" + data.id).remove();
                    });
                }, 4000);
            } else {
                fancybox('<div class="fx-notice errors">Vui lòng đăng nhập để sử dụng tính năng này.</div>');
            }
        });
    });

    //Like Favorite
    $(".dis-favorite").live("click", function () {
        var id = $(this).data("id");
        $.post("/account/disfavorite", { id: id }, function (data) {
            if (data.st == "success") {
                $(".data-" + id).removeClass("btn-danger");
                $(".data-" + id).addClass("btn-success");
                $(".data-" + id).removeClass("dis-favorite");
                $(".data-" + id).addClass("favorite");
                $(".data-" + id).html('<span class="icon-heart"></span>Yêu thích');
                $(".notice-cart").append('<div class="item remove' + data.id + '" data-id="' + data.id + '"><div class="close">x</div><img src="' + data.image + '" width="40" height="40" /><p>Đã xóa ' + data.name + ' khỏi mục yêu thích của bạn</p><div class="clearAll"></div></div>');
                $(".item.remove" + data.id).slideDown();
                setTimeout(function () {
                    $(".item.remove" + data.id).slideUp(500, function () {
                        $(".item.remove" + data.id).remove();
                    });
                }, 4000);
            } else {
                fancybox('<div class="fx-notice errors">Vui lòng đăng nhập để sử dụng tính năng này.</div>');
            }
        });
    });

    $(".notice-cart .close").live("click", function () {
        var id = $(this).parent(".item").data("id");
        $(this).parent(".item").slideUp(500);
        setTimeout(function () {
            $(".notice-cart .item.remove" + id).remove();
        }, 500)
    });

    //Check All
    $(".table-data #CheckAll").live("click",function () {
        if ($(".table-data #CheckAll").is(':checked')) {
            $(".table-data td input[type=checkbox]").each(function () {
                $(this).attr("checked", true);
            });

        } else {
            $(".table-data td input[type=checkbox]").each(function () {
                $(this).attr("checked", false);
            });
        }
    });

    //Menu
    $(".menu .item").hover(function(){
        if($(this).children(".a-item.active").length <= 0){
            $(".menu .item").find(".menu-arrow").hide();
            $(".menu .item").children(".a-item").stop(true, true).animate({'width':'162px'},0);
            $(".menu .item .box-subitem").stop(true, true).slideUp(0);
            if($(this).find(".menu-arrow").length > 0){
                $(this).children(".a-item").animate({'width':'177px'},1000);
            }
            $(this).find(".menu-arrow").show();
            $(this).children(".box-subitem").stop(true, true).slideDown();
        }
        
    },function() {
        
    }, 300);
    
    $(".menu .item").mouseleave(function(){
        if($(this).children(".a-item.active").length <= 0){
            $(".menu .item").find(".menu-arrow").hide();
            $(".menu .item").children(".a-item").stop(true, true).animate({'width':'162px'},0);
            setTimeout(function(){
               $(".menu .item").children(".a-item.active").stop(true, true).animate({'width':'177px'},1000);
               $(".menu .item").children(".a-item.active").find(".menu-arrow").show(); 
            },200);
            $(".menu .item .box-subitem").stop(true, true).slideUp();
        }
    });
    
    $(".menu .a-item").each(function (i) {
        if ($(this).data("id") == $(".content .box-subitem").data("id")) {
            $(this).addClass("active");
        }
    });
    
    $(".menu .item").children(".a-item.active").stop(true, true).animate({'width':'177px'},0);
    $(".menu .item").children(".a-item.active").find(".menu-arrow").show(); 
    
    //Notice
    $(".close-notice").live('click',function(){
        $(".notice").slideUp(200);
    });
    
    if(window.location.hash && window.location.hash == "#success"){
        $(".notice").append("Cập nhật thành công.");
        $(".notice").slideDown(200);
        setTimeout(function(){
            $(".notice").slideUp(200);
        },5000)
    }

    //Color Row Table
    if ($(".altrowstable").length > 0) {
        altRows('alternatecolor');
    }

    //Banner AutoPlay
    if ($(".banner .he-next").length > 0) {
        autoBanner();
    }

    //Map google
    $add = '<div class="box-info">';
    $add += '<label>Add:</label>';
    $add += '<div class="text">#41 Nguyen Thi Minh Khai Street, Ben Nghe ward District 1, HCM City</div>';
    $add += '<div class="clearAll"></div>';
    $add += '<label>Email:</label>';
    $add += '<div class="text">support@bowthemes.com</div>';
    $add += '<div class="clearAll"></div>';
    $add += '<label>Phone:</label>';
    $add += '<div class="text">(+84 8) 3510 8989 (31)</div>';
    $add += '<div class="clearAll"></div>';
    $add += '<label>Fax:</label>';
    $add += '<div class="text">(+84 8) 3510 2694</div>';
    $add += '<div class="clearAll"></div>';
    $add += '<label>Website:</label>';
    $add += '<div class="text">www.climaxi.com</div>';
    $add += '</div>';

    if ($('#map-canvas').length > 0) {
        initialize('10.7747163', '106.6761464', $add);
    }
});

//Show Errors
function show_errors(error) {
    $(".notice").html('<span class="close-notice icon-remove"></span>');
    $(".notice").addClass("errors");
    $(".notice").append(error);
    $(".notice").stop().slideDown(200);
}

function close_errors() {
    $(".notice").slideUp(200, function () {
        $(".notice").val("");
    });
}

//Show Errors
function show_errors_login(error) {
    $(".box-login .notice").html('<span class="close-notice icon-remove"></span>');
    $(".box-login .notice").addClass("errors");
    $(".box-login .notice").append(error);
    $(".box-login .notice").stop().slideDown(200);
}

//Show Errors Register
function show_errors_register(error) {
    $(".box-register .notice").html('<span class="close-notice icon-remove"></span>');
    $(".box-register .notice").addClass("errors");
    $(".box-register .notice").append(error);
    $(".box-register .notice").stop().slideDown(200);
}

//Pagination
function Pagination(numPage, pageSize, currentPage) {
    if($(".pagination-search").length <= 0){
        $(".pagination").pagination({
            items: numPage,
            itemsOnPage: pageSize,
            currentPage: currentPage,
            cssStyle: 'light-theme'
        });
    }
}

function PaginationSearch(numPage, pageSize, currentPage, Keyword) {
    $(".pagination").pagination({
        items: numPage,
        hrefTextPrefix: '?keyword=' + Keyword + '&page=',
        itemsOnPage: pageSize,
        currentPage: currentPage,
        cssStyle: 'light-theme'
    });
}



//Banner
function autoBanner(){
    setInterval(function(){ $(".banner .he-next").click(); },7000);
}

//Check Input
function checkInp(val, element, error){
	if(val==''){
		
	}else{
		$(element).html('');
		if(error=='cmnd'){
			if(isNaN(val)){
				$(element).html('CMND không hợp lệ');
				return false;
			}else if($('#info_cmnd').val().length<9 || $('#info_cmnd').val().length>10){
				return false;
			}
			return true;
		}
		
		if(error=='email'){
			var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (!val.match(filter)){
				$(element).html('Email không hợp lệ');
                return false;
			}
			return true;
		}
				
		if(error=='phone'){
			if(isNaN(val)){
				$(element).html('Số điện thoại không hợp lệ');
				return false;
			}else{
				if(val.substr(0,2)==='01'){
					if(val.length<11 || val.length>11){
						$(element).html('Số điện thoại không hợp lệ');
						return false;
					}
				}else{
					if(val.length<10 || val.length>10){
						$(element).html('Số điện thoại không hợp lệ');
						return false;
					}
				}
			}
			return true;
		}
		
		if(error=='username'){
			var filter = /^([a-zA-Z0-9.]+@){0,1}([a-zA-Z0-9.])+$/;
			if (!val.match(filter)){
				return false;
			}
			return true;
		}		
		return true;
	}
}

//Fancybox 
function fancybox(html) {
    $.fancybox([{
        padding: 0,
        margin: 0,
        centerOnScroll: true,
        content: html
    }]);
}

//Line Color Table
function altRows(id) {
    if (document.getElementsByTagName) {

        var table = document.getElementById(id);
        var rows = table.getElementsByTagName("tr");

        for (i = 1; i < rows.length; i++) {
            if (i % 2 == 0) {
                rows[i].className = "evenrowcolor";
            } else {
                rows[i].className = "oddrowcolor";
            }
        }
    }
}

// Map google
function initialize(x, y, $add) {
    var styles = [];

    $('#map-canvas').css({ 'display': 'block' });
    var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });

    var myLatlng = new google.maps.LatLng(x, y);
    var mapOptions = {
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        center: myLatlng,
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
    // map.disableScrollWheelZoom();

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: 'images/contact/map.png'
    });

    var contentString = '<div class="map_size_width">' + $add + '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: false,
        pixelOffset: new google.maps.Size(0, 10),
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: "floatPane",
        enableEventPropagation: false
    });

    //infowindow.open(map,marker);

    google.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close(map, marker);
    });
}

//google.maps.event.addDomListener(window, 'load', initialize);
/*End Tien Pham*/

//Xóa quảng cáo somee.com
$(document).ready(function () {
    $("div[style='position: fixed; z-index: 2147483647; left: 0px; bottom: 0px; height: 65px; right: 0px; display: block; width: 100%; background-color: transparent; margin: 0px; padding: 0px;']").remove();
    $("div[style='opacity: 0.9; z-index: 2147483647; position: fixed; left: 0px; bottom: 0px; height: 65px; right: 0px; display: block; width: 100%; background-color: #202020; margin: 0px; padding: 0px;']").remove();
    $("div[style='height: 65px;']").remove();
    $("center").remove();
    $("script[src='http://ads.mgmt.somee.com/serveimages/ad2/WholeInsert4.js']").remove();
});