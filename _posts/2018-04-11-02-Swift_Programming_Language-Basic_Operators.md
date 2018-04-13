---
layout:     post
title:      "Swift. 정리하기 2"
subtitle:   "Swift Language Guide-Basic Operators"
date:       2018-04-11 17:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Ternary Conditional Operator

문법 

```swift
question ? answer1 : answer2
```

---

## nil Coalescing Operator

`nil-coalescing operators(a ?? b)` obtional a 를 unwraps 합니다. a가 nil 이라면 만약 값을 포함하고 있거나, 기본값으로 b를 반환하면 입니다. 이 식에서 a는 항상 옵셔널 타입입니다. 이 식에서 `b`의 타입은 저장된 a와 같습니다. 

nil-coalescing 연산자는 code below에서 약칭입니다.

```swift
a != nil ? a! : b
```

> Note: 만약 a의 값이 nil이 아니면 b의 값은 연산되지 않습니다. 이것은 `short-circuit evalutation` 이라고합니다. 

아래의 예제를 확인합니다.

```swift
let defaultColorName = "red"
var userDefinedColorName: String?   // defaults to nil
 
var colorNameToUse = userDefinedColorName ?? defaultColorName
// userDefinedColorName is nil, so colorNameToUse is set to the default of "red"
```

---

## Range Operators 

Swift에는 범위의 값을 표현하기 위한 여러가지 `Range Operators`가 있습니다.

### - Closed Range Operators 

`(a...b)`

```swift
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
```

### - Half-Open Range Operators 

`a..<b`

```swift
let names = ["Anna", "Alex", "Brian", "Jack"]
let count = names.count
for i in 0..<count {
    print("Person \(i + 1) is called \(names[i])")
}
// Person 1 is called Anna
// Person 2 is called Alex
// Person 3 is called Brian
// Person 4 is called Jack
```

### - One-Sided Ranges 

```swift
// 1
for name in names[2...] {
    print(name)
}
// Brian
// Jack
 
for name in names[...2] {
    print(name)
}
// Anna
// Alex
// Brian

// 2 
for name in names[..<2] {
    print(name)
}
// Anna
// Alex

// 3 
let range = ...5
range.contains(7)   // false
range.contains(4)   // true
range.contains(-1)  // true
```

---

## Reference 

[Basic Operators](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-ID60)
