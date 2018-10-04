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

## BuildTimeAnalyzer-for-Xcode

[BuildTimeAnalyzer-for-Xcode](https://github.com/RobertGummesson/BuildTimeAnalyzer-for-Xcode) 여기에서 멋진 오픈소스 툴을 받아서 사용할수 있습니다. 

프로젝트의 소스코드를 분석해서 컴파일하는데 어떤 부분에서 얼마나 시간이 걸리는지 확인할수 있습니다. 이를 통해 문제가 되는 부분을 찾아내고 최적화하는 아이디어를 얻을수 있습니다.

> Note: 위의 설명방법이 잘 작동하지 않을때 [해당 링크](http://irace.me/swift-profiling)를 통해서 확인합니다.

---

## 컴파일 시간 향상 방법 

1. [<U>Optimizing Build Times in Swift 4</U>](https://medium.com/rocket-fuel/optimizing-build-times-in-swift-4-dc493b1cc5f5)
2. [<U>Speed up Swift compile time</U>](https://hackernoon.com/speed-up-swift-compile-time-6f62d86f85e6)
3. [<U>Writing High-Performance Swift Code</U>](https://github.com/apple/swift/blob/master/docs/OptimizationTips.rst)
4. [<U>Swift 컴파일 속도를 향상시키자</U>](https://medium.com/marojuns-ios/swift-%EC%BB%B4%ED%8C%8C%EC%9D%BC-%EC%86%8D%EB%8F%84%EB%A5%BC-%ED%96%A5%EC%83%81%EC%8B%9C%ED%82%A4%EC%9E%90-51617509e35) 



---

## Build Setting 최적화 레벨 조정 

1. Target — Build Setting 에서 Optimization Level의 디버그 항목을 None 으로 최적화 레벨을 조정합니다.

<center><img src="/img/posts/SwiftCompiler.png" width="700" height="300"></center> <br> 

---

## WMO(WHOLE MODULE OPTIMIZATION) 기능 켜기

2. 빌드세팅의 `User-Defined` 항목으로 `SWIFT_WHOLE_MODULE_OPTIMIZATION = YES`을 추가합니다. 

<center><img src="/img/posts/SwiftCompiler-1.png" width="700" height="300"></center> <br> 

`+`버튼을 눌러서 추가합니다.

<center><img src="/img/posts/SwiftCompiler-2.png" width="700" height="300"></center> <br> 

추가완료!

> 해당 기능을 WMO라고 줄여서 부르기도 하는데 빌드시 모든 파일을 한번에 분석해 최적화 하는 방법을 말한다.

---

## Remove dSYM file from Debug

dSYM (디버그 기호 파일)은 디버깅 정보를 가져 와서 dSYM 번들에 저장하는 파일이다. 이것은 프로젝트를 컴파일할때마다 생성되는데 디버깅시에는 DWARF 값이 변경되기때문에 사실상 필요가 없어 릴리즈 모드시에만 적용하도록 합니다.

<center><img src="/img/posts/SwiftCompiler-3.png" width="700" height="300"></center> <br> 

---

## Empty your Derived Data(Xcode 9이하)

> 프로젝트를 만들때 문제가 발생한다면 이 부분부터 시작해야한다. 해당 폴더에 프로젝트 빌드의 결과 등이 저장되어 있습니다. 가끔 빌드가 꼬이면 해당폴더를 삭제시 잘 수행되는 경우가 있기에 첫 머리말을 이렇게 시작한것 같습니다. 참고로 첫번째로 소개했던 방법을 수행해 보신분들은 빌드시 생성되는 Derived Data 를 통해 컴파일 속도분석이 이루어 진다는 것을 알 것입니다

File -> Project Settings 에서 DerivedData 를 선택하면 해당 폴더에 접근이 가능합니다. 이것을 삭제하도록 합니다. 지워도 되나 싶을수 있지만 염려할 필요는 없습니다. 프로젝를 실행하면 다시 생성되기 때문입니다. 잊지 말아야할 것은 데이터를 지우고 프로젝트를 클린해야한다는 것입니다. (CMD+Shift+K)

<center><img src="/img/posts/SwiftCompiler-4.png" width="700" height="300"></center> <br> 

---

## Parallel Commands Opt-In

[Xcode 9.2](https://developer.apple.com/library/content/releasenotes/DeveloperTools/RN-Xcode/Chapters/Introduction.html#//apple_ref/doc/uid/TP40001051-CH1-SW950) 에 추가된 Parallel Commands Opt-In 기능입니다. 

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

## Xcode 새로운 빌드 시스템 

Xcode 9를 통해서 Apple은 [WWDC 2017](https://developer.apple.com/videos/play/wwdc2017/402/) 에서 새로운 빌드 시스템을 발표 했습니다. 그러나 어떤 이유로 인해 기본으로 사용하도록 설정되지 않고 미리보기(Preview)로 사용할수 있습니다. 

그리고 애플은 Xcode의 최신 버전에서 기본값으로 맘ㄴ들 것이라고 말했습니다. 그것은 미래에 해당 빌드 시스템을 받아 들어야함을 의미합니다.

현재 XCode는 기본적으로 `Standard Build System`을 사용하는데, Swift 프로젝트를 컴파일하는데 약간 느립니다. Swift 프로젝트의 컴파일 및 빌드 시간을 개선하기 위해 Apple은 성능 및 종속성 관리를 비롯하여 이 분야에서 발전할 수 있는 새로운 `New Build System`을 출시 했습니다. Xcode 9의 [Apple documentation](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/WhatsNewXcode/xcode_9/xcode_9.html)에 따라 새로운 빌드 시스템은 다음을 수행합니다.

- Provide higher reliability
- Catch project configuration bugs
- Improve the overall build performance

### - How to enable New Build System 

새로운 빌드 시스템을 사용하는 방법은 여러가지가 있습니다

### - From Xcode 

Xcode 자체에서 새 빌드 시스템을 사용하도록 설정하여 앱을 개발하는 동안 모든 기능을 사용할 수 있게 하는것이 좋습니다. <br>

<center><img src="/img/posts/NewBuildSystem.png" width="600" height="500"></center> <br> 

하나가 활성화되면 파란색 망치를 볼수 있습니다. 

<center><img src="/img/posts/NewBuildSystem-1.png" width="600" height="200"></center> <br> 

### - From Command Line 

[command line](https://developer.apple.com/library/content/technotes/tn2339/_index.html) 에서 빌드한다면 `UseNewBuildSystem=YES` 파라미터를 추가하여 전달해야합니다(새 빌드 시스템을 강제 실행합니다)

[fastlen Gym](https://github.com/fastlane/fastlane/tree/master/gym) 으로 프로젝트를 진행한다면 추가 flag가 Gym에 구현되어 있는지 확인할수 없습니다...

### - Using Flag 

[참조 링크](https://twitter.com/rballard/status/938216933303885824)Xcode 9.2+ 이상에서 Flag를 사용하여 새로운 빌드 시스템을 사용할수 있습니다.

```swift
defaults write com.apple.dt.Xcode BuildSystemScheduleInherentlyParallelCommandsExclusively -bool NO
```

### - What Changed in Xcode 

새로운 빌드시스템을 사용했을때 workspace또는 프로젝트 셋팅에서 아래의 변한 값을 확인할수 있습니다.

```swift
<dict>
       <key>BuildSystemType</key>
       <string>Latest</string>
</dict>
```

프로젝트 설정에 키 하나만 추가됩니다. 새로운 빌드 시스템은 해당 빌드 설정을 변경을 권장하지 않습니다. 즉, 새로운 빌드 설정을 익힐 필요없이 새로운 빌드 시스템으로의 이전이 매우 쉽다는 것을 의미 합니다. 

### - New Build System Under The Hood

지금까지 보았듯이 Xcode 빌드 설정에서 변경된 사항은 없습니다. 이 빠른 Swift의 빌드 마법은 기존적으로 새로운 빌드 시스템 [swift-lldb](https://github.com/apple/swift-lldb) 프로젝트 위에 작성됩니다.

### - Thee You Real Name of New Build System

Xcode App을 살표보고 아래의 디렉토리로 이동한다면

```
$ cd /Applications/Xcode.app/Contents/SharedFrameworks
```
Xcode와 함께 제공되는 모든 프레임워크를 볼수 있습니다. 그리고 XCBuild.frameworks 라는 프레임워크를 찾을수 있습니다. 이것이 새로운 빌드 시스템의 실제 이름이기를 바랍니다(ㅋㅋ)

그러나 Facebook이 동일한 이름으로 구축한 빌드 도구와는 다릅니다. Facebook의 xcbuild에 대한 GitHub Repo 는 [여기](https://github.com/facebook/xcbuild) 입니다.

애플의 Xcbuild 바이너리는 이상한 경로에 있습니다.

```
/Applications/Xcode.app/Contents/SharedFrameworks/XCBuild.framework/Versions/A/Support/xcbuild
```

위의 바이너리의 역활은 현재 게시물의 범위를 벗어나지만 `$PATH`를 추가하고 옵션을 탐색할수 있습니다.

### - Build Time Benchmark

우리는 애플을 신뢰하지만 새로운 빌드 시스템이 정말로 빠른지 확인하기 위해 빌드 시간을 나타내는 기능을 활성화하고 확인합니다.

### - How to Perform Build Time Benchmark Test 

테스트 시작하기 전에 빌드가 끝나면 Xcode에 빌드 시간을 보여주는 설정을 해야합니다.

```
$ defaults write com.apple.dt.Xcode ShowBuildOperationDuration -bool YES
```

해당 기능ㅇ르 켬으로써 빌드 시간을 볼수 있고, 새로운 빌드 시스템 전과 후의 빌드 시간을 비교할수 있습니다.

빌드 시간 기능 적용후, 새로운 빌드 시스템 적용 전 

<center><img src="/img/posts/NewBuildSystem-2.png" width="600" height="200"></center> <br> 

새로운 빌드 시스템 적용후 

<center><img src="/img/posts/NewBuildSystem-3.png" width="600" height="200"></center> <br> 

### Open Issues 

[stack overflow](https://www.google.co.uk/search?q=Xcode+9+New+Build+System+site:stackoverflow.com&sa=X&ved=0ahUKEwie_srn8aPZAhXBUlAKHW0hAAMQrQIIVygEMAM&biw=1222&bih=594)나 다른 채널에서 언급한 몇가지 문제가 있지만 대부분 Objective-C 또는 [Cocoapods](https://github.com/CocoaPods/CocoaPods/labels/new%20build%20system)와 관려되어 있습니다. 

- New Build System reports dependency cycle in Xcode. Reported on Twitter [here](https://twitter.com/depth42/status/956834236035665920)
- New build system resets the build number when using scripted builds. Reported on Twitter [here](https://twitter.com/dhartbit/status/957247744019763200)
- Bunch of [issues open](https://github.com/CocoaPods/CocoaPods/labels/new%20build%20system) in the Cocoapods Github repository.

### Conclusion 

애플이 새로운 빌드 시스템에서 Swift의 빌드 속도를 높이기 위해 상당한 개선을 한것 처럼 우리는 이점을 취해야 합니다. 새로운 빌드 시스템 설정은 현재 빌드 설정을 변경하지 않고도 상용 할수 있습니다

---

## 유용한 기능 

build setting 에서 `Swift Compiler-Custom Flags -> Other swift Flags` 으로 갑니다

```
1. 
Xfrontend -warn-long-function-bodies=200

2. 
Xfrontend -warn-long-expression-type-checking=200
```

위의 첫번쨰 명령어는 임계값 보다 오래 걸리는 모든 `functions`을 확인하고 리포트 합니다. 두번째 명령어는 Xcode 9에서 소개 되었고 임계값보다 오래걸리는 `expressions`을 체크하고 리포트합니다. 일반적으로 WMO 최적화 설정후 100ms임계값에서 시작하는것이 좋습니다.

---

## 유용한 기능 

터미널에서 아래의 명령어를 작성합니다. 

```
$ defaults write com.apple.dt.Xcode ShowBuildOperationDuration -bool YES
```

Xcode 상단에 총 빌드 시간이 표시됩니다.

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
	- [BuildTimeAnalyzer-for-Xcode](https://github.com/RobertGummesson/BuildTimeAnalyzer-for-Xcode)<br>
	- [Optimizing-Swift-Build-Times](https://github.com/fastred/Optimizing-Swift-Build-Times) <br> 

[원문 링크 1](https://medium.com/@RobertGummesson/regarding-swift-build-time-optimizations-fc92cdd91e31)<br>
[원문 링크 2](https://medium.com/swift-programming/swift-build-time-optimizations-part-2-37b0a7514cbe)<br>

[Optimizing Build Times in Swift 4](https://medium.com/rocket-fuel/optimizing-build-times-in-swift-4-dc493b1cc5f5)<br>
[Speed up Swift compile time](https://hackernoon.com/speed-up-swift-compile-time-6f62d86f85e6)<br>
[Writing High-Performance Swift Code](https://github.com/apple/swift/blob/master/docs/OptimizationTips.rst)<br>
[Swift 컴파일 속도를 향상시키자](https://medium.com/marojuns-ios/swift-%EC%BB%B4%ED%8C%8C%EC%9D%BC-%EC%86%8D%EB%8F%84%EB%A5%BC-%ED%96%A5%EC%83%81%EC%8B%9C%ED%82%A4%EC%9E%90-51617509e35) <br>
[Xcode New Build System for Speedy Swift Builds](https://medium.com/xcblog/xcode-new-build-system-for-speedy-swift-builds-c39ea6596e17)<br>

[WMO 알아보기(컴파일 최적화)](https://brunch.co.kr/@joonwonlee/14)<br>

[[번역] SIL(Swift Intermediate Language), 일단 시작해보기까지](http://woowabros.github.io/swift/2018/03/18/translation-SIL-for-the-moment-before-entry.html)<br>
[SIL(Swift Intermediate Language)을 통한 Swift debugging](http://woowabros.github.io/swift/2018/03/18/swift-debugging-with-SIL.html)<br>
[The Swift compilation process and swiftc](https://www.packtpub.com/mapt/book/application_development/9781785282201/8/ch08lvl1sec65/the-swift-compilation-process-and-swiftc)<br>
[Swift Internals- LLVM, Type system, Swift Foundation을 중심으로](https://academy.realm.io/kr/posts/swift-internals-llvm-type-system-swift-foundation/)


---



