---
layout:     post
title:      "iOS 휴먼 인터페이스 가이드라인 요약 (7)"
subtitle:   "Navigation Bars, Search Bars, Status Bars, Tab Bars, toolbars"
date:       2018-02-11 20:00:00
author:     "MinJun"
header-img: "img/tags/HIG-bg.jpg"
comments: true
tags: [HIG]
categories: archive
permalink: /archive/:title
---

개인적인 공부의 목적으로 작성 되었습니다. 오역이나 잘못된 부분이 있을수 있으니, 댓글 남겨 주시면 감사하겠습니다!

---

# Bars

- Navigation Bars 
- Search Bars
- Status Bars
- Tab Bars 
- Toolbars 

---

## Navigation Bars 

탐색 바는 상태 표시 줄 아래의 앱 화면 상단에 나타나며 일련의 계층 적 화면을 탐색 할 수 있습니다. 새 화면이 표시되면 이전 화면의 제목으로 레이블 된 뒤로 단추가 막대 왼쪽에 나타납니다. 때로 탐색 모음의 오른쪽에는 활성보기 내에서 내용을 관리하기위한 편집 또는 완료 버튼과 같은 컨트롤이 있습니다. 분할보기에서 분할보기의 단일 창에 탐색 막대가 나타날 수 있습니다. 탐색 막대는 반투명하고 배경 색조를 가질 수 있으며 키보드가 화면 상에 나타나거나 제스처가 발생하거나보기 크기가 조정될 때 숨기도록 구성 할 수 있습니다. <br>

<center><img src="/assets/post_img/posts/NavigationBars.png"></center> <br>  

#### - 전체 화면 콘텐츠를 표시 할 때 탐색 모음을 일시적으로 숨겨보십시오

콘텐츠에 집중할 때 탐색 막대가 산만해질 수 있습니다. 일시적으로 막대를 숨기면 보다 몰입 한 경험을 할 수 있습니다. 사진은 전체 화면 사진을 볼 때 탐색 모음 및 기타 인터페이스 요소를 숨깁니다. 이러한 유형의 동작을 구현하면 사용자가 탭과 같은 간단한 제스처로 탐색 모음을 복원 할 수 있습니다.

개발자 지침은 [UINavigationBar](https://developer.apple.com/documentation/uikit/uinavigationbar) 를 참조하십시오 .

> 팁
> 
> 탐색이 필요하지 않거나 컨텐트를 관리하기위한 여러 컨트롤을 원하면 도구 모음을 사용하십시오. [도구 모음](https://developer.apple.com/ios/human-interface-guidelines/bars/toolbars/)을 참조하십시오. 
> 

#### - Navigation Bar 제목 

#### - Navigation Bar 에 현재보기의 제목 표시를 고려하십시오

대부분의 경우, 제목은 사람들이 그들이 보고있는 것을 이해하도록 도와줍니다. 그러나 탐색 모음 제목이 중복되는 것처럼 보이면 제목을 비워 둘 수 있습니다. 예를 들어 첫 번째 줄의 내용이 필요한 모든 컨텍스트를 제공하기 때문에 Notes는 현재 쪽지의 제목을 지정하지 않습니다. <br>

| Standard title | Large title | 
| :--: | :--: |
|![screen](/assets/post_img/posts/NavigationBars-1.png) | ![screen](/assets/post_img/posts/NavigationBars-2.png)| <br>

#### - 문맥에 중점을 두어야 할 때 큰 제목을 사용하십시오

일부 앱에서는 큰 제목의 크고 대담한 텍스트를 사용하여 사람들이 검색하고 검색 할 때 동양을 도울 수 있습니다. 예를 들어 탭 레이아웃에서는 큰 제목을 사용하면 활성 탭을 명확히하고 사용자가 맨 위로 스크롤했을 때이를 알릴 수 있습니다. 전화는이 방법을 사용하는 반면 음악은 큰 제목을 사용하여 앨범, 아티스트, 재생 목록 및 라디오와 같은 콘텐츠 영역을 차별화합니다. 큰 제목은 사용자가 내용을 스크롤하기 시작할 때 표준 제목으로 이동합니다. 큰 제목은 모든 앱에서 의미가 없으며 결코 콘텐츠와 경쟁해서는 안됩니다. 시계 앱에는 탭 레이아웃이 있지만 각 탭마다 고유 한 인식 가능한 레이아웃이 있으므로 큰 제목은 필요하지 않습니다. 개발자 가이드는 다음을 참조하십시오  [prefersLargeTitles](https://developer.apple.com/documentation/uikit/uinavigationbar/2908999-preferslargetitles).

###  Navigation Bar Controls 

#### - 너무 많은 Controls 사용하여 Navigation Bar를 크롤링하지 마십시오

일반적으로 네비게이션 바에는 현재 제목, 뒤로 단추 및보기 내용을 관리하는 하나의 컨트롤 만 있으면 안됩니다. 네비게이션 바에서 세분화 된 컨트롤을 사용하는 경우 막대에는 세분화 된 컨트롤 이외의 제목이나 컨트롤이 없어야합니다.

#### - 표준 뒤로 버튼을 사용하십시오

사람들은 표준 뒤로 버튼을 통해 정보 계층 구조를 통해 단계를 되돌릴 수 있음을 알고 있습니다. 그러나 맞춤식 뒤로 버튼을 구현하는 경우 버튼이 뒤로 버튼처럼 보이고 직관적으로 동작하며 나머지 인터페이스와 일치하고 앱 전체에서 일관되게 구현 되어야합니다. 시스템 제공 백 버튼 셰브론을 사용자 정의 이미지로 교체하는 경우 사용자 정의 마스크 이미지도 제공하십시오. iOS는 전환하는 동안 이 마스크를 사용하여 버튼 제목을 애니메이션으로 만듭니다.

#### - 다중 세그먼트 이동 경로를 포함하지 마십시오

뒤로 버튼은 항상 단일 작업을 수행하여 이전 화면으로 돌아갑니다. 현재 화면으로 이동하지 않고 사람들이 길을 잃을 수도 있다고 생각한다면 앱의 계층 구조를 평평 하게하는 것이 좋습니다.

#### - 텍스트 제목이있는 버튼에 충분한 공간을 부여하십시오. 

네비게이션 바에 여러 개의 텍스트 단추가 포함되어 있으면 해당 단추의 텍스트가 함께 실행되어 단추를 구분할 수 없게 될 가능성이 있습니다. 버튼 사이에 고정 된 공간 항목을 삽입하여 분리를 추가하십시오. 개발자 지침의 경우, 참조 [UIBarButtonSystemItemFixedSpace](https://developer.apple.com/documentation/uikit/uibarbuttonsystemitem/uibarbuttonsystemitemfixedspace) 에서 상수 값 [UIBarButtonItem](https://developer.apple.com/documentation/uikit/uibarbuttonitem)을 참조해주세요.

#### - 네비게이션 바에서 세분화 된 컨트롤을 사용하여 앱의 정보 계층을 평평하게 만드는 것을 고려해보십시오. 

네비게이션 막대에서 세분화 된 컨트롤을 사용하는 경우 계층 구조의 최상위 수준에서만 세그먼트 컨트롤을 사용하고 하위 수준에서는 정확한 뒤로 단추 제목을 선택해야합니다. 추가 지침은 [Segmented Controls](https://developer.apple.com/ios/human-interface-guidelines/controls/segmented-controls/)을 참조하십시오.


<center><img src="/assets/post_img/posts/NavigationBars-3.png"></center> <br> 

---

## Search Bars 

검색 창을 사용하면 필드에 텍스트를 입력하여 값 모음을 검색 할 수 있습니다. 검색 창은 단독으로 또는 네비게이션 바 또는 컨텐츠 뷰에서 표시 할 수 있습니다. 네비게이션 바에 표시되면 검색창을 항상 액세스 할 수 있도록 탐색 막대에 고정 할 수 있습니다. 또는 사용자가 아래로 쓸어 넘겨 표시 할 때까지 축소 할 수 있습니다. <br>

<center><img src="/assets/post_img/posts/SearchBar.png"></center> <br> 

#### - 텍스트 필드 대신 검색 창을 사용하여 검색을 구현하십시오

텍스트 필드에는 사람들이 기대하는 표준 검색 창 모양이 없습니다.

#### - 지우기 단추를 사용하십시오

대부분의 검색 막대에는 필드의 내용을 지우는 지우기 단추가 있습니다.

#### - 적절한 경우 취소 버튼을 활성화하십시오

대부분의 전용 검색 막대에는 검색을 즉시 종료하는 취소 버튼이 있습니다.

| Clear button | Cancel button | 
| :--: | :--: |
|![screen](/assets/post_img/posts/SearchBar-1.png) | ![screen](/assets/post_img/posts/SearchBar-2.png)| <br>

#### - 필요한 경우 검색 창에 힌트와 컨텍스트(플레이스 홀더)를 제공하십시오

검색 창에는 "검색 의류, 신발 및 액세서리" 또는 단순히 "검색"과 같은 자리 표시 자 텍스트가 포함될 수 있습니다. 적절한 구두점이 있는 간결하고 한 줄짜리 프롬프트는 검색 창 바로 위에 나타나서 지침을 제공 할 수도 있습니다. 주식은 프롬프트를 사용하여 회사 이름이나 주식 기호를 입력 할 수 있음을 사람들에게 알립니다.

```swift
아래 코드는 문서와 무관합니다!

import UIKit
import Foundation

class ViewController: UIViewController {
    var searchBarControl: UISearchController = UISearchController(searchResultsController: nil)
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationItem.searchController = searchBarControl
        self.searchBarControl.searchResultsUpdater = self
        self.searchBarControl.definesPresentationContext = true
        self.searchBarControl.obscuresBackgroundDuringPresentation = false
        self.searchBarControl.searchBar.textField.clearButtonMode = .always
    }
}

extension ViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        let searchBar = searchController.searchBar
        print(searchBar.text)
    }
}

extension UISearchBar{
    var textField : UITextField{
        return self.value(forKey: "_searchField") as! UITextField
    }
}
```

| Placeholder text | Introductory text | 
| :--: | :--: |
|![screen](/assets/post_img/posts/SearchBar-3.png) | ![screen](/assets/post_img/posts/SearchBar-4.png)| <br>

#### - 검색 창 아래에 유용한 바로 가기 및 기타 콘텐츠를 제공하는 것이 좋습니다

검색 창 아래의 영역을 사용하면 사람들이 콘텐츠를 더 빨리 얻을 수 있습니다. 예를 들어 사파리는 검색 필드를 탭하면 바로 북마크를 보여줍니다. 검색어를 입력하지 않고 바로 이동하려면 하나를 선택하십시오. 주식은 검색 필드에 입력 할 때 결과 목록을 표시합니다. 더 이상 문자를 입력하지 않고 언제든지 하나를 살짝 누르십시오.

개발자 가이드는 [UISearchController](https://developer.apple.com/documentation/uikit/uisearchcontroller) 및 [UISearchBar](https://developer.apple.com/documentation/uikit/uisearchbar)를 참조하십시오.

#### - 스코프 바 

사람들이 검색 범위를 좁힐 수 있도록 검색 막대에 범위 막대를 추가 할 수 있습니다.

<center><img src="/assets/post_img/posts/SearchBar-5.png"></center> <br> 

#### - 스코프 바를 포함하여 검색 결과를 개선하는 것이 좋습니다

범위 막대는 검색 할 범주가 명확하게 정의되어있을 때 유용 할 수 있습니다. 그러나 검색 결과를 개선하여 범위 지정이 필요하지 않도록하는 것이 가장 좋습니다.

개발자 안내는 [UISearchBar](https://developer.apple.com/documentation/uikit/uisearchbar) 를 참조하십시오

---

### Status Bar 

상태 표시 줄은 화면의 상단 가장자리에 표시되며 시간, 이동 통신사, 네트워크 상태 및 배터리 수준과 같은 장치의 현재 상태에 대한 유용한 정보를 표시합니다. 상태 표시 줄에 표시된 실제 정보는 장치 및 시스템 구성에 따라 다릅니다.

#### - 시스템 제공 상태 표시 줄을 사용하십시오

사람들은 상태 표시 줄이 시스템 전체에서 일관 될 것으로 기대합니다. 사용자 지정 상태 표시 줄로 바꾸지 마십시오.

| Light status bar | Light status bar | 
| :--: | :--: |
|![screen](/assets/post_img/posts/Statusbar.png) | ![screen](/assets/post_img/posts/Statusbar-1.png)| 
| Dark status bar | Dark status bar |
|![screen](/assets/post_img/posts/Statusbar-2.png) | ![screen](/assets/post_img/posts/Statusbar-3.png)| 

#### - 상태 표시 줄 스타일을 앱 디자인과 조정하십시오

상태 표시 줄의 텍스트 및 표시기의 비주얼 스타일은 밝거나 어둡습니다. 앱에 대해 전체적으로 또는 다른 화면에 개별적으로 설정할 수 있습니다. 어두운 상태 막대는 밝은 색의 콘텐츠 위에 잘 작동하며 밝은 상태 막대는 어두운 색의 콘텐츠 위에 잘 작동합니다.

#### - 상태 표시 줄 아래의 내용을 흐리게 표시합니다

기본적으로 상태 표시 줄의 배경은 투명하므로 아래에 있는 내용을 표시 할 수 있습니다. 상태 표시 줄을 읽을 수 있게 유지하고 그 뒤에 있는 콘텐츠가 대화 형임을 의미하지는 않습니다. 이렇게하기위한 몇 가지 일반적인 기술이 있습니다 

- 앱의 탐색 바를 사용하면 자동으로 상태 표시 줄 배경이 표시되며 상태 표시 줄 아래에 콘텐츠가 표시되지 않습니다.
- 상태 표시 줄 뒤에 그라디언트 또는 단색과 같은 사용자 정의 이미지를 표시하십시오.
- 상태 표시 줄 뒤에 흐린보기를 배치하십시오. 개발자 안내는 [UIBlurEffect](https://developer.apple.com/documentation/uikit/uiblureffect)를 참조하십시오.

#### - 전체 화면 미디어를 표시 할 때 상태 표시 줄을 일시적으로 숨기십시오

사용자가 미디어에 집중하려고 할 때 상태 표시 줄이 산만해질 수 있습니다. 이러한 요소를 일시적으로 숨겨보다 몰입 한 경험을 제공합니다. 예를 들어, 사진 앱은 사용자가 전체 화면 사진을 탐색 할 때 상태 표시 줄 및 기타 인터페이스 요소를 숨깁니다. <br>

| * | * | 
| :--: | :--: |
|![screen](/assets/post_img/posts/Statusbar-4.png) | ![screen](/assets/post_img/posts/Statusbar-5.png)| <br>

#### - 상태 표시 줄을 영구적으로 숨기지 마십시오

상태 표시 줄이 없으면 앱을 닫아 시간을 확인하거나 Wi-Fi에 연결되어 있는지 확인할수 없습니다. 간단하고 발견 가능한 제스처를 사용하여 사람들이 숨겨진 상태 표시 줄을 다시 표시하도록합니다. 사진 앱에서 전체 화면 사진을 탐색 할 때 한번 탭 하면 상태 표시 줄이 다시 표시됩니다.

#### - 상태 표시 줄을 사용하여 네트워크 활동을 나타냅니다

앱이 네트워크를 사용하는 경우(특히 오랜 기간 동안 작동하는 경우) 네트워크 활동 상태 표시 줄을 표시하여 사람들이 활동하고 있음을 알 수 있습니다. [네트워크 활동 표시기를](https://developer.apple.com/ios/human-interface-guidelines/controls/progress-indicators/#network-activity-indicators) 참조하십시오.

개발자 가이드 는 [UIApplication](https://developer.apple.com/documentation/uikit/uiapplication) 의 [UIStatusBarStyle](https://developer.apple.com/documentation/uikit/uistatusbarstyle) 상수 와 [UIViewController](https://developer.apple.com/documentation/uikit/uiviewcontroller) 의 [preferredStatusBarStyle](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621416-preferredstatusbarstyle) 속성을 참조하십시오.

---

## Tab Bars

앱 표시 줄 하단에 탭 표시 줄이 표시되어 앱의 여러 섹션을 신속하게 전환 할 수 있습니다. 탭 바는 반투명하고 배경 색조를 가질 수 있으며 모든 화면 방향에서 동일한 높이를 유지하고 키보드가 표시되면 숨겨집니다. 탭 표시 줄에는 여러 개의 탭이 포함될 수 있지만 표시되는 탭의개수는 장치 크기 및 방향에 따라 다릅니다. 제한된 가로 공간으로 인해 일부 탭을 표시 할 수 없는 경우 마지막으로 표시되는 탭이 다른 탭의 목록에있는 추가 탭을 표시하는 추가탭이 됩니다.

<center><img src="/assets/post_img/posts/Tab_Bars.png"></center> <br> 

#### - 일반적으로 앱 수준에서 정보를 구성하려면 탭 표시 줄을 사용하십시오

탭 막대는 정보 계층 구조를 평평하게 만들고 여러 피어 정보 범주 또는 모드에 대한 액세스를 한 번에 제공하는 좋은 방법입니다.

#### - 탭 바를 사용하여 탐색하십시오

작업을 수행하는데 탭 바 버튼을 사용하면 안됩니다. 의 요소에 적용되는 컨트롤을 제공해야하는 경우 대신 툴바를 사용하십시오. [toolbar](https://developer.apple.com/ios/human-interface-guidelines/bars/toolbars/)을 참조하십시오 .

#### - 탭이 너무 많지 않도록하십시오

탭을 추가 할 때마다 탭을 선택할 때 사용할 수있는 영역이 줄어들고 앱의 복잡성이 커져 정보를 찾기가 어려워집니다. 추가 탭은 추가 탭을 표시 할 수 있지만 추가 탭이 필요하고 공간을 잘 활용하지 못합니다. 필수 탭만 포함하고 정보 계층 구조에 필요한 최소 탭을 사용하십시오. 인터페이스가 단절된 것처럼 보이게 할 수있는 탭이 너무 적 으면 문제가 될 수 있습니다. 일반적으로 iPhone에서 3~5 개의 탭을 사용하십시오. 몇 가지 더 추가하는 것은 iPad에서 허용됩니다.

#### - 기능을 사용할 수없는 경우 탭을 제거하거나 비활성화하지 마십시오

일부 경우에는 탭을 사용할 수 있지만 다른 탭에서는 사용할 수없는 경우 앱의 인터페이스가 불안정하고 예측할 수 없게됩니다. 모든 탭이 항상 사용 가능한지 확인하고 탭의 컨텐츠를 사용할 수없는 이유를 설명하십시오. 예를 들어 iOS 기기에 노래가없는 경우 음악 앱의 내 음악 탭에 노래 다운로드 방법이 설명되어 있습니다.

#### - 항상 소속된 뷰에서 컨텍스트를 전환하십시오

인터페이스를 예측 가능한 상태로 유지하려면 탭을 선택하면 화면의 다른 위치가 아닌 탭 막대에 직접 연결된뷰에 항상 영향을 주어야합니다. 예를 들어 분할뷰의 왼쪽에서 탭을 선택해도 분할뷰의 오른쪽이 갑자기 변경되지 않아야합니다. 팝 오버에서 탭을 선택해도 팝업 뒤의뷰가 변경되지 않아야합니다.

#### - 탭 표시 줄 아이콘이 시각적으로 일관성 있고 균형 있는지 확인하십시오

이 시스템은 일반적인 사용 사례를 위해 사전 정의 된 아이콘 범위를 제공합니다. [시스템 아이콘> 탭 막대 아이콘](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/system-icons/#tab-bar-icons)을 참조하십시오 . 나만의 아이콘을 만들 수도 있습니다. [사용자 정의 아이콘](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/custom-icons/)을 참조하십시오 .

#### - 눈에 띄지 않게 통신하려면 배지를 사용하십시오

새 정보가 해당보기 또는 모드와 연관되어 있음을 나타 내기 위해 탭에 배지 (흰색 텍스트와 숫자 또는 느낌표가 포함 된 빨간색 타원)를 표시 할 수 있습니다.

개발자 지침은 [UITabBar](https://developer.apple.com/documentation/uikit/uitabbar)를 참조하십시오.

> 팁
> 
> `tab bar`와 `toolbar`의 차이점을 이해하는 것이 중요합니다. 두 유형의 막대가 모두 앱 화면 하단에 표시되기 때문입니다. 탭 표시 줄을 사용하면 시계 앱의 알람, 스톱워치 및 타이머 탭과 같은 앱의 여러 섹션간에 신속하게 전환 할 수 있습니다. toolbar에는 항목 작성, 항목 삭제, 주석 추가 또는 사진 찍기와 같은 현재 컨텍스트와 관련된 작업을 수행하기위한 단추가 있습니다. [ToolBars](https://developer.apple.com/ios/human-interface-guidelines/bars/toolbars/) 을 참조하십시오 . 탭 막대와 도구 모음은 같은보기에 함께 나타나지 않습니다. 

---

## Toolbars 

툴바는 앱 화면 하단에 표시되며 `현재뷰` 또는 `해당 내용과 관련된 작업`을 수행하기위한 버튼을 포함합니다. 툴바는 반투명하고 배경 색조가 있으며 사람들이 필요하지 않을 때 숨기기도합니다. 예를 들어, Safari에서 독서 가능성이 높기 때문에 페이지를 스크롤 할 때 툴바가 숨겨집니다. 화면 하단을 살짝 눌러 다시 표시 할 수 있습니다. `툴바는 키보드가 화면 상에있을 때 숨겨집니다.`

<center><img src="/assets/post_img/posts/toolbars.png"></center> <br> 

#### - 관련 툴바 버튼을 제공하십시오

툴바에는 현재 컨텍스트에서 의미가있는 자주 사용되는 명령을 포함해야합니다.

#### - 앱에 아이콘 또는 텍스트 버튼이 적합한 지 고려하십시오

아이콘은 세 개 이상의 툴바 버튼이 필요할 때 잘 작동합니다. 버튼이 세 개 이하이면 텍스트가 더 선명해질 수 있습니다. 예를 들어 캘린더에서는 아이콘이 혼란 스럽기 때문에 텍스트가 사용됩니다. 텍스트를 사용하면받은 편지함 버튼으로 캘린더 및 일정 초대장을 볼 수 있습니다.

#### - 툴바에서 세분화된 컨트롤을 사용하지 마십시오

세분화된 컨트롤을 사용하면 컨텍스트를 전환 할 수 있지만 도구 모음은 현재 화면에만 적용됩니다. 컨텍스트를 전환하는 방법을 제공해야하는 경우 대신 탭 모음을 사용하는 것이 좋습니다. [Tab Bars](https://developer.apple.com/ios/human-interface-guidelines/bars/tab-bars/)를 참조하십시오 .

#### - 텍스트 제목이있는 버튼에 충분한 공간을 부여하십시오

툴바에 여러 개의 단추가 포함 된 경우 해당 단추의 텍스트가 함께 실행되어 단추를 구분할 수 없게 될 수 있습니다. 버튼 사이에 고정 된 공간을 삽입하여 분리를 추가하십시오. 개발자 지침의 경우, 참조 [UIBarButtonSystemItemFixedSpace](https://developer.apple.com/documentation/uikit/uibarbuttonsystemitem/uibarbuttonsystemitemfixedspace) 에서 상수 값 [UIBarButtonItem](https://developer.apple.com/documentation/uikit/uibarbuttonitem)을.

개발자 지침은 [UIToolbar](https://developer.apple.com/documentation/uikit/uitoolbar)를 참조하십시오.

> 팁
> 
>  `tab bar`와 `toolbar`의 차이점을 이해하는 것이 중요합니다. 두 유형의 막대가 모두 앱 화면 하단에 표시되기 때문입니다. 탭 표시 줄을 사용하면 시계 앱의 알람, 스톱워치 및 타이머 탭과 같은 앱의 여러 섹션간에 신속하게 전환 할 수 있습니다. toolbar에는 항목 작성, 항목 삭제, 주석 추가 또는 사진 찍기와 같은 현재 컨텍스트와 관련된 작업을 수행하기위한 단추가 있습니다. [ToolBars](https://developer.apple.com/ios/human-interface-guidelines/bars/toolbars/) 을 참조하십시오. 탭 막대와 도구 모음은 같은보기에 함께 나타나지 않습니다. 

---
