// KIPIN PYSÄHDYKSET, NOTRE-DAME JA CONCORDE (omistajan TF 180 -palaute, PT:n linjaus juna 181; Linssiseppä 11.10.):
//  1) "Kippi pysähtyy vieläkin välillä liiaksi paikalleen": Pariisin koko kierros Ydin-tasolla ja nopeusloki (OpasNopeusloki,
//     sama kuin sovittimen "opas nopeusloki 1") 0,1 s:n välein. Seisahdus = silmä alle 10 % matkanopeudesta JA kuva kääntyy alle
//     1 °/s yli 1 s. Kaksi profiilia: Normaali (worker 2 s, laatat valmiit) ja Odotus (+5 s joka pysähdyksellä: worker vastaa 7 s:ssa,
//     kertoja vaikenee 5 s kappaleen jälkeen, laatat 95 % → lähtö odottaa LahtoOdotusMaxS, kohteen laatat 2,5 s lennon jälkeen).
//  2) Notre-Dame: kierto päättyy länsijulkisivun eteen (kamera kirkon länsipuolella katsoen itään, julkisivun normaali ~297°
//     OSM-pohjapiirroksesta) ja laskeutuminen on valmis noin kierron puolivälissä.
//  3) Concorde: kierto lähempää ja matalammalta (obeliski ja suihkulähteet täyttävät kuvan keskiosan).
// Data: kultaiset/opas-kierrokset-20261008.json (Pariisi, lyhin reitti kuten sovitin), workerin esittely-v1e:n katse_suunta ja
// katse_kaari (Concorde, Champs-Élysées 295° / 12°) ja ympäröivät katot TF 180 -lokista (sovitin laskee ne lennon aikana, ~1,5 s
// vastauksen jälkeen). Kohde rakennetaan workerin JSONista OpasKohde.Lue-funktiolla kuten sovittimessa.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KippiPysahdyksetTestit
    {
        const double Dt = 1 / 30.0, MaaM = 35, YmparysViiveS = 1.5;
        public enum Profiili { Normaali, Odotus }

        /// <summary>Ympäröivät katot (m) TF 180 -lokista (opas: … ympäröivät katot); muut 15 m.</summary>
        static readonly Dictionary<string, double> Ymparys = new Dictionary<string, double>
        { ["Q2981"] = 5, ["Q19675"] = 27, ["Q23402"] = 16, ["Q189503"] = 11, ["Q243"] = 6, ["Q64436"] = 21 };
        /// <summary>Workerin katse_suunta / katse_kaari (esittely-v1e, LS1/PT 9.10.).</summary>
        static readonly Dictionary<string, (double suunta, double kaari)> Katse = new Dictionary<string, (double, double)>
        { ["Q189503"] = (295, 12), ["Q550"] = (295, 12) };

        public sealed class Ajo
        {
            public List<OpasNopeusloki.Nayte> N = new List<OpasNopeusloki.Nayte>();
            public List<(double t, Kuvakulma a, string kohde, OpasVaihe v)> R = new List<(double, Kuvakulma, string, OpasVaihe)>();
            public Dictionary<string, double> Saapui = new Dictionary<string, double>(), Lahti = new Dictionary<string, double>(), Puhe = new Dictionary<string, double>();
            public OpasKohde[] Reitti;
            public string Loki;
        }

        public static OpasKohde[] PariisinReitti()
        {
            var c = PalloKaupungitTestit.Lue().First(x => x.Id == "pariisi");
            return OpasReitti.Lyhin(c.Kohteet, k => (k.Lat, k.Lon), out _).ToArray();
        }

        /// <summary>Workerin vastaus JSONina (tools/pollo/worker.js pysähdys) → OpasKohde.Lue, kuten sovitin.</summary>
        static OpasKohde Workerilta(OpasKohde k, double kesto)
        {
            var j = new Dictionary<string, object>
            {
                ["tyyppi"] = "pysahdys", ["id"] = k.Id, ["nimi"] = k.Nimi, ["lat"] = k.Lat, ["lon"] = k.Lon, ["koko_m"] = k.KokoM,
                ["teksti"] = "…", ["kesto_s"] = kesto, ["kierros"] = new Dictionary<string, object> { ["numero"] = 1.0, ["maara"] = 8.0 },
            };
            if (k.KorkeusM > 0) j["korkeus_m"] = k.KorkeusM;
            if (!string.IsNullOrEmpty(k.Luokka)) j["luokka"] = k.Luokka;
            if (Katse.TryGetValue(k.Id, out var ks)) { j["katse_suunta"] = ks.suunta; j["katse_kaari"] = ks.kaari; }
            return OpasKohde.Lue(j);
        }

        static readonly Dictionary<Profiili, Ajo> ajot = new Dictionary<Profiili, Ajo>();

        /// <summary>Pariisin kierros kaupunkitilan avauksesta (1,1 km / 50°, siirto ja avauksen kierto) kuten sovitin.</summary>
        public static Ajo Aja(Profiili p = Profiili.Normaali)
        {
            if (ajot.TryGetValue(p, out var valmis)) return valmis;
            bool vanha = OpasSilmukka.PalloLento; OpasSilmukka.PalloLento = true;
            try
            {
                var reitti = PariisinReitti();
                var c = PalloKaupungitTestit.Lue().First(x => x.Id == "pariisi");
                var ajo = new Ajo { Reitti = reitti };
                var loki = new System.Text.StringBuilder();
                bool odotus = p == Profiili.Odotus;
                double vastausS = odotus ? 7 : 2, puheLisaS = odotus ? 5 : 0, t = 0, lentoAlkoi = double.NaN;
                var s = new OpasSilmukka(OpasSilmukka.Avauskuva(c.Lat, c.Lon)) { AvausEtaisyysOhitus = 1100, AvausKallistusOhitus = 50, PakotaSiirto = true, PyynnotSeis = true };
                var vastaukset = new List<(double t, int n, string toive)>(); var hiljaa = new List<double>(); var ymp = new List<(double t, OpasKohde k)>();
                s.Pyyda += (n, toive) => vastaukset.Add((t + vastausS, n, toive));
                s.AlkaaPuhua += k => { if (k?.Id != null) ajo.Puhe[k.Id] = t; hiljaa.Add(t + k.KestoS + puheLisaS); loki.Append($"{t:F1} puhuu {k?.Id}; "); };
                s.Saapui += k => { if (k?.Id != null && !ajo.Saapui.ContainsKey(k.Id)) ajo.Saapui[k.Id] = t; loki.Append($"{t:F1} saapui {k?.Id}; "); };
                s.LentoAlkaa += (k, m, _) => { lentoAlkoi = t; loki.Append($"{t:F1} lento → {k?.Id} {m:F0} m {s.LentoKestoS:F1} s; "); };
                Func<bool> laatat = null;
                if (odotus)
                {
                    s.LatausEdistys = () => 0.95;
                    laatat = () => double.IsNaN(lentoAlkoi) || t - lentoAlkoi >= s.LentoKestoS + 2.5;
                }
                s.VaihdaPaikka(c.Lat, c.Lon, c.Nimi);
                s.KohdistaAvausKohteeseen(reitti[0].Nimi, reitti[0].Lat, reitti[0].Lon);
                s.AsetaAvausKesto(14);
                var log = new OpasNopeusloki();
                bool kierrosAlkoi = false;
                for (int i = 0; i < 30 * 60 * 15; i++)
                {
                    t += Dt;
                    // Esitys (avaus + opastus) ~14 s siirron jälkeen, sitten kierros (sovitin: AloitaKierros purkaa PyynnotSeis).
                    if (!kierrosAlkoi && s.Vaihe == OpasVaihe.Odottaa && s.VaiheAika >= 14)
                    { kierrosAlkoi = true; s.AloitaKierros(reitti.Select(k => (k.Nimi, k.Lat, k.Lon)).ToList()); loki.Append($"{t:F1} kierros alkaa; "); }
                    for (int j = vastaukset.Count - 1; j >= 0; j--)
                    {
                        if (vastaukset[j].t > t) continue;
                        var v = vastaukset[j]; vastaukset.RemoveAt(j);
                        var k = Array.Find(reitti, x => x.Nimi == v.toive);
                        if (k == null) continue;
                        var kk = Workerilta(k, k.KestoS);
                        s.Vastaus(v.n, kk);
                        ymp.Add((t + YmparysViiveS, kk));
                    }
                    for (int j = ymp.Count - 1; j >= 0; j--) if (ymp[j].t <= t) { var k = ymp[j].k; k.YmparysM = Ymparys.TryGetValue(k.Id, out var y) ? y : 15; ymp.RemoveAt(j); }
                    for (int j = hiljaa.Count - 1; j >= 0; j--) if (hiljaa[j] <= t) { hiljaa.RemoveAt(j); s.AaniLoppui(); }
                    var vaihe0 = s.Vaihe; var nyk0 = s.Nykyinen?.Id;
                    s.Paivita(Dt, _ => MaaM, laatat);
                    if (vaihe0 != OpasVaihe.Lentaa && s.Vaihe == OpasVaihe.Lentaa && nyk0 != null && !ajo.Lahti.ContainsKey(nyk0)) ajo.Lahti[nyk0] = t;
                    string kohde = s.Nykyinen?.Id;
                    ajo.R.Add((t, s.Asento, kohde, s.Vaihe));
                    if (log.Paivita(t, s.Asento, kohde, OpasNopeusloki.Vaihe(s)) is OpasNopeusloki.Nayte nn) ajo.N.Add(nn);
                    if (kierrosAlkoi && kohde == reitti[^1].Id && hiljaa.Count == 0 && s.Vaihe != OpasVaihe.Puhuu && !s.KierrosKaynnissa) break;
                }
                ajo.Loki = loki.ToString();
                return ajot[p] = ajo;
            }
            finally { OpasSilmukka.PalloLento = vanha; }
        }

        /// <summary>Pisin seisahdus kohteittain (s) ja syy (vaihe); kohde = pysähdys, jolla pallo oli (lento kohteeseen kuuluu kohteelle).</summary>
        public static Dictionary<string, (double s, string vaihe, double alku)> PisimmatSeisahdukset(Ajo a)
        {
            double mn = OpasNopeusloki.Matkanopeus(a.N);
            var d = new Dictionary<string, (double, string, double)>();
            foreach (var x in OpasNopeusloki.Seisahdukset(a.N, mn))
            {
                string k = x.Kohde ?? "avaus";
                if (!d.TryGetValue(k, out var e) || x.Kesto > e.Item1) d[k] = (x.Kesto, x.Vaihe, x.Alku);
            }
            return d;
        }

        [Testi] static void PariisinKierrosEiSeisahduYliSekuntia()
        {
            var viat = new List<string>();
            foreach (var p in new[] { Profiili.Normaali, Profiili.Odotus })
            {
                var a = Aja(p);
                double mn = OpasNopeusloki.Matkanopeus(a.N);
                var lista = OpasNopeusloki.Seisahdukset(a.N, mn);
                Console.WriteLine($"      {p}: {a.N.Count} näytettä, matkanopeus {mn:F2} m/s (raja {OpasNopeusloki.SeisOsuus * mn:F2} m/s ja {OpasNopeusloki.SeisKulmaAstS} °/s), seisahduksia {lista.Count}");
                foreach (var x in lista) Console.WriteLine($"        seisahdus {x.Kohde ?? "avaus"} {x.Alku:F1} s, {x.Kesto:F1} s ({x.Vaihe})");
                foreach (var k in a.Reitti)
                {
                    var y = a.N.Where(n => n.Kohde == k.Id).ToList();
                    Console.WriteLine($"        {k.Id} {k.Nimi}: pienin v {(y.Count > 0 ? y.Min(n => n.V) : 0):F2} m/s, pienin kulma {(y.Count > 0 ? y.Min(n => n.Kulma) : 0):F2} °/s");
                }
                Oleta.Tosi(a.Saapui.Count == a.Reitti.Length, $"{p}: kaikki pysähdykset ({a.Saapui.Count}/{a.Reitti.Length}; {a.Loki})");
                // Kierroksen pysähdykset (myös 1. kohteen laskeutuminen); avauskehyksen kierto ennen kierrosta ei kuulu kippiin.
                foreach (var x in lista) if (x.Kohde != null) viat.Add($"{p} {x.Kohde} {x.Alku:F1} s {x.Kesto:F1} s ({x.Vaihe})");
            }
            Oleta.Tosi(viat.Count == 0, "seisahduksia: " + string.Join("; ", viat));
        }

        /// <summary>
        /// 37 kaupungin kierrokset (PalloKaupungitTestit, molemmat verkot): pisin seisahdus kaupungeittain. Vaatii, ettei kierroksen
        /// pysähdyksillä ole yli SeisMinS:n seisahduksia. Ohitetaan avaus, siirtoruutu ja lento 5 km:n yleiskuvasta (≥ AvausKorkeaM;
        /// PalloKaupungitTestit avaa kaupungin ilman kaupunkitilaa): siitä laskeutuminen päättyy tarkoituksella lepoon ja kierto alkaa
        /// levosta (OpasSilmukka: "kierto alkaa perillä levosta", Ljubljanan nykäys), ~1,0–1,8 s ensimmäisellä kohteella — raportoidaan.
        /// </summary>
        [Testi] static void KaikkiKaupungitEiSeisahdu()
        {
            var viat = new List<string>();
            Console.WriteLine("      | Kaupunki | matkanopeus m/s | seisahduksia | pisin s | missä |");
            foreach (var c in PalloKaupungitTestit.Lue())
            {
                int lkm = 0; double pisin = 0; string missa = "-"; double mnMin = double.MaxValue;
                foreach (bool hidas in new[] { false, true })
                {
                    var n = new List<OpasNopeusloki.Nayte>(); var log = new OpasNopeusloki();
                    var korkealta = new HashSet<string>(); double edEt = 0; var edVaihe = OpasVaihe.Alku;
                    PalloKaupungitTestit.Aja(c, hidas, kehys: (s, t) =>
                    {
                        if (s.Vaihe == OpasVaihe.Lentaa && edVaihe != OpasVaihe.Lentaa && edEt >= OpasSilmukka.AvausKorkeaM && s.Nykyinen?.Id != null) korkealta.Add(s.Nykyinen.Id);
                        if (s.Vaihe == OpasVaihe.Lentaa && s.Nykyinen?.Id != null && s.Nykyinen.Id == c.Kohteet[0].Id) korkealta.Add(s.Nykyinen.Id);
                        edVaihe = s.Vaihe; edEt = s.Asento.EtaisyysM;
                        if (log.Paivita(t, s.Asento, s.Nykyinen?.Id, OpasNopeusloki.Vaihe(s)) is OpasNopeusloki.Nayte x) n.Add(x);
                    });
                    double mn = OpasNopeusloki.Matkanopeus(n); mnMin = Math.Min(mnMin, mn);
                    foreach (var x in OpasNopeusloki.Seisahdukset(n, mn))
                    {
                        if (x.Kohde == null) continue;
                        if (korkealta.Contains(x.Kohde)) { Console.WriteLine($"      ({c.Nimi} {(hidas ? "Hidas" : "Nopea")} {Array.Find(c.Kohteet, k => k.Id == x.Kohde)?.Nimi}: {x.Kesto:F1} s ({x.Vaihe}) laskeutumisessa yleiskuvasta, ohitetaan)"); continue; }
                        lkm++;
                        if (x.Kesto > pisin) { pisin = x.Kesto; missa = $"{(hidas ? "Hidas" : "Nopea")} {Array.Find(c.Kohteet, k => k.Id == x.Kohde)?.Nimi ?? x.Kohde} {x.Alku:F0} s ({x.Vaihe})"; }
                        viat.Add($"{c.Nimi} {(hidas ? "Hidas" : "Nopea")} #{Array.FindIndex(c.Kohteet, k => k.Id == x.Kohde)} {Array.Find(c.Kohteet, k => k.Id == x.Kohde)?.Nimi} {x.Alku:F0} s {x.Kesto:F1} s ({x.Vaihe})");
                        if (Environment.GetEnvironmentVariable("KIPPI_DEBUG") == c.Id)
                            foreach (var y in n.Where(y => y.T > x.Alku - 2 && y.T < x.Alku + x.Kesto + 2)) Console.WriteLine($"        {y.T:F1} v {y.V:F2} kulma {y.Kulma:F2} {y.Kohde} {y.Vaihe}");
                    }
                }
                Console.WriteLine($"      | {c.Nimi} | {mnMin:F1} | {lkm} | {pisin:F1} | {missa} |");
            }
            foreach (var v in viat) Console.WriteLine("      SEIS " + v);
            Oleta.Tosi(viat.Count == 0, $"{viat.Count} seisahdusta: {string.Join("; ", viat.Take(12))}");
        }

        [Testi] static void NopeuslokiRiviJasentyy()
        {
            var n = new OpasNopeusloki.Nayte { T = 12.3, V = 4.56, Kulma = 2.5, Kohde = "Q2981", Vaihe = "kierto" };
            string r = OpasNopeusloki.Rivi(n);
            Oleta.Sama("MATKAKIRJA opas nopeus t=12.3 v=4.56 kulma=2.50 kohde=Q2981 vaihe=kierto", r);
            Oleta.Tosi(OpasNopeusloki.Jasenna("MATKAKIRJA linssit: x " + r, out var m) && m.Kohde == "Q2981" && Math.Abs(m.V - 4.56) < 1e-9 && m.Vaihe == "kierto", "jäsennys");
            // Seisahdus: 1,5 s paikallaan keskellä liikettä.
            var l = new List<OpasNopeusloki.Nayte>();
            for (int i = 1; i <= 60; i++) l.Add(new OpasNopeusloki.Nayte { T = i * 0.1, V = i > 20 && i <= 35 ? 0.01 : 5, Kulma = i > 20 && i <= 35 ? 0.2 : 3, Kohde = "a", Vaihe = "kierto" });
            var s = OpasNopeusloki.Seisahdukset(l, 5);
            Oleta.Tosi(s.Count == 1 && Math.Abs(s[0].Kesto - 1.5) < 1e-6, $"seisahdus {s.Count} {(s.Count > 0 ? s[0].Kesto : 0):F2} s");
        }

        // ---- ASENTO 0,5 s:n VÄLEIN (todiste Notre-Damelle ja Concordelle) ----
        public struct Asento { public double T, EtM, VaakaM, SilmaM, Suunta, Kallistus, SilmaSuunta; }

        /// <summary>Kameran asento pysähdyksen ajan (saapumisesta lähtöön) 0,5 s:n välein: katse-etäisyys, vaakaetäisyys kohteesta,
        /// silmän korkeus maasta, kameran suunta, kallistus ja silmän suunta kohteesta (°).</summary>
        public static List<Asento> Asennot(Ajo a, string id, double ennenS = 0)
        {
            var k = a.Reitti.First(x => x.Id == id);
            double t0 = a.Saapui[id], t1 = a.Lahti.TryGetValue(id, out var l) ? l : a.R[^1].t, seur = t0 - ennenS;
            var tulos = new List<Asento>();
            foreach (var r in a.R)
            {
                if (r.t < seur - 1e-6 || r.t > t1 + 1e-6) continue;
                seur += 0.5;
                var e = OpasKuvaus.KameraPaikka(r.a, k.Lat, k.Lon);
                tulos.Add(new Asento { T = r.t - t0, EtM = r.a.EtaisyysM, VaakaM = Math.Sqrt(e.e * e.e + e.n * e.n), SilmaM = e.u - MaaM, Suunta = (r.a.Suuntima % 360 + 360) % 360,
                    Kallistus = r.a.Kallistus, SilmaSuunta = (Math.Atan2(e.e, e.n) * 180 / Math.PI + 360) % 360 });
            }
            return tulos;
        }

        public static void TulostaAsennot(Ajo a, string id, double ennenS = 0)
        {
            Console.WriteLine($"      {id}: t s | katse-et m | vaaka m | silmä m | suunta ° | kallistus ° | silmä kohteesta °");
            foreach (var x in Asennot(a, id, ennenS)) Console.WriteLine($"      {x.T,5:F1} | {x.EtM,5:F0} | {x.VaakaM,5:F0} | {x.SilmaM,4:F0} | {x.Suunta,4:F0} | {x.Kallistus,4:F1} | {x.SilmaSuunta,4:F0}");
        }

        /// <summary>Taaksepäin (m) osuuksittain kuten PalloKierrosTestit: silmän eteneminen osuuden suunnassa lähdön jatkon hiivuttua
        /// (PalloLahtoHiipuuS) seuraavaan saapumiseen + lisäS.</summary>
        public static List<(string osuus, double m, double t)> Taaksepain(Ajo a, double lisaS = 0)
        {
            var l = new List<(string, double, double)>();
            for (int i = 0; i + 1 < a.Reitti.Length; i++)
            {
                var p = a.Reitti[i]; var q = a.Reitti[i + 1];
                if (!a.Lahti.TryGetValue(p.Id, out double t0) || !a.Saapui.TryGetValue(q.Id, out double t1)) continue;
                double ue = (q.Lon - p.Lon) * Math.Cos(p.Lat * Math.PI / 180), un = q.Lat - p.Lat, ul = Math.Sqrt(ue * ue + un * un); ue /= ul; un /= ul;
                double paras = double.MinValue, pahin = 0, pt = 0;
                foreach (var r in a.R)
                {
                    if (r.t < t0 + OpasSilmukka.PalloLahtoHiipuuS || r.t > t1 + lisaS) continue;
                    var e = OpasKuvaus.KameraPaikka(r.a, p.Lat, p.Lon);
                    double ete = e.e * ue + e.n * un;
                    if (ete > paras) paras = ete;
                    if (paras - ete > pahin) { pahin = paras - ete; pt = r.t; }
                }
                l.Add(($"{p.Id}→{q.Id}", pahin, pt));
            }
            return l;
        }

        [Testi] static void AsennotTulostus()
        {
            var a = Aja(Profiili.Normaali);
            foreach (var p in new[] { Profiili.Normaali, Profiili.Odotus })
                foreach (var x in Taaksepain(Aja(p))) Console.WriteLine($"      {p} taaksepäin {x.osuus}: {x.m:F1} m @ {x.t:F1} s");
            Console.WriteLine("      " + a.Loki);
            TulostaAsennot(a, "Q2981", 10);
            TulostaAsennot(a, "Q189503", 4);
            var d = PisimmatSeisahdukset(a); var d2 = PisimmatSeisahdukset(Aja(Profiili.Odotus));
            foreach (var k in a.Reitti)
                Console.WriteLine($"      | {k.Nimi} | {(d.TryGetValue(k.Id, out var x) ? $"{x.s:F1} ({x.vaihe})" : "0")} | {(d2.TryGetValue(k.Id, out var y) ? $"{y.s:F1} ({y.vaihe})" : "0")} |");
        }
    
        // ---- NOTRE-DAME (omistaja TF 180: "pysähdyksessä kamera laskeutuu nopeammin ja kaartaa länsijulkisivun eteen") ----
        /// <summary>Länsijulkisivun normaali (°, OSM-pohjapiirros, OpasKatseOletukset): kamera julkisivun edessä, kun silmä on kohteesta
        /// tähän suuntaan ±JulkisivuToleranssiAst.</summary>
        public const double JulkisivuSuunta = 297, JulkisivuToleranssiAst = 20;
        static double Kulmaero(double a, double b) => Math.Abs(KierrosLento.Kiedo(a - b));

        [Testi] static void NotreDameKiertaaLansijulkisivunEteenJaLaskeutuuAlkupuolella()
        {
            var viat = new List<string>();
            foreach (var p in new[] { Profiili.Normaali, Profiili.Odotus })
            {
                var a = Aja(p); var x = Asennot(a, "Q2981");
                Oleta.Tosi(x.Count > 10, $"{p}: Notre-Dame mitattu ({x.Count})");
                double kesto = x[^1].T, saapui = x[0].SilmaM, pienin = x.Min(y => y.SilmaM);
                var edessa = x.FirstOrDefault(y => Kulmaero(y.SilmaSuunta, JulkisivuSuunta) <= JulkisivuToleranssiAst);
                double valmis = x.First(y => y.SilmaM <= pienin + 1).T;
                Console.WriteLine($"      {p} Notre-Dame: pysähdys {kesto:F1} s, silmä saapuessa {saapui:F0} m → {pienin:F0} m (valmis {valmis:F1} s), silmän suunta {x[0].SilmaSuunta:F0}° → {x[^1].SilmaSuunta:F0}°, julkisivun edessä ±{JulkisivuToleranssiAst}° {(edessa.EtM > 0 ? $"{edessa.T:F1} s" : "ei")} – lähtö");
                // Kierto päättyy länsijulkisivun eteen (lähtöhetkellä silmä julkisivun suunnassa) ja on siellä vähintään viimeiset 5 s.
                if (Kulmaero(x[^1].SilmaSuunta, JulkisivuSuunta) > JulkisivuToleranssiAst) viat.Add($"{p}: lähdössä silmä {x[^1].SilmaSuunta:F0}° (julkisivu {JulkisivuSuunta}°)");
                if (edessa.EtM <= 0 || kesto - edessa.T < 5) viat.Add($"{p}: julkisivun edessä vasta {edessa.T:F1} s / {kesto:F1} s");
                // Laskeutuminen nopeammin: saapuminen esittelykorkeudella (TF 180: 117 m), lasku valmis kierron puolivälissä.
                if (saapui > 70) viat.Add($"{p}: silmä saapuessa {saapui:F0} m (> 70 m)");
                if (valmis > 0.55 * kesto) viat.Add($"{p}: laskeutuminen valmis {valmis:F1} s / {kesto:F1} s (> puoliväli)");
                // Kierto ei seisahdu julkisivun edessäkään (pitonopeus).
                for (int i = 1; i < x.Count; i++)
                    if (Kulmaero(x[i].SilmaSuunta, x[i - 1].SilmaSuunta) < 0.4) { viat.Add($"{p}: kierto alle 0,8 °/s @ {x[i].T:F1} s"); break; }
            }
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }

        // ---- CONCORDE (omistaja TF 180: "kierretään yhä liian kaukaa"; PT: alussa 110–140 m, lopussa 70–90 m, silmä 35–50 m) ----
        [Testi] static void ConcordeLahempaaJaMatalammalta()
        {
            var viat = new List<string>();
            foreach (var p in new[] { Profiili.Normaali, Profiili.Odotus })
            {
                var x = Asennot(Aja(p), "Q189503");
                Oleta.Tosi(x.Count > 10, $"{p}: Concorde mitattu");
                double alku = x[0].EtM, loppu = x[^1].EtM, silmaMin = x.Min(y => y.SilmaM), silmaMax = x.Max(y => y.SilmaM);
                Console.WriteLine($"      {p} Concorde: etäisyys {alku:F0} → {loppu:F0} m (vaaka {x[0].VaakaM:F0} → {x[^1].VaakaM:F0} m), silmä {silmaMin:F0}–{silmaMax:F0} m, kallistus {x[0].Kallistus:F0}° → {x[^1].Kallistus:F0}°");
                if (alku < 110 || alku > 140) viat.Add($"{p}: alussa {alku:F0} m (110–140)");
                if (loppu < 70 || loppu > 90) viat.Add($"{p}: lopussa {loppu:F0} m (70–90)");
                if (silmaMin < 33 || silmaMax > 50) viat.Add($"{p}: silmä {silmaMin:F0}–{silmaMax:F0} m (35–50)");
            }
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }

        /// <summary>Workerin luokka, katse_loppu ja lasku_osuus luetaan (OpasKohde.Lue); kehystys ottaa luokasta aukion ja torin; Notre-Damen
        /// oletus täyttää puuttuvan katsesuunnan mutta ei korvaa workerin omaa.</summary>
        [Testi] static void WorkerinKentatJaKatseenOletus()
        {
            OpasKohde L(Dictionary<string, object> j) { j["tyyppi"] = "pysahdys"; j["teksti"] = "x"; return OpasKohde.Lue(j); }
            var c = L(new Dictionary<string, object> { ["id"] = "Q189503", ["nimi"] = "Concorden aukio", ["lat"] = 48.8656331, ["lon"] = 2.3212357, ["koko_m"] = 360.0, ["luokka"] = "aukio", ["katse_suunta"] = 295.0, ["katse_kaari"] = 12.0 });
            Oleta.Sama("aukio", c.Luokka, "aukio kehystykseen");
            bool vanha = OpasSilmukka.PalloLento; OpasSilmukka.PalloLento = true;
            try { Oleta.Sama(OpasKuvaus.Luokka.Katu, OpasKuvaus.Luokittele(c), "aukio → katu-kehys (keskusmonumentti)"); }
            finally { OpasSilmukka.PalloLento = vanha; }
            var l = L(new Dictionary<string, object> { ["id"] = "Q19675", ["nimi"] = "Louvre", ["lat"] = 48.8611, ["lon"] = 2.3358, ["koko_m"] = 700.0, ["luokka"] = "rakennus" });
            Oleta.Tosi(l.Luokka == null && l.LuokkaWorker == "rakennus", "rakennus: luokka talteen, kehystys koon mukaan (ennallaan)");
            var n = L(new Dictionary<string, object> { ["id"] = "Q2981", ["nimi"] = "Notre-Dame", ["lat"] = 48.853, ["lon"] = 2.3498, ["koko_m"] = 128.0, ["korkeus_m"] = 96.0, ["luokka"] = "kirkko" });
            Oleta.Tosi(Math.Abs(n.KatseSuunta - 117) < 1e-9 && n.KatseLoppu && Math.Abs(n.LaskuOsuus - 0.5) < 1e-9, $"Notre-Damen oletus ({n.KatseSuunta}, {n.KatseLoppu}, {n.LaskuOsuus})");
            var w = L(new Dictionary<string, object> { ["id"] = "Q2981", ["nimi"] = "Notre-Dame", ["lat"] = 48.853, ["lon"] = 2.3498, ["koko_m"] = 128.0, ["katse_suunta"] = 100.0, ["katse_loppu"] = true, ["lasku_osuus"] = 0.6 });
            Oleta.Tosi(Math.Abs(w.KatseSuunta - 100) < 1e-9 && w.KatseLoppu && Math.Abs(w.LaskuOsuus - 0.6) < 1e-9, "workerin katse voittaa oletuksen");
            var e = L(new Dictionary<string, object> { ["id"] = "Q243", ["nimi"] = "Eiffel-torni", ["lat"] = 48.858296, ["lon"] = 2.294479, ["koko_m"] = 125.0 });
            Oleta.Tosi(double.IsNaN(e.KatseSuunta) && !e.KatseLoppu && e.LaskuOsuus == 1, "muut kohteet ilman oletusta");
        }
    }
}
