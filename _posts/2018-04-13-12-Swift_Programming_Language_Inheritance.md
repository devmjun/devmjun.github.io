---
layout:     post
title:      "Swift. 정리하기 13"
subtitle:   "Swift Language Guide-Inheritance *"
date:       2018-04-13 10:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Reference  

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Inheritance](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-ID193)<br>
[까칠코더님 블로그](http://kka7.tistory.com/119?category=919617)

---

## Inheritance

클래스는 다른 클래스로부터 메소드, 프로퍼티, 다른 특징들을 `상속(inherit)` 받을수 있습니다. 다른 클래스로 부터 상속받을때 상속받는 클래스를 `서브클래스(subclass)`라고 하고, 상속하는 클래스를 `슈퍼클래스(superclass)`라고 합니다. Swift에서 상속은 다른 타입으로 부터 클래스를 차별화하는 기본적인 동작입니다.

Swift에서 클래스는 슈퍼클래스에 속해있는 메소드, 프로퍼티, 서브스크립트를 호출하고 사용할수 있고 이를 개선하고 수정하기 위해 해당 메소드, 프로퍼티, 서브스크립트의 오버라이딩(overriding) 버전을 제공할 수 있습니다. Swift는 오버라이드 정의와 슈퍼클래스 정의가 일치하는지 확인해서 오버라이드가 정확한지를 보장하는데 도움을 줍니다.

클래스는 프로퍼티의 값이 변경됬을때 통지받기 위해서 상속된 프로퍼티에 프로퍼티 옵져버를 추가할수 있습니다. 프로퍼티 옵져버는 원래 저장(stored) 또는 계산(computed) 프로퍼티로 정의된것과 상관없이 모든 프로퍼티에 대해서 추가될수 있습니다.

---

## Defining a Base Class

다른 클래스로 부터 상속받지 않는 모든 클래스를 `기본 클래스(base class)`라고 합니다.

> Note: Swift 클래스는 보편적인 기본 클래스로부터 상속받지 않습니다. 클래스는 정의합니다. 여러분이 만드는 클래스에 슈퍼클래스(superclass)를 지정하지 않고 정의하면 자동으로 기본 클래스가 됩니다.

기본 클래스 `Vehicle`를 정의합니다. 이 기본 클래스는 저장 프로퍼티 `currentSpeed`를 기본값 0.0(Double프로퍼티 타입으로 추정) 으로 정의합니다. currentSpeed프로퍼티의 값은 탈것에 대한 설명을 만들기 위해, 읽기 전용(read-only) 계산 String프로퍼티 description로 사용됩니다.

Vehicle 기본 클래스는 makeNoise 메소드를 정의합니다. 이 메소드는 실제적으로 기본 Vehicle인스턴스에 대해 아무것도 하지 않지만, Vehicle의 서브클래스에 의해 사용자 정의될것 입니다.

```swift
class Vehicle {
    var currentSpeed = 0.0
    var description: String {
        return "traveling at \(currentSpeed) miles per hour"
    }
    func makeNoise() {
        // do nothing - an arbitrary vehicle doesn't necessarily make a noise
    }
}
```

`초기화 문법(initializer syntax)`으로 타입 이름과 비어 있는 괄호(parentheses ())로 작성한 Vehicle의 새로운 인스턴스를 생성합니다.

```swift
let someVehicle = Vehicle()
```

새롭게 Vehicle 인스턴스를 생성하면, 탈것(vehicle)의 현재 속도에 대해 사람이 읽을수있는(human-readable) 설명을 출력하기 위해 description프로퍼티를 사용할수 있습니다.

```swift
print("Vehicle: \(someVehicle.description)")
// Vehicle: traveling at 0.0 miles per hour
```

`Vechicle`클래스는 임의의 탈것에 대한 공통 특징을 정의하지만, 그 자체로 사용하지는 않습니다. 더 유용하게 만들기 위해, 탈것의 구체적인 종류를 설명하기 위해 개선하는 것이 필요합니다.

---

## Overriding

서브클래스(subclass)는 인스턴스 메소드, 타입 메소드, 인스턴스 프로퍼티, 타입 프로퍼티 또는 서브스크립트를 슈퍼클래스로(superclass)부터 상속받은 것과 다르게 사용자정의 구현을 제공할 수 있습니다. 이것을 `오버라이딩(overriding)`이라고 합니다.

오버라이드 하는것은 상속된 것과 다른 특성이 되며, `override`키워드를 접두사로 붙여 오버라이딩하는 것을 정의합니다. 그렇게 하는것은 실수로 오버라이드를 제공하고 일치하는 정의를 제공하지 않는 것이 명확해집니다. 예기치않는 동작으로 발생한 오버라이딩(overriding)과 override키워드 없는 모든 오버라이드는 컴파일할때 오류로 진단됩니다.

override 키워드는 Swift컴파일러가 오버라이딩 클래스의 슈퍼클래스(또는 부모)가 가지는 정의와 오버라이드에 제공된 것과 일치하는지 확인하도록 요청합니다. 이 검사는 오버라이딩 정의가 올바른지 확인합니다.

### - Accessing Superclass Methods, Properties, and Subscripts

`서브클래스(subclass)`에 대해 메소드, 프로퍼티 서브스크립트(subscript)의 오버라이드를 제공할때, 가끔 기존 슈퍼클래스(superclass) 구현의 일부를 오버라이드해서 사용하는 것이 유용할때가 있습니다. 예를들어, 기존 구현된 동작을 개선하거나 기존의 상속된 변수에 수정된 값을 저장할 수 있습니다.

이것이 적절한 경우에, `super` 접두사를 사용해서 `슈퍼클래스(superclass)` 버전의 메소드, 프로퍼티, 서브스크립트를 사용할수 있습니다.

- 오버라이딩(overriding) 메소드 구현에서 오버라이드된(overridden) 메소드 someMothod()는 super.someMethod()으로 슈퍼클래스 버젼의 someMothod()를 호출할 수 있습니다.
- 오버라이딩(overriding) getter나 setter 구현에서 오버라이드된(overridden) 프로퍼티 someProperty는 super.someProperty로 슈퍼클래스 버젼의 someProperty를 사용할 수 있습니다.
- `오버라이딩(overriding)` 서브스크립트(subscript) 구현에서 `super[someIndex]`로 슈퍼클래스 버젼의 같은 서브스크립트를 사용할 수 있습니다.

### - Overriding Methods

서브클래스(subclass)에 알맞는(tailored) 메소드나 메소드의 다른 구현을 제공하기 위해 상속된 인스턴스나 타입 메소드를 재정의 할수 있습니다.

다음 예제는 `Vehicle`으로부터 상속받은 Train의 makeNoise()메소드를 오버라이드 하는, Vechicle의 새로운 서브클래스 Train을 정의합니다.

```swift
class Train: Vehicle {
    override func makeNoise() {
        print("Choo Choo")
    }
}
```

Train의 인스턴스를 새로 만들고 makeNoise()메소드를 호출하면, Train서브클래스 버젼의 메소드가 호출된 것을 볼수 있습니다.

```swift
let train = Train() train.makeNoise() // Prints "Choo Choo
```

### - Overriding Properties

프로퍼티에 대한 사용자정의 getter, setter를 제공하기 위해 상속된 인스턴스나 타입 프로퍼티를 오버라이드 할 수 있거나, 기본 프로퍼티 값이 변할때 감지하기 위해 프로퍼티 오버라이딩이 가능하도록 `프로퍼티 옵져버를` 추가할수 있습니다.

### - Overriding Property Getters and Setters

상속된 어떤 프로퍼티를 오버라이드 하기 위해 사용자정의 getter(setter에 어울린다면)를 제공할수 있으며, 상속된 프로퍼티가 소스에서 저장프로퍼티나 계산 프로퍼티로 구현되었는지 상관하지 않는다. 상속된 프로퍼티의 저장 또는 계산 속성은 서브클래스는 알지 못한다. - `오직 상속된 프로퍼티의 이름과 타입을 알고 있다`. 슈퍼클래스의 프로퍼티와 이름과 타입이 오버라이드와 일치하는지 확인 하는 것을 컴파일러가 가능하도록, `언제나 프로퍼티의 타입과 이름 모두 오버라이딩해야 한다.`

상속된 읽기 전용(read-only) 프로퍼티를 서브클래스 프로퍼티 오버라이드에서 getter과 setter 모두 제공해서 읽기 쓰기(read-write) 프로퍼티로 표시할 수 있습니다. 하지만, 상속된 읽기 쓰기(read-write) 프로퍼티를 읽기 전용(read-only) 프로퍼티로 표시할 수는 없습니다.

> Note: `프로퍼티 오버라이드의 일부로 setter를 제공하게 되면 오버라이드에서 반드시 getter도 제공해야 합니다. `getter 오버라이딩에서 상속된 프로퍼티의 값을 수정하지 않는 경우에, getter에서 super.someProperty으로 반환해서 단순히 상속된 값을 전달 할수 있으며, somePropery는 오버라이딩 하는 프로퍼티의 이름입니다.

다음 예제는 Vechicle의 서브클래스인 새로운 클래스 Car를 정의합니다. Car 클래스는 정수형 값 1을 기본으로하는 새로운 저장 프로퍼티 gear를 도입합니다. Car 클래스는 현재 기어(gear)를 포함하는 사용자정의 설명을 제공하기 위해 Vechicle로부터 상속한 description프로퍼티를 오버라이드 합니다.

```swift
class Car: Vehicle {
    var gear = 1
    override var description: String {
        return super.description + " in gear \(gear)"
    }
}
```

`description` 프로퍼티 오버라이드는 Vehicle클래스의 description프로퍼티를 반환하는 `super.description`으로 시작합니다. Car클래스의 description 버젼은 현재 기어(gear)에 관한 정보를 제공하기 위해 설명의 끝부분에 여분의 텍스트를 추가합니다.

Car클래스의 인스턴스를 생성하고 gear와 currentSpeed프로퍼티를 설정하면, description프로퍼티가 Car클래스에 정의된 것과 꼭 맞는 설명을 반환 하는 것을 볼수 있습니다.

```swift
let car = Car()
car.currentSpeed = 25.0
car.gear = 3
print("Car: \(car.description)")
// Car: traveling at 25.0 miles per hour in gear 3
```

### - Overriding Property Observers

상속된 프로퍼티에 프로퍼티 옵져버를 추가하기 위해 프로퍼티 오버라이딩을 할 수 있습니다. 이는 원래 프로퍼티가 구현된 것과 상관 없이 상속된 프로퍼티의 값이 변경될때 알려주는 것이 가능합니다. 프로퍼티 옵져버에 대해 더 자세한 정보는 [프로퍼티 옵져버(Property Observers)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID262)를 보세요.

> Note: 상속된 상수 저장 프로퍼티나 상속된 읽기 전용 계산 프로퍼티에 프로퍼티 옵져버를 추가할수 없습니다. 이러한 프로퍼티의 값은 설정할수 없고, 오버라이드의 일부로 willSet이나 didSet 구현을 제공하는 것은 어울리지 않습니다.

또한, 같은 프로퍼티에 대해서 setter 오버라이딩과 프로퍼티 옵져버 오버라이딩 둘다 제공할수는 없다는 것을 주의합니다. 프로퍼티의 값이 변경되는 것을 감지하길 원하는 경우, 그리고 이미 그 프로퍼티에 대해 사용자정의 setter를 제공한다면, 사용자정의 setter로 부터 모든 값이 변하는 것을 단순히 옵저버 할수 있습니다.

다음 예제는 Car의 서브클래스인 새로운 클래스 AutomaticCar를 정의합니다. AutomaticCar클래스는 현재 속도에 어울리는 기어로 자동으로 선택하는 자동변속 기어를 가진 차를 표현합니다.

```swift
class AutomaticCar: Car {
    override var currentSpeed: Double {
        didSet {
            gear = Int(currentSpeed / 10.0) + 1
        }
    }
}
```

AutomaticCar인스턴스의 currentSpeed프로퍼티를 설정 할때마다 프로퍼티의 `didSet`옵져버는 새로운 속도에 어울리는 기어(gear)를 선택하여 인스턴스의 gear프로퍼티를 설정합니다. 특히, 프로퍼티 옵저버는 새로운 `currentSpeed`값을 10으로 나누고 정수형이 되도록 반올림하고 1을 더한 값의 기어를 선택합니다. 35.0의 속도는 기어(gear) 4가 됩니다.

```swift
let automatic = AutomaticCar()
automatic.currentSpeed = 35.0
print("AutomaticCar: \(automatic.description)")
// AutomaticCar: traveling at 35.0 miles per hour in gear 4
```

---

## Preventing Overrides

`final`로 표시하면 메소드, 프로퍼티, 서브스크립트가 오버라이드하는 것을 막을 수 있습니다. 메소드, 프로퍼티, 서브스크립트 표시 키워드 앞에 final으로 작성합니다. `(final var, final func, final class func, final subscript`처럼)

서브클래스에서 final 메소드, 프로퍼티, 서브스크립트를 오버라이드 시도하면 `컴파일 오류`가 발생합니다. 클래스 확장(extension)에서 추가된 메소드, 프로퍼티, 서브스크립트도 확장의 정의에서 `final`로 표시 할 수 있습니다.

클래스 전체를 final로 설정 하려면 클래스 정의에서 class키워드 앞에 final을 사용합니다(`final class`). final class의 서브클래스를 만드려고 시도하면 컴파일 오류가 발생합니다.



---

