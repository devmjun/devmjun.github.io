---
layout:     post
title:      "Swift. 정리하기 23"
subtitle:   "Swift Language Guide-Memory Safety *"
date:       2018-04-14 12:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Reference 

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

### - Characteristics of Memory Access

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

중복 접근은 주로 함수와 메서드에서 in-out 매개 변수를 사용하거나, 구조체의 메서드를 변경하는(mutating methods of a structrue) 코드에 나타납니다. 장기간 접근을 사용하는 특정 종류의 Swift코드는 아래 섹션에서 설명합니다.

---

## Confliction Access to In-Out Parameters  

함수는 모든 in-out 매개 변수에 대한 장기 쓰기 접근(long-term write access)이 있습니다. 

```swift
var stepSize = 1
 
func incrementInPlace(_ number: inout Int) {
    number += stepSize
}
 
incrementInPlace(&stepSize)
// Error: conflicting accesses to stepSize
```

In the code above, stepSize is a global variable, and it is normally accessible from within incrementInPlace(_:). However, the read access to stepSize overlaps with the write access to number. As shown in the figure below, both number and stepSize refer to the same location in memory. The read and write accesses refer to the same memory and they overlap, producing a conflict.

<center><img src="/img/posts/Swift_Programming_Language-30.png" width="700" height="500"></center> <br>

One way to solve this conflict is to make an explicit copy of stepSize:

```swift
// Make an explicit copy.
var copyOfStepSize = stepSize
incrementInPlace(&copyOfStepSize)
 
// Update the original.
stepSize = copyOfStepSize
// stepSize is now 2
```

When you make a copy of stepSize before calling incrementInPlace(_:), it’s clear that the value of copyOfStepSize is incremented by the current step size. The read access ends before the write access starts, so there isn’t a conflict.

Another consequence of long-term write access to in-out parameters is that passing a single variable as the argument for multiple in-out parameters of the same function produces a conflict. For example:

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

The `balance(_:_:)` function above modifies its two parameters to divide the total value evenly between them. Calling it with playerOneScore and playerTwoScore as arguments doesn’t produce a conflict—there are two write accesses that overlap in time, but they access different locations in memory. In contrast, passing playerOneScore as the value for both parameters produces a conflict because it tries to perform two write accesses to the same location in memory at the same time.

> NOTE: Because operators are functions, they can also have long-term accesses to their in-out parameters. For example, if `balance(_:_:)` was an operator function named <^>, writing playerOneScore <^> playerOneScore would result in the same conflict as balance(&playerOneScore, &playerOneScore) 

---

## Conflicting Access to self in Methods

A mutating method on a structure has write access to self for the duration of the method call. For example, consider a game where each player has a health amount, which decreases when taking damage, and an energy amount, which decreases when using special abilities.

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

In the restoreHealth() method above, a write access to self starts at the beginning of the method and lasts until the method returns. In this case, there’s no other code inside restoreHealth() that could have an overlapping access to the properties of a Player instance. The shareHealth(with:) method below takes another Player instance as an in-out parameter, creating the possibility of overlapping accesses.

extension Player {
    mutating func shareHealth(with teammate: inout Player) {
        balance(&teammate.health, &health)
    }
}
 
var oscar = Player(name: "Oscar", health: 10, energy: 10)
var maria = Player(name: "Maria", health: 5, energy: 10)
oscar.shareHealth(with: &maria)  // OK
In the example above, calling the shareHealth(with:) method for Oscar’s player to share health with Maria’s player doesn’t cause a conflict. There’s a write access to oscar during the method call because oscar is the value of self in a mutating method, and there’s a write access to maria for the same duration because maria was passed as an in-out parameter. As shown in the figure below, they access different locations in memory. Even though the two write accesses overlap in time, they don’t conflict.


<center><img src="/img/posts/Swift_Programming_Language-32.png" width="700" height="500"></center> <br> 

However, if you pass oscar as the argument to shareHealth(with:), there’s a conflict:

```swift
oscar.shareHealth(with: &oscar)
// Error: conflicting accesses to oscar
```

The mutating method needs write access to self for the duration of the method, and the in-out parameter needs write access to teammate for the same duration. Within the method, both self and teammate refer to the same location in memory—as shown in the figure below. The two write accesses refer to the same memory and they overlap, producing a conflict.

<center><img src="/img/posts/Swift_Programming_Language-33.png" width="700" height="500"></center> <br> 




---

## Conflicting Access to Properties

```swift
// 1
var playerInformation = (health: 10, energy: 20)
balance(&playerInformation.health, &playerInformation.energy)
// Error: conflicting access to properties of playerInformatio

// 2
var holly = Player(name: "Holly", health: 10, energy: 10)
balance(&holly.health, &holly.energy)  // Error

// 3
func someFunction() {
    var oscar = Player(name: "Oscar", health: 10, energy: 10)
    balance(&oscar.health, &oscar.energy)  // OK
}
```

---

## 여담 

나머지는 추후번역 예정입니다. 지금은 어떤 경우에 메모리가 안전하지 않게 사용될수 있는지 이해하고 넘어갑니다!

---


