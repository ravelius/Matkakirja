// ODOTUSPEITE (web js/linssit/topografia.js, ODOTUSPEITE-osio).
//
// Omistajan vika 16.9.2026: linssi "tökkii", koska pelaaja näki kolme
// näkymää peräkkäin: pelinsä, paljaan kartan ja vasta sitten linssin.
// Korjaus: tumma peite nousee samassa kehyksessä, jossa linssi valitaan, ja
// laskee vasta kun linssin kerros on OIKEASTI ruudulla. Jos kerros ei tule
// (osoite ei vastaa), peite lähtee heti eikä vasta katossa; katto on
// viimeinen varmistus, ettei tumman ruudun taakse jäädä jumiin.
using System;

namespace Matkakirja.Linssit
{
    public sealed class Odotuspeite
    {
        /// <summary>Peitteen ehdoton katto (web PEITTEEN_KATTO_MS 15000).</summary>
        public const double Katto = 15.0;

        readonly ILinssiYmparisto y;
        double alku;

        public bool Paalla { get; private set; }
        /// <summary>Kauanko peite oli ruudulla (s); null, jos se ei ole vielä laskenut.</summary>
        public double? Kesti { get; private set; }
        /// <summary>Miksi peite laski: "valmis", "luovutti", "katto" tai "suljettu".</summary>
        public string Syy { get; private set; }

        public Odotuspeite(ILinssiYmparisto ymparisto) { y = ymparisto; }

        public void Nosta()
        {
            if (Paalla) return;
            Paalla = true;
            Kesti = null;
            Syy = null;
            alku = y.Aika;
            y.Peite(true);
        }

        /// <summary>Katso kerroksen tila; peite laskee, kun kerros on ruudulla tai ei tule.</summary>
        public void Paivita(KerrosTila tila)
        {
            if (!Paalla) return;
            if (tila == KerrosTila.Valmis) Laske("valmis");
            else if (tila == KerrosTila.Luovutti) Laske("luovutti");
            else if (y.Aika - alku >= Katto) Laske("katto");
        }

        /// <summary>Peite pois heti (linssi suljetaan peitteen aikana).</summary>
        public void Laske(string syy = "suljettu")
        {
            if (!Paalla) return;
            Paalla = false;
            Kesti = y.Aika - alku;
            Syy = syy;
            y.Peite(false);
        }
    }
}
