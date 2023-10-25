---
layout:     post
title:      "Swift. 정리하기 15: Swift Language Guide-Optional Chaining"
subtitle:   "Swift Language Guide-Optional Chaining"
date:       2018-04-13 13:35:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/deer-643340.jpg
thumbnail-img: /assets/post_img/background/deer-643340.jpg
share-img: /assets/post_img/background/deer-643340.jpg
toc: true
---

최종 수정일: 2018.10.1

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Optional Chaining](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-ID245)<br>
[까칠코더님 블로그](http://kka7.tistory.com/122?category=919617)

---

## Optional Chaining

옵셔널 체이닝(Optional chaining)은 현재 옵셔널이 nil이 될 수 있는 프로퍼티, 메소드, 서브스크립트를 조회하고 호출하는 과정입니다. 옵셔널 체이닝에 값이 있으면, 프로퍼티, 메소드, 스크립트 호출은 성공합니다. 옵셔널이 nil이면, 프로퍼티, 메소드, 스크립트 호출은 nil을 반환합니다. 여러개를 함께 연결 할 수 있고, 연결된 어떤 링크가 nil이면, 전체 체인(chain)은 실패하게 됩니다.

> Note: Swift에서 옵셔널 체이닝은 Objective-C에서 nil에 메시지 보내는것과 비슷하지만, 모든 타입에 적합한 방법이고 성공이나 실패를 확인 할 수 있습니다.

---

## Optional Chaining as an Alternative to Forced Unwrapping

옵셔널이 `nil`이 아닌 경우, 호출하길 원하는 프로퍼티, 메소드, 서브스크립트 옵셔널 값 뒤에 물음표(`?`)를 붙여서 옵셔널 체이닝을 지정합니다. 이것은 값을 강제로 언래핑하기 위해 옵셔널 값 뒤에 느낌표(`!`)를 붙이는 것과 매우 비슷합니다. 중요한 차이점은 옵셔널 체이닝은 옵셔널이 nil일때 우아하게 실패하며, 반면에 강제 언래핑은 옵셔널이 nil일때 실시간 오류가 발생합니다.

이러한 사실을 반영하기 위해 옵셔널 체이닝은 `nil`값을 호출 할수 있으며, 옵셔널 체이닝 호출의 결과는 항상 옵셔널 값이며, 심지어는 프로퍼티, 메소드, 서브스크립트 조회하여 옵셔널이 아닌 값을 반환하더라도 마찬가지 입니다. 옵셔널 반환 값을 옵셔널 체이닝 호출이 성공하거나(반환된 옵셔널이 값을 가지고 있음) `체인(chain)`에서 `nil` 값으로 인해 성공하지 못했는지(반환된 옵셔널이 값이 nil) 확인하기 위해 사용 할 수 있습니다.

특히, 옵셔널 체이닝 호출의 결과는 예상한 반환 값과 같은 타입이지만, 옵셔널로 래핑되어 있습니다. 옵셔널 체이닝으로 접근할때, 일반적으로 Int을 반환하는 프로퍼티는 `Int?`을 반환합니다.

다음 일부 코드 부분은 강제 언래핑과 옵셔널 체이닝이 어떻게 다른지 보여주고 성공을 확인하는 것이 가능합니다.

첫번째, `Person`과 `Residence`클래스 두개를 정의하였습니다.

```swift
class Person {
    var residence: Residence?
}
 
class Residence {
    var numberOfRooms = 1
}
```

`Residence` 인스턴스는 1을 기본값으로 하는 하나의 Int프로퍼티 numberOfRooms를 가지고 있습니다. `Person`인스턴스는 Residence?타입의 residence 옵셔널 프로퍼티 하나를 가지고 있습니다.

`Person`인스턴스를 새로 생성하면, `residence`프로퍼티는 옵셔널이므로 기본적으로 `nil`로 초기화 됩니다. 아래 코드에서, `john`은 `residence`프로퍼티가 `nil` 값을 가집니다.

```swift
let john = Person()
```

사람의 `residence`의 `numberOfRooms`프로퍼티에 접근하면, 값을 언래핑하기 위해 `residence`뒤에 `느낌표(!)`를 붙이면, 언래핑하기 위한 `residence`값이 없기 때문에, 런타임 오류가 발생 할 것입니다.

```swift
let roomCount = john.residence!.numberOfRooms // this triggers a runtime error
```

`john.residence`가 nil이 아닌 값이고 roomCount가 적절한 방의 갯수를 가지는 `Int`값을 설정 할때, 위의 코드는 성공합니다. 하지만, 이 코드는 위에서 보는 것처럼, `residence`가 nil일때, 항상 실시간 오류가 발생합니다.

`옵셔널 체이닝(Optional chaining)`은 numberOfRooms 값에 접근하는 방법을 제공합니다. 옵셔널 체이닝을 사용하기 위해, 느낌표(`!`)위치에 물음표(`?`)를 사용합니다

```swift
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("Unable to retrieve the number of rooms.")
}
// Prints "Unable to retrieve the number of rooms."
```

Swift는 `residence`옵셔널 프로퍼티에서 체인(chain)은 residence가 존재하면 numberOfRooms의 값을 가져오는 것을 말합니다.

`numberOfRooms`에 접근을 시도하는 것은 실패할 가능성이 있기 때문에, 옵셔널 체이닝은 `Int?` 타입의 값이나 옵셔널 `Int`값을 반환 하려고 합니다. 위의 예제처럼, `residence`가 `nil`일때, 옵셔널 `Int`는 `nil`이 될 것이며, `numberOfRooms`에 접근하는 것이 가능하지 않다는 사실을 알려줍니다. 옵셔널 Int는 정수를 언래핑하기 위해 옵셔널 바인딩을 사용하고 roomCount변수에 옵셔널이 아닌 값을 할당합니다.

심지어 numberOfRooms이 옵셔널이 아닌 Int라는 사실을 주의합니다. 사실 옵셔널 체인을 통해 조회되는 numberOfRooms호출은 언제나 Int대신 Int?를 반환할 것입니다.

Residence인스턴스를 `john.residence`에 할당 할 수 있으며, 더 이상 `nil`이 아닙니다.

```swift
john.residence = Residence()
```

`john.residence`가 `nil`이 아닌 실제 Residence인스턴스를 포함한다. 이전처럼 같은 옵셔널 체이닝으로 numberOfRooms에 접근하려면, 이제는 기본으로 1의 값을 가지는 numberOfRooms 값을 포함한 Int?를 반환할 것입니다.

```swift
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("Unable to retrieve the number of rooms.")
}
// Prints "John's residence has 1 room(s)."
```

---

## Defining Model Classes for Optional Chaining

프로퍼티, 메소드 서브스크립트 호출에 한 단계 이상의 옵셔널 체이닝을 사용할 수 있습니다. 이것은 연관된 타입의 복잡한 모델에서 하위프로퍼티로 내려가는 것이 가능하고, 이러한 하위프로퍼티에서 프로퍼티, 메소드, 서브스크립트를 접근할수 있는지 검사하는게 가능합니다.

아래 코드 부분은 다음 예제에서 사용할 4개의 모델 클래스를 정의 하며, 여러 단계(multilevel)의 옵셔널 체인의 예제를 포함합니다. 이 클래스는 Person과 위에서 Room과 Address클래스를 추가하고 관련된 프로퍼티, 메소드, 서브스크립트로 Residence 모델을 확장하였습니다.

`Person`클래스는 이전과 같은 방식으로 정의되어 있습니다.

```swift
class Person {
    var residence: Residence?
}
```

`Residence` 클래스는 이전보다 더 복잡합니다. 이번에는 `Residence` 클래스는 `[Room]` 타입의 빈 배열로 초기화된 변수 프로퍼티 rooms를 정의합니다.

```swift
class Residence {
    var rooms = [Room]()
    var numberOfRooms: Int {
        return rooms.count
    }
    subscript(i: Int) -> Room {
        get {
            return rooms[i]
        }
        set {
            rooms[i] = newValue
        }
    }
    func printNumberOfRooms() {
        print("The number of rooms is \(numberOfRooms)")
    }
    var address: Address?
}
```

`Residence`의 이번 버젼은 `Room`인스턴스의 배열을 저장하기 때문에, `numberOfRooms`프로퍼티는 저장 프로퍼티가 아닌 게산(`computed`) 프로퍼티로 구현됩니다. 계산된 `numberOfRooms` 프로퍼티는 단순히 `rooms` 배열에서 `count` 프로퍼티의 값을 반환 합니다.

`rooms` 배열을 쉽게 접근하도록, `Residence`의 이번 버젼은 요청된 인덱스에 있는 `rooms` 배열의 `room`을 사용하는 읽기-쓰기(`read-write`) 서브스크립트를 제공합니다.

또한, 이번 버젼의 `Residence`는 단순히 숙소(`residence`)에 있는 방의 갯수를 출력하는 메소드 `printNumberOfRooms`를 제공합니다.

마지막으로, `Residence`는 `Address?`의 타입인 옵셔널 프로퍼티 `address`를 정의합니다. 이 프로퍼티에 대한 `Address` 클래스 타입은 아래에 정의되어 있습니다.

`rooms`배열에 대해 사용된 `Room`클래스는 한개의 프로피티 `name`가 있는 간단한 클래스 이고, 초기화는 방의 이름에 맞게 프로퍼티를 설정합니다.

```swift
class Room {
    let name: String
    init(name: String) { self.name = name }
}
```

이 모델에서 마지막 클래스는 `Address`입니다. 이 클래스는 `String?`타입인 3개의 옵셔널 프로퍼티를 가지고 있습니다. 처음 프로퍼티 2개 `buildingName`과 `buildingNumber`는, 특정 건물을 주소처럼 식별하는 방법입니다. 세번째 프로퍼티 `street`는 주소에 대한 거리 이름으로 사용됩니다.

```swift
class Address {
    var buildingName: String?
    var buildingNumber: String?
    var street: String?
    func buildingIdentifier() -> String? {
        if let buildingNumber = buildingNumber, let street = street {
            return "\(buildingNumber) \(street)"
        } else if buildingName != nil {
            return buildingName
        } else {
            return nil
        }
    }
}
```

Address 클래스는 String?타입을 반환하는 메소드 buildingIdentifier()를 제공합니다. 이 메소드는 주소의 프로퍼티들을 검사하고 buildingName이 값을 가지고 있으면 반환하거나, street 둘다 값을 가지고 있는 경우에, buildingNumber과 street를 연결시키거나, 그렇지 않으면 nil을 반환합니다..

---

## Accessing Properties Through Optional Chaining

[강제 언래핑 대신 옵셔널 체이닝(Optional Chaining as an Alternative to Froced Unwrapping)](https://docs.swift.org/swift-book/LanguageGuide/OptionalChaining.html#ID246) 에서 설명했던 것처럼, 옵셔널 체이닝을 옵셔널 값으로 된 프로퍼티에 접근하는데 사용할 수 있고, 프로퍼티 접근이 성공하는지 검사할 수 있습니다.

새로운 Person 인스턴스를 생성하기 위해, 위에서 정의된 클래스를 사용하고, 이전 처럼 numberOfRooms 프로퍼티에 접근을 시도합니다.

```swift
let john = Person()
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("Unable to retrieve the number of rooms.")
}
// Prints "Unable to retrieve the number of rooms."
```

`john.residence`가 `nil`이기 때문에, 이전처럼, 옵셔널 체이닝 호출은 실패합니다.

옵셔널 체이닝으로 프로퍼티의 값을 설정할 수 있습니다.

```swift
let someAddress = Address()
someAddress.buildingNumber = "29"
someAddress.street = "Acacia Road"
john.residence?.address = someAddress
```

예제에서, `john.residence`가 현재 nil이기 때문에, `john.residence`의 `address`프로퍼티를 설정하는 것은 실패할 것입니다.

할당하는 것은 옵셔널 체이닝의 일부이며, `=` 연산자의 오른쪽에 있는 코드는 처리되지 않는 것을 의미합니다. 이전 예제에서, 상수에 접근하는 것은 부작용이 없기 때문에, `someAddress`가 처리되지 않는 것을 보는것은 쉽지 않습니다. 아래 목록은 동일한 할당을 하지만, 주소를 생성하는 함수를 사용합니다. `=`연산자의 오른쪽이 처리가 되었는지 확인할 수 있는, 그 함수는 값을 반환하기 전에 함수가 호출됨(Function was called)을 출력합니다.

```swift
func createAddress() -> Address {
    print("Function was called.")

    let someAddress = Address()
    someAddress.buildingNumber = "29"
    someAddress.street = "Acacia Road"

    return someAddress
}
john.residence?.address = createAddress()
```

아무것도 출력되지 않았기때문에, createAddress()함수가 호출되지 않음을 알 수 있습니다.


---

## Calling Methods Through Optional Chaining


옵셔널 값에서 메소드를 호출하기 위해 옵셔널 체이닝을 사용할 수 있고, 메소드 호출이 성공했는지 확인할 수 있습니다. 반환 값을 정의하지 않은 메소드도 가능합니다.

`Residence`클래스에서 `printNumberOfRooms()` 메소드는 `numberOfRooms`의 현재 값을 출력합니다. 메소드는 다음과 같습니다.

```swift
func printNumberOfRooms() {
    print("The number of rooms is \(numberOfRooms)")
}
```

이 메소드는 반환 값을 지정하지 않았습니다. 하지만, 반환 타입이 없는 함수와 메소드는 암시적으로 Void 반환타입을 가지며, [반환 값 없는 함수(Functions Without Return Values)](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#ID163)에 설명되어 있습니다. 이것은 ()의 값 또는 빈 튜플을 반환하는 것을 의미합니다.

옵셔널 값에서 옵셔널 체이닝으로 메소드를 호출하는 경우, 옵셔널 체이닝을 이용해서 호출할때의 반환 값은 항상 옵셔널 타입이기 때문에, 메소드의 반환 타입은 `Void`가 아니라 `Void?`가 될것입니다. 이것은 `if`문으로 `printNumberOfRooms()` 메소드 호출이 가능한지 검사 하는것이 가능하며 심지어는 반환 값이 정의되지 않은 메소드에서 가능합니다. 메소드 호출이 성공했는지 보기 위해, `printNumberOfRooms` 호출의 반환 값이 `nil`인지 비교합니다.

```swift
if (john.residence?.address = someAddress) != nil {
    print("It was possible to set the address.")
} else {
    print("It was not possible to set the address.")
}
// Prints "It was not possible to set the address."
```

---

## Accessing Subscripts Through Optional Chaining

옵셔널 값으로된 서브스크립트의 값을 가져오고 설정하고 서브스크립트 호출이 성공인지 확인하기 위해, 옵셔널 체이닝을 사용할 수 있습니다.

> Note: 옵셔널 값에서 옵셔널 체이닝으로 서브스크립트에 접근할때, 서브스크립트 대괄호 앞에(before) 물음표(`?`)를 붙입니다. 옵셔널 체이닝의 물음표는 항상 옵셔널 표현식 바로 뒤에 표시해야 합니다.

아래 예제는 `Residence` 클래스에서 정의된 서브스크립트 `john.residence` 프로퍼티의 `rooms` 배열에서 첫번째 방의 이름을 가져오려고 합니다. `john.residence`는 현재 `nil`이기 때문에, 서브스크립트 호출은 실패합니다.

```swift
if let firstRoomName = john.residence?[0].name {
    print("The first room name is \(firstRoomName).")
} else {
    print("Unable to retrieve the first room name.")
}
// Prints "Unable to retrieve the first room name."
```

`john.residence`는 옵셔널 체이닝을 시도시 옵셔널 값이기 때문에, 서브스크립트에서 옵셔널 체이닝 물음표는 `john.residence` 바로 뒤에 위치시키고, 서브스크립트 대괄호 앞에 위치이킵니다.

비슷하게, 옵셔널 체이닝으로 서브스크립트에 새 값을 설정할 수 있습니다

```swift
john.residence?[0] = Room(name: "Bathroom")
```

서브스크립트 설정이 실패하기 때문에, `residence`는 현재 `nil`입니다.

`john.residence`에 `Residence` 인스턴스를 생성하고 할당하는 경우, `rooms` 배열에서 하나이상의 `Room`인스턴스에서, 옵셔널 체이닝으로 `rooms` 배열에서 실제 항목들을 접근하기 위해 `Residence` 서브스크립트를 사용할 수 있습니다

---

## Accessing Subscripts of Optional Type

서브스크립트가 옵셔널 타입(Swift의 Dictionary 타입의 서브스크립트 키)의 값을 반환하는 경우 물음표(?)는 옵셔널 반환 값에 연결하기 위해(chain) 서브스크립트의 닫힌 대괄호 뒤에(after) 위치시킵니다.

```swift
var testScores = ["Dave": [86, 82, 84], "Bev": [79, 94, 81]]
testScores["Dave"]?[0] = 91
testScores["Bev"]?[0] += 1
testScores["Brian"]?[0] = 72
// the "Dave" array is now [91, 82, 84] and the "Bev" array is now [80, 94, 81]
```

위 예제에서 `String` 키(`key`)와 `Int` 값(`values`)의 배열을 맵핑하는 두개의 `key-value` 쌍을 포함하는 딕셔너리 `testScores`가 정의되었습니다. 예제에서 "Dave"배열의 첫번째 항목에 91을 설정하기 위해; "Bev"배열의 첫번째 항목에 1증기시키기 위해; "Brian"의 키에 대한 배열의 첫번째 항목을 설정하기 위해 옵셔널 체이닝을 사용합니다. testScores 딕셔너리는 "Dave"와 "Dev" 키를 포함하고 있기 때문에, 처음 두 호출이 성공합니다. testScores 딕셔너리는 "Brian"에 대한 키를 포함하지 않기 때문에, 세번째 호출은 실패합니다.

---

## Linking Multiple Levels of Chaining

모델에서 프로퍼티, 메소드, 서브스크립트를 찾아가기 위해(drill down) 옵셔널 체이닝의 여러 단계를 함께 연결할 수 있습니다. 하지만, 옵셔널 체이닝의 여러 단계는 반환된 값에 더 이상의 옵셔널 단계를 추가하지 않습니다.

달리 말하면:

- 갸져오려는 타입이 옵셔널이 아닌 경우에, 옵셔널 체이닝에 의해 옵셔널이 될것 입니다.
- 가져오려는 타입이 이미(`already`) 옵셔널인 경우에, 체이닝에 의해 더 이상(`more`) 옵셔널이 아니게 됩니다.

따라서:

- 옵셔널 체이닝에 의해 `Int` 값을 가져오려고 하는 경우, 얼마나 많은 체이닝이 사용되었는지와 상관없이, `Int?`는 항상 반환됩니다.
- 비슷하게, 옵셔널 체이닝으로 `Int?` 값을 가져오려고 하는 경우, 얼마나 많은 체이닝이 사용되었는지와 상관없이, `Int?`는 항상 반환됩니다.


아래 예제는 `john`의 `residence`프로퍼티에 `address`프로퍼티에 `street`프로퍼티에 접근하기 위해 시도합니다. 여기에서 둘다 옵셔널 타입인 `residence`와 `address`프로퍼티 체인으로, 옵셔널 체이닝의 두 단계가 사용됩니다.

```swift
if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \(johnsStreet).")
} else {
    print("Unable to retrieve the address.")
}
// Prints "Unable to retrieve the address."
```

`john.residence`의 값은 현재 유효한 `Residence` 인스턴스가 포함되어 있습니다. 하지만, `john.residence.address`는 현재 `nil`입니다. 이 때문에, `john.residence?.address?.street `호출이 실패합니다.

위 예제에서, `street` 프로퍼티의 값을 가져오기 위해 시도하는 것을 주의합니다. 프로퍼티의 타입은 `String?` 입니다. 옵셔널 체이닝의 2단계는 프로퍼티의 옵셔널 타입을 기반으로 추가적으로 적용됨에도 불구하고, `john.residence?.address?.street`의 반환 값은 String?입니다.

실제 `Address` 인스턴스를 `john.residence.address`에 대한 값으로 설정하고, 주소의 `street`프로퍼티에 대한 실제 값을 설정하는 경우, 여러 단계의 옵셔널 체이닝을 통해 `street`프로퍼티의 값을 접근 할 수 있습니다.

```swift
let johnsAddress = Address()
johnsAddress.buildingName = "The Larches"
johnsAddress.street = "Laurel Street"
john.residence?.address = johnsAddress

if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \(johnsStreet).")
} else {
    print("Unable to retrieve the address.")
}
// Prints "John's street name is Laurel Street."
```

이 예제에서, john.residence의 값은 현재 유효한 Address인스턴스를 포함하고 있기 때문에, john.residence의 address프로퍼티에 접근하는것은 성공할 것입니다.

---

## Chaining on Methods with Optional Return Values

이전 예제는 옵셔널 체이닝을 사용하여 옵셔널 타입의 프로퍼티의 값을 어떻게 가져오는지를 보았습니다. 옵셔널 체이닝을 옵셔널 타입의 값을 반환하는 메소드를 호출하고, 필요에 따라, 메소드의 반환값을 연결(chain)하기 위해 사용할 수 있습니다.

아래 예제는 옵셔널 체이닝을 통해서 `Address` 클래스의 `buildingIdentifier()` 메소드를 호출합니다. 이 메소드는 String? 타입의 값을 반환합니다. 위에서 설명했던 것처럼, 옵셔널 체이닝 뒤에 메소드의 궁극적인(ultimate) 반환 타입은 `String?` 입니다.

```swift
if let buildingIdentifier = john.residence?.address?.buildingIdentifier() {
    print("John's building identifier is \(buildingIdentifier).")
}
// Prints "John's building identifier is The Larches."
```

이 메소드의 반환 값에 추가적으로 옵셔널 체이닝을 수행하길 원하는 경우, 옵셔널 체이닝 물음표(?)는 메소드의 괄호 뒤(after)에 위치시킵니다.

```swift
if let beginsWithThe =
    john.residence?.address?.buildingIdentifier()?.hasPrefix("The") {
    if beginsWithThe {
        print("John's building identifier begins with \"The\".")
    } else {
        print("John's building identifier does not begin with \"The\".")
    }
}
// Prints "John's building identifier begins with "The"."
```

> Note: 위의 예제에서, 옵셔널 값이 `buildingIdentifier() `메소드의 반환 값으로 체이닝 되고, `buildingIdentifier()` 메소드 자체가 아니기 때문에, 옵셔널 체이닝 물음표(`?`)를 괄호 뒤에 위치시킵니다.

---












