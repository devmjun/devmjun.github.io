---
layout:     post
title:      "Swift. UICollectionView Custom Layout - 2"
subtitle:   "Creating Custom Layouts"
date:       2018-11-3 18:46:00
author:     "MinJun Ju"
comments: true 
tags: [Swift, UICollectionViewLayout]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/about-bg_sub.jpg
thumbnail-img: /assets/post_img/background/about-bg_sub.jpg
share-img: /assets/post_img/background/about-bg_sub.jpg
---

## Table of contents

- [<U>Custom Layouts: A Worked Example</U>](#section-id-16)
- [<U>The Concept</U>](#section-id-26)
- [<U>Initialization</U>](#section-id-34)
  - [<U>Listing 6-1  Connecting to the custom protocol</U>](#section-id-42)
  - [<U>Listing 6-2  Initializing variables</U>](#section-id-52)
    - [<U>Listing 6-3  Fulfilling requirements for subclassing layout attributes</U>](#section-id-82)
- [<U>Preparing the Layout</U>](#section-id-100)
  - [<U>Creating the Layout Attributes</U>](#section-id-104)
    - [<U>Figure 6-2  Connecting parent and child index paths</U>](#section-id-108)
    - [<U>Listing 6-4  Creating layout attributes</U>](#section-id-115)
  - [<U>Storing the Layout Attributes</U>](#section-id-137)
    - [<U>Listing 6-5  Storing layout attributes</U>](#section-id-147)
- [<U>Providing the Content Size</U>](#section-id-185)
  - [<U>Listing 6-7  Collecting and processing stored attributes</U>](#section-id-191)
- [<U>Providing Individual Attributes When Requested</U>](#section-id-214)
- [<U>Incorporating Supplementary Views</U>](#section-id-224)
  - [<U>Listing 6-9  Creating attributes objects for supplementary views</U>](#section-id-230)
  - [<U>Listing 6-10  Providing supplementary view attributes on demand</U>](#section-id-257)
- [<U>Recap</U>](#section-id-267)

---

[Creating Custom Layouts in Collection View Programming Guide for iOS](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CreatingCustomLayouts/CreatingCustomLayouts.html#//apple_ref/doc/uid/TP40012334-CH5-SW1)에서 필요한 부분을 의역 했습니다.

---

<div id='section-id-16'/>

## Custom Layouts: A Worked Example

사용자화된 collection view layout 을 생성하는것은 간단하지만 자세한 구현은 재 각각 입니다. layout은 반드시 collection view가 포함하고 있는 모든 뷰에 대한 attributes object를 생산해야 합니다. 이러한 attributes이 작성되는 순서는 애플리케이션의 특성에 따라 달라집니다. 수천개의 아이템을 가지고 있는 collection view의 layout attribute를 미리 계산하고 캐싱하는것은 시간이 많이 걸리는 처리이기 때문에 각 아이템들에 대해서 요청 되었을때만 attributes를 생성하는것이 더 적합합니다. 몇개의 아이템만있는 애플리케이션 에서는 레이아웃 정보를 한번만 연산하고 attributes가 필요하여 요청할때 참조하도록 캐싱하면 애플리케이션에서 불필요한 많은 재 연산들을 저장할수 있습니다. 이 장의 예제는 두번째범주에 속합니다(collection view의 아이템 수가 적은 경우)

제공된 셈플 코드가 사용자화된 레이아웃 만드는 가장 명확한 방법은 아니라는 점을 명심하세요. 사용자화된 레이아웃 생성을 시작하기 전에 앱이 최상의 성능을 발휘할 수 있도록 가장 적합한 구현 구조를 고안하는 데 시간을 투자하세요. 레이아웃을 사용자화 하는 처리에 대한 개념의 개요는 [Creating Custom Layouts](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CreatingCustomLayouts/CreatingCustomLayouts.html#//apple_ref/doc/uid/TP40012334-CH5-SW1)를 참조하세요.

이 장에서 특정한 순서로 사용자화된 레이아웃 구현 진행 방법을 보여 주기 때문에 특정 구현을 목표로 두고 위에서 아래로 예제를 따라합니다. 이 예제는 완성된 앱을 구현하는것이 아니라 사용자화된 레이아웃 생성에 집중합니다. 그러므로 최종 제품을 만드는데 사용되는 뷰 및 뷰 컨트롤러의 구현은 제공되지 않습니다. 레이아웃은 다른 셀로 셀을 연결하는 선을 만들기 위해 사용자화된 뷰와 그 자체 셀을 collection view의 cell들로 사용합니다. collection view에 대한 사용자화된 셀, 뷰에 대한 내용은 이전 장에서 다루어졌고 추가적인 정보는 [Collection View Basics](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CollectionViewBasics/CollectionViewBasics.html#//apple_ref/doc/uid/TP40012334-CH2-SW1) 와 [Designing Your Data Source and Delegate](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CreatingCellsandViews/CreatingCellsandViews.html#//apple_ref/doc/uid/TP40012334-CH7-SW1)를 참조하세요.

---

<div id='section-id-26'/>

## The Concept

작업 예제의 목적은 그림 6-1에서 볼수 있는 다이어그램과 같은 계층적 트리(hierarchichal tree)를 표시하기 위한 사용자화된 레이아웃을 구현하는 것입니다. 예제 코드는 설명과 코드 조각(code snippets of code), 사용자 정의 처리 방법의 요점을 제공합니다. collection view의 각 섹션은 트리에서 하나의 레벨로 간주 되어 집니다.(Each section of the collection view constitutes one level of depth into the tree): **Section 0**은 NSObject cell만 포함합니다. **Section 1**은 NSObject의 cell의 모든 자식들이 포함됩니다. **Section 2**는 그 자식들의 cell의 모든 자식들을 포함합니다. 각 셀은 관련 클레스 이름에 대한 레이블이 있는 사용자화된 셀이고 cell들은 supplementary view와 각 사이에 연결되어 있습니다. 왜냐하면 connector view class는 그리기 위해 얼마나 많이 연결해야 할지 결정하고, 우리의 데이터 소스에서 데이터로 접근해야 합니다. 따라서 이들을 연결하기 위해 supplementary view로 구현하는것이 decoration view로 구현하는 것보다 합리적 입니다.

<center><img src="/assets/post_img/posts/CustomCollectionViewLayout-4.png" width="450"></center> <br>

---

<div id='section-id-34'/>

## Initialization

사용자화된 레이아웃 생성하는 첫번째 단계는 [UICollectionViewLayout](https://developer.apple.com/documentation/uikit/uicollectionviewlayout) class를 하위클레스로 만드는 것입니다. 사용자회된 레이아웃을 만들기 위해 기초적으로 필요한 것들을 제공해야 합니다. 

이 예제에서는 특정 아이템 간의 레이아웃 간격을 통지하기 위해 사용자화된  프로토콜이 필요합니다. 특정 아이템의 속성이 데이터 소스에서 추가 정보를 필요할때 데이터 소스에 직접 연결하기 보다는 사용자화된 레이아웃에 대한 프로토콜을 구현하는것이 가장 좋습니다. 결국 레이아웃은 더욱 강력하고 재사용 가능합니다. 특정 데이터 소스에 붙여지지 않지만 그 프로토콜을 구현한 어떤 객체에 응답합니다. 

6-1 목록은 사용자화된 레이아웃의 header file에 대한 필요한 코드들을 보여줍니다. 이제, `MyCustomProtocol` **프로토콜**을 구현하는 모든 클레스는 사용자화된 레이아웃을 이용할수 있고 layout은 필요한 정보에 해당하는 클레스를 요청(query)할수 있습니다. 

<div id='section-id-42'/>

### Listing 6-1  Connecting to the custom protocol

```swift
class MyCustomLayout: UICollectionViewLayout {
    weak var customDataSource: MyCustomProtocol?
}
```

다음으로, collection view가 관리하는 아이템의 수가 상대적으로 적기 때문에 사용자화된 레이아웃은 레이아웃을 준비할때 생성되는 레이아웃 속성을 저장하기 위해 캐싱 시스템을 사용하고 collection view가 요구할 때마다 이러한 저장된 값을 되찾아 옵니다. 6-2 목록은 우리의 레이아웃의 3개의 개인적인 속성은 유지하는것이 필요하고 `init` 메소드를 보여줍니다. `layoutInformation` 사전은 우리의 collection view 내에 모든 뷰의 타입에 대한 모든 layout attributes를 보관하고 있고 `maxNumrows`속성은 tree의 가장 높은 열을 채우기 위해 필요한 행의 수를 추적합니다. `insets` 객체는 셀 사이의 간격을 제어하고 뷰와 콘텐츠 사이즈에 대한 프레임을 설정하는 곳에서 사용되어 집니다. 처음 두 속성에 대한 값은 레이아웃을 준비하는 동안 설정되지만 `insets`객체는 `init`메소드를 사용하여 설정되어야만 합니다. 이 경우 `INSET_TOP`, `INSET_LEFT`, `INSET_BOTTOM`, `INSET_RIGHT`는 각 매개변수에 대한 상수를 나타냅니다.

<div id='section-id-52'/>

### Listing 6-2  Initializing variables

```swift
class MyCustomLayout: UICollectionViewLayout {
    weak var customDataSource: MyCustomProtocol?
    var layoutInformation: NSDictionary = [:]
    var maxNumRows: Int = 0
    var insets: UIEdgeInsets = .zero

    override init() {
        super.init()
        insets = UIEdgeInsets(top: INSET_TOP, left: INSET_LEFT, bottom: INSET_BOTTOM, right: INSET_RIGHT)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
```

이 사용자 레이아웃에 대한 마지막 단계는 사용자화 레이아웃 attributes 를 생성하는 것입니다. 이 단계는 항상 필요한것은 아니지만, 이 경우에는 셀이 위치됨에 따라서 이 code는 현재 cell의 자식의 index Path에 접근하기 때문에 부모의 프레임과 일치 시키기위해 자식 cell의 프레임을 조정할수 있어야 합니다. 따라서 [UICollectionViewLayoutAttributes](https://developer.apple.com/documentation/uikit/uicollectionviewlayoutattributes)를 하위 클레싱하여 cell의 자식의 배열을 저장하면 그 정보가 제공됩니다. `UICollectionViewLAyoutAttributes`를 하위클레싱하고 header file에 다음과같이 추가합니다.

```swift
@property (nonatomic) NSArray *children;
```

UICollectionViewLAyoutAttributes class 참조에서 설명했던것처럼, layout attributes 하위클래싱 하는것은 iOS 7 이상에서 상속된 `isEqueal`: 메소드를 재정의 해야합니다. 이것에 대한 추가적인 이유는 [UICollectionViewLayoutAttributes Class Reference](https://developer.apple.com/documentation/uikit/uicollectionviewlayoutattributes)를 참조해주세요. 

이 경우 [isEqual](https://developer.apple.com/library/archive/documentation/LegacyTechnologies/WebObjects/WebObjects_3.5/Reference/Frameworks/ObjC/Foundation/Protocols/NSObject/Description.html#//apple_ref/occ/intfm/NSObject/isEqual:) 메소드에 대한 구현은 단순합니다. 왜냐하면 거기는 비교할 필드가(자식 배열의 콘텐츠) 하나뿐 이기때문입니다. 두개의 layout attributes object의 배열이 일치하는 경우 자식이 하나의 클레스에만 속할수 있으므로 객체가 무조건 동일 해야합니다. 그림 6-3은 `isEqual:` 메소드의 구현을 보여줍니다.

<div id='section-id-82'/>

#### Listing 6-3  Fulfilling requirements for subclassing layout attributes

```swift
-(BOOL)isEqual:(id)object {
    MyCustomAttributes *otherAttributes = (MyCustomAttributes *)object;
    if ([self.children isEqualToArray:otherAttributes.children]) {
        return [super isEqual:object];
    }
    return NO;
}
```

custom layout file에 custom layout attributes에 대한 header file을 추가하는것을 잊지 마세요.

이 단계에서 기초 설정과 함께 custom layout의 주요한 부분을 구현할 준비가 되었습니다.

---

<div id='section-id-100'/>

## Preparing the Layout

이제 필요한 모든 구성 요소가 초기화 되었으므로, 레이아웃을 준비할수 있습니다. collection view는 먼저 레이아웃 처리동안 prepareLayout를 먼저 호출 합니다. 이 예제에서 prepareLayout 메소드는 collection view에 있는 모든 뷰에 대한 layout attributes object를 인스턴스화하여 사용되고 그후 나중에 사용하기 위한 레이아웃 정보 사전에 이 attributes 들을 캐시 합니다. prepareLayout 메소드에 대한 더 자세한 정보를 [Preparing the Layout](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CreatingCustomLayouts/CreatingCustomLayouts.html#//apple_ref/doc/uid/TP40012334-CH5-SW19)를 참조하세요.

<div id='section-id-104'/>

### Creating the Layout Attributes

prepareLayout 메소드의 구현 예제는 두 부분으로 나뉘어 집니다. 6-2는 전반부의 목표를 보여줍니다. code는 모든 셀을 반복하고 셀이 자식이 있는 경우 이 자식들을 부모 셀로 연관 시킵니다. 그림에서 본것 처럼 모든 셀에 대한 처리가 완료되면 다른 부모셀의 자식 셀이 포함되어 처리 됩니다. 

<div id='section-id-108'/>

#### Figure 6-2  Connecting parent and child index paths

<center><img src="/assets/post_img/posts/CustomCollectionViewLayout-5.png" width="750"></center> <br>

6-4는 prepareLayout 메소드 구현의 전반부를 보여줍니다. 캐싱 메커니즘의 기초 형태로 시작하여 변경 가능한 두개의 사전이 초기화 되어 집니다. 먼저 `layoutInformation`은 local 과 동일 합니다. local 변경가능한 copy를 만들면서 인스턴스 변수가 변경할수 없기 때문에 custom layout의 구현에 적합합니다. 왜냐하면 layout attributes는 prepareLayout 메소드가 실행이 끝난 이후에 수정되면 안되기 때문입니다. code는 각 색션을 증가 순서로 반복하고 그후 모든 셀에 대한 attributes를 생성하기 위해 각 색션 이내의 각 아이템을 반복합니다. 사용자화된 메소드인 `attributesWithChildrenForIndexPath:`는 custom layout attributes의 인스턴스를 반환하고 현재 index path에 아이템을 위한 자식의 index path와 함께 자식 속성을 위치시킵니다. 그러므로 attributes 객체는 local cellInformation 사전에 key값으로 indexPath가 저장되어 집니다. 모든 아이템의 초기화를 피하는것은(This initial pass over all of the items) 아이템의 프레임 설정하기 전에 각 아이템에 대한 자식을 설정하기 위한 코드를 허용합니다.

<div id='section-id-115'/>

#### Listing 6-4  Creating layout attributes

```swift
override func prepare() {
        super.prepare()
        let layoutInformation = NSMutableDictionary()
        let cellInformation = NSMutableDictionary()
        let indexPath = NSIndexPath()
        let numSections = collectionView!.numberOfSections

        for section in 0..<numSections {
            let numItem = collectionView?.numberOfItems(inSection: section)
            for item in 0..<numItem {
                indexPath = NSIndexPath(item: item, section: section)
                MyCustomAttributes *attributes =
                    [self attributesWithChildrenAtIndexPath:indexPath]; // objective-c code
                [cellInformation setObject:attributes forKey:indexPath]; // objective-c code
            }
        }
    }
```

<div id='section-id-137'/>

### Storing the Layout Attributes

그림 6-3은 트리 계층 구조에서 마지막의 첫번째 행에서 만들어진 preparLayout의 후반에 발생하는 처리를 묘사합니다. 이 접근법은 특이하게 보일수 있지만, 자식 셀의 frame을 조정하는 것과 관련된 복잡성을 제거하는 영리한 방법입니다. 왜냐하면 자식셀의 frame은 그 부모의 frame과 일치되는것이 필요하고 열과 열기반의 셀간의 공간은 얼마나 많은 자식 셀을 가졌느냐에 의존합니다(각 Cell이 얼마나 많은 자신의 자식 Cell을 가지고 있는지). 부모의 프레임을 설정하기 전에 자식의 프레임을 설정하기를 원합니다. 이 방법에서 자식 셀과 그 자식의 cell의 모든 셀은 부모 셀의 전체에 매칭되기 위해 조정 될수 있습니다.

step 1 에서, 마지막열의 셀은 순차적으로 위치되어 집니다. step 2에서 layout은 두번째 열에 대한 프레임을 결정합니다. 이 열에서 cell은 하나 이상의 자식을 가지지 않기 때문에 순차적으로 배치될수 있습니다. 하지만 녹색 셀의 프레임은 부모의 셀과 일치 시키기 위해 조정될수 있기 때문에 조정된 공간으로 이동됩니다. 마지막 단계에서 첫번째 열에 대한 셀이 위치됩니다. 두번째 열의 처음 3개의 셀은 첫번째 열에  있는 첫번째 셀의 자식 이기 때문에 첫번째 열의 첫번째 셀을 따르는 셀이 이동합니다. 이 경우에 첫번째 셀을 따르는 두개의 셀의 자식들이 없기 때문에 실제로 그렇게할 필요는 없지만 레이아웃 객체는 이를 알만큼 똑똑하지 않습니다. 오히려 자식을 가지는 Cell의 경우를 대비하여 항상 공간을 조정합니다. 또한 녹색셀은 이제셀과 일치하도록 이동했습니다.

<center><img src="/assets/post_img/posts/CustomCollectionViewLayout-6.png" width="350"></center> <br>

6-5목록은 `prepareLayout` method의 후반부를 보여주고, 각 아이템에 대한 프레임을 설정합니다. 코드에 숫자가 적인 설명을 아래에서 설명합니다.

<div id='section-id-147'/>

#### Listing 6-5  Storing layout attributes

```objective-c
    //continuation of prepareLayout implementation 

    for(NSInteger section = numSections - 1; section >= 0; section—-) {
        NSInteger numItems = [self.collectionView numberOfItemsInSection:section];
        NSInteger totalHeight = 0;
        for(NSInteger item = 0; item < numItems; item++){
            indexPath = [NSIndexPath indexPathForItem:item inSection:section];
            MyCustomAttributes *attributes = [cellInfo objectForKey:indexPath]; // 1
            attributes.frame = [self frameForCellAtIndexPath:indexPath
                                withHeight:totalHeight];
            [self adjustFramesOfChildrenAndConnectorsForClassAtIndexPath:indexPath]; // 2
            cellInfo[indexPath] = attributes;
            totalHeight += [self.customDataSource
                            numRowsForClassAndChildrenAtIndexPath:indexPath]; // 3
        }
        if(section == 0){
            self.maxNumRows = totalHeight; // 4
        }
    }
    [layoutInformation setObject:cellInformation forKey:@"MyCellKind"]; // 5
    self.layoutInformation = layoutInformation
}
```

6-5 목록에서 코드는 내림 차순으로 순회하고 뒤에서 앞으로 트리를 생성합니다. `totalHeight` 변수는 현재 필요한 아이템의 수가 몇개 인지 추적합니다. 이 구현은 두 셀의 자식이 절대 겹치지 않도록 셀 아래에 빈 공간을 남겨두고 간격을 영리하게 추적하지 않고 totalHeight 변수가 이 작업을 완수하도록 도움을 줍니다. 코드는 다음과 같은 순서로 이를 수행합니다.

1. 첫번째로 제외시킨 데이터에서 생성된 layout attributes 는 cell의 frame이 생성되기 전에 local 사전에서 되찾아 옵니다. 
2. 사용자화 된 `adjustFramesOfChildrenAndConnectorsForClassAtIndexPath:` 메소드는 재귀적으로 셀의 자식과 조부모의 모든 프레임을 조정하고 셀의 프레임을 일치시킵니다. 
3. 조정된 속성을 사전에 다시 놓은후, `totalHeight` 변수는 다음 아이템의 프레임이 필요한 위치를 반영하도록 조정됩니다. 이곳이 사용자 정의한 프로토콜을 사용하면 이점이 있는 장소입니다.  프로토콜을 구현하는 모든 객체는 `numRowsForClassAndChildrenAtIndexPath` 메소드를 구현 해야 합니다. 얼마나 많은 자식 수를 위치시키기 위해 각 클레스가 위치하는 행을 반환합니다.
4. `maxNumRows` 속성은(콘텐츠 사이즈를 설정하기 위해 나중에 필요됨)색션 0의 총 높이를 설정합니다. 가장 높은 열은 항상 색션이 0 이고, 트리에서 모든 자식에 대해서 높이가 조정 됩니다 왜냐하면 이 구현은 똑똑한 공간 조정을 포함하지 않기 때문입니다.
5. 이 메소드는 키로 유니크한 스트링 식별자와 함께 local `layoutinformation` 으로 모든 cell attributes와 함께 사전을 추가하는것으로 마무리됩니다.

마지막 단계에서 사전을 추가하는데 사용되는 문자열 식별자는 사용자화된 레이아웃의 나머지 부분에서 셀에 대한 올바른 attributes를 검색하는데 사용됩니다. 이 예제에서 supplementary view가 사용될때 더 중요하게 다가옵니다.

---

<div id='section-id-185'/>

## Providing the Content Size

모든 layout attributes 객체가 초기화 되고 캐쉬되어 졌을때, code는 `layoutAttributesForElementsInRect:` 메소드에서 요청된 모든 layout information을 제공할 완전한 준비가 됩니다. 이 메소드는 레이아웃 처리의 두번째 단계이고 prepareLayout 메소드와 달리 `필수적`입니다. 이 메소드는 제공된 사각형내의 포함된 모든 뷰들에 대한 layout attributes object의 예상된 배열과 직사각형을 제공합니다. 어떤 경우에 collection view는 수천개의 아이템을 가져 제공된 직사각형에 포함된 요소에 대해서만 layout attributes 객체를 초기화하기 위해 계속 기다릴수 있지만 이 메소드는 캐싱에 의존합니다. `layoutAttributesForElementsInRect:`메소드는 단순하게 attributes를 반복저장하고 반환된 단일 호출자 배열에게 이들을 모아서 반환합니다.

6-7 목록은 `layoutAttributesForElementsInRect:` 메소드의 구현을 보여줍니다. 이 코드는 메인 `_layoutInformation` 사전내에 있는 지정된 뷰 타입에 대한 layout attributes 객체를 포함한 모든 하위 사전을 순회합니다. 주어진 사각형 내에 포함된 하위 사전 내에 attributes가 순회되었다면, 이들은 사각형 내의 모든 attributes를 배열로 저장하기 위해 추가되어 확인된후 반환됩니다.

<div id='section-id-191'/>

#### Listing 6-7  Collecting and processing stored attributes

```objective-c
- (NSArray*)layoutAttributesForElementsInRect:(CGRect)rect {
    NSMutableArray *myAttributes [NSMutableArray arrayWithCapacity:self.layoutInformation.count];
    for(NSString *key in self.layoutInformation){
        NSDictionary *attributesDict = [self.layoutInformation objectForKey:key];
        for(NSIndexPath *key in attributesDict){
            UICollectionViewLayoutAttributes *attributes =
            [attributesDict objectForKey:key];
            if(CGRectIntersectsRect(rect, attributes.frame)){
                [attributes addObject:attributes];
            }
        }
    }
    return myAttributes;
}
```

> Note: `layoutAttributesForElementsInRect:`에 대한 구현은 주어진 attributes에 대해서 뷰가 보여지는지 여부를 참조하지 않습니다. 이 메소드에서 제공된 사각형은 반드시 화면에 보이는 직사각형이 될 필요는 없고 구현이 무엇이든 반환하는 속성이 화면에 보이는 뷰에 대한것이라고 가정 하면 안됩니다. `layoutAttributesForElementsInRect:` 메소드에 대한 더 자세한 논의는 [<U>Providing Layout Attributes for Items in a Given Rectangle.</U>](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CreatingCustomLayouts/CreatingCustomLayouts.html#//apple_ref/doc/uid/TP40012334-CH5-SW6)를 참조해주세요

---

<div id='section-id-214'/>

## Providing Individual Attributes When Requested

[Providing Layout Attributes On Demand](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CreatingCustomLayouts/CreatingCustomLayouts.html#//apple_ref/doc/uid/TP40012334-CH5-SW2)에서 논의 한것처럼 layout 객체는 layout 처리가 완료되면 collection view 내의 어떤 단일 종류의 뷰에 대한 layout attribuets를 반환하기 위해 항상 준비 되어있어야 합니다. 이 메소드들은 views-cells, supplementary views, decoration view의 세가지 유형에 대한 메소드가 있지만 앱은 현제 셀을 독점적으로 사용하기 때문에 이때 잠시동안 요구되는 메소드는 `layoutAttributesForItemAtIndexPath:` 입니다.

목록 6-8은 이 메소드에 대한 구현을 보여줍니다. 셀에 대한 저장된 사전을 이용하고 하위 사전 내에서, key로서 지정된 indexPath와 함께 저장된 atrributes 객체를 반환합니다.

<center><img src="/assets/post_img/posts/CustomCollectionViewLayout-7.png" width="650"></center> <br>

---

<div id='section-id-224'/>

## Incorporating Supplementary Views

현재 상태에서 앱은 계층적의미로 모든 셀을 알맞게 표시 하지만 부모가 이들의 자식을 연결하는 구분이 없기 때문에 위의 클레스 다이어 그램은 이해하기 어렵습니다. class cell을 이들의 자식으로 연결하는 선을 그리기 위해, 이 앱은 supplementary 뷰로서 layout을 통합할수 있는 사용자화된 뷰에 의존합니다. 이것에 대한 자세한 정보를 [Elevating Content Through Supplementary Views](https://developer.apple.com/library/archive/documentation/WindowsViews/Conceptual/CollectionViewPGforIOS/CreatingCustomLayouts/CreatingCustomLayouts.html#//apple_ref/doc/uid/TP40012334-CH5-SW22)를 참조해주세요.

목록 6-9는 supplementary view를 포함하기 위해 prepareLayout의 구현으로 통합하는 코드를 보여줍니다. cell과 supplementary에 대한 attributes 객체 생성의 사소한 차이점은 supplementary에 대한 메소드는 attributes 객체가 어떤 종류의 supplementary view인지 나타내는 문자열 식별자가 필요한것 입니다(footer, header). 사용자화된 레이아웃은 다양한 supplementary view를 가질수 있지만 각 레이아웃은 오직 하나의 셀 타입만 가질수 있기 때문입니다.

<div id='section-id-230'/>

#### Listing 6-9  Creating attributes objects for supplementary views

```objective-c
// create another dictionary to specifically house the attributes for the supplementary view
NSMutableDictionary *supplementaryInfo = [NSMutableDictionary dictionary];
…
// within the initial pass over the data, create a set of attributes for the supplementary views as well
UICollectionViewLayoutAttributes *supplementaryAttributes = [UICollectionViewLayoutAttributes layoutAttributesForSupplementaryViewOfKind:@"ConnectionViewKind" withIndexPath:indexPath];
[supplementaryInfo setObject: supplementaryAttributes forKey:indexPath];
…
// in the second pass over the data, set the frame for the supplementary views just as you did for the cells
UICollectionViewLayoutAttributes *supplementaryAttributes = [supplementaryInfo objectForKey:indexPath];
supplementaryAttributes.frame = [self frameForSupplementaryViewOfKind:@"ConnectionViewKind" AtIndexPath:indexPath];
[supplementaryInfo setObject:supplementaryAttributes ForKey:indexPath];
...
// before setting the instance version of _layoutInformation, insert the local supplementaryInfo dictionary into the local layoutInformation dictionary
[layoutInformation setObject:supplementaryInfo forKey:@"ConnectionViewKind"];
```

supplementary view에 대한 코드는 cell에 대한 것과 비슷하기 때문에 이 코드를 `prepareLayout` 메소드로 병합하는것은 간단합니다. 이 코드는 *ConnectionViewKind* supplmentary view에 대한 명시적인 다른 사전을 사용하여 셀에서 하는것과 같은 캐싱 메커니즘을 사용합니다. 한가지 이상의 supplementary view를 추가할 경우 이 kind of view 에 대한 다른 사전을 생성해야 할것이고 이 kind of view에 대한 코드를 작성하여 추가 해야 할것입니다. 하지만 이 경우에 layout은 하나의 supplementary view의 종류만 요구합니다. cell layout attirbutes를 초기화하는 코드에서, 이 구현은 어떤 종류의 kind of view에 기반하여 supplementary view의 프레임을 결정하기 위해 사용자화된 `frameForSupplementaryViewOfKind:AtIndexPath:` 메소드를 사용합니다. 사용자화된 `adjustFramesOfChildrenAndConnectorsForClassAtIndexPath:`는 클레스 계층 레이아웃으로 관계된 모든 supplementary view조정을 통합하기 위해 `prepareLayout`의 구현을 통합해야 하는것을 기억 해야합니다.

예제 코드의 경우 `layoutAttributesForElementsInRect:` 구현에서 수정할 필요가 없습니다. 왜냐하면 `main dictionary`에 저장된 모든 attributes를 반복하도록 설계되었기 때문입니다. supplementary view attributes가 `main dictionary`로 추가되는한 `layoutAttributesForElementsInRect:`에 제공된 구현은 예상대로 동작합니다.

마지막으로 모든 셀에 대한 경우와 마찬가지로, collection view는 매번 지정한 뷰에 대한 supplementary view attributes를 요청할것입니다.  따라서 `layoutAttributesForSupplementaryElementOfKind:atIndexPath:` 메소드의 구현이 필요합니다. 

6-10 목록은 이 메소드에 대한 구현을 보여주고, 이 메소드는 `layoutAttributesForItemAtIndexPath:`와 거의 비슷합니다. 예외 적으로 제공된 `kind` string을 사용하면 하드 코딩된 view의 타입을 사용하는것 대신 사용자화된 레이아웃에서 다양한 supplementary view를 사용할수 있습니다. 

<div id='section-id-257'/>

#### Listing 6-10  Providing supplementary view attributes on demand

```objective-c
- (UICollectionViewLayoutAttributes *) layoutAttributesForSupplementaryViewOfKind:(NSString *)kind atIndexPath:(NSIndexPath *)indexPath {
    return self.layoutInfo[kind][indexPath];
}
```

---

<div id='section-id-267'/>

## Recap

supplementary view들을 포함하면, 클레스 계층 다이어그램을 적절하게 재현할수 있는 레이아웃 객체를 가지게 됩니다. 마지막 구현에서 공간을 절약하기 위해 사용화된 레이아웃에 약간 조정하여 통합할수 있습니다. 이 예제에는 사용자화된 collection view 레이아웃이 실제 어떻게 동작하는지 탐구합니다. collection view는 훨씬 견고해서 여기에서 볼수 있는 것보다 훨씬 많은 기능을 제공합니다.
