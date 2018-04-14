---
layout:     post
title:      "Swift. 정리하기 17"
subtitle:   "Swift Language Guide-Type Casting Handling *"
date:       2018-04-13 15:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Type Casting](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TypeCasting.html#//apple_ref/doc/uid/TP40014097-CH22-ID338)<br>
[까칠코더님 블로그](http://kka7.tistory.com/24?category=919617)

---

## Type Casting

`타입 변환(Type casting)`은 인스턴스의 타입을 확인하는 방법 또는 인스턴스를 다른 상위 클래스나 클래스 계층구조에 있는 다른 하위 클래스처럼 처리합니다.

Swift에서 타입 변환은 `is`와 `as`연산자로 구현됩니다. 이러한 두 연산자는 값의 타입을 확인하거나 다른 타입으로 값을 변환하는 것을 제공하는 간단한 표현 방법을 제공합니다.

또한, [프로토콜 준수하는지 확인하기(Checking for Protocol Conformance)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID283)에서 설명된것처럼, 프로토콜을 준수하는지 확인하는데 타입변환(type casting)을 사용 할 수 있습니다.


---

