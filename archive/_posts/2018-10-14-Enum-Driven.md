---
layout:     post
title:      "Swift. Enum-Driven TableView Development"
subtitle:   "Enum을 사용하여 TableView 개발을 주도하는 방법을 알아봅니다.."
date:       2018-10-14 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich]
categories: archive
permalink: /archive/:title
---

[Enum-Driven TableView Development](https://www.raywenderlich.com/5542-enum-driven-tableview-development)에서 필요한 부분을 의역했습니다.

---

## Table of contents 

  - [<U>Enum-Driven TableView Development</U>](#section-id-16)
  - [<U>Getting Started</U>](#section-id-36)
  - [<U>Different States</U>](#section-id-48)
  - [<U>Poorly Defined State</U>](#section-id-71)
  - [<U>Invalid State</U>](#section-id-81)
  - [<U>A Better Alternative</U>](#section-id-89)
  - [<U>Refactoring to a State Enum</U>](#section-id-101)
  - [<U>Refactoring the Loading State</U>](#section-id-124)
  - [<U>Refactoring the Error State</U>](#section-id-193)
  - [<U>Refactoring the Empty and Populated States</U>](#section-id-233)
  - [<U>Keeping in Sync with a Property Observer</U>](#section-id-359)
  - [<U>Adding Pagination</U>](#section-id-389)
  - [<U>How an API Supports Pagination</U>](#section-id-405)
  - [<U>Supporting Pagination in Your Table View</U>](#section-id-423)
  - [<U>Adding the New Paging State</U>](#section-id-434)
  - [<U>Setting the State to .paging</U>](#section-id-463)
  - [<U>Loading the Next Page</U>](#section-id-487)
  - [<U>Appending the Recordings</U>](#section-id-542)
  - [<U>Where to Go From Here?</U>](#section-id-567)
  

---

<div id='section-id-16'/>

## Enum-Driven TableView Development

이 튜토리얼에서 Swift의 enum을 사용하여 앱의 여러 상태를 처리하고 table view를 다루는 방법을 배웁니다. 

iOS 개발에서 UITableView보다 기본적인 것이 있나요? 간단하고 깨끗한 컨트롤 입니다. 불행히도 올바른 순간에 loading indicators를 보여주는게 필요하고, 에러 처리, 서비스를 위해 완료 호출을 기다리고 완료 처리가 도착했을때 결과를 보여주는건 많은 복잡성이 기초 합니다. 

이 튜토리얼에서는 Enum-Driven TableView Development를 사용하여 이 복잡성들을 어떻게 관리하는지 배웁니다. 

이 기술을 따르기 위해, 기존의 앱을 리펙토링합니다. 이 과정에 따라서 다음의 것들을 배울수 있습니다.

- `ViewController`의 상태 관리를 위해 `enum`을 어떻게 사용하는지 배웁니다. 
- 유저를 위해 뷰에 상태를 반영하는 중요성
- 잘못정의된 상태(state)의 위험
- 뷰를 최신상태로 유지하기 위해 옵저버 속성을 어떻게 사용하는지(How to use property observers to keep your view up-to-date)
- 끝이없는 검색결과를 실험하기 위한 페이지네이션은 어떻게 작업해야하는지

> 이 튜토리얼은 `UITableView`, `enum`이 익숙하다고 가정합니다. 만약 그렇지 않다면 여기 [iOS](https://www.raywenderlich.com/ios), [Swift tutorials](https://www.raywenderlich.com/ios)를 참조해주세요 

---

<div id='section-id-36'/>

## Getting Started

이 튜토리얼에서 리펙토링할 `Chirper`앱은 [xeno-canto 공개 API](https://www.xeno-canto.org/article/153)에서 검색 가능한 새소리 목록을 보여줍니다. 

앱에서 새의 종(species of bird)을 검색하면 검색어 쿼리와 일치하는 녹화 목록이 표시됩니다. 각 row의 버튼을 탭하여 녹음을 재생할수 있습니다.

[여기](https://koenig-media.raywenderlich.com/uploads/2018/06/Chirper-1.zip)에서 시작 프로젝트를 다운로드 하고 프로젝트를 엽니다. 

<center><img src="/img/posts/driven-enum-0.png" width="450"></center> <br> 


---

<div id='section-id-48'/>

## Different States

잘 설계된 테이블 뷰에는 네가지 상태가 있습니다.

- `Loading`: 앱은 새로운 데이터를 가져오기 위해 바쁩니다.
- `Error`: 서비스를 호출하거나 다른 연산이 실패했습니다. 
- `Empty`: 호출된 서비스가 빈 데이터를 반환합니다. 
- `Populated`: 앱은 찾은 데이터를 화면에 보여줍니다. 

`populated`상태는 대부분 명확 하지만 다른것들도 중요합니다. 유저에게 앱의 상태를 알려주어야 합니다. 즉, 로드 중 상태에서는 indicator를 표시하고, 빈 데이터일때 수행할 작업을 알려주고, 어떤것이 잘못되었을때 익숙한 오류 메시지를 표시해야 합니다. 

시작하려면 `MainViewController.swift`를 열고 코드를 살펴보세요. view controller는 몇가지 상태에 따라서 중요한 매우 중요한 몇가지 작업을 수행합니다.

- `isLoading`이 `true`로 설정되었을때 loading indicator를 보여줍니다. 
- `error`가 `nil`이 아닐때 무언가 잘못됫다고 유저에게 이야기 해줍니다. 
- `recordings`배열이 `nil`, `empty`이면 뷰는 사용자에게 다른것을 검색하라는 메시지를 표시합니다.
- 위의 이전 조건이 없다면 결과 목록들을 화면에 표시합니다.
- `tableView.tableFooterView`는 현재 상태를 위해 올바른 뷰를 설정합니다.

코드를 수정하는 동안 유의해야할 사항들이 많이 있습니다. 그리고 
엎친데 덮친격으로 이패턴은 앱을 통해 추가 기능들을 추가할때 더욱 복잡해집니다.

---

<div id='section-id-71'/>

## Poorly Defined State

`MainViewController.swift`를 검색하면 `state`는 어디에서도 보이지 않습니다.

<center><img src="/img/posts/driven-enum-1.png" width="450"></center> <br> 

state가 있지만 명확하게 정의되지 않았습니다. 이렇게 잘못 정의된 상태는 코드가 수행하는 작업과 해당 속성의 변경 내용에 대한 응답 방법을 이해하기 어렵게 만듭니다. 

---

<div id='section-id-81'/>

## Invalid State

`isLoading`이 `true`이면 앱은 loading state를 보여줘야합니다 `error`가 nil이 아니면 앱은 error state를 보여주어야합니다. 하지만 이 두개의 상태가 만난다면? 무슨일이 일어나나요? 나는 모릅니다.. 앱은 유효하지 않을(invalid state)것 입니다. 

`MainViewController`는 명확하게 그자체 상태를 정의하지 않았고 이것은 유효하지 않거나 규정할수 없는 상태 때문에 어떤 버그를 가질수 있음을 의미합니다. 

---

<div id='section-id-89'/>

## A Better Alternative

`MianViewController`는 자체 상태를 관리할 더 나은 방법이 필요합니다. 다음과같은 기술이 필요합니다. 

- 쉽게 이해해야하고 
- 쉽게 유지가능하고 
- 버그에 대해 신경쓰지 않아야합니다.

다음 단계를 에서, 그 자체 상태를 관리하기 위해 `enum`을 사용하여 `MainViewController`를 리펙토링 할것입니다.

---

<div id='section-id-101'/>

## Refactoring to a State Enum 

`MainViewController.swift`에서 클레스위에 다음 선언을 추가합니다.

```swift
enum State {
  case loading
  case populated([Recording])
  case empty
  case error(Error)
}
```

뷰 컨트롤러의 상태를 명확하게 정의하기 위해 사용할 enum 입니다. 다음으로 `MainViewController`에 state 속성을 추가하여 상태를 설정합니다.

```swift
var state = State.loading
```

여전히 잘 작동하는지 확인하기 위해, 앱을 빌드하고 실행합니다. 행동에 아무런 변화도 주지 않았으니, 모든것이 잘 작동해야합니다.

---

<div id='section-id-124'/>

## Refactoring the Loading State

이 첫번째 변경은 state enum을 사용하고 isLoading 속성을 제거하기 위함입니다. `loadRecordings()`에서 isLoading 속성은 true로 설정되어 잇습니다. `tableView.tableFooterView`는 loading view로 설정되어있습니다. `loadRecordings()`의 시작부분에서 다음 두줄을 지웁니다. 

```swift
isLoading = true
tableView.tableFooterView = loadingView
```

그리고 다음으로 교체합니다.

```swift
state = .loading
```

그런 다음 `fetchRecordings` 완료 블럭내에서 `self.isLoading = false`을 제거합니다. `loadRecordings()`는 다음과 같아야 합니다.

```swift
@objc func loadRecordings() {
  state = .loading
  recordings = []
  tableView.reloadData()
    
  let query = searchController.searchBar.text
  networkingService.fetchRecordings(matching: query, page: 1) { [weak self] response in
      
    guard let `self` = self else {
      return
    }
      
    self.searchController.searchBar.endEditing(true)
    self.update(response: response)
  }
}
```

MainViewController의 `isLoading` 속성을 제거할수 있습니다. 더이상 필요하지 않습니다. 

앱을 빌드하고 실행하세요. 다음 뷰가 있어야 합니다.

<center><img src="/img/posts/driven-enum-2.png" width="450"></center> <br> 


`state` 속성은 설정되어 있지만, 아무것도 하지 않습니다. `tableView.tableFooterView`는 현재의 상태를 반영하는게 필요합니다. `MainViewController`에 `setFooterView()`라는 새로운 메소드를 만듭니다.

```swift
func setFooterView() {
  switch state {
  case .loading:
    tableView.tableFooterView = loadingView
  default:
    break
  }
}
```

이제 `loadRecordings()`로 되돌아가서 `.loading`을 설정한 이후에 다음 코드를 추가합니다.

```swift
setFooterView()
```

앱을 빌드하고 실행합니다.

<center><img src="/img/posts/driven-enum-3.png" width="450"></center> <br> 


이제 state를 loading으로 변경하면 `setFooterView()`가 호출되고, indicator가 화면에 표시되게 처리합니다. 

---

<div id='section-id-193'/>

## Refactoring the Error State

`loadRecordings()`는 `NetworkingService`에서 녹음들(recordings)을 가져옵니다. `netwrokingService.fetchRecordings()`에서 응답을 받고 `update(response:)`를 호출하여 앱의 상태를 업데이트 합니다. 

`update(response:)`내부에서 응답이 에러 라면 `errorLabel`에 `error`의 설명을 설정합니다. `tableFooterView`는 `errorLabel`을 포함한 `errorView`를 설정합니다. `update(response:)`에서 다음 두줄을 찾으세요.

```swift
errorLabel.text = error.localizedDescription
tableView.tableFooterView = errorView
```

다음으로 교체합니다.

```swift
state = .error(error)
setFooterView()
```

`setFooterView()`에서 `error` 상태를 위한 새로운 case를 추가합니다.

```swift
case .error(let error):
  errorLabel.text = error.localizedDescription
  tableView.tableFooterView = errorView
```

이 뷰 컨트롤러는 더이상 자체 `error: Error?`속성이 필요하지 않습니다. 이것을 지울수 있습니다. `update(reseponse:)`내부에서 방금 제거한 오류 속성에 대한 참조를 제거해야 합니다.

```swift
error = response.error
```

위의 라인을 지우고 앱을 빌드하고 실행합니다. 

로딩 상태가 여전히 잘 작동하는것을 볼수 있습니다. 하지만 오류 상태를 어떻게 테스트하나요? 가장 쉬운 방법은 인터넷을 끊는 것입니다. 맥의 시뮬레이터에서 실행중이라면 인터넷을 mac에서 분리하세요. 앱에서 데이터를 로드할때 표시되는 내용입니다. 

<center><img src="/img/posts/driven-enum-4.png" width="450"></center> <br> 


---

<div id='section-id-233'/>

## Refactoring the Empty and Populated States

`update(response:)`의 시작부분에 꾀 긴 `if-else` 체인이 있습니다. 이 것을 깨끗하게 하려면 `update(response:)`를 다음으로 대체합니다.

```swift
func update(response: RecordingsResult) {
  if let error = response.error {
    state = .error(error)
    setFooterView()
    tableView.reloadData()
    return
  }
  
  recordings = response.recordings
  tableView.reloadData()
}
```

방금 `populated`, `empty`상태를 부셨습니다. 걱정하지마세요 우리는 이것들을 곳 고칠것입니다. 

`올바른 상태를 설정합니다(Setting the Correct State)`

`if let error = response.error`블록 아래에 다음코드를 추가합니다.

```swift
guard let newRecordings = response.recordings,
  !newRecordings.isEmpty else {
    state = .empty
    setFooterView()
    tableView.reloadData()
    return
}
```

`state`를 업데이트 할때 `setFooterView()`, `tableView.reloadData()`를 호출하는것을 잊지마세요. 만약 잊었다면, 변경된 상태를 화면에서 볼수 없습니다. 

`update(response:)`내부에 다음 라인을 찾습니다.

```swift
recordings = response.recordings
```

이것을 다음으로 교체합니다.

```swift
state = .populated(newRecordings)
setFooterView()
```

뷰 컨트롤러의 staet 속성에 영향을 주기위해 `update(response:)`를 리펙토링 했습니다. 

`Footer View를 설정합니다(Setting the Footer View)`

그런 다음, 현재의 상태를 위한 올바른 footer view를 설정해야 합니다. `setFooterView()`내부에 switch 문에 다음 두가지 case를 추가합니다.

```swift
case .empty:
  tableView.tableFooterView = emptyView
case .populated:
  tableView.tableFooterView = nil
```

더이상 `default` case는 사용하지 않으므로 지웁니다.

앱을 빌드하고 실행하여 무엇이 발생하는지 확인합니다.

<center><img src="/img/posts/driven-enum-5.png" width="450"></center> <br> 


`상태에서 데이터를 가져옵니다(Getting Data from the State)`

앱은 더이상 데이터를 표시하지 않습니다. 뷰 컨트롤러의 `recordings`속성은 테이블뷰를 채우지만, 설정되지 않았습니다. 테이블뷰는 state 속성에서 데이터를 가져와야합니다. 연산 프로퍼티를 `State` 열거형 내부에 추가합니다.

```swift
var currentRecordings: [Recording] {
  switch self {
  case .populated(let recordings):
    return recordings
  default:
    return []
  }
}
```

이 속성을 테이블뷰에 데이터를 채우기 위해 사용할수 있습니다. `state`가 `.populated`라면, 채워진 recordings을 사용합니다. 그렇지않으면 빈 배열을 반환합니다. 

`tableView(_:numberOFrowsInSection:)`에서 다음 라인을 지우고

```swift
return recordings?.count ?? 0
```

다음 라인으로 대체합니다.

```swift
return state.currentRecordings.count
```

다음으로 `tableView(_:cellforRowAt:)`에서 다음 블록을 지우고

```swift
if let recordings = recordings {
  cell.load(recording: recordings[indexPath.row])
}
```

다음으로 교체합니다.

```swift
cell.load(recording: state.currentRecordings[indexPath.row])
```

더이상 필요하지 않은 옵션은 없습니다.


<center><img src="/img/posts/driven-enum-6.png" width="450"></center> <br> 

`MainViewController`의 `recordings`은 더이상 필요하지 않습니다. `loadRecordings()`의 마지막 참조와함께 지웁니다.

앱을 빌드하고 실행합니다.

모든 상태들은 이제 잘 작동해야 합니다. `state` 속성을 명확하게 정의하여 `isLoading`, `error`, `recordings` 속성들을 지웠습니다. 

<center><img src="/img/posts/driven-enum-7.png" width="650"></center> <br> 

<center><img src="/img/posts/driven-enum-8.png" width="650"></center> <br> 


---

<div id='section-id-359'/>

## Keeping in Sync with a Property Observer

뷰 컨트롤러에서 명확하게 정의되지 않은 state들을 지웠고  state 속성에서 뷰의 행동을 쉽게 알아차릴수 있습니다. 또한 이것은 error, loading 두개의 상태에서 중요합니다 - 이것은 유효하지 않은 상태가 없음을 의미합니다.

하지만 여전히 한개의 문제가 있습니다. state 속성을 업데이트 할때, `setFooterView()`, `tableView.reloadData()`호출하는 것을 `반드시` 기억해야 합니다. 기억 하지 못한다면, 뷰는 상태에 따라서 적절하게 뷰를 반영하지 못합니다. 상태가 바뀔때마다 모든것이 새롭게 고쳐진다면 좋지 않나요?

이것은 `didSet`을 사용하는 `옵저버 프로퍼티(property observer)`를 사용할 좋은 기회입니다. 옵저버 프로퍼티를 사용하여 속성 값의 변경에 응답합니다. 테이블뷰를 reload 하고 footer 뷰를 매시간 `staet` 속성으로 설정하길 원한다면, `didSet` 옵저버 프로퍼티를 추가해야합니다.


`var state = State.loading`을 다음과같이 교체합니다.

```swift
var state = State.loading {
  didSet {
    setFooterView()
    tableView.reloadData()
  }
}
```

state값이 변경 될때, `didSet` 옵저버 속성이 실행 됩니다. `setFooterView()`, `tableView.reloadData()`를 호출하여 뷰를 업데이트 합니다. 

`setFooterView()`, `tableView.reloadData()`에 대한 모든 호출을 제거합니다 - 거기에는 4가지가 있고 `loadRecordings()`, `update(response:)`에서 찾을수 있습니다. 이들은 더이상 필요하지 않습니다.

앱을 빌드하고 실행하여 모든 기능이 작동하는지 확인합니다.

<center><img src="/img/posts/driven-enum-9.png" width="450"></center> <br> 

---

<div id='section-id-389'/>

## Adding Pagination

검색하기 위해 앱을 사용할때, API는 많은 결과를 주지만, 모든 결과를 한번에 반환하지는 않습니다.

예를들어 일반적인 새의 종을 위해서 `Chirper`를 검색하면, 앵무새처럼 많은 결과를 기대할수 있습니다. 

![](/img/posts/driven-enum-10.gif)
 
이것은 올바르지 않습니다, 검색결과가 50개의 앵무새 녹음파일밖에 없나요?

xeno-canto API는 한번에 보내는 결과를 500개로 제한합니다. 지금 사용하는 프로젝트는 `NetworkingService.swift`에서 50개로 잘라내고 예제에서 사용하기 쉽도록 만듭니다.

500개의 결과를 한번에 받는다면, 나머지 결과들은 어떻게 얻나요? 새소리를 찬기위해 사용하는 이 API는 `pagination`을 통해서 이것을 수행합니다.

---

<div id='section-id-405'/>

## How an API Supports Pagination

`NetworkingService`내에 xeno-canto API 에 쿼리(query)할때, URL은 다음과 같습니다.

```zsh
http://www.xeno-canto.org/api/2/recordings?query=parrot
```

이 호출의 결과는 처음 500개 항목으로 제한됩니다. 이것은 `첫 페이지(first page)`라고 하고, 1-500개의 아이템을 포함합니다. 다음 500개의 결과를 `두번째 페이지` 라고 하고 쿼리 매개변수로서 사용할 page를 명시합니다. 

```zsh
http://www.xeno-canto.org/api/2/recordings?query=parrot&page=2
```

끝에 `&page=2`를 알아 차렸을것 입니다; 이 코드는 API에게 501-1000개의 아이템을 포함하고 있는 두번째 페이지를 원한다고 이야기 합니다. 

---

<div id='section-id-423'/>

## Supporting Pagination in Your Table View

`MainViewController.loadRecordings()`를 보면, `networkingService.fetchrecordings()`가 호출될때, `page` 파라미터는 1로 하드코딩 되어있습니다. 이렇게하면 다음작업을 수행할수 있습니다.

1. `paging`이라고 불리는 새로운 state를 추가합니다. 
2. `networkingService.fetchRecordings`의 응답이 추가 페이지를 나타낸다면, state 를 `.paging`으로 설정합니다. 
3. 테이블에 마지막 cell을 화면에 보여주려고 하기 직전에, state 가 `.paging`이라면 결과의 마지막 페이지를 로드합니다.
4. 서비스 호출의 새 recordings을 recordings 배열에 추가합니다.

---

<div id='section-id-434'/>

## Adding the New Paging State


`state enum`으로 새로운 `paging`case를 추가하는것으로 작합니다.

```swift
case paging([Recording], next: Int)
```

`.populated` state와 같이 화면에 표시하기 위해 녹음 배열(array of recordings)을 추적해야 합니다. 또한 API가 가져와야하는 다음 page를 추적 해야합니다. 

프로젝트를 빌드하고 실행하면 더이상 컴파일 되지 않습니다. `setFooterView`에 스위치 조건문의 상태가 모든 case들을 포함하지 않기 때문입니다. switch 문에 다음을 추가합니다.

```swift
case .paging:
  tableView.tableFooterView = loadingView
```

앱이 `paging state` 라면, `loading indicator`를 `tableView`의 끝에 보여줍니다. 

state의 `currentRecordings` 연산 프로퍼티는 완전하지(exhaustive)하지 않습니다. 원하는 결과를 보려면 업데이트해야합니다. `currentRecordings` 내부 switch 조건문에 새로운 case를 추가합니다. 

```swift
case .paging(let recordings, _):
  return recordings
```

---

<div id='section-id-463'/>

## Setting the State to .paging

`update(response:)`에서 `state = .populated(newRecordings)`를 다음과같이 교체합니다.

```swift
if response.hasMorePages {
  state = .paging(newRecordings, next: response.nextPage)
} else {
  state = .populated(newRecordings)
}
```

`response.hasMorePages`는 API가 현재 쿼리에 대해 갖는 총 페이지 수가 현재 페이지보다 작은지 여부를 알려줍니다. 가져올 페이지가 더 있다면 `.paging`상태를 설정합니다. 현재 페이지가 마지막 페이지 또는 유일한 페이지인 경우 상태를 `.populated`로 설정합니다. 

앱을 빌드하고 시작합니다.

<center><img src="/img/posts/driven-enum-11.png" width="450"></center> <br> 

여러개의 페이지를 찾았다면, 앱은 하단에 loading indcator를 화면에 표시합니다. 하지만 검색 단어가 하나의 페이지만 찾았다면, loading indicator 없이 `.populated`가 표시됩니다.

로드하기 위한 페이지가 더 있을때 볼수 있습니다. 하지만 앱은 로드할 페이지가 없습니다. 이제 이것을 고칠것입니다.

---

<div id='section-id-487'/>

## Loading the Next Page

유저가 목록의 끝에 도달하기 직전에, 다음페이지를 로딩하기를 원합니다. 먼저, `loadPage`라는 이름의 새로운 메소드를 생성합니다. 

```swift
func loadPage(_ page: Int) {
}
```

`NetworkingService`에서 특정 결과 페이지를 로드하길 원할때 호출하는 메소드 입니다. 

`loadRecordings()`가 기본적으로 첫 페이지를 로드하는 방법을 기억하시나요? `.loading`설정한 첫번째 줄을 제외한 모든 코드가 `loadRecordings()`에서 `loadPage(_:)`로 모든 코드가 이동합니다.

그런 다음 page 매개변수를 사용하여  `fetchRecordings(matching:query, page:1)`를 다음과같이 업데이트 합니다. 

```swift
networkingService.fetchRecordings(matching: query, page: page)
```

`loadRecordings()`는 조금 비어 보입니다. `loadRecordings()`에서 `loadPage(_:)`를 호출하여 업데이트 하고 페이지가 로드되기 위해 1을 명시합니다.

```swift
@objc func loadRecordings() {
  state = .loading
  loadPage(1)
}
```

앱을 빌드하고 실행합니다.

<center><img src="/img/posts/driven-enum-12.png" width="450"></center> <br> 

아무것도 변경된게 없다면, 잘 하고 있습니다. 

`tableView(_: cellForRowAt:)`에 `return`이전 상태에 다음 코드를 추가합니다.

```swift
if case .paging(_, let nextPage) = state,
  indexPath.row == state.currentRecordings.count - 1 {
  loadPage(nextPage)
}
```

현재 state가 `.paging`이고 현재 currentRecordings 배열에 마지막 값이 row에 표시 되면 다음 페이지를 가져와야합니다.

앱을 빌드하고 실행합니다.

![](/img/posts/driven-enum-13.gif)

loading indicator가 뷰에 나타나면, 앱은 다음 페이지의 데이터를 가져옵니다. 하지만 현재 recordings에 데이터를 추가하지는 않습니다. 단지 현재 recordings를 새로운것으로 교체합니다. 

---

<div id='section-id-542'/>

## Appending the Recordings

`update(response:)`에서, `newRecordings` 배열은 뷰의 새로운 상태를 위해 사용 되어집니다. `if response.hasMorePages` 상태 이전에, 다음 코드를 추가합니다. 

```swift
var allRecordings = state.currentRecordings
allRecordings.append(contentsOf: newRecordings)
```

현재 recordings을 얻고 그후 배열로 새로운 recordings을 추가합니다. 이제 `if response.hasMorePages` 조건문에 `newRecordings` 대신 `allRecordings`를 사용하여 업데이트 합니다. 

```swift
if response.hasMorePages {
  state = .paging(allRecordings, next: response.nextPage)
} else {
  state = .populated(allRecordings)
}
```

state enum의 도움으로 얼마나 쉬었나요? 차이를 확인하려면 앱을 빌드하고 실행하세요.

![](/img/posts/driven-enum-14.gif)

---

<div id='section-id-567'/>

## Where to Go From Here?

이 튜토리얼에서 복잡성을 처리하기 위해 앱을 리펙토링 했습니다. 오류가 발생하기 쉽고 잘못 정의된 state를 깨끗하고 간단한 Swift enum으로 대체 했습니다. 복잡한 새로운 기능인 pagenation을 추가하여 enum으로 주도하는 테이블뷰를 테스트 했습니다.

코드를 리펙토링 했습니다. 어딘가 잘못된곳이 없는지 추가적으로 확인하려면 `Unit tests`가 좋습니다. [iOS Unit Testing and UI Testing](https://www.raywenderlich.com/709-ios-unit-testing-and-ui-testing-tutorial)에서 더 배울수 있습니다. 

앱에서 pagination API로 어떻게 작업하는지 배웠으니, 실제 API를 어떻게 만드는지 배울 차례입니다. [Server Side Swift with Vapor](https://www.raywenderlich.com/4493-server-side-swift-with-vapor) 비디오 코드로 시작할수 있습니다. 




