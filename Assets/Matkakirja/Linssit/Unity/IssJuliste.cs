// ISS-KAMERAN JULISTE E v3 (omistaja 6.10.2026 klo 00.2x TF 144: "julisteesta puuttuu kokonaan tekstit yms. mitä oli suunniteltu";
// Päätoimittaja: rakennetaan lokin mitoista, koska tee-kehys3.mjs ja mallikuvat katosivat). Linjaukset (paatokset-2026-09.md):
//   1.10. 21.42  E v3 ilman kultarengasta
//   1.10. 21.52  ISS-sinetti pienenä (120 px) alamarginaalissa oikealla
//   1.10. 22.03  marginaalin teksti keskellä, paikannimi 44 px ja koordinaatit 29 px (2064 px leveällä kuvalla)
//   + päiväys ja "Contains modified Copernicus Sentinel data" (Päätoimittaja 6.10.)
// Mitat ovat suhteessa kuvan leveyteen (44/2064 jne.), joten juliste skaalautuu laitteen kuvaleveyden (≥ 1080) mukaan.
// Värit: Tyylikirja.Kehys (paperi ja muste), fontit: Antiikva (IM Fell English, pelin julisteet) ja Luku.
// Renderöinti: UI Toolkit -paneeli omaan RenderTextureen (pohja Resources/MatkakirjaUI/Paneeli, teema käynnissä olevasta UI:sta),
// kaksi kehystä piirtoa, luku CPU:lle. Epäonnistuessa kutsuja tallentaa pelkän kuvan kuten ennen.
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

        // Suhteet kuvan leveyteen (loki 1.10.: 2064 px:n kuva).
        const float Pohja = 2064f, NimiPx = 44f, KoordPx = 29f, SinettiPx = 120f, PieniPx = 20f;
        /// <summary>Paspartuun leveys sivuilla ja ylhäällä sekä alamarginaali (tekstit ja sinetti), osuutena kuvan leveydestä.</summary>
        const float Reuna = 0.045f, Ala = 0.16f;

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
            float s = w / Pohja;
            int reuna = Mathf.RoundToInt(w * Reuna), ala = Mathf.RoundToInt(w * Ala);
            int W = w + 2 * reuna, H = h + reuna + ala;
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

            // ISS-sinetti 120 px alamarginaalissa oikealla (21.52): musteleima, rengas ja ISS-teksti.
            float d = SinettiPx * s;
            var sinetti = new VisualElement();
            sinetti.style.position = Position.Absolute;
            sinetti.style.width = d; sinetti.style.height = d;
            sinetti.style.left = reuna + w - d;
            sinetti.style.top = reuna + h + (ala - d) * 0.5f;
            float r = d * 0.5f, rengas = Mathf.Max(1f, d * 0.045f);
            sinetti.style.borderTopLeftRadius = sinetti.style.borderTopRightRadius = sinetti.style.borderBottomLeftRadius = sinetti.style.borderBottomRightRadius = r;
            sinetti.style.borderTopWidth = sinetti.style.borderBottomWidth = sinetti.style.borderLeftWidth = sinetti.style.borderRightWidth = rengas;
            Color leima = Tyylikirja.Kehys.Mark;
            sinetti.style.borderTopColor = sinetti.style.borderBottomColor = sinetti.style.borderLeftColor = sinetti.style.borderRightColor = leima;
            sinetti.style.alignItems = Align.Center;
            sinetti.style.justifyContent = Justify.Center;
            sinetti.style.rotate = new Rotate(new Angle(-8f));
            var sisa = new VisualElement();
            sisa.style.width = d * 0.78f; sisa.style.height = d * 0.78f;
            sisa.style.borderTopLeftRadius = sisa.style.borderTopRightRadius = sisa.style.borderBottomLeftRadius = sisa.style.borderBottomRightRadius = d * 0.39f;
            float ohut = Mathf.Max(1f, d * 0.015f);
            sisa.style.borderTopWidth = sisa.style.borderBottomWidth = sisa.style.borderLeftWidth = sisa.style.borderRightWidth = ohut;
            sisa.style.borderTopColor = sisa.style.borderBottomColor = sisa.style.borderLeftColor = sisa.style.borderRightColor = leima;
            sisa.style.alignItems = Align.Center;
            sisa.style.justifyContent = Justify.Center;
            sisa.Add(Rivi("ISS", Kirjasin.Antiikva, d * 0.30f, leima, d * 0.02f));
            sisa.Add(Rivi("KIERTORATA", Kirjasin.Luku, d * 0.085f, leima, d * 0.01f));
            sinetti.Add(sisa);
            juuri.Add(sinetti);
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
