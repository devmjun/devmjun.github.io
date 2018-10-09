---
layout:     post
title:      "Swift. 정리하기 8: Swift Language Guide-Enumerations"
subtitle:   "Swift Language Guide-Enumerations"
date:       2018-04-13 07:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Enumerations](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Enumerations.html#//apple_ref/doc/uid/TP40014097-CH12-ID145)<br>
[까칠 코더님 블로그](http://kka7.tistory.com/114?category=919617)

---

## Enumerations

열거형(`enumeration`)은 관련된 값의 그룹에 대해 공통 타입을 정의하고 코드 내에서 타입에 `안전한(type-safe)` 방법으로 값을 작업할 수 있습니다.

C에 익숙하다면, C 열거형 관련 이름을 정수형 값 세트(set)에 할당하는 것을 알고 있을것입니다. Swift에서 열거형은 훨씬 더 유연하고, 열거형의 각 case에 대해 값을 제공할 필요가 없습니다. 각 열거형 case에 대한 값(원시(raw) 값)을 제공한다면, 그 값은 문자열, 문자, 정수형이나 실수형 타입도 될수 있습니다.

그 대신에, 열거형 case는 각기 다른 case 값으로 저장되도록 모든 타입의 관련된 값을 다른 언어의 unions나 variants 처럼, 지정할 수 있습니다. 하나의 열거형 일부로 관련된 case들의 공통 세트(set)를 정의 할수 있으며, 각각 관련된 타입에 적절한 다른 값을 가집니다.

Swift에서 열거형은 그 자체로(in there own right) `일류 클래스(first-class)` 입니다. 열거형의 현재 값에 대한 추가적인 정보를 제공하기 위해 계산된 프로퍼티(computed properties)와 열거형이 표현하는 값에 관련된 기능을 제공하는 인스턴스 메소드와 같은, 전통적으로 클래스에서만 지원되는 많은 기능등을 채택했습니다. 열거형은 초기 case 값을 제공하기 위한 초기화를 정의할 수 있으며, 원래 구현을 넘어서 기능을 확장할 수 있고, 표준 기능을 제공하기 위해 `프로토콜을 준수(conform)` 할 수 있습니다.

이러한 기능에 대해 자세히 보려면, [프로퍼티(Properties)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID254), [메소드(Methods)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Methods.html#//apple_ref/doc/uid/TP40014097-CH15-ID234), [초기화(Initialization)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID203), [확장(Extensions)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Extensions.html#//apple_ref/doc/uid/TP40014097-CH24-ID151), [프로토콜(Protocols)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID267)을 보세요.

---

## Enumeration Syntax 

열거형은 enum 키워드를 사용하고 중괄호 쌍(`{}`) 안쪽에 전체 정의를 넣습니다.

```swift
enum SomeEnumeration {
    // enumeration definition goes here
}
```

다음은 나침반의 4방위에 대한 예제입니다.

```swift
enum CompassPoint {
    case north
    case south
    case east
    case west
}
```

열거형(`north, south, east, west`)에서 정의된 값들은 `열거형 케이스(enumeration cases)`입니다. 새로운 열거형 케이스를 도입하기 위해case 키워드를 사용합니다.


> Note: C와 Objective-C와는 다르게, Swift 열거형 케이스를 만들때 기본적으로 `정수형 값이 할당되지 않습니다.` 위의 CompassPoint 에제에서, north, south, east, west는 암시적으로 0, 1, 2, 3와 같지 않습니다. 대신에, 다른 열거형 케이스는 명시적으로 정의된 CompassPoint의 타입이며 그 자체만으로도(in their own right) 완전히 독립적인(fully-fledged)인 값입니다.

한줄에 여러개의 케이스들을 콤마(`,`)로 구분하여 나타낼수 있습니다.

```swift
enum Planet {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}
```

각각 정의한 열거형은 새로운 타입을 저으이합니다. Swift에서의 다른타입처럼, 이름(CompassPoint 와 Planet 처럼)을 대문자로 시작해야 합니다. 열거형 타입은 복수형(plural) 보다는 단수형(singular) 이름을 붙이며, 분명하게(self-evident) 읽을수 있게 합니다.

```swift
var directionToHead = CompassPoint.west
```

`directionToHead`의 타입은 초기화될때 `CompassPoint`에서 가능한 값 중 하나로 추론됩니다. `directionToHead`가 `CompassPoint`로 한번 선언되고나면, . 문법(shorter dot syntax)을 사용해서 다른 CompassPoint 값으로 설정할 수 있습니다

```swift
directionToHead = .east
```

`directionToHead`의 타입은 이미 알고 있고, 값을 설정할때 타입을 제거(drop)할수 있습니다. 이것은 명시적인 타입의 열거형값으로 작업할때 가독성을 높여줍니다.


---

## Matching Enumeration Values with a Switch Statement

`switch` 문으로 개개의 열거형 값들을 매칭할 수 있습니다

```swift

directionToHead = .south
switch directionToHead {
case .north:
    print("Lots of planets have a north")
case .south:
    print("Watch out for penguins")
case .east:
    print("Where the sun rises")
case .west:
    print("Where the skies are blue")
}
// Prints "Watch out for penguins"
```

이 코드를 다음과 같이 읽을수 있습니다

`directionToHead`의 값을 검토합니다. .north와 같은 경우에, "많은 행성이 북쪽이 있습니다(Lots of plants have a north)"을 출력합니다. .sourth와 같은 경우에, "펭귄을 조심해(Watch out for penguins) "를 출력합니다.
…등등.

[흐름제어(Control Flow)](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html)에서 설명했던것 처럼, `switch`문은 열거형 케이스를 구성할때 완벽해야(`exhaustive`) 합니다. .west가 생략된 경우에, CompassPoint 케이스의 완성된 목록을 고려하지 않았기 때문에, 코드는 컴파일되지 않습니다. 완전함(exhaustiveness)을 요구하는 것은 열거형 케이스를 실수로 빠뜨리지 않게 해줍니다.

모든 열거형 케이스에 대해 적절한 케이스를 제공하지 못할때, 명시적으로 언급되지 않은 모든 케이스를 처리하기 위해 `default` 케이스를 제공할 수 있습니다.

```swift
let somePlanet = Planet.earth
switch somePlanet {
case .earth:
    print("Mostly harmless")
default:
    print("Not a safe place for humans")
}
// Prints "Mostly harmless"
```

---

## Iterating over Enumeration Cases

일부 열거형의 경우에, 열거형 케이스의 모든 컬렉션(collection)을 가지고 있는 것이 유용합니다. 열거형 이름 뒤에 : `CaseIterable`을 작성하여 이를 활성화 합니다. Swift는 열거형의 모든 케이스들의 컬렉션을 allCases 프로퍼티를 사용합니다.

```swift
enum Beverage: CaseIterable {
    case coffee, tea, juice
}
let numberOfChoices = Beverage.allCases.count
print("\(numberOfChoices) beverages available")
// Prints "3 beverages available"
```

위 예제에서, Beverage열거형의 모든 케이스들을 포함하는 컬렉션을 사용하기 위해 `Beverage.allCases`를 사용합니다. allCases를 다른 컬렉션 타입처럼 사용할 수 있습니다. - 컬렉션의 요소들은 열거형 타입의 인스턴스이며, 이 경우에 Beverage 값입니다. 위 예제는 케이스가 얼마나 많은지 갯수를 세고, 아래 예제는 for 반복문을 사용하여 모든 케이스를 반복합니다.

```swift
for beverage in Beverage.allCases {
    print(beverage)
}
// coffee
// tea
// juice
```

이 문법은 위 예제에서 열거형이 CaseIterable 프로토콜을 준수하는 것을 표시하여 사용되었습니다. 프로토콜에 대한 자세한 정보는 [프로토콜(Protocols)](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html)을 보세요.

---

## Associated Values

이전 섹션의 예제에서 어떻게 열거형의 case들이 그 자체로 정의된(그리고 타입화 된) 값이되는지 보여줍니다. `Plant.earth`에 상수나 변수를 설정할 수 있고, 나중에 이 값을 확인할 수 있습니다. 하지만, 이러한 case 값 옆에 다른 타입의 연관된 값(associated values)을 저장할 수 있는 것이 유용할 때가 있습니다. 이것은 case 값으로 추가적으로 사용자 정의된 정보를 저장하는것이 가능하고, 코드에서 case를 사용할때마다 정보가 달라지는 것을 허용합니다.

Swift 열거형은 주어진 모든 타입과 연관된 값을 저장하도록 정의할 수 있고, 필요한 경우 값 타입은 열거형의 각 case에 따라 다를수 있습니다. 열거형은 다른 프로그래밍 언어에서 구분된 공용체(`discriminated unions`), 태깅된 공용체(`tagged unions`), 변형체(`variants`)와 비슷합니다.

예를 들어, 재고 관리 시스템이 제품 관리를 위해 두가지 다른 바코드 타입이 필요하다고 가정해 봅시다. 몇몇 제품은 0부터 9까지 숫자를 사용하는 UPC 포멧의 1D 바코드으로 라벨되어 있습니다. 각 바코드는 1개의 번호 시스템숫자, 5개의 관리자 코드숫자와 5개의 제품 코드숫자를 가집니다. 그 코드가 제대로 스캔 되었는지 검증하기 위해 1개의 확인 숫자가 붙습니다.

![](/img/posts/SwiftProgrammingGuide-enum-0.png)

다른 제품은 ISO 8859-1 문자와 최대 2,953개의 문자로 인코딩할 수 있는 QR 코드 포멧인 2D 바코드로 라벨되어 있습니다.

![](/img/posts/SwiftProgrammingGuide-enum-1.png)

4개의 정수형 튜플로된 UPC 바코드와 문자열 길이에 관계없는 QR 코드 바코드를 저장할수 있는 재고추적 시스템은 편리할 것입니다.

Swift에서, 다음과 같이 두가지 타입의 바코드 제품을 정의하기 위해 열거형을 사용합니다.


```swift
// 1
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}
```
이것은 다음과 같이 읽을 수 있습니다.

`(Int, Int, Int, Int)` 타입의 연관된 값으로 된 upc의 값 또는 String 타입의 연관된 값으로 된 qrCode의 값을 가질수 있는 Barcode열거형 타입을 정의합니다.

이 정의는 모든 실제 Int 또는 String 값을 제공하지는 않습니다 - 이것은 단지 Barcode.upc 또는 Barcode.qrCode와 같을때Barcode 상수와 변수를 저장할수 있는 연관된 타입(associated value)의 타입(type)을 정의합니다.



```swift
var productBarcode = Barcode.upc(8, 85909, 51226, 3)
```

이 시점에, 원래 `Barcode.upc`와 정수형 값은 새로운 `Barocde.qrCode`와 문자열 값으로 교체됩니다. `Barcode` 타입의 상수와 변수는 각각 `.upc` 또는 `.qrCode`(연관된 값들과 함께)를 저장할 수 있지만, 언제나 그것들 중의 하나만 저장할 수 있습니다.

이전과 같이 `switch` 문을 사용하여 바코드 타입이 다른지 확인할수 있습니다. 하지만, 연관된 값(associated values)은 switch문의 일부로 추출될수 있습니다. 각 연관된 값을 switch case의 본문에서 사용하는 상수(`let`)나 변수(`var`)로 추출합니다.

```swift
switch productBarcode {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
case .qrCode(let productCode):
    print("QR code: \(productCode).")
}
// Prints "QR code: ABCDEFGHIJKLMNOP."
```

열거형 케이스(`case`)에 대한 연관된 값을 상수로 추출하거나 변수로 추출하는 경우에, 간결함(`brevity`)을 위해, 케이스 이름을 붙이기 전에 `var` 또는 `let` 하나만을 붙일수 있습니다.

```swift
switch productBarcode {
case let .upc(numberSystem, manufacturer, product, check):
    print("UPC : \(numberSystem), \(manufacturer), \(product), \(check).")
case let .qrCode(productCode):
    print("QR code: \(productCode).")
}
// Prints "QR code: ABCDEFGHIJKLMNOP."
```

---

## Raw Values 

[연관된 값(Associated Values)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Enumerations.html#//apple_ref/doc/uid/TP40014097-CH12-ID148)의 바코드 예제에서 열거형이 다른 타입의 연관된 값을 저장하도록 선언할 수 있는 것을 보았습니다. 연관된 값 대안으로, 열거형 case는 동일한 타입 모두를 기본 값(원시값:raw values)으로 미리 채울 수 있습니다.

다음은 열거형 case 이름 옆(alongside)에 원시 ASCII 값을 저장하는 예제입니다.

```swift
enum ASCIIControlCharacter: Character {
    case tab = "\t"
    case lineFeed = "\n"
    case carriageReturn = "\r"
}
```

여기에서, `ASCIIControlCharacter` 열거형에 대한 원시 값은 `Character`타입으로 정의되어있고, 공통적인 ASCII 제어 문자 몇개를 설정합니다. `Character` 값들은 문자열과 문자(Strings and Characters)에서 설명되어 있습니다.

원시 값은 문자열, 문자, 정수형, 부동소수점 숫자 타입이 될수 있습니다. 각각의 원시 값은 반드시 열거형 선언에서 고유해야 합니다.

> Note: 윈시 값(raw values)은 연관된 값과는 다릅니다. 위의 3개의 ASCII코드처럼, 원시 값은 코드에서 열거형을 처음 정의할때 미리채워진(prepopulated) 값을 설정합니다. 특정 열거형 케이스(case)에 대한 원시 값은 항상 같습니다. 연관된 값(associated values)은 열거형의 케이스중의 하나를 기반으로해서 새로운 상수나 변수를 생성할때 설정하고 매번 다를수 있습니다.



---

## Implicitly Assigned Raw Values

열거형으로 정수형 또는 문자열 원시 값을 저장하는 작업을 할때, 명시적으로 원시 값을 지정할 필요가 없습니다. 원시값을 지정하지 않을때, Swift는 자동적으로 값을 할당해 줄것입니다.

예를들면(For instance), 정수형이 원시값으로 사용될때, 각 케이스에 대한 암시 값(implicit value)은 이전 케이스(case)보다 하나 더 많습니다. 첫번째 케이스에 설정된 값이 없는 경우에, 그 값은 0입니다.

아래 열거형은 이전의 Planet 열거형을 태양으로부터 각 행성의 순서로 표현하기 위해 정수형 원시값으로 개선(refinement)하였습니다.

```swift
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
}
```

위 예제에서, `Planet.mercury`는 명시적인 원시 값 `1`을 가지고 있으며, `Planet.venus`는 암시적인 원시값 `2`를 가집니다.

원시 값에 대해 문자열이 사용될때, 각 케이스에 대한 암시값은 케이스(case) 이름의 텍스트 입니다.

아래 열거형은 이전의 `CompassPoint`열거형을 각 딕셔너리의 이름으로 표현하기 위해 문자열 원시값으로 개선(refinement)하였습니다.

```swift
enum CompassPoint: String {
    case north, south, east, west
}
```

예제에서, `CompassPoint.south`는 암시적인 원시 값 `"south"`을 가집니다. 
`rawValue` 프로퍼티로 열거형 케이스의 원시값을 사용합니다.

```
let earthsOrder = Planet.earth.rawValue
// earthsOrder is 3 -> 타입이 Int로 변함
 
let sunsetDirection = CompassPoint.west.rawValue -> 타입이 String 으로 변환됨
// sunsetDirection is "west"
```

---

## Initializing from a Raw Value

원시 값(raw-value) 타입으로 열거형을 정의하는 경우, 열거형은 자동적으로 원시 값의 타입(rawValue 매개변수)의 값으로 초기화하고 열거형 케이스(case)나 nil중 하나를 반환합니다. 열거형의 새로운 인스턴스를 만들기 위해 초기화를 사용할 수 있습니다.

이 예제는 원시 값 `7`로 천왕성(Uranus)으로 간주합니다.

```swift
let possiblePlanet = Planet(rawValue: 7)
// possiblePlanet is of type Planet? and equals Planet.uranus
```

모든 `Int`값이 가능한것은 아니지만 일치하는 행성을 찾을 것입니다. 이때문에 원시값 초기화가 항상 `옵셔널(optional)` 열거형 case를 반환합니다. 위의 예제에서, `possiblePlanet`는 `Planet?` 타입 또는 옵셔널 Planet입니다.

> Note: 윈시 값이 항상 열거형 케이스를 반환하는 것이 아니기 때문에, 원시 값(raw value) 초기화는 초기화가 실패할 수 있습니다. 자세한 정보는 [실패할수 있는 초기화(Failable Initailizers)](https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID376)를 보세요.

`11` 번째에 있는 행성을 찾으려고 하는 경우, 옵셔널 `Planet` 값은 윈시값 초기화에 의해 `nil`을 반환할 것입니다.

```swift
let positionToFind = 11
if let somePlanet = Planet(rawValue: positionToFind) {
    switch somePlanet {
    case .earth:
        print("Mostly harmless")
    default:
        print("Not a safe place for humans")
    }
} else {
    print("There isn't a planet at position \(positionToFind)")
}
// Prints "There isn't a planet at position 11"
```

이 예제는 원시 값 11로 행성을 접근하기 위해 옵셔널 바인딩을 사용하는 예제입니다. `if let somePlant = Plant(rawValue: 11)` 구문은 옵셔널 `Planet`를 만들고, 이를 가져올수 있는 경우에, `somePlanet`는 옵셔널 `Planet`의 값으로 설정합니다. 이 경우에, 11번째 행성을 가져오는게 불가능하기에 else 분기문이 실행됩니다.


---

## Recursive Enumerations

`재귀 열거형(recursive enumeration)`은 하나 이상의 열거형 case와 연관된 값으로 다른 열거형의 인스턴스를 가집니다. 열거형 case는 앞에 indirect을 작성해서 재귀임을 나타내며, 컴파일러에게 `간접적(indirection)`으로 필요한 레이어(layer)을 삽입하도록 알려줍니다.

예를들어, 다음은 단순히 산술 표현을 저장하는 열거형 입니다.

```swift
enum ArithmeticExpression {
    case number(Int)
    indirect case addition(ArithmeticExpression, ArithmeticExpression)
    indirect case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

연관된 값(associated value)을 가지는 모든 열거형의 케이스(case)에 대해 간접적(indirection)으로 사용할 수 있게 열거형을 시작하기 전에 indirect를 작성할 수 있습니다

```swift
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

이 열거형은 3가지 산술 표현을 저장할 수 있습니다: 일반(`plain`) 숫자, 두 식의 덧셈과 두 식의 곱셈. 덧셈(`addition`)과 곱셈(`multiplication`) 케이스는 산술 표현식인 연관된 값을 가집니다. - 이러한 연관된 값은 표현식 중첩이 가능합니다. 예를들어, `(5 + 4) * 2` 표현식은 곱하기의 우측 숫자와 곱하기 왼쪽의 또 다른 표현식으로 되어 있습니다. 데이터가 중첩되었기 때문에, 열거형은 데이터를 저장하는데 사용되는 열거형은 중첩을 지원해야 합니다 - 이는 열거형이 재귀(`recursive`)가 필요하다는 의미입니다. 아래 코드는 `(5 + 4) * 2`를 만드는 `ArithmeticExpression` 재귀 열거형을 보여줍니다.

```swift
let five = ArithmeticExpression.number(5)
let four = ArithmeticExpression.number(4)
let sum = ArithmeticExpression.addition(five, four)
let product = ArithmeticExpression.multiplication(sum, ArithmeticExpression.number(2))
```

재귀 함수는 재귀 구조를 가지는 데이터로 작업하는 복잡하지 않는(straightforward) 방법입니다. 예를 들어, 다음은 산술 표현식을 가져오는 함수 입니다.

```swift
func evaluate(_ expression: ArithmeticExpression) -> Int {
    switch expression {
    case let .number(value):
        return value
    case let .addition(left, right):
        return evaluate(left) + evaluate(right)
    case let .multiplication(left, right):
        return evaluate(left) * evaluate(right)
    }
}

print(evaluate(product))
// Prints "18"
```

이 함수는 단순히 연관된 값을 반환해서 일반 숫자를 처리합니다.

왼쪽의 수식을 처리하여 더하기나 곱셈을 계산하며, 오른쪽의 수식을 처리하고, 그것들을 더하거나 곱해줍니다

---

