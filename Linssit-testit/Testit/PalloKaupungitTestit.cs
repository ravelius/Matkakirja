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
        struct Ruutu { public double T, E, N, U, EtM, Suunta, Kall; public OpasVaihe Vaihe; public int Kohde; public bool Leijuu; }

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

        static List<Ruutu> Aja(Kaupunki c, bool hidas, List<(double t, string laji, string kohde, double kesto)> tap = null, List<(double t, Kuvakulma? esi, Kuvakulma asento, string kohde)> esit = null)
        {
            bool vanha = OpasSilmukka.PalloLento; OpasSilmukka.PalloLento = true;
            try
            {
                var s = new OpasSilmukka(OpasSilmukka.Avauskuva(c.Lat, c.Lon));
                var vastaukset = new List<(double t, int n, string toive)>(); var hiljaa = new List<double>();
                double t = 0, lentoAlkoi = double.NaN;
                s.Pyyda += (n, toive) => vastaukset.Add((t + VastausS, n, toive));
                s.AlkaaPuhua += k => { hiljaa.Add(t + k.KestoS); tap?.Add((t, "puhe", k.Id, k.KestoS)); };
                s.LentoAlkaa += (k, m, _) => { lentoAlkoi = t; tap?.Add((t, "lento", k?.Id, s.LentoKestoS)); };
                s.Saapui += k => tap?.Add((t, "saapui", k.Id, 0));
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
                    for (int j = hiljaa.Count - 1; j >= 0; j--) if (hiljaa[j] <= t) { hiljaa.RemoveAt(j); s.AaniLoppui(); tap?.Add((t, "hiljaa", s.Nykyinen?.Id, 0)); }
                    s.Paivita(Dt, _ => 35, laatat);
                    var e = OpasKuvaus.KameraPaikka(s.Asento, c.Lat, c.Lon);
                    int kohde = s.Nykyinen == null ? -1 : Array.FindIndex(c.Kohteet, k => k.Id == s.Nykyinen.Id);
                    esit?.Add((t, s.Esilataus(_ => 35), s.Asento, s.Vaihe == OpasVaihe.Puhuu ? s.Nykyinen?.Id : null));
                    r.Add(new Ruutu { T = t, E = e.e, N = e.n, U = e.u, EtM = s.Asento.EtaisyysM, Suunta = s.Asento.Suuntima, Kall = s.Asento.Kallistus, Vaihe = s.Vaihe, Kohde = kohde, Leijuu = s.Leijuu });
                    if (kohde == c.Kohteet.Length - 1 && hiljaa.Count == 0 && s.Vaihe != OpasVaihe.Puhuu && !s.KierrosKaynnissa) break;
                }
                return r;
            }
            finally { OpasSilmukka.PalloLento = vanha; }
        }

        /// <summary>
        /// VIISTO KATSE LENNOLLA (kuva-arkki 9.10., elokuvalinjan virhe 2): kallistus (0 = suoraan alas) lennon aikana enintään
        /// OpasKuvaus.PalloLentoJyrkennysMaxAst lähtö- ja tulokallistusta jyrkempi; tulostaa lennoittain pienimmän kallistuksen.
        /// </summary>
        [Testi] static void LentoKatseViisto()
        {
            foreach (var c0 in Lue().Where(x => x.Id == "pariisi" || x.Id == "tukholma"))
            {
                var c = new Kaupunki { Id = c0.Id, Nimi = c0.Nimi, Lat = c0.Lat, Lon = c0.Lon, Kohteet = OpasReitti.Lyhin(c0.Kohteet, k => (k.Lat, k.Lon), out _).ToArray() };
                var r = Aja(c, false);
                for (int i = 1; i < r.Count; i++)
                {
                    if (r[i].Vaihe != OpasVaihe.Lentaa || r[i - 1].Vaihe == OpasVaihe.Lentaa) continue;
                    int j = i; while (j + 1 < r.Count && r[j + 1].Vaihe == OpasVaihe.Lentaa) j++;
                    double k0 = r[i - 1].Kall, k1 = r[Math.Min(r.Count - 1, j + 1)].Kall, kmin = double.MaxValue; int m = i;
                    for (int k = i; k <= j; k++) if (r[k].Kall < kmin) { kmin = r[k].Kall; m = k; }
                    string nimi = r[Math.Min(r.Count - 1, j + 1)].Kohde >= 0 ? c.Kohteet[r[Math.Min(r.Count - 1, j + 1)].Kohde].Nimi : "?";
                    double kuva = 0, huippu = 0;
                    for (int k = i + 1; k <= j; k++)
                    {
                        double de = r[k].E - r[k - 1].E, dn = r[k].N - r[k - 1].N, du = r[k].U - r[k - 1].U;
                        kuva = Math.Max(kuva, Math.Sqrt(de * de + dn * dn + du * du) / Dt / Math.Max(1, r[k].EtM)); huippu = Math.Max(huippu, r[k].U - 35);
                    }
                    Console.WriteLine($"      {c.Nimi} → {nimi}: kallistus lähtö {k0:F0}°, pienin {kmin:F0}° ({(m - i) * Dt:F1}/{(j - i + 1) * Dt:F1} s, silmä {r[m].U - 35:F0} m), tulo {k1:F0}°, kuvan nopeus enintään {kuva:F2} rad/s, silmä enintään {huippu:F0} m");
                    // Nopea lento nousee kaaressa (omistaja 13.1x, PT): kuvan nopeus enintään raja (+15 %: lennon kaari ja panorointi).
                    Oleta.Tosi(kuva <= OpasKuvaus.PalloKuvaNopeusMax * 1.15, $"{c.Nimi} → {nimi}: kuvan nopeus {kuva:F2} rad/s ≤ {OpasKuvaus.PalloKuvaNopeusMax:F1} (+15 %)");
                    Oleta.Tosi(kmin >= Math.Min(k0, k1) - OpasKuvaus.PalloLentoJyrkennysMaxAst - 1, $"{c.Nimi} → {nimi}: lennon kallistus {kmin:F0}° ≥ {Math.Min(k0, k1) - OpasKuvaus.PalloLentoJyrkennysMaxAst:F0}°");
                    i = j;
                }
            }
        }

        static bool Pysahdyksella(OpasVaihe v) => v == OpasVaihe.Puhuu || v == OpasVaihe.Odottaa;

        /// <summary>
        /// KOHDEKAARI (omistaja 9.10., Päätoimittaja: "selvästi enemmän kiertoa, ja kiertäessä pallo laskeutuu ja lähestyy (spiraali)"):
        /// pysähdyksittäin silmän kiertokulma kohteen ympäri (°), katse-etäisyyden ja silmän korkeuden muutos saapumisesta lähtöön (osuus).
        /// </summary>
        public sealed class Kaari { public string Kaupunki; public double KiertoKa, KiertoMax, EtMuutos, KorkeusMuutos, NousuMax; public string NousuKohta; public int Pysahdyksia; }
        public static Kaari MittaaKaari(Kaupunki c)
        {
            var r = Aja(c, false); var tu = new Kaari { Kaupunki = c.Nimi };
            double kierto = 0, et = 0, kork = 0;
            for (int i = 0; i < c.Kohteet.Length; i++)
            {
                int a = r.FindIndex(x => x.Kohde == i && Pysahdyksella(x.Vaihe)), b = r.FindLastIndex(x => x.Kohde == i && Pysahdyksella(x.Vaihe));
                if (a < 0 || b <= a) continue;
                var (pe, pn) = Enu(c, c.Kohteet[i]);
                double kulma = 0;
                // Kokonaiskierto: lennon loppuosan kaari (OpasSilmukka.PalloLentoKaariS ennen saapumista) + pysähdys.
                int a0 = Math.Max(1, a - (int)(OpasSilmukka.PalloLentoKaariS / Dt));
                // Vain kohteen lähellä (vaakaetäisyys ≤ 1,5 × saapuminen): lähestymisen geometria ei ole kiertoa.
                double ra = Math.Sqrt(Math.Pow(r[a].E - pe, 2) + Math.Pow(r[a].N - pn, 2));
                while (a0 < a && Math.Sqrt(Math.Pow(r[a0].E - pe, 2) + Math.Pow(r[a0].N - pn, 2)) > 1.5 * ra) a0++;
                for (int k = a0 + 1; k <= b; k++)
                {
                    double d = Math.Atan2(r[k].N - pn, r[k].E - pe) - Math.Atan2(r[k - 1].N - pn, r[k - 1].E - pe);
                    d -= 2 * Math.PI * Math.Floor((d + Math.PI) / (2 * Math.PI)); kulma += d;
                }
                kulma = Math.Abs(kulma) * 180 / Math.PI;
                tu.Pysahdyksia++; kierto += kulma; tu.KiertoMax = Math.Max(tu.KiertoMax, kulma);
                et += 1 - r[b].EtM / Math.Max(1, r[a].EtM);
                double u0 = r[a].U - 35, u1 = r[b].U - 35; kork += 1 - u1 / Math.Max(1, u0);
            }
            (tu.NousuMax, tu.NousuKohta) = LennonNousu(c, r);
            if (tu.Pysahdyksia > 0) { tu.KiertoKa = kierto / tu.Pysahdyksia; tu.EtMuutos = et / tu.Pysahdyksia; tu.KorkeusMuutos = kork / tu.Pysahdyksia; }
            return tu;
        }

        /// <summary>
        /// Lennon nousu (Päätoimittaja 9.10.: "siirtymälento matalammaksi, Notre-Dame → Concorde liian korkealla"): silmän korkein kohta
        /// lennolla lähtö- ja tulokorkeuden yläpuolella (m), ei siirtoja eikä avauksen laskeutumista (lähtö yli 2 km).
        /// </summary>
        public static (double nousu, string kohta) LennonNousu(Kaupunki c) => LennonNousu(c, Aja(c, false));
        static (double, string) LennonNousu(Kaupunki c, List<Ruutu> r)
        {
            double paras = 0; string kohta = null;
            for (int k = 1; k < r.Count; k++)
            {
                if (r[k].Vaihe != OpasVaihe.Lentaa || r[k - 1].Vaihe == OpasVaihe.Lentaa || r[k].Kohde < 1) continue;
                int j = k; double maks = r[k].U; while (j + 1 < r.Count && r[j + 1].Vaihe == OpasVaihe.Lentaa) { j++; maks = Math.Max(maks, r[j].U); }
                if (r[k - 1].U > 2000) { k = j; continue; }
                var ed = c.Kohteet[r[k].Kohde - 1]; var kk = c.Kohteet[r[k].Kohde];
                if (KierrosLento.EtaisyysM(ed.Lat, ed.Lon, kk.Lat, kk.Lon) >= OpasSilmukka.SiirtoRajaM) { k = j; continue; }
                double nousu = maks - Math.Max(r[k - 1].U, r[Math.Min(r.Count - 1, j + 1)].U);
                if (nousu > paras) { paras = nousu; kohta = $"{ed.Nimi} → {kk.Nimi}"; }
                k = j;
            }
            return (paras, kohta);
        }

        [Testi] static void SpiraaliLaskeeJaLahestyy()
        {
            var k = new Kuvakulma(48.86, 2.34, 400, 64, 120, 40);
            var e0 = OpasKuvaus.KameraPaikka(k, k.Lat, k.Lon); var s1 = OpasKuvaus.Spiraali(k, 30, 1); var e1 = OpasKuvaus.KameraPaikka(s1, k.Lat, k.Lon);
            Oleta.Tosi(Math.Abs(Math.Abs(KierrosLento.Kiedo(s1.Suuntima - k.Suuntima)) - 30) < 0.5, $"kaari 30° ({KierrosLento.Kiedo(s1.Suuntima - k.Suuntima):F1})");
            Oleta.Tosi(e1.u - 40 < (e0.u - 40) * (1 - OpasKuvaus.SpiraaliLasku) + 1, $"lasku {e0.u:F0} → {e1.u:F0} m");
            Oleta.Tosi(s1.EtaisyysM < k.EtaisyysM - 20, $"lähestyy {k.EtaisyysM:F0} → {s1.EtaisyysM:F0} m");
            Oleta.Tosi(Math.Abs(s1.Lat - k.Lat) < 1e-12 && Math.Abs(s1.KatseKorkeusM - k.KatseKorkeusM) < 1e-9, "katse pysyy kohteessa");
        }

        [Testi] static void KohdekaariSpiraali()
        {
            foreach (var c0 in Lue().Where(x => x.Id == "pariisi" || x.Id == "tukholma"))
            {
                // Kehityskaupungeissa sovitin järjestää kierroksen lyhimmäksi (OpasReitti), joten mitataan samassa järjestyksessä.
                var c = new Kaupunki { Id = c0.Id, Nimi = c0.Nimi, Lat = c0.Lat, Lon = c0.Lon, Kohteet = OpasReitti.Lyhin(c0.Kohteet, k => (k.Lat, k.Lon), out _).ToArray() };
                var m = MittaaKaari(c);
                Console.WriteLine($"      {m.Kaupunki}: {m.Pysahdyksia} pysähdystä, kierto ka {m.KiertoKa:F0}° (max {m.KiertoMax:F0}°), etäisyys −{100 * m.EtMuutos:F0} %, korkeus −{100 * m.KorkeusMuutos:F0} %, lennon nousu enintään {m.NousuMax:F0} m ({m.NousuKohta})");
                // Ennen 9.10. (juna 168): kierto ka 4–9° (max 6–16°), ei laskua; lennon nousu Pariisissa 1 320 m (sumennusnosto).
                // a3ad152f5: pysähdyksen kaari 6–13°; nyt kaari alkaa jo lennon loppuosalla (kokonaiskierto).
                Oleta.Tosi(m.KiertoKa >= 40, $"{m.Kaupunki}: kokonaiskierto kohteen ympäri keskimäärin {m.KiertoKa:F0}° (≥ 40°; Päätoimittaja 45–90°)");
                Oleta.Tosi(m.KiertoMax <= 100, $"{m.Kaupunki}: suurin kokonaiskierto {m.KiertoMax:F0}° (≤ 100°)");
                Oleta.Tosi(m.KorkeusMuutos > 0, $"{m.Kaupunki}: pallo laskeutuu pysähdyksellä ({100 * m.KorkeusMuutos:F1} %)");
                // Nopea lento (≥ PalloNopeaMinM) saa nousta kaaressa (omistaja 9.10. 13.1x, PT: "nosta lentoa kaaressa matkan keskellä
                // nopeuden sijaan"; OpasKuvaus.NopeusRho), enintään 300 m; muut ≤ 150 m (PT: "siirtymälento matalammaksi").
                var osat = (m.NousuKohta ?? "").Split(new[] { " → " }, StringSplitOptions.None);
                var ka = osat.Length == 2 ? c.Kohteet.FirstOrDefault(x => x.Nimi == osat[0]) : null; var kb = osat.Length == 2 ? c.Kohteet.FirstOrDefault(x => x.Nimi == osat[1]) : null;
                bool nopea = ka != null && kb != null && KierrosLento.EtaisyysM(ka.Lat, ka.Lon, kb.Lat, kb.Lon) >= OpasSilmukka.PalloNopeaMinM;
                Oleta.Tosi(m.NousuMax <= (nopea ? 300 : 150), $"{m.Kaupunki}: lennon nousu enintään {m.NousuMax:F0} m ({m.NousuKohta}; ≤ {(nopea ? 300 : 150)})");
            }
        }
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
                    // Taaksepäin vain lennolla (omistaja 9.10.: kohdekaari kiertää kohdetta, myös seuraavasta poispäin; kumoaa 18.4x:n rajan).
                    int lahtoK = Math.Max(a, r.FindLastIndex(b, b - a + 1, x => x.Kohde == i && Pysahdyksella(x.Vaihe)));
                    for (int k = a; k <= b; k++)
                    {
                        double ete = (r[k].E - pe) * ue + (r[k].N - pn) * un;
                        if (k >= lahtoK) { paras = Math.Max(paras, ete); if (paras - ete > pahin) { pahin = paras - ete; pahinK = k; } }
                        if (k > a) { double v = Math.Sqrt(Math.Pow((r[k].E - r[k - 1].E) / Dt, 2) + Math.Pow((r[k].N - r[k - 1].N) / Dt, 2)); seis = v < 0.2 && !r[k].Leijuu && Pysahdyksella(r[k].Vaihe) ? seis + Dt : 0; if (seis > pisin) { pisin = seis; pisinK = k; } }   // leijunta kaaren päässä sallittu (omistaja 18.4x); lennon S-käyräinen lähtö levosta ei ole seisomista
                    }
                    double Kulma(int k) { var (ce, cn) = (r[k].E - pe, r[k].N - pn); double a1 = Math.Atan2(cn, ce), a2 = Math.Atan2(qn - pn, qe - pe); double d = Math.Abs(a1 - a2) % (2 * Math.PI); return Math.Min(d, 2 * Math.PI - d) * 180 / Math.PI; }
                    if (pahin > t.Taaksepain) { t.Taaksepain = pahin; t.TaakseKohta = $"{vk} {c.Kohteet[i].Nimi}→{c.Kohteet[i + 1].Nimi} {r[pahinK].Vaihe} {r[pahinK].T:F0} s"; }
                    if (pisin > t.Seisahdus) { t.Seisahdus = pisin; t.SeisKohta = $"{vk} {c.Kohteet[i].Nimi}→{c.Kohteet[i + 1].Nimi} {r[pisinK].Vaihe} kulma {Kulma(pisinK):F0}°"; }
                    if (pahin > 1) t.Viat.Add($"{vk} {c.Kohteet[i].Nimi} → {c.Kohteet[i + 1].Nimi} taaksepäin {pahin:F1} m (et {r[pahinK].EtM:F0} m, {100 * pahin / r[pahinK].EtM:F1} %, silmä alussa {((r[a].E - pe) * ue + (r[a].N - pn) * un):F0} m / väli {l:F0} m)");
                    if (pisin > 3) t.Viat.Add($"{vk} {c.Kohteet[i].Nimi} → {c.Kohteet[i + 1].Nimi} seisoo {pisin:F1} s");
                    if (pisin > 3 && Environment.GetEnvironmentVariable("NYK_DEBUG") == c.Id) for (int k = Math.Max(a, pisinK - (int)(pisin / Dt) - 15); k <= Math.Min(b, pisinK + 15); k += 5) Console.WriteLine($"        seis {r[k].T:F2} {r[k].Vaihe} kohde {r[k].Kohde} leijuu {r[k].Leijuu} v {Math.Sqrt(Math.Pow((r[k].E - r[k - 1].E) / Dt, 2) + Math.Pow((r[k].N - r[k - 1].N) / Dt, 2)):F2} u {r[k].U:F0}");
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
                        if (Environment.GetEnvironmentVariable("NYK_DEBUG") == c.Id && Pysahdyksella(r[k - 1].Vaihe) && r[k - 1].Kohde == i && Pit(V(r, k)) > 8) Console.WriteLine($"        {vk} {c.Kohteet[i].Nimi} t {r[k].T:F2} v {Pit(V(r, k)):F1} et {r[k - 1].EtM:F0}→{r[k].EtM:F0} u {r[k - 1].U:F0}→{r[k].U:F0} suunta {r[k - 1].Suunta:F1}→{r[k].Suunta:F1}");
                    }
                    if (alku > 0 && maks / alku > t.Kehys) t.Kehys = maks / alku;
                    if (alku > 0 && maks > 1.05 * alku + 1) t.Viat.Add($"{vk} {c.Kohteet[i].Nimi} kehys {alku:F0} → {maks:F0} m");
                    if (nyk > t.Nykays) t.Nykays = nyk;
                    if (nyk > OpasKuvaus.KaariNopeusMS + 1) t.Viat.Add($"{vk} {c.Kohteet[i].Nimi} nykäys {nyk:F1} m/s");
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
                    if ((dv > 0.1 || da > 1) && Environment.GetEnvironmentVariable("NYK_DEBUG") == c.Id && r[k].T < 60)
                        for (int q = k - 4; q <= k + 4; q++) Console.WriteLine($"        sauma {r[q].T:F2} {r[q].Vaihe} v {Pit(V(r, q)):F2} suunta {r[q].Suunta:F2} et {r[q].EtM:F1} u {r[q].U:F1}");
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
            if (t.Kaanto > OpasSilmukka.PalloKaantoAstS + 0.2) t.Viat.Add($"kääntö {t.Kaanto:F1} °/s ({t.KaantoKohta})");
            if (t.Perilla < c.Kohteet.Length) t.Viat.Add($"perillä {t.Perilla}/{c.Kohteet.Length}");
            return t;
        }

        /// <summary>
        /// PUHEEN JA LENNON TAHDISTUS (Päätoimittaja 8.10. ilta, juna 168/169): kerronta ei soi lähdön hetkellä (lento alkaa vasta
        /// äänen ja LoppuTaukoS:n jälkeen), kerronta alkaa lennon alussa (omistaja 9.10.: PalloPuheAlkuS lähdöstä, ei taukoja) ja
        /// hiljaisuus kerronnan lopusta seuraavan alkuun on enintään HiljaisuusMaxS, kun lähdön siltalause (SiltaS) täyttää lennon alun.
        /// Siirto-osuudet (tumma ruutu) ohitetaan.
        /// </summary>
        // Nykytila 8.10.: nopea 6,0–6,8 s, pitkät (~15 s) lennot 8,2–8,3 s; raja kiristetään Päätoimittajan valinnan jälkeen.
        public const double SiltaS = 4, HiljaisuusMaxS = 9;
        public sealed class Tahdistus { public string Kaupunki; public double Hiljaisuus, HiljaisuusHidas, PuheEnnen, Paallekkain; public int Osuuksia; public List<string> Viat = new List<string>(); }
        public static Tahdistus MittaaTahdistus(Kaupunki c)
        {
            var tu = new Tahdistus { Kaupunki = c.Nimi };
            foreach (bool hidas in new[] { false, true })
            {
                var tap = new List<(double t, string laji, string kohde, double kesto)>(); string vk = hidas ? "Hidas" : "Nopea";
                Aja(c, hidas, tap);
                double hiljaaAlkoi = double.NaN; string edPuhe = null;
                for (int i = 0; i < tap.Count; i++)
                {
                    var e = tap[i];
                    if (e.laji == "hiljaa") hiljaaAlkoi = e.t;
                    if (e.laji == "lento")
                    {
                        var k = Array.Find(c.Kohteet, x => x.Id == e.kohde);
                        int ki = Array.IndexOf(c.Kohteet, k);
                        if (k == null || ki <= 0) continue;
                        var ed = c.Kohteet[ki - 1];
                        if (KierrosLento.EtaisyysM(ed.Lat, ed.Lon, k.Lat, k.Lon) >= OpasSilmukka.SiirtoRajaM) { hiljaaAlkoi = double.NaN; continue; }
                        tu.Osuuksia++;
                        // Kerronta soi lähdössä: edellinen puhe ei ole loppunut.
                        if (double.IsNaN(hiljaaAlkoi) || tap.FindLastIndex(i, x => x.laji == "puhe") > tap.FindLastIndex(i, x => x.laji == "hiljaa"))
                        { tu.Paallekkain++; tu.Viat.Add($"{vk} {ed.Nimi} → {k.Nimi}: kerronta soi lähdössä"); }
                        // Seuraavan kerronnan alku suhteessa lennon loppuun.
                        int pj = tap.FindIndex(i, x => x.laji == "puhe" && x.kohde == k.Id);
                        if (pj < 0) continue;
                        double loppu = e.t + e.kesto, ennen = loppu - tap[pj].t;
                        tu.PuheEnnen = Math.Max(tu.PuheEnnen, ennen);
                        // Omistaja 9.10. ("liikaa taukoja"): kerronta alkaa lennon alussa (PalloPuheAlkuS lähdöstä), ei odota saapumista.
                        double lahdosta = tap[pj].t - e.t;
                        if (lahdosta < OpasSilmukka.PalloPuheAlkuS - 0.5) tu.Viat.Add($"{vk} {k.Nimi}: kerronta alkaa {lahdosta:F1} s lähdöstä (ennen nousua)");
                        if (!hidas && lahdosta > OpasSilmukka.PalloPuheAlkuS + 1.0 && e.kesto > OpasSilmukka.PalloPuheAlkuS + OpasSilmukka.PuheEnnenS)
                            tu.Viat.Add($"{vk} {k.Nimi}: kerronta alkaa vasta {lahdosta:F1} s lähdöstä (lento {e.kesto:F1} s)");
                        if (!double.IsNaN(hiljaaAlkoi))
                        {
                            double hiljaisuus = (tap[pj].t - hiljaaAlkoi) - SiltaS;
                            // Hidas verkko: laattaodotus (LahtoOdotusMaxS 5 s) on hiljaisuutta — raportoidaan, raja vasta Päätoimittajan
                            // valinnan jälkeen (lyhyempi laattaodotus pallossa tai lisälause), ks. docs/raportit/puhe-ja-lento-37-kaupunkia.
                            if (hidas) { tu.HiljaisuusHidas = Math.Max(tu.HiljaisuusHidas, hiljaisuus); hiljaaAlkoi = double.NaN; continue; }
                            tu.Hiljaisuus = Math.Max(tu.Hiljaisuus, hiljaisuus);
                            if (hiljaisuus > HiljaisuusMaxS) tu.Viat.Add($"{vk} {ed.Nimi} → {k.Nimi}: hiljaisuus {hiljaisuus:F1} s (puhe loppui {hiljaaAlkoi:F1}, lento {e.t:F1}–{loppu:F1}, seuraava puhe {tap[pj].t:F1})");
                        }
                        hiljaaAlkoi = double.NaN;
                    }
                }
            }
            return tu;
        }

        /// <summary>Hitaan verkon laattaodotus ilman kertojaa hyväksytään, kun pallon omat äänet soivat (Päätoimittaja 8.10. ilta): tuuli soi
        /// äänimaisemassa myös kaupungeissa ilman äänikarttaa (34/37) kaikilla pysähdyskorkeuksilla.</summary>
        [Testi] static void TuuliSoiOdotuksessaIlmanAanikarttaa()
        {
            foreach (double h in new[] { 60.0, 150, 400, 1200 })
            {
                var m = new Matkakirja.Linssit.Aanet.KaupunkiAanimaisema();
                for (int i = 0; i < 120; i++) m.Paivita(new Matkakirja.Linssit.Aanet.KaupunkiAanimaisema.Syote { Painot = null, KorkeusM = h, NopeusMs = 2, Tunti = 12, Paalla = true }, 0.05);
                double tuuli = m.Tasot[Matkakirja.Linssit.Aanet.KaupunkiAanimaisema.Indeksi(Matkakirja.Linssit.Aanet.KaupunkiAanimaisema.Tuuli)];
                Oleta.Tosi(tuuli >= Matkakirja.Linssit.Aanet.KaupunkiAanimaisema.TuuliMaa - 1e-9, $"tuuli {tuuli:F2} korkeudella {h} m");
            }
        }

        /// <summary>
        /// ÄÄNITASOT 37 KAUPUNGISSA (Päätoimittaja 8.10. ilta, juna 169): kertoja vs. tuuli, sade, ukkonen ja kori mikserin oletuksilla
        /// (Lukija 0,9, Tehosteet 1, Sää 1) OpasAanitasot-ketjuilla ja mitatuilla leikevoimakkuuksilla (kultaiset/pallo-aanitasot-20261008.json).
        /// Puheen aikana: jatkuvat (tuuli kameran korkeudelta, rankkasade) yhteensä ≥ JatkuvaMarginaaliDb kertojan alla; tapahtumat
        /// (ukkonen, korin narina) hetkellisesti ≥ TapahtumaMarginaaliDb kertojan alla; huippusumma (kertojan ja tapahtumien huiput,
        /// jatkuvien RMS) ≤ 1,0 (ei leikkautumista); tehosteiden −3 dB (TehosteKerroin) mukana.
        /// </summary>
        public const double JatkuvaMarginaaliDb = 10, TapahtumaMarginaaliDb = 6;
        static double Db(double x) => 20 * Math.Log10(Math.Max(1e-9, x));
        static double Lin(double db) => Math.Pow(10, db / 20);
        public sealed class Tasot { public string Kaupunki; public double JatkuvaMarginaali = double.MaxValue, TapahtumaMarginaali = double.MaxValue, HuippuSumma, TuuliMaks; public List<string> Viat = new List<string>(); }
        public static Tasot MittaaTasot(Kaupunki c)
        {
            var g = (Dictionary<string, object>)MiniJson.Jasenna(File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "pallo-aanitasot-20261008.json")));
            double L(string lahde, string kentta) => Convert.ToDouble(((Dictionary<string, object>)g[lahde])[kentta], System.Globalization.CultureInfo.InvariantCulture);
            const double Lukija = 0.9, Tehosteet = 1, Saa = 1, TK = 0.7079458;   // mikserin oletukset; TehosteKerroin = −3 dB
            var tu = new Tasot { Kaupunki = c.Nimi };
            var tap = new List<(double t, string laji, string kohde, double kesto)>();
            var r = Aja(c, false, tap);
            double kertoja = L("kertoja", "integroitu_lufs") + Db(Matkakirja.Linssit.Aanet.OpasAanitasot.Kertoja(Lukija));
            double kertojaHuippu = Lin(L("kertoja", "huippu_db")) * Matkakirja.Linssit.Aanet.OpasAanitasot.Kertoja(Lukija);
            double gU = Matkakirja.Linssit.Aanet.OpasAanitasot.Ukkonen(TK, Saa, true), gN = Matkakirja.Linssit.Aanet.OpasAanitasot.Kori(0.9, 0.25, TK, Tehosteet, true);
            double ukkonen = L("ukkonen", "momentaari_max_lufs") + Db(gU), narina = L("korin_narina", "momentaari_max_lufs") + Db(gN);
            double sadeG = Matkakirja.Linssit.Aanet.OpasAanitasot.Maisema(1, true), sade = L("sade", "integroitu_lufs") + Db(sadeG);
            int ti = 0; bool puhuu = false;
            foreach (var x in r)
            {
                while (ti < tap.Count && tap[ti].t <= x.T) { if (tap[ti].laji == "puhe") puhuu = true; else if (tap[ti].laji == "hiljaa") puhuu = false; ti++; }
                if (!puhuu) continue;
                double h = Math.Max(0, x.U - 35);
                double tuuliTaso = Matkakirja.Linssit.Aanet.KaupunkiAanimaisema.TuuliMaa + (Matkakirja.Linssit.Aanet.KaupunkiAanimaisema.TuuliYla - Matkakirja.Linssit.Aanet.KaupunkiAanimaisema.TuuliMaa) * Matkakirja.Linssit.Aanet.KaupunkiAanimaisema.KorkeusOsuus(h);
                double tuuliG = Matkakirja.Linssit.Aanet.OpasAanitasot.Maisema(tuuliTaso, true);
                tu.TuuliMaks = Math.Max(tu.TuuliMaks, tuuliTaso);
                double tuuli = L("tuuli", "integroitu_lufs") + Db(tuuliG);
                double jatkuva = 10 * Math.Log10(Math.Pow(10, tuuli / 10) + Math.Pow(10, sade / 10));
                tu.JatkuvaMarginaali = Math.Min(tu.JatkuvaMarginaali, kertoja - jatkuva);
                tu.TapahtumaMarginaali = Math.Min(tu.TapahtumaMarginaali, kertoja - Math.Max(ukkonen, narina));
                double summa = kertojaHuippu + Lin(L("ukkonen", "huippu_db")) * gU + Lin(L("korin_narina", "huippu_db")) * gN
                    + Lin(L("tuuli", "rms_db")) * tuuliG + Lin(L("sade", "rms_db")) * sadeG;
                tu.HuippuSumma = Math.Max(tu.HuippuSumma, summa);
            }
            if (tu.JatkuvaMarginaali < JatkuvaMarginaaliDb) tu.Viat.Add($"tuuli ja sade {tu.JatkuvaMarginaali:F1} dB kertojan alla");
            if (tu.TapahtumaMarginaali < TapahtumaMarginaaliDb) tu.Viat.Add($"ukkonen/kori {tu.TapahtumaMarginaali:F1} dB kertojan alla");
            if (tu.HuippuSumma > 1) tu.Viat.Add($"huippusumma {tu.HuippuSumma:F2} > 1 (leikkautuu)");
            return tu;
        }

        [Testi] static void AanitasotKaikissaKaupungeissa()
        {
            Oleta.Tosi(Math.Abs(20 * Math.Log10(0.7079458) + 3) < 0.01, "TehosteKerroin = −3 dB");
            var tulokset = Lue().Select(MittaaTasot).ToList();
            Console.WriteLine("      | Kaupunki | tuuli+sade kertojan alla dB | ukkonen/kori kertojan alla dB | huippusumma | tuulen taso maks | viat |");
            foreach (var t in tulokset) Console.WriteLine($"      | {t.Kaupunki} | {t.JatkuvaMarginaali:F1} | {t.TapahtumaMarginaali:F1} | {t.HuippuSumma:F2} | {t.TuuliMaks:F2} | {t.Viat.Count} |");
            var viat = tulokset.Where(t => t.Viat.Count > 0).Select(t => $"{t.Kaupunki}: {string.Join("; ", t.Viat)}").ToList();
            foreach (var v in viat) Console.WriteLine("      VIKA " + v);
            Oleta.Tosi(viat.Count == 0, $"{viat.Count} kaupungissa äänitasovikoja");
        }

        [Testi] static void PuheJaLentoTahdissaKaikissaKaupungeissa()
        {
            var tulokset = Lue().Select(MittaaTahdistus).ToList();
            Console.WriteLine("      | Kaupunki | osuuksia | hiljaisuus nopea s | hiljaisuus hidas s | puhe alkaa ennen lennon loppua s | kerronta lähdössä | viat |");
            foreach (var t in tulokset) Console.WriteLine($"      | {t.Kaupunki} | {t.Osuuksia} | {t.Hiljaisuus:F1} | {t.HiljaisuusHidas:F1} | {t.PuheEnnen:F1} | {t.Paallekkain} | {t.Viat.Count} |");
            var viat = tulokset.Where(t => t.Viat.Count > 0).Select(t => $"{t.Kaupunki}: {string.Join("; ", t.Viat.Take(3))}{(t.Viat.Count > 3 ? $" (+{t.Viat.Count - 3})" : "")}").ToList();
            foreach (var v in viat) Console.WriteLine("      VIKA " + v);
            Oleta.Tosi(viat.Count == 0, $"{viat.Count} kaupungissa tahdistusvikoja");
        }

        /// <summary>
        /// LAATAT VALMIINA SAAPUESSA (Päätoimittaja 8.10. ilta, juna 168/169): esikamera (OpasSilmukka.Esilataus) pitää ennustaa
        /// saapumisasento ajoissa. Laattamalli: näkymän laatat ovat valmiit, kun samankaltainen näkymä (silmä alle 10 % katse-
        /// etäisyydestä ja suunta alle 15°) on ollut pyydettynä LatausS ennen saapumista. Mitataan ennakko per pysähdys.
        /// </summary>
        public const double LatausS = 3;
        static bool Sama(Kuvakulma a, Kuvakulma b, double lat0, double lon0)
        {
            var ea = OpasKuvaus.KameraPaikka(a, lat0, lon0); var eb = OpasKuvaus.KameraPaikka(b, lat0, lon0);
            double d = Math.Sqrt(Math.Pow(ea.e - eb.e, 2) + Math.Pow(ea.n - eb.n, 2) + Math.Pow(ea.u - eb.u, 2));
            return d < 0.1 * Math.Max(50, b.EtaisyysM) && Math.Abs(KierrosLento.Kiedo(a.Suuntima - b.Suuntima)) < 15;
        }
        public sealed class Laatat { public string Kaupunki; public double PieninEnnakko = double.MaxValue; public int Pysahdyksia; public List<string> Viat = new List<string>(); }
        public static Laatat MittaaLaatat(Kaupunki c)
        {
            var tu = new Laatat { Kaupunki = c.Nimi };
            foreach (bool hidas in new[] { false, true })
            {
                var esit = new List<(double t, Kuvakulma? esi, Kuvakulma asento, string kohde)>(); string vk = hidas ? "Hidas" : "Nopea";
                Aja(c, hidas, null, esit);
                for (int i = 1; i < esit.Count; i++)
                {
                    if (esit[i].kohde == null || esit[i - 1].kohde == esit[i].kohde) continue;   // saapuminen: Puhuu alkaa uudelle kohteelle
                    int ki = Array.FindIndex(c.Kohteet, x => x.Id == esit[i].kohde);
                    if (ki <= 0) continue;   // ensimmäinen (avaus) ja samassa paikassa jatkuva ohitetaan
                    double hyppy = KierrosLento.EtaisyysM(c.Kohteet[ki - 1].Lat, c.Kohteet[ki - 1].Lon, c.Kohteet[ki].Lat, c.Kohteet[ki].Lon);
                    if (hyppy >= OpasSilmukka.SiirtoRajaM || hyppy < 50) continue;   // siirto tai sama paikka (ei lentoa)
                    var loppu = esit[i].asento; int j = i - 1;
                    while (j >= 0 && esit[j].esi == null && esit[i].t - esit[j].t < 1) j--;   // perillä: esikamera pois, pääkamera kehyksessä
                    int alku = j;
                    while (j >= 0 && esit[j].esi is Kuvakulma e && Sama(e, loppu, c.Lat, c.Lon)) j--;
                    if (j == alku) { var x = esit[alku].esi; if (x is Kuvakulma xe) { var ea = OpasKuvaus.KameraPaikka(xe, c.Lat, c.Lon); var eb = OpasKuvaus.KameraPaikka(loppu, c.Lat, c.Lon);
                        tu.Viat.Add($"{vk} {c.Kohteet[ki].Nimi}: ero saapuessa {Math.Sqrt(Math.Pow(ea.e - eb.e, 2) + Math.Pow(ea.n - eb.n, 2) + Math.Pow(ea.u - eb.u, 2)):F0} m / et {loppu.EtaisyysM:F0}, suunta {xe.Suuntima:F0} vs {loppu.Suuntima:F0}"); } }
                    double ennakko = esit[i].t - esit[j + 1 < esit.Count ? j + 1 : i].t;
                    tu.Pysahdyksia++;
                    if (ennakko < tu.PieninEnnakko) tu.PieninEnnakko = ennakko;
                    if (ennakko < LatausS) tu.Viat.Add($"{vk} {c.Kohteet[ki].Nimi}: esikamera saapumisasennossa vain {ennakko:F1} s ennen saapumista");
                }
            }
            return tu;
        }

        [Testi] static void LaatatValmiinaSaapuessaKaikissaKaupungeissa()
        {
            var tulokset = Lue().Select(MittaaLaatat).ToList();
            Console.WriteLine("      | Kaupunki | pysähdyksiä | pienin ennakko s | viat |");
            foreach (var t in tulokset) Console.WriteLine($"      | {t.Kaupunki} | {t.Pysahdyksia} | {(t.PieninEnnakko == double.MaxValue ? 0 : t.PieninEnnakko):F1} | {t.Viat.Count} |");
            var viat = tulokset.Where(t => t.Viat.Count > 0).Select(t => $"{t.Kaupunki}: {string.Join("; ", t.Viat.Take(3))}{(t.Viat.Count > 3 ? $" (+{t.Viat.Count - 3})" : "")}").ToList();
            foreach (var v in viat) Console.WriteLine("      VIKA " + v);
            Oleta.Tosi(viat.Count == 0, $"{viat.Count} kaupungissa laatat eivät ehdi");
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
