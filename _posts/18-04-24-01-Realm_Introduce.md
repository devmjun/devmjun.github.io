---
layout:     post
title:      "Realm. 이 무엇인지 알아봅니다."
subtitle:   "간단하게 개괄.."
date:       2018-04-24 12:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Realm, Swift]
---

## Introdution 

Realm은 데이터베이스의 구현체(embodiment)가 아니며, 앱 개발자의 요구에 만족하는 API로 만들어 졌습니다. Realm은 자체 엔진(custom-made engine)을 사용하고 단일 코드 행에서 데이터 베이스를 시작하고 객체를 메모리에서 읽는것 처럼 읽습니다. 

평범한 진실은 iOS의 Realm은 지속성 데이터(persisting data)를 만드는 것입니다. 

Realm은 디스크에 JSON으로 데이터를 저장하는 단순성과, 코어데이(Core Data)와 같은 무겁고 느린 ORMs를 사용하여 SQLite 위에 구축되는것 사이에서 사용하는것이 가장 좋은 좋은걸 찾았습니다. 

Realm은 현재 두가지 제품은 제공합니다.

- `Realm Database`: 무료 및 오픈 소스 객체 데이터 베이스(object data base) 입니다. 
- `Realm Platform`: Realm Cloud를 통해 서버에서 자체 호스팅 되거나 클라우드 서비스로 사용되는 동기화 서버 솔루션 입니다. 

---

## Realm Database 

`Realm Databas`는 클라이언트 측 데이터 지속성(field of client-side data persistence)의 차이를 매워줍니다. 실제로 몇년 사이에 출시된 서버 제품이 많았지만 클라이언트 측의 요구 사항은 그리 많지 않았습니다.

몇년 전까지만 해도 iOS 와 Android에서 모바일 앱을 구축하는데 필요한 표준을 빠르고 일반적인 범용 SQL 데이터 베이스 형식인 SQLite였습니다. SQLite는 C로 작성되는 등 많은 장점을 가지고 있습니다. C로 작성하면 빠르고 거의 모든 플랫폼에서 이식 가능하며 SQL 표준을 준수합니다.

반면 Realm은 현대적인 애플리케이션의 요구에 초점을 맞춘 현대적인 데이터베이스 솔루션 입니다, 그런 의미에서, 그것을 `다목적 데이터베이스(all-purpose database)` 가 아닙니다. 데이터를 매우 빠르게 읽고 쓰는것이 정말 좋지만 기존 SQL 데이터베이스 기술을 단순히 사용할수 없도록 Realm API를 마스터해야합니다.

따라서 Realm은 새로운 타입의 모바일 데이터베이스 이기 때문에 기존의 일반적인 SQL 데이터베이스와 동일한 방식으로 사용해서는 안됩니다.

모범 사례 코드로 구축된 Realm API는 틀림없이 Swift의 SQLite C API로 작업하는것 보다 훨씬 사용하기 쉽습니다.

사실 이전 Realm을 사용해본 적이 없더라도 몇분안에 기본적으로 시작할수 있습니다. 결국 코드는 그 자체로 말합니다.

```swift
// 1 모델링
class Person: Object {
  @objc dynamic var firstName: String?
  @objc dynamic var lastName: String?
}

// 2 객체(object) 선언 및 객체의 속성 값 정의
let me = Person()
me.firstName = "Marin"
me.lastName = "Todorov"

// 3 object( or Property) persistence
try realm.write {
  realm.add(me)
}

// 4 읽기 
realm.objects(Person.self)
  .filter("age > 21")
  .sorted("age")
```

위의 Swift 코드는 Realm에 `Person` 타입의 모든 지속된 객체를 요청하고 21세 이상의 객체로 필터링 한 다음 결과를 정렬합니다. 

---

## Live Objects 

렘 데데이터베이스 철학의 초석중 하나는 현대 애플리케잇녀이 객체와 함께 동작한다는 것입니다. 대부분 영속이 잇는 솔루션은 `타입이 없는 일반 딕셔너리 형태`로 데이터를 가져오고 과도한 논리로 애플리케이션 코드를 오염시켜 가져온 데이터를 앱에서 사용할수 있는 타입으로 변환해야합니다. 

`Realm`은 클래스를 사용하여 데이터 스키마를 정의합니다. 개발자는 렘에 데이터를 유지하고 결과를 데이터베이스에 쿼리할때 항상 객체와(object=Realm 에서 제공하는 Class)와 함께 작업합니다.

이는 다른 방식으로 데이터 영속성을 유지하고 저장하는것과 비교할떄 애플리케이션 코드를 단순화 하는데 도움이 됩니다. 항상 데이터 변환 코드를 건너 띄고 기본 스위프트 객체를 사용하면 됩니다. 

데이터가 객체에 항상 포함되어 있다는 사실은 다른 많은 렘의 기능을 허용합니다. 클래스를 검사하고 데이터베이스 스키마에 대한 변경 사항을 자동으로 감지합니다. 그것은 가져온 데이터를 디스크에서 최신 스냅샷으로 업데이트 합니다. 

데이터 객체를 직접 및 독점적으로 사용하면 렘이 여러 플랫폼에서 알려진 속도, 견고성 및 타입 안전성을 제공합니다. 사실 렘 데이터 베이스의 핵심(Realm Database Core)는 크로스 플랫폼인 C++로 작성되었으므로 안드로이드, iOS, macOS 또는 다른 플랫폼에서 정확히 동일한 방식으로 동작합니다. 

원하지 않는한 C++ 코드를 사용할 필요가 없습니다. 가장 중요한 부분은 C++ 코어가 플랫폼에서 동일하기 때문에 기본 API도 유사하게 동작합니다. 

```swift
// 1 Objective-C
@interface Person : RLMObject
@property NSString *firstName;
@property NSString *lastName;
@end

// 2 Swift
class Person: Object {
  dynamic var firstName: String?
  dynamic var lastName: String?
}

// 3 Kotlin
open class Person: RealmObject() {
  var firstName: String? = nil
  var lastName: String? = nil
}
```

---

## Realm Studio 

다른 데이터 지속성 라이브러리에 비해 렘이 제공하는 다른 이점은 높은 데이터 브라우저 및 편집기를 제공하는 점 입니다.

[<U>https://realm.io/products/realm-studio</U>](https://realm.io/products/realm-studio) <br>

앱에 저장된 렘 객체를 찾아보고 수정할수 있으며 데이터를 스프레드 시트와 같은 방법으로 찾아보고 쿼리할수 있습니다. 

<center><img src="/img/posts/RealmChapter8.png" width="700" height="400"></center> <br> 

렘 스튜디오를 사용하여 렘 클라우드에 연결합니다. 렘 클라우드 서버에 연결 되면 데이터를 찾아보고 수정할수 있습니다. 로컬 파일과 마찬가지로 수동으로 가능합니다.

<center><img src="/img/posts/RealmChapter9.png" width="700" height="400"></center> <br> 

<center><img src="/img/posts/RealmChapter10.png" width="700" height="400"></center> <br> 

---

## Realm Todo 앱

렘으로 CRUD(Create, Read, Update, Delete)를 간단하게 연습해보는 튜토리얼입니다. <br>

[https://github.com/devminjun/RealmTodo](https://github.com/devminjun/RealmTodo) <br>

---

## 여담 

[Realm: Building Modern Swift Apps with Realm Database](https://store.raywenderlich.com/products/realm-building-modern-swift-apps-with-realm-database) 책을 읽고 중요한 부분을 정리했습니다. 더 자세하게 알고싶다면 책을 구매해주세요! 

---

## Reference 

[Realm docs](https://realm.io/docs/)<br>
[Realm docs, Swift](https://realm.io/docs/swift/latest)<br>
[Realm Platform docs](https://docs.realm.io/platform/)<br>
[Realm GitHub](https://github.com/realm/realm-cocoa)<br>

[Realm 내부 구조와 동작 원리 자세히 살펴 보기](https://academy.realm.io/kr/posts/anatomy-of-realm/) <br>

- tutorial 

[프알못의 Realm 사용기 + 라이브 코딩 데모](https://academy.realm.io/kr/posts/realm-swift-live-coding-beginner/)<br>
[튜토리얼: iOS 앱 처음부터 만들기](https://realm.io/kr/docs/tutorials/realmtasks/)<br>
[Swift와 Realm으로 산타 위치 추적 앱 만들기 튜토리얼 Part1](https://academy.realm.io/kr/posts/track-santa-with-realm-swift-database-platform-part-1/)
[Swift와 Realm으로 산타 위치 추적 앱 만들기 튜토리얼 Part2](https://academy.realm.io/kr/posts/track-santa-with-realm-swift-database-platform-part-2/)

---



