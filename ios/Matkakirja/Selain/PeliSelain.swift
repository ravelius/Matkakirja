import Combine
import Foundation
import SwiftUI
import UIKit
import WebKit

/// Pelin selainnäkymä ja sen elinkaari.
///
/// Yksi WKWebView, joka luodaan kerran ja elää koko sovelluksen ajan.
/// Näkymä ei omista peliä — peli on verkossa ja päivittyy sinne — vaan
/// hoitaa sen ympärillä olevan: latauksen, virhetilan, äänet, ulkoiset
/// linkit ja natiivisillat.
final class PeliSelain: NSObject, ObservableObject {

    enum Tila: Equatable {
        /// Peliä haetaan verkosta.
        case lataa
        /// Peli näkyy ruudulla.
        case valmis
        /// Config.plistin PELIN_OSOITE on yhä paikkamerkki.
        case eiOsoitetta
        /// Lataus epäonnistui; teksti on pelaajalle näytettävä selitys.
        case virhe(String)
    }

    @Published private(set) var tila: Tila = .lataa

    let webNakyma: WKWebView
    let sillat: NatiiviSilta

    private let pelinOsoite: URL?
    private var ensimmainenLatausTehty = false

    override init() {
        let osoite = Asetukset.pelinOsoite
        pelinOsoite = osoite

        let silta = NatiiviSilta()
        sillat = silta

        let asetukset = WKWebViewConfiguration()
        let sisalto = WKUserContentController()
        silta.rekisteroi(sisalto)
        asetukset.userContentController = sisalto

        // Pelin äänet ja luennat saavat soida ilman erillistä napautusta,
        // ja videot soivat sivulla eivätkä avaudu koko ruudun soittimeen.
        asetukset.allowsInlineMediaPlayback = true
        asetukset.mediaTypesRequiringUserActionForPlayback = []
        asetukset.allowsAirPlayForMediaPlayback = true
        // Pysyvä varasto: peli tallettaa localStorageen ja rekisteröi
        // palvelutyöntekijän, joten sen aineiston on säilyttävä käyntien yli.
        asetukset.websiteDataStore = .default()
        if #available(iOS 15.4, *) {
            asetukset.preferences.isElementFullscreenEnabled = true
        }

        webNakyma = WKWebView(frame: .zero, configuration: asetukset)
        super.init()

        silta.selain = webNakyma
        webNakyma.navigationDelegate = self
        webNakyma.uiDelegate = self
        viimeisteleSelain()
        AaniIstunto.toistotila()

        if osoite == nil {
            tila = .eiOsoitetta
        } else {
            lataaPeli()
        }
    }

    // MARK: - Lataus

    /// Hakee pelin uudestaan. `ohitaValimuisti` on tarpeen esimerkiksi
    /// verkkokatkon jälkeen: iOS pitää kiinni epäonnistuneesta vastauksesta.
    func lataaPeli(ohitaValimuisti: Bool = false) {
        guard let osoite = pelinOsoite else {
            tila = .eiOsoitetta
            return
        }
        tila = .lataa
        var pyynto = URLRequest(url: osoite)
        pyynto.cachePolicy = ohitaValimuisti ? .reloadIgnoringLocalAndRemoteCacheData : .useProtocolCachePolicy
        webNakyma.load(pyynto)
    }

    // MARK: - Etualalle palaaminen

    /// Sovellus tuli etualalle. Kuori ei päätä päivityksestä itse, vaan
    /// kehottaa sivua tarkistamaan uuden version: pelissä on jo
    /// palvelutyöntekijä ja Päivitä-mekanismi, jotka osaavat asian.
    func aktivoitui() {
        // Sillat heräävät aina, myös silloin kun osoite puuttuu: iCloudin
        // muutokset ja haptiikan lämmitys eivät liity pelin lataamiseen.
        sillat.aktivoitui()
        guard tila != .eiOsoitetta else { return }
        sillat.laheta(laji: "aktivoitui", tiedot: [:])

        if case .virhe = tila {
            // Verkko on voinut palata sillä välin.
            lataaPeli(ohitaValimuisti: true)
            return
        }
        if !ensimmainenLatausTehty && !webNakyma.isLoading {
            lataaPeli()
            return
        }
        pyydaPaivitystarkistus()
    }

    func siirtyiTaustalle() {
        sillat.laheta(laji: "taustalle", tiedot: [:])
        // Sanelu ei jää päälle taskussa.
        sillat.keskeytaSanelu()
    }

    private func pyydaPaivitystarkistus() {
        let skripti = """
        (function () {
          try {
            window.dispatchEvent(new CustomEvent('matkakirja-tarkista-paivitys'));
            if (navigator.serviceWorker && navigator.serviceWorker.getRegistration) {
              navigator.serviceWorker.getRegistration().then(function (rekisterointi) {
                if (rekisterointi && rekisterointi.update) { rekisterointi.update(); }
              }).catch(function () {});
            }
          } catch (virhe) { /* sivu ei ole vielä valmis */ }
        })();
        """
        webNakyma.evaluateJavaScript(skripti, completionHandler: nil)
    }

    // MARK: - Selaimen viimeistely

    private func viimeisteleSelain() {
        let tausta = UIColor(named: "Taustavari") ?? UIColor.black
        webNakyma.isOpaque = false
        webNakyma.backgroundColor = tausta
        webNakyma.scrollView.backgroundColor = tausta

        // Reunojen kumiscrollaus pois: pelilauta ei ole sivu jota selataan,
        // ja venytys paljastaisi kuoren taustan kesken siirron.
        webNakyma.scrollView.bounces = false
        webNakyma.scrollView.alwaysBounceVertical = false
        webNakyma.scrollView.alwaysBounceHorizontal = false
        webNakyma.scrollView.contentInsetAdjustmentBehavior = .never
        webNakyma.scrollView.showsVerticalScrollIndicator = false
        webNakyma.scrollView.showsHorizontalScrollIndicator = false
        // Nipistyszoomaus pois — pelissä napautus on siirto, ei kuvan katselua.
        webNakyma.scrollView.pinchGestureRecognizer?.isEnabled = false

        // Reunan pyyhkäisy taaksepäin veisi pelistä ulos vahingossa.
        webNakyma.allowsBackForwardNavigationGestures = false
        webNakyma.allowsLinkPreview = false

        #if DEBUG
        if #available(iOS 16.4, *) {
            // Safarin kehitysvalikko näkee pelin vain kehityskäännöksessä.
            webNakyma.isInspectable = true
        }
        #endif
    }

    /// Kuuluuko osoite peliin vai onko se ulkopuolinen linkki?
    private func onkoPelinOsoite(_ osoite: URL) -> Bool {
        guard let pelinIsanta = pelinOsoite?.host?.lowercased() else { return false }
        guard let isanta = osoite.host?.lowercased() else { return false }
        return isanta == pelinIsanta
    }

    /// Avaa osoitteen Safarissa. Lähdelinkit ja Wikipedia eivät jää pelin
    /// sisään, koska kuoressa ei ole osoiterivia eikä paluunappia.
    private func avaaJarjestelmassa(_ osoite: URL) {
        UIApplication.shared.open(osoite, options: [:], completionHandler: nil)
    }

    fileprivate var esittavaOhjain: UIViewController? {
        var ohjain = webNakyma.window?.rootViewController
        while let seuraava = ohjain?.presentedViewController {
            ohjain = seuraava
        }
        return ohjain
    }
}

// MARK: - Navigointi

extension PeliSelain: WKNavigationDelegate {

    func webView(_ webView: WKWebView,
                 decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let osoite = navigationAction.request.url else {
            decisionHandler(.allow)
            return
        }
        let kaava = osoite.scheme?.lowercased() ?? ""

        // Sivun sisäiset kaavat kulkevat aina läpi.
        if kaava == "about" || kaava == "data" || kaava == "blob" || kaava == "file" {
            decisionHandler(.allow)
            return
        }
        // tel:, mailto:, maps: ja muut järjestelmän kaavat kuuluvat iOS:lle.
        if kaava != "http" && kaava != "https" {
            avaaJarjestelmassa(osoite)
            decisionHandler(.cancel)
            return
        }
        if onkoPelinOsoite(osoite) {
            decisionHandler(.allow)
            return
        }
        avaaJarjestelmassa(osoite)
        decisionHandler(.cancel)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        ensimmainenLatausTehty = true
        tila = .valmis
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        merkitseVirhe(error)
    }

    func webView(_ webView: WKWebView,
                 didFailProvisionalNavigation navigation: WKNavigation!,
                 withError error: Error) {
        merkitseVirhe(error)
    }

    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        // Muistipaine tappoi sivun prosessin: haetaan peli uudestaan sen sijaan
        // että pelaaja jäisi tuijottamaan valkoista ruutua.
        lataaPeli()
    }

    private func merkitseVirhe(_ virhe: Error) {
        let numero = (virhe as NSError).code
        // Peruttu lataus ei ole virhe (esim. uusi lataus alkoi päälle).
        if numero == NSURLErrorCancelled { return }
        tila = .virhe(PeliSelain.selitys(virheelle: numero))
    }

    /// Pelaajalle näytettävä selitys. Ei koodinumeroita eikä englantia.
    static func selitys(virheelle numero: Int) -> String {
        switch numero {
        case NSURLErrorNotConnectedToInternet, NSURLErrorNetworkConnectionLost:
            return "Puhelin ei ole verkossa. Kytke wifi tai mobiiliyhteys päälle ja yritä uudestaan."
        case NSURLErrorTimedOut:
            return "Peli ei vastannut ajoissa. Yhteys voi olla hidas — yritä hetken päästä uudestaan."
        case NSURLErrorCannotFindHost, NSURLErrorCannotConnectToHost, NSURLErrorDNSLookupFailed:
            return "Pelin osoitetta ei löytynyt verkosta. Tarkista yhteys, tai osoite kuoren asetuksista."
        case NSURLErrorSecureConnectionFailed, NSURLErrorServerCertificateUntrusted:
            return "Suojattu yhteys peliin ei onnistunut. Yritä uudestaan myöhemmin."
        default:
            return "Peliä ei saatu ladattua. Tarkista verkkoyhteys ja yritä uudestaan."
        }
    }
}

// MARK: - Ikkunat ja ilmoitukset

extension PeliSelain: WKUIDelegate {

    /// target="_blank" -linkit: uutta ikkunaa ei ole, joten ne menevät Safariin.
    func webView(_ webView: WKWebView,
                 createWebViewWith configuration: WKWebViewConfiguration,
                 for navigationAction: WKNavigationAction,
                 windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let osoite = navigationAction.request.url {
            if onkoPelinOsoite(osoite) {
                webView.load(navigationAction.request)
            } else {
                avaaJarjestelmassa(osoite)
            }
        }
        return nil
    }

    // Peli ei tällä hetkellä käytä alert/confirm/prompt-ikkunoita, mutta ilman
    // näitä ne jäisivät WKWebViewssä hiljaa toimimatta — ansa tulevalle koodille.

    func webView(_ webView: WKWebView,
                 runJavaScriptAlertPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping () -> Void) {
        guard let ohjain = esittavaOhjain else { completionHandler(); return }
        let ikkuna = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        ikkuna.addAction(UIAlertAction(title: "Selvä", style: .default) { _ in completionHandler() })
        ohjain.present(ikkuna, animated: true)
    }

    func webView(_ webView: WKWebView,
                 runJavaScriptConfirmPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping (Bool) -> Void) {
        guard let ohjain = esittavaOhjain else { completionHandler(false); return }
        let ikkuna = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        ikkuna.addAction(UIAlertAction(title: "Peruuta", style: .cancel) { _ in completionHandler(false) })
        ikkuna.addAction(UIAlertAction(title: "Jatka", style: .default) { _ in completionHandler(true) })
        ohjain.present(ikkuna, animated: true)
    }

    func webView(_ webView: WKWebView,
                 runJavaScriptTextInputPanelWithPrompt prompt: String,
                 defaultText: String?,
                 initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping (String?) -> Void) {
        guard let ohjain = esittavaOhjain else { completionHandler(nil); return }
        let ikkuna = UIAlertController(title: nil, message: prompt, preferredStyle: .alert)
        ikkuna.addTextField { kentta in kentta.text = defaultText }
        ikkuna.addAction(UIAlertAction(title: "Peruuta", style: .cancel) { _ in completionHandler(nil) })
        ikkuna.addAction(UIAlertAction(title: "Valmis", style: .default) { _ in
            completionHandler(ikkuna.textFields?.first?.text)
        })
        ohjain.present(ikkuna, animated: true)
    }
}
