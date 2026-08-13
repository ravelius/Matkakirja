import AVFoundation
import Foundation
import Speech

/// Sanelu: pelaajan puhe tekstiksi.
///
/// Käytössä on SFSpeechRecognizer, joka on ollut iOS:ssä pitkään ja toimii
/// tämän kuoren minimiversiosta (iOS 16) alkaen. Tunnistus tehdään
/// laitteessa aina kun laite siihen pystyy: silloin puhe ei lähde verkkoon
/// eikä sanelu vaadi yhteyttä.
///
/// TODO (kun kuoren minimiversio nousee iOS 26:een): korvaa SFSpeechRecognizer
/// uudella SpeechAnalyzer/SpeechTranscriber-rajapinnalla. Se on tarkempi,
/// nopeampi ja laitteessa toimiva oletuksena, mutta se ei ole käytettävissä
/// vanhemmilla käyttöjärjestelmillä — siksi vaihto vasta kun minimiversio
/// sallii. Vaihto koskee vain tätä tiedostoa: sillan rajapinta pysyy samana.
final class SaneluSilta: NSObject {

    weak var tapahtumat: SiltaTapahtumat?

    /*
     * Moottori on var eikä let: se luodaan UUTENA jokaiseen aloitukseen
     * (ks. kaynnista). Luokan alustuksessa syntynyt moottori ehti
     * sitoutua toistoluokan äänipolkuun, ja sen inputNode raportoi
     * 0 Hz:n muodon vaikka istunto oli jo vaihdettu nauhoitusluokkaan —
     * omistajan iPhonella (TestFlight) jokainen sanelu kaatui tähän
     * ("Mikrofonia ei löytynyt", 13.8.2026).
     */
    private var moottori = AVAudioEngine()
    private var tunnistin: SFSpeechRecognizer?
    private var pyynto: SFSpeechAudioBufferRecognitionRequest?
    private var tehtava: SFSpeechRecognitionTask?
    private var viimeisinTeksti = ""
    /// Onko äänistunto nauhoitustilassa. Erillinen `kuuntelee`-tilasta, koska
    /// käynnistys voi kaatua tilanvaihdon jälkeen — silloinkin tila on
    /// palautettava, tai pelin äänet jäisivät nauhoitusluokkaan vaimeiksi.
    private var aanitilaPaalla = false

    private(set) var kuuntelee = false

    /// Onko puheentunnistus ylipäätään mahdollista tällä laitteella ja kielellä?
    static func tuettu(kieli: String) -> Bool {
        SFSpeechRecognizer(locale: Locale(identifier: kieli)) != nil
    }

    // MARK: - Luvat

    /// Kysyy molemmat luvat ja kertoo tuloksen. Peli voi kutsua tätä ennen
    /// kuin näyttää mikrofoninapin, jottei nappi lupaa mitä se ei voi pitää.
    func luvat(vastaus: @escaping (Any?, String?) -> Void) {
        pyydaLuvat { puhe, mikrofoni in
            vastaus([
                "puheentunnistus": puhe,
                "mikrofoni": mikrofoni,
                "kunnossa": puhe && mikrofoni
            ], nil)
        }
    }

    private func pyydaLuvat(valmis: @escaping (Bool, Bool) -> Void) {
        SFSpeechRecognizer.requestAuthorization { tila in
            let puheOk = (tila == .authorized)
            SaneluSilta.pyydaMikrofonilupa { mikrofoniOk in
                DispatchQueue.main.async { valmis(puheOk, mikrofoniOk) }
            }
        }
    }

    private static func pyydaMikrofonilupa(valmis: @escaping (Bool) -> Void) {
        if #available(iOS 17.0, *) {
            AVAudioApplication.requestRecordPermission { myonnetty in valmis(myonnetty) }
        } else {
            AVAudioSession.sharedInstance().requestRecordPermission { myonnetty in valmis(myonnetty) }
        }
    }

    // MARK: - Sanelu

    /// Aloittaa kuuntelun. Vastaus ratkeaa kun mikrofoni on auki; tunnistetut
    /// sanat tulevat tapahtumina (`sanelu-osittainen`, `sanelu-valmis`).
    func aloita(kieli: String,
                laitteessa: Bool?,
                vastaus: @escaping (Any?, String?) -> Void) {

        // Uusi aloitus kesken kuuntelun tarkoittaa aina "aloita alusta".
        siivoa()

        guard let tunnistin = SFSpeechRecognizer(locale: Locale(identifier: kieli)) else {
            vastaus(nil, "Puheentunnistus ei tue kieltä \(kieli)")
            return
        }
        guard tunnistin.isAvailable else {
            vastaus(nil, "Puheentunnistus ei ole juuri nyt käytettävissä")
            return
        }
        self.tunnistin = tunnistin

        pyydaLuvat { [weak self] puheOk, mikrofoniOk in
            guard let self = self else { return }
            guard puheOk else {
                vastaus(nil, "Puheentunnistuslupaa ei ole annettu")
                return
            }
            guard mikrofoniOk else {
                vastaus(nil, "Mikrofonilupaa ei ole annettu")
                return
            }
            self.kaynnista(tunnistin: tunnistin, laitteessa: laitteessa, vastaus: vastaus)
        }
    }

    private func kaynnista(tunnistin: SFSpeechRecognizer,
                           laitteessa: Bool?,
                           vastaus: @escaping (Any?, String?) -> Void) {
        viimeisinTeksti = ""
        do {
            // Äänitila ensin: syötesolmun muoto on kelvollinen vasta kun
            // istunto on nauhoitusluokassa ja päällä.
            try AaniIstunto.sanelutila()
            aanitilaPaalla = true
        } catch {
            vastaus(nil, "Mikrofonia ei saatu käyttöön: \(error.localizedDescription)")
            return
        }

        /*
         * Tuore moottori sitoutuu vasta nyt aktivoituun
         * nauhoitusistuntoon. Kierrätetty moottori jäi toistoluokan
         * aikaiseen syötepolkuun ja raportoi 0 Hz:n muodon (ks. kentän
         * kommentti) — se oli "Mikrofonia ei löytynyt" -virheen syy.
         */
        moottori = AVAudioEngine()

        let uusiPyynto = SFSpeechAudioBufferRecognitionRequest()
        uusiPyynto.shouldReportPartialResults = true
        let laitteessaKaytossa = laitteessa ?? tunnistin.supportsOnDeviceRecognition
        uusiPyynto.requiresOnDeviceRecognition = laitteessaKaytossa && tunnistin.supportsOnDeviceRecognition
        pyynto = uusiPyynto

        tehtava = tunnistin.recognitionTask(with: uusiPyynto) { [weak self] tulos, virhe in
            guard let self = self else { return }
            DispatchQueue.main.async {
                if let tulos = tulos {
                    let teksti = tulos.bestTranscription.formattedString
                    self.viimeisinTeksti = teksti
                    if tulos.isFinal {
                        self.suljeMikrofoni()
                        self.pyynto = nil
                        self.tehtava = nil
                        self.tapahtumat?.siltaLahetti(laji: "sanelu-valmis", tiedot: ["teksti": teksti])
                        return
                    }
                    self.tapahtumat?.siltaLahetti(laji: "sanelu-osittainen", tiedot: ["teksti": teksti])
                }
                if let virhe = virhe {
                    let numero = (virhe as NSError).code
                    // 216 / 1110: tunnistin lopetti ilman puhetta — ei virhe pelaajalle.
                    let hiljaisuus = (numero == 216 || numero == 1110)
                    self.siivoa()
                    if hiljaisuus {
                        self.tapahtumat?.siltaLahetti(laji: "sanelu-valmis",
                                                      tiedot: ["teksti": self.viimeisinTeksti])
                    } else {
                        self.tapahtumat?.siltaLahetti(laji: "sanelu-virhe", tiedot: [
                            "syy": "tunnistus",
                            "viesti": virhe.localizedDescription
                        ])
                    }
                }
            }
        }

        var syote = moottori.inputNode
        var muoto = syote.outputFormat(forBus: 0)
        if muoto.sampleRate == 0 { muoto = syote.inputFormat(forBus: 0) }
        if muoto.sampleRate == 0 {
            /*
             * Syötepolku ei ollut vielä valmis: istunto uudelleen päälle
             * ja vielä yksi tuore moottori ennen luovuttamista. Tämä on
             * varaporras — tuoreen moottorin pitäisi riittää yksinään.
             */
            AaniIstunto.lopetaSanelutila()
            do {
                try AaniIstunto.sanelutila()
            } catch {
                siivoa()
                vastaus(nil, "Mikrofonia ei saatu käyttöön: \(error.localizedDescription)")
                return
            }
            moottori = AVAudioEngine()
            syote = moottori.inputNode
            muoto = syote.outputFormat(forBus: 0)
            if muoto.sampleRate == 0 { muoto = syote.inputFormat(forBus: 0) }
        }
        guard muoto.sampleRate > 0 else {
            siivoa()
            vastaus(nil, "Mikrofonia ei löytynyt")
            return
        }
        syote.removeTap(onBus: 0)
        syote.installTap(onBus: 0, bufferSize: 1024, format: muoto) { [weak self] puskuri, _ in
            self?.pyynto?.append(puskuri)
        }

        moottori.prepare()
        do {
            try moottori.start()
        } catch {
            siivoa()
            vastaus(nil, "Äänen kaappaus ei käynnistynyt: \(error.localizedDescription)")
            return
        }

        kuuntelee = true
        tapahtumat?.siltaLahetti(laji: "sanelu-alkoi", tiedot: [
            "kieli": tunnistin.locale.identifier,
            "laitteessa": uusiPyynto.requiresOnDeviceRecognition
        ])
        vastaus([
            "tila": "kuuntelee",
            "kieli": tunnistin.locale.identifier,
            "laitteessa": uusiPyynto.requiresOnDeviceRecognition
        ], nil)
    }

    /// Lopettaa kuuntelun. Viimeistelty teksti tulee vielä perässä
    /// tapahtumana `sanelu-valmis`; vastauksessa on tähänastinen teksti.
    func lopeta(vastaus: @escaping (Any?, String?) -> Void) {
        let teksti = viimeisinTeksti
        let oliKaynnissa = kuuntelee
        // Mikrofoni kiinni, mutta tunnistustehtävä jätetään elämään: se
        // viimeistelee tekstin (välimerkit, korjaukset) vielä sulkemisen jälkeen.
        suljeMikrofoni()
        vastaus(["tila": oliKaynnissa ? "lopetettu" : "ei-kaynnissa", "teksti": teksti], nil)
    }

    /// Sovellus meni taustalle: mikrofoni kiinni ilman että kukaan odottaa
    /// vastausta, eikä kesken ollutta tunnistusta jäädä viimeistelemään.
    func keskeyta() {
        guard kuuntelee else { return }
        let teksti = viimeisinTeksti
        siivoa()
        tapahtumat?.siltaLahetti(laji: "sanelu-keskeytyi", tiedot: ["teksti": teksti])
    }

    /// Sulkee mikrofonin ja palauttaa äänitilan. Tunnistustehtävä jää käyntiin.
    private func suljeMikrofoni() {
        if moottori.isRunning {
            moottori.stop()
        }
        moottori.inputNode.removeTap(onBus: 0)
        pyynto?.endAudio()
        kuuntelee = false
        if aanitilaPaalla {
            aanitilaPaalla = false
            AaniIstunto.lopetaSanelutila()
        }
    }

    /// Kaikki kiinni, myös kesken oleva tunnistus.
    private func siivoa() {
        suljeMikrofoni()
        pyynto = nil
        tehtava?.cancel()
        tehtava = nil
    }
}
