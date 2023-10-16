---
layout:     post
title:      "Swift. 지하철 노선도 만들기(초보편) part 2"
subtitle:   "Alert, ScrollView 이용해서 만들기"
date:       2017-10-15 16:26:00
author:     "MinJun"
comments: true
tags: [Swift]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/blog-bg_sub_1.jpg
thumbnail-img: /assets/post_img/background/blog-bg_sub_1.jpg
share-img: /assets/post_img/background/blog-bg_sub_1.jpg
---

[Part 2 프로젝트 파일의 위치는 이곳 입니다.](https://github.com/devmjun/iOS_Develop5/tree/master/Projects/CreatSubWay-ver2)

---

## Model 변경 

```swift
struct Station{
    var name: String
    var x: Int
    var y: Int
    var stationTimes: [(sIndex: Int,time: Int)]
    let width: Int = 20
    let height: Int = 20
    func getCGRect() -> CGRect {
        return CGRect(x: x, y: y, width: width, height: height)
    }
    
    static let sn = [
        "안지랑","현충로","영대병원", "교대", "명덕", "반월당",
        "중앙로", "대구역", "칠성시장", "신천", "동대구역",
        "감삼", "두류", "내당", "반고개", "신남",
        "경대병원", "대구은행", "범어","수성구청","만촌"]      //12
    
    static let stations: [Station] = [
        //0
        Station(name: "안지랑", x: 400, y: 470, stationTimes: [
            (sn.index(of: "현충로")!,1)
            ]),
        //1
        Station(name: "현충로", x: 440, y: 455, stationTimes: [
            (sn.index(of: "안지랑")!,1),
            (sn.index(of: "영대병원")!,2)
            ]),
        //2
        Station(name: "영대병원", x: 465, y: 430, stationTimes: [
            (sn.index(of: "현충로")!,2),
            (sn.index(of: "교대")!,3)]),
        //3
        Station(name: "교대", x: 486, y: 410, stationTimes: [
            (sn.index(of: "영대병원")!,3),
            (sn.index(of: "명덕")!,4)]
        ),
        //4
        Station(name: "명덕", x: 515, y: 380, stationTimes: [
            (sn.index(of: "교대")!,4),
            (sn.index(of: "반월당")!,3)]),
        
        //5
        Station(name: "반월당", x: 575, y: 320, stationTimes: [
            (sn.index(of: "명덕")!,3),
            (sn.index(of: "중앙로")!,3),
            (sn.index(of: "신남")!,3),
            (sn.index(of: "경대병원")!,3)]),
        
        //6
        Station(name: "중앙로", x: 610, y: 290, stationTimes: [
            (sn.index(of: "반월당")!,3),
            (sn.index(of: "대구역")!,4)]),
        
        //7
        Station(name: "대구역", x: 640, y: 265, stationTimes: [
            (sn.index(of: "중앙로")!,4),
            (sn.index(of: "칠성시장")!,3)]),
        
        //8
        Station(name: "칠성시장", x: 690, y: 265, stationTimes: [
            (sn.index(of: "대구역")!,3),
            (sn.index(of: "신천")!,4)]),
        
        //9
        Station(name: "신천", x: 738, y: 265, stationTimes: [
            (sn.index(of: "칠성시장")!,4),
            (sn.index(of: "동대구역")!,3)]),
        
        //10
        Station(name: "동대구역", x: 785, y: 265, stationTimes: [
            (sn.index(of: "신천")!,3)]),
        
        //11
        Station(name: "감삼", x: 785, y: 265, stationTimes: [
            (sn.index(of: "두류")!,3)]),
        
        //12
        Station(name: "두류", x: 738, y: 265, stationTimes: [
            (sn.index(of: "감삼")!,3),
            (sn.index(of: "내당")!,4)]),
        
        //13
        Station(name: "내당", x: 430, y: 320, stationTimes: [
            (sn.index(of: "두류")!,4),
            (sn.index(of: "반고개")!,3)]),
        
        //14
        Station(name: "반고개", x: 475, y: 320, stationTimes: [
            (sn.index(of: "신남")!,4),
            (sn.index(of: "내당")!,3)]),
        
        //15
        Station(name: "신남", x: 545, y: 320, stationTimes: [
            (sn.index(of: "반월당")!,3),
            (sn.index(of: "반고개")!,4)]),
        
        //16
        Station(name: "경대병원", x: 640, y: 320, stationTimes: [
            (sn.index(of: "반월당")!,3),
            (sn.index(of: "대구은행")!,4)]),
        
        //17
        Station(name: "대구은행", x: 680, y: 320, stationTimes: [
            (sn.index(of: "경대병원")!,4),
            (sn.index(of: "범어")!,3)]),
        
        //18
        Station(name: "범어", x: 730, y: 320, stationTimes: [
            (sn.index(of: "대구은행")!,3),
            (sn.index(of: "수성구청")!,4)]),
        
        //19
        Station(name: "수성구청", x: 780, y: 320, stationTimes: [
            (sn.index(of: "범어")!,4),
            (sn.index(of: "만촌")!,3)]),
        
        Station(name: "만촌", x: 830, y: 340, stationTimes: [
            (sn.index(of: "수성구청")!,3)])
    ]
}
```


---

## 각 Button 생성 


```swift
class ViewController: UIViewController, UIScrollViewDelegate {
    var scrollView: UIScrollView!
    var imageView: UIImageView!
    
    // 지하철 역버튼 
    var stationBtns: [UIButton]!
    var btn: UIButton!
    
    // 버튼 클릭 횟수
    var clickBtn = 0
    
   // 출발, 도착역에 대한 Tag값 
    var startStationTag = -1
    var arrivalStationTag = -1
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let frameSize = view.bounds.size
        scrollView = UIScrollView(frame: CGRect(origin: CGPoint.zero, size: frameSize))
        let image = UIImage(named: "deagu.jpeg")
        imageView = UIImageView(image: image)
        scrollView.contentSize = imageView.bounds.size
        //view 에 뿌려주기
        scrollView.addSubview(imageView)
        view.addSubview(scrollView)
        
        /*==========================
                  btn 만들기
            		  각 버튼 위치
	 					버튼 색상, 곡률 지정  
	  			  버튼 imageView 에 추가.
     			 		버튼 기능 연결
				    역 이름 한글 지정
   					tag 값 설정
         ========================*/
        //stationBtns = Array(repeatElement(UIButton(), count: Station.stations.count))
        stationBtns = []
        for i in 0..<Station.stations.count {
            stationBtns.append(UIButton())
            stationBtns[i].frame = Station.stations[i].getCGRect()
            stationBtns[i].backgroundColor = UIColor.black
            stationBtns[i].layer.cornerRadius = 10
            imageView.addSubview(stationBtns[i])
            stationBtns[i].addTarget(self, action: #selector(btnAction(_:)) , for: .touchUpInside)
            stationBtns[i].titleLabel?.text = Station.stations[i].name
            stationBtns[i].tag = i
            print(stationBtns[i].titleLabel?.text, stationBtns[i].tag)
        }
```


---

## 다익스트라 알고리즘 사용 

출발역 -> 도착역에 대한 최단 경로를 계산하기 위해서 사용합니다.


```swift
@objc func btnAction(_ sender: UIButton) {
        let station = Station.stations[sender.tag]
        switch clickBtn {
        case 0:
            /*=======================
             출발역 알럿
             ========================*/
            let popAlert: UIAlertController = UIAlertController(title: "출발 역 은", message: "\(station.name) 입니다", preferredStyle: .alert)
            
            /*=======================
             OK 누르면 출발역 설정
             ========================*/
            let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in 
                // 전역 변수에 출발역 설정
                self.startStationTag = sender.tag
                self.clickBtn += 1
                print("출발역은 \(Station.stations[self.startStationTag].name)")
            })
            
            /*=======================
             cancle 버튼 누르면 출발역 재설정
             ========================*/
            let cancelAlertAction: UIAlertAction = UIAlertAction(title: "Cancel", style: .default, handler: { _ in })
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
        case 1:
            print("도착역을 설정 해주세요 ")
            
            /*=======================
             도착역 설정 알럿
             ========================*/
            let popAlert: UIAlertController = UIAlertController(title: "도착 역 은", message: "\(station.name) 입니다", preferredStyle: .alert)
            
            /*=======================
             도착역 OK 버튼 누르면 예상 시간 반환
             ========================*/
            let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in    
                // 도착역 전역변수에 지정
                self.arrivalStationTag = sender.tag
                print("출발역은 \(Station.stations[self.startStationTag].name), 도착역은 \(Station.stations[self.arrivalStationTag].name) " )
                // 다익스트라
                // 각 역별로 출, 도착 시간을 계산할 표를 만듭니다.
                var calcTable: [(sIndex: Int, timeSum: Int)] = []
                for i in 0..<Station.stations.count {
                    calcTable.append((i,Int.max))
                }
                // 다음역을 계산하기 위해서, 다음역 tag값을 지정하기 위한 변수를 선언 합니다.
                var nextStationTag: Int? = self.startStationTag
                // 환승역 구간같이 여러 갈래가 있는 역에서 반복 연산을 하지 않기 위해서, 이미 접근한 역의 tag 값을 넣습니다. 
                var dicAlreadyCheckStations: [Int] = []
            		// 시작점의 시간은 0 으로 둡니다(이유는, 현재 이 코드의 한계점 때문입니다. 한계점은 뒤에서 설명 하겠습니다)
                calcTable[nextStationTag!].timeSum = 0
                while nextStationTag != nil {
                    //다음역
                    let station = Station.stations[nextStationTag!]
                    let currentStationTime = calcTable[nextStationTag!].timeSum
                    //station을 방문했다고 체크
                    dicAlreadyCheckStations.append(nextStationTag!)
                    // 현재역 -> 다음역 까지 걸리는 시간을 위의 calcTable 에 연산후 작성합니다.
                    for stationTime in station.stationTimes {
                        let ssIndex = stationTime.sIndex
                        let calcTimeSum = (currentStationTime + stationTime.time)
                        if( calcTable[ssIndex].timeSum > calcTimeSum ) {
                            calcTable[ssIndex].timeSum = calcTimeSum
                        }
                    }
                    // 모든역을 방문 하고, 다음역이 더이상 없다면 while 구문을 종료합니다. 
                    nextStationTag = nil
                    var minTime = Int.max // 시작역과 가장 가까운 역의 걸리는 시간 저장
                    for calcTableItem in calcTable { //모든 역 비교
                        print(dicAlreadyCheckStations)
                        //방문한적이 없으면서 시작역과 가장 가까우면(시간)
                        if !dicAlreadyCheckStations.contains(calcTableItem.sIndex) && 
                            minTime > calcTableItem.timeSum { 
                            // 연산할 다음역의 sIndex 지정, 
                            nextStationTag = calcTableItem.sIndex 
                            //시작역과 가장 가까우면(시간)
                            minTime = calcTableItem.timeSum 
                        }
                    }
                }
                let popAlert: UIAlertController = UIAlertController(title: "총 \(calcTable[self.arrivalStationTag].timeSum) 분 소요 됩니다", message:"" , preferredStyle: .alert)
                let okAlertAction: UIAlertAction = UIAlertAction(title: "OK", style: .default, handler: { (alert) in
                    // 모두 리셋
                    self.startStationTag = -1
                    self.arrivalStationTag = -1
                    self.clickBtn = 0
                })
                
                /*=======================
                 결과 알럿 출력
                 ========================*/
                popAlert.addAction(okAlertAction)
                self.present(popAlert, animated: true, completion: nil)
            })
            ///////////////////////위까지 okAlert 범위
            // 도착역 재설정
            let cancelAlertAction: UIAlertAction = UIAlertAction(title: "Cancel", style: .default, handler: { _ in })
            // 출발역  재설정
            let resetStartStation: UIAlertAction = UIAlertAction(title: "ResetStatstation", style: .default, handler: { (alert) in
                self.clickBtn = 0
                self.startStationTag = -1
            })
            // 3. 알럿액션을 알럿 컨트롤러에 연결
            popAlert.addAction(okAlertAction)
            popAlert.addAction(cancelAlertAction)
            popAlert.addAction(resetStartStation)
            // 4. 알럿 뿌려주기
            self.present(popAlert, animated: true, completion: nil)
        default: break
        }
    }
```

---

## 확대/축소 기능 


```swift
    @objc func tapToZoom(_ gestureRecognizer: UIGestureRecognizer) {
        // 더블탭 간단 하게 구현
        if scrollView.zoomScale == CGFloat(1) {
            // 해당 화면의 X,Y 좌표를 이용해서 확대후, 확대 이전의 좌표값 과 연산을 통해서 그 위치로 이동..
            let locationX = gestureRecognizer.location(in: scrollView).x*2.95-90
            let locationY = gestureRecognizer.location(in: scrollView).y*2.95-300
            scrollView.setZoomScale(3, animated: true)
            scrollView.setContentOffset(CGPoint(x: locationX, y: locationY), animated: true)
        }else {
            let locationX = gestureRecognizer.location(in: scrollView).x/2.95-200
            let locationY = gestureRecognizer.location(in: scrollView).y/2.95-250
            scrollView.setZoomScale(1, animated: true)
            scrollView.setContentOffset(CGPoint(x: locationX, y: locationY), animated: true)
        }
    }
```
