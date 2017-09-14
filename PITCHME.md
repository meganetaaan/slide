RustとWebAssembly
===

---

# Rust

---

## Rustとは

> Rustは速度、安全性、並行性の3つのゴールにフォーカスしたシステムプログラミング言語です。 

---

## 利用企業

* mozilla: ブラウザエンジン[Servo](https://servo.org/)
* npm : レジストリサービス（Cから移行）
* Atlassian
* Dropbox
* LINE

https://www.rust-lang.org/ja-JP/friends.html

---

## インストール

https://www.rustup.rs/

- Windows: インストーラを実行
- MacOS/Linux: インストールスクリプトをcurlして叩く

---

## Hello World

https://play.rust-lang.org/

```Rust
fn main() {
    println!("Hello, world!");
}
```

---

## Rustの特徴

- ゼロコスト抽象化
- ムーブセマンティクス
- 保証されたメモリ安全性
- データ競合のないスレッド
- トレイトによるジェネリクス
- パターンマッチング
- 型推論
- 最小限のランタイム
- 効率的なCバインディング

https://www.rust-lang.org/ja-JP/ から引用

---

## ゼロコスト抽象化

- http://keens.github.io/blog/2016/03/01/rustnozerokosutochuushouka/

---

## ムーブセマンティクス（所有権）

- http://qiita.com/yz2cm/items/9a8337c368cf055b4255

---

## 参考

- [Visual Studio CodeでRustのコード補完・タスク・Debug実行 - Qiita](http://qiita.com/kat_out/items/cf89a8dffb4e0629948a)
   - 環境(VSCode)揃える

- [最速で知る！ プログラミング言語Rustの基本機能とメモリ管理【第二言語としてのRust】](https://employment.en-japan.com/engineerhub/entry/2017/07/10/110000)
    - まず良さを知る

- [プログラミング言語Rust](https://rust-lang-ja.github.io/the-rust-programming-language-ja/1.6/book/)
    - 公式ドキュメントの和訳。必読。

+++

- [お気楽Rustプログラミング超入門](http://www.geocities.co.jp/SiliconValley-Oakland/1680/linux/rust.html)
    - 写経用。ソートに始まる基本的なアルゴリズムの実装例多数。更新頻度◎。

- [Rust風にデザインパターン23種](http://keens.github.io/blog/2017/05/06/rustkazenidezainpata_n23tane/)
    - GoFがRustだとどうなるか。Javaからの入門として

- keen([Twitter: @blackendgold](https://twitter.com/blackenedgold))
    - 国内トップRustacianの一人っぽい

+++

- [Awesome Rust(GitHub)](https://github.com/rust-unofficial/awesome-rust)
    - 意識高める用。
    
- [Rust JP(Slack)](https://rust-jp.herokuapp.com/)

---

## 書いてみた

https://github.com/meganetaaan/suburi-rust

https://play.rust-lang.org/?gist=cac7b97f63674a6d218c11b108837c21&version=stable

---

## 所感

* イミュータブルの安心感
* コンパイラとのたたかい

---

# WebAssembly

# RustとWebAssembly

## 書いてみた

https://github.com/meganetaaan/maze

## 作り方

```sh
rustc --target wasm32-unknown-emscripten rust_code.js
```

* rust_code.rs
* rust_code.js
* rust_code.asm.js
* rust_code.wasm
