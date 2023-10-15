---
layout:     post
title:      "iOS 휴먼 인터페이스 가이드라인 요약 (8)"
subtitle:   "Action Sheets, Activity Views, Alerts, Collections, Image Views, Map, Pages, Popovers, Scroll Views, Split Views, Tables, Text Views, Web Views"
date:       2018-02-11 21:00:00
author:     "MinJun"
header-img: "img/tags/HIG-bg.jpg"
comments: true
tags: [HIG]
categories: archive
permalink: /archive/:title
---

개인적인 공부의 목적으로 작성 되었습니다. 오역이나 잘못된 부분이 있을수 있으니, 댓글 남겨 주시면 감사하겠습니다!

---

# Views

- Action Sheets
- Activity Views
- Alerts
- Collections
- Image Views
- Maps
- Pages
- Popovers
- Scroll Views
- Split Views
- Tables
- Text Views
- Web Views

---

## Action Sheets 

액션 시트는 컨트롤이나 작업에 대한 응답으로 나타나는 특정 스타일의 경고이며 현재 컨텍스트와 관련된 두 가지 이상의 선택 사항 집합을 제공합니다. 액션 시트를 사용하여 잠재적인, 부주의한 작업을 수행하기 전에 사람들이 작업을 시작하거나 확인을 요청하십시오. 현재 화면에서는 액션 시트가 화면 하단에서 위로 슬라이드됩니다. 큰 화면에서는 한 번에 액션 시트가 팝업으로 표시됩니다.

<center><img src="/img/posts/ActionSheet.png" width="382" height="700"></center> <br> 

#### - 선명도가 추가되면 취소 버튼을 제공하십시오

취소 버튼은 사용자가 작업을 포기할 때 자신감을 심어줍니다. 취소 버튼은 `항상 화면 하단의 작업 시트`에 포함되어야합니다.

#### - 부주의한 선택을 눈에 띄게하십시오

부주의 하거나 위험한 행동을 수행하는 버튼에는 적색을 사용하고, 액션 시트의 맨 위에 이 버튼을 표시하십시오.

#### - 작업 시트에서 스크롤을 사용하지 마십시오

작업 시트에 옵션이 너무 많으면 모든 선택 사항을 보려면 스크롤해야합니다. 스크롤링에는 선택을하는 데 추가 시간이 필요하며 부주의로 버튼을 두드리지 않고 수행하기가 어렵습니다.

개발자 지침의 경우, 참조 [UIAlertControllerStyleActionSheet](https://developer.apple.com/documentation/uikit/uialertcontrollerstyle/uialertcontrollerstyleactionsheet) 의 상수 [UIAlertController](https://developer.apple.com/documentation/uikit/uialertcontroller)을.

---

## Activity Views

활동은 복사, 즐겨 찾기 또는 찾기와 같은 작업으로 현재 상황에서 유용합니다. 일단 시작되면 활동은 즉시 작업을 수행하거나 진행하기 전에 더 많은 정보를 요구할 수 있습니다. 활동은 장치 및 방향에 따라 시트 또는 팝업으로 나타나는 활동뷰로 관리됩니다. 사용자가 앱에서 수행 할 수 있는 맞춤 서비스 또는 작업에 대한 액세스 권한을 부여하기 위해 활동을 사용합니다.

<center><img src="/img/posts/activity_views.png" width="382" height="700"></center> <br> 

이 시스템은 인쇄, 메시지 및 AirPlay를 포함하여 여러 가지 기본 제공 활동을 제공합니다. 이러한 테스크는 활동보기에서 항상 맨 처음에 나타나며 다시 정렬 할 수 없습니다. 이러한 기본 제공 작업을 수행하는 사용자 지정 활동을 만들 필요가 없습니다. 활동보기는 다른 앱의 공유 및 작업 확장을 표시합니다. [공유 및 작업을](https://developer.apple.com/ios/human-interface-guidelines/extensions/sharing-and-actions) 참조하십시오.

#### - 사용자 정의 액티비티를 나타내는 간단한 템플릿 이미지를 디자인하십시오

템플릿 이미지는 마스크를 사용하여 아이콘을 만듭니다. 적절한 투명도와 안티앨리어싱을 사용하여 흑백을 사용하고 그림자를 포함하지 마십시오. 템플릿 이미지는 약 70x70 픽셀 크기의 중앙에 위치해야합니다.

#### - 작업을 간결하게 설명하는 활동 제목 작성

제목은 활동보기의 아이콘 아래에 나타납니다. 짧은 제목이 가장 좋습니다. 제목이 너무 길면 iOS는 먼저 텍스트를 축소 한 다음 제목이 너무 긴 경우 텍스트를 자릅니다. 일반적으로 제목에 회사 또는 제품 이름을 포함하지 마십시오.

#### - 활동이 현재 상황에 적합한 지 확인하십시오

시스템 제공 태스크는 활동에서 재정렬 될 수 없지만 앱에 적용 할 수 없는 경우 제외 될 수 있습니다. 예를 들어 사람들이 이미지를 인쇄하지 못하도록 인쇄 활동을 제외 할 수 있습니다. 주어진 시간에 표시 할 사용자 정의 작업을 식별 할 수도 있습니다.

#### - 활동 단추를 사용하여 활동보기를 표시하십시오

사람들은 Action 버튼을 누를 때 시스템 제공 활동에 액세스하는 데 익숙합니다. 똑같은 일을하는 다른 방법을 제공함으로써 혼란을 피하십시오.

<center><img src="/img/posts/activity_views-1.png" width="500"></center> <br> 

개발자 지침은 [UIActivityViewContoller](https://developer.apple.com/documentation/uikit/uiactivityviewcontroller) 및 [UIActivity](https://developer.apple.com/documentation/uikit/uiactivity)를 참조하십시오.

---

## Alerts 

알림은 앱 또는 기기의 상태와 관련된 중요한 정보를 전달하며 종종 피드백을 요청합니다. 경고는 제목, 선택적 메시지, 하나 이상의 단추 및 입력을 수집하기위한 선택적 텍스트 필드로 구성됩니다. 이러한 구성 가능한 요소 외에도 경고의 시각적 모양은 정적이며 사용자 정의 할 수 없습니다.

<center><img src="/img/posts/Alert.png" width="382" height="700"></center> <br> 

#### - 경고를 최소화하십시오

알리미는 사용자 환경을 방해하며 구매 및 불안한 행동(예 : 삭제)을 확인하거나 문제를 사람들에게 알리는 것과 같은 중요한 상황에서만 사용해야합니다. 빈번하지 않은 경고는 사람들이 진지하게 받아들이도록 도와줍니다. 각 경고가 중요한 정보와 유용한 선택을 제공하는지 확인하십시오.

#### - 두 방향(가로, 세로) 에서 경고 모양을 테스트하십시오

가로 모드와 세로 모드에서는 경고가 다르게 나타날 수 있습니다. 스크롤없이 모든 방향에서 잘 읽도록 경고 텍스트를 최적화하십시오.

개발자 가이드는 [UIAlertController](https://developer.apple.com/documentation/uikit/uialertcontroller)를 참조하십시오.

### 경고 제목 및 메시지

#### - 짧고 기술적인 다중 단어 경고 제목을 작성하십시오

사람들이 화면에서 읽어야 할 텍스트가 적을수록 좋을 것입니다. 여분의 텍스트를 메시지로 추가하는 것을 피하는 제목을 만들어보십시오. 한 단어로 된 제목이 유용한 정보를 제공하는 경우는 드물기 때문에 질문하거나 짧은 문장을 사용하는 것이 좋습니다. 가능한 한, 제목을 한 줄로 유지하십시오. 완전한 문장에는 문장 스타일의 대문자와 적절한 구두법을 사용하십시오. 문장 단편에 마침표를 사용하지 마십시오.

#### - 메시지를 제공해야하는 경우 짧고 완전한 문장을 작성하십시오

스크롤을 방지하기 위해 한두 줄에 맞도록 메시지를 짧게 유지하십시오. 문장 스타일의 대문자와 적절한 구두법을 사용하십시오.

#### - 비난, 판단 또는 모욕을 피하십시오

사람들은 문제와 위험한 상황에 대한 경고를 알립니다. 오랫동안 친숙한 어조를 사용하는 한, 긍정적이고 맞지 않을때 보다 부정적이고 직접적인 것보다 더 낫습니다. you, your, me, and my 같은 대명사는 피해야합니다. 때로는 모욕이나 후회로 해석되기도한다.

#### - 경고 단추는 설명하지 마십시오

경고 텍스트와 버튼 제목이 명확하면 버튼의 기능을 설명 할 필요가 없습니다. 드물지만 지침을 제공해야하는 경우 탭을 사용하고 대문자를 유지하면서 버튼을 참조하고 버튼 제목을 따옴표로 묶지 마십시오.

### 경고 버튼

#### - 일반적으로 2개의 버튼 경고를 사용합니다

2개의 버튼 경고는 두 가지 대안 중에서 쉬운 선택을 제공합니다. 단일 버튼 경고는 상황을 알리지 만 상황을 제어하지 못합니다. 세 개 이상의 버튼이있는 경고는 복잡성을 야기하며 스크롤이 필요할 수 있습니다. 이는 사용자 경험이 좋지 않습니다. 두 가지 이상의 선택이 필요하다고 생각되면 액션 시트를 대신 사용해보십시오. [Action Sheets](https://developer.apple.com/ios/human-interface-guidelines/views/action-sheets/)를 참조하십시오.

#### - 경고 버튼을 간결하고 논리적인 제목으로 지정하십시오

가장 좋은 버튼 제목은 단추를 선택한 결과를 설명하는 하나 또는 두 단어로 구성됩니다. 모든 버튼 제목과 마찬가지로 제목 스타일 대문자와 마침표가 사용되지 않습니다. 가능하면 경고 제목 및 메시지와 직접 관련된 동사 및 동사를 사용하십시오(예 : View All, Reply 또는 Ignore). 간단한 승인을 위해 OK를 사용하십시오. `Yes`와 `No`를 사용하지 마십시오.

#### - 사람들이 기대하는 버튼을 배치하십시오

일반적으로 사람들이 가장 잘 할 수있는 버튼은 `오른쪽에 있어야`합니다. 취소 버튼은 `항상 왼쪽`에 있어야합니다.

#### - 취소 버튼에 적절하게 라벨을 지정하십시오

경고 작업을 취소하는 버튼은 항상 Cancel라고 표시해야합니다.

#### - 부정적인 단추를 확인하십시오

경고 단추로 인해 내용 삭제와 같은 파괴적인 동작이 발생하면 단추 스타일을 부적정(?)으로 설정하여 시스템에서 적절한 형식을 갖도록하십시오. 개발자 지침의 경우, 참조 [UIAlertActionStyleDestructive](https://developer.apple.com/documentation/uikit/uialertactionstyle/uialertactionstyledestructive) 의 일정 [UIAlertAction](https://developer.apple.com/documentation/uikit/uialertaction)을. 또한 취소 버튼을 제공하여 사람들이 안전하게 파괴 행동을 거부 할 수 있도록하십시오. 취소 단추를 기본 단추로 표시하여 굵게 표시하십시오.

#### - 사람들이 홈 화면으로 나가서 경고를 취소 할 수 있도록 허용합니다

알림이 표시되는 동안 홈 화면에 액세스하면 앱이 종료됩니다. 취소 단추를 누르는 것과 동일한 효과를 가져와야합니다. 즉, 아무런 작업도 수행하지 않고 경고가 해제됩니다. 경고에 취소 버튼이 없으면 누군가가 앱을 종료 할 때 실행되는 코드에서 취소 작업을 구현하는 것을 고려해보십시오.

---

## Collections

컬렉션은 일련의 사진과 같이 순서가 지정된 일련의 컨텐츠를 관리하고 사용자 정의 가능하고 시각적인 레이아웃으로 제공합니다. 컬렉션은 엄격하게 선형 형식을 적용하지 않으므로 크기가 다른 항목을 표시하는 데 특히 적합합니다. 일반적으로 컬렉션은 이미지 기반 콘텐츠를 보여주는데 이상적입니다. 배경 및 기타 장식 뷰를 선택적으로 구현하여 항목의 하위 집합을 시각적으로 구별 할 수 있습니다.

<center><img src="/img/posts/collection.png" width="382" height="700"></center> <br> 

#### - 컬렉션은 상호 작용과 애니메이션을 모두 지원합니다

기본적으로을 탭하여 길게 터치하여 수정하고 누른 채로 스 와이프하여 스크롤 할 수 있습니다. 앱에서 요구하는 경우 맞춤 동작을 수행하기 위해 더 많은 제스처를 추가 할 수 있습니다. 컬렉션 내에서 항목을 삽입, 삭제 또는 재정렬 할 때마다 애니메이션을 사용할 수 있으며 사용자 지정 애니메이션도 지원할 수 있습니다.

#### - 표준 행이나 격자 레이아웃으로 충분할 때 근본적인 새로운 디자인을 만들지 마십시오

컬렉션은 관심의 중심이 아닌 사용자 경험을 향상시켜야합니다. 항목을 쉽게 선택하도록하십시오. 컬렉션의 항목을 탭하기가 어려울 경우 사람들은 좌절감을 느끼고 원하는 콘텐츠에 도달하기 전에 관심을 잃게됩니다. 콘텐츠 주위에 적절한 여백을 사용하여 레이아웃을 깨끗하게 유지하고 내용이 겹치지 않도록하십시오.

#### - 텍스트 대신 컬렉션을 사용하는 것이 좋습니다

일반적으로 텍스트 정보가 스크롤 가능한 목록에 표시되면이를보고 소화하는 것이 더 간단하고 효율적입니다.

#### - 동적 레이아웃을 변경할때 주의하십시오

컬렉션의 레이아웃은 언제든지 변경할 수 있습니다. 사용자가 레이아웃을보고 상호 작용하는 동안 동적으로 레이아웃을 변경하는 경우 변경 내용이 이해되고 추적하기 쉽도록해야합니다. 레이아웃을 변경하지 않으면 앱을 예측할 수 없고 사용하기 어려워 보일 수 있습니다. 레이아웃 변경으로 인해 컨텍스트가 손실되면 사람들은 더 이상 통제 할 수없는 것처럼 느낄 수 있습니다.

개발자 안내는 [UICollectionView](https://developer.apple.com/documentation/uikit/uicollectionview)를 참조하십시오.

---

## Image Views

이미지뷰는 투명하거나 불투명 한 배경 위에 단일 이미지 또는 연속된 애니메이션를 표시합니다. 이미지뷰안에서 이미지가 늘어나거나 크기가 조정되거나 특정 위치에 고정되거나 고정 될 수 있습니다. 이미지뷰는 기본적으로 인터렉션을 하지 않습니다.

<center><img src="/img/posts/imageView.png" width="382" height="700"></center> <br> 

#### - 가능한 경우 연속된 애니메이션의 모든 이미지의 크기가 일관되게 유지되는지 확인하십시오.
 
이상적으로는, 이미지가 화면에 맞게 사전 크기 조정되어야하므로 시스템에서 크기 조정을 수행 할 필요가 없습니다. 시스템이 스케일링을 수행해야하는 경우, 모든 이미지가 동일한 크기 및 모양 일 때 원하는 결과를 얻는 것이 가장 쉽습니다.

개발자 안내는 [UIImageView](https://developer.apple.com/documentation/uikit/uiimageview)를 참조하십시오.

> NOTE
> 
> 템플리트 이미지로 구성된 이미지는 색상을 삭제하고 둘러싸는 이미지뷰에 적용된 색조를 채택합니다. 개발자 안내 는 [UIImage](https://developer.apple.com/documentation/uikit/uiimage)의 [UIImageRenderingModeAlwaysTemplate](https://developer.apple.com/documentation/uikit/uiimagerenderingmode/uiimagerenderingmodealwaystemplate)을 참조하십시오.

---

## Maps 

맵뷰를 사용하면 앱에 지리적 데이터를 표시 할 수 있으며 내장된 지도 앱에서 제공하는 대부분의 기능을 지원할 수 있습니다. 맵뷰는 표준지도, 위성 이미지 또는 두 가지 모두를 표시하도록 구성 할 수 있습니다. 핀 및 오버레이를 포함 할 수 있으며 줌 및 패닝을 지원합니다. 앱이 사용자 추적 앱과 같이 경로 지정을 지원하는 경우 맵뷰를 사용하여 경로를 표시 할 수 있습니다.

| 사용자와 상호작용 | 핀 사용 | 
| :--: | :--: |
|![screen](/img/posts/MapView.png) | ![screen](/img/posts/MapView-1.png)| <br>

#### - 일반적으로지도를 대화 형으로 유지하십시오

사람들은 제스처를 사용하여지도 앱과 상호 작용하고 익숙한 방식으로지도와 상호 작용할 수 있기를 기대합니다.

#### - 예상되는 핀 색상을 사용하십시오

핀은지도에서 관심 지점을 식별합니다. 사람들은지도 앱의 표준 핀 색상에 익숙합니다. 앱에서 이러한 색상의 의미를 재정의하지 마십시오. 대상에 빨간색, 시작 위치에 녹색, 사용자가 지정한 위치에 자주색을 사용하십시오.

개발자 가이드는 [MapKit](https://developer.apple.com/documentation/mapkit)을 참조하십시오.

---

## Pages 

페이지 뷰 컨트롤러는 문서, 책, 메모장 또는 캘린더와 같은 콘텐트 페이지간에 선형 탐색을 구현하는 방법을 제공합니다. 페이지 뷰 컨트롤러는 두 가지 스타일 중 하나를 사용하여 탐색 스크롤 또는 페이지 컬링 중에 페이지 간의 전환을 관리합니다. 스크롤링 전환에는 특별한 모양이 없습니다. 페이지가 한 페이지에서 다른 페이지로 유동적으로 스크롤됩니다. 페이지 컬 전환은 화면을 가로 질러 페이지가 넘치게하여 실제 책의 페이지처럼 바뀝니다. <br>

| scrolling Transition | Page Curl transition | 
| :--: | :--: |
|![screen](/img/posts/MapView.png) | ![screen](/img/posts/MapView-1.png)| <br>

#### - 적절한 경우 비선형 적으로 탐색 할 수있는 방법을 구현하십시오

페이지 뷰 컨트롤러를 사용했을때 페이지가 순차적으로 흐르게 할수 있고, 비연결 페이지간에 이동할 방법이 없습니다. 사용자가 앱에서 순차적으로 페이지에 액세스해야하는 경우 이 기능을 제공하는 맞춤 컨트롤을 구현하십시오.

개발자 안내는 [UIPageViewController](https://developer.apple.com/documentation/uikit/uipageviewcontroller)를 참조하십시오.

---

## Popovers 

팝 오버는 컨트롤이나 영역을 탭할 때 화면상의 다른 내용 위에 나타나는 일시적인 뷰입니다. 일반적으로 popover에는 출현 한 위치를 가리키는 화살표가 포함됩니다. 팝 오버는 nonmodal 또는 모달이 될 수 있습니다. nonmodal popover는 다른 스크린 또는 팝오버위에 있는 버튼에 의해서 해제됩니다. 모달 popover는 popover의 Cancel이나 다른 버튼을 두드리면 해제됩니다.

Popover는 큰 화면에서 가장 적합하며 탐색 모음, 도구 모음, 탭 모음, 표, 모음, 이미지, 지도 및 사용자 지정보기를 비롯한 다양한 요소를 포함 할 수 있습니다. `Popover가 활성화되면 Popover가 해제 될 때까지 다른뷰와의 상호 작용은 일반적으로 비활성화됩니다.` 팝업 오버플로를 사용하여 화면상의 내용과 관련된 옵션이나 정보를 표시하십시오. 예를 들어, 많은 iPad 앱은 작업 버튼을 누르면 공유 옵션이 표시됩니다.

<center><img src="/img/posts/popovers.png" width="500" ></center> <br> 

#### - iPhone에서 팝업 표시를 피하십시오

일반적으로 popovers는 iPad 앱에서 사용하도록 예약해야합니다. iPhone 응용 프로그램에서는 popover가 아닌 전체 화면 모달보기로 정보를 표시하여 사용 가능한 모든 화면 공간을 활용하십시오. 관련 지침은 [양식](https://developer.apple.com/ios/human-interface-guidelines/app-architecture/modality/)을 참조하십시오.

#### - 확인 및 안내용으로만 닫기 버튼을 사용하십시오

취소 또는 완료와 같은 닫기 버튼은 변경 내용을 저장하거나 저장하지 않고 종료하는 경우처럼 명확성을 제공하면 포함 할 가치가 있습니다. 일반적으로 popover는 더 이상 존재하지 않을 때 자동으로 닫혀 있어야합니다. 대부분의 경우 Popover는 누군가가 범위를 벗어나 popover에서 항목을 선택할 때 닫아야합니다. 여러 항목을 선택할 수 있는 경우 명시 적으로 누군가를 해산하거나 범위를 벗어날 때까지 팝업을 열어 두어야합니다.

#### - 비 활성화 popover를 자동으로 닫을 때 항상 작업 저장

스크린의 다른 부분을 두드려서 비 의도적으로 비모수 팝 오버를 해제하는 것은 쉽습니다. 누군가 취소 버튼을 분명히 두드리는 경우에만 작업을 취소하십시오.

#### - 화면에 팝업을 적절하게 배치하십시오

팝 오버의 화살표는 그것을 드러낸 요소에 가능한 한 직접 가리켜 야합니다. popovers는 화면에서 드래그 할 수 없기 때문에 popover는 Popover를 사용하는 동안 사람들이 볼 필요가있는 필수 컨텐츠를 덮어서는 안됩니다. popover는 Popover를 보여주기 위해 탭한 요소를 포함하면 안됩니다.

#### - 한 번에 하나의 팝업을 표시하십시오

여러 개의 popovers를 표시하면 인터페이스가 혼란스럽고 혼란을 야기합니다. 상황 또는 계층 구조의 팝업을 표시하지 마십시오. 새로운 popover를 보여줄 필요가있는 경우 먼저 열린 상태로 닫으십시오.

#### - popover를 통해 다른보기를 표시하지 마십시오

경고를 제외하고는 팝업 표시 위에 아무 것도 표시되지 않아야합니다.

#### - 가능한 경우 사용자가 하나의 팝업을 닫고 다른 탭을 한 번 누를 수 있습니다

여분의 탭을 피하는 것은 여러 개의 다른 바 버튼이 각각 팝업을 열 때 특히 바람직합니다.

#### - popover를 너무 크게하지 마십시오

Popover가 전체 화면을 차지해서는 안됩니다. 내용을 표시하고 출처를 가리 키기에 충분한 크기로 만드십시오. 시스템이 화면에 잘 맞는지 확인하기 위해 popover의 크기를 조정할 수 있습니다.

#### - 커스텀 팝 오버가 팝 오버처럼 보이는지 확인하십시오

팝 오버의 시각적 측면을 많이 사용자 정의 할 수 있지만 사람이 팝 오버로 인식하지 못할 수있는 디자인을 만들지 마십시오. Popover는 표준 컨트롤과 뷰가 포함되어있을 때 가장 잘 작동하는 경향이 있습니다.

#### - 팝 오버의 크기를 변경할 때 부드러운 전환을 제공합니다

일부 popovers는 동일한 정보에 대한 압축 된 뷰와 확장 된 뷰를 제공합니다. 팝 오버의 크기를 조정하는 경우 새 팝 오버가 이전 팝업을 대체했다는 인상을주지 않도록 변경 사항을 애니메이션으로 지정하십시오.

개발자 가이드는 [UIPopoverPresentationController](https://developer.apple.com/documentation/uikit/uipopoverpresentationcontroller)를 참조하십시오.

---

## Scroll Views

스크롤 뷰는 사용자가 문서 또는 이미지 모음의 텍스트와 같이 보이는 영역보다 큰 내용을 탐색 할 수있게합니다. 사람들이 스와이프, 톡톡 치기, 드래그, 탭 및 핀치를하면 스크롤 뷰가 제스처를 따라 자연스럽게 느껴지는 방식으로 내용을 표시하거나 확대 / 축소합니다. 스크롤 뷰 자체는 보이지 않지만 사람들이 상호 작용할 때 일시적인 스크롤 인디케이터를 표시합니다. 스크롤뷰는 페이징 모드에서 작동하도록 구성 할 수도 있습니다. 여기서 스크롤은 현재 페이지를 돌아 다니기보다는 완전히 새로운 페이지 내용을 나타냅니다.

<center><img src="/img/posts/scrollView.png" width="382" height="700"></center> <br> 

#### - 줌 동작을 적절히 지원하십시오

앱에서 의미가있는 경우 사람들이 집어 넣거나 두 번 탭하여 확대/축소 할 수 있습니다. 확대/축소 기능을 활성화 할 때 의미있는 최대 및 최소 스케일 값을 설정하십시오. 예를 들어, 한 문자가 화면을 가득 채울 때까지 텍스트를 확대하는 것은 대부분의 앱에서 이해가되지 않을 수 있습니다.

#### - 스크롤 뷰가 페이징 모드 일 때 페이지 컨트롤 요소를 표시하는 것을 고려하십시오

페이지 컨트롤은 사용 가능한 페이지, 화면 또는 기타 내용의 수 표시하고 현재 볼 수있는 페이지, 화면 또는 기타 덩어리를 나타냅니다. 스크롤뷰가있는 페이지 컨트롤을 표시하는 경우 혼동을 피하기 위해 동일한 축의 스크롤 표시기를 비활성화하십시오. 추가 지침은 [페이지 컨트롤을](https://developer.apple.com/ios/human-interface-guidelines/controls/page-controls/) 참조하십시오.

#### - 다른 스크롤 뷰 내부에 스크롤 뷰를 배치하지 마십시오

이렇게하면 제어하기 어려운 예측할 수없는 인터페이스가 생성됩니다.

#### - 일반적으로 한 번에 하나의 스크롤뷰를 표시합니다

사람들은 스크롤 할 때 종종 큰 스와이프 제스처를 만들고 같은 화면에서 인접한 스크롤 뷰와 상호 작용하는 것을 피하기가 어려울 수 있습니다. 한 화면에 두 개의 스크롤뷰를 넣어야하는 경우 다른뷰로 스크롤 할 수 있도록 허용하여 두보기가 두개의뷰에 영향을 미치지 않도록하십시오. 예를 들어 iPhone이 세로 방향 인 경우 Stock App에 가로로 스크롤되는 회사 별 정보 위에 수직으로 스크롤되는 주식 시세가 표시됩니다.

개발자 안내는 [UIScrollView](https://developer.apple.com/documentation/uikit/uiscrollview)를 참조하십시오.

---

## Split Views

분할뷰는 기본 창에 영구 컨텐트가 있고 보조 창에 관련 정보가있는 두 개의 나란히 배치 된 컨텐트의 프레젠테이션을 관리합니다. 각 창에는 탐색 모음, 도구 모음, 탭 모음, 표, 모음, 이미지, 맵 및 커스텀뷰를 비롯한 다양한 요소가 포함될 수 있습니다. 분할뷰는 필터링 할 수있는 콘텐츠와 함께 사용되는 경우가 많습니다. 필터 범주 목록이 주 창에 나타나고 선택한 범주의 필터링 된 결과가 보조 창에 표시됩니다. 앱에서 필요로하는 경우 기본 창은 보조 창을 오버레이 할 수 있으며 사용하지 않을 때는 화면 밖에서 숨길 수 있습니다. 이 기능은 장치가 세로 방향 인 경우 특히 유용합니다. 보조 창에서 콘텐츠를 볼 수있는 여지가 많기 때문입니다.

<center><img src="/img/posts/SplitView.png" width="500"></center> <br> 

#### - 콘텐츠와 잘 어울리는 분할보기 레이아웃을 선택하십시오

기본적으로 분할뷰는 화면의 1/3을 기본 창에, 2/3를 보조 창에 사용합니다. 화면을 절반으로 나눌 수도 있습니다. 콘텐츠를 기반으로 적절한 분할을 선택하고 창이 불균형 해 보이지 않는지 확인하십시오. 기본 창보다 좁은 보조 창을 생성하지 마십시오.

#### - 기본 창에서 활성 선택 항목을 지속적으로 강조 표시합니다

보조 창의 내용은 변경 될 수 있지만 항상 기본 분할 창의 명확하게 식별 가능한 선택과 일치해야합니다. 이는 사람들이 창 사이의 관계를 이해하는 데 도움이됩니다.

#### - 일반적으로 분할보기의 한쪽으로 탐색을 제한합니다

분할보기의 두 창에 탐색을 배치하면 사람들이 방향을 유지하고 두 창 사이의 관계를 식별하기가 어려워집니다.

#### - 숨겨진 기본 창에 액세스하는 여러 가지 방법을 제공하십시오

기본 창이 오프스크린 일 수 있는 레이아웃에서는 일반적으로 탐색 표시 줄에 버튼을 제공하여 패널을 표시해야합니다. 앱이 스와이프 제스처를 사용하여 다른 기능을 수행하지 않는 한 사람들이 화면의 측면에서 스와이프하여 기본 창에 액세스 할 수있게합니다.

개발자 안내는 [UISplitViewController](https://developer.apple.com/documentation/uikit/uisplitviewcontroller)를 참조하십시오.

---

## Tables

표는 데이터를 섹션 또는 그룹으로 나눌 수있는 단일 열 목록의 스크롤링으로 표시합니다. 표를 사용하여 대용량 또는 소량의 정보를 목록 형태로 깨끗하고 효율적으로 표시하십시오. 일반적으로 테이블은 텍스트 기반 콘텐츠에 이상적이며 종종 반대쪽에 표시된 관련 콘텐츠와 함께 분할뷰의 한 쪽에서 탐색 수단으로 나타납니다. [분할뷰를](https://developer.apple.com/ios/human-interface-guidelines/views/split-views/) 참조하십시오 .

iOS는 평범하고 그룹화 된 두 가지 스타일의 표를 구현합니다.

| Plain | Grouped | 
| :--: | :--: |
|![screen](/img/posts/tables.png) | ![screen](/img/posts/tables-1.png)| <br>

#### - Plain 

행은 레이블이있는 섹션으로 분리 될 수 있으며 선택 색인은 테이블의 오른쪽 가장자리를 따라 수직으로 나타날 수 있습니다. 머리글은 섹션의 첫 번째 항목 앞에 표시 될 수 있으며 바닥 글은 마지막 항목 뒤에 나타날 수 있습니다.

#### - Grouped 

행은 그룹으로 표시되며 앞에는 머리글이 있고 뒤에는 바닥 글이옵니다. 이 스타일의 표는 항상 최소한 하나의 그룹을 포함하며 각 그룹은 항상 최소한 하나의 행을 포함합니다. 그룹화 된 테이블은 인덱스를 포함하지 않습니다.

#### - 표 너비를 생각해보십시오

얇은 테이블은 끊김 및 줄 바꿈을 유발하여 원거리에서 빠르게 읽고 스캔하기 어렵게 만듭니다. 와이드 테이블은 읽기 및 스캔이 어려울 수 있으며 컨텐츠에서 공간을 제거 할 수 있습니다.

#### - 테이블 내용을 빨리 보여주기 시작하십시오

무언가를 보여주기 전에 확장 된 테이블 내용이로드 될 때까지 기다리지 마십시오. 화면의 행을 텍스트 데이터로 즉시 채우고 더 복잡한 데이터(예: 이미지)를 사용할 수있게 표시하십시오. 이 기술은 사람들에게 유용한 정보를 즉시 제공하고 앱의 응답 성을 향상시킵니다. 새롭고 새로운 데이터가 도착할 때까지 오래된 데이터를 나타내는 경우가 있습니다.

#### - 콘텐츠 로드시 진행 상황을 알립니다

표의 데이터가로드되는 데 시간이 걸리는 경우 진행률 표시 줄(progress bar) 또는 활동 표시기(activity indicator)를 표시하여 앱이 아직 실행 중인지 확인합니다.

#### - 콘텐츠 최신으로 유지

새로운 데이터를 반영하기 위해 테이블의 내용을 정기적으로 업데이트하는 것이 좋습니다. 스크롤 위치를 변경하지 마십시오. 대신 콘텐츠를 표의 처음 또는 끝에 추가하고 사람들이 준비가되면 스크롤 할 수있게하십시오. 일부 앱은 새로운 데이터가 추가되면 표시기를 표시하고 바로 데이터 이동 권한을 제공합니다. 또한 새로 고침 제어 기능을 포함 시키면 언제든지 수동으로 업데이트를 수행 할 수 있습니다. 컨텐츠 컨트롤 [Refresh Content](https://developer.apple.com/ios/human-interface-guidelines/controls/refresh-content-controls/) 참조하십시오.

#### - 오른쪽 정렬 요소가 포함 된 테이블 행과 색인을 결합하지 마십시오

인덱스는 큰 스와이프 제스처를 수행하여 제어됩니다. 공개 표시기(다른 요소)와 같이 다른 상호작용 요소가 근처에있는 경우 제스처가 발생하고 잘못된 요소가 활성화 될 때 사용자의 의도를 식별하기 어려울 수 있습니다.


개발자 안내는 [UITableView](https://developer.apple.com/documentation/uikit/uitableview)를 참조하십시오.

#### - 테이블 행 

표준 테이블뷰셀 스타일을 사용하여 내용이 표 행에 표시되는 방식을 정의합니다. <br>

| basic(Default) | Subtitle | 
| :--: | :--: |
|![screen](/img/posts/tables-2.png) | ![screen](/img/posts/tables-3.png)| <br>

#### - basic(Default) 

행의 왼쪽에있는 선택적인 이미지와 왼쪽 정렬 된 제목. 보충 정보가 필요없는 항목을 표시하는 데는 좋은 옵션입니다. 개발자 지침의 경우[UITableViewCellStyleDefault](https://developer.apple.com/documentation/uikit/uitableviewcellstyle/uitableviewcellstyledefault)의 있는 [UITableViewCell](https://developer.apple.com/documentation/uikit/uitableviewcell)을 참조하세요 

#### - Subtitle 

한 줄에 왼쪽 정렬 제목과 옆에 왼쪽 정렬 자막. 이 스타일은 행이 시각적으로 비슷한 테이블에서 잘 작동합니다. 추가 자막은 행을 서로 구별하는 데 도움이됩니다. 개발자 지침의 경우, [UITableViewCellStyleSubtitle](https://developer.apple.com/documentation/uikit/uitableviewcellstyle/uitableviewcellstylesubtitle)에 있는 [UITableViewCell](https://developer.apple.com/documentation/uikit/uitableviewcell)을 참조하세요 <br>

| Right Detail(Value 1) | Left Detail(Value 2) | 
| :--: | :--: |
|![screen](/img/posts/tables-4.png) | ![screen](/img/posts/tables-5.png)| <br>


#### - Right Detail(Value 1) 

같은 줄에 오른쪽 정렬 자막이있는 왼쪽 정렬 제목입니다. 개발자 지침의 경우 [UITableViewCellStyleValue1](https://developer.apple.com/documentation/uikit/uitableviewcellstyle/uitableviewcellstylevalue1)의 있는 [UITableViewCell](https://developer.apple.com/documentation/uikit/uitableviewcell)을 참조하세요. 

#### - Left Detail(Value 2) 

오른쪽 정렬 된 제목 다음에 같은 줄의 왼쪽 맞춤 자막. 개발자 가이드 는 [UITableViewCell](https://developer.apple.com/documentation/uikit/uitableviewcell)의 [UITableViewCellStyleValue2](https://developer.apple.com/documentation/uikit/uitableviewcellstyle/uitableviewcellstylevalue2) 상수를 참조하십시오.

모든 표준 TableViewCell 스타일은 체크 표시 또는 공개 표시와 같은 그래픽 요소도 허용합니다. 물론 이러한 요소를 추가하면 제목 및 부제에 사용할 수있는 공간이 줄어 듭니다.

#### - 클리핑을 피하려면 텍스트를 간결하게하십시오. 

절단 된 단어와 구는 검색하고 해독하기가 어렵습니다. 텍스트 자르기는 모든 표 셀 스타일에서 자동이지만 사용하는 셀 스타일과 잘림이 발생하는 위치에 따라 다소 문제를 나타낼 수 있습니다.

#### - 삭제 단추에 대한 사용자 정의 제목 사용을 고려하십시오

행이 삭제를 지원하고 명확성을 제공하는 데 도움이되는 경우, 시스템 제공 삭제 제목을 사용자 정의 제목으로 대체하십시오.

#### - 선택이 이루어질때 피드백을 제공하십시오

사람들은 내용을 누를 때 잠깐 강조 표시 할 행을 기대합니다. 그런 다음 사람들은 새로운보기가 나타나거나 변경 될 내용(예: 선택 표시가 나타남)이 선택되었음을 나타냅니다.

#### - 비표준 테이블 행에 대한 사용자 정의 테이블 셀 스타일을 디자인하십시오

표준 스타일은 다양한 일반 시나리오에서 사용하기에 적합하지만 일부 콘텐츠 또는 전반적인 앱 디자인은 크게 사용자 정의 된 표 모양을 요구할 수 있습니다. [Customizing Cell](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/TableView_iPhone/TableViewCells/TableViewCells.html#//apple_ref/doc/uid/TP40007451-CH7-SW18) 참조하는 방법을 배우려면 [Table View Programming Guide for iOS](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/TableView_iPhone/AboutTableViewsiPhone/AboutTableViewsiPhone.html) 을 참조하세요.

개발자 안내는 [UITableViewCell](https://developer.apple.com/documentation/uikit/uitableviewcell)을 참조하십시오.

---

## Text Views 

텍스트뷰는 여러 줄의 스타일이 지정된 텍스트 내용을 표시합니다. 텍스트뷰는 높이가 될 수 있으며 컨텐츠뷰와 외부로 확장되면 스크롤 할 수 있습니다. 기본적으로 텍스트뷰의 내용은 왼쪽으로 정렬되고 시스템 글꼴은 검정색으로 사용됩니다. 텍스트뷰를 편집 할 수있는 경우 텍스트뷰의 내부를 탭하면를 키보드가 나타납니다.

<center><img src="/img/posts/TextView.png" width="382" height="700"></center> <br> 

#### - 텍스트를 읽기 쉬운 상태로 유지하십시오

독창적인 방식으로 여러 글꼴, 색상 및 맞춤을 사용할 수 있지만 콘텐츠의 가독성을 유지하는 것이 중요합니다. 동적 유형을 채택하는 것이 좋습니다. 그래야 사람들이 기기에서 텍스트 크기를 변경하면 텍스트가 잘 보입니다. 또한 굵은 텍스트와 같이 내게 필요한 옵션을 사용하도록 설정하여 콘텐츠를 테스트해야합니다.

#### - 해당 키보드 유형을 표시하십시오

iOS는 여러 유형의 키보드를 제공하며 각 유형은 서로 다른 유형의 입력을 용이하게합니다. 데이터 입력을 간소화하려면 텍스트뷰를 편집하는 동안 표시되는 키보드가 필드의 내용 유형에 적합해야합니다. 가능한 키보드 유형의 전체 목록은 참조 [UIKeyboardType](https://developer.apple.com/documentation/uikit/uikeyboardtype), [UITextInputTraits](https://developer.apple.com/documentation/uikit/uitextinputtraits)을 참조하세요

개발자 안내는 [UITextView](https://developer.apple.com/documentation/uikit/uitextview)를 참조하십시오.

---

## Web Views 

웹뷰는 삽입 된 HTML 및 웹 사이트와 같은 풍부한 웹 콘텐츠를 앱 내에 직접로드하고 표시합니다. Mail은 웹뷰를 사용하여 메시지에 HTML 컨텐트를 표시합니다.

<center><img src="/img/posts/WebView.png" width="382" height="700"></center> <br> 

#### - 적절한 경우 앞으로 및 뒤로 탐색을 사용합니다

`웹뷰는 앞으로 및 뒤로 탐색을 지원 하지만 이 동작은 기본적으로 비활성화되어 있습니다.` 사용자가 웹뷰를 사용하여 여러 페이지를 방문하는 경우 앞으로 및 뒤로 탐색을 활성화하고 해당 기능을 시작하는 컨트롤을 제공하십시오.

#### - 웹뷰를 사용하여 웹 브라우저를 작성하지 마십시오

웹뷰를 사용하여 사람들이 앱의 컨텍스트를 벗어나지 않고 간단히 웹 사이트에 액세스 할 수있게하는 것은 좋지만 Safari가 사람들이 iOS에서 웹을 탐색하는 주요 방법입니다. 앱에서 Safari의 기능을 복제하려는 시도는 불필요하고 권장하지 않습니다.

개발자 안내는 [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)를 참조하십시오.

---