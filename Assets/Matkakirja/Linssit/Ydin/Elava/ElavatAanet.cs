// ELÄVÄN KAUPUNGIN PAIKALLISET KERTA-ÄÄNET (Linssiseppä 9.10.2026; PT junaan 172, Pelikoodarin aanet/pallo-elava-v2): puhdas logiikka,
// Unity soittaa 3D-lähteinä äänen paikkaan (ElavaKaupunki, lähdepooli). Kaikki valinnat siemenestä (deterministinen, testit toistuvat).
//  OHIAJOT: lähimmät näkyvät autot ja raitiovaunut; ohiajo alkaa EnnakkoS ennen ajoneuvon lähintä kohtaa kamerasta (suhteellinen
//    liike: r = ajoneuvo − kamera, v = ajoneuvon nopeus − kameran nopeus), kun lähin etäisyys < KuuluuM. Enintään yksi kerrallaan,
//    alkujen väli ValiMinS–ValiMaxS, sama ajoneuvo ei uudelleen UusintaS:n sisällä. Raitiovaunu → raitiovaunu-ohi, auto → auto-ohi,
//    harvoin (BussiOsuus) bussi-ohi. Taso: täysi TaysiM:ssä, hiljaa KuuluuM:ssä (neliöllinen).
//    VESI (juna 173, Pelikoodarin pallo-kaupunki-v1): oma Ohiajot(siemen, vesi: true) pienille veneille (VeneTyypit) → vene-ohi,
//    huippu ~4,5 s (ennakko VeneEnnakkoS), väli VeneValiMinS–VeneValiMaxS, sama vene ei uudelleen VeneUusintaS:n sisällä.
//  POLTIN: muun pallon poltin syttyy (MuutPallot.Poltin 0 → 1), pallo näkyvissä (yli lahinM: ElavaKaupunki piilottaa alle 400 m:n
//    pallot, joten ääni ei tule näkymättömästä) ja alle KuuluuM:n; sama pallo enintään PalloValiS välein, kaikki ValiS välein.
//  IHMISET: OSM-paikat elava-<id>.json:sta (aukiot: tyokalut/elava_ihmiset.py; kadut ja vesiliikenteen reittien päät = laiturit).
//    Vain kun kamera on alle KorkeusRajaM maasta ja paikka alle EtaisyysRajaM:n päässä. Väli 1–3 min, katusoittaja omalla kellolla
//    3–6 min vain toreilla (place=square tai iso aukio); sama ääni ei peräkkäin; voimakkuus ja sävelkorkeus ±5 %.
// Puhdas C#: ElavatAanetTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aanet;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Elava
{
    public static class ElavaValinta
    {
        /// <summary>Satunnainen vaihtoehto sarjasta, ei sama kuin edellinen (kun vaihtoehtoja on useampi).</summary>
        public static string Vaihtoehto(string[] sarja, Random r, string edellinen)
        {
            int i = r.Next(sarja.Length);
            if (sarja.Length > 1 && sarja[i] == edellinen) i = (i + 1 + r.Next(sarja.Length - 1)) % sarja.Length;
            return sarja[i];
        }
    }

    public sealed class Ohiajot
    {
        public enum Laji { Auto, Bussi, Raitiovaunu, Vene }
        public const double KuuluuM = 250, TaysiM = 60, ValiMinS = 4, ValiMaxS = 8, BussiOsuus = 0.15, EnnakkoS = 3.8, UusintaS = 30;   // ennakko ≥ suurin huippu (PalloElavaAanet.Huippu)
        public const double VeneEnnakkoS = 5.0, VeneValiMinS = 10, VeneValiMaxS = 20, VeneUusintaS = 60;   // ennakko ≥ vene-ohin huippu 4,5 s
        /// <summary>Pienet veneet (VeneMallit.Tyypit), joille vene-ohi soi; isommilla on jo VeneAanet-silmukka eikä ohiajoa.
        /// "vene" = moottorivene (myös VeneAanet moottorivene-silmukka kaukaa); pikkulautat (Pariisissa sähköiset navetit) eivät.</summary>
        public static readonly string[] VeneTyypit = { "vene" };
        public sealed class Ohiajo { public int Avain; public Laji Laji; public string Tunnus; public double Taso, LahinM, AikaS; }

        readonly Random rnd;
        readonly Dictionary<int, double> soitettu = new Dictionary<int, double>();
        double seuraava = double.NegativeInfinity, nyt;
        int varattuAvain = -1; Laji varattuLaji; string varattuTunnus;
        string edellinen;
        int pAvain = -1; bool pRaitio; double pLahin, pAika;

        readonly bool vesi; readonly double valiMin, valiMax, uusinta, ennakko;

        public Ohiajot(int siemen, bool vesi = false)
        {
            rnd = new Random(siemen); this.vesi = vesi;
            valiMin = vesi ? VeneValiMinS : ValiMinS; valiMax = vesi ? VeneValiMaxS : ValiMaxS; uusinta = vesi ? VeneUusintaS : UusintaS; ennakko = vesi ? VeneEnnakkoS : EnnakkoS;
        }

        /// <summary>Lähin kohta suoraviivaisessa suhteellisessa liikkeessä: aika (s, negatiivinen = jo ohi) ja etäisyys (m).</summary>
        public static (double AikaS, double EtaisyysM) Lahin(double rx, double ry, double rz, double vx, double vy, double vz)
        {
            double vv = vx * vx + vy * vy + vz * vz;
            double t = vv > 1e-9 ? -(rx * vx + ry * vy + rz * vz) / vv : 0;
            double px = rx + vx * t, py = ry + vy * t, pz = rz + vz * t;
            return (t, Math.Sqrt(px * px + py * py + pz * pz));
        }

        /// <summary>Etäisyyden taso: täysi TaysiM:ssä, hiljaa KuuluuM:ssä.</summary>
        public static double Taso(double d) => PalloElavaAanet.Etaisyystaso(d, TaysiM, KuuluuM, 2);

        /// <summary>Kehyksen alku: ehdokkaat nollataan.</summary>
        public void Aloita(double nytS) { nyt = nytS; pAvain = -1; }

        /// <summary>Ajoneuvo ehdokkaaksi (avain yksilöi ajoneuvon; r ja v kuten Lahin). Lähin tuleva ohitus voittaa.</summary>
        public void Ehdokas(int avain, bool raitio, double rx, double ry, double rz, double vx, double vy, double vz, double ennakkoS = double.NaN)
        {
            var (t, d) = Lahin(rx, ry, rz, vx, vy, vz);
            if (t < 0 || t > (double.IsNaN(ennakkoS) ? ennakko : ennakkoS) || d >= KuuluuM) return;
            if (soitettu.TryGetValue(avain, out var s) && nyt - s < uusinta) return;
            if (pAvain >= 0 && d >= pLahin) return;
            pAvain = avain; pRaitio = raitio; pLahin = d; pAika = t;
        }

        /// <summary>Kehyksen loppu: ohiajo soitettavaksi tai null (soi = edellinen ohiajo vielä soi).</summary>
        public Ohiajo Valitse(bool soi)
        {
            if (pAvain < 0 || soi || nyt < seuraava) return null;
            // Ääni valitaan kerran ajoneuvolle; ohiajo alkaa, kun lähimpään kohtaan on äänen huipun verran (Pelikoodari 9.10.: huiput
            // 1,2–3,6 s alusta), jolloin huippu osuu ohitukseen.
            if (varattuAvain != pAvain)
            {
                varattuLaji = vesi ? Laji.Vene : pRaitio ? Laji.Raitiovaunu : rnd.NextDouble() < BussiOsuus ? Laji.Bussi : Laji.Auto;
                var sarja0 = varattuLaji == Laji.Vene ? PalloKaupunkiAanet.VeneOhi : varattuLaji == Laji.Raitiovaunu ? PalloElavaAanet.RaitioOhi
                    : varattuLaji == Laji.Bussi ? PalloElavaAanet.BussiOhi : PalloElavaAanet.AutoOhi;
                varattuTunnus = ElavaValinta.Vaihtoehto(sarja0, rnd, edellinen); varattuAvain = pAvain;
            }
            if (pAika > (varattuLaji == Laji.Vene ? PalloKaupunkiAanet.VeneHuippuS : PalloElavaAanet.Huippu(varattuTunnus)) + 0.05) return null;
            var laji = varattuLaji; string tunnus = varattuTunnus; varattuAvain = -1;
            edellinen = tunnus;
            seuraava = nyt + valiMin + (valiMax - valiMin) * rnd.NextDouble();
            if (soitettu.Count > 64) { var vanhat = new List<int>(); foreach (var kv in soitettu) if (nyt - kv.Value >= uusinta) vanhat.Add(kv.Key); foreach (var k in vanhat) soitettu.Remove(k); }
            soitettu[pAvain] = nyt;
            double kerroin = laji == Laji.Vene ? PalloKaupunkiAanet.VeneTaso : laji == Laji.Raitiovaunu ? PalloElavaAanet.RaitioTaso : laji == Laji.Bussi ? PalloElavaAanet.BussiTaso : PalloElavaAanet.AutoTaso;
            return new Ohiajo { Avain = pAvain, Laji = laji, Tunnus = tunnus, Taso = kerroin * Taso(pLahin), LahinM = pLahin, AikaS = pAika };
        }
    }

    public sealed class PoltinAanet
    {
        public const double KuuluuM = 1000, TaysiM = 450, PalloValiS = 20, ValiS = 6;
        public sealed class Polte { public int Pallo; public string Tunnus; public double Taso, EtaisyysM; }

        readonly Random rnd;
        double[] ed, viime;
        double seuraava = double.NegativeInfinity;
        string edellinen;

        public PoltinAanet(int siemen) { rnd = new Random(siemen); }

        public static double Taso(double d) => PalloElavaAanet.PoltinTaso * PalloElavaAanet.Etaisyystaso(d, TaysiM, KuuluuM);

        /// <summary>Joka kehys pallojen päivityksen jälkeen: kamera paketin ENU:ssa, pallojen maa maaM (Y on korkeus maasta),
        /// lahinM = näkyvyyden alaraja. Palauttaa lähimmän syttyneen polttimen tai null.</summary>
        public Polte Paivita(double nyt, MuutPallot p, double kx, double ky, double kz, double maaM, double lahinM)
        {
            if (p == null || p.Maara == 0) return null;
            if (ed == null || ed.Length != p.Maara) { ed = (double[])p.Poltin.Clone(); viime = new double[p.Maara]; for (int i = 0; i < viime.Length; i++) viime[i] = double.NegativeInfinity; return null; }
            int paras = -1; double parasD = double.MaxValue;
            for (int i = 0; i < p.Maara; i++)
            {
                bool syttyi = p.Poltin[i] > 0.5 && ed[i] <= 0.5;
                ed[i] = p.Poltin[i];
                if (!syttyi) continue;
                double dx = p.X[i] - kx, dy = maaM + p.Y[i] - ky, dz = p.Z[i] - kz, d = Math.Sqrt(dx * dx + dy * dy + dz * dz);
                if (d <= lahinM || d >= KuuluuM || nyt - viime[i] < PalloValiS) continue;
                if (d < parasD) { paras = i; parasD = d; }
            }
            if (paras < 0 || nyt < seuraava) return null;
            viime[paras] = nyt; seuraava = nyt + ValiS;
            edellinen = ElavaValinta.Vaihtoehto(PalloElavaAanet.PoltinKaukainen, rnd, edellinen);
            return new Polte { Pallo = paras, Tunnus = edellinen, Taso = Taso(parasD), EtaisyysM = parasD };
        }
    }

    public sealed class IhmisAanet
    {
        public enum Paikka { Aukio, Tori, Katu, Laituri }
        public const double KorkeusRajaM = 150, EtaisyysRajaM = 200, TaysiM = 30, HiljaM = 260, ValiMinS = 60, ValiMaxS = 180,
            SoittajaMinS = 180, SoittajaMaxS = 360, Vaihtelu = 0.05, ToriAlaM2 = 1000, KatuValiM = 60, LaituriYhdistysM = 40;
        public const double SorinaTaso = 0.6, NauruTaso = 0.5, LapsiTaso = 0.5, KelloTaso = 0.45, SoittajaTaso = 0.55, TorviTaso = 0.7;
        public sealed class Tapahtuma { public string Tunnus; public Paikka Laji; public double X, Z, Taso, Savel, EtaisyysM; }

        public readonly List<(double X, double Z, Paikka Laji)> Paikat = new List<(double, double, Paikka)>();
        readonly Random rnd;
        double seuraava = double.NaN, soittajaSeuraava = double.NaN;
        string edellinen;

        // Luokat: sarja, sallitut paikat, paino, taso.
        static readonly (string[] Sarja, Paikka[] Paikat, double Paino, double Taso)[] Luokat =
        {
            (PalloElavaAanet.Sorina, new[] { Paikka.Aukio, Paikka.Tori }, 4, SorinaTaso),
            (PalloElavaAanet.Nauru, new[] { Paikka.Aukio, Paikka.Tori }, 2, NauruTaso),
            (PalloElavaAanet.Lapsi, new[] { Paikka.Aukio, Paikka.Tori }, 1.5, LapsiTaso),
            (PalloElavaAanet.PyoranKello, new[] { Paikka.Katu }, 2, KelloTaso),
            (PalloElavaAanet.LaivanTorvi, new[] { Paikka.Laituri }, 1, TorviTaso),
        };

        public IhmisAanet(int siemen) { rnd = new Random(siemen); }

        /// <summary>Paikat elävän kaupungin paketista: "aukiot" [{x, z, ala, tori}], "kadut" (pisteet KatuValiM:n välein) ja
        /// vesiliikenteen "reitit" (edestakaisten reittien päät = laiturit). Puuttuvat kentät ohitetaan.</summary>
        public static IhmisAanet Lue(string json, int siemen)
        {
            var e = new IhmisAanet(siemen);
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "aukiot")))
            {
                var a = MiniJson.ObjektiTaiNull(o); if (a == null) continue;
                bool tori = (MiniJson.Luku(a, "tori") ?? 0) != 0 || (MiniJson.Luku(a, "ala") ?? 0) >= ToriAlaM2;
                e.Paikat.Add((MiniJson.Luku(a, "x") ?? 0, MiniJson.Luku(a, "z") ?? 0, tori ? Paikka.Tori : Paikka.Aukio));
            }
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "kadut")))
            {
                var p = Pisteet(MiniJson.ObjektiTaiNull(o));
                double kertyma = 0, seur = KatuValiM * 0.5;   // pisteet tasavälein koko kadun matkalta
                for (int i = 1; i < p.Count; i++)
                {
                    double dx = p[i].x - p[i - 1].x, dz = p[i].z - p[i - 1].z, l = Math.Sqrt(dx * dx + dz * dz);
                    for (; seur <= kertyma + l && l > 1e-9; seur += KatuValiM)
                    {
                        double s = (seur - kertyma) / l;
                        e.Paikat.Add((p[i - 1].x + dx * s, p[i - 1].z + dz * s, Paikka.Katu));
                    }
                    kertyma += l;
                }
            }
            var laiturit = new List<(double x, double z)>();
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "reitit")))
            {
                var r = MiniJson.ObjektiTaiNull(o); if (r == null || MiniJson.Kentta(r, "kiertava") is bool k && k) continue;
                var p = Pisteet(r); if (p.Count < 2) continue;
                foreach (var q in new[] { p[0], p[p.Count - 1] })
                    if (!laiturit.Exists(l => (l.x - q.x) * (l.x - q.x) + (l.z - q.z) * (l.z - q.z) < LaituriYhdistysM * LaituriYhdistysM)) laiturit.Add(q);
            }
            foreach (var l in laiturit) e.Paikat.Add((l.x, l.z, Paikka.Laituri));
            return e;
        }

        static List<(double x, double z)> Pisteet(Dictionary<string, object> v)
        {
            var p = new List<(double, double)>();
            if (v == null) return p;
            foreach (var q in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(v, "p")))
            {
                var a = MiniJson.TaulukkoTaiTyhja(q);
                if (a.Count >= 2) p.Add((Convert.ToDouble(a[0]), Convert.ToDouble(a[1])));
            }
            return p;
        }

        public int Maara(Paikka laji) { int n = 0; foreach (var p in Paikat) if (p.Laji == laji) n++; return n; }

        /// <summary>Taso 3D-etäisyydestä (vaaka ja kameran korkeus maasta): täysi TaysiM:ssä, hiljaa HiljaM:ssä.</summary>
        public static double Taso(double d3) => PalloElavaAanet.Etaisyystaso(d3, TaysiM, HiljaM);

        /// <summary>Joka kehys: kamera paketin ENU:ssa (vaaka) ja korkeus maasta (m; NaN = ei tiedossa). Enintään yksi tapahtuma.</summary>
        public Tapahtuma Paivita(double nyt, double kx, double kz, double korkeusMaasta)
        {
            if (double.IsNaN(seuraava)) { seuraava = nyt + 20 + 40 * rnd.NextDouble(); soittajaSeuraava = nyt + SoittajaMinS + (SoittajaMaxS - SoittajaMinS) * rnd.NextDouble(); }
            if (double.IsNaN(korkeusMaasta) || korkeusMaasta > KorkeusRajaM || Paikat.Count == 0) return null;
            if (nyt >= soittajaSeuraava)
            {
                var t = Valitse(new[] { (PalloElavaAanet.Katusoittaja, new[] { Paikka.Tori }, 1.0, SoittajaTaso) }, kx, kz, korkeusMaasta);
                if (t != null) { soittajaSeuraava = nyt + SoittajaMinS + (SoittajaMaxS - SoittajaMinS) * rnd.NextDouble(); return t; }
            }
            if (nyt >= seuraava)
            {
                var t = Valitse(Luokat, kx, kz, korkeusMaasta);
                if (t != null) { seuraava = nyt + ValiMinS + (ValiMaxS - ValiMinS) * rnd.NextDouble(); return t; }
            }
            return null;
        }

        Tapahtuma Valitse((string[] Sarja, Paikka[] Paikat, double Paino, double Taso)[] luokat, double kx, double kz, double korkeus)
        {
            // Paikat säteellä lajeittain.
            var lahella = new Dictionary<Paikka, List<int>>();
            double r2 = EtaisyysRajaM * EtaisyysRajaM;
            for (int i = 0; i < Paikat.Count; i++)
            {
                double dx = Paikat[i].X - kx, dz = Paikat[i].Z - kz;
                if (dx * dx + dz * dz > r2) continue;
                if (!lahella.TryGetValue(Paikat[i].Laji, out var l)) lahella[Paikat[i].Laji] = l = new List<int>();
                l.Add(i);
            }
            double yht = 0; var mahd = new List<int>();
            for (int c = 0; c < luokat.Length; c++)
                foreach (var pl in luokat[c].Paikat) if (lahella.ContainsKey(pl)) { mahd.Add(c); yht += luokat[c].Paino; break; }
            if (mahd.Count == 0) return null;
            double u = rnd.NextDouble() * yht; int valittu = mahd[mahd.Count - 1];
            foreach (int c in mahd) { u -= luokat[c].Paino; if (u < 0) { valittu = c; break; } }
            var luokka = luokat[valittu];
            var ehdokkaat = new List<int>();
            foreach (var pl in luokka.Paikat) if (lahella.TryGetValue(pl, out var l)) ehdokkaat.AddRange(l);
            var p = Paikat[ehdokkaat[rnd.Next(ehdokkaat.Count)]];
            string tunnus = ElavaValinta.Vaihtoehto(luokka.Sarja, rnd, edellinen);
            edellinen = tunnus;
            double vx = p.X - kx, vz = p.Z - kz, d3 = Math.Sqrt(vx * vx + vz * vz + korkeus * korkeus);
            double vaihtelu = 1 + Vaihtelu * (2 * rnd.NextDouble() - 1), savel = 1 + Vaihtelu * (2 * rnd.NextDouble() - 1);
            return new Tapahtuma { Tunnus = tunnus, Laji = p.Laji, X = p.X, Z = p.Z, Taso = luokka.Taso * Taso(d3) * vaihtelu, Savel = savel, EtaisyysM = d3 };
        }
    }
}
