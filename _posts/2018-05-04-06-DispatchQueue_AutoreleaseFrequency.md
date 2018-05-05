---
layout:     post
title:      "Swift. DispatchQueue.AutoreleaseFrequency 6"
subtitle:   "DispatchQueue.AutoreleaseFrequency를 알아봅시다!"
date:       2018-05-05 12:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## DispatchQueue.AutoreleaseFrequency

```swift
public enum AutoreleaseFrequency {
        case inherit
        @available(OSX 10.12, iOS 10.0, tvOS 10.0, watchOS 3.0, *)
        case workItem
        @available(OSX 10.12, iOS 10.0, tvOS 10.0, watchOS 3.0, *)
        case never
    }
```
 
### Inherit

Dispatch queues with this autorelease frequency inherit the behavior from their target queue. This is the default behavior for manually created queues.

### Work Item 

Dispatch queues with this autorelease frequency push and pop an autorelease pool around the execution of every block that was submitted to it asynchronously.

### Never 

Dispatch queues with this autorelease frequency never set up an individual autorelease pool around the execution of a block that is submitted to it asynchronously. This is the behavior of the global concurrent queues.

해당 값들에 대한 설명이 작성되어 있는 문서를 찾지 못했습니다(분명 어디에 있겠지만..ㅠ.ㅠ). 그래서 코드의 설명 부분을 통해서 의미를 추론하여 사용하면 될것같습니다.

---

## 참조한 부분

```swift
/*! <br>
* @typedef dispatch_autorelease_frequency_t <br>
* Values to pass to the <br>
* dispatch_queue_attr_make_with_autorelease_frequency() <br>
* function. <br>
* @const DISPATCH_AUTORELEASE_FREQUENCY_INHERIT <br>
* Dispatch queues with this autorelease frequency inherit the behavior from <br>
* their target queue. This is the default behavior for manually created queues. <br>
* <br>
* @const DISPATCH_AUTORELEASE_FREQUENCY_WORK_ITEM
* Dispatch queues with this autorelease frequency push and pop an autorelease
* pool around the execution of every block that was submitted to it
* asynchronously.
* @see
* dispatch_queue_attr_make_with_autorelease_frequency().
* @const DISPATCH_AUTORELEASE_FREQUENCY_NEVER
* Dispatch queues with this autorelease frequency never set up an individual
* autorelease pool around the execution of a block that is submitted to it
* asynchronously. This is the behavior of the global concurrent queues.
*/

DISPATCH_ENUM(dispatch_autorelease_frequency, unsigned long, DISPATCH_AUTORELEASE_FREQUENCY_INHERIT 	DISPATCH_ENUM_API_AVAILABLE(macos(10.12), ios(10.0), tvos(10.0), watchos(3.0)) = 0,
	DISPATCH_AUTORELEASE_FREQUENCY_WORK_ITEM DISPATCH_ENUM_API_AVAILABLE(
macos(10.12), ios(10.0), tvos(10.0), watchos(3.0)) = 1,
	DISPATCH_AUTORELEASE_FREQUENCY_NEVER DISPATCH_ENUM_API_AVAILABLE(
macos(10.12), ios(10.0), tvos(10.0), watchos(3.0)) = 2,
);
```

---

## 여담

틀린 부분이나 잘못된 부분을 댓글로 알려주면 정말 큰 도움이 됩니다!

---


## Reference 

[DispatchQueue.AutoreleaseFrequency](https://developer.apple.com/documentation/dispatch/dispatchqueue.autoreleasefrequency)<br>

