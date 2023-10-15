---
layout:     post
title:      "Swift. 정리하기 7: Swift Language Guide-Closures"
subtitle:   "Swift Language Guide-Closures *"
date:       2018-04-11 20:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
---
## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Closures](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID94)<br>
[까칠코더님 블로그](http://kka7.tistory.com/113?category=919617)

---

## Closures

`Closures`는 독립적인(self.-contained) 기능의 코드 블럭(blocks)이며, 코드에서 젇날되고 사용 할수 있습니다. Swift에서 클로저는 C, Objective-C의 블럭(blocks)와 다른 프로그래밍 언어세너는 람다(lambda)와 비슷합니다.

`클로저`는 Context에 정의된 모든 상수와 변수를 캡쳐(capture)와 참조 저장(store references) 할수 있습니다. 이것은 이러한 상수와 변수를 클로징(closing over)하는 것으로 알려져 있습니다. Swift는 캡쳐(capturing)하는 모든 메모리를 관리를 처리합니다. 

> NOTE: capturing 개념에 익숙하지 않아도 걱정하지마세요. [Capturing Values](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID103) 에서 자세하게 설명합니다. 

[Functions](https://docs.swift.org/swift-book/LanguageGuide/Functions.html)에서 소개된, `전역`과 `중첩된` 함수들은 실제로는 클로져의 `특별한 경우(case)`입니다. 클로져는 다음 3가지 중의 하나입니다.

- `전역 함수(Global functions)`는 이름을 가지는 클로져이고 어떤 값도 캡쳐하지 않습니다.
- `중첩 함수(Nested functions)`는 이름을 가지는 클로져이고 감싸고 있는 함수의 값을 캡쳐할 수 있습니다.
- 클로져 표현은 `컨텍스트(context)`의 주변(surrounding) 값들을 캡쳐 할 수 있는 간단한 구문으로 작성된 이름없는 클로져 입니다.

Swift의 클로저 표현식은 혼란없는 구문을 권장하는 최적화를 통해 깨끗하고 명확한 스타일을 유지합니다. 이러한 최적화에는 다음이 포함됩니다. 

- 컨텍스트에서 매개변수 및 반환 값유형 추론
- 단일 표현식 클로저에서 암시적으로 반환 
- 약식 인수(arguments) 이름
- 후행 클로저 구문 

---

## Closure Expressions 

중첩 함수에서 소개된 [Nested Functions](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-ID178)은 더큰 함수의 일부로 자체 포함된 코드 블록을 명명하고 정의하는 편리한 방법입니다. 그러나 전체 선언 및 이름없는 함수와 유사한 구문의 짧은 버전을 작성하는것이 유용할때도 있습니다. 이는 하나 이상의 인수로 함수를 사용하는 함수나 메소드로 작업할때 특히 그렇습니다. 

`클로져 표현식(Closure expressions`은 문법에 집중해서, 간결하게 인라인(Inline) 클로져를 만드는 방법입니다. 클로져 표현식은 명확성과 의도를 잃지않고 짧은 형식으로 클로져를 작성하는 몇가지 최적화 문법을 제공합니다. 아래 클로져 표현식 예제는 여러번 반복하여 `sorted(by:)` 메소드의 예제를 개선하여 최적화하는 것을 보여주며, 각 표현식은 동일한 기능을 더 간결하게 표현하는 방법입니다

### the Sorted Method 

Swift의 표준 라이브러리는 여러분이 제공하는 정렬하는 클로져의 결과를 기반으로해서, 알려진 타입의 값 배열을 정렬하기 위한 `sorted(by:)` 메소드를 제공합니다. 한번 정렬 프로세스가 완료되면, `sorted(by:)` 메소드는 예전 타입과 크기가 같은 새로운 배열을 반환하며, 그 요소들은 올바른 순서로 정렬되어 있습니다.

아래 클로져 표현식 예제는 String 값의 배열을 알파벳 역순으로 정렬하기 위해, sotred(by:) 메소드를 사용합니다. 다음은 정렬할 배열의 초기값 입니다.

```swift
// 1
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
```

`sorted(by:)` 메소드는 배열의 컨텐츠와 동일한 타입의 두개의 인자를 받는 클로져를 받고, 첫번째 값이 두번째 값의 이전 또는 이후에 표시되야 하는지에 대한 Bool 값을 반환합니다. 정렬하는 클로져는 첫번째 값이 두번째 값 앞(before)에 나타나면true를 반환하고, 반대의 경우에는 false를 반환합니다.

이 예제는 `String` 값의 배열을 정렬하고, 정렬하는 클로져는 `(String, String) -> Bool` 타입의 함수가 필요합니다.

정렬하는 클로져를 제공하는 한가지 방법은 올바른 타입의 함수를 작성하고, `sorted(by:)` 메소드를 인자로 전달하는 것입니다


아래 클로져 표현식 예제는 `String` 값의 배열을 알파벳 역순으로 정렬하기 위해, `sotred(by:)` 메소드를 사용합니다. 다음은 정렬할 배열의 초기값 입니다.

```swift
func backward(_ s1: String, _ s2: String) -> Bool {
    return s1 > s2
}
var reversedNames = names.sorted(by: backward)
// reversedNames is equal to ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

첫번째 문자열(`s1`)이 두번째 문자열(`s2`)보다 더 크면, `backward(_:_:)` 함수는 `true`를 반환할 것이며, 정렬된 배열에서 `s1`은 `s2` 앞에 나타날것입니다. 문자열에서의 문자들이, 더 크다(greater than)는 알파벳이 나중에 나타난다를 의미합니다. 이는 "B" 글자가 "A"글자보다 더 크다(greater than)를 의미하고, "Tom".문자열은 "Tim"문자열보다 더 크다는 것을 의미합니다. 알파벳을 역순으로 정렬하면 "Barry"는 "Alex"앞에 위치하게 됩니다.

하지만, 본질적으로(essentially) 단일 표현식 함수(`a > b`)를 작성하는 것은 오히려 장황한(long-winded) 방법입니다. 이 예제에서, 클로져 포현 문법을 사용해서, 정렬하는 클로져를 인라인으로 작성하는것이 바람직합니다.

### Closure Expreesion Syntax 

클로져 표현 문법은 다음과 같은 형태입니다.

```swift
{ (parameters) -> return type in
    statements
}
```

Closure의 표현식에 경우 `parameters`는 in-out 매개변수가 될수 있지만 `기본값을 가질 수는 없습니다.` 다중 매개 변수도 사용 가능함.

```swift
// 1
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})
```

인라인 클로져로 매개변수와 반환 타입의 선언한 것은 `backward(_:_:)` 함수의 선언과 동일한 것을 주의합니다. 두 경우 모두, `(s1: String, s2: String) -> Bool`으로 작성됩니다. 하지만, 인라인 클로져 표현에 대해, 매개변수와 반환 타입은 중괄호(`cury braces`) 바깥쪽(outside)이 아니라, 안쪽(inside)에 작성됩니다.

클로져의 본문의 시작은 in 키워드에 의해 시작합니다. 이 키워드는 클로져의 매개변수와 반환 타입 정의가 완료되었음을 나타내고, 클로져의 본문은 시작됩니다.

클로져의 본문이 매우 짧기 때문에, 한줄로 작성할 수 있습니다.

```swift
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in return s1 > s2 } )
```

이는 `sorted(by:)` 메소드에 대한 모든 호출이 동일하게 유지되는 것을 의미합니다. 괄호 쌍은 여전히 메소드의 전체 인자를 감싸고(wrap) 있습니다. 하지만, 그 인자는 이제 인라인 클로져 입니다.

### Inferring Type from Context 

메소드에 인자처럼 정렬하는 클로져(`sorting closure`)가 전달되기 때문에, `Swift`는 매개변수의 타입과 반환하는 값의 타입을 추론할 수 있습니다. `sorted(by:)` 메소드는 문자열 배열에서 호출되며, 따라서 인자는 반드시 `(String, String) -> Bool` 타입의 함수여야 합니다.`(String, String)`과 `Bool` 타입은 클로져 표현식 정의의 일부로 작성할 필요가 없다는 것을 의미합니다. 모든 타입을 추론 할수 있기 때문에, 반환 화살표(`->`)와 괄호(`parentheses`) 근처의 매개변수(parameters)들을 생략할 수 있습니다.

```swift
reversedNames = names.sorted(by: { s1, s2 in return s1 > s2 } )
```

클로져에 함수나 메소드를 인라인 클로져 표현식으로 전달할때 매개변수 타입과 반환 타입을 추론하는 것이 항상 가능합니다. 결과적으로, 클로져가 함수나 메소드 인자로 사용될때에는 전체 형식(fullest form)의 인라인 클로져를 작성할 필요가 없습니다.

그럼에도 불구하고, 원한다면 타입을 명시적으로 작성할 수 있고, 코드를 읽을때 애매모호함을 피할수 있는경우에는 명시적으로 작성하는 것을 권장합니다. `sorted(by:)` 메소드의 경우에, 클로져의 목적은 사용하는 곳에서 정렬하는 사실을 명확히 하는 것이고, 클로져가 문자열 배열의 정렬을 도와주기 때문에, 클로져가 String 값으로 작업한다고 가정하는 것이 안전합니다.

### Implicit Returns from Single-Expression Closures 

단일 표현식 클로져(Single-expression closures)는 이전 예제 버젼에서 처럼, 선언에서 `return` 키워드를 생략해서 단일 표현식 클로져의 결과를 암시적으로 반환할 수 있습니다.

```swift
reversedNames = names.sorted(by: { s1, s2 in s1 > s2 } )
```

여기에서, `sorted(by:)` 메소드 인자의 함수 타입은 클로져에서 `Bool` 값이 반드시 반환되어야 하는 것을 명확히 합니다. 클로져의 본문에 포함된 `단일 표현식(s1 > s2)`으로 `Bool` 값을 반환하기 때문에, 그것은 애매모호하지 않고, `return` 키워드는 생략될수 있습니다.

### Shorthand Argument Names

Swift는 자동적으로 약식 아규먼츠 네임을 인라인 클로저로 제공합니다. 그것은 `$0`, `$1`, `$2`그리고 또다른 이름으로 부터 클로저의 아규먼츠 의 값으로 참조되어 사용합니다.

클로져 표현식에서 이러한 축약 인자 이름을 사용하는 경우에, 선언에서 클로져 인자 목록을 생략할 수 있고, 축약 인자 이름의 숫자와 타입은 예상된 함수 타입으로 부터 추론 될 것입니다. 클로져 표현식이 본문 전체로 구성되기 때문에, in 키워드 또한 생략될 수 있습니다.

```swift
reversedNames = names.sorted(by: { $0 > $1 } )
```

$0, $1은 closure의 첫번째 두번째 String 인자로 참조됩니다.

### Operators method 

실제로 위의 클로져 표현식을 더 짧게(shorter) 작성하는 방법이 있습니다. Swift의. `String`타입은 두개의 `String` 타입의 매개변수와 `Bool` 타입의 반환 타입을 가진 메소드로 비교(greater-than) 연산자(`>`)의 문자열 고유의(string-specific) 구현을 정의합니다. 이는 `sorted(by:)` 메소드에서 필요한 메소드 타입과 정확히 일치합니다. 따라서, 간단하게 비교 연산자(greater-than operator)로 전달할 수 있고, Swift는 문자열 고유(string-specific)의 구현을 사용하길 원한다고 추론할 것입니다.

```swift
reversedNames = names.sorted(by: >)
```

operator method에 대해서 더 알고 싶다면 [Operator Method](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID42)

---

## Trailing closures 

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
```

위의 [클로져 표현식 문법(Closure Expression Syntax)](https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID97) 섹션에서 문자열 정렬(string-sorting) 클로져는 sorted(by:) 메소드의 괄호 바깥쪽에 후행 클로져로 작성할 수 있습니다.

```swift
reversedNames = names.sorted() { $0 > $1 }
```

클로져 표현식이 함수나 메소드에 하나의 인자를 제공하고 그 표현식이 후행 클로져가 제공되는 경우에, 함수를 호출할때 함수나 메소드의 이름 뒤의 괄호 쌍(`()`) 을 작성할 필요가 없습니다.

```swift
reversedNames = names.sorted { $0 > $1 }
```

클로져가 한줄에 들어가지 않을 만큼 충분히 길때 후행 클로져가 가장 유용합니다. 예를들어, Swift의 `Array` 타입은 인자 하나로 클로져 표현식을 사용하는 `map(_:)`메소드가 있습니다. 그 클로져는 배열의 각 항목(item)마다 한번씩 호출되고, 항목에 대해 매핑된 값(아마도 다른 타입)을 반환합니다. 매핑(mapping)의 본질(nature)과 반환되는 값의 타입은 클로져에 지정되어 있습니다.

제공된 클로져를 각 배열 요소에 적용한 후에, `map(_:)` 메소드는 원래 배열과 동일한 순서로 새로 맵핑된 값을 포함한 새로운 배열을 반환합니다.

다음은 `map(_:)`메소드를 `Int` 배열을 `String` 값의 배열로 변환하기 위해 후행 클로져를 사용하는 방법입니다. `[16, 58, 510]`배열은 새로운 `["OneSiz", "FiveEight", "FiveOneZero"]` 배열을 만드는데 사용됩니다.

```swift
let digitNames = [
    0: "Zero", 1: "One", 2: "Two",   3: "Three", 4: "Four",
    5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine"
]
let numbers = [16, 58, 510]
```

위 코드는 정수 숫자와 영어 이름 버젼을 매핑한 딕셔너리를 생성하였습니다. 또한, 정수 배열을 정의하였으며, 문자열로 변환할 준비가 되었습니다.

이제 후행 클로저로 배열의 `map(_:)` 메소드로 클로져 표현식을 전달해서, `String` 값의 배열을 만들기 위해 `numbers` 배열을 사용할 수 있습니다.

```swift
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

`map(_:)` 메소드는 배열에서 각 항목에 대해 한번씩 클로져 표현식을 호출합니다. 타입이 매핑된 배열에서의 값들로부터 추론되기 때문에, 클로져의 입력 매개변수, `number`의 타입을 지정할 필요가 없습니다.

예제에서, `number` 변수는 클로져의 `number` 매개변수의 값으로 초기화 되며, 그 값은 클로져 본문에서 수정될 수 있습니다(함수와 클로져에 대한 매개변수는 항상 상수입니다). 그 클로져 표현식은 매핑된 출력 배열에 저장될 타입을 가리키기 위해, `String` 반환 타입을 지정합니다.

클로져 표현식은 호출될때마다 호출된 `output` 문자열을 만들어줍니다. 나머지 연산자`(number % 10)`를 사용하여 `number`의 마지막 숫자(`digit`)를 계산하고, `digitNames` 딕셔너리에서 이 숫자(`digit`)와 어울리는 문자열을 찾습니다. 그 클로져는 0보다 큰 정수의 문자열 표현식을 만드는데 사용할 수 있습니다.

> Note: 딕셔너리의 키가 존재하지 않으면 검색이 실패할수 있다는 것을 나타내기 위해 딕셔너리 서브스크립트는 옵셔널 값을 반환하기 때문에, `digitNames` 딕셔너리의 서브스크립트(subscript: 첨자)에 대한 호출에 느낌표(`!`)를 붙입니다. 위 예제에서, `number % 10`은 항상 `digitNames` 딕셔너리에 대한 유효한 서브스크립트 키를 보장하고, 느낌표 표시(exclamation mark)는 서브스크립트의 옵셔널 반환 값을 저장한 String 값을 강제 언래핑(force-unwrap)하기 위해 사용됩니다.

`digitNames` 딕셔너리에서 가져온 문자열은 output의 앞(front)에 추가되며, 역순의 문자열 버젼을 실제로 만들어줍니다. `(number % 10)` 표현식은 16에 대해서 6을, 58에 대해서 8을, 510에 대해서 0의 값을 줍니다.)

number변수는 10으로 나눕니다. 정수형이기 때문에, 나누기 중에 16은 1로, 58은 5로, 510은 51이 됩니다.

이러한 과정은 number가 0이 될때까지 반복되며, output문자열은 클로져에 의해 반환되고, `map(_:)` 메소드에 의해 output 배열에 추가됩니다.

위 예제에서 후행 클로져 문법을 사용하여 map(_:) 메소드의 바깥쪽 괄호로 전체 클로져를 감쌀 필요없이, 클로져를 지원하는 함수 바로 뒤에 클로져의 함수를 깔끔하게 캡슐화 합니다.


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

분리되어 있다고 생각할대, 중첩된 `incrementer()` 함수는 이상하게 보일것입니다

```swift
func incrementer() -> Int {
    runningTotal += amount
    return runningTotal
}
```


`incrementer()`함수는 어떠한 매개변수도 없고, 함수 본문에서 `runningTotal`과 `amount`를 참조하고 있습니다. 주변 함수로부터 `runningTotal`과 amount에 대한 참조(reference)를 캡쳐하고 자체 함수 본문에서 사용합니다. 참조로 캡쳐하면 makeIncrementer 호출이 끝났을때에도 runningTotal과 amount가 사라지지 않고, runningTotal은 다음번에 incrementer 함수가 호출되더라도 사용할수 있다는 것을 보장합니다.

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

일반적으로 함수 호출(`call`)은 자동클로저(`autoclosure`)이지만, 이러한 종류의 함수를 구현(implement)하는 것은 일반적이지 않습니다. 예를들어, `assert(condition:message:file:line:)`함수는 `condition`과 `message` 매개변수에 대한 자동클로저`(autoclosure)`를 가집니다. condition매개변수는 디버그 빌드 할때에만 평가되고 message 매개변수는 condition이 false일때만 평가됩니다.

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

클로져 내부의 코드에 의해 `customersInLine` 배열의 첫번째 요소가 제거되더라도, 배열 요소는 클로져가 실제 호출되기 전까지 제거되지 않습니다. 클로져가 호출된적이 없다면, 클로져 안의 표현식을 처리되지 않으며, 배열 요소가 결코 제거되지 않는다는 것을 의미합니다. `customerProvider`의 타입이 `String`이 아니고 `() -> String`인것을 주의합니다 - 매개변수 없이 문자열만 반환하는 함수

함수에 인자로 클로져를 전달할때 지연된 처리와 동일한 동작을 하게 됩니다

```swift
/ customersInLine is ["Alex", "Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: { customersInLine.remove(at: 0) } )
// Prints "Now serving Alex!"
```

위 목록에 있는 `serve(customer:)`함수는 고객의 이름을 반환하는 `명시적인` 클로저를 가집니다. `serve(customer:)`의 버전은 아래와 같은 동작을 수행하지만, 명시적인 클로저를 가지는 대신에, 매개변수 타입을 `@autoclosure`속성으로 표시해서 자동 클로저(autoclosure)를 가집니다. 이제 클로저 대신 `String`인자를 가지는 경우에, 함수를 호출할 수 있습니다. `customerProvider` 매개변수의 타입이 `@autoclosure` 속성으로 표시 됬기때문에, 인자는 자동적으로 클로저로 변환됩니다.

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

위의 코드에서, `customerProvider` 인자로 전달된 클로져를 호출하는 대신에, `collectCustomerProviders(_:)`함수는 클로져를 `customerProviders` 배열에 추가합니다. 그 배열은 함수의 범위 바깥쪽에 선언되어 있으며, 배열에서의 클로져가 함수를 반환한 후에 실행될수 있다는 것을 의미합니다. 결과적으로, `customerProvider` 인자의 값은 함수의 범위를 탈출하기 위해 반드시 허용되어야 합니다.

> Note: 함수의 매개변수에 `@autoclosure`를 선언하면, 중괄호(`{}`)를 생략할수 있게 해줍니다.
`callClouser({ code })` -> `callClouser(code)`


```swift
serve(customer: { () -> String  in

	return "123123"          
        }() 
        )
```

탈출(escape)을 위해 자동클로저를 원하면, `@autoclosure`와 `@escaping` 두가지 속성을 사용합니다. `@escaping`속성은 위의 [클로저 탈출하기(Escaping Closures)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID546)에서 설명되었습니다.

---

