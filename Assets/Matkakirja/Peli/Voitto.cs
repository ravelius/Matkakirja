// VOITTO: verkkopelin js/game.js checkWin suorana porttina.
//
// Voitto = pääaarre mukana laudan aloituskaupungissa, kun laudalta on
// löytynyt yksikin pääaarre. VAIN MONINPELISSÄ: vaellustilassa (yksinpeli,
// Matka.Vaellus) peli ei pääty koskaan ja Tarkista palauttaa aina false.
//
// KUTSUKOHDAT: web kutsuu checkWiniä vuoron alussa (beginTurn), saapumisissa
// (actionMove, actionBus, actionFly), laatan käännön jälkeen (revealToken,
// myös pöllöhaara) ja lukitseAarre:ssa. Portti on vaellustilan peli
// (Matka.Luo luo yhden pelaajan), jossa tarkistus on aina epätosi, joten
// Matka ei kutsu tätä vielä: identtisyys ei muutu. Moninpelin erä kytkee
// kutsut noihin kohtiin (kirjattu avoimeksi).
namespace Matkakirja.Peli
{
    public static class Voitto
    {
        /// <summary>
        /// Web checkWin: tosi, jos peli on voitettu (nyt tai aiemmin). Voittaessa
        /// Pelitila.VoittajaId = vuorossa oleva ja vaihe Ohi.
        /// </summary>
        public static bool Tarkista(Matka m)
        {
            var t = m.Tila;
            if (m.Vaellus) return false;
            if (t.VoittajaId.HasValue) return true;
            if (m.Laatat == null || !m.Laatat.JokinTahtiLoytynyt) return false;
            var p = t.Pelaaja;
            if (!p.Sijainti.Kaupungissa || !m.Verkko.Kaupungit.TryGetValue(p.Sijainti.Kaupunki, out var k) || !k.Aloitus)
                return false;
            if (p.Tahdet == 0) return false;
            t.VoittajaId = p.Id;
            t.Vaihe = Vaihe.Ohi;
            return true;
        }

        /// <summary>Voittanut pelaaja (web winner) tai null.</summary>
        public static Pelaaja Voittaja(Matka m) =>
            m.Tila.VoittajaId is int id ? m.Tila.Pelaajat.Find(p => p.Id == id) : null;
    }
}
