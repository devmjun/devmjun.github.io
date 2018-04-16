---
layout:     post
title:      "Swift. 정리하기 27"
subtitle:   "Swift Language Reference-Expressions"
date:       2018-04-15 10:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Reference 


[Expressions](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID383)<br>

---

## Expressions 

In Swift, there are four kinds of expressions: prefix expressions, binary expressions, primary expressions, and postfix expressions. Evaluating an expression returns a value, causes a side effect, or both.

Swift 에는 4종류의 식이 있습니다 : 접두사 표현식(prefix exrpessions), 이진 표현식(binary expressions), 우선 순위 표현식(primary expressions),  접미사 표현식(postfix expressions) 

Prefix and binary expressions let you apply operators to smaller expressions. Primary expressions are conceptually the simplest kind of expression, and they provide a way to access values. Postfix expressions, like prefix and binary expressions, let you build up more complex expressions using postfixes such as function calls and member access. Each kind of expression is described in detail in the sections below.

접두사 및 이진 표현식을 사용하면 더 작은 표현식에 연산자를 적용할수 있습니다. 우선순위 표현식은 개념적으로 가장 간단한 표현식 이며 값에 접근하는 방법을 제공합니다. 접두어 및 이진 표현식과 같은 postfixes 표현식을 사용하여 함수 호출 및 맴버 접근같은 복잡한 표현식을 작성할수 있습니다. 각 종류의 표현은 아래 섹션에서 자세히 설명합니다.


---

## Capture Lists

By default, a closure expression captures constants and variables from its surrounding scope with strong references to those values. You can use a capture list to explicitly control how values are captured in a closure.

기본적으로 클로저 표현식은 주변범위의 상수 및 변수를 해당 값에 대한 강력한 참조로 캡처합니다.캡처 목록을 사용하여 클로저에서 값이 캡처되는 방식을 명시적으로 제어 할수 있습니다.

A capture list is written as a comma-separated list of expressions surrounded by square brackets, before the list of parameters. If you use a capture list, you must also use the in keyword, even if you omit the parameter names, parameter types, and return type.

캡처 목록은 매개 변수 목록 앞에 대괄호로 묶은 인용구로 구분된 표현식 목록으로 저장됩니다. 캡처 목록을 사용하는 경우 매개 변수 이름, 매개 변수 타입 및 반환 타입을 생략해도 `in` 키워드를 사용해야 합니다. 



The entries in the capture list are initialized when the closure is created. For each entry in the capture list, a constant is initialized to the value of the constant or variable that has the same name in the surrounding scope. For example in the code below, a is included in the capture list but b is not, which gives them different behavior.

캡처 목록의 항목은 클로저가 만들어질때 초기화 됩니다. 캡처 목록의 각 항목에 대해 상수는 해당 범위의 동일한 이름을 갖는 상수 또는 변수의 값으로 초기화 됩니다. 예를 들어 아래 코드에서 `a`는 캡처 목록에 포함되어 있지만 `b`는 그렇지 않으므로 다른 동작을 제공합니다.

```swift
var a = 0
var b = 0
let closure = { [a] in
    print(a, b)
}
 
a = 10
b = 10
closure()
// Prints "0 10"
```

There are two different things named a, the variable in the surrounding scope and the constant in the closure’s scope, but only one variable named b. The a in the inner scope is initialized with the value of the a in the outer scope when the closure is created, but their values are not connected in any special way. This means that a change to the value of a in the outer scope does not affect the value of a in the inner scope, nor does a change to a inside the closure affect the value of a outside the closure. In contrast, there is only one variable named b—the b in the outer scope—so changes from inside or outside the closure are visible in both places.

a라는 이름에 두가지 다른 차이가 있습니다. 스코프 주변의 변수(variable) 및 클로저 스코프에 있는 상수(constant)가 있지만 b라는 이름의 하나의 변수가 있습니다.

내부 범위의 `a`는 클로저가 생성될때 외부 범위의 a값으로 초기화 되지만 값은 특별한 방법으로 연결되지 않습니다.

즉 바깥 쪽 범위에 있는 `a`값을 변경해도 내부 범위의 값에 영향을 주지 않으며 클로저 내부 값을 변경해도 클로저 외부의 값에 영향을 주지 않습니다.

반대로 바깥 범위에는 `b`라는 변수가 있고 내부나 바깥 범위로부터의 변경을 클로저는 두 위치 모두에서 볼수있습니다.


This distinction is not visible when the captured variable’s type has reference semantics. For example, there are two things named x in the code below, a variable in the outer scope and a constant in the inner scope, but they both refer to the same object because of reference semantics.

이 구별은 캡처된 변수 타입에 참조 의미가 있는 경우 표시되지 않습니다. 예를들어, 아래 코드에 x라는 이름의 두가지가 있는데, 바깥쪽 범위의 변수(variable) 와 내부범위의 상수(constant)이지만 그들은 둘다 같은 객체(object)를 참조합니다 왜냐하면 참조 의미론이기(reference semantics) 떄문입니다.

```swift
class SimpleClass {
    var value: Int = 0
}
var x = SimpleClass()
var y = SimpleClass()
let closure = { [x] in
    print(x.value, y.value)
}
 
x.value = 10
y.value = 10
closure()
// Prints "10 10"
```

If the type of the expression’s value is a class, you can mark the expression in a capture list with weak or unowned to capture a weak or unowned reference to the expression’s value.

표현식의 값 타입이 `class`라면 `weak`, `unowned` 으로 표시하여 표현식의 값에 weak, unowned 참조를 캡처할수 있습니다. 

```swift
myFunction { print(self.title) }                    // strong capture
myFunction { [weak self] in print(self!.title) }    // weak capture
myFunction { [unowned self] in print(self.title) }  // unowned capture
```

You can also bind an arbitrary expression to a named value in a capture list. The expression is evaluated when the closure is created, and the value is captured with the specified strength. For example:

또한 임의 표현식을 캡처목록의 이름이 있는 값에 바인딩할수 있습니다. 클로저가 생성되었을때 표현식이 평가되고, 지정된 효과로 캡처 됩니다. 


```swift
// Weak capture of "self.parent" as "parent"
myFunction { [weak parent = self.parent] in print(parent!.title) }
```

또한 클로저의 표현식에 더 알고 싶다면 [Clsoure Expressions](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID95)을 참조하세요. 캡처 목록에 대해서 더 알고 싶다면 [Resolving Strong Reference Cycles for Closures](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID57)

---

## wildcard Expression 

와일드 카드 표현식(wildcard expression)은 명식적으로 값을 할당하는 동안 해당 값을 무시하는데 사용됩니다. 예를들어 다음 예시에서 10이 x에 할당되고 20이 무시됩니다.

```swift
(x, _) = (10, 20)
// x is 10, and 20 is ignored
```

---

## Initializer Expression

초기화 표현식(Initializer Expression)은 타입의 초기화 접근을 제공합니다. 

```swift
expression.init(initializer arguments)
```

함수 호출 표현식에서 초기화 표현식을 사용하여 타입의 새 인스턴스를 초기화 합니다. 또한 초기화 표현식을 사용하여 슈퍼 클래스의 초기화 프로그램에 위임합니다.

```swift
class SomeSubClass: SomeSuperClass {
    override init() {
        // subclass initialization goes here
        super.init()
    }
}
```

함수와 마찬가지로 초기화값으로 사용할수 있습니다.

```swift
// Type annotation is required because String has multiple initializers.
let initializer: (Int) -> String = String.init
let oneTwoThree = [1, 2, 3].map(initializer).reduce("", +)
print(oneTwoThree)
// Prints "123"
```

이름으로서 타입을 지정하면 초기화 표현식의 사용없이 타입의 초기화에 접근할수 있습니다. 모든 다른 케이스에 초기화 표현식(initializer expression)을 사용할수 있습니다.

```swift
let s1 = SomeType.init(data: 3)  // Valid
let s2 = SomeType(data: 1)       // Also valid
 
let s3 = type(of: someValue).init(data: 7)  // Valid
let s4 = type(of: someValue)(data: 5)       // Error
```

---










