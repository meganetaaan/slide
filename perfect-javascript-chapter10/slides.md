# Chapter10
Perfect JavaScript p.246-265

---

## 10-4 イベントの伝播

```html
<html>
  <body>
    <div id="foo">
      <button id="bar">sample</button>
    </div>
  </body>
</html>
```

* キャプチャリングフェーズ(外→内)
* ターゲットフェーズ
* バブリングフェーズ(内→外)

ただし、イベントの種類によってはバブリングフェーズが無い

--

<div class="sample" id="sample-10-4-a">
  a
  <div id="sample-10-4-b">
    b
    <div id="sample-10-4-c">
      c
    </div>
  </div>
</div>

```js
var sampleA = document.getElementById('sample-10-4-a');
var sampleB = document.getElementById('sample-10-4-b');
var sampleC = document.getElementById('sample-10-4-c');

sampleC.addEventListener('click', function(){console.log('c clicked');});
sampleB.addEventListener('click', function(){console.log('b clicked');});
sampleA.addEventListener('click', function(){console.log('a clicked');});
```

---

### 10-4-1 キャプチャリングフェーズ

* 使い所はそれほど多くないが「こういうフェーズがある」ということは知っておこう
* バブリングしないイベントを親DOMから監視したい場合など
  - http://qa.itmedia.co.jp/qa7482362.html

--

<div class="sample" id="sample-10-4-1-a">
  a
  <div id="sample-10-4-1-b">
    b
    <div id="sample-10-4-1-c">
      c
    </div>
  </div>
</div>

```js
var sampleA = document.getElementById('sample-10-4-1-a');
var sampleB = document.getElementById('sample-10-4-1-b');
var sampleC = document.getElementById('sample-10-4-1-c');

sampleC.addEventListener('click', function(){console.log('c clicked');});
sampleB.addEventListener('click', function(ev){
  console.log('b clicked');
  ev.stopPropagation();
}, true);
sampleA.addEventListener('click', function(){console.log('a clicked');});

```

---

### 10-4-4 キャンセル

* 伝播のキャンセル<br>→stopPropagation/stopImmediatePropagation
  - Immediate~は同じターゲットに登録された<br>他のイベントリスナもキャンセルされる

<input type="button" id="foo" value="foo" />
```js
var btn = document.getElementById('foo');
function sayFoo(ev) {
  alert('foo');
  ev.stopPropagation();
}
function sayBar(ev) {
  alert('bar');
  ev.stopImmediatePropagation();
}
function sayBaz(ev) {
  alert('baz');
}
btn.addEventListener('click', sayFoo, false);
btn.addEventListener('click', sayBar, false);
btn.addEventListener('click', sayBaz, false);
```

--

* 標準処理のキャンセル<br>→preventDefault

<a id="fooLink" href="http://example.com">example.com</a>
```html
<a id="fooLink" href="http://example.com">example.com</a>
<script>
  var link = document.getElementById('fooLink');
  function sayFoo(ev) {
    alert('foo');
    ev.preventDefault();
  }
  link.addEventListener('click', sayFoo, false);
</script>
```

---

### 10-5 イベントが持つ要素

#### イベントインターフェースのプロパティ一覧

| プロパティ | 説明 |
| :-- | :-- |
| type | イベントタイプの名前 |
| target | イベントを発火した要素への参照 |
| currentTarget | 現在処理を行っているイベントリスナが登録されている要素 |
| eventPhase | イベント伝播のどのフェーズにあるか |
| timeStamp | イベントの発生時間 |
| bubbles | バブリングフェーズならtrue |
| cancelable | preventDefault()が実行できればtrue |

---

### 10-6 標準イベント

書籍を参照

* submitのデフォルト挙動

---

### 10-7 独自イベント

* dispatchEventは同期的に実行される点に注意
* なぜイベントを使うか?
 - モジュール間の密結合を防ぐ
 - 他のモジュールとの連携
