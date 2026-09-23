// LIIKU JA VAIHDA MATKUSTUSTAPA (Pelikoodari 24.9.2026, haara pelikoodari/kulkutavat; Natiivi-UI:n pyyntö).
//
// Web js/ui.js: vaihe 'roll' (~11262) näyttää nopan ja "Vaihda matkustustapa" -napin, kun
// !game.autoTravel || game.muitaTapojaTarjolla() (Matka.VaihtoTarjolla); napin teko on
// game.actionCancelTravel (Matka.PeruKulkutapa).
using System;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>
        /// Liiku-napin tai heittonapin tila saattoi muuttua (vaihe, silmukan tila, raha): Natiivi-UI lukee
        /// Kulkutavat(), LiikuEstetty ja VaihtoTarjolla uudelleen. Herää PaivitaNakyma-kutsusta.
        /// </summary>
        public event Action LiikuMuuttui;

        /// <summary>Näkyykö heittonapin vieressä "Vaihda matkustustapa" (web: !autoTravel || muitaTapojaTarjolla).</summary>
        public bool VaihtoTarjolla => matka != null && Tila == SilmukanTila.Kartta && matka.VaihtoTarjolla();

        /// <summary>Heittonappi; vaihda-kutsu vain IHeittoVaihto-näkymälle ja vain kun vaihto on tarjolla.</summary>
        void NaytaHeittonappi(string teksti, Action painettu)
        {
            Action vaihda = matka.VaihtoTarjolla() ? () => VaihdaKulkutapa() : (Action)null;
            if (dialogi is IHeittoVaihto v) v.NaytaHeitto(teksti, painettu, vaihda);
            else dialogi.NaytaHeitto(teksti, painettu);
        }

        /// <summary>
        /// "Vaihda matkustustapa" (web actionCancelTravel; testikomento 'vaihda'): takaisin
        /// matkustustavan valintaan ennen heittoa. Heittonappi piiloutuu, ja Liiku-liuku on taas käytössä.
        /// Palauttaa virheen tai null.
        /// </summary>
        public string VaihdaKulkutapa()
        {
            if (matka == null) return "peli ei ole valmis";
            if (Tila != SilmukanTila.Kartta) return "silmukka on tilassa " + Tila;
            var r = matka.PeruKulkutapa();
            if (!r.Ok) { Virhe(r.Virhe); return r.Virhe; }
            // Uusi valinta: vanha tavoite ei enää ohjaa noppaa.
            Tavoite = null;
            Tallenna();
            PaivitaNakyma();
            Debug.Log("MATKAKIRJA peli: matkustustapa vaihtoon (actionCancelTravel)");
            return null;
        }
    }
}
