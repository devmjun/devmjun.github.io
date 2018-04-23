---
layout:     post
title:      "iOS. 에서 사용할수 있는 데이터베이스 비교하기"
subtitle:   "SQLLite, Core Data, Realm"
date:       2018-04-18 12:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## iOS Databases: SQLLite vs. Core Data vs. Realm

iOS 데이터베이스의 가장 일반적인 것은 `SQLite`, `Core Data` 그리고 상대적으로 새롭다고 불리우는(`Realm`) 입니다.(포스팅이 2016.6.10일임..)

이 포스트는 세개(SQLite, Core Data, Realm)를 비교합니다. 

---

## SQLite

`SQLiet`는 세계에서 가장 많이 사용되는 데이터 베이스 엔진이고 오픈소스 입니다. 특정한 외형이 없고, 서버가 필요없는 SQL 데이터 베이스 엔진을 구현합니다. `SQLite`는 Mac OS X, iOS, Android, Linux 및 Windows에서 접근 할수 있습니다

`ANSI(American National Standards Institute)-C`로 작성된 것처럼 간단하고 친숙한 프로그래밍 인터페이스를 제공합니다. `SQLite`는 또한 매우작고 가볍고 전체 데이터 베이스를 하나의 `크로스 플랫폼 디스크파일에` 저장할수 있습니다.

SQLite가 널리 사용되는 이유는 다음과 같습니다. 

- 서버로부터의 독립성
- 간편한 설정(Zero-configuration)
- 여러 프로세스와 스레드로부터 안전한 접근 
- 특정 데이터 타입을 포함하는 하나 또는 한개 이상의 컬럼이 있는 테이블에 데이터 저장 

---

## Core Data

`Core Data`는 앱개발자가 사용할수 있는 두번째 주요 iOS 저장 기술입니다. 데이터 타입, 저장해야하는 데이터의 양에 따라서 `SQLite`와 `Core Data`는 장단점이 있습니다. `Core Data`는 기존 테이블 데이터베이스 방법보다 `객체(object)`에 더 중점을 둡니다. `Core Data`를 사용하면 실제로 `Objective-C`에 클레스로 표현되는 객체의 내용을 저장저장합니다. 

SQlite와 Core Data는 근본적으로 다르지만 `Core data`는:

- `SQLite` 보다 더 많은 메모리를 사용합니다.
- `SQLite` 보다 더 많은 저장 공간을 사용합니다
- `SQLite`보다 더 빠르게 기록(records)을 가져옵니다(fetching)

---

## Realm: 

`Realm`이라고 불리는 마을에 새로운 플레이어가 있습니다. `Realm`은 이전의 데이터베이스 솔루션들보다 빠르고 효율적으로 설계되었습니다. 새로운 솔루션인 모바일 데이터베이스의 크로스 플랫폼은 `Realm`이라고 불립니다. Objective-C와 Swift에서 가능하고, iOS 와 Andorid를 위해 설계되었습니다.

렘의 주요한 측면은 다음과 같습니다.

It’s absolutely free of charge,
Fast, and easy to use.
Unlimited use.
Work on its own persistence engine for speed and performance.

- 무료입니다
- 빠르고, 쉽게 사용합니다
- 무제한 사용합니다
- 스피드와 성능을 위한 자체 [persistence](http://homo-ware.tistory.com/4) 엔진에서 작업합니다. 

> 개인 Note: persistence를 어떻게 번역해야 할까 고민하다가 좋은 링크를 발견하여 추가했습니다.

정말 대단한 점은 몇줄의 코드로 모든 작업을 처리할수 있다는것입니다. `Realm`은 설치가 쉽고 `SQLite` 및 `Core Data`에 비해 작업 속도가 훨씬 빠릅니다. 또한 데이터 베이스 파일은 iOS 와 Android 에서 공유할수 있습니다.

많은 양의 기록과 많은 수의 사용자가 있는 앱을 디자인하는 경우 처음부터 `확장성(scalability)`에 주의 해야 합니다. `Realm`은 이것을 중요하게 여기고, 많은 데이터를 빠르게 처리하는것을 허용합니다.  

`Realm`을 시작하려면 iOS 8 또는 OS X 10.9 이상이면 됩니다. 이전 버전은 지원하지 않습니다.

`Core Data` 데이터로 작업하고, `Realm`으로 이동하길 원한다면 절차가 간단합니다. 많은 개발자들이 몇시간안에 해결했습니다. Core Data와 Realm은 모두 데이터를 객체(Object)로 취급하므로 필요한 작업은 CoreData 코드를 Realm을 사용하여 리펙토링 하는것입니다.

Core Data에서 Realm으로 마이그레이션 하는 방법에 대한 자세한 내용은 [여기](https://academy.realm.io/posts/migrating-from-core-data-to-realm/)를 확인하세요

---

## 여담

SQLite, Core Data, Realm이 각각 어떤 차이가 있는지 궁금했습니다. 차이를 확인하고 어떤 데이터베이스를 선택할지에 대한 고민의 가닥이 한개 줄었습니다.(하지만 글 자체가 오래되서 글 이후에 각 데이터 베이스 변화에 대한 내용을 따로 찾아봐야 합니다.)

---

## Refernece 

[rollout.io](https://rollout.io/blog/ios-databases-sqllite-core-data-realm/)<br>
[persistence를 어떻게 번역할까?에 대한 참고글](http://homo-ware.tistory.com/4)

---







