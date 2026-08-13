import Foundation

/// Kuoren asetukset.
///
/// Pelin osoite luetaan Config.plististä eikä koodista, jotta osoitteen
/// vaihtaminen ei vaadi Swiftin koskemista — ja jotta sama kuori voidaan
/// osoittaa kehitys- ja tuotantopalvelimelle ilman haaraa.
///
/// Kehityksen aikana osoitteen voi ohittaa käynnistysargumentilla
/// (Xcode → Edit Scheme → Arguments):  -PELIN_OSOITE http://192.168.1.5:8000/
enum Asetukset {

    /// Config.plistin oletusarvo. Niin kauan kuin tämä on tallessa,
    /// sovellus tietää ettei osoitetta ole vielä asetettu.
    static let paikkamerkinTunniste = "ASETA-PELIN-OSOITE"

    /// Pelin osoite, tai nil jos sitä ei ole asetettu tai se on kelvoton.
    static var pelinOsoite: URL? {
        guard let teksti = osoiteTeksti else { return nil }
        guard let osoite = URL(string: teksti), let kaava = osoite.scheme?.lowercased() else { return nil }
        guard kaava == "https" || kaava == "http", osoite.host != nil else { return nil }
        return osoite
    }

    /// Osoite tekstinä ilman kelpoisuustarkistusta — virheilmoitusta varten.
    static var osoiteTeksti: String? {
        let ehdokkaat = [
            UserDefaults.standard.string(forKey: "PELIN_OSOITE"),
            asetuskirja["PELIN_OSOITE"] as? String
        ]
        for ehdokas in ehdokkaat {
            guard let siisti = ehdokas?.trimmingCharacters(in: .whitespacesAndNewlines) else { continue }
            if siisti.isEmpty { continue }
            if siisti.contains(paikkamerkinTunniste) { continue }
            return siisti
        }
        return nil
    }

    /// Sillan versionumero. Peli voi tarkistaa tämän ennen kuin luottaa
    /// johonkin uuteen komentoon: `window.matkakirjaNatiivi.versio`.
    ///
    /// Käytännössä pelin kannattaa kysyä `ominaisuudet`-oliolta eikä
    /// versionumerolta — ominaisuuslista kertoo myös sen, mikä on tässä
    /// laitteessa oikeasti käytettävissä.
    ///
    /// 1.0.0 luenta ja sanelu
    /// 1.1.0 talle (iCloud), haptiikka, jaa, pelikeskus, widget, ilmoitukset
    static let sillanVersio = "1.1.0"

    private static let asetuskirja: [String: Any] = {
        guard let polku = Bundle.main.url(forResource: "Config", withExtension: "plist"),
              let data = try? Data(contentsOf: polku),
              let luettu = try? PropertyListSerialization.propertyList(from: data, format: nil),
              let kirja = luettu as? [String: Any]
        else { return [:] }
        return kirja
    }()
}
