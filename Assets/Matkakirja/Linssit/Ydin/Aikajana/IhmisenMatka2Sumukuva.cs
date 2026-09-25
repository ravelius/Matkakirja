// IHMISEN MATKA II: KERROKSELLISEN SUMUN LOGIIKKA (erä 3; Raamattu IHMISEN MATKA II "KERROKSELLINEN SUMU eri korkeuksilla
// (kohina, parallaksi)", suunnitelma docs/raportit/ihmisen-matka-2-suunnitelma-20260925.md). Puhdas osa: avauksen
// kuorten peitto kameran korkeudesta ja jaksojen seutusumut. Piirto: Linssit/Unity/IhmisenMatka2Sumu (Pilvikuoret).
//
//   AVAUS ("syöksy kolmen pilvikerroksen läpi"): kuori näkyy vain, kun kamera lähestyy sitä (kaukaa tuhansien
//   kilometrien kuori näyttäisi pallon ympärille paisuneelta pilvipallolta): nousu 2,5 H → 1,6 H, täysi 1,6 H → 1,2 H,
//   häivytys 1,2 H → H, jolloin kamera on sukeltanut sen läpi. Afrikan valojen 18 000 km:stä Marokon 9 300 km:iin ja
//   ensimmäiseen laskeutumiseen (4 000 km) kamera läpäisee kaikki kolme.
//   SEUTU: yksi matala kuori jakson seudun sävyllä (suunnitelman taulukko): kuumuusutu, merisumu, pöly, jää-usva,
//   sadeusva, aikahypyn harmaa pyörre ja Tyynenmeren merisumu; avaus ja loppu ilman ("sumu hälvenee").
using System;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>Seudun sumu: sävy (sRGB 0–1), peitto 0–1, ajelehtiminen (°/s) ja pyörre (aikahyppy).</summary>
    public readonly struct Sumukuva
    {
        public readonly float R, G, B, Peitto, Ajelehtiminen;
        public readonly bool Pyorre;
        public Sumukuva(float r, float g, float b, float peitto, float ajelehtiminen, bool pyorre = false)
        { R = r; G = g; B = b; Peitto = peitto; Ajelehtiminen = ajelehtiminen; Pyorre = pyorre; }
        public static readonly Sumukuva Ei = new Sumukuva(1, 1, 1, 0, 0);
    }

    public static class IhmisenMatka2Sumukuva
    {
        /// <summary>Avauksen kuoret (korkeus km, suurin peitto, kierron alkukulma °, ajelehtiminen °/s): ylin ensin.</summary>
        public static readonly (double KorkeusKm, float Peitto, float Kulma, float Ajelehtiminen)[] Avaus =
        {
            (12000, 0.55f, 0f, 0.35f),
            (8000, 0.45f, 125f, 0.55f),
            (5000, 0.38f, 250f, 0.8f),
        };

        /// <summary>Seutusumun korkeus (km): matala, jotta laskeutumisissa (4 000 km) syntyy parallaksi maaston kanssa.</summary>
        public const double SeutuKm = 350;

        /// <summary>Avauksen kuoren peitto-osuus 0–1 kameran korkeudesta (m) ja kuoren korkeudesta (m).</summary>
        public static double AvauksenOsuus(double kameraM, double kuoriM)
        {
            if (!(kuoriM > 0) || !(kameraM > kuoriM)) return 0;
            double s = kameraM / kuoriM;
            if (s >= 2.5) return 0;
            if (s > 1.6) return Pehmea((2.5 - s) / 0.9);
            if (s >= 1.2) return 1;
            return Pehmea((s - 1.0) / 0.2);
        }

        static double Pehmea(double t)
        {
            double x = Math.Max(0, Math.Min(1, t));
            return x * x * (3 - 2 * x);
        }

        /// <summary>Jakson seutusumu tunnuksesta (Ihmisen matkan kertomus, 21 jaksoa).</summary>
        public static Sumukuva Seutu(string jaksoId) => jaksoId switch
        {
            // Afrikka: ohut kuumuusutu.
            "afrikka" or "jebel-irhoud" or "siirtyma-afrikka" or "omo" => new Sumukuva(1f, 0.86f, 0.66f, 0.18f, 0.02f),
            // Ulos Afrikasta: merisumu rannikolla.
            "ranta" or "levantti" or "arabia" or "intian-rannat" or "australia" => new Sumukuva(0.96f, 0.95f, 0.92f, 0.26f, 0.03f),
            // Luolat: pöly valossa (lämmin, ohut).
            "denisova" or "chauvet" => new Sumukuva(0.92f, 0.8f, 0.64f, 0.14f, 0.01f),
            // Kylmä: jää-usva matalalla.
            "napapiiri" or "beringia" or "white-sands" or "eurooppa" => new Sumukuva(0.86f, 0.93f, 1f, 0.34f, 0.03f),
            // Amerikat: sadeusva.
            "chile" => new Sumukuva(0.8f, 0.84f, 0.86f, 0.3f, 0.04f),
            // Aikahyppy: harmaa pyörresumu (kello kelautuu).
            "aikahyppy" => new Sumukuva(0.74f, 0.74f, 0.76f, 0.42f, 9f, pyorre: true),
            // Tyynimeri: matala merisumu kuunvalossa.
            "meri" or "uusi-seelanti" => new Sumukuva(0.86f, 0.92f, 1f, 0.28f, 0.03f),
            _ => Sumukuva.Ei,
        };

        /// <summary>Jaksot, joissa avauksen kuoret ovat päällä (pimeä avaus, Afrikan valot ja ensimmäinen kohde).</summary>
        public static bool AvausJaksossa(string jaksoId) => jaksoId is "avaus" or "afrikka" or "jebel-irhoud";
    }
}
