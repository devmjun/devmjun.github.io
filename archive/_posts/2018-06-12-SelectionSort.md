---
layout:     post
title:      "Swift, Algorithm, Selection Sort"
subtitle:   "제일 작은거를 골라!!"
date:       2018-06-12 17:45:00
author:     "MinJun"
header-img: "img/tags/Xcode-bg.jpg"
comments: true 
tags: [Swift, Algorithm]
categories: archive
permalink: /archive/:title
---

## Code 

```swift
func example(str: String, isAction: Bool = true, action: () -> Void) {
    print("---------\(str), isAction: \(isAction)---------")
    
    if isAction {
        action()
    }
}

func createRandomArray(numberOfElements: Int = 10) -> [Int] {
    var randomIntInArray: [Int] = [Int]()
    while randomIntInArray.count != numberOfElements {
        let popRandomValue = Int(arc4random_uniform(11))
        randomIntInArray.append(popRandomValue)
    }
    return randomIntInArray
}

example(str: "Selection Sort", isAction: true) {
    func selectionSort<T: Comparable>(data: [T]) -> [T] {
        guard data.count > 1 else { return data }
        var targetData = data
        var counter: Int = 0
        for index in 0..<(targetData.count-1) {
            var lowestIndex = index
            for innerIndex in index+1..<targetData.count {
                counter += 1
                print("index:\(index), innerIndex:\(innerIndex), 비교: \(targetData[lowestIndex]), \(targetData[innerIndex]), \(targetData)")
                if targetData[lowestIndex] > targetData[innerIndex] {
                    // index를 바꾸내?
                    lowestIndex = innerIndex
                }
            }
            index != lowestIndex ? targetData.swapAt(index, lowestIndex) : print("현재 값이 가장 작거나 같음\(targetData[index]), \(targetData[lowestIndex])")
        }
        print("counter is \(counter)")
        return targetData
    }

    let x = createRandomArray(numberOfElements: 16)
    print(selectionSort(data: x))
}
```

1. `[5,4,3,2,5,6...1]`: 총 10개의 요소가 있는 배열
2. 가장맨 앞자리에 가장 작은 숫자를 찾아서 채워넣는 방식
	1. 5 -> 4랑 비교 4가 작내 -> 4 3이랑 비교 3이 작내 -> 3 2랑 비교 2가 작내.... 1이랑 비교 맨 앞자리 1변경
	2. (첫번째 자리의 가장 낮은수를 찾았으니 두번째 자리부터 나머지 값들 순회) 4 3이랑 비교 3이작내... 반복..

[전체 코드 주소](https://github.com/devmjun/DataStructure)

---

## Time Complexity

<center><img src="/img/posts/TimeComplexity.png" width="700"></center> <br> 

<center><img src="/img/posts/TimeComplexity_1.png" width="700"></center> <br> 

<center><img src="/img/posts/TimeComplexity_2.png" width="700"></center> <br> 

---

## Reference 

[https://www.dropbox.com/s/d1q2iz0bc6hjof0/Selection%20Sort.pdf?dl=0](https://www.dropbox.com/s/d1q2iz0bc6hjof0/Selection%20Sort.pdf?dl=0)<br>
[swift-algorithm-club](https://github.com/raywenderlich/swift-algorithm-club/tree/master/Selection%20Sort)<br>
---

