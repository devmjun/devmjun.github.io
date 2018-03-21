---
layout:     post
title:      "RxSwift.로 Todo App 만들기!(16)"
subtitle:   "Building a Complete RxSwift App"
date:       2018-03-19 18:01:00
author:     "MinJun"
header-img: "img/tags/RxSwift-bg.jpg"
comments: true 
tags: [RxSwift, RxCocoa]
---

Raywenderlich-Ebook의 RxSwift를 읽고 정리한 내용입니다.
아래 내용의 저작권과 이미지는 모두 [https:/www.raywenderlich.com/](https://www.raywenderlich.com/) 에 있습니다. 더 자세한 내용은 [여기서 책을 구입해주세요!](https://store.raywenderlich.com/products/rxswift)

---

## RxSwift/RxCocoa/RxDataSource 기초 정리 (16) 

- Chapter 24: Building a Complete RxSwift App
- Introducing QuickTodo 
- Archtiecting the application 
	- Binding at the right momnet 
- Task model 
- Tasks service 
- Scenes
- Coordinating scenes 
	- transitioning to another scene
	- The scene coordinator
	- passing data back 
	- kicking off the first scene
- Binding the tasks list with RxDataSource 
- Binding the Task cell 
- Editing tasks
- Challenge 1: Support item deletion 
- Challenge 2: add live statistics 
- Reference 

---

## Chapter 24: Building a Complete RxSwift App

이 책 전체에서 RxSwift의 많은 부분을 배웠습니다.

Reactive programming은 깊은 주제 입니다. Reactive programming을 사용하는것은 종종 익숙해진 아키텍쳐와는 매우 다른 아키텍쳐로 이어 집니다.

`RxSwift`에서 이벤트 및 데이터 흐름을 모델링하는 방법은 향후 제품발전에 반 할수 있어서 올바른 행동을 규정하는게 중요합니다.

이책을 끝내려면 작은 RxSwift 애플리케이션을 설계하고 코딩하세요. 목표는 `모든 비용`으로 Rx를 사용하는것이 아니라 안정되고 예측 가능하며 모듈식으로 작동하는 깨긋한 아키텍처를 이끌어내는 설계 결정을 내리는 것입니다. 

이 애플리케이션은 의도적으로 단순하므로 자신의 애플리케이션을 설계하는데 사용할 수 있는 아이디어를 명확하게 제시 할 수 있습니다. 

이장은 RxSwift만큼이나 사용자의 필요에 맞는 선택된 아키텍처의 중요성에 관한 것입니다. RxSwift는 잘 조정된 엔진 처럼 애플리케이션을 실행 하는데 도움이 되는 훌륭한 도구이지만 애플리케이션 아키텍처에 대해 생각하고 설계하는것을 방해하지는 않습니다. 

---

## Introducing QuickTodo 

`hello world`프로그램과 동등한 역활을 하는 `To-Do` 애플리케이션은 Rx 애플리케이션의 내부 구조를 보여주는 이상적인 후보입니다. <br>

<center><img src="/img/posts/Rx_Todo_Application.png" width="500" height="350"></center> <br> 

이전 장에서 `MVVM`과 reactive programming이 얼마나 잘맞는지에 대해 배웠습니다. 

`QuickTodo` 애플리케이션을 `MVVM`으로 구조화 하고 코드의 데이터 처리 부분을 분리하여 완전히 독립적으로 만들수 있는 방법을 배우게 됩니다. 

---

## Archtiecting the application 

앱의 특히 중요한 목표 중 하나는 비즈니스 로직을 실행하는데 도움이 되는 사용자 인터페이스, 애플리케이션의 비즈니스 로직 및 앱에 포함 된 서비스를 명확하게 분리 하는 것 입니다.

> Note: 비즈니슥 로직에 대한 간단한 내용은 [http://mommoo.tistory.com/67](http://mommoo.tistory.com/67)
> 

먼저 구현하려는 아키텍처에 대한 용어를 소개합니다. 

- `Scene`: ViewController가 관리하는 화면을 언급합니다. 일반 화면이나 모달 대화 상자일 수 있습니다. `view controller`와 `view model`로 구성됩니다.
- `view model`: 특정 장면을 표현하기 위해 `view controller` 에서 사용되는 `비즈니스 로직` 및 `데이터`를 정의합니다
- `Service`: 함수형 로직은 그룹은 애플리케이션에서 모든 화면에게 제공됩니다. 예를 들어 데이터 베이스에 대한 저장소를 서비스로 추상화 할수 있습니다. 마찬가지로 네트워크 서비스에서 네트워크 API 요청을 그룹화 합니다.
- `Model`: 애플리케이션에서 가장 기초적인 저장 공간 입니다. `view model` 과 `services` 모두 `model`을 조작하고 교환합니다. 

이전장에서 `MVVM`을 배웠습니다. 서비스는 새로운 개념으로 반응형 프로그래밍에 적합합니다. 서비스의 목적은 `Observable` 과 `Observer`를 가능한 많이 사용하여 데이터와 기능을 `공개함`으로써 구성 요소가 `가능한 반응적`으로 서로 연결되는 글로벌 모델을 만드는 것입니다(한마디로 유연한 설계)

`QuickTodo` 애플리케이션의 요구 사항이 상대적으로 적습니다. 그럼에도 불구하고 올바르게 설계해야 하므로 미래 성장을 위한 탄탄한 토대를 만들어야합니다.(간단하지만 필요한게 포함된 좋은 예제) 또한 다른 애플리케이션에서 재사용 할수 있는 아키텍쳐 이기도 합니다.

필요한 기본적인 아이템은 아래와 같습니다

- 개별 `TaskItem`을 설명하는 작업 `TaskItem model`
- 작업 생성, 업데이트, 삭제, 저장 및 검색을 제공하는 `TaskService`의 서비스
- 저장 매체. 여기서 `Realm`데이터 베이스와 `RxRealm`을 사용할것입니다.
- 작업 리스트를 나열, 생성 및 검색하는 작업은 `view model` 과 `view controller`로 나뉩니다.
- `scene coordinator`는 navigation 과 presentation을 관리하는 개체 입니다.<br>

<center><img src="/img/posts/Rx_Todo_Application-1.png" width="500" height="350"></center> <br> 

앞장에서 배운 것처럼 `view model`은 비즈니스 로직과 모델 데이터를 뷰 컨트롤러에 노출합니다. 

각 장면에 대한 `Viewmodel`을 생성하기 위해 따라야 할 규칙은 간단합니다.

- `Observable sequences`로 데이터를 노출합니다. 이렇게하면 사용자 인터페이스에 연결되면 자동으로 업데이트가 보장됩니다.
- `Action`패턴을 사용하여 `UI`에 연결할 수 있는 모든 `ViewModel`액션을 노출합니다
- 모든 모델 또는 공개적으로 접근가능한 데이터는 `observable sequence`로 노출하지 않는데이터는 변경 불가능합니다. 
- 장면에서 장면이 변화하는것은 비즈니스 로직입니다. 각 `viewModel`은 이러한 전환을 시작하고 다음 장면의 `view model`을 준비하지만 `view controller`에 대해서는 알지 못합니다. 

> Note: 데이터의 무결성은 UI에 의해 트리거된 업데이트를 완벽하게 제어합니다. 위 규칙의 엄격한 준수는 코드의 각 부분에 대한 최상의 테스트 가능성을 보장합니다.
> 
> 이전 장에서는 변경 가능한 속성을 사용하여 `didSet`의 도움을 받아 기본 모델을 업데이트하는 방법을 보여 주었습니다. 
> 
> 이 장에서는 변경 사항을 완전히 제거하고 액션만 노출함으로써 더 많은 개념을 취할 것입니다. 

---


## Bindable view controllers 

`view controller`부터 시작합니다. 어떤 시점에서 `view controller`를 연결된 뷰 모델에 연결하거나 바인드해야 합니다. 

> Note: 이 장의 start 프로젝트에는 꽤 많은 코드가 포함되어 있습니다. Xcode에서 프로젝트를 처음 열면 실행하기 전에 몇가지 키 유형을 추가해야 하므로 성공적으로 컴파일되지 않습니다.

`BindableType.swift`를 열고 아래의 protocol을 추가하세요

```swift
protocol BindableType {
  associatedtype ViewModelType
  var viewModel: ViewModelType! { get set }
  func bindViewModel()
}
```

`bindableType`프로토콜을 따르는 각 view controller는 viewModel 변수를 선언하고 `viewModel`변수가 할당되면 `bindViewModel()`함수가 호출되도록 합니다. 이 함수는 UI요소를 view model의 observable과 action에 연결합니다.

---

### Binding at the right momnet 

조심해야할 바인딩의 한 특징이 있습니다. `viewModel` 변수를 가능한 빨리 `View Controller`에 할당하려고 하지만 `bindViewModel()`은 `뷰가 로드된 후에만 호출해야합니다.`(중요)

이유는 `bindViewModel()`함수가 일반적으로 존재해야하는 UI요소를 연결해야 하기 떄문입니다. 그러므로 작은 헬퍼함수를 사용해여 각 뷰 컨트롤러를 인스턴스화 한 후에 호출합니다. 

`BindableType.swift`에 다음을 추가하세요.

```swift
extension BindableType where Self: UIViewController {
  mutating func bindViewModel(to model: Self.ViewModelType) {
    viewModel = model
    loadViewIfNeeded()
    bindViewModel()
	} 
}
```

이렇게 하면 `viewDidLoad()`가 view controlelr에서 호출될때 까지 `viewModel`변수가 이미 할당된 것입니다. 

`viewDidLoad()`는 부드러운 푸시 네비게이션 타이틀 애니메이션을 위해 뷰컨트롤러의 타이틀을 설정하는 가장 좋은 시간이기 때문에 `뷰모델`에 엑세스하여 타이틀을 준비해야 할수도 있습니다. 필요한 경우 뷰 컨트롤러를 로드하면 가장 효과적입니다. 

---

## Task model 

작업 모델은 간단하고 분할된 Realm base object에서 가져옵니다. Task는 제목(task 컨텐츠들), 생성된 날짜 그리고 확인날짜에 의해서 정의됩니다. 날짜는 작업 목록의 작업을 정렬하는데 사용됩니다. `Realm`에 익숙하지 않은 경우 [https://realm.io/docs/swift/latest/](https://realm.io/docs/swift/latest/)을 확인하세요.

`TaskItem.swift`를 열고 아래를 따르세요.

```swift
class TaskItem: Object {
    dynamic var uid: Int = 0
    dynamic var title: String = ""
    dynamic var added: Date = Date()
    dynamic var checked: Date? = nil
    override class func primaryKey() -> String? {
        return "uid"
    }
}
```

objects에만 해당하는 두 가지 세부 사항을 있어야 합니다.

`Realm database`에서 

- `Objects`는 threads를 교차할수 없습니다. 다른 스레드에 object가 필요한 경우, 다시 쿼리하거나 Realm `ThreadSafeReference`를 사용하세요 
- `Objects`는 자동으로 업데이트 됩니다. 데이터베이스를 변경하면 데이터베이스에서 쿼리 된 live object의 특성에 즉시 반영됩니다. 이것은 깊게(?) 있듯이 그 용도가 있습니다. 
- 결과적으로 `object` 삭제하면 기존 복사본이 모두 무효화 됩니다. 삭제가 된 후에 해당 쿼리된 object에 엑세스하면 예외가 발생합니다. 

위의 두번째 사항은 side effects가 있으며 이 장의 뒷부분에서 테스트 셀을 바인딩할대 자세히 설명합니다. 

---

## Tasks service 

`tasks service`는 저장소에서 작업을 만들고, 업데이트하고, 가져오는 기능을 합니다. 

담당 개발자는 프로토콜을 사용하여 서비스 공용 인터페이스를 정의한 다음 런타임 구현을 작성하고 테스트용 모의 구현을 작성합니다. 

첫번째로 프로토콜을 만듭니다. 서비스 사용자에게 공개할 내용입니다. `TaskServiceType.swift`를 열고 아래 프로토콜을 정의하세요

```swift
protocol TaskServiceType {
  @discardableResult
  func createTask(title: String) -> Observable<TaskItem>
  @discardableResult
  func delete(task: TaskItem) -> Observable<Void>
  @discardableResult
  func update(task: TaskItem, title: String) -> Observable<TaskItem>
  @discardableResult
  func toggle(task: TaskItem) -> Observable<TaskItem>
  func tasks() -> Observable<Results<TaskItem>>
}
```

> Note: `@discardableResult` 리턴값을 명시하지 않았을때 나타나는 컴파일 에러를 막을수 있습니다.

이것은 테스크를 생성, 삭제, 업데이트 및 쿼리하기 위한 기본적인 서비스를 제공하는 기본 인터페이스 입니다. 

가장 중요한 세부 정보는 모든 데이터를 `observable sequence`로 표시한다는 것입니다. 작업을 생성, 삭제, 업데이트 및 토글하는 기능 조차도 사용자가 구독 할 수 있는 `observable` 항목을 반환 합니다. 

핵심 아이디어는 `observable을 성공적으로 완료하여 작업의 실패 또는 성공을 전달`하는 것입니다. 또한 반환된 `observable 항목을 작업의 반환값`으로 사용할 수 있습니다.

이 장의 뒷 부분에서 몇가지 예를 볼 수 있습니다. 예를 들어 `TaskService.swift`를 열면 `update(task:title:)`가 다음과 같이 표시됩니다.

```swift
@discardableResult
func update(task: TaskItem, title: String) -> Observable<TaskItem> {
  let result = withRealm("updating title") { realm ->
Observable<TaskItem> in
    try realm.write {
      task.title = title
    }
    return .just(task)
  }
  return result ?? .error(TaskServiceError.updateFailed(task))
}
```

`withRealm(_:action:)`은 현재 Realm database를 가져와서 작업을 시작하기 위한 내부 래퍼입니다. 오류가 발생하면 `withRealm(_: action:)`은 항상 `nil`을 반환합니다.

이것은 호출자에게 오류를 알리기 위해 observable오류를 반환하는 좋은 기회입니다. 

마지막으로 `TaskServiceType`을 추가했으므로 이제 `TaskService.swift`를 열어 해당 프로토콜을 준수하게 만듭니다. 

```swift
struct TaskService: TaskServiceType {
```

`tasks serivce`작업이 끝났습니다. `view models`은 test 동안 가짜, 혹은 진짜 `TaskServiceType` object를 받으며 작업을 수행할수 있습니다.

---

## Scenes

위의 아키텍처에서 장면은 `view controller`와 `view mode`에 의해 관리되는 `스크린`으로 구성된 논리적인 프리젠테이션 유닛입니다. `scenes`는 다음 규칙과 같습니다.

- `View model`은 비즈니스 로직을 처리합니다. 이것은 다른 `장면`으로의 전환을 시작하기까지 이어집니다. 
- `view models`은 장면을 표현하는데 사용된 실제 뷰 컨트롤러 및 뷰에 대해 아무것도 모릅니다.
- `View Controller`는 다른 장면으로의 전환을 초기화하면 안됩니다. 그것은 view model에서 실행중인 비즈니스 로직의 도메인 입니다.  

이를 염두에 두고 애플리케이션 장면이 장면 열거형의 케이스로 나열되는 모델을 배치할 수 있으며 각 케이스에는 `associated data`로 `scene view model`이 있습니다. 

> Note: Navigator 클래스의 이전 장에서 사용한 것과 비슷하지만 장면을 사용하면 더욱 쉽게 탐색 할수 있습니다. 

`Scene.swift`를 엽니다. 우리는 간단한 애플리케이션 작업 및 `editTask`에서 필요한 두 장면을 정의 할 것입니다. 아래를 추가하세요

```swift
enum Scene {
    case tasks(TasksViewModel)
    case editTask(EditTaskViewModel)
}
```

이 단계에서 view model은 다른 view model을 인스턴스화하고 이를 전환 준비가 된 장면에 할당할수 있습니다. 

또한 `UIKit`에 전혀 의존하지 않아야 하는 view model에 대해 기본 계약을 수행합니다. 

잠시 후에 추가하려고 하는 `Scene`열거형의 확장 기능은 `Scene`에 대한 `view Controller`를 인스턴스화하는 유일한 장소에서 기능을 노출합니다.

이 함수는 각 장면에 대한 리소스에서 뷰 컨트롤를 가져오는 방법을 알고 있습니다. `scene + ViewController.swift`를 열고 이 함수를 추가하세요.

```swift
extension Scene {
  func viewController() -> UIViewController {
    let storyboard = UIStoryboard(name: "Main", bundle: nil)
    switch self {
    case .tasks(let viewModel):
      let nc = storyboard.instantiateViewController(withIdentifier:
"Tasks") as! UINavigationController
      var vc = nc.viewControllers.first as! TasksViewController
      vc.bindViewModel(to: viewModel)
      return nc
    case .editTask(let viewModel):
      let nc = storyboard.instantiateViewController(withIdentifier:
"EditTask") as! UINavigationController
      var vc = nc.viewControllers.first as! EditTaskViewController
      vc.bindViewModel(to: viewModel)
      return nc
		} 
	}
}
```

코드는 `viewcontroller`를 인스턴스화 하고 이를 각 enum 케이스와 associated 데이터에서 가져온 뷰 모델에 즉시 바인딩합니다. 

> Note: 이 기능은 애플리케이션에서 많은 화면이 있을때 상당히 길어질 수 있습니다. 명확성과 유지 보수의 편의를 위해 주저없이 여러 섹션으로 나누세요(화면이 많아도 Enum 관리 가능)
> 
> 다중 도메인이 있는 대규모 응용 프로그램에서는 도메인에 대한 `master`열거 형과 각 도메인에 대한 장면과 함께 하위 열거형을 가질 수도 있습니다. 

마지막으로 `scene coordinator`가 장면 사이의 전환을 처리합니다. 각 뷰 모델은 코디네이터에 대해 알고 있으며 장면을 푸시하도록 요청할수 있습니다. 

> 지금 시점에서 실행하면 컴파일 에러는 없지만 하얀 화면입니다.

---

## Coordinating scenes 

`MVVM`을 중심으로 아키텍처를 개발할때 가장 혼란스러운 질문 중 하나는 `애플리케이션이` 장면에서 장면으로 어떻게 전환합니까? 입니다. 

이 질문에 대한 답은 여러가지가 있습니다. 모든 아키텍처가 다르게 적용되기 때문입니다. 일부는 다른 뷰 컨트롤러를 인스턴화해야하기 때문에 `viewControler`에서 이를 수행합니다. 일부는 `view model`을 연결하는 특수 객체인 `router`을 사용합니다.

---

### transitioning to another scene

이 장의 저자는 자신이 개발한 많은 애플리케이션 중에서 효울적인 것으로 입증 된 간단한 솔루션을 선호합니다. 

1. `view modle`은 다음 scene을 위한 view model을 만듭니다.
2. 첫번째 `view model`은 `scene coordinator`으로 호출된 다음 장면으로 전환을 초기화 합니다. 
3. `scene coordinator`은 `Scenes enum` 함수를 사용하여 `View Controller`를 인스턴스화 합니다. 
4. 그런 다음 다음 `controller`가 `view model`에 바인딩합니다. 
5. 마지막으로 `view controller`에 다음 장면을 표시합니다. <br>

<center><img src="/img/posts/Rx_Todo_Application-2.png" width="500" height="350"></center> <br> 

이 구조를 사용하면 모델을 사용하는 view controller에서 `view models` 완전히 격리 할수 있으며 Push한 다음 view controller를 찾을 위치의 세부 정보에서 이 모델을 격리 할수 있습니다. 

이장의 뒷부분에 `Action`패턴을 사용하여 위의 1단계와 2단계를 감싸고 전환을 시작하는 방법을 살표 보겠습니다.

> Note: 항상 `scene coordinator'의 transition(to:type:)`와 `pop()`함수는 장면과 장면사이를 전환하고 특히 장면을 `modally`로 표현할때 코디네이터가 `어떤 뷰 컨트롤러가 가장 앞에 있는지 추적해야합니다.` 그러므로 자동 segues를 사용하지마세요. 

---

### The scene coordinator

`scene coordinator`는 `SceneCoordinatorType` 프로토콜을 통해 정의 됩니다. 애플리케이션을 실행하기 위한 구체적인 `SceneCoordinator`구현이 제공됩니다. 또한 가짜 전환을 만드는 테스트를 구현 개발이 가능합니다.

`SceneCoordinatorType`프로토콜은 간단하면서(이미 제공되어 있습니다. 효율적입니다.)

```swift
protocol SceneCoordinatorType {
  init(window: UIWindow)
  @discardableResult
  func transition(to scene: Scene, type: SceneTransitionType) ->
Observable<Void>
  @discardableResult
  func pop(animated: Bool) -> Observable<Void>
```

두 함수 `transition(to:type:)` 와 `pop(animated:)`를 사용하면 필요한(push, pop, modal, dismiss) 전환을 사용할수 있습니다. 

`SceneCoordinator.swift`의 구체적인 구현은 `RxSwift`를 사용하여 대리인 메시지를 차단하는 흥미로운 사례를 보여줍니다. 

두 전환 호출은 `Observable<Void>`를 반환하도록 설계되었으믈 아무 것도 방출하지 않고 전환이 완료 되면 완료됩니다. 완료 콜백과 같이 작동하므로 추가 작업을 수행하기 위해 구독 할 수 있습니다.

이를 구현하기 위해 프로젝트에 포함된 코드는 메시지를 가로채고 실제 대리인에게 메시지를 전달할수 있는 `RxSwift` 프록시인 `UInavigationController DelegateProxy`를 만듭니다.

```swift
_ = navigationController.rx.delegate
  .sentMessage(#selector(UINavigationControllerDelegate.navigationControl
ler(_:didShow:animated:)))
  .map { _ in }
  .bind(to: subject)
```
`transition(to:type:)`메소드의 맨 아래에 있는 트릭은 subscribetion을 호출자에게 리턴된 `subject`에 바인드 하는것입니다.

```swift
return subject.asObservable()
  .take(1)
  .ignoreElements()
```

반환 된 observable 요소는 네비게이션 케이스를 처리하기 위해 방출된 요소 하나를 취하지만 전달하지 않고 완료합니다. 

> Note: navigation delegate proxy에 대한 제한 없는 구독으로 인해 위 코드의 메모리 안정성에 대해 질문할수 있습니다. 
> 
> 그것은 완전히 안전합니다. 반환된 observable은 최대 하나의 요소를 취한 다음 완료됩니다. 
> 
> 완료되면 구독을 삭제(disposing)합니다. 반환된 observable이 아무것도 구독되지 않았다면 `subject`는 메모리에서 헤제되고 구독은 종료됩니다. 

---

### passing data back 

장면이 모달로 표시되는 경우와 같이 장면에서 이전 장면으로 데이터를 전달하는 것이 `RxSwift`를 사용하면 쉽습니다.

프리젠테이션뷰 모델은 프리젠테이션된 장면의 뷰 모델을 인스턴스화해서 엑세스 할 수 있고 통신을 설정할 수 있습니다. 

최상의 결과를 얻으려면 다음 세 가지 기술 중 하나를 사용 할 수 있습니다.

1. 첫번째(presenting) 뷰 모델이 구독 가능한 두번째(presented)뷰 모델에서 `Observable`을 노출합니다. 두번째 뷰 모델이 사라질때 `observable`객체에서 하나 이상의 결과 요소르 방출할수 있습니다. 
2. `Variable` 또는 `Subject`와 같은 `Observer`객체를 제시된 뷰 모델에 전달합니다 이 객체는 해당 객체를 사용하여 하나 이상의 결과를 보냅니다.
3. 하나 이상의 `Action`를 제시된 뷰 모델에 전달하여 적절한 결과와 함께 실행합니다.

이러한 기술을 통해 우수한 테스트 기능을 사용할수 있으며 모델 간의 약한 참조가 있는 게임을 피할수 있습니다. 

---

### kicking off the first scene

`coordinated scene model`을 사용하는 전체적인 세부 사항은 이제 시작단계 입니다. 첫번째 장면을 소개하여 장면을 프리젠테이션 시작해야합니다. 

`AppDelegate.swift`를 열고`application(_:didFinishLaunchingWithOptions:):`에 아래의 코드를 추가합니다. 

```swift
let service = TaskService()
let sceneCoordinator = SceneCoordinator(window: window!)
```

첫번째 단계는 코디네이터와 함께 필요한 모든 서비스를 준비하는 것입니다. 그런 다음 첫번째 `뷰 모델을 인스턴스화` 하고 `코디네이터에게 이를 root`으로 설정하도록 지정합니다.

```swift
let tasksViewModel = TasksViewModel(taskService: service, coordinator:
sceneCoordinator)
let firstScene = Scene.tasks(tasksViewModel)
sceneCoordinator.transition(to: firstScene, type: .root
```

그것은 쉽습니다. 이 기술의 멋진 점은 필요한 경우 다른 시작 화면을 시작할수 있다는 것입니다. 예를 들어, 사용자가 애플리케이션을 처음 열때 실행되는 자습서..?

이제 초기 장면의 설정을 완료했으므로 개별 뷰 컨트롤러를 살펴볼 때입니다. <br>

<center><img src="/img/posts/Rx_Todo_Application-3.png" width="500" height="350"></center> <br> 

---

## Binding the tasks list with RxDataSource 

18장에서 `RxCocoa Datasource`에서 RxCocoa에 UITableView 및 UICollectionView reactive extension 에 대해서 배웠습니다.

이 장에서는 `RxSwiftCommunity`에서 사용할 수 있는 프레임 워크인 `RxDataSource`를 사용하는 방법을 배우며 원래 `RxSwift`제작자인 `Krunoslav Zaher`가 개발 했습니다. 

이 프레임 워크가 `RxCocoa`의 일부가 아닌 이유는 주로 `RxCocoa`가 제공하는 단순한 확장보다 복잡하고 깊다는 것입니다. 하지만 `RxCocoa`의 기본 제공 바인딩에 비해 `RxDataSource`를 사용해야 하는 이유는 무엇일까요?

`RxDataSource`는 다음과 같은 이점을 제공합니다.

- 구분된 table, collection view를 지원합니다.
- 효율적이고 차별화된 알고리즘 덕분에 삭제, 삽입 및 업데이트 와 같이 변경된 내용만 다시로드 하는 행동은 해당 부분은 리로드 합니다. 
- 삭제, 삽입 및 업데이트를 위한 에니메이션 구성 가능
- 섹션과 아이템 애니메이션을 지원합니다. 

`RxDatasource`를 사용하면 어떠한 작업도 하지 않고도 자동으로 애니메이션을 얻을수 있습니다. 목표는 작업 목록의 끝에서 체크 된 항목을 체크된 섹션으로 이동하는 것입니다.

`RxdataSources`의 단점은 처음에는 기본 `RxCocoa`바인딩보다 이해하기가 더 어렵다는 것입니다. 테이블 또는 컬렉션 뷰에 `항목 배열(array of section)`을 전달하는 대신 `색션 모델배열(array of section models)`을 전달합니다.

`section model`은 section header(if any) 와 각 아이템의 datamodel(data model of each item) 을 정의 합니다. <br>

<center><img src="/img/posts/Rx_Todo_Application-4.png" width="500" height="350"></center> <br> 

`RxDataSources`를 사용하는 가장 간단한 방법은 섹션의 유형으로 `SectionModel`또는 `AnimatableSectionModel`제네릭 유형을 사용하는것입니다. 아이템들의 애니메이션을 하려면 `AnimatableSectionModel`을 사용해야 합니다. 

`section information` 과 items array의 타입을 지정하기만 하면 제네릭 클레스를 그대로 사용할수 있습니다. 

`TasksViewModel.swift`를 열고 아래의 코드를 추가하세요

```swift
typealias TaskSection = AnimatableSectionModel<String, TaskItem>
```

이는 섹션 유형을 `String`유형의 색션모델(제목만 필요함) 및 섹션 내용을 `TaskItem`요소의 배열로 갖는 것으로 정의합니다. 

`RxDataSources`의 유일한 제약은 섹션에 사용된 각 유형이 `IdentifiableType` 및 `Equatable` 프로토콜을 준수해야 한다는 것입니다. 

`IdentifiableType`은 `RxDataSource`가 객체를 고유하게 식별하도록 고유 한 식별자(동일한 구체 유형 의 객체간의 고유한 식별자)를 선언합니다.

`Equatable`은 오브젝트를 비교하여 동일한 고유 오브젝트의 두 사본 사이의 변경 사항을 비교합니다.

`Realm objects`는 이미 `Equatable`프로토콜을 준수합니다(몇 가지 문제는 아래 참조) 이제 `TaskItem`을 `IdentifiableType`을 준수한다고 선언하면 됩니다. `TaskItem.swift`를 열고 다음 확장을 추가하세요.

```swift
extension TaskItem: IdentifiableType {
  var identity: Int {
    return self.isInvalidated ? 0 : uid
  }
}
```

위 코드는 `Realm database`에 의한 객체 무효화를 검사합니다. 이 작업은 `task`를 삭제할때 발생합니다. 이전에 데이터 베이스에서 쿼리 된 라이브 카피가 유효하지 않게 됩니다. 

> Note: Realm은 값 유형이 아닌 클래스 유형이기 때문에 변경 감지는 약간 어려울수 있습니다. 데이터 베이스에 대한 모든 업데이트는 즉시 개체 속성에 반영되므로 `RxDataSource`에 대한 비교가 어려워 집니다. 
> 
> 사실 `Equatable` 프로토콜의 구현은 두 객체가 동일한 저장된 객체를 참조하는지 여부만 확인하기 때문에 빠릅니다. 
> 
> 이 특정 문제에 대한 해결책은 아래의 `Task cell`섹션을 참조하세요.

이제 `observable`로 `task list`를 노출시켜야 합니다. `RxRealm`덕분에 작업 목록에서 변경이 발생할때 자동으로 방출되는 `TaskService`의 작업 감시 기능을 사용할수 있습니다. 

목표는 다음과 같이 작업 목록을 분할 하는 것입니다. 

- 작업이 마지막으로 추가된 작업 순으로 정렬됩니다(체크하지 않은것은)
- 체크된 데이터로 정렬된 작업 완료(마지막으로 체크 순)

`TasksViewModel` 클래스에 이것을 추가합니다. 

```swift
var sectionedItems: Observable<[TaskSection]> {
  return self.taskService.tasks()
    .map { results in
      let dueTasks = results
        .filter("checked == nil")
        .sorted(byKeyPath: "added", ascending: false)
      let doneTasks = results
        .filter("checked != nil")
        .sorted(byKeyPath: "checked", ascending: false)
      return [
        TaskSection(model: "Due Tasks", items: dueTasks.toArray()),
        TaskSection(model: "Done Tasks", items: doneTasks.toArray())
      ]
	} 
}
```

두개의 `TaskSection` 요소가 있는 배열을 반환하면 두 섹션으로 구성된 목록이 자동으로 만들어 집니다.(위의 코드가 to-do, done 을 2개의 색션으로 분리 후 반환 하는것 같음)

이제 `TasksViewController`를 살펴 보겠습니다. 여기서 흥미로운 작업이 `sectionedItem observable`을 테이블뷰에 바인딩하기 위해 발생합니다.

첫번째 단계는 `RxDataSource`와 함께 사용하기에 적합한 데이터 소스를 만드는 것입니다. 테이블뷰의 경우 다음중 하나 일 수 있습니다.

- RxTableViewSectionedReloadDataSource<SectionType>
- RxTableViewSectionedAnimatedDataSource<SectionType> 

Reload type 는 개선이 많이 되지 않았습니다(?). section observable이 각 색션에 새로운 목록을 생성하기 위해 구독하면 간단히 테이블뷰를 reload 합니다.

애니메이션 형식이 우리가 원하는 형식입니다. 각 부분만 reload를 수행하는것 뿐만아니라 각 변경사항을 애니메이션화 합니다. `TasksViewController`클래스에 아래의 코드를 추가합니다.

```swift
let dataSource = RxTableViewSectionedAnimatedDataSource<TaskSection>()
```

`RxCocoa`의 내장 테이블뷰를 지원 하는 주요 차이점은 `구독에서 수행하는 대신 각 셀 유형을 표시하도록 datasource 객체를 설정한다는 것입니다.` 

task view controller 이내에 datasource 를 `skin`하는 함수를 추가하세요.

```swift
fileprivate func configureDataSource() {
  dataSource.titleForHeaderInSection = { dataSource, index in
    dataSource.sectionModels[index].model
  }
  dataSource.configureCell = {
    [weak self] dataSource, tableView, indexPath, item in
    let cell = tableView.dequeueReusableCell(withIdentifier:
"TaskItemCell", for: indexPath) as! TaskItemTableViewCell
    if let strongSelf = self {
      cell.configure(with: item, action:
strongSelf.viewModel.onToggle(task: item))
		}
		return cell 
	}
}
```

18 장 `RxCocoa`데이터 소스에서 살펴본 것처럼 observable을 table, collectionview에 바인딩할때 클로저를 제공하여 필요에 따라 각 셀을 생성하고 구성할수 있습니다. `RxDataSources`도 같은 방식으로 작동하지만 구성은 모두 `DataSource`객체에서 수행됩니다. 

이제 `MVVM` 아키텍처의 핵심 구성 코드에 대한 한가지 세부 사항이 있습니다. `Action`을 configuration fuction에 어떻게 전달했는지 주목하세요. 

이것은 디자인 모델에서 다시 전파하는 셀에서 트리거된 동작을 처리하는 방식입니다. 

`view model`에 의해 `action`이 제공된다는 점을 제외하고는 클로저와 매우 흡사합니다. 그리고 view controller는 cell을 action과 연결시키는 역할을 제한합니다. <br>

<center><img src="/img/posts/Rx_Todo_Application-5.png" width="500" height="350"></center> <br> 

**흥미로운 부분은 셀 자체가 버튼에 액션을 설정하는 것 외에도 뷰 모델 자체에 대해 알 필요가 없다는 것입니다(아래 참조)**

> Note: `titleForHeaderInSection` 클로저는 섹션 해더 제목을 문자열로 반환합니다. 섹션헤더를 만드는 가장 간단한 경우 입니다. 보다 정교한 것을 원하면 `dataSource.supplementaryViewFactory`를 `UICollectionElementKindSectionHeader` 종류에 적절한 `UICollectionReusableView`를 반환하도록 설정하여 구성 할 수 있습니다.

`viewDidLoad()`는 테이블뷰가 자동 높이 모드로 배치되는 곳이므로 테이블 설정을 완료하기에 좋습니다. `RxDatasources`의 유일한 요구 사항은 observable을 바인딩하기 전에 데이터소스 구성을 완료해야 한다는 것입니다. 

`viewDidLoad()`에 아래의 코드를 추가합니다.

```swift
configureDataSource()
```

마지막으로 뷰 모델의 sctionedItems observable은 `bindViewModel()`함수의 데이터 소스를 통해 테이블뷰에 바인딩합니다.

```swift
viewModel.sectionedItems
  .bind(to: tableView.rx.items(dataSource: dataSource))
  .disposed(by: self.rx_disposeBag)
```

첫번째 컨트롤러가 끝났습니다. `dataSource`객체의 각 변경 유형마다 다른 애니메이션을 사용할 수 있습다. 지금은 기본값으로 둡니다. 

작업 항목을 표시하는 데 사용되는 셀은 흥미로운 경우 입니다. 

`checkmark toggled`정보를 Action 모델을 사용하여 뷰 모델(위 그림 참조)에 다시 릴레이(relay) 합니다. 기본 객체인 `Realm Object` 인스턴스가 표시 중에 변경 될 수 있다는 사실을 처리해야 합니다.(스레드 안정성에 문제 생길수도 있다는 이야기같음..?) 다행히 `RxSwift`는 이 문제에 대한 해결책을 가지고 있습니다. 

`Realm database`에 저장된 객체는 동적 속성(dynamic properties)을 사용하기때문에 KVO(Key-Value-Observing)에서 observed 할수 있습니다. 간단한 내용은 다음 을 참조 [http://seorenn.blogspot.kr/2017/07/swift-4-kvo.html](http://seorenn.blogspot.kr/2017/07/swift-4-kvo.html)

`RxSwift`를 사용하면 object.rx.observe(class, propertyName)를 사용하여 속성 변경 사항에 observable sequence를 만들수 있습니다. 

<center><img src="/img/posts/Rx_Todo_Application-6.png" width="500" height="350"></center> <br> 

---

## Binding the Task cell 

이 기술을 `taskTableViewCell`에 적용합니다. 클레스 파일을 열고 `configure(with:action:)` method에 아래 코드를 추가합니다.

```swift
button.rx.action = action
```

먼저 `toggle checkmark` action은 checkmark button 과 바인딩합니다. 액션 패턴에 대한 자세한 내용은 19장 액션을 참조하세요. 이제 title string 과 `checked`상태 이미지에 바인딩합니다.

```swift
item.rx.observe(String.self, "title")
  .subscribe(onNext: { [weak self] title in
    self?.title.text = title
  })
  .disposed(by: disposeBag)
item.rx.observe(Date.self, "checked")
  .subscribe(onNext: { [weak self] date in
    let image = UIImage(named: (date == nil) ? "ItemNotChecked" :
"ItemChecked")
    self?.button.setImage(image, for: .normal)
  })
  .disposed(by: disposeBag)
```

<center><img src="/img/posts/Rx_Todo_Application-7.png" width="500" height="350"></center> <br> 

여기서 개별적인 두개의 observable 속성은 cell의 구성 요소들을 적절히 업데이트 합니다. 구독 시간에 초기 값을 받기 때문에 셀이 항상 최신 상태임을 확신 할수 있습니다. 

마지막으로 구독을 dispose 하는것을 잊지 마세요. 그렇게 하지 않으면 셀이 테이블 뷰로 재사용 될때 불의의 놀라움이 생길수 있습니다. 다음을 추가하세요

```swift
override func prepareForReuse() {
  button.rx.action = nil
  disposeBag = DisposeBag()
  super.prepareForReuse()
}
```

이는 일을 정리하고 셀 재사용을 준비하는 올바른 방법입니다. 항상 매달려 있는 구독을 떠나지 않도록 주의해야합니다. cell의 경우 cell자체가 재사용 되기 때문에 이것을 잘 이해해야 합니다.

애플리케이션을 빌드하고 실행하세요. 기본 작업 목록을 볼 수 있어야 합니다. 하나만 선택하면 RxDataSource의 다른엔진이 멋진 애니메이션을 생성합니다.

---

## Editing tasks

해결해야 하는 문제는 `tasks 생성` 및 `수정`입니다. tasks 생성하거나 편집할때 modal view controller를 프리젠트(표시) 하고 작업(업데이트 또는 삭제)을 작업 리스트 모델에 다시 전파해야합니다.

이 경우 절대적으로 필요한 것은 아니지만 변경 사항을 로컬에서 처리할 수 있고 작업 리스트가 자동으로 업데이트 되므로 `Realm`덕분에 일련의 장면에서 정보를 전달하는 패턴을 학습하는 것이 중요합니다.

이를 달성하는 주요 방법은 신뢰할수 있는 패턴을 사용하는 것입니다. 계획은 다음과 같습니다. 

- 편집 장면을 준비할때 하나 이상의 액션을 초기화때 전달합니다.
- 편집 장면은 작업을 수행하고 종료할때 적절한 동작(업데이트 또는 취소)을 실행합니다. 
- 호출자는 컨텍스트에 따라 다른 작업을 전달할수 있으며 편집 장면에서는 차이를 알수 없습니다. 작성시 취소를 위한 `삭제` 조치를 전달하거나 편집 취소를 위한 비어있는 조치(또는 조치 없음)을 전달하세요.

이 패턴은 자신의 애플리케이션에 적용할때 매우 유연 합니다. 특히 모달 장면을 표시할때 유용하지만 합성 결과 집합을 전달할 장면 중 하나의 결과를 전달할 때도 유용 합니다.(???)

<center><img src="/img/posts/Rx_Todo_Application-8.png" width="500" height="350"></center> <br> 

위의 이미지를 실천에 옮길 시간입니다. `TasksViewModel`에 아래의 코드를 추가합니다.

```swift
func onCreateTask() -> CocoaAction {
  return CocoaAction { _ in
    return self.taskService
      .createTask(title: "")
      .flatMap { task -> Observable<Void> in
        let editViewModel = EditTaskViewModel(task: task,
          coordinator: self.sceneCoordinator,
          updateAction: self.onUpdateTitle(task: task),
          cancelAction: self.onDelete(task: task))
        return self.sceneCoordinator.transition(to:
Scene.editTask(editViewModel), type: .modal)
		} 
	}
}
```

> Note: `self`는 구조체이기 때문에 `action`은 그것 자체의 `복사본(copy)`을 가져옵니다.(Swift에서 참조로만 최적화됨) 순환 참조가 없으므로 메모리가 누출될 위험이 없습니다. 그렇기 때문에 값 타입에는 적용되지 않는 [weak self], [unowned self]가 여기에 표시되지 않습니다. 
> 

이것은 작업리스트 화면에 오른쪽 위에있는 `+`버튼에 바인딩할 작업입니다. 그것이 하는 일은 다음과 같습니다.

- fresh, 새로운 아이템 생성 
- 생성이 성공적이면 새`EditiTaskViewModel`을 인스턴스화 하고 새 항목의 제목을 업데이트하는 updateAction 및 작업 항목을 삭제하는 cancelAction을 전달합니다. 방금 생성된 것이므로 취소하면 논리적으로 task를 삭제해야합니다. 

> Note: `Action`은 `observable sequence`를 반환하기 때문에, 편집 절차를 편집 작업 화면이 닫히면 완료되는 단일 시퀀스에 통합합니다. `observable`이 완료 될떄까지 action은 잠긴채로 있기 때문에 부주의로 동시에 에디터를 두번 올릴수 없습니다. Cool!

이제 `action`을 `tasksViewController`의 `bindViewModel()`함수의 `+`버튼에 바인딩 합니다. 

```swift
newTaskButton.rx.action = viewModel.onCreateTask()
```

그다음 `EditTaskViewModel.swift`로 이동하고 `initializer`를 채웁니다.

아래에 `init(task:coordinator:updateAction:cancelAction:)`에 코드를 추가하세요. 

```swift
onUpdate.executionObservables
  .take(1)
  .subscribe(onNext: { _ in
    coordinator.pop()
  })
  .disposed(by: disposeBag)
```

> Note: 대부분의 코드를 컴파일하기위해 `onUpdate` 및 `onCancel` 속성은 forced-unwrapped 옵션으로 정의되어있습니다. 이제 느낌표를 제거할수 있습니다. 

위의 내용은 무엇인가요? `onUpdate`액션을 `initializer`에 전달된 액션으로 설정하는 것 외에도, 액션이 실행될 때 새로운 observable event를 내는 액션의 `executionObservables sequence`를 구독합니다.(무슨말이야..그냥 새로운 action도 구독하고, 초기화시 넣은 액션도 실행됩니다.)

action은 OK 버튼에 바인딩되므로 한번만 실행됩니다. 이런일이 발생하면 현재 장면을 `pop()`하고 장면 코디네이터가 dismiss 합니다. 

취소 단추의 경우 다르게 진행해야합니다. 기존 `onCancel = cancelACtion` 할당을 제거하세요. 당신은 좀더 똑똑한 것을 할 것입니다. 

`initializer`에 의해 받은 action은 선택사항(optional) 입니다. 취소 할ㄷ 때 호출자가 아무것도 할수 없으므로 새 작업을 생성해야 합니다. 그러므로 이것은 장면을 `pop()`

```swift
onCancel = CocoaAction {
  if let cancelAction = cancelAction {
    cancelAction.execute()
  }
  return coordinator.pop()
}
```

마지막으로 `EditTaskViewController(in EditTaskViewController.swift)` 클래스로 이동하여 UI 바인딩을 마무리합니다. `bindViewModel()`에 다음을 추가합니다. 

```swift
cancelButton.rx.action = viewModel.onCancel
okButton.rx.tap
  .withLatestFrom(titleView.rx.text.orEmpty)
  .subscribe(viewModel.onUpdate.inputs)
  .disposed(by: rx_disposeBag)
```

사용자가 UI를 처리하기 위해서해야할 일은 사용자가 OK 버튼을 누를때 텍스트 뷰 내용을 `onUpdate Acion`으로 전달하는 것입니다. 액션의 inputs observer를 이용하여 Action을 실행하기 위해 값을 흐르게 할수 있습니다.

이제 애플리케이션을 빌드하고 실행하세요. 새 항목을 만들고 제목을 업데이트 하면 모든 것을 볼수 있습니다. 

해결해야할 마지막 사항은 기존 항목을 추가하는 것 입니다. 이를 위해서는 일시적이지 않은 새로운 액션이 필요합니다. action은 구독을 통해서 참조되지 않아야함을 기억 해야합니다. 그렇지 않으면 할당이 취소됩니다. 19 장에서(action)언급했듯이 이것은 혼란의 빈번한 원인입니다. <br>

| Full Screen | Page sheet| 
| :--: | :--: |
|![screen](/img/posts/Rx_Todo_Application-9.png) |![screen](/img/posts/Rx_Todo_Application-10.png) |  

`TaskViewModel`에 lazy 를 생성합니다.

```swift
lazy var editAction: Action<TaskItem, Void> = { this in
  return Action { task in
    let editViewModel = EditTaskViewModel(
      task: task,
      coordinator: this.sceneCoordinator,
      updateAction: this.onUpdateTitle(task: task)
)
    return this.sceneCoordinator.transition(to:
Scene.editTask(editViewModel), type: .modal)
	} 
}(self)
```

> Note: `self` 는 struct 이므로 `weak`, `unowned` 참조를 만들수 없습니다. 대신에 closure 나 lazy 변수에 함수를 초기화해서 전달하세요

이제 `TaskViewController.swift`로 돌아가서 작업을 `TaskViewController`의 `bindViewModel()`에 바인딩 할 수 있습니다. 아래의 코드를 추가합니다. 

```swift
tableView.rx.itemSelected
  .map { [unowned self] indexPath in
    try! self.dataSource.model(at: indexPath) as! TaskItem
  }
  .subscribe(viewModel.editAction.inputs)
  .disposed(by: rx_disposeBag)
```

`dataSource`를 사용하여 수신된 `IndexPath`와 일치하는 모델객체를 얻은 다음 이를 작업의 입력으로 흐르게 합니다. 

애플리케이션 빌드 및 실행 하세요. 이제 task를 만들고 편집할수 있습니다.!

---

## Challenge 1: Support item deletion 

두번째 장(MVVM)과 이 장에서 배운 내용을 토대로 서비스를 좀더 확장합니다.<br>

<center><img src="/img/posts/Rx_Todo_Application-11.png" width="500" height="350"></center> <br> 

가장 쉬운 방법은 컨트롤러를 항상 편집모두로 두는것입니다. 이렇게하면 오른쪽에서 왼쪽으로 스와이프하여 삭제 버튼을 표시할수 있도록 만들어주는 기능이 활성화 됩니다.

`viewDidLoad`에서 다음과 같은 방법으로 해당 기능을 설정할수 있습니다.

```swift
setEditing(true, animated: false)
```

두번째 변경 사항은 dataSource 객체에 있습니다. 모든 셀을 `edited`할수 있어야 합니다. `RxDataSources`의 `TableViewSectionedDataSource`클래스를 살펴보고 설정해야 할 항목을 찾을 수 있을 것이라고 확신합니다. 

> Hint: closure이므로 모든 경우에 true를 반환할수 있습니다.

이제 실제 작업을 처리 할수 있습니다. 이 과제에 대한 해결책은 다음과 같습니다.

- `Tasks ViewModel`안에 있는 Action을 만듭니다. `TaskService`의 적절한 API. 그 서명을 알아낼수 있나요? 그렇지 않다면 계속 잃어보세요.
- `TasksViewController`에서 이 acition을 `tableView.rx.itemDeleted`에 바인딩합니다. 받은 IndexPath 에서 TaskItem으로 이동하는 방법을 찾아야 합니다. 기존 onDelete(task:)함수를 다시 사용하지 않기 때문에 `CocoaAction` Action<TaskItem, Void>가 아닙니다. 

```swift
* TasksViewController.swift 의 configureDataSource()에
dataSource.canEditRowAtIndexPath = { _ in true }

* bindViewModel에 
tableView.rx.itemDeleted
	.map { [unowned self] indexPath in
			try! self.tableView.rx.model(at: indexPath)
			}
	.subscribe(viewModel.deleteAction.inputs)
	.disposed(by: rx_disposeBag)
	
* TasksViewModel.swift에
lazy var deleteAction: Action<TaskItem, Void> =
{ (service: TaskServiceType) in
		return Action { item in
				return service.delete(task: item)
       }
    }(self.taskService)
```

---

## Challenge 2: add live statistics 

UI를 보다 재미있게 만드려면 리스트 만기 및 완료 항목 수를 표시하고 싶습니다. 이 목적을 위해 `TasksViewController View` 아래에 레이블이 예약되어 있습니다. 그것은 `statisticsLabel`에 연결되어 있습니다. 

이 과제를 해결하려면 솔루션에서 이전 과제로 시작하거나 장의 최종 프로젝트에서 시작하세요. 실시간 통계를 수집하는 과정을 다음과 같습니다.

- `TaskServiceType(및 TaskService)`의 해당 구현부 에 단일 API를 추가하여 만기와 완료된 항목을 모두 쿼리합니다. 힌트: TaskItem에 체크된 날짜 속성을 사용합니다. 항목을 선택하지 않으면 `nil` 입니다. 쿼리가 새로운 결과를 반환할때마다, 즉 데이터베이스에서 변경이 발생할 때마다 업데이트가 된 statistics가 생성 됩니다. 두개의 영구 쿼리를 실행해야 합니다. 하나를 선택하여 체크되거나 체크되지 않은 항목을 제외 시킨 다음 `zip(_ :_ :resultSelector :)` RxSwift 연산자를 사용하여 결과를 생성합니다.
- `TasksViewModel`에서 새로운 statistics를 노출합니다.
- `TasksViewController`에서 이 observable을 구독하고 레이블을 업데이트 합니다.

작업을 쉽게 설계하기 위해 `TaskStatistics` 튜플 유형을 `TaskServiceType.swift`에 추가합니다.

```swift
typealias TaskStatistics = (todo: Int, done: Int)
```

위의 문제를 올바르게 필터링 하는 방법을 찾는것 이외에는 이 가제를 완료하는데 특별한 어려움을 겪지 않아야 합니다. 흥미로운 부분을 새로운 기능을 구조화 하고 애플리케이션의 관련 구성 요소에 올바르게 적용 할 수 있는 방법을 확인하는 것입니다. 

이 작업을 완료하면 statistics observable 재사용하여 애플리케이션 배지 번호를 동적으로 업데이트하세요. 이것은 `application delegate`의 `application(_:didFinishLaunchingWithOptions:).`에 추가하려는 것입니다.

이것으로 이 책의 마지막 장을 마칩니다. 우리가 그랬던 만큼 당신이 그걸 좋아했기를 바랍니다. 

```swift
* TaskServiceType.swift의 TaskServiceType 프로토콜 
    func numberOfTasks() -> Observable<Int>
    
* TaskService.swift의 TaskService
func numberOfTasks() -> Observable<Int> {
        let result = withRealm("number of tasks") { realm -> Observable<Int> in
            let tasks = realm.objects(TaskItem.self)
            return Observable.collection(from: tasks)
                .map { $0.count }
        }
        return result ?? .empty()
    }
    
* TasksViewController.swift의 TasksViewController의 bindViewModel()  
viewModel.statistics
	.subscribe(onNext: { [weak self] stats in
			let total = stats.todo + stats.done
			self?.statisticsLabel.text = "\(total) tasks, \(stats.todo) due."
            })
	.disposed(by: rx_disposeBag)
```

---

## Reference 

* 공식 

[http://reactivex.io](http://reactivex.io/documentation/ko/observable.html) <br> 
[Introduce to Rx](http://www.introtorx.com/Content/v1.0.10621.0/00_Foreword.html) <br>
[RxJS Marbles](http://rxmarbles.com/) <br>
[RxSwift github](https://github.com/ReactiveX/RxSwift) <br>
[http://community.rxswift.org/](http://community.rxswift.org/) <br>




















