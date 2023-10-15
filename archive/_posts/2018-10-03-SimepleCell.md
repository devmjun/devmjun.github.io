---
layout:     post
title:      "Swift. 자주사용하는 Cell에 관련된 코드를 줄여주는 SimpleCell을 소개합니다."
subtitle:   "Simple Library 사용법"
date:       2018-10-04 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Framework]
categories: archive
permalink: /archive/:title
---

SimpleCell의 Github 주소는 [여기](https://github.com/devmjun/SimpleCell) 입니다.

---

## Reference 

[https://github.com/AliSoftware/Reusable](https://github.com/AliSoftware/Reusable)<br>
[https://github.com/giftbott](https://github.com/giftbott)<br>

에서 사용방법을 참조하여 변경했습니다.

---

## Summary 

Reuseable CollectionView, TableView의 Cell에 사용하는 코드를 줄여주는 Swift extension 입니다. 

### before 

 ```swift
tableView.register(UItableViewCell, forCellWithReuseIdentifier: "Cell")
tableView.dequeueReusableCell(withReuseIdentifier: "Cell", for: indexPath) as! UserCell
```

### after 

```swift
tableView.register(cell: TableViewCell.self)
let cell = tableView.dequeue(TableViewCell.self) // cell Type은 TableViewCell.type 입니다 
```

---
