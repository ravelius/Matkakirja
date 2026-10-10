// TAUSTAÄÄNTEN VAIMENNUS (omistaja TF 168, 9.10.2026: "saisiko äänet pois taustalta kun kip latautuu?"): pallon latauskuvan ajaksi
// kaikki Unityn äänet (kartan äänet, pallon äänimaisema, tuuli, kori) pehmeästi hiljaisiksi kuuntelijan tasolla
// (AudioListener.volume; natiivissa ei ole AudioMixeriä, joten tämä on yhteinen "mikseri" kaikille soittajille) ja takaisin, kun
// latauskuva poistuu ja kierros alkaa. Käyrä ja perustaso Ydin AaniHaivytys. Natiivit moottorit (puhekanava, radio) eivät kulje
// kuuntelijan kautta, eivätkä ne soi latauksen aikana. Poikkeus: latausmusiikki (omistaja 10.10.2026, Aanisoitin Lataus-kanava)
// soi vaimennuksen ohi ja kertoo tasonsa kuuntelijan perustasolla (Perustaso).
using Matkakirja.Linssit;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class AaniVaimennus
    {
        static readonly AaniHaivytys haivytys = new AaniHaivytys();
        static bool kytketty;

        public static bool Paalla => haivytys.Vaimennettu;

        /// <summary>
        /// Kuuntelijan taso ilman latausruudun vaimennusta (vaimennuksen tai paluun aikana tallennettu perustaso, muuten nykyinen):
        /// latausmusiikki (Aanisoitin, Lataus-kanava) ohittaa kuuntelijan tason ja kertoo itsensä tällä (omistaja 10.10.2026).
        /// </summary>
        public static float Perustaso => haivytys.Vaimennettu || haivytys.Kaynnissa ? (float)haivytys.Perus : AudioListener.volume;

        public static void Aseta(bool vaimenna, string syy)
        {
            if (vaimenna == haivytys.Vaimennettu) return;
            haivytys.Aseta(vaimenna, AudioListener.volume);
            if (!kytketty && UiKerros.Olemassa) { UiKerros.Hae().JokaRuutu += Askel; kytketty = true; }
            Debug.Log($"MATKAKIRJA ääni: taustaäänet {(vaimenna ? "hiljaisiksi" : "takaisin")} ({syy}; perustaso {haivytys.Perus:0.00})");
        }

        static void Askel()
        {
            if (!haivytys.Kaynnissa) return;
            AudioListener.volume = (float)haivytys.Askel(Time.unscaledDeltaTime);
        }
    }
}
