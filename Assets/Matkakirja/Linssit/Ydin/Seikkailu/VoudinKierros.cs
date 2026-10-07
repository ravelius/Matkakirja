// HISTORIAMOOTTORI E3b: VOUDIN SÄÄNTÖ (Siirtoseppä 7.10.2026; kasikirjoitus-olavinlinna-kappeli-e3.md kohta 3). Vouti kiertää
// ampumakäytävää ~40 s:n kierroksin ja ohittaa kaari-oven portaikon yläpään kerran kierroksessa; hehku kasvaa portaikon seinällä 2 s ennen
// ohitusta ja vaarahetki kestää ~5 s. Valo (lisäliekki tai Foggin palava kynttilä syvennyksessä/portaikossa) ja tavallinen ääni huomataan
// vain vaarahetkellä, kova ääni aina → pysähdys 3 s (sydän lyö). Jos syy poistuu, jatkaa; muuten laskeutuu portaikkoa 6 s, katsoo
// kaari-ovesta 3 s ja palaa ylös tai ottaa Foggin kiinni (Fogg syvennyksessä tai portaikossa). Kappalaisen käynnin aikana havainnot pois.
// Kiinnijäänti → tyrmä; sen jälkeen minuutin valppaus (kierros 30 % nopeampi, pysähtyy portaikon kohdalle kuuntelemaan).
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public enum VoudinTila { Kierros, Pysahdys, Laskeutuu, Katse, Kiinni }

    public struct VoudinSyote
    {
        /// <summary>Lisäliekki palaa kappelissa tai Foggin kynttilä palaa syvennyksessä/portaikossa (näkyy portaikkoon).</summary>
        public bool ValoNakyy;
        public bool TavallinenAani, KovaAani;
        /// <summary>Fogg kaari-oven syvennyksessä tai portaikossa (laskeutuvan voudin tiellä).</summary>
        public bool FoggPortaikossa;
        /// <summary>Kappalaisen käynti: havainnot pois.</summary>
        public bool KappalainenHuoneessa;
    }

    public sealed class VoudinKierros
    {
        public const double KierrosS = 40, VaaraS = 5, HehkuEnnenS = 2, PysahdysS = 3, LaskeutuminenS = 6, KatseS = 3, ValppausS = 60, ValppausKerroin = 0.7;
        /// <summary>Ohitushetki kierroksen alusta (vaarahetken keskikohta).</summary>
        public const double OhitusS = 20;

        public VoudinTila Tila { get; private set; } = VoudinTila.Kierros;
        double kierrosAika, tilaAika, valppaus;
        bool syyJatkuu;
        /// <summary>Kierroksen vaihe 0…1 (askelten paikka holvin yllä).</summary>
        public double Vaihe => kierrosAika / Kierros;
        double Kierros => valppaus > 0 ? KierrosS * ValppausKerroin : KierrosS;
        /// <summary>Hehkun voimakkuus portaikon yläpäässä 0…1 (kasvaa ohitusta kohti; laskeutuessa ja katseessa täysi).</summary>
        public double Hehku { get; private set; }
        /// <summary>Laskeutumisen eteneminen 0…1 (hehku liukuu portaikkoa alas).</summary>
        public double Laskeutuminen { get; private set; }
        public bool Sydan => Tila == VoudinTila.Pysahdys || Tila == VoudinTila.Laskeutuu || Tila == VoudinTila.Katse;
        public bool Valpas => valppaus > 0;

        public bool Vaarahetki
        {
            get
            {
                double d = Math.Abs(kierrosAika - OhitusS * Kierros / KierrosS);
                return Tila == VoudinTila.Kierros && d <= VaaraS / 2 || Tila != VoudinTila.Kierros;
            }
        }

        public void Paivita(double dt, VoudinSyote s)
        {
            if (valppaus > 0) valppaus = Math.Max(0, valppaus - dt);
            if (Tila == VoudinTila.Kiinni) { Hehku = 1; return; }
            bool havaitsee = !s.KappalainenHuoneessa;
            bool syy = havaitsee && (s.KovaAani || Vaarahetki && (s.ValoNakyy || s.TavallinenAani));
            switch (Tila)
            {
                case VoudinTila.Kierros:
                    kierrosAika += dt;
                    if (kierrosAika >= Kierros) kierrosAika -= Kierros;
                    double ohitus = OhitusS * Kierros / KierrosS;
                    double ennen = ohitus - kierrosAika;
                    Hehku = ennen > 0 && ennen <= HehkuEnnenS + VaaraS / 2 ? 1 - Math.Max(0, ennen - VaaraS / 2) / HehkuEnnenS
                        : ennen <= 0 && -ennen <= VaaraS / 2 ? 1 : 0;
                    Hehku = Math.Max(0, Math.Min(1, Hehku));
                    if (syy) Vaihda(VoudinTila.Pysahdys);
                    break;
                case VoudinTila.Pysahdys:
                    tilaAika += dt; Hehku = 1;
                    // Laukaissut ääni ei itse jatka syytä: vain valo, Fogg portaikossa tai UUSI ääni (0,5 s jälkeen) vie laskeutumaan.
                    syyJatkuu |= havaitsee && (s.ValoNakyy || s.FoggPortaikossa || tilaAika > 0.5 && (s.TavallinenAani || s.KovaAani));
                    if (tilaAika >= PysahdysS) { if (syyJatkuu) Vaihda(VoudinTila.Laskeutuu); else Vaihda(VoudinTila.Kierros); }
                    break;
                case VoudinTila.Laskeutuu:
                    tilaAika += dt; Hehku = 1; Laskeutuminen = Math.Min(1, tilaAika / LaskeutuminenS);
                    if (tilaAika >= LaskeutuminenS) Vaihda(VoudinTila.Katse);
                    break;
                case VoudinTila.Katse:
                    tilaAika += dt; Hehku = 1;
                    if (havaitsee && s.FoggPortaikossa) { Tila = VoudinTila.Kiinni; return; }
                    if (tilaAika >= KatseS) { Laskeutuminen = 0; Vaihda(VoudinTila.Kierros); }
                    break;
            }
        }

        void Vaihda(VoudinTila t) { Tila = t; tilaAika = 0; if (t == VoudinTila.Pysahdys) syyJatkuu = false; if (t == VoudinTila.Kierros) Laskeutuminen = 0; }

        /// <summary>Tyrmän jälkeen: kierros alusta ja minuutin valppaus.</summary>
        public void Tyrmasta() { Tila = VoudinTila.Kierros; kierrosAika = 0; tilaAika = 0; Laskeutuminen = 0; valppaus = ValppausS; }
    }
}
