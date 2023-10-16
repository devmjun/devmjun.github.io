---
layout:     post
title:      "Swift. UICollectionView Layout 회전 레이아웃"
subtitle:   "UICollectionView Custom Layout Tutorial: A Spinning Wheel"
date:       2018-11-6 18:45:00
author:     "MinJun Ju"
comments: true 
tags: [Swift, UICollectionViewLayout, Raywenderlich]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/blog-bg.jpg
thumbnail-img: /assets/post_img/background/blog-bg.jpg
share-img: /assets/post_img/background/blog-bg.jpg
---

[UICollectionView Custom Layout Tutorial: A Spinning Wheel](https://www.raywenderlich.com/1702-uicollectionview-custom-layout-tutorial-a-spinning-wheel)에서 필요한 부분을 의역 했습니다. 

---

인터넷에서 정말로 창의적인 웹사이트가 몇개를 보았는데 여러 종류의 인터렉션 경험을 모아놓은 `Form Follows Functions`이라는 웹사이트를 우연히 발견했습니다. 여기서 주의를 끌게 한것은 사이트의 회전하는 탐색 바퀴 였고 각 종류의 경험을 나타내는 포스터들을 포함하고 있었습니다.

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-0.png" width="550"></center> <br>

이 튜토리얼은 UICollectionView Custom Layout을 사용하여 spinning navigation wheel을 재현하는 방법을 보여줄것입니다. 시간을 최대한으로 활용하기 위해 2D transform, collection views, custom layout에 대한 기본지식을 가지고 있어야 합니다. 이 주제들이 친숙하지 않다면 다음 아티클을 확인할것을 권장합니다

- [<U>UICollectionView Tutorial Part 1: Getting Started</U>](https://www.raywenderlich.com/9334-uicollectionview-tutorial-getting-started)
- [<U>UICollectionView Tutorial Part 2: Reusable Views and Cell Selection</U>](https://www.raywenderlich.com/9477-uicollectionview-tutorial-reusable-views-selection-and-reordering)
- [<U>Video Series: Collection Views</U>](https://www.raywenderlich.com/#collectionview)
- [<U>Video Series: Custom Collection View Layouts</U>](https://www.raywenderlich.com/#CCVL)

이 튜토리얼을 종료하게 되면 다음을 알게 될것 입니다.

- 기본 클레스로 `UICollectionViewFlowLayout` 사용하는것 없이 자신만의 collection view layout을 생성할수 있습니다.
- bounds 밖에 point 주위에서 뷰를 회전 시킵니다.

---

## Getting Started

먼저 [여기](https://koenig-media.raywenderlich.com/uploads/2015/06/CircularCollectionView-Starter.zip)에서 시작 프로젝트를 다운 받고 빌드하고 실행합니다. 그러면 각 cell이 `raywenderlich.com`의 스토어에 있는 책을 나타내고 있는 격자 모양의 레이아웃을 볼수 있습니다. 

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-1.png" width="550"></center> <br>

이 프로젝트의 설정은 직관적 입니다. CollectionViewController가 있고, 내부에 imageView를 가지고 있는 사용자화된 collection view cell이 있습니다. 이 책의 표시는 `Images`라고 불리우는 디렉토리에 있으며 CollectionViewControlelr는 Images를 데이터 소스로 사용합니다.

할일은 UICollectionViewLayout을 하위클래싱하여 이 cell들을 원형으로 배치하는 것 입니다.

---

## Theory

cell들과 함께 wheel 구조의 다이어그램이 있습니다. yellow 영역은 iPhone의 screen 이고 blue 라운딩된 사각형은 cells입니다. 점으로 된 라인은 이들을 위치시킬 원입니다.

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-2.png" width="550"></center> <br>

이 배열을 설명하기위해 3개의 중요한 매개변수가 필요합니다.

1. 원의 반지름(`radius`)
2. 각 셀 사이의 각도 (`anglePerItem`)
3. 셀의 각도 위치 

아마 언급했던것처럼 모든 셀은 스크린 영역에 맞지 딱 맞지 않습니다. 

0번째 셀이 x도의 각을 가진다고 가정하면, 첫번째 cell은 x + anglePerItem 의 각 위치, 두번째는 seconds x + (2 * anglePerItem) 으로 계속 됩니다. 이것은 n번째 아이템에 대해서 일반화 할수 있습니다.

```swift
angle_for_i = x + (i * anglePerItem)
```

아래에, 좌표계의 각도 묘사를 볼수 있습니다. 양의 각도일때 0도는 center 오른쪽방향을 향하여 지칭하고 음수 각도 일때 왼쪽을 지칭합니다. 그러기 때문에 cell은 0의 각도를 가진 cell은 center에 있고 이것은 완벽한 수직 입니다.

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-3.png" width="550"></center> <br>

이제 이론을 명확하게 이해했고, 코딩을 시작할 준비가 되었습니다.

---

## Circular Collection View Layout

`iOS\Source\Cocoa Touch Class`에서 `CircularCollectionViewLayout`라고 명명된 새로운 `UICollectionViewLayout`을 상속받는 `.swift`파일을 생성합니다. 

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-4.png" width="550"></center> <br>

이 collection view layout의 하위 클레스는 모든 positioning 코드가 포함됩니다. 

UICollectionViewFLowLayout이 이 아닌 UICollectionViewLayout의 하위 클래싱 으로서, `super`를 호출하여 부모의 모든 layout process 부분을 처리 해야 합니다. 

위의 메모에서 flow layout은 grids 레이아웃에는 적합하지만 원형 레이아웃에는 적합하지 않다는걸 발견 했습니다. 

`CircularCollectionViewLayout`에서 `itemSize`와 `radius`에 대한 속성을 생합니다.

```swift
let itemSize = CGSize(width: 133, height: 173)

var radius: CGFloat = 500 {
  didSet {
    invalidateLayout()
  }
}
```

반지름이 변경될때, 모든것을 재연산합니다. 그러한 이유로 `didSet` 내부에서 `invalidateLayout`을 호출합니다. 

`radius` 선언 아래에 `anglePerItem`을 선업합니다.

```swift
var anglePerItem: CGFloat {
  return atan(itemSize.width / radius)
}
```

다음으로 collection view의 contentSize값을 설정하기 위해 `collectionViewContentSize()`를 구현합니다.

```swift
override func collectionViewContentSize() -> CGSize {
  return CGSize(width: CGFloat(collectionView!.numberOfItemsInSection(0)) * itemSize.width,
      height: CGRectGetHeight(collectionView!.bounds))
```

높이는 collection view와 같지만 넓이는 `itemSize.width * numberOfItems` 입니다. 

`Main.storyboard`를 열고 `Collection View`을 선택합니다.

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-5.png" width="450"></center> <br>

`Attributes Inspector`을 열고 `Custom`으로 Layout을 변경하고 Class는 `CircularCollectionViewLayout`으로 선택합니다.

앱을 빌드하고 실행합니다. 스크롤 가능한 구역을 제외하면 아무것도 볼수 없을것입니다. 하지만 의도한것입니다. 이것은 collection view가 Layout을 CirecularCollectionViewLayout으로 정확하게 사용한다는 이야기입니다.

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-6.png" width="550"></center> <br>

---

## Custom Layout Attributes

collection view layout 하위클레싱과 함께 각 위치(angular position)과 `anchorPoint`를 저장하기위해  UICollectionViewLayoutAttributes를 하위클래싱 해야합니다. 

`CircularCollectionViewLayout` 클레스 선언 아래에 다음 코드를 추가 합니다.

```swift
class CircularCollectionViewLayoutAttributes: UICollectionViewLayoutAttributes {
  // 1
  var anchorPoint = CGPoint(x: 0.5, y: 0.5)
  var angle: CGFloat = 0 {
    // 2 
    didSet {
      zIndex = Int(angle * 1000000)
      transform = CGAffineTransformMakeRotation(angle)
    }
  }
  // 3
  override func copyWithZone(zone: NSZone) -> AnyObject {
    let copiedAttributes: CircularCollectionViewLayoutAttributes = 
        super.copyWithZone(zone) as! CircularCollectionViewLayoutAttributes
    copiedAttributes.anchorPoint = self.anchorPoint
    copiedAttributes.angle = self.angle
    return copiedAttributes
  }
}
```

1. `anchorPoint`가 필요합니다. 왜냐하면 center는 아니지만 해당 포인트 주위에서 회전이 발생하기 때문입니다. 
2. `angle`를 설정하는 동안 내부적으로 `angle`을 라디안의 회전으로 `transform`에 같게 설정합니다. 또한 이들을 왼쪽으로 올바르게 겹치게 하길 원하기 때문에 각도가 증가하는 함수로 `zIndex`를 설정합니다. 각도는 라디안으로 표시되고, `zIndex`가 동일한 값으로 반올림되지 않게 하기 위해 1,000,000을 곱하여 값을 증가시킵니다. 이 값은 `Int` 입니다. 
3. `copyWithZone()`을 재정의 합니다. `UICollectionViewLayoutAttributes`는 `NSCopying` 프로토콜을 따르는게 필요하기 때문에 collectionview가 layout 처리를 이행할때`attributes`의 객체는 내부적으로 복사되어 집니다. 객체가 복사되어질때 `anchorPoint` 와 `angle` 프로퍼티가 설정되는것을 보장하기 위해 이 메소드를 재 정의 합니다. 

이제, `CircularCollectionViewLayout`로 돌아가서 `layoutAttributesClass()` 를 구현합니다.

```swift
override class func layoutAttributesClass() -> AnyClass {
  return CircularCollectionViewLayoutAttributes.self
}
```

이것은 collection view에게 layout attributes에 대한 기본 `UICollectionViewLayoutAttributes`으로   `CircularColectionViewLayoutAttributes`를 사용한다고 이야기 합니다. 

layout attributes 인스턴스를 가지려면, CircularCollectionViewLayout의 다른 모든 속성 선언 아래에 `attributesList`라는 이름의 배열을 생성합니다.

```swift
var attributesList = [CircularCollectionViewLayoutAttributes]()
```

---

## Preparing the Layout

collection view가 화면에 처음 나타날때, UICollectionViewLayout method인 `perpareLayout()`이 호출되어 집니다. 이 매소드는 또한 layout이 무효화 될때마다 호출되어집니다.

이것은 layout process 메소드의 중요한 것중 하나입니다. 왜냐하면 이것은 layout attributes를 생성하고 저장하는 장소이기 때문입니다. `CircularCollectionViewLayout`으로 추가하는것으로 발생합니다. 

짧게 설명하면, collection view에서 각 아이템을 반복하고 closure를 실행합니다. 

1. 각 index Path에 대한 CircularCollectionViewLayoutAttributes 인스턴스를 생성하고 size를 설정합니다. 
2. 화면의 중앙에 각 아이템을 위치시키고
3. 라디안에서 `anglePerItem * i` 양에 의해서 각 아이템을 회전 시킵니다.

UICollectionViewLayout을 적절하게 하위클레싱 하기위해서 다음 메소드들을 재 정의 해야 합니다. 주어진 사각형과 index path에 대한 각 아이템에 대한 layout attributes를 반환합니다. collection view는 layout 처리를 할때마다 수십번 매번 이 메소드들을 호출 합니다. 게다가 user가 collection view를 스크롤 할때 또한 이 메소드를 호출합니다. 그래서 이들이 효율적으로 되는것이 중요합니다. 이러한 이유로 `prepareLayout()`에서 layout attributes를 캐시하고 생성 해야합니다. `prepareLayout()`아래에 다음을 추가합니다.

```swift
override func layoutAttributesForElementsInRect(rect: CGRect) -> [AnyObject]? {
  return attributesList
}

override func layoutAttributesForItemAtIndexPath(indexPath: NSIndexPath) 
    -> UICollectionViewLayoutAttributes! {
  return attributesList[indexPath.row]
}
```

첫번째 메소드는 attributes 배열의 전체 요소를 단순히 반환하고, 두번째 메소드는 주어진 index path에 아이템에 대한 attributes를 반환합니다. 이것은 적은 수의 item만 있기때문에 이 튜토리얼의 목적상 괜찮습니다. 하지만 일반적으로 배열을 반복하기를 원하거나 주어진 사각형안에 layout attributes의 frame이 교차하는지 검사하고 이 layout attributes들이 frame과 교차할대만 반환합니다. 이로 인해 화면에 표시되거나 화면에 표시될 아이템만 collection view가 됩니다.

빌드하고 실행합니다. 화면에 cell들을 볼수 있습니다 하지만 외부 지점을 정하여 회전하지 않고 스스로 회전합니다. 원하는 효과는 아니지만 꾀 멋있지 않나요(?)

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-7.png" width="550"></center> <br>

왜 이것이 발생하는지 추측할수 있나요?

---

## Did Someone Say Anchor Point?

아직 설정하지 않았지만 cell의 anchor point에 대해서 논의했던걸 기억 하나요? 

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-8.png" width="450"></center> <br>

anchor points는 모든 scaling transforms, 회전이 일어나는 위치에 대한 `CALayer` 프로퍼티의 속성값입니다. 이 속성의 기본값은 center 이고 지금은 마지막 빌드에서 보았던 중앙입니다.

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-9.png" width="250"></center> <br>

`prepareLayout()`으로 돌아와서 `centerX`의 정의 바로 아래에 `anchorPointY`를 정의합니다.

```swift
let anchorPointY = ((itemSize.height / 2.0) + radius) / itemSize.height
```

그리고 `map(_:)`클로져 내부에 반환 바로 직전에 다음 코드를 추가합니다.

```swift
attributes.anchorPoint = CGPoint(x: 0.5, y: anchorPointY)
```

다음으로 `CircularCollectionViewCell.swift`를 열고 `applyLayoutAttributes(_:)`를 다음과 같이 재정의 합니다. 

`center`와 `transform`같은 기본속성을 적용하기 위해 superclass의 구현을 사용 하였지만 `anchorPoint`는 사용자화된 속성이고 이를 수동으로 적용 해주어야 합니다. 또한 `anchorPoint.y`가 변하는 것에 대해 보완하기 위해 layout circle의 center로 `center.y`를 업데이트 합니다.

빌드하고 실행합니다. 원형태로 누워있는 cell을 볼수 있고 이들을 스크롤링하면 회전하지 않고 화면에서 사라집니다. 

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-10.gif" width="550"></center> <br>

---

## Improving Scrolling

아이템을 배치하는 가장 어려운 부분을 완료했습니다.

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-11.png" width="350"></center> <br>

이제 스크롤링을 구현하기 위해 각도 값을 가지고 놀면 됩니다. 

CircularCollectionViewLayout 으로 돌아가고 클레스 하단에 다음을 추가합니다.

```swift
override func shouldInvalidateLayoutForBoundsChange(newBounds: CGRect) -> Bool {
  return true
}
```

이 메소드에서 `true`를 반환하는것은 이것이 스크롤될때 collection view의 레이아웃을 무효화 하라고 이야기 합니다.

`angle`는 첫번째 아이템의 각 위치로서 정의 되어 집니다. `contentOffset.x`를 알맞은 `angle`값으로 변환하는것으로 스크롤링을 구현합니다. 

`contentOffset.x`는 0에서 `collectionViewContentSize().width - collectionView!.bounds.width`로 이동합니다. 최대 contentOffset값은  `maxContentOffset` 라고 부릅니다. 0에서 0번째 아이템을 가운데에 둡니다 이것은 마지막 아이템의 각 위치가 0일것 이라는걸 의미합니다.

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-12.png" width="750"></center> <br>

*왼쪽에서 시작해서 오른쪽으로 끝나는 navigation wheel 의 상태 입니다.*

오른쪽 시나리오를 생각해보고 다음의 `angle_for_last_item = 0` 방정식을 풀면 어떤 일이 일어나는지 생각 해보세요

```swift
angle_for_last_item = angle_for_zero_item + (totalItems - 1) * anglePerItem
0 = angle_for_zero_item + (totalItems - 1) * anglePerItem
angle_for_zero_item = -(totalItems - 1) * anglePerItem
```

각의 `angleAtExtream` 값으로 `-(totalItems - 1) * anglePerItem`을 정의 합니다. 

```swift
contentOffset.x = 0, angle = 0
contentOffset.x = maxContentOffset, angle = angleAtExtreme
```

여기에서 다음 공식을 사용하여 `contentOffset.x`의 값에 대한 `angle`를 추가하는것은 꾀 쉽습니다. 

```swift
angle = -angleAtExtreme * contentOffset.x / maxContentOffset
```

위의 수학식을 생각하면서, `itemSize`에 대한 선언아래에 추가합니다.

```swift
var angleAtExtreme: CGFloat {
  return collectionView!.numberOfItemsInSection(0) > 0 ? 
    -CGFloat(collectionView!.numberOfItemsInSection(0) - 1) * anglePerItem : 0
}
var angle: CGFloat {
  return angleAtExtreme * collectionView!.contentOffset.x / (collectionViewContentSize().width - 
    CGRectGetWidth(collectionView!.bounds))
}
```

`prepareLayout()`에서 다음 라인을

```swift
attributes.angle = (self.anglePerItem * CGFloat(i))
```

다음과 같이 교체합니다

```swift
attributes.angle = self.angle + (self.anglePerItem * CGFloat(i))
```

이것은 각 아이템으로 `angle`의 값을 추가하기 때문에 상수가 아닌 각도 위치는 `contentOffset.x` 의 함수 입니다.

빌드하고 실행합니다. 화면을 스크롤하고 다음 스크롤과같은 회전을 볼수 있습니다.

<center><img src="/assets/post_img/posts/collectionViewLayout-wheel-13.gif" width="550"></center> <br>

`contentOffset.x`의 값을 사용하여 각도 위치 값을 유도했기 때문에 추가 코드를 작성하지 않아서 유연합니다. 최대값 검사 및 감속 기능을 무료로 제공되어집니다. 

---

## Bonus Material: Optimizations

추후 번역 예정..


