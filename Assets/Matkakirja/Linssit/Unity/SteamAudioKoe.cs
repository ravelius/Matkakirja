// STEAM AUDIO -KOE (Linssiseppä, 9.10.2026; omistaja 11.0x, PT hyväksyi; juna 172 ilman viivästystä): pallon 3D-äänet (laivojen
// moottorit VeneAanet, myöhemmin 3D-kerta-äänten pooli Rekisteroi-kutsulla) Steam Audion HRTF:llä. KEHITTÄJÄKYTKIN A/B:tä varten,
// OLETUS POIS, kunnes kehysaika ja muisti on mitattu: asetukset.json "pallo.SteamAudio" (0/1 tai true/false) ja komento
// "opas steamaudio 0|1|tila" (LinssiOhjain; komento ohittaa asetuksen istunnon ajaksi).
// Pois: Steam Audiota ei alusteta lainkaan ja lähteillä spatialize = false (Unityn oma panorointi), vaikka AudioManagerin
// spatialisoijaksi on valittu Steam Audio (playerissa sitä ei voi vaihtaa ajon aikana). Päällä: MatkakirjaSteamAudio.Kaynnista()
// ja jokaiselle rekisteröidylle lähteelle SteamAudioSource + spatialize = true (HRTF, ilma-absorptio, etäisyysvaimennus lähteen
// omalla käyrällä; ei okkluusiota eikä heijastuksia). Pois kytkettäessä lähteet irti heti ja Steam Audio sammuu 0,5 s:n päästä.
// Simulaattorikäännöksessä (MATKAKIRJA_EI_STEAMAUDIO, Rakennus.IosSimulaattori) Steam Audion kokoonpano puuttuu: tynkä samalla
// rajapinnalla, aina pois.
#if !MATKAKIRJA_EI_STEAMAUDIO
using System.Collections.Generic;
using SteamAudio;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class SteamAudioKoe
    {
        public const string AsetusAvain = "pallo.SteamAudio";

        /// <summary>Komennon ohitus istunnon ajaksi (null = asetus päättää).</summary>
        public static bool? Pakko;

        static readonly List<AudioSource> lahteet = new List<AudioSource>();
        static bool kaytossa;          // viimeksi toteutettu tila
        static bool epaonnistui;       // Kaynnista epäonnistui: ei yritetä joka kehys uudelleen (komento yrittää)

        public static bool Asetus =>
            Matkakirja.Peli.Asetus.Kytkin(AsetusAvain, false) || Matkakirja.Peli.Asetus.Luku(AsetusAvain, 0.0) != 0.0;

        public static bool Paalla => Pakko ?? Asetus;

        /// <summary>Pallon 3D-lähde kokeeseen (spatialBlend 1). Päällä ollessa Steam Audio liitetään heti.</summary>
        public static void Rekisteroi(AudioSource a)
        {
            if (a == null || lahteet.Contains(a)) return;
            lahteet.Add(a);
            if (kaytossa) MatkakirjaSteamAudio.Liita(a);
        }

        /// <summary>Joka kehys (VeneAanet.Paivita): asetuksen muutos voimaan, kuulijan tarkistus.</summary>
        public static void Paivita()
        {
            if (Paalla != kaytossa && !(Paalla && epaonnistui)) Toteuta(Paalla);
            if (kaytossa) MatkakirjaSteamAudio.Paivita();
        }

        static void Toteuta(bool paalle)
        {
            lahteet.RemoveAll(a => a == null);
            if (paalle)
            {
                if (!MatkakirjaSteamAudio.Kaynnista())
                {
                    epaonnistui = true;
                    Debug.Log("MATKAKIRJA steamaudio: ei käynnistynyt: " + MatkakirjaSteamAudio.Virhe);
                    return;
                }
                epaonnistui = false;
                kaytossa = true;
                foreach (var a in lahteet) MatkakirjaSteamAudio.Liita(a);
            }
            else
            {
                kaytossa = false;
                epaonnistui = false;
                MatkakirjaSteamAudio.Sammuta();
            }
        }

        /// <summary>"opas steamaudio 0|1|tila": 0/1 ohittaa asetuksen istunnon ajaksi ja toteutetaan heti.</summary>
        public static string Komento(string arvo)
        {
            if (arvo == "0" || arvo == "1")
            {
                Pakko = arvo == "1";
                epaonnistui = false;
                if (Paalla != kaytossa) Toteuta(Paalla);
            }
            return Tila();
        }

        public static string Tila()
        {
            lahteet.RemoveAll(a => a == null);
            string kytkin = Pakko.HasValue ? $"komento {(Pakko.Value ? 1 : 0)}" : "asetus";
            return $"steamaudio {(kaytossa ? "päällä" : "pois")} ({kytkin}; {AsetusAvain} = {(Asetus ? 1 : 0)}), " +
                   $"alustettu {(MatkakirjaSteamAudio.Alustettu ? "kyllä" : "ei")}, HRTF {(MatkakirjaSteamAudio.HrtfLadattu ? "ladattu" : "ei")}, " +
                   $"lähteitä {MatkakirjaSteamAudio.Lahteita}/{lahteet.Count}, spatialisoija '{MatkakirjaSteamAudio.Spatialisoija}', " +
                   $"{UnityEngine.AudioSettings.outputSampleRate} Hz" +
                   (string.IsNullOrEmpty(MatkakirjaSteamAudio.Virhe) ? "" : $", virhe: {MatkakirjaSteamAudio.Virhe}");
        }
    }
}
#else
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class SteamAudioKoe
    {
        public const string AsetusAvain = "pallo.SteamAudio";
        public static bool? Pakko;
        public static bool Asetus => false;
        public static bool Paalla => false;
        public static void Rekisteroi(AudioSource a) { }
        public static void Paivita() { }
        public static string Komento(string arvo) => Tila();
        public static string Tila() => "steamaudio ei tässä käännöksessä (simulaattori)";
    }
}
#endif
