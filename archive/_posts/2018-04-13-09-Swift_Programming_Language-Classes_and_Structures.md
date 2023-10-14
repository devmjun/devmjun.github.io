---
layout:     post
title:      "Swift. 정리하기 9: Swift Language Guide-Classes and Structures"
subtitle:   "Swift Language Guide-Classes and Structures *"
date:       2018-04-13 08:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Classes and Structures](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ClassesAndStructures.html#//apple_ref/doc/uid/TP40014097-CH13-ID82)<br>
[까칠코더님 블로그](http://kka7.tistory.com/115?category=919617)

---

## Classes and Structures

`클래스(classes)`와 `구조체(structures)`는 범용적`(general-purpose)`이며, 프로그램의 코드 블록(blocks)을 만드는데 유연한 구조입니다. 클래스와 구조체에 기능을 추가하기 위해 상수, 변수, 함수와 완저히 같은 문법을 사용해서 프로퍼티와 메소드를 정의합니다.

다른 프로그래밍 언어와 다르게, Swift는 사용자정의 클래스와 구조체에 대해서 인터페이스와 구현 파일을 분리해서 만드는 것이 필요하지 않습니다. Swift에서, 하나의 파일에서 클래스나 구조체를 정의하고, 클래스나 구조체를 다른코드에서 사용할수 있도록 외부 인터페이스를 자동으로 만듭니다.

> Note: 클래스의 인스턴스를 전통적으로 `객체(object)`라고 합니다. 하지만, Swift 클래스와 구조체는 다른 언어에 비해 기능적으로 훨씬 가깝고, 이번 챕터(chapter)에서 클래스나 구조체 타입의 인스턴스에 적용할 수 있는 기능들을 설명합니다. 이 때문에, 좀 더 일반적인 용어인 인스턴스`(instance)`를 사용합니다.

---

## Comparing Classes and Structures 

Swift에서 클래스와 구조체는 공통적으로 많은 것을 할 수 있습니다. 둘다 다음을 할 수 있습니다 :

- 값을 저장하기 위한 프로퍼티 정의
- 기능을 제공하기 위한 메소드 정의
- 서브스크립트(subscript) 문법을사용하여 값을 접근하는 것을 제공하기 위한 서브스크립트 정의
- 초기 상태로 설정하기 위한 초기화 정의
- 기본 적은 구현을 넘어서는 기능을 확장하기 위한 확장(extended)
- 특정 종류의 표준 기능을 제공하는 프로토콜을 준수(conform)

특정 종류의 표준 기능을 제공하는 프로토콜 준수
더 자세한 정보는 [프로퍼티(Properties)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID254), [메소드(Methods)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Methods.html#//apple_ref/doc/uid/TP40014097-CH15-ID234), [서브스크립트(Subscripts)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Subscripts.html#//apple_ref/doc/uid/TP40014097-CH16-ID305), [초기화(Initialization)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID203), [확장(Extensions)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Extensions.html#//apple_ref/doc/uid/TP40014097-CH24-ID151), [프로토콜(Protocols)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID267)을 보세요.

클래스는 가능하지만 구조체는 가능하지 않는 것

- 다른 특성(characteristics)을 상속받기 위해 하나의 클래스를 상속하는게 가능함.
- 실행중에 클래스 인스턴스 타입을 확인하고 해석(interpret)하기 위해 타입을 변경(Type casting) 가능
- 클래스의 인스턴스가 할당한 모든 리소스를 메모리에서 해제하기 위한 해제(Deinitializer) 가능
- 클래스 인스턴스에 하나 이상의 참조가 가능한 참조 개수(Referenc counting) 허용

더 자세한 정보는 [상속(Inheritance)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-ID193), [타입 변환(Type Casting)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TypeCasting.html#//apple_ref/doc/uid/TP40014097-CH22-ID338), [해제(Deinitialization)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Deinitialization.html#//apple_ref/doc/uid/TP40014097-CH19-ID142), [자동 참조 개수(Automatic Reference Counting)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID48)를 보세요.

복잡성이 증가함에 따라 클래스가 지원하는 것이 추가 기능은 다음과 같습니다. 일반적인 지침서(guideline) 처럼, 쉽게 사용하기 위해 구조체와 열거형을 선호하고, 적절하거나 필요한 경우에 클래스를 사용합니다. 실제로(in preactics), 대부분의 사용자정의 데이터 타입을 구조체와 열거형으로 정의하게 될 것을 의미합니다. 더 자세한 비교를 위해서는, [구조체와 클래스 사이에서 선택하기(Choosing Between Structures and Classes)](https://developer.apple.com/documentation/swift/choosing_between_structures_and_classes)를 보세요.



---

## definition Syntax

구조체와 클래스는 비슷한 정의 문법을 가집니다. 구조체는 struct 키워드로, 클래스는 class 키워드로 표시합니다. 둘다 한쌍의 중괄호(`{}`)로 전체를 정의합니다.

```swift
class SomeClass {
    // class definition goes here
}
struct SomeStructure {
    // structure definition goes here
}
```

> Note: 새로운 구조체나 클래스를 정의할때마다, 새로운 Swift 타입을 정의합니다. 표준 `Swift 타입(String, Int, Bool)`의 대문자와 같도록 `UpperCamelCase` 타입 이름(`SomeStructure`와 `SomeClass`) 을 사용합니다. 프로퍼티와 메소드는 타입 이름과 다르게 `lowerCamelCase` 이름`(frameRate와 incrementCount)`을 사용합니다.

다음은 구조체 정의와 클래스 정의 예제 입니다.


```swift
struct Resolution {
    var width = 0
    var height = 0
}
class VideoMode {
    var resolution = Resolution()
    var interlaced = false
    var frameRate = 0.0
    var name: String?
}
```

위의 예제에서 픽셀 기반의 화면 해상도를 설명하기 위한 새로운 구조체 `Resolution`를 정의합니다. 이 구조체는 두개의 저장 프로퍼티 `width`와 `height`를 가지고 있습니다. 저장 프로퍼티(Stored properties)는 상수나 변수는 번들로 묶어 구조체나 클래스의 일부로 저장됩니다. 이러한 두개의 프로퍼티는 초기 정수형 값 `0`설정으로 부터 `Int` 타입으로 추론됩니다.

위의 예제는 비디오 화면에 대한 특정 비디오 모드를 설명하기 위해, 새 클래스 `VideoMode` 로 정의됩니다. 클래스는 4개의 변수 저장 프로퍼티가 있습니다. 첫번째, `Resolution`의 프로퍼티 타입으로 추론되는 `resolution`은 새로운 `Resolution` 구조체 인스턴스로 초기화 됩니다. 다른 3개의 프로퍼티는, 새로운 `VideoMode` 인스턴스에서 `interlaced` 는 `false(noninterlaced 비디오를 의미)`로, 프레임 재생 비율은 `0.0`이고, `name`은 옵셔널 `String`값으로 초기화됩니다. `name` 프로퍼티는 옵셔널 타입이기 때문에, 자동적으로 `nil`값 또는 `name` 값이 없음이 주어집니다.

---

## Class and Strue Instances

`Resolution` 구조체는 정의와 `VideoMode`클래스 정의는 단지 어떤 `Resolution`또는 `VideoMode`가 무엇인지를 설명합니다. 그것들은 특정 해상도나 비디오 모드를 설명하지 않습니다. 그렇게 하려면 구조체나 클래스의 인스턴스를 만들어야 합니다.

구조체와 클래스 모두 인스턴스를 생성하는 문법은 매우 간단합니다.


```swift
let someResolution = Resolution()
let someVideoMode = VideoMode()
```

`구조체`와 `클래스` 모두 새로운 인스턴스에 대해 초기화 문법을 사용합니다. 초기화 문법의 가장 간단한 형식은 `Resolution()` 또는 `VideoMode()`처럼, 클래스나 구조체의 이름 다음에 빈 괄호를 붙이는 것입니다. 이러게 만드는 클래스나 구조체의 새로운 인스턴스는 기본값으로 모든 프로퍼티가 초기화 됩니다. 클래스와 구조체 초기화에 대해 더 자세한 설명은 [초기화(`Initialization`)](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html)에 설명되어 있습니다.

---

## Accessing Properties

`점 문법(dot syntax)`을 사용하여 인스턴스의 프로퍼티에 접근할수 있습니다. 점 문법(dot syntax)에서, 인스턴스 이름 바로 뒤에 프로퍼티 이름을 작성하며, 공백없이 마침표(period)(.)로 구분됩니다.

```swift
print("The width of someResolution is \(someResolution.width)")
// Prints "The width of someResolution is 0"
```

예제에서, `someResolution.width`는 `someResolution`의 `width`프로퍼티를 참조하고, 기본 초기값 0을 반환합니다.

```swift
print("The width of someVideoMode is \(someVideoMode.resolution.width)")
// Prints "The width of someVideoMode is 0"
```

또한, 변수 프로퍼티에 새로운 값을 할당하기 위해 점 문법(dot syntax)를 사용할 수 있습니다.

```swift
someVideoMode.resolution.width = 1280
print("The width of someVideoMode is now \(someVideoMode.resolution.width)")
// Prints "The width of someVideoMode is now 1280"
```

---

## Memberwise Initializers for Structure Types

모든 구조체는 자동으로 생성된(automatically-generated) `멤버 초기화(memberwise initializer)`를 가지고 있으며, 새로운 구조체 인스턴스의 멤버 프로퍼티 초기화에 사용할 수 있습니다. 새로운 인스턴스의 프로퍼티에 대한 초기값은 이름으로 멤버 초기화에 전달할 수 있습니다.


```swift
let vga = Resolution(width: 640, height: 480)
```

구조체와 다르게, 클래스 인스턴스는 기본적으로 멤버초기화를 제공하지 않습니다. 초기화는 [초기화(Initialization)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID203)에서 더 자세히 설명되어 있습니다.

---

## Structures and Enumerations Are Value Types

`값 타입(value type)`은 변수나 상수에 할당되거나 함수에 전달될때, 값이 `복사(copied)`되는 타입입니다.

실제로 이전 챕터(chapter)에서 값 타입을 광범위하게(extensively) 사용했었습니다. 사실상, Swift의 모든 기본 타입-정수형, 부동소수점 숫자, Boolean, 문자열, 배열과 딕셔너리-들은 값 타입(value types) 이고, 구조체 처럼 구현 화면(scenes) 뒤에서 구현됩니다.

Swift에서 `모든 구조체와 열거형`은 값 타입입니다. 이는 모든 구조체와 열거형 인스턴스가 코드에서 전달할때 항상 복사되어 생성(프로퍼티에 있는 모든 값 타입)되는 것을 의미합니다.

> Note: 컬렉션(Collections)은 배열, 딕셔너리, 문자열 처럼 표준 라이브러리에 의해 정의되며, 복사하는 성능 비용을 줄이기 위해 최적화를 사용합니다. 즉시 복사본을 만드는 대신에, 컬렉션은 옵셔널 인스턴스와 복사본 사이에 저장된 요소들을 메모리에 공유합니다. 컬렉션의 복사본중 하나가 수정되면, 그 요소들은 수정되기 전에 복사됩니다. 이 동작은 코드에서 항상 복사본이 즉시 생성되는 것으로 볼수 있습니다.

이전 에제로 부터 `Resolution`구조체를 사용하는 예제를 생각해보세요.

```swift
let hd = Resolution(width: 1920, height: 1080)
var cinema = hd
```

`Resolution`인스턴스를 풀 HD 비디오(`1920` 픽셀 폭과 `1080` 픽셀 높이)의 가로 세로로 초기화되도록 설정하고 hd 상수로 선언하는 예제 입니다.

`cinema` 변수를 선언하고 hd의 현재 값을 설정합니다. `Resolution`이 구조체 이기 때문에, 기존 인스턴스의 복사본이 만들어지고, 새 복사본은 `cinema`가 할당됩니다. `hd`와 `cinema`는 이제 같은 넓이와 높이를 가지며, 둘은 완전히 다른 인스턴스 입니다.

다음으로, `cinema`의 `width` 프로퍼티는 디지털 영화 영사기(`2048` 픽셀 폭과 `1080` 픽셀 높이)에 사용되는 약간 더 넓은 대한 2K 표준 넓이가 되도록 수정(`amended`) 됩니다.

```swift
cinema.width = 2048
```

`cinema`의 `width`프로퍼티가 정말로 `2048`로 변경되었는지 확인하세요.

```swift
print("cinema is now \(cinema.width) pixels wide")
// Prints "cinema is now 2048 pixels wide"
```

하지만, 원래 `hd`인스턴스의 `width`프로퍼티는 여전히 예전 `1920`값을 가지고 있습니다.

```swift
print("hd is still \(hd.width) pixels wide")
// Prints "hd is still 1920 pixels wide"
```

`cinema`에 `hd`의 현재값이 주어질때, 그 `hd`에 저장된 값(values)은 새로운 `cinema` 인스턴스로 복사되어 저장됩니다. 결과적으로 동일한 숫자 값을 가지는 두개의 인스턴스로 완전히 구분됩니다. 하지만, 아래 그림에서 보는 것 처럼, 그것들은 별도의 인스턴스이기 때문에, cinema의 width가 `2018`로 설정되는 것이 hd에 저장된 width에 영향을 미치지 않습니다.


![](/img/posts/swiftProgrammingGuid-class-struct-0.png)


```swift
enum CompassPoint {
    case north, south, east, west
}
var currentDirection = CompassPoint.west
let rememberedDirection = currentDirection
currentDirection = .east
if rememberedDirection == .west {
    print("The remembered direction is still .west")
}
// Prints "The remembered direction is still .west"
```

`rememberedDirection`이 `currentDirection`의 값으로 할당될때, 사실상 값을 복사하여 설정합니다. `currentDirection`의 값을 변경해도 `rememberDirection`에 저장된 원래 값의 복사본은 아무런 영향이 없습니다.

---

## Classes Are Reference Types

값 타입과 다르게 참조 타입(reference type)은 변수나 상수를 할당하거나 함수로 전달할때 복사되지 않습니다. 복사 대신에 기존 인스턴스에 대해 참조합니다.

다음은 위에서 정의한 `VideoMode`클래스를 사용한 예제입니다.

```swift
let tenEighty = VideoMode()
tenEighty.resolution = hd
tenEighty.interlaced = true
tenEighty.name = "1080i"
tenEighty.frameRate = 25.0
```

이 예제는 하나의 새로운 상수 `tenEighty`를 선언하고 `VideoMode`클래스의 새로운 인스턴스를 참조하도록 설정합니다. 비디오 모드는 이전의 `1920 x 1080` HD 해상도의 복사본을 할당합니다. interlaced로 설정되고, `"1080i"`이름을 가집니다. 마지막으로, 초당 프레임 비율을 `25.0`으로 설정합니다.

다음으로, `tenEighty`는 새로운 상수 `alsoTenEighty`로 할당되고, `alsoTenEighty`의 프레임 비율은 수정됩니다.

```swift
let alsoTenEighty = tenEighty
alsoTenEighty.frameRate = 30.0
```

클래스가 참조타입 이기 때문에, `tenEighty`와 `alsoTenEighty`둘다 같은 `VideoMode`인스턴스를 참조합니다. `사실상(effectively)`, 하나의 인스턴스에 대해 두개의 다른 이름을 가집니다.

![](/img/posts/swiftProgrammingGuid-class-struct-1.png)

`tenEighty`의 `frameRate`프로퍼티가 `VideoMode`인스턴스에서 새로운 프레임 비율 `30.0`을 정확하게 보고 있는지 확인하세요.

```swift
print("The frameRate property of tenEighty is now \(tenEighty.frameRate)")
// Prints "The frameRate property of tenEighty is now 30.0"
```

`tenEighty`와 `alsoTenEighty`는 변수가 아닌 상수로 선언되는 것을 주의하세요. 하지만, `tenEighty`와 `alsoTenEighty`의 값은 실제 변경되지 않는 상수이기 때문에, `tenEighty.frameRate`와 `alsoTenEighty.frameRate`를 변경 되지 않습니다. `tenEighty`와 `alsoTenEighty`는 `VideoMode`인스턴스를 저장하지 않습니다. - 대신, 둘다 `VideoMode`인스턴스를 참조(refer) 합니다. `VideoMode`의 `frameRate`프로퍼티는 변경되며, `VideoMode`의 참조 상수의 값은 변경되지 않습니다.

---

## Identity Operators

클래스는 참조 타입이기때문에, 동일한 하나의 클래스 인스턴스를 여러개의 상수와 변수로 참조하는 것이 가능합니다. (상수나 변수에 할당하거나 함수에 전달될때 항상 복사되기 때문에, 구조체와 열거형이 같지 않는것이 사실입니다.)

가끔식 두개의 상수나 변수가 클래스의 동일한 인스턴스를 참조하는지 찾는 것이 유용할 때가 있습니다. 이러한 기능을 사용하기 위해, Swift는 두개의 식별 연산자를 제공합니다.

- `===`: 동일한 것을 식별(Identical)
- `!==`: 동일하지 않는 것을 식별(Not identical)

이 연산자들은 두개의 상수나 변수가 동일한 하나의 인스턴스를 참조하는 것을 확인하기 위해 사용합니다

```swift
if tenEighty === alsoTenEighty {
    print("tenEighty and alsoTenEighty refer to the same VideoMode instance.")
}
// Prints "tenEighty and alsoTenEighty refer to the same VideoMode instance."
```

똑같다(identical to) (3개의 같음(equal) 기호로 표현 ===)는 같다(equal to)(2개의 같음(equal) 기호로 표현, ==)와는 같은 의미가 아닙니다. 똑같다(identical to)는 클래스 타입의 두개의 상수나 변수가 정확히 같은 클래스 인스턴스를 참조하는 것을 의미합니다. 동등하다(equal)의 적절한 의미로써, 같다(equal to)는 두개의 인스턴스가 값이 같거나 같은것으로 간주되는 것을 의미하며, 타입 설계에서 정의됩니다.

자신만의 사용자정의 구조체와 클래스를 정의할때, 두 인스턴스가 같은 것으로 여기도록 결정하는 것은 사용자의 책임입니다. 같다(equal to)와 같지 않다(not equal to) 연산자의 구현을 정의하는 과정은 [동등 연산자(Equivaience Operators)](https://docs.swift.org/swift-book/LanguageGuide/AdvancedOperators.html#ID45)에서 설명되어 있습니다.

---

## Pointers

C, C++, Objective-C 경험이 있다면, 이러한 언어가 메모리 주소를 참조하기 위해 포인터(pointers)를 사용하는 것을 알고 있을 것입니다. Swift 상수나 변수가 일부 참조 타입의 인스턴스를 참조하는 것이 C에서의 포인터와 비슷하지만, 메모리 주소를 포인터로 직접 사용하지 않고, 참조 생성을 나타내는 별표(asterisk `*`)를 작성할 필요가 없습니다. 대신에, Swift에서 이러한 참조는 다른 상수나 변수처럼 정의됩니다. 표준 라이브러리는 직접 포인터와 상호작용할 필요가 있을때 사용할 수 있는 포인터(`pointer`)와 버퍼 타입(`buffer types`)을 제공합니다. - [수동으로 메모리 관리하기(Manual Memory Management)](https://developer.apple.com/documentation/swift/swift_standard_library/manual_memory_management)를 보세요.


---
