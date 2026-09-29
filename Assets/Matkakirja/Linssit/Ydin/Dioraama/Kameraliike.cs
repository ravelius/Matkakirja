// DIORAAMAN KAMERALIIKE — puhdas logiikka (speksi docs/raportit/dioraama-rajapinnat-20260929.md kohta 4;
// era 2b: dioraama-rajapinnat-era2b-20260929.md kohdat 1 ja 5 — kaarilento, RajaaKierto, Leijunta).
// JS-pari: js/dioraama/kamera.js (asentoSijainti, siirtymanKesto, siirtymaAsento, rajaaKierto, leijunta,
// pelaajanAsento, smootherstep). Pariteettia vartioidaan Linssit-testit/kultaiset/dioraama-vektorit.json:lla
// (DioraamaTestit.cs).
using System;

namespace Matkakirja.Linssit.Dioraama
{
    public static class Kameraliike
    {
        /// <summary>matka01-jakaja (kohta 1): kohteiden etäisyys tätä pidemmälle -> matka01 kyllästyy 1:een.</summary>
        public const double MatkaJakajaM = 60;
        /// <summary>etäisyyden kaarikerroin (kohta 5): keskellä lentoa etäisyys · (1 + tämä · matka01 · sin(πs)).</summary>
        public const double KaarenEtaisyysKerroin = 0.35;
        /// <summary>
        /// TULKINTA (ei lukuarvoa speksissä, kirjattu raporttiin): korkeuden "nousu" kaavassa
        /// "korkeus += nousu · sin(πs)" ei saa speksissä lukuarvoa. Analogisesti etäisyyden matka01-kertoimen
        /// kanssa nousu skaalataan samalla matka01:llä (nousu = KaarenNousuMaxAstetta · matka01), jotta lyhyt
        /// siirtymä ei nykäise kameraa ylös mutta tilasta toiseen -lento kaartaa selvästi. Sama vakio js/
        /// dioraama/kamera.js:ssä (KAAREN_NOUSU_MAX_ASTETTA) — muuta molemmat yhdessä.
        /// </summary>
        public const double KaarenNousuMaxAstetta = 12;

        static double Rajaa(double x, double lo, double hi) => x < lo ? lo : x > hi ? hi : x;

        /// <summary>smootherstep(t) = t³(t(6t − 15) + 10), t rajattu 0–1 ennen laskua.</summary>
        public static double Smootherstep(double t)
        {
            double x = Rajaa(t, 0, 1);
            return x * x * x * (x * (6 * x - 15) + 10);
        }

        /// <summary>
        /// Lyhin kiertoero kahden kompassiasteen välillä, väli (-180, 180]. Tasan 180 asteen käännös palautuu
        /// arvona -180 (ei +180): normalisointi puoliavoimelle välille (js kiertoero, ks. vektorien tulkinnat).
        /// </summary>
        static double KiertoEro(double a0, double a1) => Mod(Mod(a1 - a0 + 180, 360) + 360, 360) - 180;

        static double Mod(double a, double m) => a % m;

        /// <summary>
        /// Kameran maailmansijainti asennosta. k = korkeus, a = atsimuutti (kompassi: kohteesta kameraan päin).
        /// a = 180 → kamera kohteen ETELÄPUOLELLA eli +Z: cos k·sin 180 = 0, −cos k·cos 180 = +cos k → (0, sin k, +cos k).
        /// </summary>
        public static (V3 sijainti, V3 kohde) AsentoSijainti(Asento p)
        {
            double k = p.Korkeus * Math.PI / 180, a = p.Atsimuutti * Math.PI / 180;
            double ck = Math.Cos(k);
            var suunta = new V3(ck * Math.Sin(a), Math.Sin(k), -ck * Math.Cos(a));
            return (p.Kohde + suunta * p.Etaisyys, p.Kohde);
        }

        /// <summary>Δ = |kohde1 − kohde0| + |etaisyys1 − etaisyys0|; T = clamp(1,6 + 0,35·√Δ, 2,0, 3,8).</summary>
        /// <summary>ELÄVÄ LINNA (käsikirjoitus 29.9. kohta 2): lento leikkausikkunan kautta tilaan 0,8–1,2 s
        /// (Linnanrakentajan lupa Siirtosepälle 29.9.). Käytetään, kun rakennuksessa on saapuminen (uusi kokemus).</summary>
        public static double LeikkausLennonKesto(Asento p0, Asento p1)
        {
            double delta = (p1.Kohde - p0.Kohde).Pituus + Math.Abs(p1.Etaisyys - p0.Etaisyys);
            return Rajaa(0.8 + 0.03 * Math.Sqrt(delta), 0.8, 1.2);
        }

        public static double SiirtymanKesto(Asento p0, Asento p1)
        {
            double delta = (p1.Kohde - p0.Kohde).Pituus + Math.Abs(p1.Etaisyys - p0.Etaisyys);
            return Rajaa(1.6 + 0.35 * Math.Sqrt(delta), 2.0, 3.8);
        }

        /// <summary>
        /// Interpoloitu asento kahden asennon välillä (t 0…1), KAARILENTONA (era 2b, kohta 5; korvaa era 1:n
        /// suoran nosturinoston). e = smootherstep(t) ohjaa kohteen, atsimuutin (lyhin kiertoero), fov:n ja
        /// aukon lerpiä. matka01 = |Δkohde| / MatkaJakajaM, rajattuna 0–1. Keskellä lentoa (s = RAAKA t, ei
        /// smootherstepattu, kuten era 1:ssä — nosto/pullistuma 0 molemmissa päätepisteissä):
        ///   korkeus = lerp(korkeus0, korkeus1, e) + KaarenNousuMaxAstetta · matka01 · sin(π·s)
        ///   etaisyys = lerp(etaisyys0, etaisyys1, e) · (1 + KaarenEtaisyysKerroin · matka01 · sin(π·s))
        /// Kamera nousee ja laskeutuu lennon aikana, ei koskaan leikkaa suoraan asennosta toiseen.
        /// </summary>
        public static Asento SiirtymaAsento(Asento p0, Asento p1, double t)
        {
            double e = Smootherstep(t);
            var kohde = V3.Lerp(p0.Kohde, p1.Kohde, e);
            double atsimuutti = p0.Atsimuutti + KiertoEro(p0.Atsimuutti, p1.Atsimuutti) * e;
            double fov = p0.Fov + (p1.Fov - p0.Fov) * e;
            double aukko = p0.Aukko + (p1.Aukko - p0.Aukko) * e;
            double dKohde = (p1.Kohde - p0.Kohde).Pituus;
            double matka01 = Rajaa(dKohde / MatkaJakajaM, 0, 1);
            double s = Math.Sin(Math.PI * t);
            double korkeus = p0.Korkeus + (p1.Korkeus - p0.Korkeus) * e + KaarenNousuMaxAstetta * matka01 * s;
            double etaisyys = (p0.Etaisyys + (p1.Etaisyys - p0.Etaisyys) * e) * (1 + KaarenEtaisyysKerroin * matka01 * s);
            return new Asento(kohde, atsimuutti, korkeus, etaisyys, fov, aukko);
        }

        /// <summary>Pelaajan ohjaama poikkeama nykyisestä asennosta. da rajataan ±20, dk ±10, zoom 0,75–1,3.</summary>
        public static Asento PelaajanAsento(Asento p, double da, double dk, double zoom)
        {
            double daR = Rajaa(da, -20, 20), dkR = Rajaa(dk, -10, 10), zoomR = Rajaa(zoom, 0.75, 1.3);
            return new Asento(p.Kohde, p.Atsimuutti + daR, p.Korkeus + dkR, p.Etaisyys * zoomR, p.Fov, p.Aukko, p.Kierto);
        }

        /// <summary>
        /// Rajaa pelaajan asennon (esim. PelaajanAsento-metodin tulos) annettuihin kierto-rajoihin suhteessa
        /// perusasentoon (kohta 1). Rajat luetaan perus.Kierrosta; jos se on null (lähteessä ei kierto-kenttää),
        /// käytetään speksin oletusta — Kierto.OletusYleis kun yleisnakyma on tosi, muuten Kierto.OletusTila
        /// (kutsuja tietää kummasta on kyse: PoikkileikkausLinssi tuntee nykyisen kohdetilan). Speksin kohta 5
        /// kirjoittaa kutsun kaksiargumenttisena "RajaaKierto(perus, asento)" — yleisnakyma on siksi valinnainen
        /// (oletus false, kattaa tila-tapauksen). AtsimuuttiMin/Max null (molemmat) = vapaa 360° kierto: atsimuutti
        /// ei rajaudu eikä normalisoidu 0..360-välille (samaa käytäntöä kuin SiirtymaAsennon atsimuutissa).
        /// </summary>
        public static Asento RajaaKierto(Asento perus, Asento asento, bool yleisnakyma = false)
        {
            var k = perus.Kierto ?? (yleisnakyma ? Kierto.OletusYleis : Kierto.OletusTila);
            double atsimuutti = asento.Atsimuutti;
            if (k.AtsimuuttiMin.HasValue && k.AtsimuuttiMax.HasValue)
            {
                double ero = Rajaa(KiertoEro(perus.Atsimuutti, asento.Atsimuutti), k.AtsimuuttiMin.Value, k.AtsimuuttiMax.Value);
                atsimuutti = perus.Atsimuutti + ero;
            }
            double korkeus = Rajaa(asento.Korkeus, k.KorkeusMin, k.KorkeusMax);
            double etaisyys = Rajaa(asento.Etaisyys, perus.Etaisyys * k.EtaisyysMin, perus.Etaisyys * k.EtaisyysMax);
            return new Asento(asento.Kohde, atsimuutti, korkeus, etaisyys, asento.Fov, asento.Aukko);
        }

        /// <summary>
        /// Hidas ajelehtiminen levossa olevaan asentoon (kohta 5) — atsimuutti ±3° jaksolla 24 s, korkeus ±1,5°
        /// jaksolla 31 s (eri jaksot: ei toistu tahdissa, Lissajous-tuntuinen ajelehdus). t=0 antaa nollapoikkeaman
        /// (sin(0)=0), jottei leijunta nykäise kameraa kytkettäessä päälle.
        /// </summary>
        public static Asento Leijunta(Asento asento, double t)
        {
            double da = 3 * Math.Sin(2 * Math.PI * t / 24);
            double dk = 1.5 * Math.Sin(2 * Math.PI * t / 31);
            return new Asento(asento.Kohde, asento.Atsimuutti + da, asento.Korkeus + dk, asento.Etaisyys, asento.Fov, asento.Aukko, asento.Kierto);
        }
    }
}
