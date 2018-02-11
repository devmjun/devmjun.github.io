---
layout:     post
title:      "iOS 휴먼 인터페이스 가이드라인 요약 (8)"
subtitle:   ""
date:       2018-02-11 21:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true
tags: [Swift]
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

<center><img src="/img/posts/ActionSheet.png" height="700"></center> <br> 

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

<center><img src="/img/posts/activity_views.png" height="700"></center> <br> 

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

개발자 지침은 [UIActivityViewContoller](https://developer.apple.com/documentation/uikit/uiactivityviewcontroller) 및 [UIActivity](https://developer.apple.com/documentation/uikit/uiactivity)를 참조하십시오 .













