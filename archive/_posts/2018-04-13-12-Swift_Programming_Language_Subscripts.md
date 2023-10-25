---
layout:     post
title:      "Swift. 정리하기 12: Swift Language Guide-Subscripts"
subtitle:   "Swift Language Guide-Subscripts"
date:       2018-04-13 09:35:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/imessageSticker-bg.jpg
thumbnail-img: /assets/post_img/background/imessageSticker-bg.jpg
share-img: /assets/post_img/background/imessageSticker-bg.jpg
toc: true
---

최종 수정일: 2018.10.1

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Subscripts](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Subscripts.html#//apple_ref/doc/uid/TP40014097-CH16-ID305)<br>
[까칠코더님 블로그](http://kka7.tistory.com/118?category=919617)

---

## Subscripts

클래스(classes), 구조체(structures), 열거형(enumerations)은 서브크스립트(subscripts)를 정의할 수 있으며, 컬렉션(collection), 리스트(list), 시퀀스(sequence)의 멤버요소에 접근하기 위한 바로가기(shortcuts)입니다. `서브스크립트(subscript)`를 사용해서 별도의 설정과 가져오는 별도의 메소드 없이 인덱스(index)로 값을 설정하고 가져옵니다. 예를 들어, `someArray[index]`로 Array인스턴스에 있는 요소에 접근하고, `someDictionary[key]`로 Dictionary인스턴스에 있는 요소에 접근합니다.

하나의 타입에 대해 여러개의 서브스크립트(subscripts)를 정의할 수 있고, 서브스크립트에 전달하는 인덱스 값의 타입에 따라 선택된 것을 사용하기 위해, 적절하게 서브스크립트를 `오버로드(overload)` 합니다. 서브스크립트(subscripts)는 단일 차원(dimension)으로 제한되지 않고, 사용자정의 타입의 요구사항에 적합하도록 여러개의 입력 매개변수로 서브스크립트를 정의할 수 있습니다.

---

## Subscript Syntax

서브스크립트는 인스턴스 이름 뒤에 `대괄호(square brackets [])`안에 하나이상의 값으로 타입의 인스턴스 조회가 가능합니다. 이 문법은 인스턴스 메소드 문법과 게산 프로퍼티 문법과 비슷합니다. subscript키워드로 서브스크립트 정의를 작성하고, 인스턴스 메소드와 같은 방법으로 하나 이상의 입력 매개변수와 반환값을 지정합니다. 인스턴스 메소드와 다르게, `서브스크립트는 읽기-쓰기(read-write)` 또는 `읽기 전용(read-only)`이 가능합니다. 이 동작은 계산 프로퍼티와 같은 방법으로 getter와 setter에 의해 전달됩니다.

```swift
subscript(index: Int) -> Int {
    get {
        // return an appropriate subscript value here
    }
    set(newValue) {
        // perform a suitable setting action here
    }
}
```

`newValue`의 타입은 서브스크립트의 반환 값과 같습니다. 계산 프로퍼티 처럼, setter의 `(newValue)` 매개변수를 선택해서 지정할 수 없습니다. 직접 제공하지 않으면 기본 매개변수 `newValue`를 setter에 제공됩니다.

읽기 전용 계산 프로퍼티처럼, `get` 키워드와 중괄호(braces)를 제거해서 읽기 전용 서브스크립트의 선언을 단순화 할수 있습니다.

```swift
subscript(index: Int) -> Int {
    // return an appropriate subscript value here
}
```

다음은 n단(n-times-table)의 정수를 표현하기 위해 TimesTable구조를 정의한 읽기 전용 서브스크립트 구현의 예제입니다.

```swift
struct TimesTable {
    let multiplier: Int
    subscript(index: Int) -> Int {
        return multiplier * index
    }
}
let threeTimesTable = TimesTable(multiplier: 3)
print("six times three is \(threeTimesTable[6])")
// Prints "six times three is 18"
```

이 예제에서, `TimeTable`의 새로운 인스턴스는 3단(three-times-table)을 표현하기 위해 생성됩니다. 이것은 인스턴스의 `multiplier` 매개변수에 사용하는 값으로 구조체의 `initializer`에 값 `3`을 전달하는 것을 가리킵니다.

threeTimesTable[6] 호출에서 볼수 있듯이, threeTimesTable인스턴스 서브스크립트를 호출해서 조회할 수 있습니다. 이것은 3단(three-times-talbe)에서 6번째를 요청하며, 18 또는 3단의 6번째 값을 반환합니다.

> Note: n단(n-times-table)은 수학적인 규칙을 기반으로 합니다. threeTimesTable[someIndex]에 새로운 값을 설정하는 것은 적절하지 않고, TimesTable에 대한 서브스크립트는 읽기 전용 서브스크립트로 정의됩니다.

---

## Subscript Usage

서브스크립트(subscript)의 정확한 의미는 사용되는 `컨텍스트(context)`에 따라 결정됩니다. 서브스크립트는 일반적으로 컬렉션의 멤버 요소를 접근하기 위한 바로가기(shortcut)로 사용됩니다. 특정 클래스나 구조체의 기능에 가장 어울리는 방법으로 서브스크립트를 자유롭게 구현할 수 있습니다.

예를들어, Swift의 `Dictionary`타입은 Dictionary인스턴스에 저장된 값을 설정하거나 가져오기 위해 서브스크립트를 구현합니다. 서브스크립트 대괄호(brackets []) 안에 딕셔너리의 키 타입의 키(key)를 제공해서 딕셔너리 안의 값을 설정할 수 있고, 서브스크립트에 딕셔너리 값 타입의 값을 할당할 수 있습니다.

> 개인 Note: 잘 안써서 그렇지, 응용하려고하면 사용할수 있는곳이 많을것이라고 이해됩니다. 

```swift
var numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
numberOfLegs["bird"] = 2
```

위 예제는 3개의 키-값(key-value) 쌍을 포함한 딕셔너리 원문(literal)으로 numberOfLegs 변수를 정의하고 초기화 합니다. numberOfLegs 딕셔너리의 타입은 [String: Int]로 추론됩니다. 딕셔너리를 생성한 후에, 이 예제는 딕셔너리에 "bird" 키 String과 2값 Int를 추가하기 위해 서브스크립트 할당을 사용합니다.

Dictionary 서브스크립트에 관한 더 자세한 정보는 딕셔너리 접근과 [수정하기(Accessing and Modifying a Dictionary)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-ID116)를 보세요.

> Note: Swift의 Dictionary타입은 서브스크립트를 받고 옵셔널(optional) 타입을 반환하는 key-value 서브스크립트 구현합니다. 위의 `numberOfLegs`딕셔너리에 대해, key-value 서브스크립트로 가져오고 Int?타입 또는 옵셔널 int 값을 반환 합니다. Dictionary 타입은 옵셔널 서브스크립트 타입을 사용해서 모든 키가 값을 가져오지는 않을 것이라는 사실을 모델링하고, 키에 대한 값을 제거하는 방법으로 키에 `nil`값을 할당합니다.

---

## Subscript Options

서브스크립트는 임의의 수를 입력 매개변수로 사용할 수 있고, 이러한 입력 매개변수는 어떤 타입도 될수 있습니다. 또한, 서브스크립트는 어떤 타입도 반환 할수 있습니다. 서브스크립트는 가변(variadic) 매개변수를 사용 할 수 있지만, `in-out 매개변수 또는 기본 매개변수 값을 제공할 수 없습니다.`

클래스나 구조체는 필요한 경우 많은 서브스크립트 구현을 제공할 수 있고, 서브스크립트가 사용되는 시점에 사용되는 값의 타입이나 서브스크립트 대괄호 안에 포함된 값에 따라 적절하게 추론되어 적절한 서브스크립트가 사용됩니다. 여러개의 서브스크립트를 정의 하는 것을 `서브스크립트 오버로딩(subscript overloading)`이라고 합니다.

서브스크립트가 하나의 매개변수를 사용하는것이 가장 일반적이지만, 타입에 대해 적절하다면 여러개의 매개변수로 서브스크립트를 정의할 수 있습니다. 다음은 `Double`값의 2차원 행렬(two-dimensional matrix)을 표현하는 Matrix구조체를 정의한 예제입니다. `Matrix`구조체의 서브스크립트는 2개의 정수 매개변수를 가집니다.

```swift
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(repeating: 0.0, count: rows * columns)
    }
    func indexIsValid(row: Int, column: Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 && column < columns
    }
    subscript(row: Int, column: Int) -> Double {
        get {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            return grid[(row * columns) + column]
        }
        set {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            grid[(row * columns) + column] = newValue
        }
    }
}
```

`Matrix`는 `rows`와 `columns` 두개의 매개변수로 초기화를 제공하고, `Double`타입의 `rows * columns`값을 저장하기 충분한 배열을 생성합니다. 행렬의 각 위치에 초기값 `0.0`을 줍니다. 정확한 크기의 새로운 배열을 생성하고 초기화 하기 위해, 배열의 크기와 0.0 초기 셀 값은 배열 초기화에 전달됩니다. 
초기화는 [기본 값으로 배열 생성(Creating an Array with a Default Value)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-ID501)에서 더 자세히 설명됩니다.

초기화를 위해 적절한 행과 열 개수를 전달하여 새로운 Matrix인스턴스를 생성할 수 있습니다.

```swift
var matrix = Matrix(rows: 2, columns: 2)
```

앞의 예제에서 새로운 두개의 열과 두개의 행으로 Matrix인스턴스를 생성합니다. Matrix인스턴스에 대한 grid배열은 왼쪽 위에서 오른쪽 아래로 읽는 것처럼, 행렬을 효과적으로 평면화시킨 버전입니다.

<center><img src="/assets/post_img/posts/Swift_Programming_Language-7.png" width="500"></center> <br> 

행렬에서의 값은 서브스크립트로 콤마(,)로 구분된 행과 열의 값을 전달하여 설정합니다.

```swift
matrix[0, 1] = 1.5
matrix[1, 0] = 3.2
```

이러한 두개의 문장은 행렬의 오른쪽 위의(`row`는 `0`이고, `column`은 `1`) 위치에 `1.5`값을 설정하고, 왼쪽 아래(`row`는 `1`이고 `cloumn`은 `0`) 위치에 `3.2`를 설정하기 위해 서브스크립트의 setter를 호출합니다.

<center><img src="/assets/post_img/posts/Swift_Programming_Language-8.png" width="500"></center> <br> 

```swift
func indexIsValidForRow(row: Int, column: Int) -> Bool {
    return row >= 0 && row < rows && column >= 0 && column < columns
}
```

행렬의 범위 바깥의 서브스크립트에 접근하면 assertion이 발생합니다.

```swift
let someValue = matrix[2, 2]
// this triggers an assert, because [2, 2] is outside of the matrix bounds
```

---

