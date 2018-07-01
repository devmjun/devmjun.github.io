---
layout:     post
title:      "Swift, Algorithm, Insertion Sort"
subtitle:   "2개의 공간에서 비교하며 정렬하자."
date:       2018-06-13 17:45:00
author:     "MinJun"
header-img: "img/tags/Xcode-bg.jpg"
comments: true 
tags: [Swift, Algorithm]
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

example(str: "Insertion Sort", isAction: true) {
    func insertionSort<T: Comparable>(data: [T]) -> [T] {
        var targetData = data
        for index in 1..<targetData.count {
            var innerIndex = index
            let temp = targetData[innerIndex]
            while innerIndex > 0 && targetData[innerIndex-1] > temp {
                print("index: \(index), innerIndex: \(innerIndex), temp, temp-1:  \(targetData[innerIndex]):\(targetData[innerIndex-1]) targetData:\(targetData)")
                targetData[innerIndex] = targetData[innerIndex-1]
                print("index: \(index), innerIndex: \(innerIndex), temp, temp-1:  \(targetData[innerIndex]):\(targetData[innerIndex-1]) targetData:\(targetData)")
                innerIndex -= 1
                
            }
            targetData[innerIndex] = temp
            print("index: \(index), innerIndex: \(innerIndex), targetData:\(targetData)")
            
        }
        return targetData
    }    
	let x = createRandomArray(numberOfElements: 16)
	print(insertionSort(data:x))
}
```

    /**
     1. 정렬이 된곳과, 되지 않는 곳 2공간을 비교하며 정렬합니다.
     2. temp에 비교할 현재 값을 넣어두고, 아래로 내려가며 현재값보다 크거나 작은 값이 나올때까지 다른값들을 변경하여
     3. 비교대상할 값보다 작은 값이 나오면 반복문을 나온후, 해당 값을 반복할때 변경한 인덱스를 이용하여 값을 바꾸어줌.
     */

---

## Time Complexity

<center><img src="/img/posts/TimeComplexity.png" width="700" height="700"></center> <br> 

<center><img src="/img/posts/TimeComplexity_1.png" width="700" height="700"></center> <br> 

<center><img src="/img/posts/TimeComplexity_2.png" width="700" height="700"></center> <br> 

---

## Reference 

[https://en.wikipedia.org/wiki/Insertion_sort](https://en.wikipedia.org/wiki/Insertion_sort)<br>
[https://www.dropbox.com/s/olt1h5c3t1g2rbh/Insertion%20Sort.pdf?dl=0](https://www.dropbox.com/s/olt1h5c3t1g2rbh/Insertion%20Sort.pdf?dl=0)<br>
[https://docs.cs50.net/2016/fall/notes/3/week3.html#sorting](https://docs.cs50.net/2016/fall/notes/3/week3.html#sorting)<br>


---

