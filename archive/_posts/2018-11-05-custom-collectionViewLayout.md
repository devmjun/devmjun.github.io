---
layout:     post
title:      "Swift. UICollectionView Layout with Parallax"
subtitle:   "Custom UICollectionViewLayout Tutorial With Parallax"
date:       2018-11-4 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
---

[Custom UICollectionViewLayout Tutorial With Parallax](https://www.raywenderlich.com/527-custom-uicollectionviewlayout-tutorial-with-parallax)의 일부분을 의역 했습니다. 

## Custom UICollectionViewLayout Tutorial With Parallax

`Note`: 이 튜토리얼은 Xcode 9.0, Swift4를 사용합니다. 

UICollectionView는 iOS 6에서 소개 되었고 iOS10에서 새로운 기능으로 개선되었습니다. `UICollectionView`는 iOS application에서 data collection을 제출하여 애니메이션과 사용자화 하기 위한 `first-class choice`(이걸 뭐라고 해야하나..) 입니다.

`UICollectionView`와 관련된 주요한 본질(entity)는 `UICollectionViewLayoud` 입니다. `UIcollectionViewLayout` 객체는 cell, supplementary views, decoration views와 같은 collection view의 모든 요소들의 속성(attributes)들을 정의하는 동안 대표합니다.

`UIKit`은 `UICollectionViewFlowLayout`이라고 불리는 `UICollectionViewLayout`의 기본 구현을 제공합니다. 이 클레스는 어떤 사용자화된 요소들으ㅏ `grid layout`을 설정할수 있게 해줍니다.

`UICollectionViewLayout`튜토리얼은 `UICollectionVIewLayout`을 어떻게 하위 클레싱 하고 사용자화 하는지에 대해서 가르쳐 줄것입니다. 또한 사용자화된 supplementary views, stretchy, sticky, parallax 효과를 collectionView에 어떻게 추가하는지 보여줄것입니다.

> Note: 이 `UICollectionViewLayout` 튜토리얼은 Swift 4.0의 중간정도 실력의 지식과 `UICollectionView`의 상급 지식을 요구하고 affine transforms 와 UICollectionViewLayout에서 어떻게 core layout process가 동작하는지 명확한 이해를 요구합니다. 

위의 토픽이 친숙하지 않다면 [여기](https://developer.apple.com/documentation/uikit/uicollectionviewlayout)를 참조할수 있습니다.

https://koenig-media.raywenderlich.com/uploads/2017/06/basic-annoyed-1-1.png

또한 다음의 좋은 튜토리얼들을 확인할수도 있습니다.

- [<U> UICollectionView Tutorial: Getting Started</U>](https://www.raywenderlich.com/9334-uicollectionview-tutorial-getting-started)
- [<U>UICollectionView Tutorial: Reusable Views, Selection and Reordering </U>](https://www.raywenderlich.com/9477-uicollectionview-tutorial-reusable-views-selection-and-reordering)
- [<U> UICollectionView Custom Layout Tutorial: Pinterest </U>](https://www.raywenderlich.com/392-uicollectionview-custom-layout-tutorial-pinterest)
- [<U>Video Tutorial: Collection Views Part 0: Introduction </U>](https://www.raywenderlich.com/2021-video-tutorial-collection-views-part-0-introduction)

`UICollectionViewLayout`튜토리얼의 마지막에 도달하면 다음과같은 `UIcollectionView`를 구현할수 있습니다.

collectionviewlayout-parallax-0.gif


