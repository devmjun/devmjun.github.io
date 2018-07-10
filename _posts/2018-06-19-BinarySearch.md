---
layout:     post
title:      "Swift, Algorithm, linearSearch & BinarySearch"
subtitle:   "선형 탐색과, 이진 탐색"
date:       2018-06-19 17:45:00
author:     "MinJun"
header-img: "img/tags/Xcode-bg.jpg"
comments: true 
tags: [Algorithm, Swift]
---

## Code 

### linearSearch 


```swift
// 0
func example(str: String, isAction: Bool = true, action: () -> Void) {
    print("---------\(str), isAction: \(isAction)---------")
    
    if isAction {
        action()
    }
}

// 1
/*
 Time Complexity O(n)
 */
func linearSearch<T: Equatable>(target: T, in collection: [T]) -> T? {
    
    for item in collection {
        if item == target {
            return item
        }
    }
    return nil
}

example(str: "linearSEarch") {
    var n = [23,35,23,346,457,3,36,2365]
    print(linearSearch(target: 36, in: n))
}
```

linearSearch()는 찾으려는 요소를 배열의 처음부터 끝까지 순회하며 찾습니다. 최악의 경우는 배열에 값이 없는경우, 모든 배열을 순회하고 원하는 값을 찾지 못합니다. 

### BinarySearch 

```swift
/*
 Time complexity O(log n)
 */
func binarySearch<T: Comparable>(target: T, in collection:[T]) -> T? {
    
    var data = collection.sorted()
    // BinarySearch는 collection이 Sort되어있어야함!
    print(data)
    
    var startIndex: Int = 0
    var endIndex: Int = data.count-1
    while startIndex <= endIndex {
        var midIndex: Int = (startIndex + endIndex) / 2
        if data[midIndex] == target {
            return target
        }else if data[midIndex] < target {
            startIndex = midIndex + 1
        }else if data[midIndex] > target {
            endIndex = midIndex - 1
        }
    }
    return nil
}

example(str: "BinarySearch") {
    var n = [23,35,23,346,457,3,36,2365]
    print(binarySearch(target: 23, in: n))
    
}
```

이진 검색은 배열의 범위를 반으로 줄여나가면서 찾으려는 타겟값을 찾습니다. `시간복잡도는 O(log n)` 입니다. 



---

## Reference 

[swift-algorithm-club/Queue](https://github.com/raywenderlich/swift-algorithm-club/tree/master/Queue)<br>
[https://github.com/devminjun/Python3-Basic/blob/master/image/binary_search.pdf](https://github.com/devminjun/Python3-Basic/blob/master/image/binary_search.pdf)<br>


---

