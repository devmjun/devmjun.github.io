---
layout:     post
title:      "Swift. 정리하기 25: Language Guide-Advanced Operators"
subtitle:   "Swift Language Guide-Advanced Operators"
date:       2018-04-14 15:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
---

최종 수정일: 2018.10.1

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Advanced Operators](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID28)<br>
[까칠코더님 블로그](http://kka7.tistory.com/132?category=919617)

---

## Advanced Operators

[기본 연산자(Basic Operators)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-ID60)에서 설명된 연산자이외에, Swift는 좀 더 복잡한 값을 다루기 위해 몇가지 고급(advanced) 연산자를 제공합니다. C 와 Objective-C에서 잘 알려진 비트(bitwise)를 다루고 비트를 이동하는 연산자 모두를 포함합니다.

C의 산술(arithmetic) 연산자와 다르게, Swift의 산술 연산자는 기본으로 오버플로우(overflow : 데이터가 넘치다)하지 않으며, 오버플로우 추가 연산자(`&+`)처럼, 기본적으로 오버플로우(overflow)되는 Swift의 두번째 산술연산자 `set`을 사용합니다. 이러한 오버플로우 연산자의 시작은 `&`로 시작합니다.

구조체, 클래스, 열거형을 정의할때, 사용자정의 타입에 대해 표준 Swift 연산자의 구현을 제공하는 것이 유용할 수 있습니다. Swift는 이러한 연산자들의 맞춤형 구현을 제공하고 생성한 각 타입이 무엇을 해야 할지 정확하게 결정하는 것을 쉽게 합니다.

미리 정의된 연산자에만 국한되지는 않습니다. Swift는 사용자정의 우선순위와 연관된 값과 함께 사용자정의 중위(infix), 전위(prefix), 후위(postfix), 할당 연산자를 정의하는 자유를 줍니다. 이러한 연산자들은 이전에 정의된 연산자들처럼, 코드에서 사용하고 적용할 수 있고, 사용자정의 연산자를 지원하기 위해 기존 타입을 확장할 수 있습니다.

---

## Bitwise Operators

비트단위 연산자(Bitwise operators)는 데이터 구조에서 개별적인 원시 데이터 비트를 관리하는 것이 가능합니다. 이것들은 그래픽 프로그래밍과 디바이스 드라이버 생성과 같은, 로우 레벨(low-level) 프로그래밍에서 사용됩니다. 비트단위 연산자는 사용자정의 프로토콜을 통한 통신을 위해 데이터를 인코딩(encoding)하고 디코딩(decoding)하는 것처럼, 외부 소스의 원시 데이터로 작업할때 유용할 수 있습니다.

아래 설명된 것처럼, Swift는 C에 있는 모든 비트단위 연산자를 지원합니다.

---

## Bitwise NOT Operator

NOT 비트단위 연산자(bitwise NOT operator)(`~`)은 숫자에 있는 모든 비트들을 반전(inverts) 시킵니다.

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-0.png)


NOT 비트단위 연산자는 전위 연산자이고, 공백없이 연산하는 값 바로 앞에 나타납니다

```swift
let initialBits: UInt8 = 0b00001111
let invertedBits = ~initialBits  // equals 11110000
```

`UInt8` 정수형은 `8`개의 비트를 가지고 `0`부터 `255`사이의 값을 저장할 수 있습니다. 이 예제는 `UInt8` 정수형을 처음 `4`개의 비트는 `0`으로, 두번째 `4`개의 비트에는 `1`로 설정하는 `2`진수(binary) 값 00001111으로 초기화 합니다. 이것은 10진수(decimal) 값 15와 같습니다.

NOT 비트단위 연산자는 initialBits와 같지만, 모든 비트가 반전된 상수 invertedBits를 만드는데 사용됩니다. 0은 1이되고, 1은 0이 됩니다. invertedBits의 값은 부호없는 10진수(decimal) 값 240과 같은 11110000입니다.

---

## Bitwise AND Operator

AND 비트단위 연산자(bitwise AND operator)(`&`) 는 두 숫자들의 비트를 결합합니다. 이것은 입력된 숫자 모두(both) 1인 경우에만 1로 설정하는 새로운 비트 값을 반환합니다.

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-1.png
)

아래 예제에서, firstSixBits와 lastSixBits값 모두 중간에 있는 4개의 비트가 1입니다. AND 비트단위 연산자는 부호없는 10진수(decimal) 값 60과 같은 00111100 숫자를 만들기 위해 결합합니다.

```swift
let firstSixBits: UInt8 = 0b11111100 let lastSixBits: UInt8 = 0b00111111 let middleFourBits = firstSixBits & lastSixBits // equals 00111100
```

---

## Bitwise OR Operator

OR 비트 연산자(`|`)는 두 숫자의 비트들을 비교합니다. 이 연산자는 입력된 숫자들의 비트에서 하나라도 1인 경우에, 1을 설정하는 새로운 비트 값을 반환합니다.

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-2.png)

아래 예제에서, someBits와 moreBits의 값은 1로 설정된 다른 비트를 가집니다. OR 비트단위 연산자는 부호없는 10진수 254와 같은, 11111110을 만들기 위해 결합합니다.

```swift
let someBits: UInt8 = 0b10110010
let moreBits: UInt8 = 0b01011110
let combinedbits = someBits | moreBits  // equals 11111110
```

---

## Bitwise XOR Operator

XOR 비트단위 연산자(bitwise XOR operator) 또는 `"배타적인 OR 연산자(exclusive OR Operator)"` (`^`)는 두 숫자들의 비트를 비교합니다. 이 연산자는 입력된 비트들이 다르면 1을 설정하고 입력한 비트들이 같으면 0을 설정하는, 새로운 비트 값을 반환합니다.

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-3.png)

아래 예제에서, `firstBits`와 `otherBits`의 값은 서로 다른 비트에 `1`을 설정합니다. XOR 비트단위 연산자는 출력값에서 비트들 모두 1로 설정합니다. `firstBits`와 `otherBites`에 있는 모든 다른 비트들은 모두 일치하고 출력값에서 `0`으로 설정합니다.

```swift
let firstBits: UInt8 = 0b00010100
let otherBits: UInt8 = 0b00000101
let outputBits = firstBits ^ otherBits  // equals 00010001
```

---

## Bitwise Left and Right Shift Operators

비트단위 왼쪽 시프트 연산자(Bitwise left shift operators)(`<<`)와 비트단위 오른쪽 시프트 연산자(Bitwise right shift operators)(`>>`)는 숫자에 있는 모든 비트를 특정 숫자만큼, 왼쪽이나 오른쪽으로 이동시키며, 아래 정의된 규칙을 따릅니다.

비트단위 왼쪽과 오른쪽 시프트(Bitwise left and right shifts)는 정수를 곱하거(multiplying)나 나누는(dividing) 효과를 가지고 있습니다. 정수의 비트를 왼쪽으로 한칸씩 밀면(shiping) 값은 두배(doubles)가 되며, 오른쪽으로 한칸씩 밀면 값은 반절(halves)이 됩니다.

---

## Shifting Behavior for Unsigned Integers

부호 없는 정수형에 대한 비트 시프트(bit-shifting) 동작은 아래와 같습니다.

기존 비트들은 요청된 숫자만큼 왼쪽이나 오른쪽으로 이동됩니다.
정수형의 범위를 넘어서 이동된 모든 비트들은 버려집니다.
원본 비트들을 왼쪽이나 오른쪽이나 이동시킨 후에 비어 있는 곳에 0이 삽입됩니다.
이러한 접근법을 논리적인 시프트(logical shift)이라고 합니다.

아래 그림은 `11111111 <<` 1(`11111111`이 왼쪽으로 1씩 이동)와 `11111111 >>` 1(`11111111`이 오른쪽으로 1씩 이동) 결과를 보여줍니다. 파란색 숫자는 이동되며, 회색 숫자는 버려지고, 오랜지색은 0이 삽입됩니다.

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-4.png)

다음은 Swift코드로 비트 시프트(shifting)하는 것을 보여줍니다

```swift
let shiftBits: UInt8 = 4   // 00000100 in binary
shiftBits << 1             // 00001000
shiftBits << 2             // 00010000
shiftBits << 5             // 10000000
shiftBits << 6             // 00000000
shiftBits >> 2             // 00000001
```

다른 데이터 타입으로 인코딩하고 디코딩하기 위해 비트 시프트를 사용할 수 있습니다.


```swift
let pink: UInt32 = 0xCC6699
let redComponent = (pink & 0xFF0000) >> 16    // redComponent is 0xCC, or 204
let greenComponent = (pink & 0x00FF00) >> 8   // greenComponent is 0x66, or 102
let blueComponent = pink & 0x0000FF           // blueComponent is 0x99, or 153
```

이 예제는 분홍색 CSS(Cascading Style Sheets) 색상 값을 저장하기 위해 `UInt32` 상수 `pink`를 사용합니다. CSS 색상 값 `#CC6699`는 Swift1 6진수(hexadecimal) 숫자 `0xCC6699`로 표현됩니다. 이 색상은 AND 비트단위 연산자(`&`)와 비트단위 왼쪽 시프트 연산자(`>>`)를 사용해서 빨강(`CC`), 녹색(`66`), 파랑(`99`) 성분으로 분해됩니다.

빨강 구성요소(component)는 `0xCC6699`와 `0xFF0000` 숫자들간에 AND 비트단위 연산을 수행해서 얻어집니다. `0xFF0000`에서 0은 두번재와 세번째 바이트들에 마스크(mask) 효과로 `6699`가 무시되고 결과적으로 `0xCC0000`이 남게됩니다.

이 숫자는 오른쪽으로 16자리만큼 밀리게됩니다(shifted) (`>> 16`). 16진수 숫자에서 각 문자들은 8비트를 사용하며, 오른쪽으로 16만큼 이동하면 `0xCC0000`이 `0x0000CC`로 변경될 것입니다. 이것은 10진수 값 `204`을 가지는 `0xCC`와 같습니다.

비슷하게, 녹색 구성요소는 `0xCC6699`와 `0x00FF00`숫자간에 `AND` 비트단위 연산을 수행해서 결과 값 `0x6600`이 얻어집니다. 그리고나서 이러한 출력 값은 오른쪽으로 8자리만큼 밀리게 되며(shifted), 10진수 값 `102`인 `0x66`의 값이 주어집니다.

마지막으로, 파랑 구성요소는 `0xCC6699`와 `0x0000FF`숫자간에 `AND` 비트단위 연산을 수행해서 결과값 `0x000099`가 얻어집니다. `0x000099`는 이미 10진수 값 153인 `0x99`와 같으므로 오른쪽으로 밀(shift) 필요가 없습니다.


---

## Shifting Behavior for Signed Integers

부호 있는 정수형은 2진수로 표현되는 방식 때문에,부호가 없는(unsigned) 정수형 보다 부호가 있는(signed) 정수형의 시프트(shifting) 동작은 더 복잡합니다. (아래 예제는, 간단하게 8비트로 된 부호있는 정수형이지만, 모든 크기의 부호 있는 정수형에 적용되는 원칙은 같습니다 )

부호 있는 정수형은 첫번째 비트(부호비트(sign bit))를 이 정수형이 양수(positive)인지 음수(negative)인지 가리키기 위해 사용합니다. 부호 비트 `0`은 양수를 의미하고, 부호 비트 `1`은 음수를 의미합니다.

남아있는 비트들(값 비트(value bits))에 실제 값을 저장합니다. 양수는 부호 없는 정수형과 같은 방법으로 저장되며, 0부터 게산합니다.

다음은 숫자 `4`에 대한 `Int8` 비트 내부를 보여줍니다.

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-5.png)

부호 비트가 `0`(양수를 의미)이고, 7개의 값 비트는 숫자 `4`이며, 2진수 표기법으로 작성되었습니다.

하지만 음수는, 다르게 저장됩니다. `2`의 `n`제곱승(power) 에서 절대값을 빼서 저장되며, n은 값 비트 개수입니다. 8비트 숫자는 7개의 값 비트를 가지며, `2`의 `7` 제곱승 또는 128을 의미합니다.

다음은 숫자 `-4`에 대한 `Int8` 비트 내부를 보여줍니다.

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-6.png)

이번에는, 부호 비트가 `1`(음수를 의미)이고, 7개의 값 비트는 `124`의 2진 값을 가지고 있습니다 (128 - 4)

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-7.png)

음수 숫자에 대한 인코딩은 `2의 보수(two’s complement)` 표현법이라고 합니다. 음수를 표현하는 것이 이상하게 보일수 있지만, 몇가지 장점이 잇습니다.

첫번째로, `-4`에 `-1`을 더할 수 있으며, 단순하게 모든 8개의 비트들(부호 비트를 포함해서)의 표준 이진 덧셈을 수행하고, 계산이 완료되면 8비트에 맞지 않는 것들을 버립니다.

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-8.png)

두번째로, 2의 보수 표현법은 음수의 비트들을 왼쪽과 오른쪽으로 밀고(shift), 왼쪽으로 밀었을때 그 값이 여전히 두배가 되거나, 오른쪽으로 밀었을때에는(shift) 반절이 됩니다. 이를 위해서, 부호있는 정수를 오른쪽으로 밀때(shifted) 추가 규칙이 사용됩니다 : 부호있는 정수를 오른쪽으로 밀때(shift), 부호 없는 정수형과 같은 규칙이 적용되지만, 왼쪽에 비어있는 비트들을 0보다는 부호 비트(sign bit)로 채웁니다.

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-9.png)

이 동작은 부호 있는 정수형이 오른쪽으로 밀린(shifted)뒤에도 같은 부호를 가지도록 보장해 주고 산술 시프트(arithmetic shift)라고 합니다.

양수와 음수가 저장되는 특별한 방법때문에, 그것들 중 하나를 오른쪽으로 밀어(shifting)서 이동하면 0에 가까워 집니다. 부호 비트를 유지하는 것은 미는중(shift)에도 값이 0에 가까워짐에 따라, 음수의 정수형이 음수로 남아있는 것을 의미합니다.

---

## Overflow Operators

정수형 상수나 변수에 가질수 없는 값을 삽입하려고 하면, Swift는 기본적으로 유효하지 않는 값을 만드는 것을 허용하기 보다는 오류를 발생시킵니다. 이 동작은 너무 크거나 작은 숫자로 작업할때 추가적인 안정성을 제공합니다.

예를 들어, Int16 정수형 타입은 -32768과 32767 사이의 모든 부호있는 정수를 가질수 있습니다.범위를 벗어난 숫자로 Int16 상수나 변수를 설정하려고 하면 오류가 발생합니다.

```swift
var potentialOverflow = Int16.max
// potentialOverflow equals 32767, which is the maximum value an Int16 can hold
potentialOverflow += 1
// this causes an error
```

너무 크거나 너무 작은 값을 가질때 오류 처리를 제공하는 것은 경계값 조건에 대해 코딩할때 훨씬 더 융통성이 있습니다.

하지만, 사용가능한 비트를 줄이기 위해 오버플로우 조건이 필요할때, 오류를 발생시키는 대신에 이 동작을 선택할 수 있습니다. Swift는 정수형 계산에 대한 오버플로우 동작을 선택하는 3가지 산술 오버플로우 연산자(overflow operators)를 제공합니다. 이러한 연산자들은 언제나. &으로 시작합니다.

- 오버플로우 더하기 `(&+)`
- 오버플로우 빼기 `(&-)`
- 오버플로우 곱하기 `(&*)`

---

## Value Overflow

숫자들은 음수와 양수 방향 모두에서 오버플로우할 수 있습니다.

다음은 부호없는 정수형이 양수 방향으로 오버플로우가 허용됬을때 발생하는 예제이며, 오버플로우 더하기 연산자(&+)를 사용합니다.

```swift
var unsignedOverflow = UInt8.max
// unsignedOverflow equals 255, which is the maximum value a UInt8 can hold
unsignedOverflow = unsignedOverflow &+ 1
// unsignedOverflow is now equal to 0
```

변수 `unsignedOverflow`는 `UInt8`이 가질수 있는 최대 값(`255` 또는 이진수 `11111111`)으로 초기화 됩니다. 그리고나서 오버플로우 더하기 연산자(`&+`)를 사용해서 1씩 증가시킵니다. 이것은 `UInt8`이 가질수 있는 크기 이상의 이진(`binary`) 표현을 밀어넣어(`pushes`), 아래 그림에서 보는 것처럼, 범위를 넘어서 오버플로우가 발생합니다. 오버플로우 더하기 하고 난 후에 `UInt8`범위의 남은 값은 이진수 `00000000` 또는 `0`입니다

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-10.png)

부호 없는 정수형이 음수 방향으로 오버플로우가 허용될때에도 비슷합니다. 다음은 오버플로우 빼기 연산자(&-)를 사용한 예제 입니다.

```swift
var unsignedOverflow = UInt8.min
// unsignedOverflow equals 0, which is the minimum value a UInt8 can hold
unsignedOverflow = unsignedOverflow &- 1
// unsignedOverflow is now equal to 255
```

`UInt8`이 가질수 있는 최소 값은 `0` 또는 이진수 `00000000`입니다. 오버플로우 빼기 연산자(`&-`)를 사용해서 `00000000`에서 1을 빼는 경우에, 숫자는 오버플로우 되고 `11111111` 또는 `10`진수 `255`가 될 것입니다.

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-11.png)

또한, 오버플로우는 부호 있는 정수형에서도 발생합니다. [비트단위 왼쪽과 오른쪽 시프트 연산(Bitwise Left and Right Shift Operators)](https://docs.swift.org/swift-book/LanguageGuide/AdvancedOperators.html#ID34)에서 설명된 것 처럼, 부호 있는 정수형에 대한 모든 더하기와 빼기는 더하거나 빼는 숫자와 부호비트를 포함해서 비트단위로 수행됩니다.

```swift
var signedOverflow = Int8.min // signedOverflow equals -128, which is the minimum value an Int8 can hold signedOverflow = signedOverflow &- 1 // signedOverflow is now equal to 127
```

![](/assets/post_img/posts/SwiftProgrammingGuide_Advenced-12.png)

부호가 있고 부호가 없는 정수형 모두, 양수 방향으로 오버플로우가 발생하면 정수의 유효한 최대 값에서 최소 값까지 래핑(wraps)되고, 수 방향으로 오버플로우가 발생하면 최소 값에서 최대값까지 랩핑합니다.

---

## Precedence and Associativity

연산자 `우선순위(precedence)`는 몇몇 연산자에게 다른 것보다 더 높은 운선순위를 준다. 이러한 연산자들을 먼저 적용된다.

연산자 `연관성(associativity)`는 같은 우선순위의 연산자들을 그룹화 하도록 정의합니다. - 왼쪽에서부터 그룹화 되거나 오른쪽에서부터 그룹화 되는 둘중 하나. 그것은 그것들 왼쪽에 있는 표현과 관련있습니다. 또는 그것들은 오른쪽에 있는 표현과 관련있습니다. 의미로 생각합니다.

각 연산자들의 우선순위를 고려하는것이 중요하고 복합 표현식을 계산할 순서를 정하는 것과 관련있습니다. 예를 들어, 다음 표현식이 왜 `17`과 같은지 연산자 우선순위를 설명합니다.

```swift
2 + 3 % 4 * 5
// this equals 17
```

왼족에서 오른쪽으로 정확히 읽으면, 다음과 같이 계산된 식의 표현이 에상됩니다.

- 2 더하기 3은 5
- 5 나머지 4는 1
- 1 곱하기 5는 5

하지만, 실제 답은 `5`가 아니라, `17`입니다. 높은 우선순위 연산자는 낮은 우선순위 보다 먼저 처리됩니다. Swift에서, C 처럼, 나머지 연산자(`%`)와 곱하기 연산자(`*`)는 더하기 연산자(`+`) 보다 높은 우선순위를 가집니다. 결과적으로, 더하기를 구하기 전에 둘 다 처리됩니다(evaluated).

하지만, 나머지(remainder)와 곱하기(multiplication)는 서로 같은 우선순위를 가집니다. 정확한 순서를 구하려면, 그것들의 연관성을 고려해야 합니다. 나머지와 곱하기 둘다 왼쪽에 있는 표현과 관련 있습니다. 왼쪽에서 시작하는, 이러한 표현의 일부에 암묵적으로 괄호(())가 추가된 것으로 생각합니다.

```swift
2 + ((3 % 4) * 5)
```

`(3 % 4)`는 `3`이며, 다음과 같습니다.

```swift
2 + (3 * 5)
```

`(3 * 5)`는 `15`이며 다음과 같습니다.

```swift
2 + 15
```

이 계산은 마지막 답 `17`을 가져옵니다.

Swift 연산자 우선순위 목록과 관련된 규칙은 [표현(Expressions)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID383)을 보세요. Swift의 표준 라이브러리에서 제공된 연산자에 관한 정보는 [Swift 표준 라이브러리 연산자 참조(Swift Standard Library Operators Reference)](https://developer.apple.com/documentation/swift/operator_declarations)를 보세요.

> Note: Swift의 연산자 우선순위와 관련된 규칙은 간단하고 C와 Objective-C 에서 보다 더 예측가능 합니다. 하지만, Swift의 연산자 우선순위가 C 기반의 언어와 똑같지 않다는 것을 의미합니다. 기존 코드를 Swift로 이식할때(porting) 연산자 동작이 의도한 방식으로 동작하도록 조심해야 합니다.



---

## Operator Methods 

클래스와 구조체는 기존 연산자를 자체적으로 구현 할 수 있습니다. 이것은 기존 연산자를 오버로딩(overloading)한다라고 합니다

아래 예제는 사용자정의 구조체에 더하기 산술 연산자(+)를 구현하는 방법을 보여줍니다. 더하기 산술연산자는 두개의 대상에 대해 동작하기 때문에 2항 연산자(binary operator)이고 두개의 대상 사이에 나타나기 때문에 중위(infix)입니다.

예제에서 2차원 위치 벡터 `(x, y)`에 대한 구조체 Vector2D를 정의하며, 그 뒤로 `Vector2D` 구조체의 인스턴스들을 더하는 `연산자 메소드(operator method)`를 정의합니다.

```swift
struct Vector2D {
    var x = 0.0, y = 0.0
}
 
extension Vector2D {
    static func + (left: Vector2D, right: Vector2D) -> Vector2D {
        return Vector2D(x: left.x + right.x, y: left.y + right.y)
    }
}
```

연산자 메소드는 오버로드될(`+`) 연산자와 일치하는 메소드 이름으로 `Vector2D`에서 타입 메소드 처럼 정의됩니다. 더하기는 벡터에서 필수 동작이 아니기 때문에, 타입 메소드는 `Vector2D`의 주요 구조체 선언이 아닌 `Vector2D`의 확장에서 정의합니다. 더하기 산술 연잔자는 2항 연산자이기 때문에, 연산자 메소드는 두개의 `Vector2D` 타입의 입력 매개변수를 가지고 `Vector2D`타입의 단일 출력 값을 반환합니다.

이 구현에서, `Vector2D`인스턴스를 +연산자의 왼쪽과 오른쪽에 표현하기 위해 left와 right로 이름으로 된 입력 매개변수들을 가집니다. 메소드는 새로운 `Vector2D`인스턴스를 반환하며, x와 y 프로퍼티들은 함께 추가된 두개의 `Vector2D`인스턴스의 x와 y프로퍼티의 합으로 초기화 됩니다.

이 타입 메소드는 기존 `Vector2D`인스턴스 간에 중위`(infix)` 연산자 처럼 사용될 수 있습니다.

```swift
let vector = Vector2D(x: 3.0, y: 1.0)
let anotherVector = Vector2D(x: 2.0, y: 4.0)
let combinedVector = vector + anotherVector
// combinedVector is a Vector2D instance with values of (5.0, 5.0)
```

예제에서 아래 그림으로 보는 것처럼 (5.0, 5.0)벡터를 만들기 위해 두개의 (3.0, 1.0)과 (2.0, 4.0)벡터들을 더합니다.

<center><img src="/img/posts/Swift_Programming_Language-31.png" width="700"></center> <br> 

---

## Prefix and Postfix Operators 

위의 예제는 2항 중위 연산자(binary infix operator)의 사용자정의 구현한 것을 보여줍니다. 클래스와 구조체는 표준 단항 연산자(unary operators) 구현을 제공합니다. 단항 연산자는 하나의 대상에서 작동합니다. 대상의 앞에 오는 경우(`-a`) `전위(prifix)` 연산자 이고 대상의 뒤에 오는 경우(`b!`) `후위(postfix)` 연산자입니다.

연산자 메소드 선언할때 `func`키워드 앞에 `prefix`와 `postfix`를 작성하여 `전위(prefix)와 후위(postfix) 단항(unary) 연산자 구현`합니다.

```swift
extension Vector2D {
    static prefix func - (vector: Vector2D) -> Vector2D {
        return Vector2D(x: -vector.x, y: -vector.y)
    }
}
```

위의 예제는 `Vector2D`인스턴스의 단항 빼기 연산자(`-a`)를 구현합니다. 단항 빼기 연산자는 전위(prefix) 연산자이고, 이 메소드는 `prefix`로 규정되어야 합니다.

간단한 숫자의 경우, 단항 빼기 연산자는 양수를 음수로 바꿔주고, 반대의 경우도 마찬가지 입니다. Vector2D인스턴스에 대한 구현은 x와 y프로퍼티 모두 연산을 수행합니다.

```swift
let positive = Vector2D(x: 3.0, y: 4.0)
let negative = -positive
// negative is a Vector2D instance with values of (-3.0, -4.0)
let alsoPositive = -negative
// alsoPositive is a Vector2D instance with values of (3.0, 4.0)
```

---

## Compound Assignment Operators 

`복합 할당 연산자(compound assignment operators)`는 다른 연산자와 할당 연산자(`=`)를 결합한다. 예를 들어, 더하기 할당연산자(`+=`)는 단일 동작으로 더하기와 할당을 결합합니다. 매개변수들의 값이 연산자 메소드에서 수정되어야 하기 때문에, 복합 할당 연산자의 왼쪽 입력 매개변수 타입을 `inout`으로 표시합니다.

아래 예제는 `Vector2D`인스턴스에 대해 더하기 할당 연산자 메소드 구현하였습니다.

```swift
extension Vector2D {
    static func += (left: inout Vector2D, right: Vector2D) {
        left = left + right
    }
}
```

더하기 연산자는 이전에 정의했기 때문에, 여기에서 더하기 과정을 다시 구현할 필요는 없습니다. 그 대신에, 더하기 할당 연산자 메소드는 기존 더하기 연산자 메소드를 활용하고, 왼쪽 값과 오른쪽 값을 더하여 왼쪽 값을 설정하는데 사용합니다.

```swift
var original = Vector2D(x: 1.0, y: 2.0)
let vectorToAdd = Vector2D(x: 3.0, y: 4.0)
original += vectorToAdd
// original now has values of (4.0, 6.0)
```

> Note: 기본 할당 연산자(`=`)를 오버로드(overload)하는 것은 불가능합니다. 복합 할당 연산자만 오버로드(overloaded) 할 수 있습니다. 비슷하게 3항(ternary) 연산자(`a ? b : c`)도 오버로드 할 수 없습니다.

---

## Equivalence Operators

사용자정의 클래스와 구조체는 `같다(equal to) 연산자(==)와 같지 않다(not equal to) 연산자(!=)` 처럼, 등가 연산자(equivalence operators)의 기본 구현을 사용하지 못합니다. 같음(equal)의 의미는 코드에서 해당 타입의 규칙에 따라 다르기 때문에, Swift는 사용자정의 타입에 대해 같음(equal)라고 추측하는 것은 불가능합니다.

사용자정의 타입이 동일한지 확인하기 위해 등가 연산자를 사용하며, `equal to`연산자의 구현을 제공하는 표준라이브러리의 `Equatable` 프로토콜에 적합성을 추가하세요.

```swift
extension Vector2D: Equatable {
    static func == (left: Vector2D, right: Vector2D) -> Bool {
        return (left.x == right.x) && (left.y == right.y)
    }
```

위의 예제에서 두개의 `Vector2D`인스턴스가 같은 값을 가지고 있는지 확인하기 위해, 같다(equal to)연산자(`==`)를 구현하였습니다. Vector2D의 컨텍스트(context)에서, 두 인스턴스가 같은 `x`값과 `y`값을 가지고 있다는 의미 처럼 같음(equal)이라고 생각하는것이 합리적이고, 이 로직은 연산자 구현에 의해 사용됩니다. 또한, 예제는 단순히 같다(equal to)의 결과를 반전시켜 반환하는 같지 않다(not equal to)를 구현합니다.

두개의 `Vector2D`인스턴스가 같은지 확인하기 위해 이러한 연산자를 사용할 수 있습니다.

```swift
let twoThree = Vector2D(x: 2.0, y: 3.0)
let anotherTwoThree = Vector2D(x: 2.0, y: 3.0)
if twoThree == anotherTwoThree {
    print("These two vectors are equivalent.")
}
// Prints "These two vectors are equivalent."
```

Swift는 다음 유형의 사용자 정의 타입에 대해 등가 연산자의 합성된 구현을 제공합니다.

- `Equatable` 프로토콜을 준수하는 속성만 저장된 구조 
- `Equatable`프로토콜을 준수하는 연관된 타입만 포함하는 열거형 
- 연관된 타입들이 없는 열거형 

`Equatable`이 기본 구현을 받을수있는 타입의 원래 선언의 일부로서 적합성을 선언합니다.

아래 예제는 `Vector3D` 구조(x, y, z)와 비슷한 3차원 위치 벡터의 구조를 정의합니다. Vector2D 때문에 x,y 그리고 z 속성이 모두 있는 `Equatable`형태, Vector3D 등가 연산자의 기본 구현을 받습니다. 

```swift
struct Vector3D: Equatable {
    var x = 0.0, y = 0.0, z = 0.0
}
 
let twoThreeFour = Vector3D(x: 2.0, y: 3.0, z: 4.0)
let anotherTwoThreeFour = Vector3D(x: 2.0, y: 3.0, z: 4.0)
if twoThreeFour == anotherTwoThreeFour {
    print("These two vectors are also equivalent.")
}
// Prints "These two vectors are also equivalent."
```


---

## Custom Operators

Swift에서 제공하는 표준 연산자외에 추가적으로 `사용자정의 연산자(custom operators)`를 선언하고 구현할 수 있습니다. 사용자 정의 연산자에 사용할 수 있는 문자 목록을 보려면, [연산자(Operators)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-ID418)를 보세요.

새로운 연산자들은 operator키워드로 `전역 레벨에서 선언되고`,prefix, inpix, postfix`로 표시됩니다.

```swift
prefix operator +++
```

위 예제에서 새로운 전위(prefix) 연산자 `+++`를 정의 하였습니다. 이 연산자는 Swift에서 존재하지 않고, 아래의 사용자 정의된 의미가 주어집니다. `Vector2D`인스턴스로 작업하는 특정 상황(context)에서 아래의 사용자정의 의미를 부여 받습니다. 이 예제의 목적을 위해, `+++`은 prefix doubling 연산자로 취급합니다. 이전에 정의된 더하기 할당연산자로 자신의 벡터를 더함으로써 `Vector2D`인스턴스의 `x`와 `y` 값들을 두배(doubles)로 합니다. +++연산자 구현을 위해, 다음과 같이 Vector2D에 `+++` 타입 메소드를 추가합니다.

```swift
extension Vector2D {
    static prefix func +++ (vector: inout Vector2D) -> Vector2D {
        vector += vector
        return vector
    }
}

var toBeDoubled = Vector2D(x: 1.0, y: 4.0)
let afterDoubling = +++toBeDoubled
// toBeDoubled now has values of (2.0, 8.0)
// afterDoubling also has values of (2.0, 8.0)
```

---

## Precedence for Custom Infix Operators

사용자정의 중위(infix) 연산자들은 각각 우선순위 그룹에 속할 수 있습니다. 우선순위 그룹은 다른 중위(infix) 연산자와 관련하여 연산자들의 연관성(associativity)과 마찬가지로, 연산자들의 우선순위를 지정합니다. 이러한 특성들이 중위 연산자와 다른 중위 연산자와의 상호 작용에 미치는 영향에 대한 설명은 [우선순위와 연관성(Precedence and Associativity)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID41)을 보세요.

우선순위 그룹에 명시적으로 배치되지 않은 사용자정의 중위(infix) 연산자는 3항 조건 연산보다 우선순위가 더 높은 기본 우선순위 그룹이 주어집니다.

다음 예제는 `AdditionPrecedence` 우선순위 그룹에 속한 새로운 사용자정의 중위(infix)연산자 `+-`를 정의합니다.

```swift
infix operator +-: AdditionPrecedence
extension Vector2D {
    static func +- (left: Vector2D, right: Vector2D) -> Vector2D {
        return Vector2D(x: left.x + right.x, y: left.y - right.y)
    }
}
let firstVector = Vector2D(x: 1.0, y: 2.0)
let secondVector = Vector2D(x: 3.0, y: 4.0)
let plusMinusVector = firstVector +- secondVector
// plusMinusVector is a Vector2D instance with values of (4.0, -2.0)
```

이 연산자는 두 벡터의 `x`값들을 더하고, 첫번째 벡터에서 두번째 벡터의 `y`값을 빼줍니다. 이것은 본질적으로 추가하는(addtive)연산자이기 때문에, +와 -처럼, 추가 중위 연산자(additive infix operators) 같은 우선순위 그룹이 주어집니다. Swift 표준 라이브러리에서 제공하는 연산자에 대한 연산자 우선순위 그룹과 연관성 설정의 전체 목록을 보려면, [Swift 표준 라이브러리 연산자 참조(Swift Standard Library Operators Reference)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID380)를 보세요. 우선순위 그룹에 관해 자세한 내용과 자신의 연산자와 우선순위 그룹에 대해 정의하는 구문을 보려면, [연산자 선언(Operator Declaration)](https://developer.apple.com/documentation/swift/operator_declarations)을 보세요.

> Note: 전위(prefix)또는 후위(postfix) 연산자를 정의 할때 우선 순위를 지정하지 않습니다. 하지만, 전위(prefix)와 후위(postfix) 연산자 둘다 동일한 피연산자로 적용하면, 후위(postfix) 연산자가 먼저 적용됩니다.

---


