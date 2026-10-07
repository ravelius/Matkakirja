// HISTORIAMOOTTORI E3: KAPPELIN KYNTTILÄT (Siirtoseppä 7.10.2026; ehdotus-olavinlinna-seikkailu.md huone 5 ja arvoitus 2: kappalainen
// sammuttaa kynttilät, pimeässä vain Foggin oma kynttilä näyttää alttariseinän kilvet; kun kappalainen palaa, puhalla kynttilä ja
// piiloudu; "Thief: valon sammuttaminen on piiloutumista"). Puhdas ydin: tilan kynttilöiden tila, oma kynttilä, valoisuus pisteessä
// (vartijan ja kappalaisen havainto) ja toiminnon valinta. Unity-sovitin (SeikkailuKynttilat) näyttää liekit ja valon.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Seikkailu
{
    public enum KynttilaToiminto { Ei, SammutaTilan, SytytaTilan, SammutaOma, SytytaOma }

    public sealed class Kynttilat
    {
        public const double ToimintoM = 1.2, TilanValoM = 5.0, OmaValoM = 3.5, PerusValo = 0.08;

        readonly List<(double X, double Y, double Z)> paikat;
        readonly bool[] palaa;
        public bool OmaPalaa { get; private set; }
        /// <summary>Onko pelaajalla kynttilä (tarjottimelta, huone 4); ilman sitä oman kynttilän toiminnot eivät ole käytössä.</summary>
        public bool OmaKynttila { get; set; }

        public Kynttilat(IReadOnlyList<(double X, double Y, double Z)> kynttilat, bool palavat = true)
        {
            paikat = new List<(double, double, double)>(kynttilat ?? Array.Empty<(double, double, double)>());
            palaa = new bool[paikat.Count];
            for (int i = 0; i < palaa.Length; i++) palaa[i] = palavat;
        }

        public int Maara => palaa.Length;
        public bool Palaa(int i) => i >= 0 && i < palaa.Length && palaa[i];
        public int Palavia { get { int n = 0; foreach (var b in palaa) if (b) n++; return n; } }
        /// <summary>Palavien osuus 0…1 (huoneen leivotun valon kirkkaus).</summary>
        public double Osuus => palaa.Length == 0 ? 1 : (double)Palavia / palaa.Length;

        public void Aseta(int i, bool p) { if (i >= 0 && i < palaa.Length) palaa[i] = p; }
        /// <summary>Kappalainen sammuttaa kaikki ennen lähtöä (kappalainen-1).</summary>
        public void SammutaKaikki() { for (int i = 0; i < palaa.Length; i++) palaa[i] = false; }
        public void AsetaOma(bool p) { OmaPalaa = OmaKynttila && p; }

        static double Etaisyys((double X, double Y, double Z) a, double x, double y, double z)
        { double dx = a.X - x, dy = a.Y - y, dz = a.Z - z; return Math.Sqrt(dx * dx + dy * dy + dz * dz); }

        /// <summary>Lähin kynttilä (indeksi) ToimintoM:n sisällä, ehdolla palaa = haluttu tila; -1 jos ei.</summary>
        public int Lahin(double x, double y, double z, bool palava)
        {
            int paras = -1; double pd = ToimintoM;
            for (int i = 0; i < paikat.Count; i++)
            {
                if (palaa[i] != palava) continue;
                double d = Etaisyys(paikat[i], x, y, z);
                if (d <= pd) { pd = d; paras = i; }
            }
            return paras;
        }

        /// <summary>Toiminto pelaajan kohdalla: palava kynttilä lähellä → sammuta se; sammunut lähellä ja oma palaa → sytytä se; muuten
        /// oma kynttilä päälle tai pois (puhallus). Palauttaa toiminnon ja kynttilän indeksin.</summary>
        public (KynttilaToiminto Toiminto, int Indeksi) Valitse(double x, double y, double z)
        {
            int p = Lahin(x, y, z, true);
            if (p >= 0) return (KynttilaToiminto.SammutaTilan, p);
            if (OmaPalaa) { int s = Lahin(x, y, z, false); if (s >= 0) return (KynttilaToiminto.SytytaTilan, s); return (KynttilaToiminto.SammutaOma, -1); }
            if (OmaKynttila) return (KynttilaToiminto.SytytaOma, -1);
            return (KynttilaToiminto.Ei, -1);
        }

        public void Tee((KynttilaToiminto Toiminto, int Indeksi) t)
        {
            switch (t.Toiminto)
            {
                case KynttilaToiminto.SammutaTilan: Aseta(t.Indeksi, false); break;
                case KynttilaToiminto.SytytaTilan: Aseta(t.Indeksi, true); break;
                case KynttilaToiminto.SammutaOma: OmaPalaa = false; break;
                case KynttilaToiminto.SytytaOma: OmaPalaa = OmaKynttila; break;
            }
        }

        /// <summary>Valoisuus 0…1 pisteessä: perusvalo + palavat kynttilät (lineaarinen TilanValoM:iin) + oma kynttilä (pelaaja kantaa:
        /// omaPiste = pelaajan paikka, jolloin pelaaja on valaistu itse).</summary>
        public double Valoisuus(double x, double y, double z, (double X, double Y, double Z)? omaPiste = null)
        {
            double v = PerusValo;
            for (int i = 0; i < paikat.Count; i++)
                if (palaa[i]) v = Math.Max(v, 1 - Etaisyys(paikat[i], x, y, z) / TilanValoM);
            if (OmaPalaa && omaPiste is (double, double, double) o) v = Math.Max(v, 1 - Etaisyys(o, x, y, z) / OmaValoM);
            return Math.Max(0, Math.Min(1, v));
        }
    }
}
