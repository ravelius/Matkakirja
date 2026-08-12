import AVFoundation
import Foundation

/// Luenta: teksti puheeksi laitteen omalla puhesyntetisaattorilla.
///
/// Peli käyttää valmiiksi äänitettyjä luentoja siellä missä ne ovat
/// tärkeitä. Tämä silta on niitä varten, mitä ei voi äänittää etukäteen:
/// Viisaan Pöllön vastaukset, pelaajan omat merkinnät, uusi lehtiteksti.
/// Ääni valitaan aina laadukkain saatavilla oleva — jos pelaaja on ladannut
/// laitteeseen parannetun tai huippulaatuisen suomalaisen äänen, käytetään sitä.
final class LuentaSilta: NSObject {

    /// Tapahtumien vastaanottaja (NatiiviSilta välittää ne sivulle).
    weak var tapahtumat: SiltaTapahtumat?

    private let puhuja = AVSpeechSynthesizer()
    /// Kesken olevien puheiden vastauskahvat: JS:n lupaus ratkeaa vasta kun
    /// puhe loppuu, jotta peli voi ketjuttaa luennan ja seuraavan kohtauksen.
    private var vastaukset: [String: (Any?, String?) -> Void] = [:]
    /// Puhe-olio → tunnus. Puhe-olioita ei voi laittaa sanakirjan avaimeksi
    /// sellaisenaan, joten avaimena on olion osoite.
    private var tunnukset: [ObjectIdentifier: String] = [:]

    override init() {
        super.init()
        puhuja.delegate = self
    }

    var puhuu: Bool { puhuja.isSpeaking }

    /// Puhu teksti. Vastaus ratkeaa vasta kun puhe on loppunut tai
    /// se on keskeytetty.
    func puhu(teksti: String,
              kieli: String,
              nopeus: Double?,
              korkeus: Double?,
              aanenTunnus: String?,
              vastaus: @escaping (Any?, String?) -> Void) {

        let siisti = teksti.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !siisti.isEmpty else {
            vastaus(nil, "Tyhjää tekstiä ei voi lukea")
            return
        }

        let puhe = AVSpeechUtterance(string: siisti)
        if let tunnus = aanenTunnus, let valittu = AVSpeechSynthesisVoice(identifier: tunnus) {
            puhe.voice = valittu
        } else {
            puhe.voice = LuentaSilta.parasAani(kielelle: kieli)
        }

        // Nopeus tulee sivulta kertoimena, jossa 1.0 on normaali puhe.
        if let kerroin = nopeus, kerroin > 0 {
            let raaka = Double(AVSpeechUtteranceDefaultSpeechRate) * kerroin
            let alaraja = Double(AVSpeechUtteranceMinimumSpeechRate)
            let ylaraja = Double(AVSpeechUtteranceMaximumSpeechRate)
            puhe.rate = Float(min(max(raaka, alaraja), ylaraja))
        }
        if let savel = korkeus {
            puhe.pitchMultiplier = Float(min(max(savel, 0.5), 2.0))
        }
        puhe.preUtteranceDelay = 0
        puhe.postUtteranceDelay = 0

        let tunnus = UUID().uuidString
        tunnukset[ObjectIdentifier(puhe)] = tunnus
        vastaukset[tunnus] = vastaus

        // Uusi luenta korvaa edellisen: päällekkäin puhuvat äänet ovat aina virhe.
        if puhuja.isSpeaking {
            puhuja.stopSpeaking(at: .immediate)
        }
        AaniIstunto.toistotila()
        puhuja.speak(puhe)
    }

    /// Katkaisee puheen heti. Kesken olleen puheen lupaus ratkeaa
    /// tilalla "keskeytetty".
    func pysayta() {
        guard puhuja.isSpeaking || puhuja.isPaused else { return }
        puhuja.stopSpeaking(at: .immediate)
    }

    /// Laitteessa olevat äänet, halutessa yhdelle kielelle rajattuna.
    static func aanet(kielelle kieli: String?) -> [[String: Any]] {
        var lista = AVSpeechSynthesisVoice.speechVoices()
        if let suodatin = kieli?.lowercased(), !suodatin.isEmpty {
            let paakieli = String(suodatin.split(separator: "-").first ?? "")
            lista = lista.filter { aani in
                let tunniste = aani.language.lowercased()
                return tunniste == suodatin || tunniste.hasPrefix(paakieli + "-")
            }
        }
        return lista
            .sorted { laatuArvo($0) > laatuArvo($1) }
            .map { aani in
                [
                    "tunnus": aani.identifier,
                    "nimi": aani.name,
                    "kieli": aani.language,
                    "laatu": laadunNimi(aani)
                ]
            }
    }

    /// Paras saatavilla oleva ääni kielelle: ensin tarkka kielikoodi
    /// (fi-FI), sitten sama pääkieli, ja niistä korkein laatu.
    static func parasAani(kielelle kieli: String) -> AVSpeechSynthesisVoice? {
        let toivottu = kieli.replacingOccurrences(of: "_", with: "-").lowercased()
        guard !toivottu.isEmpty else { return nil }
        let paakieli = String(toivottu.split(separator: "-").first ?? "")
        let kaikki = AVSpeechSynthesisVoice.speechVoices()

        var ehdokkaat = kaikki.filter { $0.language.lowercased() == toivottu }
        if ehdokkaat.isEmpty {
            ehdokkaat = kaikki.filter { $0.language.lowercased().hasPrefix(paakieli + "-") }
        }
        if ehdokkaat.isEmpty {
            // Ei kieltä laitteessa: annetaan järjestelmän valita itse.
            return AVSpeechSynthesisVoice(language: kieli)
        }
        return ehdokkaat.max { laatuArvo($0) < laatuArvo($1) }
    }

    /// Laatujärjestys ilman versiotarkistuksia: perus 1, parannettu 2, huippu 3.
    private static func laatuArvo(_ aani: AVSpeechSynthesisVoice) -> Int {
        aani.quality.rawValue
    }

    private static func laadunNimi(_ aani: AVSpeechSynthesisVoice) -> String {
        switch aani.quality.rawValue {
        case 3: return "huippu"
        case 2: return "parannettu"
        default: return "perus"
        }
    }

    private func ratkaise(_ puhe: AVSpeechUtterance, tila: String) {
        let avain = ObjectIdentifier(puhe)
        guard let tunnus = tunnukset.removeValue(forKey: avain) else { return }
        if let vastaus = vastaukset.removeValue(forKey: tunnus) {
            vastaus(["tunnus": tunnus, "tila": tila], nil)
        }
        tapahtumat?.siltaLahetti(laji: "luenta-loppui", tiedot: ["tunnus": tunnus, "tila": tila])
    }
}

extension LuentaSilta: AVSpeechSynthesizerDelegate {

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer,
                           didStart utterance: AVSpeechUtterance) {
        guard let tunnus = tunnukset[ObjectIdentifier(utterance)] else { return }
        tapahtumat?.siltaLahetti(laji: "luenta-alkoi", tiedot: [
            "tunnus": tunnus,
            "aani": utterance.voice?.identifier ?? "",
            "kieli": utterance.voice?.language ?? ""
        ])
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer,
                           didFinish utterance: AVSpeechUtterance) {
        ratkaise(utterance, tila: "valmis")
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer,
                           didCancel utterance: AVSpeechUtterance) {
        ratkaise(utterance, tila: "keskeytetty")
    }

    /// Puhuttavan kohdan korostus. Alku ja pituus ovat UTF-16-yksikköjä,
    /// eli suoraan JavaScriptin merkkijonoindeksejä — sivu voi korostaa
    /// luettavan kohdan ilman muunnoksia.
    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer,
                           willSpeakRangeOfSpeechString characterRange: NSRange,
                           utterance: AVSpeechUtterance) {
        guard let tunnus = tunnukset[ObjectIdentifier(utterance)] else { return }
        tapahtumat?.siltaLahetti(laji: "luenta-alue", tiedot: [
            "tunnus": tunnus,
            "alku": characterRange.location,
            "pituus": characterRange.length
        ])
    }
}
