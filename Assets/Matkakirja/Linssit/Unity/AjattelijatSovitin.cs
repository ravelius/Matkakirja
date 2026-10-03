// AJATTELIJAT-LINSSI UNITYSSÄ (Linssiseppä 2, 2.10.2026; web js/linssit/ajattelijat.js + ajattelija.js, PR #3839/#3840).
// Vain kehittäjätilassa (ei avauskynnystä, Linssirekisteri.Avauskynnykset) kuten webin KEHITTAJALINSSIT. Linssi avaa
// ajattelijan valinnan (AjattelijaNakyma, KORTTI-pohja), ja valinta käynnistää ~53 s:n kohtauksen: prologi (4 s, oma
// kello) → kierros 1, jonka kello on äänikello (AjattelijaTahti: dspTime, äänet PlayScheduledilla, laitteen viive kompensoituna; omistaja TF 133) →
// lopussa elämä-lappu (NOSTOKORTTI tumma) ja PULU. Kierrokset 2– (web #3884, data kierrokset): yksi ääniraita ja syke
// koko kohtaukselle (Sokrates 111 s), lappu kierrosten lopussa; kaikukuvat haetaan kierroksittain. Kohtauksen piirtää AjattelijaNayttamo omalla kamerallaan
// RenderTextureen, jonka AjattelijaNakyma näyttää koko ruudulla (Dioraaman malli).
//
// AJATTELIJAT OVAT DATAA: Resources/Ajattelijat/*.json (tyokalut/ajattelijat-natiiviin.mjs webin datasta). Aineistot
// (GLB, kipsi, kaikukuva, syke, ääni) haetaan ämpäristä datan poluilla; "ajattelija peili <kansio>" lukee ne
// paikallisesta kansiosta (simulaattori: /Users/Shared/Claude/proto-3d/lokit/linssiseppa2-ajattelijat-peili), kunnes
// vienti on ämpärissä.
//
// ESILATAUS (Päätoimittaja 3.10.2026, juna 133): valintakortin avautuessa haetaan jokaisen valittavan ajattelijan
// aineistot (malli, kipsi, kaikukuvat, syke, savu, puhe ja musiikki) ja kytkimen ääni muistiin; valinta vapauttaa muut.
// Raskas purku tehdään jo kortin aikana (Valmiste: atlas ja GLB taustasäikeellä, tekstuurit ruutu kerrallaan), joten
// napautuksen jälkeen jää vain verkon kokoaminen. Kohtauksen kuva (näyttämön RenderTexture, musta) näkyy seuraavalla
// ruudulla, prologin kello käy, ja jos jotain on vielä kesken, prologi odottaa pimeässä ennen kytkintä (ruutu 30).
// Kaikukuvat, savu ja syke puretaan vasta kytkimen jälkeen ruutu kerrallaan (tarvitaan ruudusta 286 alkaen).
//
// AIKAJANA (v13–v14, web 088b64d0c, data a.Aikajana): ääni, syke, kaikukuvat ja savumaski aikajanan poluista; kierrokset
// jäävät käyttämättä. Lähderiviä ei näytetä (web lahde.style.opacity 0); lappu aikajanan lopussa.
//
// Testikomennot (linssi-komento.txt): ajattelija <tunnus> | ruutu <r|pois> | prologi <p> | lappu | tila | peili <kansio|pois>
// | koe normaali|kipsi|spekulaari|reuna <arvo> (pariteetin A/B) | mittari [nollaa] (ruutuvälit kuten webin mittari())
// | seepia 0|1 (web ?kaikuvari=seepia) | savu 0|1 (web ?savu=0). Peili "dokumentit" = laitteen Documents/ajattelijat-peili.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Ajattelijat;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    /// <summary>Tekstien peitot ruudussa (AjattelijaNakyma lukee joka ruutu).</summary>
    public struct AjattelijaTekstit
    {
        public float Nimi, Kysymys, Lahde;
        /// <summary>Lähderivi nykyisen kierroksen päälauseesta (null = ei muutosta).</summary>
        public string El, Viite;
    }

    public sealed class AjattelijatSovitin : ILinssi
    {
        public const string Juuri = "https://media.matkakirja.app/";
        /// <summary>Prologin kytkimen napsahdus (web AJATTELIJA_KYTKIN v2, #3892: aito katkaisijaäänite ja konvoluutiokaiku, CC0).</summary>
        public const string Kytkin = "ajattelijat/yhteiset/v2/kytkin-kaiku.mp3";

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
        bool kytkinSoi, kytkinKirjattu, puheAjastettu, musiikkiAjastettu;
        double ruutuOhitus = double.NaN;
        /// <summary>
        /// Äänikellon ankkuri (AjattelijaTahti): dspTime-hetki, jolloin ruutu 0 kuuluisi; NaN = ei vielä (prologi odottaa
        /// aineistoja ruutujen kellolla). Ankkuroinnin jälkeen kuva ja kaikki äänet kulkevat samalla kellolla.
        /// </summary>
        double dspNolla = double.NaN;
        readonly AjattelijaTahti.Kello dspKello = new AjattelijaTahti.Kello();
        /// <summary>Testikomennon lisäsiirto (ms, `ajattelija viive <ms>`): + = kuva myöhemmin suhteessa ääneen.</summary>
        public static double ViiveLisaMs;
        double viimeViive;
        /// <summary>
        /// Prologin kello (s): alkaa nollasta ensimmäisellä ruudulla valinnan jälkeen (kohtauksen kuva näkyy mustana), etenee
        /// ruutujen välillä enintään ProloginAskelS (purun tai varjostimen kääntämisen pätkintä ei syö prologia) ja odottaa
        /// ennen kytkintä, kunnes aineistot on purettu (Latautuu false).
        /// </summary>
        double prologiAika;
        bool kelloAlkanut;
        const double ProloginAskelS = 0.1;
        int sukupolvi;
        readonly List<float> valit = new List<float>();

        /// <summary>Esiladattu aineisto (polku → tavut tai äänileike); Tunnus "*" = yhteinen (kytkin), ei vapauteta.</summary>
        sealed class Esilataus
        {
            public string Tunnus; public bool Valmis; public byte[] Tavut; public AudioClip Klippi;
        }
        readonly Dictionary<string, Esilataus> esiladatut = new Dictionary<string, Esilataus>();
        /// <summary>Kortin aikana puretut (atlas, malli, normaalikartta, kipsi) ajattelijoittain; omistus näyttämölle valinnassa.</summary>
        sealed class Valmiste
        {
            public bool Valmis; public Texture2D Atlas, Normaali, Kipsi; public GlbMalli Malli;
            /// <summary>Koottu ja lämmitetty näyttämö (kamera pois); Kaappaa = valinta tuli ennen kokoamista (tekstuurit riittävät).</summary>
            public AjattelijaNayttamo Nayttamo; public bool Kaappaa;
            public void Tuhoa()
            {
                foreach (var t in new[] { Atlas, Normaali, Kipsi }) if (t != null) UnityEngine.Object.Destroy(t);
                Atlas = Normaali = Kipsi = null;
                if (Nayttamo != null) { Nayttamo.Tuhoa(); Nayttamo = null; }
            }
        }
        // Napautuksen jälkeisen työn mittaus (loki: "ajattelija: napautus → …").
        readonly System.Diagnostics.Stopwatch napautusKello = new System.Diagnostics.Stopwatch();
        string napautusVaiheet = "";
        bool ensimmainenRuutu;
        void Vaihe(string nimi, System.Diagnostics.Stopwatch v) { napautusVaiheet += $" {nimi} {v.Elapsed.TotalMilliseconds:F0}"; v.Restart(); }
        readonly Dictionary<string, Valmiste> valmisteet = new Dictionary<string, Valmiste>();
        double viimeG;
        const string Yhteinen = "*";

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
            foreach (var a in lista) Esilataa(a);
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
            napautusKello.Restart();
            napautusVaiheet = "";
            ensimmainenRuutu = false;
            var vk = System.Diagnostics.Stopwatch.StartNew();
            PuraKohtaus();
            // Valitsematta jääneiden esilataukset pois muistista; valitun (jos jo kesken tai valmis) käytetään.
            Vapauta(tunnus);
            Esilataa(a, valmistele: false);   // vain tavut; näyttämöä ei valmistella kohtauksen rinnalle
            Vaihe("vapautus", vk);
            Valittu = a;
            Lopussa = false;
            Latautuu = true;
            int s = ++sukupolvi;
            // Prologin kello alkaa heti (kuva on musta, aineistot purkautuvat pimeässä; Paivita pitää kytkintä odottamassa).
            kelloAlkanut = false;
            viimeG = 0;
            kytkinSoi = kytkinKirjattu = puheAjastettu = musiikkiAjastettu = false;
            dspNolla = double.NaN;
            dspKello.Nollaa();
            valit.Clear();
            // Pallo piiloon (Dioraaman näkymäpeitto) ja kartan musiikki pitoon kohtauksen ajaksi.
            SyoteLukko.LisaaNakymaPeitto(nakymaPeitto);
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            y.Taustaaani(null);
            // Valmisteltu näyttämö (koottu ja lämmitetty kortin aikana) käyttöön; muuten uusi näyttämö (atlas esivalmisteesta,
            // jos valmis, muuten Lataa asettaa sen) ja kesken oleva valmistelu jättää kokoamisen Lataalle.
            valmisteet.TryGetValue(a.Tunnus, out var v0);
            if (v0 != null && v0.Valmis && v0.Nayttamo != null)
            {
                nayttamo = v0.Nayttamo;
                v0.Nayttamo = null;
                valmisteet.Remove(a.Tunnus);
                nayttamo.Aktivoi();
            }
            else
            {
                if (v0 != null) v0.Kaappaa = true;
                nayttamo = AjattelijaNayttamo.Luo(a, v0 != null && v0.Valmis ? v0.Atlas : null);
                if (v0 != null && v0.Valmis) v0.Atlas = null;
            }
            Vaihe("näyttämö", vk);
            puhe = LuoLahde("Puhe");
            musiikki = LuoLahde("Musiikki");
            kytkin = LuoLahde("Kytkin");
            Muuttui?.Invoke();
            Vaihe("ui", vk);
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
            // Malli ensin (ilman sitä ei ole kohtausta); muut rinnakkain, esiladattuina muistista. PROLOGIN VALO VASTA LATAUKSEN
            // JÄLKEEN (Fable 3.10.2026: kello kulki ennen purkua, ja pelaaja näki prologista vain lopun): prologi alkaa ruudusta 0
            // mustana kuvana, ja Paivita pitää sen ennen kytkintä (ruutu 30), kunnes kaikki aineistot on purettu.
            // Musta kuva ensin (≤ 1 ruutu napautuksesta); sitten esivalmiste (kesken → odotetaan pimeässä).
            yield return null;
            if (s != sukupolvi) yield break;
            if (nayttamo.MalliValmis)
            {
                // Koottu kortin aikana: vain äänet (esiladattuina) ja jälkilataus.
                var ajv = a.Aikajana;
                var krv = ajv != null ? null : a.Kierrokset;
                int k0 = 0;
                void Odota0(IEnumerator ajo) { k0++; o.StartCoroutine(Valmis(ajo, () => k0--)); }
                o.StartCoroutine(JalkiLataa(a, s));
                Odota0(HaeAani(ajv != null ? ajv.Puhe : krv != null ? krv.Puhe : a.Puhe, puhe, s));
                Odota0(HaeAani(ajv != null ? ajv.Musiikki : krv != null ? krv.Musiikki : a.Musiikki, musiikki, s));
                Odota0(HaeAani(Kytkin, kytkin, s));
                while (k0 > 0) { yield return null; if (s != sukupolvi) yield break; }
                Latautuu = false;
                o.Kirjaa($"ajattelija: {a.Tunnus} auki (valmisteltu), napautuksesta {napautusKello.Elapsed.TotalMilliseconds:F0} ms, {nayttamo.Kuvaus()}");
                Muuttui?.Invoke();
                yield break;
            }
            var lk = System.Diagnostics.Stopwatch.StartNew();
            valmisteet.TryGetValue(a.Tunnus, out var v);
            while (v != null && !v.Valmis) { yield return null; if (s != sukupolvi) yield break; }
            if (v != null) valmisteet.Remove(a.Tunnus);
            if (v?.Atlas != null) { nayttamo.AsetaAtlas(v.Atlas); v.Atlas = null; }
            else nayttamo.LataaAtlas();   // varatie (ei esivalmistetta tai jo käytetty Luossa)
            bool ok;
            string virhe;
            if (v?.Malli != null) { ok = nayttamo.AsetaMalli(v.Malli, v.Normaali ?? AjattelijaNayttamo.NormaaliKuva(v.Malli), out virhe); v.Normaali = null; }
            else
            {
                byte[] glb = null;
                yield return Hae(a.Malli, b => glb = b);
                if (s != sukupolvi) { v?.Tuhoa(); yield break; }
                ok = glb != null && nayttamo.AsetaMalli(glb, out virhe);
            }
            if (!ok)
            {
                v?.Tuhoa();
                o.Kirjaa($"ajattelija: malli {a.Malli} ei latautunut: {nayttamo.Virhe}");
                Latautuu = false;
                PyydaSulku();
                yield break;
            }
            Vaihe("malli (varatie)", lk);
            int kesken = 0;
            void Odota(IEnumerator ajo) { kesken++; o.StartCoroutine(Valmis(ajo, () => kesken--)); }
            if (v?.Kipsi != null) { nayttamo.AsetaKipsi(v.Kipsi); v.Kipsi = null; }
            else Odota(Hae(a.Kipsi, b => { if (s == sukupolvi) nayttamo.AsetaKipsi(b); }));
            var aj = a.Aikajana;
            var kr = aj != null ? null : a.Kierrokset;   // aikajana-tilassa kierrokset eivät ole käytössä (web KR = AJ ? null : …)
            o.StartCoroutine(JalkiLataa(a, s));
            Odota(HaeAani(aj != null ? aj.Puhe : kr != null ? kr.Puhe : a.Puhe, puhe, s));
            Odota(HaeAani(aj != null ? aj.Musiikki : kr != null ? kr.Musiikki : a.Musiikki, musiikki, s));
            Odota(HaeAani(Kytkin, kytkin, s));
            // Haut päättyvät aina (onnistui, virhe tai 30 s:n aikaraja); puuttuva aineisto ei estä kohtausta (kuten web).
            while (kesken > 0)
            {
                yield return null;
                if (s != sukupolvi) yield break;
            }
            Latautuu = false;
            o.Kirjaa($"ajattelija: {a.Tunnus} auki, malli {(Time.realtimeSinceStartup - t0) * 1000:F0} ms, {nayttamo.Kuvaus()}");
            Muuttui?.Invoke();
        }

        /// <summary>
        /// Kaikukuvat, syke ja savu vasta kytkimen jälkeen (prologin valo nousee omalla kellollaan, purku ei syö pimeää eikä
        /// kytkimen aikaa), yksi aineisto ruutua kohden; ensimmäinen tarve on ruudussa 286 (taustavirta) ja 726 (kaiku).
        /// </summary>
        IEnumerator JalkiLataa(AjattelijaData a, int s)
        {
            while (s == sukupolvi && (Latautuu || viimeG < a.Prologi.Kytkin)) yield return null;
            if (s != sukupolvi || nayttamo == null) yield break;
            var aj = a.Aikajana;
            var kr = aj != null ? null : a.Kierrokset;
            bool kaikuja = false;
            foreach (var (k, kuva) in nayttamo.Kaikukuvat().ToList())
            {
                kaikuja = true;
                yield return Hae(kuva, b => { if (s == sukupolvi) nayttamo.AsetaKaiku(k, b); });
                yield return null;
                if (s != sukupolvi) yield break;
            }
            string sykePolku = aj != null ? aj.Syke : kr != null ? kr.Syke : a.Syke;
            if ((aj != null || kaikuja) && !string.IsNullOrEmpty(sykePolku))
                yield return Hae(sykePolku, b => { if (s == sukupolvi && b != null) nayttamo.AsetaSyke(System.Text.Encoding.UTF8.GetString(b)); });
            if (s != sukupolvi) yield break;
            // Savumaski (v13c, aikajana; oletuksena päällä).
            if (nayttamo.SavuKuva != null) yield return Hae(nayttamo.SavuKuva, b => { if (s == sukupolvi) nayttamo.AsetaSavu(b); });
        }

        static IEnumerator Valmis(IEnumerator ajo, Action valmis)
        {
            yield return ajo;
            valmis();
        }

        IEnumerator Hae(string polku, Action<byte[]> valmis)
        {
            if (esiladatut.TryGetValue(polku, out var l))
            {
                while (!l.Valmis) yield return null;
                if (l.Tunnus != Yhteinen && esiladatut.TryGetValue(polku, out var l2) && l2 == l) esiladatut.Remove(polku);   // käytetty
                if (l.Tavut != null) { valmis(l.Tavut); yield break; }
            }
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
            if (esiladatut.TryGetValue(polku, out var l))
            {
                while (!l.Valmis) yield return null;
                if (l.Klippi != null)
                {
                    bool yhteinen = l.Tunnus == Yhteinen;
                    if (!yhteinen && esiladatut.TryGetValue(polku, out var l2) && l2 == l) esiladatut.Remove(polku);   // omistus lähteelle
                    if (s != sukupolvi || kohde == null) { if (!yhteinen) UnityEngine.Object.Destroy(l.Klippi); yield break; }
                    kohde.clip = l.Klippi;
                    yield break;
                }
            }
            using var p = UnityWebRequestMultimedia.GetAudioClip(Osoite(polku), AudioType.MPEG);
            var dh = (DownloadHandlerAudioClip)p.downloadHandler;
            dh.streamAudio = false;
            dh.compressed = false;   // PCM: kello (AudioSource.time) tarkka myös kelatessa (~48 s ≈ 8 Mt, kierrokset 111 s ≈ 19 Mt)
            yield return p.SendWebRequest();
            if (s != sukupolvi || kohde == null) yield break;
            if (p.result != UnityWebRequest.Result.Success) { o.Kirjaa($"ajattelija: ääni {polku} ei latautunut ({p.error})"); yield break; }
            kohde.clip = DownloadHandlerAudioClip.GetContent(p);
            // Jos kello on jo puheen alueella, ääni liittyy kesken (AjattelijaTahti.Ajastus, Paivita).
        }

        /// <summary>Aloittaa ajattelijan aineistojen haun muistiin (jo haetut ja kesken olevat ohitetaan).</summary>
        void Esilataa(AjattelijaData a, bool valmistele = true)
        {
            foreach (var polku in AjattelijaNayttamo.Aineistot(a))
            {
                if (string.IsNullOrEmpty(polku)) continue;
                if (esiladatut.TryGetValue(polku, out var x))
                {
                    if (x.Tunnus != a.Tunnus) x.Tunnus = Yhteinen;   // sama polku usealla ajattelijalla (kipsi): ei vapauteta valinnassa
                    continue;
                }
                var l = esiladatut[polku] = new Esilataus { Tunnus = a.Tunnus };
                o.StartCoroutine(EsiHae(polku, l));
            }
            if (valmistele && !valmisteet.ContainsKey(a.Tunnus))
            {
                var v = valmisteet[a.Tunnus] = new Valmiste();
                o.StartCoroutine(Valmistele(a, v));
            }
            var aj = a.Aikajana;
            var kr = aj != null ? null : a.Kierrokset;
            foreach (var (polku, tunnus) in new[]
            {
                (aj != null ? aj.Puhe : kr != null ? kr.Puhe : a.Puhe, a.Tunnus), (aj != null ? aj.Musiikki : kr != null ? kr.Musiikki : a.Musiikki, a.Tunnus),
                (Kytkin, Yhteinen),
            })
                if (!string.IsNullOrEmpty(polku) && !esiladatut.ContainsKey(polku))
                {
                    var l = esiladatut[polku] = new Esilataus { Tunnus = tunnus };
                    o.StartCoroutine(EsiHaeAani(polku, l));
                }
        }

        /// <summary>
        /// Kortin aikana: atlaksen PNG ja GLB taustasäikeellä, tekstuurit pääsäikeellä yksi ruutua kohden. Vapautettu
        /// (valmisteet ei enää osoita tähän) → luodut tekstuurit tuhotaan.
        /// </summary>
        IEnumerator Valmistele(AjattelijaData a, Valmiste v)
        {
            bool Elossa() => valmisteet.TryGetValue(a.Tunnus, out var x) && x == v;
            var ta = Resources.Load<TextAsset>(a.Atlas.Tiedosto);
            byte[] png = ta != null ? ta.bytes : null;
            if (ta != null) Resources.UnloadAsset(ta);
            var atlasTyo = Task.Run(() => AjattelijaNayttamo.PuraHarmaaPng(png));
            Esilataus l;
            while (esiladatut.TryGetValue(a.Malli, out l) && !l.Valmis) yield return null;
            byte[] glb = l?.Tavut;
            var malliTyo = glb != null ? Task.Run(() => DioraamaGlb.Lue(glb, true)) : null;
            while (!atlasTyo.IsCompleted) yield return null;
            if (!Elossa()) yield break;
            v.Atlas = AjattelijaNayttamo.AtlasTekstuuri(atlasTyo.Status == TaskStatus.RanToCompletion ? atlasTyo.Result : null);
            yield return null;
            while (malliTyo != null && !malliTyo.IsCompleted) yield return null;
            if (!Elossa()) { v.Tuhoa(); yield break; }
            v.Malli = malliTyo != null && malliTyo.Status == TaskStatus.RanToCompletion ? malliTyo.Result : null;
            if (malliTyo?.Exception != null) o.Kirjaa($"ajattelija: {a.Tunnus} malli: {malliTyo.Exception.InnerException?.Message}");
            if (v.Malli != null) { v.Normaali = AjattelijaNayttamo.NormaaliKuva(v.Malli); yield return null; }
            while (esiladatut.TryGetValue(a.Kipsi, out l) && !l.Valmis) yield return null;
            if (!Elossa()) { v.Tuhoa(); yield break; }
            v.Kipsi = AjattelijaNayttamo.KipsiKuva(l?.Tavut);
            // Näyttämö kootaan ja lämmitetään valmiiksi (verkko, tangentit, säteet, varjostimet), ellei valinta tullut jo.
            if (!v.Kaappaa && v.Malli != null && v.Atlas != null)
            {
                yield return null;
                if (!Elossa()) { v.Tuhoa(); yield break; }
                if (v.Kaappaa) { v.Valmis = true; yield break; }
                var n = AjattelijaNayttamo.Luo(a, v.Atlas, valmistelu: true);
                v.Atlas = null;
                v.Nayttamo = n;
                yield return null;
                if (!Elossa()) { v.Tuhoa(); yield break; }
                if (n.AsetaMalli(v.Malli, v.Normaali, out _))
                {
                    v.Normaali = null;
                    n.AsetaKipsi(v.Kipsi);
                    v.Kipsi = null;
                    yield return null;
                    if (!Elossa()) { v.Tuhoa(); yield break; }
                    n.Lammita();
                }
                else { v.Normaali = null; n.Tuhoa(); v.Nayttamo = null; }
                if (v.Kaappaa && v.Nayttamo != null)
                {
                    // Valinta tuli kokoamisen aikana: Lataa käyttää tekstuureja (tämä näyttämö ei ole käytössä).
                    v.Nayttamo.Tuhoa(); v.Nayttamo = null;
                }
            }
            v.Valmis = true;
            o.Kirjaa($"ajattelija: {a.Tunnus} esivalmisteltu (atlas {(v.Atlas != null ? "taustalla" : "-")}, malli {(v.Malli != null ? "taustalla" : "-")})");
        }

        IEnumerator EsiHae(string polku, Esilataus l)
        {
            using var p = UnityWebRequest.Get(Osoite(polku));
            p.timeout = 30;
            yield return p.SendWebRequest();
            // Vapautettu kesken haun: tavut jäävät roskienkerääjälle.
            if (p.result == UnityWebRequest.Result.Success && esiladatut.TryGetValue(polku, out var x) && x == l) l.Tavut = p.downloadHandler.data;
            l.Valmis = true;
        }

        IEnumerator EsiHaeAani(string polku, Esilataus l)
        {
            using var p = UnityWebRequestMultimedia.GetAudioClip(Osoite(polku), AudioType.MPEG);
            var dh = (DownloadHandlerAudioClip)p.downloadHandler;
            dh.streamAudio = false;
            dh.compressed = false;   // PCM kuten HaeAani (kello AudioSource.time)
            yield return p.SendWebRequest();
            if (p.result == UnityWebRequest.Result.Success)
            {
                var klippi = DownloadHandlerAudioClip.GetContent(p);
                if (esiladatut.TryGetValue(polku, out var x) && x == l) l.Klippi = klippi;
                else UnityEngine.Object.Destroy(klippi);   // vapautettu kesken haun
            }
            l.Valmis = true;
        }

        /// <summary>Vapauttaa esilataukset (paitsi ajattelijan sailyta ja yhteiset); null = kaikki ajattelijakohtaiset.</summary>
        void Vapauta(string sailyta)
        {
            foreach (var kv in esiladatut.Where(kv => kv.Value.Tunnus != Yhteinen && kv.Value.Tunnus != sailyta).ToList())
            {
                if (kv.Value.Klippi != null) UnityEngine.Object.Destroy(kv.Value.Klippi);
                esiladatut.Remove(kv.Key);
            }
            foreach (var kv in valmisteet.Where(kv => kv.Key != sailyta).ToList())
            {
                kv.Value.Tuhoa();   // kesken oleva valmistelu huomaa poiston ja tuhoaa myöhemmin luodut
                valmisteet.Remove(kv.Key);
            }
        }

        public void Paivita()
        {
            if (nayttamo == null || Valittu == null) return;
            var a = Valittu;
            double pl = a.Prologi.Loppu;
            double g;
            double dspNyt = dspKello.Nyt(AudioSettings.dspTime, Time.realtimeSinceStartupAsDouble);
            double viive = viimeViive = Viive();
            if (!double.IsNaN(ruutuOhitus)) g = ruutuOhitus;
            else if (!double.IsNaN(dspNolla))
            {
                // Äänikello: ruutu g näkyy, kun sen ääni kuuluu (viive = ulostulo − näyttö). Ei taaksepäin (reitin vaihto).
                g = Math.Max(viimeG, AjattelijaTahti.Ruutu(dspNyt, dspNolla, viive));
                Ajasta(dspNyt, pl);
            }
            else
            {
                if (!kelloAlkanut) { kelloAlkanut = true; prologiAika = 0; }
                else prologiAika += Math.Min(Time.unscaledDeltaTime, ProloginAskelS);
                g = prologiAika * AjattelijaAikajana.RuutuaSekunnissa;
                // Aineistot kesken: prologi odottaa pimeässä ennen kytkintä (ruutu 30); kytkin ja valo vasta valmiina.
                if (Latautuu && g > a.Prologi.Kytkin - 1)
                {
                    g = a.Prologi.Kytkin - 1;
                    prologiAika = g / AjattelijaAikajana.RuutuaSekunnissa;
                }
                if (!Latautuu)
                {
                    // Aineistot valmiina: ankkuri äänikelloon ja kaikki äänet ajastetaan (PlayScheduled) samaan kelloon.
                    // Ensimmäisen äänen (kytkin tai puhe) on ehdittävä Etumatkan päähän; suurella viiveellä kuva odottaa mustassa.
                    double ensimmainen = g < a.Prologi.Kytkin && kytkin.clip != null ? a.Prologi.Kytkin : Math.Max(g, pl);
                    dspNolla = AjattelijaTahti.Ankkuri(dspNyt, g, viive, ensimmainen);
                    g = Math.Max(0, Math.Min(g, AjattelijaTahti.Ruutu(dspNyt, dspNolla, viive)));
                    if (!kytkinSoi && g < a.Prologi.Kytkin && kytkin.clip != null)
                    {
                        kytkinSoi = true;
                        kytkin.volume = EsityksenAani.Mykistetty?.Invoke() ?? false ? 0f : 1f;
                        kytkin.PlayScheduled(AjattelijaTahti.Hetki(dspNolla, a.Prologi.Kytkin));
                    }
                    Ajasta(dspNyt, pl);
                    o.Kirjaa($"ajattelija: tahti ankkuroitu ruudussa {g:F1}, viive {viive * 1000:F0} ms (laite {AaniIstunto.Viive() * 1000:F0}, "
                        + $"Unity {UnityPuskuri() * 1000:F0}, näyttö −{NaytonViive * 1000:F0}, lisä {ViiveLisaMs:F0})");
                }
            }
            // Kytkimen ruutu (kuva) mittariin; ääni on ajastettu samaan hetkeen.
            if (!kytkinKirjattu && double.IsNaN(ruutuOhitus) && g >= a.Prologi.Kytkin)
            {
                kytkinKirjattu = true;
                if (napautusKello.IsRunning) { o.Kirjaa($"ajattelija: kytkin napautuksesta {napautusKello.Elapsed.TotalMilliseconds:F0} ms"); napautusKello.Stop(); }
            }
            if (valit.Count >= 7200) valit.RemoveAt(0);   // koko kohtaus (kierrokset ~115 s) 60 r/s
            valit.Add(Time.unscaledDeltaTime * 1000f);
            viimeG = g;   // JalkiLataa: kaikukuvat ja savu kytkimen jälkeen
            if (!ensimmainenRuutu && napautusKello.IsRunning)
            {
                ensimmainenRuutu = true;
                o.Kirjaa($"ajattelija: napautus →{napautusVaiheet}, ensimmäinen ruutu {napautusKello.Elapsed.TotalMilliseconds:F0} ms");
            }
            var (prologi, r, loppu) = AjattelijaAikajana.Globaali(a, g);
            nayttamo.Aseta(prologi, r);
            Tekstit = prologi ? default : new AjattelijaTekstit
            {
                Nimi = (float)AjattelijaAikajana.Nakyvyys(r, a.Ajat.Nimi),
                Kysymys = (float)AjattelijaAikajana.Nakyvyys(r, a.Ajat.Kysymys),
                // Aikajana-tilassa lähderiviä ei näytetä (web asetaAikajana: lahde.style.opacity = 0).
                Lahde = a.Aikajana != null ? 0f : (float)AjattelijaAikajana.Nakyvyys(r, nayttamo.LahdeAjat, 10),
                El = nayttamo.Lause.El, Viite = nayttamo.Lause.Viite,
            };
            if (loppu && !Lopussa && double.IsNaN(ruutuOhitus)) { Lopussa = true; Muuttui?.Invoke(); }
        }

        /// <summary>Puhe ja musiikki ajastetaan ruutuun prologi.loppu; myöhässä latautunut raita liittyy kesken samaan kelloon.</summary>
        void Ajasta(double dspNyt, double pl)
        {
            Ajasta(puhe, ref puheAjastettu, dspNyt, pl);
            Ajasta(musiikki, ref musiikkiAjastettu, dspNyt, pl);
        }

        void Ajasta(AudioSource l, ref bool ajastettu, double dspNyt, double pl)
        {
            if (ajastettu || l == null || l.clip == null) return;
            ajastettu = true;
            var (hetki, kohta) = AjattelijaTahti.Ajastus(dspNyt, dspNolla, pl);
            if (kohta >= l.clip.length) return;
            l.volume = EsityksenAani.Mykistetty?.Invoke() ?? false ? 0f : 1f;
            l.timeSamples = (int)(kohta * l.clip.frequency);
            l.PlayScheduled(hetki);
        }

        /// <summary>
        /// Kuvan ja äänen ero (s): laitteen ulostulo (AVAudioSession outputLatency + IOBufferDuration) + Unityn miksauspuskuri
        /// − näytön viive (ruutu piirretään ja näytetään seuraavalla näytön päivityksellä) + testikomennon lisä.
        /// </summary>
        static double Viive() => AaniIstunto.Viive() + UnityPuskuri() - NaytonViive + ViiveLisaMs / 1000.0;

        /// <summary>Näytön viive: yksi 60 Hz:n päivitys (Unity piirtää ruudun, Core Animation näyttää sen seuraavalla vsyncillä).</summary>
        const double NaytonViive = 1.0 / 60;

        static double UnityPuskuri()
        {
            AudioSettings.GetDSPBufferSize(out int pituus, out _);
            int taajuus = AudioSettings.outputSampleRate;
            return taajuus > 0 ? (double)pituus / taajuus : 0;
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
            // Kohtauksen äänileikkeet (PCM ~17 Mt kukin) pois muistista; kytkimen leike on yhteinen esilataus.
            foreach (var l in new[] { puhe, musiikki })
                if (l != null && l.clip != null) { var c = l.clip; l.clip = null; UnityEngine.Object.Destroy(c); }
            puhe = musiikki = kytkin = null;
            dspNolla = double.NaN;
            ruutuOhitus = double.NaN;
            Tekstit = default;
        }

        public void Sulje()
        {
            sukupolvi++;
            PuraKohtaus();
            Vapauta(null);
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
            if ((mita == "seepia" || mita == "savu") && arvo != null)
            {
                // Seepia vaikuttaa heti (värit joka ruutu); kaikusarjan seepiakuvat ja savu seuraavasta avauksesta.
                if (mita == "seepia") AjattelijaNayttamo.Seepia = arvo == "1";
                else AjattelijaNayttamo.SavuPois = arvo == "0";
                o.Kirjaa($"ajattelija: seepia {(AjattelijaNayttamo.Seepia ? 1 : 0)} savu {(AjattelijaNayttamo.SavuPois ? 0 : 1)}");
                return;
            }
            if (!AukiNyt) { o.Kirjaa("ajattelija: linssi ei ole auki (linssi ajattelijat)"); return; }
            if (mita == "ruutu" && arvo != null)
                ruutuOhitus = arvo == "pois" ? double.NaN : (Valittu?.Prologi.Loppu ?? 120) + double.Parse(arvo, System.Globalization.CultureInfo.InvariantCulture);
            else if (mita == "prologi" && arvo != null) ruutuOhitus = double.Parse(arvo, System.Globalization.CultureInfo.InvariantCulture);
            else if (mita == "lappu") { Lopussa = true; Muuttui?.Invoke(); }
            else if ((mita == "savupehmeys" || mita == "savuharso") && arvo != null)
            {
                double v = arvo == "pois" ? double.NaN : double.Parse(arvo, System.Globalization.CultureInfo.InvariantCulture);
                if (mita == "savupehmeys") AjattelijaNayttamo.PehmeysOhitus = v; else AjattelijaNayttamo.HarsoOhitus = v;
                nayttamo?.AsetaSavunPehmeys();
                o.Kirjaa($"ajattelija: savu pehmeys {AjattelijaNayttamo.PehmeysOhitus} harso {AjattelijaNayttamo.HarsoOhitus} (NaN = data)");
                return;
            }
            else if (mita == "viive" && arvo != null)
            {
                // Mittauksen kalibrointi: lisäsiirto ms (+ = kuva myöhemmin); vaikuttaa heti (kello lasketaan joka ruutu).
                ViiveLisaMs = double.Parse(arvo, System.Globalization.CultureInfo.InvariantCulture);
                o.Kirjaa($"ajattelija: viive lisä {ViiveLisaMs:F0} ms, yhteensä {Viive() * 1000:F0} ms");
                return;
            }
            else if (mita == "mittari") { if (arvo == "nollaa") valit.Clear(); o.Kirjaa("ajattelija: mittari " + Mittari()); return; }
            else if (mita != "tila") { Valitse(mita); return; }
            o.Kirjaa($"ajattelija: {(Valittu == null ? "valinta" : Valittu.Tunnus)}{(Latautuu ? " latautuu" : "")}{(Lopussa ? " lopussa" : "")}, "
                + $"ruutu {(double.IsNaN(ruutuOhitus) ? "juoksee" : ruutuOhitus.ToString("F0"))}{(double.IsNaN(dspNolla) ? "" : $" (äänikello, viive {viimeViive * 1000:F0} ms, kuva {viimeG:F1})")}, puhe {(puhe?.clip == null ? "-" : $"{puhe.time:F1}/{puhe.clip.length:F0} s{(puhe.isPlaying ? " soi" : "")}")}, "
                + $"{nayttamo?.Kuvaus() ?? "ei näyttämöä"}, {Mittari()}");
        }
    }
}
