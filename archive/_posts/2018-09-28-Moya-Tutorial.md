---
layout:     post
title:      "Swift, Moya가 무엇인지, 어떻게 사용하는지 알아봅니다"
subtitle:   "Moya Tutorial for iOS getting Started"
date:       2018-09-28 15:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich, Moya]
categories: archive
permalink: /archive/:title
---

[Moya Tutorial for iOS: Getting Started](https://www.raywenderlich.com/5121-moya-tutorial-for-ios-getting-started)의 내용을 의역했습니다.

---

## Table of Contents 

  - [Getting Started](#section-id-40)
  - [Moya: What Is It?](#section-id-61)
    - [What Is Moya?](#section-id-64)
    - [How Is Moya Related To Alamofire?](#section-id-72)
    - [Moya's Building Blocks](#section-id-82)
  - [Marvel API – The API of Heroes](#section-id-98)
  - [Creating Your First Moya Target](#section-id-110)
  - [Authorizing Requests in Marvel’s API](#section-id-195)
  - [Using Your Target](#section-id-235)
  - [Imgur – Sharing With Friends!](#section-id-388)
  - [Creating the Imgur Target](#section-id-404)
    - [Wrapping Up CardViewController](#section-id-504)
  - [Taking Moya to the Next Level](#section-id-611)
  - [Where to Go From Here?](#section-id-623)

---


Moya는 일반적으로 열거형을 사용하여 타입이 안전한 방식으로 네트워크 요청을 캡슐화한 네트워크 계층에서 작업할때 자신감을 제공한다는 개념에서 영감을 얻은 네트워킹 라이브러리입니다. Moya와 네트워킹 슈퍼 히어로가 되십시오!

> Note: 이 튜토리얼은 Xcode 10, Swift 4.2를 사용합니다. 의존하는 라이브러리는 아직 Swift 4.2용으로 업데이트 되지 않았지만, 문제 없이 사용할수 있습니다. Swift 4.2변환이 가능하다는 단일 경고를 무시해야합니다. 

아름답고 효과적인 iOS앱을 만드는것에는 관련된 많은 부분들이 있습니다. 여러 조각중 가장 중요한 부분은, `대부분(most)` 현대적인 앱에서는 중요하지 않더라도 `네트워킹 부분` 입니다. iOS 개발자는 `URLSession`, 혹은 타사 라이브러리를 사용하여 다양한 방법으로 네트워킹 레이어를 구성할것입니다. 

이 튜토리얼에서, 네트워킹 서비스와 네트워킹 요청을 타입 안전(type-safe)하게 구성하고 생성하는데 초점이 맞추어진 [Moya](https://github.com/Moya/Moya)라고 불리우는 네트워킹 라이브러리에 대해서 배울것입니다. 

아마 궁금해 할것입니다. "Moya가 뭐야?, 나는 이미 Alamofire를 알고, 사랑해!" 라거나 혹은 Alamofire를 모른다면, [이 튜토리얼](https://www.raywenderlich.com/35-alamofire-tutorial-getting-started)을 확인하는 좋은 시간이 될것입니다.

이것이 가장 중요한 부분입니다: Moya는 실제로 Alamofire를 사용하면서 네트워크 계층을 구조화하는 다른 접근방법을 제공합니다. 이 튜토리얼의 뒷부분에서 Moya와 Alamofire의 관계에 대해 더 많이 배우게 됩니다. 

이 튜토리얼에서, [Marvel API](https://developer.marvel.com/)를 사용하여 표지 이미지, 기타 흥미로운 정보와 함께 특정 주(week)에 출시된 만화 목록을 사용자에게 표시하는 `ComicCards`라는 이름의 작은 앱을 만들것입니다. 사용자가 만화를 선택하면 해당 만화 정보와 이미지가 포함된 공유 카드 이미지가 생성되어 사용자가 [Imgur](https://apidocs.imgur.com/) 서비스로 업로드하고 공유 할수 있게 됩니다.

<center><img src="/img/posts/Moya-Tutorial-0.gif" width="300" height="500"></center> <br>


하.. 하나의 앱에 두개의 다른 서비스...? 걱정하지 마세요. 들리는것 처럼 어렵지 않습니다. 그럼 시작해봅시다!

> Note: 이 튜토리얼은 HTTP API 작동 방식의 기본적인 지식을 가지고 있다고 추정하지만, 최소한의 지식으로도 이 튜토리얼을 쉽게 따라 할수 있습니다. 하지만 HTTP API에 대해 더 알고 싶다면 앞에서 언급한 [Alamofire tutorial](https://www.raywenderlich.com/35-alamofire-tutorial-getting-started)을 참조하거나 이 흥미로운 사이트에서 [REST API](https://www.restapitutorial.com/lessons/whatisrest.html) 기본 사항에 대한 자세한 정보를 참조하세요. 

---

<div id='section-id-40'/>

## Getting Started 

[여기](https://koenig-media.raywenderlich.com/uploads/2018/07/ComicCards.zip)에서 `ComicCards`의 시작 프로젝트를 다운받습니다. 이미 Moya가 프로젝트에 내장되어 있습니다. `ComicCards.xcworkspace`를 엽니다.(project 파일이 아닙니다.)

프로젝트를 열고 `Main.stroyboard`로 가서 앱의 일반적인 구조의 화면을 확인합니다. 

![](/img/posts/Moya-Tutorial-1.png)

`ComicCards`앱은 두개의 다른 화면으로 구성되어 있습니다.

- `ComicsViewController`: 유저에게 만화 목록을 보여주기 위한 뷰 컨트롤러 입니다. 
- `CardViewController`: 선택한 만화에 대한 카드를 만들고 사용자가 생성된 카드를 공유 하도록 하는 뷰 컨트롤러 입니다.

프로젝트를 빌드하고 실행하면 다음과같은 화면을 볼수 있습니다.

<center><img src="/img/posts/Moya-Tutorial-2.png" width="400" height="500"></center> <br>

서버에서 만화를 가져오고 앱의 화면에 표시하는 것과 관계된 로직을 아직 구현하지 않았기 때문에, 오류 화면이 보여지는것이 놀랍지 않습니다. 곧 필요한 모든 코드를 추가하게 될것입니다. 하지만 먼저 Moya에 대해 조금 배워야 합니다.

---

<div id='section-id-61'/>

## Moya: What Is It?


<div id='section-id-64'/>

### What Is Moya?

<center><img src="/img/posts/Moya-Tutorial-3.png" width="300" height="400"></center> <br>


Moya는 일반적으로 열거형(예: `enum`)을 사용하여 네트워크 요청을 타입 안전(type-safe)한 방식으로 캡슐화하는데 초점을 맞춤 네트워킹 라이브러리로 네트워크 계층에서 작업할때 추가된 검색 가능성과 함께(with added discoverability)컴파일 시간 보장(compile-time guarantees)과 자신감을 제공 합니다.

Artsy's [Eidolon](https://github.com/artsy/eidolon) app을 위해 [Ash Furrow](https://twitter.com/ashfurrow), [Orta Therox](https://twitter.com/orta)가 제작하여 인기를 얻었습니다. 요즘엔, [오픈소스 커뮤니티](https://github.com/Moya/Moya/graphs/contributors)에서 전적으로 관리합니다.  

<div id='section-id-72'/>

### How Is Moya Related To Alamofire?

이 튜토리얼의 소개에서 언급한 것처럼, Moya와 Alamofire는 Moya가 실제로 자체적으로 네트워킹을 수행하지 않는다는 사실과 밀접한 관련이 있습니다. Moya는 전투 테스트를 거친 Alamofire의 네트워킹 기능을 사용하고 Alamofire를 추상화 하기 위한 추가적인 능력(abilities), 타입(types), 개념(concepts)를 제공합니다. 

실질적으로 이야기하면, Alamofire를 기반으로하고 있는 Moya로Alamofire를 사용 하는것입니다.(Alamofire를 직접적으로 사용하는 대신에)

시작 프로젝트의 `Podfile.lock`을 보면 비밀을 알수 있습니다. Alamoifire는 Moya의 의존성 입니다. 

<center><img src="/img/posts/Moya-Tutorial-4.png" width="600" height="400"></center> <br>

<div id='section-id-82'/>

### Moya's Building Blocks 

Moya는 코드를 작성하기 전에 알아 두어야 할 구축 블럭과, 몇가지 고유한 개념을 소개합니다. Moya는 다음과 같은 구성 요소를 사용하여 전체 네트워킹 체인을 설명할수 있습니다.

![](/img/posts/Moya-Tutorial-5.png)

> Moya's Building Blocks

- `Provider`: Moya의 MoyaProvider는 모든 네트워크 서비스와 상호작용할때 만들고 사용할 주요한 객체입니다. 초기화할때 Moya Target을 가지는 일반적인 객체입니다.
- `Target`: Moya target은 일반적으로 전체 API 서비스를 설명합니다. 이 경우에는, Marvel target과 Imgur target이 있습니다. 그들 각 타겟은 서비스, 그 자체의 가능한 끝점, 요청을 이행하는 각 끝점에 요구되는 정보를 설명합니다. `TargetType` 프로토콜을 체택하는 것으로 target을 정의합니다.
- `Endpoint`:  Moya는 네트워크 요청을 이행하는 요구된 정보의 기본조각을 설명하는 반 내부(semi-internal) `끝점(Endpoint)` 객체를 사용합니다(예를들어 HTTP method, request body, header 등) `MoyaProvider`는 모든 target들을 `끝점(Endpoint)`으로 변형(transforms)하고, 결국에는 원시 `URLRequest`로 변형되어 집니다. Endpoints는 높은 수준의 사용자화가 가능하지만, 사용자 정의 맵핑이 필요하지 않으므로 이 튜토리얼의 범위를 벗어납니다.

이제, 기본 이론을 모두 갖추었으니 코드를 작성해야 할 때입니다. 

---

<div id='section-id-98'/>

## Marvel API – The API of Heroes

[Marvel API](https://developer.marvel.com/)는 마블이 생성하고 유지하는 세상에서 가장큰 만화 API 입니다.

[계정을 만드는것](https://www.marvel.com/register)으로 시작합니다. 모든것이 준비됬다면 [나의 개발자 계정 페이지](https://developer.marvel.com/account)로 돌아가면 공개키, 비공개키를 볼수 있는 페이지를 찾을수 있습니다.

![](/img/posts/Moya-Tutorial-6.jpg)

몇분안에 위의 두 키를 사용할 것입니다.

---

<div id='section-id-110'/>

## Creating Your First Moya Target

`ComicCards` Xcode 프로젝트로 돌아갑니다. 프로젝트 탐색기에서 `ComicCards/network` 폴더에서 `Marvel.swift` 파일을 생성합니다. 

![](/img/posts/Moya-Tutorial-7.png)

`import Foundation`이후에 다음 코드를 추가합니다.

```swift
import Moya

public enum Marvel {
  // 1
  static private let publicKey = "YOUR PUBLIC KEY"
  static private let privateKey = "YOUR PRIVATE KEY"

  // 2
  case comics
}
```

곳 사용하려는 API서비스를 설명하는 매우 간단한 열거형을 만들었습니다. 

1. 이것들은 Marvel의 공개키와 개인키 입니다. 키를 서비스의 정의와 함께 저장하여 서비스 구성의 한 부분으로 키로 쉽게 접근 가능하게 있도록 합니다. 이전 단계에서 생성된 실제 키로 placeholder를 변경합니다.
2. `comics`라는 단일 열거형 사례는 Marvel의 API인 [<U>GET /v1/public/comics</U>](https://developer.marvel.com/docs#!/public/getComicsCollection_get_6)로 표현할 끝점입니다.

이제 기본 열거형을 구성했으므로 `TargetType`을 준수하여 실제로 대상(target)을 설정해야합니다. 

파일끝에 닫는 중괄호 뒤에 다음 코드를 추가합니다.

```swift
extension Marvel: TargetType {
  // 1
  public var baseURL: URL {
    return URL(string: "https://gateway.marvel.com/v1/public")!
  }

  // 2
  public var path: String {
    switch self {
    case .comics: return "/comics"
    }
  }

  // 3
  public var method: Moya.Method {
    switch self {
    case .comics: return .get
    }
  }

  // 4
  public var sampleData: Data {
    return Data()
  }

  // 5
  public var task: Task {
    return .requestPlain // TODO
  }

  // 6
  public var headers: [String: String]? {
    return ["Content-Type": "application/json"]
  }

  // 7
  public var validationType: ValidationType {
    return .successCodes
  }
}
```

많은 코드처럼 보일지도 모르지만, 단순하게 `TargetType`을 준수하는 것뿐입니다. 

1. 모든 target(서비스)는 base URL이 필요합니다. Moya는 이것을 결국에는 올바른 끝점(Endpoint)객체를 생성하는데 사용합니다
2. 타겟의 모든 경우(case)에 대해, 도달하길 원하는 정확한 경로를 정의해야 합니다. 만화(comis)의 API가 [<U>https://gateway.marvel.com/v1/public/comics</U>](https://gateway.marvel.com/v1/public/comics)에 있기 때문에 값은 단순히 `/comics` 입니다
3. 타겟의 모든 경우(case)를 위한 정확한 HTTP 매소드를 제공해야합니다. 여기는 `.get`이 당신이 뭔하는 것입니다.
4. `task`는 아마 가장 중요한 속성입니다. 사용할 모든 끝점마다 Task 열거형 케이스를 반환해야합니다. 기본요청(plain request), 데이터 요청(data request), 파라미터 요청(parameter request), 업로드 요청(upload request) 등 사용할수 있는 task들을 위한 여러가지 많은 옵션이 존재합니다. 이것은 다음 색션에서 다루고 현재는 `to do`로 표시되어 있습니다.
5. `sampleData`는 테스트하는 동안 API 버전의 가짜객체(mocked/stubbed)를 제공하는데 사용되어 집니다. 이 경우에는 단 한 두개 만화의 가짜 객체를 보내고 싶을 수도 있습니다. 단위 테스트를 작성할때, Moya는 네트워크에 연결하는 대신 이 `가짜(fake)`응답을 사용자에게 회신할수 있습니다. 이 튜토리얼 에서는 단위 테스트를 수행하지 않으므로 빈 Data 객체를 반환합니다.
6. `headers`는 모든 타겟의 끝점을 위한 적절한 HTTP header를 반환하는 장소입니다. 모든 Marvel API 끝점은 JSON 응답을 반환하기 때문에 안전하게 `Content-Type: application/json` header을 모든 끝점에 사용할수 있습니다.
7. `validationType`은 성공적인 API요청의 정의를 제공하는데 사용됩니다. 많은 옵션이 사용가능하며, 경우에 따라서 `.successCodes`를 사용하면 HTTP code가 200에서 299사이인 경우 요청이 성공한 것으로 간주됩니다.

---

<div id='section-id-195'/>

## Authorizing Requests in Marvel’s API

Marvel API는 고유 식별자(예: 타임스탬프)에서 hash를 생성 하는 사용자화된 인증 구성(authorization scheme)을 사용하고, 개인키와 공개키 모두 [MD5](https://en.wikipedia.org/wiki/MD5)를 사용하여 함께 연결되고 해쉬됩니다. [Server-Side Application을 위한 인증(Authentication)](https://developer.marvel.com/documentation/authorization) 기반의 API 참조에서 전체 사양을 읽을수 있습니다.

`Marvel.swift`에서 다음 코드와 `task`를 교체합니다. 

```swift
public var task: Task {
  let ts = "\(Date().timeIntervalSince1970)"
  // 1
  let hash = (ts + Marvel.privateKey + Marvel.publicKey).md5
  
  // 2
  let authParams = ["apikey": Marvel.publicKey, "ts": ts, "hash": hash]
  
  switch self {
  case .comics:
    // 3
    return .requestParameters(
      parameters: [
        "format": "comic",
        "formatType": "comic",
        "orderBy": "-onsaleDate",
        "dateDescriptor": "lastWeek",
        "limit": 50] + authParams,
      encoding: URLEncoding.default)
  }
}
```

task가 준비가 되었습니다. 이것들이 하는일은 다음과같습니다.

1. 임의의 타임 스탬프, 개인키 및 공개키를 연결하고 전체 문제열을 MD5로 해싱하여 앞에서 설명한 것처럼 필요한 해시를 만듭니다. `Helpers/String+MD5.swift`에서 찾을수 있는 도우미 속성인 `md5` 사용 합니다.
2. `authParams` 사전은 요구된 인증 파라미터: `apikey`, `ts`, `hash`를 포함합니다. 각각은 공개키, 타임 스탬프, 해시를 포함합니다. 
3. 이전에 사용했던 `.requestPlain` task 대신, 매개변수가 있는 HTTP요청을 처리하는`.requestParameters` task 타입을 사용하도록 전환합니다. 최신 `onsaleDate`로 정렬되고, 주어진 주(week)에서 최대 50개 만화를 원한다는것을 나타내는 몇개의 매개변수 테스크를 제공합니다. 이전에 작성한 authParams를 parameters 사전에 추가합니다. 그리고 나머지 요청 매개변수와 함께 전송합니다. 

이 시점에서 새로운 마블 타겟이 준비되었습니다. 다음으로 방금 만든것을 사용하여 `ComicViewController`를 업데이트 할것입니다.

---

<div id='section-id-235'/>

## Using Your Target 

`ComicsViewcontroller.swift`로 가고 뷰 컨트롤러의 시작에 다음 코드를 추가합니다.

```swift
let provider = MoyaProvider<Marvel>()
```

앞에서 언급했듯이 Moya target과 상호작용하는데 사용하는 주요한 클레스는 `MoyaProvider` 이므로, 새로운 Marvel Target을 사용하는 `MoyaProvider` 인스턴스를 만들어야 합니다. 

그런 다음 `viewDidLoad()` 내부에서 다음 코드를 

```swift
state = .error
```

다음으로 대체 합니다

```swift
// 1
state = .loading

// 2
provider.request(.comics) { [weak self] result in
  guard let self = self else { return }

  // 3
  switch result {
  case .success(let response):
    do {
      // 4
      print(try response.mapJSON())
    } catch {
      self.state = .error
    }
  case .failure:
    // 5
    self.state = .error
  }
}
```

새로운 코드는 다음과같이 작동합니다

1. 첫째, view의 상태를 `.loading`으로 설정합니다. 
2. provider를 사용하여 `.comics` 끝점 요청을 수행합니다.`.comics`는 열거형(`enum`) case 이므로 전적으로 타입 안전 합니다. 따라서 잘못된 옵션을 입력한 염려는 없습니다. target의 모든 끝점에 대해 자동 완료 사례(auto-completed cases for every endpoint of your target)를 얻는 이득도 함께 얻습니다. 
3. 클로져의 결과(`result`)는 `.success(Moya.Response)`, `.failure(Error)`중 하나일수 있습니다.
4. 요청이 성공하면 Moya의 mapJSON 메소드를 사용하여 성공한 응답을 제이슨 객체에 맵핑하고 콘솔에 출력합니다.
5. 반환된 결과가 `.failure`인 경우 뷰의 상태도 .error로 설정됩니다.

앱을 빌드하고 실행합니다. 디버깅 콘솔에서 다음과 비슷한 메시지들을 볼수 있어야 합니다.

```
{
    attributionHTML = "<a href=\"http://marvel.com\">Data provided by Marvel. \U00a9 2018 MARVEL</a>";
    attributionText = "Data provided by Marvel. \U00a9 2018 MARVEL";
    code = 200;
    copyright = "\U00a9 2018 MARVEL";
    data =     {
        count = 19;
        limit = 50;
        offset = 0;
        results =         (
            {comic object},
            {comic object},
            {comic object},
            ...
        )
}
```

놀랍습니다. Moya와 새로운 `Marvel` target을 사용하여 백앤드에서 유효한 제이슨 객체를 얻었습니다!

> Note: 결과가 디버그 콘솔에 나타나려면 몇초가 걸릴수 있습니다.

![](/img/posts/Moya-Tutorial-8.jpg)

이 뷰 컨트롤러를 완성하는 마지막 단계는 실제로 JSON 응답을 적절한 데이터 모델로 매핑하는 것입니다. - 이 경우에는 미리 구성한 Comic 구조체를 사용합니다.

원시 JSON 대신 `Decodable`로 응답을 매핑할 다른 Moya 응답 맵퍼를 사용할수 있는 완벽한 시간입니다.

JSON 응답 구조가 다음과같이 보일 것입니다.

```
data ->
  results -> 
      [ Array of Comics ]
```

객체 그 자체에 도달하기전에, 두가지 수준의 중첩(data, results)를 의미합니다. 시작 프로젝트에는 이미 디코딩 가능한 객체가 포함되어 있습니다. 

다음 코드를 

```swift
print(try response.mapJSON())
```

다음과 같이 변경합니다.

```swift
self.state = .ready(try response.map(MarvelResponse<Comic>.self).data.results)
```

객체를 원시 JSON 응답에 매핑하는 대신, Comic 구조체와 함께MarvelResponse 제네릭 decodable을 사용하는 맵퍼를 사용합니다. 이렇게하면 두개의 중첩 수준을 구문 분석하여 `data.results`에 접근하여 만화 배열에 접근할수 있습니다. 

뷰의 상태를 `해독할수 있게(decodable)` 매핑을하고 반환된 `Comic` 객체의 배열과 연관된 값과 함께 `.ready`로 설정합니다. 

프로젝트를 빌드하고 실행 합니다. 첫 화면이 완벽하게 작동해야합니다.

<center><img src="/img/posts/Moya-Tutorial-9.png" width="400" height="500"></center> <br>


다음은  세부사항 뷰 입니다.

만화를 탭할때, 시작 프로젝트는 이미 CardViewController를 보여주기 위한 코드와 선택된 만화를 전달하는 코드를 가지고 있습니다. 하지만 만화를 탭하면 단지 만화의 세부사항 이 없는 빈 카드만 보여줍니다. 이것을 다루어 봅니다. 

CarViewController.swift로 전환하고 `layoutCard(comic:)` 매소드를 찾습니다. 메소드 내부에 다음을 추가합니다.

```swift
// 1
lblTitle.text = comic.title
lblDesc.text = comic.description ?? "Not available"

// 2
if comic.characters.items.isEmpty {
  lblChars.text = "No characters"
} else {
  lblChars.text = comic.characters.items
                       .map { $0.name }
                       .joined(separator: ", ")
}

// 3
lblDate.text = dateFormatter.string(from: comic.onsaleDate)

// 4
image.kf.setImage(with: comic.thumbnail.url)
```

이 코드는 `Comic`구조체로 부터 제공된 정보와 함께 화면을 갱신합니다.

1. 만화의 타이틀과 설명을 설정합니다.
2. 만화에 대한 캐릭터 목록을 설정하거나 캐릭터가 없다면 캐릭터 없음으로 설정합니다. 
3. 미리 구성된 DateFormatter를 사용하여 만화의 `on sale` 날짜를 설정합니다
4. [Kingfisher](https://github.com/onevcat/Kingfisher)를 사용하여 만화의 이미지를 로딩합니다-웹 이미지 로딩을 위한 좋은 타사 라이브러리 입니다. 

앱을 빌드하고 실행합니다. 그리고 목록중 하나를 탭합니다. 그러면 다음과같이 아름다운 카드 정보를 볼수 있습니다. 

<center><img src="/img/posts/Moya-Tutorial-10.png" width="400" height="500"></center> <br>


추가할수 있는 두가지 기능이 있습니다: Imgur에 카드를 업로드하고,  사용자가 카드를 삭제할수 있게 합니다.

---

<div id='section-id-388'/>

## Imgur – Sharing With Friends!

여기에서는, 이미지 처리를 위한 두개의 다른 끝점과 상호작용 할 `Imgur`이라는 이름의 다른 모야 target을 생성합니다: 하나는 업로드를 위한것, 다른 하나는 삭제를 위한것입니다.

Marvel API와 비슷하게, [여기](https://imgur.com/register?invokedBy=regularSignIn)에서 계정을 생성해야합니다.

계정을 생성한 후에, [Imgur Application](https://api.imgur.com/oauth2/addclient)을 생성 해야합니다. 콜백을 위한 가짜 URL을 사용할수 있습니다. 왜냐하면 여기서 OAuth를 사용하지 않기 때문입니다. 또한 간단하게 `OAuth 2 authorization without a callback URL`을 선택할수 있습니다.

![](/img/posts/Moya-Tutorial-11.png)

> Registering a new Imgur application

양식을 제출하면 Imgur은 새로운 `Client ID` 와 `Client secret`를 화면에 보여줍니다. 다음단계를 위해 저장합니다.

---

<div id='section-id-404'/>

## Creating the Imgur Target 

`ComicCards/Network` 폴더에서 마우스 오른쪽 단추를 클릭하여 `Imgur.swfit` 파일을 생성합니다.

구현하고 사용할 Imgur 끝점을 정의하는 다음 코드를 추가합니다.

```swift
import UIKit
import Moya

public enum Imgur {
  // 1
  static private let clientId = "YOUR CLIENT ID"

  // 2
  case upload(UIImage)
  case delete(String)
}
```

Marvel API와 비슷합니다. 

1. `clientID`에 Imgur Client ID를 저장합니다. 이전 단계에서 생성한 Client ID로 교체한것을 확인해야합니다.
2. 사용할 두개의 끝점을 정의합니다: `upload`는 이미지를 업로드 할때 사용되었고, 이전에 업로드한 이미지의 해시를 가져와서 Imgur에서 삭제하는 등의 두가지 끝점을 사용합니다. Imgur API는 [<U>POST /image, DELETE /image/{imageDeleteHash}</U>](https://apidocs.imgur.com/#949d6cb0-5e55-45f7-8853-8c44a108399c)로 표시됩니다.

다음으로 `TargetType`를 체택합니다. 다음 코드를 새로운 enum 아래에 추가합니다. 

```swift
extension Imgur: TargetType {
  // 1
  public var baseURL: URL {
    return URL(string: "https://api.imgur.com/3")!
  }

  // 2
  public var path: String {
    switch self {
    case .upload: return "/image"
    case .delete(let deletehash): return "/image/\(deletehash)"
    }
  }

  // 3
  public var method: Moya.Method {
    switch self {
    case .upload: return .post
    case .delete: return .delete
    }
  }

  // 4
  public var sampleData: Data {
    return Data()
  }

  // 5
  public var task: Task {
    switch self {
    case .upload(let image):
      let imageData = image.jpegData(compressionQuality: 1.0)!

      return .uploadMultipart([MultipartFormData(provider: .data(imageData),
                                                 name: "image",
                                                 fileName: "card.jpg",
                                                 mimeType: "image/jpg")])
    case .delete:
      return .requestPlain
    }
  }

  // 6
  public var headers: [String: String]? {
    return [
      "Authorization": "Client-ID \(Imgur.clientId)",
      "Content-Type": "application/json"
    ]
  }

  // 7
  public var validationType: ValidationType {
    return .successCodes
  }
}
```

이제 이것은 친숙하게 보여야 합니다. 새로운 `Imgur` target 속성의 7개 속성을 살펴봅니다.

1. Imgur API를 위한 base URL은 `https://api.imgur.com/3`으로 설정되었습니다
2. case 기반인 적절한 끝점 `path`를 반환합니다. `.upload`에 대한것은 `/image`, `.delete`에 대한것은 `/image/{deletehash}` 입니다.
3. 이 메소드는 case에 따라서 다릅니다. `.upload`는 `.post`, `.delete`는 `.delete` 입니다.
4. 이전과 마찬가지로 sampleData에 대해 빈 Data 구조체를 반환합니다.
5. `task`는 흥미로운 장소입니다. 모든 끝점에 대해 다른 `Task`를 반환합니다. `.delete` case는 어떤 매개변수도 요구하지 않는 간단한 `DELETE` 요청 컨텐츠 이지만 `.upload` case는 더 많은 작업이 필요합니다. 
	- 파일을 업로드 하려면, `MultipartFormData` 구조체 배열을 가지는 `.uploadMultipart` task type를 사용합니다. 그런 다음 적절한 image data, field name, file name, image mime type과 함께 `MutipartFormData`의 인스턴스를 만듭니다. 
6. Marvel API와 같이  `headers` 속성은 `Content-Type: application/json` 해더와 추가적인 해더를 반환합니다. Imgur API는 인가 해더를 사용하므로, `Authorization: Client-ID (YOUR CLIENT ID).`의 양식에서, 모든 요청에 Client ID를 제공하는게 필요합니다. 
7. `.validationType`는 이전과 같습니다-200과 299 사이의 상태 코드를 위한 유효성 입니다. 

`Imgur` target은 완성 되었습니다! `ComicCards`앱에 대한 Moya와 관계된 코드를 마무리합니다. 

![](/img/posts/Moya-Tutorial-12.jpg)

<div id='section-id-504'/>

### Wrapping Up CardViewController

`CardViewController.swift`로 돌아가고 CardViewController class의 시작 에 comic 속성 아래에 다음 코드를 추가합니다. 
 
```swift
private let provider = MoyaProvider<Imgur>()
private var uploadResult: UploadResult?
```

이전과 같이, `MoyaProvider` 인스턴스를 생성하고, `Imgur` target 과 함께할 시간입니다. 또한 `uploadResult`를 정의합니다-업로드 결과를 저장하는데 사용할 옵셔널 `UploadResult` 속성을 정의합니다. 이 속성을 이미지를 삭제할때 필요합니다. 

구현할 두가지 매소드가 있습니다: `uploadCard()`, `deleteCard()`

`uploadCard()` 끝에 다음 코드를 추가합니다. 

```swift
// 1
let card = snapCard()

// 2
provider.request(.upload(card),
  // 3
  callbackQueue: DispatchQueue.main,
  progress: { [weak self] progress in
    // 4
    self?.progressBar.setProgress(Float(progress.progress), animated: true)
  },
  completion: { [weak self] response in
    guard let self = self else { return }
    
    // 5
    UIView.animate(withDuration: 0.15) {
      self.viewUpload.alpha = 0.0
      self.btnShare.alpha = 0.0
    }
    
    // 6
    switch response {
    case .success(let result):
      do {
        let upload = try result.map(ImgurResponse<UploadResult>.self)
        
        self.uploadResult = upload.data
        self.btnDelete.alpha = 1.0
        
        self.presentShare(image: card, url: upload.data.link)
      } catch {
        self.presentError()
      }
    case .failure:
      self.presentError()
    }
})
```

이 코드는 명확한 설명이 필요하지만 걱정하지 않아도 됩니다. 대부분 상대적으로 친숙해야합니다.

1. 스크린에 보여지는 card에서 `snapCard()`라고 부르는 도우미 매소드를 사용하여 `UIImage`를 생성합니다. 
2. Marvel API와 같이, provider를 사용하여 카드 이미지와 관련된 값으로 `upload` 끝점을 호출합니다.
3. `callbackQueue`는 다음 콜백에서 업로드 진행상태 업데이트를 받을 대기열을 제공합니다. main DispatchQueue를 제공하는것은 progress 업데이트가 main thread에서 발생하는걸 보장합니다.
4. 이미지가 업로드 되어질때 호출되는 progress 클로저를 정의합니다. progress bar의 progress를 설정하고 callbackQueue에서 제공된 main DispatchQueue에서 호출되어집니다.
5. 요청이 완료되었을때, 공유 버튼과 업로드 뷰를 희미하게(보이지 않게) 만듭니다.
6. 이전과 같이 result의 `성공(success)`, `실패(failure)` 옵션을 처리합니다. 성공이라면, 응답을 `ImgurResponse`에 메핑하고   이전에 정의한 인스턴스 속성에 메핑한 응답을 저장합니다. 
	- 이 속성은 나중에 `deleteCard()` 매소드를 마무리할때 사용됩니다. 업로드 결과를 저장한 이후에, presentShare메소드를 실행하면, 업로드된 이미지의 URL과 이미지 자체에 적절한 공유 알람이 표시됩니다. 실패하면 `presentError()` 메소드가 실행됩니다.

오늘의 마지막 코드 조각을 위해: `deleteCard()`안에 다음 코드를 추가하세요.

```swift
// 1
guard let uploadResult = uploadResult else { return }
btnDelete.isEnabled = false

// 2
provider.request(.delete(uploadResult.deletehash)) { [weak self] response in
  guard let self = self else { return }

  let message: String

  // 3
  switch response {
  case .success:
    message = "Deleted successfully!"
    self.btnDelete.alpha = 0.0
  case .failure:
    message = "Failed deleting card! Try again later."
    self.btnDelete.isEnabled = true
  }

  let alert = UIAlertController(title: message, message: nil, preferredStyle: .alert)
  alert.addAction(UIAlertAction(title: "Done", style: .cancel))

  self.present(alert, animated: true, completion: nil)
}
```

이 매소드는 간단하고 다음과 같이 동작합니다.

1. `uploadResult`를 사용할수 있는지 확인하고 삭제 버튼을 비활성화하여 사용자가 다시 탭하지 않도록 합니다. 
2. Imgur provider를 사용하여 업로드 결과의 deletehash와 연관된 값으로 delegate 끝점을 호출합니다. 이 해시는 업로드된 이미지를 고유하게 식별합니다.
3. 삭제가 성공 또는 실패하면 적절한 메시지를 표시합니다.

이게 다입니다! 마지막으로 앱을 빌드하고 실행합니다. 만화를 선택하고 이미지를 `Imgur`에 공유합니다. 작업이 끝나면, delete 버튼을 눌러서 제거할수 있습니다.

> Note: CardViewController에 있는 동안에만 업로드된 이미지를 삭제할수 있습니다. 이것을 그대로 둔다면, 뷰컨트롤러의 `uploadResult`가 지워지도 `deletehash가 손실되어 집니다. 생성된 이미지에 대해 해시를 다른 세션에서 유지하는 것은 좋은 도전입니다.

---

<div id='section-id-611'/>

## Taking Moya to the Next Level


Moya는 이 튜토리얼에서 다루기에는 너무많은 추가 기능이 포함된 다재다능한 네트워킹 라이브러리 이지만 언급할만한 명확한 가치가 있습니다.

1. `Reactive Extension`: Moya는 [<U>RxSwift</U>](https://github.com/ReactiveX/RxSwift) 및, [<U>ReactiveSwift</U>](https://github.com/ReactiveCocoa/ReactiveSwift/)에서 사용할수 있는 [<U>RxMoya</U>](https://github.com/Moya/Moya/blob/master/docs/RxSwift.md), [<U>ReactiveMoya</U>](https://github.com/Moya/Moya/blob/master/docs/ReactiveSwift.md)라는 두가지 뛰어난 Reactive용 기능을 제공하고 유지관리합니다.
2. `Plugins`: Moya를 사용하면 요청(request), 응답(response)을 수정하거나, 부수 작용(side effects)을 수행하는데 사용할수 있는 Plugins 이라는걸 만들수 있습니다. 예를들어 요청과 응답을 로깅하거나, 요청을 실행할때 네트워크 활동 표시기를 자동으로 표시하는데 유용하게 사용할수 있습니다.
3. `Testing`: 이전에 언급한것과 같이, 모든 `TargetType`는 sampleData 속성이 있습니다. 여기에서 끝점을 위한 스텁된 응답을 제공할수 있습니다. MoyaProvider를 만들때 `stubClosure`를 제공할수 있습니다. `stubClosure`는 Moya가 스텁된 응답(stubbed) 또는 실제 응답(기본 값)을 반환할지 정의할수 있습니다. [Moya's testing documentation](https://github.com/Moya/Moya/blob/master/docs/Testing.md)에서 더 많이 배울수 있습니다. 
4. `Harvery`: 스텁하는 응답(stubbing responses)에 대해 말하자면-Moya의 팀중 일부는 `Harvery`라는 별도의 프레임워크를 개발하여 네트워크 응답을 쉽게 Mocking 합니다. 아직 초기 단계에 있지만, [이 프로젝트](https://github.com/Moya/Harvey)를 확인하는걸 추천합니다.

---

<div id='section-id-623'/>

## Where to Go From Here?

[여기](https://koenig-media.raywenderlich.com/uploads/2018/07/ComicCards.zip)에서 완성된 프로젝트 버전을 다운로드 할수 있습니다. Imgur Client ID, Marvel 공개키와 개인키를 설정하는것을 잊지마세요.

이 튜토리얼에서 모야(Moya) 사용법의 기본사항을 배웠습니다. 네트워킹 계층을 한 차원 높여주는데 필요한 모든것을 갖추고 있습니다. 

모야를 계속 탐구하기 가장 좋은곳은 [공식 문서 페이지](https://github.com/Moya/Moya/tree/master/docs) 입니다. 이 페이지는 매우 유익하고 모야의 모든면에 대해 훨씬 더 자세히 설명되어 있으며 심지어 [중국 번역본](https://github.com/Moya/Moya/tree/master/docs_CN)도 있습니다.
