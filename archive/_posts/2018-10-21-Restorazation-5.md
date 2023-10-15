---
layout:     post
title:      "Swift. UI 복원 처리에 대해서"
subtitle:   "About the UI Restoration Process. Restoration Part: 6"
date:       2018-10-21 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Restoration]
categories: archive
permalink: /archive/:title
---

[About the UI Restoration Process](https://developer.apple.com/documentation/uikit/view_controllers/preserving_your_app_s_ui_across_launches/about_the_ui_restoration_process)에서 필요한 부분만 의역했습니다.

---

## About the UI Restoration Process

UIKit 상태 복원 처리를 어떻게 사용자화 하는지에 대해서 배웁니다

---

## Overview 

앱이 시작된 시간부터 복원되어지는 시간까지 발생하는 호출 순서를 분명하게 보여줍니다. 복원은 앱의 초기화 중간에 발생하고 오직 상태복원 아카이브가 가능할때, app 델리게이트의 `application(_:shouldResotreApplicationSTate:)` 메소드가 true를 반환할때 에만 진행됩니다.

> 그림 1: 복원 순서 순서 인터페이스 

![](/assets/post_img/posts/Restorazation-document-0.png)

복원 처리의 첫번째 단계는 인터페이스를 위한 뷰 컨트롤러 객체(명시적 또는 암시적으로)를 생성하는것입니다. 두번째 단계는 객체들의 상태를 해독(decode)하고 복원(restore) 하는것 입니다. 두 단계는 뷰 컨트롤러 계층을 재현(recreate)하기 위해 필요합니다. 예를들어 네비게이션 컨트롤러와 그의 자식 뷰 컨트롤러들이 생성된 이후 해당 객체들은 즉각적으로 연결되지 않습니다. 실제로 네비게이션 컨트롤러의 `deodedRestorableState(with:)`메소드를 사용하여 자식 뷰 컨트롤러의 관계를 복구(reestablishe) 합니다.

상태 복원이 끝나면 `UIKit`은 앱 델리게이트의 `application(_:didFinishLaunchingWithOptions:)` 매소드를 호출합니다. 이 메소드를 사용하여 인터페이스의 마지막 변경 또는 추가적인 무언가를 합니다. 예를들어 뷰 컨트롤러 계층에 로그인 화면을 추가할수도 있습니다.

---

## Recreate Your View Controllers

복원 하는 동안 UIKit은 보존된 인터페이스에서 뷰 컨트롤러 객체를 생성하거나 찾으려고 시도합니다. UIKit은 먼저 뷰 컨트롤러 객체를 제공하라고 요청합니다. 뷰 컨트롤러 객체를 제공하지 않았다면 UIKit은 암시적으로 뷰 컨트롤러를 찾습니다. 다음은 뷰 컨트롤러를 다시 생성하기 위해 UIKit이 다르는 일련의 단계입니다.

1. `뷰 컨트롤러의 복원 클레스를 요청합니다`: 복원 클레스는 특정 뷰 컨트롤러를 어떻게 만들어야하는지 알고 있습니다. 뷰 컨트롤러의 [<U>restorationClass</U>](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621472-restorationclass)속성을 할당하여 복원 클레스를 지정 합니다. 복원하는 동안 UIKit은 뷰 컨트롤러의 새로운 인스턴스를 요청하기 위해 복원 클레스의 [<U>viewController(withRestorationIdentifierPath:coder)</U>](https://developer.apple.com/documentation/uikit/uiviewcontrollerrestoration/1616859-viewcontroller)를 호출 합니다. nil을 반환하면 UIKit은 뷰 컨트롤러 생성을 멈추고 복원 처리를 멈춥니다.
2. `app delegate에게 요청합니다.`: 뷰 컨트롤러가 복원 클레스를 가지지 않았다면, UIKit은  앱 델리게이트의 [<U>application(_:viewControllerWithRestorationIdentifierPath:coder:)</U>](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623062-application) 메소드를 호출합니다. 메소드에서 `nil`을 반환하면, UIKit은 (복원 클레스) 찾는걸 지속합니다. 
3. `기존 객체를 검사합니다.`: UIKit은 정확히 같은 복원 path로 이미 생성된 뷰 컨트롤러를  찾습니다.
4. `스토리보드에서 뷰 컨트롤러를 인스턴스화 합니다`: 뷰 컨트롤러를 여전히 가지지 않았다면, UIKit은 자동으로 앱의 스토리보드를 인스턴스화 합니다. 

상태 복원이 시작되기 이전에 UIKit은 앱의 스토리보드의 기본 뷰 컨트롤러를 로드합니다. 왜냐하면 UIKit은 이 뷰 컨트롤러를 무료로(?) 로드하기 때문에 앱 델리게이트 또는 복원 클레스를 사용하여 생성하지 않는것이 좋습니다, 스토리보드에 뷰 컨트롤러가 정의되지 않은 경우에만 다른 모든 뷰 컨트롤러에 복원 클레스를 할당하세요. 특정 상황에서 View Controller를 생성하지 못하도록 복원 클레스를 할당할수도 있습니다. 예를 들어 연관된 복원 아카이브가 부실하거나, 데이터가 누락된 뷰 컨트롤러를 화면에 표시하는걸 피하기 위함일수 있습니다. 

코드에서 뷰 컨트롤러를 재 생성할때, 항상 다른 초기화와 함께 뷰 컨트롤러의 [restorationIdentifier](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621499-restorationidentifier)속성 값을 할당하세요. 또한 [restorationClass](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621472-restorationclass) 속성으로 적절하게 값을 할당하세요. 이 값들이 생성되는 시간에 할당되는것은 다음 주기동안 뷰 컨트롤러가 보존 될것이 보장됩니다.

```swift
func viewController(withRestorationIdentifierPath 
                    identifierComponents: [Any], 
                    coder: NSCoder) -> UIViewController? {
   let vc = MyViewController()
        
   vc.restorationIdentifier = identifierComponents.last as? String
   vc.restorationClass = MyViewController.self
        
   return vc
}
```

> Note
> 보존 클레스는 항상 UIKit에 예상되어진 클레스를 반환합니다. 복원 아카이브는 각 보존된 뷰 컨트롤러의 클레스를 포함합니다. 복원 클레스는 다른 클레스의 인스턴스를 반환한다면, UIKit은 뷰 컨트롤러의 [<U>decodeResotrableSTate(with:)</U>](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621429-decoderestorablestate)메소드를 호출하지 않습니다.

---
