---
layout:     post
title:      "Swift. 정리하기 2: Swift Language Guide-Basic Operators"
subtitle:   "Swift Language Guide-Basic Operators"
date:       2018-04-11 17:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

최종 수정일: 2018.10.01

## Reference

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다!

[Basic Operators](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-ID60)<br>
[까칠코더님 블로그](http://kka7.tistory.com/108?category=919617)<br>

---

## Basic Operators

`연산자(operator)`는 값을 확인하고 변경하거나 결합하는데 사용하는 특별한 기호(symbol)이나 문구(phrase)입니다. 예를들어, 더하기 연산자(`+`)는 `let i = 1 + 2`처럼, 두 숫자들을 더해주고, `AND` 논리 연산자(`&&`)는 `if enteredDoorCode && passedRetinaScan` 처럼 두개의 Boolean 값들을 결합합니다

Swift는 표준 C 연산자와 일반적인 코딩 오류를 제거하기 위해 몇가지 향상시킨 기능을 지원합니다. 할당 연산자(`=`)는 실수로 동등 연산자(`==`)가 대신 사용되는 것을 막기 위해 값을 반환할 수 없습니다. 산술(arithmetic) 연산자`(+,-,*,/,%, 등등…)`는 값을 저장하는 타입의 허용된 범위보다 크거나 작은 숫자 값으로 작업할때 예기치 않는 결과가 발생하지 않도록 하기 위해, 
값 오버플로우를 감지하고 허용하지 않습니다. Swift의 오버플로우 연산자를 사용하여, 값 오버플로우 동작을 선택할수 있으며, [오버플로우 연산자(Overflow Operators)](https://docs.swift.org/swift-book/LanguageGuide/AdvancedOperators.html#ID37)에 설명되어 있습니다.

또한 Swift는 C에는 없는 값의 범위를 간결하게 표현하기 위해 a..<b와 a...b와 같은 범위 연산자를 제공합니다.

이 챕터(chapter)에서는 Swift의 일반적인 연산자를 설명합니다. Swift의 고급 연산자(advanced operators)는 [고급 연산자(Advanced Operators)](https://docs.swift.org/swift-book/LanguageGuide/AdvancedOperators.html)에서 다루고, 사용자정의 연산자를 정의하는 방법과 사용자정의 타입에 대한 표준 연산자를 구현하는 방법을 설명합니다.

---

## Terminology

연산자는 단항(unary), 이항(binary), 삼항(ternary)이 있습니다.

- 단항(Unary) 연산자는 (`-a` 처럼) 단일 대상에 대해 동작합니다. 단항 접두사(prefix) 연산자는 (`!b` 처럼) 대상 바로 앞에 나타나고, 단항 접미사(postfix) 연산자는 (`c!` 처럼) 대상 바로 뒤에 나타납니다.
- 이항(Binary) 연산자는 `(2 + 3 처럼)` 두개의 대상에 대해 동작하고 두개의 대상 사이에 나타나기 때문에 `끼워넣기(infix)` 입니다.
- 삼항(Ternary) 연산자는 세개의 대상에 대해 동작합니다. Swift는 C 처럼, 삼항 조건 연산자`(a ? b : c)`, 하나의 삼항연산자만 있습니다.


연산자에 영향 받는 값은 피연산자(operands)라고 합니다. `1 + 2`표현식에서, `+`기호는 이항 연산자이고 두개의 피연산자는 값 1과 2 입니다.

---

## Assignment Operator

`할당 연산자(assignment operator)(a = b)`는 a의 값을 b값으로 초기화 하거나 업데이트 합니다.

```swift
let b = 10
var a = 5
a = b
// a is now equal to 10
```

할당 연산자(assignment) 오른쪽에 여러 값을 가진 튜플(tuple)이 있는 경우, 그 요소들은 한번에 여러개의 상수나 변수로 분해될 수 있습니다.

```swift
let (x, y) = (1, 2)
// x is equal to 1, and y is equal to 2
```

Swift의 할당연산자는 C와 Objective-C에서의 할당 연산자와 다르게, 스스로 값을 반환할수 없습니다. 다음 문장은 유효하지 않습니다.

```swift
if x = y {
    // This is not valid, because x = y does not return a value.
}
```

이 기능은 실제 의도는 동등 연산자(==)일때 실수로 할당 연산자(=)가 사용되는 것을 막아줍니다. Swift는 코드에서 이런 종류의 오류를 피하는데 도움이 됩니다.

---

## Arithmetic Operators

Swift는 모든 숫자 타입에 대해서 4개의 표준 산술 연산자(arithmetic operators)를 지원합니다.

- 덧셈(Addition) (+)
- 뺄셈(Subtraction) (-)
- 곱셈(Multiplication) (*)
- 나눗셈(Division) (/)


```swift
1 + 2 // equals 3 
5 - 3 // equals 2 
2 * 3 // equals 6 
10.0 / 2.5 // equals 4.0
```

Swift 산술 연산자는 C와 Objective-C에서의 산술(arithmetic) 연산자와는 다르게 기본적으로 값이 오버플로우(overflow) 되는 것을 허용하지 않습니다. Swift의 오버플로우 연산자(a &+ b)를 사용하여 값 오버플로우 동작을 선택할수 있습니다. 오버플로우 연산자(Overflow Operators)를 보세요.

덧셈 연산자는 `String` 연결도 지원됩니다.

```swift
"hello, " + "world" // equals "hello, world"
```

### Remainder Operator

`나머지 연산자(remainder operator)(a % b)`는 a에 b가 몇 배수가 되고 남은 값(나머지)을 반환합니다.

> Note: 나머지 연산자(`%`)는 다른 언어에서 모듈러스 연산자(modulo operator)로 알려져 있습니다. 하지만, Swift에서는 음수에서도 동작하며, 엄밀히 말하면(strictly speaking) 모듈러스 연산이 아닌 나머지 연산입니다.

다음은 나머지 연산자 사용법입니다. 9 % 4를 계산하기 위해서, 9에서 4를 얼마나 많이 가지고 있는지 계산합니다.

![](/img/posts/SwiftProgrammingLanguage2_0.png)

9에는 두개의 4가 들어갈 수 있고, 나머지는 1입니다. (오렌지 색으로 표시)

Swift에서 다음과 같이 작성합니다.

```swift
9 % 4    // equals 1
```

`a % b`에 대한 답을 구하기 위해, %연산자는 다음에 오는 공식을 계산하고 remainder를 반환합니다.

> a = (b x some multiplier) + remainder

`some multiplier`은 a안에 b가 들어갈 수 있는 최대 갯수입니다.

9와 4를 공식에 대입합니다.

> 9 = (4 x 2) + 1

`-1`의 나머지 값을 줍니다. 

b의 음수 값에 대해 b의 부호는 무시 됩니다. 이는 a % b와 a % -b가 항상 같은 값을 준다는 것을 의미합니다.

### Unary Minus Operator

숫자 값의 부호는 접두사 -를 사용하여 토글(toggled) 할 수 있으며, `단항 뺄셈 연산자(unary minus operator)`이라고 합니다.

```swift
let three = 3
let minusThree = -three       // minusThree equals -3
let plusThree = -minusThree   // plusThree equals 3, or "minus minus three"
```

### Unary Plus Operator

단항 뺄셈 연산자(-)는 공백 없이, 연산자 값 바로 앞에 붙여줍니다.

```swift
let minusSix = -6
let alsoMinusSix = +minusSix  // alsoMinusSix equals -6
```

단항 덧셈 연산자는 실질적으로 아무것도 하지 않으며, 코드에서 음수인 숫자에 대해 단항 뺄셈 연산자를 사용할때, 더하기 숫자를 대칭(symmetry)으로 제공하기 위해서 사용할 수 있습니다.

---

## Compound Assignment Operators

Swift는 C처럼, 다른 연산자와 할당 연산자(=)를 결합하는 복합 할당 연산자(compound assignment operators)를 제공합니다. 한가지 예로는 덧셈 할당 연산자(addition assignment operator) (`+=`) 입니다

```swift
var a = 1
a += 2
// a is now equal to 3
```

`a += 2` 표현식은 `a = a + 2`에 대한 축약 표현입니다. 실제로(Effectively), 덧셈과 할당은 동시에 함께 수행하는 하나의 연산자로 결합됩니다.

> Note: 복합 할당 연산자는 값을 반환하지 않습니다. 예를들어, let b = a += 2를 사용할 수 없습니다

Swift 표준 라이브러리에서 제공되는 연산자에 대한 정보는, [연산자 선언(Operator Declarations)](https://developer.apple.com/documentation/swift/swift_standard_library/operator_declarations)를 보세요

---

## Comparision Operators

Swift는 `C 언어` 표준 비교 연산자(comparison operators) 모두 지원합니다

- 같다 (a == b)
- 같지 않다 (a != b)
- 더 크다 (a > b)
- 더 작다 (a < b)
- 더 크거나 같다 (a >= b)
- 더 작거나 같다 (a <= b)

> Note: Swift는 두 객체가 `동일한 객체 인스턴스를 참조`하는지를 테스트하기 위해 사용하는, 두개의 식별 연산자(identity operators) `(===, !==)`를 제공합니다

각각의 비교 연산자들은 상태가 `true`인지 아닌지를 나타내는 `Bool`값을 반환합니다

```swift
1 == 1   // true because 1 is equal to 1
2 != 1   // true because 2 is not equal to 1
2 > 1    // true because 2 is greater than 1
1 < 2    // true because 1 is less than 2
1 >= 1   // true because 1 is greater than or equal to 1
2 <= 1   // false because 2 is not less than or equal to 1
```

비교 연산자는 if문과 같은 조건문에서 자주 사용됩니다.

```swift
let name = "world"
if name == "world" {
    print("hello, world")
} else {
    print("I'm sorry \(name), but I don't recognize you")
}
// Prints "hello, world", because name is indeed equal to "world".
```

if문에 대한 자세한 사항은, 흐름제어(Control Flow)를 보세요.

두개의 튜플이 같은 타입과 같은 숫자 값을 가지는지 비교할수 있습니다. 튜플은 왼쪽에서 오른쪽으로 비교되며, 한번에 한개의 값씩, 두개의 값이 같지 않을때까지 비교합니다. 이렇게 두개의 값은 비교되고, 그 결과는 튜플을 비교의 전체 결과를 결정하게 됩니다.. 모든 요소들이 같은 경우에, 튜플은 같습니다. 예를 들어::

```swift
(1, "zebra") < (2, "apple") // true because 1 is less than 2; "zebra" and "apple" are not compared 
(3, "apple") < (3, "bird") // true because 3 is equal to 3, and "apple" is less than "bird" 
(4, "dog") == (4, "dog") // true because 4 is equal to 4, and "dog" is equal to "dog"
```

위의 예제에서, 첫번째 줄에서 왼쪽에서 오른쪽으로 비교하는 것을 볼수 있습니다. 1이 2보다 작기 때문에, 튜플내의 다른 값과 상관없이 (1, "zebra")는 (2, "apple") 보다 작은 것으로 간주됩니다. `이 비교는 튜플의 첫번째 요소에서 이미 결정 되었기 때문에, "zebra"가 apple보다 작지 않는 것은 중요하지 않습니다. 하지만, 튜플의 첫번째 요소가 같을때에는, 두번째 요소들을 비교합니다 - 두번째와 세번째 줄에서 처리되고 있습니다.`

튜플은 주어진 연산자가 각각의 튜플에 있는 각 값에 적용될수 있는 경우에만 비교할 수 있습니다. 예를들어, 아래 코드에서 보여주는것(demonstrated) 처럼, String과 Int값을 <연산자를 사용하여 비교할수 있기 때문에, (String, Int) 타입인 두개의 튜플을 비교할 수 있습니다. 이와 반대로(contrast), <연산자를 Bool 값에는 사용할 수 없기 때문에, (String, Bool) 타입의 튜플은 <연산자로 비교할수 없습니다.

```swift
("blue", -1) < ("purple", 1) // OK, evaluates to true 
("blue", false) < ("purple", true) // Error because < can't compare Boolean values
```

> Note: Swift 표준 라이브러리는 7개 미만의 요소를 가진 튜플에 대해 비교 연산자를 가지고 있습니다. 7개 이상의 요소를 가진 튜플을 비교하기 위해서는 직접 비교연산자를 구현해야 합니다.

---

## Ternary Conditional Operator

`삼항 조건 연산자(ternary conditional operator)`은 `question ? answer1 : answer2`형식을 가진 특별한 연산자 입니다. `question`이 `true` 또는 `false`인지를 구하는, 두개의 표현식을 하나로 간갈하게 만든 것입니다. 만약 `question`이 `true`이면, `answer1`로 처리하고 그 값을 반환합니다. 반대의 경우에는(otherwise), `answer2`로 처리되고 그 값을 반환합니다.

삼항 조건 연산자는 아래 코드를 간결하게 한 것입니다.

```swift
if question { 
	answer1 
} else { 
	answer2 
}
```

다음은 테이블 행(row)에 대한 높이를 계산하는 예제 입니다. 헤더가 있는 row의 경우에 row의 높이는 컨텐츠 높이보다 50 포인트 더 크고, 헤더가 없으면 20 포인트 더 커야 합니다.

```swift
let contentHeight = 40 
let hasHeader = true 
let rowHeight = contentHeight + (hasHeader ? 50 : 20) // rowHeight is equal to 90
```

위 예제는 아래 코드를 간결하게 한것입니다.

```swift
let contentHeight = 40 
let hasHeader = true 
let rowHeight: Int 
if hasHeader { 
		rowHeight = contentHeight + 50 
	} else { 
		rowHeight = contentHeight + 20 
} 
// rowHeight is equal to 90
```

첫번째 예제는 삼항 조건 연산자 사용해서 `rowHeight`를 코드 한줄로 올바른 값으로 설정할 수 있으며, 두번째 예제에서 사용된 코드보다 더 간결합니다.

삼항 조건 연산자는 두 표현식 중에 하나를 결정하는데 효과적인 간결함을 제공합니다. 삼항 조건 연산자를 주의해서 사용해야 하며, 과도하게 사용하면 코드를 읽기 어렵게 할 수 있습니다. 삼항 조건 연산자의 인스턴스 여러개를 하나로 복합해서 사용하는 것을 피해야 합니다.

---

## Nil-Coalescing Operator

nil 결합 연산자(nil-coalescing operator)`(a ?? b)`는 옵셔널 a에 값이 있는 경우 언래핑(unwraps)하거나, `a`가 `nil`인 경우에는 기본 값 `b`를 반환합니다. 표현식 `a`는 언제나 옵셔널 타입입니다. 표현식 `b`는 `a`에 저장된 타입과 반드시 같아야 합니다.

nil 결합 연산자는 아래 코드를 간결하게 합니다.

```swift
a != nil ? a! : b
```

삼항 조건 연산자를 사용한 위 코드는 a를 언래핑(unwrap)한 값을 사용하기 위해 a가 nil이 아닐때 강제 언래핑(a!)하고, 반대의 경우에는 b를 반환합니다. nil 결합 연산자는 간결하고 읽기쉬운 형태로 언래핑(unwrap)하는 더 좋은 방법을 제공합니다.

> Note: a의 값이 nil이 아니면, b의 값을 구하지 않습니다. 이것을 연산 생략(short-circuit-evaluation)이라고 합니다.

아래 예제는 기본 색상 이름과 옵셔널인 사용자정의한 색상의 이름중 하나를 고르기 위해 nil 결합 연산자를 사용하였습니다.

```swift
let defaultColorName = "red"
var userDefinedColorName: String?   // defaults to nil

var colorNameToUse = userDefinedColorName ?? defaultColorName
// userDefinedColorName is nil, so colorNameToUse is set to the default of "red"
```

`userDefinedColorName` 변수는 옵셔널 `String`으로 정의되어 있으며, 기본 값은 nil입니다. `userDefinedColorName`이 옵셔널 타입이기 때문에, 그 값을 얻어오기 위해 nil 결합 연산자를 사용할 수 있습니다. 위 예제에서, 그 연산자는 `String`변수에 `colorNameToUse`에 초기값을 결정하기 위해 사용되었습니다. `userDefinedColorName`은 `nil`이기 때문에, `userDefinedColorName ?? defaultColorName` 표현식은 `defaultColorName`또는 `"red"`값을 반환합니다.

`userDefinedColorName`에 `nil`이 아닌 값을 할당하고 nil 결합 연산자를 다시 확인하는 경우에, `userDefinedColorName` 내부에 래핑된(wrapped) 값이 기본값 대신 사용됩니다.

```swift
userDefinedColorName = "green" colorNameToUse = userDefinedColorName ?? defaultColorName // userDefinedColorName is not nil, so colorNameToUse is set to "green"
```

---

## Range Operators

Swift는 범위 값을 간결하게 표현하기 위해서 몇가지 범위 연산자(range operators)를 가지고 있습니다

### Closed Range Operator

폐쇄된 범위 연산자(closed range operator) `(a...b)`는 a에서 b까지의 범위를 정의하고, a와 b값을 포함합니다. `a`값은 반드시 `b`보다 크지 않아야 합니다

폐쇄된 범위 연산자는 `for-in` 반복문처럼, 모든 값을 사용하길 원하는 범위를 반복할때 유용합니다.

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

`for-in` 반복문에 대한 자세한 것은 [흐름 제어(Control Flow)](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html)를 보세요.

### Half-Open Range Operator

반 개방 범위 연산자(`half-open range operator`) (`a..<b`)은 `a`에서 `b`까지의 범위를 정의하지만, b가 포함되지는 않습니다. 첫번째 값은 포함하지만 마지막 값은 포함하지 않기 때문에, 반 개방(half-open)이라고 합니다. 폐쇄된 범위 연산자 처럼, a는 반드시 b보다 크지 않아야 합니다. a가 b와 같은 값인 경우, 범위의 결과는 비어있을 것입니다.

반 개방 범위는 배열처럼 0을 기반(zero-based)으로 한 작업을 할때 특히 유용하며, 목록의 길이(포함하지 않음)를 계산할때 유용합니다.


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

배열이 4개의 항목을 가지고 있지만, 반 개방 범위이기 때문에,0..<count는 3(배열의 마지막 항목의 인덱스) 까지만 셉니다. 배열에 대해 더 자세한 것은 [배열(Arrays)](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html#ID107)를 보세요.

### One-Side Ranges

폐쇄 범위 연산자는 가능하면 한 방향으로 계속되는 범위 형태입니다. - 예를들어, 인덱스 2에서 배열 끝까지의 배열 요소를 모두 포함하는 범위입니다. 이 경우에, 범위 연산자의 한쪽 면의 값을 생략할 수 있습니다. 연산자가 한쪽에만 값을 가지므로 이러한 종류의 범위를 `단방향 범위(one-side range)`라고 합니다. 예를 들어:

```swift
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
```

반 개방 범위 연산자 또한 마지막 값으로된 단 방향 형식을 가지고 있습니다. 양쪽 방향에 값을 가질때 처럼, 마지막 값은 범위에 포함되지 않습니다. 예를 들어:

```swift
for name in names[..<2] {
    print(name)
}
// Anna
// Alex
```

단 방향 범위 연산자는 서브스크립트(subscripts) 뿐만 아니라, 다른 상황(contexts)에서도 사용될 수 있습니다. 시작이 명확하지 않기 때문에, 첫번째 값을 생략한 단방향 범위 연산자는 반복할 수 없습니다. 마지막 값이 생략된 단방향 범위는 반복할 수 있습니다. 하지만, 범위가 무한정 계속되기 때문에, 반복문에 대해 명시적인 종료 조건이 필요합니다. 아래 코드와 같이, 단방향 범위에 특정 값이 포함되어 있는지 확인할 수 있습니다.

```swift
let range = ...5
range.contains(7)   // false
range.contains(4)   // true
range.contains(-1)  // true
```

---

## Logical Operators

`논리 연산자(Logical operators)`는 Boolean 로직 값 true와 false를 수정하거나 결합합니다. Swift는 C 기반의 언어에서 제공하는 표준 논리 연산자 3가지를 지원합니

- 논리 NOT (`!a`)
- 논리 AND (`a && b`)
- 논리 OR (`a || b`)

### Logical NOT Operator

NOT 논리연산자(Logical NOT Operator) (`!a`)는 Boolean 값을 `true`를 `false`로, `false`를 `true`로 만듭니다.

NOT 논리연산자는 접두사(prefix) 연산자이고, 연산중인 값 바로 앞에 공백 없이 표시합니다. 다음 예제처럼 `"a 가 아니다"`로 읽을수 있습니다.

```swift
let allowedEntry = false 
if !allowedEntry { 
	print("ACCESS DENIED") 
	} 
// Prints "ACCESS DENIED"
```

`if !allowedEntry` 구문은 허용되지 않는 항목으로 읽을 수 있습니다. 다음 행은 허용되지 않는 항목이 true인 경우에만 실행됩니다; allowedEntry가 false인 경우입니다.

예제에서 처럼, Boolean 상수와 변수 이름을 주의깊게 사용하면, 코드를 읽기 쉽고 간결하게(concise) 유지하는데 도움이 되며, 이중 부정(double negatives)이나 혼란스러운 로직 상태를 피할수 있습니다.

### Logical OR Operator

OR 논리 연산자(logical OR operator) (`a || b`)는 두개의 인접한(adjacent) 파이프 문자(`|`)로 구성된 중위(infix) 연산자 입니다. 두개의 값중에 하나라도 `true`이면 전체 표현식이 `true`인 논리 표현식을 만들때 사용합니다.

위의 AND 논리 연산자처럼, OR `논리 연산자는 표현식에 연산 생략(short-circuit evaluation)`을 사용합니다. OR 논리 연산자의 왼쪽 부분이 true이면, 전체 표현식이 변경될수 없기때문에, 오른쪽 부분은 확인하지 않습니다.

아래 예제에서는, 첫번째 `Bool` 값(`hasDoorKey`)이 `false`이지만, 두번째 값(`knowsOverridePassword`)은 `true`입니다. 하나의 값이 `true`이기 때문에 전체 표현식은 true로 처리되고, 접근이 허용됩니다.

```swift
let hasDoorKey = false
let knowsOverridePassword = true
if hasDoorKey || knowsOverridePassword {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
}
// Prints "Welcome!"
```

### Combining Logical Operators

```swift
if enteredDoorCode && passedRetinaScan || hasDoorKey || knowsOverridePassword { 
	print("Welcome!") 
} else { 
	print("ACCESS DENIED") 
} 
// Prints "Welcome!"
```

다음 예제는 좀 더 길고 복합(compound) 표현식을 만들기 위해 `&&`과 `||`연산자를 사용하였습니다. 하지만 &&과 ||연산자는 두개의 값에 대해서만 연산하며, 실제로 3개의 작은 표현을 묶은 것입니다. 이 예제는 다음과 같이 읽을수 있습니다.

올바른 문(door)의 코드를 입력하고 망막 스캔을 통과하거나 유효한 문(door) 키를 가지고 있거나 비상 비밀번호를 알고 있는 경우에 접근이 허용됩니다.

`enteredDoorCode, passedRetinaScan, hasDoorKey`의 값을 기반으로, 처음 2개의 표현식은 false입니다. 하지만 비상 비밀번호를 알고 있으면, 전체 복합 표현식이 true가 됩니다.

> Note: Swift의 논리 연산자 &&과 ||은 여러개의 논리연산자에서 맨 왼쪽 표현식부터 먼저 계산하는 복합표현식을 의미하는 왼쪽 결합(left-associative)입니다.

### Explicit Parentheses

```swift
if (enteredDoorCode && passedRetinaScan) || hasDoorKey || knowsOverridePassword { 
	print("Welcome!") 
} else { 
	print("ACCESS DENIED") 
} 
// Prints "Welcome!"
```

괄호는 처음 두개의 값이 전체 로직에서 분리가능한 상태의 일부분인 것을 명확하게 해줍니다. 복합 표현식의 결과가 바뀌지는 않지만, 전체 의도를 명확하게 해줍니다. 언제나 가독성이 간결한 것을 선호합니다; 괄호는 의도를 명확히 하는데 도움을 주기 위해 사용합니다.

---



