//
//  EntrolController.swift
//  SafeZone
//
//  Created by Machintos-HD on 2/14/19.
//  Copyright © 2019 safezone. All rights reserved.
//

import UIKit
import SwiftSpinner
import CoreMotion
import Alamofire
import BHPhotoView


class EntrolController: UIViewController {

    
    @IBOutlet weak var patterOne: UIButton!
    @IBOutlet weak var patterTwo: UIButton!
    @IBOutlet weak var patterThree: UIButton!
    @IBOutlet weak var patterFour: UIButton!
    
    @IBOutlet weak var numberOne: UIButton!
    
    @IBOutlet weak var numberTwo: UIButton!
    
    @IBOutlet weak var numberThree: UIButton!
    
    @IBOutlet weak var numberFour: UIButton!
    
    @IBOutlet weak var numberFive: UIButton!
    @IBOutlet weak var numberSix: UIButton!
    
    @IBOutlet weak var numberSeven: UIButton!
    
    @IBOutlet weak var numberEight: UIButton!
    
    @IBOutlet weak var numberNine: UIButton!
    
    @IBOutlet weak var numberZero: UIButton!
    
    
    @IBOutlet weak var inform: UILabel!
    
    @IBOutlet weak var photoView: BHPhotoView!
    
    let altimeter = CMAltimeter()
    
    var array = [0]
    var timer = Timer()
    var timeArray = [0]
    var seconds = 0
    var count  = 0
    var face_image : UIImage!
    var arrayPressure : [Float] = [0.0]
    var pressure : Float = 0.0
    
    var passCode : [String : [Int]] = ["0" : [0]]
    var timeData : [String : [Int]] = ["0" : [0]]
    
    @IBAction func cancelBtn(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    
    @IBAction func passCodeHandleBtn(_ sender: UIButton) {
        
        
        if array.count == 1 {
            runTimer()
            print("find")
            array.append(sender.tag)
            arrayPressure.append(pressure)
            self.patterOne.backgroundColor =  UIColor.white
           
        } else {
            if array.count == 3 {
                timer.invalidate()
                timeArray.append(seconds)
                seconds = 0
                runTimer()
                self.patterThree.backgroundColor =  UIColor.white
                array.append(sender.tag)
                arrayPressure.append(pressure)
                
                
            } else if  array.count == 4 {
                self.patterFour.backgroundColor =  UIColor.white
                
                
                timer.invalidate()
                timeArray.append(seconds)
                arrayPressure.append(pressure)
               
                if count <= 3 {
                    
                    array.append(sender.tag)
                    count += 1
                    passCode[String(count)] = array
                    timeData[String(count)] = timeArray
                    array = [0]
                    timeArray = [0]
                    
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                        self.patterOne.backgroundColor =  UIColor.clear
                        self.patterTwo.backgroundColor = UIColor.clear
                        self.patterThree.backgroundColor = UIColor.clear
                        self.patterFour.backgroundColor = UIColor.clear
                    }
                   
                    
                    if count == 1 {
                        inform.text = "Please enrol two more times"
                        inform.textColor = UIColor.orange
                         SwiftSpinner.show(duration: 1.0, title: "Trainning")
                    }
                    
                    if count == 2 {
                        
                        if passCode["1"] != passCode ["2"] {
                            count -= 2
                            print(count,"hello")
                            print(array)
                            array.remove(at: count)
                            array = [0]
                            timeArray = [0]
                            inform.text = "Your pass code not match"
                            inform.textColor = UIColor.red
                            return
                        } else {
                            inform.text = "Please enrol one more times"
                            inform.textColor = UIColor.orange
                            SwiftSpinner.show(duration: 1.0, title: "Trainning")
                        }
                       
                    }
                    
                    if count == 3 {
                        if passCode["2"] != passCode ["3"] {
                            count -= 3
                            array.remove(at: count)
                            array = [0]
                            timeArray = [0]
                            inform.text = "Your pass code not match"
                            inform.textColor = UIColor.red

                            self.patterOne.backgroundColor =  UIColor.clear
                            self.patterTwo.backgroundColor = UIColor.clear
                            self.patterThree.backgroundColor = UIColor.clear
                            self.patterFour.backgroundColor = UIColor.clear
                            return
                        } else {
                            SwiftSpinner.show(duration: 10.0, title: "Validation")
                            self.inform.text = "Succesful Enrolment"
                            self.inform.textColor = UIColor.green
                            timeData.removeValue(forKey: "0")
                            passCode["3"]?.remove(at: 0)
                            
                            
                           
                            timeData["1"]?.remove(at: 0)
                            let timeone = timeData["1"] as! [Int]
                            let timeoneStringArray = timeone.map{String($0)}
                            
                            timeData["2"]?.remove(at: 0)
                            let timetwo = timeData["2"] as! [Int]
                            let timetwoStringArray = timetwo.map{String($0)}
                           
                            
                            timeData["3"]?.remove(at: 0)
                            let timethree = timeData["3"] as! [Int]
                            let timethreeStringArray = timethree.map{String($0)}
                           
                    
                            let passcodes = passCode["3"] as! [Int]
                            let passcodeArray = passcodes.map { String($0) }
                            self.photoView.capturePhoto()
                            arrayPressure.remove(at: 0)
                            let pressures = arrayPressure.map { String($0) }
                            
                            
                            
                        
                            DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) { // Change `2.0` to the desired
                                
                                self.EntrolRequest(pressures :pressures.joined(separator: ",") ,passCode:passcodeArray.joined(separator: "") , timethree: timethreeStringArray.joined(separator: ","), timetwo: timetwoStringArray.joined(separator: ","), timeone: timeoneStringArray.joined(separator: ",")) { (status, mes) in
                                    
                                    if status {
                                        login = true
                                        
                                        let customAlert = self.storyboard?.instantiateViewController(withIdentifier: "dashboard") as! DashboardController
                                        customAlert.providesPresentationContextTransitionStyle = true
                                        customAlert.definesPresentationContext = true
                                        customAlert.modalPresentationStyle = UIModalPresentationStyle.overCurrentContext
                                        customAlert.modalTransitionStyle = UIModalTransitionStyle.crossDissolve
                                        //                customAlert.delegate = self
                                        self.present(customAlert, animated: true, completion: nil)
                                    } else {
                                        self.PresentAlertController(title: "Error", message: msg, actionTitle: "Okay")
                                    }
 
                                   
                                    
                                }
                            }
                            
                            
                           
                            
                            
                        }

                        count = 0
                    }
                    
                  
                    
                   
                    
                }
                
                
                
            } else {
                timer.invalidate()
                timeArray.append(seconds)
                 arrayPressure.append(pressure)
                seconds = 0
                runTimer()
                array.append(sender.tag)
                self.patterTwo.backgroundColor =  UIColor.white
            }
            
        }
        
        
        
        
    }
    
    
    func runTimer() {
        timer = Timer.scheduledTimer(timeInterval: 0.001, target: self,   selector: (#selector(updateTimer)), userInfo: nil, repeats: true)
    }
    
    @objc func updateTimer() {
        seconds += 1     //This will decrement(count down)the seconds.
    }

    

}


extension EntrolController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        passCodeBtnSetup()
        self.photoView.delegate = self
        self.photoView.cameraPosition = .front
        self.photoView.start()
        
        if CMAltimeter.isRelativeAltitudeAvailable() {
            altimeter.startRelativeAltitudeUpdates(to: OperationQueue.current!, withHandler: { data, error in
                if !(error != nil) {
                    self.pressure = data?.pressure as! Float
                }
            })
        }
        
        
        
    }
    
    
    
    
}


extension EntrolController {
    func passCodeBtnSetup() {
        self.patterOne.layer.borderWidth = 1
        self.patterOne.layer.borderColor = UIColor.white.cgColor
        self.patterTwo.layer.borderWidth = 1
        self.patterTwo.layer.borderColor = UIColor.white.cgColor
        self.patterThree.layer.borderWidth = 1
        self.patterThree.layer.borderColor = UIColor.white.cgColor
        self.patterFour.layer.borderWidth = 1
        self.patterFour.layer.borderColor = UIColor.white.cgColor
        
        
        
    }
}


extension EntrolController {
    
    func EntrolRequest( pressures : String ,passCode  : String ,timethree : String,timetwo :String,timeone: String,completionHandler: @escaping (Bool,String) -> Void) {
        
         let number = Int.random(in: 0 ..< 10000)
     
        let url =  URL(string:"http://35.237.41.129:8000/api/user/1/entrol_user/")!
        let headers: HTTPHeaders = [
            "Content-type": "multipart/form-data",
            "Authorization": "Token 91f051bb4cdb7ed8f4192a7022127079a047f35d"
        ]
        let parameters = ["pressures":pressures ,"passcode":passCode,"timeone":timeone,"timetwo":timetwo,"timethree":timethree]
        
        let imageToUploadURL1 =  UIComponnetHelper.resizeImage(image: face_image, targetSize:  CGSize(width: 800.0, height: 800.0))
        
        Alamofire.upload(multipartFormData: { (multipartFormData) in
            
            multipartFormData.append(imageToUploadURL1.pngData()!, withName: "face", fileName: "/\(String(number)).png", mimeType: "image/png")

            
            for (key, val) in parameters {
                multipartFormData.append(val.data(using: String.Encoding.utf8)!, withName: key)
            }
            
        
            
        }, to: url,method: .post, headers: headers)
        { (result) in
            switch result {
            case .success(let upload, _, _):
                upload.responseJSON { response in
                    
                    if response.result.isSuccess {
                        
                        do {
                            
                           
                            
                            completionHandler(true,"okay")
                            
                        } catch {
                            
                        }
                        
                    } else {
                        completionHandler(false,msg)
                        
                    }
                    
                }
            case .failure(let encodingError):
                
                completionHandler(false,encodingError.localizedDescription)
            }
            
        }
        
        
    }
   
}


extension EntrolController: BHPhotoViewDelegate {
    func onPhotoCaptured(_ view: BHPhotoView, photo: UIImage) {
        // when photo has been taken, this method will be called.
       
        face_image = photo
        
       

    }
    
    func onPhotoCapturingError(_ view: BHPhotoView, error: BHPhotoViewError) {
        // if some error occurs, this method has been called.
    }
}
