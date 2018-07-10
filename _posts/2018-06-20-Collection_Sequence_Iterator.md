---
layout:     post
title:      "Swift, Iterator, Sequence, Collection"
subtitle:   "링크 참조.."
date:       2018-06-20 17:45:00
author:     "MinJun"
header-img: "img/tags/Xcode-bg.jpg"
comments: true 
tags: [Algorithm, Swift]
---

## Iterator

iterator는 `IteratorProtocol` 프로토콜에 부합하는 범용 타입 입니다. IteratorProtocol 프로토콜의 유일한 목적은 컬렉션을 반복 순회하는 `next()`메소드를 통해 컬렉션의 반복 상태를 캡슐화 하는 것이며, 시퀀스에 있는 다음 욧를 반환하거나 시퀀스의 마지막에 이르렀을 경우 nil을 반환합니다. 

```swift
public protocol IteratorProtocol  {
// Iterator로 순회하여 가져온 요소의 타입 
associatedtype Element

// 해당 시퀀스에서 다음번 요소를 반환하거나, 다음번 요소가 없을 경우 nil 반환 
public mutating func next() -> Self.Element? 
}
```

---

## Sequence 

sequence는 `Sequence` 프로토콜에 부합하는 범용 타입 입니다. 시퀀스에 부합하는 for..in 순환문으로 반복 순회할수 있다. 시퀀스는 컬렉션 타입이 포함된 시퀀스 타입의 IteratorProtocol을 반환하는 팩토리 반복기(factory iterator)로 생각할수 있습니다. 

Sequence 프로토콜은 다양한 메소드를 정의하며, 이번 절에서는 다음 두 메소드의 구현 방식을 살펴 봅니다. 

```swift
public protocol Sequence {
// 시퀀스 순회 인터페이스와 그 순회 상태를 캡슐화하는 타입
associatedtype Iterator: IteratorProtocol
// 이번 시퀀스를 순회해서 가져온 요소를 반환
public func makeIterator() -> Self.Iterator 
}
```

makeIterator()메소드를 직접 호출할 필요는 없으며, 스위프트 런타임이 `for...in` 반복문을 사용할때 자동으로 호출합니다.

---

## Collection 

컬렉션은 `Collection` 프로토콜에 부합하는 범용 타입 입니다. Collection은 위치를 특정할수 있는 다중 경로 시퀀스를 제공하며, 컬렉셔능ㄹ 순회하면서 많은 요소를 인덱스 값을 ㅗ저장한 뒤 필요할 때 해당 인덱스 값으로 특정 요소를 가져올 수 있는 방법을 제공합니다. 

Collection 프로토콜은 Sequence 프로토콜과 Indexable 프로토콜에도 부합합니다. Collection 프로토콜에 부합하는 타입을 만들기 위해서는 다음 네 가지를 정의 해야 합니다.

- startIndex 프로퍼티와 endIndex 프로퍼티
- 컬렉션에서 특정 인덱스 위치에 삽입하기 위한 index(after:) 메소드
- 커스텀 타임 요소에 읽기전용(read-only) 이상의 권한으로 접근하기 위한 서브스크립트 

---

## Reference 

[IteratorProtocol](https://developer.apple.com/documentation/swift/iteratorprotocol)<br>
[Sequence](https://developer.apple.com/documentation/swift/sequence)<br>
[Collection](https://developer.apple.com/documentation/swift/collection)<br>

[Swift의 Sequence와 Collection에 대해 알아야 하는것들](https://academy.realm.io/kr/posts/try-swift-soroush-khanlou-sequence-collection/)<br>
[(Swift) Array 완전정복 – 02. Sequence 프로토콜](https://soooprmx.com/archives/7047)<br>
