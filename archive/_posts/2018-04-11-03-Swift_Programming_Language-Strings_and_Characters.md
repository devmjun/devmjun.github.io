---
layout:     post
title:      "Swift. 정리하기 3: Swift Language Guide-Strings and Characters Operators"
subtitle:   "Swift Language Guide-Strings and Characters Operators"
date:       2018-04-11 18:35:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
categories: archive
permalink: /archive/:title
---

최종 수정일: 2018.10.1

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다

[Strings and Characters](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-ID285)<br>
[까칠코더님 블로그](http://kka7.tistory.com/109?category=919617)<br>

---

## String and Characters 

`문자열(string)`은 `"hello, world"` 또는 `"albatross"`와 같은 문자들이 연속되어있습니다. Swift의 문자열은 `String`타입으로 표현됩니다. String의 컨텐츠(contents)는 다양한 방법으로 사용할 수 있으며, Charater값의 집합(collection)을 포함하고 있습니다.

Swift의 `String`과 `Character` 타입은 코드에 있는 텍스트를 유니코드로 빠르게 처리하는 것을 제공합니다. 문자열 생성과 조작(manipulation)하는 구문은 가볍고 읽기 쉬우며, C와 유사한 문자열 리터럴(literal). 구문을 사용합니다. 문자열 연결(concatenation)은 두 문자열을 간단하게 +연산자로 결합하고, 문자열 가변성(mutability)은 Swift의 다른 모든 값처럼 상수나 변수 중 하나를 선택해서 관리됩니다. 문자열에 상수, 변수, 리터럴과 더 긴 문자열 표현식등을 끼워넣을수 있으며, 이를 문자열 끼워넣기(string interpolation)이라고 합니다. 이렇게 하면 표시(display), 저장(storage), 출력(printing)하는 사용자정의 문자열 값을 쉽게 만들수 있습니다.

구문이 단순함에도 불구하고, Swift의 `String` 타입은 빠르고, 현대적인(modern) 문자열 구현입니다. 문자열은 언제나 인코딩에 독립적인 유니코드 문자로 구성되고, 다양한 유니코드 표현하는 문자들을 지원합니다

> Note: Swift의 String 타입은 `Foundation`의 `NSString` 클래스와 `연결되어(bridged)` 있습니다. Foundation은 NSString에 정의된 메소드들을 사용할수 있도록 String을 확장합니다. 이는 Foundation을 포함하면(import), 문자열에서 `NSString` 메소드를 타입변환(casting) 없이 사용할수 있습니다.
>
> Foundation과 Cocoa의String사용에 대한 자세한 정보는, [String과 NSString간에 연결하기(Bridging Between String and NSString)](https://developer.apple.com/documentation/swift/string#2919514)를 보세요.

---

## String Literals

문자열 리터럴(string literals)처럼 미리 정의된 String값을 포함할 수 있습니다. 문자열 리터럴은 `따옴표(")`로 감싸진 문자들 입니다.

문자열 리터럴은 상수나 변수의 초기 값으로 사용합니다.

```swift
let someString = "Some string literal value"
```

문자열 리러털 값으로 초기화 되었기 때문에, someString 상수에 대해 Swift는 String 타입을 추론하는 것을 기억하세요.

### Multiline String Literals

여러줄에 연결된 문자열이 필요한 경우에, 여러줄 문자열 리터럴(multiline string literal)을 사용합니다 - 3개의 쌍따옴표로 감싼 문자들

```swift
let quotation = """
The White Rabbit put on his spectacles.  "Where shall I begin,
please your Majesty?" he asked.

"Begin at the beginning," the King said gravely, "and go on
till you come to the end; then stop."
"""
```

여러줄 문자열 리터럴은 열고 닫는 쌍따옴표(quotation) 사이에 있는 모든 줄을 포함합니다. 이 문자열은 첫번째 열기 따옴표(""") 뒤에 첫번째 줄에서 시작하고 닫기 따옴표 앞에서 끝나며, 줄바꿈으로 시작하거나 끝나지 않습니다.

```swift
let singleLineString = "These are the same."
let multilineString = """
These are the same.
"""
```

소스코드에서 여러줄 문자열 리터럴 안쪽에 줄바꿈이 포함되었을때, 줄바꿈은 문자열의 값에서 나타납니다. 줄 바꿈이 문자열 값의 일부가 되길 원치 않지만, 소스코드를 읽기 쉽게하기 위해 줄바꿈을 사용하길 원하는 경우, 그 줄의 끝에 백슬래쉬(\)를 붙여줍니다.

```swift
let softWrappedQuotation = """
The White Rabbit put on his spectacles.  "Where shall I begin, \
please your Majesty?" he asked.

"Begin at the beginning," the King said gravely, "and go on \
till you come to the end; then stop."
"""
```

개행문자(line feed)로 여러줄 문자열 리터럴을 시작하거나 끝내기 위해, 비어있는 줄을 첫번째나 마지막 줄에 사용합니다. 예를 들어:

```swift
let lineBreaks = """

This string starts with a line break.
It also ends with a line break.

"""
```

여러줄 문자열은 주변 코드와 일치하도록 들여쓰기(indented) 할수 있습니다. Swift는 닫는 따옴표(""") 앞에 있는 공백(whitespace)은 다른 모든 줄보다 먼저 무시할 공백인것을 알려줍니다. 하지만, 닫는 따옴표 앞에 추가된 줄에서 시작하는 공백(whitespace)을 작성하는 경우에 그 공백(whitespace)는 포함됩니다.

![](/img/poists/SwiftProgrammingLanguage3_0.png)

위 예제에서, 전체 여러줄 문자열 리터럴은 들여쓰기 되어있으며, 첫번째와 마지막 줄은 공백(whitespace)로 시작하지 않습니다. 중간에 있는 줄은 닫기 따옴표보다 더 들여쓰기 되어 있어서, 4칸 들여쓰기로 시작합니다.

### Special Characters in String Literals 

문자열 리터럴은 다음과 같이 특수 문자들을 포함할 수 있습니다.

- 탈출(escaped) 특수 문자 `\0`(null 문자: null character), `\\`(백슬러쉬: backslash), `\t`(수평 탭: horizontal tab), `\n`(개행: line feed), `\r`(복귀: carriage return), `\"`(쌍 따옴표:double quotation mark), `\'`(작은 따옴표: single quotation mark)
- `\u{n}`으로 작성하는 임의의(arbitrary) 유니코드 스칼라, n은 유요한 유니코드 포인트와 동일한 1-8자리 16진수 숫자(유니코드는 아래에 있는 Unicode에서 논의됩니다.)
아래 코드는 특수 문자들의 4가지 예를 보여줍니다. wiseWords 상수는 두개의 탈출(escaped) 쌍따옴표를 포함하고 있습니다. dollarSign, blackHeart, sparklingHeart 상수는 유니코드 스칼라 포멧으로 보여줍니다.


```swift
let wiseWords = "\"Imagination is more important than knowledge\" - Einstein"
// "Imagination is more important than knowledge" - Einstein
let dollarSign = "\u{24}"        // $,  Unicode scalar U+0024
let blackHeart = "\u{2665}"      // ♥,  Unicode scalar U+2665
let sparklingHeart = "\u{1F496}" // 💖, Unicode scalar U+1F496
```

여러줄 문자열 리터럴은 하나가 아닌 3개의 쌍따옴표로 사용되기 때문에, 여러줄 문자열 리터럴 안에 탈출(escaping)문자 없이 쌍따옴표(")를 포함할 수 있습니다. 여러줄 문자열에 """텍스트를 추가하려면, 따옴표 중에 적어도 하나에서 탈출(escape)을 처리합니다. 예를들어:

```swift
let threeDoubleQuotationMarks = """
Escaping the first quotation mark \"""
Escaping all three quotation marks \"\"\"
"""
```

---

## Initializing an Empty String 

긴 문자열을 만들기 위한 시작점으로 `빈 문자열(String)`을 만들며, 변수에 빈 문자열 리터럴을 할당하거나, 초기화 구문을 사용하여 새로운 String인스턴스로 초기화해서 할당해야 합니다


```swift
var emptyString = ""               // empty string literal
var anotherEmptyString = String()  // initializer syntax
// these two strings are both empty, and are equivalent to each other
```

String 값이 비어있는지 확인하기 위해, Boolean `isEmpty` 프로퍼티를 사용합니다.

```swift
if emptyString.isEmpty {
    print("Nothing to see here")
}
// Prints "Nothing to see here"

```

---

## String Mutability 

특정 String을 변수(수정할 수 있는 경우)나 상수(수정할 수 없는 경우)로 할당하여, 수정(또는 변경)할 수 있는지를 나타냅니다.


```swift
var variableString = "Horse"
variableString += " and carriage"
// variableString is now "Horse and carriage"
 
let constantString = "Highlander"
constantString += " and another Highlander"
// this reports a compile-time error - a constant string cannot be modified
```

> Note: 이 접근법(approach)은 Objective-C와 Cocoa에서의 문자열 변경과는 다르며, 문자열이 변경할수 있는지를 나타내기 위해, 두 클래스(`NSString`과 `NSMutableString`) 중 하나를 골라야 합니다.
 
---

## Strings Are Value Types

Swift의 String 타입은 값 타입(value type)입니다. 새로운 String값을 만드는 경우에, String값은 함수나 메소드에 전달되거나 상수나 변수에 할당할때, 복사됩니다(copied). 이 경우에, 기존 String값의 새로운 복사본이 만들어지고, 새로 복사된 값은 전달되거나 할당되며, 원래 버젼이 아닙니다. 값 타입(Value types)은 [구조체와 열거형은 값 타입(Structures and Enumerations Are Value Types)](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html#ID88)에서 설명됩니다.

Swift의 기본적으로 `String`을 복사(copy-by-default)하기는 출처와 상관없이, 함수나 메소드에 `String`값을 전달때 동작합니다. 문자열을 직접 수정하지 않는 한 수정되지 않은채로 전달되는 것을 확신할수 있습니다.

화면 뒤에서, Swift의 컴파일러는 꼭 필요한 경우에만 실제 복사가 되도록 문자열 사용을 최적화 해줍니다. 이는 문자열을 값 타입으로 작업할때 언제나 뛰어난 성능을 가지는 것을 의미합니다.

---

## Working with Characters

`for-in` 반복문으로 문자열을 반복하여 String에 대한 개개의 문자(Character)값을 사용할 수 있습니다.

```swift
for character in "Dog!🐶" {
    print(character)
}
// D
// o
// g
// !
// 🐶
```

for-in 반복문은 [For-in Loops](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID121)에 설명되어 있습니다.

대신에, `Character`타입 주석을 제공하여, 하나의 character 문자열 리터럴로 독립적인 Character상수나 변수를 만들수 있습니다.

```swift
let exclamationMark: Character = "!"
```

`String` 값은 초기화에 인자를 넘기는 것처럼 Character값들의 배열을 전달받아 구성(constructed)될 수 있습니다.

```swift
let catCharacters: [Character] = ["C", "a", "t", "!", "🐱"]
let catString = String(catCharacters)
print(catString)
// Prints "Cat!🐱"
```

---

## Concatenating String and Characters

새로운 String값을 만들기 위해 String 값은 더하기 연산자(+)로 추가될 수 있습니다.

```swift
let string1 = "hello"
let string2 = " there"
var welcome = string1 + string2
// welcome now equals "hello there"
```

또한, 기존 String변수에 더하기 할당 연산자(addition assignment operator +=)로 String값에 추가할 수 있습니다.

```swift
var instruction = "look over"
instruction += string2
// instruction now equals "look over there"
```

`String` 타입의 `append()`메소드를 사용하여 `Character`값을 `String` 변수에 추가할수 있습니다.

```swift
let exclamationMark: Character = "!"
welcome.append(exclamationMark)
// welcome now equals "hello there!"
```

> Note: `Character`값은 반드시 하나의 문자만을 포함해야하기 때문에, 기존 `Character`변수에는 `String`이나 `Character`를 추가할수 없습니다.

여러줄 문자열 리터럴을 사용하여 긴 문자열을 만드는 경우에 줄 바꿈(line break)으로 끝내기 위해서, 문자열의 모든 줄을 마지막 줄에 포함합니다. 예를 들어:

```swift
let badStart = """
one
two
"""
let end = """
three
"""
print(badStart + end)
// Prints two lines:
// one
// twothree

let goodStart = """
one
two

"""
print(goodStart + end)
// Prints three lines:
// one
// two
// three
```

위 코드에서, `badStart`와 `end`를 연결하면 두줄의 문자열이 되며, 원하는 결과가 아닙니다. `badStart`의 마지막 줄이 줄바꿈(line break)으로 끝나지 않았기 때문에, 그 줄은 end의 첫번째 줄과 결합됩니다. 이와 반대로, `goodSart`의 두 줄은 줄바꿈으로 끝나므로, 기대했던것 처럼 end로 결합할때 3줄이 됩니다.

---

## String Interpolation

`문자열 끼워넣기(String Interpolation)`는 상수, 변수, 리터럴 등을 혼합하여 새로운 String 값을 만드는 방법이고, 문자열 리터럴에 값을 포함하는 표현방법입니다. 한줄이나 여러줄 문자열 리터럴 모두에서 문자열 끼워넣기를 사용할 수 있습니다. 각 항목들은 맨 앞에는 백슬러쉬(\가 있는 한쌍의 괄호로 감싸져서, 문자열 리터럴에 삽입됩니다.

```swift
let multiplier = 3 
let message = "\(multiplier) times 2.5 is \(Double(multiplier) * 2.5)" // message is "3 times 2.5 is 7.5"
```

위 예제에서, `multiplier`의 값은 문자열 리터럴안에 \(multiplier)으로 삽입되었습니다. 이 자리표시(placeholder)는 실제 문자열을 만들기 위해 문자열 끼워넣기를 사용할때 실제 multiplier 값으로 교체됩니다.

또한 `multiplier` 값은 나중에 문자열의 큰 표현식의 일부가 됩니다. 이 표현식은 `Double(multipler) * 2.5`의 값을 계산하고 그 결과(`7.`5)를 문자열에 삽입합니다. 이 경우에, 이 표현식은 문자열 리터럴 안쪽에 포함될때`\(Double(multiplier) * 2.5)`로 작성합니다.

> Note: 끼워넣기 된 문자열로 작성된 괄호 안의 표현식에는 탈출되지 않은(unscaped) 백슬러쉬(\), 복귀(carriage return), 줄바꿈(line feed)등을 포함할수 없습니다. 하지만, 다른 문자열 리터럴은 포함할 수 있습니다.


---

## Unicode 

`유니코드(Unicode)`는 다른 서체 시스템에서 텍스트를 인코딩, 표기하고 처리하는 국제 표준입니다. 유니코드는 표준화된 형식의 모든 언어에서 어떤 문자라도 표현하는 것이 가능하고, 텍스트 파일이나 웹페이 처럼, 외부 소스로 부터 이러한 문자들을 읽고 쓸수가 있습니다. Swfit의 `String`과 `Character`타입은 이번 섹션(section)에서 설명한것 처럼, 유니코드를 완벽히 호환합니다.

### Unicode Scalars

화면 뒤에서, Swift의 순수한 `String` 타입은 유니코드 스칼라 값(Unicode scalar values)으로 만들어집니다. 유니코드 스칼라는 `라틴어 A의 소문자 (LATIN SMALL LATTER A)("a")`에 대한 `U+0061 또는 아기 병아리 얼굴(FRONT-FACING BABY CHICK)("🐥")`에 대한 `U`+1F425 처럼, 문자(character)나 수정자(modifier)에 대한 고유한 21비트 숫자입니다.

> Note: 유니코드 스칼라는 `U+`0000에서 `U+D7FF` 범위를 포함하거나 `U+E000`에서 `U+10FFFF`을 포함하고 있는 모든 유니코드 코드 포인트(code point)입니다. 유니코드 스칼라는 코드 포인트가 `U+D800`에서 `U+DFFF`를 포함하는 유니코드 대리 쌍(surrogate pair) 코드 포인트를 포함하지 않습니다.

모든 21 비트 유니코드 스칼라는 문자에 할당되지 않는 것을 주의 합니다. - 일부 스칼라는 나중에 할당하기 위해 예약되어 있습니다. 위 예제에서 LATIN SMALL LETTER A와 FRONT-FACING BABY CHICK와 같이, 문자에 할당된 스칼라에는 이름이 있습니다

### Extended Grapheme Clusters

Swift의 Character타입의 모든 인스턴스는 하나의 `확장된 문자소 클러스터(extended grapheme cluster)`로 표현됩니다. 확장된 문자소 클러스터는 하나 이상의 유니코드 스칼라의 시퀀스로(결합되었을때) 사람이 읽을수 있는 문자로 만듭니다.

예제가 하나 있습니다. `é` 글자는 하나의 유니코드 스칼라로 `é (LATIN SMALL LETTER E WITH ACUTE,` 또는 `U+00E9`로 표현될수 있습니다. 하지만, 스칼라 한쌍(pair)으로 동일한 글자를 표현될수 있습니다. - 표준 글자 `e (LATIN SMALL LETTER E, 또는 U+0065)` 다음에 `뾰족한 악센트 결합(COMBINING ACUTE ACCENT)` 스칼라(`U+0301`)이 옵니다. `뽀족한 악센트 결합(COMBINING ACUTE ACCENT)`. 스칼라는 그림(`graphically`)으로 적용되며, 유니코드를 인식하는 텍스트 그리는 시스템에 의해 `e`가 그려질때 `é`로 변환합니다.

두 경우 모두에서, 글자 `é`는 확장된 문자소 클러스터롤 표현하는 하나의 Swift Character 값으로 표현됩니다. 첫번째 경우에, 클러스터는 하나의 스칼라를 포함합니다; 두번재 경우에 두개의 스칼라로 된 클러스터 입니다.

```swift
let eAcute: Character = "\u{E9}"                         // é
let combinedEAcute: Character = "\u{65}\u{301}"          // e followed by ́
// eAcute is é, combinedEAcute is é
```

확장된 문자소 클러스터는 많은 복잡한 스크립트 문자들을 하나의 Character값처럼 표현하는 유연한(flexible) 방법입니다. 예를들어, 한글 음절(syllables)을 구성(precomposed)하거나 분해된(decomposed) 순서로 표현할수 있습니다. Swift에서 이러한 두가지 표현 모두 하나의 Character값으로 간주(qualify) 합니다.

```swift

let precomposed: Character = "\u{D55C}"                  // 한
let decomposed: Character = "\u{1112}\u{1161}\u{11AB}"   // ᄒ, ᅡ, ᆫ
// precomposed is 한, decomposed is 한
```

확장된 문자소 클러스터는 다른 유니코드 스칼라로 넣기 위해 감싸는 `기호(감싸는 원으로 결합(COMBINING ENCLOSING CIRCLE)` 또는 `U+20DD`)에 대한 스칼라를 사용가능합니다.

```swift
let enclosedEAcute: Character = "\u{E9}\u{20DD}"
// enclosedEAcute is é⃝
```

지역을 나타내는 기호에 대한 유니코드 스칼라는 지`역 표시하는 상징 글자(REGIONAL INDICATOR SYMBOL LETTER) U(U+1F1FA`)와 `지역 표시하는 상징 글자(REGIONAL INDICATOR SYMBOL LETTER) S(U+1F1FA)`를 하나의 `Character`값으로 만들기 위해 쌍으로 결합될수 있습니다.

```swift
let regionalIndicatorForUS: Character = "\u{1F1FA}\u{1F1F8}"
// regionalIndicatorForUS is 🇺🇸
```

---

## Counting Characters 

문자열에서 Character 값의 갯수를 세기 위해, 문자열의 count 프로퍼티를 사용합니다.


```swift
let unusualMenagerie = "Koala 🐨, Snail 🐌, Penguin 🐧, Dromedary 🐪"
print("unusualMenagerie has \(unusualMenagerie.count) characters")
// Prints "unusualMenagerie has 40 characters"
```

Swift의 Character값에 대한 확장된 문자소 클라스터 사용은 문자열 연결하기와 수정하는것이 항상 문자열의 문자 갯수와 영향을 주지는 않는 다것을 의미합니다.

예를들어, 4개의 문자 단어 cafe로 새로운 문자열를 초기화하는 경우, 뽀족한 악센트 결합(COMBINING ACUTE ACCENT) (U+0301)을 문자열의 끝에 추가하면, 최종 문자열은 4개의 문자를 가지고 있으며, 4번째 문자는 e가 아니라 é가 됩니다.


```swift
var word = "cafe"
print("the number of characters in \(word) is \(word.count)")
// Prints "the number of characters in cafe is 4"

word += "\u{301}"    // COMBINING ACUTE ACCENT, U+0301

print("the number of characters in \(word) is \(word.count)")
// Prints "the number of characters in café is 4"
```

> Note: 확장된 문자소 클러스터는 여러줄의 유니코드 스칼라로 구성될 수 있습니다. 이는 다른 문자들이-그리고 같은 문자의 다른 표현- 메모리에 저장하는 양이 다를수 있습니다. 이 때문에, `Swift에서 문자들은 문자열의 표현에서 각각 메모리 양이 같지 않을수 있다는 것을 의미합니다.` 결과적으로, 확장된 문자소 클러스터 영역을 결정하기 위해 문자열을 반복하지 않고서는 문자열에서의 문자들의 갯수는 계산될수 없습니다. 특히 긴 문자열 값으로 작업하는 경우에, count프로퍼티는 해당 문자열의 문자를 결정하기 위해, 전체 문자열에서 유니코드 스칼라를 반복해야 합니다.
>
> count 프로퍼티에 의해 반환된 문자의 갯수는 같은 문자가 포함된 `NSString`의 `length`프로퍼티와 항상 같지 않습니다. `NSString`의 `length`는 `UTF-16`을 나타내는 16비트 코드의 갯수에 기반하고 유니코드의 확장된 문자소 클라스터의 갯수가 아닙니다.


---

## Accessing and Modifying a String 

메소드와 프로퍼티 또는 서브스크립트 문법을 사용하여 문자열을 사용하고 수정합니다.

### String Indices

각 `String`값은 연관된 *인덱스 타입(index type)*, `String.Index`을 가지며, 문자열에서 각 Character의 위치에 해당합니다.

위에서 언급한 것처럼, 다른 문자들은 메모리에 저장하는 양이 다를수 있으며, 특정 위치에 어떤 `Character`가 있는지 결정하기 위해서, `String`의 시작이나 끝에서 유니코드 스칼라를 반복해야 합니다. 이때문에, `Swift`의 문자열은 정수형 값으로 인덱스 될수 없습니다.

`String`의 첫번째 `Character`의 위치에 접근하기 위해서 `startIndex` 프로퍼티를 사용합니다. `endIndex`프로퍼티는 `String`에 있는 마지막 문자 뒤의 위치입니다. 결과적으로 `endIndex`프로퍼티는 문자열의 `서브스크립트(subscript)`에서 유효한 인자가 아닙니다. `String`이 비어 있는 경우에, `startIndex`와 `endIndex`는 같습니다.

주어진 인덱스의 앞과 뒤에 접근하기 위해 `String`의 `index(before:)`와 `index(after:)` 메소드를 사용합니다. 주어진 인덱스와 더 멀리 떨어진 인덱스에 접근하기 위해, 이런 메소드들을 여러번 호출하는 대신에, `index(_:offsetBy:)` 메소드를 사용할 수 있습니다.

특정 `String` 인덱스에 있는 `Character`을 사용하기 위해 서브스크립트(subscript) 문법을 사용할 수 있습니다.

```swift
// 1
let greeting = "Guten Tag!"
greeting[greeting.startIndex]
// G
greeting[greeting.index(before: greeting.endIndex)]
// !
greeting[greeting.index(after: greeting.startIndex)]
// u
let index = greeting.index(greeting.startIndex, offsetBy: 7)
greeting[index]
// a
```

문자열의 범위 바깥쪽 인덱스에 접근하려고 하거나 문자열의 범위 바깥쪽 인덱스의 Character을 사용하려고 하면 런타임(runtime) 오류가 발생할 것입니다.


```swift
// 2
greeting[greeting.endIndex] // Error
greeting.index(after: greeting.endIndex) // Error
```

문자열에 있는 각각의 문자의 모든 인덱스를 사용하기 위해 `indices` 프로퍼티를 사용합니다


```swift
for index in greeting.indices {
    print("\(greeting[index]) ", terminator: "")
}
// Prints "G u t e n   T a g ! "
```

> `Collection` 프로토콜을 준수하는 모든 타입에서 `startIndex`와 `endIndex` 프로퍼티, `index(before:)`, `index(after:)`, `index(_:offsetBy:)` 메소드를 사용할 수 있습니다. `String` 뿐만아니라, `Array, Dictionary, Set`과 같은 콜렉션 타입도 포함됩니다.


### Inserting and Removing 

문자열(string에서 지정된 인덱스에 문자(character)를 삽입하기 위해, `insert(_: at:)`메소드를 사용하고, 지정된 인덱스로 다른 문자열 컨텐츠를 삽입하기 위해 `insert(contentsOf:at:)` 메소드를 사용합니다.



`insert(_:at:)`, `insert(contentsof:at:)` 을 사용합니다.

```swift
var welcome = "hello"
welcome.insert("!", at: welcome.endIndex)
// welcome now equals "hello!"
 
welcome.insert(contentsOf: " there", at: welcome.index(before: welcome.endIndex))
// welcome now equals "hello there!"
``` 

문자열에서 특정 인덱스에 있는 문자 하나를 제거하기 위해, `remove(at:)` 메소드를 사용하고, 지정된 범위만큼의 문자열을 제거하기 위해 `removeSubrange(_:)` 메소드를 사용합니다.



```swift
welcome.remove(at: welcome.index(before: welcome.endIndex))
// welcome now equals "hello there"
 
let range = welcome.index(welcome.endIndex, offsetBy: -6)..<welcome.endIndex
welcome.removeSubrange(range)
// welcome now equals "hello"
```

> Note: `RangeReplaceableCollection`프로토콜을 준수하는 모든 타입에서 `insert(_:at:), insert(contentsOf:at:), remove(at:), removeSubrange(_:)`메소드를 사용할 수 있습니다. `String`뿐만 아니라, `Array, Dictionary, Set` 같은 컬렉션 타입을 포함합니다.



 

---

## SubString 

문자열에서 부분문자열(Substring)을 얻고자 할때-예를들어, 서브스크립트(subscript) 또는 `prefix(_:)` 같은 메소드를 사용-그 결과는 문자열이 아니라 `Substring`의 인스턴스입니다. Swift에서 부문문자열(Substring)은 문자열과 동일한 메소드를 가지며, 문자열로 작업하는 것과 같은 방법을 부문문자열(Substring)에서도 사용할수 있다는 것을 의미합니다. 하지만, 문자열과 다르게, 문자열에서 작업하는 짧은 시간동안에 대해서만 부분문자열을 사용합니다. 결과를 오랫동안 저장해야 할 때에는, 부분문자열을 문자열(String)의 인스턴스로 변환합니다. 예를들어:


```swift
let greeting = "Hello, world!"
let index = greeting.index(of: ",") ?? greeting.endIndex
let beginning = greeting[..<index]
// beginning is "Hello"
 
// Convert the result to a String for long-term storage.
let newString = String(beginning)
```

<center><img src="/img/posts/Swift_Programming_Language.png" width="600"></center> <br> 

> Note: String과 Substring모두 [<U>StringProtocol</U>](https://developer.apple.com/documentation/swift/stringprotocol)프로토콜을 준수하며, `StringProtocol`값이 적용된 문자열을 조작하는 함수가 편리하다는 것을 의미합니다. `String`이나 `Substring` 값을 가지는 함수를 호출할 수 있습니다





---

## Comparing String 

Swift는 텍스트 값을 비교하는 `3가지 방법`을 제공합니다: 문자열과 문자가 같은지, 접두사(prefix)가 같은지, 접미사(suffix)가 같은지


### String and Character Equality

문자열과 문자는 같음 연산자(`==`)와 같지 않음 연산자(`!=`)로 확인되며, [비교연산자(Comparison Operators)](https://docs.swift.org/swift-book/LanguageGuide/BasicOperators.html#ID70)에서 설명됩니다.

```swift
let quotation = "We're a lot alike, you and I."
let sameQuotation = "We're a lot alike, you and I."
if quotation == sameQuotation {
    print("These two strings are considered equal")
}
// Prints "These two strings are considered equal"
```

두개의 `String` 값(또는 두개의 `Character` 값)은 확장된 문자소 클러스터(extended grapheme clusters)가 규칙이 같은(canonically equivalent)경우에 같은 것으로 간주됩니다(considered). 확장된 문자소 클러스터는 언어적인 의미와 모양이 동일한 경우에 규칙이 같으며, 심지어는 다른 유니코드 스칼라로 구성된 경우에도 마찬가지입니다.

예를 들어, `라틴어 소문자 E와 뾰족함(LATIN SMALL LETTER E WITH ACUTE) (U+00E9)`은 `라틴 소문자 E(LATIN SMALL LETTER) (U+0065)`뒤에 `뽀족한 악센트 결합(COMBINING ACUTE ACCENT) (U+0301)`오는것과 규칙이 같습니다. 이러한 확장된 문자소 클러스터 é 문자를 표현하는데 모두 유효한 방법이고, 그래서 그것들이 같은것으로 간주 됩니다.

```swift
/ "Voulez-vous un café?" using LATIN SMALL LETTER E WITH ACUTE
let eAcuteQuestion = "Voulez-vous un caf\u{E9}?"

// "Voulez-vous un café?" using LATIN SMALL LETTER E and COMBINING ACUTE ACCENT
let combinedEAcuteQuestion = "Voulez-vous un caf\u{65}\u{301}?"

if eAcuteQuestion == combinedEAcuteQuestion {
    print("These two strings are considered equal")
}
// Prints "These two strings are considered equal"
```

반대로, 영어에서 사용되는 라틴 대문자 A(LATIN CAPITAL LETTER A) (U+0041 또는 "A")는 러시아어에서 사용되는 키릴 대문자 A(CYRILLIC CAPITAL LETTER A) (U+0410 또는 "A")와 같지 않습니다. 그 문자들은 비슷하게 보이지만, 언어적인(linguistic) 의미가 같지 않습니다

```swift
let latinCapitalLetterA: Character = "\u{41}" 
let cyrillicCapitalLetterA: Character = "\u{0410}" 
if latinCapitalLetterA != cyrillicCapitalLetterA { 
	print("These two characters are not equivalent.") 
	} 
// Prints "These two characters are not equivalent."
```

> Note: Swift에서 문자열과 문자 비교는 지역(locale)과는 상관 없습니다.

### Prefix and Suffix Equality

문자열이 특정 문자열 접두사와 접미사를 가졌는지 확인하기 위해, 문자열의 `hasPrefix(_:)`와 `hasSuffix(_:)` 메소드를 호출하며, 모두 다 `String`타입인 인자 하나를 받아서 Boolean 값을 반환합니다.

아래 예제는 세익스피어의 로미오와 줄리엣(Romeo and Juliet)의 처음 2장의 장면 위치를 나타내는 문자열 배열입니다.

```swift
let romeoAndJuliet = [
    "Act 1 Scene 1: Verona, A public place",
    "Act 1 Scene 2: Capulet's mansion",
    "Act 1 Scene 3: A room in Capulet's mansion",
    "Act 1 Scene 4: A street outside Capulet's mansion",
    "Act 1 Scene 5: The Great Hall in Capulet's mansion",
    "Act 2 Scene 1: Outside Capulet's mansion",
    "Act 2 Scene 2: Capulet's orchard",
    "Act 2 Scene 3: Outside Friar Lawrence's cell",
    "Act 2 Scene 4: A street in Verona",
    "Act 2 Scene 5: Capulet's mansion",
    "Act 2 Scene 6: Friar Lawrence's cell"
]
```

`Act 1`의 장면의 수를 계산하기 위해 `romeoAndJuliet` 배열에서 `hasPrefix(_:)`메소드를 사용할 수 있습니다.

```swift
var act1SceneCount = 0 
for scene in romeoAndJuliet { 
	if scene.hasPrefix("Act 1 ") { 
		act1SceneCount += 1 
		} 
} 

print("There are \(act1SceneCount) scenes in Act 1") // Prints "There are 5 scenes in Act 1"
```

비슷하게, 캐플릿의 저택과 수사 로렌스의 방 주변의 장소를 가진 장면의 수를 계산하기 위해 hasSuffix(_:) 메소드를 사용합니다.

```swift
var mansionCount = 0
var cellCount = 0
for scene in romeoAndJuliet {
    if scene.hasSuffix("Capulet's mansion") {
        mansionCount += 1
    } else if scene.hasSuffix("Friar Lawrence's cell") {
        cellCount += 1
    }
}
print("\(mansionCount) mansion scenes; \(cellCount) cell scenes")
// Prints "6 mansion scenes; 2 cell scenes"
```

> Note: 문자열에서 확장된 문자소 클러스터간에 문자대 문자(character-by-character)로 규칙이 같은지 비교하기 위해 `hasPrefix(_:)와 hasSuffix(_:)` 메소드를 실행하며, 문자열과 문자 비교하기(String and Character Equality)에서 설명되어 있습니다.


---

## Unicode Representations of Strings

텍스트 파일이나 다른 저장소에 유니코드 문자열을 작성할때, 문자열에 있는 유니코드 스칼라는 몇가지 유니코드 인코딩 형식(encoding forms)중 하나로 인코딩 됩니다. 각 형식(form)은 문자열을 code units라는 작은 덩어리(chunks)로 인코딩 합니다. 여기에서는 UTF-8 인코딩(문자열을 8비트 코드 단위로 인코딩), UTF-16(문자열을 16비트 코드 단위로 인코딩), UTF-32 인코딩(문자열을 32비트 코드 단위로 인코딩)들이 포함됩니다.

Swift는 문자열의 유니코드를 표현하는데 사용하는 몇가지 다른 방법을 제공합니다. 유니코드 확장된 문자소 클러스터로 각각의 Character 값을 사용하기 위해, for-in문으로 문자열을 반복할 수 있습니다. 이러한 과정은 [문자들로 작업하기(Working with Characters)](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html#ID290)에서 설명되어 있습니다.

또는, 3가지 다른 유니코드 호환 표현법중 하나로 String 값을 사용합니다.

- UTF-8 코드 단위의 컬렉션(문자열의 utf8프로퍼티로 사용됨)
- UTF-16 코드 단위의 컬렉션(문자열의 utf16프로퍼티로 사용됨)
- 21비트 유니코드 스칼라 값의 컬렉션, 문자열의 UTF-32 인코딩 형식과 동일(문자열의 unicodeScalars 프로퍼티로 사용됨)


아래의 각 예제는 `D`, `o`, `g`, `!!(느낌표 두개 표시(DOUBLE EXCLAMATION MARK)`문자 또는 유니코드 스칼라(`U+203C`), 🐶문자(`개의 얼굴(DOG FACE)`). 또는 유니코드 스칼라(U+1F436) 으로 만들어진 문자열의 다른 표현을 보여줍니다.

```swift
let dogString = "Dog!! 🐶"
```

### UTF-8 Representation

String의 UTF-8 표현은 utf8프로퍼티를 반복해서 사용할수 있습니다. 이 프로퍼티는 String.UTF8View타입이며, 부호가 없는 8비트(UInt8) 값의 컬렉션이며, 문자열의 UTF-8 표현에서 각각 하나의 바이트를 차지 합니다.

![](/img/posts/SwiftProgrammingLanguage3_1.png)

위의 예제에서, 처음 3개의 10진수 `codeUnit` 값(`68, 111, 103`)은 `D`, `o`, `g` 문자들을 표현하며, UTF-8 표현은 ASCII 표현과 같습니다. 다음 3개의 10진수 `codeUnit` 값(`226`, `128`, `188`)은 `느낌표 두개(DOUBLE EXCLAMATION MARK)`문자의 3 바이트 UTF-8 표현입니다. 마지막 4개의 `codeUnit` 값(`230, 159, 144, 182`)는 `개 얼굴(DOG FACE)`문자의 4 바이트 UTF-8 표현입니다.

### UTF-16 Representation

`String`의 UTF-16 표현은 `utf16`프로퍼티를 반복해서 사용할 수 있습니다. 이 프로퍼티는 `String.UTF16View`타입이며, 부호가 없는 16비트(`UInt16`) 값의 컬렉션이며, 문자열의 UTF-16 표현에서 각각 16비트 코드입니다.

![](/img/posts/SwiftProgrammingLanguage3_2.png)

```swift
for codeUnit in dogString.utf16 {
    print("\(codeUnit) ", terminator: "")
}
print("")
// Prints "68 111 103 8252 55357 56374 "
```

다시한번, 처음 3개의 `codeUnit`값(`68, 111, 103`)은 문자열의 UTF-8 표현하는 값과 같이 UTF-16 코드 단위 로 `D`, `o`, `g` 문자를 표현합니다. (이러한 유니코드 스칼라 ASCII 문자를 표현하기 때문입니다)

4번째 `codeUnit` 값(`8252`)은 `느낌표 두개(DOUBLE EXCLAMATION MARK)`문자에 대해 유니코드 스칼라 `U+203C`를 표현하는 16진수 `203C`값과 같은 10진수입니다. 이 문자는 UTF-16에서 하나의 코드단위로 표현될 수 있습니다

5번째와 6번째 `codeUnit` 값(`55357`과 `56374`)은 `개의 얼굴(DOG FACE)` 문자를 표현하는 UTF-16 쌍으로 대응하는 표현(surrogate pair) 입니다. 이 값은 U+D83D(10진수 55357 값)의 높은 대응(high-surrogate) 값이고 U+DC36(10진수 56374 값)의 낮은 대응(low-surrogate) 값 입니다.

### Unicode Scalar Representation

`String` 값의 유니코드 스칼라 표현은 `unicodeScalars`프로퍼티를 반복해서 사용할 수 있습니다. 이 프로퍼티는 `UnicodeScalarView` 타입이며, `UnicodeScalar` 타입의 값 컬렉션 입니다.

각 `UnicodeScalar`는 스칼라의 21 비트 값을 반환하는 `value`프로퍼티를 가지고 있으며, `UInt32` 값으로 표현됩니다.

![](img/posts/SwiftProgrammingLanguage3_3.png)

```swift
for scalar in dogString.unicodeScalars {
    print("\(scalar.value) ", terminator: "")
}
print("")
// Prints "68 111 103 8252 128054 "
```

첫번째 3개의 `UnicodeScalar` 값(`68, 111, 103`)에 대한 `value` 프로퍼티는 다시 한번 `D, o, g` 문자를 표현합니다.

4번째 codeUnit 값(8252)은 또다시 느낌표 두개(DOUBLE EXCLAMATION MARK)문자에 대해 유니코드 스칼라 U+203C를 표현하는 16진수 203C값과 같은 10진수입니다.

5번째. value프로퍼티와 마지막UnicodeScalar, 128054는 16진수 1F436과 같은 10진수이며, 개의 얼굴(DOG FACE)문자 에 대한 유니코드 스칼라 U+1F436을 나타냅니다.

value 프로퍼티 값을 조회하는대신에, 각 UnicodeScalar 값은 문자열 끼워넣기(interpolation)처럼, 새로운 String값을 구성하는데 사용할수 있습니다.

```swift
for scalar in dogString.unicodeScalars {
    print("\(scalar) ")
}
// D
// o
// g
// ‼
// 🐶
```

---


