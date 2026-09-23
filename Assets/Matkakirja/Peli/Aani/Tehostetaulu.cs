// TEHOSTEIDEN SIIVUTAULU (B7 §1.8): verkkopelin js/sound.js REAL_SAMPLES (tiedosto) ja
// REAL_PLAYERS (siivu) yhtenä puhtaana datana. Muoto on sovittu Natiivi-UI:n kanssa
// (UI/UiTehosteet.cs on sama kenttänimistö): Tehoste {Nimi, Url, Aloitus, Kesto, Gain, Vire?,
// Tasavire}, Tehostetaulu {Master, NousuS, LaskuS, VireHeitto, Kaikki, Hae, Lento}.
// Natiivi-UI:n Aanet.cs vaihtaa aliaksensa tähän (using Tehostetaulu = Matkakirja.Peli.Tehostetaulu).
//
// Soiva taso = Gain × Master × Taso(Tehosteet) (webin bus → master 0,24 × tehosteVoima).
// Siivu: 10 ms eksponentiaalinen nousu, 40 ms lasku lopussa; toistonopeus ±5 %, ellei Tasavire
// tai nimetty Vire (±2 %). Aloitus: alusta | isku (webin findHits) | hanta (äänitteen loppu,
// Kesto = hännän pituus) | satunnainen (20–80 %). Kultainen jälki (tehosteet) vartioi rivit.
//
// Pois jätetty (kuten UiTehosteet): zoom (toistonopeuden käyrä, natiivissa ei kartan zoomausääntä),
// robber (rosvolaatat poistettu) ja pulun tehosteet (Natiivi-UI:n oma kirjasto, §5.3).
using System.Collections.Generic;

namespace Matkakirja.Peli
{
    /// <summary>Yksi tehoste: mistä tiedostosta, mistä kohtaa ja kuinka pitkä siivu, millä voimalla.</summary>
    public sealed class Tehoste
    {
        public string Nimi, Url;
        /// <summary>alusta | isku (webin findHits) | hanta (äänitteen loppu) | satunnainen (20–80 %).</summary>
        public string Aloitus;
        /// <summary>Siivun pituus sekunteina (hännällä: hännän pituus) ja tehosteen oma gain.</summary>
        public float Kesto, Gain;
        /// <summary>Nimetty vire (toistonopeus); null = ±5 %:n heitto (ellei Tasavire).</summary>
        public float? Vire;
        public bool Tasavire;
    }

    public static class Tehostetaulu
    {
        /// <summary>Webin MASTER_PERUSTASO; soiva taso = Gain × Master × Taso(Tehosteet).</summary>
        public const float Master = 0.24f, NousuS = 0.010f, LaskuS = 0.040f, VireHeitto = 0.05f;
        /// <summary>Nimetyn vireen heitto (webin jitter(vire, 0,02)).</summary>
        public const float NimettyVireHeitto = 0.02f;

        const string Audio = AaniOsoite.Juuri + "audio/", Freesound = AaniOsoite.Juuri + "aanet/freesound-";

        static Tehoste T(string nimi, string url, string aloitus, float kesto, float gain, float? vire = null, bool tasavire = false)
            => new Tehoste { Nimi = nimi, Url = url, Aloitus = aloitus, Kesto = kesto, Gain = gain, Vire = vire, Tasavire = tasavire };

        static readonly Dictionary<string, Tehoste> kaikki = Taulu(
            // Noppa: iskukohdasta lyhyt naksu, asettuminen äänitteen hännästä.
            T("dieTick", Freesound + "94031.mp3", "isku", 0.08f, 0.40f),
            T("dieLand", Freesound + "94031.mp3", "hanta", 0.6f, 0.55f),
            // Kirjoituskoneen lyönti (voima kutsujalta: etusivu 1, pöllön taustanaputus vaimeampi).
            T("pen", Freesound + "856165.mp3", "isku", 0.24f, 0.35f, tasavire: true),
            T("quizOpen", Freesound + "842183.mp3", "alusta", 1.1f, 0.40f),
            T("click", Audio + "efekti-klik.mp3", "alusta", 0.5f, 0.35f),
            T("paper", Audio + "efekti-paperi.mp3", "alusta", 1.2f, 0.35f),
            T("coin", Audio + "efekti-kolikot.mp3", "alusta", 1.3f, 0.40f),
            T("correct", Audio + "efekti-oikein.mp3", "alusta", 1.5f, 0.40f),
            T("wrong", Audio + "efekti-vaarin.mp3", "alusta", 1.1f, 0.40f),
            T("swipe", Audio + "efekti-pyyhkaisy.mp3", "alusta", 0.8f, 0.30f),
            // Nappulan tok-tok-tik: sama naksu matalana ja korkeana.
            T("step", Audio + "efekti-naksu.mp3", "alusta", 0.5f, 0.30f, vire: 0.82f),
            T("arrive", Audio + "efekti-naksu.mp3", "alusta", 0.6f, 0.42f, vire: 1.18f),
            T("ferry", Audio + "efekti-laiva.mp3", "alusta", 2.6f, 0.40f),
            T("flight", Audio + "efekti-lento.mp3", "alusta", 2.1f, 0.35f),
            T("hint", Audio + "efekti-vihje.mp3", "alusta", 1.1f, 0.35f),
            // Pöllön kupla (kuiskaus) ja kartan popup (selkeä, välitön): paperin iskukohdasta.
            T("kupla", Audio + "efekti-paperi.mp3", "isku", 0.34f, 0.14f),
            T("popup", Audio + "efekti-paperi.mp3", "isku", 0.5f, 0.60f),
            T("tick", Audio + "efekti-tikitys.mp3", "alusta", 0.6f, 0.25f),
            T("timeout", Audio + "efekti-aikaloppui.mp3", "alusta", 1.6f, 0.40f),
            T("flip", Audio + "efekti-kaanto.mp3", "alusta", 0.9f, 0.35f),
            // Voima kutsujalta (webissä avauslennon lähtönapautus kovempaa).
            T("clack", Audio + "efekti-naksu.mp3", "alusta", 0.6f, 0.30f),
            T("star", Audio + "efekti-tahti.mp3", "alusta", 2.6f, 0.45f),
            T("gem", Audio + "efekti-jalokivi.mp3", "alusta", 1.6f, 0.40f),
            T("empty", Audio + "efekti-tyhja.mp3", "alusta", 1.1f, 0.30f),
            T("stuck", Audio + "efekti-jumissa.mp3", "alusta", 1.1f, 0.35f),
            T("turn", Audio + "efekti-vuoro.mp3", "alusta", 1.1f, 0.30f),
            T("win", Audio + "efekti-voitto.mp3", "alusta", 3.6f, 0.50f));

        static Dictionary<string, Tehoste> Taulu(params Tehoste[] rivit)
        {
            var d = new Dictionary<string, Tehoste>();
            foreach (var r in rivit) d[r.Nimi] = r;
            return d;
        }

        public static IReadOnlyDictionary<string, Tehoste> Kaikki => kaikki;

        /// <summary>Tehoste nimellä; null = ei tunneta (webissä synteesi, natiivissa hiljaisuus §2.10).</summary>
        public static Tehoste Hae(string nimi) => nimi != null && kaikki.TryGetValue(nimi, out var t) ? t : null;

        /// <summary>Lentomoottori (webin startFlight/stopFlight, tehoste `jet`).</summary>
        public static class Lento
        {
            public const string Url = AaniOsoite.Juuri + "aanet/freesound-315660.mp3";
            /// <summary>Silmukka alkaa tästä, jos äänite on yli PitkaAaniteS (webin jet.duration &gt; 60 ? 40 : 0).</summary>
            public const float SilmukkaAlkuS = 40f, PitkaAaniteS = 60f;
            /// <summary>Huipputaso (× Master × Taso(Tehosteet)); eksponentiaalinen nousu 0,0001 → Gain välillä NousuAlkuS…NousuLoppuS, lasku LaskuS.</summary>
            public const float Gain = 0.7f, NousuAlkuS = 0.15f, NousuLoppuS = 5.2f, LaskuS = 0.9f;
        }
    }
}
