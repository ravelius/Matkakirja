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
    /// Vartija kulkee kaikkien UIDocumenttien puut harvoin: paneeli, jonka IPanel.isDirty on tosi, <see cref="TarkistusVali"/>
    /// välein, ja kaikki paneelit viimeistään <see cref="KokoVali"/> välein (ei joka kehys). Se poistaa koodissa asetetut
    /// suotimet (inline style.filter) elementeiltä, joiden jokin esivanhempi (tai ne itse) on display:none, ja palauttaa ne,
    /// kun elementti tulee taas näkyviin. Palautus tarkistetaan joka kehys vain poistetuille elementeille (yleensä ei
    /// yhtään), joten palautus osuu samaan kehykseen, kun näkyvyys muuttuu koodista (inline display), ja viimeistään
    /// seuraavaan, kun se muuttuu USS-luokasta. Jos elementin omistaja on sillä välin asettanut uuden suotimen, vartija ei
    /// kirjoita sen päälle. USS:stä tulevia suotimia vartija ei poista (niitä ei nyt ole): ne kirjataan lokiin korjattaviksi.
    ///
    /// Lokiin (`MATKAKIRJA piilovartija …`) kirjataan jokainen poisto ja palautus sekä piilossa olevat mutta piirrettävät
    /// alipuut (visibility: hidden tai opacity 0, ei display:none), jotka kuluttavat piirtoa näkymättöminä. Näitä vartija
    /// ei muuta, koska display vaikuttaisi asetteluun. Komento `piilo tila` (Komennot) kertoo tilan ja vartijan mitatun
    /// hinnan, `piilo pois|paalle` kytkee vartijan (pois palauttaa kaikki suotimet).
    /// </summary>
    [DefaultExecutionOrder(32000)] // kaikkien LateUpdatejen jälkeen: tämän kehyksen näkyvyysmuutokset ennen piirtoa
    public sealed class PiiloVartija : MonoBehaviour
    {
        /// <summary>Likaisten paneelien tarkistusväli (s).</summary>
        public const float TarkistusVali = 0.5f;
        /// <summary>Kaikkien paneelien kulku viimeistään näin usein (s).</summary>
        public const float KokoVali = 2f;

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
        readonly List<UIDocument> dokumentit = new List<UIDocument>();
        readonly Dictionary<string, int> piirrettavatPiilossa = new Dictionary<string, int>();
        readonly HashSet<string> kirjatutUss = new HashSet<string>();
        readonly Stopwatch kello = new Stopwatch();
        float seuraavaTarkistus, seuraavaKoko;
        int kayntejaKaikkiaan, elementteja, poistojaKaikkiaan, palautuksiaKaikkiaan;
        double kulkuMsYht, kulkuMsMax, kehysMsYht, kehysMsMax;
        long kehyksia;
        string viimeKulku = "-";

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
            kello.Restart();
            if (!Paalla)
            {
                if (poistot.Count > 0) PalautaKaikki("vartija pois");
                return;
            }

            // 1) Joka kehys vain poistetut (yleensä ei yhtään): palautus heti, kun elementti on taas näkyvissä.
            for (int i = poistot.Count - 1; i >= 0; i--)
            {
                var p = poistot[i];
                if (p.e == null || p.e.panel == null) { Palauta(p, "irrotettu"); poistot.RemoveAt(i); continue; }
                if (!Piilossa(p.e, true)) { Palauta(p, "näkyvissä"); poistot.RemoveAt(i); }
            }

            // 2) Harvoin: likaiset paneelit TarkistusVali välein, kaikki KokoVali välein.
            float nyt = Time.unscaledTime;
            if (nyt >= seuraavaTarkistus)
            {
                seuraavaTarkistus = nyt + TarkistusVali;
                bool koko = nyt >= seuraavaKoko;
                if (koko)
                {
                    seuraavaKoko = nyt + KokoVali;
                    dokumentit.Clear();
                    dokumentit.AddRange(FindObjectsByType<UIDocument>(FindObjectsInactive.Exclude, FindObjectsSortMode.None));
                    piirrettavatPiilossa.Clear();
                }
                var kulku = Stopwatch.StartNew();
                int kaydyt = 0, n = 0;
                foreach (var d in dokumentit)
                {
                    if (d == null) continue;
                    var juuri = d.rootVisualElement;
                    var paneeli = juuri?.panel;
                    if (paneeli == null || (!koko && !paneeli.isDirty)) continue;
                    kaydyt++;
                    n += Kulje(juuri, false, d.name, koko);
                }
                kulku.Stop();
                if (kaydyt > 0)
                {
                    double ms = kulku.Elapsed.TotalMilliseconds;
                    kayntejaKaikkiaan++;
                    kulkuMsYht += ms;
                    if (ms > kulkuMsMax) kulkuMsMax = ms;
                    elementteja = n;
                    viimeKulku = $"{kaydyt} paneelia, {n} elementtiä, {ms.ToString("0.000", CultureInfo.InvariantCulture)} ms{(koko ? " (kaikki)" : "")}";
                }
            }

            kello.Stop();
            double k = kello.Elapsed.TotalMilliseconds;
            kehyksia++;
            kehysMsYht += k;
            if (k > kehysMsMax) kehysMsMax = k;
        }

        /// <summary>
        /// Elementti tai jokin sen esivanhemmista on display:none. palautus = tosi: koodista asetettu inline Flex kumoaa
        /// vanhentuneen resolvedStylen (tyylit lasketaan vasta ennen piirtoa), jotta palautus osuu samaan kehykseen.
        /// </summary>
        static bool Piilossa(VisualElement e, bool palautus)
        {
            for (var a = e; a != null; a = a.hierarchy.parent)
            {
                if (a.resolvedStyle.display != DisplayStyle.None) continue;
                if (palautus && a.style.display.keyword == StyleKeyword.Undefined && a.style.display.value == DisplayStyle.Flex) continue;
                return true;
            }
            return false;
        }

        static bool OmaSuodin(VisualElement e, out StyleList<FilterFunction> suodin)
        {
            suodin = e.style.filter;
            return suodin.keyword == StyleKeyword.Undefined && suodin.value != null && suodin.value.Count > 0;
        }

        /// <summary>Kulkee alipuun; palauttaa elementtien määrän.</summary>
        int Kulje(VisualElement e, bool piilossa, string paneeli, bool koko)
        {
            int n = 1;
            var tyyli = e.resolvedStyle;
            bool tamaPiilossa = piilossa || tyyli.display == DisplayStyle.None;
            if (tamaPiilossa)
            {
                if (OmaSuodin(e, out var suodin) && !OnPoistettu(e))
                {
                    var p = new Poisto { e = e, suodin = suodin, kuvaus = paneeli + "/" + Polku(e) };
                    e.style.filter = StyleKeyword.Null; // ei StyleKeyword.Nonea (kaataa RenderTreeCompositorin 6.3:ssa)
                    poistot.Add(p);
                    poistojaKaikkiaan++;
                    Debug.Log($"MATKAKIRJA piilovartija: suodin pois piilotetusta elementistä {p.kuvaus} ({suodin.value.Count} suodinta)");
                }
                else if (!OnPoistettu(e) && UssSuodin(e))
                {
                    string avain = paneeli + "/" + Polku(e);
                    if (kirjatutUss.Add(avain))
                        Debug.LogWarning($"MATKAKIRJA piilovartija: USS-suodin piilotetussa elementissä {avain} (vartija ei poista; korjaa tyyli)");
                }
            }
            else if (koko && (tyyli.visibility == Visibility.Hidden || tyyli.opacity <= 0.001f))
            {
                // Piilossa, mutta piirrettävä (ei display:none): kirjataan, ei muuteta (asettelu).
                int alipuu = Laske(e);
                string avain = paneeli + "/" + Polku(e) + (tyyli.visibility == Visibility.Hidden ? " (visibility hidden)" : " (opacity 0)");
                if (!piirrettavatPiilossa.ContainsKey(avain) && alipuu >= 1) piirrettavatPiilossa[avain] = alipuu;
                return n + alipuu - 1;
            }
            for (int i = 0; i < e.hierarchy.childCount; i++) n += Kulje(e.hierarchy[i], tamaPiilossa, paneeli, koko);
            return n;
        }

        static bool UssSuodin(VisualElement e)
        {
            try
            {
                foreach (var _ in e.resolvedStyle.filter) return true;
            }
            catch (Exception) { }
            return false;
        }

        static int Laske(VisualElement e)
        {
            int n = 1;
            for (int i = 0; i < e.hierarchy.childCount; i++) n += Laske(e.hierarchy[i]);
            return n;
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

        /// <summary>Tila testikomennolle `piilo tila`: poistot, piilossa piirrettävät ja vartijan mitattu hinta.</summary>
        public string Kuvaus()
        {
            var ic = CultureInfo.InvariantCulture;
            var sb = new StringBuilder("MATKAKIRJA piilovartija: ");
            sb.Append(Paalla ? "päällä" : "pois").Append(", poistettuna ").Append(poistot.Count).Append(" suodinta (kaikkiaan ")
              .Append(poistojaKaikkiaan).Append(" poistoa, ").Append(palautuksiaKaikkiaan).Append(" palautusta), viimeisin kulku ")
              .Append(viimeKulku).Append(", kulkuja ").Append(kayntejaKaikkiaan).Append(", kulku ka ")
              .Append((kayntejaKaikkiaan > 0 ? kulkuMsYht / kayntejaKaikkiaan : 0).ToString("0.000", ic)).Append(" ms / max ")
              .Append(kulkuMsMax.ToString("0.000", ic)).Append(" ms, hinta ka ")
              .Append((kehyksia > 0 ? kehysMsYht / kehyksia : 0).ToString("0.0000", ic)).Append(" ms/kehys (max ")
              .Append(kehysMsMax.ToString("0.000", ic)).Append(" ms, ").Append(kehyksia).Append(" kehystä)");
            foreach (var p in poistot) sb.Append("\n  poistettu: ").Append(p.kuvaus);
            foreach (var p in piirrettavatPiilossa) sb.Append("\n  piilossa mutta piirrettävä: ").Append(p.Key).Append(", ").Append(p.Value).Append(" elementtiä");
            foreach (var k in kirjatutUss) sb.Append("\n  USS-suodin piilossa: ").Append(k);
            return sb.ToString();
        }
    }
}
