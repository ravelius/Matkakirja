import Foundation
import WidgetKit

/// Widget-data: pelin tila kotinäytölle.
///
/// Peli kertoo missä ollaan (`widget.paivita`), kuori kirjoittaa sen App
/// Group -varastoon ja pyytää WidgetKitiä piirtämään widgetin uudestaan.
/// Widget itse ei koskaan lue peliä, avaa verkkoa eikä laske mitään —
/// se näyttää tasan sen, mitä varastossa lukee. Siksi widget toimii myös
/// lentokoneessa ja siksi se ei kuluta akkua.
///
/// Päivitystahti: `reloadAllTimelines` on pyyntö, ei käsky. iOS antaa
/// widgetille päivityskiintiön ja jakaa sen omaan tahtiinsa. Peli voi
/// kutsua tätä joka siirrolla; kotinäytöllä muutos näkyy hetken päästä.
final class WidgetSilta {

    func paivita(tila: [String: Any], vastaus: (Any?, String?) -> Void) {
        guard JaettuPelitila.kirjoita(tila) else {
            vastaus(nil, "App Group -varastoa ei ole käytettävissä (\(JaettuPelitila.ryhma))")
            return
        }
        WidgetCenter.shared.reloadAllTimelines()
        vastaus(["tila": "paivitetty", "ryhma": JaettuPelitila.ryhma], nil)
    }

    /// Tyhjentää tilan: widget palaa "Matka ei ole alkanut" -asuunsa.
    /// Peli kutsuu tätä esimerkiksi kun tallennus poistetaan.
    func tyhjenna(vastaus: (Any?, String?) -> Void) {
        JaettuPelitila.tyhjenna()
        WidgetCenter.shared.reloadAllTimelines()
        vastaus(["tila": "tyhjennetty"], nil)
    }

    /// Mitä varastossa nyt on. Peli voi tarkistaa tämän vaikka
    /// virheenjäljitystä varten — widget lukee tismalleen samat kentät.
    func lue(vastaus: (Any?, String?) -> Void) {
        guard let tila = JaettuPelitila.lue() else {
            vastaus(["asetettu": false], nil)
            return
        }
        vastaus(["asetettu": true,
                 "kaupunki": tila.kaupunki,
                 "maa": tila.maa,
                 "paiva": tila.paiva,
                 "raha": tila.raha,
                 "paivitetty": (tila.paivitetty?.timeIntervalSince1970 ?? 0) * 1000], nil)
    }
}
