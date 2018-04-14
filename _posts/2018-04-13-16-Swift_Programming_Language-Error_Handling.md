---
layout:     post
title:      "Swift. 정리하기 16"
subtitle:   "Swift Language Guide-Error Handling"
date:       2018-04-13 14:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Error Handling

`오류 처리(Error handling)`는 프로그램에서 오류 상테에서 복구하고 응답하는 과정입니다. Swift는 실시간으로 복구 가능한 오류를 `던지고(throwing)`, `잡고(catching)`, `전달(propagating)` 및 `조작(manipulating)`하는 기능을 지원하는 일류 클래스(first-class)를 제공합니다.

일부 작업은 항상 실행이 완료되거나 유용한 결과물을 만들어는 것이 보장되지 않습니다. 옵셔널은 값이 없는것을 표현하는데 사용되지만, 동작이 실패할때, 어떤 이유 때문에 실패했는지 이해하는데 종종 유용하며, 그래서 그에 맞는 코드로 대응을 할 수 있습니다.

예를 들어, 디스크의 파일로부터 데이터를 읽고 처리하는 작업을 생각해봅시다. 이 작업은 지정된 경로에 파일이 존재하지 않고, 파일을 읽을 권한이 없거나, 파일이 호환되지 않는 포멧 등등, 실패 할수 있는 몇 가지가 있습니다. 이러한 서로 다른 상황을 구분하여 프로그램이 일부 오류를 해결 할 수 있고 해결 할수 없는 오류는 사용자에게 알려줍니다.

> Note: Swift에서 오류 처리는 `Cocoa와 Objective-c에서 NSError을 사용한 오류처리와 호환`됩니다. 이 클래스에 관한 더 자세한 정보는 [Cocoa와 Objective-C (Swift 4.1)의](https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/index.html#//apple_ref/doc/uid/TP40014216), [오류 처리(Error Handling)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/AdoptingCocoaDesignPatterns.html#//apple_ref/doc/uid/TP40014216-CH7-ID10)를 보세요.
> 

---

## Representing and Throwing Errors

Swift에서 `Error`프로토콜을 `준수(conform)`하는 타입의 값으로 표현됩니다. 빈 프로토콜은 오류 처리를 사용 할 수 있는 타입을 가리킵니다.

`Swift` 열거형은 특히 관련된 오류 조건 그룹을 모델링하는데 매우 적합하며, 연관된 값은 전달하는 오류의 특징(`nature`)에 관해 추가적인 정보를 허용합니다. 예를들어, 다음은 게임내의 자동 판매기 기능의 오류 조건을 나타내는 방법입니다.

```swift
enum VendingMachineError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: Int)
    case outOfStock
}
```

예상치 않게 발생한 일이 발생했다는 것을 `오류 던지기(throwing)`로 나타낼수 있고 정상적인 흐름대로 진행하지 못합니다. 오류 던지기는 `throw`문을 사용합니다. 예를들어, 다음 코드는 자동 판매기에서 추가로 동전 5개가 필요하다는 것을 알려주는 오류를 던집니다.

```swift
throw VendingMachineError.insufficientFunds(coinsNeeded: 5)
```

---

## Handling Errors 

오류를 던칠때, 일부 주변 코드는 반드시 오류 처리할 책임이 있습니다 - 예를들어, 문제 해결, 다른 접근법 시도, 사용자에게 실패 정보 알리기

Swfit에서 오류처리하는 4가지 방법이 있습니다. 함수로부터 함수를 호출한 코드에 오류를 전달 할 수 있으며, `do-catch`문을 사용한 오류 처리하거나, 옵셔널 값으로 오류 처리하거나, 또는 오류가 발생하지 않도록 `assert` 할 수 있습니다. 각 접근법은 아래 섹션(section)에서 설명됩니다.

함수가 오류를 던질때, 프로프램의 흐름은 바뀌며, 코드에서 오류를 던질수 있는 곳을 빨리 식별 할수 있어야 합니다. 코드에서 이러한 위치를 식별하기 위해, 오류를 던질수 있는 함수를 호출한 함수, 메소드, 초기화 앞에 `try`나 `try?` 또는 `try!` 키워드를 사용합니다. 이 키워드는 아래 섹션에서 설명됩니다.

> Note: Swift 에서 오류 처리는 try, catch, throw키워드를 사용하는 다른 언어에서의 예외 처리와 비슷합니다. 많은 다른 언어(Objective-C 포함)에서의 예외처리와는 다르게 Swift의 오류처리는 호출 스택(call stack)을 해제하지(unwinding) 않으며, 처리 비용이 비싼 과정입니다. 이와같이, throw문의 성능 특징은 return문에 필적합니다.


### - Propagating Errors Using Throwing Functions

함수, 메소드, 초기화는 오류를 던질수 있다는 것을 나타내기 위해 `throws`키워드를 함수의 매개변수 뒤에 선언합니다. `throws`로 표시된 함수는 `throwing function`이라고 합니다. 함수가 반환타입을 지정하면, `throws 키워드는 반환 화살표(->) 앞에` 사용합니다.

```swift
func canThrowErrors() throws -> String
 
func cannotThrowErrors() -> String
```

`throwing function` 오류 전달은 호출된 범위 안에서 던집니다(thrown).

> Note: `throwing functions`은 오류를 전달 할 수 있습니다. 모든 오류는 nonthrowing function 안에서 던지며, 그 함수 내에서 처리해야 합니다.

아래 예제에서, `VendingMachine`클래스는 요청한 항목이 품절되어 불가능하거나, 입금액을 초과한 경우에 적절한 `VendingMachineError`를 던지는 `vend(itemNamed:)`메소드를 가집니다.

```swift
struct Item {
    var price: Int
    var count: Int
}
 
class VendingMachine {
    var inventory = [
        "Candy Bar": Item(price: 12, count: 7),
        "Chips": Item(price: 10, count: 4),
        "Pretzels": Item(price: 7, count: 11)
    ]
    var coinsDeposited = 0
    
    func vend(itemNamed name: String) throws {
        guard let item = inventory[name] else {
            throw VendingMachineError.invalidSelection
        }
        
        guard item.count > 0 else {
            throw VendingMachineError.outOfStock
        }
        
        guard item.price <= coinsDeposited else {
            throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }
        
        coinsDeposited -= item.price
        
        var newItem = item
        newItem.count -= 1
        inventory[name] = newItem
        
        print("Dispensing \(name)")
    }
}
```

`vend(itemNamed:)`메소드의 구현은 간식(snack)을 구입하기 위한 요구사항이 충족되지 않으면, 메소드를 일찍 종료하고 적절한 오류를 던지기 위해 guard문을 사용합니다. `throw`문은 프로그램 제어권을 바로 넘겨 주기 때문에, 요구사항이 만족하면 아이템은 판매 될 것입니다.

`vend(itemNamed:)`메소드는 발생한 모든 오류를 전달하기 때문에, `메소드를 호출 하는 코드는 반드시 오류를 처리해야 하던지-do-catch문, try?, try!을 사용해서-계속 전달해야 합니다.` 예를들어, 아래 예제의 `buyFavoriteSnack(person:vendingMachine:)`은 `throwing function`이고, `buyFavoriteSnack(person:vendingMachine:)` 함수가 호출된 곳으로 `vend(itemNamed:)`메소드의 모든 오류를 위로 전달합니다.

```swift
let favoriteSnacks = [
    "Alice": "Chips",
    "Bob": "Licorice",
    "Eve": "Pretzels",
]
func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
    let snackName = favoriteSnacks[person] ?? "Candy Bar"
    try vendingMachine.vend(itemNamed: snackName)
}
```

예제에서, `buyFavoriteSnack(person: vendingMachine:)`함수는 `vend(itemNamed:)`메소드를 호출해서 주어진 사람이 좋아하는 간식을 찾고 구입하려고 시도합니다. `vend(itemNamed:)`메소드는 오류를 던질수 있기 때문에, 메소드를 호출하기 전에 `try`키워드를 앞에 사용합니다.

`Throwing initializer`은 `throwing function`과 같은 방법으로 오류를 전달 할 수 있습니다. 예를 들어, PurchasedSnack구조체에 대한 초기화는 초기화 과정에서 아래 목록의 throwing function을 호출하고, 호출자에게 오류를 전달하여 발생한 모든 오류를 처리합니다.

---

## Hanlding Errors Using Do-Catch

코드 블럭을 실행하여 오류를 처리하기 위해 `do-catch`문을 사용합니다. 오류가 `do절(clause)` 안의 코드에 의해 던져지면, 오류를 처리 할수 있는 `catch`절과 일치하는지 확인합니다.

일반적인 `do-catch`문은 다음과 같습니다

```swift
do {
    try expression
    statements
} catch pattern 1 {
    statements
} catch pattern 2 where condition {
    statements
}
```

그 절(clause)이 처리 할수 있는 오류가 무엇인지 타나내기 위해 `catch`뒤에 pattern을 사용한다. catch절이 pattern을 가지지 않으면, 절은 모든 오류와 일치하고 지역 상수 이름인 error로 연결합니다. pattern 일치에 관한 더 자세한 정보는 [패턴(Patterns)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/doc/uid/TP40014097-CH36-ID419)을 보세요.

`catch`절은 `do`절의 코드에서 `throw` 할 수 있는 모든 오류를 처리할 필요가 없습니다. 모든 catch절이 오류를 처리하지 않으면, `오류는 주변 영역으로 전달`됩니다. 하지만, 오류는 주변 영역에서 반드시 처리되어야 합니다 -오류를 처리하는 닫힌 do-catch절이나 throwing함수 안에서 오류를 처리합니다. 예를들어, 다음 코드는 `VendingMachineError`열거형의 3가지 모든 case에 대해 처리하지만, 다른 모든 오류들은 주변 영역에서 처리되어야 합니다.

```swift
var vendingMachine = VendingMachine()
vendingMachine.coinsDeposited = 8
do {
    try buyFavoriteSnack(person: "Alice", vendingMachine: vendingMachine)
} catch VendingMachineError.invalidSelection {
    print("Invalid Selection.")
} catch VendingMachineError.outOfStock {
    print("Out of Stock.")
} catch VendingMachineError.insufficientFunds(let coinsNeeded) {
    print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
}
// Prints "Insufficient funds. Please insert an additional 2 coins."
```

위의 예제에서, `buyFavoriteSnack(person:vendingMachine:)`함수는 오류가 발생할수 있기 때문에, try문법으로 호출됩니다. 오류가 발생하면, catch절로 즉시 전달되어 실행되며, 계속 전달 할 것인지 결정합니다. 오류가 발생하지 않는다면, do문법 안에 남아있는 구문이 실행됩니다.

---

## Converting Error to Optional Values

오류 처리를 위해 옵셔널 값으로 변환하여 try?`를 사용합니다. `try?` 문법을 수행할때 오류가 발생하면, 그 문법의 값은 `nil`이 됩니다. 예를들어, 다음에 오는 코드 x와 y는 같은 값과 동작을 합니다

```swift
func someThrowingFunction() throws -> Int {
    // ...
}
 
let x = try? someThrowingFunction()
 
let y: Int?
do {
    y = try someThrowingFunction()
} catch {
    y = nil
}
```

`someThrowingFunction()`가 오류를 발생(throws)하면, `x`와 `y` 값은 nil입니다. 그렇지 않으면, x와 y의 값은 함수가 반환한 값입니다. x와 y는 someThrowingFunction()이 반환하는 옵셔널 타입입니다. 여기서 함수는 정수형을 반환하므로, x와 y는 옵셔널 정수형입니다.

동일한 방법으로 모든 오류를 처리하길 원할때, try? 사용으로 간결한 오류 코드 처리를 작성 할 수 있습니다. 예를들어, 다음 코드는 데이터를 가져오는데 사용되며, 모든 방법이 실패 할 때, nil을 반환합니다.

```swift
func fetchData() -> Data? {
    if let data = try? fetchDataFromDisk() { return data }
    if let data = try? fetchDataFromServer() { return data }
    return nil
}
```

---

## Disabling Error Propagation

가끔씩 던지는(`throwing`) 함수나 메소드를 알지 못할때, 사실상 실행중에 오류가 발생(throw) 합니다. 이러한 경우에, 오류 전달을 사용하지 않도록, 구문 앞에 `try!`를 작성 할 수 있고 오류가 발생하지 않도록 실시간 assertion을 래핑하여 호출 할 수 있습니다. 실제로 오류가 발생하면, 실행중 오류가 발생할 것입다.

예를들어, 다음에 오는 코드는 주어진 경로로 이미지 리소스를 로드하거나 이미지를 불러올수 없을때 오류를 발생하는 `loadImage(atPath:)`함수를 사용합니다. 이 경우에, 이미지는 앱과 함께 제공되기 때문에, 실행중에 오류가 발생하지 않을 것이며, 오류 전달을 사용하지 않는게 어울립니다.

```swift
let photo = try! loadImage(atPath: "./Resources/John Appleseed.jpg")
```

> 대신 실패하면 크..러시

---

## Specifying Cleanup Actions

코드 실행 직전에 현재 코드의 블럭을 떠나도록 구문들을 설정하는 `defer`문을 사용합니다. 이 문법은 코드의 현재 블럭을 떠나는 것과 상관없이 수행해야하는 정리 작업을 할 수 있습니다 -오류가 발생하거나 `return`또는 `break`문을 만나서 떠나게 된다. 예를들어, 파일을 닫고 수동으로 메모리에서 해제 하기 위해 `defer` 문을 사용 할 수 있습니다.

`defer` 구문은 현재 영역이 완료될때까지 실행을 미룬다. 이 구문은 `defer`키워드와 나중에 실행할 구문으로 구성됩니다. `미뤄진(deffered)` 구문은 `break` 또는 `return` 또는 오류를 던지는 것 처럼 제어를 전달하는 코드가 없어야 합니다. 지연된 동작은 지정된 동작의 역순으로 실행됩니다. - 이것은 `defer`구문의 첫번째 코드가 두번째 코드 다음에 실행됩니다.

```swift
func processFile(filename: String) throws {
    if exists(filename) {
        let file = open(filename)
        defer {
            close(file)
        }
        while let line = try file.readline() {
            // Work with the file.
        }
        // close(file) is called here, at the end of the scope.
    }
}
```


위의 예제에서 `defer`구문은 `open(_:)함수가 close(_:)호출`하는 것을 보증합니다.

> Note: defer구문은 오류 처리코드가 없는 경우에도 사용 할 수 있습니다



---

## Reference 

[Error Handling](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html#//apple_ref/doc/uid/TP40014097-CH42-ID508)<br>
[까칠코더님 블로그](http://kka7.tistory.com/23?category=919617)