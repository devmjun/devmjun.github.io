---
layout:     post
title:      "Swift. 앱 실행시 구성 설정이 올바른지 확인하기"
subtitle:   "Performing One-Time Setup for Your App. Restoration Part: 5"
date:       2018-10-20 18:45:00
author:     "MinJun Ju"
comments: true 
tags: [Swift, Restoration]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/hills-615429.jpg
thumbnail-img: /assets/post_img/background/hills-615429.jpg
share-img: /assets/post_img/background/hills-615429.jpg
---

[Performing One-Time Setup for Your App](https://developer.apple.com/documentation/uikit/core_app/managing_your_app_s_life_cycle/responding_to_the_launch_of_your_app/performing_one-time_setup_for_your_app)에서 필요한 부분만 의역했습니다.

---

## Performing One-Time Setup for Your App

앱이 적절하게 구성되었는지 확인합니다.

---

## Overview 

유저가 앱을 처음 시작하면 한번 실행하는 작업 환경에 맞게 앱을 준비할수 있습니다. 예를 들어 다음과같은걸 원할수 있습니다.

- 서버에서 요구하는 데이터를 다운로드
- 문서 템플릿 또는 앱 번들에서 쓰기가 가능한 디렉토리로 수정가능한 데이터 파일들 복사 
- 유저를 위한 기본 환경 설정 
- 유저 계정 설정 또는 다른 요구된 데이터 수집

앱 델리게이트의 `application(_:willFinishLaunchingWithOptions:` 또는 `application(_:didFinishLaunchingWithOptions:)`에서 한번 실행하는 작업 실행. 

---

## Install Files in the Proper Locations 

Your app has its own container directory for storing files, and you should always place app-specific files in the `~/Library subdirectory`. Specifically, store your files in the following `~/Library subdirectories`:

- `~/Library/Application Support`/—`Store app-specific` files that you want backed up with the user’s other content. (You can create custom subdirectories here as needed.) Use this directory for data files, configuration files, document templates, and so on.
- `~/Library/Caches/`—`Store temporary data files` that can be easily regenerated or downloaded.


> 앱별 디렉토리의 위치얻기 

```swift
let appSupportURL = FileManager.default.urls(for: 
      .applicationSupportDirectory, in: .userDomainMask)

let cachesURL = FileManager.default.urls(for: 
      .cachesDirectory, in: .userDomainMask)
```

