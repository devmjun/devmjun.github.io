---
layout:     post
title:      "Xcode. Wireless development 환경 구성하기"
subtitle:   "What`s is New in Xcode9"
date:       2018-02-24 21:49:00
author:     "MinJun"
header-img: "img/tags/Xcode-bg.jpg"
comments: true 
tags: [Xcode]
categories: archive
permalink: /archive/:title
---

Xcode 9에 업데이트된 편한 기능인 `Wierless developemnt`을 사용하는 방법을 알아보겠습니다! 

---


#### 1. 

Xcode 9을 실행한 후 `Windows > Devices and Simulators`로 이동합니다.

#### 2.

맥과 디바이스를 USB 케이블로 연결합니다. 

### 3.

왼쪽 디바이스 목록에서 원격으로 연결할 디바이스를 선택한 후 `Connect via network` 옵션을 선택합니다. 
그러면 조금 후 디바이스 로그가 표시되고 디바이스 목록에 표시된 이름 옆에 네트워크 아이콘이 표시됩니다. `이때 디바이스와 연결된 데스크탑, 노트북은 같은 무선인터넷에 연결되어 있어야 합니다!` <br>

<center><img src="/img/posts/Wireless_development.png" width="700"></center> <br> 

#### 4. 

페어링 과정이 완료 되었습니다. 맥과 연결된 USB 케이블을 제거합니다.

#### 5.

프로젝트를 열고 Run Destination을 확장합니다. 그러면 페어링된 디바이스 목록이 표시됩니다. Run 버튼을 누르면 다바이스에 앱이 설치되고 원격으로 디버깅 할 수 있습니다.

<center><img src="/img/posts/Wireless_development-1.png" width="500"></center> <br> 


페어링을 완료해 두면 Xcode 뿐만 아니라 `Instruments, Configurator, Accessibility Inspector`와 같은 다양한 개발 도구에서도 디바이스와 원격으로 연결할 수 있습니다.

책상위의 케이블이 한개 줄었습니다😄

---

## Reference 

[Debugging with Xcode 9](https://developer.apple.com/videos/play/wwdc2017/404/?time=78)
