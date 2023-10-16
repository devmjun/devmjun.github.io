---
layout:     post
title:      "Swift. Core Graphics Tutorial Part 3: Patterns and Playgrounds"
subtitle:   "Core Graphics가 무엇인지 알아봅니다 "
date:       2018-10-06 18:45:00
author:     "MinJun Ju"
comments: true 
tags: [Swift, Raywenderlich, CoreGraphics, Trigonometry]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/about-bg_sub.jpg
thumbnail-img: /assets/post_img/background/about-bg_sub.jpg
share-img: /assets/post_img/background/about-bg_sub.jpg
---

[Core Graphics Tutorial Part 3: Patterns and Playgrounds](https://www.raywenderlich.com/409-core-graphics-tutorial-part-3-patterns-and-playgrounds)을 의역 했습니다.

---

## Table of contents 

  - [<U>Core Graphics Tutorial Part 3: Patterns and Playgrounds</U>](#section-id-16)
  - [<U>Background Repeating Pattern</U>](#section-id-36)
  - [<U>Drawing Images</U>](#section-id-190)
  - [<U>Adding the Medal Image to an Image View</U>](#section-id-415)
  - [<U>Where to Go From Here?</U>](#section-id-507)
  - [<U>Related Reference</U>](#section-id-517)
  

---

<div id='section-id-16'/>

## Core Graphics Tutorial Part 3: Patterns and Playgrounds


Core Graphics의 마지막 튜토리얼에서, 반복 가능한 패턴을 그리는 방법과, 복잡한 이미지를 그리는 프로토타입을 플레이그라운드를 사용하여 그리는 방법에 대해서 학습합니다.

> Update note: 이 튜토리얼은 iOS 11, Swift4, Xcode9로 업데이트 되었습니다.

Core Graphics의 마지막 튜토리얼로 돌아온걸 환영합니다. 하루에 마시는 물의 양을 추적하는 Flo앱은 Core Graphics를 사용하여 마지막 진화를 위한 준비가 되어 있습니다. 

첫번재 튜토리얼에서, UIKit의 사용자화한 모양의 컨트롤러를 만들었습니다. 그후 두번째 튜토리얼에서 그래프를 작성하여 1주일 이상 사용자의 물 소비량을 표시하고 컨텍스트 변환 행렬(Context Transformation matrix)을 변환하는 방법을 알아 보았습니다. 

Core Graphics의 세번째 마지막 튜토리얼에서, Flo앱을 마지막 형식으로 만듭니다. 

- 배경을 위한 반복하는 패턴을 생성합니다.
- 하루에 8잔을 성공적으로 마신 유저를 위한 메달을 수상하기 위해 처음부터 끝까지 메달을 그립니다.

이미 준비가 되어 있지않다면, [Flo 프로젝트 복사본](https://koenig-media.raywenderlich.com/uploads/2017/08/Flo-Part3-Starter.zip)을 다운로드 합니다.

---

<div id='section-id-36'/>

## Background Repeating Pattern

이 색션에서의 임무는 UIKit의 패턴 매소드를 사용하여 아래의 배경패턴을 그립니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-FinalBackground.png)

> Note: 속도를 위해 최적화해야하는 경우, Objective-C 를 사용하여 Core Graphics로 패턴을 만드는 기본 방법을 보여주는 [Core Graphics Tutorial: Patterns](https://www.raywenderlich.com/2742-core-graphics-tutorial-patterns)의 튜토리얼을 통해 패턴을 작업하세요. 대부분의 목적은 배경을 한번만 그릴때, UIKit의 쉽게 사용할수 있는 레핑된 매소드를 사용하는게 적합합니다. 

`BackgroundView`라는 이름의 `UIView`를 상속받은 `.swift` 파일을 생성합니다. 

`Main.stroyboard`로 돌아가고 ViewController의 view를 선택하고 `Identify Inspector` 에서 class를 `BackgroundView`로 변경합니다

![](/assets/post_img/posts/CoreGraphics-23.png)

`BackgroundView.swift`,`Main.stroyboard`들을 설정하고 이들을 `Assistant Editor`을 사용하여 나란히 놓습니다.

BackgroundView.swift의 코드를 다음과같이 변경합니다.

```swift
import UIKit

@IBDesignable
class BackgroundView: UIView {
  
  //1
  @IBInspectable var lightColor: UIColor = UIColor.orange
  @IBInspectable var darkColor: UIColor = UIColor.yellow
  @IBInspectable var patternSize: CGFloat = 200
  
  override func draw(_ rect: CGRect) {
    //2
    let context = UIGraphicsGetCurrentContext()!
    
    //3
    context.setFillColor(darkColor.cgColor)
    
    //4
    context.fill(rect)
  }
}
```

스토리 보드의 배경은 노란색으로 표시됩니다. 위의 코드에 대한 자세한 내용은: 

1. `lightColor`, `darkColor`은 `@IBInspectable`을 가지기 때문에 나중에 쉽게 배경색상을 구성할수 있습니다. 주황색과 노란색을 임시 색상으로 사용하여, 어떤일이 발생하는지 볼수 있습니다. `patternSize`는 반복되는 패턴의 크기를 제어합니다. 처음에는 큰값으로 설정되었으므로 어떤 일이 발생했는지 쉽게 알수 있습니다. 
2. `UIgraphicGetCurrentContext()`는 뷰의 컨텍스트를 제공하며, `draw(_ rect:)`가 그려지는 장소입니다.
3. Core Graphics의 매소드인 `setFillColor()`를 사용하여 컨텍스트의 현재 색상을 채웁니다. Core Graphics를 사용할때 darkColor의 속성인 `CGColor`을 사용 해야합니다.
4. 사각형 path를 설정하는 대신, `fill()`은 현재 컨텍스트에 채운 색상으로 전체 컨텍스트를 채웁니다. 

`UIBezierPath()`를 사용하여 3개의 주황색 삼각형을 그릴것입니다. 코드의 주석 숫자는 다음 이미지의 점(points)에 해당합니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-GridPattern.png)

`BackgroundView.swift`에서  `draw(_ rect:)`의 끝에 다음 코드를 추가합니다.

```swift
let drawSize = CGSize(width: patternSize, height: patternSize)
    
//insert code here
        
let trianglePath = UIBezierPath()
//1
trianglePath.move(to: CGPoint(x: drawSize.width/2, y: 0))
//2
trianglePath.addLine(to: CGPoint(x: 0, y: drawSize.height/2))
//3
trianglePath.addLine(to: CGPoint(x: drawSize.width, y: drawSize.height/2))
    
//4
trianglePath.move(to: CGPoint(x: 0,y: drawSize.height/2))
//5
trianglePath.addLine(to: CGPoint(x: drawSize.width/2, y: drawSize.height))
//6
trianglePath.addLine(to: CGPoint(x: 0, y: drawSize.height))
    
//7
trianglePath.move(to: CGPoint(x: drawSize.width, y: drawSize.height/2))
//8
trianglePath.addLine(to: CGPoint(x: drawSize.width/2, y: drawSize.height))
//9
trianglePath.addLine(to: CGPoint(x: drawSize.width, y: drawSize.height))
    
lightColor.setFill()
trianglePath.fill()
```

하나의 경로를 사용하여 3개의 삼각형을 어떻게 그리는지에 대하여 유의 하세요. `move(to:)`는 그림을 새로운 점을 그리고 움직일때 종이에서 팬을 들어 올리는 것과 같습니다.

스토리 보드는 배경 뷰의 왼쪽 상단에 주황색과 노랜식 이미지를 가져야 합니다. 

이제, 뷰의 드로잉 컨텍스트로 직접적으로 그렸습니다. 이 패턴을 반복할수 있고, 컨텍스트 외부의 이미지를 생성하고 그후 컨텍스트의 패턴으로서 이미지를 사용합니다.

다음을 찾습니다. 초기화한 컨텍스트를 호출한 이후에 이것 근처의 `draw(_ rect:)`의 상단에 가깝습니다.

```swift
let drawSize = CGSize(width: patternSize, height: patternSize)
```

`Insert code here`이라고 말하는 곳에 다음 코드를 추가합니다.

```swift
UIGraphicsBeginImageContextWithOptions(drawSize, true, 0.0)
let drawingContext = UIGraphicsGetCurrentContext()!
    
//set the fill color for the new context
darkColor.setFill()
drawingContext.fill(CGRect(x: 0, y: 0, width: drawSize.width, height: drawSize.height))
```

주황색 삼각형이 스토리보드에서 사라졌습니다. 어디로 간거야?

`UIGraphicBeginImageContextWithOptions()`는 새로운 컨텍스트를 생성하고 현재의 그레픽 컨텍스트로 설정합니다.  그래서 이 새로운 컨텍스트로 그리게 됩니다. 이 매소드의 매개변수는: 

- context의 사이즈 
- 컨텍스트가 불투명 한지 아닌지 - 만약 투명함이 필요하다면, `false`가 되어야 합니다. 
- 컨텍스트의 스케일 retina 화면으로 그리고 있다면, 2.0 이어야 하고 iPhone 6+ 이라면 3.0 이어야 합니다. 하지만 0.0은 디바이스를 위해 자동으로 적용된 올바른 스케일을 보장합니다. 

그후 이 새로운 컨텍스트의 참조를 얻기 위해 `UIGraphicsGetCurrentContext()`를 사용해야합니다. 

그 다음에 이 새로운 컨텍스트를 노랑색으로 채웠습니다. 컨텍스트의 불투명도를 false로 설정하여 원래 배경을 볼수 있게 할수 있지만, 투명한(transparent)것을 그리는 것보다 불투명한(opaque)를 그리는것이 더 빠르기때문에 불투명(opaque)으로 처리합니다. 

`draw(_ rect:)`의 끝에 다음 코드를 추가합니다.

```swift
let image = UIGraphicsGetImageFromCurrentImageContext()!
UIGraphicsEndImageContext()
```

이것은 현재 컨텍스트에서 `UIImage`를 추출합니다. `UIGraphicsEndImageContext()`와 함께 현재의 컨텍스트가 끝나면, 뷰의 컨텍스트로 그리는 드로잉 컨텍스트가 되돌아갑니다. 그래서 추가로 그리는것은 view의 `draw(_rect:)`에서 발생합니다.

```swift
UIColor(patternImage: image).setFill()
context.fill(rect)
```

이렇게하면 단일 색상이 아닌 색상으로 이미지를 사용하여 새로운 UIColor을 생성합니다. 

앱을 빌드하고 실행합니다. 앱의 배경이 밝아 졌습니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-BoldBackground2.png)

`Main.stroyboard`로 이동하고, background view를 선택합니다. `Attributes Inspector`에서 `@IBInspectable`의 속성들을 다음과같이 변경합니다

- `Light Color`: RGB(255, 255, 242)
- `Dark Color`: RGB(223, 255, 247)
- `Pattern Size`: 30 

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-BackgroundColors2.png)

배경 패턴을 그리는걸 좀더 실험 해보세요. 삼각형 대신 물방울 점(polka dot) 패턴을 얻을수 있는지 확인해보세요. 물론 백터가 아닌 이미지를 반복 패턴으로 대체할수도 있습니다.

---

<div id='section-id-190'/>

## Drawing Images

이 튜토리얼의 마지막 단계에서 사용자는 충분한 물을 마신 유저에게 보상하는 메달을 만듭니다. 이 메달은 counter가 8의 목표에 도달하면 나타납니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-MedalFinal.png)

메달 대신 트로피를 그려서 다음 단계로 나아 가거나, 이것을 향상시킬수 있습니다.

`@IBDesignable`을 사용하는 대신, `스위프트 플레이 그라운드`에서 이것을 그릴수 있고, 그후 `UIImageView`의 하위 클래스로 코드를 복사할수 있습니다. 상호작용하는 스토리보드도 유용하지만, 한계가 있습니다; 이들은 오직 간단한 코드만 그릴수 있고 복잡한 디자인을 생성할때 스토리 보드가 시간초과 되는 경우가 종종 있습니다.

한번 그려지면, `draw(_ rect:)`, `setNeedsDisplay()`와 함께 다시 그릴 필요가 없습니다. 

그림을 그려볼 시간입니다. Swift playground를 사용하여 메달 뷰를 강화하고, 그후 모든것을 마쳤을때 코드를 Flow 프로젝트로 복사합니다.

`File\New\Playground`로 가서 `Blank` 템플릿을 선택하고 `MedalDrawing`라고 이름을 작성하고 Create를 클릭합니다. 

새로운 playground window에서 다음 코드로 교체합니다. 

```swift
import UIKit

let size = CGSize(width: 120, height: 200)

UIGraphicsBeginImageContextWithOptions(size, false, 0.0)
let context = UIGraphicsGetCurrentContext()!



//This code must always be at the end of the playground
let image = UIGraphicsGetImageFromCurrentImageContext()
UIGraphicsEndImageContext()
```

패턴된 이미지를 위해 했던것과 같이 드로잉 컨텍스트를 생성합니다. 

마지막 두줄에 주의 하세요; 플레이 그라운드에서 미리 볼수 있도록 플레이 그라운드의 하단에 이들이 꼭 필요합니다.

다음 코드의 오른쪽 결과 네비게이터의 사각형 버튼을 클릭합니다.

```swift
let image = UIGraphicsGetImageFromCurrentImageContext()
```

이렇게하면 미리보기 이미지가 코드 아래에 배치 됩니다. 이미지는 코드를 변경할때마다 업데이트 됩니다. 

요소들을 그리는데 필요한 순서를 머리에서 그리기 위해 스케치를 만드는것이 가장 좋습니다. 이 튜토리얼을 개념화하면서 만든 걸작(masterpices ㅋㅋ..)를 보세요.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-Sketch.png)

이것은 메달을 그릴 순서입니다. 

1. 뒤의 리본(빨강)
2. 큰 메달(금색 그라데이션)
3. 걸쇠(짙은 금색(dark gold))
4. 앞의 리본(파랑)
5. 숫자 1(짙은 금색)

플레이 그라운드의 마지막 두줄을 유지하고(맨 끝의 컨텍스트 이미지를 추출하는 곳) 그 위의 줄에 그리는 코드를 추가합니다.

먼저 비표준(non-standard) 색상설정이 필요합니다. 

```swift
//Gold colors
let darkGoldColor = UIColor(red: 0.6, green: 0.5, blue: 0.15, alpha: 1.0)
let midGoldColor = UIColor(red: 0.86, green: 0.73, blue: 0.3, alpha: 1.0)
let lightGoldColor = UIColor(red: 1.0, green: 0.98, blue: 0.9, alpha: 1.0)
```

지금 이 모든것이 익숙해야 합니다. 색상은 이들을 선언한 오른쪽 네비게이션 결과창에 나타납니다.

리본의 빨강색부분 그리기 위한 코드를 추가합니다.

```swift
//Lower Ribbon
let lowerRibbonPath = UIBezierPath()
lowerRibbonPath.move(to: CGPoint(x: 0, y: 0))
lowerRibbonPath.addLine(to: CGPoint(x: 40, y: 0))
lowerRibbonPath.addLine(to: CGPoint(x: 78, y: 70))
lowerRibbonPath.addLine(to: CGPoint(x: 38, y: 70))
lowerRibbonPath.close()
UIColor.red.setFill()
lowerRibbonPath.fill()
```

여기에 새로운것은 없으며 단지 경로를 만들고 채웁니다. 오른쪽 창에 빨간색 path가 나타납니다. 

걸쇠를 위한 코드를 추가합니다.

```swift
//Clasp
let claspPath = UIBezierPath(roundedRect: CGRect(x: 36, y: 62, width: 43, height: 20), cornerRadius: 5)
claspPath.lineWidth = 5
darkGoldColor.setStroke()
claspPath.stroke()
```

`UIBezierPath(roundedRect:)`의 cornerRadius 매개변수로 사용하여 모서리가 둥근 뷰를 사용하여 만들었습니다. 걸쇠는 오른쪽창에 그려야합니다.

메달을 위한 코드를 추가합니다.

```swift
//Medallion
let medallionPath = UIBezierPath(ovalIn: CGRect(x: 8, y: 72, width: 100, height: 100))
//context.saveGState()
//medallionPath.addClip()

let colors = [darkGoldColor.cgColor, midGoldColor.cgColor, lightGoldColor.cgColor] as CFArray
let gradient = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: colors, locations: [0, 0.51, 1])!
context.drawLinearGradient(gradient, start: CGPoint(x: 40, y: 40), end: CGPoint(x: 40, y: 162), options: [])
//context.restoreGState()
```

주석 처리된 행에 주의합니다. 이들은 그라데이션이 임시로 어떻게 그려지는지 보여줍니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-SquareGradient.png)

그라데이션을 비스듬히 배치하고 왼쪽 상단에서 오른쪽 하단으로 이동하려면 그라데이션의 끝 x 좌표를 조정(coordinate)합니다. `drawLinearGradient()`코드를 다음과같이 변경합니다.

```swift
context.drawLinearGradient(gradient, start: CGPoint(x: 40, y: 40), end: CGPoint(x: 100, y: 160), options: [])
```

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-SkewedGradient.png)

큰 메달 모양을 그리는 코드 안에 그라데이션을 제한하는 자른 path를 만들기 위한 코드에서 주석처리된 3줄의 주석을 제거합니다.

이 시리즈의 2번째 부분에서 그래프를 그릴때와 마찬가지로, 자르는 경로(clipping path)를 추가하기 이전에 컨텍스트 드로잉 상태를 저장하고 더이상 자르지 않도록 그라데이션이 그려진후에 컨텍스트의 드로잉 상태를 복원합니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-ClippedGradient.png)

메달의 단단한 내부 선을 그리려면 메달의 원형 path를 사용하고 그리기 이전에 크기를 조정합니다. 전체 컨텍스트를 변환하는 대신, 하나의 경로로 변환을 적용합니다. 

메달을 그리는 코드 다음에, 다음의 코드를 추가합니다.

```swift
//Create a transform
//Scale it, and translate it right and down
var transform = CGAffineTransform(scaleX: 0.8, y: 0.8)
transform = transform.translatedBy(x: 15, y: 30)
medallionPath.lineWidth = 2.0

//apply the transform to the path
medallionPath.apply(transform)
medallionPath.stroke()
```

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-MedalOutline.png)

이렇게하면 원래 크기의 80% 까지 path가 조정된 다음 경로가 그라데이션뷰의 가운데에 위치하도록 변환합니다. 

내부 선 코드 뒤에 상단 리본을 그리는 코드를 추가합니다.

```swift
//Upper Ribbon
let upperRibbonPath = UIBezierPath()
upperRibbonPath.move(to: CGPoint(x: 68, y: 0))
upperRibbonPath.addLine(to: CGPoint(x: 108, y: 0))
upperRibbonPath.addLine(to: CGPoint(x: 78, y: 70))
upperRibbonPath.addLine(to: CGPoint(x: 38, y: 70))
upperRibbonPath.close()

UIColor.blue.setFill()
upperRibbonPath.fill()
```

이것은 lower ribbon을 추가한 코드와 매우 유사합니다:bezier path를 만들고, 채웠습니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-UpperRibbon.png)

마지막 단계는 메달에 숫자 1을 그리는 것입니다. ribbon 코드 이후에 다음 코드를 추가합니다.

```swift
//Number One

//Must be NSString to be able to use draw(in:)
let numberOne = "1" as NSString
let numberOneRect = CGRect(x: 47, y: 100, width: 50, height: 50)
let font = UIFont(name: "Academy Engraved LET", size: 60)!
let numberOneAttributes = [
  NSAttributedStringKey.font: font,
  NSAttributedStringKey.foregroundColor: darkGoldColor
]
numberOne.draw(in: numberOneRect, withAttributes: numberOneAttributes)
```

여기에서는 텍스트 속성을 가진 `NSString`을 정의하고 `draw(_in:)`을 사용하여 드로잉 컨텍스트로 NSString을 그렸습니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-NumberOne.png)

좋아 보입니다! 

마지막에 거의 다와가지만, 메달이 약간 2차원으로 보입니다. 약간의 그림자 효과(drop shadows)를 가지는것이 좋을 것입니다. 

---

## Shadows

그림자를 생성하기 위해 3개의 요소가 필요합니다: color, offset(그림자의 거리와 방향) 그리고 blur

플레이 그라운드 상단에, 금색을 정의한 이후 그리고 `//Lower Ribbon` 라인 이전에 그림자 코드를 추가합니다.

```swift
//Add Shadow
let shadow: UIColor = UIColor.black.withAlphaComponent(0.80)
let shadowOffset = CGSize(width: 2.0, height: 2.0)
let shadowBlurRadius: CGFloat = 5

context.setShadow(offset: shadowOffset, blur: shadowBlurRadius, color: shadow.cgColor)
```

그림자를 그리지만, 아마 결과는 그림과같습니다. 왜 이런가요?

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-MessyShadows.png)

컨텍스트에 객체를 그릴때, 이 코드는 각 객체에 그림자를 생성합니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-IndividualShadows.png)

메달은 5개의 객체로 이루어져 있습니다. 조금 희미해 보이는것은 당연합니다.

다행히도 쉽게 수정할수 있습니다. 간단하게 투명한 레이어 객체를 그리는 객체를 그룹화 하고, 전체 그룹을 위한 하나의 그림자를 그리면 됩니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-GroupedShadow.png)

그림자 코드 이후에 그룹화를 만드는 코드를 추가합니다. 다음으로 시작합니다.

```swift
context.beginTransparencyLayer(auxiliaryInfo: nil)
```

그룹화를 시작하면 또한 끝내는게 필요합니다. 플레이 그라운드의 끝부분(UIImage를 반환하기 이전 부분)에 다음 코드를 추가합니다.

```swift
context.endTransparencyLayer()
```

이제 깔끔하게 정돈된 그림자를 가진 깨끗한 메달 이미지가 완성 되었습니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-MedalFinal.png)

플레이 그라운드 코드를 완성했고, 이것을 보여주기만 하면됩니다.

---

<div id='section-id-415'/>

## Adding the Medal Image to an Image View

멋지게 보이는 메달을 그릴수 있는 코드가 생겼으니, Flo 프로젝트의 `UIImageView`로 렌더링 해야합니다. 

`Flow` 프로젝트로 다시 전환하고 이미지 뷰에 대한 새 파일을 만듭니다. 

`MedalView`로 이름을 작성하고 `UIImageView`를 서브클래싱하는 `.swift`파일을 생성합니다. 

`Main.storyboard`로 이동하고 `Counter View`의 하위 뷰로 `UIImageView`를 추가합니다. UIImageView를 선택하고 `Identity Inspector`에서 `MedalView`로 클레스를 변경합니다. 

`Size Inspector`에서 Image View의 `X=76, Y=147, Width=80, Height=80` 으로 조정합니다.

<center><img src="/assets/post_img/posts/CoreGraphics-24.png" width="450"></center> <br> 


`Attributes Inspector`에서 `Content Mode`를 `Aspect Fit`으로 변경합니다. 그러면 이미지를 뷰에 알맞게 자동으로 리사이징 됩니다.

<center><img src="/assets/post_img/posts/CoreGraphics-25.png" width="450"></center> <br> 


다시 `MedalView.swift`로 이동하여 medal생성하기 위한 매소드를 추가합니다.

```swift
func createMedalImage() -> UIImage {
  println("creating Medal Image")

}
```

이미지가 생성 되었을때 알기위한 로그를 생성합니다.

`MedalDrawing`플레이 그라운드로 돌아와서  `import UIKit`을 제외한 전체 코드를 복사합니다.

`MedalView.swift`로 돌아와, `createMedalImage()`로 모든 코드를 복사합니다. 

`createMedalImage()`의 끝에 다음 코드를 추가합니다. 

```swift
return image!
```

컴파일 오류를 잠시 멈추게합니다. 

클레스의 상단에 메달 이미지를 저장할 속성을 추가합니다.

```swift
lazy var medalImage: UIImage = self.createMedalImage()
```

게으른 연산자는 계산 집약적인 메달 이미지 코드가 필요한 경우에만 그려지는걸 의미합니다. 유저가 8잔을 마시지 않으면(정확하게는 8잔 마신걸 기록하지 않으면) 메달 드로잉 코드는 결코 실행되지 않습니다. 

메달을 보여주기 위한 메소드를 추가합니다.

```swift
    
func showMedal(show: Bool) {
  image = (show == true) ? medalImage : nil
}
```

`ViewController.swift`로 가서 클레스 상단에 outlet을 추가합니다.

```swift
@IBOutlet weak var medalView: MedalView!
```

MedalView의 아웃렛을 연결하고 `ViewController.swift`로 돌아와 다음 매소드를 클레스에 추가합니다.

```swift
func checkTotal() {
  if counterView.counter >= 8 {
    medalView.showMedal(show: true)
  } else {
    medalView.showMedal(show: false)
  }
}
```

하루를 위한 충분한양의 물을 마셨을때 메달이 보여집니다.

이 메소드를 `viewDidLoad()`, `pushButtonPreessed(_:)`의 끝에 추가합니다. 

```swift
checkTotal()
```

애플리케이션을 빌드하고 실행합니다. 다음과같이 보여집니다.

![](https://koenig-media.raywenderlich.com/uploads/2014/12/3-CompletedApp.png)

medalImage가 lazy로 선언 되었기 때문에 디버그 창에서 카운터가 8에 도달하여 메달을 표시할때 로그(creating Medal Image)가 출력되는걸 볼수 있습니다.

---

<div id='section-id-507'/>

## Where to Go From Here?

이 긴 Core Graphics 튜토리얼의 먼길을 왔습니다. Core Graphics의 기본을 마스터했습니다: path 그리기, 그라데이션, 패턴생성, 컨텍스트 변환.

[Flo 전체 버전](https://koenig-media.raywenderlich.com/uploads/2017/08/Flo-Part3-Finished.zip)을 다운로드 하세요. 이 버전에는 추가 샘플 데이터와 방사향 그라데이션이 포함되어 있기 때문에 버튼을 눌렀을때 반응하기 좋은 UI 터치를 제공합니다. 

Flo 제작을 즐겁게 해주시고, Core Graphics와 UIKit을 사용하여 멋진 UI를 만들수 있기를 기원합니다. 

---

<div id='section-id-517'/>

## Related Reference 

[Core Graphics Tutorial Part 1: Getting Started](https://devmjun.github.io/archive/CoreGraphics-1)<br>
[Swift. Core Graphics Tutorial Part 2: Gradients and Contexts](https://devmjun.github.io/archive/CoreGraphics-2)




