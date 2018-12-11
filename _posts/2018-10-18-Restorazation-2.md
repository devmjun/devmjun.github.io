---
layout:     post
title:      "Swift. App의 보존과 복원 가이드"
subtitle:   "Preserving and Restoring State. Restoration Part: 3"
date:       2018-10-18 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Restoration]
---

[Preserving and Restoring State](https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/PreservingandRestoringState.html#//apple_ref/doc/uid/TP40007457-CH28-SW1)에서 필요한 부분을 의역 했습니다.

---

## Table of contents 

  - [<U>Preserving and Restoring State</U>](#section-id-12)
  - [<U>Tagging View Controllers for Preservation</U>](#section-id-29)
    - [<U>Choosing Effective Restoration Identifiers</U>](#section-id-35)
    - [<U>Excluding Groups of View Controllers</U>](#section-id-45)
    - [<U>Preserving a View Controller’s Views</U>](#section-id-62)
  - [<U>Restoring View Controllers at Launch Time</U>](#section-id-76)
  - [<U>Encoding and Decoding Your View Controller’s State</U>](#section-id-108)
  - [<U>Tips for Saving and Restoring Your View Controllers</U>](#section-id-141)

  
---

<div id='section-id-12'/>

## Preserving and Restoring State 

뷰 컨트롤러는 상태 복원과 상태 보존에서 중요한 역활을 합니다. 상태 보존(State preservation)은 앱이 중지되기전에(suspended) 앱 구성을 기록하여 차후에 앱이 시작되었을때 구성이 복원되어질수 있도록 합니다. 앱을 이전 구성으로 반환하면 UX를 개선하여 유저에게 더 좋은 앱 환경을 제공하고 시간을 절약합니다.

보존및 복원 처리는 대부분 자동으로 처리되지만, iOS에게 보존해야할 부분을 이야기 해야합니다. 앱의 뷰 컨트롤러를 보존하는 단계는 다음과같습니다.

- (필수) 복원하길 원하는 구성의 뷰 컨트롤러에게 복원 식별자를 할당합니다.[<U>Tagging View Controller for Preservation</U>](https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/PreservingandRestoringState.html#//apple_ref/doc/uid/TP40007457-CH28-SW2)
- (필수) iOS에게 앱이 시작되었을때 새로운 뷰 컨트롤러 객체의 위치를 어떻게 지정할지, 어떻게 생성할지 알려줍니다.; [<U>ReStoring View Controller at Launch Time</U>](https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/PreservingandRestoringState.html#//apple_ref/doc/uid/TP40007457-CH28-SW5)
- (선택) 각 뷰 컨트롤러는 그 자체의 원래 구성을 반환하는 뷰 컨트롤러를 반환하기 위해 특정 데이터의 구성을 저장해야합니다. [<U>Encoding and Decoding Your View Controller's State</U>](https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/PreservingandRestoringState.html#//apple_ref/doc/uid/TP40007457-CH28-SW6)

보존 및 복원 처리에 대한 개요는 [<U>Strategies for Implementing Specific App Features</U>](https://developer.apple.com/library/archive/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/StrategiesforImplementingYourApp/StrategiesforImplementingYourApp.html#//apple_ref/doc/uid/TP40007072-CH5-SW20)를 참조해주세요

---

<div id='section-id-29'/>

## Tagging View Controllers for Preservation

UIKit은 보존하기 위해 지정한 뷰 컨트롤러만 보존합니다. 각 뷰 컨트롤러는 [restorationIdentifier](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621499-restorationidentifier)속성을 갖고 있고 기본적으로 이 값은 `nil` 입니다. 이 속성을 유효한 문자열로 설정하면 UIKit에서 `뷰 컨트롤러`와 해당 `뷰`를 보존(preserve)합니다. 복원 식별자는 프로그래밍 방식 또는 스토리보드 파일에서 할당할수 있습니다. 

복원 식별자를 할당할때, 뷰 컨트롤러 계층에 있는 부모 뷰 컨트롤러 또한 복원 식별자를 가지고 있어야합니다. 복원 처리 하는 동안 UIKit은 window의 root 뷰 컨트롤러에서 시작하여 뷰 컨트롤러 계층을 탐색합니다. 계층의 뷰 컨트롤러가 복원 식별자를 가지지 않았다면, 뷰 컨트롤러와 해당 뷰 컨트롤러의 자식 뷰 컨트롤러, 표시된 뷰 컨트롤러(presented view controller)는 무시되어 집니다.

<div id='section-id-35'/>

### Choosing Effective Restoration Identifiers

UIKit은 복원 식별자 문자열을 사용하여 나중에 뷰 컨트롤러를 다시 작성하므로 코드에서 쉽게 식별할수 있는 문자열을 선택하세요. UIKit에서 뷰 컨트롤러중 하나를 자동으로 만들수 없는 경우, 뷰 컨트롤러 및 모든 상위 뷰 컨트롤러의 복원 식별자를 제공하여 뷰 컨트롤러를 만들것을 요청합니다. 이 식별자 체인은 각 뷰 컨트롤러를 위한 복원 경로를 대표하고 요청된 뷰 컨트롤러가 어떻게 결정되어지는지에 대한 방법 입니다. 복원경로는 root 뷰 컨트롤러에서 시작하여 요청된 모든 뷰 컨트롤러를 포함합니다.

복원 식별자는 종종 뷰 컨트롤러의 클레스 이름입니다. 많은 장소에서 같은 클레스 이름을 사용한다면, 의미있는 값을 할당할수 있습니다. 예를 들어 뷰 컨트롤러가 관리하는 데이터를 기반으로 문자열을 할당할수 있습니다.

모든 뷰 컨트롤러의 복원 경로는 고유해야합니다. 컨테이너 뷰 컨트롤러에 두개의 자식이 있는 경우 컨테이너는 각 자식에게 고유한 복원 식별자를 할당해야합니다. UIKit의 일부 컨테이너는 자동으로 그들의 자식 뷰 컨트롤러들의 명확한 차이를 보여주고, 각 자식에 대해 동일한 복원 식별자를 사용할수 있도록 합니다. 예를들어 `UINAvigationController` 클레스는 탐색 스텍의 위치를 기반으로 각 자식에 정보를 추가합니다. 주어진 뷰 컨트롤러의 동작에 대한 추가적인 정보는 해당 클레스의 문서를 참조해주세요.

복원 식별자를 어떻게 사용하는지, 뷰 컨트롤러를 생성하는 복원 경로는 어떻게 사용하는지에 대해서 알고 싶다면 [Restoring View Controlelr At Launch Time](https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/PreservingandRestoringState.html#//apple_ref/doc/uid/TP40007457-CH28-SW5)을 참조해주세요.

<div id='section-id-45'/>

### Excluding Groups of View Controllers

복원 처리에서 뷰 컨트롤러의 전체 그룹을 제외하려면 상위 뷰 컨트롤러의 복원 식별자를 `nil`로 설정하세요. 그림 7-1은 복원 식별자를 nil로 설정하면 뷰 계층 구조에 어떤 영향을 미치는지 보여줍니다. 보존 데이터가 없으므로 이후에 뷰 컨트롤러가 복원되지 않습니다.


> 그림 7-1 자동으로 보존처리에서 뷰 컨트롤러를 제외합니다.

![](/img/posts/ViewController-Restoration-0.png)

하나 이상의 뷰 컨트롤러를 제외하는것은 차후 복원동안 그들 전체가 제거되지 않습니다. 그림 7-2와 같이 앱의 기본 설정에 포함된 모든 뷰 컨트롤러가 생성됩니다. 앱이 시작할때 기본 구성으로 다시 설정되지만 여전히 생성됩니다.

> 그림 7-2 뷰 컨트롤러의 기본 설정 로드

![](/img/posts/ViewController-Restoration-1.png)

자동 보존 처리에서 뷰 컨트롤러를 제외해도 수동으로 보존하지 못하는것은 아닙니다. 복원 아카이브에서 뷰 컨트롤러로 참조를 저장하는것은  뷰 컨트롤러와 해당 상태 정보가 보존 됩니다. 예를들어 그림 7-1의 앱 델리게이트가 3개의 네비게이션 컨트롤러 자식뷰를 저장한 경우, 이들 상태는 보존 되어 집니다. 복원 하는동안 App Delegate는 뷰 컨트롤러를 다시 만들고 네비게이션 컨트롤러의 스텍으로 push 할수 있습니다.

<div id='section-id-62'/>

### Preserving a View Controller’s Views

어떤 뷰들은 뷰와 관계된 추가적인 상태 정보를 가집니다. 하지만 부모 뷰 컨트롤러는 추가 상태 정보가 없습니다. 예를 들어 스크롤뷰는 보존하길 원하는 스크롤 위치를 가집니다. 뷰 컨트롤러가 스크롤뷰의 컨텐츠를 제공하는 역할을 하는 동안 스크롤뷰 자체는 시각적 상태를 보존해야합니다. 

뷰의 상태를 저장하기 위해 다음의 것들을 해야합니다. 

- 뷰의 유효한 문자열을 뷰의 [<U>restorationIdentifier</U>](https://developer.apple.com/documentation/uikit/uiview/1622494-restorationidentifier)속성에 할당해야 합니다. 
- 뷰 컨트롤러에서 사용하는 뷰 또한 유효한 복원 식별자를 가집니다. 
- 테이블뷰와 컬렉션뷰는 [<U>UIDataSourceModelAssociation</U>](https://developer.apple.com/documentation/uikit/uidatasourcemodelassociation)프로토콜을 체택하는 데이터 소스를 할당합니다.

복원 식별자를 뷰에 할당하여 UIKit에게 보존 아카이브로 뷰의 상태를 기록해야한다고 이야기합니다. 뷰 컨트롤러가 이후에 복원되어질때 UIKit 또한 복원 식별자를 가진 뷰의 상태를 복원 합니다. 

---

<div id='section-id-76'/>

## Restoring View Controllers at Launch Time

앱 실행시 UIKit은 앱을 이전 상태로 복원을 시도합니다. 이때 UIKit은 앱에서 유저 인터페이스를 보존한 뷰 컨트롤러 객체를 생성(또는 locate) 하도록 앱에게 요청합니다. UIKit은 뷰 컨트롤러를 찾을때 다음 순서로 검색합니다.

1. `뷰 컨트롤러가 복원 클레스를 가졌다면, UIKit은 뷰 컨트롤러를 제공하기 위해 클레스에게 요청합니다.`: UIKit은 뷰 컨트롤러를 찾기위해 복원 클레스와 연관된 [<U>viewControllerWithResotrationIdentifierPath:coder:)</U>](https://developer.apple.com/documentation/uikit/uiviewcontrollerrestoration/1616859-viewcontroller) 매소드를 호출합니다. 
2. `뷰 컨트롤러가 복원 클레스를 가지지 않았다면, UIKit app delegate에게 뷰 컨트롤러를 제공하라고 요청합니다`: UIKit은 복원 클레스가 없는 뷰 컨트롤러를 찾아 앱 델리게이트의 [<U>application:viewcontrollerWithRestorationIdentifierPath:coder:</U>](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623062-application) 메소드를 호출합니다. 
3. `뷰 컨트롤러가 올바른 복원 경로가 이미 존재한다면, UIKit은 이 객체를 사용합니다.` 앱을 실행할때 앱이 뷰 컨트롤러를(프로그래밍 형식 또는 스토리보드 형식에 의해서) 생성하고 이 뷰 컨트롤러들은 복원 식별자를 가지고 있고 UIKit은 이 복원 경로를 기반으로 암묵으로 이들을 찾습니다.
4. `뷰 컨트롤러가 스토리보드 파일에서 원형으로 로드되었다면, UIKit은 이 뷰 컨트롤러를 생성하고 위치를 찾기위해 저장된 스토리보드 정보를 사용합니다.` UIKit은 복원 아카이브 내부에 뷰 컨트롤러의 스토리보드에 대한 정보를 저장합니다. 복원시 UIKit은 같은 스토리보드 파일을 찾기위해 이 정보를 사용하고 이것에 일치하는 뷰 컨트롤러를 인스턴스화 합니다(다른 방법으로 뷰 컨트롤러를 찾을수 없는 경우 해당 뷰 컨트롤러를 인스턴스화 합니다)

복원 클레스를 뷰 컨트롤러에 할당하면 UIKit에서 해당 뷰 컨트롤러를 암시적으로 검색할수 없게 합니다. 복원 클레스를 사용하면 실제로 뷰 컨트롤러를 만들지 여부를 제어할수 있습니다. 예를들어 `viewControllerWithRestorationIdentifierPath:coder:` 메소드는 뷰 컨트롤러를 다시 만들지 않아야 한다고 결정하면 nil을 반환할수 있습니다. 복원 클레스가 없을때 UIKit은 뷰 컨트롤러를 찾거나 만들수 있는 모든 작업을 수행하고 복원합니다.

복원클레스를 사용할때 `viewControllerWithResotrationIdentifierPath:coder:` 매소드는 클레스의 새로운 인스턴스를 생성해야하고 최소한의 초기화를 수행하고 결과객체를 반환해야 합니다. 코드 7-1은 스토리보드에서 뷰 컨트롤러를 로드하는 방법을 보여줍니다. 뷰 컨트롤러가 스토리보드에서 로드 되었기 때문에 이 메소드는 [UIstateRestorationViewControllerStoryboardkey](https://developer.apple.com/documentation/uikit/uiapplication/1616861-staterestorationviewcontrollerst)를 사용하여 아카브에서 스토리보드를 가져옵니다. 이 메소드는 뷰 컨트롤러의 데이터 필드를 구성하지 않습니다. 그 단계는 뷰 컨트롤러의 상태가 디코드 되어질때 이루어집니다.

> 코드 7-1

```swift
static func viewController(withRestorationIdentifierPath identifierComponents: [String], coder: NSCoder) -> UIViewController? {
    var vc: MyViewController?
    let sb = coder.decodeObject(forKey: UIApplication.stateRestorationViewControllerStoryboardKey) as? UIStoryboard
    if sb != nil {
        vc = sb?.instantiateViewController(withIdentifier: "MyViewController") as? PushViewController
        vc?.restorationIdentifier = identifierComponents.last
        vc?.restorationClass = MyViewController.self
    }
    return vc
}
```

복원 식별자와 복원 클레스를 재 할당하는것은 뷰 컨트롤러가 수동으로 재 생성되었을때 채택하기 위한 좋은 습관입니다. 복원 식별자를 복원하는 가장 간단한 방법은 `identifierComponenets` 배열의 마지막 아이템을 가져오고 이것을 뷰 컨트롤러로 할당하는 것입니다. 

앱을 실행할때 앱의 메인 스토리보드 파일에서 생성했던 객체의 경우, 각 객체의 새로운 인스턴스를 생성하지 않습니다. UIKit은 이 객체를 암묵적으로 찾거나, 앱 델리게이트의  `application:viewControllerWithRestorationIdentifierPath:coder` 매소드를 사용하려 기존 객체를 찾습니다. 

---

<div id='section-id-108'/>

## Encoding and Decoding Your View Controller’s State

보존이 예정된 각 객체의 경우 UIKit은 상태 저장할 기회를 제공하기 위해 `encodeRestorableStateWithcoder:`를 호출합니다. 보존 처리 동안 UIKit은 `decodeRestorableStateWithCoder:`메소드를 호출하여 해당 상태를 해독하고 이를 객체에 적용합니다. 이 메소드의 구현은 선택적 이지만 뷰 컨트롤러를 위해 추천됩니다. 다음 정보의 타입을 따르는것을 저장하고 복원하기 위해 이들을 사용할것입니다.

- 화면에 표시되어지는 데이터 참조(데이터 그 자체가 아닙니다)
- 컨테이너 뷰 컨트롤러의 경우 컨테이너 뷰 컨트롤러의 자식 뷰컨트롤러를 참조합니다. 
- 현재 선택에 대한 정보 
- 유저가 구성할수 있는 뷰 컨트롤러의 경우 그 뷰의 현재 구성에 대한 정보 

인코딩과 디코딩 매소드에서 객체와 coder가 지원하는 데이터 타입을 인코딩 할수 있습니다. 뷰와 뷰 컨트롤러들을 제외한 모든 객체의 경우 해당 객체는 반드시 `NSCoding`프로토콜을 체택해야 하고 해당 상태를 기록하기 위해 프로토콜의 매소드를 사용해야 합니다. 뷰와 뷰 컨트롤러의 경우 객체의 상태를 저장하기 위해 `NSCoding`프로토콜을 사용하지 않습니다. 대신 coder는 객체의 상태 식별자를 저장하고 복원할수 있는 객체 목록으로 상태 식별자를 추가하고, 그러면 객체의 `encodedRestorableStateWithCoder:`메소드가 호출되어 집니다. 

뷰 컨트롤러의 `encodeRestorableStateWithCode:`와 `decodeRestorableSTateWithCoder:` 매소드는 그들 구현의 어떤 지점에서 반드시 `super`를 호출 해야합니다. `super`호출하는것은 어떤 추가적인 정보를 저장하고 복원하기 위한 기회를 부모 클레스에게 줍니다. 코드 7-2를 보면 지정된 뷰 컨트롤러를 식별하는데 사용되는 숫자값을 저장하는 이 메소드의 샘플 구현을 보여줍니다

```swift
override func encodeRestorableState(with coder: NSCoder) {
    super.encodeRestorableState(with: coder)
    
    coder.encodeCInt(number, forKey: MyViewControllerNumber)
}

override func decodeRestorableState(with coder: NSCoder) {
    super.decodeRestorableState(with: coder)
    
    number = coder.decodeCInt(forKey: MyViewControllerNumber)
}
```

Coder 객체는 인코딩 디코딩 처리하는 동안 공유되지 않습니다. 보존 가능 상태를 가진 각 객체는 자체 Coder 객체를 수신합니다. 고유한 코더를 사용한다는것은 키값들 사이에 이름 공간 충돌이 없다는것을 의미합니다. 그러나 [UIApplicationStateRestorationBundleVersionKey](https://developer.apple.com/documentation/uikit/uiapplication/1616852-staterestorationbundleversionkey), [UIApplicationStateRestorationUserInterfaceIdiomKey](https://developer.apple.com/documentation/uikit/uiapplication/1616853-staterestorationuserinterfaceidi), [UIStateRestorationViewControllerStoryboardKey](https://developer.apple.com/documentation/uikit/uiapplication/1616861-staterestorationviewcontrollerst) 키 이름을 직접 사용하면 안됩니다. 이러한 키들은 뷰 컨트롤러의 상태에 대한 추가적인 정보를 저장하기 위해 UIKit이 사용합니다. 

뷰 컨트롤러의 인코딩 디코딩 메소드 구현에 대한 자세한 정보는 [UIViewController Class Reference](https://developer.apple.com/documentation/uikit/uiviewcontroller)를 참조하세요.

---

<div id='section-id-141'/>

## Tips for Saving and Restoring Your View Controllers

뷰 컨트롤러의 상태 보존 및 복원에 대한 지원을 추가할때 다음 지침을 고려하세요.

- `보존하지 않을 모든 뷰 컨트롤러를 기억해야 합니다.`: 어떤 경우에, 뷰 컨트롤러를 복원하는데 의미가 통하지 않을수도 있습니다. 예를 들어 변경을 화면에 표시하는데, 연산을 취소하고 이전화면으로 앱을 복원하길 원할수 있습니다. 이 경우처럼 새로운 암호 정보를 요구하는 View Controller를 보존하지 않을 것입니다.
- `복원 처리 동안 뷰 컨트롤러 클레스의 교체를 피하세요.`: 상태 보존 시스템은 보존하려는 뷰 컨트롤러의 클레스를 인코딩합니다. 복원 하는 동안 클레스가 원래 객체의 클레스와 일치하지 않아서(객체의 하위클레스가 아닌) 객체를 반환하면, 시스템은 뷰 컨트롤러에게 상태 정보를 해독(decode) 하라고 요청하지 않습니다. 따라서 따라서 뷰 컨트롤러를 완전히 다른것으로 바꾸게 되면 객체의 전체 상태가 복원되지 않습니다. 
- `상태 보존 시스템은 사용자가 의도에 맞게 뷰 컨트롤러를 사용할것을 요구합니다`복원 처리는 인터페이스를 재 구성하기 위해 View Controller의 포함 관계에 의존합니다. 컨테이너 뷰 컨트롤러를 적절하게 사용하지 않으면 보존 시스템은 뷰 컨트롤러들을 찾을수 없습니다. 예를 들어 해당 뷰 컨트롤러간의 포함 관계가 없으면 뷰 컨트롤러의 뷰를 다른 뷰에 포함하지 마세요.




