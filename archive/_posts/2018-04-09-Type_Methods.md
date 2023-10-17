---
layout:     post
title:      "Swift. Type Methods"
subtitle:   "Static func, class func.."
date:       2018-04-09 22:00:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/Mac-bg.jpg
thumbnail-img: /assets/post_img/background/Mac-bg.jpg
share-img: /assets/post_img/background/Mac-bg.jpg
---

[type method](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Methods.html#//apple_ref/doc/uid/TP40014097-CH15-ID234)

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

## 여담 

1. class method는 상속, 오버라이딩이 가능합니다.
	- struct, enumeration에서 선언 불가능
2. static 타입 선언은 class의 final 선언과 같다고 생각할수 있습니다

---

## Reference 

[Type Method 까칠코더님](http://kka7.tistory.com/117)<br>
[type method](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Methods.html#//apple_ref/doc/uid/TP40014097-CH15-ID234)

- 연관된 포스트
	- [<U>Swift. Meta Type</U>](https://devmjun.github.io/archive/Meta_Type_Swift)
	- [<U>Protocol Composition Type</U>](https://devmjun.github.io/archive/Protocol_Composition_Type)
	- [<U>Compile-Time vs Run-Time Type Checking in Swift</U>](https://devmjun.github.io/archive/Compile-Time_vs_Run_Time_Type_checking_in_Swift)
	- [<U>Swift, Identity Operators ==, ===, is</U>](https://devmjun.github.io/archive/00-Identity-Operators)
	- [<U>ComputerScience. Compile-time vs Run-Time</U>](https://devmjun.github.io/archive/Whats_the_difference_between_run-time_and_compile-time)