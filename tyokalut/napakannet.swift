// Tekee pallon pohjakerroksen: pelin tasakulmainen z4-pallotekstuuri pienennettynä,
// ja navat (|lat| > raja) täytettynä verkkopelin napakansien sävyillä
// (js/pallo.js NAPAKANSI_POHJOINEN #c9c2af, NAPAKANSI_ETELA #dcd6c6). Kansi liukuu
// kuvaan häiveellä, joten Mercator-laattojen rajalle (85°) ei jää reunaa.
//
// Käyttö: swift napakannet.swift <lähde.jpg> <kohde.jpg> [leveys=2048]
import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

let a = CommandLine.arguments
guard a.count >= 3 else { print("käyttö: napakannet.swift <lähde> <kohde> [leveys]"); exit(1) }
let leveys = a.count > 3 ? Int(a[3])! : 2048
let korkeus = leveys / 2
let raja = 83.5, haive = 1.5   // kansi alkaa 83,5°:sta ja on täysi 85°:ssa

let lahde = CGImageSourceCreateWithURL(URL(fileURLWithPath: a[1]) as CFURL, nil)!
let kuva = CGImageSourceCreateImageAtIndex(lahde, 0, nil)!
let tila = CGColorSpaceCreateDeviceRGB()
let ctx = CGContext(data: nil, width: leveys, height: korkeus, bitsPerComponent: 8, bytesPerRow: leveys * 4,
                    space: tila, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
ctx.interpolationQuality = .high
ctx.draw(kuva, in: CGRect(x: 0, y: 0, width: leveys, height: korkeus))
let p = ctx.data!.bindMemory(to: UInt8.self, capacity: leveys * korkeus * 4)

let pohjoinen: [Double] = [0xc9, 0xc2, 0xaf], etela: [Double] = [0xdc, 0xd6, 0xc6]
for y in 0..<korkeus {
    // Rivi 0 on kuvan yläreuna = 90° N.
    let lat = 90.0 - (Double(y) + 0.5) * 180.0 / Double(korkeus)
    let t = min(1.0, max(0.0, (abs(lat) - raja) / haive))
    if t <= 0 { continue }
    let v = lat > 0 ? pohjoinen : etela
    for x in 0..<leveys {
        let i = (y * leveys + x) * 4
        for c in 0..<3 { p[i + c] = UInt8((Double(p[i + c]) * (1 - t) + v[c] * t).rounded()) }
    }
}
let ulos = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[2]) as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(ulos, ctx.makeImage()!, [kCGImageDestinationLossyCompressionQuality: 0.85] as CFDictionary)
CGImageDestinationFinalize(ulos)
print("napakannet: \(leveys)×\(korkeus) → \(a[2])")
