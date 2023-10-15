---
layout:     post
title:      "Core Graphics Tutorial Part 1: Getting Started"
subtitle:   "Core Graphics가 무엇인지 알아봅니다 "
date:       2018-10-04 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich, CoreGraphics, Trigonometry]
categories: archive
permalink: /archive/:title
---

[Core Graphics Tutorial Part 1: Getting Started](https://www.raywenderlich.com/411-core-graphics-tutorial-part-1-getting-started)을 의역 했습니다.

---

## Table of contents 

  - [<U>Core Graphics Tutorial Part 1: Getting Started</U>](#section-id-16)
  - [<U>Introducting Flo - One glass at a time</U>](#section-id-32)
  - [<U>Getting Started</U>](#section-id-49)
  - [<U>Custom Drawing on Views</U>](#section-id-61)
  - [<U>Auto Layout Constraints</U>](#section-id-86)
  - [<U>Drawing the Button</U>](#section-id-113)
  - [<U>Behind the Scenes in Core Graphics</U>](#section-id-152)
  - [<U>@IBDesignable – Interactive Drawing</U>](#section-id-173)
  - [<U>Drawing Into the Context</U>](#section-id-215)
  - [<U>Points and Pixels</U>](#section-id-293)
  - [<U>@IBInspectable – Custom Storyboard Properties</U>](#section-id-354)
  - [<U>A Second Button</U>](#section-id-483)
  - [<U>Arcs with UIBezierPath</U>](#section-id-516)
  - [<U>Impromptu Math Lesson</U>](#section-id-573)
  - [<U>Back to Drawing Arcs</U>](#section-id-599)
  - [<U>Outlining the Arc</U>](#section-id-661)
  - [<U>Making it All Work</U>](#section-id-721)
  - [<U>Where to Go From Here?</U>](#section-id-793)

---

<div id='section-id-16'/>

## Core Graphics Tutorial Part 1: Getting Started 

Core Graphics 의 첫번째 튜토리얼에서, Core Graphics로 완벽한 픽셀 뷰(pixel-perfect)를 설계하는 방법을 배우고, 어떻게 Xcode의 스토리보드에서 상호작용하여 사용하는지에 대해서 배웁니다.

> 이 튜토리얼은 iOS 11, Swfit 4, Xcode9로 업데이트 되었습니다.

앱을 마무리하고 잘 동작한다고 상상 하지만 인터페이스는 스타일이 부족합니다. 포토샵에서 사용자화한 컨트롤 이미지를 몇개의 사이즈로 그릴수 있고 애플은 @4x 레티나 스크린 이미지가 나오는걸 원하지 않습니다. Core Graphics를 사용하여 모든 디바이스 사이즈를 위한 적절하게 축절되는 이미지를 코드로 만들수 있습니다. 

Core Graphics 는 애플의 벡터 드로잉 프레임 워크입니다. 강력하고, 배울것들이 많이 있습니다. 하지만 두려워할 필요없습니다. 3개의 시리즈가 간단한 작업으로 쉽게 시작할수 있게 만들어 줄것이며, 결국에는 멋진 그래픽을 앱에서 사용할 준비가 될것입니다.  

이것은 Core Graphics를 가르치기 위한 현대적인 접근 방식의 새로운 시리즈입니다. 이 시리즈는 또한 `@IBDesginable`, `@IBInspectable`들과 같은 기능을 포함하고 있어 Core Graphics를 쉽고 재미있게 배울수 있습니다. 

시작할 시간입니다.

---

<div id='section-id-32'/>

## Introducting Flo - One glass at a time 

음료 습관을 추적하는 완성된 앱을 생성할것입니다. 

특히, 물을 얼마나 마시는지 쉽게 추적할수 있습니다. `그들은(They)` 하루에 8잔의 물을 마시는것이 건강하다고 말하지만, 몇잔을 마신 이후에 얼마나 마셨는지 까먹기 쉽습니다. 이곳이 `Flo`가 필요한 곳입니다. 상쾌한 물한잔을 마실때마다 카운터를 누릅니다. 또한 지난 7일간의 소비 그래프를 볼수 있습니다. 

<center><img src="https://koenig-media.raywenderlich.com/uploads/2014/12/1-CompletedApp.gif" width="350"></center> <br> 


이 시리즈의 첫번째 부분에서 UIKit의 드로잉 매소드를 사용하는 3개의 컨트롤을 생성할것입니다. 

그후 두번째 시리즈에서 Core Graphics contexts, 그래프를 그리는걸을 깊게 알아봅니다. 

세번째 시리즈에서 무늬가 있는배경(patterned background), 직접 만든 Core Graphics 메달을 수여합니다.

---

<div id='section-id-49'/>

## Getting Started 

가장 먼저 해야할일은 Flo 앱을 만드는 것입니다. 여기는 다운로드 할것이 없습니다. 왜냐하면 처음부터 빌드 한다면 더 많은것을 배울수 있기 때문입니다. 

새로운 프로젝트를 생성하세요. 

프로젝트 옵션을 작성하고, Product 이름은 Flo, 언어는 Swift 입니다.

![](/img/posts/CoreGraphics-0.png)

---

<div id='section-id-61'/>

## Custom Drawing on Views 

사용자화한 drawing을 위한 3가지 단계가 있습니다.

1. `UIView` 서브 클레싱 생성 
2. `draw(_:)` 오버라이드, Core Graphics drawing code 추가
3. 3단계는 없습니다.

아래와 같이, 사용자화하여 그려진 더하기 버튼만드는것에 의해서 테스트해봅니다. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-AddButtonFinal.png)

새로운 파일을 만들고 `iOS/Source/Cocoa Touch Class`를 선택하고 클레스이름을 `PushButton`으로 지정하고 `UIButton`의 하위 클레스로 선언합니다. 

`UIButton`은 `UIView`의 하위 클레스이고, 또한 `draw(_:)`와 같은 `UIView`의 모든 매소드또한 `UIButton`에서 사용가능합니다. 

`Main.stroyboard`에서 `Document Outline`에서 버튼을 선택하고, `UIButton`을 view controller의 view로 드레그 합니다. 

`Identify Inspector`에서, pushButton으로 클레스를 변경합니다. 

<center><img src="/img/posts/CoreGraphics-1.png" width="300"></center> <br> 


---

<div id='section-id-86'/>

## Auto Layout Constraints 

이제 오토레이아웃 제약조건을 설정합니다.(지침은 다음과 같습니다)

![](/img/posts/CoreGraphics-2.gif)

1. 현재 버튼 크기로 `Width`를 설정합니다
2. 현재 버튼 크기로 `Height`를 설정합니다
3. `Vertically in container`를 설정합니다 
4. `Horizontally in container`를 설정합니다. 

이렇게 하면 4가지 필수 오토레이아웃 제약 조건이 생성됩니다.  `Size Inspector`에서 다음과같이 보여집니다.

<center><img src="/img/posts/CoreGraphics-3.png" width="300"></center> <br> 


`Align center Y`의 `Edit`을 클릭하여 제약조건 값을 `100`을 줍니다. `Width`, `Height`도 `100`의 값을 줍니다. 그러면 다음 처럼 보여야합니다.

<center><img src="/img/posts/CoreGraphics-4.png" width="400"></center> <br> 

`Attributes Inspector`에서 `Button`타이틀을 삭제합니다.

<center><img src="/img/posts/CoreGraphics-5.png" width="400"></center> <br> 


---

<div id='section-id-113'/>

## Drawing the Button

버튼을 원형으로 만들려는 생각을 합니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-AddButtonFinal.png)

Core Graphics에서 형태(shape)를 그리려면, Core Graphics에서 그려야할 선(line to trace)(더하기의 2개의 직석) 또는 채워야할 선(line to fill)을 알려주는 `경로(path)`를 정의합니다. Illustrator, Photoshop의 백터 형태가 익숙하다면, 쉽게 경로(paths)를 이해할수 있습니다. 

`paths`에 대해 알아야할 3가지 기본 지식이 있습니다.
 
- `path`는 칠하고(stroked), 채울수(filled) 있습니다.
- `stroke`는 현재 획 색상에 path의 윤곽을 나타냅니다. 
- `fill`은 현재 채울 색상으로 닫힌 경로를 채웁니다.

Core Graphics path를 만드는 가장 쉬운 방법은 편리한 `UIBezierPath`라는 편리한 클레스를 호출 하는것입니다. 선, 곡선, 사각형, 연결된 점 기반으로 경로를 만들지 여부에 관계없이 유저에게 친숙한 API로 쉽게 paths를 생성할수 있게 합니다. 

`UIBezierPath`를 사용하여 path생성하고 초록색으로 채웁니다. 이렇게 하려면 `PushButton.swift`를 열고 다음 메소드를 추가합니다.

```swift
override func draw(_ rect: CGRect) {
  let path = UIBezierPath(ovalIn: rect)
  UIColor.green.setFill()
  path.fill()
}
```

먼저 전달된 사각형 사이즈의 타원형 모양인 `UIBezierPath`를 생성합니다. 이 경우에, 버튼이 스토리보드에서 100x100 버튼의 크기로 정의 했기 때문에 `타원형(oval)`은 실제로 원(circle) 입니다. 

paths 그 자체는 아무것도 그리지 않습니다. 사용가능한 그리기 컨택스트 없이 paths를 정의할수 있습니다. 경로(path)를 그리려면, 현재 컨텍스트(아래에서 자세히 설명)에서 채우기(fill) 색상을 설정하고 경로(path)를 채웁니다.

애플리케이션을 빌드하고 실행하면 녹색원이 표시됩니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-SimGreenButton2.png)

지금까지 사용자화한 뷰를 만드는것이 얼무나 쉬운지 알았습니다. 
`UIButton`하위 클래스를 생성하고, `draw(_:)`메소드를 오버라이드하고 스토리보드에서 `UIButton`을 추가하면 됩니다.

---

<div id='section-id-152'/>

## Behind the Scenes in Core Graphics

각 뷰는 graphics context를 가지고 있으며, 뷰의 모든 그리기는 장치의 하드웨어로 전송되기 이전에 이 컨텍스트로 랜더링 됩니다. 

iOS는 뷰에 업데이트가 필요할때마다 `draw(_:)`를 호출하여 컨텍스트(context)를 업데이트합니다. 혹은 다음상황에서도 발생합니다. 

- 스크린으로 향한 이 뷰는 새로운 것입니다.
- 상위의 다른 뷰들이 움직였을때 
- 뷰의 `hidden`속성이 변경 되었을때
- 앱이 명시적으로 뷰에서 `setNeedsDisplay()`, `setNeedsDisplayInRect()`를 호출했을때

> Note: `draw(_:)`에서 어떤 뷰의 그리기가 완료하면 뷰의 graphics context로 들어갑니다. 눈치 챘겠지만 `draw(_:)`의 외부에서 그리기를 시작하고 싶다면, 이 튜토리얼의 마지막 부분에서 독자적인 graphics context를 만들어야합니다. 

이 튜토리얼에서 아직 Core Graphics를 사용하지 않았습니다. 왜냐하면 UIKit은 레핑한 많은 Core graphics 함수를 가지고 있기 때문입니다. 예를들면 `UIBezierPath`는  Core Graphics 저수준 API인 `CGMutablePath`를 감싼 레퍼입니다. 

> Note: 절대로 `draw(_:)`를 직접적으로 호출하지마세요. 만약, 뷰가 업데이트 되지 않았다면 뷰의 `setNeedsDisplay()`를 호출하세요 .
> 
> `setNeedsDisplay()`는 자신의 `draw(_:)`를 호출하지 않지만, 뷰를 깨끗하지 않게(dirty) 표시하고, 다음 화면의 업데이트 사이클에서`draw(_:)`를 사용하여 다시 그리기를 시작합니다(trggering). `setNeedsDisplay()`를 동일한 메소드에서 다섯번 호출하더라도, 실제로 `draw(_:)`는 한번만 호출됩니다. 

---

<div id='section-id-173'/>

## @IBDesignable – Interactive Drawing

path를 그리는 코드를 작성하고 애플리케이션을 실행하여 모양이 어떻게 보이는지 확인하는것은 페인트를 말리는걸 보는 것만큼 흥미로울수 있지만(?) 다른 선택사항이 있습니다. 라이브 렌더링을 사용하면 뷰가 자신의 `draw(_:)` 메소드를 실행하여 스토리 보드에 더 정확하게 그릴 수 있습니다. 스토리 보드는 `draw(_:)`에서 변경을 즉각적으로 업데이트 합니다. 필요한 것은 하나의 속성뿐입니다!

PushButton.swift에서 클레스 선언 바로 앞에 다음을 추가합니다.

```swift
@IBDesignable
```

이것은 라이브 랜더링에 필요한 모든것입니다. `Main.storybard`로 돌아가서 이전에 빌드하고 실행했을때처럼 버튼이 녹색 원을 보여주는지 확인하세요. 

이제, 스토리 보드와 코드가 나란히 배치되도록 화면 설정하세요. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-Breadcrumbs.png)

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-DocumentOutline.png)

모든것을 끝냈을때, 스크린은 다음과같이 보입니다.

![](/img/posts/CoreGraphics-6.png)

pushButton의 `draw(_:)`에서 다음 코드를 

```swift
UIColor.green.setFill()
```

다음과 같이 변경합니다

```swift
UIColor.blue.setFill()
```

그러면 스토리 보드의 변경 사항을 즉시 볼수 있습니다. 

![](/img/posts/CoreGraphics-7.png)

이제 플러스 표시를 위한 줄을 그릴것입니다.

---

<div id='section-id-215'/>

## Drawing Into the Context 

Core Graphics는 `painter's model`을 사용합니다. context를 그릴때, 거의 실제 그림을 그리는 것과 같습니다. `path`를 그리고, 그걸 채우고, 위에 또다른 path를 그리고 다시 그걸 채우고, 놓은(have benn laid down) 픽셀은 변경할수 없지만 그 위에 `칠할수(paint)` 있습니다. 

Apple의 문서에 있는 이 이미지는 어떻게 작동하는지 설명합니다. 캔버스에 그림을 그리는것과 같이 그리는 순서가 중요합니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-PaintersModel.gif)

플러스 기호는 파란색 원 위에 표시되므로 먼저 파란색 원을 코딩하고 플러스 기호를 코딩합니다. 

플러스 기호를 위한 2개의 사각형을 그릴수 있지만, path를 그리고 원하는 두께로 칠하는것이 더 쉽습니다. 

다음 구조체를 추가하고 PushButton 내부에 다음 상수를 추가합니다.

```swift
private struct Constants {
  static let plusLineWidth: CGFloat = 3.0
  static let plusButtonScale: CGFloat = 0.6
  static let halfPointShift: CGFloat = 0.5
}
  
private var halfWidth: CGFloat {
  return bounds.width / 2
}
  
private var halfHeight: CGFloat {
  return bounds.height / 2
}
```

이제 `draw(_:)`매소드의 끝에 이 코드를 추가하여 더하기 기호의 플러스의 수평선을 그립니다.

```swift
//set up the width and height variables
//for the horizontal stroke
let plusWidth: CGFloat = min(bounds.width, bounds.height) * Constants.plusButtonScale
let halfPlusWidth = plusWidth / 2

//create the path
let plusPath = UIBezierPath()

//set the path's line width to the height of the stroke
plusPath.lineWidth = Constants.plusLineWidth

//move the initial point of the path
//to the start of the horizontal stroke
plusPath.move(to: CGPoint(
  x: halfWidth - halfPlusWidth,
  y: halfHeight))

//add a point to the path at the end of the stroke
plusPath.addLine(to: CGPoint(
  x: halfWidth + halfPlusWidth,
  y: halfHeight))

//set the stroke color
UIColor.white.setStroke()

//draw the stroke
plusPath.stroke()
```

이 블록에서, `UIBezierPath`를 설정하고, 시작 위치(원의 왼쪽)를 주고 끝 지점으로(원의 오른쪽) 그립니다. 그런 다음 흰색으로 path의 윤곽을 칠합니다. 이 시점에서 스토리 보드에 다음과 같이 표시됩니다. 

스토리 보드에서 중간에 파란색 원과 흰색 대시가 나타납니다.

![](https://koenig-media.raywenderlich.com/uploads/2015/01/Dash.png)

> Note: path는 단순히 점들로 구성된다는걸 기억하세요. 여기 개념을 쉽게 이해하기 위한 방법: path를 그릴때 손에 pen이 있다고 상상하세요. 페이지에 두개의 점을 찍고 시작점에 팬을 위치하고 다음 포인트로 선을 그립니다. 
> 
> 본질적으로 위의 설명한것은 `move(to:)`, `addLine(to:)`를 사용하여 수행한 작업입니다. 

이제 iPad 2 또는 iPhone 6Plus 시뮬레이터에서 애플리케이션을 실행하면 dash가 선명하지 않은 것을 알수 있습니다. 옅은 파란색 선이 해당 대쉬를 둘러싸고 있습니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-PixelledLine.png)

---

<div id='section-id-293'/>

## Points and Pixels

첫 아이폰 시대로 되돌아가면, points와 pixels은 같은 공간에서 사용되었고 같은 크기여서 기본적으로 같은 것 이었습니다. Retina 아이폰의 등장으로 같은 수의 points 화면에 4개의 픽셀이 자리하게 되었습니다. 

비슷하게 iPhone 6+는 같은 points에 대해 픽셀의 양을 증가시켰습니다.

> Note: 이 개념은: 실제 하드웨어의 픽셀은 다를수 있습니다. 예를들어 3x 랜더링 후에, iPhone 6+는 화면에 전체 이미지를 보여주기 위해 `downsamples`합니다. iPhone 6+에 다운 downsamples 대해 더 알아보려면 [여기](https://www.paintcodeapp.com/news/iphone-6-screens-demystified)를 확인하세요

여기 12x12 픽셀의 격자는 회색과 흰색의 points로 표시됩니다. 첫번째(iPad 2)는 포인트를 픽셀로 직접 맵핑합니다. 두번째(iPhone 6)는 2x retina 화면으로 4개의 픽셀이 포인트에 맵핑되고, 세번째(iPhone 6+)는 3x retina 화면으로 9개의 픽셀이 한개의 점에 맵핑됩니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-Pixels.png)

우리가 방금 그린 라인은 3포인트 높습니다. path의 중심에서 부터 선을 그리기 때문에 path의 라인 중심 양쪽에 1.5 points가 그려집니다.

이 그림은 각 장치에 3point 선을 그리는걸 보여줍니다. iPad 2와 iPhone 6+를 사용하면 화소의 반 단위로 그려지는 선을 볼수 있습니다 - 물론 그걸 눈으로 볼수는 없습니다. 따라서 iOS `anti-aliases`은 절반이 채워진 픽셀을 두 색상 사이의 색상 절반으로 표시하며 선을 흐리게 보이게 만드는 것입니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-PixelLineDemonstrated.png)

사실, iPhone 6+는 많은 픽셀을 가지고 있기 때문에 이것을 확인해야 하지만 아마 흐릿함을 알아채지 못할것입니다. 그러나 iPad 2, iPad mini 와같이 레티나가 아닌 화면을 개발한다면, anti-aliasing을 방지하기 위해 가능한 모든 조치를 취해야합니다. 

이상한 크기의 직선이 있는 경우 aniti-aliasing을 방지하기 위해 0.5 포인트 추가하거나 빼주어야 합니다. 위의 다이어그램을 보면 iPad 2의 절반이 iPhone 6보다 위로, iPhone6+ 에서는 한픽셀 반 정도가 됩니다. 

`draw(_:)`에서 `move(to:)`, `addLine(to:)` 코드를 다음과같이 교체합니다

```swift
//move the initial point of the path
//to the start of the horizontal stroke
plusPath.move(to: CGPoint(
  x: halfWidth - halfPlusWidth + Constants.halfPointShift,
  y: halfHeight + Constants.halfPointShift))
    
//add a point to the path at the end of the stroke
plusPath.addLine(to: CGPoint(
  x: halfWidth + halfPlusWidth + Constants.halfPointShift,
  y: halfHeight + Constants.halfPointShift))
```

이제 iOS는 path를 반 point로 이동하기(shifting) 때문에 세 기기 모두에서 선을 선명하게 랜더링 합니다.

> Note: 픽셀이 완벽한 선의 경우, 선 대신 `UIBezierPath(rect:)`로 그릴수 있으며, 뷰의 `contentScaleFactor`를 사용하여 사각형의 넓이와 높이를 계산할수 있습니다. Path의 중심에서 바깥쪽을 그리고 stroke와 다르게, path의 내부만을 그립니다. 

`draw(_:)`에서 stroke color를 설정하기 이전에 앞의 두줄 코드 직후에 플러스의 세로 획을 추가하세요. 이미 플러스의 수평선을 그렸기 때문에, 이것을 스스로 할 방법을 알아낼수 있습니다.

```swift
plusPath.move(to: CGPoint(
  x: halfWidth + Constants.halfPointShift,
  y: halfHeight - halfPlusWidth + Constants.halfPointShift))
      
plusPath.addLine(to: CGPoint(
  x: halfWidth + Constants.halfPointShift,
  y: halfHeight + halfPlusWidth + Constants.halfPointShift))
```

> 본질적으로 버튼의 수평선과 같은 코드입니다. 

스토리보드에서 라이브로 랜더링하는걸 봐야합니다. 플러스 버튼을 위해 그리는걸 완성합니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-FinishedPlus.png)

---

<div id='section-id-354'/>

## @IBInspectable – Custom Storyboard Properties

사용자는 버튼이 필요한것보다 더 많이 누를수 있습니다. 따라서 마이너스 버튼을 제공해야합니다. 

마이너스 버튼은 수직 막대기가 없고 다른 색상이 다른걸 제외하면 더하기 버튼과 동일 합니다. 마이너스 버튼에 대해 동일한 `PushButton`클레스를 사용하고 스토리 보드에 추가할때 버튼의 종류와 색상을 선언합니다. 

`@IBInspectable`은 Interface Builder에서 읽을수 있는 속성을 추가할수 있는 속성입니다. 즉 코드 대신 스토리 보드에서 버튼의 색상을 구성할수 있습니다. 

PushButton 클레스의 맨 위에 다음 두가지 속성을 추가합니다.

```swift
@IBInspectable var fillColor: UIColor = UIColor.green
@IBInspectable var isAddButton: Bool = true
```

`draw(_:)`아래에서 색상을 채우는 코드를 

```swift
UIColor.blue.setFill()
```

다음과 같이 변경합니다.

```swift
fillColor.setFill()
```

스토리 보드의 뷰에서 버튼은 green 색상으로 변경됩니다.

if 문을 사용하여 `draw(_:)`의 수직선 코드를 둘러 쌉니다.

```swift
//Vertical Line

if isAddButton {
  //vertical line code move(to:) and addLine(to:)
}
//existing code
//set the stroke color
UIColor.white.setStroke()
plusPath.stroke()
```

이렇게하면 `isAddButton`이 설정된 경우에만 새로선을 그립니다.  버튼이 플러스 또는 마이너스 버튼이 될수 있습니다. 완성된 `PushButton`은 다음과 같습니다.

```swift
@IBDesignable
class PushButton: UIButton {
  
  private struct Constants {
    static let plusLineWidth: CGFloat = 3.0
    static let plusButtonScale: CGFloat = 0.6
    static let halfPointShift: CGFloat = 0.5
  }
  
  private var halfWidth: CGFloat {
    return bounds.width / 2
  }
  
  private var halfHeight: CGFloat {
    return bounds.height / 2
  }
  
  @IBInspectable var fillColor: UIColor = UIColor.green
  @IBInspectable var isAddButton: Bool = true
  
  override func draw(_ rect: CGRect) {
    let path = UIBezierPath(ovalIn: rect)
    fillColor.setFill()
    path.fill()
    
    //set up the width and height variables
    //for the horizontal stroke
    let plusWidth: CGFloat = min(bounds.width, bounds.height) * Constants.plusButtonScale
    let halfPlusWidth = plusWidth / 2
    
    //create the path
    let plusPath = UIBezierPath()
    
    //set the path's line width to the height of the stroke
    plusPath.lineWidth = Constants.plusLineWidth
    
    //move the initial point of the path
    //to the start of the horizontal stroke
    plusPath.move(to: CGPoint(
            x: halfWidth - halfPlusWidth + Constants.halfPointShift,
            y: halfHeight + Constants.halfPointShift))
        
    //add a point to the path at the end of the stroke
    plusPath.addLine(to: CGPoint(
            x: halfWidth + halfPlusWidth + Constants.halfPointShift,
            y: halfHeight + Constants.halfPointShift))

    if isAddButton {
      //move the initial point of the path
      //to the start of the horizontal stroke
      plusPath.move(to: CGPoint(
        x: halfWidth - halfPlusWidth + Constants.halfPointShift,
        y: halfHeight + Constants.halfPointShift))
      
      //add a point to the path at the end of the stroke
      plusPath.addLine(to: CGPoint(
        x: halfWidth + halfPlusWidth + Constants.halfPointShift,
        y: halfHeight + Constants.halfPointShift))
    }
    
    //set the stroke color
    UIColor.white.setStroke()
    plusPath.stroke()
  }
}
```

스토리보드에서 push button view를 선택하세요. `@IBInspectable`과 함께 선언된 속성이 Attributes Inspector의 상단에 나타납니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-InspectableFillColor.png)

`Fill Color`을 `RGB(87, 218, 213)`으로 변경하고, `Is Add Button`을 `off`로 변경하세요. 

![](/img/posts/CoreGraphics-8.png)

그러면 스토리보드에서 즉각적인 변경을 볼수 있습니다. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-InspectableMinusButton.png)

멋지지 않나요? 이제 `Is Add Button`을 `on`으로 되돌리고 플러스 버튼으로 되돌립니다.

---

<div id='section-id-483'/>

## A Second Button 

새로운 UIButton을 스토리보드에 추가하고 선택하세요. 이전과 마찬가지로 PushButton을 선택합니다.

<center><img src="/img/posts/CoreGraphics-9.png" width="500"></center> <br> 


녹색 플러스 버튼은 이전 플러스 버튼 아래에 그려집니다. 

Attributes Inspector 에서 `Fill Color`을 RGB(238, 77, 77)로 변경하고 `is Add Button`을 `off`로 변경하세요.

기본 타이틀을 제거하세요.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-MinusButtonColor.png)

제약조건을 추가합니다. 

- Width 에 50을 
- Height 에 50을 
- Center Horizontally in Safe Area 설정
- 첫번쨰 push 버튼의 하단에 top 설정을 합니다. 

제약조건이 추가된 이후에 다음과같이 보여야합니다. 

<center><img src="/img/posts/CoreGraphics-10.png" width="300"></center> <br> 

애플리케이션에서 빌드하고 실행하세요. 이제 모든 앱에서 추가, 제사용할수 있는 사용자화한 뷰가 생겼습니다. 모든 크기의 장치에 선명하고 분명합니다. 지금보는 시뮬레이터는 iPhone 4S 입니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2014/12/1-SimPushButtons.png" width="300"></center> <br> 


---

<div id='section-id-516'/>

## Arcs with UIBezierPath

다음으로 생성할 사용자화된 뷰는 이렇습니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-CompletedCounterView.png)

이것은 채워진 형태(filled shape)처럼 보이지만, 호(arc)는 사실 굵은 선으로 된 경로(fat stroked path) 입니다. 윤곽은 2개의 호로 구성된 다른 선이 칠해진 경로입니다. 

`counterView`라는 새로운 이름의 `UIView`를 서브클레싱하는 `Cocoa Touch Class`를 생성합니다. 

그리고 코드를 다음과같이 작성합니다.

```swift
import UIKit

@IBDesignable class CounterView: UIView {
  
  private struct Constants {
    static let numberOfGlasses = 8
    static let lineWidth: CGFloat = 5.0
    static let arcWidth: CGFloat = 76
    
    static var halfOfLineWidth: CGFloat {
      return lineWidth / 2
    }
  }
  
  @IBInspectable var counter: Int = 5
  @IBInspectable var outlineColor: UIColor = UIColor.blue
  @IBInspectable var counterColor: UIColor = UIColor.orange
  
  override func draw(_ rect: CGRect) {
    
  }
}
```

여기에 상수가 있는 구조체를 생성합니다. 이 상수는 CounterView를 그릴때 사용되고, 이상한 숫자 `numberOfGlasses`는 하루에 마시는 물의 목표 잔 수 입니다. 이 값에 도달되면 카운터가 최대값이 됩니다.

또한 스토리보드에서 업데이트할수 있는 `@IBInpectable`속성 세개를 만듭니다. 변수 `counter`는 마신 물의 잔수를 추적하고, 특히 `CounterView`를 테스트할때 스토리보드에서 변경할수 있는 기능이 있으므로 `@IBDesignable` 속성을 사용합니다. 

`Main.storyboard`로 이동하여, plus PushButton 위에 UIView를 추가하세요. 새 뷰에 대한 오토레이아웃 제약 조건은 이전과 비슷하게 추가합니다.

- `Width`는 230 
- `Height`는 230 
- `Center Horizontally in Safe Area` 설정 
- `bottom`은 40 으로 설정합니다. 

`Size Inspector`에서 제약조건의 Constraints는 다음과같이 보입니다. 

<center><img src="/img/posts/CoreGraphics-11.png" width="300"></center> <br> 


`Identity Inspector`에서, `UIView`클레스를 `CounterView`로 변경하고 `draw(_:)`의 그리기 코드가 뷰에 표시됩니다(아직 추가하지 않았습니다.)

---

<div id='section-id-573'/>

## Impromptu Math Lesson

이 튜토리얼을 잠시 중단하고, 두렵지 않게 보이길 바라며 고등학교 수준의 수학을 간략하게 살펴봅니다. 

컨텍스트에서 그리는 이것은 단위 원(unit circle = 반지름이 1인 원)을 기반으로 합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-FloUnitCircle.png)

빨간색 화살표는 호가 시작하고 끝나는 지점을 보여주고, 시계방향으로 그려줍니다. `3π / 4 radians` 위치에서 호를 그립니다. - 즉 `135°` 에서 시계방향으로 `π / 4 radians`, `45°` 입니다. 

라디안은 일반적으로 도(degrees)대신 프로그래밍에서 사용되며, 라디안으로 생각할수 있으므로 원을 사용할때마다 도로 변환할 필요가 없습니다. 나중에 라디안이 작용될때 호의 길이를 생각해야합니다.

단위원에서(반지름이 1.0)의 호의 길이는 라디안을 측정한 각도의 측정값과 같습니다. 예를 들어 위의 다이어그램을 보면 호의 길이 `0°` 에서 `90°`는 `π / 2` 입니다. 실제 상황에서 호의 길이를 계산하려면 단위원 호의 길이를 가져오고, 실제 반지름 값으로 곱합니다.

위의 빨간색 화살표 길이를 계산하려면 넓이에 해당하는 라디안 수를 계산하기만 하면됩니다. 

2π - (화살표의 끝(3π/4) + 화살표의 시작(π/4) = 3π/2

도로 표현하면 

360° - 135° + 45° = 270°

<center><img src="/img/posts/CoreGraphics-12.png" width="400"></center> <br> 

---

<div id='section-id-599'/>

## Back to Drawing Arcs 

`CounterView.swift`에서 `draw(_:)`로 호를 그리기위한 코드를 추가하세요. 

```swift
// 1
let center = CGPoint(x: bounds.width / 2, y: bounds.height / 2)

// 2
let radius: CGFloat = max(bounds.width, bounds.height)

// 3
let startAngle: CGFloat = 3 * .pi / 4
let endAngle: CGFloat = .pi / 4

// 4
let path = UIBezierPath(arcCenter: center,
                           radius: radius/2 - Constants.arcWidth/2,
                       startAngle: startAngle,
                         endAngle: endAngle,
                        clockwise: true)

// 5
path.lineWidth = Constants.arcWidth
counterColor.setStroke()
path.stroke()

```

다음은 각 섹션에서 수행하는 작업을 설명합니다.

1. 회전할 호의 중심점을 정의합니다. 
2. 뷰의 최대 치수를 기준으로 반지름을 계산합니다.
3. 호를 위한 시작과 끝 각도를 정의합니다.
4. 중심점, 반지름, 정의한 각도를 기반으로 호를 생성합니다.
5. 마지막으로 Path를 칠하기전 선의 너비와 색상을 설정합니다. 

이것을 그리는걸 나침반과함께 상상하세요 - 중앙에 나침반을 놓고, 필요한 반지름으로 팔을 열고 두꺼운 펜으로 로드하고 arc를 회전하며 호를 그립니다. 

이 코드에서 `center`는 나침반의 중앙이고 반지름은 나침반이 열리는 넓이(펜 너비의 절반) 입니다. 호의 넓이는 펜의 넓이 입니다.

> Note: 조금더 직관적으로 이해하기 위해 코드를 아래와같이 변경하고 결과를 확인합니다. 

```swift
let path = UIBezierPath(arcCenter: center,
                           radius: radius/2,
                       startAngle: startAngle,
                         endAngle: endAngle,
                        clockwise: true)
                        
path.lineWidth = 1
```

> Note: 호를 그리는 경우 일반적으로 알아야할 대부분의 내용을 다루지만, 호에 대해 더 자세히 알기를 원한다면 예전 [Core Graphics Tutorial](https://www.raywenderlich.com/2743-core-graphics-tutorial-arcs-and-paths) 이 도움이 될것입니다.
> 

스토리보드에서 애플리케이션을 실행하면 다음과같은 결과를 볼수 있습니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-SimArcStroke.png)

---

<div id='section-id-661'/>

## Outlining the Arc

사용자가 한잔의 물을 마셨다고 말하면 카운터의 외부선(outline)이 8개의 목표 잔으로의 처리 단계를 보여줍니다.

이 외부선은 2개의 호(arcs)로 이루어져 있습니다. 하나는 외부, 다른 하나는 내부 그리고 2개의 선이 이들 각각을 연결합니다.

CounterView.swift에서 `draw(_:)`코드 끝에 다음을 추가하세요

```swift
//Draw the outline

//1 - first calculate the difference between the two angles
//ensuring it is positive
let angleDifference: CGFloat = 2 * .pi - startAngle + endAngle
//then calculate the arc for each single glass
let arcLengthPerGlass = angleDifference / CGFloat(Constants.numberOfGlasses)
//then multiply out by the actual glasses drunk
let outlineEndAngle = arcLengthPerGlass * CGFloat(counter) + startAngle

//2 - draw the outer arc
let outlinePath = UIBezierPath(arcCenter: center,
                                  radius: bounds.width/2 - Constants.halfOfLineWidth,
                              startAngle: startAngle,
                                endAngle: outlineEndAngle,
                               clockwise: true)

//3 - draw the inner arc
outlinePath.addArc(withCenter: center,
                       radius: bounds.width/2 - Constants.arcWidth + Constants.halfOfLineWidth,
                   startAngle: outlineEndAngle,
                     endAngle: startAngle,
                    clockwise: false)
    
//4 - close the path
outlinePath.close()
    
outlineColor.setStroke()
outlinePath.lineWidth = Constants.lineWidth
outlinePath.stroke()
```

몇가지를 살펴 보겠습니다.

1. `outlineEndAngle`는 카운터 값을 사용하여 호를 마무리해야하는 각도 입니다. 
2. `outlinePath`는 바깥쪽 호 입니다. 반지름은 호의 실제 둘레를 계산하기 위해 `UIBezierPath()`로 주어집니다. 이 호는 단위 원이 아닙니다. 
3. 내부 호를 첫번째 호에 추가합니다. 같은 각도를 가지지만 반대로 그립니다(시계의 반대방향). 또한 내부와 외부의 호 사이의 선을 자동으로 그립니다. 
4. path를 닫으면, 내부 호의 끝에 나동으로 선이 그려집니다. 

`CounterView.swift`의 `counter` 속성을 5로 설정하면, `CounterView`가 스토리보드에서 다음과 같이 표시됩니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-ArcOutline.png)

`Main.storyboard`를 열고 CounterView를 선택하고 Attributes Inspector에서 속성을 변경하여 그리는 코드를 확인해보세요. 완전하게 상호작용하는걸 알수 있습니다. 8보다 크게, 0보다 작게 설정하여 조정해보세요. 문제는 나중에 해결할것입니다.

Counter 색상을 `RGB(87, 218, 213)`으로 변경하고 외부선의 색상을 `RGB(34, 110, 100)`으로 변경하세요. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-CounterView.png)

---

<div id='section-id-721'/>

## Making it All Work

축하합니다. 컨트롤을 만들었습니다. 플러스 버튼을 누르면 카운터가 증가하고, 마이너스 버튼을 누르면 카운터가 감소합니다. 

`Main.storyboard`에서 `UILabel`을 카운터 뷰의 중심으로 드레그하고 `Counter View`의 하위 뷰인지 확인하세요. 문서의 개요에서 다음과같이 보여야합니다. 

레이블을 세로 및 가로의 가운데에 맞출수 있도록 제약 조건을 추가하세요. 결국 레이블에는 다음과같은 제약 조건을 가져야 합니다. 

<center><img src="/img/posts/CoreGraphics-13.png" width="400"></center> <br> 

`Attributes Inspector`에서, `정렬`를 `center`, 폰트 사이즈를 `36`으로 변경하고 레이블의 기본 타이틀은 `8`로 설정합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-LabelAttributes.png)

`ViewController.swift`로 가고, 아래의 속성을 클레스의 상단에 추가합니다. 

```swift
//Counter outlets
@IBOutlet weak var counterView: CounterView!
@IBOutlet weak var counterLabel: UILabel!
```

`ViewController.swift`에 클레스의 끝에 다음 메소드를 추가합니다.

```swift
@IBAction func pushButtonPressed(_ button: PushButton) {
  if button.isAddButton {
    counterView.counter += 1
  } else {
    if counterView.counter > 0 {
      counterView.counter -= 1
    }
  }
  counterLabel.text = String(counterView.counter)
}
```

여기에 버튼의 `isAddButton` 속성에 따라서 카운터를 증가, 감소 시켜 카운터가 0아래로 떨어지지 않도록 하세요.  레이블의 카운터 값도 업데이트 합니다. 

또한 `viewDidLoad()`의 끝에 이 코드를 추가하여 `counterLabel`의 초기 값이 업데이트 되도록 하도록 하세요

`Main.stroyboard`에서 `CounterView`의 outlet과 `UILabel`의 outlet을 연결하세요. 두개의 PushButton은 `Touch Up Inside` 이벤트로 연결하세요.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-ConnectingOutlets2.gif)

애플리케이션을 실행하고 button을 누를을때 카운터 레이블이 업데이트 되는지 확인하세요.

그러나 왜 counter view는 업데이트 되지 않나요?

이 튜토리얼의 시작부분으로 돌아가서, 다른 뷰가 이동하거나, hidden 속성이 변경되거나, 뷰가 현재 스크린에서 새로운 것이 거나, 앱이 뷰에서 `settNeedsDisplay()`, `setNeedsDisplayInRect()` 메소드를 호출때만 `draw(_:)`가 호출되어야 합니다.

`CounterView.swift`로 돌아가서, `counter`속성을 다음과같이 선언 합니다.  

```swift
@IBInspectable var counter: Int = 5 {
  didSet {
    if counter <=  Constants.numberOfGlasses {
      //the view needs to be refreshed
      setNeedsDisplay()
    }
  }
}
```

이 코드는 외곽선이 최대 8까지 가기 때문에, 카운터가 사용자의 설정 잔 수 보다 작거나 같을 경우에만 뷰를 새롭게 고칩니다. 

앱을 다시 실행합니다. 모든것이 적절하게 동작해야합니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/1-Part1Finished.png)

---

<div id='section-id-793'/>

## Where to Go From Here?

이 튜토리얼의 기본 그리기를 다루었으니 이제 UI들에서 뷰의 모양을 변경할수 있습니다. 하지만 기다려 - 그 이상이 있습니다. 이 [두번째 튜토리얼](https://www.raywenderlich.com/410-core-graphics-tutorial-part-2-gradients-and-contexts)에서, Core Graphics contexts를 더 깊게 알아보고 시간이 지남에 따라 물 소비량에 대한 그래프를 작성합니다.

[여기](https://koenig-media.raywenderlich.com/uploads/2017/06/Flo-Part1-Xcode9b2.zip)에서 완성된 프로젝트를 다운 받을수 있습니다.

---

## Related Reference 

[Swift. Core Graphics Tutorial Part 2: Gradients and Contexts](https://devmjun.github.io/archive/CoreGraphics-2)<br>
[Core Graphics Tutorial Part 3: Patterns and Playgrounds](https://devmjun.github.io/archive/CoreGraphics-3)
