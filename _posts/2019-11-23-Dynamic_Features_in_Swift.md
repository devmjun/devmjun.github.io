## Table of contents 

  - [<U>Getting Started</U>](#section-id-32)
  - [<U>Reflecting on Mirror and Debug Output</U>](#section-id-40)
  - [<U>CustomDebugStringConvertible</U>](#section-id-46)
  - [<U>Dump</U>](#section-id-87)
  - [<U>Swift Mirror</U>](#section-id-116)
  - [<U>Creating a Mirror-Powered Dog Log</U>](#section-id-120)
  - [<U>Creating a Mirror</U>](#section-id-124)
  - [<U>Key Paths</U>](#section-id-168)
  - [<U>Understanding Dynamic Member Lookup</U>](#section-id-199)
  - [<U>Introducing @dynamicMemberLookup</U>](#section-id-207)
  


---
layout:     post
title:      "iOS, Dynamic Features in Swift"
subtitle:   "Dynamic Features in Swift"
date:       2019-11-23 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Mirror, CustomDebugStringConvertible]
--- 

[Dynamic Features in Swift](https://www.raywenderlich.com/5743-dynamic-features-in-swift) 에서 필요한 부분만 번역 해서 중간 중간 컨텍스트가 끊겨 있습니다

이 튜토리얼에서 코드를 깨끗하고 명확하게 작성하고 예측하기 어려운 이슈를 빠르게 해결하기 위해 Swift에서 dyanmic features를 사용하는 방법을 배울것입니다. 

당신은 깨끗한 코드블럭을 생산하길 원하고, 코드에서 무슨일이 일어나고 있는지 한눈에 보고 예상치 못한 문제들을 빨리 해결하고 싶어 합니다. 

이 튜토리얼 에서는 이러한 요구를 충족하기 위해 swift의 dynamic 과 flexible를 결합 합니다. 최신 Swift 기술을 사용하여 consol에 출력을 커스텀 하고 제 3자 객체 상태 변화를 관찰하여 깨끗한 코드를 작성하기 위한 syntactical suger를 사용합ㄴ디ㅏ.

특히, 다음의 대해서 배웁니다

- `Mirror`
- CustomDebugStringConvertible
- Key-value Observing With Key Paths 
- Dynamic Member Lookup
- Related technologies

무엇보다 즐거운 시간을 보낼것입니다. 

이 튜토리얼은 Swift 4.2 이상을 요구합니다. 

<div id='section-id-32'/>

## Getting Started

시작 전에 시작 프로젝트를 다운받고 실행합니다. 

Swift의 Dynamic feature를 배우는데 집중할수 있도록 필요한 모든 코드가 이미 작성 되어 있습니다. 

프로젝트는 `DynamicFeaturesInSwift-Starter`라고 명명 되어 있는걸 볼수 있고 3개의 playground pages들을 볼수 있습니다: `DogMirror`, `DogCatcher`, `KennelsKeyPath` 

<div id='section-id-40'/>

## Reflecting on Mirror and Debug Output

이슈를 찾던, 실행 코드를 분석 하던 미완성된 정보는 모든 차이를 만듭니다. Swift는 consol에 출력물을 사용자화 하고 중요한 이벤트를 캡처하는 많은 방법들을 제공합니다. 출력물을 커스텀 할때 Mirror 보다 깊게 들어가지는 않을것 입니다. 

`Mirror`에 대해서 배우기 전에, type을 위해 사용자화된 어떤 콘솔 출력물을 먼저 작성할것입니다. 이것은 하려고 하는것을 더 명확하게 볼수 있게 도와줍니다

<div id='section-id-46'/>

## CustomDebugStringConvertible 

DynamicFeaturesInSwift.playground 를 열고 `DogMirror`페이지를 엽니다. 

이 페이지에는 `Dog` class 와 `DogCatcherNet` 클레스가 있고 먼저 `DogCatcherNet`에 집중합니다. 

```swift
enum CustomerReviewStars { case one, two, three, four, five }
```

```swift
class DogCatcherNet {
  let customerReviewStars: CustomerReviewStars
  let weightInPounds: Double
  // ☆ Add Optional called dog of type Dog here

  init(stars: CustomerReviewStars, weight: Double) {
    customerReviewStars = stars
    weightInPounds = weight
  }
}
```

```swift
let net = DogCatcherNet(stars: .two, weight: 2.6)
debugPrint("Printing a net: \(net)")
debugPrint("Printing a date: \(Date())")
print()
```

`DogCatcherNet`은 두개의 프로퍼티를 가집니다(`customerReviewStarts`, `weightInPounds`) 

플레이그라운드를 실행합니다. 콘솔의 첫번째 두번째 라인은 다음과 같이 보여야 합니다. 

```swift
"Printing a net: __lldb_expr_13.DogCatcherNet"
"Printing a date: 2018-06-19 22:11:29 +0000"
```

....

<div id='section-id-87'/>

## Dump

어떻게 하면 보일러 플레이트 코드를 추가하는것을 피할수 있나요?(위에 번역 하지는 않았지만 `CustomDebugStringConvertible`에 대한 이야기) 그것은 `dump`를 사용하는것입니다. `dump`는 type 프로퍼티의 모든 값과 이름들을 출력하는 generic function 입니다. 

playground는 이미 net과 `Date` 의 호출을 포함하고 있습니다

```swift
dump(net)
print()

dump(Date())
print()
```

플레이 그라운드를 실행하면 다음과같은 출력물을 확인할수 있습니다.

```swift
▿ DogCatcherNet(Review Stars: two, Weight: 2.6) #0
  - customerReviewStars: __lldb_expr_3.CustomerReviewStars.two
  - weightInPounds: 2.6

▿ 2018-06-26 17:35:46 +0000
  - timeIntervalSinceReferenceDate: 551727346.52924
```

...

`dump` 또한 각 속성들을 자동으로 뱉어냅니다. 이제 `Mirror`을 사용하여 이러한 속성을 더 읽을수 있게 할 때입니다. 

<div id='section-id-116'/>

## Swift Mirror 

`Mirror`는 플레이 그라운드 또는 런타임에 디버거를 통해서 어떤 타입의 인스턴트의 값을 보여주게 합니다. 간단하게 말하면, mirror의 힘은 introspection 이고 introspection은 reflection의 하위 집합입니다. 

<div id='section-id-120'/>

## Creating a Mirror-Powered Dog Log 

이제 Mirror-powered dog log를 생성할 시간입니다. debugging을 돕기 위해서, 이모지와 함께 출력물을 출력하는게 이상적입니다. log 함수는 어떤 아이템들도 통과시켜 처리할수 있어야 합니다.

<div id='section-id-124'/>

## Creating a Mirror 

mirror를 사용하는 log 함수를 생성할 시간입니다. 시작 하기 위해 `Create log function here`에 다음 코드를 추가합니다.

```swift
func log(itemToMirror: Any) {
  let mirror = Mirror(reflecting: itemToMirror)
  debugPrint("Type: 🐶 \(type(of: itemToMirror)) 🐶 ")
}
```

이렇게 하면 전달된 아이템에 대한 mirror를 생성합니다. mirror는 인스턴스의 부분들을 반복합니다. 

다음 코드를 log(itemToMirror:) 이후에 추가합니다. 

```swift
for case let (label?, value) in mirror.children {
  debugPrint("⭐ \(label): \(value) ⭐")
}
```

이것은 미러의 자식 속성을 접근하고 각 label-value 쌍을 얻고난 후 이들을 콘솔에 출력합니다. label-value 쌍은 Mirror의 type-aliased 입니다. DogCatcherNet instance에서 코드는 net 객체의 속성들을 반복합니다

명확히 이야기 하면 검사된 인스턴스의 자식은 superclass 또는 하위 계층 과는 아무 상관이 없습니다. mirror를 통해서 접근할수 있는 자식은 단지 검사된 인스턴스의 일부 일뿐입니다. 

이제 새로운 log 매소드를 호출할 시간입니다. `Log out the net and Date object here:`로 다음 코드를 추가합니다

```swift
log(itemToMirror: net)
log(itemToMirror: Date())
```

플레이 그라운드를 실행하면 콘솔에 다음과 같은 출력물을 볼수 있습니다

```swift
"Type: 🐶 DogCatcherNet 🐶 "
"⭐ customerReviewStars: two ⭐"
"⭐ weightInPounds: 2.6 ⭐"
"Type: 🐶 Date 🐶 "
"⭐ timeIntervalSinceReferenceDate: 551150080.774974 ⭐"
```

이것은 모든 속성의 이름과 값을 보여줍니다. 

<div id='section-id-168'/>

## Key Paths

프로그램에서 무슨일이 일어 나는지 추적하는것에서 Swift는 key paths 라고 불리는 멋진것을 가지고 있습니다. 서브파티 라이브러리 객체에서 값이 변경되는 것과 같은 이벤트를 캡쳐 하려면 `KeyPath`의 `observe`를 알아볼수 있습니다. 

Swift에서 key paths는 컴파일 타임에 타입을 체크할수 있는 strongly typed paths 입니다. Objective-C 에서 이들은 단지 `strings` 이었습니다. [What's New in Swift4?](https://www.raywenderlich.com/582-what-s-new-in-swift-4) 튜토리얼 에서 Key-Value Coding section 에서 해당 개념을 다룹니다.

거기에는 몇개의 다른 `KeyPath` 타입이 있습니다 일반적으로 논의된 타입은 [KeyPath](https://developer.apple.com/documentation/swift/keypath), [WritableKeyPath](https://developer.apple.com/documentation/swift/writablekeypath), [ReferenceWritableKeyPath](https://developer.apple.com/documentation/swift/referencewritablekeypath)를 포함합니다. 다음은 이들의 차이점을 요약한것 입니다

- `KeyPath`: 지정된 벨류 타입에서 root tpye을 명시합니다
- `WritableKeyPath`: KeyPath는 작성할수 있는 값입니다. 이것은 이 튜토리얼에서 다루지 않습니다
- `ReferenceWritableKeyPath`: WritableKeyPath는 클레스가 참조 유형이므로 클레스에 사용됩니다.  

key path를 사용하는 부분적인 예는 observing 또는 객체에서 값이 변화할때 캡쳐하는곳 입니다. 

... 아래는 KVO 에 대한 설명 

```swift
// 1
let keyPath = \Kennels.available

// 2
kennels.observe(keyPath) { kennels, change in
  if (kennels.available) {
    print("kennels are available")
  }
}

// 3
Kennels are available.
```

<div id='section-id-199'/>

## Understanding Dynamic Member Lookup

이 튜토리얼에서 JSON 딕셔너리에서 dot 노테이션을 사용하여 값에 접근하는 실제 JSON DSL(Domain Specification Language)를 만드는 방법에 대해서 연습하며`Dynamic Member Lookup`의 강력함을 볼수 있습니다.

`Dynamic Member Lookup`은 컴파일 시간에 존재하지 않는 속성에 대해 닷 문법을 사용할수 있도록 합니다. 예를 들어 속성들이 컴파일에 존재할것이라고 신뢰하며 코딩하고 있습니다. 그 과정에서 읽기 좋은 코드를 얻고 있습니다. 

[proposal for this feature](https://github.com/apple/swift-evolution/blob/master/proposals/0195-dynamic-member-lookup.md) 과 [associated conversations in the Swift community](https://forums.swift.org/t/se-0195-introduce-user-defined-dynamic-member-lookup-types/8658/10) 에서 언급된것과 같이, 이 강함은 Python 언어와 같이 데이터 베이스 구현, CoreImage와 같은 스트리형 API를 중심으로 보일러 플레이트가 없는 상호 운용성에 큰 유용성을 제공합니다

<div id='section-id-207'/>

## Introducing @dynamicMemberLookup

이것은 활성화 하는 방법은 type attribute 인`@dynamicMemberLookup`을 사용하는 것입니다. 

다음 코드를 `Add subscript method that returns a Direction here:`에 추가합니다.

```swift
subscript(dynamicMember member: String) -> Direction {
  if member == "moving" || member == "directionOfMovement" {
    // Here's where you would call the motion detection library
    // that's in another programming language such as Python
    return randomDirection()
  }
  return .motionless
}
```
...

---




