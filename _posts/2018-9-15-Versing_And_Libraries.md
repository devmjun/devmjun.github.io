---
layout:     post
title:      "iOS, Semantic Versioning, A Word About Libraries"
subtitle:   "1.0.0의 버전 의미론과, 라이브러리란?"
date:       2018-09-14 17:45:00
author:     "MinJun"
header-img: "img/tags/iOS-bg.png"
comments: true 
tags: [iOS, Swift, CocoaPod]
---

[CocoaPods Tutorial for Swift: Getting Started](https://www.raywenderlich.com/626-cocoapods-tutorial-for-swift-getting-started)의 일부 내용을 참조 했습니다. 

---

## Contents 

- A Word About Libraries
- Semantic Versioning
- Challenge Time
- Where to go from here?

---

## A Word About Libraries

일반적으로 라이브러리(library)는 라이브러리(Library) 또는 프레임워크(framework)를 의미하는 일반적인 용어로 자주 사용되어 표시됩니다. 이 튜토리얼은 우연히 이 단어들을 섞어서 사용했으므로 유죄입니다(다 안읽어서....) 사실 누군가 `Swift library`를 언급할때 사실은 `Swift dynamic framework`를 의미합니다. 왜냐하면 Swift는 `static libraries`를 허용하지 않기 때문입니다.(Xcode9 부터 static 라이브러리 및 프레임 워크지원을 허용합니다.)

iOS8은 `dynamic frameworks` 를 도입하고 코드, 이미지, 번들되어 있는 assets를 허용했습니다. iOS8 이전에는 CocoaPod는 `fat` static libraries로 만들어졌습니다. `Fat`은 몇몇의 코드 명령어 세트를 포함합니다(시뮬레이터의 경우 i396, 장치의 경우 armv7등)을 포함하지만 정적 라이브러리에는 이미지나, assets같은 리소스가 포함될수 없음을 의미합니다.

또 다른 중요한 차이점은 dynamic frameworks는 이름 명칭이 있는(namespace) 클레스를 가질수 있지만 static libraries는 그렇게 할수 없다는 것입니다. 따라서 하나의 프로젝트 이내에 다른 `정적 라이브러리`에(in different static libraries within a single project) MyTestClass라고 이름지어진 클레스가 있다면, Xcode는 중복된 심볼을 인용하여 올바르게 링크하지 못하기 때문에 프로젝트를 빌드 할수 없습니다. 그러나 Xcode는 `서로 다른 프레임 워크`에서 같은 이름의 두개의 클레스를 가진 프로젝트를 빌드하는것이 매우 행복합니다.

왜 이것이 문제인가요? Objective-C와 달리 표준 Swift 런타임 라이브러리는 iOS에 포함되어 있지 않습니다. 즉, 프레임 워크에 필요한 Swift 런타임 라이브러리가 있어야합니다. 결과적으로 Swift에서 작성된 `pod`들은 `dynamic frameworks`로 생성되어져야 합니다. Apple이 Swift정적 라이브러리를 허용한다면, 동일한 표준 런타임 의존성을 사용하는 여러 라이브러리에서 심볼이 중복될수 있습니다.

다행히도 CocoaPod은 이 모든것을 처리합니다. 필요한 의존성을 한 번만 처리하는 경우도 있습니다. `use_frameworks`를 반드시 포함시켜야 합니다. 당신의 Podfile에서 Swift CocoaPods로 작업하면 될것입니다.

---

## Semantic Versioning

`major`, `minor`, `patch` 세개의 숫자는 버전 번호로 정의됩니다.

예를들어 `1.0.0`의 버전 번호는 다음과같이 해석됩니다.

![](https://koenig-media.raywenderlich.com/uploads/2015/03/sem_versioning.png)

`major` 숫자가 증가할때, 이전 버전과 호환되지(non-backwards compatible) 않는 변경사항이 도입되었음을 의미합니다. 다음 major 버전으로 pod가 업그레이드 되었을때, 아마 빌딩 에러들을 고치는게 필요할수도 있고, pod이 이전과는 다르게 행동할수도 있습니다.

`minor` 숫자가 증가했을때, 새로운 기능이 추가되었지만, 이전버전과 호환할수 있습니다. 업그레이드를 결정했을때 새로운 기능이 필요할수도 있고 필요하지 않을수도 있지만, 빌드 오류가 발생하거나 기존의 동작을 변경해서는 안됩니다.

`patch` 숫자가 증가했을때, 고쳐진 버그가 추가됬지만 새로운 기능은 추가되지 않거나, 동작이 변경되었음을 의미합니다. 일반적으로, 항상 안정적인(stable) 최신 버전의 pod를 가지기 위해 가능한 빨리 패치 버전을 업그레이드 하려고합니다.

마지막으로 위의 규칙에 따라 가장 높은 순서의 번호(patch 보다 minor, minor 보다 major) 낮은 순서의 숫자는 0으로 재설정 되어야 합니다. 

예가 필요합니까?

`1.2.3` 이 현재 버전인 pod를 고려해봅시다.

이전 버전과 호환할수 없는 변경 사항이 발생했다면, 새로운 기능을 가지지 않았지만 기존의 버그를 수정하고 다음 버전 숫자는 2.0.0 입니다.

---

## Challenge Time

`2.4.6`가 pod의 현재 버전이고 버그를 고치고, 이전버전과 호환가능한 기능이 추가되었다면, 다음 새 버전은 무엇으로 해야할까요? 

> 정답은 `2.5.0`: 변경사항에 이전버전과 호환가능한 기능이 추가되었으면 `minor` 버전 숫자를 증가시키고 `patch` 번호를 `0` 으로 재설정합니다.

`3.5.8`이 pod의 현재 버전이고 이전버전과 호환할수 없는 기존 기능이 변경된 경우 다음 새 버전 번호는 무엇인가요?

> 정답은 4.0.0: 기존의 행동을 수정하는 변경이라면 이전 버전과 호환되지 않습니다. 따라서 `major` 번호를 늘려야하고 `minor` 번호와 `patch` 번호를 0으로 재설정합니다.

`10.20.30`이 pod의 현재 버전이고 오직 버그만 고쳤다면 다음 새 버전은 무엇인가요?

> 정답은 10.20.31: 오직 버그만 고쳤다면 `patch`번호만 증가되어야 합니다.


> 버저닝 세팅에 대한 좋은 가이드 이지만 절대적이지는 않습니다. 개인, 팀에 생각에 따라서 조금 다를수 있습니다.



---

## Where to go from here?

 
[CocoaPods 1.5.0 — Swift Static Libraries](http://blog.cocoapods.org/CocoaPods-1.5.0/)<br>
[BASIC OVERVIEW OF STATIC AND DYNAMIC FRAMEWORKS ON IOS](https://www.runtastic.com/blog/en/frameworks-ios/)<br>
[Dynamic Versus Static Framework in iOS](https://www.ca.com/en/blog-developers/dynamic-versus-static-framework-in-ios.html)




