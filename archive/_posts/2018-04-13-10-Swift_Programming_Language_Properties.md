---
layout:     post
title:      "Swift. 정리하기 10: Swift Language Guide-Properties"
subtitle:   "Swift Language Guide-Properties *"
date:       2018-04-13 09:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Properties](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID254)<br>
[까칠코더님 블로그](http://kka7.tistory.com/116?category=919617)

---

## Properties

`프로퍼티(properties)`는 특정 클래스, 구조체, 열거형의 연관된 값입니다. 저장 프로퍼티(stored properties)는 인스턴스의 일부로 상수와 변수 값을 저장하는 반면, 계산 프로퍼티(computed properties)는 값을 (저장하기 보다는)계산합니다. 계산 프로퍼티는 클래스, 구조체, 열거형에서 제공됩니다. 저장 프로퍼티는 클래스와 구조체에서만 제공됩니다.

저장(stored)과 계산(computed) 프로퍼티는 일반적으로 특정 타입의 인스턴스와 관련되어 있습니다. 하지만, 프로퍼티는 타입 자체(itself)와 연관되어 있을수도 있습니다. 이러한 프로퍼티를 타입 프로퍼티(type properties)라 합니다.

추가적으로, 프로퍼티의 값이 변하는 것을 감시하기 위해 프로퍼티 옵져버(observers)를 정의할 수 있으며, 사용자정의 동작으로 응답할 수 있습니다. 프로퍼티 옵져버는 정의한 저장 프로퍼티에 추가될수 있고, 상위 클래스로부터 상속받은 하위 클래스의 프로퍼티에도 추가할수 있습니다.

---

## Stored Properties

가장 간단한 형태로, 저장 프로퍼티는 특정 클래스나 구조체의 인스턴스로 저장되는 상수나 변수 입니다. 저장 프로퍼티는 변수 저장 프로퍼티(variable stored properties)(`var` 키워드) 또는 상수 저장 프로퍼티(constant stored properties)(`let` 키워드) 중 하나 일수 있습니다.

[기본 프로퍼티 값(Default Property Values)](https://swift.org/documentation/#ID206)에서 설명된 것 처럼, 정의할때 저장 프로퍼티에 대한 기본 값을 제공할 수 있습니다. 초기화하는 동안 저장 프로퍼티에 대한 초기값을 설정하고 수정할 수도 있습니다. [초기화하는 동안 상수 프로퍼티 할당하기(Assigning Constant Properties During Initialization)](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html#ID212)상수 저장 프로퍼티에 대한 경우에도 가능합니다.

아래 예제는 생성된 후에는 범위의 길이를 변경할수 없는 정수형 범위를 설명하는FixedLengthRange 구조체를 정의한 것입니다.

```swift
struct FixedLengthRange {
    var firstValue: Int
    let length: Int
}
var rangeOfThreeItems = FixedLengthRange(firstValue: 0, length: 3)
// the range represents integer values 0, 1, and 2
rangeOfThreeItems.firstValue = 6
// the range now represents integer values 6, 7, and 8
```

`FixedLengthRange`의 인스턴스는 변수 저장 프로퍼티 `firstValue`와 상수 저앞 프로퍼티 length를 가지고 있습니다. 위의 예제에서, `length`는 상수 프로퍼티이기 때문에, 새로운 범위가 생성될때 초기화되고 그 이후에는 변경될수 없습니다.

---

## Stored Properties of Constant Structure Instances 

구조체의 인스턴스를 생성하고 상수에 인스턴스를 할당하는 경우에, 변수 프로퍼티로 선언되었을지라도, 인스턴스의 프로퍼티를 수정할수 없습니다.

```swift
let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
// this range represents integer values 0, 1, 2, and 3
rangeOfFourItems.firstValue = 6
// this will report an error, even though firstValue is a variable property
```

`rangeOfFourItems`가 상수(`let` 키워드)로 선언되었기 때문에, `firstValue`가 변수 프로퍼티일지라도, `firstValue` 프로퍼티를 변경하는 것은 불가능합니다.

이 동작은 구조체가 값 타입(`value types`)이기 때문입니다. 값 타입의 인스턴스가 상수로 표시될때, 모든 프로퍼티가 상수가 됩니다.

참조 타입(`reference types`)인 클래스에 대해서는 다릅니다. 참조 타입의 인스턴스를 상수로 할당한 경우에, 인스턴스의 변수 프로퍼티는 여전히 변경할 수 있습니다.

---

## Lazy Stored Properties 

`느린 저장 프로퍼티(lazy stored property)`는 처음 사용 할때 까지 초기 값이 계산되지 않은 프로퍼티 입니다. 느린 저장 프로퍼티는 선언할때 앞에 `lazy`를 작성하여 나타냅니다.

> Note: Lazy 프로퍼티는 인스턴스 초기화가 완료될때까지 초기 값을 가져올 수 없기 때문에, 항상 `변수(var키워드 사용)`로 선언해야 합니다. 상수 프로퍼티는 항상 초기화가 완료되기 전에 값을 가지고 있어야 하므로, lazy로 선언될 수 없습니다.

`Lazy` 프로퍼티는 외부 요인에 의해 초기화가 완료될때까지 값을 알 수 없는 프로퍼티의 값을 초기화 할때 유용합니다. Lazy 프로퍼티는 필요한 경우가 아니면 그때까지 수행되서는 안되는 복잡하거나 계산이 오래걸리는 프로퍼티가 필요한 경우에 유용합니다.

아래 예제는 복잡한 클래스의 불필요한 초기화를 피하기 위해 `Lazy` 저장 프로퍼티를 사용합니다. 이 예제는 두개의 클래스 DataImporter, DataManager를 정의하며, 둘다 전부 보여주지 않습니다.

```swift
class DataImporter {
    /*
     DataImporter is a class to import data from an external file.
     The class is assumed to take a nontrivial amount of time to initialize.
     */
    var filename = "data.txt"
    // the DataImporter class would provide data importing functionality here
}
 
class DataManager {
    lazy var importer = DataImporter()
    var data = [String]()
    // the DataManager class would provide data management functionality here
}
 
let manager = DataManager()
manager.data.append("Some data")
manager.data.append("Some more data")
// the DataImporter instance for the importer property has not yet been created
```

`DataManager`클래스는 `String`값의 배열로 새로 초기화된 `data`저장 프로퍼티를 가지고 있습니다. 비록 나머지 기능이 보이지 않지만, `DataManager`클래스의 목적은 `String` 데이터 배열 접근을 제공하고 관리합니다.

`DataManager`클래스의 일부 기능은 파일로부터 데이터를 오는 것입니다. 이 기능은 `DataImporter`클래스에 의해 제공되며, 초기화하는데 적게 걸리지 않는 것을 가정합니다. DataImporter인스턴스가 초기화 될때 파일을 열고 컨텐츠를 메모리로 읽기 위해 `DataImporter`인스턴스가 필요하기 때문일 것입니다.

파일로부터 데이터를 가져오지 않고 `DataManager`인스턴스가 데이터를 관리하는 것이 가능합니다. 그래서 `DataManager`가 생성될때, 새로운 `DataImporter`인스턴스 생성이 필요하지 않습니다. 대신에, 처음 사용할때`DataImporter`인스턴스를 만드는것이 더 의미가 있습니다.

`lazy 수식어(modifier)`로 표시 되었기 때문에, `importer` 프로퍼티에 대한 `DataImporter`인스턴스는 fileNmae 프로퍼티를 조회할때 처럼, importer프로퍼티에 처음으로 접근할때, 생성됩니다.

```swift
print(manager.importer.fileName)
// the DataImporter instance for the importer property has now been created
// Prints "data.txt"
```

> Note: `lazy 수식어(modifier)`로 표시된 프로퍼티가 아직까지 초기화되지 않고 동시에 여러개의 스레드가 접근하는 경우, 프로퍼티가 한 번만 초기화 된다라는 것을 보장하지 않습니다.


---

## Stored Properties and Instance Variables

Objective-C 경험이 있는 경우에, `클래스 인스턴스로 값을 저장하고 참조하는 두가지(two)` 방법을 알고 있을 것입니다. 프로퍼티 외에도, 프로퍼티에 저장된 값에 대한 보조 저장소(backing store)처럼 인스턴스 변수(instance variables)를 사용할 수 있습니다.

Swift는 이러한 개념(concepts)을 하나의 프로퍼티 선언으로 통일(unifies)하였습니다. Swift 프로퍼티는 해당(corresponding) 인스턴스 변수가 없고, 프로퍼티에 대한 보조 저장소를 직접 접근(accessed)되지 않습니다. 이러한 접근법은 다른 컨텍스트(contexts)에서 값에 접근하는 방법에 대한 혼란을 피하게 하고 프로퍼티 선언을 하나의 일정한 구문으로 단순화 합니다. 프로퍼티에 대한 모든 정보(이름, 타입, 메모리 관리 특성)는 타입의 정의처럼 한 곳에서 정의됩니다.

---

## Computed Properties 

저장 프로퍼티 외에도, 클래스, 구조체, 열거형을 실제로 값을 저장하지 않는 `계산 프로퍼티(computed properties)`로 정의할 수 있습니다. 대신에, 다른 프로퍼티와 값을 간접적으로 설정하기 위해 `getter와 옵셔널 setter`를 제공합니다.

```swift
struct Point {
    var x = 0.0, y = 0.0
}
struct Size {
    var width = 0.0, height = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set(newCenter) {
            origin.x = newCenter.x - (size.width / 2)
            origin.y = newCenter.y - (size.height / 2)
        }
    }
}
var square = Rect(origin: Point(x: 0.0, y: 0.0),
                  size: Size(width: 10.0, height: 10.0))
let initialSquareCenter = square.center
square.center = Point(x: 15.0, y: 15.0)
print("square.origin is now at (\(square.origin.x), \(square.origin.y))")
// Prints "square.origin is now at (10.0, 10.0)"
```

이 예제는 기하학적인(geometric) 도형으로 작업하기 위한 구조체 3개를 정의하였습니다.

- `x`와 `y`좌표를 캡슐화한 Point
- `width`와 `height`를 캡슐화한 `Size`
- 원점과 크기로 사각형을 정의한 `Rect`

`Rect` 구조체는 계산 프로퍼티 `center`를 제공합니다. 현재 `Rect`의 중심점(center position)은 항상 `origin`과 `size`에 의해 결정되고, 명시적인 Point 값으로 중심점을 저장할 필요가 없습니다. 대신에, `Rect`는 사용자정의 계산 변수 `center`에 대한 `getter`과 `setter`를 정의하며, 실제 저장 프로퍼티 처럼 사각형의 `center`로 사용이 가능합니다.

위 예제에서 새로운 `Rect`변수 `square`를 생성하였습니다. `square` 변수는 (0, 0) 원점, 넓이와 높이는 10으로 초기화되었습니다. 이 `square`는 아래 그림에서 파랑색 사각형으로 표시됩니다.

`square` 변수의 `center` 프로퍼티는 현재 프로퍼티의 값을 가져오기 위해, `center`에 대한 `getter`로 호출되도록 하는 점(dot) 문법(square.center)으로 사용합니다. 기존 값을 반환하기 보다는, getter로 실제 계산하고 square의 중심을 가리키는 새로운 Point를 반환합니다. 위에서 볼수 있는 것처럼, getter은 중심점(5, 5)를 정확히 반환합니다.

center프로퍼티는 사각형을 위쪽과 오른쪽으로 이동시키는 새로운 값 (15, 15)으로 설정되며, 아래 그림에서 새로운 위치의 오렌지 사각형으로 보여집니다. center 에 대한 setter를 호출해서 center 프로퍼티를 설정하며, origin 프로퍼티에 저장된 x와 y의 값을 수정하고, 새로운 위치로 사각형을 이동시키빈다.

![](/img/posts/swiftProgrammingGudie_property_0.png)

---

## Shorthand Setter Declaration 

계산 프로퍼티의 setter에 설정할 새로운 값에 대한 이름을 정의하지 않은 경우에, `newValue`라는 기본 이름이 사용됩니다. 다음은 축약 표현법(shorthand notation)의 장점을 가지는`Rect` 구조체의 다른 버젼입니다


```swift
struct AlternativeRect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set {
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}
```

---

## Read-Only Computed Properties 

getter는 있지만 setter가 없는 계산 프로퍼티를 읽기 전용 `계산프로퍼티(read-only computed property)`라고 합니다. 읽기 전용 계산 프로퍼티는 항상 값을 반환하고, 점(dot .) 문법을 통해서 접근할수 있지만, 다른 값을 설정할 수는 없습니다.

> Note: 값이 고정되지 않았기 때문에, 계산 프로퍼티는(읽기 전용 계산 프로퍼티도 포함해서) `var`키워드로 변수 프로퍼티로 선언해야 합니다. `let`키워드는 인스턴스 초기화의 일부로 설정되면 값을 변경할수 없다는 것을 나타내기 위해 상수 프로퍼티에서만 사용됩니다.

`get`키워드와 중괄호(braces) 제거하여, 읽기 전용 계산 프로퍼티의 선언을 단순화 할수 있습니다.

```swift
struct Cuboid {
    var width = 0.0, height = 0.0, depth = 0.0
    var volume: Double {
        return width * height * depth
    }
}
let fourByFiveByTwo = Cuboid(width: 4.0, height: 5.0, depth: 2.0)
print("the volume of fourByFiveByTwo is \(fourByFiveByTwo.volume)")
// Prints "the volume of fourByFiveByTwo is 40.0"
```

이 예제에서 width, height, depth 프로퍼티로 3D 사각형 박스를 표현하는 새로운 구조체 Cuboid를 정의하였습니다. 
이 구조체는 큐브(cuboid)의 현재 볼륨을 계산하고 반환하는 volume 읽기 전용 프로퍼티를 가지고 있습니다. 특정 volume값에 대한 width, height, depth의 값이 애매모호하기 때문에, volume에 대한 설정을 할 수 없습니다. 그럼에도 불구하고, 외부 사용자가 현재 계산된 볼륩을 구할수 있도록 Cuboid에 대해 읽기 전용 계산 프로퍼티를 제공하는 것은 유용합니다.

---

## Property Observaers

프로퍼티 옵저버는 프로퍼티의 값이 변경되는 것을 감지하고 알려줍니다. 프로퍼티 옵져버는 `언제나 프로퍼티에 값을 설정 할때`마다 호출되며, 새로운 값이 프로퍼티의 현재 값과 같아도 호출됩니다.

`lazy` 저장 프로퍼티만 예외이며, 정의한 모든 저장 프로퍼티에 프로퍼티 옵져버를 추가할 수 있습니다. 하위클래스(subclass)에 있는 프로퍼티를 오버라이딩(overriding)해서 상속된 모든 프로퍼티(저장 또는 계산)에 프로퍼티 옵져버를 추가할수 있습니다. 계산 프로퍼티의 setter에서 그 값이 변경된 것을 옵저버하고 반응할수 있기때문에, 오버라이드 하지않은(nonoverridden) 계산 프로퍼티에 대해서 프로퍼티 옵져버를 정의할 필요가 없습니다. 프로퍼티 오버라이딩(overriding)은 [오버라이딩(Overriding)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-ID196)에서 설명되어 있습니다.

프로퍼티에서 옵져버를 하나 또는 둘다 정의할 수 있습니다.

- `willSet`은 값이 저장되기 직전에 호출됩니다.
- `didSet`은 새로운 값이 저장된 직후에 호출됩니다.

`willSet` 옵져버를 구현한다면, 새로운 프로퍼티 값은 상수 매개변수로 전달됩니다. `willSet`구현시에 파라메터의 이름을 지정할수 있습니다. 괄호(parentheses ())와 매개변수 이름을 작성하지 않으면, 매개변수는 기본 매개변수 이름으로 `newValue`를 제공 합니다.

비슷하게, `didSet`옵져버를 구현한다면, 예전 프로퍼티에 포함된 값은 상수 매개변수로 전달됩니다. 매개변수 이름을 짓거나 기본 매개변수 이름 `oldValue`를 사용할 수 있습니다. `didSet` 옵져버에서 프로퍼티의 값을 할당하면, 새 값은 방금 설정한 것으로 대체합니다.

> Note: 상위 클래스 프로퍼티의 willSet과 didSet옵져버는 상위 클래스 초기화가 호출된 후에, 하위클래스 초기화에서 프로퍼티가 설정할때 호출됩니다. 상위클래스 초기화가 호출되기 전에, 클래스가 자체 프로퍼티를 설정하는 동안에는 호출되지 않습니다.
>
> 초기화 위임(initializer delegation)에 관하여 자세한 정보는, [값 타입에 대한 초기화 위임(Initializer Delegation for Value Types)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID215)와 [클래스 타입에 대한 초기화 위임(Initializer Delegation for Class Types)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID219)을 보세요.

다음은 `willSet`과 `didSet` 동작 예제입니다. 아래 예제는 사람의 전체 걸음 수를 추적하는 새로운 클래스 StepCounter을 정의하였습니다. 이 클래스는 만보계(pedometer) 또는 또는 하루중에 사람의 걸음수를 추적한 데이터를 입력하여 사용합니다.

```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet(newTotalSteps) {
            print("About to set totalSteps to \(newTotalSteps)")
        }
        didSet {
            if totalSteps > oldValue  {
                print("Added \(totalSteps - oldValue) steps")
            }
        }
    }
}
let stepCounter = StepCounter()
stepCounter.totalSteps = 200
// About to set totalSteps to 200
// Added 200 steps
stepCounter.totalSteps = 360
// About to set totalSteps to 360
// Added 160 steps
stepCounter.totalSteps = 896
// About to set totalSteps to 896
// Added 536 steps
```

`StepCounter`클래스는 `Int`타입의 `totalStep` 프로퍼티를 선언합니다. 이것은 willSet과 didSet 옵져버를 사용하는 저장 프로퍼티 이다.

`totalSteps`에 대한 `willSet`과 `didSet`옵져버는 그 프로퍼티에 새로운 값이 할당될때마다 호출됩니다. 심지어 새로운 값이 현재 값과 같은 경우에도 호출합니다.

예제의 `willSet`옵져버는 새 값에 대해 사용자정의 매개변수 이름 `newTotalSteps`를 사용합니다. 예제에서, 단순하게 설정하려는 값을 출력합니다.

`didiSet`옵져버는 `totalSteps`의 값이 업데이트 된 후에 호출됩니다. 이전 값에 대해 `totalSteps`의 새로운 값과 비교합니다. 전체 걸음수가 증가되면, 얼마나 많이 새로 걸었는지에 대한 메시지를 출력합니다. `didSet`옵져버는 예전 값에 대해 사용자정의 매매변수 이름을 제공하지 않고, 그 대신에 기본 이름 oldValue를 사용합니다.

> Note: 함수에 인-아웃 매개변수(in-out parameter)로 옵저버를 가지는 프로퍼티를 전달하는 경우에, willSet과 didSet옵저버는 항상 호출됩니다. 이것은 인-아웃 매개변수(in-out parameter)에 대한 메모리 모델은 `copy-in copy-out`이기 때문입니다. 그 값은 항상 함수의 끝에 있는 프로퍼티에 다시 쓰여집니다. 인-아웃 매개변수(in-out parameter)의 동작의 자세한 설명은 [인-아웃 매개변수(In-Out parameter)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID545)를 보세요.

---

## Global and Local Variables

위에서 설명한 계산하고 옵저버하는 프로퍼티에 대한 기능은 전역 변수(global variables)와 지역 변수(local variables)도 가능합니다. 전역 변수는 모든 함수, 메소드, 클로저, 타입 컨텍스트(context) 밖에(outside) 정의된 변수입니다. 지역 변수는 함수, 메소드, 클로저 컨텍스트 안에 정의됩니다.

이전 챕터(chapters)에서 살펴본 전역과 지역 변수는 모두 저장 변수(stored variables)입니다. 저장 변수는 저장 프로퍼티와 비슷하며, 특정 타입의 값 저장을 제공하고, 값을 설정하고 꺼내올수 있습니다.

하지만, 전역 또는 지역 범위에서, 계산 변수(computed variables)를 정의하고 저장 변수에 대한 옵저버를 정의할 수 있습니다. 계산 변수는 값을 저장하는 것이 아니라 계산하고, 계산 프로퍼티와 같은 방식으로 작성됩니다.

> Note: 전역 상수와 변수는 [lazy 저장 프로퍼티(Lazy Stored Properties)](https://docs.swift.org/swift-book/LanguageGuide/Properties.html#ID257)와 유사한 방식으로 항상 나중에(lazily) 계산됩니다. lazy 저장 프로퍼티와 다르게, 전역 상수와 변수는 lazy 표시할 필요가 없습니다.
> 
> 지역 상수와 변수는 나중에(lazily) 계산되지 않습니다.

---

## Type Properties 

인스턴스 프로퍼티는 특정 타입의 인스턴스에 속해있는 프로퍼티입니다. 타입의 새로운 인스턴스를 만들때마다, 자체적인 프로퍼티 값의 `세트(set)`를 가지며, 다른 인스턴스와 구분됩니다.

또한, 타입 자체에 속하는 프로퍼티를 정의할 수 있으며, 그 타입의 어떤 하나의 인스턴스가 아닙니다. 이러한 프로퍼티의 복사본은 하나일 것이며, 여러분이 만든 타입의 인스턴스가 얼마나 많던지 상관 없습니다. 이러한 프로퍼티의 종류를 `타입 프로퍼티(type properties)`라고 부릅니다.

타입 프로퍼티는 모든 인스턴스가 사용할 수 있는 상수 프로퍼티(C에서 static 상수처럼) 또는 타입의 모든 인스턴스에 전역으로 값을 저장하는 변수 프로퍼티(C에서 static 변수처럼)처럼 특정타입의 모든(all) 인스턴스에 보편적인 값을 정의하는데 유용합니다.

저장(stored) 타입 프로퍼티는 변수나 상수가 될수 있습니다. 계산(computed) 타입 프로퍼티는 계산 인스턴스 프로퍼티와 같은 방식으로 항상 변수 프로퍼티로 선언됩니다.

> Note: 저장 인스턴스 프로퍼티와 다르게, 저장 타입 프로퍼티는 항상 기본 값을 제공해야 합니다. 이것은 초기화시 타입 스스로 저장 타입 프로퍼티에 값을 할당하는 초기화가 없기 때문입니다.
>
> 저장(stored) 타입 프로퍼티는 처음 사용할때 느리게(`lazily`) 초기화 됩니다. 그것들은 멀티스레드 환경에서 사용하는 상황에서도 `한번만 초기화 되는 것을 보장하고`, lazy 수식어를 표시할 필요가 없습니다.

---

## Type Property Syntax

C와 Objective-C에서는, `전역(global)` static 변수로 타입에 관련된 static 상수와 변수를 정의 합니다. 하지만, Swift에서의 타입 프로퍼티는 타입의 바깥쪽 중괄호(curly braces)안에서 타입의 정의 일부로 작성되고, 각 타입 프로퍼티는 지원하는 타입으로 명시적인 범위가 지정됩니다.

`static`키워드로 타입 프로퍼티를 정의합니다. 클래스 타입에 대한 계산(computed) 타입 프로퍼티의 경우에, class 키워드를 대신 사용해서 상위클래스의 구현을 오버라이드하는 하위 클래스를 허용합니다. 아래 에제에서 저장(stored)과 계산(computed) 타입 프로퍼티에 대한 문법을 보여줍니다.

```swift
struct SomeStructure {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 1
    }
}
enum SomeEnumeration {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 6
    }
}
class SomeClass {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 27
    }
    class var overrideableComputedTypeProperty: Int {
        return 107
    }
}
```

> Note: 위의 계산 타입 프로퍼티 예제는 읽기 전용(read-only) 계산 타입 프로퍼티입이지만, 계산 인스턴스 프로퍼티와 같은 문법으로 읽기 쓰기(read-write) 계산 타입 프로퍼티를 정의 할수 있습니다.

---

## Querying and Setting Type Properties

타입 프로퍼티는 인스턴스 프로퍼티처럼, 점(dot .) 문법으로 조회하고 설정합니다. 하지만, 타입 프로퍼티는 타입의 인스턴스가 아니라 `타입(type)`에서 조회하고 설정합니다. 예를 들어,

> Note: 타입 그 자체라서, 타입에서 조회하고 사용한다고 이해됩니다!

```swift
print(SomeStructure.storedTypeProperty)
// Prints "Some value."
SomeStructure.storedTypeProperty = "Another value."
print(SomeStructure.storedTypeProperty)
// Prints "Another value."
print(SomeEnumeration.computedTypeProperty)
// Prints "6"
print(SomeClass.computedTypeProperty)
// Prints "27"
```

다음에 오는 예제는 오디오 채널의 갯수에 대한 오디오 레벨미터(level meter)를 모델링한 구조체에서 두개의 저장 타입 프로퍼티를 사용합니다. 각 채널은 0부터 10까지 포함한(inclusive) 정수형 오디오 레벨을 가집니다.

아래 그림은 스테레오 오디오 레벨 미터를 모델링하기 위해 두개의 오디오 채널을 결합하는 방법을 보여줍니다. 채널의 오디오 레벨이 0일때, 그 채널에 대해 켜져있는 조명이 아무것도 없습니다. 오디오 레벨이 10일때, 그 채널에 대해 모든 조명이 켜져있습니다. 그림에서, 왼족 채널은 9레벨이고, 오른족 채널은 7레벨 입니다.

![](/img/posts/swiftProgrammingGudie_property_1.png)

위에서 설명한 오디오 채널은 AudioChannel 구조체의 인스턴스로 표현됩니다.

```swift
struct AudioChannel {
    static let thresholdLevel = 10
    static var maxInputLevelForAllChannels = 0
    var currentLevel: Int = 0 {
        didSet {
            if currentLevel > AudioChannel.thresholdLevel {
                // cap the new audio level to the threshold level
                currentLevel = AudioChannel.thresholdLevel
            }
            if currentLevel > AudioChannel.maxInputLevelForAllChannels {
                // store this as the new overall maximum input level
                AudioChannel.maxInputLevelForAllChannels = currentLevel
            }
        }
    }
}
```

`AudioChannel` 구조체는 그 기능을 지원하기 위해 두개의 저장 타입 프로퍼티를 정의 합니다. 첫번째로, `thresholdLevel`이며, 오디오 레벨이 가질수 있는 최대 임계 값(`threshold value`)을 정의합니다. 이것은 모든 AudioChannel인스턴스에 대한 상수값 10 입니다. 오디오 신호가 10보다 높은 값이 들어오면, (아래 설명된 것처럼) 임계 값에 의해 제한(capped) 될 것입니다.

두번째 타입 프로퍼티는 변수 저장 프로퍼티 `maxInputLevelForAllChannels`입니다. 이것은 모든(any) AudioChannel 인스턴스에서 받은 최대 입력 값을 유지합니다.그것은 초기 값 0으로 시작합니다.

또한, `AudioChannel` 구조체는 0에서 10까지의 눈금(scale)으로 채널의 현재 오디오 레벨을 표현하는 저장 인스턴스 프로퍼티 currentLevel을 정의합니다.

`currentLevel` 프로퍼티는 `currentLeve`의 값이 설정될때마다 확인하기 위한 didSet프로퍼티 옵져버를 가지고 있습니다. 이 옵져버는 두 가지를 검사(check)합니다.

- `currentLevel`의 새로운 값이 `thresholdLevel`보다 더 크면, 그 프로퍼티 옵져버는 `currentLevel`을 `thresholdLevel`로 제한합니다.
- `currentLevel`의 새로운 값이 이전에 어떤 `AudioChannae`인스턴스로 부터 받은 값보다 크면, 프로퍼티 옵져버는 새로운 `currentLevel` 값을 `maxInputLevelForAllChannels` 타입 프로퍼티에 저장합니다.

> Note: 두가지 검사중 첫번째에서, `didSet`옵져버는 `currentLevel`을 다른 값으로 설정합니다. 하지만, 그 옵져버가 다시 호출되지는 않습니다.

스테레오 사은드 시스템의 오디오 레벨을 표현하기 위해, `AudioChannel`구조체를 사용해서 두개의 새로운 오디오 채널 `leftChannel`과 `reightChannel`을 만들수 있습니다.

```swift
var leftChannel = AudioChannel()
var rightChannel = AudioChannel()
```

왼쪽(left) 채널의 currentLevel을 7로 설정하는 경우, maxInputLevelForAllChannels 타입 프로퍼티가 7로 업데이트 되는 것을 볼수 있습니다.

```swift
leftChannel.currentLevel = 7 print(leftChannel.currentLevel) // Prints "7" print(AudioChannel.maxInputLevelForAllChannels) // Prints "7"
```

---

