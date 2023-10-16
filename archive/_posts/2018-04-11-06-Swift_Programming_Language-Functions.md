---
layout:     post
title:      "Swift. 정리하기 6: Swift Language Guide-Functions"
subtitle:   "Swift Language Guide-Functions *"
date:       2018-04-11 20:35:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/secret-3120483.jpg
thumbnail-img: /assets/post_img/background/secret-3120483.jpg
share-img: /assets/post_img/background/secret-3120483.jpg
---

최종 수정일: 2018.10.1

## Refernece 

까칠코더님의 글을 그대로 가져 왔습니다. 원 자료의 주소는 아래에 있습니다.

[Functions](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-ID158)<br>
[Functions](http://kka7.tistory.com/112?category=919617)<br>

---

## Functions 

`함수(Functions)`는 특정 작업을 수행하는 자체적으로 포함된(self-contained) 코드 덩어리(chunks) 입니다. 함수가 무엇을 하는지 식별가능한 이름을 주고, 이러한 이름은 필요할때 작업을 수행하기 위해 호출(call)하여 사용됩니다.

Swift의 통일된(unified) 함수 문법은 매개변수 이름 없는 간단한 C스타일의 함수부터 각 매개변수에 대한 이름과 인자 라벨이 있는 복잡한 `Objective-C` 스타일의 메소드까지 무엇이든지 표현할수 있을만큼 충분히 유연합니다. 함수 호출을 간단히하기 위해 매개변수는 기본 값을 제공할 수 있고 함수 실행이 완료되면 한번 전달된 변수를 수정하는 `in-out` 매개변수처럼 전달할수 있습니다.

Swift에 있는 모든 함수는 타입을 가지며, 함수의 매개변수 타입과 반환 타입으로 구성되어 있습니다. Swift에 있는 다른 모든 타입과 같이 함수를 매개변수로 다른 함수에 쉽게 전달할 수있고, 함수로부터 반환되는 함수 타입을 사용할 수 있습니다. 또한, 함수는 중첩된 함수 범위 내에 함수를 캡슐화하기 위해서 다른 함수안으로 함수를 만들 수 있습니다.

---

## Defaining and Calling Functions

함수를 정의할때, 함수에 입력 하는 것처럼 하나 이상의 지정된 이름과 입력된(`typed`) 값을 지정할 수 있으며, 이를 매개변수(`parameters`)라고 합니다. 함수가 종료할때 출력으로 다시 전달하는 값의 타입을 정의할수 있으며, 이를 반환 타입(`return type`)이라고 합니다.

함수는 언제나 함수가 수행하는 작업을 설명하는 `함수 이름(function name)`을 가집니다. 함수 사용하기 위해, 이름과 함수의 매개변수의 타입과 같은 입력 값(인자(`arguments`))를 전달하여 함수를 호출(call)합니다. 함수의 인자는 반드시 함수의 매개변수 목록과 같은 순서로 제공되어야 합니다.

아래 예제에서 사람의 이름을 입력받고 그 사람에 대한 인사말을 반환하는 일을 하는 함수는 `great(person:)`을 호출합니다. 이를 수행하기(`accomplish`) 위해 하나의 입력 매개변수-`person`이라는 `String` 값-와 사람에 대한 인사말을 포함한 `String`타입을 반환하도록 정의합니다.

```swift
func greet(person: String) -> String {
    let greeting = "Hello, " + person + "!"
    return greeting
}
```

이러한 모든 정보는 `func` 키워드를 접두사로 붙인 `함수의 정의(definition)`에서 드러납니다(rolled up). `함수의 반환 타입 return arraw ->(하이픈과 오른쪽 꺽쇠)` 은 뒤에 반환할 타입의 이름을 가리킵니다.

정의에는 함수가 무엇을하는지, 반환받을 것으로 예상하는 것과 완료할때 반환하는 것이 무엇인지를 설명합니다. 이러한 정의는 코드의 다른 곳에서 함수를 모호하지 않고(unambiguously) 쉽게 호출하게 해줍니다.

```swift
print(greet(person: "Anna"))
// Prints "Hello, Anna!"
print(greet(person: "Brian"))
// Prints "Hello, Brian!"
```

`greet(person: "Anna")` 처럼, person인자(argument) 라벨 뒤에 String값을 전달하여 great(person:) 함수를 호출합니다. 함수는 String값을 반환하기 때문에, 위에서 보는 것처럼 문자열을 출력하고 반환값을 볼수 있도록, `print(_:separator:terminator:)` 함수로 감싸서`(wrapped)` 호출 할 수 있습니다.

> Note: `print(_:separator:terminator:)` 함수는 첫번째 인자에 대한 라벨을 가지지 않고, 다른 인자는 기본 값을 가지고 있기 때문에 선택할수 있습니다. 함수 문법에서의 이러한 변형은 아래에 있는 [함수 인자 라벨과 매개변수 이름(Function Argument Labels and Parameter Names)와 기본 매개변수 값(Default Parameter Values)](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#ID166) 에서 설명되어 있습니다.

`great(person:)`함수 본문은 새로운 String 상수 greeting의 정의로 시작하고, 간단한 인사말 메시지로 설정합니다. 이 인사말(greeting)은 return 키워드를 사용하여 함수의 바깥으로 다시 전달 됩니다. `return greeting` 코드가 있는 줄에서, 함수 실행이 종료되고 greeting의 현재 값을 반환합니다.

다른 입력값으로 `greet(person:)` 함수를 여러번 호출할 수 있습니다. 위의 예제는 "Anna"과 "Brian" 입력값으로 호출했을때 무슨 일이 일어나는지 보여줍니다. 이 함수는 각 경우에 꼭맞는(tailored) 인사말을 반환합니다.

함수의 본문을 더 짧게 만드려면, 메시지를 만들고 반환하는 구문을 한줄로 조합할 수 있습니다.

```swift
func greetAgain(person: String) -> String {
    return "Hello again, " + person + "!"
}
print(greetAgain(person: "Anna"))
// Prints "Hello again, Anna!"
```

---

## function Parameters and Return Values 

Swift에서 함수 `매개변수`와 `반환값은` 매우(extremely) 유연(flexible)합니다. 이름 없는 매개변수 하나로된 간단한 유틸리티 함수부터 매개변수 이름과 다른 매개변수 옵션 표현으로된 복잡한 함수까지 무엇이든 정의 할 수 있습니다.

```swift
func sayHelloWorld() -> String { 
	return "hello, world" 
	} 
print(sayHelloWorld()) // Prints "hello, world"
```

### Functions Without Parameters 

함수는 입력 매개변수 정의가 필요하지 않습니다. 여기에서 호출할때마다 String 메시지를 반환하는 함수는 입력 매개변수가 없습니다.


```swift
func sayHelloWorld() -> String {
    return "hello, world"
}
print(sayHelloWorld())
// Prints "hello, world"
```

함수 정의에는 매개변수가 없더라도 여전히 함수의 이름 뒤에 괄호(`()`)가 필요합니다. 함수가 호출될때 함수 이름 뒤에 빈 괄호쌍(`()`)이 옵니다.

### Functions With Multiple Parameters 

함수는 함수의 괄호 안에, 콤마로 구분된, 여러개의 입력 매개변수를 가질수 있습니다.

이 함수는 사람의 이름과 입력된 인사말을 이미 가지고 있는지에 대한 입력을 받고, 그 사람에 대해 적절한(appropriate) 인사말을 반환합니다

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

`person`라벨인 `String`인자값과 `alreadyGreeted` 라벨인 Bool 인자 값 두개를 괄호 안에 콤마로 구분시켜 전달하는`greet(person:alreadyGreeted:)` 함수를 호출합니다. 이 함수는 이전 섹션에서의 `greet(person:)` 함수와는 별개의(distinct) 것임을 주의합니다. 비록 두 함수가 greet로 시작하는 이름을 가지지만, `greet(person:alreadyGreeted:)`함수는 두개의 인자를 가지지만, `greet(person:)`함수는 하나만 가집니다.



### Functions Without Value 

함수는 반환 타입을 정의할 필요가 없습니다. 다음은 `String` 값을 반환하는 대신에 출력하는 `greet(person:)` 함수 버젼입니다.

```swift
func greet(person: String) {
    print("Hello, \(person)!")
}
greet(person: "Dave")
// Prints "Hello, Dave!"
```

반환 값이 필요하지 않기 때문에, 그 함수는 `반환 화살표(->)` 또는 반환 타입이 포함되지 않도록 정의 있습니다.

> Note: 엄밀히(Strictly) 말하면, 이 `greet(person:)` 함수 버전은 반환 값이 정의되어 있지 않은 경우에도 값을 반환합니다. 반환 타입 정의가 없는 함수는 특별한 `Void`타입의 값을 반환합니다. 이는 `()`으로 작성된 `빈 튜플`과 비슷합니다.

함수의 반환 값은 호출될때 무시될 수 있습니다.


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

첫번째 함수, `printAndCount(string:)`는 문자열을 출력하고 Int인 문자 갯수를 반환합니다. 두번재 함수, `printWithoutCounting(string:)`은 첫번째 함수를 호출하지만, 반환값은 무시합니다. 두번째 함수가 호출될때, 메시지는 첫번째 함수에 의해 여전히 출력되지만, 반환된 값은 사용되지 않습니다.

> Note: 반환 값은 무시될수 있지만, 함수는 언제나 값을 반환 할 것입니다. 반환 타입이 정의된 함수는 값을 반환하지 않고 함수의 아래로 제어가 넘어가는 것을 허용할 수 없고, 이렇게 하려고 하면, 컴파일 오류가 발생합니다.


---

## Functions with Multiple Return Values 

여러개의 값을 하나의 합성된 값으로 반환하기 위해, 함수의 반환 값을 튜플(tuple) 타입으로 사용할 수 있습니다.

아래 예제에서 Int 값을 가지는 배열내에서 가장 작고 가장 큰 숫자를 찾기 위한 `minMax(array:)`함수를 정의하였습니다.


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
```
`minMax(array:)` 함수는 두개의 `Int`값을 포함하는 튜플을 반환합니다. 이러한 값들은 `min`과 `max`로 라벨붙어 있어서 함수의 반환 값을 조회할때 이름으로 사용할 수 있습니다.

`minMax(array:)` 함수의 본문은 currentMin과 currentMax 두개의 변수에 배열의 첫번째 정수 값을 설정하는 것으로 시작합니다. 그리고 나서 이 함수는 배열의 남은 값들을 반복하고 각 값이 currentMin과 currentMax 값보다 작거나 큰지를 각기(respectively) 확인 합니다. 마지막으로, 전체 최소값과 최대값은 두개의 Int 값으로 된 튜플(tuple)으로 반환됩니다.

튜플의 멤버 값은 함수의 반환타입의 일부분으로 이름지어졌기 때문에, 최소와 최대값을 가져오기 위해서 점(.)문법으로 사용할 수 있습니다.


```swift
if let bounds = minMax(array: [8, -6, 2, 109, 3, 71]) {
    print("min is \(bounds.min) and max is \(bounds.max)")
}
// Prints "min is -6 and max is 109"
```

튜플(tuple) 멤버의 이름들은 이미 함수의 반환 타입의 일부로 지정되었기 때문에, 튜플의 멤버들을 튜플이 함수에서 반환되는 시점에 이름을 지정할 필요가 없는 것을 주의하세요.

### Optional Tuple Return Types

튜플 타입이 함수로부터 반환되는 경우에 전체 튜플이 값 없음(no value)일 가능성이 있으며, 전체 튜플이 `nil`이 될수 있다는 사실을 반영하기 위해, `옵셔널(optional)` 튜플 반환 타입을 사용할 수 있습니다. `(Int, Int)?` 또는 `(String, Int, Bool)?` 처럼, 옵셔널 튜플 반환 타입을 튜플 타입의 닫힌 괄호(`)`) 뒤에 물음표(`?`)를 붙여서 작성합니다.

> Note: `(Int, Int)?`와 같은 옵셔널 튜플 타입은 `(Int?, Int?)`처럼 옵셔털 타입을 포함한 튜플과는 다릅니다. 옵셔널 튜플 타입은, 전체 튜플이 옵셔널이며, 튜플내에 각각의 값은 아닙니다.

위의 `minMax(array:)` 함수는 두개의 Int값을 포함하는 튜플을 반환합니다. 하지만, 그 함수는 전달된 배열이 안전한지 확인하지 않습니다. 위에서 정의된 `minMax(array:)` 함수의, `array` 인자에 빈 배열이 포함된 경우에, `array[0]`에 접근을 시도할때 런타임 오류가 발생할 것입니다.

빈 배열을 안전하게 사용하기위해, `minMax(array:)` 함수를 옵셔널 튜플 반환 타입으로 작성하고 배열이 비어 있을때 `nil`값을 반환합니다.

```swift
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
```

이 버젼의 `minMax(array:)` 함수가 실제 튜플 값이나 nil을 반환하는지 확인하기 위해 옵셔널 바인딩을 사용할 수 있습니다.

```swift
if let bounds = minMax(array: [8, -6, 2, 109, 3, 71]) {
    print("min is \(bounds.min) and max is \(bounds.max)")
}
// Prints "min is -6 and max is 109"
```


---

## Function Argument Labels and Parameter Labels 

각 함수 매개변수는 `인자 라벨(argument label)`과 `매개변수 이름(parameter name)`을 가집니다. 함수를 호출할때 인자 라벨은 사용됩니다. 각 인자는 호출하는 함수에서 인자 라벨 앞에 작성됩니다. 매개변수 이름은 함수의 구현에서 사용됩니다. 기본적으로, 매개변수는 매개변수 이름(parameter name)을 인자 라벨(argument label)로 사용합니다.

```swift
func someFunction(firstParameterName: Int, secondParameterName: Int) {
    // In the function body, firstParameterName and secondParameterName
    // refer to the argument values for the first and second parameters.
}
someFunction(firstParameterName: 1, secondParameterName: 2)
```

모든 배개변수는 반드시 고유한 이름을 가집니다. 비록 여러개의 매개변수가 동일한 인자 라벨을 가지는 것이 가능하더라도, 고유한 인자 라벨은 코드를 보다 쉽게 읽을수 있도록 해줍니다.

### Specifying Argument Labels

매개변수 이름(parameter name) 앞에 공백으로 구분하여, 인자 라벨(argument label)을 작성합니다.

```swift
// 1
func someFunction(argumentLabel parameterName: Int) {
    // In the function body, parameterName refers to the argument value
    // for that parameter.
}
```

다음은 사람의 이름과 거주지(hometown)와 인사말을 가져오는 greet(person:) 함수의 변형입니다.


```swift
func someFunction(argumentLabel1 parameterName: Int) {
    // In the function body, parameterName refers to the argument value
    // for that parameter.
}
```

인자 라벨은 의도적으로 읽기 쉽고 명확한 함수 본문을 제공하면서, 문장과 같은 방식으로, 표현식에서 함수를 호출하여 사용할 수 있습니다.


### Omitting Argument Labels

매개변수에 대한 인자 라벨을 원치않은 경우, 매개변수에 대한 명시적인 인자 라벨 대신에 밑줄(_)로 작성합니다.

```swift
func someFunction(_ firstParameterName: Int, secondParameterName: Int) {
    // In the function body, firstParameterName and secondParameterName
    // refer to the argument values for the first and second parameters.
}
someFunction(1, secondParameterName: 2)
```

매개변수가 인자 라벨을 가지는 경우, 함수를 호출할때 인자는 반드시(must) 라벨이 표시되야 합니다.

### Default Parameter Values

함수에 모든 매개변수에 매개변수의 타입 뒤에 매개변수의 값을 할당해서 `기본 값(default value)`을 정의 할수 있습니다. 기본 값이 정의되면, 함수를 호출할때 매개변수를 생략할 수 있습니다.

```swift
func someFunction(parameterWithoutDefault: Int, parameterWithDefault: Int = 12) {
    // If you omit the second argument when calling this function, then
    // the value of parameterWithDefault is 12 inside the function body.
}
someFunction(parameterWithoutDefault: 3, parameterWithDefault: 6) // parameterWithDefault is 6
someFunction(parameterWithoutDefault: 4) // parameterWithDefault is 12
```

함수의 매개변수 목록의 시작하는 곳에 기본 값이 있는 매개변수 앞에, 기본값이 없는 매개변수를 배치합니다. 기본 값이 없는 매개변수는 일반적으로 함수의 의미상 더 중요합니다 - 기본 매개변수가 생략되었는지와 상관 없이, 같은 함수가 호출되는 것을 쉽게 알수 있도록 먼저 작성합니다.

### Variadic Parameters 

`가변 매개변수(variadic parameter)` 는 0개 이상의 특정 타입의 값을 받아들입니다. 함수가 호출될때 특정 매개변수에 다양한 입력값을 전달할 수 있도록 가변 매개변수를 사용합니다. 매개변수의 타입 이름 뒤에 3개의 점문자(`...`)를 삽입해서 가변 매개변수(variadic parameter)를 작성합니다.

가변 매개변수에 전달된 값들은 함수의 본문에서 적절한 타입의 배열로 사용할 수 있습니다. 예를 들어, `numbers`이름과 `Double... `타입을 가진 가변 매개변수는 함수의 본문에서 `[Double]` 타입의 `numbers`배열 상수로 사용할 수 있습니다.

아래 예제는 숫자 목록의 길이에 대한 `산술적인 평균(arithmetic mean: average)`을 계산합니다.

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

> Note: 함수를 최대 하나의 가변 매개 변수를 가질수 있습니다.

### in-out Parameters

기본적으로 함수의 매개변수는 `상수`입니다. 함수의 본문에서 매개변수의 값을 변경하려고 하면 컴파일 오류가 발생합니다. 이는 실수로 매개변수의 값을 변경할 수 없다는 것을 의미합니다. 함수의 매개변수의 값을 변경하고자 하고, 함수 호출이 끝난뒤에도 유지되길 원한다면, `in-out 매개변수(in-out parameter)`으로 정의 합니다.

`in-out` 매개변수는 `inout`키워드를 매개변수의 타입 바로 앞에 작성합니다. `in-out` 매개변수는 함수에 안쪽(`in`)으로 전달된 값을 가지고 있으며, 함수에서 수정되고, 원래 값을 교체하여 함수의 바깥(out)으로 전달됩니다. in-out 매개변수 동작과 관련된 컴파일러 최적화에 대한 자세한 내용은 [In-Out 매개변수(In-Out Parameters)](https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID545)를 보세요.

in-out 매개변수에 대한 인자를 변수로만 전달할수 있습니다. 상수나 리터럴은 수정될수 없기 때문에, 인자로 상수나 리터럴 값을 전달 할수 없습니다. 함수에서 수정될수 있다는 것을 가리키기 위해서, `in-out` 매개변수에 인자를 전달할때 변수의 이름 앞에 `&`붙입니다.

> Note: `in-out` 매개변수는 기본 값을 가질수 없고, 가변 매개변수는 `inout` 표시를 할수 없습니다.

다음은 `a`와 `b` 두개의 `in-out` 정수형 매개변수를 가지는 `swapTwoInts(_:_:)`함수입니다.



```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

`swapTwoInts(_:_:)` 함수는 단순하게 `b` 값을 `a`값으로, `a`값을 `b`으로 바꿔줍니다. 그 함수는 임시 상수 `temporaryA`에 `a`의 값을 저장하고, `b`의 값을 `a`에 할당하고, `b`에 `temporaryA`를 할당합니다.

이러한 값들을 바꿔주기 위해, `Int` 타입의 변수 두개로 `swapTwoInts(_:_:)` 함수를 호출할수 있습니다. `swapTwoInts(_:_:)` 함수에 전달할때 `someInt`와 `anotherInt`의 앞에 `&`를 붙인다는 것을 기억하세요.

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// Prints "someInt is now 107, and anotherInt is now 3"
```

위 예제는 `someInt`와 `anotherInt`의 원래 값이 함수 밖에서 정의되었더라도, `swapTwoInts(_:_:)` 함수에 의해 수정되는 것을 보여줍니다.

> Note: in-out 매개변수들은 함수로부터 반환되는 값이 같지 않습니다. 위의 `swapTwoInts` 예제는 반환 타입이나 반환 값을 정의하지 않지만, `someInt`와 `anotherInt`의 값을 수정합니다. In-out 매개변수는 함수 본문의 범위위를 벗어나 바깥쪽에도 영향을 줄수 있는 방법중 하나 입니다.


---

## Function Types 

함수는 언제나 특정 `함수 타입(function type)`을 가지며, 함수의 매개변수 타입과 반환타입으로 구성됩니다.

예를 들어:

```swift
func addTwoInts(_ a: Int, _ b: Int) -> Int {
    return a + b
}
func multiplyTwoInts(_ a: Int, _ b: Int) -> Int {
    return a * b
}
```

이 예제는 두개의 수학 함수 `addTwoInts`와 `multiplyTwoInts`를 정의합니다. 이라한 함수들은 각각 두개의 `Int`값과 수학 연산을 수행한 결과인`Int` 값을 반환합니다.

이러한 함수들의 타입은 `(Int, Int) -> Int`입니다. 이것은 함수는 둘다 `Int`타입인 두개의 매개변수를 가지고, Int타입의 값을 반환하는 합니다로 읽을 수 있습니다.

다음은 매개변수가 반환 값이 없는 다른 예제입니다.


```swift
func printHelloWorld() {
    print("hello, world")
}
```

이 함수의 타입은 `() -> Void` 또는 매개변수가 없고 반환 값이 Void인 함수. 입니다.

```swift
func printHelloWorld() {
    print("hello, world")
}
```

`1` 과 `2`에 정의 된 함수의 타입은 (Int, Int) -> Int 로 같은 함수의 타입입니다. `3`에 정의된 함수의 타입은 `() -> Void` 입니다. 매개변수가 없고 반환하는 함수는 `Void`입니다. 

### Using Function Types 

Swift에서 다른 타입과 마찬가지고 함수 타입을 사용합니다. 예를 들어 상수 또는 변수에 함수 타입으로 정의하고 해당 함수에 적절한 함수를 할당 할 수 있습니다.

```swift
var mathFunction: (Int, Int) -> Int = addTwoInts
```

이는 다음처럼 읽을 수 있습니다.

`두개의 Int 값을 가지고, Int값을 반환하는 함수`의 타입인, matchFunction 변수를 정의합니다. 새로운 변수를 addTwoInts 함수를 참조하도록 설정합니다.

`addTwoInt(_:_:)`함수는 `mathFunction`변수와 같은 타입을 가지고, Swift의 타입 확인(type-checker)에 의해 할당이 허용됩니다.

```swift
print("Result: \(mathFunction(2, 3))")
// Prints "Result: 5"
```

함수가 아닌 타입(nonfunction types)과 같은 방법으로, 동일한 타입을 가진 다른 함수를 같은 변수에 할당할 수 있습니다.

```swift
mathFunction = multiplyTwoInts
print("Result: \(mathFunction(2, 3))")
// Prints "Result: 6"
```

다른 타입과 마찬가지고 함수를 상수 또는 변수에 할당할때 타입 추론이 가능합니다.

```swift
let anotherMathFunction = addTwoInts
// anotherMathFunction is inferred to be of type (Int, Int) -> Int
```

### Function Types as Parameter Types 

다른 함수에 매개변수로 `(Int, Int) -> Int`와 같은 함수 타입을 사용할 수 있습나다. 이것은 함수가 호출될때 함수의 호출자에 대한 함수 구현의 일부로 남겨두기 위해 제공하는 것이 가능합니다.

다음은 위의 수학 함수의 결과를 출력하는 예제입니다.

```swift
func printMathResult(_ mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {
    print("Result: \(mathFunction(a, b))")
}
printMathResult(addTwoInts, 3, 5)
// Prints "Result: 8"
```

이것은 3개의 매개변수를 가지는 `printMathResult(_:_:_:)` 함수를 정의하는 예제입니다. 첫번째 매개변수는 `mathFunction`이고 `(Int, Int) -> Int` 타입입니다. 첫번째 매개변수에 인자로 이러한 타압의 함수를 전달 할 수 있습니다. 두번재와 세번재 매개변수는 `a`와 `b`이고, 둘 다 `Int` 타입입니다. 이것들은 제공된 수학 함수에 대해 2개의 입력 값으로 사용됩니다.

`printMathResult(_:_:_:)`가 호출될때, `addTwoInts(_:_:)` 함수와 `3`과 `5` 정수 값들을 전달합니다. 제공된 함수를 `3`과 `5`로 호출하고, 그 결과 `8`을 출력합니다.

`printMathResult(_:_:_:)`의 역할은 적절한 타입의 수학함수를 호출하고 그 결과를 출력합니다. 함수의 실제 구현은 상관 없습니다 - 함수가 올바른 타입이라는 것만 중요합니다. 이것은 `printMathResult(_:_:_:)`가 함수의 호출자에게 타입에 안전한 방식으로 기능의 일부를 전달할 수 있습니다.


### Function Types as Return Types 

다른 함수의 반환타입으로 함수 타입을 사용할 수 있습니다. 반환하는 함수의 반환 화살표(`->`) 바로 뒤에 완전한 함수 타입을 작성하여 이를 수행합니다.

다음 예제는 2개의 함수 `stepForward(_:)`와 `stepBackward(_:)`를 정의하였습니다. `stepForward(_:) `함수는 입력된 값보다 `1` 큰 값을 반환하고, `stepBackward(_:)` 함수는 입력된 값보다 1 적은 값을 반환합니다. 두 함수 모두 `(Int) -> Int` 타입입니다


```swift
// 1 
func stepForward(_ input: Int) -> Int {
    return input + 1
}
func stepBackward(_ input: Int) -> Int {
    return input - 1
}
```

여기에서 호출된 `chooseStepFunction(backward:)` 함수는, `(Int) -> Int`를 반환합니다. `chooseStepFunction(backward:)` 함수는Boolean backward 매개변수를 기반으로, `stepForward(_:)` 함수나 `stepBackward(_:)` 함수를 반환합니다.


```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    return backward ? stepBackward : stepForward
}
```

이제 한 방향이나 다른 방향으로 걸어 갈수 있는 `chooseStepFunction(backward:)` 사용할 수 있습니다.

```swift
var currentValue = 3
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero now refers to the stepBackward() function
```

위의 예제는 `currentValue` 변수가 0에 가까워지게 이동시키기 위해 양수나 음수인지를 결정합니다. currentValue는 초기값 3이며, `currentValue > 0`이 `true`를 반환함을 의미하며, `chooseStepFunction(backward:)`가 `stepBackward(_:)`함수를 반환하게 해줍니다. 반환된 함수의 참조는 `moveNearerToZero` 상수에 저장됩니다.

이제 `moveNearerToZero`는 올바른 함수에 참조하며, 갯수가 `0`이 되는데 사용할 수 있습니다.

```swift
var currentValue = 3
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero now refers to the stepBackward() function
```

위의 예제는 `currentValue` 변수가 `0`에 가까워지게 이동시키기 위해 양수나 음수인지를 결정합니다. `currentValue`는 초기값 `3`이며, `currentValue > 0`이 `true`를 반환함을 의미하며, `chooseStepFunction(backward:)`가 `stepBackward(_:)`함수를 반환하게 해줍니다. 반환된 함수의 참조는 `moveNearerToZero` 상수에 저장됩니다.

이제 `moveNearerToZero`는 올바른 함수에 참조하며, 갯수가 `0`이 되는데 사용할 수 있습니다.

```swift
print("Counting to zero:")
// Counting to zero:
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// 3...
// 2...
// 1...
// zero!
```

---

## Nested Functions 

이 챕터(chapter)에서 봤던 모든 함수들은 전역적으로 정의된 `전역 함수(global functions)`의 예제입니다. 다른 함수의 본문 안쪽에 함수를 정의할수 있고, 이를 `중첩 함수(nested functions)`라고 합니다.

`중첩 함수`는 기본적으로 외부로부터 숨겨지지만, 그것을 감싸고 있는 함수에서는 호출되고 사용될 수 있습니다. 감싸고 있는 함수는 다른 범위에서 중첩 함수가 사용될 수 있도록, 중첩된 함수들 중 하나를 반환 할수 있습니다.

중첩된 함수를 사용하고 반환하도록 위의 `chooseStepFunction(backward:)` 예제를 재작성 할 수 있습니다.

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
