import SwiftUI

/// Sovelluksen ainoa näkymä: peli, ja sen päällä tarvittaessa kuoren oma
/// ilmoitus. Kuoressa ei ole valikkoja eikä osoiteriviä — mitä vähemmän
/// kuori näkyy, sitä paremmin se tekee työnsä.
struct PeliNakyma: View {

    @ObservedObject var selain: PeliSelain

    var body: some View {
        ZStack {
            Ulkoasu.tausta
                .ignoresSafeArea()

            // Sivu hoitaa turva-alueet itse (viewport-fit=cover), joten
            // selain saa koko ruudun lovea ja kotipalkkia myöten.
            SelainNakyma(selain: selain)
                .ignoresSafeArea()

            switch selain.tila {
            case .lataa:
                LatausNakyma()
            case .valmis:
                EmptyView()
            case .eiOsoitetta:
                AsetusNakyma()
            case .virhe(let viesti):
                OfflineNakyma(viesti: viesti) {
                    selain.lataaPeli(ohitaValimuisti: true)
                }
            }
        }
    }
}

/// Latausruutu. Peittää valkoisen välähdyksen, jonka WKWebView muuten
/// näyttäisi ennen ensimmäistä piirtoa.
struct LatausNakyma: View {
    var body: some View {
        ZStack {
            Ulkoasu.tausta.ignoresSafeArea()
            VStack(spacing: 18) {
                ProgressView()
                    .progressViewStyle(.circular)
                    .tint(Ulkoasu.kulta)
                Text("Avataan matkakirjaa…")
                    .font(.system(.body, design: .serif))
                    .foregroundColor(Ulkoasu.himmea)
            }
        }
        .transition(.opacity)
    }
}

/// Verkko poikki tai palvelin vaiti.
struct OfflineNakyma: View {

    let viesti: String
    let yritaUudelleen: () -> Void

    var body: some View {
        ZStack {
            Ulkoasu.tausta.ignoresSafeArea()
            VStack(spacing: 22) {
                Text("Matka katkesi")
                    .font(.system(.title, design: .serif))
                    .foregroundColor(Ulkoasu.kulta)

                Text(viesti)
                    .font(.system(.body, design: .serif))
                    .foregroundColor(Ulkoasu.paperi)
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)

                Button(action: yritaUudelleen) {
                    Text("Yritä uudelleen")
                        .font(.system(.headline, design: .serif))
                        .foregroundColor(Ulkoasu.tausta)
                        .padding(.horizontal, 26)
                        .padding(.vertical, 12)
                        .background(
                            RoundedRectangle(cornerRadius: 10, style: .continuous)
                                .fill(Ulkoasu.kulta)
                        )
                }
                .padding(.top, 4)

                Text("Kerran ladattu peli toimii myös ilman verkkoa, kun se on ehtinyt tallentua puhelimeen.")
                    .font(.system(.footnote, design: .serif))
                    .foregroundColor(Ulkoasu.himmea)
                    .multilineTextAlignment(.center)
                    .padding(.top, 8)
            }
            .padding(32)
        }
    }
}

/// Pelin osoite on yhä paikkamerkki. Tämä näkyy vain kehityskäännöksessä
/// tai jos Config.plist on jäänyt täyttämättä.
struct AsetusNakyma: View {
    var body: some View {
        ZStack {
            Ulkoasu.tausta.ignoresSafeArea()
            VStack(spacing: 18) {
                Text("Pelin osoitetta ei ole asetettu")
                    .font(.system(.title2, design: .serif))
                    .foregroundColor(Ulkoasu.kulta)
                    .multilineTextAlignment(.center)

                Text("Kuori ei tiedä, mistä peli haetaan. Osoite kirjoitetaan tiedostoon ios/Matkakirja/Resurssit/Config.plist kohtaan PELIN_OSOITE.")
                    .font(.system(.body, design: .serif))
                    .foregroundColor(Ulkoasu.paperi)
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)

                Text("Ohje: ios/OHJE.md")
                    .font(.system(.footnote, design: .serif))
                    .foregroundColor(Ulkoasu.himmea)
            }
            .padding(32)
        }
    }
}
