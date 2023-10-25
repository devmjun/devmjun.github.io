---
layout:     post
title:      "Swift. DispatchGroup 2 "
subtitle:   "DispatchGroup를 알아봅시다! "
date:       2018-05-04 11:00:00
author:     "MinJun"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/HIG-bg.jpg
thumbnail-img: /assets/post_img/background/HIG-bg.jpg
share-img: /assets/post_img/background/HIG-bg.jpg
toc: true
---

## DispatchGroup 

DispatchGroup은 작업의 모음의 동기화를 허용합니다. 여러 다른 작업을 제출하고, 다른큐에서 실행되어도 작업이 모두 완료되면 추적할수 있습니다. 해당 그룹의 작업은 지정된 작업이 완료될때가지 완료할수 없습니다. 

### 예제 

```swift
let group = DispatchGroup()
let queue = DispatchQueue(label: "kr.mjun")
let queue1 = DispatchQueue(label: "kr.mjun")
let queue2 = DispatchQueue(label: "kr.mjun")

group.enter()
queue.async {
    print("q의 작업")
    group.leave()
}
group.enter()
queue1.async {
    print("q1의 작업")
    group.leave()
}

group.enter()
queue2.async {
    print("q2의 작업")
    group.leave()
}

group.wait(timeout: .distantFuture) // 그룹의 작업이 끝날때까지 기다림
print("그냥 프린트")

-----------------
q의 작업
q1의 작업
q2의 작업
그냥 프린트
```

`enter()`, `leave()`를 사용하여 컨텍스트 관리를 합니다. `group.wait()`는 해당 작업이 모두 끝날때까지 대기합니다. `wait()`는 동기형태이기 떄문에 저곳에서 해당 그룹의 작업이 끝날때가지 대기합니다. 

비동기 형식으로 바꾸고 싶다면

`group.notify()` 를 사용할수 있습니다.

### 예제(enter(), leave() 를 사용하지 않는 다른 방법)

```swift
let group = DispatchGroup()
let queue = DispatchQueue(label: "kr.mjun")
let queue1 = DispatchQueue(label: "kr.mjun")
let queue2 = DispatchQueue(label: "kr.mjun")


queue.async(group: group) {
    print("q의 작업")
}

queue1.async(group: group) {
    print("q1의 작업")
    
}
queue2.async(group: group) {
    print("q2의 작업")
    
}
group.notify(queue: DispatchQueue.main) {
    print("그룹의 작업이 모두 완료되면 해당 클로저가 호출됩니다!")
}

print("그냥 프린트")
-------------------------
그냥 프린트
q의 작업
q1의 작업
q2의 작업
그룹의 작업이 모두 완료되면 해당 클로저가 호출됩니다!
```


---

## Reference 

[Concurrent Progrmming Guide](https://developer.apple.com/library/content/documentation/General/Conceptual/ConcurrencyProgrammingGuide/OperationQueues/OperationQueues.html#//apple_ref/doc/uid/TP40008091-CH102-SW15)<br>

[DispatchQueue](https://developer.apple.com/documentation/dispatch/dispatchqueue)<br>
[DispathGroup](https://developer.apple.com/documentation/dispatch/dispatchgroup)