---
layout:     post
title:      "Swift. 구조체 Mutating 정리"
subtitle:   "Mutating, 중첩 타입"
date:       2018-02-18 05:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## 구조체 Mutating 

#### - Mutating 

구조체의 매서드가 구조체 내부에서 데이터 수정 할떄는 `Mutating`키워드를 선언 해주어야함

```swift
struct Point {
var x = 0 
var y = 0 

mutating func moveTo(x: Int, y: Int) {
	self.x = x  // 컴파일 에러남.
	self.y = y  // 컴파일 에러남. 
  }
}
  -> 컴파일 오류가 발생하지 않게 하기 위해서 func 키워드 앞에 mutating작성 해주어야함.
```

따라서 다른 구조체 API를 보고 Mutating이 있느냐 없느냐에 따라서, 원래 구조체 내부의값을 변경 하는 API 인지, 아닌지 유추할수 있습니다.

---

## 중첩 타입 

- 타입 내부에 타입 정의
	- 클래스, 구조체, Enum 내부에 타입 정의 

```swift
struct Rectangle { 
	struct Point {
		var x, 
		y : Int 
	}
	struct Size {
		var width, 
		height : Int
	}
	var origin : Point 
	var size : Size
init() { // 초기화 코드 
	} 
}

// 아래 처럼 사용할수 있음. 
let point = Rectangle.Point(x: 10, y: 10)
let size = Rectangle.Size(width: 100, height: 100)
```

---



