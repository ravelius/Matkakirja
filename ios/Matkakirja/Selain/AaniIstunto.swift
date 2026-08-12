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
    static func sanelutila() throws {
        // Apple nimesi asetuksen uudelleen iOS 26:n kääntäjässä. Vanha nimi
        // toimii yhä, mutta varoittaa; uutta nimeä ei ole vanhemmissa
        // Xcodeissa. Valinta tehdään siis kääntäjän version mukaan, jotta
        // sama koodi kääntyy puhtaasti molemmilla.
        #if compiler(>=6.2)
        let kuulokkeet: AVAudioSession.CategoryOptions = .allowBluetoothHFP
        #else
        let kuulokkeet: AVAudioSession.CategoryOptions = .allowBluetooth
        #endif

        let istunto = AVAudioSession.sharedInstance()
        try istunto.setCategory(.playAndRecord,
                                mode: .measurement,
                                options: [.duckOthers, .defaultToSpeaker, kuulokkeet])
        try istunto.setActive(true, options: [])
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
