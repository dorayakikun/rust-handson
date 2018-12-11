# Rust 初心者向けハンズオン

高尾知秀 (@dorayaki_kun)

---

## 今日のゴール

* Rustを好きになってもらう
* トピック
   * 基本的な構文
   * WASMについて
* TODO

---

## 高尾知秀 / [@dorayaki_kun](https://twitter.com/dorayaki_kun/)

<div style="float: left; width: 14rem; margin-right: 4rem; margin-top: -2rem;">

![高尾知秀のアバター](img/dorayakikun2.jpg)
</div>

* トレッキングとか写真を撮るのが好きです
* よく清水さん(@chikoski)の代打をしています
* 本日も勢いだけで、この場にいます

----

### Slackグループのご案内

* https://rust-jp.herokuapp.com
* #beginners, #codeチャンネルなどがオススメ

---

## Rust ってどういう言語？

* 速い
  * GCやランタイムがない
* 型安全(とても大事)
* コンパイラがとても親切

----

## こんなところで使われてるよ

### 2018年12月時点

* Firefox
* Dropbox
* Firecracker(new)
  * 今年のre:inventで紹介されました!!

---

## コンパイラーのインストール

```sh
$ curl -sSf https://static.rust-lang.org/rustup.sh | sh
```

* [rustup](https://www.rustup.rs/) を利用してインストールします
* シェルスクリプトが利用できない方は[コチラ](https://forge.rust-lang.org/other-installation-methods.html)

----

### インストールされるツール

|ツール名|説明|
|------|----|
|rustc|Rust のコンパイラー|
|cargo|パッケージ管理ツール|

* ビルドや実行は cargo を使って行います

----

### 準備とかいいからとにかくコードを書きたい方

* [Rust Playground](https://play.rust-lang.org/)を利用しましょう
  * コードの共有がURLで出来るので「このコンパイルが通らなくて...」といった相談するのにオススメ

---

## ハンズオン

* 早速、Rustのプロジェクトを作成しましょう

```
$ cargo new hello-rust
```

```
.
├── Cargo.toml
└── src
   └── main.rs
```

----

### Cargo.tomlを編集

```toml
[package]
name = "hello-rust"
version = "0.1.0"
authors = ["Tomohide Takao <amakunai.dorayaki@gmail.com>"]
edition = "2018"

[dependencies]
ferris-says = "0.1"
```

`cargo build` を実行

----

### main.rsを編集

```rust
use ferris_says::say;
use std::io::{stdout, BufWriter};

fn main() {
    let stdout = stdout();
    let out = b"Hello fellow Rustaceans!";
    let width = 24;

    let mut writer = BufWriter::new(stdout.lock());
    say(out, width, &mut writer).unwrap();
}
```

----

### 実行結果

```
----------------------------
| Hello fellow Rustaceans! |
----------------------------
              \
               \
                  _~^~^~_
              \) /  o o  \ (/
                '_   -   _'
                / '-----' \
```

---

## Rustを書くために

* 変数
* 関数宣言
* 基本型
* ベクター
* 制御構造

---

## 変数

```rust
let name = "dorayakikun";
```

* `let 変数名` と宣言します

----

### 値の変更は原則できません

```rust
let name = "dorayakikun";
println!("Hello, {}.", name);
name = "Tomohide";// <== 怒られる
println!("Hello, {}.", name);
```

```
error[E0384]: cannot assign twice to immutable variable `name`
 --> src/main.rs:4:1
  |
2 | let name = "dorayakikun";
  |     ----
  |     |
  |     first assignment to `name`
  |     help: make this binding mutable: `mut name`
3 | println!("Hello, {}.", name);
4 | name = "Tomohide";// <== 怒られる
  | ^^^^^^^^^^^^^^^^^ cannot assign twice to immutable variable

error: aborting due to previous error

For more information about this error, try `rustc --explain E0384`.
error: Could not compile `playground`.

To learn more, run the command again with --verbose.
```

* [デモ](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=ad53f87c33b414aebfce144ab1b514c1)

----

### 後から値を変更したい場合

```rust
let mut name = "dorayakikun";
println!("Hello, {}.", name);
name = "Tomohide";
println!("Hello, {}.", name);
```

* `mut` を付けることで、後からの変更が許容されます
* [デモ](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=cb9cab654d56c5600cc1df8b8b42d014)

----

### 変数の再宣言

```rust
let result = client.get("https://nanka-sugoi.com/articles");
let result = result.expect("なにかのえらー");
```

* 同じ変数名に新しく束縛を作り直す事ができます
  * 再代入ではないです!!!

---

## 関数の宣言

```rust
fn add(a:i32, b:i32) -> i32 {
    a + b
}
```

* `fn 関数名(引き数名: 引き数型) -> 返り値の型 {}` と宣言します
* [デモ](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=2a40644bbc62ca1d1d2355336330bc73)

----

```rust
fn say(message: &str) {
    println!("{}", message);
}
```

* 返り値がUnit型の場合は、返り値の型宣言を省略できます
* [デモ](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=04f605e54e1f82e6c074413ece7a0bd9)

---

## 基本型

|型名|説明|
|---|---|
|bool|ブール値|
|char|文字型|
|i8, i16, i32, u8, u16, u32, u64, isize, usize|整数型|
|f32, f64|浮動小数点型|
|'static str, str, String|文字列|

---

## ベクター

```rust
    let animals = vec!["おおかみ", "しろくま", "ふくろう"];
    for i in 0..animals.len() {
        println!("animals[{}] = {}", i, animals[i]);
    }
```

* 可変長の配列です
* `vec!` マクロで作成します
* 詳細は[コチラ](https://doc.rust-lang.org/std/vec/struct.Vec.html)
* [デモ](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=2531fcb1756987dde4bfdc933a28e17f)

----

```rust
let v = vec![0, 1, 2, 3, 4, 5];
let odd_number = v.iter().filter(|&n| n % 2 != 0);
for (index, value) in odd_number.enumerate() {
    println!("odd_number[{}]:{}", index, value);
}
```

* `iter()` でイテレータを作成できます
* イテレータは `map` や `filter` `for_each` メソッドを持っています
* [デモ](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=084e50fd464a19026747808ae34daec2)

---

## 制御構造

|制御構造|文 / 式|
|------|--|
|条件分岐|if, match|
|繰り返し|for, loop, while|

---

## 条件分岐

```rust
let age = 19;
if age < 20 {
    println!("age < 20")
} else {
    println!("age > 20")
};
```

* 条件を()で括りません
* [デモ](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=c07af8616dbaa0eb36cb2e2ff2cca949)

----

### if式

```rust
let age = 19;
let message = if age < 20 {
    "age < 20"
} else {
    "age > 20"
};
println!("{}", &message);
```

* [デモ](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=a8dd3035e93c032f94d9d4c2fd990250)

---

### loop文

```rust
let mut count = 0;
loop {
    println!("count is {}", count);
    count += 1;
    if count >= 10 {
        break;
    }
}
```

* [デモ](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=21434c31e40c420a423ea98475c977bb)

----

### while文

```rust
let mut count = 0;
while count < 10 {
    println!("count is {}", count);
    count += 1;
}
```

* [デモ](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=b6a93fe0db7ff7ceaab6f3bb51ba3408)

---

### for文

```rust
for i in 0..10 {
        println!("i is {}", i);
}
```

* [デモ](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=c2b98d1d28a28516aff2474c8cea91a7)

---

## もくもくタイム:ハッシュ値を計算するWasmを作ろう

---

### Wasmとは

* WebAssemblyの略称
* バイナリー形式の低レベルなアセンブリ風言語
* JavaScript と並行して動作する
  * WasmとJavaScript両方を連携させることも可能です

----

### Wasmの目標

* 高速で、高効率であり、ポータブルである事
* 可読性を持ちデバッグ可能である事
* 安全である事
* ウェブを破壊しない事

[WebAssembly のコンセプト](https://developer.mozilla.org/ja/docs/WebAssembly/Concepts)

---

### 環境構築

* 詳しく知りたい人は[コチラ](https://rustwasm.github.io/wasm-bindgen/)
* とりあえず触ってみたい人は[コチラ]()

---

### wasm-bindgen

```rust
#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

* JavaScriptからアクセス出来る関数に `#[wasm_bindgen]` を付けます

----

```rust
#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}
```

* 手動でJavaScriptの関数をRustと紐付ける場合は `extern "C" {}` に関数の定義を書きます

```rust
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}
```

* `console.log` のような関数をRustに紐付けたいときは `js_namespace` を利用します

----

```rust
#[wasm_bindgen]
pub fn foo(s: &str) -> String {
    format!("Hello {}", s)
}
```

* JavaScriptから文字列を受け取って、Rustで新たに文字列を作成する場合

----

```rust
#[wasm_bindgen]
pub fn add(a: u32, b: u32) -> u32 {
    a + b
}
```

* JavaScriptから数値を受け取って、Rustで新たに数値を作成する場合

---

## まとめ

* Rustは素敵な言語
* みんなで楽しみましょう :)
