import SwiftUI
import WebKit

/// SwiftUI-kääre pelin WKWebViewlle.
///
/// Näkymä ei luo selainta vaan lainaa sen PeliSelaimelta: jos SwiftUI saisi
/// luoda uuden joka piirrolla, peli latautuisi alusta aina kun kuoren tila
/// muuttuu — ja pelaajan vuoro alkaisi uudestaan.
struct SelainNakyma: UIViewRepresentable {

    let selain: PeliSelain

    func makeUIView(context: Context) -> WKWebView {
        selain.webNakyma
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        // Selain elää omaa elämäänsä; SwiftUI ei ohjaa sitä.
    }
}
