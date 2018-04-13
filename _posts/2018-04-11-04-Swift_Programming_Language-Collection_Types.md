---
layout:     post
title:      "Swift. 정리하기 4"
subtitle:   "Swift Language Guide-Collection Types"
date:       2018-04-11 19:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---


## Collection Type 

Swift는 값의 모음을 저장하기 위한 `Array`, `sets`, `dictionaries` 세가지를 제공합니다.

<center><img src="/img/posts/Swift_Programming_Language-1.png" width="700" height="500"></center> <br> 

> Note: Swift의 Array, Set, Dictionary 타입은 `generic collection`으로 구현되어 있습니다. [Generics](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID179)

---

## Array 

> Note: Swift의 Array타입은 FOundation의 `NSArray`클레스와 연결되어 있습니다. [see Working with Cocoa Data Types](https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/WorkingWithCocoaDataTypes.html#//apple_ref/doc/uid/TP40014216-CH6) in [Using Swift with Cocoa and Objective-C (Swift 4.1).](https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/index.html#//apple_ref/doc/uid/TP40014216)

### - Array Type Shorthand Syntax 

`Array<Element>`, `[Element]`

### - Creating an Empty Array

```swift
// 1
var someInts = [Int]()
print("someInts is of type [Int] with \(someInts.count) items.")
// Prints "someInts is of type [Int] with 0 items."

// 2 
someInts.append(3)
// someInts now contains 1 value of type Int
someInts = []
// someInts is now an empty array, but is still of type [Int]
```

### - Accessing and Modifiying an Array 

```swift
// 1
var shoppingList = ["Eggs", "Milk"]

print("The shopping list contains \(shoppingList.count) items.")
// Prints "The shopping list contains 2 items."

// 2 
shoppingList += ["Baking Powder"]
// shoppingList now contains 4 items
shoppingList += ["Chocolate Spread", "Cheese", "Butter"]
// shoppingList now contains 7 items

// 3 
var firstItem = shoppingList[0]
// firstItem is equal to "Eggs"

// 4 
shoppingList[4...6] = ["Bananas", "Apples"]
// shoppingList now contains 6 items

// 5
shoppingList.insert("Maple Syrup", at: 0)
// shoppingList now contains 7 items
// "Maple Syrup" is now the first item in the list

// 6
let mapleSyrup = shoppingList.remove(at: 0)
// the item that was at index 0 has just been removed
// shoppingList now contains 6 items, and no Maple Syrup
// the mapleSyrup constant is now equal to the removed "Maple Syrup" string

// 7
let apples = shoppingList.removeLast()
// the last item in the array has just been removed
// shoppingList now contains 5 items, and no apples
// the apples constant is now equal to the removed "Apples" string
```

### - Iterating Over an Array 

```swift 
// 1 
for item in shoppingList {
    print(item)
}
// Six eggs
// Milk
// Flour
// Baking Powder
// Bananas

// 2 
for (index, value) in shoppingList.enumerated() {
    print("Item \(index + 1): \(value)")
}
// Item 1: Six eggs
// Item 2: Milk
// Item 3: Flour
// Item 4: Baking Powder
// Item 5: Bananas
```

---

## Sets 

> Note: Swift의 `Set` 타입은 Foundation의 NSSet과 연결됩니다. 

### - Set Type Syntax 

`Set<Element>`, 

### - Creating and Initializing an Empty Set 

```swift
var letters = Set<Character>()
print("letters is of type Set<Character> with \(letters.count) items.")
// Prints "letters is of type Set<Character> with 0 items."
```

### - Accessing and Modifiying a Set 

```swift
// 1
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop"]

// 2 
favoriteGenres.insert("Jazz")
// favoriteGenres now contains 4 items

// 3
 let removedGenre = favoriteGenres.remove("Rock") {
    print("\(removedGenre)? I'm over it.")
} else {
    print("I never much cared for that.")
}
// Prints "Rock? I'm over it."

// 3 
if favoriteGenres.contains("Funk") {
    print("I get up on the good foot.")
} else {
    print("It's too funky in here.")
}
// Prints "It's too funky in here."
```

### - Iterating Over a Set 

```swift
// 1
for genre in favoriteGenres {
    print("\(genre)")
}
// Jazz
// Hip hop
// Classical

// 2
for genre in favoriteGenres.sorted() {
    print("\(genre)")
}
// Classical
// Hip hop
// Jazz
```

### - Fundamental Set Operations 

<center><img src="/img/posts/Swift_Programming_Language-2.png" width="700" height="700"></center> <br> 


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

### - Set Membership and Equality 

<center><img src="/img/posts/Swift_Programming_Language-3.png" width="700" height="700"></center> <br> 

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

> Note: Swift의 Dictionary 타입은 Foundation의 `NSDictionary`에 연결됩니다. 

### - Dictionary Type Shorthand Syntax 

`Dictionary<Key, Value>`

> Note: set의 값타입과 같이 사전의 키타입은 `Hashable` 프로토콜을 따릅니다.

### - Creating an Empty Dictionay

```swift
// 1
var namesOfIntegers = [Int: String]()
// namesOfIntegers is an empty [Int: String] dictionary

// 2
namesOfIntegers[16] = "sixteen"
// namesOfIntegers now contains 1 key-value pair
namesOfIntegers = [:]
// namesOfIntegers is once again an empty dictionary of type [Int: String]
```

### - Creating a Dictionary with a Dictionary Literal 

```swift
// 1 
var airports: [String: String] = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]

// 2 
var airports = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]
```

### - Accessing and Modifying a Dictionary

```swift
// 1 
var airports = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]

print("The airports dictionary contains \(airports.count) items.")
// Prints "The airports dictionary contains 2 items."

// 2 
airports["LHR"] = "London"
// the airports dictionary now contains 3 items

// 3 
airports["LHR"] = "London Heathrow"
// the value for "LHR" has been changed to "London Heathrow"

// 4
if let oldValue = airports.updateValue("Dublin Airport", forKey: "DUB") {
    print("The old value for DUB was \(oldValue).")
}
// Prints "The old value for DUB was Dublin."

// 5 
if let airportName = airports["DUB"] {
    print("The name of the airport is \(airportName).")
} else {
    print("That airport is not in the airports dictionary.")
}
// Prints "The name of the airport is Dublin Airport."

// 6
airports["APL"] = "Apple International"
// "Apple International" is not the real airport for APL, so delete it
airports["APL"] = nil
// APL has now been removed from the dictionary

// 7
if let removedValue = airports.removeValue(forKey: "DUB") {
    print("The removed airport's name is \(removedValue).")
} else {
    print("The airports dictionary does not contain a value for DUB.")
}
// Prints "The removed airport's name is Dublin Airport."
```

### - Iterating Over a Dictionary 

```swift
// 1
for (airportCode, airportName) in airports {
    print("\(airportCode): \(airportName)")
}
// YYZ: Toronto Pearson
// LHR: London Heathrow

// 2 
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

// 3
let airportCodes = [String](airports.keys)
// airportCodes is ["YYZ", "LHR"]
 
let airportNames = [String](airports.values)
// airportNames is ["Toronto Pearson", "London Heathrow"]
```

---

## Refernece 

[Collection Types](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-ID105)








