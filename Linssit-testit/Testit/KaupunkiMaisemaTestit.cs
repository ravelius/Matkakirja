// KAUPUNKIMAISEMAN LÄHIKERROKSET (9.10.): Pelikoodarin manifestit (kultaiset kopiot), kerros → ääni kehityskaupungeissa,
// muualla ei mitään, tasokertoimet, painojen johdot ja korkeusvaimennus.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aanet;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiMaisemaTestit
    {
        const string V1 = "https://x/v1/", V2 = "https://x/v2/";
        static KaupunkiMaisema M() => KaupunkiMaisema.Lue(System.IO.File.ReadAllText("kultaiset/kaupunkimaisema-v1.json"), V1,
            System.IO.File.ReadAllText("kultaiset/kaupunkimaisema-v2.json"), V2);

        [Testi] static void KerroksetKehityskaupungeissa()
        {
            var m = M();
            Oleta.Sama(V2 + "tukholma/tori.mp3", m.Url("tukholma", KaupunkiAanimaisema.Tori), "Tukholman tori v2");
            Oleta.Sama(V2 + "tukholma/lapset.mp3", m.Url("tukholma", KaupunkiAanimaisema.Lapset), "Tukholman lapset v2");
            Oleta.Sama(V1 + "raitiovaunu-02.mp3", m.Url("tukholma", KaupunkiAanimaisema.Raitiovaunu), "Tukholman raitiovaunu v1");
            Oleta.Sama(V1 + "metro-01.mp3", m.Url("tukholma", KaupunkiAanimaisema.Metro), "Tukholman metro v1");
            Oleta.Sama(V1 + "laituri-01.mp3", m.Url("tukholma", KaupunkiAanimaisema.Laituri), "laituri v1");
            Oleta.Sama(V2 + "pariisi/kahvila.mp3", m.Url("pariisi", KaupunkiAanimaisema.Kahvila), "Pariisin kahvila v2");
            Oleta.Sama(V2 + "pariisi/metro.mp3", m.Url("pariisi", KaupunkiAanimaisema.Metro), "Pariisin metro v2");
            Oleta.Sama(V1 + "laituri-01.mp3", m.Url("pariisi", KaupunkiAanimaisema.Laituri), "Pariisin laituri v1");
            Oleta.Tosi(m.Url("pariisi", KaupunkiAanimaisema.Raitiovaunu) == null, "Pariisin raitiovaunu ei silmukkana");
            var kerta = m.KertaAani("pariisi", KaupunkiAanimaisema.Raitiovaunu);
            Oleta.Tosi(kerta != null && kerta.Osoite == V2 + "pariisi/raitiovaunu.mp3" && kerta.KestoS > 30, "Pariisin raitiovaunu kerta-äänenä");
            Oleta.Tosi(m.KertaAani("tukholma", KaupunkiAanimaisema.Raitiovaunu) == null, "Tukholmassa ei kerta-raitiovaunua");
            // v1:n tori-02, kahvila-02 ja lapset-01 eivät koskaan käytössä.
            foreach (var id in new[] { "tukholma", "pariisi" })
                foreach (var k in KaupunkiMaisema.Lahikerrokset)
                {
                    string u = m.Url(id, k) ?? "";
                    Oleta.Tosi(!u.Contains("tori-02") && !u.Contains("kahvila-02") && !u.Contains("lapset-01"), $"{id}/{k}: {u}");
                }
            // Muut kaupungit ja muut kerrokset: ei mitään.
            foreach (var k in KaupunkiMaisema.Lahikerrokset)
                Oleta.Tosi(m.Url("praha", k) == null && m.Url(null, k) == null, "ei kehityskaupunki: " + k);
            Oleta.Tosi(m.Url("pariisi", KaupunkiAanimaisema.LiikenneHiljainen) == null && m.KertaAani("praha", KaupunkiAanimaisema.Raitiovaunu) == null, "muut ennallaan");
        }

        [Testi] static void PainotJaKertoimet()
        {
            var kartta = new Dictionary<string, double>
            {
                [KaupunkiAanimaisema.Tori] = 1, [KaupunkiAanimaisema.Kahvila] = 0.8, [KaupunkiAanimaisema.Raitiovaunu] = 0.6, [KaupunkiAanimaisema.Puisto] = 0.5,
                [KaupunkiAanimaisema.Rautatie] = 0.4, [KaupunkiAanimaisema.Kanava] = 0.2, [KaupunkiAanimaisema.Aallot] = 0.9, [KaupunkiAanimaisema.Satama] = 0.3,
                [KaupunkiAanimaisema.LiikenneVilkas] = 0.7,
            };
            var ulos = new Dictionary<string, double>();
            var p = KaupunkiMaisema.Painot(kartta, 12, 50, k => k != KaupunkiAanimaisema.Raitiovaunu, ulos);
            bool L(string k, double v) => Math.Abs(p[k] - v) < 1e-9;
            Oleta.Tosi(L(KaupunkiAanimaisema.Tori, 0.6) && L(KaupunkiAanimaisema.Kahvila, 0.28), "tori 0,6 ja kahvila 0,35 × paino");
            Oleta.Tosi(L(KaupunkiAanimaisema.Lapset, 0.2), "lapset = puisto × 0,4");
            Oleta.Tosi(L(KaupunkiAanimaisema.Metro, 0.05), "metro = rautatie × 0,5 × 0,25");
            Oleta.Tosi(L(KaupunkiAanimaisema.Laituri, 0.63), "laituri = max(kanava, aallot, satama) × 0,7");
            Oleta.Tosi(L(KaupunkiAanimaisema.Raitiovaunu, 0), "ei silmukkaa → 0 (Pariisin kerta-ääni)");
            Oleta.Tosi(L(KaupunkiAanimaisema.LiikenneVilkas, 0.7), "muut kerrokset sellaisinaan");
            Oleta.Tosi(Math.Abs(KaupunkiMaisema.Paino(KaupunkiAanimaisema.Raitiovaunu, kartta, 12, 50) - 0.3) < 1e-9, "raitiovaunu 0,5 × paino");
            Oleta.Tosi(KaupunkiMaisema.KarttaPaino(KaupunkiAanimaisema.Lapset, kartta, 7.9) == 0 && KaupunkiMaisema.KarttaPaino(KaupunkiAanimaisema.Lapset, kartta, 20) == 0
                && KaupunkiMaisema.KarttaPaino(KaupunkiAanimaisema.Lapset, kartta, 8) == 0.5, "lapset vain 8–20");
            Oleta.Tosi(KaupunkiMaisema.Painot(null, 12, 50, k => true, ulos) == null, "ei karttaa");
        }

        [Testi] static void Korkeusvaimennus()
        {
            double Db(double g) => 20 * Math.Log10(g);
            string T = KaupunkiAanimaisema.Tori, La = KaupunkiAanimaisema.Laituri;
            Oleta.Tosi(KaupunkiMaisema.Korkeudella(T, 100) == 1 && KaupunkiMaisema.Korkeudella(T, 150) == 1, "täysi alle 150 m");
            Oleta.Tosi(Math.Abs(Db(KaupunkiMaisema.Korkeudella(T, 600)) + 12) < 0.01, "−12 dB 600 m:ssä");
            Oleta.Tosi(Math.Abs(Db(KaupunkiMaisema.Korkeudella(T, 300)) + 6) < 0.01, "−6 dB 300 m:ssä (log)");
            Oleta.Tosi(KaupunkiMaisema.Korkeudella(T, 1200) == 0 && KaupunkiMaisema.Korkeudella(T, 900) > 0 && KaupunkiMaisema.Korkeudella(T, 900) < 0.2512, "pois 1 200 m");
            Oleta.Tosi(Math.Abs(Db(KaupunkiMaisema.Korkeudella(La, 300)) + 12) < 0.01 && KaupunkiMaisema.Korkeudella(La, 600) == 0, "laituri −12 dB 300 m, pois 600 m");
            double ed = 2;
            for (double h = 0; h <= 1300; h += 10) { double g = KaupunkiMaisema.Korkeudella(T, h); Oleta.Tosi(g <= ed, "laskee monotonisesti"); ed = g; }
        }

        [Testi] static void MikseriLahiaanet()
        {
            // Lähikerroksella oma korkeusvaimennus: mikserin korkeuskerroin ohitetaan vain Lahiaanet-tilassa.
            var p = new Dictionary<string, double> { [KaupunkiAanimaisema.Metro] = 0.5, [KaupunkiAanimaisema.LiikenneVilkas] = 0.5 };
            KaupunkiAanimaisema Aja(bool lahi)
            {
                var m = new KaupunkiAanimaisema();
                var s = new KaupunkiAanimaisema.Syote { Painot = p, KorkeusM = 600, Tunti = 12, Paalla = true, Lahiaanet = lahi };
                for (int i = 0; i < 300; i++) m.Paivita(s, 1 / 60.0);
                return m;
            }
            int me = KaupunkiAanimaisema.Indeksi(KaupunkiAanimaisema.Metro), lv = KaupunkiAanimaisema.Indeksi(KaupunkiAanimaisema.LiikenneVilkas);
            var a = Aja(true); var b = Aja(false);
            Oleta.Tosi(Math.Abs(a.Tasot[me] - 0.5) < 1e-6 && b.Tasot[me] < 0.4, $"metro {a.Tasot[me]:F2} / {b.Tasot[me]:F2}");
            Oleta.Tosi(Math.Abs(a.Tasot[lv] - b.Tasot[lv]) < 1e-9 && a.Tasot[lv] < 0.4, "muut kerrokset ennallaan");
            Oleta.Tosi(KaupunkiAanimaisema.Vuorokausi(KaupunkiAanimaisema.Metro, 2) < 0.3, "metro yöllä hiljaa");
        }
    }
}
