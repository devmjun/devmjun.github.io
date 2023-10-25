---
layout:     post
title:      "Swift. Timer, Thread 기본"
subtitle:   "Timer, Thread 기초 내용 정리해보자"
date:       2018-02-19 01:00:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/road-1072823.jpg
thumbnail-img: /assets/post_img/background/road-1072823.jpg
share-img: /assets/post_img/background/road-1072823.jpg
toc: true
---

## Timer 

[Timer](https://developer.apple.com/documentation/foundation/timer) <br>

특정 시간 간격이 지난 후 지정된 메세지를 대상 개체에게 보내어 지연 실행 합니다. 

```swift
class Alarm: NSObject {
    @objc func ring(_ timer: Timer) {
        print("weak Up!")
    }
}

// 타이머를 이용한 지연 호출
let obj = Alarm()
var timer = Timer.scheduledTimer(timeInterval: 100,
                                 target: obj,
                                 selector: #selector(Alarm.ring(_:)),
                                 userInfo: nil,
                                 repeats: false)
** closure 를 사용
Timer.scheduledTimer(withTimeInterval: 1.0, repeats: false) { timer in 
	print("클로저를 이용한 타이머")
}
```

---

## Thread 

- 사용자 경험
	- 다운로드
	- 데이터 분석
	- 등등
- 멀티 쓰레드 활용
	- NSObject와 셀렉터
	- Thread
	- OperationQueue, Operation 

NsObject와 멀티 쓰레드


- 멀티 스레드 큐: Thread 가 여러개 사용되면, 오히려 성능이 느려질수 있음. 그렇다면 현재 실행되고 있는 Thread의 개수를 제한하자 라는 생각에서 출발함. 
	- 동시 동작 쓰레드 개수 조절
	- 쓰레드 대기/동작
	- 큐를 이용한 쓰레드 관리
	- OperationQueue, Operation   

#### - 멀티 쓰레드 큐 : OperationQueue 쓰레드(Operation) 추가

```swift
func addOperation(_ op: Operation)
func addOperation(_ block: @escaping () -> Void)
```

#### - 쓰레드 취소

```swift
func cancelAllOperations()
```

#### - 동시 동작 쓰레드 개수 설정

```swift
var maxConcurrentOperationCount: Int
```

#### - 메인 쓰레드 큐

```swift
class var main : OperationQueue { get }
```

```swift
// Operation
class MyOperation : Operation {
    override func main() {
    // 멀티 쓰레드로 동작하는 코드
        for item in 0...10 {
            print(item)
            // 너무 빠르면 멀티쓰레드가 동작하는게 안보일수 있음. 그래서 약간의 간격을둠
            Thread.sleep(forTimeInterval: 0.02)
        }
    }
}

let queue = OperationQueue()
queue.maxConcurrentOperationCount = 3

let opertaion1 = MyOperation()
let opertaion2 = MyOperation()
let opertaion3 = MyOperation()
let opertaion4 = MyOperation()
let opertaion5 = MyOperation()

queue.addOperation(opertaion1)
queue.addOperation(opertaion2)
queue.addOperation(opertaion3)
queue.addOperation(opertaion4)
queue.addOperation(opertaion5)
queue.waitUntilAllOperationsAreFinished()
```

---

