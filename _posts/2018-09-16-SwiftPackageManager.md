---
layout:     post
title:      "Swift, Package Manager"
subtitle:   "Swift Package Manager가 무엇인지 알아봅니다"
date:       2018-09-16 17:45:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich]
---

[An Introduction to the Swift Package Manager](https://www.raywenderlich.com/750-an-introduction-to-the-swift-package-manager)의 내용을 의역 했습니다. 

---

## Contents 

- An Introduction to the Swift Package Manager
- Getting started 
- Creating the Library 
- Creating the Executable
- Generating an Xcode Project with The Swift Package Manager
- Where to Go From Here?
- Reference 


---

## An Introduction to the Swift Package Manager

이 튜토리얼에서는 Swift Package Manager를 사용하여 실행 가능한 패키지와 라이브러리 패키지를 만듭니다.

Swift 3.0과 함께 공식적으로 출시된 Swift Package Manager는 `MacOS` 및 `Linux`에서 Swift 라이브러리 및 애플리케이션을 만드는 새로운 방법입니다. 의존성 관리를 도와주고 Swift 코드를 쉽게 테스트, 작성, 실행 할수있습니다.

Swift Package Manger는 스위프트 생태계(Ecosystem)을 대폭 향상 시켜 Linux와 같은 Xcode가 없는 플랫폼에서 Swift를 훨씬 쉽게 사용하고 배포 할수 있도록 도와줍니다. 또한 Swift Package Manager는 많은 상호 의존하는 라이브러리를 사용할때 발생할수 있는 [의존성 문제](https://en.wikipedia.org/wiki/Dependency_hell)를 해결합니다. 

Swift3 에서 Swift Package Manager는 호스트 플랫폼용 으로만 컴파일된다는 점을 유의해야합니다. 

---

## Getting started 

시작하기전에 Swift 3.0 이상이 설치되어있는지 확인합니다. Swift 3는 Xcode 8.0+ 과함께 구성되어있고, Xcode 8 이상 버전을 가지고 있다면 시작할 준비가 되었습니다. 이 튜토리얼에서 대부분을 완성하기 위해 실제로 `Xcode`가 필요하지 않습니다. [swift.org](https://swift.org/download/#releases)에서 Swift 3을 간단하게 설치할 수 있습니다.

터미널을 열고 `swift package`를 타이핑 합니다. 명령어들의 개요를 볼수 있습니다. 주로 사용할 명령어는 다음과 같습니다.  

1. `swift package init`: 새로운 패키지들을 생성합니다
2. `swift package update`: 패키지의 의존성들을 업데이트 합니다
3. `swift package generate-xcodproj`: 패키지의 Xcode 프로젝트를 생성합니다. 

Swift Package Manger에 대해서 배우고, 작은 라이브러리를 사용하여 어떤 국가들에 대해서 emoji flag를 인쇄하는 커맨드라인 앱을 만들어 봅니다. 실행 가능한 패키지(executable package)를 생성하는것으로 시작합니다. 실행 가능한 패키지 매니저들은 커맨드 라인 앱을 위한 패키지들 입니다. Swift 웹 앱 또한 이 범주에 속합니다. 

터미널에서 다음 명령을 실행하여 깃발 실행 패키지(flag executable package)를 만듭니다.

```
mkdir Flag
cd Flag
swift package init --type executable 
```

현재 `flag`디렉토리는 `swift package init`을 실행할때 중요합니다. 왜냐하면 생성된 패키지의 이름이 되기 때문입니다. 생성된 결과물에서 몇개의 폴더들과 파일들을 볼수 있습니다. 프로젝트 구조에 익숙해지려면 잠시 시간을 가져봅니다

<center><img src="/img/posts/SwiftPacageManager_0.png" width="500" height="350"></center> <br>


1. `Package.swift`는 패키지 설명이 있으며, 패키지의 의존성도 가지고 있습니다. 
2. `Sources/` 또한 이름처럼 모든 Swift 소스파일을 가져올 곳입니다. `main.swift` 파일 또한 생성 되었습니다. 애플리케이션의 진입점(entry point)가 될것입니다. 지금 `hello, world`를 터미널에서 출력 합니다.
3. `Tests/`는 `XCTest`로 작성한 unit test들을 포함합니다. 

다시 터미널로 돌아가서 다음을 실행합니다.

```swift
swift build
```

이렇게하면 패키지가 빌드되고 `.build/debug/flag`에서 실행 파일이 작성됩니다. 앱을 실행합니다.

```
.build/debug/Flag
```

`Hello, world!` 문구를 봐야합니다. 
축하합니다: 첫번째 Swift package를 생성하고 실행했습니다.

---

## Creating the Library 

국기에 대한 이모티콘을 생성하는 실제 작업을 수행하려면 `Atlas`라는 라이브러리를 생성합니다. 그런 다음 `Flag` 애플리케이션에서 이 라이브러리를 사용할수 있습니다.

플래그 패키지 외부로 이동하여 터미널에 다음 명령을 입력하여 라이브러리 패키지를 작성하세요.

```swift
cd ..
mkdir Atlas
cd Atlas
swift package init --type library
```

Swift Package Manager는 다시 몇개의 파일과 폴더들을 생성합니다. 

<center><img src="/img/posts/SwiftPacageManager_1.png" width="500" height="350"></center> <br>


이번에는 `main.swift`대신 `Atlas.swift`가 생깁니다. 이 파일과 `Sources/`에 있는 다른 파일은 라이브러리와 함께 가져옵니다. 실제로 라이브러리(library)와 실행 파일(executable)의 차이는 `main.swift`의 존재 입니다.

이번에는 하나의 예제 테스트를 가집니다. `swift test`로 tests를 실행합니다. Swift Package Manager가 라이브러리를 컴파일하고 테스트를 실행합니다.

> Note: AtlasTests의 테스트 케이스 클레스와 Tests/디렉토리와 `allTests`속성에서 `LinuxMain.swift`를 발견했을 것입니다. 이 두가지 모두 XCTests 테스트가 Linux에서 작동하는데 필요합니다. Linux에는 Objective-C 런타임이 없으므로 실행할 접두사 테스트로 시작하는 메소드를 자동으로 찾습니다. 새 테스트 메소드를 추가할 때마다 예제와 마찬가지로 ₩allTests₩ 속성을 업데이트 한 다음 패키지에 추가한 각 테스트 케이스 클래스로 `LinuxMain.swift`를 업데이트 해야합니다.

텍스트 편집기로 `Atlas.swift`를 열고 다음으로 내용을 변경합니다

```swift
public struct Country {
  public let code: String

  public init(code: String) {
    self.code = code.uppercased()
  }

  public var emojiFlag: String {
    return "\u{1f1f5}\u{1f1f7}"
  }
}
```

ISO country code로 초기화할수있는 Country 구조체를 구현합니다. emojiflag 속성은 해당 코드의 깃발를 반환합니다. 지금은 테스트를 작성할수 있도록 최소한만 구현합니다. 

또한 여기에 있는 모든 항목은 `public`으로 표시되므로 각 맴버는 Atlas 모듈을 사용하는 코드에서 볼수 있습니다. 

이제 AtlasTEst.swift를 열고 내용을 다음과 같이 변경합니다

```swift
import XCTest
@testable import Atlas

class AtlasTests: XCTestCase {
  func testAustria() {
    XCTAssertEqual(Country(code: "AT").emojiFlag, "\u{1f1e6}\u{1f1f9}")
  }

  func testTurkey() {
    XCTAssertEqual(Country(code: "TR").emojiFlag, "\u{1f1f9}\u{1f1f7}")
  }

  func testUnitedStates() {
    XCTAssertEqual(Country(code: "US").emojiFlag, "\u{1f1fa}\u{1f1f8}")
  }
}

extension AtlasTests {
  static var allTests : [(String, (AtlasTests) -> () throws -> Void)] {
    return [
      ("testAustria", testAustria),
      ("testTurkey", testTurkey),
      ("testUnitedStates", testUnitedStates)
    ]
  }
}
```

여기서 세 가지 테스트를 구현합니다. 세 가지 다른 국가를 만든다음 올바른 이모티콘 깃발가 있다고 주장합니다.

테스트를 실행합니다

```
swift test
```

세번의 테스트가 실행되고 세번의 테스트가 실패한것을 확인해야합니다. 

이제는 실패한 테스트가 있으므로 테스트를 통과시켜야합니다. 

이모티콘 깃발이 작동하는 방식은 매우 간단합니다. AT와 같은 국가 코드가 주어지면, 각 문자를 소위 지역 표시 기호(regional indicator symbol)로 변환해야합니다. 그것은 예를들어 🇦, 🇹 입니다. 이것들을 함께 놓을때 이모지 깃발을 얻습니다.

<center><img src="/img/posts/SwiftPacageManager_2.png" width="500" height="350"></center> <br>

`Atlas.swift`로 이동하고 `Country`구조체에 다음 매소드를 추가합니다

```swift
func regionalIndicatorSymbol(unicodeScalar: UnicodeScalar) -> UnicodeScalar? {
  let uppercaseA = UnicodeScalar("A")!
  let regionalIndicatorSymbolA = UnicodeScalar("\u{1f1e6}")!
  let distance = unicodeScalar.value - uppercaseA.value
  return UnicodeScalar(regionalIndicatorSymbolA.value + distance)
}
```

여기서 문자(letteres)와 지역 표시 기호(regional indicator symbols)가 논리적으로 서리 인접한 값에 대해 유니코드 표에서 서로 옆에 있따는 사실을 이용합니다. 그래서 A가 65라면 B는 66뿐이며 🇦가 127462 이면 🇧은 127463 입니다. 따라서 문자 P를 지역 표시 기호로 변환하려면 A와 P 사이의 거리를 구한 다음 그 거리를 더할 필요가 있습니다.

어려운 부분이었습니다. 이제 이 방법을 사용했으므로 나머지는 쉽습니다. `emojiFlag` 속성을 다음으로 변경합니다.

```swift
public var emojiFlag: String {
  return code.unicodeScalars.map { String(regionalIndicatorSymbol(unicodeScalar: $0)!) } .joined()
}
```

국가 코드를 각 문자의 배열로 변환한 다음 각 문자를 해당 지역 표시 기호로 변환하고 다시 결합합니다. 이렇게하면 깃발을 가져옵니다.

테스트를 다시 실행하고 세 가지 테스트가 보두 통과합니다.

Swift 패키지를 만드는 다음 단계는 코드를 Git으로 커밋하고, 버전과 함께 테깅 하는것입니다. 첫번째 버전이기 때문에 1.0.0 이라고 부릅니다.

Git repo를 만들고 태그를 지정하려면 다음 명령을 실행하세요. 

```
git init
git add .
git commit -m "Initial commit"
git tag 1.0.0
```

---

## Creating the Executable

이모지 깃발 라이브러리가 생겼으므로 이 라이브러리를 Flag executable package에 의존성으로 추가할수 있습니다. 

`Flag` 디렉토리로 돌아가서 `Package.swift` 파일을 엽니다. 내용은 다음과 같습니다.

```swift
import PackageDescription

let package = Package(
  name: "Flag"
)
```

모든 Swift Package는 이와같은 설명이 있습니다. 사용할 가장 중요한 매개변수는 `dependencies` 매개변수 입니다. `PackageDescription`을 다음으로 대체합니다.

```swift
let package = Package(
  name: "Flag",
  dependencies: [
    .package(url: "../Atlas", "1.0.0")
  ]
)
```

위의 경우 Flag package의 상태는 `../Atlas`의 URL과 단일 의존성을 가지며 버전이 1.0.0이어야한다고 명시했ㅅ브니다.

버전은 의미론적인 버전(semantic versioning)을 사용해야합니다. 이것은 버전이 `MAJOR.MINOR.PATCH`처럼 보이는걸 의미합니다. MAJOR버전은 이전 버전과 호환되지 않는 변경 사항을 나타냅니다. MINOR버전은 이전 버전과 호환되는 방식으로 변경됩니다. 패치 버전은 버그 수정을 위한 것입니다. 의미 론적 버전관리에 대한 자세한 내용은 [여기](https://semver.org/)를 참조하세요. 

대부분의 경우 버그 수정이나 사소한 개선을 통해 라이브러리의 최신 버전으로 자동 업데이트 하려고 합니다. 편리하게 Swift Package Manager는 이를 수행할수 있습니다. 패키지 설명을 다음과같이 변경하세요.

```swift
let package = Package(
  name: "Flag",
  dependencies: [
    .package(url: "../Atlas", majorVersion: 1)
  ]
)
```

> 위의 명령어 대신 아래의 명령어를 사용했습니다. 

```swift
let package = Package(
    name: "Flag",
    dependencies: [
        .package(url: "../Atlas", from: "1.0.0"),
    ],
    targets: [
        .target(name: "Flag", dependencies: ["Atlas"]),
    ]
)
```

Swift Package Manager는 업데이트할 라이브러리의 정확한 버전이나 버전을 정확하게 지정할수 있는 더욱 다양한 방법을 제공합니다. [여기](https://github.com/apple/swift-package-manager/tree/master/Documentation)에서 자세한 내용을 참조하세요.


패키지를 빌드합니다

```
swift build
```

Swift Package Manger는 라이브러리를 가져와서 빌드하고 실행 파일에 연결합니다. 구조는 다음과같이 보입니다.

<center><img src="/img/posts/SwiftPacageManager_3.png" width="500" height="350"></center> <br>

Swift Package Manager는 의존성 요구 사항에 따라 버전 `1.0.0`을 선택하고 설치 한 것을 볼 수 있습니다. `main.swift` 파일을 열고 내용을 다음 코드로 바꿉니다.

```swift
import Atlas

let arguments = CommandLine.arguments

if arguments.count != 2 {
  print("USAGE: flag [iso country code]")
} else {
  let code = arguments[1]
  let country = Atlas.Country(code: code)
  print(country.emojiFlag)
}
```

여기에서 라이브러리를 가져온 다음 제공된 첫 번째 커맨드라인 파라미터에 대한 이모티콘 깃발를 출력합니다. 파라미터가 제공되지 않으면 도움말 메시지를 출력합니다. 

앱을 다시 빌드하고 실행하십시오.

```
swift build
./.build/debug/Flag US
```

이제 터미널 창에 미국 깃발이 보입니다.

앱을 띄울 시간입니다. 최적화된 배포 구성을 사용하여 이번에 마지막으로 앱을 빌드하십시오.

```swift
swift build --configuration release
```

이제 다음과같이 앱의 배포된 버전을 실행할수 있습니다.

```swift
./.build/release/Flag PR
```

`./.build/release/Flag`파일을 압축하고 다른사람들에게 공유할수 있습니다.

---

## Generating an Xcode Project with The Swift Package Manager

커맨드 라인과 텍스트 편집기로 예전 수업으로 돌아가는건 재미있지만, Xcode에 익숙한 iOS 또는 MacOS 개발자일수 있습니다.

`Atlas` 패키지로 다시 전환하고 다음을 실행하여 Xcode 프로젝트를 생성합니다. 

```swift
cd ../Atlas
swift package generate-xcodeproj
```

이 명령은 `Atlas.xcodeproj`를 생성합니다. 이제 Xcode에서 프로젝트를 열수 있고 패키지를 만들거나 다른 Xcode 프로젝트 처럼 테스트 스위프트를 실행할수 있습니다.

<center><img src="/img/posts/SwiftPacageManager_4.png" width="500" height="350"></center> <br>

`Flag` package에서도 이것을 할수 있습니다. `Flag`폴더에서 `swift package generate-xcodeproj`를 실행하여`Flag.xcodeproj`를 생성하세요. 

```
cd ../Flag
swift package generate-xcodeproj
```

Xcode 프로젝트를 열고 난 이후에, `Flag` executable target이 선택되었는지 확인하세요. 작은 터미널창 아이콘 입니다. 이제 이 패키지를 빌드하고 실행 할 수도 있습니다. 

실행 가능한 커맨드라인 인수를 제공하려면, `Product/Scheme/Edit Scheme`로 이동한다음 `Run/Arguments`를 선택하고 Arguments Passed on Launch 색션에서 `US`와 같은 인수를 추가하세요.

<center><img src="/img/posts/SwiftPacageManager_5.png" width="500" height="350"></center> <br>

Xcode는 의존성을 추가하거나 빌드할수 없습니다. 그래서 커맨드라인을 완전히 피할수는 없습니다.

---

## Where to Go From Here?

완성된 프로젝트를 [여기](https://koenig-media.raywenderlich.com/uploads/2016/12/SPM-Final-Project.zip)에서 다운받을수 있습니다.

[Package Manager](https://swift.org/package-manager/)는 Swift 공식 홈페이지에서 확인할수 있습니다.

package description 옵션에 대한 자세한 설명은 [https://github.com/apple/swift-package-manager/tree/master/Documentation](https://github.com/apple/swift-package-manager/tree/master/Documentation)여기를 참조해주세요.

Swift 4용 Swift Package Manager의 업데이트 방향에 대한 개요는 Eloutuin mailing list 에서 로드맵을 확인하세요.

Swift Package Manager가 호스트 이외의 플랫폼을 지원할떄까지 [Cocoapods](https://cocoapods.org/) 또는 [Carthage](https://github.com/Carthage/Carthage)를 사용하여 iOS, watch OS 및 tvOS 앱을 빌드하는것이 좋습니다.

도전과제로 방금만든 라이브러리를 GitHub으로 Push 한다음 Atlas를 원격 의존성으로 사용하는것이 어떻습니까? url 옵션을 GitHub의 URL로 변경하기만 하면 됩니다. 

flag가 아무런 인수 없이 실행될때 모든 국가와 깃발를 나열하는 등의 새 기능을 구현해보세요. `Locale.isoRegionCodes`를 사용해야할수 있습니다.

`Atlas` 라이브러리에서 새 기능을 구현한 다음 1.1.0과 같은 새 버전을 만들고 마지막으로 Flag에서 새 버전을 사용하세요. Package description에 적절한 버전을 선택한 다음 `swift package update`를 사용하여 의존성을 최신 허용 버전으로 업데이트 하세요.



---

## Reference 

[https://swift.org/package-manager/](https://swift.org/package-manager/)<br>
[https://github.com/apple/swift-package-manager/tree/master/Documentation](https://github.com/apple/swift-package-manager/tree/master/Documentation)<br>