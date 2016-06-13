/**
 * @Author: Mohammad M. AlBanna
 * Facebook: FB.com/MBanna.info
 * Copyright © 2016 MBanna.info
 */
 
$(function() {
    //Tabs
    $('ul.tabs li').click(function() {
        $('.tab-content').enscroll("destroy");
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
        //--------------------Scroll ------------------//
        $('.current.tab-content').enscroll({
            verticalTrackClass: 'track4',
            verticalHandleClass: 'handle4',
            minScrollbarLength: 28,
            showOnHover: false
        });
    });
    
    //Load Like facebook Page button 
    setTimeout(function(){
        $(".social-media").prepend('<iframe src="https://www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FMBanna.info&amp;width=250&amp;height=250&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false&amp;appId=627072280724068" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:250px; height:210px;" allowTransparency="true"></iframe>');
    },1000);
	//----------------------------------------------------------------------------------//
    //Load Setting
    chrome.storage.sync.get(["blockFromAllUsers","onLikePagesSetting","onAppsSetting","onEventsSetting","onPokesSettings"],function(result){
        if(typeof result.blockFromAllUsers !== "undefined" && result.blockFromAllUsers == "blockFromAllUsers"){
    		$("input[type='radio']#blockFromAllUsers").prop("checked", true);
    	} 

    	if(typeof result.blockFromAllUsers !== "undefined" && result.blockFromAllUsers == "allowFromAllUsers"){
    		$("input[type='radio']#allowFromAllUsers").prop("checked", true);
            $("#tab-1 input").attr("disabled","disabled");
            $("input[type='radio']#blockFromAllUsers").removeAttr("disabled");
    	}

        if( result.onLikePagesSetting == "Y"){
            $("input[type='checkbox']#onLikePagesSetting").prop("checked", true);
        }else{
            $("input[type='checkbox']#onLikePagesSetting").prop("checked", false);
        }

        if(result.onAppsSetting == "Y"){
            $("input[type='checkbox']#onAppsSetting").prop("checked", true);
        }else{
            $("input[type='checkbox']#onAppsSetting").prop("checked", false);
        }

        if(result.onEventsSetting == "Y"){
            $("input[type='checkbox']#onEventsSetting").prop("checked", true);
        }else{
            $("input[type='checkbox']#onEventsSetting").prop("checked", false);
        }

        if(result.onPokesSettings == "Y"){
            $("input[type='checkbox']#onPokesSettings").prop("checked", true);
        }else{
            $("input[type='checkbox']#onPokesSettings").prop("checked", false);
        }
    });


	//----------------------------------------------------------------------------------//
    //Save extension setting block from all or allow from all
    $("body").on("change", "input[name='blockFromAllUsers']", function() {
        var value = null;
        if ($(this).val() == "allowFromAllUsers") {
            value = "allowFromAllUsers";
            $("#tab-1 input").attr("disabled","disabled");
            $("input[type='radio']").removeAttr("disabled");
        } else {
            value = "blockFromAllUsers";
            $("#tab-1 input").removeAttr("disabled");
        }
        syncStorage("blockFromAllUsers", value);
    });
    
    //On Setting 
    $("body").on("change", "input[name='onLikePagesSetting']", function() {
        var value = null;
        if ($(this).is(":checked")) {
            value = "Y";
        } else {
            value = "N";
        }
        syncStorage("onLikePagesSetting", value);
    });

    $("body").on("change", "input[name='onAppsSetting']", function() {
        var value = null;
        if ($(this).is(":checked")) {
            value = "Y";
        } else {
            value = "N";
        }
        syncStorage("onAppsSetting", value);
    });

    $("body").on("change", "input[name='onEventsSetting']", function() {
        var value = null;
        if ($(this).is(":checked")) {
            value = "Y";
        } else {
            value = "N";
        }
        syncStorage("onEventsSetting", value);
    });

    $("body").on("change", "input[name='onPokesSettings']", function() {
        var value = null;
        if ($(this).is(":checked")) {
            value = "Y";
        } else {
            value = "N";
        }
        syncStorage("onPokesSettings", value);
    });

    //--------------------View Products--------------------//
    $.getJSON("http://www.mbanna.info/extensions/products.json", function(json, textStatus) {
        if (json.length <= 0) {
            return;
        }
        $(".my-products-list").html("");
        $.each(json, function(index, el) {
            var node = $('<li class="products-list">\
                    <div class="products-list-image">\
                        <img src="'+escapeHTML(el[2])+'" />\
                    </div>\
                    <div class="products-info">\
                        <a title="'+ escapeHTML(el[0]) +'" target="_blank" href="' + escapeHTML(el[3]) + '">' + escapeHTML(el[0]) + '</a>\
                        <a title="'+ escapeHTML(el[1]) +'" target="_blank" href="' + escapeHTML(el[3]) + '">' + escapeHTML(el[1]) + '</a>\
                    </div>\
                </li>').appendTo($(".my-products-list")); 
        });
    });

    //--------------------Share Buttons--------------------//
    $("#twitterShare").on("click",function(){
        window.open("https://twitter.com/share?via=_MBanna&text=Hi there! I'm using Facebook Invitations Blocker chrome extension! Try it Now: http://goo.gl/AL4rkZ");
    });

    $("#facebookShare").on("click",function(){
        chrome.browserAction.getBadgeText({},function(result){
                result = parseInt(result);
                if(typeof result !== "undefined" && !isNaN(result) && result > 0){
                    window.open("https://www.facebook.com/dialog/feed?app_id=627072280724068&ref=adcounter&link=http://goo.gl/AL4rkZ&name=I'm using Facebook Invitations Blocker chrome extension to block and hide invitations from all Facebook's users, it's blocked "+(result)+" invitation(s)! Try it Now&redirect_uri=https://www.facebook.com&actions=%5B%7B%22name%22%3A%22Download%20More%20Extensions%22%2C%22link%22%3A%22http%3A%2F%2Fgoo.gl/YuwJ5P%22%7D%5D");
                }else{
                    window.open("https://www.facebook.com/dialog/feed?app_id=627072280724068&ref=adcounter&link=http://goo.gl/AL4rkZ&name=I'm using Facebook Invitations Blocker chrome extension to block and hide invitations from all Facebook's users! Try it Now&redirect_uri=https://www.facebook.com&actions=%5B%7B%22name%22%3A%22Download%20More%20Extensions%22%2C%22link%22%3A%22http%3A%2F%2Fgoo.gl/YuwJ5P%22%7D%5D");
                    }
            });
    });

    $("#googlePlusShare").on("click",function(){
        window.open("https://plus.google.com/share?url=http://goo.gl/AL4rkZ");
    });

    //--------------------Save to sync local storage--------------------//
    function syncStorage(key, value) {
        var obj = {};
        var key = key;
        obj[key] += key;
        obj[key] = value;
        chrome.storage.sync.set(obj);
    }
    //--------------------Secure HtML--------------------//
    function escapeHTML(s) { 
        return s.replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
    }

});