// Esilataajan osuma-% ja odotus (Assets/Matkakirja/Kartta/EsilataajaMittari.cs; suunnitelma
// docs/raportit/esilataaja-suunnitelma-20260925.md, "Mittarit").
namespace Matkakirja.Peli.Testit
{
    static class EsilataajaMittariTestit
    {
        const string A = "https://ampari/kuvat/a.jpg", B = "https://ampari/kuvat/b.jpg", C = "https://ampari/aani/c.mp3";

        [Testi] static void ValmisEsilatausOnOsumaIlmanOdotusta()
        {
            var m = new EsilataajaMittari();
            m.EsilatausAlkoi(A);
            m.HakuValmis(A, true, true, 100);
            Oleta.Sama(EsilataajaMittari.Luokka.Osuma, m.Nakyva(A, true, "saapuminen", 500));
            Oleta.Sama(1, m.Kaikki.Osumat);
            Oleta.Sama(100, m.Kaikki.Pros);
            Oleta.Sama(0.0, m.Kaikki.MaxMs);
            Oleta.Sama(0, m.Avoimia);
        }

        [Testi] static void KeskenOnHutiJaOdottaaEsilatauksenValmistumista()
        {
            var m = new EsilataajaMittari();
            m.EsilatausAlkoi(A);
            Oleta.Sama(EsilataajaMittari.Luokka.Kesken, m.Nakyva(A, false, "saapuminen", 1000));
            Oleta.Sama(1, m.Avoimia);
            m.HakuValmis(A, true, true, 1350);
            Oleta.Sama(0, m.Avoimia);
            Oleta.Sama(1, m.Kaikki.Kesken);
            Oleta.Sama(0, m.Kaikki.Pros);
            Oleta.Sama(350.0, m.Kaikki.SummaMs);
            Oleta.Sama(350.0, m.VaiheTilasto("saapuminen").MaxMs);
        }

        [Testi] static void EiEsiladattuOnHutiJaOdotusNakyvanOmaanHakuun()
        {
            var m = new EsilataajaMittari();
            Oleta.Sama(EsilataajaMittari.Luokka.EiEsiladattu, m.Nakyva(B + "?avain=x", false, "kaupunki", 2000));
            // Nakyva-tason oma haku valmistuu (Esilataaja.Hae kirjaa HakuValmis esilataus=false), kysely ei erota kohdetta.
            m.HakuValmis(B, false, true, 2800);
            Oleta.Sama(1, m.Kaikki.EiEsiladattu);
            Oleta.Sama(800.0, m.Kaikki.SummaMs);
            // Toinen päättäjä (kutsujan NakyvaValmis) ei kirjaa odotusta uudelleen.
            m.NakyvaValmis(B, 3000);
            Oleta.Sama(1, m.Kaikki.Odotukset.Count);
        }

        [Testi] static void EpaonnistunutEsilatausEiPaataOdotusta()
        {
            var m = new EsilataajaMittari();
            m.EsilatausAlkoi(C);
            Oleta.Sama(EsilataajaMittari.Luokka.Kesken, m.Nakyva(C, false, "saapuminen", 0));
            m.HakuValmis(C, true, false, 300);
            Oleta.Sama(1, m.Avoimia);
            m.NakyvaValmis(C, 900);
            Oleta.Sama(900.0, m.Kaikki.SummaMs);
        }

        [Testi] static void EpaonnistunutEsilatausUnohdetaan()
        {
            var m = new EsilataajaMittari();
            m.EsilatausAlkoi(C);
            m.HakuValmis(C, true, false, 300);
            Oleta.Sama(EsilataajaMittari.Luokka.EiEsiladattu, m.Nakyva(C, false, "lento", 400));
        }

        [Testi] static void LevyllaIlmanEsilataustaEiOsumaProsenttiin()
        {
            var m = new EsilataajaMittari();
            Oleta.Sama(EsilataajaMittari.Luokka.Levylla, m.Nakyva(A, true, "kaynnistys", 0));
            Oleta.Sama(1, m.Kaikki.Levylla);
            Oleta.Sama(-1, m.Kaikki.Pros);
            Oleta.Sama(0, m.Avoimia);
            Oleta.Tosi(m.Rivi().Contains("osuma 0/0 –"), m.Rivi());
        }

        [Testi] static void EsiladattuMuttaEiLoytynytOnHukattu()
        {
            var m = new EsilataajaMittari();
            m.EsilatausAlkoi(A);
            m.HakuValmis(A, true, true, 10);
            Oleta.Sama(EsilataajaMittari.Luokka.Hukattu, m.Nakyva(A, false, "kaupunki", 100));
            m.NakyvaValmis(A, 160);
            Oleta.Sama(1, m.Kaikki.Hukattu);
            Oleta.Sama(60.0, m.Kaikki.SummaMs);
        }

        [Testi] static void ToistoEiLaskeUudelleenEikaKaytettyPalaaEsilataukseksi()
        {
            var m = new EsilataajaMittari();
            m.EsilatausAlkoi(A);
            m.HakuValmis(A, true, true, 0);
            m.Nakyva(A, true, "kaupunki", 10);
            Oleta.Sama(EsilataajaMittari.Luokka.Toisto, m.Nakyva(A, true, "kaupunki", 20));
            m.EsilatausAlkoi(A);
            Oleta.Sama(EsilataajaMittari.Luokka.Toisto, m.Nakyva(A, false, "kaupunki", 30));
            Oleta.Sama(1, m.Kaikki.Osumat);
            Oleta.Sama(2, m.Kaikki.Toistot);
            Oleta.Sama(100, m.Kaikki.Pros);
        }

        [Testi] static void OdotustenTilastotJaVaiheet()
        {
            var m = new EsilataajaMittari();
            // 1 osuma (0 ms) + 4 hutia 100, 200, 300, 1000 ms saapumisessa; 1 huti 50 ms kaupungissa.
            m.EsilatausAlkoi("o"); m.HakuValmis("o", true, true, 0);
            m.Nakyva("o", true, "saapuminen", 0);
            double[] ms = { 100, 200, 300, 1000 };
            for (int i = 0; i < ms.Length; i++) { m.Nakyva("h" + i, false, "saapuminen", 0); m.NakyvaValmis("h" + i, ms[i]); }
            m.Nakyva("k", false, "kaupunki", 5); m.NakyvaValmis("k", 55);
            var k = m.Kaikki;
            Oleta.Sama(1, k.Osumat);
            Oleta.Sama(5, k.Hudit);
            Oleta.Sama(17, k.Pros);
            Oleta.Sama(1650.0, k.SummaMs);
            Oleta.Sama(1000.0, k.MaxMs);
            Oleta.Sama(100.0, k.MediaaniMs);   // 0, 50, 100, 200, 300, 1000 → 3. sija
            Oleta.Sama(1000.0, k.P95Ms);
            var s = m.VaiheTilasto("saapuminen");
            Oleta.Sama(20, s.Pros);
            Oleta.Sama(200.0, s.MediaaniMs);   // 0, 100, 200, 300, 1000
            Oleta.Sama(50.0, m.VaiheTilasto("kaupunki").SummaMs);
            var json = m.Json();
            Oleta.Tosi(json.Contains("\"osumia\":1,\"huteja\":5,\"pros\":17"), json);
            Oleta.Tosi(json.Contains("\"vaiheet\":{\"kaupunki\":{"), json);
            Oleta.Tosi(json.Contains("\"p95Ms\":1000,\"maxMs\":1000"), json);
            Oleta.Tosi(m.Rivi().StartsWith("osuma 1/6 17 % (kesken 0, ei esiladattu 5, hukattu 0;"), m.Rivi());
        }

        [Testi] static void NollaaSummatSailyttaaEsilatauksenTilan()
        {
            var m = new EsilataajaMittari();
            m.EsilatausAlkoi(A); m.HakuValmis(A, true, true, 0);
            m.Nakyva(B, false, "lento", 0);
            m.NollaaSummat();
            Oleta.Sama(0, m.Avoimia);
            Oleta.Sama(0, m.Kaikki.Hudit);
            Oleta.Sama(EsilataajaMittari.Luokka.Osuma, m.Nakyva(A, true, "saapuminen", 5));
            m.Nollaa();
            Oleta.Sama(EsilataajaMittari.Luokka.Levylla, m.Nakyva(A, true, "saapuminen", 6));
        }
    }
}
