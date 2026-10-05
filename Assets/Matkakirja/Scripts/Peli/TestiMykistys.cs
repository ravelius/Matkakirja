// TESTIMYKISTYS (omistaja 30.9.2026 Päätoimittajan kautta: simulaattoriajojen äänet pauhasivat omistajan
// Scarlett-kaiuttimista, koska simulaattorien ääni menee koodaus-käyttäjän oletusulostuloon, jota ei saa vaihtaa).
//
// Kuuntelijan olioon lisätty viimeinen suodatin nollaa lopullisen ulostulon, mutta tallentaa sitä ennen viimeisimmän
// puskurin kanavittain (Lahto). Miksaus, lähteet ja `aani mittaa` näkevät yhä signaalin: kaikki AudioListener.
// GetOutputData-kutsut kulkevat tämän kautta. Suodattimen jälkeen lisätyt kuuntelijan suodattimet (DioraamaLimitteri)
// käsittelevät nollia.
//
// OLETUS: päällä simulaattorissa (SIMULATOR_DEVICE_NAME, kuten Kaynti.Testiymparisto), pois laitteella, Macilla,
// TF:ssä ja App Storessa. Peli-komento `aani mykistys 1|0|tila` (PlayerPrefs testi.mykistys, säilyy asennuksen yli
// kunnes sovellus poistetaan): 0 = kuuluva ääni simulaattorissa, kun sitä erikseen tarvitaan.
using System;
using System.Runtime.InteropServices;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    [DisallowMultipleComponent]
    public sealed class TestiMykistys : MonoBehaviour
    {
        const string Avain = "testi.mykistys";
        const int Pituus = 1024;

        /// <summary>Simulaattori (testiajot): mykistyksen oletus päällä.</summary>
        public static bool Simulaattori =>
            !Application.isEditor && !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("SIMULATOR_DEVICE_NAME"));

        static volatile bool paalla;

        /// <summary>
        /// Äänikaappaus (AaniKaappaus, Linssiseppä 2 4.10.2026): suodinketjussa tämän JÄLKEEN oleva kaappaus kopioi miksauksen ja
        /// nollaa ulostulon itse, joten tämä ei nollaa sillä välin. Ei tallennu (PlayerPrefs ennallaan): kaatuminen ei jätä ääntä päälle.
        /// </summary>
        public static volatile bool KaappausNollaa;
        static TestiMykistys instanssi;

        /// <summary>Nollataanko lopullinen ulostulo (peli-komento aani mykistys).</summary>
        public static bool Paalla
        {
            get => paalla;
            set { paalla = value; PlayerPrefs.SetInt(Avain, value ? 1 : 0); PlayerPrefs.Save(); Natiivi(value); }
        }

        // Äänisäikeen kirjoittama rengas: viimeisimmät Pituus näytettä kanavittain ennen nollausta.
        readonly float[][] rengas = { new float[Pituus], new float[Pituus] };
        int kohta;

        /// <summary>Lisää mykistyksen kuuntelijan olioon (AaniIstunto.Kaynnista, kuuntelija varmistettu).</summary>
        public static void Kiinnita()
        {
            paalla = PlayerPrefs.GetInt(Avain, Simulaattori ? 1 : 0) == 1;
            Natiivi(paalla);
            if (instanssi != null) return;
            var kuuntelijat = FindObjectsByType<AudioListener>(FindObjectsInactive.Exclude, FindObjectsSortMode.None);
            if (kuuntelijat.Length == 0) return;
            instanssi = kuuntelijat[0].gameObject.AddComponent<TestiMykistys>();
            if (paalla) Debug.Log("MATKAKIRJA ääni: testimykistys päällä (simulaattori; aani mykistys 0 = kuuluva ääni)");
        }

        /// <summary>
        /// Kuuntelijan ulostulo kanavalta: mykistettynä nollausta edeltävä puskuri, muuten AudioListener.GetOutputData.
        /// Kaikki pelin master-mittaukset kutsuvat tätä (aani mittaa, puheen verhomittari, matkakirjan kaiutin).
        /// </summary>
        public static void Lahto(float[] naytteet, int kanava)
        {
            var m = instanssi;
            if (!paalla || m == null || kanava < 0 || kanava > 1) { AudioListener.GetOutputData(naytteet, kanava); return; }
            var r = m.rengas[kanava];
            int n = Math.Min(naytteet.Length, Pituus), alku = m.kohta - n;
            for (int i = 0; i < n; i++) naytteet[naytteet.Length - n + i] = r[(alku + i + Pituus) % Pituus];
            for (int i = 0; i < naytteet.Length - n; i++) naytteet[i] = 0f;
        }

        void OnDestroy() { if (instanssi == this) instanssi = null; }

#if UNITY_IOS && !UNITY_EDITOR
        [DllImport("__Internal")] static extern void MatkakirjaAani_TestiMykistys(int paalla);
        [DllImport("__Internal")] static extern bool MatkakirjaAani_TestiMykka();
#endif
        /// <summary>
        /// Natiivit moottorit (Pelikoodari 5.10.2026, KIIRE 13.15: simulaattoriajon striimi kuului omistajan kaiuttimista):
        /// sama lippu MatkakirjaSilmukat-, MatkakirjaRadio- ja MatkakirjaPuhekanava-moottoreille (MatkakirjaAani.mm), joiden
        /// ääni ei kulje Unityn kuuntelijan kautta. Asetetaan ennen kuin mikään moottori käynnistyy (Kiinnita).
        /// </summary>
        static void Natiivi(bool paalle)
        {
#if UNITY_IOS && !UNITY_EDITOR
            MatkakirjaAani_TestiMykistys(paalle ? 1 : 0);
#endif
        }

        /// <summary>Lokiin ja todistusajoon: Unityn ja natiivin mykistyksen tila ("aani mykistys tila").</summary>
        public static string Tila()
        {
#if UNITY_IOS && !UNITY_EDITOR
            bool n = MatkakirjaAani_TestiMykka();
#else
            bool n = paalla;
#endif
            return $"testimykistys unity {(paalla && instanssi != null ? "päällä" : "POIS")}, natiivi {(n ? "päällä" : "POIS")}";
        }

        void OnAudioFilterRead(float[] data, int kanavia)
        {
            if (!paalla || kanavia <= 0) return;
            int kehyksia = data.Length / kanavia, k = kohta;
            for (int i = 0; i < kehyksia; i++)
            {
                int j = i * kanavia;
                rengas[0][k] = data[j];
                rengas[1][k] = kanavia > 1 ? data[j + 1] : data[j];
                k = (k + 1) % Pituus;
            }
            kohta = k;
            if (!KaappausNollaa) Array.Clear(data, 0, data.Length);
        }
    }
}
