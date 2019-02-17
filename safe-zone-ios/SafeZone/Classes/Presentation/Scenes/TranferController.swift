//
//  TranferController.swift
//  SafeZone
//
//  Created by Machintos-HD on 2/16/19.
//  Copyright © 2019 safezone. All rights reserved.
//

import UIKit
import BHPhotoView
import Alamofire
import SwiftSpinner
import SCLAlertView

class TranferController: UIViewController {

    @IBOutlet weak var photoView: BHPhotoView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.photoView.delegate = self
        self.photoView.cameraPosition = .back
        self.photoView.start()

        // Do any additional setup after loading the view.
    }
  
    
    
    @IBAction func logoutBtn(_ sender: Any) {
        let customAlert = self.storyboard?.instantiateViewController(withIdentifier: "dashboard") as! DashboardController
        customAlert.providesPresentationContextTransitionStyle = true
        customAlert.definesPresentationContext = true
        customAlert.modalPresentationStyle = UIModalPresentationStyle.overCurrentContext
        customAlert.modalTransitionStyle = UIModalTransitionStyle.crossDissolve
        //                customAlert.delegate = self
        self.present(customAlert, animated: true, completion: nil)
    }
    
    
    
    @IBAction func sendMoneyBtn(_ sender: Any) {
        
        self.photoView.capturePhoto()
        
    }
    
    
    
    
    
    
    

    

}



extension TranferController: BHPhotoViewDelegate {
    func onPhotoCaptured(_ view: BHPhotoView, photo: UIImage) {
        // when photo has been taken, this method will be called.
        
        
        SwiftSpinner.show(duration: 10.0, title: "Finding...")
        self.findFaceRequest(photo: photo) { (status, msg) in
            
            
            if status {
                let alert = SCLAlertView()
                _ = alert.addTextField("Enter amont")
                alert.addButton("Confirm") {
                    SwiftSpinner.show(duration: 10.0, title: "Sending...")
                    self.sendBTCRequest(sender: "person-id-qdmc-doxkx", reciver: "person-id-qdmc-doxkx", completionHandler: { (statu, msg) in
                        self.PresentAlertController(title: "Send", message: "Successfully", actionTitle: "Okay")
                    })
                    
                }
                
                alert.showEdit( "Transaction", // Title of view
                    subTitle: "Your transaction will process after confirm", // String of view
                    closeButtonTitle: "Cancel", // Duration to show before closing automatically, default: 0.0
                    colorStyle: 0x000000
                    
                    
                )
            } else {
                 self.PresentAlertController(title: "Error", message: msg, actionTitle: "Okay")
                
            }
           
                
        }
        
        
    }
    
    func onPhotoCapturingError(_ view: BHPhotoView, error: BHPhotoViewError) {
        // if some error occurs, this method has been called.
    }
}


extension TranferController {
    
    
    
    
    
    func findFaceRequest( photo: UIImage ,completionHandler: @escaping (Bool,String) -> Void) {
        
        let number = Int.random(in: 0 ..< 10000)
        let url =  URL(string:"http://192.168.8.39:8000/api/user/1/find_face/")!
        let headers: HTTPHeaders = [
            "Content-type": "multipart/form-data",
            "Authorization": "Token 91f051bb4cdb7ed8f4192a7022127079a047f35d"
        ]
        
        let imageToUploadURL1 =  UIComponnetHelper.resizeImage(image: photo, targetSize:  CGSize(width: 800.0, height: 800.0))
        
        let parameters = ["sender":"d","time":"ddd"]
        
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
    
    
    
    func sendBTCRequest( sender : String, reciver : String ,completionHandler: @escaping (Bool,String) -> Void) {
        
        let url =  URL(string:"http://35.237.41.129:8000/api/user/1/send_btc/")!
        let headers: HTTPHeaders = [
            "Content-type": "multipart/form-data",
            "Authorization": "Token 91f051bb4cdb7ed8f4192a7022127079a047f35d"
        ]
        
        let parameters = ["sender":sender ,"reciver" : reciver]
        
        Alamofire.upload(multipartFormData: { (multipartFormData) in
           
            
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
