// OLAVINLINNAN M-OSA (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md 8.2 huoneet 6–10, kohta 11 huonesimulaatio): reitti
// kaari-ovelta kiipeilyn alkuun (reitti:pelaaja-21…92, LR v44v) Thief-ajurilla: torkkujan ohitus, naamio naulakosta, Linnantupa
// (linnaväki, apulainen tunnistaa 2 m / 2 s), voudin sali, muuriportaat, ampumakäytävä, muurikäytävän lyhtyvartija, harja.
// Maailma: Huonesimulaatio.UusiM (tarjotin annettu, kynttilä puhallettu, torkkuja syö). Voudin katse ja avainrengas (SeikkailuSali)
// eivät ole mukana; vouti istuu kuten datassa.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class OlavinlinnaMOsaTestit
    {
        public const int MAlku = 20, KiipeilyAlku = 91, Komero = 92, Koysilasku = 93;   // reitti:pelaaja-21, -92, -93, -94 (0-pohjaiset)

        public const int Ovi = 81;   // reitti:pelaaja-82 muurikäytävän ovi (0-pohjainen)

        // Koko M-reitti (21 → 92) ajetaan kerran ja testit lukevat siitä osuutensa tilat (Tulos.Tilat); epäonnistuessa osuudet ajetaan erikseen.
        static ThiefAjuri.Tulos koko;
        static ThiefAjuri.Tulos Koko() => koko ??= ThiefAjuri.Aja(Huonesimulaatio.UusiM(), MAlku + 1, KiipeilyAlku, budjetti: 600);
        /// <summary>Tila reittipisteessä k (0-pohjainen) koko ajosta kopiona, tai erillinen ajo, jos koko ajo ei mennyt läpi.</summary>
        static Huonesimulaatio Tila(int k) => Koko().Loppu != null ? Koko().Tilat[k - (MAlku + 1)].Kopioi() : ThiefAjuri.Aja(Huonesimulaatio.UusiM(), MAlku + 1, k, budjetti: 600).Loppu;

        [Testi] static void VarjoreittiHuone6JaMuuriportaat()
        {
            Oleta.Tosi(Huonesimulaatio.Reitti.Count > Koysilasku, $"reitti:pelaaja-21…94 ({Huonesimulaatio.Reitti.Count})");
            var tulos = Koko().Loppu != null ? Koko() : ThiefAjuri.Aja(Huonesimulaatio.UusiM(), MAlku + 1, Ovi, budjetti: 600);
            var loppu = tulos.Loppu != null ? tulos.Tilat[Math.Min(Ovi, tulos.Pisin) - (MAlku + 1)] : null;
            double sujuva = ThiefAjuri.Sujuva(MAlku, Ovi, Kavely.HiipiminenMs);
            if (loppu == null) { Console.WriteLine($"      jumissa pisteessä {tulos.Pisin + 1}:"); ThiefAjuri.Tulosta(tulos.PisinTila); }
            else Console.WriteLine($"      huone 6–7 ovelle {loppu.T:F0} s (sujuva {sujuva:F0} s), kiinni {loppu.Kiinni}, naamio {loppu.Naamio}: {string.Join(", ", tulos.Loki)}");
            Oleta.Tosi(loppu != null, $"ajuri pääsi pisteeseen {tulos.Pisin + 1}/{Ovi + 1} ilman epäilyä");
            Oleta.Tosi(loppu.Kiinni == 0 && loppu.Naamio, $"0 kiinnijääntiä ({loppu.Kiinni}), naamio puettu ({loppu.Naamio})");
            Oleta.Tosi(loppu.T <= 2 * sujuva, $"aika {loppu.T:F0} s ≤ 2 × sujuva {sujuva:F0} s");
        }

        public const int TikkaatAla = 86;   // reitti:pelaaja-87 tikkaat muurinharjalle (0-pohjainen)
        /// <summary>Harjan tikkaiden yläpää on 0,9 m talonpojasta ja 1,5 m vartijasta soihdun valossa (v44w): alle 2 m:n selkäaisti ja valo
        /// nostavat epäilyn nousussa. Kun LR/Siirtoseppä korjaa (siirto, valo tai kohtauksen aikainen poikkeus), vaihda true: testi vaatii läpäisyn.</summary>
        public const bool HarjaKorjattu = true;   // v44y: harjan hahmot 5 m liitoksesta (LS2 todensi v44z:llä)

        /// <summary>Huone 7 muurikäytävässä (naamio ei kelpaa, PT 8.10.; LR v44w: komerot, varjot, lyhyempi partio, kivi): ovelta tikkaille hiipien.</summary>
        [Testi] static void MuurikaytavaHiipien()
        {
            var ennen = Tila(Ovi);
            Oleta.Tosi(ennen != null, "muurikäytävän ovelle");
            double t0 = ennen.T;
            var tulos = ThiefAjuri.Aja(ennen, Ovi + 1, TikkaatAla, budjetti: 600); var loppu = tulos.Loppu;
            double sujuva = ThiefAjuri.Sujuva(Ovi, TikkaatAla, Kavely.HiipiminenMs);
            if (loppu == null) { Console.WriteLine($"      jumissa pisteessä {tulos.Pisin + 1}:"); ThiefAjuri.Tulosta(tulos.PisinTila); }
            else Console.WriteLine($"      muurikäytävä {loppu.T - t0:F0} s (sujuva {sujuva:F0} s), kiinni {loppu.Kiinni}: {string.Join(", ", tulos.Loki)}");
            Oleta.Tosi(loppu != null && loppu.Kiinni == 0, $"hiipien tikkaille ({tulos.Pisin + 1}/{TikkaatAla + 1})");
            Oleta.Tosi(loppu.T - t0 <= 2 * sujuva + 30, $"aika {loppu.T - t0:F0} s ≤ 2 × sujuva + 30 s (lyhdyn kierros)");
        }

        /// <summary>Huone 8 harjalla: tikkaat ylös, köysikieppi vartijoiden takaa, sakara, kiipeilyn alku (pelaaja-87 → -92).</summary>
        [Testi] static void HarjaHiipien()
        {
            var tikkaat = Tila(TikkaatAla);
            Oleta.Tosi(tikkaat != null, "tikkaiden juurelle");
            var tulos = ThiefAjuri.Aja(tikkaat, TikkaatAla + 1, KiipeilyAlku, budjetti: 600);
            if (tulos.Loppu != null) Console.WriteLine($"      harja: läpi, kiinni {tulos.Loppu.Kiinni}: {string.Join(", ", tulos.Loki)}");
            else { Console.WriteLine($"      harja: {(HarjaKorjattu ? "" : "ODOTTAA KORJAUSTA (tiedoksi): ")}jumissa pisteessä {tulos.Pisin + 1}:"); ThiefAjuri.Tulosta(tulos.PisinTila); }
            if (HarjaKorjattu) Oleta.Tosi(tulos.Loppu != null && tulos.Loppu.Kiinni == 0, $"harja hiipien ({tulos.Pisin + 1}/{KiipeilyAlku + 1})");
        }

        /// <summary>Kiipeily (huone 8): otteet ote:kellotorni-1…24 (LR v45x), puuskat tuuli:-merkkien otteilla, lyhty yllä puolivälissä kerran
        /// (SeikkailuPelaaja); kurinalainen kiipeilijä pysähtyy varoituksiin.</summary>
        static (double Aika, bool Putosi, bool Havaittu) Kiipea(int otteita, IEnumerable<int> puuskat, IEnumerable<int> kapeat = null, IEnumerable<int> levot = null, bool lepaa = true)
        {
            var k = new Kiipeily(otteita, puuskat, kapeat, levot); bool lyhty = false, putosi = false, havaittu = false; double t = 0;
            for (; t < 180 && !k.Perilla; t += Huonesimulaatio.Dt)
            {
                // Kurinalainen: pysähtyy varoituksiin, kapealla tarkkaan otteeseen ja lepää lepo-otteella voiman palautumiseen asti.
                bool lepo = lepaa && k.Siirtyy == 0 && k.Lepo(k.Ote) && k.Voima < 0.95;
                int s = k.PuuskaVaroittaa || k.Puuska || k.LyhtyVaroittaa || k.LyhtyValaisee || k.Himmenee || k.KapeaOdottaa || lepo ? 0 : 1;
                k.Paivita(Huonesimulaatio.Dt, s);
                if (!lyhty && k.Ote >= otteita / 2 && k.Siirtyy == 0) { lyhty = true; k.LyhtyYlla(); }
                putosi |= k.Putosi; havaittu |= k.Havaittu;
            }
            return (t, putosi, havaittu);
        }

        static (double X, double Y, double Z) Merkki(string nimi) { foreach (var m in Huonesimulaatio.Data.Merkit) if (m.Nimi == nimi) return (m.X, m.Y, m.Z); throw new Exception(nimi + " puuttuu"); }

        [Testi] static void KiipeilyKomeroJaPako()
        {
            var d = Huonesimulaatio.Data;
            // Huone 8: kiipeily tornin ympäri.
            var otteet = new List<(double X, double Y, double Z)>();
            for (int i = 1; ; i++) { KavelyMerkki m = null; foreach (var x in d.Merkit) if (x.Nimi == "ote:kellotorni-" + i) m = x; if (m == null) break; otteet.Add((m.X, m.Y, m.Z)); }
            var puuskat = new List<int>(); var kapeat = new List<int>(); var levot = new List<int>();
            foreach (var m in d.Lajia("tuuli")) for (int i = 0; i < otteet.Count; i++) if (Huonesimulaatio.Etaisyys3(m.X, m.Y, m.Z, otteet[i].X, otteet[i].Y, otteet[i].Z) < 0.5) puuskat.Add(i);
            for (int i = 0; i < otteet.Count; i++) foreach (var x in d.Merkit) if (x.Nimi == "ote:kellotorni-" + (i + 1)) { if (x.Kapea) kapeat.Add(i); if (x.Tyyppi == "lepo") levot.Add(i); }
            var (kiipeily, putosi, havaittu) = Kiipea(otteet.Count, puuskat, kapeat, levot);
            var (ilmanLepoa, putosiIlman, _) = Kiipea(otteet.Count, puuskat, kapeat, levot, lepaa: false);
            Console.WriteLine($"      kiipeily: {otteet.Count} otetta, puuskat {string.Join(",", puuskat)}, kapeat {string.Join(",", kapeat)}, lepo {string.Join(",", levot)}; kurinalainen {kiipeily:F1} s, ilman lepoa {(putosiIlman ? "putoaa" : "perille")} ({ilmanLepoa:F1} s)");
            Oleta.Tosi(otteet.Count == 24 && puuskat.Count == 3, $"24 otetta ja 3 puuskaa (LR v45x; {otteet.Count}, {puuskat.Count})");
            Oleta.Tosi(kapeat.Count == 5 && levot.Count == 1, $"LR v45y: 5 kapeaa ja 1 lepo-ote ({kapeat.Count}, {levot.Count})");
            Oleta.Tosi(!putosi && !havaittu && kiipeily < 60, $"kurinalainen perille ilman putoamista ja havaintoa ({kiipeily:F1} s)");
            // Huone 9: komero hitaasti vetäen (ensimmäinen putoaa, muut komeroon: ei kurkistusta), kilvet 3 × 15°, kansi auki.
            var komero = new Komero(); int putosiTiilia = 0;
            for (int i = 0; i < komero.Tiilet.Maara; i++) { komero.Raavi(i); if (komero.Raavi(i, 0) == TiiliTulos.Putosi) putosiTiilia++; komero.Tiilet.Paivita(3); }
            for (int i = 0; i < 3; i++) { komero.KaannaKilpea(1); komero.KaannaKilpea(2); }
            Oleta.Tosi(putosiTiilia == 1 && !komero.Tiilet.Kurkistaa && komero.Avaa() == KilpiTulos.Auki, $"komero: putosi {putosiTiilia}, kurkistus {komero.Tiilet.Kurkistaa}, auki {komero.Auki}");
            // Huone 10: kello, köysi kramppiin, köysilasku (otteet 1 m:n välein, lyhty puolivälissä), kallio kävellen K4:lle maailmassa,
            // jossa rannan soihtuvartijat tulevat esiin 20 s kellosta.
            var pako = new Pako(); pako.ArkkuAuki(); pako.Paivita(0.5, false); pako.Kiinnita();
            var krampi = Merkki("koysi:krampi-komero"); var p1 = Merkki("reitti:pako-1");
            int laskuOtteita = (int)Math.Ceiling(Huonesimulaatio.Etaisyys3(krampi.X, krampi.Y, krampi.Z, p1.X, p1.Y + 1.55, p1.Z)) + 1;
            var (lasku, lPutosi, lHavaittu) = Kiipea(laskuOtteita, null);
            pako.Paivita(lasku, false); pako.LaskuValmis();
            Oleta.Tosi(!lPutosi && !lHavaittu && pako.Vaihe == PakoVaihe.Kallio, $"köysilasku {laskuOtteita} otetta {lasku:F1} s");
            var w = Huonesimulaatio.UusiM(); (w.PX, w.PY, w.PZ) = p1; w.Naamio = false;
            var k4 = Merkki("kamera:K4"); double kalliolla = pako.KelloS; bool esiin = false;
            for (int n = 2; n <= 5 && pako.Vaihe == PakoVaihe.Kallio; n++)
            {
                var q = Merkki("reitti:pako-" + n);
                for (int i = 0; i < 3000 && pako.Vaihe == PakoVaihe.Kallio; i++)
                {
                    bool perilla = w.Askel(q, false);
                    pako.Paivita(Huonesimulaatio.Dt, Huonesimulaatio.Etaisyys2(w.PX, w.PZ, k4.X, k4.Z) < 2.5);
                    if (pako.RantaEsiin) { pako.RantaEsiin = false; esiin = true; w.Aktivoi("ranta"); }
                    if (perilla) break;
                }
            }
            Console.WriteLine($"      pako: köysilasku {lasku:F1} s, kalliolle {kalliolla:F1} s kellosta, K4 {pako.KelloS:F1} s kellosta (vartijat esiin {Pako.RantaEsiinS:F0} s: {esiin}), kiinni {w.Kiinni}");
            Oleta.Tosi(pako.Vaihe == PakoVaihe.K4 && !pako.Myohastynyt && w.Kiinni == 0, $"sukellus ennen myöhästymistä ({pako.Vaihe}, {pako.KelloS:F1} s, kiinni {w.Kiinni})");
            foreach (var h in w.Hahmot) if (h.Aktiivinen && (h.Nimi == "ranta" || h.Nimi.StartsWith("seisoo-harja", StringComparison.Ordinal))) Oleta.Tosi(h.Aivot.Mittari < 0.3, $"{h.Nimi} ei epäile ({h.Aivot.Mittari:F2})");
        }

        /// <summary>Kiinnijäänti eri kohdissa huoneita 6–8 (T6a…T8a; kohta 4.3): pelaaja palaa viimeisimpään tarkistuspisteeseen (portaalin
        /// ylitys), kaikki ovat valppaina 60 s, ja ajuri pääsee silti kiipeilyn alkuun ilman uutta kiinnijääntiä (tarvittaessa odottaa
        /// valppauden pois piilossa tai perääntyen: ThiefAjurin laaja haku).</summary>
        [Testi] static void KiinniTarkistuspisteeseenJaLoppuun()
        {
            var kohdat = new[] { 44, 56, 69, 83, 88 };   // Tott-kammio (torkkujan vieressä), voudin sali, muuriportaat, muurikäytävä, harja
            Oleta.Tosi(Koko().Loppu != null && Koko().Tilat.Count == KiipeilyAlku - MAlku, $"koko reitti ({Koko().Tilat.Count} tilaa)");
            foreach (int k in kohdat)
            {
                var tila = Tila(k);
                var koe = tila.Kopioi(); var tarkistus = koe.Tarkistus; double t0 = koe.T;
                koe.Kiinnijaanti();
                // Muuriportailla (70) tarkistuspiste on ampuma-aukkokomero (piiloon meno ilman epäilyä, Siirtoseppä juna 167).
                var komero = MVihjeet.Paikka(Huonesimulaatio.Data, "piilo:muuriporras-2-komero").Value;
                double komeroon = Math.Sqrt((tarkistus.X - komero.X) * (tarkistus.X - komero.X) + (tarkistus.Z - komero.Z) * (tarkistus.Z - komero.Z));
                Console.WriteLine($"      kiinni {k + 1}: tarkistus ({tarkistus.X:F1}, {tarkistus.Y:F1}, {tarkistus.Z:F1}), komeroon {komeroon:F1} m");
                if (k == 69) Oleta.Tosi(komeroon <= 2 && Math.Abs(tarkistus.Y - komero.Y) <= 2, $"kiinni 70: tarkistuspiste komerossa ({komeroon:F1} m)");
                Oleta.Tosi(koe.PX == tarkistus.X && koe.PZ == tarkistus.Z && koe.Seuraava <= k + 1, $"kiinni {k + 1}: tarkistuspisteeseen (seuraava {koe.Seuraava + 1})");
                foreach (var h in koe.Hahmot) if (h.Aktiivinen && !h.Aivot.Torkkuu) Oleta.Tosi(h.Aivot.Valppaus > 59, $"{h.Nimi} valppaana");
                var tulos = ThiefAjuri.Aja(koe, koe.Seuraava, KiipeilyAlku, budjetti: 600); var loppu = tulos.Loppu;
                if (loppu == null) { Console.WriteLine($"      jumissa pisteessä {tulos.Pisin + 1}:"); ThiefAjuri.Tulosta(tulos.PisinTila); }
                Console.WriteLine($"      kiinni pisteessä {k + 1} → tarkistus pisteeseen {koe.Seuraava + 1}: {(loppu != null ? $"loppuun {loppu.T - t0:F0} s, kiinni {loppu.Kiinni}" : "JUMI")}");
                Oleta.Tosi(loppu != null && loppu.Kiinni == 1, $"kiinni {k + 1}: tarkistuspisteestä kiipeilyn alkuun ilman uutta kiinnijääntiä");
            }
        }

        /// <summary>Kiinnijäänti JOKA reittipisteessä 22…91 (Siirtoseppä 10.10., PT erä 1; yllä viisi kohtaa koko loppureitillä): LR:n paketti
        /// ei voi rikkoa yhtäkään kohtaa huomaamatta. Tarkistuspisteestä ajetaan kiinnijäännin kohdan ohi, kunnes kukaan ei ole enää valpas
        /// (sen jälkeen tilanne on sama kuin ilman kiinnijääntiä), ilman uutta kiinnijääntiä; tarkistuspiste enintään PaluuMax pistettä taaempana
        /// ja menetetty aika ≤ LisaMaxS (malli 4.3: kiinnijäänti lisää 1–1,5 min tyrmän kanssa). v47a: pahin 99 s (kiinni 68: valppaus 60 s
        /// pisteen 67 torkkujan vieressä), pisin paluu 19 (huone 6: kaari-ovi 22 ja voudin sali 46). Harjalla (89–91) paluu tikkaiden
        /// yläpäähän 88 (TikkaidenYlapaaTekeeTarkistuspisteen; ennen muurikäytävän pisteeseen 85).</summary>
        public const double LisaMaxS = 120; public const int PaluuMax = 20;
        /// AJETAAN VAIN PYYDETTÄESSÄ (PT 10.10.: ~150 s): `OLAVINLINNA_LAAJA=1 ./kaanna.sh KiinniJokaPisteessa` aina, kun Olavinlinnan paketti,
        /// reitti tai vartijat muuttuvat.
        [Testi] static void KiinniJokaPisteessa()
        {
            if (Environment.GetEnvironmentVariable("OLAVINLINNA_LAAJA") != "1") { Console.WriteLine("      ohitettu (OLAVINLINNA_LAAJA=1 ajaa)"); return; }
            Oleta.Tosi(Koko().Loppu != null, "koko M-reitti läpi");
            KiinniKaikissa(Tila, MAlku + 1, KiipeilyAlku);
        }

        /// <summary>Kiinnijäänti jokaisessa pisteessä alku…loppu − 1 (tila(k) = tila pisteessä k ilman kiinnijääntiä, tila(loppu) mukaan
        /// lukien); ks. KiinniJokaPisteessa. Myös huoneet 2–4 (OlavinlinnaPalaKiinniTestit).</summary>
        public static void KiinniKaikissa(Func<int, Huonesimulaatio> tilaK, int alku, int loppuK)
        {
            double pahin = 0; int pahinK = 0, pisinPaluu = 0;
            for (int k = alku; k < loppuK; k++)
            {
                var tila = tilaK(k); var koe = tila.Kopioi(); double t0 = koe.T;
                koe.Kiinnijaanti(); int takaisin = koe.Seuraava;
                // Osissa (3 pistettä kerrallaan) kunnes valppaus on ohi; jos osa jumittaa, koko loppureitti kerralla (ajurin paluuhaku osarajan yli).
                var w = koe; int loppu = k + 1; bool jumi = false;
                while (true)
                {
                    var osa = ThiefAjuri.Aja(w, w.Seuraava, loppu, budjetti: 600);
                    if (osa.Loppu == null) { var t = ThiefAjuri.Aja(koe, koe.Seuraava, loppuK, budjetti: 600); w = t.Loppu; loppu = loppuK; jumi = w == null; if (jumi) { Console.WriteLine($"      kiinni {k + 1}: jumissa pisteessä {t.Pisin + 1}:"); ThiefAjuri.Tulosta(t.PisinTila); } break; }
                    w = osa.Loppu; bool valpas = false;
                    foreach (var h in w.Hahmot) if (h.Aktiivinen && h.Aivot.Valppaus > 0) valpas = true;
                    if (!valpas || loppu >= loppuK) break;
                    loppu = Math.Min(loppu + 3, loppuK);
                }
                Oleta.Tosi(!jumi && w.Kiinni == tila.Kiinni + 1, $"kiinni {k + 1}: tarkistuspisteestä {takaisin + 1} pisteeseen {loppu + 1} ilman uutta kiinnijääntiä");
                if (jumi) continue;
                double lisa = (w.T - t0) - (tilaK(loppu).T - tila.T);
                if (lisa > pahin) { pahin = lisa; pahinK = k; }
                pisinPaluu = Math.Max(pisinPaluu, k - takaisin);
                Oleta.Tosi(k - takaisin <= PaluuMax, $"kiinni {k + 1}: tarkistus {takaisin + 1} enintään {PaluuMax} pistettä taaempana ({k - takaisin})");
                Oleta.Tosi(lisa <= LisaMaxS, $"kiinni {k + 1}: menetetty aika {lisa:F0} s ≤ {LisaMaxS:F0} s");
            }
            Console.WriteLine($"      {loppuK - alku} kohtaa: pahin menetys {pahin:F0} s (kiinni {pahinK + 1}), pisin paluu {pisinPaluu} pistettä");
        }

        /// <summary>Tikkaiden yläpää tekee tarkistuspisteen (PT 10.10., SeikkailuVartijat): harja on samaa osaa kuin muurikäytävä, joten
        /// harjalla (89–91) kiinni jäänyt palasi ennen muurikäytävän pisteeseen 85; nyt tikkaiden yläpäähän 88.</summary>
        [Testi] static void TikkaidenYlapaaTekeeTarkistuspisteen()
        {
            for (int k = TikkaatAla + 2; k < KiipeilyAlku; k++)
            {
                var w = Tila(k); w.Kiinnijaanti();
                Console.WriteLine($"      kiinni {k + 1} → tarkistus {w.Seuraava + 1} ({w.PX:F1}, {w.PY:F1}, {w.PZ:F1})");
                Oleta.Tosi(w.Seuraava == TikkaatAla + 1 && w.PY > 16, $"kiinni {k + 1}: tarkistus tikkaiden yläpäässä {TikkaatAla + 2} (nyt {w.Seuraava + 1}, y {w.PY:F1})");
            }
        }

        /// <summary>Piiloon meno tekee tarkistuspisteen (SeikkailuVartijat, Siirtoseppä juna 167): muuriportailla (69, tarkistus vielä
        /// Tott-kammiossa 66) ampuma-aukkokomeroon samassa osassa kukaan ei epäile → tarkistuspiste komeroon, kiinni → komeroon.</summary>
        [Testi] static void PiiloonMenoTekeeTarkistuspisteen()
        {
            var w = Tila(68); var d = Huonesimulaatio.Data;
            var komero = MVihjeet.Paikka(d, "piilo:muuriporras-2-komero").Value;
            string osa = Askelaani.Osa(d, w.PX, w.PY, w.PZ); var ennen = w.Tarkistus;
            Oleta.Tosi(osa == Askelaani.Osa(d, komero.X, komero.Y, komero.Z), $"komero samassa osassa ({osa})");
            for (int i = 0; i < 600 && !w.Piilossa(); i++) w.Askel(komero, true);
            Oleta.Tosi(w.Piilossa() && Askelaani.Osa(d, w.PX, w.PY, w.PZ) == osa, "piilossa komerossa, ei osan vaihtoa");
            double siirto = Math.Sqrt((w.Tarkistus.X - ennen.X) * (w.Tarkistus.X - ennen.X) + (w.Tarkistus.Y - ennen.Y) * (w.Tarkistus.Y - ennen.Y) + (w.Tarkistus.Z - ennen.Z) * (w.Tarkistus.Z - ennen.Z));
            Oleta.Tosi(siirto > Huonesimulaatio.TarkistusPiiloM && w.Tarkistus.X == w.PX && w.Tarkistus.Z == w.PZ, $"tarkistuspiste komeroon ({siirto:F1} m)");
            int seuraava = w.Seuraava; w.Kiinnijaanti();
            Oleta.Tosi(w.Piilossa() && w.Seuraava == seuraava, $"kiinni → komeroon (seuraava {w.Seuraava + 1})");
        }

        /// <summary>Anteeksianto (pelattavuusmalli 4.2): 2. kiinnijäänti samassa osassa helpottaa kaikkia (näkö −15 %, raja 0,4), 3. antaa Pulun
        /// tason 2; helpotus päättyy, kun pelaaja siirtyy toiseen osaan.</summary>
        [Testi] static void AnteeksiantoToinenJaKolmasKiinnijaanti()
        {
            var w = Tila(51);   // Linnantupa (palatsi)
            w.Kiinnijaanti();
            Oleta.Tosi(w.KiinniOsassa == 1 && !w.Hahmot.Exists(h => h.Aivot.Helpotettu), "1. kiinnijäänti: ei helpotusta");
            var osa = Askelaani.Osa(Huonesimulaatio.Data, w.PX, w.PY, w.PZ);
            w.Kiinnijaanti();
            Oleta.Tosi(w.KiinniOsassa == 2 && w.Hahmot.TrueForAll(h => !h.Aktiivinen || h.Aivot.Helpotettu) && w.PuluPakotettu == 0, $"2. samassa osassa ({osa}): kaikki helpotetuiksi");
            w.Kiinnijaanti();
            Oleta.Sama(1, w.PuluPakotettu, "3. kiinnijäänti: Pulun taso 2");
            var loppu = ThiefAjuri.Aja(w, w.Seuraava, 65, budjetti: 600).Loppu;   // takaisin Tott-kammioon portaiden juurelle (kirkkotorni-portaat)
            Oleta.Tosi(loppu != null && !loppu.Hahmot.Exists(h => h.Aivot.Helpotettu), "osan vaihtuessa helpotus päättyy");
        }
    }
}
