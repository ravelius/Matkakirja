// LENNON PILVISUMU (omistajan linjaus LENNON ESITYS, Fable 23.9.2026): lennon aikana pallon
// yllä läpikuultava pilvikerros lennon korkeudella, hitaasti ajelehtien; laskussa se häipyy.
// Sama NASA Blue Marble -pilvikuva kuin astronautin kamerassa (Pilvikuva.Alfa, mipmapit).
//
// Rajapinta Natiivisepälle: Kartta-asmdef näkee Linssit.Ydinin mutta ei Assembly-CSharpia,
// joten sopimus on tässä ja Unity-toteutus (Linssit/Unity/PilviKerros) rekisteröityy
// LentoPilvet.Instanssiin käynnistyksessä:
//
//   LentoPilvet.Instanssi?.Nayta(korkeusM);    // lennon alussa (häivytys sisään)
//   LentoPilvet.Instanssi?.Korkeus(korkeusM);  // lennon aikana, kun kaari nousee/laskee
//   LentoPilvet.Instanssi?.Piilota();          // laskussa (häivytys ulos)
//
// Korkeus on pilvikuoren korkeus merenpinnasta metreinä. Kuori näkyy vain ylhäältä (Cull
// Back), joten sen pitää olla kameran alapuolella; toteutus rajaa sen välille
// VahimmaisKorkeus … kameran korkeus × KameranOsuus.
//
// PilviVerho on puhdas ajastus (peitto ja kierto ajan funktiona), testattu ilman Unityä.
using System;

namespace Matkakirja.Linssit.Pilvet
{
    public interface ILentoPilvet
    {
        /// <summary>Pilvisumu näkyviin annetulle korkeudelle (m), häivytys kestoS sekunnissa (null = oletus).</summary>
        void Nayta(double korkeusM, double? kestoS = null);
        /// <summary>Kuoren korkeus lennon aikana (m).</summary>
        void Korkeus(double korkeusM);
        /// <summary>Pilvisumu pois (laskeutuminen), häivytys kestoS sekunnissa (null = oletus).</summary>
        void Piilota(double? kestoS = null);
        /// <summary>Näkyykö kerros (myös häivytyksen aikana).</summary>
        bool Nakyvissa { get; }
    }

    /// <summary>Rekisteri: Unity-toteutus asettaa käynnistyksessä; null = ei pilviä (esim. testit).</summary>
    public static class LentoPilvet
    {
        public static ILentoPilvet Instanssi;
    }

    /// <summary>Pilvisumun peitto ja ajelehdinta ajan funktiona (sekunteina).</summary>
    public sealed class PilviVerho
    {
        /// <summary>Täysi peitto: läpikuultava, kartta näkyy läpi (astronautin huippu 0,9).</summary>
        public const double OletusPeitto = 0.55;
        public const double OletusHaivytysS = 1.2;
        /// <summary>Ajelehdintä: 3° minuutissa pituuspiirin suuntaan (astronautilla 0,5°/min).</summary>
        public const double AjelehdintaAstettaS = 0.05;
        public const double VahimmaisKorkeus = 2_000;
        /// <summary>Kuori enintään tämä osuus kameran korkeudesta, jotta se on kameran alla.</summary>
        public const double KameranOsuus = 0.6;

        public double Peittoraja = OletusPeitto;
        double alkuT, kestoS, alkuArvo, kohde;
        double? ensinNakyi;

        /// <summary>Häivytys kohti täyttä peittoa hetkestä t.</summary>
        public void Nayta(double t, double? kesto = null)
        {
            Aloita(t, Peittoraja, kesto ?? OletusHaivytysS);
            ensinNakyi ??= t;
        }

        /// <summary>Häivytys pois hetkestä t.</summary>
        public void Piilota(double t, double? kesto = null) => Aloita(t, 0, kesto ?? OletusHaivytysS);

        void Aloita(double t, double arvo, double kesto)
        {
            alkuArvo = Peitto(t);
            kohde = arvo;
            alkuT = t;
            kestoS = Math.Max(0, kesto);
        }

        /// <summary>Peitto 0…Peittoraja hetkellä t (smoothstep kesken häivytyksen).</summary>
        public double Peitto(double t)
        {
            if (kestoS <= 0 || t >= alkuT + kestoS) return kohde;
            double x = Math.Clamp((t - alkuT) / kestoS, 0, 1);
            double s = x * x * (3 - 2 * x);
            return alkuArvo + (kohde - alkuArvo) * s;
        }

        /// <summary>Näkyykö kerros hetkellä t (piilotus valmis = ei).</summary>
        public bool Nakyvissa(double t) => Peitto(t) > 0.001 || kohde > 0;

        /// <summary>Ajelehdinnän kierto asteina ensimmäisestä näytöstä lähtien (jatkuu lennosta toiseen).</summary>
        public double Kierto(double t) => ensinNakyi is double e ? (t - e) * AjelehdintaAstettaS % 360 : 0;

        /// <summary>Kuoren korkeus: pyydetty rajattuna kameran alle ja vähimmäiskorkeuteen.</summary>
        public static double Rajaa(double pyydettyM, double kameranKorkeusM) =>
            Math.Max(VahimmaisKorkeus, Math.Min(pyydettyM, kameranKorkeusM * KameranOsuus));
    }
}
