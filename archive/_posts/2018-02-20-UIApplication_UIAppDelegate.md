---
layout:     post
title:      "Swift. 앱을 구성하는 객체"
subtitle:   "UIApplication, UIAppDelegate"
date:       2018-02-20 16:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title

---

## 앱을 구성하는객체

<center><img src="/assets/post_img/posts/AppStructure.png" width="500"></center> <br>

- 시스템 객체
  - 자동 생성
  - 시스템 관련 동작
  - 코드 수정 불가
  - UIApplication, UIwindow
- 커스텀 객체
  - 업무 관련 동작 작성
  - 개발자 작성, 수정 가능
  - ApplicationDelegate, ViewController, Model   

---

## 애플리케이션 객체

- 애플리케이션 객체
  - 시스템 객체 : 애플리케이션(UIApplication)
  - 앱의시작과 함께 자동생성 
  - 유일한 객체로 존재(앱에 1개)
- 객체 얻기

```swift
class var shared: UIApplication { get }
```

- 역할
  - 애플리케이션의 고수준 행위 
  - 컨트롤 객체에게 이벤트 처리 배치 
  - 푸쉬/로컬 노티
  - 앱URL과 앱 전환

---

## 애플리케이션 델리게이트

- 애플리케이션 델리게이트 
- UIApplicationDelegate 프로토콜
- 프로젝트 생성 시 AppDelegate 클래스
- 애플리케이션 델리게이트 객체도 유일하게 존재(앱애 1개)

```swift
let appDelegate = UIApplication.shared.delegate as! AppDelegate
```

- 역할
- 앱의상태변화
- 푸쉬/로컬 노티 다루기
- URL을 이용한 앱 오픈 
- 앱 공유 데이터 저장 용도로 사용가능

---

## UIWindow

- 시스템 객체
- 화면에 출력되는 뷰를 조율
- 대부분 1개의 윈도우 객체. 외부 스크린이 있으면 추가 윈도우 객체
- 루트뷰 컨트롤러: 윈도우에 뷰를 제공하는 뷰 컨트롤러 

```swift
var rootViewController: UIViewController?
```

- 앱 델리게이트에서 윈도우 접근

```swift
UIApplication.shared.delegate?.window
```

---

## 앱의 상태

<center><img src="/assets/post_img/posts/AppStructure-1.png" width="500"></center> <br>

- 앱의 주요 상태 
  - 동작 안 함(Not running): 앱이 종료되거나 시작되지 않은 상태 
  - 포그라운드(Foreground): 앱이 화면에 나타나고 동작중인 상태 
    - 앱이 화면에 나타나는 상태 Active, Inactive 
    - Active: 사용자 이벤트 전달
    - Inactive
      - 사용자 이벤트 전달 안됨
      - 다른 코드 동작 중(예: 컨트롤 센터, 알림 센터)
      - 포그라운드와 백그라운드 전환 중인 상태  
  - 백그라운드(Background): 화면에 보이지않지만(제한된) 동작중인 상태
    - 사용자가 홈 버튼을 눌러서 화면에 앱이 보이지않는 상태 
    - 백그라운드동작: 음악재생, GPS, voip등 제한된 동작 수행 가능 
    - Suspended 상태로 전환되는 중간 단계로 앱 상태 저장
  - 서스펜디드(Suspended) : 메모리에 존재하지만 동작중이 아닌 상태

```swift
* 앱의 상태 전환 UIApplicationDelegate 첫구동
func applicationDidFinishLaunching(_ application: UIApplication)

* 포그라운드(foreground)
func applicationDidBecomeActive(_ application: UIApplication)

* 백그라운드(background)
func applicationDidEnterBackground(_ application: UIApplication)

* 포그라운드, 백그라운드 상태 전환 과정, Inactive
func applicationWillEnterForeground(_ application: UIApplication) 
func applicationWillResignActive(_ application: UIApplication)

* 앱 종료(Suspended 상태에서 종료시 동작 안함)
func applicationWillTerminate(_ application: UIApplication)
```

---

## tabBarController Delegate 팁

tabBarController의 Delegate를 AppDelegate에 설정합니다. tabBarController Delegate를 각 ViewController에서 실행하는것보다, 좀더 편안하게 관리할수 있습니다. 

```swift
class AppDelegate: UIResponder, UIApplicationDelegate, UITabBarControllerDelegate { 
    var window: UIWindow?
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    let tabBarController = window?.rootViewController as! UITabBarController
    tabBarController.delegate = self
    return true 
    }

    func tabBarController(_ tabBarController: UITabBarController, didSelect viewController: UIViewController) {
    // 탭 선택 이벤트 

    }
```

---
