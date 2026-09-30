// ISS-KYTKINPÖYTÄ (Linssiseppä 30.9.2026, Päätoimittajan erä ennen Codexin kuvia): kyydin säätimet alareunan kapeana
// ohjauspöytänä avaruusaluksen kytkimin (IssKytkimet: paikkamerkit, jotka vaihtuvat Codexin kuviin yhdellä muutoksella).
//
//   rivi 1  merkkivalo LIVE (vihreä LIVE, meripihka nopeutettu; napautus nopeutettuna = Palaa LIVE) · lukemanäyttö
//           (rivi 1 = kyydin tietorivi ISS · 429 km · 27 550 km/h, rivi 2 = ylilento tai lennon kohde)
//   rivi 2  NOPEUS kiertokytkin LIVE/10×/100×/1000× · PILVET nuppi · VUODENAIKA nuppi (kuukausi) · KOHDE painike
//           (lista pöydän yläpuolelle) · OMA vipukytkin suojakannella (kansi auki → vipu → lento omaan paikkaan) · SULKU painike
//
// Pöydän leveys ruutu − 24, enintään 560 pt, keskellä; korkeus ~116 pt (iPhone 874 pt: 13 %). Tekstit piirtää peli.
// IssKyytiNakyma omistaa toiminnot ja tilan; tämä on vain kokoonpano (A/B `astro kyyti poyta 0|1`: 0 = entinen välilehtipaneeli).
//
// KERROSTILA (30.9., Päätoimittaja: aito avaruusalusmoduuli Linnanrakentajan Cycles-kerroksista, IssPaneeliKuvat): kun asettelun
// kerrokset ovat Resourcesissa, pöytä on kiinteän kokoinen kytkinryhmä (puhelin 402, tabletti 608 × 168 pt, kapeammalla ruudulla
// skaalattuna): pohja kolmena viipaleena, liikkuvat osat kuvina tilan mukaan (nopeus 4 asentoa, nuppi 24 × 15°, painike ylös/alas,
// vipu ylös/alas, kansi 6 kehystä), moduulit näkymättöminä osuma-aloina sprites.json-ankkureihin ja valokerrokset summattuina
// IssValot-varjostimella yhdeksi RenderTextureksi vain tilan muuttuessa (painot: LIVE vihreä / PALAA meripihka, painettu kirkastuu).
// Ilman kerroksia (tai `astro kyyti kerrokset 0`) kaikki kuten ennen.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IssKytkinpoyta
    {
        public readonly IssKytkimet.Pohja Juuri;
        public readonly IssKytkimet.Merkkivalo Live;
        public readonly IssKytkimet.Lukema Lukema;
        public readonly IssKytkimet.Kiertokytkin Nopeus;
        public readonly IssKytkimet.Nuppi Pilvet, Vuodenaika;
        public readonly IssKytkimet.Painike Kohde, Sulku;
        public readonly IssKytkimet.Vipu Oma;

        public const float PoytaEnintaan = 560f;

        readonly VisualElement ylarivi, saatimet;
        readonly IssKytkimet.Kytkin[] moduulit;
        readonly string[] osaNimet = { "live", "lukema", "nopeus", "pilvet", "kuukausi", "kohde", "oma", "poistu" };

        public IssKytkinpoyta(VisualElement isa, Action<int> nopeus, Action<float> pilvet, Action<float> kuukausi,
            Action kohde, Action oma, Action sulku, Action palaaLive)
        {
            Juuri = new IssKytkimet.Pohja { name = "IssKytkinpoyta" };
            var s = Juuri.style;
            s.position = Position.Absolute; s.bottom = 8;
            s.paddingLeft = 10; s.paddingRight = 10; s.paddingTop = 8; s.paddingBottom = 6;
            isa.Add(Juuri);

            ylarivi = new VisualElement { pickingMode = PickingMode.Ignore };
            ylarivi.style.flexDirection = FlexDirection.Row; ylarivi.style.alignItems = Align.Center; ylarivi.style.marginBottom = 14;
            Juuri.Add(ylarivi);
            Live = new IssKytkimet.Merkkivalo("LIVE");
            Live.AddManipulator(new Clickable(() => palaaLive?.Invoke()));
            ylarivi.Add(Live);
            Lukema = new IssKytkimet.Lukema();
            Lukema.style.flexGrow = 1; Lukema.style.marginLeft = 6;
            ylarivi.Add(Lukema);

            saatimet = new VisualElement { pickingMode = PickingMode.Ignore };
            saatimet.style.flexDirection = FlexDirection.Row; saatimet.style.justifyContent = Justify.SpaceBetween;
            Juuri.Add(saatimet);
            string[] kertoimet = new string[Matkakirja.Linssit.Iss.Simukello.Nopeudet.Length];
            for (int i = 0; i < kertoimet.Length; i++)
                kertoimet[i] = Matkakirja.Linssit.Iss.Simukello.Nopeudet[i] == 1 ? "LIVE" : Matkakirja.Linssit.Iss.Simukello.Nopeudet[i] + "×";
            Nopeus = new IssKytkimet.Kiertokytkin("NOPEUS", kertoimet, i => nopeus?.Invoke(Matkakirja.Linssit.Iss.Simukello.Nopeudet[i]));
            Pilvet = new IssKytkimet.Nuppi("PILVET", 0f, 1f, v => pilvet?.Invoke(v));
            Vuodenaika = new IssKytkimet.Nuppi("KUUKAUSI", 1f, 12f, v => kuukausi?.Invoke(v), kokonaisluku: true);
            Kohde = new IssKytkimet.Painike("KOHDE", "LENNÄ", () => kohde?.Invoke());
            Oma = new IssKytkimet.Vipu("OMA PAIKKA", () => oma?.Invoke());
            Sulku = new IssKytkimet.Painike("POISTU", "×", () => sulku?.Invoke(), leveys: 52f);   // ✕ puuttuu fontista (□)
            foreach (var m in new VisualElement[] { Nopeus, Pilvet, Vuodenaika, Kohde, Oma, Sulku }) saatimet.Add(m);
            moduulit = new IssKytkimet.Kytkin[] { Live, Lukema, Nopeus, Pilvet, Vuodenaika, Kohde, Oma, Sulku };
            foreach (var m in moduulit) m.Muuttui += () => { if (asettelu != null) PaivitaKerrokset(); };
        }

        /// <summary>Leveys ja keskitys turva-alueen leveydestä (ruutu − 24, enintään 560 pt).</summary>
        public void Asettele(float turvanLeveys)
        {
            if (!(turvanLeveys > 0)) return;
            poytaLeveys = turvanLeveys;
            string a = IssPaneeliKuvat.Asettelu(turvanLeveys);
            if (!IssPaneeliKuvat.Paikalla(a)) a = null;
            if (a != asettelu) { if (asettelu != null) PurraKerrokset(); if (a != null) RakennaKerrokset(a); }
            if (asettelu != null)
            {
                var g = IssPaneeliKuvat.Ryhma(asettelu);
                float k = Mathf.Min(1f, turvanLeveys / g.x);
                Juuri.style.width = g.x; Juuri.style.height = g.y;
                Juuri.style.left = (turvanLeveys - g.x) * 0.5f;
                Juuri.style.scale = new Scale(new Vector3(k, k, 1f));
                return;
            }
            float w = Mathf.Min(PoytaEnintaan, turvanLeveys - 24f);
            Juuri.style.width = w;
            Juuri.style.left = (turvanLeveys - w) * 0.5f;
        }

        // ---------------- Kerrostila ----------------
        string asettelu;
        VisualElement kerrosPohja, valot, legendat;
        readonly Dictionary<IssKytkimet.Kytkin, VisualElement> osat = new Dictionary<IssKytkimet.Kytkin, VisualElement>();
        VisualElement kansi;
        RenderTexture valoRt;
        Material valoMat;
        Vector4 painotA = new Vector4(-1, 0, 0, 0), painotB;
        IVisualElementScheduledItem pulssi;
        static readonly string[] ValoJarjestys = { "avain", "paneeli", "live-vihrea", "live-meripihka", "kohde", "poistu" };

        /// <summary>Pöydän näkyvän yläreunan etäisyys Juuren yläreunasta (pt, skaalattuna): renderin kupu alkaa y 36:sta.</summary>
        public float YlaReuna => asettelu != null && IssPaneeliKuvat.Osa(asettelu, "kupu") is Rect k
            ? k.yMin * Mathf.Min(1f, poytaLeveys / IssPaneeliKuvat.Ryhma(asettelu).x) : 0f;
        float poytaLeveys = 1e6f;

        /// <summary>Kerrostilan asettelu (puhelin | tabletti) tai null (paikkamerkit / kehys).</summary>
        public string Asettelu => asettelu;

        static VisualElement Kuvakerros(VisualElement isa, Rect r, string nimi)
        {
            var e = new VisualElement { name = nimi, pickingMode = PickingMode.Ignore };
            var s = e.style;
            s.position = Position.Absolute; s.left = r.x; s.top = r.y; s.width = r.width; s.height = r.height;
            isa.Add(e);
            return e;
        }

        static void AsetaKuva(VisualElement e, Texture2D t)
        {
            if (e == null) return;
            e.style.backgroundImage = t != null ? new StyleBackground(t) : new StyleBackground(StyleKeyword.None);
        }

        /// <summary>Skaala (px/pt) kuvasta: puhelin @3x, tabletti @2x.</summary>
        float Skaala => asettelu == "puhelin" ? 3f : 2f;

        void RakennaKerrokset(string a)
        {
            asettelu = a;
            var g = IssPaneeliKuvat.Ryhma(a);
            var s = Juuri.style;
            s.paddingLeft = 0; s.paddingRight = 0; s.paddingTop = 0; s.paddingBottom = 0;
            s.transformOrigin = new TransformOrigin(Length.Percent(50), Length.Percent(100), 0);
            Juuri.Kerros = true;

            // Pohja: vasen + keski (64 px, toistuu) + oikea, vain paikallaan pysyvät osat.
            kerrosPohja = new VisualElement { name = "IssPaneeliPohja", pickingMode = PickingMode.Ignore };
            kerrosPohja.style.position = Position.Absolute; kerrosPohja.style.left = 0; kerrosPohja.style.top = 0;
            kerrosPohja.style.width = g.x; kerrosPohja.style.height = g.y; kerrosPohja.style.flexDirection = FlexDirection.Row;
            Juuri.Insert(0, kerrosPohja);
            var vasen = IssPaneeliKuvat.Kuva(a, "pohja-vasen"); var keski = IssPaneeliKuvat.Kuva(a, "pohja-keski");
            var oikea = IssPaneeliKuvat.Kuva(a, "pohja-oikea");
            foreach (var (t, kasvaa) in new[] { (vasen, false), (keski, true), (oikea, false) })
            {
                if (t == null) continue;
                var v = new VisualElement { pickingMode = PickingMode.Ignore };
                v.style.height = g.y;
                if (kasvaa)
                {
                    v.style.flexGrow = 1;
                    v.style.backgroundRepeat = new BackgroundRepeat(Repeat.Repeat, Repeat.NoRepeat);
                    v.style.backgroundSize = new BackgroundSize(t.width / Skaala, g.y);
                }
                else v.style.width = t.width / Skaala;
                AsetaKuva(v, t);
                kerrosPohja.Add(v);
            }

            // Moduulit osuma-aloiksi ankkureihin (≥ 48 × 48 pt), liikkuva osa kuvana osan laatikkoon.
            ylarivi.style.display = DisplayStyle.None; saatimet.style.display = DisplayStyle.None;
            for (int i = 0; i < moduulit.Length; i++)
            {
                var m = moduulit[i];
                var r = IssPaneeliKuvat.Osa(a, osaNimet[i]);
                if (!r.HasValue) { m.style.display = DisplayStyle.None; continue; }
                var o = r.Value;
                var osuma = m is IssKytkimet.Lukema ? o
                    : Rect.MinMaxRect(Mathf.Min(o.xMin, o.center.x - 24f), Mathf.Min(o.yMin, o.center.y - 24f),
                                      Mathf.Max(o.xMax, o.center.x + 24f), Mathf.Max(o.yMax, o.center.y + 24f));
                Juuri.Add(m);
                m.Kerros = true;
                var ms = m.style;
                ms.position = Position.Absolute; ms.left = osuma.x; ms.top = osuma.y; ms.width = osuma.width; ms.height = osuma.height;
                ms.minHeight = 0; ms.marginLeft = 0; ms.marginRight = 0; ms.marginTop = 0; ms.marginBottom = 0;
                ms.justifyContent = Justify.FlexEnd;
                if (m == Live) Sijoita(Live.Nimi, IssPaneeliKuvat.Osa(a, "live-otsikko"), osuma);
                if (m is IssKytkimet.Lukema || m is IssKytkimet.Merkkivalo) continue;
                // Pelin tekstit renderin paikkoihin: otsikko kehyksen yläkatkokseen (<osa>-otsikko), arvo/legenda levylle (<osa>-levy).
                if (m is IssKytkimet.Saadin sd)
                {
                    Sijoita(sd.Otsikko, IssPaneeliKuvat.Osa(a, osaNimet[i] + "-otsikko"), osuma);
                    Sijoita(sd.Arvo, IssPaneeliKuvat.Osa(a, osaNimet[i] + "-levy"), osuma);
                }
                var paikka = new Rect(o.x - osuma.x, o.y - osuma.y, o.width, o.height);
                osat[m] = Kuvakerros(m, paikka, "osa-" + osaNimet[i]);
                osat[m].SendToBack();
                if (m == Oma)
                {
                    var kr = IssPaneeliKuvat.Osa(a, "oma-kaari") ?? IssPaneeliKuvat.Osa(a, "oma-kansi") ?? o;
                    kansi = Kuvakerros(m, new Rect(kr.x - osuma.x, kr.y - osuma.y, kr.width, kr.height), "osa-kansi");
                }
            }

            // Valot päällimmäisenä: summa RT:hen (puolikoko) + legendat omana kerroksena (hellä pulssi).
            valot = Kuvakerros(Juuri, new Rect(0, 0, g.x, g.y), "IssPaneeliValot");
            var leg = IssPaneeliKuvat.Kuva(a, "valo-legendat");
            if (leg != null)
            {
                legendat = Kuvakerros(Juuri, new Rect(0, 0, g.x, g.y), "IssPaneeliLegendat");
                AsetaKuva(legendat, leg);
                if (IssPaneeliKuvat.LegendaPulssi)
                    pulssi = legendat.schedule.Execute(() =>
                        legendat.style.opacity = 0.9f + 0.1f * Mathf.Sin(Time.unscaledTime * (2f * Mathf.PI / 3f))).Every(100);
            }
            painotA = new Vector4(-1, 0, 0, 0);
            PaivitaKerrokset();
        }

        // Tekstin alkuperäinen sijoittelu (palautus kerrostilasta kehykseen).
        readonly Dictionary<Label, (StyleEnum<Position>, StyleLength, StyleLength, StyleLength, StyleLength, StyleLength, StyleLength)> tekstit =
            new Dictionary<Label, (StyleEnum<Position>, StyleLength, StyleLength, StyleLength, StyleLength, StyleLength, StyleLength)>();

        void Sijoita(Label l, Rect? r, Rect osuma)
        {
            if (l == null || !r.HasValue) return;
            var s = l.style;
            if (!tekstit.ContainsKey(l)) tekstit[l] = (s.position, s.left, s.top, s.right, s.bottom, s.width, s.height);
            var v = r.Value;
            s.position = Position.Absolute; s.left = v.x - osuma.x; s.top = v.y - osuma.y; s.width = v.width; s.height = v.height;
            s.right = StyleKeyword.Null; s.bottom = StyleKeyword.Null;
            s.unityTextAlign = TextAnchor.MiddleCenter;
        }

        void PurraKerrokset()
        {
            foreach (var t in tekstit)
            {
                var s = t.Key.style; var o = t.Value;
                s.position = o.Item1; s.left = o.Item2; s.top = o.Item3; s.right = o.Item4; s.bottom = o.Item5; s.width = o.Item6; s.height = o.Item7;
            }
            tekstit.Clear();
            pulssi?.Pause(); pulssi = null;
            kerrosPohja?.RemoveFromHierarchy(); valot?.RemoveFromHierarchy(); legendat?.RemoveFromHierarchy();
            foreach (var e in osat.Values) e.RemoveFromHierarchy();
            kansi?.RemoveFromHierarchy();
            osat.Clear(); kerrosPohja = valot = legendat = kansi = null;
            Juuri.Kerros = false;
            Juuri.style.height = StyleKeyword.Null; Juuri.style.scale = StyleKeyword.Null;
            Juuri.style.paddingLeft = 10; Juuri.style.paddingRight = 10; Juuri.style.paddingTop = 8; Juuri.style.paddingBottom = 6;
            ylarivi.style.display = DisplayStyle.Flex; saatimet.style.display = DisplayStyle.Flex;
            ylarivi.Add(Live); ylarivi.Add(Lukema);
            foreach (var m in new IssKytkimet.Kytkin[] { Nopeus, Pilvet, Vuodenaika, Kohde, Oma, Sulku }) saatimet.Add(m);
            foreach (var m in moduulit)
            {
                m.Kerros = false;
                var ms = m.style;
                ms.position = StyleKeyword.Null; ms.left = StyleKeyword.Null; ms.top = StyleKeyword.Null; ms.height = StyleKeyword.Null;
                ms.display = StyleKeyword.Null; ms.justifyContent = StyleKeyword.Null; ms.minHeight = StyleKeyword.Null;
            }
            Nopeus.style.width = 62; Pilvet.style.width = 62; Vuodenaika.style.width = 62; Kohde.style.width = 62; Oma.style.width = 62;
            Sulku.style.width = 52; Live.style.width = 44; Live.style.height = 36; Lukema.style.width = StyleKeyword.Null; Lukema.style.marginLeft = 6;
            if (valoRt != null) { valoRt.Release(); UnityEngine.Object.Destroy(valoRt); valoRt = null; }
            asettelu = null;
        }

        /// <summary>Liikkuvien osien kehykset ja valopainot tilasta; valosumma piirretään vain painojen muuttuessa.</summary>
        void PaivitaKerrokset()
        {
            string a = asettelu;
            string[] nopeusKulmat = { "0", "1", "2", "3" };
            if (osat.TryGetValue(Nopeus, out var on))
                AsetaKuva(on, IssPaneeliKuvat.Kuva(a, "osa-nopeus-" + nopeusKulmat[Mathf.Clamp(Nopeus.Asento, 0, 3)]));
            foreach (var n in new[] { Pilvet, Vuodenaika })
                if (osat.TryGetValue(n, out var e)) AsetaKuva(e, IssPaneeliKuvat.Kuva(a, "osa-nuppi-" + IssPaneeliKuvat.NupinKehys(n.Kulma).ToString("00")));
            foreach (var p in new[] { Kohde, Sulku })
                if (osat.TryGetValue(p, out var e)) AsetaKuva(e, IssPaneeliKuvat.Kuva(a, p.Painettu ? "osa-painike-alas" : "osa-painike-ylos"));
            if (osat.TryGetValue(Oma, out var ov)) AsetaKuva(ov, IssPaneeliKuvat.Kuva(a, Oma.Alhaalla ? "osa-vipu-alas" : "osa-vipu-ylos"));
            AsetaKuva(kansi, IssPaneeliKuvat.Kuva(a, "osa-kansi-" + Oma.KansiKehys));

            bool live = Live.Tila == IssKytkimet.Tila.Aktiivinen;
            float Nappi(IssKytkimet.Painike p) => p.Tila == IssKytkimet.Tila.Pois ? 0f : p.Painettu || p.Tila == IssKytkimet.Tila.Aktiivinen ? 1f : 0.55f;
            var uA = new Vector4(1f, 1f, live && !Live.Meripihka ? 1f : 0f, live && Live.Meripihka ? 1f : 0f);
            var uB = new Vector4(Nappi(Kohde), Nappi(Sulku), 0f, 0f);
            if (uA == painotA && uB == painotB && valoRt != null && valoRt.IsCreated()) return;
            painotA = uA; painotB = uB;
            PiirraValot();
        }

        void PiirraValot()
        {
            Texture2D mitta = null;
            foreach (var n in ValoJarjestys) { mitta = IssPaneeliKuvat.Kuva(asettelu, "valo-" + n); if (mitta != null) break; }
            if (mitta == null || valot == null) return;
            if (valoMat == null)
            {
                var sh = Resources.Load<Shader>("Varjostimet/IssValot");
                if (sh == null) { Debug.LogWarning("MATKAKIRJA iss-paneeli: IssValot-varjostin puuttuu"); return; }
                valoMat = new Material(sh) { name = "IssValot", hideFlags = HideFlags.HideAndDontSave };
            }
            // Puolikoko suhteessa pöydän pisteisiin (valot ovat pehmeitä): tabletti 1 px/pt, puhelin 1,5 px/pt.
            var g = IssPaneeliKuvat.Ryhma(asettelu);
            int w = Mathf.Max(8, Mathf.RoundToInt(g.x * Skaala * 0.5f)), h = Mathf.Max(8, Mathf.RoundToInt(g.y * Skaala * 0.5f));
            if (valoRt == null || valoRt.width != w || valoRt.height != h || !valoRt.IsCreated())
            {
                if (valoRt != null) { valoRt.Release(); UnityEngine.Object.Destroy(valoRt); }
                valoRt = new RenderTexture(new RenderTextureDescriptor(w, h, UnityEngine.Experimental.Rendering.GraphicsFormat.R8G8B8A8_SRGB, 0)
                    { useMipMap = false, autoGenerateMips = false })
                    { name = "IssValot", filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp, hideFlags = HideFlags.HideAndDontSave };
                valoRt.Create();
                valot.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(valoRt));
            }
            for (int i = 0; i < ValoJarjestys.Length; i++)
                valoMat.SetTexture("_Valo" + i, (Texture)IssPaneeliKuvat.Kuva(asettelu, "valo-" + ValoJarjestys[i]) ?? Texture2D.blackTexture);
            // Puuttuva kerros painoon 0 (musta tekstuuri alfa 0 ei muuta mitään, mutta säästää näytteen).
            var pa = painotA; var pb = painotB;
            for (int i = 0; i < ValoJarjestys.Length; i++)
                if (IssPaneeliKuvat.Kuva(asettelu, "valo-" + ValoJarjestys[i]) == null) { if (i < 4) pa[i] = 0; else pb[i - 4] = 0; }
            valoMat.SetVector("_PainotA", pa); valoMat.SetVector("_PainotB", pb);
            Graphics.Blit(null, valoRt, valoMat);
            valot.MarkDirtyRepaint();
            Piirretty++;
        }

        /// <summary>Valosumman piirtokerrat (testikomento: todistaa, ettei piirretä joka ruutu).</summary>
        public int Piirretty { get; private set; }
    }
}
