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

        /// <summary>Leveys ja keskitys turva-alueen leveydestä (ruutu − 24, enintään 560 pt). Kerrostilassa pöytä on koko
        /// leveydeltä ja jatkuu alareunan turvavälin (alaReuna pt) yli ruudun reunaan (Päätoimittaja: konsoli jatkuu alas).</summary>
        public void Asettele(float turvanLeveys, float alaReuna = float.NaN)
        {
            if (!(turvanLeveys > 0)) return;
            poytaLeveys = turvanLeveys;
            if (!float.IsNaN(alaReuna)) this.alaReuna = alaReuna;
            // Asettelu laitteen lyhyemmästä sivusta: puhelin vaakana käyttää puhelimen @3x-kerroksia (ei tabletin @2x).
            string a = IssPaneeliKuvat.Asettelu(RuudunKorkeus > 1f ? Mathf.Min(turvanLeveys, RuudunKorkeus) : turvanLeveys);
            if (!IssPaneeliKuvat.Paikalla(a)) a = null;
            if (a != asettelu) { if (asettelu != null) PurraKerrokset(); if (a != null) RakennaKerrokset(a); }
            if (asettelu != null)
            {
                var g = IssPaneeliKuvat.Ryhma(asettelu);
                // Ryhmä saa ylittää ruudun 8 pt kummaltakin puolelta (puhelimen olkapäät); kapeammalla ruudulla skaalataan.
                // VAAKA (omistaja 30.9. ilta: "vaakanäkymässä napit vievät liikaa tilaa. ota alhaalta turhat pois ja laske nappeja
                // alemmas"): pöytä rajataan kuvun alareunaan (säleikkökaista ja alakehys pois, overflow hidden) ja skaalataan
                // enintään 24 %:iin ruudun korkeudesta; napit ruudun alareunassa (bottom −alaReuna). Osuma-alat ovat kerroksissa
                // vähintään 64 pt, jolloin skaalattunakin ≥ 44 pt.
                bool vaaka = RuudunKorkeus > 1f && turvanLeveys > RuudunKorkeus;
                float korkeus = g.y;
                if (vaaka && IssPaneeliKuvat.Osa(asettelu, "kupu") is Rect kupu) korkeus = Mathf.Min(g.y, kupu.yMax + 2f);
                float k = Mathf.Min(1f, turvanLeveys / (g.x - 16f));
                if (vaaka) k = Mathf.Min(k, 0.24f * RuudunKorkeus / korkeus);
                skaala = k;
                Juuri.style.overflow = vaaka ? Overflow.Hidden : Overflow.Visible;
                float w = Mathf.Max(turvanLeveys / k, g.x);
                Juuri.style.width = w; Juuri.style.height = korkeus;
                Juuri.style.left = (turvanLeveys - w) * 0.5f;
                Juuri.style.bottom = -this.alaReuna;
                Juuri.style.scale = new Scale(new Vector3(k, k, 1f));
                ryhmaEl.style.left = (w - g.x) * 0.5f;
                return;
            }
            float lw = Mathf.Min(PoytaEnintaan, turvanLeveys - 24f);
            Juuri.style.width = lw;
            Juuri.style.left = (turvanLeveys - lw) * 0.5f;
        }

        // ---------------- Kerrostila (Linnanrakentajan v1) ----------------
        string asettelu;
        float poytaLeveys = 1e6f, alaReuna;
        VisualElement kerrosPohja, ryhmaEl, tekstiEl, valot, legendat;
        readonly Dictionary<IssKytkimet.Kytkin, VisualElement> osat = new Dictionary<IssKytkimet.Kytkin, VisualElement>();
        VisualElement kaari;
        RenderTexture valoRt;
        Material valoMat;
        Vector4 painotA = new Vector4(-1, 0, 0, 0), painotB;
        bool legendaMeripihka;
        IVisualElementScheduledItem pulssi;
        /// <summary>Painikkeen valo levossa: v1-simulaattorikuvassa 0,55 peitti legendan (LENNÄ/POISTU) → hehku vain vihjeenä.</summary>
        const float LepoValo = 0.15f;
        static readonly string[] ValoJarjestys = { "paneeli", "live-vihrea", "live-meripihka", "kohde", "poistu" };

        /// <summary>Kerrostilan asettelu (puhelin | tabletti) tai null (paikkamerkit / kehys).</summary>
        public string Asettelu => asettelu;

        /// <summary>Pöydän näkyvän yläreunan (kupu) etäisyys Juuren yläreunasta (pt, skaalattuna).</summary>
        /// <summary>Ruudun (juuren) korkeus pt; asettaja IssKyytiNakyma ennen Asettelea.</summary>
        public float RuudunKorkeus;

        public float YlaReuna => asettelu != null && IssPaneeliKuvat.Osa(asettelu, "kupu") is Rect k
            ? Mathf.Max(0f, k.yMin) * skaala : 0f;
        float skaala = 1f;

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

        /// <summary>Skaala (px/pt): puhelin @3x, tabletti @2x.</summary>
        float Skaala => asettelu == "puhelin" ? 3f : 2f;

        /// <summary>Moduulin kuvakehysten avain (osat.<kehys>) ja siirto: nuppi on renderöity PILVET-paikalle.</summary>
        (string kehys, Vector2 siirto) KuvanKehys(IssKytkimet.Kytkin m)
        {
            if (m == Nopeus) return ("nopeus-0", Vector2.zero);
            if (m == Pilvet) return ("nuppi-00", Vector2.zero);
            if (m == Vuodenaika)
            {
                var p = IssPaneeliKuvat.Osa(asettelu, "pilvet"); var k = IssPaneeliKuvat.Osa(asettelu, "kuukausi");
                return ("nuppi-00", p.HasValue && k.HasValue ? k.Value.center - p.Value.center : Vector2.zero);
            }
            if (m == Kohde) return ("kohde-ylos", Vector2.zero);
            if (m == Sulku) return ("poistu-ylos", Vector2.zero);
            if (m == Oma) return ("vipu-ylos", Vector2.zero);
            return (null, Vector2.zero);
        }

        void RakennaKerrokset(string a)
        {
            asettelu = a;
            var g = IssPaneeliKuvat.Ryhma(a);
            var s = Juuri.style;
            s.paddingLeft = 0; s.paddingRight = 0; s.paddingTop = 0; s.paddingBottom = 0;
            s.transformOrigin = new TransformOrigin(Length.Percent(50), Length.Percent(100), 0);
            Juuri.Kerros = true;

            // Pohja koko leveydeltä: vasen pääty + keski (64 px, toistuu) + oikea pääty.
            kerrosPohja = new VisualElement { name = "IssPaneeliPohja", pickingMode = PickingMode.Ignore };
            kerrosPohja.style.position = Position.Absolute; kerrosPohja.style.left = 0; kerrosPohja.style.right = 0;
            kerrosPohja.style.top = 0; kerrosPohja.style.bottom = 0; kerrosPohja.style.flexDirection = FlexDirection.Row;
            Juuri.Insert(0, kerrosPohja);
            float paaty = IssPaneeliKuvat.Paaty(a);
            foreach (var (nimi, kasvaa) in new[] { ("pohja-vasen", false), ("pohja-keski", true), ("pohja-oikea", false) })
            {
                var t = IssPaneeliKuvat.Kuva(a, nimi);
                if (t == null) continue;
                var v = new VisualElement { pickingMode = PickingMode.Ignore };
                v.style.height = g.y; v.style.flexShrink = 0;
                if (kasvaa)
                {
                    v.style.flexGrow = 1;
                    v.style.backgroundRepeat = new BackgroundRepeat(Repeat.Repeat, Repeat.NoRepeat);
                    v.style.backgroundSize = new BackgroundSize(t.width / Skaala, g.y);
                }
                else v.style.width = paaty;
                AsetaKuva(v, t);
                kerrosPohja.Add(v);
            }

            // Ryhmä keskellä: kuva, moduulit osuma-aloina (≥ 48 × 48 pt) liikkuvine osineen, valot, tekstit päällimmäisenä.
            ryhmaEl = Kuvakerros(Juuri, new Rect(0, 0, g.x, g.y), "IssPaneeliRyhma");
            AsetaKuva(ryhmaEl, IssPaneeliKuvat.Kuva(a, "ryhma"));
            ylarivi.style.display = DisplayStyle.None; saatimet.style.display = DisplayStyle.None;
            var sijoitettavat = new List<(Label, Rect?, bool)>();
            for (int i = 0; i < moduulit.Length; i++)
            {
                var m = moduulit[i];
                var r = IssPaneeliKuvat.Osa(a, osaNimet[i]);
                if (!r.HasValue) { m.style.display = DisplayStyle.None; continue; }
                var o = r.Value;
                var osuma = m is IssKytkimet.Lukema ? o
                    : Rect.MinMaxRect(Mathf.Min(o.xMin, o.center.x - 32f), Mathf.Min(o.yMin, o.center.y - 32f),
                                      Mathf.Max(o.xMax, o.center.x + 32f), Mathf.Max(o.yMax, o.center.y + 32f));   // 64 pt: vaakaskaalassa ≥ 44
                ryhmaEl.Add(m);
                m.Kerros = true;
                var ms = m.style;
                ms.position = Position.Absolute; ms.left = osuma.x; ms.top = osuma.y; ms.width = osuma.width; ms.height = osuma.height;
                ms.minHeight = 0; ms.marginLeft = 0; ms.marginRight = 0; ms.marginTop = 0; ms.marginBottom = 0;
                if (m is IssKytkimet.Saadin sd)
                {
                    sd.Otsikko.style.display = DisplayStyle.None;   // painettu kuvaan
                    if (sd.Arvo != null) sijoitettavat.Add((sd.Arvo, IssPaneeliKuvat.Osa(a, osaNimet[i] + "-levy"), true));
                }
                if (m == Live) { Live.Nimi.style.display = DisplayStyle.None; continue; }
                if (m == Lukema) { sijoitettavat.Add((Lukema.Rivi1, o, false)); sijoitettavat.Add((Lukema.Rivi2, o, false)); continue; }
                var (kehys, siirto) = KuvanKehys(m);
                var kr = (kehys != null ? IssPaneeliKuvat.Kehys(a, kehys) : null) ?? o;
                kr.position += siirto;
                osat[m] = Kuvakerros(m, new Rect(kr.x - osuma.x, kr.y - osuma.y, kr.width, kr.height), "osa-" + osaNimet[i]);
                osat[m].SendToBack();
                if (m == Oma)
                {
                    var ka = IssPaneeliKuvat.Kehys(a, "kaari-0") ?? kr;
                    kaari = Kuvakerros(m, new Rect(ka.x - osuma.x, ka.y - osuma.y, ka.width, ka.height), "osa-kaari");
                }
            }

            valot = Kuvakerros(ryhmaEl, new Rect(0, 0, g.x, g.y), "IssPaneeliValot");
            legendat = Kuvakerros(ryhmaEl, new Rect(0, 0, g.x, g.y), "IssPaneeliLegendat");
            if (IssPaneeliKuvat.LegendaPulssi)
                pulssi = legendat.schedule.Execute(() =>
                    legendat.style.opacity = 0.9f + 0.1f * Mathf.Sin(Time.unscaledTime * (2f * Mathf.PI / 3f))).Every(100);
            tekstiEl = Kuvakerros(ryhmaEl, new Rect(0, 0, g.x, g.y), "IssPaneeliTekstit");
            foreach (var (l, r, kilpi) in sijoitettavat) Sijoita(l, r, kilpi);
            // Lukeman kaksi riviä pinoon näytön sisään.
            if (Lukema.Rivi1.parent != null && IssPaneeliKuvat.Osa(a, "lukema") is Rect lr)
            {
                var laatikko = Kuvakerros(tekstiEl, lr, "IssPaneeliLukema");
                laatikko.style.justifyContent = Justify.Center; laatikko.style.paddingLeft = 6; laatikko.style.paddingRight = 6;
                foreach (var l in new[] { Lukema.Rivi1, Lukema.Rivi2 })
                {
                    l.style.position = Position.Relative; l.style.left = StyleKeyword.Null; l.style.top = StyleKeyword.Null;
                    l.style.width = StyleKeyword.Null; l.style.height = StyleKeyword.Null; l.style.unityTextAlign = TextAnchor.MiddleLeft;
                    laatikko.Add(l);
                }
                Lukema.Rivi1.style.fontSize = 9f; Lukema.Rivi2.style.fontSize = 7.5f;
            }
            painotA = new Vector4(-1, 0, 0, 0);
            PaivitaKerrokset();
        }

        // Tekstien alkuperäinen paikka ja tyyli (palautus kerrostilasta kehykseen).
        readonly List<(Label l, VisualElement isa, int ix, StyleEnum<Position> pos, StyleLength left, StyleLength top, StyleLength right,
            StyleLength bottom, StyleLength width, StyleLength height, StyleLength koko, StyleColor vari, StyleEnum<TextAnchor> tasaus, StyleEnum<DisplayStyle> nakyvyys)> tekstit =
            new List<(Label, VisualElement, int, StyleEnum<Position>, StyleLength, StyleLength, StyleLength, StyleLength, StyleLength, StyleLength, StyleLength, StyleColor, StyleEnum<TextAnchor>, StyleEnum<DisplayStyle>)>();

        static readonly Color TarraTausta = new Color(0.07f, 0.07f, 0.08f, 0.94f), TarraTeksti = new Color(0.95f, 0.95f, 0.92f);

        /// <summary>Teksti päällimmäiseen kerrokseen laatikkoonsa; kilpi = tarrakirjoittimen nauha levyn keskelle.</summary>
        void Sijoita(Label l, Rect? r, bool kilpi)
        {
            if (l == null || !r.HasValue) return;
            var s = l.style;
            tekstit.Add((l, l.parent, l.parent?.IndexOf(l) ?? -1, s.position, s.left, s.top, s.right, s.bottom, s.width, s.height,
                s.fontSize, s.color, s.unityTextAlign, s.display));
            if (!kilpi) return;   // lukeman rivit sijoitetaan pinona (RakennaKerrokset)
            var v = r.Value;
            var levy = Kuvakerros(tekstiEl, v, "kilpi");
            levy.style.alignItems = Align.Center; levy.style.justifyContent = Justify.Center; levy.style.overflow = Overflow.Visible;
            levy.Add(l);
            s.position = Position.Relative; s.left = StyleKeyword.Null; s.top = StyleKeyword.Null; s.right = StyleKeyword.Null;
            s.bottom = StyleKeyword.Null; s.width = StyleKeyword.Null; s.height = StyleKeyword.Null;
            s.display = DisplayStyle.Flex;
            s.color = TarraTeksti; s.unityTextAlign = TextAnchor.MiddleCenter;
            s.backgroundColor = TarraTausta;
            s.paddingLeft = 3; s.paddingRight = 3; s.paddingTop = 0.5f; s.paddingBottom = 0.5f;
            s.borderTopLeftRadius = 1.2f; s.borderTopRightRadius = 1.2f; s.borderBottomLeftRadius = 1.2f; s.borderBottomRightRadius = 1.2f;
            s.letterSpacing = 0.5f; s.whiteSpace = WhiteSpace.NoWrap;
            s.textShadow = new TextShadow { offset = new Vector2(0f, 0.6f), blurRadius = 0f, color = new Color(0f, 0f, 0f, 0.8f) };
            s.maxWidth = v.width + 10f;
            SovitaKilpi(l);
            l.RegisterCallback<ChangeEvent<string>>(SovitaKilpiTapahtuma);
        }

        static void SovitaKilpiTapahtuma(ChangeEvent<string> e) => SovitaKilpi((Label)e.target);

        /// <summary>Kilven fonttikoko tekstin pituudesta (ei ellipsiä: UITK katkaisee vaikka mahtuisi).</summary>
        static void SovitaKilpi(Label l)
        {
            int n = l.text?.Length ?? 0;
            l.style.fontSize = n <= 7 ? 6.5f : n <= 10 ? 5.6f : n <= 14 ? 4.8f : 4.2f;
        }

        void PurraKerrokset()
        {
            pulssi?.Pause(); pulssi = null;
            for (int i = tekstit.Count - 1; i >= 0; i--)
            {
                var t = tekstit[i]; var s = t.l.style;
                t.l.UnregisterCallback<ChangeEvent<string>>(SovitaKilpiTapahtuma);
                if (t.isa != null) t.isa.Insert(Mathf.Clamp(t.ix, 0, t.isa.childCount), t.l);
                s.position = t.pos; s.left = t.left; s.top = t.top; s.right = t.right; s.bottom = t.bottom; s.width = t.width; s.height = t.height;
                s.fontSize = t.koko; s.color = t.vari; s.unityTextAlign = t.tasaus; s.display = t.nakyvyys;
                s.backgroundColor = StyleKeyword.Null; s.paddingLeft = StyleKeyword.Null; s.paddingRight = StyleKeyword.Null;
                s.paddingTop = StyleKeyword.Null; s.paddingBottom = StyleKeyword.Null; s.letterSpacing = StyleKeyword.Null;
                s.borderTopLeftRadius = StyleKeyword.Null; s.borderTopRightRadius = StyleKeyword.Null;
                s.borderBottomLeftRadius = StyleKeyword.Null; s.borderBottomRightRadius = StyleKeyword.Null;
                s.textShadow = StyleKeyword.Null; s.maxWidth = StyleKeyword.Null;
            }
            tekstit.Clear();
            Lukema.Rivi1.style.fontSize = 11f; Lukema.Rivi2.style.fontSize = 9.5f;
            kerrosPohja?.RemoveFromHierarchy(); ryhmaEl?.RemoveFromHierarchy();
            foreach (var e in osat.Values) e.RemoveFromHierarchy();
            kaari?.RemoveFromHierarchy();
            osat.Clear(); kerrosPohja = ryhmaEl = tekstiEl = valot = legendat = kaari = null;
            Juuri.Kerros = false;
            Juuri.style.height = StyleKeyword.Null; Juuri.style.scale = StyleKeyword.Null; Juuri.style.bottom = 8; Juuri.style.overflow = StyleKeyword.Null;
            Juuri.style.paddingLeft = 10; Juuri.style.paddingRight = 10; Juuri.style.paddingTop = 8; Juuri.style.paddingBottom = 6;
            ylarivi.style.display = DisplayStyle.Flex; saatimet.style.display = DisplayStyle.Flex;
            ylarivi.Add(Live); ylarivi.Add(Lukema);
            foreach (var m in new IssKytkimet.Kytkin[] { Nopeus, Pilvet, Vuodenaika, Kohde, Oma, Sulku }) saatimet.Add(m);
            foreach (var m in moduulit)
            {
                m.Kerros = false;
                var ms = m.style;
                ms.position = StyleKeyword.Null; ms.left = StyleKeyword.Null; ms.top = StyleKeyword.Null; ms.height = StyleKeyword.Null;
                ms.display = StyleKeyword.Null; ms.minHeight = StyleKeyword.Null;
                if (m is IssKytkimet.Saadin sd) { sd.Otsikko.style.display = DisplayStyle.Flex; sd.Kilpi.style.display = DisplayStyle.None; }
            }
            Live.Nimi.style.display = DisplayStyle.Flex;
            Nopeus.style.width = 62; Pilvet.style.width = 62; Vuodenaika.style.width = 62; Kohde.style.width = 62; Oma.style.width = 62;
            Sulku.style.width = 52; Live.style.width = 44; Live.style.height = 36; Lukema.style.width = StyleKeyword.Null; Lukema.style.marginLeft = 6;
            if (valoRt != null) { valoRt.Release(); UnityEngine.Object.Destroy(valoRt); valoRt = null; }
            asettelu = null;
        }

        /// <summary>Liikkuvien osien kehykset ja valopainot tilasta; valosumma piirretään vain painojen muuttuessa.</summary>
        void PaivitaKerrokset()
        {
            string a = asettelu;
            if (osat.TryGetValue(Nopeus, out var on))
                AsetaKuva(on, IssPaneeliKuvat.Kuva(a, "osa-nopeus-" + Mathf.Clamp(Nopeus.Asento, 0, 3)));
            foreach (var n in new[] { Pilvet, Vuodenaika })
                if (osat.TryGetValue(n, out var e)) AsetaKuva(e, IssPaneeliKuvat.Kuva(a, "osa-nuppi-" + IssPaneeliKuvat.NupinKehys(n.Kulma).ToString("00")));
            if (osat.TryGetValue(Kohde, out var ok)) AsetaKuva(ok, IssPaneeliKuvat.Kuva(a, Kohde.Painettu ? "osa-kohde-alas" : "osa-kohde-ylos"));
            if (osat.TryGetValue(Sulku, out var os)) AsetaKuva(os, IssPaneeliKuvat.Kuva(a, Sulku.Painettu ? "osa-poistu-alas" : "osa-poistu-ylos"));
            if (osat.TryGetValue(Oma, out var ov)) AsetaKuva(ov, IssPaneeliKuvat.Kuva(a, Oma.Alhaalla ? "osa-vipu-alas" : "osa-vipu-ylos"));
            AsetaKuva(kaari, IssPaneeliKuvat.Kuva(a, "osa-kaari-" + Oma.KansiKehys));

            // Legendojen taustavalo: valkoinen LIVE:nä, meripihka nopeutettuna (PALAA).
            bool meri = Live.Meripihka;
            if (legendat != null && (legendaMeripihka != meri || legendat.style.backgroundImage.keyword == StyleKeyword.Null))
            {
                legendaMeripihka = meri;
                AsetaKuva(legendat, IssPaneeliKuvat.Kuva(a, meri ? "valo-legendat-meripihka" : "valo-legendat-valkoinen"));
            }

            bool live = Live.Tila == IssKytkimet.Tila.Aktiivinen;
            float Nappi(IssKytkimet.Painike p) => p.Tila == IssKytkimet.Tila.Pois ? 0f : p.Painettu || p.Tila == IssKytkimet.Tila.Aktiivinen ? 1f : LepoValo;
            var uA = new Vector4(1f, live && !meri ? 1f : 0f, live && meri ? 1f : 0f, Nappi(Kohde));
            var uB = new Vector4(Nappi(Sulku), 0f, 0f, 0f);
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
            // Valokerrokset ovat jo puolikokoisia (ryhmän kokoisina): RT samaan kokoon.
            int w = mitta.width, h = mitta.height;
            if (valoRt == null || valoRt.width != w || valoRt.height != h || !valoRt.IsCreated())
            {
                if (valoRt != null) { valoRt.Release(); UnityEngine.Object.Destroy(valoRt); }
                valoRt = new RenderTexture(new RenderTextureDescriptor(w, h, UnityEngine.Experimental.Rendering.GraphicsFormat.R8G8B8A8_SRGB, 0)
                    { useMipMap = false, autoGenerateMips = false })
                    { name = "IssValot", filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp, hideFlags = HideFlags.HideAndDontSave };
                valoRt.Create();
                valot.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(valoRt));
            }
            var pa = painotA; var pb = painotB;
            for (int i = 0; i < ValoJarjestys.Length; i++)
            {
                var t = IssPaneeliKuvat.Kuva(asettelu, "valo-" + ValoJarjestys[i]);
                valoMat.SetTexture("_Valo" + i, t != null ? t : Texture2D.blackTexture);
                if (t == null) { if (i < 4) pa[i] = 0; else pb[i - 4] = 0; }
            }
            valoMat.SetVector("_PainotA", pa); valoMat.SetVector("_PainotB", pb);
            Graphics.Blit(null, valoRt, valoMat);
            valot.MarkDirtyRepaint();
            Piirretty++;
        }

        /// <summary>Valosumman piirtokerrat (testikomento: todistaa, ettei piirretä joka ruutu).</summary>
        public int Piirretty { get; private set; }
    }
}
