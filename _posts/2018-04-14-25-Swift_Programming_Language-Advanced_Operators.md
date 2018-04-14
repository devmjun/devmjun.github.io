---
layout:     post
title:      "Swift. 정리하기 25"
subtitle:   "Swift Language Guide-Advanced Operators"
date:       2018-04-14 15:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Reference 

까칠코더님 글을 그대로 가져왔습니다. 자료의 원 주소는 아래에 있습니다! 

[Advanced Operators](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID28)<br>
[까칠코더님 블로그](http://kka7.tistory.com/30?category=919617)

---

## Advanced Operators

[기본 연산자(Basic Operators)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-ID60)에서 설명된 연산자이외에, Swift는 좀 더 복잡한 값을 다루기 위해 몇가지 고급(advanced) 연산자를 제공합니다. C 와 Objective-C에서 잘 알려진 비트(bitwise)를 다루고 비트를 이동하는 연산자 모두를 포함합니다.

C의 산술(arithmetic) 연산자와 다르게, Swift의 산술 연산자는 기본으로 오버플로우(overflow : 데이터가 넘치다)하지 않으며, 오버플로우 추가 연산자(`&+`)처럼, 기본적으로 오버플로우(overflow)되는 Swift의 두번째 산술연산자 `set`을 사용합니다. 이러한 오버플로우 연산자의 시작은 `&`로 시작합니다.

구조체, 클래스, 열거형을 정의할때, 사용자정의 타입에 대해 표준 Swift 연산자의 구현을 제공하는 것이 유용할 수 있습니다. Swift는 이러한 연산자들의 맞춤형 구현을 제공하고 생성한 각 타입이 무엇을 해야 할지 정확하게 결정하는 것을 쉽게 합니다.

미리 정의된 연산자에만 국한되지는 않습니다. Swift는 사용자정의 우선순위와 연관된 값과 함께 사용자정의 중위(infix), 전위(prefix), 후위(postfix), 할당 연산자를 정의하는 자유를 줍니다. 이러한 연산자들은 이전에 정의된 연산자들처럼, 코드에서 사용하고 적용할 수 있고, 사용자정의 연산자를 지원하기 위해 기존 타입을 확장할 수 있습니다.

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

<center><img src="/img/posts/Swift_Programming_Language-31.png" width="700" height="700"></center> <br> 

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


