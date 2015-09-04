var novicell = novicell || {};
/* Novicell cookieinfo
* Original author: Adam Peter Nielsen
* Add a cookie info box in the site. get cookie info from a plain HTML page using ajax
* ------
* Dependencies: jquery.cookie.js
* Usage: 

    var cookieInfoOptions = {
        'btnhide': 'Cookies?',
        'btnshow': 'OK. close box',
        'cookieInfoPath': $('#cookieInfo').attr('data-cookie-info-path')
    }
    novicell.cookieinfo.init(cookieInfoOptions);


* HTML example: <div id="cookieInfo" data-cookie-info-path="PATH-TO-HTML-FILE-WITH-COOKIE-TEXT"></div>
* CSS example:

.cookie-info-show{ width: 100%; padding: 10px 30px; border: 1px solid #cbcac7;background:lightblue}
.cookie-info-show .cookie-info-text { color: #565656; font: normal 12px/19px Arial, Sans-Serif; width: 75%; padding-top:8px;}
.cookie-info-show .cookie-info-toggle { display: block; float: right;margin-top: 8px; padding: 3px 6px; color: #fff; border-radius: 3px; border: 0; background: #585858; text-decoration:none;font: bold 12px/12px Helvetica,sans-serif;}
.cookie-info-hide .cookie-info-toggle { display: block; float: right;margin-top: -20px; color: #fff; font: bold 12px/12px Helvetica,sans-serif;}
.phone .cookie-info-show{  border-bottom: 1px solid #cbcac7; width: auto;padding:0; }
.phone .cookie-info-show .cookie-info-text { width: auto; padding-top:8px;}
.phone .cookie-info-hide .cookie-info-toggle {color: #ccc;}

*/


novicell.cookieinfo = new function () {
    var self = this;
    this.init = function (args) {
        self.elm = $('#cookieInfo');
        self.options = args;
        if (self.elm.length) {
            if ($.cookie("cookieAccept") != undefined && $.cookie("cookieAccept") == "displayed") {
                $.cookie("cookieAccept", "accepted", { expires: 365, path: '/' });
            }

            if ($.cookie("cookieAccept") == undefined) {
                self.render({ 'mode': 'show' });
            } else {
                self.render({ 'mode': 'hide' });
            }

            if ($.cookie("cookieAccept") == undefined) {
                $.cookie("cookieAccept", "displayed", { path: '/' });
            }

            $('body').on('click', '#cookieInfo a.cookie-info-toggle', function (e) {
                e.preventDefault();
                if (self.elm.attr('data-mode') == 'show') {
                    self.render({ 'mode': 'hide' });
                    $.cookie("cookieAccept", "accepted", { expires: 365, path: '/' });
                } else {
                    self.render({ 'mode': 'show' });
                }
            });
        }
    };
    this.toggle = function () {

    };
    this.render = function (args) {
        self.elm.html('');
        var btn = $('<a>').addClass('cookie-info-toggle').attr('href', '#cookieInfo' + args.mode).text(self.options['btn' + args.mode]);
        var markup = '';
        if (args.mode == 'show') {
            var cookieInfoText = $('<div>')//;.text('Cookie text error');
            $.get(self.options.cookieInfoPath, function (data) {
                cookieInfoText.html(data);
            });
            markup = $('<div>').addClass('cookie-info-content').append(/*btn,*/ $('<div>').addClass('cookie-info-text').append(cookieInfoText));
        } else {
            markup = $('<div>').addClass('container').append(btn); //btn;
        }
        self.elm.attr('class', 'cookie-info-' + args.mode).attr('data-mode', args.mode).html(markup);
        self.toggle();
    };
};


$(function(){
    //Cookie popup
    var cookieInfoOptions = {
        'autohide': false,
        'btnhide': 'Cookies?',
        'btnshow': 'OK. close box',
        'cookieInfoPath': $('#cookieInfo').attr('data-cookie-info-path')
    }
    novicell.cookieinfo.init(cookieInfoOptions);
});