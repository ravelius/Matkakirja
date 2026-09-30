// ISS-OHJAUSPÖYDÄN KYTKINMODUULIT (Linssiseppä 30.9.2026; omistaja Päätoimittajan kautta: "vasemman yläreunan säätönapit
// siirtyisivät alareunaan ja ... olisivat oikean avaruusaluksen kytkimen näköisiä. Pyydä Codexilta ne kytkinpalikat moduleina.
// Pitää olla siis samaa estetiikkaa kuin Cupola."). Tilaus posti/fable-codex-iss-kytkimet-20260929.md. Codexin kuvat eivät ole
// vielä tulleet, joten jokainen moduuli piirtää PAIKKAMERKIN (Painter2D) ja vaihtaa sen kuvaan heti, kun kuva löytyy:
//
//   KUVAT YHDELLÄ MUUTOKSELLA: Codexin PNG:t (@3x) kansioon Resources/IssKytkimet/ nimillä <Tiedostot[moduuli]>-<tila>.png
//   (tila normal | active | disabled). Jos Codexin nimet poikkeavat, vain Tiedostot-taulukko muuttuu. Pohja on 9-slice
//   (PohjanSlice kuvan pikseleinä, @3x → skaala 1/3); kiertyvät osat (kiertokytkimen ja nupin nuppi) ovat omia kuviaan, joita
//   peli kiertää style.rotatella, joten kuvassa osoitin osoittaa suoraan ylös.
//
// Tekstit ja luvut piirtää peli (Labelit, Kirjasin.Kone). Kukin moduuli tiloissa Perus / Aktiivinen / Pois. Kosketusalat ≥ 44 pt.
// Moduulit: Pohja, Vipu (suojakannella), Kiertokytkin (2–12 asentoa), Nuppi (jatkuva arvo), Painike (taustavalaistu),
// Lukema (LCD-ikkuna), Merkkivalo. Kokoonpano on IssKytkinpoyta.cs:ssä.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class IssKytkimet
    {
        public enum Moduuli { Pohja, Vipu, Suojakansi, Kiertokytkin, KiertokytkimenNuppi, Nuppi, NupinNuppi, Painike, Lukema, Merkkivalo }
        public enum Tila { Perus, Aktiivinen, Pois }

        /// <summary>Codexin tiedostonimet (ilman tilaa ja päätettä). AINOA muutettava kohta, jos toimituksen nimet poikkeavat.</summary>
        public static readonly Dictionary<Moduuli, string> Tiedostot = new Dictionary<Moduuli, string>
        {
            { Moduuli.Pohja, "console-base" },
            { Moduuli.Vipu, "toggle-lever" },
            { Moduuli.Suojakansi, "toggle-guard" },
            { Moduuli.Kiertokytkin, "rotary-plate" },
            { Moduuli.KiertokytkimenNuppi, "rotary-knob" },
            { Moduuli.Nuppi, "knob-plate" },
            { Moduuli.NupinNuppi, "knob-cap" },
            { Moduuli.Painike, "button-backlit" },
            { Moduuli.Lukema, "readout" },
            { Moduuli.Merkkivalo, "annunciator" },
        };
        static readonly string[] TilaNimet = { "normal", "active", "disabled" };
        /// <summary>Pohjan 9-slice (vasen, ylä, oikea, ala) @3x-kuvan pikseleinä.</summary>
        public static RectOffset PohjanSlice = new RectOffset(48, 48, 36, 36);
        /// <summary>A/B: false = aina paikkamerkit, vaikka kuvat olisivat paikallaan (`astro kyyti kytkinkuvat 0|1`).</summary>
        public static bool KaytaKuvia = true;

        static readonly Dictionary<(Moduuli, Tila), Texture2D> kuvat = new Dictionary<(Moduuli, Tila), Texture2D>();
        static readonly HashSet<(Moduuli, Tila)> haetut = new HashSet<(Moduuli, Tila)>();

        /// <summary>Moduulin kuva tilassa, tai null (paikkamerkki). Puuttuva Aktiivinen/Pois-kuva käyttää Perus-kuvaa.</summary>
        public static Texture2D Kuva(Moduuli m, Tila t)
        {
            if (!KaytaKuvia) return null;
            if (!haetut.Contains((m, t)))
            {
                haetut.Add((m, t));
                kuvat[(m, t)] = Resources.Load<Texture2D>("IssKytkimet/" + Tiedostot[m] + "-" + TilaNimet[(int)t]);
            }
            var k = kuvat[(m, t)];
            return k != null || t == Tila.Perus ? k : Kuva(m, Tila.Perus);
        }

        /// <summary>Onko Codexin sarjaa lainkaan (pohja riittää merkiksi).</summary>
        public static bool KuvatPaikalla => Kuva(Moduuli.Pohja, Tila.Perus) != null;

        // ---- Paikkamerkkien värit (Cupolan tumma ohjaamo: kulunut anodisoitu metalli, lämmin valo) ----
        static readonly Color Metalli = new Color(0.22f, 0.23f, 0.25f), MetalliVaalea = new Color(0.36f, 0.37f, 0.40f),
            Reuna = new Color(0.08f, 0.08f, 0.09f), Ruuvi = new Color(0.55f, 0.56f, 0.58f), Teksti = new Color(0.86f, 0.84f, 0.78f),
            Valo = new Color(1f, 0.72f, 0.32f), Vihrea = new Color(0.35f, 0.95f, 0.45f), Lcd = new Color(0.05f, 0.09f, 0.07f),
            LcdTeksti = new Color(0.55f, 0.95f, 0.6f), Suoja = new Color(0.72f, 0.16f, 0.12f, 0.85f);

        /// <summary>Kytkinmoduulin pohja: tila, kuva tai paikkamerkki.</summary>
        public abstract class Kytkin : VisualElement
        {
            protected readonly Moduuli moduuli;
            Tila tila;
            protected Kytkin(Moduuli m)
            {
                moduuli = m;
                generateVisualContent += Piirra;
                PaivitaKuva();
            }
            public Tila Tila
            {
                get => tila;
                set { if (tila == value) return; tila = value; PaivitaKuva(); MarkDirtyRepaint(); OnTila(); SetEnabled(value != Tila.Pois); }
            }
            protected virtual void OnTila() { }
            protected Texture2D Kuva() => IssKytkimet.Kuva(moduuli, tila);
            protected void PaivitaKuva()
            {
                var k = Kuva();
                style.backgroundImage = k != null ? new StyleBackground(k) : new StyleBackground(StyleKeyword.None);
            }
            void Piirra(MeshGenerationContext mgc)
            {
                if (Kuva() != null) return;
                Paikkamerkki(mgc.painter2D, contentRect);
            }
            /// <summary>Paikkamerkkigrafiikka (Codexin kuvan puuttuessa).</summary>
            protected abstract void Paikkamerkki(Painter2D p, Rect r);
            protected Tila NykyTila => tila;
        }

        static void Levy(Painter2D p, Rect r, float sade, Color tausta, Color reuna, float paksuus = 1.5f)
        {
            p.fillColor = tausta; p.strokeColor = reuna; p.lineWidth = paksuus;
            p.BeginPath();
            p.MoveTo(new Vector2(r.xMin + sade, r.yMin));
            p.ArcTo(new Vector2(r.xMax, r.yMin), new Vector2(r.xMax, r.yMax), sade);
            p.ArcTo(new Vector2(r.xMax, r.yMax), new Vector2(r.xMin, r.yMax), sade);
            p.ArcTo(new Vector2(r.xMin, r.yMax), new Vector2(r.xMin, r.yMin), sade);
            p.ArcTo(new Vector2(r.xMin, r.yMin), new Vector2(r.xMax, r.yMin), sade);
            p.ClosePath(); p.Fill(); p.Stroke();
        }

        static void Ympyra(Painter2D p, Vector2 c, float r, Color tausta, Color reuna, float paksuus = 1.5f)
        {
            p.fillColor = tausta; p.strokeColor = reuna; p.lineWidth = paksuus;
            p.BeginPath(); p.Arc(c, r, Angle.Degrees(0f), Angle.Degrees(360f)); p.ClosePath(); p.Fill(); p.Stroke();
        }

        static void Ruuvit(Painter2D p, Rect r, float sisalla = 5f)
        {
            foreach (var c in new[] { new Vector2(r.xMin + sisalla, r.yMin + sisalla), new Vector2(r.xMax - sisalla, r.yMin + sisalla),
                                      new Vector2(r.xMin + sisalla, r.yMax - sisalla), new Vector2(r.xMax - sisalla, r.yMax - sisalla) })
            {
                Ympyra(p, c, 2f, Ruuvi, Reuna, 0.8f);
                p.strokeColor = Reuna; p.lineWidth = 0.8f;
                p.BeginPath(); p.MoveTo(c + new Vector2(-1.4f, 0)); p.LineTo(c + new Vector2(1.4f, 0)); p.Stroke();
            }
        }

        static Label Nimio(VisualElement isa, string teksti, float koko = 9f)
        {
            var l = new Label(teksti) { pickingMode = PickingMode.Ignore };
            l.style.fontSize = koko; l.style.color = Teksti; l.style.unityTextAlign = TextAnchor.MiddleCenter;
            l.style.marginTop = 0; l.style.marginBottom = 0; l.style.paddingTop = 0; l.style.paddingBottom = 0;
            Kirjasimet.Aseta(l, Kirjasin.Kone);
            isa.Add(l);
            return l;
        }

        // ---- Pohja ----
        public sealed class Pohja : Kytkin
        {
            public Pohja() : base(Moduuli.Pohja)
            {
                style.unitySliceLeft = PohjanSlice.left; style.unitySliceTop = PohjanSlice.top;
                style.unitySliceRight = PohjanSlice.right; style.unitySliceBottom = PohjanSlice.bottom;
                style.unitySliceScale = 1f / 3f;
            }
            protected override void Paikkamerkki(Painter2D p, Rect r)
            {
                Levy(p, r, 10f, new Color(0.13f, 0.135f, 0.15f, 0.96f), MetalliVaalea, 1.5f);
                Ruuvit(p, r, 7f);
            }
        }

        // ---- Merkkivalo ----
        public sealed class Merkkivalo : Kytkin
        {
            readonly VisualElement lamppu;
            public readonly Label Nimi;
            /// <summary>Palaessa: vihreä (LIVE) tai meripihka (nopeutettu).</summary>
            public bool Meripihka { get => meripihka; set { meripihka = value; lamppu.MarkDirtyRepaint(); } }
            bool meripihka;
            public Merkkivalo(string nimi) : base(Moduuli.Merkkivalo)
            {
                style.width = 44; style.height = 36; style.alignItems = Align.Center; style.justifyContent = Justify.FlexStart;
                lamppu = new VisualElement { pickingMode = PickingMode.Ignore };
                lamppu.style.width = 16; lamppu.style.height = 16; lamppu.style.marginTop = 3;
                lamppu.generateVisualContent += mgc =>
                {
                    if (Kuva() != null) return;
                    var c = lamppu.contentRect.center;
                    bool paalla = NykyTila == Tila.Aktiivinen;
                    Ympyra(mgc.painter2D, c, 7f, paalla ? (meripihka ? Valo : Vihrea) : new Color(0.12f, 0.14f, 0.12f), Reuna, 1.2f);
                };
                Add(lamppu);
                Nimi = Nimio(this, nimi, 8.5f);
                Nimi.style.marginTop = 2;
            }
            protected override void OnTila() => lamppu.MarkDirtyRepaint();
            protected override void Paikkamerkki(Painter2D p, Rect r) { }
        }

        // ---- Lukema ----
        public sealed class Lukema : Kytkin
        {
            public readonly Label Rivi1, Rivi2;
            public Lukema() : base(Moduuli.Lukema)
            {
                style.minHeight = 30; style.paddingLeft = 8; style.paddingRight = 8; style.paddingTop = 3; style.paddingBottom = 3;
                style.justifyContent = Justify.Center; pickingMode = PickingMode.Ignore;
                Rivi1 = Nimio(this, "", 11f); Rivi1.style.color = LcdTeksti; Rivi1.style.unityTextAlign = TextAnchor.MiddleLeft;
                Rivi2 = Nimio(this, "", 9.5f); Rivi2.style.color = LcdTeksti; Rivi2.style.unityTextAlign = TextAnchor.MiddleLeft;
                Rivi2.style.display = DisplayStyle.None;
                Rivi1.style.whiteSpace = WhiteSpace.NoWrap; Rivi1.style.overflow = Overflow.Hidden; Rivi1.style.textOverflow = TextOverflow.Ellipsis;
                Rivi2.style.whiteSpace = WhiteSpace.NoWrap; Rivi2.style.overflow = Overflow.Hidden; Rivi2.style.textOverflow = TextOverflow.Ellipsis;
            }
            public void Aseta(string r1, string r2)
            {
                Rivi1.text = r1 ?? "";
                Rivi2.text = r2 ?? "";
                Rivi2.style.display = string.IsNullOrEmpty(r2) ? DisplayStyle.None : DisplayStyle.Flex;
            }
            protected override void Paikkamerkki(Painter2D p, Rect r) => Levy(p, r, 4f, Lcd, new Color(0.3f, 0.32f, 0.3f), 1.5f);
        }

        /// <summary>Moduuli, jolla on otsikko alla ja kosketusala vähintään 44 × 44 pt.</summary>
        public abstract class Saadin : Kytkin
        {
            public readonly VisualElement Laatta;
            public readonly Label Otsikko;
            protected Saadin(Moduuli m, string otsikko, float leveys) : base(m)
            {
                style.width = leveys; style.alignItems = Align.Center; style.minHeight = 64;
                Laatta = new VisualElement { pickingMode = PickingMode.Ignore };
                Laatta.style.width = 48; Laatta.style.height = 48; Laatta.style.alignItems = Align.Center; Laatta.style.justifyContent = Justify.Center;
                Add(Laatta);
                Otsikko = Nimio(this, otsikko, 8.5f);
                Otsikko.style.marginTop = 2;
            }
        }

        // ---- Kiertokytkin ----
        public sealed class Kiertokytkin : Saadin
        {
            readonly string[] asennot;
            readonly VisualElement nuppi;
            readonly Label arvo;
            readonly Action<int> valittu;
            int asento;
            float vetoX;
            bool vedetty;
            const float Kaari = 100f;   // asentojen kaari asteina
            public Kiertokytkin(string otsikko, string[] asennot, Action<int> valittu, float leveys = 62f)
                : base(Moduuli.Kiertokytkin, otsikko, leveys)
            {
                this.asennot = asennot; this.valittu = valittu;
                nuppi = new VisualElement { pickingMode = PickingMode.Ignore };
                nuppi.style.width = 36; nuppi.style.height = 36;
                nuppi.generateVisualContent += mgc =>
                {
                    if (IssKytkimet.Kuva(Moduuli.KiertokytkimenNuppi, NykyTila) != null) return;
                    var p = mgc.painter2D; var c = nuppi.contentRect.center;
                    Ympyra(p, c, 16f, MetalliVaalea, Reuna, 1.5f);
                    Ympyra(p, c, 11f, Metalli, Reuna, 1f);
                    p.strokeColor = NykyTila == Tila.Aktiivinen ? Valo : Teksti; p.lineWidth = 2.5f; p.lineCap = LineCap.Round;
                    p.BeginPath(); p.MoveTo(c); p.LineTo(c + new Vector2(0, -15f)); p.Stroke();
                };
                Laatta.Add(nuppi);
                arvo = Nimio(this, "", 9f);
                arvo.style.color = Valo;
                arvo.style.position = Position.Absolute; arvo.style.top = -12; arvo.style.left = 0; arvo.style.right = 0;
                PaivitaNuppi();
                RegisterCallback<PointerDownEvent>(e => { vetoX = e.position.x; vedetty = false; this.CapturePointer(e.pointerId); });
                RegisterCallback<PointerMoveEvent>(e =>
                {
                    if (!this.HasPointerCapture(e.pointerId)) return;
                    float dx = e.position.x - vetoX;
                    if (Mathf.Abs(dx) < 22f) return;
                    vedetty = true; vetoX = e.position.x;
                    Valitse(Mathf.Clamp(asento + (dx > 0 ? 1 : -1), 0, asennot.Length - 1));
                });
                RegisterCallback<PointerUpEvent>(e =>
                {
                    if (!this.HasPointerCapture(e.pointerId)) return;
                    this.ReleasePointer(e.pointerId);
                    if (!vedetty) Valitse((asento + 1) % asennot.Length);   // napautus: seuraava asento
                });
            }
            protected override void Paikkamerkki(Painter2D p, Rect r)
            {
                // Laatta ja asentomerkit kaaren varrella (kaiverretut viivat, ei tekstiä).
                var c = Laatta.layout.center; if (Laatta.layout.width <= 0) return;
                Levy(p, new Rect(c.x - 24, c.y - 24, 48, 48), 6f, Metalli, Reuna, 1.2f);
                p.strokeColor = Teksti; p.lineWidth = 1.2f;
                for (int i = 0; i < asennot.Length; i++)
                {
                    float a = (Kulma(i) - 90f) * Mathf.Deg2Rad;
                    var d = new Vector2(Mathf.Cos(a), Mathf.Sin(a));
                    p.BeginPath(); p.MoveTo(c + d * 19f); p.LineTo(c + d * 23f); p.Stroke();
                }
            }
            float Kulma(int i) => asennot.Length <= 1 ? 0f : -Kaari * 0.5f + Kaari * i / (asennot.Length - 1);
            void PaivitaNuppi()
            {
                nuppi.style.rotate = new Rotate(Kulma(asento));
                var k = IssKytkimet.Kuva(Moduuli.KiertokytkimenNuppi, NykyTila);
                nuppi.style.backgroundImage = k != null ? new StyleBackground(k) : new StyleBackground(StyleKeyword.None);
                arvo.text = asento >= 0 && asento < asennot.Length ? asennot[asento] : "";
                nuppi.MarkDirtyRepaint();
            }
            protected override void OnTila() => PaivitaNuppi();
            void Valitse(int i)
            {
                if (i == asento || NykyTila == Tila.Pois) return;
                asento = i; PaivitaNuppi(); valittu?.Invoke(i);
            }
            /// <summary>Asento pelin tilasta (ei kutsu valittu-toimintoa); −1 = ei asentoa (kelaus).</summary>
            public void Aseta(int i, string teksti = null)
            {
                asento = i; PaivitaNuppi();
                if (teksti != null) arvo.text = teksti;
            }
            public int Asento => asento;
        }

        // ---- Nuppi (jatkuva) ----
        public sealed class Nuppi : Saadin
        {
            readonly VisualElement korkki;
            readonly Label arvo;
            readonly float min, max;
            readonly bool kokonaisluku;
            readonly Action<float> muuttui;
            float arvoNyt, vetoY;
            const float Kaari = 270f;
            public Nuppi(string otsikko, float min, float max, Action<float> muuttui, bool kokonaisluku = false, float leveys = 62f)
                : base(Moduuli.Nuppi, otsikko, leveys)
            {
                this.min = min; this.max = max; this.muuttui = muuttui; this.kokonaisluku = kokonaisluku;
                korkki = new VisualElement { pickingMode = PickingMode.Ignore };
                korkki.style.width = 34; korkki.style.height = 34;
                korkki.generateVisualContent += mgc =>
                {
                    if (IssKytkimet.Kuva(Moduuli.NupinNuppi, NykyTila) != null) return;
                    var p = mgc.painter2D; var c = korkki.contentRect.center;
                    Ympyra(p, c, 15f, new Color(0.16f, 0.16f, 0.17f), Reuna, 1.5f);
                    p.strokeColor = Valo; p.lineWidth = 2.5f; p.lineCap = LineCap.Round;
                    p.BeginPath(); p.MoveTo(c + new Vector2(0, -6f)); p.LineTo(c + new Vector2(0, -14f)); p.Stroke();
                };
                Laatta.Add(korkki);
                arvo = Nimio(this, "", 9f);
                arvo.style.color = Valo;
                arvo.style.position = Position.Absolute; arvo.style.top = -12; arvo.style.left = -8; arvo.style.right = -8;
                RegisterCallback<PointerDownEvent>(e => { vetoY = e.position.y; this.CapturePointer(e.pointerId); });
                RegisterCallback<PointerMoveEvent>(e =>
                {
                    if (!this.HasPointerCapture(e.pointerId) || NykyTila == Tila.Pois) return;
                    float dy = vetoY - e.position.y; vetoY = e.position.y;
                    // Pystyveto: 140 pt = koko alue (ylös kasvaa).
                    float v = Mathf.Clamp(arvoNyt + dy / 140f * (max - min), min, max);
                    if (kokonaisluku) v = Mathf.Round(v * 4f) / 4f;
                    if (Mathf.Abs(v - arvoNyt) < 1e-4f) return;
                    arvoNyt = v; PaivitaKorkki();
                    muuttui?.Invoke(kokonaisluku ? Mathf.Round(v) : v);
                });
                RegisterCallback<PointerUpEvent>(e => { if (this.HasPointerCapture(e.pointerId)) this.ReleasePointer(e.pointerId); });
                PaivitaKorkki();
            }
            protected override void Paikkamerkki(Painter2D p, Rect r)
            {
                var c = Laatta.layout.center; if (Laatta.layout.width <= 0) return;
                Levy(p, new Rect(c.x - 24, c.y - 24, 48, 48), 6f, Metalli, Reuna, 1.2f);
                // Asteikko: 11 viivaa kaarella (kaiverrettu, ei tekstiä).
                p.strokeColor = Teksti; p.lineWidth = 1f;
                for (int i = 0; i <= 10; i++)
                {
                    float a = (-Kaari * 0.5f + Kaari * i / 10f - 90f) * Mathf.Deg2Rad;
                    var d = new Vector2(Mathf.Cos(a), Mathf.Sin(a));
                    p.BeginPath(); p.MoveTo(c + d * (i % 5 == 0 ? 18f : 20f)); p.LineTo(c + d * 23f); p.Stroke();
                }
            }
            void PaivitaKorkki()
            {
                float t = max > min ? (arvoNyt - min) / (max - min) : 0f;
                korkki.style.rotate = new Rotate(-Kaari * 0.5f + Kaari * t);
                var k = IssKytkimet.Kuva(Moduuli.NupinNuppi, NykyTila);
                korkki.style.backgroundImage = k != null ? new StyleBackground(k) : new StyleBackground(StyleKeyword.None);
            }
            /// <summary>Arvo ja näkyvä lukema pelin tilasta (ei kutsu muuttui-toimintoa).</summary>
            public void Aseta(float v, string teksti)
            {
                arvoNyt = Mathf.Clamp(v, min, max); PaivitaKorkki();
                arvo.text = teksti ?? "";
            }
        }

        // ---- Taustavalaistu painike ----
        public sealed class Painike : Saadin
        {
            public readonly Label Legenda;
            public Painike(string otsikko, string legenda, Action painettu, float leveys = 62f)
                : base(Moduuli.Painike, otsikko, leveys)
            {
                Legenda = Nimio(Laatta, legenda, 10f);
                Legenda.style.whiteSpace = WhiteSpace.Normal;
                this.AddManipulator(new Clickable(() => { if (NykyTila != Tila.Pois) painettu?.Invoke(); }));
            }
            protected override void OnTila() => Legenda.style.color = NykyTila == Tila.Aktiivinen ? new Color(0.14f, 0.1f, 0.05f) : Teksti;
            protected override void Paikkamerkki(Painter2D p, Rect r)
            {
                var c = Laatta.layout.center; if (Laatta.layout.width <= 0) return;
                var lr = new Rect(c.x - 23, c.y - 20, 46, 40);
                Levy(p, lr, 5f, MetalliVaalea, Reuna, 1.5f);
                var sisa = new Rect(lr.x + 4, lr.y + 4, lr.width - 8, lr.height - 8);
                Levy(p, sisa, 3f, NykyTila == Tila.Aktiivinen ? Valo : new Color(0.2f, 0.19f, 0.17f), Reuna, 1f);
            }
        }

        // ---- Vipukytkin suojakannella ----
        public sealed class Vipu : Saadin
        {
            readonly VisualElement vipu, kansi;
            readonly Action heitetty;
            bool kansiAuki, alhaalla;
            IVisualElementScheduledItem paluu;
            /// <summary>Napautus 1 avaa suojakannen, napautus 2 heittää vivun (toiminto); kansi sulkeutuu 2 s:n päästä.</summary>
            public Vipu(string otsikko, Action heitetty, float leveys = 62f) : base(Moduuli.Vipu, otsikko, leveys)
            {
                this.heitetty = heitetty;
                vipu = new VisualElement { pickingMode = PickingMode.Ignore };
                vipu.style.position = Position.Absolute; vipu.style.left = 0; vipu.style.right = 0; vipu.style.top = 0; vipu.style.bottom = 0;
                vipu.generateVisualContent += mgc =>
                {
                    if (IssKytkimet.Kuva(Moduuli.Vipu, NykyTila) != null) return;
                    var p = mgc.painter2D; var c = vipu.contentRect.center;
                    Levy(p, new Rect(c.x - 20, c.y - 22, 40, 44), 5f, Metalli, Reuna, 1.2f);
                    Ympyra(p, c, 6f, Ruuvi, Reuna, 1f);
                    p.strokeColor = new Color(0.85f, 0.86f, 0.88f); p.lineWidth = 4f; p.lineCap = LineCap.Round;
                    p.BeginPath(); p.MoveTo(c); p.LineTo(c + new Vector2(0, alhaalla ? 15f : -15f)); p.Stroke();
                };
                kansi = new VisualElement { pickingMode = PickingMode.Ignore };
                kansi.style.position = Position.Absolute; kansi.style.left = 4; kansi.style.right = 4; kansi.style.top = 2; kansi.style.bottom = 2;
                kansi.style.transformOrigin = new TransformOrigin(Length.Percent(50), Length.Percent(0), 0);
                kansi.generateVisualContent += mgc =>
                {
                    if (IssKytkimet.Kuva(Moduuli.Suojakansi, NykyTila) != null) return;
                    var r = kansi.contentRect;
                    Levy(mgc.painter2D, r, 5f, Suoja, Reuna, 1.5f);
                };
                Laatta.Add(vipu); Laatta.Add(kansi);
                this.AddManipulator(new Clickable(Napautus));
                PaivitaOsat();
            }
            void Napautus()
            {
                if (NykyTila == Tila.Pois) return;
                paluu?.Pause();
                if (!kansiAuki) { kansiAuki = true; PaivitaOsat(); paluu = schedule.Execute(Palauta).StartingIn(4000); return; }
                alhaalla = true; PaivitaOsat();
                heitetty?.Invoke();
                paluu = schedule.Execute(Palauta).StartingIn(2000);
            }
            void Palauta() { kansiAuki = false; alhaalla = false; PaivitaOsat(); }
            void PaivitaOsat()
            {
                Tila = alhaalla ? Tila.Aktiivinen : NykyTila == Tila.Pois ? Tila.Pois : Tila.Perus;
                kansi.style.scale = new Scale(new Vector3(1f, kansiAuki ? 0.18f : 1f, 1f));   // kansi kääntyy ylös (sivuprofiili)
                var kv = IssKytkimet.Kuva(Moduuli.Vipu, NykyTila);
                vipu.style.backgroundImage = kv != null ? new StyleBackground(kv) : new StyleBackground(StyleKeyword.None);
                var kk = IssKytkimet.Kuva(Moduuli.Suojakansi, kansiAuki ? Tila.Aktiivinen : Tila.Perus);
                kansi.style.backgroundImage = kk != null ? new StyleBackground(kk) : new StyleBackground(StyleKeyword.None);
                vipu.MarkDirtyRepaint(); kansi.MarkDirtyRepaint();
            }
            protected override void Paikkamerkki(Painter2D p, Rect r) { }
            public bool KansiAuki => kansiAuki;
        }
    }
}
