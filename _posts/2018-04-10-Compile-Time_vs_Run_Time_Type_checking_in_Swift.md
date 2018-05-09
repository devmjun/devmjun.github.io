---
layout:     post
title:      "Compile-Time vs Run-Time Type Checking in Swift"
subtitle:   "static type checking, dynaminc type checking"
date:       2018-04-10 20:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---


## Compile Time vs Run Time Type checking in Swift  

Swift의 타입 시스템을 사용하는 방법을 배울때 Swift(다른 많은 언어와 마찬가지로) 정적(static) 및 동적(dynamic)의 두가지 타입 체크 유형을 이해하는것이 중요합니다. `정적(static)` 타입 검사는 compile time에, `동적(dynamic)`타입 검사는 런타임에 발생합니다. 두 단계는 다른 부분적으로 호환되지 도구의 집합이 있습니다. 

오늘 그 두가지 차이점을 알아봅니다. 

---

## Compile Time Type Checking

컴파일 타임의 타입 검사(또는 정적 타입 검사(static type)의 검사)는 Swift `소스코드`에서 작동합니다. Swift 컴파일러는 명시적으로 유추 된 타입을 보고 타입조건의 정확성을 보장합니다.

다음은 정적(static) 검사의 간단한 예입니다. 

```swift
let text: String = ""
// Compile Error: Cannot convert value of 
// type 'String' to specified type 'Int'
let number: Int = text
```

타입 검사는 소스코드를 기반으로 `text`의 타입이 Int가 아니므로 컴파일 오류를 발생 시킵니다. Swift의 정적(static) 유형 검사는 훨씬 더 강력한 기능을 제공합니다. 제네릭 제약 조건 검증(verifying generic constraints)

```swift
protocol HasName {}
protocol HumanType {}

struct User: HasName, HumanType { }
struct Visitor: HasName, HumanType { }
struct Car: HasName {}

// Require a type that is both human and provides a name
func printHumanName<T: HumanType & HasName>(thing: T) {
    // ...
}

// Compiles fine:
printHumanName(User())
// Compiles fine:
printHumanName(Visitor())
// Compile Error: cannot invoke 'printHumanName' with an 
// argument list of type '(Car)'
printHumanName(Car())
```

위 예제에서 모든 타입 검사는 소스코드만을 기반으로 컴파일 타임에 수행됩니다. 컴파일러는 어떤 함수 호출이 `printHumanName` 함수의 제네릭 제약조건과 일치하는 인수를 제공하는지 확인할수 있습니다. 그렇지 않으면 컴파일 오류가 발생 합니다. 

Swift의 정적(static) 타입 시스템은 이러한 강력한 도구를 제공하므로 컴파일시 가능한 많이 검증하려고 노력합니다. 그러나 다음과 같은 경우 런타임 타입검증이 필요합니다. 

---

## Run Time Type Checking 

정적 유형 검사에 의존하는것이 불가능한 경우도 있습니다. 가장 일반적인 예는 외부 리소스(네트워크, 데이터 베이스 등)에서 데이터를 읽는 것입니다. 

이 경우 데이터와 타입 정보는 소스 코드의 일부가 아니므로 정적(static) 타입 검사는 데이터가 특정 타입을 가지고 있음을 증명할 수 없습니다(정적 유형 검사는 우리의 소스코드로부터 추출할 수 있는 유형 정보에서만 작동할수 있기 때문)

이것은 타입을 정적(static)으로 정의 할 수 있는 대신 런타임에 타입을 동적(dynamic)으로 검증해야 함을 의미 합니다.


런타임에 타입을 확인할때 모든 Swift인스턴스의 메모리에 저장된 타입 메타 데이터(type metadata)를 사용합니다. 이 단계에서 사용할수 있는 유일한 도구는 인스턴스가 특정 유형인지 또는 특정 프로토콜을 준수하는지 확인하기 위해 해당 메타 데이터를 사용하는 `is` 및 `as` 키워드를 사용하여 확인합니다.

이것은 모든 다른 Swift JSON 매핑 라이브러리가 하는 방식과 일치합니다. 즉, 알 수 없는 타입을 지정된 변수의 타입과 일치하는 동적(dynamic)으로 캐스팅하기 위한 편리한 API를 제공합니다.  

많은 시나리오에서 동적(dynamic) 검사를 사용하면 컴파일 타임에 알려지지 않은 타입을 정적(static)으로 검사된 Swift 코드와 통합할 수 있습니다. 

```swift
func takesHuman(human: HumanType) {}

var unknownData: Any = User()

if let unknownData = unknownData as? HumanType {
    takesHuman(human: unknownData)
}
```

`unknownData`로 함수를 호출하기 위해서 해야할일은 그것을 함수의 인수 형으로 캐스팅 하는것 뿐입니다. 

그러나 이 접근법을 사용하여 인수를 제네릭 제약 조건으로 정의된 함수를 호출할때 문제가 발생합니다. 

---

## Combining Dynamic and Static Type Checking

이전 printHumanName 예제를 계속 사용하고 네트워크 요청후 데이터를 받았다고 가정하고 printHumanName 메소드를 호출해야 합니다. 위의 과정을 동적(dynamic)으로 감지 된 타입이 수행하는 경우입니다.

우리는 `printHumanName` 함수의 인자로 사용할 수 있도록 우리의 타입이 두개의 서로다른 프로토콜을 채택해야 한다는 것을 알고 있습니다. 따라서 요구 사항을 동적으로 확인해야 합니다. 

```swift
var unknownData: Any = User()

if let unknownData = unknownData as? HumanType & HasName {
    // Cannot invoke 'printHumanName' with an argument list of type '(thing: HasName & HumanType)'
    printHumanName(unknownData)
}
```

위의 예제에서 동적(dynamic) 타입 검사는 실제로 올바르게 작동합니다. `if let` 블록의 본문은 두가지 예상 프로토콜을 준수하는 유형에만 실행됩니다. 그러나 이것을 컴파일러에 전달할 수 는 없습니다.

컴파일러는 `HumanType` 및 `HasName`을 준수하는 구체적인 타입(컴파일 타임에 완전히 지정된 타입이 있는 타입)을 예상합니다. 우리가 제공할 수 있는 것은 `동적(dynamic)`으로 검증된 타입입니다.  

Swift 2.2(지금도 안됨ㅠㅠ. 2018.4.10일기준) 부터는 이것을 컴파일 할 방법이 없습니다. 포스트의 끝에서 나는 스위프트에 대한 어떤 변화가 이 접근법을 작동시키는 데 필요할 것인가에 대해 간략히 언급할 것입니다. 

지금은 해결방법이 필요합니다.

---

## Workarounds

과거에는 다음 두 가지 방법 중 하나를 선택했습니다. 

- `unknowndData`를 프로토콜로 변환하는 대신 구체적인 타입으로 캐스트(이미 두개의 프로토콜을 채택한 어떤 타입으로 변환 한다는 의미)
- 제네릭 제약 조건 없이 printHumanName의 두번째 구현을 제공 합니다.

구체적인 타입의 솔루션은 아래와 같습니다.

```swift
if let user = unknownData as? User {
    printHumanName(user)
} else if let visitor = unknownData as? Visitor {
    printHumanName(visitor)
}
```

printHumanName의 두번째 구현을 제공하는 솔루션은 다음과 같습니다(다른 가능한 여러가지 솔루션이 있을수 있습니다)

```swift
func _printHumanName(thing: Any) {
    if let hasName = thing as? HasName, thing is HumanType {
        // Put implementation code here
        // Or call a third function that is shared between
        // both implementations of `printHumanName`
    } else {
        fatalError("Provided Incorrect Type")
    }
}

_printHumanName(unknownData)
```

이 두번째 솔루션에서 런타임 검사를 위해 컴파일 시간 제한을 대체합니다. Any 유형을 HasName으로 형 변환하여 이름을 프린트하기 위한 정보에 엑세스 할수 있게하고, 유형이 `HumanType`을 준수하는지 확인하는 `is`조건을 포함합니다. 일반 제약조건과 동등한 동적(Dynamic) 검사를 설정했습니다. 

임의의 타입이 우리의 프로토콜 요구 사항과 일치한다면 코드를 동적으로 실행할 두번째 구현을 제공합니다. 실제로 이 함수의 실제 기능을 `printHumanName` 및 `_printHumanName`에서 호출되는 세번째 함수로 추출합니다. 우리는 중복 코드를 피할수 있습니다. 

Any 인수를 받아들이는 `type erased`함수의 해법은 정말 좋지 않습니다. 그러나 실제로 다른 코드가 함수가 올바른 형식으로 호출될것을 보장하지만 Swift의 타입 시스템안에서 함수를 표현할 방법이 없는 경우 유사한 방법을 사용했습니다.

---

## Conclusion

위의 예제는 간단하지만 컴파일 타임과 런타임 타입 검사의 차이로 인해 발생할 수 있는 문제를 보여줍니다. 주요 해결 방법은 다음과 같습니다. 

- 정적 타입 검사는 컴파일 타임에 실행되고 소스코드에 대해 작동하며 타입 체크를 위해서 type annotation 과 type constraints를 사용합니다. 
- 동적 타입 검사는 런타임 정보를 사용하고 타입 검사를 위해 캐스팅합니다. 
- 제네릭 제약조건을 가지고 있는 함수를 호출할때 우리는 `argument`를 동적으로 캐스팅 할수 없습니다.

이 기능에 대한 지원을 Swift에 추가할수 없을까요? 저는 우리가 제한된 메타 타입을 동적으로 생성하고 상요하는 능력이 필요하다고 생각합니다. 다음과 같은 구문을 상상할수 있습니다. 

```swift
if let <T: HumanType, HasName> value = unknownData as? T {
	printHumanName(value)
}
```

나는 Swift 컴파일러에 대해서 거의 알지 못합니다. 스위프트 코드베이스의 아주 작은 부분에 제공할수 있는 이점과 비비교하면 위의 구현의 상대적 비용은 높다고 생각합니다.

그러나 `David Smith`의 [stack Ovserflow 대답](https://stackoverflow.com/questions/28124684/swift-check-if-generic-type-conforms-to-protocol)에 따르면 Swift는 현재 런타임에 제네릭 제약 조건을 확인합니다.(컴파일러가 성능 최적화를 위해 함수의 특수 복사본을 생성하지 않는 한)

즉 `generic`제약 조건에 대한 정보가 런타임에 여전히 사용가능하다는것을 의미하고, 적어도 이론적으로는 동적으로 생성된 제한된 메타 타입의 아이디어가 가능할 수 있습니다. 

지금 당장은 정적 및 동적 타입 검사를 혼합할 때의 한계를 이해하고 가능한 해결 방법을 알고 있으면 도움이 됩니다. 

> Runtime 타임 체크와 컴파일 타임 generic은 스테이크와 아이스크림 같습니다. 둘은 나이스하지만 섞이면 조금 이상합니다 [해당링크에서 이유를 확인합니다.](https://stackoverflow.com/questions/28124684/swift-check-if-generic-type-conforms-to-protocol)

---

## Reference 

[http://blog.benjamin-encz.de/post/compile-time-vs-runtime-type-checking-swift/](http://blog.benjamin-encz.de/post/compile-time-vs-runtime-type-checking-swift/) <br>
[https://stackoverflow.com/questions/28124684/swift-check-if-generic-type-conforms-to-protocol](https://stackoverflow.com/questions/28124684/swift-check-if-generic-type-conforms-to-protocol)

- 연관된 포스트
	- [<U>Swift. Type method</U>](https://devminjun.github.io/blog/Type_Methods)
	- [<U>Swift. Meta Type</U>](https://devminjun.github.io/blog/Meta_Type_Swift)
	- [<U>Protocol Composition Type</U>](https://devminjun.github.io/blog/Protocol_Composition_Type)
	- [<U>Swift, Identity Operators ==, ===, is</U>](https://devminjun.github.io/blog/Identity-Operators)
	- [<U>ComputerScience. Compile-time vs Run-Time</U>](https://devminjun.github.io/blog/Whats_the_difference_between_run-time_and_compile-time)

---
