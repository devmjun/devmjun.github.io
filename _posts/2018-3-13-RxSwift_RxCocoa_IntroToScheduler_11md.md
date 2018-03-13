---
layout:     post
title:      "RxSwift/RxCocoa. 기초 정리하기 (11)"
subtitle:   "Schedulers, ObserveOn, SubscribeOn, Hot Observable vs Cold Observable, GCD, DispatchQueue, Thread, NSOperationQueue"
date:       2018-03-13 13:12:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

Raywenderlich-Ebook의 RxSwift를 읽고 정리한 내용입니다.

---

## RxCocoa 정리 (11) 

- Intro To Schedulers 
- What is a Scheduler?
	- Demystifying the scheduler
- Setting up the project
	- Switching schedulers 
	- using subscribeOn
	- Using observeOn
- Pitfalls
	- Hot vs cold 
- Best practices and built-in schedulers
	- Serial vs concureent schedulers 
	- MainScheduler
	- SerialDispatchQueueScheduler 
	- ConcurrentDispatchQueueScheduler
	- OperationQueueScheduler
	- TestScheduler
- Where to go from here? 
- Reference 

---

## Intro To Schedulers 

지금까지 `Threading`, `concurrency`를 처리하는 방법에 대한 설명을 피하면서 `schedulers`와 함께 작업할수 있었습니다. 

이전 장에서 암시적으로 `buffer`, `delaySubscription`또는 `interval` 연산자와 같은 일종의 동시성/스레딩 수준을 사용하는 메서드를 사용했습니다.

스케쥴러가 일종의 마법을 가지고 있다는 느낌이 들었을지 모르지만, 스케줄러를 이해하기 전에 `observeOn` 함수가 무엇인지 이해해야합니다.

이장에서 `Rx` 추상화가 왜 강력하고 비동기 프로그래밍을 사용하여 작업하는것이 `locks`, `queues`보다 덜 고통스러운지를 배울수 있는 스케줄러의 아름다움을 다룰 예정입니다.

---

## What is a Scheduler?

스케줄러로 손이 더럽혀지기전에(?) 그들으 무엇인지, 무엇이 아닌지를 이해하는것은 중요합니다. 

요약하면 스케줄러는 프로세스가 진행되는 상황입니다. 이 컨텍스트는 `Thread`, `Dispatch queue` 또는 유사한 `entities` 거나, `OperationQueueScheduler`내에서 사용되는 `NSOperation` 일수도 있습니다.

다음을 schdulers 사용의 좋은 예입니다. <br>

<center><img src="/img/posts/RxSwift_Scheduler.png" width="500" height="300"></center> <br> 


위의 다이어그램에는 캐시연산자의 개념이 있습니다. `observable`은 서버에 요청을하고 일부 데이터를 검색합니다.

이 데이터를 어딘가에 저장하는 `cache`라는 사용자 정의 연산자에 의해 처리됩니다. 

그런 다음 데이터를 다른 스케줄러에 있는 모든 구독자에게 전달됩니다. 

`MainScheduler`는 Main thread위에 위치하여 UI업데이트를 할수 있습니다.

---

### Demystifying the scheduler

스케줄러에 대한 한가지 일반적인 오해는 스레드와 똑같이 관련있다고 생각하는것입니다. 

그리고 그것은 처음에는 논리적인것처럼 보일수 있으나 결국 스케줄러는 `GCD dispatch queues`와 유사하게 작동합니다. `그러나 이것 잘못 됫습니다.`

사용자 지정 스케줄러를 작성하는경우(권장하지 않음) 동일한 스레드를 사용하여 여러 스케줄러를 만들거나, 여러 스레드 위에 하나의 스케줄러를 만들거나 할수 있습니다. 그것은 이상하지만, 일은 합니다....(...)

<center><img src="/img/posts/RxSwift_Scheduler-1.png" width="500" height="300"></center> <br> 

**기억해야할 중요한 점은 스케줄러는 스레드가 아니며 스레드와 일대일 관계가 없다는 것입니다.**

`스케줄러가 작업을 수행하는 컨텍스트(스레드가 아닌)를 항상 확인 하십시오`

이장의 뒷부분에서 이를 이해하는데 도움이 되는 몇가지 좋은 예를 접하게 될것입니다.

---

## Setting up the project

이번에는 `commnad-line tool`에서 작업 합니다. 

`command-line tool`을 사용한 이유는, `threads, concurrency`를 사용하여 놀고 있기 때문에, 일반 텍스트 출력은 보여지는 요소들 보다쉽게 이해할수 있습니다. 

프로젝트를 열고 실행하면 콘솔창에 아래와 같은 메세지를 받을수 있습니다.

```swift
==== Schedulers =====
00s | [D] [dog] received on Main Thread
00s | [S] [dog] received on Main Thread
Program ended with exit code: 0
```

계속하기전에 `Utils.swift`를 열고 `dump()` 및 `dumpingSubscription()`구현을 살펴 보십시오. 

첫번째 방법은 `[D]` 접두사를 사용하여 `do(onNext:)` 연산자 내에서 요소와, 현재 스래드의 정보를 `print` 가 아닌 `dump` 합니다.

두번째 `[S]` 접두어를 사용하여 동일하게 하지만 `subscribe(onNext:)`를 호출합니다. 두 방법 모두 경과 시간을 나타내므로 00은 `0초 경과`를 의미합니다

콘솔에 인쇄정보의 부작용을 주입하는 두 가지 다른 방법이 있으므로 `do(onNext:)`로 체인을 연결하고 결국 `subscribe(onNext:)`로 구독하여 체인을 캡슐화 할수 있습니다. 

다음 섹션에서 `observable chain`이 `스케쥴러간 전환하는것이` 얼마나 쉬운지 보게 될것입니다.

---

## Switching schedulers 

Rx에서 가장 중요한 사항중 하나는 `내부 프로세스에 의해서 생성되고 있는 이벤트를 제외하고` 아무런 제한없이 언제든지 스케줄러를 전환할수 있는 기능입니다.

> Note: 타입제한의 예는, observable object가 Thread를 넘겨 보낼수 없는 Thread가 아닌 object를 발행하는 경우입니다. 이 경우 RxSwift를 사용하면 스케줄러를 전환할수 있지만, 기본코드의 논리를 위반하게 됩니다.

스케줄러의 작동 방식을 이해하기 위해 과일을 제공하는 간단한 observable을 만들어 봅니다.

`main.swift` 아래쪽에 다음 코드를 추가하십시오.

```swift
let fruit = Observable<String>.create { observer in
  observer.onNext("[apple]")
  sleep(2)
  observer.onNext("[pineapple]")
  sleep(2)
  observer.onNext("[strawberry]")
  return Disposables.create()
}

fruit
    .dump()
    .dumpingSubscription()
    .disposed(by: bag)
```

위 처럼 작성하면 아래의 출력결과를 얻을수 있습니다.

```swift
00s | [D] [dog] received on Main Thread
00s | [S] [dog] received on Main Thread
00s | [D] [apple] received on Main Thread
00s | [S] [apple] received on Main Thread
02s | [D] [pineapple] received on Main Thread
02s | [S] [pineapple] received on Main Thread
04s | [D] [strawberry] received on Main Thread
04s | [S] [strawberry] received on Main Thread
```

여기에 원래 subject가 있고, 그 이후에 2초마다 과일을 출력합니다. 

fruit는 main thread에서 `실행(generated)` 되지만, background thread로 옮기는것이 좋겠습니다.

`background thread`에서 열매를 만드려면 `subscribeOn`을 사용해야 합니다.

---

### using subscribeOn

경우에 따라서 observable 계산 코드가 실행되는 스케줄러를 변경할수 있습니다.(subscription operators 이 아니라 observable이 실제 event를 방출하는 코드)

> Note: 사용자가 작성한 사용자 정의 observable이 방출하는 `이벤트 코드`는 `Observable.create {...}`의 후행클로저를 제공하는 코드입니다. 

`computationg scheduler` 코드를 세팅하는 방법은 `subscribeOn`을 사용하는 것입니다. 

언뜻 보기에는 반직관적인 이름처럼 들릴수 있지만, 잠시 생각 해보면 의미가 있습니다. 

observable을 observe 하고싶다면 subscribe 하세요.

original processing이 어디에서 작동할지 결정하십시오. `subscribeOn`이 호출되지 않으면 `RxSwift`는 `자동으로 현재 thread를 사용합니다.`

<center><img src="/img/posts/RxSwift_Scheduler-2.png" width="500" height="300"></center> <br> 

이 process는 `main scheduler`를 사용하여 `main thread`에서 `events`을 작성합니다. 

사용했던 `MainScheduler`는 `main thread`위에 위치합니다. `main thread`에서 이행하려는 모든 작업은 해당 스케쥴러를 사용해야하므로, UI 작업을 위해 main thread에서 작업했던 이전 장에서 사용했습니다.

스케줄러를 전환하려면 `subscribeOn`을 사용하십시오. `main.swift`에는 background queue를 사용하는 `globalScheduler`라는 사전 정의 된 스케줄러가 있습니다. 

`globalScheduler`는 `global dispatch queue`, `concurrent queue`를 사용하여 작성됩니다.

```swift
let globalScheduler = ConcurrentDispatchQueueScheduler(queue:
DispatchQueue.global())
```

클레스 이름에서 알수 있듯이 이 스케줄러에서 계산할 모든 작업은 `global dispatch queue`에 의해 발성되고 처리됩니다. 

이 스케줄러를 사용하면, 이전 구독이 새로운것으로 만든 과일로 변경합니다.

```swift
fruit
  .subscribeOn(globalScheduler)
  .dump()
  .dumpingSubscription()
  .disposed(by: bag)
```

그리고, 마지막 줄에 다음을 추가하세요

```swift
RunLoop.main.run(until: Date(timeIntervalSinceNow: 13))
```

이것은 확실히 해킹입니다.

이는 모든 작업이 `메인 스레드`에서 완료되면, 터미널이 종료되는것을 방지하며, 이로인해 당신의 글로벌 스케쥴러가 사망하고 `observable` 가능하도록 합니다.

이 경우 Terminal은 13초 동안 작동 상태를 유지합니다.

> Note: 이 예제에서 13초가 지나치게 길수도 있지만, 이 장을 이동하면 서 앱이 완료되는데 이 시간이 필요합니다. 
> 모든 observe가 종료되면 application을 중단하십시오.

이제 새 스케줄러가 자리 했으니 빌드하고 실행 결과를 확인합니다. 

```swift
00s | [D] [dog] received on Main Thread
00s | [S] [dog] received on Main Thread
00s | [D] [apple] received on Anonymous Thread
00s | [S] [apple] received on Anonymous Thread
02s | [D] [pineapple] received on Anonymous Thread
02s | [S] [pineapple] received on Anonymous Thread
04s | [D] [strawberry] received on Anonymous Thread
04s | [S] [strawberry] received on Anonymous Thread
```

`global queue`는 이름이 없는 thread를 사용했고 그것은 `global thread` 입니다.

이제 `observable`과 `subscribed observer`은 같은 스레드에서 데이터를 처리합니다. 

<center><img src="/img/posts/RxSwift_Scheduler-3.png" width="500" height="300"></center> <br> 

멋지다. 하지만 observer가 operators 코드를 수행하는 위치를 변경하려면 어떻게해야할까? `observeOn`을 사용해야합니다. 

---

### Using observeOn

`Observing`은 Rx의 세가지(Observable, Subscribe, Operators) 기본 개념중 하나입니다.

여기에는 `이벤트를 생성하는 entity`와 `해당 이벤트의 옵저버`가 포함됩니다. 

그리고 이 경우 `subscribeOn`에 반대하여 연산자 `observeOn`은 관찰(`observation`)이 일어나는 스케줄러를 변경합니다. 

따라서 결과가 실행되고 이벤트가 `Observable`에 의해 모든 구독 하고 있는 observers에게 푸시되면 이 연산자는 이벤트가 올바른 스케줄러에서 올바르게 처리되도록 합니다. 

현재 `global scheduler`에서 `main thread`로 전환하려면 구독하기전에 `observeOn`을 호출해야합니다.

한번더 과일 구독코드를 아래와 같이 변경하세요

```swift
fruit
  .subscribeOn(globalScheduler)
  .dump()
  .observeOn(MainScheduler.instance)
  .dumpingSubscription()
  .disposed(by:bag)
```

위의 코드를 작성하고 실행하면 아래와 같은 실행결과를 얻을수 있습니다.(프로그램이 콘솔에서 인쇄를 멈출때가지 몇초간 기다려야합니다)

```swift
00s | [D] [dog] received on Main Thread
00s | [S] [dog] received on Main Thread
00s | [D] [apple] received on Anonymous Thread
00s | [S] [apple] received on Main Thread
02s | [D] [pineapple] received on Anonymous Thread
02s | [S] [pineapple] received on Main Thread
04s | [D] [strawberry] received on Anonymous Thread
04s | [S] [strawberry] received on Main Thread
```

원하는 결과를 얻엇고 이제 모든 이벤트가 올바른 스레드에서 처리됩니다.

`main observable`은 background thread에서 이벤트를 처리하고 생성하는 하고 `subscribe`는 main thread에서 작업을 수행합니다. 

<center><img src="/img/posts/RxSwift_Scheduler-4.png" width="500" height="300"></center> <br> 

이것은 매우 일반적인 패턴 입니다. 

백그라운드 프로세스를 사용하여 서버에서 데이터를 검색하고 수신된 데이터를 처리하고 `MainScheduler`로 전환하여 최종 이벤트를 처리하고사용자 인터페이스에 데이터를 표시했습니다. 

> observable과 subscribe가 main, background thread 어디에서 실행되는지 명확하게 알고 있을 필요가 있는것 같음! 
> 

---

## Pitfalls

`schedulers`와 `threads`를 전환하는 기능은 놀랍지만 몇가지 함정이 있습니다. 

이유를 확인하려면 새 스레드를 사용하여 일부 이벤트를 제목으로 푸시해야합니다. 

연산을 수행하는 thread를 추적해야하므로 좋은 해결책은 `Thread`(또는 Objective-C에서 NSThread)를 사용하는 것입니다. 

fruit observable 직후에, 아래의 코드를 추가하여 일부 동물을 생성합니다.

```swift
let animalsThread = Thread() {
    sleep(3)
    animal.onNext("[cat]")
    sleep(3)
    animal.onNext("[tiger]")
    sleep(3)
    animal.onNext("[fox]")
    sleep(3)
    animal.onNext("[leopard]")
}

animalsThread.name = "Animals Thread"
animalsThread.start()
```

그런 다음 Thread 이름을 인식할수 있도록 이름을 넣고 실행합니다. 아래의 결과와 비슷한 얻을수 있습니다.

```swift
...
03s | [D] [cat] received on Animals Thread
03s | [S] [cat] received on Animals Thread
04s | [D] [strawberry] received on Anonymous Thread
04s | [S] [strawberry] received on Main Thread
06s | [D] [tiger] received on Animals Thread
06s | [S] [tiger] received on Animals Thread
09s | [D] [fox] received on Animals Thread
09s | [S] [fox] received on Animals Thread
12s | [D] [leopard] received on Animals Thread
12s | [S] [leopard] received on Animals Thread
```

나만의 전용 `Thread`를 만들었습니다. 이제 `global thread`에서 결과를 처리합니다. 

> Note: 코드를 계속 추가한다음 다른것으로 바꾸는것이 반복적인것 처럼 보일수 있지만 목표는 다른 스케줄러의 사용법과 차이점을 확인하고 비교하는것 입니다. 

원래의 동물 구독을 다음의 코드로 교체합니다

```swift
animal
  .dump()
  .observeOn(globalScheduler)
  .dumpingSubscription()
  .disposed(by:bag)
```

아래와 같은 결과를 얻을수 있습니다

```swift
...
03s | [D] [cat] received on Animals Thread
03s | [S] [cat] received on Anonymous Thread
04s | [D] [strawberry] received on Anonymous Thread
04s | [S] [strawberry] received on Main Thread
06s | [D] [tiger] received on Animals Thread
06s | [S] [tiger] received on Anonymous Thread
09s | [D] [fox] received on Animals Thread
09s | [S] [fox] received on Anonymous Thread
12s | [D] [leopard] received on Animals Thread
12s | [S] [leopard] received on Anonymous Thread
```

이제 제한된 13초를 thread가 전환되고 사용합니다. 

global queue에서 observation 프로세싱되길 원하지만 main thread에서 subscribe을 처리되기를 원할땐 어떻게 해야합니까?

이 경우에 `observeOn`은 이미 올바르지만 두번째 경우는 `subscribeOn`을 사용해야합니다. 

동물 subscription을 다음으로 변경하세요

```swift
animal
  .subscribeOn(MainScheduler.instance)
  .dump()
  .observeOn(globalScheduler)
  .dumpingSubscription()
  .disposed(by:bag)
``` 

아래와 같은 결과를 얻을수 있습니다.

```swift
===== Schedulers =====

00s | [D] [dog] received on Main Thread
00s | [S] [dog] received on Anonymous Thread
00s | [D] [apple] received on Anonymous Thread
00s | [S] [apple] received on Main Thread
02s | [D] [pineapple] received on Anonymous Thread
02s | [S] [pineapple] received on Main Thread
03s | [D] [cat] received on Animals Thread
03s | [S] [cat] received on Anonymous Thread
04s | [D] [strawberry] received on Anonymous Thread
04s | [S] [strawberry] received on Main Thread
06s | [D] [tiger] received on Animals Thread
06s | [S] [tiger] received on Anonymous Thread
09s | [D] [fox] received on Animals Thread
09s | [S] [fox] received on Anonymous Thread
12s | [D] [leopard] received on Animals Thread
12s | [S] [leopard] received on Anonymous Thread
```

올바른 `scheduler`에서 계산이 발생하지 않습니다. 이것은 Rx를 기본적으로 비동기 또는 멀티 스레드로 생각할때 생기는 공통적이고 위험한 함정입니다. 이것은 사실이 아닙니다.

Rx와 일반적인 추상화는 자유스레드(free-threaded) 입니다. 데이터를 처리할때 마술같은 스레드전환이 일어나지 않습니다. 달리 지정되지 않은 경우 연산은 항상 `원래 스레드(original thread)`에서 수행됩니다.

> Note: thread의 전환은 프로그래머가 `subscribeOn`, `observeOn`연산자를 사용하여 명시적으로 요청한 후에 발생합니다. 

`Rx`는 기본적으로 일부 스레드 처리를 수행하는 일반적인 속임수 입니다. 위의 상황은 주제의 오용(잘못쓴)입니다. 

원래 연산이 특정 스레드에서 일어나고 있고 그 이벤트는 `Thread() {..}`를 사용하여 해당 스레드에 푸시됩니다. 

`Subject`의 속성으로 인해 `Rx`는 원본 연산 스케줄러를 전환하고 다른 스레드로 이동할수 없습니다. `Subject`는 푸시된 곳을 직접 제어할수 없기 때문입니다.

왜 이것이 fruit thread와 함께 작용합니까? `Observable.create`를 사용하면 Rx를 Thread 블록 내부에서 제어할수 있으므로 스레드 처리를 보다 세밀하게 사용자 정의 할수 있습니다.

이 얘기치 않은 결과는 일반적으로 `Hot and Cold Observable` 문제로 알려져 있습니다. 

위의 경우 당신은 `hot observable`대상을 다루고 있습니다. observable은 구독중에 `side-effect`가 없지만 이벤트가 생성되고 RxSwift가 그것을 제어할수 없는 자체 컨텍스트를 가지고 있습니다.(즉, 자체 스레드를 사용합니다)

대조적으로 `cold observable`은 observers가 subscribe하기전에 어떤 요소도 생산하지 않습니다. 

이는 구독할때 일부 컨텍스트를 만들고 요소를 만들기 시작할때까지 자체 컨텍스트가 없는 것을 의미합니다.

---

### Hot vs cold 

위의 섹션은 hot observable, cold observable에 대해서 다루었습니다. 두개의 주제는 꽤나 논쟁거리가 되어 많은 토론을 불러 일으키므로 여기서 간단히 살펴 보도록 하겠습니다. 

이 개념은 매우 간단한 질문으로 축소될수 있습니다.

<center><img src="/img/posts/RxSwift_Scheduler-5.png" width="500" height="300"></center> <br> 

side effects의 몇가지 예는 다음과 같습니다.

- 서버에 요청을 시작합니다.
- 로컬 데이터베이스 편집
- 파일 시스템에 쓰기
- 로켓발사(?)

부작용(side effects)의 세계는 끝이 없으므로 Observable instance가 subscription 위에서 부작용을 수행하는지 여부를 결정해야합니다.

그것에 대해서 확신할수 없다면 더 많은 분석을 수행하거나 소스 코드를 자세히 살펴보십시오. 

매 구독마다 로켓을 발사하는것이 달성하려는 목표가 아닐수도 있습니다....

이것을 설명하는 또다른 일반적인 방법은 `Observable`이 side-effects를 공유하는지 여부를 묻는것 입니다. 

너가 subscription위에서 side-effects를 실행하는 경우 side-effects가 공유되지 않는다는것을 의미합니다.

그렇지 않은 경우에는 모든 side-effects가 subscribe에 공유됩니다. 

> 무슨말인지 잘모르겠지만. 구독할때 side-effect가 실행되지 않게한다면, 모든 side-effects가 구독하고있는 녀석에게 공유된다는 이야기 인것같음.(좀더 확인필요)

이것은 상당히 일반적인 규칙하며, `subject`와 관련하위 유형과 같은 `ObservableType`객체에 적용됩니다.

당연히 알아차렸듯이 우리는 책에서 hot observable, cold observable을 말하지 않았습니다. 

`reactive programming`에서 공통적인 주제이지만 `Rx`에서는 위의 스레드 예제와 같은 특정 경우에만 또는 테스트와 같이 더 강력한 제어가 필요한 경우에만 개념을 접하게 됩니다. 

해당 색션을 참조점으로 유지하십시오. 

혹독한 hot/cold observable에 관한 문제에 접근해야 할 경우에 대비하여 해당 시점으로 책을 열어 개념을 새로고침 할수 있습니다.

---

## Best practices and built-in schedulers

스케줄러는 중요한 항목이 아니기 때문에 가장 일반적인 사용 사례에 대한 몇가지 모범 사례가 제공됩니다. 

이 색션에서 `serial`, `concurrent schedulers`에 대해 간략하게 소개하고 데이터를 처리하는 방법을 배우며 특정 컨텍스트에 적합한 유형을 확인합니다. 

---

### Serial vs concureent schedulers 

스케줄러는 단순히(`a dispatch queue, thread or a custom context`)일수 있는 컨텍스트 이고 시퀀스를 변환하는 모든 연산자가 암묵적인 모장을 유지해야 한다는 점을 감안할때 올바른 스케쥴러를 사용하고 있는지 확인해야 합니다. 

- `serial scheduler`를 사용하는 경우 `Rx`는 연속적인 계산을 수행합니다. `serial dispatch queue`의 경우 `scheduler`는 자체 최적화를 수행할수도 있습니다. 

- `concurrent scheduler`의 경우 `Rx`는 코드를 동시에 실행하려고 시도하지만 `observeOn`과 `subscribeOn`은 작업을 실행해야 하는 순서를 보존하고 `구독 코드`가 올바른 스케줄러에서 종료되도록 합니다. 

---

### MainScheduler

`MainScheduler`는 Main Thread의 맨위에 위치 합니다. 

이 스케줄러는 사용자 인터페이스에서 변경 사항을 처리하고 다른 우선 순위가 높은 작업을 수행하는데 사용됩니다. 

일반적으로 iOS, tvOS 또는 macOS에서 응용 프로그램을 개발할때 이 스케줄러를 사용하여 장기 실행 작업을 수행해서는 안되기 때문에 서버 요청이나 기타 많은 작업과 같은것을 피하길 권장합니다.(UI가 멈추기 때문!)

또한 UI를 업데이트하는 부작용을 수행하는경우(if you perform side effects that update the ui) `MainScheduler`로 전환하여 업데이트가 화면에 표시되도록 해야합니다. 

`MainScheduler`는 Units을 사용할때 보다 구체적으로 `Driver`를 사용할때 모든 연산을 수행하는데에도 사용됩니다.

이전 장에서 설명한것처럼 `Driver`는 `MainScheduler`에서 항상 연산이 수행되도록 `보장하여` 데이터를 application의 사용자 인터페이스에 `직접 바인딩합니다`

---

### SerialDispatchQueueScheduler 

`serialDispatchQueueScheduler`는 `serial DispatchQueue`에서 작업을 추상화 합니다. 

`serialDispatchQueueScheduler`는 `observeOn`을 사용할때 여러 최적화의 큰 장점을 가지고 있습니다. 

`serialDispatchQueueScheduler`를 사용하여 `scheduled in a serial` 방식보다 잘 스케쥴된 백그라운드 작업을 처리할수 있습니다. 

예를들어 서버의 단일 끝점과 소통해야하는 경우(Firebase 또는 GraphQL application) 여러개의 동시 요청을 보내지 않으려는 경우 수신측에 많은 압력이 가해질수 있습니다.(엄청 많은 요청을 동시에 보내는게 아니라 queue에 넣고 하나씩 보내면 받을때 많은 작업을 받아서 부담된다는 뜻!)

`serialDispatchQueueScheduler`는 분명히 `serial task queue`와 같이 앞으로 나아가야하는 모든 작업에 대해 원하는 스케줄러입니다(?)

---

### ConcurrentDispatchQueueScheduler

`ConcurrentDispatchQueueScheduler`는 `SerialDispatchQueueScheduler`와 유사하게 `DispatchQueue`에서 추상 작업을 관리합니다. 

이번에 `serial queue`과 가장큰 차이점은 스케쥴러가 `동시에(concurrent)` 큐를 사용한다는 것입니다. 

이러한 종류의 스케줄러는 `observeOn`을 사용할때 최적화되지 않으므로 어떤 종류의 스케줄러를 사용할 것인지 결정할때 고려해야 합니다. 

`ConcurrentDispatchQueueScheduler`는 동시에 끝내야 하는 여러 장기 실행 테스크에 대한 좋은 옵션일수 있습니다.(용량이 많은 이미지5개를 한번에 보여줘야 할때 하나씩 하나씩 가져오면 모두 보여주기까지 오래걸림..)

여러개의 observables과 차단 연산자(blocking operator)를 결합하여 준비가되면 모든 결과가함께 결합되므로 `serial scheduler`가 최선을 다할수가 없습니다. 

대신 `concurrent scheduler`는 여러개의 동시 작업을 수행하고 결과들의 모임을 최적화 할수 있습니다. 

---

### OperationQueueScheduler

`OperationQueueScheduler`는 `ConcurrentDispatchQueueScheduler`와 유사하지만 `DispatchQueue`를 통해 작업을 추상화하는 대신 `NSOperationQueue`를 통해 작업을 수행합니다. 

실행중인 concurrent 작업이 더많은 제어가 필요할때가 있는데, `concurrent DispatchQueue`로는 수행할수 없는경우가 있습니다. 

concurrent 작업의 최대수를 미세조정해야하는 경우 `OperationQueueScheduler`에 사용될수 있는 `Scheduler`입니다. 

`macConcurrentOperationCount`를 정의하여 Application에 맞게 동시 작업 수를 제한할수 있습니다

---

### TestScheduler

`TestScheduler`는 특별한 종류의 짐승입니다. 테스팅에만 사용되는 것이므로 프로턱션 코드에서 이 스케쥴러를 사용하지 마십시오.

이 특별 스케줄러는 `operator testing`을 간소화합니다. 그것은 `RxTest` 라이브러리의 일부입니다. 

이 스케줄러에 대한 유용한 사용 사례는 `RxSwift`의 테스트 장에서 제공됩니다.

테스트하기 위한 전용 파일을 열고`Observable+TimeTest.swift`, `testDelaySubscription_TimeSpan_Simple` 이라는 단일 케이스를 검색하십시오.

이 테스트 케이스 안에는 스케줄러의 초기화가 있습니다. 

```swift
let scheduler = TestScheduler(initialClock: 0)
```

초기화 후 observable을 정의합니다.

```swift
let xs = scheduler.createColdObservable([
  next(50, 42),
  next(60, 43),
  completed(70)
])
```

예상한 값을 정의하기전에 결과를 얻는 방법에 대해서 선언합니다.

```swift
let res = scheduler.start {
  xs.delaySubscription(30, scheduler: scheduler)
}
```

`res`는 이전에 정의 된 `xs observable`을 사용하여 스케줄러에 의해 작성됩니다. 

이 결과에는 전송된 이벤트에 대한 모든 정보와 테스트 스케줄러가 추적한 시간이 포함됩니다. 

이것으로 테스트 케이스를 작성할수 있습니다.

```swift
XCTAssertEqual(res.events, [
  next(280, 42),
  next(290, 43),
  completed(300)
]
```

이벤트가 280에서 발생하는 이유가 궁금합니다(원래 50, 지연30을 고려한 경우). 이것은 `testScheduler`의 성격에 기인합니다. `testScheduler`는 200후에 `ColdObservable`에 대한 모든 구독을 시작합니다. 

이 트릭은 `col observable`이 `예측할수 없는 시간`에 시작되지 않도록 보장합니다.

같은일이 `HotObservable`에는 적용되지 않으므로 `HotObservable`은 즉시 이벤트를 시작합니다. 

`ddelaySubscription`연산자를 테스트할때 보낸 이벤트에 대한 정보와 시간만으로는 작업하기에 충분하지 않습니다. 모든 것이 예상대로 작동하는지 확인하려면 구독 시간에 대한 추가 정보가 필요합니다. 

`xs.subscriptions`를 사용하면 구독 목록을 가져와 최종 구독자를 만들수 있습니다. 

시험의 일부

```swift
XCTAssertEqual(xs.subscriptions, [
  Subscription(230, 300)
])
```

첫번째 숫자는 첫번째 구독의 시작 시간을 정의합니다. 두번째 인수는 구독이 처리될 시기를 정의합니다. 이경우 두번째 숫자는 완료되면 모든 구독을 처리하기 때문에 완료된 이벤트와 일치합니다.

---

## Where to go from here? 

스케줄러는 `Rx`에서 중요한 부분이 아닙니다. 그들은 `RxSwift`의 모든 작업을 계산하고 수행하는 일을 담당 합니다.

슽케줄러의 황금률은 무엇이든 될수 있다는 것입니다. 이를 염두에두면 observable로 작업하고 스케줄러를 사용하고 변경할때 잘 처리하면 됩니다.

앞에서 설명한 것처럼 스케줄러는 `DispatchQueue`, `NSOperationQueue`, `NSThread` 위에 앉아 있거나 현재 스레드에서 즉시 작업을 수행할수도 있습니다.

때로는 잘못된 스케줄러를 사용하면 성능에 부정적인 영향을 줄수 있지만 잘 선택된 스케줄러는 성능에 큰 도움을 줄수 있습니다. 

스케줄러를 이해하면 `RxSwift`를 사용하는것이 훨씬 쉬워지고 `subscribeOn`, `observeOn`을 사용할때 자신감이 향상 됩니다.

---

## Reference 

* 공식 

[http://reactivex.io](http://reactivex.io/documentation/ko/observable.html) <br> 
[Introduce to Rx](http://www.introtorx.com/Content/v1.0.10621.0/00_Foreword.html) <br>
[RxJS Marbles](http://rxmarbles.com/) <br>
[RxSwift github](https://github.com/ReactiveX/RxSwift) <br>
[http://community.rxswift.org/](http://community.rxswift.org/) <br>

* 개인 참조

[Swift 3.0 GCD](https://swifter.kr/2016/10/22/swift-3-0%EA%B8%B0%EB%B0%98-gcd-%EA%B8%B0%EC%B4%88/) <br>
[Dispatchqueue documentation](https://developer.apple.com/documentation/dispatch/dispatchqueue)<br>
[WWDC2016, Concurrent Programming With GCD in Swift 3](https://developer.apple.com/videos/play/wwdc2016/720/)<br>

* cold vs hot 

[RX API InDepth Hot and Cold Observables](https://www.youtube.com/watch?v=IDy21J75eyU)<br>
[https://brunch.co.kr/@tilltue/18](https://brunch.co.kr/@tilltue/18) <br>
[Hot And cold Obervable Documeatation 번역](http://minsone.github.io/programming/reactive-swift-hot-and-cold-observables)<br>
[Hot And Cold Observable Documentation](https://github.com/ReactiveX/RxSwift/blob/master/Documentation/HotAndColdObservables.md) <br>
[Unit Test 1 - 핫 옵저버블과 콜드 옵저버블](http://minsone.github.io/programming/reactive-swift-unit-test-1)
