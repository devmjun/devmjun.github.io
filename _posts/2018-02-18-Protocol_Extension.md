---
layout:     post
title:      "Swift. Protocol, Extension 정리"
subtitle:   "Protocol, Extension, POP(Protocol Oriented Programming)"
date:       2018-02-18 02:23:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## 프로토콜(Protocol) 

- 인터페이스(interface)와 구현(implementation)
- 클래스: interface + implementation
- 프로토콜: only interface 
	- implementation이 없어서 단독 사용 불가
	- 클래스, 구조체와 함께 사용 
	- 메소드, 프로퍼티 구현을 약속 함 

---

## 프로토콜 정의

```swift
protocol PROTOCOL_NAME { }
```  

---

## 프로토콜 채택 

```swift
class CLASS_NAME: PROTOCOL_NAME {}
```

---

## 프로토콜 사용 예제

```swift
* 프로토콜 정의
protocol Singing { 
	func sing()
}

* 클래스 채택 
class Bird: singing {
	func sing() {
		print("짹짹짹")
	}
}

* 객체 생성과 사용 
var sparrow = Bird()
sparrow.sing() // 짹짹쨱 
```

#### - 같은 인터페이스, 다양한 구현 

- 클래스, 구조체, enum 채택 
- 프로토콜에 선언한 메소드를 미구현시 -> 컴파일 에러


```swift
class Bird: singing {
	func sing() {
		print("짹짹짹")
	}
}

class Cat: singing {
	func sing() {
		print("갸르릉 갸르릉")
	}
}
```

- 다중 프로토콜 채택 

```swift
protocol Singing { 
	func sing()
}

protocol Dancing {
	func dance() 
}

class Human: Dancing, Singing {
	func sing() {
		print("랄라라~")
	}
	func dance() {
		print("춤추자")
	}
}
```

#### - 프로토콜 상속과 구현 

```swift
protocol Singing {
	func sing() 
}

protocol Dancing {
	func dance() 
}

protocol Entertaining: Singing, Dancing {
}

struct Human: Entertaining {
	func sing() {}
	func dance() {}
}
```

#### - 프로토콜 내 프로퍼티 선언

- get/set 행위만 선언
- get 전용, get/set 모두
- set 전용은 없음
- 타입 프로퍼티 선언 가능

```swift
* 프로토콜 내 프로퍼티 선언 
protocol HoldingBreath {
	var duration: Int {get set}
}

* 계산 프로퍼티 구현

class MyClass: HoldingBreath {
	var duration: Int {
		get {
			return 0 
		}set {}
	}
}

* 저장 프로퍼티 구현 

struct MyStruct: HoldingBreath {
	var duration: Int 
}
```

#### - 프로토콜 내 Initializer 

```swift
protocol Named {
	init(name: String) 
}

class Monster: Named {
	var name: String?
	required init(name: String) {
		self.name = name 
	}
}

> convenience initializer에서 required 추가 해야함.
> struct에는 required 사용하지 않음 

struct Boss: Named {
	init(name: String) {}
} 

```

---

## 프로토콜 타입 

- 프로토콜을 타입으로 사용 & 선언
- 프로토콜 내 메소드, 프로퍼티만 사용 가능하다 

```swift
protocol Singing {
	func sing() 
}

protocol Dancing {
	func dance() 
}

protocol Entertaining: Singing, Dancing {
}

struct Human: Singing {
	func sing() {}
	func dance() {}
}

var singinganimal: Singing = Human()
singinganimal.sing() // 가능 
singinganimal.dance() // 불가능 

class Bird : Singing {
    func sing() {
        print("짹짹짹~")
    }
}

let Animal: Dancing = Bird() // 타입 오류 

* 다수의 프로토콜 타입 
func entertain(who: Singing & Dancing) {}
	-> singing, Dancing 프로포콜을 체택한 객체를 파라미터로 사용함.
```

---

## 클래스 전용 프로토콜 

클래스 에서만 채택 가능 

```swift
protocol MyProtocol: class {}
	-> 구조체, enum 에서 채택시 컴파일 에러 발생. 

프로토콜 타입을 weak와 사용할 때
class Myclass: MyProtocol {
	weak var property: MyProtocol!
}
	-> 프로토콜로 타입을 선언하는것은 class, struct, enum 모두 가능하지만, ARC는 클래스만 가능함. 따라서, 프로토콜 타입으로 선언한 변수를 weak 사용하기 위해서는 class 에서만 사용 가능함. 
```

---

## Extension

- 타입을 나눠서 작성 가능합니다
- 하나의 타입으로 동작합니다
- 기존에 작성된 타입을 확장 
- 서로 다른 파일에 작성 가능 

#### - Extension으로 가능한 것

- 계산 프로퍼티
- 메소드
- 프로토콜
- 서브스크립트
- nested type

#### - Extension으로 불가능한 것

- designated initializer
	- Convenience initializer는 추가 가능합니다. 
- 저장 프로퍼티

```swift
class Dog {
	func eat() {
		print("밥 먹기") 
	}
}

extension Dog {
	// 저장 프로퍼티는 사용 불가
	var color: String! // 컴파일 에러 
	
	// 계산 프로퍼티 사용가능
		var everageLife: Int! {return 15}
}
```

---
	 	
## POP(Protocol Oriented Programming)

- Protocol Extension에 구현 코드 작성 가능함
- Protocol을 채택해서 Extension으로 구현 코드 작성 가능
- 다중 상속과 비슷한 효과
- 구조체/Enum 사용 시 중복 코드 문제 해결 
- 구조체와 Protocol, extension을 활용한 프로그래밍 기법 

```swift
* Protocol과 Protocol extension
 
protocol Movable { } 
extension Movable {
	func move() { 
		print("Go! go! go!")
	} 
}

* Protocol 채택, 객체를 이용한 호출 
struct Human : Movable { } 
var man = Human() 
man.move()
```

--- 

## 다중 Protocol 채택

- 다중 상속 효과 
- 기본 구현 재정의 

```swift
class Superman : Movable, Flyable { 
	func move() {
		print("Move Fast") 
	}
}
var superman = Superman() 
superman.move() 
superman.fly()
```

마치 2개의 클래스에서 상속을 받은것 같은 효과를 냅니다, 그리고 함수 move()는 기존에 정의했던것을 재정의 할수 있음.(하지만 단점으로는 언제 재정의 되었는지 모호해짐..)

---

## POP(Protocol Oriented Programming) 장점

- 코드 중복이 발생하는 상황 -> 상속이 없는 구조체로 만들수 있음 
- Struct, Enum을 사용할때 사용하면 좋음
- 성능적 이득을 볼수 있음 <br>

```swift

* 코드 중복이 발생 하는 상황 
struct Bird { 
	func move() {
		print("이동하다") 
	}
	func fly() { 
		print("날다")
	} 
}

struct Airplane { 
	func move() {
		print("이동하다") 
	}
	func fly() { 
		print("날다")
	}
}

* Protocol Extension으로 코드 중복 제거 

protocol Movable {} 
extension Movable {
	func move() { 
		print("이동하다")
	} 
}

protocol Flyable {} 
extension Flyable {
	func fly() { 
		print("날다")
	}
}

struct Bird : Movable, Flyable { }
struct Airplane: Movable, Flyable { }
```

코드 중복 제거, Protocol, Extension을 가지고 중복 코드를 제거할수 있음!

---

## Reference 

[Swift에서 프로토콜 중심 프로그래밍(POP)하기](https://academy.realm.io/kr/posts/protocol-oriented-programming-in-swift/) <br> 
[Protocol-Oriented Programming in Swift](https://developer.apple.com/videos/play/wwdc2015/408/) <br>
[Protocol and Value Oriented Programming in UIKit Apps](https://developer.apple.com/videos/play/wwdc2016/419) <br>

---
