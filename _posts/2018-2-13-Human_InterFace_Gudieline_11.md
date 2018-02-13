---
layout:     post
title:      "iOS 휴먼 인터페이스 가이드라인 요약 (11)"
subtitle:   ""
date:       2018-02-13 18:00:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

개인적인 공부의 목적으로 작성 되었습니다. 오역이나 잘못된 부분이 있을수 있으니, 댓글 남겨 주시면 감사하겠습니다!

---

## Technologies

- Apple Pay
- Augmented Reality 
- GameKit
- HealthKit
- HomeKit
- iCloud
- In-App Purchase
- Live Photos
- ResearchKit
- Social Media
- Wallet
- Resources
	- [https://developer.apple.com/design/resources/#ios-apps](https://developer.apple.com/design/resources/#ios-apps)

---

## Apple Pay 

Apple Pay는 iOS 및 watchOS 앱 내에서 실제 상품 및 서비스, 기부금을 안전하게 지불 할 수있는 간편한 방법입니다. 사용자는 장치에 안전하게 저장된 자격 증명을 사용하여 지불을 승인하고 연락처 정보를 제공합니다.

<center><img src="/img/posts/applePay.png" width="382" height="700"></center> <br> 

Apple Pay를 수락하는 앱은 사용 가능한 지불 옵션이있는곳 어디에서나 Apple Pay  mark를 표시하고 사용자가 지불 시트를 가져 오기 위해 두드리는 Apple 지불 버튼을 표시합니다. 결제하는 동안 결제 시트에는 Apple Pay에 연결된 신용 카드 또는 직불 카드, 구매 금액 (세금 및 수수료 포함), 배송 옵션 및 연락처 정보가 표시됩니다. 사용자는 필요한 조정을한 다음 지불을 승인하고 구매를 완료합니다.

개발자 가이드는 [Apple Pay Programming Guide](https://developer.apple.com/library/content/ApplePay_Guide/index.html) 및 [PassKit > Apple Pay](https://developer.apple.com/documentation/passkit/apple_pay)를 참조하십시오 .

웹 사이트는 Apple Pay를받을 수도 있습니다. 웹 사이트 별 설계 지침 은 [Apple Pay on the Web Human Interface guidelines](https://developer.apple.com/apple-pay/web-human-interface-guidelines/) 참조하십시오 .

> 팁
> 애플 페이와 인앱 구매의 차이점을 이해하는 것이 중요합니다. 식료품, 의류, 가전 제품과 같은 `실제 제품을 판매하려면 Apple Pay를 사용하십시오.` 클럽 회원권, 호텔 예약 및 행사 티켓과 같은 서비스; 기부금. 앱내 프리미엄 콘텐츠 및 디지털 콘텐츠 구독과 같은 `가상 상품을 판매하려면 In-App Purchase를 사용하십시오`. [In-App Purchase](https://developer.apple.com/ios/human-interface-guidelines/technologies/in-app-purchase/) 참조해주세요.

#### - Button 

이 시스템은 Apple Pay를 수락하는 응용 프로그램에서 사용할 수있는 몇 가지 단추 스타일을 구현합니다. 개발자 가이드는 [PKPaymentButtonStyle](https://developer.apple.com/documentation/passkit/pkpaymentbuttonstyle)을 참조하십시오.

#### - Apple 지불 또는 Apple 지불 버튼으로 구입

사용자가 결제를 시작할 때마다 제품 세부 정보 페이지 또는 장바구니 페이지와 같은 앱에서 다음 버튼 중 하나를 사용합니다. Apple Pay가 설정되어있는 경우이 버튼을 누르면 사용자가 결제 프로세스를 완료 할 수있는 지불 시트가 표시됩니다. Apple Pay가 설정되지 않았다면 이 버튼을 탭하여 카드 추가 프로세스를 시작해야합니다. 명확성을 위해이 시나리오에서 Apple Pay 설정 버튼을 표시하는 것이 가장 좋습니다.

<center><img src="/img/posts/applePay-1.png" width="382" height="700"></center> <br> 

#### - Apple Pay Button 설정 

기기가 Apple Pay를 지원하지만 Apple Pay가 아직 설정되지 않은 경우 체크 아웃 페이지 버튼을 표시하는 것을 고려하십시오. 버튼을 누르면 카드를 추가하는 과정이 시작됩니다. 사용자가 카드를 추가하면 결제 프로세스로 돌아가 거래를 완료합니다. Apple Pay가 설정되지 않은 상태에서 다른 Apple Pay 버튼이 똑같은 동작을 보이더라도 Set Up Apple Pay 버튼이 가장 명확합니다. 이 버튼은 사용자 프로필 화면과 같이 체크아웃하지 않은 페이지에도 표시 될 수 있습니다.

<center><img src="/img/posts/applePay-2.png" width="382" height="700"></center> <br> 

#### - Apple Pay Button 으로 기부하세요

[승인 된 비영리 단체](https://developer.apple.com/support/apple-pay-nonprofits/)는 이 버튼을 사용하여 기부를 용이하게 할 수 있습니다. Apple 지불 기부 버튼을 지원하지 않는 구형 시스템을 실행하는 디바이스에서는 대신 Apple 지불 버튼을 표시하십시오.

<center><img src="/img/posts/applePay-3.png" width="382" height="700"></center> <br> 

#### - Apple Pay Button으로 지불하세요

은행 및 신용 카드 발급 기관은이 버튼을 사용하여 실제 매장에서 구매할 때 월렛 앱에서 카드를 신속하게 가져올 수 있습니다.

<center><img src="/img/posts/applePay-4.png" width="382" height="700"></center> <br> 

#### - 스타일

Apple Pay Button을 표시하기위한 몇 가지 옵션이 있습니다.

#### - Black

충분한 대비를 제공하는 흰색 또는 밝은 색의 배경에 사용하십시오. 검정 또는 어두운 배경에는 사용하지 마십시오.

<center><img src="/img/posts/applePay-5.png" width="382" height="700"></center> <br> 

#### - 흰색의 윤곽선 규칙 

충분한 대비를 제공하지 않는 흰색 또는 밝은 색의 배경에 사용하십시오. 어둡거나 포화 된 배경에 놓지 마십시오.

<center><img src="/img/posts/applePay-6.png" width="382" height="700"></center> <br> 

#### - White

충분한 대비를 제공하는 어둡거나 밝은 배경에 사용하십시오.

<center><img src="/img/posts/applePay-7.png" width="382" height="700"></center> <br> 

### 크기 및 위치

#### - 최소 너비를 유지하십시오

모든 Apple Pay Button의 최소 너비는 32pt (32px @1x, 64px @2x)입니다.

<center><img src="/img/posts/applePay-8.png" width="382" height="700"></center> <br> 

#### - 최소한의 공간 확보

Apple Pay Button 주위에 필요한 최소 공간은 버튼의 높이의 1/10입니다. 그래픽 및 텍스트와 같은 다른 콘텐츠는 이 공간을 침해해서는 안됩니다.

<center><img src="/img/posts/applePay-9.png" width="382" height="700"></center> <br> 

#### - Apple Pay Button을 눈에 잘 띄게 표시하십시오

Apple Pay Button은 다른 결제 버튼과 동일한 크기 또는 더 크게 만듭니다. 이상적으로는 Apple Pay Button을 보려면 스크롤하지 않아도됩니다.

#### - 장바구니에 추가 버튼과 관련하여 Apple Pay Button을 계속 배치하십시오

Apple Pay 버튼을 장바구니에 추가 버튼의 오른쪽 또는 위에 놓습니다.

#### - Apple Pay Mark

Apple Paymark 그래픽을 사용하여 비슷한 방법으로 다른 지불 옵션을 표시 할 때 Apple Pay가 사용 가능한 지불 옵션임을 알리십시오. Apple Paymark 그래픽 및 사용 지침을 [여기](http://images.apple.com/apple-pay/downloads/Apple_Pay_Payment_Mark.zip)에서 다운로드 하십시오.

<center><img src="/img/posts/applePay-10.png" width="382" height="700"></center> <br> 

#### - 텍스트로 Apple Pay 참조하기

일반 텍스트를 사용하여 Apple Pay를 홍보하고 Apple Pay가 지불 옵션임을 나타낼 수 있습니다.

#### - Apple 상표를 Apple 상표 목록에있는 그대로 텍스트로 대문자로 표시하십시오

다른 모든 문자 는 대문자 A, 대문자 P 및 소문자 두 단어를 사용하십시오. 모든 텍스트를 대문자로 사용하는 응용 프로그램에서와 같이 기존의 인쇄체 인터페이스 스타일을 준수하는 데 필요한 경우에만 Apple Pay를 전체적으로 대문자로 표시하십시오. [Apple 상표 목록](https://www.apple.com/legal/intellectual-property/trademark/appletmlist.html)을 참조하십시오 .

#### - 절대로 텍스트에서 `Apple` 을 표현하기 위해 애플 로고를 사용하지마세요

미국에서는 Apple Pay가 본문에 처음 나타날 때 등록 된 상표 기호 (®)를 사용하십시오. Apple Pay가 체크 아웃 중에 선택 옵션으로 나타나면 등록 상표 기호를 포함하지 마십시오.

<center><img src="/img/posts/applePay-11.png" width="382" height="700"></center> <br> 

#### - font-face와 크기를 앱으로 조정하십시오

Apple 인쇄술을 모방하지 마십시오. 대신 나머지 앱과 일관된 텍스트 속성을 사용하십시오.

#### - Apple Pay는 번역하지 마십시오

영어가 아닌 텍스트에 나타날 때에도 Apple 상표는 항상 영어로 사용하십시오.

#### - 앱의 Apple Pay 사용을 홍보 할 때는 App Store 가이드 라인을 따르십시오

앱에 대한 Apple Pay를 홍보하기 전에 [App Store Marketing Guidelines](https://developer.apple.com/app-store/marketing/guidelines/)  참조하십시오.

### 지불 옵션으로 Apple Pay 나타내세요

Apple Pay를 지원하는 모든 장치에서 Apple Pay를 제공하십시오. 모든 가능한 장치에 Apple 유료 버튼을 표시하십시오. 장치가 Apple Pay를 지원하지 않는 경우 Apple 지불을 지불 옵션으로 제시하지 마십시오.

#### - Apple 제공 API 만 사용하여 Apple 지불 버튼을 표시하십시오

버튼 그래픽과 달리 API에서 생성 된 버튼은 항상 정확한 모양을 가지며 자동으로 현지화됩니다. 맞춤 결제 버튼을 만들지 마세요.

#### - Apple 지불 버튼을 비활성화하거나 숨기지 마십시오

제품 크기나 색상을 선택하지 않은 경우와 같이 Apple 유료 버튼을 아직 사용할 수 없는 경우 버튼을 가볍게 두드리면 문제를 적절하게 지적하십시오.

#### - Apple Pay가 사용된다는 사실을 알리기 위해서만 Apple Pay 마크를 사용하십시오

이 표시는 지불을 용이하게하지 않습니다. 결제 버튼으로 사용하거나 단추로 배치하지 마십시오.

개발자 가이드는 [Apple Pay Programming Guide](https://developer.apple.com/library/content/ApplePay_Guide/index.html) 및 [PassKit> Apple Pay](https://developer.apple.com/documentation/passkit/apple_pay)를 참조하십시오.

### 체크 아웃 프로세스 간소화

사람들은 Apple Pay를 사용하여 쉽고 빠르게 구매할 수 있습니다. 신속하게 지불을 승인하고 거래를 완료 할 수있는 지불 시트를 제공하십시오.

#### - 가능한 경우 Apple Pay를 기본 지불 옵션으로 설정하십시오

Apple Pay가 활성화되어 있다면, 그 사람이 그 것을 사용하기를 원한다고 가정하십시오. Apple 지불 버튼을 첫 번째 또는 유일한 지불 옵션으로 제시하거나, 다른 옵션보다 크게 표시하거나, 라인을 사용하여 시각적으로 다른 옵션과 구분하십시오.

#### - 제품 세부 정보 페이지의 Apple 유료 버튼으로 단일 품목 구매를 가속화하십시오

장바구니를 제공하는 것 외 에도 사용자가 개별 항목을 신속하게 구입할 수 있도록 Apple 지불 버튼을 제품 세부 정보 페이지에 두는 것을 고려하십시오. 이 방법으로 시작된 구매는 개별 항목에 대한 것이어야하며 사용자의 장바구니에 이미있는 항목은 제외해야합니다. 사용자의 장바구니에 제품 세부 정보 페이지에서 직접 구입 한 항목이있는 경우, 구매가 완료된 후 장바구니에서 항목을 제거하십시오.

#### - 빠른 체크 아웃으로 다중 품목 구매를 가속화하십시오

지불 시트를 즉시 표시하는 빠른 체크 아웃 기능을 제공하여 사용자가 단일 배송 속도 및 목적지를 사용하여 여러 품목을 신속하게 구입할 수 있도록하십시오.

#### - 원활한 결제 프로세스를 보장합니다

사람들이 Apple Pay Button에 도달하기 전에 색상 및 크기 옵션과 같은 필요한 정보를 수집하십시오. 사용자가 옵션을 선택하는 것을 잊었기 때문에 체크 아웃 시간에 추가 정보가 필요하면 정상적으로 문제를 지적하고 사용자가 이 를 수정하도록하십시오. 강조 표시 또는 경고 텍스트를 사용하여 누락 된 정보를 식별하고 사용자가 신속하게 문제를 해결하고 구매를 완료 할 수 있도록 문제가있는 필드로 자동 이동합니다.

#### - 체크 아웃이 시작되기 전에 선택적 정보를 수집하십시오

지불 시트에 데이터를 입력할 방법이 없으므로 미리 프로모션 코드, 사용 코드, 선물 메시지 및 배송 지침과 같은 선택적 정보를 수집하십시오.

#### - 지불 시트를 보여주기 전에 여러 운송 속도 및 목적지 정보를 모으십시오

지불 시트를 사용하면 전체 주문에 대해 단일 운송 속도 및 목적지를 선택할 수 있습니다. 고객이 주문에 따라 개별 항목의 배송 속도와 목적지를 다르게 선택할 수있는 경우 지불 시트 대신 Apple 지불 결제가 시작되기 전에 해당 세부 정보를 수집하십시오.

#### - Apple Pay의 정보를 선호하십시오

Apple Pay 정보가 완전하고 최신이라고 가정합니다. 앱에 기존 연락처, 배송 및 결제 정보가있는 경우에도 결제 중 Apple Pay에서 최신 정보를 가져 와서 잠재적 인 수정 사항을 줄일 수 있습니다.

#### - 주문 확인 또는 감사 페이지를 표시하십시오

결제 후 주문 주문 페이지를 사용하여 구매에 대해 사용자에게 감사하고 주문이 배송 될시기에 대한 세부 정보를 제공하고 상태를 확인하는 방법을 알려줍니다. 확인 페이지에서 애플 페이를 열거 할 필요는 없지만, 열거한다면, 거래를 처리하는 데 사용 된 계정의 마지막 네 자리 뒤에 또는 별도의 노트로 보여줍니다. 예: '1234 (Apple Pay)'또는 'Apple Pay with Paid'.

#### - 구매 전에 계정을 만들지 않아도됩니다

사람들이 계정을 등록하게하려면 주문 확인 페이지에서 계정을 등록하도록 요청하십시오. 결제하는 동안 지불 시트에서 제공 한 정보를 사용하여 최대한 많은 등록 필드를 채우십시오.

#### - 결제 시트 맞춤 설정
거래를 완료하는 데 필요한 정보에 따라 지불 시트의 내용을 사용자 정의 할 수 있습니다.

#### - 필수 정보 만 제시하고 요청하십시오

지불 표에 불필요한 정보가 포함되어 있으면 사람들이 혼란스러워하거나 개인 정보 보호 문제가있을 수 있습니다. 예를 들어 전자 메일로 제공되는 기프트 카드를 구매 한 경우 연락처 이메일 주소는 표시하지만 배송 주소는 표시하지 않는 것이 좋습니다. 이 시나리오에서 배송 주소를 표시하거나 요청하면 실제로 배송 될 것이라는 잘못된 인상을 줄 수 있습니다.

#### - 사람들이 지불 시트에서 배송 방법을 선택하게하십시오

공간이 허용하는 범위 내에서 명확한 설명, 비용 및 선택적으로 각 사용 가능한 옵션에 대한 예상 배달 날짜를 표시하십시오.

#### - 광고 항목을 사용하여 추가 비용, 할인 및 현재 비용등을 설명하십시오

광고 항목에는 라벨 및 비용이 포함됩니다. 품목을 사용하여 구매를 구성하는 품목별 품목 목록을 표시하지 마십시오.

#### - 추가 기부를 별도의 광고 항목으로 나열하십시오

앱을 통해 [승인된 비영리 단체](https://developer.apple.com/support/apple-pay-nonprofits/) 기부금을 구매 항목에 추가 할 수있는 경우 기부금을 개별적으로 기재하면 최대의 명확성을 얻을 수 있습니다. 관련 지침은 아래의 `Accepting Donations` 참조하십시오 .

<center><img src="/img/posts/applePay-12.png" width="382" height="700"></center> <br> 

#### - 광고 항목을 짧게 유지하십시오

광고 항목을 구체적이고 쉽게 이해할 수 있도록합니다. 가능한 경우 광고 항목을 한 줄에 맞추십시오.

#### - 전체 행에 PAY 라는 단어 다음에 상호명을 입력하십시오

은행이나 신용 카드 명세서에서 청구 할 때 사람들이 볼 것과 동일한 업체명을 사용하십시오. 이는 지불이 적절한 장소로 가고 있음을 확신 시켜줍니다. 앱이 중개 역할을하고 지불을위한 최종 상인이 아닌 경우 PAY [END_MERCHANT_NAME] (VIA [YOUR_APP_NAME]) 형식으로 명확하게 표시합니다.

#### - 지불 승인 후 추가 비용이 발생할 수 있는 경우를 명확하게 공개하십시오

일부 앱에서는 결제시 총 비용을 알 수 없습니다. 예를 들어 거리 나 시간을 기준으로 자동차를 타는 가격은 결제 후 변경 될 수 있습니다. 또는 고객이 제품을 배송 한 후에 팁을 추가하려고 할 수 있습니다. 이와 같은 상황에서는 지불 시트에 명확한 설명과 "AMOUNT PENDING(지불 보류)"라고 표시된 부분을 입력하십시오. 특정 금액을 사전 승인하는 경우 지불 시트에이 정보가 정확하게 반영되어 있는지 확인하십시오.

<center><img src="/img/posts/applePay-13.png" width="382" height="700"></center> <br> 

#### - 데이터 입력 및 지불 오류를 정상적으로 처리하십시오

결제 중에 오류가 발생하면 사람들이 거래를 완료 할 수 있도록 신속하게 해결할 수 있도록 도와줍니다. 아래의 `Error Handling`을 참조하십시오.

#### - 매장 내 픽업

해당되는 경우, 사람들이 실제 상점에서 상품을 구입하도록 허용 할 수 있습니다.

#### - 지불 시트를 표시하기 전에 픽업 세부 사항을 수집하십시오

사람들이 지불 용지에서 픽업 위치, 날짜 또는 시간을 선택할 수 있는 방법이 없으므로 Apple 지불 버튼을 표시하기 전에 이 정보를 수집하십시오.

#### - 지불 용지의 배송 지역에 매장 내 픽업 정보를 표시합니다

SHIPPING 레이블을 PICKUP으로 변경하고 상점 이름, 주소 및 전화 번호를 표시하십시오. 주문 확인 또는 감사 페이지에서도 이 정보를 제공하십시오.

#### - 보조 구독

귀하의 앱은 Apple Pay를 사용하여 반복적인 수수료에 대한 승인을 요청할 수 있습니다. 월별 영화 티켓 구독과 같은 고정 금액 또는 주간 생산 주문과 같은 가변 금액 일 수 있습니다. 초기 승인에는 할인 및 추가 비용이 포함될 수도 있습니다.

| Fixed subscription | Variable Subscription | 
| :--: | :--: |
|![screen](/img/posts/applePay-14.png) | ![screen](/img/posts/applePay-15.png)| <br>


#### - 지불 시트를 보여주기 전에 구독 세부 사항을 명확히하십시오

반복 지불을 승인하도록 사용자에게 요청하기 전에 청구주기 및 기타 서비스 조건을 완전히 이해했는지 확인하십시오.

#### - 청구 빈도, 할인 및 추가 선불 비용을 반복하는 광고 항목을 포함하십시오

이 광고 항목을 사용하여 사용자에게 승인 내용을 상기시킵니다.

#### - 전체 라인에서 현재 지불 금액을 명확히하십시오

승인시 사용자에게 요금 청구 내용을 알리십시오.

#### - 가입 변경시 추가 요금이 발생하는 경우에만 지불 용지를 보여주십시오

사용자가 구독을 변경하면 비용이 감소하거나 동일하게 유지되면 승인이 필요하지 않습니다.

#### - 기부금 수령
승인 된 비영리 단체 는 Apple Pay를 사용하여 기부금을 수령 할 수 있습니다.

#### - 광고 항목을 사용하여 기부를 나타냅니다

사용자가 기부를 승인하고 있음을 알리는 항목을 지불 용지에 표시합니다 (예 : DONATION `$`50.00 ).

#### - 사전 정의 된 기부 금액을 제공하여 체크 아웃을 간소화하십시오

`$` 25, `$` 50, `$` 100과 같이 권장되는 기부금을 한 번 제공하면 기부금 절차의 단계를 줄일 수 있습니다. 기타 금액 옵션도 포함해야 사용자가 원하는 경우 기부를 사용자 정의 할 수 있습니다.

#### - 오류 처리

체크 아웃 중에 문제가 발생했을 때 접근하기 쉽고 실행 가능한 지침을 제공하므로 사용자는 문제를 신속하게 해결하고 거래를 완료 할 수 있습니다.

#### - 데이터 유효성 검사

결제 시트가 나타나고 사용자가 결제 시트의 특정 필드 값을 변경한 경우 및 사용자가 거래를 인증 한 후에 앱이 사용자 입력에 응답 할 수 있습니다. 이러한 기회를 사용하여 데이터 입력 문제를 확인하고 명확하고 일관된 메시징을 제공하십시오.

| Payment sheet error messaging | Custom detail view error messaging | 
| :--: | :--: |
|![screen](/img/posts/applePay-16.png) | ![screen](/img/posts/applePay-17.png)| <br>

데이터가 유효하지 않은 경우 빨간색 시스템 제공 오류 메시지는 지불 시트의 관련 필드에 주의를 환기시킵니다. 사용자는 필드를 눌러 추가 세부 정보를보고 문제를 해결할 수 있습니다. 사용자가 문제가있는 필드를 누를때 나타나는 상세보기에 대한 사용자 정의 오류 메시지를 제공합니다.

개발자 가이드는 [PKPaymentAuthorizationViewControllerDelegate](https://developer.apple.com/documentation/passkit/pkpaymentauthorizationviewcontrollerdelegate)를 참조하십시오 .

> 참고
> 개인 정보 보호를 위해 사용자가 트랜잭션을 승인하려고 시도 할 때까지 앱에 데이터 액세스가 제한됩니다. 승인 전에는 카드 유형과 수정된 배송 주소만 액세스 할 수 있습니다. 인증이 실패 할 때 사용자에게 오류를 보고하는 것이 중요합니다. 그러나 가능한 한 앱은 승인 전에 사용 가능한 정보의 유효성을 검사하고 문제를 보고하려고 시도해야합니다.

#### - 비즈니스 논리 준수를 강요하지 마십시오

무의미한 데이터를 무시하고 가능하면 누락된 데이터를 추론 할만큼 지능적인 데이터 유효성 검사 프로세스를 설계하십시오. 예를 들어 앱에 5 자리 우편 번호가 필요하지만 사용자가 우편 번호 +4 코드를 입력하면 수정을 요청하는 대신 추가 숫자를 무시합니다. 여러 형식으로 상태 이름을 수락하십시오 (사용자가 오류를 생성하지 않고 캘리포니아 또는 CA 에 입력 할 수 있어야 함). 전화 번호를 여러 형식으로 처리합니다 (대시가 있거나 없음, 국가 코드 사용 여부는 불문).

#### - 시스템에 정확한 상태보고 제공

문제가 발생하면 앱에서 문제의 유형을 정확하게 나타내야 시스템이 결제 시트에 적절한 오류 메시지를 표시 할 수 있습니다. 이는 사용자 정의 오류 메시지에 적절한 상태 코드를 제공하여 수행됩니다. 개발자 지침은 [PKPaymentError](https://developer.apple.com/documentation/passkit/pkpaymenterror)를 참조하십시오 .

#### - 데이터가 유효하지 않거나 잘못 포맷 된 경우 간결하고 구체적으로 문제를 설명합니다

해당 필드를 참조하고 예상되는 것을 정확하게 표시하십시오. 예를 들어 사용자가 잘못된 우편 번호를 입력한 경우 '주소가 잘못되었습니다.'대신 '우편 번호가 도시와 일치하지 않습니다.'와 같은 특정 메시지를 표시하십시오. 운송 주소를 사용할 수 없는 경우 "운송이 이 주에서 가능하지 않습니다"라는 이유를 표시하십시오. 문장 스타일의 대문자 및 종료 문장 부호가없는 명사구를 사용하십시오. 잘라내기를 피하기 위해 메시지 길이를 줄이십시오 - 128 자 이하로 노력하십시오.

#### - 필수 필드가 비어있을 때 사용자에게 알려줍니다

"우편 번호가 필요합니다"와 같이 짧은 설명이 포함 된 공란으로 필요한 필드에 주의를 환기시킵니다.

---




















































