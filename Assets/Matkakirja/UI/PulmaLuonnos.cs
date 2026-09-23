// PULMAN LUONNOS (Natiivi-UI, erä 3): isoisän luonnoskirjan piirros UI Toolkitilla.
//
// Suora käännös verkkopelin piirtäjistä js/packs/africa-puzzles.js
// (piirraAfrikanPulma: hieroglyfit, punnukset, naksutus, kuunvaiheet,
// vesileilit) ja js/packs/europe-puzzles.js (piirraEuroopanPulma: roomalaiset,
// pylvaat, suolaaltaat, geysir, laiturit, kukko). Samat SVG-polut ja luvut
// (viewBox-yksiköissä) jäsennetään SvgPolulla ja piirretään Painter2D:llä
// mustetyylillä (.quiz-sketch .ink: viiva 1,6, pyöreät päät; .ink-fill:
// täyttö 0,72 + viiva 1,2; väri #3b2a18). Tekstit (.ink-text, keskitetty,
// y = perusviiva) ovat absoluuttisia Labeleita, koska Painter2D ei piirrä tekstiä.
//
// Elementti on webin tapaan 320 × 150 -kuvasuhteinen (aspect-ratio) ja
// viewBox sovitetaan sen sisään (preserveAspectRatio meet). Kuunvaiheiden
// clipPath-varjostus lasketaan suoraan viivojen päätepisteiksi (UI Toolkitissa
// ei ole leikkauspolkuja). Tuntematon pulma → varapiirros (kehys ja kysymysmerkki).
using System;
using System.Collections.Generic;
using System.Globalization;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class PulmaLuonnos : VisualElement
    {
        const float Suhde = 150f / 320f;
        static readonly Color Muste = new Color(0x3b / 255f, 0x2a / 255f, 0x18 / 255f, 1f);

        enum Laji : byte { Viiva, Tayte }

        readonly struct Osa
        {
            public readonly SvgPolku Polku; public readonly Laji Laji; public readonly Vector2 Siirto; public readonly float Mitta;
            public Osa(SvgPolku p, Laji l, Vector2 s, float m) { Polku = p; Laji = l; Siirto = s; Mitta = m; }
        }

        readonly struct TekstiOsa
        {
            public readonly Label Label; public readonly Vector2 Paikka; public readonly float Koko;
            public TekstiOsa(Label l, Vector2 p, float k) { Label = l; Paikka = p; Koko = k; }
        }

        readonly List<Osa> osat = new List<Osa>();
        readonly List<TekstiOsa> tekstit = new List<TekstiOsa>();
        Vector2 ruutu = new Vector2(320, 150);
        // Nykyinen muunnos (SVG:n <g transform="translate(…) scale(…)">).
        Vector2 siirto;
        float mitta = 1f;

        /// <summary>Piirtääkö pulma varapiirroksen (tuntematon tunniste).</summary>
        public bool Vara { get; private set; }

        public PulmaLuonnos(string pulmaId, Dictionary<string, object> data)
        {
            AddToClassList("mk-luonnos");
            pickingMode = PickingMode.Ignore;
            generateVisualContent += Piirra;
            RegisterCallback<GeometryChangedEvent>(_ => Asettele());
            Rakenna(pulmaId ?? "", data ?? new Dictionary<string, object>());
        }

        // --- asettelu ja piirto ------------------------------------------------

        (float S, Vector2 O) Sovitus()
        {
            var r = contentRect;
            float s = Mathf.Min(r.width / ruutu.x, r.height / ruutu.y);
            if (float.IsNaN(s) || s <= 0) return (0, Vector2.zero);
            return (s, new Vector2(r.x + (r.width - ruutu.x * s) * 0.5f, r.y + (r.height - ruutu.y * s) * 0.5f));
        }

        void Asettele()
        {
            // aspect-ratio: 320 / 150 (korkeus leveydestä; vain muuttuessa, ettei asettelu kierrä).
            float leveys = resolvedStyle.width;
            if (!float.IsNaN(leveys) && leveys > 0)
            {
                float korkeus = Mathf.Round(leveys * Suhde);
                if (Mathf.Abs(resolvedStyle.height - korkeus) > 0.5f) style.height = korkeus;
            }
            var (s, o) = Sovitus();
            if (s <= 0) return;
            foreach (var t in tekstit)
            {
                float koko = t.Koko * s;
                t.Label.style.fontSize = koko;
                // Label on 400 pt leveä ja keskitetty pisteeseen; perusviiva ≈ 0,9 em laatikon yläreunasta.
                t.Label.style.left = o.x + t.Paikka.x * s - 200f;
                t.Label.style.top = o.y + t.Paikka.y * s - koko * 0.92f;
            }
            MarkDirtyRepaint();
        }

        void Piirra(MeshGenerationContext mgc)
        {
            var (s, o) = Sovitus();
            if (s <= 0) return;
            var p = mgc.painter2D;
            p.lineCap = LineCap.Round;
            p.lineJoin = LineJoin.Round;
            foreach (var osa in osat)
            {
                var siirtoO = osa.Siirto; float m = osa.Mitta;
                Vector2 P(Vector2 v) => o + (siirtoO + v * m) * s;
                p.BeginPath();
                foreach (var k in osa.Polku.Komennot)
                {
                    switch (k.Laji)
                    {
                        case SvgPolku.Laji.Siirry: p.MoveTo(P(k.A)); break;
                        case SvgPolku.Laji.Viiva: p.LineTo(P(k.A)); break;
                        case SvgPolku.Laji.Kaari3: p.BezierCurveTo(P(k.A), P(k.B), P(k.C)); break;
                        case SvgPolku.Laji.Sulje: p.ClosePath(); break;
                    }
                }
                if (osa.Laji == Laji.Tayte)
                {
                    p.fillColor = new Color(Muste.r, Muste.g, Muste.b, 0.72f);
                    p.Fill(FillRule.NonZero);
                    p.strokeColor = Muste;
                    p.lineWidth = Mathf.Max(0.5f, 1.2f * m * s);
                    p.Stroke();
                }
                else
                {
                    p.strokeColor = Muste;
                    p.lineWidth = Mathf.Max(0.5f, 1.6f * m * s);
                    p.Stroke();
                }
            }
        }

        // --- piirtoapurit (webin ink, fill, text, el('circle'|'rect')) -----------

        static string F(double v) => v.ToString("0.###", CultureInfo.InvariantCulture);
        static string Inv(FormattableString s) => FormattableString.Invariant(s);

        void Ink(string d) => osat.Add(new Osa(SvgPolku.Jasenna(d), Laji.Viiva, siirto, mitta));
        void Fill(string d) => osat.Add(new Osa(SvgPolku.Jasenna(d), Laji.Tayte, siirto, mitta));

        void Ympyra(double cx, double cy, double r, bool tayta = false)
        {
            var d = $"M{F(cx - r)} {F(cy)}A{F(r)} {F(r)} 0 1 0 {F(cx + r)} {F(cy)}A{F(r)} {F(r)} 0 1 0 {F(cx - r)} {F(cy)}Z";
            if (tayta) Fill(d); else Ink(d);
        }

        void Suorakulmio(double x, double y, double w, double h) => Ink($"M{F(x)} {F(y)}h{F(w)}v{F(h)}h{F(-w)}Z");

        /// <summary>Katkoviivasuorakulmio (stroke-dasharray "3 3").</summary>
        void KatkoSuorakulmio(double x, double y, double w, double h, double viiva = 3, double vali = 3)
        {
            var sb = new System.Text.StringBuilder();
            var kulmat = new[] { (x, y), (x + w, y), (x + w, y + h), (x, y + h), (x, y) };
            double kertyma = 0; bool piirto = true;
            for (int i = 1; i < kulmat.Length; i++)
            {
                var (ax, ay) = kulmat[i - 1]; var (bx, by) = kulmat[i];
                double pituus = Math.Sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)), kuljettu = 0;
                while (kuljettu < pituus - 1e-6)
                {
                    double askel = Math.Min((piirto ? viiva : vali) - kertyma, pituus - kuljettu);
                    double t0 = kuljettu / pituus, t1 = (kuljettu + askel) / pituus;
                    if (piirto) sb.Append($"M{F(ax + (bx - ax) * t0)} {F(ay + (by - ay) * t0)}L{F(ax + (bx - ax) * t1)} {F(ay + (by - ay) * t1)}");
                    kuljettu += askel; kertyma += askel;
                    if (kertyma >= (piirto ? viiva : vali) - 1e-6) { piirto = !piirto; kertyma = 0; }
                }
            }
            if (sb.Length > 0) Ink(sb.ToString());
        }

        void Teksti(double x, double y, string teksti, double koko = 13)
        {
            var l = new Label(teksti) { pickingMode = PickingMode.Ignore, enableRichText = false };
            l.AddToClassList("mk-luonnos__teksti");
            Kirjasimet.Aseta(l, Kirjasin.Kone);
            Add(l);
            tekstit.Add(new TekstiOsa(l, siirto + new Vector2((float)x, (float)y) * mitta, (float)(koko * mitta)));
        }

        void Ryhma(double x, double y, double m = 1) { siirto = new Vector2((float)x, (float)y); mitta = (float)m; }
        void RyhmaPois() { siirto = Vector2.zero; mitta = 1f; }

        // --- datan luku (MiniJson: double, List<object>, string, bool) ----------

        static double Luku(object o, double oletus)
        {
            switch (o)
            {
                case double d: return d;
                case float f: return f;
                case int i: return i;
                case long l: return l;
                case string s when double.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out var v): return v;
                default: return oletus;
            }
        }

        static double Luku(Dictionary<string, object> d, string avain, double oletus) =>
            d.TryGetValue(avain, out var o) ? Luku(o, oletus) : oletus;

        static List<object> Lista(Dictionary<string, object> d, string avain) =>
            d.TryGetValue(avain, out var o) ? o as List<object> : null;

        static double[] Luvut(object o, double[] oletus)
        {
            if (!(o is List<object> l) || l.Count == 0) return oletus;
            var t = new double[l.Count];
            for (int i = 0; i < l.Count; i++) t[i] = Luku(l[i], 0);
            return t;
        }

        static string[] Tekstit(object o, string[] oletus)
        {
            if (!(o is List<object> l) || l.Count == 0) return oletus;
            var t = new string[l.Count];
            for (int i = 0; i < l.Count; i++) t[i] = l[i] is double d ? F(d) : Convert.ToString(l[i], CultureInfo.InvariantCulture) ?? "";
            return t;
        }

        static string Teksti(Dictionary<string, object> d, string avain, string oletus) =>
            d.TryGetValue(avain, out var o) && o is string s ? s : oletus;

        // --- piirrokset -----------------------------------------------------------

        void Rakenna(string id, Dictionary<string, object> d)
        {
            switch (id)
            {
                case "hieroglyfit": Hieroglyfit(d); break;
                case "punnukset": Punnukset(d); break;
                case "naksutus": Naksutus(d); break;
                case "kuunvaiheet": Kuunvaiheet(d); break;
                case "vesileilit": Vesileilit(d); break;
                case "roomalaiset": Roomalaiset(d); break;
                case "pylvaat": Pylvaat(d); break;
                case "suolaaltaat": Suolaaltaat(d); break;
                case "geysir": Geysir(d); break;
                case "laiturit": Laiturit(d); break;
                case "kukko": Kukko(d); break;
                default: Varapiirros(); break;
            }
        }

        /// <summary>Tuntematon pulma: luonnoskirjan sivu, jossa kysymysmerkki (webissä piirros jää tyhjäksi).</summary>
        void Varapiirros()
        {
            Vara = true;
            KatkoSuorakulmio(40, 14, 240, 122, 5, 4);
            Teksti(160, 36, "ISOISÄN LUONNOS", 11);
            Ympyra(160, 86, 26);
            Teksti(160, 96, "?", 28);
        }

        // Kairo: sauva = 1, kaari = 10, köysikiehkura = 100; kolme esimerkkiriviä ja kysytty.
        void Hieroglyfit(Dictionary<string, object> d)
        {
            var esimerkit = new List<double[]>();
            var lista = Lista(d, "esimerkit");
            if (lista != null) foreach (var r in lista) esimerkit.Add(Luvut(r, new double[] { 0, 0, 0 }));
            if (esimerkit.Count == 0) esimerkit.AddRange(new[] { new double[] { 0, 0, 3 }, new double[] { 0, 2, 3 }, new double[] { 1, 3, 1 } });
            var kysytty = Luvut(d.TryGetValue("kysytty", out var k) ? k : null, new double[] { 2, 1, 3 });

            void Sauva(double x, double y) => Ink(Inv($"M{x},{y - 8} L{x},{y + 8}"));
            void Kaari(double x, double y) => Ink(Inv($"M{x - 6},{y + 8} L{x - 6},{y - 2} q6,-9 12,0 L{x + 6},{y + 8}"));
            void Kiehkura(double x, double y) => Ink(Inv($"M{x + 7},{y + 5} q-13,3 -12,-6 q1,-8 9,-7 q7,1 6,7 q-1,5 -6,4 q-4,-1 -3,-4"));

            void Rivi(double y, double[] r, string arvo)
            {
                double x = 30;
                var merkit = new (Action<double, double> Piirra, double Kpl)[]
                {
                    (Kiehkura, r.Length > 0 ? r[0] : 0), (Kaari, r.Length > 1 ? r[1] : 0), (Sauva, r.Length > 2 ? r[2] : 0),
                };
                foreach (var (piirra, kpl) in merkit)
                {
                    for (int i = 0; i < (int)kpl; i++) { piirra(x, y); x += 16; }
                    if (kpl > 0) x += 8; // väli merkkilajien välissä
                }
                Teksti(258, y + 5, arvo, 15);
            }
            double Arvo(double[] r) => (r.Length > 0 ? r[0] : 0) * 100 + (r.Length > 1 ? r[1] : 0) * 10 + (r.Length > 2 ? r[2] : 0);

            for (int i = 0; i < esimerkit.Count; i++) Rivi(22 + i * 34, esimerkit[i], F(Arvo(esimerkit[i])));
            Ink("M24,108 L286,108");
            Rivi(132, kysytty, "?");
        }

        // Kumasi: kaksivartinen vaaka tasapainossa, kysytty punnus katkoviivalla.
        void Punnukset(Dictionary<string, object> d)
        {
            double kulta = Luku(d, "kulta", 10), vasen = Luku(d, "vasen", 2);
            var oikea = Luvut(d.TryGetValue("oikea", out var o) ? o : null, new double[] { 5, 4 });
            Ryhma(160, 20);
            Ink("M0,96 L0,10 M-78,10 L78,10");
            Fill("M-14,104 L14,104 L8,96 L-8,96 z");
            Ink("M-78,10 L-78,30 M78,10 L78,30");
            Ink("M-104,30 q26,20 52,0 M40,30 q38,22 76,0");
            Fill("M-96,30 q-6,-16 7,-20 q10,-4 14,6 q4,11 -4,14 z");
            Ink("M-90,12 L-82,12");
            Teksti(-86, 52, F(kulta), 12);
            Suorakulmio(-68, 14, 16, 16);
            Teksti(-60, 27, F(vasen), 12);
            Ink("M44,26 L62,26 L53,8 z");
            Teksti(53, 46, F(oikea.Length > 0 ? oikea[0] : 5), 12);
            Ink("M70,17 L79,6 L88,17 L79,28 z");
            Teksti(79, 46, F(oikea.Length > 1 ? oikea[1] : 4), 12);
            KatkoSuorakulmio(96, 8, 18, 18);
            Teksti(105, 46, "?", 13);
            RyhmaPois();
        }

        // Kapkaupunki: kolme suun poikkileikkausta (c, x, q) datan järjestyksessä.
        void Naksutus(Dictionary<string, object> d)
        {
            var merkit = new[] { ("c", 0), ("x", 1), ("q", 2) };
            var jarjestys = Luvut(d.TryGetValue("jarjestys", out var j) ? j : null, new double[] { 0, 1, 2 });
            for (int i = 0; i < jarjestys.Length; i++)
            {
                int idx = Mathf.Clamp((int)jarjestys[i], 0, 2);
                var (merkki, kohta) = merkit[idx];
                Ryhma(56 + i * 104, 14);
                Ink("M-30,6 q30,-12 58,2");
                Ink("M-30,52 q30,12 58,-4");
                Ink("M-26,6 L-26,15 M-20,7 L-20,16");
                Ink("M8,3 L8,12 M16,4 L16,13");
                Fill("M-20,40 q20,-12 40,-6 q-16,12 -40,6 z");
                if (kohta == 0)
                {
                    Ympyra(-24, 14, 2.6, true);
                    Ink("M-30,22 L-46,22");
                    Fill("M-46,22 l7,-3 l0,6 z");
                }
                else if (kohta == 1)
                {
                    Ympyra(10, 14, 2.6, true);
                    Ink("M10,14 q10,-10 22,-14");
                    Fill("M32,0 l-7,1 l3,5 z");
                }
                else
                {
                    Ympyra(-6, 12, 2.6, true);
                    Ink("M-6,16 L-6,34");
                    Fill("M-6,34 l-3,-7 l6,0 z");
                }
                Teksti(0, 74, merkki, 17);
            }
            RyhmaPois();
        }

        /// <summary>
        /// Web piirraKuu: kehä ja pimeän osan vaakaviivat. Pimeä osa alkaa vasemmasta
        /// reunasta ja päättyy terminaattoriellipsiin x = cx + r(1 − 2v)·√(1 − (dy/r)²);
        /// vähenevä kuu on peilikuva.
        /// </summary>
        void Kuu(double cx, double cy, double valaistu, bool peilaa, double r = 20)
        {
            Ympyra(cx, cy, r);
            if (valaistu >= 1) return;
            for (double y = cy - r; y <= cy + r + 1e-6; y += 4)
            {
                double dy = y - cy, h = Math.Sqrt(Math.Max(0, r * r - dy * dy));
                if (h < 0.3) continue;
                double xa = cx - h;
                double xb = valaistu <= 0 ? cx + h : cx + r * (1 - 2 * valaistu) * (h / r);
                if (peilaa) { xa = 2 * cx - xa; xb = 2 * cx - xb; }
                if (Math.Abs(xb - xa) < 0.2) continue;
                Ink($"M{F(xa)},{F(y)} L{F(xb)},{F(y)}");
            }
        }

        // Timbuktu: käsikirjoitussivu ja kolme kuunvaihetta, neljäs kysymysmerkkinä.
        void Kuunvaiheet(Dictionary<string, object> d)
        {
            var sarja = new List<(double V, bool Peilaa)>();
            var lista = Lista(d, "sarja");
            if (lista != null)
                foreach (var o in lista)
                    if (o is Dictionary<string, object> k)
                        sarja.Add((Luku(k, "v", 0), k.TryGetValue("peilaa", out var p) && p is bool b && b));
            if (sarja.Count == 0) sarja.AddRange(new[] { (0.0, false), (0.18, false), (0.5, false) });

            Ink("M10,6 L310,6 L310,144 L10,144 z");
            Ink("M15,11 L305,11 L305,139 L15,139 z");
            Ink("M120,26 q30,4 60,0 q40,-4 100,0");
            Ink("M120,36 q30,4 60,0 q40,-4 100,0");
            Ink("M186,46 q24,4 48,0 q30,-4 46,0");
            foreach (var (sx, sy) in new[] { (32, 26), (288, 26) })
                Ink(Inv($"M{sx},{sy - 6} L{sx},{sy + 6} M{sx - 6},{sy} L{sx + 6},{sy}"));
            for (int i = 0; i < sarja.Count; i++) Kuu(70 + i * 60, 92, sarja[i].V, sarja[i].Peilaa);
            Ympyra(70 + sarja.Count * 60, 92, 20);
            Teksti(70 + sarja.Count * 60, 99, "?", 20);
            Ink("M50,124 L270,124");
        }

        // Sahara: kaksi nahkaleiliä (3 ja 5) ja ympyröity tavoite.
        void Vesileilit(Dictionary<string, object> d)
        {
            double tavoite = Luku(d, "tavoite", 4);
            void Leili(double x, double y, double koko, string merkki)
            {
                Ryhma(x, y, koko);
                Ink("M0,-26 q-30,6 -30,30 q0,26 30,26 q30,0 30,-26 q0,-24 -30,-30 z");
                Ink("M-7,-27 L-7,-40 q7,-4 14,0 L7,-27");
                Ink("M-9,-38 q9,5 18,0");
                Ink("M-30,0 q-7,4 0,8 M30,0 q7,4 0,8");
                Teksti(0, 12, merkki, 22);
                RyhmaPois();
            }
            Leili(78, 62, 0.78, "3");
            Leili(226, 56, 1, "5");
            Ympyra(160, 132, 14);
            Teksti(160, 139, F(tavoite), 17);
        }

        // Rooma: kolme kiveen hakattua lukua arvoineen, neljäs ratkaistaan.
        void Roomalaiset(Dictionary<string, object> d)
        {
            var rivit = Tekstit(d.TryGetValue("rivit", out var r) ? r : null, new[] { "VII", "XXIV", "LX" });
            var arvot = Tekstit(d.TryGetValue("arvot", out var a) ? a : null, new[] { "7", "24", "60" });
            ruutu = new Vector2(260, 150);
            Teksti(130, 18, "KIVEEN HAKATUT LUVUT", 11);
            Ink("M28,26 L232,26");
            for (int i = 0; i < rivit.Length; i++)
            {
                double y = 52 + i * 26;
                Teksti(72, y, rivit[i], 19);
                Teksti(128, y, "=", 14);
                Teksti(172, y, i < arvot.Length ? arvot[i] : "", 17);
            }
            Ink("M28,124 L232,124");
            Teksti(72, 143, Teksti(d, "kysytty", "XLII"), 19);
            Teksti(128, 143, "=", 14);
            Teksti(172, 143, "?", 19);
        }

        // Ateena: yksi pylväänpää isona ilman nimeä (vaihtoehdot ovat valokuvia).
        void Pylvaat(Dictionary<string, object> d)
        {
            string tyyli = Teksti(d, "kysytty", "joonialainen");
            ruutu = new Vector2(200, 120);
            Teksti(100, 16, "ISOISÄN LUONNOS", 11);
            double x = 100, y = 44;
            Fill(Inv($"M{x - 11},{y} L{x + 11},{y} L{x + 9},{y + 46} L{x - 9},{y + 46} Z"));
            foreach (var dx in new[] { -5, 0, 5 }) Ink(Inv($"M{x + dx},{y + 4} L{x + dx},{y + 44}"));
            if (tyyli == "doorilainen")
                Fill(Inv($"M{x - 15},{y - 10} L{x + 15},{y - 10} L{x + 15},{y} L{x - 15},{y} Z"));
            else if (tyyli == "joonialainen")
            {
                Ink(Inv($"M{x - 15},{y - 4} L{x + 15},{y - 4}"));
                Ink(Inv($"M{x - 8},{y - 6} q-9,-2 -8,-7 q1,-5 6,-4 q4,1 3,4"));
                Ink(Inv($"M{x + 8},{y - 6} q9,-2 8,-7 q-1,-5 -6,-4 q-4,1 -3,4"));
            }
            else
            {
                Ink(Inv($"M{x - 14},{y - 2} L{x + 14},{y - 2}"));
                foreach (var dx in new[] { -9, 0, 9 }) Ink(Inv($"M{x + dx},{y - 3} q-4,-8 0,-14 q4,6 0,14"));
            }
            Teksti(100, 112, "Mikä valokuvista näyttää saman pään?", 9);
        }

        // Dubrovnik (Ston): neljä allasta syvyyksineen, haihtuminen ja päivät alla.
        void Suolaaltaat(Dictionary<string, object> d)
        {
            var syvyydet = Luvut(d.TryGetValue("syvyydet", out var s) ? s : null, new double[] { 8, 10, 12, 14 });
            var kirjaimet = Tekstit(d.TryGetValue("kirjaimet", out var k) ? k : null, new[] { "A", "B", "C", "D" });
            double haihtuu = Luku(d, "haihtuu", 2), paivia = Luku(d, "paivia", 5);
            ruutu = new Vector2(260, 160);
            Teksti(130, 16, "SUOLA-ALTAAT — VEDEN SYVYYS", 11);
            for (int i = 0; i < syvyydet.Length; i++)
            {
                double x = 26 + i * 58, cm = syvyydet[i], h = Math.Min(48, cm * 3);
                Ink(Inv($"M{x},44 L{x},96 L{x + 44},96 L{x + 44},44"));
                Fill($"M{F(x + 2)},{F(96 - h)} L{F(x + 42)},{F(96 - h)} L{F(x + 42)},94 L{F(x + 2)},94 Z");
                Teksti(x + 22, 112, F(cm) + " cm", 12);
                Teksti(x + 22, 36, i < kirjaimet.Length ? kirjaimet[i] : "", 13);
            }
            Ink("M14,124 L246,124");
            Teksti(130, 140, $"Vettä haihtuu {F(haihtuu)} cm päivässä.", 11);
            Teksti(130, 154, $"Suola on valmista, kun allas on kuiva {F(paivia)} päivän kuluttua.", 11);
        }

        // Islanti: kolme purkausta kellonaikoineen, neljäs kysymysmerkkinä.
        void Geysir(Dictionary<string, object> d)
        {
            var ajat = Tekstit(d.TryGetValue("ajat", out var a) ? a : null, new[] { "10:00", "10:07", "10:14" });
            ruutu = new Vector2(300, 158);
            Teksti(150, 16, "GEYSIRIN PURKAUKSET", 11);
            Ink("M20,106 L280,106");
            var xs = new[] { 56, 118, 180, 242 };
            for (int i = 0; i < xs.Length; i++)
            {
                int x = xs[i];
                if (i < 3)
                {
                    Ink(Inv($"M{x},106 L{x - 7},74 L{x - 2},66 L{x},56 L{x + 3},68 L{x + 7},78 L{x},106"));
                    Teksti(x, 124, i < ajat.Length ? ajat[i] : "", 13);
                }
                else
                {
                    Teksti(x, 82, "?", 22);
                    Teksti(x, 124, "?", 14);
                }
            }
            Ink("M20,136 L280,136");
            Teksti(150, 151, "Purkausten väli on aina sama.", 11);
        }

        // Venetsia: vedenpinta ja neljä kulkusiltaa senttimetreinä.
        void Laiturit(Dictionary<string, object> d)
        {
            var korkeudet = Luvut(d.TryGetValue("korkeudet", out var k) ? k : null, new double[] { 80, 95, 110, 65 });
            double vesi = Luku(d, "vesi", 90);
            const double Pohja = 138;
            double Y(double cm) => Pohja - cm * 0.7;
            ruutu = new Vector2(300, 168);
            Teksti(150, 16, "VUOROVESI JA KULKUSILLAT", 11);
            double yv = Y(vesi);
            Fill($"M14,{F(yv)} L286,{F(yv)} L286,{F(Pohja)} L14,{F(Pohja)} Z");
            Ink($"M14,{F(yv)} L286,{F(yv)}");
            var xs = new[] { 50, 118, 186, 254 };
            for (int i = 0; i < korkeudet.Length && i < xs.Length; i++)
            {
                double x = xs[i], cm = korkeudet[i], yp = Y(cm);
                Ink($"M{F(x - 16)},{F(yp)} L{F(x + 16)},{F(yp)}");
                Ink($"M{F(x - 12)},{F(yp)} L{F(x - 12)},{F(Pohja)}");
                Ink($"M{F(x + 12)},{F(yp)} L{F(x + 12)},{F(Pohja)}");
                Teksti(x, yp - 6, F(cm) + " cm", 11);
            }
            Teksti(150, Pohja + 16, $"Vesi nousee {F(vesi)} cm.", 11);
        }

        // Pariisi: tuulikukko ja pääilmansuunnat; nokka osoittaa suunnan.
        void Kukko(Dictionary<string, object> d)
        {
            double kulma = Luku(d, "kulma", -45);
            const double Cx = 100, Cy = 106;
            ruutu = new Vector2(200, 200);
            Teksti(Cx, 18, "TUULIKUKKO", 11);
            Teksti(Cx, Cy - 72, "P", 13);
            Teksti(Cx + 80, Cy + 4, "I", 13);
            Teksti(Cx, Cy + 84, "E", 13);
            Teksti(Cx - 80, Cy + 4, "L", 13);
            Ink(Inv($"M{Cx},{Cy - 62} L{Cx},{Cy + 62}"));
            Ink(Inv($"M{Cx - 62},{Cy} L{Cx + 62},{Cy}"));
            double rad = kulma * Math.PI / 180, ux = Math.Cos(rad), uy = Math.Sin(rad);
            string P(double a, double p) => F(Cx + ux * a - uy * p) + "," + F(Cy + uy * a + ux * p);
            Ink($"M{P(-30, 0)} L{P(30, 0)}");
            Fill($"M{P(30, 7)} L{P(6, 8)} L{P(-18, 5)} L{P(-18, -5)} L{P(6, -8)} L{P(30, -7)} Z");
            Fill($"M{P(56, 0)} L{P(34, 9)} L{P(34, -9)} Z");
            Ink($"M{P(30, -7)} L{P(35, -14)} M{P(22, -8)} L{P(26, -15)}");
            Ink($"M{P(-18, -3)} L{P(-32, -10)}");
            Ink($"M{P(-18, 3)} L{P(-32, 10)}");
        }
    }
}
