---
layout:     post
title:      "Swift. 정리하기 8"
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
[까질 코더님 블로그](http://kka7.tistory.com/114?category=919617)

---

## Enumerations

열거형(`enumeration`)은 관련된 값의 그룹에 대해 공통 타입을 정의하고 코드 내에서 타입에 `안전한(type-safe)` 방법으로 값을 작업할 수 있습니다.

C에 익숙하다면, C 열거형 관련 이름을 정수형 값 세트(set)에 할당하는 것을 알고 있을것입니다. Swift에서 열거형은 훨씬 더 유연하고, 열거형의 각 case에 대해 값을 제공할 필요가 없습니다. 각 열거형 case에 대한 값(원시(raw) 값)을 제공한다면, 그 값은 문자열, 문자, 정수형이나 실수형 타입도 될수 있습니다.

그 대신에, 열거형 case는 각기 다른 case 값으로 저장되도록 모든 타입의 관련된 값을 다른 언어의 unions나 variants 처럼, 지정할 수 있습니다. 하나의 열거형 일부로 관련된 case들의 공통 세트(set)를 정의 할수 있으며, 각각 관련된 타입에 적절한 다른 값을 가집니다.

Swift에서 열거형은 그 자체로(in there own right) `일류 클래스(first-class)` 입니다. 열거형의 현재 값에 대한 추가적인 정보를 제공하기 위해 계산된 프로퍼티(computed properties)와 열거형이 표현하는 값에 관련된 기능을 제공하는 인스턴스 메소드와 같은, 전통적으로 클래스에서만 지원되는 많은 기능등을 채택했습니다. 열거형은 초기 case 값을 제공하기 위한 초기화를 정의할 수 있으며, 원래 구현을 넘어서 기능을 확장할 수 있고, 표준 기능을 제공하기 위해 `프로토콜을 준수(conform)` 할 수 있습니다.

이러한 기능에 대해 자세히 보려면, [프로퍼티(Properties)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID254), [메소드(Methods)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Methods.html#//apple_ref/doc/uid/TP40014097-CH15-ID234), [초기화(Initialization)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID203), [확장(Extensions)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Extensions.html#//apple_ref/doc/uid/TP40014097-CH24-ID151), [프로토콜(Protocols)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID267)을 보세요.

---

## Enumeration Syntax 

```swift
// 1
enum SomeEnumeration {
    // enumeration definition goes here
}

// 2
enum CompassPoint {
    case north
    case south
    case east
    case west
}

// 3
enum Planet {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}

// 4
var directionToHead = CompassPoint.west
directionToHead = .east
```

---

## Matching Enumeration Values with a Switch Statement


```swift
// 1
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

// 2
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

## Associated Values

이전 섹션의 예제에서 어떻게 열거형의 case들이 그 자체로 정의된(그리고 타입화 된) 값이되는지 보여줍니다. `Plant.earth`에 상수나 변수를 설정할 수 있고, 나중에 이 값을 확인할 수 있습니다. 하지만, 이러한 case 값 옆에 다른 타입의 연관된 값(associated values)을 저장할 수 있는 것이 유용할 때가 있습니다. 이것은 case 값으로 추가적으로 사용자 정의된 정보를 저장하는것이 가능하고, 코드에서 case를 사용할때마다 정보가 달라지는 것을 허용합니다.

Swift 열거형은 주어진 모든 타입과 연관된 값을 저장하도록 정의할 수 있고, 필요한 경우 값 타입은 열거형의 각 case에 따라 다를수 있습니다. 열거형은 다른 프로그래밍 언어에서 구분된 공용체(`discriminated unions`), 태깅된 공용체(`tagged unions`), 변형체(`variants`)와 비슷합니다.

예를 들어, 재고 관리 시스템이 제품 관리를 위해 두가지 다른 바코드 타입이 필요하다고 가정해 봅시다. 몇몇 제품은 0부터 9까지 숫자를 사용하는 UPC 포멧의 1D 바코드으로 라벨되어 있습니다. 각 바코드는 1개의 번호 시스템숫자, 5개의 관리자 코드숫자와 5개의 제품 코드숫자를 가집니다. 그 코드가 제대로 스캔 되었는지 검증하기 위해 1개의 확인 숫자가 붙습는다.

```swift
// 1
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}

// 2
var productBarcode = Barcode.upc(8, 85909, 51226, 3)

// 3
productBarcode = .qrCode("ABCDEFGHIJKLMNOP")

// 4
switch productBarcode {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
case .qrCode(let productCode):
    print("QR code: \(productCode).")
}
// Prints "QR code: ABCDEFGHIJKLMNOP."

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

---

## Implicitly Assigned Raw Values

```swift
// 1
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
}

// 2
enum CompassPoint: String {
    case north, south, east, west
}

// 3
let earthsOrder = Planet.earth.rawValue
// earthsOrder is 3 -> 타입이 Int로 변함
 
let sunsetDirection = CompassPoint.west.rawValue -> 타입이 String 으로 변환됨
// sunsetDirection is "west"
```

주석을 하나씩 보면
위의 예제에서, Planet.mercury는 명시적으로 원시값 1을 가졌으며, Planet.venus는 암시적으로 원시값 2를 가집니다. 원시값에 문자열을 사용할때, 각 case에 대한 암시적인 값은 case의 이름 텍스트 입니다.

위의 예제에서, CompassPoint.south는 암시적으로 원시값 "south"를 가집니다. 
열거형 case의 원시값은 rawValue프로퍼티를 사용합니다.

---

## Initializing from a Raw Value

```swift
let possiblePlanet = Planet(rawValue: 7)
// possiblePlanet is of type Planet? and equals Planet.uranus
```

모든 Int값이 가능한것은 아니지만 일치하는 행성을 찾을 것입니다. 이때문에 원시값 초기화가 항상 옵셔널(optional) 열거형 case를 반환합니다. 위의 예제에서, possiblePlanet는 Planet? 타입 또는 옵셔널 Planet입니다.

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

---

## Recursive Enumerations

`재귀 열거형(recursive enumeration)`은 하나 이상의 열거형 case와 연관된 값으로 다른 열거형의 인스턴스를 가집니다. 열거형 case는 앞에 indirect을 작성해서 재귀임을 나타내며, 컴파일러에게 `간접적(indirection)`으로 필요한 레이어(layer)을 삽입하도록 알려줍니다.

예를들어, 다음은 단순히 산술 표현을 저장하는 열거혀 ㅇ입니다.

```swift
// 1
enum ArithmeticExpression {
    case number(Int)
    indirect case addition(ArithmeticExpression, ArithmeticExpression)
    indirect case multiplication(ArithmeticExpression, ArithmeticExpression)
}

// 2
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}

// 3
let five = ArithmeticExpression.number(5)
let four = ArithmeticExpression.number(4)
let sum = ArithmeticExpression.addition(five, four)
let product = ArithmeticExpression.multiplication(sum, ArithmeticExpression.number(2))

// 4
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

필요한 경우, 모든 열거형의 case에 대해 간접적(indirection)으로 사용하기 위해, 열거형을 시작하기 전에 indirect를 작성할 수 있습니다.

---

