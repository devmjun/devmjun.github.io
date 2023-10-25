---
layout:     post
title:      "Swift. 정리하기 29"
subtitle:   "Swift Language Reference-Statements"
date:       2018-04-15 12:00:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/about-bg.png
thumbnail-img: /assets/post_img/background/about-bg.png
share-img: /assets/post_img/background/about-bg.png
toc: true
---

## Reference 


[Declarations](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID351)<br>

---

## Declarations 

선언(declaration)은 프로그램에서 새로운 이름 또는 구조를 발표(introduces)합니다. 예를들어 선언을 사용하여 함수 또는 메서드를 발표하고, 변수와 상수를 발표하며 열거형, 구조체, 클래스 및 프로토콜 타입을 정의(define)합니다. 또한 선언은 존재하고 있는 타입의 행동을 확장하고 프로그램에서 다른곳에서 선언된 symbols을 가져올수 있습니다. 

Swift에서 대부분의 선언은 선언된 것과 동시에 구현되거나 초기화된다는 의미에서의 정의 입니다. 즉, 프로토콜은 그들의 맴버를 구현하지 않기 떄문에, 대부분의 프로토콜 구성원은 선언(declaration) 입니다. 편의상 또는 Swift에서는 그다지 중요하지 않기 때문에 용어의 선언(declaration) 은 선언과 정의(definition)모두를 포함합니다. 

---

## Rethrowing Functions and Methods 


`rethrows` 키워드로 함수 또는 메소드를 선언하면 함수 매개 변수중 하나에서 오류가 발생하는 경우에만 오류가 발생함을 나타낼수 있습니다. 이 함수와 매소드는 `rethrowing`함수와 `rethrowing`메소드로 알려져 있습니다. `Rethowing`함수와 메소드는 적어도 하나의 throwing 함수가 파라미터로 가져야합니다.

```swift
func someFunction(callback: () throws -> Void) rethrows {
    try callback()
}
```

`rethowing`함수 또는 메소드는 catch 절 내에서만 throw문을 포함할수 있습니다. 이를 통해서 `do-catch`블록내에서 `throwing` 함수를 호출하고 catch 오류를 처리하여 `catch` 절의 오류를 처리할수 있습니다. 

또한 `catch`절은 `rethowing`함수의 `throwing` 매개변수 중 던져진 하나의 오류만 처리해야 합니다. 예를들어 catch절이 `alwaysThrows()`에 의해 throw 된 오류를 처리하므로 다음은 유효하지 않습니다.

```swift
func alwaysThrows() throws {
    throw SomeError.error
}
func someFunction(callback: () throws -> Void) rethrows {
    do {
        try callback()
        try alwaysThrows()  // Invalid, alwaysThrows() isn't a throwing parameter
    } catch {
        throw AnotherError.error
    }
}
```

`throwing` 매서드는 `rethowing` 매서드를 오버라이드 할수 없고, `throwing`매서드는 `rethrowing`매서드를 위한 프로토콜 요구사항을 만족할수 없습니다. 다시말하면 `rethowing`매서드는 `throwing` 메서드를 오버라이드 할수 있으며, 프로토콜 요구사항을 만족 시킬수 있습니다.  

---

## Conditional Conformance

제네릭 타입을 프로토콜에 조건부로 확장할수 있습니다. 특정 요구 사항이 충족될 때만 타입 인스턴스가 프로토콜을 준수합니다. 확장 선언에 요구 사항을 포함시켜 프로토콜에 조건부 적합성을 추가합니다.

### - Overridden Requirements Aren’t Used in Some Generic Contexts

일부 제네릭 문맥에서 조건부를 준수하는것으로 부터 타입의 행동은 프로토콜은 프로토콜의 요구사항의 특수한 구현을 사용하지 않습니다. 이 동작을 설명하기 위해 다음 예제에서 두 프로토콜 과 두 프로토콜을 조건부로 따르는 제네릭 타입을 정의합니다. 

```swift
protocol Loggable {
    func log()
}
extension Loggable {
    func log() {
        print(self)
    }
}
 
protocol TitledLoggable: Loggable {
    static var logTitle: String { get }
}
extension TitledLoggable {
    func log() {
        print("\(Self.logTitle): \(self)")
    }
}
 
struct Pair<T>: CustomStringConvertible {
    let first: T
    let second: T
    var description: String {
        return "(\(first), \(second))"
    }
}
 
extension Pair: Loggable where T: Loggable { }
extension Pair: TitledLoggable where T: TitledLoggable {
    static var logTitle: String {
        return "Pair of '\(T.logTitle)'"
    }
}
 
extension String: TitledLoggable {
    static var logTitle: String {
        return "String"
    }
}
```


`Pair`구조체는 `Loggable` 또는 `TitledLoggable`을 따를떄 마다 `Loggable`과 `TitledLoggable`을 따릅니다. 

아래의 예제에서 `oneAndTwo`는 `Pair<String>`의 인스턴스 이고, 그것은 `TitledLoggable` 을 따릅니다. 왜냐하면 `String`은 `TitledLoggable` 을 따릅니다. `oneAndTow`에서 직접적으로 `log()` 메서드를 호출했을때 `title string` 을 포함하는 분리된 버전을 사용합니다.

```swift
let oneAndTwo = Pair(first: "one", second: "two")
oneAndTwo.log()
// Prints "Pair of 'String': (one, two)"
```

그러나 `oneAndTwo`가 제네릭 컨텍스트 또는 `Loggable`프로토콜의 인스턴스로 사용되는경우 분리된 버전은 사용되지 않습니다. Swift는 `Pair`가 `Loggable`을 준수해야하는 최소 요구 사항만을 참조하여 호출할 `log()` 구현을 선택합니다. 이러한 이유로 기본 구현은 `Loggable`프로토콜에 의해서 제공된것이 대신 사용됩니다. 

```swift
func doSomething<T: Loggable>(with x: T) {
    x.log()
}
doSomething(with: oneAndTwo)
// Prints "(one, two)"
```

`doSometing(_:)`에 전달된 인스턴스에서 `log()`가 호출되면 사용자 정의 된 제목(`title`)은 `logged string` 에서 생략됩니다.("(one, two)" 출력)

### - Protocol Conformance Must Not Be Redundant

특정한 타입은 특정 프로토콜을 한번만 준수 할수 있습니다. Swift는 중복 프로토콜 준수를 오류로 표시합니다. 두 종류의 상황에서 오류가 발생할 가능성이 있습니다. 

첫번째 상황은 명시적으로 동일한 프로토콜을 여러번 준수하지만 요구사항이 다른 경우입니다. 

두번쨰 상황은 암시적으로 동일한 프로토콜을 여러번 상속하는 경우 입니다. 이러한 상황은 아래 색션에서 설명합니다. 

```swift
protocol Serializable {
    func serialize() -> Any
}
 
extension Array: Serializable where Element == Int {
    func serialize() -> Any {
        // implementation
    }
}
extension Array: Serializable where Element == String {
    func serialize() -> Any {
        // implementation
    }
}
// Error: redundant conformance of 'Array<Element>' to protocol 'Serializable'
```

여러 타입을 기반으로 조건부 적합성을 추가해야하는 경우 각 타입이 준수할수 있는 새 프로토콜을 작성하고 조건 준수를 선언할때 해당 프로토콜을 요구 사항으로 사용하세요.

### - Resolving Implicit Redundancy

복합적인 타입이 조건부로 프로토콜을 준수할때 해당 타입은 암묵적으로 동일한 요구사항을 가진 상위 프로토콜을 준수합니다. 

단일한 상위 프로토콜로부터 상속받은 두개의 프로토콜을 조건부로 준수하는 타입이 필요한 경우 명시적으로 상위 프로토콜에 대한 준수를 선언하세요. 이렇게하면 서로 다른 요구 사항에 따라 상위 프로토콜을 암시적으로 준수하지 않아도 됩니다. 

다음 예제에서는 `Array`의 `Loggable`에 대한 조건부 준수를 명시적으로 선언하여 `TitledLoggable`및 새 `MarkedLoggable`프로토콜에 대한 조건부 준수를 선언할때 충돌을 피합니다. 

```swift
protocol MarkedLoggable: Loggable {
    func markAndLog()
}
 
extension MarkedLoggable {
    func markAndLog() {
        print("----------")
        log()
    }
}
 
extension Array: Loggable where Element: Loggable { }
extension Array: TitledLoggable where Element: TitledLoggable {
    static var logTitle: String {
        return "Array of '\(Element.logTitle)'"
    }
}
extension Array: MarkedLoggable where Element: MarkedLoggable { }
```

명시적으로 `Loggable`에 조건부 적합성을 선언하는 확장 기능이 없으면 다른 Array확장이 이러한 선언을 암시적으로 생성하여 오류가 발생합니다. 

```swift
extension Array: Loggable where Element: TitledLoggable { }
extension Array: Loggable where Element: MarkedLoggable { }
// Error: redundant conformance of 'Array<Element>' to protocol 'Loggable'
```

---

## Declaration Modifiers 

선언 수정자(Declaration modifiers) 선언의 동작 또는 의미를 수정하는 키워드 또는 상황에 맞는 키워드 합니다. 선언의 속성, 선언을 도입하는(introduces) 키워드 사이에 적절한 키워드 또는 상황에 맞는 키워드를 작성하여 선언 수정자를 지정합니다. 

### - dynamic 

이 수정자는 `Objective-C`로 나타낼수 있는 클래스의 모든 맴버에 적용합니다. dynamic 수정자로 맴버 선언을 표시하면 런타임에 사용하여 해당 맴버에 대한 접근이 항상 동적(dynamiclly)으로 전달됩니다. 해당 맴버에 대한 접근은 컴파일러에 의해서 즉시 처리되지 않고(never inlined), 가상화되지 않습니다 

Because declarations marked with the dynamic modifier are dispatched using the Objective-C runtime, they must be marked with the objc attribute.

dynamic 수정자로 표시된 선언은 Objective-C 런타임을 사용하여 전달되므로 `objc`속성으로 표시해야 합니다.

### - final
### - lazy
### - optional
### - required
### - unowned
### - unowned(safe)
### - unowned(unsafe)
### - weak

---












 






