---
layout:     post
title:      "Swift. UI 보존 처리에 대해서"
subtitle:   "About the UI Preservation Process. Restoration Part: 7"
date:       2018-10-22 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Restoration]
categories: archive
permalink: /archive/:title
---

[About the UI Preservation Process](https://developer.apple.com/documentation/uikit/view_controllers/preserving_your_app_s_ui_across_launches/about_the_ui_preservation_process)에서 필요한 부분만 의역했습니다.

---

## About the UI Preservation Process

UIKit 상태 보존 처리를 어떻게 사용자화 하는지에 대해서 배웁니다

---

## Overview

그림 1은 인터페이스 보존 처리 동안 발생하는 호출 순서를 보여줍니다. 앱의 상태가 보존되어지길 원하고 앱 델리게이트에게 요청한 이후, UIKit은 앱의 뷰 컨트롤러 계층에서 현재의 객체를 부호화(encode)합니다. 오직 유효한 [resorationIdentifier](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621499-restorationidentifier)가 있는 뷰 컨트롤러만 보존됩니다.

![](/img/posts/Restorazation-document-1.png)

보존처리는 뷰 컨트롤러 계층을 탐색하고 찾은 객체를 재귀적으로 암호화 합니다. 이 처리는 앱의 윈도우의 루트 뷰 컨트롤러에서 시작하여 제공된 아카이브로 이 데이터들을 작성합니다. 루트 뷰 컨트롤러의 데이터가 다른 뷰 컨트롤러로 참조를 포함한다면, UIKit은 각 새로운 뷰 컨트롤러에게 아카이브의 별도의 부분으로 데이터를 부호화(encode) 하도록 요청합니다. 그런 다음 이 자식 뷰 컨트롤러들은 그들의 자식 뷰 컨트롤러들을 부호화(encode) 할것입니다. 

UIKit 뷰 컨트롤러는 자동으로 그들의 자식뷰 컨트롤러를 적절하게 인코딩합니다. 자용자회된 컨테이너 뷰 컨트롤러를 정의 했다면, 뷰 컨트롤러의 [<U>encodeRestorableState(with:)</U>](https://developer.apple.com/documentation/uikit/uistaterestoring/1616866-encoderestorablestate) 메소드는 반드시 같은 모양으로 제공된 아카이브로 자식 뷰 컨트롤러들을 기록해야합니다.

---

## Exclude View Controllers from Preservation

상태 복원 처리에서 뷰 컨트롤러(그의 뷰)를 제외하는 두가지 방법이 있습니다.

- `resotrationIdentifer`속성을 nil로 설정합니다
- 복원 클레스를 제공하고 [viewController(withRestorationIdentifierPath:coder:)](https://developer.apple.com/documentation/uikit/uiviewcontrollerrestoration/1616859-viewcontroller)메소드에서 nil을 반환합니다. 

뷰 컨트롤러를 제외하는것은 아카이브에 뷰 컨트롤러가 저장되는걸 방지합니다. 또한 뷰 컨트롤러의 모든 자식을 보존하지 못하도록 합니다

---

## Encode Any Object in Your App

상태 복원은 앱의 뷰와 뷰 컨트롤러에만 국한되지 않습니다. [UIStateRestoring](https://developer.apple.com/documentation/uikit/uistaterestoring) 프로토콜을 체택한 객체는 복원 아카이브에 포함될수 있습니다. 예를들어 앱을 위한 전역 구성 데이터를 저장하는 객체에서 이 프로토콜을 체택할수 있습니다. 객체를 아카이브에 추가하려면 다음을 수행하세요

1. 앱 델리게이트의[<U>registerObject(forStateRestoration:restorationIdentifier:)</U>](https://developer.apple.com/documentation/uikit/uiapplication/1623027-registerobject) 메소드를 호출하여 앱이 실행되고 있는 동안 객체를 등록하세요. 예를 들어, 객체를 생성한 직후 구성 객체를 등록할수 있습니다. 
2. [<U>encodeRestorableState(with:)</U>](https://developer.apple.com/documentation/uikit/uistaterestoring/1616866-encoderestorablestate)메소드를 사용하여 복원 아카이브로 객체를 암호화합니다. 또한 앱 델리게이트의 [<U>application_:willEncodeRestorableStateWith:</U>](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623099-application) 메소드에서 암호화 할수 있습니다. 

다음 시작 주기 동안 객체를 이전 상태로 반환하는 것이 충분한한 사용자화된 객체를 위한 어떠한 데이터도 암호화(encode)할수 있습니다. 앱 동작에 중요하지 않은 데이터와 다른 방식으로 유지되어야 하는 데이터를 인코딩하지 않습니다.(Encode data that is not crucial to your app's behavior, and never encode data that should be persisted in other ways) 예를들어 시작 주기 사이에 지속되어야 하는 유저 데이터 또는 앱의 설정은 암호화하지 않아야 합니다.
