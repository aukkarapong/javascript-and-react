# JavaScript & ReactJS

## JavaScript มาตรฐาน ES6

ES6 ย่อมาจาก ECMAScript 6 ครับ เป็นมาตรฐานของภาษา JavaScript ตัวใหม่ ที่ออกปี 2015 จุดที่น่าสนใจของ ES6 คือ เป็นการปรับปรุงตัวภาษาใหม่ พร้อมเพิ่มฟีเจอร์ที่ช่วยให้ Developer สามารถเขียน JavaScript ได้ง่ายขึ้น และ syntax ดีงามมากขึ้น แต่สำหรับ Browser บาง Browser ยังไม่รองรับมาตรฐาน ES6 จะต้องมี Babel เป็นตัว transpile แปลจาก ES6 เป็น ES5 เพื่อให้ Browser เก่า ๆ บางรุ่นสามารถทำงานได้

## สิ่งที่ต้องเตรียมการก่อนเริ่มเขียน ReactJS

- [NodeJS](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/Download)
- [ESLint Extension](https://eslint.org/)
- [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## ทบทวน JavaScript

- Variable [let, const, var]
- Default parameter
- Arrow Function
- Modules
- Template String
- Spread Operators
- Object property shorthand
- Destructuring
- Promises
- Async/Await
- Array [map, filter, find, reduce]
- Higher Order Functions
- JavaScript Library [Moment, Lodash]

---

### Variable [let, const, var]

ใน JavaScript มีวิธีการประกาศตัวแปรได้ 3 แบบคือ var, let และ const ซึ่งแต่ละแบบมีความแตกต่างกัน

|       |  Scope   | สามารถ Assign ค่าใหม่ได้ | สามารถเปลี่ยนแปลงค่าได้ | Temporal Dead Zone |
| :---- | :------: | :----------------------: | :---------------------: | :----------------: |
| const |  Block   |          ไม่ใช่          |           ใช่           |        ใช่         |
| let   |  Block   |           ใช่            |           ใช่           |        ใช่         |
| var   | Function |           ใช่            |           ใช่           |       ไม่ใช่       |

[https://github.com/mbeaudru/modern-js-cheatsheet/blob/master/translations/th-TH.md](https://github.com/mbeaudru/modern-js-cheatsheet/blob/master/translations/th-TH.md)

```javascript
const person = "Nick";
person = "John"; // จะ thrown error เพราะว่า person ไม่สามารถ assign ค่าใหม่ได้
```

```javascript
let person = "Nick";
person = "John";
console.log(person); // "John", let จะยอมให้สามารถ assign ค่าใหม่ได้
```

#### **_var_**

ตัวแปรที่ถูกประกาศด้วย `var` จะเป็น _function scoped_ เมื่อตัวแปรถูกสร้างภายใน function โค้ดใน function นั้นสามารถเข้าถึงตัวแปรนั้นได้ และตัวแปร _function scoped_ ที่ถูกสร้างใน function จะไม่สามารถถูกเข้าถึงจากภายนอก function ได้

```javascript
function myFunction() {
  var myVar = "Nick";
  console.log(myVar); // "Nick" - myVar จะสามารถเข้าถึงได้จากภายใน function
}
console.log(myVar); // จะเกิด ReferenceError เพราะ myVar ไม่สามารถเข้าถึงได้จากภายนอก function
```

ตัวอย่างเพิ่มเติมสำหรับเรื่อง scope ของตัวแปร

```javascript
function myFunction() {
  var myVar = "Nick";
  if (true) {
    var myVar = "John";
    console.log(myVar); // "John"
    // จริงๆ แล้ว myvar เป็นตัวแปร function scoped เราแค่ได้ลบค่าตัวแปร myVar จาก "Nick" และเปลี่ยนเป็น "John"
  }
  console.log(myVar); // "John" - จะเห็นได้ว่าค่าได้ถูกเปลี่ยนไปแล้ว
}
console.log(myVar); // จะเกิด ReferenceError เพราะ myVar ไม่สามารถเข้าถึงได้จากภายนอก function
```

นอกจากนี้ตัวแปรที่ประกาสด้วย _var_ จะถูกย้ายตอน execution ไปอยู่ด้านบนสุดของ scope และนี่คือสิ่งที่เราเรียกว่า [var hoisting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting).

โค้ดตัวอย่างกรณีนี้:

```js
console.log(myVar); // undefined -- ไม่มีการเกิด error
var myVar = 2;
```

เพราะว่าตามความเข้าใจเวลา Execution จะเป็นแบบนี้:

```js
var myVar;
console.log(myVar); // undefined -- ไม่มีการเกิด error
myVar = 2;
```

#### **_let_**

`var` และ `let ` จะคล้ายกันแต่ตัวแปรที่ประกาศด้วย `let` จะ

- เป็น _block scoped_
- จะ**ไม่สามารถ**เข้าถึงก่อนที่มันจะถูก assign ค่าได้
- ไม่สามารถประกาศตัวแปรซ้ำใน scope เดียวกันได้

ลองดูตัวอย่างเรื่องผลกระทบ (side effect) ของ block-scoping จากตัวอย่างก่อนหน้า

```javascript
function myFunction() {
  let myVar = "Nick";
  if (true) {
    let myVar = "John";
    console.log(myVar); // "John"
    // จริงๆ แล้ว myVar เป็น block scoped เราสามารถสร้างตัวแปร myVar ใหม่ได้
    // ตัวแปรนี้จะไม่สามารถเข้าถึงได้จากภายนอก block นี้และเป็นอิสระจากกัน
    // กับตัวแปร myVar ตัวแรกที่เราสร้าง !
  }
  console.log(myVar); // "Nick", จะเห็นตามที่อธิบายข้างต้นว่าภายใน block ไม่ส่งผลกระทบกับค่านี้
}
console.log(myVar); // จะเกิด ReferenceError เพราะ myVar จะไม่สามารถเข้าถึงได้จากภายนอก function
```

ตอนนี้น่าจะเข้าใจเหตุผลแล้วว่าทำไมตัวแปรที่ประกาศโดยใช้ _let_ (และ _const_) ไม่สามารถเข้าถึงได้ก่อนจะถูก assign ค่า

```js
console.log(myVar); // เกิด ReferenceError !
let myVar = 2;
```

สิ่งนี้จะแตกต่างกับตัวแปรที่ประกาศโดยใช้ _var_ ถ้าเราพยายามที่จะอ่านหรือเขียนตัวแปรที่ประกาศโดย _let_ หรือ _const_ ก่อนที่ทำการ assign ค่าจะเกิด Error ทันที ปรากฏการณ์นี้มักถูกเรียกว่า [_Temporal dead zone_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_Dead_Zone_and_errors_with_let) หรือ _TDZ_.

> **หมายเหตุ:** ในทางเทคนิคแล้ว การประกาศตัวแปร _let_ กับ _const_ เป็น hoisted เหมือนกัน, แต่ไม่ใช่กับการ assign ค่า ดังนั้นเมื่อมันไม่สามารถใช้งานได้ก่อน assign ค่าได้ทำให้ดูเหมือนว่าไม่มี hoisting แต่จริงๆ แล้วมันมี อ่าน[คำอธิบายเพิ่มเติมแบบละเอียดที่นี่](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified)

เพิ่มเติม คุณไม่สามารถประกาศตัวแปรที่ประกาศด้วย _let_ ซ้ำได้:

```js
let myVar = 2;
let myVar = 3; // เกิด SyntaxError
```

#### **_const_**

การประกาศตัวแปรโดยใช้ `const` จะเหมือนกับ _let_ แต่ต่างตรงที่พวกมันจะไม่สามารถ assign ค่าซ้ำได้

สรุปสั้นๆ สำหรับตัวแปรที่ประกาศแบบ _const_:

- เป็น _block scoped_
- ไม่สามารถเข้าถึงได้ก่อนถูก assign ค่า
- ไม่สามารถประกาศซ้ำได้ใน scope เดียวกัน
- ไม่สามารถ assign ซ้ำได้

```js
const myVar = "Nick";
myVar = "John"; // เกิด error เพราะไม่สามารถ assign ค่าซ้ำได้
```

```js
const myVar = "Nick";
const myVar = "John"; // เกิด error เพราะไม่สามารถประกาศตัวแปรซ้ำได้
```

มีบางจุดที่ต้องระวัง: ตัวแปร `const` ไม่ใช่ **immutable** ! อธิบายเพิ่มเติมคือตัวแปรที่ประกาศโดย `const` ที่เก็บค่าเป็น _object_ และ _array_ ค่าข้างใน**สามารถ**เปลี่ยนแปลงได้

สำหรับ objects:

```js
const person = {
  name: "Nick",
};
person.name = "John"; // สามารถทำได้ ! ตัวแปร person ไม่ได้ถูก assign ใหม่ แต่ถูกแปลงค่าข้างใน
console.log(person.name); // "John"
person = "Sandra"; // เกิด error เพราะว่าไม่สามารถ assign ค่าซ้ำได้สำหรับตัวแปรที่ประกาศด้วย const
```

สำหรับ arrays:

```js
const person = [];
person.push("John"); // สามารถทำได้ ! ตัวแปร person ไม่ได้ถูก assign ใหม่ แต่ถูกแปลงค่าข้างใน
console.log(person[0]); // "John"
person = ["Nick"]; // เกิด error เพราะว่าไม่สามารถ assign ค่าซ้ำได้สำหรับตัวแปรที่ประกาศด้วย const
```

---

### Default Parameter

ตั้งแต่อัปเดตของ ES2015 JavaScript สามารถตั้งค่า default ให้กับ parameter ของฟังก์ชั่นได้โดยใช้ syntax ตามนี้:

```js
function myFunc(x = 10) {
  return x;
}
console.log(myFunc()); // 10 -- ไม่ได้มีค่าโยนเข้าไปใน parameter ดังนั้นค่า x จะถูก assign เป็นค่า default ของ myFunc นั่นก็คือ 10
console.log(myFunc(5)); // 5 -- มีค่าโยนเข้าไปใน paramter ดังนั้นค่า x จะมีค่าเท่ากับ 5 ใน myFunc

console.log(myFunc(undefined)); // 10 -- โยนค่าเป็น undefined ไป ดังนั้นจะนำค่า default มาใช้ซึ่งก็คือ 10
console.log(myFunc(null)); // null -- โยนค่า null เข้าไปจึงได้ค่า x เป็น null, ดูรายละเอียดเพิ่มเติมข้างล่าง
```

ค่า default paramter จะถูกเรียกใช้ในสองกรณีนี้เท่านั้น:

- ไม่โยน parameter มาให้
- รับค่า parameter เป็น _undefined_

หรือในอีกความหมายนึงคือ ถ้าคุณส่งค่าเป็น _null_ จะไม่มีการใช้งาน default parameter

> **หมายเหตุ:** ค่า Default สามารถใช้ร่วมกับ destructured parameters ได้ (อันนี้จะอยู่ในเนื้อห้าถัดไป)

#### ข้อมูลเพิ่มเติมจากภายนอก

- [Default parameter value - ES6 Features](http://es6-features.org/#DefaultParameterValues)
- [Default parameters - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

---

### Arrow Function

ใน JavaScript อัปเดต ES6 มี _arrow ฟังก์ชั่น_ ซึ่งเป็นการประกาศและใช้ฟังก์ชั่นในรูปแบบใหม่ และมีความสามารถที่มาเพิ่มเติมดังนี้

- เขียนสั้นกระชับมากขึ้น
- _this_ อ้างอิงถึงภายนอกรอบๆ
- การ return ค่าทันทีได้แบบตรงไปตรงมา

#### ตัวอย่างโค้ด

- การ return ที่สั้นกระชัดและตรงไปตรงมามากขึ้น

```js
function double(x) {
  return x * 2;
} // วิธีปกติ
console.log(double(2)); // 4
```

```js
const double = (x) => x * 2; // ฟังก์ชั่นเดียวกันที่เปลี่ยนมาเขียนโดยใช้ arrow ฟังก์ชั่นและ return ทันที
console.log(double(2)); // 4
```

- การอ้างอิงเมื่อใช้ _this_

ใน arrow ฟังก์ชั่น _this_ จะอ้างอิงถึงค่าของ _this_ ที่อยู่บริบทที่ครอบอยู่ พูดง่ายๆ คือเมื่อใช้ arrow ฟังก์ชั่นคุณไม่จำเป็นต้องทำทริค "that = this" ก่อนเรียกฟังก์ชั่นอื่นภายในฟังก์ชั่นอีกทีอีกต่อไป

```js
function myFunc() {
  this.myVar = 0;
  setTimeout(() => {
    this.myVar++;
    console.log(this.myVar); // 1
  }, 0);
}
```

#### การย่อสั้น

Arrow ฟังก์ชั่นจะสั้นกระชับกว่าฟังก์ชั่นแบบปกติทั่วไป ลองมาดูวิธีการเขียนแบบที่สามารถเขียนได้ดังนี้:

- Implicit VS Explicit return

**Explicit return** หมายถึง function ที่ต้องมีการใช้คีย์เวิร์ด _return_ ข้างในตัวมัน

```js
function double(x) {
  return x * 2; // ฟังก์ชั่นนี้เป็น explicitly returns x * 2, ดังนั้นต้องมีคีย์เวิร์ด *return*
}
```

โดยวิธีเขียนฟังก์ชั่นแบบปกติแล้ว การ return จะเป็น explicit เสมอ แต่สำหรับ arrow ฟังก์ชั่นคุณสามารถทำ _implicit return_ ซึ่งหมายความว่าคุณไม่จำเป็นต้องใช้คีย์เวิร์ด _return_ เพื่อ return ค่าได้เลย

ในการเขียน implicit return จะทำให้สามารถเขียนโค้ดได้เหลือเพียง 1 บรรทัด

```js
const double = (x) => {
  return x * 2; // Explicit return ตรงนี้
};
```

เมื่อมันทำแค่ return ค่าตรงนั้นทันที เราสามารถเขียนแบบ implicit return ได้ข้างล่าง

```js
const double = (x) => x * 2;
```

และจากข้างบน ที่เราต้องทำมีแค่ **เอาปีกกา** กับคีย์เวิร์ด **return** ออก แบบนี้เลยเรียกว่า _implicit_ return เพราะว่าไม่จำเป็นต้องใช้คีย์เวิร์ด return แต่ฟังก์ชั่นก็ยัง return `x * 2` อยู่

> **หมายเหตุ:** ถ้าฟังก์ชั่นของคุณไม่ได้ต้องการการ return ค่า (พร้อมกับ _side effects_) จะใช้แบบไหนก็ไม่ต่างกัน

นอกจากนี้ ถ้าคุณใช้ implicit return ค่าเป็น _object_ คุณ**ต้องใช้วงเล็บครอบ** เพื่อป้องกันการสับสนกับ block scope ตามข้างล่าง

```js
const getPerson = () => ({ name: "Nick", age: 24 });
console.log(getPerson()); // { name: "Nick", age: 24 } -- object implicitly return ค่าโดยใช้ arrow function
```

- มี argument แค่ตัวเดียว

ถ้า function รับ parameter เพียงแค่ตัวเดียว สามารถเอาวงเล็บออกได้ ถ้าเราปรับปรุงจากโค้ด _double_ ก่อนหน้าจะได้ดังนี้

```js
const double = (x) => x * 2; // arrow ฟังก์ชั่นนี้รับเพียง 1 parameter

// วงเล็บสามารถเอาออกได้ดังนี้:
// const double = x => x * 2;
```

- ไม่มี argument

เมื่อไม่ต้องการ argument ใดๆ เลยใน arrow function คุณจำเป็นต้องใส่วงเล็บ ไม่อย่างนั้นมันจะไม่ใช่ syntax ที่ถูกต้อง

```js
() => {
  // ถ้ามีวงเล็บ ทุกอย่างจะปกติ
  const x = 2;
  return x;
};
```

```js
  => { // ถ้าไม่มีวงเล็บ จะใช้งานไม่ได้!
    const x = 2;
    return x;
  }
```

#### **การอ้างอิงของ _this_**

เพื่อที่จะเข้าใจเรื่อง this กับ arrow ฟังก์ชั่น ต้องเข้าใจก่อนว่า [this](https://github.com/mbeaudru/modern-js-cheatsheet/blob/master/translations/th-TH.md#this_def) ทำงานยังไงใน JavaScript

ใน arrow function _this_ มีค่าเท่าที่ค่าของ _this_ ที่เป็นบริบทที่ครอบมันอยู่ นั่หมายถึงว่า arrow ฟังก์ชั่นไม่สร้าง _this_ ขึ้นมาใหม่ แต่ว่ามันเอาค่าที่อยู่รอบนอกของมันมาใช้แทน

ถ้าไม่ใช่ arrow ฟังก์ชั่นถ้าคุณต้องการใช้งานตัวแปร _this_ ของฟังก์ชั่นเมื่ออยู่ภายใน function อีกที เพื่ออ้างอิงถึง _this_ ภายนอก คุณจะต้องใช้ _that = this_ หรือว่า _self = this_ เป็นทริคเพื่ออ้างอิงถึง

ยกตัวอย่างเช่น เมื่อใช้ฟังก์ชั่น setTimeout ภายใน myFunc:

```js
function myFunc() {
  this.myVar = 0;
  var that = this; // ทริค that = this
  setTimeout(function () {
    // *this* ใหม่ถูกสร้างภายใน function scope นี้
    that.myVar++;
    console.log(that.myVar); // 1

    console.log(this.myVar); // undefined -- เพราะว่าไปหาที่ฟังก์ชั่นที่อยู่นี้ ไม่ใช่ myFunc
  }, 0);
}
```

แต่เมื่อใช้ arrow ฟังก์ชั่น _this_ จะอ้างอิงถึงที่อยู่รอบๆ ตัวมัน:

```js
function myFunc() {
  this.myVar = 0;
  setTimeout(() => {
    // this มาจากรอบๆ นั่นหมายถึง myFunc ในกรณีนี้
    this.myVar++;
    console.log(this.myVar); // 1
  }, 0);
}
```

#### หล่งข้อมูลที่มีประโยชน์

- [Arrow functions introduction - WesBos](http://wesbos.com/arrow-functions/)
- [JavaScript arrow function - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Arrow function and lexical _this_](https://hackernoon.com/javascript-es6-arrow-functions-and-lexical-this-f2a3e2a5e8c4)

---

### Modules

ES6 modules สามารถเข้าถึงตัวแปรต่างๆ ของ modules ที่ทำการแยก export ค่าต่างๆ ได้ด้วยการ imports

แนะนำให้ลองอ่านข้อมูลเพิ่มเติมใน MDN resources เกี่ยวกับเรื่อง import/export (ดูข้อมูลเพิ่มเติมภายนอกข้างล่าง) จะดีเป็นอย่างมาก เนื้อหาข้างในค่อนข้างอธิบายได้ตรงไปตรงมาและสมบูรณ์แบบ

#### **_Named exports_**

Named exports ใช้สำหรับการ export หลายๆ ค่าของ module

> **หมายเหตุ :** สามารถ export แบบ name-export [first-class citizens](https://en.wikipedia.org/wiki/First-class_citizen) ได้เฉพาะกับของที่มีชื่อเท่านั้น.

```js
// mathConstants.js
export const pi = 3.14;
export const exp = 2.7;
export const alpha = 0.35;

// -------------

// myFile.js
import { pi, exp } from "./mathConstants.js"; // Named import -- คล้ายๆ กับ syntax destructuring
console.log(pi); // 3.14
console.log(exp); // 2.7

// -------------

// mySecondFile.js
import * as constants from "./mathConstants.js"; // ทำค่าทั้งหมดที่มีการ exports มาเป็นตัวแปร
console.log(constants.pi); // 3.14
console.log(constants.exp); // 2.7
```

named imports จะคล้ายกับ _destructuring_ แต่ว่าจริงๆ แล้วมีความต่างและไม่เหมือนกัน มันไม่รองรับการใช้ default value หรือว่า _deep_ destructuring

นอกจากนี้คุณสามารถทำ alias ได้อยู่ เพียงแต่ว่า syntax จะแตกต่างกับ destructuring เป็นรูปแบบตามข้างล่าง

```js
import { foo as bar } from "myFile.js"; // foo ถูก import เข้ามาและเอาไปเป็นค่าตัวแปรใหม่ที่ชื่อว่า bar
```

#### **_Default import / export_**

สำหรับ default export เราจะสามารถ export default ได้แค่ตัวเดียวต่อ module และค่า default ที่ export สามารถเป็นได้ทั้ง function, class, object หรืออะไรก็ตาม ค่านี้เป็นเหมือนค่า "หลัก" ในการ export และมันจะง่ายต่อการ import เวลานำไปใช้ [Ref: MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#Description)

```js
// coolNumber.js
const ultimateNumber = 42;
export default ultimateNumber;

// ------------

// myFile.js
import number from "./coolNumber.js";
// Default export จะอิสระในการตั้งชื่อในหน้าที่ import เข้าไปใช้งาน อย่างข้างบนจะถูกเก็บลงตัวแปรชื่อ number ซึ่งเราสามารถตั้งเองได้
console.log(number); // 42
```

Export ฟังก์ชั่น:

```js
// sum.js
export default function sum(x, y) {
  return x + y;
}
// -------------

// myFile.js
import sum from "./sum.js";
const result = sum(1, 2);
console.log(result); // 3
```

#### ข้อมูลเพิ่มเติมจากภายนอก

- [ES6 Modules in bulletpoints](https://ponyfoo.com/articles/es6#modules)
- [Export - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [Import - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [Understanding ES6 Modules](https://www.sitepoint.com/understanding-es6-modules/)
- [Destructuring special case - import statements](https://ponyfoo.com/articles/es6-destructuring-in-depth#special-case-import-statements)
- [Misunderstanding ES6 Modules - Kent C. Dodds](https://medium.com/@kentcdodds/misunderstanding-es6-modules-upgrading-babel-tears-and-a-solution-ad2d5ab93ce0)
- [Modules in JavaScript](http://exploringjs.com/es6/ch_modules.html#sec_modules-in-javascript)

---

### Template String

Template literals เป็น [_expression interpolation_](https://en.wikipedia.org/wiki/String_interpolation) สำหรับ strings ที่สามารถทำได้ตั้งแต่บรรทัดเดียวถึงหลายบรรทัด

หรือในอีกกรณีนึงก็คือ มันเป็น syntax ของ string ที่สามารถใช้ JavaScript expesssions ข้างในได้อย่างสะดวกมากขึ้น (ยกตัวอย่างเช่นแทรกตัวแปรภายใน string)

#### ตัวอย่างโค้ด

```js
const name = "Nick";
`Hello ${name}, the following expression is equal to four : ${2 + 2}`;

// Hello Nick, the following expression is equal to four: 4
```

#### ข้อมูลเพิ่มเติมจากภายนอก

- [String interpolation - ES6 Features](http://es6-features.org/#StringInterpolation)
- [ES6 Template Strings - Addy Osmani](https://developers.google.com/web/updates/2015/01/ES6-Template-Strings)

### Tagged template literals

Template tags คือ _ฟังก์ชั่นที่สามารถกลายเป็นให้กับ [template literal](#template-literals) ได้_. ถ้าฟังก์ชั่นถูกเรียกใช้แบบนี้ parameter แรกจะเป็น array ของ _strings_ ที่แสดงระหว่างตัวแปรของ template's interpolated และ parameter อื่นที่ตามมาคือค่า interpolated ดังนั้นถ้าใช้ spread operator `...` ก็จะสามารถรวบรวม parameter ที่เหลือทั้งหมดได้ [(Ref: MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals).

> **หมายเหตุ :** Library ชื่อดังอย่าง [styled-components](https://www.styled-components.com/) ใช้ฟีเจอร์นี้อย่างเต็มรูปแบบ

ข้างล่างคือตัวอย่างของการนำไปใช้งาน

```js
function highlight(strings, ...values) {
  const interpolation = strings.reduce((prev, current) => {
    return (
      prev +
      current +
      (values.length ? "<mark>" + values.shift() + "</mark>" : "")
    );
  }, "");

  return interpolation;
}

const condiment = "jam";
const meal = "toast";

highlight`I like ${condiment} on ${meal}.`;
// "I like <mark>jam</mark> on <mark>toast</mark>."
```

ตัวอย่างที่น่าสนใจเพิ่มเติม:

```js
function comma(strings, ...values) {
  return strings.reduce((prev, next) => {
    let value = values.shift() || [];
    value = value.join(", ");
    return prev + next + value;
  }, "");
}

const snacks = ["apples", "bananas", "cherries"];
comma`I like ${snacks} to snack on.`;
// "I like apples, bananas, cherries to snack on."
```

#### ข้อมูลเพิ่มเติมจากภายนอก

- [Wes Bos on Tagged Template Literals](http://wesbos.com/tagged-template-literals/)
- [Library of common template tags](https://github.com/declandewet/common-tags)

---

### Spread Operators

spread operator `...` เป็นของใหม่ใน ES2015 และใช้สำหรับแผ่ขยายค่าของสิ่งที่สามารถนำมาวนรอบได้ (อย่างเช่น array) แตกออกเป็นชิ้นๆ และนำไปใส่ที่อื่น

#### โค้ดตัวอย่าง

```js
const arr1 = ["a", "b", "c"];
const arr2 = [...arr1, "d", "e", "f"]; // ["a", "b", "c", "d", "e", "f"]
```

```js
function myFunc(x, y, ...params) {
  console.log(x);
  console.log(y);
  console.log(params);
}

myFunc("a", "b", "c", "d", "e", "f");
// "a"
// "b"
// ["c", "d", "e", "f"]
```

```js
const { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

const n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```

#### **_ใช้กับสิ่งที่สามารถวนลูปได้ (iterables) (แบบ arrays)_**

ถ้าเรามี array สองตัวดังนี้:

```js
const arr1 = ["a", "b", "c"];
const arr2 = [arr1, "d", "e", "f"]; // [["a", "b", "c"], "d", "e", "f"]
```

ใน _arr2_ ค่าแรกจะเป็น array เพราะว่า _arr1_ ถูกนำเข้าไปใส่ใน _arr2_ แต่ถ้าเราต้องให้ _arr2_ เป็น array ของตัวอักษรเพียงอย่างเดียว สิ่งที่เราต้องทำคือเราสามารถ _spread_ ค่าต่างๆ ของ _arr1_ เข้าไปสู่ _arr2_

เมื่อใช้ spread operator

```js
const arr1 = ["a", "b", "c"];
const arr2 = [...arr1, "d", "e", "f"]; // ["a", "b", "c", "d", "e", "f"]
```

#### **_Rest parameter ของฟังก์ชั่น_**

ใน parameter ของฟังก์ชั่นเราสามารถใช้ rest operator สำหรับรวม parameters เป็น array ที่เราสามารถนำไปวนลูปได้ ถ้าเทียบก็เหมือนการห่อ **arguments** ที่รับมาเป็น object เอาไว้

```js
function myFunc() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

myFunc("Nick", "Anderson", 10, 12, 6);
// "Nick"
// "Anderson"
// 10
// 12
// 6
```

แต่ถ้าเราต้องการให้ function นี้สร้าง student ใหม่พร้อมกับ grade ทั้งหมดของนักเรียนและค่าเฉลี่ยเกรด จะง่ายกว่าถ้าเราแยกให้สอง parameter แรกเป็นตัวแปรแยก และที่เหลือจากนั้นเป็น grade ที่เราสามารถนำไปวนรอบ (itelate) ได้มันน่าจะดีกว่ารึเปล่า?

และ rest operator ทำให้เราสามารถทำแบบนั้นได้!

```js
function createStudent(firstName, lastName, ...grades) {
  // firstName = "Nick"
  // lastName = "Anderson"
  // [10, 12, 6] -- "..." นำ paramters ที่รับเข้ามาที่เหลือสร้างเป็นตัวแปร array ชื่อ "grades"

  const avgGrade = grades.reduce((acc, curr) => acc + curr, 0) / grades.length; // คำนวณค่าเฉลี่ยของ grades

  return {
    firstName: firstName,
    lastName: lastName,
    grades: grades,
    avgGrade: avgGrade,
  };
}

const student = createStudent("Nick", "Anderson", 10, 12, 6);
console.log(student);
// {
//   firstName: "Nick",
//   lastName: "Anderson",
//   grades: [10, 12, 6],
//   avgGrade: 9,33
// }
```

> **หมายเหตุ:** ฟังก์ชั่น createStudent ยังไม่ดีเท่าไหร่เพราะว่าเรายังไม่ได้เช็ก grades.length ในกรณีที่ไม่มีค่าอยู่จริงหรือไม่ใช่ 0 แต่มันง่ายกว่าถ้าเขียนแบบนี้เพื่อทำความเข้าใจ เพราะฉะนั้นในโค้ดตัวอย่างเลยจะไม่มีการจัดการกับกรณีนี้

#### **_Object properties spreading_**

ก่อนจะเข้าเรื่องนี้ แนะนำให้อ่านคำอธิบายก่อนหน้าสำหรับ rest operator ที่ทำการห่อ parameter กลายเป็น object ที่สามารถทำการวนลูปได้ (itelable)

```js
const myObj = { x: 1, y: 2, a: 3, b: 4 };
const { x, y, ...z } = myObj; // object destructuring ตรงนี้
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

// z จะได้ค่าที่เหลือของ object ที่ถูก destructured แล้ว: myObj object เมื่อลบค่า x และ y properties ที่ถูก destructured ออกไปแล้ว

const n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }

// เมื่อนำ z object มา spread กลับเข้าไปให้กับตัวแปร n จะได้ค่าดังเดิม
```

#### ข้อมูลเพิ่มเติมจากภายนอก

- [TC39 - Object rest/spread](https://github.com/tc39/proposal-object-rest-spread)
- [Spread operator introduction - WesBos](https://github.com/wesbos/es6-articles/blob/master/28%20-%20Spread%20Operator%20Introduction.md)
- [JavaScript & the spread operator](https://codeburst.io/javascript-the-spread-operator-a867a71668ca)
- [6 Great uses of the spread operator](https://davidwalsh.name/spread-operator)

---

### Object property shorthand

เมื่อ assign ค่าใช้ตัวแปรเป็น object property ถ้าชื่อตัวแปรมีค่าเท่ากับชื่อ property คุณสามารถทำแบบนี้ได้:

```js
const x = 10;
const myObj = { x };
console.log(myObj.x); // 10
```

#### อธิบาย

ปกติแล้ว (pre-ES2015) เมื่อคุณประกาศ _object literal_ ใหม่ และต้องการใช้ค่าของตัวแปรไปเป็นค่าให้กับ object properties นั้นปกติแล้วต้องเขียนแบบนี้:

```js
const x = 10;
const y = 20;

const myObj = {
  x: x, // assign ค่าของตัวแปร x ให้เป็นค่าของ myObj.x
  y: y, // assign ค่าของตัวแปร y ให้เป็นค่าของ myObj.y
};

console.log(myObj.x); // 10
console.log(myObj.y); // 20
```

จะเห็นว่ามันซ้ำซ้อนกันเพราะว่าชื่อ properties ของ myObj เป็นชื่อเดียวกับตัวแปรที่ต้องการ assign ให้กับ properties เหล่านั้น

เมื่อเขียนด้วย ES2015 เมื่อชื่อตัวแปรเป็นชื่อเดียวกับชื่อ property สามารถเขียนให้สั้นลงเป็นแบบนี้ได้:

```js
const x = 10;
const y = 20;

const myObj = {
  x,
  y,
};

console.log(myObj.x); // 10
console.log(myObj.y); // 20
```

#### ข้อมูลเพิ่มเติมจากภายนอก

- [Property shorthand - ES6 Features](http://es6-features.org/#PropertyShorthand)

---

### Destructuring

_Destructuring_ เป็นวิธีในการสร้างตัวแปรใหม่จากการแยกค่าบางค่าจากข้างในของ objects หรือ arrays ซึ่งทำให้สะดวกมากยิ่งขึ้น

ยกตัวอย่างสำหรับการใช้งานเช่น _destructuring_ สามารถใช้ในการแยกส่วน parameters ของฟังก์ชั่น หรือว่า _this.props_ ที่มักเจอประจำในโปรเจ็คที่เป็น React

#### อธิบายตัวอย่างโค้ด

- Object

ลองพิจารณา object ข้างล่างเป็นตัวอย่าง:

```js
const person = {
  firstName: "Nick",
  lastName: "Anderson",
  age: 35,
  sex: "M",
};
```

เมื่อไม่ใช้ destructuring:

```js
const first = person.firstName;
const age = person.age;
const city = person.city || "Paris";
```

เมื่อใช้ destructuring สามารถเขียนในบรรทัดเดียวได้แบบนี้:

```js
const { firstName: first, age, city = "Paris" } = person; // แบบนี้ !

console.log(age); // 35 -- ตัวแปร age ถูกสร้างขึ้นมาใหม่และมีค่าเท่ากับ person.age
console.log(first); // "Nick" -- ตัวแปร first ถูกสร้างขึ้นมาใหม่และมีค่าเท่ากับ person.firstName
console.log(firstName); // ReferenceError -- person.firstName มีอยู่จริง แต่ตัวแปรที่ถูกสร้างขึ้นใหม่ถูกตั้งชื่อว่า first
console.log(city); // "Paris" -- ตัวแปร city ถูกสร้างขึ้นใหม่ และ person.city มีค่าเป็น undefined เพราะฉะนั้น city จะมีค่าเท่ากับ default ที่ระบุไว้คือ "Paris"
```

**หมายเหตุ :** ใน `const { age } = person;`, ปีกกาหลังคีย์เวิร์ด _const_ มีได้หมายถึงเป็นการประกาศ object หรือว่า block แต่มันหมายถึงเป็น _destructuring_ syntax

- Parameters ของฟังก์ชั่น

_Destructuring_ จะใช้บ่อยในการ destructure objects parameters ในฟังก์ชั่น

ถ้าไม่มี destructuring

```js
function joinFirstLastName(person) {
  const firstName = person.firstName;
  const lastName = person.lastName;
  return firstName + "-" + lastName;
}

joinFirstLastName(person); // "Nick-Anderson"
```

_person_ สามารถทำ destructuring เพื่อให้สั้นกระชับขึ้นได้ดังนี้:

```js
function joinFirstLastName({ firstName, lastName }) {
  // สร้างตัวแปร firstName กับ lastName โดยการ destructuring ตัวแปร
  return firstName + "-" + lastName;
}

joinFirstLastName(person); // "Nick-Anderson"
```

Destructuring ยังถูกใช้บ่อยควบคู่กับ [arrow ฟังก์ชั่น](#arrow_func_concept):

```js
const joinFirstLastName = ({ firstName, lastName }) =>
  firstName + "-" + lastName;

joinFirstLastName(person); // "Nick-Anderson"
```

- Array

จาก array ข้างล่างต่อไปนี้:

```js
const myArray = ["a", "b", "c"];
```

เมื่อไม่มี destructuring

```js
const x = myArray[0];
const y = myArray[1];
```

เมื่อมี destructuring

```js
const [x, y] = myArray; // แบบนี้ !

console.log(x); // "a"
console.log(y); // "b"
```

#### แหล่งข้อมูลที่มีประโยชน์

- [ES6 Features - Destructuring Assignment](http://es6-features.org/#ArrayMatching)
- [Destructuring Objects - WesBos](http://wesbos.com/destructuring-objects/)
- [ExploringJS - Destructuring](http://exploringjs.com/es6/ch_destructuring.html)

---

### Promises

Promise เป็น object ที่สามารถ return ค่าแบบ synchronous จากฟังก์ชั่นที่เป็น asynchronous ได้ ([ref](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261#3cd0)).

Promise สามารถใช้เพื่อแก้ปัญหาของ [callback hell](http://callbackhell.com/) และมันมักนำไปใช้ในโค้ด Javascript โปรเจ็คใหม่ๆ ที่ทันสมัย

#### ตัวอย่างโค้ด

```js
const fetchingPosts = new Promise((res, rej) => {
  $.get("/posts")
    .done((posts) => res(posts))
    .fail((err) => rej(err));
});

fetchingPosts
  .then((posts) => console.log(posts))
  .catch((err) => console.log(err));
```

#### อธิบาย

เมื่อคุณสร้าง _Ajax request_ จะได้รับ response ที่ไม่ synchronous เพราะว่ามันต้องใช้เวลาเพื่อจะได้ผลลัพธ์ที่กลับมา และมันอาจจะไม่ได้ค่าที่ต้องการกลับมาถ้า request ที่ส่งไปไม่สามารถใช้งานได้ด้วยเหตุบางประการ (404)

เพื่อรับมือกับสถานการณ์แบบนั้น ES2015 ได้มี _promises_ ซึ่ง promise มีทั้งหมด 3 states ด้วยกัน:

- Pending
- Fulfilled
- Rejected

หรือพูดอีกอย่างว่าเราต้องการใช้ promise ไปการจัดการกับพวก Ajax request เพื่อดึงข้อมูลจาก X

#### **_การสร้าง promise_**

ก่อนที่เราจะใช้ promise เราจะใช้ jQuery สำหรับการทำ Ajax request ไปหา X

```js
const xFetcherPromise = new Promise(function (resolve, reject) {
  // สร้าง promise โดยใช้คีย์เวิร์ด "new" และเก็บลงตัวแปร
  // constructor ของ promise รับ parameter เป็นฟังก์ชั่นที่มี parameter ชื่อ resolve และ reject ด้วยตัวมันเอง
  $.get("X") // ส่ง Ajax request
    .done(function (X) {
      // เมื่อ request เสร็จแล้ว ...
      resolve(X); // ... resolve promise ด้วยค่า X กลับไปเป็น parameter
    })
    .fail(function (error) {
      // ถ้า request เกิดผิดพลาด...
      reject(error); // ... reject promise แล้วส่ง error กลับไปเป็น parameter
    });
});
```

จากที่เห็นในตัวอย่างข้างบน Promise object จะรับ _executor_ ฟังก์ชั่นที่รับ parameter สองตัวคือ **resolve** และ **reject** ซึ่งสองตัวนี้ถ้ามีการเรียกใช้จะเป็นการย้าย state ของ promise จาก _pending_ ไปสู่ _fulfilled_ หรือ _rejected_

promise จะอยู่ใน pending state หลังสร้าง instance และฟังก์ชั่น _executor_ ของมันจะทำงานทันที และเมื่อมีการเรียกใช้ฟังก์ชั่น _resolve_ หรือ _reject_ ภายใน _executor_ ฟังก์ชั่นตัว promise จะมีสิ่งที่เรียกว่า handlers คอยจัดการกับสิ่งที่เกิดขึ้น

#### **_การใช้งาน Promise handlers_**

เพื่อที่จะรับผลลัพธ์ของ promise (หรือว่า error) เราจะสามารถควบคุมด้วย handlers โดยทำได้ดังนี้:

```js
xFetcherPromise
  .then(function (X) {
    console.log(X);
  })
  .catch(function (err) {
    console.log(err);
  });
```

ถ้า promise ทำงานสมบูรณ์และเรียกใช้ _resolve_ โดยจะส่งค่าที่ได้ไปเป็น parameter ในฟังก์ชั่นใน `.then`

ถ้าเกิดข้อผิดพลาด _reject_ จะถูกเรียกแล้วส่งค่าไปเป็น parameter ในฟังก์ชั่นใน `.catch`

> **หมายเหตุ :** ถ้า promise เข้าไปสู่ state fulfilled หรือ rejected โดยที่มีการใช้ handler แล้ว handler จะถูกเรียกใช้ ทำให้ไม่เกิด race condition ระหว่างรอ asynchronous เสร็จสมบูรณ์กับ handlers [(Ref: MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Description)

#### ข้อมูลเพิ่มเติมจากภายนอก

- [JavaScript Promises for dummies - Jecelyn Yeen](https://scotch.io/tutorials/javascript-promises-for-dummies)
- [JavaScript Promise API - David Walsh](https://davidwalsh.name/promises)
- [Using promises - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [What is a promise - Eric Elliott](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
- [JavaScript Promises: an Introduction - Jake Archibald](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
- [Promise documentation - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

---

### Async/Await

เพิ่มเติมจาก Promises จะมี syntax รูปแบบใหม่ให้สำหรับจัดการกับ asynchronous ชื่อว่า _async / await_

จุดประสงค์ของ async/await function คือทำให้สามารถจัดการกับการใช้ promise synchronous ได้ง่ายขึ้น และทำพฤติกรรมคล้ายๆ กับ Promises ถ้าให้เปรียบเทียบคือถ้า Promises มีโครงสร้างคล้ายคลึงกับ callback สำหรับ async/await จะมีโครงสร้างคล้าย generators ผสมกับ promises นั่นเอง ซึ่ง async function จะ return เป็น Promise _เสมอ_ ([Ref: MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function))

> **หมายเหตุ :** ต้องเข้าใจก่อนว่า promise คืออะไร และทำงานยังไง ก่อนที่จะพยายามทำความเข้าใจ async / await

> **หมายเหตุ 2:** [_await_ จะต้องใช้ใน _async_ function](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9#f3f0), นั่นหมายความว่าคุณไม่สามารถใช้ await ใน top level ของโค้ดได้ ถ้ามันไม่ได้อยู่ใน async function.

#### ตัวอย่างโค้ด

```js
async function getGithubUser(username) {
  // คีย์เวิร์ด async ทำให้สามารถใช้ await ภายในฟังก์ชั่นได้ นั่นหมายถึงฟังก์ชั่นนี้ return เป็น promise
  const response = await fetch(`https://api.github.com/users/${username}`); // Execution จะหยุดที่ตรงนี้จนกว่า promise จะ return หลังจาก fetch แล้ว resolved
  return response.json();
}

getGithubUser("mbeaudru")
  .then((user) => console.log(user)) // log ข้อมูล response ของ user - ไม่สามารถใช้ syntax await ได้เพราะโค้ดไม่ได้เป็น async function
  .catch((err) => console.log(err)); // ถ้า error มีการ thrown ใน async function จะสามารถ catch ได้ที่นี่
```

#### อธิบายตัวอย่างโค้ด

_Async / Await_ สร้างมาจาก promise แต่ว่าออกแบบมาให้เขียนในรูปแบบที่ง่ายกว่า

_async_ operator จะเปลี่ยนฟังก์ชั่นเป็น asynchronous และจะ return เป็น _Promise_ คุณสามารถใช้ _await_ operator ใน _async_ function เพื่อหยุดการ execution ที่บรรทัดนั้นๆ จนกว่า Promise จะ return ค่ากลับมาโดย resolves หรือ rejects

```js
async function myFunc() {
  // เราสามารถใช้ await operator เพราะฟังก์ชั่นนี้กำหนดเป็น async
  return "hello world";
}

myFunc().then((msg) => console.log(msg)); // "hello world" -- ค่าที่คืนจากฟังก์ชั่น myFunc จะถูกเปลี่ยนไปเป็น promise เพราะว่ามีการใช้ async operator
```

เมื่อถึงบรรทัด _return_ ของ async function ตัว Promise ที่ได้รับค่าแล้วจะ return กลับไป ถ้าเกิด error และมีการ thrown ข้างใน async function ตัว promise state จะถูกเปลี่ยนเป็น _rejected_ และถ้ากรณีไม่มีค่า return จาก async function ตัว promise จะยังคง return และ resolve แบบไม่มีค่ากลับไปเมื่อ async function ทำงานเสร็จสมบูรณ์

_await_ operator จะใช้สำหรับรอ _Promise_ จนกว่าจะได้รับค่า และสามารถใช้ได้เฉพาะในฟังก์ชั่นที่เป็น _async_ เท่านั้น เมื่อโค้ด execution มาถึงจะหยุดจนกว่า promise จะได้รับการเติมเต็มข้อมูล (fulfilled)

> **หมายเหตุ :** _fetch_ เป็นฟังก์ชั่นที่ return เป็น Promise ที่สามารถทำ AJAX request ได้

มาดูกันว่าเราสามารถใช้ fetch ข้อมูล github user ด้วย promises ยังไงได้บ้าง:

```js
function getGithubUser(username) {
  return fetch(`https://api.github.com/users/${username}`).then((response) =>
    response.json()
  );
}

getGithubUser("mbeaudru")
  .then((user) => console.log(user))
  .catch((err) => console.log(err));
```

และอันนี้คือถ้ากรณีใช้ _async / await_ จะเป็นยังไง:

```js
async function getGithubUser(username) {
  // ใช้งาน promise + await ร่วมกัน
  const response = await fetch(`https://api.github.com/users/${username}`); // Execution จะหยุดที่นี่จนกว่าข้อมูลใน Promise จะได้รับการเติมเต็ม (fulfilled)
  return response.json();
}

getGithubUser("mbeaudru")
  .then((user) => console.log(user))
  .catch((err) => console.log(err));
```

_async / await_ syntax ทำให้เราสามารถเขียน promise แบบ chain ได้สะดวกสบายมากขึ้น

ยกตัวอย่างเช่น ถ้าเราต้องการเอาค่า token ก่อนเพื่อที่จะนำข้านี้ไป fetch ข้อมูล blog post ที่อยู่ใน database เพื่อเอาข้อมูลคนเขียน post เราจะสามารถให้มันทำงานตามลำดับได้:

> **หมายเหตุ :** _await_ ต้องครอบด้วยวงเล็บเพื่อรอให้เรียก resolve และได้รับค่าก่อน ถึงจะนำไปใช้ต่อได้ถ้าเขียนในบรรทัดเดียวกันหรือเขียนแบบ chain

```js
async function fetchPostById(postId) {
  const token = (await fetch("token_url")).json().token;
  const post = (await fetch(`/posts/${postId}?token=${token}`)).json();
  const author = (await fetch(`/users/${post.authorId}`)).json();

  post.author = author;
  return post;
}

fetchPostById("gzIrzeo64")
  .then((post) => console.log(post))
  .catch((err) => console.log(err));
```

#### **_การจัดการกับ Error_**

นอกจากเพิ่ม _try / catch_ blocks ครอบการใช้ _await_ เพื่อดัก uncaught exceptions แล้ว - ไม่ว่าอะไรก็ตามที่ thrown ภายใน _async_ function หรือว่ามันโดนยกเลิกระหว่าง _await_ – จะ reject ตัว promise กลับไปใน _async_ function ดังนั้นถ้าใช้ `throw` ใน async function จะเหมือนกับ return ตัว Promise ที่ rejects นั่นเอง [(Ref: PonyFoo)](https://ponyfoo.com/articles/understanding-javascript-async-await#error-handling).

> **หมายเหตุ :** Promises เป็นแบบเดียวกัน!

เมื่อใช้ Promises เราจะสามารถจัดการกับ error chain ได้แบบนี้:

```js
function getUser() {
  // Promise อันนี้จะโดน rejected!
  return new Promise((res, rej) => rej("User not found !"));
}

function getAvatarByUsername(userId) {
  return getUser(userId).then((user) => user.avatar);
}

function getUserAvatar(username) {
  return getAvatarByUsername(username).then((avatar) => ({ username, avatar }));
}

getUserAvatar("mbeaudru")
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); // "User not found !"
```

กรณีถ้าใช้ _async / await_:

```js
async function getUser() {
  // Promise ที่จะ return กลับไปจะ rejected!
  throw "User not found !";
}

async function getAvatarByUsername(userId) {
  const user = await getUser(userId);
  return user.avatar;
}

async function getUserAvatar(username) {
  var avatar = await getAvatarByUsername(username);
  return { username, avatar };
}

getUserAvatar("mbeaudru")
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); // "User not found !"
```

#### ข้อมูลเพิ่มเติมจากภายนอก

- [Async/Await - JavaScript.Info](https://javascript.info/async-await)
- [ES7 Async/Await](http://rossboucher.com/await/#/)
- [6 Reasons Why JavaScript’s Async/Await Blows Promises Away](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9)
- [JavaScript awaits](https://dev.to/kayis/javascript-awaits)
- [Using Async Await in Express with Node 8](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016)
- [Async Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [Using async / await in express with node 8](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016)

---

### Array [map, filter, reduce, find]

_Map_, _filter_ และ _reduce_ เป็น method ของ array ที่มาจาก programming paradigm ที่ชื่อว่า [_functional programming_](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0).

สรุปแบบสั้นๆ:

- **Array.prototype.map()** นำ array มาวนลูป ทำอะไรบางอย่างกับค่าของมันแต่ละค่าแล้ว return กลับกลายเป็น array ที่แปลงค่าแล้ว.
- **Array.prototype.filter()** นำ array มาวนลูป เลิอกว่าค่าไหนเก็บไว้และค่าไหนทิ้ง และ return กลับไปเป็น array ที่ถูกเลือกแล้ว
- **Array.prototype.reduce()** นำ array มาวนลูปและประกอบกันแต่ละค่าเหลือเพียงค่าเดียวเพื่อ return กลับไป
- **Array.prototype.find()** จะ return ค่าแรกที่เข้าเงื่อนไขในการค้นหาข้อมูลใน array

แนะนำให้ใช้พวกนี้มากที่สุดเท่าที่จะทำได้ตามทฤษฐีของ functional programming เพราะว่ามันสั้นกระชับและสวยกว่า

เมื่อมี 3 methods นี้ คุณสามารถละการใช้ _for_ และ _forEach_ ลูปในสถานการณ์ส่วนใหญ่ได้ เมื่อคุณจะใช้ _for_ ลูป ลองเปลี่ยนมาใช้ _map_, _filter_ และ _reduce_ แทน แรกๆ อาจจะติดเพราะว่าต้องเปลี่ยนวิธีในการคิดแต่หลังจากเข้าใจและใช้ไปซักระยะจะสามารถใช้งานได้อย่างง่ายดาย

#### ตัวอย่างโค้ด

```js
const numbers = [0, 1, 2, 3, 4, 5, 6];
const doubledNumbers = numbers.map((n) => n * 2); // [0, 2, 4, 6, 8, 10, 12]
const evenNumbers = numbers.filter((n) => n % 2 === 0); // [0, 2, 4, 6]
const sum = numbers.reduce((prev, next) => prev + next, 0); // 21
```

คำนวณผลรวมเกรดทั้งหมดของนักเรียนโดยใช้ map, filter และ reduce:

```js
const students = [
  { name: "Nick", grade: 10 },
  { name: "John", grade: 15 },
  { name: "Julia", grade: 19 },
  { name: "Nathalie", grade: 9 },
];

const aboveTenSum = students
  .map((student) => student.grade) // เรา map ข้อมูลนักเรียนให้กลายเป็น array ที่มีแต่เกรด
  .filter((grade) => grade >= 10) // เรา filter เกรดให้เก็บไว้เฉพาะที่มีค่ามากกว่าเท่ากับ 10
  .reduce((prev, next) => prev + next, 0); // เรารวมผลรวมของทุกเกรดทีละคน

console.log(aboveTenSum); // 44 -- 10 (Nick) + 15 (John) + 19 (Julia), Nathalie ได้เกรดต่ำกว่า 10 จะถูกข้ามไป
```

#### อธิบาย

ลองดู array ของตัวเลขต่อไปนี้ที่จะใช้ในตัวอย่าง:

```js
const numbers = [0, 1, 2, 3, 4, 5, 6];
```

#### **_Array.prototype.map()_**

```js
const doubledNumbers = numbers.map(function (n) {
  return n * 2;
});
console.log(doubledNumbers); // [0, 2, 4, 6, 8, 10, 12]
```

เกิดอะไรขึ้นในข้างบนบ้าง? เราใช้ .map กับ array ที่เก็บ _ตัวเลข_ โดย map จะทำการวนรอบ (iterate) ทุกๆ ค่าที่อยู่ภายใน array และส่งค่าต่อเข้าไปในฟังก์ชั่นของเรา เป้าหมายของฟังก์ชั่นนี้คือต้องการสร้างค่าใหม่จากค่าเดิมที่ส่งเข้ามาและส่งกลับไป

ถ้ากระจายฟังก์ชั่นให้อ่านง่ายขึ้นจะเป็นตามภาพดังนี้:

```js
const doubleN = function (n) {
  return n * 2;
};
const doubledNumbers = numbers.map(doubleN);
console.log(doubledNumbers); // [0, 2, 4, 6, 8, 10, 12]
```

`numbers.map(doubleN)` produces `[doubleN(0), doubleN(1), doubleN(2), doubleN(3), doubleN(4), doubleN(5), doubleN(6)]` จะเท่ากับ `[0, 2, 4, 6, 8, 10, 12]`.

> **หมายเหตุ:** ถ้าคุณไม่ต้องการ return array ใหม่ แต่ต้องการทำลูปที่สร้าง side effects การใช้ for / forEach ลูปน่าจะเหมาะมากกว่าใช้ map

#### **_Array.prototype.filter()_**

```js
const evenNumbers = numbers.filter(function (n) {
  return n % 2 === 0; // ถ้า n เป็นเลขคู่จะเป็น true, และ false ถ้า n ไม่ใช่
});
console.log(evenNumbers); // [0, 2, 4, 6]
```

เราใช้ .filter กับ array ที่เก็บ _ตัวเลข_ ชุดเดิม, filter จะทำการวนรอบ (iterate) ทุกค่าใน array และส่งเข้าไปในฟังก์ชั่นของเรา เป้าหมายของฟังก์ชั่นนี้คือการ return เป็น boolean ว่าค่านั้นๆ จะต้องการเก็บเอาไว้หรือทิ้ง ผลสุดท้ายของ filter จะ return array ที่เหลือแต่ค่าที่เลือกเก็บเท่านั้น

#### **_Array.prototype.reduce()_**

reduce method จะทำหน้าที่ _reduce_ ทุกค่าใน array โดยมันจะวนรอบ (iterate) ค่าทั้งหมดให้กลายเหลือเป็นค่าเดียว โดยวิธีการประกอบค่าต่างๆ ยังไงอยู่ที่เรากำหนดในฟังก์ชั่น

```js
const sum = numbers.reduce(
  function (acc, n) {
    return acc + n;
  },
  0 // ตัวสะสมค่าตัวแปรสำหรับการวนลูปรอบแรก
);

console.log(sum); //21
```

เหมือนกับ method ของ .map และ .filter เพียงแต่ว่า .reduce จะนำค่าที่ได้จากรอบก่อนหน้ามาส่งต่อเป็น parameter แรกของฟังก์ชั่น

มาดูความแตกต่าง:

- .reduce รับ parameter สองตัว

parameter แรกจะเป็นฟังก์ชั่นสำหรับการวนรอบ (itelation)

parameter ที่สองจะเป็นค่าตัวแปรสะสม (ในที่นี้หมายถึง _acc_) สำหรับการวนรอบรอบแรก (คำข้อถัดไปจะมีอธิบายว่าทำไมต้องมี)

- Parameters ของฟังก์ชั่น

ฟังก์ชั่นที่ส่งเข้าไปใน parameter แรกของ .reduce จะได้รับ parameter ทั้งหมด 2 ตัว โดยตัวแรก (ในที่นี้คือ _acc_) คือตัวแปรสะสม ในขณะที่ตัวแปรที่สอง (_n_) คือค่าปัจจุบันของรอบลูปนั้นๆ

ตัวแปรสะสมจะเท่ากับค่าที่ return ในฟังก์ชั่นของการวนรอบ (iteration) ก่อนหน้า ในการวนรอบแรก _acc_ จะมีค่าเท่ากับค่าที่คุณส่งเป็น parameter ที่สองให้กับ .reduce นั่นเลยจำเป็นต้องโยนค่า 0 เข้าไปเป็น parameter ที่สองของ reduce นั่นเอง

##### ในการวนรอบรอบแรก

`acc = 0` เพราะเราส่งค่า 0 เป็น parameter ที่สองให้กับ reduce

`n = 0` ค่าแรกของ array ที่เก็บ _ตัวเลข_

ฟังก์ชั่นจะ returns _acc_ + _n_ --> 0 + 0 --> 0

##### ในการวนรอบรอบที่สอง

`acc = 0` เพราะว่ามันคือค่าที่มาจากการ return ของฟังก์ชั่นในการวนรอบก่อนหน้า

`n = 1` ค่าที่สองของ array ที่เก็บ _ตัวเลข_

ฟังก์ชั่นจะ returns _acc_ + _n_ --> 0 + 1 --> 1

##### ในการวนรอบรอบที่สาม

`acc = 1` เพราะว่ามันคือค่าที่มาจากการ return ของฟังก์ชั่นในการวนรอบก่อนหน้า

`n = 2` ค่าที่สามของ array ที่เก็บ _ตัวเลข_

ฟังก์ชั่นจะ returns _acc_ + _n_ --> 1 + 2 --> 3

##### ในการวนรอบรอบที่สี่

`acc = 3` เพราะว่ามันคือค่าที่มาจากการ return ของฟังก์ชั่นในการวนรอบก่อนหน้า

`n = 3` ค่าที่สี่ของ array ที่เก็บ _ตัวเลข_

ฟังก์ชั่นจะ returns _acc_ + _n_ --> 3 + 3 --> 6

##### [...] ในการวนรอบสุดท้าย

`acc = 15` เพราะว่ามันคือค่าที่มาจากการ return ของฟังก์ชั่นในการวนรอบก่อนหน้า

`n = 6` ค่าสุดท้ายของ array ที่เก็บ _ตัวเลข_

ฟังก์ชั่นจะ returns _acc_ + _n_ --> 15 + 6 --> 21

ในการวนรอบสุดท้าย **.reduce** จะคืนค่า 21 กลับไป

#### **_Array.prototype.find()_**

```js
const array1 = [5, 12, 8, 130, 44];

const found = array1.find((element) => element > 10);

console.log(found);
// expected output: 12
```

#### ข้อมูลเพิ่มเติมภายนอก

- [Understanding map / filter / reduce in JS](https://hackernoon.com/understanding-map-filter-and-reduce-in-javascript-5df1c7eee464)

---

### Higher Order Functions

คือการที่ Function สามารถรับ Input เป็น Function และ/หรือ Return Output เป็น Function ได้

ซึ่งปกติเราจะคิดว่า Input ก็คือ Value จาก Type นึง และ Output ก็เป็น Value ที่อาจจะมี Type เดียวกับ Input หรือต่าง Type กัน

เช่น

```javascript
function Square(n) {
  return n * n;
} // รับ input เป็น number และ return output เป็น number
```

และ

```javascript
function isOdd(n) {
  return n % 2 === 1;
} // รับ input เป็น number และ return output เป็น boolean
```

แต่หากเราต้องการ function ในการหาเลขคู่ ปกติเราจะทำแบบ

```javascript
function isEven(n) {
  return n % 2 === 0;
} // รับ input เป็น number และ return output เป็น boolean
```

หรือ

```javascript
function isEven(n) {
  return !isOdd(n);
}
```

แต่ถ้าเขียนในรูปแบบ Higher Order Functions

```javascript
function not(fn) {
  return function negated(..args) {
    return !fn(…args)
  }
}

const isEven = not(isOdd)
isEven(4) // true
```

---

### JavaScript Library [Moment, Lodash]

#### **_Moment_**

เป็น library ไว้สำหรับจัดการเรื่อง date & time ใน javascript สามารถศึกษาเพิ่มเติมได้ที่ `https://momentjs.com/`

#### **_Lodash_**

เป็น library ช่วยในเรื่องการจัดการจิปาถะอย่าง กรองข้อมูล, เรียงลำดับ, หาค่ามาก ค่าน้อย, หา item จาก array หรือ object, เอาเฉพาะค่าแรก ค่าสุดท้าย และอื่น ๆ อีกมากมาย จะช่วยทุ่นเวลาไปได้มาก สามารถศึกษาเพิ่มเติมได้ที่ `https://lodash.com/docs/4.17.15`

---

## ReactJS

ก่อนเข้าเนื้อหา React เรามาทำความรู้จักกับ UI Components ที่น้องเดียร์ `Thawatchai Kuansombat` React Master ของเราได้ทำไว้ให้เราใช้

[React UI Components](https://glud-component.vercel.app/)

---

## React Template

1. Download
2. unzip
3. install node module ด้วยคำสั่ง

```sh
npm install
#or
yarn install
```
