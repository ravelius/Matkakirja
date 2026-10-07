// HISTORIAMOOTTORI V3: VARTIJAN AIVOT (Siirtoseppä 7.10.2026; arkkitehtuuri docs/raportit/siirtoseppa-historiamoottori-20261007.md
// kohta 11: hiiviskely vartijan ohi, harhautus heitolla). Puhdas ydin: päätökset ja mittarit; Unity-sovitin (V3b) liikuttaa vartijaa
// NavMeshillä Kohteeseen, kertoo näkölinjan (säde), pelaajan valoisuuden ja äänet, ja soittaa leikkeet (partio, etsi, juoksu).
// Tilat: Partio (reitti partio:<osa>-N merkeistä, odotus pisteissä) → Epaily (pysähtyy, kääntyy ärsykkeeseen, havaintomittari nousee)
// → Etsinta (kävelee viimeiseen havainto- tai äänipaikkaan ja katselee) → Paluu (lähimpään partiopisteeseen) → Partio; täysi mittari
// = Kiinni (pelaaja tarkistuspisteeseen). Kaikki vaakatasossa (x, z), metreinä ja sekunteina; yaw 0 = +z, myötäpäivään (kuten Kavely).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Seikkailu
{
    public enum VartijanTila { Partio, Epaily, Etsinta, Paluu, Kiinni }

    /// <summary>Ääni maailmassa (heitetty esine, juoksuaskel): paikka ja kuuluvuus metreinä (kuuluu, jos etäisyys ≤ kuuluvuus).</summary>
    public readonly struct Aani
    {
        public readonly double X, Z, KuuluvuusM;
        public Aani(double x, double z, double kuuluvuusM) { X = x; Z = z; KuuluvuusM = kuuluvuusM; }
    }

    /// <summary>Yhden kehyksen havaintosyöte sovittimelta.</summary>
    public struct VartijanSyote
    {
        public double VartijaX, VartijaZ, PelaajaX, PelaajaZ;
        /// <summary>Säde vartijan silmistä pelaajan rintaan osuu vain pelaajaan (ei seinää).</summary>
        public bool NakolinjaVapaa;
        /// <summary>Pelaajan valoisuus 0 (pimeä) … 1 (soihdun valossa).</summary>
        public double Valoisuus;
        public bool Hiipii, Piilossa;
        public List<Aani> Aanet;
    }

    public sealed class Vartija
    {
        public const double NakoKulma = 55, NakoM = 10, LahiM = 2.0, EpailyRaja = 0.3, MittariLaskuS = 0.25;
        public const double EtsintaKatseluS = 6, EpailyUnohdusS = 2.0, PerillaM = 0.6, KavelyMs = 1.2, KiireMs = 2.2, KaantoAsteS = 160;

        readonly List<(double X, double Z, double OdotaS)> reitti;
        int piste; double odotus;
        double rauhaS, katseluS;
        public VartijanTila Tila { get; private set; } = VartijanTila.Partio;
        /// <summary>Havaintomittari 0…1 (1 = kiinni).</summary>
        public double Mittari { get; private set; }
        /// <summary>NavMeshin kohde ja haluttu vauhti (0 = seisoo).</summary>
        public double KohdeX { get; private set; }
        public double KohdeZ { get; private set; }
        public double Vauhti { get; private set; }
        /// <summary>Katseen suunta (yaw asteina); sovitin kääntää vartijan tähän, kun se seisoo.</summary>
        public double Yaw { get; set; }
        public double EpailyX { get; private set; }
        public double EpailyZ { get; private set; }

        public Vartija(IReadOnlyList<(double X, double Z, double OdotaS)> partioreitti, double yaw = 0)
        {
            reitti = new List<(double, double, double)>(partioreitti ?? Array.Empty<(double, double, double)>());
            Yaw = yaw;
            if (reitti.Count > 0) { KohdeX = reitti[0].X; KohdeZ = reitti[0].Z; }
        }

        static double Kulma(double a) => ((a + 180) % 360 + 360) % 360 - 180;
        static double Suunta(double dx, double dz) => Math.Atan2(dx, dz) * 180 / Math.PI;

        /// <summary>Näkeekö vartija pelaajan nyt ja kuinka voimakkaasti (0…1 per sekunti mittariin).</summary>
        public double NakoVoima(in VartijanSyote s)
        {
            if (s.Piilossa || !s.NakolinjaVapaa) return 0;
            double dx = s.PelaajaX - s.VartijaX, dz = s.PelaajaZ - s.VartijaZ, d = Math.Sqrt(dx * dx + dz * dz);
            double ulottuma = NakoM * (0.35 + 0.65 * Math.Max(0, Math.Min(1, s.Valoisuus))) * (s.Hiipii ? 0.7 : 1);
            if (d > ulottuma) return 0;
            double ero = Math.Abs(Kulma(Suunta(dx, dz) - Yaw));
            bool lahella = d < LahiM;                       // aivan vieressä vartija tuntee pelaajan selkänsäkin takaa (hitaammin)
            if (ero > NakoKulma && !lahella) return 0;
            double keskelle = ero <= NakoKulma ? 1 - 0.5 * ero / NakoKulma : 0.35;
            double lahelle = 1 - d / ulottuma;
            return (0.6 + 2.4 * lahelle) * keskelle;        // kaukaa reunalta ~0,3/s, läheltä edestä ~3/s
        }

        public void Paivita(double dt, VartijanSyote s)
        {
            if (Tila == VartijanTila.Kiinni) { Vauhti = 0; return; }
            double voima = NakoVoima(s);
            if (voima > 0) { Mittari = Math.Min(1, Mittari + voima * dt); EpailyX = s.PelaajaX; EpailyZ = s.PelaajaZ; rauhaS = 0; }
            else { Mittari = Math.Max(0, Mittari - MittariLaskuS * dt); rauhaS += dt; }
            if (Mittari >= 1) { Tila = VartijanTila.Kiinni; Vauhti = 0; return; }
            // Kuulo: kuuluva ääni vie etsintään (harhautus), ellei vartija jo näe pelaajaa.
            if (s.Aanet != null && voima <= 0)
                foreach (var a in s.Aanet)
                {
                    double dx = a.X - s.VartijaX, dz = a.Z - s.VartijaZ;
                    if (dx * dx + dz * dz <= a.KuuluvuusM * a.KuuluvuusM) { Tila = VartijanTila.Etsinta; EpailyX = a.X; EpailyZ = a.Z; katseluS = 0; rauhaS = 0; break; }
                }
            if (voima > 0 && Mittari >= EpailyRaja && Tila != VartijanTila.Etsinta) Tila = VartijanTila.Epaily;
            switch (Tila)
            {
                case VartijanTila.Partio: Partio(dt, s); break;
                case VartijanTila.Epaily:
                    Vauhti = 0; Kaanny(dt, Suunta(EpailyX - s.VartijaX, EpailyZ - s.VartijaZ));
                    if (voima <= 0 && rauhaS > EpailyUnohdusS) { Tila = Mittari > 0.05 ? VartijanTila.Etsinta : VartijanTila.Paluu; katseluS = 0; }
                    break;
                case VartijanTila.Etsinta:
                    if (Etaisyys(s.VartijaX, s.VartijaZ, EpailyX, EpailyZ) > PerillaM) { KohdeX = EpailyX; KohdeZ = EpailyZ; Vauhti = KiireMs; }
                    else
                    {
                        Vauhti = 0; katseluS += dt;
                        Yaw = Kulma(Yaw + Math.Sin(katseluS * 1.3) * 70 * dt);   // katselee ympärilleen
                        if (katseluS > EtsintaKatseluS) { Tila = VartijanTila.Paluu; }
                    }
                    break;
                case VartijanTila.Paluu:
                    piste = Lahin(s.VartijaX, s.VartijaZ);
                    Tila = VartijanTila.Partio; odotus = 0;
                    Partio(dt, s);
                    break;
            }
        }

        void Partio(double dt, in VartijanSyote s)
        {
            if (reitti.Count == 0) { Vauhti = 0; return; }
            var p = reitti[piste];
            KohdeX = p.X; KohdeZ = p.Z;
            if (Etaisyys(s.VartijaX, s.VartijaZ, p.X, p.Z) > PerillaM) { Vauhti = KavelyMs; odotus = 0; return; }
            Vauhti = 0; odotus += dt;
            if (odotus >= p.OdotaS) { piste = (piste + 1) % reitti.Count; odotus = 0; var q = reitti[piste]; KohdeX = q.X; KohdeZ = q.Z; Vauhti = KavelyMs; }
        }

        void Kaanny(double dt, double tavoite)
        {
            double ero = Kulma(tavoite - Yaw), askel = KaantoAsteS * dt;
            Yaw = Kulma(Yaw + Math.Max(-askel, Math.Min(askel, ero)));
        }

        int Lahin(double x, double z)
        {
            int paras = 0; double pd = double.MaxValue;
            for (int i = 0; i < reitti.Count; i++) { double d = Etaisyys(x, z, reitti[i].X, reitti[i].Z); if (d < pd) { pd = d; paras = i; } }
            return paras;
        }

        static double Etaisyys(double ax, double az, double bx, double bz) { double dx = bx - ax, dz = bz - az; return Math.Sqrt(dx * dx + dz * dz); }

        /// <summary>Tarkistuspisteen jälkeen: vartija takaisin partioon, mittari nollaan.</summary>
        public void Nollaa(double x, double z) { Tila = VartijanTila.Partio; Mittari = 0; piste = Lahin(x, z); odotus = 0; rauhaS = 0; }
    }
}
