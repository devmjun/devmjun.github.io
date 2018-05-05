---
layout:     post
title:      "Swift. Quality of Service(QoS) 3"
subtitle:   "Quality of Service(QoS)를 알아봅시다!"
date:       2018-05-04 12:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## About Quality of Service(QoS)  
 
 Quality of Service(QoS) 클래스를 사용하면 `NSOperation`, `NSOperationQueue`, `NSThread objects`, `dispatch queues`, `pthreads(POSIX threads)`에서 수행한 작업을 분류할수 있습니다. 
 QoS를 작업에 할당함으로써 그것의 중요도를 지정하고, 시스템 우선순위를 정하고, 알맞게 일정(schedules)을 잡습니다. 예를들어 시스템은 최적의 시간까지 지연할수 있는 백그라운드 작업보다 더 빨리 사용자가 시작한 작업을 수행합니다.
어떤 경우에는 우선순위가 낮은 작업에서 시스템 자원을 재 할당 하고 우선 순위가 높은 작업에 할당할수 있습니다. 

우선순위가 더 높은 작업은 더 빨리 이행하고 우선순위가 낮은 작업보다 더 많은 리소스를 필요로 합니다. 앱의 성능을 위해 적절한 QoS 클래스를 정확하게 지정하면 에너 효율 뿐만아니라, 반응성도 빨라집니다. 

> QoS는 iOS8 이후부터 가능합니다. 

---

## Choosing a Quality of Service Class 

시스템은 QoS 정보를 사용하여 `스케줄링`, `CPU`, `I/O 처리량`, `타이머 대기 시간`과 같은 우선순위를 조정합니다. 
결과적으로 작업 성능(performance) 과 에너지 효율성(energy efficiency)사이의 균형을 유지합니다. 

작업에 QoS를 할당할때 사용자에게 어떻게 영향을 미치는지 그리고 다른 작업에 어떻게 영향을 미치는지 고려하세요. 아래에 각 업무 수준의 4개의 기본 QoS 클래스가 있습니다. 

### User-interactive 

사용자와 상호작용 하는 작업, 기본 스레드에서 작동중인 것같은, 사용자 인터페이스 새로고침 또는 애니메이션을 수행합니다. 작업이 빠르게 수행되지 않으면 사용자 인터페이스가 멈추어(frozen) 있는것 처럼 보일수 있습니다. 반응성과 성능에 중점을 둡니다. 

작업은 거의 순간에 실행되는 작업입니다.

### User-initiated

사용자가 시작하고 즉각적인 결과가 필요한 작업, 저장된 문서를 열거나, 사용자가 사용자 인터페이스에서 무언가를 클릭할때 동작을 수행합니다. 사용자와 상호작용을 계속하려면 사용자의 주문이 필요합니다. 반응성과 성능에 중점을 둡니다.

작업은 거의 순간에 실행되거나, 몇초 혹은 그보다 빠른 작업입니다. 

### Utility 

작업을 완료하는데 약간의 시간이 걸리며 즉각적인 결과가 필요하지 않은 작업, 데이터 다운로드 또는 데이터 가져오기(importing)같은 작업을 수행할수 있습니다. 유틸리티(Utility)작업은 사용자가 볼수 있는 진행상황(progress bar)을 가집니다. 반응성, 성능 및 에너지 효율성간에 균형을 유지하는데 중점을 둡니다. 

작업은 몇 초에서 몇분 정도 필요한 작업입니다.

### Background

뒤에(background)에서 동작하며 사용자가 볼수 없는 작업, 색인, 동기화 및 백업 입니다. 에너지 효율성에 중점을 둡니다.

작업에 상당한시간이 걸리고 몇분 또는 몇 시간 이 필요한 작업입니다. 

---

## Special Quality of Service Classes

기본 QoS 클래스 이외에 두가지 특수 유형의 QoS가 있습니다. 대부분의 경우 이 클래스와 상호 작용 하지 않습니다. 

### Default 

Default는 user-initiated 와 utility의 사이의 어딘가 우선 순위 수준입니다. 이 QoS는 개발자가 작업을 분류하는데 사용하기 위한것이 아닙니다. QoS정보가 Default로서 할당되지 않은 작업입이며 GCD전역 큐(GCD Global queue)가 해당 레벨에서 실행됩니다. 

### Unspecified

QoS정보가 없음을 시스템에 신호를 줍니다. 해당 QoS의 환경에서 추론되어야 합니다. 
스레드가 레거시 API를 사용하는 경우 `unspecified` QoS를 가질수 있습니다.

> 개인 Note: QoS를 동적으로 할당하는것은 좋지 않은것 같습니다(Unspecified 경우). 명확하게 목적을 가지고 선택을 해주어야 하는녀석이라고 생각되서 어느 경우에 사용해야할지 잘 생각되지 않습니다.

---

## DispatchQoS

[DispatchQoS](https://developer.apple.com/documentation/dispatch/dispatchqos)<br>

```swift

let group = DispatchGroup()
let queue = DispatchQueue(label: "kr.mjun",
                          qos: .background,
                          attributes: .concurrent)
let queue1 = DispatchQueue(label: "kr.mjun1",
                           qos: .utility,
                           attributes: .concurrent)
let queue2 = DispatchQueue(label: "kr.mjun2",
                           qos: .userInitiated,
                           attributes: .concurrent)
let queue3 = DispatchQueue(label: "kr.mjun3",
                           qos: .userInteractive,
                           attributes: .concurrent)

queue.async(group: group) {
    for item in 0...1000 {
        print("\(item), q의 작업")
    }
    
}

queue1.async(group: group) {
    for item in 0...1000 {
        print("\(item), q1의 작업")
    }
    
}
queue2.async(group: group) {
    for item in 0...1000 {
        print("\(item), q2의 작업")
    }
    
}
queue3.async(group: group) {
    for item in 0...1000 {
        print("\(item), q3의 작업")
    }
    
}

group.notify(queue: DispatchQueue.global()) {
    print("그룹의 작업이 모두 완료되면 해당 클로저가 호출됩니다!")
}

print("그냥 프린트")

--------------------
, q2의 작업
0, q3의 작업
0, q1의 작업
1, q2의 작업
1, q3의 작업
2, q3의 작업
3, q3의 작업
2, q2의 작업
1, q1의 작업
4, q3의 작업
3, q2의 작업
5, q3의 작업
2, q1의 작업
....
```


QoS의 수준에 따라서 무엇이 먼저 종료, 실행 되는지 결정됩니다. 위의 사용예제는 비공식 개인 예제 입니다. 


---

## Reference 

[DispatchQoS](https://developer.apple.com/documentation/dispatch/dispatchqos)<br>
[Energy Efficiency Guide for iOS Apps](https://developer.apple.com/library/content/documentation/Performance/Conceptual/EnergyGuide-iOS/PrioritizeWorkWithQoS.html)<br>