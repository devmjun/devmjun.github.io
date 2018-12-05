---
layout:     post
title:      "Swift. 지하철 노선도 만들기(초보편) part 1"
subtitle:   "Alert, ScrollView 이용해서 만들기"
date:       2017-10-15 16:25:00
author:     "MinJun"
header-img: "img/tags/Swift-bg.jpg"
comments: true
tags: [Swift]
---

[프로젝트 파일의 위치는 이곳 입니다.](https://github.com/devmjun/iOS_Develop5/tree/master/Mini_Projects/Projexts_Xcode/CreatSubWay-ver1)


---

## 고려 사항 

- 지하철 노선도 탐색 기능.
	- 출발 -> 도착
	- 중간 환승역 

---

## 이미지와, 스크롤뷰 생성 


| ![screensh](/img/posts/CreatSubway.jpg) | ![screensh](/img/posts/CreatSubway1.jpg) |



```swift
class ViewController: UIViewController, UIScrollViewDelegate {
    var scrollView: UIScrollView!
    var imageView: UIImageView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // 이미지, 스크롤뷰 생성 
        let frameSize = view.bounds.size
        scrollView = UIScrollView(frame: CGRect(origin: CGPoint.zero, size: frameSize))
        // 이미지 생성, 스크롤뷰의 컨텐츠 사이즈는, 이미지뷰의 사이즈로 정함
        let image = UIImage(named: "deagu.jpeg")
        imageView = UIImageView(image: image)
        scrollView.contentSize = imageView.bounds.size
        //view 에 뿌려주기
        scrollView.addSubview(imageView)
        view.addSubview(scrollView)
}
```
  
---

## Double tab gesture

![screensh](/img/posts/CreatSubway2.jpg) 


```swift
class ViewController: UIViewController, UIScrollViewDelegate {
    var pinchGesture = UIPinchGestureRecognizer()
    override func viewDidLoad() {
        super.viewDidLoad()
        // zoomscale 설정
        scrollView.minimumZoomScale = 1
        scrollView.maximumZoomScale = 3.0
        
        // scrollView 에 델리게이트 할당
        scrollView.delegate = self
        
        // 텝 횟수에 따라서 동작 결정 
        let doubleTap = UITapGestureRecognizer(target: self, action: #selector(self.tapToZoom))
        doubleTap.numberOfTapsRequired = 2
        doubleTap.numberOfTouchesRequired = 1
        
        // 더블텝 제스쳐를 scrllView 상위로 올렷다, 컨테이너 밖으로 벗어나면 터치가 안됨 ㅠㅠ
        scrollView.addGestureRecognizer(doubleTap)
        
    // 더블탭 기능, delegate 사용해서, addTaget 으로 사용함, 엄밀하게 더블텝을 위한것보다는, 델리게이트를 이용해서, 불려 오는 함수에 조건을 넣어서 기능을 구현했다.
    @objc func tapToZoom(_ gestureRecognizer: UIGestureRecognizer) {
        print("줌..")
        // 더블탭 간단 하게 구현
        if scrollView.zoomScale == CGFloat(1) {
            scrollView.setZoomScale(3, animated: true)
        }else {
            scrollView.setZoomScale(1, animated: true)
        }
    }
    
    // Pinch Gesture 줌 인, 아웃 가능, 사실상 핵심 기능. 이미지뷰를 반환할때, 하이라키 구조와 컨테이너 개념을 알고 있어야 한다. Forzooming 하려는 대상에 따라서 여러가지 방법으로 구현이 가능함.
    @objc func viewForZooming(in scrollView: UIScrollView) -> UIView? {
        //print("viewFor")
        return imageView
    }
```

---

## 각 역마다 버튼 넣고, 위치 지정

| ![screensh](https://user-images.githubusercontent.com/30401511/31276412-a7115014-aad6-11e7-9320-c1f64252da48.jpg) | ![screensh](https://user-images.githubusercontent.com/30401511/31275413-126a2ca0-aad2-11e7-8c45-7bd39fec8254.jpg) |

> 확대, 축소후 기능 버튼 위치 그대로(검정색 원은 버튼입니다)

![screensh](https://user-images.githubusercontent.com/30401511/31275446-2be5c464-aad2-11e7-9e84-3431dbab868b.jpg) 

> 버튼 숨기기

```swift
class ViewController: UIViewController, UIScrollViewDelegate {
   /*==========================
          역마다 버튼 만들기
    ==========================*/
    var yeungNamHosp: UIButton!
    var univOfEduc: UIButton!
    var myeongDeok: UIButton!
    
    // 환승역
    var banWorlDang: UIButton!
    
    var jungangno: UIButton!
    var daeguStation: UIButton!
    var chilseongMarket: UIButton!
    
    // 2호선
    var neaDang: UIButton!
    var bangogae: UIButton!
    var sinNam: UIButton!
    
    var kyungDeaHosp: UIButton!
    var daeguBank: UIButton!
    var beomeo: UIButton!
    
    var btn: UIButton!
    
    // 버튼 클릭 횟수
    var clickBtn = 0
    
    // 출발, 도착역 설정
    var startStation = ""
    var arrivalStation = ""
    
    // 스타트 역의 tag 값을 가져온다
    var getStartStionTag = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()           
        /*=======================
                 각 버튼 위치
         ========================*/
        yeungNamHosp = UIButton(frame: CGRect(x: 465, y: 430, width: 20, height: 20))
        univOfEduc = UIButton(frame: CGRect(x: 486, y: 410, width: 20, height: 20))
        myeongDeok = UIButton(frame: CGRect(x: 515, y: 380, width: 20, height: 20))
        
                // 환승역
        banWorlDang = UIButton(frame: CGRect(x: 575, y: 320, width: 20, height: 20))
        jungangno = UIButton(frame: CGRect(x: 610, y: 290, width: 20, height: 20))
        daeguStation = UIButton(frame: CGRect(x: 640, y: 265, width: 20, height: 20))
        chilseongMarket = UIButton(frame: CGRect(x: 690, y: 265, width: 20, height: 20))
        
               // 2호선
        neaDang = UIButton(frame: CGRect(x: 430, y: 320, width: 20, height: 20))
        bangogae = UIButton(frame: CGRect(x: 475, y: 320, width: 20, height: 20))
        sinNam = UIButton(frame: CGRect(x: 545, y: 320, width: 20, height: 20))
        
        kyungDeaHosp = UIButton(frame: CGRect(x: 640, y: 320, width: 20, height: 20))
        daeguBank = UIButton(frame: CGRect(x: 680, y: 320, width: 20, height: 20))
        beomeo = UIButton(frame: CGRect(x: 730, y: 320, width: 20, height: 20))
        
        /*==========================
               버튼 색상, 곡률 지정
         ==========================*/
        yeungNamHosp.backgroundColor = UIColor.clear
        yeungNamHosp.layer.cornerRadius = 10
        univOfEduc.backgroundColor = UIColor.clear
        univOfEduc.layer.cornerRadius = 10
        myeongDeok.backgroundColor = UIColor.clear
        myeongDeok.layer.cornerRadius = 10
        
        // 환승역
        banWorlDang.backgroundColor = UIColor.clear
        banWorlDang.layer.cornerRadius = 10
        jungangno.backgroundColor = UIColor.clear
        jungangno.layer.cornerRadius = 10
        daeguStation.backgroundColor = UIColor.clear
        daeguStation.layer.cornerRadius = 10
        chilseongMarket.backgroundColor = UIColor.clear
        chilseongMarket.layer.cornerRadius = 10

        // 2호선
        neaDang.backgroundColor = UIColor.clear
        neaDang.layer.cornerRadius = 10
        bangogae.backgroundColor = UIColor.clear
        bangogae.layer.cornerRadius = 10
        sinNam.backgroundColor = UIColor.clear
        sinNam.layer.cornerRadius = 10
        kyungDeaHosp.backgroundColor = UIColor.clear
        kyungDeaHosp.layer.cornerRadius = 10
        daeguBank.backgroundColor = UIColor.clear
        daeguBank.layer.cornerRadius = 10
        beomeo.backgroundColor = UIColor.clear
        beomeo.layer.cornerRadius = 10
        
        /*=======================
             버튼 imageView 에 추가.
         ========================*/
        imageView.addSubview(yeungNamHosp)
        imageView.addSubview(univOfEduc)
        imageView.addSubview(myeongDeok)
        
        imageView.addSubview(banWorlDang)
        
        imageView.addSubview(jungangno)
        imageView.addSubview(daeguStation)
        imageView.addSubview(chilseongMarket)
        
        imageView.addSubview(neaDang)
        imageView.addSubview(bangogae)
        imageView.addSubview(sinNam)
        
        imageView.addSubview(kyungDeaHosp)
        imageView.addSubview(daeguBank)
        imageView.addSubview(beomeo)
        
        /*=======================
             버튼 기능 연결
         ========================*/
        yeungNamHosp.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        univOfEduc.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        myeongDeok.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        
        // 환승역
        banWorlDang.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        jungangno.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        daeguStation.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        chilseongMarket.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        neaDang.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        bangogae.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        sinNam.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        kyungDeaHosp.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        daeguBank.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        beomeo.addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
        
        /*=======================
              역 이름 한글 지정
         ========================*/
        yeungNamHosp.titleLabel?.text = "영대병원"
        univOfEduc.titleLabel?.text = "교대"
        myeongDeok.titleLabel?.text = "명덕"
        banWorlDang.titleLabel?.text = "반월당"
        jungangno.titleLabel?.text = "중앙로"
        daeguStation.titleLabel?.text = "대구역"
        chilseongMarket.titleLabel?.text = "칠성시장"
        neaDang.titleLabel?.text = "내당"
        bangogae.titleLabel?.text = "반고개"
        sinNam.titleLabel?.text = "신남"
        kyungDeaHosp.titleLabel?.text = "경대병원"
        daeguBank.titleLabel?.text = "대구은행"
        beomeo.titleLabel?.text = "범어"
        
        /*=======================
                 tag 값 설정
         ========================*/
        yeungNamHosp.tag = 3
        univOfEduc.tag = 2
        myeongDeok.tag = 1
        
        // 환승역
        banWorlDang.tag = 0
        jungangno.tag = 1
        daeguStation.tag = 2
        chilseongMarket.tag = 3
        
        // 2호선
        neaDang.tag = 3
        bangogae.tag = 2
        sinNam.tag = 1
        kyungDeaHosp.tag = 1
        daeguBank.tag = 2
        beomeo.tag = 3
    }
```

---

## 버튼의 기능 구현

| | | |
|:--: |:--: |:--: |
| ![screensh](/img/posts/CreatSubWay6.jpg) | ![screen](/img/posts/CreatSubWay7.jpg) | ![screen](/img/posts/CreatSubWay8.jpg) |




```swift
 		/*=======================
            역 버튼 기능
     ========================*/
    @objc func btnAction(_ sender: UIButton) {   
        clickBtn += 1
        
        /*=======================
             출발역에 대한 조건 설정
         ========================*/         
        if clickBtn == 1 {
            
            /*=======================
                    출발역 알럿
             ========================*/
            let popAlert: UIAlertController = UIAlertController(title: "출발 역 은", message: "\(sender.titleLabel!.text!) 입니다", preferredStyle: .alert)
            
            /*=======================
                 OK 누르면 출발역 설정
             ========================*/
            let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in        
                // 전역 변수에 출발역 설정
                self.startStation = sender.titleLabel!.text!
                self.getStartStionTag = sender.tag
                print("출발역은 \(sender.titleLabel!.text!)")
            })
            
            /*=======================
             cancle 버튼 누르면 출발역 재설정
             ========================*/
            let cancelAlertAction: UIAlertAction = UIAlertAction(title: "Cancel", style: .default, handler: { (alert) in
                self.clickBtn = 0
                self.startStation = ""
                self.getStartStionTag = 0
            })
            
            /*=======================
                   alert 액션 설정
             ========================*/
            popAlert.addAction(okAlertAction)
            popAlert.addAction(cancelAlertAction)
            
            /*=======================
              alert 을 뷰에 뿌려줌
             ========================*/
            self.present(popAlert, animated: true, completion: nil)
            
            /*=======================
               도착역 설정 구간, 여기가 핵심(출발역 -> 도착역 알고리즘 적용)
             ========================*/
        }else if clickBtn == 2 {
            print("도착역을 설정 해주세요 ")
            
            /*=======================
                   도착역 설정 알럿
             ========================*/
            let popAlert: UIAlertController = UIAlertController(title: "도착 역 은", message: "\(sender.titleLabel!.text!) 입니다", preferredStyle: .alert)
            
            /*=======================
           도착역 OK 버튼 누르면 예상 시간 반환
             ========================*/
            let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in    
                // 도착역 전역변수에 지정
                self.arrivalStation = sender.titleLabel!.text!
                print("출발역은 \(self.checkLine(self.startStation)), 도착역은 \(self.checkLine(self.arrivalStation)) " )
                
                /*=======================
                 예외처리-1 : 출발역이 반월당인 경우
                 ========================*/
                if self.startStation == "반월당" {
                    /*=======================
		                     예외처리-1 알럿
                     ========================*/
                    var popAlert: UIAlertController = UIAlertController(title: "총 \(sender.tag*3) 분 소요 됩니다", message:"" , preferredStyle: .alert)               
                    let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in 
                        // 모두 리셋
                        self.startStation = ""
                        self.arrivalStation = ""
                        self.clickBtn = 0
                        self.getStartStionTag = 0
                    })
                                        
                    /*=======================
                     예외처리-1 알럿 출력
                     ========================*/
                    popAlert.addAction(okAlertAction)
                    self.present(popAlert, animated: true, completion: nil)
                    /*=======================
                     예외처리-2 출발역 1호선 -> 도착역 1호선
                     ========================*/
                }else if self.checkLine(self.startStation) == 1 && self.checkLine(self.arrivalStation) == 1   {
                    var section1 = ["영대병원", "교대", "명덕"]
                    var section2 = ["중앙로", "대구역", "칠성시장"]
                    
                    /*=======================
                     예외처리-2 환승역 이전에 출발->도착
                     ========================*/
                    if section1.contains(self.startStation) && section1.contains(self.arrivalStation) {                    
                        var popAlert: UIAlertController = UIAlertController(title: "총 \(abs((self.getStartStionTag-sender.tag))*3) 분 소요 됩니다", message:"" , preferredStyle: .alert)
                        let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in
                            // 모두 리셋
                            self.startStation = ""
                            self.arrivalStation = ""
                            self.clickBtn = 0
                            self.getStartStionTag = 0
                        })
                        popAlert.addAction(okAlertAction)
                        self.present(popAlert, animated: true, completion: nil)
                        
                        /*=======================
                         예외처리-2 환승역 이후에 출발->도착
                         ========================*/
                    }else if section2.contains(self.startStation) && section2.contains(self.arrivalStation) {
                        var popAlert: UIAlertController = UIAlertController(title: "총 \(abs((self.getStartStionTag-sender.tag))*3) 분 소요 됩니다", message:"" , preferredStyle: .alert)
                        let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in
                            self.startStation = ""
                            self.arrivalStation = ""
                            self.clickBtn = 0
                            self.getStartStionTag = 0
                        })
                        popAlert.addAction(okAlertAction)
                        self.present(popAlert, animated: true, completion: nil)
                        
                        /*=======================
                         일반적인 경우 1호선 -> 1호선(환승역 넘어선 경우)
                         ========================*/
                    }else {
                        // 1. UIAlertController 설정
                        var popAlert: UIAlertController = UIAlertController(title: "총 \(abs((self.getStartStionTag+sender.tag))*3) 분 소요 됩니다", message: "", preferredStyle: .alert)
                        // 2. UIAlertAction 설정
                        let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in
                            // 모두 리셋
                            self.startStation = ""
                            self.arrivalStation = ""
                            self.clickBtn = 0
                            self.getStartStionTag = 0
                        })
                        popAlert.addAction(okAlertAction)
                        self.present(popAlert, animated: true, completion: nil)
                    }
                        
                    /*=======================
                     예외처리-3 2호선 -> 2호선
                     ========================*/
                }else if self.checkLine(self.startStation) == 2 && self.checkLine(self.arrivalStation) == 2   {
                    var section1 = ["내당", "반고개", "신남"]
                    var section2 = ["경대병원", "대구은행", "범어"]
                    
                    /*=======================
                     예외처리-3 환승역 이전에 출발->도착
                     ========================*/
                    if section1.contains(self.startStation) && section1.contains(self.arrivalStation) {
                        var popAlert: UIAlertController = UIAlertController(title: "총 \(abs((self.getStartStionTag-sender.tag))*3) 분 소요 됩니다", message:"" , preferredStyle: .alert)
                        let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in
                            
                            // 모두 리셋
                            self.startStation = ""
                            self.arrivalStation = ""
                            self.clickBtn = 0
                            self.getStartStionTag = 0
                        })
                        popAlert.addAction(okAlertAction)
                        self.present(popAlert, animated: true, completion: nil)
                        
                        /*=======================
                         예외처리-3 환승역 이후에 출발->도착
                         ========================*/
                    }else if section2.contains(self.startStation) && section2.contains(self.arrivalStation) {
                        var popAlert: UIAlertController = UIAlertController(title: "총 \(abs((self.getStartStionTag-sender.tag))*3) 분 소요 됩니다", message:"" , preferredStyle: .alert)
                        let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in
                            self.startStation = ""
                            self.arrivalStation = ""
                            self.clickBtn = 0
                            self.getStartStionTag = 0
                        })
                        
                        popAlert.addAction(okAlertAction)
                        self.present(popAlert, animated: true, completion: nil)
                        /*=======================
                         일반적인 경우 2호선 -> 2호선(환승역 넘어선 경우)
                         ========================*/
                    }else {        
                        // 1. UIAlertController 설정
                        var popAlert: UIAlertController = UIAlertController(title: "총 \(abs((self.getStartStionTag+sender.tag))*3) 분 소요 됩니다", message: "", preferredStyle: .alert)
                        // 2. UIAlertAction 설정
                        let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in
                            // 모두 리셋
                            self.startStation = ""
                            self.arrivalStation = ""
                            self.clickBtn = 0
                            self.getStartStionTag = 0
                        })
                        popAlert.addAction(okAlertAction)
                        self.present(popAlert, animated: true, completion: nil)                        
                    }
                        
            /*=======================
             1호선 -> 2호선
             ========================*/
                }else if self.checkLine(self.startStation) == 1 && self.checkLine(self.arrivalStation) == 2 {
                    var popAlert: UIAlertController = UIAlertController(title: "총 \(abs((self.getStartStionTag+sender.tag))*3) 분 소요 됩니다", message: "", preferredStyle: .alert)
                    // 2. UIAlertAction 설정
                    let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in
                        // 모두 리셋
                        self.startStation = ""
                        self.arrivalStation = ""
                        self.clickBtn = 0
                        self.getStartStionTag = 0
                    })
                    popAlert.addAction(okAlertAction)
                    self.present(popAlert, animated: true, completion: nil)
                /*=======================
                 2호선 -> 1호선
                 ========================*/
                }else if self.checkLine(self.startStation) == 2 && self.checkLine(self.arrivalStation) == 1 {
                    var popAlert: UIAlertController = UIAlertController(title: "총 \(abs((self.getStartStionTag+sender.tag))*3) 분 소요 됩니다", message: "", preferredStyle: .alert)
                    // 2. UIAlertAction 설정
                    let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in
                        // 모두 리셋
                        self.startStation = ""
                        self.arrivalStation = ""
                        self.clickBtn = 0
                        self.getStartStionTag = 0
                    })
                    popAlert.addAction(okAlertAction)
                    self.present(popAlert, animated: true, completion: nil)
                }
            })
            ///////////////////////위까지 okAlert 범위
            // 도착역 재설정
            let cancelAlertAction: UIAlertAction = UIAlertAction(title: "Cancel", style: .default, handler: { (alert) in
                self.clickBtn = 1
                self.arrivalStation = ""
            })
            
            // 출발역  재설정
            let resetStartStation: UIAlertAction = UIAlertAction(title: "ResetStatstation", style: .default, handler: { (alert) in
                self.clickBtn = 0
                self.startStation = ""
                print("출발역이 리셋되었습니다. 현재 출발역은 \(self.startStation)")
            })
            
            // 3. 알럿액션을 알럿 컨트롤러에 연결
            popAlert.addAction(okAlertAction)
            popAlert.addAction(cancelAlertAction)
            popAlert.addAction(resetStartStation)
            // 4. 알럿 뿌려주기
            self.present(popAlert, animated: true, completion: nil)
            //clickBtn = 1
        }
    }
    
    /*=======================
    선택한 역이 몇 호선인지 반환 해줍니다
    ========================*/
    func checkLine(_ sender: String) -> Int {
        let line1 = ["영대병원", "교대", "명덕", "반월당", "중앙로", "대구역", "칠성시장"]
        let line2 = ["내당", "반고개", "신남", "반월당", "경대병원", "대구은행", "범어"]
        if line1.contains(sender) {
            return 1
        }else if line2.contains(sender) {
            return 2
        }
        return 0
    }
```

|-- 1. 도착역 OK Alert(실행시) <br>
|-- 2. 출발역이 반월당인 경우 <br>
|-- 3. 1호선 -> 1호선 :  환승역 이전에 출발역과 도착역이 있는경우  <br>
|-- 3-1        1호선 : 환승역 이후에 출발역과 도착역이 있는경우 <br>
|-- 3-2        1호선 :  일반적인 경우 <br>
|-- 4. 2호선 -> 2호선 :  환승역 이전에 출발역과 도착역이 있는경우 <br>
|-- 4-1        2호선 :  환승역 이후에 출발역과 도착역이 있는경우 <br>
|-- 4-2        2호선 :  일반적인 경우 <br>
|-- 5. 1호선 -> 2호선 :  일반적인 경우 <br>
|-- 6. 2호선 -> 1호선 :  일반적인 경우 <br>


---

