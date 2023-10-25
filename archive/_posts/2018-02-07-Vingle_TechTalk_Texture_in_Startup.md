---
layout:     post
title:      "Vingle TechTalk 후기"
subtitle:   "Rxswift를 이용한 MVVM, Texture를 이용한 Feed 적용 사례"
date:       2018-02-07 23:59:00
author:     "MinJun"
comments: true
tags: [Swift, Idea]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/ComputerScience-bg.jpg
thumbnail-img: /assets/post_img/background/ComputerScience-bg.jpg
share-img: /assets/post_img/background/ComputerScience-bg.jpg
toc: true
---

## Vingle TechTalk Texture in Startup

---
(작성중)

18.2.8(목) Vingle TeckTalk 에 다녀왔습니다. 세션은 두가지 였습니다. 

1. RxSwift를 이용한 MVC에서 MVVM으로 넘어가기
2. Texture(AsyncDisplayKit)을 이용한 Feed 적용 사례 및 노하우 

기존에 서비스 되고있는 Vingle의 문제점들을 어떻게 해결했고, 해결할때 어떤 도구를 사용했는지 이야기 하는 무겁지 않은 자리 였습니다. 세션의 내용 중 유용하다고 생각되는것들을 개인적으로 기록하기 위해서 작성합니다. 

---

## 1. RxSwift를 이용한 MVC에서 MVVM으로 넘어가기 

- MVVM을 사용하게된 이유 

A: MVVM 패턴을 사용하기 이전에는 MVC 패턴을 사용했는데, MVC 패턴을 사용하니까 ViewController가 점점 커지게 되었고 그것으로 인해서 코드의 가독성이 안좋아졌고, 디버깅시에도 시간이 많이 걸린다는 단점이 있었습니다. 그것의 대안으로 RxSwift를 사용해서 MVC 패턴을 MVVM 패턴으로 바꾸어서 설계했고, 기존의 문제들이 해결 되었습니다. 

- RxSwift를 업무에 사용하게되면서 발생된 문제점
	
1. Thread 관리 오류 
2. Closure를 잘못사용해서 발생하는 memory누수 
	- 프로파일링을 통해서 해결 시도하고있음

## 2. Texture(AsyncDisplayKit)을 이용한 Feed 적용 사례 및 노하우 

- Texture를 도입하게된 이유 
	- 기존의 Vingle은 사용하면 발열이 많다는 피드백 받음 
	- 복잡한 UI, 피드에 미디어들이 많이 사용됨 
	- 랜더링시 비트맵 수 증가, memory footprint, cpu 사용량 증가...

- Texture란?

---

## Reference

[Texture GitHub](https://github.com/TextureGroup/Texture)
[RxSwift GitHub](https://github.com/ReactiveX/RxSwift)