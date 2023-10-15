---
layout:     post
title:      "Swift. Internationalizing Your iOS App: Getting Started"
subtitle:   "Localization에 대해서 알아봅니다."
date:       2018-10-15 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich, Localization]
categories: archive
permalink: /archive/:title
---

[Internationalizing Your iOS App: Getting Started](https://www.raywenderlich.com/250-internationalizing-your-ios-app-getting-started)을 의역 했습니다.

---

## Table of contents 

  - [<U>Internationalizing Your iOS App: Getting Started</U>](#section-id-16)
  - [<U>Internationalization vs Localization</U>](#section-id-34)
  - [<U>Getting Started</U>](#section-id-50)
  - [<U>Separating Text From Code</U>](#section-id-68)
  - [<U>Adding a Spanish Localization</U>](#section-id-138)
  - [<U>Internationalizing Storyboards</U>](#section-id-199)
  - [<U>Internationalizing Images</U>](#section-id-250)
  - [<U>Internationalizing Numbers</U>](#section-id-281)
  - [<U>Pluralization</U>](#section-id-326)
  - [<U>Adding Another Language</U>](#section-id-388)
  - [<U>Localizing Your Icon</U>](#section-id-424)
  - [<U>Where to Go From Here?</U>](#section-id-446)


---

<div id='section-id-16'/>

## Internationalizing Your iOS App: Getting Started

이 튜토리얼에서는 다양한 언어, 각 지역의 숫자 형식과 복수형 규칙들을 지원하는 방법에 대해서 알아 봅니다. 

> Note; 이 튜토리얼은 Xocde 9로 업데이트 되었습니다.

훌륭한 앱을 제작하는건 쉬운일이 아니지만, 거기에는 멋진 코드와 멋진 디자인 그리고 직관적인 상호작용들 보다 훨씬더 많은 기능들이 있습니다. 앱을 앱스토어 랭크에 올리려면 적절한 제품 마케팅, 사용자 기반으로 확장하는 능력, 도구와 기술을 사용하여 가능한 많은 고객을 확보해야 합니다.

많은 개발자들에게 국제 시장은 나중에 생각하는 부분입니다. 앱스토어에 제공되는 국제적인 배포 덕분에 한번의 클릭으로 150개국 이상에서 앱을 출시할수 있습니다. 아시아와 유럽은 지속적으로 성장하는 잠재 고객을 대표 하고 그 중 대다수는 영어를 모국어로 사용하지 않는 사람들 입니다. 앱의 세계 시장 잠재력을 활용하려면 앱의 현지화 및 국제화의 기본을 이해해야 합니다.(In order to capitlizae on the global market potential of your app, you'll need to understand the basics of internationalization and localization)

이 튜토리얼은 iLikelt 라고 불리는 간단한 앱에 국제화 지원을 하며 국제화의 기본 개념을 소개합니다. 이 간단한 앱은 iLikeIt? 버튼과 레이블을 가집니다. 유저가 버튼을 탭할때 가짜의 판매 데이터와 재미있는 이미지가 버튼 아래에서 사라지는 애니메이션을 보여줍니다. 

현재 앱은 영어로만 되어 있습니다. 이제 고쳐볼 시간입니다.

> Note: 언어를 변경하는것 또한 UI 요소의 사이즈를 변경시키기 때문에 국제화를 계획하는 앱에서 오토레이아웃을 사용해야 하는것이 중요합니다.


---

<div id='section-id-34'/>

## Internationalization vs Localization

앱이 다른 언어를 지원하게 만들려면 국제화와 현지화(internationalization and localization) 두개가 필요합니다. 두단어는 똑같은것 아닌가요? 아닙니다. 국제화와 현지화는 서로 구분되고 다양한 언어의 세계로 앱을 이끄는 처리의 단계에서 똑같이 중요합니다.

국제화는 국제적인 호환성을 위해 앱을 디자인하고 제작하는 과정입니다. 즉, 예를들어 앱을 제작할때 다음의 것들을 의미합니다.

- 유저의 언어(user's native language)에서 텍스트 입/출력 처리 다루기 
- 다른 날짜, 시간, 숫자 형식 다루기
- 날짜를 처리하기 위한 적절한 달력, 표준 시간대(time zone) 활용

국제화는 개발자가 시스템에서 제공하는 API를 활용하여 중국어와 아랍어를 영어 영어와같이 이용할수 있는 좋을 앱을 만들기위해 코드를 필수적으로 수정하고 만드는 활동입니다. 이러한 수정을 통해 앱이 현지화(localizaed) 되어집니다.

현지화(Localization)는 앱의 유저 인터페이스와 리소스를 다른언어로 번역하는 과정 입니다. 지원하는 언어가 익숙하지 않다면 당신이 해야하는것, 해야만 하는것 또는 누군가에게 위탁해야 하는것 입니다. 

---

<div id='section-id-50'/>

## Getting Started

[여기](https://koenig-media.raywenderlich.com/uploads/2017/12/iLikeIt-starter.zip)에서 시작 프로젝트를 다운받습니다. 앱을 빌드하고 실행하고 `You like?`를 탭합니다. 앱이 다음의 그림과같이 보여야합니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/12/image001.png" width="450"></center> <br> 

방금 본 것과 같이, 4가지 항목을 현지화 해야 합니다.

- `Hello` 레이블
- `You Like?`버튼 
- `Sale Data` 레이블 
- 이미지에 있는 텍스트

프로젝트를 익숙하게 하기 위해 폴더와 파일들을 탐색해보세요. `Main.storybard`는 `MainViewController`의 인스턴스인 단일 화면을 가지고 있습니다. 

---

<div id='section-id-68'/>

## Separating Text From Code 

현재, 앱에 `Main.storyboard`, `MainViewController.swift` 내에 하드 코딩된 형태로 존재 하는 모든 텍스트가 화면에 표시되어 있습니다. 이들을 현지화 하려면 이들을 반드시 분리된 파일에 놓아야 합니다. 그후 하드 코딩하지 않고 앱의 번들에 분리된 파일에서 적절한 문자열을 되찾아옵니다.

iOS는 `.string` 파일 확장자를 사용하는 파일을 사용하여 앱 내에서 사용되어진 각 지원가능한 언어를 위한 하나 이상의 현지화된 모든 문자열을 저장합니다. 

간단한 함수를 호출하여 사용중인 장치의 현재 언어에 기반한 요청된 문자열을 검색합니다.

메뉴에서 `File\New\File`을 선택하여 `iOS\Resource\Strings File`을 선택하고 `Next`를 클릭합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2017/12/image002.png)

파일이름은 `Localizable`으로 짓고 생성을 클릭합니다.

> Note: `Localizable.strings`는 iOS가 현지화 텍스트를 위해 사용하는 기본 파일 이름 입니다. 매시간 참조하는 현지화된 문자열 `.strings` 파일의 이름을 입력하길 원하지 않는다면 이름을 지정하지 않도록 주의하세요 
> 

`.strings` 파일은 Dictionary와 같이 key-value 쌍을 포함하고 있습니다. 기존의 관행은 개발, 기본 언어 번역을 키(Key)로 사용합니다. 이 파일은 분명하지만 단순한 형식을 가집니다.

```string
"KEY" = "CONTENT";
```

> Note: 스위프트와 다르지만, `.strings`파일은 각 라인의 종료에 세미콜론을 사용해야합니다.

`Localizable.strings` 의 끝에 다음을 추가합니다.

```string
"You have sold 1000 apps in %d months" = "You have sold 1000 apps in %d months";
"You like?" = "You like?";
```

보다시피 런타임에 실제 데이터를 추가하기 위해 문자열의 키 또는 각 부분에 형식 지정자(format specifier)을 포함시켜야 합니다. 

`NSLocalizaedString(_:tableName:bundle:value:comment:)`는 현지화된 문자열에 접근하는데 사용하는 주요한 도구 입니다. `tableName`, `bundle`, `value` 매개변수는 모두 기본값을 가집니다. 그래서 일반적으로 `key`, `comment`만 값을 지정합니다. 설명(comment) 매개변수는 번역가에게 이 문자열이 앱의 사용자 환경에서 어떤 용도로 사용되는지 힌트를 제공합니다. 

`MainViewcontroller.swift`를 열고 다음 함수를 추가합니다.

```swift
override func viewDidLoad() {
  super.viewDidLoad()
  
  likeButton.setTitle(NSLocalizedString("You like?", comment: "You like the result?"),
                      for: .normal)
}
```

현지화된 값을 사용하여 버튼의 타이틀을 업데이트 했습니다. 이제, `likebuttonPress()`함수에서 다음 라인을 

```swift
salesCountLabel.text = "You have sold 1000 apps in \(period) months"
```

다음과같이 교체합니다.

```swift
let formatString = NSLocalizedString("You have sold 1000 apps in %d months",
                                     comment: "Time to sell 1000 apps")
salesCountLabel.text = String.localizedStringWithFormat(formatString, period)
```

String 정적함수 `localizaedStringWithFormat(_:_:)`을 사용하여 판매기간의 월 숫자를 현지화된 문자열로 대체(substitue) 합니다.

> Note: 이 튜토리얼에서 `comment` 문자열은 의도적으로 짧게 유지하여 화면에 적절한 형식을 유지합니다. 자신의 코드에서 작성할때 가능하면 명확한 설명으로 작성하세요. 

빌드하고 실행합니다. 이전과 똑같이 보여집니다. 

---

<div id='section-id-138'/>

## Adding a Spanish Localization

다른 언어를 지원을 추가하려면, 프로젝트 네비게이터에서 파란색 `iLikeIt` 프로젝트 폴더를 클릭하고 중앙의 `iLikeIt` 프로젝트 선택하고 `Info`를 선택하면 `Localization`을 위한 섹션을 볼수 있습니다. `+` 버튼을 클릭하고 프로젝트에 스페인어 현지화를 위해 `Spanish(es)`를 선택합니다.

![](https://koenig-media.raywenderlich.com/uploads/2017/12/image004.png)

Xcode는 프로젝트에서 현지화 가능한 파일 목록을 보여주고 업데이트 해야하는것을 선택하게 합니다. 모두 선택하고 `Finish`를 클릭합니다.

![](https://koenig-media.raywenderlich.com/uploads/2017/12/image005.png)

잠깐만! `Localizable.strings`은 어디에 있나요? 걱정하지마세요. 아직 현지화를 표시하지 않았습니다. 곧 고칠것입니다. 

이 시점에서 Xcode는 뒤에서 선택한 각 언어를 현지화된 파일에 포함한 디렉토리를 설정했습니다. 이것을 직접 보려면, Finder를 사용하여 프로젝트 폴더를 열면 다음과 비슷한것을 봐야합니다.

![](/img/posts/Localization-0.png)

`en.lproj`, `es.lproj`를 봣나요? 여기는 파일의 지정된 언어 버전이 포함되어 있습니다. `en`은 영어에 대한 현지화 코드 이고 `es`는 스페인어에 대한 현지화 코드 입니다. 다른 언어를 보려면 [여기(full list of language)](http://www.loc.gov/standards/iso639-2/php/English_list.php)를 참조하세요.

그러면 `Base.lproj`는 뭔가요? 이 파일은 기본(base)또는 개발(development), 언어(이 프로젝트는 English) 입니다. 앱에서 현지화된 버전의 리소스를 요청할때 먼저 iOS는 적절한 언어 디렉토리를 찾습니다. 디렉토리가 존재하지 않거나 리소스가 거기에 없으면, iOS는 `Base.lproj`에서 리소스를 가져옵니다. 
이것은 간단합니다. 적절한 폴더에 리소스들을 놓으면 iOS가 나머지 작업을 수행합니다. 

`Localizable.strings`은 자신들의 `.lproj` 디렉토리에 있지않으면 잘 다루지 못합니다. 그래서 프로젝트 탐색기에서 Xcode를 선택하여 이들을 선택하고 그후 `Localize..`를 파일 inspector에서 선택합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2017/12/image007.png)

Xcode는 파일의 언어를 확인하기 위한 얼럿을 보여줍니다. 기본값은 개발언어인 `English` 입니다. `Localize`를 클릭합니다.

![](/img/posts/Localization-1.png)

파일 인스펙터는 선택 가능한 언어를 보여주기위해 업데이트 합니다. 파일의 스페인어 버전을 추가하기 위해 `Spanish` 바로옆에 체크박스를 클릭합니다. 

![](/img/posts/Localization-2.png)

프로젝트 네비게이터를 보세요. `Localizable.strings` 옆에 펼침 삼각형(disclosure triangle)이 있습니다. 목록을 확장하면 English, Spanish 버전 두개의 버전이 Xcode에 목록으로 표시된것을 볼수 있습니다.

<center><img src="/img/posts/Localization-3.png" width="450"></center> <br> 


프로젝트 네비게이터에서 `Localizable.strings(Spanish)`를 선택하고 컨텐츠들을 다음과 같이 변경합니다. 

```swift
"You have sold 1000 apps in %d months" = "Has vendido 1000 aplicaciones en %d meses";
"You like?" = "¿Es bueno?";
```
Xcode는 시뮬레이터에서 언어(languages) 또는 지역(locale)이 계속 변하는걸 신경쓰는것 없이 현지화 테스트를 쉽게 할수 있습니다. 툴바에서 active scheme를 클릭하고 메뉴에서 `Edit scheme`를 선택합니다.(또한 `Run` 버튼에서 `Option-click` 할수 있습니다.)

![](/img/posts/Localization-4.png)

`Run` 스키마는 기본(Default)으로 선택되어져 있을것이고, 원하는걸 선택할수 있습니다. `Options` 탭을 클릭하고 그후 `Application Language`를 `Spanish`로 변경합하고 Close를 선택합니다.

![](https://koenig-media.raywenderlich.com/uploads/2017/12/image012.png)

앱을 빌드하고 실행합니다. `¿Es bueno?`버튼을 클릭했을때 다음과 같이 볼수 있습니다. 

<center><img src="/img/posts/Localization-5.png" width="450"></center> <br> 


앱에는 스페인어가 존재합니다!

---

<div id='section-id-199'/>

## Internationalizing Storyboards

스토리보드의 UI 요소들(레이블, 버튼 ,이미지)을 스토리보드 에서 직접적으로 또는 코드에서 설정할수 있습브니다. 이미 프로그래밍적으로 텍스트를 설정할때 여러 언어를 지원하는 방법을 배웠지만, 스크린 상단의 Hello 레이블은 IBOutlet이 없고 `Main.stroyboard`내에 텍스트만 설정되어 있습니다. 

이 레이블을 현지화 지원하기 위해 IBOutlet을 추가하고 `Main.storyboard` 레이블에 연결하고 그다음에 `likeButton`, `saleCountLabel`과 마찬가지로 `NSLocalizedString(_:tableName:bundle:value:comment)`을 사용하여 텍스트 속성을 설정할수 있지만 훨씬 쉬운 방법이 있습니다. 추가적인 코드 없이 스토리보드 요소를 현지화 할수 있습니다. 


프로젝트 탐색기에서 `Main.stroyboard`옆의 펼침 삼각형을 열면 `Main.storyboard(Base)` 및 `Main.string(Spanish)`가 표시됩니다.

![](/img/posts/Localization-6.png)


편집기에서 `Main.strings(Spanish)`를 클릭합니다. Hello 레이블 항목은 이미 다음과 같이 표시되어집니다.

```swift
/* Class = "UILabel"; text = "Hello"; ObjectID = "jSR-nf-1wA"; */
"DO NOT COPY AND PASTE.text" = "Hello";
```

영어 번역을 스페인어 번역으로 교체합니다.

```swift
/* Class = "UILabel"; text = "Hello"; ObjectID = "jSR-nf-1wA"; */
"DO NOT COPY AND PASTE.text" = "Hola";
```

> Note: 자동으로 생성된 `ObjectID`를 직접 변경하지마세요. 또한 레이블의 ObjectID가 위에 표시된것과 다를수 있으므로 위의 텍스트들을 복사 & 붙여넣기 하지마세요.

나머지 두 항목의 현지화를 변경하세요 다시 말하지만 unique ObjectID를 수정하지 마세요!

```swift
"DO NOT COPY AND PASTE.text" = "Has vendido 1000 aplicaciones en 20 meses";
"DO NOT COPY AND PASTE.normalTitle" = "¿Es bueno?";
```

Xcode의 스토리보드에서 현지화를 미리 볼수 있습니다. 프로젝트 탐색기에서 `Main.stroyboard`를 선택하고 `View\Assistant Editor\Show Assistant Editor`을 사용하여 assistant editor를 엽니다. 스토리보드의 미리보기가 보여지는지 확인하세요.

![](/img/posts/Localization-7.png)

![](/img/posts/Localization-8.png)

오른쪽 하단 메뉴바에서 언어 메뉴를 클릭하고 `Spanish`를 선택합니다.

![](/img/posts/Localization-9.png)

이미지를 제외한 미리보기에서 스페인어는 다음과 같습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/12/image017.png" width="450"></center> <br> 

---

<div id='section-id-250'/>

## Internationalizing Images

앱에서 영어 텍스트가 포함된 이미지를 사용하므로 이미지 자체를 현지화하는게 필요합니다. 유감스럽게도, Apple은 모든 이미지를 asset catalog에 넣을것을 권장하지만 그 이미지를 현지화하는 직접적인 메커니즘을 제공하지는 않습니다. 하지만 걱정하지마세요 간단한 트릭이 있습니다. 

`Assets.xcassets`를 열면 현지화된 스페인어 버전의 `MeGusta`라는 이름의 이미지가 있습니다. `Localizable.strings(English)`를 열고 끝에 다음을 추가합니다.

```swift
"imageName" = "iLikeIt";
```

`Localizable.strings(Spanish)`를 열고 다음 코드를 끝에 추가합니다. 

```swift
"imageName" = "MeGusta";
```

마지막으로 `MainViewController.swift`를 열고 `viewDidLoad()`을 다음과같이 교체합니다.

```swift
override func viewDidLoad() {
  super.viewDidLoad()
  
  imageView.image = UIImage(named: NSLocalizedString("imageName",
                                                     comment: "name of the image file"))
}
```

`imageName` 키를 현지화된 버전의 이미지 이름을 되찾아 오기위해 사용하고 asset catalog 에서 이미지를 로드 합니다. 또한 `MainViewController.swift`에서 버튼 타이틀 설정을 지웠습니다. 왜냐하면 스토리보드의 현지화 설정되었기 때문입니다. 

---

<div id='section-id-281'/>

## Internationalizing Numbers 


다양한 언어로 앱을 지원하기 위해 준비하는 과정에서 많은 진척을 이루었지만, 단지 단어를 변경하는것 이상의 과정이 필요합니다. 다른 일반적인 데이터(숫자, 날짜)의 서식설정은 전세계에서 다릅니다. 예를들어 미국에서는 `1,000.00`이라고 쓸수 있습니다. 스페인에서는 `1.000,00`으로 사용합니다.

다행히, iOS는 `NumberFormatter`, `DateFormatter`같은 다양한 서식설정을 제공하여 이 모든 작업들을 수행합니다. `MainViewController.swift`를 열고 `likebuttonPressed()`의 다음을

```swift
salesCountLabel.text = String.localizedStringWithFormat(formatString, period)
```

다음과 같이 교체합니다.

```swift
let quantity = NumberFormatter.localizedString(from: 1000, number: .decimal)
salesCountLabel.text = String.localizedStringWithFormat(formatString, quantity, period)
```

숫자 1000의 현지화된 표현이 생성되고 형식화된 문자를 레이블로 할당합니다.

`Localizable.strings(English)`를 열고 두번째 `1000`을 `%@`으로 변경하세요.

```string
"You have sold 1000 apps in %d months" = "You have sold %@ apps in %d months";
```


`Localizable.strings(Spanish)`에서 똑같이 시행합니다.

```strings
"You have sold 1000 apps in %d months" = "Has vendido %@ aplicaciones en %d meses";
```

스키마의 언어 옵션이 스페인어로 설정되었는지 확인하고 빌드하고 실행하세요. 다음과 같은 내용을 확인해야합니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/12/image018.png" width="450"></center> <br> 


run scheme를 편집하고 어플리케이션 언어를 시스템 언어로 변경합니다. 다시 빌드하고 실행합니다. 이번에는 다음과 같이 보여야.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/12/image019.png" width="450"></center> <br> 

> Note: 영어가 기본 언어가 아닌 국가에 살고 있다면 쉼표로 포맷된(1,000) 콤마가 표시되지 않을수 있습니다. 이 경우에 위와 같은 결과를 얻으려면 United State로 스킴의 언어 옵션을 변경하세요.	

---

<div id='section-id-326'/>

## Pluralization

`iLikeIt`가 1000개의 앱을 판매하기 위해 1, 2, 5개월 중 하나를 무작위로 선택했음을 알았을 것입니다. 그렇지 않다면 지금 앱을 실행하고 `You like?`을 몇번 탭하여 행동을 봅니다. 영어 또는 스페인어에서 실행 하는것에 관계없이 한달이 소요됬을때의 메시지가 문법적으로 부정확하다는것을 알수 있습니다.

두려워하지 마세요. iOS는 `.stringsDict`라고 불리는 다른 현지화 파일 타입을 지원합니다. 이것은 `.strings`파일 처럼 작동하지만 단 하나의 키에 여러개의 대체값이 포함된 사전을 포함하고 있다는 점만 다릅니다.

`File\New\File` 메뉴에서 `iOS\Resource\Stringsdict` 파일을 선택하고 다음을 클릭합니다. 파일 이름을 `Localizable`으로 설정하고 생성을 클릭합니다. 펼침 삼각형을 누르면 다음과같이 볼수 있습니다.

![](/img/posts/Localization-10.png)

딕셔너리의 각 섹션이 무엇을 하는지에 대한 설명입니다.

1. `Localizaed String Key`는 하나의 현지화를 대표하는 사전이고 `NSLocalizedString(_:tableName:bundle:value:comment:)`에 의해 사용되는 키 입니다. 현지화 색인은 먼저 `.stringsdict`를 찾고 그후 거기서 아무것도 찾지 못하면 같은 `.strings`파일을 찾습니다. `.stringdict`에서 원하는 만큼 많은 키를 가질수 있습니다. `iLikeIt`은 한개만 필요합니다.
2. `Localized Format Key`는 실제 현지화 입니다 - `NSLocalizaedString(_:tableName:bundle:value:comment:)`에 의해 반환된 값. 대체(substitution)을 위해 변수를 포함할수 있습니다. 이 변수는 `%#@variable-name@`형식을 취합니다.
3. 반드시 `Localized Format Key`에 포함된 각 변수에 대한 `Variable` 사전을 반드시 포함 시켜야 합니다. 이것은 변수에 대한 규칙과 대체(rules and substitutions)를 정의합니다.
4. 변수를 위한 두개 타입의 규칙: `복수형 규칙(Plural Rule)` 과 `사이즈 규칙(Size Rule)`. 이 튜토리얼은 복수형 규칙을 다룹니다. 
5. `Number format Spectifier`는 선택사항이고 iOS 에게 대체를 위해 사용되는 값의 데이터 타입을 알려줍니다.
6. `Variable` 사전은 변수의 정확한 대체(혹은 치환)을 지정하는 하나 이상의 키를 포함합니다. 복수 규칙의 경우에만 다른 키가 요구됩니다. 다른 언어는 언어에 따라서 다릅니다.

> `stringsdict`파일 형식에 대한 더 자세한 내용은 [<U>Apple’s Internationalization and Localization Guide</U>](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPInternational/StringsdictFileFormat/StringsdictFileFormat.html)을 참조해주세요 

이 그림과 매칭시키기 위해 사전을 편집합니다. 구체적인 변경 내용은 다음과 같습니다. 

![](/img/posts/Localization-11.png)

다음은 이 사진의 구체적인 변경이 만드는 것에대한 설명입니다. 

1. `Localized String Key`의 이름을 `You have sold 1000 apps in %d months`로 변경합니다. 
2. `Localized Format Key`의 값을 `You have sold %@ apps in %#@months@`로 변경합니다. 사전에서 사용하기 위해 변수 `months`를 정의합니다. 
3. `Variable` 사전을 `months`로 이름을 변경합니다.
4. `Number Format Spectifier(NSStringFormatValueTypeKey)`를 `d`로 설정합니다. 
5. `one` 키의 값을 단수형의 형식을 원할때 이 키값을 사용하기 위해 `%d month`으로 설정합니다.
6. 모든 다른 경우에 사용하기 위해 `other` 키의 값을 `%d months`로 변경합니다. 

빈 키는 삭제할수 있지만 나중에 필요할수도 있으니 그대로 두는것이 좋습니다. Key가 비어있으면 iOS는 이것을 무시합니다.

> Note: Xcode는 일부 키와 값이 친숙하지 않은 이름으로 표시하고 문자열을 편집할때 원시값을 표시합니다. 이것은 못생겼지만 잘못된게 아닙니다. 그냥 무시하면됩니다.

이제 기본 `localizable.stringdict`을 완성했고 스페인어 버전에 추가할 준비가 되었습니다. 파일 인스펙터에서 `Localize..`를 클릭합니다.	 

`Localizable.strings`에서 했던것과 같이 Xcode는 파일의 언어를 확인하기 위해 질문합니다. 개발언어가 영어라면 기본값은 `English` 일것입니다. `Localize`를 클릭합니다. 

파일 인스펙터는 선택가능한 언어를 보여주기위해 업데이트합니다. `Spanish`옆에 체크박스를 클릭하고 파일의 스페인어 버전을 추가합니다. 

각 언어파일들을 보기위해 프로젝트 네비게이터의 `Localizable.stringdict` 옆의 펼침 삼각형을 클릭합니다. `Localizable.stringsdict(Spanish)`를 열고 다음 변경을 만듭니다.

1. **NSStringLocalizedFormatKey**: `Has vendido %@ aplicaciones en %#@months@`
2. **one**: `%d mes`
3. **other**: `%d meses`

![](/img/posts/Localization-12.png)

빌드하고 실행합니다. `You like?`를 탭하여 3개의 모든 값의 문법이 정확한지 확인할때까지 시행합니다. 그리고 코드를 조금도 변경하지 않았습니다! 복수 처리를 얻기위해 앱을 국제화하는것의 가치는 공짜입니다.

<center><img src="/img/posts/Localization-13.png" width="450"></center>

스키마의 `Application Languagu`를 `Spanish`로 변경하고 빌드하고 실행합니다. `¿Es bueno?`를 몇번 탭하여 현지화가 올바르게 작동하는지 확인합니다. 

눈치 챘겠지만 다양한 `Localizable.strings`파일에서 판매량(sales volume)을 위한 현지화를 남겨 두었지만, 이 현지화는 `Localizable.stringsdict`의 현지화로 대체 되었습니다. 

---

<div id='section-id-388'/>

## Adding Another Language

`Values` 사전 안에 왜 많은 옵션이 있는지 궁금할수 있습니다. 영어와 스페인어 같은 많은 언어가 단수형 과 복수형을 위한 하나의 형식을 가지고 있지만 다른 언어는 복수형, 소수, 제로 등 더 복잡한 규칙을 가지고 있습니다. iOS는 지원하는 언어에 대한 모든 규칙을 구현 할수 있습니다. 이 규칙에 대한 자세한 내용을 보려면 유니코드 조직이 지정한 [CLDR Language Plural Rules](http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html)를 참조해주세요.

하나 이상의 복수형이 있는 언어는 폴란드어 입니다. `iLikeIt`에 폴란드어 현지화를 추가하여 이것을 살펴볼것입니다. 이 튜토리얼에서 모든 단계를 수행하여 스페인어를 추가했으니 쉽게 수행할수 있습니다.

* **1**, 프로젝트 네비게이터에서 파란색 `iLikeIt`를 선택하고 아까와같이 `Polish` 현지화를 추가합니다.
* **2**, `Main.stroyboard`아래에 `Main.strings(Polish)`를 열고 값을 다음과같이 변경합니다. 
	- Hello 레이블 텍스트: `Cześć`
	- Sales 레이블 텍스트: `Sprzedałeś 1000 aplikacji w 20 miesięcy`
	- Like 버튼 타이틀: `Lubisz to?`

![](/img/posts/Localization-14.png)

* **3**, `Localizable.strings`아래에 `Localizable.strings(Polish)`를 열고 다음과같이 교체합니다. 

```strings
"You like?" = "Lubisz to?";
"imageName" = "LubieTo";
```

* **4**, `Localizable.stringsdict` 아래에 `Localizable.stringsdict(Polish)`를 다음과같이 변경합니다. 
	1. `NSStringLocalizedFormatKey`: `Sprzedałeś %@ aplikacji w %#@months@`
	2. `one`: `%d miesiąc` 
	3. `few`: `%d miesiące`
	4. `many`: `%d miesięcy`
	5. `other`: `%d miesiąca`

![](https://koenig-media.raywenderlich.com/uploads/2017/12/image025.png)

이게 다입니다. 스키마의 언어 옵션을 편집하고 빌드하고 실행하세요. `Lubisze to?`를 몇번 탭하여 판매 메시지와 다양한 단, 복수형을 확인합니다. 숫자 1000의 형식도 변경되었습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/12/image026.png" width="450"></center> <br> 

---

<div id='section-id-424'/>

## Localizing Your Icon

마지막으로 홈화면 아래의 표시되는 앱의 이름과 같이 앱을 완전히 전문적으로 보이게 만들수 있는 현지화 기능이 있습니다. 

이미 배운 기술을 사용하여 프로젝트에 새로운 strings 파일의 이름을 `InfoPlist.strings`으로 작성하고 추가합니다. 이것은 iOS가 기대하는 또 다른 `마법`의 이름 입니다. 자세한 내용은 [Information Property List Key Reference](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html)를 참조해주세요

다음을 `InfoPlist.strings`로 다음을 추가합니다. 

```swift
CFBundleDisplayName = "iLikeIt";
```

이제 파일을 영어로 현지화하고 스페인어, 폴란드어 현지화를 추가합니다. `InfoPlist.stirngs(Spanish)`의 표시 값을 `MeGusta`, `InfoPlist.strings(Polish)`를 `LubięTo`로 지정합니다. 

앱을 빌드하고 실행합니다. 앱을 종료하고 홈 화면을 확인하세요. 여전히 `iLikeIt`이라고 앱 이름이 표현되는걸 볼수 있습니다. 불행하게도 이 현지화를 테스트하는 유일한 방법은 시뮬레이터 자체에서 언어 설정을 변경하는 것입니다.

시뮬레이터에서 `General > Language & Region > iPhone Language` 를 선택하고 스페인어 또는 폴란드어를 선택하고 완료를 누릅니다. 그후 변경이 완료되면 앱에서 확인합니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/12/image027.png" width="450"></center> <br> 
 
---

<div id='section-id-446'/>

## Where to Go From Here? 

[여기](https://koenig-media.raywenderlich.com/uploads/2017/12/iLikeIt-complete-1.zip)에서 완성된 프로젝트를 다운받을수 있습니다. 

- Apple's [<U> About Internationalization and Localization</U>](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPInternational/Introduction/Introduction.html)
- WWDC 2017 Session 401, [<U>Localizing with Xcode 9</U>](https://developer.apple.com/videos/play/wwdc2017/401/)
- WWDC 2015 Session 227, [<U>What’s New in Internationalization</U>](https://developer.apple.com/videos/play/wwdc2015/227/)

이 두 비디오는 `stringsdicts` 파일과 사이즈 규칙, 복수형 규칙 사용하는것 또한 설명합니다. 


