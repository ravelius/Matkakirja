// PELIOHJAIN: KULJETTU REITTI (Elävä kartta kohta 4, Linssisepän rajapinta 26.9.2026, vain natiivi).
//
// Pelaajan kuljettu reitti aikajärjestyksessä (Pelaaja.Kuljettu: kaupunki + kulkutapa, jolla sinne tultiin,
// ensimmäinen = aloituskaupunki). Web pitää vain käytyjen joukon (world.visited), joten järjestys on natiivin
// oma valinnainen tallennuskenttä "kuljettu"; vanhassa tallennuksessa reitti alkaa nykyisestä kaupungista.
//
// KuljettuReittiKasvoi(a, b, tapa) tulee, kun kamera on perillä (Perilla → MatkaPerilla), ei logiikan hetkellä:
// Linssiseppä piirtää uuden osuuden kynänjälkenä noin sekunnin saapumisen jälkeen. Siirrot ilman kamera-ajoa
// (seitsemän peninkulman askel, kehittäjän siirto) ilmoitetaan viimeistään seuraavan osuuden edellä.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        static readonly IReadOnlyList<KuljettuPiste> TyhjaReitti = Array.Empty<KuljettuPiste>();

        /// <summary>Vuorossa olevan pelaajan kuljettu reitti aikajärjestyksessä (tyhjä ennen matkaa).</summary>
        public IReadOnlyList<KuljettuPiste> KuljettuReitti => matka?.Tila.Pelaaja.Kuljettu ?? TyhjaReitti;

        /// <summary>
        /// Reitti kasvoi osuudella a → b (a null, jos reitti alkaa tästä), kulkutapa jolla b:hen tultiin
        /// (null = siirto ilman tapaa). Pääsäikeessä, kun kamera on perillä.
        /// </summary>
        public event Action<string, string, Kulkutapa?> KuljettuReittiKasvoi;

        (string A, KuljettuPiste B)? odottavaOsuus;

        void KytkeReitti(Matka m)
        {
            odottavaOsuus = null;
            m.KuljettuKasvoi += (p, edellinen, uusi) =>
            {
                if (m != matka) return;
                IlmoitaOsuus();   // edellinen jäi ilman kamera-ajoa: se ensin
                odottavaOsuus = (edellinen?.Kaupunki, uusi);
            };
        }

        /// <summary>Perilla kutsuu (kamera perillä): odottava osuus ilmoitetaan.</summary>
        void ReittiPerilla(string kaupunki)
        {
            if (odottavaOsuus is { } o && o.B.Kaupunki == kaupunki) IlmoitaOsuus();
        }

        void IlmoitaOsuus()
        {
            if (!(odottavaOsuus is { } o)) return;
            odottavaOsuus = null;
            try { KuljettuReittiKasvoi?.Invoke(o.A, o.B.Kaupunki, o.B.Tapa); } catch (Exception e) { Debug.LogException(e); }
        }
    }
}
