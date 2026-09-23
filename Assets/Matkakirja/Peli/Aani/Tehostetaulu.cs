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
        /// <summary>Eksponenttirampin pohja (webin 0,0001) ja hännän lisävara (alku = kesto − häntä − 0,15 s).</summary>
        public const float Hiljaisin = 0.0001f, HantaVaraS = 0.15f;
        /// <summary>Lasku alkaa aikaisintaan tästä (webin max(0,02, kesto − 0,04)); lähde soi kesto + 0,03 s.</summary>
        public const float PitoMinS = 0.02f, SoittoLisaS = 0.03f;
        /// <summary>Satunnainen alku: pituus × 0,2 + random × max(0,01, pituus × 0,6 − kesto).</summary>
        public const float SatunnainenAlku = 0.2f, SatunnainenVali = 0.6f;
        /// <summary>findHits: kynnys × huippu (huippu joka 16. näytteestä, haku joka 8.), väli 100 ms, kohta −5 ms, 1. kanava.</summary>
        public const float IskuKynnys = 0.3f, IskuValiS = 0.1f, IskuEtuS = 0.005f;

        /// <summary>Webin tehosteväylän kaiku: bus → kuiva 0,82 + märkä 0,18 (ConvolverNode, normalize) → master.
        /// Impulssi: 2 kanavaa kohinaa × (1 − i/n)^3,2, pituus 1,2 s.</summary>
        public static class Kaiku
        {
            public const float Kuiva = 0.82f, Marka = 0.18f, PituusS = 1.2f, Vaimeneminen = 3.2f;
        }

        /// <summary>
        /// Webin master-kompressori (DynamicsCompressorNode master-gainin JÄLKEEN): −20 dB, knee 26, ratio 3,
        /// attack 6 ms, release 220 ms. Chromium/WebKit lisää automaattisen makeup-gainin
        /// (1 / käyrä(0 dBFS))^0,6 = 1,235 (+1,8 dB); tehosteiden tasoilla (≤ −15 dBFS) ero on käytännössä
        /// tämä vakio. Mitattu erä 5:ssä Chromiumin kaavalla.
        /// </summary>
        public static class Kompressori
        {
            public const float KynnysDb = -20f, KneeDb = 26f, Suhde = 3f, AttackS = 0.006f, ReleaseS = 0.22f, Makeup = 1.235f;
        }

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
            /// <summary>Lasku on eksponentiaalinen nykytasosta 0,0001:een; lähde pysäytetään 1,0 s:n kohdalla.</summary>
            public const float PysaytysS = 1.0f;
            /// <summary>Webin pelin lento ja mannerlento kestävät MANNER_LENTO_MS = 2,8 s (stopFlight silloin):
            /// nousu ehtii vain noin tasoon 0,010 eli −37 dB huipusta. Avauslennolla web ei soita moottoria.</summary>
            public const float WebinLentoS = 2.8f;

            /// <summary>Moottorin taso (× Master × Taso(Tehosteet)) hetkellä t lähdöstä, kuten webin rampit.</summary>
            public static float Taso(float t)
            {
                if (t <= NousuAlkuS) return Hiljaisin;
                if (t >= NousuLoppuS) return Gain;
                return Hiljaisin * (float)System.Math.Pow(Gain / Hiljaisin, (t - NousuAlkuS) / (NousuLoppuS - NousuAlkuS));
            }
        }

        /// <summary>Siivun alkukohta (webin playSlice): hanta, alusta, isku (satunnainen isku, muuten satunnainen) tai satunnainen.
        /// arpa() ∈ [0, 1).</summary>
        public static float Alkukohta(Tehoste t, float pituus, IReadOnlyList<float> iskut, System.Func<double> arpa)
        {
            if (t.Aloitus == "hanta") return System.Math.Max(0f, pituus - t.Kesto - HantaVaraS);
            if (t.Aloitus == "alusta") return 0f;
            if (t.Aloitus == "isku" && iskut != null && iskut.Count > 0) return iskut[(int)System.Math.Floor(arpa() * iskut.Count)];
            return pituus * SatunnainenAlku + (float)arpa() * System.Math.Max(0.01f, pituus * SatunnainenVali - t.Kesto);
        }

        /// <summary>Toistonopeus: nimetty vire ±2 %, tasavire 1, muuten ±5 % (webin jitter; r ∈ [0, 1)).</summary>
        public static float Toistonopeus(Tehoste t, double r)
        {
            float heitto = (float)(r * 2 - 1);
            if (t.Vire.HasValue) return t.Vire.Value * (1 + heitto * NimettyVireHeitto);
            return t.Tasavire ? 1f : 1 + heitto * VireHeitto;
        }
    }
}
