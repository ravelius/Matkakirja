// PALLO EI PYSÄHDY KOHTEESSA (omistaja 10.10., juna 180: "kun tullaan kohteeseen, esim riemukaarelle, kuumailmapallo pysähtyy aivan
// liikaa. liike saisi hidastua pikkuhiljaa saavuttaessa kohteeseen ja kertoja voisi aloittaa jo hieman ennen kuin ollaan saavuttu
// kohteeseen täysin ja kuumailmapallon pitää jäädä selvästi liikkeeseen kiertämään kohdetta ja samalla joko lähentyä tai siirtyä
// poispäin kohteen kehältä … riemukaari muuten kuvataan hieman liian läheltä ja concorden aukio ehkä liian kaukaa"; Päätoimittajan
// linjaus kaikille pallon pysähdyksille, OpasSilmukka.KiertoSuunnitelma). Pariisin kierros OpasSilmukassa pallotilassa, ruutu 1/30 s,
// silmä Pariisin ENU:ssa. Mitataan:
//  (a) silmän nopeus ei laske alle KiertoMinOsuus × kierron nopeus (LipumisVauhti) saapumisen ympärillä (−6 … +3 s) eikä lähdössä
//      (−2 … +6 s); kierron nopeus saapuessa vähintään KiertoMinMS (liikkeessä; ristiriidassa — seuraava tulosuunnan takana —
//      saapuminen on hitaampi, OpasSilmukka.PalloKiertoRistiMS 0,5 m/s, ja kierto kiihtyy pysähdyksellä).
//  (b) kiihtyvyys ja nykäys 0,5 s:n liukuvasta keskiarvosta: saapumisen jarrutus (−6 … −1 s) enintään JarrutusMax / NykaysMax,
//      saapuminen kiertoon (−1 … +4 s) ja lähtö kierrosta (−1 … +1 s) enintään KiihtyvyysMax / NykaysMax (vrt. PalloAvausTestit
//      < 10 m/s² ja < 5 m/s³, LahtoLaatatTestit.LentoProfiili ruuduittain ≤ 85 m/s² ja ≤ 40 m/s³). Ennen 10.10. Louvren jarrutus
//      28,9 m/s² ja Champs-Élysées'n nykäys 15,9 m/s³ (lyhyt lento ilman kaarenpituusprofiilia, OpasKuvaus.PalloTasainenRajaM).
//  (c) pitkällä pysähdyksellä etäisyys pienenee alusta loppuun (ei kasva), ja lopussa kohde täyttää noin kolmanneksen kuvan
//      korkeudesta (Riemukaari 50 m, Concorden obeliski 23 m); Riemukaari alkaa kauempaa kuin ennen (101 m).
//  (d) kerronta alkaa viimeistään PalloPuheEnnenKiertoaS ennen kierron saavuttamista (saapuminen), mutta ei ennen lähdön
//      PalloPuheAlkuS:ää (EI TAUKOJA, omistaja 9.10.).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class PalloKiertoTestit
    {
        const double Dt = 1 / 30.0, VastausS = 2;
        public const double KiertoMinOsuus = 0.3, KiertoMinMS = 0.4, KiihtyvyysMax = 8, JarrutusMax = 30, NykaysMax = 10;

        public struct Ruutu { public double T, E, N, U, Et, Vauhti; public OpasVaihe Vaihe; public string Kohde; public bool Leijuu; }
        public sealed class Ajo
        {
            public List<Ruutu> R = new List<Ruutu>();
            public Dictionary<string, double> Puhe = new Dictionary<string, double>(), Saapui = new Dictionary<string, double>(), Lento = new Dictionary<string, double>();
        }

        // Pariisin kierros (PalloKierrosTestit, kerronnan kestot kierroksen lyhyistä teksteistä; Concorde aukiona obeliskin korkeudella).
        static readonly OpasKohde[] Pariisi =
        {
            new OpasKohde { Id = "notre-dame", Nimi = "Notre-Dame", Lat = 48.8530, Lon = 2.3499, KokoM = 130, KorkeusM = 69, KestoS = 25 },
            new OpasKohde { Id = "louvre", Nimi = "Louvre", Lat = 48.8606, Lon = 2.3376, KokoM = 400, KestoS = 30 },
            new OpasKohde { Id = "concorde", Nimi = "Place de la Concorde", Lat = 48.8656, Lon = 2.3212, KokoM = 360, KorkeusM = 23, Luokka = "aukio", YmparysM = 20, KestoS = 25 },
            new OpasKohde { Id = "champs", Nimi = "Champs-Élysées", Lat = 48.8698, Lon = 2.3076, KokoM = 1900, Luokka = "katu", KestoS = 22 },
            new OpasKohde { Id = "riemukaari", Nimi = "Riemukaari", Lat = 48.8738, Lon = 2.2950, KokoM = 50, KorkeusM = 50, YmparysM = 20, KestoS = 25 },
            new OpasKohde { Id = "eiffel", Nimi = "Eiffel-torni", Lat = 48.8584, Lon = 2.2945, KokoM = 125, KorkeusM = 330, KestoS = 25 },
        };

        static OpasKohde Kopio(OpasKohde k, double kesto) => new OpasKohde { Id = k.Id, Nimi = k.Nimi, Lat = k.Lat, Lon = k.Lon, KokoM = k.KokoM, KorkeusM = k.KorkeusM,
            Luokka = k.Luokka, YmparysM = k.YmparysM, KestoS = kesto, Kierros = true };

        /// <summary>Kierros reitillä; kesto(k) = kerronnan kesto (s), oletus kohteen KestoS; hidas = laatat 95 % (lähtö odottaa
        /// LahtoOdotusMaxS, kuten PalloKierrosTestit.Verkko.Hidas).</summary>
        public static Ajo Aja(OpasKohde[] reitti, Func<OpasKohde, double> kesto = null, bool hidas = false)
        {
            bool vanha = OpasSilmukka.PalloLento; OpasSilmukka.PalloLento = true;
            try
            {
                double lat0 = reitti[0].Lat, lon0 = reitti[0].Lon, t = 0;
                var s = new OpasSilmukka(new Kuvakulma(lat0, lon0, 420, 58, 0, 40));
                var ajo = new Ajo();
                var vastaukset = new List<(double t, int n, string toive)>(); var hiljaa = new List<double>();
                s.Pyyda += (n, toive) => vastaukset.Add((t + VastausS, n, toive));
                s.AlkaaPuhua += k => { ajo.Puhe[k.Id] = t; hiljaa.Add(t + (kesto?.Invoke(k) ?? k.KestoS)); };
                s.Saapui += k => ajo.Saapui[k.Id] = t;
                s.LentoAlkaa += (k, m, _) => { if (k?.Id != null) ajo.Lento[k.Id] = t; };
                if (hidas) s.LatausEdistys = () => 0.95;
                s.Aloita("Pariisi");
                s.AloitaKierros(reitti.Select(k => (k.Nimi, k.Lat, k.Lon)).ToList());
                for (int i = 0; i < 60 * 30 * 10; i++)
                {
                    t += Dt;
                    for (int j = vastaukset.Count - 1; j >= 0; j--)
                    {
                        if (vastaukset[j].t > t) continue;
                        var v = vastaukset[j]; vastaukset.RemoveAt(j);
                        var k = Array.Find(reitti, x => x.Nimi == v.toive);
                        if (k != null) s.Vastaus(v.n, Kopio(k, kesto?.Invoke(k) ?? k.KestoS));
                    }
                    for (int j = hiljaa.Count - 1; j >= 0; j--) if (hiljaa[j] <= t) { hiljaa.RemoveAt(j); s.AaniLoppui(); }
                    s.Paivita(Dt, _ => 35);
                    var e = OpasKuvaus.KameraPaikka(s.Asento, lat0, lon0);
                    ajo.R.Add(new Ruutu { T = t, E = e.e, N = e.n, U = e.u, Et = s.Asento.EtaisyysM, Vauhti = s.LipumisVauhti, Vaihe = s.Vaihe, Kohde = s.Nykyinen?.Id, Leijuu = s.Leijuu });
                    if (s.Nykyinen?.Id == reitti[^1].Id && hiljaa.Count == 0 && s.Vaihe != OpasVaihe.Puhuu && !s.KierrosKaynnissa) break;
                }
                return ajo;
            }
            finally { OpasSilmukka.PalloLento = vanha; }
        }

        static int Indeksi(Ajo a, double t) { int i = a.R.FindIndex(x => x.T >= t - 1e-9); return i < 0 ? a.R.Count - 1 : i; }
        static double Nopeus(Ajo a, int k) => k < 1 ? 0 : Math.Sqrt(Math.Pow(a.R[k].E - a.R[k - 1].E, 2) + Math.Pow(a.R[k].N - a.R[k - 1].N, 2) + Math.Pow(a.R[k].U - a.R[k - 1].U, 2)) / Dt;

        /// <summary>Pysähdykset, joille lennettiin kierroksella (1. kohde avauksesta ohitetaan): (kohde, saapui, lähti seuraavaan).</summary>
        static IEnumerable<(string id, double saapui, double lahti)> Pysahdykset(Ajo a, OpasKohde[] reitti)
        {
            for (int i = 1; i + 1 < reitti.Length; i++)
                if (a.Saapui.TryGetValue(reitti[i].Id, out double ta) && a.Lento.TryGetValue(reitti[i + 1].Id, out double td)) yield return (reitti[i].Id, ta, td);
        }

        static Ajo pariisi;
        static Ajo PariisinAjo() => pariisi ??= Aja(Pariisi);

        [Testi] static void SaapuminenJaLahtoEivatPysahdy()
        {
            var a = PariisinAjo(); var viat = new List<string>(); int n = 0;
            foreach (var (id, ta, td) in Pysahdykset(a, Pariisi))
            {
                n++;
                double vk = a.R[Indeksi(a, ta + 1)].Vauhti, vl = a.R[Indeksi(a, td) - 1].Vauhti;
                double minS = double.MaxValue, minL = double.MaxValue, minST = 0, minLT = 0;
                for (int k = Indeksi(a, ta - 6); k <= Indeksi(a, ta + 3); k++) { double v = Nopeus(a, k); if (v < minS) { minS = v; minST = a.R[k].T - ta; } }
                for (int k = Indeksi(a, td - 2); k <= Indeksi(a, td + 6); k++) { double v = Nopeus(a, k); if (v < minL) { minL = v; minLT = a.R[k].T - td; } }
                Console.WriteLine($"      {id}: kierto saapuessa {vk:F2} m/s, pienin nopeus saapumisen ympärillä {minS:F2} m/s ({minST:+0.0;-0.0} s); lähtiessä kierto {vl:F2} m/s, pienin {minL:F2} m/s ({minLT:+0.0;-0.0} s)");
                if (vk < KiertoMinMS) viat.Add($"{id}: kierto saapuessa {vk:F2} m/s < {KiertoMinMS}");
                if (minS < KiertoMinOsuus * vk) viat.Add($"{id}: saapuessa {minS:F2} m/s < {KiertoMinOsuus} × {vk:F2}");
                if (minL < KiertoMinOsuus * vl || vl < KiertoMinOsuus * vk) viat.Add($"{id}: lähtiessä {minL:F2} m/s (kierto {vl:F2}, saapuessa {vk:F2})");
            }
            Oleta.Tosi(n == Pariisi.Length - 2, $"pysähdyksiä mitattu {n}");
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }

        [Testi] static void KiihtyvyysJaNykaysPehmeat()
        {
            var a = PariisinAjo(); var viat = new List<string>();
            // Nopeus 0,5 s:n liukuvana keskiarvona (ruutukohina pois), kiihtyvyys ja nykäys siitä.
            const int W = 15;
            int m = a.R.Count;
            var vx = new double[m]; var vy = new double[m]; var vz = new double[m];
            for (int k = W; k < m; k++) { vx[k] = (a.R[k].E - a.R[k - W].E) / (W * Dt); vy[k] = (a.R[k].N - a.R[k - W].N) / (W * Dt); vz[k] = (a.R[k].U - a.R[k - W].U) / (W * Dt); }
            double Kiih(int k) => k < 2 * W ? 0 : Math.Sqrt(Math.Pow(vx[k] - vx[k - W], 2) + Math.Pow(vy[k] - vy[k - W], 2) + Math.Pow(vz[k] - vz[k - W], 2)) / (W * Dt);
            (double, double, double) A(int k) => ((vx[k] - vx[k - W]) / (W * Dt), (vy[k] - vy[k - W]) / (W * Dt), (vz[k] - vz[k - W]) / (W * Dt));
            double Nyk(int k) { if (k < 3 * W) return 0; var p = A(k); var q = A(k - W); return Math.Sqrt(Math.Pow(p.Item1 - q.Item1, 2) + Math.Pow(p.Item2 - q.Item2, 2) + Math.Pow(p.Item3 - q.Item3, 2)) / (W * Dt); }
            foreach (var (id, ta, td) in Pysahdykset(a, Pariisi))
                foreach (var (nimi, t0, t1, kMax, nMax, t00) in new[] { ("saapumisen jarrutus", ta - 6, ta - 1, JarrutusMax, NykaysMax, ta),
                    ("saapuminen kiertoon", ta - 1, ta + 4, KiihtyvyysMax, NykaysMax, ta), ("lähtö kierrosta", td - 1, td + 1, KiihtyvyysMax, NykaysMax, td) })
                {
                    double ki = 0, ny = 0, kiT = 0, nyT = 0;
                    for (int k = Indeksi(a, t0); k <= Indeksi(a, t1); k++) { if (Kiih(k) > ki) { ki = Kiih(k); kiT = a.R[k].T - t00; } if (Nyk(k) > ny) { ny = Nyk(k); nyT = a.R[k].T - t00; } }
                    Console.WriteLine($"      {id} {nimi}: kiihtyvyys enintään {ki:F2} m/s² ({kiT:+0.0;-0.0} s), nykäys {ny:F2} m/s³ ({nyT:+0.0;-0.0} s)");
                    if (ki > kMax || ny > nMax) viat.Add($"{id} {nimi}: {ki:F2} m/s², {ny:F2} m/s³");
                }
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }

        [Testi] static void KertojaAlkaaEnnenKiertoa()
        {
            var a = PariisinAjo(); var viat = new List<string>();
            for (int i = 1; i < Pariisi.Length; i++)
            {
                string id = Pariisi[i].Id;
                if (!a.Puhe.TryGetValue(id, out double tp) || !a.Saapui.TryGetValue(id, out double ta) || !a.Lento.TryGetValue(id, out double tl)) { viat.Add($"{id}: ei mitattu"); continue; }
                Console.WriteLine($"      {id}: kerronta {ta - tp:F1} s ennen kierron saavuttamista, {tp - tl:F1} s lähdöstä");
                if (ta - tp < OpasSilmukka.PalloPuheEnnenKiertoaS - 0.05) viat.Add($"{id}: kerronta vasta {ta - tp:F1} s ennen saapumista");
                if (tp - tl < OpasSilmukka.PalloPuheAlkuS - 0.05) viat.Add($"{id}: kerronta {tp - tl:F1} s lähdöstä (ennen nousua)");
            }
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }

        [Testi] static void PitkallaPysahdyksellaLahestyyKolmannekseen()
        {
            // Pitkä kerronta (70 s): spiraali ehtii loppuetäisyyteen. Riemukaari 50 m ja Concorde (obeliski 23 m).
            var reitti = new[] { Pariisi[1], Pariisi[2], Pariisi[4], Pariisi[5] };
            var a = Aja(reitti, k => k.Id == "concorde" || k.Id == "riemukaari" ? 70 : k.KestoS);
            double tanP = Math.Tan(OpasKuvaus.KuvaPystyAst * Math.PI / 360);
            var viat = new List<string>(); int n = 0;
            foreach (var (id, ta, td) in Pysahdykset(a, reitti))
            {
                var k = Array.Find(reitti, x => x.Id == id);
                int i0 = Indeksi(a, ta), i1 = Indeksi(a, td) - 1;
                double alku = a.R[i0].Et, loppu = a.R[i1].Et, kasvu = 0;
                for (int j = i0 + 1; j <= i1; j++) kasvu = Math.Max(kasvu, a.R[j].Et - a.R[j - 1].Et);
                double osuusAlku = k.KorkeusM / (2 * alku * tanP), osuusLoppu = k.KorkeusM / (2 * loppu * tanP);
                Console.WriteLine($"      {id}: etäisyys {alku:F0} → {loppu:F0} m, kohde {osuusAlku:P0} → {osuusLoppu:P0} kuvan korkeudesta, suurin kasvu ruudussa {kasvu:F2} m");
                n++;
                if (loppu > alku - 10) viat.Add($"{id}: ei lähestynyt ({alku:F0} → {loppu:F0} m)");
                if (kasvu > 0.05) viat.Add($"{id}: etäisyys kasvoi {kasvu:F2} m ruudussa");
                if (osuusLoppu < 0.28 || osuusLoppu > 0.4) viat.Add($"{id}: lopussa {osuusLoppu:P0} kuvan korkeudesta (≈ ⅓)");
                if (osuusAlku > 0.3) viat.Add($"{id}: alussa {osuusAlku:P0} (koko kohde ympäristöineen)");
                if (id == "riemukaari" && alku < 150) viat.Add($"riemukaari alkaa {alku:F0} m:stä (ennen 101 m, PT: kauempaa)");
            }
            Oleta.Tosi(n == 2, $"pysähdyksiä {n}");
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }
    }
}
