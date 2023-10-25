---
layout:     post
title:      "Swift. Autolayout 을 이용해서 그래프 만들기"
subtitle:   "Autolayout을 통해서 Animate 한 graph 만들기!"
date:       2017-11-13 18:00:00
author:     "MinJun"
comments: true
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/mountains-1244132.jpg
thumbnail-img: /assets/post_img/background/mountains-1244132.jpg
share-img: /assets/post_img/background/mountains-1244132.jpg
toc: true
---

## Autolayout을 이용하여 막대 그래프 표현하기
 
<center><img src="/assets/post_img/posts/graph.MOV.gif" width="450"></center> <br> 


### View hierarchy

View에 그래프 막대로 사용될 하위뷰 6개를 추가하여 autolayout을 통해서 그래프의 변경되는 값을 조정합니다. 그래프 막대로 View bottom을 고정하고 막대 그래프뷰의 height을 조정하여 그래프를 보여줍니다.


```swift
class ViewController: UIViewController {
	 // autoLayout 으로 지정한 height 값을 IBOutlet을 통해서 가져옵니다. 
    @IBOutlet weak var graph1Height: NSLayoutConstraint!
    @IBOutlet weak var graph2Height: NSLayoutConstraint!
    @IBOutlet weak var graph3Height: NSLayoutConstraint!
    @IBOutlet weak var graph4Height: NSLayoutConstraint!
    @IBOutlet weak var graph5Height: NSLayoutConstraint!
    @IBOutlet weak var graph6Height: NSLayoutConstraint!
    
    override func viewDidLoad() {
        super.viewDidLoad()   
    }
    
    @IBAction func btn1Action(_ sender: UIButton) {
        UIView.animate(withDuration: 3, animations: {
            self.graph1Height = self.graph1Height.changeMultiplier(changeMultiplier: 0.1)
            self.graph2Height = self.graph2Height.changeMultiplier(changeMultiplier: 0.2)
            self.graph3Height = self.graph3Height.changeMultiplier(changeMultiplier: 0.3)
            self.graph4Height = self.graph4Height.changeMultiplier(changeMultiplier: 0.4)
            self.graph5Height = self.graph5Height.changeMultiplier(changeMultiplier: 0.5)
            self.graph6Height = self.graph6Height.changeMultiplier(changeMultiplier: 0.6)        
            self.view.layoutIfNeeded()
        })
    }
    
    @IBAction func btn2Action(_ sender: UIButton) {
        self.graph1Height = self.graph1Height.changeMultiplier(changeMultiplier: 0.6)
        self.graph2Height = self.graph2Height.changeMultiplier(changeMultiplier: 0.5)
        self.graph3Height = self.graph3Height.changeMultiplier(changeMultiplier: 0.4)
        self.graph4Height = self.graph4Height.changeMultiplier(changeMultiplier: 0.3)
        self.graph5Height = self.graph5Height.changeMultiplier(changeMultiplier: 0.2)
        self.graph6Height = self.graph6Height.changeMultiplier(changeMultiplier: 0.1)        
        UIView.animate(withDuration: 3, animations: {
            self.view.layoutIfNeeded()
        })
    }
}

// NSLayout의 multiplier 를 코드로 바로 적용하려고 하면, 적용이 되지 않습니다. 그래서 원래의 Constraints 값을 비활성화후, 새롭게 Constraints 값을 생성후, 새로 적용된 값을 Constraints에 적용 시켜서 사용합니다..!
extension NSLayoutConstraint {
    func changeMultiplier(changeMultiplier: CGFloat) -> NSLayoutConstraint {   
        // 원래 자신의 Constraint 값을 deactivate 하고,
        // 새롭게 Newconstraint 값을 적용한것을, activate 함..
        NSLayoutConstraint.deactivate([self])
        let newConstraint = NSLayoutConstraint(item: self.firstItem,
                                              attribute: firstAttribute,
                                              relatedBy: self.relation,
                                              toItem: self.secondItem,
                                              attribute: self.secondAttribute,
                                              multiplier: changeMultiplier,
                                              constant: self.constant)
        // View가 가지고 있는 기본 셋팅값을 사용하겠다는 코드
        newConstraint.priority = self.priority
        newConstraint.shouldBeArchived = self.shouldBeArchived
        newConstraint.identifier = self.identifier
        NSLayoutConstraint.activate([newConstraint])
        return newConstraint
    }
    //NsLayout을 사용하는데, 내가 기본셋팅을 바꾸어서, 원하는 값만 사용하려고함
}
```

Animation 적용시 `view.layoutIfNeeded()`를 실행하여 명시적으로 뷰의 레이아웃을 재설정합니다. 
