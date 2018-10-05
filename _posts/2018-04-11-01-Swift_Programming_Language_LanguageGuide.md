---
layout:     post
title:      "Swift. 정리하기 1: Swift Language Guide-Basics"
subtitle:   "Swift Language Guide-Basics *"
date:       2018-04-11 16:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

[최종 수정일: 2018.10.01]

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

## Optionals 

`옵셔널(optionals)`은 값이 없을 수 있는 상황에서 사용합니다. 옵셔널은 두가지 가능성을 표현합니다. 값이 있고 그 값을 사용하기 위해 언래핑(unwrap)할수 있거나, 값이 전혀 없다


> 옵셔널의 개념은 C나 Objective-C에서는 존재하지 않습니다. Objective-C에서 가장 가까운것으로는 메소드로 부터 `nil`을 반환하거나 객체를 반환하는 것이며, `nil`은 유효한 객체가 없다를 의미합니다. 하지만 이것은 객체에서만 동작합니다-구조체, 기본 C 타입, 열거형 값에서는 동작하지 않습니다. 이러한 타입들의 경우에, Objective-C 메소드는 일반적으로 값이 없음을 나타내기 위해 (`NSNotFound`)를 반환합니다. 이 접근법은 메소드의 호출자가 테스트할 특정 값을 알고 있으며, 이를 확인해야하는 것을 기억하고 있다는 것을 가정합니다. Swift의 옵셔널은 특별한 상수가 필요 없으며, 모든 타입에 대해서 값이 없다는 것을 나타냅니다.

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

## Reference 

[The Basics](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID309)