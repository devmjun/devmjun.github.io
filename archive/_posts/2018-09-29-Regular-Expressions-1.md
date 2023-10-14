---
layout:     post
title:      "Swift, 정규 표현식이 무엇인지, 어떻게 사용하는지 알아봅니다 - 1"
subtitle:   "Regular Expressions Tutorial: Getting Started"
date:       2018-09-29 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift, Raywenderlich, regularExpression]
---

[Regular Expressions Tutorial: Getting Started](https://www.raywenderlich.com/5765-regular-expressions-tutorial-getting-started)의 내용을 의역했습니다.

---

## Table of contents 

  - [<U>Regular Expression Basics</U>](#section-id-23)
  - [<U>Implementing Regex in iOS</U>](#section-id-29)
  - [<U>Implementing Search and Replace</U>](#section-id-54)
  - [<U>Validating Data</U>](#section-id-163)
  - [<U>Handling Multiple Search Results</U>](#section-id-300)
    - [<U>Date Requireements:</U>](#section-id-330)
    - [<U>Time Requirements:</U>](#section-id-335)
  - [<U>Where to Go From Here?</U>](#section-id-433)
  - [<U>One More Exercise…</U>](#section-id-444)
  - [<U>More Resources</U>](#section-id-456) 

---

<div id='section-id-23'/>

## Regular Expression Basics

정규 표현식(regular expressions 또는 regex)을 들어보지 못했다면 이 튜토리얼을 계속하기전에 기본 개념을 알고 시작하면 좋습니다. 다행히도, 우리는 이미 이것을 도와줄수 있는 내용을 이미 작성했고 [Introduction to Regular Expressions tutorial](https://www.raywenderlich.com/5767-an-introduction-to-regular-expressions) <- 여기 에서 확인할수 있습니다. 

---

<div id='section-id-29'/>

## Implementing Regex in iOS

이제 기본 사항을 알았으므로 웹에서 정규 표현식을 사용할 차례입니다. 

[여기](https://koenig-media.raywenderlich.com/uploads/2018/09/iRegex.zip)에서 시작 프로그램을 다운로드 하고 Xcode에서 iRegex 스타트 프로젝트를 열고 실행합니다.

상사를 위한 일기앱을 만들것입니다 - 악당은 세상을 억압하기 위한 모든 나쁜 계획을 추적 해야 한다는걸 알고 알고있습니다. 거기에는 미니언처럼 해야할 일들이 많이 있고, 당신은 이 계획의 한 부분입니다 - 다른 계획을 위한 앱을 만드는게 이번에 할일 입니다.(그냥 텍스트를 입력하면 검색, 강조표시, 검색한 텍스트 변경하는 일기앱 만들기입니다..)

앱의 UI는 대부분 완성되었지만 정규식에 의존하는 앱의 핵심 기능은 아직 구현되지 않았습니다. 

이 튜토리얼에서 할일은 요구된 정규식을 추가하고 앱을 빛내는 것입니다.

다음은 최종 제품을 시연하는 몇가지 샘플 스크린 샷입니다. 

![](https://koenig-media.raywenderlich.com/uploads/2018/06/iRegexOverview.png)

앱의 마지막은 정규 표현식을 사용하는 일반적인 두가지 사례를 다룹니다.

1. 텍스트 검색(Performing text search): 강조 표시(highlighting) 검색 및 교체 
2. 사용자 입력의 유효성 검사

정규 표현식의 가장 직접적인 사용인 텍스트 검색(text search)의 구현으로 시작합니다.

---

<div id='section-id-54'/>

## Implementing Search and Replace

앱의 검색-교체 기능(search-and-replace functionality of the app)의 기본 개요 입니다

- Search view Controller, `SearchViewController`는 당신 상사의 개인 일기에서 발췌한 내용을 포함하는 읽기 전용 `UITextView`를 포함합니다. 
- Navigation bar는 `SearchOptionsViewController`를 modally하게 표시하는 검색 버튼이 있습니다.
- 그러면 악마같은 상사가 입력란에 정보를 입력하고 검색(Search)을 탭합니다.
- 앱은 Search View를 닫고(dismiss) Text View의 일기에서 일치하는 내용은 강조표시(highlight) 합니다.
- 만약 상사가 SearchOptionsViewController에서 `Replace`옵션을 선택하면, 앱은 일치하는 모든 텍스트에 대해 결과를 강조하는것 대신에 교체 합니다.

> Note: 앱은 UITextView의 NSAttributedString 속성을 사용하여 검색결과를 강조 표시합니다
> 
> 또한 TextKit을 사용하여 강조기능을 구현할수 있습니다. 자세한 내용은 [Text Kit Tutorial in Swift](https://www.raywenderlich.com/5960-text-kit-tutorial-getting-started)를 참조해주세요 

또한 일기의 모든 날짜, 시간을, 일기의 각 입력 사이에 분리표시를 강조 표시하는 읽기 모드 버튼이 있습니다. 간단히 하기 위해, 텍스트에 나타날수 있는 날짜, 시간, 문자열의 가능한 모든 형식을 다루지는 않습니다. 튜토리얼의 마지막 부분에서 이 강조 기능을 구현합니다.

검색기능을 작동시키기 위한 첫번째 단계는 표준 문자열을 `NSregularExpression` 객체를 사용하여 정규 표현식으로 표현하는 것입니다.

`SearchOptionsViewController.swift`를 열고 `SearchViewController`는 `SearchOptionsViewController`를 modally로 표시하고, 사용자가 검색 단어를 입력하거나(혹은 교체 옵션) 대/소 문자를 구분해야하는지, 단어 전체를 검색할지를 지정할수 있습니다. 

파일의 맨위에 있는 `SearchOptions` 구조체를 살펴보세요. `SearchOptions`는 유저의 검색 옵션을 캡슐화한 단순한 구조체 입니다. 이 코드는 `SearchOptions`의 인스턴스를 다시 SearchViewController에 전달합니다. 적절한 `NSRegularExpression`을 생성하기 위해 이것을 직접 사용할수 있다면 좋을것입니다. 확장에 `NSregularExpression`에 사용자화한 초기화를 추가하여 이 작업을 수행할수 있습니다.

RegexHelpers.swift 라는 이름의 swift 파일을 생성하고 다음코드를 추가합니다.

```swift
extension NSRegularExpression {
  
  convenience init?(options: SearchOptions) throws {
    let searchString = options.searchString
    let isCaseSensitive = options.matchCase
    let isWholeWords = options.wholeWords
    
    let regexOption: NSRegularExpression.Options = 
      isCaseSensitive ? [] : .caseInsensitive
    
    let pattern = isWholeWords ? "\\b\(searchString)\\b" : searchString
    
    try self.init(pattern: pattern, options: regexOption)
  }
}
```

이 코드는 NSRegularExpression에 편리한 초기화를 추가합니다. 전달된 `SearchOptions`인스턴스 내에 다양한 설정을 사용하여 올바르게 구성합니다. 

주의 사항: 

- 유저가 대-소문자 구분하지 않은(case-insensitive)  검색을 요청할때마다 정규 표현식은 `.caseInsensitive` `NSRegularExpressionOptions` 값을 사용합니다. `NSRegularExpression`의 기본동작은 대-소문자를 구분(case-sensitive)하는 검색을 이행하는 것이지만, 이 경우에는 사용자에게 좀더 친숙한 대-소문자를 구분 하지 않는(case-insensitive) 검색을 기본 값으로 사용합니다. 
- 유저가 전체 단어 검색을 요청하면 앱은 `\b` 문자 클레스에서 정규 표현식 패턴을 감쌉니다(wraps). `\b`는 경계 문자 클레스(boundary character) 클레스 이므로, 검색 패턴 앞뒤에 `\b`를 두면 전체 전체 검색으로 바뀝니다.(즉, `\bcat\b` 패턴은 단어 "cat"와 일치합니다. 하지만 `catch`는 일치하지 않습니다.)

어떤 이유로 든 `NSRegularExpression`을 만들수 없는 경우, 초기화는 실패하고 `nil`을 반환합니다. 이제 NSRegularExpression 객체를 사용하여 텍스트를 일치시킬수 있습니다. 

`SearchViewController.swift` 를 열고 `searchForText(_:replaceWith:inTextView:)를` 찾고 빈 메소드에 다음을 추가합니다.

```swift
if let beforeText = textView.text, let searchOptions = self.searchOptions {
  let range = NSRange(beforeText.startIndex..., in: beforeText)
      
  if let regex = try? NSRegularExpression(options: searchOptions) {
    let afterText = regex?.stringByReplacingMatches(
      in: beforeText,
      options: [], 
      range: range, 
      withTemplate: replacementText
    )
    textView.text = afterText
  }
}
```

먼저, 이 메소드는 UITextView의 현재 문자를 캡쳐하고, 전체 문자열의 범위를 계산합니다. 정규 표현식을 텍스트의 일부에만 적용할수 있습니다. 따라서 범위를 지정해야합니다. 이 경우에, 전체 문자열을 사용하기 때문에 정규 표현식이 모든 텍스트에 적용 됩니다.

진짜 마술은 `stringByReplacingMatches(in:options:range:withTemplate:). `호출에서 발생합니다. 이 매소드는 이전 문자열을 변경하지 않고 새 문자열을 반환합니다. 그런 다음 이 메소드는 사용자가 결과를 볼수 있도록 UITextView에 새 문자열을 설정합니다. 

`SearchViewController`에서 `highlightText(_:in:TextView:)`를 찾고 다음을 추가합니다.

```swift
// 1
let attributedText = textView.attributedText.mutableCopy() as! NSMutableAttributedString
// 2
let attributedTextRange = NSMakeRange(0, attributedText.length)
attributedText.removeAttribute(
  NSAttributedString.Key.backgroundColor, 
  range: attributedTextRange)
// 3
if let searchOptions = self.searchOptions, 
   let regex = try? NSRegularExpression(options: searchOptions) {
  let range = NSRange(textView.text.startIndex..., in: textView.text)
  if let matches = regex?.matches(in: textView.text, options: [], range: range) {
    // 4
    for match in matches {
      let matchRange = match.range
      attributedText.addAttribute(
        NSAttributedString.Key.backgroundColor, 
        value: UIColor.yellow, 
        range: matchRange
      )
    }
  }
}

// 5
textView.attributedText = (attributedText.copy() as! NSAttributedString)
```

여기에 위 코드의 단계별 설명입니다. 

1. 첫째, textview의 `attributedText`의 변경 가능한 복사본을 얻습니다.
2. 그리고 난 후 전체 텍스트 길이를 위한 `NSRange`를 생성하고 범위 이내의 이미 존재하는 텍스트 속성 배경 색상을 지웁니다. 
3. 찾기와 바꾸기와 마찬가지로, 편의 초기화를 사용하여 정규 표현식을 생성하고 textview의 텍스트이내의 정규표현식과 일치하는 모든 배열을 가져옵니다. 
4. 각 일치된 것들을 반복하고 각각 노란 배경 색상 속성을 추가합니다.
5. 마지막으로 강조 결과와함께 UITextView를 업데이트 합니다.

앱을 빌드하고 실행합니다. 

다양한 단어와 단어 그룹을 검색해보세요!. 아래 그림과 같이 텍스트 전체에 검색어가 강조 표시됩니다. 

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/06/Highlighting-The.png" width="500" height="700"></center> <br>


다양한 옵션을 사용하여 `the`라는 단어를 검색하고 효과를 보세요. 예를 들어, 전체 단어옵션을 사용하면 `then`에서 the는 강조표시 되지 않습니다.

또한 검색과 바꾸기 기능을 테스트하여 텍스트 문자열이 예상대로 바뀌엇는지 확인하세요. 또한 대/소 문자(match case)와 전체 단어 옵션을 모두 사용해보세요.

텍스트 강조 표시, 교체는 모두 좋습니다. 하지만 앱에서 정규 표현식을 효과적으로 사용하려면 어떻게 해야 하나요?

---

<div id='section-id-163'/>

## Validating Data

많은 앱에는 사용자가 이메일 주소나 전화번호를 입력하는 것과 같은 사용자 입력이 있습니다. 이 사용자 입력에 대해 일정 수준의 데이터 유효성 검사를 수행하여 데이터 무결성을 보호하고 사용자가 데이터를 잘못 입력하는 실수를 알리는 것이 좋습니다. 

정규 표현식은 패턴 일치가 훌륭하기 때문에 여러 종류의 데이터 유효성 검사에 완벽합니다. 

앱에 추가해야할 두가지 사항이 있습니다: 유효성 검사 패턴과 해당 패턴을 사용하여 유저의 입력의 유효성을 검증하는 메커니즘 입니다. 

연습으로, 정규 표현식을 사용하여 다음 텍스트 문자열의 유효성을 검증하세요(대,소 문자는 구문하지 않아도 됩니다.

- `First name`: 1-10개 길이로 되어있는 표준 영문자로 구성 되어야 합니다
- `Middle initial`: 1개의 영문자로 구성해야합니다.
- `Last name`: 표준 영문자와 윗첨자(apostrophe(O'Brian 같은 이름), 하이픈(Randell-Nash와 같은 이름)으로 구성되어야 하며 길이는 2~20자 사이여야 합니다.
- `Super Villain name`: 표준 영문자, 윗첨자(apsotrophe), 마침표*period), 하이픈(hyphen), 숫자(digits), 공백(space) 뿐만 아니라 2-20자 사이의 길이로 구성되어야 합니다. Ra’s al Ghul, Two-Face, Mr. Freeze. 이름들을 허용합니다.
- `Password`: 최소한 하나 이상의 대문자, 소문자, 숫자를 포함해야 하고, 문자는 8자 이상을 포함해야 합니다.(이건 까다롭습니다)

물론 materials 폴더에 있는 `iRegex` 플레이그라운드를 사용하여 표현식을 개발할수 있습니다. 

요구된 정규 표현식을 어떻게 작성했나요? 막혔다면, 튜토리얼의 맨위에 있는 치트 시트로 돌아가서 위의 시나리오에 도움이 되는 조각들을 찾아보세요.

아래의 스포일러는 사용할 정규 표현식을 보여줍니다. 그러나 아래에 스포일러를 읽기 전에, 먼저 자신을 파악하고 결과를 확인하세요.

```swift
"^[a-z]{1,10}$",    // First name
"^[a-z]$",          // Middle Initial
"^[a-z'\\-]{2,20}$",  // Last Name
"^[a-z0-9'.\\-\\s]{2,20}$"  // Super Villain name
"^(?=\\P{Ll}*\\p{Ll})(?=\\P{Lu}*\\p{Lu})(?=\\P{N}*\\p{N})(?=[\\p{L}\\p{N}]*[^\\p{L}\\p{N}])[\\s\\S]{8,}$" // Password validator
```

`AccountViewController.swift`를 열고 `viewDidLoad()`에 다음 코드를 추가합니다.

```swift
textFields = [
  firstNameField, 
  middleInitialField, 
  lastNameField, 
  superVillianNameField, 
  passwordField 
]

let patterns = [ "^[a-z]{1,10}$",
                 "^[a-z]$",
                 "^[a-z'\\-]{2,20}$",
                 "^[a-z0-9'.\\-\\s]{2,20}$",
                 "^(?=\\P{Ll}*\\p{Ll})(?=\\P{Lu}*\\p{Lu})(?=\\P{N}*\\p{N})(?=[\\p{L}\\p{N}]*[^\\p{L}\\p{N}])[\\s\\S]{8,}$" ]

  regexes = patterns.map {
    do {
      let regex = try NSRegularExpression(pattern: $0, options: .caseInsensitive)
      return regex
    } catch {
      #if targetEnvironment(simulator)
      fatalError("Error initializing regular expressions. Exiting.")
      #else
      return nil
      #endif
    }
  }
```

뷰 컨트롤러에서 textfields의 문자열 패턴 배열을 생성합니다. 그런 다음 Swift의 map 함수를 사용하여 NSRegularExpression 객체의 배열을 각 패턴마다 하나씩 생성합니다. 패턴에서 정규 표현식 생성을 실패하면, 시뮬레이터에서 `fatalError`을 반환합니다. 그러므로 앱을 개발할때는 신속하게 오류를 잡을수 잇지만, 제품에서는 앱이 멈추는걸 사용자가 원하지 않으니 무시해야합니다.

첫번째 이름의 유효성을 검사하는 정규 표현식을 만들려면, 문자열의 시작에서 일치여부를 찾습니다. 그후 A-Z에서 문자의 범위를 일치시키고 문자열의 문자와 일치시켜 길이가 1에서 10자 사이인지 확인합니다. 

다음 두 패턴 - 중간 초기화 와 마지막 이름 - 둘은 같은 로직을 사용합니다. 중간 초기화의 경우에 길이를 지정하는게 필요합니다 - `^[a-z]$`에서 `{1}`로 기본적으로 한개의 문자와 일치하게 됩니다. 악당(super villain)이름 패턴 또한 유사하지만, 특수문자(윗첨자(apostrophe), 하이픈(hyphen), 마침표(period))을 추가로 지원하여 조금더 복잡하게 보입니다. 

여기서 대소 문자를 구분하지 않아도 된다는점에 유의하세요. 정규 표현식을 인스턴스화 할때 대소문자를 구분 처리 해야합니다.

암호 유효성 검사기는 어떻나요? 이것은 regexes를 어떻게 사용할수 있는지 보여주기 위한 연습일 뿐이며 [실제 애플리케이션에서는 이것을 사용하지 말아야 한다는 것](https://stackoverflow.com/questions/48345922/reference-password-validation)이 중요하다는걸 강조합니다.

그렇다면, 실제로 어떻게 작동하나요? 먼저, 정규식 이론을 다시 상기해봅니다.

- (괄호)는 정규 표현식의 일부를 그룹화하는 캡쳐 그룹을 정의합니다
- 캡쳐그룹이 `?=`, 으로 시작할때, `positivie Lookahead`로 사용되고, 캡처 그룹에서 패턴이 따라오는 경우에만 이전 패턴이 일치됩니다. 예를들어 `A(?=B)`는 B가 뒤따라올때에만 A를 일치 시킵니다. `Lookaheads`는 `^`, `$` 와같이 주장하고 문자 그 자체를 사용하지 않습니다.
- `\p{}`는 특정 범주 내의 유니코드 문자와 일치시키고, `\P{}`는 특정범주에 없는 유니코드 문자와 일치 시킵니다. 카테고리는 아마, 예를들면 모든 문자(`\p{L}`), 모든 소문자(`\p{Lu}`), 숫자(`\p{N}`) 일수 있습니다. 

이것들을 사용하여 정규식 자체를 깨버립니다.

- `^`, `$`는 보통 줄의 첫번째와 끝을 일치 시킵니다. 
- `(?=\P{Ll}*\p{Ll})`는 소문자 유니코드 문자 이후에 소문자가 아닌 유니코드의 숫자를 일치시키고, 여러개의 문자열이 나오면 적어도 하나 이상의 소문자를 일치시킵니다. 
- `(?=\P{Lu}*\p{Lu})`는 위와 비슷한 패턴을 따르지만, 최소한 한개 이상의 대문자를 보장합니다
- `(?=\P{N}*\p{N})`는 최소한 한개 이상의 숫자를 보장합니다.
- `(?=[\p{L}\p{N}]*[^\p{L}\p{N}])`는 `^`의 사용하여 적어도 하나의 문자(letter), 숫자(digit)가 아닌 하나 이상의 문자(character)를 보장합니다.
- 마지막으로 `[\s\S]{8,}`는 공백 문자 또는, 공백문자(whitespace),비-공백문자(non-whitespace)가 아닌 문자를 8번 이상 일치 시킵니다.

정규 표현식으로 매우 독창적으로 표현할수 있습니다. `[0-9]` 대신, `\d`를 사용하는것처럼 위의 문제를 해결하는 다른 방법들이 있습니다. 하지만, 모든 해결책은 작동한다면 괜찮습니다(?)

이제 패턴을 완성했으니, 각 텍스트 필드에 입력된 텍스트의 유효성을 검사해야합니다. 

AccountViewController.swift에서, `validate(string:withRegex:)`을 찾고 더미 구현을 다음으로 교체합니다

```swift
let range = NSRange(string.startIndex..., in: string)
let matchRange = regex.rangeOfFirstMatch(
  in: string, 
  options: .reportProgress, 
  range: range
)
return matchRange.location != NSNotFound
```

그리고 바로 아래 `validateTextField(_:)`에 다음 구현을 추가합니다.

```swift
let index = textFields.index(of: textField)
if let regex = regexes[index!] {
  if let text = textField.text?.trimmingCharacters(in: .whitespacesAndNewlines) {
    let valid = validate(string: text, withRegex: regex)

    textField.textColor = (valid) ? .trueColor : .falseColor
  }
}
```

이는 `SearchViewControlelr.swift`에서 했던것과 매우 유사합니다. `validateTextField(_:)`부터 시작하여 정규 표현식 배열에서 관련 정규 표현식을 가져오고 텍스트필드에서 사용자입력에서 공백을 제거합니다. 

그런 다음 `validate(string:withRegex:)`에서 전체 문자열을 위한 범위(range)를 생성하고 `rangeOfFirstMatch(in:options:range:)`의 결과를 테스트하여 일치하는지 확인합니다. 이 호출은 첫번째 일치 항목을 발견하면 일찍 종료되므로 일치하는 항목을 확인하는 가장 효율적인 방법일수 있습니다. 그러나 `numberOfMatches(in:options:range:)`같이 총 일치한 횟수를 알아야 할 경우 다른 대안이 있습니다. 

마지막으로 `allTextFieldsAreValid()`에서 더미 구현을 다음 구현으로 교체합니다

위에서 설명한 `validate(string:withRegex:)` 메소드를 사용하면 `allTextFieldsAreValid()` 메소드는 비어있지않은 모든 텍스트 필드가 유효한지 여부를 간단하게 테스트하기만 하면됩니다.

프로젝트를 실행하고 왼쪽 상단의 `계정 아이콘` 버튼을 클린하고 회원가입 양식에 다음 정보들을 기입하는하세요. 각 필드가 완료되었을때 각 필드를 완료하며 ㄴ아래 스크린샷과 같이 텍스트가 유효한지 여부에 따라 텍스트가 녹색 또는 빨간색으로 변합니다. 

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/06/ValidatingAccountInformation.png" width="500" height="700"></center> <br>


계정을 작성하고 저장해보세요. 모든 텍스트 필드의 유효성을 올바르게 검증해야 작업을 수행할수 있습니다. 앱을 재실행 합니다. 

> Note: 이것은 정규 표현식에 대한 튜토리얼이지 인증에 대한 튜토리얼이 아닙니다. 이 자습서의 코드를 인증 모범 사례의 예로 사용하지 마세요. 여기에서 암호는 장치에 일반 텍스트로 저장됩니다. `LoginViewController`에 `loginAction`은 서버에 안전하게 저장되는 것이 아니라 장치에 저장된 암호만 확인합니다. 이것은 어떤 방식으로든 안전하지 않습니다. 

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/06/LoginViewController.png" width="500" height="700"></center> <br>


---

<div id='section-id-300'/>

## Handling Multiple Search Results

Navigation bar에 있는 읽기 모드 버튼을 아직 사용하지 않았습니다. 사용자가 탭을 하면, 앱은 집중 모드(focused mode)로 들어가 텍스트에 있는 날짜, 시간을 강조표시 하고, 모든 일기 항목의 끝을 강조 표시 해야합니다.  

`SearchViewController.swift`를 열고 Reading Mode 버튼 아이템을 위한 구현을 찾습니다. 

```swift
//MARK: Underline dates, times, and splitters

@IBAction func toggleReadingMode(_ sender: AnyObject) {
  if !self.readingModeEnabled {
    readingModeEnabled = true
    decorateAllDatesWith(.underlining)
    decorateAllTimesWith(.underlining)
    decorateAllSplittersWith(.underlining)
  } else {
    readingModeEnabled = false
    decorateAllDatesWith(.noDecoration)
    decorateAllTimesWith(.noDecoration)
    decorateAllSplittersWith(.noDecoration)
  }
}
```

위에 메소드는 날짜, 시간, 일기 항목 분리자를 텍스트에서 장식하는 세가지 다른 도우미 메소드를 호출합니다. 각 메소드는 텍스트 밑줄, 장식 없음 설정(밑줄 삭제) 를 위한 장식 옵션을 가집니다. 위의 각 메소드 구현을 보면, 빈 상태 일것입니다.

장식 메소드의 구현을 걱정하지 전에, `NSRegularExpression` 자체를 정의하고 만들어야 합니다. 이것을 하는 편리한 방법은 `NSRegularExpression`에 정적변수를 만드는것 입니다. `RegexHelpers.swift`로 전환하고 `NSRegularExpression` 확장 내부에 다음 코드를 추가합니다.

```swift
static var regularExpressionForDates: NSRegularExpression? {
  let pattern = ""
  return try? NSRegularExpression(pattern: pattern, options: .caseInsensitive)
}

static var regularExpressionForTimes: NSRegularExpression? {
  let pattern = ""
  return try? NSRegularExpression(pattern: pattern, options: .caseInsensitive)
}

static var regularExpressionForSplitter: NSRegularExpression? {
  let pattern = ""
  return try? NSRegularExpression(pattern: pattern, options: [])
}
```

이제 이 패턴을 완성하는 것이 당신의 일입니다. 요구 사항은 다음과 같습니다.

<div id='section-id-330'/>

### Date Requireements:

- xx/xx/xx, xx.xx.xx, xx-xx-xx 형식. 코드는 그 자체를 강조 표시 하기때문에, 일, 달, 년도의 위치는 중요하지 않습니다. 예: 10-05-12
- 전체 또는 약자로된 월 이름(예: Jan, Jaunary), 한개 또는 두개 숫자(예: 1, 12), 달의 날짜는 서수(ordinal)(예: 1st, 2nd, 10th..), 구분은 쉼표, 그리고 4자리 숫자(예: xxxx) 순으로 으로 지정할수 있습니다. 거기는 0개 이상의 공백이 있을수 있습니다(예: 2001년 3월 13일)

<div id='section-id-335'/>

### Time Requirements:

- `~` 문자의 연속이 최소 10번 입니다.

플레이 그라운드를 사용하여 시험해볼수 있습니다. 필요한 정규식을 알아낼수 있는지 확인하세요. 

여기에 시도해볼수 있는 세가지 샘플 패턴이 있습니다. `regularExpressionForDates`의 빈 패턴을 다음으로 대체하세요.

```swift
(\\d{1,2}[-/.]\\d{1,2}[-/.]\\d{1,2})|((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)((r)?uary|(tem|o|em)?ber|ch|il|e|y|)?)\\s*(\\d{1,2}(st|nd|rd|th)?+)?[,]\\s*\\d{4}
```

이 패턴은 `|` 문자에 의해 두 부분으로 분리됩니다. 즉 첫번째 또는 두번째 부분중 하나가 일치함을 의미합니다

첫번째 부분은: `(\d{1,2}[-/.]\d{1,2}[-/.]\d{1,2})` 입니다. 즉, 두 자릿수 뒤에 `-`, `/`, `.` 하나를 의미합니다. 또는 `/`, `.`이 오고 마지막 두자리가 옵니다.

두번째 부분은 `((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)((r)?uary|(tem|o|em)?ber|ch|il|e|y|)?)`, 으로 시작합니다. 이것은 축약, 전체 달 이름을 일치시킵니다

다음은 `\\s*\\d{1,2}(st|nd|rd|th)?`, 이것은 0개 이상의 공백을 매칭시키고, 1,2 자리 이후 선택적인 서수가 옵니다. 예를들어 1, 1st 둘다 일치 시킵니다.

마지막으로 `[,]\\s*\\d{4}`는 년도를 위한 4개의 숫자 이후에 0개 이상의 공백 이후의 쉼표를 매칭시킵니다. 

이것은 상당히 겁나는 정규 표현식입니다. 하지만, 정규표현식이 얼마나 간결하고 많은 정보를 담고 있는지 확인할수 있습니다. - 겉보기에 숨겨진 문자열에 강력함!

다음은 `regularExpressionForTimes`, `regularExpressionForSplitters`을 위한 패턴입니다. 빈 패턴을 다음과 같이 채웁니다. 

```
// Times
\\d{1,2}\\s*(pm|am)

// Splitters
~{10,}
```

연습으로 위의 사양을 기반으로 정규 표현 패턴을 설명할수 있는지 확인하세요.

마지막으로 `SearchViewController.swift`를 열고 `SearchViewController`의 각 장식 매소드 구현을 다음과 같이 작성합니다. 

```swift
func decorateAllDatesWith(_ decoration: Decoration) {
  if let regex = NSRegularExpression.regularExpressionForDates {
    let matches = matchesForRegularExpression(regex, inTextView: textView)
    switch decoration {
    case .underlining:
      highlightMatches(matches)
    case .noDecoration:
      removeHighlightedMatches(matches)
    }
  }
}

func decorateAllTimesWith(_ decoration: Decoration) {
  if let regex = NSRegularExpression.regularExpressionForTimes {
    let matches = matchesForRegularExpression(regex, inTextView: textView)
    switch decoration {
    case .underlining:
      highlightMatches(matches)
    case .noDecoration:
      removeHighlightedMatches(matches)
    }
  }
}

func decorateAllSplittersWith(_ decoration: Decoration) {
  if let regex = NSRegularExpression.regularExpressionForSplitter {
    let matches = matchesForRegularExpression(regex, inTextView: textView)
    switch decoration  {
    case .underlining:
      highlightMatches(matches)
    case .noDecoration:
      removeHighlightedMatches(matches)
    }
  }
}
```

이 메소드는 각각 `NSRegularExpression`의 정적 변수 중 하나를 사용하여 적절한 정규 표현식을 만듭니다. 이 메소드들은 일치 항목을 찾고 `highlightMatches(_:)`을 호출하여 텍스트의 각 문자열에 밑줄을 긋거나 배경색을 입히거나 `removeHighlightedMatches(_:)`는 스타일이 변경되기 이전으로 되돌아 갑니다. 어떻게 동작하는지 궁금하다면 구현을 확인하세요

앱을 빌드하고 실행합니다. 이제 읽기 모드 아이콘을 탭하세요. 날짜, 시간, 구분자에 대한 링크 스타일 강조 표시를 볼수 있습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2018/06/ReadingMode.png" width="500" height="700"></center> <br>

읽기모드 버튼을 다시 누르면 읽기모드가 비활성화되고 텍스트트 일반 텍스트로 돌아갑니다. 

이 예제에서는 문제가 없지만 시간에 대한 정규식이 더 일반적인 검색에 적합하지 않은 이유는 무엇일까요? 3:15pm이 매칭되지 않을것이고 28pm과 매칭될것입니다. 

도전적인 문제가 있습니다. 더 일반적인 시간 형식과 일치하도록 시간에 대한 정규 표현식을 다시 작성하는 방법을 찾아보세요. 

구체적으로 정답은 표준 12시간 시간의 경우 ab:cd, am/pm 형식의 시간과 일치해야 합니다. 11:45 am, 10:33pm, 04:12am는 일치해야하고 2pm, 0:00am, 18:44am, 9:63pm, 7:4 am은 일치하지 않아야 합니다. am/pm 이전에 한칸 띄어야 합니다. 그런데, 14:33 am에서 4:33am이 일치하면 받아 용인될수 있습니다. 

정답은 아래에 있지만 먼저 시도해보시기 바랍니다. 

```
"(1[0-2]|0?[1-9]):([0-5][0-9]\\s?(am|pm))"
```

---

<div id='section-id-433'/>

## Where to Go From Here?


축하합니다. 정규식을 사용한 경험을 가지게 되었습니다.

이 튜토리얼의 맨위, 맨 아래에있는 Download Materials(원글 페이지에 있습니다) 버튼을 통해 완성된 프로젝트 버전을 다운로드 할수 있습니다.

정규 표현식은 강력하고 재미있고, 수학 문제를 해결하는 것과 비슷합니다. 정규 표현식의 유연성은 공백에 대한 입력 문자열 필터링, 구문 분석전에 HTML, XML 태그 제거, 특정 XML, HTML 태그 찾기와 같은 필요에 맞게 패턴을 만드는 다양한 방법을 제공합니다. 

---

<div id='section-id-444'/>

## One More Exercise…

정규식으로 유효성을 검사할수있는 실제 문자열 예제가 많이 있습니다. 마지막 연습으로 [이메일 주소의 유효성을 검사](https://www.regular-expressions.info/email.html)하는 다음 정규 표현식을 풀어보세요.

```
[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
```

언뜻 보면 문자의 뒤죽박죽처럼 보입니다. 그러나 새로 알게된 지식(아래의 유용한 링크)을 사용하면 이를 이해하고 정규 표현식의 마스터가 될수 있습니다.

---

<div id='section-id-456'/>

## More Resources

다음은 정규식에 대한 유용한 리소스 목록 입니다.

- [<U>www.regular-expressions.info</U>](www.regular-expressions.info)는 Jan Goyvaerts의 유익한 사이트 입니다. 그는 정규 표현식에 대한 종합적인 책을 출판 했습니다
- [<U>NSRegularExpression Class Reference</U>](https://developer.apple.com/library/archive/#documentation/Foundation/Reference/NSRegularExpression_Class/Reference/Reference.html)는 API를 사용할때 항상 가장 좋은 참조 입니다
- [<U>regexpal.com</U>](https://www.regexpal.com/)는 정규식 패턴을 빠르게 테스트하기 위해 매우 유용한 리소스 입니다.
