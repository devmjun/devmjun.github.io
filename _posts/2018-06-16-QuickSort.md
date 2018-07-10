---
layout:     post
title:      "Swift, Algorithm, Quick Sort"
subtitle:   "분할정복 하자!"
date:       2018-06-16 17:45:00
author:     "MinJun"
header-img: "img/tags/Xcode-bg.jpg"
comments: true 
tags: [Algorithm, Swift]
---

## Code 

```swift
func example(str: String, isAction: Bool = true, action: () -> Void) {
    print("---------\(str), isAction: \(isAction)---------")
    
    if isAction {
        action()
    }
}

func quicksort<T: Comparable>(_ a: [T]) -> [T] {
    guard a.count > 1 else { return a }
    
    let pivot = a[a.count/2]
    let less = a.filter { $0 < pivot }
    let equal = a.filter { $0 == pivot }
    let greater = a.filter { $0 > pivot }
    print("\nArray: \(a) \nless: \(less) \nequal: \(equal) \ngreater: \(greater)\nresult:\(less+equal+greater)")
    
    return quicksort(less) + equal + quicksort(greater)
}

example(str: "Quick Sort") {
    let x = createRandomArray(numberOfElements: 10)
    quicksort(x)
}
```

간단하게 Quick Sort 동작 이해하기 위한 녀석, 다른 pivot과 swap을 이용한 방법과 코드는 [https://github.com/raywenderlich/swift-algorithm-club/tree/master/Quicksort](https://github.com/raywenderlich/swift-algorithm-club/tree/master/Quicksort) 



---

## Reference 

[https://github.com/raywenderlich/swift-algorithm-club/tree/master/Quicksort](https://github.com/raywenderlich/swift-algorithm-club/tree/master/Quicksort) 

---

