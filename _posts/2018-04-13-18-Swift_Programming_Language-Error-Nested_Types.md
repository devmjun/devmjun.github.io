---
layout:     post
title:      "Swift. 정리하기 18"
subtitle:   "Swift Language Guide-Type Nested Types"
date:       2018-04-13 16:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
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

// 2
let theAceOfSpades = BlackjackCard(rank: .ace, suit: .spades)
print("theAceOfSpades: \(theAceOfSpades.description)")
// Prints "theAceOfSpades: suit is ♠, value is 1 or 11"

// 3
let heartsSymbol = BlackjackCard.Suit.hearts.rawValue
// heartsSymbol is "♡"
```

---

## Referring to Nested Types

정의된 컨텍스트(context) 밖에서 중첩된 타입을 사용하려면, 이름 앞에 중첩된 타입의 이름을 접두사(prefix)로 붙입니다.

```swift
let heartsSymbol = BlackjackCard.Suit.hearts.rawValue
// heartsSymbol is "♡"
```

위의 예제의 경우, 이러한 이름들은 정의된 컨텍스트(context)에 의해 자연스럽게 어울리기 때문에, `Suit, Rank, Values`의 이름을 일부러 짧게 유지 할 수 있습니다.


---

## Reference 

[Nested Types](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/NestedTypes.html#//apple_ref/doc/uid/TP40014097-CH23-ID242)<br>
[까칠코더님 블로그](http://kka7.tistory.com/25?category=919617)