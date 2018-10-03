---
layout:     post
title:      "CocoaPod, Creating a Framework for iOS "
subtitle:   "프레임 워크에서 Cocod Pod 발행까지"
date:       2018-09-14 17:45:00
author:     "MinJun"
header-img: "img/tags/CocoaPod-bg.png"
comments: true 
tags: [iOS, Swift, CocoaPod]
---

[Creating a Framework for iOS](https://www.raywenderlich.com/5109-creating-a-framework-for-ios)을 의역했습니다.

---

## Contents 

- Creating a Framework for iOS
- Getting Started 
- Creating a Framework
- Framework Set Up 
- add Code 
- Add the Framework to the Project 
- Embed Your Binary 
- Update the Code 
- Update the Storyboard 
- Live Rendering in Interface Builder
- Creating a CocoaPod
- Clean out the Project
- Install CocoaPods 
- Create the Pod 
- Pod Trunk 
- Use the Pod
- Check it Out
- Pod Organization
- Publish the Pod
- Create a Repository
- Clone the Repository
- Add the Code to the Repository
- Make the Commitment
- Tag It
- Update the Podfile
- Where to Go From Here?
- Reference 


---

## Creating a Framework for iOS

이 튜토리얼은 앱 간에 코드를 공유하고, 코드를 모듈화 하고, 제 3의 라이브러리로서 분리하는 방법을 배웁니다. 

> Update note: 이 튜토리얼은 iOS12, Xcode 10, 스위프트 4.2로 업데이트 되었습니다. 

두개 이상의 앱간에 코드를 공유하거나 다른 개발자와 프로그램의 일부를 공유하고 싶나요?

아마도 iOS SDK가 기능적으로 그 자체의 API를 분리하는것과 유사하게 코드를 모둘화 하기를 원했을 것입니다. 또는 인기있는 다른 라이브러리와 동일한 방식으로 코드를 배포하길 원할것 입니다. 이 튜토리얼에서는 프레임 워크로 위의 모든 작업을 수행하는 방법을 배웁니다.

프레임 워크는 3개의 주요한 목적을 가집니다.

- 코드 캡슐화(Code encapsulateion)
- 코드 모듈화(Code modularity)
- 코드 재사용(Code resue)

다른 앱과 함께, 팀 맴버들과, iOS 커뮤니티와 함께 프레임 워크를 공유할수 있습니다. 스위프트의 `접근 제한(access control)`과 결합되었을때, 프레임 워크가 모듈간에 강력하고 테스트 가능한 인터페이스를 정의할수 있습니다.

스위프트 용어(parlance)에서, `모듈(a module)`은 함께 배포되는 코드 그룹으로 컴파일 되어집니다. 프레임 워크는 하나의 모듈 타입 이고 앱의 또 다른 예제 입니다.

[어떻게 사용자화한 컨트롤 튜토리얼을 만드는 방법](https://www.raywenderlich.com/5294-how-to-make-a-custom-control-tutorial-a-reusable-knob)에서 개발의 한 부분을 추출합니다: 재사용 가능한 손잡이로 다음과 같은 방법으로 프레임 워크의 기능 및 장점을 배웁니다. 

- 손잡이 컨트롤을 위한 새로운 프레임 워크를 생성합니다
- 기존 코드 마이그레이션
- 모든 것을 앱으로 
- Interface Builder에서 사용자 정의한 컴포넌트 렌더링하기 
- uber-portable CocoaPod로 패키징 하기
- 보너스: 프레임워크를 위한 레포지토리 만들기

작업이 끝나면 앱은 이전과 똑같이 작동하지만 개발한 휴대용의(portable) 프레임 워크를 사용할수 있습니다. 

---

## Getting Started 

이 튜토리얼의 상단 또는 하단에 `Download Materials` 버튼을 사용하여 프로젝트를 다운받고 시작 프로젝트를 엽니다.(예제 프로젝트는 [Creating a Framework for iOS](https://www.raywenderlich.com/5109-creating-a-framework-for-ios)의 하단과 상단에 `Download materials` 버튼을 누르면 받아볼수 있습니다.

`KnobShowcase`는 믹서에서 볼수 있는 것과 같은 원형 스라이더와 같은 컨트롤과 상호 작용하는 방법을 보여주는 간단한 애플리케이션 입니다.

빌드하고 실행하면 어떻게 일하는지 알수 있습니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/04/final_navigation.gif)<br>

이 컨트롤을 위한 코드는 두개의 파일로 존재합니다

- Knob.swift는 모든 view logic을 가지고 있고
- ViewController.swift는 손잡이(knob)를 생성하고 상호작용 하기위한 책임이 있습니다.

손잡이 컨트롤은 꽤 예쁩니다. 바보 같지만 재미를 넘어서 많은 애플리케이션에서 사용하는것이 좋지 않을까요? 프레임 워크가 구출해줄겁니다.

---

## Creating a Framework

프레임 워크는 자체컨테이너(독립적인 의미) 로 재사용가능한 코드 덩어리 와 리소스 덩어리로 여러개의 앱으로 가져올수 있꼬 심지어 iOS, tvOS, watchOS 및 macOS 애플리케이션 에서 공유 할수 있습니다.

다른 언어에서 프로그래밍 했다면, 노드 모듈(node modules), 패키지(packages), 보석(jars)에 대해 들어봤을 것입니다. 프레임워크는 이것들의 Xcode 버전 입니다. iOS SDK에서 프레임워크의 일반적인 예로는 Foundation, UIKit, AVFoundation, Cloudkit이 있습니다.

> Note: 프레임 워크에 대해서 더 알고싶다면 [What are Frameworks](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WhatAreFrameworks.html)를 참조해주세요.

---

## Framework Set Up 

Xcode6에서 Apple은 접근 제한(access control)과 함께 `Cocoa Touch Framework` 템플릿을 도입 했으므로 프레임워크를 만드는 것이 결코 쉬운 것은 아닙니다. 제일 먼저 해야하는 것은 프레임 워크를 위한 프로젝트를 만드는 것입니다.

1. Xcode에서 File -> New -> Project
2. iOS -> Framework & Library -> Cocoa Touch Framework 선택

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-framework.png)<br>

3. Next 클릭
4. `Product Name` 을 `KnobControl`로 작성하고 자신만의 `Organization Name` 과 `Organization Identifer`을 사용합니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-create.png)<br>

![](

5. Next 클릭
6. 파일선택자(file chosser)에서 KnobShowcase 루트 폴더 와 같은 레벨에 프로젝트생성을 선택합니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-3.png)<br>

7. Create를 클릭합니다

이제 프레임 워크를 생성한 프로젝트(비록 구멍이 한개지만??)를 가졌습니다.

---

## add Code 

너의 현재 상태는 코드없는 프레임 워크이고 설탕이 없는 스트레이트 초콜릿 처럼 매력적입니다(?). 이 섹션에서 기존 파일을 프레임 워크에 추가한것에 의한 코드를 소개합니다.

`KnobShowcase` 소스 디렉토리에서 `Knob.swift`파일을 Xcode 에서 `KnobControl` 프로젝트로 드레그 합니다.

![gif](https://koenig-media.raywenderlich.com/uploads/2018/06/how-to-create-a-framework-ios-first-create-framework-copy.gif)<br>

`Knob.swift`가 `KnobControl` 에서 Target `Membership`을 가지고 있는지 확인하여 최종 프레임 워크에 나타나는지 확인 하세요. 파일 속성(file inspector)에서 이를 확인할수 있습니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/05/target-membership.png)<br>

빌드 경고 또는 오류 없이 Build Succeeded를 얻으려면 프레임 워크 프로젝트를 빌드하세요.

[How to Make a Custom Control tutorial](https://www.raywenderlich.com/5294-how-to-make-a-custom-control-tutorial-a-reusable-knob)을 읽었다면 `Knob.swift`는 3가지 다른 클레스를 포함하고 있는걸 상기할수 있습니다.

- Knob: 실제의 커스텀 컨트롤
- KnobREnderer: 노브 자체의 렌더링과 관련된 코드를 추적하는 개인적인(Private) 클레스 입니다. 
- RotationGestureRecognizer: `Knob`과 함께 상호작용 가능한 개인적인 클래스 입니다. 

다음 작업은 다른 파일들로 그 구성요소들을 분리하는것입니다. `KnobRenderer`에 이동하여 시작합니다. 

1. File -> New -> File 로 이동하고 iOS -> Source -> Swift File 을 선택합니다. 
2. Next 클릭 
3. 다음 스크린에서, `KnobRenderer`로 클레스 이름을 지정하고 KnobControl -> KnobControl 디렉토리를 선택합니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/05/KnobRendererCreation.png)<br>

4. Create 클릭 
5. Knob.swift를 열고 `KnobRenderer` 클레스 전체를 잘라내고(Command-X) `import Foundation`표현 아래에 `KnobRenderer.swift`을 붙여놓습니다(Command-V) 
6. `KnobRenderer`를 위한 `private` 수정자를 삭제합니다. `Knob.swift`에 모든 코드가 포함되어졌을때는 문제 없었지만, 이제는 기본 `internal modifier`를 사용하여 모듈 전체에서 접근할수 있어야 합니다.

`RotationGestureRecognizer` 클레스를 위해서 스텝 1~6를 반복합니다. 이 경우에 6개의 순서를 이동했을때 `Import UIKit.UIGestureRecognizerSubclass`도 가져와야합니다. 그렇지 않으면 컴파일러가 빌드 단계에서 불평합니다.

2개의 새로운 파일들이 생성된것과 함께 `Knob.swift`는 이제 `Knob`클레스만 포함합니다

> Note: 그들 자신의 파일로 클레스를 분류하는것은 엄밀하게는 꼭 필요한것은 아니지만 코드를 정리하는 순서에서는 좋은 연습입니다. 이해 하고 유지 하기 어려운 큰 파일을 가지길 원하지는 않을것 입니다.

---

## Add the Framework to the Project 

`KnobControl` Prject를 닫고 `KnobShowcase` 프로젝트로 돌아갑니다. Knob.swift 파일을 지우고 확인 대화창에서 `Move To Trash`를 선택합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-delete.png)<br>


프로젝트를 빌드하고 나면 Xcode에서 `Knob`가 무엇인지 알지못하는 것에 대해 불평하는 몇가지 예측 가능한 오류가 표시됩니다. 실제로 선언되지 않는 `Knob`의 사용(Use of undeclared type ‘Knob’)이라는 오류메시지가 표시됩니다.

`KnobControl` 프로임워크 프로젝트를 추가하는것은 이 문제의 해결책 입니다. 

---

## Embed Your Binary 

프로젝트 네비게이터에서 루트 `KnobShowcase` 노드에 우 클릭 합니다. `Add Files to 'KnobShowcase'`를 클릭합니다. 파일선택자에서 `KnobControl.scodeproj`로 이동하고 선택합니다. 서브 프로젝트로서 `KnobControl.xcodeproj`를 추가하고 `Add`를 클릭합니다.  

![](https://koenig-media.raywenderlich.com/uploads/2018/05/add_knobcontrol_project.png)<br>

> Note: `앱의 프로젝트`로 `프레임워크 프로젝트`를 추가하는것은 엄밀하게는 필수적인것은 아닙니다. 단지 KnobControl.framework output을 추가 하면됩니다. 
> 
> 하지만, 프로젝트를 결합시키는것은 프레임워크와 앱을 동시에 개발하기 쉽게 만들어줍니다. 프레임워크 프로젝트를 변경하면 애플리케이션에 자동으로 전달되어집니다. 또한 Xcode에서 경로를 쉽게 확인하고 프로젝트를 다시 빌드 할 시기를 알 수 있습니다.

빌드 하고 실행하면 다음과 같은 컴파일 에러를 볼수 있습니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/05/Screen-Shot-2018-05-27-at-12.12.57-PM.png)<br>

두개의 프로젝트가 함께 있더라도, `KnobShowcase`는 여전히 `KnobControl`을 얻지 못했습니다. 마치 같은 방에 앉아 있는 것처럼 보이지만 `KnobShowcase`는 새로운 프레임 워크를 볼수 없습니다.

이 문제를 고치는 것은 `앱의 target(app's target)`으로 프레임 워크를 링크해야합니다. 첫번째로 `KnobControl`프로젝트를 Products 폴더가 보이는곳까지 늘리고 난 후에 `KnobControl.framework`를 찾습니다. 이 파일은 바이너리 코드(binary code), 헤더(headers), 리소스(resources), 메타 데이터(metadata)를 패키지화한 프프레임 워크 프로젝트의 결과물(output)입니다. 

![](https://koenig-media.raywenderlich.com/uploads/2018/05/Screen-Shot-2018-05-27-at-3.13.54-PM.png)<br>

최상위 레벨 `KnobShowcase` 노드를 선택하고 project 편집자를 엽니다. `KnobShowcase` target을 클릭하고 `General` 탭으로 갑니다. 

스크롤을 내려서 `Embedded Binaries` 색션으로 갑니다. `KnobControl.xcodeproj`의 `Products` 폴더에서 `KnobControl.framework`를 이 색션으로 드레그 합니다. 

`Embedded Binaries`와 `Linked Frameworks and Binaries` 둘 안에서 프레임 워크를 추가합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-embed.png)<br>

이제 앱은 프레임 워크와 어디서 프레임 워크를 찾을수 있는지 잘 알고 있으므로 충분해야 합니다. 맞나요?

`KnobShowcase` 프로젝트를 빌드하세요. 같은 오류가 더 많습니다.

---

## Access Control 

너의 문제는 프레임 워크는 프로젝트의 부분 일지라도, 프로젝트의 코드는 눈밖에 `프레임 워크의 코드들`을 알지 못합니다. 

`ViewController.swift`로 가고 파일의 최상단에 import 라인 이후에 다음을 추가합니다

```swift
import KnobControl
```

이것은 중요하지만, 여전히 빌드 오류를 수정하지 않습니다. 이는 Swift가 접근 제어를 사용하여 다른 파일이나 모듈에서 구문들을 볼수 있는지 여부를 결정할수 있기 때문입니다.

기본적으로 스위프트는 모든것들을 `internal` 또는 해당 자체의 모듈 이내 어디에서든지 접근 가능하게 만들어집니다.

앱의 기능을 복원하려면 Knob 클래스의 접근제어를 업데이트 해야합니다. 

스위프트는 5레벨의 접근 수준을 가지고 있습니다. 자신만의 프레임 워크를 만들때 다음 규칙을 따르세요.

- `Open and public`: 앱 또는 다른 프레임 워크에서 호출할수 있는 코드(예로는 사용자화된 뷰)
- `Internal`: 프레임 워크 이내의 함수와 클래스들 사이에서 사용하는 코드(해당 뷰의 커스텀 레이어)
- `FilePrivate`: 단일 파일 이내에서 사용하는 코드(레이어 높이를 연산하는 헬퍼함수)
- `Private`: 단인 클레스 블록 또는 같은 파일에 선언된 확장 같이 둘러쌓인 선언 이내에서 사용하는 코드 

`Knob`가 Showcase 앱의 부분이었을때에는 internal 접근은 문제가 되지 않았지만, 이제 분리된 모듈에 있으므로 Knob는 앱이 사용하기 위해서 `public`이 되어야 합니다. 다음 색션에서 이것을 하게될것입니다. 

> Note: 접근제한 자에대해서 더 알고 싶거나 `open`, `public`에 차이에 대해서 더 자세하게 알고 싶다면 [Access Control Documentation](https://docs.swift.org/swift-book/LanguageGuide/AccessControl.html)을 참조해주세요

---

## Update the Code 

`KnobShowcase` 의 내부의 `Knob.swift`를 엽니다. `public` 키워드를 추가하여 아래와 같이 public class로 정의합니다

```swift
public class Knob : UIControl {
``` 

`Knob`는 `KnobControl`프레임 워크를 가져온(import)한 어떤 파일에서든지 보입니다. 

이제 `public`키워드를 다음에 추가합니다

- `minimumValue`, `maximumValue`, `value`, `isContinuous`, `lineWidth`, `startAngle`, `endAngle`, `pointerLength` and `color`. 해당 값들은 `public`이 되고 setter는 계속해서 `private`가 됩니다.
- 2개의 `init` 함수들 
- `setValue(_:animated:)` 와 `tintColorDidChange()` 메소드

> Note: 왜 init 메소드를 public으로 선언해야하는지 궁금할것입니다. Apple은 접근제어 문서에서 더 세밀한 포인트를 설명해놓았습니다. 

이제 빌드하고 시작합니다. 좋은 소식은 모든 애러가 사라졌고 나쁜 소식은 다음과같은 런타임 에러를 얻습니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-crash.png)<br>

무슨일이야? 이 크러쉬를 고치기위해 다음 색션으로 가보자

---

## Update the Storyboard 

스토리 보드를 사용할때 사용자화된 클레스의 참조는 `Identiy inspector`에서 설정된 클래스 이름과 모듈 모두 가져야 합니다.

이 스토리보드가 생성되어졌을당시, `Knob`는 앱의 모듈 이었지만 이제는 프레임워크 입니다. 

사용자화 뷰를 찾은 위치를 이야기하는것으로 스토리 보드를 업데이트 합니다. 

1. `KnobShowcase` 프로젝트에 `Main.Stroyboard` 를 엽니다
2. `document ouline`에서 `Knob`를 선택합니다
3. `Identiy inspector`에서 `Custom Class`아래에서 모듈을 아래에 이미지같이 `KnobControl` 로 변경합니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-storyboard-1.png)<br>

빌드하고 실행하면 `knob`를 얻을수 있습니다.

축하합니다! 이제는 작동하는 표준 독립형 프레임워크와 이것을 사용하는 앱을 가졌습니다.

---

## Live Rendering in Interface Builder

너의 프레임 워크에 하나의 제한은 인터페이스 빌더를 통해서 커스텀 컨트롤의 외형을 사용자화 할수 없다는 것입니다. 

`Main.storyboard`를 열면, `Knob`대신 빈 사각형을 볼수 있습니다. 파란색 상자가 보이지 않는다면 `Editor -> Canvas -> Show Bounds -> Rectangles` 를 켜주세요.

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-blank.png)<br>

프레임 워크를 사용하는 사용자가 프로그래밍 방식으로나 시각적으로 Knob의 속성을 변경하도록 하려면 라이브 뷰(Live Views)를 사용해야합니다. 라이브 뷰는 실행중인 앱에서와 같이 IB에 표시되는 뷰입니다.

`Knob.swift`를 열고 `Knob`정의 앞에 `@IBDesignable`을 추가합니다. 

```swift
@IBDesignable public class Knob: UIControl {
```

이 표기(annotation)는 인터페이스 빌더에서 프로젝트가 라이브 랜더링(live-rendering)이 가능하도록 지시합니다. 

`Main.storyboard`를 열고 변경되어진 어떤것도 볼수 없습니다. 여전히 비어있는 사각형을 가지고 있습니다. 

걱정하지마세요! 애플은 `prepareForInterfaceBuilder()` 메소드를 제공하고 이 메소드는 인터페이스 빌더 내부에서 렌더링 할때만 호출 됩니다. 

`Knob.swift`의 맨 끝으로 스크롤하고 다음 코드를 추가합니다. 

```swift
extension Knob {
  public override func prepareForInterfaceBuilder() {
    super.prepareForInterfaceBuilder()

    renderer.updateBounds(bounds)
  }
}
```

여기서는 Knob의 bounds를 보이게 설정합니다. 

`Main.stroyboard`를 열고 `Editor -> Automatically Refresh Views` 선택되어 있는지 확인하세요. 이제 빈 사각형이 앱을 실행할 때마다 나타나는 Knob로 바뀌어 있습니다. 

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-live.png)<br>

Knob를 볼수 있어서 좋지만 그들의 속성값을 위한 외형 구성을 원합니다. 컬러, 라인 두께, 포인트 넓이 등등..

`@IBInspectable`가 이 문제에서 해방시켜 줍니다. 이러한 속성에 해당 문법 표현을 추가하면 인퍼페이스 빌더가 속성 관리자에서 속성을 구성하 도록합니다. 

`Knob.swift`를 열고 `lineWidth`, `pointerLength`, `color` 앞에 `@IBInspectable` 해당 표현을 놓습니다. 

`Main.stroyboard`로 돌아가서 Knob control를 선택하고 view `Attributes inspector`를 선택하면 인터페이스 빌더는 `Knob` 라는 새로운 패널을 생성합니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-panel-1.png)<br>

이 필드를 사용하면 라이브 컨트롤이 변경되는 모양이나 색상을 볼수 있습니다. 

---

## Creating a CocoaPod

[CocoaPods](https://cocoapods.org/)는 iOS 프로젝트를 위한 유명한 의존성 매니저 입니다. 종속을 관리하고 버전을 관리하는 도구입니다. 프레임 워크와 마찬가지로 CocoaPod 또는 간략하게 pod 는 코드와 리소스는 물론, 메타 데이터, 종속성, 라이브러리 설정을 포함합니다. CocoaPod는 기본 엡(main app)에 포함되어진 프레임워크가 내장되어진 형태로 만들어졌습니다.

누구나 라이브러리 및 프레임 워크를 다른 iOS 앱 개발자에게 공개된 공개 저장소(public repository)에 제공할수 있습니다. `Alamofire`, `Charts`, `RxSwift`와 같은 널리 사용되는 제3의 프레임워크 코드를 `pod`로 배포합니다.

다음은 주의해야 할 사항입니다: 프레임 워크를 pod로 만들어 코드 배포(distributing the code, 종속성 결정(resolving the dependencies), 프레임워크 소스를 포함하고 빌드하고 또는 광범위한 개발 커뮤니티와 손쉬운 공유를 위한 메커니즘을 제공합니다.

계속 따라했다면 다음 색션으로 진행하여 CocoaPod를 만드는 것이 좋습니다. 

---

## Clean out the Project

`KnobShowcase`에서 `KnobControl` 프로젝트로 현재 연결을 지우려면 다음 단계를 수행하세요.

1. 프로젝트 네비게이터 에서 `KnobControl.xcodeproj`을 선택하고 지웁니다. 
2. `pod`를 만들고 파일을 디스크에 보관해야 하기 떄문에, 확인 대화창에서 `Remove Reference`을 선택합니다.

---

## Install CocoaPods 

이전에 CocoaPods를 한번도 사용해본적이 없다면 더 가기 전에 잠깐의 설치 과정이 필요합니다. [여기](https://guides.cocoapods.org/using/getting-started.html#installation) 로 가고 설치가 끝났다면 다시 돌아오세요. 

---

## Create the Pod 

터미널을 열고 `cd`를 사용하여 `KnobControl` 루트 디렉토리로 갑니다. 그리고 다음의 커맨드 라인을 따라합니다.

```
pod spec create KnobControl
```

위의 명령어는 현재의 디렉토리에`KnobControl.podspec`파일을 생성합니다. 이것은 pod를 설명하는 템플릿 및 pod를 빌드 하는 방법입니다. 원하는 텍스트 편집기에서 이것을 엽니다.

템플릿은 충분한 주석 설명과 일반적으로 사용하는 세팅을 위한 제안이 있습니다. 

1. 전체 `Spec Metadata` 섹션을 다음으로 대체하세요.

```
s.name         = "KnobControl"
s.version      = "1.0.0"
s.summary      = "A knob control like the UISlider, but in a circular form."
s.description  = "The knob control is a completely customizable widget that can be used in any iOS app. It also plays a little victory fanfare."
s.homepage     = "http://raywenderlich.com"
```

일반적으로 `설명(description)`은 좀더 `구체적이고(descriptive)` `홈페이지(homepage)`는 프레임 워크의 프로젝트 페이지를 가리킵니다. 

2. iOS 프레임 워크 튜토리얼 코드는 [MIT 라이센스](https://opensource.org/licenses/MIT)를 사용하므로,`Spec License` 섹션을 다음 아래의 코드로 대체합니다

```
s.license      = "MIT"
```

3. `작성자 메타 데이터(Author Metadata)` 섹션을 있는 그대로 유지하거나 크레딧을 받고 연락받을 방법을 설정하세요.
4. `platform Spectifics` 아래 코드처럼 교체하세요, 왜냐하면 이것은 iOS 만 사용하는 프레임워크 입니다.

```
s.platform     = :ios, "12.0"
```

5. `Source Location`를 아래의 코드로 교체하세요. pod를 공유할 준비가 되었을때, 이것은 GitHub 레포지토리를 링크하고 이 버전을 위한 tag를 커밋합니다. 

```
s.source       = { :path => '.' }
```

6. `Source Code색션을 다음과같이 교체합니다

```
s.source_files = "KnobControl"
```

7. `end`행 바로 위에 다음 행을 추가하세요. 이 행은 애플리케이션 프로젝트가 이 pod의 코드는 Swift 4.2를 위해 작성되었다는걸 이해합니다.

```
s.swift_version = "4.2" 
```

8. `#`로 시작하는 모든 코맨트를 삭제합니다.

이제 개발 가능한 `Podspec`을 가지게 되었습니다🎉

> Note: 터미널의 `Podspec`를 확인하기 위해 `pod spec lint`를 실행하면 소스(source)가 유효한 URL로 설정되지 않았기 때문에 오류가 표시됩니다. 프로젝트를 GitHub에 푸시하고 해당 링크를 수정하면 통과하게 됩니다. 그러나 `linter pass`는 로컬 pod 개발을 위한 필수사항은 아닙니다. 아래를의 창을 참조합니다.

---

## Pod Trunk 

> 예외: 위의 과정 까지 따라한후, `pod spec lint`를 임의로 수정하여 pass에 성공했다면 cocoapod trunk에 등록 하고 push 하면 제 3의 라이브러리 처럼 프레임 워크를 사용할수 있습니다
>
> CocodPoads Trunk는 인증(authentication 과 CocoaPods API 서비스 입니다. 새롭게 게시하거나 업데이트된 라이브러리를 CocoaPod에 게시하려면 Trunk에 등록하고 현재 장치에 유효한 Trunk 세션을 가져야합니다. 블로그에서 트렁크의 역사와 개발, 자신의 팀이나 개인의 pod에 대해서 읽을수 있습니다. 더 자세한 내용은 [https://guides.cocoapods.org/making/getting-setup-with-trunk.html](https://guides.cocoapods.org/making/getting-setup-with-trunk.html)를 참조해주세요.

1. CocoaPod의 trunk에 podSpec파일을 올려야 합니다. 그전에 CocoaPods에 trunk를 등록합니다 
	- `pod trunk register [E-mail] [Name] --description= '[information]'`
	- 해당 내용을 커맨드 라인에 작성하면 해당 메일로 세션을 등록하라고 합니다. 메일로 가서 해당 내용을 확인합니다. 
2. pod trunk push [podSpec file name]

<center><img src="/img/posts/HowToCreate.png" width="500" height="350"></center> <br>


위의 이미지와 같이 성공입니다. 이제 pod를 사용하여 다른 라이브러리 처럼 사용할수 있습니다. 


---

## Use the Pod

이 시점에서, 당신은 pod를 준비하고 있습니다. `KnobShowcase` app에 구현하고 테스트 해보세요.

터미널로 돌아가서, `KnobShowcase` 디렉토리로 이동하고 다음 코드를 실행합니다.

```
pod init
```

이렇게하면 앱이 사용하는 모든 버전 및 옵션 구성 정보를 나열하는 `Podfile`이라는 새 파일이 은밀하게 만들어집니다. 

이렇게 하면 앱이 사용하는 `Podfile`이라고 불리는 앱이 사용하는 모든 pods 목록을 가져오고 버전 및 선택적 구성 정보도 함께 제공 됩니다.

텍스트 편집기에서 `Podfile`을 열고 전체 내용을 다음과 같이 변경 합니다.

```
platform :ios, '12.0'

target 'KnobShowcase' do
  use_frameworks!

  pod 'KnobControl', :path => '../KnobControl'

end

# Workaround for Cocoapods issue #7606
post_install do |installer|
    installer.pods_project.build_configurations.each do |config|
        config.build_settings.delete('CODE_SIGNING_ALLOWED')
        config.build_settings.delete('CODE_SIGNING_REQUIRED')
    end
end
```

터미널에서 파일을 저장하고 실행합니다

```
pod install
```

이 명령을 사용하여 Cocoa Pods 저장소를 검색하고 Podfile 기준과 일치하는 새로운 또는 업데이트된 pod 파일을 다운로드 합니다. 또한 종속성을 해결하고 Xcode 프로젝트 파일을 업데이트하면 pod를 빌드하고 링크하는 방법을 알고 있으며 다른 필수 구성을 수행합니다. 

마지막으로 `KnobShowcase.xcworkspace` 파일을 생성합니다. 앱과 모든 pods의 참조를 가지고 있는 프로젝트를 열어서 이 파일을 사용하세요.

`KnobShowcase`와 `KnobControl` 프로젝트를 닫고 `KnobShowcase.xcworkspace`를 엽니다. 

> Note: `pod install` 러닝 이후에 다음과같은 위험 메시지를 받습니다. 

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-warnings-2.png)<br>

> 이것들을 고치는것은, Knobshowcase 루트 노드를 선택하고 KnobShowcase target을 선택하세요. Build Setting 탭으로 전환하고 검색 필드에서 `ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES`을 찾습니다. 해당 빌드 설정에 대한 팝업을 클릭하고 Other..을 선택합니다. 대화상자의 내용을 `$(inherited)`로 전환합니다. 
> 
> pod를 다시 설치하세요. 이제 경고 메시지가 사라집니다!

---

## Check it Out

빌드하고 실행합니다. 마술같이, 앱이 이전과 똑같이 작동해야 합니다. 컨트롤을 당기는 것ㄷ은 다음 두가지 이유로 빠릅니다.

1. `KnobControl`는 이미 프레임 워크이고 이미 이것을 가져 왔습니다. 
2. CocoaPods는 무거운 빌딩 작은과 프레임워크 패키징 작업을 합니다. 또한 임베딩 및 링클르 둘러싼 모든 비즈니스를 처리합니다

---

## Pod Organization

`Pods` 파일을 살펴보면 두가지 목표를 알수 있습니다. 


![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-pods-targets.png)<br>

- Pods-KnobShowcase: 그들 자체의 프레임 워크로 pod 프로젝트는 모든 개인적인 pods들을 빌드하고 각각의 pod 들을 하나의 단일한 `Pods-KnobShowcase` 으로 묶습니다.
- KnobControl: 이것은 자체적으로 빌드하는데 사용된 것과 동일한 프레임워크 논리를 복제합니다(CocoaPod짱..)

프로젝트 organizer 몇몇의 여러 그룹들을 볼수 있습니다. `KnobControl`은 개발 Pods(development pod) 기반이고, 이것은 개발 Pod 입니다 왜냐하면 앱의 `Podfile`에 `a:path` link와 함께 Pod를 정의했기 때문입니다. 메인 엡 코드와 함께 나란히 개발하고 편집할수 있습니다

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-pods-structure.png)<br>

저장소에서 가져온 Pods는 Pods 디렉토리에서 나타나고 Pods 그룹에 나열됩니다. 변경한 내용은 저장소로 푸시되지 않으며 pods를 업데이트 할때마다 `덮어 씁니다(overwritten)`

만세! 이제 CocoaPod를 만들고 배포 했습니다. 먼저 Pod에 무엇을 포장해야할지 생각하고 있을 것입니다. 

여기에서 자신을 축하하는것을 멈추고, 여기서부터 어디로 가야할지 생각합니다. 

---

## Publish the Pod

이 색션에서는 pod를 GitHub에 게시하고 타사 프레임 워크(third part framework) 처럼 사용하는 방법으로 걸아갑니다.

---

## Create a Repository

GitHub 계정을 가지고 있지않다면 [여기](https://github.com/)에서 만들수 있습니다.

이제 pod를 호스팅할 새 저장소를 만듭니다. `KnobControl`이 이름에 가장 잘 어울리지만 원하는 다른 이름으로 지정할수 있습니다. `.gitignore` 언어로서 Swift를 선택하고 라이센스로 MIT를 선택합니다.

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-new-repo-1.png)<br>

Create repository를 클릭합니다. 다음에 나오는 대시보드 페이지에서 `Clone`은 클릭하거나 `HTTPS` 링크를 복사하고 다운로드 합니다. 이것은 다음 색션에서 사용할 `URL` 값입니다.

---

## Clone the Repository

터미널로 돌아가서 KnobShowcase 루트에 새 디렉토리를 만듭니다. 다음 명령은 `repo` 디렉토리를 작성하고 탐색합니다.

```
mkdir repo
cd repo
```

거기에 GitHub 레포지토리를 `복제(Clone)`하세요. 아래 URL을 GItHub 페이지의 HTTPS 링크로 변경합니다. 

```
git clone URL
```

이것은 Git 폴더를 준비하고 미리 생성된 파일들을 카피합니다. 복제 연산은 다음처럼 보입니다.

```swift
Cloning into 'KnobControl'...
remote: Counting objects: 4, done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 4 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (4/4), done.
```

---

## Add the Code to the Repository

그런 다음 루트 KnobControl 디렉토리의 컨텐츠를 repo/KnobControl 디렉토리에 복사합니다.

KnobControl.podspec의 복사된 버전을 열고 `s.source` 행을 다음으로 업데이트 합니다.

```
s.source       = { :git => "URL", :tag => "1.0.0" }
```

URL은 자신의 레포지토리 주소를 링크합니다. 

> 여기서 주의사항은 URL 주소 마지막에 `.git`을 붙여주어야 합니다. 

---

## Make the Commitment

이제 진짜가 되었습니다. 이 단계에서 GitHub에 코드를 commit, push 합니다. 나의 작은 pod가 큰 아이들 풀장에 드어가려고 합니다. 

터미널에서 다음 명령을 실행하여 저장소에 파일을 커밋하고 다시 서버로 푸시합니다.

```
cd KnobControl/
git add .
git commit -m "Initial commit"
git push -u origin master
```

GitHub 페이지로 방문하고 모든 파일들을 보려면 새로고침 합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2018/05/how-to-create-a-framework-ios-first-create-framework-repo-files.png)<br>

---

## Tag It


`KnobControl.podspec`에서 다음과같이 `version`을 세팅 합니다.

```
s.version      = "1.0.0"
```

버전이 매칭되려면 레포지토리에 테그가 필요합니다. 테그를 세팅하고 아래의 커맨드를 실행합니다

```
git tag 1.0.0
git push --tags
```

다음을 실행하고 작업을 확인합니다. 

```
pod spec lint
```

당신이 찾는 응답은 `KnobControl.podspec passed validation` 입니다. 

> Note: iOS 12 시뮬레이터는 사용할수 없는 애러를 얻었다면 `sudo xcode-select -p path-to-your-Xcode-10.`를 사용하여 Xcode10을 기본 Xcode로 설정해야합니다. 

---

## Update the Podfile

`KnobShowcase` 디렉토리에 있는 `Podfile`을 보고 path가 local pod를 가리키고 있음을 알수 있습니다.

```
pod 'KnobControl', :path => '../KnobControl'
```

위의 라인을 다음과같이 변경합니다.

```
pod 'KnobControl', :git => 'URL', :tag => '1.0.0'
```

`URL`을 GitHub링크로 교체하고 완료했되면 저장하세요. 그러면 KnobShowcase는 발행된 pod를 사용합니다.

터미널에서 `KnobShowcase`디렉토리에서 이것을 실행합니다

```
pod update
```

이제 코드는 GitHub 레포지토리에서 프레임워크를 가져오고 더이상 개발 pod(development pod)가 아닙니다! 

---

## Where to Go From Here?

이 iOS 프레임 워크 튜토리얼 에서 처음부터 프레임워크를 만들어 앱에 가져와서 CocoaPod로 변환했습니다 축하합니다🎉        

튜토리얼 상단이나 하단에 있는 버튼을 사용하여 최종 프로젝트를 다운로드 할수 있습니다. GitHub 저장소를 설정하는 단계는 개인 계정 정보에 따라 다르므로 발행된 CocoaPod는 포함하지 않습니다.

---

## Reference 

[CocoaPods Tutorial for Swift: Getting Started](https://www.raywenderlich.com/626-cocoapods-tutorial-for-swift-getting-started)<br>
[How to Create a CocoaPod in Swift](https://www.raywenderlich.com/5823-how-to-create-a-cocoapod-in-swift)<br>
[https://cocoapods.org/](https://cocoapods.org/)<br>
[CocoaPods Trunk](http://blog.cocoapods.org/CocoaPods-Trunk/)<br>
 



