---
layout:     post
title:      "Swift. DispatchWorkItem 4"
subtitle:   "DispatchWorkItem를 알아봅시다!"
date:       2018-05-04 13:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Realm, Swift]
---

## DispatchWorkItem

[DispatchWorkItem](https://developer.apple.com/documentation/dispatch/dispatchworkitem)

DispatchWorkItem은 작업을 캡슐화 합니다. DispatchWorkItem은 DispathQueue와 DispathGroup 이내의 DispatchQueue에 보낼수 있습니다. DispatchWorkItem은 DispatchSource event, registration, cancel handlr에 셋팅할수 있습니다. 

기존의 Dispatchqueue의 작업을 세분화하여 관리할수 있습니다. 예를들어 DispatchWorkItem을 생성할때 `DispatchWorkItem(flags: .assignCurrentContext)`를 사용하여 작업을 만드는 경우가 있습니다. 

> DispatchWorkItem(flags: .assignCurrentContext)는 컴파일 디지 않습니다. DispatchWorkItem(flags:block:()->Void) 이기 때문입니다.

### perfome()

```swift
let workItem = DispatchWorkItem {
    print("workItem 실행!")
}

workItem.perform()
print("perform 이후")

------------------
workItem 실행!
perform 이후
```

### queue.async(execute:)

```swift
let queue = DispatchQueue(label: "kr.mjun")
let workItem = DispatchWorkItem {
    print("workItem 실행!")
}

queue.async(execute: workItem)
print("perform 이후")

---------------------
perform 이후
workItem 실행!
```

### queue.async(group:execute:)

```swift
let group = DispatchGroup()
let queue = DispatchQueue(label: "kr.mjun")
let workItem = DispatchWorkItem {
    print("workItem 실행!")
}

queue.async(group: group, execute: workItem)
print("perform 이후")

---------------
perform 이후
workItem 실행!
```

### notify

```swift
let queue = DispatchQueue(label: "kr.mjun")
let workItem = DispatchWorkItem {
    sleep(2)
    print("done")
}
queue.async(execute: workItem)
    
workItem.notify(queue: .main) {
    print("notify!")
}

----------------------

done
notify!
```

### wait

- wait는 작업이 완료될때가지 기다립니다. 해당 메소드를 사용하여 필요한것을 전달하도록 지정할수 있습니다. 
- QoS에 맞추어 대응 가능합니다. 
- 사실 정확하게 이해되지는 않습니다. [Concurrent programming with GCD in Swift](https://developer.apple.com/videos/play/wwdc2016/720/?time=881) 에서 해당 내용에 대해 다룹니다

```swift
let myQueue = DispatchQueue(label: "kr.mjun")
let workItem = DispatchWorkItem {
    sleep(1)
    print("done")
}
myQueue.async(execute: workItem)
print("before waiting")
workItem.wait()
print("after~")

----------------------
before waiting
done
after~
```

`Thread sleep` 과 `wait()`의 차이에 대한 내용은 [여기에서 잘 설명합니다.](https://stackoverflow.com/questions/38105105/difference-between-dispatching-to-a-queue-with-sync-and-using-a-work-item-with)

wait는 [dispatch_block_wait()](https://github.com/apple/swift-corelibs-libdispatch/blob/master/dispatch/block.h#L278)의 레퍼 입니다. <Del>해당 함수는 디스패치 블록 객체가 완료되었거나 지정된 타임 아웃이 경과할때가지 동기적으로 실행을 기다립니다. 라고 설명합니다 ㅠ.ㅠ 정확하지 않습니다.(나중에 다시 수정해야겠습니다..)</Del>

## DispatchWorkItemFlag

`DispatchWorkItem(flags: .assignCurrentContext)`을 만들때 디스패치큐에 제출하는 시간이 아니라 실행 컨텍스트의 QoS를 가져옵니다.(좀더 세분화된 QoS를 설정할수 있다는 의미로 이해됩니다)

아이템을 만들고, 나중에 저장하고, 마침내 실행할때 dispatch로 제출합니다.(그것을 생성했을때 프로퍼티들을)

```swift
public struct DispatchWorkItemFlags : OptionSet, RawRepresentable {
	public let rawValue: UInt
	public init(rawValue: UInt) { self.rawValue = rawValue }

	public static let barrier = DispatchWorkItemFlags(rawValue: 0x1)

	@available(macOS 10.10, iOS 8.0, *)
	public static let detached = DispatchWorkItemFlags(rawValue: 0x2)

	@available(macOS 10.10, iOS 8.0, *)
	public static let assignCurrentContext = DispatchWorkItemFlags(rawValue: 0x4)

	@available(macOS 10.10, iOS 8.0, *)
	public static let noQoS = DispatchWorkItemFlags(rawValue: 0x8)

	@available(macOS 10.10, iOS 8.0, *)
	public static let inheritQoS = DispatchWorkItemFlags(rawValue: 0x10)

	@available(macOS 10.10, iOS 8.0, *)
	public static let enforceQoS = DispatchWorkItemFlags(rawValue: 0x20)
}
```

### 예제

```swift
let workItem = DispatchWorkItem(flags: .assignCurrentContext) {
            print("1")
        }
```

---


## Reference 

[Concurrent programming with GCD in Swift](https://developer.apple.com/videos/play/wwdc2016/720/?time=881)
[Swift/dispatch/Block.swift](https://github.com/apple/swift/blob/master/stdlib/public/SDK/Dispatch/Block.swift)<br>
[DispatchWorkItem](https://developer.apple.com/documentation/dispatch/dispatchworkitemflags)<br>

[Difference between dispatching to a queue with `sync` and using a work item with a `.wait` flag?](https://stackoverflow.com/questions/38105105/difference-between-dispatching-to-a-queue-with-sync-and-using-a-work-item-with)<br>
[dispatch_block_wait()](https://github.com/apple/swift-corelibs-libdispatch/blob/master/dispatch/block.h#L278)
