---
layout:     post
title:      "Swift. 정리하기 15"
subtitle:   "Swift Language Guide-Optional Chaining"
date:       2018-04-13 13:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Optional Chaining](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-ID245)<br>
[까칠코더님 블로그](http://kka7.tistory.com/22?category=919617)

---

## Optional Chaining

옵셔널 체이닝(Optional chaining)은 현재 옵셔널이 nil이 될 수 있는 프로퍼티, 메소드, 서브스크립트를 조회하고 호출하는 과정입니다. 옵셔널 체이닝에 값이 있으면, 프로퍼티, 메소드, 스크립트 호출은 성공합니다. 옵셔널이 nil이면, 프로퍼티, 메소드, 스크립트 호출은 nil을 반환합니다. 여러개를 함께 연결 할 수 있고, 연결된 어떤 링크가 nil이면, 전체 체인(chain)은 실패하게 됩니다.

> Note: Swift에서 옵셔널 체이닝은 Objective-C에서 nil에 메시지 보내는것과 비슷하지만, 모든 타입에 적합한 방법이고 성공이나 실패를 확인 할 수 있습니다.

---

## Optional Chaining as an Alternative to Forced Unwrapping

옵셔널이 `nil`이 아닌 경우, 호출하길 원하는 프로퍼티, 메소드, 서브스크립트 옵셔널 값 뒤에 물음표(?)를 붙여서 옵셔널 체이닝을 지정합니다. 이것은 값을 강제로 언래핑하기 위해 옵셔널 값 뒤에 느낌표(!)를 붙이는 것과 매우 비슷합니다. 중요한 차이점은 옵셔널 체이닝은 옵셔널이 nil일때 우아하게 실패하며, 반면에 강제 언래핑은 옵셔널이 nil일때 실시간 오류가 발생합니다.

이러한 사실을 반영하기 위해 옵셔널 체이닝은 `nil`값을 호출 할수 있으며, 옵셔널 체이닝 호출의 결과는 항상 옵셔널 값이며, 심지어는 프로퍼티, 메소드, 서브스크립트 조회하여 옵셔널이 아닌 값을 반환하더라도 마찬가지 입니다. 옵셔널 반환 값을 옵셔널 체이닝 호출이 성공하거나(반환된 옵셔널이 값을 가지고 있음) `체인(chain)`에서 `nil` 값으로 인해 성공하지 못했는지(반환된 옵셔널이 값이 nil) 확인하기 위해 사용 할 수 있습니다.

특히, 옵셔널 체이닝 호출의 결과는 예상한 반환 값과 같은 타입이지만, 옵셔널로 래핑되어 있습니다. 옵셔널 체이닝으로 접근할때, 일반적으로 Int을 반환하는 프로퍼티는 Int?을 반환합니다.

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

`Person`인스턴스를 새로 생성하면, `residence`프로퍼티는 옵셔널이므로 기본적으로 nil로 초기화 됩니다. 아래 코드에서, john은 residence프로퍼티가 nil 값을 가집니다.

```swift
let john = Person()
```

사람의 `residence`의 numberOfRooms프로퍼티에 접근하면, 값을 언래핑하기 위해 `residence`뒤에 `느낌표(!)`를 붙이면, 언래핑하기 위한 `residence`값이 없기 때문에, 실시간 오류가 발생 할 것입니다.

```swift
let roomCount = john.residence!.numberOfRooms // this triggers a runtime error
```

`john.residence`가 nil이 아닌 값이고 roomCount가 적절한 방의 갯수를 가지는Int값을 설정 할때, 위의 코드는 성공합니다. 하지만, 이 코드는 위에서 보는 것처럼, `residence`가 nil일때, 항상 실시간 오류가 발생합니다.

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

`numberOfRooms`에 접근을 시도하는 것은 실패할 가능성이 있기 때문에, 옵셔널 체이닝은 Int? 타입의 값이나 옵셔널 Int값을 반환 하려고 합니다. 위의 예제처럼, residence가 nil일때, 옵셔널 Int는 nil이 될 것이며, numberOfRooms에 접근하는 것이 가능하지 않다는 사실을 알려줍니다. 옵셔널 Int는 정수를 언래핑하기 위해 옵셔널 바인딩을 사용하고 roomCount변수에 옵셔널이 아닌 값을 할당합니다.

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

