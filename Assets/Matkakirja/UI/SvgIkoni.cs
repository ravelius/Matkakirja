// SVG-IKONIT UI Toolkitissa (Natiivi-UI, 23.9.2026).
//
// Verkkopelin ikonit ovat 24 × 24 -viewBoxin viivapiirroksia (stroke,
// round-päät, kuten lucide). SvgPolku jäsentää path-d:n (M L H V C S Q T A Z,
// isot ja pienet kirjaimet) komentolistaksi ja SvgKuvio webin ikonimerkinnän
// (path, rect, circle, ellipse, line, polyline, polygon; class="taytto" tai
// <g class="taytto"> = täytetty osa) poluiksi; SvgIkoni piirtää ne Painter2D:llä
// elementin kokoon skaalattuna. Väri tulee USS:n `color`-ominaisuudesta
// (resolvedStyle.color), joten hover-, valittu- ja pois-tilat hoituvat tyylillä.
// Viivan paksuus viewBoxin yksiköissä: --mk-ikoni-viiva (oletus 1.75).
// Koko ikonin täyttö: luokka "mk-ikoni--tayta".
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    /// <summary>Jäsennetty SVG-polku absoluuttisina komentoina (M, L, C, Z).</summary>
    public sealed class SvgPolku
    {
        public enum Laji : byte { Siirry, Viiva, Kaari3, Sulje }

        public readonly struct Komento
        {
            public readonly Laji Laji;
            public readonly Vector2 A, B, C;
            public Komento(Laji l, Vector2 a = default, Vector2 b = default, Vector2 c = default) { Laji = l; A = a; B = b; C = c; }
        }

        public readonly List<Komento> Komennot = new List<Komento>();

        static readonly Dictionary<string, SvgPolku> valimuisti = new Dictionary<string, SvgPolku>();

        /// <summary>Jäsentää (ja muistaa) usean polun: polut erotetaan '|'-merkillä tai annetaan erikseen.</summary>
        public static SvgPolku Jasenna(string d)
        {
            if (string.IsNullOrEmpty(d)) return new SvgPolku();
            if (valimuisti.TryGetValue(d, out var p)) return p;
            p = new SvgPolku();
            foreach (var osa in d.Split('|')) p.Lisaa(osa);
            valimuisti[d] = p;
            return p;
        }

        void Lisaa(string d)
        {
            int i = 0;
            char cmd = ' ';
            Vector2 nyt = default, alku = default, viimeOhjain = default;
            char viimeCmd = ' ';
            while (true)
            {
                Ohita(d, ref i);
                if (i >= d.Length) break;
                char c = d[i];
                if (char.IsLetter(c)) { cmd = c; i++; }
                else if (cmd == ' ') break; // numero ilman komentoa: rikkinäinen polku
                bool rel = char.IsLower(cmd);
                Vector2 o = rel ? nyt : Vector2.zero;
                switch (char.ToUpperInvariant(cmd))
                {
                    case 'M':
                        nyt = o + Piste(d, ref i);
                        alku = nyt;
                        Komennot.Add(new Komento(Laji.Siirry, nyt));
                        cmd = rel ? 'l' : 'L'; // jatkoparit ovat viivoja
                        viimeCmd = 'M';
                        continue;
                    case 'L':
                        nyt = o + Piste(d, ref i);
                        Komennot.Add(new Komento(Laji.Viiva, nyt));
                        break;
                    case 'H':
                        nyt = new Vector2((rel ? nyt.x : 0) + Luku(d, ref i), nyt.y);
                        Komennot.Add(new Komento(Laji.Viiva, nyt));
                        break;
                    case 'V':
                        nyt = new Vector2(nyt.x, (rel ? nyt.y : 0) + Luku(d, ref i));
                        Komennot.Add(new Komento(Laji.Viiva, nyt));
                        break;
                    case 'C':
                    {
                        var a = o + Piste(d, ref i); var b = o + Piste(d, ref i); var e = o + Piste(d, ref i);
                        Komennot.Add(new Komento(Laji.Kaari3, a, b, e));
                        viimeOhjain = b; nyt = e; viimeCmd = 'C';
                        continue;
                    }
                    case 'S':
                    {
                        var a = (viimeCmd == 'C' || viimeCmd == 'S') ? 2 * nyt - viimeOhjain : nyt;
                        var b = o + Piste(d, ref i); var e = o + Piste(d, ref i);
                        Komennot.Add(new Komento(Laji.Kaari3, a, b, e));
                        viimeOhjain = b; nyt = e; viimeCmd = 'S';
                        continue;
                    }
                    case 'Q':
                    {
                        var q = o + Piste(d, ref i); var e = o + Piste(d, ref i);
                        Komennot.Add(new Komento(Laji.Kaari3, nyt + 2f / 3f * (q - nyt), e + 2f / 3f * (q - e), e));
                        viimeOhjain = q; nyt = e; viimeCmd = 'Q';
                        continue;
                    }
                    case 'T':
                    {
                        var q = (viimeCmd == 'Q' || viimeCmd == 'T') ? 2 * nyt - viimeOhjain : nyt;
                        var e = o + Piste(d, ref i);
                        Komennot.Add(new Komento(Laji.Kaari3, nyt + 2f / 3f * (q - nyt), e + 2f / 3f * (q - e), e));
                        viimeOhjain = q; nyt = e; viimeCmd = 'T';
                        continue;
                    }
                    case 'A':
                    {
                        float rx = Luku(d, ref i), ry = Luku(d, ref i), kierto = Luku(d, ref i);
                        bool iso = Lippu(d, ref i), myota = Lippu(d, ref i);
                        var e = o + Piste(d, ref i);
                        Kaari(nyt, e, rx, ry, kierto, iso, myota);
                        nyt = e;
                        break;
                    }
                    case 'Z':
                        Komennot.Add(new Komento(Laji.Sulje));
                        nyt = alku;
                        break;
                    default:
                        return; // tuntematon komento
                }
                viimeCmd = char.ToUpperInvariant(cmd);
            }
        }

        /// <summary>SVG:n elliptinen kaari kuutiollisina Bézier-käyrinä (enintään 90° per pala).</summary>
        void Kaari(Vector2 p0, Vector2 p1, float rx, float ry, float kiertoAst, bool iso, bool myota)
        {
            if (p0 == p1) return;
            rx = Mathf.Abs(rx); ry = Mathf.Abs(ry);
            if (rx < 1e-6f || ry < 1e-6f) { Komennot.Add(new Komento(Laji.Viiva, p1)); return; }
            float fi = kiertoAst * Mathf.Deg2Rad, cf = Mathf.Cos(fi), sf = Mathf.Sin(fi);
            var dd = (p0 - p1) * 0.5f;
            float x1 = cf * dd.x + sf * dd.y, y1 = -sf * dd.x + cf * dd.y;
            float lam = x1 * x1 / (rx * rx) + y1 * y1 / (ry * ry);
            if (lam > 1) { float s = Mathf.Sqrt(lam); rx *= s; ry *= s; }
            float num = rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1;
            float den = rx * rx * y1 * y1 + ry * ry * x1 * x1;
            float k = Mathf.Sqrt(Mathf.Max(0, num / den)) * (iso == myota ? -1 : 1);
            float cx1 = k * rx * y1 / ry, cy1 = -k * ry * x1 / rx;
            var keski = new Vector2(cf * cx1 - sf * cy1, sf * cx1 + cf * cy1) + (p0 + p1) * 0.5f;
            float t1 = Mathf.Atan2((y1 - cy1) / ry, (x1 - cx1) / rx);
            float t2 = Mathf.Atan2((-y1 - cy1) / ry, (-x1 - cx1) / rx);
            float dt = t2 - t1;
            if (myota && dt < 0) dt += 2 * Mathf.PI;
            else if (!myota && dt > 0) dt -= 2 * Mathf.PI;
            int palat = Mathf.Max(1, Mathf.CeilToInt(Mathf.Abs(dt) / (Mathf.PI / 2) - 1e-4f));
            float h = dt / palat;
            float a = 4f / 3f * Mathf.Tan(h / 4);
            Vector2 Pt(float t) { float x = rx * Mathf.Cos(t), y = ry * Mathf.Sin(t); return keski + new Vector2(cf * x - sf * y, sf * x + cf * y); }
            Vector2 Dt(float t) { float x = -rx * Mathf.Sin(t), y = ry * Mathf.Cos(t); return new Vector2(cf * x - sf * y, sf * x + cf * y); }
            float t = t1;
            for (int n = 0; n < palat; n++)
            {
                float tn = t + h;
                var alkuP = Pt(t); var loppuP = n == palat - 1 ? p1 : Pt(tn);
                Komennot.Add(new Komento(Laji.Kaari3, alkuP + a * Dt(t), loppuP - a * Dt(tn), loppuP));
                t = tn;
            }
        }

        static void Ohita(string d, ref int i)
        {
            while (i < d.Length && (char.IsWhiteSpace(d[i]) || d[i] == ',')) i++;
        }

        static bool Lippu(string d, ref int i)
        {
            Ohita(d, ref i);
            if (i < d.Length && (d[i] == '0' || d[i] == '1')) return d[i++] == '1';
            return Luku(d, ref i) != 0;
        }

        static Vector2 Piste(string d, ref int i) => new Vector2(Luku(d, ref i), Luku(d, ref i));

        static float Luku(string d, ref int i)
        {
            Ohita(d, ref i);
            int alku = i;
            if (i < d.Length && (d[i] == '-' || d[i] == '+')) i++;
            bool piste = false, eks = false;
            while (i < d.Length)
            {
                char c = d[i];
                if (char.IsDigit(c)) { i++; continue; }
                if (c == '.' && !piste && !eks) { piste = true; i++; continue; }
                if ((c == 'e' || c == 'E') && !eks) { eks = true; i++; if (i < d.Length && (d[i] == '-' || d[i] == '+')) i++; continue; }
                break;
            }
            if (i == alku) { i++; return 0; } // ei lukua: ohitetaan merkki, ettei jäädä silmukkaan
            float.TryParse(d.Substring(alku, i - alku), NumberStyles.Float, CultureInfo.InvariantCulture, out var v);
            return v;
        }
    }

    /// <summary>Webin ikonimerkintä (SVG:n sisältö ilman svg-tagia) viiva- ja täyttöpoluiksi.</summary>
    public sealed class SvgKuvio
    {
        public readonly List<(SvgPolku Polku, bool Tayta)> Osat = new List<(SvgPolku, bool)>();

        static readonly Dictionary<string, SvgKuvio> valimuisti = new Dictionary<string, SvgKuvio>();
        static readonly Regex Tagi = new Regex(@"<\s*(/?)\s*([a-zA-Z]+)([^>]*?)(/?)\s*>", RegexOptions.Compiled);
        static readonly Regex Attr = new Regex(@"([a-zA-Z_:-]+)\s*=\s*(""([^""]*)""|'([^']*)')", RegexOptions.Compiled);

        /// <summary>Merkintä tai pelkkä path-d (ei ala '&lt;'-merkillä).</summary>
        public static SvgKuvio Jasenna(string merkinta)
        {
            if (string.IsNullOrEmpty(merkinta)) return new SvgKuvio();
            if (valimuisti.TryGetValue(merkinta, out var k)) return k;
            k = new SvgKuvio();
            if (merkinta.TrimStart()[0] != '<') k.Osat.Add((SvgPolku.Jasenna(merkinta), false));
            else k.Lue(merkinta);
            valimuisti[merkinta] = k;
            return k;
        }

        void Lue(string m)
        {
            var ryhmat = new Stack<bool>(); // <g>-pino: onko ryhmä täytetty
            foreach (Match t in Tagi.Matches(m))
            {
                bool loppu = t.Groups[1].Value == "/", itse = t.Groups[4].Value == "/";
                string nimi = t.Groups[2].Value.ToLowerInvariant();
                var a = new Dictionary<string, string>();
                foreach (Match x in Attr.Matches(t.Groups[3].Value))
                    a[x.Groups[1].Value] = x.Groups[3].Success && x.Groups[3].Length > 0 ? x.Groups[3].Value : x.Groups[4].Value;
                bool taytto = (a.TryGetValue("class", out var c) && c.Contains("taytto"))
                    || (a.TryGetValue("fill", out var f) && f != "none" && f.Length > 0);
                if (nimi == "g")
                {
                    if (loppu) { if (ryhmat.Count > 0) ryhmat.Pop(); }
                    else if (!itse) ryhmat.Push(taytto || (ryhmat.Count > 0 && ryhmat.Peek()));
                    continue;
                }
                if (loppu) continue;
                bool tayta = taytto || (ryhmat.Count > 0 && ryhmat.Peek());
                string d = Polkuna(nimi, a);
                if (!string.IsNullOrEmpty(d)) Osat.Add((SvgPolku.Jasenna(d), tayta));
            }
        }

        static float L(Dictionary<string, string> a, string k)
        {
            if (!a.TryGetValue(k, out var s)) return 0;
            float.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out var v);
            return v;
        }

        static string F(float v) => v.ToString("0.###", CultureInfo.InvariantCulture);

        static string Polkuna(string nimi, Dictionary<string, string> a)
        {
            switch (nimi)
            {
                case "path": return a.TryGetValue("d", out var d) ? d : null;
                case "line": return $"M{F(L(a, "x1"))} {F(L(a, "y1"))}L{F(L(a, "x2"))} {F(L(a, "y2"))}";
                case "polyline":
                case "polygon":
                    if (!a.TryGetValue("points", out var pts)) return null;
                    return "M" + pts.Trim() + (nimi == "polygon" ? "Z" : "");
                case "circle":
                {
                    float cx = L(a, "cx"), cy = L(a, "cy"), r = L(a, "r");
                    return Ellipsi(cx, cy, r, r);
                }
                case "ellipse": return Ellipsi(L(a, "cx"), L(a, "cy"), L(a, "rx"), L(a, "ry"));
                case "rect":
                {
                    float x = L(a, "x"), y = L(a, "y"), w = L(a, "width"), h = L(a, "height");
                    float rx = a.ContainsKey("rx") ? L(a, "rx") : L(a, "ry"), ry = a.ContainsKey("ry") ? L(a, "ry") : rx;
                    rx = Mathf.Min(rx, w / 2); ry = Mathf.Min(ry, h / 2);
                    if (rx <= 0 || ry <= 0) return $"M{F(x)} {F(y)}h{F(w)}v{F(h)}h{F(-w)}Z";
                    return $"M{F(x + rx)} {F(y)}H{F(x + w - rx)}A{F(rx)} {F(ry)} 0 0 1 {F(x + w)} {F(y + ry)}"
                        + $"V{F(y + h - ry)}A{F(rx)} {F(ry)} 0 0 1 {F(x + w - rx)} {F(y + h)}"
                        + $"H{F(x + rx)}A{F(rx)} {F(ry)} 0 0 1 {F(x)} {F(y + h - ry)}"
                        + $"V{F(y + ry)}A{F(rx)} {F(ry)} 0 0 1 {F(x + rx)} {F(y)}Z";
                }
                default: return null;
            }
        }

        static string Ellipsi(float cx, float cy, float rx, float ry) =>
            $"M{F(cx - rx)} {F(cy)}A{F(rx)} {F(ry)} 0 1 0 {F(cx + rx)} {F(cy)}A{F(rx)} {F(ry)} 0 1 0 {F(cx - rx)} {F(cy)}Z";
    }

    /// <summary>24 × 24 -viewBoxin SVG-viivaikoni. Väri = USS color.</summary>
    public sealed class SvgIkoni : VisualElement
    {
        static readonly CustomStyleProperty<float> ViivaProp = new CustomStyleProperty<float>("--mk-ikoni-viiva");

        SvgKuvio kuvio;
        float viiva = 1.75f;
        public float Ruutu = 24f;

        public SvgIkoni(string d = null)
        {
            AddToClassList("mk-ikoni");
            pickingMode = PickingMode.Ignore;
            generateVisualContent += Piirra;
            RegisterCallback<CustomStyleResolvedEvent>(e =>
            {
                if (e.customStyle.TryGetValue(ViivaProp, out var v) && !Mathf.Approximately(v, viiva)) { viiva = v; MarkDirtyRepaint(); }
            });
            Polku = d;
        }

        /// <summary>Webin ikonimerkintä (Ikonit.*) tai pelkkä path-d.</summary>
        public string Polku
        {
            set { kuvio = string.IsNullOrEmpty(value) ? null : SvgKuvio.Jasenna(value); MarkDirtyRepaint(); }
        }

        void Piirra(MeshGenerationContext mgc)
        {
            if (kuvio == null || kuvio.Osat.Count == 0) return;
            var r = contentRect;
            if (r.width <= 0 || r.height <= 0) return;
            float s = Mathf.Min(r.width, r.height) / Ruutu;
            var siirto = new Vector2(r.x + (r.width - Ruutu * s) * 0.5f, r.y + (r.height - Ruutu * s) * 0.5f);
            Vector2 P(Vector2 v) => siirto + v * s;

            var p = mgc.painter2D;
            var vari = resolvedStyle.color;
            bool kaikkiTayteen = ClassListContains("mk-ikoni--tayta");
            p.strokeColor = vari;
            p.fillColor = vari;
            p.lineWidth = Mathf.Max(0.5f, viiva * s);
            p.lineCap = LineCap.Round;
            p.lineJoin = LineJoin.Round;
            foreach (var (polku, tayta) in kuvio.Osat)
            {
                p.BeginPath();
                foreach (var k in polku.Komennot)
                {
                    switch (k.Laji)
                    {
                        case SvgPolku.Laji.Siirry: p.MoveTo(P(k.A)); break;
                        case SvgPolku.Laji.Viiva: p.LineTo(P(k.A)); break;
                        case SvgPolku.Laji.Kaari3: p.BezierCurveTo(P(k.A), P(k.B), P(k.C)); break;
                        case SvgPolku.Laji.Sulje: p.ClosePath(); break;
                    }
                }
                if (tayta || kaikkiTayteen) p.Fill(FillRule.NonZero);
                else p.Stroke();
            }
        }
    }
}
