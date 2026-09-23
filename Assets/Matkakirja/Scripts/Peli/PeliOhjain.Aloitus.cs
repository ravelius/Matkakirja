// PELIOHJAIN: ALOITUSLENTO (omistajan aloituskaava, Raamattu 23.9.2026; Fable).
//
// Uuden matkan lähtökaupunki valitaan kartalta. Valinnan jälkeen kone lentää Lontoosta valittuun
// kaupunkiin; koneen ääni ja isoisän intro-luenta alkavat samalla hetkellä kun kone lähtee, ja lento
// kestää vähintään luennan verran. Perillä saapuminen kulkee normaalisti (traileri tai lehti).
//
// Pelitila EI muutu lennosta: matka alkaa valitusta kaupungista kuten webissä (ei noppaa, ei hintaa,
// kultaiset jäljet ennallaan). Lento on esitys: Natiivisepän Nappula.AloitusLento (kamera zoomaa
// Lontooseen, lahti() kun kone lähtee, valmis() perillä), Natiivi-UI:n siirtymä kuuntelee
// AloituslentoAlkoi/AloituslentoPaattyi. Lontoosta alkava matka ja kohtaus ilman nappulaa: ei lentoa.
using System;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>Aloituslennon lähtö: Lontoo (tarina alkaa Lontoosta, Fablen tarkastus C8).</summary>
        public const double AloitusLat = 51.507, AloitusLon = -0.128;
        /// <summary>Lennon vähimmäiskesto (Natiiviseppä: kameran nousu ja seuranta).</summary>
        const float AloituslentoMinimiS = 20f;
        /// <summary>Intro-luennan oletuskesto, jos paketti ei kerro sitä (duration puuttuu).</summary>
        const float IntroOletusS = 30f;

        /// <summary>Aloituslento alkoi (kohde): Natiivi-UI:n siirtymä. Intro-luenta on pelin (LuentaPelilta).</summary>
        public event Action<string> AloituslentoAlkoi;
        /// <summary>Aloituslento päättyi perille (kohde), juuri ennen normaalia saapumista.</summary>
        public event Action<string> AloituslentoPaattyi;

        /// <summary>Onko aloituslento käynnissä (syöte estetty, kamera seuraa konetta).</summary>
        public bool AloituslentoKaynnissa { get; private set; }

        /// <summary>Lennon kesto: vähintään intro-luennan pituus ja 20 s (+ 1 s ettei saapuminen katkaise luentaa).</summary>
        float AloituslennonKesto() =>
            Mathf.Max(AloituslentoMinimiS, (float)(luennat.Intro?.Kesto ?? IntroOletusS) + 1f);

        /// <summary>
        /// Uuden matkan aloituslento valittuun kaupunkiin (UusiMatka). Palauttaa, lähtikö lento;
        /// false = ei nappulaa, pelisilmukka pois tai lähtö Lontoosta (intro soi kuten ennen).
        /// </summary>
        bool AloitaAloituslento(string kohde)
        {
            var nappula = Nappula;
            if (nappula == null || !Kaytossa || kohde == null || kohde == AloitusKaupunki) return false;
            var b = PeliApu.Koordinaatti(verkko, Sijainti.KaupungissaSijainti(kohde));
            if (!b.HasValue) return false;

            float kesto = AloituslennonKesto();
            dialogi.Piilota();
            dialogi.PiilotaHeitto();
            PiilotaKortti();
            saapumisKaupunki = kohde;
            matkaKohde = b.Value;
            Tila = SilmukanTila.Matkalla;
            AloituslentoKaynnissa = true;
            // Natiivi-UI ei soita introa itse avaustekstin aikana: peli soittaa sen koneen lähtiessä.
            Aloitusnakyma.LuentaPelilta = true;
            try { AloituslentoAlkoi?.Invoke(kohde); } catch (Exception e) { Debug.LogException(e); }
            Debug.Log($"MATKAKIRJA peli: aloituslento Lontoo → {kohde}, {kesto:0.0} s");

            int tunnus = ++ajoTunnus;
            kameranOhitus = null;
            ajoValmis = () => AloituslentoPerilla(kohde);
            // Varareitti: zoomi 2,5 s + lento + vara (valmis tulee Nappulalta).
            ajoLoppuu = Time.unscaledTime + 2.5f + kesto + AjonVara + 2f;
            try
            {
                nappula.AloitusLento(AloitusLat, AloitusLon, b.Value.Lat, b.Value.Lon, kesto,
                    () =>
                    {
                        if (tunnus != ajoTunnus) return;
                        // Kone lähtee: moottorin ääni, isoisän intro ja nousu samalla hetkellä.
                        IlmoitaLiike(Kulkutapa.Lento, 0);
                        Lentoaani(true, kesto);
                        AloitaLento(Lentosuunnitelma.Laske("lontoo", kohde, (AloitusLat, AloitusLon), b.Value, kesto,
                            AloituslennonKesto(), aloitus: true));
                        SoitaLuento(luennat.Intro, 0f);
                    },
                    () => { if (tunnus == ajoTunnus) AjoValmis(); });
            }
            catch (Exception e)
            {
                Debug.LogException(e);
                AjoValmis();
            }
            return true;
        }

        void AloituslentoPerilla(string kohde)
        {
            AloituslentoKaynnissa = false;
            try { AloituslentoPaattyi?.Invoke(kohde); } catch (Exception e) { Debug.LogException(e); }
            // Saapuminen normaalisti: traileri tai kaupunkilehti (Perilla).
            Perilla();
        }
    }
}
