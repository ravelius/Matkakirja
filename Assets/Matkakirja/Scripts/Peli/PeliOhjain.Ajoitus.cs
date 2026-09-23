// PELIOHJAIN: SYNKRONISTEN KÄSITTELIJÖIDEN AJOITUS (sulavuus, Pelikoodari 23.9.2026).
//
// Natiivisepän mittaus: ~100 ms kehys 'ui jatka' -komennossa ja ~33 ms kaupunkinapautuksessa.
// Jokainen pelisilmukan synkroninen käsittelijä (jatka, uusi matka, napautus, kortti, matka, tallennus,
// kysymyksen sulku) kirjaa kestonsa, kun se ylittää puolikkaan 120 Hz:n kehyksen (4 ms):
//   MATKAKIRJA ajoitus <nimi> <ms>
// Sisäkkäiset mittaukset kirjautuvat erikseen (esim. tallennus → tallennus.kirjoitus, tallennus.tilaMuuttui),
// joten laitelokista näkee suoraan, onko hidas osa pelilogiikka, tiedostokirjoitus vai näkymän käsittelijä.
using System;
using System.Diagnostics;
using Debug = UnityEngine.Debug;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>Kirjauskynnys millisekunteina.</summary>
        const double AjoitusKynnysMs = 4.0;

        /// <summary>Viimeisin kynnyksen ylittänyt mittaus (peli-tila.json: "ajoitus").</summary>
        string viimeAjoitus;

        readonly struct Ajoitin : IDisposable
        {
            readonly PeliOhjain ohjain;
            readonly string nimi;
            readonly long alku;

            public Ajoitin(PeliOhjain ohjain, string nimi)
            {
                this.ohjain = ohjain;
                this.nimi = nimi;
                alku = Stopwatch.GetTimestamp();
            }

            public void Dispose()
            {
                double ms = (Stopwatch.GetTimestamp() - alku) * 1000.0 / Stopwatch.Frequency;
                if (ms < AjoitusKynnysMs || ohjain == null) return;
                var rivi = nimi + " " + ms.ToString("0.0", System.Globalization.CultureInfo.InvariantCulture);
                ohjain.viimeAjoitus = rivi;
                Debug.Log("MATKAKIRJA ajoitus " + rivi);
            }
        }

        /// <summary>Käyttö: <c>using var _ = Ajoita("nimi");</c> metodin alussa.</summary>
        Ajoitin Ajoita(string nimi) => new Ajoitin(this, nimi);
    }
}
