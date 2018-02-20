---
layout:     post
title:      "Swift. 간단한 Animation"
subtitle:   ""
date:       2018-02-20 15:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## UIImageView의 애니메이션

- 애니메이션으로 출력될 이미지(UIImage) <br>

```swift
var animationImages: [UIImage]?
var highlightedAnimationImages: [UIImage]?
``` 

- 애니메이션 속성(시간, 반복) <br> 

```swift
var animationDuration: TimeInterval
var animationRepeatCount: Int
```

- 애니메이션 시작/중지 <br>

```swift
func startAnimating() func stopAnimating()
```

- 예제 코드 

```swift
@IBOutlet var imageView : UIImageView! 

@IBAction func startAnimation(_ sender: Any) {
	imageView.startAnimating() 
}

@IBAction func stopAnimation(_ sender: Any) { 
	if imageView.isAnimating {
			imageView.stopAnimating() 
		}
}

override func viewDidLoad() {
	super.viewDidLoad()
	let images = [ image1, image2, image3 ] 
	imageView.animationImages = images 
	imageView.animationDuration = 3
}
```

---

## UIView Animation

일정 시간동안 속성 변경 

- Animation 가능뷰속성 
	- frame, bounds, center : 뷰의 위치와 크기 
	- transform : 좌표 행렬
	- alpha : 투명도
	- backgroundColor : 배경색
	- contentStretch : 확대/축소 영역
- 애니메이션 불가능 속성
	- hidden 처럼 중간값 계산이 불가능한 속성

---

## UIView Animation

- duration: Animation 지속 시간 
- delay: Animation 시작전 지연시간 
- animations: 속성 변경 코드
- completion: 애니메이션 종료 후

```swift
class func animate(withDuration:duration: TimeInterval, animations: () -> Void) class func animate(withDuration:duration: TimeInterval,
	animations: () -> Void, completion: ((Bool) -> Void)?) 

class func animate(withDuration:duration: TimeInterval,
	delay: TimeInterval,
	options: UIViewAnimationOptions=[],
	animations: () -> Void, completion: ((Bool) -> Void)?)
```

- 애니메이션은 비동기로 동작함, 애니메이션 종료 때까지 대기하지 않음. 


```swift
class ViewController: UIViewController {
    var currentView: UIView?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        currentView = UIView(frame: CGRect(x: 50, y: 50, width: 100, height: 100))
        if let currentView = currentView {
            currentView.backgroundColor = .black
            view.addSubview(currentView)
        }
        
        
    }
    
    @IBAction func startButtonAction(_ sender: UIButton) {
        UIView.animate(withDuration: 1.0) {
            self.currentView?.center = CGPoint(x: 300, y: 300)
        }
        self.currentView?.backgroundColor = .red 
    }
}
```

View의 이동이 끝나고, View의 background color 변경 되는것을 예상했지만, 뷰가 이동하면서 동지에 backgroundColor 값이 변했습니다. 예상한대로 애니메이션이 끝나고, 어떤 동작을 하고싶을때는 Completion이 있는 Animation을 사용합니다.

---

## Transition Animation

- 뷰의 트랜지션
- 뷰의 전환
- 기존 뷰는 사라지고(removeFormSuperview)새로운 뷰가 나타나는(addSubView) 동작 
- 뷰 추가/삭제 코드 불필요

```swift
import UIKit

class ViewController: UIViewController {
    var currentView: UIView?
    var newView: UIView?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        currentView = UIView(frame: CGRect(x: 50, y: 50, width: 100, height: 100))
        newView = UIView(frame: CGRect(x: 100, y: 100, width: 100, height: 100))
        newView?.backgroundColor = .red
        if let currentView = currentView {
            currentView.backgroundColor = .black
            view.addSubview(currentView)
        }
    }
    
    @IBAction func startButtonAction(_ sender: UIButton) {
        UIView.transition(from: currentView!,
                          to: newView!,
                          duration: 1.0,
                          options: [.transitionCrossDissolve]) { (finished) in
                            print("transition finished")
        }
    }
}
```

---

