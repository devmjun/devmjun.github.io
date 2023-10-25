---
layout:     post
title:      "Swift. 정리하기 17: Swift Language Guide-Type Casting Handling"
subtitle:   "Swift Language Guide-Type Casting Handling *"
date:       2018-04-13 15:35:00
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

[Type Casting](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TypeCasting.html#//apple_ref/doc/uid/TP40014097-CH22-ID338)<br>
[까칠코더님 블로그](http://kka7.tistory.com/124?category=919617)

---

## Type Casting

`타입 변환(Type casting)`은 인스턴스의 타입을 확인하는 방법 또는 인스턴스를 다른 상위 클래스나 클래스 계층구조에 있는 다른 하위 클래스처럼 처리합니다.

Swift에서 타입 변환은 `is`와 `as`연산자로 구현됩니다. 이러한 두 연산자는 값의 타입을 확인하거나 다른 타입으로 값을 변환하는 것을 제공하는 간단한 표현 방법을 제공합니다.

또한, [프로토콜 준수하는지 확인하기(Checking for Protocol Conformance)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID283)에서 설명된것처럼, 프로토콜을 준수하는지 확인하는데 타입변환(type casting)을 사용 할 수 있습니다.

---

## Defining a Class Hierarchy for Type Casting

특정 클래스 인스턴스의 타입을 확인하고 같은 계층구조에 있는 다른 클래스 인스턴스로 변환하기 위해 클래스의 계층구조와 하위 클래스에 대해 타입 변환을 사용할 수 있습니다. 아래에 3개의 코드는 타입 변환의 예제에서 사용하기 위해, 클래스의 계층 구조를 정의하고 이러한 클래스의 인스턴스를 포함하는 배열을 정의합니다.

첫번째 부분은 새로운 기본 클래스 `MediaItem`을 정의합니다. 이 클래스는 디지털 미디어 라이브러리에서 나타나는 모든 종류의 항목에 대한 기본 함수를 제공합니다. 특히, `string`타입의 `name` 프로퍼티와 `init name`초기화를 선언하였습니다. (모든 영화와 음악들을 포함한 모든 미디어 항목들은 이름을 가지고 있을것입니다)

```swift
class MediaItem {
    var name: String
    init(name: String) {
        self.name = name
    }
}
```

---

## Defining a Class Hierarchy for Type Casting

특정 클래스 인스턴스의 타입을 확인하고 같은 계층구조에 있는 다른 클래스 인스턴스로 변환하기 위해 클래스의 계층구조와 하위 클래스에 대해 타입 변환을 사용할 수 있습니다. 아래에 3개의 코드는 타입 변환의 예제에서 사용하기 위해, 클래스의 계층 구조를 정의하고 이러한 클래스의 인스턴스를 포함하는 배열을 정의합니다.

첫번째 부분은 새로운 기본 클래스 `MediaItem`을 정의합니다. 이 클래스는 디지털 미디어 라이브러리에서 나타나는 모든 종류의 항목에 대한 기본 함수를 제공합니다. 특히, `string`타입의 `name` 프로퍼티와 `init name`초기화를 선언하였습니다. (모든 영화와 음악들을 포함한 모든 미디어 항목들은 이름을 가지고 있을것입니다)

```swift
class MediaItem {
    var name: String
    init(name: String) {
        self.name = name
    }
}
```

다음 부분은 MediaItem의 하위클래스 2개를 정의합니다. 첫번째 하위클래스, Movie는 영화나 필름에 관한 추가 정보를 캡슐화 합니다. 해당 초기화에서, 기본 MediaItem클래스의 맨 위에 director프로퍼티를 추가합니다. 두번째 하위 클래스 Song은 artist프로퍼티와 기본 클래스 맨 위에 초기화를 추가합니다.

```swift
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
```

마지막 부분은 두개의 `Movie` 인스턴스와 3개의 `Song`인스턴스를 포함하는 상수 배열 `library`를 생성합니다. `library` 내열의 타입은 배열 리터럴의 콘텐츠로 초기화에 의해 추론 됩니다. `Swift`의 타입 검사기는 `Movie`와 `Song`이 공통적인 상위클래스 `MediaItem`를 가진것을 추론할수 있고, `library` 배열에 대한 [`MediaItem`]의 타입으로 추론합니다.

```swift
let library = [
    Movie(name: "Casablanca", director: "Michael Curtiz"),
    Song(name: "Blue Suede Shoes", artist: "Elvis Presley"),
    Movie(name: "Citizen Kane", director: "Orson Welles"),
    Song(name: "The One And Only", artist: "Chesney Hawkes"),
    Song(name: "Never Gonna Give You Up", artist: "Rick Astley")
]
// the type of "library" is inferred to be [MediaItem]
```

`library`에 저장된 항목들은 여전히 `Movie`와 `Song`인스턴스 입니다. 하지만, 배열의 콘텐츠를 반복할 경우에, 그 항목들은 `Movie`나 `Song`이 아닌 `MediaItem` 타입으로 돌려 받습니다. 원래 타입으로 작업하기 위해서, 아래 설명된 것 처럼, 이것들의 타입을 확인(`check`)하거나 다른 타입으로 다운캐스팅(`downcast`)하는 것이 필요합니다.

```swift
var movieCount = 0
var songCount = 0

for item in library {
    if item is Movie {
        movieCount += 1
    } else if item is Song {
        songCount += 1
    }
}

print("Media library contains \(movieCount) movies and \(songCount) songs")
// Prints "Media library contains 2 movies and 3 songs"
```

이 예제는 `library` 배열에 있는 모든 항목들을 반복합니다. `for-in `반복문에서 배열에 있는 다음 `MediaItem`에 `item` 상수를 설정합니다. 


현재 MediaItem이 Movie인스턴스인 경우에 item is Movie구문이 true를, 그렇지 않으면 false를 반환합니다. 비슷하게, item이 Song인스턴지인지는 item is Song으로 검사합니다. for-in 반복문의 끝에서, movieCount와 songCount의 값은 각 타입으로 발견돤 MediaItem인스턴스 개수입니다.

---

## Downcasting

특정 클래스 타입의 상수나 변수는 실제로 하위클래스의 인스턴스를 참조할 수 있습니다. 이러한 경우가 있는 곳에서, 하위클래스 타입을 `타입 캐스트 연산자(type cast operator)` (`as?` 또는 `as!`)를 사용해서 다운캐스팅(downcast) 할 수 있습니다.

다운 캐스팅이 실패할수 있기때문에, 타입 변환(cast) 동작은 두가지 다른 형태가 있습니다. 조건부 형식인 `as?`는 다운캐스팅하는 타입의 옵셔널 값을 반환합니다. 강제 형식(force type)인 `as!`은 하나의 복합 동작으로 다운캐스팅(downcast)하고 강제 언래핑(force-unwraps)을 시도합니다.

다운캐스팅이 성공하는게 확실치 않을때 조건부 형식의 타입 변환 연산자(`as?`)를 사용합니다. 이 동작 형태는 항상 옵셔널 값을 반환하고 다운캐스팅일 불가능한 경우에는 `nil`을 반환할 것입니다. 이를 통해 다운캐스팅이 성공하는지 검사하는것이 가능합니다.

다운캐스팅이 언제나 성공할꺼라고 확신할때에만 강제 형식의 타입 변환 연산자(`as!`)를 사용합니다. 이 형식의 동작은 잘못된 클래스 타입으로 다운캐스팅 하는 경우에 실행중 오류가 발생할 수 있습니다.

아래 예제는 `library`내의 각 `MediaItem`을 반복하고, 각 항목에 대한 적절한 설명을 출력합니다. 이것을 하기 위해, 각 항목이 `MediaItem`이 아니라 `Movie`또는 `Song`으로 접근하는 것이 필요합니다. 설명에서 사용되는 `Movie`나 `Song`의 `director`또는 `artist`프로퍼티에 접근이 가능하도록 하는 것이 필요합니다.

이 예제에서, 배열내의 각 항목은 `Movie` 또는 `Song`이 될수 있습니다. 각 항목을 사용하는 실제 클래스를 미리 알지 못하고, 매번 반복될때마다 조건부 형식의 타입 변환 연산자(`as?`)를 사용하여 다운캐스팅을 검사하는 것이 적절합니다.

```swift
for item in library {
    if let movie = item as? Movie {
        print("Movie: \(movie.name), dir. \(movie.director)")
    } else if let song = item as? Song {
        print("Song: \(song.name), by \(song.artist)")
    }
}

// Movie: Casablanca, dir. Michael Curtiz
// Song: Blue Suede Shoes, by Elvis Presley
// Movie: Citizen Kane, dir. Orson Welles
// Song: The One And Only, by Chesney Hawkes
// Song: Never Gonna Give You Up, by Rick Astley
```

이 예제는 현재 `item`을 `Movie`로 다운캐스팅하는 것으로 시작합니다. `item`은 `MediaItem`인스턴스이기 때문에, `Movie`가 되는것이 가능합니다. 동일하게, `Song`이나 `MediaItem`이 되는 것도 가능합니다. 이러한 불확실성(`uncertainty`) 때문에, 하위클래스 타입으로 다운캐스팅 할때 `as?` 형식의 타입 변환 연산자는 옵셔널(`optional`) 값을 반환합니다. `item as? Movie`의 결과는 `Movie?`타입 또는 옵셔널 Movie입니다.

`library`배열에 있는 `Song`인스턴스에 적용할때 `Movie` 다운캐스팅하는 것은 실패합니다. 이를 대처하기 위해서, 위 예제는 옵셔널 `Movie`가 실제 값을 가지고 있는지 확인하기 위해 옵셔널 바인딩을 사용합니다. (이것으로, 다운캐스팅의 성공 여부를 확인할 수 있습니다.) 옵셔널 바인딩은 `"if let movie = item as? Movie"`로 작성되며, 다음과 같이 읽을 수 있습니다.

`Movie`로 `item`에 접근하려고 시도합니다. 성공하는 경우에, 새로운 임시 상수 `movie`에 반환된 옵셔널 `Movie`를 저장하도록 설정합니다.

다운캐스팅이 성공하는 경우, `movie`의 프로퍼티는 `Movie`인스턴스에 대한 설명을 출력하기 위해 사용되며, `director`의 이름을 포함합니다. 비슷한 원리는 `Song` 인스턴스를 확인하는데 사용되고, `library`에서 `Song`을 찾을때마다 적절한 설명(artist 이름을 포함)을 출력합니다.

> Note: 변환하는 것은 실제적으로 인스턴스를 수정하거나 값을 변경하지 않습니다. 기본 인스턴스는 동일하게 유지합니다. 그것은 단순하게 처리하고 변환된 타입의 인스턴스로 접근됩니다.

---

## Type Casting for Any and AnyObject

`Swift`는 지정되지 않은 타입으로 작업하기 위해 2가지 특별한 타입을 제공합니다.

`Any`는 함수 타입을 포함해서 모든 타입의 인스턴스를 표현할 수 있습니다.
`AnyObject`는 모든 클래스 타입의 인스턴스를 표현할 수 있습니다.
동작과 기능이 명시적으로 필요할때에만 `Any`와 `AnyObject`를 사용합니다. 코드에서 작업할 것으로 예상되는 타입을 구체적으로 하는 것이 더 좋습니다.

다음은 함수 타입과 클래스가 아닌 타입을 포함하여, 서로 다른 타입으로 작업하기 위해 Any를 사용하는 예제입니다. 이 예제는 Any타입의 값을 저장할 수 있는 things 배열을 생성합니다.

```swift
var things = [Any]()

things.append(0)
things.append(0.0)
things.append(42)
things.append(3.14159)
things.append("hello")
things.append((3.0, 5.0))
things.append(Movie(name: "Ghostbusters", director: "Ivan Reitman"))
things.append({ (name: String) -> String in "Hello, \(name)" })
```

`things`배열 상수는 2개의 `Int`값, 2개의 `Double` 값, 1개의 `String`값, 1개의 `(Double, Double)` 타입의 튜플, `Ghostbusters` 인 `movie`와 `String`값을 가져와서 다른 `String`값을 반환하는 클로져 표현식을 포함합니다.

`Any`나 `AnyObject` 타입으로 알려진 상수나 변수의 특정 타입을 찾기 위해서, `switch` 문의 케이스에서 `is`나 `as` 패턴을 사용할 수 있습니다. 아래 예제는 `things` 배열내의 항목들을 반복하고 `switch`문으로 각 항목의 타입을 조회합니다. 몇가지 `switch`문의 케이스는 값을 출력할 수 있도록 일치한 값을 지정된 타입의 상수로 연결(`bind`)합니다

```swift
for thing in things {
    switch thing {
    case 0 as Int:
        print("zero as an Int")
    case 0 as Double:
        print("zero as a Double")
    case let someInt as Int:
        print("an integer value of \(someInt)")
    case let someDouble as Double where someDouble > 0:
        print("a positive double value of \(someDouble)")
    case is Double:
        print("some other double value that I don't want to print")
    case let someString as String:
        print("a string value of \"\(someString)\"")
    case let (x, y) as (Double, Double):
        print("an (x, y) point at \(x), \(y)")
    case let movie as Movie:
        print("a movie called \(movie.name), dir. \(movie.director)")
    case let stringConverter as (String) -> String:
        print(stringConverter("Michael"))
    default:
        print("something else")
    }
}

// zero as an Int
// zero as a Double
// an integer value of 42
// a positive double value of 3.14159
// a string value of "hello"
// an (x, y) point at 3.0, 5.0
// a movie called Ghostbusters, dir. Ivan Reitman
// Hello, Michael
```

> Note: Any 타입은 옵셔널 타입을 포함해서, 모든 타입의 값을 표현합니다. `Swift`는 `Any타입의 값이 예상되는 곳에서 옵셔널 값을 사용하는 경우에 경고(warning)을 줍니다. `Any`값으로 옵셔널 값을 사용하는게 정말 필요한 경우에, 아래에서 보는 것처럼, `as` 연산자를 사용 옵셔널 `Any`로 명시적인 변환을 할 수 있습니다.

```swift
> let optionalNumber: Int? = 3 > things.append(optionalNumber) // Warning > things.append(optionalNumber as Any) // No warning
```

---













