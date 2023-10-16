---
layout:     post
title:      "Swift, 정규 표현식이 무엇인지, 어떻게 사용하는지 알아봅니다"
subtitle:   "An Introduction to Regular Expressions"
date:       2018-09-29 15:45:00
author:     "MinJun Ju"
comments: true 
tags: [Swift, Raywenderlich, regularExpression]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/search-bg_sub.jpg
thumbnail-img: /assets/post_img/background/search-bg_sub.jpg
share-img: /assets/post_img/background/search-bg_sub.jpg
---

[An Introduction to Regular Expressions](https://www.raywenderlich.com/5767-an-introduction-to-regular-expressions)의 내용을 의역했습니다.

---

## Table of contents 

  - [<U>An Introduction to Regular Expressions</U>](#section-id-16)
  - [<U>The (Basics|Introduction)</U>](#section-id-28)
  - [<U>Regular Expressions Playground</U>](#section-id-34)
  - [<U>Examples</U>](#section-id-48)
  - [<U>Overall Concepts</U>](#section-id-82)
  - [<U>NSRegularExpressions Cheat Sheet</U>](#section-id-138)
  - [<U>Where to Go From Here?</U>](#section-id-163)

---

<div id='section-id-16'/>

## An Introduction to Regular Expressions

이 튜토리얼은 정규식(regular expression)에 대한 기본과 어떻게 사용하는지에 대하여 배우게됩니다.

정규 표현식(일반적으로 `regex`로 알고 있습니다)은 문자열(string) 또는 패턴을 지정한 문자(characters) 입니다. 이것을 문자열(string) 검색으로서 생각하세요. 

텍스트 편집기, 워드 프로세서의 오래된 일반 검색을 사용하면 간단한 일치 항목을 찾을수 있습니다. 정규 표현식은 이런 간단한 검색을 할수 있지만, 한걸음 더 나아가, 문자 두자리와 같은 패턴, 하이픈(-) 뒤에 세개의 문자열과 같은 패턴을 검색할수 있습니다.

[여기](https://koenig-media.raywenderlich.com/uploads/2018/08/NSRegularExpressionsMaterials.zip)에는 플레이 그라운드에서 연습할수 있는 파일과 있는 정규 표현식 차트 시트 PDF가 있는 폴더를 다운받습니다. 차트 시트를 출력하여 개발중인 참고 문서로 사용할수 있습니다. 예제가 포함된 플레이 그라운드를 사용하여 다양한 정규 표현식을 시도해보세요. 이 튜토리얼과 [튜토리얼 이후 볼수 있는 다른 튜토리얼](https://www.raywenderlich.com/5765-regular-expressions-tutorial-getting-started)에서 나타나는 정규 표현식의 모든 예제는 해당 플레이 라운드에 있으니 반드시 확인하시기 바랍니다

---

<div id='section-id-28'/>

## /The (Basics|Introduction)/

정규 표현식을 처음사용하고 정규표현식에 대한 모든 과장된 것들이 궁금한 경우 간단한 설명이 있습니다: 정규 표현식은 주어진 텍스트 문서에서 특정 패턴과 일치하는 것을 검색하는 방법을 제공하고, 일치하는 내용을 기반으로 텍스트를 부분적으로 변경(alter)할수 있습니다. 정규 표현식에 관한 멋진 책과 튜토리얼이 많이 있습니다. 이 튜토리얼의 끝 부분에 이에 관련된 짧은 목록들이 있습니다.

---

<div id='section-id-34'/>

## Regular Expressions Playground

이 튜토리얼에서는 많은 수의 정규 표현식을 작성합니다. 정규 표현식과 함께 작업하고 시험 해보길 원한다면, 플레이 그라운드를 사용하면 좋은 방법이 됩니다.

다운로드한 것에 있는 플레이 그라운드에는 텍스트내의 정규표현식에서 검색 결과를 강조 표시하고, 플레이 그라운드의 결과창에 일치 목록 또는 그룹 목록을 표시하고 텍스트를 변경할수 있는 여러가지 함수들이 있습니다. 지금은 이러한 메소드의 구현에 대해 걱정할 필요가 없습니다. [다음 튜토리얼](https://www.raywenderlich.com/5765-regular-expressions-tutorial-getting-started) 에서 자세히 배울수 있습니다.대신 대신 `기본 예제` 및 `차트 시트` 색션까지 아래로 스크롤하고 예제를 따라하세요.

플레이 그라운드의 결과 창(side bar)에 각 예제와 함께 일치 목록이 표시됩니다. `highlighted` 예제의 경우 결과 위에 마우스를 올려 놓고 눈이나 빈원 아이콘을 클릭하여 강조 표시된 일치 항목을 텍스트에 표시할수 있습니다.

<center><img src="/assets/post_img/posts/Regular-Expressions-0.png" width="700"></center> <br>

`NSRegularExpression`을 어떻게 생성하는지 나중에 배우지만, 지금은 플레이 그라운드를 사용하여 다양한 정규 표현식이 작동하는 방식에 대한 느낌을 갖고 자신만의 패턴을 시도해볼수 있습니다.

---

<div id='section-id-48'/>

## Examples

정규 표현식이 어떤 모습인지 보여주기 위해 몇가지 간단한 예제부터 시작 해보겠습니다.

다음은 `jump` 단어와 일치하는 정규 표현식의 예입니다.

```
jump
```

정규 표현식 처럼 간단합니다. iOS에서 사용할수 있는 일부 API로 정규 표현식과 일치하는 텍스트 문자열을 검색할수 있습니다 - 일치하는 항목을 찾으면, 텍스트가 있는 위치를 찾거나 텍스트를 바꿀수 있습니다. 

다음은 약간더 복잡한 예제 입니다 - `jump`, `jumps` 둘중 하나의 단어와 일치합니다.

```
jump(s)?
```

이것은 정규 표현식에서 사용할수 있는 몇가지 특수한 문자(characteres)를 사용하는 예입니다. 괄호(the parenthesis)는 그룹을 생성하고, 물음표 표시는 "이전 요소(여기의 그룹의 경우에) 0, 1번을 일치시킵니다"

이제는 정말 복잡한 예제입니다. 이것은 열려있거나, 닫혀 있는 HTML tags쌍을 매칭시키고, 그 사이의 내용을 일치 일치시킵니다.

```
<([a-z][a-z0-9]*)\b[^>]*>(.*?)</\1>
```

좀 복잡해보이나요? 이 튜토리얼의 나머지 부분에서는 정규 표현식의 모든 특수 문자에 대해 배우게 되므로 걱정하지않아도 됩니다. 이 튜토리얼이 완료될때 어떻게 작동하는지 이해하게 될것입니다.

이전 정규식에 대한 더 자세한 걸 원한다면, [여기](https://www.regular-expressions.info/backref.html)의 설명을 참조하세요.

> Note: 실제로 사용할땐, [HTML의 구문을 분석하기 위해 정규 표현식만을 사용해서는 안됩니다](https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags/1732454#1732454). 이것대신, 표준 XML 파서를 사용하세요.

---

<div id='section-id-82'/>

## Overall Concepts

더 나아가기 전에, 정규 표현식에 대한 몇가지 핵심 개념을 이해하는것이 중요합니다. 

리터럴 문자(Literal characters)는 가장 단순한 정규 표현식 입니다. 리터럴 문자는 워드 프로세서, 텍스트 편집기에서 `찾기` 작업과 비슷합니다. 예를들어, 단일 문자 정규 표현식 `t`는 `t`가 존재하는 모든 문자열을 찾고, 정규 표현식 `jump는 `jump`가 존재하는 모든 모양을 찾습니다. 꽤 직관적 입니다. 

프로그래밍 언어에서와 마찬가지로, 다음과 같은 정규 표현식 구문에 일부 예약된 문자(some reserved characters)가 있습니다.

- `[`
- `( and )`
- `\`
- `*`
- `+`
- `?`
- `{ and }`
- `^`
- `$`
- `.`
- `| (pipe)`
- `/`

이 문자들은 고급 패턴 매칭을 위해 사용됩니다. 이러한 문자 중 하나를 검색하려면, `백슬레시(\)`로 탈출 처리 해야합니다. 예를들어 텍스트 블록에서 모든 마침표를 검색하려면 패턴은 `.`이 아니라 `\.` 입니다.

Python, Perl, Java, C#, Ruby등의 환경은 정규 표현식을 구현할때 미묘한 차이점이 있습니다. 스위프트도 예외는 아닙니다. 

Objective-C와 Swift모두 리터럴 문자열에서 특수문자를 탈출(escape) 해야합니다.(예를들어: `백슬레시(\)`문자로 시작함). 이러한 특수 문자중 하나는 백슬레시 그 자체입니다. 정규식을 만드는데 사용된 패턴도 문자열(string)이기 때문에, `String`, `NSRegularExpression`으로 작업할때 백슬레시 문자를 탈출처리 해야한다는 점에서 복잡합니다. 

이것은 Swift, ObjectiveC 코드에서 정규 표현식 `\.`은 `\\.`처럼 나타내야 함을 의미합니다.

위의 개념을 명확히 하기위해:

- 리터럴 `"\\."`는 `\.`처럼 보이는 문자열을 정의합니다.
- 정규 표현식 `\.`는 `단일 마침표(.)` 문자와 일치합니다.

괄호 캡쳐(Capturing parentheses)는 패턴의 일부를 그룹화하는데 사용됩니다. 예를들어 `3(pm|am)`은 `3 pm` 텍스트와 `3 am` 텍스트를 일치시킵니다. 여기 파이프(pipe) 문자(`|`)는 OR 연산자 처럼 동작합니다. 원하는 만큼 정규 표현식에 많은 수의 파이프문자를 포함시킬수 있습니다. 예를들어 `(Tom|Dick|Harry)`는 이 세가지 이름중 하나와 일치하는 유효한 패턴입니다.

선택적으로(optionally) 특정 텍스트 문자열과 일치해야하는 경우 괄호로 그룹화 하면 편리합니다. 어떤 텍스트에서 `November`에 대한걸 찾고있지만, 사용자가 `Nov`로 축약할것 일수도 있습니다. 패턴을 `Nov(ember)?`로서 정의 할수 있습니다. 캡처 괄호 뒤에 있는 물음표는 괄호 안에 있는 것이 모두 선택사항(optional)임을 의미합니다.

이러한 괄호는 `capturing`으로 불려집니다. 왜냐하면  괄호들은 일치하는 내용들을 캡처하고 정규 표현식의 다른 위치에서 참조할수 있기 때문입니다. 

예를들어 "Say hi to Harry."라는 문자열이 있다고 가정합니다. search-and-replace 정규 표현식을 생성하여 `(Tom|Dick|Harry)`의 `that guy $1`과 함께 해당 항목을 변경하면, 그 결과는 “Say hi to that guy Harry”.가 됩니다. `$1`을 사용하면 이전 규칙의 첫번째 캡처된 그룹을 참조할수 있습니다.

캡처링(capturing)과 비-캡처링(non-capturing)은 약간 어려운 주제입니다. [여기 다른 튜토리얼](https://www.raywenderlich.com/5765-regular-expressions-tutorial-getting-started)에서 캡처링 과 비 캡처링 그룹 예제를 만나볼수 있습니다. 

`문자 클레스(Character classes)`는 가능한 단일 문자열 일치 집합(set of possible single-character matches)을 나타냅니다. 문자 클래스는 대괄호(`[` and `]`) 사이에 나타납니다.

예를 들어 정규표현식 `t[aeiou]`는 “ta”, “te”, “ti”, “to”, or “tu”을 매칭합니다. 대괄호 안에 원하는 만큼 문자 가능성을 작성할수 있지만, 집합 안의 모든 단일 문자가 매칭된다는것을 기억하세요. `[aeiou]`는 다섯개의 문자 처럼 보이지만 사실은 “a”, “e”, “i”, “o”, “u” 을 의미합니다.

문자가 연속적으로 나타나는 경우 문자 클레스에서 범위(range)를 정의할수 있습니다. 예를들어 100에서 109 사이의 숫자를 검색하려면, 패턴은 `10[0-0]`가 됩니다. 이것은 10[0123456789]와 같은 결과를 반환하지만 범위를 사용하면 정규 표현식을 훨씬 더 명확하게 이해할수 있습니다.

그러나 문자 클래스는 숫자에만 국한되지 않습니다. 문자로 동일한 작업을 수행할수 있습니다. 예를 들어 `[a-f]`는  “a”, “b”, “c”, “d”, “e”, “f”과 일치를 의미합니다.

문자 클래스는 대개 일치시킬 문자를 포함하지만, 명시적으로 일치시키지 않기 위한것은 어떻게 해야 하나요? `^`문자로 시작하는 무효화된 문자 클래스(negated character classes)를 정의할수 있습니다. 예를면, 패턴 `t[^o]`는 `t`와 묶인 것들과 `to`의 단일 인스턴스를 제외한 문자를 일치시킵니다.

---

<div id='section-id-138'/>

## NSRegularExpressions Cheat Sheet

정규 표현식은 매우 복잡한 정리로 끝날 수 있는 간단한 구문의 훌륭한 예 입니다. 

공식 raywenderlich.com의 정규 표현식 차트 시트 PDF는 이 자습서상단 또는 하단에 있는 자료 다운로드 버튼을 통해 다운로드 할수 있습니다.

또한 다음을 시작하기 위한 몇가지 추가 설명과 함께 아래에 있는 차트 시트의 축약된 양식 입니다. 

- `.`은 모든 문자와 매칭됩니다. `p.p`는 pop, pup, pmp, p@p, 다른 모든과 매칭됩니다.
- `\w`는 숫자(numbers), 문자(letters), 밑줄(underscore)와 같이 단어와 유사한(work-like character) 문자 포함하지만, 구두점(punctuation) 또는 다른 기호(other symbols)와 유사한 문자를 일치시킵니다. `hello\w`는 hello_”, “hello9”,“helloo” 와 일치하지만 “hello!” 과는 일치하지 않습니다.
- `\d`는 숫자(numeric digit)과 일치하고, 대부분의 경우 [0-9]를 나타냅니다. `\d\d?:\d\d`는 `9:30, 12:45`와 같은 시간 형식의 문자열을 일치 시킵니다
- `\b`는 공백(spaces), 구두점(punctuation)과 같은 경계 문자와(boundary characters) 일치합니다. `to\b`는 "to the moon", "to!"에서 "to"와 일치하지만. "tomorrow"에서는 일치하지 않습니다. `\b`는 전체 단어(whole word) 타입 매칭에 편리합니다.
- `\s`는 공백(spaces), 탭(tabs), 개행 문자(newlines) 와 같은 여백(whitespace)와 일치합니다. `hello\s`는 “Well, hello there!”.에서 "hello"를 매칭시킵니다
- `^`는 줄의 시작 에서 매칭됩니다. `^`은 대괄호 안의 `[^]`과 다릅니다. 예를 들어 `^Hello`는 "Hello there"와 일치하지만 "He said Hello"와는 일치하지 않습니다.
- `$`는 줄 끝에서 일치합니다. 예를들어 `end$`는 "It was the end"와 일치하지만 "the end was near"과는 일치하지 않습니다
- `*`는  `*`의 이전 요소를 0번 이상 매칭 시킵니다. `12*3`은 "13", "123", "1223", "122223", "1222222223" 과 매칭됩니다.
- `+`는 `+`의 이전 요소를 1회 이상 매칭 시킵니다. `12+3`은 "123", "1223", "122223", "1222222223"과 매칭되지만 13과는 매칭되지 않습니다. 
- `{}` 중괄호는 최소 및 최대 매칭 수를 포함합니다. 예를들어 `10{1,2}1`는 "101", "1001"과 매칭되지만 `10001`은 최소한의 매칭수가 1, 최대 매칭 수가 2 로 일치되지 않습니다. `He[Ll]{2,}o`는 최소 일치수가 2 이지만, 최대 일치 수는 설정되지 않았으므로 "HeLLo", L이 많은 "HellLLLllo"와 같은 이상한것과도 일치합니다.(그러므로 무제한)

이제 시작하기에 충분합니다.

위에서 언급한 플레이그라운드에 모두 포함되어 있기 때문에 이러한 예제를 직접 실험 해볼수 있습니다.

---

<div id='section-id-163'/>

## Where to Go From Here?

다음은 정규식에 대한 유용한 리소스 목록 입니다.

- [<U>www.regular-expressions.info</U>](www.regular-expressions.info)는 Jan Goyvaerts의 유익한 사이트 입니다. 그는 정규 표현식에 대한 종합적인 책을 출판 했습니다
- [<U>NSRegularExpression Class Reference</U>](https://developer.apple.com/library/archive/#documentation/Foundation/Reference/NSRegularExpression_Class/Reference/Reference.html)는 API를 사용할때 항상 가장 좋은 참조 입니다
- [</U>regexpal.com](https://www.regexpal.com/)는 정규식 패턴을 빠르게 테스트하기 위해 매우 유용한 리소스 입니다.

Swift 코드에서 정규 표현식을 사용하는 방법을 배우려면 [NSRegularExpression Tutorial](https://www.raywenderlich.com/5765-regular-expressions-tutorial-getting-started)로 넘어가세요.
  

