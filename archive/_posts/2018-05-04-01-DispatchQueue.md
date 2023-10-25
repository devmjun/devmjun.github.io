---
layout:     post
title:      "Swift. DispatchQueue 1 "
subtitle:   "DispatchQueue를 알아봅시다! "
date:       2018-05-04 10:00:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/hills-615429.jpg
thumbnail-img: /assets/post_img/background/hills-615429.jpg
share-img: /assets/post_img/background/hills-615429.jpg
toc: true
---

## About Dispatch Queue 

dispatchQueue는 제출한 작업을 관리하는 객체와 유사한 구조입니다. 모든 디스패치큐는 FIFO(first in First out) 구조입니다. 따라서 큐에 추가하는 작업은 항상 추가된 순서대로 시작 됩니다. GCD는 자동으로 일부 디스패치 큐를 제공하지만, 특정 용도로 작성할수 있는 큐를 제공합니다. 

### Serial 

직렬큐(Serial queues, Private dispatch queues라고도함)는 큐에 추가된 순서대로 한번에 하나의 작업을 실행 합니다. 현재 실행중인 작업은 디스패치 대기열에서 관리하는 고유한 스레드에서 실행됩니다.(테스크마다 다를수 있음)

필요한만큼 직렬큐를 생성할수 있고 각 큐는 다른 모든 큐와 동시(each queue operates concurrently)에 작동합니다. 즉, 44개의 직렬큐를 작성하면 각 큐는 한번에 하나에 작업만 실행합니다. 최대 4개의 작업을 동시에 수행할수 있습니다.(각 큐에서 한개씩 이므로)

### 예제 1-1

```swift
let queue = DispatchQueue(label: "kr.mjun")
let queue1 = DispatchQueue(label: "kr.mjun")
let queue2 = DispatchQueue(label: "kr.mjun")

queue.async {
		for item in 0...10 {
			print("\(item), ⚪️")
            }
        }
        
queue1.async {
		for item in 0...10 {
			print("\(item), ⚫️")
            }
        }
        
queue2.async {
		for item in 0...10 {
			print("\(item), 🔴")
            }
        }
        
--------------
0, ⚫️
0, 🔴
0, ⚪️
1, ⚫️
1, 🔴
1, ⚪️
2, ⚫️
2, 🔴
2, ⚪️
3, ⚫️
3, 🔴
3, ⚪️
.....
```

## 예제 1-2

```swift


let queue = DispatchQueue(label: "kr.mjun")
queue.async {
		for item in 0...5 {
			print("\(item), ⚪️")
            }
        }
        
queue.async {
		for item in 0...5 {
			print("\(item), ⚫️")
            }
        }
        
queue.async {
		for item in 0...5 {
			print("\(item), 🔴")
            }
        }
         
--------------
0, ⚪️
1, ⚪️
2, ⚪️
3, ⚪️
4, ⚪️
5, ⚪️
0, ⚫️
1, ⚫️
2, ⚫️
3, ⚫️
4, ⚫️
5, ⚫️
0, 🔴
1, 🔴
2, 🔴
3, 🔴
4, 🔴
5, 🔴
```

> Serial Queue에 실행을 async로 해도 설정된 Queue가 Serial 이라서 Serial로 각 task 가 처리됩니다.

### Concurrent

동시 큐(Concurrent queue, also known as a type of global dispatch queue)는 하나 이상의 작업을 동시에(concurrently) 수행 합니다. 그러나 작업은 여전히 `큐에 추가된 순서대로 시작됩니다.` 현재 실행 중인 작업은 디스패치큐에서 관리하는 고유한 스레드에서 실행됩니다. 특정 시점에 실행되는 정확한 작업(tasks)의 수는 가변적(variable)이고 시스템 조건에 따라서 결정됩니다. 

iOS 5 이상에서는 큐 타입으로서 `DISPATCH_QUEUE_CONCURRENT`를 지정하여 동시큐를 생성할수 있습니다. 추가적으로 애플리케이션이 사용하기위해 미리 정의된 4개의 전역 동시성 큐(global concurrent queues)가 있습니다. 해당 큐를 가져오는 방법은 [Getting the Global Concurrent Dispatch Queues](https://developer.apple.com/library/content/documentation/General/Conceptual/ConcurrencyProgrammingGuide/OperationQueues/OperationQueues.html#//apple_ref/doc/uid/TP40008091-CH102-SW5)을 참조해주세요.

#### - 기본큐 가져오기

```swift
DispatchQueue.main.async {...} 

DispatchQueue.global().async {...}
```


### 에제 

```swift
let queue = DispatchQueue(label: "kr. mjun", attributes: .concurrent)

queue.async {
	for item in 0...5 {
		print("\(item), ⚪️")
		}
	}
        
queue.async {
	for item in 0...5 {
		print("\(item), ⚫️")
		}
	}
        
queue.async {
		for item in 0...5 {
			print("\(item), 🔴")
		}
}

--------------------
0, ⚪️
0, ⚫️
0, 🔴
1, ⚪️
1, ⚫️
1, 🔴
2, ⚪️
2, ⚫️
2, 🔴
3, ⚪️
3, ⚫️
3, 🔴
4, ⚪️
4, ⚫️
4, 🔴
5, ⚪️
5, ⚫️
5, 🔴
```

### Main dispatch queue 

주 디스패치 큐(main dispatch queue)는 애플리케이션의 main thread에서 작업을 실행하는 `전역적으로 사용 가능한 직렬 큐(globally available serial queue)` 입니다. 이 큐의 작업자는 애플리케이션의 런 루프(Run Loop)와 함께 대기열에 있는 작업의 실행과 상호작용 합니다.  

이 큐의 애플리케이션 실행 루프(Run Loop)와 함께 작동하여(실행 루프가 있는 경우)큐에 있는 작업을 실행 루프에 연결된 다른 이벤트 소스의 실행과 상호작용 하며 실행합니다. 왜냐하면 애플리케이션의 주 스레드에서 실행되므로 main queue는 종종 애플리케이션의 주된 동기화 포인트(key synchronization)로 사용됩니다. main dispatchqueue를 만들필요는 없지만 애플리케이션이 적절한 흐름으로 동작 확인해야 합니다. 

```swift
DispatchQueue.main
....
```

dispatch main queue에서 실행된 모든 아이템은 Main Thread에서 동작 합니다. Queue와 Queue간에서도 간단한 연쇄적으로 동작합니다.

```swift
let queue = DispatchQueue(label: "com.example.imagetransform")
queue.async {
    let smallImage = image.resize(to: rect)
    DispatchQueue.main.async {
      imageView.image = smallImage
	} 
}
```




---

## Reference 

[Concurrent Progrmming Guide](https://developer.apple.com/library/content/documentation/General/Conceptual/ConcurrencyProgrammingGuide/OperationQueues/OperationQueues.html#//apple_ref/doc/uid/TP40008091-CH102-SW15)<br>
[DispatchQueue](https://developer.apple.com/documentation/dispatch/dispatchqueue)<br>

[need some clarifications about dispatch queue, thread and NSRunLoop](https://stackoverflow.com/questions/38000727/need-some-clarifications-about-dispatch-queue-thread-and-nsrunloop)<br>