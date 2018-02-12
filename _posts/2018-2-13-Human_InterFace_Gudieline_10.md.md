---
layout:     post
title:      "iOS 휴먼 인터페이스 가이드라인 요약 (10)"
subtitle:   ""
date:       2018-02-13 03:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

개인적인 공부의 목적으로 작성 되었습니다. 오역이나 잘못된 부분이 있을수 있으니, 댓글 남겨 주시면 감사하겠습니다!

---

# Extensions 

- Custom Keyboards
- Document Providers
- Home Screen Actions
- Messaging 
- Photo Editing 
- Sharing and Action 
- Widgets

---

## Custom Keyboards

키보드를 커스텀 정의하여 확장할수 있습니다. 맞춤 키보드는 설정 앱의 일반 > 키보드에서 사용하도록 설정되어 있습니다. 사용자 키보드를 사용하면, 보안 텍스트 필드 및 전화 번호 필드를 수정할 때를 제외하고 모든 앱에서 텍스트 입력 중에 사용자 키보드를 사용할 수 있습니다. 사람들은 여러 개의 사용자 정의 키보드를 활성화하고 언제든지 이들 사이를 전환 할 수 있습니다. 

<center><img src="/img/posts/CustomKeyboard.png" width="500"></center> <br> 

#### - 사용자 정의 키보드가 정말로 필요한지 확인하십시오

새로운 키보드 입력 방법이나 iOS에서 지원하지 않는 언어로 입력 할 수 있는 기능과 같이 시스템 전반에 걸쳐 고유 한 키보드 기능을 내놓는 경우 사용자 정의 키보드가 적합합니다. 앱에 맞춤 키보드만 있으면 맞춤 입력을 만드는 것이 좋습니다. Custom Input Views를 참조하십시오.

#### - 키보드를 쉽고 간단하게 전환 할 수 있습니다

사람들은 여러 개의 키보드가 활성화되어있을 때 이모지를 대체하는 표준 iOS 키보드의 글로브 키가 다른 키보드로 빠르게 전환된다는 것을 알고 있습니다. 그들은 키보드에서 유사한 직관적인 경험을 기대합니다. 여러 키보드가 설치되어 있으면 전체 키가 이모티콘 키를 대체합니다.

#### - 시스템 제공 키보드 기능을 복제하지 마십시오

iPhone X에서는 Emoji/Globe 키와 Dictation 키가 사용자 키보드를 사용하는 경우에도 키보드 아래에 자동으로 나타납니다. 앱이 이러한 키에 영향을 줄 수 없으므로 키보드에서 키를 반복하여 혼란을 피하십시오.

#### - 앱에서 키보드 자습서를 제공하는 것이 좋습니다

사람들은 표준 키보드에 익숙하며 새로운 키보드를 배우려면 시간이 필요합니다. 키보드 자체가 아닌 앱에서 사용 지침을 제공하여 쉽게 온보딩 프로세스를 수행 할 수 있습니다. 키보드를 활성화하고, 텍스트 입력 중에 활성화하고, 사용하고, 표준 키보드로 다시 전환하는 방법을 사람들에게 알려줍니다.

개발자 가이드 는 [App Etension Programming Guide](https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/index.html), [Custom Keyboard](https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/CustomKeyboard.html)를 참조하세요.

## Custom Input Views

Custom Input Views는 표준 키보드를 Custom keyboard로 바꾸지만 `시스템 전체가 아니라 앱에서만 사용됩니다.` Custom Input Views를 사용하여 독특하고 효율적인 데이터 입력 방법을 제공하십시오. 예를 들어, 숫자는 스프레드 시트를 편집하는 동안 숫자 값을 입력하기위한 사용자 정의 입력보기를 구현합니다.

<center><img src="/img/posts/CustomKeyboard-1.png" width="500"></center> <br> 

#### - 기능을 분명히 하십시오

Custom Input Views의 컨트롤은 앱 컨텍스트에서 의미가 있어야합니다. 데이터 입력은 명확하고 직관적이어야하므로 추가 지침이 필요하지 않습니다.

#### - 입력하는 동안 표준 키보드 클릭 사운드를 재생합니다

키보드 클릭 사운드는 사용자가 키보드의 키를 두드리는 동안 들리는 피드백을 제공합니다. Custom Input Views에서 사용자 정의 컨트롤을 누르면이 소리도 생성됩니다. 이 사운드는 표시되는 Custom Input Views에서만 사용할 수 있으며 사용자는 설정 > 사운드에서 시스템 전체의 사운드를 비활성화 할 수 있습니다. 개발자 가이드 는 [UIDevice](https://developer.apple.com/documentation/uikit/uidevice) 의 [playInputClick](https://developer.apple.com/documentation/uikit/uidevice/1620050-playinputclick) 메서드를 참조하십시오.

#### - 필요한 경우 input accessory view를 제공하십시오

일부 앱은 키보드 위에 나타나는 추가 맞춤 input accessory view를 구현합니다. Numbers에서 입력 accessory view는 사람들이 표준 또는 사용자 정의 계산을 입력하는 데 도움이됩니다.

<center><img src="/img/posts/CustomKeyboard-2.png" width="500"></center> <br> 

개발자 가이드는 [Text Programming Guide for iOS](https://developer.apple.com/library/content/documentation/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/Introduction/Introduction.html)의  [Custom Data Input views](https://developer.apple.com/library/content/documentation/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/InputViews/InputViews.html)를 참조하십시오.

---

## Document Providers

문서 공급자 확장 프로그램은 시스템의 다른 응용 프로그램에서 응용 프로그램의 문서를 가져 오거나, 내보내거나, 열거 나 이동하기위한 사용자 지정 인터페이스를 구현합니다. 문서 공급자 확장 프로그램이 로드되면 해당 인터페이스가 Navigation bar 을 포함하는 modal view로 표시됩니다.

<center><img src="/img/posts/Documents_Provider.png" width="382" height="700"></center> <br> 

#### - 사용자가 파일을 열거나 가져올 때 상황별 문서 및 정보만 표시합니다

누군가 내선 번호를 사용하여 문서를 열거나 가져 오는 경우 현재 컨텍스트에 적합한 문서만 표시합니다. 예를 들어, PDF 편집 응용 프로그램에서 내선을 로드하는 경우 PDF 파일을 열거 나 가져올 수있는 가능한 문서로 나열하십시오. 수정 날짜, 크기, 문서가 로컬인지 원격인지 등 유용한 정보도 함께 나열하십시오.

#### - 문서를 내보내고 이동할때 대상을 선택하게 하십시오

앱이 문서를 단일 디렉토리에 저장하지 않으면 사용자가 디렉토리 계층의 특정 대상을 탐색 할 수 있습니다. 새 하위 디렉토리를 추가하는 방법을 제공하십시오.

#### - Custom navigation bar를 제공하지 마십시오

확장은 이미 Navigation bar 포함하는 modal views 에서 로드됩니다. 두 번째 navigation bars를 제공하면 혼란스럽고 콘텐츠에서 멀리 떨어진 공간이 필요합니다.

개발자 가이드 는 [App Extension Programming Guide](https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/index.html)의 [Documents Provider](https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/FileProvider.html) 를 참조하세요.

---

## Home Screen Quick Action 







