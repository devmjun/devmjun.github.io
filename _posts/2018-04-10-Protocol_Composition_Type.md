---
layout:     post
title:      "Swift. Protocol Composition Type"
subtitle:   "Protocol 1 & Protocol 2.. typealias"
date:       2018-04-10 19:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---


## Protocol Composition Type 


`protocol composition type`은 명확히 기술된 프로토콜의 목록 에서 각 프로토콜을 채택한 타입으로 정의합니다. 또는 지정된 클래스의 서브클래스이고 지정된 프로토콜 목록의 각 프로토콜을 준수하는 타입을 정의합니다. `protocol composition types`은 [type annotations](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type) 에서 일반 매개 변수절 및 제네릭 `where`절 에서 타입을 지정할 때만 사용할 수 있습니다. 

프로토콜 구성 유형의 형식은 다음과 같습니다. 

```Swift
Protocol 1 & Protocol 2 
```

A protocol composition type allows you to specify a value whose type conforms to the requirements of multiple protocols without explicitly defining a new, named protocol that inherits from each protocol you want the type to conform to. For example, you can use the protocol composition type `ProtocolA & ProtocolB & ProtocolC` instead of declaring a new protocol that inherits from `ProtocolA, ProtocolB`, and `ProtocolC`. Likewise, you can use `SuperClass & ProtocolA` instead of declaring a new protocol that is a subclass of `SuperClass` and conforms to `ProtocolA`.

예를들어 ProtocolA, ProtocolB 및 ProtocolC를 상속하는 새 프로토콜을 선언하는 대신 프로토콜 구성 유형인 `ProtocolA & ProtocolB & ProtocolC`를 사용할수 있습니다. 마찬가지로 SuperClass의 하위 클래스이며 ProtocolA를 준수하는 새 프로토콜을 선언하는 대신 `SuperClass & ProtocolA`를 사용할 수 있습니다. 

프로토콜의 구성목록의 각 항목은 다음 중 하나입니다. 목록에는 많아야 하나의 클래스만 포함될수 있습니다.

- The name of a class
- The name of a protocol

A type alias whose underlying type is a protocol composition type, a protocol, or a class.

어떤 타입의 기초된 타입의 별칭은 protocol composition type, 프로토콜 또는 클래스 입니다. 

When a protocol composition type contains type aliases, it’s possible for the same protocol to appear more than once in the definitions—duplicates are ignored. For example, the definition of PQR in the code below is equivalent to P & Q & R.

`protocol composition type`에 타입 별칭(type aliases)가 포함되어 있으면 동일한 프로토콜이 정의에 두번 이상 나타날수 있습니다. 복제본은 무시됩니다. 예를들어 아래 코드에서 `PQR`의 정의는 `P & Q & R`과 같습니다. 

```swift
typealias PQ = P & Q
typealias PQR = PQ & Q & R
```

---

## Refernece 

[https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/protocol-composition-type](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/protocol-composition-type)






