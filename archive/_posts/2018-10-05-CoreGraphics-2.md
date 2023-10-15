---
layout:     post
title:      "Swift. Core Graphics Tutorial Part 2: Gradients and Contexts"
subtitle:   "Core Graphics가 무엇인지 알아봅니다 "
date:       2018-10-05 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich, CoreGraphics, Trigonometry]
categories: archive
permalink: /archive/:title
---

[Core Graphics Tutorial Part 2: Gradients and Contexts](https://www.raywenderlich.com/410-core-graphics-tutorial-part-2-gradients-and-contexts)을 의역 했습니다.

## Table of contents 

  - [<U>Core Graphics Tutorial Part 2: Gradients and Contexts</U>](#section-id-16)
  - [<U>Core Graphics</U>](#section-id-30)
  - [<U>Getting Started</U>](#section-id-46)
  - [<U>Seting up the Animated Transition</U>](#section-id-96)
  - [<U>Analysis of the Graph View</U>](#section-id-155)
  - [<U>Drawing a Gradient</U>](#section-id-170)
  - [<U>Clipping Areas</U>](#section-id-245)
  - [<U>Tricky Calculations for Graph Points</U>](#section-id-285)
  - [<U>A Gradient Graph</U>](#section-id-380)
  - [<U>Drawing the Data Points</U>](#section-id-457)
  - [<U>Context States</U>](#section-id-481)
  - [<U>Adding the Graph Labels</U>](#section-id-530)
  - [<U>Mastering the Matrix</U>](#section-id-625)
  - [<U>Where to Go to From Here?</U>](#section-id-717)
  
---

<div id='section-id-16'/>

## Core Graphics Tutorial Part 2: Gradients and Contexts

Core Graphics의 두번째 튜토리얼에서는 Swift앱의 그라데이션(gradients), 변환(transformations)에 대해 배우게 됩니다.

> Update note: 아 튜토리얼은 iOS 11, Swift 4, Xcode 9 으로 업데이트 되었습니다. 

우리의 현대적인 Core Graphics 스위프트 튜토리얼 시리즈로 돌아와서 반갑습니다. 

[첫번째 튜토리얼 시리즈](https://www.raywenderlich.com/411-core-graphics-tutorial-part-1-getting-started)에서 Core Graphics로 선과 호를 그리는 것에 대해 배웠고, Xcode의 상호작용하는 스토리보드 기능을 사용했습니다.

두번째 튜토리얼에서, Core Graphics를 깊게 알아보고 그라데이션을 그리는것과 변환을 사용하여 `CGContexts`를 다루는걸 배워봅니다.

---

<div id='section-id-30'/>

## Core Graphics

안락한 UIKit을 떠나고, Core Graphics의 낮은 세계로 들어올것입니다. 

애플의 이 이미지는 프레임워크의 개념상 관계를 설명합니다. 

<center><img src="/img/posts/CoreGraphics-14.png" width="450"></center> <br> 


UIKit은 최상위 계층이고, 가장 친숙합니다(approachable). 이전 튜토리얼에서 Core Graphics의 `CGPath`를 레핑한 UIKit의 `UIBezierPath`를 사용했습니다. 

Core Graphics 프레임 워크는 `Quartz advanced drawing engine`을 기반으로 합니다. Core Graphics 프레임 워크는 저수준, 가벼운 2D rendering을 제공합니다. 이 프레임워크를 사용하여 경로기반 그리기, 변환, 색상, 점 관리 등을 처리할수 있습니다. 

하위 Core Graphics 객체와 함수에 대해 알아야 하는 것은 이들은 접두사 `CG`를 항상 가지고 있으므로 쉽게 인식할수 있습니다. 

---

<div id='section-id-46'/>

## Getting Started

이 튜토리얼을 끝낼때 까지, 다음과같은 그레프 뷰를 만들것입니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-ResultGraphView.png)

그래프 뷰를 그리기전에, 스토리보드에서 이걸(?) 설정하고 그래프뷰를 보여주기 위한 전환 애니메이션 코드를 생성해야합니다. 

완전한 뷰 계층은 다음과같이 볼수 있습니다. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-ViewHierarchy.png)

먼저, [시작 프로젝트](https://koenig-media.raywenderlich.com/uploads/2017/07/Flo-part2-Starter.zip)를 다운로드 합니다. 이전 부분에서 중단한 부분이 꽤 있습니다. 유일한 차이점은 `Main.storyboard`에서 `CounterView`는 다른 뷰(노란 배경) 안에 있다는 것입니다. 빌드하고 실행하면 다음과 같이 보여집니다.

<center><img src="/img/posts/CoreGraphics-15.png" width="450"></center> <br> 


`GraphView`이름으로 `UIView`를 서브클레싱하는 `.swift`파일을 하나 생성합니다. 

이제 `Main.strobard`에서 Document Outline의 노란뷰 이름을 더블클릭하여 이름을 `Container View`로 변경하고 `UIView` 객체 라이브러리에서 `CounterView` 아래로 새로운 `UIView`를 생성하고 위치시킵니다. 

`Identify Inspector`에서 새 뷰의 클레스를 `GraphView`로 변경하세요. 남아 있는 할일은 새 GraphView에 대한 제약 조건을 추가하는것입니다. 이전 튜토리얼에서 사용한 방법과 비슷합니다. 

- `GraphView`를 선택하고 자신의 `Width`를 제약 조건으로 추가합니다. 
- `GraphView`를 선택하고 자신의 `Height`를 제약 조건으로 추가합니다.
- `Center Horizontally in Container` 제약 조건을 추가합니다
- `Center Vertically in Container`을 제약 조건으로 추가합니다. 

`Size Inspector`의 제약조건은 다음과 같습니다. 

<center><img src="/img/posts/CoreGraphics-16.png" width="250"></center> <br> 


`Document Outline`는 다음과 같습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2014/12/Flo2-Outline.png" width="450"></center> <br> 


Container View가 필요한 이유는 Counter View 와 Graph View 사이를 애니메이션으로 전환하는걸 만들기 때문입니다. 

ViewController.swift로 이동하여 `Container View` 및 `Graph Views`에 대한 속성 outlet을 추가합니다. 

```swift
@IBOutlet weak var containerView: UIView!
@IBOutlet weak var graphView: GraphView!
```

Container View 와 Graph View에 대한 outlet을 생성하고, 이제 스토리 보드에서 만든 뷰로 ContainerView 와 GrahpView를 연결합니다. 

![](/img/posts/CoreGraphics-17.gif)

---

<div id='section-id-96'/>

## Seting up the Animated Transition

`Main.stroyboard`의 `Document Outline`에서 `Container View`로 `Tap Gesture Recognizer`를 드레그 합니다. 

![](/img/posts/CoreGraphics-18.gif)

ViewController.swift로 돌아가서 클레스의 상단에 이 속성을 추가합니다.

```swift
var isGraphViewShowing = false
```

이제 그래프뷰가 현재 표시되었는지 여부를 단순하게 표시합니다.

이제 전환하여 tap method를 추가합니다.

```swift
@IBAction func counterViewTap(_ gesture: UITapGestureRecognizer?) {
  if (isGraphViewShowing) {
    //hide Graph
    UIView.transition(from: graphView,
                      to: counterView,
                      duration: 1.0,
                      options: [.transitionFlipFromLeft, .showHideTransitionViews],
                      completion:nil)
  } else {
    //show Graph
    UIView.transition(from: counterView,
                      to: graphView,
                      duration: 1.0,
                      options: [.transitionFlipFromRight, .showHideTransitionViews],
                      completion: nil)
  }
  isGraphViewShowing = !isGraphViewShowing
}
```

`UIView.transition(frmo:to:duration:options:completion:)`은 수평으로 뒤집는 전환을 수행합니다. 다른 전환은 cross dissolve, vertical flip, curl up or down등 입니다. 

이 전환은 `.showHideTransitionViews` 상수를 사용합니다. 즉 전환시 숨겨진 상태로 보여질때 해당 뷰가 표시 되지 않도록 제거할 필요가 없습니다. 다음 코드를 `pushButtonPressed(_:)`끝에 추가합니다.

```swift
if isGraphViewShowing {
  counterViewTap(nil)
}
```

그래프가 표시되는 동안 사용자가 plus button을 누르면 디스플레이가 다시 Counter view를 표시합니다. 

마지막으로 이 전환을 작동시키려면 Main.stroybard로 돌아가 탭 제스쳐를 새로 추가된 `counterViewTap(gesture:)`메소드에 연결합니다.

![](/img/posts/CoreGraphics-19.gif)

애플리케이션을 빌드하고 실행하세요. 앱을 시작하면 graph view가 먼저 표시됩니다. 나중에 graph view를 숨김으로 설정하여 Counter view가 표시됩니다. 탭하면 전환되는걸 볼수 있습니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-ViewTransition.png)

---

<div id='section-id-155'/>

## Analysis of the Graph View

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-AnalysisGraphView.png)

Part 1의 `Painter's Model`을 기억하시나요? Core Graphics로 그리는것은 이미지의 뒤쪽에서 앞으로 진행되므로 코드를 작성하기전에 명심해야 합니다. flow의 그래프는 다음과 같습니다.
 
1. 그라데이션(gradient) 배경 뷰 
2. 그래프 아래의 잘린 그라데이션(Clipped gradient under the graph)
3. 그래프 선 
4. 원형 그래프 포인트 
5. 수평 그래프 선 
6. 그래프 레이블

---

<div id='section-id-170'/>

## Drawing a Gradient

이제 그래프뷰의 그라데이션을 그립니다. 

`GraphView.swift`로 돌아가 다음 코드로 교체합니다. 

```swift
import UIKit

@IBDesignable class GraphView: UIView {
  
  // 1
  @IBInspectable var startColor: UIColor = .red
  @IBInspectable var endColor: UIColor = .green

    override func draw(_ rect: CGRect) {
      
      // 2
      let context = UIGraphicsGetCurrentContext()!
      let colors = [startColor.cgColor, endColor.cgColor]
      
      // 3
      let colorSpace = CGColorSpaceCreateDeviceRGB()
      
      // 4
      let colorLocations: [CGFloat] = [0.0, 1.0]
      
      // 5
      let gradient = CGGradient(colorsSpace: colorSpace,
                                     colors: colors as CFArray,
                                  locations: colorLocations)!
      
      // 6
      let startPoint = CGPoint.zero
      let endPoint = CGPoint(x: 0, y: bounds.height)
      context.drawLinearGradient(gradient,
                          start: startPoint,
                            end: endPoint,
                        options: [])
    }
}
```

다음은 위의 설명입니다.

1. 그라데이션을 위한 시작 색상과 끝 색상을 `@IBInspectable`속성으로 설정하면 storyboard에서 사용이 가능합니다. 
2. CG drawing 함수는 이들이 그리는 context를 알아야 하므로, UIKit 매소드인 `UIGraphicGetCurrentContext()`를 사용하여 현재 컨텍스트를 가져옵니다. `UIGraphicGetCurrentContext()`는 `draw(_:)`가 그린것 입니다. 
3. 모든 context는 색상 공간(color space)를 가집니다. 이것은 CMYK, grayscal 일수 있지만, 여기는 RGB 색상 공간을 사용하고 있습니다. 
4. `color stops(변수명 colorLocations)`은 그라데이션 색상이 변경되는 위치를 나타냅니다. 이 예제에서 빨강에서 녹색으로 가는 두가지 색상을 가지지만, 3개의 정지 점(array of three stops)을 가질수 있으며. 빨강에서 파랑으로 파랑에서 녹색으로 변합니다. `stops`는 0~1 의 값을 가질수 있고, 여기서 0.33은 그라데이션이 통과하는 1/3 지점입니다. 
5. 실제 그라데이션, 색상공간, 색상들, 색상 정지(color stops)을 생성합니다.
6. 마지막으로 그라데이션을 그립니다. `CGContextDrawLinearGradient()`는 다음 매개변수를 가집니다. 
	- 어떤것을 그리는 곳의 `CGContext`
	- 색상 공간(color space), 색상들(colors)과 스톱들(stops)을 가지는 `CGGradient`
	- 시작 점 
	- 종료 점 
	- 그라데이션을 확장하는 선택사항

그라데이션은 `draw(_:)`의 전체 사각형을 채웁니다. 

`Assistant Editor`을 사용하여 코드와 스토리 보드를 나란히 볼수 있도록 Xcode를 설정합니다.

<center><img src="/img/posts/CoreGraphics-20.png" width="450"></center> <br> 


스토리보드에서 `Graph View`를 선택하세요. 그런다음 `Attribute Inspector`에서 `Start Color`를 `RGB(250, 233, 222)`, `End Color`을 `RGB(252, 79,8)`로 변경합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-FirstGradient.png)

이제 리펙토링 합니다. `Main.storyboard`에서, ViewController의 View를 제외하고 차례로 각 뷰를 선택하고, 배경 색상을 Clear로 선택합니다. 이제 더이상 노랑색이 필요하지 않으니 Push Button 뷰들도 투명한 배경색을 가져야합니다.

애플리케이션을 빌드하고 실행하면 그래프가 훨씬 좋게 보입니다. 적어도 배경은 알수 있습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/07/Screen-Shot-2017-07-08-at-14.05.02.png" width="350"></center> <br> 


---

<div id='section-id-245'/>

## Clipping Areas

방금 그라데이션을 사용하여 뷰의 컨텍스트 전체 영역을 채웠습니다. 그러나 그리기를 하는 동안 사용했던것 대신 자른 영역(clipping areas)으로 사용할 경로를 만들수 있습니다. 자른 영역(Clipping areas)은 전체 컨텍스트 대신에 채우길 원하는 영역을 정의할수 있습니다.

`GraphView.swift`로 이동합니다.

먼저, `GraphView` 상단에 이 상수들을 추가하고, 이들은 뷰를 그리는 동안 사용됩니다.

```swift
private struct Constants {
  static let cornerRadiusSize = CGSize(width: 8.0, height: 8.0)
  static let margin: CGFloat = 20.0
  static let topBorder: CGFloat = 60
  static let bottomBorder: CGFloat = 50
  static let colorAlpha: CGFloat = 0.3
  static let circleDiameter: CGFloat = 5.0
}
```

`draw(_:)`의 상단에 다음 코드를 추가합니다.

```swift
let path = UIBezierPath(roundedRect: rect,
                  byRoundingCorners: .allCorners,
                        cornerRadii: Constants.cornerRadiusSize)
path.addClip()
```

그라데이션을 제약하는 자른영역이 생성됩니다. 이같은 속임수를 사용하여 그래프 선 아래에 두번째 그라데이션을 그립니다. 

애플리케이션을 빌드하고 실행하면 그래프 뷰에 멋진 둥근 모서리가 있는지 확인하세요.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-RoundedCorners2.png)

> Note: Core Graphics로 정적 뷰를 그리는것은 일반적으로 충분히 빠르지만, 뷰가 돌아다니거나, 자주 다시 그려야 한다면, Core animation layers를 사용해야 합니다. Core Animation은 CPU가 아닌 GPU가 대부분의 처리를 처리하도록. 최적화 되어있습니다. 대조적으로 `draw(_:)`에 Core Graphics에 의해서 처리되는 뷰 그리기 처리는 CPU가 처리합니다.
> 
> clipping path사용하는 대신 CALayer의 `CornerRadius` 속성을 사용하여 둥근 모서리를 만들수 있지만, 상황에 맞게 최적화 해야합니다. 이 개념에 대한 좋은 수업을 얻으려면 Core Animation을 사용하여 사용자 정의 컨트롤을 만드는 [iOS and Swift: A Reusable Knob by Mikael Konutgan and Sam Davies](http://www.raywenderlich.com/82058/custom-control-tutorial-ios-swift-reusable-knob)을 확인하세요

---

<div id='section-id-285'/>

## Tricky Calculations for Graph Points

이제 그리기는 잠시 중단하고 쉬어가며 그래프를 만듭니다. 7개의 점을 표시할것입니다; x축을 요일(Day of the Week) 그리고 y축은 마신 잔수(Number of Glasses Drunk)가 됩니다. 

먼저 주(The week)를 위한 셈플 데이터를 설정합니다.

`GraphView.swift`에서, 클레스의 상단에 다음 속성을 추가합니다.

```swift
//Weekly sample data
var graphPoints = [4, 2, 6, 4, 5, 8, 3]
```

7일을 나타내는 샘플 데이터를 가졌습니다. 나중에 var로 지정해야 하기 떄문에 let 값으로 변경하라는 경고는 무시합니다.

`draw(_:)`의 최상단에 다음 코드를 추가하세요 

```swift
let width = rect.width
let height = rect.height
```

`draw(_:)`의 끝에 다음 코드를 추가합니다.

```swift
//calculate the x point
    
let margin = Constants.margin
let graphWidth = width - margin * 2 - 4
let columnXPoint = { (column: Int) -> CGFloat in
  //Calculate the gap between points
  let spacing = graphWidth / CGFloat(self.graphPoints.count - 1)
  return CGFloat(column) * spacing + margin + 2
}
```

x축 포인트는 7개의 같은 간격의 포인트가 되었습니다. 위의 코드는 클로저식 입니다. 함수로 추가되어질수 있지만, 이와같은 작은 계산에서는 그때마다 즉시(inline) 처리하여 유지할수 있습니다. 

`columnXpoint`는 열(column)을 매개변수로 가지고, x축의 값을 반환합니다. 

Y축을 계산하는 코드를 `draw(_:)`의 끝에 추가합니다.

```swift
// calculate the y point
    
let topBorder = Constants.topBorder
let bottomBorder = Constants.bottomBorder
let graphHeight = height - topBorder - bottomBorder
let maxValue = graphPoints.max()!
let columnYPoint = { (graphPoint: Int) -> CGFloat in
  let y = CGFloat(graphPoint) / CGFloat(maxValue) * graphHeight
  return graphHeight + topBorder - y // Flip the graph
}
```

`columnYPoint`는 매개변수로 요일 값을 받는 클로저 식입니다. 0과 마신 물의 최대양 사이의 y포인트 위치 값을 반환합니다. 

왜냐하면 Core Graphics의 원점은 왼쪽 상단 모서리에 있고 원점에서 왼쪽 아래로 그레프를 그리려면, `columnYPoint`를 자체 반환값을 조정하여 예상한 방향으로 향하도록 만듭니다.

`draw(_:)`의 끝에 선 그리기 코드를 추가합니다.

```swift
// draw the line graph

UIColor.white.setFill()
UIColor.white.setStroke()
    
// set up the points line
let graphPath = UIBezierPath()

// go to start of line
graphPath.move(to: CGPoint(x: columnXPoint(0), y: columnYPoint(graphPoints[0])))
    
// add points for each item in the graphPoints array
// at the correct (x, y) for the point
for i in 1..<graphPoints.count {
  let nextPoint = CGPoint(x: columnXPoint(i), y: columnYPoint(graphPoints[i]))
  graphPath.addLine(to: nextPoint)
}

graphPath.stroke()
```

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-FirstGraphLine.png)

선이 정확하게 그려졌는지 확인했으므로 `draw(_:)`의 마지막에서 다음 코드를 지웁니다.

```swift
graphPath.stroke()
```

이는 스토리보드에서 선을 확인하고, 계산이 올바른지 유효성을 확인하기 위한것 이었습니다.

---

<div id='section-id-380'/>

## A Gradient Graph

경로를 clipping path으로 사용하여 이 path 아래의 그라데이션을 생성합니다. 

먼저 `draw(_:)`의 끝에 clipping path를 설정합니다.

```swift
//Create the clipping path for the graph gradient

//1 - save the state of the context (commented out for now)
//context.saveGState()
    
//2 - make a copy of the path
let clippingPath = graphPath.copy() as! UIBezierPath
    
//3 - add lines to the copied path to complete the clip area
clippingPath.addLine(to: CGPoint(x: columnXPoint(graphPoints.count - 1), y:height))
clippingPath.addLine(to: CGPoint(x:columnXPoint(0), y:height))
clippingPath.close()
    
//4 - add the clipping path to the context
clippingPath.addClip()
    
//5 - check clipping path - temporary code
UIColor.green.setFill()
let rectPath = UIBezierPath(rect: rect)
rectPath.fill()
//end temporary code
```

위 코드의 색션별 분석

1. `context.saveGState()`는 현재 주석 처리 되어있습니다. 일단 이것이 무엇인지 이해하면 잠시후에 다시 되돌아 올것입니다. 
2. 표시된 경로를 그라데이션으로 채울 영역을 정의하는 새 경로를 복사합니다. 
3. 구석의 점 영역으로 완료하고 경로를 답습니다. 이렇게하면 그래프의 오른쪽 하단과 왼쪽 하단이 추가됩니다. 
4. `clipping path`를 `context`로 추가합니다. 컨텍스트가 채워졌을때, 실제로 잘린 경로만 채워집니다.
5. 컨텍스트를 채웁니다. rect는 `draw(_:)`에 전달된 컨텍스트 영역이라는것을 기억하세요.

스토리 보드의 Graph View는 다음과 같이 보여집니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-GraphClipping.png)

다음으로 배경 그라데이션을 위해 생성했던 그라데이션으로 녹색을 대체합니다.

`draw(_:)`의 끝에 서 녹색으로 채운 임시 코드를 지우고, 다음 코드를 추가합니다.

```swift
let highestYPoint = columnYPoint(maxValue)
let graphStartPoint = CGPoint(x: margin, y: highestYPoint)
let graphEndPoint = CGPoint(x: margin, y: bounds.height)
        
context.drawLinearGradient(gradient, start: graphStartPoint, end: graphEndPoint, options: [])
//context.restoreGState()
```

이 블록에서 가장 높은 잔 수를 찾아 그라데이션의 시작점으로 사용합니다. 

초록색으로 했던 방법으로는 전체 사각형을 채울수 없습니다. 그라데이션은 그래프의 상단대신에, context의 상단에서 채워야 하기 때문에 원하는 그라데이션이 나타나지 않습니다. 

주석 처리된 `context.restoreGState()` 컨텍스트를 주의하세요 - 그래프의 표시된 점을 위한 원을 그리고 난 후 주석 처리를 지웁니다. 

`draw(_:)`의 끝에 다음을 추가합니다.

```swift
//draw the line on top of the clipped gradient
graphPath.lineWidth = 2.0
graphPath.stroke()
```

이 코드는 원점 경로를 그립니다. 

그래프는 다음과같은 모양을 가져야 합니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-SecondGraphLine.png)

---

<div id='section-id-457'/>

## Drawing the Data Points

`draw(_:)`의 끝에 다음 코드를 추가합니다.

```swift
//Draw the circles on top of the graph stroke
for i in 0..<graphPoints.count {
  var point = CGPoint(x: columnXPoint(i), y: columnYPoint(graphPoints[i]))
  point.x -= Constants.circleDiameter / 2
  point.y -= Constants.circleDiameter / 2
      
  let circle = UIBezierPath(ovalIn: CGRect(origin: point, size: CGSize(width: Constants.circleDiameter, height: Constants.circleDiameter)))
  circle.fill()
}
```

이 코드는 표시된 점들을 그립니다. 새로운것이 아닙니다. 계산된 x, y점에 배열의 각 요소의 원 path를 채웁니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-GraphWithFlatCircles.png)

흠... 하지만 스토리보드에 보이는건 둥근 원형의 점이 아닙니다. 무슨일이야?

---

<div id='section-id-481'/>

## Context States 

Graphics contexts는 상태를 저장할수 있습니다. 많은 context 속성은 예를들면 색상 채우기, 행렬 변환, 색상공간 및 자른 영역(clip region) 들을 설정 했을때, 현재 그래픽 상태를 위해 실제로 이들이 설정 됩니다(you're actually setting them for the current graphics state)

`context.saveGState()`를 사용하여 상태 스택(state stack)으로 현재 그래픽 상태의 복사본을 추가(push) 하여 저장할수 있습니다. 또한 속성을 변경할수 있습니다. 하지만 `context.restoreGState()`를 호출했을때, 원래의 상태(origin state)가 스텍에서 제거되고, context 속성이 되돌려 집니다. 그래서 이 점들이 이상하게 보이는 이유입니다. 

`GraphView.swift`의 `draw(_:)`에서, Path를 클리핑하는걸 생성하는 이전에 위치의 `context.saveGSState()`의 주석을 제거하고 path가 클리핑 된후에 작성한 `context.restoreGSTate()`의 주석 처리를 제거합니다. 

이렇게하면 

1. `context.saveGSTate()`를 사용하여 원래의 graphics state를 스택으로 푸시합니다. 
2. 새로운 그래픽 상태로 자른 경로(clipping path)를 추가합니다. 
3. 자른 경로 이내에 그라데이션을 그립니다. 
4. `context.restoreGState()`와 함깨 원래의 그래픽 상태를 복원 합니다. 자르는 경로가 추가되기 이전의 상태 입니다.

이제 그래프 선과 원이 훨씬 명확해집니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-GraphWithCircles.png)

`draw(_:)`의 끝에 3개의 수평선을 그리기 위한 코드를 추가합니다.

```swift
//Draw horizontal graph lines on the top of everything
let linePath = UIBezierPath()

//top line
linePath.move(to: CGPoint(x: margin, y: topBorder))
linePath.addLine(to: CGPoint(x: width - margin, y: topBorder))

//center line
linePath.move(to: CGPoint(x: margin, y: graphHeight/2 + topBorder))
linePath.addLine(to: CGPoint(x: width - margin, y: graphHeight/2 + topBorder))

//bottom line
linePath.move(to: CGPoint(x: margin, y:height - bottomBorder))
linePath.addLine(to: CGPoint(x:  width - margin, y: height - bottomBorder))
let color = UIColor(white: 1.0, alpha: Constants.colorAlpha)
color.setStroke()
    
linePath.lineWidth = 1.0
linePath.stroke()
```

이 코드는 새로운게 아닙니다. 방금한 모든것은 점을 움직이고 수평선을 그리는것입니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-GraphWithAxisLines.png)

---

<div id='section-id-530'/>

## Adding the Graph Labels

이제 사용자 친화적인 그래프를 만들기 위해 레이블을 추가할것입니다.

`ViewController.swift`로 가서, outlet 속성들을 추가합니다.

```swift
//Label outlets
@IBOutlet weak var averageWaterDrunk: UILabel!
@IBOutlet weak var maxLabel: UILabel!
@IBOutlet weak var stackView: UIStackView!
```

이렇게하면 동적으로 텍스트를 변경하려는 두 레이블(마신 물의 평균 레이블, 가장 많이 마신 물 레이블)및 요일 이름 레이블을 가진 staciView에 대한 콘텐츠가 추가됩니다.

이제 `Main.storyboard`로 이동하여 다음 뷰를 그래프 뷰의 하위뷰로 추가하세요. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-LabelledGraph.png)

- text가 `Water Drunk`은 레이블 
- text가 `Average:`인 레이블
- text가 `2`인 평균 레이블 옆의 레이블 
- text가 `99`인 그래프 최상단의 오른쪽 정렬된 레이블
- text가 `0`인 그래프의 최하단 오른쪽 정렬된 레이블 
- 각 요일 레이블을 가진 수평 `StackView` - 각 텍스트는 코드에서 변경됩니다.(가운데 정렬)

Shift를 누른상태에서 모든 레이블을 선택하고, fonts를 Custom Avenir Next Condensed로 선택하고, Medium 스타일로 선택합니다.

해당 레이블을 설정하는데 문제가 있으면 튜토리얼의 끝에서 [최종 프로젝트](https://koenig-media.raywenderlich.com/uploads/2017/07/Flo-Part2-Finished-1.zip)를 확인하세요. 

`averageWaterDrunk`, `maxLabel`, `stackView`을 `Main.storyboard`의 해당 뷰에 연결합니다. 

![](/img/posts/CoreGraphics-21.gif)

이제 graph view의 설정이 끝났습니다. `Main.stroybard`에서 `Graph view`를 선택하고, `Hidden`을 선택하면 앱이 처음 실행될때 그래프가 나타나지 않습니다. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-GraphHidden.png)

`ViewController.swift`로 돌아가서 레이블을 설정하기 위한 다음 메소드를 추가합니다.

```swift
func setupGraphDisplay() {

  let maxDayIndex = stackView.arrangedSubviews.count - 1
  
  //  1 - replace last day with today's actual data
  graphView.graphPoints[graphView.graphPoints.count - 1] = counterView.counter
  //2 - indicate that the graph needs to be redrawn
  graphView.setNeedsDisplay()
  maxLabel.text = "\(graphView.graphPoints.max()!)"
    
  //  3 - calculate average from graphPoints
  let average = graphView.graphPoints.reduce(0, +) / graphView.graphPoints.count
  averageWaterDrunk.text = "\(average)"
    
  // 4 - setup date formatter and calendar
  let today = Date()
  let calendar = Calendar.current
    
  let formatter = DateFormatter()
  formatter.setLocalizedDateFormatFromTemplate("EEEEE")
  
  // 5 - set up the day name labels with correct days
  for i in 0...maxDayIndex {
    if let date = calendar.date(byAdding: .day, value: -i, to: today),
      let label = stackView.arrangedSubviews[maxDayIndex - i] as? UILabel {
      label.text = formatter.string(from: date)
    }
  }
}
```

약간은 거칠어 보이지만, 캘린더를 설정하고 요일을 찾아야 합니다. 이 색션에서 찾습니다.

1. 그래프의 데이터 배열에서 마지막 아이템을 오늘의 데이터로 설정합니다. 마지막 프로젝트인 [Part 3](https://www.raywenderlich.com/409-core-graphics-tutorial-part-3-patterns-and-playgrounds)의 마지막 부분에서 60일의 샘플 데이터로 대체하여 확장할수 있지만, 이 세션의 범위를 벗어납니다. 
2. 이 경우에 오늘의 데이터로 변경되면 그래프를 다시 그립니다.
3. 여기는 Swift의 `reduce`연산을 사용하여 일주일 동안 취한 평균 잔 수를 계산합니다. 배열의 모든 합하는 것은 매우 유용한 방법입니다. 
4. 이 색션에서는 요일의 첫글자를 가져오는 방식으로 `DateFormatter`을 설정합니다. 
5. 이 루프는 스텍뷰의 모든 레이블을 거쳐서, date formatter에서 각 레이블의 텍스트를 설정합니다.

> Note: [함수형 프로그래밍 튜토리얼](https://www.raywenderlich.com/2273-swift-functional-programming-tutorial)에서 함수형 프로그래밍을 깊게 설명합니다. 

`ViewController.swift`의 `counterViewTap(_:)`에서 이 새로운 매소드를 호출합니다. 조건부의 `else` 부분의 `show graph` 부분의 주석에 `setupGraphDisplay()`을 추가합니다.

```swift
setupGraphDisplay()
```

애플리케아션을 실행하고 Counter를 클릭합니다. 만세! 

![](/img/posts/CoreGraphics-22.gif)

---

<div id='section-id-625'/>

## Mastering the Matrix

앱이 정말 선명하게 보입니다. 첫번째 튜토리얼에서 생성한 counter view는 마신 잔수를 가리키는 표시를 추가하여, 개선시킬수 있습니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-Result.png)

이제 CG 함수에 대한 연습을 조금 했으므로, 회전시키고, 변형 시켜 drawing context에 사용합니다.

이 마커는 가운데에서부터 방사됩니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-LinesExpanded.png)

컨텍스트로 그리는것 뿐만아니라, 회전, 크기 조정(scaling), 컨텍스트의 변환 행렬 해석 등을 다룰수 있습니다.

먼저, 이것은 혼란스러울수 있지만, 연습후에 이해할수 있습니다. 변환 순서가 중요하므로 먼저 수행할 작업에 대해 다이어 그램으로 간략하게 설명합니다.

다음 다이어 그램은 컨텍스트를 회전하고 그후 컨텍스트의 중앙에서 사각형을 그리는 결과입니다. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-RotatedContext.png)

검은 사각형은 회전 컨텍스트 이전에 그려졌고, 그후 녹색, 그후 빨강색을 그립니다. 두가지 주의 사항으로:

- 컨텍스트는 왼쪽상단(0.0)에서 회전 됩니다. 
- 사각형은 여전히 컨텍스트의 중심에 그려지지만, 컨텍스트는 회전된 후 입니다. 

Counter view의 마커를 그럴때, 컨텍스트를 먼저 바꾸고(translate) 그후 회전 합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-RotatedTranslatedContext.png)

이 다이어그램에서 사각형 마커는 컨텍스트의 왼쪽 상단에 있습니다. 파란색 선은 변환된 컨텍스트(translated context)의 윤곽을 보여주고 그후 컨텍스트는 회전하고(빨간 대쉬선) 그리고 다시 변환(translated)됩니다.

빨간 사각형 마커가 컨텍스트에 마지막으로 그려졌을때, 뷰에 다른 각도에서 나타납니다.(it'll appear in the view at an angle)

컨텍스트가 빨간색 마커를 그리기 위해 컨텍스트가 회전하고 변환된 후에, 녹색 마커를 그리기 위해 컨텍스트가 변환되고 회전 될수 있기 때문에 중앙으로 재 조정(reset) 되는게 필요합니다.

그래프 뷰에서 잘린 경로와 함께 저장했었던 컨텍스트 상태 처럼 마커를 그리는 각 시간 마다 변형 행렬을 사용하여 상태를 저장하고 복원합니다. 

`CounterView.swift`로 이동하여 `draw(_:)`의 끝에 다음 코드를 추가하여 카운터에 마커를 추가합니다.

```swift
//Counter View markers
let context = UIGraphicsGetCurrentContext()!
  
//1 - save original state
context.saveGState()
outlineColor.setFill()
    
let markerWidth: CGFloat = 5.0
let markerSize: CGFloat = 10.0

//2 - the marker rectangle positioned at the top left
let markerPath = UIBezierPath(rect: CGRect(x: -markerWidth / 2, y: 0, width: markerWidth, height: markerSize))

//3 - move top left of context to the previous center position  
context.translateBy(x: rect.width / 2, y: rect.height / 2)
    
for i in 1...Constants.numberOfGlasses {
  //4 - save the centred context
  context.saveGState()
  //5 - calculate the rotation angle
  let angle = arcLengthPerGlass * CGFloat(i) + startAngle - .pi / 2
  //rotate and translate
  context.rotate(by: angle)
  context.translateBy(x: 0, y: rect.height / 2 - markerSize)
   
  //6 - fill the marker rectangle
  markerPath.fill()
  //7 - restore the centred context for the next rotate
  context.restoreGState()
}

//8 - restore the original state in case of more painting
context.restoreGState()
```

여기 무엇을 했는지에 대한 내용입니다.

1. 컨텍스트의 행렬을 다루기 이전에, 행렬의 원래 상태를 저장합니다.
2. 경로의 위치와 모양을 정의 합니다 -- 하지만 아직 그리지 않습니다. 
3. 컨텍스트의 원래 중심에서 회전이 발생하도록 컨텍스트를 이동합니다.(이전 다이어그램의 파란색 선)
4. 각 마커를 위해 중심이 있는 컨텍스트의 상태를 저장합니다.
5. 이전에 계산된 각각의 각도를 사용하여, 각 마커의 각도를 결정하고, 컨텍스를 회전및 변환 합니다. 
6. 회전, 변환된 컨텍스트의 왼쪽 상단에 사각형 마커를 그립니다.
7. 중앙이 있는 컨텍스트의 상태로 복원합니다.
8. 회전하거나 변환되지 않은 컨텍스트의 원래 상태를 복원합니다.

이제 애플리케이션을 빌드하고 실행합니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/2-FinalPart2.gif)

---

<div id='section-id-717'/>

## Where to Go to From Here? 

[Flo App](https://koenig-media.raywenderlich.com/uploads/2017/07/Flo-Part2-Finished-1.zip)이 완성되었습니다. 

이 시점에서 paths, gradients, 컨텍스트의 변환 행렬을 어떻게 변경하는지에 대해서 배웠습니다.

이 Core Graphics의 [세번째 튜토리얼](https://www.raywenderlich.com/409-core-graphics-tutorial-part-3-patterns-and-playgrounds)에서는 패턴이 있는 배경을 만들고, 벡터 메달 이미지를 그릴것입니다. 

---

## Related Reference 

[Core Graphics Tutorial Part 1: Getting Started](https://devmjun.github.io/archive/CoreGraphics-1)<br>
[Core Graphics Tutorial Part 3: Patterns and Playgrounds](https://devmjun.github.io/archive/CoreGraphics-3)
