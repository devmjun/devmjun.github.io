---
layout:     post
title:      "RxSwift. RxDataSource 기초 정리하기 (14)"
subtitle:   "Community Cookbook, TableView and CollectionView"
date:       2018-03-17 20:01:00
author:     "MinJun"
header-img: "img/tags/RxSwift-bg.jpg"
comments: true 
tags: [RxSwift, RxCocoa]
---

Raywenderlich-Ebook의 RxSwift를 읽고 정리한 내용입니다.

---

## RxCocoa 정리 (14) 

- RxSwift Community Cookbook
- Table and collection Views 
- Basic table view 
- Multiple cell types 
- Providing additional functionality 
- RxDataSources
- Reference

---

## RxSwift Community Cookbook 

`RxSwift`의 인기는 매일 계속 증가 하고 있습니다. 이 라이브러리 주위에 형성된 친절하고 창의적인 커뮤니티 덕분에 많은 곳에서 `Rx`프로젝트가 `GitHub`에서 공개됩니다. 

`RxSwift`를 사용하는 공동체 기반 라이브러리의 장점은 `Rx`표준을 따라야하는 주 저장소와 달리 이러한 라이브러리는 다양한 접근 방식을 실험하고 탐색할수 있으며 다중 플랫폼이 아닌 특수화를 제공할수 있다는것입니다. 

이 색션에서는 많은 커뮤니티 오픈 소스 프로젝트 중 몇가지를 살펴 보겠습니다. 

이 섹션에는 TableView 바인딩, 사용자 제스처 처리, Realm database 파싱, Alamofire로 서버와 대화하는데 도움이 되는 다섯 개의 커뮤니티 프로젝트로 간략하게 보이는 5개의 짧은 Cookbook-style 챕터가 포함되어 있습니다.

- Table and collection Views 
- Action
- RxGesture
- RxRealm(패스 예정)
- RxAlamofire

---

## Table and collection Views 

iOS 애플리케이션에서 가장 자주 요구되는 사항은 tableView 또는 Collection View에 콘텐츠를 표시하는것입니다. 일반적인 구현에는 두개 이상의 DataSource 와 Delegate 콜백이 있지만, 종종 더 많이 사용하게 됩니다.

`RxSwift`는 observable sequence를 TableView, CollectionView와 완벽하게 통합하는 도구를 제공할 뿐만 아니라 상당 부분 boilerplate code(꼭 필요한 간단한 기능이지만 많은 코드량이 들어가는 기능)의 양을 줄입니다.

`UITableView` 및 `UICollectionView`에 대한 기본 지원은 지원 장에서 소개한`RxCocoa`프레임워크에 있습니다.

이 장에서 내장된 프레임워크 도구를 사용하여 TableView, CollectionView를 빠르게 연결하는 방법을 학습합니다.

`sections`과 `animations`과 같은 항목에 대한 extension 지원은 `RxDataSource`에 있습니다. 

[https://github.com/RxSwiftCommunity/Rx자ataSources](https://github.com/RxSwiftCommunity/RxDataSources) 이 프레임워크는 `RxSwiftCommunity`조직의 산하에 있는 고급프레임 워크 입니다. 

아래 예제는 `UITableView`에 대한 것이지만 `UICollectionView`에서도 같은 패턴으로 작동합니다. 

---

## Basic table view 

일반적인 시나리오에서는 이전 장에서 보았듯이 같은 유형의 항목 목록(예: 도시 목록)을 표시하려고합니다. 

표준 셀을 사용하여 이를 표시하려면 거의 제로설정이 필요합니다. single observable list를 고려하세요.

```swift
@IBOutlet var tableView: UITableView!
func bindTableView() {
  let cities = Observable.of(["Lisbon", "Copenhagen", "London", "Madrid",
"Vienna"])
  cities
      .bind(to: tableView.rx.items) {
      (tableView: UITableView, index: Int, element: String) in
      let cell = UITableViewCell(style: .default, reuseIdentifier:
"cell")
      cell.textLabel?.text = element
return cell }
  .disposed(by: disposeBag)
}
```

이게다야. 모든 `UIviewController`를 `UITableViewDataSource`로 설정할 필요조차 없습니다. 

이것은 무슨일이 일어나고 있는지에 대한 개요를 알아볼 가치가 있습니다.

- `tableView.rx.items`은 `Observable<[String]>`과 같이 observable sequence에서 작동하는 바인딩하는 함수입니다.
- 바인딩은 sequence를 구독하고 자신을 TableView의 `dataSource` 및 `delegate` 설정하는 보이지 않는 `ObserverType`객체를 만듭니다.(tableView.rx.items 을 바인딩할때 delegate, datasource 작업을 한다는 이야기..)
- `observable`에 새로운 새로운 요소배열이 전달되면 `binding`이 tableView reloads 합니다.(각 요소를 배열로 전달하고, 그 배열이 전달될떄마다 reload??, 혹은 한 시퀀스가 끝낫을떄 reload 하는지 확인 필요)
- 각 항목의 셀을 가져오려면(obtain...)`RxCocoa`는 다시 로드할 행의 세부정보(및 날짜)와 함께 클로저를 호출합니다. 

이것은 사용하기 쉽습니다. 그러나 유저의 선택을 캡쳐 하려면 어떻게 해야하나요? 다시 말하지만 이 프레임워크는 다음과 같이 도움을 줍니다.

```swift
tableView.rx
  .modelSelected(String.self)
  .subscribe(onNext: { model in
    print("\(model) was selected")
  })
  .disposed(by: disposeBag)
```

`modelSelected(_:)` extension은 사용자가 모델 객체를 선택할때마다 모델 객체(셀이 나타내는 요소)를 observable 객체를 반환합니다.

다양한(itemSelected())은 선택한 항목의 `IndexPath`를 전송합니다. RxCocoa는 다음과 같은 관찰 항목을 제공합니다. 

- `modelSelected()`, `modelDeselected()`, `itemSelected()`, `itemDeselected()`항목 선택 실행 
- `accessoryButton`액세서리 버튼 탭에서 실행
- `itemInseted()`, `itemDeleted()`, `itemMoved()` table edit mode의 이벤트 콜백에서 실행 
- `willDisplayCell()`, `didEndDisplayingCell()`과 관련된 모든 시간에 UITableViewDelegate 콜백이 발생합니다. 

이들은 모두 `UITableViewDelegate` 콜백 주위의 래퍼입니다. 

---

## Multiple cell types 

여러 cell의 유형을 다루는것이 거의 비슷합니다. `model` 관점에서 보면 처리할수 있는 가장 좋은 방법은 관련 데이턱 ㅏ있는 열거형을 요소 모델로 사용하는 것입니다. 

이 방법을 사용하면 테이블을 열거형 배열의 observable 항목에 바인딩하는 동안 필요한 여러가지 셀 유형을 처리할수 있습니다. 

문자열이 하나인 셀 또는 두개의 이미지가 있는 사용자 정의 셀을 사용하여 tableView Cell을 작성하려면 먼저 열거형을 사용하여 데이터 모델을 정의한 다음 모델의 observable의 배열을 만듭니다. 

```swift
enum MyModel {
  case textEntry(String)
  case pairOfImages(UIImage, UIImage)
}
let observable: Observable<[MyModel]> = Observable.of([
    .textEntry("Paris"),
    .pairOfImages(UIImage(named: "EiffelTower.jpg"), UIImage(named:
"LeLouvre.jpg")),
    .textEntry("London"),
    .pairOfImages(UIImage(named: "BigBen.jpg"), UIImage(named:
"BuckinghamPalace.jpg"))
])
```

table에 바인딩하려면 약간 다른 클로저를 사용합니다. 방출되는 요소에 따라 다른 셀 클래스를 로드 하십시오. 관용구 코드는 다음과 같습니다.

```swift
observable.bind(to: tableView.rx.items) {
  (tableView: UITableView, index: Int, element: MyModel) in
    let indexPath = IndexPath(item: index, section: 0)
    switch element {
    case .textEntry(let title):
      let cell = tableView.dequeueReusableCell(withIdentifier:
"titleCell", for: indexPath)
      cell.titleLabel.text = title
      return cell
    case .pairOfImages(let firstImage, let secondImage):
      let cell = tableView.dequeueReusableCell(withIdentifier:
"pairOfImagesCell", for: indexPath)
       cell.leftImage.image = firstImage
       cell.rightImage.image = secondImage
       return cell
	} 
}
```

이것은 이전 보다 훨씬 많은 코드가 아닙니다. 

유일한 뽁잡성은 열거형을 사용하여 우아하게 해결할수 있는 객체 배열을 observable 데이터 유형을 처리하는 것입니다.

---

## Providing additional functionality 

`RxCocoa`기반 테이블뷰 및 컬렉션 뷰에서는 ViewController를 대리인으로 설정하지 않아도 `RxCocoa` Extension이 관리하지 않는 보완적인 기능을 제공할수 있습니다.

`UICollectionView`의 경우 `UIViewController`를 `UIcollectionViewDelegate`로 남겨 둘수 있습니다. 

`nib`, `storyboard`에서 이것을 바인딩하면 `RxCocoa`가 올바른 작업을 수행합니다. 실제 대리자로 설정된 다음 ViewController가 구현하는 콜백을 전달합니다. 

에를들어 수동 크기 조정으로 `UICollectionView`를 사용하는 경우 올바른 항목 크기를 계산하기 위해 종종 `collectionView(_ :layout: sizeForItemAt:)`을 구현해야합니다. 

콜렉션 뷰를 뷰 컨트롤러와 델리게이트로 연결한 다음 나중에 `RxCocoa`바인딩을 사용하여 컨텐트를 관리하면 특별한 일이 없습니다. `RxCocoa`가 세부 사항을 처리합니다.

이미 콜렉션뷰를 `RxCocoa`에 바인딩한 상태에서 뷰 컨트롤러를 콜렉션 뷰 델리게이트로 추가하려면 이 관용구를 간단히 사용할수 있습니다. 

```swift
tableView.rx.setDelegate(myDelegateObject)
```

table reactive exteions은 "올바른 일"을 수행하고 개체가 올바르게 구현된 모든 대리자 메서드를 전달합니다. 

**`RxCocoa`로 바인딩한 후 개체를 TableView, CollectionView delegate로 직접 설정하지 마십시오.**

위처럼 tableView를 직접 delegate하면 일부 또는 모든 바인딩이 올바르게 작동하지 않을수 있습니다.

---

## RxDataSources

`RxCocoa`는 많은 Application의 TableView, CollectionView의 요구 사항을 처리합니다. 

`UITableView` 및 `UICollectionView`모두에 대한 편집 지원 기능을 갖춘 애니메이션 삽입 및 삭제, 색션 재로드 및 부분 업데이트(diff)와 같은 고급 기능을 구현할수 있습니다.(현재 공식적으로 지원하지는 않음)

`RxDataSources`를 사용하면 관용구(idioms)를 배우기 위해 더 많은 작업이 필요하지만 더 강력하고 고급 기능을 제공합니다. 

간단한 데이터 배열 대신 `SectionModelType`프로토콜을 준수하는 객체를 사용하여 내용을 제공해야합니다.

각 섹션 자체는 실제 개체를 포함합니다. 여러 유형이 있는 섹션의 경우 위에서 설명한 `enum`기술을 사용하여 유형을 구분하세요

`RxDataSources`의 힘은 모델 업데이트에서 변경된 사항을 확인하고 변경 사항을 선택적으로 애니메이션화하는데 사용되고 있는 `diff`알고리즘에 있습니다.

`AnimatableSectionModelType`프로토콜을 채택함으로써 섹션 모델은 삽입, 삭제 및 업데이트를 위해 수행하려는 애니메이션에 대한 세부 정보를 제공할수 있습니다. 

이 고급 프레임워크에 대한 자세한 내용을 보려면 [https://github.com/RxSwiftCommunity/RxDataSources](https://github.com/RxSwiftCommunity/RxDataSources)에서 저장소를 찾아보십시오

---

## Reference 

* 공식 

[http://reactivex.io](http://reactivex.io/documentation/ko/observable.html) <br> 
[Introduce to Rx](http://www.introtorx.com/Content/v1.0.10621.0/00_Foreword.html) <br>
[RxJS Marbles](http://rxmarbles.com/) <br>
[RxSwift github](https://github.com/ReactiveX/RxSwift) <br>
[http://community.rxswift.org/](http://community.rxswift.org/) <br>


* 일반 참조 

[https://github.com/RxSwiftCommunity/RxDataSources](https://github.com/RxSwiftCommunity/RxDataSources) <br>

[RxDataSource 예제](https://github.com/RxSwiftCommunity/RxDataSources/tree/master/Example)<br>

---
