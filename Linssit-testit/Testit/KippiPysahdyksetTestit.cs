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
        { ["Q2981"] = 5, ["Q19675"] = 27, ["Q23402"] = 16, ["Q189503"] = 11, ["Q243"] = 6, ["Q64436"] = 21,
          ["Q217527"] = 7, ["Q754194"] = 12, ["Q847613"] = 2 };   // San Marco, kellotorni, Venceslas (simu 984010db6)
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

        public static OpasKohde[] PariisinReitti() => Reitti("pariisi");
        public static OpasKohde[] Reitti(string kaupunki)
        {
            var c = PalloKaupungitTestit.Lue().First(x => x.Id == kaupunki);
            return OpasReitti.Lyhin(c.Kohteet, k => (k.Lat, k.Lon), out _).ToArray();
        }

        /// <summary>Workerin vastaus JSONina (tools/pollo/worker.js pysähdys) → OpasKohde.Lue, kuten sovitin.</summary>
        /// <summary>Workerin esittely-v1g:n Notre-Dame-kentät (tuotannossa 11.10.): katse_suunta 117, katse_loppu true, lasku_osuus 0,5.</summary>
        static bool v1g;
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
            if (v1g && k.Id == "Q2981")
            {
                // Sama muoto kuin workerin vastaus (MiniJson: luku → double, true → bool).
                var w = (Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna("{\"katse_suunta\": 117, \"katse_loppu\": true, \"lasku_osuus\": 0.5}");
                foreach (var kv in w) j[kv.Key] = kv.Value;
            }
            return OpasKohde.Lue(j);
        }

        static readonly Dictionary<(Profiili, string, double, double, bool, bool, double, bool, double), Ajo> ajot = new Dictionary<(Profiili, string, double, double, bool, bool, double, bool, double), Ajo>();
        /// <summary>Listan korkeus_m (pöllö-PR #4384, tuotannossa 11.10.; kultainen data ennen sitä: 0): Brysselin kaupungintalo ja Palazzo Vecchio.</summary>
        static readonly Dictionary<string, double> ListanKorkeus = new Dictionary<string, double> { ["Q1255327"] = 96, ["Q271928"] = 94 };

        /// <summary>Pariisin kierros kaupunkitilan avauksesta (1,1 km / 50°, siirto ja avauksen kierto) kuten sovitin.</summary>
        /// <param name="tuloSuunta">Mistä suunnasta (°) kaupunkiin tullaan (siirron lähtöpaikka 50 km:n päässä; NaN = kaupungin päältä):
        /// avausnäkymä katsoo tulosuuntaan, joten 1. kohteen kehys riippuu siitä (simu 984010db6: San Marco idästä).</param>
        /// <param name="avausS">Avauksen ja opastuksen kesto ennen kierrosta (s; simu 984010db6 / 7f65898c3: ~51 s).</param>
        /// <param name="workerV1g">Notre-Damen katse workerin kentistä (esittely-v1g) eikä Ydin-oletuksesta.</param>
        /// <param name="kylvo">Sovitin syöttää kierroksen listan tornit ja kirkot esteiksi kierroksen alussa (false: listassa ei luokkaa,
        /// este selviää vasta esihaun vastauksesta perillä; simu 40f578863 San Marco).</param>
        /// <param name="suhde">Laitteen kuvasuhde (OpasKuvaus.KuvaSuhdeNyt; iPad vaaka 4:3, iPhone pysty 0,46, vaaka 2,17).</param>
        /// <param name="listanKorkeus">Listan korkeus_m (ListanKorkeus) kylvöön ja workerin vastaukseen kuten tuotannossa 11.10.</param>
        /// <param name="kaantoS">Laite kääntyy (kuvasuhde 4:3 → suhde) näin monta s 1. aukion saapumisen jälkeen; NaN = ei.</param>
        public static Ajo Aja(Profiili p = Profiili.Normaali, string kaupunki = "pariisi", double tuloSuunta = double.NaN, double avausS = 14, bool workerV1g = false, bool kylvo = true,
            double suhde = 4.0 / 3, bool listanKorkeus = false, double kaantoS = double.NaN)
        {
            var avain = (p, kaupunki, tuloSuunta, avausS, workerV1g, kylvo, suhde, listanKorkeus, kaantoS);
            if (ajot.TryGetValue(avain, out var valmis)) return valmis;
            v1g = workerV1g;
            bool vanha = OpasSilmukka.PalloLento; OpasSilmukka.PalloLento = true; double vanhaSuhde = OpasKuvaus.KuvaSuhdeNyt;
            OpasKuvaus.KuvaSuhdeNyt = double.IsNaN(kaantoS) ? suhde : 4.0 / 3;
            try
            {
                var reitti = Reitti(kaupunki);
                if (listanKorkeus) foreach (var k in reitti) if (ListanKorkeus.TryGetValue(k.Id, out double lk)) k.KorkeusM = lk;
                var c = PalloKaupungitTestit.Lue().First(x => x.Id == kaupunki);
                var ajo = new Ajo { Reitti = reitti };
                string kaantoAukio = reitti.FirstOrDefault(k => OpasKuvaus.AukioLuokka(k.Luokka))?.Id; bool kaannetty = false;
                var loki = new System.Text.StringBuilder();
                bool odotus = p == Profiili.Odotus;
                double vastausS = odotus ? 7 : 2, puheLisaS = odotus ? 5 : 0, t = 0, lentoAlkoi = double.NaN;
                double aLat = c.Lat, aLon = c.Lon;
                if (!double.IsNaN(tuloSuunta)) { aLat += 0.45 * Math.Cos(tuloSuunta * Math.PI / 180); aLon += 0.45 * Math.Sin(tuloSuunta * Math.PI / 180) / Math.Cos(c.Lat * Math.PI / 180); }
                var s = new OpasSilmukka(OpasSilmukka.Avauskuva(aLat, aLon)) { AvausEtaisyysOhitus = 1100, AvausKallistusOhitus = 50, PakotaSiirto = true, PyynnotSeis = true };
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
                    if (!kierrosAlkoi && s.Vaihe == OpasVaihe.Odottaa && s.VaiheAika >= avausS)
                    {
                        kierrosAlkoi = true; s.AloitaKierros(reitti.Select(k => (k.Nimi, k.Lat, k.Lon)).ToList()); loki.Append($"{t:F1} kierros alkaa; ");
                        // Kuten sovitin: listan luokka (kylvo) tai lukitun kaupungin luokaton lista (ei kylvöä, korkeus tuntematon).
                        if (kylvo) foreach (var k in reitti) s.LisaaEste(k.Lat, k.Lon, OpasSilmukka.EsteKorkeus(k.Luokka, listanKorkeus && k.KorkeusM > 0 ? k.KorkeusM : double.NaN), OpasSilmukka.PalloEsteSadeM, k.Luokka != null, k.Luokka);
                    }
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
                    if (!double.IsNaN(kaantoS) && !kaannetty && kaantoAukio != null && ajo.Saapui.TryGetValue(kaantoAukio, out double ka0) && t >= ka0 + kaantoS)
                    { kaannetty = true; OpasKuvaus.KuvaSuhdeNyt = suhde; loki.Append($"{t:F1} kuvasuhde {suhde:F2}; "); }
                    var vaihe0 = s.Vaihe; var nyk0 = s.Nykyinen?.Id;
                    s.Paivita(Dt, _ => MaaM, laatat);
                    if (vaihe0 != OpasVaihe.Lentaa && s.Vaihe == OpasVaihe.Lentaa && nyk0 != null && !ajo.Lahti.ContainsKey(nyk0)) ajo.Lahti[nyk0] = t;
                    string kohde = s.Nykyinen?.Id;
                    ajo.R.Add((t, s.Asento, kohde, s.Vaihe));
                    if (log.Paivita(t, s.Asento, kohde, OpasNopeusloki.Vaihe(s)) is OpasNopeusloki.Nayte nn) ajo.N.Add(nn);
                    if (kierrosAlkoi && kohde == reitti[^1].Id && hiljaa.Count == 0 && s.Vaihe != OpasVaihe.Puhuu && !s.KierrosKaynnissa) break;
                }
                ajo.Loki = loki.ToString();
                return ajot[avain] = ajo;
            }
            finally { OpasSilmukka.PalloLento = vanha; OpasKuvaus.KuvaSuhdeNyt = vanhaSuhde; }
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
                // Kaikki: avaus ja opastus (kohde -, simu 984010db6: 20 s paikallaan), 1. lento ja kierroksen pysähdykset; tumma siirtoruutu ei.
                foreach (var x in lista) viat.Add($"{p} {x.Kohde ?? "avaus"} {x.Alku:F1} s {x.Kesto:F1} s ({x.Vaihe})");
                // Avaus ei seiso (PT 11.10.): avauksen ja opastuksen aikana kuva kääntyy koko ajan ≥ 1 °/s, ja 1. lento jatkaa liikettä.
                var avaus = a.N.Where(n => n.Kohde == null && (n.Vaihe == "odotus" || n.Vaihe == "lento")).ToList();
                double avausMin = avaus.Count > 0 ? avaus.Min(n => Math.Max(n.Kulma, n.V / Math.Max(1e-6, OpasNopeusloki.SeisOsuus * mn))) : 0;
                Console.WriteLine($"        avaus {avaus.Count} näytettä, pienin kulma {(avaus.Count > 0 ? avaus.Min(n => n.Kulma) : 0):F2} °/s, pienin v {(avaus.Count > 0 ? avaus.Min(n => n.V) : 0):F2} m/s");
                if (avaus.Count < 50 || avausMin < 1) viat.Add($"{p} avaus: liike alle rajan ({avausMin:F2})");
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
                    double mn = Math.Min(OpasNopeusloki.Matkanopeus(n), KaupunkiRajaMaxMS / OpasNopeusloki.SeisOsuus); mnMin = Math.Min(mnMin, mn);
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
            foreach (var (p, avausS, worker) in new[] { (Profiili.Normaali, 14.0, false), (Profiili.Odotus, 14.0, false), (Profiili.Normaali, 51.0, false),
                (Profiili.Normaali, 51.0, true), (Profiili.Normaali, 14.0, true), (Profiili.Normaali, 75.0, true), (Profiili.Normaali, 0.0, true) })
            {
                var a = Aja(p, "pariisi", double.NaN, avausS, worker); var x = Asennot(a, "Q2981");
                Oleta.Tosi(x.Count > 10, $"{p}: Notre-Dame mitattu ({x.Count})");
                double kesto = x[^1].T, saapui = x[0].SilmaM, pienin = x.Min(y => y.SilmaM);
                var edessa = x.FirstOrDefault(y => Kulmaero(y.SilmaSuunta, JulkisivuSuunta) <= JulkisivuToleranssiAst);
                double valmis = x.First(y => y.SilmaM <= pienin + 1).T;
                Console.WriteLine($"      {p} avaus {avausS:F0} s {(worker ? "worker v1g" : "Ydin-oletus")} Notre-Dame: pysähdys {kesto:F1} s, silmä saapuessa {saapui:F0} m → {pienin:F0} m (valmis {valmis:F1} s), silmän suunta {x[0].SilmaSuunta:F0}° → {x[^1].SilmaSuunta:F0}°, julkisivun edessä ±{JulkisivuToleranssiAst}° {(edessa.EtM > 0 ? $"{edessa.T:F1} s" : "ei")} – lähtö");
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
    
        /// <summary>
        /// SAAPUMISESSA EI KUOPPAA (simu 984010db6, PT 11.10.: Concorde ja Champs-Élysées hidastuivat 1,5 m/s:iin ja kuva kääntyi
        /// &lt; 1 °/s 1,6–2,6 s ennen kierron kiihtymistä): jokaisella saapumisella (lento → kierto) kuva kääntyy ≥ SaapumisKulmaMin
        /// koko ikkunan −2 … +3 s, tai silmä liikkuu ≥ 10 % lentojen mediaanista. Pariisi (molemmat profiilit): ei yli SaapumisKuoppaMaxS;
        /// 37 kaupunkia: ei yli SeisMinS. Hetkellinen kuoppa (≤ 0,5 s / ≤ 1 s) jää: lennon oma kääntö ja kierto ovat saapuessa aina
        /// vastakkaiset (kääntöraja vie kehyksen sivuun, kierto jatkaa silmää poispäin tulosuunnan takaa), joten kuvan kääntönopeus
        /// vaihtaa etumerkkiä lennon viimeisellä sekunnilla; tulostetaan.
        /// </summary>
        public const double SaapumisKulmaMin = 1.0, SaapumisKuoppaMaxS = 0.5;
        /// <summary>37 kaupungin seisahdusraja enintään (m/s, Pariisin taso ~10 % × 51 m/s): Tukholman pitkien lentojen mediaani nosti
        /// rajan yli kierron oman nopeuden (lähtö Riddarholmenilta 8,3 m/s ei ole seisahdus).</summary>
        public const double KaupunkiRajaMaxMS = 5.0;
        static List<string> SaapumisKuopat(List<OpasNopeusloki.Nayte> n, string nimi, double maxS, ISet<string> ohita = null)
        {
            var viat = new List<string>();
            double raja = Math.Min(KaupunkiRajaMaxMS, OpasNopeusloki.SeisOsuus * OpasNopeusloki.Matkanopeus(n));
            for (int i = 1; i < n.Count; i++)
            {
                if (n[i - 1].Vaihe != "lento" || n[i].Vaihe == "lento" || n[i].Kohde == null || n[i].Vaihe == "siirto" || (ohita?.Contains(n[i].Kohde) ?? false)) continue;
                double t0 = n[i].T, minK = double.MaxValue, minT = 0, kesto = 0, pisin = 0;
                foreach (var x in n)
                {
                    if (x.T < t0 - 2 || x.T > t0 + 3) continue;
                    bool kuoppa = x.V < raja && x.Kulma < SaapumisKulmaMin;
                    kesto = kuoppa ? kesto + OpasNopeusloki.ValiS : 0; pisin = Math.Max(pisin, kesto);
                    if (x.V < raja && x.Kulma < minK) { minK = x.Kulma; minT = x.T - t0; }
                }
                if (pisin > maxS + 1e-6) viat.Add($"{nimi} {n[i].Kohde} @ {t0:F1} s: kulma {minK:F2} °/s ({minT:+0.0;-0.0} s), alle {SaapumisKulmaMin} °/s {pisin:F1} s");
                else if (minK < SaapumisKulmaMin) Console.WriteLine($"      (hetkellinen {nimi} {n[i].Kohde} @ {t0:F1} s: kulma {minK:F2} °/s, {pisin:F1} s)");
            }
            return viat;
        }

        [Testi] static void SaapumisessaEiKuoppaa()
        {
            var viat = new List<string>();
            foreach (var p in new[] { Profiili.Normaali, Profiili.Odotus }) viat.AddRange(SaapumisKuopat(Aja(p).N, $"Pariisi {p}", SaapumisKuoppaMaxS));
            foreach (var c in PalloKaupungitTestit.Lue())
                foreach (bool hidas in new[] { false, true })
                {
                    var n = new List<OpasNopeusloki.Nayte>(); var log = new OpasNopeusloki(); var korkealta = new HashSet<string>(); double edEt = 0; var edV = OpasVaihe.Alku;
                    PalloKaupungitTestit.Aja(c, hidas, kehys: (s, t) =>
                    {
                        if (s.Vaihe == OpasVaihe.Lentaa && edV != OpasVaihe.Lentaa && edEt >= OpasSilmukka.AvausKorkeaM && s.Nykyinen?.Id != null) korkealta.Add(s.Nykyinen.Id);
                        if (s.Nykyinen?.Id != null && s.Nykyinen.Id == c.Kohteet[0].Id) korkealta.Add(s.Nykyinen.Id);
                        edV = s.Vaihe; edEt = s.Asento.EtaisyysM;
                        if (log.Paivita(t, s.Asento, s.Nykyinen?.Id, OpasNopeusloki.Vaihe(s)) is OpasNopeusloki.Nayte x) n.Add(x);
                    });
                    viat.AddRange(SaapumisKuopat(n, $"{c.Nimi} {(hidas ? "Hidas" : "Nopea")}", OpasNopeusloki.SeisMinS, korkealta));
                }
            foreach (var v in viat) Console.WriteLine("      KUOPPA " + v);
            Oleta.Tosi(viat.Count == 0, $"{viat.Count} saapumisessa kuoppa: {string.Join("; ", viat.Take(8))}");
        }

        // ---- AUKION KIERTO JA KORKEAT RAKENTEET (simu 984010db6, PT 11.10.: San Marcon kierto kulki kellotornin läpi) ----
        /// <summary>Aukion kierrolla (saapumista 2 s ennen → lähtö; aiemmin lähtö edellisen kohteen, esim. Krakovan Mariankirkon, vierestä) silmä ei kulje korkean rakenteen vierestä alle EsteVaraM:n, ellei
        /// se ole rakenteen huipun + PalloEsteVaraM:n yläpuolella. Rakenteet: saman kierroksen muut kohteet (korkeus_m tai luokka
        /// torni/kirkko nimelliskorkeudella), säde min(15, koko/2).</summary>
        public const double EsteVaraM = 30;
        public sealed class AukioMittaus { public string Kaupunki, Aukio, Este = "-"; public double Vapaa = double.MaxValue, SilmaMin = double.MaxValue; public int Rikkeita; public bool VanhaKehys; }
        public static List<AukioMittaus> MittaaAukiot(string kaupunki, double tuloSuunta = double.NaN)
        {
            var a = Aja(Profiili.Normaali, kaupunki, tuloSuunta); var tulos = new List<AukioMittaus>();
            foreach (var q in a.Reitti.Where(k => OpasKuvaus.AukioLuokka(k.Luokka)))
            {
                if (!a.Saapui.TryGetValue(q.Id, out double t0)) continue;
                double t1 = a.Lahti.TryGetValue(q.Id, out var l) ? l : a.R[^1].t;
                var m = new AukioMittaus { Kaupunki = kaupunki, Aukio = q.Nimi };
                // PT 11.10.: torni tai korkea kohde alle 150 m:n päässä → vanha kehys (OpasSilmukka.AukioEsteenVieressa).
                m.VanhaKehys = a.Reitti.Any(x => x.Id != q.Id && (x.KorkeusM > 0 ? x.KorkeusM : OpasSilmukka.EsteKorkeusLuokasta(x.Luokka)) >= OpasSilmukka.PalloEsteMinM
                    && KierrosLento.EtaisyysM(x.Lat, x.Lon, q.Lat, q.Lon) is double dd && dd > 20 && dd < OpasSilmukka.PalloAukioEsteRajaM);
                foreach (var x in a.Reitti)
                {
                    if (x.Id == q.Id || KierrosLento.EtaisyysM(x.Lat, x.Lon, q.Lat, q.Lon) > 400) continue;
                    double h = x.KorkeusM > 0 ? x.KorkeusM : OpasSilmukka.EsteKorkeusLuokasta(x.Luokka), sade = Math.Min(15, 0.5 * x.KokoM);
                    if (h < OpasSilmukka.PalloEsteMinM) continue;
                    foreach (var r in a.R)
                    {
                        if (r.t < t0 - 2 || r.t > t1 || r.kohde != q.Id) continue;
                        var e = OpasKuvaus.KameraPaikka(r.a, x.Lat, x.Lon);
                        double silma = e.u - MaaM, vapaa = Math.Sqrt(e.e * e.e + e.n * e.n) - sade;
                        if (silma >= h + OpasSilmukka.PalloEsteVaraM - 1) continue;   // yläpuolella
                        if (vapaa < m.Vapaa) { m.Vapaa = vapaa; m.Este = $"{x.Nimi} {h:F0} m"; }
                        if (vapaa < EsteVaraM) m.Rikkeita++;
                    }
                }
                foreach (var r in a.R) if (r.t >= t0 && r.t <= t1 && r.kohde == q.Id && r.v != OpasVaihe.Lentaa) m.SilmaMin = Math.Min(m.SilmaMin, OpasKuvaus.KameraPaikka(r.a, q.Lat, q.Lon).u - MaaM);
                tulos.Add(m);
            }
            return tulos;
        }

        [Testi] static void AukionKiertoVaistaaKorkeatRakenteet()
        {
            var viat = new List<string>(); int n = 0;
            Console.WriteLine("      | Kaupunki | aukio | kehys | lähin este (silmä alle huipun + 15 m) | vapaa m | silmä min m | rikkeitä |");
            foreach (var c in PalloKaupungitTestit.Lue().Where(c => c.Kohteet.Any(k => OpasKuvaus.AukioLuokka(k.Luokka))))
                foreach (var m in MittaaAukiot(c.Id))
                {
                    n++;
                    Console.WriteLine($"      | {c.Nimi} | {m.Aukio} | {(m.VanhaKehys ? "vanha (este < 150 m)" : "aukio")} | {m.Este} | {(m.Vapaa == double.MaxValue ? "-" : m.Vapaa.ToString("F0"))} | {m.SilmaMin:F0} | {m.Rikkeita} |");
                    if (m.Rikkeita > 0) viat.Add($"{c.Nimi} {m.Aukio}: {m.Este} {m.Vapaa:F0} m");
                    if (!m.VanhaKehys && m.SilmaMin < OpasKuvaus.PalloAukioKattoMinM - 1) viat.Add($"{c.Nimi} {m.Aukio}: silmä {m.SilmaMin:F0} m");
                }
            // San Marco joka tulosuunnasta (simu: idästä, kierto kellotornin läpi): kellotorni ohitetaan yläpuolelta tai ≥ EsteVaraM:n päästä.
            for (int su = 0; su < 360; su += 45)
            {
                var sm = MittaaAukiot("venetsia", su).First(m => m.Aukio == "Pyhän Markuksen tori");
                Console.WriteLine($"      San Marco tulosuunta {su}°: lähin {sm.Este}, vapaa {(sm.Vapaa == double.MaxValue ? "-" : sm.Vapaa.ToString("F0"))} m, silmä min {sm.SilmaMin:F0} m, rikkeitä {sm.Rikkeita}");
                if (sm.Rikkeita > 0) viat.Add($"San Marco {su}°: {sm.Este} {sm.Vapaa:F0} m");
            }
            Oleta.Tosi(n >= 18, $"aukioita mitattu {n}");
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }

        /// <summary>
        /// PT 11.10. (simu 4409d1dfa): San Marco kellotornin vieressä vanhalla kehyksellä (koon mukaan, ei aukion lähikehystä eikä
        /// esteen yli nousua; torni ja tori korkealta), Venceslauksen aukio (750 m) kauempaa ja korkeammalta kuin muut aukiot.
        /// </summary>
        [Testi] static void SanMarcoVanhallaKehyksellaJaVenceslasKauempaa()
        {
            var viat = new List<string>();
            foreach (double su in new[] { double.NaN, 0, 315 })
            {
                var a = Aja(Profiili.Normaali, "venetsia", su); var x = Asennot(a, "Q217527");
                double s0 = x[0].SilmaM, smax = x.Max(y => y.SilmaM);
                Console.WriteLine($"      San Marco ({(double.IsNaN(su) ? "-" : su.ToString("F0"))}°): saapuessa et {x[0].EtM:F0} m, silmä {s0:F0} m, kallistus {x[0].Kallistus:F0}°, silmä enintään {smax:F0} m");
                // PT 11.10. 05.2x (TorniKuvaan): katsepiste tornin puolelle ja ylemmäs, katse-etäisyys ~200 m (vaakasäde sama), raja 200 → 190 m.
                if (x[0].EtM < 190 || s0 < 60) viat.Add($"San Marco {su}: ei vanhaa kehystä (et {x[0].EtM:F0}, silmä {s0:F0})");
                if (smax > s0 + 10) viat.Add($"San Marco {su}: silmä nousi {s0:F0} → {smax:F0} m");
            }
            // Este selviää vasta perillä (simu 40f578863: lukitun kaupungin lista ilman luokkaa, kellotornin korkeus vasta esihaun
            // vastauksesta San Marcon pysähdyksellä): kierroksen tuntemattoman korkeuden naapuri alle 150 m:n päässä → vanha kehys heti.
            foreach (double su in new[] { double.NaN, 0, 315 })
            {
                var a2 = Aja(Profiili.Normaali, "venetsia", su, 14, false, false); var x2 = Asennot(a2, "Q217527");
                double vmax = 0; for (int i = 1; i < x2.Count; i++)
                {
                    var (p0, p1) = (x2[i - 1], x2[i]);
                    double dh = p1.SilmaM - p0.SilmaM, dv = p1.VaakaM - p0.VaakaM;
                    vmax = Math.Max(vmax, Math.Sqrt(dh * dh + dv * dv) / 0.5);
                }
                Console.WriteLine($"      San Marco ilman kylvöä ({(double.IsNaN(su) ? "-" : su.ToString("F0"))}°): saapuessa et {x2[0].EtM:F0} m / silmä {x2[0].SilmaM:F0} m, lopussa et {x2[^1].EtM:F0} m / silmä {x2[^1].SilmaM:F0} m, silmä enintään {x2.Max(y => y.SilmaM):F0} m, säteen ja korkeuden muutos enintään {vmax:F1} m/s");
                if (x2[0].EtM < 190 || x2[0].SilmaM < 85) viat.Add($"San Marco ilman kylvöä {su}: saapuessa et {x2[0].EtM:F0}, silmä {x2[0].SilmaM:F0}");
                if (x2.Max(y => y.SilmaM) > 110) viat.Add($"San Marco ilman kylvöä {su}: silmä nousi {x2.Max(y => y.SilmaM):F0} m:iin");
                if (vmax > OpasKuvaus.KaariNopeusMS + 1) viat.Add($"San Marco ilman kylvöä {su}: kehyksen vaihto {vmax:F1} m/s");
            }
            var v = Asennot(Aja(Profiili.Normaali, "praha"), "Q847613"); var vs = Asennot(Aja(Profiili.Normaali, "praha"), "Q421678");
            Console.WriteLine($"      Venceslas: et {v[0].EtM:F0} → {v[^1].EtM:F0} m, silmä {v.Min(y => y.SilmaM):F0}–{v.Max(y => y.SilmaM):F0} m; Vanhankaupungin aukio (kello 97 m): et {vs[0].EtM:F0} m, silmä {vs[0].SilmaM:F0} m");
            if (v[0].EtM < 180 || v[0].SilmaM < 50) viat.Add($"Venceslas: alku {v[0].EtM:F0} m, silmä {v[0].SilmaM:F0} m");
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }

        // ---- TORNI KOKONAAN KUVASSA (PT 11.10. 05.2x, todistus-aukiot-jalkeen4-181: San Marcon pysähdyksen lopussa kellotorni
        // valui kierron mukana kuvan oikeaan reunaan) ----
        /// <summary>Tornin (juuri ja huippu, säde min(15, koko/2)) ja torin pisteen paikka kuvassa joka 0,5 s saapumisesta lähtöön:
        /// suurin |x|/|y| (−1…1 = reuna, iPad vaaka 4:3, pystykulma 50°) koko pysähdyksellä ja lopussa.</summary>
        /// <param name="tLat">Tornin todellinen paikka, jos eri kuin listan piste (NaN = listan piste; säde silloin PalloTorniSadeM).</param>
        public static (double koko, double loppu, double tori, int n) TorniKuvassa(Ajo a, string aukio, string torni, double alkaenS = 0, double suhde = 4.0 / 3,
            double tLat = double.NaN, double tLon = double.NaN)
        {
            var q = a.Reitti.First(x => x.Id == aukio); var t = a.Reitti.First(x => x.Id == torni);
            double h = t.KorkeusM > 0 ? t.KorkeusM : OpasSilmukka.EsteKorkeusLuokasta(t.Luokka);   // kuten kylvö: luokan nimelliskorkeus
            double t0 = a.Saapui[aukio], t1 = a.Lahti.TryGetValue(aukio, out var l) ? l : a.R[^1].t, seur = t0 + alkaenS, koko = 0, loppu = 0, tori = 0; int n = 0;
            foreach (var r in a.R)
            {
                if (r.t < seur - 1e-6 || r.t > t1 + 1e-6 || r.kohde != aukio) continue;
                seur += 0.5; n++;
                double m = double.IsNaN(tLat) ? OpasKuvaus.KuvassaOsuus(r.a, t.Lat, t.Lon, MaaM, MaaM + h, Math.Min(15, 0.5 * t.KokoM), suhde)
                    : OpasKuvaus.KuvassaOsuus(r.a, tLat, tLon, MaaM, MaaM + h, OpasSilmukka.PalloTorniSadeM, suhde);
                koko = Math.Max(koko, m); loppu = m;
                tori = Math.Max(tori, OpasKuvaus.KuvassaOsuus(r.a, q.Lat, q.Lon, MaaM, MaaM, 0, suhde));
            }
            return (koko, loppu, tori, n);
        }

        /// <summary>Raja: torni ja tori kuvassa 5 %:n marginaalilla (kuvan reunassa korin köydet).</summary>
        public const double TorniReuna = 0.9;

        [Testi] static void SanMarcoKellotorniKuvassaKokoKierron()
        {
            var viat = new List<string>();
            // Kellotorni (Q754194, 99 m, 81 m torin pisteestä itään) joka tulosuunnasta, kylvö tuotannon tapaan (liiku-listan luokka ja korkeus_m).
            foreach (double su in new[] { double.NaN, 0, 45, 90, 135, 180, 225, 270, 315 })
            {
                var a = Aja(Profiili.Normaali, "venetsia", su); var x = Asennot(a, "Q217527");
                var m = TorniKuvassa(a, "Q217527", "Q754194");
                double kaari = 0; for (int i = 1; i < x.Count; i++) kaari += Math.Abs(KierrosLento.Kiedo(x[i].SilmaSuunta - x[i - 1].SilmaSuunta));
                double kesto = x.Count > 1 ? x[^1].T - x[0].T : 0;
                Console.WriteLine($"      San Marco ({(double.IsNaN(su) ? "-" : su.ToString("F0"))}°): torni enintään {m.koko:F2}, lopussa {m.loppu:F2}, tori enintään {m.tori:F2} ({m.n} näytettä), kierto {kaari:F0}° / {kesto:F0} s, silmä {x[0].SilmaM:F0}–{x.Max(y => y.SilmaM):F0} m");
                if (m.n < 10) viat.Add($"San Marco {su}: näytteitä {m.n}");
                if (m.koko > TorniReuna) viat.Add($"San Marco {su}: torni {m.koko:F2} (lopussa {m.loppu:F2})");
                if (m.tori > TorniReuna) viat.Add($"San Marco {su}: tori {m.tori:F2}");
            }
            // Ilman kylvöä (lista ilman luokkaa, simu 40f578863): torni selviää vasta perillä, kehys siirtyy PalloKehysSiirtoS:ssä → lopussa kuvassa.
            foreach (double su in new[] { double.NaN, 0, 315 })
            {
                var a = Aja(Profiili.Normaali, "venetsia", su, 14, false, false);
                var m = TorniKuvassa(a, "Q217527", "Q754194");
                Console.WriteLine($"      San Marco ilman kylvöä ({(double.IsNaN(su) ? "-" : su.ToString("F0"))}°): torni enintään {m.koko:F2}, lopussa {m.loppu:F2}, tori enintään {m.tori:F2}");
                if (m.loppu > TorniReuna || m.tori > TorniReuna) viat.Add($"San Marco ilman kylvöä {su}: lopussa torni {m.loppu:F2}, tori {m.tori:F2}");
            }
            // Muut aukiot korkean (≥ 60 m) tornin tai kirkon vieressä (alle 150 m): sama tilanne ja sama kehys (Concorde, Venceslas ym. ennallaan).
            foreach (var (kaupunki, aukio, torni) in new[] { ("praha", "Q421678", "Q729370"), ("helsinki", "Q1329554", "Q738015"), ("krakova", "Q770631", "Q1143171"), ("sisilia", "Q1665695", "Q2066497") })
            {
                var a = Aja(Profiili.Normaali, kaupunki);
                if (!a.Saapui.ContainsKey(aukio)) { viat.Add($"{kaupunki} {aukio}: ei saavuttu"); continue; }
                var p = TorniKuvassa(a, aukio, torni);
                Console.WriteLine($"      {a.Reitti.First(x => x.Id == aukio).Nimi}: {a.Reitti.First(x => x.Id == torni).Nimi} enintään {p.koko:F2}, lopussa {p.loppu:F2}, aukio enintään {p.tori:F2}");
                if (p.koko > TorniReuna || p.tori > TorniReuna) viat.Add($"{kaupunki} {aukio}: torni {p.koko:F2}, aukio {p.tori:F2}");
            }
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }

        // ---- TORNI KUVASSA LAITTEEN KUVASUHTEELLA (PT 11.10. 07.3x: iPhonella pallo sekä pysty- ~0,46 että vaakakuvana ~2,17;
        // pystyssä 80 m:n päässä oleva torni leikkautui sivuilta, kun tornisääntö oletti iPadin 4:3:n; 07.5x: pystyssä kierto tornin
        // ympäri viistosti ≥ 55°, ei karttamaista yläkuvaa) ----
        static readonly (string kaupunki, string aukio, string torni)[] TorniAukiot =
            { ("venetsia", "Q217527", "Q754194"), ("bryssel", "Q215429", "Q1255327"), ("firenze", "Q849846", "Q271928") };

        [Testi] static void TorniKuvassaKaikillaKuvasuhteilla()
        {
            var viat = new List<string>();
            foreach (double suhde in new[] { 0.46, 4.0 / 3, 2.17 })
                foreach (var (kaupunki, aukio, torni) in TorniAukiot)
                {
                    var a = Aja(Profiili.Normaali, kaupunki, double.NaN, 14, false, true, suhde, true);
                    if (!a.Saapui.ContainsKey(aukio)) { viat.Add($"{kaupunki} {suhde:F2}: ei saavuttu"); continue; }
                    var m = TorniKuvassa(a, aukio, torni, 0, suhde); var x = Asennot(a, aukio);
                    double kaari = 0; for (int i = 1; i < x.Count; i++) kaari += Math.Abs(KierrosLento.Kiedo(x[i].Suunta - x[i - 1].Suunta));   // kameran suunta: kierto katsepisteen ympäri
                    double kesto = x.Count > 1 ? x[^1].T - x[0].T : 1;
                    double kallMin = x.Min(y => y.Kallistus), silmaMax = x.Max(y => y.SilmaM);
                    Console.WriteLine($"      {kaupunki} {suhde:F2}: torni enintään {m.koko:F2}, lopussa {m.loppu:F2}, tori enintään {m.tori:F2} ({m.n}), silmä {x[0].SilmaM:F0}–{silmaMax:F0} m, kallistus {kallMin:F0}–{x.Max(y => y.Kallistus):F0}°, et {x[0].EtM:F0} m, kierto {kaari / kesto:F1} °/s");
                    if (m.n < 10) viat.Add($"{kaupunki} {suhde:F2}: näytteitä {m.n}");
                    if (m.koko > TorniReuna) viat.Add($"{kaupunki} {suhde:F2}: torni {m.koko:F2}");
                    // Pystykuva (PT 11.10. 07.5x): viisto pallonäkymä ≥ 55° ja torni keskellä; torista saa leikkautua osa. Vaaka: myös tori.
                    if (suhde < 1 && kallMin < 55) viat.Add($"{kaupunki} {suhde:F2}: kallistus {kallMin:F0}° (< 55°)");
                    if (suhde < 1 && kaari / kesto < 2.9) viat.Add($"{kaupunki} {suhde:F2}: kierto {kaari / kesto:F1} °/s");
                    if (suhde >= 1 && m.tori > TorniReuna) viat.Add($"{kaupunki} {suhde:F2}: tori {m.tori:F2}");
                }
            // iPad vaaka ennallaan: 4:3 ja 2,17 (leveämpi) antavat saman kehyksen kuin oletus.
            var ipad = Asennot(Aja(Profiili.Normaali, "venetsia"), "Q217527"); var leve = Asennot(Aja(Profiili.Normaali, "venetsia", double.NaN, 14, false, true, 2.17), "Q217527");
            if (ipad.Count != leve.Count || ipad.Zip(leve, (u, v) => Math.Abs(u.SilmaM - v.SilmaM) + Math.Abs(u.EtM - v.EtM)).Max() > 1e-9) viat.Add("2,17 eri kehys kuin 4:3");
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }

        [Testi] static void LaiteKaantyyKeskenPysahdyksen()
        {
            // iPhone kääntyy vaakakuvasta (4:3:n kehys) pystyyn (0,46) 4 s aukiolle saapumisen jälkeen: kehys vaihtuu pehmeästi (silmän
            // nopeuden muutos ≤ 0,3 m/s ruudulta toiselle, ~9 m/s² pysähdyksellä ja lähdön saumassa) ja lopussa torni ja tori kuvassa.
            var viat = new List<string>();
            foreach (var (kaupunki, aukio, torni, suhde, kS) in new[] { ("venetsia", "Q217527", "Q754194", 0.46, 4.0), ("bryssel", "Q215429", "Q1255327", 0.46, 4.0), ("firenze", "Q849846", "Q271928", 0.46, 4.0) })
            {
                var a = Aja(Profiili.Normaali, kaupunki, double.NaN, 14, false, true, suhde, true, kS);
                var m = TorniKuvassa(a, aukio, torni, 0, suhde);
                double t0 = a.Saapui[aukio], t1 = a.Lahti.TryGetValue(aukio, out var l) ? l : a.R[^1].t, dvMax = 0, vMax = 0; string dvKohta = "-";
                var q = a.Reitti.First(x => x.Id == aukio);
                (double e, double n, double u)? e1 = null, e2 = null;
                foreach (var r in a.R)
                {
                    if (r.t < t0 || r.t > t1 + 0.2) continue;   // pysähdys ja lähdön sauma (lento itse saa kiihtyä)
                    var e = OpasKuvaus.KameraPaikka(r.a, q.Lat, q.Lon);
                    if (e1 is var (ae, an, au) && e2 is var (be, bn, bu))
                    {
                        double v1x = (ae - be) / Dt, v1y = (an - bn) / Dt, v1z = (au - bu) / Dt, v2x = (e.e - ae) / Dt, v2y = (e.n - an) / Dt, v2z = (e.u - au) / Dt;
                        double dv = Math.Sqrt((v2x - v1x) * (v2x - v1x) + (v2y - v1y) * (v2y - v1y) + (v2z - v1z) * (v2z - v1z));
                        if (dv > dvMax) { dvMax = dv; dvKohta = $"{r.t - t0:F1} s {r.v}"; }
                        vMax = Math.Max(vMax, Math.Sqrt(v2x * v2x + v2y * v2y + v2z * v2z));
                    }
                    e2 = e1; e1 = e;
                }
                Console.WriteLine($"      {kaupunki} kääntö {kS} → {suhde:F2}: torni lopussa {m.loppu:F2}, tori enintään {m.tori:F2}, silmän nopeus enintään {vMax:F1} m/s, nopeuden hyppy enintään {dvMax:F2} m/s ({dvKohta}; lähtö {t1 - t0:F1} s)");
                if (m.loppu > TorniReuna) viat.Add($"{kaupunki}: lopussa torni {m.loppu:F2}");
                if (dvMax > 0.3) viat.Add($"{kaupunki}: nopeuden hyppy {dvMax:F2} m/s");
            }
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }

        [Testi] static void PystykuvaKestaaTorninPaikkavirheen()
        {
            // PT 11.10. 08.2x (iPhone-ajo 137402c0b): Grand-Placen kaupungintalon listan piste on rakennuksen piste; torni ~23 m sivussa
            // (OSM/PT 50.84647/4.35197) valui pystykuvassa ulos. Torni kuvassa, kun se on listan pisteessä, 30 m sivussa mihin tahansa
            // suuntaan tai OSM-paikassa; kallistus ≥ 55°, silmä tornin huipun yläpuolella, kierto ≥ 2,9 °/s. San Marco (torni-luokka) ja
            // Signoria: listan piste ja 15 m (torni) / 30 m sivussa.
            var viat = new List<string>();
            foreach (var (kaupunki, aukio, torni, virhe) in new[] { ("bryssel", "Q215429", "Q1255327", 30.0), ("venetsia", "Q217527", "Q754194", 15.0), ("firenze", "Q849846", "Q271928", 30.0) })
            {
                var a = Aja(Profiili.Normaali, kaupunki, double.NaN, 14, false, true, 0.46, true);
                var t = a.Reitti.First(x => x.Id == torni); var x = Asennot(a, aukio);
                double kM = 111195, kE = 111195 * Math.Cos(t.Lat * Math.PI / 180), pahin = TorniKuvassa(a, aukio, torni, 0, 0.46).koko;
                string pahinKohta = "listan piste";
                var paikat = new List<(string, double, double)>();
                for (int i = 0; i < 8; i++) paikat.Add(($"{virhe:F0} m suuntaan {45 * i}°", t.Lat + virhe * Math.Cos(i * Math.PI / 4) / kM, t.Lon + virhe * Math.Sin(i * Math.PI / 4) / kE));
                if (kaupunki == "bryssel") paikat.Add(("OSM 50.84647/4.35197", 50.84647, 4.35197));
                foreach (var (nimi, la, lo) in paikat)
                {
                    double m = TorniKuvassa(a, aukio, torni, 0, 0.46, la, lo).koko;
                    if (m > pahin) { pahin = m; pahinKohta = nimi; }
                }
                double kaari = 0; for (int i = 1; i < x.Count; i++) kaari += Math.Abs(KierrosLento.Kiedo(x[i].Suunta - x[i - 1].Suunta));
                double kierto = kaari / Math.Max(1, x[^1].T - x[0].T), kallMin = x.Min(y => y.Kallistus), silmaMin = x.Min(y => y.SilmaM);
                Console.WriteLine($"      {kaupunki} pysty: torni enintään {pahin:F2} ({pahinKohta}), silmä {silmaMin:F0}–{x.Max(y => y.SilmaM):F0} m (torni {t.KorkeusM:F0} m), kallistus {kallMin:F0}–{x.Max(y => y.Kallistus):F0}°, et {x[0].EtM:F0} m, kierto {kierto:F1} °/s");
                if (pahin > TorniReuna) viat.Add($"{kaupunki}: torni {pahin:F2} ({pahinKohta})");
                if (kallMin < 55) viat.Add($"{kaupunki}: kallistus {kallMin:F0}°");
                if (silmaMin < t.KorkeusM) viat.Add($"{kaupunki}: silmä {silmaMin:F0} m tornin huipun alapuolella");
                if (kierto < 2.9) viat.Add($"{kaupunki}: kierto {kierto:F1} °/s");
            }
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }

        // ---- LEVEÄ KOHDE KAPEASSA KUVASSA (Linssiseppä 11.10. 08.5x: Kehysta laski leveyden kuvasuhteella 1,8, joten iPhonen
        // pystykuvassa 0,46 Louvre ja Concorde olivat kehyksen alussa ~2 ruudun levyisiä; OpasKuvaus.LeveysKuvaan) ----
        [Testi] static void LeveaKohdeKapeassaKuvassa()
        {
            // PT 11.10. 09.2x: pystykuvassa vain alue-luokka loittonee (Tivoli); rakennukset ja kadut (Louvre, Champs-Élysées) sekä
            // korkeat (Riemukaari, Eiffel) kuten vaakakuvassa; aukio (Concorde) pysyy lähikehyksessä ja kiertää obeliskia, joka on
            // vaakasuunnassa 58 %:ssa vasemmalta (± 0,03; PT 10.0x, otsikon alta) ja kokonaan kuvassa (0,9) koko pysähdyksen ajan.
            var viat = new List<string>();
            double tanP = Math.Tan(OpasKuvaus.KuvaPystyAst * Math.PI / 360);
            foreach (var (kaupunki, id, koko) in new[] { ("pariisi", "Q19675", 700.0), ("pariisi", "Q189503", 360.0), ("pariisi", "Q550", 1900.0), ("pariisi", "Q64436", 50.0),
                ("pariisi", "Q243", 125.0), ("koopenhamina", "Q110289", 350.0) })
            {
                var v = Asennot(Aja(Profiili.Normaali, kaupunki), id)[0];
                foreach (double suhde in new[] { 0.46, 4.0 / 3, 2.17 })
                {
                    var a = Aja(Profiili.Normaali, kaupunki, double.NaN, 14, false, true, suhde);
                    var x = Asennot(a, id); var x0 = x[0];
                    double nakyy = x0.EtM * tanP * Math.Min(suhde, 4.0 / 3), osuus = koko / 2 / nakyy;   // kohteen puolileveys / näkyvä puolileveys
                    double kaari = 0; for (int i = 1; i < x.Count; i++) kaari += Math.Abs(KierrosLento.Kiedo(x[i].Suunta - x[i - 1].Suunta));
                    string lisa = "";
                    if (id == "Q189503")
                    {
                        // Luxorin obeliski (OpasKatseOletukset, Wikidata Q1503331), 23 m (AukioKohdeKorkeusM).
                        var mon = OpasKatseOletukset.Monumentti(a.Reitti.First(y => y.Id == id).Lat, a.Reitti.First(y => y.Id == id).Lon).Value;
                        double xMax = 0, kMax = 0, xMin = double.MaxValue, xKMax = double.MinValue; var q0 = a.Reitti.First(y => y.Id == id);
                        double ta = a.Saapui[id], tb = a.Lahti[id];
                        foreach (var r in a.R)
                        {
                            if (r.t < ta || r.t > tb || r.kohde != id) continue;
                            double xo = OpasKuvaus.KuvassaX(r.a, mon.lat, mon.lon, MaaM + 0.5 * OpasKuvaus.AukioKohdeKorkeusM, suhde);
                            xMax = Math.Max(xMax, Math.Abs(xo)); xMin = Math.Min(xMin, (xo + 1) / 2); xKMax = Math.Max(xKMax, (xo + 1) / 2);
                            kMax = Math.Max(kMax, OpasKuvaus.KuvassaOsuus(r.a, mon.lat, mon.lon, MaaM, MaaM + OpasKuvaus.AukioKohdeKorkeusM, 2, suhde));
                        }
                        lisa = $", obeliski {xMin:F3}–{xKMax:F3} kuvan leveydestä vasemmalta, kokonaan kuvassa enintään {kMax:F2}";
                        // PT 10.0x: pystykuvassa obeliski 58 %:ssa vasemmalta (otsikon alta oikealle) ± 0,03 koko pysähdyksen.
                        if (suhde < 1 && (xMin < OpasKuvaus.PalloAukioMonumenttiX - 0.03 || xKMax > OpasKuvaus.PalloAukioMonumenttiX + 0.03 || kMax > TorniReuna))
                            viat.Add($"Concorde {suhde:F2}: obeliski {xMin:F3}–{xKMax:F3} / {kMax:F2}");
                        if (suhde < 1 && x0.EtM > v.EtM + 1e-6) viat.Add($"Concorde {suhde:F2}: loittoni {v.EtM:F0} → {x0.EtM:F0} m");
                    }
                    Console.WriteLine($"      {id} {suhde:F2}: alussa et {x0.EtM:F0} m (vaaka {v.EtM:F0}), silmä {x0.SilmaM:F0} m, kallistus {x0.Kallistus:F0}°, kohde {osuus:F2} leveydestä{lisa}, lopussa et {x[^1].EtM:F0} m, kierto {kaari / Math.Max(1, x[^1].T - x[0].T):F1} °/s");
                    if (suhde >= 4.0 / 3 && Math.Abs(x0.EtM - v.EtM) > 1e-6) viat.Add($"{id} {suhde:F2}: et {x0.EtM:F1} ≠ vaaka {v.EtM:F1}");
                    if (suhde < 1)
                    {
                        if (x0.Kallistus < 55) viat.Add($"{id} {suhde:F2}: kallistus {x0.Kallistus:F0}°");
                        if (id == "Q110289")
                        {
                            // Alue loittonee: näkyvä puolileveys vähintään min(vaakakuvan, koko / 2 / 0,9), tai raja (3 × / silmä 300 m).
                            double tarve = Math.Min(v.EtM * tanP * 4.0 / 3, koko / 2 / OpasKuvaus.PalloKapeaReuna);
                            bool raja = x0.EtM >= OpasKuvaus.PalloKapeaKerroinMax * v.EtM - 1 || x0.SilmaM >= OpasKuvaus.PalloKapeaSilmaMaxM - 2;
                            if (x0.EtM <= v.EtM + 1) viat.Add($"Tivoli {suhde:F2}: ei loitonnusta ({x0.EtM:F0} m)");
                            if (!raja && nakyy < tarve - 1) viat.Add($"Tivoli {suhde:F2}: näkyvä puolileveys {nakyy:F0} < {tarve:F0} m");
                        }
                        else if (id != "Q189503" && Math.Abs(x0.EtM - v.EtM) > 1e-6) viat.Add($"{id} {suhde:F2}: et {x0.EtM:F1} ≠ vaaka {v.EtM:F1} (vain alue loittonee)");
                    }
                }
            }
            // Laite kääntyy Concorden pysähdyksellä 4 s saapumisesta vaakakuvasta pystyyn: pehmeä vaihto (nopeuden muutos ≤ 0,3 m/s/ruutu).
            var k = Aja(Profiili.Normaali, "pariisi", double.NaN, 14, false, true, 0.46, false, 4);
            var q = k.Reitti.First(y => y.Id == "Q189503");
            double t0 = k.Saapui[q.Id], t1 = k.Lahti[q.Id], dvMax = 0; string dvKohta = "-"; (double e, double n, double u)? e1 = null, e2 = null;
            foreach (var r in k.R)
            {
                if (r.t < t0 || r.t > t1 + 0.2) continue;
                var e = OpasKuvaus.KameraPaikka(r.a, q.Lat, q.Lon);
                if (e1 is var (ae, an, au) && e2 is var (be, bn, bu))
                {
                    double dv = Math.Sqrt(Math.Pow((e.e - 2 * ae + be) / Dt, 2) + Math.Pow((e.n - 2 * an + bn) / Dt, 2) + Math.Pow((e.u - 2 * au + bu) / Dt, 2));
                    if (dv > dvMax) { dvMax = dv; dvKohta = $"{r.t - t0:F2} s {r.v}"; }
                }
                e2 = e1; e1 = e;
            }
            var kx = Asennot(k, q.Id);
            Console.WriteLine($"      Concorde kääntö 4:3 → 0,46: et {kx[0].EtM:F0} → {kx[^1].EtM:F0} m, nopeuden muutos enintään {dvMax:F2} m/s/ruutu ({dvKohta}, lähtö {t1 - t0:F1} s)");
            if (dvMax > 0.3) viat.Add($"Concorde kääntö: nopeuden muutos {dvMax:F2} m/s");
            Oleta.Tosi(viat.Count == 0, string.Join("; ", viat));
        }
}
}
