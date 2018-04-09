---
layout:     post
title:      "Xcode. Swift 컴파일러 빠르게 하는 방법 & 컴파일러 시간 분석"
subtitle:   "Build Time Analyzer for Xcode 멋진 툴을 사용합니다."
date:       2018-04-08 21:58:00
author:     "MinJun"
header-img: "img/tags/Xcode-bg.jpg"
comments: true 
tags: [Xcode, Swift]
---

RxSwift를 사용하다보면 자주사용하는 method들은 그냥 작성해서 사용하지만 어떤 부분에서는 생각이 잘 나지 않을때 컴파일이 빠르게 찾아주면 좋지 않을까 생각하다가 찾아보다 보니 멋진 툴이랑, 방법이 있어서 간단하게 알아봅니다.

[원문 링크는 여기입니다-1](https://medium.com/@RobertGummesson/regarding-swift-build-time-optimizations-fc92cdd91e31), [원문 링크는 여기입니다-2](https://medium.com/swift-programming/swift-build-time-optimizations-part-2-37b0a7514cbe)

---

## BuildTimeAnalyzer-for-Xcode

[https://github.com/RobertGummesson/BuildTimeAnalyzer-for-Xcode](https://github.com/RobertGummesson/BuildTimeAnalyzer-for-Xcode) 여기에서 멋진 오픈소스 툴을 받아서 사용할수 있습니다. 

프로젝트의 소스코드를 분석해서 컴파일하는데 어떤 부분에서 얼마나 시간이 걸리는지 확인할수 있습니다. 이를 통해 문제가 되는 부분을 찾아내고 최적화하는 아이디어를 얻을수 있습니다.

> Note: 위의 설명방법이 잘 작동하지 않을때 [해당 링크를 통해서 사용법을 확인합니다!](http://irace.me/swift-profiling)

---

## 컴파일 시간 향상 방법 


1. Xcode 최적화 팁 & 컴파일을 향상시키는 코드작성 방법 
	- [https://medium.com/marojuns-ios/swift-%EC%BB%B4%ED%8C%8C%EC%9D%BC-%EC%86%8D%EB%8F%84%EB%A5%BC-%ED%96%A5%EC%83%81%EC%8B%9C%ED%82%A4%EC%9E%90-51617509e35](https://medium.com/marojuns-ios/swift-%EC%BB%B4%ED%8C%8C%EC%9D%BC-%EC%86%8D%EB%8F%84%EB%A5%BC-%ED%96%A5%EC%83%81%EC%8B%9C%ED%82%A4%EC%9E%90-51617509e35) 
2. Speed up Swift compile time
	- [https://hackernoon.com/speed-up-swift-compile-time-6f62d86f85e6](https://hackernoon.com/speed-up-swift-compile-time-6f62d86f85e6)
3. Swift Optimization tips in Documentation 
	- [https://github.com/apple/swift/blob/master/docs/OptimizationTips.rst](https://github.com/apple/swift/blob/master/docs/OptimizationTips.rst)
4. Optimizing Build Times in Swift 4
	- [개인적으로 가장 유용하다고 생각하는 곳입니다](https://medium.com/rocket-fuel/optimizing-build-times-in-swift-4-dc493b1cc5f5)

---

## 실제로 도움이 되었던 방법들

1. Target — Build Setting 에서 Optimization Level의 디버그 항목을 None 으로 설정합니다.

<center><img src="/img/posts/SwiftCompiler.png" width="700" height="300"></center> <br> 

2. 빌드세팅의 `User-Defined` 항목으로 `SWIFT_WHOLE_MODULE_OPTIMIZATION = YES`을 추가합니다. 

<center><img src="/img/posts/SwiftCompiler-1.png" width="700" height="300"></center> <br> 

`+`버튼을 눌러서 추가합니다.

<center><img src="/img/posts/SwiftCompiler-2.png" width="700" height="300"></center> <br> 

추가완료!

> 해당 기능을 WMO라고 줄여서 부르기도 하는데 빌드시 모든 파일을 한번에 분석해 최적화 하는 방법을 말한다.

3. Remove dSYM file from Debug

dSYM (디버그 기호 파일)은 디버깅 정보를 가져 와서 dSYM 번들에 저장하는 파일이다. 이것은 프로젝트를 컴파일할때마다 생성되는데 디버깅시에는 DWARF 값이 변경되기때문에 사실상 필요가 없어 릴리즈 모드시에만 적용하도록 합니다.

<center><img src="/img/posts/SwiftCompiler-3.png" width="700" height="300"></center> <br> 

4. Empty your Derived Data

> 프로젝트를 만들때 문제가 발생한다면 이 부분부터 시작해야한다. 해당 폴더에 프로젝트 빌드의 결과 등이 저장되어 있습니다. 가끔 빌드가 꼬이면 해당폴더를 삭제시 잘 수행되는 경우가 있기에 첫 머리말을 이렇게 시작한것 같습니다. 참고로 첫번째로 소개했던 방법을 수행해 보신분들은 빌드시 생성되는 Derived Data 를 통해 컴파일 속도분석이 이루어 진다는 것을 알 것입니다

File -> Project Settings 에서 DerivedData 를 선택하면 해당 폴더에 접근이 가능합니다. 이것을 삭제하도록 합니다. 지워도 되나 싶을수 있지만 염려할 필요는 없습니다. 프로젝를 실행하면 다시 생성되기 때문입니다. 잊지 말아야할 것은 데이터를 지우고 프로젝트를 클린해야한다는 것입니다. (CMD+Shift+K)

<center><img src="/img/posts/SwiftCompiler-4.png" width="700" height="300"></center> <br> 

5. [Xcode 9.2](https://developer.apple.com/library/content/releasenotes/DeveloperTools/RN-Xcode/Chapters/Introduction.html#//apple_ref/doc/uid/TP40001051-CH1-SW950) 에 추가된 Parallel Commands Opt-In 기능입니다. 

병렬적으로 Swift 프로젝트를 컴파일 합니다. 따라서 컴파일 시간이 증가하게되는데, RAM 부족으로 인해서 빌드가 느려지는 경우는 위의 방법이 도움이 되지 않습니다.(위의 기능이 활성화된 상태에서는 더 Xcode는 더 많은 메모리를 사용합니다)

사용 방법은 터미널에서

```
defaults write com.apple.dt.Xcode BuildSystemScheduleInherentlyParallelCommandsExclusively -bool NO
```

해당 기능을 끄려면 

```
defaults delete com.apple.dt.Xcode BuildSystemScheduleInherentlyParallelCommandsExclusively
```

---

## 유용한 기능 

build setting 에서 `Swift Compiler-Custom Flags -> Other swift Flags` 으로 갑니다

- `Xfrontend -warn-long-function-bodies=200`
- `Xfrontend -warn-long-expression-type-checking=200`

위의 첫번쨰 명령어는 임계값 보다 오래 걸리는 모든 `functions`을 확인하고 리포트 합니다. 두번째 명령어는 Xcode 9에서 소개 되었고 임계값보다 오래걸리는 `expressions`을 체크하고 리포트합니다. 일반적으로 WMO 최적화 설정후 100ms임계값에서 시작하는것이 좋습니다.

---

## 여담 

위의 방법들을 적용하고 프로젝트의 컴파일 시간을 비교해보니까 확실히 컴파일 시간이 단축되는걸 확인할수 있었습니다! 큰 프로젝트 파일이 아니라서 큰 시간의 감소는 없지만 큰 프로젝트에서 개발환경에서 사용하면 유용할것 같습니다.

컴파일 최적화 전 

<center><img src="/img/posts/SwiftCompiler-5.png" width="700" height="300"></center> <br> 

컴파일 최적화 후 

<center><img src="/img/posts/SwiftCompiler-6.png" width="700" height="300"></center> <br> 


---

## Reference 

- tool 
	- [https://github.com/RobertGummesson/BuildTimeAnalyzer-for-Xcode](https://github.com/RobertGummesson/BuildTimeAnalyzer-for-Xcode)<br>
	- [https://github.com/fastred/Optimizing-Swift-Build-Times](https://github.com/fastred/Optimizing-Swift-Build-Times) <br> 

[원문 링크는 여기입니다-1](https://medium.com/@RobertGummesson/regarding-swift-build-time-optimizations-fc92cdd91e31)<br>
[원문 링크는 여기입니다-2](https://medium.com/swift-programming/swift-build-time-optimizations-part-2-37b0a7514cbe)<br>

[https://medium.com/marojuns-ios/swift-%EC%BB%B4%ED%8C%8C%EC%9D%BC-%EC%86%8D%EB%8F%84%EB%A5%BC-%ED%96%A5%EC%83%81%EC%8B%9C%ED%82%A4%EC%9E%90-51617509e35](https://medium.com/marojuns-ios/swift-%EC%BB%B4%ED%8C%8C%EC%9D%BC-%EC%86%8D%EB%8F%84%EB%A5%BC-%ED%96%A5%EC%83%81%EC%8B%9C%ED%82%A4%EC%9E%90-51617509e35) <br>
[https://hackernoon.com/speed-up-swift-compile-time-6f62d86f85e6](https://hackernoon.com/speed-up-swift-compile-time-6f62d86f85e6)<br>
[https://github.com/apple/swift/blob/master/docs/OptimizationTips.rst](https://github.com/apple/swift/blob/master/docs/OptimizationTips.rst)<br>
[개인적으로 가장 유용하다고 생각하는 곳입니다](https://medium.com/rocket-fuel/optimizing-build-times-in-swift-4-dc493b1cc5f5)

[Swift OptimizationTips.rst](https://github.com/apple/swift/blob/master/docs/OptimizationTips.rst)<br>

---



