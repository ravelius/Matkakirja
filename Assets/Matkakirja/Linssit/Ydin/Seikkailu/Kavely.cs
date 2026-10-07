// HISTORIAMOOTTORI V1: VAPAA KÄVELY OLAN YLI (Siirtoseppä 7.10.2026; omistaja 7.10. 08.4x–08.5x: vapaa kävely, kamera olan yli,
// nuori Fogg ruudussa; arkkitehtuuri docs/raportit/siirtoseppa-historiamoottori-20261007.md kohta 11). Puhdas ydin: syötteestä
// (vasen tappi / WASD / ohjaimen vasen sauva = liike, oikea = katse) kameran kulmat ja haluttu nopeus maailman vaakatasossa.
// Unity-sovitin (SeikkailuPelaaja) hoitaa törmäykset (CharacterController), painovoiman, animaation ja Cinemachinen.
// Kanoniset suunnat: yaw 0 = katse +z:aan (Unityn eteen), positiivinen yaw myötäpäivään ylhäältä katsottuna (Unityn Y-akselin kierto).
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public enum Liiketapa { Kavely, Juoksu, Hiipiminen }

    /// <summary>Yhden kehyksen syöte: liike ja katse −1…1 (katse kosketuksessa/sauvassa; hiiren delta asteina erikseen).</summary>
    public struct KavelySyote
    {
        public double LiikeX, LiikeY, KatseX, KatseY, HiiriX, HiiriY;
        public bool Juoksu, Hiipiminen;
    }

    public sealed class Kavely
    {
        public const double KavelyMs = 1.4, JuoksuMs = 3.2, HiipiminenMs = 0.9, KiihtyvyysMs2 = 8.0, JarrutusMs2 = 12.0;
        public const double KatseNopeusAsteS = 140, PitchMin = -35, PitchMax = 60, KuolleAlue = 0.12;
        public const double KaantoNopeusAsteS = 540;   // hahmo kääntyy kulkusuuntaan

        /// <summary>Kameran kierto (yaw) ja kallistus (pitch, + = katse alas) asteina.</summary>
        public double KameraYaw, KameraPitch = 12;
        /// <summary>Katseen pystyrajat (asteina, + = alas); ensimmäisessä persoonassa laajemmat (SeikkailuPelaaja asettaa).</summary>
        public double PitchAla = PitchMin, PitchYla = PitchMax;
        /// <summary>Hahmon suunta (yaw) asteina ja nopeus (m/s) vaakatasossa (x, z).</summary>
        public double HahmoYaw;
        public double NopeusX, NopeusZ;
        public Liiketapa Tapa { get; private set; }
        public double Vauhti => Math.Sqrt(NopeusX * NopeusX + NopeusZ * NopeusZ);

        public void Paivita(double dt, in KavelySyote s)
        {
            if (dt <= 0) return;
            // Katse: sauva/tappi nopeudella, hiiri suoraan asteina.
            KameraYaw = Kulma(KameraYaw + Kuollut(s.KatseX) * KatseNopeusAsteS * dt + s.HiiriX);
            KameraPitch = Math.Clamp(KameraPitch - Kuollut(s.KatseY) * KatseNopeusAsteS * 0.7 * dt - s.HiiriY, PitchAla, PitchYla);
            // Liike kameran suuntaan.
            double lx = Kuollut(s.LiikeX), ly = Kuollut(s.LiikeY);
            double voima = Math.Min(1, Math.Sqrt(lx * lx + ly * ly));
            Tapa = s.Hiipiminen ? Liiketapa.Hiipiminen : s.Juoksu && voima > 0.7 ? Liiketapa.Juoksu : Liiketapa.Kavely;
            double max = Tapa == Liiketapa.Hiipiminen ? HiipiminenMs : Tapa == Liiketapa.Juoksu ? JuoksuMs : KavelyMs;
            double y = KameraYaw * Math.PI / 180, sy = Math.Sin(y), cy = Math.Cos(y);
            // eteen = (sin yaw, cos yaw), oikealle = (cos yaw, −sin yaw)
            double tx = (sy * ly + cy * lx), tz = (cy * ly - sy * lx);
            double tp = Math.Sqrt(tx * tx + tz * tz);
            if (tp > 1e-6) { tx = tx / tp * voima * max; tz = tz / tp * voima * max; } else { tx = tz = 0; }
            double dx = tx - NopeusX, dz = tz - NopeusZ, d = Math.Sqrt(dx * dx + dz * dz);
            double askel = (tp > 1e-6 ? KiihtyvyysMs2 : JarrutusMs2) * dt;
            if (d <= askel) { NopeusX = tx; NopeusZ = tz; } else { NopeusX += dx / d * askel; NopeusZ += dz / d * askel; }
            // Hahmo kääntyy kulkusuuntaan (ei paikallaan).
            if (Vauhti > 0.15)
            {
                double haluttu = Math.Atan2(NopeusX, NopeusZ) * 180 / Math.PI;
                double ero = Kulma(haluttu - HahmoYaw), k = KaantoNopeusAsteS * dt;
                HahmoYaw = Kulma(HahmoYaw + Math.Clamp(ero, -k, k));
            }
        }

        static double Kuollut(double v) => Math.Abs(v) < KuolleAlue ? 0 : Math.Sign(v) * (Math.Abs(v) - KuolleAlue) / (1 - KuolleAlue);
        public static double Kulma(double a) => ((a + 180) % 360 + 360) % 360 - 180;
    }
}
