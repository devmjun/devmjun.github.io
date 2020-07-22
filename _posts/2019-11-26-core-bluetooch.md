---
layout:     post
title:      "iOS, Core Bluetooth Tutorial for iOS: Heart Rate Monitor"
subtitle:   "Core Bluetooth Tutorial for iOS: Heart Rate Monitor"
date:       2019-11-25 18:45:00
author:     "MinJun Ju"
header-img: "img/tags/Swift-bg.jpg"
comments: true 
tags: [Swift,CoreBluetooth]
--- 

[Core Bluetooth Tutorial for iOS: Heart Rate Monitor](https://www.raywenderlich.com/231-core-bluetooth-tutorial-for-ios-heart-rate-monitor) 에서 필요한 부분을 의역 했습니다.

Core Bluetooth 튜토리얼에서 심박측정기 같은 양립할수 있는 디바이스에서 데이터를 되찾고 연결하고 발견하는 방법을 배우게 될것입니다

오늘날 세계에서 유용한 제품(gadgets)이 널리 사용될때 이러한 장치들 사이의 통신은 이 제품을 사용하기 위해 이끌수도 있고 더 효과적인 방법으로 이러한 제품에 의해 제공된 정보로 이끌수도 있습니다. 이를 위해 애플은 심박수 센서, 디지털 온도 조절 장치, 운동장비 등 실제 기기와 통신할수 있는 Core Bluetooth framework를 도입 했습니다.  BLE(Bluetooth Low Engergy) 를 통해 무선 기술에 연결할수 있다면 Core Bluetooth framework는 이것을 연결할수 있습니다. 

이 튜토리얼에서 Core Bluetooth framework 의 핵심 개념 과 양립한 디바이스에서 데이터를 되찾고 연결하고 발견하는 방법을 배우게 될것입니다. 블루투스 심박수 센서와 함께 커뮤니케이션 하는 심박수 모니터링앱을 만들기 위해 이 기술을 사용할것 입니다. 

[https://www.amazon.com/gp/product/B007S088F4/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B007S088F4&linkCode=as2&tag=raywend-20](https://www.amazon.com/gp/product/B007S088F4/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B007S088F4&linkCode=as2&tag=raywend-20) 이것은 우리가 사용할 심박수 센서 이지만 다른것을 사용해도 괜찮습니다.

먼저 블루투스에서 사용하는 용어들을 살펴봅니다: centrals, peripherals, services and, characteristices

## Centrals and Peripherals

Bluetooth 디바이스는 `central` 또는 `peripheral` 입니다.

- `Central`:Bluetooth 디바이스로부터 데이터를 받는 객체입니다
- `Peripheral`:다른 디바이스에서 소비할 데이터를 발행하는 Bluetooth 디바이스 입니다. 

## Advertising Packets

Bluetooth peripherals 는 advertising packets의 형태로 가진 어떤 데이터들을 방송합니다. 이 패킷은 peripherals의 이름, 핵심 기능과 같은 정보들을 포함합니다. 또한 이들은 peripherals이 제공할수 있는 어떤 관계된 추가적인 데이터를 포함할수도 있습니다. 

central의 작업은 advertising packets을 찾고, 어떤 perpherals 와 관계된걸 찾고 추가적인 정보를 위해 각 디바이스에 연결합니다.

## Services and Characteristics

Advertising packets은 매우 작아서 많은 정보를 포함할수 없습니다. 더 많은 데이터를 공유하기 위해 central은 perpheral로 연결해야 합니다. 

peripheral의 데이터는 `services` 와 `characteristicㄴ`로 정리 되어 집니다.

- `Service`: 데이터 모음과 peripheral의 기능과 특정 기능을 설명하는 관련 동작의 모음 입니다. 예를 들어 심박수 센서는 Heart Rate 서비스를 가집니다. peripheral은 한개 이상의 서비스를 가질수 있습니다.
- `Characteristic`: `peripherals`의 서비스에 대해서 더 자세한 설명을 제공합니다. 예를들어, 심박수 서비스는 분당 심장 박동 값을 특정한 `Heart Rate Measurement`가 포함되어 있습니다. 이 서비스는 한개이상의 characteristic를 가질수 있습니다. 또다른 characteristic는  `Body sensor Location` 인데 이것은 단순하게 센서가 의도된 바디인지 설명해주는 스트링 입니다. 

각 service 와 characteristic는 16 비트 또는 128 비트 값의 UUID 입니다. 

## Getting Started 

먼저 [여기](https://koenig-media.raywenderlich.com/uploads/2018/01/HeartRateMonitor-starter.zip) 에서 시작 프로젝트를 다운받습니다. 

core_bluetooth_0
core_bluetooth_1

> Note: iOS 시뮬레이터는 블루투스르 지원하지 않습니다.

## Perparing for Core Bluetooth

먼저 Core Bluetooth framework를가져옵니다. HRMViewController.swift 를 열고 다음 코드를 추가합니다.

```swift
import CoreBluetooth
```

Core Bluetooth framework의 대부분 작업은 delegate methods를 통해서 이루어질것입니다. central은 `CBCenteralManager`에 의해서 대표되고 이들의 delegate는 `CBCentralManagerDelegate` 입니다. `CBPeripheral`은 peripheral 이고 이들의 dleegate는 `CBPeripheralDelegate` 입니다. 

가장 먼저 해야하는 일은 `CBCentralManagerDelegate`를 채택하는 합니다.

```swift
extension HRMViewController: CBCentralManagerDelegate {
  func centralManagerDidUpdateState(_ central: CBCentralManager) {
        switch central.state {
      } 
   }
}
```

이후 XCdoe의 도움을 받아 다음 처럼 추가합니다. 

core_bluetooth_2.png

placeholder를 적당한 값으로 교체할수 있습니다.

```swift
switch central.state {
  case .unknown:
    print("central.state is .unknown")
  case .resetting:
    print("central.state is .resetting")
  case .unsupported:
    print("central.state is .unsupported")
  case .unauthorized:
    print("central.state is .unauthorized")
  case .poweredOff:
    print("central.state is .poweredOff")
  case .poweredOn:
    print("central.state is .poweredOn")
}
```

이 시점에서 빌드하고 실행합니다. 콘솔에는 아무것도 출력되지 않습니다 왜냐하면 실제 `CBCentralManager`를 생성하지 않았기 때문입니다.

`bodySensorLocationLabel` 레이블 아래에 다음 코드를 추가합니다.

```swift
var centralManager: CBCentralManager!
```

다음으로 `viewDidLoad()` 의 시작점에 다음 코드를 추가합니다. 

```swift
centralManager = CBCentralManager(delegate: self, queue: nil)
```

빌드 하고 실행하면 다음 출력을 봐야합니다.

```swift
central.state is .poweredOn
```

> Note: Bluetooth가 꺼져있다면 central.state is .`porweredOff`를 받을수 있습니다.

이제 central은 powered on 되었고 다음 단계는 central은 심박센서를 찾기 위함 입니다. Bluetooth-speak에서 central은 peripherals를 찾기 위핸 스캔이 필요합니다. 

## Scanning for Peripherals

추가할 많은 methods 에서 name을 바로 주는 대신 힌트를 줄것입니다. 이 경우에 당신이 스켄할수 있는 것과 함께 `centralManager`가 있는지 확인 해야 합니다. 

`centralManager` 초기화 이후 라인에 `centralManager.scan`을 시작하고 당신이 사용하려는 매소드를 찾을수 있습니다.

core_bluetooth_3.png

`scanForPeripherals(withServices: [CBUUID]?, options: [String: Any]?) ` 매소드 같아 보입니다. 이것은 선택하고 `withServices`매개변수에 nil을 설정하고 `options` 매개변수를 사용하지 않는다면 지웁니다. 결국 다음과 같은 형태가 될것입니다.

콘솔을 실행하고 `API MISUSE` 메세지에 주의합니다

```swift
API MISUSE: <CBCentralManager: 0x1c4462180> can only accept this command while in the powered on state
```

`scanForPeripherals` 매소드를 다음과 같이 이동 시킵니다.

```swift
case .poweredOn:
  print("central.state is .poweredOn")
  centralManager.scanForPeripherals(withServices: nil)
}
```

빌드 하고 실행하고 콘솔을 확인하면 `API MISUSE` 메시지가 더이상 보이지 않습니다.  하지만 심박기를 찾았나요?

아마 peripheral를 찾기 위해  delegate method 구현이 필요할것입니다. Bluetooth-speak 에서 peripheral찾는것은 `discovering`으로서 알려져 있고 사용할 delegate methods는 `discover` 이라는 단어를 가질것입니다.

` centralManagerDidUpdateState(_:)` 매소드의 끝에 `discover` 이라는 단어를 타이핑 시작하면 다음 메소드르 찾을수 있습니다.

core_bluetooth_4.png

해당 메소드를 선택하고 다음과 같이 작성합니다.

```swift
func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral,
                    advertisementData: [String: Any], rssi RSSI: NSNumber) {
  print(peripheral)
}
```

빌드 하고 실행합니다. 주변에 얼마나 많은 gadgets들이 있는지에 따라서 다양한 블루투스 장치를 볼수 있ㅅ브니다.

```swift
<CBPeripheral: 0x1c4105fa0, identifier = D69A9892-...21E4, name = Your Computer Name, state = disconnected>
<CBPeripheral: 0x1c010a710, identifier = CBE94B09-...0C8A, name = Tile, state = disconnected>
<CBPeripheral: 0x1c010ab00, identifier = FCA1F687-...DC19, name = Your Apple Watch, state = disconnected>
<CBPeripheral: 0x1c010ab00, identifier = BB8A7450-...A69B, name = Polar H7 DCB69F17, state = disconnected>
```

이들 중 하나는 심박 측정기 이고. 이걸 입고 있어야 유효한 값을 받을수 있습니다. 

## Scanning for Peripherals with Specific Services

heart rate monitors에 대해서만 스켄할수는 없을까요? Bluetooth-speak 에서 제공한 `Heart Rate` 서비스를 제공한 peripherals에 대해서만 스캔할수 있습니다. 이것을 하기 위해 심박수 Heart Rate service를 위한 UUID가 필요합니다.  [Bluetooth services specification page](https://www.bluetooth.com/specifications/gatt/services/) 에서 heart rate를 검색하고 UUID를 기록하세요. `0x180D`

`import` statements 바로 아래에 다음 코드를 추가합니다.

```swift
let heartRateServiceCBUUID = CBUUID(string: "0x180D")
```

`scanForPeripherals(withServices: nil)` 이후에 다음 코드를 업데이트 합니다.

```swift
centralManager.scanForPeripherals(withServices: [heartRateServiceCBUUID])
```

앱을 빌드 하고 실행하면 다음과 같은값을 볼수 있습니다.

```swift
<CBPeripheral: 0x1c0117220, identifier = BB8A7450-...A69B, name = Polar H7 DCB69F17, state = disconnected>
<CBPeripheral: 0x1c0117190, identifier = BB8A7450-...A69B, name = Polar H7 DCB69F17, state = disconnected>
```

다음으로 heart rate peripheral 을 참조하기 위해 저장하고 추가적인 peripherals 를 위한 스캔을 멈출것 입니다. 

`CGPeripherals` 타입의 `heartRatePeripheral` 변수 인스턴스를 상단에 추가합니다.

```swift
var heartRatePeripheral: CBPeripheral!
```

`peripheral` 를 한번 찾은후,  참조를 저장하고 스캔을 멈춥니다. `centralManager(_:didDiscover:advertisementData:rssi:), ` 에서 `print(peripheral)` 직후에 다음 코드를 추가합니다.

```swift
heartRatePeripheral = peripheral
centralManager.stopScan()
```

앱을 빌드하고 실행합니다. 그러면 다음의 출력을 봐야 합니다.

```swift
<CBPeripheral: 0x1c010ccc0, identifier = BB8A7450-...A69B, name = Polar H7 DCB69F17, state = disconnected>
```

## Connecting to a Peripheral 

peripheral 에서 데이터를 얻기 위해 이것을 연결 해야 합니다. `centralManager.stopScan()` 바로 직후에 `centralManager.connect` 타이핑을 시작하고 `connect(peripheral: CBPeripheral, options: [String: Any]?`을 볼수 있을것 입니다.

core_bluetooth_5.png

이것은 선택하고 코드를 다음처럼 작성합니다.

```swift
centralManager.connect(heartRatePeripheral)
```

좋습니다. 이제 심박수 장치와 연결되었습니다. 하지만 연결되었는지 어떻게 확인할수 있나요? 

`centralManager(_:didDiscover:advertisementData:rssi:)` 메소드 직후에 `centralManager(_:didConnect:):`를 타이핑 하세요

core_bluetooth_6.png

플레이스홀더 코드를 다음과 같이 변경합니다.

```swift
func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
  print("Connected!")
}
```

앱을 빌드하고 실행하면 다음과같은 메시지를 콘솔에서 볼수 있습니다.

```
Connected!
```

## Discovering a Peripheral’s Services

이제 연결했고 다음 단계는 peripheral의 `services`를 발견 하는것입니다. 심박수 심박수 서비스와 함께 peripheral를 요청했고 이 서비스를 지원하는걸 알고 있어도 이것을 사용하기 위해 service 발견이 필요합니다. 

연결 이후에 이들의 서비스를 찾기위해 peripheral의`discoverServices(nil)` 를 호출합니다.

```swift
heartRatePeripheral.discoverServices(nil)
```

UUIDs 에서 여기의 서비스를 위해 전달할수 있지만 심박수 모니터가 무엇을 더 할수 잇는지 모든 서비스를 찾아볼것입니다. 

빌드 하고 실행하면 `API MISUSE` 메시지를 콘솔에서 볼것입니다. 

```swift
API MISUSE: Discovering services for peripheral <CBPeripheral: 0x1c010f6f0, ...> while delegate is either nil or does not implement peripheral:didDiscoverServices:
API MISUSE: <CBPeripheral: 0x1c010f6f0, ...> can only accept commands while in the connected state
```

두번째 메시지는 peripheral은 연결중에만 커맨드가 동작함을 나타냅니다. 이 문제는 peripheral로 연결을 초기화 했지만 `discoverServices(_:)` 호출 이전에 연결이 끝난것을 기다리지 않았기 때문에 나타나는 메시지 입니다. 

`heartRatePeripheral.discoverServices(nil)`을 `centralManager(_:didConnect:)` 의 `print("Connected!")` 직후에 추가합니다. 

```swift
func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
  print("Connected!")
  heartRatePeripheral.discoverServices(nil)
}
```

앱을 빌드하고 실행합니다. 그러면 다음과 같은 `API MISUSE`라는 메시지를 볼수 있습니다.

```swift
API MISUSE: Discovering services for peripheral <CBPeripheral: ...> while delegate is either nil or does not implement peripheral:didDiscoverServices:
```

Core Bluetooth framework는 services를 발견했다고 지시했지만 `peripheral(_:didDiscoverServices:)` 델리게이트 메소드를 구현하지 않았습니다.

이 메소드의 이름은  peripheral delegate method 이므로 `CBPeripheralDelegate`를 준수해야 구현할수 있음을 알려줍니다.

```swift
extension HRMViewController: CBPeripheralDelegate {

}
```

아래 메소드를 추가합니다.

core_bluetooth_7.png

이 메소드는 발견된 services 목록을 제공하지 않지만 peripheral에 의해서 한개 이상의 services가 발견되었음을 주의 합니다. 이것은 peripheral 객체는 services의 목록을 주는 한개의 속성을 가진 객체라는 사실 입니다. 다음 코드를 새롭게 추가한 메소드에 추가합니다

```swift
guard let services = peripheral.services else { return }

for service in services {
  print(service)
}
```

...

https://developer.apple.com/library/archive/documentation/Performance/Conceptual/EnergyGuide-iOS/BluetoothBestPractices.html

https://developer.apple.com/library/archive/documentation/NetworkingInternetWeb/Conceptual/CoreBluetooth_concepts/BestPracticesForInteractingWithARemotePeripheralDevice/BestPracticesForInteractingWithARemotePeripheralDevice.html#//apple_ref/doc/uid/TP40013257-CH6-SW1

https://developer.apple.com/library/archive/documentation/NetworkingInternetWeb/Conceptual/CoreBluetooth_concepts/BestPracticesForInteractingWithARemotePeripheralDevice/BestPracticesForInteractingWithARemotePeripheralDevice.html#//apple_ref/doc/uid/TP40013257-CH6-SW1