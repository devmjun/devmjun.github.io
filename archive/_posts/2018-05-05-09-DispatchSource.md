---
layout:     post
title:      "Swift. DispatchSource 9"
subtitle:   "DispatchSource를 알아봅니다!"
date:       2018-05-06 15:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Link]
---

## DispatchSource 

커널 또는 다른 시스템 계층을 호출하면 컨텍스트가 변경됩니다. 이는 내 프로세스 이내에서 호출하는것에 비해서 상당히 비쌉니다. 
결과적으로 많은 시스템 라이브러리는 비동기 인터페이스를 제공하여 시스템에 요청을 제출하고 요청이 처리되는 동안 다른 작업을 계속합니다. 

Grand Central Dispatch(GCD)는 요청을 제출하고 블록 및 디스패치큐를 사용하여 결과를 코드에 다시 보고하도록 허용함으로써 이러한 일반적인 동작을 기반으로 합니다. 

---

## about Dispatch Source 

`dispatch source`는 특정 저수준 시스템의 프로세싱을 처리를 조정하는 데이터 타입입니다. GCD는 다음 타입의 디스패치소스를 지원합니다. 

- `Timer dispatch source`는 주기적인 알람을 발생(generate) 시킵니다.
- `Signal dispatch source`는 UNIX 신호가 도착했을때 알림을 통지합니다.
- `Descriptor source`는 다양한 파일, 소켓기반 연산 같은것들에 알림을 통지합니다.
	- 데이터를 읽을수 있을때  
	- 데이터를 쓸수(write) 있을때
	- 파일 시스템에서 파일을 지우고, 옮기고, 이름을 변경할때
	- 파일의 메타 정보가 변할때

- `Process dispatch source`는 process와 관계된 이벤트 알림을 통지합니다.
	- Process를 나갈때
	- 프로세스가 `fork`, `exec`의 호출을 발행(?) 할때
	- 신호가 프로세스에 도착되었을때
- `Mach port dispatch source`는 Mach와 관계된 이벤트를 알려줍니다.
- Custom dispatch source는 내가 정의하거나 내 자신이 시작하는것


디스패치 소스는 시스템과 관련된 이벤트를 처리하는데 일반적으로 사용되는 비동기 콜백 함수를 대체합니다. 디스패치 소스를 구성할때, 내가 모니터하기를 원하는 특정 이벤트와 그리고 해당 이벤트를 처리하는데 사용할 디스패치 큐와 코드를 지정합니다. 블록객체 또는 함수를 사용하여 코드를 지정할수 있습니다. 이벤트가 도착했을때, 디스패치 소스는 블록을 제출하거나, 함수 실행을 위해 지정된 디스패치 소스가 디스패치 대기열에 제출합니다. 

수동으로 큐에 제출하는 작업과 달리 디스패치 소스는 애플리케이션을 위한 끊임없는 이벤트 소스(continuous source of events)를 제공합니다. 디스패치 소스는 명확하게 취소하기 전까지 지정된 디스패치 큐에 유지됩니다. 이벤트가 발생할때마다 디스패치 소스는 연관된 작업코드를 디스패치 큐에 제출합니다. 

예를들어 타이머 이벤트는 정기적인 간격으로 발생하지만 산발적으로만(only sporadically) 발생합니다. 그것의 이유는 디스패치 소스는 관련 디스패치 대기열을 보유하여 이벤트가 아직 보류중일때 조기에 해제되지 않도록 합니다. 

디스패치 큐에서 미처 처리되지(from becoming backlogged) 못한 이벤트를 방지하고, 디스패치 소스는 이벤트 병합 스키마를 구현합니다. 이전 이벤트의 이벤트 처리기가 큐에서 제거되고 실행되기 전에 새 이벤트가 도착하면, 디스패치 소스는 새 이벤트 데이터의 데이터와 통합합니다. 이벤트 타입에 따라 통합하면 이전 이벤트를 대체하거나 보유한 정보를 업데이트 할수 있습니다. 

예를들어 신호 기반의 디스패치 소스는 가장 최근의 신호에 대한 정보만 제공하지만, 또한 이벤트 처리기가 수신한 총 신호 수를 보고합니다. 

---

## Creating Dispatch Sources 


dispatch source를 생성하는것은 이벤트 소스와 디스패치 소스를 포함하는 것 입니다. 이벤트 소스는 어떤 고유의 자료 구조라도 이벤트 처리가 필요합니다. 예를들어 설명 기반 디스패치 소스는 설명자(descriptor)를 여는게 필요합니다. 또는 프로세스 기반소스의 경우 대상 프로그램의 프로세스 ID를 가져와야합니다. 이벤트 소스를 가지고 있으면 디스패치 소스에서 다음을 생성할수 있습니다. 

1. 디스패치 소스 작성 
2. 디스패치 소스 구성 
	- 디스패치 소스에 이벤트 처리기 할당 
	- 타이머의 경우 `dispatch_source_set_timer`를 사용합니다(objective-c) 
3. 디스패치 소스의 취소 처리기는 선택 사항입니다. 
4. `dispatch_resume` 을 호출하여 프로세싱을 시작합니다.

> 개인 Note: Objective-c 기준ㅠㅠ Swift 예제코드 어디없나..ㅠ.ㅠ

---

## Timer 예제 

```swift
final class MainViewController: UIViewController {
    
    // 1. DispatchSource 작성
    var timer: DispatchSourceTimer?
    let queue = DispatchQueue(label: "kr.mjun", attributes: .concurrent)
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(true)
        startTimer()
    }
    
    private func startTimer() {
        // cancel previous timer if any
        timer?.cancel()
            
        // 1. DispatchSource 작성
        timer = DispatchSource.makeTimerSource(queue: queue)
        
        // 2. DispatchSource 구성
        timer?.schedule(deadline: .now(), repeating: .seconds(5), leeway: .milliseconds(100))
        timer?.setEventHandler { [weak self] in // DispatchSource는 강한 참조
            print(Date())
        }
        
        // 3. 실행
        timer?.resume()
    }
    
    // 4. DispatchSource의 취소 구현은 선택 사항
    private func stopTimer() {
        timer?.cancel()
        timer = nil
    }
}

--------------
2018-05-06 08:24:51 +0000
2018-05-06 08:24:56 +0000
2018-05-06 08:25:01 +0000
2018-05-06 08:25:06 +0000
2018-05-06 08:25:11 +0000
2018-05-06 08:25:16 +0000
2018-05-06 08:25:21 +0000
2018-05-06 08:25:26 +0000
2018-05-06 08:25:31 +0000
......
```


---


## Reference 

[DispatchSource on Concurrency Programming Guide](https://developer.apple.com/library/content/documentation/General/Conceptual/ConcurrencyProgrammingGuide/GCDWorkQueues/GCDWorkQueues.html)<br>
[[번역]스위프트에서 동시성에대한 모든것-Part1 : 현재편](http://blog.canapio.com/128) <br>

---
