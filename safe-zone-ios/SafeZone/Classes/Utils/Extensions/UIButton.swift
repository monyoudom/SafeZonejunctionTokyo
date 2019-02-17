
import UIKit



class customButton : UIButton{
    
    func touchesMoved(touches: Set<UITouch>, withEvent event: UIEvent?) {
        for touch in touches{
            print("% Touch pressure: \(touch.force/touch.maximumPossibleForce)");
        }
    }
    
    func touchesEnded(touches: Set<UITouch>, withEvent event: UIEvent?) {
        print("Touches End")
    }
}
