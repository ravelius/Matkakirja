// LIVIAN KUVA UI Toolkitissa (Natiivi-UI, 23.9.2026).
//
// Kokopulu (webin luoLivianSvg: viewBox 0 0 152+right 304) tai minipulu
// (js/minipulu.js: sama kuva rajattuna viewBoxiin 96 236 58 70). Kutsuja
// antaa joka ruudussa tilan (Aseta); kuva kootaan heti primitiiveiksi
// (LiviaKuvaaja + Kokoaja, ei muistivarauksia) ja piirretään Painter2D:llä
// seuraavassa maalauksessa. Kiinteät polut jäsennetään kerran, joten ruudun
// hinta on muunnosmatriisit ja tesselointi, ei SVG-jäsennystä (webin
// nykimisen syy, ks. js/livia-svg.js luoLivianSvg).
//
// viewBox sovitetaan elementin sisältöalueeseen kuvasuhde säilyttäen:
// kokopulu vasempaan alakulmaan (Oikealle kasvattaa kuvaa oikealle kuten
// webissä, lintu x = 128 pysyy paikallaan), minipulu alas keskelle. Sisus on
// tarkalleen viewBoxin kokoinen ja rajaa sisällön (webin overflow hidden;
// kiireinen ensiliito glideIn saa ylittää reunat kuten webissä).
//
// Kerrokset: pohja (linnun osat pään loppuun asti) → kypärä → etu (lähempi
// siipi ja rekvisiitta). Astronautin kypärä on PNG
// (assets/livia/livia-astronauttikypara-2x.png), joka piirretään tekstuuroituna
// nelikulmiona pään tarkalla affiinimuunnoksella. Astronauttina koko pinta
// leijuu webin CSS-animaation tavoin (5 s, 5 pt, ±3°, keskipiste 72 % 84 %),
// ja leijunta pysähtyy puheen ajaksi (livia-astronautti-puhuu).
//
// Minipulun peilaus (webin suunta 'oikea') hoituu kutsujan style.scale = (−1, 1).
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    /// <summary>Full-body Livia (viewBox 0 0 152+Oikealle 304) or minipulu crop.</summary>
    public sealed class LiviaKuva : VisualElement
    {
        public const string KyparaUrl = "https://matkakirja.app/assets/livia/livia-astronauttikypara-2x.png";

        static Texture2D kyparaKuva;
        static bool kyparaHaussa;
        static float kyparaVirhe = float.NegativeInfinity;

        readonly bool mini;
        readonly LiviaTila tila = new LiviaTila();
        readonly LiviaKuvaaja kuvaaja = new LiviaKuvaaja();
        readonly VisualElement sisus;
        readonly Kerros pohja, etu;
        readonly Kypara kypara;
        Rect viewBox = new Rect(0, 0, 152, 304);
        Rect sisusAla;
        bool ylivuoto;
        IVisualElementScheduledItem leijunta;
        float leijuntaAika;

        public LiviaKuva(bool mini = false)
        {
            this.mini = mini;
            pickingMode = PickingMode.Ignore;
            AddToClassList("mk-livia");
            if (mini)
            {
                AddToClassList("mk-livia--mini");
                viewBox = new Rect(96, 236, 58, 70);
                // Webin minipulu: 56 pt korkea (pieni ruutu), leveys 58/70 korkeudesta.
                style.width = 56 * 58f / 70f;
                style.height = 56;
            }
            else
            {
                style.width = 152;
                style.height = 304;
            }
            sisus = new VisualElement { name = "livia-sisus", pickingMode = PickingMode.Ignore };
            sisus.style.position = Position.Absolute;
            sisus.style.overflow = Overflow.Hidden;
            sisus.style.transformOrigin = new TransformOrigin(Length.Percent(72), Length.Percent(84));
            Add(sisus);
            pohja = new Kerros(this, true);
            kypara = new Kypara(this);
            etu = new Kerros(this, false);
            sisus.Add(pohja);
            sisus.Add(kypara);
            sisus.Add(etu);
            Rakenna();
            RegisterCallback<GeometryChangedEvent>(_ => Sovita());
            RegisterCallback<DetachFromPanelEvent>(_ => leijunta?.Pause());
            RegisterCallback<AttachToPanelEvent>(_ => { if (tila.Astronautti) leijunta?.Resume(); });
        }

        /// <summary>Minipulun korkeus (web minipulu.js asetaKoko: leveys 58/70 korkeudesta).</summary>
        public void MiniKorkeus(float korkeus)
        {
            if (!mini || Mathf.Approximately(resolvedStyle.height, korkeus)) return;
            style.width = korkeus * 58f / 70f;
            style.height = korkeus;
        }

        /// <summary>Tallettaa tilan ja pyytää uuden piirron.</summary>
        public void Aseta(LiviaTila uusi)
        {
            if (uusi == null) return;
            // Sama asento uudelleen: ei koontia eikä maalausta (paitsi kellon mukaan liikkuva leijunta).
            bool kello = uusi.Leiju > 0 && float.IsNaN(uusi.LeijuVaihe);
            if (!kello && tila.Sama(uusi)) return;
            tila.Kopioi(uusi);
            if (!mini)
            {
                float leveys = 152 + Mathf.Max(0, float.IsNaN(tila.Oikealle) ? 0 : tila.Oikealle);
                if (!Mathf.Approximately(leveys, viewBox.width)) { viewBox.width = leveys; Sovita(); }
            }
            Astronauttileijunta(tila.Astronautti);
            Rakenna();
            MarkDirtyRepaint();
            pohja.MarkDirtyRepaint();
            kypara.MarkDirtyRepaint();
            etu.MarkDirtyRepaint();
        }

        /// <summary>Sisus = viewBox sovitettuna sisältöalueeseen (kuvasuhde säilyy).</summary>
        void Sovita()
        {
            var r = contentRect;
            if (r.width <= 0 || r.height <= 0 || float.IsNaN(r.width)) return;
            float s = Mathf.Min(r.width / viewBox.width, r.height / viewBox.height);
            float w = viewBox.width * s, h = viewBox.height * s;
            float x = mini ? r.x + (r.width - w) * 0.5f : r.x;
            float y = r.y + r.height - h;
            var ala = new Rect(x, y, w, h);
            if (ala == sisusAla) return;
            sisusAla = ala;
            sisus.style.left = x; sisus.style.top = y;
            sisus.style.width = w; sisus.style.height = h;
        }

        /// <summary>Kokoaa ruudun primitiivit (kerrokset jakavat saman koonnin).</summary>
        void Rakenna()
        {
            kuvaaja.Kokoa(tila, (float)(Time.unscaledTimeAsDouble * 1000.0));
            if (kuvaaja.Ylivuoto != ylivuoto)
            {
                ylivuoto = kuvaaja.Ylivuoto;
                sisus.style.overflow = ylivuoto ? Overflow.Visible : Overflow.Hidden;
            }
            // Kuvat voi vapauttaa tekstuurin muistista (LRU): silloin haetaan uudelleen
            // (levyvälimuistista). Epäonnistunut haku yritetään uudelleen 30 s päästä.
            if (kuvaaja.KyparaIndeksi >= 0 && kyparaKuva == null && !kyparaHaussa && Time.unscaledTime - kyparaVirhe > 30f)
            {
                kyparaHaussa = true;
                Kuvat.Hae(KyparaUrl, t =>
                {
                    kyparaHaussa = false;
                    kyparaKuva = t;
                    if (t == null) kyparaVirhe = Time.unscaledTime;
                    kypara.MarkDirtyRepaint();
                });
            }
        }

        /// <summary>viewBoxin yksiköt → kerroksen paikalliset pisteet.</summary>
        Affiini Nakyma(Rect r)
        {
            float s = r.width / viewBox.width;
            return new Affiini(s, 0, 0, s, r.x - viewBox.x * s, r.y - viewBox.y * s);
        }

        // --- astronautin leijunta (css/satelliitti.css livia-astronautti-leijuu) ---------

        void Astronauttileijunta(bool paalla)
        {
            if (mini) return;
            if (!paalla)
            {
                if (leijunta != null) { leijunta.Pause(); sisus.style.translate = StyleKeyword.Null; sisus.style.rotate = StyleKeyword.Null; }
                return;
            }
            if (leijunta == null) leijunta = schedule.Execute(Leiju).Every(16);
            else if (!leijunta.isActive) leijunta.Resume();
        }

        void Leiju(TimerState t)
        {
            // Puhe pysäyttää animaation (animation-play-state: paused).
            if (tila.Puhe < 0) leijuntaAika += Mathf.Min(0.1f, t.deltaTime / 1000f);
            float u = leijuntaAika % 5f / 5f;
            float puoli = u < .5f ? u * 2 : (u - .5f) * 2;
            float e = puoli * puoli * (3 - 2 * puoli); // ease-in-out
            float k = u < .5f ? e : 1 - e;            // 0 → 1 → 0
            sisus.style.translate = new Translate(0, -5 * k);
            sisus.style.rotate = new Rotate(new Angle(-3 + 6 * k, AngleUnit.Degree));
        }

        // --- kerrokset ------------------------------------------------------------------

        sealed class Kerros : VisualElement
        {
            readonly LiviaKuva kuva;
            readonly bool alku;

            public Kerros(LiviaKuva kuva, bool alku)
            {
                this.kuva = kuva;
                this.alku = alku;
                pickingMode = PickingMode.Ignore;
                style.position = Position.Absolute;
                style.left = 0; style.top = 0; style.right = 0; style.bottom = 0;
                generateVisualContent += Piirra;
            }

            void Piirra(MeshGenerationContext mgc)
            {
                var r = contentRect;
                if (r.width <= 0 || r.height <= 0) return;
                var k = kuva.kuvaaja;
                int raja = kuva.kuvaaja.KyparaIndeksi >= 0 ? kuva.kuvaaja.KyparaIndeksi : k.K.Osat.Count;
                if (alku) LiviaMaalari.Piirra(mgc.painter2D, k.K, 0, raja, kuva.Nakyma(r));
                else if (raja < k.K.Osat.Count) LiviaMaalari.Piirra(mgc.painter2D, k.K, raja, k.K.Osat.Count, kuva.Nakyma(r));
            }
        }

        /// <summary>Kypärän PNG tekstuuroituna nelikulmiona (webin &lt;image x=-7 y=-10 width=126 height=126&gt;).</summary>
        sealed class Kypara : VisualElement
        {
            static readonly ushort[] Kolmiot = { 0, 1, 2, 0, 2, 3 };
            static readonly ushort[] KolmiotPeili = { 0, 2, 1, 0, 3, 2 };
            readonly LiviaKuva kuva;

            public Kypara(LiviaKuva kuva)
            {
                this.kuva = kuva;
                pickingMode = PickingMode.Ignore;
                style.position = Position.Absolute;
                style.left = 0; style.top = 0; style.right = 0; style.bottom = 0;
                generateVisualContent += Piirra;
            }

            void Piirra(MeshGenerationContext mgc)
            {
                var r = contentRect;
                if (r.width <= 0 || r.height <= 0) return;
                if (kuva.kuvaaja.KyparaIndeksi < 0 || kyparaKuva == null) return;
                var m = kuva.Nakyma(r) * kuva.kuvaaja.KyparaMatriisi;
                const float X = -7, Y = -10, W = 126, H = 126;
                var md = mgc.Allocate(4, 6, kyparaKuva);
                if (md.vertexCount == 0) return;
                var valk = new Color32(255, 255, 255, 255);
                void Kulma(float x, float y, float u, float v)
                {
                    var p = m.Kuvaa(new Vector2(x, y));
                    md.SetNextVertex(new Vertex { position = new Vector3(p.x, p.y, Vertex.nearZ), tint = valk, uv = new Vector2(u, v) });
                }
                // Tekstuurin v kasvaa ylöspäin, kuvan y alaspäin.
                Kulma(X, Y, 0, 1);
                Kulma(X + W, Y, 1, 1);
                Kulma(X + W, Y + H, 1, 0);
                Kulma(X, Y + H, 0, 0);
                // Peilattu muunnos kääntää kiertosuunnan: kolmiot aina myötäpäivään.
                md.SetAllIndices(m.Determinantti >= 0 ? Kolmiot : KolmiotPeili);
            }
        }
    }
}
