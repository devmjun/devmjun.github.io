---
layout:     post
title:      "iOS, Universal link 3"
subtitle:   "Handling Universal Links"
date:       2019-10-18 18:45:00
author:     "MinJun Ju"
comments: true 
tags: [Swift, UniversalLink]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/category-bg.png
thumbnail-img: /assets/post_img/background/category-bg.png
share-img: /assets/post_img/background/category-bg.png
--- 

## Table of contents 

  - [<U>Handling Universal Links</U>](#section-id-1)
  - [<U>Override</U>](#section-id-5)
  - [<U>Update Your App Delegate to Respond</U>](#section-id-13)
    - [<U>Listing 1 An example of handling a universal link</U>](#section-id-17)
  


<div id='section-id-1'/>

## Handling Universal Links

[링크](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/handling_universal_links)

<div id='section-id-5'/>

## Override 
universal links가 activated 되었을때, iOS는 앱을 launch하고 [NSUserActivity](https://developer.apple.com/documentation/foundation/nsuseractivity)을 보냅니다. 이 객체에게 Query 하여 앱이 어떻게 런치되었고 어떤 작업을 수행할지 결정합니다. 

app에서 universal links를 지원하기위해, 다음 단계들을 따릅니다. 

1. 앱과 웹사이트 간에 two-way association을 생성하고 app이 처리할수 있는 URLs을 명시합니다. [Enabled Universal Links](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/enabling_universal_links)
2. [NSUserActivityTypeBrowsingWeb](https://developer.apple.com/documentation/foundation/nsuseractivitytypebrowsingweb)으로 설정된 [activityType](https://developer.apple.com/documentation/foundation/nsuseractivity/1409611-activitytype)과 함께 [NSUserActivity](https://developer.apple.com/documentation/foundation/nsuseractivity)를 받앗을때 app delegate를 업데이트 합니다. 

<div id='section-id-13'/>

## Update Your App Delegate to Respond 

iOS가 universal link의 결과로 앱을 열때, app은 [NSUserActivityTypeBrowsingWeb](https://developer.apple.com/documentation/foundation/nsuseractivitytypebrowsingweb)의 [activityType](https://developer.apple.com/documentation/foundation/nsuseractivity/1409611-activitytype) 값과 함께 [NsUserActivity](https://developer.apple.com/documentation/foundation/nsuseractivity)의 객체를 받습니다. activity objects의 [webpageURL](https://developer.apple.com/documentation/foundation/nsuseractivity/1418086-webpageurl) 속성은 유저가 접근하는 HTTP 또는 HTTPS URL을 가지고 있습니다. URL을 뽑기 위해 [NSURLComponents](https://developer.apple.com/documentation/foundation/nsurlcomponents)를 사용하세요 

<div id='section-id-17'/>

### Listing 1 An example of handling a universal link

```swift
func application(_ application: UIApplication,
                 continue userActivity: NSUserActivity,
                 restorationHandler: @escaping ([Any]?) -> Void) -> Bool
{
    guard userActivity.activityType == NSUserActivityTypeBrowsingWeb,
        let incomingURL = userActivity.webpageURL,
        let components = NSURLComponents(url: incomingURL, resolvingAgainstBaseURL: true),
        let path = components.path,
        let params = components.queryItems else {
            return false
    }
    
    print("path = \(path)")
    
    if let albumName = params.first(where: { $0.name == "albumname" } )?.value,
        let photoIndex = params.first(where: { $0.name == "index" })?.value {
        
        print("album = \(albumName)")
        print("photoIndex = \(photoIndex)")
        return true
        
    } else {
        print("Either album name or photo index missing")
        return false
    }
}
```

> Warning 
> 
> Universal links는 잠제적인 vertor 공격을 제공합니다. 따라서 모든 URL 매개변수를 검증하고 고장난 URL은 버려야 합니다. 추가적으로 사용가능한 동작을 사용자의 데이터를 위험하게 하지 않는 사용자로 제한합니다. 예를 들어 universal link가 사용자에 대한 내용을 직접 삭제하거나 주용한 정보에 접근할수 없는것들이 있을수 있습니다. URL 처리 코드를 테스트할때, 테스트 케이스에 부적절한 형식의 URL이 포함되어 있는지 확인하세요. 

