# Chapter10
Perfect JavaScript p.266-280

---

## 10-1 イベントドリブンプログラミング

---

## 10-2 イベントハンドラ/イベントリスナの設定

下記はあまり使われない。
* 10-2-1 HTML要素の属性に指定する
* 10-2-2 DOM要素のプロパティに指定する
  - 同時に一つの関数しか登録できない

addEventListener()を使う方法が主流（次スライド）
---

### 10-2-3 EventTarget.addEventListener()を利用する

#### イベントリスナの登録

<input type="button" id="sample10-2-3" value="sample10-2-3 button"/>
```js
var btn = document.getElementById('sample10-2-3');
btn.addEventListener('click', function() { alert('hi!')}, false);
```

--

#### イベントリスナの実行順序
<input type="button" id="sample10-2-3-2" value="sample10-2-3-2 button"/>
<input type="button" id="sample10-2-3-3" value="sample10-2-3-3 button"/>

```js
var btn = document.getElementById('sample10-2-3-2');
function sayHello() { alert('hello!!')};
btn.addEventListener('click', sayHello, false);
// 同じイベントリスナは無視される
btn.addEventListener('click', sayHello, false);
// フェーズが異なれば別のものとして登録される
btn.addEventListener('click', sayHello, true);
```

```js
var btn = document.getElementById('sample10-2-3-3');
btn.addEventListener('click', function() { alert('foo!')});
btn.addEventListener('click', function() { alert('bar!')});
btn.addEventListener('click', function() { alert('baz!')});
```

--

#### イベントリスナオブジェクト

| 用語 | 説明 |
| :-- | :-- |
| イベントターゲット | イベントが発火した要素<br>イベントオブジェクトのtargetプロパティで参照 |
| リスナーターゲット | イベントリスナが登録されている要素<br>イベントオブジェクトのcurrentTargetプロパティで参照 |

---

### 10-2-4 イベントハンドラ/イベントリスナ内でのthis（p.271）

thisはイベントハンドラを設定した要素自身になる
<input type="button" id="sample10-2-4" value="sample10-2-4 button"/>
```js
document.getElementById('sample10-2-4').onclick = function(){console.log(this)};

var obj = {
    name: 'hoge',
    val: 1,
    handleClick: function(){console.log(this)}
};
document.getElementById('sample10-2-4').onclick = obj.handleClick
// undefined
```

---
## 10-3 イベント発火

mousemoveイベントが最も高頻度で発生する
<div id="sample10-3" style="width: 500px; height: 100px; border: 1px solid black">mosuemove: <span id="mouseMoveCount"></span></div>

```js
var elem = document.getElementById('sample10-3');
var mouseMoveCount = document.getElementById('mouseMoveCount');
var i = 0;
elem.addEventListener('mousemove', function(){mouseMoveCount.innerText = i++;});
```

---
## 10-4 イベントの伝播

---
## 10-5 イベントが持つ要素

---
## 10-6 標準イベント

---
## 10-7 独自イベント