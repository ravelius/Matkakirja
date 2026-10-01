// UI-POHJAT (omistaja 1.10.2026, docs/raportit/ui-pohjat-kartoitus-20261001.md): pohjien yhteiset säännöt koodissa.
// Arvot tulevat tyylikirjasta (Tyylikirja.cs, generoitu tyylikirja.json:sta); tänne vain niistä johdettu logiikka.
namespace Matkakirja.Natiivi
{
    public static class Pohja
    {
        /// <summary>Leveysluokat: KAPEA &lt; 600 pt (iPhone pysty), KESKI 600–939 (iPhone vaaka, iPad pysty), LEVEÄ ≥ 940.</summary>
        public enum Luokka { Kapea, Keski, Levea }

        public static Luokka Leveys(float paneelinLeveys) =>
            paneelinLeveys < Tyylikirja.Leveys.Kapea ? Luokka.Kapea : paneelinLeveys < Tyylikirja.Leveys.Levea ? Luokka.Keski : Luokka.Levea;

        /// <summary>Sivukortin leveys (NOSTOKORTTI KESKI/LEVEÄ): sivukortti-mitta, mutta peitto enintään Peitto.Max % leveydestä.</summary>
        public static float Sivukortti(float paneelinLeveys) =>
            UnityEngine.Mathf.Round(UnityEngine.Mathf.Min(Tyylikirja.Leveys.Sivukortti, paneelinLeveys * Tyylikirja.Peitto.Max / 100f));
    }
}
