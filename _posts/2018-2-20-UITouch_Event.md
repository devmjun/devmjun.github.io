---
layout:     post
title:      "Swift. 터치와 제스쳐를 알아보자"
subtitle:   "UItouch, Event, Gesture "
date:       2018-02-20 14:02:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Responder

- UIControl의 터치 이벤트 
	- Touch Down(터치 누르기)
	- Touch Up(떼기)
	- Drag(이동하기
	- Outside(밖으로 빠져나가기)

컨트롤의 이벤트는 이미 어떤 터치인지 분석된 결과 입니다.(저수준의 터치 API 수준이 아니라는 이야기!) 

- UIResponder(터치 이벤트 다루기)
	- Touch(터치)
	- Motion(흔들기
	- Remote control(리모트 컨트롤 동작) 
	- First Responder(최초 응답 객체)

- Responder Touch API 

```swift
* 터치 시작
func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?)

* 터치 이동
func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?)

* 터치 종료
func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?)

* 터치 취소(뷰 사라지기, 전화, 등)
func touchesCancelled(_ touches: Set<UITouch>?, with event: UIEvent?)
```

- UIResponder의 자식 클래스에 구현
- UIResponder의 자식 클래스 : 뷰(UIView), 뷰 컨트롤러(UIViewController) 
- 어느 클래스가 우선하는가 : 리스폰더 체인(Responder Chain)
	- 어떤것은 먼저 동작할수 있고, 어떤것은 나중에 동작 할수 있음.  

---

## Responder Chain

- 이벤트를 다루는 리스폰더(Responder)간 연결
- 이벤트 발생 -> 이벤트가 발생한 리스폰더 찾기(hit-test) 
- 이벤트가 발생한 리스폰더에서 이벤트 처리 시도 
- 이벤트를 처리하지 않으면 다음 리스폰더로 넘기기

#### - 씬에서 Responder chain

- 가장 앞순위 리스폰더 : 이벤트 발생한 뷰
- 체인 연결 : 뷰 구조에서 부모 뷰로 연결  
- 뷰 구조 이후 뷰 컨트롤러
- 체인으로 연결된 다음 리스폰더 얻기(UIResponder)

```swift
var next: UIResponder? { get }
```

---

## touches 와 event의 차이 

- touches : 터치 이벤트를 발생시킨 터치 정보. Set<UITouch> 타입 
- event : 터치 이벤트가 속한 이벤트 정보로 UIEvent 타입

```swift
func touchesMoved(_ touches Set<UITouch>, with event: UIEvent) {

// touches: 이동 중인 터치 객체
// event: 모든 터치 
}
```

---

## UITouch 

- 터치 정보 : UITouch
	- 터치 발생 시각 : timestamp
	- 탭 개수 : tapCount
	- 터치 위상(시작, 이동, 종료) : phase 터치가 발생한 뷰 : view
	- 터치 세기(3D 터치 지원 기기) : force

- 터치된 곳의 좌표(UITouch) 터치 좌표는 상대적

```swift
// 터치 좌표
func location(in view: UIView?) -> CGPoint

// 이전 터치 좌표
func previousLocation(in view: UIView?) -> CGPoint

* 이동 중인 터치 좌표 얻는 코드
override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) { 
	let touch = touches.first!
	
	// 터치가 발생한 뷰 기준 좌표
	let point = touch.location(in touch.view)
}
```

---

## UIEvent 

```swift
// 터치, 흔들기, 리모콘 이벤트 타입 var type: UIEventType { get }
var subtype: UIEventSubtype { get }

// 터치 중인 모든 터치 객체를 반환
var allTouches: Set<UITouch>? { get }
func touches(for view: UIView) -> Set<UITouch>?
```

---

## Touch Event 다루기 

- 좌표를 다루는 API

```swift
let point1 = CGPoint(x: 10, y: 10) 
let point2 = CGPoint(x: 13, y: 14)

// 두 점 사이의 거리
let dist = sqrt( pow(point1.x - point2.x, 2) + pow((point1.y - point2.y), 2))

// 영역 내 포인트 포함 여부
let rect1 = CGRect(x: 10, y: 10, width: 200, height: 200) 
rect1.contains(point1)

// 영역 내 영역 포함 여부
rect2 = CGRect(x: 30, y: 30, width: 50, height: 50) 
rect1.contains(rect2)
```
터치 정보를 얻기는 쉽지만, 정보 분석이 어려움

---
























