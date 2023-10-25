---
layout:     post
title:      "Swift. 정리하기 1: Swift Language Guide-Basics"
subtitle:   "Swift Language Guide-Basics *"
date:       2018-04-11 16:35:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/cornflowers-5352633.jpg
thumbnail-img: /assets/post_img/background/cornflowers-5352633.jpg
share-img: /assets/post_img/background/cornflowers-5352633.jpg
toc: true
---

최종 수정일: 2018.10.01

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다!

[The Basics](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID309)<br>
[까칠 코더님 블로그](http://kka7.tistory.com/107?category=919617)


## 기초(The Basics)

Swift는 iOS, macOS, watchOS, tvOS 앱을 개발하는 새로운 프로그래밍 언어입니다. 그럼에도 불구하고, Swift의 많은 부분은 C와 Objective-C로 개발 경험으로 인해 익숙할 것입니다.

Swift는 정수형에 대해 `Int`, 부동소수점 값에 대해 `Double`와 `Float`, 불린 값에 대해 `Bool`, 텍스트 데이터에 대해 String을 비롯한, C와 Objective-C의 모든 기본적인 타입의 자체 버젼을 제공합니다. Swift는 3가지 주요 컬렉션 타입인 Array, Set, Dictionary의 강력한 버젼을 제공하며, [Collection Types](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-ID105)에서 설명되어 있습니다.

C 처럼, Swift는 고유한 이름으로 값을 저장하고 참조하기 위해 변수를 사용합니다. Swift는 또한 값을 변경할 수 없는 변수를 광범위하게 사용합니다. 이를 상수(constants)라하고, C에서의 상수보다 더 강력합니다. 상수는 사용됩니다. 값을 변경할 필요가 없을때 코드를 안전하고 의도를 명확하게 만들기 위해 Swift 전역에서 상수가 사용됩니다.

익숙한 타입 외에도, Swift는 튜플(tuples)과 같은 Objective-C에는 없는 고급 타입을 도입하였습니다. 튜플(tuples)은 값을 그룹화 해서 만들고 전달할 수 있습니다. 하나의 함수에서 여러개의 값들을 하나로 구성된(compound)값으로 반환하기 위해 튜플을 사용할 수 있습니다.

Swift는 또한 값이 없는 것을 처리하는 옵셔널(optional) 타입을 도입하였습니다. 옵셔널(optional)은 값이 있고 x와 같다. 또는 값이 전혀 없다 중 하나를 의미합니다. 옵셔널(optional)을 사용하는 것은 Objective-C에서 nil을 사용하는 것과 비슷하지만, 클래스 뿐만아니라, 모든 타입에서 동작합니다. 뿐만아니라 옵셔널(optionals)은 Objective-C에서의 nil포인터보다 안전하고 쓰임새가 많으며, Swift의 가장 강력한 기능의 핵심입니다.

Swift는 코드 작업시 값의 타입을 명확하게 해주는데 도움을 주는 언어를 의미하는 `타입에 안전한(type-safe)` 언어입니다. 코드에서 String이 필요한 경우에, `type-safe`는 실수로 Int가 전달되는 것을 막아줍니다. 마찬가지로 type-safe는 코드에서 옵셔널이 아닌 String이 필요한 경우에 옵셔널 String이 전달되는 것을 막아줍니다. `type-safe`는 개발 단계에서 가능한 빨리 오류를 잡고 수정하는데 도와줍니다.

---

## Constants and Variables 

상수(constants)와 변수(variables)는 특정 타입의 값(숫자 `10` 또는 문자열 `"Hello"`)과 연관된 이름(`maximumNumberOfLoginAttempts`또는 `welcomeMessage`)을 사용합니다. 상수(constant) 값은 한번 설정하면 변경할수 없는데 반하여(whereas), 변수(variable)는 나중에 다른 값으로 설정 할수 있습니다.

### Declaring Constants and Variables

`상수(constants)`와 `변수(variables)`는 사용되기 전에 반드시 선언되어야 합니다. let 키워드로 상수(constants)를 선언하고, var 키워드로 변수(variable)를 선언합니다. 다음은 사용자의 로그인 시도 횟수를 추적하기 위해 상수(constants)와 변수(variables)를 사용하는 예제 입니다.

```swift
let maximumNumberOfLoginAttempts = 10
var currentLoginAttempt = 0
```

이 코드는 다음과 같이 읽을 수 있습니다.

새로운 상수 `maxiumNumberOfLoginAttempts`를 선언하고, 값 10을 줍니다. 그리고나서, 새로운 변수 `currentLoginAttempt`를 선언하고, 초기 값으로 0을 줍니다

이 예제에서, 로그인 시도를 허용하는 최대 횟수는 최대 값이 절대 변하지 않기 때문에, 상수로 선언됩니다. 현재 로그인 시도한 횟수는 로그인 시도가 실패할때마다 값을 증가해야하기 때문에, 변수로 선언됩니다.

한 줄에 콤마(,)로 구분하여, 여러개의 상수나 여러개의 변수들을 선언할 수 있습니다.

```swift
var x = 0.0, y = 0.0, z = 0.0
```

> 주의 코드에서 저장된 값이 변하지 않는 경우에, 항상 let 키워드로 상수(constant)로 선언합니다. 저장한 값을 변경할 필요가 있는 경우에만 변수(variables)를 사용합니다.

### Type Annotations

`상수`나 `변수`가 저장할 수 있는 값의 타입을 명확히 하기 위해, 상수나 변수를 선언할때 타입을 `명시(type annotation)`할 수 있습니다. 상수나 변수 이름 뒤에 콜론(:)과 공백(space) 뒤에, 사용하고자 하는 타입의 이름을 사용하여 타입 명시(type annotation)를 작성합니다.

이 예제는 변수가 String 값을 저장할 수 있는 것을 나타내기 위해, wealcomMessage 변수에 대한 타입 명시를 제공합니다.

```swift
var welcomeMessage: String
```

이 선언에서 `콜론(:)`은 … 타입의 …을 의미하며, 위 코드는 다음과 같이 읽을 수 있습니다.

`welcomeMessage` 변수는 `String`타입으로 선언합니다.

String 타입의 구문은 어떤 String 값도 저장할 수 있다를 의미합니다. 저장할 수 있는 어떤 타입(또는 어떤 종류)으로 생각합니다.

`welcomeMessage` 변수는 오류없이 어떤 문자열 값으로도 설정할 수 있습니다.

```swift
welcomeMessage = "Hello"
```

한 줄에 같은 타입의 변수 여러개를 콤마로 구분하고, 마지막 변수 이름 뒤에 하나의 타입을 명시해서 정의할 수 있습니다.

```swift
var red, green, blue: Double
```

> 주의: 실제로 타입 명시를 작성할 일은 거의 없습니다. 선언하는 시점에 상수나 변수에 대해 초기값을 제공하는 경우에, Swift는 사용된 상수나 변수의 거의 대부분의 타입을 추론할 수 있으며, [안전한 타입과 타입 추론(Type Safety and Type Inference)](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html#ID322)에서 설명되어 있습니다. 위의 welcomMessage예제에서, 초기값이 제공되지 않고, welcomeMessage변수의 타입은 초기 값으로 추론되지 않고 타입 명시(type annotation)로 지정됩니다.

### Naming Constants and Variables

상수와 변수의 이름은 유니코드(Unicode) 문자들을 포함하여, 거의 모든 문자를 포함 할수 있습니다.

```swift
let π = 3.14159
let 你好 = "你好世界"
let 🐶🐮 = "dogcow"
```

상수와 변수 이름은 공백문자(whitespace characters), 수학 기호(mathematical symbols), 개인적으로 사용하는(또는 유효하지 않는) 유니코드, 선(line-)과 박스(box)를 그리는 문자들을 포함할수 없습니다. 숫자를 이름의 다른 곳에 넣을수 있지만, 숫자로 시작할 수는 없습니다.

특정 타입으로 상수나 변수를 한번 선언하면, 같은 이름이나 다른 타입의 값을 저장하도록 다시 선언할 수 없습니다. 상수를 변수로 또는 변수를 상수로 변경할 수도 없습니다.

> 주의: 상수나 변수가 예약된 Swift 키워드와 같은 이름이 필요한 경우에, 이름으로 사용할때 역따옴표(backticks `)로 키워드를 감싸줍니다. 그러나, 선택의 여지가 없는 경우를 제외하면 키워드를 이름으로 사용하는 것을 피합니다.

기존 변수의 값을 호환되는 타입의 다른 값으로 변경할 수 있습니다. 예제에서, `frendlyWelcom`의 값은 `"Hello!"`에서 `"Bonjour!"`로 변경됩니다.

```swift
var friendlyWelcome = "Hello!" friendlyWelcome = "Bonjour!" // friendlyWelcome is now "Bonjour!"
```

변수와는 다르게, 상수의 값은 설정한 뒤에는 변경할 수 없습니다. 변경을 시도하면 코드를 컴파일할때 오류가 보고됩니다.

### Printing Constants and Variables

`print(_:separator:terminator:)`함수를 사용하여 상수나 변수의 현재 값을 출력할 수 있습니다

`print(_:separator:terminator:)` 함수는 하나 이상의 값을 적절하게 출력하는 전역함수(global function) 입니다. 예를들어, Xcode에서 `print(_:separator:terminator:)` 함수는 Xcode의 "콘솔(console)" 영역에 출력합니다. `separator`과 `terminator` 매개변수는 기본값을 가지며, 함수 호출할때 생략할 수 있습니다. 기본적으로, 함수는 줄 바꿈(line break)을 추가하여 출력을 마칩니다. 줄 바꿈 없이 출력하려면, terminator에 빈 문자열을 입력합니다. - 예를 들어, print(someValue, terminator: ""). [기본 값이 있는 매개변수에 대한 정보는 기본 매개변수 값(Default Parameter Values)](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#ID169)을 보세요.

Swift는 긴 문자열에 자리표시자(placeholder) 처럼 상수나 변수의 이름을 포함시키기 위해 문자열 끼워넣기(string interpolation)을 사용하고, Swift는 상수나 변수의 현재값으로 교체합니다. 이름을 괄호(parentheses `()`)로 감싸고 열린 괄호(`()` 앞에 백슬러쉬(backslash `\`)를 붙여줍니다.

```swift
print("The current value of friendlyWelcome is \(friendlyWelcome)")
// Prints "The current value of friendlyWelcome is Bonjour!"
```

> 중요: 문자열 끼워넣기(string interpolation)로 사용할 수 있는 모든 옵션은 [문자열 끼워넣기(String Interpolation)](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html#ID292)에 설명되어 있습니다

---

## Comments

코드에서 스스로 주의하거나 기억해야하는 것 처럼, 실행할 수 없는 텍스트를 포함시키기 위해 주석(comments)을 사용합니다. 주석은 코드가 컴파일 될때 Swift 컴파일러에 의해 무시됩니다.

Swift에서의 주석은 C에서의 주석과 매우 비슷합니다. 한 줄(Single-line) 주석은 두개의 앞 슬래쉬(//)로 시작합니다.

```swift
// This is a comment.
```

여러 줄 주석(Multinline comments)는 앞 슬래쉬와 `별표(/*)로 시작하고 별표와 앞슬러쉬(*/)`로 끝납니다.

```swift
/* This is also a comment but is written over multiple lines. */
```

C에서의 여러 줄 주석과는 다르게, Swift에서의 여러 줄 주석은 다른 여러 줄을 내부에 중첩시킬 수 있습니다. 여러 줄 주석 블럭(block)을 시작하고나서 첫번째 블럭 내에서 두번째 여러 줄 주석을 시작하여 중첩된 주석을 만듭니다. 두번재 블럭이 닫히고나서 첫번째 블럭이 닫힘니다.

```swift
/* This is the start of the first multiline comment.
 /* This is the second, nested multiline comment. */
This is the end of the first multiline comment. */
```

중첩된 여러 줄 주석은 코드에 이미 여러 줄 주석을 포함하고 있어도, 커다란 코드 블럭을 빠르고 쉽게 주석 처리가 가능합니다.

---

## Semicolons

많은 다른 언어와 다르게, Swift는 코드에서 각 문장마다 세미콜론(;)을 사용하지 않아도 되며, 원하는 경우에는 사용할 수 있습니다. 하지만, 한 줄에서 여러개의 구분된 문장을 사용하는 경우에는 세미콜론(;)이 필요합니다.

```swift
let cat = "🐱"; print(cat)
// Prints "🐱"
```

---

## Inters

정수(Integers)는 `42`와 `-23`처럼 분수(fractional)로 구성되지 않는 숫자입니다. 정수는 부호가 있거나(signed)(양수, 0, 음수) 부호가 없는(unsigned)(양수, 0) 것 중 하나입니다.

Swift는 8, 16, 32, 64 비트 형태로 부호가 있고 부호가 없는 정수를 제공합니다. 이러한 정수는 C와 비슷한 이름 규칙(naming covention)을 따르며, 8비트 부호 없는 정수는 `UInt8`, 32비트 부호 있는 정수는 `Int32`입니다. Swift의 모든 타입과 마찬가지로, 정수 타입은 대문자로 된 이름을 가집니다.

### 정수 범위(Integer Bounds)
 
`min`과 `max`프로퍼티를 사용하여 각 정수 타입의 최소값과 최대값에 접근할 수 있습니다.

```swift
let minValue = UInt8.min  // minValue is equal to 0, and is of type UInt8
let maxValue = UInt8.max  // maxValue is equal to 255, and is of type UInt8
```

이러한 프로퍼티의 값은 숫자 타입(위의 예제에서 UInt8 처럼)의 적절한 크기이고 같은 타입의 다른 값과 함께 표현식에 사용할 수 있습니다.

### Int

대부분의 경우, 여러분의 코드에서 정수의 크기를 선택할 필요가 없습니다. `Swift`는 추가로 현재 플랫폼의 기본 워드(word) 크기와 동일한 크기를 갖는 Int 정수 타입을 제공합니다.

- 32비트 플랫폼에서 Int는 Int32와 같은 크기 입니다.
- 64비트 플랫폼에서 Int는 Int64와 같은 크기 입니다.


특정 정수 크기로 작업해야 하는 경우가 아니라면, 여러분의 코드에서 언제나 정수 값에 대해 Int를 사용합니다. 이것은 코드 일관성과 상호 운용성에 도움이 됩니다. 32비트 플랫폼에서, Int는 `-2,147,483,648`과 `2,147,483,647` 사이의 모든 값을 저장할 수 있고, 많은 정수 범위에 대해서 충분히 큽니다.

### UInt

Swift는 또한 현재 플랫폼의 순수한 워드(Word) 크기와 같은 크기인 부호없는 정수 타입 UInt를 제공합니다.

32비트 플랫폼에서, `UInt`는 `UInt32`와 같은 크기
64비트 플랫폼에서, `UInt`는 `UInt64`와 같은 크기

> 주의: UInt는 플랫폼의 순수한 워드(Word) 크기와 같은 크기로 부호없는 정수 타입이 필요한 경우에만 사용합니다. 그렇지 않은 경우, 음수를 저장하지 않는 경우에도 Int를 선호합니다. Int 정수 값에 일관성 있는 코드를 사용하면 상호 운용성이 좋아지고, 다른 정수 타입관의 변환을 피하게 해주고, 정수 타입 추론도 일시키켜주며, [타입 안정성과 타입 추론(Type Safety and Type Inference)](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID322)에 설명되어 있습니다.

---

## 부동 소수점 숫자(Floating-Point Numbers)

`부동 소수점 숫자(Floating-point numbers)`는 3.14159와 -273.15 처럼 `분수(fractional)`로 구성되어 있습니다.

부동 소수점 타입은 정수 타입보다 훨씬 넓은 범위의 값을 표현할 수 있고, Int에 저장할 수 있는 것보다 더 크거나 더 작은숫자들을 저장할 수 있습니다. Swift는 두가지 부동소수점 타입을 지원합니다.

- Double는 64비트 부동 소수점 숫자를 표현
- Float는 32비트 부동 소수점 숫자를 표현
 
> 주의
> Double은 최소한 소수점 이하 `15자리의 정확도`를 가지는데 반해, Float는 더 적은 `6자리의 정확도`를 가집니다. 여러분의 코드에서 사용하고자 하는 값의 특성과 범위에 따라 적절한 부동 소수점 타입을 사용합니다. 두가지 모두 유효한 경우에는, Double을 선호합니다.

---

## 타입 안전성과 타입 추론(Type Safety and Type Inference)

Swift는 타입에 안전한(type-safe) 언어입니다. 타입에 안전한 언어는 여러분의 코드에서 사용할 수 있는 값의 타입을 명확하게 해줍니다. 코드에서 `String`이 필요한 경우에, 실수로 `Int`를 전달할 수 없습니다.

Swift는 타입에 안전하기 때문에, 여러분의 코드를 컴파일 할때 타입을 확인(type checks)하고 타입이 일치하지 않는 타입을 오류로 표시해줍니다. 이것은 개발 도중에 가능한 빨리 오류를 잡고 고치는게 가능합니다.

타입을 확인(Type-checking)하는 것은 다른 타입의 값으로 작업할때 오류를 피하는데 도움이 됩니다. 하지만, 이것이 모든 상수와 변수의 타입을 지정해서 선언해야 한다는 것을 의미하지 않습니다. 값의 타입을 지정하지 않는 경우, Swift는 적절한 타입을 알아내기 위해 타입 추론(type inference)을 사용합니다. 타입 추론은 여러분의 코드를 컴파일 할때 단순히 값을 검토해서, 컴파일러가 특정 표현식의 타입을 자동으로 추론할 수 있게 해줍니다.

타입 추론(type inference) 때문에, Swift는 C나 Objective-C와 같은 언어들 보다 타입 선언이 훨씬 적게 필요합니다. 상수와 변수는 여전히 명시적으로 입력되지만, 여러분을 위해 타입을 지정하는 많은 일을 해줍니다.

타입 추론은 초기값으로 상수나 변수를 선언할때 특히 유용합니다. 종종 상수나 변수를 선언하는 시점에 리터럴 값(literal value or literal) 할당으로 끝내기도 합니다. (리터럴 값은 아래 예제에서 42와 3.14159처럼, 소스코드에 직접 표현하는 값입니다.)

예를 들어, 타입이 무엇인지 말하지 않고 새로운 상수에 42 리터럴 값을 할당할 경우에, Swift는 정수로 보이는 숫자로 초기화 되었기 때문에, 상수가 `Int`가 되길 원한다고 추론합니다.

```swift
let meaningOfLife = 42
// meaningOfLife is inferred to be of type Int
```

마찬가지로, 부동소수점(floating-point) 리터럴에 대한 타입을 지정하지 않는 경우에, Swift는 여러분이 Double로 생성하길 원한다고 추론합니다.

```swift
let pi = 3.14159
// pi is inferred to be of type Double
```

Swift는 부동 소수점 숫자의 타입을 추론할때면, 언제나 (Float 보다는)Double을 선택합니다.

하나의 표현식에서 정수와 부동소수점 리터럴을 결합하는 경우에는 문맥상 `Double` 타입으로 추론될 것입니다.

```swift
let anotherPi = 3 + 0.14159
// anotherPi is also inferred to be of type Double
```

리터럴 값 3은 제체적으로 명시된 타입이 없고, 더하기 부분에서 부동소수점(floating-point) 리터럴로부터 적절한 타입인 Double으로 추론됩니다.

---

## Numberic Literals

정수형 리터럴은 다음과 같이 작성할 수 있습니다.

- 10진수(decimal) 숫자는 접두사(prefix)없음
- 2진수(binary) 숫자는 0b 접두사 사용
- 8진수(octal) 숫자는 0o 접두사 사용
- 16진수(hexadecimal) 숫자는 0x 접두사 사용

다음에 오는 모든 정수형 리터럴의 10진수 값은 17입니다.

```swift
let decimalInteger = 17
let binaryInteger = 0b10001       // 17 in binary notation
let octalInteger = 0o21           // 17 in octal notation
let hexadecimalInteger = 0x11     // 17 in hexadecimal notation
```

부동소수점(floating-point) 리터럴은 10진수(접두사 없음) 또는 16진수(접두사 0x)가 될수 있습니다. 그것들은 언제나 소수점 양쪽에 숫자(또는 16진수 숫자)가 있어야 합니다. 10진수 부동소수점(float)에는 대문자나 소문자 `e`로 표시하는 지수(exponent)를 사용할 수 있습니다. 16진수 부동소수점(float)은 대문자나 소문자 `p`로 표시하는 지수(exponent)가 반드시 필요합니다.

`exp` 지수를 갖는 10진수 숫자의 경우에, 기본 숫자에 10exp 을 곱합니다.


- `1.25e2`는 1.25 x 10<sup>2</sup> 또는 125.0을 의미합니다.
- `1.25e-2`는 1.25 x 10<sup>2</sup> 또는 0.0125를 의미합니다.

`exp` 지수를 갖는 16진수 숫자의 경우에는, 기본 숫자에 2exp 을 곱합니다.

0xFp2는 15 x 2<sup>2</sup> 또는 60.0을 의미합니다.
0xFp-2는 15 x 2<sup>-2</sup> 또는 3.75를 의미합니다.

> 음수의 제곱승은 나누기로 표현됨 15 / (2 x 2) = 3.75

다음에 오는 모든 부동 소수점 리터럴의 10진수 값은 12.1875입니다.

```swift
let decimalDouble = 12.1875
let exponentDouble = 1.21875e1
let hexadecimalDouble = 0xC.3p0
```

숫자 리터럴을 읽기 쉽도록하는 추가 서식(extra formatting)을 사용할 수 있습니다. 정수와 부동소수점 모두 일기 쉽도록 추가적으로 0으로 채워넣을 수 있고 밑줄(_)을 사용할 수 있습니다. 리터럴 값에서 밑줄(_)은 아무 영향이 없는 서식(fromat)입니다.

```swift
let paddedDouble = 000123.456
let oneMillion = 1_000_000
let justOverOneMillion = 1_000_000.000_000_1
```

> 타입을 문자열로 확인해 보고 싶으면 변수 뒤에 `.dynamicType`를 붙인다
 
>>>>>>> e008bb5e2c367b5d60c87460a62707e6c82f4d59
---

## Numberic Literals

정수형 리터럴은 다음과 같이 작성할 수 있습니다.

- 10진수(decimal) 숫자는 접두사(prefix)없음
- 2진수(binary) 숫자는 0b 접두사 사용
- 8진수(octal) 숫자는 0o 접두사 사용
- 16진수(hexadecimal) 숫자는 0x 접두사 사용




## 숫자 형 변환(Numberic Type Conversion)

코드에서 음수가 아닌 것을 알고 있더라도, 모든 일반적인 목적(general-purpose)의 정수형 상수와 변수에 대해 Int타입을 사용합니다. 일반적인 상황에서 기본 정수형 타입을 사용하는 것은 코드에서 정수형 상수와 변수를 바로 사용할 수 있고, 정수형 리터럴 값에 대해 추론한 타입과 일치합니다.

외부 소스로 부터 명시적으로 크기가 지정된 데이터나 성능 메모리 사용량 또는 다른 최적화가 필요한, 특별한 작업이 필요할 때에만 다른 정수 타입을 사용하세요. 명시적으로 크기가 지정된 타입을 사용은 우연히 값이 오버플로우(overflow) 되는 것을 잡고 암시적으로 사용되는 데이터 타입을 기록하는데 도움이 됩니다.

### 정수형 형변환(Integer Conversion)

정수형 상수나 변수에 저장할 수 있는 숫자의 범위는 각 숫자 타입에 따라 다릅니다. Int8 상수나 변수는 `-128`과 `127` 사이의 숫자들을 저장할수 있으며, 반면에 UInt8 상수나 변수는 0과 255 사이의 숫자들을 저장할 수 있습니다. 크기가 지정된 정수형 타입의 상수나 변수에 맞지 않는 숫자는 여러분의 코드가 컴파일 될때 오류로 보고 됩니다.

```swift
let cannotBeNegative: UInt8 = -1
// UInt8 cannot store negative numbers, and so this will report an error
let tooBig: Int8 = Int8.max + 1
// Int8 cannot store a number larger than its maximum value,
// and so this will also report an error
```

각 숫자 타입은 다른 범위의 값을 저장할 수 있기 때문에, 상황에 따라 변환할 숫자 타입을 선택해야 합니다. 이러한 선택은 여러분의 코드에서 숨겨진 형변환 오류를 방지해주고 명백한 의도로 형변환 하는데 도움을 줍니다.

하나의 특정 숫자 타입을 다른 타입으로 형변환 하기 위해, 기존 값을 사용하여 원하는 타입의 새로운 숫자를 초기화 합니다. 아래 예제에서, 상수 `twoThousand`는 `UInt16` 타입이며, 반면에 상수 one는 UInt8 타입입니다. 이것들은 같은 타입이 아니기 때문에, 직접 더하기를 할수가 없습니다. 대신에, 이 예제는 one의 값으로 초기화된 새로운 UInt16을 생성하기 위해 UInt16(one)를 호출하고, 원래 위치에 그 값을 사용합니다.

```swift
let twoThousand: UInt16 = 2_000
let one: UInt8 = 1
let twoThousandAndOne = twoThousand + UInt16(one)
```

더하기 양쪽 모두가 이제는 UInt16이기 때문에 더하기가 가능합니다. 출력 상수(twoThousandAndOne)는 두개의 UInt16값의 합이기 때문에 UInt16 타입으로 추론됩니다.

SomeType(ofInitialValue)는 Swift 타입의 초기화를 호출하고 초기 값을 전달하는 기본적인 방법입니다. 내부적으로, UInt16은 UInt8값으로 초기화 하고, 이 초기화는 기존 UInt8로 부터 새로운 UInt16을 만드는데 사용됩니다. 여기에 모든 타입(any type)을 전달할수 없지만, - UInt16 초기화가 제공하는 타입이어야 합니다. 새로운 타입(자기가 정의한 타입)을 허용하는 초기화를 제공하기 위해 타입을 확장하는 것은 [확장(Extensions)](https://docs.swift.org/swift-book/LanguageGuide/Extensions.html#//apple_ref/doc/uid/TP40014097-CH24-ID151)에서 다룹니다.

### 정수와 부동소수점 형변환(Integer and Floating-Point Conversion)

정수형과 부동소수점 숫자 타입을 간의 형변환은 반드시 명시적으로 해야 합니다

```swift
let three = 3
let pointOneFourOneFiveNine = 0.14159
let pi = Double(three) + pointOneFourOneFiveNine
// pi equals 3.14159, and is inferred to be of type Double
```

여기에서, 상수 `three`의 값은 `Double`타입의 새로운 값을 만들기 위해 사용되며, 더하기 양쪽 모두 같은 타입입니다. 이러한 형변환 없이 더하기는 허용되지 않습니다.

부동소수점을 정수형으로 형변환하는 것도 반드시 명시적으로 해야 합니다. 정수형 타입은 `Double` 또는 `Float` 값으로 초기화될 수 있습니다.

```swift
let integerPi = Int(pi)
// integerPi equals 3, and is inferred to be of type Int
```

이와같이 부동 소수점 값을 새로운 정수형 값으로 초기화를 사용할때 항상 값이 잘리게 됩니다. 이것은 4.75가 4가 되고, -3.9가 -3이 된다는 의미입니다.

> 주의: 숫자 상수와 변수를 결합하는 규칙은 리터럴 숫자에 대한 규칙과는 다릅니다. 리터럴 숫자들은 명시적인 타입을 가지지 않기 때문에, 리터럴 숫자 3은 리터럴 숫자 0.14159와 직접적으로 더할수 있습니다. 이러한 타입은 컴파일러에 의해 처리되는 시점에 추론됩니다.

---

## Type Aliases

타입 별명(Type aliases)는 기존 타입에 대해 다른 이름을 정의합니다. `typealias` 키워드로 타입 별명을 정의합니다.

타입 별명(Type aliases)은 외부 소스로 부터 특정 크기의 데이터로 작업할때 처럼, 기존 타입을 문맥상 더 어울리는 이름으로 사용하고자 할때 유용합니다.

```swift
typealias AudioSample = UInt16
```

한번 정의된 타입 별명은, 원래 이름을 사용할수 있는 곳 어디에서든 사용할 수 있습니다.

```swift
var maxAmplitudeFound = AudioSample.min
// maxAmplitudeFound is now 0
```

여기에서, `AudioSample`는 UInt16에 대한 별명으로 정의 되었습니다. 그것은 별명이기 때문에, `maxAmplitudeFound` 변수에 대해 0인 초기 값을 제공하는, `AudioSample.min`호출은 실제로는 `UInt16.min`값을 호출합니다.

---

## Booleans

Swift는 `Bool`이라는 기본 `Boolean type`을 가지고 있습니다. Boolean 값은 `참(true)` 또는 `거짓(false)`이 도리수 있는 논리적인(logical) 값입니다. Swift는 true와 false라는 두가지 Boolean 상수값을 제공합니다.

```swift
let orangesAreOrange = true
let turnipsAreDelicious = false
```

`orangesAreOrange`와 `turnipsAreDelicious`의 타입은 `Boolean` 리터럴 값으로 초기화되기 때문에, Bool으로 추론됩니다. 위의 Int와 Double 처럼, 만들자마자 바로 true나 false를 설정하는 경우에 Bool 상수나 변수를 선언할 필요가 없습니다. 이미 알려진 타입의 다른 값으로 상수나 변수를 초기화 할때, 티입 추론(type inference)은 Swift 코드를 더 간결하고 읽기 쉽게 만들어 줍니다..

Boolean 값은 `if`문과 같이 조건문으로 작업할때 특히 유용합니다.

```swift
if turnipsAreDelicious { print("Mmm, tasty turnips!") } else { print("Eww, turnips are horrible.") } // Prints "Eww, turnips are horrible."
```

if문과 같은 조건문은 흐름제어(Control Flow)에서 더 자세히 다룹니다.

Swift의 타입 안전성(type safety)은 Bool에 대해 Boolean 값이 아닌(non-Boolean) 값으로 치환되는 것을 막아줍니다. 다음 예제는 컴파일시에 오류가 발생합니다.

```swift
let i = 1 if i { // this example will not compile, and will report an error }
```

하지만, 아래 예제는 유효합니다.

```swift
let i = 1
if i == 1 {
    // this example will compile successfully
}
```

---

## Tuples

`튜플(Tuples)` 여러개의 값들을 하나의 합성된 값으로 그룹화 합니다. 튜플에 있는 값은 어떤 타입이든지 가능하고 각각이 같은 타입이 아니어도 괜찮습니다.

예제에서, (404, "Not Found")는 HTTP 상태 코드(HTTP status code)를 설명하는 하나의 튜플입니다. 하나의 HTTP 상태 코드는 웹 페이지를 요청할때마다 웹서버로 부터 반환되는 특별한 값입니다. 요청한 웹 페이지가 존재하지 않을때 404 Not Found 상태 코드가 반환됩니다.

```swift
let http404Error = (404, "Not Found")
// http404Error is of type (Int, String), and equals (404, "Not Found")
```

HTTP 상태 코드에 두개의 구분된 값들을 주기 위해 튜플 (404, "Not Found")은 Int와 String을 함께 그룹화하였습니다 : 숫자와 사람이 읽을수 있는 설명입니다. 그것을 "(Int, String)" 타입의 튜플이라고 할수 있습니다.

어떤 타입의 순서로도(any permutation of type) 튜플을 만들수 있고, 많은 다른 타입을 포함할 수 있습니다. `(Int, Int, Int)` 또는 `(String, Bool)` 또는 원하는 타입의 순서로 튜플을 만들수 있습니다.

튜플의 컨텐츠를 별도의 상수나 변수로 `분해(decompose)` 할 수 있으며, 그냥 사용하면 됩니다.

```swift
let (statusCode, statusMessage) = http404Error
print("The status code is \(statusCode)")
// Prints "The status code is 404"
print("The status message is \(statusMessage)")
// Prints "The status message is Not Found"
```

튜플의 값의 일부만 필요한 경우에는, 튜플을 분해할때 밑줄(_)로 튜플의 일부를 무시하도록 합니다.

```swift
let (justTheStatusCode, _) = http404Error
print("The status code is \(justTheStatusCode)")
// Prints "The status code is 404"
```

그렇지 않으면, 0으로 시작하는 인덱스 번호를 사용해서 튜플의 개별 요소의 값을 사용합니다.

```swift
print("The status code is \(http404Error.0)")
// Prints "The status code is 404"
print("The status message is \(http404Error.1)")
// Prints "The status message is Not Found"
```

튜플을 정의할때 튜플에 있는 개별 요소들에 이름을 붙일수 있습니다.

```swift
let http200Status = (statusCode: 200, description: "OK")
```

튜플 요소에 이름을 붙인 경우에, 그 요소 이름을 사용하여 요소들의 값을 사용할수 있습니다.

```swift
print("The status code is \(http200Status.statusCode)")
// Prints "The status code is 200"
print("The status message is \(http200Status.description)")
// Prints "The status message is OK"
```

튜플은 함수의 반환 값으로 특히 유용합니다. 웹페이지를 검색하려는 함수는 페이지 검색의 성공 또는 실패를 설명하기 위해 `(Int, String)` 튜플 타입을 반환합니다. 각각 다른 타입이며, 두개로 구분된 값을 튜플로 반환하는 것이 하나의 타입만을 반환하는 것보다 더 유용한 정보를 제공합니다. 더 자세한 정보는 [함수에서 여러개의 값 반환하기(Functions with Multiple Return Values)](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#ID164)를 보세요.

> 주의: 튜플은 관련된 값들을 임시로 그룹화하는데 유용합니다. 튜플은 복잡한 데이터 구조를 만들기에는 적합하지 않습니다. 데이터 구조가 임시로 사용하는 것이 아니라 지속적으로 사용하는 것이라면, 튜플보다는 클래스와 구조체를 사용하는 것이 더 좋습니다. 더 자세한 정보는 구조체와 클래스(Structures and Classes)를 보세요.

---

## Optionals 

`옵셔널(optionals)`은 값이 없을 수 있는 상황에서 사용합니다. 옵셔널은 두가지 가능성을 표현합니다. 값이 있고 그 값을 사용하기 위해 언래핑(unwrap)할수 있거나, 값이 전혀 없다


> 옵셔널의 개념은 C나 Objective-C에서는 존재하지 않습니다. Objective-C에서 가장 가까운것으로는 메소드로 부터 `nil`을 반환하거나 객체를 반환하는 것이며, `nil`은 유효한 객체가 없다를 의미합니다. 하지만 이것은 객체에서만 동작합니다-구조체, 기본 C 타입, 열거형 값에서는 동작하지 않습니다. 이러한 타입들의 경우에, Objective-C 메소드는 일반적으로 값이 없음을 나타내기 위해 (`NSNotFound`)를 반환합니다. 이 접근법은 메소드의 호출자가 테스트할 특정 값을 알고 있으며, 이를 확인해야하는 것을 기억하고 있다는 것을 가정합니다. Swift의 옵셔널은 특별한 상수가 필요 없으며, 모든 타입에 대해서 값이 없다는 것을 나타냅니다.

### nil 

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

### If Statements and Forced Unwrapping

옵셔널이 `nil`인지 비교하여, 옵셔널에 값을 포함하고 있는지 확인하기 위해서 if 문을 사용할수 있습니다. ~와 같다(equal to) 연산자 (==) 또는 ~와 같지 않다(not equal to) 연산자(!=)를 사용하여 비교합니다.

옵셔널이 값을 가지고 있는 경우, `nil`과 같지 않다(not equal to)로 간주합니다.

```swift
if convertedNumber != nil { print("convertedNumber contains some integer value.") } // Prints "convertedNumber contains some integer value."
```

옵셔널에 값이 있다고 한번 확인하면, 이후로는 옵셔널의 이름 끝에 느낌표(!)를 붙여서 값을 사용할 수 있습니다. 느낌표(!)는 옵셔널이 확실히 값을 가지고 있는 것을 알고 있다라는 의미입니다. 이것을 옵셔널 값의 강제 언래핑(forced unwrapping)이라고 합니다

```swift
if convertedNumber != nil {
    print("convertedNumber has an integer value of \(convertedNumber!).")
}
// Prints "convertedNumber has an integer value of 123."
```

if문에 대해 더 자세한 내용은 흐름제어(Control Flow)를 보세요.


> 주의: 옵셔널 값이 존재하지 않을때 !를 사용하려고 하면 런타임(runtime) 오류가 발생합니다. 값을 !를 사용해서 강제 언래핑 하기전에, 항상 옵셔널이 nil이 아닌 값을 가지고 있는지 확인해야 합니다.

### Optional binding 

옵셔널이 값을 포함하는지 알기 위해서 옵셔널 바인딩(optional binding)을 사용하고, 만약 값이 있다면, 그 값을 임시 상수나 변수로 사용할 수 있습니다. 옵셔널 바인딩은 옵셔널 안쪽에 값을 확인하기 위해 하나의 동작으로 if문과 while문에서 사용될수 있고, 상수나 변수로 값을 추출합니다. if와 while문은 [흐름제어(Control Flow)에](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html) 더 자세히 설명되어 있습니다.

다음과 같이 if문에 대한 옵셔널 바인딩을 작성합니다.

```swift
if let [constantName] = [someOptional] {
    [statements]
}
```

[옵셔널(Optionals)](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html#ID330) 섹션의 예제에 있는 possibleNumber를 강제 언래핑이 아닌 옵셔널 바인딩으로 다시 작성할 수 있습니다.


```swift
if let actualNumber = Int(possibleNumber) { 
	print("\"\(possibleNumber)\" has an integer value of \(actualNumber)") 
} else { 
	print("\"\(possibleNumber)\" could not be converted to an integer") 
} 
// Prints ""123" has an integer value of 123"
```

이 코드는 다음과 같이 해석할 수 있습니다.

`Int(possibleNumber)`에 의해 반환된 옵셔널 Int가 값을 포함하고 있는 경우에, 옵셔널에 포함된 값을 새로운 상수 actualNumber에 설정합니다.

변환이 성공하면, `actualNumber` 상수는 `if`문의 첫번째 분기(branch)안에서 사용할 수 있습니다. 그 값은 이미 옵셔널에 포함된 값으로 초기화 되었고, 값을 사용할때 접미사로 !를 붙일 필요가 없습니다. 이 예제에서, actualNumber은 단순히 변환된 결과를 출력하기 위해 사용됩니다.

옵셔널 바인딩으로 상수와 변수 둘 다 사용할 수 있습니다. if문의 첫번째 분기에서, actualNumber의 값을 사용하기 원하는 경우, `if var actualNumber`을 사용할 수 있고, 옵셔널에 포함된 값은 상수가 아닌 변수로 사용할 수 있습니다.

필요한 경우에 하나의 `if`문에 여러개의 옵셔널 바인딩과 Boolean조건들을 `콤마(,)`로 구분하여 사용할수 있습니다. 옵셔널 바인딩에 있는 모든 값은 `nil`이거나 `Boolean`조건이 false인 경우에, `if`문의 조건은 `false`로 간주됩니다. 다음에 오는 if문들은 동일합니다(equivalent).

```swift
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


> Note: `if` 문에서 옵셔널 바인딩으로 생성된 상수와 변수는 `if`문의 본문(body)에서만 사용할 수 있습니다. 이와는 다르게, `guard` 문으로 생성된 상수와 변수는 `guard`문 다음에 오는 코드에서 사용할수 있으며, [이른 탈출(Early Exit)](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID525)에 설명되어 있습니다.

### Implicitly Unwrapping Optionals

위에서 설명한 것처럼, 옵셔널은 상수나 변수가 값 없음(no value)을 저장할 수 있습니다. 옵셔널이 값이 존재하는지 보기 위해, `if`문으로 확인할 수 있고, 옵셔널의 값이 존재하는 경우에 그 값을 사용하기 위해, 옵셔널 바인딩으로 조건부 언래핑(conditionally unwrapped) 할 수 있습니다.

간혹 프로그램의 구조상 옵셔널에 처음 값이 설정된 이후에, `항상(always)` 값을 가지고 있는게 확실한 경우가 있습니다. 이 경우에, 항상 안전하게 값을 가지고 있는 것을 가정할수 있기 때문에, 사용할때마다 옵셔널의 값을 확인하고 언래핑 해줘야 하는 것을 제거하는데 유용합니다.

이런 옵셔널 종류를 암시적으로 언래핑된 옵셔널(implicitly unwrapped optionals) 라고 정의합니다. 옵셔널 타입 뒤에 물음표(`String?`)대신에 느낌표(`String!`)를 붙여서 암시적으로 언래핑된 옵셔널을 작성합니다.

옵셔널 값이 처음 정의된 직후에 존재하고 그 이후에 언제나 존재하고 있다는 것을 가정할때 암시적으로 언래핑된 옵셔널이 유용합니다. Swift에서 클래스 초기화 할때 암시적으로 언래핑된 옵셔널을 주로 사용하며, [소유하지 않은 참조와 암시적으로 언래핑된 옵셔널 프로퍼티(Unowned References and Implicitly Unwrapped Optional Properties)](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html#ID55)에 설명되어 있습니다.

암시적으로 언래핑된 옵셔널은 내부적으로(behind the scenes) 일반 옵셔널 바인딩이지만, 옵셔널이 아닌 값 처럼 사용할수 있으며, 옵셔널 값을 사용할때마다 언래핑 할 필요가 없습니다. 다음 예제는 명시적으로 래핑된 `String`값을 사용할때, 옵셔널 문자열과 암시적으로 언래핑된 옵셔널 문자열간의 차이를 보여줍니다.

```swift
let possibleString: String? = "An optional string."
let forcedString: String = possibleString! // requires an exclamation mark

let assumedString: String! = "An implicitly unwrapped optional string."
let implicitString: String = assumedString // no need for an exclamation mark
```

암시적으로 언래핑된 옵셔널을 사용할때마다 옵셔널이 자동으로 언래핑된다고 생각할 수 있습니다. 사용할때마다 옵셔널의 이름 뒤에 느낌표(!)를 붙이는 것보다, 선언 할때 옵셔널의 타입 뒤에 느낌표(!)를 붙이는게 더 좋습니다.

> Note: 암시적으로 언래핑된 옵셔널이 nil이고 래핑된 값을 사용하려고 하는 경우, 런타임(runtime) 오류가 발생할 것입니다. 그 결과는 값이 포함하지 않는 일반 옵셔널 뒤에 느낌표(!)를 붙이는 것과 정확히 같습니다.

암시적으로 언래핑된 옵셔널이 값을 포함하고 있는지 확인하기 위해서, 일반 옵셔널처럼 처리할수 있습니다.

```swift
if assumedString != nil {
    print(assumedString!)
}
// Prints "An implicitly unwrapped optional string."
```

하나의 문장에서 값을 확인하고 언래핑하기 위해서, 옵셔널 바인딩으로 암시적으로 언래핑된 옵셔널을 사용할 수 있습니다.

> Note: 나중에라도 nil이 될 가능성이 있는 경우에는, 암시적으로 언래핑된 옵셔널을 사용하지 마세요. 변수가 살아 있는 동안에 nil 값을 확인할 필요가 있는 경우에는 일반 옵셔널 타입을 사용하세요.



---

## Error Handling 

프로그램이 실행되는 동안에 발생할수 있는 오류 조건을 처리하기 위해 `오류 처리(Error Handling)`을 사용합니다.

옵셔널과는 다르게, 함수의 성공이나 실패 또는 값이 존재하거나 없는지에 사용할수 있고, 필요한 경우에는 프로그램의 다른 부분에 오류를 전달합니다.

함수에 오류 조건이 발생할때, `오류를 던집니다(throws)`. 함수 호출자는 `오류를 잡을 수(catch)`있고 적절한 처리를 할 수 있습니다.

```swift
func canThrowAnError() throws {
    // this function may or may not throw an error
}
```

함수 선언에서 `throws` 키워드를 포함해서 오류를 던질 수 있다는 것을 알려줍니다. 함수를 호출할때 오류를 던질 수 있으며, 표현식 앞에 `try` 키워드를 붙일 수 있습니다.

Swift는 `catch`절이 처리될때까지, 현재 범위에서 외부로 오류를 자동으로 전달합니다


```swift
do {
    try canThrowAnError()
    // no error was thrown
} catch {
    // an error was thrown
}
```

`do`문은 하나 이상의 `catch`절에 오류를 전달할수 있는 새로운 범위를 만듭니다.

다음은 다른 오류 조건을 처리하기 위해 사용되는 오류 처리 방법을 보여주는 예제입니다.


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

예제에서, `makeASandwich()` 함수는 깨끗하지 못한 접시를 사용하거나 재료가 빠진 경우에 오류를 던질 것입니다. `makeASandwich()`는 오류를 던질수 있기 때문에, 그 함수는 `try` 표현식에서 포함하여(wrapped) 호출합니다. `do`문에서 함수 호출을 포함하며, 모든 오류는 제공된 catch절에 전달될 것입니다.

오류가 없는 경우에, `eatASandwich()` 함수가 호출됩니다. `SandwichError.outOfCleanDishes`와 일치하는 오류가 발생하는 경우에, `washDishes()` 함수가 호출될 것입니다. `SandwichError.missingIngredients`와 일치하는 오류가 발생하는 경우에, `catch` 패턴에 의해 캡쳐된 `[String]`값과 함께 `buyGroceries(_:)` 함수가 호출됩니다.

오류 던지기(Throwing), 잡기(catching), 전달하기(propagating)은 [오류 처리(Error Handling)](https://docs.swift.org/swift-book/LanguageGuide/ErrorHandling.html)에서 매우 자세하게 설명되어 있습니다.

---

## Assertions and Preconditions

`정하기(Assertions)`와 `필수조건(preconditions)`은 런타임에 발생하는 것을 확인합니다. 이후의 코드를 실행하기 전에 필수(essential) 조건을 만족하는지 확인하기 위해 사용합니다. 가정하기(assertions)와 필수조건(precondition)에서 Boolean 조건이 `true`인 경우에, 코드는 평소처럼 계속 실행됩니다. 그 조건이 `false`인 경우에, 프로그램의 현재 상태는 유효하지 않습니다; 코드 실행은 끝나고, 앱은 종료됩니다.

코딩하면서 가정한 (assumptions)것과 기대한(expectations) 것을 표현하기 위해서 가정하기(assertions)와 필수조건(preconditions)을 사용하며, 코드의 일부로 포함할 수 있습니다. 가정하기(Assertions)는 개발 중에 실수하고 잘못된 가정을 하는 것을 찾는데 도움이 되고, 필수조건(preconditions)은 제품(production)에서 문제를 발견하는데 도움이 됩니다.

런타임에 기대하는 것을 확인하는 것 외에도, 정하기(assertions)와 필수조건(preconditions)은 코드 내에서 유용한 문서 형식(form)이 됩니다. 위의 오류 처리(Error Handling)에서 논의된 오류 조건과는 다르게, 가정하기(assertions)와 필수조건(preconditions)은 복구 가능하거나 예상되는 오류에서는 사용할수 없습니다. 가정하기(assertions)와 필수조건(preconditions)이 실패하는 것은 프로그램의 상태가 유효하지 않다는 것을 나타내기 때문에, 실패한 가정(assertion)을 잡을수(catch) 있는 방법이 없습니다.

가정하기(assertions)와 필수조건(preconditions)는 잘못된 조건이 발생하지 않도록 설계하는데 사용할 수 있습니다. 하지만, 유요한 데이터를 사용하기 위해 사용하고 유효하지 않는 상태가 발생한 경우에 앱을 예측 가능하게 종료하고, 그 문제를 일찍 디버깅하기 쉽도록 도와줍니다. 유효하지 않는 상태가 감지되는 즉시 실행을 멈추면 유효하지 않은 상태로 인한 손상을 줄이는데 도움이 됩니다.

가정하기(assertions)와 필수조건(preconditions) 차이는 확인하는 시점입니다. 가정하기(assertions)는 디버그 빌드에서만 확인되지만, 필수조건(preconditions)는 디버그와 배포 버젼(production build) 모두에서 확인됩니다. 배포버젼(production build)에서는, 가정하기(assertion) 내부 조건은 수행되지 않습니다. 이는 배포 버젼의 성능에 영향을 미치지 않고, 개발하는 과정에서 원하는데로 수많은 가정하기(assertion)을 사용할 수 있다는 것을 의미합니다.

### Debugging with Assertions

Swift 표준 라이브러리에서 [assert(:file:line:)](https://developer.apple.com/documentation/swift/1541112-assert) 함수를 사용해서 가정하기(asssertion)을 작성합니다. 이 함수는 표현식에 true나 false로 처리하여 전달하고 조건의 결과가 false인 경우에 메시지를 보여줍니다. 예를 들어:

```swift
let age = -3
assert(age >= 0, "A person's age can't be less than zero.")
// This assertion fails because -3 is not >= 0.
```

이 예제에서, age >= 0이 true인 경우에 코드를 계속 실행합니다, 즉 age의 값은 음수가 아닌 경우입니다. 위의 코드에서와 같이 age의 값이 음수인 경우에, age >= 0 조건이 false이고, 가정하기(assertion)는 실패하며, 앱은 종료됩니다.

가정하기(assertion) 메시지를 생략할 수 있습니니다. 예를들어, 조건을 평범하게(prose) 반복할 것입니다.

```swift
assert(age >= 0)
```

조건을 이미 확인한 코드의 경우에,

이미 조건을 확인한 코드의 경우에, 가정하기(assertion)가 실패한 것을 나타내기 위해 [assertionFailure(_:file:line:)](https://developer.apple.com/documentation/swift/1539616-assertionfailure)함수를 사용합니다. 예를 들어:

```swift
if age > 10 { 
	print("You can ride the roller-coaster or the ferris wheel.") 
	} else if age > 0 { 
	print("You can ride the ferris wheel.") 
	} else { 
	assertionFailure("A person's age can't be less than zero.") 
}
```

### Enforcing Preconditions

조건이 fasle일 가능성이 있을때마다 필수조건(precondition)은 사용하지만, 코드가 계속 실행되는 경우에는 틀림없이(definitely) true 입니다. 예를 들어, 필수조건(precondition)은 서브스크립트가 범위를 벗어나지 않았는지, 또는 함수가 유효한 겂을 전달했는지 확인하기 위해 사용합니다.

필수조건(precondition)은 [precondition(::file:line:)](https://developer.apple.com/documentation/swift/1540960-precondition) 함수 호출하여 작성합니다. 이 함수는 true 또는 false로 처리하는 표현식에 전달하고 조건의 결과가 false인 경우에 메시지를 보여줍니다. 예를들어:

```swift
// In the implementation of a subscript... precondition(index > 0, "Index must be greater than zero.")
```

실패가 발생했음을 나타내기 위해 [preconditionFailure(_:file:line:)](https://developer.apple.com/documentation/swift/1539374-preconditionfailure) 함수를 호출할 수 있습니다. 예를들어, switch 문의 default case인 경우에, 모든 유효한 입력 데이터는 switch의 다른 case들 중 하나에서 처리되어야 합니다.

> Note: 검사하지 않는(`-Ounchecked`) 모드에서 컴파일하는 경우, 필수조건(preconditions)은 확인되지 않습니다. 컴파일러는 필수조건(preconditions)이 항상 true인 것을 가정하고, 코드에 따라 최적화합니다. 하지만, fatalError(_:file:line:) 함수는 최적화 설정과 관계없이 항상 실행을 중단합니다.
>
> 프로토타입(prototyping)과 초기개발 중에 아직 구현되지 않은 기능을 구현하기 위해 `fatalError(_:file:line:)`함수를 사용하여, fatalError("Unimplemented")를 작성할 수 있습니다. 치명적인(fatal) 오류는 최적화되지 않기 때문에, 가정하기(assertions)나 필수조건(preconditions)과는 다르게, `구현된 부분(stub implementation)을` 만나면 항상 실행이 중단되는 것을 확신 할 수 있습니다.


---



