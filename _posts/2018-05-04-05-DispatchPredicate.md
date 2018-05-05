---
layout:     post
title:      "Swift. DispatchPredicate 05"
subtitle:   "DispatchPredicate 를 알아봅시다!"
date:       2018-05-04 14:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Realm, Swift]
---

## DispatchPredicate

DispatchPredicate는 `dispatchPrecondition(condition:)`메소드를 사용하여 주어진 실행 컨텍스트 내에서 평가할수 있는 논리적 조건을 나타냅니다.

```swift
enum DispatchPredicate {
	case onQueue(DispatchQueue)
Predicates that the evaluated context is the associated dispatch queue.
	case onQueueAsBarrier(DispatchQueue)
Predicates that the evaluated context is the associated dispatch queue as part of a barrier operation.
	case notOnQueue(DispatchQueue)
Predicates that the evaluated context is not the associated dispatch queue.
```

### 예제

```swift
let queue = DispatchQueue.global()
        let mainQueue = DispatchQueue.main
        
        mainQueue.async {
            dispatchPrecondition(condition: .notOnQueue(mainQueue)) // mainQueue가 아니라고 예상함. 근데 mainQueue라서 죽음..
            print("mainQueue")
        }
        
        queue.async {
            dispatchPrecondition(condition: .onQueue(queue))
            // 정상 실행
            print("globalQueue")
        }
```

> 개인 Note: DispatchQueue를 사용하려고 할때 해당 Thread 또는 Queue가 무엇인지 판단하려고할때 사용하면 좋을것 같습니다. 근데 바로 죽어버리니..개발 환경에서만 사용해야하는 코드라고 생각됩니다.
> 
> 반드시 MainThread에서 실행해야 하거나, UI를 업데이트 하거나할때 사용하면 유용할것 같습니다.

## dispatchPrecondition(condition:)

dispatch를 실행하기위해 상태를 체크합니다. 

```swift
func dispatchPrecondition(condition: @autoclosure () -> DispatchPredicate
```


---


## Reference 

[DispatchPredicate](https://developer.apple.com/documentation/dispatch/dispatchpredicate)<br>
[dispatchPrecondition(condition:)](https://developer.apple.com/documentation/dispatch/1780605-dispatchprecondition)<br>
