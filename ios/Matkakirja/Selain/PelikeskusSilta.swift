import GameKit
import UIKit

/// Game Center: saavutukset ja pelaajan tunnus.
///
/// Peli ei tarvitse Game Centeriä toimiakseen eikä saa tarvita: kuori on
/// yksi jakelutie muiden joukossa, ja selaimessa pelattaessa Game Centeriä
/// ei ole lainkaan. Siksi kaikki tämän sillan virheet ovat hiljaisia —
/// lupaus ratkeaa aina, ja vastauksessa kerrotaan mitä tapahtui. Pelin ei
/// pidä koskaan näyttää pelaajalle "Game Center -kirjautuminen epäonnistui".
///
/// Saavutustunnukset ovat vapaita merkkijonoja (esimerkiksi
/// `aarre.lontoo` tai `matka.maailman.ymparu`). Ne on luotava käsin App
/// Store Connectissa samoilla tunnuksilla, muuten `saavutus`-kutsu
/// palauttaa "tuntematon". Ks. ios/OHJE.md.
final class PelikeskusSilta: NSObject {

    weak var tapahtumat: SiltaTapahtumat?
    /// Näkymä, jonka kautta Game Centerin ruudut esitetään.
    weak var nakyma: UIView?

    /// Kesken oleva kirjautumispyyntö. Kirjautuminen voi kysyä pelaajalta
    /// tunnuksia omassa ikkunassaan, eikä siitä palata ennen kuin pelaaja
    /// on tehnyt jotain — tai jättänyt tekemättä.
    private var kirjautumisVastaus: ((Any?, String?) -> Void)?
    private var kirjautuminenKaynnissa = false

    /// Kuinka kauan kirjautumista odotetaan ennen kuin peli päästetään
    /// jatkamaan. Pelaaja voi jättää Applen ikkunan auki ja mennä pois;
    /// ilman katkaisua pelin lupaus ei ratkeaisi koskaan.
    private static let odotusraja: TimeInterval = 60

    // MARK: - Kirjautuminen

    func kirjaudu(vastaus: @escaping (Any?, String?) -> Void) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else {
                vastaus(["kirjautunut": false, "syy": "kuori suljettiin"], nil)
                return
            }
            let pelaaja = GKLocalPlayer.local
            if pelaaja.isAuthenticated {
                vastaus(self.tilanne(), nil)
                return
            }
            guard !self.kirjautuminenKaynnissa else {
                vastaus(["kirjautunut": false, "syy": "kirjautuminen on jo käynnissä"], nil)
                return
            }
            self.kirjautuminenKaynnissa = true
            self.kirjautumisVastaus = vastaus

            // Kahva jää elämään koko sovelluksen ajaksi: Game Center kutsuu
            // sitä uudestaan aina kun kirjautumistila muuttuu.
            pelaaja.authenticateHandler = { [weak self] ohjain, virhe in
                DispatchQueue.main.async {
                    guard let self = self else { return }
                    if let ohjain = ohjain {
                        // Apple haluaa näyttää oman kirjautumisikkunansa.
                        self.esita(ohjain)
                        return
                    }
                    self.ratkaiseKirjautuminen(virhe: virhe)
                }
            }

            DispatchQueue.main.asyncAfter(deadline: .now() + PelikeskusSilta.odotusraja) { [weak self] in
                guard let self = self, self.kirjautuminenKaynnissa else { return }
                self.ratkaiseKirjautuminen(virhe: nil)
            }
        }
    }

    private func ratkaiseKirjautuminen(virhe: Error?) {
        guard kirjautuminenKaynnissa else { return }
        kirjautuminenKaynnissa = false
        let vastaus = kirjautumisVastaus
        kirjautumisVastaus = nil

        var tiedot = tilanne()
        if let virhe = virhe {
            tiedot["syy"] = virhe.localizedDescription
        }
        vastaus?(tiedot, nil)
        tapahtumat?.siltaLahetti(laji: "pelikeskus-tila", tiedot: tiedot)
    }

    private func tilanne() -> [String: Any] {
        let pelaaja = GKLocalPlayer.local
        return [
            "kirjautunut": pelaaja.isAuthenticated,
            "nimi": pelaaja.isAuthenticated ? pelaaja.alias : "",
            "tunnus": pelaaja.isAuthenticated ? pelaaja.gamePlayerID : "",
            "syy": ""
        ]
    }

    // MARK: - Saavutukset

    /// Merkitsee saavutuksen. Oletus on 100 % eli "tehty", mutta
    /// prosenttiosuuden voi antaa, jos saavutus karttuu vähitellen
    /// (esimerkiksi "kymmenen aarretta löydetty").
    func saavutus(tunnus: String, prosentti: Double?, vastaus: @escaping (Any?, String?) -> Void) {
        let siisti = tunnus.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !siisti.isEmpty else {
            vastaus(nil, "Saavutuksen tunnus puuttuu")
            return
        }
        guard GKLocalPlayer.local.isAuthenticated else {
            // Ei virhe: pelaaja voi pelata koko pelin kirjautumatta.
            vastaus(["tila": "ei-kirjautunut", "tunnus": siisti], nil)
            return
        }

        let osuus = min(max(prosentti ?? 100, 0), 100)
        let merkinta = GKAchievement(identifier: siisti)
        merkinta.percentComplete = osuus
        merkinta.showsCompletionBanner = true

        GKAchievement.report([merkinta]) { virhe in
            DispatchQueue.main.async {
                if let virhe = virhe {
                    // Yleisin syy: tunnusta ei ole luotu App Store
                    // Connectissa. Sekään ei ole pelin vika eikä pelaajan.
                    vastaus(["tila": "hylatty",
                             "tunnus": siisti,
                             "osuus": osuus,
                             "syy": virhe.localizedDescription], nil)
                    return
                }
                vastaus(["tila": "kirjattu", "tunnus": siisti, "osuus": osuus], nil)
            }
        }
    }

    // MARK: - Game Centerin ruutu

    /// Avaa Game Centerin saavutusnäkymän. Käytössä on oma ohjain eikä
    /// GKAccessPoint: pääsypistettä ei ole tässä kuoressa näkyvissä, ja sen
    /// laukaiseminen piilotettuna on epäluotettavaa.
    func nayta(vastaus: @escaping (Any?, String?) -> Void) {
        DispatchQueue.main.async { [weak self] in
            guard GKLocalPlayer.local.isAuthenticated else {
                vastaus(["tila": "ei-kirjautunut"], nil)
                return
            }
            guard let self = self, let ankkuri = self.nakyma,
                  let esittaja = PelikeskusSilta.esittavaOhjain(ankkuri) else {
                vastaus(["tila": "ei-tilaa"], nil)
                return
            }
            let ohjain = GKGameCenterViewController(state: .achievements)
            ohjain.gameCenterDelegate = self
            esittaja.present(ohjain, animated: true)
            vastaus(["tila": "avattu"], nil)
        }
    }

    private func esita(_ ohjain: UIViewController) {
        guard let ankkuri = nakyma, let esittaja = PelikeskusSilta.esittavaOhjain(ankkuri) else {
            // Ruutua ei ole: kirjautuminen jää tekemättä, mutta hiljaa.
            ratkaiseKirjautuminen(virhe: nil)
            return
        }
        // iPad: Applen oma ikkuna hoitaa ankkurointinsa itse, mutta popoveriksi
        // asettuva ohjain kaatuisi ilman lähdenäkymää.
        if let popover = ohjain.popoverPresentationController {
            popover.sourceView = ankkuri
            popover.sourceRect = CGRect(x: ankkuri.bounds.midX,
                                        y: ankkuri.bounds.midY,
                                        width: 1,
                                        height: 1)
            popover.permittedArrowDirections = []
        }
        esittaja.present(ohjain, animated: true)
    }

    private static func esittavaOhjain(_ nakyma: UIView) -> UIViewController? {
        var ohjain = nakyma.window?.rootViewController
        while let seuraava = ohjain?.presentedViewController {
            ohjain = seuraava
        }
        return ohjain
    }
}

// MARK: - Game Centerin ruudun sulkeminen

extension PelikeskusSilta: GKGameCenterControllerDelegate {

    func gameCenterViewControllerDidFinish(_ gameCenterViewController: GKGameCenterViewController) {
        gameCenterViewController.dismiss(animated: true) { [weak self] in
            self?.tapahtumat?.siltaLahetti(laji: "pelikeskus-suljettiin", tiedot: [:])
        }
    }
}
