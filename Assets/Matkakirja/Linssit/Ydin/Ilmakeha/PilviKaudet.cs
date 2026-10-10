// PILVIEN ILMASTO KAUPUNGEITTAIN (Linssiseppä 2, 10.10.2026; Karttaseppä ilmakeha/pilvet-v1/pilvet-kaudet.json, METAR 2016–2025,
// PT:n lupa): pilvikerroksen pohja ja paksuus kaupungin ja kauden mukaan kiinteän 1600 + 1000 m:n sijaan. Pallo lentää 300–700 m:ssä,
// joten pohja rajataan MinPohjaM:ään (talven 366–518 m:n stratus näkyy matalimpana kerroksena, ei pallon alla). Peitto ja matalan
// pilven osuus luetaan mukaan (peitto on METARin alaraja), mutta sää (Saa.Harmaus) ohjaa peittoa edelleen.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Ilmakeha
{
    public static class PilviKaudet
    {
        public const string Osoite = "https://media.matkakirja.app/ilmakeha/pilvet-v1/pilvet-kaudet.json";
        public const double MinPohjaM = 900, MaxPohjaM = 2500, MinPaksuusM = 300, MaxPaksuusM = 1500;

        public readonly struct Kausi
        {
            public readonly double PohjaM, PaksuusM, Peitto, MatalaOsuus;
            public Kausi(double pohjaM, double paksuusM, double peitto, double matalaOsuus)
            { PohjaM = pohjaM; PaksuusM = paksuusM; Peitto = peitto; MatalaOsuus = matalaOsuus; }
            public override string ToString() => $"pohja {PohjaM:F0} m, paksuus {PaksuusM:F0} m, peitto {Peitto:F2}, matala {MatalaOsuus:F2}";
        }

        /// <summary>Kaupungin ja kauden ("talvi", "kevat", "kesa", "syksy") pilvet rajattuina; null, jos kaupunkia tai kautta ei ole.</summary>
        public static Kausi? Hae(string json, string kaupunki, string kausi)
        {
            if (string.IsNullOrEmpty(json) || kaupunki == null || kausi == null) return null;
            var j = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(json));
            var k = MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "kaupungit")), kaupunki));
            var d = MiniJson.ObjektiTaiNull(MiniJson.Kentta(k, kausi));
            if (d == null || !(MiniJson.Luku(d, "pohja_m") is double pohja)) return null;
            double paksuus = MiniJson.Luku(d, "paksuus_m") ?? 1000;
            return new Kausi(Math.Clamp(pohja, MinPohjaM, MaxPohjaM), Math.Clamp(paksuus, MinPaksuusM, MaxPaksuusM),
                Math.Clamp(MiniJson.Luku(d, "pilvipeitto") ?? 0.5, 0, 1), Math.Clamp(MiniJson.Luku(d, "matala_osuus") ?? 0.5, 0, 1));
        }
    }
}
