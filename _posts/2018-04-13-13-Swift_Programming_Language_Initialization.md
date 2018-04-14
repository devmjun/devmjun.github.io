---
layout:     post
title:      "Swift. 정리하기 13"
subtitle:   "Swift Language Guide-Initialization *"
date:       2018-04-13 11:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Initialization

`초기화(initialization)`는 클래스, 구조체, 열거형의 인스턴스를 사용하기 전에 준비하는 과정입니다. 이 과정은 인스턴스에서 각 저장 프로퍼티에 대한 초기값 설정과 관련(involves)이 있고 새 인스턴스가 사용할 준비가 되기 전에 필요한 다른 설정이나 초기화를 실행합니다.

특정 타입의 새로운 인스턴스를 만들기 위해 호출된 특별한 메소드와 같이 초기화(initializers)를 정의해서 초기화 과정을 구현합니다. Objective-C 초기화와 다르게, Swift초기화는 `값을 반환하지 않습니다`. 이러한 중요한 규칙은 타입의 새로운 인스턴스를 처음 사용하기전에 확실히 초기화 되도록 하는 것입니다.

클래스 타입의 인스턴스는 클래스의 인스턴스가 메모리에서 해제되기 전에 사용자가 지정한 정리(cleanup)를 하는 해제(deinitializer)를 구현 할 수 있습니다.

---

## Setting Initial Values for Stored Properties

클래스와 구조체는 반드시(must) 클래스나 구조체의 인스턴스가 생성될때 모든 저장 프로퍼티에 적절한 초기값을 설정해야 합니다. 저장 프로퍼티는 불확실한 상태로 남아있을수 없습니다.

초기화에서 저장 프로퍼티에 대한 초기값 설정을 할 수 있거나 프로퍼티 정의 일부로 기본 프로퍼티 값을 할당 할 수 있습니다. 이러한 동작은 다음 섹션(sections)에서 설명됩니다.

> Note: 저장 프로퍼티에 기본 값을 할당하거나 초기화에서 초기 값을 설정할 때, 프로퍼티 옵져버는 호출되지 않고, 프로퍼티의 값만 직접 설정 됩니다.

---

## Initializaers(초기화)

초기화(Initializers)는 특정 타입의 새로운 인스턴스를 만들때 호출됩니다. 이것은 매우 간단한 형식이며, 초기화는 매개변수 없는 인스턴스 메소드와 같으며, `init`키워드를 사용하여 작성합니다.


```swift
init() {
    // perform some initialization here
}
```

```swift
struct Fahrenheit {
    var temperature: Double
    init() {
        temperature = 32.0
    }
}
var f = Fahrenheit()
print("The default temperature is \(f.temperature)° Fahrenheit")
// Prints "The default temperature is 32.0° Fahrenheit"
```

---

## Default Property Values

위에서 본것처럼, 초기화에서 저장 프로퍼티의 초기 값을 설정 할 수 있습니다. 아니면, 프로퍼티의 선언에서 `프로퍼티 기본 값(default property value)`을 지정 할 수 있습니다. 프로퍼티를 정의 할때 초기값 할당하여 프로퍼티 기본 값을 지정합니다.

> Note: 프로퍼티가 항상 같은 초기값을 가진다면, 초기화에서 설정하는 것보다 기본 값을 제공하는게 좋습니다. 결과는 같지만, 기본 값을 주는 것은 프로퍼티의 초기화 선언에 더 가깝습니다. 기본 값으로부터 프로퍼티의 타입 추론을 가능하게 하고, 초기화를 짧고 명확하게 만듭니다. 기본 값은 또한 기본 초기화와 초기화 상속의 쉽게 활용 할 수 있게 만들며, 이번 챕터(chapter) 뒤에 설명됩니다.

위의 `Fahrenheit`구조체로부터 프로퍼티가 선언되는 시점에 `temperature프로퍼티의 기본 값을 제공 할 수 있습니다.

```swift
struct Fahrenheit {
    var temperature = 32.0
}
```

---

## cCustomizing Initialization

입력 매개변수와 옵셔널 프로퍼티 타입으로 초기화 과정을 사용자정의 하거나 상수 프로퍼티를 초기화 하는중에 할당 할 수 있으며, 다음 섹션(sections)에 설명됩니다.


---

## Initialization Parameters

사용자정의 초기화 과정에서 값의 타입과 이름 정의하기 위해 초기화 정의의 일부로 초기화 매개변수(initialization parameters)를 제공 할 수 있습니다. 초기화 매개변수는 함수와 메소드 매개변수와 같은 기능과 문법을 가지고 있습니다.

다음은 섭씨 단위로 표시된 온도를 저장하는 Celsius구조체를 정의하는 예제입니다. Celsius구조체는 다른 온도계의 값으로 새로운 인스턴스를 초기화하는 두가지 사용자정의 초기화 init(fromFahrenheit:)와 init(fromKelvin:)를 구현합니다.

```swift
struct Celsius {
    var temperatureInCelsius: Double
    init(fromFahrenheit fahrenheit: Double) {
        temperatureInCelsius = (fahrenheit - 32.0) / 1.8
    }
    init(fromKelvin kelvin: Double) {
        temperatureInCelsius = kelvin - 273.15
    }
}
let boilingPointOfWater = Celsius(fromFahrenheit: 212.0)
// boilingPointOfWater.temperatureInCelsius is 100.0
let freezingPointOfWater = Celsius(fromKelvin: 273.15)
// freezingPointOfWater.temperatureInCelsius is 0.0
```

첫번째 초기화는 `fromFahrenheit` 인자 라벨과 fahrenheit 매개변수 이름으로 된 초기화 매개변수 하나를 가지고 있습니다. 두번째 초기화는 fromKelvin 인자 라벨과 kelvin매개변수 이름으로 된 초기화 매개변수 하나를 가지고 있습니다. 두 초기화 모두 하나의 인자로 
섭씨 값으로 변환하고 그 값을 temperatureInCelsius 프로퍼티에 저장합니다.

---

## Initializer Parameters Without Argument Labels


```swift
struct Celsius {
    var temperatureInCelsius: Double
    init(fromFahrenheit fahrenheit: Double) {
        temperatureInCelsius = (fahrenheit - 32.0) / 1.8
    }
    init(fromKelvin kelvin: Double) {
        temperatureInCelsius = kelvin - 273.15
    }
    init(_ celsius: Double) {
        temperatureInCelsius = celsius
    }
}
let bodyTemperature = Celsius(37.0)
// bodyTemperature.temperatureInCelsius is 37.0
```

---

## Memberwise Initializers for Structure Types

구조체 타입은 사용자정의 초기화를 정의하지 않는 경우에, 자동으로 `멤버 초기화(memberwise initializer)`를 합니다. 기본 초기화와 다르게, 구조체는 저장 프로퍼티가 기본 값을 가지지 않는 경우에 멤버 초기화를 합니다.

멤버단위 초기화는 새로운 구조체 인스턴스의 멤버를 초기화하는 간편한(shorthand) 방법입니다. 새로운 인스턴스의 프로퍼티에 대한 초기값은 멤버 초기화의 이름으로 전달 할 수 있습니다.

아래 예제에서 두개의 프로퍼티 width와 height를 가진 구조체 Size를 정의합니다. 두 프로퍼티 모두 할당된 기본값 0.0으로 Double타입으로 추론됩니다.

Size구조체는 자동으로 새로운 Size 인스턴스 초기화를 사용 할 수 있는 `init(width:height:)` 멤버 초기화를 합니다.

```swift
struct Size {
    var width = 0.0, height = 0.0
}
let twoByTwo = Size(width: 2.0, height: 2.0)
```

---

## Initializer Delegation for Value Types

초기화는 인스턴스의 초기화 일부를 실행하기 위해 다른 초기화를 호출 할 수 있습니다. 이 과정은, `초기화 위임(initializer delegation)`이라고 하며, 여러 초기화에서 코드가 중복되는 것을 막아줍니다.

초기화 위임(delegate) 작업과 어떤 위임(delegate)의 형식이 허용되는지에 대한 규칙은 값 타입과 클래스 타입에 따라 다릅니다. 값 타입(구조체와 열거형)은 상속을 지원하지 않고, 스스로 제공하는 다른 초기화에 대해서만 위임이 가능하기 때문에, 초기화 위임 과정은 정말 간단합니다. 하지만 클래스는 다른 클래스를 상속 할 수 있으며, [상속(Inheritance)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-ID193)에서 설명됩니다. 이것은 클래스가 초기화하는 동안 상속된 모든 저장 프로퍼티에 알맞는 값을 할당해야 하는 추가적인 책임을 가지고 있다는것을 의미입니다. 이러한 책임(`responsibilities`)은 아래에 있는 [클래스 상속과 초기화(Class Inheritance and Initialization)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID216)에서 설명됩니다.

값 타입에 대해, 사용자정의 초기화를 작성할때 같은 값 타입으로부터 다른 초기화를 참조하기 위해서 `self.init`를 사용합니다. 초기화 안에서만 `self.init`를 호출 할 수 있습니다.

값 타입에 대한 사용자정의 초기화 정의는 경우, 그 타입에 대한 기본 초기화(구조체의 경우 멤버초기화)를 더 이상 사용 할 수 없다는 것을 주의합니다. 이러한 제약은 더 복잡한 초기화에서 제공되는 추가 필수 설정을 실수로 자동 초기화중 하나를 사용해서 우회하게 되는 상황을 막아줍니다.

> 사용자정의 값 타입을 기본 초기화, 멤버초기화, 사용자정의 초기화로 초기화가능하게 하려면, 값 타입의 원래 구현의 일부를 사용하는 것보다 `확장(extension)`에서 사용자정의 초기화를 작성하는것이 좋습니다. 더 자세한 정보는 [확장(Extensions)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Extensions.html#//apple_ref/doc/uid/TP40014097-CH24-ID151)을 보세요.

다음 예제는 사각형 도형을 표현하는 사용자정의 구조체 Rect를 정의합니다. 예제는 Size와 Point 구조체 두개가 필요하며, 둘다 모든 프로퍼티에 대해 기본 값 0.0을 제공합니다.

```swift
struct Size {
    var width = 0.0, height = 0.0
}
struct Point {
    var x = 0.0, y = 0.0
}
```

`Rect` 구조체를 아래 3가지 방법중 하나로 초기화 할 수 있습니다. - 기본으로 0으로 초기화된 origin과 `size`프로퍼티 값을 사용, 특정 원점과 크기를 제공, 특정 중심점과 크기를 제공. 이러한 초기화 옵션은 `Rect` 구조체 정의의 일부로 3개의 사용자정의 초기화로 표현됩니다.

```swift
struct Rect {
    var origin = Point()
    var size = Size()
    init() {}
    init(origin: Point, size: Size) {
        self.origin = origin
        self.size = size
    }
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

Rect의 첫번째 초기화 init()는 그 구조체가 사용자정의 초기화를 가지지 않는 경우에 기본 초기화와 기능이 같습니다. 이 초기화는 비어있는 본문을 가지며, 중괄호(curly braces) {} 쌍으로 표현됩니다. 이 초기화 호출은 origin과 size프로퍼티가 둘다 프로퍼티에 정의된 Point(x: 0.0, y: 0.0)과 Size(width: 0.0, height: 0.0) 기본값으로 초기화된 Rect인스턴스를 반환합니다.

```swift
let basicRect = Rect()
// basicRect's origin is (0.0, 0.0) and its size is (0.0, 0.0)
```

`Rect`의 두번째 초기화 `init(orgin:size:)`는 사용자정의 초기화를 가지지 않는 경우에, 구조체의 멤버 초기화와 같은 기능을 합니다. 이 초기화는 단순히 저장 프로퍼티에 어울리는 origin과 size인자 값을 할당합니다.

```swift
let originRect = Rect(origin: Point(x: 2.0, y: 2.0),
                      size: Size(width: 5.0, height: 5.0))
// originRect's origin is (2.0, 2.0) and its size is (5.0, 5.0)
```

Rect의 세번째 초기화 `init(center:size:)`는 약간 복잡합니다. center위치와 size 값을 기반으로 원점을 적절하게 계산하여 시작합니다. 그리고 나서 해당 프로퍼티에 새로운 원점과 크기 값을 저장하는 init(origin:size:)초기화를 호출(또는 위임)합니다.

```swift
let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
                      size: Size(width: 3.0, height: 3.0))
// centerRect's origin is (2.5, 2.5) and its size is (3.0, 3.0)
```

init(center:size:)초기화는 프로퍼티에 어울리게 origin과 size의 새로운 값을 할당 할 수 있습니다. 하지만, 이미 정확한 기능을 제공하는 기본 초기화를 이용하는init(center:size:)초기화가 더 편리합니다.

> Note: 이 예제의 init()과 init(origin:size:)초기화를 정의하지 않고 작성하려면, [확장(Extensions)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Extensions.html#//apple_ref/doc/uid/TP40014097-CH24-ID151)를 보세요.

---

## Designated Initializers and Convenience Initializers

지정된 초기화(Designated initializers)는 클래스에 대해 최초(primary) 초기화입니다. 지정된 초기화(designated initializer)는 클래스에 도입된 모든 프로퍼티를 전부 초기화해주고 슈퍼클래스의 초기화 과정을 계속하기위해 적절한 슈퍼클래스 초기화를 호출해줍니다.

클래스는 몇개의 지정된 초기화를 가지는 경향(tend)이 있고, `클래스에 대해 하나만 가지는것이 매우 일반적입니다`. 지정된 초기화는 초기화가 일어나는 깔대기(funnel)지점이고, 슈퍼클래스와 연결되어 초기화를 계속 진행합니다.

모든 클래스는 최소한 하나의 지정된 초기화를 가져야 합니다. 일부의 경우에, 슈퍼클래스로부터 하나 이상의 지정된 초기화를 상속하여 이 요구사항을 만족하며, 아래의
[자동적인 초기화(Automatic Initializer)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID222)에서 설명됩니다.

`편리한 초기화(Convenience initializers)`는 보조적이며(secondary), 클래스에 대한 초기화 지원해줍니다. 지정된 초기화의 매개변수 중 일부를 기본값으로 설정해서, 편리한 초기화와 같은 같은 클래스로부터 지정된 초기화를 호출해서 편리한 초기화를 정의 할 수 있습니다. 특정 케이스(use case) 또는 입력 값 타입에 대한 클래스의 인스턴스를 만들기위해 편리한 초기화를 정의 할 수 도 있습니다.

클래스에서 필요하지 않으면 편리한 초기화를 제공할 필요가 없습니다. 공통 초기화 패턴에 대한 바로가기를 할때마다 편리한 초기화를 만들어, 시간을 절약하거나 클래스의 초기화 의도를 명확하게 만들 것입니다.

---

## Syntax for Designated and Convenience Initializers

클래스에 대해 `지정된 초기화(designated initializers)`는 값 타입에 대한 간단한 초기화와 같은 방법으로 작성합니다.

```swift
init(parameters) {
    statements
}
```

`편리한 초기화(convenience initializers)`도 같은 문법으로 작성하지만, convenience을 init키워드 앞에 위치하고, 공백으로 구분합니다.

```swift
convenience init(parameters) {
    statements
}
```

---

## Initializer Delegation for Class Types

지정된 초기화와 편리한 초기화간의 관계를 단순화 하기 위해, Swift는 초기화에서 위임을(delegatino) 호출하는 것에 대해 다음 3가지 규칙을 적용합니다.

- 규칙 1
	- 지정된 초기화는 반드시 바로위 슈퍼 클래스의 지정된 초기화를 호출해야 합니다.
- 규칙 2 
	- 편리한 초기화는 반드시 같은(same) 클래스의 다른 초기화를 호출 합니다.
- 규칙3
	- 편리한 초기화는 궁국적으로 반드시 지정된 초기화를 호출해야합니다.

기억하기 쉬운 방법

- 지정된 초기화는 반드시 위쪽으로(up) 위임합니다. (슈퍼클래스 호출)
- 편리한 초기화는 반드시 가로질러(across) 위임합니다. (다른 초기화 호출)

이러한 규칙을 아래 그림에서 볼수 있습니다.

<center><img src="/img/posts/Swift_Programming_Language-9.png" width="700" height="500"></center>

여기에서, 슈퍼 클래스는 하나의 지정된 초기화와 2개의 편리한 초기화를 가지고 있습니다. 하나의 편리한 초기화는 차례대로 하나의 지정된 초기화를 호출하는 다른 편리한 초기화를 호출합니다. 위의 규칙 2와 3을 만족합니다. 슈퍼클래스는 스스로 추가 슈퍼클래스를 가지지 않고, 규칙 1은 적용되지 않습니다.

그림에서 서브클래스는 2개의 지정된 초기화와 하나의 편리한 초기화를 가지고 있습니다. 편리한 초기화는 같은 클래스의 다른 초기화만 호출 할 수 있기 때문에, 2개의 지정된 초기화중 하나를 반드시 호출합니다. 이것은 위의 규칙 2와 3을 만족합니다. 위의 규칙 1을 만족시키기 위해 두개의 지정된 초기화 모두 반드시 슈퍼클래스로부터 단일 지정된 초기화를 호출합니다.

> Note: 이러한 규칙들은 클래스의 사용자가 각 클래스의 인스턴스를 만드는데 영향을 주지 않습니다. 위 그림에 있는 모든 초기화는 자신이 속한 클래스의 완전히 초기화된 인스턴스를 만드는데 사용될 수 있습니다. 그 규칙들은 클래스의 초기화 구현을 작성하는데 영향을 줍니다.

아래 그림은 더 복잡한 4개의 클래스에 대한 클래스 계층구조도 입니다. 이 그림은 계층구조도에서 지정된 초기화가 클래스 초기화를 위한 깔때기(funnel) 지점 역할을하는 방법을 보여주며, 클래스들 사이에 연관성을 단순화 합니다.

<center><img src="/img/posts/Swift_Programming_Language-10.png" width="700" height="700"></center>

### - Two-Phase Initialization

Swift에서 클래스 초기화는 2단계로 처리됩니다. 첫번째 단계에서, 각 저장 프로퍼티는 클래스 시작에서 초기값이 할당됩니다. 모든 저장 프로퍼티에 대한 초기화 상태가 한번 결정되면, 2단계가 시작하고, 각 클래스는 새로운 인스턴스를 사용할 준비되기 전에 저장 프로퍼티를 사용자정의 할 수 있는 기회가 주어집니다.

2단계(two-phase) 초기화 과정의 사용은 클래스 계층구조에서 각 클래스가 완전한 유연성을 제공하면서, 초기화를 안전하게 만듭니다. `2단계 초기화는 초기화되기 전에 프로퍼티에 접근하는 것을 막아주고, 다른 초기화에서 예기치 않게 다른 값으로 프로퍼티 값이 설정되는 것을 막아줍니다.`

> Note: Swift의 2단계 초기화 과정은 Objective-C 에서의 초기화와 유사합니다. 주요 차이점은 1단계에서, Objective-C는 모든 프로퍼티를 `0` 또는 `nil` 값으로 할당합니다. Swift의 초기화 흐름은 사용자정의 초기값을 설정하는데 좀 더 유연하고, 0이나 nil이 유효한 기본값이 아닌 타입을 처리 할 수 있습니다.

Swift의 컴파일러는 에러없이 2단계(two-phase) 초기화가 완료되도록 4개의 안전 검사를 수행합니다.

**안전 검사 1** <br>
지정된 초기화는 반드시 클래스가 초기화 되기 전에 슈퍼클래스 초기화를 위임해서 모든 프로퍼티가 초기화되는 것을 보장합니다

위에 언급된, 객체에 대한 메모리는 모든 저장 프로퍼티의 초기 상태를 알게되면 완전히 초기화된 것으로 간주합니다. 이 규칙을 만족하기 위해, 지정된 초기화는 위로 전달되기 전에 반드시 자신의 모든 프로퍼티가 초기화되는것을 확실히 해야합니다.

**안전검사 2** <br>
지정된 초기화(designated initializer)는 반드시 상속된 프로퍼티에 값을 할당하기 전에 슈퍼클래스 초기화로 위임합니다. 만약 그렇지 않으면, 슈퍼클래스의 초기화에 의해 지정된 초기화가 할당한 새 값을 덮어 쓸것입니다.

**안전검사 3**<br>
편리한 초기화(convenience initializer)는 모든 프로퍼티(같은 클래스에 정되어 포함된 프로퍼티)에 값을 할당하기 전에 반드시 다른 초기화에 위임해야 합니다. 만약 그렇지 않으면, 편리한 초기화에 할당한 새 값은 클래스의 지정된 초기화에 의해 덮어 쓸것입니다.

**안전검사 4**<br>
초기화에서 모든 인스턴스 메소드를 호출 할 수 없으며, 1단계 초기화가 완료되기 전까지 모든 인스턴스의 값이나 self와 관련된 값을 읽을 수 없습니다.

클래스 인스턴스는 1단계가 끝날때까지 완전히 유효하지 않습니다. 
클래스 인스턴스가 1단계 끝에서 유효하다고 알려지면, 프로퍼티만 접근 할 수 있고, 메소드만 호출 할 수 있습니다.

여기에서 위의 4개의 안전검사를 기반으로, 2단계 초기화 방법을 알아봅니다.

**1 단계**

- 지정된 초기화나 편리한 초기화는 클래스에서 호출됩니다.
- 클래스의 새로운 인스턴스에 대한 메모리가 할당됩니다. 메모리는 아직 초기화 되지 않았습니다.
- 클래스에 대한 지정된 초기화는 클래스가 가지는 값으로 모든 저장 프로퍼티를 확인합니다. 이러한 저장 프로퍼티에 대한 메모리는 현재 초기화되어 있습니다.
- 지정된 초기화는 저장 프로퍼티에 대해 동일한 작업을 하도록 슈퍼클래스 초기화에 넘겨줍니다.
- 체인의 최상단에 도착할때까지 클래스 상속 체인을 계속합니다.
- 체인의 최상단에 도착하고, 체인의 마지막 클래스는 모든 저장 프로퍼티가 값을 가지는 것을 보장하며, 인스턴스의 메모리는 완전히 초기화 된것으로 간주되고, 1 단계가 완료합니다.
 
**2 단계**

- 체인의 상단으로부터 다시 아래로 동작하며, 체인의 각 지정된 초기화는 인스턴스를 사용자정의 할 수 있는 옵션을 가집니다.
- 마지막으로, 체인의 편리한 초기화는 인스턴스를 사용자 정의 할 수 있으며, self를 사용 할 수 있습니다.
여기 가상의 서브클래스와 슈퍼클래스에 대해 1단계 초기화를 호출하는 방법을 보여줍니다.

<center><img src="/img/posts/Swift_Programming_Language-11.png" width="700" height="700"></center>

예제에서, 초기화는 서브클래스에서 편리한(convenience) 초기화 호출로 시작합니다. 편리한 초기화는 아직 모든 프로퍼티를 수정 할 수 없습니다. 그것은 동일한 클래스의 지정된 초기화에 위임합니다.

지정된 초기화는 안전 검사 1에 따라, 서브클래스의 모든 프로퍼티가 값을 가지는지 확인합니다. 그리고나서 체인(chain)의 초기화를 계속하기 위해 슈퍼클래스에 지정된 초기화를 호출합니다.

슈퍼클래스의 지정된 초기화는 슈퍼클래스의 모든 프로퍼티가 값을 가지는지 확인합니다. 초기화할 슈퍼클래스가 없어서 더 이상 위임이 필요하지 않습니다.

슈퍼클래스의 모든 프로퍼티는 초기값을 가지자마자, 메모리가 완전히 초기화 된것으로 간주하고, 1단계가 완료됩니다.

다음은 2단계에서 같은 초기화 호출 방법을 보여줍니다.

<center><img src="/img/posts/Swift_Programming_Language-12.png" width="700" height="700"></center>

슈퍼클래스의 지정된 초기화는 이제 인스턴스를 추가로 사용자정의 할 수 있는 기회가 있습니다(비록 그렇게 할 필요는 없습니다).

슈퍼클래스의 지정된 초기화가 완료되면, 서브클래스의 지정된 초기화는 추가적으로 사용자정의 할 수 있습니다(비록 그렇게 할 필요는 없습니다).

마지막으로, 서브클래스의 지정된 초기화가 완료되면, 원래 호출된 편리한 초기화는 추가적으로 사용자정의 할 수 있습니다.

### - Initializer Inheritance and Overriding)


Objective-C에서의 서브클래스와 다르게, Swift 서브클래스는 `기본적으로 슈퍼클래스 초기화를 상속받지 않습니다.` Swift의 접근 방식은 슈퍼클래스의 간단한 초기화가 좀 더 특별한 서브클래스에 의해 상속되고 완전하지 않거나 제대로 초기화되지 않은 서브클래스의 인스턴스를 만드는데 사용하는 상황을 막아줍니다.

> Note: 슈퍼클래스 초기화는 특정 상황에서 상속되지만, 안전하고 적절한 경우에만 적용됩니다. 자세한 정보는 아래의 [자동 초기화 상속(Automatic Initializer Inheritance)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID219)을 보세요.

슈퍼클래스처럼 하나 이상의 동일한 초기화를 제공하기 위해 서브클래스를 사용자정의하길 원한다면, 서브클래스에서 이러한 초기화들의 사용자정의 구현을 제공 할 수 있습니다.

슈퍼클래스 지정된(designated) 초기화와 일치하는 서브클래스 초기화를 작성할때, 지정된 초기화의 `오버라이드(override)`를 효과적으로 제공하고 있습니다. 따라서, 서브클래스의 초기화 정의 앞에 `override` 수식어를 작성해야 합니다. 이것은 자동으로 제공되는 기본 `초기화를 오버라이딩(overrding)`하는 경우에도 마찬가지이며, `기본 초기화(Default Initializers)`에 설명되어 있습니다.

오버라이드된 프로퍼티, 메소드나 서브스크립트 처럼, Swift는 슈퍼클래스가 지정된 초기화가 오버라이드 되었는지 확인하기 위해서 override 수식어가 있는지 확인하고, 오버라이딩한 초기화에 대한 매개변수가 의도한 대로 지정되었는지 확인합니다.

> Note: 슈퍼클래스의 지정된 초기화를 오버라이딩 할때, 항상 override를 작성하며, 심지어는 서브클래스에서 편리한 초기화의 구현할때에도 사용합니다.

반대로, 서브클래스 초기화를 슈퍼클래스의 편리한(convenience) 초기화와 일치하게 작성하면, 슈퍼클래스 편리한 초기화는 서브클래스에 의해 직접 호출 할 수 없으며, 위의 클래스 타입에 대한 [초기화 위임(Initializer Delegation for Class Types)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID219)에 설명된 규칙을 따릅니다. 따라서, (엄밀히 말하면) 서브클래스는 슈퍼클래스 초기화를 제공하지 않습니다. 결과적으로, 슈퍼클래스의 편리한 초기화와 일치하는 구현을 제공할때 `override` 수식어를 작성하지 않습니다.

아래 예제는 Vehicle 기본 클래스를 정의합니다. 이 기본 클래스는 저장 프로퍼티 numberOfWheels를 Int타입의 기본값 0으로 선언합니다. numberOfWheels 프로퍼티는 탈것의 특성을 설명하는 String을 만들기 위한 계산된 프로퍼티 description에 의해 사용됩니다.

```swift
class Vehicle {
    var numberOfWheels = 0
    var description: String {
        return "\(numberOfWheels) wheel(s)"
    }
}
```

Vehicle 클래스는 저장 프로퍼티에 대해서만 기본 값을 제공하고, 어떠한 사용자 정의 초기화를 제공하지 않습니다. 결과적으로, `기본 초기화(Default Initializers)`에서 설명된 것처럼, 자동적으로 기본 초기화를 이용합니다. 기본 초기화는(가능한 경우) 항상 클래스의 지정된 초기화 이고, numberOfWheels가 0인 새로운 Vechicle인스턴스를 생성하는데 사용 할 수 있습니다.

```swift
let vehicle = Vehicle()
print("Vehicle: \(vehicle.description)")
// Vehicle: 0 wheel(s)
```

다음 예제는 `Vechicle`의 서브클레스 `Bicycle`ㄹ,ㄹ 정의하였습니다.

```swift
class Bicycle: Vehicle {
    override init() {
        super.init()
        numberOfWheels = 2
    }
}
```

`Bicycle` 서브클래스는 사용자정의 지정된 초기화 `init()`를 정의합니다. 지정된 초기화는 `Bicycle`의 슈퍼클래스의 지정된 초기화와 일치하고, 이 초기화의 `Bicycle` 버젼은 `override` 수식어로 표시됩니다.

`Bicycle`에 대한 `init()` 초기화는 `Bicycle`클래스의 슈퍼클래스인 `Vehicle`에 대한 기본 초기화를 호출하는 `super.init()` 호출로 시작합니다. 이렇게 하면 상속된 프로퍼티 numberOfWheels는 Bicycle가 수정할 기회를 가지기 전에 Vehicle에 의해 초기화 되는 것을 보증합니다. `super.init()` 호출하고 나서, numberOfWheels의 원래 값이 새로운 값 2로 교체됩니다.

Bicycle의 인스턴스를 생성하면, numberOfWheels프로퍼티가 업데이트 되었는지 보기위해, 상속받은 description 계산 프로퍼티를 호출 할 수 있습니다.

```swift
let bicycle = Bicycle()
print("Bicycle: \(bicycle.description)")
// Bicycle: 2 wheel(s)
```

> Note: 주의 서브클래스는 초기화 하는 동안 상속된 변수 프로퍼티를 수정 할 수 있지만, 상속된 상수 프로퍼티는 수정 할 수 없다.

### - Automatic Initializer Inheritance

위에서 언급했던것 처럼, 서브클래스는 기본적으로 슈퍼클래스의 초기화를 상속하지 않습니다. 하지만, 특정조건을 충족하면 슈퍼클래스 초기화는 자동으로 상속됩니다. 실제로, 이것은 대부분의 경우에 초기화 `오버라이드(override)`를 작성할 필요가 없다는 의미이며, 자동으로 상속하는것이 안전한 경우, 최소한의 노력으로 슈퍼클래스 초기화를 상속 할 수 있습니다.

서브클래스에서 모든 새로운 프로퍼티에 대한 기본값을 제공한다고 가정하면, 다음 두가지 규칙이 적용됩니다.

**규칙 1** <br>
서브클래스가 지정된 초기화를 정의하지 않으면, 슈퍼클래스의 지정된 초기화 모두를 자동으로 상속받습니다.

**규칙 2**
서브클래스가 슈퍼클래스의 지정된 초기화의 모든 구현을 제공하면, 슈퍼클래스의 편리한 초기화 모두를 자동으로 상속받습니다. (규칙 1처럼 상속받거나 정의의 일부로 사용자정의 구현을 제공)

이러한 규칙들은 서브클래스가 더 많은 편리한 초기화를 추가하는 경우에도 적용됩니다.

> Note: 서브클래스는 규칙 2를 만족시키는 서브클래스 편리한 초기화로 슈퍼클래스 지정된 초기화를 구현 할 수 있습니다.

---

## Designated and Convenience Initializers in Action

다음 예제에서 동작하는 지정된 초기화, 편리한 초기화, 자동으로 초기화 상속되는 것을 볼수 있습니다. 이 예제는 `Food, RecipeIngredient, ShoppingListItem` 3개의 클래스 계층 구조를 정의하고, 초기화가 어떻게 상호작용하는지 보여줍니다.

계층구조의 기본 클래스는 식품의 이름을 캡슐화한 간단한 클래스인 Food입니다. Food 클래스는 하나의 String프로퍼티 name과 Food인스턴스를 생성하는 두개의 초기화를 제공합니다.

```swift
class Food {
    var name: String
    init(name: String) {
        self.name = name
    }
    convenience init() {
        self.init(name: "[Unnamed]")
    }
}
```

<center><img src="/img/posts/Swift_Programming_Language-13.png" width="700" height="700"></center>

클래스는 기본적으로 멤버(memberwise) 초기화를 하지 않고, `Food` 클래스는 하나의 인자값 name을 가진 지정된 초기화를 제공합니다. 이 초기화는 특정 이름으로 새로운 Food인스턴스를 생성하는데 사용 할 수 있습니다.

```swift
let namedMeat = Food(name: "Bacon")
// namedMeat's name is "Bacon"
```

Food 클래스의 `init(name: String)` 초기화는 새 Food인스턴스의 모든 저장된 프로퍼티들이 전부 초기화되었기 때문에, 지정된(designated) 초기화로 제공됩니다. Food 클래스는 슈퍼클래스를 가지지 않고, `init(name: String)` 초기화는 초기화를 완료하기 위해 super.init() 를 호출할 필요가 없습니다.

Food클래스는 또한 인자가 없는 편리한 초기화 `init()`를 제공합니다. init()초기화는 Food클래스의 `init(name: String)`에 위임하여 Food클래스의 init(name: String)에 name의 [Unnamed] 값으로 새로운 음식에 대한 기본 이름을 제공합니다.

```swift
let mysteryMeat = Food()
// mysteryMeat's name is "[Unnamed]"
```

계층구조에서 두번째 클래스는 `Food`의 서브클래스 `RecipeIngredient` 입니다. RecipeIngredient 클래스는 요리 레시피 재료에 대한 모델입니다. Int 프로퍼티 `quantity`(Food로부터 상속받은 name프로퍼티 이외에) 와 RecipeIngredient인스턴스를 생성하는 두개의 초기화를 정의하였습니다.

```swift
class RecipeIngredient: Food {
    var quantity: Int
    init(name: String, quantity: Int) {
        self.quantity = quantity
        super.init(name: name)
    }
    override convenience init(name: String) {
        self.init(name: name, quantity: 1)
    }
}
```

아래 그림은 RecipeIngredient클래스에 대한 초기화 관계(chain)을 보여줍니다.

<center><img src="/img/posts/Swift_Programming_Language-14.png" width="700" height="700"></center>

`RecipeIngredient` 클래스는 새로운 RecipeIngredient 인스턴스의 모든 프로퍼티를 채우는데 사용 할 수 있는, 단일 지정된 초기화 `init(name: String, quantity: Int)`를 가집니다. 이 초기화는 전달된 quantity인자를 RecipeIngredient에 소개된 유일한 새로운 프로퍼티인 quantity프로퍼티에 할당하는 것으로 시작합니다. 이러한 과정은 위의 [2단계 초기화(Two-Phase Initialization)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID220)의 안전검사 1을 만족합니다.

`RecipeIngredient`는 이름 하나로 RecipeIngredient인스턴스를 생성하는데 사용하는 편리한 초기화 init(name: String)를 정의합니다. 이 편리한 초기화는 명시된 수량 없이 생성된 모든 ReceipeIngredient인스턴스에 대한 갯수를 1개로 가정합니다. 이러한 편리한 초기화 정의는 RecipeIngredient인스턴스를 빠르고 더 편리하게 만들며, 단일 수량의 RecipeIngredient 인스턴스를 만들때 중복 코드를 방지합니다. 이러한 편리한 초기화는 클래스의 지정된 초기화에 단순히 위임하며, quantity값 1을 전달 합니다.

`init(name: String)` 편리한 초기화는 Food의 지정된 초기화 `init(name: String)`와 동일한 매개변수를 가지는 `RecipeIngredient`에 의해 제공됩니다. 편리한 초기화는 슈퍼클래스의 지정된 초기화를 오버라이드하기 때문에, 반드시 `override` 수식어를 표시해야 합니다([초기화 상속과 재정의(Intializer Inheritance and Overriding)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID221)에서 설명되어있습니다).

RecipeIngredient는 편리한 초기화로 init(name: String) 초기화를 제공하지만, RecipeIngredient는 슈퍼클래스의 모든 지정된 초기화의 구현을 제공합니다. 따라서, RecipeIngredient는 자동으로 슈퍼클래스의 모든 편리한 초기화를 상속받습니다.

예제에서, RecipeIngredient에 대한 슈퍼클래스는 하나의 편리한 초기화 init()를 가지는 Food입니다. 이 초기화는 RecipeIngredient에 의해 상속됩니다. 상속된 init() 함수 버전은 Food버전과 정확히 같은 방법이며, Food 버전보다는 init(name: Strig)의 RecipeIngredient버전에 위임한다는 것이 다릅니다.

이러한 3개의 초기화 모두 새로운 RecipeIngredient인스턴스 생성하는데 사용 할 수 있습니다.

```swift
let oneMysteryItem = RecipeIngredient()
let oneBacon = RecipeIngredient(name: "Bacon")
let sixEggs = RecipeIngredient(name: "Eggs", quantity: 6)
```

계층구조에서 세번째와 마지막 클래스는 `RecipeIngredient`의 서브클래스인 `ShoppingListItem`입니다. ShoppingListItem 클래스 쇼핑목록에서 조리법 재료에 대한 모델입니다.

쇼핑 목록에서 모든 항목은 미구입(unpurchased)으로 시작합니다. 이 사실을 표현하기 위해, ShoppingListItem에는 Boolean 프로퍼티 purchased가 있으며 기본값은 false입니다. ShoppingListItem은 또한 ShoppingListItem인스턴스의 텍스트 설명을 제공하는 계산 프로퍼티 `description`를 추가합니다.

```swift
class ShoppingListItem: RecipeIngredient {
    var purchased = false
    var description: String {
        var output = "\(quantity) x \(name)"
        output += purchased ? " ✔" : " ✘"
        return output
    }
}
```

> Note: 쇼핑 목록(여기서 모델링된것 처럼)은 항상 미구입(unpurchased)으로 시작하기 때문에, ShoppingListItem은 purchased에 대한 초기값에 대한 초기화를 정의하지 않습니다.


모든 프로퍼티에 대한 기본값을 제공하고 어떠한 초기화 자체를 정의하지 않기 때문에, `ShoppingListItem`은 슈퍼클래스로부터 지정된 초기화와 편리한 초기화 모두 자동으로 상속받습니다.

아래 그림은 클래스 3개 모두에 대해 전체 초기화 관계(chain)를 보여줍니다.

<center><img src="/img/posts/Swift_Programming_Language-15.png" width="700" height="700"></center>

`ShoppingListItem`인스턴스를 새로 만들기 위해 상속된 초기화 3개 모두를 사용 할 수 있습니다.

```swift
var breakfastList = [
    ShoppingListItem(),
    ShoppingListItem(name: "Bacon"),
    ShoppingListItem(name: "Eggs", quantity: 6),
]
breakfastList[0].name = "Orange juice"
breakfastList[0].purchased = true
for item in breakfastList {
    print(item.description)
}
// 1 x Orange juice ✔
// 1 x Bacon ✘
// 6 x Eggs ✘
```

여기에서, 새로운 배열 `breakfastList`는 3개의 새로운 `ShoppingListItem`인스턴스가 포함된 배열 원문으로 생성됩니다. 배열의 타입은 `[ShoppingListItem]`으로 추론됩니다. 배열이 생성된 후에, 배열의 시작부분에 있는 `ShoppingListItem`의 이름은 `"[Unnamed]"`에서 `"Orange juice"`로 변경되고 구매된것으로 표시됩니다. 배열에서의 각 항목에 대한 설명이 출력하여 기본 상태가 예상대로 설정되어 있음을 보여줍니다.

---

## Failable Initializers

클래스, 구조체, 열거형의 초기화가 실패 할 수 있다는 것에 대해 정의 하는 것이 유용할 때가 있습니다. 이러한 실패는 유효하지않는 초기화 매개변수 값, 필요한 외부 리소스가 없거나 초기화가 성공하지 못하게하는 다른 조건에 의해서 발생 할 수 있습니다.

실패 할 수 있는 초기화 조건을 처리하려면, 클래스, 구조체, 열거형 정의의 일부에서 하나 이상의 실패 할 수 있는 초기화를 정의 합니다. `init키워드 뒤에 물음표를 붙여서(init?) 실패가능한 초기화를 작성합니다.`

> Note: 같은 매개변수 타입과 이름으로 실패 할 수 있는 초기화와 실패하지 않는 초기화를 정의 할 수 없습니다.

실패 할 수 있는 초기화는 옵셔널(optional) 값 타입의 초기화로 생성합니다. 초기화 실패가 발생하는 지점을 나타내기 위해 실패 할 수 있는 초기화에서 `return nil`을 작성합니다.

> Note: 엄밀하게 말해서, 초기화는 값을 반환하지 않습니다. 오히려 이러한 규칙은 초기화가 끝났을때 `self`가 완전히 초기화 된것을 보증해줍니다. 비록 초기화 실패를 발생하기 위해 `return nil`을 작성하지만, 초기화가 성공하였다는 것을 위해서 `return`키워드를 사용하지 않습니다.

예를들면, 실패 할 수 있는 초기화는 숫자 타입 변환을 위해 구현되었습니다. 숫자 타입간에 변환을 정확하게 하기위해, `init(exactly:)`초기화를 사용합니다. 타입 변환이 값을 보유 할 수 없으면, 초기화는 실패합니다.

```swift
let wholeNumber: Double = 12345.0
let pi = 3.14159
 
if let valueMaintained = Int(exactly: wholeNumber) {
    print("\(wholeNumber) conversion to Int maintains value")
}
// Prints "12345.0 conversion to Int maintains value"
 
let valueChanged = Int(exactly: pi)
// valueChanged is of type Int?, not Int
 
if valueChanged == nil {
    print("\(pi) conversion to Int does not maintain value")
}
// Prints "3.14159 conversion to Int does not maintain value"
```

아래 예제는 상수 String 프로퍼티 species를 가진 Animal 구조체를 정의합니다. Animal 구조체는 단일 매개변수 species를 가진 실패가능한 초기화를 정의합니다. 이 초기화는 초기화에 전달된 species 값이 비어있는 문자열인지 확인합니다. 문자열이 비어있으면, 초기화는 실패하게 됩니다. 반면에, species 프로퍼티의 값이 설정되면, 초기화는 성공합니다

```swift
struct Animal {
    let species: String
    init?(species: String) {
        if species.isEmpty { return nil }
        self.species = species
    }
}
```

새로운 Animal인스턴스 초기화를 시도하고 초기화가 성공하는지에 확인하기 위해 실패 할 수 있는 초기화를 사용 할 수 있습니다.

```swift
llet someCreature = Animal(species: "Giraffe")
// someCreature is of type Animal?, not Animal
 
if let giraffe = someCreature {
    print("An animal was initialized with a species of \(giraffe.species)")
}
// Prints "An animal was initialized with a species of Giraffe"
```

실패 할 수 있는 초기화의 species 매개변수에 빈 문자열을 전달하면, 그 초기화는 실패합니다.

```swift
let anonymousCreature = Animal(species: "")
// anonymousCreature is of type Animal?, not Animal
 
if anonymousCreature == nil {
    print("The anonymous creature could not be initialized")
}
// Prints "The anonymous creature could not be initialized"
```

> Note: 빈 문자열 값("Giraffe"이 아닌 "")에 대한 확인은 옵셔널(optional) `String 값이 없음을 나타내기 위한 nil에 대해 확인하는 것과 같지 않습니다.` 위의 예제에서 빈 문자열("")은 유효하며, 옵셔널이 아닌 String입니다. 하지만, 동물에 대해 species프로퍼티의 값으로 비어있는 문자열을 가지는 것은 적절하지 않습니다. 이러한 제한사항을 모델링하여, 실패 할 수 있는 초기화는 빈 문자열이면 초기화가 실패합니다.

---

## Failable Initializers for Enumerations

하나 이상의 매개변수를 기반으로 적절한 열거형을 선택하기 위해 실패 할 수 있는 초기화를 사용 할 수 있습니다. 그 초기화는 제공된 매개변수가 열거형 case와 일치하지 않을때 실패 할 수 있습니다.

아래 예제는 가능한 상태 3개(`kelvin, celsius, fahrenheit`) 로 열거형 `TemperatureUnit`를 정의합니다. 실패가능한 초기화는 Character값의 온도 기호를 표현하기 위해 적절한 열거형 case를 찾는데 사용됩니다.

```swift
enum TemperatureUnit {
    case kelvin, celsius, fahrenheit
    init?(symbol: Character) {
        switch symbol {
        case "K":
            self = .kelvin
        case "C":
            self = .celsius
        case "F":
            self = .fahrenheit
        default:
            return nil
        }
    }
}
```

가능한 상태 3개에 대해 적절한 열거형 case를 선택하기 위해 실패 할 수 있는 초기화를 사용 할 수 있고, 매개변수가 이러한 상태들 중 하나와 일치하지 않으면 초기화는 실패합니다.

```swift
let fahrenheitUnit = TemperatureUnit(symbol: "F")
if fahrenheitUnit != nil {
    print("This is a defined temperature unit, so initialization succeeded.")
}
// Prints "This is a defined temperature unit, so initialization succeeded."
 
let unknownUnit = TemperatureUnit(symbol: "X")
if unknownUnit == nil {
    print("This is not a defined temperature unit, so initialization failed.")
}
// Prints "This is not a defined temperature unit, so initialization failed."
```

---

## Failable Initializers for Enumerations with Raw Values

원시 값(raw values)을 사용하는 열거형은 자동으로 실패 할 수 있는 초기화를 init?(rawValue:)를 받으며, 적절한 원시 값(raw-value) 타입의 매개변수 rawValue를 가지고 열거형 case와 일치하는 것을 찾아 선택하거나, 일치하는 기존 값을 찾지 못하면 초기화는 실패한다.

Character 타입의 원시값을 사용하고 `init?(rawValue)` 초기화의 장점을 가지고서 위의 TemperatureUnit예제를 다시 작성 할 수 있습니다.

```swift
enum TemperatureUnit: Character {
    case kelvin = "K", celsius = "C", fahrenheit = "F"
}
 
let fahrenheitUnit = TemperatureUnit(rawValue: "F")
if fahrenheitUnit != nil {
    print("This is a defined temperature unit, so initialization succeeded.")
}
// Prints "This is a defined temperature unit, so initialization succeeded."
 
let unknownUnit = TemperatureUnit(rawValue: "X")
if unknownUnit == nil {
    print("This is not a defined temperature unit, so initialization failed.")
}
// Prints "This is not a defined temperature unit, so initialization failed."
```

---

## Propagation of Initialization Failure

클래스, 구조체, 열거형의 실패 할 수 있는 초기화는 다른 클래스, 구조체, 열거형의 다른 실패 할 수 있는 초기화에 위임 할 수 있습니다. 비슷하게, 서브클래스의 실패 할 수 있는 초기화는 슈퍼클래스의 실패 할 수 있는 초기화로 위임 할 수 있습니다.

어떤 경우든지, 초기화를 실패하게 하는 다른 초기화에 위임한 경우에, 전체 초기화 과정은 즉시 실패하고, 더 이상 초기화 코드는 실행되지 않습니다.

> Note:실패 할 수 있는 초기화는 실패하지 않는 초기화에 위임 할 수 있습니다. 실패하지 않는 기존 초기화 과정에 실패할 가능성이 있는 상태를 추가해야 하는 경우에 이 방법을 사용합니다.

아래 예제는 `Product`의 서브클래스 `CartItem`을 정의합니다. CartItem 클래스는 온라인 쇼핑카트에 있는 항목을 모델링한 것입니다. CartItem은 저장 상수 프로퍼티 quantity를 도입하고 프로퍼티는 항상 1의 이상의 값(최소 1)을 가지는 것을 보장합니다.

```swift
class Product {
    let name: String
    init?(name: String) {
        if name.isEmpty { return nil }
        self.name = name
    }
}
 
class CartItem: Product {
    let quantity: Int
    init?(name: String, quantity: Int) {
        if quantity < 1 { return nil }
        self.quantity = quantity
        super.init(name: name)
    }
}
```

CartItem에 대한 실패 할 수 있는 초기화는 quantity값이 1이상을 가지는지 확인하는 것으로 시작합니다. quantity가 유효하지 않으면, 모든 초기화 과정은 즉시 실패하고 더 이상 초기화 코드가 실행되지 않습니다. 게다가, Product에 대한 실패 할 수 있는 초기화는 name값을 확인하고, name이 빈 문자열이면 초기화 과정은 즉시 실패합니다.

CartItem인스턴스를 비어있지 않는 이름과 1이상의 값으로 생성하면, 초기화는 성공합니다

```swiftif let twoSocks = CartItem(name: "sock", quantity: 2) {
    print("Item: \(twoSocks.name), quantity: \(twoSocks.quantity)")
}
// Prints "Item: sock, quantity: 2"
```

`quantity`값을 0으로 `CertItem`인스턴스를 생성하려고 하면, CertItem초기화는 실패하게 됩니다.

```swift
if let zeroShirts = CartItem(name: "shirt", quantity: 0) {
    print("Item: \(zeroShirts.name), quantity: \(zeroShirts.quantity)")
} else {
    print("Unable to initialize zero shirts")
}
// Prints "Unable to initialize zero shirts"
```

비슷하게, 비어있는 `name`값으로 `CartItem` 인스턴스 생성을 시도하면, 슈퍼클래스 Product 초기화가 실패합니다.

```swift
if let oneUnnamed = CartItem(name: "", quantity: 1) {
    print("Item: \(oneUnnamed.name), quantity: \(oneUnnamed.quantity)")
} else {
    print("Unable to initialize one unnamed product")
}
// Prints "Unable to initialize one unnamed product"
```

---

## Overriding a Failable Initializer

다른 초기화와 마찬가지로, 하위클래스에서 상위클래스의 실패 할 수 있는 초기화를 `오버라이드(override)` 할 수 있습니다. 대신에, 상위클래스 실패 할 수 있는 초기화를 서브클래스의 `실패하지 않는(nonfailable)` 초기화로 오버라이드 할 수 있습니다. 이렇게 하면 비록 슈퍼클래스의 초기화가 실패하더라도, 초기화가 실패하지 않는 서브클래스를 정의하는 것이 가능합니다.

> Note: 상위클래스에서 init? 하더라도 하위클래스에서는 init 사용가능.

실패 할 수 있는 상위클래스 초기화를 실패하지 않는 하위클래스 초기화로 `오버라이드(override)` 하면, 상위클래스 초기화로 위임하는 유일한 방법은 실패 할 수 있는 상위클래스 초기화 결과를 강제로 `언래핑(force-unwrap)`하는 것입니다.

> Note: 실패하지 않는 초기화로 실패 할 수 있는 초기화를 오버라이드 할 수 있지만 다른 방법은 없습니다.

아래 예제는 Document 클래스를 정의 하였습니다. 이 클래스는 비어있지 않는 문자열값이나 nil 이지만, 빈 문자열 일수는 없는 name 프로퍼티를 가지고 초기화 할 수 있는 문서를 모델링 합니다.

```swift
class Document {
    var name: String?
    // this initializer creates a document with a nil name value
    init() {}
    // this initializer creates a document with a nonempty name value
    init?(name: String) {
        if name.isEmpty { return nil }
        self.name = name
    }
}
```

다음 예제는 `Document`의 서브클래스인 `AutomaticallyNamedDocument`를 정의 하였습니다. AutomaticallyNamedDocument서브클래스는 Document에서 도입된 지정된 초기화 두개 모두 오버라이드 하였습니다. 이러한 오버라이드는 AutomaticallyNamedDocument인스턴스가 이름 없이 초기화 되거나 init(name:) 초기화로 빈 이름이 전달된 경우에name의 초기값이 "[Untitled]"를 가지는 것을 보장합니다.

```swift
class AutomaticallyNamedDocument: Document {
    override init() {
        super.init()
        self.name = "[Untitled]"
    }
    override init(name: String) {
        super.init()
        if name.isEmpty {
            self.name = "[Untitled]"
        } else {
            self.name = name
        }
    }
}
```

`AutomaticallyNamedDocument`는 슈퍼클래스의 실패하지 않는 init(name:) 초기화를 실패 할 수 있는 init?(name:)초기화로 오버라이드 합니다. AutomaticallyNamedDocument가 슈퍼클래스와 다른 방법으로 빈 문자열을 잘 처리하기 때문에, 초기화는 실패할 필요가 없고, 실패하지 않는 버젼의 초기화를 대신 제공합니다.

서브클래스의 실패하지 않는 초기화의 구현의 일부로, 슈퍼클래스로부터 실패 할 수 있는 초기화를 호출 하기 위해 초기화에서 강제 언래핑(forced unwrapping)을 사용 할 수 있습니다. 예를 들어, 아래의 `UntitledDocument` 하위클래스는 항상 `"[Untitled]"`이름을 가지고, 슈퍼클래스가 초기화 하는 동안 실패 할 수 있는 `init(named:)` 초기화를 사용합니다.

```swift
class UntitledDocument: Document {
    override init() {
        super.init(name: "[Untitled]")!
    }
}
```

이 경우, 슈퍼클래스의 `init(name:)`초기화는 이름으로 빈 문자열이 호출되었으며, 강제 언래핑 동작으로 인해 `실시간 오류`가 발생합니다. 하지만, 상수 문자열이 호출되었기 때문에, 초기화가 실패하지 않는 것을 볼 수 있으며, 이 경우에, `실시간 오류가 발생 할 수 없습`니다.

---

## The init! Failable initializer

일반적으로 init키워드 뒤에 물음표를 붙여(init?) 적절한 타입의 옵셔널 인스턴스를 만드는 실패 할 수 있는 초기화를 정의합니다. 그렇지 않으면, 적절한 타입의 암시적으로 언래핑된 옵셔널 인스턴스를 만드는 실패 할 수 있는 초기화를 정의 할 수 있습니다. 물음표(?) 대신에 init 키워드 뒤에 느낌표(!) 표시를 합니다.

init?를 init!로 위임할 수 있고 그 반대도 가능하고, init?를 init!로 오버라이드 할 수 있고 그 반대도 가능합니다. init에서 init!로 위임 할 수 있고, init!초기화가 실패하여 초기화가 실패하면 assetion이 발생 할 것입니다

---

## Required Initializers

클래스의 서브클래스가 반드시 초기화를 구현해야 한다는 것을 정의하기 위해 클래스 초기화 정의 앞에 `required`를 작성합니다.

```swift
class SomeClass {
    required init() {
        // initializer implementation goes here
    }
}
```

필수 초기화의 모든 서브클래스 구현 앞에 `required` 수식어를 작성해야 하며, 서브클래스와 연관하여 필수 초기화가 적용되는 것을 나타냅니다. `필수인 지정된 초기화를 재정의 할때 에는 override는 작성하지 않습니다.`

```swift
class SomeSubclass: SomeClass {
    required init() {
        // subclass implementation of the required initializer goes here
    }
}
```

> Note: 상속된 초기화 요건이 충족될때, 필수 초기화의 명시적인 구현을 제공할 필요가 없습니다.

---

## Setting a Default Property Value with a Closure of Function

저장 프로퍼티의 기본값이 약간의 사용자정의나 설정이 필요하면, 프로퍼티에 대한 사용자정의된 기본 값을 제공하기 위해, `클로저`나 `전역 함수`를 사용 할 수 있습니다. 타입의 새로운 인스턴스의 프로퍼티가 초기화될때마다, 클로저나 함수는 호출되고, 프로퍼티의 기본값으로 할당된 값을 반환합니다.

이러한 클로저나 함수의 종류는 일반적으로 프로퍼티와 같은 타입의 임시 값으로 생성하며, 원하는 초기 상태를 표현하기 위해 값을 조정하고, 프로퍼티의 기본 값으로 사용하기 위해 임시 값을 반환합니다.

다음은 클로저를 프로퍼티 기본 값을 제공하기 위해 사용 될 수있는 방법에 대한 핵심 개요입니다.

```swift
class SomeClass {
    let someProperty: SomeType = {
        // create a default value for someProperty inside this closure
        // someValue must be of the same type as SomeType
        return someValue
    }()
}
```

클로저의 끝 중괄호(})뒤에 비어 있는 괄호(()) 한 쌍을 붙여주는 것을 주의합니다. 이는 Swift에서 `클로져가 즉시 실행한다`는 것을 말합니다. `괄호(())를 생략하면, 프로퍼티에 클로저를 할당하려 할것이고, 클로저의 반환 값이 아닙니다.`

> Note: 프로퍼티 초기화를 위해 클로저를 사용한다면, 클로저가 실행되는 시점에 인스턴스의 나머지가 아직 초기화 되지 않았다는 것을 기억해야 합니다. 이는 클로저에서 비록 기본 값을 가지고 있더라도, 다른 모든 프로퍼티의 값에 접근 할 수 없다는 것을 의미합니다. 또한, `암시적으로 self 프로퍼티나 인스턴스의 어떤 메소드 호출도 사용 할 수 없습니다.`

```swift
// 1
struct Chessboard {
    let boardColors: [Bool] = {
        var temporaryBoard = [Bool]()
        var isBlack = false
        for i in 1...8 {
            for j in 1...8 {
                temporaryBoard.append(isBlack)
                isBlack = !isBlack
            }
            isBlack = !isBlack
        }
        return temporaryBoard
    }()
    func squareIsBlackAt(row: Int, column: Int) -> Bool {
        return boardColors[(row * 8) + column]
    }
}

// 2
let board = Chessboard()
print(board.squareIsBlackAt(row: 0, column: 1))
// Prints "true"
print(board.squareIsBlackAt(row: 7, column: 7))
// Prints "false"
```

---

## Reference 

[Initialization](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID203)<br>
[까칠코더님 블로그](http://kka7.tistory.com/19?category=919617)