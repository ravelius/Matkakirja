// HISTORIAMOOTTORI M-OSA HUONE 6: VOUDIN KIISTA JA AVAINRENGAS (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md 8.2 huone 6
// vaiheet 5–6; Unity SeikkailuSali). Keittokulho voudin pöydälle (≤ 1,5 m esine:kulho-poydalle-merkistä) aloittaa kiistan aitan hoitajan
// kanssa: 30 s, jonka aikana vouti kääntyy kahdesti 6 s:ksi hoitajaan (8–14 s ja 20–26 s); kiista alkaa uudelleen 20 s sen päättymisestä (Siirtoseppä 8.10.: LS2:n huomio, 40 s:llä pisin odotus ikkunaan 52 s → nyt 32 s).
// Avainrenkaan saa ottaa, kun vouti katsoo hoitajaan tai pelaaja on yli 50°:n kulmassa tai yli 5 m:n päässä hänen katseestaan; muuten ote
// ranteesta (Vartija.OtaKiinni, irtipääsy tai tyrmä). Kertalaukaisut sovittimelle (nollaa itse).
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public sealed class VoudinKiista
    {
        public const double KulhoM = 1.5, KiistaS = 30, KiistaValiS = 20, NakeeKulma = 50, NakeeM = 5;
        public static readonly (double Alku, double Loppu)[] Ikkunat = { (8, 14), (20, 26) };

        /// <summary>Aika kiistan alusta (−1 = kulho ei vielä pöydällä).</summary>
        public double Kiista { get; private set; } = -1;
        public bool KiistaKay => Kiista >= 0 && Kiista < KiistaS;
        /// <summary>Vouti katsoo hoitajaan (katseikkuna).</summary>
        public bool KatsooPois { get; private set; }
        /// <summary>Kertalaukaisut: kiista alkoi (repliikki), katse vaihtui (sovitin kääntää voudin hoitajaan tai pöytään).</summary>
        public bool Alkoi, Kaantyi;

        /// <summary>Kulho laskettiin etäisyydelle (m) pöydän merkistä; aloittaa kiistan kerran.</summary>
        public bool KulhoLaskettu(double etaisyysM)
        {
            if (Kiista >= 0 || etaisyysM > KulhoM) return false;
            Kiista = 0; Alkoi = true; return true;
        }

        public void Paivita(double dt)
        {
            if (Kiista < 0) return;
            Kiista += dt;
            if (Kiista >= KiistaS + KiistaValiS) { Kiista -= KiistaS + KiistaValiS; Alkoi = true; }   // kiista toistuu
            bool pois = false;
            foreach (var (a, l) in Ikkunat) if (Kiista >= a && Kiista < l) pois = true;
            if (pois != KatsooPois) { KatsooPois = pois; Kaantyi = true; }
        }

        /// <summary>Saako avainrenkaan ottaa: pelaaja (dx, dz) voudista vaakatasossa, voudin katseen yaw asteina (0 = +z).</summary>
        public bool SaaOttaa(double dx, double dz, double voudinYaw)
        {
            if (KatsooPois) return true;
            if (Math.Sqrt(dx * dx + dz * dz) > NakeeM) return true;
            double suunta = Math.Atan2(dx, dz) * 180 / Math.PI, ero = Math.Abs(((suunta - voudinYaw) % 360 + 540) % 360 - 180);
            return ero > NakeeKulma;
        }

        /// <summary>Pisin odotus seuraavaan katseikkunaan kiistan alettua (s): viimeisen ikkunan lopusta seuraavan kierroksen ensimmäiseen.</summary>
        public static double PisinOdotus => KiistaS + KiistaValiS - Ikkunat[Ikkunat.Length - 1].Loppu + Ikkunat[0].Alku;
    }
}
