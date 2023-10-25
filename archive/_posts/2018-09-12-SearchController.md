---
layout:     post
title:      "Swift, UISearchController 사용법을 알아봅니다"
subtitle:   "UISearchController Tutorial"
date:       2018-09-12 15:45:00
author:     "MinJun Ju"
comments: true 
tags: [Swift, Raywenderlich]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/field-4452538.jpg
thumbnail-img: /assets/post_img/background/field-4452538.jpg
share-img: /assets/post_img/background/field-4452538.jpg
toc: true
---

## Refernece 

[UISearchController Tutorial: Getting Started](https://www.raywenderlich.com/472-uisearchcontroller-tutorial-getting-started)을 의역했습니다.

---

## Contentns 

- Getting Started
- Populating the Table View 
- Introducing UISearchController
- UISearchResultsUpdating and Filtering
- Updating the Table View 
- Sending Data to a Detail View
- Creating a Scope Bar to Filter Results
- Adding a Results Indicator
- Where To Go From Here? 

---

이 UISearchController 튜토리얼 에서 동적 필터링, scope bar와 함께 검색 기능을 추가하여 앱을 어떻게 개선 시키는지에 대해서 배웁니다. 

> Note: 이 튜토리얼은 Xcode9, Swift 4, iOS 11로 업데이트 되었습니다. 

많은 아이템 목록들을 스크롤하면 사용자는 만족스럽지 못한 사용자 경험을 경험할수 있습니다. 대규모 데이터들을 다룰때는 사용자가 특정 항목들을 검색 가능하게 하는게 중요합니다. UIKit에는 `UINavigationItem`과 완벽하게 통합되는 `UISearchBar`가 포함되어 있고 정보를 빠르게 필터링이 가능합니다.

이 `UISearchController` 튜토리얼 에서 검색이 가능한 기본 테이블뷰를 기반으로하는 Candy app을 만들어봅니다. `UISearchController`의 이점을 활용하면서 테이블뷰 검색 기능과 동적 필터링을 추가하고 선택할수 있는 scope bar를 추가합니다. 결국, 앱을 훨씬 더 사용자 친화적으로 만들고 요구를 충족시키는 방법을 알게 됩니다.

---

## Getting Started 

[여기](https://koenig-media.raywenderlich.com/uploads/2017/10/CandySearch_4_Starter.zip)에서 시작 프로젝트를 다운로드 하고 실행합니다. 앱이 이미 네비게이션 컨트롤러로 설정 되어 있습니다. Xcode 프로젝트를 선택하고 서명 색션에서 자신의 팀으로 업데이트 합니다. 앱을 빌드하고 실행하면 빈 목록이 표시됩니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/10/UISearchController-Starter.png" width="300"></center> <br>


Xcode로 돌아가면, `Candy.swift`에 화면에 표시해야하는 각 캔디 조각에 대한 정보를 저장하는 구조체를 포함하고 있습니다. 이 구조체는 두개의 속성을 가지고 있습니다: `category`, `candy`의 이름.

유저가 캔디에 대해 검색할때, 사용자의 쿼리 문자열을 사용하여 name 속성을 검색하게됩니다. Scope Bar를 구현할때, 범주 문자열(category string)이 UISearchController 튜토리얼의 끝에서 어떤 중요한 역할을 하는지 보게 될것 입니다. 

---

## Populating the Table View 

`MasterViewController.swift`를 엽니다. `candies` 속성은 사용자가 검색할 수 있는 모두 각각 다른 `Candy` 객체를 관리하는 곳입니다. 

UISearchController 튜토리얼에서, search bar의 작동방식을 보여주기 위한 제한된 수의 값만 만들어야합니다. 프로덕션 앱에서 수천개의 검색 가능한 개체가 있을수 있습니다. 그러나 앱에 수천개의 개체를 검색 할지 또는 몇 개만 검색할지 여부에 상관없이 사용되는 방법은 동일하게 유지됩니다. 

candies 배열을 채우려면, `viewDidLoad()`에 다음 코드를 추가해야합니다. `super.viewDidLoad()` 이후에 다음 코드를 추가합니다.

```swift
candies = [
  Candy(category:"Chocolate", name:"Chocolate Bar"),
  Candy(category:"Chocolate", name:"Chocolate Chip"),
  Candy(category:"Chocolate", name:"Dark Chocolate"),
  Candy(category:"Hard", name:"Lollipop"),
  Candy(category:"Hard", name:"Candy Cane"),
  Candy(category:"Hard", name:"Jaw Breaker"),
  Candy(category:"Other", name:"Caramel"),
  Candy(category:"Other", name:"Sour Chew"),
  Candy(category:"Other", name:"Gummi Bear"),
  Candy(category:"Other", name:"Candy Floss"),
  Candy(category:"Chocolate", name:"Chocolate Coin"),
  Candy(category:"Chocolate", name:"Chocolate Egg"),
  Candy(category:"Other", name:"Jelly Beans"),
  Candy(category:"Other", name:"Liquorice"),
  Candy(category:"Hard", name:"Toffee Apple")
]
```

프로젝트를 빌드하고 실행합니다. 테이블뷰의 Delegate, Datasource는 이미 구현되어 있고, 다음과 같은 화면을 볼수 있습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/10/UISearchController-Data.png" width="300"></center> <br>


테이블뷰의 row를 선택하면 캔디와 부합하는 세부 사항을 볼수 있습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/10/UISearchController-DarkChocolate-1.png" width="300"></center> <br>

candy가 너무 많습니다. 원하는걸 찾기위한 조금의 시간이 필요하기 떄문에. `UISearchBar`가 필요합니다.

---

## Introducing UISearchController

`UISearchController` 문서를 봤다면, 그것은 꾀 게으르다는 것을 알수 있습니다. 어떤 검색 작업도 수행하지 않습니다. 이 클레스는 그저 사용자가 iOS앱에서 기대할수 있는 표준 인터페이스만 제공하면 됩니다.

`UISearchController`는 delegate와 통신하여 앱의 나머지 부분에게 사용자가 무엇을 하는지 알립니다. 문자열의 일치를 위해 실제 기능을 모두 작성해야합니다. 

처음에는 무서운 것처럼 보일지 모르지만 자용사화된 검색 기능을 사용하면 결과가 앱에서 구체적으로 반환되는 방식을 세밀하게 제어 할수 있습니다. 똑똑하고 빠른 검색을 즐기게 됩니다.

예전에 table view iOS를 검색해보았다면, `UISearchDisplayController`를 잘 알고 있을것입니다. iOS 8 이후, 이 클래스는 전체 검색 프로세스를 단순화 하는 `UISearchController`의 사용으로 더 이상 사용되지 않습니다. 

안타깝게도 Interface Builder는 이 글을 쓰는 시점에 UISearchController를 지원하지 않으므로 프로그래밍 방식으로 UI를 만들어야합니다. 

`MasterViewController.swift`에서 candies 배열 선언 아래에 새 속성을 추가합니다.

```swift
let searchController = UISearchController(searchResultsController: nil)
```

`searchResultsController`를 nil값으로 UISearchController를 초기화하면, `search controller`에게 검색중인 동일한 뷰를 사용하여 결과를 표시하도록 지시합니다. 다른 뷰 컨트롤러를 여기에 지정하면 결과를 표시하기 위해 대신 사용되어 집니다.

MasterViewController가 검색창(search bar)에 응답하도록 하려면, `UISearchResultsUpdating`을 구현해야합니다. 이 프로토콜은 사용자가 검색창에 입력한 정보를 기반으로 검색 결과를 업데이트하는 방법을 정의 합니다. 

`MasterViewController.swift`에서, `class extension`을 추가하여 MasterViewController 클레스 외부에 다음을 추가합니다.

```swift
extension MasterViewController: UISearchResultsUpdating {
  // MARK: - UISearchResultsUpdating Delegate
  func updateSearchResults(for searchController: UISearchController) {
    // TODO
  }
}
```

`updateSearchResults(for)`는 `UISearchResultsUpdating`
프로토콜을 따르는 유일하게 구현해야하는 단 하나의 매소드입니다. 곧 세부사항을 작성 할것입니다.

다음으로 searchController에 대한 몇가지 매개 변수를 설정해야 합니다. `MasterViewController.swift`의 `viewDidLoad()`에서 `super.viewDidLoad()` 이후에 다음을 추가합니다.

```swift
// Setup the Search Controller
searchController.searchResultsUpdater = self
searchController.obscuresBackgroundDuringPresentation = false
searchController.searchBar.placeholder = "Search Candies"
navigationItem.searchController = searchController
definesPresentationContext = true
```

위에 추가한것들에 대한 묘사 설명입니다.

1. `searchResultupdater`는 `UISearchResultsUpdating` 프로토콜을 따르는 `UISearchController`기반의 새로운 속성 입니다. 이 프로토콜은 `UISearchBar` 내의 텍스트가 변경되는것을 알립니다. 
2. 기본적으로, `UISearchController`는 표시된 뷰를 흐리게(obscure) 만듭니다. 이것은 `searchResultsController`를 위해 다른 뷰 컨트롤러를 사용한다면 유용합니다. 여기에서는 결과를 표시하는것을 현재뷰로 설정했기 때문에 흐려지는걸 원하지 않습니다.
3. placeholder를 이 앱의 특정 항목으로 설정합니다. 
4. iOS11의 새로운 기능에서, `NavigationItem`으로 `searchBar`를 추가합니다. 이것은 Interface Builder가 UIsearchController와 아직 호환되지 않기 때문에 필요합니다. 
5. 마지막으로 뷰 컨트롤러의 `definesPresentationContext`를 `true`로 설정하여 `UISearchController`가 활성화되어있는 동안 사용자가 다른 뷰 컨트롤러로 이동하면 search bar가 화면에 남아 있지 않도록 합니다.

---

## UISearchResultsUpdating and Filtering


search controller 설정 후에, 작동시키려면 약간의 코딩을 해야합니다. 먼저 `MasterViewController`의 상단 근처에 다음 속성을 추가합니다.

```swift
var filteredCandies = [Candy]()
```

이 속성은 사용자가 검색하는 사탕들을 가지고 있습니다.

그런 다음, `MansterViewController` 클레스에 다음 도우미 메소드를 추가합니다.

```swift
// MARK: - Private instance methods
  
func searchBarIsEmpty() -> Bool {
  // Returns true if the text is empty or nil
  return searchController.searchBar.text?.isEmpty ?? true
}
  
func filterContentForSearchText(_ searchText: String, scope: String = "All") {
  filteredCandies = candies.filter({( candy : Candy) -> Bool in
    return candy.name.lowercased().contains(searchText.lowercased())
  })

  tableView.reloadData()
}
```

`searchBarIsEmpty()`는 이유가 명확합니다. `filterContentForSearchText(_:scope:)`는 `searchText`를 기반으로 `candies` 배열을 필터하고 filteredCandies 배열에 방금 추가한 결과를 놓습니다. 지금은 scope 매개변수에 대해 생각하지 마세요. 이것은 뒷부분에서 사용합니다. 

`filter()`은 `(candy: Candy) -> Bool` 클로저를 가지고 있습니다. 그 다음 배열의 모든 요소를 반복하여 searchText를 전달하여 클로저를 호출합니다. 

candy가 사용자에게 표시되는 검색 결과의 일부인지 여부를 결정할때 이 값을 사용할수 있습니다. 이렇게 하려면 현재 캔디가 필터링된 배열에 포함될 경우 `true`를 반환하고, 그렇지 않으면 `false`를 반환해야 합니다.

이를 확인하기 위해 `contains(_:)`를 사용하여 사탕의 이름에 searchText가 있는지 확인합니다. 하지만 비교하기 전에 `lowercased()`메소드를 사용하여 두 문자열을 모두 소문자로 변환합니다.

> Note: 대부분의 경우, 사용자는 검색을 수행할때 문자의 대소 문자를 신경쓰지 않으므로 입력한 소문자 버전과 각 캔디 이름의 소문자 버전을 비교하면 대소 문자를 구분하지 않는 일치 항목을 쉽게 반환할수 있습니다. 이제 `Chocolate`또는 `chocolate`을 입력하고 일치하는 캔디를 반환합니다.

`UISearchResultsUpdating`을 기억하고 있습니까? `updateSearchResults(for)`에서 해야할일이 남았습니다. 이제는 검색 결과를 업데이트 할때 호출해야하는 메소드를 작성했습니다. 

`updateSearchResults(for:)`의 TODO를 `filterContentForSearchText(_:scope:):` 호출로 교체합니다.

```swift
filterContentForSearchText(searchController.searchBar.text!)
```

이제, search bar에서 텍스트를 추가하거나 삭제할때마다, `UISearchController`는 `updateSearchResults(for:)`에 대한 호출을 통해 `MasterViewController` 클레스에게 변경 내용을 알리고, `filterContentForSearchText(_:scope:)`를 호출합니다. 이제 앱을 빌드하고 실행하고, 아래로 스크롤하면 테이블 뷰 위에 `search bar`가 있음을 알수 있습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/10/UISearchController-SearchBar.png" width="300"></center> <br>


그러나, 일부 검색 텍스트를 입력해도 필터링된 결과는 표시되지 않습니다. 이것은 이것의 이유는 단순합니다. 테이블 뷰가 필터링된 결과를 사용해야 하는 시점을 알 수 있도록 코드를 아직 작성하지 않았기 때문입니다.

---

## Updating the Table View 

`MasterViewController.swift`로 돌아가서 현재 필터링된 결과를 사용하는지 아닌지 결정하기 위한 매소드를 추가합니다. 

```swift
func isFiltering() -> Bool {
  return searchController.isActive && !searchBarIsEmpty()
}
```

다음 다음 코드를 `tableView(_:numberOfRowsInSection:)`과 교체합니다.

```swift
func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
  if isFiltering() {
    return filteredCandies.count
  }
    
  return candies.count
}
```

별다른 변화가 없습니다. 사용자가 검색 중인지 여부만 확인하고 필터링된 캔디 또는 일반 캔디를 테이블뷰의 데이터소스로 사용하면됩니다.

다음 코드를 `tableVIew(_:cellForRowAt:)`과 교체합니다.

```swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
  let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
  let candy: Candy
  if isFiltering() {
    candy = filteredCandies[indexPath.row]
  } else {
    candy = candies[indexPath.row]
  }
  cell.textLabel!.text = candy.name
  cell.detailTextLabel!.text = candy.category
  return cell
}
```

두 메소드 모두 `isFiltering()`를 사용합니다. 이 메소드는 searchController의 `active` 속성을 참조하여 표시할 배열을 결정합니다. 

Search Bar의 search field를 클릭할때, active 는 자동으로 true로 설정됩니다. search controller가 active이고 user가 search filed에 실제로 타이핑을 하면, filteredCandies 배열에서 반환된 데이터를 가져옵니다. 

search controller는 자동으로 result 테이블을 숨기고 표시 처리하므로, 사용자가 검색한 내용에 따라 올바른 데이터(필터링된 데이터 인지, 필터링되지 않은 데이터인지)를 제공해야합니다. 

앱을 빌드하고 실행합니다. 메인 테이블의 행을 필터링하는 작동 검색 막대가 있습니다. 

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/10/UISearchController-Filtering-1.png" width="300"></center> <br>

앱과 함께 다양한 사탕을 검색하는 방법을 확인하세요. 

---

## Sending Data to a Detail View

detail view controller로 정보를 보낼 때 뷰 컨트롤러가 사용자가 작업하고있는 컨텍스트 (전체 테이블 목록 또는 검색 결과)를 알고 있는지 확인해야합니다. 

detailViewController에 정보를 보낼때 컨트롤러가 사용자가 작업학 있는 컨텍스트(전체 테이블 목록 또는 검색 결과)를 알고 있는지 확인해야합니다. 

여전히 MasterViewController.swift에서 prepare (for : sender :)에 다음 코드를 찾습니다.

`MasterViewController.swift`의 `prepare(for:sender:)`에서 다음 코드를 찾습니다. 

```swift
let candy = candies[indexPath.row]
```

그리고 다음과같이 변경합니다.

```swift
let candy: Candy
if isFiltering() {
  candy = filteredCandies[indexPath.row]
} else {
  candy = candies[indexPath.row]
}
```

여기서도 이전과 같은 `isFiltering()`검사를 수행했지만, 이제는 detail view conroller로 segue를 수행할때 적절한 캔디 객체를 제공해야 합니다.

이 시점에서 코드를 빌드하고 실행하고, 앱이 main table 또는 search table 각각에서 올바른 detail view로 탐색하는걸 확인할수 있습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/10/UISearchController-DetailView.png" width="300"></center> <br>

---

## Creating a Scope Bar to Filter Results

사용자에게 검색결과를 필터링 할수 있는 다른 방법을 제공하려는 경우, category로 필터된 아이템 명령에서 search bar와 연결하여 `Scope Bar`를 추가할수 있습니다. 캔디 배열을 만들때 Candy 객체에 할당한 카테고리는 `Chocolate, Hard, Other` 입니다. 

먼저, MasterViewController에 scope bar를 생성해야합니다. scope bar는 특정 범위에서만 검색하여 검색 범위를 좁히는 `segmented controler` 입니다. scope는 실제로 정의한 범위 입니다. 이 경우 에서는 candy의 범주(candy's category) 이지만, scopes는 types, ranges 또는 완전히 다른 어떤것일수 있습니다.

scope bar를 사용하는것은 추가적인 delegate method를 구현하는 것만큼이나 쉽습니다.

`MasterViewController.swift`에서, `UISearchBarDelegate`를 따르는 확장을 추가하는게 필요합니다. UISearchResultsUpdating extension 이후 에 추가합니다.

```swift
extension MasterViewController: UISearchBarDelegate {
  // MARK: - UISearchBar Delegate
  func searchBar(_ searchBar: UISearchBar, selectedScopeButtonIndexDidChange selectedScope: Int) {
    filterContentForSearchText(searchBar.text!, scope: searchBar.scopeButtonTitles![selectedScope])
  }
}
```

이 delegate method는 scope bar에서 다른 scope로 전환할때 호출되어 집니다. 이 일이 발생했을때, 다시 필터링 하고 `filterContentForSearchText(_:scope:)`를 새로운 scope로 호출해야합니다. 

이제 제공된 범위(scope)를 고려하여 `filterContentForSearchText(_:scope:)`를 수정합니다.

```swift
func filterContentForSearchText(_ searchText: String, scope: String = "All") {
  filteredCandies = candies.filter({( candy : Candy) -> Bool in
    let doesCategoryMatch = (scope == "All") || (candy.category == scope)
      
    if searchBarIsEmpty() {
      return doesCategoryMatch
    } else {
      return doesCategoryMatch && candy.name.lowercased().contains(searchText.lowercased())
    }
  })
  tableView.reloadData()
}
```

이제 캔디의 캔디의 범주(category of the candy)가 scope bar를 통해 전달된 범주와 일치하는지(또는 범위가 `All`로 설정되었는지) 확인합니다. 그후, search bar에 text가 있는지 확인하고, 캔디를 적절하게 필터링 합니다. 또한 scope bar가 선택되었을때 `isFiltering()`가 true를 반환하도록 업데이트 해야합니다.

```swift
func isFiltering() -> Bool {
  let searchBarScopeIsFiltering = searchController.searchBar.selectedScopeButtonIndex != 0
  return searchController.isActive && (!searchBarIsEmpty() || searchBarScopeIsFiltering)
}
```

거의 다 왔지만, scope filtering 매커니즘은 아직 작동하지 않습니다. 현재 선택된 scope로 보내기 위해 내가 생성했던 첫번째 클레스 확장에서`updateSearchResults(for:)`을 수정해야합니다.

```swift
func updateSearchResults(for searchController: UISearchController) {
  let searchBar = searchController.searchBar
  let scope = searchBar.scopeButtonTitles![searchBar.selectedScopeButtonIndex]
  filterContentForSearchText(searchController.searchBar.text!, scope: scope)
}
```

첫째 유일한 문제는, scope bar를 아직 보지 못했다는 것입니다. scope bar를 추가하려면, search controller를 설정했던곳 직후로 이동합니다. `MasterViewController.swift` 내에 `viewDidLoad()`에서, candies를 할당하기 직전에 다음을 추가합니다.

```swift
// Setup the Scope Bar
searchController.searchBar.scopeButtonTitles = ["All", "Chocolate", "Hard", "Other"]
searchController.searchBar.delegate = self
```

search bar에 사탕객체에 지정한 범주와 일치하는 제목이 있는 category 막대가 추가됩니다. 또한 검색할때 모든 사탕 범주를 표시하는데 사용될 `All`이라고 불리는 모든 범주를 포함하는 카테고리를 포함합니다. 

이제 입력할때 선택한 범위 버튼과(selected scope button) 검색 텍스트가 함께 사용됩니다. 

앱을 빌드하고 실행합니다. 검색 텍스트를 입력하고 범위를 변경하세요.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/10/UISearchController-Filter-with-Scope.png" width="300"></center> <br>


범위가 All로 설정된 `caramel`을 입력하세요. 이것은 목록에 나타나지만 scope를 `Chocolate`으로 변경하면 초콜렛이 아니기 때문에 `caramel`이 사라집니다.

앱에는 아직 문제가 하나 있습니다. 사용자에게 검색 결과로 예상되는 수를 나타내지 않습니다. 반환된 결과가 없는 것과 느린 네트워크로 인해 느린 응답을 가져오는것을 사용자가 구분하기 어려울수 있으므로, 결과가 전혀 반환되지 않을때 특히 중요합니다.

---

## Adding a Results Indicator

이 문제를 고치려면, footer를 뷰에 추가해야합니다. 필터링이 사탕목록에 표시될때 보여지고, 필터된 배열에 몇개의 캔디들이 있는지 유저에게 알려줍니다. `SearchFooter.swift`를 엽니다. 여기에는 몇개의 레이블이 포함된 UIView가 있고, 반환된 결과수를 나타내는 API가 있습니다.

`MasterViewController.swift`로 돌아갑니다. class의 상단에는 이미 search footer를 위한 `IBOutlet`이 설정되어 있습니다. 이 footer는 Main.storyboard에 있는 Master scene에서 볼수 있습니다. `viewDidLoad()`의 scope bar를 설정한 다음지점에 다음 코드를 추가합니다.

```swift
tableView.tableFooterView = searchFooter
```

그러면 사용자화한 search footer view가 table view의 footer 뷰로 설정됩니다. 그 다음, 검색 입력이 변경될때마다 검색 결과 개수를 업데이트 해야합니다. `tableView(_:numberOfRowsInSection:)`를 다음과같이 교체합니다.

```swift
func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
  if isFiltering() {
    searchFooter.setIsFilteringToShow(filteredItemCount: filteredCandies.count, of: candies.count)
    return filteredCandies.count
  }
    
  searchFooter.setNotFiltering()
  return candies.count
}
```

여기서 한것은 searchFooter에 대한 호출을 추가한것입니다. 

애플리케이션을 빌드하고 몇가지 검색을 수행한다음 검색 결과가 나타낼때마다 footer의 업데이트를 봅니다. 키보드를 내리고 footer를 보기위해서는 검색버튼(return) 버튼을 눌러야합니다.


|  |  | 
| :--: | :--: | 
| <center><img src="https://koenig-media.raywenderlich.com/uploads/2017/10/UISearchController-SearchFooter1.png" width="300"></center>|<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/10/UISearchController-No-Results.png" width="300"></center>|


---

## Where To Go From Here? 

축하합니다. 이제 테이블뷰에서 직접 검색할수 있는 애플리케이션이 됬습니다. 

[여기](https://koenig-media.raywenderlich.com/uploads/2017/10/CandySearch_4_Finished.zip)에서 최종 프로젝트를 다운로드 할수 있습니다.

테이블뷰는 모든 종류의 앱에서 사용되고, 유용성을 위한 검색옵션을 제공하는 좋은 쓰임 입니다. UISearchBar, UISearchController와 함께 iOS는 많은 기능을 제공하므로 사용하지 않을 이유가 없습니다. 


---

## Official Documentation

[UISearchController](https://developer.apple.com/documentation/uikit/uisearchcontroller)<br>
[UISearchBar](https://developer.apple.com/documentation/uikit/uisearchbar)<br>






  