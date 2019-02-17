//
//  ViewController.swift
//  SafeZone
//
//  Created by Machintos-HD on 2/14/19.
//  Copyright © 2019 safezone. All rights reserved.
//

import UIKit


//Class varible
class DashboardController: UIViewController {

    
    @IBOutlet weak var createAccount: UIButton!
    
    
    
}



// APP LYLCLE
extension DashboardController {
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        UIComponnetHelper.MakeBtnWhiteBorder(button: createAccount, color: .white)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        if login {
             self.PresentAlertController(title: "Done", message: "Created account with safezone successfuly", actionTitle: "Okay")
            
        }
    }
    
}


// action btn

extension DashboardController {
    @IBAction func LoginBtn(_ sender: Any) {
        
        let customAlert = self.storyboard?.instantiateViewController(withIdentifier: "login") as! LoginController
        customAlert.providesPresentationContextTransitionStyle = true
        customAlert.definesPresentationContext = true
        customAlert.modalPresentationStyle = UIModalPresentationStyle.overCurrentContext
        customAlert.modalTransitionStyle = UIModalTransitionStyle.crossDissolve
//                customAlert.delegate = self
        self.present(customAlert, animated: true, completion: nil)
        
    }
    
    
    @IBAction func EntrolBtn(_ sender: Any) {
        
        let customAlert = self.storyboard?.instantiateViewController(withIdentifier: "entrol") as! EntrolController
        customAlert.providesPresentationContextTransitionStyle = true
        customAlert.definesPresentationContext = true
        customAlert.modalPresentationStyle = UIModalPresentationStyle.overCurrentContext
        customAlert.modalTransitionStyle = UIModalTransitionStyle.crossDissolve
        //                customAlert.delegate = self
        self.present(customAlert, animated: true, completion: nil)
        
    }
    
}

