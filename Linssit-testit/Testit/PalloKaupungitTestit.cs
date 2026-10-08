// PALLOKIERROS KAIKISSA 37 OPPAAN KAUPUNGISSA (Päätoimittaja 8.10. ilta, juna 168; omistaja on testannut vasta Pariisia): LS2:n
// PalloKierrosTestit-tarkistukset datavetoisesti Ydin-tasolla (OpasSilmukka pallotilassa, ei simulaattoria). Data kultaiset/
// opas-kierrokset-20261008.json: järjestys workerin /opas/liiku "kierros" (#4196), paikat liiku-kohteista, koko_m / korkeus_m / luokka
// esittelystä, kerronnan kesto lyhyen tekstin pituudesta (14 merkkiä/s, vähintään 15 s), keskipiste OPAS_SALLITUT. Kaksi verkkoa kuten
// Pariisissa: Nopea ja Hidas (laatat 95 %, kohde valmis 2,5 s lennon jälkeen). Tarkistukset kaupungeittain (pahin kahdesta verkosta):
//   taaksepäin (m, osuuden suunnassa) ≤ 1 · seisahdus (s, seuraava tiedossa, < 0,2 m/s, ei leijuntaa kaaren päässä) ≤ 3 · kehys pysähdyksellä ≤ 1,05 × saapuminen
//   · sauman nopeushyppy ≤ 0,1 m/s ja kiihtyvyyshyppy ≤ 1 m/s² · nykäys pysähdyksellä ≤ lipuminen + 1 m/s · kääntö ≤ PalloKaantoAstS
//   · kokonaiskierto (°, kameran suuntiman muutokset yhteensä) raportoidaan. Siirto-osuudet (≥ SiirtoRajaM, tumma ruutu) ohitetaan.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class PalloKaupungitTestit
    {
        const double Dt = 1 / 30.0, VastausS = 2, HidasLatausaste = 0.95, HidasSaapumisLaatatS = 2.5;
        const string Tiedosto = "opas-kierrokset-20261008.json";

        public sealed class Kaupunki { public string Id, Nimi; public double Lat, Lon; public OpasKohde[] Kohteet; }
        struct Ruutu { public double T, E, N, U, EtM, Suunta; public OpasVaihe Vaihe; public int Kohde; public bool Leijuu; }

        public static List<Kaupunki> Lue()
        {
            var juuri = (Dictionary<string, object>)MiniJson.Jasenna(File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", Tiedosto)));
            double D(Dictionary<string, object> o, string n) => o.TryGetValue(n, out var x) && x != null ? Convert.ToDouble(x, System.Globalization.CultureInfo.InvariantCulture) : 0;
            var l = new List<Kaupunki>();
            foreach (Dictionary<string, object> k in MiniJson.TaulukkoTaiTyhja(juuri["kaupungit"]))
            {
                var kohteet = new List<OpasKohde>();
                foreach (Dictionary<string, object> q in MiniJson.TaulukkoTaiTyhja(k["kohteet"]))
                    kohteet.Add(new OpasKohde { Id = (string)q["id"], Nimi = (string)q["nimi"], Lat = D(q, "lat"), Lon = D(q, "lon"), KokoM = D(q, "koko_m"),
                        KorkeusM = D(q, "korkeus_m"), Luokka = q.TryGetValue("luokka", out var lu) ? lu as string : null, KestoS = D(q, "kesto_s") });
                l.Add(new Kaupunki { Id = (string)k["id"], Nimi = (string)k["kaupunki"], Lat = D(k, "lat"), Lon = D(k, "lon"), Kohteet = kohteet.ToArray() });
            }
            return l;
        }

        static OpasKohde Kopio(OpasKohde k) => new OpasKohde { Id = k.Id, Nimi = k.Nimi, Lat = k.Lat, Lon = k.Lon, KokoM = k.KokoM, KorkeusM = k.KorkeusM, Luokka = k.Luokka, KestoS = k.KestoS, Kierros = true };

        static List<Ruutu> Aja(Kaupunki c, bool hidas)
        {
            bool vanha = OpasSilmukka.PalloLento; OpasSilmukka.PalloLento = true;
            try
            {
                var s = new OpasSilmukka(OpasSilmukka.Avauskuva(c.Lat, c.Lon));
                var vastaukset = new List<(double t, int n, string toive)>(); var hiljaa = new List<double>();
                double t = 0, lentoAlkoi = double.NaN;
                s.Pyyda += (n, toive) => vastaukset.Add((t + VastausS, n, toive));
                s.AlkaaPuhua += k => hiljaa.Add(t + k.KestoS);
                s.LentoAlkaa += (k, m, _) => lentoAlkoi = t;
                Func<bool> laatat = null;
                if (hidas) { s.LatausEdistys = () => HidasLatausaste; laatat = () => double.IsNaN(lentoAlkoi) || t - lentoAlkoi >= s.LentoKestoS + HidasSaapumisLaatatS; }
                s.Aloita(c.Nimi);
                s.AloitaKierros(c.Kohteet.Select(k => (k.Nimi, k.Lat, k.Lon)).ToList());
                var r = new List<Ruutu>();
                for (int i = 0; i < 60 * 30 * 20; i++)
                {
                    t += Dt;
                    for (int j = vastaukset.Count - 1; j >= 0; j--)
                    {
                        if (vastaukset[j].t > t) continue;
                        var v = vastaukset[j]; vastaukset.RemoveAt(j);
                        var k = Array.Find(c.Kohteet, x => x.Nimi == v.toive);
                        if (k != null) s.Vastaus(v.n, Kopio(k));
                    }
                    for (int j = hiljaa.Count - 1; j >= 0; j--) if (hiljaa[j] <= t) { hiljaa.RemoveAt(j); s.AaniLoppui(); }
                    s.Paivita(Dt, _ => 35, laatat);
                    var e = OpasKuvaus.KameraPaikka(s.Asento, c.Lat, c.Lon);
                    int kohde = s.Nykyinen == null ? -1 : Array.FindIndex(c.Kohteet, k => k.Id == s.Nykyinen.Id);
                    r.Add(new Ruutu { T = t, E = e.e, N = e.n, U = e.u, EtM = s.Asento.EtaisyysM, Suunta = s.Asento.Suuntima, Vaihe = s.Vaihe, Kohde = kohde, Leijuu = s.Leijuu });
                    if (kohde == c.Kohteet.Length - 1 && hiljaa.Count == 0 && s.Vaihe != OpasVaihe.Puhuu && !s.KierrosKaynnissa) break;
                }
                return r;
            }
            finally { OpasSilmukka.PalloLento = vanha; }
        }

        static bool Pysahdyksella(OpasVaihe v) => v == OpasVaihe.Puhuu || v == OpasVaihe.Odottaa;
        static (double e, double n) Enu(Kaupunki c, OpasKohde k) =>
            ((k.Lon - c.Lon) * 6371000 * Math.Cos(c.Lat * Math.PI / 180) * Math.PI / 180, (k.Lat - c.Lat) * 6371000 * Math.PI / 180);
        static (double, double, double) V(List<Ruutu> r, int k) => ((r[k].E - r[k - 1].E) / Dt, (r[k].N - r[k - 1].N) / Dt, (r[k].U - r[k - 1].U) / Dt);
        static double Pit((double a, double b, double c) v) => Math.Sqrt(v.a * v.a + v.b * v.b + v.c * v.c);
        static (double, double, double) Ero((double a, double b, double c) x, (double a, double b, double c) y) => (x.a - y.a, x.b - y.b, x.c - y.c);

        public sealed class Tulos
        {
            public string Kaupunki; public int Kohteita, Perilla; public double Taaksepain, Seisahdus, Kehys, SaumaDv, SaumaDa, Nykays, Kaanto, Kierto; public string KaantoKohta, TaakseKohta, SeisKohta;
            public List<string> Viat = new List<string>();
        }

        /// <summary>Pahin kahdesta verkosta.</summary>
        public static Tulos Mittaa(Kaupunki c)
        {
            var t = new Tulos { Kaupunki = c.Nimi, Kohteita = c.Kohteet.Length, Perilla = int.MaxValue };
            foreach (bool hidas in new[] { false, true })
            {
                var r = Aja(c, hidas); string vk = hidas ? "Hidas" : "Nopea";
                int perilla = 0;
                for (int i = 0; i < c.Kohteet.Length; i++) if (r.Exists(x => x.Kohde == i && Pysahdyksella(x.Vaihe))) perilla++;
                t.Perilla = Math.Min(t.Perilla, perilla);
                // Osuudet i → i+1 (ensimmäisestä perilläolosta seuraavan perilläoloon), ei siirtoja.
                for (int i = 0; i + 1 < c.Kohteet.Length; i++)
                {
                    int a = r.FindIndex(x => x.Kohde == i && Pysahdyksella(x.Vaihe)), b = r.FindIndex(x => x.Kohde == i + 1 && Pysahdyksella(x.Vaihe));
                    if (a < 0 || b < 0) continue;
                    if (KierrosLento.EtaisyysM(c.Kohteet[i].Lat, c.Kohteet[i].Lon, c.Kohteet[i + 1].Lat, c.Kohteet[i + 1].Lon) >= OpasSilmukka.SiirtoRajaM) continue;
                    var (pe, pn) = Enu(c, c.Kohteet[i]); var (qe, qn) = Enu(c, c.Kohteet[i + 1]);
                    double ue = qe - pe, un = qn - pn, l = Math.Max(1, Math.Sqrt(ue * ue + un * un)); ue /= l; un /= l;
                    double paras = double.MinValue, pahin = 0, seis = 0, pisin = 0; int pahinK = a, pisinK = a;
                    for (int k = a; k <= b; k++)
                    {
                        double ete = (r[k].E - pe) * ue + (r[k].N - pn) * un;
                        paras = Math.Max(paras, ete); if (paras - ete > pahin) { pahin = paras - ete; pahinK = k; }
                        if (k > a) { double v = Math.Sqrt(Math.Pow((r[k].E - r[k - 1].E) / Dt, 2) + Math.Pow((r[k].N - r[k - 1].N) / Dt, 2)); seis = v < 0.2 && !r[k].Leijuu ? seis + Dt : 0; if (seis > pisin) { pisin = seis; pisinK = k; } }   // leijunta kaaren päässä sallittu (omistaja 18.4x)
                    }
                    double Kulma(int k) { var (ce, cn) = (r[k].E - pe, r[k].N - pn); double a1 = Math.Atan2(cn, ce), a2 = Math.Atan2(qn - pn, qe - pe); double d = Math.Abs(a1 - a2) % (2 * Math.PI); return Math.Min(d, 2 * Math.PI - d) * 180 / Math.PI; }
                    if (pahin > t.Taaksepain) { t.Taaksepain = pahin; t.TaakseKohta = $"{vk} {c.Kohteet[i].Nimi}→{c.Kohteet[i + 1].Nimi} {r[pahinK].Vaihe} {r[pahinK].T:F0} s"; }
                    if (pisin > t.Seisahdus) { t.Seisahdus = pisin; t.SeisKohta = $"{vk} {c.Kohteet[i].Nimi}→{c.Kohteet[i + 1].Nimi} {r[pisinK].Vaihe} kulma {Kulma(pisinK):F0}°"; }
                    if (pahin > 1) t.Viat.Add($"{vk} {c.Kohteet[i].Nimi} → {c.Kohteet[i + 1].Nimi} taaksepäin {pahin:F1} m (et {r[pahinK].EtM:F0} m, {100 * pahin / r[pahinK].EtM:F1} %, silmä alussa {((r[a].E - pe) * ue + (r[a].N - pn) * un):F0} m / väli {l:F0} m)");
                    if (pisin > 3) t.Viat.Add($"{vk} {c.Kohteet[i].Nimi} → {c.Kohteet[i + 1].Nimi} seisoo {pisin:F1} s");
                }
                // Kehys ja nykäys pysähdyksellä.
                for (int i = 0; i < c.Kohteet.Length; i++)
                {
                    double alku = -1, maks = 0, nyk = 0;
                    for (int k = 1; k < r.Count; k++)
                    {
                        if (r[k].Kohde != i || !Pysahdyksella(r[k].Vaihe)) continue;
                        if (alku < 0) alku = r[k].EtM;
                        maks = Math.Max(maks, r[k].EtM);
                        if (Pysahdyksella(r[k - 1].Vaihe) && r[k - 1].Kohde == i) nyk = Math.Max(nyk, Pit(V(r, k)));
                    }
                    if (alku > 0 && maks / alku > t.Kehys) t.Kehys = maks / alku;
                    if (alku > 0 && maks > 1.05 * alku + 1) t.Viat.Add($"{vk} {c.Kohteet[i].Nimi} kehys {alku:F0} → {maks:F0} m");
                    if (nyk > t.Nykays) t.Nykays = nyk;
                    if (nyk > OpasKuvaus.LipumisNopeus + 1) t.Viat.Add($"{vk} {c.Kohteet[i].Nimi} nykäys {nyk:F1} m/s");
                }
                // Saumat (Lentaa ↔ pysähdys), ei siirtoja (kamera hyppää tumman ruudun alla).
                for (int k = 3; k + 2 < r.Count; k++)
                {
                    bool nyt = r[k].Vaihe == OpasVaihe.Lentaa, ennen = r[k - 1].Vaihe == OpasVaihe.Lentaa;
                    if (nyt == ennen || r[k - 1].Kohde < 0) continue;
                    if (Pit(V(r, k)) > 2000 || Pit(V(r, k + 1)) > 2000) continue;   // siirto
                    double dv = 0;
                    for (int j = k - 1; j <= k + 1; j++) dv = Math.Max(dv, Pit(Ero(V(r, j + 1), V(r, j))));
                    double da = Pit(Ero(Ero(V(r, k + 2), V(r, k + 1)), Ero(V(r, k - 1), V(r, k - 2)))) / Dt;
                    t.SaumaDv = Math.Max(t.SaumaDv, dv); t.SaumaDa = Math.Max(t.SaumaDa, da);
                    if (dv > 0.1 || da > 1) t.Viat.Add($"{vk} {r[k].T:F1} s {(nyt ? "lähtö" : "lasku")} Δv {dv:F2} m/s Δa {da:F2} m/s²");
                }
                // Kääntö ja kokonaiskierto (ei siirtojen hyppyjä).
                double kierto = 0;
                for (int k = 1; k < r.Count; k++)
                {
                    double ds = Math.Abs(KierrosLento.Kiedo(r[k].Suunta - r[k - 1].Suunta));
                    if (Pit(V(r, k)) > 2000) continue;
                    kierto += ds; double w = ds / Dt;
                    if (r[k].Kohde >= 0 && w > t.Kaanto) { t.Kaanto = w; t.KaantoKohta = $"{vk} {r[k].Vaihe} {(r[k].Kohde >= 0 ? c.Kohteet[r[k].Kohde].Nimi : "-")} {r[k].T:F0} s"; }
                }
                t.Kierto = Math.Max(t.Kierto, kierto);
            }
            if (t.Kaanto > OpasSilmukka.PalloKaantoAstS + 0.2) t.Viat.Add($"kääntö {t.Kaanto:F1} °/s");
            if (t.Perilla < c.Kohteet.Length) t.Viat.Add($"perillä {t.Perilla}/{c.Kohteet.Length}");
            return t;
        }

        [Testi] static void PallokierrosKaikissaKaupungeissa()
        {
            var tulokset = Lue().Select(Mittaa).ToList();
            Console.WriteLine("      | Kaupunki | kohteita | taaksepäin m | seisahdus s | kehys × | sauma Δv m/s | Δa m/s² | nykäys m/s | kääntö °/s | kierto ° | viat |");
            foreach (var t in tulokset)
                Console.WriteLine($"      | {t.Kaupunki} | {t.Perilla}/{t.Kohteita} | {t.Taaksepain:F1} | {t.Seisahdus:F1} | {t.Kehys:F2} | {t.SaumaDv:F2} | {t.SaumaDa:F2} | {t.Nykays:F1} | {t.Kaanto:F1} | {t.Kierto:F0} | {t.Viat.Count} |");
            var viat = tulokset.Where(t => t.Viat.Count > 0).Select(t => $"{t.Kaupunki}: {string.Join(", ", t.Viat.Take(4))}{(t.Viat.Count > 4 ? $" (+{t.Viat.Count - 4})" : "")}").ToList();
            foreach (var v in viat) Console.WriteLine("      VIKA " + v);
            Oleta.Sama(37, tulokset.Count, "kaupunkeja");
            Oleta.Tosi(viat.Count == 0, $"{viat.Count} kaupungissa vikoja");
        }
    }
}
