// LAIVOJEN SAVU JA HÖYRY (Linssiseppä 2, 9.10.2026; omistaja TF 168: "ehkä jotain savua tai höyryä että näyttäisi realistisemmalle",
// PT: höyrylaivoille piipusta, muille hento pakokaasu tai ei mitään). Lajikohtaiset asetukset VeneSavulle (Unity: ParticleSystem
// piipun kohdalta tuulen suuntaan). Lajit LS1:n VeneMalleista (Tyypit). Metreinä ja sekunteina; Unity-osa skaalaa maailmaan.
namespace Matkakirja.Linssit.Ilmakeha
{
    public readonly struct SavuAsetus
    {
        public readonly double MaaraS, ElinikaS, KokoAlkuM, KokoLoppuM, Peitto, NousuMs;
        public readonly float R, G, B;
        public SavuAsetus(double maaraS, double elinikaS, double kokoAlkuM, double kokoLoppuM, double peitto, double nousuMs, float r, float g, float b)
        { MaaraS = maaraS; ElinikaS = elinikaS; KokoAlkuM = kokoAlkuM; KokoLoppuM = kokoLoppuM; Peitto = peitto; NousuMs = nousuMs; R = r; G = g; B = b; }
        /// <summary>Hiukkasia yhtä aikaa ilmassa (muistin ja piirron yläraja).</summary>
        public int Enintaan => (int)System.Math.Ceiling(MaaraS * ElinikaS) + 2;
    }

    public static class SavuLajit
    {
        /// <summary>Lajin savu; null = ei savua (pienet veneet).</summary>
        public static SavuAsetus? Laji(string laji) => laji switch
        {
            // Höyrylaiva (kivihiili/öljy, vanha): tumma, paksu savu, joka leviää tuulen mukana.
            "hoyrylaiva" => new SavuAsetus(5, 7, 2, 9, 0.5, 1.5, 0.32f, 0.31f, 0.3f),
            // Saaristolaiva (osa höyryllä, Waxholmsbolaget): vaalea höyry.
            "saaristolaiva" => new SavuAsetus(3, 5, 1.5, 6, 0.35, 1.8, 0.88f, 0.88f, 0.9f),
            // Moottorilautat ja jokilaivat: hento pakokaasu.
            "lautta" or "pendelbat" or "autolautta" or "pikkulautta" or "kiertoajelu" or "jokilaiva" => new SavuAsetus(1.5, 4, 1, 4, 0.15, 1.0, 0.7f, 0.7f, 0.72f),
            _ => null,
        };
    }
}
