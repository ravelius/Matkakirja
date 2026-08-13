import SwiftUI
import WidgetKit

/// Widgetin ulkoasu: pergamentin pala kotinäytöllä.
///
/// Pelin oma tausta on tumma (#1d1610), mutta kotinäytöllä tumma widget
/// hukkuu taustakuvaan. Siksi widget kääntää parin toisin päin: pohjaksi
/// päiväkirjan paperi, tekstiksi muste. Kulta jää korostukseksi, jotta
/// widget on silti tunnistettavasti samaa peliä.
struct TilanneNakyma: View {

    let merkinta: TilanneMerkinta

    @Environment(\.widgetFamily) private var koko

    var body: some View {
        sisalto
            .widgetTausta(pergamentti)
    }

    @ViewBuilder
    private var sisalto: some View {
        if let tila = merkinta.tila {
            switch koko {
            case .systemMedium:
                keskikoko(tila)
            default:
                pieni(tila)
            }
        } else {
            aloittamaton
        }
    }

    // MARK: - Pieni

    private func pieni(_ tila: JaettuPelitila.Tila) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            otsikkorivi

            Spacer(minLength: 6)

            Text(tila.kaupunki)
                .font(.system(.title2, design: .serif).weight(.semibold))
                .foregroundColor(Ulkoasu.muste)
                .minimumScaleFactor(0.6)
                .lineLimit(2)

            if !tila.maa.isEmpty {
                Text(tila.maa)
                    .font(.system(.caption, design: .serif))
                    .foregroundColor(Ulkoasu.haalea)
                    .lineLimit(1)
            }

            Spacer(minLength: 6)

            Text(TilanneNakyma.paivanNimi(tila.paiva))
                .font(.system(.footnote, design: .serif).weight(.medium))
                .foregroundColor(Ulkoasu.muste)
                .lineLimit(1)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
    }

    // MARK: - Keskikokoinen

    private func keskikoko(_ tila: JaettuPelitila.Tila) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            otsikkorivi

            Spacer(minLength: 8)

            HStack(alignment: .lastTextBaseline, spacing: 12) {
                VStack(alignment: .leading, spacing: 2) {
                    Text(tila.kaupunki)
                        .font(.system(.title, design: .serif).weight(.semibold))
                        .foregroundColor(Ulkoasu.muste)
                        .minimumScaleFactor(0.6)
                        .lineLimit(1)

                    if !tila.maa.isEmpty {
                        Text(tila.maa)
                            .font(.system(.caption, design: .serif))
                            .foregroundColor(Ulkoasu.haalea)
                            .lineLimit(1)
                    }
                }

                Spacer(minLength: 0)

                VStack(alignment: .trailing, spacing: 2) {
                    Text(TilanneNakyma.paivanNimi(tila.paiva))
                        .font(.system(.headline, design: .serif))
                        .foregroundColor(Ulkoasu.muste)
                        .lineLimit(1)

                    if !tila.raha.isEmpty {
                        Text(tila.raha)
                            .font(.system(.subheadline, design: .serif))
                            .foregroundColor(Ulkoasu.haalea)
                            .lineLimit(1)
                    }
                }
            }

            Spacer(minLength: 6)

            // Rehellisyys ennen kauneutta: jos tieto on vanhaa, se sanotaan.
            if let ika = TilanneNakyma.ika(tila.paivitetty) {
                Text(ika)
                    .font(.system(size: 10, design: .serif))
                    .foregroundColor(Ulkoasu.haalea.opacity(0.8))
                    .lineLimit(1)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
    }

    // MARK: - Ei aloitettu

    private var aloittamaton: some View {
        VStack(alignment: .leading, spacing: 6) {
            otsikkorivi

            Spacer(minLength: 4)

            Text("Matka ei ole alkanut")
                .font(.system(.headline, design: .serif))
                .foregroundColor(Ulkoasu.muste)
                .minimumScaleFactor(0.7)
                .lineLimit(2)

            Text("Avaa Matkakirja ja lähde liikkeelle.")
                .font(.system(.caption, design: .serif))
                .foregroundColor(Ulkoasu.haalea)
                .lineLimit(2)

            Spacer(minLength: 0)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
    }

    // MARK: - Osat

    /// Ohut yläreuna: pelin nimi pienellä ja kultainen viiva. Sama ele kuin
    /// pelin lehtien otsikoissa.
    private var otsikkorivi: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("MATKAKIRJA")
                .font(.system(size: 9, weight: .semibold, design: .serif))
                .tracking(1.6)
                .foregroundColor(Ulkoasu.haalea)
                .lineLimit(1)

            Rectangle()
                .fill(Ulkoasu.kulta.opacity(0.7))
                .frame(height: 1)
        }
    }

    /// Pergamentin liuku. Kaksi sävyä riittää: enemmän näyttäisi kotinäytöllä
    /// levottomalta pienessä koossa.
    private var pergamentti: some View {
        LinearGradient(colors: [Ulkoasu.paperi, Ulkoasu.varjopaperi],
                       startPoint: .topLeading,
                       endPoint: .bottomTrailing)
    }

    // MARK: - Tekstit

    static func paivanNimi(_ paiva: Int) -> String {
        paiva > 0 ? "Päivä \(paiva)" : "Matka alkaa"
    }

    /// "päivitetty eilen" ja vastaavat. Tuoreesta tiedosta ei sanota
    /// mitään — merkintä on tarpeen vain kun tieto voi olla väärää.
    static func ika(_ hetki: Date?) -> String? {
        guard let hetki = hetki else { return nil }
        let kulunut = Date().timeIntervalSince(hetki)
        guard kulunut >= 3600 else { return nil }
        if kulunut < 86400 {
            return "päivitetty \(Int(kulunut / 3600)) t sitten"
        }
        let vuorokaudet = Int(kulunut / 86400)
        return vuorokaudet == 1 ? "päivitetty eilen" : "päivitetty \(vuorokaudet) vrk sitten"
    }
}

// MARK: - Taustan sijoitus

private extension View {

    /// iOS 17 vaati widgeteiltä `containerBackground`-taustan: ilman sitä
    /// widget näkyy StandBy-tilassa ja lukitusnäytöllä väärin. Vanhemmissa
    /// tavallinen `background` on ainoa tapa. Kuoren alaraja on iOS 16,
    /// joten molemmat tarvitaan.
    @ViewBuilder
    func widgetTausta<Tausta: View>(_ tausta: Tausta) -> some View {
        if #available(iOS 17.0, *) {
            containerBackground(for: .widget) { tausta }
        } else {
            padding(14).background(tausta)
        }
    }
}
