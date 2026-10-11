// PELIOHJAIN: ALOITUSINTRO (omistaja 11.10. 11.5x PT:n kautta, juna 182; lisävaatimukset 12.1x; Linssiseppä).
//
// Aloituskaupungit Ateena, Pariisi ja Tukholma: saavuttaessa 18 s:n aloitusintro trailerin paikalla (PeliNakymat.Aloitusintro,
// UI/Pulu/AloitusintroNakyma.cs) kaikissa kolmessa joka saapumisella (PT 12.3x: Pariisissakin 18 s, ei 36 s:n C1–C5-esitystä;
// Pariisin muilla kuin alkulennon käynneillä intro korvaa luennan, KaupunkiIntro.KorvaaLuennan). Kulku:
//   AloituslentoLoppui / Perilla → KaupunkiIntro.Saapuu(k, intro) (TuleeAloitusintro tosi jo AloituslentoPaattyi-hetkellä, jotta
//   NUI näkee sen) → PaataTraileri: Tila = Traileri, intro → valmis(ohitettu) → TraileriValmis → SaavuLehteen (kartta, luenta
//   lykätty Pulun taakse tai jonoon 1 s:n viiveellä) → KaupunkiIntro.Paata → Paattyi(k, ohitettu) → NUI:n Pulu ensimmäisellä
//   kerralla → KaupunkiIntro.PuluValmis → AloitaLykattyLuenta (kerran; turvallinen kutsua monta kertaa).
// Musiikki: kaupungin jakson nopea odottaa Williamia (SaapumisMusiikkiOdottaa) ja esiladataan lennon aikana kuten esitysmusiikki.
using System;
using UnityEngine;
using KaupunkiIntro = Matkakirja.Linssit.Kierros.KaupunkiIntro;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>Tuleeko tähän saapumiseen aloitusintro (näkymä kytketty, pelisilmukka päällä, kaupungilla intro).</summary>
        bool AloitusintroTulossa(string kaupunki, bool alkulento) =>
            kaupunki != null && PeliNakymat.Aloitusintro != null && Kaytossa && KaupunkiIntro.AloitusintroSaa(kaupunki, alkulento);

        /// <summary>Saapuminen kaupunkiin (tai reitin varrelle, null): introtila tälle käynnille.</summary>
        void AloitusintroSaapuminen(string kaupunki, bool alkulento, bool hiljaa)
        {
            bool intro = !hiljaa && AloitusintroTulossa(kaupunki, alkulento);
            KaupunkiIntro.Saapuu(kaupunki, intro, alkulento);
            if (intro) Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro tulossa {kaupunki} ({(alkulento ? "alkulento" : "saapuminen")})");
        }

        /// <summary>NUI:n PuluValmis → lykätty luenta (KaupunkiIntro on Ydin-kerroksessa eikä näe PeliOhjainta).</summary>
        static void KytkeAloitusintro()
        {
            KaupunkiIntro.LykattyLuentaKoukku = k =>
            {
                var o = Instanssi;
                bool alkoi = o != null && o.AloitaLykattyLuenta();
                Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {k} PuluValmis → luenta {(alkoi ? "alkoi" : "ei alkanut (ei lykättyä tai jo alkanut)")}");
            };
        }

        /// <summary>PaataTraileri: aloitusintro trailerin paikalla. false = introa ei tule (traileri tai lehti kuten ennen).</summary>
        bool NaytaAloitusintro(string kaupunki)
        {
            if (kaupunki == null || PeliNakymat.Aloitusintro == null || !KaupunkiIntro.TuleeAloitusintro(kaupunki)) return false;
            Tila = SilmukanTila.Traileri;
            traileriKaupunki = kaupunki;
            bool valmis = false;
            void Valmis(bool ohitettu)
            {
                if (valmis) return;
                valmis = true;
                Aanisoitin.SaapumisMusiikkiVapaa(kaupunki);
                // Kartta näkyviin ja luenta (lykätty Pulun taakse tai jonoon 1 s:n viiveellä), sitten Paattyi.
                TraileriValmis(kaupunki);
                bool laukesi;
                try { laukesi = KaupunkiIntro.Paata(kaupunki, ohitettu); }
                catch (Exception e) { Debug.LogException(e); laukesi = true; } // NUI:n käsittelijä kaatui: tila on silti päättynyt
                if (!laukesi) return;
                Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} Paattyi (ohitettu {ohitettu}, luenta {(LuentaLykatty(kaupunki) ? "odottaa Pulua" : "ilman Pulua")})");
            }
            try { PeliNakymat.Aloitusintro(kaupunki, Valmis); }
            catch (Exception e) { Debug.LogException(e); Valmis(true); }
            return true;
        }

        /// <summary>Luennan viive saapuessa: aloitusintron jälkeen ~1 s (12.1x), muuten 0,6 s kuten ennen.</summary>
        float SaapumisluennanViive(string kaupunki) => KaupunkiIntro.TuleeAloitusintro(kaupunki) ? KaupunkiIntro.AloitusLuentaViiveS : 0.6f;

        /// <summary>Esilataus lennon aikana: Williamin repliikki (puhe) intron kaupunkiin.</summary>
        void EsilataaAloitusintro(string kaupunki, Taso taso)
        {
            if (puhe == null || !AloitusintroTulossa(kaupunki, AloituslentoKaynnissa)) return;
            puhe.Esilataa(KaupunkiIntro.AloitusintroData(kaupunki)?.WilliamUrl, taso);
        }
    }
}
