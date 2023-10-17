---
layout:     post
title:      "Swift, Data Structure, Priority Queue"
subtitle:   "우선 순위 큐를 알아보자!"
date:       2018-06-29 17:45:00
author:     "MinJun"
comments: true 
tags: [DataStructure, Algorithm, Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/RxSwift-bg.jpg
thumbnail-img: /assets/post_img/background/RxSwift-bg.jpg
share-img: /assets/post_img/background/RxSwift-bg.jpg
---

## Contetns 

- Priority Queue
- Applications
- Common operations 
- Implementation
- Testing 
- Reference

---

## Priority Queue 

Queue는 단순한 first-infirst-out을 사용하여 요소의 순서를 유지하는 단순한 목록입니다. priority queue는 우선 순위에 따라서 요소를 큐에서 dequeue하는 Queue의 다른 버전입니다. 우선 순위큐는 다음 중 하나일 수있습니다

1. `Max-priority`: 항상 가장 큰 요소가 맨 앞에 있습니다
2. `Min-priority`: 항상 가장 작은 요소가 맨 앞에 있습니다 

우선순위 큐는 주어진 목록에서 최소값 혹은 최대값을 식별할때 유용합니다

---

## Application 

우선순위 큐의 유용한 애플리케이션은 다음과 같습니다

- `Dijkstra`의 알고리즘. 우선 순위 큐를 사용하여 최소 비용을 계산합니다.
- `A*parthfinding algorithm`우선 순위 대기열을 사용하여 가장 짧은 길이의 경로를 생성하는 미개척 경로를 추적하는 경로 찾기 알고리즘.
- `Heap sort`우선 순위 큐를 사용하여 구현할 수있는 힙 정렬.
- `Huffman coding`압축 트리를 만듭니다. 최소 우선 순위 큐는 부모 노드가 아직없는 가장 빈도가 낮은 두 개의 노드를 반복적으로 찾는 데 사용됩니다.

---

## Common operations 

```swift
public protocol Queue {
  associatedtype Element
  mutating func enqueue(_ element: Element) -> Bool
  mutating func dequeue() -> Element?
  var isEmpty: Bool { get }
  var peek: Element? { get }
}
```

우선 순위 큐는 일반 큐와 동일한 작업을하므로 구현 만 다릅니다.
우선 순위 대기열은 대기열 프로토콜을 따르고 공통 작업을 구현합니다.

- enqueue : 요소를 큐에 삽입합니다. 조작이 성공하면 (자) true를 돌려줍니다.
- dequeue : 우선 순위가 가장 높은 요소를 제거하고 반환합니다. 큐가 비어 있으면 nil을 리턴합니다.
- isEmpty : 대기열이 비어 있는지 확인합니다.
- peek: 요소를 제거하지 않고 우선 순위가 가장 높은 요소를 반환합니다. 큐가 비어 있으면 nil을 리턴합니다.

우선 순위 큐를 구현하는 여러 가지 방법을 살펴 보겠습니다.

---

## Implementation 

우선순위큐는 다음의 방법에 따라서 만들 수 있습니다 

1. Sorted array: O(1)의 시간에 요소의 최대값 또는 최소값을 얻는데 유용합니다. 하지만 요소의 삽입은 느리며 순서대로 삽입해야하므로 O(n)의 시간이 필요합니다
2. Balanced binary search tree: O(log n) 시간에 최소값과 최대 값을 모두 가져오는 양방향 우선 순위 큐를 만드는데 유용합니다. 삽입은 O(log n)에서도 정렬된 배열보다 좋습니다
3. Heap: 우선 순위큐에 대한 자연스러운 선택입니다. 힙은 정렬된 배열보다 효율적입니다. 힙은 부분적으로만 정렬하면 되기 때문입니다. 모든 힙 작업은 O(log n)이며, 최소값 우선 순위 힙에서 값 추출은 O(1) 이고. 마찬가지로 최대 우선 힙에서 최대 값을 추출하는 것도 O(1) 입니다.

Heap을 사용하여 우선순위 큐를 만들어 보는 방법을 살펴봅니다. 

1. Heap.swift: 우선 순위 큐를 구현하는데 사용할 힙데이터 구조를 사용합니다. Heap Post에서 사용했던 Heap을 사용합니다
2. Queue.swift: Queue를 정의하는 프로토콜을 포함합니다

```swift
struct PriorityQueue<Element: Equatable>: Queue { // 1
  private var heap: Heap<Element> // 2
  init(sort: @escaping (Element, Element) -> Bool,
       elements: [Element] = []) { // 3
    heap = Heap(sort: sort, elements: elements)
  }
  // more to come ...
}
```


1. PriorityQueue는 Queue Protocol을 따릅니다. 제네릭 매개변수 Element 요소르 비교할 수 있어야 합므로 Equatable을 준수합니다
2. 이 힙을 사용하여 우선순위큐를 구현합니다
3. 이 이니셜라이저에 적절한 함수를 전달하여 PriorityQueue를 사용하여 최소 및 최대 우선순위 큐를 만들수 있습니다.

`Queue`프로토콜을 따르고 아래의 코드를 추가합니다

```swift
var isEmpty: Bool {
  return heap.isEmpty
}
var peek: Element? {
  return heap.peek()
}
mutating func enqueue(_ element: Element) -> Bool { // 1
  heap.insert(element)
return true
}
mutating func dequeue() -> Element? { // 2
  return heap.remove()
}
```

힙은 우선순위 큐를 위한 완벽한 후보입니다. 우선 순위 큐의 작업을 구현하기 위해 다양한 힙 메소드를 호출 하기만 하면 됩니다

1. `enqueue(_:)`를 호출하면 힙에 간단하게 삽입되고 힙이 sift up을 통해서 자체 유효성 검사를 시행합니다. enqueu(_:)의 시간 복잡도은 O(log n) 입니다.
2. `dequeue(_:)`를 호출하여 힙의 마지막 요소로 대체하여 힙에서 루트 요소를 제거한다음 sift down을 통해 유효성을 검사합니다. dequeue(_:)의 시간 복잡도는 O(log n) 입니다.

---

## Testing 

```swift
var priorityQueue = PriorityQueue(sort: >, elements: [1,12,3,4,1,6,8,7])
while !priorityQueue.isEmpty {
  print(priorityQueue.dequeue()!)
}
```

[전체 코드 주소](https://github.com/devmjun/DataStructure)

---


## Reference 

[swift-algorithm-club/Priority Queue](https://github.com/raywenderlich/swift-algorithm-club/tree/master/Priority%20Queue)<br>
[Data Structures and Algorithms in Swift](https://store.raywenderlich.com/products/data-structures-and-algorithms-in-swift)<br>
