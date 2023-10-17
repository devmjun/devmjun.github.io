---

layout:     post
title:      "iOS, HEIC Image Compression for iOS"
subtitle:   "HEIC Image Compression for iOS"
date:       2019-11-24 18:45:00
author:     "MinJun Ju"
comments: true 
tags: [Swift, Mirror, CustomDebugStringConvertible]

categories: archive, ios
permalink: /archive/:title
cover-img: /assets/post_img/background/Mac-bg.jpg
thumbnail-img: /assets/post_img/background/Mac-bg.jpg
share-img: /assets/post_img/background/Mac-bg.jpg

--- 

## Table of contents

- [<U>Formatting and HEIC Image Compression</U>](#section-id-20)
- [<U>Getting Started</U>](#section-id-36)
- [<U>Saving As HEIC</U>](#section-id-44)
- [<U>Measuring Time</U>](#section-id-300)
- [<U>Sharing HEIC</U>](#section-id-391)
- [<U>Where to Go From Here</U>](#section-id-393)

[HEIC Image Compression for iOS](https://www.raywenderlich.com/4726843-heic-image-compression-for-ios) 에서 필요한 부분만 의역 했습니다.

HEIC image 압축 튜토리얼에서,  어떻게 HEIC 와 JPEG 형식으로 변환 하는 방법에 대해서 배우며 최적의 성능을 위해 효율성을 비교합니다. 

현대에 사진과 비디오는 일반적으로 대부분의 디바이스의 디스크 공간을 차지합니다. 애플은 지속적으로 아이폰의 카메라에 돈과 시간을 투자 하고 있기 때문에 사람들이 iOS 디바이스를 사용하는 일이 계속 될것 입니다. 더 높은 퀼리티의 사진들은 큰 이미지 데이터를 의미합니다. 그것에 대한 이유로 4K 카메라는 왜그렇게 많은 공간을 차지 하는지로 알수 있습니다. 

많은 이미지 데이터를 저장하기 위해서 하드웨어 저장소 사이즈를 증가시키는 것이 있을수 있습니다. 데이터가 차지하는 공간을 최소화 하기 위해 다양한 압축 알고리즘이 발명되었었습니다. 많은 데이터 암축 알고리즘이 있고, 모든것을 해결하는데 적합한 완벽한 하나의 방법은 없습니다. 이미지에서 apple은 HEIC 이미지 압축을 채택했습니다. 당신은 이 이미지 압축에 대한 모든것을 배울것입니다.

<div id='section-id-20'/>

## Formatting and HEIC Image Compression

JPEG 라는 용어는 종종 image file type를 설명하기 위해 사용됩니다. 파일의 확장자는 `.jpg` 또는`.jpeg` 이기때문에 오해할수 있습니다. JPEG는 실제로 압축 포맷입니다. JPEG 압축에 의해서 생성된 일반적인 파일 타입은 JFIF 또는 EXIFF 입니다.

HEIF, 또는 높은 효율성을 가진 이미지 파일 포맷은 새로운 이미지 파일 포맷이고 이것은  JPEG 이전 버전 보다 여러 면에서 더 나은 새로운 이미지 파일 형식 입니다. 2013년 MPEG 에서 개발한 이 포맷은 JPEG 보다 두배 많은 데이터를 저장하고 다음을 포함하는 많은 이미지 데이터의 타입을 지원합니다

- Items 
- Sequences
- Derivations
- Metadata
- Auxiliary image items 

이러한 데이터 타입은 JPEG가 저장할수 있는 단일 이미지 데이터 보다 HEIF를 훨씬 유연하게 만듭니다. 이것은 이미지 편집과 같은 효율성을 추구하는 사례에 매우 효율적 입니다. 또한 최신 아이폰에서 기록된 image depth data를 저장할수 있습니다. 

거기에는 MPEG의 명세서에 있는 몇개의 정의된 파일 확장자가 있습니다. 애플은 HEIF 파일에 대해 고 효율 이미지 컨테이너를 의미하는 `.heic` 확장자를 사용하기로 결정했습니다. 이 선택은 HEVC 코덱의 사용을 나타내지만 애플의 디바이스는 어떤 다른 코덱에 의해서 암축된 파일도 읽을수 있음을 의미 합니다

<div id='section-id-36'/>

## Getting Started

[여기](https://koenig-media.raywenderlich.com/uploads/2019/09/Saving-Space-With-HEIC-Images-Materials.zip)에서 프로젝트를 다운받고 Starter 폴더를 엽니다. 

프로젝트는 단순한 JPEG 와 HEIC 이미지 압축 레벨을 적용하는것에 대한 슬라이더와 두개의 이미지뷰를 보여주는 단순한 앱입니다. 각 이미지뷰는 선택된 이미지에 대한 정보를 보여주기 위한 두개의 레이블이 있으며 지금은 기능이 없이 뼈대만 있습니다. 

이 앱의 목표는 이미지가 압축하는데 얼마나 오래 걸리고 HEIC 파일이 얼마나 작은지 보여줌으로써 HEIC vs JPEG에 대한 이점을 보여주는것 입니다. 꼬한 공유 시트를 사용하여 HEIC 파일을 공유하는 방법도 보여줍니다. 

<div id='section-id-44'/>

## Saving As HEIC

시작 프로젝트를 열고 앱을 실행하세요 

<center><img src="/assets/post_img/posts/HEIC-compressor-tutorial-0.png" width="450"></center> <br>

이미지 압축을 시작하기 전에 이미지를 선택해야 합니다. [Unsplash](https://unsplash.com/images/stock/high-resolution) 에 [Jeremy Thomas](https://unsplash.com/@jeremythomasphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) 의 기본 이미지가 좋을것 같지만 이것은 당신의 콘텐츠에서 이것이 어떻게 일하는지 보는게 더 좋을것 입니다.

`MainViewController.swift`내 하단에 다음 코드를 추가합니다. 

```swift
extension MainViewController: UIImagePickerControllerDelegate, 
                              UINavigationControllerDelegate {
  func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
    // 1
    picker.dismiss(animated: true)
  }

  func imagePickerController(
    _ picker: UIImagePickerController,
    didFinishPickingMediaWithInfo
    info: [UIImagePickerController.InfoKey : Any]
    ) {
    picker.dismiss(animated: true)

    // 2
    guard let image = info[.originalImage] as? UIImage else {
      return
    }

    // 3
    originalImage = image
    updateImages()
  } 
}
```

이것은 `UIImagePickerControllerDelegate`의 단순한 구현 입니다. 

1. 취소 버튼을 눌렀을때 dismiss 합니다. 
2. 앱에서 최고의 결과를 위해 picker에서 원본 이미지를 가져옵니다
3. 이 이미지를 저장하고 이미지뷰를 업데이트 합니다

`updateImages()`는 아무것도 하지 않지만 다음에 이 라인을 `addButtonPressed()`에 추가합니다. 

```swift
let picker = UIImagePickerController()
picker.delegate = self

present(picker, animated: true)
```

이 imagePicker는 유저가 이미지를 선택할수 있게 합니다. 하지만 여전히 이미지뷰를 업데이트 하는것이 필요합니다. 

`compressJPEGIMage(with:)`와 `compressHEICImage(with:)`의 구현을 다음과 같이 교체 합니다

```swift
private func compressJPGImage(with quality: CGFloat) {
  jpgImageView.image = originalImage
}

private func compressHEICImage(with quality: CGFloat) {
  heicImageView.image = originalImage
}
```

이제 두 이미지뷰는 선택된 이미지뷰가 보일것입니다. 선택된 이미지는 임시 이미지 지만 imagepicker 가 동작한다는걸 보증합니다. 

<center><img src="/assets/post_img/posts/HEIC-compressor-tutorial-1.png" width="450"></center> <br>

슬라이더를 움직일수 있지만 아직 아무것도 동작 하지 않습니다. 추후에 각 이미지의 압축 강도를 변경할수 있습니다. 

시뮬레이터의 이미지를 압축하는 것은 디바이스에서 하는것보다 훨씬 느립니다. 이것을 동작하게 하기 위해서 슬라이더의 값을 어떻게 읽을지 결정하기 위해 조건이 필요합니다.

`MainViewController.swift`에 `originalImage` 위에 다음 값을 추가합니다.

```swift
private var previousQuality: Float = 0
```

이 속성은 슬라이더값 기반 업데이트 값을 제한 하기 위해 나중에 사용할 최신 슬라이더 값을 저장 합니다.

다음으로 `MainViewController.swift`의 `Actions` section의 끝에 두개의 메소드를 추가합니다

```swift
@objc private func sliderEndedTouch() {
  updateImages()
}

@objc private func sliderDidChange() {
  let diff = abs(compressionSlider.value - previousQuality)

  guard diff > 0.1 else {
    return
  }

  previousQuality = compressionSlider.value

  updateImages()
}
```

두개의 메소드는 스크린의 이미지를 업데이트 합니다. 유일한 차이점은 아래의 매소드는 슬라이더 값에 대한 제한이 있다는 것입니다. 

아래의 `viewDidLoad()` 메소드에 다음을 추가합니다

```swift
compressionSlider.addTarget(
  self,
  action: #selector(sliderEndedTouch),
  for: [.touchUpInside, .touchUpOutside]
)
```

이것은 슬라이더의 인터렉션이 완료된 이후에 업데이트의 이미지를 슬라이더로 등록하는 target action을 추가합니다. 

이것들이 연결되면서 마침내 이 이미지들을 압출할 시간입니다. 

`MainViewController.swift`의 상단에 다음 속성을 추가합니다

```swift
private let compressionQueue = OperationQueue()
```

operation queue는 무거운 작업을 없애기 위한 하나의 방법 입니다, 앱의 다른 부분들이 응답 하도록 보장합니다. queue를 사용하는것은 어떤 활성화돤 압축 작업을 취소할수 있는 능력 또한 제공합니다. 이 예제에서 새로운것을 시작하기 전에 현재 테스크를 취소하는것과 의미가 통합니다. 

> Note: operation queue 에 대해서 더 배우길 원한다면 [video course](https://www.raywenderlich.com/3648-ios-concurrency-with-gcd-and-operations)를 참조해주세요

`updateImages()` 내에 `resetLabels()`를 호출하기 위해 다음 코드를 추가합니다. 

```swift
compressionQueue.cancelAllOperations()
```

새 작업을 추가하기전에 queue에 있는 모든 작업을 취소 합니다. 이 단계가 없으면 view에서 잘못된 압축 품질로 이미지를 설정할수 있습니다

다음으로 `compressJPEGImage(with:)`의 콘텐츠를 다음과 같이 변경합니다

```swift
// 1
jpgImageView.image = nil
jpgActivityIndicator.startAnimating()

// 2
compressionQueue.addOperation {
  // 3
  guard let data = self.originalImage.jpegData(compressionQuality: quality) else {
    return
  }

  // 4
  DispatchQueue.main.async {
    self.jpgImageView.image = UIImage(data: data)
    // TODO: Add image size here...
    // TODO: Add compression time here...
    // TODO: Disable share button here...

    UIView.animate(withDuration: 0.3) {
      self.jpgActivityIndicator.stopAnimating()
    }
  }
}
```

위의 코드는 

1. 이전 이미지를 지우고 activity indicator를 시작합니다
2. 정의한 operation queue로 압축 작업을 추가합니다. 
3. 퀼리티 매개변수를 사용해서 원본 이미지를 압축하고 이것을 `Data`로 변환합니다 
4. 압축된 데이터에서 UIImage를 생성하고 메인 스레드의 이미지뷰를 업데이트 합니다. 

이것은 JPEG 코덱을 사용하여 이미지를 압축한것 입니다. HEIC 이미지 압축을 추가하기 위해서 `compressHEICImage(with:)`를 다음과 같이 교체 합니다

```swift
heicImageView.image = nil
heicActivityIndicator.startAnimating()

compressionQueue.addOperation {
  do {
    let data = try self.originalImage.heicData(compressionQuality: quality)

    DispatchQueue.main.async {
      self.heicImageView.image = UIImage(data: data)
      // TODO: Add image size here...
      // TODO: Add compression time here...
      // TODO: Disable share button here...

      UIView.animate(withDuration: 0.3) {
        self.heicActivityIndicator.stopAnimating()
      }
    }
  } catch {
    print("Error creating HEIC data: \(error.localizedDescription)")
  }
}
```

여기에는 단지 HEIC 이미지 압축 메소드 단 하나의 차이가 있습니다. 이미지 데이터는 `UIImage+Additions.swift` 의 도움 메소드에서 압축되어 집니다. 현재 이 메소드는 비어있습니다. 

`UIImage+Additions.swift`를 열고 `heicData(compressionQuality:)`의 빈 구현을 찾을수 있습니다. 메소드의 콘텐츠를 추가하기 전에 custom error type이 필요합니다

다음 코드를 확장자 상단에 추가합니다

```swift
enum HEICError: Error {
  case heicNotSupported
  case cgImageMissing
  case couldNotFinalize
}
```

위의 오류 enum은 HEIC 이미지 압축이 잘못되었을때를 설명하는 몇가지 사례를 포함하고 있습니다. 모든 iOS 디바이스는 HEIC 콘텐츠를 캡쳐할수 없지만 대부분의 iOS 11에서 사용되는 디바이스 또는 그 이후는 HEIC 콘텐츠를 읽거나 편집할수 있습니다. 

`heicData(compressionQuality:)` 의 콘텐츠를 다음과 같이 교체합니다. 

```swift
// 1
let data = NSMutableData()
guard let imageDestination =
  CGImageDestinationCreateWithData(
    data, AVFileType.heic as CFString, 1, nil
  )
  else {
    throw HEICError.heicNotSupported
}

// 2
guard let cgImage = self.cgImage else {
  throw HEICError.cgImageMissing
}

// 3
let options: NSDictionary = [
  kCGImageDestinationLossyCompressionQuality: compressionQuality
]

// 4
CGImageDestinationAddImage(imageDestination, cgImage, options)
guard CGImageDestinationFinalize(imageDestination) else {
  throw HEICError.couldNotFinalize
}

return data as Data
```

위의 주석에 대한 설명입니다

1. 시작하기 위해 빈 데이터 버퍼가 필요합니다. 추가적으로 `CGImageDestinationCreateWithData(_:_:_:_:)` 를 사용하는 HEIC 인코딩된 콘텐츠를 위한 목적지를 생성합니다. 이 메소드는 `Image I/O` 프레임 워크의 일부 이고 이미지 데이터를 작성하기 전에 이 것들의 업데이트된 속성들과 추가된 이미지 데이터를 가질수 있는 컨테이너 로서 동작합니다. 여기에 문제가 있다면 HEIC는 해당 디바이스에서 사용할수 없는것 입니다
2. 여기에서 동작하기 위해 이미지 데이터를 보장하는게 필요합니다 
3. 매소드로 전달된 매개변수는 `kCGImageDestinationLossyCompressionQuality` key를 사용하여 적용 되어집니다. `CoreGraphics`에서 이것을 요청하기 위한 타입으로 `NSDictionary`를 사용합니다
4. 마지막으로 최종 목적지로 option과 함께 이미지 데이터를 적용합니다. `CGImageDestinationFinalize(_:)`HEIC 이미지 압축을 끝내고 성공했다면 `true`를 반환합니다. 

빌드하고 실행합니다. 슬라이더 값으로 변경되는 이미지를 봐야 합니다. 하위 이미지는 디스크에 더 많은 공간을 절약하는 방법으로 HEIC 이미지 압축과 더 관련이 있기 때문에 표시하는데 오래 걸릴 것입니다.

<center><img src="/assets/post_img/posts/HEIC-compressor-tutorial-2.png" width="450"></center> <br>

<div id='section-id-300'/>

## Measuring Time

이제 당신은 이 전체 HEIC 가 인상적이지 않다고 생각할수도 모릅니다. 현재 명확한것은 HEIC를 사용하는 압축이 더 느리다는 것입니다. 다음으로는 HEIC 파일이 얼마나 작은지 알 수 있을 것입니다. 

프로젝트는 `Data+Additions.swift` 라고 불리는 핼퍼가 있고 여기에는 `Data`의 사이즈를 출력하는 [pretty-prints](https://en.wikipedia.org/wiki/Prettyprint) 속성이 있습니다. 이 속성은 `Foundation` 프레임 워크의 헨디 `ByteCountFormatter`를 사용하여 바이트 사이즈를 포맷합니다. 

`MainViewController.swift` 에서 `TODO:Add image size here..`를 지우고 `compressJPGImage(with:)` 내를 다음코드로 교체합니다

```swift
self.jpgSizeLabel.text = data.prettySize
```

JPEG 메소드에서 했던 것과 같이 `compressHEICImage(with:)`내에 다음 코드를 추가합니다.

```swift
self.heicSizeLabel.text = data.prettySize
```

각 이미지 사이를 반영하기 위해 사이즈 레이블을 업데이트 할것입니다.

앱을 빌드하고 실행합니다. HEIC를 사용하여 얼마나 더 많은 공간을 절약할수 있는지 바로 봐야 하는데 이것이 훨씬더 유용합니다. 

<center><img src="/assets/post_img/posts/HEIC-compressor-tutorial-3.png" width="450"></center> <br>

HEIC 와 JPEG 사이에서 선택하는걸 고려할 시간입니다. 압축하는데 걸리는 시간을 고려해야할 데이터의 핵심 조각 입니다. 당신의 앱이 공간이 속도보다 더 중요하다면 HEIC는 최선의 옵션이 아닐수 있습니다.

`MainViewController.swift`의 최상단에 다음 코드를 추가합니다

```swift
private let numberFormatter = NumberFormatter()
```

Formatters는 숫자를 더 읽을수 있게 도와줍니다. 이 formatter 는 정밀한 시간간격을 읽을수 있게 도와줍니다

`viewDidLoad()`의 아래에 `updateImages()` 이전 직후에 다음 코드를 추가합니다.

```swift
numberFormatter.maximumSignificantDigits = 1
numberFormatter.maximumFractionDigits = 3
```

이것은 두 압축 방법의 차이가 눈에 띄기 때문에 formatter을 출력을 제한하게 구성 합니다. 둘이 가깝다면 높은 수준의 정밀도가 도움이 될것입니다. 

`resetLabels()` 이후에 다음 코드를 추가합니다.

```swift
private func elapsedTime(from startDate: Date) -> String? {
  let endDate = Date()
  let interval = endDate.timeIntervalSince(startDate)
  let intervalNumber = NSNumber(value: interval)

  return numberFormatter.string(from: intervalNumber)
}
```

지속 시간을 계산 하여 문자열을 반환합니다. 

`compresJPGImage(with:)` 매소드 내에 상단에 다음을 추가합니다.

```swift
let startDate = Date()
```

다음으로 `compressJPGImage(with:) `내에 `TODO: Add compression time here...`를 다음과 같이 교체합니다.

```swift
if let time = self.elapsedTime(from: startDate) {
  self.jpgTimeLabel.text = "\(time) s"
}
```

시작 날짜가 바로 기록되어 메소드의 모든 부분이 계산된 지속시간을 제공하는지 확인합니다. 그후 time label은 디코딩 이후 바로 설정 합니다. 

위와 마찬가지로 HEIC 이미지 압축 메소드에도 추가해줍니다.

```swift
// 1
let startDate = Date()

// 2
if let time = self.elapsedTime(from: startDate) {
  self.heicTimeLabel.text = "\(time) s"
}
```

앱을 빌드하고 실행합니다. 

<center><img src="/assets/post_img/posts/HEIC-compressor-tutorial-4.png" width="450"></center> <br>

이제 당신은 충분히 알고 있는 정보를 바탕으로 결정을 내릴수 있습니다. JPG 압축은 더 큰 이미지의 비용으로 매우 빠르고 반대로 HEIC 이미지는 작지만 압축 속도가 더 오래 걸립니다. 

<div id='section-id-391'/>

## Sharing HEIC

...

<div id='section-id-393'/>

## Where to Go From Here

당ㅅ니은 HEIC의 장/단 에 대한 실무적인 지식을 익혔습니다. HEIC를 위한 많은 사용예가 있고 시간이 지남에 따라 인기를 더해갈것입니다.

HEIC의 이점을 요약해보면 

- JPEG에 비해 파일 크기가 50% 더 작습니다. 
- 많은 이미지 아이템을 포함합니다
- Image derivations, non destructive edits
- 라이브 포토 같은 이미지 시퀀시 
- depth 또는 HDR 데이터를 위한 Auxiliary image items 
- 카메라 정보 또는 위치와 같은 이미지 메타 데이터 

완성된 프로젝트를 [여기](https://koenig-media.raywenderlich.com/uploads/2019/09/Saving-Space-With-HEIC-Images-Materials.zip)에서 다운로드 할수 있습니다. 

Apple 에서 HEIC에 대한 추가적보는 2017년 [HEIF and HEVC](https://developer.apple.com/videos/play/wwdc2017/511/) WWDC 세션에서 얻을수 있습니다.
