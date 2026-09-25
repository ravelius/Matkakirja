using System.Collections.Generic;
using System.Globalization;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja
{
    /// <summary>
    /// ETUSIVUN KONE JA PUNAINEN VIIVA aloitusportin pallon päällä (omistajan löydös 112, WEB ON MALLI MITATTUNA:
    /// proto-3d/lokit/loydos112-etusivupallo/MITAT.md). Webissä kone ja viiva ovat SVG:tä videon päällä
    /// (js/etusivupallo.js piirraHetki 1252–1287); täällä ne piirretään ruututasossa omassa UI Toolkit -paneelissa
    /// (<see cref="Jarjestys"/> 8: pallon päällä, aloitusnäkymän (UiKerros.Traileri 45) ja yläpalkin (15) alla), ja
    /// pisteet projisoidaan joka kehys pallon pinnalta kameran WorldToScreenPoint-projektiolla.
    ///
    /// SUMEA KUTEN WEBISSÄ: portin .start-gate (css/styles.css 7528–7555) sumentaa backdrop-filter: blur(6px):llä
    /// kaiken takanaan, myös SVG:n — Pelikoodarin kuvissa (iphone…-kuva2.png, ipad…-kuva4.png) viiva ja kone ovat
    /// pehmeäreunaisia. Kameran sumennus (PalloSumennus) ei koske UI:ta, joten kerros sumennetaan UI Toolkitin
    /// filtterillä blur(6 pt) (Unity 6.3; Paneeli.asset tuo m_RuntimeGaussianBlurShaderin käännökseen). Terävä versio
    /// vertailuun: komento "etusivu sumennus pois".
    ///
    /// Mitat (EtusivunLento): viiva #c2452f, peitto 0,92 koko viivalle (ryhmäpeitto: Opacity-filtteri, ei nivelten
    /// tuplautumista), pyöreät päät ja nivelet, leveys 11 videopx = 7,2 pt iPhonella / 10,3 pt iPadilla; kone
    /// KONEEN_POLKU täytettynä ja reunaviivalla 1,4 yks. värillä #2e2114, polkuyksikkö 0,752 pt / 1,074 pt, nokka
    /// lentosuuntaan (projektio hetkistä t ja t + 0,12 s kuten web 1264–1274). Jälki katkeaa pallon takapuolella,
    /// kone piiloon takapuolella (web 1256–1263, 1278). Kierroksen sauman häivytys 1,1 s (EtusivunLento.Haivytys) ja
    /// portin vaihto (sisään ja ulos PalloKierto.porttiHaivytysS, 0,4 s) kertautuvat kerroksen peittoon.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class Etusivulento : MonoBehaviour
    {
        /// <summary>Paneelin sortingOrder: pallon päällä, UiKerroksen nimikortin (10), yläpalkin (15) ja aloituksen (45) alla.</summary>
        public const int Jarjestys = 8;

        static readonly Color ViivanVari = new Color32(0xc2, 0x45, 0x2f, 0xff);
        const float ViivanPeitto = 0.92f;
        static readonly Color KoneenVari = new Color32(0x2e, 0x21, 0x14, 0xff);

        /// <summary>Kerros sumennetaan kuten webin portti (komento "etusivu sumennus pois|paalle").</summary>
        public static bool Sumea { get; set; } = true;
        /// <summary>Webin .start-gate blur(6px): keskihajonta pisteinä.</summary>
        public const float SumennusPt = 6f;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() => Sumea = true;

        public PalloKierto kierto;

        /// <summary>Testikomento: tila lokiin tämän kehyksen projektion jälkeen (ei edellisen kehyksen arvoja).</summary>
        public bool KirjaaTila { get; set; }

        UIDocument doc;
        VisualElement kerros, viivaEl, koneEl;
        readonly List<EtusivunLento.Piste> jalki = new List<EtusivunLento.Piste>();
        readonly List<Vector2> viiva = new List<Vector2>();
        readonly List<int> alipolut = new List<int>(); // alipolun ensimmäisen pisteen indeksi viiva-listassa
        Vector2 kone;
        bool koneNakyy;
        float kulmaAste;
        float yksikko = 1f, viivanLeveys = 7f;
        float peitto;
        float asetettuSumennus = -1f;

        void OnDestroy()
        {
            if (doc != null) Destroy(doc.gameObject);
        }

        // LÄMPÖERÄ (PallonLepo): kerros näkyy = kone ja viiva liikkuvat portin kierroksen mukana (portissa pallo on jo
        // hereillä, PalloKierto.Liikkeessa) tai kerros häipyy 0,4 s portin sulkeuduttua. Oma UI Toolkit -paneeli ei
        // kuulu Natiivi-UI:n lepokyselyyn.
        void OnEnable() => PallonLepo.Animoi(Nakyy, "etusivulento");
        void OnDisable() => PallonLepo.Poista(Nakyy);
        bool Nakyy() => peitto > 0f;

        void Luo()
        {
            // Sama pohja kuin UiKerroksella (tuo UI:n ja filttereiden shaderit iOS-käännökseen); skaala 1 = paneelin
            // yksikkö on ruudun pikseli, joten projisoidut pisteet ja mitat ovat suoraan pikseleitä.
            var pohja = Resources.Load<PanelSettings>("MatkakirjaUI/Paneeli");
            var asetukset = pohja != null ? Instantiate(pohja) : ScriptableObject.CreateInstance<PanelSettings>();
            asetukset.name = "Etusivulento";
            var teema = Resources.Load<ThemeStyleSheet>("MatkakirjaUI/Matkakirja");
            if (teema != null) asetukset.themeStyleSheet = teema;
            asetukset.scaleMode = PanelScaleMode.ConstantPixelSize;
            asetukset.scale = 1f;
            asetukset.sortingOrder = Jarjestys;
            asetukset.clearColor = false;

            var go = new GameObject("Etusivulento UI");
            go.SetActive(false);
            doc = go.AddComponent<UIDocument>();
            doc.panelSettings = asetukset;
            go.SetActive(true);
            var juuri = doc.rootVisualElement;
            juuri.pickingMode = PickingMode.Ignore;

            kerros = Taysi(juuri);
            viivaEl = Taysi(kerros);
            viivaEl.generateVisualContent += PiirraViiva;
            koneEl = Taysi(kerros);
            koneEl.generateVisualContent += PiirraKone;
        }

        static VisualElement Taysi(VisualElement isa)
        {
            var e = new VisualElement { pickingMode = PickingMode.Ignore };
            e.style.position = Position.Absolute;
            e.style.left = 0;
            e.style.top = 0;
            e.style.right = 0;
            e.style.bottom = 0;
            isa.Add(e);
            return e;
        }

        void AsetaSuodin(float sumennus)
        {
            if (Mathf.Approximately(sumennus, asetettuSumennus)) return;
            asetettuSumennus = sumennus;
            FilterFunction Blur()
            {
                var f = new FilterFunction(FilterFunctionType.Blur);
                f.AddParameter(new FilterParameter(sumennus));
                return f;
            }
            var ryhmapeitto = new FilterFunction(FilterFunctionType.Opacity);
            ryhmapeitto.AddParameter(new FilterParameter(ViivanPeitto));
            var viivalle = new List<FilterFunction>();
            if (sumennus > 0f) viivalle.Add(Blur());
            viivalle.Add(ryhmapeitto);
            viivaEl.style.filter = viivalle;
            // Ei StyleKeyword.Nonea: UI Toolkit (6.3) kaatuu siihen RenderTreeCompositorissa ("Filter IEnumerable is
            // not a List<FilterFunction>", Natiiviseppä 25.9. simulaattorissa). Null = ei omaa suodinta.
            if (sumennus > 0f) koneEl.style.filter = new List<FilterFunction> { Blur() };
            else koneEl.style.filter = StyleKeyword.Null;
        }

        void LateUpdate()
        {
            if (kierto == null) return;
            bool portissa = kierto.Portissa;
            float haivytysS = Mathf.Max(0.01f, kierto.porttiHaivytysS);
            peitto = Mathf.MoveTowards(peitto, portissa ? 1f : 0f, Time.unscaledDeltaTime / haivytysS);
            if (peitto <= 0f)
            {
                if (kerros != null && kerros.style.display != DisplayStyle.None) kerros.style.display = DisplayStyle.None;
                if (KirjaaTila) { KirjaaTila = false; Debug.Log(Tila()); }
                return;
            }
            if (doc == null) Luo();
            var paneeli = doc.rootVisualElement.panel;
            if (paneeli == null) return;
            if (kerros.style.display != DisplayStyle.Flex) kerros.style.display = DisplayStyle.Flex;

            double t = kierto.PorttiAika;
            kerros.style.opacity = peitto * (float)EtusivunLento.Haivytys(t);

            // Mitat: iOS-piste → pikseli (Pistekerroin) → paneelin yksikkö.
            float kerroin = PalloKierto.Pistekerroin;
            float leveys = doc.rootVisualElement.layout.width;
            float paneeliaPikselissa = leveys > 0f && !float.IsNaN(leveys) ? leveys / Screen.width : 1f;
            double lyhyt = Mathf.Min(Screen.width, Screen.height) / kerroin, pitka = Mathf.Max(Screen.width, Screen.height) / kerroin;
            float pt = kerroin * paneeliaPikselissa;
            yksikko = (float)EtusivunLento.Yksikko(lyhyt, pitka) * pt;
            viivanLeveys = (float)EtusivunLento.ViivanLeveys(lyhyt, pitka) * pt;
            AsetaSuodin(Sumea ? SumennusPt * pt : 0f);

            Projisoi(paneeli, t);
            viivaEl.MarkDirtyRepaint();
            koneEl.MarkDirtyRepaint();
            if (KirjaaTila) { KirjaaTila = false; Debug.Log(Tila()); }
        }

        void Projisoi(IPanel paneeli, double t)
        {
            viiva.Clear();
            alipolut.Clear();
            koneNakyy = false;
            var kamera = kierto.GetComponent<Camera>();
            var geo = kierto.georeferenssi;
            if (kamera == null || geo == null) return;
            var gt = geo.transform;
            Vector3 keskus = gt.TransformPoint((float3)geo.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero));
            Vector3 silma = kamera.transform.position;

            bool Ruudulle(EtusivunLento.Piste p, out Vector2 ulos)
            {
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                    new double3(EtusivunLento.KaariAste(p.Lon), p.Lat, 0.0));
                Vector3 w = gt.TransformPoint((float3)geo.TransformEarthCenteredEarthFixedPositionToUnity(ecef));
                Vector3 r = kamera.WorldToScreenPoint(w);
                // Pallon etupuoli (web nakyy: cos ≥ 1/D): pinnan normaali kohti kameraa.
                bool nakyy = Vector3.Dot(w - keskus, silma - w) > 0f && r.z > 0f;
                ulos = RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(r.x, Screen.height - r.y));
                return nakyy;
            }

            // Jälki: katkeaa takapuolella (web "irti" → uusi M-komento).
            EtusivunLento.JaljenPisteet(t, jalki);
            bool irti = true;
            foreach (var p in jalki)
            {
                if (!Ruudulle(p, out var r)) { irti = true; continue; }
                if (irti) alipolut.Add(viiva.Count);
                viiva.Add(r);
                irti = false;
            }

            // Kone ja suunta (web 1264–1278): suunta projektiosta hetkillä t ja t + 0,12 s; pidossa ennallaan.
            var nyt = EtusivunLento.KoneenTila(t);
            var edella = EtusivunLento.KoneenTila(t + EtusivunLento.SuunnanEdellaS);
            koneNakyy = Ruudulle(new EtusivunLento.Piste(nyt.Lat, nyt.Lon), out kone);
            Ruudulle(new EtusivunLento.Piste(edella.Lat, edella.Lon), out var b);
            var d = b - kone;
            if (d.magnitude > 0.01f * yksikko) kulmaAste = Mathf.Atan2(d.y, d.x) * Mathf.Rad2Deg;
        }

        void PiirraViiva(MeshGenerationContext mgc)
        {
            if (viiva.Count == 0) return;
            var p = mgc.painter2D;
            p.strokeColor = ViivanVari;
            p.fillColor = ViivanVari;
            p.lineWidth = viivanLeveys;
            p.lineCap = LineCap.Round;
            p.lineJoin = LineJoin.Round;
            for (int a = 0; a < alipolut.Count; a++)
            {
                int alku = alipolut[a], loppu = a + 1 < alipolut.Count ? alipolut[a + 1] : viiva.Count;
                // Nollapituiset välit pois (Painter2D ei piirrä niistä pyöreää päätä kuten SVG).
                p.BeginPath();
                p.MoveTo(viiva[alku]);
                var edellinen = viiva[alku];
                int vali = 0;
                for (int i = alku + 1; i < loppu; i++)
                {
                    if ((viiva[i] - edellinen).sqrMagnitude < 0.01f) continue;
                    p.LineTo(viiva[i]);
                    edellinen = viiva[i];
                    vali++;
                }
                if (vali > 0) { p.Stroke(); continue; }
                // Yksi piste: SVG:n pyöreä pää piirtää pisteen (esim. Lontoo kierroksen alussa).
                p.BeginPath();
                p.Arc(viiva[alku], viivanLeveys * 0.5f, Angle.Degrees(0f), Angle.Degrees(360f));
                p.Fill();
            }
        }

        void PiirraKone(MeshGenerationContext mgc)
        {
            if (!koneNakyy) return;
            var p = mgc.painter2D;
            float k = kulmaAste * Mathf.Deg2Rad, c = Mathf.Cos(k), s = Mathf.Sin(k);
            Vector2 Piste(double x, double y) =>
                kone + new Vector2((float)(x * c - y * s) * yksikko, (float)(x * s + y * c) * yksikko);

            // Täyttö (SVG fill: vain suljetut alipolut rajaavat alaa).
            p.fillColor = KoneenVari;
            foreach (var (suljettu, xy) in EtusivunLento.KoneenPolku)
            {
                if (!suljettu) continue;
                p.BeginPath();
                p.MoveTo(Piste(xy[0], xy[1]));
                for (int i = 2; i < xy.Length; i += 2) p.LineTo(Piste(xy[i], xy[i + 1]));
                p.ClosePath();
                p.Fill();
            }
            // Reunaviiva 1,4 yks. (SVG:n oletukset: miter, raja 4, suorat päät).
            p.strokeColor = KoneenVari;
            p.lineWidth = (float)EtusivunLento.KoneenReunaYks * yksikko;
            p.lineJoin = LineJoin.Miter;
            p.miterLimit = 4f;
            p.lineCap = LineCap.Butt;
            foreach (var (suljettu, xy) in EtusivunLento.KoneenPolku)
            {
                p.BeginPath();
                p.MoveTo(Piste(xy[0], xy[1]));
                for (int i = 2; i < xy.Length; i += 2) p.LineTo(Piste(xy[i], xy[i + 1]));
                if (suljettu) p.ClosePath();
                p.Stroke();
            }
        }

        /// <summary>Testikomento "etusivu tila": aika, koneen paikka ja ruutupiste, viivan pisteet ja mitat lokiin.</summary>
        public string Tila()
        {
            double t = kierto != null ? kierto.PorttiAika : 0;
            var k = EtusivunLento.KoneenTila(t);
            var ci = CultureInfo.InvariantCulture;
            float kerroin = PalloKierto.Pistekerroin;
            return string.Format(ci,
                "MATKAKIRJA etusivu: t {0:0.000}/{1:0.000} s, jakso {2} osuus {3:0.000}, kone {4:0.000}, {5:0.000} " +
                "{6} ruudulla ({7:0.0}, {8:0.0}) px kulma {9:0.0}°, viiva {10} pistettä {11} osaa, leveys {12:0.00} pt, " +
                "yksikkö {13:0.000} pt, peitto {14:0.00} × sauma {15:0.00}, sumennus {16}, seis {17}",
                t, EtusivunLento.Kesto, k.Jakso, k.Osuus, k.Lat, EtusivunLento.KaariAste(k.Lon),
                koneNakyy ? "näkyy" : "piilossa", kone.x, kone.y, kulmaAste, viiva.Count, alipolut.Count,
                viivanLeveys / kerroin, yksikko / kerroin, peitto, EtusivunLento.Haivytys(t),
                Sumea ? SumennusPt.ToString("0.#", ci) + " pt" : "pois", PalloKierto.PorttiAikaSeis);
        }
    }
}
