---
layout:     post
title:      "Swift. 정리하기 9"
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

- 값을 저장하기 위해 프로퍼티 정의
- 기능을 제공하기 위해 메소드 정의
- 값에 대해 서브스크립트(subscript) 문법으로 접근하기 위해 서브스크립트(subscripts) 정의
- 초기상태를 설정하기 위해 초기화 정의
- 기본적인 구현을 넘어서 기능을 확장

특정 종류의 표준 기능을 제공하는 프로토콜 준수
더 자세한 정보는 [프로퍼티(Properties)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID254), [메소드(Methods)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Methods.html#//apple_ref/doc/uid/TP40014097-CH15-ID234), [서브스크립트(Subscripts)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Subscripts.html#//apple_ref/doc/uid/TP40014097-CH16-ID305), [초기화(Initialization)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID203), [확장(Extensions)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Extensions.html#//apple_ref/doc/uid/TP40014097-CH24-ID151), [프로토콜(Protocols)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID267)을 보세요.

클래스는 가능하지만 구조체는 가능하지 않는 것

- 다른 속성을 상속받기 위해 하나의 클래스를 상속받을 수 있습니다.
- 실사간으로 클래스 인스턴스 타입의 변환과 확인을 위해 타입 캐스팅이 가능합니다.
- 해제(Deinitializer)는 클래스의 인스턴스가 할당한 자원을 풀어줍니다.
- 참조개수(Reference counting)은 클래스 인스턴스를 한 번 이상 참조할 수 있게 해줍니다.

더 자세한 정보는 [상속(Inheritance)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-ID193), [타입 변환(Type Casting)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TypeCasting.html#//apple_ref/doc/uid/TP40014097-CH22-ID338), [해제(Deinitialization)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Deinitialization.html#//apple_ref/doc/uid/TP40014097-CH19-ID142), [자동 참조 개수(Automatic Reference Counting)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID48)를 보세요.

> Note: 코드에서 구조체는 항상 복사되어 전달되고, 참조 개수를 사용하지 않습니다.

---

## definition Syntax

```swift
// 1
class SomeClass {
    // class definition goes here
}
struct SomeStructure {
    // structure definition goes here
}

// 2
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

### - Class and Strue Instances

```swift
let someResolution = Resolution()
let someVideoMode = VideoMode()
```

### - Accessing Properties

```swift
// 1
print("The width of someResolution is \(someResolution.width)")
// Prints "The width of someResolution is 0"

// 2
print("The width of someVideoMode is \(someVideoMode.resolution.width)")
// Prints "The width of someVideoMode is 0"

// 3
someVideoMode.resolution.width = 1280
print("The width of someVideoMode is now \(someVideoMode.resolution.width)")
// Prints "The width of someVideoMode is now 1280"
```

### - Memberwise Initializers for Structure Types

모든 구조체는 자동으로 생성된(automatically-generated) `멤버 초기화(memberwise initializer)`를 가지고 있으며, 새로운 구조체 인스턴스의 멤버 프로퍼티 초기화에 사용할 수 있습니다. 새로운 인스턴스의 프로퍼티에 대한 초기값은 이름으로 멤버 초기화에 전달할 수 있습니다.


```swift
let vga = Resolution(width: 640, height: 480)
```

구조체와 다르게, 클래스 인스턴스는 기본적으로 멤버초기화를 제공하지 않습니다. 초기화는 [초기화(Initialization)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID203)에서 더 자세히 설명되어 있습니다.

---

## Structures and Enumerations Are Value Types

`값 타입(value type)`은 변수나 상수에 할당하거나 함수에 전달될때 값을 복사한다(copied).

실제로 이전 챕터(chapters)에서 값 타입을 광범위하게 사용했었습니다. 사실상, Swift의 모든 기본 타입(정수형, 실수형 숫자, Boolean, 문자열, 배열과 딕셔너리)은 값 타입이고, 화면 뒤에서(behind the scenes) 구조체처럼 구현됩니다.

Swift에서 모든 구조체와 열거형은 값 타입입니다. 이것은 생성한 모든 구조체와 열거형 인스턴스-그리고 프로퍼티로 가져온 값 유형은 코드에서 전달할때 항상 복사되는 것을 의미합니다.

이전 예제에서 `Resolution` 구조체를 사용하는 예제를 생각해보세요.

```swift
let hd = Resolution(width: 1920, height: 1080)
var cinema = hd
```

예제는 hd상수를 선언하고, 풀 HD 비디오의 가로와 세로로(1920픽셀 폭과 1080픽셀 높이) 초기화된 `Resolution`인스턴스를 설정하였습니다.

그리고나서 cinema 변수로 선언하고 hd의 현재값을 설정합니다. Resolution은 구조체이므로, 기존 인스턴스는 복사(copy)되고, cinema로 새로운 복사본이 할당됩니다. hd와 cinema는 이제 같은 넓이와 높이를 가지지만, 둘은 완전히 다른 인스턴스 입니다.

다음으로, cinema의 width프로퍼티는 디지털 영화 프로젝션(2048픽셀 폭과 1080픽셀 높이)으로 사용되는 약간 넓은 2K 넓이가 되도록 수정(amended)됩니다.

```swift
cinema.width = 2048
```

cinema의 width프로퍼티가 정말로 2048로 변경되었는지 확인하세요.

```swift
print("cinema is now \(cinema.width) pixels wide")
// Prints "cinema is now 2048 pixels wide"
```

하지만, 원래 hd인스턴스의 width프로퍼티는 여전히 예전 1920값을 가지고 있습니다.


```swift
print("hd is still \(hd.width) pixels wide")
// Prints "hd is still 1920 pixels wide"
```

hd의 현재값이 cinema으로 주어질때, hd에 저장되어 있는 값은 새로운 cinema인스턴스로 복사됩니다. 결과적으로, 두개의 인스턴스는 `구분`되며, 같은 숫자 값을 포함합니다. 별도의 인스턴스이기 때문에, cinema의 넓이에 2048 설정하면, hd에 저장된 넓이에 영향이 없습니다.

동일한 동작이 열거형에도 적용됩니다.

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

이 예제는 하나의 새로운 상수 tenEighty를 선언하고 VideoMode클래스의 새로운 인스턴스를 참조하도록 설정합니다. 비디오 모드는 이전의 1920 x 1080 HD 해상도의 복사본을 할당합니다. interlaced로 설정되고, "1080i"이름을 가집니다. 마지막으로, 초당 프레임 비율을 25.0으로 설정합니다.

다음으로, tenEighty는 새로운 상수 alsoTenEighty로 할당되고, alsoTenEighty의 프레임 비율은 수정됩니다.


```swift
let alsoTenEighty = tenEighty
alsoTenEighty.frameRate = 30.0
```

클래스가 참조타입 이기 때문에, `tenEighty`와 `alsoTenEighty`둘다 같은 `VideoMode`인스턴스를 참조합니다. `사실상(effectively)`, 하나의 인스턴스에 대해 두개의 다른 이름을 가집니다.

tenEighty의 frameRate프로퍼티가 VideoMode인스턴스를 기초로 하는 새로운 30.0프레임 비율로 정확히 보여지는지 확인하세요.

```swift
print("The frameRate property of tenEighty is now \(tenEighty.frameRate)")
// Prints "The frameRate property of tenEighty is now 30.0"
```

`tenEighty`와 `alsoTenEighty`는 변수가 아닌 상수로 선언되는 것을 주의하세요. 하지만, `tenEighty`와 `alsoTenEighty`의 값은 실제 변경되지 않는 상수이기 때문에, `tenEighty.frameRate`와 `alsoTenEighty.frameRate`를 변경 되지 않습니다. `tenEighty`와 `alsoTenEighty`는 `VideoMode`인스턴스를 저장하지 않습니다. - 대신, 둘다 `VideoMode`인스턴스를 참조(refer) 합니다. `VideoMode`의 `frameRate`프로퍼티는 변경되며, `VideoMode`의 참조 상수의 값은 변경되지 않습니다.

---

## Identity Operators

### - Pointers

, C++, Objective-C 경험이 있다면, 이러한 언어가 메모리 주소에 대한 참조를 위해 포인터(pointer)를 사용하는 것을 알고 있을것 입니다. Swift 상수나 변수는 어떤 참조 타입의 인스턴스를 참조하는 것은 C에서의 포인터와 유사하지만, 메모리의 주소를 포인터로 직접 가리키지 않고, 참조 생성을 나타내는 `별표(asterisk *)` 작성이 필요하지 않습니다. 대신, 이러한 참조는 스위프트의 모든 다른 상수나 변수처럼 정의됩니다.

---

## Choosing Between Classes and Structures

클래스와 구조체 둘다 사용자정의 데이터 타입을 정의하기 위해 프로그램 코드의 블록을 만들어 사용할 수 있습니다.

하지만, 구조체 인스턴스는 항상 `값(value)`으로 전달되고 클래스 인스턴스는 항상 `참조(reference)`로 전달됩니다. 이는 다양한 종류의 작업(task)에 적합 하다는 것을 의미합니다. 프로젝트에 필요한 데이터 구조와 기능을 고려하여, 각 데이터 구조를 클래스나 구조체로 정의할지를 결정합니다.

일반적인 지침(guideline)으로, 다음의 조건들 중 하나 이상이 해당되면, 구조체로 만드는 것을 고려하세요.

- 구조체의 주요 목적은 비교적 단순한 데이터 값을 캡슐화 합니다.
- 구조체의 인스턴스를 할당하거나 전달할때 캡슐화된 값이 참조보다는 복사되는 것을 기대하는 것이 합리적입니다.
- 구조체는 저장되어있는 모든 프로퍼티는 값 타입이며, 참조가 아닌 복사되는 것을 기대합니다.
- 구조체는 기존의 다른 타입으로 부터 프로퍼티나 동작들 상속이 필요하지 않습니다.

구조체를 포함하는 좋은 후보(candidates)에 대한 예는 다음과 같습니다.

- 아마도 기하학적인 도형의 크기에서, width와 height프로퍼티를 캡슐화하며, 둘다 Double타입입니다.
- 아마 시리즈(series) 내의 범위를 참조하는 한가지 방법,start와 length 프로퍼티를 캡슐화하며, 둘다 Int타입입니다.
- 아마도 3D 좌표 시스템의 위치에서, x, y, z 프로퍼티를 캡슐화 하며, 각각은 Double타입입니다.

다른 모든 경우에, 클래스를 정의하고, 관리할 클래스 인스턴스를 생성하고 참조로 전달됩니다. 실제로(practice), 이것은 대부분의 사용자정의 데이터 구조는 구조체가 아니라 클래스로 만드는 것을 의미합니다.

---

## Assignment and Copy Behavior for Strings, Arrays, and Dictionaries

Swift에서 `String`, `Array`, `Dictionary`와 같은 기본 `데이터 타입은 구조체`로 구현됩니다. 이는 문자열, 배열, 딕셔너리 같은 데이터가 새로운 상수나 변수에 할당하거나 함수나 메소드에 전달될때 복사되는 것을 의미합니다.

이 동작은 Foundation과 다릅니다: `NSString`, `NSArray`, `NSDictionay`는 구조체가 아니라 클래스로 구현됩니다. `Foundation`에서 문자열, 배열과 딕셔너리는 항상 기존 인스턴스에 복사보다는 참조로 할당되고 전달됩니다.

> Note:  위에 언급된 설명은 문자열, 배열, 딕셔너리의 복사하기를 의미합니다. 이 동작은 코드에서 항상 복사된것 처럼 볼수 있을 것입니다. 하지만, Swift는 내부적으로 필요한 경우에만 복사를 수행합니다. Swift는 최적의 성능을 보증하기 위해 모든 값을 복사해서 관리하고, 최적화를 위해 할당하는 것을 피하지 않을 것입니다.

> 내부적으론 참조형태도 동작할수 있으나 알아서 최적화 해주니, 우리는 그냥 값 타입으로 생각하고 사용하면 된다는 의미로 해석되네요.

---






