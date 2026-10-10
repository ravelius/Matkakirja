// THIEF-AJURI (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md kohta 11, huonesimulaatio): ennen jokaista reittipistettä
// ajuri kokeilee kopiolla (Huonesimulaatio.Kopioi) odotusta 0,5 s:n askelin paikallaan tai lähimmässä piilossa, hiipien (tarjotin tai
// naamio: myös kävellen) ja tarvittaessa heittoa tai patapinon kaatoa; valitsee nopeimman turvallisen (kukaan ei epäile: mittari
// < 0,15, ei epäilyä eikä hälytystä, ei tutkimista pelaajan luota paitsi kulkuluvalla) ja palaa taaksepäin, jos seuraava ei onnistu.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class ThiefAjuri
    {
        const double Dt = Huonesimulaatio.Dt, MaxOdotus = 42, LaajaOdotus = 75, OdotusAskel = 0.5, Jalkeen = 0.5, PiiloSade = 5, PukeutuminenS = 2;
        static int loppuK;
        // Rauhallinen ylitys (PT 10.10. 10.1x, v46z): pisteestä 69 lähdetään vasta, kun kukaan ei epäile (Huonesimulaatio.Vaara), ja ylitys
        // keskeytyy, jos joku alkaa epäillä. Syy: v46z:n kappeli-kavely alkaa y 8,6:sta (v46w 8,2), joten portaat-vartija tulee portailta
        // pelaajan osaan kirkkotorni-portaat jo y 8,5:ssä, näkee pisteessä 69 odottavan pelaajan ja etsii; vaaran aikana osarajan ylitys 69 → 70
        // ei tee tarkistuspistettä (peli toimii oikein), jolloin kiinni 70 palaisi Tott-kammioon eikä komeroon. Joukossa kohdeindeksit: 69 = reitti:pelaaja-70.
        // v47a (palatsi-viipale pois) ei poista tarvetta: ilman ylitystä kiinni 70 → tarkistuspiste 5,0 m komerosta (Siirtoseppä 10.10.).
        static readonly HashSet<int> RauhallinenYlitys = new HashSet<int> { 69 };

        sealed class Suunnitelma { public KavelyMerkki Piilo, Esine; public (double X, double Y, double Z) Kohde; public double Odotus; public bool Hiipii; public Huonesimulaatio Tulos; public double Aika; }

        public static bool Turvallinen(Huonesimulaatio w, int kiinni0)
        {
            if (w.Kiinni != kiinni0) return false;
            foreach (var h in w.Hahmot)
            {
                if (!h.Aktiivinen) continue;
                if (h.Aivot.Mittari >= 0.15 || h.Aivot.Tila == VartijanTila.Epaily || h.Aivot.Tila == VartijanTila.Halytys) return false;
                // Tutkii tai etsii pelaajan luota (askeleet, herännyt torkkuja); harhautuksen kolahdus muualla on sallittu.
                // Tarjotin kädessä kävelevää kulkuluvan hahmo ei näe, vaikka tulisi askelten luo (Vartija.NakoVoima), joten se sallitaan.
                bool lupa = !w.Hiipii && h.Aivot.Profiili != VartijaProfiili.Torkku   // herännyt torkkuja ei ota eväitä
                    && (w.Tarjotin && h.Aivot.Profiili.TarjotinLupa || w.Naamio && h.Aivot.Profiili.NaamioLupa && !h.Aivot.Tunnisti && h.MerkkiOsa != Huonesimulaatio.NaamioEiKelpaaOsa);
                if (!lupa && (h.Aivot.Tila == VartijanTila.Etsinta || h.Aivot.Tila == VartijanTila.Etsii) && Huonesimulaatio.Etaisyys2(h.Aivot.EpailyX, h.Aivot.EpailyZ, w.PX, w.PZ) < 3 && Math.Abs(h.Y - w.PY) < 4) return false;
            }
            return true;
        }

        /// <summary>Liikkuu kohteeseen; tarkka = keskeytä heti, jos joku epäilee.</summary>
        static bool Kulje(Huonesimulaatio w, (double X, double Y, double Z) q, bool hiipii, bool tarkka, int kiinni0, bool rauha = false)
        {
            if (rauha && w.Vaara()) return false;
            for (int i = 0; i < 6000; i++) { if (w.Askel(q, hiipii)) return true; if (tarkka && !Turvallinen(w, kiinni0) || rauha && w.Vaara()) return false; }
            return false;
        }

        static bool OdotaS(Huonesimulaatio w, double s, bool hiipii, bool tarkka, int kiinni0)
        {
            for (double t = 0; t < s - 1e-9; t += Dt) { w.Odota(hiipii); if (tarkka && !Turvallinen(w, kiinni0)) return false; }
            return true;
        }

        /// <summary>Kaikki turvalliset tavat päästä reittipisteeseen k: ensimmäinen turvallinen odotus kullekin piilo × tapa × harhautus.</summary>
        static List<Suunnitelma> Ehdokkaat(Huonesimulaatio w, int k, bool laaja = false)
        {
            double maxOdotus = laaja ? LaajaOdotus : MaxOdotus;
            var q = Huonesimulaatio.Reitti[k]; var ulos = new List<Suunnitelma>(); int k0 = w.Kiinni; bool rauha = RauhallinenYlitys.Contains(k);
            var piilot = new List<KavelyMerkki> { null };
            foreach (var m in Huonesimulaatio.Data.Lajia("piilo"))
                if (m.Y > Math.Min(w.PY, q.Y) - 1.5 && m.Y < Math.Max(w.PY, q.Y) + 1.5 && (Huonesimulaatio.Etaisyys2(m.X, m.Z, w.PX, w.PZ) < PiiloSade || Huonesimulaatio.Etaisyys2(m.X, m.Z, q.X, q.Z) < PiiloSade)) piilot.Add(m);
            // Laaja haku (vain jos tavallinen ei löydä): perääntyminen odottamaan, esim. valppaus pois kiinnijäännin jälkeen; kaksi edellistä
            // reittipistettä samalla tasolla ja odotus 75 s:iin enintään 6 s:n välein (kiinni 68: torkkuja ja portaat-vartija valppaina 60 s, piste 67
            // aukeaa vasta valppauden jälkeen, paluu-63:ssa 75 s; Siirtoseppä 10.10.).
            for (int j = k - 2; laaja && j >= Math.Max(0, k - 3); j--)
            {
                var e = Huonesimulaatio.Reitti[j];
                if (Math.Abs(e.Y - w.PY) < 1.5) piilot.Add(new KavelyMerkki { Nimi = "paluu:" + (j + 1), Laji = "paluu", Tunnus = "paluu-" + (j + 1), X = e.X, Y = e.Y, Z = e.Z });
            }
            var esineet = new List<(KavelyMerkki E, (double, double, double) Kohde)> { (null, default) };
            foreach (var e in w.Ulottuvilla())
            {
                if (e.Kaadettava) { esineet.Add((e, (e.X, e.Y, e.Z))); continue; }
                // Heitto 3–9 m: kohteiksi saman osan merkit (esineet, partiopisteet, piilot), kaukaisin pelaajan seuraavasta pisteestä ensin.
                string osa = Askelaani.Osa(Huonesimulaatio.Data, w.PX, w.PY, w.PZ); var kohteet = new List<KavelyMerkki>();
                foreach (var m in Huonesimulaatio.Data.Merkit)
                {
                    double d = Huonesimulaatio.Etaisyys2(m.X, m.Z, w.PX, w.PZ);
                    if ((m.Laji == "esine" || m.Laji == "partio" || m.Laji == "piilo") && d >= 3 && d <= 9 && Askelaani.Osa(Huonesimulaatio.Data, m.X, m.Y, m.Z) == osa) kohteet.Add(m);
                }
                kohteet.Sort((a, b) => Huonesimulaatio.Etaisyys2(b.X, b.Z, q.X, q.Z).CompareTo(Huonesimulaatio.Etaisyys2(a.X, a.Z, q.X, q.Z)));
                for (int i = 0; i < kohteet.Count && i < 2; i++) esineet.Add((e, (kohteet[i].X, kohteet[i].Y, kohteet[i].Z)));
            }
            var tavat = w.Tarjotin || w.Naamio ? new[] { false, true } : new[] { true };
            // Tarjotin torkkuvalle: pisteessä, jonka vieressä torkkuja istuu, eväät on annettava (muuten tarjotin jää käteen).
            bool anna = false;
            foreach (var h in w.Hahmot) if (w.Tarjotin && h.Aivot.Profiili == VartijaProfiili.Torkku && Huonesimulaatio.Etaisyys3(h.X, h.Y, h.Z, q.X, q.Y, q.Z) < Huonesimulaatio.AnnaM + 0.5) anna = true;
            foreach (var (esine, kohde) in esineet)
            {
                foreach (var piilo in piilot)
                    foreach (bool hiipii in tavat)
                    {
                        var pohja = w.Kopioi();
                        if (esine != null) pohja.Kayta(esine, kohde);
                        if (piilo != null && !Kulje(pohja, (piilo.X, piilo.Y, piilo.Z), true, true, k0)) continue;
                        bool odottaaHiipien = hiipii || piilo != null;
                        double viime = double.NegativeInfinity; int loydetty = 0;
                        for (double odotus = 0; odotus <= maxOdotus && loydetty < 10; odotus += OdotusAskel)
                        {
                            if (odotus - viime < (laaja ? Math.Min(viime * 0.5 + 1.5, 6) : 1.5)) { if (!OdotaS(pohja, OdotusAskel, odottaaHiipien, true, k0)) break; continue; }
                            var koe = pohja.Kopioi(); koe.Seuraava = k;
                            if (Kulje(koe, q, hiipii, true, k0, rauha))
                            {
                                bool naamio = koe.Naamio; koe.Toiminnot();
                                bool puki = koe.Naamio && !naamio;   // pukeutuminen 2 s seisten (pelattavuusmalli 8.2 huone 6)
                                if ((!anna || koe.Annettu) && OdotaS(koe, puki ? PukeutuminenS : Jalkeen, hiipii && !puki, true, k0))
                                {
                                    koe.Seuraava = k + 1;
                                    ulos.Add(new Suunnitelma { Piilo = piilo, Esine = esine, Kohde = kohde, Odotus = odotus, Hiipii = hiipii, Tulos = koe, Aika = koe.T });
                                    viime = odotus; loydetty++;
                                }
                            }
                            if (!OdotaS(pohja, OdotusAskel, odottaaHiipien, true, k0)) break;
                        }
                    }
                if (ulos.Count > 0) break;   // harhautus vain, jos ilman sitä ei mene
            }
            ulos.Sort((a, b) => a.Aika.CompareTo(b.Aika));
            return ulos;
        }

        static string Kuvaus(Suunnitelma s, int k) =>
            $"→{k + 1}" + (s.Esine != null ? $" {(s.Esine.Kaadettava ? "kaada" : "heitä")} {s.Esine.Tunnus}" : "") + (s.Piilo != null ? $" piilo {s.Piilo.Tunnus}" : "")
            + (s.Odotus > 0 ? $" odota {s.Odotus:F1} s" : "") + (s.Hiipii ? "" : " kävellen");

        static readonly HashSet<(int, int)> kayty = new HashSet<(int, int)>();
        static Huonesimulaatio Ratkaise(Huonesimulaatio w, int k, List<string> loki, List<Huonesimulaatio> tilat, ref int budjetti, ref (int K, Huonesimulaatio W) pisin)
        {
            if (k > loppuK) return w;
            if (k > pisin.K) pisin = (k, w);
            if (!kayty.Add((k, (int)Math.Round(w.T * 2)))) return null;   // sama piste samaan aikaan (0,5 s) jo kokeiltu
            // Ensin tavallinen haku; jos mikään ehdokas ei vie loppuun, laaja (pitkä odotus, perääntyminen).
            foreach (bool laaja in new[] { false, true })
            {
                var ehdokkaat = Ehdokkaat(w, k, laaja);
                for (int i = 0; i < ehdokkaat.Count && i < 10 && budjetti > 0; i++)
                {
                    budjetti--;
                    var r = Ratkaise(ehdokkaat[i].Tulos, k + 1, loki, tilat, ref budjetti, ref pisin);
                    if (r != null) { loki.Insert(0, Kuvaus(ehdokkaat[i], k)); tilat.Insert(0, ehdokkaat[i].Tulos); return r; }
                }
            }
            return null;
        }

        /// <summary>Sujuva aika reittipisteiden alku…loppu (0-pohjaiset) välillä vaakamatkana annetulla nopeudella.</summary>
        public static double Sujuva(int alku, int loppu, double nopeus)
        {
            var r = Huonesimulaatio.Reitti; double s = 0;
            for (int i = alku + 1; i <= loppu; i++) s += Huonesimulaatio.Etaisyys2(r[i].X, r[i].Z, r[i - 1].X, r[i - 1].Z);
            return s / nopeus;
        }

        public static void Tulosta(Huonesimulaatio w)
        {
            Console.WriteLine($"      pelaaja ({w.PX:F1}, {w.PY:F1}, {w.PZ:F1}) seuraava {w.Seuraava + 1}, valoisuus {w.Valoisuus():F2}, t {w.T:F0} s");
            foreach (var h in w.Hahmot) if (h.Aktiivinen) Console.WriteLine($"        {h.Nimi} ({h.X:F1}, {h.Y:F1}, {h.Z:F1}) {h.Aivot.Tila} mittari {h.Aivot.Mittari:F2} yaw {h.Aivot.Yaw:F0} epäily ({h.Aivot.EpailyX:F1}, {h.Aivot.EpailyZ:F1}) valpas {h.Aivot.Valppaus:F0}{(h.Aivot.Torkkuu ? " torkkuu" : "")}{(h.Aivot.Syo ? " syö" : "")}");
        }

        /// <summary>Loppu = tila viimeisessä pisteessä (null = jumi); Tilat[j] = tila pisteessä seuraava + j saapumisen jälkeen.</summary>
        public sealed class Tulos { public Huonesimulaatio Loppu; public List<string> Loki = new List<string>(); public List<Huonesimulaatio> Tilat = new List<Huonesimulaatio>(); public int Pisin; public Huonesimulaatio PisinTila; }

        /// <summary>Ajaa reittipisteet seuraava…loppu (0-pohjaiset, mukaan lukien) Thief-ajurilla; Loppu = null, jos jumi (Pisin, PisinTila).</summary>
        /// <summary>
        /// Kävelyhuoneiden rajat (pelattavuusmalli kohta 8, 0-pohjaiset reitti:pelaaja-indeksit; Linssiseppä 8.10.: rajapisteet turvallisia,
        /// ei pelaaja-9:n pikkupihalla vaan keittiö 8–12). Huone alkaa edellisen loppupisteestä. Huoneet 1 (vene), 5 (kappelin arvoitus,
        /// KappelinArvoitusTestit) ja 9–10 (komero, pako: Komero/Pako-ytimet) eivät ole reittikävelyä; huone 8 = harjan kävely
        /// kiipeilyn alkuun (kiipeily: Kiipeily-ydin).
        /// </summary>
        public static readonly IReadOnlyDictionary<int, (int Alku, int Loppu)> Huoneet = new Dictionary<int, (int, int)>
        {
            [2] = (0, 7),     // laituri → porttikäytävän yläpää (pelaaja-1 → -8)
            [3] = (7, 11),    // pikkupiha ja keittiö: tarjotin (-8 → -12)
            [4] = (11, 19),   // Kirkkotorni ja portaat (-12 → -20)
            [6] = (20, 63),   // kaari-ovi → Linnantupa ja voudin sali → Tott-kammion eteläovi (-21 → -64)
            [7] = (63, 87),   // muuriportaat, ampuma- ja muurikäytävä → harja tikkaiden yläpäässä (-64 → -88)
            [8] = (87, 91),   // harja: köysikieppi, sakara, kiipeilyn alku (-88 → -92)
        };

        /// <summary>Yhteinen läpipeluurajapinta (Linssiseppä 8.10.): ajaa huoneen tilasta w sen loppupisteeseen. w:n on oltava huoneessa:
        /// seuraava kohde on w.Seuraava, jos se on huoneen sisällä, muuten huoneen ensimmäinen piste alun jälkeen.</summary>
        public static Tulos AjaHuone(Huonesimulaatio w, int huone, int budjetti = 600)
        {
            if (!Huoneet.TryGetValue(huone, out var r))
                throw new ArgumentOutOfRangeException(nameof(huone), huone, "ei kävelyhuone (1 vene, 5 kappelin arvoitus, 9 komero, 10 pako: ytimien omat testit)");
            int seuraava = w.Seuraava > r.Alku && w.Seuraava <= r.Loppu ? w.Seuraava : r.Alku + 1;
            return Aja(w, seuraava, r.Loppu, budjetti);
        }

        public static Tulos Aja(Huonesimulaatio w, int seuraava, int loppu, int budjetti = 400)
        {
            loppuK = loppu; kayty.Clear(); var t = new Tulos(); (int K, Huonesimulaatio W) pisin = (seuraava, w);
            t.Loppu = Ratkaise(w, seuraava, t.Loki, t.Tilat, ref budjetti, ref pisin);
            t.Pisin = pisin.K; t.PisinTila = pisin.W;
            return t;
        }
    }
}
