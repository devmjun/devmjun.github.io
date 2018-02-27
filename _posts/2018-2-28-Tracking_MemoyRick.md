---
layout:     post
title:      "RxSwift. Memory Rick 추적하기 "
subtitle:   "간단하게 Observerable들 개수 추적하기!"
date:       2018-02-28 01:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

RxSwift를 사용 할때 Closure가 익숙하지 않거나, 참조들을 명확하게 파악하지 않으면 memory rick이 발생할 확률이 높아지는데, 현재 Observable 인스턴스가 몇개가 살아 있는지 확인할수 있는 방법에 대해서 알아보자.

---

아래에 스크립트를 `Podfile` 파일에 추가하자

```vi
# enable tracing resources
post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name == 'RxSwift'
      target.build_configurations.each do |config|
        if config.name == 'Debug'
          config.build_settings['OTHER_SWIFT_FLAGS'] ||= ['-D','TRACE_RESOURCES']
   	     end
			end 
		end
	end 
end
```

---

ViewController에서 아래의 코드를 작성하고, 확인해보자 

```swift
print("resources: \(RxSwift.Resources.total)")
```

---

