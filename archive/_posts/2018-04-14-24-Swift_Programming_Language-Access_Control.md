---
layout:     post
title:      "Swift. 정리하기 24: Swift Language Guide-Access Control"
subtitle:   "Swift Language Guide-Access Control *"
date:       2018-04-14 13:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
---

최종 수정일: 2018. 10. 1

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Access Control](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AccessControl.html#//apple_ref/doc/uid/TP40014097-CH41-ID3)<br>
[까칠코더님 블로그](http://kka7.tistory.com/131?category=919617)

---


## Access Control

`접근제어(Access control)`는 다른 소스파일과 모듈에서 코드에 접근하는 것을 제한합니다. 이것은 코드의 상세 구현부를 숨길 수 있고, 인터페이스 지정하여 코드 접근과 사용 할 수 있습니다.

각각의 타입(클래스, 구조체, 열거형)에 대한 접근 레벨(level)을 지정할수 있고, 프로퍼티, 메소드, 초기화, 서브스크립트에 적용됩니다. 프로토콜은 전역 상수, 변수, 함수처럼 특정 상황(context)을 제한 할 수 있습니다.

다양한 레벨의 접근 제어를 제공하는 것 외에, Swift는 일반적인 시나리오에 대한 기본 접근 레벨을 제공함으로써 명시적으로 접근 제어 레벨을 지정해야 할 필요성을 줄여줍니다. 확실히, 단일-대상(single-target) 앱을 작성한다면, 명시적으로 접근 제어 레벨을 지정하는 것은 필요하지 않습니다.

> Note: 코드의 다양한 측면에서 접근 제어를 적용할 수 있는 것들(프로퍼티, 타입, 함수, 등등)은 간결함(brevity)을 위해, 아래 섹션(sections)에서 요소들(entities)이라고 합니다.

---

## Modules and Source files 

Swift의 접근 제어 모델은 `모듈(modules)`과 `소스 파일(source files)`의 개념을 기반으로 합니다.

모듈(module)는 단일 코드 단위 배포입니다 - Swift의 `import`키워드를 사용하여 다른 모듈에서 가져오는 것처럼, 프레임 워크나 앱을 내장(built)하고 가져옵니다(shipped).

XCode의 각 빌드 타겟(앱 번들이나 프레임워크)은 Swift에서 분리된 모듈로 취급됩니다. 독립형 프레임 워크처럼 앱의 코드를 함께 그룹화 하면 - 아마도, 여러 앱들 사이에서 코드를 캡슐화 하고 재사용 합니다 - 앱 내에서 가져(imported)와서 사용하거나 다른 프레임 워크에서 사용할때, 프레임워크에서 정의한 모든것이 별도 모듈의 일부가 될것입니다.

`소스파일(source file)`은 하나의 모듈(실제로, 앱 또는 프레임 워크에서 하나의 파일)로 된 Swift 소스코드 파일입니다. 별도의 소스파일로 각각 타입을 정의하는게 일반적이지만, 하나의 소스파일에서 여러 타입, 함수, 등등 에 대해 정의하는 것이 가능합니다.

---

## Access Levels 

Swift는 코드에서 `요소들(entities)`에 대해 5개의 다른 `접근 레벨(access levels)`을 제공합니다. 이러한 접근 레벨은 `요소(entity)`가 정의된 소스파일에 관련 있고, 또한 소스 파일이 속한 모듈과 관련 있습니다.

- `Open access`과 `public access` 요소들은 정의된 모듈의 모든 소스파일에서 요소들을(entities) 사용할 수 있고, 또한 정의된 모듈을 가져오는(imports) 다른 모듈의 소스파일에서 사용가능합니다. 프레임 워크에 대해 `public` 인터페이스를 지정할때, 일반적으로 `open` 또는 `public` 접근을 사용합니다. `open` 과 `public` 접근의 차이점은 아래에 설명되어 있습니다.
- `internal access` 요소들은 정의된 모듈의 모든 소스파일에서 사용 할수 있지만, 모듈 밖의 모든 소스 파일에서는 사용 할수 없습니다. 앱 또는 프레임 워크의 내부 구조로 정의 할때, 일반적으로 `internal` 접근을 사용합니다.
- `File-privae access`은 자신이 정의된 소스파일에서만 요소(entity)를 사용할수 있도록 제한 합니다. `file-private` 접근은 상세 정보가 전체 파일내에서 사용될때 일부 특정 함수의 세부 구현을 숨길때 사용합니다.
- `Private access`은 선언된 영역(enclosing)에서만 요소를 사용할 수 있도록 제한합니다. `private`접근은 하나의 선언 안에서 상세 정보를 사용할때 일부 특정 함수의 세부 구현을 숨길때 사용합니다.

`open`접근이 가장 높은(제한을 최소화) 접근 레벨이고 `private`접근은 가장 낮은(제한이 가장많음)접근 레벨입니다.

`open`접근은 클래스와 클래스의 멤버에만 적용되고, 다음과 같이 `public`접근과는 다릅니다.

- `public`접근이나 더 제한적인 접근 레벨의 클래스는 정의된 모듈내에서만 서브클래스화(subclassed) 할 수 있습니다.
- `public`접근이나 더 제한적인 접근 레벨의 클래스 멤버는 정의된 모듈내에서만 서브클래스(subclasses)에 의한 오버라이드(overridden) 할 수 있습니다.
- `open` 클래스는 정의된 모듈 내에서와 정의된 모듈을 가져오는(imports) 모든 모듈에서 서브클래스화(subclassed) 할 수 있습니다.
- `open` 클래스 멤버는 정의된 모듈내에서와 정의된 모듈을 가져오는(`imports`) 모든 모듈에서 서브클래스(subclasses)에 의한 오버라이드(overridden)가 할 수 있습니다.

클래스를 명시적으로 `open`표시하는 것은 해당 클래스를 다른 모듈에서 슈퍼클래스로 사용하는 코드의 영향을 고려하고, 클래스의 코드에 맞게 설계했음을 나타냅니다.

---

## Guiding Principle of Access Levels

Swift에서 접근 레벨은 전반적인 지침원칙은 다음과 같습니다 : `요소(entity)는 더 낮은(더 제한적인) 접근 레벨을 가지는 다른 요소의 조건으로 정의 할 수 없습니다.`

예를 들어:

- `public` 변수는 `internal`, `file-private, private`타입을 갖도록 정의 할 수 없습니다. 왜냐하면, public변수로 사용되는 곳에서 해당 타입을 사용하지 못할 수 있기 때문이다.
- 해당 구성 타입을 주변 코드에서 사용할수 없는 상황에서 함수를 사용할 수 있기 때문에, 함수는 매개변수 타입과 반환타입보다 높은 접근 레벨을 가질 수 없습니다.

다른 언어 측면에서 `지침 원칙(guiding principle)`의 상세한 의미는 아래에 자세히 설명되어 있습니다.

---

## Default Access Levels

코드내의 모든 요소들(entities)은 명시적으로 접근 레벨을 지정하지 않은 경우에, `internal` 기본 접근 레벨을 가지고 있습니다. 결과적으로, 대부분의 경우 명시적으로 접근 레벨을 지정할 필요가 없습니다.

---

## Access Levels for Single-Target Apps

`단일 대상(single-target)` 앱을 작성할때, 앱의 코드는 일반적으로 앱과 앱의 모듈 밖에서 사용할 필요가 없도록 스스로를 포함합니다. `internal`의 기본 접근 레벨이 요구사항과 이미 일치합니다. 따라서, 사용자 정의 접근 레벨을 지정할 필요가 없습니다. 하지만, 코드의 일부를 앱의 모듈내의 다른 코드에서 세부 구현정보를 숨기기위해 `file private` 또는 `private`처럼 표시 하는 것을 원할수 있습니다.

---

## Access Levels for Frameworks

프레임워크(frameworks)를 개발할때, 해당 프레임워크를 `open`또는 `public`으로 설정하여 다른 모들에서 접근 할 수 있게 공용 영역(public-facing) 인터페이스 표시합니다. 공용 영역(public-facing) 인터페이스는 프레임워크에 대한 API(application programming interface)입니다.

> Note: 프레임워크의 모든 `internal` 상세 구현은 여전히 `internal`의 기본 접근 레벨을 사용 할 수 있거나, 프레임워크의 내부 코드를 다른 부분으로 부터 숨기기 위해 `private`나 `file private`를 표시 할 수 있습니다. 프레임워크의 API가 되게 하려면 `요소(entity)`를 `open`이나 `public`으로 표시하는게 필요합니다.

---

## Access Levels for Unit Test Targets

단위테스트 대상 앱을 작성할때, 앱의 코드는 테스트하기 위한 모델을 사용할 수 있게 해줘야 합니다. 기본적으로, 다른 모델에 `open`이나 `public`으로 표시된 요소들(entites)만 접근 할 수 있습니다. 하지만, @testable속성으로 제품 모델에 가져오기(import) 선언을 하고 테스트 가능한 제품 모듈을 컴파일하면, 단위 테스트 대상은 모든 `internal` 요소에 접근 할 수 있습니다.

---

## Access Control Syntax

하나의 요소에 대한 접근 레벨 정의는 `open, public, internal, fileprivate, private` 중 하나를 요소(entity’s)의 앞에 배치합니다.

```swift
public class SomePublicClass {}
internal class SomeInternalClass {}
fileprivate class SomeFilePrivateClass {}
private class SomePrivateClass {}
 
public var somePublicVariable = 0
internal let someInternalConstant = 0
fileprivate func someFilePrivateFunction() {}
private func somePrivateFunction() {}
```

[기본 접근 레벨(Default Access Levels)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AccessControl.html#//apple_ref/doc/uid/TP40014097-CH41-ID7)에서 설명된 것 처럼, 별도의 규정이 없으면, 기본 접근 레벨은 `internal`입니다. 이는 `SomeInernalClass`와 `someInternalConstant`가 명시적인 접근 레벨 없이, `internal` 접근 레벨을 가지고 있다는 의미입니다.

```swift
class SomeInternalClass {}              // implicitly internal
let someInternalConstant = 0            // implicitly internal
```

---

## Custom Types

사용자정의 타입에 대해 명시적인 접근 레벨을 지정하길 원하면, 타입을 정의하는 시점에 해야 합니다. 새로운 타입은 접근 레벨이 허용되는 곳에서 사용 될 수 있습니다. 예를들어, file-private 클래스를 정의하면, 클래스는 `file-private` 클래스가 정의된 소스 파일에서, 프로퍼티의 타입이나 함수 매개변수 또는 반환 타입으로 사용 될 수 있습니다.

타입의 접근 제어 레벨은 타입의 멤버(프로퍼티, 메소드, 초기화, 서브스크립트)의 기본 접근 레벨에 영향을 줍니다. `private` 또는 `file private`으로 타입의 접근 제어 레벨을 정의하면, 멤버들의 기본 접근 레벨은 `private` 또는 `file private`이 될 것입니다. `internal` 또는 `public`(또는 명시적으로 접근 레벨을 지정하지 않고 internal 기본 접근레벨을 사용)으로 타입의 접근 레벨을 정의하면, 타입의 멤버들의 기본 접근 레벨은 `internal`이 될 것 입니다.

> Note: `public` 타입은 기본으로 `public`멤버가 아니라, `internal` 멤버를 가지고 있습니다. 타입 멤버를 `public`으로 하길 원하면, 그에 대해 명시적으로 표시해줘야 합니다. 이러한 요구사항은 타입에 대한 공용 영역(public-facing) API가 공개하도록 선택하고, 실수로 internal 타입을 public API 처럼 작업하는 것을 피하게 해줍니다.

```swift
public class SomePublicClass {                  // explicitly public class
    public var somePublicProperty = 0            // explicitly public class member
    var someInternalProperty = 0                 // implicitly internal class member
    fileprivate func someFilePrivateMethod() {}  // explicitly file-private class member
    private func somePrivateMethod() {}          // explicitly private class member
}
 
class SomeInternalClass {                       // implicitly internal class
    var someInternalProperty = 0                 // implicitly internal class member
    fileprivate func someFilePrivateMethod() {}  // explicitly file-private class member
    private func somePrivateMethod() {}          // explicitly private class member
}
 
fileprivate class SomeFilePrivateClass {        // explicitly file-private class
    func someFilePrivateMethod() {}              // implicitly file-private class member
    private func somePrivateMethod() {}          // explicitly private class member
}
 
private class SomePrivateClass {                // explicitly private class
    func somePrivateMethod() {}                  // implicitly private class member
}
```

---

## Tuple Types

튜플 타입에 대한 접근 레벨은 튜플에서 사용되는 모든 타입 접근 레벨에서 가장 제한된 접근 레벨입니다. 예를 들어, 두개의 다른 타입, 하나는 `internal`접근과 또 하나는 `private`접근 레벨로 튜플을 구성하면, 구성된 튜플 타입에 대한 접근 레벨은 `private`일 것입니다.

> Note: 튜플 타입은 클래스, 구조체, 열거형, 함수와 같은 방법으로 독립적으로 정의 할 수 없습니다. 튜플 타입이 사용될때, 튜플 타입의 접근 레벨은 자동으로 추론되고, 명시적으로 지정 할 수 없습니다.

---

## Function Types

함수 타입에 대한 접근 레벨은 함수의 매개변수 타입과 반환 타입중 가장 제한적인 접근 레벨로 계산됩니다. 함수의 계산된 접근 레벨이 컨텍스트(contextual)의 기본값과 일치하지 않은 경우, 함수 정의에서 명시적으로 접근 레벨을 지정해야 합니다.

아래 예제에서 전역 함수 `someFunction()`은 함수 자체에 특정 접근 레벨을 제공하지 않고 정의됩니다. 이 함수는 `internal` 기본 접근 레벨을 가지는 것을 기대할 수 있지만, 이 경우에는 아닙니다. 사실상, `someFunction()`은 아래와 같이 컴파일 되지 않을 것입니다.

```swift
func someFunction() -> (SomeInternalClass, SomePrivateClass) {
    // function implementation goes here
}
```

그 함수의 반환타입은 [사용자정의 타입(Custom Types)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AccessControl.html#//apple_ref/doc/uid/TP40014097-CH41-ID11)에서 정의된 두개의 사용자정의 클래스로 구성된 튜플 타입 입니다. 클래스들 중 하나는 `internal`로 정의되고, 또 다른 하나는 `private`로 정의됩니다. 따라서, 구성된 튜플 타입의 전반적인 접근 레벨은 `private`(튜플 구성 타입의 최소 접근 레벨) 입니다.

함수의 반환 타입이 `private`이기 때문에, 함수 선언이 유효하기 위해 함수의 전반적인 접근 레벨을 `private`로 표시해야 합니다.

```swift
private func someFunction() -> (SomeInternalClass, SomePrivateClass) {
    // function implementation goes here
}
```

함수의 `public` 또는 `internal` 사용자는 함수의 반환 타입에 사용되는 `private`클래스에 적절한 접근 권한이 없을 수 있기 때문에, `public`또는 `internal` 또는 internal 기본 설정을 사용하여, `someFunction()`의 정의를 표시하는 것은 유효하지 않습니다.

---

## Enumeration Types

열거형의 각 `cases`들은 자동적으로 열거형과 같은 레벨을 받는다. 열거형의 각 `case`들에 대한 접근 레벨을 다르게 지정할수 없다.

아래 예제에서, `CompassPoint`열거형은 명시적으로 `public` 접근 레벨을 가지고 있습니다. 열거형 north, south, east, west cases는 `public` 접근 레벨을 가지고 있습니다.

```swift
public enum CompassPoint {
    case north
    case south
    case east
    case west
}
```

---

## Raw Values and Associated Values

열거형에서 정의된 원시 값(raw values) 또는 연관된 값(associated values)에 사용되는 타입은 반드시 열거형의 접근 레벨보다 높은 접근 레벨을 가집니다. 예를들어, `internal` 접근 레벨인 열거형의 원시 값(raw-value) 타입에 `private`타입을 사용 할 수 없습니다.

---

## Nested Types

중첩된 타입은 자동적으로 `private` 접근 레벨을 가지는 `private` 타입으로 정의됩니다. `file-private` 타입으로 정의된 중첩된 타입은 자동으로 `file private` 접근 레벨을 가집니다. `public`타입 또는 `internal`타입으로 정의된 중첩된 타입은 자동으로 `internal` 접근 레벨을 가집니다. 중첩된 타입을 `public`으로 사용하려면, 명시적으로 중첩된 타입 명시적으로 `public`으로 선언해야 합니다.

---

## Subclassing 

현재 접근 컨텍스트(context)에서 접근 할 수 있는 모든 클래스를 서브클래스(subclass) 할 수 있습니다. 서브클래스는 슈퍼클래스보다 높은 접근 레벨을 가질수 없습니다 - 예를 들어, `internal` 슈퍼클래스의 서브클래스를 `public`으로 작성 할 수 없습니다.

추가적으로, 특정 접근 컨텍스트(context)에서 볼 수 있는 
모든 클래스 멤버(메소드, 프로퍼티, 초기화, 서브스크립트)를 오버라이드(override) 할 수 있습니다.

오버라이드(override)는 상속된 클래스 멤버를 슈퍼클래스 버전보다 더 접근성 있게 만들수 있습니다. 아래 예제에서, 클래스 `A`는 `public`클래스에 `someMethod` `file-private` 메소드가 있습니다. 클래스 `B`는 접근 레벨이 `internal`로 축소된 `A`의 서브클래스입니다. 그러므로, 클래스 `B`는 `someMothod()`의 접근 레벨이 원래의 `someMethod()` 구현보다 높은 `internal`인 오버라이드를 제공합니다.

```swift
public class A {
    fileprivate func someMethod() {}
}
 
internal class B: A {
    override internal func someMethod() {}
}
```

허용된 접근 레벨 컨텍스트(슈퍼클래스와 같은 소스파일에서 `file-private` 멤버를 호출하거나, 슈퍼클래스와 같은 모듈에서 `internal` 멤버를 호출하는)에서 슈퍼클래스의 멤버를 호출하는 한, 서브클래스 멤버보다 더 낮은 접근 권한을 가지는 슈퍼클래스 멤버를 호출하는 서브클래스 멤버는 유효합니다.

```swift
public class A {
    fileprivate func someMethod() {}
}
 
internal class B: A {
    override internal func someMethod() {
        super.someMethod()
    }
}
```

슈퍼클래스 A와 서브클래스 B는 같은 소스 파일에서 정의되기 때문에, `super.someMethod()`를 호출하는 `someMothod()`의 `B` 구현은 유효합니다.

---

## Constants, Variables, Properties, and Subscripts

상수, 변수, 프로퍼티는 타입보다 더 `public` 할 수 없습니다. `private`타입으로 `public`프로퍼티를 작성하는 것은 유효하지 않습니다. 예를들어, 비슷하게, 서브스크립트는 인덱스 타입이나 반환 타입보다 더 public 할 수 없습니다.

상수, 변수, 프로퍼티, 서브스크립트를 `private`타입으로 사용하려면, 상수, 변수, 프로퍼티, 서브스크립트는 반드시 `private`로 표시해야 합니다.

```swift
private var privateInstance = SomePrivateClass()
```

---

## Getters and Setters 

상수, 변수, 프로퍼티, 서브스크립트에 대한 `getters`과 `setters`은 자동으로 상수, 변수, 프로퍼티, 서브스크립트가속한 것과 같은 접속 레벨이 됩니다.

변수, 프로퍼티, 서브스크립트의 읽기-쓰기를 제한하기 위해, `setter`에 해당 `getter`보다 낮은(lower) 접근 레벨을 줄 수 있습니다. `var`또는 `subscript`전에 `fileprivate(set)`, `private(set)`, `internal(set)`을 작성하여, 낮은 접근 레벨을 할당합니다.

> Note: 이 규칙은 저장 프로퍼티 뿐만 아니라 계산 프로퍼티에도 적용됩니다. 비록 저장 프로퍼티에 대해 명시적으로 `getter`와 `setter`를 작성하지 않지만, Swift는 암시적으로 저장 프로퍼티의 저장 영역에 접근을 제공하는 `getter`와 `setter` 합성합니다. `fileprivate(set)`, `private(set)`, `internal(set)`은 명시적으로 setter인 계산 프로퍼티와 똑같은 방법으로 합성된 `setter`의 접근 레벨을 바꾸기 위해 사용합니다.

아래 예제는 문자열 프로퍼티가 수정되는 횟수를 기록하는 구조체 TrackedString을 정의합니다.

```swift
struct TrackedString {
    private(set) var numberOfEdits = 0
    var value: String = "" {
        didSet {
            numberOfEdits += 1
        }
    }
}
```

`TrackedString`구조체는 초기 값 `""`(빈 문자열)인 문자열 저장 프로퍼티 `value`를 정의합니다. 그 구조체는 또한 `value`가 수정되는 횟수를 기록하는데 사용하는 정수 저장 프로퍼티 `numberOfEdits`를 정의합니다. 수정되는 것을 기록하는 것은 `value`프로퍼티에 대해 `value`프로퍼티가 새로운 값으로 설정될때마다 `numberOfEdits`를 증가시키는`didSet`프로퍼티 옵져버로 구현되었습니다.

`TrackedString`구조체와 `value`프로퍼티는 명시적으로 접근 레벨을 제공하지 않고, 둘다 `internal` 기본 접근 레벨을 받습니다. 하지만, 프로퍼티의 `getter`가 여전히 `internal` 기본 접근 레벨을 가리키기 위해 `numberOfEdits` 프로퍼티에 대한 접근 레벨은 `private(set)`으로 표시되지만, 그 프로퍼티는 `TrackedString` 구조체의 일부 코드에만 설정 할 수 있습니다. `TrackedString`은 내부적으로 `numberOfEdits` 프로퍼티 수정이 가능하지만, 구조체의 정의 밖에서 사용할때, 프로퍼티를 읽기 전용 프로퍼티로 표시합니다. - `TrackedString`에 대한 모든 확장을 포함합니다.

`TrackedString`인스턴스를 만들고 몇차례 문자열 값을 수정하면, `numberOfEdits` 프로퍼티 값이 수정된 회수와 일치하는 것을 볼 수 있습니다.

```swift
var stringToEdit = TrackedString()
stringToEdit.value = "This string will be tracked."
stringToEdit.value += " This edit will increment numberOfEdits."
stringToEdit.value += " So will this one."
print("The number of edits is \(stringToEdit.numberOfEdits)")
// Prints "The number of edits is 3"
```

비록 다른 소스파일에서 `numberOfEdits`프로퍼티의 현재 값을 조회할수 있지만, 다른 소스 파일에서 프로퍼티를 수정(modify) 할 수 없습니다. 이 제한은 기능적인 측면에서 편리하게 접근하는 동안에, `TrackedString` 편집을 기록하는(edit-tracking) 기능의 상세 구현을 보호합니다.

필요한 경우, `getter`와 `setter` 모두에 대한 명시적인 접근 레벨을 할당 할 수 있다는 것을 주의합니다. 아래 예제는 구조체가 명시적으로 `public` 접근 레벨로 정의된 `TrackedString`구조체의 버젼을 보여줍니다. 이 구조체의 멤버들(numberOfEdits 프로퍼티를 포함하여)은 기본적으로 `internal` 접근 레벨을 가지고 있습니다. 구조체의 `numberOfEdits` 프로퍼티를 `public`과 `private(set)` 접근 레벨 수정자를 결합하여, `getterpublic`, `setter private` 으로 만들수 있습니다.

```swift
public struct TrackedString {
    public private(set) var numberOfEdits = 0
    public var value: String = "" {
        didSet {
            numberOfEdits += 1
        }
    }
    public init() {}
}
```

---

## Initializers

사용자정의 초기화는 접근 레벨을 초기화된 타입과 같거나 낮게 할당 할 수 있습니다. ([필수 초기화(Required Initializers)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID231)에서 설명된 것 처럼) 필수 초기화만 예외입니다. 필수(required) 초기화는 반드시 초기화가 속한 클래스와 같은 접근 레벨을 가지고 있습니다.

함수와 메소드 매개변수와 마찬가지로 초기화의 매개변수의 타입은 초기화 자체의 접근 레벨보다 더 `private` 할 수 없습니다.

---

## Default Initializers

[기본 초기화(Default Initializers)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID213)에서 설명된 것처럼, Swift는 자동으로 구조체에서 아무런 인자없는 기본 초기화(default initializer)를 제공하거나 클래스에서 모든 프로퍼티에 대한 기본 값을 제공하며, 자체적으로 초기화를 제공하지 않습니다.

기본 초기화는 타입을 `public`으로 정의하지 않으면, 타입 초기화와 같은 접근 레벨을 가집니다. `public`으로 정의된 타입의 경우, 기본 초기화는 `internal`로 구성됩니다. `public`타입을 다른 모듈에서 사용할때, 인자 없는 초기화로 초기화 하려면, 타입의 정의에서 명시적으로 `public` 인자 없는 초기화를 제공해줘야 합니다.

---

## Default Memberwise Initializers for Structure Types

구조체의 저장 프로퍼티들이 `private`이면, 구초체 타입에 대한 기본 멤버단위 초기화는 `private`로 구성됩니다. 마찬가지로, 구조체의 모든 저장 프로퍼티들이 `file private`이면, 초기화는 `file private`입니다, 그렇지 않으면, 그 초기화는 `internal` 접근 레벨을 가집니다.

위의 기본 초기화 처럼, `public`구조체 타입이 다른 모듈에서 사용될때, 멤버(`memberwise`) 초기화로 초기화 하려면, 타입을 정의할때 반드시 `public 멤버(memberwise) 초기화`를 제공해야 합니다.

---

## Protocols

명시적으로 프로토콜 타입에 접근 레벨을 할당하려면, 프로토콜을 정의하는 시점에 해야합니다. 특정 접근 컨텍스트(context)에서만 적용 할 수 있는 프로토콜을 만들수 있습니다.

프로토콜 정의에서 각각 요구된 접근 레벨은 프로토콜처럼 같은 접근 레벨로 자동으로 설정됩니다. 지원하는 프로토콜과 다른 접근 레벨로 프로토콜 요구사항을 설정 할 수 없습니다. 이렇게 하면 프로토콜의 모든 요구사항들이 프로토콜을 적용한 모든 타입에서 볼 수 있습니다.

> `public` 프로토콜을 정의하는 경우, 프로토콜의 요구사항은 구현 될때 이러한 요구사항들에 대해 `public` 접근 레벨을 요구합니다. 이 동작은 `public` 타입이 정의된 곳에서 타입의 멤버들에 대해 `internal` 접근 레벨을 의미하는 다른 타입과 다릅니다.

---

## Protocol Inheritance

기존 프로토콜로부터 새로운 프로토콜 상속을 정의하면, 새로운 프로토콜은 상속된 프로토콜과 동일한 접근 레벨을 가질 수 있습니다. 예를 들어, `internal` 프로토콜로부터 상속된 `public`프로토콜을 작성 할 수 없습니다.

---

## Protocol Conformance

타입은 타입 자체보다 낮은 접근 레벨을 갖는 프로토콜을 준수(conform) 할 수 있습니다. 예를 들어, 다른 모듈에서 사용 할수 있도록 `public` 타입을 정의할 수 있지만, `internal`프로토콜은 `internal` 프로토콜이 정의된 모듈에서만 사용 할 수 있습니다.

어떤 타입이 특정 프로토콜을 준수하는 상황(`context`)에서 타입의 접근 레벨과 프로토콜의 접근 레벨을 최소화 합니다. 타입이 `public`인 경우, 준수하는 프로토콜은 `internal`이지만, 프로토콜을 준수하는 타입 또한 `internal`입니다.

프로토콜을 준수하는 타입을 작성하거나 확장할때, 타입의 각 프로토콜 요구사항의 구현은 프로토콜을 준수하는 타입과 최소한 같은 접근 레벨을 가지는 것을 보장합니다. 예를들어, `public`타입이 `internal` 프로토콜을 준수하면, 타입의 각 프로토콜 요구사항의 구현은 적어도 `internal`이 되야합니다.

> Note: Swift에서, Objective-C처럼, 프로토콜을 준수하는 것은 전역 적입니다 -같은 프로그램에서 하나의 타입에 대해 하나의 프로토콜을 다른 두가지 방법으로 준수하는 것은 불가능합니다.

---

## Extensions

클래스, 구조체, 열거형을 사용할수 있는 모든 접근 상황(context)에서, 클래스, 구조체, 열거형을 확장할 수 있습니다. 확장에 추가된 모든 타입 멤버는 원래 타입에서 선언된 타입 멤버와 같은 기본 접근 수준을 가집니다. `public`이나 `internal` 타입을 확장하는 경우, 새로 추가하는 타입의 모든 멤버는 `internal` 기본 접근 레벨을 가집니다. `file-private` 타입을 확장하는 경우, 새로 추가하는 타입의 모든 멤버는 `file private` 기본 접근 레벨을 가집니다. `private` 타입을 확장하는 경우, 새로 추가하는 타입의 모든 멤버는 `private` 기본 접근 레벨을 가집니다.

또는, 확장에서 정의된 모든 멤버에 대해 새로운 기본 접근 레벨을 설정하기 위해 명시적인 접근 레벨 수식어(예를들어 `private extension`)로 확장을 표시할 수 있습니다. 새로운 기본값은 각각 타입 멤버에 대해 확장에서 오버라이드(`overridden`) 할 수 있습니다.

확장에서 프로토콜을 준수하도록 추가하는 경우에, 확장에 대한 명시적인 접근레벨(access-level) 수정자를 제공할 수 없습니다. 대신에, 확장에서 각 프로토콜 요구사항 구현에 대한 기본 접근레벨을 제공하기 위해서 프로토콜의 자체 접근 레벨이 사용됩니다.


### Private Members in Extensions

확장되는 클래스, 구조체, 열거형과 같은 파일에 있는 확장은, 확장하는 코드가 원래 타입의 선언으로 작성된 것처럼 동작합니다. 결과적으로, 다음을 할 수 있습니다.

- 원래 선언에서 `private` 멤버를 선언하고, 같은 파일에 있는 확장에서 멤버를 접근할 수 있습니다.
- 하나의 확장에서 `private` 멤버를 선언하고, 같은 파일에 있는 또다른 확장에서 멤버를 접근할 수 있습니다.
- 확장에서 `private` 멤버를 선언하고, 같은 파일에 있는 원래 선언에 있는 멤버를 접근할 수 있습니다.


이러한 동작은 타입에 `private` 요소들이 있는지 여부에 대한 코드를 구성하는 것과 같은 방법으로 확장을 사용할 수 있는 것을 의미합니다. 예를들어, 다음과 같이 간단한 프로토톨을 사용합니다.

```swift
protocol SomeProtocol {
    func doSomething()
}
```

다음과 같이 프로토콜 적합성(conformance)을 추가하기 위해, 확장을 사용할 수 있습니다.


```swift
struct SomeStruct {
    private var privateVariable = 12
}

extension SomeStruct: SomeProtocol {
    func doSomething() {
        print(privateVariable)
    }
}
```



---

## Generics

제네릭 타입이나 제네릭 함수에 대한 접근 레벨은 제네릭 타입이나 함수의 접근 레벨과 타입 매개변수의 타입 제약의 접근 레벨로 최소화 합니다.

---

## Type Aliases

모든 타입 별칭은 접근 제어의 목적을 위해 다른 타입으로 다루도록 정의합니다. 타입 별칭은 타입의 접근 레벨보다 작거나 같은 접근 레벨을 가질 수 있습니다. 예를 들어 `private`타입 별칭은 `private`, `file-private`, `internal`, `public`, `open`타입의 별칭이 될 수 있지만, `public` 타입 별칭은 `internal`, `file-private`, `private`타입의 별칭이 될수 없습니다.

> Note: 이 규칙은 또한 프로토콜을 준수하는데 사용되는 연관 타입에 대한 타입 별칭에 적용됩니다.


---

