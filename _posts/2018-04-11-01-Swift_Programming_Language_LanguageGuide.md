---
layout:     post
title:      "Swift. 정리하기 1"
subtitle:   "Swift Language Guide-Basics"
date:       2018-04-11 16:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

[The Basics](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID309)

## Type Annotations

상수 또는 변수를 선언할때 `Type Annotation`을 제공하고 상수 또는 변수에 저장하는 값의 종류를 명확하게 설명할수 있습니다. 

```swift
var welcomeMessage: String
```

선언은 "...of type ..." 의미하고 아래 다음과 같이 읽을수 있습니다.

"String 타입이라는 welcomeMessage을 선언합니다."

```swift
welcomeMessage = "Hello"
var red, green, blue: Double
```

---

## Optionals 

`optionals`은 값이 있거나 없는 상황을 나타냅니다. 

> The concept of optionals doesn’t exist in C or Objective-C. The nearest thing in Objective-C is the ability to return nil from a method that would otherwise return an object, with nil meaning “the absence of a valid object.” However, this only works for objects—it doesn’t work for structures, basic C types, or enumeration values. For these types, Objective-C methods typically return a special value (such as NSNotFound) to indicate the absence of a value. This approach assumes that the method’s caller knows there’s a special value to test against and remembers to check for it. Swift’s optionals let you indicate the absence of a value for any type at all, without the need for special constants.

#### nil 

옵셔널 변수에 값을 할당하여 값이 없는 상태로 설정합니다.

```swift
var serverResponseCode: Int? = 404
// serverResponseCode contains an actual Int value of 404
serverResponseCode = nil
// serverResponseCode now contains no value
```

> Note: 옵셔널이 아닌 상수및 변수에는 nil을 할당할수 없습니다. 

기본값을 제공하지 않고 옵셔널 변수를 정의하면 자동으로 다음과 같이 설정됩니다. nil

```swift
var surveyAnswer: String?
// surveyAnswer is automatically set to nil
```

> Note: Swift의 nil 과 Objective-C의 nil은 같지 않습니다. Objective-C에서 nil은 존재하지 않는 객체에 대한 포인터 입니다. Swift에서의 nil은 포인터가 아닙니다. 특정 유형의 값이 없는 것입니다. 

---

## Optional binding 

Optional binding을 사용하여 요소에 값이 들어있는지 여부를 확인하고, 그렇다면 값을 임시 상수 또는 변수로 사용할수 이씃ㅂ니다.

```swift
if let [constantName] = [someOptional] {
    [statements]
}
```

#### - 예제

```swift
// 1
if let actualNumber = Int(possibleNumber) {
    print("\"\(possibleNumber)\" has an integer value of \(actualNumber)")
} else {
    print("\"\(possibleNumber)\" could not be converted to an integer")
}
// Prints ""123" has an integer value of 123"


// 2 
if let firstNumber = Int("4"), let secondNumber = Int("42"), firstNumber < secondNumber && secondNumber < 100 {
    print("\(firstNumber) < \(secondNumber) < 100")
}
// Prints "4 < 42 < 100"
 
if let firstNumber = Int("4") {
    if let secondNumber = Int("42") {
        if firstNumber < secondNumber && secondNumber < 100 {
            print("\(firstNumber) < \(secondNumber) < 100")
        }
    }
}
// Prints "4 < 42 < 100"
```

> Note: nil 변수가 나중에 값이 생길 가능성이 있을때 가능하다면 강제 언레핑을 사용하지 마세요. nil 변수의 수명동안 값을 확인해야 하는 경우에는 항상 일반 옵션널 타입을 사용하세요

---

## Error Handling 

Error Handling를 사용하면 프로그램 실행중에 발생할 수 있는 오루 조건에 응답할수 있습니다. 

함수의 성공 또는 실패를 알리는 값의 유무를 사용할수 있는 옵셔널과는 달리 오류 처리를 통해 오류의 근본 원인을 판별하고 필요한 경우 프로그램의 다른 부분으로 오류를 전달할수 있습니다. 

함수가 오류를 만났을때 `Throws` 에러를 사용하면 그 함수의 호출자는 오류를 `Catch`하고 적절하게 응답할수 있습니다. 

```swift
func canThrowAnError() throws {
    // this function may or may not throw an error
}
```

함수는 `thrwos` 키워드를 포함시켜서 오류를 던질수 있음을 나타냅니다. 오류가 발생할 수 있는 함수를 호출할때는 `try`키워드를 표현식앞에 추가합니다.

```swift
do {
    try canThrowAnError()
    // no error was thrown
} catch {
    // an error was thrown
}
```

do 문은 오류가 하나 이상으로 전파될수 있는 새로운 범위를 생성하여 각 오류에 대응할수 있습니다.

```swift
func makeASandwich() throws {
    // ...
}
 
do {
    try makeASandwich()
    eatASandwich()
} catch SandwichError.outOfCleanDishes {
    washDishes()
} catch SandwichError.missingIngredients(let ingredients) {
    buyGroceries(ingredients)
}
```

---
