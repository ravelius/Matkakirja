import Combine
import SwiftUI
import UIKit

/// Matkakirjan iOS-kuori.
///
/// Kuori on tarkoituksella ohut: peli itse on verkkosovellus, joka päivittyy
/// verkosta ilman App Store -kierrosta. Tämä sovellus antaa pelille
/// kokoruudun, äänet, kotivalikon kuvakkeen ja natiivisillat (luenta ja
/// sanelu), joita selain ei tarjoa yhtä hyvin.
@main
struct MatkakirjaSovellus: App {

    @StateObject private var selain = PeliSelain()

    var body: some Scene {
        WindowGroup {
            PeliNakyma(selain: selain)
                .preferredColorScheme(.dark)
                // Sovelluksen palatessa etualalle pyydetään sivua tarkistamaan
                // uusi versio. Käytetään ilmoitusta eikä scenePhasea, koska
                // ilmoitus tulee myös silloin kun sovellus vain herää lukituksesta.
                .onReceive(NotificationCenter.default.publisher(
                    for: UIApplication.didBecomeActiveNotification)) { _ in
                    selain.aktivoitui()
                }
                .onReceive(NotificationCenter.default.publisher(
                    for: UIApplication.willResignActiveNotification)) { _ in
                    selain.siirtyiTaustalle()
                }
        }
    }
}
