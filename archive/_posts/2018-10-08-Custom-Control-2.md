---
layout:     post
title:      "Swift. How To Make a Custom Control Tutorial: A Reusable Knob"
subtitle:   "Control을 사용자화하는 방법을 알아봅니다."
date:       2018-10-08 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich, CoreGraphics, Trigonometry]
categories: archive
permalink: /archive/:title
---

[How To Make a Custom Control Tutorial: A Reusable Knob](https://www.raywenderlich.com/5294-how-to-make-a-custom-control-tutorial-a-reusable-knob)을 의역했습니다.

---

## Table of contents 

  - [<U>How To Make a Custom Control Tutorial: A Reusable Knob</U>](#section-id-16)
  - [<U>Getting Started</U>](#section-id-34)
  - [<U>designing Your Control's API</U>](#section-id-86)
  - [<U>Setting the Appearance of Your Control</U>](#section-id-114)
  - [<U>Exposing Appearance Properties in the API</U>](#section-id-284)
  - [<U>Setting the Control’s Value Programmatically</U>](#section-id-327)
  - [<U>Animating Changes to the Control’s Value</U>](#section-id-408)
  - [<U>Updating the Label</U>](#section-id-446)
  - [<U>Responding to Touch Interaction</U>](#section-id-474)
  - [<U>Wiring Up the Custom Gesture Recognizer</U>](#section-id-567)
  - [<U>Sending Action Notifications</U>](#section-id-621)
  - [<U>Where to Go From Here?</U>](#section-id-662)

---

<div id='section-id-16'/>

## How To Make a Custom Control Tutorial: A Reusable Knob

Custom UI 컨트롤은 앱에 새로운 기능이 필요할때, 특히 다른 앱에서 재사용할수 있을 정도로 충분히 일반적인 경우 매우 유용합니다. 이 커스텀 컨트롤 튜토리얼은 믹서에서 찾을수 있는 컨트롤 손잡이 에서 영감받은 원형 슬라이더 같은 종류의 컨트롤을 만드는걸 다룹니다.

> Update note: iOS 11, Xdoe 9, Swift 4로 업데이트 됬습니다.

Swift의 UI Control을 소개하는 훌륭한 튜토리얼이 있습니다. [이 튜토리얼](https://www.raywenderlich.com/2297-how-to-make-a-custom-control-tutorial-a-reusable-slider)은 양끝의 범위를 설정할수 있게 사용자화한 `UISlider`를 만드는 과정을 안내합니다.

이 커스텀 컨트롤 튜토리얼은 그 컨셉을 좀더 자세하게 설명하고, 믹서에서 찾을수 있는 컨트롤 손잡이에서 영감받은 원형 슬라이더 같은 종류의 컨트롤 생성을 다룹니다. 

![](/assets/post_img/posts/Custom-Control-0.png)

`UIKit`은 `UISlider`를 제공하고, 지정된 범위내의 플로팅 포인팅 값을 설정하게 합니다. iOS 기기에서 사용했었다면, 아마 UISlider를 볼륨, 밝기, 등 다양한 목적의 어떤걸 설정하기 위해 사용했었을 것입니다. 프로젝트는 같은 기능을 갖지만, 원형 모형이 다릅니다.

---

<div id='section-id-34'/>

## Getting Started

[여기](https://koenig-media.raywenderlich.com/uploads/2018/06/ReusableKnob.zip)에서 시작 프로젝트를 다운받습니다.

`ReusableKnob/Starter`로 가고 시작 프로젝트를 엽니다. 간단한 Single View Application 이고, 스토리보드는 main view controller로 연결된 몇개의 컨트롤을 가집니다. 이 튜토리얼에서 나중에 이 컨트롤들을 사용하여 손잡이 컨트롤(knob control)의 다른 기능을 보여줍니다. 

프로젝트를 빌드하고 실행합니다. 시작하기전에 모든것이 어떻게 보이는지 파악하세요. 다음 화면과 같은걸 볼수 있습니다..

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/04/reusable-knob-start.png" width="450"></center> <br> 


손잡이 컨트롤을 위한 클레스를 생성합니다. 이름을 `Knob`로 작성하고 `UIControl`을 하위 클레싱하여 `ReusableKnob` 그룹을 선택하고 `.swift`파일을 생성합니다. 

새로운 컨트롤을 위한 코드를 작성하기 이전에, 뷰 컨트롤러에 추가해야합니다. 

`Main.stroyboard`를 열고 레이블 왼쪽의 뷰를 선택하고 Identify Inspector 에서 클레스를 `Knob`로 설정합니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/04/reusable-knob-class.png)

손잡이를 위한 outlet을 생성하고, 스토리보드에서 `Assistant editor`을  열고 `ViewController.swfit`를 화면과 같이 보여지게 합니다. 

`knob`라고 이름 지은 outlet을 `animateSwitch`아래에 선언 하고 연결합니다. 

표준 편집기로 돌아오고 `Knob.swfit`에서 보일러 플레이트(boiler-plate) 클레스를 다음 코드로 정의하여 교체합니다. 

```swift
class Knob: UIControl {
  override init(frame: CGRect) {
    super.init(frame: frame)
    commonInit()
  }

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    commonInit()
  }

  private func commonInit() {
    backgroundColor = .blue
  }
}
```

이 코드는 두개의 초기화, 배경색상을 정의하여 화면에서 볼수 있게 합니다.

앱을 빌드하고 실행하면 다음처럼 보일것 입니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/04/reusable-knob-background.png" width="450"></center> <br> 


기본 빌딩 블록과 함깨, 컨트롤을 위한 API를 만들 작업을 할 시간입니다.

---

<div id='section-id-86'/>

## designing Your Control's API 

사용자화한 UI 컨트롤을 만드는 주된 이유는 재사용가능한 요소(component)를 만들기 위해서 입니다. 컨트롤을 위한 좋은 API를 계획하기 위해 시간을 투자할 가치가 있습니다. 개발자는 소스코드를 찾는거 없이 API 만 보고 구성요소를 어떻게 사용하는지 이해할수 있어야합니다.

API는 공용 함수들로 구성되어있고 사용자화한 속성입니다.

`Knob.swift` 에서 초기화위에 다음코드를 추가합니다.

```swift
var minimumValue: Float = 0

var maximumValue: Float = 1

private (set) var value: Float = 0

func setValue(_ newValue: Float, animated: Bool = false) {
  value = min(maximumValue, max(minimumValue, newValue))
}

var isContinuous = true
``` 

- `minimumValue`, `maximumValue`, `value`는 컨트롤을 위한 매개변수를 연산하는 기본 설정입니다. 
- `setValue(_:animated:)`는 컨트롤의 값을 프로그래밍으로 설정하고, 추가적인 boolean 매개변수는 값의 변경 사항을 애니메이션으로 표시할지 여부를 나타냅니다. 왜냐하면 값은 최소값과 최대값 사이에서만 설정 되기 때문에 private(set) 설정자로 그 자체를 setter private로 만들어야 합니다.
- `isContinuous`가 ture면 값이 변경되면 반복적으로 재 응답(call back)합니다.

---

<div id='section-id-114'/>

## Setting the Appearance of Your Control

이 튜토리얼에서 Core Animation Layer들을 사용합니다. 

UIview는 CALayer에 의해 뒷받침 되기 때문에, CALayer는 GPU에서 iOS 최적화 랜더링을 도와줍니다. CALAyer 객체는 보이는 컨텐츠를 관리하고 애니메이션의 모든 타입을 매우 정도로 효율적으로 설계되었습니다. 

이 Knob 컨트롤은 두개의 CALayer 객체로 구성되어져있습니다: 하나는 트렉(track), 하나는 하나는 포인터 입니다. 

아래의 가상의 knob 컨트롤 구조를 보여줍니다. 

![](/assets/post_img/posts/Custom-Control-1.png)

빨강 사각형과 파란 사각형은 두개의 CALayer 객체 입니다. 파랑 레이어는 knob 컨트롤의 트렉을 포함하고 빨강 레이어는 포인터 입니다. 두레이어가 겹쳐졌을때 움직이는 knob의 모양이 생성됩니다. 색상차이는 단지 예를 들기 위한 목적입니다.

두개의 분리된 레이어를 사용하는 이유는 포인터가 새로운 값을 나타내기 위해 움직일때 명확해집니다. 위 다이어그램의 빨간색 레이어로 표시된 포인터가 포함된 레이어가 회전하면 됩니다.

Core Animation에서 레이어를 회전하는 비용은 적고, 쉽습니다. `Core Graphics` 와 `drawRect(_:)`를 재정의 하여 구현하는걸 선택한다면 전체 knob 컨트롤은 애니메이션의 모든 단계에서 다시 랜더링 됩니다. 이것은 매우 비싼 연산이기 때문에 결과적으로 애니메이션이 느려질수 있습니다.

외형 부분을 컨트롤부분과 분리하여 유지하려면 새로운 private class를 `knob.swift`의 끝에 추가해야합니다.

```swift
private class KnobRenderer {
}
```

이 클레스는 knob를 랜더링하는 연관된 track 코드를 유지합니다. 이렇게하면 컨트롤과 그 자체의 내부를 명확하게 구분할수 있습니다. 

다음 `KnobRender`정의 내에 다음 코드를 추가합니다.

```swift
var color: UIColor = .blue {
  didSet {
    trackLayer.strokeColor = color.cgColor
    pointerLayer.strokeColor = color.cgColor
  } 
}

var lineWidth: CGFloat = 2 {
  didSet {
    trackLayer.lineWidth = lineWidth
    pointerLayer.lineWidth = lineWidth
    updateTrackLayerPath()
    updatePointerLayerPath()
  }
}

var startAngle: CGFloat = CGFloat(-Double.pi) * 11 / 8 {
  didSet {
    updateTrackLayerPath()
  }
}

var endAngle: CGFloat = CGFloat(Double.pi) * 3 / 8 {
  didSet {
    updateTrackLayerPath()
  }
}

var pointerLength: CGFloat = 6 {
  didSet {
    updateTrackLayerPath()
    updatePointerLayerPath()
  }
}

private (set) var pointerAngle: CGFloat = CGFloat(-Double.pi) * 11 / 8

func setPointerAngle(_ newPointerAngle: CGFloat, animated: Bool = false) {
  pointerAngle = newPointerAngle
}

let trackLayer = CAShapeLayer()
let pointerLayer = CAShapeLayer()
```

위의 이러한 속성 대부분은 knob의 시각적인 외형을 나눕니다. 두개의 `CAShapeLayer` 속성은 위의 표시된 레이어를 나타냅니다. `color`, `lineWidth`속성은 두 레이어의 `strokeColor`, `lineWidth`를 대신합니다. `updateTrackLayerPath`, `updatePointerLayerPain`를 구현할때 까지 `unresolved identifier`의 컴파일 오류를 볼것입니다. 

이제 초기화를 클레스의 `pointerLayer` 속성 아래에 추가합니다.

```swift
init() {
  trackLayer.fillColor = UIColor.clear.cgColor
  pointerLayer.fillColor = UIColor.clear.cgColor
}
```

초기에는 두 레이어의 외형을 투명하게 설정합니다. 

`CAShapeLayer`객체로서 전체 손잡이를 구성하는 모양을 만듭니다. 이들은 `CALayer`의 하위 클레스로 [anti-aliasing](https://en.wikipedia.org/wiki/Spatial_anti-aliasing)과 최적화된 [레스화](https://en.wikipedia.org/wiki/Rasterisation)를 사용하여 `bezier path`를 그립니다. 이로 인해 `CAShapeLayer`는 효율적인 방식으로 임시의 외형(arbitrary shapes)를 그릴수 있습니다. 

다음 매소드를 `Knobrenderer` 클레스에 추가합니다.

```swift
private func updateTrackLayerPath() {
  let bounds = trackLayer.bounds
  let center = CGPoint(x: bounds.midX, y: bounds.midY)
  let offset = max(pointerLength, lineWidth  / 2)
  let radius = min(bounds.width, bounds.height) / 2 - offset
  
  let ring = UIBezierPath(arcCenter: center, radius: radius, startAngle: startAngle,
                          endAngle: endAngle, clockwise: true)
  trackLayer.path = ring.cgPath
}

private func updatePointerLayerPath() {
  let bounds = trackLayer.bounds
  
  let pointer = UIBezierPath()
  pointer.move(to: CGPoint(x: bounds.width - CGFloat(pointerLength)
    - CGFloat(lineWidth) / 2, y: bounds.midY))
  pointer.addLine(to: CGPoint(x: bounds.width, y: bounds.midY))
  pointerLayer.path = pointer.cgPath
}
```

`updateTrackLayerPath`는 포인터가 레이어 이내의 위치가 맞는지(fit) 보장한 반지름과 함께 시작 각과 끝각도 사이의 호를 생성하고, trackLayer의 중앙에 배치시킵니다. `UIBezierPath`의 만들고 `cgPath` 속성을 사용하여 적절한 `CAShapLayer`의 경로를 설정합니다. 

`UIBezierPath`는 최신 API를 사용하기 때문에 초기 경로를 만들때 사용하고 `CGPathRef`로 변환합니다.

`updatePointerLayerPath`는 각도가 0인 위치에서 포인터의 경로를 만듭니다. 다시 `UIBezierPath`를 만들고 `CGPathRef`로 변환하고 `CAShaperLayer`의 path 속성에 할당합니다. 포인터가 직선이므로 포인터를 그릴때 필요한것은 `move(to:)`, `addLine(to:)` 입니다. 

> Note: 각을 그리는것과 관계된 개념이 필요하다면 [Trigonomerty for Game Programming tutorial](https://www.raywenderlich.com/5504-trigonometry-for-game-programming-spritekit-and-swift-tutorial-part-1-2)을 참조해주세요

이 메소드를 호출하면 두개의 레이어를 다시 그립니다. 이 메소드들을 사용하여 어떤 속성을 수정했을때 발생합니다. 

두 메소드가 업데이트 하는동안 모양 레이어(shape layer) 하나의 절대 설정하지 않는 속성에 의존하는걸 알고 있어야 합니다 - 즉, 모양 레이어읭 각 bounds 입니다. CAShapeLayer bounds를 설정하지 않았으므로, 현재 bounds는 0 입니다. 

`KnobRenderer`로 새로운 매소드를 추가합니다.

```swift
func updateBounds(_ bounds: CGRect) {
  trackLayer.bounds = bounds
  trackLayer.position = CGPoint(x: bounds.midX, y: bounds.midY)
  updateTrackLayerPath()

  pointerLayer.bounds = trackLayer.bounds
  pointerLayer.position = trackLayer.position
  updatePointerLayerPath()
}
```

위의 메소드는 사각형 bounds를 가지고, 레이어를 알맞게(match) 하기위해 사이즈를 재조정(resize)하고 사각형 경계의 중앙으로 레이어를 위치시킵니다. 경로의 영향을 주는 속성을 변경했을때, 반드시 `updateBounds(_:)` 메소드를 수동으로 호출해야 합니다. 

`renderer`가 완성되지 않았지만, 컨트롤의 진행 상황을 보여줄수 있을만큼 충분합니다. `renderer`의 인스턴스를 `Knob` 클레스에 속성으로 추가합니다. 

```swift
private let renderer = KnobRenderer()
```

`Knob`의 `commonInit()` 매소드를 다음과같이 교체합니다. 

```swift
private func commonInit() {
  renderer.updateBounds(bounds)
  renderer.color = tintColor
  renderer.setPointerAngle(renderer.startAngle, animated: false)

  layer.addSublayer(renderer.trackLayer)
  layer.addSublayer(renderer.pointerLayer)
}
```

위의 메소드를 knob rederer의 사이즈를 설정하고 그후 컨트롤의 레이어의 하위 레이어로서 두개의 레이어를 추가합니다.

앱을 빌드하고 실행합니다. 컨트롤은 다음과같이 보여집니다

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/04/Simulator-Screen-Shot-iPhone-8-2018-04-21-at-16.54.00.png" width="450"></center> <br> 

---

<div id='section-id-284'/>

## Exposing Appearance Properties in the API

현재, knob의 외형을 다루는 모든 속성이 개인적인 렌더러(private renderer)에 숨겨져 있습니다. 

개발자가 컨트롤의 외형 변경을 허용하려면 Knob 클레스에 다음 속성을 추가해야합니다.

```swift
var lineWidth: CGFloat {
  get { return renderer.lineWidth }
  set { renderer.lineWidth = newValue }
}

var startAngle: CGFloat {
  get { return renderer.startAngle }
  set { renderer.startAngle = newValue }
}

var endAngle: CGFloat {
  get { return renderer.endAngle }
  set { renderer.endAngle = newValue }
}

var pointerLength: CGFloat {
  get { return renderer.pointerLength }
  set { renderer.pointerLength = newValue }
}
```

네개의 속성은 렌더러의 속성에 대한 간단한 대리자(proxy) 입니다. 

새로운 API가 예상대로 동작하는지 테스트하려면 이 코드를 `ViewController.swift`의 `viewDidLoad()`의 끝에 추가하세요.

```swift
knob.lineWidth = 4
knob.pointerLength = 12
```

앱을 빌드하고 실행합니다. 설정한 값을 기반으로 증가한 라인의 두께, 포인터의 길이를 봐야합니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/04/Simulator-Screen-Shot-iPhone-8-2018-04-21-at-17.02.34.png" width="450"></center> <br> 

---

<div id='section-id-327'/>

## Setting the Control’s Value Programmatically

손잡이(the knob)는 실제로 아무것도 하지 않았습니다. 다음 단계에서 programmatic 상호작용에 응답하도록 컨트롤을 수정합니다 - 즉, 컨트롤의 값이 변경됬을때 입니다. 

현재, 컨트롤의 value는 `value` 속성이 직접적으로 수정되거나 `setValue(_:animated:)`이 호출될때 저장 됩니다. 하지만 `renderer`와 상호작용하지 않기 때문에, 컨트롤은 재 랜더링 하지 않습니다.

rederer는 값(`value`)에 대한 개념이 없습니다. 이것은 모두 각도에서 다룹니다. 값을 각도로 전환하고 renderer로 전달해야 하기 때문에 `Knob`에서 `setValue(_:animated:)`를 업데이트 해야합니다. 

`Knob.swift`에서 `setValue(_:anmated:)`를 다음의 코드로 교체합니다.

```swift
func setValue(_ newValue: Float, animated: Bool = false) {
  value = min(maximumValue, max(minimumValue, newValue))

  let angleRange = endAngle - startAngle
  let valueRange = maximumValue - minimumValue
  let angleValue = CGFloat(value - minimumValue) / CGFloat(valueRange) * angleRange + startAngle
  renderer.setPointerAngle(angleValue, animated: animated)
}
```

위의 코드는 최소 및 최대 값 범위를 최소및 최대 각도 범위에 맵핑하여 주어진 값에 대해 적절한 각도를 계산하고 렌더러의 `pointerAngle` 속성에 설정합니다. 

애니메이션의 값을 renderer로 전달했습니다. 하지만 이때 실제로 어떤것도 애니메이션 되지 않습니다. 우리는 나중에 이것을 고칩니다.

pointerAngle 속성이 업데이트 되긴하지만, 아직 컨트롤에 어떤 효과도 주지 않습니다. pointer angle가 설정되었을때, 포인터를 포함하는 레이어는 포인터가 움직이는 느낌을 주기위해 지정된 각도로 회전해야합니다. 

`setPointerAngle(_:animated:)`를 다음과같이 업데이트 합니다.

```swift
func setPointerAngle(_ newPointerAngle: CGFloat, animated: Bool = false) {
  pointerLayer.transform = CATransform3DMakeRotation(newPointerAngle, 0, 0, 1)

  pointerAngle = newPointerAngle
}
```

이렇게하면 레이어를 z축 주위로 지정된 각도만큼 회전하는 rotation transform이 생성됩니다. 

`CALayer`의 `transform` 속성은 `UIView`와 같은 `CGAffineTransform`이 아닌 `CATransform3D`를 전달해야합니다. 즉 - 3차원에서 변환(tnrasformations)을 수행할수 있습니다.


> CGAffineTransform은 3x3 행렬을 사용하고 CATransform3D는 4x4 행렬을 사용합니다; z축을 추가하려면 추가적인 값을 요구합니다. 이들의 핵심은 3D 변환은 단순한 행렬의 곱셈입니다. [이 위키피디아에서](https://en.wikipedia.org/wiki/Matrix_multiplication) 행렬곱셈에 대해 더 자세하세 읽을수 있습니다. 

변환이 잘 작동하는지 보려면 뷰 컨트롤러의 손잡이 컨트롤에 UISlider를 연결해야 합니다. 슬라이더를 조정하면 손잡이의 값이 변경될것입니다. 

UISlider는 이미 `HandlerValueChanged(_:)`에 연결되어있습니다. `ViewController.swift`를 열고 다음 코드를 매소드에 추가하세요

```swift
knob.setValue(valueSlider.value)
```

knob `value`는 슬라이드 될때 valueSlider에 일치하도록 설정됩니다. 

이제 빌드하고 실행합니다. UISlider의 값을 변경하고 아래에 보이는것 처럼 손잡이 컨트롤의 포인터가 알맞게 이동하는걸 볼수 있습니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/04/reusable-knob-slider-1.gif)

애니메이션을 아직 코딩하지 않았는데도 애니메이션으로 처리됩니다. 왜지..?

Core Animation은 조용히 암묵적으로 사용자를 대신하여(your behalf) 애니메이션을 호출합니다. CALayer 속성이 명확히 변할때 - 변환을 포함하고 - 레이어는 현재의 값에서 새로운 값으로 부드럽게 애니메이션 합니다. 

이제 시작에서 끝으로 빠르게 슬라이딩 합니다. 시계 방향으로 회전하는 대신 포인터가 트렉의 끝을 따라 반 시계방향으로 회전하여 하단으로 회전합니다. 

이를 해결하려면 애니메이션을 불능(disable)로 만들어야 합니다. `setPointerAngle(_:animated:)` 의 `CATransform3DMakeRotation`를 다음과 같이 교체하여 업데이트 합니다.

```swift
CATransaction.begin()
CATransaction.setDisableActions(true)

pointerLayer.transform = CATransform3DMakeRotation(newPointerAngle, 0, 0, 1)

CATransaction.commit()
```

`CATransaction`에서 레핑한 속성을 변경하고 상호작용을 위한 애니메이션을 불능으로 만들었습니다. 

다시 빌드하고 실행합니다. `UISlider`를 움직이면 손잡이가 즉각적으로 움직이고 예상대로 움직입니다. 

---

<div id='section-id-408'/>

## Animating Changes to the Control’s Value

현재, 이 `animated` 매개변수를 `true`로 설정하여도 컨트롤에는 아무런 효과가 없습니다. 이 기능을 사용하려면 , `setPointerAngle(_:animated:)`에서 `CATransform3DMakeRotation`호출 아래 `commit`이전에 다음 코드를 추가합니다.

```swift
if animated {
  let midAngleValue = (max(newPointerAngle, pointerAngle) - min(newPointerAngle, pointerAngle)) / 2 
    + min(newPointerAngle, pointerAngle)
  let animation = CAKeyframeAnimation(keyPath: "transform.rotation.z")
  animation.values = [pointerAngle, midAngleValue, newPointerAngle]
  animation.keyTimes = [0.0, 0.5, 1.0]
  animation.timingFunctions = [CAMediaTimingFunction(name: kCAMediaTimingFunctionEaseInEaseOut)]
  pointerLayer.add(animation, forKey: nil)
}
```

이제 `animated` 가 true일때 올바른 방향에서 회전하는 포인터 애니메이션을 명시적으로 생성합니다. 회전방향을 지정하려면, `keyframe animation`을 사용합니다. 이것은 단순히 시작 지점과 끝 지점 외에 몇가지 중간지점을 지정하는 애니메이션 입니다. 

`CAKeyFrameAnimation`을 만들고 속성이 애니메이션하게 지정하면 자체의 keypath로 `transform.rotation.z`의 z축 주위를 회전 하도록 지정합니다.

다음으로 `animation.value`에서 회전해야하는 레이어를 통한 3개의 각도를 지정합니다: 시작 지점, 중간 지점, 끝 지점. 이것들과 함께 `animation.KeyTimes`는 이러한 값에 도달하는 정규화된 시간(백분율로)을 지정합니다. 레이어에 애니메이션을 추가하면, 트랜잭션이 커밋되고 애니메이션이 시작됩니다. 
 
이 새로운 기능을 보려면, 노브의 값이 확 오르는게 필요합니다. 이렇게하려면 `임의값(Random Value)` 버튼으로 연결된 메소드를 구현하고 슬라이더 및 노브 컨트롤을 임의값으로 이동시킵니다.

`ViewController.swift`를 열고 `handleRandomButtonPressed(_:)`에 다음을 추가합니다.

```swift
let randomValue = Float(arc4random_uniform(101)) / 100.0
knob.setValue(randomValue, animated: animateSwitch.isOn)
valueSlider.setValue(Float(randomValue), animated: animateSwitch.isOn)
```

위는 0.00 에서 1.00 사이의 임의값을 생성하고 두 컨트롤에 값을 설정합니다. 그리고 `애니메이션 스위치`의 `isOn`속성을 검사하고 새로운값으로 트랜지션을 애니메이션 적용할지 말지를 결정합니다.

앱을 빌드하고 실행합니다. `animate` 스위치 토글이 on된 상태에서 `Random Value` 버튼을 몇차례 탭하고 `animate` 스위치 토글이 off 된상태에서 `Random Value`를 몇번 탭하면, `애니메이션된` 매개변수가 만드는 차이를 볼수 있습니다.

---

<div id='section-id-446'/>

## Updating the Label 

현재값으로 knob 오른쪽의 레이블을 채워(populate) 넣을것입니다. `ViewController.swift`를 열고 두개의 `@IBAction` 매소드 아래에 다음 매소드를 추가합니다.

```swift
func updateLabel() {
  valueLabel.text = String(format: "%.2f", knob.value)
}
```

이것은 knob control에 의해 선택된 현재 값을 나타냅니다. 다음으로 `handlerValueChanged(_:)`, `handleRandomButtonPressed(_:)` 두 매소드에서 방금 생성한 새로운 메소드 호출합니다.

```swift
updateLabel()
```
마지막으로 손잡이 값의 초기값과 레이블의 초기값을 슬라이더의 초기값으로 업데이트하고 앱이 시작했을때 이들을 동기화 되도록 합니다. `viewDidLoad()`끝 부분에 다음 코드를 추가합니다.

```swift
knob.setValue(valueSlider.value)
updateLabel()
```

앱을 빌드하고 실행합니다. 레이블이 올바른 값으로 보여지는지 몇가지 테스트를 이행합니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/04/reusable-knob-label.png" width="450"></center> <br> 

---

<div id='section-id-474'/>

## Responding to Touch Interaction

방금 만든 손잡이 컨트롤은 programmatic 상호작용만 하여서 UI컨트롤에는 유용하지 않습니다. 마지막 색션에서, 사용자화한 재스쳐 인식기를 사용하여 어떻게 상호작용하는 터치를 추가하는지 알아봅니다.

애플은 미리 정의된 tap, pan, pinch 제스쳐같은 제스쳐 인식기를 제공합니다. 그러나 컨트롤을 위해 필요한 한손가락 회전 처리를 위한 제스쳐 인식기는 존재하지 않습니다. 

`Knob.swift`의 끝에 다음 private 클레스를 추가합니다.

```swift
import UIKit.UIGestureRecognizerSubclass

private class RotationGestureRecognizer: UIPanGestureRecognizer {
}
```

이 사용자화된 재스쳐 인식기는 펜 제스쳐 인식기 처럼 행동할것입니다. 스크린의 한손가락 드레그를 추적하고 요구에 따라서 위치를 업데이트 합니다. 이러한 이유로, `UIPanGestureRecognizer`를 하위클레싱 했습니다. 

`import`는 어떤 제스쳐 인식기 매소드를 재정의 하려면 필요합니다. 

> Note: 일반적인 클레스 파일이 아닌 이러한 모든 private 클레스 파일을 Knob.swift에 추가하는것이 궁금할수 있습니다. 이 프로젝트의 경우, 이 간단한 컨트롤을 사용하길 원하는 누군가에게 파일을 쉽게 배포할수 있습니다.

`RotationGestureRecognizer` 클레스에 다음 속성을 추가합니다.

```swift
private(set) var touchAngle: CGFloat = 0
```

다음의 다이어 그램처럼, `touchAngle`는 제스쳐 인식기가 부착된 뷰의 중앙에 현재 터치 지점과 연결된 선의 터치 각도를 나타냅니다. 

![](/assets/post_img/posts/Custom-Control-2.png)

`UIGestureRecognizer`를 하위클레싱할때 흥미로운 세개의 매소드가 있습니다: 이들은 터치가 시작될때, 터치 하고있을때, 터치가 끝날때를 나타냅니다. 앱에서는 터치가 스크린에서 시작할때와 움직일때를 집중합니다.

`RotationGestureRecognizer`에 다음 두가지 매소드를 추가합니다.

```swift
override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent) {
  super.touchesBegan(touches, with: event)
  updateAngle(with: touches)
}

override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent) {
  super.touchesMoved(touches, with: event)
  updateAngle(with: touches)
}
```

이 두 메소느는 `super equivalent`를 호출하고 다음에 추가할 유용한 함수를 호출합니다. 

```swift
private func updateAngle(with touches: Set<UITouch>) {
  guard 
    let touch = touches.first, 
    let view = view 
  else {
    return
  }
  let touchPoint = touch.location(in: view)
  touchAngle = angle(for: touchPoint, in: view)
}

private func angle(for point: CGPoint, in view: UIView) -> CGFloat {
  let centerOffset = CGPoint(x: point.x - view.bounds.midX, y: point.y - view.bounds.midY)
  return atan2(centerOffset.y, centerOffset.x)
}
```

`updateAngle(with:)`는 터치 모음(set)을 가지고 있고 그중 첫번째를 추출합니다. `location(in:)`을 사용하여 제스쳐 인식기와 함께 연관된 뷰의 시스템 좌표계로 변환(coordinate) 합니다. 그런다음 `angle(for:in:)`을 사용하여 `touchAngle` 속성을 업데이트 합니다. 간단한 기하학을 사용하여 아래와 같이 각도를 찾습니다.

![](/assets/post_img/posts/Custom-Control-3.png)

`x`와 `y`는 터치 컨트롤 내의 수평, 수직 터치 포인트 위치를 나타냅니다. 회전의 탄젠트(The tangent), 즉 - 터치 각은 `height / width` 와 같습니다. `touchAngle`를 계산하면 다음 길이를 설정해야합니다

- `h = y - (view height) / 2.0`(각은 시계방향 으로부터 증가해야합니다)
- `w = x - (view width) / 2.0`

`angle(for:in:)`은 이 계산을 이행하고, 각 값을 반환합니다

> Note: 이 수학이 익숙하지 않다면, [Trigonmoerty for Game Programming 튜토리얼](https://www.raywenderlich.com/5504-trigonometry-for-game-programming-spritekit-and-swift-tutorial-part-1-2)을 참조해주세요.

마지막으로, 제스쳐 인식기는 원터치로 작업해야합니다. 다음 초기화를 클레스에 추가합니다.

```swift
override init(target: Any?, action: Selector?) {
  super.init(target: target, action: action)

  maximumNumberOfTouches = 1
  minimumNumberOfTouches = 1
}
```

---

<div id='section-id-567'/>

## Wiring Up the Custom Gesture Recognizer

다음으로 사용자화된 제스쳐 인식기를 완성했습니다. 손잡이 컨트롤에 연결 해야합니다.

`Knob`에서, `commonInit()`에 다음을 추가합니다. 

```swift
let gestureRecognizer = RotationGestureRecognizer(target: self, action: #selector(Knob.handleGesture(_:)))
addGestureRecognizer(gestureRecognizer)
```

이것은 제스쳐 인식기를 생성하고, 활성화 되었을때 `Knob.handleGesture(_:)` 호출을 지정합니다. 그후 뷰에 추가합니다. 이제 이 함수의 행동을 구현합니다.

`Knob`로 다음 매소드를 추가합니다.

```swift
@objc private func handleGesture(_ gesture: RotationGestureRecognizer) {
  // 1
  let midPointAngle = (2 * CGFloat(Double.pi) + startAngle - endAngle) / 2 + endAngle
  // 2
  var boundedAngle = gesture.touchAngle
  if boundedAngle > midPointAngle {
    boundedAngle -= 2 * CGFloat(Double.pi)
  } else if boundedAngle < (midPointAngle - 2 * CGFloat(Double.pi)) {
    boundedAngle -= 2 * CGFloat(Double.pi)
  }
  
  // 3
  boundedAngle = min(endAngle, max(startAngle, boundedAngle))

  // 4
  let angleRange = endAngle - startAngle
  let valueRange = maximumValue - minimumValue
  let angleValue = Float(boundedAngle - startAngle) / Float(angleRange) * valueRange + minimumValue

  // 5
  setValue(angleValue)
}
```

이 메소드는 사용자화한 제스쳐 인식기에서 각도를 추출하고 손잡이 컨트롤의 각으로 표현된값으로 변환합니다. 그후 값을 설정하고 UI 업데이트를 실행합니다.

위의 코드에서 무슨일이 일어나느지에 대한 설명입니다.

1. 시작과 끝 각도 사이의 중간 지점을 나타나는 각도를 계산합니다. 이 각은 손잡이 트렉 일부의 각이 아니고, 최대값과 최소값 사이의 전환해야하는 지점의 각도를 대신 나타냅니다. 
2. 제스쳐 인식기에서 계산한 각도는 역 탄젠트 함수를 사용하기 때문에 `-π 와 π`사이입니다. 그러나 트랙에 필요한 각도는 `시작 각도`와 `끝 각도` 사이에서 지속적이어야 합니다. 따라서 새로운 `boundedAngle` 변수를 만들어 허용 범위 내에 있도록 변수를 조정합니다. 
3. 지정된 각의 bounds 내부에 위치 시키고 `boundedAngle`를 갱신합니다. 
4. `setValue(_:animated:)`에서 쉽게 변환한 것처럼 각을 값으로 변환합니다. 
5. 계산된 값을 knob 컨트롤러의 값으로 설정합니다.

앱을 빌드하고 실행합니다. 동작중인 제스쳐 인식기를 보려면 손잡이 컨트롤을 돌려보세요. 포인터는 손가락으로 컨트롤 주위를 움직일때 따라서 움직입니다.

---

<div id='section-id-621'/>

## Sending Action Notifications

포인터를 움직이면 `UISlider`가 업데이트 되지 않습니다. `UIControl`의 고유한 부분인 [target-action](https://developer.apple.com/library/archive/documentation/General/Conceptual/CocoaEncyclopedia/Target-Action/Target-Action.html) 패턴을 사용하여 이를 연결합니다.

`ViewController.swift`를 열고 `viewDidLoad()`끝에 다음 코드를 추가합니다.

```swift
knob.addTarget(self, action: #selector(ViewController.handleValueChanged(_:)), for: .valueChanged)
```

값 변경(`value-changed`) 이벤트를 위해 듣고 있습니다.

이제 `handlerValueChanged(_:)`를 다음과같이 변경합니다. 

```swift
if sender is UISlider {
  knob.setValue(valueSlider.value)
} else {
  valueSlider.value = knob.value
}
updateLabel()
```

사용자가 손잡이의 값을 변경하면 슬라이더를 업데이트합니다. 슬라이더가 변경되면 손잡이를 업데이트 합니다. 두 경우 모두 레이블을 계속 업데이트 해야합니다. 

앱을 빌드하고 실행합니다. 손잡이 주위를 움직이고.. 아무것도 변경되지 않습니다. 실제로 손잡이 컨트롤내에서 이벤트를 발행하지(fired) 하지 않았습니다.

이것을 고치려면 `Knob`클레스 내부에 `handleGesture(_:)`에 다음 코드를 추가합니다.

`isContinuous`가 `true`이면 이벤트는 매시간 제스쳐가 업데이트 되면 이벤트를 발행해야 하기 때문에 `sendActions(for:)`을 호출합니다. 

`isContinuous`가 `false`이면, 이벤트는 제스쳐가 끝나거나, 취소되었을때 발행해야 합니다. 

컨트롤은 값 변경에만 관련되기 때문에 처리해야하는 유일한 이벤트는 `UIControlEvents.valueChanged` 입니다.

다시 빌드하고 실행합니다. 손잡이를 다시 한번 움직이면 손잡이의 값과 일치하도록  `UISlider`가 이동합니다.

https://koenig-media.raywenderlich.com/uploads/2018/04/final_navigation.gif

---

<div id='section-id-662'/>

## Where to Go From Here?

축하합니다. 손잡이 조절기가 완벽하게 작동하고 앱에서 사용할수 있습니다. 

하지만 아직 컨트롤을 향상시킬수있는 방법이 많이 남아있습니다. 

- 컨트롤 외형에 추가 구성 옵션을 추가하세요 - 포인터에 이미지를 사용할수 있습니다. 
- 첫번재 터치가 포인터의 붙어 있다면 유저는 컨트롤과 상호작용 할수 있어야합니다. 
- 현재 노브 컨트롤의 크기를 조정하면 레이어가 다시 렌더링 되지 않습니다. 몇줄의 코드만으로 이 기능을 추가할수 있습니다. 

