// LATAUSKUVA (omistaja 8.10.2026 ~08.5x: "Lataus kuvista pitää tehdä kevyesti animoituja. Esim ilmapallo kuva pitää tehdä kahdesta
// osasta uudestaan niin että pallo heiluu hitaasti ruudulla ja köysi piirretään vektorina"; Päätoimittaja: uusi hyväksytty pohja,
// tyylikirja pohjat.LATAUSKUVA). Yksi yhteinen kerroksellinen latauskuva odotusruuduille:
//   tausta      still-kuva (nykyinen latauskuva; isäntä antaa kuvan alan ruudulla, esim. peittävä rajaus)
//   köydet      vektoriviivat (Painter2D) kiintopisteestä liikkuvan kerroksen kiinnityspisteeseen, kevyt riippuma
//   kerrokset   1–2 liikkuvaa kuvaa alfalla; hidas sinimuotoinen heilahdus ja nousu (Ydin LatausLiike, ±1–2°, jakso 6–8 s)
// Latauspalkki ja nimi pysyvät isännän nykyisessä pohjassa (Latauspalkki, mk-astroavaus) tämän päällä. Ilman kerroksia näkyy
// pelkkä still-kuva (ei ajastinta). Esiin heti tai häivyttäen Tyylikirja.Kesto.Avaus (alle 250 ms). Päivitys 30 fps:n tahdissa
// UI:n omalla ajastimella; ei Ruudunpaivitys.Herata-kutsua (hidas liike ei tarvitse täyttä taajuutta, lämpö).
using System.Collections.Generic;
using Matkakirja.Linssit;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Latauskuva
    {
        /// <summary>Liikkuva kerros: kuva alfalla, paikka taustakuvan osuuksina (0–1, y alas), kääntöpiste kerroksen osuuksina.</summary>
        public sealed class Kerros
        {
            public Texture2D Kuva;
            public Rect Paikka;
            public Vector2 Kaanto = new Vector2(0.5f, 0f);
            public LatausLiike.Profiili Liike = LatausLiike.Profiili.Oletus;
        }

        /// <summary>Köysi: kiintopiste taustakuvan osuuksina → kerroksen (indeksi) kiinnityspiste kerroksen osuuksina.</summary>
        public sealed class Koysi
        {
            public Vector2 Kiinto;
            public int Kerros;
            public Vector2 Kiinnitys;
            public float LeveysPt = 1.5f;
            public Color Vari = Tyylikirja.Kehys.MapInk;
            /// <summary>Riippuma köyden pituudesta (0 = suora).</summary>
            public float Riippuma = 0.03f;
        }

        public const int PaivitysMs = 33;

        /// <summary>Juuri (koko isännän ala, ei kosketuksia); isäntä lisää palkin ja nimen tämän päälle.</summary>
        public readonly VisualElement Juuri;
        readonly VisualElement tausta, koysiTaso;
        readonly List<(VisualElement El, Kerros K)> kerrokset = new List<(VisualElement, Kerros)>();
        readonly List<Koysi> koydet = new List<Koysi>();
        IVisualElementScheduledItem ajastin;
        Rect ala;
        float alku;
        bool nakyy;

        public Latauskuva(VisualElement isa)
        {
            Juuri = Taysi(Rakenne.El("mk-latauskuva", isa, PickingMode.Ignore));
            Juuri.style.display = DisplayStyle.None;
            tausta = Rakenne.El("mk-latauskuva__tausta", Juuri, PickingMode.Ignore);
            tausta.style.position = Position.Absolute;
            tausta.style.backgroundSize = new BackgroundSize(Length.Percent(100), Length.Percent(100));
            koysiTaso = Taysi(Rakenne.El("mk-latauskuva__koydet", Juuri, PickingMode.Ignore));
            koysiTaso.generateVisualContent += PiirraKoydet;
        }

        static VisualElement Taysi(VisualElement e)
        {
            e.style.position = Position.Absolute;
            e.style.left = 0; e.style.right = 0; e.style.top = 0; e.style.bottom = 0;
            return e;
        }

        /// <summary>Kerroksia näkyvissä (0 = still-kuva).</summary>
        public int Kerroksia => kerrokset.Count;
        public bool Nakyy => nakyy;

        /// <summary>
        /// Kuvat: tausta (null = ei kuvaa) ja valinnaiset liikkuvat kerrokset ja köydet. Ilman kerroksia still-kuva kuten ennen.
        /// Kerroksen tai köyden puuttuva kuva/indeksi ohitetaan.
        /// </summary>
        public void Aseta(Texture2D taustaKuva, IList<Kerros> uudet = null, IList<Koysi> uudetKoydet = null)
        {
            tausta.style.backgroundImage = taustaKuva != null ? new StyleBackground(taustaKuva) : new StyleBackground(StyleKeyword.None);
            foreach (var (el, _) in kerrokset) el.RemoveFromHierarchy();
            kerrokset.Clear(); koydet.Clear();
            if (uudet != null)
                foreach (var k in uudet)
                {
                    if (k?.Kuva == null) continue;
                    var el = Rakenne.El("mk-latauskuva__kerros", Juuri, PickingMode.Ignore);
                    el.style.position = Position.Absolute;
                    el.style.backgroundImage = new StyleBackground(k.Kuva);
                    el.style.backgroundSize = new BackgroundSize(Length.Percent(100), Length.Percent(100));
                    el.style.transformOrigin = new TransformOrigin(Length.Percent(k.Kaanto.x * 100f), Length.Percent(k.Kaanto.y * 100f));
                    kerrokset.Add((el, k));
                }
            if (uudetKoydet != null)
                foreach (var k in uudetKoydet) if (k != null && k.Kerros >= 0 && k.Kerros < kerrokset.Count) koydet.Add(k);
            Asettele();
            Paivita();
            Kaynnista();
        }

        /// <summary>Taustakuvan ala isännän koordinaateissa (esim. peittävä rajaus); kerrokset ja köydet asettuvat sen mukaan.</summary>
        public void Sovita(Rect kuvaAla)
        {
            if (kuvaAla == ala) return;
            ala = kuvaAla;
            Asettele();
            Paivita();
        }

        void Asettele()
        {
            tausta.style.left = ala.x; tausta.style.top = ala.y; tausta.style.width = ala.width; tausta.style.height = ala.height;
            foreach (var (el, k) in kerrokset)
            {
                el.style.left = ala.x + k.Paikka.x * ala.width; el.style.top = ala.y + k.Paikka.y * ala.height;
                el.style.width = k.Paikka.width * ala.width; el.style.height = k.Paikka.height * ala.height;
            }
        }

        /// <summary>Esiin (häivyttäen Tyylikirja.Kesto.Avaus, tai heti) tai piiloon; liike kulkee vain näkyvissä.</summary>
        public void Nayta(bool nayta, bool haivyta = true)
        {
            if (nayta == nakyy) return;
            nakyy = nayta;
            if (nayta)
            {
                Juuri.style.display = DisplayStyle.Flex;
                if (haivyta)
                {
                    Juuri.style.opacity = 0f;
                    Juuri.style.transitionProperty = new List<StylePropertyName> { "opacity" };
                    Juuri.style.transitionDuration = new List<TimeValue> { new TimeValue(Tyylikirja.Kesto.Avaus, TimeUnit.Millisecond) };
                    Juuri.schedule.Execute(() => { if (nakyy) Juuri.style.opacity = 1f; }).ExecuteLater(16);
                }
                else Juuri.style.opacity = 1f;
                alku = Time.unscaledTime;
                Paivita();
                Kaynnista();
            }
            else
            {
                Juuri.style.display = DisplayStyle.None;
                ajastin?.Pause();
            }
        }

        void Kaynnista()
        {
            bool liikkuu = nakyy && kerrokset.Count > 0;
            if (!liikkuu) { ajastin?.Pause(); return; }
            if (ajastin == null) ajastin = Juuri.schedule.Execute(Paivita).Every(PaivitysMs);
            else ajastin.Resume();
        }

        /// <summary>Kerrosten asento hetkellä nyt − alku (UITK rotate/translate, ei asettelua) ja köysien uudelleenpiirto.</summary>
        void Paivita()
        {
            if (kerrokset.Count == 0) return;
            double t = Time.unscaledTime - alku;
            foreach (var (el, k) in kerrokset)
            {
                var a = LatausLiike.Tila(k.Liike, t);
                el.style.rotate = new Rotate(new Angle((float)a.KulmaAste));
                el.style.translate = new Translate(0f, (float)-a.NousuPt);
            }
            if (koydet.Count > 0) koysiTaso.MarkDirtyRepaint();
        }

        /// <summary>Kerroksen paikallinen piste (osuuksina) isännän koordinaatteihin nykyisessä asennossa.</summary>
        Vector2 KerroksenPiste(int i, Vector2 osuus, double t)
        {
            var k = kerrokset[i].K;
            float x0 = ala.x + k.Paikka.x * ala.width, y0 = ala.y + k.Paikka.y * ala.height;
            float w = k.Paikka.width * ala.width, h = k.Paikka.height * ala.height;
            var p = LatausLiike.Muunna(x0 + osuus.x * w, y0 + osuus.y * h, x0 + k.Kaanto.x * w, y0 + k.Kaanto.y * h, LatausLiike.Tila(k.Liike, t));
            return new Vector2((float)p.X, (float)p.Y);
        }

        void PiirraKoydet(MeshGenerationContext mgc)
        {
            if (koydet.Count == 0 || ala.width <= 0f) return;
            double t = Time.unscaledTime - alku;
            var p = mgc.painter2D;
            p.lineCap = LineCap.Round;
            foreach (var k in koydet)
            {
                var a = new Vector2(ala.x + k.Kiinto.x * ala.width, ala.y + k.Kiinto.y * ala.height);
                var b = KerroksenPiste(k.Kerros, k.Kiinnitys, t);
                var c = LatausLiike.Ohjauspiste(a.x, a.y, b.x, b.y, k.Riippuma);
                p.strokeColor = k.Vari;
                p.lineWidth = k.LeveysPt;
                p.BeginPath();
                p.MoveTo(a);
                p.QuadraticCurveTo(new Vector2((float)c.X, (float)c.Y), b);
                p.Stroke();
            }
        }

        /// <summary>Testi- ja lokikuvaus: näkyvyys, kerrokset asentoineen, köydet.</summary>
        public string Kuvaus()
        {
            var sb = new System.Text.StringBuilder($"latauskuva {(nakyy ? "näkyy" : "piilossa")}, ala {ala.x:0},{ala.y:0} {ala.width:0}×{ala.height:0}, kerroksia {kerrokset.Count}, köysiä {koydet.Count}");
            double t = Time.unscaledTime - alku;
            foreach (var (_, k) in kerrokset)
            {
                var a = LatausLiike.Tila(k.Liike, t);
                sb.Append($" | {a.KulmaAste:+0.00;-0.00}° {a.NousuPt:+0.0;-0.0} pt");
            }
            return sb.ToString();
        }
    }
}
