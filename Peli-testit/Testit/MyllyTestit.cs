// Mylly (Peli/Pelit/Mylly.cs) ja yhteinen pelikehys (Peli/Pelit/Pelikehys.cs): laudan geometria, säännöt
// (asetus, siirto, lento, mylly + poisto, myllysuoja, päättyminen, tasapeliraja), Tee/Peru-symmetria, botin tasot
// ja nopeus sekä tuloksen kirjaus (matkakirjan rivi, pelistreak, palkkio). ./kaanna.sh Mylly
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Matkakirja.Peli.Pelit;

namespace Matkakirja.Peli.Testit
{
    public static class MyllyTestit
    {
        static string Tila(Mylly m) =>
            string.Concat(Enumerable.Range(0, Mylly.Pisteita).Select(i => m.Nappula(i) < 0 ? "." : m.Nappula(i).ToString()))
            + $"|{m.Kadessa(0)},{m.Kadessa(1)}|{m.Laudalla(0)},{m.Laudalla(1)}|{m.Vuorossa}";

        static List<MyllySiirto> Siirrot(Mylly m) { var l = new List<MyllySiirto>(); m.Siirrot(l); return l; }

        /// <summary>Asettaa nappulat vuorotellen annettuihin pisteisiin (ei myllyjä kesken).</summary>
        static Mylly Asetettu(int[] pelaaja0, int[] pelaaja1)
        {
            var m = new Mylly();
            for (int i = 0; i < Math.Max(pelaaja0.Length, pelaaja1.Length); i++)
            {
                if (i < pelaaja0.Length) m.Tee(new MyllySiirto(-1, pelaaja0[i]));
                if (i < pelaaja1.Length) m.Tee(new MyllySiirto(-1, pelaaja1[i]));
            }
            return m;
        }

        [Testi] static void LaudanGeometria()
        {
            Oleta.Sama(24, Mylly.Naapurit.Length);
            Oleta.Sama(64, Mylly.Naapurit.Sum(n => n.Length), "32 viivaa kahteen suuntaan");
            Oleta.Tosi(Mylly.Naapurit.All(n => n.Length >= 2 && n.Length <= 4), "2–4 naapuria");
            Oleta.Sama(16, Mylly.Myllyt.Length);
            for (int p = 0; p < 24; p++) Oleta.Sama(2, Mylly.Myllyt.Count(r => r.Contains(p)), $"piste {p} kahdessa rivissä");
            // Myllyrivit ovat suoria: kaikilla sama x tai sama y.
            foreach (var r in Mylly.Myllyt)
                Oleta.Tosi(r.Select(p => Mylly.Paikat[p].X).Distinct().Count() == 1 || r.Select(p => Mylly.Paikat[p].Y).Distinct().Count() == 1, "suora rivi");
            Oleta.Tosi(Mylly.Naapurit[1].SequenceEqual(new[] { 0, 2, 9 }), "1: 0, 2 ja keskineliön 9");
        }

        [Testi] static void AsetusMyllyJaPoisto()
        {
            var m = new Mylly();
            Oleta.Sama(24, Siirrot(m).Count, "alussa 24 asetusta");
            // Valkoinen 0,1 ja musta 8,9; valkoisen 2 sulkee myllyn 0–1–2 → poistettavana musta 8 tai 9.
            m = Asetettu(new[] { 0, 1 }, new[] { 8, 9 });
            var poistot = Siirrot(m).Where(s => s.Mihin == 2).ToList();
            Oleta.Sama("8,9", string.Join(",", poistot.Select(s => s.Poista)));
            m.Tee(poistot[0]);
            Oleta.Sama(-1, m.Nappula(8));
            Oleta.Sama(1, m.Laudalla(1));
            Oleta.Sama(7, m.Kadessa(1));
            Oleta.Tosi(m.Myllyssa(0, 0) && m.Myllyssa(2, 0), "mylly 0–1–2");
        }

        [Testi] static void TeePeruPalauttaaTilan()
        {
            var sat = new Satunnainen(42);
            for (int peli = 0; peli < 20; peli++)
            {
                var m = new Mylly();
                var tilat = new Stack<string>();
                for (int n = 0; n < 200 && m.Lopputulos() == null; n++)
                {
                    var l = Siirrot(m);
                    tilat.Push(Tila(m));
                    m.Tee(l[(int)(sat.Seuraava() * l.Count)]);
                }
                while (tilat.Count > 0) { m.Peru(); Oleta.Sama(tilat.Pop(), Tila(m), "Peru palauttaa"); }
                Oleta.Sama(Tila(new Mylly()), Tila(m));
            }
        }

        [Testi] static void SatunnaisetPelitPaattyvatJaSaannotPysyvat()
        {
            var sat = new Satunnainen(7);
            int paattyi = 0;
            for (int peli = 0; peli < 200; peli++)
            {
                var m = new Mylly();
                for (int n = 0; n < 2000 && m.Lopputulos() == null; n++)
                {
                    var l = Siirrot(m);
                    Oleta.Tosi(l.Count > 0, "kesken olevalla on siirtoja");
                    m.Tee(l[(int)(sat.Seuraava() * l.Count)]);
                    for (int p = 0; p < 2; p++) Oleta.Tosi(m.Kadessa(p) + m.Laudalla(p) <= 9 && m.Laudalla(p) >= 0, "nappulamäärät");
                }
                if (m.Lopputulos() != null) paattyi++;
            }
            Oleta.Sama(200, paattyi, "jokainen peli päättyy (tasapeliraja 100 puolisiirtoa)");
        }

        [Testi] static void BottiSulkeeMyllynJaTorjuu()
        {
            // Valkoinen 0, 1 (uhka 2). Mustan vuoro: vaikea botti torjuu asettamalla pisteeseen 2.
            var m = Asetettu(new[] { 0, 1 }, new[] { 12 });
            Oleta.Sama(1, m.Vuorossa);
            var (syv, hai) = Botti.Taso(Vastustaja.BottiVaikea);
            var s = Botti.Valitse(m, syv, hai, new Satunnainen(1));
            Oleta.Sama(2, (int)s.Mihin, "torjuu myllyn");
            // Valkoisen vuorossa myllyuhka omalla: normaali botti sulkee.
            var k = Asetettu(new[] { 0, 1 }, new[] { 12, 13 });
            Oleta.Sama(0, k.Vuorossa);
            var (s2, h2) = Botti.Taso(Vastustaja.BottiNormaali);
            var v = Botti.Valitse(k, s2, 0, new Satunnainen(1));
            Oleta.Sama(2, (int)v.Mihin, "sulkee oman myllyn");
            Oleta.Tosi(v.Poista >= 0, "ja poistaa");
        }

        static int Ottelu(Vastustaja valkoinen, Vastustaja musta, uint siemen)
        {
            var m = new Mylly();
            var sat = new Satunnainen(siemen);
            while (m.Lopputulos() == null)
            {
                var (syv, hai) = Botti.Taso(m.Vuorossa == 0 ? valkoinen : musta);
                m.Tee(Botti.Valitse(m, syv, hai, sat));
            }
            return m.Lopputulos().Value;
        }

        /// <summary>Asema pistelistoista: pelaaja 0 ja 1 laudalla, kädet ja vuoro.</summary>
        static Mylly Asema(int[] p0, int[] p1, int kasi0, int kasi1, int vuoro)
        {
            var c = Enumerable.Repeat('.', 24).ToArray();
            foreach (int p in p0) c[p] = '0';
            foreach (int p in p1) c[p] = '1';
            return Mylly.Asemasta(new string(c), kasi0, kasi1, vuoro);
        }

        [Testi] static void MyllyssaOlevaaEiPoistetaElleiKaikkiMyllyissa()
        {
            // Musta: mylly 8–9–10 + irrallinen 20. Valkoinen sulkee myllyn 0–1–2 → vain 20 poistettavissa.
            var m = Asema(new[] { 0, 1 }, new[] { 8, 9, 10, 20 }, 7, 5, 0);
            Oleta.Sama("20", string.Join(",", Siirrot(m).Where(s => s.Mihin == 2).Select(s => (int)s.Poista)));
            // Kun kaikki mustat ovat myllyssä, mikä tahansa saa lähteä.
            var k = Asema(new[] { 0, 1 }, new[] { 8, 9, 10 }, 7, 6, 0);
            Oleta.Sama("8,9,10", string.Join(",", Siirrot(k).Where(s => s.Mihin == 2).Select(s => (int)s.Poista)));
            Oleta.Sama(k.Asema(), Mylly.Asemasta(k.Asema(), 7, 6, 0).Asema(), "Asema ↔ Asemasta");
        }

        [Testi] static void SiirtoVaiheVainViereiseen()
        {
            var m = Asema(new[] { 0, 2, 4, 6, 9, 13, 16, 18, 20 }, new[] { 1, 3, 5, 7, 8, 10, 12, 14, 22 }, 0, 0, 0);
            var l = Siirrot(m);
            Oleta.Tosi(l.Count > 0 && l.All(s => !s.Asetus && Mylly.Naapurit[s.Mista].Contains(s.Mihin)), "vain viereiseen");
            Oleta.Tosi(!m.Lentaa(0), "9 laudalla ei lennä");
        }

        [Testi] static void LentaaKolmellaNappulalla()
        {
            // Valkoisella 3 laudalla, käsi tyhjä → saa siirtyä mihin tahansa tyhjään (myös kauas).
            var m = Asema(new[] { 0, 12, 21 }, new[] { 1, 3, 5, 7, 9, 14 }, 0, 0, 0);
            Oleta.Tosi(m.Lentaa(0), "lentää");
            var l = Siirrot(m);
            Oleta.Sama(3 * (24 - 9), l.Select(s => (s.Mista, s.Mihin)).Distinct().Count(), "jokaisesta jokaiseen tyhjään");
            Oleta.Tosi(l.Any(s => s.Mista == 0 && s.Mihin == 20), "kauas ulkoneliöstä sisään");
        }

        [Testi] static void JumissaHaviaaJaAlleKolmenHaviaa()
        {
            // Mustat 0, 2, 4, 6 ulkokulmissa, valkoiset saartavat (1, 3, 5, 7): mustalla ei siirtoja → valkoinen voittaa.
            var m = Asema(new[] { 1, 3, 5, 7, 9, 11 }, new[] { 0, 2, 4, 6 }, 0, 0, 1);
            Oleta.Sama((int?)0, m.Lopputulos(), "jumissa oleva musta häviää");
            Oleta.Sama(0, Siirrot(m).Count);
            var a = Asema(new[] { 0, 1, 9 }, new[] { 20, 22 }, 0, 0, 1);
            Oleta.Sama((int?)0, a.Lopputulos(), "alle kolmen häviää");
            // Asetusvaiheessa käsi lasketaan mukaan.
            var b = Asema(new[] { 0, 1, 9 }, new[] { 20, 22 }, 1, 1, 1);
            Oleta.Sama((int?)null, b.Lopputulos());
        }

        static bool TekeeMyllyn(Mylly m, MyllySiirto s) { int oma = m.Vuorossa; m.Tee(s); bool t = m.Myllyssa(s.Mihin, oma); m.Peru(); return t; }

        [Testi] static void TasapeliRajaPaattaaPelin()
        {
            // Lentävät kolmikot siirtelevät ilman myllyjä: 100 puolisiirtoa ilman poistoa → tasapeli.
            var m = Asema(new[] { 0, 8, 16 }, new[] { 4, 12, 21 }, 0, 0, 0);
            for (int n = 0; n < Mylly.TasapeliRaja; n++)
            {
                Oleta.Sama((int?)null, m.Lopputulos(), $"kesken {n}");
                m.Tee(Siirrot(m).First(x => !TekeeMyllyn(m, x)));
            }
            Oleta.Sama((int?)-1, m.Lopputulos(), "tasapeli");
        }

        [Testi] static void VaikeaVoittaaHelpon()
        {
            int vaikea = 0, helppo = 0;
            for (uint i = 0; i < 6; i++)
            {
                // Vuorotellen kumpi aloittaa.
                int t = i % 2 == 0 ? Ottelu(Vastustaja.BottiVaikea, Vastustaja.BottiHelppo, i + 1) : Ottelu(Vastustaja.BottiHelppo, Vastustaja.BottiVaikea, i + 1);
                int vaikeanPuoli = i % 2 == 0 ? 0 : 1;
                if (t == vaikeanPuoli) vaikea++; else if (t >= 0) helppo++;
            }
            Oleta.Tosi(vaikea >= 5 && helppo == 0, $"vaikea {vaikea}, helppo {helppo}");
        }

        [Testi] static void VaikeaBottiOnNopea()
        {
            // Pahin kohta: asetusvaiheen alku (24 tyhjää) ja keskipeli. Raja 1,5 s / siirto Macilla (laitteella botti
            // ajetaan taustasäikeessä; UI ei odota).
            var sat = new Satunnainen(3);
            var m = new Mylly();
            var kello = Stopwatch.StartNew();
            long pisin = 0;
            for (int n = 0; n < 30 && m.Lopputulos() == null; n++)
            {
                var (syv, hai) = Botti.Taso(Vastustaja.BottiVaikea);
                long alku = kello.ElapsedMilliseconds;
                m.Tee(Botti.Valitse(m, syv, hai, sat));
                pisin = Math.Max(pisin, kello.ElapsedMilliseconds - alku);
            }
            Console.WriteLine($"  vaikea botti: pisin siirto {pisin} ms");
            Oleta.Tosi(pisin < 1500, $"pisin {pisin} ms");
        }

        [Testi] static void BotinSiirtoOnToistettava()
        {
            var a = Asetettu(new[] { 0, 9 }, new[] { 4, 13 });
            var s1 = Botti.Valitse(a, 3, 0.1, new Satunnainen(5));
            var s2 = Botti.Valitse(a, 3, 0.1, new Satunnainen(5));
            Oleta.Sama(s1, s2, "sama siemen → sama siirto");
        }

        [Testi] static void PelikehysPalkitseeVainBotinVoiton()
        {
            var t = new PeliTulos { PeliId = "DEU-2", Nimi = "Mylly", PaikallinenNimi = "Mühle", Paikka = "Leipzig", Vastustaja = Vastustaja.BottiNormaali, Voittaja = 0, Siirtoja = 31, Paiva = "2026-10-01" };
            var talous = PelinTalous.IlmainenVihjeella;
            Oleta.Tosi(Pelikehys.Vihje(t, talous), "botin voitto → vihje");
            Oleta.Sama(0, Pelikehys.Rahapalkkio(t, talous), "mylly: ei rahaa");
            Oleta.Sama("Mylly (Mühle), Leipzig: voitit botin (normaali) 31 siirrossa.", Pelikehys.Matkakirjarivi(t));
            var kaveri = new PeliTulos { Nimi = "Mylly", Vastustaja = Vastustaja.Kaveri, Voittaja = 0, Siirtoja = 40 };
            Oleta.Tosi(!Pelikehys.Vihje(kaveri, talous), "kaveripeli ei palkitse");
            Oleta.Sama("Mylly: aloittaja voitti kaveripelin 40 siirrossa.", Pelikehys.Matkakirjarivi(kaveri));
            var havio = new PeliTulos { Nimi = "Mylly", Vastustaja = Vastustaja.BottiVaikea, Voittaja = 1, Siirtoja = 52 };
            Oleta.Sama("Mylly: hävisit, vastassa botti (vaikea) 52 siirrossa.", Pelikehys.Matkakirjarivi(havio));
            var raha = new PelinTalous { Voittopalkkio = 30, AlinPalkittava = Vastustaja.BottiNormaali };
            Oleta.Sama(0, Pelikehys.Rahapalkkio(new PeliTulos { Vastustaja = Vastustaja.BottiHelppo, Voittaja = 0 }, raha), "helppo alle rajan");
            Oleta.Sama(30, Pelikehys.Rahapalkkio(new PeliTulos { Vastustaja = Vastustaja.BottiVaikea, Voittaja = 0 }, raha));
        }

        [Testi] static void PelikehysKirjaaPelipaivanJaPalkkion()
        {
            var m = Matka.Luo(ValeVerkko.Pieni(), new Satunnainen(1), "Fogg", "ala");
            m.AloitaVuoro();
            int alku = m.Tila.Pelaaja.Raha;
            var raha = new PelinTalous { Voittopalkkio = 30 };
            var t = new PeliTulos { Nimi = "Mylly", Vastustaja = Vastustaja.BottiNormaali, Voittaja = 0, Siirtoja = 20, Paiva = "2026-10-01" };
            var (streak, palkkio) = Pelikehys.Kirjaa(m, t, raha);
            Oleta.Tosi(streak.HasValue && streak.Value.Pituus == 1, "pelattu peli = pelipäivän teko");
            Oleta.Sama(30, palkkio);
            Oleta.Sama(alku + 30, m.Tila.Pelaaja.Raha);
            Oleta.Tosi(Pelikehys.Kirjaa(m, t, PelinTalous.IlmainenVihjeella).Streak == null, "sama päivä ei kirjaa uudelleen");
        }
    }
}
