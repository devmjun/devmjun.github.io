---
layout:     post
title:      "Swift. 정리하기 20: Swift Language Guide-Protocols"
subtitle:   "Swift Language Guide-Protocols *"
date:       2018-04-13 18:35:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/home-bg.jpg
thumbnail-img: /assets/post_img/background/home-bg.jpg
share-img: /assets/post_img/background/home-bg.jpg
---

최종 수정일: 2018.10.1

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Protocols](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID267)<br>
[까칠코더님 블로그](http://kka7.tistory.com/127?category=919617)

---

## Protocols

`프로토콜(protocol)`은 메소드, 프로퍼티, 특정 작업이나 기능에 적합한(suit) 다른 요구사항을 상세하게(blueprint) 정의합니다. 프로토콜은 이러한 요구사항의 실제 구현을 제공하기 위해 `클래스, 구조체, 열거형`에 채택될(adopted)수 있습니다. 프로토콜의 요구사항을 만족하는 모든 타입은 `프로토콜을 준수(conform)` 한다고 말합니다.

요구사항을 지정하는 것 외에도 반드시 타입을 준수(conforming)하도록 구현해야 하며, 이러한 요구사항 일부를 구현하기 위해 프로토콜을 확장 하거나 준수(conforming)하는 타입을 활용하는 추가 기능을 구현 할 수 있습니다.

---

## Protocol Syntax

프로토콜은 클래스, 구조체, 열거형과 매우 유사하게 정의합니다

```swift
protocol SomeProtocol {
    // protocol definition goes here
}
```

이러한 정의의 일부로 타입 이름 뒤에 프로토콜의 이름을 위치시켜 사용자정의 타입 상태는 특정 프로토콜을 채택하며, 콜론(`:`)으로 구분됩니다. 여러개의 프로토콜을 나열 할 수 있고, 콤마(`,`)로 구분됩니다.

```swift
struct SomeStructure: FirstProtocol, AnotherProtocol {
    // structure definition goes here
}
```

클래스가 슈퍼클래스가 있으면, 슈퍼클래스 이름을 채택한 프로토콜 앞에 나열하며, 콤마(`,`)를 붙여줍니다


```swift
class SomeClass: SomeSuperclass, FirstProtocol, AnotherProtocol {
    // class definition goes here
}
```

---

## Property Requirements 

프로토콜은 준수하는 모든 타입이 특정 이름과 타입으로 인스턴스 타입이나 타입프로퍼티를 제공하도록 요구 할 수 있습니다. 그 프로토콜은 프로퍼티가 저장 프로퍼티인지 계산 프로퍼티인지 지정하지 않습니다 - 필수 프로퍼티 이름과 타입만 지정합니다. 프로토콜은 또한 각 프로퍼티는 반드시 `gettable`이거나 `gattable`과 `settable`인지만 지정합니다.

프로토톨이 `gettable`과 `settable`인 프로퍼티를 요구되면, 상수 저장 프로퍼티나 읽기 전용 계산 프로퍼티는 프로퍼티 요구사항을 충족할 수 없습니다. 프로토콜에 `gattable`인 프로퍼티만 요구되면, 그 요구사항은 모든 종류의 프로퍼티가 만족하고, 코드에서 유용하면 `settable` 프로퍼티도 유효합니다.

프로퍼티 요구사항은 항상 var키워드를 앞에 붙이는 변수 프로퍼티 처럼 선언됩니다. `Gattable`와 `settable` 프로퍼티들은 타입 선언 뒤에 `{ get set }`으로 작성하고, `gettable` 프로퍼티들은 `{ get }`으로 작성합니다.

```swift
protocol SomeProtocol {
    var mustBeSettable: Int { get set }
    var doesNotNeedToBeSettable: Int { get }
}
```

타입 프로퍼티는 프로퍼티를 정의할때 항상 static키워드를 항상 접두사를 요구합니다. 이 규칙은 클래스 구현할때 타입 프로퍼티 요구사항이 class또는 static키워드 접두사로 사용 할 수 있는 경우에도 관련있습니다(pertains).


```swift
protocol AnotherProtocol {
    static var someTypeProperty: Int { get set }
}
```

다음은 하나의 인스턴스 프로퍼티를 요구하는 프로토콜 예제입니다.


```swift
protocol FullyNamed {
    var fullName: String { get }
}
```

`FullyNamed` 프로토콜은 완전한 이름 제공하기 위해 타입을 준수하는것이 요구됩니다. 그 프로토콜은 준수하는 타입에 대해 다른 아무것도 지정하지 않습니다 -타입이 자신의 전체 이름을 제공한다는 것만을 지정합니다. 모든 `FullyNamed` 타입의 프로토콜은 반드시 `String`타입인 `gettable` 인스턴스 프로퍼티 `fullName`를 가집니다.

다음은 `FullyNamed`프로토콜을 채택(`adopts`)하고 준수(`conforms`)하는 간단한 구조체의 예제입니다.

```swift
struct Person: FullyNamed { 
	var fullName: String 
}

let john = Person(fullName: "John Appleseed") // john.fullName is "John Appleseed 
```

이 예제는 특정 사람의 이름을 나타내는 구조체 `Person`을 정의합니다. 그것은 첫번째 줄에서 정의된 것처럼, `FullyNamed`프로토콜을 적용한 상태입니다.

`Person`의 각 인스턴스는 String타입의 저장 프로퍼티 `fullName` 하나를 가집니다. 이것은 `FullyNamed` 프로토콜의 단일 요구사항과 일치하고, `Person`이 프로토콜을 정확히 준수하고 있다는 의미입니다. (Swift는 프로토콜이 요구사항이 충족되지 않으면, 컴파일시에 오류를 보여줍니다)

다음은 FullyNamed프로토콜을 채택하고 준수하는 좀 더 복잡한 클래스 입니다.

```swift
class Starship: FullyNamed {
    var prefix: String?
    var name: String
    init(name: String, prefix: String? = nil) {
        self.name = name
        self.prefix = prefix
    }
    var fullName: String {
        return (prefix != nil ? prefix! + " " : "") + name
    }
}
var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
// ncc1701.fullName is "USS Enterprise"
```

이 클래스는 `fullName`프로퍼티 요구사항을 우주선에 대한 읽기-전용 계산 프로퍼티로 구현합니다. 각 Starship클래스 인스턴스 필수적인(`mandatory`) `name`과 옵셔널 prefix를 저장합니다. FullName 프로퍼티는 prefix값이 있으면 사용하고, 우주선에 대한 전체 이름을 만들기 위해 name의 시작부분에 추가합니다.

---

## Method Requirements

프로토콜은 타입을 준수하기 위해 특정 인스턴스 메소드와 타입 메소드를 요구할 수 있습니다. 이러한 메소드는 중괄호(`{}`)나 메소드 본문 없이, 일반 인스턴스와 타입 메소드와 정확히 같은 방법으로, 프로토콜 정의의 일부로 작성합니다. 가변 매개변수도 허용되며, 일반 메소드와 동일한 규칙이 적용됩니다. 하지만, 프로토콜 정의에서 메소드 매개변수에 대한 `기본값을 지정 할 수는 없습니다.`

타입 프로퍼티 요구사항과 마찬가지로, 프로토콜에서 정의할때 타입 메소드 요구사항으로 항상 `static` 키워드 접두사를 사용합니다. 이것은 클래스 구현할때, 타입 메소드 요구사항이 `class` 또는 `static`키워드 접두사를 사용 할때에도 마찬가지 입니다.

```swift
protocol SomeProtocol {
    static func someTypeMethod()
}
```

다음 예제는 단일 인스턴스 메소드를 요구사항으로 하는 프로토콜을 정의합니다

```swift
protocol RandomNumberGenerator {
    func random() -> Double
}
```

`RandomNumberGenerator` 프로토콜은, 모든 준수하는 타입이 호출할때마다 `Double`값을 반환하는 인스턴스 메소드 `random`을 가지도록 요구합니다. 비록 프로토콜의 일부로 지정되지 않았지만, 이 값은 0.0부터 1.0 까지의 숫자가 될 것이라고 가정합니다.

`RandomNumbergenerator`프로토콜은 어떻게 각 무작위(random) 숫자가 만들어지는지에 관해 관여하지 않습니다. -그것은 단순하게 새로운 무작워 숫자를 만들어내는 표준 방법을 제공하는 요구만 합니다.

다음은 `RandomNumberGenerator`프로토콜을 적용하고 준수하는 클래스의 구현입니다. 이 클래스는 `선형 합동 생성기(linear congruential generator)`로 `의사난수(pseudorandom)` 숫자 생성 알고리즘을 구현합니다.

```swift
class LinearCongruentialGenerator: RandomNumberGenerator {
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0
    func random() -> Double {
        lastRandom = ((lastRandom * a + c).truncatingRemainder(dividingBy:m))
        return lastRandom / m
    }
}
let generator = LinearCongruentialGenerator()
print("Here's a random number: \(generator.random())")
// Prints "Here's a random number: 0.37464991998171"
print("And another one: \(generator.random())")
// Prints "And another one: 0.729023776863283"
```

---

## Mutating Method Requirements

가끔씩 인스턴스에 속한 메소드를 수정(`modify or mutate`)하는게 필요합니다. 값 타입(여기에서, 구조체와 열거형)의 인스턴스 메소드에 대해서 인스턴스의 모든 프로퍼티를 변경 할 수 있다는 것을 알려주기 위해, 메소드의 func 키워드 앞에 `mutating`키워드를 사용합니다. 이 과정은 [인스턴스 메소드에서 값 타입 수정하기(Modifying Value Types from Within Instance Methods)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Methods.html#//apple_ref/doc/uid/TP40014097-CH15-ID239)에서 설명되어 있습니다.

프로토콜을 적용한 모든 타입의 인스턴스를 변경하도록 프로토콜 인스턴스 메소드 요구사항을 정의하면, 프로토콜의 정의에서 메소드에 `mutating`키워드를 표시합니다. 이것은 구조체와 열거형이 프로토콜을 채택하고 메소드 요구사항을 충족하는것을 가능하게 합니다.

> Note: 프로토콜 인스턴스 메소드 요구사항을 `mutating`으로 표시하면, 클래스에 대한 메소드의 구현을 작성할때, `mutating`키워드를 작성할 필요가 없습니다. `mutating`키워드는 구조체와 열거형 에서만 사용됩니다.

아래 예제에서 하나의 인스턴스 메소드 요구사항 toggle을 정의한 `Togglable`프로토콜을 정의합니다. 이름에서도 알수 있듯이, `toggle()`메소드는 일반적으로 해당 타입의 프로퍼티를 수정해서, 준수하는 타입의 상태를 토글(toggle)하거나 반전 시킵니다.

`toggle()`메소드는 호출 될때 준수하는 인스턴스의 상태가 변경 될 것이 예상되는 것을 나타내기 위해, `Togglable`프로토콜 정의에서 `mutating`키워드로 표시됩니다.

```swift
protocol Togglable {
    mutating func toggle()
}
```

구조체나 열거형에 대한 `Togglable`프로토콜을 구현하면, 구조체나 열거형은 `mutating`으로 표시된 `toggle()`메소드 구현을 제공하여 프로토콜을 준수 할 수 있습니다.

아래 예제는 `OnOffSwitch`열거형을 정의 하였습니다. 이 열거형은 열거형 case가 `on`과 `off`를 가리키며, 두개의 상테를 토글(toggle) 합니다. 열거형의 `toggle` 구현은 `Togglable` 프로토콜 요구사항과 일치하기 위해. `mutating`으로 구현됩니다.

```swift
enum OnOffSwitch: Togglable {
    case off, on
    mutating func toggle() {
        switch self {
        case .off:
            self = .on
        case .on:
            self = .off
        }
    }
}
var lightSwitch = OnOffSwitch.off
lightSwitch.toggle()
// lightSwitch is now equal to .on
```

---

## Initializer Requirements

프로토콜을 타입을 준수해서 구현되도록 특정 초기화를 요구 할 수 있습니다. 이러한 초기화를 일반적인 초기화와 똑같은 방법으로 중괄호(`{}`)나 초기화 본문없이 프로토콜의 정의 일부로 작성합니다.

```swift
protocol SomeProtocol {
    init(someParameter: Int)
}
```

---

## Class Implementations of Protocol Initializer Requirements

프로토콜을 준수하는 클래스에서 지정된 초기화나 편리한 초기화중 하나로 초기화 요구사항을 구현 할 수 있습니다. 두 경우 모두, `required`수정자로 초기화 구현을 표시합니다.

```swift
class SomeClass: SomeProtocol {
    required init(someParameter: Int) {
        // initializer implementation goes here
    }
}
```

`required`를 사용하는 것은 프로토콜을 준수하는 것처럼, 명시적이거나 상속된 모든 서브클래스의 초기화 요구사항 구현을 제공하는 것을 보장합니다.

초기화 요구사항에 대한 자세한 정보는 [초기화 요구사항(Required Initializers)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID231)을 보세요.

> Note: final 클래스는 서브클래스가 될 수 없기 때문에, final로 표시된 클래스에서 프로토콜 초기화 구현에 required 표시는 필요하지 않습니다. final에 대해 자세한 것은 [오버라이드 막기(Preventing Overrides)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID231)를 보세요.

서브클래스가 슈퍼클래스의 지정된 초기화를 오버라이드 하면, 프로토콜의 초기화 요구사항과 일치하는 `required`와 `override`로 초기화 구현을 표시합니다.

```swift
protocol SomeProtocol {
    init()
}
 
class SomeSuperClass {
    init() {
        // initializer implementation goes here
    }
}
 
class SomeSubClass: SomeSuperClass, SomeProtocol {
    // "required" from SomeProtocol conformance; "override" from SomeSuperClass
    required override init() {
        // initializer implementation goes here
    }
}
```

---

## Failable Initializer Requirements

[실패 할 수있는 초기화(Failable Initializers)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID224)에서 정의된 것처럼, 프로토콜을 준수하는 타입에 실패 할 수 있는(failable) 초기화 요구사항을 정의 할 수 있습니다.

프로토콜을 준수하는 타입에서 실패 할 수 있는 초기화 요구사항은 실패 할 수 있거나(failable) 실패 하지 않는(nonfailable) 초기화로 만족시킬 수 있습니다. 실패 하지 않는(nonfailable) 초기화 요구사항은 실패하지 않는(nonfailable) 초기화나 암시적으로 언래핑된 실패 할 수 있는(failable) 초기화로 만족시킬수 있습니다.

---

## Protocols as Types

프로토콜은 실제적으로 어떤 함수도 구현하지 않습니다. 그럼에도 불구하고, 모든 프로토콜은 완전히 독립적으로 만들 수 있습니다.

프로토콜도 타입이기 때문에, 다른 타입을 허용하는 여러 곳에서 사용 할 수 있습다.

- 함수, 메소드, 초기화에서 매겨변수 타입이나 반환 타입
- 상수, 변수, 프로퍼티의 타입
- 배열, 딕셔너리, 다른 컨테이너에 있는 항목들의 타입

> Note: 프로토콜은 타입이기 때문에, Swift의 다른 타입처럼(Int, String, Double) 이름은 대문자로 시작합니다(FullyName과 RandomNumberGenerator) .

다음은 프로토콜을 타입처럼 사용하는 예제입니다.

```swift
class Dice {
    let sides: Int
    let generator: RandomNumberGenerator
    init(sides: Int, generator: RandomNumberGenerator) {
        self.sides = sides
        self.generator = generator
    }
    func roll() -> Int {
        return Int(generator.random() * Double(sides)) + 1
    }
}
```

예제는 보드게임에서 사용하는 n면의 주사위를 표현하는 새로운 `Dice` 클래스를 정의합니다. Dice인스턴스는 얼마나 많은 면을 가지고 있는지를 표현하는 정수형 프로퍼티 `sides`와 주사위를 던질때 무작위로 숫자를 생성하는 `generator` 프로퍼티를 가집니다.

`generator`프로퍼티는 `RandomNumberGenerator` 타입입니다. 그러므로, `RandomNumberGenerator`프로토콜이 적용된 모든 타입의 인스턴스를 설정 할 수 있습니다.

인스턴스가 반드시 `RandomNumberGenerator`프로토콜을 채택해야 하는 것을 제외하면, 프로퍼티에 할당한 이 인스턴스 외에는 필요하지 않습니다.

Dice는 초기 상태를 설정하기 위해 초기화를 가집니다. 이 초기화는 `RandomNumberGenerator`타입의 `generator` 매개변수를 가집니다. 새로운 Dice인스턴스를 초기화 할 때, 모든 준수하는 타입의 값을 전달 할 수 있습니다.

`Dice`는 1과 주사위 면의 갯수 사이의 정수형 값을 반환하는 하나의 인스턴스 메소드 `roll`을 제공합니다. 이 메소드는 `0.0`과 `1.0`사이의 새로운 임의의 숫자를 생성가히 위해, 생성자의 `random()`메소드를 호출하고 임의의 숫자는 올바른 범위에서 주사위 굴리는 값으로 사용한다. `generator`은 `RandomNumberGenerator`채택 하는 것을 알고 있기 때문에, `random()`메소드가 호출되는 것을 보장합니다.

`Dice`클래스가 임의의 숫자를 생성하는 `LinearCongruentialGenerator`인스턴스로 6면의 주사위를 만들어 사용하는 방법은 다음과 같습니다.

```swift
var d6 = Dice(sides: 6, generator: LinearCongruentialGenerator())
for _ in 1...5 {
    print("Random dice roll is \(d6.roll())")
}
// Random dice roll is 3
// Random dice roll is 5
// Random dice roll is 4
// Random dice roll is 5
// Random dice roll is 4
```

---

## Delegation 

`위임(delegation)`은 클래스나 구조체가 다른 타입의 인스턴스에 책임을 넘겨주는(`hand off 또는 delegate`) 것이 가능한 디자인 패턴입니다. 이 디자인 패턴은 프로토콜을 준수하는 타입(delegate 처럼)이 위임된 기능을 제공하는 것을 보증하는것 처럼, 위임된 책임을 캡슐화하는 프로토콜을 정의하여 구현됩니다. 위임은 특정 동작에 응답하거나 소스의 기본 타입에 상관없이 외부 소스로부터 데이터 검색하는데 사용 할 수 있습니다.

아래 예제는 주사위 기반의 보드 게임을 위해 두 개의 프로토콜을 정의 하였습니다.

```swift
protocol DiceGame {
    var dice: Dice { get }
    func play()
}
protocol DiceGameDelegate {
    func gameDidStart(_ game: DiceGame)
    func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int)
    func gameDidEnd(_ game: DiceGame)
}
```

`DiceGame`프로토콜은 주사위와 관련있는 모든 게임에 적용 할 수 있는 프로토콜입니다. `DiceGameDelegate`프로토콜은 `DiceGame`의 진행을 기록하는 모든 게임에 적용 할 수 있습니다.

다음은 원래 [흐름제어(Control Flow)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ControlFlow.html#//apple_ref/doc/uid/TP40014097-CH9-ID120)에서 소개된 뱀과 사다리(Snakes and Ladders) 게임 버전 입니다. 이 버전은 주사위 던지는 `Dice`인스턴스를 사용하도록 되어 있습니다; `DiceGame`프로토콜을 적용하기 위해; 그리고 `DiceGameDelegate`에 진행 상황을 알리기 위해:

```swift
class SnakesAndLadders: DiceGame {
    let finalSquare = 25
    let dice = Dice(sides: 6, generator: LinearCongruentialGenerator())
    var square = 0
    var board: [Int]
    init() {
        board = Array(repeating: 0, count: finalSquare + 1)
        board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
        board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
    }
    var delegate: DiceGameDelegate?
    func play() {
        square = 0
        delegate?.gameDidStart(self)
        gameLoop: while square != finalSquare {
            let diceRoll = dice.roll()
            delegate?.game(self, didStartNewTurnWithDiceRoll: diceRoll)
            switch square + diceRoll {
            case finalSquare:
                break gameLoop
            case let newSquare where newSquare > finalSquare:
                continue gameLoop
            default:
                square += diceRoll
                square += board[square]
            }
        }
        delegate?.gameDidEnd(self)
    }
}
```

뱀과 사다리(Snakes and Ladders) 게임 진행에 대한 설명은, [흐름 제어(Control Flow)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ControlFlow.html#//apple_ref/doc/uid/TP40014097-CH9-ID120)의 Break 섹션을 보세요.

이 게임 버전은 `DiceGame`프로토콜을 적용한 `SnakesAndLadders`클래스로 감싸(wrapped)졌습니다. 프로토콜을 준수하기 위해 `gettabledice`프로퍼티와 `play()`메소드를 제공합니다. (`dice` 프로퍼티는 상수 프로퍼티로 선언되었기 때문에 초기화 후에 변경할 필요가 없고, 프로토콜을 `gettable`만을 요구합니다)

뱀과 사다리(`Snakes and Ladders`) 보드 게임은 클래스의 `init()`초기화에서 설정합니다. 모든 게임 로직은 주사위 던지는 값을 제공하기 위해 프로토콜의 `dice`프로퍼티를 사용하는, 프로토콜의 `play`메소드로 움직입니다.

게임을 진행하는데 위임(`delegate`)이 필요하지 않기 때문에, delegate 프로퍼티는 옵셔널 `DiceGameDelegate`로 정의되는 것을 주의합니다. 옵셔널 타입이기 때문에, `delegate`프로퍼티는 자동으로 초기값이 `nil`로 설정됩니다. 그 후에, 게임 인스턴스는 프로퍼티를 적절한 위임(`delegate`)으로 설정하는 옵션이 있습니다.

`DiceGameDelegate`는 게임 진행을 기록하기 위해 3개의 메소드를 제공합니다. 3개의 메소드는 위의 `play()`메소드안에 게임 로직이 포함되어 있고, 새 게임을 시작할때, 새 턴을 시작하거나 게임이 끝날때 호출됩니다.

`delegate`프로퍼티가 `옵셔널(optional) DiceGameDelegate`이기 때문에, `play()`메소드는 위임(delegate)에 대한 메소드를 호출할때마다 옵셔널 체이닝을 사용합니다. `delegate`프로퍼티가 nil이면, 이러한 위임(delegate) 호출은 오류 없이 정상적으로 실패합니다. `delegate`가 nil이 아니면, 위임(delegate) 메소드는 호출되고, 매개변수로 `SnakesAndLadders`인스턴스가 전달됩다.

다음 예제는 `DiceGameDelegate`프로토콜을 적용한, `DiceGameTracker`클래스를 보여줍니다.

```swift
class DiceGameTracker: DiceGameDelegate {
    var numberOfTurns = 0
    func gameDidStart(_ game: DiceGame) {
        numberOfTurns = 0
        if game is SnakesAndLadders {
            print("Started a new game of Snakes and Ladders")
        }
        print("The game is using a \(game.dice.sides)-sided dice")
    }
    func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int) {
        numberOfTurns += 1
        print("Rolled a \(diceRoll)")
    }
    func gameDidEnd(_ game: DiceGame) {
        print("The game lasted for \(numberOfTurns) turns")
    }
}
```

`DiceGameTracker`은 `DiceGameDelegate`가 요구하는 메소드 3개를 구현합니다. 이러한 메소드들은 게임 턴의 수를 기록하는데 사용합니다. 게임을 시작할때 `numberOfTurns`프로퍼티는 0으로 재설정하며, 새 턴이 시작할때마다 증가시키고, 게임이 종료되면 전체 턴의 수를 출력합니다.

위에서 보여진 `gameDidStart(_:)`의 구현은 곧 시작될 게임에 관한 정보를 출력하기 위해 game 매개변수를 사용합니다. `game` 매개변수는 `SnakesAndLadders`가 아닌 `DiceGame`의 타입이고, `gameDidStart(_:)`는 `DiceGame`프로토콜에 구현된 메소드와 프로퍼티만 접근하고 사용할 수 있습니다. 하지만, 이 메소드는 기본 인스턴스의 타입을 조회하기 위해 타입 변환이 가능합니다. 예제에서, game이 실제 `SnakesAndLadders`인스턴스인지 확인하고, 적절한 메시지를 출력합니다.

`gameDidStart(_:)`메소드는 전달된 `game`매개변수의 `dice`프로퍼티에 접근합니다. `game`은 `DiceGame`프로토콜을 준수하는 것을 알고 있기 때문에, dice 프로퍼티를 가지는 것을 보증하고, `gameDidStart(_:)`메소드가 어떤 게임 종류인지에 상관없이, 주사위의 sides프로퍼티를 접근하고 출력하는게 가능합니다.

다음은 `DiceGameTracker`가 어떻게 동작하는지 봅니다.

```swift
let tracker = DiceGameTracker()
let game = SnakesAndLadders()
game.delegate = tracker
game.play()
// Started a new game of Snakes and Ladders
// The game is using a 6-sided dice
// Rolled a 3
// Rolled a 5
// Rolled a 4
// Rolled a 5
// The game lasted for 4 turns
```

---

## Adding Protocol Conformance with an Extension

기존 타입을 새로운 프로토콜을 적용하고 준수(conform)하기 위해 확장 할 수 있으며, 심지어는 기존 타입에 대한 소스코드에 접근 할 수 없는 경우에도 확장 할 수 있습니다. 확장은 기존 타입에 새로운 프로퍼티, 메소드, 서브스크립트를 추가 할 수 있고, 따라서 프로토콜 요구사항을 추가하는게 가능합니다. 확장에 대해 더 자세한 정보는 [확장(Extensions)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Extensions.html#//apple_ref/doc/uid/TP40014097-CH24-ID151)을 보세요.

> Note: 확장에서 인스턴스의 타입에 일치하는 프로토콜이 추가 될때, 기존 인스턴스의 타입은 자동으로 프로토콜을 채택(adopt)하고 준수합니다.

예를 들어, `TextRepresentable`프로토콜은 텍스트로 표현 할 수 있는 모든 타입으로 구현 할 수 있습니다. 이는 스스로에 대한 설명이거나 현재 상태의 텍스트 버젼일 수 있습니다.

```swift
protocol TextRepresentable {
    var textualDescription: String { get }
}
```

이전의 `Dice`클래스에 `TextRepresentable`를 적용하고 준수하도록 확장 할 수 있습니다.

```swift
extension Dice: TextRepresentable {
    var textualDescription: String {
        return "A \(sides)-sided dice"
    }
}
```

이 확장은 `Dice`가 원래 구현에서 제공된 것과 정확히 같은 방식으로 새로운 프로토콜을 채택합니다. 그 프로토콜 이름은 타입 이름 뒤에, 콜론(:)으로 구분되어 제공되고, 프로토콜의 모든 요구사항 구현은 확장의 중괄호({}) 안에서 제공됩니다.

모든 Dice인스턴스는 이제 TextRepresentable를 처리 할 수 있습니다.

```swift
let d12 = Dice(sides: 12, generator: LinearCongruentialGenerator())
print(d12.textualDescription)
// Prints "A 12-sided dice"
```

비슷하게, `SnakesAndLadders` 게임 클래스는 TextRepresentable프로콜을 적용하고 준수하도록 확장 할 수 있습니다.

```swift
extension SnakesAndLadders: TextRepresentable {
    var textualDescription: String {
        return "A game of Snakes and Ladders with \(finalSquare) squares"
    }
}
print(game.textualDescription)
// Prints "A game of Snakes and Ladders with 25 squares"
```

---

## Conditionally Conforming to a Protocol

제네릭(generic) 타입의 제네릭 파라미터가 프로토콜을 따를때 타입은 기초된 요구사항을 충족하는게 가능합니다.

타입이 확장되었을때 제약조건을 나열하여 프로토콜을 조건부로 준수할수 있습니다. 일반 `where`절을 작성하여 채택하고 있는 프로토콜의 이름 다음에 이러한 제약 조건을 작성하세요. 

제네릭 where절에 대한 자세한 내용은 [Generic Where clauses](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID192) 절을 참조하세요

The following extension makes Array instances conform to the TextRepresentable protocol whenever they store elements of a type that conforms to TextRepresentable.

다음의 확장 기능은 Array인스턴스가 TextRepresentable을 준수하는 타입의 요소를 저장할때마다 TextRepresentable프로토콜을 준수하도록 합니다.

```swift
extension Array: TextRepresentable where Element: TextRepresentable {
    var textualDescription: String {
        let itemsAsText = self.map { $0.textualDescription }
        return "[" + itemsAsText.joined(separator: ", ") + "]"
    }
}
let myDice = [d6, d12]
print(myDice.textualDescription)
// Prints "[A 6-sided dice, A 12-sided dice]"
```

---

## Declaring Protocol Adoption with an Extension

이미 프로토콜의 모든 요구사항을 준수하는 타입인 경우이지만, 아직 프로토콜 적용이 언급되지 않았으면, 비어있는 확장으로 프로토콜이 적용되도록 할 수 있습니다.

```swift
struct Hamster {
    var name: String
    var textualDescription: String {
        return "A hamster named \(name)"
    }
}
extension Hamster: TextRepresentable {}
```

Hamster의 인스턴스는 `TextRepresentable`이 필수 타입이면 어디든지 사용 할 수 있습니다.

```swift
let simonTheHamster = Hamster(name: "Simon")
let somethingTextRepresentable: TextRepresentable = simonTheHamster
print(somethingTextRepresentable.textualDescription)
// Prints "A hamster named Simon"
```

> Note: 타입은 요구사항을 충족한다고해서 자동으로 프로토콜이 채택되지 않습니다. 언제나 명시적으로 프로토콜을 채택한다고 선언해야 한다.

---

## Collections of Protocol Types

프로토콜은 타입 같은 [프로토콜(Protocols as Types)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID275)에서 언급했던 것 처럼, 배열이나 딕셔너리 처럼, 컬렉션(collection)에 저장되는 타입으로 사용 할 수 있습니다. 이 예제는 TextRepresentable의 배열을 생성합니다.

```swift
let things: [TextRepresentable] = [game, d12, simonTheHamster]
```

이제 배열의 항목을 반복하고 각 항목들의 텍스트 설명을 출력하는게 가능합니다.

```swift
for thing in things {
    print(thing.textualDescription)
}
// A game of Snakes and Ladders with 25 squares
// A 12-sided dice
// A hamster named Simon
```

`thing`상수는 `TextRepresentable`의 타입인것을 주의합니다. 그것은 `Dice`나 `DiceGame`, `Hamster` 타입이 아니며, 심지어는 실제 인스턴스가 이러한 타입들 중 하나일지라도 말입니다. 그럼에도 불구하고, `TextRepresentable` 타입이기 때문에, `TextRepresentable`은 `textualDescription`프로퍼티를 가지고 있어서, 반복문에서 `thing.textualDescription`에 안전하게 접근 할 수 있습니다

---

## Protocol Inheritance 

프로토콜은 하나 이상의 다른 프로토콜을 상속(inherit) 할 수 있고 상속된 요구 사항보다 더 많은 요구사항을 추가 할 수 있습니다. 프로토콜 상속에 대한 문법은 클래스 상속에 대한 문법과 비슷하지만, 여러개의 프로토콜 목록 콤마(`,`)로 구분하여 상속 할 수 있는 옵션이 있습니다.

```swift
protocol InheritingProtocol: SomeProtocol, AnotherProtocol {
    // protocol definition goes here
}
```

다음은 위의 TextRepresentable 프로토콜을 상속한 예제입니다.

```swift
protocol PrettyTextRepresentable: TextRepresentable {
    var prettyTextualDescription: String { get }
}
```

이 예제는 TextRepresentable로 부터 상속된 새로운 프로토콜 PrettyTextRepresentable을 정의합니다. PrettyTextRepresentable이 적용된 모든 것들은 반드시 TextRepresentable의 모든 요구사항을 만족시켜야 하며, 추가적으로 PrettyTextRepresentable의 요구사항도 만족시켜야 합니다. 예제에서 PrettyTextRepresentable은 String을 반환하는 prettyTextualDescription gettable 프로퍼티를 제공하도록 요구사항을 하나를 추가하였습니다.

SnakesAndLadders클래스는 PrettyTextRepresentable를 채택하고 준수하도록 확장 할 수 있습니다.

```swift
extension SnakesAndLadders: PrettyTextRepresentable {
    var prettyTextualDescription: String {
        var output = textualDescription + ":\n"
        for index in 1...finalSquare {
            switch board[index] {
            case let ladder where ladder > 0:
                output += "▲ "
            case let snake where snake < 0:
                output += "▼ "
            default:
                output += "○ "
            }
        }
        return output
    }
}
```

이 확장은 `PrettyTextRepresentable`프로토콜을 적용한 상태이고 `SnakesAndLadders`타입에 대한 `prettyTextualDescription`프로퍼티의 구현을 제공합니다. 뭐든간에 `PrettyTextRepresentable`은 반드시 `TextRepresentable`이어야 하고, 문자열 출력을 위해 `TextRepresentable`프로토콜로부터 `textualDescription`프로퍼티 접근하여 `prettyTextualDesciption`의 구현을 시작합니다. 콜론(`:`)과 줄바꿈을 추가하고, 텍스트를 보기좋게(pretty) 표현하는 것으로 시작합니다. 그런 다음 보드판의 배열의 반복을 하고, 각 칸(square)의 콘텐츠를 표현하기 위해 특수문자를 추가합니다.

- 칸(square)의 값이 0보다 크고, 사다리의 시작이면, ▲ 으로 표현됩니다.
- 칸(square)의 값이 0보다 작고, 뱀의 머리이면, ▼ 으로 표현됩니다.
- 그 외에 칸의 값이 0이고, 비어있는(free) 칸(square)이면, ○으로 표현됩니다.

`prettyTextualDescription`프로퍼티는 `SnakesAndLadders`인스턴스의 설명을 보기좋은(pretty) 텍스트로 출력 할 수 있습니다.

```swift
print(game.prettyTextualDescription)
// A game of Snakes and Ladders with 25 squares:
// ○ ○ ▲ ○ ○ ▲ ○ ○ ▲ ▲ ○ ○ ○ ▼ ○ ○ ○ ○ ▼ ○ ○ ▼ ○ ▼ ○
```

---

## Class-Only Protocols 

프로토콜의 상속 목록에 `AnyObject`프로토콜을 추가하여 클래스 타입(구조체나 열거형이 아님)에 프로토콜 채택을 제한할 수 있습니다.


```swift
protocol SomeClassOnlyProtocol: AnyObject, SomeInheritedProtocol {
    // class-only protocol definition goes here
}
```

위의 예제에서, `SomeClassOnlyProtocol`은 클래스 타입에만 적용 할 수 있습니다. 구조체나 열거형 정의에 `SomeClassOnlyProtocol`을 적용하려고 하면 컴파일시 오류가 납니다.

> Note: 프로토콜의 요구사항을 가지도록 행동이 정의되었거나 값(value) 의미보다 참조(reference) 의미를 가지는 타입을 준수하도록 요구될때, 클래스 전용(class-only) 프로토콜을 사용합니다. 참조와 값의 의미에 대한 자세한 내용은 [구조체와 열거형은 값 타입 입니다(Structures and Enumerations Are Value Types)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ClassesAndStructures.html#//apple_ref/doc/uid/TP40014097-CH13-ID88)와 [클래스는 참조 타입입니다(Classes Are Reference Types)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ClassesAndStructures.html#//apple_ref/doc/uid/TP40014097-CH13-ID89)를 보세요.

---

## Protocol Composition

한번에 여러개의 프로토콜을 준수하도록 하는게 유용 할 수 있습니다. 여러개의 프로토콜을 `프로토콜 합성(protocol composition)`으로 하나의 요구사항으로 합성 할 수 있습니다. 프로토콜 합성은 `SomeProtocol & AnotherProtocol` 형식를 가집니다. 필요한 만큼 많은 프로토콜을 나열 할 수 있으며, `&`로 구분합니다.

다음은 함수의 매개변수에 필요한 단일 프로토콜 합성으로 `Name`와 `Aged` 두개의 프로토콜을 결합한 예제입니다.

```swift
protocol Named {
    var name: String { get }
}
protocol Aged {
    var age: Int { get }
}
struct Person: Named, Aged {
    var name: String
    var age: Int
}
func wishHappyBirthday(to celebrator: Named & Aged) {
    print("Happy birthday, \(celebrator.name), you're \(celebrator.age)!")
}
let birthdayPerson = Person(name: "Malcolm", age: 21)
wishHappyBirthday(to: birthdayPerson)
// Prints "Happy birthday, Malcolm, you're 21!"
```

이 예제에서, `Named`프로토콜은 gettable `String`프로퍼티 name인 하나의 요구사항을 가집니다. Aged 프로토콜은 gettable Int프로퍼티 age에 대한 하나의 요구사항을 가집니다. 두 프로토콜은 구조체 Person에 의해 채택됩니다.

또한, 그 예제는 `wishHappyBirthday(to:)` 함수를 정의합니다. `celebrator` 매개변수의 타입은 모든 타입은 `Named`와 `Aged` 프로토콜을 준수합니다를 의미하는 `Named & Aged` 입니다. 필요한 프로토콜 모두를 준수하는 한, 특정 타입이 함수로 전달 되는 것은 중요하지 않습니다.

그런 다음 그 예제는 새로운 `Person`인스턴스 `birthdayPerson`을 생성하고 `withHappyBirthday(to:)` 함수에 새로운 인스턴스를 전달합니다. `Person`은 두개의 프로토콜을 모두 준수하기 때문에, 이 호출은 유효하고, `wishHappyBirthday(to:)` 함수는 생일축하를 출력할 수 있습니다.

다음은 이전 예제의 `Location`클래스를 사용해서 `Named`프로토콜을 결합한 예제 입니다.

```swift
class Location {
    var latitude: Double
    var longitude: Double
    init(latitude: Double, longitude: Double) {
        self.latitude = latitude
        self.longitude = longitude
    }
}
class City: Location, Named {
    var name: String
    init(name: String, latitude: Double, longitude: Double) {
        self.name = name
        super.init(latitude: latitude, longitude: longitude)
    }
}
func beginConcert(in location: Location & Named) {
    print("Hello, \(location.name)!")
}

let seattle = City(name: "Seattle", latitude: 47.6, longitude: -122.3)
beginConcert(in: seattle)
// Prints "Hello, Seattle!"
```

`beginConcert(in:)` 함수는 모든 타입은 `Location`의 하위클래스이고 `Named` 프로토콜을 준수합니다을 의미하는 `Location & Named` 타입의 매개변수를 가집니다. 이 경우에는, `City`는 모든 요구사항을 만족합니다.

`Person`이 `Location`의 하위클래스가 아니기 때문에, `birthdayPerson`을 `beginConcert(in:)` 함수에 전달하는 것은 유효하지 않습니다. 마찬가지로, Named 프로토콜을 준수하지 않는 Location의 하위클래스를 만드는 경우에, 타입의 인스턴스로 beginConcert(in) 호출하는 것 또한 유효하지 않습니다.


---

## Checking for Protocol Conformance

프로토콜을 준수하는지 확인하기 위해 [타입변환(Type Casting)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TypeCasting.html#//apple_ref/doc/uid/TP40014097-CH22-ID338)에서 설명한 `is`와 `as`연산자를 사용 할 수 있고, 특정 프로토콜로 변환(cast) 할 수 있습니다. 프로토콜을 확인하고 변환(`cast`)하는 것은 타입을 확인하고 변환(`cast`)하는 것과 똑같은 구문을 따릅니다.

- 인스턴스가 프로토콜을 준수하면 `is`연산자는 `true`를 반환하고 그렇지 않으면 `false`를 반환합니다.
- 다운캐스트(downcast) 연산자 `as?`버전은 프로토콜의 타입 값을 옵셔널 값으로 반환하고, 인스턴스가 프로토콜을 준수하지 않으면 `nil`이 됩니다.
- 다운캐스트(`downcast`) 연산자 `as!`버전은 프로토콜의 타입으로 강제적으로 다운캐스트 하고 다운캐스트가 성공하지 않은 경우 실시간 오류가 발생합니다.

예제는 gettable `Double` 프로퍼티 `area` 하나를 요구하는 프로토콜 HasArea를 정의합니다.

```swift
protocol HasArea {
    var area: Double { get }
}
두 클래스 Circle와 Country 모두 HasArea프로토콜을 준수합니다.
```

2개의 클래스 Circle와 Country가 있으며, 둘다 HasArea프로토콜을 준수합니다.


```swift
class Circle: HasArea {
    let pi = 3.1415927
    var radius: Double
    var area: Double { return pi * radius * radius }
    init(radius: Double) { self.radius = radius }
}
class Country: HasArea {
    var area: Double
    init(area: Double) { self.area = area }
}
```

`Circle`클래스는 계산 프로퍼티로 `area` 프로퍼티 요구사항을 구현하며, `radius` 저장 프로퍼티를 기반으로 합니다. `Country`클래스는 `area`을 저장 프로퍼티로 직접 구현합니다. 두 클래스 모두 현재 `HasArea`프로토콜을 준수합니다.

다음은 `HasArea`프로콜을 준수하지 않는, `Animal` 클래스가 있습니다.

```swift
class Animal {
    var legs: Int
    init(legs: Int) { self.legs = legs }
}
```

`Circle`, `Country`, `Animal`클래스는 기본 클래스를 공유하지 않습니다. 그럼에도 불구하고, `AnyObject`타입의 값을 저장하는 배열을 초기화 하는데 3가지 타입의 인스턴스를 사용 할 수 있습니다.

```swift
let objects: [AnyObject] = [
    Circle(radius: 2.0),
    Country(area: 243_610),
    Animal(legs: 4)
]
```

`objects` 배열은 반지름이 2인 `Circle`인스턴스가 포함된 배열 그대로 초기화됩니다.; `Country`인스턴스는 영국 면적을 평방 킬로미터로 초기화 됩니다.; 그리고 `Animal`인스턴스는 다리 4개를 가지고 초기화 됩니다.

objects배열은 이제 반복 될 수 있고, 배열내의 각 객체(object)는 HasArea프로토콜을 준수하는지 확인하는 것을 볼수 있습니다.

```swift
for object in objects {
    if let objectWithArea = object as? HasArea {
        print("Area is \(objectWithArea.area)")
    } else {
        print("Something that doesn't have an area")
    }
}
// Area is 12.5663708
// Area is 243610.0
// Something that doesn't have an area
```

배열 내의 객체가 HasArea프로토콜을 준수 할때마다, `as?`연산자에 의해 옵셔널 값이 반환되며, `objectWithArea` 상수에 옵셔널 바인딩으로 언래핑(`unwrapped`)합니다. `objectWithArea`상수는 `HasArea`의 타입이고, `area`프로퍼티는 타입에 안전하게 접근하고 출력할 수 있습니다.

기본 객체는 변환(`casting`) 과정에서 변경되지 않는다는 것을 주의 합니다. 계속해서 `Circle`, `Country`, `Animal`이 됩니다. 하지만, `objectWithArea` 상수에 저장되는 시점에, HasArea타입으로 되고, area프로퍼티에만 접근 할 수 있습니다.

---

## Optional Protocol Requirements

프로토콜에 대한 옵셔널 요구사항(`optional requirements`)을 정의 할 수 있습니다. 이러한 요구사항은 프로토콜을 준수하는 타입을 구현할 필요가 없습니다. 옵셔널 요구사항(optional requirements)은 프로토콜의 정의에서 접두사로 `optional`을 붙인다. 옵셔널 요구사항은 `Objective-C`와 상호작용하는 코드를 작성 하는것이 가능합니다. 프로토콜과 옵셔널 요구사항 둘다 반드시 `@objc`속성으로 표시되야 합니다. `@objc`프로토콜은 `Objective-C`클래스나 다른 `@objc`클래스 로부터 상속받은 클래스에만 적용 할 수 있습니다. 구조체나 열거형에는 적용 할 수 없습니다.

옵셔널 요구사항에서 메소드나 프로퍼티를 사용하면, 타입은 자동으로 옵셔널이 됩니다. 예를 들어, `(Int) -> String` 타입 메소드가 `((Int) -> String)?`이 됩니다. 전체 함수 타입은 옵셔널로 래핑(wrapped)되며, 메소드의 반환 값은 없다는 것을 기억합니다.

옵셔널 프로토콜 요구사항은 프로토콜을 준수하는 타입으로 요구사항이 구현되지 않을 가능성이 있는 것을 설명하기 위해 옵셔널 체이닝을 사용하여 호출 할수 있습니다. `someOptionalMethod?(someArgument)`처럼, 호출될때 메소드의 이름 뒤에 물음표(`?`)를 작성하여 옵셔널 메소드의 구현을 확인합니다. 옵셔널 체이닝에 대한 정보는, [옵셔널 체이닝(Optional Chaining)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-ID245)을 보세요.

다음 예제는 외부 데이터 소스를 사용해서 증가한 양을 제공하는 정수 계산(integer-counting) 클래스 `Counter`를 정의합니다. 이 데이터 소스는 두개의 옵셔널 요구사항을 가진 `CounterDataSource`프로토콜에 의해 정의됩니다.

```swift
@objc protocol CounterDataSource {
    @objc optional func increment(forCount count: Int) -> Int
    @objc optional var fixedIncrement: Int { get }
}
```

`CounterDataSource`프로토콜은 옵셔널 메소드 요구사항 `increment(forCount:)`와 옵셔널 프로퍼티 요구사항 `fixedIncrement`를 정의합니다. 이러한 요구사항들은 데이터 소스에 대해 Counter인스턴스에 적절한 증가량을 제공하는 두가지 다른 방법을 정의합니다.

> Note: 엄밀히 말하면, 프로토콜 요구사항 구현없이 `CounterDataSource`를 준수하는 사용자정의 클래스를 작성할 수 있습니다. 그것들은 결구 둘다 옵셔널입니다. 비록 기술적으로 가능하지만, 좋은 방법이 아닙니다.

아래 정의된 `Counter`클래스는 `CounterDataSource?`타입의 옵셔널 `dataSource`프로퍼티를 가집니다.

```swift
class Counter {
    var count = 0
    var dataSource: CounterDataSource?
    func increment() {
        if let amount = dataSource?.increment?(forCount: count) {
            count += amount
        } else if let amount = dataSource?.fixedIncrement {
            count += amount
        }
    }
}
```

`Counter`클래스는 `count` 변수 프로퍼티에 현재 값을 저장합니다. 또한, `Counter`클래스는 메소드가 호출될때마다 `count`프로퍼티를 증가하는 `increment`메소드를 정의합니다.

`increment()`메소드는 최초에 데이터 소스에서 `increment(forCount:)`메소드의 구현을 조회하여 증가한 양을 가져오도록 시도합니다. `increment()`메소드는 `increment(forCount:)` 호출하기 위해 옵셔널 체이닝을 사용하고, 메소드의 단일 인자로 현재 count값을 전달합니다.

여기에서 `옵셔널 체이닝의 2(two`) 단계를 실행하는 것을 주의합니다. 첫번째, dataSource가 nil이 될 가능성이 있고, dataSource가 nil이 아닐때, dataSource가 increment(forCount:)가 호출 할 수 있는 것을 나타내기 위해, 이름 뒤에 물음표(?) 표시를 합니다. 두번째, dataSource가 존재할지라도, 옵셔널 요구사항기기 때문에, increment(forCount:) 구현을 보증하지 않습니다. 여기서, increment(forCount:)는 구현되지 않을 가능성 또한 옵셔널 체이닝에 의해 처리됩니다. increment(forCount:)가 존재할때에만(nil이 아니면), increment(forCount:) 호출이 발생합니다. 이것이 increment(forCount:) 이름 뒤에 물음표(?) 표시를 작성하는 이유입니다.

increment(forCount:)에 호출은 두가지 이유로 실패 할 수 있기 때문에, 그 호출은 옵셔널(optional) Int 값을 반환합니다. 이것은 increment(forCount:)가 CounterDataSource의 정의에서 옵셔널이 아닌 Int값으로 반환하도록 정의되어 있더라도 true 입니다. 두개의 옵셔널 체이닝 작업으로 하나씩 처리되며 그 결과는 여전히 하나의 옵셔널로 감싸여 있습니다. 여러개의 옵셔널 체이닝 작업 사용에 대한 자세한 내용은 [체이닝의 여러 단계 연결하기(Linking Multiple Levels of Chaining)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-ID252)를 보세요.

`increment(forCount:)` 호출 후에, 옵셔널 Int는 옵셔널 바인딩을 사용하여, amount 상수로 언래핑되어 반환합니다. 옵셔널 Int가 값을 가지고 있으면(위임자와 메소드 둘다 존재하면, 메소드는 값을 반환한다) 언래핑된 amount는 count프로퍼티에 더하여 저장되고, 증가하는 것이 완료됩니다.

increment(forCount:)메소드로 값을 가져 올수 없는 경우(dataSource가 nil 또는 데이터 소스가 increment(forCount:)를 구현되지 않았기 때문에) increment()메소드는 데이터 소스의 fixedIncrement프로퍼티를 대신하여 값을 가져오려고 시도합니다. fixedIncrement프로퍼티는 옵셔널 요구사항이며, CounterDataSource프로토콜의 정의에서 fixedIncrement는 옵셔널이 아닌 Int프로퍼티로 정의되어 있음에도 불구하고, 그 값은 옵셔널 Int값 입니다.

다음은 간단하게 데이터 소스가 조회할때마다 상수값 3을 반환하는CounterDataSource를 구현하였습니다. 그것은 옵셔널 fixedIncrement프로퍼티 요구사항을 구현해서 수행합니다.

```swift
class ThreeSource: NSObject, CounterDataSource {
    let fixedIncrement = 3
}
```

새로운 `Counter`인스턴스에 대한 데이터 소스로 `ThreeSource`의 인스턴스를 사용 할 수 있습니다.

```swift
var counter = Counter()
counter.dataSource = ThreeSource()
for _ in 1...4 {
    counter.increment()
    print(counter.count)
}
// 3
// 6
// 9
// 12
```

위의 코드는 새로운 `Counter`인스턴스를 생성합니다; 그리고 새로운 `ThreeSource`인스턴스에 데이터 소스를 설정합니다; `increment()`메소드를 4번 호출합니다. 예상대로, 카운터의 `count`프로퍼티는 increment()가 호출될때마다 3씩 증가합니다.

다음은 `Counter`인스턴스 갯수를 현재 `count`값으로 부터 올리거나 0 방향으로 내리는 좀 더 복잡한 데이터 소스 `TowardsZeroSource` 입니다.

```swift
@objc class TowardsZeroSource: NSObject, CounterDataSource {
    func increment(forCount count: Int) -> Int {
        if count == 0 {
            return 0
        } else if count < 0 {
            return 1
        } else {
            return -1
        }
    }
}
```

`TowardsZeroSource`클래스는 `CounterDataSource`프로토콜로부터 옵셔널 `increment(forCount:)`메소드를 구현하고 카운트(count)할 방향을 결정하기 위해 count 인자 값을 사용합니다. `count`가 이미 0이면, 메소드는 더 이상 계산하지 않는것을 나타내기 위해 0을 반환합니다.

`TowardsZeroSource`의 인스턴스를 기존 `Counter` 인스턴스와 함께 사용해서 -4에서 0까지 계산할 수 있습니다. 카운터(counter)가 한번 0에 도달하면, 더이상 계산하지(counting) 않습니다.

```swift
counter.count = -4
counter.dataSource = TowardsZeroSource()
for _ in 1...5 {
    counter.increment()
    print(counter.count)
}
// -3
// -2
// -1
// 0
// 0
```

---

## Protocol Extensions

프로토콜은 타입을 준수하기 위해 메소드와 프로퍼티 구현을 제공하여 확장 할 수 있습니다. 이렇게 하면, 전역함수나 각 타입을 개별적으로 준수하는것 보다 프로토콜에 동작을 정의하는게 낫습니다.

예를들어, `RandomNumberGenerator`프로토콜은 `random()`메소드의 결과 값이 Bool값으로 반환하도록 `randomBool()`메소드를 확장 할 수 있습니다.

```swift
extension RandomNumberGenerator {
    func randomBool() -> Bool {
        return random() > 0.5
    }
}
```

프로토콜에서 확장을 만들어, 어떠한 추가적인 수정없이 준수하는 모든 타입의 메소드 구현을 자동으로 얻어옵니다.

```swift
let generator = LinearCongruentialGenerator()
print("Here's a random number: \(generator.random())")
// Prints "Here's a random number: 0.37464991998171"
print("And here's a random Boolean: \(generator.randomBool())")
// Prints "And here's a random Boolean: true"
```

---

## Providing Default Implementations 

프로토콜이 요구하는 모든 메소드나 계산 프로퍼티의 기본 구현을 제공하기 위해 프로토콜 확장을 사용 할 수 있습니다. 준수하는 타입이 요구된 메소드와 함수의 자체 구현을 제공하는 경우, 확장으로 제공되는 것 대신에 구현이 사용 될 것입니다.

> Note: 확장에 의해 프로토콜 요구사항과 기본 구현은 제공되는 것은 옵셔널 프로토콜 요구사항과는 별개입니다. 준수하는 타입이 자체 구현을 제공할 필요가 없지만, 기본 구현이 있는 요구사항은 옵셔널 체이닝 없이 호출 될 수 있습니다.

예를들어, PrettyTextRepresentable프로토콜은, TextRepresentable 프로토콜을 상속받아 요구된 textualDescription프로퍼티에 접근한 결과를 단순히 반환하는 prettyTextualDescription프로퍼티의 기본 구현을 제공할 수 있습니다.

```swift
extension PrettyTextRepresentable  {
    var prettyTextualDescription: String {
        return textualDescription
    }
}
```

---

## Adding Constraints to Protocol Extensions

프로토콜 확장을 정의할때, 확장의 메소드와 속성을 사용하기 전에 준수하는 타입이 만족해야 하는 제약조건을 지정 할 수 있습니다. [Generic Where Clauses](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID192)에서 설명된 것 처럼, 이러한 제약조건을 확장하는 프로토콜의 이름 뒤에 일반적인(generic) `where`절을 사용하여 작성합니다.

예를들어, 위의 에제로부터 `TextRepresentable` 프로토콜을 준수하는 요소를 가진 컬렉션(collection)에 적용되는 `Collection` 프로토콜의 확장을 정의 할 수 있습니다.

```swift
extension Collection where Iterator.Element: TextRepresentable {
    var textualDescription: String {
        let itemsAsText = self.map { $0.textualDescription }
        return "[" + itemsAsText.joined(separator: ", ") + "]"
    }
}
```

`textualDescription`프로퍼티는 컬렉션의 각 요소들의 텍스트 표현을 콤마(`,`)로 구분된 목록을 연결하여 전체 컬렉션의 텍스트 설명을 괄호(`[]`) 안에 담아 반환합니다.

`TextRepresentable` 프로토콜을 준수하고 `Hamster` 값 배열을 사용하는 이전의 Hamster구조체를 고려해보세요.

```swift
let murrayTheHamster = Hamster(name: "Murray") let morganTheHamster = Hamster(name: "Morgan") let mauriceTheHamster = Hamster(name: "Maurice") let hamsters = [murrayTheHamster, morganTheHamster, mauriceTheHamster
```

`Array`가 `Collection`을 준수하고 배열의 요소들이 `TextRepresentable`프로토콜을 준수하기 때문에, 배열은 
콘텐츠(contents)의 텍스트 표현을 얻기 위해 `textualDescription`프로퍼티를 사용 할 수 있습니다.

```swift
print(hamsters.textualDescription)
// Prints "[A hamster named Murray, A hamster named Morgan, A hamster named Maurice]"
```

> Note: 준수하는 타입이 같은 메소드나 프로퍼티에 대한 구현을 제공하여 여러개의 제한된 확장에 대한 요구사항을 만족하는 경우, Swift는 가장 특수한 제약에 해당하는 구현을 사용 할 것입니다.

---

