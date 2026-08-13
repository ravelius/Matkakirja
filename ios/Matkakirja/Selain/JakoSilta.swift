import UIKit

/// Jako: pelaaja lähettää palan matkaansa eteenpäin.
///
/// Käytössä on iOS:n oma jakoikkuna (UIActivityViewController). Peli ei siis
/// tiedä mitään Viestistä, Instagramista eikä AirDropista — se antaa tekstin
/// tai kuvan, ja pelaaja valitsee mihin se menee. Kohteita ei rajata:
/// rajaaminen vain estäisi sen sovelluksen, jota pelaaja juuri haluaa.
///
/// iPadilla ikkuna on popover, jolla on oltava ankkuri. Ankkuriksi otetaan
/// selainnäkymän keskikohta ilman nuolta — peli piirtää jakonappinsa itse
/// sivulle, eikä kuori tiedä missä se on. Keskeltä nouseva popover on
/// tylsä mutta se ei koskaan osoita väärään paikkaan.
final class JakoSilta {

    /// Ankkuri ja esittäjän etsimisen lähtökohta (PeliSelainin WKWebView).
    weak var nakyma: UIView?

    /// Yksi jakoikkuna kerrallaan. Toinen päällekkäinen esitys jäisi iOS:ssä
    /// hiljaa tekemättä, jolloin pelin lupaus ei ratkeaisi koskaan.
    private var auki = false

    func teksti(_ teksti: String, vastaus: @escaping (Any?, String?) -> Void) {
        let siisti = teksti.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !siisti.isEmpty else {
            vastaus(nil, "Tyhjää tekstiä ei voi jakaa")
            return
        }
        esita(osat: [siisti], vastaus: vastaus)
    }

    func kuva(dataUrl: String, teksti: String?, vastaus: @escaping (Any?, String?) -> Void) {
        guard let kuva = JakoSilta.kuvaDataOsoitteesta(dataUrl) else {
            vastaus(nil, "Kuvaa ei saatu luettua — odotettiin data:-osoitetta (esimerkiksi canvas.toDataURL())")
            return
        }
        var osat: [Any] = [kuva]
        if let saate = teksti?.trimmingCharacters(in: .whitespacesAndNewlines), !saate.isEmpty {
            osat.append(saate)
        }
        esita(osat: osat, vastaus: vastaus)
    }

    // MARK: - Esitys

    private func esita(osat: [Any], vastaus: @escaping (Any?, String?) -> Void) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else {
                vastaus(nil, "Jakoa ei voitu avata")
                return
            }
            guard !self.auki else {
                vastaus(nil, "Jakoikkuna on jo auki")
                return
            }
            guard let ankkuri = self.nakyma, let ohjain = JakoSilta.esittavaOhjain(ankkuri) else {
                vastaus(nil, "Jakoikkunalle ei löytynyt paikkaa ruudulta")
                return
            }

            let ikkuna = UIActivityViewController(activityItems: osat, applicationActivities: nil)
            // Popover-ankkurointi iPadille: keskelle, ilman nuolta.
            if let popover = ikkuna.popoverPresentationController {
                popover.sourceView = ankkuri
                popover.sourceRect = CGRect(x: ankkuri.bounds.midX,
                                            y: ankkuri.bounds.midY,
                                            width: 1,
                                            height: 1)
                popover.permittedArrowDirections = []
            }

            self.auki = true
            ikkuna.completionWithItemsHandler = { [weak self] tapa, valmis, _, virhe in
                self?.auki = false
                if let virhe = virhe {
                    vastaus(nil, "Jako ei onnistunut: \(virhe.localizedDescription)")
                    return
                }
                vastaus(["tila": valmis ? "jaettu" : "peruttu",
                         "kohde": tapa?.rawValue ?? ""], nil)
            }
            ohjain.present(ikkuna, animated: true)
        }
    }

    /// Päällimmäinen näkymäohjain: jakoikkuna ei saa mennä esimerkiksi
    /// Game Centerin ruudun alle piiloon.
    private static func esittavaOhjain(_ nakyma: UIView) -> UIViewController? {
        var ohjain = nakyma.window?.rootViewController
        while let seuraava = ohjain?.presentedViewController {
            ohjain = seuraava
        }
        return ohjain
    }

    // MARK: - data:-osoitteen purku

    /// Purkaa `data:image/png;base64,iVBORw0…` -muotoisen osoitteen kuvaksi.
    /// Vain base64-muoto kelpaa: prosenttikoodattu data:-osoite on kuvalle
    /// niin epäkäytännöllinen, ettei sitä kannata tukea väärinymmärryksen
    /// hinnalla.
    static func kuvaDataOsoitteesta(_ osoite: String) -> UIImage? {
        guard osoite.hasPrefix("data:") else { return nil }
        guard let pilkku = osoite.range(of: ",") else { return nil }
        let otsake = osoite[osoite.startIndex..<pilkku.lowerBound]
        guard otsake.contains(";base64") else { return nil }
        let runko = String(osoite[pilkku.upperBound...])
        guard let data = Data(base64Encoded: runko, options: .ignoreUnknownCharacters) else { return nil }
        return UIImage(data: data)
    }
}
