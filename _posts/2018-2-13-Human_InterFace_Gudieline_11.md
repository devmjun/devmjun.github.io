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






