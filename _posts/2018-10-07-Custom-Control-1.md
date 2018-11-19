---
layout:     post
title:      "Swift. How To Make a Custom Control Tutorial: A Reusable Slider"
subtitle:   "Control을 사용자화하는 방법을 알아봅니다."
date:       2018-10-07 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich]
---

[How To Make a Custom Control Tutorial: A Reusable Slider](https://www.raywenderlich.com/2297-how-to-make-a-custom-control-tutorial-a-reusable-slider)을 의역 했습니다.

2014년에 작성된 포스트라 필요한 아이디어만 가져갑니다. 

> Personal Comment: Core Graphics + Custom Control in UIKit 

---

## Table of contents 

  - [<U>How To Make a Custom Control Tutorial: A Reusable Slider</U>](#section-id-18)
  - [<U>Getting Started</U>](#section-id-41)
  - [<U>Adding Default Control Properties</U>](#section-id-103)
  - [<U>Images vs. CoreGraphics</U>](#section-id-126)
  - [<U>Adding Interactive Logic</U>](#section-id-238)
  - [<U>Adding Touch Handlers</U>](#section-id-279)
  - [<U>Change Notifications</U>](#section-id-384)
  - [<U>Modifying Your Control With Core Graphics</U>](#section-id-452)
  - [<U>Handling Changes to Control Properties</U>](#section-id-628)
  - [<U>Where To Go From Here?</U>](#section-id-747)
  - [<U>Reference</U>](#section-id-753)


---

<div id='section-id-18'/>

## How To Make a Custom Control Tutorial: A Reusable Slider


Control은 iOS의 가장 중요한 부분 입니다.(Controls are the bread-and-butter of iOS apps). UIKit에는 많은 것들이 제공되지만 이 튜토리얼에서 Swift에서 사용자화하는  control을 어떻게 만드는지에 대해서 알아갑니다.

![](/img/posts/CustomControl-0.png)

> 2부분이(thumb) 있는 슬라이더 컨트롤을 어떻게 사용자화하여 만드는지 배웁니다.

> Update note: 이 튜토리얼은 iOS 8, Swift로 업데이트 되었습니다.

유저 인터페이스 컨트롤(User interface controls)은 애플리케이션 빌딩 블록중 가장 중요한것중 하나입니다. 이들은 사용자가 애플리케이션을 보고 상호작용할수 있는 그래픽 구성 요소를 제공 합니다. Apple은 UITextField, UIButton, UISwitch 같은 컨트롤 세트를 제공합니다. 기존에 존재하는 control들로 다양한 사용자 인터페이스를 만들수 있습니다.

그러나 때로는 조금 다른것이 필요할때가 있습니다. 

사용자화한 컨트롤은 사용자가 직접 만든 컨트롤 입니다. UIKit 프레임 워크와 함께 제공되지 않는 컨트롤 입니다. 사용자화한 컨트롤은 표준 컨트롤과 같이 일반적(generic) 이고, 다목적(versatile) 입니다. 결과적으로, 사용자화한 컨트롤 작성을 공유하고 싶어하는 적극적이고 활발한 개발자 커뮤니티가 있음을 알수 있습니다.

이 튜토리얼에서 사용자화한 컨트롤인 RangeSlider를 제공합니다. 이 컨트롤러는 최소값과 최대값 모두 선택할수 있습니다(double-ended slider 같은). 기존 컨트롤을 확장하며 개념을 다루고, API를 설계하고 구현합니다 그리고 새 컨트롤을 개발 커뮤니티와 공유하는 방법도 배우게 됩니다.

> Note: 이 튜토리얼을 작성할때 아직 베타 버전으므로 스크린샷을 게시할수 없었습니다. 여기의 모든 스크린샷은 이전 iOS 버전에서 가져온 것이지만 결과는 매우 유사합니다.

---

<div id='section-id-41'/>

## Getting Started

자산(property) 판매 검색을 위한 애플리케이션을 개발한다고 생각해보세요. 이 가짜 애플리케이션은 검색 결과를 필터링하기 때문에 특정 가격 범위내에서 검색할수 있습니다. 

최대, 최소 가격을 설정하기 위한 한쌍의 UISlider 컨트롤러를 사용자에게 제공하는 인터페이스를 제공할수 있습니다. 그러나 이 인터페이스는 사용자가 가격 범위를 시각화하는데 실제로 도움이 되지 않습니다. 두 부분으로 하나의 슬라이더로 표시하면 검색하려는 가격의 높고 낮음을 나타낼수 있습니다. 

UIView를 하위 클레싱하고, 가격 범위를 시각화하기위한 맞춤 뷰를 생성하여 구축(Build)할수 있습니다. 앱 컨텍스트에서는 괜찮지만 - 다른 앱으로 가져가서(port) 재사용하기 어려울 것입니다.

Xcode를 열고 Single View Application을 선택하여 `CustomSliderExample`라고 이름 짓고, Core Data를 선택하지 않은 프로젝트 하나를 생성합니다. 

사용자화한 컨트롤을 생성할때 가장 먼저 해야하는 것은 기존의 클레스를 하위 클레스화 하고, 확장 하는 것입니다.

application의 UI에서 사용하려면 `UIView`의 하위 클레스 여야 합니다.

에플의 `UIKit` 레퍼런스를 참조하면 `UILabel`, `UIWebView`같은 많은 프레임 워크 컨트롤이 `UIView`를 하위클레스 인것을 직접 볼수 있습니다. 그러나 `UIButton`, `UISwitch`는 `UIControl`의 하위클레스로 아래의 계층처럼 보여집니다.

![](https://koenig-media.raywenderlich.com/uploads/2013/03/RangeSliderClassStructure.png)

> Note: UI 구성요소들의 완성된 클레스 계층을 [UIKit Framework Reference](https://developer.apple.com/documentation/uikit)를 확인하세요. 

UIControl은 구독자에게 변경 사항을 알리는 메커니즘은 target-action 패턴을 구현합니다. UIControl은 또한 컨트롤의 상태와 관계된 몇개의 속성들을 가지고 있습니다. 이 custom control에서 target-action 패턴을 사용합니다. 그래서 UIControl은 좋은 출발점이 될것입니다. 

`RangeSlider` 클레스라고 이름짓고 UIControl을 상속받는 `.swift`파일을 생성합니다. 

코드를 작성하는것이 좋지만, 컨트롤이 어떻게 처리되는지 화면에서 보는게 더 좋습니다. 컨트롤을 위한 코드를 작성하기 전에 컨트롤을 뷰 컨트롤러에 추가해야합니다. 그렇게하면 컨트롤의 변화과정(evolution)을 살펴볼수 있습니다.

ViewController.swift를 열고 다음과같이 교체합니다. 

```swift
import UIKit

class ViewController: UIViewController {
    let rangeSlider = RangeSlider(frame: CGRect.zero)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        rangeSlider.backgroundColor = .red
        view.addSubview(rangeSlider)
    }
    
    override func viewDidLayoutSubviews() {
        let margin: CGFloat = 20.0
        let width = view.bounds.width - 2.0 * margin
        rangeSlider.frame = CGRect(x: margin, y: margin + topLayoutGuide.length,
                                   width: width, height: 31.0)
    }
}
```

위의 코드는 주어진 프레임 워크에서 새로운 컨트롤 인스턴스를 생성하고 뷰에 추가합니다. 이 컨트롤의 배경색은 빨강색으로 설정 되었습니다. 컨트롤의 배경색을 빨강색으로 설정하지 않으면 컨트롤이 보이지 않습니다 - 아마 어디로 갔을지 궁금할것입니다.

앱을 빌드하고 실행하여 다음과 같은것을 보아야 합니다.

![](https://koenig-media.raywenderlich.com/uploads/2013/03/StepOne.png)

컨트롤에 시각적 요소를 추가하기전에, 컨트롤에 저장된 다양한 정보를 추적할수 있는 몇가지 속성이 필요합니다. 컨트롤의 애플리케이션 프로그래밍 인터페이스의 시작 형식이고 API의 짧은 형식입니다.

> Note: 컨트롤의 API는 컨트롤을 사용할 다른 개발자에게 공개하기로 결정한 메소드와 속성을 정의합니다. 이 튜토리얼의 뒷부분에서 API 디자인에 대해 읽게 될것입니다.

---

<div id='section-id-103'/>

## Adding Default Control Properties

`RangeSlider.swift`를 열고 다음 과같이 코드를 작성합니다. 

```swift
import UIKit

class RangeSlider: UIControl {
    var minimumValue = 0.0
    var maximumValue = 1.0
    var lowerValue = 0.2
    var upperValue = 0.8
}
```

이 4가지 속성은 사용자가 상한값과 하한값과 함께 범위의 최대, 최소 값을 제공하여 컨트롤의 상태를 설명하는데 필요한 모든것들입니다. 

잘 설계된 컨트롤은 기본 속성값을 정의 해야하고 그렇지 않으면 화면에 그릴때 이상하게 보여질것입니다.

이제 컨트롤의 상호작용 요소를 작업할 차례입니다; 다시말해, 높은값과 낮은값을 나타내는 부분과 슬라이더 부분 입니다.

---

<div id='section-id-126'/>

## Images vs. CoreGraphics

화면에 컨트롤을 렌더링하는 두가지 방법이 있습니다. 

- `Images`: 컨트롤의 다양한 요소를 대표하는 이미지를 생성합니다.
- `Core Graphics`: 레이어와 Core Graphics 조합을 사용하여 컨트롤을 렌더링 합니다. 

아래에 위의 각 기술에 대한 장단점을 대략적으로 이야기 합니다.

`Images`- 이미지를 사용하여 컨트롤을 생성하는 것은 아마도 컨트롤을 작성하는 측면에서 가장 간단한 옵션일것입니다 - 그리는 방법을 알고 있는동안! :] 동료 개발자가 컨트롤의 모양과 느낌을 변경할수 있게 하려면 일반적으로 이러한 이미지를 UIImage 속성으로 노출해야 합니다. 

이미지를 사용하면 컨트롤을 사용할 개발자에게 유연성을 제공합니다. 개발자는 모든 단일 픽셀, 컨트롤 모양의 모든 세부사항을 변경할수 있지만, 이것은 좋은 그래픽 디자인 스킬이 필요합니다 - 그리고 코드에서 컨트롤을 수정하는게 어렵습니다.

`Core Graphics`- Core Graphics를 사용하여 컨트롤을 구성한다는것은 자신만의 렌더링 코드를 작성해야하고 더 많은 노력이 요구됨을 의미합니다. 하지만 이 기술은 더 유연한 API를 생성할수 있게 만듭니다. 

Core Graphics를 사용하면, 색상, 테두리 두깨, 곡률과 같은 컨트롤의 모든 기능을 매개변수화(parameterize) 할수 있습니다. 이 방법을 사용하면 컨트롤의 시각적인 모든 요소를 그릴수 있고, 컨트롤을 사용하는 개발자가 필요에 맞게 조정할수 있습니다. 

이 튜토리얼에서는 두번째 기술인 Core Graphics를 사용하여 컨트롤을 렌더링 합니다.

> Note: 흥미롭게, 애플은 그들의 컨트롤에서 이미지를 사용는 경향이 있습니다. 이것은 아마 각 컨트롤의 크기를 알고, 많은 사용자화를 원하지 않는 경향이 높은 것처럼 보입니다. 어쨋든 모든 앱은 비슷한 모양과 느낌을 가지길 원합니다.

`RangeSlider.swift`를 열고 `import UIKit`아래에 다음 코드를 추가합니다.

```swift
import QuartzCore
```

`RangeSlider`의 속성으로 우리가 정의했던것 위에 다음 코드를 추가합니다.

```swift
let trackLayer = CALayer()
let lowerThumbLayer = CALayer()
let upperThumbLayer = CALayer()

var thumbWidth: CGFloat {
    return CGFloat(bounds.height)
}
```


3개의 레이어들 - `trackLayer`, `lowerThumbLayer`, `upperThumbLayer` - 슬라이더 컨트롤의 다양한 구성요소를 렌더링 하기 위해 사용되어 집니다. `thumbWidth`는 레이아웃 목적으로 사용되어 집니다. 

다음으로 컨트롤 자체의 기본 그래픽 속성 입니다. 

RangeSlider 클레스 내부에 초기화와 도우미 함수를 추가합니다.

```swift
override init(frame: CGRect) {
    super.init(frame: frame)
    
    trackLayer.backgroundColor = UIColor.blue.cgColor
    layer.addSublayer(trackLayer)
    
    lowerThumbLayer.backgroundColor = UIColor.green.cgColor
    layer.addSublayer(lowerThumbLayer)
    
    upperThumbLayer.backgroundColor = UIColor.green.cgColor
    layer.addSublayer(upperThumbLayer)
    
    updateLayerFrames()
}

required init(coder: NSCoder) { super.init(coder: coder)! }

func updateLayerFrames() {
    trackLayer.frame = bounds.insetBy(dx: 0.0, dy: bounds.height/3)
    trackLayer.setNeedsDisplay()
    
    let lowerThumbCenter = CGFloat(positionForValue(value: lowerValue))
    
    lowerThumbLayer.frame = CGRect(x: lowerThumbCenter - thumbWidth / 2.0, y: 0.0,
                                   width: thumbWidth, height: thumbWidth)
    lowerThumbLayer.setNeedsDisplay()
    
    let upperThumbCenter = CGFloat(positionForValue(value: upperValue))
    upperThumbLayer.frame = CGRect(x: upperThumbCenter - thumbWidth / 2.0, y: 0.0,
                                   width: thumbWidth, height: thumbWidth)
    upperThumbLayer.setNeedsDisplay()
}

func positionForValue(value: Double) -> Double {
    return Double(bounds.width - thumbWidth) * (value - minimumValue) /
        (maximumValue - minimumValue) + Double(thumbWidth / 2.0)
}
```

초기화는 단순하게 3개의 레이어를 만들고 컨트롤의 루트레이어의 자식 으로 추가 하고, 레이어 프레임에 맞게 업데이트 합니다. 

마지막으로, positionForValue는 컨트롤의 최소 값과 최대값 사이의 위치를 조절하기 위해 간단한 비율을 사용하여 값을 화면 위치에 매핑 시킵니다. 

다음으로, `RangeSlider.swift`에서 `frame`을 override 하고 다음  코드를 추가하여 옵저버 속성으로 구현합니다.

```swift
override var frame: CGRect {
    didSet {
        updateLayerFrames()
    }
}
```

앱을 빌드하고 실행합니다; 슬라이더는 다음과같은 형태를 갖습니다. 아래의 화면과 비슷합니다.

![](https://koenig-media.raywenderlich.com/uploads/2013/03/SliderTwo.png)

빨강색은 컨트롤 전체의 배경임을 기억하세요. 파랑색은 슬라이더의 `track`이고, 녹색은 상한값과 하한값을 위한 두 부분(thumb) 입니다. 

컨트롤은 시각적 모양을 갖길 시작했지만, 대부분의 모든 컨트롤은 유저가 앱과 상호작용할수 있는 방법을 제공합니다.

컨트롤에 원하는 만큼의 범위를 설정 하여 각 부분을 드레그할수 있어야합니다. 이들을 상호작용 가능하게 처리할것이고, UI 와 컨트롤에 의해 노출된 속성을 업데이트 합니다.

---

<div id='section-id-238'/>

## Adding Interactive Logic


상호작용 로직은 `thumb`이 드레그 되어질때 저장하고 이것을 UI에 반영하는게 필요합니다. 컨트롤의 레이어는 이 로직을 배치하기 좋은 장소입니다.

이전과같이 `RangeSliderThumbLayer`라고 이름을 짓고 CALayer을 상속하는 `.swift`파일을 생성합니다. 

새롭게 추가된 `RangeSliderThumbLayer.swift`에 다음 코드를 추가합니다.

```swift
import UIKit
import QuartzCore

class RangeSliderThumbLayer: CALayer {
    var highlighted = false
    weak var rangeSlider: RangeSlider?
}
```

간단하게 추가한 두 속성: 하나는 thumb가 강조(highlighted)되었는지 가리키고, 다른 하나는 부모 범위 슬라이더에 대한 참조 속성을 추가합니다. RangeSlider는 2개의 thumb 레이어를 소유하기 때문에 순환 참조 사이클을 피하기위한 weak 변수입니다. 

`RangeSlider.swift`를 열고, `lowerThumLayer`, `upperThumbLayer` 속성의 타입을 다음과같이 변경합니다. 

```swift
let lowerThumbLayer = RangeSliderThumbLayer()
let upperThumbLayer = RangeSliderThumbLayer()
```

`RangeSlider.swift에서 `init`을 찾고 다음 코드를 추가합니다. 

```swift
lowerThumbLayer.rangeSlider = self
upperThumbLayer.rangeSlider = self
```

위의 코드는 레이어의 rangeSlider 속성을 back 참조로 `self`를 설정합니다.

프로젝트를 빌드하고 실행합니다. 모든것이 이전과 같이 보여야합니다.

---

<div id='section-id-279'/>

## Adding Touch Handlers 

`RangeSlider.swift`를 열고 다음 속성을 추가합니다.

```swift
var previousLocation = CGPoint()
```

이 속성은 터치 위치를 추적하는데 사용됩니다. 

다양한 터치와 컨트롤의 이벤트들을 어떻게 추적할 것인가요? 

`UIControl`은 터치 추적을 위한 몇가지 매소드를 제공합니다. `UIcontrol`의 하위 클레스는 자신의 상호작용 로직을 추가하기 위해 이 메소드를 override 할수 있습니다. 

사용자화한 컨트롤에서: UIcontrol의 3개 중요 매소드를 override 해야합니다: `beginTrackingWithTouch`, `continueTrackingWithTouch`, `endTrackingWithTouch` 입니다.

`RangeSlider.swift`에 다음 메소드를 추가합니다. 

```swift
override func beginTracking(_ touch: UITouch, with event: UIEvent?) -> Bool {
    previousLocation = touch.location(in: self)
    
    // Hit test the thumb layers
    if lowerThumbLayer.frame.contains(previousLocation) {
        lowerThumbLayer.highlighted = true
    } else if upperThumbLayer.frame.contains(previousLocation) {
        upperThumbLayer.highlighted = true
    }
    
    return lowerThumbLayer.highlighted || upperThumbLayer.highlighted
}
```

위의 메소드는 유저의 control을 처음 터치할때 호출됩니다. 

먼저, 컨트롤의 좌표 공간으로 터치 이벤트를 변환합니다. 다음으로, 각 thumb 레이어는 자신의 프레임 이내에 터치가 된건지 아닌지 확인합니다. 위의 메소드를 위한 반환값은 UIControl의 슈퍼클레스에게 후속 터치를 추적해야하는지 여부를 알려줍니다. 

thumb가 선택되면(highlighted), 터치이벤트를 계속 추적합니다. 

이제 초기의 터치이벤트를 가졌으므로, 사용자가 손가락으로 스크린을 움직이는 이벤트를 처리해야합니다. 

다음 코드를 `RangeSlider.swif`에 추가합니다.

```swift
func boundValue(value: Double, toLowerValue lowerValue: Double, upperValue: Double) -> Double {
    return min(max(value, lowerValue), upperValue)
}

override func continueTracking(_ touch: UITouch, with event: UIEvent?) -> Bool {
    let location = touch.location(in: self)
    
    // 1. Determine by how much the user has dragged
    let deltaLocation = Double(location.x - previousLocation.x)
    let deltaValue = (maximumValue - minimumValue) * deltaLocation / Double(bounds.width - thumbWidth)
    
    previousLocation = location
    
    // 2. Update the values
    if lowerThumbLayer.highlighted {
        lowerValue += deltaValue
        lowerValue = boundValue(value: lowerValue, toLowerValue: minimumValue, upperValue: upperValue)
    } else if upperThumbLayer.highlighted {
        upperValue += deltaValue
        upperValue = boundValue(value: upperValue, toLowerValue: lowerValue, upperValue: maximumValue)
    }
    
    // 3. Update the UI
    CATransaction.begin()
    CATransaction.setDisableActions(true)
    
    updateLayerFrames()
    
    CATransaction.commit()
    
    return true
}
```

`boundValue`는 전달된 값이 지정된 범위에 있도록 값을 고정 시킵니다. 이 도우미 함수를 사용하여 최소, 중첩된 최소, 최대 호출을 읽기가 쉬워집니다.

여기에 `continueTracking(touch:event)`에 대한 자세한 설명이 있습니다. 

1. 먼저 delta 위치를 계산합니다. 유저의 손가락이 이동한 픽셀수를 계산합니다. 컨트롤의 최소, 최대값을 기반으로 한 조정된(scaled) 델타 값으로 변환합니다.
2. 여기는 유저가 슬라이더를 드레그 하는 위치를 기준으로 상,하 값을 조정합니다. 
3. 이 색션에서 CATransitiopn 내부의 disabledAction flag를 설정합니다. 이렇게하면 각 레이어의 프레임이 변경이 즉시 적용되고 애니메이션으로 적용되지 않습니다. 마지막으로 updateLayerFrames가 호출되어 thumb가 정확한 위치로 이동합니다. 

슬라이더의 드레깅을 코딩했지만 터치가 끝났을때(end touch), 드레깅 이벤트 처리가 남아있습니다.

`RnageSlider.swift`에 다음 메소드를 추가합니다.

```swift
override func endTracking(_ touch: UITouch?, with event: UIEvent?) {
    lowerThumbLayer.highlighted = false
    upperThumbLayer.highlighted = false
}
```

위의 코드는 간단하게 두개의 thumbs 상태를 non-highlighted 상태로 재설정 합니다.

![](https://koenig-media.raywenderlich.com/uploads/2013/05/Screenshot-2.png)

슬라이더가 터치를 추적할때, 컨트롤의 범위밖을 넘어서 손가락으로 드레깅 할수 있고, 추적 동작을 잃지 않고 컨트롤로 돌아올수 있습니다. 이것은 화소가 낮은 화면이 작은 장치에서 유용한 기능입니다 - 

---

<div id='section-id-384'/>

## Change Notifications

이제 사용자가 상한값, 하한값을 설정하기 위해 설정할수 있는 상호작용 컨트롤이 필요합니다. 하지만 컨트롤이 어떻게 새로운값을 가지는걸 앱이 알게하고, 앱을 호출하여 변경을 알릴수 있고 그 방법은 무엇인가요?

여기는 알람변경 제공하기 위해 구현할수있는 다른 몇개의 패턴들이 있습니다: `NSNotification`, `Key-Value-Observing(KVO)`, `델리게이트 패턴`, `target-action` 패턴, 또는 다른 많은것들.. 선택지가 너무 많습니다.

무엇을 선택해야 하나요?

UIcontrol을 보면 `NSNotification`을 사용하지 않고, KVO사용을 권장합니다. 그래서 `UIKit`과의 일관성을 위해 두 옵션을 제외할수 있습니다. 다른 두 패턴 - delegate, target-action 패턴은 UIKit에서 광범위하게 사용됩니다. 

여기의 델리게이트와 target-action 패턴에 대한 자세한 분석 내용을 설명합니다.

`Delegate pattern` - `delegate` 패턴에서 알람의 범위를 위해 사용된 매소드를 포함하는 프로토콜을 제공합니다. 컨트롤을 대개 프로토콜을 구현한 `delegate`로 이름지어진 속성을 가지고 있습니다. 이 클레스의 예로는 UItableView는 `UITableViewDelegate` 프로토콜을 제공합니다. 컨트롤은 오직 하나의 delegate인스턴스만 받아들이는것에 주의합니다. 델리게이트 메소드는 원하는수의 매개변수를 취할수 있기 때문에 매소드로 결정한 많은 정보를 전달할수 있습니다.

`Target-action pattern` - target action 패턴은 UIcontrol의 기본 클레스에 의해 제공됩니다. 컨트롤 상태 변경이 발생했을때, `target`은 UIcontrolEvents 열거형 값의 하나가 설명된 action을 알립니다. 여러개의 타겟을 Control Action에 제공할수도 있지만 사용자화한 이벤트를 만들수도 있습니다(UIControlEventApplicationReserved 참조). 하지만 사용자화한 이벤트 수는 4개로 제한됩니다. Control action은 이벤트와 함께 정보를 보내는 능력을 가지고 있지 않습니다. 그래서 이벤트가 발생하면 추가 정보를 전달하는데 사용할수 없습니다. 

두 패턴의 주요 차이점은 다음과 같습니다.

- `Multicast`: `target-action` 패턴은 변경알림을 여러사용자에게 동시에 보낼수 있고, delegate 패턴은 단일 delegate 인스턴스에 바인딩됩니다.
- `Flexibility`: 델리게이트 패턴은 프로토콜을 직접 정의합니다. 즉 전달한 정보를 정확하게 통제할수 있습니다. Target-action은 추가 정보를 전달할수 있는 방법을 제공하지 않으며, 클라이언트는 이벤트를 수신한후 스스로 찾아(look up) 봐야합니다. 

range slider 은 알림을 제공해야하는 상호작용, 변경해야하는 상태수가 많지 않습니다. 실제로 변경되는 값은 컨트롤의 상한값과 하한값입니다. 

이 상황에서 target-action 패턴은 완벽한 의미를 갖습니다. 이것이 튜토리얼의 시작 부분에서 UIContrl을 하위 클레싱한 이유입니다. 
 
슬라이더 값은 `continueTracking(touch:event)` 메소드 내부에서 업데이트 됩니다. 그래서 이것은 알람 코드 추가가 필요한 장소입니다. 

`RangeSlider.swift`를 열고 `continueTracking(touch:event)`을 찾아 `return true` 조건 이전에 다음 코드를 추가합니다.

```swift
sendActions(for: .valueChanged)
```

이것이 구독자에게 변경사항을 알리기 위해 필요한 모든것입니다.

알람 처리가 완료 되었으니, 앱에 연결해야합니다.

`ViewController.swift`를 열고 다음 코드를 `viewDidLoad`끝에 추가합니다.

```swift
rangeSlider.addTarget(self, action: #selector(rangeSliderValueChanged(rangeSlider:)), for: .valueChanged)
```

위의 코드는 `rangeSliderValueChange` action을 보낼때마다 rangeSliderValueChange 메소드를 호출합니다.

```swift
@objc func rangeSliderValueChanged(rangeSlider: RangeSlider) {
    print("Range slider value changed: (\(rangeSlider.lowerValue) \(rangeSlider.upperValue))")
}
```

이 메소드는 계획대로 컨트롤이 알람을 보내는지 증명하기 위해 콘솔에 range slider 의 값을 간단하게 출력합니다. 

앱을 빌드하고 실행하고 슬라이더를 앞뒤로 움직여 봅니다. 콘솔에 컨트롤의 값을 볼수있습니다.

```swift
Range slider value changed: (0.117670682730924 0.390361445783134)
Range slider value changed: (0.117670682730924 0.38835341365462)
Range slider value changed: (0.117670682730924 0.382329317269078)
Range slider value changed: (0.117670682730924 0.380321285140564)
Range slider value changed: (0.119678714859438

 0.380321285140564)
Range slider value changed: (0.121686746987952 0.380321285140564)
```

이제는 컨트롤을 개조할 시간입니다.

---

<div id='section-id-452'/>

## Modifying Your Control With Core Graphics

먼저 슬라이더의 thumbs를 움직여 `track`그레픽을 업데이트 합니다. 

이번에는 RangeSliderTrackLayer라고 불리는 또다른 CALayer를 하위 클레싱하는 `.swift`을 생성합니다. 

새로 추가된 파일에 다음코드를 추가합니다.

```swift
import UIKit
import QuartzCore

class RangeSliderTrackLayer: CALayer {
    weak var rangeSlider: RangeSlider?
}
```

위의 코드는 range slider를 참조합니다.(이전에 thumb layer에서 했던것처럼..)

`RangeSlider.swift`를 열고 `trackLayer` 속성을 찾고 다음과같이 수정합니다.

```swift
let trackLayer = RangeSliderTrackLayer()
```

`init`을 찾고 다음과같이 수정합니다.

```swift
override init(frame: CGRect) {
    super.init(frame: frame)
    
    trackLayer.rangeSlider = self
    trackLayer.contentsScale = UIScreen.main.scale
    layer.addSublayer(trackLayer)
    
    lowerThumbLayer.rangeSlider = self
    lowerThumbLayer.contentsScale = UIScreen.main.scale
    layer.addSublayer(lowerThumbLayer)
    
    upperThumbLayer.rangeSlider = self
    upperThumbLayer.contentsScale = UIScreen.main.scale
    layer.addSublayer(upperThumbLayer)
}
```

위의 코드는 새 트렉 레이어에 range slider참조가 있음을 보장하고 - 끔찍한 배경 색상이 더이상 적용되지 않도록 합니다. contentScale 요소를 디바이스의 스크린과  일치 하도록 적용하면 모든것이 retina 디스플레이에서 선명하게 보여지는 것이 보장됩니다.

컨트롤의 빨간 배경색상을 제거하세요. 

ViewController.swift 에서 viewDidLoad를 찾고 다음을 제거하세요

```swift
rangeSlider.backgroundColor = .red
```

빌드하고 보이는게..

![](https://koenig-media.raywenderlich.com/uploads/2013/05/Screenshot-3.png)

아무것도 보이지 않나요? 좋습니다.

대부분의 개발자는 컨트롤을 자신이 만든 앱의 특정 느낌, 외형을 모방하여 구성할수 있기 때문에 컨트롤의 외형을 사용자화 할수 있게 슬라이더에 어떤 속성을 추가할수 있습니다. 

`RangeSlider.swift`를 열고 앞에서 추가한 속성 바로 아래에 다음 속성을 추가합니다.

```swift
var trackTintColor = UIColor(white: 0.9, alpha: 1.0)
var trackHighlightTintColor = UIColor(red: 0.0, green: 0.45, blue: 0.94, alpha: 1.0)
var thumbTintColor = .white

var curvaceousness : CGFloat = 1.0
```

여러개의 컬러 속성의 목적은 직관적입니다. 그리고 `curvaceousness`? - 곧 알게 될겁니다. 

`RangeSliderTrackLayer.swift`를 엽니다.

이 레이어는 두개의 thumb가 슬라이드되는 트렉을 렌더링 합니다. 현재 `CALayer`를 상속하여 단색만 렌더링 합니다. 

트렉을 그리려면, `drawInContext:`를 구현해야 하고, Core Graphics APIS를 사용하여 렌더링을 수행 해야합니다.

> Note: Core Graphics에 대해 깊게 배우려면 이사이트의 [Core Graphics 101 tutorial serise](https://www.raywenderlich.com/2746-core-graphics-tutorial-lines-rectangles-and-gradients)를 추천합니다.

`RangeSliderTrackLayer`에 다음 메소드를 추가합니다.

```swift
override func draw(in ctx: CGContext) {
    if let slider = rangeSlider {
        // Clip
        let cornerRadius = bounds.height * slider.curvaceousness / 2.0
        let path = UIBezierPath(roundedRect: bounds,
                                cornerRadius: cornerRadius)
        ctx.addPath(path.cgPath)
        
        // Fill the track
        ctx.setFillColor(slider.trackTintColor.cgColor)
        ctx.addPath(path.cgPath)
        ctx.fillPath()
        
        // Fill the highlighted range
        ctx.setFillColor(slider.trackHighlightTintColor.cgColor)
        let lowerValuePosition = CGFloat(slider.positionForValue(value: slider.lowerValue))
        let upperValuePosition = CGFloat(slider.positionForValue(value: slider.upperValue))
        let rect = CGRect(x: lowerValuePosition, y: 0.0, width: upperValuePosition - lowerValuePosition, height: bounds.height)
        ctx.fill(rect)
    }
}
```

트렉 모양이 잘리고 배경색이 채워집니다. 그후 범위가 표시됩니다. 

빌드하고 실행하여 확인합니다.

![](https://koenig-media.raywenderlich.com/uploads/2013/05/Screenshot-4.png)

노출된 다양한 속성과함께 컨트롤의 렌더링 효과를 어떻게 가지는지 확인하세요. 

`curvaceousness`이게 궁금하다면, 이것을 변경해보세요. 

thumb 레이어를 그리는데 비슷한 방법을 사용합니다. 

`RangeSliderThumbLayer.swift`를 열고 다음 매소드를 선언된 속성아래에 추가합니다.

```swift
override func draw(in ctx: CGContext) {
    if let slider = rangeSlider {
        
        let thumbFrame = bounds.insetBy(dx: 2.0, dy: 2.0)
        let cornerRadius = thumbFrame.height * slider.curvaceousness / 2.0
        let thumbPath = UIBezierPath(roundedRect: thumbFrame, cornerRadius: cornerRadius)
        
        // Fill - with a subtle shadow
        let shadowColor = UIColor.gray
        ctx.setShadow(offset: CGSize(width: 0.0, height: 1.0),
                      blur: 1.0,
                      color: shadowColor.cgColor)
        ctx.setFillColor(slider.thumbTintColor.cgColor)
        ctx.addPath(thumbPath.cgPath)
        ctx.fillPath()
        
        // Outline
        
        ctx.setStrokeColor(shadowColor.cgColor)
        ctx.setLineWidth(0.5)
        ctx.addPath(thumbPath.cgPath)
        ctx.strokePath()
        
        if highlighted {
            ctx.setFillColor(UIColor(white: 0.0, alpha: 0.1).cgColor)
            ctx.addPath(thumbPath.cgPath)
            ctx.fillPath()
        }
    }
}
```

thumb의 모양에 대한 경로가 정의 되면 모양을 렌더링(fill) 합니다. thumb가 트랙위로 움직이는 듯한 미세한 느낌의 그림자에 주목하세요. border는 그 다음에 렌더링 되어집니다. 마지막으로, thumb가 하이라이트 됬을때, 이동중인 경우 미묘한 회색 음영이 적용됩니다.

빌드하고 실행하기 전에 highlighted의 선언을 다음과같이 변경하세요.

```swift
var highlighted: Bool = false {
    didSet {
        setNeedsDisplay()
    }
}
```

여기서 강조표시된 속성이 변경될때마다 레이어가 다시 그려지도록 옵저버 속성으로 정의합니다. 이렇게 하면 터치 이벤트가 활성화 되었을때 색상이 약간 변하게 됩니다.

![](https://koenig-media.raywenderlich.com/uploads/2013/05/Screenshot-5.png)

Core Graphics를 사용하여 컨트롤을 렌더링하면 추가적인 노력이 필요합니다. Core Graphics를 사용하면 이미지 하나로 렌더링 되는것보다 훨씬 더 다양한 제어가 가능합니다.

---

<div id='section-id-628'/>

## Handling Changes to Control Properties

시각적 스타일은 다용도 이고, Target-action Notification을 지원합니다. 

범위 슬라이더의 속성중 하나가 렌더링된 후에 코드에서 값이 설정되면 어떤일이 발생하는지 생각해보세요. 예를들어, 슬라이더의 범위를 사전 설정값으로 변경하거나 트랙 강조표시를 변경하여 유효한 범위를 나타낼수 있습니다. 

현재 속성의 설정을 관찰하는것이 없습니다. 컨트롤러에 기능을 추가해야 합니다. 컨트롤의 프레임 또는 그리는걸 업데이트하는 속성 옵저버를 구현해야 합니다. `RangeSlider.swift`를 열고 기존의 속성들을  다음과같이 변경합니다.

```swift
var minimumValue: Double = 0.0 {
    didSet {
        updateLayerFrames()
    }
}

var maximumValue: Double = 1.0 {
    didSet {
        updateLayerFrames()
    }
}

var lowerValue: Double = 0.2 {
    didSet {
        updateLayerFrames()
    }
}

var upperValue: Double = 0.8 {
    didSet {
        updateLayerFrames()
    }
}

var trackTintColor: UIColor = UIColor(white: 0.9, alpha: 1.0) {
    didSet {
        trackLayer.setNeedsDisplay()
    }
}

var trackHighlightTintColor: UIColor = UIColor(red: 0.0, green: 0.45, blue: 0.94, alpha: 1.0) {
    didSet {
        trackLayer.setNeedsDisplay()
    }
}

var thumbTintColor: UIColor = UIColor.whiteColor() {
    didSet {
        lowerThumbLayer.setNeedsDisplay()
        upperThumbLayer.setNeedsDisplay()
    }
}

var curvaceousness: CGFloat = 1.0 {
    didSet {
        trackLayer.setNeedsDisplay()
        lowerThumbLayer.setNeedsDisplay()
        upperThumbLayer.setNeedsDisplay()
    }
}
```

기본적으로 변경된 속성에 의해 영향을 받는 레이어는 `setNeedsDisplay`를 호출하여 변경 사항을 다시 랜더링 해야합니다. 컨트롤의 레이아웃에 영향을 주는 속성을 위해 `setLayerFrames`이 호출됩니다. 

이제 `updateLayerFrame`을 찾고 매소드의 상단에 다음 코드를 추가합니다. 

```swift
CATransaction.begin()
CATransaction.setDisableActions(true)
```

매소드의 맨 아래에 다음 코드를 추가합니다.

```swift
CATransaction.commit()
```

이 코드는 전체 프레임 업데이트를 하나의 변환으로 래핑하여 렌더링을 매끄럽게 만듭니다, 또한 레이어의 암시적 애니메이션을 비활성화하여 레이어 프레임이 즉시 업데이트 되도록 합니다. 

이제 프레임을 자동으로 업데이트 하므로 상한값, 하한값이 변경될때마다 자동으로 업데이트 합니다. continue(touch:event)에서 다음 코드를 찾아 삭제하세요.

```swift
// 3. Update the UI
CATransaction.begin()
CATransaction.setDisableActions(true)

updateLayerFrames()

CATransaction.commit()
```

이것은 range slider가 속성 변경에 반응하도록 하기 위해 필요한 모든것입니다. 

하지만 모든것이 잘 동작하는지 테스트하기 위해 확인 하는 코드가 더 필요합니다.

`ViewController.swift`를 열고, viewDidLoad의 끝에 다음 코드를 추가합니다.

```swift
DispatchQueue.main.asyncAfter(deadline: .now() + .second(1)) {
            self.rangeSlider.trackHighlightTintColor = .red
            self.rangeSlider.curvaceousness = 0.0
        }
```

그러면 1초의 일시 중지후 컨트롤의 일부 속성이 업데이트 됩니다. 트랙의 강조 표시색을 빨강색으로 변경하고 범위 슬라이더의 thumb의 모양을 변경합니다.

프로젝트를 빌드하고 실행하세요. 잠시 후 범위 슬라이더가 다음과 같이 변경됩니다. 아래의 슬라이더 에서 

![](https://koenig-media.raywenderlich.com/uploads/2013/03/BlueSlider.png)

아래의 슬라이더로

![](https://koenig-media.raywenderlich.com/uploads/2013/03/RedSlider.png)

어떻 습니까?

뷰 컨트롤러에 방금 추가한 사용자화한 코드를 개발(테스트)에 대한 가장 흥미롭고 종종 간과되는 점중 하나를 보여줍니다. - 모든 속성을 실행하고 결과를 시각적으로 확인하는것은 사용자의 책임입니다. 이 방법에 접근하는 좋은 방법은 컨트롤을 다른 속성에 연결된 다양한 버튼과 슬라이더로 시각적인 test harness를 만드는 것입니다. 이렇게하면 사용자화한 컨트롤의 속성을 실시간으로 수정할수 있으며 결과를 실시간으로 볼수 있습니다.

---

<div id='section-id-747'/>

## Where To Go From Here? 

완성된 프로젝트는 [여기](https://koenig-media.raywenderlich.com/uploads/2014/08/CustomSliderExample-Swift-7.zip)에서 다운 받을수 있습니다.

---

<div id='section-id-753'/>

## Reference 

[Matt Gemmell’s 25 rules of API design](https://mattgemmell.com/api-design/)<br>
[Cocoa Controls](https://www.cocoacontrols.com/)


