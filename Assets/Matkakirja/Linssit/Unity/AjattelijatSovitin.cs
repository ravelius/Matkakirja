// AJATTELIJAT-LINSSI UNITYSSÄ (Linssiseppä 2, 2.10.2026; web js/linssit/ajattelijat.js + ajattelija.js, PR #3839/#3840).
// Vain kehittäjätilassa (ei avauskynnystä, Linssirekisteri.Avauskynnykset) kuten webin KEHITTAJALINSSIT. Linssi avaa
// ajattelijan valinnan (AjattelijaNakyma, KORTTI-pohja), ja valinta käynnistää ~53 s:n kohtauksen: prologi (4 s, oma
// kello) → kierros 1, jonka kello on puheraita (G = prologi.loppu + puhe.time · 30, kuten webin aani.currentTime) →
// lopussa elämä-lappu (NOSTOKORTTI tumma) ja PULU. Kohtauksen piirtää AjattelijaNayttamo omalla kamerallaan
// RenderTextureen, jonka AjattelijaNakyma näyttää koko ruudulla (Dioraaman malli).
//
// AJATTELIJAT OVAT DATAA: Resources/Ajattelijat/*.json (tyokalut/ajattelijat-natiiviin.mjs webin datasta). Aineistot
// (GLB, kipsi, kaikukuva, syke, ääni) haetaan ämpäristä datan poluilla; "ajattelija peili <kansio>" lukee ne
// paikallisesta kansiosta (simulaattori: /Users/Shared/Claude/proto-3d/lokit/linssiseppa2-ajattelijat-peili), kunnes
// vienti on ämpärissä.
//
// Testikomennot (linssi-komento.txt): ajattelija <tunnus> | ruutu <r|pois> | prologi <p> | lappu | tila | peili <kansio|pois>
// | koe normaali|kipsi|spekulaari|reuna <arvo> (pariteetin A/B) | mittari [nollaa] (ruutuvälit kuten webin mittari()). Peili "dokumentit" = laitteen Documents/ajattelijat-peili.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Ajattelijat;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    /// <summary>Tekstien peitot ruudussa (AjattelijaNakyma lukee joka ruutu).</summary>
    public struct AjattelijaTekstit
    {
        public float Nimi, Kysymys, Lahde;
    }

    public sealed class AjattelijatSovitin : ILinssi
    {
        public const string Juuri = "https://media.matkakirja.app/";
        /// <summary>Prologin kytkimen napsahdus (web AJATTELIJA_KYTKIN; Linnanrakentaja: Kenney CC0 -iskut ja hallin kaiku).</summary>
        public const string Kytkin = "ajattelijat/yhteiset/v1/kytkin-kaiku.mp3";

        public static readonly LinssiTiedot AjattelijatTiedot = new LinssiTiedot
        {
            Id = "ajattelijat",
            Nimi = "Ajattelijat",
            Lyhyt = "Kipsibysti herää eloon: ajattelijan ajatuksia valona kasvoilla (kehitysvaihe).",
            Jarjestys = 95,
            // Bystin siluetti: pää, kaula ja sokkeli (web js/linssit/ajattelijat.js).
            Ikoni = "<circle cx=\"12\" cy=\"8\" r=\"4.2\"/><path d=\"M9.4 12.4c-.4 1.6-.4 2.8 0 3.8M14.6 12.4c.4 1.6.4 2.8 0 3.8\"/>"
                + "<path d=\"M6.5 20.6c.8-2.6 3-4.2 5.5-4.2s4.7 1.6 5.5 4.2z\"/>",
            Kesken = true,
            Esittely = "Kipsibysti herää eloon: ajattelijan ajatuksia valona kasvoilla (kehitysvaihe).",
            Lahde = new Lahde
            {
                Aineisto = "SMK – Statens Museum for Kunst: kipsivalosten 3D-skannaukset (Scan the World / SMK)",
                Lisenssi = "Public Domain Mark 1.0",
                Osoite = "https://open.smk.dk/",
                Haettu = "2026-10-01",
            },
        };

        // ── Natiivi-UI:n tila (AjattelijaNakyma; Dioraaman staattinen malli) ─────────────────────────────
        /// <summary>Linssi auki (valinta tai kohtaus).</summary>
        public static bool AukiNyt { get; private set; }
        /// <summary>Valittavat ajattelijat (Resources/Ajattelijat, järjestys tiedostonimen mukaan).</summary>
        public static IReadOnlyList<AjattelijaData> Ajattelijat { get { LueAjattelijat(); return lista; } }
        /// <summary>Kohtauksen ajattelija; null = valinta näkyvissä.</summary>
        public static AjattelijaData Valittu { get; private set; }
        /// <summary>Kohtaus on pidossa (kierroksen loppu): lappu ja PULU auki.</summary>
        public static bool Lopussa { get; private set; }
        /// <summary>Aineisto latautuu (näkymä näyttää mustaa; valinta ei vielä kohtaa).</summary>
        public static bool Latautuu { get; private set; }
        public static AjattelijaTekstit Tekstit { get; private set; }
        /// <summary>Avaus, sulku, valinta, lataus valmis tai lopetus.</summary>
        public static event Action Muuttui;

        public static void Valitse(string tunnus) => Instanssi?.AloitaKohtaus(tunnus);
        /// <summary>
        /// Avaa ajattelijan suoraan (kartan pää, Linssisepän ERIKOISNOSTOT; web avaaAjattelija(tunnus)): linssi auki ilman
        /// valintaa ja kohtaus alkuun. false = tuntematon tunnus tai linssi ei ole saatavilla (ei kehittäjätilaa).
        /// </summary>
        public static bool AvaaAjattelija(string tunnus)
        {
            if (Ajattelijat.All(a => a.Tunnus != tunnus)) return false;
            var r = LinssiOhjain.Rekisteri;
            if (!AukiNyt && (r == null || !r.Valitse(AjattelijatTiedot.Id) || !AukiNyt)) return false;
            Instanssi?.AloitaKohtaus(tunnus);
            return Valittu?.Tunnus == tunnus;
        }
        /// <summary>Linssi kiinni (✕, veto alas, valinnan peruutus): kartta takaisin.</summary>
        public static void PyydaSulku() { if (AukiNyt) LinssiOhjain.Rekisteri?.Sulje(); }

        static readonly List<AjattelijaData> lista = new List<AjattelijaData>();
        static AjattelijatSovitin Instanssi;
        /// <summary>Paikallinen peili ämpärin poluille (null = ämpäri).</summary>
        public static string Peili;

        readonly LinssiOhjain o;
        readonly Func<bool> nakymaPeitto;
        ILinssiYmparisto y;
        AjattelijaNayttamo nayttamo;
        AudioSource puhe, musiikki, kytkin;
        bool aaniSoi, kytkinSoi;
        double alku = -1, ruutuOhitus = double.NaN;
        int sukupolvi;
        readonly List<float> valit = new List<float>();

        public AjattelijatSovitin(LinssiOhjain o)
        {
            this.o = o;
            nakymaPeitto = () => AukiNyt && Valittu != null;
        }

        public LinssiTiedot Tiedot => AjattelijatTiedot;
        public bool Auki => AukiNyt;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            y = ymparisto;
            Instanssi = this;
            AukiNyt = true;
            Valittu = null;
            Lopussa = false;
            LueAjattelijat();
            Muuttui?.Invoke();
            o.Kirjaa($"ajattelijat: valinta ({string.Join(", ", lista.Select(a => a.Tunnus))})");
        }

        static void LueAjattelijat()
        {
            if (lista.Count > 0) return;
            foreach (var t in Resources.LoadAll<TextAsset>("Ajattelijat").Where(t => !t.name.EndsWith("-atlas", StringComparison.Ordinal)).OrderBy(t => t.name))
            {
                var (d, virhe) = AjattelijaData.Jasenna(t.text);
                if (d != null) lista.Add(d);
                else Debug.LogWarning($"MATKAKIRJA linssit: ajattelija {t.name} hylätty: {virhe}");
            }
        }

        void AloitaKohtaus(string tunnus)
        {
            var a = lista.FirstOrDefault(x => x.Tunnus == tunnus);
            if (!AukiNyt || a == null) { o.Kirjaa("ajattelija: ei ajattelijaa " + tunnus); return; }
            PuraKohtaus();
            Valittu = a;
            Lopussa = false;
            Latautuu = true;
            int s = ++sukupolvi;
            // Pallo piiloon (Dioraaman näkymäpeitto) ja kartan musiikki pitoon kohtauksen ajaksi.
            SyoteLukko.LisaaNakymaPeitto(nakymaPeitto);
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            y.Taustaaani(null);
            nayttamo = AjattelijaNayttamo.Luo(a);
            puhe = LuoLahde("Puhe");
            musiikki = LuoLahde("Musiikki");
            kytkin = LuoLahde("Kytkin");
            Muuttui?.Invoke();
            o.StartCoroutine(Lataa(a, s));
        }

        AudioSource LuoLahde(string nimi)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(nayttamo.transform, false);
            var l = go.AddComponent<AudioSource>();
            l.playOnAwake = false;
            l.spatialBlend = 0;
            return l;
        }

        public static string Osoite(string polku) =>
            string.IsNullOrEmpty(Peili) ? Juuri + polku : "file://" + Peili.TrimEnd('/') + "/" + polku;

        IEnumerator Lataa(AjattelijaData a, int s)
        {
            float t0 = Time.realtimeSinceStartup;
            // Malli ensin (ilman sitä ei ole kohtausta); muut rinnakkain taustalla, kohtaus alkaa ilman niitä.
            byte[] glb = null;
            yield return Hae(a.Malli, b => glb = b);
            if (s != sukupolvi) yield break;
            if (glb == null || !nayttamo.AsetaMalli(glb, out string virhe))
            {
                o.Kirjaa($"ajattelija: malli {a.Malli} ei latautunut{(glb == null ? "" : ": " + nayttamo.Virhe)}");
                Latautuu = false;
                PyydaSulku();
                yield break;
            }
            o.StartCoroutine(Hae(a.Kipsi, b => { if (s == sukupolvi) nayttamo.AsetaKipsi(b); }));
            if (a.Kaiku != null) o.StartCoroutine(Hae(a.Kaiku.Kuva, b => { if (s == sukupolvi) nayttamo.AsetaKaiku(b); }));
            if (a.Kaiku != null && !string.IsNullOrEmpty(a.Syke))
                o.StartCoroutine(Hae(a.Syke, b => { if (s == sukupolvi) nayttamo.AsetaSyke(System.Text.Encoding.UTF8.GetString(b)); }));
            o.StartCoroutine(HaeAani(a.Puhe, puhe, s));
            o.StartCoroutine(HaeAani(a.Musiikki, musiikki, s));
            o.StartCoroutine(HaeAani(Kytkin, kytkin, s));
            Latautuu = false;
            alku = Time.realtimeSinceStartupAsDouble;
            aaniSoi = false;
            kytkinSoi = false;
            valit.Clear();
            o.Kirjaa($"ajattelija: {a.Tunnus} auki, malli {(Time.realtimeSinceStartup - t0) * 1000:F0} ms, {nayttamo.Kuvaus()}");
            Muuttui?.Invoke();
        }

        IEnumerator Hae(string polku, Action<byte[]> valmis)
        {
            using var p = UnityWebRequest.Get(Osoite(polku));
            p.timeout = 30;
            yield return p.SendWebRequest();
            if (p.result != UnityWebRequest.Result.Success)
            {
                o.Kirjaa($"ajattelija: {polku} ei latautunut ({p.error})");
                valmis(null);
                yield break;
            }
            valmis(p.downloadHandler.data);
        }

        IEnumerator HaeAani(string polku, AudioSource kohde, int s)
        {
            using var p = UnityWebRequestMultimedia.GetAudioClip(Osoite(polku), AudioType.MPEG);
            var dh = (DownloadHandlerAudioClip)p.downloadHandler;
            dh.streamAudio = false;
            dh.compressed = false;   // PCM: kello (AudioSource.time) tarkka myös kelatessa (~48 s ≈ 8 Mt)
            yield return p.SendWebRequest();
            if (s != sukupolvi || kohde == null) yield break;
            if (p.result != UnityWebRequest.Result.Success) { o.Kirjaa($"ajattelija: ääni {polku} ei latautunut ({p.error})"); yield break; }
            kohde.clip = DownloadHandlerAudioClip.GetContent(p);
            // Jos kello on jo puheen alueella, ääni liittyy kesken (webissä sama kelaus currentTime:lla).
            if (aaniSoi && kohde == puhe) aaniSoi = false;
        }

        public void Paivita()
        {
            if (nayttamo == null || Latautuu || Valittu == null) return;
            var a = Valittu;
            double pl = a.Prologi.Loppu;
            double g;
            if (!double.IsNaN(ruutuOhitus)) g = ruutuOhitus;
            else if (aaniSoi && puhe.isPlaying)
            {
                g = pl + puhe.time * AjattelijaAikajana.RuutuaSekunnissa;
                // Musiikki seuraa puheraitaa (yli 0,12 s:n ero korjataan, web).
                if (musiikki.clip != null && musiikki.isPlaying && Mathf.Abs(musiikki.time - puhe.time) > 0.12f && puhe.time < musiikki.clip.length)
                    musiikki.time = puhe.time;
            }
            else
            {
                g = (Time.realtimeSinceStartupAsDouble - alku) * AjattelijaAikajana.RuutuaSekunnissa;
                if (g > pl && !aaniSoi && puhe.clip != null)
                {
                    aaniSoi = true;
                    float kohta = (float)((g - pl) / AjattelijaAikajana.RuutuaSekunnissa);
                    if (kohta < puhe.clip.length)
                    {
                        Soita(puhe, kohta);
                        if (musiikki.clip != null) Soita(musiikki, kohta);
                    }
                }
            }
            // Kytkin kerran prologin ruudussa kytkin (web: vain juoksevalla kellolla, ei ruutuohituksella).
            if (!kytkinSoi && double.IsNaN(ruutuOhitus) && g >= a.Prologi.Kytkin && g < pl && kytkin.clip != null)
            {
                kytkinSoi = true;
                kytkin.volume = EsityksenAani.Mykistetty?.Invoke() ?? false ? 0f : 1f;
                kytkin.Play();
            }
            if (valit.Count >= 3600) valit.RemoveAt(0);   // koko kierros (~53 s) 60 r/s
            valit.Add(Time.unscaledDeltaTime * 1000f);
            var (prologi, r, loppu) = AjattelijaAikajana.Globaali(a, g);
            nayttamo.Aseta(prologi, r);
            Tekstit = prologi ? default : new AjattelijaTekstit
            {
                Nimi = (float)AjattelijaAikajana.Nakyvyys(r, a.Ajat.Nimi),
                Kysymys = (float)AjattelijaAikajana.Nakyvyys(r, a.Ajat.Kysymys),
                Lahde = (float)AjattelijaAikajana.Nakyvyys(r, a.Ajat.Lahde, 10),
            };
            if (loppu && !Lopussa && double.IsNaN(ruutuOhitus)) { Lopussa = true; Muuttui?.Invoke(); }
        }

        static void Soita(AudioSource l, float kohta)
        {
            // Kelaus ennen ja jälkeen Playn (EsityksenAani: iPadilla pelkkä ennen asetettu time ei aina tarttunut).
            l.volume = EsityksenAani.Mykistetty?.Invoke() ?? false ? 0f : 1f;
            l.time = kohta;
            l.Play();
            l.time = kohta;
        }

        void PuraKohtaus()
        {
            if (nayttamo != null)
            {
                nayttamo.Tuhoa();
                nayttamo = null;
                SyoteLukko.PoistaNakymaPeitto(nakymaPeitto);
                y?.Pelikerrokset(true);
                y?.MusiikkiPitoon(false);
            }
            puhe = musiikki = kytkin = null;
            aaniSoi = false;
            ruutuOhitus = double.NaN;
            Tekstit = default;
        }

        public void Sulje()
        {
            sukupolvi++;
            PuraKohtaus();
            AukiNyt = false;
            Valittu = null;
            Lopussa = false;
            Latautuu = false;
            if (Instanssi == this) Instanssi = null;
            Muuttui?.Invoke();
        }

        /// <summary>Webin mittari(): ruutuvälien keskiarvo-fps, p50, p95 ja yli 33,4 ms:n määrä.</summary>
        public string Mittari()
        {
            if (valit.Count == 0) return "ei ruutuja";
            var j = valit.OrderBy(v => v).ToList();
            float P(float q) => j[Math.Min(j.Count - 1, (int)(q * j.Count))];
            return $"fps {1000f / j.Average():F1} p50 {P(0.5f):F1} p95 {P(0.95f):F1} pahin {j[j.Count - 1]:F1} ms, >33 ms {j.Count(v => v > 33.4f)}/{j.Count}";
        }

        /// <summary>Testikomento "ajattelija …" (LinssiOhjain.Suorita).</summary>
        public void Komento(string[] osat)
        {
            string mita = osat.Length > 1 ? osat[1] : "tila";
            string arvo = osat.Length > 2 ? osat[2] : null;
            if (mita == "peili")
            {
                // "dokumentit" = laitteella Documents/ajattelijat-peili (devicectl copy), kunnes vienti on ämpärissä.
                Peili = arvo == null || arvo == "pois" ? null
                    : arvo == "dokumentit" ? System.IO.Path.Combine(Application.persistentDataPath, "ajattelijat-peili") : arvo;
                o.Kirjaa("ajattelija: peili " + (Peili ?? "pois"));
                return;
            }
            if (mita == "koe" && osat.Length > 3)
            {
                float x = float.Parse(osat[3], System.Globalization.CultureInfo.InvariantCulture);
                if (osat[2] == "normaali") AjattelijaNayttamo.KoeNormaali = x > 0;
                else if (osat[2] == "kipsi") AjattelijaNayttamo.KoeKipsi = x > 0;
                else if (osat[2] == "spekulaari") AjattelijaNayttamo.KoeSpekulaari = x;
                else if (osat[2] == "reuna") AjattelijaNayttamo.KoeReuna = x;
                o.Kirjaa($"ajattelija: koe normaali {AjattelijaNayttamo.KoeNormaali} kipsi {AjattelijaNayttamo.KoeKipsi} spekulaari {AjattelijaNayttamo.KoeSpekulaari} reuna {AjattelijaNayttamo.KoeReuna}");
                return;
            }
            if (!AukiNyt) { o.Kirjaa("ajattelija: linssi ei ole auki (linssi ajattelijat)"); return; }
            if (mita == "ruutu" && arvo != null)
                ruutuOhitus = arvo == "pois" ? double.NaN : (Valittu?.Prologi.Loppu ?? 120) + double.Parse(arvo, System.Globalization.CultureInfo.InvariantCulture);
            else if (mita == "prologi" && arvo != null) ruutuOhitus = double.Parse(arvo, System.Globalization.CultureInfo.InvariantCulture);
            else if (mita == "lappu") { Lopussa = true; Muuttui?.Invoke(); }
            else if (mita == "mittari") { if (arvo == "nollaa") valit.Clear(); o.Kirjaa("ajattelija: mittari " + Mittari()); return; }
            else if (mita != "tila") { Valitse(mita); return; }
            o.Kirjaa($"ajattelija: {(Valittu == null ? "valinta" : Valittu.Tunnus)}{(Latautuu ? " latautuu" : "")}{(Lopussa ? " lopussa" : "")}, "
                + $"ruutu {(double.IsNaN(ruutuOhitus) ? "juoksee" : ruutuOhitus.ToString("F0"))}, puhe {(puhe?.clip == null ? "-" : $"{puhe.time:F1}/{puhe.clip.length:F0} s{(puhe.isPlaying ? " soi" : "")}")}, "
                + $"{nayttamo?.Kuvaus() ?? "ei näyttämöä"}, {Mittari()}");
        }
    }
}
