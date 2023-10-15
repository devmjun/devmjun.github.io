---
layout:     post
title:      "Functional, Reactive, Programming, Paradigm"
subtitle:   "각 용어들을 명확하게 이해하고 정리해보자"
date:       2018-03-22 19:04:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, RxSwift, RxCocoa]
categories: archive
permalink: /archive/:title
---

곰튀김님 영상보고 중요한 부분만 정리했습니다. 링크는 아래에 있습니다. 


- Programming 
- Paradigm
- Functional 
- Reactive

---

## Programming 

input -> Program -> output 

인풋으로 아웃풋을 만들어내고, 인풋으로 아웃풋을 만들어내는 과정을 프로그래밍 이라고 합니다.
input: 마우스 터치, 손가락 터치 이벤트 등을 취급합니다. 

---

## Paradigm(패러다임)

동시대를 살아가는 사람들끼리 비슷한 생각을 가지고 있는것이 있습니다. Paradigm을 설명하기 위해서 임의로 시대를 3개의 시대로 나눕니다. 

#### - Low Memory 

Low Memory 시대에는 Memory가 적기 때문에, 인풋 데이터로 부터 아웃풋 데이터를 만들기 위해서 최적화된 프로그램을 만들기 위한것이 중점입니다. 그런데 메모리가 적어서 데이터를 처리하는데, 처리해야하는 데이터가 바뀌게 되면 데이터도 바뀌게 됩니다. 

Data:Program = 1:1 로 대응 하게됨..

#### - Mass Production 

데이터가 바뀌면 프로그램이 바뀌는것을 해결하기위해서, 재사용성을 높이기 위한 방법들을 찾게되고, 그것에 대한 해결방법을 고민하기 시작함. OOP 등의 용어들도 이 시대에 나타나게된 용어입니다. 

#### - Concurrency 

동시에 여러가지 프로그램들이 돌아가는게 가능하게 됨. 이 시대에는 프로그램이 하나가 아니라 동시에 여러개가 돌아감. 내가 만든 프로그램이 동시에 여러가지 인스턴스로 사용이 됩니다. 이때 중요한것은 돌아가는 프로그램이 다른 프로그램에 영향을 주게되면 안됨. 그래서 Performance / Rsponsibility 가 중요하게 됨. 

어떤 데이터가 있는데 여러가지 프로그램들이 동시에 데이터를 읽게되는 환경이 되면 문제가 발생하게됩니다. 

```swift
* 동시에 여러 프로그램들이 해당 값에 접근 할때, 읽는것은 문제 되지 않지만 쓰기가 문제 되게 됩니다.(어떻게 보면 쓰기가 문제되기 떄문에, 연속적으로 값이 변경되는 상황이라면 읽기도 정상적인 읽기(?)라고 보기 어려울수도 있을것 같습니다)

var data: Int = 0

func addAndGet(add: Int) -> Int {
	data += add 
	return data
}
```

<center><img src="/img/posts/Functional_Programming.png" width="500" height="300"></center> <br> 


이러한 문제들을 해결하기 위해서 기존에는 세마포어, 뮤텍스를 사용해서 싱크(동기화)를 맞추어서 사용했습니다. <br>

<center><img src="/img/posts/Functional_Programming-1.png" width="500" height="300"></center> <br> 

그런데, 이제는 아주 간단한 방법으로 이것을 해결합니다. 읽는것은 가능하지만, 쓰는것을 못하게 해서 해결합니다. `Immutable` 이라는 단어가 이렇게 나오게됩니다.

---

## Side-Effect

<center><img src="/img/posts/Functional_Programming-2.png" width="500" height="300"></center> <br> 

외부에 영향을 줄수있지 않은 방법으로 프로그래밍 하자! 라는 공감대가 형성됩니다. 

---

## Functional 

<center><img src="/img/posts/Functional_Programming-3.png" width="500" height="300"></center> <br> 

---

## Functional 

<center><img src="/img/posts/Functional_Programming-4.png" width="500" height="300"></center> <br> 

명령형 프로그래밍: 데이터를 정의하고 그것의 변화 과정을 프로그래밍 할것이냐? 
함수형 프로그래밍: 행위를 정의하고 그것에 데이터를 집어 넣을것이냐? 

기존의 생각의 관점을 데이터에 두느냐, 함수에 놓느냐에 대한 생각에 이동..

---

## functional 

- 데이터는 immutable 하게 취급하자
- 데이터 변경이 필요할 때는 새로 만들자
- Side-Effect을 없애기 위해서 Pure Function을 사용하자
- Function 들의 Composition과 High-Order Function으로 프로그램을 만들자
- **Data가 아닌 Process에 집중해서 프로그램을 만들자**

---

## Reactive 

`asynchrous`한 상황에서 데이터를 어떻게(`Stream`) 처리할것인가에 대한 아이디어

<center><img src="/img/posts/Functional_Programming-5.png" width="500" height="300"></center> <br> 

<center><img src="/img/posts/Functional_Programming-6.png" width="500" height="300"></center> <br> 

- Async 한 처리를 Functional 하게 처리하자
- 리턴값은 Stream인 Observable을 반환하자
- Stream에 흐르는 Data/Event를 Operator로 처리하자
- Stram과 Stream을 연결하자
- **Data가 아닌 Process에 집중해서 프로그램을 만들자**
	- Functional과 관점이 비슷합니다. 

---

## Summary 

#### - Functional 

Side-Effect가 없도록 프로그래밍 하는 패러다임 

#### - Reactive 

Async한 작업을 Functional하게 처리하는 아이디어

#### - RxSwift

Reactive 아이디를 구현한 Swift 라이브러리 

---

## Reference 

[Functional-Programming Slide](https://www.slideshare.net/ChiwonSong/20180310-functional-programming) <br>
[Functional-programming Youtube](https://www.youtube.com/watch?v=cXi_CmZuBgg&feature=youtu.be) <br>