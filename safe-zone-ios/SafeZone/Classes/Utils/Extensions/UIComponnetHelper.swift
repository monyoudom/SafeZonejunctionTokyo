

import Foundation
import UIKit


class UIComponnetHelper {
    
    
   
    
    static func MakeBtnWhiteBorder(button: UIButton, color: UIColor) {
        button.layer.borderWidth = 1
        button.layer.borderColor = color.cgColor
        button.layer.cornerRadius = 20
        
    }
    
    static func resizeImage(image: UIImage, targetSize: CGSize) -> UIImage {
        let size = image.size
        
        let widthRatio  = targetSize.width  / size.width
        let heightRatio = targetSize.height / size.height
        
        // Figure out what our orientation is, and use that to form the rectangle
        var newSize: CGSize
        if(widthRatio > heightRatio) {
            
            
            newSize = CGSize(width: size.width * heightRatio, height: size.height * heightRatio)
        } else {
            
            
            newSize = CGSize(width: size.width * widthRatio, height:size.height * widthRatio)
        }
        
        // This is the rect that we've calculated out and this is what is actually used below
        let rect =  CGRect(x: 0, y: 0, width: newSize.width, height: newSize.height)
        
        
        // Actually do the resizing to the rect using the ImageContext stuff
        UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
        image.draw(in: rect)
        let newImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return newImage!
    }
    
    
   
    
    
    
}

extension UITextField {
    
    func setBottomLine(borderColor: UIColor) {
        
        self.borderStyle = UITextField.BorderStyle.none
        self.backgroundColor = UIColor.clear
        let borderLine = UIView()
        let height = 1.0
        borderLine.frame = CGRect(x: 0, y: Double(self.frame.height) - height, width: Double(self.frame.width), height: height)
        borderLine.backgroundColor = borderColor
        self.addSubview(borderLine)
    }
    
}


extension UIViewController {
    
    func PresentAlertController(title: String, message: String, actionTitle: String) {
        let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
        let alertAction = UIAlertAction(title: actionTitle, style: .default, handler: nil)
        
        alertController.addAction(alertAction)
        
        self.present(alertController, animated: true, completion: nil)
    }
    
}

extension URLRequest {
    
    static func jsonRequest(url: URL) -> URLRequest {
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("safezone", forHTTPHeaderField: "authorization-key")
        return request
    }
    
}


