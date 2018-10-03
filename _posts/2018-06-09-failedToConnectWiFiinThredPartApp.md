---
layout:     post
title:      "Swift, App에서 WiFi 변경하기"
subtitle:   "Third Part App 에서 Global Setting 접근하여 실행하기"
date:       2018-06-09 17:45:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift]
---

## Code 

- 조건
	1. 개발자 계정을 통하여 NetworkExtension, HotSpot Configuration 설정이 필요합니다. 
	2. SSID와 Password 입력하여 접속 시도 

```swift
// 1 
// Capabiliteis 에서 NetworkExtension, Hotspot Configuration 설정후
import NetworkExtension
import SystemConfiguration.CaptiveNetwork

// 2: NEHotspot Configuration 인스턴스로 접근 접근 시도 
var wifiConfiguration: NEHotspotConfiguration?

// 3
func someButton(ssid: String, password: String) {
	wifiConfiguration = NEHotspotConfiguration(
		ssid: ssid,
		passphrase: password,
		isWEP: false)
		wifiConfiguration?.joinOnce = false
		
	falseNEHotspotConfigurationManager.shared.apply(wifiConfiguration!) { error in
		if error == nil {
			print("WiFi 연결성공")
		}else {
			print(error.debugDescription)
		}
	}
}
```

---

## 시작 목적

여러개의 WiFi회선을 사용할수있는 환경에서 현재위치에서 가장 빠른 WiFi를 사용하고 싶다. 그리고 편안하게 WiFi를 바꾸어서 접속하고 싶다라는 생각을 가지고 검색 시작! 

1. 먼저 내 근처에 있는 WiFi의 SSID목록부터 출력해보자! 
	- [iOS Wi-Fi Management APIs on Technical Q&A QA1942](https://developer.apple.com/library/archive/qa/qa1942/_index.html)
		- 일반적인 목적으로 WiFi scanning, configuration이 안되고, 특정한 목적이 있다면 가능!
		- 그러기위해서는 `NEHotspotHelper`클래스를 사용 해야하는데, 해당 클래스 사용하려면 특정 자격을 부여해주어야 합니다  [Hotspot Helper Request](https://developer.apple.com//contact/request/network-extension/) 
			- [Hotspot Network Subsystem Programming Guide](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/Hotspot_Network_Subsystem_Guide/Contents/AuthStateMachine.html#//apple_ref/doc/uid/TP40016639-CH2-SW1)
			- [NEHotspotHelper](https://developer.apple.com/documentation/networkextension/nehotspothelper)
			- 여기서부터 불안해지기 시작... 
2. 그러면 WiFi접속중일때, 접속중인 SSID를 가져와서 password를 저장해놓고, 필요할때 어떤 터치 한번으로 WiFi를 스왑해주자! 
	- Today Extension에서 바꾸어주자
		- WiFi스왑시, 유저의 승인이 있어야 해서 Today Extension에서는 안됨ㅠㅠ 
		- 결론적으로 망했습니다..
3. 그러려면 현재 Network상태를 알아야합니다. 
	- 현재 Network가능 한지 불가능한지, 
	- Cellular상태인지, WiFi상태인지. 
		- [Reachability.swift](https://github.com/ashleymills/Reachability.swift)을 사용하여 해결 
4. WiFi 접속 시도
	- NEHotspotConfiguration
	- NEHotspotConfigurationManager
	
<center><img src="/img/posts/title.PNG" width="450" height="600"></center> <br>

더 자세한 코드는..! [SimplyConnectWiFi](https://github.com/devmjun/SimplyConnectWiFi)를 참조해주세요.
	
---

## 더 알아보면 재미있는 것 

- P2P Networking(Peer-to-peer networking) — If your goal is to communicate with other nearby devices, you should look at:
	- NSNetService
	- Multipeer Connectivity


---

## Reference 

- idea
	- [https://developer.apple.com/library/content/qa/qa1942/_index.html](https://developer.apple.com/library/content/qa/qa1942/_index.html)

- WiFi
	- [iOS - How to programmatically connect to a WiFi network given the SSID and Password using a private/3rd party library](https://stackoverflow.com/questions/36303123/ios-how-to-programmatically-connect-to-a-wifi-network-given-the-ssid-and-passw/36303575)<br>
	- [와이파이(WiFi)정의 및 기술](https://blog.naver.com/kos4042/110093080024)<br>
	- [SSID and Wireless Networking](https://www.lifewire.com/definition-of-service-set-identifier-816547)<br>
- Network Extension
	- [NetworkExtension](https://developer.apple.com/documentation/networkextension)<br>
	- [About the Hotspot Network Subsystem](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/Hotspot_Network_Subsystem_Guide/Contents/Introduction.html#//apple_ref/doc/uid/TP40016639)<br>
- System Configuration 
	- [SystemConfiguration](https://developer.apple.com/documentation/systemconfiguration)<br>
	- [Introduction to System Configuration Programming Guidelines](https://developer.apple.com/library/content/documentation/Networking/Conceptual/SystemConfigFrameworks/SC_Intro/SC_Intro.html#//apple_ref/doc/uid/TP40001065-CH201-TPXREF101)
- Reachability
	- [Handling internet connection reachability in Swift](https://blog.pusher.com/handling-internet-connection-reachability-swift/)
	- [Reachability.swift](https://github.com/ashleymills/Reachability.swift)


---
