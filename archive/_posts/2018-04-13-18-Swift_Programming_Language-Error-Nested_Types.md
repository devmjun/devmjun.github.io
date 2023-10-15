---
layout:     post
title:      "Swift. 정리하기 18: ft Language Guide-Type Nested Types"
subtitle:   "Swift Language Guide-Type Nested Types"
date:       2018-04-13 16:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
---

최종 수정일: 2018.10.1

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Nested Types](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/NestedTypes.html#//apple_ref/doc/uid/TP40014097-CH23-ID242)<br>
[까칠코더님 블로그](http://kka7.tistory.com/125?category=919617)

---

## Nested Types

열거형은 종종 특정 클래스나 구조체의 기능을 지원하기 위해 만들어집니다. 비슷하게, 보다 복잡한 컨텍스트(context)에서 사용하기 위해 유틸리티 클래스와 구조체를 정의하는것이 편리 할 수 있습니다. 이를 위해서, Swift는 중첩된 타입(nested types)으로 정의하는게 가능하며, 그것들이 지원하는 열거형, 클래스, 구조체 타입의 정의에서 중첩 할 수 있습니다.

다른 타입으로 타입을 중첩(nest)하려면, 지원하는 타입의 바깥쪽 중괄호(}) 안에 정의를 작성한다. 타입은 필요한 만큼 여러 단계로 중첩될 수 있습니다.

---

## Nested Types in Action

```swift
// 1
struct BlackjackCard {
    
    // nested Suit enumeration
    enum Suit: Character {
        case spades = "♠", hearts = "♡", diamonds = "♢", clubs = "♣"
    }
    
    // nested Rank enumeration
    enum Rank: Int {
        case two = 2, three, four, five, six, seven, eight, nine, ten
        case jack, queen, king, ace
        struct Values {
            let first: Int, second: Int?
        }
        var values: Values {
            switch self {
            case .ace:
                return Values(first: 1, second: 11)
            case .jack, .queen, .king:
                return Values(first: 10, second: nil)
            default:
                return Values(first: self.rawValue, second: nil)
            }
        }
    }
    
    // BlackjackCard properties and methods
    let rank: Rank, suit: Suit
    var description: String {
        var output = "suit is \(suit.rawValue),"
        output += " value is \(rank.values.first)"
        if let second = rank.values.second {
            output += " or \(second)"
        }
        return output
    }
}
```

`Suit` 열거형은 게임 카드 4벌(suits)을 심볼(symbol)을 표현하기 위한 원시(raw) Character값과 함께 설명합니다.

`Rank` 열거형은 13개의 게임 가능한 카드 순위를 액면 값을 표현하기 위해 원시(row) `Int` 값과 함께설명합니다. `(Int 원시(row) 값은 Jack, Queen, King, Ace카드에는 사용되지 않습니다)`

위에서 언급했던 것처럼, `Rank`열거형은 자체적으로 더 중첩시킨 구조체. `Values`를 정의합니다. 이 구조체는 대부분의 카드가 하나의 값을 가지고 있다는 것을 캡슐화 하지만, Ace 카드는 2개의 값을 가집니다. `Values` 구조체는 다음을 표현하기 위해 2개의 프로퍼리를 정의합니다.

- `Int`타입의 `first`
- `Int?`타입 또는 옵셔널 `Int`인 `second`


또한, `Rank`는 `Values` 구조체의 인스턴스를 반환하는 계산 프로퍼티 `values`를 정의합니다. 이 계산 프로퍼티는 카드의 순위와 새로운 `Values` 인스턴스를 순위를 기반으로 적절한 값으로 초기화 합니다. `jack, queen, king, ace`에 대해서 특별한 값을 사용합니다. 숫자 카드들에 대해서는, 순위(`rank`)의 `Int` 원시(`raw`) 값을 사용합니다.

`BlackjackCard` 구조체는 자체적으로 2개의 프로퍼티(`rank`와 `suit`)를 가집니다. 또한, 카드의 이름과 값을 설명하하기 위해 `rank`와 `suit` 에서 저장된 값을 사용하는 계산 프로퍼티 `description`을 정의 합니다. `description` 프로퍼티는 두번째 값을 보여주는지 검사하기 위해 옵셔널 바인딩을 사용하고, 만약 있다면, 두번째 값에 대한 자세한 추가 설명을 삽입합니다.

`BlackjackCard`가 사용자정의 초기화가 없는 구조체이기 때문에. [구조체 타입에 대한 멤버단위 초기화(Memberwise Initializers for Structure Types)](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html#ID214)에서 설명된 것 처럼, 암시적인 `멤버별(memberwise)` 초기화를 가지고 있습니다 새로운 상수 `theAceOfSpades`를 초기화 하기 위해 이 초기화를 사용할 수 있습니다.

```swift
let theAceOfSpades = BlackjackCard(rank: .ace, suit: .spades)
print("theAceOfSpades: \(theAceOfSpades.description)")
// Prints "theAceOfSpades: suit is ♠, value is 1 or 11"
```

`Rank`와 `Suit`가 `BlackjackCard` 안에 중첩되어 있더라도, 이러한 타입은 컨텍스트(`context`)에 의해 추론될 수 있고, 이 인스턴스의 초기화는 열거형 이름(`.ace, .spades`) 단독으로 열거형 케이스(`case`)를 참조 할 수 있습니다. 위 예제에서, `description`프로퍼티는 스페이드(`Spades`)의에이스(`Ace`)가 `1` 또는 `11`의 값을 가지고 있는 것을 정확하게 기록합니다.

```
let heartsSymbol = BlackjackCard.Suit.hearts.rawValue
// heartsSymbol is "♡"
```

`Rank`와 `Suit`가 `BlackjackCard` 안에 중첩되어 있더라도, 이러한 타입은 컨텍스트(`context`)에 의해 추론될 수 있고, 이 인스턴스의 초기화는 열거형 이름(`.ace, .spades`) 단독으로 열거형 케이스(`case`)를 참조 할 수 있습니다. 위 예제에서, `description`프로퍼티는 스페이드(`Spades`)의에이스(`Ace`)가 `1` 또는 `11`의 값을 가지고 있는 것을 정확하게 기록합니다.




---

## Referring to Nested Types

정의된 컨텍스트(context) 밖에서 중첩된 타입을 사용하려면, 이름 앞에 중첩된 타입의 이름을 접두사(prefix)로 붙입니다.

```swift
let heartsSymbol = BlackjackCard.Suit.hearts.rawValue
// heartsSymbol is "♡"
```

위의 예제의 경우, 이러한 이름들은 정의된 컨텍스트(context)에 의해 자연스럽게 어울리기 때문에, `Suit, Rank, Values`의 이름을 일부러 짧게 유지 할 수 있습니다.

---



