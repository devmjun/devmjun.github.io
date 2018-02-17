---
layout:     post
title:      "Swift. Error 처리 정리"
subtitle:   "throws, defer, NSError"
date:       2018-02-18 05:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Error 

에러 핸들링은 프로그램 내에서 에러가 발생한 상황에 대해 대응하고 이를 복구하는 과정이다. Swift는 에러를 던지고, 캐치하고, 이전하며 조작할 수 있는 기능을 언어의 기본 기능으로 지원한다.

어떤 동작들은 항상 유용한 결과를 내놓거나 완전하게 실행되는 것이 보장되지 않는다. 결과가 없는 경우에 이를 표현할 수 있는 옵셔널 타입을 사용할 수도 있지만, 처리 자체가 실패하는 경우, 어떤 원인으로 실패하였는지를 알면 코드가 이에 적절히 대응할 수 있도록 할 수 있기에 그 원인을 하는 것은 유용하다.

예를 들어 디스크상의 파일로부터 데이터를 읽고 처리하는 작업을 생각해보자. 여기에는 작업이 실패할 수 있는 경우가 꽤 많다. 주어진 경로에 파일이 존재하지 않거나, 파일을 읽을 수 있는 권한이 없거나 혹은 파일이 호환되는 포맷으로 인코딩 되어 있지 않을 수도 있다. 이런 상황들을 구분하는 것은 프로그램으로 하여금 에러를 스스로 해결하거나, 자동으로 해결할 수 없는 에러에 대해서 사용자에게 보고할 수 있게끔 한다.


- 예외 상황
	- 파일 처리 중 디스크 에러: 저장하려고 하는 공간에 잘못 접근하거나 
	- 권한이 부족한 상황: 권한이 없는 디렉토로리에 접근해서 파일을 작성하려고 할때. 

- 목적: 에러가 발생해도 크래쉬가 발생하지 않게 하기 위해서
- `throws로 선언`

---

## throws 함수 호출 하기

- try를 이용해서 호출
- 컴파일 에러 안남
- 그러나 에러 발생하면 애플리케이션 크래쉬..

```swift
`try` str.write(toFile: filePath, atomically: true, encoding: .utf8)
```

- 에러 발생 -> 애플리케이션 크래쉬 방지
- do-catch 블록과 함께 사용
- 에러가 발생하면 catch내 코드 실행 <br>

```swift
do {
	try str.write(toFile: wrongFilePath, atomically: true, encoding: .utf8)
}catch {
	print("에러 발생")
}

* catch에서 발생한 에러 바인딩
do {
	try str.....
} catch let error {
	print("에러발생", error)
}
```

---

## 반환 값과 에러

- try? 로 호출 하기 
	- 에러 발생시 nil 반환
	- 반환 타입은 옵셔널 
- try! 로 호출 하기
	- 에러 발생시 애플리케이션 크래쉬
	- 반환 타입은 언래핑(non-optional)

---

## 커스텀 에러 정의 

- 커스텀 에러 정의
	- Error 프로토콜
	- NSError 클래스(Foundataion 프레임 워크)
- Error 프로토콜로 커스텀 에러 정의
	- Enum 으로 타입 정의
	- struct/Class로 정의   

#### - Enum으로 에러 정의 

Enum의 원소 타입을 Error으로 사용 

```swift
* Enum의 원소 타입을 Error 으로 정의 
enum CustomError: Error { 
	case myFault
	case yourFault
}

* 에러 발생 시키기: throw 
throw CustomError.myFault
```

#### - 구조체와 클래스로 에러 작성 

```swift
* Error 프로토콜 채택 
struct CustomErrorStruct : Error { 
	var msg : String
}

class CustomErrorClass : Error { }

* 에러 발생 시키기
let error = CustomErrorStruct(msg:"Oooops!") throw error
```

#### - 에러 구분하기

- Enum으로 정의한 개별 에러 다루기
- catch 에서 Enum의 에러 나열 
- switch-case와 비슷한 방식 

```swift
do {
	throw CustomError.yourFault
} catch CustomError.myFault {
	print("내탓") 
} catch CustomError.yourFault { 
	print("남탓")
}

* struct/class로 정의 한 에러 
* where를 이용한 타입 체크로 구별 

do {
	let error = CustomErrorStruct(msg:"Oooops!") 
	throw error
} catch let error where error is CustomErrorStruct {
	print("구조체로 작성한 에러 발생") 
} catch let error where error is CustomErrorClass { 
	print("클래스로 작성한 에러 발생")
} catch let error {
	print("그외 에러 발생", error) 
}
```

struct/class로 작성한 Error 타입보다, Enum을 이용하는게 훨씬 사용하기 간편합니다

---

## 클린업(defer)

defer 구문을 사용하여 현재 코드 블럭에서 실행흐름이 벗어날 때 수행해야 할 일을 지정할 수 있다. defer는 실행 흐름이 어떻게 벗어나는지 그 과정을 구분하지 않는다. return, break 혹은 예외로 인해 강제로 벗어나는 경우에 조차 동작한다. 따라서 열었던 파일이나 소켓을 닫거나, 수동으로 직접 할당한 메모리를 정리하는 등의 코드를 이곳에 넣을 수 있다.

- 정상 종료 시에도 끝나기 전 동작 
- try-catch-finally 와 유사, 그러나 다름
- finally는 try-catch 와 함께 작성 
- defer는 예외가 발생하는 곳에 작성 

```swift
func dangerousFunction() throws {
    defer {
        print("동작 마무리")
    }
    throw CustomErrorStruct(msg: "에러발생")
}
try dangerousFunction()
```

여기에서 주의해야할 사항은, defer 가 throw 보다 뒤에서 작성 해놓으면, defer가 실행되지 않음. 예외상황에 동작하는 defer 는 throw 보다 앞에서 실행 시켜야함. 그래야, defer 블록 안에 있는 코드들이 예외 상황이 발생했을때 실행할수 있음. 

---

## Reference 

[ErrorHandling](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html) <br>

---
