import Foundation
import UIKit
import WebKit

/// Sillan tapahtumat sivulle päin.
protocol SiltaTapahtumat: AnyObject {
    func siltaLahetti(laji: String, tiedot: [String: Any])
}

/// Natiivisillat pelille: `window.matkakirjaNatiivi`.
///
/// Yksi viestikanava, jonka takana on joukko palveluita — luenta, sanelu,
/// tallennussynkka, haptiikka, jako, Game Center, widget-data ja
/// ilmoitusrekisteröinti. Sivu lähettää komennon ja saa lupauksen
/// (WKScriptMessageHandlerWithReply); pitkäkestoiset asiat, kuten sanelun
/// osittaiset tulokset tai iCloudin muutokset, tulevat tapahtumina takaisin.
///
/// Rajapinta on tarkoituksella pelin oma eikä Applen: kun SFSpeechRecognizer
/// joskus vaihtuu SpeechAnalyzeriin, pelin koodiin ei tarvitse koskea.
///
/// Yksi sääntö kaikille silloille: **vastaus tulee aina**. Puuttuva
/// ominaisuus, kieltäytynyt pelaaja tai kaatunut palvelu vastaa siitä
/// kertovalla tilalla eikä hylätyllä lupauksella — hylkäys varataan
/// oikeille virheille (väärä parametri, liian iso tallennus).
final class NatiiviSilta: NSObject, WKScriptMessageHandlerWithReply, SiltaTapahtumat {

    /// Viestikanavan nimi. Sama nimi on natiivi-silta.js:ssä.
    static let kanava = "matkakirjaNatiivi"
    /// Oletuskieli, kun sivu ei kerro parempaa.
    static let oletuskieli = "fi-FI"

    /// Selain, jolle tapahtumat lähetetään ja jonka päälle jako- ja
    /// Game Center -ikkunat ankkuroidaan.
    weak var selain: WKWebView? {
        didSet {
            jako.nakyma = selain
            pelikeskus.nakyma = selain
        }
    }

    private let luenta = LuentaSilta()
    private let sanelu = SaneluSilta()
    private let talle = TalleSilta()
    private let haptiikka = HaptiikkaSilta()
    private let jako = JakoSilta()
    private let pelikeskus = PelikeskusSilta()
    private let widget = WidgetSilta()
    /// Ilmoitussilta on jaettu: APNs-tunnus saapuu UIApplicationDelegaten
    /// kautta, joka ei tiedä tästä oliosta mitään.
    private let ilmoitukset = IlmoitusSilta.jaettu

    override init() {
        super.init()
        luenta.tapahtumat = self
        sanelu.tapahtumat = self
        talle.tapahtumat = self
        pelikeskus.tapahtumat = self
        ilmoitukset.tapahtumat = self
        talle.kaynnista()
    }

    // MARK: - Kytkentä

    func rekisteroi(_ sisalto: WKUserContentController) {
        // 1) Tiedot ensin: siltaskripti lukee nämä pystyyn noustessaan, joten
        //    peli näkee ominaisuudet heti eikä vasta kyselyn jälkeen.
        let tiedotSkripti = "window.__matkakirjaNatiiviTiedot = \(NatiiviSilta.json(tiedot()));"
        sisalto.addUserScript(WKUserScript(source: tiedotSkripti,
                                           injectionTime: .atDocumentStart,
                                           forMainFrameOnly: true))
        // 2) Itse silta.
        if let siltaSkripti = NatiiviSilta.lataaSiltaskripti() {
            sisalto.addUserScript(WKUserScript(source: siltaSkripti,
                                               injectionTime: .atDocumentStart,
                                               forMainFrameOnly: true))
        } else {
            NSLog("Matkakirja: natiivi-silta.js puuttuu sovelluspaketista — sillat eivät ole käytössä")
        }
        sisalto.addScriptMessageHandler(self, contentWorld: .page, name: NatiiviSilta.kanava)
    }

    private static func lataaSiltaskripti() -> String? {
        guard let polku = Bundle.main.url(forResource: "natiivi-silta", withExtension: "js") else { return nil }
        return try? String(contentsOf: polku, encoding: .utf8)
    }

    private func tiedot() -> [String: Any] {
        let versio = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "0"
        return [
            "onkoNatiivi": true,
            "alusta": "ios",
            "versio": Asetukset.sillanVersio,
            "kuorenVersio": versio,
            "jarjestelma": UIDevice.current.systemVersion,
            // Peli kysyy näiltä, mitä se saa käyttää. Vanha kuori ei tunne
            // uusia avaimia, joten pelin on aina luettava puuttuva arvo
            // epätodeksi eikä oletettava mitään.
            "ominaisuudet": [
                "luenta": true,
                "sanelu": SaneluSilta.tuettu(kieli: NatiiviSilta.oletuskieli),
                "luennanKorostus": true,
                "aktivoitumisviesti": true,
                "talle": true,
                // Onko laitteessa iCloud-tili. Varasto toimii ilmankin,
                // mutta silloin vain paikallisesti.
                "talleSynkka": TalleSilta.pilviKaytossa,
                "haptiikka": true,
                "jako": true,
                "pelikeskus": true,
                "widget": JaettuPelitila.varasto != nil,
                // Vain rekisteröinti. Lähetyspäätä ei ole. Ks. IlmoitusSilta.
                "ilmoitukset": true,
                "aikeet": true
            ]
        ]
    }

    // MARK: - Elinkaari

    /// Sovellus palasi etualalle.
    func aktivoitui() {
        talle.synkronoi()
        haptiikka.lammita()
    }

    // MARK: - Komennot sivulta

    func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage,
                               replyHandler: @escaping (Any?, String?) -> Void) {
        guard let runko = message.body as? [String: Any],
              let komento = runko["komento"] as? String else {
            replyHandler(nil, "Viestistä puuttuu komento")
            return
        }
        let data = runko["data"] as? [String: Any] ?? [:]

        switch komento {
        case "tiedot":
            replyHandler(tiedot(), nil)

        case "luenta.puhu":
            guard let teksti = data["teksti"] as? String else {
                replyHandler(nil, "puhu vaatii tekstin")
                return
            }
            let kieli = (data["kieli"] as? String) ?? NatiiviSilta.oletuskieli
            // Sanelu ja luenta eivät voi olla auki yhtä aikaa: mikrofoni
            // kuulisi oman äänen ja tunnistaisi sen pelaajan puheeksi.
            sanelu.keskeyta()
            luenta.puhu(teksti: teksti,
                        kieli: kieli,
                        nopeus: NatiiviSilta.luku(data["nopeus"]),
                        korkeus: NatiiviSilta.luku(data["korkeus"]),
                        aanenTunnus: data["aani"] as? String,
                        vastaus: replyHandler)

        case "luenta.pysayta":
            luenta.pysayta()
            replyHandler(["tila": "pysaytetty"], nil)

        case "luenta.aanet":
            replyHandler(["aanet": LuentaSilta.aanet(kielelle: data["kieli"] as? String)], nil)

        case "luenta.puhuuko":
            replyHandler(["puhuu": luenta.puhuu], nil)

        case "sanelu.aloita":
            let kieli = (data["kieli"] as? String) ?? NatiiviSilta.oletuskieli
            luenta.pysayta()
            sanelu.aloita(kieli: kieli,
                          laitteessa: data["laitteessa"] as? Bool,
                          vastaus: replyHandler)

        case "sanelu.lopeta":
            sanelu.lopeta(vastaus: replyHandler)

        case "sanelu.luvat":
            sanelu.luvat(vastaus: replyHandler)

        case "sanelu.kuunteleeko":
            replyHandler(["kuuntelee": sanelu.kuuntelee], nil)

        // MARK: Tallennussynkka

        case "talle.vie":
            guard let avain = data["avain"] as? String else {
                replyHandler(nil, "talle.vie vaatii avaimen")
                return
            }
            guard let arvo = data["arvo"] as? String else {
                replyHandler(nil, "talle.vie vaatii arvon merkkijonona — sarjallista tallennus pelin puolella")
                return
            }
            talle.vie(avain: avain,
                      arvo: arvo,
                      aika: NatiiviSilta.luku(data["aika"]),
                      vastaus: replyHandler)

        case "talle.tuo":
            guard let avain = data["avain"] as? String else {
                replyHandler(nil, "talle.tuo vaatii avaimen")
                return
            }
            talle.tuo(avain: avain, vastaus: replyHandler)

        case "talle.poista":
            guard let avain = data["avain"] as? String else {
                replyHandler(nil, "talle.poista vaatii avaimen")
                return
            }
            talle.poista(avain: avain, vastaus: replyHandler)

        case "talle.avaimet":
            talle.avaimet(vastaus: replyHandler)

        // MARK: Haptiikka

        case "haptiikka.nayta":
            haptiikka.nayta(laji: (data["laji"] as? String) ?? "kevyt", vastaus: replyHandler)

        // MARK: Jako

        case "jaa.teksti":
            guard let teksti = data["teksti"] as? String else {
                replyHandler(nil, "jaa.teksti vaatii tekstin")
                return
            }
            jako.teksti(teksti, vastaus: replyHandler)

        case "jaa.kuva":
            guard let osoite = data["kuva"] as? String else {
                replyHandler(nil, "jaa.kuva vaatii data:-osoitteen")
                return
            }
            jako.kuva(dataUrl: osoite, teksti: data["teksti"] as? String, vastaus: replyHandler)

        // MARK: Game Center

        case "pelikeskus.kirjaudu":
            pelikeskus.kirjaudu(vastaus: replyHandler)

        case "pelikeskus.saavutus":
            guard let tunnus = data["tunnus"] as? String else {
                replyHandler(nil, "pelikeskus.saavutus vaatii tunnuksen")
                return
            }
            pelikeskus.saavutus(tunnus: tunnus,
                                prosentti: NatiiviSilta.luku(data["osuus"]),
                                vastaus: replyHandler)

        case "pelikeskus.nayta":
            pelikeskus.nayta(vastaus: replyHandler)

        // MARK: Widget

        case "widget.paivita":
            let tila = (data["tila"] as? [String: Any]) ?? data
            widget.paivita(tila: tila, vastaus: replyHandler)

        case "widget.tyhjenna":
            widget.tyhjenna(vastaus: replyHandler)

        case "widget.lue":
            widget.lue(vastaus: replyHandler)

        // MARK: Ilmoitukset

        case "ilmoitukset.pyydaLupa":
            ilmoitukset.pyydaLupa(vastaus: replyHandler)

        case "ilmoitukset.tila":
            ilmoitukset.tila(vastaus: replyHandler)

        default:
            replyHandler(nil, "Tuntematon komento: \(komento)")
        }
    }

    func keskeytaSanelu() {
        sanelu.keskeyta()
    }

    // MARK: - Tapahtumat sivulle

    func siltaLahetti(laji: String, tiedot: [String: Any]) {
        laheta(laji: laji, tiedot: tiedot)
    }

    func laheta(laji: String, tiedot: [String: Any]) {
        var viesti = tiedot
        viesti["laji"] = laji
        let skripti = """
        (function () {
          try {
            if (window.matkakirjaNatiivi && window.matkakirjaNatiivi._tapahtuma) {
              window.matkakirjaNatiivi._tapahtuma(\(NatiiviSilta.json(viesti)));
            }
          } catch (virhe) { /* sivu vaihtui kesken kaiken */ }
        })();
        """
        // Tyyppi kirjataan näkyviin: ilman sitä sulkeuman paluuarvoksi
        // päättelyisi Void? (valinnainen ketju), joka ei kelpaa asyncille.
        let suoritus: () -> Void = { [weak self] in
            self?.selain?.evaluateJavaScript(skripti, completionHandler: nil)
        }
        if Thread.isMainThread {
            suoritus()
        } else {
            DispatchQueue.main.async(execute: suoritus)
        }
    }

    // MARK: - Apurit

    private static func json(_ arvo: Any) -> String {
        guard JSONSerialization.isValidJSONObject(arvo),
              let data = try? JSONSerialization.data(withJSONObject: arvo, options: []),
              let teksti = String(data: data, encoding: .utf8) else {
            return "{}"
        }
        return teksti
    }

    /// JavaScriptin numerot tulevat NSNumberina; merkkijonokin kelpaa.
    private static func luku(_ arvo: Any?) -> Double? {
        if let numero = arvo as? NSNumber { return numero.doubleValue }
        if let teksti = arvo as? String { return Double(teksti) }
        return nil
    }
}
