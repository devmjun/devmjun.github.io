---
layout:     post
title:      "iOS, Universal link 1"
subtitle:   "Allowing Apps and Websites to Link to Your Content"
date:       2019-10-16 18:45:00
author:     "MinJun Ju"
comments: true 
tags: [Swift, UniversalLink]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/road-1072821.jpg
thumbnail-img: /assets/post_img/background/road-1072821.jpg
share-img: /assets/post_img/background/road-1072821.jpg
--- 

## Table of contents 

  - [<U>Allowing Apps and Websites to Link to Your Content</U>](#section-id-1)
  - [<U>Overview</U>](#section-id-7)
  - [<U>Support Universal Links</U>](#section-id-21)
  - [<U>Communicate with Other Apps</U>](#section-id-32)
  

<div id='section-id-1'/>

## Allowing Apps and Websites to Link to Your Content

[https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content)](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content))

<!--[링크](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content)-->

앱과 공유된 보안 데이터 내에 콘텐츠를 연결하기 위해 universal links를 사용합니다. 

<div id='section-id-7'/>

## Overview 

universal links는 앱 내의 콘텐츠에 연결 할수 있게 해줍니다. 유저는 특정 콘텐츠를 통해서 앱을 열수 있고, 이것들이 올바르게 동작할수 있게 허용 합니다.

유저가 universal link를 탭했을때, iOS는 Safari 또는 website를 통한 라우팅 없이 앱으로 직접적인 연결을 redirect 합니다. 또한 universal links은 표준 HTTP 또는 HTTPS 링크이기 때문에 하나의 URL이 두개의 웹사이트와 앱에서도 잘 동작합니다. 앱이 설치되지 않았다면 시스템은 사파리에서 URL을 열고 이것을 처리하기 위해 웹사이트를 허용합니다. 

사용자가 앱을 설치할 때 iOS는 웹 서버에 저장된 파일을 확인하여 웹 사이트에서 앱이 URL을 대신하여 열 수 있는지 확인합니다. 오직 사용자만 이 파일을 서버에 저장하여 웹 사이트와 앱의 연관성을 확보할 수 있습니다.

> Important
> 
> universal links와 custom URL은 둘다 deep linking으로 사용할수 있는 형태 이지만, 좋은 연습으로는 universal links가 강력하게 추천됩니다. 
> 
> universal links가 사용된 앱이 설치 될때, iOS는 웹 사이트의 Apple App Site Association을 통해서 연관성을 검증하고, 다른 앱의 scheme, 나의 URL로 redirect 하는것을 제거합니다. 
> 

<div id='section-id-21'/>

## Support Universal Links 

universal linkes를 지원하기 위해 다음 단계를 진행 합니다. 

1. 앱과 웹사이트 사이의 두방향 association을 생성하고 <U>https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/enabling_universal_links</U>에 설명된 것처럼 앱을 처리하기 위한 URL을 명시합니다.
2. <U>https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/handling_universal_links</U>에 설명된 것과같이 universal link가 당신의 앱으로 라우팅 했을때, iOS가 제공한 user activity object가 응답하도록 app delegate를 업데이트 합니다 

Universal links는 사파리 또는 `WKWebView` 내에 웹 사이트로 링크를 탭할때 앱을 여는것을 허용하고, mail, messages 그외 다른것들 과같이 [open(_:options:completionHandler:)](https://developer.apple.com/documentation/uikit/uiapplication/1648685-open)을 호출합니다. 

유저가 사파리에 웹사이트를 열고 브라우징 하고, 같은 도메인에서 universal link를 탭했을때, iOS는 사파리에서 link를 열고, user가 다른 도메인에서 universal link를 탭하면 iOS는 당신의 앱을 엽니다.

<div id='section-id-32'/>

## Communicate with Other Apps 

UIKit app은 universal links를 통해서 소통 할수 있습니다. universal links를 지원하면 다른 서버를 사용하지 않고도 소량의 데이터를 앱에 직접 전송할수 있습니다. 

URL query string 내에서 앱을 처리하는 매개변수를 정의합니다. 예를들어 photo library app은 앨범의 이름과 표시할 사진의 index를 포함하는 매개변수를 지정할수 있습니다. 

> Listing 1 Examples of URLs with album name and photo index parameters

```
https://myphotoapp.example.com/albums?albumname=vacation&index=1
https://myphotoapp.example.com/albums?albumname=wedding&index=17
```

다른 앱은 도메인, 경로, 및 매개변수를 기반으로 URL을 작성하고 UIApplication의 `open(_:options:completionHanlder:)`를 기반으로 URL을 호출하여 이들을 열기위해 앱에게 요청합니다. 앱이 해당 URL을 열었을때 이들에게 통지하기 위해 시스템에게 요청할수 있습니다. 

> Listing 2 An example of an app calling your universal link

```swift
if let appURL = URL(string: "https://myphotoapp.example.com/albums?albumname=vacation&index=1") {
    UIApplication.shared.open(appURL) { success in
        if success {
            print("The URL was delivered successfully.")
        } else {
            print("The URL failed to open.")
        }
    }
} else {
    print("Invalid URL specified.")
}
```

> Note: 앱이 universal link를 웹사이트로 열기위해  [open(_:options:completionHandler:)](https://developer.apple.com/documentation/uikit/uiapplication/1648685-open) 사용한다면, link는 앱에서 열리지 않습니다. 

앱 내에서 링크를 처리하는것에 대한 추가적인 정보는 [Handling Universal Links](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/handling_universal_links)를 참조해주세요.
