import Foundation

/// Pelin tila jaettuna kuoren, kotinäyttöwidgetin ja Siri-aikeiden kesken.
///
/// Peli työntää tilansa sillan kautta (`widget.paivita`), kuori kirjoittaa
/// sen App Group -varastoon, ja widget sekä App Intents lukevat sen sieltä.
/// Varasto on tarkoituksella tyhmä: se ei tiedä pelin säännöistä mitään
/// eikä päättele mitään itse. Se on näyteikkuna, ei tallennus — pelin
/// oikea tallennus kulkee `talle`-sillan kautta (TalleSilta.swift).
///
/// Tiedosto käännetään KAHTEEN kohteeseen (Matkakirja ja MatkakirjaWidget),
/// joten se ei saa tuoda mukanaan UIKitia eikä WebKitiä — vain Foundation.
enum JaettuPelitila {

    /// App Groupin tunnus. Sama arvo on molempien kohteiden
    /// entitlements-tiedostoissa; jos tätä muuttaa, molemmat on muutettava.
    static let ryhma = "group.fi.matkakirja.peli"

    /// Avain App Group -UserDefaultsissa.
    static let avain = "pelitila"

    /// Se mitä widget ja Siri näyttävät. Kaikki kentät ovat valmiiksi
    /// näytettävässä muodossa: kuori ei muotoile rahaa eikä taivuta
    /// kaupunginnimiä, koska peli tekee sen jo paremmin.
    struct Tila {
        var kaupunki: String
        var maa: String
        var paiva: Int
        var raha: String
        var paivitetty: Date?

        /// Peliä ei ole aloitettu (tai tila on jäänyt puolitiehen).
        var onTyhja: Bool { kaupunki.isEmpty && paiva <= 0 }

        /// Widgetin esikatselu- ja paikkamerkkitila. Tämä näkyy widgetin
        /// valintagalleriassa ennen kuin peliä on kertaakaan avattu.
        static let esimerkki = Tila(kaupunki: "Lontoo",
                                    maa: "Englanti",
                                    paiva: 1,
                                    raha: "£1 200",
                                    paivitetty: nil)
    }

    /// App Group -varasto, tai nil jos entitlement puuttuu (esimerkiksi
    /// allekirjoittamattomassa savukoekäännöksessä).
    static var varasto: UserDefaults? { UserDefaults(suiteName: ryhma) }

    /// Kirjoittaa tilan. Palauttaa false vain jos App Groupia ei ole.
    @discardableResult
    static func kirjoita(_ tiedot: [String: Any]) -> Bool {
        guard let varasto = varasto else { return false }
        let kirja: [String: Any] = [
            "kaupunki": teksti(tiedot["kaupunki"]),
            "maa": teksti(tiedot["maa"]),
            "paiva": kokonaisluku(tiedot["paiva"]),
            "raha": teksti(tiedot["raha"]),
            "paivitetty": Date().timeIntervalSince1970
        ]
        varasto.set(kirja, forKey: avain)
        return true
    }

    /// Lukee tilan, tai nil jos peliä ei ole aloitettu.
    static func lue() -> Tila? {
        guard let varasto = varasto,
              let kirja = varasto.dictionary(forKey: avain) else { return nil }
        let leima = (kirja["paivitetty"] as? NSNumber)?.doubleValue
        let tila = Tila(kaupunki: teksti(kirja["kaupunki"]),
                        maa: teksti(kirja["maa"]),
                        paiva: kokonaisluku(kirja["paiva"]),
                        raha: teksti(kirja["raha"]),
                        paivitetty: leima.map { Date(timeIntervalSince1970: $0) })
        return tila.onTyhja ? nil : tila
    }

    /// Pyyhkii tilan. Widget palaa placeholder-asuunsa.
    static func tyhjenna() {
        varasto?.removeObject(forKey: avain)
    }

    // MARK: - Apurit

    /// JavaScriptistä tulee numeroita, merkkijonoja ja puuttuvia kenttiä
    /// sekaisin. Kaikki päätyy tänne tekstinä, jotta widget voi luottaa
    /// siihen että kenttä on olemassa.
    private static func teksti(_ arvo: Any?) -> String {
        if let teksti = arvo as? String { return teksti }
        if let numero = arvo as? NSNumber {
            // Kokonaisluku ilman turhaa ".0"-häntää.
            if numero.doubleValue == numero.doubleValue.rounded() {
                return String(numero.intValue)
            }
            return numero.stringValue
        }
        return ""
    }

    private static func kokonaisluku(_ arvo: Any?) -> Int {
        if let numero = arvo as? NSNumber { return numero.intValue }
        if let teksti = arvo as? String { return Int(teksti) ?? 0 }
        return 0
    }
}
