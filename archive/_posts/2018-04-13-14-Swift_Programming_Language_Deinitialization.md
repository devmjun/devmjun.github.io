---
layout:     post
title:      "Swift. 정리하기 14: Swift Language Guide-Deinitialization"
subtitle:   "Swift Language Guide-Deinitialization"
date:       2018-04-13 12:35:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/HIG-bg.jpg
thumbnail-img: /assets/post_img/background/HIG-bg.jpg
share-img: /assets/post_img/background/HIG-bg.jpg
toc: true
---

최종 수정일 2018.10.1

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Deinitialization](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Deinitialization.html#//apple_ref/doc/uid/TP40014097-CH19-ID142)<br>
[까칠코더님 블로그](http://kka7.tistory.com/121?category=919617)

---

## Deinitialization

`해제(deinitializer)`는 클래스 인스턴스의 메모리가 해제되기 전에 호출됩니다. init 키워드로 초기화를 작성하는 것과 비슷한 방법으로, 해제를 `deinit` 키워드로 작성합니다. `해제는 오직 클래스 타입`에서만 가능합니다.

---

## How Deinitialization Works

Swift는 인스턴스가 더 이상 필요하지 않을때 자동적으로 해제 해주고 자원을 돌려줍니다. Swift는 [자동 참조 개수(Automatic Reference Counting)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID48)에서 설명된 것처럼, ARC(automatic reference counting)로 인스턴스의 메모리를 관리합니다. 일반적으로 인스턴스가 해제 될때 수동으로 수행할 필요가 없습니다. 하지만, 리소스 작업을 할때, 몇가지 추가적인 정리가 필요합니다. 예을들어, 파일을 열고 약간의 데이터를 쓰기 위해 사용자정의 클래스를 생성한다면, 클래스 인스턴스가 해제되기 전에 파일을 닫는 것이 필요합니다.

클래스는 반드시 클래스당 `해제(deinitializer)` 하나를 정의 할 수 있습니다. 해제는 매개변수가 없고 괄호(parentheses `()`) 없이 작성합니다.

```swift
deinit {
    // perform the deinitialization
}
```

해제(deinitializers)는 인스턴스의 메모리가 해제 되기 전에, 자동으로 호출됩니다. 해제를 직접 호출할 수 없습니다. 슈퍼클래스 해제는 서브클래스에 상속되고, 슈퍼클래스 해제는 서브클래스 해제 구현이 끝날때, 자동으로 호출됩니다. 서브클래스가 해제를 제공하지 않더라도, 슈퍼클래스 해제는 항상 호출됩니다.

인스턴스는 해제가 호출되기 전까지 `메모리 해제(deallocated)`되지 않으며, 해제는 인스턴스의 모든 프로퍼티에 접근 할수 있고 이러한 프로퍼티의 기본 동작을 수정 할 수 있습니다. (파일의 이름을 찾아 닫는 것 처럼)

---

## Deinitializaers in Action 

다음은 해제 동작의 예제 입니다. 이 예제는 단순한 게임에 대해, 두개의 타입 `Bank`와 `Player`를 정의합니다. `Bank`클래스는 10,000이상의 동전을 사용 할수 없도록 화폐를 관리합니다. 게임에서 하나의 `Bank`만 사용 할수 있고 `Bank`는 현재 상태를 저장하고 관리하기 위한 타입 프로퍼티와 메소드를 가진 클래스로 구현됩니다.

```swift
class Bank {
    static var coinsInBank = 10_000
    static func distribute(coins numberOfCoinsRequested: Int) -> Int {
        let numberOfCoinsToVend = min(numberOfCoinsRequested, coinsInBank)
        coinsInBank -= numberOfCoinsToVend
        return numberOfCoinsToVend
    }
    static func receive(coins: Int) {
        coinsInBank += coins
    }
}
```

`Bank`는 동전의 현재 갯수를 추적하기 위해 `coinsInBank`프로퍼티를 사용합니다. 또한 동전의 인출과 입금을 위해 두개의 메소드`distribute(conins:)`와 `receive(conins:)`를 제공합니다.

인출하기 전에 `distribute(coins:)` 메소드는 은행에 동전이 충분한지 확인합니다. 동전이 충분하지 않으면, Bank는 요청된 숫자보다 더 작은 숫자를 반환합니다.(은행에 동전이 없으면 0을 반환합니다). 제공된 실제 동전의 숫자를 나타내기 위해 정수형 값으로 반환합니다.

`receive(coins:)` 메소드는 단순하게 받은 동전의 숫자를 은행의 동전 저장소에 추가합니다.

Player 클래스는 게임에서 플레이어를 설명합니다. 각 플레이어는 언제나 지갑에 일정 수의 동전을 가지고 있습니다. 이것은 플레이어의 `coinsInPurse` 프로퍼티로 표현됩니다.

```swift
class Player {
    var coinsInPurse: Int
    init(coins: Int) {
        coinsInPurse = Bank.distribute(coins: coins)
    }
    func win(coins: Int) {
        coinsInPurse += Bank.distribute(coins: coins)
    }
    deinit {
        Bank.receive(coins: coinsInPurse)
    }
}
```

각 `Player`인스턴스는 초기화 중에 은행으로부터 지정된 동전의 개수로 할당하도록 초기화되며, 동전이 충분하지 않으면 `Player`인스턴스는 더 적은 동전을 받게 됩니다.

`Player`클래스는 은행으로부터 일정 갯수의 동전을 가져오고 플레이어의 지갑에 추가하는 `win(coins:)`메소드를 정의합니다. 또한 Player클래스는 Player인스턴스 메모리가 해제되기 전에 호출되는 `해제(deinitializer)`를 구현합니다. 해제에서 단순하게 플레이의 모든 동전을 은행으로 돌려줍니다.

```swift
var playerOne: Player? = Player(coins: 100)
print("A new player has joined the game with \(playerOne!.coinsInPurse) coins")
// Prints "A new player has joined the game with 100 coins"
print("There are now \(Bank.coinsInBank) coins left in the bank")
// Prints "There are now 9900 coins left in the bank"
```

새로운 Player인스턴스는 생성되며 100개의 동전을 요청할 수 있습니다. Player인스턴스는 옵져널 Player변수인 playerOne로 저장됩니다. 플레이어가 언제든지 게임을 떠날 수 있기 때문에, 여기서 옵셔널 변수가 사용됩니다. 옵셔널로 현재 플레이어가 게임에 있는지 추적합니다.

playerOne는 옵셔널이기 때문에, winCoins(_:) 메소드가 호출 할때마다, 동전의 기본 갯수를 출력하기 위해 coinsInPurse 프로퍼티에 접근할때, 느낌표(!) 표시를 할 수 있습니다.

```swift
playerOne!.win(coins: 2_000)
print("PlayerOne won 2000 coins & now has \(playerOne!.coinsInPurse) coins")
// Prints "PlayerOne won 2000 coins & now has 2100 coins"
print("The bank now only has \(Bank.coinsInBank) coins left")
// Prints "The bank now only has 7900 coins left"
```

여기에서 플레이어가 동전 2,000원을 가지고 있습니다. 플레이어의 지갑은 현재 동전 2,100를 가지고 있고, 은행은 동전 7,900개만 남아있습니다.

```swift
playerOne = nil
print("PlayerOne has left the game")
// Prints "PlayerOne has left the game"
print("The bank now has \(Bank.coinsInBank) coins")
// Prints "The bank now has 10000 coins"
```

플레이어가 이제 게임을 떠났습니다. 옵셔널 playerOne변수가 nil로 설정되는 것을 나타내며, Player 인스턴스가 없다를 의미합니다. 이 시점에, playerOne 변수는 Player 인스턴스를 참조가 깨졌습니다. 다른 프로퍼티나 변수 없이 여전히 Player인스턴스에 참조하고, 메모리 해제 과정 중에 메모리가 해제됩니다. 바로 직전에, 해제는 자동적으로 호출되고, 동전들은 은행으로 반환됩니다.



---

