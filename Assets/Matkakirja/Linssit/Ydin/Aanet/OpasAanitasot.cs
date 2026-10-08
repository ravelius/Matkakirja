// OPPAAN JA PALLON ÄÄNITASOT (Linssiseppä 8.10.2026, Päätoimittajan erä junaan 169): yksi lähde kaikkien oppaan äänten
// voimakkuusketjuille, jotta sovitin (OpasSovitin, PalloKori) ja Linssit-testit (PalloKaupungitTestit.AanitasotKaikissaKaupungeissa)
// käyttävät samoja kertoimia. Mikserin säätimet (Asetukset.Taso, NUI be7fef450) ja niiden oletukset: Lukija 0,9, Tehosteet 1, Sää 1.
//   kertoja ja siltalause  = Lukija (ennen 8.10. aina 1,0: mikserin Lukija-säädin ei vaikuttanut oppaaseen)
//   pallon kori            = Voimakkuus × tapahtuman taso × TehosteKerroin (−3 dB, omistaja TF 166) × Tehosteet × väistö puheen aikana
//   ukkonen                = 0,8 × TehosteKerroin × Sää × väistö puheen aikana (ennen 8.10. ei väistöä: hetkellisesti kertojan tasolla)
//   kaupungin äänimaisema  = MaisemaTaso (KaupunkiAanimaisemaSoitin.Taso) × kerroksen taso × väistö (KaupunkiAanimaisema)
// Puhdas C#: Linssit-testit.
using System;

namespace Matkakirja.Linssit.Aanet
{
    public static class OpasAanitasot
    {
        /// <summary>Väistö puheen aikana (−9 dB), sama kuin äänimaisemassa.</summary>
        public const double Vaisto = KaupunkiAanimaisema.VaistoTaso;
        /// <summary>KaupunkiAanimaisemaSoitin.Taso (Siirtosepän soitin; peilattu tähän testejä varten).</summary>
        public const double MaisemaTaso = 0.55;
        public const double UkkonenPerus = 0.8;
        /// <summary>Väistön liuku (s): ukkosen taso seuraa puhetta pehmeästi, ei napsahdusta.</summary>
        public const double VaistoLiukuS = 0.25;

        public static double Kertoja(double lukija) => Raja(lukija);
        public static double Kori(double voimakkuus, double taso, double tehosteKerroin, double tehosteet, bool puheSoi) => Raja(voimakkuus * taso * tehosteKerroin * tehosteet * (puheSoi ? Vaisto : 1));
        public static double Ukkonen(double tehosteKerroin, double saa, bool puheSoi) => Raja(UkkonenPerus * tehosteKerroin * saa * (puheSoi ? Vaisto : 1));
        public static double Maisema(double kerrosTaso, bool puheSoi) => Raja(MaisemaTaso * kerrosTaso * (puheSoi ? Vaisto : 1));

        /// <summary>Liukuu kohti tavoitetta (dt, VaistoLiukuS).</summary>
        public static double Liuku(double nyt, double tavoite, double dt) => nyt + (tavoite - nyt) * Math.Min(1, Math.Max(0, dt) / VaistoLiukuS);

        static double Raja(double x) => Math.Max(0, Math.Min(1, x));
    }
}
