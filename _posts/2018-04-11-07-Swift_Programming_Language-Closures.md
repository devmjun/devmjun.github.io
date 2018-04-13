---
layout:     post
title:      "Swift. 정리하기 7"
subtitle:   "Swift Language Guide-Closures"
date:       2018-04-11 20:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Closures

`Closures`는 독립적인(self.-contained) 기능의 코드 블럭(blocks)이며, 코드에서 젇날되고 사용 할수 있습니다. Swift에서 클로저는 C, Objective-C의 블럭(blocks)와 다른 프로그래밍 언어세너는 람다(lambda)와 비슷합니다.

`클로저`는 Context에 정의된 모든 상수와 변수를 캡쳐(capture)와 참조 저장(store references) 할수 있습니다. 이것은 이러한 상수와 변수를 클로징(closing over)하는 것으로 알려져 있습니다. Swift는 캡쳐(capturing)하는 모든 메모리를 관리를 처리합니다. 

> NOTE: capturing 개념에 익숙하지 않아도 걱정하지마세요. [Capturing Values](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID103) 에서 자세하게 설명합니다. 

함수에서 소개된 `Global`, `nested functions`은 closures의 특별한 케이스 입니다. `Closures`는 다음의 세개중 하나를 취합니다.

- 전역(Global) 함수는 이름이 있고 값을 캡처하지 않는 클로저 입니다. 
- 중첩(Nested) 함수는 이름을 가지고 있는 클로저 이고, 내부함수(encolsing function)의 값을 캡쳐합니다. 
- 클로저의 표현식은 context주변의 값을 캡쳐할수 있는 간단한 구문으로 작성된 이름없는 클로저 입니다. 

Swift의 클로저 표현식은 혼란없는 구문을 권장하는 최적화를 통해 깨긋하고 명확한 스타일을 유지합니다. 이러한 최적화에는 다음이 포함됩니다. 

- 컨텍스트에서 매개변수 및 반환 값유형 추론
- 단일 표현식 클로저에서 암시적으로 반환 
- 약식 인수(arguments) 이름
- 후행 클로저 구문 

---

## Closure Expressions 

함수에서 소개된 [Nested Functions](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-ID178)은 더큰 함수의 일부로 자체 포함된 코드 블록을 명명하고 정의하는 편리한 방법입니다. 그러나 전체 선언 및 이름없는 함수와 유사한 구문의 짧은 버전을 작성하는것이 유용할때도 있습니다. 이는 하나 이상의 인수로 함수를 사용하는 함수나 메소드로 작업할때 특히 그렇습니다. 

### - the Sorted Method 

`sorted(by:)`는 클로저를 기반으로 작성된 함수 입니다. 아래의 예제를 통해 깔끔해지는 클로저식을 확인합니다.

```swift
// 1
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]

// 2
func backward(_ s1: String, _ s2: String) -> Bool {
    return s1 > s2
}
var reversedNames = names.sorted(by: backward)
// reversedNames is equal to ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

> soted의 파라미터의 타입이 (String, String) -> Bool 

### - Closure Expreesion Syntax 

```swift
{ (parameters) -> return type in
    statements
}
```

Closure의 표현식에 경우 `parameters`는 in-out 매개변수가 될수 있지만 기본값을 가질 수는 없습니다. 다중 매개 변수도 사용 가능함.

```swift
// 1
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})

// 2
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in return s1 > s2 } )
```

### - Inferring Type from Context 

soted 클로저의 파라미터로 함수(따라서 타입 존재)가 전달되기 때문에 Swift는 매개 변수의 유형과 반환하는 값의 타입을 추론할수 있습니다. 

따라서 파라미터의 모든 유형을 추론할수 있기 때문에 반환화살표(`->`)와 매개변수 이름 주변의 괄호도 생략할수 있습니다. 

```swift
reversedNames = names.sorted(by: { s1, s2 in return s1 > s2 } )
```

하지만 코드 독자가 모호하지 않게 생략을 많이 하지 않는게 좋습니다. 

### - Implicit Returns from Single-Expression Closures 

단일 표현식 클로저는 `return` 키워드를 생략하여 반환할수 있습니다.

```swift
reversedNames = names.sorted(by: { s1, s2 in s1 > s2 } )
```

### - Shorthand Argument Names

Swift는 자동적으로 약식 아규먼츠 네임을 인라인 클로저로 제공합니다. 그것은 `$0`, `$1`, `$2`그리고 또다른 이름으로 부터 클로저의 아규먼츠 의 값으로 참조되어 사용합니다.

```swift
reversedNames = names.sorted(by: { $0 > $1 } )
```

> $0, $1은 closure의 첫번째 두번째 String 아규먼츠로 참조됩니다.

### - Operators method 

실제로 클로저 표현식을 저장하는 더 짧은 방법이 있습니다. 2개의 파라미터로 String 타입을 받아서 Boll 값을 반환하는 특별한 하게 구현된 매서드가 있습니다. `greater-than operator (>)` 이것은 `sorted(by:)`와 정확하게 타입이 일치합니다. 그래서 Swift는 string-spectific implementation을 추론하여 사용할수 있습니다.

```swift
reversedNames = names.sorted(by: >)
```

operator method에 대해서 더 알고 싶다면 [Operator Method](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID42)

### - Trailing closures 

함수의 클로저 표현식을 함수의 최종 인수로 전달해야하고 클로저 표현식이 길다면 후행 클로저로 작성하는것이 유용할수 있습니다. 후행 클로저는 함수 호출의 괄호 뒤에 쓰여지는데, 여전히 함수의 인수입니다. 후행 클로저 구문을 사용하면 함수 호출의 일부로 클로저의 인수 레이블을 쓰지 않습니다.

```swift
// 1
func someFunctionThatTakesAClosure(closure: () -> Void) {
    // function body goes here
}
 
// Here's how you call this function without using a trailing closure:
 
someFunctionThatTakesAClosure(closure: {
    // closure's body goes here
})
 
// Here's how you call this function with a trailing closure instead:
 
someFunctionThatTakesAClosure() {
    // trailing closure's body goes here
}

someFunctionThatTakesAClosure {
    // trailing closure's body goes here
}

// 2
func someFunctionThatTakesAClosure1(closure: () -> Void, closure1: () -> Void, closure2: () -> Void) {
        // function body goes here
    }
someFunctionThatTakesAClosure(closure: {
            <#code#>
        },
                                      closure1: {
                                        <#code#>
        }) {
            <#code#>
        }
```

위의 sorted 함수를 후행 클로저로 작성할수 있습니다.

```swift
// 1
reversedNames = names.sorted() { $0 > $1 }

// 2
reversedNames = names.sorted { $0 > $1 }
```

다른 예시

```swift
// 1
let digitNames = [
    0: "Zero", 1: "One", 2: "Two",   3: "Three", 4: "Four",
    5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine"
]
let numbers = [16, 58, 510]


// 2
let strings = numbers.map { (number) -> String in
    var number = number
    var output = ""
    repeat {
        output = digitNames[number % 10]! + output
        number /= 10
    } while number > 0
    return output
}
// strings is inferred to be of type [String]
// its value is ["OneSix", "FiveEight", "FiveOneZero"]
```

---

## Capturing Values 

클로저는 컨텍스트(context) 근처의 정의된 상수 및 변수를 캡처할수 있습니다. 그런 다음 클로저는 상수와 변수를 정의한 원래 범위가 더 이상 존재하지 않더라도 해당 본문 내에서 해당 상수와 변수의 값을 참조하고 수정 할수 있습니다.

Swift에서 값을 캡처 할 수 있는 가장 간단한 클로저 형태는 다른 함수의 본문에 작성된 중첩함수 입니다. 중첩된 함수는 외부 함수의 인수를 캡처 할 수 있으며 외부 함수 내에 정의 된 모든 상수 및 변수도 캡처할수 있습니다.

다음 예제는 `incrementer`라는 중첩된 함수를 포함하는 `makeIncrementer`라는 함수의 예입니다. 중첩된 `incrementer()`함수는 주변 컨텍스트에서 `running Total`과 `amount`의 두 값을 캡처합니다. 값을 캡처후 `incrementer`는 `makeIncrementer`에 의해 호출 될 때마다 `running Total`을 값만큼 증가시키는 클로저로서 반환됩니다.

```swift
func makeIncrementer(forIncrement amount: Int) -> () -> Int {
    var runningTotal = 0
    func incrementer() -> Int {
        runningTotal += amount
        return runningTotal
    }
    return incrementer
}
```

`makeIncrementer`은 () -> Int 타입을 반환합니다. 이것은 단순한 값보다는 `함수(function)`를 반환한다는 의미입니다. 이 함수는 매개 변수 없이 반환하고, 호출될때마다 `Int` 값을 반환합니다. 함수가 다른 함수를 반환하는 방법을 배우려면 [반환 타입으로 사용하는 함수 타입(Function Types as Return Types)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-ID177) 을 참조하세요. 

`makeIncrementer(forIncrement:)`함수를 현재 실행중에 증가하는(incrementer) 값의 합계를 저장하고 반환하기 위해 정수형 변수 `runningTotal`을 정의합니다. 이 변수는 `0`의 값으로 초기화 됩니다.

`makeIncrementer(forIncrement:)` 함수는 `forIncrement`인자 라벨과 이름이 `amount`인 하나의 Int 매개변수를 가집니다. 그 인자값은 반환된 `incrementer` 함수가 호출될때마다 얼마만큼 `runningTotal`을 증가시킬지 지정하기 위해 매개변수로 전달됩니다. `makeIncrementer`함수는 실제로 증가를 수행하는 `incrementer` 중첩함수를 정의합니다. 이 함수는 단순히 `amount`를 `runningTotal`에 대해주고, 그 결과를 반환합니다.

> 개인 Note: Closure의 Capture는 그 주변의 컨텍스트를 캡쳐합니다. makeIncrementer 속에 함수를 정의합니다. `incrementer` 함수 내부의 runningTotal, amount는 해당 함수 외부 인자입니다. 
> 
> `makeIncrementer`로 정의된 어떤 상수 및 변수는 () -> Int 타입의 incrementer를 실행하고 외부 인자들의 값을 참조값으로 계속 캡쳐 하며 가지고 있음.. 
> 
> 외부에 들어오는 값을 어떤 함수로 인해서 실행 -> 저장 함..


중첩 함수인 `incrementer()`함수를 분리해보면, 비정상적으로 보일수 있습니다.

```swift
func incrementer() -> Int {
    runningTotal += amount
    return runningTotal
}
```

`incrementer()`함수는 아무런 매개변수를 없이, 함수 본문에서 `runningTotal`과 `amount`를 참조합니다.


주변 함수의 컨텍스트로부터 `runningTotal`과 `amount`에 대한 참조를 캡처하고 자체 함수 본문에서 사용합니다. 참조로 캡쳐한 `runningTotal`과 `amount`는 `makeIncrementer` 호출이 종료할때까지 사라지지 않는 것을 보증하고, `runningTotal`이 다음번에 `incrementer`함수가 호출될때에도 사용할수 있는 것을 보증합니다.

> Note: 최적화에서, Swift는 클로저에 의해 값이 변경되지 않으면 값을 복사(copy)해서 대신 캡처하고 저장합니다. 클로저가 생성된 이후에 그 값은 변경될수 없습니다.
Swift는 더이상 필요하지 않을때 변수를 폐기하는 복잡한 모든 메모리 관리를 해줍니다

다음은 `makeIncrementer` 동작 예시입니다

```swift
let incrementByTen = makeIncrementer(forIncrement: 10)
```

위 예제는 호출될때마다 `incrementer` 함수를 참조해서 `runningTotal`변수에 10을 더해주는 `incrementByTen` 상수를 설정합니다. 함수를 여러번 호출해서 이 동작이 실행되는 것을 보여줍니다.

```swift
incrementByTen()
// returns a value of 10
incrementByTen()
// returns a value of 20
incrementByTen()
// returns a value of 30
```

두번째 `incrementer`를 생성하면, 자신의 저장된 참조를 새로 가질것이며, `runningTotal`변수와 구분됩니다.

```swift
let incrementBySeven = makeIncrementer(forIncrement: 7) incrementBySeven() // returns a value of 7
```

원래의 `incrementer(incrementByTen)`를 다시 호출하면 가지고 있는 `runningTotal` 변수는 다시 증가하고, `incrementBySeven`에 의해 캡쳐된 값에는 아무런 영향이 없습니다.

```swift
incrementByTen()
// returns a value of 40
```

> Note: 클래스 인스턴스의 프로퍼티에 클로저를 할당하고, 클로저는 인스턴스나 멤버를 참조해서 캡쳐하면, 클로저와 인스턴스 사이에 `강한 참조`를 만들것입니다. Swift는 강한 순환참조를 깨기 위해서 캡쳐 목록(`capture lists`)을 사용합니다. 더 자세한 정보는, [클로저에 대한 강한 순환참조(Strong Reference Cycles for Closures)를 보세요.](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID56)

---

## Closure Are Reference Types 

위의 예제에서, `incrementBySeven`과 `incrementByTen`은 상수이지만, 이러한 상수가 참조하는 클로저는 여전히 캡처한 `runningTotal`변수를 증가시킬수 있습니다. 이것은 함수와 클로저가 참조 타입(`reference types`)이기 때문입니다.

함수나 클로저를 상수나 변수에 할당 할 때마다, 실제로 상수와 변수는 함수나 클로저의 참조(`reference`)를 설정합니다. 위의 예제에서, `incrementByTen`은 클로저 자체의 내용이 아닌, 클로저를 참조하는 상수를 선택합니다.

이것은 
클로저에 두개의 다른 상수나 변수를 할당 할 경우에, 이러한 상수나 변수 모두 같은 클로저를 참조할 것을 의미합니다.


```swift
let alsoIncrementByTen = incrementByTen
alsoIncrementByTen()
// returns a value of 50
```

- 개인 예제

```swift
// 1
class SomeClass {
    var varValue: Int = 0
    let letValue: Int = 0
}
struct SomeStruct {
    var varValue: Int = 0
    let letValue: Int = 0
}

// 2
var c = SomeClass()
c.varValue = 10
c.letValue = 20 // 컴파일 에러
        
var s = SomeStruct()
s.varValue = 20
s.letValue = 10 // 컴파일 에러
 
// 3 
let c = SomeClass()
c.varValue = 30 // 변경가능.. Class자체가 let으로 선언된게 의미가 없내..
//        
c.letValue = 20 // 컴파일 에러
let s = SomeStruct()
s.varValue = 20 // 컴파일 에러 발생
s.letValue = 20 // 컴파일 에러발
```

---

## Escaping Closures 

클로저는 클로저가 함수에 인자로 전달될때 함수를 탈출한다(escape)고 말하지만, 함수가 반환된 뒤에 호출 됩니다. 클로저를 매개 변수중 하나로 사용하는 함수를 선언할때, 클로저가 탈출(escape)을 허용한다는 것을 가리키기 위해 매개변수의 앞에 `@escaping`을 작성할수 있습니다.

클로저가 탈출할수 있는 한가지 방법은 함수의 외부에 정의된 변수에 저장하는 것입니다. 한가지 예로, 클로저를 인자로 가지고 비동기 동작을 시작하는 많은 함수들의 완료를 조절합니다. `함수`는 그동작이 시작된 후에 반환하지만 `클로저`는 동작이 완료될때가지 호출되지 않습니다. 클로저가 나중에 호출 되도록 탈출(escape)이 필요합니다. 예를들어 

```swift
var completionHandlers: [() -> Void] = []
func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
    completionHandlers.append(completionHandler)
}
```

`someFunctionWithEscapingClosure(_:)`함수는 인자로 클로저를 가지고 함수 외부에 선언된 배열에 추가합니다. 함수의 매개 변수에 `@escaping`표시하지 않으면 컴파일 오류가 발생합니다.

클로저를 `@escaping`표시하는 것은 클로저에서 `self`를 명시적으로 참조하고 있다는 것을 의미합니다. 아래 코드에서, 클로저는 `someFunctionWithEscapingClsoure(_:)`에 전달된 클로저는 `self`를 명시적으로 참조해야하는것을 의미하는 탈출(escaping)클로저 입니다. 반면(contrast), `someFunctionWithNonescapingClosure(_:)`에 전달된 클로저는 암시적으로 `self`를 참조할수 있다는것을 의미하는 탈출하지 않는(nonescaping)클로저 입니다. 

```swift
func someFunctionWithNonescapingClosure(closure: () -> Void) {
    closure()
}
 
class SomeClass {
    var x = 10
    func doSomething() {
        someFunctionWithEscapingClosure { self.x = 100 }
        someFunctionWithNonescapingClosure { x = 200 }
    }
}
 
let instance = SomeClass()
instance.doSomething()
print(instance.x)
// Prints "200"
 
completionHandlers.first?()
print(instance.x)
// Prints "100"
```

---

## Autoclosures

자동클로저(autoclosure)는 함수에 인자로 전달되는 표현식을 래핑하기 위해 자동적으로 생성되는 클로저입니다. 그것은 아무런 인자도 가지지 않고, 호출될때 내부에서 래핑된(wrapped)표현식의 값을 반환합니다. 이 구문(syntactic)은 명시적인 클로저 대신 일반 표현식으로 작성해서 함수의 매개변수 주변에 중괄호(braces)를 생략할때 편리합니다. 

일반적으로 함수 호출(call)은 자동클로저(`autoclosure`)이지만, 이러한 종류의 함수를 구현(implement)하는 것은 일반적이지 않습니다. 예를들어, assert(condition:message:file:line:)함수는 condition과 message 매개변수에 대한 자동클로저(autoclosure)를 가집니다. condition매개변수는 디버그 빌드 할때에만 평가되고 message 매개변수는 condition이 false일때만 평가됩니다.

자동클로저(`autoclosure`)는 클로저를 호출할때까지 안쪽 코드가 실행되지 않기 때문에, 평가가 지연될 수 있습니다. 지연되는 평가(delaying evaluation)는 그 코드가 평가 될때 제어 할수 있기 때문에, 부작용이 있거나 계산이 오래 걸리는 코드에서 유용합니다. 아래 코드는 클로저가 어떻게 평가를 지연하는지 보여줍니다.

```swift
var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
print(customersInLine.count)
// Prints "5"
 
let customerProvider = { customersInLine.remove(at: 0) }
print(customersInLine.count)
// Prints "5"
 
print("Now serving \(customerProvider())!")
// Prints "Now serving Chris!"
print(customersInLine.count)
// Prints "4"
```

`customersInLine`배열의 첫번째 요소가 클로저 코드 내부에 의해 제거하지만, 배열 요소는 클로저가 실제로 호출될때까지 제거되지 않습니다. 그 클로저가 호출되지 않으면, 배열 요소가 결코 제거되지 않는다는 것을 의미하며, 클로저 안쪽의 표현식은 평가되지 않습니다. `customerProvider`의 타입은 `String`이 아니고 `() -> String`인 것을 주의합니다. - 매개변수 없이 문자열을 반환하는 함수

함수에 인자로 클로저를 전달할때 지연된 평가와 동일한 동작을 합니다.

```swift
/ customersInLine is ["Alex", "Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: { customersInLine.remove(at: 0) } )
// Prints "Now serving Alex!"
```

위 목록에 있는 `serve(customer:)`함수는 고객의 이름을 반환하는 명시적인 클로저를 가집니다. `serve(customer:)`의 버전은 아래와 같은 동작을 수행하지만, 명시적인 클로저를 가지는 대신에, 매개변수 타입을 `@autoclosure`속성으로 표시해서 자동 클로저(autoclosure)를 가집니다. 이제 클로저 대신 String인자를 가지는 경우에, 함수를 호출할 수 있습니다. customerProvider 매개변수의 타입이 @autoclosure 속성으로 표시 됬기때문에, 인자는 자동적으로 클로저로 변환됩니다.

> Note: 오토클로저를 남용하면 코드를 이해하기 어렵게 만들수 있습니다. 컨텍스트와 함수 이름은 명확하게 만들고 평가가 지연되는것을 확인해야합니다.

탈출(escape)을 위해 자동클로저를 원하면, @autoclosure와 @escaping 두가지 속성을 사용합니다. @escaping속성은 위의 클로저 [탈출하기(Escaping Closures)에서](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID546) 설명되었습니다.

```swift
// customersInLine is ["Barry", "Daniella"]
var customerProviders: [() -> String] = []
func collectCustomerProviders(_ customerProvider: @autoclosure @escaping () -> String) {
    customerProviders.append(customerProvider)
}
collectCustomerProviders(customersInLine.remove(at: 0))
collectCustomerProviders(customersInLine.remove(at: 0))
 
print("Collected \(customerProviders.count) closures.")
// Prints "Collected 2 closures."
for customerProvider in customerProviders {
    print("Now serving \(customerProvider())!")
}
// Prints "Now serving Barry!"
// Prints "Now serving Daniella!"
```

혹은

```swift
serve(customer: { () -> String  in

	return "123123"          
        }() 
        )
```

탈출(escape)을 위해 자동클로저를 원하면, `@autoclosure`와 `@escaping` 두가지 속성을 사용합니다. `@escaping`속성은 위의 [클로저 탈출하기(Escaping Closures)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID546)에서 설명되었습니다.

위의 코드에서, `customerProvider`인자로 전달된 클로저를 호출하는 대신, `collectCustomerProviders(_:)`함수는 `customerProviders` 배열 클로저에 추가됩니다. 배열은 함수의 범위 외부에 선언되며, 배열의 클로저가 그 함수가 반환된 이후에 실행할수 있다는 것을 의미합니다. 결과적으로, customerProvider인자의 값은 함수의 범위를 탈출하기 위해 허용되야 합니다.

> Note: 클로저를 정의할때 {code}을 이용하는데, 클로저를 매개변수로 받는 함수에서 사용하려면 당연히 {code}를 사용합니다.
>
> 함수 매개변수에 @autoclosure로 선언하면, 중괄호({})를 생략해서 함수 매개변수에 code만 넣으면 컴파일러가 알아서 {code}사용하는 것으로 처리해주겠다는 의미로 해석됩니다.

---

## Reference 

[Closures](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID94)<br>
[까칠코더님 블로그](http://kka7.tistory.com/9?category=919617)