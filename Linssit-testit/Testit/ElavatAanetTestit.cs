// ELÄVÄT ÄÄNET v2 (Linssiseppä 9.10.2026; PT junaan 172, Pelikoodarin aanet/pallo-elava-v2): manifesti ja mikserin ryhmät, tasot
// etäisyyden, tuulen, sateen ja yön mukaan, ohiajo lähimmän kohdan edellä (yksi kerrallaan, väli 4–8 s), muiden pallojen poltin vain
// näkyvistä palloista, ihmisäänet matalalla OSM-paikoissa (väli 1–3 min, katusoittaja vain toreilla 3–6 min, ei samaa peräkkäin).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aanet;
using Matkakirja.Linssit.Elava;

namespace Matkakirja.Linssit.Testit
{
    static class ElavatAanetTestit
    {
        [Testi] static void ManifestiJaMikserinRyhmat()
        {
            var m = PalloElavaAanet.Lue("{\"versio\":1,\"aanet\":[{\"tunnus\":\"auto-ohi-01\",\"aani\":\"auto-ohi-01.mp3\",\"silmukka\":false,\"kesto_s\":7.5,\"LUFS\":-23.0}," +
                "{\"tunnus\":\"sade-kangas\",\"aani\":\"sade-kangas.mp3\",\"silmukka\":true,\"kesto_s\":45},{\"tunnus\":\"\",\"aani\":\"x.mp3\"},{\"aani\":\"y.mp3\"}]}");
            Oleta.Sama(2, m.Aanet.Count, "tyhjät tunnukset ohitetaan");
            Oleta.Tosi(!m.Aanet["auto-ohi-01"].Silmukka && m.Aanet["sade-kangas"].Silmukka, "silmukka-kenttä");
            Oleta.Sama(PalloElavaAanet.Juuri + "auto-ohi-01.mp3", m.Aanet["auto-ohi-01"].Osoite);
            Oleta.Sama(0, PalloElavaAanet.Lue("{}").Aanet.Count, "tyhjä manifesti");
            var kaikki = new HashSet<string>(PalloElavaAanet.Tunnukset());
            Oleta.Sama(33, kaikki.Count, "tunnukset uniikit (ohiajot 8, poltin 3, sade 2, lippu, yö, ihmiset 18)");
            foreach (var t in new[] { "auto-ohi-04", "bussi-ohi-02", "raitiovaunu-ohi-02", "poltin-kaukainen-03", "lippu-lepatus", "yo-humina",
                "ihmiset-sorina-05", "ihmiset-nauru-03", "ihmiset-lapsi-02", "pyoran-kello-03", "katusoittaja-02", "laivan-torvi-03" })
            {
                Oleta.Tosi(kaikki.Contains(t), t);
                Oleta.Sama("maisema", PalloElavaAanet.MikseriAani(t).Ryhma, t);
            }
            Oleta.Sama(("kori.sade-kangas", "saa"), PalloElavaAanet.MikseriAani("sade-kangas"));
            Oleta.Sama("saa", PalloElavaAanet.MikseriAani("sade-kori").Ryhma);
            Oleta.Sama(((string)null, (string)null), PalloElavaAanet.MikseriAani("tuntematon"));
            foreach (var a in PalloElavaAanet.Mikseri)
                foreach (char c in a.Id) Oleta.Tosi((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '.' || c == '-', "mikserin tunnus " + a.Id);
            var mk = new Aanimikseri();
            foreach (var a in PalloElavaAanet.Mikseri) mk.Rekisteroi("pallo", a.Ryhma, a.Id, a.Nimi, a.Klipit);
            Oleta.Tosi(mk.Rekisteroity("auto-ohi-03") && mk.Rekisteroity("yo-humina") && mk.Rekisteroity("elava.laivan-torvi"), "klipit ja tunnukset äänivahdille");
            Oleta.Sama(2, mk.AanetRyhmassa("pallo", "saa").Count);
            Oleta.Sama(12, mk.AanetRyhmassa("pallo", "maisema").Count);
        }

        [Testi] static void TasotEtaisyydenTuulenSateenJaYonMukaan()
        {
            Oleta.Sama(1.0, Ohiajot.Taso(40)); Oleta.Sama(1.0, Ohiajot.Taso(60)); Oleta.Sama(0.0, Ohiajot.Taso(250));
            double ed = 2;
            for (double d = 60; d <= 250; d += 10) { double t = Ohiajot.Taso(d); Oleta.Tosi(t <= ed, "ohiajo hiljenee"); ed = t; }
            Oleta.Tosi(Math.Abs(Ohiajot.Taso(155) - 0.25) < 1e-9, "puolivälissä −12 dB");
            Oleta.Sama(0.0, PalloElavaAanet.LipunTaso(130, 8), "lippu kuuluu alle 120 m");
            Oleta.Sama(0.0, PalloElavaAanet.LipunTaso(20, 0.2), "tyynellä ei lepatusta");
            Oleta.Tosi(PalloElavaAanet.LipunTaso(20, 8) > PalloElavaAanet.LipunTaso(20, 3) && PalloElavaAanet.LipunTaso(20, 3) > PalloElavaAanet.LipunTaso(80, 3), "tuuli ja etäisyys");
            Oleta.Sama(PalloElavaAanet.LippuTaso, PalloElavaAanet.LipunTaso(10, 12));
            Oleta.Sama(0.0, PalloElavaAanet.YoHuminaTaso(0)); Oleta.Sama(PalloElavaAanet.YoHuminaKerroin, PalloElavaAanet.YoHuminaTaso(1));
            Oleta.Tosi(PalloElavaAanet.YoHuminaTaso(0.3) < 0.3 * PalloElavaAanet.YoHuminaKerroin, "sininen hetki pehmeästi");
            Oleta.Sama(0.7, PalloElavaAanet.SadeVoima(0.2, 0.7)); Oleta.Sama(1.0, PalloElavaAanet.SadeVoima(1.4, 0)); Oleta.Sama(0.0, PalloElavaAanet.SadeVoima(double.NaN, -1));
            double x = 0; for (int i = 0; i < 60; i++) x = PalloElavaAanet.Liuku(x, 1, 1 / 30.0, PalloElavaAanet.SadeHaivytysS);
            Oleta.Tosi(x > 0.4 && x < 0.8, $"sade nousee pehmeästi (2 s: {x:F2})");
            Oleta.Tosi(PoltinAanet.Taso(450) == PalloElavaAanet.PoltinTaso && PoltinAanet.Taso(1000) == 0 && PoltinAanet.Taso(700) > 0, "poltin 450–1000 m");
            Oleta.Tosi(IhmisAanet.Taso(30) == 1 && IhmisAanet.Taso(260) == 0, "ihmiset 30–260 m");
        }

        [Testi] static void OhiajonLahinKohta()
        {
            var (t, d) = Ohiajot.Lahin(-100, 0, 30, 10, 0, 0);
            Oleta.Tosi(Math.Abs(t - 10) < 1e-9 && Math.Abs(d - 30) < 1e-9, $"lähin 10 s:n päästä 30 m:ssä ({t}, {d})");
            var (t2, _) = Ohiajot.Lahin(100, 0, 30, 10, 0, 0);
            Oleta.Tosi(t2 < 0, "jo ohi");
            var (t3, d3) = Ohiajot.Lahin(0, -40, 0, 0, 0, 0);
            Oleta.Tosi(t3 == 0 && Math.Abs(d3 - 40) < 1e-9, "paikallaan: nyt");
        }

        sealed class Ajoneuvo { public double X, Z, Vx; public bool Raitio; }

        static List<(double T, Ohiajot.Ohiajo O)> AjaKatu(int siemen, double kameraY, double kesto = 600)
        {
            // Kamera (0, kameraY, 0); autot kadulla z = 40 itään 10 m/s, raitiovaunut z = −90 länteen 7 m/s.
            var a = new List<Ajoneuvo>();
            for (int i = 0; i < 40; i++) a.Add(new Ajoneuvo { X = -3000 + i * 160, Z = 40, Vx = 10 });
            for (int i = 0; i < 4; i++) a.Add(new Ajoneuvo { X = 1500 + i * 900, Z = -90, Vx = -7, Raitio = true });
            var o = new Ohiajot(siemen); var tul = new List<(double, Ohiajot.Ohiajo)>(); double soiAsti = -1;
            for (double t = 0; t < kesto; t += 0.1)
            {
                o.Aloita(t);
                for (int i = 0; i < a.Count; i++)
                {
                    a[i].X += a[i].Vx * 0.1;
                    if (Math.Abs(a[i].X) > 3200) a[i].X = -Math.Sign(a[i].Vx) * 3200;
                    o.Ehdokas(i, a[i].Raitio, a[i].X, -kameraY, a[i].Z, a[i].Vx, 0, 0);
                }
                var v = o.Valitse(t < soiAsti);
                if (v != null) { tul.Add((t, v)); soiAsti = t + 6; }
            }
            return tul;
        }

        [Testi] static void OhiajoLahimmanKohdanEdellaYksiKerrallaan()
        {
            var tul = AjaKatu(7, 30);
            Oleta.Tosi(tul.Count >= 30, $"10 min: {tul.Count} ohiajoa");
            int raitio = 0, bussi = 0; string ed = null;
            for (int i = 0; i < tul.Count; i++)
            {
                var (t, o) = tul[i];
                Oleta.Tosi(o.AikaS >= 0 && o.AikaS <= Ohiajot.EnnakkoS, "alkaa ennen lähintä kohtaa");
                Oleta.Tosi(o.LahinM < Ohiajot.KuuluuM && o.Taso > 0 && o.Taso <= 1, "lähin alle 250 m");
                if (i > 0) Oleta.Tosi(t - tul[i - 1].T >= 6 - 1e-6 && t - tul[i - 1].T >= Ohiajot.ValiMinS, "yksi kerrallaan ja väli ≥ 4 s");
                if (o.Laji == Ohiajot.Laji.Raitiovaunu) { raitio++; Oleta.Tosi(Array.IndexOf(PalloElavaAanet.RaitioOhi, o.Tunnus) >= 0, "raitiovaunu-ohi"); }
                else if (o.Laji == Ohiajot.Laji.Bussi) { bussi++; Oleta.Tosi(Array.IndexOf(PalloElavaAanet.BussiOhi, o.Tunnus) >= 0, "bussi-ohi"); }
                else Oleta.Tosi(Array.IndexOf(PalloElavaAanet.AutoOhi, o.Tunnus) >= 0, "auto-ohi");
                Oleta.Tosi(o.Tunnus != ed, "sama ääni ei peräkkäin"); ed = o.Tunnus;
            }
            Oleta.Tosi(raitio >= 1, $"raitiovaunuja {raitio}");
            Oleta.Tosi(bussi < tul.Count * 0.35, $"bussi harvoin ({bussi}/{tul.Count})");
            var b = AjaKatu(7, 30);
            Oleta.Sama(tul.Count, b.Count, "deterministinen");
            for (int i = 0; i < tul.Count; i++) Oleta.Tosi(tul[i].T == b[i].T && tul[i].O.Tunnus == b[i].O.Tunnus, "sama järjestys");
            Oleta.Sama(0, AjaKatu(7, 300).Count, "kamera 300 m:ssä: ei ohiajoja");
        }

        [Testi] static void PoltinVainNakyvistaPalloista()
        {
            foreach (var (siirto, odotus) in new[] { (650.0, true), (200.0, false), (2000.0, false) })
            {
                var p = new MuutPallot(1, 3500, 90, 3.0, 11); var a = new PoltinAanet(5);
                int n = 0; double ed = double.NegativeInfinity; string edT = null;
                for (double t = 0; t < 1200; t += 0.1)
                {
                    p.Paivita(0.1);
                    double kx = p.X[0] + siirto, ky = 40 + p.Y[0], kz = p.Z[0];
                    var e = a.Paivita(t, p, kx, ky, kz, 40, 400);
                    if (e == null) continue;
                    n++;
                    Oleta.Tosi(e.EtaisyysM > 400 && e.EtaisyysM < PoltinAanet.KuuluuM && e.Taso > 0, $"näkyvä ja kuuluva ({e.EtaisyysM:F0} m)");
                    Oleta.Tosi(t - ed >= PoltinAanet.PalloValiS - 1e-6, "sama pallo ≥ 20 s välein"); ed = t;
                    Oleta.Tosi(Array.IndexOf(PalloElavaAanet.PoltinKaukainen, e.Tunnus) >= 0 && e.Tunnus != edT, "poltin-kaukainen, ei samaa peräkkäin"); edT = e.Tunnus;
                }
                Oleta.Tosi(odotus ? n >= 3 && n <= 60 : n == 0, $"siirto {siirto} m: {n} poltinta");
            }
        }

        static string Paikat => "{\"aukiot\":[{\"x\":50,\"z\":0,\"ala\":3000,\"tori\":1},{\"x\":-60,\"z\":20,\"ala\":400,\"tori\":0},{\"x\":5000,\"z\":0,\"ala\":200,\"tori\":0}]," +
            "\"kadut\":[{\"t\":\"tertiary\",\"p\":[[0,-50],[150,-50],[300,-50]]}]," +
            "\"reitit\":[{\"tyyppi\":\"lautta\",\"kiertava\":false,\"p\":[[0,120,1],[900,120,1]]},{\"tyyppi\":\"lautta\",\"kiertava\":false,\"p\":[[10,125,1],[2000,0,1]]}," +
            "{\"tyyppi\":\"vene\",\"kiertava\":true,\"p\":[[0,0,1],[50,50,1],[0,90,1]]}]}";

        [Testi] static void IhmisaanetMatalallaPaikoissa()
        {
            var h = IhmisAanet.Lue(Paikat, 3);
            Oleta.Sama(1, h.Maara(IhmisAanet.Paikka.Tori)); Oleta.Sama(2, h.Maara(IhmisAanet.Paikka.Aukio));
            Oleta.Sama(5, h.Maara(IhmisAanet.Paikka.Katu), "katu 300 m: pisteet 30, 90, …, 270");
            Oleta.Sama(3, h.Maara(IhmisAanet.Paikka.Laituri), "edestakaisten reittien päät, lähekkäiset yhdistetty, kiertävä ohi");
            var tul = new List<(double T, IhmisAanet.Tapahtuma E)>();
            for (double t = 0; t < 7200; t += 0.5) { var e = h.Paivita(t, 0, 0, 100); if (e != null) tul.Add((t, e)); }
            Oleta.Tosi(tul.Count >= 30 && tul.Count <= 140, $"2 h: {tul.Count} ääntä");
            double edYl = double.NegativeInfinity, edSo = double.NegativeInfinity; string ed = null; int soittajia = 0;
            var lajit = new HashSet<string>();
            foreach (var (t, e) in tul)
            {
                bool soittaja = Array.IndexOf(PalloElavaAanet.Katusoittaja, e.Tunnus) >= 0;
                if (soittaja) { soittajia++; Oleta.Tosi(e.Laji == IhmisAanet.Paikka.Tori, "katusoittaja vain torilla"); Oleta.Tosi(t - edSo >= IhmisAanet.SoittajaMinS - 1e-6, "soittaja 3–6 min"); edSo = t; }
                else { Oleta.Tosi(t - edYl >= IhmisAanet.ValiMinS - 1e-6, "väli ≥ 1 min"); edYl = t; }
                Oleta.Tosi(e.Tunnus != ed, "sama ääni ei peräkkäin"); ed = e.Tunnus;
                Oleta.Tosi(Math.Abs(e.Savel - 1) <= IhmisAanet.Vaihtelu + 1e-9 && e.Taso > 0, "sävel ±5 %");
                Oleta.Tosi(Math.Sqrt(e.X * e.X + e.Z * e.Z) <= IhmisAanet.EtaisyysRajaM, "paikka alle 200 m");
                if (Array.IndexOf(PalloElavaAanet.PyoranKello, e.Tunnus) >= 0) Oleta.Sama(IhmisAanet.Paikka.Katu, e.Laji, "kello kadulla");
                if (Array.IndexOf(PalloElavaAanet.LaivanTorvi, e.Tunnus) >= 0) Oleta.Sama(IhmisAanet.Paikka.Laituri, e.Laji, "torvi laiturilla");
                lajit.Add(e.Tunnus.Substring(0, e.Tunnus.Length - 3));
            }
            Oleta.Tosi(soittajia >= 10 && soittajia <= 45, $"katusoittajia {soittajia}");
            Oleta.Tosi(lajit.Count >= 5, "monta lajia: " + string.Join(", ", lajit));
            var y = IhmisAanet.Lue(Paikat, 3);
            for (double t = 0; t < 3600; t += 0.5) Oleta.Tosi(y.Paivita(t, 0, 0, 200) == null, "kamera 200 m:ssä: hiljaa");
            var k = IhmisAanet.Lue(Paikat, 3);
            for (double t = 0; t < 3600; t += 0.5) Oleta.Tosi(k.Paivita(t, 0, 0, double.NaN) == null && k.Paivita(t, 20000, 0, 50) == null, "ei maata / ei paikkoja");
        }

        [Testi] static void PaketeissaIhmistenPaikat()
        {
            foreach (var id in new[] { "tukholma", "pariisi" })
            {
                var h = IhmisAanet.Lue(System.IO.File.ReadAllText($"../Assets/Matkakirja/Linssit/Resources/Elava/elava-{id}.json"), 1);
                int aukiot = h.Maara(IhmisAanet.Paikka.Aukio) + h.Maara(IhmisAanet.Paikka.Tori);
                Oleta.Tosi(aukiot >= 300 && h.Maara(IhmisAanet.Paikka.Tori) >= 40, $"{id}: aukioita {aukiot}, toreja {h.Maara(IhmisAanet.Paikka.Tori)}");
                Oleta.Tosi(h.Maara(IhmisAanet.Paikka.Katu) >= 500, $"{id}: katupisteitä {h.Maara(IhmisAanet.Paikka.Katu)}");
                Oleta.Tosi(h.Maara(IhmisAanet.Paikka.Laituri) >= 10, $"{id}: laitureita {h.Maara(IhmisAanet.Paikka.Laituri)}");
            }
        }
    }
}
