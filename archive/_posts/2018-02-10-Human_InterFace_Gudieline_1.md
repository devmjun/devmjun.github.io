---
layout:     post
title:      "iOS 휴먼 인터페이스 가이드라인 요약 (1)"
subtitle:   "Overview, Themes, iPhoneX, iOS 11의 새로운 사항, 인터페이스 필수 사항"
date:       2018-02-10 19:45:00
author:     "MinJun"
header-img: "img/tags/HIG-bg.jpg"
comments: true
tags: [HIG]
categories: archive
permalink: /archive/:title
---

개인적인 공부의 목적으로 작성 되었습니다. 오역이나 잘못된 부분이 있을수 있으니, 댓글 남겨 주시면 감사하겠습니다!

---

# Overview <br>

- Themes
- iPhone X 
- Whay`s New in iOS 11
- Interface Essentials

---

<center><img src="/assets/post_img/posts/Overview1.jpg"></center>

## Themes

세 가지 iOS 테마는 다른 플렛폼과 차별함을 차별화합니다

#### - Clarity(명확함)

시스템 전체에서 텍스트는 모든 크기에서 읽을 수 있으며 아이콘은 정확하고 명료하며 장식은 미묘하고 적절하며 기능에 대한 예리한 초점은 디자인에 동기를 부여합니다. 부정적인 공간, 색상, 글꼴, 그래픽 및 인터페이스 요소는 중요한 내용을 미묘하게 강조 표시하고 상호 작용을 전달합니다 <br>

#### - Deference(존중)

유동적 인 모션과 선명하고 아름다운 인터페이스는 사람들이 결코 경쟁하지 않고 콘텐츠를 이해하고 상호 작용하도록 도와줍니다. 일반적으로 콘텐츠는 전체 화면을 채우지 만 반투명과 흐림은 종종 더 많은 것을 암시합니다. 베젤, 그래디언트 및 그림자의 사용을 최소화하여 인터페이스를 밝게 유지하면서 컨텐츠를 최우선으로 유지합니다. <br>

#### - Depth(깊이)

뚜렷한 시각적 레이어와 사실적인 모션은 계층을 전달하고 활력을 부여하며 이해를 돕습니다. 터치 및 검색 기능은 즐거움을 높이고 컨텍스트를 잃지 않고 기능 및 추가 컨텐츠에 대한 액세스를 가능하게합니다. 전환은 콘텐츠를 탐색 할 때 깊이 감을 제공합니다. <br>

#### - 디자인 원칙 

영향력과 도발 범위를 극대화하고, 앱의 정체성을 생각할때 다음 우너칙을 염두에 둬야 합니다. 

- Aesthetic Integrity(심미적 무결성): 심미적 인 무결성은 앱의 모양과 동작이 기능과 얼마나 잘 통합되어 있는지 나타냅니다. 예를 들어, 사람들이 심각한 작업을 수행하는 데 도움이되는 앱은 미묘하고 눈에 거슬리지 않는 그래픽, 표준 컨트롤 및 예측 가능한 동작을 사용하여 집중력을 유지할 수 있습니다. 반면에 게임과 같은 몰입 형 앱은 재미와 흥분을 약속하는 매력적인 모습을 제공 할 수 있으며 동시에 발견을 장려합니다.

- Consistency(일관성): 일관된 응용 프로그램은 시스템 제공 인터페이스 요소, 잘 알려진 아이콘, 표준 텍스트 스타일 및 통일 된 용어를 사용하여 익숙한 표준 및 패러다임을 구현합니다. 이 앱은 사람들이 기대하는 방식으로 기능과 동작을 통합합니다

- Direct Manipulation(직접 조작): 화면상의 컨텐츠를 직접 조작하는 것은 사람들을 끌어 들이고 이해를 돕습니다. 사용자는 장치를 회전하거나 제스처를 사용하여 화면 콘텐츠에 영향을 줄 때 직접 조작을 경험합니다. 직접 조작을 통해 즉각적이고 가시적 인 행동 결과를 볼 수 있습니다.

- Feedback(피드백): 피드백은 행동을 인정하고 결과를 보여 주어 사람들에게 정보를 제공합니다. 내장 된 iOS 앱은 모든 사용자 행동에 대한 응답으로인지 가능한 피드백을 제공합니다. 대화 형 요소는 도청 될 때 잠시 강조 표시되고 진행 표시기는 장기 실행 작업의 상태를 전달하며 애니메이션 및 사운드는 작업 결과를 명확하게 표시합니다.

- Metaphors(은유): 앱의 가상 객체와 액션이 실제 환경이나 디지털 환경에 뿌리 내린 친숙한 경험에 대한 은유 인 경우 사람들은 더 빨리 학습합니다. 메타포는 사람들이 물리적으로 화면과 상호 작용하기 때문에 iOS에서 잘 작동합니다. 그들은 아래에있는 콘텐츠를 노출하는 관점을 벗어납니다. 콘텐츠를 드래그 앤 스 와이프합니다. 스위치를 토글하고 슬라이더를 이동하며 피커 값을 스크롤합니다. 그들은 심지어 책과 잡지의 페이지를 훑어 봅니다.

- User Control(사용자 컨트롤): iOS에서 앱이 아닌 사람이 제어 할 수 있습니다. 앱은 행동 경로를 제안하거나 위험한 결과에 대해 경고 할 수 있지만 일반적으로 앱이 의사 결정을 맡는 것은 실수입니다. 가장 좋은 앱은 사용자를 활성화하고 원하지 않는 결과를 피하는 사이에 올바른 균형을 찾습니다. 앱은 대화 형 요소를 친숙하고 예측 가능하게 유지하고 파괴적인 행동을 확인하며 작업이 이미 진행 중이더라도 조작을 취소하기 쉽게함으로써 사람들이 통제 상태에있는 것처럼 느낄 수있게합니다.

---

## iPhone X 

iPhone X는 과거 어느 때보다 풍부하고 풍부한 컨텐츠를 제공하는 대형, 고해상도, 둥근 모서리의 슈퍼레티나 디스플레이를 포함합니다

<center><img src="/assets/post_img/posts/iPhone_X.png" width="700"></center> <br> 

#### - 화면크기

세로 방향에서 iPhone X의 디스플레이 너비는 iPhone 6, iPhone 7 및 iPhone 8의 4.7 인치 디스플레이의 너비와 일치합니다. 그러나 iPhone X의 디스플레이는 4.7 인치 디스플레이보다 145pt 더크므로 콘텐츠를위한 약 20%의 추가 수직 공간을 가지고 있습니다.

| 4.7 Display | iPhoneX | 
| :--: | :--: |
|![screen](/assets/post_img/posts/iPhone_X-1.jpg) |![screen](/assets/post_img/posts/iPhone_X-2.jpg) | <br>
| 세로 치수 | 가로 치수 |
|1125px x 2436px(375pt x 812pt @3x) |2436px x 1125px(812pt x 375pt @3x) |

#### - 앱의 모든 아트웍에 고해상도 이미지를 제공하십시오

iPhone X는 배율이 3배인 고해상도 수퍼망막디스플레이를 가지고 있습니다. 글리프 및 기타 평면 벡터 아트 워크의 경우 해상도 독립적 인 PDF를 제공하는 것이 가장 좋습니다. 래스터화된 아트웍의 경우 @3x 및 @2x 버전의 아트웍을 모두 제공하십시오. [Image Size and Resoultion](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/image-size-and-resolution/) 및 [Custom Icons](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/custom-icons/) 참조하십시오.

#### - 배치 

iPhone X를 디자인 할 때 레이아웃이 화면을 채우고 장치의 둥근 모서리, 센서 하우징 또는 홈 화면에 액세스하기위한 표시기로 가려지지 않도록해야합니다. <br>

| * | * | 
| :--: | :--: |
|![screen](/assets/post_img/posts/iPhone_X-3.png) |![screen](/assets/post_img/posts/iPhone_X-4.png) | <br>

Navigation Bar, Tables 및 collections 같이 시스템에서 제공하는 표준 UI 요소를 사용하는 대부분의 응용 프로그램은 장치의 새로운모양에 자동으로 적응합니다. 배경 자료는 디스플레이의 가장자리까지 확장되며 UI 요소는 적절하게 삽입되고 배치됩니다. <br>

| 4.7 iPhone | iPhoneX | 
| :--: | :--: |
|![screen](/assets/post_img/posts/iPhone_X-5.png) |![screen](/assets/post_img/posts/iPhone_X-6.png) | <br>

맞춤 레이아웃이있는 앱의 경우, 특히 앱이 자동 레이아웃을 사용하고 안전 영역 및 여백 레이아웃 가이드를 준수하는 경우 iPhone X를 지원하는 것이 상대적으로 쉽습니다.

#### - iPhone X에서 앱 미리보기 Simulator (Xcode에 포함)를 사용하여 앱을 미리보고 클리핑 및 기타 레이아웃 문제를 확인할 수 있습니다

앱이 가로 모드를 지원하는 경우 기기가 왼쪽 또는 오른쪽으로 회전했는지 여부에 관계없이 레이아웃이 좋아 보이는지 확인하세요. 거꾸로 세로 모드는 iPhone X에서 지원되지 않습니다. 와이드 컬러 이미지와 같은 일부 기능은 실제 장치에서 미리보기가 가장 좋습니다.

#### - 전체 화면 경험을 제공하십시오

배경이 디스플레이의 가장자리까지 뻗어 있고 테이블과 컬렉션과 같은 세로로 스크롤 가능한 레이아웃이 맨 아래까지 계속 이어져 있는지 확인하십시오.

#### - 클리핑 (clipping)을 방지하기 위해 필요한 내용을 삽입합니다

일반적으로 콘텐츠는 중앙에 배치되고 대칭 적으로 삽입되어야 모든 방향에서 좋아 보이며 모서리 나 장치의 센서 하우징에서 잘리지 않거나 홈 화면에 액세스하기위한 표시기로 가려져 있지 않아야합니다. 최상의 결과를 얻으려면 표준의 시스템 제공 인터페이스 요소와 자동 레이아웃을 사용하여 인터페이스를 구성하십시오. 앱은 UIKit에 정의된 안전영역 및 레이아웃 여백을 준수해야 장치 및 컨텍스트를 기반으로 적절한 삽입을 보장합니다. 안전 영역은 내용이 Status Bar, Navigation Bar, ToolBar 및 tab bar에 밑줄을 긋지 못하게합니다.

| 세로 | 가로 | 
| :--: | :--: |
|![screen](/assets/post_img/posts/iPhone_X-7.png) |![screen](/assets/post_img/posts/iPhone_X-8.png) | <br>

장치가 가로 방향인 경우 일부 게임(예 : 게임)의 경우 화면 하단 (안전 영역 아래까지 확장 가능)에 내용을 저장할 수있는 적절한 컨트롤을 배치하는 것이 적절할수있습니다. 화면 상단과 하단에 컨트롤을 배치할때 일치하는 인셋을 사용하고 홈 표시기 주위에 충분한 공간을 남겨 두어 사람들이 실수로 컨트롤과 상호 작용하려고 시도하지 않도록합니다. <br>

<center><img src="/assets/post_img/posts/iPhone_X-9.png" width="600"></center> <br> 

#### - Status Bar 높이에 주의하십시오

Status Bar는 iPhone X에서 다른 iPhone보다 높습니다. 앱이 Status Bar 아래에 콘텐츠 위치 지정을위한 고정된 Status Bar 높이를 가정하면 사용자의 기기를 기반으로 콘텐츠를 동적으로 배치하도록 앱을 업데이트해야합니다. 음성 녹음 및 위치 추적과 같은 백그라운드 작업이 활성화되어 있으면 iPhone X의 Status Bar에서 높이가 변경되지 않습니다.

#### - 앱이 현재 Status Bar을 숨기면 iPhone X에 대한 결정을 재고하십시오

iPhone 의 표시 높이는 4.7 "iPhone보다 더 많은 수직 공간을 제공하며 Status Bar는 앱의 화면 영역을 차지합니다. Status Bar에는 사람들이 유용하다고 생각하는 정보도 표시됩니다. 이 정보는 부가 가치에 대한 대가로만 숨겨져 있어야합니다. <br>

| Full-screen 4.7" device image | Cropping on iPhone X | Letterboxing on iPhoneX | 
| :--: | :--: | :--: |
|![screen](/assets/post_img/posts/iPhone_X-10.png) | ![screen](/assets/post_img/posts/iPhone_X-11.png)| ![screen](/assets/post_img/posts/iPhone_X-12.png) | 
| full-screen iPhone X image | cropping opn a 4.7" device | pillarboxing on a 4.7" device| 
|![screen](/assets/post_img/posts/iPhone_X-13.png) | ![screen](/assets/post_img/posts/iPhone_X-14.png)| ![screen](/assets/post_img/posts/iPhone_X-15.png) | <br>

#### - 기존 아트웍을 재사용할때 종횡비 차이에 유의하십시오

iPhone X는 4.7 "iPhone과는 다른 종횡비를 가지므로 아이폰 X에서 전체 화면으로 표시하면 전체 화면 4.7" iPhone 아트 워크가 잘 리거나 레터 박스로 나타납니다. 마찬가지로 전체 화면 iPhoneX 아트웍은 표시될때 잘리거나 기둥이 나타납니다 4.7 "iPhone에서 전체 화면으로 표시 중요한 디스플레이 내용이 두 디스플레이 크기에서 모두 보이는지 확인하십시오.

#### - 화면 맨아래와 모퉁이에 인터렉션 컨트롤을 명시적으로 배치하지 마십시오

사람들은 디스플레이의 하단 가장자리에서 스와이프 제스처를 사용하여 홈화면 및 앱 전환기에 액세스하며 이러한 동작은이 영역에서 구현한 맞춤제스처를 취소 할 수 있습니다. 화면의 구석이 사람들이 편안하게 접근하기 어려운 곳일 수 있습니다.

#### - 전체 길이 단추 삽입

화면의 가장자리까지 확장된 단추는 단추처럼 보이지 않을 수 있습니다. 전체 너비 버튼의 측면에서 표준 UIKit 여백을 고려하십시오. 화면 하단에 나타나는 전체 너비 버튼은 모서리가 둥글고 안전 지대의 하단과 정렬될때 가장 잘 보이며 홈 표시기와 충돌하지 않도록합니다. <br>

| Good | Bad | 
| :--: | :--: |
|![screen](/assets/post_img/posts/iPhone_X-16.jpg) |![screen](/assets/post_img/posts/iPhone_X-17.jpg) | <br>

#### - 주요 디스플레이 기능에 가면이나 특별한주의를 기울이지 마십시오

화면의 상단과 하단에 검정색 막대를 배치하여 홈화면에 액세스하기 위해 장치의 둥근 모서리, 센서 하우징 또는 표시기를 숨기려고하지 마십시오. 괄호, 베젤, 모양 또는 지침 텍스트와 같은 시각적 장식을 사용하여이 영역에 특히주의를 환기시키지 마십시오.

#### - 홈화면에 액세스 할 수 있도록 표시기를 자동 숨기기를 허용합니다

자동 숨기기가 활성화되면 사용자가 몇 초 동안 화면을 터치하지 않으면 표시등이 점멸합니다. 사용자가 화면을 다시 터치하면 다시 나타납니다. 이 동작은 비디오 또는 사진 슬라이드 쇼를 재생하는 수동보기 환경에서만 활성화해야합니다.

[Adaptivity and Layout](https://developer.apple.com/ios/human-interface-guidelines/visual-design/adaptivity-and-layout/) 참조하십시오.

#### - Color 

<center><img src="/assets/post_img/posts/iPhone_X-18.png" width="382"></center> <br> 

iPhone X의 디스플레이는 P3 색상 공간을 지원하므로 sRGB보다 더 풍부하고 꽉찬 된 색상을 생성 할 수 있습니다.

#### - 넓은 색상을 사용하여 시각적 경험을 향상시킵니다

와이드 컬러를 사용하는 사진과 비디오는 훨씬 생생하며, 와이드 컬러를 사용하는 시각적 데이터와 상태 표시기가 더 큰 영향을줍니다. [Color Management](https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/#color-management)를 참조하십시오.

#### Video

시스템 제공 비디오 플레이어는 전체 화면(aspect fill)과 화면에 맞게 (aspect)의 두 가지뷰 모드를 제공합니다. 기본적으로 시스템은 비디오의 종횡비에 따라보기 모드를 선택하며 사용자는 재생 중에 모드를 전환 할 수 있습니다. 개발자 안내는 [AVPlayerViewController](https://developer.apple.com/documentation/avkit/avplayerviewcontroller)를 참조하십시오.

#### - Full-Screen (aspect-fill) 보기 모드

비디오가 디스플레이를 채우도록 확장됩니다. 일부 가장자리 자르기가 발생할 수 있습니다. 이것은 와이드 비디오(2:1 ~ 2.40:1)의 기본보기 모드입니다. 개발자 안내는 [resizeAspectFill](https://developer.apple.com/documentation/avfoundation/avlayervideogravity/1385607-resizeaspectfill)을 참조하십시오.

#### - Fit-to-Screen (aspect)보기 모드

전체 비디오가 화면에 표시됩니다. 레터 박스 또는 필러 박스가 발생합니다. 표준 비디오(4:3, 16:9 및 최대 2:1)및 초 광대역 비디오 (2.40:1 이상)의 기본보기 모드입니다. 개발자 안내는 [resizeAspect](https://developer.apple.com/documentation/avfoundation/avlayervideogravity/1387116-resizeaspect)를 참조하십시오. <br> 

| 4:3 Video in full-screen viewing mode| 4:3 Video in fit-to-screen viewing mode(default) | 
| :--: | :--: |
|![screen](/assets/post_img/posts/iPhone_X-19.png) |![screen](/assets/post_img/posts/iPhone_X-20.png) | 
| 16:9 Video in full-screen viewing mode| 16:9 Video in fit-to-screen viewing mode(default) | 
|![screen](/assets/post_img/posts/iPhone_X-21.png) |![screen](/assets/post_img/posts/iPhone_X-22.png) | 
| 2:1 Video in full-screen viewing mode| 2:1 Video in fit-to-screen viewing mode(default) | 
|![screen](/assets/post_img/posts/iPhone_X-23.png) |![screen](/assets/post_img/posts/iPhone_X-24.png) | 
| 21:9 Video in full-screen viewing mode| 21:9 Video in fit-to-screen viewing mode(default) | 
|![screen](/assets/post_img/posts/iPhone_X-25.png) |![screen](/assets/post_img/posts/iPhone_X-26.png) |  <br>


<center><img src="/assets/post_img/posts/iPhone_X-27.png" width="700"></center> <br> 

#### - 맞춤 비디오 플레이어가 예상대로 작동하는지 확인하십시오

목표는 iPhone X에서 비디오 내용을 재생할때 기본적으로 디스플레이를 채우는 것입니다. 그러나 화면을 채우는 것이 너무 많이 자르면 화면에 맞게 비디오의 크기가 조정됩니다. 또한 사용자가 개별 선호도에 따라 전체 화면과 화면에 맞게 전환 할 수 있도록해야합니다. 개발자 안내는 [AVPlayerLayer](https://developer.apple.com/documentation/avfoundation/avplayerlayer)를 참조하십시오 .

#### - 항상 원래의 종횡비로 비디오 내용을 표시하십시오

비디오 콘텐츠가 내장된 letterbox 또는 pillarbox 패딩을 사용하여 특정 종횡비를 준수하는 경우 iOS는 사용자가 선택한뷰 모드에 따라 비디오의 크기를 올바르게 조정할 수 없습니다. 비디오 프레임 내에 패딩을 포함 시키면 전체 화면 모드와 화면에 맞춤 모드에서 비디오가 더 작게 표시 될 수 있습니다. 또한 iPad의 PIP ([Picture in Picture mode](https://developer.apple.com/ios/human-interface-guidelines/system-capabilities/multitasking/)) 모드와 같이 가장자리에서 가장자리, 전체 화면이 아닌 컨텍스트에서 비디오가 올바르게 표시되지 않도록합니다.

| 4:3 Video full-screen viewing mode| 4:3 video with embedded padding, in full-screen viewing mode | 
| :--: | :--: |
|![screen](/assets/post_img/posts/iPhone_X-28.png) |![screen](/assets/post_img/posts/iPhone_X-29.png) | 
| 21:9 vidieo in fit-to-screen viewing mode| 21:9 video with embedded padding, in fit-to-screen viewing mode | 
|![screen](/assets/post_img/posts/iPhone_X-30.png) |![screen](/assets/post_img/posts/iPhone_X-31.png) |  <br>

<center><img src="/assets/post_img/posts/iPhone_X-32.png" width="700"></center> <br> 

### Gestures 

iPhone X의 디스플레이는 화면 가장자리 제스처를 사용하여 홈화면, 앱전환기, 알림 센터 및 제어 센터에 대한 액세스를 제공합니다.

#### - 시스템 전체의 화면 가장자리 제스처를 피하십시오

사람들은 모든 제스처에 의존하여 모든 앱에서 작동합니다. 드문 경우이지만 게임과 같은 몰입형 앱의 경우 앱제스처를 호출하는 첫번째 스와이프와 시스템 동작을 호출하는 두번째 스와이프가 시스템의 제스처보다 우선 적용되는 맞춤 화면 가장자리 제스처가 필요할수있습니다. 이 동작(가장자리 보호 라고도 함)은 사람들이 시스템 수준의 작업에 액세스하는 것을 어렵게하므로 드물게 구현해야합니다. 개발자 안내 는 [UIViewController](https://developer.apple.com/documentation/uikit/uiviewcontroller) 의 [preferredScreenEdgesDeferringSystemGestures()](https://developer.apple.com/documentation/uikit/uiviewcontroller/2887512-preferredscreenedgesdeferringsys) 메서드를 참조하십시오. 시스템 동작에 대한 자세한 내용은 [Gestures](https://developer.apple.com/ios/human-interface-guidelines/user-interaction/gestures/) 참조하십시오.

### 추가 디자인 고려 사항

#### - 인증 방법을 정확하게 참조하십시오

iPhone X는 인증을 위해 Face ID를 지원합니다. 앱이 Apple Pay 또는 다른 시스템 인증 기능과 통합되는 경우 iPhoneX에서 Touch ID를 참조하지 마십시오. 마찬가지로 앱이 Touch ID를 지원하는 장치에서 Face ID를 참조하지 않도록하십시오. [Authentication](https://developer.apple.com/ios/human-interface-guidelines/user-interaction/authentication/)을 참조하십시오.

#### - 시스템 제공 키보드 기능을 복제하지 마십시오

iPhone X에서는 Emoji/Globe 키와 Dictation 키가 사용자 정의 키보드를 사용하는 경우에도 키보드 아래에 자동으로 나타납니다. 앱이 이러한 키에 영향을 줄 수 없으므로 키보드에서 키를 반복하여 혼란을 피하십시오. [Custom Keyboards](https://developer.apple.com/ios/human-interface-guidelines/extensions/custom-keyboards/)를 참조하십시오.

당신의 웹 사이트가 아이폰 X의 Edge-to-Edge 디스플레이에 멋지다 확인 을 참조하십시오 아이폰 X에 대한 설계 웹 사이트 에 webkit.org .

### Resources

포토샵 및 스케치 아이폰 X UI 디자인 템플릿 다운로드 [Resource](https://developer.apple.com/design/resources/#ios-apps)

### 더 알아보기

관련 디자인 및 개발자 안내는 다음 동영상을 참조하십시오.

- [Fall 2017: Designing for iPhone X](https://developer.apple.com/videos/play/fall2017/801/)
- [Fall 2017: Building Apps for iPhone X](https://developer.apple.com/videos/play/fall2017/201/)
- [WWDC 2017: Auto Layout Techniques in Interface Builder](https://developer.apple.com/videos/play/wwdc2017/412)
- [WWDC 2017: Designing Across Platforms](https://developer.apple.com/videos/play/wwdc2017/804)
- [WWDC 2017: Modern User Interaction on iOS](https://developer.apple.com/videos/play/wwdc2017/219)
- [WWDC 2017: Updating Your App for iOS 11](https://developer.apple.com/videos/play/wwdc2017/204)


---

## What`s New in iOS 11

iOS 11을 사용하면 이전보다 더 강력하고 사용자 친화적인 앱을 제공 할 수 있습니다. <br>

<center><img src="/assets/post_img/posts/What_is_New_iOS11.png" width="700"></center> <br> 

#### - Augmented reality

증강 현실을 통해 앱은 현실감있는 가상 객체를 현실 세계와 자연스럽게 섞어주는 몰입형, 매력적인 경험을 제공 할 수 있습니다.

#### - Bolder navigation

탐색 및 검색시 명확성과 컨텍스트를 향상시키기 위해 크고 굵은 제목이 포함 된 Navigation bar를 구현할 수 있습니다.

#### - Clearer icons

채워진 모양과 더두터운 획 두께는 아이콘을 최소화하고 대비를 향상시킵니다.[Custom Icons](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/custom-icons/) 및 [System Icons](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/system-icons/) 참조하십시오.

#### - Drag and drop

끌어서 놓기 기능을 사용하면 한 손가락을 사용하여 선택한 사진, 텍스트 및 기타 콘텐츠를 한 위치에서 다른 위치로 이동할 수 있으며 심지어 iPad의 경우에도 이동할 수 있습니다.

#### - FAce ID and Touch ID

앱은 시스템의 생체 인식 보안 기능과 통합되어 사람들이 신뢰하는 안전하고 친숙한 인증을 제공 할 수 있습니다.

#### - Near Filed Communication

지원되는 기기에서 실행되는 앱은 실제 개체에 첨부된 전자 태그에서 데이터를 무선으로 읽을 수 있습니다.

#### - Safe area layout guides

시스템의 안전 영역을 준수하면 레이아웃 내에서 컨텐트를 적절하게 삽입 할 수 있으며 Status bar, Navigation bar, Toolbar 및 Tab bar에 아래에서 부분적으로 겹치는(underlapping) 내용을 방지 할 수 있습니다.

#### - Typographic changes

텍스트 크기와 가중치가 증가하면 시스템 전반에서 가독성이 향상됩니다. 이 시스템은 접근성 요구 사항이있는 사용자를 위해 표준 동적 유형 외에도 다양한 유형의 크기를 제공합니다.


---

## Interface Essentials 

대부분의 iOS 앱은 공통 인터페이스 요소를 정의하는 프로그래밍 프레임 워크 인 [UIKit](https://developer.apple.com/documentation/uikit)의 구성 요소를 사용하여 작성됩니다. 이 프레임 워크를 통해 앱은 시스템 전반에서 일관된 모양을 유지하면서 동시에 높은 수준의 맞춤 설정을 제공 할 수 있습니다. UIKit 요소는 유연하고 익숙합니다. 적응력이 뛰어나므로 iOS 기기에서 멋지게 보이는 단일 앱을 디자인 할 수 있으며 시스템에서 모양이 변경되면 자동으로 업데이트됩니다. UIKit에서 제공하는 인터페이스 요소는 크게 세 가지 범주로 나뉩니다.

#### - Bars

사람들에게 앱의 어느 위치에 있는지 알려주고 탐색 기능을 제공하며 작업을 시작하고 정보를 전달하기위한 버튼 또는 기타 요소가 포함될 수 있습니다.

#### - Views

사용자가 텍스트, 그래픽, 애니메이션 및 상호 작용 요소와 같이 앱에 표시되는 기본 콘텐츠를 포함합니다. 뷰를 사용하면 스크롤, 삽입, 삭제 및 정렬과 같은 동작을 사용할 수 있습니다.

#### - Controls 

행동을 시작하고 정보를 전달하십시오. Button, Switches, Text fields 및 Progress indicators는 컨트롤의 예입니다. <br>

추가로 iOS의 인터페이스를 정의하는 것 외에도 UIKit은 앱이 채택할수있는 기능을 정의합니다. 예를 들어, 이 프레임 워크를 통해 앱은 터치 스크린의 제스처에 응답하고 drawing, accessibility 및 printing 같은 기능을 사용할 수 있습니다. <br>

iOS 는 Apple Pay, HealthKit 및 ResearchKit과 같은 다른 프로그래밍 프레임 워크 및 기술 과도 긴밀하게 통합 되므로 놀랍도록 강력한 응용 프로그램을 설계 할 수 있습니다.

---