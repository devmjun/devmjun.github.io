---
layout:     post
title:      "Swift. UICollectionView Custom Layout - 1"
subtitle:   "Creating Custom Layouts"
date:       2018-11-2 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, UICollectionViewLayout]
categories: archive
permalink: /archive/:title
---

## Table of contents 

  - [<U>Creating Custom Layouts</U>](#section-id-16)
  - [<U>Subclassing UICollectionViewLayout</U>](#section-id-27)
    - [<U>Understanding the Core Layout Process</U>](#section-id-38)
    - [<U>Creating Layout Attributes</U>](#section-id-65)
    - [<U>Preparing the Layout</U>](#section-id-83)
    - [<U>Providing Layout Attributes for Items in Given Rectangle</U>](#section-id-87)
    - [<U>Providing Layout Attributes On Demand</U>](#section-id-107)
    - [<U>Connecting Your Custom Layout for Use</U>](#section-id-117)
      - [<U>Listing 5-1  Linking your custom layout</U>](#section-id-121)
  - [<U>Making Your Custom Layouts More Engaging</U>](#section-id-129)
    - [<U>Elevating Content Through Supplementary Views</U>](#section-id-133)
    - [<U>Including Decoration Views in Your Custom Layouts</U>](#section-id-147)
    - [<U>Making Insertion and Deletion Animations More Interesting</U>](#section-id-149)
    - [<U>Listing 5-2  Specifying the initial attributes for an inserted cell</U>](#section-id-159)
    - [<U>Improving the Scrolling Experience of Your Layout</U>](#section-id-177)
  - [<U>Tips for Implementing Your Custom Layouts</U>](#section-id-187)

---

[Creating Custom Layouts in Collection View Programming Guide for iOS](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CreatingCustomLayouts/CreatingCustomLayouts.html#//apple_ref/doc/uid/TP40012334-CH5-SW1)에서 필요한 부분을 의역 했습니다.

---

<div id='section-id-16'/>

## Creating Custom Layouts

Custom Layout을 작성하기전에 충분히 Custom Layout을 구현해야 하는 이유를 충분히 고민한 이후에 Custom Layout 구현합니다. 

- grid 기반 레이아웃, line 기반 레이아웃, 한 방향 이상의 스크롤링이 필요할때 
- 셀의 위치가 자주 변경되어져야 하는 경우에 사용자화된 레이아웃을 구현하는것이 flowLayout으로 구현하는게 더 적은 수정이 필요할때 

API관점에서 custom layout 구현하는것은 어렵지 않습니다. 어려운것은 레이아웃에 아이템의 위치를 결정하기 위한 연산을 수행하는것입니다. 

---

<div id='section-id-27'/>

## Subclassing UICollectionViewLayout 

custom Layout 의 경우 `UICollectionViewLayout`을 하위 클레스로 지정하여 설계를 위한 새로운 시작점을 제공해야합니다. 몇개의 method를 제공하여 레이아웃 객체의 핵심 행동을 구현하는 것이 필요합니다. 나머지 메소드는 레이아웃 행동 조정이 필요하다면 재정의할수 있습니다. 핵심 메소드는 다음과 같은 중요한 행동을 처리합니다.

- 스크롤가능한 콘텐츠 영역을 지정합니다.
- collection view가 각 셀과 뷰를 위치시킬수 있게 하기 위해 레이아웃 객체를 만드는 뷰와 셀을 위한 attribute 객체를 제공합니다.

핵심 기능만 하는 레이아웃 객체를 만들수도 있지만. 몇몇의 선택적인 메소드들을 잘 구현한다면 layout 은 더 매력적일것입니다. 

layout 객체는 collectionview의 layout을 생성하기 위해 그 자체의 데이터 제공된 데이터 소스 정보를 사용합니다. layout은 collectionview 속성의 메소드를 호출하는것으로 데이터 소스와 함께 소통하고 레이아웃의 모든 메소드에 접근할수 있습니다. 레이아웃 처리 중에 collectionview가 알고있는것과 알지 못하는것을 알고 있어야합니다. 왜냐하면 레이아웃 객체의 레이아웃 처리가 진행중이라면, collection view는 레이아웃과 뷰의 위치를 추적할수 없습니다. 그러므로 layout 객체가 collectionview의 메소드의 어떤 호출하는것을 제한하지 않을지라도 레이아웃을 연산하는데 필요한 어떤 다른 데이터에 대해서 collectionView에 의존 하면 안됩니다.

<div id='section-id-38'/>

### Understanding the Core Layout Process

collection view는 전체 레이아웃 처리를 관리하기 위해 사용자화한 레이아웃 객체와 직접적으로 동작합니다. collection view가 layout 정보가 필요한지 결정할때 레이아웃 객체를 제공하기 위해 요청합니다. 예를 들어, collection view 는 화면에 첫번째로 보여질때 또는 사이즈가 다시 변경되어 질때 레이아웃 정보에 대한것을 요청합니다. 또한 layout 객체의 `invalidateLayout` 메소드를 호출하는것으로 명시적으로 그 자체 레이아웃을 업데이트 하라고 요청할수 있습니다. `invalidateLayout` 메소드는 존재하는 레이아웃 정보를 쓰고 버리고(throw away) 새로운 레이아웃 정보를 생성하기 위해 레이아웃 객체에게 새로운 레이아웃 정보를 생성하게 합니다. 

> Note: 조심하지 않으면 layout 객체의 `invalidateLayout` 메소드와 collection view의 `reloadData` 메소드와 혼동할수 있습니다. `invalidateLayout` 메소드를 호출하는것이 필연적으로 collection view의 존재하는 cell들과 하위 뷰들을 버리는(throw out)것이 아닙니다. 오히려 레이아웃 객체에게 아이템이 지워지거나, 추가 되거나, 이동할때 필연적으로 자체 모든 레이아웃 속성을 재연산 하도록 합니다. 데이터 소스 내의 데이터가 변경 된다면, `reloadData` 메소드가 적절 합니다. 레이아웃 업데이트를 어떻게 초기화하는지에 관계없이 실제 레이아웃 처리는 동일합니다.

레이아웃 처리 동안, collection view는 레이아웃 객체의 특정 메소드를 호출합니다. 이 메소드들은 아이템 위치를 재 연산하고, 초기의(primary) 정보를 collection view에 제공할수 있는 기회입니다. 다른 메소드들 또한 호출되어 질수 있지만 다음의 메소드들은 항상 다음 순서로 레이아웃 처리중에 호출되어 집니다.

1. [<U>prepareLayout</U>](https://developer.apple.com/documentation/uikit/uicollectionviewlayout/1617752-prepare)는 레이아웃 정보를 제공하기 위해 필요한 선핸연산을 이행하기 위해 사용하는 메소드
2. [<U>collectionViewContentSize</U>](https://developer.apple.com/documentation/uikit/uicollectionviewlayout/1617796-collectionviewcontentsize)는 초기 연산에 기반한 모든 콘텐츠의 전체 사이즈를 반환합니다. 
3. [<U>layoutAttributesForElements(in:)</U>](https://developer.apple.com/documentation/uikit/uicollectionviewlayout/1617769-layoutattributesforelementsinrec)는 특정 사각형의 views 와 cells에 대한 속성을 반환합니다. 

*Figure 5-1 illustrates how you can use the preceding methods to generate your layout information*

<center><img src="/assets/post_img/posts/CustomCollectionViewLayout-0.png" width="550"></center> <br> 


`prepareLayout` 메소드는 레이아웃에서 뷰와 셀의 위치를 결정하기 위해 연산이 필요한지 아닌지 이행할 기회를 얻는 곳입니다. 최소한 이 메소드에서 충분한 정보를 계산하여 콘텐츠 영역의 전체 사이즈를 반환할수 있어야합니다. 반환되어진 이 영역은 step 2의 collection view로 갑니다.

collection view는 자체 스크롤뷰를 적절하게 구성하기 위해 content size를 사용합니다. 예를 들어, 계산된 콘텐츠의 크기가 현재 장치의 화면 bounds보다 수직 및 수평으로 더 확장되어졌다면, 스크롤 뷰가 조정되어 양방향으로 동시에 스크롤할수 있습니다. `UICollectionViewFlowlayout`과는 다르게 콘텐츠 레이아웃을 조정하여 한 방향으로만 스크롤하지 않습니다.

현재 스크롤 위치에 기반하여 collectionview는 특정 사각형에 셀과 뷰의 속성에 대해 요청하기 위해 `layoutAttributesForElementsInRect` 메소드를 호출하고, `보여지는 사각형과 같을수도 있고 같지 않을수도 있습니다.` 정보를 반환한 후에 주요한 레이아웃 처리가 사실상 완료됩니다.(After returning that information, the core layout process is effectively complete)

레이아웃이 끝난 후에, 셀과 뷰들의 속성(attributes)는 collectionview 또는 사용자가 레이아웃을 무효화(invalidates)할때까지 동일하게 남아있습니다. 레이아웃 객체의 `invalidateLayout`메소드를 호출하는것은 새로운 `prepareLayout`메소드를 호출하는것을 시작으로 레이아웃 프로세스가 다시 시작됩니다. 또한 collection view는 스크롤링 하는동안 layout 객체를 자동으로 무효화 할수 있습니다. 유저가 collectionView의 콘텐츠를 스크롤할때, collection view는 layout 객체의 `shouldInvalidateLayoutForBoundsChange:` 메소드를 호출하고 메소드가 `YES`를 반환한다면 레이아웃을 무효화 합니다.

> Note: `invalidateLayout` 메소드를 호출한다고 레이아웃 처리가 즉각적으로 일어나지 않는다는것을 기억하는것이 유용합니다. 이 메소드는 단지 레이아웃이 데이터와 일치하지 않고 업데이트가 필요하다고 표시합니다.다음 뷰 업데이트 사이클동안 collection view는 레이아웃이 더러운지(?) 확인하고 더럽다면 업데이트 해야하는지를 확인합니다. 실제로 매번 즉각적인 레이아웃 업데이트를 트리거하지 않고도 여러번 연속적으로 invalidateLayout 메소드를 호출할수 있습니다.

<div id='section-id-65'/>

### Creating Layout Attributes

레이아웃의 책임이 있는 속성 객체는 `UICollectionViewLayoutAttributes` 클레스의 인스턴스 입니다. 이 인스턴스는 앱에서 다양한 다른 메소드에서 생성되어질수 있습니다. 앱이 수천개의 아이템들을 다루지 않을때, 레이아웃을 준비하는동안 이 인스턴스를 만드는것이 합리적입니다. 

왜냐하면 이 레이아웃 정보는 그때그때 봐가며 연산되는것보다는 캐시할수 있고 참조 되어질수 있기 때문입니다. 모든 속성 정보를 미리 연산하는 비용이 앱에서 캐싱하는것보다 더 이득이라면 속성들을 요청할때 그 순간에 즉시 속성을 생성하는것이 쉽습니다. 

그럼에도 불구하고 `UICollectionViewLayoutAttributes`의 새로운 인스턴스를 생성할때 다음 클레스 메소드중 하나를 사용합니다.

- [<U>layoutAttributesForCellWithIndexPath:</U>](https://developer.apple.com/documentation/uikit/uicollectionviewlayoutattributes/1617759-init)
- [<U>layoutAttributesForSupplementaryViewOfKind:withIndexPath:</U>](https://developer.apple.com/documentation/uikit/uicollectionviewlayoutattributes/1617801-init)
- [<U>layoutAttributesForDecorationViewOfKind:withIndexPath:</U>](https://developer.apple.com/documentation/uikit/uicollectionviewlayoutattributes/1617786-init)

반드시 화면에 보여주는 뷰 타입에 기반한 올바른 클레스 메소드를 사용해야합니다. 왜냐하면 collection view는 데이터 소스 객체에서 적절한 타입의 뷰를 요청하기 위한 정보를 사용하기 때문입니다. 

각 속성 객체를 생성한 이후에, 상응하는 뷰를 위해 연관된 속성을 설정합니다. 최소한, 레이아웃에서 뷰의 위치와 사이즈를 설정합니다. 뷰가 겹치는 경우에는 [zIndex](https://developer.apple.com/documentation/uikit/uicollectionviewlayoutattributes/1617768-zindex) 속성 값을 할당하여 겹치는 뷰의 일관된 순서를 보장합니다. 다른 속성을 사용하면 셀 또는 뷰의 가시성 또는 외형을 제어할수 있고 필요에 따라서 변경할수도 있습니다. 표준 attributes 클레스가 앱에 맞지 않는다면, 하위 클레싱할수 있고 각 뷰에 대한 다른 정보를 저장하기 위해 확장할수 있습니다. layout attributes를 하위 클레싱할때 `isEqual`메소드 구현을 요구합니다: 사용자화된 속성을 비교하기 위한 메소드를 구현해야합니다. 왜냐하면 collection view는 자체의 어떤 연산을 위해서 이 메소드를 사용합니다. 

layout attributes 에 대한 추가적인 정보는 [UICollectionViewAttributes Class Reference](https://developer.apple.com/documentation/uikit/uicollectionviewlayoutattributes)를 참조해주세요 

<div id='section-id-83'/>

### Preparing the Layout

레이아웃 사이클이 시작될때, 레이아웃 객체는 레이아웃 처리가 시작하기 전에 `prepareLayout`을 호출합니다. 이 method는 나중에 레이아웃을 통지하기 위한 정보를 연산할 기회를 제공합니다. `prepareLayout` 메소드는 사용자화 레이아웃 구현을 요구하지 않지만 필요하다면 초기연산을 작성하는 기회로 제공되어 집니다. 이 메소드가 호출된 이후에, 레이아웃은 collectionview의 콘텐츠 사이즈, 레이아웃 처리의 다음 단계를 연산하기 위한 충분한 정보를 가져야합니다. 그러나 이 정보는 최소한의 요구사항만 있는것에서, 레이아웃에서 사용할 모든 레이아웃 속성 객체를 작성, 저장하는 데까지 다양합니다. prepareLayout 메소드를 사용하면 앱의 인프라와 미리 요청된 계산 사항을 연산하는 것이 합리적입니다. prepareLayout 메소드의 예는 [prepareLayout](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/AWorkedExample/AWorkedExample.html#//apple_ref/doc/uid/TP40012334-CH8-SW1)을 참조하세요

<div id='section-id-87'/>

### Providing Layout Attributes for Items in Given Rectangle 

레이아웃 처리의 마지막 단계동안에는, collection view는 레이아웃 객체의 `layoutAttributesForElementsInRect:` 메소드를 호출합니다. 이 메소드의 목적은 모든 cell과 모든 supplemenetary, 지정된 사각형에 교차되는 decoration뷰를 위한 layout attributes를 제공합니다. 큰 스크롤가능한 콘텐츠 영역의 경우 collection view는 현재 보여져야 하는 콘텐츠 영역의 일부분에 있는 아이템의 속성에 대해서 요청해야 합니다. figure 5-2에서 레이아웃 객체가 두번째 헤더뷰와 함께 cells의 6에서 20까지 보여주기 위해 필요한 콘텐츠 입니다. 반드시 collection view 콘텐츠 영역의 어떤 부분에 대한 레이아웃 속성을 제공할 준비가 되어 있어야 합니다. 이러한 attributes는 아이템 추가, 삭제에 대한 애니메이션을 용이하게 하는데 사용될수 있습니다.

<center><img src="/assets/post_img/posts/CustomCollectionViewLayout-1.png" width="450"></center> <br> 

왜냐하면 `layoutAttributesForElementsInRect:`메소드는 레이아웃 객체의 `prepareLayout`메소드 이후에 호출되어 지고, 필요한 속성을 반환하거나 생성하기 위해 필요한 대부분의 정보를 이미 가지고 있어야합니다. `layoutAttributesForElementsInRect:` 메소드의 구현은 다음 단계를 따릅니다.

1. prepareLayout 메소드에서 캐쉬된 속성에 접근하거나, 새로운것을 생성하기 위해 데이터 생성을 반복합니다.
2. 각 `layoutAttributesForElementsInRect:` 메소드로 전달되어진 사각형이 교차(intersects)되어지는지 확인하기 위해 아이템의 frame을 확인합니다.
	- layoutAttributesForElementsInRect에 생성할 cell, view가 있는지 확인한다는 의미
3. 교차하는 각 항목에 대해 해당 `UICollectionViewLayoutAttributes` 객체를 배열에 추가합니다. 
4. layout attributes의 배열을 collectionv view로 추가합니다. 

레이아웃 정보를 어떻게 관리하느냐에 따라서 다릅니다. `prepareLayout` 메소드에서 `UICollectionViewLayoutAttribtes` 객체를 생성하거나 대기할수 있고 또는 `layoutAttribtesForElementsInRect` 메소드에서 할수도 있습니다. 애플리케이션의 요구에 맞는 구현을 구성하는 동안 레이아웃 정보를 캐싱하는 이점을 기억하세요. 셀에 대해 반복적으로 새로운 레이아웃 속성을 계산하는 것은 값 비싼 작업으로 앱의 성능에 눈에 띄게 해를 끼칠수 있습니다. 즉, collection view가 관리하는 아이템의 양이 많을때 레이아웃 속성을 요청할때 layout 속성을 연산하는것이 합리적일수 있습니다. 어떤전략이 더 적합한지 앱의 요구에 따라서 판단해야합니다.

> Note: layout 객체는 또한 개별 아이템에 대한 요구에 따라 레이아웃 속성을 제공할수 있어야 합니다. collection view는 적절한 애니메이션을 만드는 것을 포함하여 여러가지 이유로 일반 레이아웃 처리의 외부정보를 요청할수 있습니다. 요구(demand)되는 layout attributes를 제공하는것에 대한 추가적인 정보는 [Providing LAyout Attributes On Demand](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CreatingCustomLayouts/CreatingCustomLayouts.html#//apple_ref/doc/uid/TP40012334-CH5-SW2)를 참조해주세요.

`layoutAttributesForElementsInRect`를 어떻게 구현하는지에 대한 예제는 [Providing Layout Attributes.](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/AWorkedExample/AWorkedExample.html#//apple_ref/doc/uid/TP40012334-CH8-SW9)를 참조해주세요.

<div id='section-id-107'/>

### Providing Layout Attributes On Demand

collection view는 주기적으로 외부의 일정하게 계획된 레이아웃 처리의 개별 아이템을 위한 attribute를 제공하기 위해 레이아웃 객체를 요청합니다. 예를 들어 아이템에 대한 애니메이션 추가 & 삭제를 작성할때 collection view는 layout 객체에 대한 정보를 요구 합니다. 레이아웃 객체가 각 cell, supplementary, 또는 이것들을 지원하는 decoration view에 대한 레이아웃 속성을 제공하기 위해 반드시 준비되어 있어야 합니다. 다음 메소드를 재정하여 이것을 해야합니다.

- [<U>layoutAttributesForItemAtIndexPath:</U>](https://developer.apple.com/documentation/uikit/uicollectionviewlayout/1617797-layoutattributesforitem)
- [<U>layoutAttributesForSupplementaryViewOfKind:atIndexPath:</U>](https://developer.apple.com/documentation/uikit/uicollectionviewlayout/1617792-layoutattributesforsupplementary)
- [<U>layoutAttributesForDecorationViewOfKind:atIndexPath:</U>](https://developer.apple.com/documentation/uikit/uicollectionviewlayout/1617809-layoutattributesfordecorationvie)

위의 메소드들의 구현은 주어진 cell, view에 대한 현재 레이아웃 속성을 되찾아 와야 합니다. 모든 사용자화된 레이아웃 객체는 `layoutAttributesForItemAtIndexPath:`메소드를 구현할것으로 기대되어 집니다. layout이 supplementary view를 포함하지 않는다면 `layoutAttributesForSupplementaryViewOfKind:atIndexPath:` 메소드를 제정의할 필요가 없습니다. 동일하게 decoration view를 포함하지 않는다면 `layoutAttributesForDecorationViewOfKind:atIndexPath:`를 재정의할 필요가 없습니다. `attributes`를 반환할때, layout attributes를 업데이트 하지 않아야 합니다. 레이아웃 정보에 대한 변경이 필요하다면 layout 객체를 무효화하고 이후(subsequent) 레이아웃 사이클 동안에 데이터를 업데이트하도록 해야합니다.

<div id='section-id-117'/>

### Connecting Your Custom Layout for Use

collection view로 사용자화된 레이아웃을 연결하는 2가지 방법이 있습니다. 프로그래밍적으로 또는 스토리보드를 통하는 방법입니다. collection view는 기록가능한 속성인 `collectionviewLayout`을 통해서 그 자체 레이아웃과 연결됩니다. 사용자화된 구현으로 레이아웃을 설정하기 위해 사용자화된 레이아웃 객체의 인스턴스로 collection view의 레이아웃을 설정합니다. 5-1는 필요한 코드를 보여줍니다.

<div id='section-id-121'/>

#### Listing 5-1  Linking your custom layout

```swift
collectionView?.collectionViewLayout = MyCustomLayout()
```

---

<div id='section-id-129'/>

## Making Your Custom Layouts More Engaging

레이아웃 처리가 필요한 동안에 각 셀과 뷰를 위한 레이아웃 객체를 제공하지만 사용자화된 레이아웃과 함께 유저 경험을 증진시킬수 있는 다른 행동이 필요합니다. 이러한 동작은 선택사항이지만 권장되어 집니다.

<div id='section-id-133'/>

### Elevating Content Through Supplementary Views

Supplementary view는 collection view의 cell들과 분리되어 지고 이들 자체의 layout 속성 세트를 가집니다. 셀과 같이 이 supplementary 뷰들은 데이터 소스 객체에 의해서 제공되어 지지만, 이들의 목적은 앱의 메인 콘텐츠를 강화 시키는 목적입니다. 예를 들어 `UICollectionViewFlowLayout`은 supplementary를 section header 와 footers로 사용합니다. 다른 앱은 supplementary view를 사용하여 cell에 대한 정보를 화면에 표시하기위해 자체 텍스트 레이블을 사용할수 있습니다. collection view cells과 같이 supplementary view는 collectionview에서 사용되는 리소스의 양을 최적화 하기 위해 재활용 처리를 받게 됩니다. 그러므로 앱에서 사용되는 모든 supplementary view는 [UICollectionViewReusableView](https://developer.apple.com/documentation/uikit/uicollectionreusableview) 클레스를 상속 받아야 합니다. 

supplementary view를 layout에 추가하기 위해서 다음 단계를 따릅니다.

1. [<U> registerClass:forSupplementaryViewOfKind:withReuseIdentifier:</U>](https://developer.apple.com/documentation/uikit/uicollectionview/1618103-register) 또는 [<U> register(_:forSupplementaryViewOfKind:withReuseIdentifier:)</U>](https://developer.apple.com/documentation/uikit/uicollectionview/1618101-register) 메소드를 사용하여 collection view의 레이아웃 객체에 supplementary view를 등록합니다
2. 데이터 소스에서 [<U>collectionView(_:viewForSupplementaryElementOfKind:at:)</U>](https://developer.apple.com/documentation/uikit/uicollectionviewdatasource/1618037-collectionview)을 구현합니다. 왜냐하면 이 뷰들은 재사용 가능하기 때문에 재사용하기 위해 또는 새로운 재사용 가능한 뷰를 생성하기 위해 이것을 반환하기 전에 필요한 어떤 데이터를 설정하기 위해 [<U> dequeueReusableSupplementaryView(ofKind:withReuseIdentifier:for:)</U>](https://developer.apple.com/documentation/uikit/uicollectionview/1618068-dequeuereusablesupplementaryview)를 호출 합니다.
3. cell에서 했던것과 마찬가지로 supplementary view에 대한 layout attributes objects를 생성합니다.
4. `layoutAttributesForElementsInRect:` 메소드에 의해서 반환된 attributes의 배열에 supplementary view에 대한 layout attributes 객체가 포함되어있습니다. 
5. 요청(queried) 되어질 때마다 특정 supplementary view를 위한 attribute 객체를 반환하기 위해 `layoutAttributesForSupplementaryViewOfKind:atIndexPath: ` 메소드를 구현합니다.

사용자화된 레이아웃 에서 supplementary 뷰에 대한 속성객체를 생성하는 처리는 cells에서 한것과 거의 동일하지만 custom layout에서 여러 타입의 supplementary 뷰들을 가질수 있지만 cell은 하나의 타입으로 제한되어 집니다. 왜냐하면 supplementary 뷰는 main content를 강화하기 위한 것이기 때문에 main content와 분리되어 있기 때문입니다. 앱의 콘텐츠를 보완할수 있는 방법은 여러가지고 있으므로 supplementary view의 각 메소드는 다른 뷰와 구별하기 위해 어떤 뷰를 지정하여 레이아웃이 해당 타입에 따라 속성을 올바르게 계산할수 있도록 합니다. 사용하기 위한 supplemenetary 뷰가 등록되어질때, 제공한 문자열(identifier 값)은 레이아웃 객체에서 뷰를 다른뷰와 구별하는데 사용합니다. 사용자화된 레이아웃에 supplementary 뷰를 통합하는 예는 [Incorporating Supplementary Views](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/AWorkedExample/AWorkedExample.html#//apple_ref/doc/uid/TP40012334-CH8-SW2)을 참조하세요.

<div id='section-id-147'/>

### Including Decoration Views in Your Custom Layouts

<div id='section-id-149'/>

### Making Insertion and Deletion Animations More Interesting

뷰는 레이아웃 도중에 cell을 삽입, 삭제 하는것은 흥미로운 도전입니다. cell을 추가하는것은 다른셀과 뷰의 레이아웃 변경을 야기합니다. layout 객체가 존재하고 있는 뷰와 샐들의 현재 위치에서 새로운 위치로 어떻게 애니메이션할지 알고 있더라도 삽입되는 현재 셀에 대한 위치가 없습니다. 애니메이션 없이 새로운 cell을 추가하는것보다, collection view는 애니메이션에 대한것을 사용하기 위해 초기의 attributes 모음을 제공하기 위해 레이아웃 객체에 요청합니다. 마찬가지로, cell이 삭제되어질때 collection view는 어떤 애니메이션의 마지막 위치에 대한것을 사용하기 위해 마지막 속성값의 모음을 제공하기 위한 레이아웃 객체를 요청합니다.

초기의 attributes가 어떻게 동작하는지 이해하기 위해 예를 보면 도움이 됩니다. Figure 5-3은 레이아웃을 시작하여 처음에는 셀이 3개뿐인 collection view를 보여줍니다. 세 셀을 삽입하면 레이아웃 객체에 삽입되는 셀에 대한 초기 속성을 제공하도록 collection view가 요청 합니다.

<center><img src="/assets/post_img/posts/CustomCollectionViewLayout-2.png" width="550"></center> <br> 

5-2는 그림 5-3에서 cell을 추가하는것에 대한 초기 attirbutes를 지정하기 위해 사용할수 있는 코드가 표시됩니다. 이 메소드는 cell의 위치를 중심으로 설정하여 투명하게 만듭니다. 레이아웃 객체는 마지막 위치를 제공하고 알파값을 제공합니다.

<div id='section-id-159'/>

#### Listing 5-2  Specifying the initial attributes for an inserted cell

```swift
//  Converted to Swift 4 by Swiftify v4.2.24871 - https://objectivec2swift.com/
func initialLayoutAttributesForAppearingItem(at itemIndexPath: IndexPath) -> UICollectionViewLayoutAttributes? {
    let attributes: UICollectionViewLayoutAttributes? = layoutAttributesForItem(at: itemIndexPath)
    attributes?.alpha = 0.0

    let size: CGSize = collectionView.frame.size
    attributes?.center = CGPoint(x: size.width / 2.0, y: size.height / 2.0)
    return attributes
}
```

> Note: Listing 5-2는 cell 하나가 추가될때 모든 셀들을 애니메이션화 할것 이기 때문에 이미 존재했던 3개의 셀도 collection 뷰의 중심에서 나올(pop)것 입니다. 삽입되는 cell만 애니메이션화 하기 위해서는 item의 indexPath가 [prepareForCollectionViewUpdates:](https://developer.apple.com/documentation/uikit/uicollectionviewlayout/1617784-prepareforcollectionviewupdates) 메소드로 전달되어진 아이템의 index path와 일치하는 아이템의 index path인치 확인해야 하고 일치한다면 애니메이션을 이행해야 합니다. 그렇지 않으면 [initialLayoutAttributesForAppearingItemAtIndexPath:](https://developer.apple.com/documentation/uikit/uicollectionviewlayout/1617789-initiallayoutattributesforappear)의 super 메소드를 호출하여 attributes를 반환해야합니다.

삭제에 대한 처리는 초기 속성 대신 최종 속성을 지정한다는 점을 제외하고 삽입 처리와 동일합니다. `UICollectionViewLayout` 클레스 내에서 6개의 메소드가 가능합니다 - 아이템, supplementary view, decoration view의 초기화와 마지막 속성에 대한 두 메소드를 분리합니다.

<div id='section-id-177'/>

### Improving the Scrolling Experience of Your Layout

사용자화된 레이아웃 객체는 더 나은 유저 경험을 만들기 위해 collection view의 스크롤 행동에 영향을 줄수 있습니다. 스크롤과 관련된 터치 이벤트가 끝나면 스크롤 뷰는 현재 속도 및 감속 속도를 기반으로 스크롤 콘텐츠의 최종으로 위치해야할 장소를 결정합니다. collection view가 최종 위치를 알때 [targetContentOffsetForProposedContentOffset:withScrollingVelocity:](https://developer.apple.com/documentation/uikit/uicollectionviewlayout/1617729-targetcontentoffset)메소드를 호출하는것으로 위치를 수정해야 한다면 collection view는 layout 객체에 요청합니다. 왜냐하면 기본 콘텐츠가 움직이고 있을때 해당 메소드가 호출되기 때문에 사용자화된 레이아웃은 스크롤링하는 콘텐츠의 마지막 위치에 영향을 줄수 있습니다. 

그림 5-4는 collection view의 스크롤 행동을 변경하기 위해 layout object를 어떻게 사용할수 있는지 실 사례를 보여줍니다. collection view 오프셋이 (0, 0)에서 시작하고 사용자가 왼쪽으로 스와이프 한다고 가정합니다. collection view는 스크롤이 자연스럽게 중단되는 위치를 계산하고 해당 값을 `제안된(proposed)` cotent offset 값으로 값을 제공합니다. 레이아웃 객체는 collection view의 보여지는 bounds에 정확히 중앙에 아이템을 위치 시키기 위해  제안된 값을 변경할수 있습니다. 이 새로운 값은 target content offset이 되고, `targetContentOffsetForProposedContentOffset:withScrollingVelocity:` 메소드에서 반환할수 있습니다. 

<center><img src="/assets/post_img/posts/CustomCollectionViewLayout-3.png" width="450"></center> <br> 

---

<div id='section-id-187'/>

## Tips for Implementing Your Custom Layouts

사용자화된 레이아웃 객체를 구현하기 위한 팁과 제안입니다.

- 이후에 필요한 UICollectionViewLayoutAttributes 객체를 저장하고 생성하기 위해 prepareLayout 메소드 사용하는것을 고민하세요. collection view는 어떤 지점에서 layout attributes 객체에 대한것을 요청할 것이기 때문에 어떤 경우에 이들을 미리 연산하고 저장하는것이 타당합니다. 이것은 작은 수의 아이템을 가지거나, 드물게 이 아이템들의 layout attributes를 변경해야할때 특히 좋습니다. 그러나 레이아웃이 수천개의 아이템들을 관리한다면 캐싱하는것과 재 연산하는것의 이점들을 다시 확인 해야 합니다. 가변 크기 아이템의 경우 일반적으로 캐싱은 복잡한 레이아웃 정보를 정기적으로 재 계산할 필요성을 제거해줍니다. 많은 수의 고정 크기 아이템의 경우 요구에 따라 attribute을 계산하는것이 더 간단할수 있습니다. attribute가 자주 변경되는 아이템의 경우 캐싱이 메모리의 여분 공간을 차지할수 있으므로 다시 연산할수 있습니다.
- `UICollectionView`를 하위클레싱 하는것을 피하세요. collection view는 그 자체의 외형이 없거나 조금 있습니다. 대신 데이터 소스 객체와 레이아웃 객체의 모든 레이아웃 관련 정보에서 자체의 모든 뷰들을 가져옵니다. 레이아웃을 3차원으로 배치하려고 할 경우 셀과 뷰를 적절하게 3D transform설정한 custom layout을 구현하는이 적절합니다.
- 사용자화된 레이아웃 객체의 `layoutAttributesForElementsInRect:`에서 `UICollectionView`의 [visibleCells](https://developer.apple.com/documentation/uikit/uicollectionview/1618056-visiblecells)를 절대 호출하지 마세요. collection view는 layout 객체가 이야기하는것 이외에 아이템이 배치되는것에 대해서 아무것도 알지 못합니다. 그래서 보이는 셀에 대한것을 요청하여 layout object로 전달할수 있습니다. layout 객체는 콘텐츠 영역에 아이템위치에 대해서 항상 알고 있어야 하고 언제든지 이 아이템들의 attirbutes를 반환 할수 있어야 합니다. 대 부분의 경우에, 이것을 그 자체로 할수 있습니다. layout 객체는 아이템을 위치시키기 위해 데이터 소스의 정보에 의존하여 아이템을 배치할수 있습니다. 

---








