---
layout:     post
title:      "Swift. App의 버전 정보 가져오기"
subtitle:   "Version, Build"
categories: archive
permalink: /archive/:title
date:       2018-02-24 18:49:00
author:     "MinJun"
comments: true 
tags: [Swift]
cover-img: /assets/post_img/background/road-1072821.jpg
thumbnail-img: /assets/post_img/background/road-1072821.jpg
share-img: /assets/post_img/background/road-1072821.jpg
toc: true
---

```swift
var version: String? {
    guard let dictionary = Bundle.main.infoDictionary,
        let version = dictionary["CFBundleShortVersionString"] as? String,
        let build = dictionary["CFBundleVersion"] as? String else {return nil}
    
    let versionAndBuild: String = "vserion: \(version), build: \(build)"
    return versionAndBuild
}
```

---

## Reference 

[Xcode 빌드시, Version, Build 차이점](https://blogappdev.wordpress.com/2012/08/29/xcode%EB%B9%8C%EB%93%9C%EC%8B%9C-version%EA%B3%BC-build%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90/) <br>
[Version vs Build in Xcode](https://stackoverflow.com/questions/6851660/version-vs-build-in-xcode)
