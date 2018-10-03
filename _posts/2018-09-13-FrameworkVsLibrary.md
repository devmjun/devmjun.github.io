---
layout:     post
title:      "iOS, Framework vs Library(Static & Shared) in Cocoa/OSX, Cocoa Touch/iOS"
subtitle:   "iOS에서 프레임워크와 라이브러리의 차이점을 알아보자!"
date:       2018-09-13 17:45:00
author:     "MinJun"
header-img: "img/tags/iOS-bg.jpg"
comments: true 
tags: [Swift, iOS]
---

[Framework vs Library (Static & Shared) in (Cocoa/OSX, Cocoa Touch/iOS)](http://www.knowstack.com/framework-vs-library-cocoa-ios/)의 포스팅을 의역했습니다. 

---

## Contents 

- Framework vs Library (Static & Shared) in (Cocoa/OSX, Cocoa Touch/iOS)
- What is a Library? 
- Static Library 
- Shared Library 
- Frameworks
- How are Frameworks and Library Different from each other?
- Libraries or Frameworks?
- Location / Deployment of Frameworks
- Reference 

---

## Framework vs Library (Static & Shared) in (Cocoa/OSX, Cocoa Touch/iOS)



이 논설에서는 Cocoa-OSX 또는 Cocoa Touch - iOS 애플리케이션에서 재사용 가능한 코드를 묶는 다양한 옵션에 대해서 이야기합니다.

---

## What is a Library? 

Library는 프로그램이 연결할수 있는 패키징된 객체 파일들의 모음 입니다.

- 라이브러리는 다음과 같습니다
	- 정적 라이브러리(Static Library)(주된(main) 실행파일의 코드에 패킹되어 있습니다)
	- 공유 라이브러리(Shared Library)( 링커(The linker)는 단지 라이브러리의 참조만 저장하고 그 자체는 주된(main) 실행파일에 패키징 되어 있지 않습니다.)

---

## Static Library 

> Note: 정적 라이브러리는 대게 일반적으로 사용됬던 옵션입니다(iOS8 까지 배포되었었음) 정적 라이브러리는 단지 `옵션` 입니다. iOS8 개발자는 Cocoa Touch Framework를 사용할수 있습니다. 

- 정적 라이브러리는 일반적으로 다음을 위해 사용됩니다.
	- 프로그램 연결에 대해 
	- 각 major 모듈이 자체 정적 라이브러리에 저장되는 빌드 시스템을 단순화합니다. 그런 다음 모든 정적 라이브러리가 함께 링크되어 최종 실행 가능 프로그램을 작성합니다. 

---

## Shared Library 

정적 라이브러리를 사용하는 동안, 코드는 실행 프로그램에 물리적으로 연결되어 집니다. 정적 라이브러리의 문제는 동일한 정적 라이브러리가 여러 프로그램에서 사용되고 있는 경우 정적 라이브러리가 복사되어진다는 것입니다. 

프로그램이 공유 라이브러리에서 특정 기능이 필요할때, 링크된 것은 `심볼의 이름`과 `라이브러리에 대한 포인터`를 포함합니다. 

- 공유 라이브러리가 따르는 순서 
	1. 프로그램이 실행되어짐 
	2. Loader는 공유 라이브러리를 찾는다 
	3. 공유 라이브러리를 메모리에 로드합니다
	4. 심볼들을 결정하고 참조를 고칩니다. 

공유 라이브러리는 물리적인 RAM에 한번 나타나고 여러 애플리케이션 프로세스간에 공유 됩니다. 그러나 공유 라이브러리의 객체에 사용되어지는 공간은 애플리케이션에 따라서 다릅니다. 

Mac OSX의 공유 라이브러리는 `.dylib`(동적 라이브러리) 확장자를 갖습니다. 

애플리케이션에 연결된 동적 라이브러리 목록을 보려면 다음 명령어를 사용하세요

```
$ nm -mg /Applications/iTunes.app/contents/MacOS/iTunes....
```

---

## Frameworks

라이브러리는 단지 실행 가능한 코드 입니다. 프레임 워크는 공유 라이브러리와 헤더 및 다른 리소스의 하위 디렉토리를 포함하는 번들(디렉토리 구조의) 입니다. 

그러나 프레임워크는 다음을 따르는걸 포함합니다

- 공유된 라이브러리
- API를설명하는 해더파일들 
- 문서(Documentation)
- 추가적인 리소스들
	- Views
	- COntrols
	- Custom Appearance/UI
	- Assets
	- Configuration Files 

`MyCustomFramework`의 구조. 확장자는 `.framework`

- Sub Framework 1 
- Sub framework 2 
- Version 1.0
	- Library
	- Header 
	- Resource 
- Version 1.1(Current Version - Symbolic Link) 
	- Library 
	- Header 
	- Resources 

---

## How are Frameworks and Library Different from each other?

- `Inversion of Control`은 라이브러리와 프레임 워크를 차이나게 만드는 핵심적인 부분입니다. 라이브러리에서 우리가 제어할수 있는 메소드를 호출할때 프레임 워크에서 컨트롤이 반대로 되어 프레임 워크 코드가 호출됩니다(??? 무슨말인지 모르겠다..)(GUI 프레임 워크는 이벤트 핸들러를 통해서 우리의 코드를 호출 합니다)
- 라이브러리는 본질적으로 우리가 호출할수 있는 클래스들의 집합니다. 각 작업을 수행하고 난 이후 제어(Control)을 클라이언트 에게 반환합니다. 
- 프레임 워크는 더 많은 행동이 포함된 추상디자인을 구현합니다. 이를 사용하려면 프레임 워크의 여러 위치에 하위 클래스를 추가하거나, 코드를 삽입하여 우리의 행동을 추가해야합니다. 프레임 워크 코드는 이 시점에서 코드를 호출합니다.
- 프레임 워크는 뼈대로 간주되어 애플리케이션이 살을 덫대어 작업을 정의할수 있습니다. 프레임 워크의 뼈대에는 여전히 각 부분을 연결하는 코드가 있습니다. 

---

## Libraries or Frameworks?

- 프레임 워크는 제3자에게 라이브러리르 제공하여 사용하는 것처럼 좋습니다. 다른 개발자는 그들의 애플리케이션 번들에 프레임 워크를 포함할수 있습니다. 
- 애플리케이션 번들에 프레임 워크를 포함시키는 것은 효과적이지만 프레임 워크를 `/Library/Frameworks` 폴더에 넣는다면 관리자 접근이 요구되고 버전관리 문제가 발생할수 있습니다.
	- 해당 내용 확인필요, 가이드 문서와 상이함 [Framework Programming Guide](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Tasks/InstallingFrameworks.html#//apple_ref/doc/uid/20002261-BBCCFBJA)
- Resource Types: `assets`을 정적 라이브러리와 함께 옮길수 없습니다. `.a`는 헤더와 별개 이므로 해더도 포함시켜야 합니다. 프레임 워크를 사용하면 절대적으로 모든 것을 `단일 단위`로 패키지화 할수 있습니다. 
- Packaging: 라이브러리와 비교된 결과 프레임 워크에서 더 좋은 패키징이 됩니다. 
- Live Views: 사용자화한 뷰들이 프레임 워크에 포함되어 있고, 프로젝트에 프레임 워크가 포함되어있다면 그 모든 커스텀 뷰들은 인터페이스 빌더에서 사용 할수 있습니다.
- Apps & Extensions: 앱(application) 과 확장(extension) 간에 재사용할 경우 코드를 두 target에 놓는대신, 코드를 프레임 워크에 놓고 프레임워크는 앱과 확장에 링크되어야 합니다. 
- Setup Effort: 라이브러리에 비해 준비되는 노력이 더 적습니다.
- Memory Footprint: 시스템은 필요할때 메모리에서 프레임 워크를 로드하고 모든 애플리케이션 간에 하나의 리소스 `사본`을 공유합니다. OSX에서 동적 라이브러리의 동작은 동일합니다. 
- Backward Compatibility: 이전 버전과 호환성을 보장하기 위해 프레이 ㅁ워크의 여러 버전을 동일한 번들에 포함할수 있습니다. 
- Private vs Public: 프레임 워크는 개인적(자신의 애플리케이션에서만 사용) 또는 공용(다른 개발자도 사용가능) 이 될수 있습니다. 개인적 프레임 워크는(앱의 번들에, 자원 타입이 프레임 워크인 복사 파일 빌드 단계에서 사용하고 정적 라이브러리 포함한것과 비슷 하게 앱 번들의 크기가 증가합니다.)
- Similar to Dynamic Library: 프레임 워크 번들에 있는 실행가능한 코드는 동적으로 링크된 공유 라이브러리 또는 단순화한 동적 공유 라이브러리 입니다.

---

## Location / Deployment of Frameworks

- /Library/Frameworks (모든 유저)
- ~/Library/Frameworks(한명의 유저)
	- 가능하면 이 옵션은 피해야함
- /Network/Library/Framework
	- 가능하면 이 옵션은 피해야함 
	- 해당 위치 프레임 워크에 링크된 애플리케이션은 동적 링커가 찾을수 있또록 프레임 워크에 대한 정확한 경로를 지정 해야 합니다. 경로가 변경된다면(사용자 홈 디렉토리의 경우 처럼) 동적 링크가 프레임 워크를 찾을수 없습니다.
	- 다른 이유로는 잠재적인 성능 저하 때문입니다. 네트워크 디렉토리나 네트워크 기반 유저 홈 디렉토리에 설치된 프레임 워크들은 컴파일 시간을 현저하게 지연 시킬수 있습니다. 네트웤르르 통해 프레임워크를 로딩하면 target 애플리케이션의 실행 속도가 느려질수 있습니다.
- /System/Library/Frameworks(오직 에플이 제공하는 프레임워크를 위해 예약된 공간..
- In the App Bundle: 개인적인 프레임 워크들(자원 타입이 프레임워크인 복사 파일 빌드 단계에서 사용)

---

## Reference 

[What is the difference between a framework and a library? [closed]](https://stackoverflow.com/questions/148747/what-is-the-difference-between-a-framework-and-a-library)<br>
[Framework Programming Guide](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Tasks/InstallingFrameworks.html#//apple_ref/doc/uid/20002261-BBCCFBJA)<br>
