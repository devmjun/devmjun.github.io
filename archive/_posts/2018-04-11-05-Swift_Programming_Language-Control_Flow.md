---
layout:     post
title:      "Swift. 정리하기 5: Swift Language Guide-Control Flow"
subtitle:   "Swift Language Guide-Control Flow"
date:       2018-04-11 20:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
---
 
최종 수정일: 2018.10.1

## Reference 

까칠코더 글을 그대로 가져 왔ㅅ브니다. 자료의 원 주소는 아래에 있습니다.

[COntrol Flow](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html)<br>
[까칠 코더님 블로그](http://kka7.tistory.com/111?category=919617)<br>

---

## Control Flow

Swift는 다양한 흐름제어 구문(statements)을 제공합니다. 여러번 작업을 하기 위한 `while` 반복문도 포함하고 있습니다: 특정 조건에서 코드를 다른 코드로 분기하기 위해 `if, guard, switch` 문을 사용합니다.; 그리고 코드 흐름을 다른 부분으로 변경하기 위해서 `break`와 `continue` 문을 사용합니다.

또한, Swift는 배열(array), 딕셔너리(dictionaries), 범위(ranges), 문자열(strings), 다른 시퀀스(sequences)에서 반복을 쉽게하기 위해 `for-in`반복문을 제공합니다.

Swift의 switch 문은 C와 비슷한 언어들보다 훨씬 더 강력합니다. Cases는 다른 많은 패턴 검색(match), 간격(interval) 검색, 튜플, 특정타입으로의 형변환을 할수 있습니다. `switch`에서 일치되는 값은 경우에 임시 상수나 변수로 바인딩 하여 case의 본문에서 사용할 수 있고, 복잡한 검색 조건은 각 case에 대해서 where절로 표현할 수 있습니다.

---

## For-In Loops

배열내의 항목들, 숫자의 범위, 문자열에서의 문자들을 순서대로 반복하기 위해 for-in 반복문을 사용합니다.

다음은 배열내의 항목들을 반복하기 위해 `for-in` 반복문을 사용한 예제입니다.

```swift
let names = ["Anna", "Alex", "Brian", "Jack"]
for name in names {
    print("Hello, \(name)!")
}
// Hello, Anna!
// Hello, Alex!
// Hello, Brian!
// Hello, Jack!
```

key-value 쌍을 사용하기 위해, 딕셔너리를 반복할 수 있습니다. 딕셔너리가 반복될때, 딕셔너리내의 각 항목은 `(key, value)` 튜플처럼 반환되고, `(key, value)` 튜플의 멤버를 for-in 반복문의 본문에서 사용할 수있는 명시적인 상수로 분리(decompose) 할수 있습니다. 아래 예제 코드에서, 딕셔너리의 키는 `animalName` 상수우로 분리하고, 그 딕셔너리 값은 `legCount` 상수로 분리됩니다.

```swift
let numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
for (animalName, legCount) in numberOfLegs {
    print("\(animalName)s have \(legCount) legs")
}
// ants have 6 legs
// cats have 4 legs
// spiders have 8 legs
```

`Dictionary`의 컨텐츠는 본질적으로(inherently) 정렬되어 있지 않고, 반복(iterating)을 해도 순서를 보장하지 않습니다. 특히, Dictionary에 삽입되는 순서대로 반복되지 않습니다. 배열과 딕셔너리에 대해 더 자세한 정보는 [컬레션 타입(Collection types)](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html)를 보세요.

숫자 범위로 for-in 반복문을 사용할 수 있습니다. 이 예제는 5단(five-times table)의 처음 몇개를 출력합니다.

```swift
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
```

반복되는 순서는 1에서 5까지 숫자 범위를 포함하며, 닫힘 범위 연산자(`...`)를 사용하여 표현되었습니다. `index`의 값은 범위에서 첫번째 값인 (1)을 설정하고, 문장내의 반복문은 실행됩니다. 이 경우에, 반복문은 하나의 문장만 포함하며, index의 현재 값에 대해 5단을 출력합니다. 그 문장이 실행된 후에, index의 값은 범위에서 두번째 값으로 업데이트되고, `print(_:separator:terminator:)` 함수는 다시한번 호출됩니다. 이 과정은 범위가 끝날때까지 계속됩니다.

위의 예제에서, `index`는 반복문의 각 반복의 시작 위치를 자동적으로 설정하는 상수입니다. 따라서, `index`는 그것을 사용하기 전에 선언할 필요가 없습니다. 그것은 반복문 선언에 포함되어, let 선언 키워드 없이, 암시적으로 선언됩니다.

순서의 각 값이 필요없는 경우에, 변수 이름 위치에 밑줄(_)를 사용하여 값을 무시 할 수 있습니다.

```swift
let base = 3
let power = 10
var answer = 1
for _ in 1...power {
    answer *= base
}
print("\(base) to the power of \(power) is \(answer)")
// Prints "3 to the power of 10 is 59049"
```

위의 예제는 하나의 숫자를 다른 숫자 제곱(`power`) 값을 계산합니다( 이경우에, 3을 10 제곱). 시작값 `1`(여기에서 `3`을 0 제곱)에 `3`을 곱하며, `10`번, 1로 시작해서 10으로 끝나는 닫힌 범위를 사용합니다. 이 계산에서, 반복문을 통과할때마다 개별 갯수 값은 필요가 없습니다 - 코드는 정확한 횟수 만큼 반복문을 실행합니다. 밑줄 문자(`_`)는 반복문 변수 위치에서 사용되어, 개별 값은 무시되고 반복문이 반복되는 동안에 현재 값에 접근하는 것을 제공하지 않습니다.

어떤 상황에서는, 양쪽 끝점을 포함하는 닫힌 범위를 원하지 않을때가 있습니다. 시계에서 매분마다 눈금(tick marks)를 그리는것을 생각해 봅시다. 0분부터 시작해서 60개의 눈금을 그려야 합니다. 아랫쪽은 포함하지만 윗쪽은 포함하지 않는 반 개방(half-open) 범위 연산자(`..<`)를 사용합니다. 범위에 대해 자세한 것은, [범위 연산자(Range Operators)](https://docs.swift.org/swift-book/LanguageGuide/BasicOperators.html#ID73)를 보세요.

```swift
let minutes = 60
for tickMark in 0..<minutes {
    // render the tick mark each minute (60 times)
}
```

어떤 사용자들은 UI에서 눈금이 더 적은것을 원할 수도 있습니다. 매 5분마다 하나를 표시하는 것을 선호할 수 있습니다. 원하지 않는 표시를 건너띄기 위해서 `stride(from:to:by:)` 함수를 사용합니다.

```swift
let minuteInterval = 5
for tickMark in stride(from: 0, to: minutes, by: minuteInterval) {
    // render the tick mark every 5 minutes (0, 5, 10, 15 ... 45, 50, 55)
}
```

`stride(from:through:by:)`를 사용하여 닫힌 범위도 가능합니다.

```swift
let hours = 12
let hourInterval = 3
for tickMark in stride(from: 3, through: hours, by: hourInterval) {
    // render the tick mark every 3 hours (3, 6, 9, 12)
}
```

---

## While Loops

`while` 반복문은 조건이 `false`될때까지 설정한 구문을 반복해서 실행합니다. 이러한 종류의 반복문은 처음 반복을 시작하기 전에 반복횟수를 알수 없을때 사용하기 좋습니다. Swift는 2가지 종류의 while 반복문을 제공합니다.

- `while` 반복문을 매번 `시작`할때마다 조건을 평가합니다.
- `repeat-while 반복문을` 매번 `끝낼때`마다 조건을 평가합니다

### While 

`while` 반복문은 하나의 조건을 평가하는 것으로 시작합니다. 조건이 `true`이면, `false`가 될때까지 설정된 문장이 반복됩니다.

다음은 while반복문의 일반적인 형태입니다.

```swift
while condition {
    statements
}
```

이 예제는 뱀과 사다리(Snakes and Ladders) 게임을 합니다. (미끄럼틀과 사다리(Chutes and Ladders)라고도 합니다.)


![](/assets/post_img/posts/SwiftLanguageGuide_ControlFlow_0.png)

게임의 규칙은 다음과 같습니다.

- 보드는 25칸이고, 25칸에 도착하거나 넘는 것이 목표(aim)입니다.
- 플레이어는 왼쪽 아래 구석에 있는 0번 칸(sequare zero)에서 시작합니다.
- 매 턴마다, 6면 주사위를 던지고 숫자마다 이동하며, 점선 화살표로 표시된 수평 경로를 따라 갑니다.
- 턴이 사다리 아래에서 끝나면, 사다리를 타고 올라갑니다.
- 턴이 뱀의 버리 에서 끝나면, 뱀을 타고 내려갑니다.

이 게임보드는 `Int` 값의 배열로 표현되고 있습니다. 예제에서, 보드 게임의 크기는 `finalSquare` 상수를 기반으로하며, 배열을 초기화하고 승리조건을 확인하기 위해 사용합니다. 플레이어가 0번 칸에서 시작하기 때문에, 보드는 25개가 아니라 26개를 Int 0(zero)인 값으로 초기화되었습니다.

```swift
let finalSquare = 25
var board = [Int](repeating: 0, count: finalSquare + 1)
```

일부 칸은 뱀과 사다리에 대한 특정 값을 가지도록 설정합니다. 사다리 칸은 보드에서 위로 이동하기 위해서 양수(positive number)를 가지는 반면에, 뱀 머리 칸은 보드에서 아래로 이동하기 위해 음수(negative number)를 가집니다.

```swift
board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02 board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
```

3번 칸은 11번 칸으로 이동하는 사다리 아랫쪽입니다. 이를 표현하기 위해, board[03]은 정수값 8(3과 11간의 차이)에 해당하는 +08과 같습니다. 값(values)과 구문(statements)을 정렬하기 위해, 명시적으로 단항(unary) 더하기 연산자(+i)와 단항 빼기 연산자(-i)를 사용하고, 10보다 낮은수는 0으로 채웁니다. (형식이 엄격할 필요는 없지만, 코드를 깔끔하게 해줍니다)

```swift
var square = 0
var diceRoll = 0
while square < finalSquare {
    // roll the dice
    diceRoll += 1
    if diceRoll == 7 { diceRoll = 1 }
    // move by the rolled amount
    square += diceRoll
    if square < board.count {
        // if we're still on the board, move up or down for a snake or a ladder
        square += board[square]
    }
}
print("Game over!")
```

위의 예제는 주사위를 굴리는 매우 간단한 방법을 사용합니다. 임의의 숫자를 만드는 대신에, diceRoll의 값은 `0`으로 시작합니다. `while` 반목문을 반복할때마다, `diceRoll`은 1씩 증가하고 너무 커지지 않은지 확인합니다. 반환 값이 7일때, 주사위로 굴리기에는 너무 큰 값이고, 1로 재설정합니다. diceRoll 값은 언제나 1, 2, 3, 4, 5, 6, 1, 2, 등등(so on) 순서로 반환됩니다.

주사위를 굴리고나서, 플레이어는 diceRoll칸 만큼 앞으로 이동합니다. 주사위를 굴려 플레이어가 25번 칸을 넘는 경우에, 게임은 끝이 납니다. 이 시나리오를 잘 처리하기 위해서, 코드에서 square가 board 배열의 count프로퍼티보다 작은지 확인합니다. square가 유효하면, 플레이어를 사다리나 뱀의 위, 아래로 이동하기 위해 board[square]에 저장된 값에 현재 square를 더합니다.

> Note: 이러한 확인이 수행되지 않으면, `board[square]`는 board 배열의 범위 바깥의 값을 사용하려고 할것이며, 런타임 오류가 발생합니다.

현재 while 반복문 실행이 끝나고 나면, 반복문을 다시 실행해야하는지에 대해 반복문의 조건을 확인합니다. 플레이어가 25번 칸으로 가거나 넘어서는 경우, 반복문의 조건은 false가 되고 게임은 끝이납니다.

while 반복문의 시작부분에서 게임의 길이가 명확하지 않기 때문에, 이 경우에 while 반복문이 어울립니다. 대신에, 반복문은 특정 조건이 만족할때까지 실행됩니다.

### Repeat-While

`repeat-while` 반복문은 while 반복문의 다른 변형이며, `repeat-while` 반복문이며, 반복문의 조건을 검토하기 전에, `첫번째 블럭은 통과`되어 수행합니다. 그리고나서 조건이 `false`가 될때까지 반복문을 계속 반복합니다.

> Note: Swift에서`repeat-while` 반복문은 다른 언어의 `do-while` 반복문과 유사합니다.

다음은 `repeat-while` 반복문의 일반적인 형태입니다.

```swift
repeat {
    statements
} while condition
```

다음은 `while` 반복문 대신에 `repeat-while` 반복문으로 뱀과 사다리(Snakes and Ladders) 예제를 다시 작성한 것입니다. `finalSquare, board, square, diceRoll`의 값은 while 반복문과 똑같은 방법으로 초기화 됩니다.

```swift
let finalSquare = 25
var board = [Int](repeating: 0, count: finalSquare + 1)
board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
var square = 0
var diceRoll = 0
```

이 게임 버젼에서, 반복문에서 첫번째(`first`) 동작은 사다리나 뱀인지 확인하는 것입니다. 보드에서 사다리가 없으면 플레이어는 25 칸으로 직진하므로, 사다리 위로 올라가서 게임을 이기는 것이 불가능합니다. 따라서, 반복문의 첫번째 동작에서 뱀이나 사다리를 확인하는 것이 안전합니다.

게임의 시작부분에서, 플레이어는 0번 칸(square zero)에 있습니다. board[0]은 항상 0이고 아무것도 하지 않습니다.

```swift
repeat {
    // move up or down for a snake or ladder
    square += board[square]
    // roll the dice
    diceRoll += 1
    if diceRoll == 7 { diceRoll = 1 }
    // move by the rolled amount
    square += diceRoll
} while square < finalSquare
print("Game over!")
```

뱀과 사다리에 대해 확인하는 코드 이후에, 주사위를 던지고 플레이어는 diceRoll 칸만큼 앞으로 이동합니다. 현재 반복문의 실행은 종료됩니다.

반복문의 조건(`while square < finalSquare`)은 이전과 같지만, 이번에는 반복문의 첫번째 실행이 끝날때까지 처리되지 않습니다. `repeat-while` 반복문의 구조는 이전 예제의 while 구조보다 이 게임에 더 적합합니다. 위의 repeat-while 반복문에서, square += board[square]은 항상 while 반복문에서 square가 아직 보드에 있는지에 대한 조건을 준수한 직후(immediately after)에 실행되됩니다. 이전 게임 버젼에서 봤던 while 반복문 버젼에서 배열의 영역을 확인하는 동작은 필요 없습니다.


---

## Conditional Statements

특정 조건에 따라 코드의 다른 부분을 실행하는 것이 유용할 때가 있습니다. 오류가 발생했을때 추가 코드를 실행하길 원하거나, 값이 너무 높거나 낮을때 메시지를 보여지길 원할수도 있습니다. 이를 위해서, 코드의 일부를 조건문(conditional)으로 만듭니다.

Swift는 코드에서 조건부 분기를 추가하기 위해 2가지 방법을 제공합니다. : `if` 문과 `switch`문입니다. 일반적으로, 몇가지 가능한 결과를 간단한 조건으로 처리하기 위해 `if`문을 사용합니다. `switch`문은 치환(permutation) 가능한 여러개를 사용하여 더 복잡한 조건에 더 어울리고 적절한 코드 분기를 선택하는데 도움이 되는 패턴 매칭 상황에서 유용합니다.


### If

가장 간단한 형태로, `if`문은 하나의 `if` 조건을 가집니다. 조건이 `true`일때에만 설정한 구문을 실행합니다.

```swift
var temperatureInFahrenheit = 30
if temperatureInFahrenheit <= 32 {
    print("It's very cold. Consider wearing a scarf.")
}
// Prints "It's very cold. Consider wearing a scarf."
```

위의 예제에서 온도가 화씨(Fahrenheit) 32도(물이 어는 빙점) 이하인지 확인합니다. 만약 그렇다면, 메시지가 출력됩니다. 그렇지 않은 경우에, 메시지가 출력되지 않고, 코드 실행은 if문 닫힘 괄호(}) 이후의 코드를 실행합니다.

if문은 if 조건이 false가 될때의 상황에서, else 절(clause)이라는 다른 설정 문법을 제공할 수 있습니다. 이러한 법은 else키워드로 표시되어있습니다.

```swift
temperatureInFahrenheit = 40 
if temperatureInFahrenheit <= 32 { 
	print("It's very cold. Consider wearing a scarf.") } 
	else { print("It's not that cold. Wear a t-shirt.") 
} 
// Prints "It's not that cold. Wear a t-shirt."
```

두개의 분기중 하나는 항상 실행됩니다. 온도가 화씨 40도 까지 증가하면, 더 이상 스카프를 입을 만큼 춥지 않기 때문에, else 분기(branch)가 대신 실행됩니다.

여러개의 if문을 연결하여 추가적인 절(clauses)을 구성할수 있습니다.


```swift
temperatureInFahrenheit = 90
if temperatureInFahrenheit <= 32 {
    print("It's very cold. Consider wearing a scarf.")
} else if temperatureInFahrenheit >= 86 {
    print("It's really warm. Don't forget to wear sunscreen.")
} else {
    print("It's not that cold. Wear a t-shirt.")
}
// Prints "It's really warm. Don't forget to wear sunscreen."
```

여기에서, 추가된 if문은 따뜻한 온도에 대해서 추가되었습니다. 마지막 else절이 남고, 너무 따뜻하거나 너무 추울때를 제외한 모든 온도에 대해서 출력합니다.

마지막 else 절은 선택적이지만, 조건문 설정이 완료될 필요가 없는 경우에는 제외할수 있습니다.

```swift
temperatureInFahrenheit = 72
if temperatureInFahrenheit <= 32 {
    print("It's very cold. Consider wearing a scarf.")
} else if temperatureInFahrenheit >= 86 {
    print("It's really warm. Don't forget to wear sunscreen.")
}
```

온도가 너무 춥거나 너무 따듯하지도 않기 때문에 `if` 또는 `else if` 조건이 처리될때 메시지가 출력되지 않습니다.

### Switch 

switch 문은 하나의 값과 사용가능한 여러개의 패턴 매칭을 비교하는 것으로 구성되어 있습니다. 처음으로 패턴 매칭이 성공하는 것을 기반으로, 적절한 코드 블럭을 실행합니다. `switch`문은 여러가지 응답가능한 상태에 대해 if문 대신에 사용할수 있습니다.

간단한 형태로, `switch`문은 동일한 타입의 하나 이상의 값과 비교합니다.



```swift
switch some value to consider {
case value 1:
    respond to value 1
case value 2,
     value 3:
    respond to value 2 or 3
default:
    otherwise, do something else
}
```

`switch`문은 여러개의 `cases`로 구성되어 있으며, 각각은 `case`키워드로 시작합니다. 특정 값을 비교하는 것 외에, `Swift`는 좀 더 복잡한 패턴 매칭을 지정하는 몇가지 방법을 제공합니다. 이러한 옵션을 이 챕터(chapter)의 뒷부분에 설명되어 있습니다.

if문의 본문과 같이, 각 `case`는 별도의 코드 실행 분기(branch)입니다. `switch`문은 어떤 분기를 선택할지 결정합니다. 이러한 처리 방식을 고려중인 값을 전환(switching)하는 것으로 알려져 있습니다.

언제나 switch문은 완벽(`exhaustive`)해야 합니다. 그것은 검토하는 타입의 값이 switch case 중의 하나와 반드시 일치해야합니다. 가능한 값에 대해 모든 case가 적절하지 않는 경우에, 명시적으로 언급되지 않은 모든 값을 다루는 `default case`를 정의할 수 있습니다. default case는 default 키워드로 표시되고, 항상 마지막에 있어야 합니다.

다음은 하나의 소문자 `someCharacter`를 확인하기 위해 switch문을 사용한 예제입니다.

```swift
let someCharacter: Character = "z"
switch someCharacter {
case "a":
    print("The first letter of the alphabet")
case "z":
    print("The last letter of the alphabet")
default:
    print("Some other character")
}
// Prints "The last letter of the alphabet"
```

`switch`문의 첫번째 case는 영어 알파벳의 첫번째 글자 `a`와 일치하고 두번째 case는 마지막 글자 z와 일치합니다. `switch`는 알파벳 문자 뿐만아니라 사용가능한 모든 문자에 대한 `case`가 필요하며, `switch`문은 a와 z와 다른 모든 문자와 일치하는 `defaultcase`를 사용합니다. 이 규정(provision)은 switch문이 완전한(exhaustive) 것을 보장합니다.


### No Implicit Fallthrough

C와 Objective-C에서의 `switch`문과는 다르게, Swift에서의 switch문은 기본적으로 각 case의 아래로 빠져 나와 다음으로 이동하지 못하며, 전체 switch 문은 명시적으로 `break` 문이 필요하지 않고, 첫번째 일치하는 `switchcase`가 완료되자마자 종료됩니다. 이 switch문은 C에서 사용하는 것보다 안전하고 사용하기 쉽고 실수로 하나 이상의 switch case 가 실행되지 않게 해줍니다.

> Note: `Swift`에서는 비록 break가 필요하지 않지만, 특정 case에서 멈추거나 일치한 case 실행이 완료되기 전에 멈추게 하기 위해 `break` 문을 사용할 수 있습니다. 자세한 것은 [Switch 문에서 멈추기(Break in a Switch Statement)](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID139)를 보세요.

각 case의 본문은 반드시(`must`) 최소 실행가능한 문장을 하나를 포함해야 함니다. 다음에 오는 코드는 첫번째 case가 비어 있기 때문에 유효하지 않습니다.


```swift
let anotherCharacter: Character = "a"
switch anotherCharacter {
case "a": // Invalid, the case has an empty body
case "A":
    print("The letter A")
default:
    print("Not the letter A")
}
// This will report a compile-time error.
```

C에서의 `switch`문과는 다르게, switch문은 a와 A 모두 일치하지 않습니다. 오히려(Rather), 컴파일 할때 case a가 실행가능한 문장이 포함되어 있지 않다는 오류가 발생합니다. 이 방법은 우연히 다른 case로 빠지는(fallthrough) 것을 피하고 의도가 명확한 안전한 코드를 만들어 줍니다.

하나의 `case`에서 a와 A 모두 일치하는 `switch`을 만드려면, 값을 쉼표(,)로 구분하여, 두 값을 복합 case로 결합합니다.

```swift
let anotherCharacter: Character = "a"
switch anotherCharacter {
case "a", "A":
    print("The letter A")
default:
    print("Not the letter A")
}
// Prints "The letter A"
```

가독성(readability)을 위해, 복합(compound) case는 여러줄로 작성할수 있습니다. 복합 case에 관한 자세한 정보는 복합 case(Compound Cases)를 보세요.

> Note: 특정 `switch` case의 끝부분에, 명시적으로 빠지게 하려면(fall through), fallthrough 키워드를 사용하며, [Fallthrough](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID140)에 설명되어 있습니다.

### Interval matching

`swith` case 에서 값을 간격(interval)에 포함되었는지 확인할 수 있습니다. 다음 예제는 모든 크기의 숫자에 대해 자연어(`natural-language`)를 제공하기 위해 숫자 간격을 사용하였습니다.

```swift
let approximateCount = 62 let countedThings = "moons orbiting Saturn" let naturalCount: String 
switch approximateCount { 
	case 0: naturalCount = "no" 
	case 1..<5: naturalCount = "a few" 
	case 5..<12: naturalCount = "several" 
	case 12..<100: naturalCount = "dozens of" 
	case 100..<1000: naturalCount = "hundreds of" 
	default: naturalCount = "many" 
}
print("There are \(naturalCount) \(countedThings).")
// Prints "There are dozens of moons orbiting Saturn."
```

위의 예제에서, approximateCount는 switch문에서 처리되었습니다. 각 case는 숫자나 간격에 대한 값을 비교합니다. approximateCount의 값은 12와 100사이에 있기 때문에, naturalCount는 "dozens of" 값이 할당되고, switch 문의 바깥으로 실행이 옮겨집니다.

### Tuples 

동일한 switch 문에서 여러개의 값을 테스트 하기 위해 튜플을 사용할 수 있습니다. 튜플의 각 요소는 다른 값이나 값의 간격에 대해 테스트 할수 있습니다. 또는, 가능한 모든 값과 일치하기 위해, 와일드카드(`wildcard`) 패턴으로 알려진, 밑줄(`_`)을 사용합니다.

아래 예제에서 `(x, y)` 좌표를 가져오며, 간단한 튜플 `(Int, Int)`타입으로 표현되고, 다음 예제의 그래프로 분류합니다.



```swift
let somePoint = (1, 1)
switch somePoint {
case (0, 0):
    print("\(somePoint) is at the origin")
case (_, 0):
    print("\(somePoint) is on the x-axis")
case (0, _):
    print("\(somePoint) is on the y-axis")
case (-2...2, -2...2):
    print("\(somePoint) is inside the box")
default:
    print("\(somePoint) is outside of the box")
}
// Prints "(1, 1) is inside the box"
```

<center><img src="/assets/post_img/posts/Swift_Programming_Language-4.png" width="500"></center> <br> 

`switch`문은 좌표가 빨간색 x축에 있는지, 오렌지색 y축에 있는지, 원점 (0,0)에 있는지, 원점을 중심으로 4-4 상자 안이나 바깥쪽에 있는지를 결정합니다.

C와는 다르게, Swift는 동일한 값이나 값들에 대해 여러개의 switch case를 허용합니다. 사실상, (0, 0) 좌표는 예제에서 4개의 모든 case와 일치할수 있습니다. 하지만, 여러개가 일치하는 경우에, `항상 첫번째로 일치하는 case가 사용됩니다.` (0, 0)좌표는 case (0, 0)과 먼저 일치하고, 다른 일치되는 모든 case들은 무시됩니다.




### Value Bindings

`switch` case는 일치하는 값이나 값들을 본문에서 사용하는 임시 상수나 변수로 이름 지을수 있습니다. case 본문에서 임시 상수나 변수로 값을 바인딩하기 때문에, 이러한 동작을 값 바인딩(value binding)이라고 합니다.

아래 예제는 (x, y) 좌표를 가지며, `(int, Int)` 타입의 튜플로 표현되고, 다음에 오는 크래프로 분류합니다.


```swift
let anotherPoint = (2, 0)
switch anotherPoint {
case (let x, 0):
    print("on the x-axis with an x value of \(x)")
case (0, let y):
    print("on the y-axis with a y value of \(y)")
case let (x, y):
    print("somewhere else at (\(x), \(y))")
}
// Prints "on the x-axis with an x value of 2"
```

<center><img src="/assets/post_img/posts/Swift_Programming_Language-5.png" width="500"></center> <br> 

`switch`문은 좌표가 붉은 x축에 있는지, 오렌지색 y축에 있는지, 다른 경우(어느 축에도 없는)를 결정합니다.

3가지 `switch` case는 `anotherPoint`의 하나 또는 두개의 튜플 값을 임시로 가지는 상수 x, y로 선언합니다. 첫번째 case, `case (let x, 0)`은 0인 `y` 값과 임시 상수 `x`에 좌표값의 `x` 값을 할당하는 모든 좌표와 일치합니다. 비슷하게, 두번째 `case, case (o, let y)`는 0인 x값과 임시 상수 y에 좌표값의 y값을 할당하는 모든 좌표와 일치합니다.

임시 상수가 선언된 후에, case의 코드 블럭 안에서 사용될 수 있습니다. 여기에서, 좌표의 범주(categorization)를 출력하는데 사용됩니다.

switch 문은 default case를 가지고 있지 않습니다. 마지막 case, let (x, y)는 모든 값과 일치할수 있는 두개의 자리표시자(placeholder) 상수로 된 튜플을 선언합니다. anotherPoint가 항상 두 값의 튜플이기 때문에, 이 case는 남은 모든 값이 가능하고, switch문을 완벽(exhaustive) 하게 만들기 위한 default case는 필요가 없습니다.



### Where 

switch case는 추가적인 조건을 확인하기 위해 `where`절을 사용할 수 있습니다.

아래 예제는 다음 그래프에서의 (x, y) 좌표의 범주(categorizes) 입니다.

```swift
let yetAnotherPoint = (1, -1)
switch yetAnotherPoint {
case let (x, y) where x == y:
    print("(\(x), \(y)) is on the line x == y")
case let (x, y) where x == -y:
    print("(\(x), \(y)) is on the line x == -y")
case let (x, y):
    print("(\(x), \(y)) is just some arbitrary point")
}
// Prints "(1, -1) is on the line x == -y"
```

<center><img src="/assets/post_img/posts/Swift_Programming_Language-6.png" width="500"></center> <br> 

`switch` 문은 `where x == y`줄에서 좌표가 녹색 대각선인지, where `x == -y` 줄에서보라색 대각선인지, 그외의 것들을 결정합니다.

3개의 `switch. case`는 자리표시자 상수 x와 y로 선언되며, `yetAnotherPoint`로부터 두개의 튜플 값을 임시로 가집니다. 이러한 상수들은 동적 필터를 만드는 where절에서 사용됩니다. switch case는 where절의 조건 값이 true인 경우에만, point의 현재 값과 일치합니다.

이전 예제에서 처럼, 마지막 case는 모든 남은 값이 가능하고, switch 문을 완벽히 하기 위한 `default` case는 필요하지 않습니다.

### Compound Cases 

여러개의 `switch case`는 case문 뒤에 몇가지 패턴 사이에 콤마(`,`)를 넣어 만들어, 동일한 본문을 공유하도록 결합(`combined`) 할 수 있습니다. 패턴 중에 하나라도 일치하면, case는 일치하는 것으로 간주됩니다(considered). 패턴들이 길어지는 경우, 여러줄로 작성할 수 있습니다. 예를들어:


```swift
let someCharacter: Character = "e"
switch someCharacter {
case "a", "e", "i", "o", "u":
    print("\(someCharacter) is a vowel")
case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
     "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
    print("\(someCharacter) is a consonant")
default:
    print("\(someCharacter) is not a vowel or a consonant")
}
// Prints "e is a vowel"
```

switch문의 첫번째 case는 영어의 5개의 소문자 모음(vowels)와 일치합니다. 비슷하게, 두번째 case는 모든 영어 소문자 자음(consonants)와 일치합니다. 마지막 default case는 그외 나머지 문자와 일치합니다.

복합 `case`는 값 바인딩(`value bindings`)을 포함할 수 있습니다. 복합 case의 모든 패턴은 값 바인딩 설정을 포함하고, 각 바인딩은 복합 case에 있는 모든 패턴으로부터 같은 타입의 값을 가질수 있습니다. 이렇게 하면, 복합 case의 어떤 부분이 일치하든 상관없이, case의 본문 코드는 항상 바인딩(bindings) 값을 사용할 수 있고 그 값은 항상 같은 타입입니다.


```swift
let stillAnotherPoint = (9, 0)
switch stillAnotherPoint {
case (let distance, 0), (0, let distance):
    print("On an axis, \(distance) from the origin")
default:
    print("Not on an axis")
}
// Prints "On an axis, 9 from the origin"
```

위의 case는 두개의 패턴을 가지고 있습니다. : x축 좌표와 일치하는 (let distance, 0), y축 좌표와 일치하는 (0, let distance). 두 패턴 모두 distance에 대한 바인딩을 포함하고, 두 패턴에 있는 distance는 모두 정수형입니다 - case의 본문에 있는 코드에서 항상 distance에 대한 값을 사용할수 있는 것을 의미합니다.

---

## Control Transfer Statements 

`제어 변경 문법(Control transfer statements)`은 코드의 다른 부분에서 다른 코드로 제어를 변경해서, 코드가 실행되는 순서를 변경합니다. Swift는 5개의 제어 변경 문법을 가지고 있습니다.


- continue
- break
- fallthrough
- return
- throw

`continue, break, fallthrough` 문법은 아래에 설명되어 있습니다. `return` 문법은 함수[(Functions)](https://docs.swift.org/swift-book/LanguageGuide/Functions.html)에 설명되어 있고, `throw`문법은 [Throwing 함수를 사용하여 오류 전달하기(Propagating Errors Using Throwing Functions)](https://docs.swift.org/swift-book/LanguageGuide/ErrorHandling.html#ID510)에 설명되어 있습니다.

 

### Continue

`continue` 문법은 반복문을 멈추고 다음 반복문을 시작하는 것을 말합니다. 그것은 반복문을 완전히 벗어나지 않고 나는 현재 반복문을 멈춘다를 말합니다.

다음에 오는 예제는 비밀 퍼즐 문구를 만들기 위해 소문자 문자열로부터 모음(vowels)과 공백(spaces)을 제거합니다.


```swift
let puzzleInput = "great minds think alike"
var puzzleOutput = ""
let charactersToRemove: [Character] = ["a", "e", "i", "o", "u", " "]
for character in puzzleInput {
    if charactersToRemove.contains(character) {
        continue
    } else {
        puzzleOutput.append(character)
    }
}
print(puzzleOutput)
// Prints "grtmndsthnklk"
```

위의 코드는 모음이나 공백과 일치할때 `continue`키워드를 호출하며, 반복문의 현재 반복을 즉시 멈추게하고 다음 반복문의 시작부분으로 바로 이동합니다.



### Break 

break 문법은 전체 흐름 제어 상태를 즉시 종료합니다. break문법은 switch 또는 반복문의 실행을 다른 case보다 일찍 종료하길 원할때 switch 반복문의 안쪽에 사용될수 있습니다.

### Break in Loop Statement

`break`는 반복문 안쪽에서 사용될때, 반복문의 실행을 즉시 멈추고 switch 문의 닫힘 괄호(`}`) 이후의 코드로 제어가 변경합니다.

이러한 동작은 `switch`문에서 하나이상의 `case`를 일치시키고 무시하는데 사용할 수 있습니다. Swift의 switch문은 완벽해야하고 비어있는 case를 허용하지 않기 때문에, 가끔씩 의도를명확히 하기 위해 case를 의도적으로 일치시키고 무시할 필요가 있습니다. 무시하고자 하는 case의 본문 전체에서 `break`문을 작성하여 이를 수행합니다. switch문에서 case가 일치할때, case. 내의 break문은 switch문의 실행을 즉시 종료합니다.

> Note: `switch` case에 주석(comment)만 포함되면 컴파일시 오류가 납니다. 주석(Comments)은 문법(`statements`)이 아니고 switch case를 무시하지 않습니다. switchcase를 무시하기 위해서 항상 `break`문법을 사용합니다.

다음에 오는 예제는 `Character` 값을 분기처리하고 4개의 언어중 하나의 숫자 기호로 나타냅니다. 간결함(brevity)을 위해, 하나의 `switch` case에서 여러개의 값을 처리합니다.

```swift
let numberSymbol: Character = "三"  // Chinese symbol for the number 3
var possibleIntegerValue: Int?
switch numberSymbol {
case "1", "١", "一", "๑":
    possibleIntegerValue = 1
case "2", "٢", "二", "๒":
    possibleIntegerValue = 2
case "3", "٣", "三", "๓":
    possibleIntegerValue = 3
case "4", "٤", "四", "๔":
    possibleIntegerValue = 4
default:
    break
}
if let integerValue = possibleIntegerValue {
    print("The integer value of \(numberSymbol) is \(integerValue).")
} else {
    print("An integer value could not be found for \(numberSymbol).")
}
// Prints "The integer value of 三 is 3."
```

이 예제는 `numberSymbol`이 `1`부터 `4`까지의 숫자에 대해, 라틴, 아라비아, 중국, 태국의 기호인지 확인합니다. 일치하는 것을 찾은경우에, `switch`문의 case중 하나에 적절한 옵셔널 `Int?` 변수 `possibleIntegerValue`를 설정합니다.

`switch` 문의 실행이 완료된 후에, 예제에서 값이 발견되는지 결정하기 위해 옵셔널 바인딩(optional binding)을 사용합니다. `possibleIntegerValue`변수는 옵셔널 타입이기에, 암시적인으로 초기값 nil을 가지고, 옵셔널 바인딩은 `possibleIntegerValue`가 `switch`문의 처음 4개의 `case`중 하나로 실제 값으로 설정될때에만 성공할 것입니다.

위 예제에서 `Character` 값을 나열하는 것은 실용적이지 않기 때문에, `defaultcase`는 일치하지 않은 모든 문자들을 처리합니다. `defaultcase`는 어떤 동작을 할 필요가 없고, 본문처럼 하나의 `break`문으로 작성하였습니다. `default case`가 일치되자마자, `break`문은 `switch`문의 실행을 종료하고, 코드 실행은 `if let`문에서 계속 됩니다.

### Fallthrough 

Swift에서, switch문은 각 case의 아래와 다음으로 넘어가지 않습니다. 즉, 전체 `switch`문은 첫번째 case가 완료되자마자 완료됩니다. 이와는 대조적으로, C언어는 `fallthrought`를 막기 위해 switchcase의 끝에 명시적인 `break`문을 삽입해야 합니다. 기본적으로 `fallthrought`를 하지 않는 Swift switch문은 C에서 보다 훨씬 간결(concise)하고 예측가능(predictable)하고, 실수로 여러개의 switch case를 실행하는 것을 피하게 해줍니다.

C스타일의 `fallthrough` 동작이 필요한 경우에, 경우에 따라 `fallthrough` 키워드로 이 동작을 선택할 수 있습니다. 아래 예제에서 숫자의 텍스트 설명을 만들기 위해 `fallthrough`를 사용합니다.

```swift
let integerToDescribe = 5
var description = "The number \(integerToDescribe) is"
switch integerToDescribe {
case 2, 3, 5, 7, 11, 13, 17, 19:
    description += " a prime number, and also"
    fallthrough
default:
    description += " an integer."
}
print(description)
// Prints "The number 5 is a prime number, and also an integer."
```

이 예제에서 새로운 `String`변수 `description`를 선언하고 초기값을 할당합니다. 그런 다음 `switch`문을 사용하여 `integerToDescribe`의 값을 검토합니다. `integerToDescribe`의 값이 목록에 있는 소수(prime) 중에 하나인 경우, `description`의 끝에 숫자가 소수라는 텍스트를 추가합니다. 그리고나서 default case 안으로 들어가도록(fall into)`fallthrough` 키워드를 사용합니다. `defaultcase`는 `description`의 끝에 추가 텍스트를 추가하고, `switch`문은 완료됩니다.

`integerToDescribe`의 값이 소수 목록안에 없다면, 첫번째 `switchcase`에서 일치되지 않습니다. 다른 특정 `case`가 없기 때문에, `integerToDescribe`는 `default case`와 일치합니다.

`switch`문 실행이 완료된 후에, 숫자의 설명은 `print(_:separator:terminator:)` 함수를 사용하여 출력됩니다. 이 예제에서, 숫자 5는 소수로 정확히 식별됩니다.

> Note: `fallthrough` 키워드는 안으로 들어가게(fall into) 실행되기에 `switchcase`에 대한 case 조건들을 확인하지 않습니다. `fallthrough`키워드는 C의 표준 switch문 동착처럼, 단순히 다음 case(또는 default case) 블럭 안쪽의 문장으로 이동해서 코드를 실행합니다.

### Labeled Statements

Swift에서, 복잡한 흐름제어 구조를 만들기 위해, 반복문과 조건문 안쪽에 반복문과 조건문을 충첩시킬수 있습니다. 하지만 반복문과 조건문을 빨리 종료시키기 위해 `break`문을 사용할 수 있습니다. 따라서(therefore), 어떤 반복문이나 조건문을 종료하기 위해 명시적으로 break문을 사용하는 것이 유용할때가 있습니다. 마찬가지로(similarly), 여러개의 중첩된 반복문의 경우에, 어떤 반복문에 영향을 주는지 `continue`문을 명시적으로 하는 것이 유용할수 있습니다.

이러한 목표를 달성하기 위해, 반복문이나 조건문을 구문라벨(`statement label`로 표시할 수 있습니다. 조건문에서, 라벨된 구문의 실행을 종료하기 위해서 구문 라벨과 함께 `break`문을 사용할 수 있습니다. 반복문에서, 라벨된 구문을 종료하거나 계속하기 위해서 구문라벨과 함께 `break`나 `continue`문을 사용할 수 있습니다.

라벨된 구문은 구문을 소개하는(`introducer`) 키워드처럼 라벨과 같은 줄에 콜론(`:`) 다음에 라벨의 위치를 표시합니다. 다음은 `while` 반복문에 대한 문법 예제이며, 이 원리(principle)는 모든 반복문과 switch문에서도 같습니다.

```swift
label name: while condition {
    statements
}
```

다음 예제는 이전 챕터에서 봤던 `뱀과 사다리(Snakes and Ladders)` 게임의 개조된(adapted) 버젼에 대해 라벨된 `while`반복문과 함께 `break`와 `continue`문을 사용합니다.

이기기 위해, 정확히(`exactly`) 25칸에 있어야 합니다.
특히 주사위가 25칸을 넘어서면, 정확히 25칸에 위치할때까지 주사위를 다시 돌려야 합니다.

게임 보드는 이전과 같습니다.

![](/assets/post_img/posts/SwiftLanguageGuide_ControlFlow_1.png)

`finalSquare, board, square, diceRoll`의 값은 이전과 같은 방법으로 초기화 됩니다

```swift
let finalSquare = 25
var board = [Int](repeating: 0, count: finalSquare + 1)
board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
var square = 0
var diceRoll = 0
```

이 게임 버젼은 게임 로직을 구현하기 위해, `while`반복문과 `switch`문을 사용합니다. `while`반복문은 뱀과 사다리 게임에 대한 메인 게임 반복문을 가리키는 `gameLoop`라는 구문 라벨을 가지고 있습니다.

정확히 25칸에 위치해야 하는 것을 반영하기 위해,while반복문의 조건은 while square != finalSquare입니다.


```swift
gameLoop: while square != finalSquare {
    diceRoll += 1
    if diceRoll == 7 { diceRoll = 1 }
    switch square + diceRoll {
    case finalSquare:
        // diceRoll will move us to the final square, so the game is over
        break gameLoop
    case let newSquare where newSquare > finalSquare:
        // diceRoll will move us beyond the final square, so roll again
        continue gameLoop
    default:
        // this is a valid move, so find out its effect
        square += diceRoll
        square += board[square]
    }
}
print("Game over!")
```

주사위는 각 반복문의 시작에서 던집니다. 플레이어를 즉시 이동시키기보다는, 이동이 가능한지 이동의 결과를 확인하기 위해 `switch`문을 반복해서 사용합니다.

- 주사위를 던져 마지막칸에 플레이어가 이동하는 경우, 게임을 종료합니다. `break` gameLoop문은 while 반복문 바깥쪽 코드의 첫번째 줄로 제어를 넘기고 게임을 종료합니다.
- 주사위를 던져 마지막칸을 넘어서(beyond)플레이어가 이동하는 경우, 이동은 잘못되었고 주사위를 다시 던져야 합니다. `continue` gameLoop문은 현재 `while` 반복문을 종료하고 다음 반복문을 시작합니다.
- 다른 모든 `cases`에, 주사위를 던져 이동하는 것은 유효합니다. 플레이어는 diceRoll칸만큼 앞으로 이동하고, 뱀과 사다리 게임 로직을 확인합니다. 반복문이 종료하고, 다른 턴이 필요한지 결정하기 위해, 제어는 while조건문으로 반환합니다.

> Note: 위의 `break`문이 gameLoop 라벨을 사용하지 않는 경우, `while`문이 아니라, `switch`문을 벗어나게(`break`) 될것입니다. gameLoop라벨은 어떤 제어문을 종료해야하는지 명확하게 하기 위해 사용합니다.

다음 반복문으로 이동하기 위해서 `continue gameLoop`호출하는 경우에, 반드시 `gameLoop`라벨을 사용해야하는 것은 아닙니다. 게임에는 하나의 반복문만 있고, 따라서 `continue`문이 어떤 반복문에 영향을 줄지가 모호하지는 않습니다. 하지만, `continue`문과 함께gameLoop 라벨사용하는 것은 아무런 손해(harm)가 되지 않습니다. 라벨과 함께 break문을 나란히 사용하는 것은 일관성있고 게임의 로직을 더 명확하게 읽고 이해하는데 도움이 됩니다.

---

## Early Exit

`guard`문은, `if`문과 비슷하게, 표현식의 `Boolean` 값과 관련된 구문을 실행합니다. `guard`문은 `guard`문 뒤의 코드가 반드시 `true`인 조건에서 실행해야 하는 경우에 사용합니다. if문과는 다르게, `guard`문은 항상 `else`절을 가지고 있습니다 - `else`절의 코드 안쪽은 조건이 true가 아닐때 실행됩니다.


```swift
func greet(person: [String: String]) {
    guard let name = person["name"] else {
        return
    }
    
    print("Hello \(name)!")
    
    guard let location = person["location"] else {
        print("I hope the weather is nice near you.")
        return
    }
    
    print("I hope the weather is nice in \(location).")
}
 
greet(person: ["name": "John"])
// Prints "Hello John!"
// Prints "I hope the weather is nice near you."
greet(person: ["name": "Jane", "location": "Cupertino"])
// Prints "Hello Jane!"
// Prints "I hope the weather is nice in Cupertino."
```

`guard` 문의 조건이 충족(met)하는 경우, `guard`문의 닫힌괄호(`}`)뒤의 코드는 계속 실행합니다. 
옵셔널 바인딩을 사용하여 값이 할당된 모든 변수나 상수는 조건문의 일부처럼 `guard`이 보여지는 남은 코드 블럭에서 사용할 수 있습니다.

조건문이 충족되지 않은 경우, `else`분기 코드 안쪽이 실행됩니다. 그 분기(branch)는 guard문이 있는 코드 블록을 종료시키기 위해 반드시 제어를 변경합니다. `return, break, continue, throw`같은 `제어 전송` 구문을 수행하거나 `fatalError(_:file:line:)`와 같이 반환하지 않은 함수나 메소드를 호출할 수 있습니다.

요구사항에 대한 코드의 가독성을 향상시키기 위해 `guard`문을 사용하며, `if`문과 동일한 검사를 했을대와 비교됩니다. else블록 없이 실행되는 코드를 작성할 수 있고, 요구사항 바로 옆에 요구사항이 위반된 것을 처리하는 코드를 사용할 수 있습니다.



---

## Checking API Availability 

Swift는 사용가능한 `API`를 확인하는 것이 내장(built-in)되어 있으며, 배포 대상(deployment target)에서 사용할수 없는 API를 실수로 사용하지 않는것을 보장(ensures)합니다.

컴파일러는 코드에서 사용된 모든 API가 프로젝트에서 지정된 배포 대상에서 사용가능한지 확인(verify)하기 위해 SDK에서 가용성(availability) 정보를 사용합니다. Swift는 사용할 수 없는 API를 사용하려고 하면 컴파일 오류가 발생합니다.

`if`나 `guard`문에서 코드 블럭을 실행하기 위해 `가용성 조건(availability condition)`을 사용하며, 런타임에 사용할수 있는 API인지에 따라 다릅니다. 컴파일러는 해당 코드의 블록의 API가 사용가능한지 확인할때, 가용성 조건의 정보를 사용합니다.

```swift
if #available(iOS 10, macOS 10.12, *) {
    // Use iOS 10 APIs on iOS, and use macOS 10.12 APIs on macOS
} else {
    // Fall back to earlier iOS and macOS APIs
}
```

iOS에서 위에서 지정한 `가용성조건(availability condition)`은, if문의 본문을 iOS 10이후와 macOS 10.12 이후에서만 실행합니다. 마지막 인자 *는 다른 모든 플랫폼을 지정하도록 했으며, if의 본문은 최소로 지정된 배포 대상에서 실행합니다.

일반적인 형태에서, 가용성 조건은 이름과 버젼 목록을 받습니다. iOS, macOS, watchOS, tvOS와 같은 플랫폼 이름을 사용합니다 - 전체 목록에 대한 것은, [속성 선언(Declearation Attributes)](https://docs.swift.org/swift-book/ReferenceManual/Attributes.html#ID348)을 보세요. iOS8이나 macOS 10.10 과 같은 주(major) 버젼을 지정하는 것외에, iOS 11.2.6과 macOS 10.13.1과 같이 부(mainor) 버젼을 지정할 수 있습니다.


```swift
if #available(platform name version, ..., *) {
    statements to execute if the APIs are available
} else {
    fallback statements to execute if the APIs are unavailable
}
```

---
