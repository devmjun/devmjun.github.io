---
layout:     post
title:      "iOS 휴먼 인터페이스 가이드라인 요약 (6)"
subtitle:   "Image Size and Resolution, App Icon, Custom Icons, Launch Screen, System Icons"
date:       2018-02-11 18:06:00
author:     "MinJun"
header-img: "img/tags/HIG-bg.jpg"
comments: true
tags: [HIG]
---

개인적인 공부의 목적으로 작성 되었습니다. 오역이나 잘못된 부분이 있을수 있으니, 댓글 남겨 주시면 감사하겠습니다!

---

# Icons and Images

- Image Size and Resolution
- App Icon
- Custom Icons 
- Launch Screen
- System Icons

---

## Image Size and Resolution

iOS가 화면에 콘텐츠를 배치하는 데 사용하는 좌표 시스템은 점의 측정 값을 기반으로하며, 이 값은 화면의 픽셀에 매핑됩니다. 표준 해상도 화면에서 한 점은 한 픽셀과 같습니다. 고해상도 화면의 픽셀 `밀도`가 높습니다. 같은 양의 물리적 공간에 더 많은 픽셀이 있기 때문에 점 당 더 많은 픽셀이 있습니다. 결과적으로, 고해상도 디스플레이는 더 많은 픽셀을 갖는 이미지를 필요로합니다. <br>

<center><img src="/img/posts/imageAndResolution.png"></center> <br>  


#### - 앱에서 지원하는 모든 기기에 대해 앱의 모든 아트웍에 고해상도 이미지를 제공합니다

장치에 따라 각 이미지의 픽셀 수에 특정 배율 인수를 곱하여 이 를 수행합니다. 표준 해상도 이미지의 배율은 1.0이며 @1x 이미지라고합니다. 고해상도 이미지의 배율은 2.0 또는 3.0이며 @2x 및 @3x 이미지라고 합니다. 예를 들어 100px × 100px의 표준 해상도 @1x 이미지가 있다고 가정해보겠습니다. 이 이미지의 @2x 버전은 200px × 200px입니다. @3x 버전은 300px × 300px입니다.

|장치 | 해상도 배율 | 
| iPhone X, iPhone 8 Plus, iPhone 7 Plus 및 iPhone 6s Plus| @3x |
| 다른 모든 고해상도 iOS 기기| @2x| <br>

### 고해상도 아트웍 디자인

#### - 8x8 픽셀 격자를 사용하십시오

그리드는 선을 선명하게 유지하고 모든 크기에서 최대한 선명하게 내용을 재구성 할 수 있게 해주므로 레터 링 및 선명도가 거의 필요하지 않습니다. 그리드에 이미지 경계를 스냅하여 축소 할 때 발생할 수있는 반 화소 및 흐린 세부 사항을 최소화합니다.

#### - 적절한 형식으로 작품을 제작하십시오

일반적으로 비트맵 / 래스터 아트 워크에는 디인터레이싱 된 PNG 파일을 사용하십시오. PNG는 투명도를 지원하며 무손실이기 때문에 압축 아티팩트는 중요한 세부 사항을 흐리게하거나 색상을 변경하지 않습니다. 음영, 질감 및 하이라이트와 같은 효과가 필요한 복잡한 아트웍에 적합합니다. 사진에는 ​​JPEG를 사용하십시오. 압축 알고리즘은 일반적으로 무손실 형식보다 작은 크기를 생성하며 아티팩트는 사진에서 식별하기가 더 어렵습니다. 사실적인 앱 아이콘은 PNG로 가장 잘 보입니다. 글리프 및 고해상도 스케일링을 필요로하는 기타 플랫, 벡터 아트웍에 PDF를 사용하십시오.

#### - 전체 24 비트 색상이 필요하지 않은 PNG 그래픽에는 8비트 색상 표를 사용하십시오

8 비트 색상 표를 사용하면 이미지 품질을 저하시키지 않고 파일 크기를 줄일 수 있습니다. 이 팔레트는 사진에 적합하지 않습니다.

#### - 크기와 품질 간의 균형을 찾으려면 JPEG 파일을 최적화하십시오

대부분의 JPEG 파일은 결과 이미지의 현저한 저하없이 압축 될 수 있습니다. 적은 양의 압축으로도 상당한 디스크 공간을 절약 할 수 있습니다. 허용 가능한 결과를 산출하는 최적의 값을 찾으려면 각 이미지의 압축 설정을 시험해보십시오.

#### - 이미지와 아이콘에 대한 대체 텍스트 레이블을 제공하십시오

다른 텍스트 레이블은 화면 상에 보이지 않지만, VoiceOver는 화면 상에 무엇이 들리는지를 소리로 설명하여 시각 장애가있는 사람들이 쉽게 탐색 할 수있게합니다.

---

## App Icon

모든 앱에는 App Store에서 주목을 끄는 홈 화면에서 두드러지고 아름답고 기억에 남을만한 아이콘이 필요합니다. 아이콘은 앱의 목적을 한눈에 알 수있는 첫 번째 기회입니다. 또한 설정 및 검색 결과와 같이 시스템 전체에 나타납니다.


<center><img src="/img/posts/appiCon.png"></center> <br>  

#### - 단순한을 가지십시오 

앱의 본질을 파악하고 그 요소를 단순하고 독특한 모양으로 표현하는 단일 요소를 찾습니다. 세부 사항을 조심스럽게 추가하십시오. 아이콘의 내용이나 모양이 지나치게 복잡하면 특히 작은 크기의 경우 세부 정보를 구분하기가 어려울 수 있습니다. <br>

#### - 단일 초점 지점을 제공하십시오

한 지점을 중심으로 즉각적인주의를 끌며 앱을 명확하게 식별 할 수있는 아이콘을 디자인하십시오.

#### - 인식 할 수있는 아이콘을 디자인하십시오

사람들은 아이콘을 분석하여 아이콘이 무엇을 나타내는 지 알아낼 필요가 없습니다. 예를 들어 메일 응용 프로그램 아이콘은 일반적으로 메일과 연결된 봉투를 사용합니다. 시간을내어 앱의 목적을 예술적으로 표현하는 아름답고 매력적인 추상적 인 아이콘을 디자인하십시오.

#### - 배경을 간단하게 유지하고 투명성을 피하십시오

아이콘이 불투명한지 확인하고 배경을 혼란스럽게하지 마십시오. 간단한 배경으로 사용하면 근처에있는 다른 앱 아이콘에 과부하가 걸리지 않습니다. 전체 아이콘을 내용으로 채울 필요는 없습니다.

#### - 로고가 필수적이거나 로고의 일부일 때만 단어를 사용하십시오

앱의 이름이 홈 화면의 아이콘 아래에 나타납니다. 이름을 반복하는 필수적이지 않은 단어를 포함 시키거나 'Watch'또는 'Play'과 같은 앱으로 할 일을 사람들에게 알리지 마세요. 디자인에 텍스트가 포함되어있는 경우 앱에서 제공하는 실제 콘텐츠와 관련된 단어를 강조하십시오.

#### - 사진, 스크린 샷 또는 인터페이스 요소를 포함하지 마십시오

사진의 세부 사항은 작은 크기에서보기가 매우 어려울 수 있습니다. 스크린 샷은 앱 아이콘에 비해 너무 복잡하며 일반적으로 앱의 목적을 전달하는 데 도움이되지 않습니다. 아이콘의 인터페이스 요소는 오해의 소지가 있으며 혼동을줍니다.

#### - Apple 하드웨어 제품의 복제품을 사용하지 마십시오

Apple 제품은 저작권이 있으며 귀하의 아이콘이나 이미지로 복제 할 수 없습니다. 일반적으로 하드웨어 디자인은 자주 변경되는 경향이 있으므로 아이콘 복제본을 표시 할 수 있으므로 장치의 복제본을 표시하지 마십시오.

#### - 인터페이스 전체에 앱 아이콘을 두지 마십시오

앱 전체에서 다양한 용도로 사용되는 아이콘을 보는 것은 혼란 스러울 수 있습니다. 대신 아이콘의 색 구성표를 통합하는 것을 고려하십시오. [색상](https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/)을 참조하십시오 .

#### - 다른 배경 화면에 대한 귀하의 아이콘을 테스트하십시오

사람들이 홈 화면으로 선택할 배경 화면을 예측할 수 없으므로 앱을 밝거나 어두운 색상으로 테스트하지 마십시오. 다른 사진을 어떻게 보는지 보십시오. 장치가 움직일 때 원근감이 바뀌는 동적 배경을 가진 실제 장치에서 사용해보십시오.

#### - 아이콘 모퉁이를 사각형으로 유지하십시오

아이콘 모서리를 자동으로 반올림하는 마스크가 적용됩니다.

#### - 앱 아이콘 속성 

모든 앱 아이콘은 다음 사양을 준수해야합니다.

<center><img src="/img/posts/appiCon-1.png"></center> <br>  

#### - 앱 아이콘 크기 

모든 앱은 앱이 설치되면 홈 화면 및 시스템 전반에 작은 아이콘을 제공해야하며 앱 스토어에 표시 할 더 큰 아이콘도 제공해야합니다.

<center><img src="/img/posts/appiCon-2.png"></center> <br>  
<center><img src="/img/posts/appiCon-3.png"></center> <br> 

#### - 다른 장치에 대해 다른 크기의 아이콘을 제공하십시오

지원하는 모든 기기에서 앱 아이콘이 잘 보이는지 확인하십시오.

#### - 작은 아이콘을 App Store 아이콘으로 모방하십시오

앱 스토어 아이콘이 작은 아이콘과 다르게 사용 되더라도 여전히 앱 아이콘입니다. 시각적 효과가 적용되지 않았기 때문에 미묘하게 풍부하고 자세하게 표현할 수 있지만 외관상 더 작은 버전과 일반적으로 일치해야합니다.

#### 스포트라이트, 설정 및 알림 아이콘 

모든 앱은 앱 이름이 스포트라이트 검색의 용어와 일치 할 때 iOS가 표시 할 수있는 작은 아이콘을 제공해야 합니다. 또한 설정 이 있는 앱은 기본 제공 설정 앱에 표시 할 작은 아이콘을 제공해야하며 알림을 지원하는 앱은 알림에 표시 할 작은 아이콘을 제공해야 합니다. 모든 아이콘은 앱을 명확하게 식별해야합니다. 이상적으로 앱 아이콘과 일치해야합니다. 이 아이콘을 제공하지 않으면 iOS가 기본 앱 아이콘을 축소하여이 위치에 표시되도록 할 수 있습니다.

| Setting | PushNotification | 
| :--: | :--: |
|![screen](/img/posts/appiCon-4.png) | ![screen](/img/posts/appiCon-5.png)| <br>

<center><img src="/img/posts/appiCon-6.png"></center> <br>  
<center><img src="/img/posts/appiCon-7.png"></center> <br>  
<center><img src="/img/posts/appiCon-8.png"></center> <br>  


#### - 설정 아이콘에 오버레이 또는 경계선을 추가하지 마십시오

iOS는 모든 아이콘에 1픽셀 획을 자동으로 추가하여 설정의 흰색 배경에 잘 보이게합니다.

> 팁
> 
> 앱이 맞춤 문서를 만드는 경우 iOS가 앱 아이콘을 사용하여 자동으로 문서 아이콘을 만들기 때문에 문서 아이콘을 디자인 할 필요가 없습니다.


#### - 사용자가 선택할 수있는 앱 아이콘

일부 응용 프로그램의 경우 사용자 지정 기능은 개인 연결을 불러 일으키고 사용자 환경을 향상시키는 기능입니다. 앱에서 가치를 제공하는 경우 앱에 포함 된 미리 정의 된 아이콘 집합에서 다른 앱 아이콘을 선택할 수 있습니다. 예를 들어, 스포츠 앱은 여러 팀 또는 앱의 아이콘을 제공 할 수 있습니다. 밝은 모드와 어두운 모드는 해당 밝고 어두운 아이콘을 제공 할 수 있습니다. 앱 아이콘은 사용자의 요청에 의해서만 변경 될 수 있으며 시스템은 항상 사용자에게 변경 확인을 제공합니다.

#### - 모든 필요한 크기로 시각적으로 일관된 대체 아이콘을 제공하십시오

기본 앱 아이콘과 마찬가지로 각 대체 앱 아이콘은 크기가 다양한 관련 이미지 모음으로 제공됩니다. 사용자가 대체 아이콘을 선택하면 해당 아이콘의 적절한 크기가 홈 화면, 스포트라이트 및 시스템의 다른 위치에있는 기본 응용 프로그램 아이콘을 대체합니다. 대체 아이콘이 시스템 전체에 일관성있게 표시되도록하려면 사용자는 홈 화면에 하나의 아이콘 버전을 표시하고 설정에서 완전히 다른 버전을 보지 말아야합니다 (예 : 기본 앱 아이콘과 동일한 크기로 제공). (App Store 아이콘 제외).

개발자 가이드 는 [UIApplication](https://developer.apple.com/documentation/uikit/uiapplication) 의 [setAlternateIconName](https://developer.apple.com/documentation/uikit/uiapplication/2806818-setalternateiconname) 메서드를 참조하십시오. <br>

> 참고
> 
> 대체 앱 아이콘은 [App Review](https://developer.apple.com/support/app-review/)에서 검토 해야하며 [App Store](https://developer.apple.com/app-store/review/guidelines/) 리뷰 가이드 라인을 준수해야합니다 . 

---

## Custom Icons

앱에 [시스템 아이콘](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/system-icons/) 으로 표시 할 수 없는 작업이나 모드가 포함되어 있거나 시스템 아이콘이 앱의 스타일과 일치하지 않는 경우 자신의 아이콘을 만들 수 있습니다.

#### - 눈에 잘 띄고 고도로 단순화 된 디자인을 만듭니다

세부 정보가 너무 많으면 아이콘을 혼동 또는 읽을 수 없게 만들 수 있습니다. 대부분의 사람들이 신속하게 인식하고 불쾌감을 느끼지 않을 단순하고 보편적인 디자인을 위해 노력하십시오. 가장 좋은 아이콘은 자신이 시작한 활동 또는 공개 된 내용과 직접적으로 관련된 친숙한 시각적 은유를 사용합니다.

<center><img src="/img/posts/CustomiCon.png"></center> <br>  

#### - 글리프로 아이콘을 디자인하십시오

템플릿 이미지 라고도하는 글리프 는 투명도, 앤티앨리어싱 및 마스크를 사용하여 모양을 정의하는 그림자가 없는 단색 이미지입니다. 글리프는 컨텍스트 및 사용자 상호 작용을 기반으로 적절한 모양(예 : 채색, 강조 및 생동감 포함)을 자동으로 수신합니다. 탐색 영역, 탭 표시 줄, 도구 모음 및 홈 화면 빠른 동작을 비롯한 다양한 표준 인터페이스 요소가 글리프를 지원합니다.

#### - 글리프를 @2x 배율로 준비하고 PDF로 저장하십시오

PDF는 고해상도 스케일링을 허용하는 벡터 형식이므로 일반적으로 앱에서 @2x 버전을 하나만 제공하면 다른 해상도에서도 확장 할 수 있습니다.

#### - 아이콘의 일관성을 유지하십시오

사용자 정의 아이콘 만 사용하든 사용자 정의 및 시스템 아이콘을 사용하거나, 앱의 모든 아이콘은 세부 사항, 광학 무게, 획 두께, 위치 및 원근감 측면에서 동일해야합니다.

<center><img src="/img/posts/CustomiCon-1.png"></center> <br>

#### - 아이콘을 쉽게 알 수 있는지 확인하십시오

일반적으로 솔리드 아이콘은 윤곽이 표시된 아이콘보다 선명합니다. 아이콘에 선이 포함되어야하는 경우 다른 아이콘 및 앱의 인쇄술로 가중치를 조정하십시오. <br>

| Good | Bad | 
| :--: | :--: |
|![screen](/img/posts/CustomiCon-2.png) | ![screen](/img/posts/CustomiCon-3.png)| <br>

#### - 사용자 정의 아이콘 크기

무엇보다 앱의 아이콘 군은 시각적으로 일관성이 있어야합니다. 개별 아이콘 디자인의 무게가 다른 경우이 효과를 얻으려면 일부 아이콘이 다른 아이콘보다 약간 클 필요가 있습니다.

<center><img src="/img/posts/CustomiCon-4.png"></center> <br>

#### - 탐색 모음 및 도구 모음 아이콘 크기

사용자 지정 탐색 모음 및 도구 모음 아이콘을 준비 할 때 다음 크기를 지침으로 사용하지만 필요에 따라 균형을 조정하려면 조정하십시오.

<center><img src="/img/posts/CustomiCon-5.png"></center> <br>

#### - 탭 바 아이콘 크기

세로 방향에서는 탭 제목 위에 탭 표시 줄 아이콘이 나타납니다. 가로 방향에서는 아이콘과 제목이 나란히 표시됩니다. 장치 및 방향에 따라 시스템에 일반 탭 또는 소형 탭 막대가 표시됩니다. 앱에는 두 크기의 맞춤 탭 막대 아이콘이 있어야합니다.

<center><img src="/img/posts/CustomiCon-6.png"></center> <br>
<center><img src="/img/posts/CustomiCon-7.png"></center> <br>

---

## Launch Screen

앱이 시작되면 즉시 실행 화면이 나타납니다. 시작 화면이 앱의 첫 번째 화면으로 신속하게 대체되어 앱이 빠르고 반응이 좋다는 인상을줍니다. 런치 스크린은 예술적 표현의 기회가 아닙니다. 이는 출시가 빠르고 즉시 사용 준비가 된 상태에서 앱의 인지도를 높이기위한 용도로만 사용됩니다. 모든 앱에서 시작 화면을 제공해야합니다.

| Lanuch screen | First screen | 
| :--: | :--: |
|![screen](/img/posts/launch_Screen.png) | ![screen](/img/posts/launch_Screen-1.png)| <br>

장치 화면 크기가 다양하기 때문에 시작 화면 크기도 다릅니다. 이를 위해 Xcode 스토리 보드 또는 응용 프로그램에서 지원하는 장치의 `정적` 이미지 집합으로 시작 화면을 제공 할 수 있습니다. Xcode 스토리 보드를 사용하는 것이 좋습니다. 스토리 보드는 유연하고 적응력이 좋습니다. 하나의 스토리 보드를 사용하여 모든 시작 화면을 관리 할 수 ​​있습니다. 적응형 인터페이스 구현에 대한 자세한 내용은 [자동 레이아웃 안내서](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/AutolayoutPG/index.html)를 참조하십시오.

#### - 앱의 첫 번째 화면과 거의 동일한 시작 화면을 디자인하십시오

앱 실행이 끝나면 모양이 다른 요소를 포함하면 시작 화면과 앱의 첫 화면 사이에 불쾌한 플래시가 발생할 수 있습니다.

#### - 시작 화면에 텍스트를 포함하지 마십시오

실행 화면은 정적이므로 표시된 모든 텍스트는 현지화되지 않습니다.

#### - Downplay 출시

사람들은 앱을 자주 전환 할 가능성이 높으므로 앱 시작 경험에주의를 끌지 않는 시작 화면을 디자인하십시오.

#### - 광고하지 마십시오

런치 스크린은 브랜딩 기회가 아닙니다. 스플래시 화면이나 "About"창처럼 보이는 엔트리 경험을 디자인하지 마십시오. 앱의 첫 번째 화면에 정적 인 부분이 아닌 경우 로고 또는 다른 브랜딩 요소를 포함하지 마십시오.

#### - 정적 실행 화면 이미지

시작 화면에 Xcode 스토리 보드를 사용하는 것이 가장 좋지만 필요에 따라 정적 이미지 세트를 제공 할 수 있습니다. 여러 장치에 대해 서로 다른 크기의 정적 이미지를 만들고 상태 표시 줄 영역을 포함시켜야합니다.

<center><img src="/img/posts/launch_Screen-2.png"></center> <br>

---

## System Icons

이 시스템은 다양한 케이스에서 일반적인 작업 및 유형의 콘텐츠를 나타내는 내장 아이콘을 제공합니다.<br>

- 탐색 모음 및 도구 모음 아이콘
- 탭 표시 줄 아이콘
- 홈 화면 빠른 액션 아이콘 <br>

사람들에게 친숙하기 때문에 이러한 기본 제공 아이콘을 최대한 많이 사용하는 것이 좋습니다.

#### - 시스템이 아이콘을 의도한 대로 사용하십시오

모든 시스템 제공 이미지에는 특정의 잘 알려진 의미가 있습니다. 혼란을주지 않으려면 각 이미지를 의미와 권장 용도에 따라 사용해야합니다.

#### - 아이콘에 대한 대체 텍스트 레이블을 제공하십시오

다른 텍스트 레이블은 화면 상에 보이지 않지만, VoiceOver는 화면 상에 무엇이 들리는지를 소리로 설명하여 시각 장애가있는 사람들이 쉽게 탐색 할 수 있게합니다.

#### - 사용자 요구에 맞는 시스템 제공 아이콘을 찾을 수 없는 경우 사용자 정의 아이콘을 디자인하십시오. 

시스템 제공 이미지를 오용하는 것보다 자신의 디자인을 만드는 것이 좋습니다. [사용자 정의 아이콘을](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/custom-icons/) 참조하십시오.

#### - 탐색 모음 및 도구 모음 아이콘

[navigation bars](https://developer.apple.com/ios/human-interface-guidelines/bars/navigation-bars/) 과 [toolbars](https://developer.apple.com/ios/human-interface-guidelines/bars/toolbars/) 에서 다음 아이콘을 사용하십시오 . 개발자 가이드는 [UIBarButtonSystemItem](https://developer.apple.com/documentation/uikit/uibarbuttonsystemitem)을 참조하십시오.

> 팁
>
> 아이콘 대신 텍스트를 사용하여 탐색 막대 또는 도구 모음의 항목을 나타낼 수  있습니다. 예를 들어 캘린더는 툴바에서 "오늘", "달력" 및 "받은 편지함"을 사용합니다. 고정 된 공간 요소를 사용하여 탐색 및 도구 모음 아이콘 사이에 패딩값을 제공 할 수도 있습니다. <br> 

| * |
| :--: |
|![screen](/img/posts/SystemiCon.png) | 
|![screen](/img/posts/SystemiCon-1.png)| <br>



#### - 탭 바 아이콘들 

[Tar Bars](https://developer.apple.com/ios/human-interface-guidelines/bars/tab-bars/) 에서 다음 아이콘을 사용하십시오 . 개발자 가이드는 [UITabBarSystemItem](https://developer.apple.com/documentation/uikit/uitabbarsystemitem)을 참조하십시오.

<center><img src="/img/posts/SystemiCon-2.png"></center> <br>

#### - 홈 화면 빠른 액션 아이콘

[home screen quick action](https://developer.apple.com/ios/human-interface-guidelines/extensions/home-screen-actions/) 메뉴 에서 다음 아이콘을 사용하십시오. 개발자 지침은 [UIApplicationShortcutIconType](https://developer.apple.com/documentation/uikit/uiapplicationshortcuticontype)을 참조하십시오. <br>

| * |
| :--: |
|![screen](/img/posts/SystemiCon-3.png) | 
|![screen](/img/posts/SystemiCon-4.png)| <br>

---
