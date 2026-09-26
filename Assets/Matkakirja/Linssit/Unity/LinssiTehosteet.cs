// LINSSIEN SYNTEETTISET TEHOSTEET Unityssä: Keksintöjen kilahdus ("keksinto") ja vuosinaksahdus ("vuosi"). Webissä ne
// ovat js/sound.js:n SOUNDS-synteesiä eivätkä tiedostoja, joten ne puuttuvat tehosteväylän taulusta (Tehostetaulu).
//
// NÄYTTEET lasketaan kerran taustasäikeessä ohjaimen käynnistyessä (Linssit/Ydin/Aanet/Synteesi, webin Web Audio
// -reseptit näyte näytteeltä) ja soitetaan valmiina klippeinä. Web arpoo jokaiseen soittoon ±3 %:n heiton taajuuteen ja
// voimakkuuteen, joten klippejä on muunnelmina (kilahduksia 4, naksuja 8; naksuilla lisäksi eri kohinapätkä, koska
// webin kierrätetty suhinakanava soi koko ajan) ja soitto arpoo muunnelman, ei samaa kahdesti peräkkäin.
//
// TEHOSTEVÄYLÄLLÄ (Pelikoodarin Aanet.RekisteroiTehoste 26.9.2026, muunnelmalista): klipit rekisteröidään kerran
// väylälle nimillä "keksinto" (4) ja "vuosi" (8), ja Aanet.Tehoste arpoo muunnelman. Väylä antaa tason (webin master ×
// Äänitehosteet-liuku, Äänimaisema pois = 0), mykistyksen, sanelutauon ja webin kaiun (kuiva 0,82 + märkä haara), joten
// gain on 1 (klipeissä on jo webin reseptin gainit). Testien "hiljaa" (AudioListener.volume 0) vaientaa nämäkin.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Linssit.Aanet;
using UnityEngine;
using Tehostetaulu = Matkakirja.Peli.Tehostetaulu;

namespace Matkakirja.Natiivi
{
    public class LinssiTehosteet : MonoBehaviour
    {
        public const int KilahduksenMuunnelmia = 4, NaksunMuunnelmia = 8;
        /// <summary>Naksun suhinakanavan esirulla (s): suodin lämpimänä kuten webin kierrätetyssä kanavassa.</summary>
        public const double EsirullaS = 0.005;

        readonly Dictionary<string, AudioClip[]> klipit = new Dictionary<string, AudioClip[]>();
        readonly Dictionary<string, int> soittoja = new Dictionary<string, int>();
        Task<(float[][] Kilahdus, float[][] Naksu, double Ms)> laskenta;
        int taajuus;
        string viimeisinNimi;

        /// <summary>Onko nimi syntetisoitu linssitehoste (muut menevät tehosteväylälle).</summary>
        public static bool Tuntee(string nimi) => nimi == KeksintojenAanet.Keksinto || nimi == KeksintojenAanet.Vuosi;

        /// <summary>Väylän gain: väylän kaiku tekee webin kuivan ja märän haaran, joten klipit soivat sellaisinaan.</summary>
        public const float VaylanGain = 1f;

        /// <summary>Soiva taso: tehosteväylän taso (asetukset, mykistys) × gain (kaiku jakaa sen kuivaan ja märkään).</summary>
        public static float Taso => Aanet.Taso(AaniKanava.Tehoste) * VaylanGain;

        public static LinssiTehosteet Luo(Transform isanta)
        {
            var t = new GameObject("Linssitehosteet").AddComponent<LinssiTehosteet>();
            t.transform.SetParent(isanta, false);
            // Klipit mikserin taajuudella: ei uudelleennäytteistystä soitettaessa.
            t.taajuus = AudioSettings.outputSampleRate > 0 ? AudioSettings.outputSampleRate : 48000;
            int f = t.taajuus, siemen = Environment.TickCount;
            t.laskenta = Task.Run(() => Laske(f, siemen));
            return t;
        }

        static (float[][], float[][], double) Laske(int taajuus, int siemen)
        {
            var kello = System.Diagnostics.Stopwatch.StartNew();
            var r = new System.Random(siemen);
            // Webin kohinapuskuri: 1 s tasajakaumaa; knock lukee sen alusta, suhinakanava kiertää sitä.
            var kohina = new Kohina((uint)r.Next(1, int.MaxValue)).Puskuri(taajuus);
            var kilahdus = new float[KilahduksenMuunnelmia][];
            for (int i = 0; i < kilahdus.Length; i++) kilahdus[i] = Synteesi.Keksinto(taajuus, r.NextDouble);
            var naksu = new float[NaksunMuunnelmia][];
            for (int i = 0; i < naksu.Length; i++) naksu[i] = Synteesi.Vuosi(taajuus, r.NextDouble, kohina, r.Next(taajuus), EsirullaS);
            return (kilahdus, naksu, kello.Elapsed.TotalMilliseconds);
        }

        void Update()
        {
            if (laskenta == null || !laskenta.IsCompleted) return;
            var t = laskenta;
            laskenta = null;
            if (t.IsFaulted || t.IsCanceled)
            {
                LinssiOhjain.Instanssi?.Kirjaa("linssiaani: synteesi epäonnistui: " + t.Exception?.InnerException?.Message);
                return;
            }
            klipit[KeksintojenAanet.Keksinto] = Klipit(KeksintojenAanet.Keksinto, t.Result.Kilahdus);
            klipit[KeksintojenAanet.Vuosi] = Klipit(KeksintojenAanet.Vuosi, t.Result.Naksu);
            foreach (var kv in klipit) Aanet.RekisteroiTehoste(kv.Key, kv.Value, VaylanGain, true);
            LinssiOhjain.Instanssi?.Kirjaa($"linssiaani: synteesi valmis {taajuus} Hz, kilahdus {t.Result.Kilahdus.Length} × " +
                $"{Synteesi.KeksinnonKestoS:0.00} s, naksu {t.Result.Naksu.Length} × {Synteesi.VuodenKestoS:0.000} s, {t.Result.Ms:F0} ms taustasäikeessä, " +
                "rekisteröity tehosteväylälle");
        }

        AudioClip[] Klipit(string nimi, float[][] pcm)
        {
            var c = new AudioClip[pcm.Length];
            for (int i = 0; i < pcm.Length; i++)
            {
                c[i] = AudioClip.Create($"linssi-{nimi}-{i + 1}", pcm[i].Length, 1, taajuus, false);
                c[i].SetData(pcm[i], 0);
            }
            return c;
        }

        /// <summary>
        /// Soittaa tehosteen väylältä (voima kertoo tason kuten muillakin tehosteilla). Lähde on väylän oma, joten tila on
        /// syy lokiin; soiminen todennetaan väylän mittauksesta ("aani mittaa", soivat lähteet "oma:keksinto").
        /// </summary>
        public (AudioSource Lahde, string Tila) Soita(string nimi, float voima = 1f)
        {
            if (!klipit.TryGetValue(nimi, out var k) || k.Length == 0)
                return (null, laskenta != null ? "ei soi (synteesi kesken)" : "ei soi (ei klippiä)");
            if (Sanelu.Kaynnissa) return (null, "hiljaa (sanelu)");
            if (Taso * voima <= 0f) return (null, Asetukset.Paalla(Kytkin.Aanimaisema) ? "hiljaa (Äänitehosteet 0)" : "hiljaa (Äänimaisema pois)");
            bool soi = Aanet.Tehoste(nimi, voima);
            viimeisinNimi = nimi;
            soittoja[nimi] = (soittoja.TryGetValue(nimi, out var n) ? n : 0) + 1;
            return (null, soi ? $"väylällä ({k.Length} muunnelmaa), taso {Taso * voima:0.000}" : "ei soi (väylä ei tunne nimeä)");
        }

        /// <summary>Lähteen tila lokiin: play() ei todista ääntä, mutta etenevä aika (time, timeSamples) todistaa.</summary>
        public static string Lahteen(AudioSource s) => s == null || s.clip == null ? "ei lähdettä"
            : $"aika {s.time:0.000}/{s.clip.length:0.000} s ({s.timeSamples} näytettä), soi {s.isPlaying}, kuuntelija {AudioListener.volume:0.00}";

        /// <summary>Kirjaa lähteen tilan viiveen jälkeen (soiko klippi oikeasti).</summary>
        public IEnumerator KirjaaMyohemmin(AudioSource s, string alku, float viiveS)
        {
            yield return new WaitForSecondsRealtime(viiveS);
            LinssiOhjain.Instanssi?.Kirjaa($"{alku}, {Lahteen(s)}");
        }

        /// <summary>Tila testikomennolle "aani tila".</summary>
        public string Kuvaus()
        {
            int Soitot(string nimi) => soittoja.TryGetValue(nimi, out var n) ? n : 0;
            string tila = klipit.Count > 0 ? $"valmiit {taajuus} Hz" : laskenta != null ? "synteesi kesken" : "ei klippejä";
            return $"tehosteet {tila}, taso {Taso:0.000} (Äänitehosteet {Asetukset.Taso(Voima.Tehosteet):0.00}, Äänimaisema " +
                $"{(Asetukset.Paalla(Kytkin.Aanimaisema) ? "päällä" : "pois")}), soitettu kilahduksia {Soitot(KeksintojenAanet.Keksinto)}, " +
                $"naksuja {Soitot(KeksintojenAanet.Vuosi)}; viimeisin {viimeisinNimi ?? "-"} (tehosteväylällä)";
        }

        void OnDestroy()
        {
            foreach (var nimi in klipit.Keys) Aanet.RekisteroiTehoste(nimi, (IReadOnlyList<AudioClip>)null);
            foreach (var k in klipit.Values) foreach (var c in k) if (c != null) Destroy(c);
            klipit.Clear();
        }
    }
}
