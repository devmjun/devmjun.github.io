---
layout:     post
title:      "Swift. Concurrent vs Parallelism 7"
subtitle:   "Concurrent, Parallelism를 알아봅시다!"
date:       2018-05-05 13:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Concurrent vs Parallelism 


<center><img src="/img/posts/conVsPara.png" width="700" height="700"></center> <br>  


- `Concurrency`: Composition of independently extued task
- `Parallelism`: Simultaneous execution of closely related computations

> 동시성(Concurrency)는 싱글코어 환경에서 멀티스레딩을 하기위해 여러개의 스레드가 번갈아가면서 실행되는 방식. 동시성을 싱글코어 멀티 테스킹은 사실 하나의 코어가 여러개의 스레드를 번갈아 가면서 조금씩 실행되고 있는것 입니다.
> 
> 병렬성(Parallelism)은 멀티코어에서 멀티스레드를 동작 시키는 방법으로, 한개의 코어를 포함하는 각 스레드들이 동시에 실행되는 방식입니다.
>

[여기](http://www.jiniya.net/wp/archives/5856)에는 Concurrent와 Parallelism에 대한 설명을 많이하지는 않지만 해당 내용을 이해하기위해 필요한 내용들이 잘 정리되어 있습니다.

[Simultaneous multithreading](https://en.wikipedia.org/wiki/Simultaneous_multithreading)

---

## Parallelism with GCD

- `DispatchQueue.concurrentPerform`의 메소드로 `병렬성(Parallelism)` 연산을 할수 있습니다.
- 병렬성은 `for-loop`에 스레드가 호출되어서 연산(computation)에 참여합니다
- 많은 비동기 동시성 큐보다 효율적입니다. 

```swfit
DispatchQueue.concurrentPerform(1000) { i in /* iteration i */ } 
dispatch_apply(DISPATCH_APPLY_AUTO, 1000, ^(size_t i){ /* iteration i */ })
```

> 개인 Note: 다른 DispatchQueue과 일련을 작업과정을 넣어서 시간 테스트를 해보았는데 잘못 사용했는지 시간이 오히려 늘어나더군요 ㅠ.ㅠ정확한 사용법을 알고 계신분 계시면 댓글 남겨주시면 정말 도움이 됩니다!

---

## 여담

틀린 부분이나 잘못된 부분을 댓글로 알려주면 정말 큰 도움이 됩니다!

---


## Reference 

[DispatchQueue.AutoreleaseFrequency](https://developer.apple.com/documentation/dispatch/dispatchqueue.autoreleasefrequency)<br>


---
