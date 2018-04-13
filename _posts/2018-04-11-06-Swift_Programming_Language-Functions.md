---
layout:     post
title:      "Swift. 정리하기 6"
subtitle:   "Swift Language Guide-Functions"
date:       2018-04-11 20:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

[Functions](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-ID158)

---

## Functions 

`functions`은 특정 작업을 수행하는 코드가 포함된 자체의 덩어리 입니다. 함수가하는 일을 식별하는 이름을 함수에 부여하고 해당 이름을 함수가 `호출(call)`하여 해당 작업을 수행하는 데 사용 됩니다. 

Swift의 통일된 함수 문법은 매개 변수 이름이 없는 간단한 C 스타일 함수에서 각 매개 변수의 이름 및 인수 레이블이 있는 복잡한 Objective-C 스타일 메서드에 이르기까지 무엇이든 표현할수 있을 정도록 유연합니다. 

매개 변수는 함수 호출을 단순화하기 위해 기본 값을 제공 할수 있으며 함수가 실행을 완료하면 전달 된 변수를 수정하는 `in-out` 매개 변수로 전달 할수있습니다. 

Swift의 모든 함수에는 함수의 매개 변수 타입과 반환 타입으로 구성된 타입이 있습니다. Swift에서는 다른 타입과 마찬가지로 이 타입을 사용할수 있으므로 다른 함수 매개 변수로 함수를 쉽게 전달하고 함수에서 함수를 반환할수 있습니다. 

중첨된 함수 범위 내에서 유용한 기능을 캡슐화 하기 위해 함수를 다른 함수 내에 작성할수 있습니다. 

```swift
func greet(person: String) -> String {
    let greeting = "Hello, " + person + "!"
    return greeting
}
```

`func`키워드로 정의하고 String 타입의 인수를 받아서 String 인수를 반환(`->`)합니다. 

---

## function Parameters and Return Values 

### - Functions Without Parameters 

```swift
func sayHelloWorld() -> String {
    return "hello, world"
}
print(sayHelloWorld())
// Prints "hello, world"
```

### - Functions With Multiple Parameters 

```swift
func greet(person: String, alreadyGreeted: Bool) -> String {
    if alreadyGreeted {
        return greetAgain(person: person)
    } else {
        return greet(person: person)
    }
}
print(greet(person: "Tim", alreadyGreeted: true))
// Prints "Hello again, Tim!"
```

### - Functions Without Value 

```swift
func greet(person: String) {
    print("Hello, \(person)!")
}
greet(person: "Dave")
// Prints "Hello, Dave!"
```

> Note: 엄밀히 말하자면 반환값이 정의 되지 않아도, 여전히 함수는 값을 반환합니다. 리턴 타입이 없는 함수는 타입의 특수값을 반환합니다 `Void` 이것은 단순히 비어 있는 튜플이고 `()` 처럼 쓰여집니다.


함수의 반환값은 호출될때 무시 될 수 있습니다.

```swift
func printAndCount(string: String) -> Int {
    print(string)
    return string.count
}
func printWithoutCounting(string: String) {
    let _ = printAndCount(string: string)
}
printAndCount(string: "hello, world")
// prints "hello, world" and returns a value of 12
printWithoutCounting(string: "hello, world")
// prints "hello, world" but does not return a value
```

> Note: 반환 값을 무시할 수 있지만, 값을 반환한다는 함수는 항상 값을 반환해야 합니다. 정의된 반환 타입이 있는 함수는 값을 반환하지 않고 함수의 맨 아래에서 제어가 벗어 나는것을 허용할 수 없으며 이렇게 하려고하면 컴파일 오류가 발생합니다.

### - Functions with Multiple Return Values 

반환값이 여러개인경우 튜플을 사용하여 반환할수 있습니다. 

```swift
// 1
func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}

// 2 
let bounds = minMax(array: [8, -6, 2, 109, 3, 71])
print("min is \(bounds.min) and max is \(bounds.max)")
// Prints "min is -6 and max is 109"
```

### - Optional Tuple Return Types 

(Int, Int)? 또는 (String, Int, Bool)? 을 반환할수 있습니다. 

> Note: (Int, Int)? 는 (Int?, Int?) 옵셔널 튜플 타입과 다릅니다. 전체의 튜플 값이 옵셔널 인 것과, 튜플의 각 값이 옵셔널인 것은 다릅니다.

```swift
// 1
func minMax(array: [Int]) -> (min: Int, max: Int)? {
    if array.isEmpty { return nil }
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}

// 2
if let bounds = minMax(array: [8, -6, 2, 109, 3, 71]) {
    print("min is \(bounds.min) and max is \(bounds.max)")
}
// Prints "min is -6 and max is 109"
```

---

## Function Argument Labels and Parameter Labels 

```swift
func someFunction(firstParameterName: Int, secondParameterName: Int) {
    // In the function body, firstParameterName and secondParameterName
    // refer to the argument values for the first and second parameters.
}
someFunction(firstParameterName: 1, secondParameterName: 2)
```

### - Specifying Argument Labels

```swift
// 1
func someFunction(argumentLabel parameterName: Int) {
    // In the function body, parameterName refers to the argument value
    // for that parameter.
}

// 2 
func someFunction(argumentLabel1 parameterName: Int) {
    // In the function body, parameterName refers to the argument value
    // for that parameter.
}
```

Argument Label로 인해서, 함수의 이름이 같아도 다른 함수가 될수 있음.

### - Omitting Argument Labels

```swift
func someFunction(_ firstParameterName: Int, secondParameterName: Int) {
    // In the function body, firstParameterName and secondParameterName
    // refer to the argument values for the first and second parameters.
}
someFunction(1, secondParameterName: 2)
```

### - Default Parameter Values

```swift
func someFunction(parameterWithoutDefault: Int, parameterWithDefault: Int = 12) {
    // If you omit the second argument when calling this function, then
    // the value of parameterWithDefault is 12 inside the function body.
}
someFunction(parameterWithoutDefault: 3, parameterWithDefault: 6) // parameterWithDefault is 6
someFunction(parameterWithoutDefault: 4) // parameterWithDefault is 12
```

### - Variadic Parameters 

```swift
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}
arithmeticMean(1, 2, 3, 4, 5)
// returns 3.0, which is the arithmetic mean of these five numbers
arithmeticMean(3, 8.25, 18.75)
// returns 10.0, which is the arithmetic mean of these three numbers
```

numbers 의 타입이 [Double]로 사용 가능합니다. 

> Note: 함수를 최대 하나의 가변 매개 변수를 가질수 있습니다.

### - in-out Parameters

함수의 매개변수는 기본적으로 `상수(constant)`입니다. 함수의 본문 내에서 함수 매개 변수의 값을 변경하려고 하면 컴파일 오류가 발생합니다. 즉 실수로 매개 변수의 값을 변경할수 없습니다. 

함수가 매개변수의 값을 함수의 생명주기 내에서 수정하기를 원하고 함수 호출이 끝난 후에도 변경 사항을 유지하려면 해당 매개변수를 `in-out`매개 변수로 정의하세요

매개 변수 타입 바로 앞에 `inout` 키워드를 배치하여 in-out 매개 변수를 작성합니다. in-out 파라미터는 함수에서 값을 전달받고, 함수내에서 수정 가능하고, 함수 밖에있는 변수의 값을 변경할수 있습니다. in-out 매개 변수 및 관련 컴파일러 최적화의 동작에 대한 자세한 내용은 [in-Out Parameters](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID545) 를 참조하세요

in-out 매개 변수로 `variable`만 전달할수 있습니다. 상수 및 리터럴(literal)은 수정할수 없기 때문에 상수 또는 리터럴 값을 인수로 전달할 수 없습니다. in-out매개변수에 인수로 전달할때 변수 이름앞에 직접 앰퍼샌드(&)로 두면 함수로 수정할수 있음을 나타냅니다

> Note: in-out 파라미터는 기본값을 가질수 없고, 가변 파라미터(func arithmeticMean(_ numbers: Double...)) 는 `inout`으로 작성할수 없습니다. 

```swift
// 1
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}

// 2
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// Prints "someInt is now 107, and anotherInt is now 3"
```

> 개인 Note: 함수형 패러다임에서는 사용하지 말아야하는녀석...

---

## Function Types 

모든 함수는 `function type`를 가지고, parameter type과 함수의 retrun 타입을 가집니다.

```swift
// 1
func addTwoInts(_ a: Int, _ b: Int) -> Int {
    return a + b
}
func multiplyTwoInts(_ a: Int, _ b: Int) -> Int {
    return a * b
}

// 2
func printHelloWorld() {
    print("hello, world")
}

// 3
func printHelloWorld() {
    print("hello, world")
}
```

`1` 과 `2`에 정의 된 함수의 타입은 (Int, Int) -> Int 로 같은 함수의 타입입니다. `3`에 정의된 함수의 타입은 `() -> Void` 입니다. 매개변수가 없고 반환하는 함수는 `Void`입니다. 

### - Using Function Types 

Swift에서 다른 타입과 마찬가지고 함수 타입을 사용합니다. 예를 들어 상수 또는 변수에 함수 타입으로 정의하고 해당 함수에 적절한 함수를 할당 할 수 있습니다.

```swift
// 1
var mathFunction: (Int, Int) -> Int = addTwoInts

// 2
print("Result: \(mathFunction(2, 3))")
// Prints "Result: 5"

// 3
mathFunction = multiplyTwoInts
print("Result: \(mathFunction(2, 3))")
// Prints "Result: 6"
```

다른 타입과 마찬가지고 함수를 상수 또는 변수에 할당할때 타입 추론이 가능합니다.

```swift
let anotherMathFunction = addTwoInts
// anotherMathFunction is inferred to be of type (Int, Int) -> Int
```

### - Function Types as Parameter Types 

```swift
func printMathResult(_ mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {
    print("Result: \(mathFunction(a, b))")
}
printMathResult(addTwoInts, 3, 5)
// Prints "Result: 8"
```

### - Function Types as Return Types 

다른함수의 반환 타입으로 함수의 타입을 사용할수 있습니다. 반환하는 함수의 `->` 반환 이후에 즉각적으로 연산되어 쓰여진것에 의해서 사용할수 있습니다. 

```swift
// 1 
func stepForward(_ input: Int) -> Int {
    return input + 1
}
func stepBackward(_ input: Int) -> Int {
    return input - 1
}

// 2 
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    return backward ? stepBackward : stepForward
}

// 3 
var currentValue = 3
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero now refers to the stepBackward() function
```

### Nested Functions 

지금까지 이 장에서 만난 함수들은 `global functions`의 예이고, 함수의 본문안에서만 작동하는 `nested functions` 를 알아봅니다.

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    func stepForward(input: Int) -> Int { return input + 1 }
    func stepBackward(input: Int) -> Int { return input - 1 }
    return backward ? stepBackward : stepForward
}
var currentValue = -4
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero now refers to the nested stepForward() function
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// -4...
// -3...
// -2...
// -1...
// zero!
```

---











