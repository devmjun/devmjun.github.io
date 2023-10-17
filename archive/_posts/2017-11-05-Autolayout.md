---
layout:     post
title:      "Swift. AutoLayout 사용하기 "
subtitle:   "AutoLayout 으로 기본적인 IOS UI를 다각도로 구성하고 분석해보자! "
date:       2017-11-05 22:21:00
author:     "MinJun"
comments: true
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/cornflowers-5352633.jpg
thumbnail-img: /assets/post_img/background/cornflowers-5352633.jpg
share-img: /assets/post_img/background/cornflowers-5352633.jpg
---

## Table of contents 

  - [<U>Constraints</U>](#section-id-15)
      - [<U>- Constraints <br></U>](#section-id-17)
      - [<U>- align(정렬) <br></U>](#section-id-21)
  - [<U>Constraints</U>](#section-id-32)
    - [<U>update Frame  <br></U>](#section-id-38)
    - [<U>Reset to Seggest Constraints <br></U>](#section-id-42)
    - [<U>update constraints <br></U>](#section-id-46)
  - [<U>Constraints</U>](#section-id-52)
    - [<U>Label <br></U>](#section-id-54)
  - [<U>Constraints Multiplier</U>](#section-id-64)
    - [<U>Align</U>](#section-id-76)
  - [<U>Constraints Multiplier</U>](#section-id-84)
  - [<U>Hugging-Priority</U>](#section-id-97)
    - [<U>Content Hugging Priority</U>](#section-id-99)
    - [<U>Content Compression resistance Priority</U>](#section-id-111)
  - [<U>Image resolution</U>](#section-id-121)
  - [<U>Button Content Insets & align</U>](#section-id-128)
  - [<U>Rotate</U>](#section-id-138)
  - [<U>ScrollView AutoLayout 적용</U>](#section-id-157)
  - [<U>margin</U>](#section-id-171)
  - [<U>Reference</U>](#section-id-179)

---

<div id='section-id-15'/>

## Constraints

<div id='section-id-17'/>

#### - Constraints <br>

객체에 제약조건을 주어서 `device` 의 크기가 변화해도 선언한 제약조건을 값 또는 비율에 따라서 layout이 동적으로 적용되게 만들어줍니다.

<div id='section-id-21'/>

#### - align(정렬) <br> 

(Interface Build 에서)정렬은 단일 객체가 선택 되면, X,Y 의 Center 값만 설정 할수 있고, 여러개의 객체를 선택 하면 둘간의 관계에 따라서 정렬을 선택 해줄수 있습니다.
기본적으로 아이폰의 device 에서 왼쪽에서 오른쪽으로 갈수록 x의 값이 커지게 되고, y값은 위에서 아래로 갈수록 값이 커지게 됩니다.

```swift
item1.atrribute = 비율 * item2.atrribute + 간격 
```

---

<div id='section-id-32'/>

## Constraints 

| update Frame | Reset to Seggest Constraints & Update Constraints Constants |
| :---: | :---: |
| ![screen](/assets/post_img/posts/constraints.jpg) | ![screen](/assets/post_img/posts/constraints-1.jpg) |

<div id='section-id-38'/>

### update Frame  <br>

오토 레이아웃을 설정하고 마우스로 크기나 위치를 변경하거나 또는 어떤 값을 주었을때 변경된 값으로 에러 메세지가 나올때가 있는데 그 상태에서 `update Frame` 을 하게 되면, 변하기 이전의 frame 상태로 돌아갑니다. 단축키는 `option + command + =`

<div id='section-id-42'/>

### Reset to Seggest Constraints <br>

system 에서 문제를 현재의 뷰에 맞지않는 오토레이아웃을 해결할수있는 제약조건을 제안해줍니다.

<div id='section-id-46'/>

### update constraints <br>

AutoLayout을 적용 시키고 마우스로 크기나 위치를 변경하거나 어떤 값을 주고난 이후에 `update Constraints`를 실행 하면 현재 변환된값을 적용합니다.

--- 

<div id='section-id-52'/>

## Constraints

<div id='section-id-54'/>

### Label <br>

레이블은 기본크기가 텍스트에 따라서 고유한 사이즈를 갖습니다. 텍스트 사이즈에 따라서 Label의 오토레이아웃을 지정할수 있습니다. <br>


> Tip: 옵션키를 누르고 오브젝트를 누르면 오브젝트에 적용 되어 있는 Constraints 값을 볼수 있습니다.


---

<div id='section-id-64'/>

## Constraints Multiplier

| * | Red to grayView | Red to blue |
| :---: | :---: | :---: |
| ![screen](/assets/post_img/posts/constraints-2.jpg) | ![screen](/assets/post_img/posts/constraints-3.jpg) | ![screen](/assets/post_img/posts/constraints-4.jpg) |

RedView를 기준으로 grayView에 1:2 비율이 적용되고, BlueView에 1:3 비율이 적용되었습니다. 따라서 RedView는 상대적으로 grayView는 redView의 2배 width를 가지게 되고 BlueView는 redView의 3배의 width를 가지게 됩니다.

```swift
item1.atrribute = 비율 * item2.atrribute + 간격 
```

<div id='section-id-76'/>

### Align

<center><img src="/assets/post_img/posts/constraints-5.jpg" width="450"></center> <br> 

- 가로, 세로 정렬을 설정할수 있습니다. 

---

<div id='section-id-84'/>

## Constraints Multiplier


| * | 구름 View의 Constraints |
| :---: | :---: |
| ![screen](/assets/post_img/posts/constraints-6.jpg) | ![screen](/assets/post_img/posts/constraints-7.jpg) |

위와 같이 View의 상단에 반쯤 걸쳐 있는 View를 만들수 있는 상황이 있을수 있습니다. 이렇게 표현하기 위한 방법은 여러가지가 있습니다. 구름 이미지가 GrayView의 자식 View로 들어가서 `AutoLayout` 을 적용해주어서 표현해줄수 있지만 이런 경우는 좋은 경우가 아닙니다. 

그 이유는 부모뷰의 범위를 넘어가게 되면 일단 버튼일 경우 인터렉션이 적용되지 않고  `Clip to bounds`를 부모뷰에서 설정하게 되면 부모뷰의 경계를 벗어난 영역이 잘리게 됩니다. 동등한 계층 구조에서 align을 사용해서 정렬합니다.

---

<div id='section-id-97'/>

## Hugging-Priority

<div id='section-id-99'/>

### Content Hugging Priority

`Priority`는 두개의 객체에서 설정한 Priority가 있는 어떠한 값을 우선적으로 적용시킬수있는 순위를 결정하는 값 입니다. 

|  |  |  |
| :---: | :---: | :---: |
| ![screen](/assets/post_img/posts/constraints-8.jpg) | ![screen](/assets/post_img/posts/constraints-9.jpg) | ![screen](/assets/post_img/posts/constraints-10.jpg) |

왼쪽의 Label의 `Horizontal`의 `Content Hugging Priority` 값 부분이 더 큰쪽 입니다. Label의 사이즈가 변할때 왼쪽에 있는 Label이 오른쪽 레이블 보다 높은 우선 순위로 자신의 사이즈를 가지게 됩니다. 

> 조금 의역하여서 컨텐츠를 끌어 안는(hug)다고 생각 하고 적용 했습니다.

<div id='section-id-111'/>

### Content Compression resistance Priority

`Content Hugging Priority` 의 반대되는 개념입니다.

예를들어 두 객체의 넓이 제약 조건이 충돌했을때 Conten Compression resistance값이 높은쪽이 자신의 고유 넓이를 빼앗기지 않고(?) 지킬수 있습니다

> 두개의 객체 중 찌그러져야하는 상황에서 자신의 찌그러짐(?)을 보존한다고 생각 하고 적용했습니다

---

<div id='section-id-121'/>

## Image resolution

Image는 자신의 사이즈를 가지고 있습니다. ImageView에 imageView를 추가하고, 본래 이미지의 raw Size 로 돌려리면 `Command + =` 키룰 눌러 적용할수 있습니다.
이미지의 @2x, @3x 가 없으면, 이미지의 원래 픽셀 사이즈로 보여지게 됩니다, @2x 는 기본 아이폰 시리즈에서 사용 되는 사이즈이고, @3x는 아이폰+ 사이즈에서 사용이 되는 이미지입니다. 

---

<div id='section-id-128'/>

## Button Content Insets & align  

| * | Size inspector | atrribute inspector |
| :--: | :---: | :--: |
| ![screen](/assets/post_img/posts/constraints-11.jpg) | ![screen](/assets/post_img/posts/constraints-12.jpg) | ![screen](/assets/post_img/posts/constraints-13.jpg) |

버튼의 타이틀에 정렬을 주어야 하는경우 image를 버튼왼쪽 또는 오른쪽에 놓고 title의 인셋을 조정할수 있습니다. `Size inspector` 부분에서 button의 `inset` 설정할수 있습니다. 

---

<div id='section-id-138'/>

## Rotate

| Portrait | LandScape |
| :--: | :---: |
| ![screen](/assets/post_img/posts/constraints-14.jpg) | ![screen](/assets/post_img/posts/constraints-15.jpg) |

| Vary for Traits | 
| :--: | 
| ![screen](/assets/post_img/posts/constraints-16.jpg) | 
| ![screen](/assets/post_img/posts/constraints-17.jpg) |

화면의 상태(Portrait, LandScape(가로모드))에 따라서 적용되는 AutoLayout을 설정할수 있습니다.

1. `Vary for Traits`을 누릅니다. `height`, `Witdh` 에 따라서 적용되는 모드를 찾습니다. 
2. `height` 를 선택하면 LandScape 에 적용되는 모델들을 확인할수 있습니다.
3. 변경될 AutoLayout 을 지정합니다. Constratins 값들을 변경한 후 `Done Varying` 을 누르면 해당 모델에 LandScape 모드 혹은 Portrait 모드에서 AutoLayout이 적용 되는것을 확인할수 있습니다. 

---

<div id='section-id-157'/>

## ScrollView AutoLayout 적용 

ScrollView의 AutoLayout을 적용하는 경우는, ContentsView의 크기를 내부의 Contents의 개수, 혹은 크기에 따라서 유동적으로 적용하고 싶을때 사용할수 있습니다.

Storyboard로 ScrollView를 정의하는 경우에 ScrollView에 하위뷰로 View를 추가하면, ContentsView로 사용할수 있습니다. 

| ScrollView | Constraints | bottom Constraints |
| :--: | :---: | :--: |
| ![screen](/assets/post_img/posts/constraints-18.jpg) | ![screen](/assets/post_img/posts/constraints-19.jpg) | ![screen](/assets/post_img/posts/constraints-20.jpg) |

스크롤뷰를 정의하고 하위뷰로 TextFiled를 추가 하고 ContentsView의 bottom 제약조건의 Priority 값을 700 으로 낮추어 설정합니다. 이렇게 하면 ContentsView의 bottom이 내부 Contents의 사이즈에 따라서 유동적으로 변하게 됩니다.

---

<div id='section-id-171'/>

## margin

마진은 8씩 적용됩니다.

![screen](/assets/post_img/posts/constraints-21.jpg)

---

<div id='section-id-179'/>

## Reference 

[iOS AutoLayout 강의](https://www.inflearn.com/course/AutoLayout-ui_ios/)




