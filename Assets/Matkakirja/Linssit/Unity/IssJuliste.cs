// ISS-KAMERAN JULISTE (omistaja 6.10.2026 klo 00.2x TF 144: "julisteesta puuttuu kokonaan tekstit yms. mitä oli suunniteltu";
// tarkennukset 00.3x–00.5x Päätoimittajan kautta, sanatarkasti: "juliste on kuitenkin 4:5 pysty ja itse näkyvä kuva on lähempänä
// neliötä koska kuvalle on tehty kevyt kehys ja alaosaa on varattu tyhjää tilaa lisätekstejä varten. julisteen yläreunassa on
// matkakirjan logo, yleensä maapallon kaaren yläpuolella" ja "juliste on 4:5 koska se on tarkoitettu julkaistavaksi esim instagramissa").
//   ┌──────────────── 4:5, leveys W (≤ 2160) ────────────────┐
//   │ kehys 3 %                                                │
//   │  ┌──────────── kuva ~0,94 W × 1,0 W ────────────┐        │   logo (Matkakirja, pelin oma) kuvan yläosassa keskellä
//   │  │              MATKAKIRJA                       │        │   kaaren yläpuolella (Laaja: kaari ~ neljännes ylhäältä)
//   │  │  ~~~~~~~~~~ maapallon kaari ~~~~~~~~~~~~~~~~  │        │
//   │  └───────────────────────────────────────────────┘        │
//   │            HELSINKI, SUOMI            (nimi 44/1080 W)    │   alamarginaali 22 %: teksti keskellä (E v3 22.03)
//   │          60,17° N · 24,94° E          (29/1080 W)  (sin.) │   Pulucam-sinetti (omistajan musteensininen, 9.9.)
//   │   6.10.2026 klo 12.30 · 55 mm · f/5.6 · 1/1000 s · ISO 100 │   oikealla alhaalla (E v3 21.52: "sinetti pienenä
//   │      Contains modified Copernicus Sentinel data           │   alamarginaalissa oikealla")
//   └──────────────────────────────────────────────────────────┘
// Kuvaan tulee juliste-jalki.py:n S-käyrä (IssKameraKuva.Kontrasti) ennen tätä. Värit Tyylikirja.Kehys, fontit Antiikva ja Luku.
// Renderöinti: UI Toolkit -paneeli omaan RenderTextureen (pohja Resources/MatkakirjaUI/Paneeli, teema käynnissä olevasta UI:sta),
// kaksi piirtoa, luku CPU:lle. Epäonnistuessa kutsuja tallentaa pelkän kuvan kuten ennen.
using System;
using System.Collections;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class IssJuliste
    {
        /// <summary>Julisteen tekstit.</summary>
        public struct Tiedot
        {
            public string Paikka, Maa;
            public double Lat, Lon;
            public DateTime Paikallinen;
            /// <summary>Kamerarivi, esim. "55 mm · f/5.6 · 1/1000 s · ISO 100" (tyhjä = ei riviä).</summary>
            public string Kamera;
            public string Lahde;
        }

        /// <summary>A/B `astro kyyti kuvaa juliste 0|1` (0 = pelkkä kuva kuten ennen).</summary>
        public static bool Kaytossa = true;

        /// <summary>Julisteen enimmäisleveys (Instagram 2160 × 2700; Päätoimittaja 6.10.: "vähintään 1080 × 1350, mieluiten 2160 × 2700").</summary>
        public const int MaxLeveys = 2160;
        // Suhteet julisteen leveyteen W (E v3: nimi 44 ja koordinaatit 29 px 1080 px:n julisteessa; sinetti 120 px).
        const float Pohja = 1080f, NimiPx = 44f, KoordPx = 29f, SinettiPx = 120f, PieniPx = 21f;
        /// <summary>Kevyt kehys (sivut ja ylä), alamarginaali tekstille ja logon leveys, osuutena julisteen leveydestä.</summary>
        const float Kehys = 0.03f, Ala = 0.22f, LogoLeveys = 0.44f;

        /// <summary>Kuvan leveys julisteen leveydelle W.</summary>
        public static int KuvanLeveys(int julisteW) => Mathf.RoundToInt(julisteW * (1f - 2f * Kehys));
        static int JulisteenLeveys(int kuvaW) => Mathf.RoundToInt(kuvaW / (1f - 2f * Kehys));
        /// <summary>Kuvan koko (lähes neliö) julisteeseen, jonka kuva-alan leveys on kuvaW.</summary>
        public static (int w, int h) KuvanKoko(int kuvaW)
        {
            int W = JulisteenLeveys(kuvaW), H = Mathf.RoundToInt(W * 1.25f);
            return (kuvaW, H - Mathf.RoundToInt(W * Kehys) - Mathf.RoundToInt(W * Ala));
        }

        public static string Koordinaatit(double lat, double lon)
        {
            var ic = System.Globalization.CultureInfo.GetCultureInfo("fi-FI");
            return $"{Math.Abs(lat).ToString("0.00", ic)}° {(lat >= 0 ? "N" : "S")} · {Math.Abs(lon).ToString("0.00", ic)}° {(lon >= 0 ? "E" : "W")}";
        }

        /// <summary>
        /// Juliste kuvasta (RGBA, kuvan oma koko). valmis saa JPG-tavut tai null (paneelia ei saatu → kutsuja tallentaa pelkän kuvan).
        /// </summary>
        public static IEnumerator Tee(Texture2D kuva, Tiedot t, Action<byte[]> valmis)
        {
            int w = kuva.width, h = kuva.height;
            int W = JulisteenLeveys(w), H = Mathf.RoundToInt(W * 1.25f);
            float s = W / Pohja;
            int reuna = Mathf.RoundToInt(W * Kehys), ala = H - reuna - h;
            var pohja = Resources.Load<PanelSettings>(UiKerros.PaneeliPolku);
            ThemeStyleSheet teema = null;
            foreach (var d in UnityEngine.Object.FindObjectsByType<UIDocument>(FindObjectsSortMode.None))
                if (d.panelSettings != null && d.panelSettings.themeStyleSheet != null) { teema = d.panelSettings.themeStyleSheet; break; }
            if (pohja == null || teema == null) { valmis(null); yield break; }

            var rt = new RenderTexture(W, H, 0, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB) { name = "IssJuliste" };
            rt.Create();
            var asetukset = UnityEngine.Object.Instantiate(pohja);
            asetukset.name = "IssJuliste";
            asetukset.themeStyleSheet = teema;
            asetukset.targetTexture = rt;
            asetukset.scaleMode = PanelScaleMode.ConstantPixelSize;
            asetukset.scale = 1f;
            asetukset.clearColor = true;
            asetukset.colorClearValue = Tyylikirja.Kehys.Paper;
            asetukset.sortingOrder = -1000;
            var go = new GameObject("IssJuliste");
            go.SetActive(false);
            var doc = go.AddComponent<UIDocument>();
            doc.panelSettings = asetukset;
            go.SetActive(true);
            byte[] jpg = null;
            try
            {
                var juuri = doc.rootVisualElement;
                juuri.style.width = W; juuri.style.height = H;
                juuri.style.backgroundColor = (Color)Tyylikirja.Kehys.Paper;
                Rakenna(juuri, kuva, t, w, h, reuna, ala, s);
            }
            catch (Exception e) { Debug.LogException(e); valmis(null); Siivoa(go, asetukset, rt); yield break; }
            // Kaksi piirtoa: asettelu ja fonttiatlas valmiiksi ennen lukua.
            yield return null; yield return null; yield return new WaitForEndOfFrame();
            try
            {
                var vanha = RenderTexture.active;
                RenderTexture.active = rt;
                var ulos = new Texture2D(W, H, TextureFormat.RGB24, false);
                ulos.ReadPixels(new Rect(0, 0, W, H), 0, 0);
                ulos.Apply(false);
                RenderTexture.active = vanha;
                jpg = ulos.EncodeToJPG(93);
                UnityEngine.Object.Destroy(ulos);
            }
            catch (Exception e) { Debug.LogException(e); jpg = null; }
            Siivoa(go, asetukset, rt);
            valmis(jpg);
        }

        static void Siivoa(GameObject go, PanelSettings asetukset, RenderTexture rt)
        {
            UnityEngine.Object.Destroy(go);
            UnityEngine.Object.Destroy(asetukset);
            rt.Release(); UnityEngine.Object.Destroy(rt);
        }

        static void Rakenna(VisualElement juuri, Texture2D kuva, Tiedot t, int w, int h, int reuna, int ala, float s)
        {
            Color muste = Tyylikirja.Kehys.MapInk, musteHento = Tyylikirja.Kehys.MapInkSoft;
            // Kuva ohuella musteviivalla.
            var kuvaEl = new VisualElement();
            kuvaEl.style.position = Position.Absolute;
            kuvaEl.style.left = reuna; kuvaEl.style.top = reuna; kuvaEl.style.width = w; kuvaEl.style.height = h;
            kuvaEl.style.backgroundImage = new StyleBackground(kuva);
            float viiva = Mathf.Max(1f, 3f * s);
            kuvaEl.style.borderTopWidth = kuvaEl.style.borderBottomWidth = kuvaEl.style.borderLeftWidth = kuvaEl.style.borderRightWidth = viiva;
            kuvaEl.style.borderTopColor = kuvaEl.style.borderBottomColor = kuvaEl.style.borderLeftColor = kuvaEl.style.borderRightColor = muste;
            juuri.Add(kuvaEl);

            // Matkakirjan logo kuvan yläosassa keskellä (maapallon kaaren yläpuolella laajassa kuvassa).
            var logo = Resources.Load<Texture2D>("MatkakirjaUI/logo");
            if (logo != null)
            {
                float lw = (w + 2 * reuna) * LogoLeveys, lh = lw * logo.height / logo.width;
                var logoEl = new VisualElement();
                logoEl.style.position = Position.Absolute;
                logoEl.style.width = lw; logoEl.style.height = lh;
                logoEl.style.left = reuna + (w - lw) * 0.5f;
                logoEl.style.top = reuna + (w + 2 * reuna) * 0.035f;
                logoEl.style.backgroundImage = new StyleBackground(logo);
                juuri.Add(logoEl);
            }

            // Alamarginaalin teksti keskellä (22.03): paikannimi, koordinaatit, päiväys + kamera, lähde.
            var teksti = new VisualElement();
            teksti.style.position = Position.Absolute;
            teksti.style.left = reuna; teksti.style.width = w;
            teksti.style.top = reuna + h; teksti.style.height = ala;
            teksti.style.flexDirection = FlexDirection.Column;
            teksti.style.alignItems = Align.Center;
            teksti.style.justifyContent = Justify.Center;
            juuri.Add(teksti);
            string nimi = string.IsNullOrEmpty(t.Maa) || t.Maa == t.Paikka ? t.Paikka : $"{t.Paikka}, {t.Maa}";
            teksti.Add(Rivi((nimi ?? "").ToUpperInvariant(), Kirjasin.Antiikva, NimiPx * s, muste, 0.08f * NimiPx * s));
            teksti.Add(Rivi(Koordinaatit(t.Lat, t.Lon), Kirjasin.Antiikva, KoordPx * s, muste, 0.04f * KoordPx * s));
            string paiva = $"{t.Paikallinen.Day}.{t.Paikallinen.Month}.{t.Paikallinen.Year} klo {t.Paikallinen.Hour}.{t.Paikallinen.Minute:00}";
            teksti.Add(Rivi(string.IsNullOrEmpty(t.Kamera) ? paiva : $"{paiva} · {t.Kamera}", Kirjasin.Luku, PieniPx * s, musteHento, 0));
            teksti.Add(Rivi(string.IsNullOrEmpty(t.Lahde) ? "Contains modified Copernicus Sentinel data" : t.Lahde, Kirjasin.LukuKursiivi, 0.85f * PieniPx * s, musteHento, 0));

            // Sinetti pienenä alamarginaalissa oikealla (E v3 21.52): omistajan musteensininen Pulucam-sinetti (9.9.2026).
            var leima = Resources.Load<Texture2D>("IssKamera/pulucam-leima");
            if (leima != null)
            {
                float d = SinettiPx * s;
                var sinetti = new VisualElement();
                sinetti.style.position = Position.Absolute;
                sinetti.style.width = d; sinetti.style.height = d;
                sinetti.style.left = reuna + w - d;
                sinetti.style.top = reuna + h + (ala - d) * 0.5f;
                sinetti.style.backgroundImage = new StyleBackground(leima);
                sinetti.style.rotate = new Rotate(new Angle(-6f));
                juuri.Add(sinetti);
            }
        }

        static Label Rivi(string teksti, Kirjasin k, float koko, Color vari, float vali)
        {
            var l = Kirjasimet.Aseta(new Label(teksti), k);
            l.style.fontSize = koko;
            l.style.color = vari;
            l.style.letterSpacing = vali;
            l.style.marginTop = l.style.marginBottom = 0;
            l.style.paddingTop = l.style.paddingBottom = 0;
            l.style.unityTextAlign = TextAnchor.MiddleCenter;
            return l;
        }
    }
}
