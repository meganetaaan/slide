# Chapter15
Readable Code 第15章

---

## 15.1 問題点

ウェブサーバの直近1分間と直近1時間の転送バイト数を把握したい。

![problem](/img/readable_code_problem.png)


---

### 15.2 クラスのインタフェースを定義する

```TypeScript
class MinuteHourCounter {
  public count (numBytes: int) {}

  public minuteCount (): int {}

  public hourCount (): int {}
}

module.exports = MinuteHourCounter
```

---

#### 名前を改善する

- __MinuteHourCounter__ ...OK
 - 明確で呼びやすい
- __minuteCount, hourCount__ ...OK
 - getMinuteやgetHourにしないの？
 - getは「軽量アクセサ」今回はそうではない

---

- __count__ ...NG
 - 名詞、動詞両方の意味がありあいまい(「全期間のカウントを返す」など誤解を生む)
 - increment(): 値が増加する一方と思われる
 - observe(): 少しあいまい
 - record(): 名詞、動詞問題がありダメ
 - add(): OK

---

- __add(int numBytes)__ ...NG
 - 具体的すぎる
 - 今回追加する値がByte値であることをクラスが__知る必要はない__。もっと汎用的な名前にしたい。
 - delta: マイナス値をとりうるので不適
 - count: OK

---

#### コメントを改善する

~~~TypeScript
class MinuteHourCounter {
  /**
   * カウントを追加する
   */
  public add (count: int) {}

  /**
   * 直近1分間のカウントを返す
   */
  public minuteCount (): int {}

  /**
   * 直近1分間のカウントを返す
   */
  public hourCount (): int {}
}
~~~

---

~~~
  /**
   * カウントを追加する
   */
  public add (count: int) {}
~~~
- 冗長。下記のようにすべき。

~~~
// 新しいデータ点を追加する(count >= 0)
// それから1分間は、minuteCount()の返す値がcountだけ増える。
// それから時間は、hourCount()の返す値がcountだけ増える。
~~~

---

~~~
  /**
   * 直近1分間のカウントを返す
   */
  public minuteCount (): int {}
~~~

2通りの解釈を生む
1. 「午後12時13分」のような現在時刻の分数のカウントを返す
1. 時刻の分数に関係なく「直近60秒間のカウントを返す

2つめの解釈が正解。より正確で詳細な説明にする。

~~~
// 直近60秒間の累積カウントを返す
~~~

---

#### 外部の視点を得ること

is 大事

---

### 15.3 試案1：素朴な解決策

---

### 15.4 試案2：ベルトコンベヤー設計

---

### 15.5 試案3：時間バケツの設計

---

### 15.6 3つの解決策を比較する

---

### 15.7 まとめ

---
