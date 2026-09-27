// SAAVUTETTAVUUDEN MITTARI (Natiivi-UI, Fablen App Store -laatujono 27.9.2026 kohta 3): testikomento
// `ui saavutettavuus [nimi]` käy kaikkien UI-kerrosten näkyvät ohjaimet ja tekstit läpi ja kirjoittaa
// Documents/saavutettavuus[-nimi].json:
//   napit      Button/Toggle/Slider/TextField: VoiceOver-nimi (tooltip → teksti → lapsen teksti), nimettömät merkitty,
//              kosketusala (Kosketusnapin laajennus mukana) ja alle 44 × 44 pt:n alat (Applen HIG).
//   tekstit    näkyvät tekstit: värin ja taustan kontrasti (WCAG 2.x); tausta = lähin vanhempi, jolla on peittävä
//              taustaväri; kuvan tai läpinäkyvän päällä kontrasti jää arvioimatta ("tausta": "kuva").
//              Raja 4,5 (iso teksti ≥ 18,66 px lihava tai ≥ 24 px: 3,0).
// Mitat UI-yksiköinä (= pt, UiKerros.Pisteskaala). Pelkkä mittari: ei muuta näkymiä.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Saavutettavuus
    {
        public const float KosketusVahintaan = 44f, KontrastiRaja = 4.5f, IsoKontrastiRaja = 3f;

        static string J(string t) => "\"" + (t ?? "").Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\n", " ").Replace("\r", "").Replace("\t", " ") + "\"";
        static string L(float v) => v.ToString("0.##", CultureInfo.InvariantCulture);
        static string Puhdas(string t) => Regex.Replace(t ?? "", "<[^>]+>", "").Trim();

        /// <summary>VoiceOverin nimi ohjaimelle: näkyvä teksti (omat ja lasten tekstit), muuten tooltip; null = nimetön.</summary>
        public static string Nimi(VisualElement e) => Teksti(e) ?? (string.IsNullOrWhiteSpace(e.tooltip) ? null : e.tooltip.Trim());

        /// <summary>Vihje (VoiceOverin hint): tooltip, jos nimi tuli näkyvästä tekstistä ja tooltip kertoo muuta.</summary>
        public static string Vihje(VisualElement e)
        {
            string t = Teksti(e);
            return t != null && !string.IsNullOrWhiteSpace(e.tooltip) && e.tooltip.Trim() != t ? e.tooltip.Trim() : null;
        }

        /// <summary>Ohjaimen näkyvä teksti: oma teksti, kentän otsikko tai näkyvät lapsitekstit välilyönnein.</summary>
        static string Teksti(VisualElement e)
        {
            if (e is TextElement te && !string.IsNullOrWhiteSpace(Puhdas(te.text))) return Puhdas(te.text);
            if (e is BaseField<float> bf && !string.IsNullOrWhiteSpace(bf.label)) return bf.label;
            var osat = new List<string>();
            foreach (var t in e.Query<TextElement>().ToList())
            {
                var s = Puhdas(t.text);
                if (s.Length > 0 && t.resolvedStyle.display != DisplayStyle.None && t.resolvedStyle.visibility != Visibility.Hidden) osat.Add(s);
            }
            return osat.Count > 0 ? string.Join(" ", osat) : null;
        }

        /// <summary>Kosketusala maailmakoordinaateissa: bound ja Kosketusnapin "kosketusala"-lapsi.</summary>
        static Rect Ala(VisualElement e)
        {
            var r = e.worldBound;
            var ala = e.Q<VisualElement>("kosketusala");
            if (ala != null && ala.hierarchy.parent == e)
            {
                var a = ala.worldBound;
                r = Rect.MinMaxRect(Mathf.Min(r.xMin, a.xMin), Mathf.Min(r.yMin, a.yMin), Mathf.Max(r.xMax, a.xMax), Mathf.Max(r.yMax, a.yMax));
            }
            return r;
        }

        static float Luminanssi(Color c)
        {
            float K(float v) => v <= 0.03928f ? v / 12.92f : Mathf.Pow((v + 0.055f) / 1.055f, 2.4f);
            return 0.2126f * K(c.r) + 0.7152f * K(c.g) + 0.0722f * K(c.b);
        }

        /// <summary>WCAG-kontrasti; tekstiväri sekoitetaan taustaan sen alfalla (sRGB-oletus kuten selaimessa).</summary>
        public static float Kontrasti(Color teksti, Color tausta)
        {
            var t = Color.Lerp(tausta, teksti, teksti.a);
            float a = Luminanssi(t), b = Luminanssi(tausta);
            return (Mathf.Max(a, b) + 0.05f) / (Mathf.Min(a, b) + 0.05f);
        }

        /// <summary>Lähin peittävä tausta: taustaväri (alfa ≥ 0,9, sekoitettuna alempiin) tai null, jos kuva tai läpinäkyvä.</summary>
        static Color? Tausta(VisualElement e)
        {
            var kerrokset = new List<Color>();
            for (var v = e; v != null; v = v.hierarchy.parent)
            {
                var rs = v.resolvedStyle;
                var kuva = rs.backgroundImage;
                if (kuva.texture != null || kuva.sprite != null || kuva.renderTexture != null || kuva.vectorImage != null) return null;
                var c = rs.backgroundColor;
                if (c.a <= 0.02f) continue;
                kerrokset.Add(c);
                if (c.a >= 0.9f) break;
            }
            if (kerrokset.Count == 0 || kerrokset[kerrokset.Count - 1].a < 0.9f) return null;
            // Sekoitus alimmasta ylöspäin.
            var tulos = kerrokset[kerrokset.Count - 1];
            for (int i = kerrokset.Count - 2; i >= 0; i--) tulos = Color.Lerp(tulos, kerrokset[i], kerrokset[i].a);
            tulos.a = 1f;
            return tulos;
        }

        static string Luokat(VisualElement e) => string.Join(".", e.GetClasses());

        /// <summary>Mittaa kaikki kerrokset; palauttaa yhteenvedon ja kirjoittaa JSONin Documentsiin.</summary>
        public static string Mittaa(string nimi)
        {
            var napit = new StringBuilder();
            var tekstit = new StringBuilder();
            int nN = 0, nNimeton = 0, nPieni = 0, nT = 0, nHeikko = 0, nArvioimatta = 0;
            var nahty = new HashSet<VisualElement>();
            foreach (var (kerros, juuri) in UiKerros.Hae().Juuret)
            {
                if (juuri == null) continue;
                var koko = juuri.worldBound;
                void Kay(VisualElement e, float opasiteetti)
                {
                    var rs = e.resolvedStyle;
                    if (rs.display == DisplayStyle.None || rs.visibility == Visibility.Hidden) return;
                    opasiteetti *= rs.opacity;
                    if (opasiteetti <= 0.05f) return;
                    var r = e.worldBound;
                    bool ruudulla = r.width > 0 && r.height > 0 && r.xMax > koko.xMin && r.xMin < koko.xMax && r.yMax > koko.yMin && r.yMin < koko.yMax;
                    bool ohjain = e is Button || e is Toggle || e is Slider || e is TextField;
                    if (ruudulla && ohjain && e.pickingMode == PickingMode.Position && nahty.Add(e))
                    {
                        var a = Ala(e);
                        string n = Nimi(e);
                        bool pieni = a.width < KosketusVahintaan - 0.5f || a.height < KosketusVahintaan - 0.5f;
                        if (n == null) nNimeton++;
                        if (pieni) nPieni++;
                        if (nN++ > 0) napit.Append(',');
                        napit.Append("{\"kerros\":").Append(kerros).Append(",\"luokat\":").Append(J(Luokat(e)))
                             .Append(",\"tyyppi\":").Append(J(e.GetType().Name)).Append(",\"nimi\":").Append(n == null ? "null" : J(n))
                             .Append(",\"x\":").Append(L(r.x)).Append(",\"y\":").Append(L(r.y))
                             .Append(",\"alaW\":").Append(L(a.width)).Append(",\"alaH\":").Append(L(a.height))
                             .Append(",\"pieni\":").Append(pieni ? "true" : "false").Append('}');
                    }
                    if (ruudulla && e is TextElement te && !(e is Button) && Puhdas(te.text).Length > 0)
                    {
                        var tausta = Tausta(e);
                        var vari = rs.color;
                        vari.a *= opasiteetti;
                        bool iso = rs.fontSize >= 24f || (rs.fontSize >= 18.66f && rs.unityFontStyleAndWeight != FontStyle.Normal && rs.unityFontStyleAndWeight != FontStyle.Italic);
                        float raja = iso ? IsoKontrastiRaja : KontrastiRaja;
                        if (nT++ > 0) tekstit.Append(',');
                        tekstit.Append("{\"kerros\":").Append(kerros).Append(",\"luokat\":").Append(J(Luokat(e)))
                               .Append(",\"teksti\":").Append(J(Puhdas(te.text).Length > 60 ? Puhdas(te.text).Substring(0, 60) + "…" : Puhdas(te.text)))
                               .Append(",\"fontti\":").Append(L(rs.fontSize)).Append(",\"vari\":").Append(J("#" + ColorUtility.ToHtmlStringRGBA(vari)));
                        if (tausta == null) { nArvioimatta++; tekstit.Append(",\"tausta\":\"kuva\"}"); }
                        else
                        {
                            float k = Kontrasti(vari, tausta.Value);
                            bool heikko = k < raja;
                            if (heikko) nHeikko++;
                            tekstit.Append(",\"tausta\":").Append(J("#" + ColorUtility.ToHtmlStringRGB(tausta.Value)))
                                   .Append(",\"kontrasti\":").Append(L(k)).Append(",\"raja\":").Append(L(raja))
                                   .Append(",\"heikko\":").Append(heikko ? "true" : "false").Append('}');
                        }
                    }
                    foreach (var lapsi in e.hierarchy.Children()) Kay(lapsi, opasiteetti);
                }
                Kay(juuri, 1f);
            }
            string yhteenveto = $"saavutettavuus: napit {nN} (nimettömiä {nNimeton}, alle 44 pt {nPieni}), tekstit {nT} (kontrasti alle rajan {nHeikko}, kuvan päällä {nArvioimatta})";
            var sb = new StringBuilder();
            sb.Append("{\"yhteenveto\":").Append(J(yhteenveto)).Append(",\"ruutu\":{\"w\":").Append(Screen.width).Append(",\"h\":").Append(Screen.height)
              .Append("},\"napit\":[").Append(napit).Append("],\"tekstit\":[").Append(tekstit).Append("]}");
            string tiedosto = string.IsNullOrEmpty(nimi) ? "saavutettavuus.json" : "saavutettavuus-" + nimi + ".json";
            string polku = Path.Combine(Application.persistentDataPath, tiedosto);
            File.WriteAllText(polku + ".tmp", sb.ToString());
            if (File.Exists(polku)) File.Delete(polku);
            File.Move(polku + ".tmp", polku);
            return yhteenveto + " → " + tiedosto;
        }
    }
}
