import SwiftUI

/// Kuoren värit. Samat kuin pelissä (css/tyyli.css ja manifest.webmanifest),
/// jotta lataus- ja virhenäkymä eivät näytä toisen sovelluksen osilta.
///
/// Tiedosto käännetään sekä sovellukseen että widget-laajennukseen, joten
/// se saa tuoda vain SwiftUI:n.
enum Ulkoasu {
    /// #1d1610 — pelin tausta.
    static let tausta = Color(red: 29.0 / 255, green: 22.0 / 255, blue: 16.0 / 255)
    /// #e8d2a5 — päiväkirjan paperi.
    static let paperi = Color(red: 232.0 / 255, green: 210.0 / 255, blue: 165.0 / 255)
    /// #e5ac36 — aarteen kulta.
    static let kulta = Color(red: 229.0 / 255, green: 172.0 / 255, blue: 54.0 / 255)
    /// Himmeämpi paperi leipätekstiin.
    static let himmea = Color(red: 201.0 / 255, green: 168.0 / 255, blue: 111.0 / 255)

    // Widgetin pergamentti. Kotinäytöllä tumma tausta hukkuisi taustakuvaan,
    // joten widget kääntää värit toisin päin: paperi pohjaksi, muste tekstiksi.

    /// #d8bd88 — pergamentin varjopuoli, widgetin liukuvärin alalaita.
    static let varjopaperi = Color(red: 216.0 / 255, green: 189.0 / 255, blue: 136.0 / 255)
    /// #3a2c1c — päiväkirjan muste.
    static let muste = Color(red: 58.0 / 255, green: 44.0 / 255, blue: 28.0 / 255)
    /// #6d5636 — haalistunut muste, widgetin pikkuteksti.
    static let haalea = Color(red: 109.0 / 255, green: 86.0 / 255, blue: 54.0 / 255)
}
