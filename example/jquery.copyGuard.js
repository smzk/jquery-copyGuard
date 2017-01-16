/*
 * jQuery.copyGuard v1.0.0
 *
 * Copyright (c) 2016 shimazaki
 * Author shimazaki
 * 
 * ブラウザでのコピーを禁止するjquery plugin
 * クライアントにデータが渡る可能性を"一切排除する"ものではなく、
 * 画面のデータをコピーして使っていいものではないんだよ、ということを伝える目的
 * 
 */
(function ($) {
    
    var options = {
        guardSelector: '.copyGuard',
        isCopyDeny: function(){
            return true;
        }
    };

    /**
     * 選択範囲に、コピーガード対象の要素が含まれているかどうかを調べる
     * @returns {unresolved}
     */
    var _isIncludeCopyGuardBySelection = function () {
        //return $('<div></div>').html(document.selection.createRange().htmlText).find(options.guardSelector).length;//IE用
        return $('<div></div>').html(window.getSelection().getRangeAt(0).cloneContents()).find(options.guardSelector).length;
    };

    /**
     * クリップボードを上書きする
     * @returns undefined
     */
    var _overrideClipBoard = function (e) {
        e.originalEvent.clipboardData.setData("Text", "");
    };

    $.fn.extend({
        copyGuard: function (_options) {
            options = $.extend(options, _options);

            //選択側処理
            //windowとdocumentにはイベントをセットできない
            //bodyにセットすると、全選択時にイベントをキャッチできない
            //→HTMLにセットすることで回避
            $('html').on('copy', function (e) {
                var includeCopyGuard = _isIncludeCopyGuardBySelection();
                if (includeCopyGuard && options.isCopyDeny()) {
                    _overrideClipBoard(e);
                    return false;
                }
            });

            //バブルアップ側処理
            this.on('copy', options.guardSelector, function (e) {
                if (options.isCopyDeny()) {
                    _overrideClipBoard(e);
                    return false;
                }
                
            });
            
   
        },
    });
})(jQuery);