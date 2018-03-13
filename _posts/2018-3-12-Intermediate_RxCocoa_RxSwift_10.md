---
layout:     post
title:      "RxSwift/RxCocoa. 기초 정리하기 (10)"
subtitle:   "Error Handling, Catch, Retry, retryWhen, Creating Custom error"
date:       2018-03-12 12:13:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

Raywenderlich-Ebook의 RxSwift를 읽고 정리한 내용입니다.

---

## RxCocoa 정리 (10) 

- Error Handling in Practice 
- getting started
- Managing errors
	- Throwing erros
- Handle error with catch(catch를 이용한 error관리)
	- A Common pitfall
- Catching errors
- Retrying on error 
	- Retry operators 
	- Advanced retries 
- custom error
	- Creating custom error 
	- Using the custom error 
- Advanced error handling 
- Where to go from here? 
- challenge 1: Use retryWhen on restored connectivity 
- Reference


---

## Error Handling in Practice 

우리가 완벽한 세상에 삶면 우리의 삶은 위대할수 있다. 하지만 삶은 우리의 예상대로 가지 않습니다. 최고의 RxSwift개발자라도 오류가 발생하는 것을 피할수 없으므로 정상적으로, 효율적으로 에러를 처리하는 방법을 알아야합니다. 

이장에서는 오류를 다루방법에 대해서 학습합니다. 에러가 발생했을때 어떻게 복구하고 관리할지에 대해서


---

## getting started 

ApiController.swift를 열어 다음 위치에 Api Key를 입력합니다.

```swift
let apiKey = BehaviorSubject(value: "[YOUR KEY]")
```

---

## Managing errors 

오류는 모든 Application에서 피할수없는 부분입니다. 불행히도 Application이 절대 오류를 내지 않을것이라고 보장 할수는 없으므로, 항상 어떤 종류의 오류 처리 메커니즘이 필요합니다. 

Application에서 가장 일반적인 오류 중 일부는 다음과 같습니다. 

- 인터넷 연결없음: 매우 일반적인 경우 입니다. Application에서 데이터를 검색하고 처리하기 위해서 인터넷 연결이 필요하지만 장치가 인터넷 연결이 되어 있찌 않은 경우, 이를 감지하고 적절히 대응할수 있어야 합니다.
- 잘못된 입력: 때에 따라서 정해진 폼에 따라서 입력 값이 필요한 경우가 있다. 하지만 사용자는 언제든지 잘못된 값을 입력할수 있다. 전화번호 입력란에 숫자대신 글자를 입력하는 사용자는 언제나 있을수있다.
- API또는 HTTP 에러: API를 통한 에러는 아주 광범위하게 일어납니다. 표준 HTTP에러(400 또는 500에러)를 통해 표시되거나 JSON네 status필드를 통해 표시될수 잇습니다. 

`RxSwift`에서 오류를 처리하는 프레임 워크의 일부이며 두가지로 처리할수 있습니다. 

- Catch: 기본값 `DefaultValue`로 error 복구하기<br> 

<center><img src="/img/posts/RxSwift_Error_Manager.png" width="500" height="300"></center> <br> 


- Retry: 제한적또는 무제한으로 재시도(Retry)하기<br>

<center><img src="/img/posts/RxSwift_Error_Manager-1.png" width="500" height="300"></center> <br> 

이 장의 프로젝트의 start 버젼에는 실제 오류 처리가 없습니다. 모든 오류는 더비 버전을 반환하는 단일 `catchErrorJustReturn`으로 catch됩니다. 

이것은 좋은 솔루션인것 같지만 `RxSwift`에서 이를 처리하기 위한 더 좋은 방법이 있습니다.

---

### Throwing erros 

시작하기 좋은곳은 RxCocoa오류를 처리하는 것입니다. RxCocoa오류는 기본 Apple 프레임워크에서 반환한 시스템오류를 래핑합니다. RxCocoa오류는 발생한 오류 종류에 대해 자세한 정보를 제공하고 오류 처리 코드를 쉽게 작성할수 있게 만듭니다. 

RxCocoa래퍼가 어떻게 작동하는지 확인하려면 `Pods/RxCocoa/URLSession+Rx.swfit`부분을 확인하세요. 

```swift
public func data(request: URLRequest) -> Observable<Data> {...}
```

`NSURLReqeust`에 의해서 생성되된 이 method는 Observable<Data>를 반환합니다. 여기서 중요한 부분은 오류를 반환하는 코드 입니다.

```swift
if 200 ..< 300 ~= response.statusCode {
  return data
} else {
  throw RxCocoaURLError.httpRequestFailed(response: response, data: data)
}
```

위의 다섯줄은 Observable이 오류를 방출하는 방법을 보여주는 완벽한 예 입니다. 뒷부분에서는 사용자 지정맞춤형 오류를 설명할것입니다. 

해당 클로져 내에서는 오류가 반환되지 않습니다. `flatMap` 연산자에서 에러를 내고 싶다면 일반 Swift 코드처럼 `throw`를 사용해야합니다

이것은 `RxSwift`를 사용하여 필요한 경우 관용적인 `Swift`코드를 작성하는 방법과 `RxSwift`스타일의 오류 처리방법을 보여주는 좋은 예입니다.

---


## Handle error with catch(catch를 이용한 error관리)

어떻게 `error`을 던지는지 설명한 후에, 어떻게 `error`을 관리하는지 봅니다. 

가장 기본적인 방법은 `catch`를 사용합니다. `catch` operator은 Swift에서 `do-try-catch` flow랑 유사하게 작동합니다.

Observable 기능이 수행되고 오류가 발생하면 오류를 감싸는 이벤트가 반환 됩니다. 

RxSwift에는 2개의 error를 처리하는 주요한 연산자가 있습니다. 

#### - 첫번쨰로

```swift
func catchError(_ handler:) -> RxSwift.Observable<Self.E>
```

이것은 일반적인 연산자 입니다. 매개변수로 클로저는 받아서 완전히 다른 Observable을 반환할수 잇는 기회를 제공합니다. 

이 옵션을 어디서 사용하는지 알수 없다면 Observable이 오류를 발생하면 이전에 캐싱된 값을 반환하는 캐싱전략을 생각해보십시오.

이 연산자를 사용하면 다음과 같은 흐름을 얻을수 있습니다.<br>


<center><img src="/img/posts/RxSwift_Error_Manager-2.png" width="500" height="300"></center> <br> 

여기서 `catchError`는 이전에 에러가 발생하지 않았던 값을 반환합니다. 


#### - 두번째는

```swift
func catchErrorJustReturn(_ element:) -> RxSwift.Observable<Self.E>
```

RxCocoa를 다루는 이전장에서 사용된것을 봤습니다. 오류를 무시하고 단지 미리 정의된 값을 반환합니다. 

이 연산자는 주어진 유형의 오류에 대해 값을 반환할수 없기 때문에 이전 오류보다 훨씬 제한적입니다. 오류가 무엇이든 관계없이 `모든 오류에 대해 동일한 값`이 반환됩니다.

---

### A Common pitfall

Error는 Observable 체인을 통해서 전달되므로 Observable chain의 시작부분에서 에러가 발생했을때 별도의 관리를 하지 않은경우 그대로 구독으로 전달되게 됩니다. 

observable이 에러를 방출했을때, 에러가 확인되고 이로 인해 모든 구독이 `dispose`된다는 의미입니다. 따라서 observable이 에러를 냈을때, observable은 반드시 완전종료되고 에러 다음의 이벤트는 모두 무시됩니다. 이것이 `observable`의 규칙입니다. 따라서 Observable chain을 통해서 에러가 전달되면 처리과정이 있어야 Obsrvable이 dispose 되지 않습니다.

아래에 타임라인이 그려져 있습니다. 네트워크에서 오류가 발생하고 Observable sequense에서 오류가 발생하면 UI를 업데이트하는 구독이 작동을 멈추게되어 향후 업데이트를 할수 없게 됩니다.<br>

<center><img src="/img/posts/RxSwift_Error_Manager-3.png" width="500" height="300"></center> <br> 


이제 실제 Application에서 변환하려면 다음을 제거하세요. `catchErrorJustReturn(ApiController.Weather.empty)` 행은 API가 404 오류 코드로 응답할때까지 Application을 시작하고 도시검색 필드에서 임의문자를 입력하면 콘솔창에 다음의 메세지를 볼수 있습니다.

```swift
"http://api.openweathermap.org/data/2.5/weather?
q=goierjgioerjgioej&appid=[API-KEY]&units=metric" -i -v
Failure (207ms): Status 404
```

응답(유효하지 않은 도시이름을 의미) 이후에 Application이 작동을 멈추고 해당 지점이후에 검색이 작동하지 않습니다. 최고의 사용자 경험이 아니겠습니까(???)

---

## Catching errors 

작업이 끝나면 비어있는 Weather유형을 반환하여 응용 프로그램 흐름이 중단되지 않도록 응용 프로그램이 오류에서 회복될수 있게 만듭니다.

이러한 방식의 에러관리는 다음과 같은 workflow로 표현할수 있습니다.<br>

<center><img src="/img/posts/RxSwift_Error_Manager-4.png" width="500" height="300"></center> <br> 


이것은 좋은 일이지만, 앱이 캐시된 데이터를 반환할수 있다면 좋을것 입니다. 

`ViewController.swift`를 열고 날씨 데이터를 캐시하기 위한 간단한 dictionary를 생성하여 ViewController의 속성으로 추가 하십시오

```swift
var cache = [String: Weather]()
```

이렇게 하면 캐시된 데이터가 임시로 저장됩니다. 

`viewDidLoad()`메소드 내에서 아래로 스크롤 하여 `textSearch` observable을 작성하는 행을 검색하세요

이제 `do(onNext:)`를 code chain에 추가 하는것으로 `textSearch` observable을 변경하여 캐시를 채울수 있습니다. 

```swift
let textSearch = searchInput.flatMap { text in
  return ApiController.shared.currentWeather(city: text ?? "Error")
    .do(onNext: { data in
      if let text = text {
        self.cache[text] = data
      }
})
    .catchErrorJustReturn(ApiController.Weather.empty)
}
```

위의 코드로, 유요한 날씨 응답이 dictionary에 저장됩니다. 이제 캐시된 결과를 어떻게 재사용할수 있습니까?

오류 이벤트에서 캐시된 값을 리턴하려면 `.catchErrorJustReturn(ApiController.Weather.empty)`를 다음 값으로 대체하십시오

위의 코드를 테스트하려면 "런던", "뉴옥", "암스테르담"과 같은 3개 또는 4개의 다양한 도시를 입력하고 날씨값을 가져옵니다.

그리고나서 인터넷 연결을 끊은다음 또 다른 도시를 검색해봅니다. 아마 에러를 받을수 있을것 입니다. 인터넷 연결을 끊은 상태로 처음에 가져온값(3,4개 도시 입력을 통해, 아마 `cache`에 잘 저장되어있을 것임)을 불러오기 위해 기존의 도시를 입력해보자. 아마 가져온 값을 보여줄 것입니다.

이것을 확장하면 캐시(cacth)의 일반적인 사용법입니다. 확실히 이것을 확장하여 일반적이고 강력한 캐싱 솔루션으로 만들수 있습니다. 

---

## Retrying on error 

오류 잡기(catching an error)는 `RxSwift`에서 오류를 처리하는 한가지 방법일뿐입니다. `retry`로 오류를 처리할수도 있습니다.

`retry`연산자가 observable에러에서 사용될때, observable은 스스로를 계속 반복합니다. 즉 `retry`는 observable내의 `전체` 작업을 반복한다는것을 의미합니다. 이것은 중요합니다. <br>

<center><img src="/img/posts/RxSwift_Error_Manager-5.png" width="500" height="300"></center> <br> 

이는 에러 발생시 사용자가 직접(부적절한 타이밍에) 재시도 함으로써 사용자 인터페이스가 변경되는 부작용(side effects)를 피하기 위해 권장되는 방법 입니다.

---

### Retry operators 

`retry` 연산자는 세가지 유형이 있습니다. 첫번째는 가장 기본적인 것입니다. 

```swift
func retry() -> RxSwift.Observable<Self.E>
```

이 연산자는 성공적을 반환 될때까지 observable을 무제한 반복합니다.

에를 들어, 인터넷에 연결되어 있찌 않으면 연결이 가능할때가지 계속 재시도 합니다. 

이것은 견고한 아이디어처럼 들리지 모르지만 리소스가 많이 소요되므로 `드물게`, 정당한 이유가 없으면 무제한으로 재시도하는것이 좋습니다(?)

아래의 연산자를 `catchError` 블럭에서 테스트해보자. 

```swift
//.catchError { error in
// if let text = text, let cachedData = self.cache[text] { // return Observable.just(cachedData)
// }else{
// return Observable.just(ApiController.Weather.empty) // }
//}
```

위의 코드를 주석 처리하고 그 자리에 `retry()`를 삽입하고 실행해봅니다. 다음 앱을 실행하고 인터넷 연결을 해제한 다음 검색을 시도하십시오. 콘솔에 많은 출력이 표시 되어 앱이 요청을 시도하고 있음을 보여줍니다. 

몇초후 인터넷 연결을 활성화하면 응용 프로그램이 요청을 성공적으로 처리한 결과가 표시됩니다. 

두번째 연산자를 사용하면 재시도 횟수를 변경할수 있습니다. 

```swift
func retry(_ maxAttemptCount:) -> Observable<E>
```

위의 연션자를 사용하면 observable 기능이 지정된 횟수만큼 반복합니다. 

- 방금 추가한 `retry()` 제거 합니다 
- 이전에 주석처리된 코드 블럭의 주석 처리를 제거 합니다
- `catchError`이전에 `retry(3)`을 추가합니다.


```swift
let textSearch = searchInput.flatMap { text in
            return ApiController.shared.currentWeather(city: text ?? "Error")
                .do(onNext: { data in
                    if let text = text {
                        self.cache[text] = data
                    }
                })
            .retry(3)
                .catchError { error in
                    // 유효한 값이 있을때는 유효한 값을 리턴하고, 그렇지 않을때는 빈값을 리턴한다..오..
                    if let text = text, let cachedData = self.cache[text] {
                        return Observable.just(cachedData)
                    } else {
                        return Observable.just(ApiController.Weather.empty)
                    }
            }
        }
```

전체의 코드블럭은 위처럼 됩니다. observable에서 오류가 발생하면 세번 역속해서 재 시도되고 네번째 오류가 발생하면 오류가 처리되지 않고 `catchError`연산자로 이동합니다.

---

## Advanced retries 

마지막으로 살펴볼 `retryWhen`연산자는 고급 재시도 상황에 적절하게 사용할수 있습니다.

```swift
func retryWhen(_ notificationHandler:) -> Observable<E>
```

이해해야할 중요한점은 `notificationHandler`는 `TriggerObservable Type` 입니다. 

trigger observable은 일반 `observable` 또는 `Subject`일수 있으며 임의의 시간에 `retry` 시도를 트리거하는데 사용됩니다. 

이 연산자를 현재 응용프로그램에 포함시킬 연산자이며, 인터넷연결을 할수 없는 경우 스마트 트릭을 사용하여 retry하거나, API에서 오류가 있는 경우 다시 시도합니다. 

오류가 발생하고 정확하게 작성했다면 다음과 같은 메세제를 얻을수 있습니다. 

```swift
subscription -> error
delay and retry after 1 second
subscription -> error
delay and retry after 3 seconds
subscription -> error
delay and retry after 5 seconds
subscription -> error
delay and retry after 10 seconds
```

아마도 기존의 Swift에서 이러한 결과를 얻으려면 `GCD`등을 이용한 복잡한 코드가 필요합니다. 하지만 `RxSwift` 를 사용하면 짧은 코드 블록으로 가능합니다. 

최종결과를 만들기전에 유의해야할 것이있습니다. 내부 observable항목ㄷ이 어떤 값을 반환해야하는지 확인해야하고, ``trigger
가 어떤 유형이 될수 있는지 고려해보아야 합니다. 

작업 목적은 delay seqeunce와 함께 4번의 재시도를 하는것입니다. 먼저 `ViewController.swift`내부에 `ApiController.shared.currentWeather` sequence 전에 `retryWhen` 연산자에서 사용할 최대 재시도 횟수를 정의합니다. 

```swift
let maxAttempts = 4
```

여기서 정의한 횟수만큼 재시도가 된 이후에 에러가 전달될 것입니다. 

이제 `.retry(3)` 부분을 아래와 같이 수정합니다.

```swift
.retryWhen { e in
  // flatMap source errors
}
```

위의 `observable`은 `original observable`에서 반환된 에러값과 결합되어야 합니다. 

따라서 오류가 이벤트로 도착하면 이러한 고나찰 가능 항목의 조합에 이벤트의 현재 색인도 추가됩니다. 

`flatMapWithIndex`연산자를 사용하여 이 작업을 수행할수있습니다. 

주석 //flatMap source errors를 다음으로 대체하세요

```swift
e.flatMapWithIndex { (error, attempt) -> Observable<Int> in
  // attempt few times
}
```

이제 original error observable과, retry 전에 지연되어야 하는 시간을 정의하는 오류가 결합됩니다. 

이제 첫번째 지연된 이벤트만 취하여 타이머와 코드를 결합하십시오. 위 코드를 다음과 같이 조정하세요

```swift
e.flatMapWithIndex { (error, attempt) -> Observable<Int> in
  if attempt >= maxAttempts - 1 {
    return Observable.error(error)
  }
  return Observable<Int>.timer(Double(attempt + 1), scheduler:
MainScheduler.instance).take(1)
}
```

.retryWhen 과 함께 완성된 코드는 아래와 같습니다

```swift
.retryWhen { e in
  return e.flatMapWithIndex { (error, attempt) -> Observable<Int> in
    if attempt >= maxAttempts - 1 {
      return Observable.error(error)
    }
    return Observable<Int>.timer(Double(attempt + 1), scheduler:
MainScheduler.instance).take(1)
	} 
}
```

작업을 기록하려면 `flatMapWithIndex` operators 내부에 아래의 코드를 추가하세요

```swift
print("== retrying after \(attempt + 1) seconds ==")
```

이제 빌드하고, 실행후 인터넷 연결을 해제하고 검색을 수행하세요. 다음 로그가 콘솔창에 표시 되어야합니다.

```swift
== retrying after 1 seconds ==
... network ...
== retrying after 2 seconds ==
... network ...
== retrying after 3 seconds ==
... network ...
```

아래의 이미지를 참고하자 <br>

<center><img src="/img/posts/RxSwift_Error_Manager-6.png" width="500" height="300"></center> <br> 


`trigger`은 original error observable을 고려하여 매우 복잡한 back-off 전략을 달성할수 있습니다. 

이것은 몇줄의 RxSwift 코드만 사용하여 복잡한 오류 처리 전략을 작성하는 방법을 보여줍니다.

---

## custom error 

---

### Creating custom error 

`RxCocoa`에서 반환된 오류는 매우 일반적이므로 HTTP 404 오류(페이지를 찾을수 없음), 502(불량 게이트웨이) 처럼 처리됩니다.

이것은 완전히 다른 두가지 오류 이므로 서로 다르게 처리할수 있으면 좋을것입니다. 

`ApiController.swift`를 파헤치면 다양한 HTTP 응답을 처리하는데 오류를 사용할수 있는 두가지 오류가 있고 그것을 처리하는 두가지방법을 사용한다는것을 알수 있습니다.

```swift
enum ApiError: Error {
  case cityNotFound
  case serverFailure
}
```

`buildReqeust(...)`내에서 이 오류 유형을 사용합니다. 이 메소드의 마지막 줄은 data type의 observable을 반환하고 JSON 객체 구조에 매핍됩니다.

여기서 검사를 검사를 삽입하고 작성한 사용자 정의 오류를 리턴합니다. RxCocoa의 .data편의는 이미 사용자 정의 오류 객체 생성을 처리합니다. 

`buildReqeust(..)`메소드에서 마지막 `flatMap`블록 안에 있는 코드를 바꿉니다.

```swift
return session.rx.response(request: request).map() { response, data in
  if 200 ..< 300 ~= response.statusCode {
    return JSON(data: data)
  } else if 400 ..< 500 ~= response.statusCode {
    throw ApiError.cityNotFound
  } else {
    throw ApiError.serverFailure
```

이 방법을 사용하면 사용자 정의 오류를 생성하고 API가 JSON 내부에 응답 메세지를 제공하는 경우와 같이 고급 논리를 추가할수 있습니다.

JSON 데이터를 가져와서 메시지 필드를 처리하고 오류에 캡슐화하여 처리할수 있습니다. 오류는 스위프트에서 매우 강력하며 RxSwift에서 더욱 강력해질수 있습니다.

---

### Using the custom error 

이제 사용자 정의 오류가 반환되므로 그것을 통해 다른 행동을 취할수 있습니다.

계속하기전에 `ViewController.swift`에 `retryWhen{...}`연산자를 주석처리합니다. 오류가 체인을 통과하여 obvservable객체에 의해 꿰어지기를 원합니다. 

주어진 오류메세지로 Application하단에 있는 작은 View를 깜빡이는 `InfoView`라는 편리한 View가 있습니다.

사용법은 매우 단순하며 다음과 같은 한줄의 코드만 사용하면 됩니다.(지금당장입력할 필요는 없습니다)

```swift
InfoView.showIn(viewController: self, message: "An error occurred")
```

오류는 대개 `retry`, `catch` 연산자를 사용하여 처리하지만 부작용(`side effect`)를 처리하고 유저 인터페이스에 메세지를 표시하려면 어떻게 해야합니까? 이를 위해 `do` 연산자가 있습니다.

주석을 달아놓은 `retryWhen`의 동일한 구독에 `do`를 사용하여 캐싱을 구현합니다.

```swift
.do(onNext: { data in
  if let text = text {
    self.cache[text] = data
  }
})
```

동일한 메서드 호출에 두번째 매개변수를 추가하여 부작용(side effect)를 수행합니다. 오류 이벤트의 경우 전체 블록은 다음과 같아 보입니다.

```swift
.do(onNext: { data in
  if let text = text {
    self.cache[text] = data
  }
}, onError: { [weak self] e in
  guard let strongSelf = self else { return }
  DispatchQueue.main.async {
    InfoView.showIn(viewController: strongSelf, message: "An error occurred")
	} 
})
```

dispatch는 sequence observable이 background thread에서 관찰되기 때문에 필요합니다. 

dispatch를 main thread로 설정하지 않으면 UIKit은 background thread에 의해 수정되는 UI에 불평합니다.

빌드를 실행하고 임의의 문자열을 검색하려고 하면 오류가 표시됩니다.

<center><img src="/img/posts/RxSwift_Error_Manager-7.png" width="500" height="300"></center> <br> 

오류는 오히려 일반적입니다. 하지만 거기에 더 많은 정보를 쉽게 주입할수 있습니다. 

RxSwift는 Swift와 마찬가지로 이것을 처리하므로 오류 케이스를 확인하고 다른 메시지를 표시할수 이씃ㅂ니다.

코드를 조금더 편하게 만들려면 이 새로운 메소드를 ViewController에 추가하세요.

```swift
func showError(error e: Error) {
  if let e = e as? ApiController.ApiError {
    switch (e) {
    case .cityNotFound:
      InfoView.showIn(viewController: self, message: "City Name is
invalid")
    case .serverFailure:
      InfoView.showIn(viewController: self, message: "Server error")
      }
} else {
    InfoView.showIn(viewController: self, message: "An error occurred")
  }
}
```

그런다음 `do(onNext:onError:)`로 돌아가서 InfoView.showIn(...)행을 다음으로 대체하세요.

```swift
strongSelf.showError(error: e)
```

이것은 사용자 오류에게 오류에 대한 더 많은 컨텍스트를 제공해야 합니다. 

---

## Advanced error handling 

고급 에러처리는 도입하기에 까다로울수 있습니다. 왜냐하면 사용자에게 메시지를 보내는것과는 별개로, API가 에러를 반환했을때 별도로 취해야할 일반적인 규칙 같은 것은 없기 때문입니다.

현재 앱에서 인증기능을 추가한다고 생각해봅시다. 사용자는 날씨 정보를 요청하기 위해 인증을 거쳐야 합니다. 아마 이를 통해서 사용자가 제대로 로그인 했는지 확인할 세션이 생성될것입니다. 하지만 세션이 만료되었다면 어떻게 해야할까요? 에러를 반환하거나 빈값을 반환해야할까요?

이 상황에 대한 특책은 없습니다. 여기에는 두가지 해결책을 구현해놓았지만 이건 에러를 이해하기에 유용한 해결책일뿐 그 이상의 정답이 아닙니다.

`apiKey`라는 behaviorSubject를 사용해봅시다. 이녀석은 `retryWhen`클로저는 `retry`할 `trigger`로 사용될수 있습니다.

API키의 유실은 에러로 정의될수 있습니다. 따라서 다음 케이스를 `ApiError` enum에 추가합니다

```swift
case invalidKey
```

이 에러는 서버가 401코드를 반환했을때 발생해야합니다. `buildReqeust(...)`함수에 이 에러를 발출시켜봅시다. 위치는 첫번째 if 조건인 `200..<300`바로 다음이 될것입니다.

```swift
else if response.statusCode == 401 {
 	throw ApiError.invalidKey
}
```

새로운 에러는 새로운 `handler`도 필요로합니다. `ViewController.swift`의 `showError(error:)`내부의 `switch`메소드에 다음과 같은 코드를 추가합니다

```swift
case .invalidKey:
 	InfoView.showIn(viewController: self, message: "Key is invalid")
```

`searchInput`을 구독하기 전에 에러처리를 할 별도의 클로저를 observable 체인 바깥에 생성합니다.

```swift
let retryHandler: (Observable<Error>) -> Observable<Int> = { e in
            return e.flatMapWithIndex { (error, attempt) -> Observable<Int> in
                //error handling
                if attempt >= maxAttempts - 1 {
                    return Observable.error(error)
                } else if let casted = error as? ApiController.ApiError, casted
                    == .invalidKey {
                    return ApiController.shared.apiKey
                        .filter {$0 != ""}
                        .map { _ in return 1 }
                }
                print("== retrying after \(attempt + 1) seconds ==")
                return Observable<Int>.timer(Double(attempt + 1), scheduler:
                    MainScheduler.instance)
                    .take(1)
            }
        }
```

`invalidKey` 대/소 문자의 반환 유형은 중요하지 않지만 일관성이 있어야합니다. 전에는 `Observable<Int>`이었으므로 반환 유형을 고수해야합니다. 이러한 이유로 `{_ in return 1}`을 사용했습니다.

이제 주석처리된 `retryWhen{...}`로 스크롤하여 이를 `retryWhen(retryHandler)`로 바꿉니다. 

마지막 단계는 API키의 제목을 사용하는것입니다. 이미 `ViewController.swift`에 `requestKey()`라는 메소드가 있습니다. 이 메소드는 텍스트 필드에 있는 경고를 엽니다. 

그런다음 사용자는 로그인 기능을 흉내내기위해 키를 입력하거나 내부에 붙여넣을수 이씃ㅂ니다.(여기에서는 테스트 목적으로 이 작업을 수행하며 실제 앱에서는 사용자가 서버에서 키를 가져오기 위해 자격 증명을 입력합니다.)

`ApiController.swift`로 전환하십시오. `apiKey`제목에서 API키를 제거하고 빈 문자열로 설정하십시오.(잠시후에 다시 필요하기 때문에 키를 쉽게 복사할수 있습니다.)

```swift
let apiKey = BehaviorSubject(value: "")
```

실행후, 검색을 시도해보세요. <br>

<center><img src="/img/posts/RxSwift_Error_Manager-8.png" width="500" height="300"></center> <br> 

위의 메세지를 확인후. <br>

<center><img src="/img/posts/RxSwift_Error_Manager-9.png" width="500" height="300"></center> <br> 

위의 버튼을 누른후, <br>

<center><img src="/img/posts/RxSwift_Error_Manager-10.png" width="500" height="300"></center> <br> 

에 API를 입력하면 유요한 key값이면 원하는 값을 반환하고 그렇지않으면 observable sequence가 오류를 반환하고 종료합니다.

---

## Where to go from here? 

이장에서 `retry`, `catch`를 사용하여 오류를 처리하는 방법에 대해서 소개했습니다. 

앱의 오류를 처리하는 방법은 실제로 어떤 프로젝트를 구축하고 있는지에 달려 있습니다.

오류를 처리할때 설계 및 아키텍처가 작동하고 잘못된 처리 전략을 작성하면 프로젝트가 손상되어 코드의 일부를 다시 작성할수 있습니다. 

또한 `retryWhen`에 시간을 쏟을것을 추천합니다. 이것은 자주 사용하는 연산자 이기때문에, 사용할수록 응용 프로그램에서 편안하게 사용할수 있습니다.

---

## challenge 1: Use retryWhen on restored connectivity 

사용할수 없는 인터넷 연결 상태를 처리해야합니다. 시작하려면 `RxReachbility.swift`의 전달 가능성 서비스를 살펴 보십시오. 인터넷 연결이 반환될때 알림을 올바르게 전달할수 있도록 코드를 수정하십시오. 

추가로 아래의 코드를 추가하여, 장치연결을 모니터링 할수 있습니다.

```swift
_ = RxReachability.shared.startMonitor("openweathermap.org")
```

완료되면 `retryWhen` handler를 확장하여 "사용할수 있는 인터넷 연결 없음" 오류를 처리합니다. 인터넷 연결이되면 `retry`해야한다는것을 기억해야합니다.

이를 수행하기 위해 `flatMapWithIndex`연산자에서 반환되는 오류의 종류를 확인하는 if를 추가하십시오.

오류를 NSError로 캐스팅하고 코드가 -1009이면 네트워크 연결이 끊어졌습니다. 

이 경우 `RxReachability.shared.status`를 반환하고 필터링하여 `.online`값만 통과하도록 다른 if 문에서와 마찬가지로 1로 매핑합니다.

최종 목표는 장치가 오프라인 상태이고 오류를 방출한 상태일때, 인터넷이 다시 연결되면 시스템이 자동으로 retry 하는것입니다.

---

## Reference 

* 공식 

[http://reactivex.io](http://reactivex.io/documentation/ko/observable.html) <br> 
[Introduce to Rx](http://www.introtorx.com/Content/v1.0.10621.0/00_Foreword.html) <br>
[RxJS Marbles](http://rxmarbles.com/) <br>
[RxSwift github](https://github.com/ReactiveX/RxSwift) <br>
[http://community.rxswift.org/](http://community.rxswift.org/) <br>

* 개인 참조

[swift error hanlder](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html)

