---
layout:     post
title:      "Swift. App Launch시 일어나는 과정들"
subtitle:   "About the App Launch Sequence. Restoration Part: 4"
date:       2018-10-19 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Restoration]
categories: archive
permalink: /archive/:title
---

[About the App Launch Sequence](https://developer.apple.com/documentation/uikit/core_app/managing_your_app_s_life_cycle/responding_to_the_launch_of_your_app/about_the_app_launch_sequence)에서 필요한 부분을 의역 했습니다.

---


## About the App Launch Sequence

앱이 실행될때 사용자화된 코드가 실행되는 순서를 배웁니다.

---

## Overview 

앱이 실행될때 복잡한 여러 단계의 연속을 포함하고 대부분은 UIKit이 자동으로 처리합니다. 시작의 여러 단계 동안, UIKit은 사용자화된 작업을 이행할수 있게 app delegate 의 매소드를 호출합니다. 초기화가 시작된것으로 간주 될때 까지 발생하는 일련의 단계를 보여줍니다.

> 사진 1 앱 시작과 초기화 순서 

![](/img/posts/Launch-0.png)

1. 앱이 사용자가 명시적으로 또는 시스템에서 암묵적으로 시작 합니다. 
2. Xcode에 제공된 메인 함수는 UIKit의 [<U>UIApplicationMain(_:_:_:_:)</U>](https://developer.apple.com/documentation/uikit/1622933-uiapplicationmain)함수를 호출합니다.
3. [<U>UIApplicationMain(_:_:_:_:)</U>](https://developer.apple.com/documentation/uikit/1622933-uiapplicationmain)함수는 [UIApplication](https://developer.apple.com/documentation/uikit/uiapplication) 객체 와 앱 델리게이틀 생성합니다. 
4. UIKit은 메인 스토리 보드 또는 nib 파일에서 앱의 기본 인터페이스를 로드합니다.
5. UIKit은 앱 델리게이트 [<U>application(_:willFinishLaunchingWithOptions:)</U>](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623032-application) 메소드를 호출합니다. 
6. UIKit은 상태복원을 이행하여 앱 델리게이트와 뷰 컨트롤러의 추가적인 메소드를 호출합니다.
7. UIKit은 [<U>application(_:didFinishLaunchingWithOption:)</U>](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622921-application) 메소드를 호출합니다. 

초기화가 완료되면 시스템은 앱을 active(foreground) 상태 또는 background 상태중 하나로 이동합니다. 앱이 active 상태로 이동했을때 windows가 화면에 나타나고 유저 인터렉션에 응답하기 시작합니다. 앱이 background 상태로 이동했을때 windows는 숨겨진 상태로 유지되고 suspended 되기 전까지 짧은 시간동안만 실행 됩니다.

앱이 `foreground` 또는 `background`로 시작하는것과 상관없이 대부분의 시작시 초기화 코드는 동일해야합니다. 예를들어 앱의 데이터 구조를 초기화하고 앱의 유저 인터페이스를 설정해야 합니다. 그러나 foreground 또는 background로 이동할때에만 수행하려는 작업이 있다면, [UIApplication](https://developer.apple.com/documentation/uikit/uiapplication) 객체의 [applicationState](https://developer.apple.com/documentation/uikit/uiapplication/1623003-applicationstate) 속성을 확인하세요. UIKit은 foreground로 앱이 이동하는 경우 이 속성을 `UIApplication.State.inactive`로 설정하고 background 상태로 이동하는 경우 `UIApplication.State.background`로 설정합니다. 
