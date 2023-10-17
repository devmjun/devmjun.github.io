---
layout: post
title: "iOS, Preventing Man-in-the-Middle Attacks in iOS with SSL Pinning"
subtitle: "Preventing Man-in-the-Middle Attacks in iOS with SSL Pinning"
date: 2019-11-22 18:45:00
author: "MinJun Ju"
comments: true 
tags: [Swift, Charles]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/Github-bg.jpg
thumbnail-img: /assets/post_img/background/Github-bg.jpg
share-img: /assets/post_img/background/Github-bg.jpg
--- 

## Table of contents 

  - [<U>Getting Started</U>](#section-id-28)
  - [<U>Understanding TLS</U>](#section-id-44)
  - [<U>The Three Phases of TLS Connections</U>](#section-id-54)
  - [<U>About Digital Certificates</U>](#section-id-82)
  - [<U>The Structure of a Digital Certificates</U>](#section-id-90)
  - [<U>Validating Digital Certificates</U>](#section-id-113)
  - [<U>SSL Certificate Pinning Under the Hood</U>](#section-id-126)
  - [<U>Why Do You Need SSL Certificate Pinning?</U>](#section-id-134)
  - [<U>Types of SSL Certificate Pinning</U>](#section-id-142)
- [<U>Pinning in Alamofire 5</U>](#section-id-155)
  - [<U>Storing The Certificate</U>](#section-id-161)
  - [<U>Implementing Certificate Pinning</U>](#section-id-247)
  - [<U>Testing Certificate Pinning With Charles</U>](#section-id-348)
  - [<U>Certificate Pinning in Action</U>](#section-id-354)
  - [<U>Where to Go From Here?</U>](#section-id-366)
  - [<U>References</U>](#section-id-64)
  
---

[Preventing Man-in-the-Middle Attacks in iOS with SSL Pinning](https://www.raywenderlich.com/1484288-preventing-man-in-the-middle-attacks-in-ios-with-ssl-pinning) 에서 필요한 부분을 의역했습니다.

이 튜토리얼 에서 SSL Pinning과 Alamofire를 사용해서 어떻게 man-in-the-middle attacks를 방지 하는지 배웁니다. man-in-the-middle attack를 모의 실험 하기 위해 Charles Proxy tool을 사용합니다.

---

대부분의 iOS 앱은 서버와 소통하며 필요한 정보를 가져 옵니다. 앱들이 정보를 교환할때 이들은 대부분은 안전하게 소통하기 위해 [Transport Layer Security(TLS)](https://en.wikipedia.org/wiki/Transport_Layer_Security) 프로토콜을 사용합니다.

대부분의 앱은 서버와 연결을 맺을때  어떤 인증서를 신뢰해야 하는지, 신뢰하지 말아야 하는지를 결정하지 않습니다. 그래서 아마 대부분의 앱들은 iOS에 포함된 인증서에 온전히 의지 합니다. 

TLS가 전송된 데이터를 도청 및 변조를 보호 할지라도, 공격자는 해킹 또는 자체 서명된 인증서를 사용하여 man-in-the-middle 공격을 설정할수 있습니다. 이러한 인증서를 통해서, 앱에 들어오는 데이터들을 캡쳐 할수 있습니다. 

이 튜토리얼 에서는, **SSL Certificate Pinning** 과 [Alamofire 5](https://github.com/Alamofire/Alamofire) 를 사용하여 man-in-the-middle 공격을 방지 하는 방법을 배우게 됩니다. man-in-the-middle 환경을 만들기 위해 Charles Proxy tool을 사용할것 입니다.

> Note: SSL(Secure Sockets Layer)는 TLS의 조상입니다. TLS는 SSL 3.0 버전에도 영향을 미친 [IETF](https://www.ietf.org/) 에서 식별한 다양한 보안 취약점을 다룹니다. 이 튜토리얼에서 SSL 과 TLS를 동의어(synonyms)로 읽어야 하지만 구현은 항상 TLS 사용 합니다. 

<div id='section-id-28'/>

## Getting Started 

이 튜토리얼에서 Stack Overflow의 유저를 가져오는 **Stack Exchange REST API** 를 사용하는 **PinMyCert** 을 사용합니다 

시작 프로젝트를 다운받고 PinMyCert.xcodeproj 파일을 엽니다. 

이 아티클의 주제에 집중하기 위해 SSL Certificate Pinning 과 관련이 없는 귀찮은 작업들은 모두 구현된 상태입니다. 

Main.storyboard 를 열면 TableView를 가진 **ViewController** 와 tableView의 Cell 선택했을때 보여지는 **DetailViewController**를 볼수 있습니다. 

`ViewController`는 `NetworkClient`를 사용합니다. NetworkClient를 network request를 수행하는 Alamofire의 렙핑 입니다. `NetworkClient` 에서 SSL Certificate Pinning을 다루는 로직을 구현할것입니다. 

앱을 빌드하고 실행 하면 다음과같은 초기화면은 볼수 있습니다.

<center><img src="https://koenig-media.raywenderlich.com/uploads/2019/03/ssl-pinning-first-screen.png" width="450"></center> <br>

<div id='section-id-44'/>

## Understanding TLS

SSL Certificate Pinning을 이해하기 위해서 TLS의 본질과 암호의 기초를 이해 해야 합니다. 

TLS의 메인 목표는 2개의 노드 사이의 무결한 메시지 교환과 사생활의 자유 추가 입니다. 다른 말로는 TLS는 해당 데이터를 신뢰할수 없는 제 3자에게 노출하지 않고 네트워크를 통해 데이터를 전송할수 있게 해준다를 의미합니다. 

클라이언트와 서버가 TLS 연결을 필요로 할때, 다음의 특정 명령에 따른 3가지 양상을 따르며 연결을 구축합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2019/03/ssl-pinning-tls-handshake-1.png)

<div id='section-id-54'/>

## The Three Phases of TLS Connections

첫번째 단계에서는 클라이언트는 서버와 함께 연결을 초기화 합니다. 

그런 다음 클라이언트는 서버에게 메시지를 보내고 이 메시지는 cipher suite와 함께 지원할수 있는 TLS 목록을 나열하고 이것은 암호화를 위해 사용됩니다.

> Note: cipher suite는 TLS를 통한 네트워크 연결을 암호화 하기 위해 필요한 알고리즘 세트 입니다. 추가적인 정보는 [cipher suite](https://en.wikipedia.org/wiki/Cipher_suite)를 참조해주세요

서버는 선택된 cipher suite와 함께 응답하고 한개 이상의 `디지털 인증(digital certificates)`을 클라이언트로 돌려보냅니다. 

클라이언트는 이 디지털 인증서를 짧게 요약하여 검증하고 유효하면 인가합니다. 그리고 인가된 서버인지, 민감한 정보에 기웃거리는 사람은 아닌지를 검증합니다. 

확인 되었다면 두번째 인증을 단계를 시작합니다. 클라이언트는 `pre-master secret key` 한개를 생성하고 서버의 공개키(인증서에 공개키가 포함되어 있습니다)와 함께 암호화 합니다.

서버는 암호화된 pre-master secret key를 받고 개인키로 해독합니다. 서버와 클라이언트 각각 `master secret key`를 생성하고 pre-master secret key 기반한 session key를 생성합니다. 

> Note: 두번째 단계에서는 [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) 또는 `asymmetric cryptography`를 사용합니다.  이것은 pairs of keys 를 사용하는 암호화 시스템 입니다 : 공개키는 넓리 흩뿌려져 있고 개인키는 소유자만 알고 있습니다.

master secret key는 클라이언트와 서버가 정보를 교환하는 마지막 단계에서 암호화 와 해독하기 위해 사용됩니다. 

> Note: 세번째 단계에서는 [symmetric-key cryptographt](https://en.wikipedia.org/wiki/Symmetric-key_algorithm)를 사용 합니다(both encryption of plaintext and decryption of ciphertext를 위해 같은 키를 사용합니다)

<div id='section-id-82'/>

## About Digital Certificates 

이전 색션에서 배운것과 같이 서버는 한개 이상의 인증서들을 클라이언트로 보냅니다. 

그럼 인증서란 무엇인가요? 인증서를 소유한 서버에 대한 정보를 암호화한 파일 입니다. 여권 이나 운전면허증 혹은 신분증과 비슷합니다.

[Certificate Authority(CA)](https://en.wikipedia.org/wiki/Certificate_authority)는 인증서를 발부하거나 자체 서명할수 있습니다. 첫번째 경우에 CA는 반드시 인증서 발행 전에 인증서 소유자를 확인하고 앱이 인증서를 사용할때 두번 모두 확인 합니다. 두번째 경우에는 인증된 동일 개체가 인증서에 서명합니다.

<div id='section-id-90'/>

## The Structure of a Digital Certificates 

인증 구조는 [X.509 표준](https://en.wikipedia.org/wiki/X.509)을 사용합니다. 여기에 주력 부분들이 있습니다.

- Subject: 인증 기관이 발급한 인증서의 개체의 이름을 제공합니다(컴퓨터, 사용자, 네트워크 장치등)
- Serial Number: CA가 발행한 각 인증서를 위한 고유한 식별자를 제공합니다
- Issuer: CA가 발행한 인증서를 위한 고유한 이름을 제공합니다
- Valid From: 인증서가 인가되었을때 날짜와 시간을 제공합니다
- Valid To: 인증서가 더이상 유효하지 않게되는 날짜와 시간을 제공합니다
- Public Key: 인증서와 함께 사용되는 키 쌍의 공개키가 포함되어 있습니다. 
- Algorithm Identifier: 인증서를 서명하기 위해 사용된 알고리즘을 나타냅니다
- [<U>Digital Signature</U>](https://www.docusign.com/how-it-works/electronic-signature/digital-signature/digital-signature-faq): 인증서의 신뢰성을 인가하기 위해 사용되는 비트 문자열 입니다. 

공개키와 알고리즘 식별자로 구성된 이것들은 `subject public key info`를 나타냅니다. 

<center><img src="https://koenig-media.raywenderlich.com/uploads/2019/03/ssl-pinning-x.509.png" width="450"></center> <br>

X.509는 인증서들은 다르게 암호화 되어질수 있고 외형에 영향을 미칩니다. 대부분 일반적으로는 다음과 같습니다

- [<U>Privacy Enhanced Mail(PEM)</U>](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail): Base-64 encoding 이고 파일 확장자는 `.pem`
- [<U>Distinguished Encoding Rules(DER)</U>](https://en.wikipedia.org/wiki/X.690#DER_encoding): binary encoding 이고 파일 확장자는 `.cer`,` .der`, `.crt` 입니다. 
- [<U>Public Key Cryptography Standards(PKCS)</U>](https://en.wikipedia.org/wiki/PKCS) 단일 파일에서 공개키와 개인키 교환할때 사용됩니다. 확장자는 `.p7b`, `.p7c`, `.p12`, `.pfx` 등 입니다 

<div id='section-id-113'/>

## Validating Digital Certificates 

CA에서 인증서를 얻을때, 이 인증서는 [신뢰체인](https://en.wikipedia.org/wiki/Chain_of_trust)의 한 부분입니다.

체인의 인증서 수는 CA의 계층 구조에 따라서 다르고 두 계층이 일반적입니다. 발급 CA(issuing CA)는 유저의 인증서를 서명하고 root CA는 발급 CA의 인증서에 서명합니다. root CA는 자체 서명하고 앱은 마지막에 이것을 반드시 신뢰 해야 합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2019/03/ssl-pinning-chain.png)

인증서를 확인하는 동안 앱은 다음의 것들을 확인 합니다

- 인증서가 유효하려면 인증서의 유효 기간이 지나지 않아야 합니다 
- 다음 CA 발행자의 공개키를 찾는것 또는 중간 단계 CA의 공개키를 찾는것으로 전자 서명을 합니다. 이것이 루트 인증서에 도달할때까지 계속합니다.

<div id='section-id-126'/>

## SSL Certificate Pinning Under the Hood 

SSL Certificate Pinning 또는 요약을 위한 pinning은 인증서 또는 공개키와 연관 시키는 과정 입니다. 호스트의 인증서 또는 공개키를 한번 알면 호스트로 이것을 고정할수 있습니다. 

다시 말해서, 미리 정의된 인증서 또는 공개키를 제외한 모든 인증서를 거부하도록 앱을 구성합니다. 앱이 서버에 접속할때마다 서버 인증서를 고정된 인증서 또는 공개 키와 비교합니다. 일치할 경우에만 앱은 서버를 신뢰하고 연결을 설정합니다. 

일반적으로 개발시 서비스의 인증서 또는 공개키를 추가합니다. 다시 말해서 당신의 모바일 앱은 당신의 번들에 디지털 인증서 또는 공개키를 포함해야 합니다. 이것은 공격자가 pin을 방가뜨릴수 없기 때문에 선호되는 방식 입니다. 

<div id='section-id-134'/>

## Why Do You Need SSL Certificate Pinning?

일반적으로 모든 전체 설정을 대리하거나 TLS 새션을 iOS로 신뢰합니다. 앱이 연결시도 할때, 어떤 인증서를 신뢰할지 말아야 할지를 결정하지 못한다는것을 의미합니다. 앱은 전적으로 iOS 신뢰 저장소가 제공하는 인증서만을 의지합니다.

이 방법은 약점이 있습니다. 하지만: 공격자는 자체 서명된 인증서를 생성할수 있고 이것을 iOS 신뢰 저장소에 저장할수 있거나 [<U>root CA certificate를 hack 할수 있습니다.</U>](https://threatpost.com/final-report-diginotar-hack-shows-total-compromise-ca-servers-103112/77170/) 이것은 또한 공격자가 man-in-the-middle attack 를 설정할수 있고 앱을 오가는 데이터들을 캡쳐 할수 있습니다. 

pinning을 통해 신뢰할수 있는 인증서 세트를 제한하면 공격자가 앱의 기능과 서버와 통신하는 방식을 분석 하는걸 방지 할수 있습니다.

<div id='section-id-142'/>

## Types of SSL Certificate Pinning 

pinning 구현을 원한다면, 아래 두가지 옵션중 하나를 결정할수 있습니다. 

- Pin the certificate: 서버의 인증서를 다운받고 이것을 앱에 bundled 할수 있습니다.  런타임에 앱은 서버의 인증서를 당신이 embedded 한 것과 비교합니다. 
- Pin the public key: 인증서의 공개키를 회수할수 있고 이것을 스트링으로서 코드에 포함할수 있습니다. 런타임에 당신의 코드에 하드코딩된것으로 인증서의 공개키를 비교합니다. 

당신의 필요와 서버 구성에 의존하여 두개의 옵션중 선택합니다. 첫번째 옵션을 선택한다면, 서버가 인증서를 변경하거나 작동을 중지할때 앱에 새로운 인증서를 업로드 해야 합니다. 두번째 옵션을 선택한다면 공개키가 변경되지 않기 떄문에 key rotation policy 을 위반 할수도 있습니다. 

>Note: 인증서 또는 공개키를 pinning 하는것 뿐만아니라 subject public key info를 pinning 하는것 또한 가능합니다. 이 글을 작성하는 당시를 기준으로 Alamofire는 이 타입의 pinning을 적용하는게 가능합니다. 이러한 해결책에 대해서 찾아본다는 [<U>TrustKit</U>](https://github.com/datatheorem/TrustKit)을 참조해주세요

이제 pinning이 어떻게 동작하는지 알았으니 Alamofire가 당신을 위해 무엇을 하는지 알아 봅니다.

<div id='section-id-155'/>

## Pinning in Alamofire 5 

Alamofire 5는 certificate 와 pulbic key pinning을 지원합니다. 특히 `PinnedCertificatesTrustEvaluator` 과 `PublicKeysTrustEvaluator` 이라고 불리는 각기 다른 클레스들을 제공합니다. 이들은 위의 케이스들을 다룰수 있게 해줍니다

> Note: 차후 이 튜토리얼은 certificate pinning만 다룹니다. 다른 pinning을 다루길 원한다면 이 튜토리얼을 마치고 pulbic key pinning의 구현을 해볼수 있습니다.

<div id='section-id-161'/>

## Storing The Certificate

Alamofire 5가 작동하는걸 보려면 먼저 `StackExchange.com` 에서 인증서를 다운로드 해야합니다. 

`OpenSSL`을 사용하여 Stack Overflow server에서 인증서를 가져옵니다. 보다 구체적으로는 `s_client` 커맨드를 사용할수 있고 이것은 서버 주소와 포트 443을 지정된것에 의하여 SSL을 통해서 모든 서버로 연결할수 있습니다. 

터미널을 열고 cd 를 입력후 프로젝트를 드레그앤 드랍 합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2019/03/ssl-pinning-animated.gif)

그후 다음 명령어를 입력합니다

```zsh
openssl s_client -connect api.stackexchange.com:443 </dev/null
```

완료되면 인증서 목록들을 포함하는 많은 데이털르 받을 것입니다. 체인의 각 인증서는 `Common Name(CN)`을 가질 것입니다. 

```zsh
Certificate chain
 0 s:/C=US/ST=NY/L=New York/O=Stack Exchange, Inc./CN=*.stackexchange.com
   i:/C=US/O=DigiCert Inc/OU=www.digicert.com/CN=DigiCert SHA2 High Assurance Server CA
 1 s:/C=US/O=DigiCert Inc/OU=www.digicert.com/CN=DigiCert SHA2 High Assurance Server CA
   i:/C=US/O=DigiCert Inc/OU=www.digicert.com/CN=DigiCert High Assurance EV Root CA
```

아래에서 여러분이 관심 있는 실제 증명서를 볼 수 있는데, 이것이 거기에 *.stackexchange.com 의 CN이 있습니다. 

```zsh
Server certificate
-----BEGIN CERTIFICATE-----
MIIHMjCCBhqgAwIBAgIQBmgM1QeOzDnM9C33n9PrfTANBgkqhkiG9w0BAQsFADBw
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMS8wLQYDVQQDEyZEaWdpQ2VydCBTSEEyIEhpZ2ggQXNz
dXJhbmNlIFNlcnZlciBDQTAeFw0xNjA1MjEwMDAwMDBaFw0xOTA4MTQxMjAwMDBa
MGoxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJOWTERMA8GA1UEBxMITmV3IFlvcmsx
HTAbBgNVBAoTFFN0YWNrIEV4Y2hhbmdlLCBJbmMuMRwwGgYDVQQDDBMqLnN0YWNr
ZXhjaGFuZ2UuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr0YD
zscT5i6T2FaRsTGNCiLB8OtPXu8N9iAyuaROh/nS0kRRsN8wUMk1TmgZhPuYM6oF
S377V8W2LqhLBMrPXi7lnhvKt2DFWCyw38RrDbEsM5dzVGErmhux3F0QqcTI92zj
VW61DmE7NSQLiR4yonVpTpdAaO4jSPJxn8d+4p1sIlU2JGSk8LZSWFqaROc7KtXt
lWP4HahNRZtdwvL5dIEGGNWx+7B+XVAfY1ygc/UisldkA+a3D2+3WAtXgFZRZZ/1
CWFjKWJNMAI6ZBAtlbgSNgRYxdcdleIhPLCzkzWysfltfiBmsmgz6VCoFR4KgJo8
Gd3MeTWojBthM10SLwIDAQABo4IDzDCCA8gwHwYDVR0jBBgwFoAUUWj/kK8CB3U8
zNllZGKiErhZcjswHQYDVR0OBBYEFFrBQmPCYhOznZSEqjIeF8tto4Z7MIIB/AYD
VR0RBIIB8zCCAe+CEyouc3RhY2tleGNoYW5nZS5jb22CEXN0YWNrb3ZlcmZsb3cu
Y29tghMqLnN0YWNrb3ZlcmZsb3cuY29tgg1zdGFja2F1dGguY29tggtzc3RhdGlj
Lm5ldIINKi5zc3RhdGljLm5ldIIPc2VydmVyZmF1bHQuY29tghEqLnNlcnZlcmZh
dWx0LmNvbYINc3VwZXJ1c2VyLmNvbYIPKi5zdXBlcnVzZXIuY29tgg1zdGFja2Fw
cHMuY29tghRvcGVuaWQuc3RhY2thdXRoLmNvbYIRc3RhY2tleGNoYW5nZS5jb22C
GCoubWV0YS5zdGFja2V4Y2hhbmdlLmNvbYIWbWV0YS5zdGFja2V4Y2hhbmdlLmNv
bYIQbWF0aG92ZXJmbG93Lm5ldIISKi5tYXRob3ZlcmZsb3cubmV0gg1hc2t1YnVu
dHUuY29tgg8qLmFza3VidW50dS5jb22CEXN0YWNrc25pcHBldHMubmV0ghIqLmJs
b2dvdmVyZmxvdy5jb22CEGJsb2dvdmVyZmxvdy5jb22CGCoubWV0YS5zdGFja292
ZXJmbG93LmNvbYIVKi5zdGFja292ZXJmbG93LmVtYWlsghNzdGFja292ZXJmbG93
LmVtYWlsghJzdGFja292ZXJmbG93LmJsb2cwDgYDVR0PAQH/BAQDAgWgMB0GA1Ud
JQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjB1BgNVHR8EbjBsMDSgMqAwhi5odHRw
Oi8vY3JsMy5kaWdpY2VydC5jb20vc2hhMi1oYS1zZXJ2ZXItZzUuY3JsMDSgMqAw
hi5odHRwOi8vY3JsNC5kaWdpY2VydC5jb20vc2hhMi1oYS1zZXJ2ZXItZzUuY3Js
MEwGA1UdIARFMEMwNwYJYIZIAYb9bAEBMCowKAYIKwYBBQUHAgEWHGh0dHBzOi8v
d3d3LmRpZ2ljZXJ0LmNvbS9DUFMwCAYGZ4EMAQICMIGDBggrBgEFBQcBAQR3MHUw
JAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0LmNvbTBNBggrBgEFBQcw
AoZBaHR0cDovL2NhY2VydHMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0U0hBMkhpZ2hB
c3N1cmFuY2VTZXJ2ZXJDQS5jcnQwDAYDVR0TAQH/BAIwADANBgkqhkiG9w0BAQsF
AAOCAQEARIdUz7n08ZtqWscAmTXegtB6yPrU0l5IQCXQRqnEVXPKyS+w8IVOcblT
T/W2Qlp5we2BTDbRDfVokXIOSxOTAT0XN3f3c+nbvKJ3XMBH236846AY6bpfqL0/
05gcdt39d2iXTL+qnJW9P0yFKpkfGXBBTYQl4ACSeThSuSBXIVJ0v/TfR9+ggXuP
pmXiIKkPOReKu2Tu8SO7+5KRqRJvYhP9mhL4Bl+YLrTQXzM1NwVAahRT1QJJNemy
yEY1kkZOCKt0xRu4CVWhJlpNdoRZenT9BrD8Fo22kt5MxAvCVrjT/g1BHDQd4S8p
PKC8kRwmMA8mdo8TiHJQMy0DBCDCDg==
-----END CERTIFICATE-----
subject=/C=US/ST=NY/L=New York/O=Stack Exchange, Inc./CN=*.stackexchange.com
issuer=/C=US/O=DigiCert Inc/OU=www.digicert.com/CN=DigiCert SHA2 High Assurance Server CA
```

파일로 인증서를 복사하기 위해 `openssl`을 다시한번 사용합니다. 이전 커맨드를 반복하고 `openssl x509`로 아웃풋을 전달합니다.  `DER` 암호화를 명시하고 `stackexchange.com.der` 이라는 이름의 새로울 파일을 아웃풋 합니다.

```zsh
openssl s_client -connect api.stackexchange.com:443 </dev/null \
  | openssl x509 -outform DER -out stackexchange.com.der
```

위의 단계들을 올바르게 따르면 프로젝트와 같은 폴더에서 다음 파일들 볼수 있어야 합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2019/03/ssl-pinning-saved-cert.png)

<div id='section-id-247'/>

## Implementing Certificate Pinning 

코드를 작성하기 전에, 이전에 다운로드한 인증서를 가져와야 합니다. 

프로젝트를 열고 `PinMyCert` 에 오른쪽 마우스를 클릭합니다. 그리고 `stackexchange.com.der`을 추가합니다. 

![](https://koenig-media.raywenderlich.com/uploads/2019/03/ssl-pinning-import-cert.png)

`NetworkClient.swift`를 열고 다음 코드를 추가합니다.

```swift
struct Certificates {
  static let stackExchange =
    Certificates.certificate(filename: "stackexchange.com")
  
  private static func certificate(filename: String) -> SecCertificate {
    let filePath = Bundle.main.path(forResource: filename, ofType: "der")!
    let data = try! Data(contentsOf: URL(fileURLWithPath: filePath))
    let certificate = SecCertificateCreateWithData(nil, data as CFData)!
    
    return certificate
  }
}
```

위의 구조체는 메인 번들에서 유저에게 친숙한 방법으로 인증서를 가져옵니다.

`SeoCertificateCreateWithData`는 DER-encoded 파일에서 인증서 객체를 생성하기 위한 책임이 있습니다

`NetworkClient.swift`에서 `NetworkClient`를 찾고 `let session = Session.default`를 다음과 같이 변경합니다

```swift
// 1
let evaluators = [
  "api.stackexchange.com":
    PinnedCertificatesTrustEvaluator(certificates: [
      Certificates.stackExchange
    ])
]

let session: Session

// 2
private init() {
  session = Session(
    serverTrustManager: ServerTrustManager(evaluators: evaluators)
  )
}
```

위의 코드에 대한 명세 입니다

1. `evaluators` 라는 딕셔너리를 생성합니다.(단일 키 벨류 쌍을 갖음) `String` 타입의 키와 당신이 체크하길 원하는 호스를 나타냅니다. 값은 `PinnedCertificatesTrustEvaluator`라 불리는 `ServerTrustEvaluating`의 하위 타입 입니다. 이것은 특정호스트에 적용하길 원하는 evaluation policy를 가르킵니다. 서버 신뢰성을 검증하기 위해 `PinnedCertificatesTrustEvaluator`를 사용할것입니다. Pinned된 인증서가 서버의 인증서와 정확하게 메칭되면 서버 신뢰성이 검증됩니다. 
2. `ServerTrustManager`를 사용하여 `session`을 초기화하는 private initilizer를 선언합니다. 이것은 `evaluators` 사전에 맵핑하여 선언된것을 관리하기 위한 책임이 있다 

`ViewController.swift`를 열고 network 요청을 하기 위한 다음 코드를 찾습니다

```swift
NetworkClient.request(Router.users)
  .responseDecodable { (response: DataResponse<UserList>) in
    switch response.result {
    case .success(let value):
      self.users = value.users
    case .failure(let error):
      self.presentError(withTitle: "Oops!", message: error.localizedDescription)
    }
}
```

위의 코드를 다음과 같이 변경합니다

```swift
NetworkClient.request(Router.users)
  .responseDecodable { (response: DataResponse<UserList>) in
    switch response.result {
    case .success(let value):
      self.users = value.users
    case .failure(let error):
      let isServerTrustEvaluationError =
        error.asAFError?.isServerTrustEvaluationError ?? false
      let message: String
      if isServerTrustEvaluationError {
        message = "Certificate Pinning Error"
      } else {
        message = error.localizedDescription
      }
      self.presentError(withTitle: "Oops!", message: message)
    }
}
```

성공일때는 그대로이지만 실패 조건일때 구현을 조금더 풍부하게 했습니다. 먼저 `AFError`로서 `error`를 캐스팅을 시도합니다. 캐스팅이 성공하면 `isServerTrustEvaluationError`의 값을 가져옵니다. 이것은 인증서 pinning이 실패했음을 의미합니다. 

앱을 빌드하고 실행합니다. 변경된게 없어야 합니다. 

잠깐! 이것은 man-in-the-middle 공격을 어떻게 방지하는지 배우는 튜토리얼입니다. 모의 공격을 통해서 올바르게 코드가 작성되었는지 확인 해봅니다. 

![](https://koenig-media.raywenderlich.com/uploads/2019/04/swift-cop-stop-police-1-300x300.png)

질문에 대답하기 위해 다음 색션으로 넘어갑니다

<div id='section-id-348'/>

## Testing Certificate Pinning With Charles 

모든것이 예상대로 실행 되는지 확인하기 위해서 먼저 이글의 당시 버전인 4.2.8인 [charles proxy](https://www.charlesproxy.com/download/)의 최신 버전인 4.2.8을 다운로드 합니다. 

Charles는 프록시 서버 입니다. 찰스는 자체 서명된 인증서를 생성하는데 TLS 암호화를 위해서 iOS/MacOS 장치에 설치 할수 있습니다. 이 인증서는 신뢰할 수 있는 인증서 발급자가 발급한게 아니므로 기기에 명시적으로 신뢰하라고 지시 해야 합니다. 그렇게 설치 되면 charels는 SSL 이벤트를 해독할수 있습니다. 

<div id='section-id-354'/>

## Certificate Pinning in Action

강화된 보안을 확인하기 위해 charles를 실행합니다. Charles는 실행된것과 같이 네트워크 이벤트들을 기록합니다

> Note: Charles에 대해서 더 배우는게 필요하다면 [<U>Charles Proxy Tutorial for iOS</U>](https://www.raywenderlich.com/1827524-charles-proxy-tutorial-for-ios)를 참조해주세요. 

Charles에서 먼저 `Sequeence` 탭으로 전환합니다 그후 필터 창에`api.stackexchange.com`를 입력합니다. 

> 그후 Charles 를 사용하여 테스트합니다. Charles 에 대한 자세한 사용법은 [<U>Charles Proxy Tutorial for iOS</U>](https://www.raywenderlich.com/1827524-charles-proxy-tutorial-for-ios)를 참조해주세요. 

https://koenig-media.raywenderlich.com/uploads/2019/03/ssl-pinning-charles-failure.png

<div id='section-id-366'/>

## Where to Go From Here? 

[여기](https://koenig-media.raywenderlich.com/uploads/2019/05/PinMyCert.zip)에서 완성된 버전을 다운로드 할수 있습니다.

당신은 Alamofire 5를 사용하여 SSL Certificate Pinning을 하는 방법을 배웠습니다. 당신의 유저는 앱에서 민감한 정보를 가져가는 공격자 일수도 있습니다. 

Charles 과 앱을 사용한 실험이 끝나면 Charles CA certficate 를 시뮬레이터에서 지워야 합니다(이것은 중요합니다) 시뮬레이터를 활성화 시키고 `Hardward -> Erase All Content And Settings...`를 메뉴에서 선택합니다. 하고 `Erase`를 클릭 합니다 

SSL Certificate Pinning 과 일반적인 보안에 대해서 더 배우길 원한다면 [OWASP Mobile Security Testing Guide](https://owasp.org/www-project-mobile-security-testing-guide/) 를 확인해보세요. 모바일 앱 보안 테스트에서 사용되는 프로세스, 기술 및 도구를 다루는 포괄적인 테스트 가이드 입니다. 


<div id='section-id-64'/>

## References

[Preventing Man-in-the-Middle Attacks in iOS with SSL Pinning](https://www.raywenderlich.com/1484288-preventing-man-in-the-middle-attacks-in-ios-with-ssl-pinning)