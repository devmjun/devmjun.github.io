---
layout:     post
title:      "Swift. MetaType에 대해서 알아봅니다"
subtitle:   ".Type, .Protocol"
date:       2018-04-10 16:38:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Idea]
---

## Metatype Type 

metytype의 타입은 어떤 타입의 타입을 가르킵니다. class Types, structure types, enumeration type, protocol types 를 포함합니다. 

class, structure, enumeration 타입의 metatype은 `.Type`를 따르는 타입의 이름으로 명명되었습니다. 런타임에 프로토콜을 준수하는 구체적인 타입이 아닌 프로토콜 유형의 메타 타입은 해당 프로토콜의 이름 뒤에 `.Protocol`이 옵니다.  예를들어 class 타입의 어떤 클레스의 metatype은 `SomeClass.Type`이고, 프로토콜의 메타 타입은 `someProtocol.Protocol` 입니다. 

접미사에 `self` 표현식을 사용하여 유형을 값으로 엑세스 할수 있습니다. 예를들어 `someClass.self`는 SomeClass의 자기자신(itself)를 반환하고, `SomeClass`의 인스턴스가 아닙니다. 그리고 `SomeProtocol.self`는 런타임에 `SomeProtocol`을 준수하는 타입의 인스턴스가 아닌 `SomeProtocol`자체를 반환합니다. 스위프트의 기본 함수인 `type(of:)` 함수를 타입의 인스턴스와 함께 호출하여 해당 인스턴스의 동적(dynamic) 런타임 유형에 값을 엑세스 할수 있습니다. 

아래의 예시를 살펴 보겠습니다. 

```swift
class SomeBaseClass {
    class func printClassName() {
        print("SomeBaseClass")
    }
}
class SomeSubClass: SomeBaseClass {
    override class func printClassName() {
        print("SomeSubClass")
    }
}
let someInstance: SomeBaseClass = SomeSubClass()
// The compile-time type of someInstance is SomeBaseClass,
// and the runtime type of someInstance is SomeSubClass
type(of: someInstance).printClassName()
// Prints "SomeSubClass"
```

> `let someInstance: SomeBaseClass = SOmeSubClass()` 가 컴파일 타임에는 SomeBaseClass의 인스턴스 타입이고, 런타임에 SomeSubClass의 인스턴스 타입이됩니다..오호..

추가적으로 Swift의 라이브러리 `type(of:)` 를 봅니다.

초기화 표현식을 사용하여 해당 타입의 metatype의 값 에서 타입의 인스턴스를 구성하세요. 클래스 인스턴스의 경우 호출된 이니셜 라이저는 `required` keyword 또는 `final` keyword로 표시된 클레스로 표시되어야 합니다. 

```swift
class AnotherSubClass: SomeBaseClass {
    let string: String
    required init(string: String) {
        self.string = string
    }
    override class func printClassName() {
        print("AnotherSubClass")
    }
}
let metatype: AnotherSubClass.Type = AnotherSubClass.self
let anotherInstance = metatype.init(string: "some string")
GRAMMAR OF A METATYPE TYPE
```

---

## 예시

```swift

print("\n---------- [ Instance Type Check ] ----------\n")

let str = "StringInstance"
print(str is String)           // true, str 은 String Type 의 객체, 스트링의 객체가 맞으면 참트루
print(str == "StringInstance") // true, str 은 "StringInstance" 와 동일
print(str is String.Type)      // false
print(str is String.Type.Type) // false



print("\n---------- [ Type's Type check ] ----------\n")

print(type(of: str) is String)       // false, String is String 과 동일.. 그니까 String == String.Type을 물어본거
print(type(of: str) == String.self)  // true, str 객체의 타입은 String 그 자체, String.Type == String.Type
print(type(of: str) is String.Type)  // true, str 객체의 타입은 String.Type 의 객체 String의 타입 == String.type



print("\n---------- [ Metatype's Type check ] ----------\n")

private let meta = type(of: String.self)
print(meta is String)  // false
print(meta == String.self)  // false
print(meta == String.Type.self)  // true, String 메타타입은 String.Type
print(meta is String.Type.Type)  // true, String 메타타입은 String.Type.Type 의 객체
```

---

## 실사용 예제

```swift
extension UIStoryboard {
   func instantiateViewController<T>(ofType type: T.Type) -> T {
     return instantiateViewController(withIdentifier: String(describing: type)) as! T
   }
 }
```

---

## Keyword 

1. `.Type`
2. `.Protocol`

---

## 여담 

메타타입을 사용할때 어떤 타입으로 식별자를 구성하는 method를 작성할때 좀더 무엇을 원하는지 직관적으로 알수있다고 생각됩니다.

---

## Reference 

[MetaType](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/doc/uid/TP40014097-CH31-ID457)

- 연관된 포스트 
	- [Swift. Type method](https://devminjun.github.io/blog/Type_Methods)
	- [ComputerScience. Compile-time vs Run-Time](https://devminjun.github.io/blog/Whats_the_difference_between_run-time_and_compile-time)
	- [Protocol Composition Type](https://devminjun.github.io/blog/Protocol_Composition_Type)
	- [Compile-Time vs Run-Time Type Checking in Swift](https://devminjun.github.io/blog/Compile-Time_vs_Run_Time_Type_checking_in_Swift)