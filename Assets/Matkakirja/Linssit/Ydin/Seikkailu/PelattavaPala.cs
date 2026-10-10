// PELATTAVAN PALAN KIINNITETTY PAKETTI (Siirtoseppä 8.10.2026): Olavinlinnan pala lukee tätä Linnanrakentajan pakettia (ei uusin.json:ia),
// joten jokainen appiversio pysyy omassa paketissaan ja yhteensopimaton datamuutos vaihtuu koodin mukana. Versio = LR:n vienti, jonka
// kultaisilla (Linssit-testit/kultaiset/olavinlinna-<Versio>-*.json) huonesimulaatio todentaa palan; testi vaatii, että ne täsmäävät.
namespace Matkakirja.Linssit.Seikkailu
{
    public static class PelattavaPala
    {
        public const string Hash = "035562fc890cd285";
        public const string Versio = "v46k";   // v46j + vouti v4b (ele_kumarrus kevennetty: vartalo ja jalat 60 %, LR 9.10.); v46i + MetaHuman-vouti v4 (blender/hahmot/vouti-1500-mh.glb + 11 ASTC-kuvaa, DioraamaSovitin.HahmonLahde); v46g + ranta-1499:n valoatlas korjattu (mustat alueet ja reunatäyttö; v46h pudotti tunnelmavalot, v46i palautti); v46f + ranta-1499:n kalliotäyttö rakennusten juurella −2,0 (historian aukot; kävely ja törmäys seinien juurella); v46e + ranta-1499:n vesipohja −7,05 koko kuoren alle (historian aukot); v46d + tyhjä saari v2c (sävyt mantereen splat-maaston mukaan); v46c + pako-kellobastionin leikkaukset y −7,5…8 vesipohjalla; v46b + ranta-1499:n vuosileikkausten vesipohja −7,02 ja tyhjä saari v2 (leivottu 2048²-kuva); v46a + kappelin alttarikaappi ja brokadi sekä keittiön noki (alfa); v45z + Codex-rekvisiitta 12 merkkiä (voudin sali, Linnantupa, keittiö, tyrmä; seinäesineet seina: true) ja tammiovien lehdet ovi-tammi-100x190/200.glb (pääovi, muurikäytävä, Kellotorni, tyrmä; LR 9.10.)
    }
}
