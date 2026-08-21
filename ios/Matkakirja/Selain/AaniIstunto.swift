import AVFoundation
import Foundation

/// Äänen istuntotila.
///
/// Sovelluksella on kaksi tilaa: tavallinen toisto (pelin tunnelmaäänet,
/// luennat) ja sanelu (mikrofoni auki). Sanelu vaatii nauhoitusluokan, joten
/// tila vaihdetaan sanelun ajaksi ja palautetaan heti perään — muuten pelin
/// äänet jäisivät nauhoitusluokkaan, jossa ne kuuluvat hiljempaa.
enum AaniIstunto {

    /// Tavallinen toistotila. `mixWithOthers` jättää pelaajan oman musiikin
    /// soimaan: peli ei ole se sovellus, joka vaatii koko äänimaailman.
    static func toistotila() {
        let istunto = AVAudioSession.sharedInstance()
        do {
            try istunto.setCategory(.playback, mode: .default, options: [.mixWithOthers])
            try istunto.setActive(true, options: [])
        } catch {
            NSLog("Matkakirja: toistotilaa ei saatu päälle (%@)", error.localizedDescription)
        }
    }

    /// Sanelutila: mikrofoni auki, muut äänet vaimennettuina, kaiutin käyttöön
    /// myös silloin kun kuulokkeita ei ole.
    ///
    /// SANELU KÄYTTÄÄ AINA SISÄÄNRAKENNETTUA MIKROFONIA (omistajan tilaus
    /// 21.8.2026). Bluetooth-mikrofonia EI sallita — `allowBluetooth(HFP)`
    /// oli mukana aiemmin, ja juuri se aiheutti omistajan havaitseman vian:
    /// kun iOS ottaa kuulokkeen mikrofonin käyttöön, kuuloke putoaa
    /// musiikkiprofiilista (A2DP) puheluprofiiliin (HFP), ja toisto siirtyy
    /// puhelulaatuiseksi tai laitteen omaan kaiuttimeen. Sanelun perään
    /// luettu pöllön vastaus soi silloin väärästä paikasta, vaikka lehden
    /// luenta (jonka aikana mikrofonia ei avata) kuului kuulokkeista.
    ///
    /// Ilman `allowBluetooth`-valintaa iOS asettaa `.playAndRecord`-luokalle
    /// A2DP-ULOSTULON automaattisesti (iOS 10:stä alkaen): kuuloke pysyy
    /// musiikkiprofiilissa ja kuulee luennan, mutta sanelu tulee laitteen
    /// omasta mikrofonista. Juuri tätä haluttiin.
    ///
    /// `.defaultToSpeaker` jää: se ratkaisee vain sen, meneekö ääni
    /// kuulokeluurin vai kaiuttimen kautta silloin kun kuulokkeita EI ole
    /// kytketty — kytkettyä reittiä se ei ohita.
    static func sanelutila() throws {
        let istunto = AVAudioSession.sharedInstance()
        try istunto.setCategory(.playAndRecord,
                                mode: .measurement,
                                options: [.duckOthers, .defaultToSpeaker])
        try istunto.setActive(true, options: [])
        // Varmistus: jos laitteessa on silti useampi syöte tarjolla,
        // valitaan nimenomaan sisäänrakennettu. Epäonnistuminen ei ole
        // este — luokka-asetus on jo sulkenut Bluetooth-mikrofonin pois.
        if let sisainen = istunto.availableInputs?.first(where: { $0.portType == .builtInMic }) {
            try? istunto.setPreferredInput(sisainen)
        }
    }

    /// Sanelu ohi — takaisin toistotilaan.
    static func lopetaSanelutila() {
        let istunto = AVAudioSession.sharedInstance()
        do {
            try istunto.setActive(false, options: [.notifyOthersOnDeactivation])
        } catch {
            NSLog("Matkakirja: äänistunnon sulkeminen ei onnistunut (%@)", error.localizedDescription)
        }
        toistotila()
    }
}
