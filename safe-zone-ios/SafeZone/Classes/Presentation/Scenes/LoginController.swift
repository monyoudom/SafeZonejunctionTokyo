//
//  LoginController.swift
//  SafeZone
//
//  Created by Machintos-HD on 2/14/19.
//  Copyright © 2019 safezone. All rights reserved.
//

import UIKit
import Alamofire
import BHPhotoView
import SwiftSpinner


class LoginController: UIViewController {
    
    
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
    
    
   
    @IBOutlet weak var photoView: BHPhotoView!
    var face_image : UIImage!
    var array = [0]
    var timer = Timer()
    var timeArray = [0]
    var seconds = 0
}


// App life cycle

extension LoginController {
    override func viewDidLoad() {
        super.viewDidLoad()
        passCodeBtnSetup()
        self.photoView.delegate = self
        self.photoView.cameraPosition = .front
        self.photoView.start()
       
        
    }
}


//Action Button
extension LoginController {
    
    @IBAction func cancelBtn(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func passCodeHandleBtn(_ sender: UIButton) {
       
        if array.count == 1 {
            array.append(sender.tag)
            runTimer()
            self.patterOne.backgroundColor =  UIColor.white
        } else {
            if array.count == 3 {
                 timer.invalidate()
                 timeArray.append(seconds)
                 seconds = 0
                 runTimer()
                 self.patterThree.backgroundColor =  UIColor.white
                
                array.append(sender.tag)
            } else if  array.count == 4 {
                timer.invalidate()
                timeArray.append(seconds)
                self.patterFour.backgroundColor =  UIColor.white
                array.append(sender.tag)
                array.remove(at: 0)
                timeArray.remove(at: 0)
                let timeStringArray = timeArray.map{String($0)}
                let passCodeArray = array.map{String($0)}
                array = [0]
                timeArray = [0]
                self.patterOne.backgroundColor =  UIColor.clear
                self.patterTwo.backgroundColor = UIColor.clear
                self.patterThree.backgroundColor = UIColor.clear
                self.patterFour.backgroundColor = UIColor.clear
                SwiftSpinner.show("login...")
                self.photoView.capturePhoto()
                DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) { // Change `2.0` to the desired
                    self.LoginRequest(passCode:passCodeArray.joined(separator: "") , time: timeStringArray.joined(separator: ",")) { (status, msg) in
                        SwiftSpinner.hide()
                        
                        if status {
                            let customAlert = self.storyboard?.instantiateViewController(withIdentifier: "tranfer") as! TranferController
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
                
               
                
                
                
                
                
            } else {
                timer.invalidate()
                timeArray.append(seconds)
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

extension LoginController {
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

extension LoginController {
    
    func LoginRequest( passCode  : String ,time : String,completionHandler: @escaping (Bool,String) -> Void) {
        
        let number = Int.random(in: 0 ..< 10000)
        let url =  URL(string:"http://35.237.41.129:8000/api/user/1/login/")!
        let headers: HTTPHeaders = [
            "Content-type": "multipart/form-data",
            "Authorization": "Token 91f051bb4cdb7ed8f4192a7022127079a047f35d"
        ]
        let parameters = ["passcode" : passCode,"time" : time]
        
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
                            
                            let jsonRespone = try JSONSerialization.jsonObject(with: response.data!) as! NSDictionary
                           
                            print(jsonRespone,"data+++")
                            
                            if (jsonRespone["status"] as! String == "false") {
                                 completionHandler(false,jsonRespone["msg"] as! String )
                            } else {
                                completionHandler(true, "done" )
                            }
                            
                            
                        } catch {
                            completionHandler(false,"fail to send the request")
                        }
                        
                    } else {
                        completionHandler(false,"fail to send the request")
                        
                    }
                    
                }
            case .failure(let encodingError):
                
                completionHandler(false,encodingError.localizedDescription)
            }
            
        }
        
        
    }
    
}



extension LoginController: BHPhotoViewDelegate {
    func onPhotoCaptured(_ view: BHPhotoView, photo: UIImage) {
        // when photo has been taken, this method will be called.
        
        face_image = photo
        
        
        
    }
    
    func onPhotoCapturingError(_ view: BHPhotoView, error: BHPhotoViewError) {
        // if some error occurs, this method has been called.
    }
}





    
   
    
    
    
    



