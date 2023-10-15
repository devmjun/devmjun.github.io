---
layout:     post
title:      "Swift. 정리하기 23: Swift Language Guide-Memory Safety"
subtitle:   "Swift Language Guide-Memory Safety *"
date:       2018-04-14 12:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
---

최종 수정일: 2018. 10. 1

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다!

[Memory Safety](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/MemorySafety.html#//apple_ref/doc/uid/TP40014097-CH46-ID567)<br>
[까칠코더님 블로그](http://kka7.tistory.com/130?category=919617)

---


## Memory Safety


기본적으로 Swift는 너의 코드에서 발생하는 안전하지 않은 행동을 방지 합니다. Swift는 변수가 사용되기 이전에 초기화 되고, 메모리가 할당해제된 후 엑세스 되지 않으며, 배열 인덱스가 범위를 벗어난 오류가 있는지 확인합니다.

Swift는 또한 메모리의 특정 위치를 수정하여 해당 메모리에 독점적으로 엑세스하도록 요드를 요구함으로써 동일한 메모리 영역에 대한 다중 엑세스가 충돌하지 않도록 합니다. Swift는 자동으로 메모리를 관리하기 때문에 대부분의 경우 메모리에 엑세스 하는것에 대해 생각할 필요가 없습니다. 그러나 잠재적인 충돌이 발생할수 있는 위치를 이해하는것이 중요하므로 메모리에 대한 엑세스 권한이 충돌하는 코드는 작성하지 않아도 됩니다. 코드에 충돌이 포함되어 있으면 컴파일-타임 또는 런타임 오류가 발생합니다. 

---

## Understanding Conflicting Access to Memory

변수의 값을 설정하거나 함수에 인수를 전달할때 코드에 메모리에 엑세스 할수 있습니다. 예를 들어, 다음 코드는 읽기 엑세스와 쓰기 엑세스를 모두 포함합니다. 

```swift
// A write access to the memory where one is stored.
var one = 1
 
// A read access from the memory where one is stored.
print("We're number \(one)!")
```

메모리 충돌 접근은 코드의 다른 부분이 동시에 동일한 위치에 메모리에 접근 하려고 할때 발생할수 있습니다. 동시에 메모리에 있는 위치에 다중 엑세스하면 예측할수없거나 일관성없는 동작이 발생할수 있습니다. Swift에는 여러줄의 코드에 적용되는 값을 수정하여 수정할때마다 값에 엑세스 할수 있는 방법이 있습니다. 

종이에 쓰여진 예산을 어떻게 업데이트하는지 생각하면 비슷한 문제를 볼수 있습니다. 예산을 업데이트하는 과정은 두 단계로 진행됩니다. 먼저 항목의 이름과 가격을 추갛나다음 총 금액을 변경하여 현재 목록에 있는 항목에 반영합니다. 업데이트 전과 후에 아래 그림과 같이 예산에서 정보를 익고 정답을 얻을수 있습니다. 

<center><img src="/img/posts/Swift_Programming_Language-29.png" width="700" height="500"></center> <br> 

예산에 항목을 추가하는 동안 총액이 새로 추가된 항목을 반영하도록 업데이트 되지 않았으므로 일시적으로 유효하지 않은 상태가됩니다. 항목을 추가하는 과정에서 총 금액을 읽으면 잘못된 정보가 표시됩니다. 

위의 예는 충돌하는 메모리 접근을 고정할때 발생할수 있는 문제점을 보여줍니다. 충돌을 수정할수있는 여러가지 대안이 있으며 때로는 어느 답이 올바른지 알수 없습니다. 

위 예에서는 원래 총액 또는 업데이트 된 총 금액 중 어느것이 $5 또는 $320 정답이 될수 있는지에 따라 다릅니다. 충돌하는 접근(conflicting access)을 해결하려면 먼저 수행할 작업을 결정해야 합니다. 

> Note: 동시 또는 다중 스레드 코드를 작성한 경우 메모리에 대한 접근 충돌이 익숙한 문제일수 있습니다. 그러나 여기서 논의된느 충돌은 단일 스레드(single-thread)에서 발생 예이며, 동시 또는 다중 스레드 코드는 필요하지 않습니다.
> 
> 단일 스레드 내에서 메모리에 대한 접근이 충돌하는 경우 Swift는 컴파일-타임 또는 런타임에서 오류가 발생함을 보장합니다. 다중 스레드 코드의 경우 [Thread Sanitizer](https://developer.apple.com/documentation/code_diagnostics/thread_sanitizer)에서 충돌하는 접근을 검색하는데 도움이 됩니다. 

---

## Characteristics of Memory Access

충돌하는 접근의 컨텍스트에서 고려해야할 메모리 접근의 세가지 특성은 읽기 또는 쓰기인지 여부, 접근 지속 시간 및 접근중인 메모리의 위치 입니다. 특히 다음 두가지 접근 권한을 가지고 있다면 충돌이 발생합니다. 

- 적어도 하나는 쓰기 접근입니다.
- 그들은 동일한 위치의 메모리에 접근합니다.
- 그들은 같은 시간동안 중복(overlap)합니다.

읽기 및 쓰기의 차이는 일반적으로 분명합니다. 쓰기 접근은 메모리 위치를 변경하지만, 읽기는 그렇지 않습니다. 메모리 위치는 변수, 상수 또는 속성과 같이 무엇이 접근되는지 참조합니다. 메모리에 접근하는 기간은 즉각적(instantaneous) 이거나 긴 기간(long-term) 둘중 하나 입니다. 


해당 접근이 시작된 후 종료되기전에 다른 코드가 실행될수 없는 경우 즉시 접근이 가능합니다. 본질적으로 두개의 즉시(instantaneous) 접근은 같은 시간에 발생할수 없습니다.  대부분은 메모리 접근은 즉각적(instantaneous) 입니다. 예를들어 아래 코드 목록의 모든 읽기 및 쓰기 접근은 즉각적으로 발생합니다. 


```swift
func oneMore(than number: Int) -> Int {
    return number + 1
}
 
var myNumber = 1 
myNumber = oneMore(than: myNumber) 
print(myNumber) 
// Prints "2"
```

그러나 장기간 접근(long-term accesses)라고 불리는 다른 코드의 실행하는 메모리 접근하는 여러가지 방법이 있습니다. 즉시 접근(instantaneous access)와 장기간 접근(long-term access)의 차이점은 접근이 시작된후 종료되기 전에 다른 코드가 실행될 가능성이 있다는 것인데, 이를 중복(overlap)이라고 합니다. 장기간 접근은 다른 장기 접근 및 즉시 접근 과 중복될수 있습니다.  

중복 접근은 주로 함수와 메서드에서 `in-out` 매개 변수를 사용하거나, 구조체의 메서드를 변경하는(mutating methods of a structrue) 코드에 나타납니다. 장기간 접근을 사용하는 특정 종류의 Swift코드는 아래 섹션에서 설명합니다.

---

## Confliction Access to In-Out Parameters  

함수는 모든 in-out 매개변수에 장기(long-term) 쓰기 접근을 가지고 있습니다. in-out 매개변수에 대한 쓰기 접근은 in-out 매개변수가 아닌 모든 매개변수가 처리된 뒤에서 시작하고 함수가 호출되는 동안 지속됩니다. 여러개의 in-out 매개변수가 있는 경우에, 쓰기 접근은 매개변수가 나타나는 순서와 동일한 순서로 시작됩니다.

범위 지정 규칙(scoping rules)과 접근 제어(access control)가 다르게 허용되더라도, 장기(long-term) 쓰기 접근의 한가지 결과는 in-out으로 전달된 원래 변수에 접근할 수 없습니다. - 원본에 접근하면 충돌이 발생합니다. 예를 들어:

```swift
var stepSize = 1
 
func incrementInPlace(_ number: inout Int) {
    number += stepSize
}
 
incrementInPlace(&stepSize)
// Error: conflicting accesses to stepSize
```

위 코드에서, `stepSize`는 전역변수이고, 일반적으로 `increment(_:)`에서 접근할 수 있습니다. 하지만, `stepSize`에 대한 읽기 접근은 `number`쓰기 접근과 중복되게(overlaps) 됩니다. 아래 그림에서 보는 것처럼, `number`와 `stepSize` 모두 메모리에서 같은 위치를 참조합니다. 읽기와 쓰기 접근은 같은 메모리를 참조하고, 중복되며(overlap), 충돌이 일어납니다.

<center><img src="/img/posts/Swift_Programming_Language-30.png" width="700" height="500"></center> <br>

이 충돌을 해결하는 한가지 방법은 `stepSize`의 명시적인 복사본을 만드는 것입니다.

```swift
// Make an explicit copy.
var copyOfStepSize = stepSize
incrementInPlace(&copyOfStepSize)
 
// Update the original.
stepSize = copyOfStepSize
// stepSize is now 2
```

`increment(_:)` 호출하기 전에 `stepSize`의 복사본을 만들때, `copyOfStepsize의 값은 현재 단계 보다 증가되는 것이 확실합니다. 쓰기 접근이 시작하기 전에 읽기 접근이 끝나며, 충돌이 나지 않습니다.

in-out 매개변수에 대한 장기(long-term) 쓰기 접근의 또 다른 결과는 동일한 함수의 여러개의 in-out 매개변수에 대한 인자처럼 단일 변수를 전달하면 충돌이 발생합니다. 예를들어:


```swift
func balance(_ x: inout Int, _ y: inout Int) {
    let sum = x + y
    x = sum / 2
    y = sum - x
}
var playerOneScore = 42
var playerTwoScore = 30
balance(&playerOneScore, &playerTwoScore)  // OK
balance(&playerOneScore, &playerOneScore)
// Error: conflicting accesses to playerOneScore
```

위의 `balance(_:_:)` 함수는 두개의 매개변수들 간의 전체 값을 균등하게 나누도록 수정합니다. `playerOneScore`와 `playTwoScore`을 인자로 호출해도 충돌이 발생하지 않습니다 - 시간적으로 중복되는 두개의 쓰기 접근이 있지만, 메모리에서 서로 다른 곳을 접근합니다. 대조적으로(in contrast), 모든 매개변수에 대한 값으로 playerOneScore 전달은 같은 시간에 메모리의 같은 위치에 두개의 쓰기 접근이 수행이 시도되기 때문에, 충돌이 발생합니다.

> Note: 연산자는 함수이기 때문에, `in-out` 매개변수에 장기 접근할 수 있습니다. 예를 들어, `balance(_:_:)`가 `<^>`라는 연잔자 함수인 경우에, `playerOneScore <^> playerOneScore` 작성하는 것은 `balance(&playerOneScore, &playerOneScore)`와 동일한 충돌이 발생합니다.



---

## Conflicting Access to self in Methods

구조체에서 변경가능(mutating) 메소드는 메소드를 호출하는 동안에 self에 대한 쓰기 접근을 가지고 있습니다. 예를들어, 각 플레이어가 건강 점수을 가지며, 손상을 입었을때 감소하고, 특수 능력을 사용하면 감소하는 에너지 점수가 있는게임을 생각해봅니다.


```swift
struct Player {
    var name: String
    var health: Int
    var energy: Int
    
    static let maxHealth = 10
    mutating func restoreHealth() {
        health = Player.maxHealth
    }
}
```

위의 `restoreHealth()` 메소드에서, `self` 쓰기 접근은 메소드의 시작부분에서 시작하고 메소드가 반환할때까지 지속됩니다. 이 경우에, `restoreHealth()` 내부에 `Player` 인스턴스의 프로퍼티에 `중복되어(overlapping)` 접근할수 있는 다른 코드가 없습니다. 
아래 `sharehealth(with:)` 메소드는 다른 Player인스턴스를 in-out 매개변수처럼 사용하며, 중복되어(overlapping) 접근할 가능성이 있습니다.

```swift
extension Player {
    mutating func shareHealth(with teammate: inout Player) {
        balance(&teammate.health, &health)
    }
}
 
var oscar = Player(name: "Oscar", health: 10, energy: 10)
var maria = Player(name: "Maria", health: 5, energy: 10)
oscar.shareHealth(with: &maria)  // OK
```


위 예제에서, `오스카(Oscar)` 플레이어에 대한 `shareHealth(with:)` 메소드 호출은 마리아(Maria) 플레이어와 건강을 공유하더라도 충돌이 발생하지 않습니다. 이는 `oscar`는 변경가능한 메소드에서의 `self`의 값이기 때문에, 메소드 호출하는 동안에 `oscar`에 대한 쓰기 접근을하고, 같은 기간동안 maria는 in-out 매개변수로 전달되었기 때문에, maria 쓰기 접근을 합니다. 아래 그림에서 보는 것처럼, 메모리의 다른 곳에 접근합니다. 시간적으로 두개의 쓰기 접근이 중복되지만, 충돌이 되지는 않습니다.


<center><img src="/img/posts/Swift_Programming_Language-32.png" width="700" height="500"></center> <br> 

하지만, `osscar`를 `shareHealth(with:)`메소드에 인자로 넘기면, 충돌이 발생합니다.

```swift
oscar.shareHealth(with: &oscar)
// Error: conflicting accesses to oscar
```

변경가능한 메소드(mutating method)는 메소드 지속시간동안 `self`에 대한 쓰기 접근이 필요하고, `in-out` 매개변수는 같은 시간동안 teammate에 쓰기 접근이 필요합니다. 이 메소드에서, `self`와 `teammate`모두 메모리에서 같은 위치를 참조합니다 - 아래 그램에서 보여집니다. 2개의 쓰기 접근은 동일한 메모리를 참조하고 중첩되며, 충돌이 발생합니다.

<center><img src="/img/posts/Swift_Programming_Language-33.png" width="700" height="500"></center> <br> 


---

## Conflicting Access to Properties

구조체, 튜플, 열거형과 같은 타입은 구조체의 프로퍼티나 튜플의 요소처럼, 개별 구성 값으로 만들어집니다. 이것들은 값 타입 이기 때문에, 어떤 부분의 값을 변경하면 전체 값이 변경하며, 프로퍼티 하나에 대한 읽기나 쓰기 접근은 전체 값에 대한 읽기나 쓰기 접근이 필요합니다. 예를들어, 튜플의 요소에 중첩 쓰기는 충돌이 발생합니다.

```swift
var playerInformation = (health: 10, energy: 20)
balance(&playerInformation.health, &playerInformation.energy)
// Error: conflicting access to properties of playerInformatio
```

위 예제에서, 튜플의 요소에 대한 balance(_:_:) 호출은 playerInformation에 대한 중첩 쓰기 접근이기 때문에, 충돌이 발생합니다. playerInformation.health와 playerInformation.energy모두 함수 호출하는 동안에 balance(_:_:)가 쓰기 접근이 필요하다는 것을 의미하는 in-out 매개변수로 전달됩니다., 두 경우 모두, 튜플 요소에 대한 쓰기 접근은 전체 튜플에 대한 쓰기 접근이 필요합니다. 이는 중복되는 동안 playerInformation에 대한 두개의 쓰기 접근을 의미하며, 충돌이 발생합니다.

아래 코드는 전역 변수로 저장되는 구조체의 프로퍼티에 쓰기 접근이 중첩되는 동안에도 동일한 오류가 발생하는 것을 보여줍니다.


```swift
var holly = Player(name: "Holly", health: 10, energy: 10)
balance(&holly.health, &holly.energy)  // Error
```

실제로, 구조체의 프로퍼티에 대한 대부분의 접근은 안전하게 중첩될수 있습니다. 예를 들어, 위 예제에서 holly변수가 전역 변수 대신에 지역변수로 변경되는 경우, 컴파일러는 구조체의 저장 프로퍼에 대한 중복 접근이 안전하다는 것을 증명할 수 있습니다.

```swift
func someFunction() {
    var oscar = Player(name: "Oscar", health: 10, energy: 10)
    balance(&oscar.health, &oscar.energy)  // OK
}
```

위 예제에서, `오스카(Oscar)`의 `health`와 `energy`는 `balance(_:_:)`에 2개의 in-out 매개변수로 전달됩니다. 2개의 저장 프로퍼티는 어떤 방법으로도 상호작용하지 않기 때문에, 컴파일러는 메모리 안전성이 유지하는(preserved)것을 검증할 수있습니다.

구조체의 프로퍼티에 대한 중복 접근에 대한 제한은 항상 메모리 안전성을 유지할 필요는 없습니다. 메모리 안전성을 원하지만, 단독(exclusive) 접근은 메모리 안전성보다 요구사항이 엄격합니다. - 일부코드에서 메모리에 단독으로 접근하는 것을 위반하더라도 메모리 안전성을 유지하는 것을 의미합니다, Swift는 컴파일러가 단복이 아닌 메모리 접근이 안전하다는 것을 증명할수 있는 경우에, 메모리 안전(Memory-safe) 코드를 허용합니다. 특히, 다음에 오는 조건들이 적용되는 경우에 구조체의 프로퍼티에 대한 중복 접근이 안전하다는 것을 증명할 수 있습니다.

- 계산 프로퍼티나 클래스 프로퍼티가 아닌, 인스턴스의 저장 프로퍼티만 접근합니다.
- 구조체는 저녁 변수가 아닌, 지역변수 값입니다.
- 구조체는 어떤 클로져에 의해 캡쳐되지 않거나, 탈출하지않는(nonescaping) 클로져에 의해서만 캡쳐됩니다.

컴파일러가 접근이 안전하다는 것을 증명할 수 없다면, 접근을 허용하지 않습니다.

---
