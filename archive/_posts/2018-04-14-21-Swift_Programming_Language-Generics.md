---
layout:     post
title:      "Swift. 정리하기 21: Swift Language Guide-Generics"
subtitle:   "Swift Language Guide-Generics *"
date:       2018-04-14 09:00:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/Github-bg.jpg
thumbnail-img: /assets/post_img/background/Github-bg.jpg
share-img: /assets/post_img/background/Github-bg.jpg
toc: true
---

최종 수정일: 2018.10.1

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Generics](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID179)<br>
[까칠코더님 블로그](http://kka7.tistory.com/128?category=919617)

---

## Generics

`제네릭 코드(Generic code)`는 정의한 요구사항에 따라 모든 타입에서 작업 할수 있는 유연하고 재사용 가능한 함수나 타입을 작성할 수 있습니다. 중복을 피하고 의도가 명확하게 표현하는 코드를 작성할 수 있으며 추상적으로 관리합니다.

제네릭은 Swift에서 가장 강력한 기능중 하나이고, Swift의 표준 라이브러리 대부분이 제네릭 코드로 만들어졌다. 사실상, 모른다고 하더라도, 언어 가이드(Language Guide) 전체에서 제네릭을 사용해 왔습니다. 예를들어, Swift의 `Array`와 `Dictionary`타입 모두 제네릭 컬렉션입니다. Swift에서 Int값이나 `String`값을 가지는 배열을 만들수 있거나 실제 Swift에서 만들수 있는 다른 타입을 가지는 배열을 만들수 있습니다. 비슷하게, 모든 특정 타입의 값을 저장하는 딕셔너리를 만들 수 있고, 타입이 무엇인지에 대한 제한은 없습니다.

---

## The Problem That Generics Solve 

여기에 표준적인, `제네릭이 아닌(non-generic)` 두개의 Int값을 바꿔주는 함수 `swapTwoInts(_:_:)`가 있습니다.

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

In-Out 매개변수에서 설명된것 처럼, 이 함수는 a와 b의 값을 바꿔주기 위해, in-out 매개변수를 사용합니다.

`swapTwoInts(_:_:)`함수는 b의 원래 값을 a로, 그리고 a의 원래 값을 b로 바꿔줍니다. 두개의 Int값들을 바꿔주기 위해 이 함수를 호출 할 수 있습니다.

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// Prints "someInt is now 107, and anotherInt is now 3"
```

`swapTwoInts(_:_:)`함수는 유용하지만, Int값만 사용 할수 있습니다. 두개의 `String` 값이나 `Double` 값들을 바꾸기를 원한다면, 아래 보이는 것처럼, `swapTwoStrings(_:_:)`이나 `swapTwoDoubles(_:_:)`함수 두개를 더 작성해야 합니다.

```swift
func swapTwoStrings(_ a: inout String, _ b: inout String) {
    let temporaryA = a
    a = b
    b = temporaryA
}
 
func swapTwoDoubles(_ a: inout Double, _ b: inout Double) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

`swapTwoInts(_:_:)`, `swapTwoStrings(_:_:)`, `swapTwoDoubles(_:_:)` 함수의 본문이 동일 하다는 것을 눈치 챘을지 모른다. 유일하게 다른 것은 그것들이 가진 값의 타입(`Int, String, Double`)입니다.

모든 타입의 값 두개를 바꿔줄수 있는 하나의 함수로 작성하는게 훨씬 더 유용하고, 매우 유연합니다. 제네릭 코드는 하나의 함수로 작성하는게 가능합니다. (이 함수의 제네릭 버젼은 아래에 정의됩니다)

> Note: 함수 3개 모두, `a`와 `b`타입이 서로 같도록 정의 하는게 중요합니다. `a` 와 `b`가 같은 타입이 아니라면, 그 값들을 바꿔주는 것은 가능하지 않을 것입니다. Swift는 타입에 안전한(`type-safe`) 언어이고 `String`타입의 변수와 `Double`타입의 변수를 각각 서로 다른 값으로 바꿔주는 것을 허용하지 않습니다. 이를 시도하려 하면 컴파일시에 오류가 발생합니다.

---

## Generic Functions 

제네릭 함수(`Generic functions`)는 모든 타입에서 동작 할수 있습니다. 여기에 위의 `swapTwoInts(_:_)`함수의 제네릭 버젼 `swapTwoValues(_:_:)`이 있습니다.

```swift
func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

`swapTwoValues(_:_:)`함수의 본문은 `swapTwoInts(_:_:)`함수의 본문과 동일합니다. 하지만, `swapTwoValues(_:_:)`의 첫번째 줄이 `swapTwoInts(_:_:)`와 약간 다릅니다. 다음은 첫번째 줄이 어떻게 다른지 비교해 봅니다.

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int)
func swapTwoValues<T>(_ a: inout T, _ b: inout T)
```

이 함수의 제네릭 버전은 실제(`actual`) 타입의 이름`(Int, String, Double)` 대신에 `견본(placeholder)` 타입의 이름(`T`)을 사용합니다. 견본타입의 이름은 반드시 T가 아니어도 되지만, T가 무엇이던간에, a와 b 둘 다 반드시 같은 타입 T이어야 하는 것을 말합니다. 실제 타입은`swapTwoValues(_:_:)`함수가 호출될때마다 T의 위치에 사용하여 결정될 것입니다.

제네릭 함수와 제네릭이 아닌 함수간의 다른 차이점은 제네릭 함수의 이름(`swapTwoValues(_:_:)`) 뒤에 꺽쇠 괄호(`<T>`)에 안에 견본 타입 이름(`T`)를 넣는 것입니다. Swift에서 이러한 꺽쇠 괄호(`<>`)는 `swapTwoValues(_:_:)`함수와 함께 `T`가 견본 타입이름으로 정의 되었다는 것을 말합니다. T는 견본이기 때문에, `Swift는 T의 실제 타입을 찾지 않습니다.`

> 개인 Note: 함수의 제네릭 타입은 Run-time에 결정된다는 의미!

`swapTwoValues(_:_:)`함수는 이제 모든 타입의 값 두개를 전달할수 있는 것만 제외하고, swapTwoInts와 같은 방법으로 호출할수 있으며, 이 값들 모두 서로 같은 타입이 됩니다. `swapTwoValues(_:_:)`이 호출될때마다, T에 사용할 타입은 함수에 전달된 값의 `타입으로 추론`됩니다.

아래 두개의 예제에서, T는 각각 `Int`와 `String`으로 추론됩니다.

```swift
var someInt = 3
var anotherInt = 107
swapTwoValues(&someInt, &anotherInt)
// someInt is now 107, and anotherInt is now 3
 
var someString = "hello"
var anotherString = "world"
swapTwoValues(&someString, &anotherString)
// someString is now "world", and anotherString is now "hello"
```

> Note: 위의 `swapTwoValues(_:_:)`함수는 Swift 표준라이브러리이고 앱에서 자동으로 사용할수 있는 제네릭 함수 swap로 부터 영감을 받아 정의되었습니다. 코드에서 `swapTwoValues(_:_)`함수의 동작이 필요하다면, 직접 구현을 제공하는 것보다 Swift의 기존 `swap(::)`함수를 사용하는게 낫습니다.

---

## Type Parameters 

위의 `swapTwoValues(_:_:)` 예제에서, 견본 타입 T는 타입 매개변수(`type parameter`)의 예이다. 타입 매개변수는 견본 타입과 이름을 지정하고, 함수의 이름 바로 뒤 꺽인 괄호 한쌍의 사이에(<`T`>처럼)작성합니다.

한번 타입 매개변수를 지정하면, 함수의 매개변수의 타입`(swapTwoValues(_:_:)`의 a와 b 매개변수 처럼)이나 함수의 반환 타입을 정의하는데 사용할 수 있거나, 함수의 본문에서 해석 할 수 있습니다. 각각의 경우, 타입 매개변수는 함수가 `호출될때마다 실제 타입으로 바뀝니다.` (위의`swapTwoValues(_:_:)`예제에서, `T`는 함수를 처음 호출할때 Int로 바뀌고, 두번째 호출할때 String으로 바뀌었습니다)

하나 이상의 타입 매개변수를 꺽인괄호(`<>`)안에 여러개의 타입 매개변수 이름을 콤마(`,`)로 구분하도록 작성하여 제공 할 수 있습니다.

---

## Naming Type Parameters 

대부분의 경우, 타입 매개변수은 `Dictionary<Key, Value>`에서 Key와 Value처럼 그리고 `Array<Element>`에서 Element처럼 사용된 타입 매개변수와 제네릭 타입이나 함수와 관련된 설명이 포함된 이름을 가지고 있습니다. 하지만, 그것들 사이에 관계된 의미가 없을때, 위의 `swapTwoValues(_:_:)`함수에서 T처럼, 전통적으로 `T, U, V`처럼 하나의 단어로 사용합니다.

> Note: 타입 매개변수는 값이 아니라 타입에 대한 견본을 나타내기 위해, 항상 대문자 카멜 표기 이름(T와 MyTypeParameter)으로 입력합니다.

---

## Generic Types 


제네릭 함수 외에도, Swift는 `제네릭 타입(generic types)` 정의가 가능합니다. Array와 Dictionary와 비슷한 방법으로, `사용자 정의 클래스, 구조체, 열거형은 모든 타입`과 함께 작업 할 수 있습니다.

이번 섹션(section)에서 제네릭 컬렉션 타입 `Stack`을 작성하는 방법을 보여줍니다. 스택(stack)은 정렬된 값의 set이며, 배열과 비슷하지만, set의 기능은 Swift의 `Array`타입보다 더 제한됩니다. 배열은 새로운 항목을 배열내의 어느곳이던지 추가하고 삭제가 허용됩니다. 하지만, 스택은 새로운 항목을 컬렉션의 맨 뒤에 추가하는 것만 허용됩니다(스택에 새 값을 밀어넣기(pushing)하는 것 처럼). 비슷하게, 스택은 컬렉션의 맨 뒤의 항목만을 제거 할수 있습니다.(스택에서 값을 빼내기(popping)하는 것 처럼)

> Note: 스택의 컨셉은 네비게이션 계층구조에서 뷰 컨트롤러를 모델링하는 `UINavigationController`클래스에서 사용됩니다. `UINavigationController`클래스는 네비게이션 스택에 뷰 컨트롤러를 추가(또는 밀어넣기) 하기 위해`pushViewController(_:animated:)`메소드를 호출하고, 네비게이션 스택으로부터 뷰컨트롤로를 제거(또는 빼내기)하기 위해 `popViewControllerAnimated(_:)`메소드를 호출 합니다. 스택은 후입, 선출 방식을 관리할때, 유용한 컬렉션 모델입니다.

아래 그림은 스택의 push / pop의 동작을 보여줍니다. <br>

<center><img src="/assets/post_img/posts/Swift_Programming_Language-16.png" width="700"></center> <br> 

1. 스택에 3개의 값이 있습니다.
2. 4번째 값을 스택의 맨위에 Push 됩니다.
3. 스택은 현재 4개의 값을 가지고 있으며, 상단에 가장 최근의 것을 가지고 있습니다.
4. 스택의 맨위의 아이템이 Pop 됩니다.
5. 하나의 값을 빼낸뒤, 스택에는 다시 3개의 값만 가지고 있습니다

다음은 Int값의 스택의 경우, 제네릭이 아닌 스택 버젼을 작성하는 방법을 보여줍니다

```swift
struct IntStack {
    var items = [Int]()
    mutating func push(_ item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }
}
```

이 구조체는 스택안에 값을 저장하기 위해 `Array` 프로퍼티 items를 사용합니다. Stack는 스택에 on/off 값을 넣거나 빼기 위해 `push`와 `pop` 두개의 모델을 제공합니다. 이 메소드들은 구조체의 items배열을 수정(modify or mutate)하기 위해, mutating으로 표시됩니다.

위에서 `IntStack`타입은 `Int`값만 사용하는 것을 볼 수 있습니다. 하지만, 제네릭 `Stack`클래스를 정의 하는 것이 좀 더 유용하며, 모든 타입의 값에 대한 스택을 관리 할 수 있습니다.

다음은 같은 코드의 제네릭 버젼입니다.

```swift
struct Stack<Element> {
    var items = [Element]()
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        return items.removeLast()
    }
}
```

`Stack`의 제네릭 버전은 제네릭이 아닌 버젼과 본질적으로 동일하지만, 실제 `Int`타입 대신에 `Element` 타입 매개변수를 사용한다는 것을 주의합니다. 이 타입 매개변수는 구조체의 이름 바로 뒤에 한쌍의 꺽인 괄호(`<Element>`)안에 작성됩니다.

`Element`는 나중에 제공될 타입에 대한 견본 이름으로 정의합니다. 이 미래(future) 타입은 구조체의 정의 언디든지 `Element`라고 참조 할 수 있습니다. 이 경우에, `Element`는 3 군데에서 견본으로 사용됩니다.

- `Element`타입 값의 빈 배열로 초기화된 items프로퍼티 생성하기 위해
- `Element`타입 이어야 하는 `item`매개변수를 가지는 `push(_:)`메소드 지정하기 위해
- pop메소드에 의해 반환된 값이 Element타입의 값이 되도록 지정하기 위해

`Stack`이 제네릭 타입이기 때문에, Swift에서 허용한 모든 타입의 스택을 만드는데 사용 할 수 있으며, `Array`와 `Dictionary`와 비슷하게 관리합니다.

새로운 `Stack`인스턴스는 스택에 저장할 타입을 꺽인 괄호(`<>`) 안에 작성하여 만듭니다. 예를 들어, 문자열의 새로운 스택을 만들기 위해, `Stack<String>()`을 작성합니다.

```swift
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")
stackOfStrings.push("cuatro")
// the stack now contains 4 strings
```

다음은 `stackOfStrings` 스택에 4개의 값을 집어 넣는 방법을 보여줍니다.

<center><img src="/assets/post_img/posts/Swift_Programming_Language-17.png" width="700"></center> <br> 

스택으로에서 값 하나를 꺼내면 맨 위의 값 "cuatro"이 제거되고 반환합니다.

```swift
let fromTheTop = stackOfStrings.pop()
// fromTheTop is equal to "cuatro", and the stack now contains 3 strings
```

다음은 맨위의 값을 꺼낸 뒤의 스택을 보여줍니다.

<center><img src="/assets/post_img/posts/Swift_Programming_Language-18.png" width="500"></center> <br> 

---

## Extending Generic Type

제네릭 타입을 확장할때, 확장의 정의에서 타입 매개변수 목록을 제공하지 않습니다. 대신, `원본(original)` 타입으로부터 정의된 타입 매개변수 목록은 확장의 본문에서 사용 할 수 있고, 원본 타입 매개변수 이름은 원래 정의에서 타입 매개변수를 참조하는데 사용됩니다.

다음 예제는 제네릭 `Stack`타입을 확장하여, 스택으로부터 `빼내는(popping)것` 없이, 스택의 맨위의 항목을 반환하는 읽기전용 계산 프로퍼티 `topItem`을 추가 해봅니다.

```swift
extension Stack {
    var topItem: Element? {
        return items.isEmpty ? nil : items[items.count - 1]
    }
}
```

`topItem`프로퍼티는 `Element`타입의 옵셔널 타입 값을 반합니다. 스택이 비어있으면, `topItem`은 `nil`을 반환하며, 스택이 비어 있지 않으면, `topItem`은 `items`배열의 마지막 항목을 반환합니다.

`이 확장에서 타입 매개변수 목록을 정의` 하지 않았다는 것을 주의합니다. 대신, Stack타입의 기존 타입 매개변수 이름, Element는 확장에서 topItem계산 프로퍼티의 옵셔널 타입을 나타내기 위해 사용됩니다.

topItem계산 프로퍼티는 모든 Stack인스턴스에서 이제 맨위의 항목을 제거하지 않고 접근하고 조회하는데 사용 할 수 있습니다.

```swift
if let topItem = stackOfStrings.topItem {
    print("The top item on the stack is \(topItem).")
}
// Prints "The top item on the stack is tres."
```

제네릭 타입의 확장은 새로운 기능을 얻기 위해 확장된 타입의 인스턴스가 만족해야 하는 요구사항도 포함할 수 있으며, [제네릭 Where 절로 확장하기(Extensions with Generic Where Clause)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID553)에서 논의됩니다.

---

## Type Constraints

`swapTwoValues(_:_:)`함수와 `Stack`타입은 모든 타입에서 동작 할 수 있습니다. 하지만, 제네릭 함수와 제네릭 타입으로 사용할 수 있는 타입에 확실하게 제약 조건을 적용하는게 유용할때가 있습니다. 타입 제약 지정은 타입 매개변수가 특정 클래스로부터 상속해야 하거나, 특정 프로토콜이나 프로토콜 구성을 준수해야 합니다.

예를 들어, Swift의 `Dictionary`타입은 딕셔너리의 키로 사용 할 수 있는 타입에 제한을 둡니다. `Dictionaries`에서 설명된 것처럼, 딕셔너리의 키 타입은 반드시 `hashable`해야 합니다. 이것은, 스스로 고유하게 표현 할수 있는 방법을 제공해야 합니다. `Dictionary`는 키가 `hashable`해야하며, 특정 키에 대한 값을 이미 가지고 있는지 확인 할 수 있습니다. 이러한 요구사항 없이는, `Dictionary`는 특정 키에 대한 값을 추가하거나 변경하는 것을 알 수 없으며, 딕셔너리에 있는 주어진 키에 대한 값을 찾을 수도 없습니다.

이 요구사항은 키 타입이 `Hashable`프로토콜을 준수해야 하며, Swift 표준 라이브러리 에서 특수 프로토콜로 정의된, `Dictionary`키 타입에서 타입 제약(`type constraint`)에 의해 강제됩니다. Swift의 모든 기본 타입(String, Int, Double, Bool)은 기본적으로 hashable 입니다.

사용자정의 제네릭 타입을 만들때 고유한 타입 제약 조건을 정의 할수 있고, 이러한 제약은 제네릭 프로그램의 많은 장점을 제공합니다. `Hashable`특징의 타입은 명시적인 타입보다 개념적인 특징의 관점에서 추상화 컨셉이 비슷합니다.

---

## Type Constraints Syntax

타입 매개변수 목록의 일부로써 타입 매개변수의 이름 뒤에 단일 클래스나 프로토콜 제약조건을 위치하여 타입 제약조건을 작성하며, 콜론(`:`)으로 구분합니다. 제네릭 함수에서 타입 제약조건에 대한 기본 문법은 아래에서 볼수 있습니다(제네릭 타입에 대한 문법과 같습니다):

```swift
func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
    // function body goes here
}
```

위의 가상의 함수는 두개의 타입 매개변수가 있습니다. 첫번째 매개변수 `T`는 T가 `SomeClass`의 서브클래스가 될 필요가 있는 타입 제약이 있습니다. 두번째 매개변수 `U`는 U가 `SomeProtol` 프로토콜을 준수해야하는 타입 제약이 있습니다.

---

## Type Constraints in Action 

`String` 배열 값에서 찾기 위해 `String`값을 주는 제네릭이 아닌 함수 `findIndex(ofString:in:)`이 있습니다. `findIndex(ofString:in:)`함수는 배열에서 첫번째로 일치하는 문자열의 인덱스가 발견하면 옵셔널 Int값을 반환하거나, 문자열을 찾지 못했을 경우 nil을 반환합니다.

```swift
func findIndex(ofString valueToFind: String, in array: [String]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

`findIndex(ofString:in:)`함수는 문자열 배열에서 문자열 값을 찾기 위해 사용 할 수 있습니다.

```swift
let strings = ["cat", "dog", "llama", "parakeet", "terrapin"]
if let foundIndex = findIndex(ofString: "llama", in: strings) {
    print("The index of llama is \(foundIndex)")
}
// Prints "The index of llama is 2"
```

배열에서 인덱스의 값을 찾는 원리는 문자열에서만 유용하지 않습니다. 하지만, 언급된 모든 문자열을 T 타입의 값으로 대체하여 제네릭 함수와 같은 기능을 작성할 수 있습니다.

다음은 `findIndex(ofString:in:)`의 제네릭 버젼인 `findIndex(of:in:)`을 작성하는 방법입니다. 이 함수는 배열의 옵셔널 값이 아니라, 옵셔널 인덱스 숫자를 반환하기 때문에, 함수의 반환 타입이 여전히 `Int?`인 것을 주의합니다. 이 함수가 컴파일 되지 않는다는 경고를 받으며, 그 이유는 예제 뒤에 설명됩니다.

```swift
func findIndex<T>(of valueToFind: T, in array:[T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

위에서 작성한 이 함수는 컴파일 되지 않습니다. `if value == valueToFind` 동일하는지 확인하는 부분이 문제 입니다. `Swfit의 모든 타입이 동등 연산자로 (==) 비교 할 수 있는 것은 아닙니다.` 복잡한 데이터 모델을 표현하기 위해, 사용자 정의 클래스나 구조체를 만드는 경우, 예를 들어, 클래스 또는 구조체에 대해 동등하다라는 의미는 Swift가 추 측 할수 있는 것이 아닙니다. 이렇기 때문에, T타입이 모든 코드에서 동작한다는 것을 보증하는 것이 불가능하고, 코드를 컴파일 할때 적절한 오류를 보여줍니다.

하지만, 희망이 없는 것은 아닙니다. Swift 표준 라이브러리는 타입의 어떤 값 두개 동등 연산자(`==`)와 비동등 연산자(`!=`)에 대한 구현을 요구하는 `Equatable` 프로토콜을 정의합니다. Swift의 모든 표준 타입은 자동으로 Equatable 프로토콜을 지원합니다.

모든 타입이 동등 연산자에에 대한 지원을 보장하기 때문에, `Equatable`인 모든 타입은 `findIndex(of:in:)`함수를 안전하게 사용할 수 있습니다. 이 사실을 표현하기 위해, 함수를 정의 할때 타입 매개변수의 정의에서 Equatable의 타입 제약을 작성합니다.

```swift
func findIndex<T: Equatable>(of valueToFind: T, in array:[T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

`findIndex(of:in:)`에 대한 단일 타입 매개변수는 `Equatable`프로콜을 지원하는 모든 타입 T를 의미하는 `T: Equatable`로 작성합니다.

`findIndex(of:in:)`함수는 이제 성공적으로 컴파일 하고 Double나 String처럼, Equatable인 모든 타입에서 사용할 수 있습니다.

```swift
let doubleIndex = findIndex(of: 9.3, in: [3.14159, 0.1, 0.25])
// doubleIndex is an optional Int with no value, because 9.3 is not in the array
let stringIndex = findIndex(of: "Andrea", in: ["Mike", "Malcolm", "Andrea"])
// stringIndex is an optional Int containing a value of 2
```

---

## Associated Types 

프로토콜을 정의할때, 가끔씩 프로토콜의 선언에서 하나 이상의 연관된 타입을 선언하는게 유용합니다. `연관된 타입(associated type)`은 프로토콜에서 사용되는 타입의 견본(placeholder) 이름을 줍니다. `연관된 타입에 사용할 실제 타입은 프로토콜이 적용될때가지 지정되지 않습니다.` 연관된 타입은 `associatedtype`키워드로 지정됩니다.

---

## 연관 타입 동작(Associated Types in Action)

다음은 Item을 연관 타입(associated type)으로 선언하는 `Container` 프로토콜 예제이다.

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```

`Container`프로토콜을 모든 컨테이너(container)가 반드시 제공해야하는 3가지 필수조건을 정의합니다.

- append(_:)메소드를 사용하여 컨테이너에 새로운 항목을 추가할수 있어야 합니다.
- Int값을 반환하는 count 프로퍼티를 이용하여 컨테이너 내의 항목의 갯수를 접근할 수 있어야 합니다.
- 서브스크립트로 Int인덱스 값을 주어 컨테이너의 각 항목을 가져올 수 있어야 합니다.

이 프로토콜은 컨테이너의 항목을 저장하는 방법이나 허용되는 타입을 지정하지 않습니다. 그 프로토콜은 오직 `Container`로 간주하기 위해 모든 타입이 반드시 제공해야하는 3가지 기능을 지정합니다. 이러한 3가지 요구사항을 만족하는 한, 이를 준수하는 타입은 추가적인 기능을 제공 할 수 있습니다.

`Container` 프로토콜을 준수하는 모든 타입은 저장하는 값의 타입을 지정 할 수 있어야 합니다. 특히, 컨테이너에 올바른 타입의 항목만 추가되는것을 보증하고, 서브스크립트에 의해 반환된 항목의 타입이 명확해야 합니다.

이러한 요구사항을 정의하기 위해, `Container`프로토콜은 컨테이너가 가지고 있는 요소(`element`)의 타입을 참조하는 방법이 필요합니다. `Container`프로토콜은 append(_:)메소드에 컨테이너의 요소 타입과 동일한 타입의 모든 값이 전달되도록 지정하는게 필요하고, 그 컨테이너의 서브스크립트를 이용해 반환되는 값은 컨테이너의 요소와 동일한 타입이어야 합니다.

이를 위해서, `Container`프로토콜은 연관된 타입 `Item`을 선언하며, `associatedtype Item`을 작성합니다. 그 프로토콜은 `Item`이 무엇인지 정의하지 않습니다 - 그 정보는 준수하는 모든 타입이 제공하도록 남겨둡니다. 그럼에도불구하고, `Item` 별칭은 `Container`에 있는 항목의 타입을 참조하는 방법을 제공하고, `append(_:)` 메소드와 서브스크립트로 사용할 타입을 정의하며, 모든 `Container`의 예상되는 동작이 보장하는 것이 강제됩니다.

다음은 이전 `IntStack`타입의 제네릭이 아닌 버전이며, Container프로콜을 적용하고 준수합니다.

```swift
struct IntStack: Container {
    // original IntStack implementation
    var items = [Int]()
    mutating func push(_ item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }
    // conformance to the Container protocol
    typealias Item = Int
    mutating func append(_ item: Int) {
        self.push(item)
    }
    var count: Int {
        return items.count
    }
    subscript(i: Int) -> Int {
        return items[i]
    }
}
```

`IntStack`타입은 `Container`프로토콜의 3가지 요구사항 모두 구현하고, 각각의 경우에 이러한 요구사항을 만족하기 위해 `IntStack` 타입의 기존 기능 중 일부를 래핑(wraps)합니다.

게다가, `IntStack`은 `Container`의 구현에 대해 지정합니다. 적절한 Item이 사용할 적절한 타입은 Int입다. `typealias Item = Int`의 정의는 `Container`프로토콜의 구현을 위해 Item의 추상 타입을 Int타입으로 변환합니다.

Swift의 타입 추론 덕분에, 실제로 IntStack 정의의 일부에 구체적으로 Item을 Int로 선언하는 것을 구현할 필요가 없습니다. IntStack는 Container 프로토콜의 모든 요구사항을 준수하기 때문에, Swift는 append(_:)메소드의 Item 매개변수의 타입과 서브스크립트의 반환 타입을 보고, Item이 사용할 적절한 타입을 추론합니다. 실제로, 위의 코드에서 typealias Item = Int 줄을 삭제한 경우, Item에 대해 어떤 타입을 사용해야 하는지 분명하기 때문에, 여전히 잘 동작합니다.

또한, `Container`프로토콜을 준수하는 제네릭 `Stack`타입을 만들수 있습니다.

```swift
struct Stack<Element>: Container {
    // original Stack<Element> implementation
    var items = [Element]()
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        return items.removeLast()
    }
    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        return items.count
    }
    subscript(i: Int) -> Element {
        return items[i]
    }
}
```

이번에는, 타입 매개변수 `Element`가 `append(_:)` 메소드의 `item`매개변수와 서브스크립트의 반환타입에 사용됩니다. 그러므로 `Swift`는 `Element`를 특정 컨테이너에 대한 Item으로 사용하는 적절한 타입으로 추론할 수 있습니다.

---

## 연관된 타입을 지정하기 위해 기존 타입을 확장하기(Extending an Existing Type to Specify an Associated Type)

[확장에서 프로토콜 준수하도록 추가하기(Adding Protocol Conformance with an Extension)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID277)에서 설명한것 처럼, 프로토콜을 준수하는 것을 추가하기 위해 기존 타입을 확장할 수 있습니다. 여기에는 연관 타입의 프로토콜도 포함됩니다.

Swift의 Array타입은 요소(element)를 가져오기 위해 이미`append(_:)메소드, count프로퍼티,Int인덱스의 서브스크립트를 제공합니다.` 이 3가지 기능은 Container프로토콜의 요구사항과 일치합니다. 이것은 Container프로토콜을 Array가 채택했다는 간단한 선언으로 Array를 확장 할 수 있다는 것을 의미합니다. [확장으로 프로토콜 적용 선언하기(Declaring Protocol Adoption with an Extension)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID278)에서 설명된 것 처럼, 빈 확장으로 처리합니다.

```swift
extension Array: Container {}
```

위의 제네릭 Stack타입과 마찬가지로, 배열에 존재하는 `append(_:)`메소드와 서브스크립트는 Swift가 Item에 사용할 적절한 타입으로 추론을 가능하게 해줍니다. 이 확장을 정의한 후에, 모든 Array는 Container처럼 사용 할 수 있습니다.

---

## Adding Constraints to an Assoiated Type 

프로토콜에서 연관된 타입에 타입 제약사항을 추가해서 타입이 해당 제약사항을 만족하도록 요구할 수 있습니다. 예를 들어, 다음 코드는 컨테이너에서 항목들을 `eauatable`하게 해야하는 `Container` 버젼을 정의합니다.

```swift
protocol Container {
    associatedtype Item: Equatable
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```

`Container`버전을 준수하려면 컨테이너의 아이템 타입은 `Equatable`프로토콜을 준수해야합니다.

---

## Using a Protocol in Its Associated Types`s Constraints  

프로토콜은 자신의 제약조건의 부분으로 나타낼수 있습니다. 예를들어 `suffix(_:)` 메소드의 요구 사항을 추가하여 컨테이너 프로토콜을 구현하는 프로토콜입니다. `suffix(_:)` 메서드는 컨테이너 끝에 있는 지정된 수의 요소를 반환하여 `Suffix` 타입의 인스턴스에 저장합니다. 

```swift
protocol SuffixableContainer: Container {
    associatedtype Suffix: SuffixableContainer where Suffix.Item == Item
    func suffix(_ size: Int) -> Suffix
}
```

프로토콜에서, `Suffix`는 연관된 타입이며, 위 예제 `Container`에서의 `Item`타입과 같습니다. `Suffix`는 두개의 제약사항을 가집니다: `SuffixableContainer`프로토콜(현재 정의된 프로토콜)을 반드시 준수해야 하고, `Item`타입은 컨테이너의 `Item`타입과 반드시 같아야 합니다. `Item`에서의 제약사항은 제네릭 `where`절이며, 아래의 [제네릭 Where 절과 연관된 타입(Associated Types with a Generic Where Clause)](https://docs.swift.org/swift-book/LanguageGuide/Generics.html#ID557)에 설명되어 있습니다.

다음은 위의 `SuffixableContainer`프로토콜에 대한 적합성을 추가하는 [클로져에 대한 강한 순환참조(Strong Reference Cycles for Closures)](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html#ID56)의 Stack타입의 확장입니다.


```swift
extension Stack: SuffixableContainer {
    func suffix(_ size: Int) -> Stack {
        var result = Stack()
        for index in (count-size)..<count {
            result.append(self[index])
        }
        return result
    }
    // Inferred that Suffix is Stack.
}
var stackOfInts = Stack<Int>()
stackOfInts.append(10)
stackOfInts.append(20)
stackOfInts.append(30)
let suffix = stackOfInts.suffix(2)
// suffix contains 20 and 30
```

위 예제에서, `Stack`에 대한 연관된 타입 `Suffix`은 `Stack`이며, `Stack`에서 `suffix`동작은 다른 `Stack`를 반환합니다. 또는 `SuffixableContainer`를 준수하는 타입은 그 자체와 다른 `Suffix`타입을 가질수 있습니다.- 접미사(suffix) 작업은 다른 타입을 반환할 수 있다는 것을 의미합니다. 예를들어, 다음은 제네릭이 아닌 `IntStack`타입에 `SuffixableConatiner`를 준수하도록 추가하는 확장이며, `IntStack` 대신에 `suffix`타입으로 `Stack<Int>`를 사용합니다.


```swift
extension IntStack: SuffixableContainer {
    func suffix(_ size: Int) -> Stack<Int> {
        var result = Stack<Int>()
        for index in (count-size)..<count {
            result.append(self[index])
        }
        return result
    }
    // Inferred that Suffix is Stack<Int>.
}
```

---

## Generic Where Clauses

[타입 제약(Type Constraints)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID186)에 설명된것 처럼, 타입 제약(Type constraints)은, 제네릭 함수나 타입과 연관된 타입 매개변수에 대한 요구사항을 정의 할 수 있습니다.

또한, 연관된 타입에 대한 요구사항을 정의하는 것이 유용 할 수 있습니다. `제네릭 where 절(generic where clause)`을 정의합니다. 제네릭 `where`절(generic where clause)은 연관된 타입이 특정 프로토콜을 반드시 준수해야 하는것을 요구하거나, 특정 타입 매개변수와 연관된 타입이 반드시 같아야 하는 것을 요구 할 수 있습니다. 제네릭 `where`절은 `where`키워드로 시작하며, 연관된 타입 또는 타입과 연관된 타입간의 동등한 관계에 대한 제약조건이 뒤따릅니다. 타입이나 함수의 열린 중괄호(`{}`) 또는 함수의 본문 바로 앞에 제네릭 `where`절을 작성합니다.

아래 예제에서 두개의 `Container`인스턴스가 같은 순서로 같은 항목을 가지고 있는지 확인하는 제네릭 함수 `allItemsMatch`를 정의하였습니다. 이 함수는 모든 항목이 같으면 `Boolean`값 `true`를 반환하고, 그렇지 않으면 `false` 를 반환합니다.

검사할 두개의 컨테이너들이 같은 타입일 필요가 없지만(같을수도 있음), 가지고 있는 항목의 타입은 같아야 합니다. 이러한 요구사항은 타입 제약과 제네릭 `where`절의 조합으로 표현됩니다.

```swift
func allItemsMatch<C1: Container, C2: Container>
    (_ someContainer: C1, _ anotherContainer: C2) -> Bool
    where C1.Item == C2.Item, C1.Item: Equatable {
        
        // Check that both containers contain the same number of items.
        if someContainer.count != anotherContainer.count {
            return false
        }
        
        // Check each pair of items to see if they are equivalent.
        for i in 0..<someContainer.count {
            if someContainer[i] != anotherContainer[i] {
                return false
            }
        }
        
        // All items match, so return true.
        return true
}
```

이 함수는 두개의 인자 `someContainer`와 `anotherContainer`를 받는다. someContainer인자는 C1타입이고, anotherContainer인자는 C2타입입니다. C1과 C2 둘다 함수가 호출될때 결정되는 두개의 컨테이너 타입에 대한 타입 매개변수 입니다.

다음 요구사항들은 함수의 두 타입 매개변수에 해당합니다.

- `C1`은 반드시 `Container`프로토콜을 준수해야 합니다(C1: Container으로 작성)
- `C2` 또한, 반드시 `Container`프로토콜을 준수해야 합니다.(C2: Container으로 작성)
- `C1`에 대한 `Item`은 반드시 `C2`에 대한 `Item`과 같아야 합니다(C1.Item == C2.Item으로 작성)
- `C1`에 대한 `Item`은 반드시 `Equatable`프로토콜을 준수해야 합니다.(C1.Item: Equatable)

첫번째와 두번째 요구사항은 함수의 타입 매개변수 목록으로 정의되고, 세번째와 네번재 요구사항은 함수의 제네릭 `where`절에서 정의됩니다.

이러한 요구사항들이 의미하는 것:

- `someContainer`는 C1타입의 컨테이너 입니다.
- `anotherContainer`는 C2타입의 컨테이너 입니다.
- `someContainer`와 `anotherContainer`은 같은 타입의 항목들을 포함합니다.
- `someContainer`의 항목들이 서로 다른 경우, `!=`연산자로 같지 않은지 확인 할 수 있습니다.

세번째와 네번째 요구사항은 `anotherContainer`의 항목은 `someContainer`의 항목과 정확히 같은 타입이므로, !=연산자로 확인할 수 있다는 의미로 결합됩니다.

이러한 요구사항은 `allItemsMatch(_:_:)` 함수가 서로 다른 두개의 컨테이너를 비교하는것을 가능하게 합니다.

`allItemsMatch(_:_:)`함수는 두 컨테이너가 같은 수의 항목을 가지고 있는지 확인합니다. 이러한 컨테이너 항목의 숫자가 다르면, 일치 시킬수 있는 방법이 없고 함수는 false를 반환합니다.

이러한 확인을 한 후에, 함수는 for-in반복문와 반 개방 범위 연산자(..<)를 이용하여 someContainer의 모든 항목을 반복합니다. 각 항목은, someContainer이 anotherContainer에 해당하는 항목과 일치하지 않는지 확인하는 기능을 합니다. 두 항목이 같이 않으면, 두 컨테이너는 일치하지 않고, 함수는 false를 반환합니다.

반복문이 일치하지 않는 것을 찾지 못하면, 두 컨테이너는 일치하고, 함수는 true를 반환합니다.

다음은 `allItemsMatch(_:_:)`함수의 동작을 보여줍니다.

```swift
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")
 
var arrayOfStrings = ["uno", "dos", "tres"]
 
if allItemsMatch(stackOfStrings, arrayOfStrings) {
    print("All items match.")
} else {
    print("Not all items match.")
}
// Prints "All items match."
```

위의 예제에서 `String`값을 저장하는 `Stack`인스턴스를 만들고, 스택에 3개의 문자열을 밀어넣었습니다(pushes). 또한, 이 예제는 스택과 같이 3개의 문자열을 포함하는 배열로 Array인스턴스를 초기화 합니다. 스택과 배열의 타입이 다르더라도, 둘다 `Container`프로토콜을 준수하고, 둘다 같은 타입의 값을 가지고 있습니다. 그러므로 두 컨테이너의 인자들로 `allItemsMathc(_:_:)`함수를 호출할수 있습니다. 위의 예제에서, `allItemsMathch(_:_:)`함수는 두 컨테이너의 모든 항목들이 정확히 일치하는 것을 보여줍니다.

---

## Extensions with a Generic Where Claues 

확장의 일부로 제네릭 `where`절을 사용할 수 있습니다. 아래 에제는 이전 예제의 Stack 구조체를 확장해서 `isTop(_:)` 메소드를 추가했습니다.

```swift
extension Stack where Element: Equatable {
    func isTop(_ item: Element) -> Bool {
        guard let topItem = items.last else {
            return false
        }
        return topItem == item
    }
}
```

새로운 `isTop(_:)`메소드는 먼저 스택이 비어있지 않은지 확인하고, 주어진 항목을 스택의 최상위 항목과 비교합니다. 만약 제네릭 `where`절 없이 시도하면, 한가지 문제가 생길것입니다 : `isTop(_:)`의 구현에 ==연산자를 사용하지만, Stack의 정의에는 항목들이 `equatable` 필요가 없으며, `==`연산자를 사용하면 컴파일시 오류가 발생합니다. 제네릭 `where`절을 사용해서 새로운 요구사항을 확장에 추가하며, 스택에 있는 항목들이 `equatable` 일때에만 `isTop(_:)`메소드를 확장에 추가합니다.

다음은 `isTop(_:)` 메소드 동작을 보여줍니다.

```swift
if stackOfStrings.isTop("tres") {
    print("Top element is tres.")
} else {
    print("Top element is something else.")
}
// Prints "Top element is tres."
```

만약 요소들이 `equatable`하지 않는 스택에서 `isTop(_:)`메소드 호출을 시도하면, 컴파일시 오류를 발생할 것입니다.

```swift
struct NotEquatable { }
var notEquatableStack = Stack<NotEquatable>()
let notEquatableValue = NotEquatable()
notEquatableStack.push(notEquatableValue)
notEquatableStack.isTop(notEquatableValue)  // Error
```

프로토콜에 확장으로 제네릭 `where`절을 사용할 수 있습니다. 아래 예제는 이전 예제의 `Container`프로토콜을 확장하해서 `startsWith(_:)`메소드를 추가합니다.

```swift
extension Container where Item: Equatable {
    func startsWith(_ item: Item) -> Bool {
        return count >= 1 && self[0] == item
    }
}
```

`startsWith(_:)` 메소드는 먼저 컨테이너에 최소한 하나이상의 항목이 있는지 확인하고, 그런 다음에 컨테이너에 있는 첫번째 항목과 주어진 항목이 일치하는지 확인합니다. 새로운 `startsWith(_:)`메소드는 컨테이너의 항목들이 `equatable` 경우에, `Container`프로토콜을 준수하는 모든 타입에서 사용될 수 있으며, 위에 사용된 스택과 배열을 포함합니다.

```swift
if [9, 9, 9].startsWith(42) {
    print("Starts with 42.")
} else {
    print("Starts with something else.")
}
// Prints "Starts with something else."
```

위 예제에서 제네릭 `where`절은 `Item`이 프로토콜을 준수하는 것을 요구하지만, 제네릭 `where`절을 `Item`이 특정 타입이 되도록 작성할 수 있습니다. 예를 들어:

```swift
extension Container where Item == Double {
    func average() -> Double {
        var sum = 0.0
        for index in 0..<count {
            sum += self[index]
        }
        return sum / Double(count)
    }
}
print([1260.0, 1200.0, 98.6, 37.0].average())
// Prints "648.9"
```

이 예제에서 `Item`타입이 `Double`인 컨테이너에 `average()`메소드가 추가되었습니다. 컨테이너에 있는 항목들을 반복하여 추가하고, 평균을 계산하기 위해 컨테이너의 갯수로 나눕니다. 그것은 명시적으로 `Int`에서 `Double`로 갯수를 변환해서 부동소수점(floating-point) 나누기를 수행할 수 있습니다.

다른 곳에서 작성하는 제네릭 `where`절 처럼, 확장(extension)의 일부로 제네릭 where절에 여러개의 요구사항을 포함할 수 있습니다. 목록의 각 요구사항은 쉼표(,)로 구분합니다.

## Associated Types with a Generic Where Clause

연관된 타입에 `제네릭 절(generic where clause)`을 포함할수 있습니다. 예를들어 `Sequence` 프로토콜이 표준 라이브러리에서 사용하는 것과같은 `iterator`를 포함하는 `Container`버전을 만들고 싶다고 가정하세요. 

다음 예제를 확인해봅시다

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
    
    associatedtype Iterator: IteratorProtocol where Iterator.Element == Item
    func makeIterator() -> Iterator
}
```

iterator의 genric where 절은 이터레이터 타입에 관계없이 이터레이터가 동일한 아이템 타입의 요소를 통과해야한다는 것을 요구합니다. `makeIterators()`함수는 컨테이너의 이터레이터에 대한 엑세스를 제공합니다. 

다른 프로토콜을 상속하는 경우, 프로토콜 정의에서 제네릭절을 포함하는것으로 부터 상속되고 연관된 타입의 제약 조건을 추가합니다. 코드 선언은 `ComparableContainer`은 아이템이 `Comparable`을 준수하기를 요구하는 프로토콜을 따릅니다.

```swift
protocol ComparableContainer: Container where Item: Comparable { }
```

---

## Generic Subscripts

서브스크립트는 제네릭이 될수 있고, 제네릭 where절을 포함할 수 있습니다. 견본(placeholder) 타입 이름을 subscript뒤에 꺽인괄호 사이(<>) 안쪽에 작성할 수 있고, 서브스크립트의 본문의 열린 중괄호 앞에 제네릭 where절을 작성합니다. 예를 들어

```swift
extension Container {
    subscript<Indices: Sequence>(indices: Indices) -> [Item]
        where Indices.Iterator.Element == Int {
            var result = [Item]()
            for index in indices {
                result.append(self[index])
            }
            return result
    }
}
```

`Container`프로토콜에 대한 확장은 시퀀스 인덱스와 주어진 인덱스마다 항목들을 포함하고 있는 배열을 반환하는 서브스크립트를 추가합니다. 제네릭 서브스크립트는 다음을 포함합니다.

- 꺽인 괄호(`<>`)안에 있는 제네릭 매개변수 `Indices`는 표준 라이브러리로부터 `Sequence` 프로토콜을 준수하는 타입이어야 합니다.
- 서브스크립트는 `indices`타입의 인스턴스인 하나의 매개변수 `indices`를 가집니다.
- 제네릭 `where`절은 시퀀스에 대한 `iterator`가 반드시 `Int`타입의 요소여야 합니다. 이렇게 하면 시퉌스의 인덱스는 컨테이너에 사용된 인덱스와 동일한 타입입니다.

종합해보면(taken together), 이러한 제약조건은 indices 매개변수에 대해 전달된 값이 정수형의 시퀀스 입니다.


---

