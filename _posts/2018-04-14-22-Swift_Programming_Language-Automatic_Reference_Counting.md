---
layout:     post
title:      "Swift. 정리하기 22: Swift Language Guide-Automatic Reference Counting"
subtitle:   "Swift Language Guide-Automatic Reference Counting * "
date:       2018-04-14 11:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

최종 수정일: 2018.10.1

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Automatic Reference Counting](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID48)<br>
[까칠코더님 블로그](http://kka7.tistory.com/129?category=919617)

---


## Automatic Reference Counting

Swift는 앱의 메모리 사용량을 추적하기 위해 `자동 참조 갯수(ARC: Automatic Reference Counting)`를 사용합니다. 대부분의 경우, Swift에서 메모리 관리는 그냥 사용되고, 메모리 관리에 대해서 생각 할 필요가 없습니다. ARC는 인스턴스가 더 이상 필요 없을때 클래스 인스턴스를 자동적으로 메모리에서 해제 해줍니다.

하지만, 몇가지 경우에 ARC는 메모리 관리를 위한 코드 일부와 관련있는 더 많은 정보가 필요합니다. 이번 챕터(chapter)에서 이러한 상황을 설명하고 앱의 메모리 모두를 관리하기 위해 ARC 활성화 방법을 보여줍니다. Objective-C로 ARC 사용하는 것에 대해 [ARC 릴리즈 노트(Transitioning to ARC Release Notes)](https://developer.apple.com/library/content/releasenotes/ObjectiveC/RN-TransitioningToARC/Introduction/Introduction.html#//apple_ref/doc/uid/TP40011226)에서 설명된 것처럼, Swift에서 ARC 사용은 매우 단순합니다

> Note: 참조 갯수는 클래스의 인스턴스에만 적용됩니다. 구조체와 열거형은 값 타입이며, 참조 타입이 아니고, 참조로 저장되거나 전달되지 않습니다.

---

## How ARC Works 

클래스의 새로운 인스턴스를 만들때마다, ARC는 인스턴스에 관한 정보를 저장하기 위해 메모리 덩어리(chunk)를 할당합니다. `이 메모리는 인스턴스의 저장 프로퍼티와 연관된 값과 함께, 인스턴스의 타입에 관한 정보를 유지합니다.`

추가적으로, 인스턴스가 더 이상 필요하지 않을때, ARC는 메모리를 다른 목적으로 사용 할 수 있도록 인스턴스에 의해 사용된 메모리를 해제합니다. 이는 클래스 인스턴스가 더 이상 필요하지 않을때, 메모리 공간을 가지지 않는 것을 보장합니다.

하지만, ARC가 아직 사용하고 있는 인스턴스의 메모리를 해제하면, 더 이상 인스턴스의 프로퍼티에 접근 할 수 없거나, 인스턴스의 메소드를 호출 할 수 없습니다. 실제로, 인스턴스에 접근하려하면, 앱은 크래쉬(crash) 될 것입니다.

필요한 인스턴스가 사라지지 않는지 확인해야 하며, ARC는 각 클래스 인스턴스에 현재 참조중인 많은 프로퍼티, 상수, 변수를 추적합니다. ARC는 인스턴스에 대해 활성화된 참조가 하나라도 있으면, 인스턴스의 메모리를 해제 하지 않을 것입니다.

이를 가능하게 하기 위해, 프로퍼티, 상수, 변수에 클래스 인스턴스를 할당 할때마다, 그 프로퍼티, 상수, 변수는 인스턴스에 강한 참조(strong reference)를 만듭니다. 그 참조는 강한(strong) 참조로 호출되기 때문에, 인스턴스를 굳건히 유지하고 있고, `강한 참조가 남아있는 만큼은 메모리를 해제 하는 것을 허용하지 않습니다.`

---

## ARC in Action 

다음의 예제는 `자동 참조 개수(ARC: Automatic Reference Counting)` 작동 방식입니다. 이 예제는 하나의 상수 프로퍼티 `name`을 정의한 간단한 클래스 `Person`로 시작합니다.

```swift
class Person {
    let name: String
    init(name: String) {
        self.name = name
        print("\(name) is being initialized")
    }
    deinit {
        print("\(name) is being deinitialized")
    }
}
```

`Person`클래스는 인스턴스의 `name`프로퍼티를 설정하고 초기화 진행중을 나타내는 메시지를 출력하는 초기화(`initializer`)를 가지고 있습니다. 또한 `Person` 클래스는 클래스의 인스턴스가 메모리에서 해제 될때, 메시지를 출력을 하는 해제(`deinitializer`)도 가지고 있습니다.

다음 코드는 바로 다음 코드 일부(`snippet`)에서 새로운 `Persion`인스턴스에 여러개의 참조 설정에 사용되는`Persion?` 타입의 변수 일부를 정의합니다. 이러한 변수들이 옵셔널 타입이기 때문에(Person?, Person이 아님), 자동으로 값이 `nil`로 초기화 되고, 현재 Person 인스턴스를 참조하지 않습니다.

```swift
var reference1: Person?
var reference2: Person?
var reference3: Person?
```

새로운 `Person`인스턴스를 생성하고 3개의 변수들 중 하나에 할당 할 수 있습니다.

```swift
reference1 = Person(name: "John Appleseed")
// Prints "John Appleseed is being initialized"
```

`Person` 클래스의 초기화를 호출하는 시점에 "John Applesed is being initialized" 메시지가 출력되는 것을 주의합니다.

새로운 `Person`인스턴스가 `reference1` 변수에 할당되기 때문에, 이제 새로운 Person인스턴스에 reference1는 강한 참조가 됩니다. 강한 참조가 하나 이상이기(최소 한 개) 때문에, ARC는 Person이 메모리에 유지되고 메모리가 해제되지 않도록 해줍니다.

두 개 이상의 변수에 동일한 Person인스턴스를 할당하면, 인스턴스에 두 개 이상의 강한 참조가 됩니다(established).

```swift
reference2 = reference1
reference3 = reference1
```

현재 하나의 `Person`인스턴스에 `3개의 강한 참조`가 있습니다.

두 개의 변수에 `nil`을 할당해서 두 개의 강한 참조가 깨지면, 하나의 강한 참조만 남고, Person 인스턴스는 메모리에서 해제 되지 않습니다.

```swift
reference1 = nil
reference2 = nil
```

ARC는 `Person`인스턴스가 더 이상 사용하지 않는것이 명확한 시점인 3번째와 마지막 강한 참조가 깨지기 전까지, Person인스턴스를 메모리에서 해제하지 않습니다.

```swift
reference3 = nil
// Prints "John Appleseed is being deinitialized"
```

---

## Strong Reference Cycles Between Class Instances

위의 예제에서, ARC는 새로운 `Person`인스턴스의 참조 횟수를 추적 할 수 있고 Person인스턴스가 더 이상 필요하지 않을때 메모리에서 해제합니다.

하지만, 강한 참조가 없는 시점에 클래스의 인스턴스를 가져 올 수 없는 코드 작성이 가능합니다. 두 개의 클래스 인스턴스가 각각 다른 강한 참조를 가지고 있다면, 각 인스턴스는 다른 인스턴스가 살아남게 해줍니다. 이를 `강한 순환 참조(strong reference cycle)`라고 합니다.

강한 참조 대신에 약한(weak) 또는 소유하지않는(unowned) 참조 같은 클래스간의 몇가지 관계를 정의하여 강한 순환 참조를 해결합니다. 이 과정은 [클래스 인스턴스에서 강한 순환 참조 해결(Resolving Strong Refrence Cycles Between Class Instances)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID52)에서 설명됩니다. 하지만, 강한 순환 참조 해결에 대해 배우기 전에, 강한 순환 참조가 발생하는 이유에 대해 알고 있는게 좋습니다.

여기에 강한 순환 참조를 발생시키는 예제가 있습니다. 이 예제는 아파트와 거주자에 대한 모델링 하는 `Person`과 `Apartment` 클래스 두 개를 정의하였습니다.

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}
 
class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}
```

`Person`인스턴스는 `String`타입의 `name`프로퍼티와 초기 값이 `nil`인 `apartment`옵셔널 프로퍼티를 가지고 있습니다. 아파트에 항상 사람이 있는 것은 아니기 때문에, `apartment` 프로퍼티는 옵셔널입니다.

비슷하게, `Apartment`인스턴스는 `String` 타입의 `unit` 프로퍼티와 초기값이 `nil`인 `tenant` 옵셔널 프로퍼티를 가지고 있습니다. 아파트가 항상 주민이 있는 것은 아니기 때문에, 주인(tenant) 프로퍼티는 옵셔널입니다.

이러한 두 개의 클래스 모두 클래스의 인스턴스의 메모리가 해제된다는 사실을 출력하는 해제(`deinitializer`)를 정의하고 있습니다. `Person`과 `Apartment`의 인스턴스가 예상한대로 메모리에서 해제가 되는지 봅니다.

다음 코드 일부(snippet)는 아래의 특정 `Apartment`와 `Person`인스턴스를 설정하기 위해, 옵셔널 타입의 두개의 변수 `john`과 `unit4A`를 정의하였습니다. 이러한 두 개의 변수 모두 옵셔널이므로 초기 값이 nil입니다.

```swift
var john: Person?
var unit4A: Apartment?
```

새로운 특정 `Person`인스턴스와 `Apartment`인스턴스를 생성할수 있고고 이러한 새로운 인스턴스를 변수 `john`과 `unit4A`에 할당 할 수 있습니다.

```swift
john = Person(name: "John Appleseed")
unit4A = Apartment(unit: "4A")
```

여기에서 어떻게 두 개의 인스턴스를 생성하고 할당한 후에 강한 참조가 되는 것을 지켜봅니다. `john`변수는 이제 새로운 `Person`인스턴스의 강한 참조를 가지고 있고, `unit4A`변수는 새로운 `Apartment`인스턴스의 강한 참조를 가지고 있습니다.

<center><img src="/img/posts/Swift_Programming_Language-19.png" width="700" height="500"></center> <br> 

이제 두개의 인스턴스를 사람(`person`)은 아파트(`apartment`)를 가지고 있고, 아파트(`apartment`)는 주인(`tenant`)을 가지고 있도록 서로 연결 할 수 있습니다. 느낌표(`!`) 표시는 인스턴스 내부에 저장된 `john`과 `unit4A`옵셔널 변수를 언래핑(`unwrap`)하고 접근 할때 사용되며, 이러한 인스턴스의 프로퍼티를 설정 할 수 있습니다.

```swift
john!.apartment = unit4A
unit4A!.tenant = john
```

여기에서, 두 개의 인스턴스가 함께 연결된 후에 강한 참조가 되는 것을 지켜봅니다.

<center><img src="/img/posts/Swift_Programming_Language-20.png" width="700" height="500"></center> <br> 

공교롭게도, 이러한 두개의 인스턴스를 연결하면 강한 순환 참조가 만들어집니다. `Person`인스턴스는 이제 `Apartment`인스턴스에 강한 참조를 가지고 있고, `Apartment`인스턴스는 `Person`인스턴스에 강한 참조를 가지고 있습니다. 그러므로, john과 unit4A변수에 의해 강한 참조를 가지고 있을때, 참조 갯수는 0이 되지 않고, 인스턴스들은 ARC에 의해서 메모리가 해제되지 않습니다.

```swift
john = nil
unit4A = nil
```

이러한 두 변수들을 `nil`로 설정하여도 해제(`deinitializer`)는 호출되지 않습니다. 강한 순환 참조는 `Person`과 `Apartment` 인스턴스가 메모리에서 해제되는 것을 막으며, 앱에서 메모리 누수가 생기는 원인이 됩니다.

여기에서, `john`과 `unit4A`변수에 `nil`을 설정한 후에 강한 참조가 되는 것을 지켜봅니다

<center><img src="/img/posts/Swift_Programming_Language-21.png" width="700" height="500"></center> <br> 

`Person`인스턴스와 `Apartment`인스턴스간의 강한 참조가 남아 있고 깨뜨릴 수 없습니다.

---

## Resolving Strong Reference Cycles Between Class Instances

Swift는 클래스 타입의 프로퍼티로 작업할때 강한 순환 참조를 해결하는 두가지 방법을 제공합니다 : `약한(weak)참조`와 `소유하지 않는(unowned) 참조`

`weak`와 `unowned`는 순환 주기에서 강하게 유지 않지 않고 다른 인스턴스를 참조하기 위해 하나의 인스턴스만 참조가 가능합니다. 그 인스턴스는 강력한 순환참조를 생성하지 않고 서로를 참조 할 수 있습니다.

`weak 참조`는 다른 인스턴스의 생명주기가 짧을때 사용합니다. - 이것은 다른 인스턴스가 먼저 메모리에서 해제 될 수 있습니다. 위의 `Apartment` 예제에서, 생명주기의 어느 시점에, 주민이 없는게 가능한 아파트에 적합하고, 이 경우에 `weak` 참조는 순환 참조를 멈추는데 어울리는 방법입니다. 대조적으로, `unowned`참조는 다른 인스턴스가 같은 생명주기를 가지거나 더 길게 유지 될때 사용합니다.

---

## Weak Reference 

`약한 참조(weak reference)`는 참조하는 인스턴스를 강하게 유지 하지 않는 참조이고, 참조된 인스턴스를 정리하도록 `ARC`를 멈추지 않습니다. 이러한 동작은 강한 순환 참조가 되는 것을 막아줍니다. `weak 참조`는 프로퍼티나 변수 선언 앞에 `weak`키워드를 사용합니다.

`weak 참조`는 참조하고 있는 인스턴스를 강하게 유지하지 않기 때문에, weak 참조로 참조하고 있는 동안에 인스턴스가 메모리 해제되는 것이 가능합니다. 그러므로, 참조하는 인스턴스가 메모리에서 해제되면, ARC는 자동적으로 weak 참조를 nil로 설정합니다. 그리고, weak 참조는 실시간으로 nil로 값이 변경되는 것이 필요하기 때문에, 언제나 상수보다는 옵셔널 타입의 변수로 선언되야 합니다.

`weak 참조`에서 기존 값을 확인 할 수 있으며, 다른 옵셔널 값과 마찬가지로, 더 이상 존재하지 않는 유효하지 않는 인스턴스를 참조하지 않을 것입니다.

> Note: ARC가 `weak`참조를 nil로 설정할때, 프로퍼티 옵져버는 호출되지 않습니다.

아래 예제는 위의 `Person`과 `Apartment`예제와 동일하며, 한가지 중요한 차이점이 있습니다. 이번에는, `Apartment`타입의 `tenant` 프로퍼티가 `weak` 참조로 선언되어 있습니다.

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}
 
class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    weak var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}
```

`두 변수(john과 unit4A)`의 강한 참조와 두 인스턴스는 이전과 같이 생성되고 연결됩니다.

```swift
var john: Person?
var unit4A: Apartment?
 
john = Person(name: "John Appleseed")
unit4A = Apartment(unit: "4A")
 
john!.apartment = unit4A
unit4A!.tenant = john
```

여기에서, 이제 두 인스턴스를 함께 연결한 참조 방법을 지켜봅니다.<br>

<center><img src="/img/posts/Swift_Programming_Language-22.png" width="700" height="500"></center> <br> 

`Person`인스턴스는 여전히 `Apartment`인스턴스의 강한 참조를 가지고 있지만, `Apartment`인스턴스는 이제 `Person`인스턴스의 약한(`weak`) 참조를 가집니다. 이것은 `john`변수를 `nil`로 설정하여 강한 참조를 깨뜨리는 것을 의미하며, 더 이상 `Person`인스턴스의 강한 참조가 없습니다.

```swift
john = nil
// Prints "John Appleseed is being deinitialized"
```

`Person`인스턴스의 강한 참조가 없기 때문에, 메모리에서 해제되고 `tenant`프로퍼티는 `nil`로 설정됩니다.

<center><img src="/img/posts/Swift_Programming_Language-23.png" width="700" height="500"></center> <br> 

`Apartment`인스턴스의 강한 참조는 `unit4A`만 남아있습니다. 강한 참조가 깨지면, 더 이상 `Apartment`인스턴스의 강한 참조가 없습니다.

```swift
unit4A = nil
// Prints "Apartment 4A is being deinitialized"
```

Apartment인스턴스의 강한 참조가 더 이상 없기 때문에, 메모리에서 해제됩니다.<br>

<center><img src="/img/posts/Swift_Programming_Language-24.png" width="700" height="500"></center> <br> 

> Note: 가비지 컬렉션을 사용하는 시스템에서, `weak 포인터`는 간혹 간단한 캐쉬 메카니즘을 사용하기 때문에 메모리 부족으로 가비지 컬렉션이 발생될때 강한 참조가 없는 객체들은 메모리 에서 해제됩니다. 하지만, ARC에서 변수들은 마지막 강한 참조가 제거되면 곧 바로 메모리에서 해제되며, `weak`참조는 그 목적과 어울리지 않습니다.

---

## Unowned Reference 

약한(weak)참조 처럼, `소유하지 않는 참조(unowned reference)`는 인스턴스가 참조하는 것을 강하게 유지하지 않습니다. `weak` 참조와는 다르게, `unowned` 참조는 다른 인스턴스와 같은 생명주기를 가지거나 더 긴 생명주기를 가질때 사용됩니다. `unowned`참조는 프로퍼티나 변수 선언 앞에 `unowned`키워드를 사용합니다.

`unowned` 참조는 항상 값을 가지고 있는 것으로 예상됩니다. 결과적으로, ARC는 unowned 참조의 값을 nil로 설정하지 않으며, unowned 참조는 옵셔널이 아닌 타입을 사용해여 정의하는 것을 의미합니다.

> Important: 참조가 `항상(always)` 메모리가 해제되지 않은 인스턴스를 참조하는게 확실 할 때 `unowned` 참조를 사용합니다.
인스턴스의 메모리가 해제된 후에 unowned 참조의 값에 접근을 시도하면, 실시간 오류가 발생합니다.

다음에 오는 예제는 은행 고객과 고객의 신용카드에 대해 모델링한 두 개의 클래스 `Customer`와 `CreditCard`를 정의합니다. 이러한 두개의 클래스는 각각 다른 클래스의 인스턴스를 프로퍼티로 저장합니다. 이러한 관계는 강한 순환 참조를 만들 가능성이 있습니다.

`Customer`와 `CreditCard`간의 관계는 위에서 `weak`참조에서 봤던 예제의 `Apartment`와 `Person`간의 관계와는 약간 다릅니다. 데이터 모델에서, 고객은 신용카드를 가지거나 가지지 않을수 있지만, 신용카드는 항상 고객과 연관되어 있습니다. `CreditCard`인스턴스는 `Customer`이 참조 하는 것보다 생명주기가 길지 않습니다. 이를 나타내기 위해, `Customer`클래스는 `card` 옵셔널 프로퍼티를 가지지만, `CreditCard`클래스는`unowned(그리고, 옵셔널이 아닌)` 프로퍼티 `customer`를 가집니다.

게다가, 새로운 `CreditCard` 인스턴스는 사용자정의 초기화에 `number`값과 `customer`인스턴스를 전달받아야만 생성될 수 있습니다. `CreditCard`인스턴스가 생성될때, `CreditCard` 인스턴스는 항상 `customer`와 연관된 인스턴스를 가지는 것을 보장합니다.

신용카드는 항상 고객을 가지므로, 강한 순환 참조를 피하게 해주기 위해, `customer`프로퍼티는 `unowned` 참조로 정의합니다.

```swift
class Customer {
    let name: String
    var card: CreditCard?
    init(name: String) {
        self.name = name
    }
    deinit { print("\(name) is being deinitialized") }
}
 
class CreditCard {
    let number: UInt64
    unowned let customer: Customer
    init(number: UInt64, customer: Customer) {
        self.number = number
        self.customer = customer
    }
    deinit { print("Card #\(number) is being deinitialized") }
}
```

> Important: `CreditCard`클래스의 `number`프로퍼티는 number프로퍼티의 용량이 32비트와 64비트 시스템에서 16자리 카드 번호를 저장하기에 충분하다는 것을 보장하기 위해 `Int`타입보다 `UInt64`타입으로 정의됩니다.

다음 코드의 일부는 특정 고객의 참조를 저장하는데 사용되는, `Customer`의 옵셔널 변수 `john`을 정의 합니다. 이 변수는 옵셔널이므로, `nil`값으로 초기화 됩니다.

```swift
var john: Customer?
```

이제 `Customer`인스턴스를 생성 할 수 있고, 새로운 `CreditCard`인스턴스를 초기화하고, 고객의 `card` 프로퍼티에 할당 할 수 있다.

```swift
john = Customer(name: "John Appleseed")
john!.card = CreditCard(number: 1234_5678_9012_3456, customer: john!)
```

다음은 연결된 두 인스턴스의 참조를 보여줍니다.

<center><img src="/img/posts/Swift_Programming_Language-25.png" width="700" height="500"></center> <br> 

`Customer`인스턴스는 이제 `CreditCard`인스턴스의 강한 참조를 가지고 있고, `CreditCard`인스턴스는 `Customer`인스턴스의 `unowned`참조를 가지고 있습니다.

`john`변수에 의해 강한 참조가 깨질때, `unowned` customer참조이기 때문에, `Customer`인스턴스는 더 이상 강한 참조가 아닙니다.

<center><img src="/img/posts/Swift_Programming_Language-26.png" width="700" height="500"></center> <br> 

`Customer`인스턴스는 더 이상 강한 참조가 아니기 때문에, 메모리에서 해제됩니다. 해제된 후에, `CreditCard`인스턴스가 더 이상 강한 참조가 아니며, 그것 역시 메모리에서 해제됩니다.

```swift
john = nil
// Prints "John Appleseed is being deinitialized"
// Prints "Card #1234567890123456 is being deinitialized"
```

위의 마지막 코드 부분은 `Customer`인스턴스와 `CreditCard`인스턴스에 대한 해제가 해제됨`(deinitialized)` 메시지를 모두 출력한 것을 보여줍니다.

> Note: 위의 예제에서 안전한(safe) unowned 참조 사용법을 보여줍니다. 또한, Swift는 실시간으로 안전성을 확인하는 것을 비활성화시키는게 필요한 경우에, `안전하지 않은(unsafe) unowned 참조`를 제공합니다. 예를 들어, 성능상의 이유입니다. 모든 안전하지 않은 동작과 마찬가지로, 코드의 안전성을 확인하는 책임을 져야 합니다.
>
> `unowned(unsafe)`를 작성함으로써 안전하지 않은 unowned참조를 표시합니다. 인스턴스가 참조하고 있는것이 메모리에서 해제된 후에, 안전하지 않은(unsafe) unowned참조에 접근하려고 하면,프로그램은 인스턴스가 예전에 사용했던 메모리의 위치에 접근하려 할것이며, 이는 안전하지 않은 동작입니다.

---

## Unowned References and Implicitly Unwrapped Optional Properties

위에서 강한 순환 참조를 깨트릴 필요가 있는 일반적인 두가지 시나리오 `weak`와 `unowned`참조 예제를 보았습니다.

`Person`과 `Apartment`예제는 두개의 프로퍼티 모두 `nil`을 허용하고 있고, 강한 순환 참조의 원인이 될 가능성을 가지고 있는 상황을 보여줍니다. 이 시나리오는 weak참조로 잘 해결됩니다.

`Customer`와 `CreditCard`예제는 하나의 프로퍼티가 `nil`을 허용하고 다른 프로퍼티는 `nil`을 허용하지 않는 강한 순환 참조가 될 가능성을 가지고 있는 상황을 보여줍니다. 이 시나리오는 `unowned`참조로 잘 해결됩니다.

하지만, 세번째 시나리오는 두 프로퍼티가 항상 값을 가지고 있으며, 프로퍼티는 한번 초기화가 완료되면 nil이 아니어야 합니다. 이 시나리오에서, 한 클래스에서 `unowned`프로퍼티와 다른 클래스에서의 암시적으로 언래핑된(`unwrapped`) 옵셔널 프로퍼티를 결합하는 것이 유용합니다.

한번 초기화가 완료된 두 프로퍼티 모두 직접(옵셔널 언래핑 없이) 접근이 가능하며, 여전히 순환 참조를 피할수 있습니다. 이번 섹션(section)에서 이러한 관계를 설정하는 방법을 보여줍니다.

아래 예제는 각각 프로퍼티로 다른 클래스의 인스턴스를 저장하는 두 클래스 `Country`와 `City`를 정의합니다. 이 데이터 모델에서, 언제나 모든 나라는 항상 수도를 가지고, 모든 도시는 반드시 나라에 속해있어야 한다. 이를 표현하기 위해, `Country`클래스는 `capitalCity`프로퍼티를 가지고 있고 `City`클래스는 `country` 프로퍼티를 가지고 있습니다.

```swift
class Country {
    let name: String
    var capitalCity: City!
    init(name: String, capitalName: String) {
        self.name = name
        self.capitalCity = City(name: capitalName, country: self)
    }
}
 
class City {
    let name: String
    unowned let country: Country
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
}
```

두 클래스 간에 상호 의존성을 설정하기 위해, `City` 초기화에서 `Country`인스턴스를 가지고, `country`프로퍼티에 인스턴스를 저장합니다.

`Country`의 초기화에서 `City`에 대한 초기화가 호출됩니다. 하지만, `Country`의 초기화는 새로운 `Country`인스턴스가 완전히 초기화되기 전까지 `City`초기화에 `self`를 전달 할 수 없으며, [두 단계 초기화(Two-Phase Initialization)에서](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID220) 설명되어 있습니다.

> 개인 Note: 자기자신이 초기화 되고 있기때문에, 자기 자신이 생성되기전임. 지금은 capitalCity의 타입이 `City!` 이기때문에, 기본값이 nil임.. 그래서 Country의 초기화에서 Country를 초기화할때. name 프로퍼티가 설정되게 하고, name프로퍼티 설정후 암시적으로 self 프로퍼티를 전달할수 있게됨..


이러한 요구사항을 처리하기 위해, `Country`의 `capitalCity` 프로퍼티는 암시적으로 언래핑된 옵셔널 프로퍼티로 선언하며, 타입의 끝에 느낌표(`!`)표시를 해줍니다. 이것은 `capitalCity`프로퍼티가 다른 옵셔널 처럼 기본값으로 `nil`을 가지는 것을 의미 하지만, [암시적인 언래핑된 옵셔널(Implicitly Unwrapped Optionals)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID334)에서 설명된것 같이, 언래핑할 필요 없이 값에 접근 할 수 있습니다.

`capticalCity`는 기본 값이 `nil`이기 때문에, 새로운 `Country`인스턴스는 완전히 초기화 되자마자 `Country`인스턴스는 초기화에서 `name`프로퍼티를 설정하도록 구성됩니다. 이는 `Country`초기화를 참조해서 시작하고 `name`프로퍼티가 설정되자마자 암시적인 `self`프로퍼티를 전달합니다. `Country`초기화는 `Country`초기화가 `capitalCity`프로퍼티를 설정 할때, `self`를 `City`초기화에 하나의 매개변수로 전달 할 수 있습니다.

이 모든 것은 `Country`와 `City`인스턴스를 강한 순환 참조를 만들지 않고, 한 문장으로 만들수 있다는 것을 의미하고, `captialCity`프로퍼티는 옵셔널 값을 언래핑한 느낌표(`!`) 표시 없이 직접 접근 할 수 있습니다.

```swift
var country = Country(name: "Canada", capitalName: "Ottawa")
print("\(country.name)'s capital city is called \(country.capitalCity.name)")
// Prints "Canada's capital city is called Ottawa"
```

위의 예제에서, 암시적으로 언래핑된 옵셔널의 사용은 2 단계(two-phase) 클래스 초기화 요구사항을 만족합니다. 여전히 강한 순환 참조를 피하면서, `capitalCity`프로퍼티는 사용될 수 있고 한번 초기화가 완료되면 `옵셔널이 아닌 값처럼 접근 할 수 있습니다.`

---

## Strong Reference Cycles for Closures

위에서 두 클래스 인스턴스 프로퍼티가 각각 다른 강한 참조를 가지고 있을때, 강한 순환 참조가 어떻게 생성되는지 보았습니다. 또한, 강한 순환 참조를 깨기 위해 `weak`와 `unowned` 참조를 사용하는 것을 보았습니다.

강한 순환 참조는 클래스 인스턴스의 프로퍼티에 클로저를 할당 할때 발생할 수 있고, 클로져의 본문(body)이 인스턴스를 캡쳐(capture)합니다. 클로져의 본문에서 `self.someProperty`처럼 인스턴스의 프로퍼티에 접근하거나, `self.someMethod()`처럼, 클로저가 인스턴스의 메소드를 호출하기 때문에 캡쳐가 발생합니다. 어느 경우에나, 이러한 접근은 클로저가 `self`를 `캡쳐(capture)하게 하며, 강한 순환 참조`를 만듭니다.

클래스처럼, 클로져는 참조 타입이기 때문에 `강한 순환 참조가 발생`합니다. 프로퍼티에 클로저를 할당할때, 클로저에 참조(reference)를 할당합니다. 본질적으로, 이것은 위와 같은 문제 입니다. - 두개의 강한 참조는 서로 살아 있게 해줍니다. 하지만, 두 클래스 인스턴스 대신에, 이번에는 클래스 인스턴스와 클로저를 서로 살아 있게 해줍니다.

Swift는 이 문제에 대해 `클로저 캡쳐 목록(closure capture list)이`라는 멋진 해결책을 제공합니다. 하지만, 클로저 캡쳐 목록에서 강한 순환 참조를 깨는 법을 배우기 전에, 순환이 발생하는 이유를 이해하는 것이 유용합니다.

아래 예제는 클로저에서 `self`참조를 사용할때, 강한 순환 참조를 만들 수 있는지 보여줍니다. 이 예제는 HTML 문서내의 각각 요소에 대한 간단한 모델링하는 HTMLElement 클래스를 정의 합니다.

```swift
class HTMLElement {
    
    let name: String
    let text: String?
    
    lazy var asHTML: () -> String = {
        if let text = self.text {
            return "<\(self.name)>\(text)</\(self.name)>"
        } else {
            return "<\(self.name) />"
        }
    }
    
    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }
    
    deinit {
        print("\(name) is being deinitialized")
    }
    
}
```

`HTMLElement`클래스는 헤더 요소에 대한 `h1`, 단락 요소 `"p"`, 줄 바꿈 요소 `"br"`처럼 요소의 이름을 가리키는 `name`프로퍼티를 정의합니다. 또한, `HTMLElement`는 HTML 요소로 만드는 텍스트를 표현하는 문자열을 설정할 수 있는, `text`옵셔널 프로퍼티를 정의합니다.

이러한 두개의 간단한 프로퍼티 외에도, `HTMLElement`클래스는 `lazy` 프로퍼티 `asHTML`로 정의합니다. 이 프로퍼티는 `name`과 `text`로 조합하여 HTML 문자열 조각으로 만드는 클로저를 참조합니다. `asHTML`프로퍼티는 `() -> String` 타입 또는 이 함수는 매개변수가 없고 `String`값을 반환합니다.

기본적으로, `asHTML` 프로퍼티는 HTML 태그를 표현하는 문자열을 반환하는 클로저가 할당됩니다. 이 태그는 `text` 옵셔널 값이 있으면 포함하고 `text`가 없다면 포함하지 않습니다. 단락 요소(`paragraph`)에 대해, 클로저는 `text` 프로퍼티가 `"some text"` 또는 `nil`과 같은지에 따라 `"<p>some text</p>"` 또는 `"<p />"`를 반환할 것입이다.

`asHTML`프로퍼티는 인스턴스 메소드처럼 이름지어지고 사용됩니다. 하지만 인스턴스 메소드 대신에 `asHTML`은 클로저 프로퍼티이기 때문에, 특정 `HTML` 요소에 대해 `HTML` 표현을 변경하고 싶으면, `asHTML` 프로퍼티의 기본 값은 사용자 정의 클로저에서 변경 할 수 있습니다.

예를 들어, `asHTML`프로퍼티는 일부 텍스트의 `text`프로퍼티가 `nil`이면, 비어 있는 `HTML` 태그가 반환되는 것을 막기 위해, 기본 클로저를 설정 할 수 있습니다.

```swift
let heading = HTMLElement(name: "h1")
let defaultText = "some default text"
heading.asHTML = {
    return "<\(heading.name)>\(heading.text ?? defaultText)</\(heading.name)>"
}
print(heading.asHTML())
// Prints "<h1>some default text</h1>"
```

> Note: asHTML프로퍼티는 필요한 경우와 일부 HTML 출력 대상에 대한 문자열 값을 만들기 위해 그 요소가 실제 필요하기 때문에, lazy프로퍼티로 선언되었습니다. 사실상 asHTML은 기본 클로저로 `self`에 참조 할 수 있는 `lazy` 프로퍼티라는 것을 의미합니다. `lazy` 프로퍼티는 초기화가 완료 되고 `self`가 존재 할때까지 접근되지 않을 것입니다.

`HTMLElement`클래스는 새로운 요소를 초기화 하기 위해 인자 `name`와 인자 `text`를 가지는 초기화 하나를 제공합니다. 또한 그 클래스는 `HTMLElement`인스턴스가 메모리에서 해제될때 메시지 출력을 보여주는 해제를 정의합니다.

`HTMLElement`클래스를 생성하고 새로운 인스턴스를 출력하는 방법입니다.

```swift
var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
print(paragraph!.asHTML())
// Prints "<p>hello, world</p>"
```

> Note: 위의 paragraph변수는 옵셔널 HTMLElement로 정의되어 있으며, 아래에 강한 순환 참조의 존재를 보여주기 위해 nil로 설정 할 수 있습니다.

공교롭게도, `HTMLElement`클래스는 위에 작성된것 처럼, `HTMLElement`인스턴스와 asHTML값에 대한 클로저 사이에 강한 순환 참조가 만들어집니다. 여기에서, 어떻게 순환참조가 되는지를 봅니다.<br>

<center><img src="/img/posts/Swift_Programming_Language-27.png" width="700" height="500"></center> <br> 

인스턴스의 `asHTML`프로퍼티는 클로저에 강한 참조를 가지고 있습니다. 하지만, 클로저는 본문에서 `self`를 참조하기 때문에(`self.name`과 `self.text`를 참조하는 것과 같은 방법), 클로저는 `HTMLElement`인스턴스에 강한 참조를 가지고 있다는 것을 의미하며, `self`를 `캡쳐(captures)`합니다. (클로저에서의 캡쳐 값에 대한 자세한 정보는 [값 캡쳐하기(Capturing Values)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID103)를 보세요.

> Note: 비록 클로저가 self를 여러번 참조하더라도, HTMLElement인스턴스에 대해 하나의 강한 참조만을 가집니다.

`paragraph`변수에 `nil`을 설정하고 `HTMLElement`인스턴스에 강한 참조를 깨트려하면, 강한 순환 참조이기 때문에, `HTMLElement`인스턴스도 클로저도 메모리에서 해제 되지 않습니다.

```swift
paragraph = nil
```

`HTMLElement` 해제에서 `HTMLElement`인스턴스 메모리가 해제되었다는 것을 보여주는 메시지가 출력되지 않는 것을 기억하세요.

---

## Resolving Strong Reference Cycles for Closures

클로져와 클래스 인스턴스간에 강한 순환 참조를 해결하기 위해 클로져 정의에서 캡쳐 목록(capture list)을 정의합니다. 캡쳐 목록은 클로져 본문에 하나 이상의 참조 타입을 캡쳐할때 사용하는 규칙을 정의합니다. 두 클래스 인스턴스 사이에 강한 순환 참조 처럼, 강한 참조보다는 `weak` 또는 `unowned` 참조로 캡쳐되도록 선언합니다. 코드의 다른 부분간의 관계에 따라 `weak`또는 `unowned`와 어울리는 것을 선택합니다.

> Note: `Swift`는 클로져에서 `self`의 멤버를 참조할때마다 (그냥 `somePropery` 또는 `someMothod()`보다는) `self.someProperty` 또는 `self.someMethod()`를작성해야 합니다. 이것은 `self`를 캡쳐 가능하다는 것을 기억하는데 도움이 됩니다.


---

## Defining a Capture List 

캡쳐 목록의 각 항목들은 `weak` 또는 `unowned` 키워드와 연결됩니다.

캡쳐 목록의 각 항목은 클래스 인스턴스에 참조(`self`처럼)하거나 어떤 값으로 초기화된 변수(`delegate = self.delegate!` 처럼)에 `weak`나 `unowned` 키워드와 연결됩니다. 이것들은 대괄호(square braces `[]`) 쌍 안에 작성되며, 콤마(`,`)로 구분됩니다.

클로저의 매개변수 목록과 반환 타입 앞에 캡쳐 목록을 위치시킵니다.

```swift
lazy var someClosure: (Int, String) -> String = {
    [unowned self, weak delegate = self.delegate!] (index: Int, stringToProcess: String) -> String in
    // closure body goes here
}
```

클로저가 매개변수 목록이나 반환 타입을 지정하지 않으면 컨텍스트에 의해 추론되기 때문에, 캡쳐 목록은 클로저의 시작 부분에 위치하며, 뒤에 in 키워드를 붙여줍니다.

```swift
lazy var someClosure: () -> String = {
    [unowned self, weak delegate = self.delegate!] in
    // closure body goes here
}
```

---

## Weak and Unowned References

클로저와 인스턴스의 캡쳐가 항상 서로를 참조할때, 클로저에서 캡쳐를 `unowned` 참조로 정의하고, 항상 같은 시점에 메모리에서 해제될 것입니다.

반대로, 캡쳐된 참조가 나중에 `nil`이 될 수 있다면, 캡쳐를 `weak` 참조로 정의합니다. `Week` 참조는 항상 옵셔널 타입이고, 참조하는 인스턴스가 메모리에서 해제될때 `nil`이 됩니다. 이것은 클로저의 본문에서 참조하는 인스턴스가 존재하는지 확인 할 수가 있습니다.

캡쳐된 참조가 `nil`이 되지 않으면, 항상 `weak` 참조보다는 `unowned`참조로 캡쳐하는게 좋습니다.

`unowned` 참조는 이전의 `HTMLElement` 에제에서 강한 순환 참조를 해결하는데 적절한 캡쳐 방법입니다. 순환을 피하기 위해 `HTMLElement`클래스를 작성하는 방법은 다음과 같습니다.

```swift
class HTMLElement {
    
    let name: String
    let text: String?
    
    lazy var asHTML: () -> String = {
        [unowned self] in
        if let text = self.text {
            return "<\(self.name)>\(text)</\(self.name)>"
        } else {
            return "<\(self.name) />"
        }
    }
    
    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }
    
    deinit {
        print("\(name) is being deinitialized")
    }
    
}
```

`HTMLElement`의 구현은 `asHTML`클로저의 캡쳐 목록을 추가 외에는, 이전의 구현과 동일합니다. 이 경우, 캡쳐 목록은 `강한(strong)` 참조 대신 `unowned` 참조로 캡쳐합니다.를 의미하는,`[unowned self]`입니다.

이전처럼 `HTMLElement`인스턴스를 생성하고 출력 할 수 있습니다.

```swift
var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
print(paragraph!.asHTML())
// Prints "<p>hello, world</p>"
```

여기에서, 캡쳐목록을 참조하는 자리를 보여줍니다.

<center><img src="/img/posts/Swift_Programming_Language-28.png" width="700" height="500"></center> <br> 

이번에는, 클로저에 의한 `self`의 캡쳐는 `unowned`참조이고, 캡쳐된 `HTMLElement`인스턴스를 강하게(strong) 유지하고 있지 않습니다. `paragraph`변수의 강한 참조를 `nil`로 설정하면, `HTMLElement`인스턴스는 메모리에서 해제되며, 아래 예제에서 처럼 메모리에서 해제 되었다는 메시지를 볼 수 있습니다.

```swift
paragraph = nil
// Prints "p is being deinitialized"
```

캡쳐 목록에 대한 더 자세한 정보는 [캡쳐 목록(Capture Lists)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID544)을 보세요

---

