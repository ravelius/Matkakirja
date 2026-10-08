// SADEKUURON YHTEINEN OHJAUSPISTE (Linssiseppä 2 + Linssiseppä 9.10.2026; omistaja TF 168: "jonkun verran ukkosta ja sadetta voisi
// tulla jossain kohdissa itsestään. märät kadut jos saadaan toteutettua kuulostaa hyvältä"): LS1:n säätehosteet asettavat Voima 0–1
// (kuuro alkaa → täysi → loppuu); Linssiseppä 2 lukee siitä pilvien peiton ja tummuuden (KaupunkiIlmakeha) ja katujen märkyyden
// (IlmakehaLaatat): märkyys nousee sateessa (KastuminenS täyteen täydellä voimalla) ja kuivuu hitaasti (KuivuminenS) kuuron jälkeen.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class KaupunkiKuuro
    {
        public const double KastuminenS = 90, KuivuminenS = 600, SadeRaja = 0.05;
        /// <summary>Kuuron voima 0–1 (LS1:n säätehosteet).</summary>
        public static double Voima;
        /// <summary>Katujen märkyys 0–1 (laskettu, Paivita).</summary>
        public static double Markyys { get; private set; }

        /// <summary>Joka kehys (KaupunkiKuva): märkyys kohti sadetta tai kuivumista.</summary>
        public static void Paivita(double dt)
        {
            double v = Math.Max(0, Math.Min(1, Voima));
            Markyys = v > SadeRaja ? Math.Min(1, Markyys + dt * v / KastuminenS) : Math.Max(0, Markyys - dt / KuivuminenS);
        }

        /// <summary>Pilvipeitto kuuron aikana: perus (säästä) → lähes täysi.</summary>
        public static double Peitto(double perus) => perus + (0.95 - perus) * Math.Max(0, Math.Min(1, Voima));
        /// <summary>Pilvien tummuus 0–1 (valo kertoimella 1 − 0,6 × tummuus).</summary>
        public static double Tummuus => 0.6 * Math.Max(0, Math.Min(1, Voima));
        /// <summary>Kuvapareille (asetus "markyys 0–1"): märkyys suoraan.</summary>
        public static void AsetaMarkyys(double m) => Markyys = Math.Max(0, Math.Min(1, m));
        /// <summary>Testeille ja kaupungin vaihtoon: kuiva ja ei kuuroa.</summary>
        public static void Nollaa() { Voima = 0; Markyys = 0; }
    }
}
