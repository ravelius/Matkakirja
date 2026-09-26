// LINSSIEN SYNTEETTISET TEHOSTEET Unityssä: Keksintöjen kilahdus ("keksinto") ja vuosinaksahdus ("vuosi"). Webissä ne
// ovat js/sound.js:n SOUNDS-synteesiä eivätkä tiedostoja, joten ne puuttuvat tehosteväylän taulusta (Tehostetaulu).
//
// NÄYTTEET lasketaan kerran taustasäikeessä ohjaimen käynnistyessä (Linssit/Ydin/Aanet/Synteesi, webin Web Audio
// -reseptit näyte näytteeltä) ja soitetaan valmiina klippeinä. Web arpoo jokaiseen soittoon ±3 %:n heiton taajuuteen ja
// voimakkuuteen, joten klippejä on muunnelmina (kilahduksia 4, naksuja 8; naksuilla lisäksi eri kohinapätkä, koska
// webin kierrätetty suhinakanava soi koko ajan) ja soitto arpoo muunnelman, ei samaa kahdesti peräkkäin.
//
// TASO JA MYKISTYS kuten tehosteväylän äänitteillä: Natiivi-UI:n Aanet.Taso(Tehoste) (webin master 0,24 × kompressorin
// makeup × Äänitehosteet-liuku; Äänimaisema-kytkin pois = 0, web play() ei soita) kerrottuna webin kuivalla haaralla
// 0,82 (Tehostetaulu.Kaiku.Kuiva). Webin kaiku (märkä haara 0,18 ConvolverNoden normalisoinnilla) jää näillä äänillä
// noin 24 dB kuivan alle eikä kuulu, joten sitä ei lasketa. Sanelun aikana ei soi (web: konteksti pysäytetty). Testien
// "hiljaa" (komento.txt: AudioListener.volume 0) vaientaa nämäkin, koska ne ovat tavallisia AudioSourceja.
//
// MIKSI OMAT LÄHTEET: tehosteväylälle (Aanet.Tehoste → Tehostetaulu) ei voi rekisteröidä ajonaikaista AudioClipiä, vaan
// taulun rivi on osoite. LinssiOhjain.Tehoste (ILinssiYmparisto.Tehoste) ohjaa nämä kaksi nimeä tänne ja muut
// Pelikoodarin väylälle; kun väylä saa rekisteröinnin, klipit voi antaa sille eikä linssien kutsuja tarvitse muuttaa.
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
        public const int KilahduksenMuunnelmia = 4, NaksunMuunnelmia = 8, Lahteita = 6;
        /// <summary>Naksun suhinakanavan esirulla (s): suodin lämpimänä kuten webin kierrätetyssä kanavassa.</summary>
        public const double EsirullaS = 0.005;

        readonly Dictionary<string, AudioClip[]> klipit = new Dictionary<string, AudioClip[]>();
        readonly Dictionary<string, int> edelliset = new Dictionary<string, int>();
        readonly Dictionary<string, int> soittoja = new Dictionary<string, int>();
        readonly List<AudioSource> lahteet = new List<AudioSource>();
        readonly System.Random arpa = new System.Random();
        Task<(float[][] Kilahdus, float[][] Naksu, double Ms)> laskenta;
        int taajuus;
        AudioSource viimeisin;
        string viimeisinNimi;

        /// <summary>Onko nimi syntetisoitu linssitehoste (muut menevät tehosteväylälle).</summary>
        public static bool Tuntee(string nimi) => nimi == KeksintojenAanet.Keksinto || nimi == KeksintojenAanet.Vuosi;

        /// <summary>Soiva taso: tehosteväylän taso (asetukset, mykistys) × webin kuiva haara.</summary>
        public static float Taso => Aanet.Taso(AaniKanava.Tehoste) * Tehostetaulu.Kaiku.Kuiva;

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
            LinssiOhjain.Instanssi?.Kirjaa($"linssiaani: synteesi valmis {taajuus} Hz, kilahdus {t.Result.Kilahdus.Length} × " +
                $"{Synteesi.KeksinnonKestoS:0.00} s, naksu {t.Result.Naksu.Length} × {Synteesi.VuodenKestoS:0.000} s, {t.Result.Ms:F0} ms taustasäikeessä");
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

        AudioSource Vapaa()
        {
            foreach (var s in lahteet) if (!s.isPlaying) return s;
            if (lahteet.Count < Lahteita)
            {
                var uusi = gameObject.AddComponent<AudioSource>();
                uusi.playOnAwake = false;
                uusi.loop = false;
                uusi.spatialBlend = 0;
                lahteet.Add(uusi);
                return uusi;
            }
            // Kaikki soivat (ei tapahdu: naksu 82 ms enintään 8/s, kilahdus 0,46 s): pisimmällä oleva katkaistaan.
            AudioSource vanhin = lahteet[0];
            foreach (var s in lahteet) if (s.time > vanhin.time) vanhin = s;
            vanhin.Stop();
            return vanhin;
        }

        int Arvo(string nimi, int maara)
        {
            int e = edelliset.TryGetValue(nimi, out var v) ? v : -1;
            int i;
            if (e < 0 || maara <= 1) i = arpa.Next(maara);
            else
            {
                i = arpa.Next(maara - 1);
                if (i >= e) i++;   // ei samaa muunnelmaa kahdesti peräkkäin
            }
            edelliset[nimi] = i;
            return i;
        }

        /// <summary>
        /// Soittaa tehosteen (voima kertoo tason kuten tehosteväylällä). Palauttaa soittaneen lähteen tai null ja lokiin
        /// sopivan syyn.
        /// </summary>
        public (AudioSource Lahde, string Tila) Soita(string nimi, float voima = 1f)
        {
            if (Sanelu.Kaynnissa) return (null, "hiljaa (sanelu)");
            float taso = Taso * Mathf.Max(0f, voima);
            if (taso <= 0f) return (null, Asetukset.Paalla(Kytkin.Aanimaisema) ? "hiljaa (Äänitehosteet 0)" : "hiljaa (Äänimaisema pois)");
            if (!klipit.TryGetValue(nimi, out var k) || k.Length == 0)
                return (null, laskenta != null ? "ei soi (synteesi kesken)" : "ei soi (ei klippiä)");
            int i = Arvo(nimi, k.Length);
            var s = Vapaa();
            s.clip = k[i];
            s.volume = Mathf.Min(1f, taso);
            s.Play();
            viimeisin = s;
            viimeisinNimi = nimi;
            soittoja[nimi] = (soittoja.TryGetValue(nimi, out var n) ? n : 0) + 1;
            return (s, $"muunnelma {i + 1}/{k.Length}, taso {s.volume:0.000}");
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
                $"naksuja {Soitot(KeksintojenAanet.Vuosi)}; viimeisin {viimeisinNimi ?? "-"}: {Lahteen(viimeisin)}";
        }

        void OnDestroy()
        {
            foreach (var k in klipit.Values) foreach (var c in k) if (c != null) Destroy(c);
            klipit.Clear();
        }
    }
}
