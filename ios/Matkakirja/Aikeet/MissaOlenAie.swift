import AppIntents
import Foundation

/// Siri- ja Oikotiet-aikeet.
///
/// Aikeet lukevat saman App Group -varaston kuin widget (JaettuPelitila).
/// Ne EIVÄT avaa peliä eivätkä käynnistä selainta: vastaus tulee
/// varastosta, jolloin Siri vastaa heti eikä pelaajan tarvitse odottaa
/// sivun latautumista vain kuullakseen missä kaupungissa on.
///
/// Varasto päivittyy silloin kun peli kutsuu `widget.paivita`. Jos peliä ei
/// ole avattu kertaakaan uuden kuoren jälkeen, vastaus on rehellisesti
/// "matka ei ole vielä alkanut" — parempi kuin vanha tieto ilman varoitusta.

/// "Missä olen Matkakirjassa" — kertoo kaupungin ja matkapäivän.
struct MissaOlenAie: AppIntent {

    static var title: LocalizedStringResource = "Missä olen Matkakirjassa"

    static var description = IntentDescription(
        "Kertoo, missä kaupungissa matka on menossa ja monesko matkapäivä on käynnissä.")

    /// Aie vastaa itse eikä avaa peliä. Avaamiseen on oma aikeensa
    /// (AvaaMatkakirjaAie), koska iOS 16 ei salli valintaa ajon aikana.
    static var openAppWhenRun = false

    func perform() async throws -> some IntentResult & ProvidesDialog {
        guard let tila = JaettuPelitila.lue() else {
            return .result(dialog: IntentDialog(stringLiteral:
                "Matka ei ole vielä alkanut. Avaa Matkakirja ja lähde liikkeelle."))
        }
        return .result(dialog: IntentDialog(stringLiteral: MissaOlenAie.lause(tila)))
    }

    /// Vastaus puhuttuna lauseena. Siri lukee tämän ääneen, joten siinä ei
    /// ole sulkeita, lyhenteitä eikä numeroita ilman yksikköä.
    static func lause(_ tila: JaettuPelitila.Tila) -> String {
        var osat: [String] = []

        if !tila.kaupunki.isEmpty {
            if tila.maa.isEmpty {
                osat.append("Olet kaupungissa \(tila.kaupunki).")
            } else {
                osat.append("Olet kaupungissa \(tila.kaupunki), \(tila.maa).")
            }
        }
        if tila.paiva > 0 {
            osat.append("Matkapäivä \(tila.paiva) on menossa.")
        }
        if !tila.raha.isEmpty {
            osat.append("Kassassa on \(tila.raha).")
        }
        if osat.isEmpty {
            return "Matka ei ole vielä alkanut. Avaa Matkakirja ja lähde liikkeelle."
        }
        return osat.joined(separator: " ")
    }
}

/// "Avaa Matkakirja" — nostaa pelin ruudulle.
struct AvaaMatkakirjaAie: AppIntent {

    static var title: LocalizedStringResource = "Avaa Matkakirja"

    static var description = IntentDescription("Avaa Matkakirjan siihen kohtaan, mihin matka jäi.")

    static var openAppWhenRun = true

    func perform() async throws -> some IntentResult {
        .result()
    }
}

/// Valmiit Siri-fraasit. Nämä ilmestyvät Oikotiet-sovellukseen itsestään,
/// eikä pelaajan tarvitse rakentaa oikotietä käsin.
///
/// Fraasissa on OLTAVA `\(.applicationName)` — Apple vaatii sen, jotta Siri
/// tietää mille sovellukselle puhutaan. Sovelluksen nimi on "Matkakirja",
/// joten fraasista tulee luettuna "Missä olen Matkakirjassa".
///
/// Saatavuusraja 16.4 on tarkoituksella: nelikenttäinen AppShortcut-alustin
/// (lyhyt otsikko + kuvake) tuli vasta silloin. Aikeet itse toimivat
/// Oikotiet-sovelluksessa jo iOS 16.0:ssa, vain valmiit puhefraasit
/// puuttuvat siitä kapeasta välistä.
@available(iOS 16.4, *)
struct MatkakirjaOikotiet: AppShortcutsProvider {

    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: MissaOlenAie(),
            phrases: [
                "Missä olen \(.applicationName)ssa",
                "Missä menen \(.applicationName)ssa",
                "\(.applicationName)n tilanne"
            ],
            shortTitle: "Missä olen",
            systemImageName: "map")

        AppShortcut(
            intent: AvaaMatkakirjaAie(),
            phrases: [
                "Jatka \(.applicationName)a",
                "Avaa \(.applicationName)"
            ],
            shortTitle: "Jatka matkaa",
            systemImageName: "book.closed")
    }
}
