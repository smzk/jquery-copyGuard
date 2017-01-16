# jquery-copyGuard

jquery copyGuard plugin is easy control by selection copy

選択してコピーに対する制御を簡単にするプラグインです。
コピーを完全に禁止するものではありません。

## Usage
```Javascript
<script src="js/jquery.min.js" type="text/javascript"></script>
<script src="js/jquery.copyGuard.js" type="text/javascript"></script>
$(function()
{
    $(document).copyGuard({
        guardSelector: '.copyGuard',    //コピー禁止領域のセレクタ―
        isCopyDeny: function(){         //コピー禁止領域をコピーしようとした際の関数。
            return true;               //trueを返すとコピー禁止とみなし、クリップボードの中身をクリアする
        },
    });
});
```

* イベントはdocumentにセットすることを想定しています。
`$('.copyGuard').copyGuard()`としてもおそらく期待の動作をしないので注意ください。

## Example

### example1

* シンプルなサンプル

### example2

* コピー時、alertを表示する。
*コピー自体は許可*
