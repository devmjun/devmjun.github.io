---
layout:     post
title:      "RxSwift. MVVM with RxSwift (15)"
subtitle:   "MVVM, view model"
date:       2018-03-20 18:01:00
author:     "MinJun"
header-img: "img/tags/RxSwift-bg.jpg"
comments: true 
tags: [RxSwift, RxCocoa]
---

Raywenderlich-Ebook의 RxSwift를 읽고 정리한 내용입니다.
아래 내용의 저작권과 이미지는 모두 [https:/www.raywenderlich.com/](https://www.raywenderlich.com/) 에 있습니다. 더 자세한 내용은 [여기서 책을 구입해주세요!](https://store.raywenderlich.com/products/rxswift)

---

## RxCommunity 기초 정리 (15) 

- Section VI: Putting it All together
- Chapter 23: MVVM with RxSwift 
- Introducing MVVM	
	- Some background on MVC 
	- MVVM to the rescue
	- What goes where
- Getting stated with Tweetie
	- Project structure 
	- Finishing up the network layer 
	- Adding a view model 
	- ~~Adding a view Model test~~
	- adding an iOS View Controller
	- ~~Adding a macOS View Controller~~
- Challenge 1: Toggle "Loading..."in members list 
	- Über challenge: Complete View Model and View Controller for the user’s timeline
- Reference

---

## Section VI: Putting it All together

이제 책의 `쉬운(?)`부분은 끝났습니다. `RxSwift`를 사용하여 프로덕션 응용 프로그램을 제작하기 위해 지금까지 이 기능을 배우고 더 많은것을 배우고 싶다면 이 섹션을 참조 하세요

이 섹션의 두장에서는 `RxSwift`로 실제 Application을 빌드하는 방법을 배우는데 도움을 줄것입니다.

첫 번째 장에서는 `MVVM`애플리케이션 아키텍처에 대해 설명하고 잘 설계된 `ViewModel`이 iOS 및 macOS 버전의 앱에 어떻게 영향을 줄수 있는지 보여줍니다. 

유연한 네트워킹 레이어를 구축하고 뷰 모델에 대한 테스트를 작성합니다. 

두번째 장과 이 책의 마지막 장에서 `MVVM`아키텍처에 대해 배운 내용을 토대로 다루고 화면(scene) 기반 navigation을 추가하여 확장합니다. 

이 섹션이 끝나면 `RxSwift`개발자 중 한명이 됩니다. 물론 `Rx`에 대해 더 많이 알게 될 것입니다. 그러나 이 시점에서 여러분은 더 많은 것들을 알아낼수 있을 것입니다.

또한 커뮤니티에 환원하는것을 잊지 마십시오, 우리가 모든 놀라운 `Rx`사람들이 지식, 코드 및 좋은 분위기를 공유하지 않고서는 이 책을 정리할수 없었을 것입니다. 

23장: RxSwift에 MVVM 사용 
24장: 완전한 RxSwift 응용 프로그램 만들기 

---

## Chapter 23: MVVM with RxSwift 

이 책에서 RxSwift의 아키텍처에 대해서 자세히 다루지 않았지만 큰 주제 입니다.

RxSwift는 `MVVM`과 매우 잘 작동합니다. 이 장에서 해당 아키텍처 패턴에 대해 설명합니다.

---

## Introducing MVVM 

`MVVM`은 `Model-View-ViewModel`의 약자 입니다. `Apple`의 구현과 약간 다릅니다.(선행으로 MVC 를알고 있어야 합니다)

열린 마음으로 `MVVM`에 접근하는것이 중요합니다. `MVVM`은 소프트웨어 아키텍처의 만병 통치약이 아닙니다. 

오히려 `MVVM`을 하나의 소프트웨어 패턴으로 생각하십시오. 이는 특히 `MVC` 마인드에서 시작하는 경우 좋은 애플리케이션 아키텍처를 향한 간단한 단계입니다. 

---

### Some background on MVC 

지금 까지 `MVVM`과 `MVC`사이에 약간의 긴장감을 느꼇을 것입니다. 

관계의 본질은 정확하게 무엇입니까? MVVM 과 MVC는 매우 유사하고 심지어 그들이 먼 사촌이라고 말할수도 있습니다. 그러나 그들은 충분히 다릅니다. 

이책의 예제(및 프로그래밍 관련 기타 책) 대부분은 코드 샘플에 MVC 패턴을 사용합니다. 

`MVC`는 많은 간단한 응용 프로그램에 대한 간단한 패턴이며 다음과 같습니다. <br>

<center><img src="/img/posts/RxSwiftWithMVVM.png" width="500" height="350"></center> <br> 

각 클래스에는 범주가 지정됩니다. `컨트롤러 클래스`는 `모델`과 `뷰`를 모두 업데이트할수 있으므로 중심 역활을 수행하며, `뷰`는 화면에 데이터만 표시하고 제스처와 같은 이벤트를 컨트롤러에 보냅니다.

마지막으로 모델은 앱 상태를 유지하기 위해 데이터를 읽고 씁니다. 

but as your app grows you will notice that a lot of classes are neither a view, nor a model, and must therefore be controllers. (MVC 문제점, 컨트롤러 비대)

`MVC`는 잠시 동안 당신을 지원할수 있는 간단한 패턴이지만 앱이 커질수록 많은 클래스가 뷰도 아니고 모델도 아니므로 컨트롤러 여야 합니다. 

일반적인 함정은 단일 컨트롤러 클래스에 점점 더 많은 코드를 추가하는 것입니다. 

iOS 앱에서 뷰 컨트롤러로 시작하기 때문에 가장 쉬운 방법은 모든 코드를 해당 뷰 컨트롤러 클래스에 채우는 것입니다. 

따라서 컨트롤러가 수백 또는 수천 줄까지 커질수 있기 때문에 `MVC`가 `Massive View Controller`를 의미하는 오래된 농담이 있습니다. 

클래스를 오버로딩 하는것은 나쁜습관일 뿐이고 MVC의 필수적인 결점은 아닙니다. 

> 애플의 많은 개발자들은 `MVC`의 팬이며, `MacOS`와 iOS 소프트웨어가 놀랍도록 잘 만들어진것입니다.
> 
> Note: MVC에 대해서 더 읽고 싶다면 다음의 문서를 참조하세요. [https://developer.apple.com/library/content/documentation/General/Conceptual/DevPedia-CocoaCore/MVC.html](https://developer.apple.com/library/content/documentation/General/Conceptual/DevPedia-CocoaCore/MVC.html)

---

### MVVM to the rescue

`MVVM`은 `MVC`와 비슷하지만 분명히 좋아 보입니다(?) `MVC`를 좋아하는 사람들은 일반적으로 `MVVM`을 좋아합니다. 

이 새로운 패턴은 `MVC`에 공통적인 많은 문제를 쉽게 해결할수 있기 때문입니다. 

`MVC`와 명백한 차이점은 `ViewModel`이라는 새로운 카테고리입니다. 

<center><img src="/img/posts/RxSwiftWithMVVM-1.png" width="500" height="350"></center> <br> 


`ViewModel`은 아키텍처에서 중심역할을 합니다. 비즈니스 로직을 처리하고 `Model` 과 `View`모두와 대화합니다. 

`MVVM`은 다음과 같은 간단한 규칙을 따릅니다. 

- `Models`은 데이터 변경에 대한 알림을 보낼수 있지만 다른 클래스와 직접 대와하지 않습니다. 
- `View Models`은 Models과 대화하고 data를 ViewController에 표시합니다. 
- `ViewController`는 뷰 생명 추기를 처리하고 데이터를 UI 구성요소에 바인딩할때만 `View Model` 및 `View`와 대화합니다.
- `Views`는 이벤트를 뷰컨트롤러에 알립니다(MVC 처럼)

잠깐, `MVC`컨트롤러가 수행한것과 정확히 똑같은 모델을 `View Model`이 수행하지 않습니까?... 예? -> 아니오..

앞에서 언급했듯이 공통적인 문제를 뷰컨트롤러 자체에서 뷰를 제어하지 않는 코드로 채우는 것입니다. 

`MVVM`은 `뷰컨트롤러를 뷰와 함께 그룹화하여` 이 문제를 해결하고 뷰를 제어하는 단독 책임을 할당하려고 합니다. 

`MVVM`의 또다른 장점은 코드의 테스트 가능성이 향상 된다는 것입니다. 

`뷰 라이프 사이클`을 `비즈니스 로직`과 분리하면 `뷰 컨트롤러`와 `뷰 모델` 모두를 매우 간단하게 테스트 할수 있습니다. 

마지막으로 뷰 모델은 `프리젠테이션 레이어`와 완전히 분리되어 있으며 필요한 경우 플랫폼간 재사용이 가능합니다.

`View`, `ViewController`쌍을 대체하고 iOS 에서 macOS 또는 tvOS로 응용 프로그램을 이동시킬수 있습니다. 

---

### What goes where 

하지만 `모든것이` `View Model` 클래스로 간다고 가정하면 안됩니다. 사실 코드를 세심하게 분리하고 책임을 할당하는 것은 개발자에게 달린 것입니다. 그러므로 데이터와 화면 사이의 두뇌 역활로써 `View Model`을 남겨 놓아야 합니다. 하지만 네트워킹, 네비게이션 캐시, 그리고 이와 같은 `역할`을 하는 부분은 다른 클래스로 분리해야 합니다.(만약 별개 클래스들이 `MVVM` 카테고리에 속하지 않는다면 어떻게 작업하나요? `MVVM`은 이런 상황에 대해 강제적인 규칙이 따로 없지만 어떻게 하는지 가르쳐줄것입니다.)

이 장에서 다룰 좋은 방법중 하나는 `View Model`이 `init`이나 추후 생명 주기 동안 필요로 할 모든 객체를 삽입하는 것입니다. 

즉 상태기반 API 클래스(stateful API Class)또는 지속 계층 객체(persistence layer object)와 같이 긴 수명을 가지는 객체를 `View Model`에서 다른 `View Model`로 전달할수 있습니다. 다음 그림을 참조하세요. <br>

<center><img src="/img/posts/RxSwiftWithMVVM-2.png" width="500" height="350"></center> <br> 


이 장의 프로젝트인 `Tweetie`인 경우, 인앱 네비게이션, 현재 로그인된 트위터 계정(TwitterAPI.AcountStatus)등등을 전달하는 법을 확인해볼수 있습니다.

이것이 유일한 `MVVM`의 이점 입니까? 이 패턴을 올바르게 사용하면 고전적인 `MVC`보다 더 많은 개선이 가능합니다.

- `View Controler`는 `View`를 제어(Control) 역할만 하기 때문에 훨씬 간단하고 실제 이름으로 사용되는 경향이 있습니다(목적성 뚜렷함). `MVVM`은 RxSwift / RxCocoa 에서 특히 잘 작동합니다. 이유는 `observable`이 UI 구성 요소에 바인딩하는것이 해당 패턴의 핵심 요소입니다. 
- `View Model`은 명확한 입력 -> 출력 패턴을 따르고 미리 예상된 값을 출력값으로 테스트하기 쉽습니다. 아래의 그림 참조 <br>

<center><img src="/img/posts/RxSwiftWithMVVM-3.png" width="500" height="350"></center> <br> 

- 예상되는 View Controller 상태를 테스트 하기 위해 모의 `View Model`을 생성하고 테스트할수 있습니다. 이 방법을 통해 `View Controller`를 시각적으로 테스트 하는것이 훨씬 쉬워 집니다.(궁금한점은 테스트 하기 위해 가짜 View Model을 만드는 이유가 뭘까?) <br>

<center><img src="/img/posts/RxSwiftWithMVVM-4.png" width="500" height="350"></center> <br> 

`MVVM`은 `MVC`와 크게 다르고 더 많은 소프트웨어 아키텍처 패턴을 탐색할수 있는 원동력이 됩니다. `MVVM`을 사용해보시겠습니까? 이 장을 통해 작업하면서 많은 이점을 확인할수 있습니다. 

---

## Getting stated with Tweetie

이 장에서 `Tweetie`라는 다중 플랫폼 프로젝트에 대해 작업 할것입니다. 매우 간단한 트위터 기반앱으로 미리 정의 된 사용자 목록을 사용하여 사용자에게 트윗을 표시합니다. 

기본적으로 스타터 프로젝트는 이 책의 모든 저자와 편집자를 포함하는 트위터 목록을 포함합니다. 원하는 경우 목록을 쉽게 변경하여 프로젝트를 스포츠, 글쓰기 또는 영화를 지향하는 앱으로 전활할수 있습니다. 

이 프로젝트는 `macOS` 및 `iOS` 대상을 가지고 있으며 `MVVM`패턴을 사용하여 실제 프로그래밍 작업을 많이 해결합니다. 

이미 시작 프로젝트에 많은 코드가 포함되어 있습니다. 우리는`MVVM`과 관련된 부분에만 집중할것입니다.

이장을 진행하면서 `MVVM`이 다음을 명확하게 구분하는 방법을 확인하게 됩니다. 

- iOS 용 UIKit을 사용하는 `View Controller` 및 `Cocoa`를 사용하는 별도의 `macOS` 전용 `View Controller`와 같이 UI와 관련이 있는 코드 및 플랫폼별 코드들
- `Model` 및 `view model`의 모든 코드와 같이 특정 플랫폼의 UI 프레임 워크에 의존하지 않기 때문에 그대로 재사용 되는 코드 

---

### Project structure 

프로젝트를 둘러보면 다음과 같은 폴더들을 확인할수 있습니다.

- `Common Classes`: `macOS`와 `iOS`간의 공유 코드입니다. `Rx Reachability` 확장, `UITableView`, `NSTableView`등의 확장이 포함됩니다.
- `Data Entities` 디스크에 데이터를 유지하기 위해 `Realm` 모바일 데이터 베이스와 함께 사용할 데이터 개체입니다.
- `TwitterAPI`: Twitter의 JSON API에 요청을 보내기 위한 Twitter API의 구현. `TwitterAccount`는 API에서 사용할 access token을 얻는 클래스 입니다. `TwitterAPI`는 웹 JSON에 대한 인증 요청을 만듭니다.
- `View Models`: 3개의 앱 view model이 있습니다. 하나는 이미 완전히 구현되어 있고 나머지 예제를 통해 두개를 직접 채워나갈 것입니다.
- `iOS Tweetie`: 스토리보드와 iOS View Controller를 포함하는 iOS 버전의 Tweetie를 가지고 있습니다. 
- `MAC Tweetie`: 스토리 보드와 asset, view controller를 포함하는 Mac 버전의 Tweetie를 가지고 있습니다.
- `TweetieTests`: 테스트와 모의 객체들이 있는곳

> Note: 이 장의 challenge 까지 다 풀어야만 테스트가 가능합니다.  

목표는 앱을 완성하여 사용자가 목록의 모든 트윗을 볼수 있도록 하는것입니다. `네트워크 레이어 완성` -> `view model 클래스` -> 2개 view controller(iOS, macOS) 생성의 순서대로 진행 될것입니다. <br>

<center><img src="/img/posts/RxSwiftWithMVVM-5.png" width="500" height="350"></center> <br> 

여러가지 다른 수업을 듣고 `MVVM`을 경험할수 있습니다.

---

### Finishing up the network layer 

- Twitter API에 엑세스 하기
	- 트위터 계정만들기 -> 친구추가 -> Twitter API 사용을 위한 작업 
	- 디바이스로 한다면, 디바이스 내에 트위터 계정 엑세스 권한을 발행 해주어야합니다. 트위터 디벨롭에서 사용 토큰도 받아야합니다!
 
프로젝트에 이미 많은 코드가 포함되어 있습니다. observable 대상을 설정하고, 컨트롤러를 보는것같은작업은 하지 않습니다. 먼저 프로젝트 네트워킹을 완료하세요 

`TimelineFetcher.swift`의 `TimelineFetcher`클래스는 앱이 연결된 상태에서 최신 트윗을 자동으로 다시 가져와야합니다.

이 클래스는 매우 간단하며 `Rx timer`를 사용하여 웹에서 `JSON`을 가져오는 구독을 반복적으로 호출합니다. 

`TimelineFetcher`는 두 편의 초기화를 제공합니다. 하나는 주어진 트위터 목록에서 트윗을 가져오고, 다른 하나는 주어진 사용자의 트윗을 가져오는 것입니다. 

이 섹션에서는 웹 요청을 하고 `Tweet`객체에 응답을 매핑하는 코드를 추가합니다. 이 책에서 이미 다루었던 내용이므로 모든 코드는 `Tweet.swift`에 포함시켰습니다.

> Note: 종종 `MVVM` 프로젝트에서 작업할떄 네트워킹을 추가할 위치를 묻습니다. 그래서 우리는 이장을 구성하여 직접 네트워킹을 추가할수 있는 기회를 제공했습니다. 
> 네트워킹에 대해 혼란스러운 것은 없습니다. `view model`에 삽입하는 정규 클래스 입니다.

`TitmelineFetcher.swift`에서 `init(account: jsonProvider:)`의 맨아래로 스크롤하여 다음행을 찾으세요

```swift
timeline = Observable<[Tweet]>.never()
```

해당 행을 다음과 같이 바꾸세요

```swift
timeline = reachableTimerWithAccount
  .withLatestFrom(feedCursor.asObservable(), resultSelector:
  { account, cursor in
    return (account: account, cursor: cursor)
  })
```

`timer observable`인 `reachableTimerWithAccount`와 `feedCursor`를 병합했습니다. `feedCursor`은 지금은 아무행동도 하지 않습니다. 하지만 `Variable`을 이용하여 트위터 타임라인에 현재 위치를 저장한뒤 이미 가져온 트윗을 나타내게 될것입니다. 

아래에 다음코드를 추가합니다.

```swift
.flatMapLatest(jsonProvider)
.map(Tweet.unboxMany)
.shareReplayLatestWhileConnected()
```

메소드 매개변수인 `jsonProvider`를 `flatmapping`해야 합니다. `jsonProvider`는 `init`에 삽입된 클로저 입니다. 각각 `convinience init`은 서로 다른 API지점에서 불러오기는 지원합니다. 

따라서 `JsonProvider`를 삽입하는 것은 메인 초기화(init(account:jsonProvider:))에서 if 문이나 가지치기 로직은 작성하지 않아도 되는 손쉬운 방법입니다. 

`JsonProvider`는 `OBservable<[JSONObject]>`를 반환합니다. 따라서 다음에 할 일은 `Observable<[Tweet]>`으로 매핑하는것 입니다. 예제 에서 제공된 `Tweet.unboxMany`함수를 이용할수 있습니다. 이 함수는 `JSON`객체를 `Array<Tweet>`으로 변환 해주는 역할을 합니다.

이 몇줄의 코드를 통해 이미 트윗을 불러올 준비는 끝낫습니다. `timeline`은 `public observable` 이기 때문에 해당 `view model`은 가장 최근의 트윗 리스트에 엑세스 할것입니다. 앱의 `view model`의 역할은 트윗들을 디스크에 저장하거나 앱의 `UI drive`로 사용되는게 전부입니다. `TimelineFetcher`는 트윗들을 간단히 불러오고 결과를 내보냅니다. <br>

<center><img src="/img/posts/RxSwiftWithMVVM-6.png" width="500" height="350"></center> <br> 

이 구독이 반복해서 호출되면 같은 트윗을 계속해서 불러오지 않기 위해 현재위치(또는 커서)를 저장할해야합니다. 이를 위해 아래의 코드를 추가합니다.

```swift
timeline
  .scan(.none, accumulator: TimelineFetcher.currentCursor)
  .bindTo(feedCursor)
  .addDisposableTo(bag)
```

`feedCursor`는 `Variable<TimelineCursor>` 타입의 `TimelineFetcher` 속성입니다.

`TimelineCursor`는 지금까지 불러온 가장 오래된 트윗과 가장 최근의 트윗의 ID들을 가지고 있는 custom struct입니다. 이 코드에서는 scan을 통해서 ID들을 트래킹 하고 있습니다.

새로운 트윗 묶음을 가지고 올 때마다 `feedCursor`의 값을 업데이트 하게 됩니다. 만약 타임라인 커서 업데이트에 대한 로직이 궁금하다면 `TimelineFetcher.currentCursor()`를 살펴보면 좋습니다.

> Note: `Twitter API`에만 해당되므로 커서 로직에 대해서는 자세히 다루지 않습니다. 자세한 내용은 [https://dev.twitter.com/overview/api/cursoring](https://dev.twitter.com/overview/api/cursoring)를 참조하세요.

다음으로 `view model`을 생성해야 합니다. 완성된 `TimelineFetcher` 클래스를 사용하여 `API`에서 최신 트윗을 가져옵니다. 

---

### Adding a view model 

여기서는 `controller`에 대해 신경쓸 필요가 없습니다. `View Model`폴더의 `ListTimelinViewModel.swift`를 엽니다. 이름에서 추측할수 있듯이 이 `view model`은 주어진 사용자 리스트의 트윗을 긁어 옵니다. 

다음 3가지 섹션을 정의하기에 좋은 연습이 됩니다.

- `init`: 모든 디팬던시(`dependency)`삽입을 수행하는 하나 이상의 `inits`를 정의합니다
- `input`: view controller가 input을 제공할수 있게, 일반적인 변수들 또는 `RxSwift subject`들과 같은 public 프로퍼티들을 포함합니다. 
- `Output`: view model에 output을 제공하는 모든 프로퍼티(보통은 observable)을 포함합니다. 이들은 보통 table/collection view 에 `drive`할 객체의 목록이거나, view controller가 앱의 UI에 드라이브할때 사용할 다른 타입의 데이터들 입니다. <br>

<center><img src="/img/posts/RxSwiftWithMVVM-7.png" width="500" height="350"></center> <br> 

`ListTimelineViewModel`은 `fetcher`프로퍼티를 가지는 자신의 `init` 내부에 이미 일부 코드가 구현되어 있습니다. `fetcher`는 트윗을 긁어오는 `TimelineFetcher`의 인스턴스 입니다. 

`view model`에 속성을 추가할 시간입니다. 먼저 입력 또는 출력이 다음 두 속성을 추가하세요. 단순히 주입된 종속성을 유지하는데 도움이 됩니다. 

```swift
let list: ListIdentifier
let account: Driver<TwitterAccount.AccountStatus>
```

그것들은 상수이기 때문에 초기화 할수 있는 유일한 기회는 `init(account:list:apiType)` 입니다.

initializer 상단에 아래 코드를 추가합니다.

```swift
self.account = account
self.list = list
```

이제 입력 속성을 추가할수 있습니다. 하지만 클래스의 모든 종속성을 이미 주입했으므로 어떤 속성이 있어야합니까?

주입된 종속성과 `init`에서 제공하는 매개변수를 사용하면 초기화시 입력을 제공할수 있습니다.

다른 `public`속성을 사용하면 평생 동안 언제든지 view model에 입력을 제공할수 있습니다. 

예를 들어 사용자가 데이터 베이스를 검색할수 있게 하는 앱을 생각해보세요. 검색 텍스트 필드를 뷰 모델의 입력 속성에 바인딩합니다. 

검색 용어가 변경되면 뷰 모델은 데이터베이스를 검색하고 그에 따라 출력을 변경하며 결과르 표시하기 위해 테이블뷰에 바인딩 됩니다.

이 예제에서 `view model`은 `TimelineFetcher`클래스를 멈추고 재개시킬 객체라는 유일한 인풋을 가지게 될것입니다. `TimelineFetcher`는 이미 `Variabble<Bool>`을 사용하므로 `view model`프록시 설정만 필요합니다.(??)

아래 코드를 `// MARK: - Input:`이라 표시된곳의 `ListTimelineViewModel`에 추가합니다.

```swift
var paused: Bool = false {
     didSet {
         fetcher.paused.value = paused
     }
 }
```

이 프로퍼티는 `fetcher`클래스의 `paused`값을 `set`하는 프록시 입니다.

`view model`은 긁어온 트윗 목록과 로그인 상태를 내보내게 될 것입니다. 긁어온 트윗 목록은 `Variable<Tweet>`의 형태로 `Realm`에서 불러올 것입니다. 현재 사용자가 트위터에 로그인했는지 여부는 `Driver<Bool>`을 통해 `false`또는 `true`를 방출하게 될것입니다. 

`output`섹션에 다음 두개의 프로퍼티를 삽입합니다.

```swift
private(set) var tweets: Observable<(AnyRealmCollection<Tweet>, RealmChangeset?)>!
private(set) var loggedIn: Driver<Bool>!
```

`tweet`은 가장 최근의 `Tweet`객체 목록을 가집니다. 어떤 트윗도 로드되기 전 상태, 예를 들어 로그인 이전 단계에서 기본값은 `nil`입니다. `loggedIn`은 추후 초기화할 `Driver`입니다. 

이제 `TimelineFetcher`의 결과를 구독할수 있고, 트윗들을 `Realm`에 저장할수 있습니다. 다음코드를 `init(account:list:apiType:)`에 추가합니다.

```swift
fetcher.timeline
     .subscribe(Realm.rx.add(update: true))
     .disposed(by: bag)
```

이를통해 `fetcher.timeline` 타입의 `Observalbe>[Tweet]>`을 구독하게 되고, 결과값(트윗 array)을 `Realm.rx.add(update:)`에 바인딩 하였습니다.

`Realm.rx.add`는 들어온 객체들을 앱의 기본 `Realm`데이터 베이스테 유지합니다.

지금 까지 코드는 `view model`의 데이터 유입을 처리합니다. 따라서 남은 작업은 `view model`의 output을 만드는 것입니다. 다음 코드를 `bindOutput`메소드 내에 삽입합니다. 

```swift
guard let realm = try? Realm() else { return }
 tweets = Observable.changeset(from: realm.objects(Tweet.self))
```

`RxRealm`에서 배운것처럼, `Realm`의 `Results`클래스를 통해 쉽게 `observable seqeunce`를 만들수 있습니다. `tweet observable`을 `view controller`처럼 필요한 곳에 방출 시킬수 있습니다. 

다음으로 할일은 `loggedIn` `output`프로퍼티를 관리하는 것입니다. 이 작업은 상당히쉽습니다. `account`를 구독하고, 이 녀석의 요소(`true 또는 false`)를 매핑하는것입니다. 다음 코드를 `bindOutput`에 추가합니다.

```swift
loggedIn = accout
     .map { status in
         switch status {
         case .unavailable: return false
         case .authorized: return true
         }
     }
     .asDriver(onErrorJustReturn: false)
```

여기까지가 `view model`에서 필요한 작업의 전부 입니다. 모든 디팬던시들을 `init`에 삽입했고, 다른 클래스가 `input`을 할수 있도록 몇가지 프로퍼티를 추가했으며 `view model`의 결과들을 다른 클래스에서 관찰할수 있도록 public 프로퍼티를 추가했습니다.

지금까지의 작업을 통해서 확인할수 있듯이 view model은 자신의 초기화 함수에 삽입되지 않았다면, 어떠한 view controller, view 또는 또 다른 클래스에 대해서도 알지 못합니다. 

---

### Adding a view Model test 

추후 다시 돌아와서 추가할 예정 

---


### adding an iOS View Controller

여기서는 작성한 `view model`의 `output`을 `ListTimelineViewController`내의 view 들에 연결하는 코드를 작성할것입니다. 이 controller는 사용자 리스트의 트윗 조합들을 화면에 표시할것입니다.

`iOS Tweetie/View Controller/List Timeline`폴더 내에서 view controller와 iOS에 특화된 table cell view 파일들을 확인할수 있습니다. `ListTimelineViewcontroller.swift`

`ListTimelineViewController` 클래스에는 view model 프로퍼티와 `Navigator`프로퍼티가 있습니다. 

두 클래스는 모두`createWith(navigator:stroyboard:viewModel)`이라는 `static factory`메소드를 통해 삽입됩니다.

이제 두 세트의 셋업 코드를 `view controler`에 추가하게 될 것입니다. 하나는 `viwDidLoad()`에 정적할당(static assignments)가 될것이고, 다른 하나는 `bindUI()`내에서 view model 과 UI를 바인딩하는 코드가 될것입니다.

다음 코드를 `viewDiLoad()`내 `bindUI()`를 호출하기 이전에 추가합니다.

```swift
title = "@\(viewModel.list.username)/\(viewModel.list.slug)"
navigationItem.rightBarButtonItem =
UIBarButtonItem(barButtonSystemItem: .bookmarks, target: nil, action:
nil)
```

이 코드는 목록명의 타이틀과 네비게이션바 우상단 버튼을 셋팅하는 역활을 합니다.

다음은 `view model`을 바인딩할 차례입니다. 다음코드를 `bindUI()`내부에 삽입합니다.

```swift
navigationItem.rightBarButtonItem!.rx.tap
     .throttle(0.5, scheduler: MainScheduler.instance)
     .subscribe(onNext: { [weak self] _ in
         guard let this = self else { return }
         this.navigator.show(segue: .listPeople(this.viewModel.account, this.viewModel.list), sender: this)
     })
     .disposed(by: bag)
```

우측 바 아이템 탭을 구독하면서, 더블탭은 막는 코드를 작성합니다. 그리고 `navigator`프로퍼티의 `show(seqeu:sender:)` 메소드를 호출하여 화면에 `segue`를 표시할수 있도록 합니다. `segue`는 선택된 사용자 목록에 잇는 사람들을 보여주게 됩니다. 

`Navigator`는 요청한 화면을 띄우거나 내리는 것을 관리하는 녀석입니다. 

`table view`에 가장 최근의 트윗을 보여주기 위해 또 다른 바인딩 생성이 필요합니다. 파일의 상단으로 이동하여 다음 라이브러리를 추가합니다.

```swift
import RxRealmDataSources
``` 

그리고 `bindUI()`로 돌아가서 다음 코드를 추가합니다.

```swift
let dataSource = RxTableViewRealmDataSource<Tweet>(cellIdentifier:
  "TweetCellView", cellType: TweetCellView.self) { cell, _, tweet in
    cell.update(with: tweet)
}
```

`dataSource`는 table view data source로, 특히 table view Realm collection 변화를 방출하는 observable로 `drive`할때 유용합니다. 단 한줄의 코드로 `data source`를 완전히 구성할수 있습니다.

1. `Tweet` 타입의 model을 셋팅합니다.
2. 그리고 `tweetCellView`를 cell의 identifier로 설정합니다.
3. 각각의 셀이 화면에 나타나기 전 구성될수 있도록 하는 클로저를 완성합니다.

이제 `data source`를 `view controller`의 `table view`와 바인드 할수 있습니다. 아래의 코드를 마지막 블록아래에 추가합니다. 

```swift
viewModel.tweets
     .bind(to: tableView.rx.realmChanges(dataSource))
     .disposed(by: bag)
```

이로써 `viewModel.tweets`는 `realmChanges`와 바인딩 되었고 이미 구성된 `data source`를 제공합니다.

이 view controller에 해줄 마지막 바인딩 작업은 사용자의 트위터 로그인 여부에 따라서 메세지를 표시하거나 숨기는 역할을 위한 것입니다. 다음 코드를 추가합니다.

```swift
viewModel.loggedIn
     .drive(messageView.rx.isHidden)
     .disposed(by: bag)
```

다음 섹션에서는 플랫폼간에 뷰 모델을 다시 사용하는것이 얼마나 쉬운지 배웁니다. 

---

### Adding a macOS View Controller 

추후에 다시 작성할 예정

---

## Challenge 1: Toggle "Loading..."in members list 

사용자 목록 화면에서, Loading... 라벨이 항상 띄워져 있다. 이 라벨은 로딩상황에서는 현재 상태 파악을 위한 좋은 방법이 되지만, 사실 서버에서 JSON 긁어오기를 하는 동안에만 보여주는것이 정상입니다.

다음과 같은 과정을 통해서 해결할수 있습니다.

먼저 `ListPropleViewController.swift`를 엽니다. `bindUI()`에서 `viewModel.people`을 구독합니다.

이를 먼저 `Driver`로 변환한뒤 요소들을 `true` 및 `false`로 매핑합니다 

`messageView.rx.isHidden`을 `Driver<Bool>`결과값과 drive합니다. 

```swift
viewModel.people
 	 .asDriver()
	 .map { $0 != nil }
	 .drive(messageView.rx.isHidden)
	 .disposed(by: bag)
```

---

## Über challenge: Complete View Model and View Controller for the user’s timeline

여전히 앱이 완전하지 않습니다. 사용자 목록상의 사용자를 선택하면 빈 view controller가 나타나는 것을 알수 있습니다. 따라서 여기서의 과제는 특정 사용자를 선택하면 해당 사용자의 개인 트위터를 보여주는 것입니다. 

다음과 같은 과정을 통해서 해결할수 있습니다.

`PersonTimelineViewModel.swift`를 열고 `tweet`이라는 이름의 프로퍼티를 찾아봅니다. 이녀석을 `lazy var`로 변경하고 다음 코드를 초기화하는데 사용합ㄴ디ㅏ.

```swift
 public lazy var tweets: Driver<[Tweet]> = {
     return self.fetcher.timeline
         .asDriver(onErrorJustReturn: [])
         .scan([], accumulator: { lastList, newList in
             return newList + lastList
         })
 }()
```

이 코드를 통해서 `TimelineFetcher`인스턴스를 구독하고 리스트의 모든 방출 트윗을 취합할수 있습니다.

`PersonTimlineViewController.swift`의 `bindUI()`로 가서 `viewModel.tweets`에 두개의 구독을 추가합니다.

- 첫번쨰 구독: view controller의 `rx.title`을 driver 합니다. (`viewModel`에 서의) 사용자명과함께 트윗들을 가져와 하면에 나타나기 전까지 `Non found`를 표시합니다.
- 두번쨰 구독: 제골된 `createTweetsDataSource()`를 사용하여 `data source`객체를 가집니다. 그리고 트윗들을 `tweetSection`에 매핑합니다. 이부분이 어려우면 `RxDataSource`장을 살펴봅니다. 그리고 table을 `drive`합니다

```swift
func bindUI() {
// 첫 번째 구독
let titleWhenLoaded = "@\(viewModel.username)"
viewModel.tweets
    .map { tweets in
        return tweets.count == 0 ? "None found" : titleWhenLoaded
}
    .drive(rx.title)
    .disposed(by: bag)
    
// 두 번째 구독
let dataSource = createTweetsDataSource()
viewModel.tweets
    .map { return [TweetSection(model: "Tweets", items: $0)]}
    .drive(tableView.rx.items(dataSource: dataSource))
    .disposed(by: bag)
```

---

## Reference 

* 공식 

[http://reactivex.io](http://reactivex.io/documentation/ko/observable.html) <br> 
[Introduce to Rx](http://www.introtorx.com/Content/v1.0.10621.0/00_Foreword.html) <br>
[RxJS Marbles](http://rxmarbles.com/) <br>
[RxSwift github](https://github.com/ReactiveX/RxSwift) <br>
[http://community.rxswift.org/](http://community.rxswift.org/) <br>
