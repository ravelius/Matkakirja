import UIKit

/// Haptiikka: pelin napautukset ja onnistumiset tuntuvat kädessä.
///
/// Neljä lajia riittää, ja ne on nimetty pelin tapahtumilla eikä Applen
/// tyyleillä: peli pyytää "juhlaa" eikä "raskasta impaktia", jolloin
/// tuntuman voi säätää täällä ilman että pelin koodiin kosketaan.
///
/// Kaksi periaatetta:
///
/// 1. **Ei jonoa.** Haptiikka on palaute hetkeen. Jos pyyntöjä tulee
///    kymmenen sekunnissa, laite yhdistää ne itse — mutta jos ne
///    jonotettaisiin, tärinä jatkuisi vielä kauan tapahtuman jälkeen ja
///    tuntuisi rikkinäiseltä.
/// 2. **Ei virhettä.** iPadissa ja vanhoissa iPhoneissa ei ole Taptic
///    Enginea. Silloin kutsu vain ei tee mitään; peli ei saa hylättyä
///    lupausta eikä joudu tarkistamaan laitemallia.
final class HaptiikkaSilta {

    /// Generaattoreita ei luoda uudestaan joka kutsulla: valmiiksi luotu
    /// generaattori vastaa nopeammin. Näitä kosketaan vain pääsäikeessä,
    /// koska UIKit vaatii sen.
    private lazy var kevyt = UIImpactFeedbackGenerator(style: .light)
    private lazy var keskitaso = UIImpactFeedbackGenerator(style: .medium)
    private lazy var raskas = UIImpactFeedbackGenerator(style: .heavy)
    private lazy var ilmoitus = UINotificationFeedbackGenerator()

    /// Tunnetut lajit. Tuntematon laji ei ole virhe — se ohitetaan, jotta
    /// vanha kuori ei kaadu uuden pelin uudesta lajista.
    static let lajit = ["kevyt", "keskitaso", "onnistui", "juhla"]

    func nayta(laji: String, vastaus: (Any?, String?) -> Void) {
        let tunnettu = HaptiikkaSilta.lajit.contains(laji)
        if tunnettu {
            // Vastaus annetaan heti eikä vasta tärinän jälkeen: peli ei odota
            // haptiikkaa, se vain pyytää sitä siirron ohessa.
            DispatchQueue.main.async { [weak self] in self?.soita(laji) }
        }
        vastaus(["tila": tunnettu ? "ok" : "ohitettu", "laji": laji], nil)
    }

    /// Lämmittää Taptic Enginen. Kutsutaan kun sovellus tulee etualalle:
    /// ensimmäinen napautus tuntuu muuten hitusen myöhässä.
    func lammita() {
        DispatchQueue.main.async { [weak self] in
            self?.kevyt.prepare()
            self?.keskitaso.prepare()
        }
    }

    // MARK: - Toteutus

    private func soita(_ laji: String) {
        switch laji {
        case "kevyt":
            kevyt.impactOccurred()
            kevyt.prepare()

        case "keskitaso":
            keskitaso.impactOccurred()
            keskitaso.prepare()

        case "onnistui":
            ilmoitus.notificationOccurred(.success)
            ilmoitus.prepare()

        case "juhla":
            // Aarre löytyi: onnistumissykäys ja sen perään yksi raskas
            // kumahdus. Väli on lyhyt mutta ei nolla — päällekkäin ne
            // sulautuisivat yhdeksi mitäänsanomattomaksi tärähdykseksi.
            ilmoitus.notificationOccurred(.success)
            raskas.prepare()
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.18) { [weak self] in
                self?.raskas.impactOccurred(intensity: 1.0)
            }

        default:
            break
        }
    }
}
