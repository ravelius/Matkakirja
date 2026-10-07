using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;
using L = Matkakirja.Linssit.Kierros.KorttiAsettelu.Laatikko;

namespace Matkakirja.Linssit.Testit
{
    // Yksityiskohtakortin ruutulaatikko ei leikkaa nappeja levossa eikä poistuessa näkyvänä (Päätoimittaja 7.10. 21.5x ja 22.0x);
    // sisääntulossa napit piirtyvät kortin päälle (UI Toolkit kamerapinon jälkeen, ajossa YksityiskohtaKortti.NapitPaalla). Napit: BUILD 162:n iPad 13 -vaakakuvan
    // mukaiset paikat (ylänurkan rivi, tapit ja ohjainrivi, Kysy-rivi, alakulmat), sivuttaiset etäisyydet pisteinä reunasta ja
    // pystysuuntaiset osuuksina korkeudesta, turva-alue mukaan. Ajossa OpasValikko antaa oikeat laatikot.
    public static class KorttiAsetteluTestit
    {
        sealed class Laite
        {
            public string Nimi; public float W, H, Pt; public float L, R, T, B;
            public Laite(string n, float w, float h, float pt, float l, float r, float t, float b) { Nimi = n; W = w; H = h; Pt = pt; L = l; R = r; T = t; B = b; }
        }

        static IEnumerable<Laite> Laitteet()
        {
            // iPad 13 (2752 × 2064, 2×), iPad 11 (2420 × 1668), iPhone 16 Pro (2622 × 1206, 3×, lovi sivulla vaakana), iPhone SE (1334 × 750).
            yield return new Laite("iPad13 vaaka", 2752, 2064, 2, 0, 0, 24, 20);
            yield return new Laite("iPad13 pysty", 2064, 2752, 2, 0, 0, 24, 20);
            yield return new Laite("iPad11 vaaka", 2420, 1668, 2, 0, 0, 24, 20);
            yield return new Laite("iPad11 pysty", 1668, 2420, 2, 0, 0, 24, 20);
            yield return new Laite("iPhone16Pro vaaka", 2622, 1206, 3, 62, 62, 0, 21);
            yield return new Laite("iPhone16Pro pysty", 1206, 2622, 3, 0, 0, 62, 34);
            yield return new Laite("iPhoneSE vaaka", 1334, 750, 2, 0, 0, 0, 0);
            yield return new Laite("iPhoneSE pysty", 750, 1334, 2, 0, 0, 20, 0);
        }

        static List<L> Napit(Laite d)
        {
            float p = d.Pt, w = d.W, h = d.H, l = d.L * p, r = d.R * p, t = d.T * p, b = d.B * p;
            float tappi = 36 * p, n = 22 * p;
            var x = new List<L>
            {
                new L(w - r - 3 * 52 * p, h - t - 60 * p, w - r, h - t),                           // ylänurkka: aika, ■, ☰
                new L(l, h - t - 60 * p, l + 52 * p, h - t),                                         // vasen ylänurkka (takaisin)
                new L(w - r - 234 * p - tappi, 0.34f * h - tappi, w - r - 234 * p + tappi, 0.34f * h + tappi), // oikea tappi
                new L(l + 234 * p - tappi, 0.34f * h - tappi, l + 234 * p + tappi, 0.34f * h + tappi),         // vasen tappi
                new L(w - r - 290 * p, 0.26f * h - n, w - r - 170 * p, 0.31f * h + n),               // tauko ja seuraava
                new L(0.5f * w - 100 * p, b + 20 * p, 0.5f * w + 100 * p, b + 70 * p),               // Kysy, mikrofoni, näppäimistö
                new L(l, b, l + 50 * p, b + 60 * p),                                                 // vasen alakulma
                new L(w - r - 60 * p, b, w - r, b + 80 * p),                                         // oikea alakulma (pikkukuva)
            };
            return x;
        }

        [Testi] static void KallistusSuurentaaOikeaaReunaa()
        {
            var suora = KorttiAsettelu.Ruutu(2752, 2064, 1000, 1000, new KorttiAsettelu.Asento(300, 0, 1, 0));
            var kalt = KorttiAsettelu.Ruutu(2752, 2064, 1000, 1000, new KorttiAsettelu.Asento(300, 0, 1, 14));
            Oleta.Tosi(kalt.X1 > suora.X1 + 5 && kalt.Y1 > suora.Y1, $"lähempi oikea reuna isompana {suora} → {kalt}");
            var kauas = KorttiAsettelu.Ruutu(2752, 2064, 1000, 1000, new KorttiAsettelu.Asento(300, 0, 3, 0));
            Oleta.Tosi(kauas.X1 - kauas.X0 < 0.34f * (suora.X1 - suora.X0), "syvyys 3 → kolmannes");
        }

        [Testi] static void Build162NotreDamenKaiverrus()
        {
            // BUILD 162 iPad-vaaka: Q2981 (1280 × 2005) ulottui 0,91 W:hen ja ylänapit peittyivät.
            var d = new Laite("iPad13 vaaka", 2752, 2064, 2, 0, 0, 24, 20);
            var t = KorttiAsettelu.Laske(d.W, d.H, 264f / 163f, 1280f / 2005f, Napit(d));
            Oleta.Tosi(t.Mahtuu, "mahtuu");
            Oleta.Tosi(t.LepoLaatikko.X1 <= 0.78f * d.W, "oikea reuna nappisarakkeen vasemmalla " + t.LepoLaatikko);
            foreach (var n in Napit(d)) Oleta.Tosi(!t.LepoLaatikko.Leikkaa(n), $"lepo {t.LepoLaatikko} irti napista {n}");
            Oleta.Tosi(t.Kork <= KorttiAsettelu.KorkVaaka * d.H + 0.5f, "korkeus enintään 72 %");
        }

        [Testi] static void EiLeikkaaNappejaMissaanLaitteessa()
        {
            float[] suhteet = { 0.5f, 0.64f, 0.75f, 1f, 1.33f, 1.5f, 1.78f, 2.4f };
            int mahtuu = 0, kaikki = 0;
            foreach (var d in Laitteet())
                foreach (float s in suhteet)
                {
                    kaikki++;
                    var napit = Napit(d);
                    var t = KorttiAsettelu.Laske(d.W, d.H, d.Pt * 1.35f, s, napit);
                    if (!t.Mahtuu) { System.Console.WriteLine($"  ei paikkaa: {d.Nimi} suhde {s}"); continue; }
                    mahtuu++;
                    // Levossa ei leikkauksia; poistuessa näkyvä kortti (alfa ≥ NakyvaAlfa) ei koske nappeja (60 näytettä);
                    // sisään oikealta ruudun ulkopuolelta pienenä, pois oikeaan yläkulmaan (omistaja 10.2x).
                    foreach (var n in napit) Oleta.Tosi(!t.LepoLaatikko.Leikkaa(n), $"{d.Nimi} suhde {s}: lepo {t.LepoLaatikko} leikkaa napin {n}");
                    for (int i = 0; i <= 60; i++)
                    {
                        var (a, alfa) = KorttiAsettelu.Pois(t, i / 60f);
                        if (alfa < KorttiAsettelu.NakyvaAlfa) continue;
                        var l = KorttiAsettelu.Ruutu(d.W, d.H, t.Lev, t.Kork, a);
                        foreach (var n in napit) Oleta.Tosi(!l.Leikkaa(n), $"{d.Nimi} suhde {s}: poistuva kortti {l} (alfa {alfa:0.00}) leikkaa napin {n}");
                    }
                    var alku = KorttiAsettelu.Ruutu(d.W, d.H, t.Lev, t.Kork, KorttiAsettelu.Sisaan(t, 0f).Item1);
                    Oleta.Tosi(alku.X0 >= d.W, $"{d.Nimi} {s}: sisääntulo alkaa oikealta ruudun ulkopuolelta {alku}");
                    Oleta.Tosi(alku.Y1 - alku.Y0 <= 0.5f * (t.LepoLaatikko.Y1 - t.LepoLaatikko.Y0), $"{d.Nimi} {s}: alussa pieni");
                    var puoli = KorttiAsettelu.Ruutu(d.W, d.H, t.Lev, t.Kork, KorttiAsettelu.Sisaan(t, 0.3f).Item1);
                    Oleta.Tosi(puoli.Y1 - puoli.Y0 < 0.9f * (t.LepoLaatikko.Y1 - t.LepoLaatikko.Y0), $"{d.Nimi} {s}: kasvaa vasta lähestyessään");
                    var loppu = KorttiAsettelu.Ruutu(d.W, d.H, t.Lev, t.Kork, KorttiAsettelu.Pois(t, 1f).Item1);
                    Oleta.Tosi(loppu.X0 + loppu.X1 > d.W && loppu.Y0 + loppu.Y1 > d.H, $"{d.Nimi} {s}: poistuu oikeaan yläkulmaan {loppu}");
                    var lepo = t.LepoLaatikko;
                    Oleta.Tosi(lepo.X0 >= 0 && lepo.Y0 >= 0 && lepo.X1 <= d.W && lepo.Y1 <= d.H, $"{d.Nimi} {s}: ruudulla {lepo}");
                    Oleta.Tosi((lepo.X1 - lepo.X0) * (lepo.Y1 - lepo.Y0) <= 0.45f * d.W * d.H, $"{d.Nimi} {s}: peitto ≤ 45 %");
                }
            // Kaikissa laitteissa ja kuvasuhteissa paikka löytyy (iPhone-vaaka pienenee tarvittaessa).
            Oleta.Sama(kaikki, mahtuu, "kaikille paikka");
        }

        [Testi] static void EiPaikkaaKunNapitKaikkialla()
        {
            var t = KorttiAsettelu.Laske(2752, 2064, 2, 1.5f, new List<L> { new L(0, 0, 2752, 2064) });
            Oleta.Tosi(!t.Mahtuu, "ei näytetä");
        }
    }
}
