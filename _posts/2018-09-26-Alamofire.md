---
layout: post
title:      "Swift, Alamofire Tutorial: Getting Started"
subtitle:   "Alamofire가 무엇인지, 어떻게 사용하는지 알아봅니다"
date:       2018-09-26 15:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich, Alamofire]
---

[Alamofire Tutorial: Getting Started](https://www.raywenderlich.com/35-alamofire-tutorial-getting-started)의 내용을 의역했습니다. 오역이 많으니 참조해주세요.

---

## Alamofire Tutorial: Getting Started 

사실상 iOS의 네트워킹 라이브러리인 Alamofire는 수천가지 애플리케이션에 힘을 주었습니다. imagga API를 사용하여 사용자의 사진을 업로드하고 분석하는것으로 Alamofire에 첫발을 내딛습니다.

> Update note: 이 튜토리얼은 Xcode 9.3, iOS 11.3, Swift 4.1, Alamofire 4.7.0 으로 업데이트 되었습니다.

Alamofire는 iOS, macOS를 위한 스위프트 기반 HTTP 네트워킹 라이브러리 입니다. Apple의 `Foundation networking` 기반으로 인터페이스를 제공하여 일반적인 네트워킹 작업을 단순화합니다.

Alamofire는 함께 사용가능한(chainable) request/response 매소드들, JSON 파라미터, 응답 직렬화(response serialization), 인증(authentication) 그리고 많은 다른 기능을 제공합니다. 

Alamofire의 우아함은, Swift로 작성되었고, Objective-C팀의 AFNetworking에서 어떤것도 상속받지 않은 사실에서 비롯된 것입니다.

HTTP networking의 개념상의 이해를 가지고 있어야하고, `URLSession` 클레스 같은 애플의 네트워킹 클레스를 사용한(exposure) 경험이 있어야합니다.

Alamofire가 세부 구현사항을 숨기기 때문에, 네트워크 요청 문제를 해결해야하는 경우에 위와 같은 배경지식이 있으면 도움이 됩니다.

---

## Getting Started

[여기](https://koenig-media.raywenderlich.com/uploads/2018/04/PhotoTagger.zip)에서 시작 프로젝트를 다운 받습니다. 

> Note: Alamofire는 일반적으로 CocoaPods를 사용하여 통합됩니다. 다운로드한 프로젝트에 이미 설치되어 있습니다.

Alamofire 연습을 위한 이 앱의 이름은 `PhotoTagger`입니다. 프로젝트가 완성되면, 사진첩(또는 실제 장치에서 실행중인 카메라)에서 이미지를 선택하고, Imagga라는 타사 서비스에 이미지를 업로드 할수 있습니다. 이 서비스는 이미지 인식작업을 수행하여 이미지의 태그 및 초기 색상 목록(primary colors)을 제공합니다.

<center><img src="/img/posts/Alamofire-Tutorial-0.gif" width="400" height="250"></center> <br>


이 프로젝트는 CocoaPods를 사용하고 PhotoTagger.xcworkspace 파일을 사용하여 실행합니다.

> Note: CocoaPods에 대해 더 알고싶다면 [이 튜토리얼](https://www.raywenderlich.com/626-cocoapods-tutorial-for-swift-getting-started)을 참조하세요.

프로젝트를 빌드하고 실행하면 다음과같이 보입니다.

![](/img/posts/Alamofire-Tutorial-1.png)

`Select Photo`를 클릭하고 photo를 선택합니다. 배경이 선택된 이미지로 변경됩니다.

`Main.storyboard`를 열면, 태그와 색상을 표시하기위한 추가적인 화면을 볼수 있습니다. 남은 할일은 이미지를 업로드하고 tag와 색상들을 가져오는 것입니다.

---

## The Imagga API

imagga는 개발자 및 기업이 확장 가능한 이미지 집약적인 클라우드 애플리케이션을 개발할수 있도록 이미지 태깅 API를 제공하는 이미지 인식 플렛폼 서비스 입니다. [여기](https://imagga.com/auto-tagging-demo?url=https://imagga.com/static/images/tagging/vegetables.jpg)에서 자동 테깅 시스템 데모를 확인할수 있습니다.

Alamofire tutorial을 위해 Imagga로 무료 개발자 계정을 만들어야합니다. Imagga는 각 HTTP 요청에 인증 헤더가 필요하므로 계정을 가진 사람만 서비스를 사용할수 있습니다. [https://imagga.com/auth/signup/hacker](https://imagga.com/auth/signup/hacker)여기로 이동하여 양식을 작성하세요. 계정을 만든 후 대시 보드를 확인하세요. 

![](/img/posts/Alamofire-Tutorial-2.png)

`Authorization` 색션에 나열된 token은 나중에 사용하게 될것입니다. 이 정보를 HTTP 요청 헤더에 포함해야합니다.	

> Note: 토큰 전체를 복사했는지 확인하고, 오른쪽으로 스크롤하여 모든 내용을 복사했는지 확인하세요.

이제 Imagga's `content` 끝점(endpoint)을 이용하여 사진을 업로드하고, 이미지 인식을 위해 tagging 끝점을 지정하고, 색상 식별을 위해 colors 끝점을 사용하게 됩니다. [여기](https://docs.imagga.com/)에서 Imagga API에 대한 모든것을 읽을수 있습니다. 

---

## REST, HTTP, JSON - What's that?

인터넷을 통해 제3자 서비스를 사용한 경험이 거의 없는 상태에서 이 자습서를 읽는다면, 이런 약어가 무엇을 의미하는지 궁금할 것입니다.

`HTTP`는 웹서버에서 화면(모바일 스크린 또는, 보여지는 화면들)으로 데이터를 전송하는데 사용하는 애플리케이션 프로토콜 또는 규칙들의 집합 입니다. 웹 브라우저에 입력한 모든 URL 앞에 HTTP(또는 HTTPS)가 표시 된것을 볼수 있습니다. FTP, Telnet, SSH 같은 다른 애플리케이션 프로토콜들을 들어봤을 것입니다. HTTP는 클라이언트(웹 브라우저 또는 앱)가 원하는 동작을 나타내는데 사용하는  몇개의 요청 매소드들, 동사(verbs)들을 정의합니다. 

- `GET`: 웹페이지 같은 데이터를 검색하지만, 서버의 데이터는 변경하지 않습니다.
- `HEAD`: `GET`과 동일하지만. header만 보내고(send back) 데이터는 보내지 않습니다.
- `POST`: 서버로 데이터를 보내고 일반적으로 형식을 채우고, 제출(submit)을 클릭할때 사용합니다.
- `PUT`: 구체적으로 제공된 위치에 데이터를 보냅니다.
- `DELETE`: 구체적으로 지정된 위치의 데이터를 삭제합니다.

`REST` 또는 `REpresentational State Transfer`는 일관되게 사용하기 쉽고 관리하기 쉬운 웹 API들을 설계하기 위한 규칙 집합 입니다. REST에는 요청간에 여러가지 상태를 유지하지 않고 요청을 캐싱할수 있는 균일한 인터페이스를 제공하는 등 여러가지 아키텍쳐 규칙이 있습니다. 따라서 요청과 관련하여 데이터 상태를 추적하지 않아도 앱 개발자가 앱에 API를 쉽게 통합할수 있습니다.

`JSON`은 JavaScript Object Notation의 약자입니다. 두 시스템간에 데이터를 전송하기 위한 직접적이고 인간이 읽을수 있는 이동하기 쉬운(portable) 메커니즘을 제공합니다. string, boolean, array, object/dictionary, null, number 등 한정된 수의 데이터 타입을 가집니다. 정수(integers)와 소수(decimals)사이에는 구분이 없습니다.

오래된 `JSONSerialization` 클레스와 새로 추가된 `JSONEncoder`, `JSONDecoder` 클레스는 메모리에 있는 객체를 `JSON`으로 또는 그 반대로 변환하기 위한 네이티브 방식으로 선택할수 있습니다. 또한 JSON처리에 도움이 되는 수많은 타사 라이브러리가 있습니다. 이 자습서에서는 `SwiftyJSON` 사용합니다.

HTTP, REST, JSON의 조합은 개발자로서 사용가능한 웹서비스의 상당 부분을 차지합니다. 모든 조각들이 어떻게 작동하는지 이해하려고 노력하는것에 압도될수 있습니다. Alamofire와 같은 라이브러리는 이러한 서비스 작업의 복잡성을 줄이고 이들의 도움없이 가능한 빨리 시작할수 있습니다.

---

## What is Alamofire Good For?

왜 모든곳에서 Alamofire가 필요한가요? 애플은 이미 HTTP를 통해 컨텐츠 다운로드를 위한 `URLSession`과 같은 클레스를 제공하고 있는데, 다른 제3라이브러리에서 복잡한 작업을 수행하는 이유는 무엇인가요?

짧은 정답은, Alamofire는 `URLSession` 기반이지만, boilerplate code(꼭 필요한 부분이라 사용해야 하지만 추가적으로 해야하는 작업이 많은코드..)를 작성하지 않아도 되므로 네트워킹 코드를 훨씬 쉽게 작성할수 있습니다. 아주 적은 노력으로 인터넷의 데이터에 접근할수 있으며 코드는 더 깨끗하고 더 읽기 쉽습니다.

Alamofire에는 몇 가지 주요 기능이 있습니다.

- `Alamofire.upload`: multipart, stream, file, data method를 사용하여 파일을 업로드 합니다. 
- `Alamofire.download`: 파일을 다운로드 하거나 이미 진행중인 다운로드를 다시 시작합니다.
- `Alamofire.request`: 다른 모든 HTTP요청은 파일전송과 관련이 없습니다.

이러한 Alamofire 매소드는 Alamofire내의 전역에서 사용할수 있습니다. 그래서 Alamofire를 사용하기위해 인스턴스화 할 필요가 없습니다. Alamofire에는 `SessionManager`, `DataRequest`, `DataResponse`와 같은 클레스와 구조체가 있습니다. 하지만 Alamofire를 사용하기 위해서는 Alamofire의 전체 구조를 완전히 이해할 필요가 없습니다.

다음은 Apple의 `URLSession`과 Alamofire의 요청 기능(Alamofire's `request` function)이 모두 동일한 네트워킹 작업의 예입니다. 

```swift
// With URLSession
public func fetchAllRooms(completion: @escaping ([RemoteRoom]?) -> Void) {
  guard let url = URL(string: "http://localhost:5984/rooms/_all_docs?include_docs=true") else {
    completion(nil)
    return
  }

  var urlRequest = URLRequest(url: url,
                              cachePolicy: .reloadIgnoringLocalAndRemoteCacheData,
                              timeoutInterval: 10.0 * 1000)
  urlRequest.httpMethod = "GET"
  urlRequest.addValue("application/json", forHTTPHeaderField: "Accept")

  let task = urlSession.dataTask(with: urlRequest) { (data, response, error) -> Void in
    guard error == nil else {
      print("Error while fetching remote rooms: \(String(describing: error))")
      completion(nil)
      return
    }

    guard let data = data,
      let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
        print("Nil data received from fetchAllRooms service")
        completion(nil)
        return
    }

    guard let rows = json?["rows"] as? [[String: Any]] else {
      print("Malformed data received from fetchAllRooms service")
      completion(nil)
      return
    }

    let rooms = rows.flatMap { roomDict in return RemoteRoom(jsonData: roomDict) }
    completion(rooms)
  }

  task.resume()
}
```

다른방식 

```swift
// With Alamofire
func fetchAllRooms(completion: @escaping ([RemoteRoom]?) -> Void) {
  guard let url = URL(string: "http://localhost:5984/rooms/_all_docs?include_docs=true") else {
    completion(nil)
    return
  }
  Alamofire.request(url,
                    method: .get,
                    parameters: ["include_docs": "true"])
  .validate()
  .responseJSON { response in
    guard response.result.isSuccess else {
      print("Error while fetching remote rooms: \(String(describing:response.result.error))")
      completion(nil)
      return
    }

    guard let value = response.result.value as? [String: Any],
      let rows = value["rows"] as? [[String: Any]] else {
        print("Malformed data received from fetchAllRooms service")
        completion(nil)
        return
    }

    let rooms = rows.flatMap { roomDict in return RemoteRoom(jsonData: roomDict) }
    completion(rooms)
  }
}
```

Alamofire에 필요한 설정이 짧고 기능이 훨씬 명확하다는것을 알수 있습니다. `responseJSON(options:completionHandler:)`과 함께 응답을 역 직렬화(deserialize) 하고 `validate()`호출로 응답 상태 코드를 200에서 299사이의 기본허용 범위에 있음을 확인하여 오류 조건 처리를 단순화 합니다. 

이제 이론은 끝났습니다. 이제 Alamofire를 사용할 시간입니다.

---

## Uploading Files

ViewController.swift를 열고 import `import SwiftyJSON` 이후에 다음을 추가합니다.

```swift
import Alamofire
```

이를 통해 Alamofire 모듈에서 제공하는 기능을 사용할수 있습니다. 

다음으로 `imagePickerController(_:didFinishPickingMediaWithInfo:)`로 가고 `dismiss(animated:)`가 호출되기 직전에 다음을 추가합니다.

```swift
// 1
takePictureButton.isHidden = true
progressView.progress = 0.0
progressView.isHidden = false
activityIndicatorView.startAnimating()

upload(image: image,
       progressCompletion: { [weak self] percent in
        // 2
        self?.progressView.setProgress(percent, animated: true)
  },
       completion: { [weak self] tags, colors in
        // 3
        self?.takePictureButton.isHidden = false
        self?.progressView.isHidden = true
        self?.activityIndicatorView.stopAnimating()
            
        self?.tags = tags
        self?.colors = colors
            
        // 4
        self?.performSegue(withIdentifier: "ShowResults", sender: self)
})
```

Alamofire와 함께하는 모든것은 `비동기(asynchronous)` 이고, 이것은 비동기 방식 에서 UI를 업데이트 해야함을 의미합니다.

1. upload 버튼을 숨기고 프로그레스 뷰와 활성 뷰를 보여줍니다
2. 파일을 업로드 하는 동안, 업데이트된 비율을 가진 progress handler를 호출합니다. 업데이트된 비율은 progress bar의 progress indicator를 업데이트 합니다.
3. completion handler는 업로드가 완료됬을때. 이렇게 하면 컨트롤이 원래 상태로 되돌아갑니다.
4. 마지막으로 업로드가 완료 되거나, 그렇지 않을때 결과 스크린으로 화면을 이동합니다. 이 유저 인터페이스는 오류 조건에 따라 변경되지 않습니다.

다음으로 파일의 아래에 있는 `upload(image:progressCompletion:completion:)`을 찾습니다. 현재는 단순한 매소드 stub일뿐이므로 다음구현을 제공합니다.

```swift
func upload(image: UIImage,
            progressCompletion: @escaping (_ percent: Float) -> Void,
            completion: @escaping (_ tags: [String]?, _ colors: [PhotoColor]?) -> Void) {
  // 1
  guard let imageData = UIImageJPEGRepresentation(image, 0.5) else {
    print("Could not get JPEG representation of UIImage")
    return
  }

  // 2
  Alamofire.upload(multipartFormData: { multipartFormData in
    multipartFormData.append(imageData,
                             withName: "imagefile",
                             fileName: "image.jpg",
                             mimeType: "image/jpeg")
  },
                   to: "http://api.imagga.com/v1/content",
                   headers: ["Authorization": "Basic xxx"],
                   encodingCompletion: { encodingResult in
  })
}
```

다음을 무슨일이 일어나는지에 대한 설명입니다.

1. 업로드 하는 이미지는 `Data` 인스턴스로 변환 시켜야합니다. 
2. JPEG 데이터 부분(imageData)을 MIME multipart 요청으로 변환하여 Imagga 컨텐츠 끝점(content endpoint)로 전송합니다.

> Note: `Basic xxx`를 Imagga dashboard에서 받았던 authorization header로 변경해야합니다.

다음, `encodingCompletion` 클로저에 다음을 추가합니다.

```swift
switch encodingResult {
case .success(let upload, _, _):
  upload.uploadProgress { progress in
    progressCompletion(Float(progress.fractionCompleted))
  }
  upload.validate()
  upload.responseJSON { response in
  }
case .failure(let encodingError):
  print(encodingError)
}
```

이 코드는 Alamofire 업로드 함수를 호출하고 작은 계산을 전달하여 파일 업로드와 함께 진행 표시줄을 업데이트 합니다. 그런 다음 응답에 200~299사이의 기본 허용 범위에 있는 상태코드가 있는지 확인합니다.

> Note: Alamofire 4 이전에는 progress callback이 main queue에서 호출된것이 보장되지 않았습니다. Alamofire 4부터는 새로운 진행 콜백 API가 항상 메인큐에서 호출됩니다.

다음코드를 `upload.responseJSON`클로저에 추가합니다.

```swift
// 1
guard response.result.isSuccess,
  let value = response.result.value else {
    print("Error while uploading file: \(String(describing: response.result.error))")
    completion(nil, nil)
    return
}
                        
// 2
let firstFileID = JSON(value)["uploaded"][0]["id"].stringValue
print("Content uploaded with ID: \(firstFileID)")
                        
//3
completion(nil, nil)
```

위의 코드의 단계별 설명입니다.

1. 업로드가 성공했는지 확인하고 결과값이 있는지 확인합니다. 그렇지 않다면, error를 출력하고 completion handler를 호출합니다.
2. `SwiftyJSON`을 사용하여 응답에서 `firstFileID`를 검색합니다.
3. completion handler호출하여 UI를 업데이트 합니다. 이 시점에서 다운로드한 태그나 색상이 없으므로 단순히 데이터 없음으로 호출합니다.

> Note: `Result` enum은 모든 응답은 값과 타입을 가집니다. 자동 검증을 사용하면 200에서 299사이에 유효한 `HTTP code` 나 Content Type이 `Accept HTTP` 헤더 필드에 지정된 유효한 형식인 경우 결과가 성공한 것으로 간주됩니다. 
> 
> 다음과같이 `.validate` 옵션을 추가하여 수동으로 유효성 검사를 수행할수 있습니다. 

업로드 하는 동안 에러가 발생하면 UI에 오류가 표시되지 않습니다.(사용자에게 태그나 색상을 반환하지 않습니다). 이것은 최상의 사용자 경험은 아니지만, 이 튜토리얼에서는 문제가 없습니다.

프로젝트를 빌드하고 실행합니다. 이미지를 선택하고 파일이 업로드될때 progress bar가 변하는것을 보세요. 업로드가 완료되었을때 console창에 다음과같은 기록을 보아야합니다.

![](/img/posts/Alamofire-Tutorial-3.png)

축하합니다, interweb을 통해 성공적으로 파일을 업로드 했습니다.

![](/img/posts/Alamofire-Tutorial-4.png)

---

## Retrieving Data 

Imagga로 이미지를 업로드한 이후 단계는 Imagga가 사진을 분석한후 생성하는 tags를 가져오는 것입니다. 

다음 매소드를 `ViewController` 확장에 `upload(image:progress:completion:)` 이후에 추가합니다.

```swift
func downloadTags(contentID: String, completion: @escaping ([String]?) -> Void) {
  // 1
  Alamofire.request("http://api.imagga.com/v1/tagging",
                    parameters: ["content": contentID],
                    headers: ["Authorization": "Basic xxx"])
     // 2
    .responseJSON { response in
      guard response.result.isSuccess,
        let value = response.result.value else {
          print("Error while fetching tags: \(String(describing: response.result.error))")
          completion(nil)
          return
      }
      
      // 3
      let tags = JSON(value)["results"][0]["tags"].array?.map { json in
        json["tag"].stringValue
      }
        
      // 4
      completion(tags)
  }
}
```

위의 코드의 단계별 설명입니다.

1. `태그(tagging)` 끝점(endpoint)으로 HTTP GET 요청을 수행하고 업로드후 받은 ID로 URL Parameter `Contents`를 전송하세요. 다시 말하지만 `Basic xxx`를 실제 허가(Authorization) 헤더로 변경하세요.
2. 응답이 성공인지 확인하고 결과(Result)가 값을 가졌는지 확인하세요. 그렇지 않은경우 error를 출력하고 completion handler를 호출합니다.
3. SwiftyJSON을 사용하여 응답에서 원시 `태그(tags)` 배열을 검색합니다. 태그 배열에서 각 사전객체를 반복하고, `tag` key와 연관된 값을 검색합니다. 
4. 서비스로부터 받은 `태그(tags)`를 전달하는 completion handler를 호출합니다.

다음, `upload(image:progress:completion:)`으로 돌아가고 성공 조건의 완료 핸들러 호출을 다음과 같이 교체합니다. 

```swift
self.downloadTags(contentID: firstFileID) { tags in
  completion(tags, nil)
}
```

이렇게하면 태그를 완료핸들러로 보냅니다.

프로젝트를 빌드하고 실행하세요. 사진을 선택하면 다음과 비슷한 내용이 나타납니다.

![](/img/posts/Alamofire-Tutorial-5.png)

Imagga는 하나의 똑똑한 API 입니다. 다음으로 이미지 색상을 가져옵니다. `downloadTags(contentID:completion:):` 아래의 ViewController 확장에 다음 메소드를 추가합니다.

```swift
func downloadColors(contentID: String, completion: @escaping ([PhotoColor]?) -> Void) {
  // 1.
  Alamofire.request("http://api.imagga.com/v1/colors",
                    parameters: ["content": contentID],
                    headers: ["Authorization": "Basic xxx"])
    .responseJSON { response in
      // 2
      guard response.result.isSuccess,
        let value = response.result.value else {
          print("Error while fetching colors: \(String(describing: response.result.error))")
          completion(nil)
          return
      }
        
      // 3
      let photoColors = JSON(value)["results"][0]["info"]["image_colors"].array?.map { json in
        PhotoColor(red: json["r"].intValue,
                   green: json["g"].intValue,
                   blue: json["b"].intValue,
                   colorName: json["closest_palette_color"].stringValue)
      }
        
      // 4
      completion(photoColors)
  }
}
```

번호가 매겨진 각 주석을 차례대로 설명합니다.

1. colors 끝점에 대해 HTTP GET요청을 수행하고 업로드 이후 받은 ID와 함께 URL Parameter `content`를 보냅니다. 다시 말하지만 `Baic xxx`를 실제 권한 헤더로 변경합니다.
2. 응답이 성공인지 확인하고, 결과(result)에 값이 들어있는지 확인합니다. 그렇지 않다면 오류를 출력하고 completion handler를 호출합니다.
3. SwifyJSON을 사용하여 응답에서 `image_colors`배열을 찾습니다. `image_colors`배열에서 각 사전 객체를 반복하고 `PhotoColor`객체로 변환 합니다. 이 객체는 색상명과 함께 RGB 포맷이 있는 컬러쌍 객체 입니다.
4. 완료 핸들러를 호출하여 서비스에서 `photoColors`를 전달합니다.

마지막으로 `upload(image:progress:compltion:)`으로 돌아가고 완료 조건 에 `donwloadTags(contentID:)`를 다음으로 교체합니다.

```swift
self.downloadTags(contentID: firstFileID) { tags in
  self.downloadColors(contentID: firstFileID) { colors in
    completion(tags, colors)
  }
}
```

이렇게하면 이미지 업로드, 태그 다운로드 및 색상 다운로드 작업이 중첩됩니다. 

프로젝트를 다시 빌드하고 실행하세요. 이번에는 색상 버튼을 선택할때 반환된 색상 태그가 표시되어야 합니다.

![](/img/posts/Alamofire-Tutorial-6.png)

이것은 PhotoColor 구조체에 매핑한 RGB색상을 사용하여 뷰의 배경색을 변경합니다. 이미지를 Imagga에 성공적으로 업로드하고 두개의 다른 끝점에서 데이터를 가져왔습니다. 먼길을 갔다왔지만 Alamofire를 사용하는 개선의 여지가 있습니다.

---

## Improving PhotoTagger

아마 PhotoTagger에서 반복되는 코드를 발견했을 것입니다. Imagga가 v2의 API를 발표하고 v1을 사용중지하면 PhotoTagger가 더이상 작동하지 않으므로 3개의 매소드 각각 URL을 업데이트 해야합니다. 마찬가지로 인증 토큰이 변경되면 모든곳에서 업데이트 됩니다.

Alamofire는 이 코드 중복을 제거하고 중앙 집중식 구성을 제공하는 간단한 방법을 제공합니다. `URLRequestConvertible`을 준수하는 구조체를 만들고 업로드 및 요청 호출을 업데이트 하는 작업을 포함합니다.

`File/New/File..`에서 새로운 Swift 파일을 생성하고 iOS 기반인 Swift 파일을 선택합니다. 다음으로 `ImaggaRouter.swift`라고 명명하고, 노란색 폴더 아이콘이 있는 PhotoTagger를 선택하고 클릭합니다.

해당 파일에 다음을 추가합니다.

```swift
public enum ImaggaRouter: URLRequestConvertible {
  // 1
  enum Constants {
    static let baseURLPath = "http://api.imagga.com/v1"
    static let authenticationToken = "Basic xxx"
  }
  
  // 2
  case content
  case tags(String)
  case colors(String)
  
  // 3
  var method: HTTPMethod {
    switch self {
    case .content:
      return .post
    case .tags, .colors:
      return .get
    }
  }
  
  // 4
  var path: String {
    switch self {
    case .content:
      return "/content"
    case .tags:
      return "/tagging"
    case .colors:
      return "/colors"
    }
  }
  
  // 5
  var parameters: [String: Any] {
    switch self {
    case .tags(let contentID):
      return ["content": contentID]
    case .colors(let contentID):
      return ["content": contentID, "extract_object_colors": 0]
    default:
      return [:]
    }
  }
  
  // 6
  public func asURLRequest() throws -> URLRequest {
    let url = try Constants.baseURLPath.asURL()
    
    var request = URLRequest(url: url.appendingPathComponent(path))
    request.httpMethod = method.rawValue
    request.setValue(Constants.authenticationToken, forHTTPHeaderField: "Authorization")
    request.timeoutInterval = TimeInterval(10 * 1000)
    
    return try URLEncoding.default.encode(request, with: parameters)
  }
}
```

위의 코드에 각 단계별 설명입니다.

1. Imagga의 baseURL과 `Basic xxx`를 실제 인증 헤더로 사용하기 유지하기 위한 `constant`를 선언합니다
2. API 끝점과 연관된 enum case를 선언합니다
3. 각 API 끝점에 대한 `HTTP method`를 반환합니다. 
4. 각 API 끝점의 `경로(Path)`를 반환합니다.
5. 각 API 끝점의 `매개변수(parameters)`를 반환합니다. 
6. 요청한 끝점에 대한 `URLRequest`를 생성하기 위해 위의 모든 구성요소를 사용하세요.

이제 모든 보일러 플레이트 코드가 한곳에 모아졌습니다, 이제 이전 코드를 업데이트 하는것이 필요합니다.

`ViewController.swift`로 돌아가서 `upload(image:progress:compltion:)`에서 다음 코드를 

```swift
Alamofire.upload(
  multipartFormData: { multipartFormData in
    multipartFormData.append(imageData,
                             withName: "imagefile",
                             fileName: "image.jpg",
                             mimeType: "image/jpeg")
  },
  to: "http://api.imagga.com/v1/content",
  headers: ["Authorization": "Basic xxx"],
```

다음과 같이 교체합니다

```swift
Alamofire.upload(multipartFormData: { multipartFormData in
  multipartFormData.append(imageData,
                           withName: "imagefile",
                           fileName: "image.jpg",
                           mimeType: "image/jpeg")
},
  with: ImaggaRouter.content,
```

`downloadTags(contentID:compltion:)`에 Alamofire.request를 다음과같이 교체합니다. 

```swift
Alamofire.request(ImaggaRouter.tags(contentID))
```

마지막으로 `downloadColors(contentID:completion:)`에 `Alamofire.request`를 다음과같이 변경합니다.

```swift
Alamofire.request(ImaggaRouter.colors(contentID))
```

> Note: 앞의 두 편집을 위해`responseJSON` 핸들러를 그대로 두십시오

마지막으로 빌드하고 실행합니다. 모든것이 이전과 같이 동작해야 합니다. 즉, 앱을 중단하지 않고 모든것을 리팩토링 했음을 의미합니다. API, 권한 부여 토큰, 매개 변수 등이 변경되면 전체 소스코드를 변경할필요가 없습니다.  

---

## Where To Go From Here?

[여기](https://koenig-media.raywenderlich.com/uploads/2018/04/PhotoTagger.zip)에서 완성된 프로젝트 버전을 다운로드 할수 있습니다. 적절하게 인증 토큰을 교체하는 것을 잊지 마세요.

이 튜토리얼에서는 기본적인 내용을 다루었습니다. Alamofire 사이트 [https://github.com/Alamofire/Alamofire](https://github.com/Alamofire/Alamofire)에서 설명서를 보고 더 깊게 알아갈수 있습니다.

또한 Alamofire의 기반인 Apple's `URLSession`에 대해 배울 시간을 가지는것도 좋습니다. 

[Networking with NSURLSession](https://developer.apple.com/videos/play/wwdc2015/711/)<br>
[URL Loading System](https://developer.apple.com/documentation/foundation/url_loading_system)<br>
[URLSession Tutorial: Getting Started](https://www.raywenderlich.com/567-urlsession-tutorial-getting-started)

---
