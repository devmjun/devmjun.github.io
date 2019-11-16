---
layout:     post
title:      "iOS, Universal link 2"
subtitle:   "Enabling Universal Links"
date:       2019-10-17 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, UniversalLink]
--- 

## Table of contents 

  - [<U>Enabling Universal Links</U>](#section-id-1)
  - [<U>Overview</U>](#section-id-7)
    - [<U>Add Universal Links Support to Your Association File</U>](#section-id-19)
    - [<U>Use Wildcards and Directives in Your Path Strings</U>](#section-id-60)
  


<div id='section-id-1'/>

## Enabling Universal Links

[https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/enabling_universal_links](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/enabling_universal_links)

universal links를 지원하기 위해 app과 website를 구성합니다. 

<div id='section-id-7'/>

## Overview 

앱과 웹사이트 사이에 two-way association을 생성하는것으로, universal link를 가지는 다른 서비스들과 같은 이점을 를 활성하화 할수 있고...

universal links에 대한 앱과 웹사이트를 연결하려면 다음을 수행 해야 합니다.

1. [Associated Domains Entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_associated-domains)를 앱에 추가합니다. 앱이 지원할 모든 도메인을 applink service 접두사를 사용하여 포함합니다. [Add the Associated Domains Entitlement](https://developer.apple.com/documentation/security/password_autofill/setting_up_an_app_s_associated_domains#3001207)
2. 웹사이트로 Apple App Site Association file을 추가합니다. [Add the Apple App Site Association File](https://developer.apple.com/documentation/security/password_autofill/setting_up_an_app_s_associated_domains#3001215)
3. Apple App Site Association file로 `applinks key`를 추가합니다. 각 앱이 처리할 웹사이트의 색션을 지정합니다. 

관계된 서비스에 대한 추가적인 정보는 [Shared Web Credentials](https://developer.apple.com/documentation/security/shared_web_credentials), [Web Browser-to-Native App Handoff](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/Handoff/AdoptingHandoff/AdoptingHandoff.html#//apple_ref/doc/uid/TP40014338-CH2-SW10)를 참조해주세요,

<div id='section-id-19'/>

### Add Universal Links Support to Your Association File

the Apple App Site Association file에 universal links를 지원하기 위해 applinks key를 추가합니다. 

applinks key는 다음 keys들을 포함합니다. 

- apps 
	- 이 키는 universal links를 위해 사용되지 않지만 해당 키 값이 반드시 존재 해야 하고 값이 없다면 빈 배열로 설정 해야 합니다. 
- details 
	- 웹 사이트의 특정 섹션과 함께 웹 사이트의 universal links를 처리하는 앱 목록들이 표시됩니다(A list of apps handling universal links for your website, along with the specific sections of your website each app handles.)

> Listing 1 
An Apple App Site Association file supporting universal links

```
{
    "applinks": {
        "apps": [],
        "details": [{
            "appID": "D3KQX62K1A.com.example.photoapp",
            "paths": ["/albums"]
            },
            {
            "appID": "D3KQX62K1A.com.example.videoapp",
            "paths": ["/videos"]
        }]
    }
}
```

details key값을 앱 당 하나의 dictional를 포함한 배열의 JSON 표현으로 추가합니다. 각 앱별 dictional에 대해 앱 ID와 paths key를 포함합니다. 

- appId
	- <team identifier>.<bundler identifer>내에 링크를 처리하기 위한 application의 식별자 입니다
- paths 
	- 경로 문자열 배열로 지정된 앱에서 지원하는 웹 사이트의 섹션입니다.

> Note
> 
> 경로 배열에서 웹 사이트 경로를 지정하는데 사용하는 문자열은 대소문자를 구분합니다. 비교를 위해 URL의 경로 구성요소만 사용됩니다. query string 또는 fragment identifier는 무시됩니다. 

<div id='section-id-60'/>

### Use Wildcards and Directives in Your Path Strings

웹사이트의 색션을 지정하기 위해 paths array 내에 path strings에서 와일드카드를 사용합니다. 예를 들면 URL을 지정하기 위해 `*`를 다음과 같이 추가합니다. `/videos/samples/2015/*`또 `/videos/samples/2015/` 하위에 모든 path를 지정하기위해 사용하기도 합니다. `?`는 `/photography/*/samples/201?/mypage` 에서 단일 character에 메칭시키기 위해 사용합니다. 독립 실행형 `*`를 사용하여 전체 웹 사이트를 지정 할수 있습니다. 

배열에 dictional의 순서는 order system을 결정합니다. 첫번째로 웹사이트 내에서 지정된 경로를 처리할 앱을 선택하고, 나머지를 처리할 앱을 지정할수 있습니다. 

Identify an area that should not be handled by adding “NOT ” (including a space after the T) to the beginning of the path string. For example, the Apple App Site Association file shown in Listing 1 could prevent the /videos/samples/2010/* area of the website from being handled by updating the paths array as shown here:

```
"paths": [ "/videos/collections/*", "NOT /videos/samples/2010/*", "/videos/samples/201?/*"]
```

Apple App Site Association file을 검증하고 생성하기 위한 추가적인 정보는 [여기](https://developer.apple.com/documentation/security/password_autofill/setting_up_an_app_s_associated_domains)를 참조해주세요 
