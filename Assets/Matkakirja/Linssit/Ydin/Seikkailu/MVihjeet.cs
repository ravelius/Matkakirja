// HISTORIAMOOTTORI M-OSA: PULUN VIHJEPORTAAT HUONEISIIN 6–10 (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md kohta 5,
// taulukko "Tason 3 kohde"). Huone päätellään edistyksestä (avaimet → ovi ja muurikäytävä → köysi ja kiipeily → komero → pako), ja kohde
// on huoneen seuraava teko kävelydatan merkkinä:
//  6 naulakko (esiliina ja myssy) → keittokulho → kulho voudin pöytään → avainrengas
//  7 ampuma-aukkokomero (muuriportailla) → muurikäytävän ovi → aukkojen välinen varjo (seuraava edessä) → tikkaat harjalle
//  8 köysikieppi → sakara → seuraava ote → komeron kynnys
//  9 seuraava tiilen sauma → arkun kilvet (väärin käännetty ensin) → arkku
// 10 köysi kramppiin → vesiraja (kallion alapää) → vene
// Sovitin (SeikkailuVihjeet) kokoaa MEdistyksen pelin tilasta ja muuttaa merkin paikaksi; Vaihe kasvaa edistyessä (Vihjeet.Edistys).
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public struct MEdistys
    {
        public bool Naamio, KulhoKadessa, KulhoPoydalla, Avaimet, OviAuki, Koysikieppi, KoysiSakarassa, KiipeilyValmis, ArkkuAuki;
        /// <summary>Kiipeilyn nykyinen ote (0-pohjainen), seuraava irrottamaton tiili (−1 = kaikki irti) ja kilpien kulmat.</summary>
        public int Ote, SeuraavaTiili;
        public double Kilpi1, Kilpi2, KilpiTavoite, KilpiSallittu;
        public PakoVaihe Pako;
    }

    public static class MVihjeet
    {
        public const double MuuriportaatAlaY = 3.9, MuuriportaatYlaY = 9.1, HarjaY = 15.5;

        public static int Huone(in MEdistys e) =>
            !e.Avaimet ? 6 : !e.Koysikieppi && !e.KoysiSakarassa ? 7 : !e.KiipeilyValmis ? 8 : !e.ArkkuAuki ? 9 : 10;

        /// <summary>Edistyksen järjestysluku (kasvaa jokaisesta uudesta askeleesta; sovitin nollaa vihjeen jumiajastimen sen kasvaessa).</summary>
        public static int Vaihe(in MEdistys e)
        {
            int n = 0;
            foreach (bool b in new[] { e.Naamio, e.KulhoKadessa || e.KulhoPoydalla, e.KulhoPoydalla, e.Avaimet, e.OviAuki, e.Koysikieppi || e.KoysiSakarassa, e.KoysiSakarassa, e.KiipeilyValmis, e.ArkkuAuki }) if (b) n++;
            return n * 100 + Math.Max(0, e.Ote) + (e.SeuraavaTiili < 0 ? 20 : e.SeuraavaTiili) + (int)e.Pako * 30;
        }

        static bool Oikein(double kulma, in MEdistys e) => Math.Abs(kulma - e.KilpiTavoite) <= e.KilpiSallittu;

        /// <summary>Tason 3 kohde merkin nimenä (pelaajan paikka glTF-kehyksessä vaiheen ja suunnan valintaan); null = ei kohdetta.</summary>
        public static string Kohde(in MEdistys e, KavelyData d, double px, double py, double pz)
        {
            switch (Huone(e))
            {
                case 6:
                    if (!e.Naamio) return "naulakko:tott-kammio";
                    if (!e.KulhoKadessa && !e.KulhoPoydalla) return "esine:keittokulho";
                    if (e.KulhoKadessa) return "esine:kulho-poydalle";
                    return "esine:avainrengas";
                case 7:
                    if (!e.OviAuki) return py > MuuriportaatAlaY && py < MuuriportaatYlaY ? "piilo:muuriporras-2-komero" : "ovi:muurikaytava";
                    if (py >= HarjaY) return "esine:koysikieppi";
                    return SeuraavaVarjo(d, px, pz) ?? "kiipeily:tikkaat-harja";
                case 8:
                    if (!e.KoysiSakarassa) return "koysi:sakara";
                    var ote = "ote:kellotorni-" + (Math.Max(0, e.Ote) + 2);
                    return Paikka(d, ote) != null ? ote : "komero:kellotorni";   // viimeiseltä otteelta komeron kynnykselle
                case 9:
                    if (e.SeuraavaTiili >= 0) return "tiili:komero-" + (e.SeuraavaTiili + 1);
                    if (!Oikein(e.Kilpi1, e)) return "kilpi:arkku-1";
                    if (!Oikein(e.Kilpi2, e)) return "kilpi:arkku-2";
                    return "esine:arkku-komero";
                default:
                    switch (e.Pako)
                    {
                        case PakoVaihe.Odottaa: case PakoVaihe.Kello: return "koysi:krampi-komero";
                        case PakoVaihe.Lasku: case PakoVaihe.Kallio: return "reitti:pako-5";
                        case PakoVaihe.K4: case PakoVaihe.Uinti: case PakoVaihe.Koysi: return "vene:pako";
                        default: return null;
                    }
            }
        }

        /// <summary>Muurikäytävän seuraava varjo (piilo:muurikaytava-vali-N) pelaajan edessä kohti tikkaita (pienempi x), lähin ensin.</summary>
        static string SeuraavaVarjo(KavelyData d, double px, double pz)
        {
            if (d == null) return null;
            KavelyMerkki paras = null; double pd = double.MaxValue;
            foreach (var m in d.Lajia("piilo"))
            {
                if (!m.Tunnus.StartsWith("muurikaytava-vali", StringComparison.Ordinal) || m.X >= px - 0.5) continue;
                double e = (m.X - px) * (m.X - px) + (m.Z - pz) * (m.Z - pz);
                if (e < pd) { pd = e; paras = m; }
            }
            return paras?.Nimi;
        }

        /// <summary>Merkin paikka (glTF) nimellä; null, jos ei datassa.</summary>
        public static (double X, double Y, double Z)? Paikka(KavelyData d, string nimi)
        {
            if (d == null || nimi == null) return null;
            foreach (var m in d.Merkit) if (m.Nimi == nimi) return (m.X, m.Y, m.Z);
            return null;
        }
    }
}
