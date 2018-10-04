---
layout:     post
title:      "ComputerScience. Compile-time vs Run-Time"
subtitle:   "what difference..."
date:       2018-04-10 18:00:00
author:     "MinJun"
header-img: "img/tags/ComputerScience-bg.jpg"
comments: true 
tags: [ComputerScience]
---

[https://stackoverflow.com/questions/846103/runtime-vs-compile-time](https://stackoverflow.com/questions/846103/runtime-vs-compile-time) <br>

compil-time 과 Run-time의 차이가 무엇인지에 대한 아티클입니다. 

---

## Whats the difference between Run-time and compile-time 

컴파일 타임과 런타임의 차이점은 이론가들이 단계 구별(`phase distinction`) 이라고 부르는 것의 예입니다. 특히 프로그래밍 언어에 대한 지식이 부족한 사람들에게 가장 어려운 개념중 하나 입니다. 

이 문제에 접근하기 위해 다음과 같은 질문을 하는 것이 도움이 됩니다.

1. 프로그램은 어떤 불변 조건을 만족합니까?
2. 이 단계에서 무엇이 잘못 될 수 있습니까?
3. 이 단계가 성공하면 사후 조건은 무엇인가요?(우리는 무엇을 아나요?)
4. 입력 및 출력은 무엇 입니까?

---

##  Compile time 

1. 프로그램은 불변조건을 만족시킬 필요는 없습니다. 사실 그것은 잘 구성된 프로그램일 필요가 없습니다. 이 HTML을 컴파일러에 공급하여 barf로 볼수 있습니다.(?) 
2. 컴파일 타임에 무엇이 잘못될수 있습니까?
	- Syntax errors(구문오류)
	- Typechecking errors(유형 검사오류)
	- (Rarely) compiler crashes 드물게 컴파일러가 충돌 
3. 컴파일러가 성공한다면 우리는 무엇을 알고 있습니까?
	- 프로그램은 잘 형성되었습니다. 어떤 언어로도 의미 있는 프로그램입니다
	- 프로그램을 실행할 수 있습니다.(프로그램이 즉시 실패 할 수도 있지만 적어도 시도 할 수 있습니다.)
4. 입력과 출력은 무엇입니까? 
	- 입력(input)은 프로그램이 컴파일되는 프로그램, 컴파일할떄 필요한 헤더파일, 인터페잇, 라이브러리 또는 다른 추가적인것들(needed to import in order to get compiled)을 더한것입니다. 
	- 출력(out put)은 어셈블리 코드 또는 메모리에 재배치 가능한 객체 또는 실행 가능한 프로그램 일 것입니다. 또는 문제가 발생하면 오류메세지를 출력할수 있습니다. 
	
	
---

## Run time 

1. 우리는 프로그램의 불변(invariants) 변수들에 관해 아무것도 모릅니다. 프로그래머가 누구든지 상관없습니다. 런타임 불변은 컴파일러만으로는 거의 강제적으로 적용되지 않습니다. 프로그래머의 도움이 필요합니다. 
2. 무엇이 런타임 오류를 발생시킵니까? 
	- `0`으로 나누기
	- null 포인터를 참조
	- 메모리 부족
	- 또한 프로그램 자체에서 감지되는 오류가 있을수 있습니다.
		- 존재하지 않는 파일을 열려고 시도
		- 잘 형성되지 않은 URL 찾기 시도 혹은 형성되지 못한 것을 발견
3. 런타임이 성공하면 프로그램은 충돌없이 완료됩니다. 
4. 입력(input), 출력(output)은 전적으로 프로그래머에게 달려 있습니다. 파일, 스크린 화면, 네트워크 패킷, printer로 전송된 작업 등의 이름을 지정합니다. 프로그램을 실행하면 그것이 결과이고, 단지 런타임에 발생합니다.  

---

## Reference 

[https://stackoverflow.com/questions/846103/runtime-vs-compile-time](https://stackoverflow.com/questions/846103/runtime-vs-compile-time)<br>
[https://www.youtube.com/watch?v=pWUi1HKr0MI](https://www.youtube.com/watch?v=pWUi1HKr0MI)

- 연관된 포스트
	- [<U>Swift. Type method</U>](https://devminjun.github.io/blog/Type_Methods)
	- [<U>Swift. Meta Type</U>](https://devminjun.github.io/blog/Meta_Type_Swift)
	- [<U>Protocol Composition Type</U>](https://devminjun.github.io/blog/Protocol_Composition_Type)
	- [<U>Compile-Time vs Run-Time Type Checking in Swift</U>](https://devminjun.github.io/blog/Compile-Time_vs_Run_Time_Type_checking_in_Swift)
	- [<U>Swift, Identity Operators ==, ===, is</U>](https://devminjun.github.io/blog/Identity-Operators)

