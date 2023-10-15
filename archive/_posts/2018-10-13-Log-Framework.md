---
layout:     post
title:      "Swift. Logging FrameWork Beaver."
subtitle:   "SwiftyBeaver 사용법을 알아봅니다."
date:       2018-10-13 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich, Log]
categories: archive
permalink: /archive/:title
---

[SwiftyBeaver Tutorial for iOS: A Logging Platform for Swift](https://www.raywenderlich.com/669-swiftybeaver-tutorial-for-ios-a-logging-platform-for-swift)에서 필요한 부분을 의역 했습니다. 

---

## Table of contents 

  - [<U>SwiftyBeaver Tutorial for iOS: A Logging Platform for Swift</U>](#section-id-16)
  - [<U>Getting Started</U>](#section-id-37)
  - [<U>Using The Starter App</U>](#section-id-60)
  - [<U>Installing SwiftyBeaver</U>](#section-id-96)
  - [<U>Writing Your First Logs With SwiftyBeaver</U>](#section-id-120)
  - [<U>A Brief Explanation of Log Levels</U>](#section-id-155)
  - [<U>How to Write to Different Log Levels With SwiftyBeaver</U>](#section-id-175)
  - [<U>Setting Up The SwiftyBeaver Crypto Cloud</U>](#section-id-195)
  - [<U>Filtering Logs By Log Level, Favorites, and Minimum Log Levels</U>](#section-id-241)
  - [<U>Filtering Logs With Minimum Log Levels</U>](#section-id-251)
  - [<U>Fixing Hard-to-Reach Bugs</U>](#section-id-289)
  - [<U>Simulating a Bug(번역X)</U>](#section-id-299)
  - [<U>Where to Go From Here?</U>](#section-id-306)
  - [<U>Reference</U>](#section-id-316)

---

<div id='section-id-16'/>

## SwiftyBeaver Tutorial for iOS: A Logging Platform for Swift

이 튜토리얼에서, iOS앱에 SwifyBeaver logging을  어떻게 통합하는지 배우게 됩니다.

다른 버그들은 더 사납습니다. 뒤에 숨어 있고 예상치 않을때 발생합니다. 

이 튜토리얼에서, 배후에 있는 사나운 버그들을 제거할수 있는 비밀 무기를 발견 할수 있습니다. 이 무기가 적절하게 사용되면, 앱의 어두운 부분에 손전등을 비추는 것과 같습니다. 

그 무기는 iOS, macOS를 위한 스위프트 기반 로깅 프레임 워크인 [SwifyBeaver](https://swiftybeaver.com/) 입니다.

이 튜토리얼에서 SwiftyBeaver을 사용하여 디버깅하는 방법을 배우고 다음 기술들을 익히게 됩니다.

- SwiftyBeaver logging은 `print()` 와 `NSLog()`보다 좋을때 
- 암호화된 클라우드에 있는 SwiftyBeaver log에 접근하는 방법
- 다른 로그 메시지 타입에 대한 로그 레벨을 사용하는 방법 
- 버그를 쉽게 잡기위해 로그를 필터링 하는 방법 

> Note: 이 튜토리얼을 시작하기전에, [CocoaPods](https://www.raywenderlich.com/626-cocoapods-tutorial-for-swift-getting-started)와 [CoreLocation framework](https://www.raywenderlich.com/1468-routing-with-mapkit-and-core-location)와 친숙해야합니다. 링크된 자습서에서 대강의 기술을 익혀야합니다.

---

<div id='section-id-37'/>

## Getting Started

[여기](https://koenig-media.raywenderlich.com/uploads/2017/03/TenPM-starter-1.zip)에서 시작 프로젝트를 다운 받습니다. 여기에는 이 튜토리얼은 완성하기 위한 파일과 아트워크가 들어 있습니다.

나의 자녀를 추적하는 앱을 만들것입니다. 자녀들이 집에서 너무 멀리 떨어져 있으면 앱이 안전 구역에 머물도록 경고합니다. 

80년대에 유명한 공익 광고 발표 이후 이것은 `Ten PM`(자녀들의 위치를 알고 있나요?)이라고 불렸습니다. 

`TenPM.xcworkspace`를 열고 프로젝트를 둘러보세요. `Main.stroyboard`를 열고 네비게이션 컨트롤러 내에 두개의 뷰 컨트롤러가 나타납니다.


![](/img/posts/beaver-0.png)

왼쪽의 뷰 컨트롤러는 부모가 앱에게 `집`이 어디에 있는지 알려주고 자녀가 돌아다닐수 있는 최대 거리를 지정하는데 사용할수 있습니다. backing class는 `TrackingSetupViewController` 입니다. 이 뷰 컨트롤러는 위치 추적 인증(location tracking authorization), 공간상의 거리(geofencing)를 위해 입력한 거리를 저장합니다. 

오른쪽의 뷰 컨트롤러는 아이들이 사용할 뷰 컨트롤러 입니다. 안전 구역을 표시하는 녹색원이 표시된 지도를 보여줍니다. 또한 아래의 텍스트는 현재 안전 구역이 아니라면 알려줍니다. backing class인 TrackingViewController는 자식들이 돌아다닐수 있는 안전 구역을 `MKMapView`에 겹쳐서 그립니다. 

아래는 몇가지 다른 참고 파일들입니다.

- `LocationTracker.swift`: Core Location Manger's delegate로 행동합니다. 위치를 업데이트하고 허가 변경을 처리합니다. 
- `ParentProfile.swift`: 중요한 유저 데이터를 `NSUserDefaults`에 저장합니다. 부모의 집 위치와 자식들이 돌아다닐수 있는 거리를 저장합니다. 

---

<div id='section-id-60'/>

## Using The Starter App 

Ten PM 앱을 iOS 시뮬레이터에서 빌드하고 실행합니다. `TrackingSetupViewController`가 컨트롤하는 뷰를 볼수 있습니다. 

<center><img src="/img/posts/beaver-1.png" width="450"></center> <br> 


추적을 설정하기 전에 시뮬레이터가 시작 위치를 제공하는지 확인해야합니다. 이것을 하려면 시뮬레이터를 선택하고 `Debug\Location\Apple`을 선택하세요.

<center><img src="/img/posts/beaver-2.png" width="450"></center> <br> 


`SETUP TRACKING` 버튼을 탭하면, 위치 데이터 수집을 시작하기 위한 허가를 요청합니다. 왜냐하면 이 화면은 부모를 위한 화면이고, 부모임을 확인하고 집에 있음을 확인하는 추가 얼럿이 있습니다. `예`를 선택하고 허용하세요. 앱이 위치를 결정하고 집 주소를 자녀의 안전 구역 서클의 중심점으로 사용하도록 저장합니다.

집에서의 `안전 거리`를 위해 `1`을 입력 입력하세요. 실험을 위해 설정된 Apple 위치에서 1 킬로미터 이상 떨어지길 원하지 않는다는 의미입니다.

<center><img src="/img/posts/beaver-3.png" width="450"></center> <br> 

`NEXT`를 텝하면 TrackingViewController가 지원하는 뷰로 이동합니다. 

<center><img src="/img/posts/beaver-4.png" width="450"></center> <br> 


> 생각해보니, 이 앱은 값비싼 iPhone 프로토타입을 가지고 다니는 직원에게 유용할수 있습니다(ㅋㅋ)

이제 모든 것이 준비 되었습니다. 2011년이라고 가정하고 iPhone 4 프로토타입을 가지고 산책을 합니다. 안전지대 밖에서 기자와 만나기로한 새로운 모의 위치를 설정합니다.

시뮬레이터 메뉴에서 `Debug\Location`을 이동하여 `Custom Location`을 클릭하고 `latitude: 37.3397`, `longitutd: -122.0426`을 입력하고 확인을 누릅니다.


<center><img src="/img/posts/beaver-5.png" width="450"></center> <br> 

파란색 점이 새 위치로 이동해야 하며 아래쪽의 메시지가 집에서 멀리떨어져서 위험하다고 알려주도록 변경되어야 합니다. 

Ten PM의 기능에 기본 설명입니다. 이것은 쉽게 확장할수 있는 간단한 앱입니다. 자녀가 안전지대 밖으로 나가면 부모에게 알람을 보내기를 시작할수 있습니다. 

하지만, 오늘은 그렇게 하지 않습니다. 대신에, 이 앱을 사용하여 `SwifyBeaver`의 도움을 받아 수정할수 있는 숨어있는 버그를 실험합니다.

---

<div id='section-id-96'/>

## Installing SwiftyBeaver

먼저 SwifyBeaver를 CocoaPod를 통해서 설치합니다.

```ruby
// 1
pod 'SwiftyBeaver'

// 2
pod install
```

SwiftyBeaver설치가 완료된 후에, `AppDelegate.swift`를 열고, import아래에 다음 코드를 추가합니다.

```swift
import SwiftyBeaver
```

프로젝트를 빌드하고 프로젝트가 성공적으로 컴파일되면 SwiftyBeaver를 프로젝트에서 사용할수 있습니다.

> Note: 이 설치 가이드는 CocoaPods 와 Swift3에서만 작동합니다. 자세한 설치 지침은 [SwiftyBeaver Github](https://github.com/SwiftyBeaver/SwiftyBeaver) 저장소 페이지에서 확인할수 있습니다. 

---

<div id='section-id-120'/>

## Writing Your First Logs With SwiftyBeaver

코드 작성할 준비가 되셨나요?

AppDelegate.swift를 다시보십시오. SwiftyBeaver의 logging을 설정할것입니다. 시작 프로젝트에서 제공하는 뼈대를 알아 차렸나요? 

`setupSwiftyBeaverLogging()`은 애플리케이션이 시작될때마다 호출되며, 이름에서 알수 있듯이 SwiftyBeaver를 준비합니다. 해당 메소드로 이동하여 다음을 추가하세요

```swift
let console = ConsoleDestination()
SwiftyBeaver.addDestination(console)
```

SwiftyBeaver은 일반적인 로깅툴이 아닙니다. 사용자에게 필요에 맞게 구성할수 있는 `Destinations`이라고 불리우는 여러 입력들이 있습니다. Destination은 로그가 표시되는 위치는 정의합니다.

`ConsolDestination()`은 `Console Destination`을 생하고, ConsolDestination()는 활동하는 SwiftyBeaver destination으로서 추가합니다. 생성하는 어떤 로그 메시지도 콘솔에 `print()`와 마찬가지로 콘솔에 표시됩니다.

`application(_:didFinishLaunchingWithOptions:)`에서 `setupSwiftyBeaverLogging`이후에 다음 코드를 추가합니다.

```swift
SwiftyBeaver.info("Hello SwiftyBeaver Logging!")
```

앱이 시작했을때 콘솔에 info 수준 로그가 출력됩니다. 잠시후에 로그 수준(log level)에 대해 더 알아볼것입니다.

Ten PM 을 다시 빌드하고 실행합니다. 콘솔을 확인하면 다음 메시지를 볼수 있을것입니다.

```swift
12:06:05.402 💙 INFO AppDelegate.application():36 - Hello SwiftyBeaver Logging!
```

멋집니다. 이제 SwiftyBeaver로 콘솔에 로그를 기록합니다. 핵심은 로그 수준 과 관계되어 있고, 아래에서 설명합니다.

---

<div id='section-id-155'/>

## A Brief Explanation of Log Levels

이 시점에서 SwiftyBeaver가 직관적인 `log()`, `print()` 대신에 `info()`메소드를 사용하게 하는지 궁금할것입니다. 

이것은 `Log Levels`과 관련이 있습니다. 

기록하는 모든것이 똑같이 중요하지는 않습니다. 어떤 로그는 추가적인 문맥정보를 프로그래머에게 주기위해 유용합니다. 다른 로그는 에러와 위험과같은 더 중요한 이슈를 전달합니다.

로그파일을 읽을때, 애플리케이션과 관련된 위험 수준에 따라서 분류된 로그메시지를 갖는다면 특히 유용합니다. 중요도가 낮은 메시지를 빠르게 필터링하여 버그를 빠르게 고칠수 있게 도와줍니다. 

SwiftyBeaver은 로그 수준 규약을 지키고 5개의 로그 수준을 체택합니다(SwiftyBeaver sticks to log lever conventions and adopts these five log levels)

- `Verbose`: 가장 낮은 우선수위 레벨. 맥락 관련정보를 위해 사용하세요
- `Debug`: 다양한 출력을 위해 사용하고 버그를 고치고 문제를 해결하는걸 도와주기 위한 결과로 사용합니다.
- `Info`: 보통 일반적인 지원 컨텍스트에서 유용한 정보로 사용됩니다. 즉, 비 개발자가 문제를 조사할때 유용합니다.
- `Warning`: 반드시 문제를 일으키는건 아니지만, 앱을 문제가 발생하는 곳으로 도달하게 할때 이 로그 수준을 사용합니다.
- `Error`: 가장 우선순위가 높은 로그 레벨. 앱이 오류를 유발한 경우에만 사용하세요.

---

<div id='section-id-175'/>

## How to Write to Different Log Levels With SwiftyBeaver

단지 SwiftyBeaver의 `info()` 사용하여 info 로그레벨에 기록하는것처럼, `verbose()`, `debug()`, `warning()`, `error()` 같은 4가지 메소드를 사용하여 다른 네가지 레벨을 기록할수 있습니다. 	

`application(_:didFinishLaunchWithOptions:)`에서 `info()`를 다음의 코드로 교체합니다.

```swift
SwiftyBeaver.debug("Look ma! I am logging to the DEBUG level.")
```

앱을 빌드하고 실행합니다. 다음과같이 다른 로그메시지를 볼수 있습니다.

`14:48:14.155 💚 DEBUG AppDelegate.application():36 - Look ma! I am logging to the DEBUG level.`

아이콘의 색상이 녹색으로 변경되어 디버그 로그 수준을 나타냅니다. `SwiftyBeaver`가 `print()`, `NSLog()` 보다 우수한 이유중 하나입니다(음..) 로그를 빠르게 스캔하여 관심있는 로그 수준에서 메시지를 찾을수 있습니다.

> Note: 높은우선순위 로그 수준을 남용하지 마세요. 위험과 에러는 주의가 필요한 상황에 대해서는 따로 보류해두어야 합니다. 

---

<div id='section-id-195'/>

## Setting Up The SwiftyBeaver Crypto Cloud

SwifrtBeaver의 가장 멋진 기능중 하나는 바로 로그를 클라우드에 기록하는 기능입니다. SwiftyBeaver에는 로그를 실시간으로 볼수 있는 [macOS app](https://swiftybeaver.com/)이 함께 제공됩니다. 수천개의 기기에 설치된 앱에서 어떤 일이 벌어지고 있는지 궁금하다면 이제 알게 될것입니다. 

[SwiftyBeaver Mac app을 다운로드](https://s3.amazonaws.com/swiftybeaver/SBMac.zip) 하세요. 앱을 열고 양식을 작성하여 계정을 만드세요. 

![](/img/posts/beaver-6.png)

다음으로 파일을 저장하기 위해 묻는 대화상자가 나타납니다. 파일이 무엇인지 알려주지 않기 때문에 조금 이상합니다. 

이름을 `TenPMLogs`으로 지정하고 원하는 위치를 선택하고 저장을 누릅니다.

![](/img/posts/beaver-7.png)

만든 파일에 하나의 앱 로그가 저장되고 TenPMLogs라고 이름붙인 이유입니다. SwiftyBeaver mac 앱을 사용하여 이 파일을 열때 Ten PM앱과 관련된 로그들을 볼수 있습니다. 

로그 파일을 저장하면 선택항목이 표시됩니다. 새 앱을 등록하거나, 이전에 등록한 앱의 로그를 볼수 있습니다. 새 앱으로 계속 진행합니다. 

![](/img/posts/beaver-9.png)

`Generate New App Credentials`을 클릭하면 앱을 위해 생성된 ID, Keys 화면을 볼수 있습니다.

![](/img/posts/beaver-10.png)

방금 생성된 보안 자격 증명을 사용하여 다른 로그 destination을 추가할것입니다. 이 창을 그대로 두고, `Appdelegate.swift`의 `setupSwiftyBeaverLoggin()`으로 돌아갑니다.

```swift
let platform = SBPlatformDestination(appID: "Enter App ID Here",
                                     appSecret: "Enter App Secret Here",
                                     encryptionKey: "Enter Encryption Key Here")

SwiftyBeaver.addDestination(platform)
```

SwiftyBeaver mac 앱으로 돌아가서 Connect버튼을 클릭합니다. 그후 Ten PM을 빌드하고 실행합니다.

> Note: 앱에 자격 증명을 복사하기 전에 연결버튼을 클릭한경우 SwiftyBeaver Mac App에서 설정을 클릭하여 연결한 후 볼수 있습니다.

![](/img/posts/beaver-11.png)

SwiftyBeaver Mac 앱에 로그 메시지가 표시되는걸 확인할수 있습니다. 로그가 보이지 않는다면 절망하지마세요. 경우에 따라서 로그 메시지가 클라우드에 도달하는데 몇 분정도 걸릴수 있습니다. 결국에는 볼수 있습니다. 

SwiftyBeaver또한 유료 계정으로 업그레이드 하지 않는한 생성하는 모든 로그가 자동으로 한시간 이후 만료 되어 집니다. 대부분의 디버깅 작업에서는 문제가 되지 않습니다. 그러나 이전 로그가 더이상 보이지 않는 이유에 대해 궁금해 할수 있습니다. 

---

<div id='section-id-241'/>

## Filtering Logs By Log Level, Favorites, and Minimum Log Levels

SwiftyBeaver Mac 앱은 로그 수준으로 로그를 필터링 할수 있다는 점입니다. 심각한 버그의 원인을 찾기 위해 로그 파일을 파헤치는  처리를 대폭 간소화 시킵니다. 

위에 다른 탭 버튼이 있음을 눈치 챘을 것입니다. 각 탭은 다른 로그 수준을 나타냅니다. 한번에 여러 로그를 보거나, 경고 및 오류만 볼수 있습니다. 

로그에 `선호`하는 것으로 별표 표시 할수 있습니다. 왼쪽 메뉴에서 별을 클릭하여 모든 즐겨찾기를 볼수 있습니다.

---

<div id='section-id-251'/>

## Filtering Logs With Minimum Log Levels

당신이 좋아할 또하나의 기능이 있습니다. SwiftyBeaver를 사용하면 주어진 log destination을 위한 최소한의 로그 수준을 설정할수 있습니다. 심각한 경고와 위험을 위한 보안 클라우드 계정을 따로 남겨두길(reserve) 원한다면 할수 있습니다. 

먼저 `applicationDidFinishLaunching()`에 디버그 로그 조건을 다음으로 교체합니다.

```swift
SwiftyBeaver.verbose("Watch me bloviate. I'm definitely not important enough for the cloud.")
    
SwiftyBeaver.debug("I am more important, but the cloud still doesn't care.")
    
SwiftyBeaver.info("Why doesn't the crypto cloud love me?")
    
SwiftyBeaver.warning("I am serious enough for you to see!")
    
SwiftyBeaver.error("Of course I'm going to show up in your console. You need to handle this.")
```

모든 수준에서 메시지를 기록(logging) 했습니다. 앱을 빌드하고 실행하면, 모든 로그가 Crypto Cloud에 저장되는것을 볼수 있습니다.

![](/img/posts/beaver-12.png)

`setupSwiftyBeaverLogging()`에서 platform loggin destination을 추가한것 이전에 다음 코드를 추가합니다.

```swift
platform.minLevel = .warning
```

앱을 다시 빌드하고 시작합니다. Crypto Cloud 콘솔을 다시 한번 살펴보세요.

![](/img/posts/beaver-13.png)

최근의 타임스템프에서 경고와 위험만 봐야합니다. 다른 경고와 위험을 제외한 보안 클라우드 콘솔에 없었을 것입니다. Xcode 콘솔에서는 모든것을 볼수 있습니다.

> Note: 모든 유형의 SwiftyBeaver logging destination 에 대해 최소 로그 수준을 지정할수 있습니다. 서로 다른 로그 수준에 대해 여러개의 Crptyo Clould Destination을 만들어 상황을 훌륭하게 구분할수 있습니다. SwiftyBeaver에는 사용자 정의를 위한 많은 재량권(wiggle room)이 있습니다.

---

<div id='section-id-289'/>

## Fixing Hard-to-Reach Bugs

Crypto Cloud에 로깅하는것에 대해 이야기하는것은 즐겁지만 고쳐야할 버그가 있거나 적어도 실험을한 다음 수정해야 하는 버그가 있습니다. 

이전 로그들을 정리하는것으로 시작하세요. `application(_:didFinishLaunchingWithOptions:)`에서 모든 로그를 제거하세요. 또한 모든 로그들을 출력하기 위해 `platform.miniLevel` 설정을 삭제합니다.

이 테스트에서는 모든 로그를 봐야합니다.

---

<div id='section-id-299'/>

## Simulating a Bug


... 로깅을 사용하여 버그추적(사용법만 알기위해 이곳은 번역하지 않았습니다)

---

<div id='section-id-306'/>

## Where to Go From Here?

[여기]()에서 완성된 프로젝트를 다운받을수 있습니다. 

또한 SwiftyBeaver로 [File Logging](https://docs.swiftybeaver.com/article/10-log-to-file)을 확인하세요. iPhone이 있고, 인터넷이 연결되어있찌 않을때 로그얻는걸 100% 확신하길 원한다면, 이 기능은 유용할수 있습니다. 

고급 사용 사례를 보려면 [custom formatiing](https://docs.swiftybeaver.com/article/20-custom-format) 을 확인하세요.

---

<div id='section-id-316'/>

## Reference 

[Documentation](https://docs.swiftybeaver.com/article/6-basic-setup)<br>
[https://github.com/SwiftyBeaver/SwiftyBeaver](https://github.com/SwiftyBeaver/SwiftyBeaver)<br>
[Download Mac App](https://swiftybeaver.com/)
