---
layout:     post
title:      "Swift, Data Structure, Circular buffer"
subtitle:   "순환하는 자료구조를 만들자~"
date:       2018-06-21 17:45:00
author:     "MinJun"
comments: true 
tags: [DataStructure, Algorithm, Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/ComputerScience1-bg.jpg
thumbnail-img: /assets/post_img/background/ComputerScience1-bg.jpg
share-img: /assets/post_img/background/ComputerScience1-bg.jpg
---

## Code 

```swift
// 0 
// 초기의 버퍼의 기존 사이즈
private struct Constants {
    fileprivate static let defaultBufferCapacity: Int = 16
}

// 버퍼 연산자를 이야기하는것같음..
public enum CircularBufferOperation {
    case Ignore, Overwrite
}

// 1
public struct CircularBuffer<T> {
    fileprivate var data: [T]
    fileprivate var head: Int = 0, tail: Int = 0
    
    private var internalCount: Int = 0
    public var count: Int {
        return internalCount
    }
    
    private var overwriteOperation: CircularBufferOperation = .Overwrite
    
    // 빈 CircularBuffer 구조를 생성
    public init() {
        data = [T]()
        data.reserveCapacity(Constants.defaultBufferCapacity)
    }
    
    // 'count'의 프로퍼티 CircularBuffer를 생성
    // 주의: `count`만큼 2를 거듭제곱하지 않은 경우,
    // 그에 가장 가까운 수만큼 2를 거듭제곱함.
    public init(_ count:Int, overwriteOperation: CircularBufferOperation = .Overwrite){
        var capacity = count
        if (capacity < 1) {
            capacity = Constants.defaultBufferCapacity
        }
        
        // count값보다 큰 2의 제곱을 capacity로 지정
        if ((capacity & (~capacity + 1)) != capacity) {
            var b = 1
            while (b < capacity) {
                b = b << 1
            }
            capacity = b
        }
        
        data = [T]()
        data.reserveCapacity(capacity)
        self.overwriteOperation = overwriteOperation
    }
    
    public init<S: Sequence>(_ elements: S, size: Int) where S.Iterator.Element == T {
        self.init(size)
        //elements.forEach({ push(element: $0)})
    }
    
    // 실제로는 Array의 값을 삭제하는게 아니라, pointer형식으로 head값을 변경해가며 값을 반환
    public mutating func pop() -> T? {
        if isEmpty() {
            return nil
        }
        
        print("head: \(head), tail: \(tail) in pop")
        let el = data[head]
        head = incrementPointer(pointer: head)
        internalCount -= 1
        return el
    }
    
    public func isEmpty() -> Bool {
        return (count < 1)
    }
    
    public func isFull() -> Bool {
        return count == data.capacity
    }
    
    // 증가된 값이 배열의 마지막 요소를 넘을 경우를 대비
    fileprivate func incrementPointer(pointer: Int) -> Int {
        return (pointer + 1) & (data.capacity - 1)
    }
    
    // 감소된 값이 배열의 첫번째 요소에 미치지 못할 경우를 대비
    fileprivate func decrementPointer(pointer: Int) -> Int {
        return (pointer - 1) & (data.capacity - 1)
    }
    
    public func peek() -> T? {
        if isEmpty() {
            return nil
        }
        return data[head]
    }
    
    public mutating func push(element: T) {
        if isFull() {
            switch overwriteOperation {
            case .Ignore: return
            case .Overwrite: pop()
            }
        }
        
        
        if data.endIndex < data.capacity {
            data.append(element)
        }else {
            data[tail] = element
        }
        
        tail = incrementPointer(pointer: tail)
        internalCount += 1
    }
    
    public mutating func clear() {
        head = 0
        tail = 0
        internalCount = 0
        data.removeAll(keepingCapacity: true)
    }
    
    // 버퍼의 용량 반환
    public var capacity: Int {
        get {
            return data.capacity
        }set {
            data.reserveCapacity(newValue)
        }
    }
}

// 2
extension CircularBuffer: CustomStringConvertible, CustomDebugStringConvertible {
    
    public var description: String {
        return data.description
    }
    
    public var debugDescription: String {
        return data.debugDescription
    }
}

// 3
example(str: "Circular buffer") {
    var circBuffer = CircularBuffer<Int>(4)
    circBuffer.push(element: 100)
    circBuffer.push(element: 200)
    circBuffer.push(element: 300)
    circBuffer.push(element: 400)
    print(circBuffer)
    
    let x = circBuffer.pop()
    print(x, circBuffer)
    
    let y = circBuffer.peek()
    print(y, circBuffer)
    
    let z = circBuffer.pop()
    print(z, circBuffer)
    
    circBuffer.push(element: 500)
    print(circBuffer)
    circBuffer.push(element: 600)
    print(circBuffer)
    circBuffer.push(element: 700)
    print(circBuffer)
}
```

순환 버퍼(Circular buffer)는 버퍼의 시작부분을 연결해주는 헤드 인덱스(head index)와 테일 인덱스(tail index)등 두개의 인덱스를 사용하는 고정 크기의 데이터 구조 입니다. 

버퍼가 데이터로 꽉 차면 헤드 인덱스는 0으로 되돌아 갑니다. 순환 버퍼는 지정된 용량까지 데이터를 받아들이고, 기존의 데이터는 새로운 데이터로 대체 됩니다.

순환 버퍼는 특히 FIFO 데이터 구조를 구현할때 유용합니다. 큐 데이터 구조 역시 FIFO 콘셉트를 활용하지만 순환버퍼는 헤드 인덱스와 테일 인덱스가 맞물려 있다는 점이 다릅니다. 

[전체 코드 주소](https://github.com/devmjun/DataStructure)

---

## Reference 

[swift-algorithm-club/Ring Buffer](https://github.com/raywenderlich/swift-algorithm-club/tree/master/Ring%20Buffer)<br>















