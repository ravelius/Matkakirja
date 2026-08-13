import Combine
import SwiftUI
import UIKit

/// Matkakirjan iOS-kuori.
///
/// Kuori on tarkoituksella ohut: peli itse on verkkosovellus, joka päivittyy
/// verkosta ilman App Store -kierrosta. Tämä sovellus antaa pelille
/// kokoruudun, äänet, kotivalikon kuvakkeen ja natiivisillat (luenta,
/// sanelu, tallennussynkka, haptiikka, jako, Game Center, widget-data ja
/// ilmoitusrekisteröinti), joita selain ei tarjoa yhtä hyvin — tai
/// lainkaan.
@main
struct MatkakirjaSovellus: App {

    /// UIKit-delegaatti tarvitaan yhteen asiaan: APNs antaa push-tunnuksen
    /// vain sitä kautta. SwiftUI:n omaa vastinetta tälle ei ole.
    @UIApplicationDelegateAdaptor(SovellusAsiamies.self) private var asiamies

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

/// Sovelluksen UIKit-delegaatti.
///
/// Tämä on tarkoituksella lähes tyhjä. Ainoa tehtävä on ottaa vastaan
/// APNs-rekisteröinnin tulos ja antaa se ilmoitussillalle, joka välittää
/// sen pelille. Kaikki muu elää SwiftUI:n puolella.
final class SovellusAsiamies: NSObject, UIApplicationDelegate {

    /// APNs antoi laitetunnuksen. Tunnus menee pelille tapahtumana
    /// `ilmoitukset-token`; kuori ei talleta sitä minnekään.
    func application(_ application: UIApplication,
                     didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        IlmoitusSilta.jaettu.tallennaToken(deviceToken)
    }

    /// Rekisteröinti ei onnistunut. Tavallisin syy on simulaattori tai
    /// katkennut verkko — kumpikaan ei ansaitse ilmoitusta pelaajalle.
    func application(_ application: UIApplication,
                     didFailToRegisterForRemoteNotificationsWithError error: Error) {
        IlmoitusSilta.jaettu.rekisterointiEpaonnistui(error)
    }
}
