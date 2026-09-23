// VESISTÖ PALLOLLE (web js/linssit/vesistot.js vesistotPallolle, katkaiseSauma,
// tihennaKaarella, pisteetAsteina) — koko muunnos yhtenä puhtaana funktiona.
//
// Laudan (x, y) → asteet Kameramatikka.LaudaltaAsteiksi-kaavalla (web
// fokusmitat.laudaltaAsteiksi('maailmankartta')). Tulos:
//   Jarvet — renkaat suljettuina, sauman ylittävä rengas hylätään kuten webissä,
//            ja kolmioverkko valmiina (Jarvikolmiot);
//   Penkat — luokat 1–2 (tumma reuna uoman alla), piirretään ensin;
//   Uomat  — kaikki joet luokan värillä ja paksuudella;
//   Nimet  — tärkeysluokat 1–2 pituusjärjestyksessä, katto 20.
//
// Paksuudet ovat ruutupisteitä (web PALLON_UOMA_PX, PALLON_PENGER_PX: Globe.gl
// pathStroke on CSS-pikseleitä), korkeudet pallon säteinä kuten webissä;
// Unity-kerros muuntaa ne metreiksi (Metreina).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Vesistot
{
    public enum VesiLaji { Penger, Uoma }

    /// <summary>Uoma tai penger pallolla (web polut-datumi).</summary>
    public sealed class Vesipolku
    {
        public string Avain, Nimi;
        public VesiLaji Laji;
        /// <summary>Joen tärkeysluokka (myös penkereellä, jotta kerros voi ryhmitellä).</summary>
        public int Tarkeys;
        public List<LatLon> Pisteet;
        public string Vari;
        /// <summary>Paksuus ruutupisteinä.</summary>
        public double Paksuus;
        /// <summary>Korkeus pallon säteinä (web korkeus).</summary>
        public double Korkeus;
    }

    /// <summary>Järvi pallolla (web polygonit-datumi).</summary>
    public sealed class Jarvi
    {
        public string Avain, Nimi;
        /// <summary>Rengas suljettuna (ensimmäinen = viimeinen), (lat, lon).</summary>
        public List<LatLon> Rengas;
        public string Vari, Reuna;
        public double Korkeus;
        /// <summary>Täyttö kolmioina, pitkät sivut tihennettyinä (Jarvikolmiot.Verkko).</summary>
        public Jarvikolmiot.Verkko Verkko;
    }

    /// <summary>Joen nimi pallolla (web nimet-datumi).</summary>
    public sealed class Vesinimi
    {
        public string Avain, Teksti;
        public int Tarkeys;
        public double Lat, Lon;
    }

    public sealed class VesistotPallolla
    {
        public List<Jarvi> Jarvet = new List<Jarvi>();
        public List<Vesipolku> Penkat = new List<Vesipolku>();
        public List<Vesipolku> Uomat = new List<Vesipolku>();
        public List<Vesinimi> Nimet = new List<Vesinimi>();
        /// <summary>Penkereet ensin, uomat päälle (web polut).</summary>
        public IReadOnlyList<Vesipolku> Polut => Penkat.Concat(Uomat).ToList();
        /// <summary>Laskennan kesto millisekunteina (mittari; kolmiointi mukana).</summary>
        public double KestoMs;
    }

    public static class VesistotPallolle
    {
        // Web PALLON_UOMA_PX, PALLON_PENGER_PX (ruutupisteitä).
        public static readonly IReadOnlyDictionary<int, double> UomaPx = new Dictionary<int, double> { [1] = 3.6, [2] = 2.4, [3] = 1.6 };
        public static readonly IReadOnlyDictionary<int, double> PengerPx = new Dictionary<int, double> { [1] = 7, [2] = 5 };
        /// <summary>Järven reuna: Globe.gl polygonStroke on yhden pikselin viiva.</summary>
        public const double JarvenReunaPx = 1;

        /// <summary>Web JARVEN_KORKEUS, UOMAN_KORKEUS (pallon säteinä).</summary>
        public const double JarvenKorkeus = 0.003, UomanKorkeus = 0.004;
        /// <summary>Web TIHENNYS_AST: pisin väli asteina.</summary>
        public const double TihennysAst = 2;
        /// <summary>Web VESINIMET_PALLOLLA ja VESINIMIEN_KATTO.</summary>
        public const bool NimetPallolla = true;
        public const int NimienKatto = 20;

        /// <summary>Pallon säde metreinä (web pallon säde = 1 korkeusyksikkö).</summary>
        public const double MaanSade = 6_371_000;
        /// <summary>
        /// Vähimmäisnosto metreinä: Natiivisepän viivat ovat 5 km pinnan yllä, jotta
        /// maastolaatat (vuoret) eivät peitä niitä.
        /// </summary>
        public const double VahimmaisNosto = 5000;

        /// <summary>Webin korkeus (pallon säteinä) metreiksi, vähintään VahimmaisNosto.</summary>
        public static double Metreina(double sateina) => Math.Max(VahimmaisNosto, sateina * MaanSade);

        /// <summary>Oletusasteistus: maailmankartan Miller-lauta; null, jos piste ei ole äärellinen.</summary>
        public static LatLon? Asteet(double x, double y)
        {
            if (!IsFinite(x) || !IsFinite(y)) return null;
            var a = Kameramatikka.LaudaltaAsteiksi(x, y);
            return IsFinite(a.Lat) && IsFinite(a.Lon) ? a : (LatLon?)null;
        }

        static bool IsFinite(double d) => !double.IsNaN(d) && !double.IsInfinity(d);

        /// <summary>Web pisteetAsteina: projisoimaton piste jätetään pois, ei koko polkua.</summary>
        public static List<LatLon> PisteetAsteina(IEnumerable<(double X, double Y)> pisteet, Func<double, double, LatLon?> asteet)
        {
            var ulos = new List<LatLon>();
            foreach (var (x, y) in pisteet ?? Enumerable.Empty<(double, double)>())
            {
                if (!IsFinite(x) || !IsFinite(y)) continue;
                var a = asteet(x, y);
                if (a is LatLon p && IsFinite(p.Lat) && IsFinite(p.Lon)) ulos.Add(p);
            }
            return ulos;
        }

        /// <summary>
        /// KIERTÄVÄN LAUDAN SAUMA (web katkaiseSauma): polku paloiksi siitä, missä
        /// pituusaste hyppää yli 180°. Alle kahden pisteen palat jäävät pois.
        /// </summary>
        public static List<List<LatLon>> KatkaiseSauma(IReadOnlyList<LatLon> pisteet)
        {
            var palat = new List<List<LatLon>>();
            var pala = new List<LatLon>();
            foreach (var p in pisteet ?? Array.Empty<LatLon>())
            {
                if (pala.Count > 0 && Math.Abs(p.Lon - pala[pala.Count - 1].Lon) > 180)
                {
                    if (pala.Count >= 2) palat.Add(pala);
                    pala = new List<LatLon>();
                }
                pala.Add(p);
            }
            if (pala.Count >= 2) palat.Add(pala);
            return palat;
        }

        /// <summary>
        /// PITKÄT VÄLIT TIHENNETÄÄN ISOYMPYRÄLLÄ (web tihennaKaarella), jotta uoma
        /// kulkee pallon pintaa eikä oikaise jänteenä sen läpi.
        /// </summary>
        public static List<LatLon> TihennaKaarella(IReadOnlyList<LatLon> pisteet, double raja = TihennysAst)
        {
            if (pisteet == null) return new List<LatLon>();
            if (pisteet.Count < 2) return pisteet.ToList();
            var ulos = new List<LatLon> { pisteet[0] };
            for (int i = 1; i < pisteet.Count; i++)
            {
                var a = pisteet[i - 1];
                var b = pisteet[i];
                double kulma = Kameramatikka.KulmaAsteina(a, b);
                // Pyöristysvara: acos antaa tasan rajan mittaisesta välistä 2,0000001.
                int osia = (int)Math.Ceiling(kulma / raja - 1e-9);
                for (int k = 1; k < osia; k++) ulos.Add(Kameramatikka.IsoympyranPiste(a, b, (double)k / osia));
                ulos.Add(b);
            }
            return ulos;
        }

        /// <summary>Web vesistotPallolle. asteet = null → maailmankartan asteistus.</summary>
        public static VesistotPallolla Laske(VesistotAineisto aineisto, Func<double, double, LatLon?> asteet = null)
        {
            var kello = System.Diagnostics.Stopwatch.StartNew();
            asteet ??= Asteet;
            var t = new VesistotPallolla();
            if (aineisto == null) return t;

            // JÄRVET. Sauman ylittävällä renkaalla ei ole päätä, josta katkaista: se jää pois.
            for (int i = 0; i < aineisto.Jarvet.Count; i++)
            {
                var jarvi = aineisto.Jarvet[i];
                var rengas = PisteetAsteina(jarvi.Pisteet, asteet);
                if (rengas.Count < 4) continue;
                if (KatkaiseSauma(rengas).Count != 1) continue;
                var eka = rengas[0];
                var vika = rengas[rengas.Count - 1];
                if (eka.Lat != vika.Lat || eka.Lon != vika.Lon) rengas.Add(eka);
                t.Jarvet.Add(new Jarvi
                {
                    Avain = "jarvi:" + i,
                    Nimi = jarvi.Nimi ?? "",
                    Rengas = rengas,
                    Vari = VesistotAineisto.JarvenVesi,
                    Reuna = VesistotAineisto.Penger,
                    Korkeus = JarvenKorkeus,
                    Verkko = Jarvikolmiot.Laske(rengas),
                });
            }

            // JOET. Luokka nimipaketista joen nimellä (web Map: viimeinen avain voittaa).
            var tarkeys = new Dictionary<string, int?>();
            foreach (var j in aineisto.NimetytJoet) if (j.Avain != null) tarkeys[j.Avain] = j.Tarkeys;
            for (int i = 0; i < aineisto.Joet.Count; i++)
            {
                var joki = aineisto.Joet[i];
                var asteina = PisteetAsteina(joki.Pisteet, asteet);
                if (asteina.Count < 2) continue;
                int luokka = joki.Nimi != null && tarkeys.TryGetValue(joki.Nimi, out var l) && l.HasValue ? l.Value : 3;
                var palat = KatkaiseSauma(asteina);
                for (int k = 0; k < palat.Count; k++)
                {
                    var pisteet = TihennaKaarella(palat[k]);
                    string tunnus = palat.Count > 1 ? $"{i}/{k}" : $"{i}";
                    if (PengerPx.TryGetValue(luokka, out var penger) && penger != 0)
                        t.Penkat.Add(new Vesipolku
                        {
                            Avain = "penger:" + tunnus, Nimi = joki.Nimi ?? "", Laji = VesiLaji.Penger, Tarkeys = luokka,
                            Pisteet = pisteet, Vari = VesistotAineisto.Penger, Paksuus = penger, Korkeus = UomanKorkeus,
                        });
                    t.Uomat.Add(new Vesipolku
                    {
                        Avain = "uoma:" + tunnus, Nimi = joki.Nimi ?? "", Laji = VesiLaji.Uoma, Tarkeys = luokka,
                        Pisteet = pisteet,
                        Vari = VesistotAineisto.Uoma.TryGetValue(luokka, out var v) ? v : VesistotAineisto.Uoma[3],
                        Paksuus = UomaPx.TryGetValue(luokka, out var p) ? p : UomaPx[3],
                        Korkeus = UomanKorkeus,
                    });
                }
            }

            // NIMET. Ankkuri on uoman kiinteä keskikohta; luokat 1–2 pituusjärjestyksessä.
            var ehdokkaat = aineisto.NimetytJoet
                .Where(j => (j.Tarkeys ?? 3) <= 2 && j.Pisteet.Count >= 2)
                .OrderBy(j => j.Tarkeys.Value)
                .ThenByDescending(j => j.Pituus ?? 0);
            foreach (var joki in ehdokkaat)
            {
                if (t.Nimet.Count >= NimienKatto) break;
                var (x, y) = joki.Pisteet[joki.Pisteet.Count / 2];
                if (!(asteet(x, y) is LatLon a)) continue;
                t.Nimet.Add(new Vesinimi
                {
                    Avain = "vesinimi:" + joki.Avain,
                    Teksti = joki.Nimi ?? joki.Avain,
                    Tarkeys = joki.Tarkeys ?? 2,
                    Lat = a.Lat,
                    Lon = a.Lon,
                });
            }
            t.KestoMs = kello.Elapsed.TotalMilliseconds;
            return t;
        }
    }
}
