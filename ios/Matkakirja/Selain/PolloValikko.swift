import Foundation
import UIKit
import WebKit

/// Pelin WKWebView, jonka tekstivalinnan pikavalikossa on "Kysy pöllöltä".
///
/// OMISTAJAN TILAUS 23.8.2026: kun pelaaja maalaa tekstiä lehdestä tai
/// kartalta, iOS:n oman valikon (Kopioi / Katso lisää / Käännä…)
/// ENSIMMÄISENÄ vaihtoehtona on "Kysy pöllöltä", joka vie valinnan
/// suoraan Viisas Pöllö -chattiin.
///
/// MIKSI ALILUOKKA. WKWebView'n valintavalikkoon ei pääse käsiksi
/// WKUIDelegatesta: `willPresentEditMenuWithAnimator` on pelkkä
/// ilmoitus eikä anna muokata kohtia. iOS 16:sta lähtien
/// muokkausvalikko on UIEditMenuInteraction, joka kokoaa valikkonsa
/// vastaajaketjun `buildMenu(with:)`-toteutuksista — ja web-sisällön
/// valinnassa ketju kulkee WKWebView'n läpi. Siksi oma toiminto
/// lisätään täällä eikä delegaatissa.
///
/// SELAIN EI SAA TÄTÄ. Sivun oma koodi ei pääse Safarin valintavalikkoon
/// millään, joten toiminto on kuoren yksinoikeus; peli tarjoaa vain
/// sisäänkäynnin (js/pollo.js kysyPollolta).
final class PolloValikkoSelain: WKWebView {

    /// Pelin puolen sisäänkäynti. Sama nimi on js/pollo.js:ssä
    /// (asennaPollo ripustaa sen ikkunaan) — tätä ei vaihdeta ilman
    /// pelin ja kuoren yhtäaikaista päivitystä.
    static let siltafunktio = "matkakirjaKysyPollolta"

    /// Valikkokohdan otsikko. Sama sanamuoto kuin kysymysrivin
    /// paikkamerkissä ("Kysy pöllöltä…"), ilman kolmea pistettä:
    /// valikkokohta tekee asian heti eikä avaa uutta kyselyä.
    static let otsikko = "Kysy pöllöltä"

    override func buildMenu(with builder: UIMenuBuilder) {
        super.buildMenu(with: builder)
        // Päävalikko (iPadin näppäimistövalikko, Mac Catalyst) ei ole
        // tekstivalinnan valikko: sinne kohta ei kuulu, koska valintaa
        // ei silloin välttämättä ole lainkaan.
        guard builder.system != .main else { return }

        let kysy = UIAction(title: PolloValikkoSelain.otsikko,
                            image: UIImage(systemName: "bird")) { [weak self] _ in
            self?.kysyValinnastaPollolta()
        }
        /*
         * KÄRKEEN, EI PERÄÄN. Valikko rakentuu järjestyksessä, ja
         * omistaja tilasi toiminnon ENSIMMÄISEKSI — Kopioi-kohdan
         * vasemmalle puolelle. `atStartOfMenu: .root` asettaa oman
         * ryhmän koko valikon alkuun; displayInline-ryhmä pitää sen
         * yhtenä kohtana eikä alivalikkona.
         */
        let ryhma = UIMenu(title: "", options: .displayInline, children: [kysy])
        builder.insertChild(ryhma, atStartOfMenu: .root)
    }

    /// Lukee valinnan sivulta ja vie sen pöllölle.
    private func kysyValinnastaPollolta() {
        // Valinta luetaan sivulta eikä UIKitista: web-sisällön valinta
        // elää selainprosessissa, eikä sitä näy natiivipuolella.
        let luku = "(function () { try { return String(window.getSelection() || ''); }"
            + " catch (virhe) { return ''; } })();"
        evaluateJavaScript(luku) { [weak self] tulos, _ in
            let valinta = (tulos as? String) ?? ""
            guard !valinta.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
            self?.lahetaValinta(valinta)
        }
    }

    private func lahetaValinta(_ valinta: String) {
        let teksti = PolloValikkoSelain.jsMerkkijono(valinta)
        // Pelin funktio voi puuttua (vanha peli, kesken oleva lataus),
        // joten kutsu on aina ehdollinen — sama sääntö kuin muissakin
        // kuoren ruiskuttamissa skripteissä (NatiiviSilta.laheta).
        let skripti = """
        (function () {
          try {
            var kysy = window.\(PolloValikkoSelain.siltafunktio);
            if (typeof kysy === 'function') { kysy(\(teksti)); }
          } catch (virhe) { /* peli ei ole vielä valmis */ }
        })();
        """
        evaluateJavaScript(skripti, completionHandler: nil)
    }

    /// Valinta JavaScript-merkkijonoksi. Lainausmerkit, kenoviivat ja
    /// rivinvaihdot tulevat pelaajan maalaamasta tekstistä, joten
    /// ne suojataan JSON-koodauksella eikä käsin.
    static func jsMerkkijono(_ teksti: String) -> String {
        // JSONSerialization ei suostu yksinäiseen merkkijonoon, joten
        // koodataan taulukko ja kuoritaan hakasulkeet pois.
        guard let data = try? JSONSerialization.data(withJSONObject: [teksti], options: []),
              let jono = String(data: data, encoding: .utf8),
              jono.count >= 2 else {
            return "''"
        }
        return String(jono.dropFirst().dropLast())
    }
}
