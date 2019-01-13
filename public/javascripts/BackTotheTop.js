//<![CDATA[
(function () {
$("body").append("<img id='goTopButton' style='display: none; z-index: 5; cursor: pointer;' title='回到頂端'/>");
var img = "./images/Arrows-Up-Circular-icon.png",
locatioin = 8/10, // 按鈕出現在螢幕的高度
right = 10, // 距離右邊 px 值
opacity = 0.3, // 透明度
speed = 500, // 捲動速度
$button = $("#goTopButton"),
$body = $(document),
$win = $(window);
$button.attr("src", img);
$button.on({
mouseover: function() {$button.css("opacity", 1);},
mouseout: function() {$button.css("opacity", opacity);},
click: function() {$("html, body").animate({scrollTop: 0}, speed);}
});
window.goTopMove = function () {
var scrollH = $body.scrollTop(),
winH = $win.height(),
css = {"top": winH * locatioin + "px", "position": "fixed", "right": right, "opacity": opacity};
if(scrollH > 20) {
$button.css(css);
$button.fadeIn("slow");
} else {
$button.fadeOut("slow");
}
};
$win.on({
scroll: function() {goTopMove();},
resize: function() {goTopMove();}
});
} )();
//]]>