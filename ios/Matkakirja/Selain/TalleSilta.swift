import Foundation

/// Tallennussynkka: pelin tallennukset iPhonen ja iPadin välillä.
///
/// Alla on NSUbiquitousKeyValueStore, iCloudin avain–arvo-varasto. Se on
/// pieni (yhteensä 1 Mt) ja hidasteleva, mutta se ei vaadi omaa palvelinta,
/// omaa tiliä eikä pelaajalta yhtään asetusta: jos laitteissa on sama
/// Apple-tili, tallennus siirtyy itsestään.
///
/// SILTA EI PÄÄTÄ MITÄÄN. Se ei yhdistä tallennuksia, ei valitse voittajaa
/// eikä ylikirjoita mitään omin päin. Jokaisen arvon mukana kulkee aikaleima
/// (millisekunteja epookista), ja kun iCloudista tulee muutos, silta kertoo
/// vain *mitkä avaimet* muuttuivat. Peli hakee arvon itse ja päättää sitten,
/// kumpi voittaa — sääntö on "uusin aikaleima voittaa", mutta se sääntö
/// asuu pelin puolella (aalto B), ei täällä.
///
/// Muutostapahtumassa ei lähetetä arvoja mukana tarkoituksella: 900 kilotavun
/// tallennus evaluateJavaScript-merkkijonon sisällä olisi ikävä yllätys
/// muistinkäytössä juuri silloin kun laite herää taustalta.
final class TalleSilta: NSObject {

    /// Tapahtumien vastaanottaja (NatiiviSilta välittää ne sivulle).
    weak var tapahtumat: SiltaTapahtumat?

    /// Etuliite iCloudin avaimissa. Sama varasto on koko sovelluksen
    /// yhteinen, joten pelin avaimet pidetään omassa nurkassaan — silloin
    /// kuori voi joskus tallettaa sinne omaakin ilman törmäystä.
    private static let etuliite = "peli."

    /// Yhden arvon yläraja. Applen raja on 1 Mt sekä avainta kohti että
    /// yhteensä; jätetään varaa kuorelle ja JSON-kuorelle itselleen.
    private static let ylaraja = 900_000

    private let varasto = NSUbiquitousKeyValueStore.default
    private var kuunnellaan = false

    // MARK: - Kytkentä

    /// Alkaa kuunnella iCloudin muutoksia. Kutsutaan kerran, kun silta
    /// syntyy. Ilman tätä pelin toinen laite ei koskaan kuulu tänne.
    func kaynnista() {
        guard !kuunnellaan else { return }
        kuunnellaan = true
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(pilviMuuttui(_:)),
            name: NSUbiquitousKeyValueStore.didChangeExternallyNotification,
            object: varasto)
        varasto.synchronize()
    }

    /// Sovellus palasi etualalle: pyydetään iCloudia kertomaan uutiset.
    /// synchronize() ei odota verkkoa, joten tämä on halpa.
    func synkronoi() {
        varasto.synchronize()
    }

    /// Onko laitteessa iCloud-tili? Ilman sitä varasto toimii yhä, mutta
    /// vain paikallisesti — peli voi kertoa sen pelaajalle rehellisesti.
    static var pilviKaytossa: Bool {
        FileManager.default.ubiquityIdentityToken != nil
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    // MARK: - Komennot

    /// Vie arvon iCloudiin. Arvo on merkkijono: peli sarjallistaa oman
    /// tallennuksensa itse, jolloin silta ei koskaan joudu arvaamaan mitä
    /// pelin tallennusmuoto tarkoittaa.
    func vie(avain: String, arvo: String, aika: Double?, vastaus: (Any?, String?) -> Void) {
        let siisti = avain.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !siisti.isEmpty else {
            vastaus(nil, "Tallennuksen avain puuttuu")
            return
        }
        let leima = aika ?? Date().timeIntervalSince1970 * 1000
        let kuori: [String: Any] = ["arvo": arvo, "aika": leima]
        guard let data = try? JSONSerialization.data(withJSONObject: kuori, options: []) else {
            vastaus(nil, "Tallennusta ei saatu muunnettua tallennettavaan muotoon")
            return
        }
        guard data.count <= TalleSilta.ylaraja else {
            vastaus(nil, "Tallennus on liian suuri iCloudin avainvarastoon (\(data.count) tavua, raja \(TalleSilta.ylaraja))")
            return
        }
        varasto.set(data, forKey: TalleSilta.etuliite + siisti)
        varasto.synchronize()
        vastaus(["avain": siisti,
                 "aika": leima,
                 "tavuja": data.count,
                 "pilvi": TalleSilta.pilviKaytossa], nil)
    }

    /// Tuo arvon iCloudista. Jos avainta ei ole, `loytyi` on false eikä se
    /// ole virhe: uusi laite on tyhjä eikä siitä pidä valittaa pelaajalle.
    func tuo(avain: String, vastaus: (Any?, String?) -> Void) {
        let siisti = avain.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !siisti.isEmpty else {
            vastaus(nil, "Tallennuksen avain puuttuu")
            return
        }
        guard let kuori = lueKuori(avain: siisti) else {
            vastaus(["avain": siisti,
                     "loytyi": false,
                     "arvo": NSNull(),
                     "aika": 0,
                     "pilvi": TalleSilta.pilviKaytossa], nil)
            return
        }
        vastaus(["avain": siisti,
                 "loytyi": true,
                 "arvo": kuori.arvo,
                 "aika": kuori.aika,
                 "pilvi": TalleSilta.pilviKaytossa], nil)
    }

    /// Poistaa avaimen. Poisto siirtyy myös toisiin laitteisiin.
    func poista(avain: String, vastaus: (Any?, String?) -> Void) {
        let siisti = avain.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !siisti.isEmpty else {
            vastaus(nil, "Tallennuksen avain puuttuu")
            return
        }
        varasto.removeObject(forKey: TalleSilta.etuliite + siisti)
        varasto.synchronize()
        vastaus(["avain": siisti, "tila": "poistettu"], nil)
    }

    /// Luettelee mitä varastossa on. Arvoja ei lähetetä mukana — pelkkä
    /// avain, aikaleima ja koko riittävät valintanäkymän piirtämiseen.
    func avaimet(vastaus: (Any?, String?) -> Void) {
        var lista: [[String: Any]] = []
        for (avain, arvo) in varasto.dictionaryRepresentation {
            guard avain.hasPrefix(TalleSilta.etuliite) else { continue }
            let lyhyt = String(avain.dropFirst(TalleSilta.etuliite.count))
            let data = arvo as? Data
            lista.append([
                "avain": lyhyt,
                "aika": lueKuori(avain: lyhyt)?.aika ?? 0,
                "tavuja": data?.count ?? 0
            ])
        }
        lista.sort { ($0["avain"] as? String ?? "") < ($1["avain"] as? String ?? "") }
        vastaus(["avaimet": lista, "pilvi": TalleSilta.pilviKaytossa], nil)
    }

    // MARK: - iCloudin muutokset

    /// iCloud kertoo, että toinen laite (tai sama tili muualla) muutti
    /// jotakin. Ilmoitus voi tulla mistä säikeestä tahansa; NatiiviSilta
    /// hoitaa pääsäikeeseen siirtymisen.
    @objc private func pilviMuuttui(_ ilmoitus: Notification) {
        let tiedot = ilmoitus.userInfo ?? [:]
        // -1 = ilmoituksessa ei ollut syytä lainkaan.
        let syyNumero = (tiedot[NSUbiquitousKeyValueStoreChangeReasonKey] as? NSNumber)?.intValue ?? -1
        let muuttuneet = (tiedot[NSUbiquitousKeyValueStoreChangedKeysKey] as? [String]) ?? []

        var lista: [[String: Any]] = []
        for avain in muuttuneet where avain.hasPrefix(TalleSilta.etuliite) {
            let lyhyt = String(avain.dropFirst(TalleSilta.etuliite.count))
            lista.append([
                "avain": lyhyt,
                "aika": lueKuori(avain: lyhyt)?.aika ?? 0,
                "poistettu": varasto.data(forKey: avain) == nil
            ])
        }
        // Kiintiön ylitys koskee koko varastoa eikä yhtäkään yksittäistä
        // avainta — se kerrotaan pelille silloinkin kun lista on tyhjä.
        let kiintioTayttyi = (syyNumero == NSUbiquitousKeyValueStoreQuotaViolationChange)
        guard !lista.isEmpty || kiintioTayttyi else { return }

        tapahtumat?.siltaLahetti(laji: "talle-muuttui", tiedot: [
            "syy": TalleSilta.syynNimi(syyNumero),
            "muutokset": lista
        ])
    }

    private static func syynNimi(_ numero: Int) -> String {
        switch numero {
        case NSUbiquitousKeyValueStoreServerChange: return "palvelin"
        case NSUbiquitousKeyValueStoreInitialSyncChange: return "ensisynkka"
        case NSUbiquitousKeyValueStoreQuotaViolationChange: return "kiintio"
        case NSUbiquitousKeyValueStoreAccountChange: return "tili"
        default: return "tuntematon"
        }
    }

    // MARK: - Apurit

    private func lueKuori(avain: String) -> (arvo: String, aika: Double)? {
        guard let data = varasto.data(forKey: TalleSilta.etuliite + avain),
              let luettu = try? JSONSerialization.jsonObject(with: data, options: []),
              let kirja = luettu as? [String: Any],
              let arvo = kirja["arvo"] as? String else { return nil }
        let aika = (kirja["aika"] as? NSNumber)?.doubleValue ?? 0
        return (arvo, aika)
    }
}
