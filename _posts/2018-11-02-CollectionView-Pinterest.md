---
layout:     post
title:      "Swift. UICollectionView Pinterest 레이아웃 "
subtitle:   "UICollectionView Custom Layout Tutorial: Pinterest"
date:       2018-11-2 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich, UICollectionViewLayout]
---

## Table of contents 

  - [<U>UICollectionView Custom Layout Tutorial: Pinterest</U>](#section-id-16)
  - [<U>Getting Started</U>](#section-id-41)
  - [<U>Creating Custom Collection View Layouts</U>](#section-id-55)
  - [<U>Core Layout Process</U>](#section-id-84)
  - [<U>Calculating Layout Attributes</U>](#section-id-101)
  - [<U>Where to Go From Here?</U>](#section-id-280)
  
---

[UICollectionView Custom Layout Tutorial: Pinterest](https://www.raywenderlich.com/392-uicollectionview-custom-layout-tutorial-pinterest)에서 필요한 부분을 의역 했습니다
 
---

<div id='section-id-16'/>

## UICollectionView Custom Layout Tutorial: Pinterest

이 튜토리얼에서 Pinterest App에서 영감받은 사용자화한 UICollectionView 레이아웃을 만들어 봅니다. UICollectionView Layout의 속성을 어떻게 캐시하고 어떻게 동적으로 Cell을 표시하는지에 대해서 배우게 됩니다.

> Update note: 이 튜토리얼은 Xcode 9, Swift4 iOS 11로 업데이트 되었습니다.

iOS 6에서 소개된 `UICollectionView`는 iOS 개발자들 사이에서 가장 인기있는 UI 요소중 하나 입니다. 이것이 매력적인 이유는 데이터와 표시 레이어(presentation layers) 사이의 분리입니다. 이 레이어는 레이아웃을 처리하기 위해 분리된 객체에 의존합니다. 그런 다음 이 레이아웃은 배치 및 뷰의 시각적 속성을 결정합니다.

UIKit에서 제공된 기존 flow layout 을 사용했을 가능성이 크지만 사용자화한 레이아웃을 구성하여 뷰를 원하는 방법으로 배열 할수 있습니다; 이것은 collection view를 유연하고 강력하게 만듭니다. 

`UICollectionView` custom layout 튜토리얼에서 `Pinterest`앱에서 영감받은 레이아웃을 생성할것입니다. 

사용자화한 레이아웃에 대한 많은것을 배우고, 어떻게 레이아웃 속성(layout attributes)들을 연산하고 캐시 하는지 배우고, 셀 크기를 동적으로 처리하는 방법에 대해서 배우게 됩니다.

> Note: 이 튜토리얼은 `UICollectionView`에 대한 기본적인 지식이 있다는걸 가정합니다. 이것이 친숙하지 않다면 
> 다음 튜토리얼 시리즈에서 배울수 있습니다.
> 
> [UICollectionView Tutorial Part 1: Getting Started](https://www.raywenderlich.com/975-uicollectionview-tutorial-getting-started)
> 
> [UICollectionView Tutorial Part 2: Reusable Views and Cell Selection](https://www.raywenderlich.com/1404-uicollectionview-tutorial-reusable-views-selection-and-reordering)
> 
> [Video Tutorial: Collection Views Part 0: Introduction](https://www.raywenderlich.com/2021-video-tutorial-collection-views-part-0-introduction)

---

<div id='section-id-41'/>

## Getting Started 

[여기](https://koenig-media.raywenderlich.com/uploads/2017/09/Starter_Project.zip)에서 시작 프로젝트르 다운받고 실행합니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/08/pinterest-layout-updated-initial.png" width="450" height="650"></center> <br> 

이 앱은 [RWDevCon](https://www.rwdevcon.com/) 이미지들을 표시합니다. 사진들을 검색하고 컨퍼런스에 참석한 참가자들이 얼마나 즐거운지 볼수 있습니다.

사진들은 collectionView의 flow layout을 사용하여 제작 되었습니다. 처음에 보기에는 이 모든게 괜찮은거 같지만 레이아웃 디자인은 확실히 증진시킬수 부분들이 있습니다. 이 사진들은 콘텐츠 영역을 완전히 채우지 못하고 긴 주석을 잘리게 됩니다.

모든 셀의 크기가 같기 때문에 UX는 매우 지루하고 정적입니다. 디자인을 증진시키기 위한 한가지 방법은 각 셀이 필요에 완벽하게 자유롭게 크기를 가질수 있는 사용자화한 레이아웃을 생성하는 것입니다.

---

<div id='section-id-55'/>

## Creating Custom Collection View Layouts

먼저 멋진 collectionview에서 첫번째 단계는 사진첩을 위한 `사용자화한 레이아웃` 클레스를 만드는 것입니다. 

Collection View layouts은 추상 `UICollectionViewLayout` 클레스의 하위 클레스 입니다. 이들은 collectionView에 있는 모든 보이는 속성들을 정의 합니다. 각 속성들은 `UICollectionViewLayoutAttributes`의 인스턴스 이고  item의 `frame` 또는 `transform`으로서 collection view에 각 아이템의 속성들을 포함합니다.

Laouyts 폴더에서 `UICollectionViewLayout`의 하위 클레스이고 `PinterestLayour`이라고 이름 지은  `.swift`을 생성합니다. 

다음으로 새로운 레이아웃을 사용하기 위해 collectionView를 설정 해야합니다. 

`Main.stroyboard`를 열고 `Photo Stream View Controller Scene`에 있는 `CollectionView`를 선택합니다.


<center><img src="/img/posts/PinterestLayout-0.png" width="650" height="450"></center> <br> 

다음으로 `Attributes Inspect` Layout 리스트에서 `Custom`을 선택하고 class를 `PinterestLayout`으로 설정합니다.

<center><img src="/img/posts/PinterestLayout-1.png" width="650" height="450"></center> <br> 

그후 어떻게 동작하는지 봅니다. 앱을 빌드하고 실행합니다.

<center><img src="/img/posts/PinterestLayout-2.png" width="450" height="650"></center> <br> 

<center><img src="https://www.gameartguppy.com/wp-content/uploads/2017/06/basic-confused-2.png" width="450" height="650"></center> <br> 

믿거나 말거나 좋은 징조입니다. collection view는 사용자화한 layout class를 사용한다는 의미입니다. PinterestLayout은 레이아웃 처리와 관련된 매소드를 아직 구현하지 않았기 때문에 cell들이 화면에 표시되지 않습니다.

---

<div id='section-id-84'/>

## Core Layout Process

collection view layout 처리는 collection view와 layout 객체 사이의 협동에 대해서 잠시 생각하는 시간을 가져봅니다. collection view가 어떤 레이아웃 정보가 필요할때, 요청한 어떤것을 제공하기 위해 특정 순서로 특정 매소드들을 호출하여 레이아웃 객체에 요청합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2015/05/layout-lifecycle.png)

레이아웃 하위 클레스는 다음 매소드들을 구현 해야 합니다.

- `collectionViewContentSize`: 이 메소드는 collection view의 콘텐츠의 높이와 넓이를 반환합니다. 그리고 이 메소드는 반드시 재정의(override) 해야합니다. 그 후 보이는 콘텐츠 뿐만 아니라 전체 collection view의 콘텐츠의 높이와 넓이 값을 반환 합니다. collection view는 이것의 내부 scroll view의 content size를 구성하기 위해 내부적으로 이 정보를 사용합니다.
- `prepare()`: 이 메소드는 레이아웃 연산이 발생할때 마다 호출 되어 집니다. 이곳은 collection view의 사이즈, 아이템의 위치를 결정하기 위해 요구하는 연산을 이행하거나 준비하기 좋은 장소 입니다.
- `layoutAttributesForElements(in:)`: 이 메소드는 주어진 사각형 내에 있는 모든 아이템들을 위한 레이아웃 속성 반환해야 합니다. `UICollectionViewLayoutAttributes`의 배열로 collectionview로 속성을 반환합니다.
- `layoutAttributesForItem(at:)`: 요구한 레이아웃 정보를 collection view로 제공합니다. 이것을 반드시 재정의 해야하고 요청된 indexPath에 아이템에 대한 레이아웃 속성을 반환 해야 합니다.

좋습니다. 구현하기 위해 필요한 것들을 알았지만 - 이 속성들을 어떻게 연산 할건가요?

---

<div id='section-id-101'/>

## Calculating Layout Attributes

이 레이아웃 에서, 사진의 높이가 미리 얼마나 될지 모르기 때문에 모든 항목의 높이를 동적으로 계산 해야합니다. PinterestLayout은 이 높이가 필요할때 정보를 제공하는 protocol을 선언 할것입니다.

`PinterestLayout.swift`를 열고 다음 선언을 PinterestLayout 클레스 이전에 선언 합니다.
 
```swift
protocol PinterestLayoutDelegate: class {
  func collectionView(_ collectionView:UICollectionView, heightForPhotoAtIndexPath indexPath:IndexPath) -> CGFloat
}
```

이 코드는 사진의 높이를 요청하는 메소드를 가진 `PinterestLayoutDelegate`를 선언합니다. `PhotoStreamViewController`에서 이 프로토콜을 짧게 구현합니다. 

레이아웃 매소드를 구현하기 전에 한가지 해야할게 있습니다. 레이아웃 처리에 도움이될 속성을 선언 해야 합니다. 

다음을 `PinterestLayout`에 추가합니다.

```swift
// 1
weak var delegate: PinterestLayoutDelegate!

// 2
fileprivate var numberOfColumns = 2
fileprivate var cellPadding: CGFloat = 6

// 3
fileprivate var cache = [UICollectionViewLayoutAttributes]()

// 4
fileprivate var contentHeight: CGFloat = 0

fileprivate var contentWidth: CGFloat {
  guard let collectionView = collectionView else {
    return 0
  }
  let insets = collectionView.contentInset
  return collectionView.bounds.width - (insets.left + insets.right)
}

// 5
override var collectionViewContentSize: CGSize {
  return CGSize(width: contentWidth, height: contentHeight)
}
```

이 코드는 나중에 레이아웃 정보를 제공하기 위해 필요한 어떤 속성들을 정의 합니다. 

1. delegate 참조를 유지합니다. 
2. 레이아웃을 구성하기 위한 이 두개의 속성들은: columns, cell padding 값 입니다
3. 연산된 속성을 캐시하는 배열입니다. `prepare()`을 호출 할때, 모든 아이템에 대한 속성을 연산하고 캐시로 이들을 추가합니다. collection view가 나중에 레이아웃 속성을 요청할때, 효율적으로 이를 할수 있고 이들을 매 시간 다시 연산하는것 대신에 캐시에게 요청(query)할수 있습니다. 
4. content size를 저장하기 위해 선언한 두개의 속성입니다. `contentHeight`는 사진이 추가되는것으로 증가하고 contentWidth는 collection view의 넓이와 그 자체 콘텐츠 inset기반으로 연산 되어 집니다.
5. collection view의 콘텐츠 사이즈를 반환하는 매소드인 `collectionViewContentSize`의 재정의 입니다. 사이즈를 연산하는 이전 단계의 `contentWidth`, `contentHeight` 두개 모두 사용합니다. 

collection view 아이템들에 대한 속성들을 연산할 준비가 되었습니다. 이 아이템들은 현재는 frame으로 구성 되어 있습니다. 이것이 어떻게 이루어 지는지 이해하기 위해 다음의 다이어 그램을 살펴 보세요

![](https://koenig-media.raywenderlich.com/uploads/2015/05/customlayout-calculations1.png)

그 자체 컬럼(`xOffset`을 추적하는 것으로) 기반으로 모든 아이템의 frame을 연산 하고 같은 컬럼(`yOffset`을 추적하는 것으로) 에서 이전 아이템의 위치를 연산합니다.

`수평 위치`를 계산 하려면 아이템에 속해 있는 `열의 시작 X 좌표`를 사용 하고 `cell의 padding 값을 추가` 해야합니다. `수직 위치`는 `같은 열에 이전 아이템의 시작 위치와 이전 아이템의 높이 입니다`. 전체 아이템 높이는 이미지 높이와 콘텐츠 패딩의 합계 입니다. 

`prepare()`에서 위의 것을 해야하고 layout 에서 모든 아이템을 위한 UICollectionViewLayoutAttributes의 인스턴스를 계산하는것이 주된 목표 입니다.

`PinterestLayout`:에 다음 매소드를 추가합니다.

```swift
override func prepare() {
  // 1
  guard cache.isEmpty == true, let collectionView = collectionView else {
    return
  }
  // 2
  let columnWidth = contentWidth / CGFloat(numberOfColumns)
  var xOffset = [CGFloat]()
  for column in 0 ..< numberOfColumns {
    xOffset.append(CGFloat(column) * columnWidth)
  }
  var column = 0
  var yOffset = [CGFloat](repeating: 0, count: numberOfColumns)
    
  // 3
  for item in 0 ..< collectionView.numberOfItems(inSection: 0) {
      
    let indexPath = IndexPath(item: item, section: 0)
      
    // 4
    let photoHeight = delegate.collectionView(collectionView, heightForPhotoAtIndexPath: indexPath)
    let height = cellPadding * 2 + photoHeight
    let frame = CGRect(x: xOffset[column], y: yOffset[column], width: columnWidth, height: height)
    let insetFrame = frame.insetBy(dx: cellPadding, dy: cellPadding)
      
    // 5
    let attributes = UICollectionViewLayoutAttributes(forCellWith: indexPath)
    attributes.frame = insetFrame
    cache.append(attributes)
      
    // 6
    contentHeight = max(contentHeight, frame.maxY)
    yOffset[column] = yOffset[column] + height
      
    column = column < (numberOfColumns - 1) ? (column + 1) : 0
  }
}
```

다음은 각 주석에 대한 설명입니다.

1. cache가 비어 있고 collection view가 존재할때만 레이아웃 속성을 연산합니다.
2. 열 넓이 기반 모든 컬럼에 대해 x좌표와 함께 `XOffset` 배열을 채우고 선언 합니다. `YOffset`배열은 모든 열에 대한 y위치를 추적합니다. 각 열의 첫번째 항목의 offset 이기때문에 YOffset의 각 값을 0으로 초기화 합니다.
3. 이 단 하나의 색션만 있는 레이아웃은 첫번째 색션의 모든 아이템을 반복합니다.
4. 여기서 `프레임` 계산을 수행합니다. `넓이`는 이전에 연산한 `CellWidth` 이고 Cell들 사이의 패딩이 제거됩니다. 사진의 높이를 위해 `delegate`에게 요청하고 이 높이를 기반으로 frame height를 연산하고 상단과 하단을 위해 `cellPadding`을 미리 정의합니다. 그후 현재 열의 x, y offset과 결합하여 속성에 의해 사용되는 `insetFrame`을 생성 합니다.
5. `UICollectionViewLayoutAttributes` 인스턴스를 생성하고 `insetFrame`을 사용하여 자체 프레임을 설정하고 attributes를 `캐시`로 추가합니다.
6. 새롭게 계산된 프레임으로 여기기 위해 `contentHeight`를 확장합니다. 그후 프레임 기반 현재 열에 대한 yOffsetㅇ르 진행 시킵니다. 마지막으로 다음 아이템을 다음 열로 위치시킵니다.

> Note: `prepare()`는 collection view의 layout이 유효하지 않을때(invalidated)마다 호출되므로 속성들 재계산이 필요한 전형적인 구현에서 사용할수 있는 많은 상황이 있습니다. 예를 들면, UICollectionView의 bounds는 방향(orientation)이 변할때 호출변경될수 있습니다. 또는 아이템이 collection 에서 추가되거나 삭제될때도 변경될수 있습니다. 이 경우 이 튜토리얼의 범위를 벗어나지만 중요한 구현에서 이를 인식하는 것이 중요 합니다.

`layoutAttributesForElements(in:)`을 재정의 해야 하고 collection view는 주어진 사각형안에 아이템들이 보이는걸 결정하기 위해 `prepare()` 이후에 호출 합니다.

```swift
override func layoutAttributesForElements(in rect: CGRect) -> [UICollectionViewLayoutAttributes]? {
  
  var visibleLayoutAttributes = [UICollectionViewLayoutAttributes]()
  
  // Loop through the cache and look for items in the rect
  for attributes in cache {
    if attributes.frame.intersects(rect) {
      visibleLayoutAttributes.append(attributes)
    }
  }
  return visibleLayoutAttributes
}
```

cache 에서 attributes 들을 반복하고 이 프레임들이 제공된 CollectionView `rect`와 교차점이 있는지 확인합니다.  해당 직사각형과 교차하는 프레임이 있는 속성을 레이아웃 속성에 추가하면 결국 collection view로 반환합니다.

반드시 구현 해야하는 마지막 메소드는 `layoutAttributesForItem(at:)` 입니다.

```swift
override func layoutAttributesForItem(at indexPath: IndexPath) -> UICollectionViewLayoutAttributes? {
  return cache[indexPath.item]
}
```

요청한 indexPath와 일치하는 레이아웃 속성을 `cache`에서 간단하게 반환하고 되찾아 옵니다.

레이아웃이 동작하는것을 보기 전에, layout delegate를 구현 해야합니다. `PinterestLayout`은 attribute's 프레임의 높이를 계산할때 사진 과 주석의 높이를 제공하기 위해 layout delegate에 의존합니다. 

`PhotoStreamViewController.swift`를 열고 다음을 확장에 추가합니다.

```swift
extension PhotoStreamViewController: PinterestLayoutDelegate {
  func collectionView(_ collectionView: UICollectionView,
                      heightForPhotoAtIndexPath indexPath:IndexPath) -> CGFloat {
    
    return photos[indexPath.item].image.size.height
  }
}
```

여기에 사진의 정확한 높이를 제공합니다.
다음으로, `viewDidLoad()`내에 `super`이후에 다음 코드를 추가합니다.

```swift
if let layout = collectionView?.collectionViewLayout as? PinterestLayout {
  layout.delegate = self
}
```

`PhotoStreamViewController`에 Layout을 위한 delegate 설정을 합니다.

앱을 실행 해봅니다. 사진의 높이에 따라 셀이 적절하게 배치되고 크기가 조정된 것을 볼수 있습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/08/pinterest-layout-updated-final.png" width="450" height="650"></center> <br> 

이제 완전히 사용자화한 collection view layout을 만들었습니다.

---

<div id='section-id-280'/>

## Where to Go From Here?


[여기](https://koenig-media.raywenderlich.com/uploads/2017/09/Final_Project.zip)에서 이 프로젝트의 완성된 코드를 다운 받을수 있습니다.

생각 했던 것보다 적은 작은 작업으로 Pinterest와 같은 사용자화한 레이아웃을 만들었습니다. 

사용자화한 레이아웃에 대해 더 알고 싶다면 다음을 고려해주세요

- [<U>Collection View Progreamming Guide for iOS</U>](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/Introduction/Introduction.html#//apple_ref/doc/uid/TP40012334-CH1-SW1)의 [Creating Custom Layouts](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CreatingCustomLayouts/CreatingCustomLayouts.html) 색션을 읽으세요.
- [<U>Custom Collection View Layout Video Tutorial Series</U>](https://www.raywenderlich.com/3987-custom-collection-view-layout/lessons/1)비디오 튜토리얼에서 인기있는 iOS앱에서 영감을 얻은 대화식 사용자화한 레이아웃을 만들고, 스크롤 동작을 다룹니다.








