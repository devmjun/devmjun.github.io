---
layout:     post
title:      "Swift. 정리하기 11"
subtitle:   "Swift Language Guide-Methods"
date:       2018-04-13 09:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Methods](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Methods.html#//apple_ref/doc/uid/TP40014097-CH15-ID234)<br>
[까칠코더님 블로그](http://kka7.tistory.com/16?category=919617)

---

## Methods

메소드(methods)는 특정 타입과 관련된 함수입니다. 클래스, 구조체, 열거형 모두 주어진 타입의 인스턴스로 작업하기 위한 특정 작업과 기능을 캡슐화 하는 인스턴스 메소드를 정의할 수 있습니다. 클래스, 구조체, 열거형은 타입 자체와 관련된 타입 메소드 또한 정의 할수 있습니다. 타입 메소드는 Objective-C의 클래스 메소드와 비슷합니다.

사실 Swift에서는 구조체와 열거형에 메소드를 정의할 수 있으며, Swift가 C와 Objective-C와의 가장 큰 차이점입니다. Objective-C에서, 타입에 대한 메소드 정의는 클래스만 할 수 있습니다. Swift에서는 클래스, 구조체, 열거형에서 선택할수 있고, 생성한 타입에 대한 메소드 정의를 여전히 유연하게 할수 있습니다.

--

## The self Property 

타입의 인스턴스는 언제나 암시적으로 인스턴스 자신과 똑같은 self 프로퍼티를 가지고 있습니다. 자신의 인스턴스 메소드안에서 현재 인스턴스에 참조하기 위해 self프로퍼티를 사용합니다.

위의 예제에서 increment()메소드는 다음처럼 작성 할수 있습니다.

```swift
// 1
class Counter {
    var count = 0
    func increment() {
        count += 1
    }
    func increment(by amount: Int) {
        count += amount
    }
    func reset() {
        count = 0
    }
}

// 2
func increment() {
    self.count += 1
}
```

실제로, 코드에서 `self`를 자주 작성할 필요가 없습니다. 명시적으로 self를 작성 하지 않으면, Swift는 메소드 내에서 프로퍼티나 메소드 이름을 사용할때마다, 프로퍼티나 메소드가 현재 인스턴스를 참조한다고 가정합니다. 이 가정은 Counter의 인스턴스 메소드 안에서 count(self.count보다는)의 사용으로 증명되었습니다.

이 규칙은 인스턴스 메소드에 대한 매개변수 이름이 인스턴스의 프로퍼티 이름과 같을때만 예외로 합니다. 이러한 상황에서, 매개변수 이름이 우선순위를 가지고, 더 알맞는 방법으로 프로퍼티를 참조해야 합니다. 매개변수 이름과 프로퍼티 이름을 구별(distinguish)하기 위해 self프로퍼티를 사용합니다.

여기에서 self는 메소드 매개변수 x와 인스턴스 프로퍼티 x간의 애매모호함(disambiguates)을 없애줍니다.

```swift
struct Point {
    var x = 0.0, y = 0.0
    func isToTheRightOf(x: Double) -> Bool {
        return self.x > x
    }
}
let somePoint = Point(x: 4.0, y: 5.0)
if somePoint.isToTheRightOf(x: 1.0) {
    print("This point is to the right of the line where x == 1.0")
}
// Prints "This point is to the right of the line where x == 1.0"
```

`self` 접두사 없으면, Swift는 x둘다 메소드 매개변수 x를 참조하여 사용하는 것으로 가정할 것입니다.


---

## Modifying Value Types from Within Instance Methods

구조체와 열거형은 값 타입(value types)입니다. 기본적으로, 값 타입의 프로퍼티는 인스턴스 메소드 안에서 수정될 수 없습니다.

하지만, 특정 메소드에서 구조체나 열거형의 프로퍼티를 수정할 필요가 있다면, 메소드 동작에 대해 mutating을 선택해서 사용할 수 있습니다. 그런 다음에 메소드 내에서 해당 프로퍼티를 변경(mutate, change)할 수 있고, 메소드가 끝나면 원래 구조에 변경된 내용으로 다시 작성됩니다. 그 메소드는 암시적인 self프로퍼티에 완전히 새로운 인스턴스를 할당할 수 있고, 메소드가 끝나면 새로운 인스턴스로 기존 메소드를 교체합니다.

메소드에 대한 func키워드 앞에 mutating키워드를 위치시켜 사용할 수 있습니다.

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
}
var somePoint = Point(x: 1.0, y: 1.0)
somePoint.moveBy(x: 2.0, y: 3.0)
print("The point is now at (\(somePoint.x), \(somePoint.y))")
// Prints "The point is now at (3.0, 4.0)"
```

위의 `Point`구조체는 일정 양만큼 `Point`인스턴스를 이동하는 `moveBy(x:y:)`메소드에 `mutating`을 정의하였습니다. 새로운 좌표를 반환하는 대신, 이 메소드는 실제 좌표를 수정합니다. mutating 키워드는 프로퍼티를 수정 가능하도록 정의하기 위해서 추가 되었습니다.

구조체 타입의 상수는 변수 프로퍼티 일지라도 프로퍼티를 변경할 수 없기 때문에, mutating 메소드를 호출할수 없다는 것을 주의합니다. 
[상수 구조체 인스턴스의 저장 프로퍼티(Stored Properties of Constant Structure)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID256)에서 설명되어있습니다.

```swift
let fixedPoint = Point(x: 3.0, y: 3.0)
fixedPoint.moveBy(x: 2.0, y: 3.0)
// this will report an error
```

---

## Assigning to self Within a Mutating Method

Mutating 메소드는 암시적인 `self`프로퍼티에 완전히 새로운 인스턴스를 할당할수 있습니다. 위에서 보여준 Point 예제는 다음과 같은 방법으로 작성 할 수 있습니다.

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
```

이 버전의 mutating moveBy(x:y:)메소드는 x와 y값을 대상(target) 위치로 설정하는 새로운 구조체를 생성합니다. 이번 버전의 메소드는 이전 버전과 똑같은 결과가 될것입니다.

열거형에 대한 Mutating 메소드는 암시적으로 `self` 매개변수를 같은 열거형에서 다른 case가 되도록 설정할 수 있습니다.

> Note: 새롭게 초기화하느냐, 기존의 값을 설정하느냐의 선택..

```swift
enum TriStateSwitch {
    case off, low, high
    mutating func next() {
        switch self {
        case .off:
            self = .low
        case .low:
            self = .high
        case .high:
            self = .off
        }
    }
}
var ovenLight = TriStateSwitch.low
ovenLight.next()
// ovenLight is now equal to .high
ovenLight.next()
// ovenLight is now equal to .off
```

이 예제는 3가지 상태를 선택하는 열거형을 정의합니다. next()메소드가 호출될때마다 스위치는 3가지 다른 전원 상태(off, low, high)가 됩니다.

---

## Type Methods

인스턴스 메소드는, 위에서 설명된것처럼 특정 타입의 인스턴스에서 호출되는 메소드입니다. 타입 스스로 호출되는 메소드를 정의할 수 있습니다. 이러한 종류의 메소드를 타입 메소드(type methods)라고 합니다. 메소드의 `func`키워드 앞에 `static`키워드를 작성해서 타입 메소드를 나타냅니다. 클래스는 하위클래스가 상위클래스의 메소드 구현을 오버라이딩 하는 것을 허용하도록 `class`키워드를 사용할 것입니다

> 주의: Objective-C에서는, 오직 Objective-C 클래스에 대한 타입 레벨(type-level) 메소드를 정의 할 수 있습니다. Swift에서는 모든 클래스, 구조체 열거형에 대한 타입 레벨 메소드를 정의 할 수 있습니다. 각 타입 메소드는 명시적으로 지원하는 타입의 범위를 가집니다

타입 메소드는 인스턴스 메소드처럼 `점(dot .)` 문법으로 호출됩니다. 하지만, 타입의 인스턴스가 아닌 타입의 타입 메소드를 호출합니다. 다음은 `SomeClass` 클래스에서 타입 메소드를 호출하는 방법입니다.

```swift
class SomeClass { 
	class func someTypeMethod() { 
	// type method implementation goes here 
	} 
} 
SomeClass.someTypeMethod()
```

타입 메소드 본문에서, 암시적으로 `self`프로퍼티는 타입의 인스턴스 대신에 타입 스스로와 관련있습니다. 이것은 타입 프로퍼티와 타입 메소드 매개변수간의 모호함을 없애기 위해 `self`를 사용할수 있는 것을 의미하며, 인스턴스 프로퍼티와 인스턴스 메소드도 마찬가지입니다.

더 일반적으로, 타입 메소드의 본문에서 사용하는 제한없는(unqualified) 메소드와 프로퍼티 이름은 다른 타입 레벨 메소드와 프로퍼티를 참조할 것입니다. 타입 메소드는 타입 이름으로 된 접두사 없이 다른 메소드의 이름으로 다른 타입 메소드를 호출할 수 있습니다. 비슷하게, 구조체와 열거형에서의 타입 메소드는 타입 이름 접두사(prefix)없이 타입 프로퍼티의 이름을 사용해서 타입 프로퍼티를 접근할 수 있습니다.

아래 예제는 게임의 다른 레벨이나 스테이지를 통해 플레이어의 진행 상황을 추적하는 구조체 `LevelTracker`를 정의합니다. 이것은 1인용(single-player) 게임이지만, 하나의 장치에서 여러 플레이어에 대한 정보를 저장할 수 있습니다.

게임의 모든 레벨(1단계와 별개로)은 게임을 처음 플레이 할때 잠겨있습니다. 플레이어가 단계를 끝낼때마다, 장치에서 모든 플레이어에 대한 잠김이 풀립니다. `LevelTracker` 구조체는 게임의 어떤 레벨이 잠금해제 되었는지 추적하기 위해 타입 프로퍼티와 메소드를 사용합니다. 또한, 개별 플레이어의 현재 레벨을 추적합니다.


```swift
struct LevelTracker {
    static var highestUnlockedLevel = 1
    var currentLevel = 1
    
    static func unlock(_ level: Int) {
        if level > highestUnlockedLevel { highestUnlockedLevel = level }
    }
    
    static func isUnlocked(_ level: Int) -> Bool {
        return level <= highestUnlockedLevel
    }
    
    @discardableResult
    mutating func advance(to level: Int) -> Bool {
        if LevelTracker.isUnlocked(level) {
            currentLevel = level
            return true
        } else {
            return false
        }
    }
}
```

`LevelTracker`구조체는 어떤 플레이어가 가장 높은 레벨을 잠금해제했는지 추적합니다. 이 값은 `highestUnlockedLevel` 타입 프로퍼티로 저장됩니다.

`LevelTracker`은 `highestUnlockedLevel`프로퍼티로 작업하는 두개의 타입 함수를 정의합니다. 첫번째 타입함수는 새로운 레벨이 잠금해제 될때마다 `highestUnlockedLevel`의 값을 업데이트 하는 `unlock(_:)` 입니다. 두번째 편리한(convenience) 타입 함수 는 특정 레벨 숫자가 이미 잠금해제 되었으면 `true`를 반환하는`isUnlocked(_:)` 입니다. (이러한 타입 메소드는 `LevelTracker.highestUnlockedLevel`처럼 작성할 필요없이`highestUnlockedLevel`타입 프로퍼티에 접근할 수 있다는 것을 주의합니다.)

타입 프로퍼티와 타입 메소드이외에, `LevelTracker`는 게임 진행을 통해서 개별 플레이어의 진행을 추적합니다. 플레이어가 현재 진행중인 레벨을 추적하기 위해 `currentLevel` 인스턴스 프로퍼티를 사용합니다.

`currentLevel`프로퍼티 관리를 돕기 위해, `LevelTracker`는 인스턴스 메소드 `advance(to:)`를 정의하였습니다. `currentLevel` 업데이트 전에, 이 메소드는 요청된 새로운 레벨이 이미 잠금해제 되었는지 확인합니다. `advance(to:)`메소드는 실제 설정 가능한지 아닌지를 나타나기 위해 Boolean값을 반환합니다. 
`advance(to:)`메소드 호출하는 코드에서 반환값을 무시하는 것이 반드시 실수인 것은 아니기 때문에, 이 함수는 `@discardableResult` 속성으로 표시됩니다. 이 속성에 대한 자세한 정보는 [속성(Attributes)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-ID347)을 보세요.

아래에 보이는 것처럼, `LevelTracker`구조체는 개별 플레이어의 진행상황을 추적하고 업데이트하기 위해 `Player`클래스에서 사용됩니다.

```swift
class Player {
    var tracker = LevelTracker()
    let playerName: String
    func complete(level: Int) {
        LevelTracker.unlock(level + 1)
        tracker.advance(to: level + 1)
    }
    init(name: String) {
        playerName = name
    }
}
```

`Player`클래스는 플레이어의 진행상황을 추적하기 위해, `LevelTracker`의 새로운 인스턴스를 만듭니다. 그것은 또한, 플레이어가 특정 레벨을 완료 할때마다 호출되는 `complete(level:)`메소드를 제공합니다. 이 메소드는 모든 플레이어에 대해 다음 레벨을 해제하고 다음 레벨로 이동하기 위해 플레이어의 진행상황을 업데이트 해줍니다. (이전 라인(line)에서 `levelTracker.unlock(_:)`호출로 레벨이 잠금해제 된것을 알고 있기 때문에, `advance(to:)`의 Boolean 반환 값은 무시됩니다.)

새로운 플레이어에 대해 `Player`클래스의 인스턴스를 생성할 수 있고, 플레이어가 레벨을 1을 완료 했을때 어떤 일이 발생되는지 볼수 있습니다.

```swift
var player = Player(name: "Argyrios")
player.complete(level: 1)
print("highest unlocked level is now \(LevelTracker.highestUnlockedLevel)")
// Prints "highest unlocked level is now 2"
```

게임내의 어떤 플레이어가 아직 잠금해제 하지 않은 레벨로 이동하려는 두번째 플레이어를 생성하면, 플레이어의 현재 레벨을 설정하는 시도는 실패할 것입니다.

```swift
player = Player(name: "Beto")
if player.tracker.advance(to: 6) {
    print("player is now on level 6")
} else {
    print("level 6 has not yet been unlocked")
}
// Prints "level 6 has not yet been unlocked"
```

---

