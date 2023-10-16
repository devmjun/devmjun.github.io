---
layout:     post
title:      "Swift. 정리하기 26"
subtitle:   "Swift Language Reference-Types"
date:       2018-04-15 09:00:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/deer-643340.jpg
thumbnail-img: /assets/post_img/background/deer-643340.jpg
share-img: /assets/post_img/background/deer-643340.jpg
---

## Reference 


[Types](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/doc/uid/TP40014097-CH31-ID445)<br>

---

## Types 

스위프트에는 두가지 종류의 타입이 있습니다: 이름이 있는 타입(named types) 과 복합 타입(compound types) 이름이 있는 타입은 정의될때 특정 이름을 부여할수 있는 타입입니다. 이름이 있는 타입은 클레스, 구조체, 열거형, 프로토콜을 포함합니다.예를들어 유저가 정의한 클레스 인스턴스는 `MyClass`로 네이밍된것은 `MyClass` 타입을 가집니다.
Swift 표준 라이브러리는 사용자가 정의한 이름이 있는 타입 외에도 배열, 딕셔너리 및 옵셔널 값을 나타내는 타입을 포함하여 일반적으로 많이 사용되는 많은 타입을 정의합니다.

일반적으로 숫자, 문자 및 문자열을 나타내는 타입과 같이 일반적으로 다른 언어에서 기본 또는 기본으로 간주되는 데이터 타입은 구조체를 사용하여 Swift 표준 라이브러리에서 정의되고 구현된 실제로 명명된 타입입니다. 왜냐하면 이름이 있는 타입이기 때문에, [확장(Extension)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Extensions.html#//apple_ref/doc/uid/TP40014097-CH24-ID151) 과 [확장 선언(Extension Declaration)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID378) 에서 논의된 확장 선언을 사용하여 필요에 맞게 행동을 확장할수 있습니다. 

`복합 타입(compound type)`는 이름이 없고, Swift언어 자체에서 정의됩니다. 거기에는 두가지 복합 유형이 있습니다 : 함수 타입(function types) 와 튜플 타입(tuple types)이 있습니다. 복합 타입은 이름이 있는 타입과 복합타입이 포함될수 있습니다. 예를들어 튜플 타입 `(Int, (Int, Int))`는 두개의 요소를 포함합니다 : 첫번째는 이름이 있는 Int 타입 그리고 두번째는 다른 `(Int, Int) `복합 타입 입니다.

이름이 있는 타입과(named type) 복합 타입(compound type)을 괄호로 묶을수 있습니다. 그러나 하나의 타입에 괄호를 추가해도 아무런 효과가 없습니다 예를들어 `(Int)` 는 `Int`와 같습니다.

이 장에서는 Swift언어 자체에 정의된 타입에 대해 설명하고 Swift의 타입유추 동작에 대해서 설명합니다. 

---

## Optional Type

Swift 언어는 후위표기(postfix) `?`를 Optional<Wrapped> 정의된 이름이 있는 타입의 구문으로 정의합니다. 다음 두 선언은 동일합니다.

```swift
var optionalInteger: Int?
var optionalInteger: Optional<Int>
```

Optional Type 인스턴스에 값이 포함되어 있는 경우 `!`접미사 연산자를 사용하여 해당 값에 접근할수 있습니다.

```swift
optionalInteger = 42
optionalInteger! // 42
```

더 자세한 내용은 [Optional](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID330)을 참조하세요

---

## Implicitly Unwrapped Optional Type

암시적 언랩핑(Implicitly Unwrapped)은 해당 타입을 포함을하는 선언의 의미를 변경하기 때문에 튜플 타입 또는 제네릭 타입의 중첩된 옵셔널 타입(딕셔너리 또는 배열 요소 타입)은 암시적으로 언랩핑된것으로 표시할수 없습니다.

```swift
let tupleOfImplicitlyUnwrappedElements: (Int!, Int!)  // Error
let implicitlyUnwrappedTuple: (Int, Int)!             // OK
 
let arrayOfImplicitlyUnwrappedElements: [Int!]        // Error
let implicitlyUnwrappedArray: [Int]!                  // OK
```

더 자세한건 [Implicity Unwrapped Optionals](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID334)을 참조해주세요 

---


