---
layout:     post
title:      "RxSwift. RxCommunity 정리하기 (14)"
subtitle:   "Community Cookbook, TableView and CollectionView, Action, RxGesture, RxRealm, RxAlamofire"
date:       2018-03-17 18:01:00
author:     "MinJun"
header-img: "img/tags/RxSwift-bg.jpg"
comments: true 
tags: [RxSwift, RxCocoa]
---

Raywenderlich-Ebook의 RxSwift를 읽고 정리한 내용입니다.
아래 내용의 저작권과 이미지는 모두 [https:/www.raywenderlich.com/](https://www.raywenderlich.com/) 에 있습니다. 더 자세한 내용은 [여기서 책을 구입해주세요!](https://store.raywenderlich.com/products/rxswift)

---

## RxCommunity 기초 정리 (14) 

- RxSwift Community Cookbook
- Table and collection Views 
	- Basic table view 
	- Multiple cell types 
	- Providing additional functionality 
	- RxDataSources
- Action 
	- Creating an Action 
	- Connecting buttons
	- Composing behavior 
	- Passing work items to cells 
	- Manual execution
	- Perfectly suited for MVVM
	- 여담
- RxGesture
	- Attaching gestures 
	- Supported gestures 
		- Current location
		- Pangesture
		- Rotation gestures 
		- Automated view transform
	- Advance usage
- RxRealm(패스)
- RxAlamofire
	- Basic requests
	- Reqeust customization 
	- Response validation
	- Downloading files 
	- Upload tasks
	- Tracking progress 
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
- RxRealm(패스)
- RxAlamofire

---

## Table and collection Views (RxDataSources)

iOS 애플리케이션에서 가장 자주 요구되는 사항은 tableView 또는 Collection View에 콘텐츠를 표시하는것입니다. 일반적인 구현에는 두개 이상의 DataSource 와 Delegate 콜백이 있지만, 종종 더 많이 사용하게 됩니다.

`RxSwift`는 observable sequence를 TableView, CollectionView와 완벽하게 통합하는 도구를 제공할 뿐만 아니라 상당 부분 boilerplate code(꼭 필요한 간단한 기능이지만 많은 코드량이 들어가는 기능)의 양을 줄입니다.

`UITableView` 및 `UICollectionView`에 대한 기본 지원은 지원 장에서 소개한`RxCocoa`프레임워크에 있습니다.

이 장에서 내장된 프레임워크 도구를 사용하여 TableView, CollectionView를 빠르게 연결하는 방법을 학습합니다.

`sections`과 `animations`과 같은 항목에 대한 extension 지원은 `RxDataSource`에 있습니다. 

[https://github.com/RxSwiftCommunity/Rx자ataSources](https://github.com/RxSwiftCommunity/RxDataSources) 이 프레임워크는 `RxSwiftCommunity`조직의 산하에 있는 고급프레임 워크 입니다. 

아래 예제는 `UITableView`에 대한 것이지만 `UICollectionView`에서도 같은 패턴으로 작동합니다. 

---

## Basic table view (RxDataSources)

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

## Multiple cell types (RxDataSources)

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

## Providing additional functionality (RxDataSources) 

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

위처럼 tableView를 직접 delegate하면 일부 또는 모든 바인딩이 올바르게 작동하지 않을수 있습니다. <br>

<center><img src="/img/posts/CustomRxDatasource.png" width="500" height="300"></center> <br> 

> TableView Cell이 각각 다르고, 이미지도 모두 같은 이미지 이지만, 사실은 다른 이미지의 이름이 다른것.. -> Multiple Cell Type 성공

---

## RxDataSources (RxDataSources)

`RxCocoa`는 많은 Application의 TableView, CollectionView의 요구 사항을 처리합니다. 

`UITableView` 및 `UICollectionView`모두에 대한 편집 지원 기능을 갖춘 애니메이션 삽입 및 삭제, 색션 재로드 및 부분 업데이트(diff)와 같은 고급 기능을 구현할수 있습니다.(현재 공식적으로 지원하지는 않음)

`RxDataSources`를 사용하면 관용구(idioms)를 배우기 위해 더 많은 작업이 필요하지만 더 강력하고 고급 기능을 제공합니다. 

간단한 데이터 배열 대신 `SectionModelType`프로토콜을 준수하는 객체를 사용하여 내용을 제공해야합니다.

각 섹션 자체는 실제 개체를 포함합니다. 여러 유형이 있는 섹션의 경우 위에서 설명한 `enum`기술을 사용하여 유형을 구분하세요

`RxDataSources`의 힘은 모델 업데이트에서 변경된 사항을 확인하고 변경 사항을 선택적으로 애니메이션화하는데 사용되고 있는 `diff`알고리즘에 있습니다.

`AnimatableSectionModelType`프로토콜을 채택함으로써 섹션 모델은 삽입, 삭제 및 업데이트를 위해 수행하려는 애니메이션에 대한 세부 정보를 제공할수 있습니다. 

이 고급 프레임워크에 대한 자세한 내용을 보려면 [https://github.com/RxSwiftCommunity/RxDataSources](https://github.com/RxSwiftCommunity/RxDataSources)에서 저장소를 찾아보십시오

---

## Action 

[https://github.com/RxSwiftCommunity/Action](https://github.com/RxSwiftCommunity/Action)

RxSwiftCommunity에 있는 `RxAction`은 Application에 중요한 구성 우쇼 입니다. 코드에 어떤 작업이 있는지 생각해보면 다음과 같은 정의가 있습니다. 

- 트리거 이벤트는 무언가 할때가 되었음을 알려줍니다.
- 작업이 수행됩니다.
- 즉시, 나중에(또는, 절대로) 이 작업을 수행할때 일부값이 생깁니다. 

패턴에 주목하세요? 트리거 이벤트는 버튼 탭, 타이머, 제스처와 같이 데이터를 전달할수도 있고 전달하지 않을수도 있는 observable sequence로 표시될수 있지만 항상 신로가 처리됩니다. 

따라서 각 작어	의 결과는 일련의 결과(sequence of result)로 볼 수 있습니다. 수해된 각 작업마다 하나의 결과를 나타냅니다.

가운데에 `Action`객체가 있습니다. 그리고 다음을 수행합니다.

- observable sequence에 연결하거나 수동으로 연결하는 입력의 종료를 제공합니다.
- `Observable<Bool>`을 관찰하여 `enabled`상태(현재 실행 중인지 여부)를 확인할수 있습니다.
- 작업을 수행/시작 하고 결과를 관찰할수 있도록 응집된 클로져를 요청하고 결과들의 observable을 반환 합니다. 
- observable의 모든 작업의 결과를 노출시킬수 있습니다
- `observables`의 작업에 의해서 errors들을 정상적으로 처리합니다.

`Action`은 오류, 현재 실행 상태, observable 가 작업의 observable 가능 여부에 대한 observable항목을 표시하고 이전 작업이 완료되지 않았을때 새로운 작업이 시작되지 않도록 보장하는 멋진 클레스 입니다. 

마지막으로 `Action`은 계약을 정의 합니다. 계약을 통해 데이터를 제공하거나 일부만 제공하고 일부 작언은 완료되며 나중에 데이터를 가져올수 있습니다. 

이 계약이 구현되는 방식은 작업을 사용하는 코드와 관련이 없습니다. 

모체 행위가 계약을 존중하는 한 실제 행위를 모의 행위로 대체할수 있습니다. 

---

## Creating an Action (Action)

`Action`은 `Action<Input, Element>`로 정의된 일반적인 `class`입니다.

`Input`은 입력받은 데이터의 타입은 `factory worker` 기능을 제공합니다. 

아래의 인풋이 없는 간단한 `action `예제는 데이터를 생성하지 않고 작업을 수행하고 완료합니다.

```swift
let buttonAction: Action<Void, Void> = Action {
  print("Doing some work")
  return Observable.empty()
}
```

이것은 간단합니다. 이제 인증 정보를 가져와서 네트워크 요청을 수행하고 "로그인 된"상태를 리턴하는 조치는 무엇인가요? 

```swift
let loginAction: Action<(String, String), Bool> = Action { credentials in
  let (login, password) = credentials
  // loginRequest returns an Observable<Bool>
  return networkLayer.loginRequest(login, password)
}
```

> 실행 된 각 `Action`은 `factory closure`로 반환된 observable 이 완료되거나 오류가 발생하면 완료된것으로 간주합니다. 이 것은 장시간 실행되는 action들의 다양한 시작을 방지합니다. 이 동작은 위에서 볼수있는것처럼 네트워크 요청에 편리합니다.

`Action`은 처음에는 유용하게 보이지만 앱에서 어떻게 사용하는지 즉시 알수 없으므로 몇가지 실용적인 예를 살표 보겠습니다. 

---

## Connecting buttons (Action)

`Action`은 `UIButton`및 여러 `UIKit` 구성 요소에 대한 리액티브 확장 기능을 제공합니다. 

또한 `Action<Void, Void>`에 대한 `typealias`인 `CocoaAction`을 정의합니다. 출력을 기대하지 않는 버튼에 적합합니다. 

버튼을 연결하려면 간단하게 다음을 따르세요

```swift
button.rx.action = buttonAction
``` 

사용자가 버튼을 누를때마다 작업이 실행됩니다. 이전 작업이 완료되지 않은 경우 `tab`이 닫힙니다. Action을 `nil`로 설정하여 Action을 제거할수 있습니다. 

```swift
button.rx.action = nil
```

---

## Composing behavior (Action) 

다음과 같이 UI에 연결 하십시오.

```swift
let loginPasswordObservable =
Observable.combineLatest(loginField.rx.text, passwordField.rx.text) {
($0, $1) }
loginButton
  .withLatestFrom(loginPasswordObservable)
  .bind(to: loginAction.inputs)
  .disposed(by: disposeBag)
```

사용자가 로그인 버튼을 누를때마다 로그인 및 암호 텍스트 필드의 최신 값이 `loginAction`의 inputs observer에게 방출됩니다. 

작업이 아직 실행중이 아닌경우(예: 이전 로그인 시도가 진행되지 않은 경우) `factory closure`가 실행되고 새로운 로그인 요청이 시작되고 observable 값이 `true` 또는 `false`값을 전달하거나 오류가 발생합니다. 

이제 observable 요소를 구독하고 로그인에 성공하면 알람을 받을수 있습니다. 

```swift
loginAction.elements
  .filter { $0 }        // only keep "true" values
  .take(1)
  .subscribe(onNext: {
    // login complete, push the next view controller
  })
  .disposed(by: disposeBag)
```

오류는 구독 순서가 깨지지 않도록 특별한 대우를 받습니다. 거기에는 두가지 종류의 오류가 있습니다.

- `notEnabled`: `action`이 이미 실행중이거나, 비활성화 되어있는 경우
- `underlyingError(error)` - 기본 시퀀스에서 방출된 오류입니다. 그들은 아래와 같이 핸들링할수 있습니다.

```swift
loginAction
  .errors
  .subscribe(onError: { error in
    if case .underlyingError(let err) = error {
      // update the UI to warn about the error
} })
  .disposed(by: disposeBag)
```

---

## Passing work items to cells (Action)

`Action`은 일반적인 문제 해결에 도움을 줍니다. 즉 tableView Cell에 버튼을 연결하는..

`Action`은 cell에 설계될때, action을 button에 할당할때 재사용됩니다!

이렇게하면 실제 작업업을 샐의 서브 클레스에 넣지 않아도 되므로 깔끔하게 분리할수 있습니다. `MVVM`아키텍쳐를 사용하는 경우 더욱 중요합니다. 

이전의 책장의 예제를 다시 사용하여 버튼을 바인딩하는 방법은 간단합니다. 

```swift
observable.bind(to: tableView.rx.items) {
  (tableView: UITableView, index: Int, element: MyModel) in
  let cell = tableView.dequeueReusableCell(withIdentifier: "buttonCell",
for: indexPath)
  cell.button.rx.action = CocoaAction { [weak self] in
    // do something specific to this cell here
    return .empty()
  }
return cell }
.disposed(by: disposeBag)
```

물론 새로운 액션을 생성하는 대신 기존 액션을 설정할수 있습니다. 가능성은 무한합니다. 

---

## Manual execution (Action)

수동으로 action을 실행하여 `execute(_:)`함수를 호출하여 액션의 `input`유형의 요소를 전달합니다. 

```swift
loginAction
  .execute(("john", "12345"))
  .subscribe(onNext: {
    // handle return of action execution here
  })
  .disposed(by: disposeBag)
```

---

## Perfectly suited for MVVM (Action)

만약 `MVVM`을 사용한다면(24,25장 참조) RxSwift가 `MVVM` 아키텍쳐 패턴에 매우 적합하다는 것을 알았을 것입니다. 

`Action`은 완벽하게 일치합니다. View Controller와 View Model 간의 분리를 보완합니다. 

MVVM을 깨닫기 위해 `observable`과 모든 모든 action으로 만들수 있는 함수들을 Action으로 표시하세요! 

---

## 여담

개인적으로 

[https://github.com/RxSwiftCommunity/Action/blob/master/Demo/ViewController.swift](https://github.com/RxSwiftCommunity/Action/blob/master/Demo/ViewController.swift) 의 예제를 사용하는게 훨씬더 도움이 되었습니다.

---

## RxGesture (RxGesture)

`Gesture`는 `reaction extension`의 좋은 후보 입니다. 

`gesture`는 개별 또는 연속된 이벤트 스트림을 볼수있습니다.

제스쳐로 작업하는것은 일반적으로 `target-action pattern`과 관련있습니다. 어떤 객체를 제스처 대상으로 설정하고 업데이트를 수신하는 함수를 만듭니다. 

이 시점에서 한 데이터 및 이벤트 소스를 observable sequence로 전환하는것의 가치를 알수 있습니다. 

[https://github.com/RxSwiftCommunity/RxGesture](https://github.com/RxSwiftCommunity/RxGesture) 은 [https://github.com/RxSwiftCommunity](https://github.com/RxSwiftCommunity)에 속해 있고, 크로스  플랫폼이며 iOS, MacOS에서 모두 작동합니다.

이장에서는 `RxGesture`의 iOS 구현에 중점을 둡니다. 

---

## Attaching gestures (RxGesture)

`RxGesture`는 view에 gesture를 붙이는것을 간단하게 만들수 있습니다.

```swift
view.rx.tapGesture()
  .when(.recognized)
  .subscribe(onNext: { _ in
    print("view tapped")
  })
  .disposed(by: disposeBag)
```

이 예제에서 `RxGesture`는 `UITapGestureRecognizer`를 생성하여 뷰에 첨부하고 제스처가 인식될때마다 이벤트를 보냅니다. 

인식기를 제거하려면 구독에서 반환된 `Disposeable`객체의 `dispose()`를 호출하면 됩니다. 

한번에 여러 제스쳐를 첨부할수도 있습니다. 

```swift
view.rx.anyGesture(.tap(), .longPress()).when(.recognized)
.subscribe(onNext: { gesture in
  if let gesture = gesture as? UITapGestureRecognizer {
    print("view was tapped")
  } else {
    print("view was long pressed")
  }
})
.disposed(by: disposeBag)
```

구독에서 발생하는 이벤트는 상태를 변경한 제스처 인식기의 개체입니다.

위의 `when(_ :...)` 연산자를 사용하면 `recognizer state`를 기반으로 이벤트를 필터링하여 해당하지 않는 이벤트를 처리하지 않도록 할수 있습니다.

---

## Supported gestures (RxGesture)

`RxGesture`는 모든 iOS 및 MacOS의 내장 `gesture recognizers`에서 작동합니다. 자신의 제스처 인식기와 함께 사용할수 있지만 이 장의 범위를 벗어 납니다. 

단일 gesture가 필요하다면 `reactive extension`을 사용하여 직접적으로 view에 첨부해야합니다. 

한번에 여러 제스처가 필요한 경우 지원되는 기능 중 하나와 함께 `anyGesture(_ :...)`연산자를 사용하십시오.

위 예제에서 보았듯이 `view.tapGesture()`또는 `view.anyGesture(.tap())`를 사용할수 있습니다. 

`iOS`에서 `UIView`의 제스처 확장은 `rx.tapGesture(), rx.swipeGesture(_:), rx.longPressGesture(), rx.screenEdgePanGesture(edges:), rx.pinchGesture(), rx.panGesture() and rx.rotationGesture(). 
` 입니다.

`Swipe`, `Screen Edge Pan gestures`는 예상 시와이프 방향 또는 인식자가 제스처를 감지할수 있는 화면 가장자리를 나타내는 매개변수를 제공해야합니다. 

```swift
view.screenEdgePanGesture(edges: [.top, .bottom])
  .when(.recognized)
  .subscribe(onNext: { recognizer in
    // gesture was recognized
  })
  .disposed(by: disposeBag)
```

`macOS`에서 NSView의 제스처 확장은 `rx.clickGesture(), rx.rightClickGesture(), rx.pressGesture(), rx.rotationGesture() and rx.magnificationGesture().` 입니다. 

observable을 제스처를 생성하는 각 함수는 구성된 closure를 취할수 있습니다. 이렇게 하면 사용자의 요구에 따라 제스처를 조장할수 있습니다. 

예를 들어 `iPad Pro` Application을 작성하고 스타일러스 만으로 스와이프를 감지하려는 경우 다음을 수행할수 있습니다. 

```swift
let observable = view.rx.swipeGesture(.left, configuration: { recognizer
in
  recognizer.allowedTouchTypes = [.stylus]
})
```

---

### Current location (Rxgesture)

모든 `gesutre ovservable`은 `asLocation(in:)`을 사용하여 선택한 뷰에서 해당 위치를 observable 객체로 `변환` 할수 있습니다.(수동으로)

```swift
view.tapGesture()
  .when(.recognized)
  .asLocation(in: .window)
  .subscribe(onNext: { location in
    // you now directly get the tap location in the window
  })
  .disposed(by: disposeBag)
 
-> .window의 좌표가 (0,0)...
```

---

### Pangesture (RxGesture)

`rx.panGesture()` reactive extension을 사용하여 observable pan gesture르 를 만들때 `asTranslation(in:)`연산자를 사용하여 이벤트를 변환하고 현재 변환값 및 가속도의 튜플을 얻을수 있습니다.

이 연산자를 사용하면 제스쳐의 view, superview, window, 또는 상대 변환값을 얻기 원하는 다른뷰를 지정할수 있습니다. 

그 대신에 `Observable<(translation: CGPoint, velocity: CGPoint)>`를 얻을수 있습니다. 

```swift
view.rx.panGesture()
  .asTranslation(in: .superview)
  .subscribe(onNext: { translation, velocity in
    print("Translation=\(translation), velocity=\(velocity)")
  })
  .disposed(by: disposeBag)
```

---

### Rotation gestures (RxGesutre)

펜 제스쳐와 마찬가지로 `rx.rotationGesture()` 확장은 `asRotation()`연산자를 사용하여 추가로 변형할수 있습니다. 

`Observable<(rotation: CGFloat, velocity: CGFloat)>` 를 반환합니다. 

```swfit
view.rx.rotationGesture()
  .asRotation()
  .subscribe(onNext: { rotation, velocity in
    print("Rotation=\(rotation), velocity=\(velocity)")
  })
  .disposed(by: disposeBag)
```

---

### Automated view transform (RxGesture)

`MapView`에서 `pan/pinch/rotate` 조합의 제스처와 같은 더복잡한 상호작용은 UIView의 `transformGesture()` reactive extension을 사용하여 완전히 자동화 할수 있습니다. 

```swift
view.rx.transformGestures()
	.asTransform()
	.subscribe(onNext: { [unowned view] transform in
  view.transform = transform
})
.disposed(by: disposeBag)
```

`transformGestures()`는 pan/pinch/rotation
 3개의 동작을 뷰에 첨부하고 `Observable<TransformGestureRecognizers>`를 반환하는 편리한 extension 입니다.
 
`TransformGesutreRecognizers`구조체는 단순히 3가지 인식자를 보유합니다.

`asTransform()` 연산자는 구조를 `Observable<(transform: CGAffineTransform, velocity: TransformVelocity)>`로 변경합니다.

`transformVelocity`구조체는 각 제스처의 개별 속도를 유지합니다.

세가지 제스처가 필요하지 않은 경우 기본 구성에서 세가지 인식자를 모두 만들고 첨부하므로 구성시 이들 중 하나를 비활성화 할수 있습니다. 

```swift
view.rx.transformGestures(configuration: { recognizers in
  recognizers.pinchGesture.enabled = false
})
```

---

## Advance usage (RxGesture)

때때로 여러 장소에서 동일한 제스처에 대해 observable을 사용해야 할수도 있습니다. 

observable을 구독하면 제스처 인식기가 만들어지고 부착되므로 작업을 한번만 수행하면됩니다.

이것은 `shareReplay(_:)`연산자를 사용할수 있는 좋은 기회입니다. 

```swift
let panGesture = view.rx.panGesture()
  .shareReplay(1)
panGesture
  .when(.changed)
  .asTranslation()
  .subscribe(onNext: { [unowned self] translation, _ in
    view.transform = CGAffineTransform(translationX: translation.x,
      y: translation.y)
  })
  .disposed(by: stepBag)
panGesture
  .when(.ended)
  .subscribe(onNext: { _ in
    print("Done panning")
  })
  .disposed(by: stepBag)
```

---

## Chapter 21: RxRealm 

Pass 

---

## RxAlamofire 

최신 모바일 애플리케이션의 기본 요구 사항 중 하나는 원격 리소스를 쿼리하는 기능입니다. `RxSwift`에 포함된 `NSURLSession`의 기본 확장을 사용하여 이 책 전체에서 여러가지 예를 살표 보았습니다.

많은 개발자들이 OS에서 제공된 쿼리 메커니즘이 레퍼된 것을 사용하기를 원합니다. 

의심할 여지 없이 `Alamofire` [https://github.com/Alamofire/Alamofire](https://github.com/Alamofire/Alamofire) 는 `AFNetworking` [https://github.com/AFNetworking/AFNetworking](https://github.com/AFNetworking/AFNetworking) 에서 비롯된 `Objectve-c`의 뿌리를 가진 네트워킹 라이브러리 입니다. 

[https://github.com/RxSwiftCommunity/RxAlamofire](https://github.com/RxSwiftCommunity/RxAlamofire) 는 `RxSwiftCommunity` 조직하에 있는 프로젝트 입니다.

---

## Basic requests (RxAlamoFire)

기본 `SeesionManager` 세션을 사용하여 요청을 수행하는것은 간단합니다. 사용자 정의된 세션을 재사용할 필요가 없다면 다음과 같은 요청 메커니즘을 사용할수 있습니다. 아래와 같이 스트링 처리..

```swift
string(.get, stringURL)
  .subscribe(onNext: { print($0) })
  .disposed(by: disposeBag
```

대부분 다음과 같이 JSON을 디코더 처리해야합니다. 

```swift
json(.get, stringURL)
  .subscribe(onNext: { print($0) })
  .disposed(by: disposeBag)
```

결과로 나오는 observable은 디코딩된 `JSON`객체로 결과를 재방출 합니다. 요소 유형이 `Any` 이므로 observable 체인을 위해 추가로 매핑하거나 구독에 캐스트해야합니다.

또한 원시 데이터(raw Data)를 얻을수도 있습니다. 

```swift
data(.get, stringURL)
  .subscribe(onNext: { print($0) })
  .disposed(by: disposeBag)
```

`RxAlamofire`는 `request`(reqeustString, reqeustJSON, reqeustData) 접두어가 붙은 이러한 편리한 함수의 변형을 정의합니다. 

동일한 입력 매게 변수를 사용하지만 `HTTPURLResponse`객체의 튜플을 디코드 된 본문과 함께 반환합니다. 

> Note: `RxAlamofire` 요청은 올바르게 작동하는 observable 이벤트 입니다. 요청이 완료되기전에 `dispose()`처분을 하면 진행중인 요청이 취소 됩니다. 
> 이는 대규모 업로드 도는 다운로드를 수행할때 프로워크의 중요한 동작입니다. 

위의 모든 것은 기본 `SessionManager`를 사용하는 편리한 기능입니다. 

내부적으로 그들은 `SessionManager`에 대한 `reactive extension` 으로 정의된 실제 구현을 호출 합니다.

```swift
let session = NSURLSession.sharedSession()
session.rx.json(.get, stringURL)
  .subscribe(onNext:  { print($0) })
  .adDisposableTo(disposeBag)
```

> Note: `SessionManager` reactive extensions은 reqeust가 아닌, response로 고정된 observable tuple을 반환합니다.
> 예를 들어 `session.rx.responseJSON(.get, stringURL)`을 사용하여 `Observable<(HTTPURLResponse, ANy)>`를 가져옵니다.

---

## Reqeust customization (RxAlamoFire)

이 예제는 사용자화된 매개변수, , URL encoding, HTTP headers의 기본값을 수정하지 않았습니다. 그러나 그것은 쉽습니다.

```swift
// get current weather in london
json(.get,
     "http://api.openweathermap.org/data/2.5/weather",
     parameters: ["q": "London", "APPID": "{APIKEY}"])
  .subscribe(onNext: { print($0) })
  .disposed(by: disposeBag)
``` 

요청 URL 은 `http://api.openweathermap.org/data/2.5/weather? q=London&APPID={APIKEY}` 될것입니다.

header dictionary로 reqeust header을 수정할수 있습니다.

> Note: 모든 예에서는 문자열을 request URL로 사용합니다.(자동으로 URL 변경)
> 
> `RxAlamofire`의 모든 API는 `URLRequestConvertible` 프로토콜을 준수하는 객체를 허용하므로 문자열에만 국한 되지 않습니다.

---

## Response validation (RxAlamofire)

`reqeust` 및 `session.rx.reqeust API`를 사용하면 기본 `DataRequest`를 노출하여 추가 검증 및 조작을 수행할수 있습니다. 그런 다음 `Alamofire` extension을 사용하여 `RxAlamofire`편의 확장뿐만 아니라 유효성 검사를 수행할수 있습니다. 

```swift
request(.get, stringURL)
  .flatMap { request in
    request
      .validate(statusCode: 200 ..< 300)
      .validate(contentType: ["text/json"])
      .rx.json
}
```

`RxAlamofire`는 또한 위와 동일한 상태 코드 유효성 검사를 수행하는 `validateSuccessfulResponse()`확장을 제공합니다. 

---

## Downloading files (RxAlamoFire)

`Alamofire`의 `DownloadDestination` closure 타입에 의해 결정된 대상으로 파일을 다운로드 할수 있습니다.

```swift
let destination: DownloadRequest.DownloadFileDestination = { _, response
in
  let docsURL = FileManager.default.urls(for: .documentDirectory,
in: .userDomainMask)[0]
  let filename = response.suggestedFilename ?? "image.png"
  let fileURL = docsURL.appendPathComponent(filename)
  return (fileURL, [.removePreviousFile, .createIntermediateDirectories])
}
session.download(fileURL, to: destination)
  .subscribe(onCompleted: { print("Download complete") })
  .disposed(by: disposeBag)
```

이전에 취소 된 다운로드를 다시 시작하는것도 지원합니다. 

자세한 내용은 `SessionManager`의 `download(resumeData:to:)` 확장을 확인하세요.

> Note: 요청, 다운로드 및 업로드 API는 모두 방한 합니다. 구독시 단일 `AlamoFire.DataRequest`, `AlamoFire.DownloadRequest`, `AlamoFire.UploadRequest`를 내보낸다음 완료 또는 오류를 발생시킵니다. 
> 

---

## Upload tasks (RxAlamoFire)

업로드도 똑같이 간단합니다. 메모리 내 데이터, 저장된 파일을 업로드하거나 데이터 소스로 `InputStream`을 제공 할수도 있습니다.

```swift
session.upload(someFileURL, stringURL)
  .subscribe(onCompleted: { print("Upload complete") })
  .disposed(by: disposeBag
```

다운로드와 업로드 연산자는 `Alamofire.DownloadReqeust` 와 `Alamofire.UploadReqeust` 의 `observables`을 반환합니다. 또한 방출된 객체를 추가 처리하여 고급 처리를 수행할수도 있습니다. 

---

## Tracking progress (RxAlamoFire)

요청, 다운로드 및 업로드 API에 의해 생성된 `AlamoFire.Reqeust`객체에서 `Observable<RxProgress>`를 추출하여 업로드 및 다운로드 진행상황을 추적합니다. 


```swift
session.upload(someFileURL, stringURL)
  .flatMap { request in
    request
      .validateStatusCode()
      .rx.progress
  }
  .subscribe (
    onNext: { progress in
      let percent = Int(100.0f * progress.completed)
      print("Upload progress: \(percent)%")
},
    onCompleted: { print("Upload complete") })
  .disposed(by: disposeBag)
```

`rx.progress`확장은 `main queue`에서 규칙적인 간격으로 `RxProgress`요소를 방출합니다.

> Note: RxAlamofire는 더욱 풍부한 Alamofire API의 풍부한 하위 집합을 제공합니다. 

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
[https://github.com/RxSwiftCommunity/action](https://github.com/RxSwiftCommunity/action) <br>
[https://github.com/RxSwiftCommunity/rxgesture](https://github.com/RxSwiftCommunity/rxgesture) <br>
[https://github.com/RxSwiftCommunity/rxalamofire](https://github.com/RxSwiftCommunity/rxalamofire) <br>
[RxDataSource 예제](https://github.com/RxSwiftCommunity/RxDataSources/tree/master/Example)<br>

---
