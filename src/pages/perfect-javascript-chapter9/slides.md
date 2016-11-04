# Chapter9
Perfect JavaScript p.246-265

---

## 9-1 DOMとは(p.246)
* Document Object Model
* HTML/XML文書をプログラムから利用するためのAPI
* HTML/XMLをオブジェクトのツリー構造として扱う
  - DOMツリー
  - ノード
* 仕様Level1~3が定義されている
  - 個々の説明は省略

---

## 9-2 DOMの基礎(p.248)

### 9-2-1 タグ、要素、ノード

| 用語 | 説明 |
|:-- | :-- |
| タグ | 文書構造を指定するための<br>マークアップとして記述される文字列|
| ノード | DOMツリーを構成する<br>ひとつのオブジェクト |
| 要素 | ノードのうち、属性nodeTypeが<br>ELEMENT_NODEであるもの|

---

### 9-2-2 DOM操作

* ノードの選択
* ノードの作成
* ノードの内容変更
* ノードの削除

詳細は後述

---

### 9-2-3 Documentオブジェクト

* DOMツリー構造のルートノード
* Documentオブジェクト自体に対応するタグは無い
* グローバル変数documentで参照できる

```js
var obj = {};
console.log(window.obj === obj);
```

---

## 9-3 ノードの選択(p.250)

### 9-3-1 IDによる検索

```js
// fooというIDを持つ要素を取得する
var element = document.getElementById('foo');
```
* IDはDOMツリーの中で__一意でなければならない__
  - 同じIDの要素が複数ある場合の挙動は規定されてない
  - コピペコードにありがちなので注意！

---

### 9-3-2 タグ名による検索

```js
var spanElements = document.getElementsByTagName('span'); // span要素だけ取得
var allElements = document.getElementsByTagName('*'); // すべての要素を取得

// Elementオブジェクトのメソッドでもある→子孫ノードから検索する
var element = document.getElementById('foo');
var fooSpan = element.getElementsByTagName('span'); // #foo配下のspan要素を取得
```

--

#### ライブオブジェクト
getElementsByTagNameの戻り値は<br>__NodeList__(≠Nodeオブジェクトの配列)

<div id="foo" style="border: 1px solid black;">
<span>first</span>
<span>second</span>
</div>
```HTML
<div id="foo">
<span>first</span>
<span>second</span>
</div>
<script>
  var elems = document.getElementsByTagName('span');
  console.log(elems.length) // 2
  var newSpan = document.createElement('span');
  newSpan.appendChild(document.createTextNode('third'));
  var foo = document.getElementById('foo');
  foo.appendChild(newSpan);
  console.log(elems.length) // 3
</script>
```

--

#### ライブオブジェクトを操作する上での注意点

下記のコードは無限ループに陥る
```HTML
<div> sample text</div>
<script>
  var divs = document.getElementsByTagName('div');
  var newDiv;
  for ( var i = 0; i < divs.length; i++) {
    newDiv = document.createElement('div');
    newDiv.appendChild(document.createTextNode('new div'));
    divs[i].appendChild(newDiv);
  }
</script>
```

forループの最初に配列長を定義して回避
```HTML
<div> sample text</div>
<script>
  var divs = document.getElementsByTagName('div');
  var newDiv;
  for ( var i = 0, len = divs.length; i < len; i++) {
    newDiv = document.createElement('div');
    newDiv.appendChild(document.createTextNode('new div'));
    divs[i].appendChild(newDiv);
  }
</script>
```

--

#### ライブオブジェクトのパフォーマンス
* NodeListのまま扱うと遅い
* 一度Arrayに変換して使う


```js
// spanを1000個追加
var hoge = document.getElementById('hoge');
var newSpan;
for(var i = 0; i < 1000; i++){
  newSpan = document.createElement('span');
  newSpan.appendChild(document.createTextNode('test'));
  hoge.appendChild(newSpan);
}

var elems, len;
console.time('pattern1');
elems = hoge.getElementsByTagName('span');
for ( var i = 0; i < 1000; i++) {
    for ( var j = 0; j < elems.length; j++) {
        elems[j];
    }
}
console.timeEnd('pattern1');

console.time('pattern2');
elems = hoge.getElementsByTagName('span');
for ( var i = 0, len = elems.length; i < 1000; i++) {
    for ( var j = 0; j < len; j++) {
        elems[j];
    }
}
console.timeEnd('pattern2');
console.time('pattern3');
elems = Array.prototype.slice.call(hoge.getElementsByTagName('span'));
for ( var i = 0; i < 1000; i++) {
    for ( var j = 0; j < elems.length; j++) {
        elems[j];
    }
}
console.timeEnd('pattern3');
console.time('pattern4');
elems = Array.prototype.slice.call(hoge.getElementsByTagName('span'));
for ( var i = 0, len = elems.length; i < 1000; i++) {
    for ( var j = 0; j < len; j++) {
        elems[j];
    }
}
console.timeEnd('pattern4');
```
<div id="hoge" style="width: 100%; height: 100px; overflow: auto; border: 1px solid black"></div>
---

### 9-3-3 名前による検索

name属性はformタグやinputタグでしか指定しないため、使用頻度は低い

```js
document.getElementsByName('hogeButton');
```

---

### 9-3-4 クラス名による検索

<p id="foobar" style="width: 100%; border: 1px solid black;">
    <span class="matched">a</span>
    <span class="matched unmatched">b</span>
    <span class="unmatched">c</span>
</p>
```html
<p id="foobar">
    <span class="matched">a</span>
    <span class="matched unmatched">b</span>
    <span class="unmatched">c</span>
</p>
<script>
var foobar = document.getElementById('foobar');
// 注：IE8以下だと使えない
var matched = foobar.getElementsByClassName('matched');
console.log(matched);
var matchedUnmatched = foobar.getElementsByClassName('matched unmatched');
console.log(matchedUnmatched);
</script>
```

---

### 9-3-5 親、個、兄弟

<div class="sample" id="parent" style="font-size: 0.7em;">
    parent
    <div id="prev">prev</div>
    <div id="me">
        me
        <div id="first">first</div>
        <div id="second">second</div>
        <div id="third">third</div>
    </div>
    <div id="next">next</div>
</div>
```js
var elem = document.getElementById('me');

// 空白やコメントノードを結果に含むため、直感に反する
console.log(elem.parentNode);
console.log(elem.childNodes); // NodeListオブジェクト
console.log(elem.firstChild);
console.log(elem.lastChild);
console.log(elem.nextSibling);
console.log(elem.previousSibling);
```

--

<div class="sample" id="parent" style="font-size: 0.7em;">
    parent
    <div id="prev">prev</div>
    <div id="me">
        me
        <div id="first">first</div>
        <div id="second">second</div>
        <div id="third">third</div>
    </div>
    <div id="next">next</div>
</div>

```js
// 空白やコメントノードを無視する
console.log(elem.children);
console.log(elem.firstElementChild);
console.log(elem.lastElementChild);
console.log(elem.nextElementSibling);
console.log(elem.previousElementSibling);
console.log(elem.childElementCount);
```

---

### 9-3-6 Xpath

* 柔軟な指定ができるが、複雑になりがち
(書籍参照)

---

### 9-3-7 Selectors API

* cssセレクタライクに要素を取得できる
```
var a = document.querySelector('#foo');
var b = document.querySelectorAll('div');
var b = document.querySelectorAll('#foo > .bar:nth-child(3)');
```

* 戻り値は__StaticNodeList__オブジェクト
  - オブジェクトに対する変更が<br>HTMLに反映されないので注意

---

## 9-4 ノードの作成・追加(p.263)

```js
var elem = document.createElement('div');
var text = document.createTextNode('This is a new div element.');
document.body.appendChild(elem); // DOMツリーに追加して初めて画面に反映される
elem.appendChild(text);
var comment = document.createComment('this is comment');
document.body.insertBefore(comment, elem);
```

---

## 9-5 ノードの内容変更(p.263)

```js
var newNode = document.createElement('div');
var oldNode = documetn.getElementById('foo');
var parentNode = oldNode.parentNode;
parentNode.replaceChild(newNode, oldNode);
```

---

## 9-6 ノードの削除(p.264)

```js
var elem = document.getElementById('foo');
elem.parentNode.removeChild(elem);
```

---

## 9-7 innerHTML / textContent
### 9-7-1 innerHTML

<div id="sample9-7" style="width: 100% ;min-height: 20px; border: 1px solid black"></div>
```js
var elem = document.getElementById('sample9-7');
elem.innerHTML = '<div>This is a new div element.</div>';
```

### 9-7-2 textContent

```js
var elem = document.getElementById('sample9-7');
elem.textContent = '<div>This is a new div element.</div>';
```

---

## 9-8 DOM操作のパフォーマンス

<div id="sample9-8" style="width: 100% ;min-height: 20px; max-height: 100px; overflow: auto; border: 1px solid black"></div>

```js
var elem = document.getElementById('sample9-8');
console.time('dom');
for (var i = 0; i < 1000; i++) {
    var child = document.createElement('div');
    var text = document.createTextNode('hoge');
    child.appendChild(text);
    elem.appendChild(child);
}
console.timeEnd('dom');

elem.innerHTML = "";
console.time('fragment');
var fragment = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
    var child = document.createElement('div');
    var text = document.createTextNode('hoge');
    child.appendChild(text);
    fragment.appendChild(child);
}
elem.appendChild(fragment);
console.timeEnd('fragment');

elem.innerHTML = "";
console.time('innerHTML');
var htmlStr = "";
for (var i = 0; i < 1000; i++) {
    htmlStr += "<div>hoge</div>"
}
elem.innerHTML = htmlStr;
console.timeEnd('innerHTML');

```

--

|ブラウザ | 条件 | 時間(ms)
| :-- | :-- | --: |
|Chrome| dom | 1.89 |
| | fragment | 2.16 |
| | innerHTML | 1.66 |
|IE | dom | 159.47 |
| | fragment | 141.02 |
| | innerHTML | 27.59 |