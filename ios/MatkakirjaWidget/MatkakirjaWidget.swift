import SwiftUI
import WidgetKit

/// Matkakirjan kotinäyttöwidget.
///
/// Widget on tarkoituksella tyhmä. Se ei avaa verkkoa, ei lue peliä, ei
/// laske mitään eikä päivity itsestään: se piirtää sen mitä App Group
/// -varastossa lukee (JaettuPelitila). Peli työntää tilansa varastoon
/// sillan kautta (`widget.paivita`), ja kuori pyytää silloin WidgetKitiä
/// piirtämään uudestaan.
///
/// Tästä seuraa kaksi asiaa, jotka on hyvä tietää:
///
/// - Widget näyttää vanhaa tietoa, jos peliä ei ole avattu vähään aikaan.
///   Siksi näkymässä on aikaleima ("päivitetty eilen") eikä pelkkä luku.
/// - Widget toimii ilman verkkoa ja ilman akkua kuluttavaa taustatyötä.
///   Aikajana on `.never`: uusi piirto tulee vain pelin pyynnöstä.

@main
struct MatkakirjaWidgetNippu: WidgetBundle {
    var body: some Widget {
        TilanneWidget()
    }
}

// MARK: - Aikajana

struct TilanneMerkinta: TimelineEntry {
    let date: Date
    /// nil = matkaa ei ole aloitettu (placeholder-tila).
    let tila: JaettuPelitila.Tila?
}

struct TilanneAjuri: TimelineProvider {

    /// Harmaa hetki ennen ensimmäistä piirtoa. Tähän ei lueta varastoa:
    /// iOS näyttää tämän sumennettuna, ja oikea data vain välkähtäisi.
    func placeholder(in context: Context) -> TilanneMerkinta {
        TilanneMerkinta(date: Date(), tila: JaettuPelitila.Tila.esimerkki)
    }

    /// Widgetin valintagalleria. Siellä näytetään esimerkki, jottei
    /// galleriassa lue "matka ei ole alkanut" — se näyttäisi rikkinäiseltä.
    func getSnapshot(in context: Context, completion: @escaping (TilanneMerkinta) -> Void) {
        let tila = context.isPreview ? JaettuPelitila.Tila.esimerkki : JaettuPelitila.lue()
        completion(TilanneMerkinta(date: Date(), tila: tila))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<TilanneMerkinta>) -> Void) {
        let merkinta = TilanneMerkinta(date: Date(), tila: JaettuPelitila.lue())
        // .never: peli kertoo itse kun jotain muuttui. Aikaperustainen
        // päivitys kuluttaisi widgetin päivityskiintiön turhaan.
        completion(Timeline(entries: [merkinta], policy: .never))
    }
}

// MARK: - Widget

struct TilanneWidget: Widget {

    /// Tunnus, jolla WidgetKit tunnistaa widgetin. TÄTÄ EI VAIHDETA:
    /// vaihto tekisi kotinäytöllä olevista widgeteistä tyhjiä.
    static let tunnus = "MatkakirjaTilanne"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: TilanneWidget.tunnus, provider: TilanneAjuri()) { merkinta in
            TilanneNakyma(merkinta: merkinta)
        }
        .configurationDisplayName("Matkan tilanne")
        .description("Missä kaupungissa olet ja monesko matkapäivä on menossa.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
