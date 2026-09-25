// PELIOHJAIN: MATKA JATKUU ITSESTÄÄN (löydös 55, build 13; web js/ui.js ajastaAutomaattinenHeitto ja
// automaattiheittoSallittu, AUTOMAATTIHEITON_TAUKO_MS 750; omistaja 2.9.2026: "nopanheitto tulee jatkua automaattisesti
// jos ei olla saavuttu seuraavaan kohdekaupunkiin").
//
// Säännön puoli oli natiivissa valmiina (Matka.JatkaMatkaaItsestaan, web game.jatkaMatkaaItsestaan: ainoa noppatapa
// valittu itsestään, vaihe Heitto, noppa heittämättä, nappula reitin varrella), mutta kukaan ei kutsunut sitä: liftaus
// pysähtyi jokaiseen askelpisteeseen odottamaan napautusta. Nyt ajastin viritetään webin tapaan joka näkymäpäivityksessä
// (web render → ajastaAutomaattinenHeitto), jo viritetty saa laskea loppuun, ja ehdot tarkistetaan uudelleen
// lauetessa. Samasta pisteestä heitetään vain kerran (web automaattiheittoPaikka): jos heitto ei liikuta nappulaa,
// ajastin ei viritä itseään loputtomiin.
using System;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>Web AUTOMAATTIHEITON_TAUKO_MS: hengähdys, jossa silmä näkee mihin nappula jäi.</summary>
        public const float AutomaattiheitonTaukoS = 0.75f;

        /// <summary>
        /// UI:n portti (Natiivi-UI): true = pelaaja avasi jotain (pöllön chat, matkustusliuku muulle kuin nopalle,
        /// modaali), jolloin matka odottaa (web polloAuki, liukuAuki &amp;&amp; !liukuNopalle, dialog[open]). null = ei estettä.
        /// </summary>
        public static Func<bool> AutomaattiheittoEstetty;

        float automaattiheittoHetki = -1f;
        string automaattiheittoPaikka;

        /// <summary>Web automaattiheittoSallittu: samat portit kuin heitossa ja lisäksi kerran samasta pisteestä.</summary>
        bool AutomaattiheittoSallittu()
        {
            if (matka == null || !Kaytossa || Tila != SilmukanTila.Kartta || AloituslentoKaynnissa || LinssiAuki) return false;
            if (!matka.JatkaMatkaaItsestaan()) return false;
            // Radiotilassa kartalla ei liikuta (web radioPaalla, sama portti kuin napautuksessa).
            if (NapautusSallittu != null && !NapautusSallittu()) return false;
            if (AutomaattiheittoEstetty != null && AutomaattiheittoEstetty()) return false;
            return automaattiheittoPaikka != matka.Tila.Pelaaja.Sijainti.Avain;
        }

        /// <summary>Web ajastaAutomaattinenHeitto: kutsutaan näkymäpäivityksestä (PaivitaNakyma).</summary>
        void AjastaAutomaattinenHeitto()
        {
            if (!AutomaattiheittoSallittu()) { automaattiheittoHetki = -1f; return; }
            // Jo viritetty ajastin saa laskea loppuun: tiheä päivitys ei saa siirtää heittoa eteenpäin.
            if (automaattiheittoHetki >= 0f) return;
            automaattiheittoHetki = Time.unscaledTime + AutomaattiheitonTaukoS;
        }

        /// <summary>Update: ajastin laukeaa, ehdot uudestaan (tauon aikana ehti tapahtua mitä tahansa).</summary>
        void PaivitaAutomaattiheitto()
        {
            if (automaattiheittoHetki < 0f || Time.unscaledTime < automaattiheittoHetki) return;
            automaattiheittoHetki = -1f;
            if (!AutomaattiheittoSallittu()) return;
            automaattiheittoPaikka = matka.Tila.Pelaaja.Sijainti.Avain;
            Debug.Log("MATKAKIRJA peli: automaattiheitto reitin varrelta " + automaattiheittoPaikka);
            var virhe = Heita();
            if (virhe != null) Debug.LogWarning("MATKAKIRJA peli: automaattiheitto: " + virhe);
        }
    }
}
