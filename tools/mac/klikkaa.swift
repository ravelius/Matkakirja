import Foundation
import CoreGraphics
let a = CommandLine.arguments
guard a.count >= 3, let x = Double(a[1]), let y = Double(a[2]) else { print("usage: click x y"); exit(1) }
let p = CGPoint(x: x, y: y)
let mv = CGEvent(mouseEventSource: nil, mouseType: .mouseMoved, mouseCursorPosition: p, mouseButton: .left)
mv?.post(tap: .cghidEventTap); usleep(80000)
let d = CGEvent(mouseEventSource: nil, mouseType: .leftMouseDown, mouseCursorPosition: p, mouseButton: .left)
let u = CGEvent(mouseEventSource: nil, mouseType: .leftMouseUp, mouseCursorPosition: p, mouseButton: .left)
d?.post(tap: .cghidEventTap); usleep(60000); u?.post(tap: .cghidEventTap)
print("clicked \(x),\(y)")
