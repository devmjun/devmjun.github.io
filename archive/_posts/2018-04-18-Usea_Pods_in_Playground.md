---
layout:     post
title:      "iOS. Playground 에서 CocoaPods 쉽게 설치하여 사용하기"
subtitle:   "Marathon 과 testDrive를 사용합니다."
date:       2018-04-18 12:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
---

플레이 그라운드에서 Pods 파일을 인스톨하여 코드를 확인해보고 싶을때가 있습니다. 그런데 플레이 그라운드에 Cocoa Pods을 설치하는게 불편합니다. 

`Marathon`, `testDrive`라는 두개의 오픈 소스가 고민을 해결해 줍니다.

---

목적은 [TestDrive](https://github.com/JohnSundell/TestDrive)를 사용하는 것인데, 설치 방법중 하나가 [marathon](https://github.com/johnsundell/marathon)을 이용해서 TestDrive를 설치 해야 합니다. 

---

## Marathon 설치

Marathon은 Swift script를 쉽게 쓰고, 실행하고 관리하는 커맨드라인 툴입니다. 

`homebrew`로 설치 시도했는데 잘 설치되지 않아서 `Swift Package Manager` 로 설치했습니다. 

- homebrew 설치 방법

```
brew install marathon-swift
```

- Swift Package Manager 설치 방법

```
$ git clone https://github.com/JohnSundell/Marathon.git
$ cd Marathon
$ swift build -c release
$ cp -f .build/release/Marathon /usr/local/bin/marathon
```

> Note: 설치후, 터미널 종료후 재실행 합니다.(다른 설치 방법은 [여기](https://github.com/johnsundell/marathon)에 있습니다.)

---

## TestDrive 설치

TestDrive는 Playground에서 쉽게 pod, framework를 사용할수 있게 도와줍니다. 

아래의 명령어를 터미널에서 입력하여 설치합니다. 

```
marathon install johnsundell/testdrive
```

---

## Usage 

<center><img src="/img/posts/TestDrive.png" width="700" height="500"></center> <br> 

> Note: `-v` 옵션은 버전을 `-p` 옵션은 플랫폼을 나타냅니다. 사실 입력하지 않고 `testDrive RxSwift`하면 최신버전을 알아서 받아줍니다. 

<center><img src="/img/posts/TestDrive1.png" width="700" height="500"></center> <br> 

설치가 완료되면 플레이 그라운드가 자동으로 실행 됩니다. 사용하려고 하는 플랫폼에서 컴파일후(사용하려고 라이브러리를 컴파일 해야합니다), `import` 명령어 작성하여 확인하면 잘 작동하는 모습을 확인할수 있습니다.


---

## Reference 


[TestDrive](https://github.com/JohnSundell/TestDrive)<br>
[marathon](https://github.com/johnsundell/marathon)<br>
[동영상 설명](https://www.youtube.com/watch?v=qf7xVYYsR0Y&t=282s)





---







