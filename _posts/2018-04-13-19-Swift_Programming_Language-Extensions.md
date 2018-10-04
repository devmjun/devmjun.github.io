---
layout:     post
title:      "Swift. 정리하기 19"
subtitle:   "Swift Language Guide-Extensions *"
date:       2018-04-13 17:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Reference  

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Extensions](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Extensions.html#//apple_ref/doc/uid/TP40014097-CH24-ID151)<br>
[까칠코더님 블로그](http://kka7.tistory.com/26?category=919617)

---

## Extensions

`확장(Extensions)`은 기존에 있는 클래스, 구조체, 열거형, 프로토콜 타입에 새로운 기능을 추가합니다. 원래 소스코드에 접근하지 못하는 타입을 확장하는 능력도 포함합니다. 확장은 Objective-C에서의 카테고리(categories)와 유사합니다(Objective-C 카테고리와 다르게, Swift 확장은 이름을 가지지 않습니다)

Swift 확장이 할수 있는 것들

- 계산 인스턴스 프로퍼티와 계산 타입 프로퍼티를 추가
- 인스턴스 메소드와 타입 메소드를 정의
- 새로운 초기화를 제공
- 서브스크립트를 정의
- 새로 중첩된 타입을 정의하고 사용
- 기존 타입에 프로토콜을 준수(conform)

Swift에서, 요구사항의 구현을 제공하거나 준수하는 타입을 활용하여 추가적인 기능을 추가하기 위해 프로토콜을 확장 할 수 있습니다. 더 자세한 사항은 [프로토콜 확장(Protocol Extensions)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID521)을 보세요.

> Note: 확장은 타입에 새로운 기능을 추가 할 수 있지만, `기존 함수를 오버라이드(override)` 할 수는 없습니다.

---

## Extension Syntax

`extension` 키워드로 확장을 선언합니다.

```swift
extension SomeType {
    // new functionality to add to SomeType goes here
}
```

확장은 기존 타입에 하나 이상의 프로토콜을 채택 할 수 있습니다. 프로토콜 준수를 추가하려면, 클래스나 구조체 작성과 같은 방법으로 프로토콜 이름을 작성합니다.

```swift
extension SomeType: SomeProtocol, AnotherProtocol {
    // implementation of protocol requirements goes here
}
```

[확장으로 프로토콜 준수 추가하기(Adding Protocol Conformance with an Extension)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID277)에서 설명된 방법으로 프로토콜을 준수하도록 추가합니다.

확장은 기존 제네릭 타입을 확장하기 위해 사용 할 수 있으며, [제네릭 타입 확장하기(Extending a Generic Type)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID185)에 설명되어 있습니다. 또한, 조건부로 기능을 추가하기 위해 제네릭 타입을 확장 할 수 있으며, [제네릭 Where절로 확장하기(Extensions with a Generic Where Clause)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID553)에 설명되어 있습니다.

> Note: 기존 타입에 새로운 기능을 추가하는 확장을 정의하면, 새로운 기능은 해당 타입의 모든 인스턴스에서 사용 할 수 있습니다. `심지어는 확장을 정의하기 전에 만든 인스턴스에서도 사용 할 수 있습니다`

> 개인 Note: 확장을 정의하기전에 만든 인스턴스에서 사용가능하다는건 Run-Time에서 컴파일되서 실행한다는 의미로 이해됩니다!

---

## Computed Properties

확장은 기존 타입에 계산 인스턴스 프로퍼티와 계산 타입 프로퍼티를 추가 할 수 있습니다. 이 예제는 Swift의 내장된 `Double`타입에 계산 인스턴스 프로퍼티 5개를 추가하였으며, 거리 단위 작업을 위해 기본적인 지원을 제공하였습니다.

```swift
extension Double {
    var km: Double { return self * 1_000.0 }
    var m: Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1_000.0 }
    var ft: Double { return self / 3.28084 }
}
let oneInch = 25.4.mm
print("One inch is \(oneInch) meters")
// Prints "One inch is 0.0254 meters"
let threeFeet = 3.ft
print("Three feet is \(threeFeet) meters")
// Prints "Three feet is 0.914399970739201 meters"
```

이러한 계산 프로퍼티는 `Double`값을 길이의 특정 단위를 표현할 것입니다. 비록 그것들은 계산 프로퍼티로 구현되지만, 거리를 변환하기 위해 원래 값을 사용하는 것처럼, 이러한 프로퍼티의 이름을 .구문을 사용해서 부동소수점 원래 값에 붙입니다.

이 예제에서, 1.0의 Double값은 1미터로 간주합니다. 이것이 m 계산 프로퍼티가 self를 반환하는 이유입니다 -1.m표현은 1.0의 Double값을 계산하는 것으로 간주합니다.

다른 단위는 미터로 측정한 값으로 표현하기 위해 변환이 조금 필요합니다. 1 킬로미터는 1,000 미터이며, km 게산 프로퍼티는 미터로 변환하기 위해 1_000.00으로 곱합니다. 비슷하게 1 미터는 3.28085 피트(feet)이며, ft 계산 프로퍼티는 피트를 미터로 변환하기 위해, 3.28084의 Double값으로 나눕니다.

이러한 프로퍼티들은 읽기전용 계산 프로퍼터이고, `get`키워드 없이 짧게 표현됩니다. 반환값은 Double타입이고, `Double`이 허용되는 곳에서 수학적인 계산으로 사용 할 수 있습니다.

```swift
let aMarathon = 42.km + 195.m
print("A marathon is \(aMarathon) meters long")
// Prints "A marathon is 42195.0 meters long"
```

> Note: 확장은 새로운 계산 프로퍼티를 추가할 수 있지만, 저장 프로퍼티나 기존 프로퍼티를 `감시하는(observers) 프로퍼티를` 추가 할 수 없습니다.

---

## Initializers

확장은 기존 타입에 새로운 초기화를 추가 할 수 있습니다. 타입의 원래 구현의 일부에 포함되어 있지 않은 사용자정의 타입을 초기화 매개변수에 적용해서 다른 타입을 확장하거나 추가적인 초기화 옵션을 제공하는게 가능합니다.

확장은 클래스에 새로 `편리한 초기화`를 추가 할 수 있지만, 클래스에 새로운 `지정된 초기화`나 `해제`를 추가 할 수는 없습니다. `지정된 초기화`와 `해제`는 반드시 원래 클래스 구현에서 제공되어야 합니다.

> Note: 모든 저장 프로퍼티의 값 타입에 기본값을 제공하기 위해, 확장을 사용하여 초기화를 추가하고 사용자정의 초기화를 정의 하지 않는 경우, 확장의 초기화에서 값 타입에 대해 기본 초기화와 `멤버 초기화`를 호출 할 수 있습니다. 
값 타입의 원래 구현의 일부로 초기화 작성을 한 경우에는 해당되지 않으며, [값 타입에 대한 초기화 위임(Initializer Delegation for Value Type)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID215)에서 설명됩니다.

아래 예제는 기하학적인 사각형을 표현하기 위해 사용자정의 구조체 `Rect`을 정의 하였습니다. 또한, 예제는 `Size`와 `Point` 구조체 두개를 정의하며, 둘다 모든 프로퍼티에 대해 기본 값 `0.0`을 제공합니다.

```swift
struct Size {
    var width = 0.0, height = 0.0
}
struct Point {
    var x = 0.0, y = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
}
```

`Rect`구조체가 모든 프로퍼티에 기본 값을 제공하기 때문에, 기본 초기화와 멤버단위 초기화를 자동으로 수신되며, [기본 초기화(Default Initializers)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID213)에서 설명되어있습니다. 이러한 초기화는 새로운 Rect인스턴스를 만드는데 사용 할 수 있습니다.

```swift
let defaultRect = Rect()
let memberwiseRect = Rect(origin: Point(x: 2.0, y: 2.0),
                          size: Size(width: 5.0, height: 5.0))
```

특정 중심점(center point)과 크기(size)를 받는 추가적인 초기화를 제공하기 위해 Rect구조체를 확장 할 수 있습니다.

```swift
extension Rect {
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

새로운 초기화는 제공된 `center`지점과 `size`값을 기반으로 적절한 원점을 계산하여 시작합니다. 초기화는 구조체의 멤버단위 초기화 `init(origin:size:)`를 자동으로 호출하여 새로운 원점과 크기 값을 적절한 프로퍼티에 저장합니다.

```swift
let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
                      size: Size(width: 3.0, height: 3.0))
// centerRect's origin is (2.5, 2.5) and its size is (3.0, 3.0)
```

> Note: 확장으로 새로운 초기화를 제공하는 경우, 각 인스턴스 초기화가 완료되면 완전히 초기화 되었는지에 대한 책임을 가지고 있습니다.

---

## Method 

확장은 기존 타입에 새로운 인스턴스 메소드와 타입 메소드를 추가 할 수 있습니다. 다음 예제는 Int타입에 새로운 인스턴스 메소드 `repetitions`를 추가 하였습니다.


```swift
extension Int {
    func repetitions(task: () -> Void) {
        for _ in 0..<self {
            task()
        }
    }
}
```

`repetitions(task:)` 메소드는 매개변수가 없고 반환 값이 없는 함수를 나타내는 `() -> Void`타입의 인자값 하나를 받습니다.

확장을 정의한 후에, 여러번 수행하기 위해 모든 정수형에서 `repetitions(task:)`메소드를 호출 할 수 있습니다.

```swift
3.repetitions {
    print("Hello!")
}
// Hello!
// Hello!
// Hello!
```

## - Mutating Instance Methods

확장으로 추가된 인스턴스 메소드는 인스턴스 스스로 수정(`modify or mutate`) 할 수 있습니다. 구조체와 열거형 메소드는 self나 프로퍼티를 수정하려면 인스턴스 메소드에 반드시 mutating 표시를 해줘야하며, 원래 구현으로부터 메소드를 변경(mutating)하는 것과 같습니다.

아래 예제는 Swift의 Int타입으로 원래 값을 제곱하는 새로운 `mutating` 메소드 `square`를 추가합니다.

```swift
extension Int {
    mutating func square() {
        self = self * self
    }
}
var someInt = 3
someInt.square()
// someInt is now 9
```

---

## Subscripts

확장은 기존 타입에 새로운 서브스크립트를 추가 할 수 있습니다. 이 예제는 Swift의 기본 제공된 Int타입에 정수형 서브스크립트를 추가합니다. 이 서브스크립트 `[n]`은 십진수 `n`의 위치에 맞는 숫자를 반환합니다.

- 123456789[0]은 9를 반환한다
- 123456789[1]은 8을 반환한다
…등등

```swift
extension Int {
    subscript(digitIndex: Int) -> Int {
        var decimalBase = 1
        for _ in 0..<digitIndex {
            decimalBase *= 10
        }
        return (self / decimalBase) % 10
    }
}
746381295[0]
// returns 5
746381295[1]
// returns 9
746381295[2]
// returns 2
746381295[8]
// returns 7
```

`Int`값이 요청된 인덱스에 대해 충분하지 않으면, 번호가 왼쪽에 `0`으로 채워진(padded) 경우처럼, 서브스크립트는 0을 반환하도록 구현됩니다.

```swift
746381295[9]
// returns 0, as if you had requested:
0746381295[9]
```

---

## Nested Types 

확장은 기존 클래스, 구조체, 열거형에 새로 중첩된 타입을 추가할수 있습니다.

```swift
extension Int {
    enum Kind {
        case negative, zero, positive
    }
    var kind: Kind {
        switch self {
        case 0:
            return .zero
        case let x where x > 0:
            return .positive
        default:
            return .negative
        }
    }
}
```

이 예제에서 `Int`에 새로 중첩된 열거형을 추가하였습니다. `Kind 열거형`은 특정 정수가 나타내는 숫자의 종류를 표현합니다. 특히, 숫자가 음수인지, 0인지 양수인지를 표현합니다.

또한, 이 예제는 `Int`에 해당 정수에 대해 적절한 `Kind`열거형 case를 반환하는 새로 계산 인스턴스 프로퍼티 kind를 추가합니다.

중첩된 열거형은 이제 모든 `Int`값에서 사용 할 수 있습니다.

```swift
func printIntegerKinds(_ numbers: [Int]) {
    for number in numbers {
        switch number.kind {
        case .negative:
            print("- ", terminator: "")
        case .zero:
            print("0 ", terminator: "")
        case .positive:
            print("+ ", terminator: "")
        }
    }
    print("")
}
printIntegerKinds([3, 19, -27, 0, -6, 0, 7])
// Prints "+ + - 0 - 0 + "
```

`printIntegerKinds` 함수는, `Int`의 배열을 입력 받고 차례대로 반복합니다. 배열의 각각 정수에 대해, 그 함수는 정수에 대해 `kind`계산 프로퍼티로 처리하고, 적절한 설명을 출력합니다.

> Note: `number.kind`는 이미 `Int.Kind`타입으로 알려져 있습니다. 이것 때문에, `Int.Kind`의 모든 case의 값은 `switch`문법에서 `Int.Kind.negative` 보다 `.negative`처럼 짧게 사용 할 수 있습니다.

---

