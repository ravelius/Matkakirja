// ELÄVÄ KAUPUNKI: SAVU PIIPUISTA JA LIPUT LIEHUMAAN (Linssiseppä 9.10.2026; Päätoimittaja juna 171, suunnitelma B8). Lukee
// tyokalut/elava_savu_liput.py:n kentät paketista (Resources/Elava/elava-<kohde>.json: "piiput" [{x, z, korkeus}] ja "liput"
// [{x, z, tyvi, korkeus, maa}], OSM man_made=chimney / flagpole, ODbL). Noin 40 % piipuista savuaa (deterministisesti siemenestä,
// voima vaihtelee; korkeat teollisuus- ja kaukolämpöpiiput voimakkaammin). Katolla olevan piipun height-tagi on piipun oma korkeus
// (Pariisi: 7 m Hôtel de Villen katolla), joten alle KattoRajaM:n piippu nostetaan KattoNostoM:llä. Näkyvyys: lähimmät enintään
// Maarat[taso] piippua SavuNakyvaM:n ja lippua LippuNakyvaM:n sisällä. Tuuli: LIVE-sää (mistä-suunta, MET Norway) tai varatuuli
// (sama kuin muilla palloilla). SavuHiukkanen ja LipunAalto ovat samat kaavat kuin varjostimissa ElavaSavu ja ElavaLippu.
// Koordinaatit paketin origossa (x itä, z pohjoinen, y korkeus, m). Puhdas C#: SavuJaLiputTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Elava
{
    public sealed class SavuJaLiput
    {
        public const double SavuNakyvaM = 3000, LippuNakyvaM = 1500, SavuOsuus = 0.4, KattoRajaM = 15, KattoNostoM = 18;
        public const double SavuElinaikaS = 16, VaraTuuliMs = 3;
        public const int SavuHiukkasia = 14;
        /// <summary>Savuavien piippujen ja lippujen enimmäismäärä laatutason (muistin) mukaan.</summary>
        public static readonly int[] Maarat = { 10, 30, 80 };

        public enum LipunMaa { Neutraali, Ruotsi, Ranska }
        public sealed class Piippu { public double X, Z, Korkeus, Voima, Mittakaava, Harmaus, Vaihe; public bool Savuaa; }
        public sealed class Lippu { public double X, Z, Tyvi, Korkeus, Leveys, KangasKorkeus; public LipunMaa Maa; }

        public readonly List<Piippu> Piiput = new List<Piippu>();
        public readonly List<Lippu> Liput = new List<Lippu>();
        public int Savuavia { get; private set; }

        public static SavuJaLiput Lue(string json, int siemen)
        {
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            var s = new SavuJaLiput();
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "piiput")))
            {
                var p = MiniJson.Objekti(o);
                double x = MiniJson.Luku(p, "x") ?? 0, z = MiniJson.Luku(p, "z") ?? 0, k = MiniJson.Luku(p, "korkeus") ?? 25;
                double h1 = Hajautus(x, z, siemen), h2 = Hajautus(z, x, siemen + 1), h3 = Hajautus(x + z, x - z, siemen + 2);
                var pp = new Piippu
                {
                    X = x, Z = z, Korkeus = SavunKorkeus(k), Savuaa = h1 < SavuOsuus,
                    // Korkea piippu (≥ 60 m): voimalaitos tai kaukolämpö, aina vahva ja usein valkoinen höyry; matalat vaihtelevat.
                    Voima = k >= 60 ? 0.75 + 0.25 * h2 : 0.35 + 0.65 * h2, Mittakaava = Math.Max(0.7, Math.Min(2.5, k / 45)),
                    Harmaus = k >= 60 ? 0.25 * h3 : 0.3 + 0.6 * h3, Vaihe = h3,
                };
                if (pp.Savuaa) s.Savuavia++;
                s.Piiput.Add(pp);
            }
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "liput")))
            {
                var p = MiniJson.Objekti(o);
                double k = MiniJson.Luku(p, "korkeus") ?? 6;
                var maa = MaaKoodista(MiniJson.Teksti(p, "maa"));
                double lev = Math.Max(1.2, Math.Min(4.0, k * 0.3));
                s.Liput.Add(new Lippu { X = MiniJson.Luku(p, "x") ?? 0, Z = MiniJson.Luku(p, "z") ?? 0, Tyvi = MiniJson.Luku(p, "tyvi") ?? 0, Korkeus = k,
                    Leveys = lev, KangasKorkeus = lev / (maa == LipunMaa.Ruotsi ? 1.6 : 1.5), Maa = maa });
            }
            return s;
        }

        public static LipunMaa MaaKoodista(string m) => m == "SE" ? LipunMaa.Ruotsi : m == "FR" ? LipunMaa.Ranska : LipunMaa.Neutraali;

        /// <summary>Savun lähtökorkeus maasta: katolla olevan (alle KattoRajaM) piipun tagi kertoo oman korkeuden katosta.</summary>
        public static double SavunKorkeus(double korkeus) => korkeus < KattoRajaM ? korkeus + KattoNostoM : korkeus;

        /// <summary>Deterministinen 0–1 paikasta ja siemenestä (sama piippu savuaa joka kerta).</summary>
        public static double Hajautus(double x, double z, int siemen)
        {
            unchecked
            {
                uint h = (uint)(int)Math.Round(x * 10) * 73856093u ^ (uint)(int)Math.Round(z * 10) * 19349663u ^ (uint)siemen * 83492791u;
                h ^= h >> 13; h *= 0x5bd1e995u; h ^= h >> 15;
                return (h & 0xFFFFFF) / (double)0x1000000;
            }
        }

        /// <summary>Lähimmät enintään maara pistettä säteen sisällä (indeksit lähimmästä alkaen); ehto rajaa (esim. vain savuavat).</summary>
        public static List<int> Lahimmat<T>(IList<T> kohteet, Func<T, (double X, double Z)> paikka, double cx, double cz, double sade, int maara, Func<T, bool> ehto = null)
        {
            var e = new List<(double D, int I)>();
            for (int i = 0; i < kohteet.Count; i++)
            {
                if (ehto != null && !ehto(kohteet[i])) continue;
                var (x, z) = paikka(kohteet[i]);
                double d = (x - cx) * (x - cx) + (z - cz) * (z - cz);
                if (d < sade * sade) e.Add((d, i));
            }
            e.Sort((a, b) => a.D != b.D ? a.D.CompareTo(b.D) : a.I.CompareTo(b.I));
            var ulos = new List<int>(Math.Min(maara, e.Count));
            for (int i = 0; i < e.Count && i < maara; i++) ulos.Add(e[i].I);
            return ulos;
        }

        /// <summary>Tuuli: suunta, johon tuuli puhaltaa (yksikkövektori x itä, z pohjoinen) ja nopeus (m/s). LIVE-sää antaa suunnan,
        /// josta tuuli tulee (MET Norway wind_from_direction); ilman sitä varasuunta (puhaltaa kohti, kuten MuutPallot) ja VaraTuuliMs.</summary>
        public static (double X, double Z, double Ms) Tuuli(double? mistaAst, double? ms, double varaKohtiAst)
        {
            double kohti = mistaAst.HasValue ? mistaAst.Value + 180 : varaKohtiAst, a = kohti * Math.PI / 180;
            double v = ms.HasValue && !double.IsNaN(ms.Value) ? Math.Max(0, ms.Value) : VaraTuuliMs;
            return (Math.Sin(a), Math.Cos(a), v);
        }

        /// <summary>Lippukankaan kierto pystyakselin ympäri (°, Unityn Euler y): kankaan +x (vapaa reuna) myötätuuleen.</summary>
        public static double LipunSuuntima(double tx, double tz) => Math.Atan2(-tz, tx) * 180 / Math.PI;

        /// <summary>Lipun aalto tuulesta (kangas yksikköleveänä: x 0 tangossa → 1 vapaa reuna): amplitudi (osuus leveydestä, kasvaa
        /// vapaata reunaa kohti varjostimessa), kulmanopeus (rad/s), aaltoluku (rad leveyttä kohti) ja riippu (0 = suorana, 1 = roikkuu).</summary>
        public static (double Amplitudi, double Kulmanopeus, double Aaltoluku, double Riippu) LipunAalto(double ms)
        {
            double v = Math.Max(0, Math.Min(20, ms));
            double riippu = Math.Max(0, Math.Min(1, 1 - v / 5));
            return (0.04 + 0.12 * Math.Min(1, v / 8) - 0.04 * Math.Max(0, v - 12) / 8, 2.5 + 0.9 * v, 7.0 + 0.15 * v, riippu * riippu);
        }

        /// <summary>Savuhiukkasen paikka piipun suulta (m, x itä, z pohjoinen), säde (m) ja peittävyys ikäosuudesta a (0–1), hiukkasen
        /// satunnaisluvusta r ja piipun voimasta ja mittakaavasta. Nousu hidastuu, tuuli taivuttaa ja levittää; sama kaava ElavaSavussa.</summary>
        public static (double X, double Y, double Z, double Sade, double Alfa) SavuHiukkanen(double a, double r, double voima, double mittakaava, double tx, double tz, double ms)
        {
            double ika = a * SavuElinaikaS, v = Math.Max(0.3, Math.Min(14, ms));
            double nousu = (22 * (1 - Math.Exp(-ika / 5)) / (1 + 0.12 * v) + 0.4 * ika) * mittakaava;
            double ajo = v * 0.8 * ika * (0.35 + 0.65 * a);
            double sivu = ((r - 0.5) * (2 + ika * 0.6) + Math.Sin(ika * 0.7 + r * 6.2832) * 0.8) * mittakaava;
            double sade = (1.8 + 10 * a) * (0.6 + 0.4 * voima) * mittakaava;
            double alku = Math.Max(0, Math.Min(1, a / 0.1)); alku = alku * alku * (3 - 2 * alku);
            return (tx * ajo - tz * sivu, nousu, tz * ajo + tx * sivu, sade, alku * Math.Pow(1 - a, 1.5) * voima * 0.5);
        }
    }
}
