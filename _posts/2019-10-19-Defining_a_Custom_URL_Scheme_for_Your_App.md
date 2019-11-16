---
layout:     post
title:      "iOS, Custom URL Scheme"
subtitle:   "Defining a Custom URL Scheme for Your App"
date:       2019-10-19 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Scheme]
--- 

## Table of contents 

  - [<U>Defining a Custom URL Scheme for Your App</U>](#section-id-1)
  - [<U>Overview</U>](#section-id-7)
  - [<U>Register Your URL Scheme</U>](#section-id-42)
  - [<U>Handle Incoming URLs</U>](#section-id-59)
  


<div id='section-id-1'/>

## Defining a Custom URL Scheme for Your App

[링크](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app)

앱 내에 콘텐츠에 연결 하기 위해 특별히 포맷된 URL을 사용합니다.

<div id='section-id-7'/>

## Overview 

Custom URL schemes은 앱내에 리소스에 참조하기 위한 방법을 제공합니다. 유저는 email 내에서 custom URL을 탭 하였을때, 예를들면 특정 콘텐스트에서 앱을 실행 합니다. 다른앱 또한 특정 콘텍스트의 데이터와 함께 실행시키게 하기 위해 트리거 할수 있습니다. 예를 들면 Photo library 앱은 특정 이미지를 보여줄수 있습니다.

Apple은 시스템앱과 함께 일반적으로 연관된 스킴을 지원합니다 예를들면 `mailto`, `tel`, `sms`, `facetime`과 같은 것들입니다. 자신만의 custom scheme를 정의할수 있고 이것을 지원하기 위해 등록할수 있습니다.

> Important 
> 
> custom URL scheme은 deep linking가 가능한 형태이지만 universal links는 연습으로 강력하게 추천 되어 집니다. universal links에 대해서 추가적으로 알고 싶다면 [Allowing Apps and Websites to Link to Your Content](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content)

custom URL scheme을 지원하기 위해 다음을 따라야 합니다. 

1. 앱의 URLs을 위한 포맷을 정의 합니다.
2. 시스템이 적절한 URL을 앱으로 안내하도록 scheme을 등록합니다. 
3. 앱 내에서 받은 URL을 처리합니다. 

URLs은 반드시 custom scheme name으로 시작해야 합니다. 앱을 지원하기 위한 어떤 옵션에 대한 매개변수를 추가하세요. 예를 들면 포토 라이브러리 앱은 이름 또는 사진 앨범의 색인을 화면에 표시하기 위한 포맷을 포함해야 합니다. scheme에 대한 URL의 예는 다음과 같습니다.

```
myphotoapp:albumname?name=”albumname”
myphotoapp:albumname?index=1
```

클라이언트는 scheme 기반으로 URL을 만들고 UIApplication의 [open(_:options:completionHandler:)]() 메소드를 실행하여 이들을 열게 앱에게 요청할수 있습니다. 클라이언트는 앱이 URL을 열때 이들에게 통지하라고 시스템에게 요청할수 있습니다. 

```swift
let url = URL(string: "myphotoapp:Vacation?index=1")
       
UIApplication.shared.open(url!) { (result) in
    if result {
       // The URL was delivered successfully!
    }
}
```

<div id='section-id-42'/>

## Register Your URL Scheme 

URL scheme registration은 앱으로 redirect할 URL을 지정합니다. project setting탭에서 scheme을 등록합니다. 그림1과 같이 앱에서 지원하는 모든 URL scheme를 선언하기 위해 URL 유형 섹션을 업데이트 합니다. 

- URL Scheme box내에 사용할 URLs을 위해 프리픽스를 지정합니다. 
- 앱에 대한 role을 선택합니다
	- 정의한 URL scheme을 위한 editor role을 지정합니다 
	- 앱이 adopts 되는 scheme에 대한 viewr role을 지정합니다(해당 되지 않는다면 정의 하지 않습니다) 

> Figure 1 URL Type section

![이미지](/img/posts/Custom_scheme-0.png)

scheme과 함께 제공된 identifier는 같은 스킴을 지원하는 다른앱과 구분 합니다. 유니크함을 보장하기 위해 회사의 도메인과 앱 이름을 통합한 역 DNS 문자열을 지정합니다. 역 DNS 스트링을 사용하는것이 최선의 선택이지만, 다른앱이 동일한 scheme를 등록하고 associated likns 처리하는것을 막지는 못합니다. 웹 사이트와 함께 고유한 연결을 정의하기 위해 custom URL scheme를 사용하는 것 대신 universal links를 사용해보세요. 

http, https, mailto, tel, sms, facetime, fatime-audio와 같이 잘 알려진 URL scheme에 대한 지원을 요구 할수 없습니다. 이 시스템은 잘 알려진 scheme의 URL을 해당 시스템앱과 잘 알려진 HTTP 기반 URL에 Maps, Youtube, Music과 같은 특정 앱으로 연결합니다. Apple이 지원하는 scheme에 대한 추가적인 정보는 [Apple URL Scheme Reference](https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/Introduction/Introduction.html#//apple_ref/doc/uid/TP40007899)를 참조해주세요.

<div id='section-id-59'/>

## Handle Incoming URLs

다른앱이 당신의 custom scheme을 포함하는 URL을 오픈할때, 시스템은 필요하다면 당신의 앱을 실행 시키고 이것을 foreground로 가져옵니다. 시스템은 app delegate의 [application(_:open:options:)](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623112-application)메소드를 실행하여 URL을 앱으로 전달합니다. URL의 콘텐츠를 parse하기 위해 메소드로 코드를 추가하고 적절한 행동을 가집니다. URL이 올바르게 파싱되었는지 확인하려면 [NSURLComponents](https://developer.apple.com/documentation/foundation/nsurlcomponents) API를 사용하여 구성 요소를 추출하세요. 시스템에서 제공된 옵션 사전에서 앱이 열은것과 같은 URL에 대한 추가적인 정보를 얻습니다.

```swift
func application(_ application: UIApplication,
                 open url: URL,
                 options: [UIApplicationOpenURLOptionsKey : Any] = [:] ) -> Bool {
    
    // Determine who sent the URL.
    let sendingAppID = options[.sourceApplication]
    print("source application = \(sendingAppID ?? "Unknown")")
    
    // Process the URL.
    guard let components = NSURLComponents(url: url, resolvingAgainstBaseURL: true),
        let albumPath = components.path,
        let params = components.queryItems else {
            print("Invalid URL or album path missing")
            return false
    }
    
    if let photoIndex = params.first(where: { $0.name == "index" })?.value {
        print("albumPath = \(albumPath)")
        print("photoIndex = \(photoIndex)")
        return true
    } else {
        print("Photo index missing")
        return false
    }
}
```

시스템은 또한 앱이 지원하는 커스텀 파일 타입을 열기위해 `application(_:open:options:)`매소드를 사용합니다. 

> Warning
>
> Universal links는 잠제적인 vertor 공격을 제공합니다. 따라서 모든 URL 매개변수를 검증하고 고장난 URL은 버려야 합니다. 추가적으로 사용가능한 동작을 사용자의 데이터를 위험하게 하지 않는 사용자로 제한합니다. 예를 들어 universal link가 사용자에 대한 내용을 직접 삭제하거나 주용한 정보에 접근할수 없는것들이 있을수 있습니다. URL 처리 코드를 테스트할때, 테스트 케이스에 부적절한 형식의 URL이 포함되어 있는지 확인하세요. 