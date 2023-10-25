---
layout:     post
title:      "Swift, Identity Operators ==, ===, is"
subtitle:   "Identical to, equal to, is"
date:       2018-04-11 10:00:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/testimage1.png
thumbnail-img: /assets/post_img/background/testimage1.png
share-img: /assets/post_img/background/testimage1.png
toc: true
---

## Identity Operators

클래스는 참조 유형이므로 여러개의 상수 및 변수가 동일한 클래스의 인스턴스를 참조할수 있습니다.(구조체와 열거형은 상수나 변수에 할당되거나 함수에 전달될때 항상 복사되기 때문에 마찬가지 같입니다.)

두 개의 상수 또는 변수가 클래스의 동일한 인스턴스를 정확히 참조하는지 알아내는 것이 유용할 수 있습니다. 이를 가능하게 하기 위해 Swift는 두개의 ID 연산자를 제공합니다. 

- Identical to (===)
- Not identical to (!==)

다음 연산자를 사용하여 두개의 상수 또는 변수가 동일한 단일 인스턴스를 참조하는지 확인할수 있습니다.

```swift
if tenEighty === alsoTenEighty {
    print("tenEighty and alsoTenEighty refer to the same VideoMode instance.")
}
// Prints "tenEighty and alsoTenEighty refer to the same VideoMode instance."
```

> Note: `Identical to`(3개의 등호 또는 ===)은 `equal to`(두개의 등호 또는 ==)와 동일한 의미는 아닙니다.


`Identical to`는 두개의 상수 또는 변수의 클래스 타입이 같은 클리스 인스턴스를 참조함을 의미합니다. 


`Equal to`은 두개의 인스턴스가 값 속에서 `equal` 또는 `equivalent`하다고 간주함을 의미합니다.

고유한 사용자가 정한 클래스 및 구조체를 정의할때 두가지 인스턴스가 `equal`한 자격을 갖는지 결정하는것은 사용자의 책임입니다. 

`equal to` 또는 `not equal to` 연산자에 대한 고유한 구현을 정의하는 프로세스는 [Equivalence Operators](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID45)에서 설명합니다.

---

## Checking Type 

타입 점검 연산자 `is`를 사용하여 인스턴스가 특정 서브클래스 유형인지 여부를 점검합니다. 타입검사 연산자는 서브 클래스 타입의 인스턴스이면 `true`를 그렇지 않으면 `false`를 반환합니다. 

아래의 예제에서는 라이브러리 배열의 Movie 및 Song 인스턴스 수를 계산하는 두개의 변수인 movieCount 및 songCount를 정의합니다. 

```swift
// 1
class MediaItem {
    var name: String
    init(name: String) {
        self.name = name
    }
}

// 2
class Movie: MediaItem {
    var director: String
    init(name: String, director: String) {
        self.director = director
        super.init(name: name)
    }
}
 
class Song: MediaItem {
    var artist: String
    init(name: String, artist: String) {
        self.artist = artist
        super.init(name: name)
    }
}

// 3
let library = [
    Movie(name: "Casablanca", director: "Michael Curtiz"),
    Song(name: "Blue Suede Shoes", artist: "Elvis Presley"),
    Movie(name: "Citizen Kane", director: "Orson Welles"),
    Song(name: "The One And Only", artist: "Chesney Hawkes"),
    Song(name: "Never Gonna Give You Up", artist: "Rick Astley")
]

// 4
var movieCount = 0
var songCount = 0
 
for item in library {
    if item is Movie {
        movieCount += 1
    } else if item is Song {
        songCount += 1
    }
}

// 5 
print("Media library contains \(movieCount) movies and \(songCount) songs")
// Prints "Media library contains 2 movies and 3 songs"
```

위 예제는 라이브러리 `배열`의 모든 항목을 반복합니다. 

`item is Movie`는 현재 MediaItem 이 Movie 인스턴스이면 ture 반환하고 그렇지 않으면 false를 반환합니다. 

마찬가지로 item의 항목이 Song 인스턴스인지 확인합니다. for-in 루프가 끝날때마다 movieCount 및 songCount의 값에서 각 유형에서 발견된 MediaItem 인스턴스 수를 포함합니다. 

---

## 예시

```swift

print("\n---------- [ Instance Type Check ] ----------\n")

let str = "StringInstance"
print(str is String)           // true, str 은 String Type 의 객체, 스트링의 객체가 맞으면 참트루
print(str == "StringInstance") // true, str 은 "StringInstance" 와 동일
print(str is String.Type)      // false
print(str is String.Type.Type) // false



print("\n---------- [ Type's Type check ] ----------\n")

print(type(of: str) is String)       // false, String is String 과 동일.. 그니까 String == String.Type을 물어본거
print(type(of: str) == String.self)  // true, str 객체의 타입은 String 그 자체, String.Type == String.Type
print(type(of: str) is String.Type)  // true, str 객체의 타입은 String.Type 의 객체 String의 타입 == String.type



print("\n---------- [ Metatype's Type check ] ----------\n")

private let meta = type(of: String.self)
print(meta is String)  // false
print(meta == String.self)  // false
print(meta == String.Type.self)  // true, String 메타타입은 String.Type
print(meta is String.Type.Type)  // true, String 메타타입은 String.Type.Type 의 객체
```

---

## Reference

[Identity Operators](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ClassesAndStructures.html#//apple_ref/doc/uid/TP40014097-CH13-ID82) <br>
[Equivalence Operators](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID45)<br>
[Checking Type](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TypeCasting.html#//apple_ref/doc/uid/TP40014097-CH22-ID338)

- 연관된 포스트
	- [<U>Swift. Type method</U>](https://devmjun.github.io/archive/Type_Methods)
	- [<U>Swift. Meta Type</U>](https://devmjun.github.io/archive/Meta_Type_Swift)
	- [<U>Protocol Composition Type</U>](https://devmjun.github.io/archive/Protocol_Composition_Type)
	- [<U>Compile-Time vs Run-Time Type Checking in Swift</U>](https://devmjun.github.io/archive/Compile-Time_vs_Run_Time_Type_checking_in_Swift)
	- [<U>ComputerScience. Compile-time vs Run-Time</U>](https://devmjun.github.io/archive/Whats_the_difference_between_run-time_and_compile-time)