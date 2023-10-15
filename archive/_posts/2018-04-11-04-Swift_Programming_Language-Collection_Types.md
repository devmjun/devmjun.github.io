---
layout:     post
title:      "Swift. 정리하기 4: Language Guide-Collection Types"
subtitle:   "Swift Language Guide-Collection Types *"
date:       2018-04-11 19:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
---

최종 수정일: 2018.10.1

## Refernece 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다

[Collection Types](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-ID105)<br>
[까칠코더님 블로그](http://kka7.tistory.com/110?category=919617)<br>

---

## Collection Type 

Swift는 컬렉션 값을 저장하는 `array`, `sets`, `dictionaries` 3가지 컬렉션 타입(collection types)을 제공합니다. 배열(Array)는 정렬된 값을 저장하는 컬렉션입니다. 세트(Sets)는 고유한 값을 가지는 정렬되지 않은 컬렉션 입니다. 딕셔너리(Dictionaries)는 키-값(key-value) 이 연결된 정렬되지 않은컬렉션 입니다.

<center><img src="/img/posts/Swift_Programming_Language-1.png" width="700"></center> <br> 

Swift에서 배열, 세트, 딕셔너리는 항상 저장할 수 있는 값과 키의 타입이 명확합니다. 이는 실수로 컬렉션에 잘못된 타입의 값을 삽입할수 없다는 것을 의미합니다. 또한, 컬렉션으로 부터 가져오는 값의 타입에 대해서 확신(confident)할 수 있다는 것을 의미합니다.


> Note: Swift의 배열, 세트, 딕셔너리 타입은 `제네릭 컬렉션(generic collections)`으로 구현되어 있습니다. 제네릭 타입과 컬렉션에 대해 더 자세한 정보는 제네릭(Generics)를 보세요.[Generics](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID179)

---

## Mutability of Collections

배열(array), 세트(set), 딕셔너리(dictionary)를 만들어 변수에 할당하는 경우, 컬렉션은 변경가능(mutable) 하도록 생성될 것입니다. 이는 컬렉션을 만들고나서 추가하고, 제거하고, 컬렉션의 항목들을 변경(mutate)할 수 있다는 것을 의미합니다. 배열(array), 세트(set), 딕셔너리(dictionary)가 상수로 할당하는 경우, 컬렉션은 변경불가능(immutable)하고, 크기와 내용을 변경할 수 없습니다.

> Note: 변경할 필요가 없는 컬렉션을 사용하는 경우에는 변경불가능(immutable) 컬렉션으로 만드는게 좋습니다. 코드에 대해 이해하기 쉽고 Swift 컴파일러가 생성한 컬렉션의 성능을 최적화하는 것이 가능합니다.


---

## Array 

배열(array)은 정렬된 목록으로 같은 타입의 값을 저장합니다. 같은 값이 배열내의 다른 위치에서 여러번 나올수 있습니다.

> Note: Swift의 배열 타입은 Foundation의 NSArray 클래스와 연결됩니다.
Foundation과 Cocoa에서Array사용에 대한 더 자세한 정보는, [Array와 NSArray간의 연결하기(Bridging Between Array and NSArray)](https://developer.apple.com/documentation/swift/array#2846730)를 보세요.

### - Array Type Shorthand Syntax 

Swift의 배열 타입은 `Array<Element>`로 작성하며, `Element`는 배열에 저장할수 있는 값의 타입입니다. `[Element]`와 같이, 축약 형태을 사용하여 배열의 타입을 작성할 수 있습니다. 비록 두개의 형식이 기능적으로 동일하지만, 축약 형태를 선호하고, 배열의 타입에 관련된 가이드에서 두루(throughout) 사용됩니다.



### Creating an Empty Array

초기화 문법을 사용해서 특정 타입의 빈 배열을 만들수 있습니다.

```swift
var someInts = [Int]()
print("someInts is of type [Int] with \(someInts.count) items.")
// Prints "someInts is of type [Int] with 0 items."
```

`someInts` 변수의 타입은 초기화의 타입으로부터 [Int]로 추론되는 것을 주의합니다.

대신에, 함수 인자나 이미 타입이 있는 변수나 상수와 같이, 타입 정보를 이미 제공하는 경우, 빈 배열 리터럴 [](빈 대괄호 한쌍)을 작성하여, 빈 배열을 만들수 있습니다.

```swift
someInts.append(3)
// someInts now contains 1 value of type Int
someInts = []
// someInts is now an empty array, but is still of type [Int]
```

### Creating an Array with a Default Value

Swift의 Array 타입은 특정 크기의 배열을 모두 동일한 기본 값으로 설정해서 만드는 초기화를 제공합니다. 초기화에 적절한 타입의 기본 값을 넘기고(repeating), 새로운 배열에서 값이 반복되는 횟수(count)를 넘깁니다.

```swift
var threeDoubles = Array(repeating: 0.0, count: 3)
// threeDoubles is of type [Double], and equals [0.0, 0.0, 0.0]
```

### Creating an Array by Adding Two Arrays Together

서로 호환되는 타입의 기존 두개의 배열을 더하기 연산자(+)를 사용해서 새로운 배열을 만들수 있습니다. 새로운 배열의 타입은 함께 추가된 두 배열의 타입으로 추론됩니다.

```swift
ar anotherThreeDoubles = Array(repeating: 2.5, count: 3) // anotherThreeDoubles is of type [Double], and equals [2.5, 2.5, 2.5] var sixDoubles = threeDoubles + anotherThreeDoubles // sixDoubles is inferred as [Double], and equals [0.0, 0.0, 0.0, 2.5, 2.5, 2.5]
```

### Creating an Array with an Array Literal

하나 이상의 값을 배열 컬렉션을 작성하는 축약법으로 `배열 리터럴(array literal)`로 배열을 초기화 할수 있습니다. 배열 리터럴은 콤마로 구분되며, 대괄호 한쌍으로 감싸져 있는, 값의 목록입니다.

```swift
[value 1, value 2, value 3]
```

아래 예제는 String값을 저장하는 shoppingList 배열을 만듭니다.

```swift
var shoppingList: [String] = ["Eggs", "Milk"]
// shoppingList has been initialized with two initial items
```

shoppingList 변수는 문자열 값의 배열로 선언되며, [String]으로 작성됩니다. 이 특별한 배열은 String 타입으로 지정되었기 때문에, String값만을 저장할 수 있습니다. 여기에서, shoppingList 배열은 두개의 String 값 ("Eggs"와 "Milk")으로 초기화되며, 배열 리터럴로 작성했습니다.

> Note: shoppingList 배열은 변수(var 지시자)로 선언되어 있고 상수(let지시자)가 아니기 때문에 아래 예제에서 쇼핑 목록이 더 추가됩니다.

이 경우에, 배열 리터럴은 두개의 String값만을 포함하고 있습니다. shoppingList 변수의 선언(배열은 String값만을 포함할수 있음) 타입과 일치하고, 배열 리터럴의 할당은 두개의 초기화 항목으로 shoppingList를 초기화하는 것과 같은 방법으로 허용됩니다.

Swift의 타입 추론 덕분에, 같은 타입의 값을 가지는 배열 리터럴로 초기화된 경우에, 배열의 타입을 작성할 필요가 없습니다. shoppingList의 초기화는 축약형식으로 작성할 수 있습니다.

```swift
var shoppingList = ["Eggs", "Milk"]
```

배열 리터럴 내의 모든 값들이 동일한 타입이기 때문에, Swift는 `[String]`이 `shoppingList` 변수에 대해서 올바른 타입을 사용하는 것으로 추론할 수 있습니다.

### Accessing and Modifiying an Array 

메소드와 프로퍼티, 또는 서브스크립트 문법을 사용하여 배열을 사용하고 수정합니다.

배열내의 항목 갯수를 얻기 위해, 읽기 전용인 count프로퍼티를 확인합니다.


```swift
print("The shopping list contains \(shoppingList.count) items.")
// Prints "The shopping list contains 2 items."
```

Boolean isEmpty프로퍼티는 count프로퍼티가 0과 같은지 확인하는데 사용합니다.


```swift
if shoppingList.isEmpty {
    print("The shopping list is empty.")
} else {
    print("The shopping list is not empty.")
}
// Prints "The shopping list is not empty."
```

배열의 append(_:) 메소드를 호출하여 새로운 항목을 배열의 끝부분에 추가할 수 있습니다.

```swift
shoppingList.append("Flour")
// shoppingList now contains 3 items, and someone is making pancakes
```

또는(alternatively), 추가 할당 연산자(`+=`)를 사용하여 하나 이상의 호환가능한 항목들의 배열을 추가합니다.

```swift
shoppingList += ["Baking Powder"]
// shoppingList now contains 4 items
shoppingList += ["Chocolate Spread", "Cheese", "Butter"]
// shoppingList now contains 7 items
```

`서브스크립트 문법(subscript syntax)`으로 배열 값을 가져오며, 배열의 이름 바로 뒤 대괄호 안에 원하는 값의 인덱스를 전달합니다.

```swift
var firstItem = shoppingList[0]
// firstItem is equal to "Eggs"
```

> Note: 배열의 첫번째 항목은 인덱스가 1이 아니고 0입니다. Swift에서 배열은 항상 제로 인덱스(zero-indexed) 입니다.

주어진 인덱스에 있는 기존 값을 변경하기 위해 서브스크립트 문법을 사용할 수 있습니다

```swift
shoppingList[0] = "Six eggs"
// the first item in the list is now equal to "Six eggs" rather than "Eggs"
```

서브스크립트 문법을 사용할때, 유효한 인덱스를 지정해야 합니다. 예를 들어, `shoppingList[shoppingList.count] = "Salt"`으로 배열의 끝에 항목을 추가하려고 하면, 런타임 오류가 발생합니다.

또한 한번에 값의 범위를 변경하기 위해, 서브스크립트 문법을 사용할 수 있습니다. 심지어는 교체하려는 값이 다른 길이를 가지고 있어도 교체할수 있습니다. 다음 예제는 `"Chocolate Spread", "Cheese", "Butter"을 "Bananas", "Apples"`로 교체합니다.

```swift
shoppingList[4...6] = ["Bananas", "Apples"]
// shoppingList now contains 6 items
```

지정된 인덱스 위치에 항목을 삽입하기 위해, 배열의 `insert(_:at:)` 메소드를 호출합니다.

```swift
shoppingList.insert("Maple Syrup", at: 0)
// shoppingList now contains 7 items
// "Maple Syrup" is now the first item in the list
```

쇼핑 목록의 맨 앞부분에 `"Maple Syrup"` 값으로된 새로운 항목을 삽입하기 위해, `insert(_:at:)`메소드를 호출하며, 0 인덱스로 표시합니다.

비슷하게, `remove(at:)` 메소드로 배열에서 항목을 제거합니다. 이 메소드는 지정된 인덱스에 있는 항목을 제거하고 제거된 항목을 반환합니다(반환된 값이 필요하지 않는 경우에 무시할수 있습니다.)

```swift
let mapleSyrup = shoppingList.remove(at: 0)
// the item that was at index 0 has just been removed
// shoppingList now contains 6 items, and no Maple Syrup
// the mapleSyrup constant is now equal to the removed "Maple Syrup" string
```

> Note: 배열의 기존 범위 밖에 있는 인덱스에 대한 값을 사용하거나 수정하려고 하면, 런타입 오류가 발생할 것입니다. 배열을 사용하기 전에 count 프로퍼티로 비교하여 유효한 인덱스인지 확인 할 수 있습니다. 배열은 0부터 인덱스 되기 때문에 배열에서의 마지막 유효한 인덱스는 `count -1`입니다. - 하지만, `count`가 `0`인경우(배열이 비어있음을 의미)에는 유효하지 않은 인덱스 입니다

배열에서 항목이 제거될때, 배열의 틈새(gaps)는 닫히고, 인덱스 0에 있는 값은 다시한번 `"Six eggs"`와 같습니다.

```swift
firstItem = shoppingList[0]
// firstItem is now equal to "Six eggs"
```

배열에서 마지막 항목을 제거하길 원하는 경우, `remove(at:)` 메소드를 사용하는 대신에 배열의 `count` 프로퍼티를 조회할 필요가 없는 `removeLast()`메소드를 사용합니다. `remove(at:)` 메소드처럼, `removeLast()`는 제거된 항목을 반환합니다.

```swift
let apples = shoppingList.removeLast()
// the last item in the array has just been removed
// shoppingList now contains 5 items, and no apples
// the apples constant is now equal to the removed "Apples" string
```

### - Iterating Over an Array 

`for-in` 반복문으로 배열에 있는 전체 값을 설정을 반복할 수 있습니다.

```swift 
for item in shoppingList {
    print(item)
}
// Six eggs
// Milk
// Flour
// Baking Powder
// Bananas
```

각 항목의 정수 인덱스와 해당 값이 필요한 경우에, 배열을 반복하는 대신에 `enumerated()` 메소드를 사용합니다. 배열에서의 각 항목에 대해서, `enumerated()` 메소드는 정수와 항목으로 구성된 튜플을 반환합니다. 정수는 0부터 시작하고 각 항목당 하나씩 올라갑니다. 배열 전체를 나열하면, 이 정수는 항목들의 인덱스와 같습니다. 반복의 일부에서 임시 상수나 변수로 튜플을 분해할 수 있습니다.


```swift
for (index, value) in shoppingList.enumerated() {
    print("Item \(index + 1): \(value)")
}
// Item 1: Six eggs
// Item 2: Milk
// Item 3: Flour
// Item 4: Baking Powder
// Item 5: Bananas
```

`for-in`반복문에 관한 자세한 것은, [For-in 반복문(For-in Loops)](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID121)을 보세요.

---

## Sets 

`세트(set)`는 컬렉션에서 정렬하지 않은 같은 타입의 고유한(distinct) 값을 저장합니다. 항목의 순서가 중요하지 않거나, 하나의 항목이 전체에서 한번만 나와야 하는 경우에, 배열(array)대신에 세트(set)를 사용할 수 있습니다.


> Note: Swift의 `Set` 타입은 Foundation의 `NSSet`클래스와 연결(bridged)됩니다.
>
> `Foundation`과 `Cocoa`로 `Set`을 사용하는 것에 대한 자세한 정보는, [Set과 `NSSet 간의 연결(Bridging Between Set and NSSet)](https://developer.apple.com/documentation/swift/set#2845530)을 보세요.

Swift의 모든 기본 타입(`String, Int, Double, Bool`)은 기본적으로 해쉬가능(hashable)하고 세트 타입 값이나 딕셔너리 키 타입으로 사용될 수 있습니다. 연관된 값([열거형(Enumerations)](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html)에서 설명되어 있음)이 없는 열거형(Enumeration)의 case 값 또한 기본적으로 해쉬가능(hashable)합니다

> Note: Swift 표준 라이브러리의 `Hashable`프로토콜을 준수하면, 세트 값 타입이나 딕셔너리 키 타입 처럼 사용자 정의 타입을 사용할 수 있습니다. `Hashable`프로토콜을 준수하기 위해 Int를 가져올수 있는(gettable) 프로퍼티 `hashValue`를 제공해야 합니다. 타입의 `hashValue`프로퍼티에 의해 반환된 값은 동일한 프로그램의 다른 실행이나 다른 프로그램에서 같을 필요는 없습니다.
>
> `Hashable` 프로토콜은 `Equatable`을 준수하기 때문에, 이를 준수하는 타입은 동등 연산자(`==`) 구현이 반드시 필요합니다. `Equatable` 프로토콜을 준수하기 위해서 동등한 관계를 위해 `==`구현이 필요합니다. 즉, `==`의 구현은 `a, b, c` 모든 값에 대해, 반드시 다음 3가지 조건을 충족(satisfy)해야합니다.
>
> `a == a` 재귀(Reflexivity)
> `a == b`는 `b == a`를 의미. 대칭(Symmetry)
> `a == b && b == c`는 `a == c`를 의미. 이행성(Transitivity)




### - Set Type Syntax 

Swift 세트(set)의 타입은 `Set<Element>`로 작성하며, `Element`는 세트에 저장가능한 타입입니다. 배열과는 다르게, `세트는 축약 형식`이 없습니다.



### - Creating and Initializing an Empty Set 

초기화 문법을 사용해서 특정 타입의 빈 세트를 만들 수 있습니다


```swift
var letters = Set<Character>()
print("letters is of type Set<Character> with \(letters.count) items.")
// Prints "letters is of type Set<Character> with 0 items."
```

> Note: letters 변수의 타입은 초기화 타입에서, `Set<Character>`에서 추론됩니다.

또는, 함수 인자나 이미 타입이 있는 변수나 상수처럼, 타입 정보를 이미 제공하는 경우에, `빈 배열(array) 리터럴로 빈 세트(set)를 만들수 있습니다.`

```swift
letters.insert("a") // letters now contains 1 value of type Character letters = [] // letters is now an empty set, but is still of type Set<Character
```

### Creating a Set with an Array Literal

하나 이상의 세트 컬렉션을 만드는 축약 방법처럼, 배열 리터럴로 세트를 초기화 할수 있습니다.

아래 예제는 `String`값을 저장하는 `favoriteGenres` 세트(set)를 만듭니다.

```swift
var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"] // favoriteGenres has been initialized with three initial items
```

`favoriteGenres` 변수는 `String`값의 세트로 선언되었으며, `Set<String>`으로 작성합니다. 특정 세트가 `String` 타입의 값이 지정되었기 때문에, `String` 값만을 저장할 수 있습니다. 여기에서, `favoriteGenres` 세트(set)는 3개의 String 값`("Rock", "Classical", "Hip hop")`으로 초기화되고, 배열 리터럴로 작성되었습니다.

> Note: `favoriteGenres` 세트(set)는 아래 예제에서 항목들을 추가되고 제거되기 때문에 상수(let 지시자)가 아니라 변수(var 지시자)로 선언되었습니다.

세트(Set) 타입은 배열 리터럴 단독으로는 추론 할수 없기에, `Set`를 반드시 명시적으로 선언되어야 합니다. 하지만, Swift의 타입 추론 때문에, 동일한 타입의 값으로 연속되는 배열 리터럴로 초기화 하는 경우에, 세트(set)의 타입을 작성하지 않아도 됩니다. `favoriteGenres`의 초기화는 축약 형식(shorter form)으로 작성되었습니다.

```swift
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop"]
```

### Accessing and Modifiying a Set 

세트(set)의 메소드와 프로퍼티로 사용하고 수정합니다.

세트에서 항목의 갯수를 구하기 위해, 읽기 전용인 count프로퍼티로 확인합니다.


```swift
print("I have \(favoriteGenres.count) favorite music genres.")
// Prints "I have 3 favorite music genres."
```

count프로퍼티가 0과 같은지 확인하는 축약법으로 Boolean 타입의 isEmpty프로퍼티 를 사용합니다.

```swift
if favoriteGenres.contains("Funk") {
    print("I get up on the good foot.")
} else {
    print("It's too funky in here.")
}
// Prints "It's too funky in here."
```

세트(set)의 `insert(_:)` 메소드를 호출하여 세트에 새로운 항목을 추가할 수 있습니다.

```swift
favoriteGenres.insert("Jazz")
// favoriteGenres now contains 4 items
```

세트의 `remove(_:)` 메소드를 호출하여 세트에 있는 항목을 제거 할수 있으며, 세트의 멤버인 경우에 그 항목을 제거하고, 제거된 값을 반환하거나 세트에 포함되어 있지 않으면 nil을 반환합니다. 또는, `removeAll()` 메소드로 세트에 있는 모든 항목들을 제거 할수 있습니다.

특정 항목이 세트에 포함되었는지 확인하기 위해, `contains(_:)` 메소드를 사용합니다.

```swift
if favoriteGenres.contains("Funk") {
    print("I get up on the good foot.")
} else {
    print("It's too funky in here.")
}
// Prints "It's too funky in here."
```


### Iterating Over a Set 

`for-in` 반복문으로 세트의 값을 반복 할 수 있습니다.


```swift
for genre in favoriteGenres {
    print("\(genre)")
}
// Jazz
// Hip hop
// Classical
```

for-in 반복문에 관한 자세한 것은, For-in Loops를 보세요.

Swift의 Set 타입은 정의된 순서가 없습니다. 특정 순서로 세트의 값을 반복하기 위해서, `sorted()` 메소드를 사용하며, `<`연산자를 사용해서 정렬된 배열로 세트의 요소를 반환합니다.

```swift
for genre in favoriteGenres.sorted() {
    print("\(genre)")
}
// Classical
// Hip hop
// Jazz
```

---

## Performing Set Operations

개의 세트를 함께 결합하기, 2개의 세트가 공통으로 가지는 값 결정하기, 또는 2개의 세트가 전부 또는 일부를 포함하는지나 같은 값이 없는지와 같이, 기본 세트 연산(operations)을 효과적으로 처리할 수 있습니다.



### Fundamental Set Operations 

아래 그림은 2개의 세트(a, b)로 다양한 세트의 결과를 그림자 영역으로 표현한 것입니다.

<center><img src="/img/posts/Swift_Programming_Language-2.png" width="700"></center> <br> 

- 2개의 세트의 공통 값으로 새로운 세트를 만들기 위해`intersection(_:)` 메소드를 사용합니다.
- 2개의 세트에서 둘다가 아니라, 한쪽에만 있는 세트의 값으로 새로운 세트를 만들기 위해 `symmetricDifference(_:)` 메소드를 사용합니다.
- 2개의 세트에서 세트의 모든 값으로 새로운 세트를 만들기 위해 `union(_:)`메소드를 사용합니다.
- 지정된 세트에 없는 값으로 새로운 세트를 만들기 위해 `subtracting(_:)` 메소드를 사용합니다.


```swift
let oddDigits: Set = [1, 3, 5, 7, 9]
let evenDigits: Set = [0, 2, 4, 6, 8]
let singleDigitPrimeNumbers: Set = [2, 3, 5, 7]
 
oddDigits.union(evenDigits).sorted()
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
oddDigits.intersection(evenDigits).sorted()
// []
oddDigits.subtracting(singleDigitPrimeNumbers).sorted()
// [1, 9]
oddDigits.symmetricDifference(singleDigitPrimeNumbers).sorted()
// [1, 2, 9]
```

### Set Membership and Equality 

아래 그림은 3개의 세트(`a, b, c`)로 세트 사이의 공유되는 요소를 중첩된 영역으로 표현한 것입니다. 세트는 `b`는 모든 요소가 `a`에 포함되기 때문에, `a`는 세트 `b`의 상위세트(superset)입니다. 세트 `b`와 세트 `c`는 공통으로 공유하는 요소가 없기 때문에, 따로 분리(`disjoint`)되어 있습니다.

<center><img src="/img/posts/Swift_Programming_Language-3.png" width="700"></center> <br> 

- 2개의 세트가 모두 같은 값을 가지고 있는지 결정하기 위해 같음(is equal) 연산자(`==`)를 사용합니다.
- 세트의 모든 값이 지정된 세트에 포함되는지 결정하기 위해, `isSubset(of:)` 메소드를 사용합니다.
- 세트가 지정된 세트의 모든 값을 포함하는지 결정하기 위해, `isSuperset(of:)` 메소드를 사용합니다.
- 세트가 같지않지만, 지정된 세트가 subset이거나 superset인지 결정하기 위해 `isStrictSubset(of:)` 이나 `isStrictSuperset(of:)` 메소드를 사용합니다.
- 2개의 세트가 공통 값이 없는지 결정하기 위해, `isDisjoint(with:)` 메소드를 사용합니다



```swift
let houseAnimals: Set = ["🐶", "🐱"]
let farmAnimals: Set = ["🐮", "🐔", "🐑", "🐶", "🐱"]
let cityAnimals: Set = ["🐦", "🐭"]
 
houseAnimals.isSubset(of: farmAnimals)
// true
farmAnimals.isSuperset(of: houseAnimals)
// true
farmAnimals.isDisjoint(with: cityAnimals)
// true
```

---

## Dictionaries 

`딕셔너리(dictionary)`는 정의된 순서 없이 같은 타입의 키(key)와 같은 타입의 값(value)의 조합(associations)를 저장하는 컬렉션 입니다. 각 값은 고유한 키로 조합되며, 딕셔너리내의 값을 식별하는 동작을 합니다. 배열에 있는 항목들과는 다르게, 딕셔너리에 있는 항목들은 지정된 순서가 없습니다. 식별자를 기반으로 값을 찾을 필요가 있을때 딕셔너리를 사용하며, 실생활에서 사전으로 특정 단어에 대한 정의를 찾는 것과 거의 같은 방법입니다.

> Note: Swift의 딕셔너리(Dictionary) 타입은 Foundation의 `NSDictionary` 클래스와 연관됩니다.
>
> `Foundation`과 cocoa로Dictionary 사용하는것에 대한 자세한 정보는, [Dictionary과 NSDictionary 간의 연결하기(Bridging Between Dictionary and NSDictionary)](https://developer.apple.com/documentation/swift/dictionary#2846239)를 보세요.

 
### - Dictionary Type Shorthand Syntax 

Swift 딕셔너리 타입은 `Dictionary<Key, Value>`으로 작성되며, `Key`는 딕셔너리의 키처럼 사용할 수 있는 값의 타입이며, Value는 키(keys)에 의해 딕셔너리에 저장되는 값의 타입입니다.

> Note: 딕셔너리 키 타입은 세트의 값(value) 타입 처럼, 반드시 `Hashable` 프로토콜을 준수해야 합니다.
>
> 




### Dictionary Type Shorthand Syntax

Swift 딕셔너리 타입은 `Dictionary<Key, Value>`으로 작성되며, `Key`는 딕셔너리의 키처럼 사용할 수 있는 값의 타입이며, `Value`는 키(keys)에 의해 딕셔너리에 저장되는 값의 타입입니다.

> Note: 딕셔너리 키 타입은 세트의 값(value) 타입 처럼, 반드시 Hashable 프로토콜을 준수해야 합니다.

딕셔너리의 타입은 축약 형식으로 `[Key: Value]`로 작성할수 있습니다. 비록 두가지 형식`(forms)`이 기능적으로 동일하더라도, 축약 형식를 더 선호하고 딕셔너리 타입과 관련된 가이드에서 전반적으로 사용됩니다.

### Creating an Empty Dictionay

배열 처럼, 초기화 문법을 사용하여 특정 타입의 빈 Dictionary를 만들수 있습니다.

```swift
var namesOfIntegers = [Int: String]()
// namesOfIntegers is an empty [Int: String] dictionary
```

이 예제에서 사람이 읽을수 있는 정수형의 이름을 저장하기 위해 `[Int: String]` 타입의 빈 딕셔너리 타입을 만듭니다. 키(keys)는 Int타입이고, 값`(values)`은 `String` 타입입니다.

문맥상(contenxt)에서 타입 정보를 제공하는 경우, 빈 딕셔너리 리터럴`[:](대괄호 한쌍 안에 콜론)`로 비어 있는 딕셔너리를 만들수 있습니다.


```swift
namesOfIntegers[16] = "sixteen"
// namesOfIntegers now contains 1 key-value pair
namesOfIntegers = [:]
// namesOfIntegers is once again an empty dictionary of type [Int: String]
```

### Creating a Dictionary with a Dictionary Literal 

이전에 봤던 배열 리터럴과 유사한 문법인, `딕셔너리 리터럴(dictionary literal)`로 딕셔너리를 초기화 할수 있습니다. 딕셔너리 리터럴은 하나 이상의 key-value 쌍을 `Dictionary` 컬렉션으로 만드는 축약 방법입니다.

`key-value 쌍(pair)`은 키(key)와 값(value)의 조합(combination)입니다. 딕셔너리 리터럴에서, key-value 쌍의 각 키와 값은 콜론(:)으로 구분됩니다. key-value 싸은 목록처럼 작성되며, 콤마(,)로 구분되고, 대괄호([])로 둘러싸여 있습니다.

```swift
[key 1: value 1, key 2: value 2, key 3: value 3]
```

아래 예제에서 국제 공항의 이름을 저장하는 딕셔너리를 만듭니다. 딕셔너리에서, 키(keys)는 3글자(three-letter)의 국제공항 운송협회(International Air Transport Association)코드 이고, 값(vlaues)은 공항의 이름입니다.


```swift
var airports: [String: String] = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]
```

`airports` 딕셔너리는 `[String: String]` 타입으로 선언되며, 키의 타입이 String이고, 값의 타입 또한 `String`을 의미합니다.

> Note: airports 딕셔너리는 아래 예제에서 딕셔너리에 공항을 더 추가하기 때문에, 상수(`let` 지시자)가 아니라 변수(`var` 지시자)로 선언되었습니다.

`airports` 딕셔너리는 두개의 key-value 쌍을 포함하는 딕셔너리 리터럴로 초기화 되었습니다. 첫번째 쌍은 키가 `"YYZ"`이고 값이 `"Toronto Pearson"`입니다. 두번째 쌍은 키가 `DUB`이고 값은 `"Dublin"` 입니다.

딕셔너리 리터럴은 두개의 `String: String` 쌍을 포함합니다. `key-value` 타입은 `airport` 변수에 선언된 타입(String 키와 String 값으로된 딕셔너리)과 같고, 두개의 초기화 항목으로 `airports` 딕셔너리 초기화하는 방법 처럼 딕셔너리 리터럴로 할당할 수 있습니다.

배열처럼, 키와 값이 일치하는 딕셔너리 리터럴로 초기화 하는 경우, 딕셔너리의 타입을 작성할 필요가 없습니다. 그 대신에, `airports` 초기화를 짧게 작성할 수 있습니다.


```swift
var airports = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]
```

리터럴에 있는 모든 키(keys)가 서로 같은 타입이고, 모든 값(values)이 서로 같은 타입이기 때문에, Swift는 `airports` 딕셔너리에 사용에 대해 `[String: Strin]`이 올바른 타입이라 추론할 수 있습니다


### Accessing and Modifying a Dictionary

메소드와 프로퍼티, 서브스크립트 문법을 사용하여 딕셔너리를 사용하고 수정합니다.

배열처럼, `Dictionary`에서의 항목의 갯수를 구하기 위해 읽기 전용 `count` 프로퍼티로 확인합니다.

```swift
print("The airports dictionary contains \(airports.count) items.")
// Prints "The airports dictionary contains 2 items."
```

`count` 프로퍼티가 `0`인지 확인하는 축약법으로 Boolean `isEmpty` 프로퍼티를 사용합니다.


```swift
if let airportName = airports["DUB"] {
    print("The name of the airport is \(airportName).")
} else {
    print("That airport is not in the airports dictionary.")
}
// Prints "The name of the airport is Dublin Airport."
```

서브스크립트(subscript) 문법으로 딕셔너리에 새로운 항목을 추가할 수 있습니다. 서브스크립트 인덱스에 적절한 타입의 키(key)와 적절한 타입의 새로운 값을 할당합니다.

```swift
airports["LHR"] = "London"
// the airports dictionary now contains 3 items
```

또한, 특정 키(key)와 관련된(associated) 값을 변경하기 위해서 서브스크립트 문법을 사용할 수 있습니다.

```swift
airports["LHR"] = "London Heathrow"
// the value for "LHR" has been changed to "London Heathrow"
```

특정 키에 대한 값을 업데이트하기 위해, 서브스크립트 대신(`alternative`), 딕셔너리의 `updateValue(_:forKey:)` 메소드를 사용합니다. 위의 서브스크립트 예체와 같이, `updateValue(_:forKey:)` 메소드는 키가 없으면 키에 대한 값을 설정하거나, 키가 있으면 값을 업데이트 합니다. 하지만, 서브스크립트와는 다르게, `updateValue(_:forKey:)` 메소드는 업데이트하고난 후에 예전(old)값을 반환합니다. 이것으로 업데이트가 발생했는지 확인이 가능합니다.

`updateValue(_:forkey)` 메소드는 딕셔너리 값타입의 옵셔널 값을 반환합니다. String 값을 저장하는 딕셔너리를 예로 들어, 그 메소드는 String? 타입의 값 또는 "옵셔널 문자열(optional String)"을 반환합니다. 이 옵셔널 값은 업데이트 전에 , 기존 값이 있는 경우에 예전(old) 값을 반환하고, 기존 값이 없었다면 `nil`입니다.

```swift
if let oldValue = airports.updateValue("Dublin Airport", forKey: "DUB") { 
	print("The old value for DUB was \(oldValue).") 
} 
// Prints "The old value for DUB was Dublin."
```

딕셔너리에서 특정 키에 대한 값을 얻기 위해 서브스크립트 문법을 사용할 수 있습니다. 존재하지 않는 값에 대한 키(key)를 요청하는 것이 가능하기 때문에, 딕셔너리의 서브스크립트는 딕셔너리의 값 타입의 옵셔널을 반환합니다. 요청한 키에 대한 값이 딕셔너리에 있는 경우에, 서브스크립트는 키에 대해 기존 값을 옵셔널 값으로 포함하여 반환합니다. 그렇지 않은경우에, 서브스크립트는 `nil`을 반환합니다.

```swift
if let airportName = airports["DUB"] { 
	print("The name of the airport is \(airportName).") 
	} else { 
	print("That airport is not in the airports dictionary.") 
} 
// Prints "The name of the airport is Dublin Airport."
```

키(key)에 대해 nil 값을 할당하는 딕셔너리로 key-value 쌍을 제거하는 서브스크립트 문법을 사용할 수 있습니다

```swift
airports["APL"] = "Apple International"
// "Apple International" is not the real airport for APL, so delete it
airports["APL"] = nil
// APL has now been removed from the dictionary
```

아니면, 딕셔너리의 `removeValue(forKey:)` 메소드를 사용하여 key-value 쌍을 제거합니다. 이 메소드는 key-value 쌍을 제거하며, 값이 존재하면 제거된 값을 반환하고, 값이 없으면, `nil`을 반환합니다.

```swift
if let removedValue = airports.removeValue(forKey: "DUB") {
    print("The removed airport's name is \(removedValue).")
} else {
    print("The airports dictionary does not contain a value for DUB.")
}
// Prints "The removed airport's name is Dublin Airport."

```

### Iterating Over a Dictionary 

`for-in` 반복문으로 딕셔너리에 잇는 key-value 쌍을 반복 할 수 있습니다. 딕셔너리에 있는 각각의 항목은 (key, value) 튜플로 반환되고, 반복문의 내부에서 튜플의 멤버를 임시 상수나 변수로 분해(decompose) 할수 있습니다.


```swift
for (airportCode, airportName) in airports {
    print("\(airportCode): \(airportName)")
}
// YYZ: Toronto Pearson
// LHR: London Heathrow
```

`for-in` 반복문에 관한 자세한 정보는, For-in Loops를 보세요.

`keys`와 `values`프로퍼티를 사용해서 반복가능한 딕셔너리 컬렉션의 키(key)와 값(value)을 가져올수 있습니다.


```swift
for airportCode in airports.keys {
    print("Airport code: \(airportCode)")
}
// Airport code: YYZ
// Airport code: LHR
 
for airportName in airports.values {
    print("Airport name: \(airportName)")
}
// Airport name: Toronto Pearson
// Airport name: London Heathrow
```

`Array`인스턴스를 사용하는 API에서 딕셔너리의 `keys`나 `values`를 사용할 필요가 있는 경우에, `keys`나 `values`프로퍼티로 새로운 배열을 초기화 합니다.

```swift
// 3
let airportCodes = [String](airports.keys)
// airportCodes is ["YYZ", "LHR"]
 
let airportNames = [String](airports.values)
// airportNames is ["Toronto Pearson", "London Heathrow"]
```

Swift의 `Dictionary` 타입은 정의된 순서가 없습니다. 특정 순서로 딕셔너리의 키나 값을 반복하기 위해서는, `keys`나 `values` 프로퍼티에서 `sorted()` 메소드를 사용합니다.

---

