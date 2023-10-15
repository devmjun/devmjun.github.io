---
layout:     post
title:      "Swift, URLSession가 무엇인지, 어떻게 사용하는지 알아봅니다."
subtitle:   "URLSession Tutorial: Getting Started"
date:       2018-09-27 15:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich]
categories: archive
permalink: /archive/:title
---

## Refernece 

까칠코더님의 글을 그대로 가져왔습니다. 자료의 원주소는 아래에 있습니다.

[까칠 코더님 블로그](http://kka7.tistory.com/95)<br>
[URLSession Tutorial: Getting Started](https://www.raywenderlich.com/567-urlsession-tutorial-getting-started)<br>

---

## Contents 

- Alamofire Tutorial: Getting Started 
- Getting Started 
- Overview of URLSession 
- Data Task 
- Download Task 
	- Download Class 
- URLSessionDownloadDelegate
- Creating a Download Task
- Saving and Playing the Track
- Pausing, Resuming and Cancelling Downloads
- Showing Download Progress
- Enabling Background Transfers
- Where To Go From Here? 

---

## Alamofire Tutorial: Getting Started 

이 URLSession 튜토리얼에서 어떻게 HTTP 요청을 생성하는지 배우고, 다시 재개하고, 중단할수 있는 백그라운드 다운로드도 구현합니다

> Update 2017.6.11: Xocde 9 beta, Swift 4.0 으로 업데이트 되었습니다.

앱이 서버에서 애플리케이션 데이터를 검색하거나, 소셜미디어 상태를 업데이트 하거나 원격 저장소 파일을 디스크로 다운로드 하는등, 모바일 애플리케이션의 중심에 있는 HTTP 네트워크 요청은 마법을 일으킵니다. 네트워크 요청에 대한 수많은 요구사항을 지원하기 위해 애플은 HTTP를 통해 콘텐츠를 다운로드, 업로드 하기 위한 완성된 네트워킹 API인 `URLSession`을 제공 합니다.

이 `URLSession`튜토리얼 에서, `Half tunes`앱을 작성하는 방법을 배우고, [iTunes Search API](https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html)로 쿼리하고, 30초 미리듣기 노래를 다운로드 할수 있습니다. 완성된 앱은 백그라운드 전송을 지원하고, 다운로드를 일시 중지, 재개 또는 취소가 가능하게 만듭니다.

---

## Getting Started 

[여기](https://koenig-media.raywenderlich.com/uploads/2017/06/HalfTunes-Starter-1.zip)에서 시작 프로젝트를 다운로드 합니다. 이 프로젝트는 노래 검색을 위한, 결과를 화면에 보여주기위한 인터페이스가 구성되어 있고, 네트워킹 서비스 클레스, 저장하고 실행하기 위한 도우미 매소드 가 포함되어 있습니다. 앱의 네트워킹 부분의 구현에 집중할수 있습니다.

프로젝트를 빌드하고 실행합니다. 상단에 search bar가 있고, 빈 테이블뷰를 가진 화면을 볼수 있습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2015/08/Simulator-Screen-Shot-12-Aug-2015-11.10.57-pm.png" width="400"></center> <br>

search bar에서 쿼리를 타이핑하고, `Search`를 탭합니다. 뷰는 여전히 비어있지만 걱정하지마세요. 새로운 `URLSession` 호출과 함께 변경 할것입니다.

---

## Overview of URLSession 

시작하기전에, `URLSession`을 정확히 알고, 구성하고 있는 클레스들을 이해하는것이 중요하므로 아래의 간략한 개요를 살펴봅니다.

`URLSession`은 기술적으로 `HTTP / HTTPS 기반 요청을 처리하기 위한 클래스 및 클레스의 세트 모음`입니다. 

![](https://koenig-media.raywenderlich.com/uploads/2017/06/url_session_diagram_1.png)

`URLSession` HTTP 요청을 보내고 받는 핵심 객체 입니다. 제공되는 `URLSessionConfiguration`을 통해 다음 세가지 유형의 URL을 생성합니다.

- `.default`: 디스크 지속(disk-persisted) 전역 캐시, 자격 증명(credential) 과 쿠기 저장 객체를 사용하는 기본 구성 객체(default configuration object)를 생성합니다.
- `.ephemeral`: 모든 세션관련 데이터가 메모리에 저장된다는 점을 제외하고는 기본 구성(default configuration)과 다릅니다. 비공개(private) 새션이라고 생각하세요.
- `.background`: 새션은 업로드와 다운로드를 백그라운드에서 이행합니다. 앱 그 자체가 일시중지(suspended) 되거나 시스템에 의해 종료되는(terminated by the system) 경우에도 전송이 계속됩니다.

또한 `URLSessionConfiguration`은 시간 초과(timeout)값, 캐싱 정책, HTTP 헤더와 같은 세션 속성을 구성할수 있습니다. configuration의 옵션을 [documentation](https://developer.apple.com/reference/foundation/urlsessionconfiguration)을 참조해주세요

`URLSessionTask`는 작업 객체(task object)를 나타내는 추상 클래스 입니다. 세션은 데이터를 가져오거나 파일을 업로드, 다운로드 하는 실제 작업을 수행하는 하나 이상의 테스크를 생성합니다. 

세가지 유형의 구체적인 session tasks가 있습니다.

- `URLSessionDataTask`: 서버에서 메모리로 데이터를 검색하는 HTTP GET요청에 이 테스크를 사용합니다.
- `URLSessionUploadTask`: 전형적으로 HTTP POST, PUT 매소드를 통해서 디스크에서 웹서버로 파일을 전송할때 이 테스크를 사용하세요.
- `URLSessionDownloadTask`: 임시의 파일 위치로 원격 서버에서 파일을 다운로드할때 이 테스크를 사용하세요

![](https://koenig-media.raywenderlich.com/uploads/2017/06/url_session_diagram_2.png)

테스크를 일시정지(suspend), 재개(resume), 취소(cancel) 할수 있습니다. `URLSessionDownloadTask`는 향후에 재개(resumeption) 하기 위해 일시 정지(pause) 할수 있는 추가기능이 있습니다.

일반적으로, `URLSession`두개의 방법으로 데이터를 반환합니다: 성공 또는 실패 작업이 끝낫을때 completion handler를 통해서 전달하거나, 세션을 만들때 설정했던 delegate 매소드를 호출하여 데이터를 반환합니다.

이제 `URLSession`이 무엇을 할수 있는지에 대한 개요를 알아보았습니다. 이론은 끝났고 연습하러갑니다!

---

## Data Task 

유저가 검색하는 단어를 iTuense Search API로 쿼리하는 데이터 테스크를 생성하는것으로 시작합니다. 

`SearchVC+SearchBarDelegate.swift`에서 `searchBarSearchButtonClicked(_:)`는 먼저 네트워크 프로세스가 실행중임을 알리기 위해 상태 표시창에 네트워크 활동 표시기를 활성화합니다. 그런 다음 `QuerySearvice.swift`에서 스텁인 getSearchResults(searchTerm:completion:)을 호출합니다. 

`Networking/QueryService.swift`에서 //TODO를 다음으로 교체합니다

```swift
// 1
let defaultSession = URLSession(configuration: .default)
// 2
var dataTask: URLSessionDataTask?
```

여기에 한것이 무엇이냐면 

1. `URLSession`을 생성했고 기본 새션 구성(default session configuration)으로 초기화 되었습니다.
2. `URLSessionDataTask` 변수를 선언했고, 유저가 검색을 했을때 iTunes Search 웹 서버로 HTTP GET 요청을 만들어 사용할것입니다. 데이터 테스크는 새로운 검색어를 재작성하는 시간마다 재 초기화되어집니다. 

다음, `getSearchResults(searchTerm:completion:)` 스텁을 다음으로 교체합니다

```swift
func getSearchResults(searchTerm: String, completion: @escaping QueryResult) {
  // 1
  dataTask?.cancel()
  // 2
  if var urlComponents = URLComponents(string: "https://itunes.apple.com/search") {
    urlComponents.query = "media=music&entity=song&term=\(searchTerm)"
    // 3
    guard let url = urlComponents.url else { return }
    // 4
    dataTask = defaultSession.dataTask(with: url) { data, response, error in
      defer { self.dataTask = nil }
      // 5
      if let error = error {
        self.errorMessage += "DataTask error: " + error.localizedDescription + "\n"
      } else if let data = data,
        let response = response as? HTTPURLResponse,
        response.statusCode == 200 {
        self.updateSearchResults(data)
        // 6
        DispatchQueue.main.async {
          completion(self.tracks, self.errorMessage)
        }
      }
    }
    // 7
    dataTask?.resume()
  }
}
```

각 라인의 코맨트들을 차례로 설명합니다.

1. 새로운 사용자 쿼리의 경우, 이미 존재한다면 데이터 테스크를 취소합니다. 왜냐하면 새로운 쿼리를 위해 데이터 테스크 객체를 재사용하고 싶기 때문입니다. 
2. 쿼리 URL에서 사용자의 검색 문자열을 포함하려면, iTunes Search base URL에서 `URLComponents` 객체를 생성하고, 그 자체의 쿼리 문자열을 설정 합니다: 이렇게 하면 검색 문자열의 문자가 올바르게 생성되어 집니다.
3. `urlcomponents`의 `url` 속성이 nii이 될수 있으니, `url`로 옵셔널 바인딩 처리 합니다. 
4. 생성한 새션에서, url 쿼리와 `URLSessionDataTask`를 초기화하고 데이터 테스크가 완료되될때 completion handler를 호출합니다.
5. HTTP 요청이 성공했다면, `updateSearchResults(_:)` 도우미 매소드를 호출하고, 응답 `data`를 `tracks`배열로 구성(parses) 합니다. 
6. `main queue`로 전환하고 `SearchVC+SearchBarDelegate.swift`에 completion handler로 `tracks`을 전달합니다. 
7. 모든 작업은 기본적으로 일시정지(suspended) 상태로 시작합니다. `resume()`을 호출하면 data task가 시작됩니다.

이제 `SearchVC+SearchBarDelegate.swift`에서 `getSearchREsults(searchTerm:completion:)`의 completion handler로 전환합니다: activity indicator를 숨기고난 후에, searchReults 에서 `results`를 저장하고 테이블뷰를 업데이트 합니다. 

> Note: default 요청의 매소드는 GET 입니다. 데이터 테스크를 POST, PUt, DELETE로 원한다면, url과 함께 `URLRequest` 생성하고, request의 `HTTPMethod`속성을 적절하게 구성하고난 이후, `URL` 대신 URLRequest와 데이터 테스크를 생성합니다.

앱을 빌드하고 실행합니다. 각 노래에 대해 검색하면 다음과 같이 관련 트랙 결과가 채워진 테이블 뷰가 표시됩니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2015/08/Simulator-Screen-Shot-12-Aug-2015-11.02.34-pm.png" width="400"></center> <br>


약간의 `URLSession` 마법이 추가되어 Half Tunes는 이제 조금 기능적 입니다.

---

## Download Task 

노래 결과를 볼수 있다는 것이 좋지만, 노래를 다운로드 할 수 있으면 더 좋지 않을까요? 그것이 바로 다음번 비즈니스 순서입니다. 로컬 파일에 노래의 일부분(snippet)을 쉽게 저장할수 있도록 다운로드 작업(download task)을 사용할 것입니다.

### Download Class 

여러개의 다운로드를 조절하기 쉽도록, 활성 다운로드 상태를 유지하기 위해 먼저 사용자정의 객체를 만듭니다. 

`Model`그룹에 `Download.swift` 파일을 생성합니다.

`Download.swift`를 열고 다음 구현을 추가합니다.

```swift
class Download {

  var track: Track
  init(track: Track) {
    self.track = track
  }

  // Download service sets these values:
  var task: URLSessionDownloadTask?
  var isDownloading = false
  var resumeData: Data?

  // Download delegate sets this value:
  var progress: Float = 0

}
```

다음은 `Download`의 속성들의 간단한 설명(rundown) 입니다.

- `track`: 다운로드할 track 입니다. track의 `url` 프로퍼티는 `download`에 대해 고유한 식별자 역할을 합니다. 
- `task`: track을 다운로드 하는 `URLSessionDownloadTask`
- `isDownloading` : 다운로드가 진행중이거나 일시중지 되었는지 여부
- `resumeData` : 사용자가 다운로드 작업을 일시 중지할때 생성된Data를 저장합니다. 호스트 서버가 지원하면, 앱은 나중에 일시중지된 다운로드를 재개할 수 있습니다.
- `progress` : 다운로드의 진행정도: 0.0과 1.0 사이의 float


다음으로, `Networking/DownloadService.swift`에, 클래스의 맨 위에 다음 프로퍼티를 추가하세요.

```swfit
var activeDownloads: [URL: Download] = [:]
```

이 사진은 URL과 그자체 `download`(존재한다면)중인것 사이에 맵핑을 관리합니다.

---

## URLSessionDownloadDelegate

완료 핸들러로 다운로드 작업(download task)을 생성할 수 있으며, 방금 만든 데이터 작업(data task)과 비슷합니다. 하지만 튜토리얼 뒤에서, 다운로드 진행을 감시(monitor)하고 업데이트 할 것입니다: 이를 위해서, 사용자정의 델리게이터(delegate) 구현이 필요하므로, 지금 수행할 수도 있습니다.

몇가지 세션 델리게이터 프로토콜이 있으며, URLSession [문서(URLSession documentation)](https://developer.apple.com/documentation/foundation/urlsession)에 나열되어 있습니다. `URLSessionDownloadDelegate`는 다운로드 작업(download tasks)에 작업 수준(task-level)의 이벤트를 처리합니다.

`SearchViewcontroller`에 세션 델리게이터(delegate)를 설정하므로, 먼저 세션 델리게이터 프로토콜을 준수하는 확장을 만듭니다.

Controller 그룹에서 `SearchVC+URLSessionDelegates.swift` 이름을 가진 새로운 Swift파일을 만듭니다. 그것을 열고 다음 `URLSessionDownloadDelegate` 확장을 생성합니다.

```swift
extension SearchViewController: URLSessionDownloadDelegate {
  func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, 
    didFinishDownloadingTo location: URL) { 
    print("Finished downloading to \(location).")
  }
}
```

유일하게 옵셔널이 아닌 `URLSessionDownloadDelete`메소드는 다운로드가 완료됬을때 호출되는 `urlSession(_:downloadTask:didFinishDownloadingTo:)`입니다. 이제, 다운로드가 완료될때마다 메시지를 출력합니다.

---

## Creating a Download Task

모든 준비 작업이 끝나면, 이제 파일 다운로드를 구현할 준비가 되었습니다. 먼저 다운로드 작업을 처리할 전용 세션을 만듭니다.

`Controller/SearchViewController.swift`에서, `videDidLoad()`전에 다음 코드를 추가하세요

```swift
lazy var downloadsSession: URLSession = {
  let configuration = URLSessionConfiguration.default
  return URLSession(configuration: configuration, delegate: self, delegateQueue: nil)
}()
```

기본 구성으로 별도의 세션을 초기화 하고, 델리게이터 호출로 `URLSession` 이벤트를 받는 델리게이터(delegate)를 지정합니다. 이것은 작업의 진행상황을 모니터링하는데 유용할 것입니다.

델리게이터 큐를 `nil`로 설정하면 세션은 델리게이터 메소드와 완료 핸들러를 모두 호출하는 직렬 작업 큐를 생성합니다.

`downloadsSession`의 생성이 lazy 인것을 주의하세요: 이렇게 하면 세션 초기화에 델리게이터 매개변수로 self를 전달할 수 있는 뷰 컨트롤러가 초기화 될때까지 세션 생성이 지연됩니다.

이제 `viewDidLoad()`의 마지막에 다음 줄을 추가합니다.

```swift
downloadService.downloadsSession = downloadsSession
```

`DownloadService`의 `downloadsSession`프로퍼티를 설정합니다.

세션과 델리게이터가 구성되어, track 다운로드를 사용자가 요청할때 마침내 다운로드를 생성할 준비가 되어 있습니다.

`Networking/DownloadService.swift`에서, `startDownload(_:)` 부분을 다음 구현으로 교체합니다.

```swift
func startDownload(_ track: Track) {
  // 1
  let download = Download(track: track)
  // 2
  download.task = downloadsSession.downloadTask(with: track.previewURL)
  // 3
  download.task!.resume()
  // 4
  download.isDownloading = true
  // 5
  activeDownloads[download.track.previewURL] = download
}
```

사용자가 테이블뷰 셀의 `Download`버튼을 누를때, TrackCellDelegate로 동작하는 `SearchViewController`는, 셀에 대한 `Track`를 식별하고, 이 `Track`으로 `startDownload(_:)` 호출합니다.

1. 먼저 track으로 `Download`를 초기화 합니다.
2. 새로운 세션 객체를 사용하여, track의 미리보기 URL로 `URLSessionDownloadTask`를 생성하고, `Download`의 `task`프로퍼티를 설정합니다.
3. `resume()`를 호출해서 다운로드 작업을 시작합니다.
4. 다운로드가 진행중임을 나타냅니다.
5. 마지막으로, `activeDownloads`디렉토리 안에 `Download`로 다운로드 URL을 매핑합니다.


앱을 빌드하고 실행합니다: 모든 트랙을 검색하고 셀에서 `Download`버튼을 누릅니다. 잠시 후에, 다운로드가 완료되었음을 알리는 디버그 콘솔 메시지가 표시됩니다. 다운로드 버튼은 남아있지만, 곧 수정될 것입니다. 먼저 몇가지 노래를 재생하길 원합니다!

---

## Saving and Playing the Track

다운로드 작업이 완료될때, 임시 파일 위치에 대한 `URL`로`urlSession(_:downloadTask:didFinishDownloadingTo:)`를 제공합니다: 출력 메시지에서 이것을 보았습니다. 여러분이 할일은 메소드에서 반환되기 전에 앱의 샌드박스 컨테이너 디렉토리에 있는 영구저장 위치로 이동하는 것입니다.

`SearchVC+URLSessionDelegates`에서, `urlSession(_:downloadTask:didiFinishDownloadingTo:)`에 있는 출력 구문을 다음 코드로 교체합니다

```swift
// 1
guard let sourceURL = downloadTask.originalRequest?.url else { return }
let download = downloadService.activeDownloads[sourceURL]
downloadService.activeDownloads[sourceURL] = nil
// 2
let destinationURL = localFilePath(for: sourceURL)
print(destinationURL)
// 3
let fileManager = FileManager.default
try? fileManager.removeItem(at: destinationURL)
do {
  try fileManager.copyItem(at: location, to: destinationURL)
  download?.track.downloaded = true
} catch let error {
  print("Could not copy file to disk: \(error.localizedDescription)")
}
// 4
if let index = download?.track.index {
  DispatchQueue.main.async {
    self.tableView.reloadRows(at: [IndexPath(row: index, section: 0)], with: .none)
  }
}
```

다음은 각 단계에서 하는 일입니다.

1. 작업(task)에서 원래 요청 `URL`을 추출하며, 활성 다운로드에서 `Download`와 일치하는 것을 찾고 디렉도리에서 제거합니다.
2. `SearchViewcontroller.swif`에서 `localFilePath(for:)` 도우미 메소드에 앱의 `Documents` 디렉토리의 경로에 `URL`의 `lastPathComponent`를 추가해서 저장할 로컬 영구 파일 경로를 생성한 URL(파일 이름과 파일의 확장자)을 전달합니다.
3. `FileManager`을 사용해서, 임시파일 위치에서 다운로드된 파일을 원하는 목적지 파일 경로로 이동하며, 먼저 복사 작업을 시작하기 전에 그 위치에 있는 항목들을 정리합니다. 다운로드 작업의 `downloaded`프로퍼티를 `true`로 설정합니다.
4. 마지막으로, 해당 셀을 다시 로딩하기 위해 다운로드 track의 index프로퍼티를 사용합니다.


프로젝트를 빌드하고 실행합니다. 조회한 후에 트랙(track)을 선택하고 다운로드 합니다. 다운로드가 완료될때, 콘솔에서 파일 경로 위치가 출력되는 것을 볼수 있습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2015/08/Screen-Shot-2015-08-16-at-8.03.30-pm.png" width="700"></center> <br>


델리게이터 메소드가 트랙의 `downloaded`프로퍼티를 `true`로 설정하였기 때문에 다운로드 버튼은 사라집니다. 트랙을 탭하고 `AVPlayerViewController`에서 재생되는 것을 듣게 될 것입니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2015/08/Simulator-Screen-Shot-17-Aug-2015-1.45.28-am.png" width="400"></center> <br>


---

## Pausing, Resuming and Cancelling Downloads

사용자가 다운로드를 일시정지하거나 완전히 취소하려면 어떻게 하나요? 이 섹션에서, 사용자가 다운로드 프로세스를 완전히 제어할수 있도록 일시정지, 재개, 취소 기능을 구현할 것입니다.

사용자가 활성 다운로드를 취소하는것을 허용하여 시작할 것입니다.

`DownloadService.swift`에서 `cancelDownload(_:)` 부분을 다음 코드로 교체합니다.

```swift
func cancelDownload(_ track: Track) {
  if let download = activeDownloads[track.previewURL] {
    download.task?.cancel()
    activeDownloads[track.previewURL] = nil
  }
}
```

다운로드를 취소하기 위해, 활성 다운로드의 디렉토리에 있는 해당 Download로 부터 다운로드 작업을 가져오고, 작업을 취소하기 위해 `cancel()`을 호출합니다. 그리고나서 활성 다운로드의 디렉토리에서 다운로드 객체를 제거합니다.

다운로드를 일시정지하는 것은 개념적으로 취소와 비슷합니다: 일시중지하면 다운로드 작업을 취소 되지만, 호스트 서버가 이 기능을 지원하는 경우, 나중에 다운로드를 재개할때 필요한 정보인 `resume data`를 생성합니다.

> Note: 특정 조건하에서만 다운로드 재개할 수 있습니다. 예를들어, 리소스를 처음 요청한 후에 변경되어서는 안됩니다. 전체 조건 목록을 보려면, [여기](https://developer.apple.com/documentation/foundation/urlsessiondownloadtask/1411634-cancel) 문서에서 확인하세요.

이제, `pauseDownload(_:)` 부분을 다음 코드로 교체합니다.

```swift
func pauseDownload(_ track: Track) {
  guard let download = activeDownloads[track.previewURL] else { return }
  if download.isDownloading {
    download.task?.cancel(byProducingResumeData: { data in
      download.resumeData = data
    })
    download.isDownloading = false
  }
}
```

여기에서 중요한 차이점은 `cancel()` 대신에 `cancel(byProducingResumeData:)`호출하는 것입니다. 이 메소드에 나중에 재개하기 위해 적절한 `Download`로 재개한 데이터를 저장하는 클로져 매개변수를 제공합니다.

또한, 다운로드가 일시정지된 것을 나타내기 위해 `Download`의 `isDownloading`프로퍼티를 `false`으로 설정합니다.

일시정지 기능이 완료되면, 다음 업무 순서는 일시정지된 다운로드를 재개를 허용하는 것입니다.

`resumeDownload(_:)` 부분을 다음 코드로 교체합니다.

```swift
func resumeDownload(_ track: Track) {
  guard let download = activeDownloads[track.previewURL] else { return }
  if let resumeData = download.resumeData {
    download.task = downloadsSession.downloadTask(withResumeData: resumeData)
  } else {
    download.task = downloadsSession.downloadTask(with: download.track.previewURL)
  }
  download.task!.resume()
  download.isDownloading = true
}
```

사용자가 다운로드를 재개할때, 재개할(`resume`) 데이터 존재에 대해 적절한 `Download`를 확인합니다. 재개할 데이터를 찾으면, 재개(`resume`) 데이터로 `downloadTask(withResumeData:)`를 호출해서 새로운 다운로드 작업을 생성합니다. 어떤 이유로 재개할 데이터가 없는 경우, 다운로드 URL로 새로운 다운로드 작업을 생성합니다.

두 경우 모두 `resume()`를 호출해서 작업을 시작하고, 다운로드가 재개되었음을 나타내기 위해, `Download`의 `isDownloading` 플래그를 `true`로 설정합니다.

이러한 3가지 함수가 제대로 동작하기 위해 한가지가 남아있습니다: 필요에 따라 일시중시/재개와 취소 버튼들을 표시하거나 숨길 필요가 있습니다. 이렇게 하려면, `TrackCell configure(track:downloaded:)` 메소드는 트랙(track)이 활성 다운로드인지와 현재 다운로드 중인지에 대한 여부를 확인이 필요합니다.

`TrackCell.swift`에서, `configure(track:downloaded:)`를 `configure(track:downloaded:download:)`로 변경합니다.

```swift
func configure(track: Track, downloaded: Bool, download: Download?) {
```

`SearchViewController.swift`에서, `tableView(_:cellforRowAt:)` 호출을 수정합니다

```swift
cell.configure(track: track, downloaded: track.downloaded, 
  download: downloadService.activeDownloads[track.previewURL])
```

여기에서, `activeDownloads`디렉토리로부터 트랙(`track`)의 다운로드 객체를 추출합니다.

TrackCell.swift로 돌아가서, `configure(track:downloaded:download:)`에서 TODO 위치로 갑니다. 첫번째 // TODO를 다음 프로퍼티로 교체합니다.

```swift
var showDownloadControls = false
```

그리고 두번재 // TODO를 다음 코드로 교체합니다.

```swift
if let download = download {
  showDownloadControls = true
  let title = download.isDownloading ? "Pause" : "Resume"
  pauseButton.setTitle(title, for: .normal)
}
```

주석을 주의하며, nil이 아닌 다운로드 객체는 다운로드 진행중임을 의미하므로, 셀에 다운로드 컨트롤이 보여야 합니다: 일시정지/재개, 취소. 일시정지와 재개 함수는 동일한 버튼을 공유하므로, 버튼을 두가지 상태 간에 적절하게 토글(toggle)합니다.

이 if절 아래에 다음 코드를 추가하세요.

```swift
pauseButton.isHidden = !showDownloadControls cancelButton.isHidden = !showDownloadControls
```

다음은, 다운로드가 활성화된 경우에만 셀 버튼을 표시합니다.

마지막으로, 이 메소드의 마지막 줄에 아래의 코드를 

```swift
downloadButton.isHidden = downloaded
```

다음으로 교체합니다

```swift
downloadButton.isHidden = downloaded || showDownloadControls
```

다음은, 해당 트랙이 다운로드중인 경우, 다운로드 버튼을 숨기도록 셀에게 말합니다.

프로젝트를 빌드하고 실행합니다; 동시에 몇개의 트랙을 다운로드 하고 일시 중시, 재개, 취소 할수 있습니다.

> Note: 재개(Resume)를 누른 후에 다운로드가 중단되면, 일시정지(Pause)를 누른다음에, 재개(Resume)를 다시 누릅니다. 이것은 다운로드 세션 구성을 `URLSessionConfiguration.background(withIdentifier: "bgSessionConfigureation")`으로 변경할때 사리지는 신비한 버그 입니다.

<center><img src="/img/posts/URLSession-0.png" width="400"></center> <br>


---

## Showing Download Progress

현재, 앱은 다운로드 진행률을 표시하지 않고 있습니다. 사용자 경험을 개선하기 위해, 다운로드 진행률 이벤트를 대기하고 셀에서 진행률을 보여주도록 앱을 변경할 것입니다. 이러한 작업에 완벽한 세션 델리게이트 메소드가 있습니다.

먼저, `TrackCell.swift`에 다음에 오는 도우미 메소드를 추가합니다:

```swift
func updateDisplay(progress: Float, totalSize : String) {
  progressView.progress = progress
  progressLabel.text = String(format: "%.1f%% of %@", progress * 100, totalSize)
}
```

트랙 셀은 `progressView`와 `progressLabel` 아울렛이 있습니다. 델리게이트 메소드는 값을 설정하기 위해 도우미 메소드를 호출할 것입니다.

다음으로, `SearchVC+URLSessionDelegates.swift`에, `URLSessionDownloadDelegate` 확장에 다음에 오는 델리게이트 메소드를 추가하세요:

```swift
func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, 
  didWriteData bytesWritten: Int64, totalBytesWritten: Int64, 
  totalBytesExpectedToWrite: Int64) {
  // 1
  guard let url = downloadTask.originalRequest?.url,
    let download = downloadService.activeDownloads[url]  else { return }
  // 2
  download.progress = Float(totalBytesWritten) / Float(totalBytesExpectedToWrite)
  // 3
  let totalSize = ByteCountFormatter.string(fromByteCount: totalBytesExpectedToWrite, countStyle: .file)
  // 4
    DispatchQueue.main.async {
    if let trackCell = self.tableView.cellForRow(at: IndexPath(row: download.track.index,
      section: 0)) as? TrackCell {
      trackCell.updateDisplay(progress: download.progress, totalSize: totalSize)
    }
  }
}
```

델리게이트 메소드를 단계별로 살펴보면 다음과 같습니다:

1. 제공된 `downloadTask`의 `URL`을 추출하고 활성 다운로드 디렉토리에서 `Download`와 일치하는 것을 찾는데 사용합니다.
2. 또한 메소드는 작성된 전체 바이트와 예상하는 전체 바이트를 작성을 제공합니다. 진행률을 두 값의 비율로 계산하고 결과를 다운로드에 저장합니다. 트랙(track) 셀(cell)은 진행률 뷰를 업데이트하기 위해 이 값을 사용할 것입니다.
ByteCountformatter은 바이트 값을 가지고 전체 다운로드 파일 크그를 사람이 읽기좋은 문자열로 만들어줍니다. 이 문자열을 다운로드 완료 비율과 함께 `다운로드` 크기를 표시하는데 사용할 것입니다.
4. 마지막으로, Track을 표시할 셀을 찾고, 셀의 도우미 메소드를 호출해서 이전 단계에서 가져온 값을 진행률과 진행률 라벨을 업데이트 합니다. 이것은 UI와 관련되어 있으며, 메인 큐에서 수행합니다.
이제, 셀의 구성을 업데이트하고, 다운로드 진행중일때 진행상태와 뷰를 적절하게 보여줍니다.

`TrackCell.swift`를 엽니다. `configure(track:downloaded:download:)`에, 일지정지 버튼 타이틀이 설정한 후에 다음에 오는 줄을 if-클로져 안쪽에 추가하세요:

```swift
progressLabel.text = download.isDownloading ? "Downloading..." : "Paused"
```

이것은 델리게이터 메서드로부터 처음 업데이트 하기 전에, 다운로드가 일시정지된 동안에 셀에서 보여주는 것을 제공합니다.

그리고 두 버튼들에 대한 isHidden행 아래에, if-클로저 아래에 다음 코드를 추가하세요.

```swift
progressView.isHidden = !showDownloadControls
progressLabel.isHidden = !showDownloadControls
```

버튼에 관해서, 진행 뷰와 라벨은 다운로드가 진행중일때만 보여줍니다.

프로젝트를 빌드하고 실행합니다; 트랙을 다운로드하고 다운로드가 진행됨에 따라 진행 바 상태가 업데이트 됩니다.

![](https://koenig-media.raywenderlich.com/uploads/2015/08/Screen-Shot-2015-08-17-at-11.02.03-pm.png)

만세, 진행되도록 만들었습니다! :]

---

## Enabling Background Transfers

이 시점에 앱은 매우 기능적이지만, 추가해야 할 중요한 개선 사항이 하나 있습니다: 백그라운드 전송입니다. 이 모드는 앱이 백그라운드로 작동하거나 어떤 이류로든 크래쉬나더라도 다운로드는 계속 됩니다. 이것은 실제로 매우 작은 노래 일부(snippets)에서는 필요하지 않지만, 앱이 대용량 파일을 전송하는 경우에 사용자가 이 기능을 만족할 것입니다.

앱이 실행중이지 않는데 어떻게 이 작업을 알수 있나요? OS는 백그라운드 전송 작업을 관리하기 위해 앱 외부에서 별도의 데몬을 실행하고 다운로드 작업을 실행할때 앱에 적절한 델리게이터 메시지를 보냅니다. 활성 전송중에 앱이 종료되는 경우, 그 작업은 백그라운드에서 영향받지 않고 계속 실행됩니다.

작업이 완료될때, 데몬은 백그라운드에서 앱을 다시 시작합니다. 다시 실행된 앱은 백그라운드 세션을 다시 생성할 것이며, 관련된 완료 델리게이터 메시지를 받고, 다운로드한 파일을 디스크의 영구 저장하는등 필요한 모든 작업을 수행 할 것입니다.

> Note: 사용자가 앱 전환기(switcher)에서 강제 종료해서 앱을 종료한 경우에, 시스템은 세션의 백그라운드 전송을 모두 취소할 것이고 앱을 다시 시작하려고 시도하지 않을 것입니다.

background 세션 구성으로 세션을 생성해서 이 마법에 접근합니다.

`SearchViewController.swift`에서 `downloadsSession`의 초기화에서, 다음 코드를 찾아서:

```swift
let configuration = URLSessionConfiguration.default
```

그리고 다음과같이 교체합니다

```swift
let configuration = URLSessionConfiguration.background(withIdentifier: 
  "bgSessionConfiguration")
```

기본 세션 구성을 사용하는 대신에, 특별한 백그라운드 세션 구성을 사용합니다. 필요한 경우에, 세션의 고유 식별자를 설정해서 앱에 새로운 백그라운드 세션을 만들수 있는 것을 주의합니다.

> Note: 시스템이 구성의 식별자를 사용해서 작업을 세션과 연관시키기 때문에, 백그라운드 구성을 위해서 한 세션 이상을 생성해서는 안됩니다.

앱이 실행중이지 않을때 백그라운드 작업이 완료된 경우, 앱은 백그라운드에서 다시 실행됩니다. 앱 델리게이터에서 이 이벤트를 처리해야 합니다.

`AppDelegate.swift`로 전환하여, 클래스의 맨위쪽에 다음 코드를 추가하세요.

```swift
var backgroundSessionCompletionHandler: (() -> Void)?
```

다음으로, AppDelegate.swift에 다음 메소드를 추가하세요.

```swift
func application(_ application: UIApplication, handleEventsForBackgroundURLSession 
  identifier: String, completionHandler: @escaping () -> Void) {
  backgroundSessionCompletionHandler = completionHandler
}
```

여기에서, 나중에 사용할 수 있도록 제공된 앱 델리게이터에 `completionHandler`을 변수로 저장합니다.

`application(_:handleEventsForBackgroundURLSession:)`은 완료된 백그라운드 작업을 처리하기 위해 앱을 깨웁니다. 여러분은 이 메소드에서 두가지를 처리해야 합니다.

- 첫번째, 앱은 적절한 백그라운드 구성과 세션을 다시 만들고, 델리게이터 메소드에 제공된 식별자를 사용합니다. 하지만 앱은 SearchViewController를 인스턴스화 할때 백그라운드 세션을 생성하므로, 이 시점에 이미 다시 연결되어 있습니다.
- 두번째, 델리게이터 메소드에 제공하는 완료 핸들러를 캡쳐해야 합니다. 완료 핸들러를 호출하면 OS에 앱이 현재 세션에 대한 모든 백그라운드 활동으로 작업이 완료되었음을 알리고, 또한 OS가 업데이트 된 UI를 스냅샷해서 앱 전환기에 표시합니다.


제공된 완료 핸들러를 호출할 곳은 `urlSessionDidFinishEvents(forBackgroundURLSession:)`입니다: 백그라운드 세션과 관련된 모든 작업이 완료되면 `URLSessionDelegate` 메서드가 실행됩니다.

`SearchVC+URLSessionDelegates.swift`에서 import를 찾습니다.

```swift
import Foundation
```

그리고 아래에 다음 코드를 추가합니다

```swift
import UIKit
```

마지막으로, 다음 확장을 추가하세요.

```swift
extension SearchViewController: URLSessionDelegate {

  // Standard background session handler
  func urlSessionDidFinishEvents(forBackgroundURLSession session: URLSession) {
    DispatchQueue.main.async {
      if let appDelegate = UIApplication.shared.delegate as? AppDelegate,
        let completionHandler = appDelegate.backgroundSessionCompletionHandler {
        appDelegate.backgroundSessionCompletionHandler = nil
        completionHandler()
      }
    }
  }
}
```

위 코드는 단순히 앱 델리게이트에서 저장된 완료 핸들러를 가져와서 메인스레드에서 호출합니다. UIKit 가져오기(import)로 접근할수 있는 UIapplication에서 공유된 델리게이터를 가져와서 앱 델리게이터를 참조합니다.

앱을 빌드하고 실행합니다: 동시에 몇가지 다운로드를 시작하고 Home버튼을 눌러 앱을 백그라운드로 보냅니다. 다운로드가 완료될때까지 기다린 다음에 홈 버튼을 두번 눌러 앱 전환기를 보여줍니다.

다운로드가 왼료되면, 새로운 상태가 앱 스냅샷에 반영됩니다. 앱을 열어 다음을 확인합니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2015/08/Simulator-Screen-Shot-19-Aug-2015-1.06.24-am.png" width="400"></center> <br>

이제 완벽한 기능을 갖춘 음액 스트리밍 앱을 가지고 있습니다! 이제 애플 뮤직으로 이동하세요! :]


---

## Where To Go From Here? 

이 튜토리얼에 대한 완료 프로젝트를 [여기](https://koenig-media.raywenderlich.com/uploads/2017/06/HalfTunes-Final-3.zip)에서 다운로드 받을 수 있습니다.

축하합니다! 앱에서 가장 일반적인 네트워킹 요구사항을 처리할 준비가 잘 되어 있습니다. 이 튜토리얼에서 제공하는 것보다 많은 URLSession 항목들이 있으며, 예를들어, 타임아웃 값과 개싱 정책과 같은, 업로드 작업과 세션 구성 설정입니다.

이러한 기능(다른것들)에 대해 자세히 알아보려면, 다음을 참고합니다:

- 애플의 [URLSession Programming Guide](https://developer.apple.com/documentation/foundation/url_loading_system#//apple_ref/doc/uid/TP40013509-SW1)에서 원하는 모든 것들을 자세히 포함되어 있습니다.
- Raywenderlich의 [Networking with URLSession](https://www.raywenderlich.com/3986-networking-with-urlsession/lessons/1) 비디오 과정으로 HTTP 기초로 시작하고, 백그라운드 세션, 인증, 앱 전송 보안(App Transport Security), 아키텍쳐와 단위테스트까지 다룹니다.
- [Alamofire](https://github.com/Alamofire/Alamofire)는 유명한 서드파이 iOS 네트워크 라이브러리입니다. [Beginning Alamofire](https://www.raywenderlich.com/35-alamofire-tutorial-getting-started) 튜토리얼에서 기본 사항을 다뤘습니다.

---

