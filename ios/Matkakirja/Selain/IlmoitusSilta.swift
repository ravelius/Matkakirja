import UIKit
import UserNotifications

/// Push-ilmoitukset: VAIN kuoren pää.
///
/// Tämä silta pyytää pelaajalta luvan ja hankkii APNs-tunnuksen (device
/// token), jonka se antaa pelille. **Lähetyspäätä ei ole eikä sitä
/// rakenneta tässä.** Ilmoitusten lähettäminen vaatii oman palvelimen tai
/// palvelun, Applelta haetun push-avaimen ja päätöksen siitä, mistä
/// pelaajalle ylipäätään kannattaa ilmoittaa — se on oma projektinsa
/// (ios/OHJE.md). Ilman lähetyspäätä tästä sillasta ei tule yhtään
/// ilmoitusta, ja se on kunnossa: tunnus otetaan talteen nyt, jotta
/// putkea ei tarvitse rakentaa kuoren sisään myöhemmin.
///
/// Silta on jaettu ilmentymä (`jaettu`), koska APNs-tunnus tulee
/// UIApplicationDelegaten kautta eikä selainnäkymän kautta — delegaatti ei
/// tiedä NatiiviSillasta mitään.
final class IlmoitusSilta: NSObject {

    /// Sovelluksessa on tasan yksi ilmoitussilta.
    static let jaettu = IlmoitusSilta()

    weak var tapahtumat: SiltaTapahtumat?

    /// Viimeisin APNs-tunnus heksana, tai nil jos rekisteröintiä ei ole tehty.
    private(set) var token: String?

    private override init() {
        super.init()
    }

    // MARK: - Komennot

    /// Kysyy luvan ja rekisteröi laitteen APNs:ään. Tunnus ei ole valmis
    /// heti kun tämä vastaa: se tulee verkon yli ja saapuu tapahtumana
    /// `ilmoitukset-token`. Jos tunnus on jo tiedossa, se on vastauksessa.
    func pyydaLupa(vastaus: @escaping (Any?, String?) -> Void) {
        let keskus = UNUserNotificationCenter.current()
        keskus.requestAuthorization(options: [.alert, .badge, .sound]) { [weak self] myonnetty, virhe in
            DispatchQueue.main.async {
                if myonnetty {
                    // Rekisteröinti on turvallista tehdä joka kerta: iOS
                    // palauttaa saman tunnuksen, kunnes se oikeasti vaihtuu.
                    UIApplication.shared.registerForRemoteNotifications()
                }
                vastaus(["lupa": myonnetty,
                         "token": self?.token ?? "",
                         "syy": virhe?.localizedDescription ?? ""], nil)
            }
        }
    }

    /// Nykyinen lupatila kysymättä mitään. Peli voi tarkistaa tämän ennen
    /// kuin näyttää "salli ilmoitukset" -kehotuksen — toista kysymystä
    /// iOS ei näytä, joten kehotus kannattaa näyttää vain kerran.
    func tila(vastaus: @escaping (Any?, String?) -> Void) {
        UNUserNotificationCenter.current().getNotificationSettings { asetukset in
            let nimi: String
            switch asetukset.authorizationStatus {
            case .notDetermined: nimi = "kysymatta"
            case .denied: nimi = "kielletty"
            case .authorized: nimi = "sallittu"
            case .provisional: nimi = "hiljainen"
            case .ephemeral: nimi = "tilapainen"
            @unknown default: nimi = "tuntematon"
            }
            DispatchQueue.main.async {
                vastaus(["tila": nimi,
                         "token": self.token ?? "",
                         "rekisteroity": UIApplication.shared.isRegisteredForRemoteNotifications], nil)
            }
        }
    }

    // MARK: - Delegaatin kutsut

    /// APNs antoi tunnuksen. Tunnus on laitekohtainen ja voi vaihtua, joten
    /// peli ei saa tallettaa sitä ikuisiksi ajoiksi.
    func tallennaToken(_ data: Data) {
        let heksa = data.map { String(format: "%02x", $0) }.joined()
        token = heksa
        tapahtumat?.siltaLahetti(laji: "ilmoitukset-token", tiedot: ["token": heksa])
    }

    /// Rekisteröinti kaatui. Tavallisin syy on simulaattori tai puuttuva
    /// verkkoyhteys — kumpikaan ei ansaitse ilmoitusta pelaajalle.
    func rekisterointiEpaonnistui(_ virhe: Error) {
        token = nil
        tapahtumat?.siltaLahetti(laji: "ilmoitukset-virhe", tiedot: [
            "syy": "rekisterointi",
            "viesti": virhe.localizedDescription
        ])
    }
}
