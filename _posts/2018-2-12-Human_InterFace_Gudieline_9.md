---
layout:     post
title:      "iOS 휴먼 인터페이스 가이드라인 요약 (9)"
subtitle:   ""
date:       2018-02-12 00:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

개인적인 공부의 목적으로 작성 되었습니다. 오역이나 잘못된 부분이 있을수 있으니, 댓글 남겨 주시면 감사하겠습니다!

---

# Controls 

- Button
- Edit Menus
- Labels
- Page Controls
- Pickers
- Progress Indicators
- Refresh Content Controls
- Segmented Controls
- Sliders
- Steppers
- Switches
- Text Fields

---

## Button

버튼은 앱별 작업을 시작하고 사용자 정의 할 수있는 배경을 가지고 있으며 제목이나 아이콘을 포함 할 수 있습니다. 이 시스템은 대부분의 사용 사례에 대해 미리 정의 된 여러 가지 버튼 스타일을 제공합니다. 완전한 사용자 지정 버튼를 디자인 할수 있습니다.

개발자 안내는 [UIButton](https://developer.apple.com/documentation/uikit/uibutton)을 참조하세요.

#### - 시스템 버튼

시스템 버튼은 종종 Navigation Bar 와 Toolbar에 나타나지만 어디에서나 사용할 수 있습니다.

<center><img src="/img/posts/button.png" width="500"></center> <br> 

#### - 제목에 동사를 사용하십시오

특정 활동 제목은 버튼이 탭하면 무슨 일이 일어나는지 알려줍니다.

#### - 제목에는 대문자를 사용하십시오

조항, 연결사 및 4자 이하의 전치사를 제외한 모든 단어를 대문자로 기입하십시오.

#### - 제목을 짧게 유지하십시오

지나치게 긴 텍스트는 인터페이스를 복잡하게 만들 수 있으며 작은 화면에서 잘릴 수 있습니다.

#### - 필요한 경우에만 테두리 또는 배경을 추가하는 것을 고려하십시오

기본적으로 시스템 버튼에는 테두리나 배경이 없습니다. 그러나 일부 콘텐츠 영역에서는 상호 작용을 나타 내기 위해 경계 또는 배경이 필요합니다. 전화 앱에서는 테두리가있는 숫자 키가 기존 전화 모델을 강화하고 통화 버튼의 배경은 쉽게 맞출 수있는 눈길을 끄는 대상을 제공합니다.

개발자 지침의 경우, 참조 [UIButtonTypeSystem](https://developer.apple.com/documentation/uikit/uibuttontype/uibuttontypesystem)의 버튼 타입 있는 [UIButton](https://developer.apple.com/documentation/uikit/uibutton)을 참조하세요.

#### - 상세 정보 공개 버튼

Detail Disclosure 버튼은 화면상의 특정 항목과 관련된 추가 정보 또는 기능을 포함하는보기(일반적으로 모달뷰)를 띄우게 됩니다. 어떤뷰 에서도 사용할 수 있지만 Detail Disclosure 버튼은 일반적으로 테이블에서 특정 행에 대한 정보에 액세스하는 데 사용됩니다.

<center><img src="/img/posts/button-1.png" width="500"></center> <br> 

#### - 테이블뷰 에서 Detail Disclosure 버튼을 적절하게 사용하십시오

Detail Disclosure 버튼이 테이블뷰 행에있는 경우 버튼을 누르면 추가 정보가 표시됩니다. 다른 곳을 가볍게 두드리면 앱 정의 동작에서 행 또는 결과가 선택됩니다. 사람들이 전체 행을 탭하여 추가 세부 사항을 보게하려면 Detail Disclosure 버튼을 사용하지 마십시오. 대신 쉐브론으로 나타나는 세부 정보 공개 액세서리 컨트롤을 사용하십시오. [UITableViewCell](https://developer.apple.com/documentation/uikit/uitableviewcell) 의 [UITableViewCellAccessoryType](https://developer.apple.com/documentation/uikit/uitableviewcellaccessorytype)을 참조하십시오. <br>

개발자 지침의 경우, [UIButtonTypeDetailDisclosure](https://developer.apple.com/documentation/uikit/uibuttontype/uibuttontypedetaildisclosure)을 참조하세요. <br>

#### - 정보 버튼 

정보 버튼은 주변의뷰를 뒤집은 후 현재뷰의 뒷면에있는 앱에 대한 구성 세부 정보를 표시합니다. 정보 버튼은 밝은 부분과 어두운 부분의 두 가지 스타일로 제공됩니다. 앱의 디자인과 가장 잘 조화되고 화면 상에 손실되지 않는 스타일을 선택하십시오.

<center><img src="/img/posts/button-2.png" width="500"></center> <br> 

개발자 지침의 경우,[UIButtonTypeInfoLight](https://developer.apple.com/documentation/uikit/uibuttontype/uibuttontypeinfolight) 및 [UIButtonTypeInfoDark](https://developer.apple.com/documentation/uikit/uibuttontype/uibuttontypeinfodark) 의 버튼 타입 있는 [UIButton](https://developer.apple.com/documentation/uikit/uibutton)을 참조하세요.

#### - 연락처 버튼 추가

사용자는 연락처 추가 버튼을 탭하여 기존 연락처 목록을 탐색하고 텍스트 필드나 다른뷰에 삽입할 연락처를 선택할 수 있습니다. 예를 들어 메일의 경우 메시지의 받는사람 필드에있는 연락처 추가 단추를 눌러 연락처 목록에서 받는사람을 선택할 수 있습니다.

<center><img src="/img/posts/button-3.png" width="500"></center> <br> 

#### - 연락처 추가 버튼 외에도 키보드 입력을 허용합니다

연락처 추가 버튼은 연락처 정보를 입력하는 대신 대체가 아닌 대체 정보를 제공합니다. 기존 연락처를 추가하는 지름길로 제공하는 것이 좋지만 사람들이 키보드로 연락처 정보를 입력하게하십시오.

개발자 지침의 경우, [UIButtonTypeContactAdd](https://developer.apple.com/documentation/uikit/uibuttontype/uibuttontypecontactadd), [UIButton](https://developer.apple.com/documentation/uikit/uibutton)을 참조하세요.

---

## Edit Menus 

사람들은 텍스트 필드, 텍스트뷰, 웹뷰 또는 이미지뷰에서 요소를 누르고 잡고 두번 탭하여 내용을 선택하고 복사 및 붙여 넣기와 같은 편집 옵션을 표시 할 수 있습니다.

<center><img src="/img/posts/Edit_Menus.png" width="500"></center> <br> 

#### - 현재 상황에 맞는 명령을 보여줍니다

기본적으로 옵션에는 잘라내기, 복사, 붙여 넣기, 선택, 모두 선택 및 삭제 명령이 포함되며이 중 일부는 선택적으로 비활성화 할 수 있습니다. 아무 것도 선택하지 않으면 복사 또는 잘라내 기와 같이 선택이 필요한 옵션이 메뉴에 표시되지 않아야합니다. 마찬가지로 이미 항목이 선택되어있는 경우 메뉴에 선택 옵션이 없어야합니다.

#### - 필요한 경우 편집 옵션의 배치를 조정하십시오

기본적으로 메뉴는 사용 가능한 공간에 따라 삽입점 또는 선택 항목 위나 아래에 배치되며 관련 내용에 대한 포인터가 포함됩니다. 메뉴의 모양을 변경할 수는 없지만 위치를 구성 할 수 있으므로 중요한 내용이나 인터페이스 부분을 덮어 쓰지 못하게 할 수 있습니다.

#### - 편집 메뉴와 동일한 기능을 가진 다른 컨트롤을 구현하지 마십시오

작업을 시작하는 데 여러 가지 방법을 제공하면 일관성없는 사용자 경험이 발생하고 혼동을 초래할 수 있습니다. 예를 들어 앱에서 메뉴를 사용하여 콘텐츠를 복사 할 수있게하는 경우 복사 버튼도 구현하지 마십시오.

#### - 잠재적으로 유용한 편집 불가능한 텍스트를 선택하고 복사 할 수 있습니다

사람들은 흔히 메일, 메모 또는 웹 검색에 이미지 레이블이나 소셜 미디어 상태와 같은 정적 컨텐트를 추가하려고합니다.

#### - 버튼에 편집 옵션을 추가하지 마십시오

이렇게하면 옵션을 공개하려는 사람들이 대신 버튼을 활성화하게됩니다.

#### - 편집 작업을 실행 취소 가능하게 만듭니다

메뉴는 동작이 수행되기 전에 확인을 요구하지 않습니다. 누군가 작업을 수행 한 후에 마음을 바꿀 수 있기 때문에 항상 실행 취소와 다시 실행 지원을 구현하십시오.

#### - 유용한 사용자 정의 명령으로 편집 옵션을 확장하십시오

추가 앱 관련 명령을 제공하여 가치를 높일 수 있습니다. 표준 명령과 마찬가지로 모든 사용자 지정 명령은 선택한 텍스트 나 개체에서 작동해야합니다.

#### - 시스템 제공 명령 다음에 사용자 정의 명령을 표시하십시오

사용자 정의 명령을 잘 알려진, 자주 사용되는 시스템 제공 명령으로 중첩하지 마십시오.

#### - 사용자 지정 명령의 개수를 최소화하십시오

너무 많은 선택을하는 사람들을 압도하지 마십시오.

#### - 사용자 지정 명령 이름을 짧게 유지하십시오

명령 이름은 수행 할 동작을 간결하게 설명하는 동사 또는 짧은 동사구 여야합니다. 제목 스타일 대문자 사용 - 조항, 연결사 및 4자 이하의 전치사를 제외한 모든 단어를 이용하세요.

개발자 가이드는 [Copy, Cut, and Paste Operation](https://developer.apple.com/library/content/documentation/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/UsingCopy,Cut,andPasteOperations/UsingCopy,Cut,andPasteOperations.html#//apple_ref/doc/uid/TP40009542-CH11-SW1), [Text Programming Guide for iOS](https://developer.apple.com/library/content/documentation/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/Introduction/Introduction.html), [UIMenuController](https://developer.apple.com/documentation/uikit/uimenucontroller)를 참조하세요.

---

## Labels

레이블은 화면상의 인터페이스 요소를 설명하거나 짧은 메시지를 제공합니다. `사람들은 라벨을 편집 할 수 없지만 때때로 라벨의 내용을 복사 할 수 있습니다`. 레이블은 정적 텍스트를 얼마든지 표시 할 수 있지만 짧게 유지하는 것이 가장 좋습니다.

<center><img src="/img/posts/Labels.png" width="500"></center> <br> 

#### - 레이블을 읽기 쉽게하십시오

레이블에는 일반 텍스트 또는 스타일이 지정된 텍스트가 포함될 수 있습니다. 레이블 스타일을 조정하거나 사용자 지정 글꼴을 사용하는 경우 읽기 쉽게 만드는 점을 간과하지 말아주세요. 동적 유형을 채택하는 것이 가장 좋으므로 사용자가 자신의 장치에서 텍스트 크기를 변경하면 레이블이 잘 보입니다. [동적 유형](https://developer.apple.com/ios/human-interface-guidelines/visual-design/typography/#dynamic-type-sizes)을 참조하십시오. 굵은 글씨체와 같이 접근성 옵션이 활성화 된 Label도 테스트해야합니다. [접근성](https://developer.apple.com/ios/human-interface-guidelines/app-architecture/accessibility/)을 참조하십시오.

텍스트에 대한 자세한 내용은 [String Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/Strings/introStrings.html)를 참조하십시오. 스타일 텍스트 만들기에 대한 자세한 내용은 [Attributed String Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/AttributedStrings/AttributedStrings.html)를 참조하십시오 . 레이블 개발자 지침은 [UILabel](https://developer.apple.com/documentation/uikit/uilabel)을 참조하십시오.

---

## Page Controls 

페이지 컨트롤은 페이지의 플랫 목록에 현재 페이지의 위치를 ​​보여줍니다. 사용 가능한 페이지가 열린 순서대로 표시되는 일련의 작은 표시기 점으로 나타납니다. 단색 점은 현재 페이지를 시각적으로 나타냅니다. 이 점들은 항상 같은페이지에 있으며, 화면에 너무 많이 나타나면 잘립니다. 사용자는 페이지 컨트롤의 앞 또는 뒤 가장자리를 탭하여 다음 또는 이전 페이지를 방문 할 수 있지만 특정 점을 탭하여 특정 페이지로 이동할 수는 없습니다. 탐색은 항상 페이지를 한쪽으로 스와이프하여 순차적으로 발생합니다.

<center><img src="/img/posts/Page_Controls.png" width="500"></center> <br> 


#### - 계층 구조 페이지와 함께 페이지 컨트롤을 사용하지 마십시오

페이지 컨트롤은 페이지가 어떻게 관련되어 있는지 또는 각 점에 해당하는 페이지가 다른 페이지와 일치하는지를 표시하지 않습니다. 이 유형의 제어는 서로 동등한 하나의 페이지로 설계되었습니다.

#### - 너무 많은 페이지를 표시하지 마십시오

약 10개 이상의 점을 한 눈에 파악하기가 어렵고 약 20 페이지 이상의 열린 페이지가 순차적으로 방문하는 데 많은 시간을 소비합니다. 앱에 20 개의 페이지 이상의 점을 표시해야하는 경우 비순차적 탐색을 가능하게하는 다른 정렬 (예: 눈금)을 사용하는 것이 좋습니다.

#### - 중앙 페이지 컨트롤은 화면 하단에 있습니다

페이지 컨트롤은 항상 가운데 위치에 있어야하며 내용의 아래쪽과 화면 아래쪽 사이에 있어야합니다. 이렇게하면 내용을 차단하지 않고도 계속 볼 수 있습니다.

개발자 안내는 [UIPageControl](https://developer.apple.com/documentation/uikit/uipagecontrol)을 참조하십시오.

---

## Pickers

picker뷰는 하나 이상의 선택 가능한 값을 가진 하나 이상의 스크롤 가능한 고유 값 목록을 포함하며 뷰의 가운데에있는 어두운 텍스트에 나타납니다. picker뷰는 종종 사용자가 필드를 편집하거나 메뉴를 두드릴 때 화면의 맨 아래 또는 팝 오버에 표시됩니다. 달력 이벤트에서 날짜를 편집하는 경우와 같이 선택 도구가 인라인으로 나타날 수도 있습니다. picker의 도구의 높이는 약 5행의 목록 값의 높이입니다. 선택 도구의 너비는 장치 및 컨텍스트에 따라 화면 너비 또는 컨텐츠뷰의 너비 중 하나입니다.

<center><img src="/img/posts/Pickers.png" width="382" height="700"></center> <br> 

#### - 예측 가능하고 논리적으로 정렬 된 값을 사용하십시오

스크롤 가능 목록이 고정되어 있으면 선택기의 많은 값이 숨겨 질 수 있습니다. 알파벳 순으로 나열된 국가 목록과 같이 사람들이 이러한 가치가 무엇인지 예측할 수 있으므로 목록을 신속하게 이동할 수 있습니다.

#### - picker을 표시하도록 화면을 전환하지 마십시오

picker뷰는, 편집중인 필드 아래 또는 근접하여 표시 될때 잘 작동합니다.

#### - 큰 값 목록에는 선택 도구 대신 테이블을 사용하십시오

긴 목록은 피커에서 탐색하기가 지루할 수 있습니다. 테이블은 높이를 조정할 수 있으며 인덱스를 포함 할 수 있으므로 스크롤 속도가 훨씬 빨라집니다.

개발자 안내는 [UIPickerView](https://developer.apple.com/documentation/uikit/uipickerview)를 참조하십시오.

#### Date Pickers

날짜 선택 도구는 특정 날짜, 시간 또는 둘을 선택하기위한 효율적인 인터페이스입니다. 카운트 다운 타이머를 표시하기위한 인터페이스도 제공합니다.

<center><img src="/img/posts/Pickers-1.png" width="382" height="700"></center> <br> 

날짜 선택 도구에는 네 가지 모드가 있으며 각 모드는 서로 다른 선택 가능한 값 집합을 제공합니다.

- Date. 월, 월의 날자, 년도 을 보여줍니다
- Time. (1)시간, 분, AM/PM(선택 사항)을 보여줍니다
- Date and Time. 날짜, 시간, 분, 그리고 AM/PM(선택 사항)을 보여줍니다
- Countdown timer. 시간과 분, 23:59의 맥시멈 시간을 보여줍니다 

날짜 선택 도구에 표시된 정확한 값과 그 순서는 사용자의 위치에 따라 다릅니다.

#### - 분을 지정할 때 세분화을 줄이는 것이 좋습니다

기본적으로 분 목록은 60 개의 값 (0-59)을 포함합니다. 선택적으로 분 간격을 60으로 균등하게 나누면 분 간격을 늘릴 수 있습니다. 예를 들어, 분당 시간 간격(0, 15, 30 및 45)을 원할 수 있습니다.

개발자 안내는 [UIDatePicker](https://developer.apple.com/documentation/uikit/uidatepicker)를 참조하십시오.

---

## Progress Indicators

사람들이 앱이 콘텐츠를로드하거나 긴 데이터 처리 작업을 수행하기를 기다리는 정적 화면을 보면서 앉아 있지 않도록합니다. Activity indicators이 진행률 막대를 사용하여 앱이 정지 상태가 아니라는 사실을 알리고 대기 시간을 알 수 있습니다.

[Loading](https://developer.apple.com/ios/human-interface-guidelines/app-architecture/loading/)을 참조하십시오.

#### - Activity Indicators

activity indicator는 복잡한 데이터로드 또는 동기화와 같은 결정할 수없는 작업이 수행되는 동안 회전합니다. 작업이 완료되면 사라집니다. 활동 표시기는 비대화식입니다

<center><img src="/img/posts/Progrss_Indicator.png" width="500"></center> <br> 

#### - activity indicator보다 Progress bars 을 사용하십시오

액티비티를 수량화 할 수있는 경우 activity indicator 대신 Progress bars을 사용하면 사람들이 현재 진행 상황과 소요 시간을보다 정확하게 파악할 수 있습니다.

#### - activity indicator를 계속 움직이십시오

사람들은 정지 된 활동 지표를 정지 된 프로세스와 연관시킵니다. 그들이 무슨 일이 일어나고 있는지 알 수 있도록 회전 시키십시오.

#### - 도움이된다면, 작업 완료를 기다리는 동안 유용한 정보를 제공하십시오

추가 컨텍스트를 제공하기 위해 activity indicator 위에 레이블을 포함하십시오. 일반적으로 값을 추가하지 않기 때문에 loading 또는 authenticating과 같은 애매한 용어를 피하십시오.

개발자 지침은 [UIActivityIndicatorView](https://developer.apple.com/documentation/uikit/uiactivityindicatorview)를 참조하십시오.

#### - Progress Bars

Progress Bars에는 왼쪽에서 오른쪽으로 채워지는 트랙이 포함되어있어 알려진 지속 시간의 작업 진행을 보여줍니다. Progress Bars는 비 인터렉션형 이지만 대개 해당 작업을 취소하기위한 단추가 함께 제공됩니다.

<center><img src="/img/posts/Progrss_Indicator-1.png" width="500"></center> <br> 

#### - 항상 진행 상황을 정확하게 보고하십시오

앱이 바쁜 것처럼 보이게하기 위해 부정확한 진행 정보를 표시하지 마십시오. 정량화 할 수 있는 작업에 대해서만 진행 막대를 사용하십시오. 그렇지 않으면 activity indicator를 사용하십시오.

#### - 잘 정의 된 기간이있는 작업에는 Progress Bars을 사용하십시오

Progress Bars은 작업의 상태를 표시하는 데 유용합니다. 특히 작업이 완료하는 데 필요한 시간을 얼마나 오래 전달할 수 있는지 파악하는 데 도움이됩니다.

#### - Navigation bars 및 toolbars에서 트랙의 채워지지 않은 부분을 숨깁니다

기본적으로 Progress Bars의 트랙에는 채워진 부분과 채워지지 않은 부분이 모두 포함됩니다. Navigation bar 또는 toolbars 페이지로드를 나타내는 것과 같이 사용하면 트랙의 채워지지 않은 부분을 숨기도록 Progress Bars를 구성해야합니다.

#### - Progress Bars의 모양을 사용자의 응용 프로그램과 일치하도록 사용자 정의하는 것을 고려하십시오

Progress Bars의 모양은 앱의 디자인과 일치하도록 조정할 수 있습니다. 예를 들어 트랙 및 채우기 모두에 사용자 지정 색조 또는 이미지를 지정할 수 있습니다.

개발자 안내는 [UIProgressView](https://developer.apple.com/documentation/uikit/uiprogressview)를 참조하십시오.

#### - Network Activity Indicators

iPhone X를 제외한 모든 장치에서 네트워킹이 진행됨에 따라 화면 상단의 상태 표시 줄에 네트워크 작동 표시기가 나타납니다. 네트워킹이 완료되면 사라집니다. 이 표시기는 활동 표시기와 모양이 같으며 비 대화식입니다.

<center><img src="/img/posts/Progrss_Indicator-2.png" width="500"></center> <br> 

#### - 몇 초 이상 지속되는 네트워크 작동에 대해서만이 표시기를 표시하십시오

빠른 네트워크 작업을위한 표시기를 표시하지 마십시오. 누군가가 자신의 존재를 알아 차리기 전에 사라지기 쉽기 때문입니다.

[Status Bars](https://developer.apple.com/ios/human-interface-guidelines/bars/status-bars/)을 참조하십시오 . 개발자 가이드 는 [UIApplication](https://developer.apple.com/documentation/uikit/uiapplication) 의 [networkActivityIndicatorVisible](https://developer.apple.com/documentation/uikit/uiapplication/1623102-networkactivityindicatorvisible) 메서드를 참조하십시오.

---

## Refresh Content Controls 

새로 고침 컨트롤이 수동으로 시작되어 다음 자동 콘텐츠 업데이트가 발생할 때까지 기다리지 않고 일반적으로 테이블뷰에서 콘텐츠를 즉시 다시로드합니다. 새로 고침 컨트롤은 특수한 유형의 activity indicator로, 기본적으로 숨겨져 있으며 다시로드할 뷰에서 아래로 당길때 표시됩니다. 예를 들어 Mail에서받은 편지함 목록을 끌어서 새 메시지를 확인할 수 있습니다.

<center><img src="/img/posts/Refresh_Control.png" width="500"></center> <br> 

#### - 자동 컨텐츠 업데이트를 수행하십시오

사람들은 즉각적인 콘텐츠 새로 고침을 실행할 수 있다는 점을 높이 평가하지만 정기적으로 자동 새로 고침이 이루어지기를 기대합니다. 사용자가 모든 업데이트를 시작할 책임을 갖도록하지 마십시오. 데이터를 정기적으로 업데이트하여 최신 상태로 유지하십시오.

#### - 가치를 부여하는 경우에만 짧은 제목을 제공하십시오

필요에 따라 새로 고침 컨트롤에 제목을 포함 할 수 있습니다. 대부분의 경우 컨트롤의 애니메이션으로 내용이 로드중임을 나타내므로 이 작업은 불필요합니다. 제목을 포함 시키면 새로 고침을 수행하는 방법을 설명하는데 제목을 사용하지 마십시오. 대신 새로 고침되는 콘텐츠에 대한 가치 정보를 제공하십시오. 예를 들어, Podcast의 새로 고침 제어 기능은 제목을 사용하여 마지막 Podcast 업데이트가 발생한시기를 알려줍니다.

개발자 지침은 [UIRefreshControl](https://developer.apple.com/documentation/uikit/uirefreshcontrol)을 참조하십시오.

---

## Segmented Controls 

분리화된 컨트롤은 두개 이상의 세그먼트로 구성된 선형 세트입니다. 각 세그먼트는 상호 배타적인 버튼으로 작동합니다. 컨트롤 내에서 모든 세그먼트의 너비는 동일합니다. 버튼과 마찬가지로 세그먼트에는 텍스트나 이미지가 포함될 수 있습니다. 분할 된 컨트롤은 종종 다른보기를 표시하는 데 사용됩니다. 예를 들어 지도에서 세그먼트 컨트롤을 사용하면지도, 대중 교통 및 위성보기간에 전환 할 수 있습니다.

<center><img src="/img/posts/Segemented_Control.png" width="385" height="700"></center> <br> 

#### - 유용성을 높이기 위해 세그먼트 개수를 제한하십시오

더 넓은 세그먼트는 탭하기가 더 쉽습니다. `iPhone에서 세그먼트 컨트롤에는 세그먼트가 다섯개 이하 여야합니다.`

#### - 세그먼트 콘텐츠 크기를 일관되게 유지하십시오

모든 세그먼트의 너비가 동일하기 때문에 콘텐츠가 일부 세그먼트를 채우지만 세그먼트 안에 다른 세그먼트를 채우는것은 좋지 않습니다.

#### - 분류 된 컨트롤에서 텍스트와 이미지를 혼합하지 마십시오

개별 세그먼트에 텍스트나 이미지가 포함될 수 있지만 단일 컨트롤에서 두 항목을 혼합하면 연결이 끊어 지거나 혼란스러운 인터페이스가 발생할 수 있습니다.

#### - 사용자 지정 세그먼트화된 컨트롤에 내용을 적절하게 배치하십시오

Segmented Control 배경 모양을 변경하는 경우 내용이 여전히보기에 좋고 정렬되지 않은 것처럼 보이는지는 않은지 확인하십시오.

개발자 안내는 [UISegmentedControl](https://developer.apple.com/documentation/uikit/uisegmentedcontrol)을 참조하십시오.

---

## Slider 

슬라이더는 엄지라고하는 컨트롤이있는 가로 트랙으로 손가락으로 슬라이드하여 미디어 재생 중에 화면 밝기 레벨이나 위치와 같이 최소값과 최대값 사이를 이동할 수 있습니다. 슬라이더의 값이 변경되면 최소 값과 썸 사이의 트랙 부분이 색상으로 채워집니다. 슬라이더는 선택적으로 최소 및 최대 값의 의미를 나타내는 왼쪽 및 오른쪽 아이콘을 표시 할 수 있습니다.

<center><img src="/img/posts/Slider.png" width="500"></center> <br> 

#### - 값을 추가하면 슬라이더의 모양을 사용자 정의하십시오

트랙 색상, 썸 이미지 및 좌우 아이콘을 포함한 슬라이더의 모양을 조정하여 앱의 디자인과 융합하고 의도를 전달할 수 있습니다. 예를 들어, 이미지 크기를 조정하는 슬라이더는 왼쪽에 작은 이미지 아이콘을 표시하고 오른쪽에 큰이미지 아이콘을 표시 할 수 있습니다.

#### - 슬라이더를 사용하여 오디오 볼륨을 조정하지 마십시오

앱에 볼륨 컨트롤을 제공해야하는 경우 사용자 정의 할 수 있는 볼륨뷰를 사용하고 볼륨 레벨 슬라이더와 활성 오디오 출력 장치를 변경하기위한 컨트롤이 포함됩니다. 볼륨보기 구현에 대한 자세한 내용은 [MPVolumeView](https://developer.apple.com/documentation/mediaplayer/mpvolumeview)를 참조하십시오 .

개발자 안내는 [UISlider](https://developer.apple.com/documentation/uikit/uislider)를 참조하십시오.

---



