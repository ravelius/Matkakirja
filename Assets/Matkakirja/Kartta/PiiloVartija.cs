using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Text;
using UnityEngine;
using UnityEngine.UIElements;
using Debug = UnityEngine.Debug;

namespace Matkakirja
{
    /// <summary>
    /// PIILOVARTIJA (Fable 25.9.2026, kehyksen hinta -erä; docs/raportit/kehyksen-hinta-20260925.md): piilotettu kerros ei
    /// saa piirtyä. UI Toolkit 6.3 piirtää display:none-vanhemman alla olevien elementtien suotimet (filter: blur,
    /// opacity …) silti joka kehys: aloitusportin piilotettu Etusivulento-kerros vei iPad Pro 13:lla 46–50 ms GPU-aikaa
    /// kehyksessä koko pelin ajan (korjattu myös kerroksessa itsessään).
    ///
    /// Vartija kiertää kaikkien UIDocumenttien puut taustalla: kierros alkaa <see cref="KierrosVali"/> edellisen jälkeen, ja
    /// yhdessä kehyksessä käsitellään enintään <see cref="Budjetti"/> elementtiä (ei koko puuta kerralla, ei piikkiä). Se
    /// poistaa koodissa asetetut suotimet (inline style.filter) elementeiltä, joiden jokin esivanhempi (tai ne itse) on
    /// display:none, ja palauttaa ne, kun elementti tulee taas näkyviin. Palautus tarkistetaan joka kehys vain poistetuille
    /// elementeille (yleensä ei yhtään), joten se osuu samaan kehykseen, kun näkyvyys muuttuu koodista (inline display), ja
    /// viimeistään seuraavaan, kun se muuttuu USS-luokasta. Jos omistaja on sillä välin asettanut uuden suotimen, vartija
    /// ei kirjoita sen päälle. USS:stä tulevia suotimia vartija ei poista (niitä ei nyt ole): ne kirjataan lokiin.
    ///
    /// Lokiin (`MATKAKIRJA piilovartija …`) kirjataan jokainen poisto ja palautus. Komento `piilo tila` (Komennot) tekee
    /// lisäksi kertakatsauksen: piilossa olevat mutta piirrettävät alipuut (visibility: hidden tai opacity 0, ei
    /// display:none), joita vartija ei muuta (display vaikuttaisi asetteluun), sekä vartijan mitattu hinta.
    /// `piilo pois|paalle` kytkee vartijan (pois palauttaa kaikki suotimet).
    /// </summary>
    [DefaultExecutionOrder(32000)] // kaikkien LateUpdatejen jälkeen: tämän kehyksen näkyvyysmuutokset ennen piirtoa
    public sealed class PiiloVartija : MonoBehaviour
    {
        /// <summary>Tauko kierrosten välillä (s).</summary>
        public const float KierrosVali = 2f;
        /// <summary>Hinnan huippu lasketaan vasta näin monen sekunnin jälkeen (käynnistyksen UI-rakennus ja GC eivät sotke).</summary>
        const float LammitysS = 20f;
        /// <summary>Elementtejä enintään kehyksessä.</summary>
        public const int Budjetti = 250;

        public static PiiloVartija Instanssi { get; private set; }

        /// <summary>Vartija käytössä (komento `piilo pois|paalle`).</summary>
        public static bool Paalla { get; set; } = true;

        sealed class Poisto
        {
            public VisualElement e;
            public StyleList<FilterFunction> suodin;
            public string kuvaus;
        }

        readonly List<Poisto> poistot = new List<Poisto>();
        readonly List<(VisualElement e, bool piilossa, string paneeli)> pino = new List<(VisualElement, bool, string)>();
        readonly HashSet<VisualElement> kirjatutUss = new HashSet<VisualElement>();
        readonly Stopwatch kello = new Stopwatch();
        float seuraavaKierros;
        bool kierrosKaynnissa;
        int kierrosElementit, kierrosKehykset, viimeElementit, viimeKehykset, kierroksia, poistojaKaikkiaan, palautuksiaKaikkiaan;
        double kierrosMs, viimeMs, kehysMsYht, kehysMsMax, kehysMsMaxLammin;
        long kehyksia, yli1ms;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { Instanssi = null; Paalla = true; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (Instanssi != null) return;
            var go = new GameObject("PiiloVartija");
            DontDestroyOnLoad(go);
            go.AddComponent<PiiloVartija>();
        }

        void Awake() => Instanssi = this;

        void OnDestroy()
        {
            PalautaKaikki("vartija poistui");
            if (Instanssi == this) Instanssi = null;
        }

        void LateUpdate()
        {
            if (!Paalla)
            {
                if (poistot.Count > 0) PalautaKaikki("vartija pois");
                pino.Clear();
                kierrosKaynnissa = false;
                return;
            }
            kello.Restart();

            // 1) Joka kehys vain poistetut (yleensä ei yhtään): palautus heti, kun elementti on taas näkyvissä.
            for (int i = poistot.Count - 1; i >= 0; i--)
            {
                var p = poistot[i];
                if (p.e == null || p.e.panel == null) { Palauta(p, "irrotettu"); poistot.RemoveAt(i); continue; }
                if (!Piilossa(p.e)) { Palauta(p, "näkyvissä"); poistot.RemoveAt(i); }
            }

            // 2) Taustakierros budjetilla.
            if (!kierrosKaynnissa && Time.unscaledTime >= seuraavaKierros) AloitaKierros();
            if (kierrosKaynnissa)
            {
                int n = 0;
                while (pino.Count > 0 && n < Budjetti)
                {
                    var (e, piilossa, paneeli) = pino[pino.Count - 1];
                    pino.RemoveAt(pino.Count - 1);
                    if (e == null || e.panel == null) continue; // irrotettu kierroksen aikana: seuraava kierros kattaa
                    n++;
                    bool tamaPiilossa = piilossa || e.resolvedStyle.display == DisplayStyle.None;
                    if (tamaPiilossa) Tarkista(e, paneeli);
                    var h = e.hierarchy;
                    for (int i = h.childCount - 1; i >= 0; i--) pino.Add((h[i], tamaPiilossa, paneeli));
                }
                kierrosElementit += n;
                kierrosKehykset++;
                if (pino.Count == 0)
                {
                    kierrosKaynnissa = false;
                    kierroksia++;
                    viimeElementit = kierrosElementit;
                    viimeKehykset = kierrosKehykset;
                    viimeMs = kierrosMs + kello.Elapsed.TotalMilliseconds;
                    seuraavaKierros = Time.unscaledTime + KierrosVali;
                }
            }

            kello.Stop();
            double k = kello.Elapsed.TotalMilliseconds;
            if (kierrosKaynnissa) kierrosMs += k;
            kehyksia++;
            kehysMsYht += k;
            if (k > kehysMsMax) kehysMsMax = k;
            if (Time.realtimeSinceStartup > LammitysS)
            {
                if (k > kehysMsMaxLammin) kehysMsMaxLammin = k;
                if (k > 1.0) yli1ms++;
            }
        }

        void AloitaKierros()
        {
            pino.Clear();
            foreach (var d in FindObjectsByType<UIDocument>(FindObjectsInactive.Exclude, FindObjectsSortMode.None))
            {
                var juuri = d.rootVisualElement;
                if (juuri?.panel != null) pino.Add((juuri, false, d.name));
            }
            kierrosKaynnissa = pino.Count > 0;
            kierrosElementit = kierrosKehykset = 0;
            kierrosMs = 0;
            if (!kierrosKaynnissa) seuraavaKierros = Time.unscaledTime + KierrosVali;
        }

        /// <summary>Piilotettu elementti: koodin asettama suodin pois, USS-suodin lokiin.</summary>
        void Tarkista(VisualElement e, string paneeli)
        {
            // Ensin laskettu tyyli (ei allokointia): vain suodatetut elementit ovat kalliita. e.style luo inline-tyyliolion
            // ensimmäisellä kutsulla, joten sitä ei kosketa muihin (ensimmäinen versio: 1 812 piilotettua elementtiä).
            if (!LaskettuSuodin(e) || OnPoistettu(e)) return;
            var suodin = e.style.filter;
            if (suodin.keyword == StyleKeyword.Undefined && suodin.value != null && suodin.value.Count > 0)
            {
                // Kierros kestää useita kehyksiä: piilotus tarkistetaan uudelleen juuri ennen poistoa (vanhentunut lippu).
                if (!Piilossa(e)) return;
                var p = new Poisto { e = e, suodin = suodin, kuvaus = paneeli + "/" + Polku(e) };
                e.style.filter = StyleKeyword.Null; // ei StyleKeyword.Nonea (kaataa RenderTreeCompositorin 6.3:ssa)
                poistot.Add(p);
                poistojaKaikkiaan++;
                Debug.Log($"MATKAKIRJA piilovartija: suodin pois piilotetusta elementistä {p.kuvaus} ({suodin.value.Count} suodinta)");
            }
            else if (kirjatutUss.Add(e))
                Debug.LogWarning($"MATKAKIRJA piilovartija: USS-suodin piilotetussa elementissä {paneeli}/{Polku(e)} (vartija ei poista; korjaa tyyli)");
        }

        /// <summary>
        /// Elementti tai jokin sen esivanhemmista on display:none. Koodista asetettu inline Flex kumoaa vanhentuneen
        /// resolvedStylen (tyylit lasketaan vasta ennen piirtoa), jotta palautus osuu samaan kehykseen.
        /// </summary>
        static bool Piilossa(VisualElement e)
        {
            for (var a = e; a != null; a = a.hierarchy.parent)
            {
                if (a.resolvedStyle.display != DisplayStyle.None) continue;
                if (a.style.display.keyword == StyleKeyword.Undefined && a.style.display.value == DisplayStyle.Flex) continue;
                return true;
            }
            return false;
        }

        static bool LaskettuSuodin(VisualElement e)
        {
            var f = e.resolvedStyle.filter;
            if (f == null) return false;
            if (f is ICollection<FilterFunction> c) return c.Count > 0;
            foreach (var _ in f) return true;
            return false;
        }

        bool OnPoistettu(VisualElement e)
        {
            for (int i = 0; i < poistot.Count; i++) if (poistot[i].e == e) return true;
            return false;
        }

        void Palauta(Poisto p, string syy)
        {
            if (p.e != null)
            {
                // Omistaja on voinut asettaa uuden suotimen sillä välin: silloin sen arvo jää voimaan.
                var nyt = p.e.style.filter;
                bool koskematon = nyt.keyword == StyleKeyword.Null || (nyt.keyword == StyleKeyword.Undefined && (nyt.value == null || nyt.value.Count == 0));
                if (koskematon) p.e.style.filter = p.suodin;
            }
            palautuksiaKaikkiaan++;
            Debug.Log($"MATKAKIRJA piilovartija: suodin palautettu ({syy}) {p.kuvaus}");
        }

        void PalautaKaikki(string syy)
        {
            foreach (var p in poistot) Palauta(p, syy);
            poistot.Clear();
        }

        static string Polku(VisualElement e)
        {
            var osat = new List<string>();
            for (var a = e; a != null && osat.Count < 6; a = a.hierarchy.parent)
                osat.Add(!string.IsNullOrEmpty(a.name) ? a.name : a.GetType().Name);
            osat.Reverse();
            return string.Join(">", osat);
        }

        /// <summary>
        /// Testikomento `piilo tila`: vartijan tila ja hinta sekä kertakatsaus (koko puut kerralla, vain komennosta):
        /// display:none-alipuut, niiden suotimet ja piilossa olevat mutta piirrettävät alipuut.
        /// </summary>
        public string Kuvaus()
        {
            var ic = CultureInfo.InvariantCulture;
            var sb = new StringBuilder("MATKAKIRJA piilovartija: ");
            sb.Append(Paalla ? "päällä" : "pois").Append(", poistettuna ").Append(poistot.Count).Append(" suodinta (kaikkiaan ")
              .Append(poistojaKaikkiaan).Append(" poistoa, ").Append(palautuksiaKaikkiaan).Append(" palautusta); kierroksia ")
              .Append(kierroksia).Append(", viimeisin ").Append(viimeElementit).Append(" elementtiä ").Append(viimeKehykset)
              .Append(" kehyksessä, ").Append(viimeMs.ToString("0.000", ic)).Append(" ms yhteensä; hinta ka ")
              .Append((kehyksia > 0 ? kehysMsYht / kehyksia : 0).ToString("0.0000", ic)).Append(" ms/kehys, max ")
              .Append(kehysMsMax.ToString("0.000", ic)).Append(" ms, max ").Append(LammitysS.ToString("0", ic)).Append(" s jälkeen ")
              .Append(kehysMsMaxLammin.ToString("0.000", ic)).Append(" ms, yli 1 ms ").Append(yli1ms).Append(" kehystä (")
              .Append(kehyksia).Append(" kehystä)");
            foreach (var p in poistot) sb.Append("\n  poistettu: ").Append(p.kuvaus);

            var katsaus = Stopwatch.StartNew();
            int elementit = 0, piilossa = 0, piilossaSuotimia = 0;
            var piirrettavat = new List<string>();
            foreach (var d in FindObjectsByType<UIDocument>(FindObjectsInactive.Exclude, FindObjectsSortMode.None))
            {
                var juuri = d.rootVisualElement;
                if (juuri?.panel == null) continue;
                Katsaus(juuri, false, d.name, ref elementit, ref piilossa, ref piilossaSuotimia, piirrettavat);
            }
            katsaus.Stop();
            sb.Append("\n  katsaus: ").Append(elementit).Append(" elementtiä, display:none-alipuissa ").Append(piilossa)
              .Append(", niissä suotimia ").Append(piilossaSuotimia).Append(", piilossa mutta piirrettäviä alipuita ")
              .Append(piirrettavat.Count).Append(" (").Append(katsaus.Elapsed.TotalMilliseconds.ToString("0.000", ic)).Append(" ms)");
            foreach (var s in piirrettavat) sb.Append("\n  piilossa mutta piirrettävä: ").Append(s);
            return sb.ToString();
        }

        static void Katsaus(VisualElement e, bool piilossa, string paneeli, ref int elementit, ref int piilossaN, ref int suotimia,
                            List<string> piirrettavat)
        {
            elementit++;
            var t = e.resolvedStyle;
            bool p = piilossa || t.display == DisplayStyle.None;
            if (p)
            {
                piilossaN++;
                if (LaskettuSuodin(e)) suotimia++;
            }
            else if (t.visibility == Visibility.Hidden || t.opacity <= 0.001f)
            {
                int n = 0;
                Laske(e, ref n);
                piirrettavat.Add($"{paneeli}/{Polku(e)} ({(t.visibility == Visibility.Hidden ? "visibility hidden" : "opacity 0")}, {n} elementtiä)");
                elementit += n - 1;
                return;
            }
            var h = e.hierarchy;
            for (int i = 0; i < h.childCount; i++) Katsaus(h[i], p, paneeli, ref elementit, ref piilossaN, ref suotimia, piirrettavat);
        }

        static void Laske(VisualElement e, ref int n)
        {
            n++;
            var h = e.hierarchy;
            for (int i = 0; i < h.childCount; i++) Laske(h[i], ref n);
        }
    }
}
