---
layout:     post
title:      "Swift. CoordinatorPattern tutorial"
subtitle:   "링크 참조"
date:       2018-11-8 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Architecture]
---

## Table of contents 

  - [<U>Coordinator Tutorial for iOS: Getting Started</U>](#section-id-12)
  - [<U>Getting Started</U>](#section-id-24)
  - [<U>Current Implementation Problems</U>](#section-id-43)
  - [<U>Reusablility Problems</U>](#section-id-63)
  - [<U>Coordinator Pattern</U>](#section-id-129)
  - [<U>Coordinator Protocol</U>](#section-id-137)
  - [<U>Apply the Coordinator Pattern</U>](#section-id-153)
  - [<U>Application Coordinator</U>](#section-id-182)
  - [<U>Kanji List Coordinator</U>](#section-id-233)
  - [<U>When to Create a Coordinator?</U>](#section-id-355)
  - [<U>Kanji Detail Coordinator</U>](#section-id-365)
  - [<U>Project Clean Up</U>](#section-id-499)
  - [<U>Extras: Coordinator Pattern with Storyboards</U>](#section-id-501)
  - [<U>Where To Go From Here?</U>](#section-id-503)

<div id='section-id-12'/>

## Coordinator Tutorial for iOS: Getting Started 

이 Coordinator tutorial은 MVC를 사용하는 iOS앱을 Coordinator pattern으로 변환하고 Coordinator의 장점과 단점을 조사합니다.

Model-View-Controller(MVC) 디자인 패턴은 유용하지만 스케일이 커지면 좋지 않습니다. 프로젝트의 사이즈와 복잡도가 성장함에 따라서 MVC의 한계는 더욱 뚜렷해집니다. 이 coordinator tutorial 에서는 Coordinators라는 방법으로 접근을 시도해볼 것입니다. 

이 용어에 대해서 친숙하지 않아도 걱정하지 마세요. 어떤 제3의 프레임워크를 필요로 하지 않는 아키텍쳐 이고 쉽게 기존의 MVC 프로젝트에 체택 할수 있습니다.

이 Coordinator tutorial의 끝에서 앱을 만들때를 위한 최고의 방법을 결정할수 있을것입니다. 

> Note: MVC가 친숙하지 않다면 [Design Pattern in iOS](https://www.raywenderlich.com/477-design-patterns-on-ios-using-swift-part-1-2)를 읽어주세요 

<div id='section-id-24'/>

## Getting Started

[여기](https://koenig-media.raywenderlich.com/uploads/2018/02/KanjiList-Materials.zip)에서 프로젝트를 다운 받고 시작해주세요!

> Note: Coordinator tutorial 에서 사용되는 kanji data는 [<U>Kanji alive Public API</U>](https://app.kanjialive.com/api/docs)에서 제공되어진걸 사용합니다. 

Kanji List는 Kanji(일본어로 사용되는 한자) 를 배우기 위한 앱 이고 현재 MVC 패턴으로 되어있습니다.

이 앱이 제공하는 기능과 어떻게 동작하는지에 대해서 자세히 살펴 봅니다.

- `KanjiListViewController.swift`는 kanji 목록을 가지고 있습니다.
- `KnajiDetailViewController.swift`는 선택한 kanji에 대한 정보, kanji를 사용하는 단어 목록을 가지고 있습니다. 
- 목록에서 단어를 산택했을때 application은 `KanjiListViewController.swift`를 push 하고 단어에 대한 kanji 목록을 보여줍니다. 

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/01/kanji-screens_v2.png" width="650" height="850"></center> <br> 


또한 `KanjiStorage.swift`의 공유된 인스턴스에는 `Kanji.swift`의 Data model들이 있습니다. 파싱된 kanji data를 저장하기 위해 사용되어 집니다.

<div id='section-id-43'/>

## Current Implementation Problems 

이 시점에서 앱은 잘 동작하는데 뭐가 문제야? 라고 생각할수 있습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/11/basic-confused-2-768x768.png" width="350" height="450"></center> <br> 


그것은 좋은 질문입니다. Main.storyboard를 열어보면 

<center><img src="/img/posts/coordinator-pattern-5.png" width="650" height="750"></center> <br> 


이건좀 이상해 보입니다. 앱은 `KanjiListViewController`에서 `KanjiDetailViewController`로 segue 합니다. 그리고 `KanjiDetailViewController` 에서 `KanjiListViewController`로 segue 합니다. 

앱의 비즈니스 로직 때문입니다.

- 먼저 `KanjiDetailViewController.swift`를 push 합니다.
- 그후 `KanjiListViewController.swift`를 push 합니다

segues에서 이 문제를 생각한다면, 부분적으로 동의 할것입니다.

Segue들은 두개의 `UIViewController`와 바인드 하고, 이 `UIViewController`를 재사용하기 어렵게 만듭니다.

<div id='section-id-63'/>

## Reusablility Problems 

`KanjiListViewController.swift`를 열면 `kanjiList`가 있습니다

```swift
var kanjiList: [Kanji] = KanjiStorage.sharedStorage.allKanji() {
  didSet {
    kanjiListTableView?.reloadData()
  }
}
```

`kanjiList`는 `KanjiListViewController`를 위한 datasource 이고 공유된 `KanjiStorage`에서 모든 knaji를 화면에 표시 하기 위한 기본값 입니다. 

여기에 `word`라는 프로퍼티가 있습니다. 이 프로퍼티는 첫번째와 세번째 시나리오에 대한 `KanjiListViewController`를 재사용하기 위한 hack 입니다.

```swift
var word: String? {
  didSet {
    guard let word = word else {
      return
    }
    kanjiList = KanjiStorage.sharedStorage.kanjiForWord(word)
    title = word
  }
}
```

`word`를 설정하는것으로 `kanjiList`와 `UINavigationBar` 의 표시된 타이틀을 변경할수 있습니다.

![](/img/posts/coordinator-pattern-0.png)

`KanjiListViewController`는 다음의 것들을 알고 있습니다.

- word는 선택되어 질것입니다. 
- word는 kanji를 가집니다
- 선택된 단어가 없다면 `kanjiList`의 모든 단어를 보여주어야 합니다 
- `KanjiListViewController`는 `UINavigationController`에 있는 것이라고 알고 단어가 선택된다면 타이틀을 변경해야 합니다.


<center><img src="/img/posts/coordinator-pattern-1.png" width="450" height="550"></center> <br> 

`UIViewController`가 아이템들을 화면에 표시하는 가장 간단한 것에서는 조금 복잡해보입니다. 

이러한 불필요한 복잡성을 고치는 방법은 kanji 목록을 `KanjiListViewController`로 전달하는 것입니다. 하지만 누가 이것을 전달 해야 하나요? 

`UINavigationController`의 하위 클레스를 만들고 그것의 하위 클레스로 데이터를 주입합니다. 하지만 이 코드는 UINavigationController의 하위 클레스에 있나요? `UINavigationController`는 `UIViewController`를 위한 단순한 컨테이너가 되어야 하지 않나요?

다른 문제의 장소는 `KanjiDetailViewController`의 `prepare(for: sender:)` 입니다

```swift
override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
  super.prepare(for: segue, sender: sender)

  guard let listViewController = segue.destination as? KanjiListViewController else {
    return
  }

  listViewController.shouldOpenDetailsOnCellSelection = false
  listViewController.word = sender as? String
}
```

이 코드는 `KanjiDetailViewController`는 다음 `UIViewController`에 대한 것을 안다는것을 의미합니다. 이 경우에는 `KanjiListviewController` 입니다.

`KanjiDetailViewController`를 재사용 해야한다면, 빠르게 감당할수 없게 되어버립니다. 왜냐하면 이 메소드는 큰 switch문 상태로 성장해야 다음으로 push 해야하는 ViewController를 알수 있기 때문입니다. 이것은 logic이 다른 view Controller에 있으면 안되는 이유 이기도 합니다 - 이것은 view Controller 사이에 강력한 연결을 만들고, 더 많은 책임을 지게 만듭니다.

<div id='section-id-129'/>

## Coordinator Pattern

Coordinator pattern은 위의 언급한 모든 문제를 잠재적으로 해결할수 있습니다. 이 패턴은 iOS community의 Soroush Khanlou의 [블로그](http://khanlou.com/2015/10/coordinators-redux/), [presentation at the NSSpain conference.](https://vimeo.com/144116310)에서 소개 되었습니다. 

Coordinator pattern의 아이디어는 분리된 요소를 생성하기 위함 입니다 -`Coordinator`은 application의 flow에 대한 책임이 있습니다. `Coordinator` 애플리케이션의 한 부분을 캡슐화 합니다. `Coordinator`은 부모의 `Coordinator`를 알수 없지만 자신의 `child Coordinator`부터 시작(?)할수 있습니다.

`Coordinator`는 `UIViewController`가 분리, 독립 되어있는 동안 `UIviewController`를 create, present, dismiss를 할수 있습니다. 마찬가지로 `UIViewController`가 `UIView`를 어떻게 관리하는지, `Coordinator`가 `UIViewController`를 어떻게 관리하는지 알수 있습니다.  

<div id='section-id-137'/>

## Coordinator Protocol

코딩할 시간입니다

먼저 `Coordinator` 프로토콜을 생성합니다. 

```swift
protocol Coordinator {
  func start()
}
``` 

믿거나 말거나 이게 전부입니다. `Coordinator`프로토콜은 `start()`함수 한개가 필요합니다.

<center><img src="/img/posts/coordinator-pattern-2.png" width="450" height="550"></center> <br> 

<div id='section-id-153'/>

## Apply the Coordinator Pattern

application의 플로우를 처리하기 위해 `Coordinator`가 필요하기 때문에, 이 `UIViewController`를 생성하기 위해 코드 내에서 이 같은 방법을 제공 해야 합니다. 

```swift
UIViewController(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?)
```

> Note: `Coordinator` pattern은 .`xib`사용하는것이 필수 사항이 아닙니다. code로 `UIViewController`를 생성할수 있고 이들은 storyboard에서 초기화할수 있습니다.(이것은 Coordinator tutorial의 끝에서 볼수 있습니다)

이 [.xib](https://koenig-media.raywenderlich.com/uploads/2017/11/KanjiList-xibs.zip)을 드레그엔 드랍 하여서 프로젝트 네비게이터에 추가합니다. Assistant editor 에서 `KanjidetailViewController.xib`와 `KanjiDetailViewController.swift`를 열고 모든 outlet이 적절하게 연결되어 있는지 확인합니다. 

> Note: 파일 인스펙터에서 두개의 **.xib** 파일이 target으로 추가되었는지 확인하세요. 

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/01/Screen-Shot-2018-01-21-at-15.58.03.png" width="550" height="850"></center> <br> 


`Main.stroyboard`를 에플리케이션의 시작 지점으로서 교체 해야합니다.

`Main.storyboard`를 우 클릭하고 `Delete`를 선택합니다

`File navigator`에 `KanjiList`를 클릭하고 `KanjiList target > General`을 클릭하고 `Main inerface`의 `Main` 을 삭제 합니다. 

<center><img src="https://koenig-media.raywenderlich.com/uploads/2017/11/Screen-Shot-2017-11-18-at-9.23.41-PM.png" width="650" height="950"></center> <br> 


이제 자신만의 시작 지점을 생성 해야합니다


<div id='section-id-182'/>

## Application Coordinator 

application coordinator 을 생성할 시간입니다. `ApplicationCoordinator.swfit`파일을 생성하고 다음 코드를 추가합니다

```swift
import UIKit

class ApplicationCoordinator: Coordinator {
  let kanjiStorage: KanjiStorage //  1
  let window: UIWindow  // 2
  let rootViewController: UINavigationController  // 3
  
  init(window: UIWindow) { //4
    self.window = window
    kanjiStorage = KanjiStorage()
    rootViewController = UINavigationController()
    rootViewController.navigationBar.prefersLargeTitles = true
    
    // Code below is for testing purposes   // 5
    let emptyViewController = UIViewController()
    emptyViewController.view.backgroundColor = .cyan
    rootViewController.pushViewController(emptyViewController, animated: false)
  }
  
  func start() {  // 6
    window.rootViewController = rootViewController
    window.makeKeyAndVisible()
  }
}
```

코드를 자세히 살펴 봅니다. 

1. `ApplicationCoordinator`은 JSON 데이터가 있는 `kanjiStorage`를 가질 것입니다. `kanjiStorage`는 공유된 인스턴스로 사용되지만 의존성을 주입 하여 사용할것입니다. 
2. `ApplicationCoordinator`은 app의 이것의 초기화에서 `ApplicationCoordinator`로 전달된 window를 자체 표시 설정 합니다
3. `rootViewController`는 `UINavigationController`입니다. 
4. 속성들을 초기화 합니다 
5. present 하기 위한 child Coordinator가 없기 때문에, 이 코드는 올바르게 presentation이 설정되었는지 테스트 할수 있습니다. 
6. `start()`는 시작하는 장소입니다. 특히, window는 이것의 `rootViewController`와 함께 presented 됩니다.

이제 해야하는 모든것은 `ApplicationCoordinator`을 생성하기 위해 `start()`를 호출 하는것 입니다.

```swift
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  private var applicationCoordinator: ApplicationCoordinator?  // 1
  
  func application(_ application: UIApplication,
                   didFinishLaunchingWithOptions launchOptions:
                     [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    
    let window = UIWindow(frame: UIScreen.main.bounds)
    let applicationCoordinator = ApplicationCoordinator(window: window) // 2
    
    self.window = window
    self.applicationCoordinator = applicationCoordinator
    
    applicationCoordinator.start()  // 3
    return true
  }
}
```

1. `applicationCoordinator`로 참조를 유지합니다
2. 단지 생성한 window 와함께 `applicationCoordinator`를 초기화 합니다
3. `applicationCoordinato`의 main presentation을 시작합니다

앱을 빌드하고 실행합니다. 그러면 다음과같은 화면을 볼수 있습니다.

<center><img src="/img/posts/coordinator-pattern-3.png" width="450" height="550"></center> <br> 


<div id='section-id-233'/>

## Kanji List Coordinator

이제 `KanjiListViewController`를 present 할 시간 입니다. 이제 다른 `Coordinator`을 만들 것입니다. 이 `Coordinator`의 메인 작업은 Kanji 목록을 present 하고 나중에 `KanjiDetailViewController`을 화면에 표시하기 위한 책임을 다른 `Coordinator`가 시작 하는것 입니다. 

이전과 비슷하게 `AllKanjiListCoordinator.swift`를 생성 하고 다음 코드를 추가합니다.

```swift
import UIKit

class AllKanjiListCoordinator: Coordinator {
  private let presenter: UINavigationController  // 1
  private let allKanjiList: [Kanji]  // 2
  private var kanjiListViewController: KanjiListViewController? // 3
  private let kanjiStorage: KanjiStorage // 4

  init(presenter: UINavigationController, kanjiStorage: KanjiStorage) {
    self.presenter = presenter
    self.kanjiStorage = kanjiStorage
    allKanjiList = kanjiStorage.allKanji()  // 5
  }

  func start() {
    let kanjiListViewController = KanjiListViewController(nibName: nil, bundle: nil) // 6
    kanjiListViewController.title = "Kanji list"
    kanjiListViewController.kanjiList = allKanjiList
    presenter.pushViewController(kanjiListViewController, animated: true)  // 7

    self.kanjiListViewController = kanjiListViewController
  }
}
```

각 주석들을 번호별로 설명합니다.

1. `AllKanjiListCoordinator`의 presenter는 `UINavigationController` 입니다.
2. 모든 kanji 목록을 present 하기 때문에 목록에 접근하기 위한 속성이 필요합니다. 
3. preseting 하려는 `KanjiListViewController`로 참조를 유지합니다.
4. `AllKanjiListCoordinator`의 초기화로 전달되어진 `KanjiStorage`를 저장하기 위한 속성
5. 속성을 초기화합니다 
6. present 하려는 `UIViewController`를 생성합니다
7. 새롭게 생성된 `UIViewController`를 presenter로 push 합니다

이제 `AllKanjiListCoordinator`을 생성하고 시작 해야합니다. 이것을 하기 위해 `ApplicationCoordinator.swift`를 열고 파일의 상단에 이 속성을 `rootViewController` 선언 바로 아래에 추가합니다

```swift
let allKanjiListCoordinator: AllKanjiListCoordinator
```

이제 `init(window:)`에서 `// Code below is for testing purposes // 5`아래를 다음과 같이 변경합니다. 

```swift
allKanjiListCoordinator = AllKanjiListCoordinator(presenter: rootViewController,
                                                  kanjiStorage: kanjiStorage)
```

마지막으로 `start()`의 아래의 코드에

```swift
window.rootViewController = rootViewController
```

다음과 코드를 추가합니다 

```swift
allKanjiListCoordinator.start()
```

앱을 빌드하고 실행합니다. 이제 리펙토링 이전과 같아 보입니다!

<center><img src="/img/posts/coordinator-pattern-4.png" width="450" height="550"></center> <br> 

하지만 kanji를 선택하면 앱에 크러시가 발생할것입니다. `KanjiListViewController`에서 셀이 선택 되었을때 segue가 실행되어지지만 segue는 더이상 존재 하지 않기 때문입니다. 

이것을 고쳐야합니다. cell이 선택되었을때 직접적으로 행동하는 대신에 delegate callback을 시작할수 있습니다. 이것은 action logic을 `UIviewController`에서 지웁니다

`KanjiListViewController.swift`를 열고 클레스 선언 위에 다음을 추가합니다

```swift
protocol KanjiListViewControllerDelegate: class {
  func kanjiListViewControllerDidSelectKanji(_ selectedKanji: Kanji)
}
```

이제 `KanjiListViewController`에서 새로운 속성을 추가합니다

```swift
weak var delegate: KanjiListViewControllerDelegate?
```

마지막으로, `tableView(_:didSelectRowAt:)`를 다음의 코드로 교체합니다

```swift
func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
  let kanji = kanjiList[indexPath.row]
  delegate?.kanjiListViewControllerDidSelectKanji(kanji)
  tableView.deselectRow(at: indexPath, animated: true)
}
```

좋습니다. 이제 `KanjiListViewController`를 단순하게 만들었습니다. 이제 이것은 kanji 목록을 화면에 표시하기 위한 단일 책임을 가지고 누군가 아이템을 선택했을때 delegate를 통지합니다. 아직 아무도 이것을 듣지 않습니다. 

`AllKanjiListCoordinator.swfit`를 열고 파일의 끝에 다음코드를 추가합니다

```swift
// MARK: - KanjiListViewControllerDelegate
extension AllKanjiListCoordinator: KanjiListViewControllerDelegate {
  func kanjiListViewControllerDidSelectKanji(_ selectedKanji: Kanji) {

  }
}
```

이것은 `AllKanjiListCoordinator`를 설정합니다 그래서 `KanjiListViewControllerDelegate`를 체택합니다. 나중에 `DetailCoordinator`에서 `start()`를 호출하는 `KnajiListViewControllerDidSelectKanji(_:)`내에 코드를 추가할것입니다. 

마지막으로 `start()`내에 다음 코드를 추가합니다. `kanjiListViewController`가 인스턴스된 직후 바로 아래에 다음 코드를 추가합니다.

```swift
kanjiListViewController.delegate = self
```

앱을 빌드하고 실행합니다. 하지만 `kanjiListViewControllerDidSelectKanji` 내의 코드는 여전히 비어있습니다. 그래서 cell을 선택했을때 아무일도 발생하지 않습니다. 걱정 마세요. 이 코드를 조만간 추가할것입니다.

<div id='section-id-355'/>

## When to Create a Coordinator?

이 시점에서 언제 분리된 coordinator를 생성해야할지 궁금할수 있습니다. 이 질문에 대한 명확한 정답은 없습니다. Coordinator은 다른 장소에서 presented 되어지는 application의 일부분에 대해서 유용합니다. 

kanji detail을 화면에 표시하기 위해서 `AllKanjiListCoordinator`내에 새로운 kanji detail `UIViewController`를 생성 해야 합니다. 그리고 delegate 콜백이 호출되었을때 push 해야 합니다. 자신에게 하는 좋은 질문은 "`AllKanjiListCoordinator`은 디테일과 관련된 `UIViewController`에 대해서 알아야 하나요?" 이름이 암시하는것처럼 아닙니다. 또한 디테일에 대한 분리된 `Coordinator`를 생성하는것으로 앱의 추가적인 의존성 없이 kanji에 대한 디테일을 화면에 표시할수 있는 컴포넌트 의존성과 함께 할수 있습니다. 이것은 강력합니다.

언젠가 Spotlight search는 통합할수 있다고 가정합니다. 세부 정보를 분리된 `Coordinator`로 넣는다면 그것은 간단해집니다: 새로운 DetailCoordinator를 생성하고 `start()`를 호출 하면 됩니다. 

핵심으로 가져가야 하는것은 Coordinator은 의존성 요소, 함께 만드는 앱에 도움이 된다는 것입니다. 

<div id='section-id-365'/>

## Kanji Detail Coordinator

이제 `KanjiDetailCoordinator`를 생성해봅니다.

이전과 비슷하게 `KanjiDetailCoordinator.swift`를 생성합니다. 그리고 아래의 코드를 추가합니다.

```swift
import UIKit

class KanjiDetailCoordinator: Coordinator {
  private let presenter: UINavigationController  // 1
  private var kanjiDetailViewController: KanjiDetailViewController? // 2
  private var wordKanjiListViewController: KanjiListViewController? // 3
  private let kanjiStorage: KanjiStorage  // 4
  private let kanji: Kanji  // 5

  init(presenter: UINavigationController, // 6
       kanji: Kanji,
       kanjiStorage: KanjiStorage) {

    self.kanji = kanji
    self.presenter = presenter
    self.kanjiStorage = kanjiStorage
  }

  func start() {
    let kanjiDetailViewController = KanjiDetailViewController(nibName: nil, bundle: nil) // 7
    kanjiDetailViewController.title = "Kanji details"
    kanjiDetailViewController.selectedKanji = kanji    

    presenter.pushViewController(kanjiDetailViewController, animated: true) // 8
    self.kanjiDetailViewController = kanjiDetailViewController  
  }
}
```

여기에 많은것들이 있습니다. 이것을 하나하나 설명하면

1. `KanjiDetailCoordinator`의 presenter는 `UINavigationController` 입니다. 
2. `start()`에서 preseting 하는 `KanjiDetailViewController`를 참조 합니다. 
3. 유저가 단어를 선택했을때 present 하는 `KanjiListViewController`를 참조합니다. 
4. `KanjiDetailViewController`의 초기화로 전달된 `KanjiStorage`를 저장하기 위한 속성입니다. 
5. 선택된 kanji를 저장하기 위한 속성입니다. 
6. 초기화하는 속성
7. present하길 원하는 `UIViewController`를 생성합니다
8. 생성된 `UIViewController`를 present 합니다. 

이제 `KanjiDetailCoordinator`를 생성합니다 `AllKanjiListCoordinator.swift`를 열고 `kanjiStorage`선언 아래에 새로운 속성을 추가합니다.

```swift
private var kanjiDetailCoordinator: KanjiDetailCoordinator?
```

다음으로 `extension`의 `kanjiListViewControllerDidSelectKanji(_:)`를 다음과 같이 변경합니다. 

```swift
let kanjiDetailCoordinator = KanjiDetailCoordinator(presenter: presenter, 
                                                    kanji: selectedKanji, 
                                                    kanjiStorage: kanjiStorage)
kanjiDetailCoordinator.start()

self.kanjiDetailCoordinator = kanjiDetailCoordinator
```

유저가 kanji를 선택했을때 `KanjiDetailCoordinator`를 시작하고 생성합니다.

앱을 빌드하고 실행합니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/01/Screen-Shot-2018-01-21-at-18.50.37.png" width="450" height="550"></center> <br> 

보다시피 유저가 `KanjiListViewController`의 셀을 선택했을때`KanjiDetailViewController`가 정확하게 presented 됩니다. 하지만 `KanjiDetailViewController`의 목록에서 단어를 선택하면 앱이 crush를 유발합니다. 이유는 더이상 존재하지 않는 segue를 트리깅하기 때문입니다.

이것을 고칠 시간입니다.

`KanjiDetailViewController.swift`를 열고 `KanjiListViewController`와 함께 클레스 선언 위에 delegate를 추가합ㄴ디ㅏ.

```swift
protocol KanjiDetailViewControllerDelegate: class {
  func kanjiDetailViewControllerDidSelectWord(_ word: String)
}
```

그후 `KanjiDetailViewController`내에 다음 코드를 추가합니다.

```swift
weak var delegate: KanjiDetailViewControllerDelegate?
```

delegate를 트리깅하려면 `tableView(_:didSelectRowAt:)`을 다음과 같이 변경합니다.

```swift
func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
  defer {
    tableView.deselectRow(at: indexPath, animated: true)
  }

  guard indexPath.section == 1,
    let word = selectedKanji?.examples[indexPath.row].word else {
      return
  }
  delegate?.kanjiDetailViewControllerDidSelectWord(word)
}
```

좋습니다. 이제 앱은 cell을 선택했을때 더이상 크러시를 발생하지 않지만 여전히 목록을 열진 못합니다. 
 
이것을 고치기 위해 `KanjiDetailCoordinator.swift`를 열고 `KanjiDetailCoordinator`의 밖의 파일 하단에 다음 코드를 추가합니다

```swift
// MARK: - KanjiDetailViewControllerDelegate
extension KanjiDetailCoordinator: KanjiDetailViewControllerDelegate {
  func kanjiDetailViewControllerDidSelectWord(_ word: String) {
    let wordKanjiListViewController = KanjiListViewController(nibName: nil, bundle: nil)
    let kanjiForWord = kanjiStorage.kanjiForWord(word)
    wordKanjiListViewController.kanjiList = kanjiForWord
    wordKanjiListViewController.title = word

    presenter.pushViewController(wordKanjiListViewController, animated: true)
  }
}
```

`start()`내에 `KanjiDetailViewController`가 인스턴스화된 아래에 다음 코드를 추가합니다.

```swift
kanjiDetailViewController.delegate = self
```

프로젝트를 빌드하고 실행합니다. 앱은 이전에 리펙토링 했던것과 같은 방법으로 동작합니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/01/Screen-Shot-2018-01-21-at-18.51.51.png" width="450" height="550"></center> <br> 


<div id='section-id-499'/>

## Project Clean Up

<div id='section-id-501'/>

## Extras: Coordinator Pattern with Storyboards

<div id='section-id-503'/>

## Where To Go From Here?

추가적으로 Coordinator pattern에 대해서 더 알고 싶다면 아래의 비디오를 확인해봅니다.

[Coordinators presentation at NSSpain by Soroush Khanlou](https://vimeo.com/144116310)<br>
[Boundaries in Practice by Ayaka Nonaka at try! Swift](https://academy.realm.io/posts/tryswift-ayaka-nonaka-boundaries-in-practice/)<br>
[MVVM with Coordinators & RxSwift – Łukasz Mróz](https://www.youtube.com/watch?v=VzbllBC5eec)<br>

[video series on iOS design patterns](https://www.raywenderlich.com/3816-ios-design-patterns/lessons/1)<br>











