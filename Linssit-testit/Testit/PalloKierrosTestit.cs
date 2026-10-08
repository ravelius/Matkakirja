// PARIISIN PALLOKIERROS KOKO KAMERAPOLKUNA (Linssiseppä 2 Linssisepälle, 8.10.2026; omistajan TF 166 -palaute: "kuumailmapallo ei liiku
// tarpeeksi tasaisesti ja se jää välillä aivan liikaa paikalleen tai jää välillä liian kauas tai välillä lähteekin yhtäkkiä hetkeksi
// taaksepäin ja sitten palaa takaisin paikalleen"). OpasSilmukka ajaa Esittele kaupunki -kierroksen pallotilassa (PalloLento) seitsemän
// pysähdyksen läpi: lipuminen, lähdön valmistelu, käännös, van Wijk–Nuij-lento, sumennuskumpu (reitti kulkee prefektuurin ja Élysée'n
// ohi) ja laskeutuminen. Worker vastaa 2 s:ssa kierroksen jonon kohteella ja kerronta kestää kohteen KestoS:n (25–70 s, Pariisin
// kierroksen kappaleiden mitat). Kameran silmä lasketaan joka ruudulta (1/30 s) Pariisin keskipisteen ENU:ssa (OpasKuvaus.KameraPaikka).
// Neljä tarkistusta:
//  1 TAAKSEPÄIN: silmän eteneminen osuuden suunnassa (pysähdys i → i+1) ei palaa yli 1 m:ä osuuden siihenastisesta parhaasta.
// Kaksi verkkoprofiilia: Nopea (laatat aina valmiit) ja Hidas (Googlen laattojen latausaste jää 95 %:iin eli alle LahtoValmis 98 %:n,
// ja kohteen laatat valmistuvat 2,5 s lennon lopun jälkeen; simu 18.39: saapuessa 28–45 %) — kumpikin on pelaajalle tavallinen tilanne.
//  2 PAIKALLAAN: silmän vaakanopeus ei ole alle SeisooMS yli SeisooMaxS sekuntia, kun seuraava kohde on tiedossa (kierroksen jono);
//    laattojen odotus ei ole pelaajalle näkyvä syy (pallo vain seisoo).
//    SeisooMaxS = 3 s: suunniteltu pisin seisahdus on lähdön valmistelun jarrun loppu (LipumisJarru 1 s, smootherstep alle 5 %:n
//    vauhdissa ~0,25 s) + korostuksen sammuminen + lennon alku levosta (smootherstep, alle 0,2 m/s ~0,5 s) ≈ 1,5 s; kaksinkertainen
//    marginaali. SeisooMS = 0,2 m/s = 5 % lipumisnopeudesta (4 m/s): 350 m:n kehyksessä alle 0,03 °/s, eli silmä näkee kuvan seisovan.
//  3 KEHYS: silmän etäisyys katsepisteeseen pysähdyksellä (Puhuu, Odottaa) pysyy kohteen luokan rajassa (OpasKuvaus: katu ja alue
//    350 m, rakennus 600 m, korkea kohde KorkeaEtMaxM 1 200 m).
//  4 SAUMAT: silmän nopeus ja kiihtyvyys ovat jatkuvia vaiheiden saumoissa (Puhuu/Odottaa ↔ Lentaa): nopeuden hyppy ruudusta toiseen
//    ≤ 0,1 m/s (= 3 m/s² kiihtyvyys 1/30 s:ssa) ja kiihtyvyyden hyppy ≤ 1 m/s² (lento alkaa ja päättyy levossa, smootherstep a(0) = 0).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class PalloKierrosTestit
    {
        const double Lat0 = 48.8566, Lon0 = 2.3522, Dt = 1 / 30.0, VastausS = 2;
        public const double TaaksepainMaxM = 1, SeisooMS = 0.2, SeisooMaxS = 3, SaumaDvMS = 0.1, SaumaDaMS2 = 1;

        // Pariisin kierros: Notre-Damelta Louvreen kulkee prefektuurin (48.8541, 2.3470) ohi, Madeleinelta Grand Palais'lle Élysée'n ohi.
        static readonly OpasKohde[] Reitti =
        {
            new OpasKohde { Id = "notre-dame", Nimi = "Notre-Dame", Lat = 48.8530, Lon = 2.3499, KokoM = 130, KorkeusM = 69, KestoS = 30 },
            new OpasKohde { Id = "louvre", Nimi = "Louvre", Lat = 48.8606, Lon = 2.3376, KokoM = 400, KestoS = 45 },
            new OpasKohde { Id = "concorde", Nimi = "Place de la Concorde", Lat = 48.8656, Lon = 2.3212, KokoM = 300, KestoS = 25 },
            new OpasKohde { Id = "madeleine", Nimi = "Madeleine", Lat = 48.8700, Lon = 2.3245, KokoM = 100, KorkeusM = 30, KestoS = 60 },
            new OpasKohde { Id = "grand-palais", Nimi = "Grand Palais", Lat = 48.8661, Lon = 2.3125, KokoM = 240, KorkeusM = 45, KestoS = 35 },
            new OpasKohde { Id = "riemukaari", Nimi = "Riemukaari", Lat = 48.8738, Lon = 2.2950, KokoM = 60, KorkeusM = 50, KestoS = 40 },
            new OpasKohde { Id = "eiffel", Nimi = "Eiffel-torni", Lat = 48.8584, Lon = 2.2945, KokoM = 125, KorkeusM = 330, KestoS = 70 },
        };

        public struct Ruutu
        {
            public double T, E, N, U, EtM;
            public OpasVaihe Vaihe;
            public int Kohde;   // nykyisen pysähdyksen indeksi Reitissä (−1 = ei vielä perillä ensimmäisessä)
        }

        public enum Verkko { Nopea, Hidas }
        static readonly Dictionary<Verkko, List<Ruutu>> ajot = new Dictionary<Verkko, List<Ruutu>>();
        static readonly Dictionary<Verkko, string> lokit = new Dictionary<Verkko, string>();
        static readonly Verkko[] Verkot = { Verkko.Nopea, Verkko.Hidas };
        const double HidasLatausaste = 0.95, HidasSaapumisLaatatS = 2.5;

        /// <summary>Koko kierros kerran per verkkoprofiili (välimuisti): ruudut ja tapahtumaloki.</summary>
        public static List<Ruutu> Aja(Verkko verkko = Verkko.Nopea)
        {
            if (ajot.TryGetValue(verkko, out var valmis)) return valmis;
            bool vanha = OpasSilmukka.PalloLento;
            OpasSilmukka.PalloLento = true;
            try
            {
                var s = new OpasSilmukka(OpasSilmukka.Avauskuva(48.8566, 2.3522));
                var loki = new System.Text.StringBuilder();
                var vastaukset = new List<(double t, int n, string toive)>(); var hiljaa = new List<double>();
                double t = 0;
                s.Pyyda += (n, toive) => { vastaukset.Add((t + VastausS, n, toive)); loki.Append($"{t:F1} pyyntö {toive}; "); };
                s.AlkaaPuhua += k => { hiljaa.Add(t + k.KestoS); loki.Append($"{t:F1} puhuu {k.Id}; "); };
                double lentoAlkoi = double.NaN;
                s.LentoAlkaa += (k, matka, _) => { lentoAlkoi = t; loki.Append($"{t:F1} lento → {k?.Id} {matka:F0} m; "); };
                Func<bool> laatat = null;
                if (verkko == Verkko.Hidas)
                {
                    s.LatausEdistys = () => HidasLatausaste;
                    laatat = () => double.IsNaN(lentoAlkoi) || t - lentoAlkoi >= s.LentoKestoS + HidasSaapumisLaatatS;
                }
                s.KehysKorjattu += (la, lo) => loki.Append($"{t:F1} kehys korjattu; ");
                s.Aloita("Pariisi");
                var jono = new List<(string, double, double)>();
                foreach (var k in Reitti) jono.Add((k.Nimi, k.Lat, k.Lon));
                s.AloitaKierros(jono);
                var r = new List<Ruutu>();
                for (int i = 0; i < 60 * 30 * 12; i++)
                {
                    t += Dt;
                    for (int j = vastaukset.Count - 1; j >= 0; j--)
                    {
                        if (vastaukset[j].t > t) continue;
                        var v = vastaukset[j]; vastaukset.RemoveAt(j);
                        int idx = Array.FindIndex(Reitti, k => k.Nimi == v.toive);
                        if (idx >= 0) { s.Vastaus(v.n, Kopio(Reitti[idx])); loki.Append($"{t:F1} vastaus {Reitti[idx].Id}; "); }
                    }
                    for (int j = hiljaa.Count - 1; j >= 0; j--) if (hiljaa[j] <= t) { hiljaa.RemoveAt(j); s.AaniLoppui(); loki.Append($"{t:F1} ääni loppui; "); }
                    s.Paivita(Dt, _ => 35, laatat);
                    var e = OpasKuvaus.KameraPaikka(s.Asento, Lat0, Lon0);
                    int kohde = s.Nykyinen == null ? -1 : Array.FindIndex(Reitti, k => k.Id == s.Nykyinen.Id);
                    r.Add(new Ruutu { T = t, E = e.e, N = e.n, U = e.u, EtM = s.Asento.EtaisyysM, Vaihe = s.Vaihe, Kohde = kohde });
                    // Valmis: viimeinen kerronta loppui ja opas odottaa (kierros päättyi).
                    if (kohde == Reitti.Length - 1 && hiljaa.Count == 0 && s.Vaihe != OpasVaihe.Puhuu && !s.KierrosKaynnissa) break;
                }
                lokit[verkko] = loki.ToString();
                Console.WriteLine($"      {verkko}: kierros {t:F0} s, {r.Count} ruutua; {lokit[verkko]}");
                return ajot[verkko] = r;
            }
            finally { OpasSilmukka.PalloLento = vanha; }
        }

        static OpasKohde Kopio(OpasKohde k) =>
            new OpasKohde { Id = k.Id, Nimi = k.Nimi, Lat = k.Lat, Lon = k.Lon, KokoM = k.KokoM, KorkeusM = k.KorkeusM, KestoS = k.KestoS };

        static (double e, double n) Enu(OpasKohde k) =>
            ((k.Lon - Lon0) * 6371000 * Math.Cos(Lat0 * Math.PI / 180) * Math.PI / 180, (k.Lat - Lat0) * 6371000 * Math.PI / 180);

        static bool Pysahdyksella(OpasVaihe v) => v == OpasVaihe.Puhuu || v == OpasVaihe.Odottaa;

        /// <summary>Osuus i → i+1: ruudut ensimmäisestä perilläolosta pysähdyksessä i seuraavan perilläoloon asti.</summary>
        static IEnumerable<(int i, int alku, int loppu)> Osuudet(List<Ruutu> r)
        {
            for (int i = 0; i + 1 < Reitti.Length; i++)
            {
                int a = r.FindIndex(x => x.Kohde == i && Pysahdyksella(x.Vaihe));
                int b = r.FindIndex(x => x.Kohde == i + 1 && Pysahdyksella(x.Vaihe));
                if (a < 0 || b < 0) continue;
                yield return (i, a, b);
            }
        }

        [Testi] static void KierrosAjetaanLoppuun()
        {
            foreach (var verkko in Verkot)
            {
                var r = Aja(verkko);
                int perilla = 0;
                for (int i = 0; i < Reitti.Length; i++) if (r.Exists(x => x.Kohde == i && Pysahdyksella(x.Vaihe))) perilla++;
                Oleta.Sama(Reitti.Length, perilla, $"{verkko}: kaikki pysähdykset käytiin ({lokit[verkko]})");
            }
        }

        [Testi] static void EiTaaksepainYliMetria()
        {
            var vikoja = new List<string>();
            foreach (var verkko in Verkot)
            {
                var r = Aja(verkko);
                foreach (var (i, a, b) in Osuudet(r))
                {
                    var (pe, pn) = Enu(Reitti[i]); var (qe, qn) = Enu(Reitti[i + 1]);
                    double ue = qe - pe, un = qn - pn, l = Math.Sqrt(ue * ue + un * un); ue /= l; un /= l;
                    double paras = double.MinValue, pahin = 0; int pahinK = a, parasK = a;
                    for (int k = a; k <= b; k++)
                    {
                        double ete = (r[k].E - pe) * ue + (r[k].N - pn) * un;
                        if (ete > paras) { paras = ete; parasK = k; }
                        if (paras - ete > pahin) { pahin = paras - ete; pahinK = k; }
                    }
                    Console.WriteLine($"      {verkko} {Reitti[i].Id} → {Reitti[i + 1].Id}: taaksepäin enintään {pahin:F1} m ({r[pahinK].T:F1} s {r[pahinK].Vaihe}, paras {r[parasK].T:F1} s)");
                    if (pahin > TaaksepainMaxM) vikoja.Add($"{verkko} {Reitti[i].Id} → {Reitti[i + 1].Id} {pahin:F1} m @ {r[pahinK].T:F1} s {r[pahinK].Vaihe}");
                }
            }
            Oleta.Tosi(vikoja.Count == 0, $"taaksepäin yli {TaaksepainMaxM} m: {string.Join("; ", vikoja)}");
        }

        [Testi] static void EiSeisoYliKolmeaSekuntia()
        {
            var vikoja = new List<string>();
            foreach (var verkko in Verkot)
            {
                var r = Aja(verkko);
                foreach (var (i, a, b) in Osuudet(r))
                {
                    double seis = 0, pisin = 0, pisinT = 0; OpasVaihe pisinV = OpasVaihe.Puhuu;
                    for (int k = Math.Max(1, a); k <= b; k++)
                    {
                        double ve = (r[k].E - r[k - 1].E) / Dt, vn = (r[k].N - r[k - 1].N) / Dt;
                        if (Math.Sqrt(ve * ve + vn * vn) < SeisooMS) { seis += Dt; if (seis > pisin) { pisin = seis; pisinT = r[k].T; pisinV = r[k].Vaihe; } }
                        else seis = 0;
                    }
                    Console.WriteLine($"      {verkko} {Reitti[i].Id} → {Reitti[i + 1].Id}: pisin seisahdus {pisin:F1} s (päättyi {pisinT:F1} s, {pisinV})");
                    if (pisin > SeisooMaxS) vikoja.Add($"{verkko} {Reitti[i].Id} {pisin:F1} s @ {pisinT:F1} s {pisinV}");
                }
            }
            Oleta.Tosi(vikoja.Count == 0, $"seisoo yli {SeisooMaxS} s seuraavan ollessa tiedossa: {string.Join("; ", vikoja)}");
        }

        static double LuokanRaja(OpasKohde k) =>
            k.KorkeusM >= OpasKuvaus.KorkeaRajaM ? OpasKuvaus.KorkeaEtMaxM
            : OpasKuvaus.Luokittele(k) == OpasKuvaus.Luokka.Rakennus ? OpasKuvaus.RakennusEtMaxM
            : OpasKuvaus.Luokittele(k) == OpasKuvaus.Luokka.Alue ? OpasKuvaus.AlueEtMaxM : OpasKuvaus.KatuEtMaxM;

        [Testi] static void KehysPysyyLuokanRajassa()
        {
            var vikoja = new List<string>();
            foreach (var verkko in Verkot)
            {
                var r = Aja(verkko);
                for (int i = 0; i < Reitti.Length; i++)
                {
                    double maks = 0, maksT = 0, raja = LuokanRaja(Reitti[i]);
                    foreach (var x in r) if (x.Kohde == i && Pysahdyksella(x.Vaihe) && x.EtM > maks) { maks = x.EtM; maksT = x.T; }
                    Console.WriteLine($"      {verkko} {Reitti[i].Id}: kehyksen etäisyys enintään {maks:F0} m (raja {raja:F0} m, {maksT:F1} s)");
                    if (maks > raja) vikoja.Add($"{verkko} {Reitti[i].Id} {maks:F0} m > {raja:F0} m @ {maksT:F1} s");
                }
            }
            Oleta.Tosi(vikoja.Count == 0, $"kehys liian kaukana: {string.Join("; ", vikoja)}");
        }

        static (double, double, double) V(List<Ruutu> r, int k) => ((r[k].E - r[k - 1].E) / Dt, (r[k].N - r[k - 1].N) / Dt, (r[k].U - r[k - 1].U) / Dt);
        static double Pit((double a, double b, double c) v) => Math.Sqrt(v.a * v.a + v.b * v.b + v.c * v.c);
        static (double, double, double) Ero((double a, double b, double c) x, (double a, double b, double c) y) => (x.a - y.a, x.b - y.b, x.c - y.c);

        [Testi] static void NopeusJaKiihtyvyysJatkuviaSaumoissa()
        {
            var vikoja = new List<string>();
            foreach (var verkko in Verkot)
            {
                var r = Aja(verkko); int saumoja = 0;
                for (int k = 3; k + 2 < r.Count; k++)
                {
                    bool lentoNyt = r[k].Vaihe == OpasVaihe.Lentaa, lentoEnnen = r[k - 1].Vaihe == OpasVaihe.Lentaa;
                    if (lentoNyt == lentoEnnen || r[k - 1].Kohde < 0) continue;
                    saumoja++;
                    // Nopeuden hyppy: suurin peräkkäisten ruutujen nopeusero sauman ympärillä; kiihtyvyyden hyppy: kiihtyvyys ennen ja jälkeen.
                    double dv = 0;
                    for (int j = k - 1; j <= k + 1; j++) dv = Math.Max(dv, Pit(Ero(V(r, j + 1), V(r, j))));
                    double da = Pit(Ero(Ero(V(r, k + 2), V(r, k + 1)), Ero(V(r, k - 1), V(r, k - 2)))) / Dt;
                    string mika = lentoNyt ? "lähtö" : "lasku";
                    Console.WriteLine($"      {verkko} {r[k].T:F1} s {mika} ({(r[k].Kohde >= 0 ? Reitti[r[k].Kohde].Id : "-")}): nopeuden hyppy {dv:F2} m/s, kiihtyvyyden hyppy {da:F2} m/s², nopeus {Pit(V(r, k - 1)):F2} → {Pit(V(r, k + 1)):F2} m/s");
                    if (dv > SaumaDvMS || da > SaumaDaMS2) vikoja.Add($"{verkko} {r[k].T:F1} s {mika} Δv {dv:F2} m/s, Δa {da:F2} m/s²");
                }
                Oleta.Tosi(saumoja >= 2 * (Reitti.Length - 1), $"{verkko}: saumoja {saumoja}");
            }
            Oleta.Tosi(vikoja.Count == 0, $"epäjatkuva sauma: {string.Join("; ", vikoja)}");
        }

        // Lisä (ei saumassa): pysähdyksellä (Puhuu, Odottaa) silmä liikkuu vain lipumisen vauhtia; nykäys = yli LipumisNopeus + 1 m/s.
        [Testi] static void PysahdyksellaEiNykaysta()
        {
            var vikoja = new List<string>(); double raja = OpasKuvaus.LipumisNopeus + 1;
            foreach (var verkko in Verkot)
            {
                var r = Aja(verkko);
                for (int i = 0; i < Reitti.Length; i++)
                {
                    double maks = 0, maksT = 0;
                    for (int k = 1; k < r.Count; k++)
                        if (r[k].Kohde == i && Pysahdyksella(r[k].Vaihe) && Pysahdyksella(r[k - 1].Vaihe) && Pit(V(r, k)) > maks) { maks = Pit(V(r, k)); maksT = r[k].T; }
                    Console.WriteLine($"      {verkko} {Reitti[i].Id}: suurin nopeus pysähdyksellä {maks:F1} m/s ({maksT:F1} s)");
                    if (maks > raja) vikoja.Add($"{verkko} {Reitti[i].Id} {maks:F1} m/s @ {maksT:F1} s");
                }
            }
            Oleta.Tosi(vikoja.Count == 0, $"nykäys pysähdyksellä (> {raja:F0} m/s): {string.Join("; ", vikoja)}");
        }
    }
}
