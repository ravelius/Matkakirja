import SwiftUI

/// Kuoren värit. Samat kuin pelissä (css/tyyli.css ja manifest.webmanifest),
/// jotta lataus- ja virhenäkymä eivät näytä toisen sovelluksen osilta.
enum Ulkoasu {
    /// #1d1610 — pelin tausta.
    static let tausta = Color(red: 29.0 / 255, green: 22.0 / 255, blue: 16.0 / 255)
    /// #e8d2a5 — päiväkirjan paperi.
    static let paperi = Color(red: 232.0 / 255, green: 210.0 / 255, blue: 165.0 / 255)
    /// #e5ac36 — aarteen kulta.
    static let kulta = Color(red: 229.0 / 255, green: 172.0 / 255, blue: 54.0 / 255)
    /// Himmeämpi paperi leipätekstiin.
    static let himmea = Color(red: 201.0 / 255, green: 168.0 / 255, blue: 111.0 / 255)
}
