---
layout:     post
title:      "Swift. 정리하기 3"
subtitle:   "Swift Language Guide-Strings and Characters Operators"
date:       2018-04-11 18:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## String and Characters 

`string`는 characters의 연속입니다. 예를들어 "hello, world" or "albatross" 은 Swift의 `String` 타입에 의해서 표시됩니다. String을 포함하는것은 다양한 방법으로 접근할수 있고, `Character` 값의 컬렉션을 포함합니다. 

> Note: Swift의 String 타입은 Foundation NSString 클래스와 연결됩니다. Foundation을 import 했다면 `String`으로 캐스팅없이 NSString 매소드에 접근할수 있습니다.
> 참조: [Working with Cocoa Data Types](https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/WorkingWithCocoaDataTypes.html#//apple_ref/doc/uid/TP40014216-CH6), [Using Swift With Cocoa and Objective-C(Swift 4.1)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/index.html#//apple_ref/doc/uid/TP40014216)

### - Special Characters in String Literals 

- The escaped special characters \0 (null character), \\ (backslash), \t (horizontal tab), \n (line feed), \r (carriage return), \" (double quotation mark) and \' (single quotation mark)

- An arbitrary Unicode scalar, written as \u{n}, where n is a 1–8 digit hexadecimal number with a value equal to a valid Unicode code point (Unicode is discussed in Unicode below)

```swift
let wiseWords = "\"Imagination is more important than knowledge\" - Einstein"
// "Imagination is more important than knowledge" - Einstein
let dollarSign = "\u{24}"        // $,  Unicode scalar U+0024
let blackHeart = "\u{2665}"      // ♥,  Unicode scalar U+2665
let sparklingHeart = "\u{1F496}" // 💖, Unicode scalar U+1F496
```

## Initializing an Empty String 

```swift
var emptyString = ""               // empty string literal
var anotherEmptyString = String()  // initializer syntax
// these two strings are both empty, and are equivalent to each other
```

### - String Mutability 

```swift
var variableString = "Horse"
variableString += " and carriage"
// variableString is now "Horse and carriage"
 
let constantString = "Highlander"
constantString += " and another Highlander"
// this reports a compile-time error - a constant string cannot be modified
```

> Note: 위의 접근 법은 Objective-C 및 Cocoa 문자열 변형과는 다르며 여기서 두개의 클래스`NSString`, `NSMutableString` 중에서 선택하여 문자열이 변형될수 있는지 여부를 나타냅니다. 

---

## Unicode 

`Unicode`는 서로 다른 작성 시스템에서 텍스틑 인코딩, 표현 및 처리하기 위한 국제 표준입니다. Swift의 `String` 및 `Character` 유형은 위 설명의 유니코드를 완벽하게 준수합니다. 

```swift
// 1
let eAcute: Character = "\u{E9}"                         // é
let combinedEAcute: Character = "\u{65}\u{301}"          // e followed by ́
// eAcute is é, combinedEAcute is é

// 2 
let precomposed: Character = "\u{D55C}"                  // 한
let decomposed: Character = "\u{1112}\u{1161}\u{11AB}"   // ᄒ, ᅡ, ᆫ
// precomposed is 한, decomposed is 한

// 3 
let enclosedEAcute: Character = "\u{E9}\u{20DD}"
// enclosedEAcute is é⃝

// 4 
et regionalIndicatorForUS: Character = "\u{1F1FA}\u{1F1F8}"
// regionalIndicatorForUS is 🇺🇸
``` 

### - Counting Characters 

```swift
let unusualMenagerie = "Koala 🐨, Snail 🐌, Penguin 🐧, Dromedary 🐪"
print("unusualMenagerie has \(unusualMenagerie.count) characters")
// Prints "unusualMenagerie has 40 characters"
```

---

## Accessing and Modifying a String 

```swift
// 1
let greeting = "Guten Tag!"
greeting[greeting.startIndex]
// G
greeting[greeting.index(before: greeting.endIndex)]
// !
greeting[greeting.index(after: greeting.startIndex)]
// u
let index = greeting.index(greeting.startIndex, offsetBy: 7)
greeting[index]
// a

// 2
greeting[greeting.endIndex] // Error
greeting.index(after: greeting.endIndex) // Error
```

`indices` 타입을 사용하여 문자열의 개별 문자 인덱스에 엑세스 할수 있습니다.

```swift
for index in greeting.indices {
    print("\(greeting[index]) ", terminator: "")
}
// Prints "G u t e n   T a g ! "
```

> Note: `startIndex` 와 `endIndex` 프로퍼티 그리고 `index(before:)`, `index(after)` 그리고 `index(_:offsetBy:)` 매서드는 `Collection` 프로토콜을 따릅니다. String 뿐만아니라, `Array`, `Dictionary` 그리고 `Set` 도 포함합니다.

### - Inserting and Removing 

`insert(_:at:)`, `insert(contentsof:at:)` 을 사용합니다.

```swift
var welcome = "hello"
welcome.insert("!", at: welcome.endIndex)
// welcome now equals "hello!"
 
welcome.insert(contentsOf: " there", at: welcome.index(before: welcome.endIndex))
// welcome now equals "hello there!"
``` 

`remove(at:)`, `removeSubrange(_:)`

```swift
welcome.remove(at: welcome.index(before: welcome.endIndex))
// welcome now equals "hello there"
 
let range = welcome.index(welcome.endIndex, offsetBy: -6)..<welcome.endIndex
welcome.removeSubrange(range)
// welcome now equals "hello"
```

> 마찬가지로 Collection types들에 사용가능합니다 Array, Dictionary, Set 

---

## SubString 

```swift
let greeting = "Hello, world!"
let index = greeting.index(of: ",") ?? greeting.endIndex
let beginning = greeting[..<index]
// beginning is "Hello"
 
// Convert the result to a String for long-term storage.
let newString = String(beginning)
```

<center><img src="/img/posts/Swift_Programming_Language.png" width="600" height="600"></center> <br> 

> Note: String, Substring은 [<U>StringProtocol</U>](https://developer.apple.com/documentation/swift/stringprotocol)을 준수합니다. 

---

## Comparing String 

```swift
let quotation = "We're a lot alike, you and I."
let sameQuotation = "We're a lot alike, you and I."
if quotation == sameQuotation {
    print("These two strings are considered equal")
}
// Prints "These two strings are considered equal"
```

---

## Prefix and Suffix Equality

문자열에 특정 접미사 또는 접두사가 있는지 확인하려면 `hasPrefix(_:)` 및 `hasSuffix(_:)` 메서드를 호추랗ㅂ니다. 

```swift
let romeoAndJuliet = [
    "Act 1 Scene 1: Verona, A public place",
    "Act 1 Scene 2: Capulet's mansion",
    "Act 1 Scene 3: A room in Capulet's mansion",
    "Act 1 Scene 4: A street outside Capulet's mansion",
    "Act 1 Scene 5: The Great Hall in Capulet's mansion",
    "Act 2 Scene 1: Outside Capulet's mansion",
    "Act 2 Scene 2: Capulet's orchard",
    "Act 2 Scene 3: Outside Friar Lawrence's cell",
    "Act 2 Scene 4: A street in Verona",
    "Act 2 Scene 5: Capulet's mansion",
    "Act 2 Scene 6: Friar Lawrence's cell"
]
```

`hasPrefix(_:)` <br>

```swift
var act1SceneCount = 0
for scene in romeoAndJuliet {
    if scene.hasPrefix("Act 1 ") {
        act1SceneCount += 1
    }
}
print("There are \(act1SceneCount) scenes in Act 1")
// Prints "There are 5 scenes in Act 1"
```

`hasSuffix(_:)`

```swift
var mansionCount = 0
var cellCount = 0
for scene in romeoAndJuliet {
    if scene.hasSuffix("Capulet's mansion") {
        mansionCount += 1
    } else if scene.hasSuffix("Friar Lawrence's cell") {
        cellCount += 1
    }
}
print("\(mansionCount) mansion scenes; \(cellCount) cell scenes")
// Prints "6 mansion scenes; 2 cell scenes"
```

> `hasPreifx(_:)` 및 `hasSuffix(_:)`에 기재된 방법은 각 스트링의 확장 자모 클러스터 사이의 문자별 표준 동등성을 비교하여 수행합니다. [String and Character Equailty](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-ID299)

---

## Reference 

[Strings and Characters](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-ID285)