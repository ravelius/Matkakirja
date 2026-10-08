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
// Avaruuskävelyasu (Päätoimittaja 30.9.2026, omistajan tilaus; Codexin haara codex-pulu-avaruuskavely e09b4467):
// astronauttina kokopulu piirretään Codexin viidestä 2×-kerroskuvasta (Resources/LiviaEva, 304 × 608 = viewBox 152 × 304
// ilman omaa siirtoa tai skaalaa) järjestyksessä turvaköysi, perus, kasvovalo, kypärälamput, maavalo. Kolmen valokerroksen
// peittävyys tulee tilasta (EvaValo: yöllä kasvovalo ja lamput vahvoina, päivällä maan valo). Perus on lepoasento, joten
// asussa ei ole eleitä eikä nokan liikettä; leijunta ja puhetauko ovat koko sisuksen liikettä kuten ennen. Kun Codex
// korjaa kuvat, samat tiedostot vaihdetaan sekä webiin (assets/livia/livia-eva-*-2x.png) että tänne. A/B EvaPois
// (`astro eva pois|paalla`) palauttaa kypäräpulun.
//
// Robottikäsi (omistajan OK 2.10.2026, Codexin haara codex-pulu-robottikasi b557f749; web js/livia-svg.js evaRobottikasi):
// astronauttina Pulun jalat ovat robottivarren jalkatuessa. Sommitelma nostetaan 75 yksikköä kuten webissä (eva-robotti-
// sommittelu translate(0 −75)), jotta varsi näkyy alareunasta; järjestys varsi (152 × 800) → varren reunavalo (Maan valo) →
// keinuva Pulu (perus, kasvovalo, kypärälamput, maavalo) ja robotin turvaköysi → jalkapidikkeet. Varsi ei liiku: sisuksen
// leijunta on pois, vain Pulu keinuu ±2° / 6 s jalkojen ympäri (113, 300), pysähtyy puheen ajaksi ja vähennetyllä liikkeellä.
// Vanha vapaapäinen turvaköysi jää pois. A/B RobottiPois (`astro eva robotti pois|paalla`).
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
        static readonly string[] EvaKerrokset = { "turvakoysi", "perus", "kasvovalo", "kyparalamput", "maavalo" };
        static Texture2D[] evaKuvat;
        static Texture2D kasvoKuva;
        /// <summary>A/B: avaruuskävelyasu pois (vanha kypäräpulu).</summary>
        public static bool EvaPois;
        static readonly string[] RobottiKerrokset = { "robotin-varsi", "robotin-reunavalo", "robotin-turvakoysi", "robotin-pidikkeet" };
        static Texture2D[] robottiKuvat;
        /// <summary>A/B: robottikäsi pois (vapaa turvaköysi ja leijunta kuten ennen).</summary>
        public static bool RobottiPois;
        /// <summary>Robottikäsi näkyy (Pulu asettelee itsensä vasempaan alakulmaan 60 %:iin; omistaja 2.10. 21.3x).</summary>
        public bool RobottiNakyy => Robotissa;

        /// <summary>ISS:n valospotti Pulun päällä (Cupolan ikkunan takana): spotin ulkopuoli, kuten tukivarsi, tummuu siluetiksi.</summary>
        public bool Valospotti
        {
            get => valospotti;
            set { if (valospotti == value) return; valospotti = value; eva.MarkDirtyRepaint(); }
        }
        bool valospotti;
        /// <summary>Spotin keskipiste (viewBox, ennen 75:n nostoa: kypärän alapuoli / rintakehä) sekä täysvalon ja täyden varjon säteet.</summary>
        const float SpottiX = 113f, SpottiY = 285f, SpottiSisa = 55f, SpottiUlko = 125f;

        /// <summary>
        /// Vaakatilan este robottikäden puomille (ISS-kyydin pienen paneelin vasen yläkulma paneelin pisteinä, null = ei estettä):
        /// puomi nousee loivasti niin, että se kulkee esteen yli 6 pt:n välillä (Päätoimittaja 3.10.: Pulu vaakana alakulmaan).
        /// </summary>
        public Vector2? VarrenEste
        {
            get => varrenEste;
            set { if (varrenEste == value) return; varrenEste = value; eva.MarkDirtyRepaint(); }
        }
        Vector2? varrenEste;

        /// <summary>
        /// Robottikäden puomin alin kohta paneelin pisteinä viimeisimmästä piirrosta (NaN = ei puomia) ja piirron järjestysnumero.
        /// Pulu nostaa itseään tällä palautteella ISS-kyydin pöydän yläpuolelle (kaava-arvio jäi 12–20 pt liian alas, kuva 87cc4931).
        /// </summary>
        public float VarrenAlin { get; internal set; } = float.NaN;
        public int VarrenAlinVersio { get; internal set; }

        /// <summary>Puomin alin kohta EVA-kerroksen alareunasta (pt; siirrosta riippumaton, joten Pulu laskee paikkansa suoraan).</summary>
        public float VarrenAlinEvasta { get; internal set; } = float.NaN;

        /// <summary>Kyynärpään (puomin nivelen) alareuna EVA-kerroksen alareunasta (pt): Pulu ikkunan takana vie sen lasin reunan taakse.</summary>
        public float KyynarEvasta { get; internal set; } = float.NaN;

        /// <summary>Kypärän (visiirin) keskipiste EVA-kerroksen alareunasta (pt), robottikädessä; Pulu sijoittaa sillä kypärän korkeuden.</summary>
        public float KyparaEvasta { get; internal set; } = float.NaN;

        /// <summary>EVA-kerroksen alareuna paneelin pisteinä nykyisessä asettelussa.</summary>
        public float EvaAla => eva.worldBound.yMax;
        static bool kyparaHaussa;
        static float kyparaVirhe = float.NegativeInfinity;

        readonly bool mini;
        readonly LiviaTila tila = new LiviaTila();
        readonly LiviaKuvaaja kuvaaja = new LiviaKuvaaja();
        readonly VisualElement sisus;
        readonly Kerros pohja, etu;
        readonly Kypara kypara;
        readonly Eva eva;
        Rect viewBox = new Rect(0, 0, 152, 304);
        Rect sisusAla;
        bool ylivuoto;
        IVisualElementScheduledItem leijunta;
        float leijuntaAika;
        float keinuntaAika, keinunta;

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
            eva = new Eva(this);
            sisus.Add(pohja);
            sisus.Add(kypara);
            sisus.Add(etu);
            sisus.Add(eva);
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
            eva.MarkDirtyRepaint();
        }

        /// <summary>
        /// Vain kypärä ilman avaruuspukua ja robottikättä (omistaja 3.10.2026 klo 07.5x: "Maapallon vierellä pulu voi olla pelkkää kypärä
        /// päässään ilman pukua ja robotti kättä"): astronautin kameran kaukonäkymässä tavallinen Pulu ja kypäräkerros (Kypara), kuten
        /// ennen avaruuskävelyasua. Pulu asettaa (IssKyytiNakyma.KaukoNakyma).
        /// </summary>
        public bool VainKypara
        {
            get => vainKypara;
            set
            {
                if (vainKypara == value) return;
                vainKypara = value;
                Rakenna();
                MarkDirtyRepaint(); pohja.MarkDirtyRepaint(); kypara.MarkDirtyRepaint(); etu.MarkDirtyRepaint(); eva.MarkDirtyRepaint();
            }
        }
        bool vainKypara;

        /// <summary>Asu näkyy: kokopulu astronauttina ja kerroskuvat ladattu.</summary>
        bool EvaNakyy
        {
            get
            {
                if (mini || !tila.Astronautti || EvaPois || vainKypara) return false;
                if (evaKuvat == null)
                {
                    evaKuvat = new Texture2D[EvaKerrokset.Length];
                    for (int i = 0; i < EvaKerrokset.Length; i++) evaKuvat[i] = Resources.Load<Texture2D>("LiviaEva/" + EvaKerrokset[i]);
                    // Kasvot kypärävalossa (omistaja 3.10.2026 "pulun kasvot pitää näkyä"): perus.png:n visiirin alue lämpimästi
                    // valaistuna (kertova valo R 2,4 / G 2,05 / B 1,55 keskeltä reunaa kohti; pupillit pysyvät tummina). Vain Soikio käyttää.
                    kasvoKuva = Resources.Load<Texture2D>("LiviaEva/perus-kasvot");
                }
                return evaKuvat[1] != null;
            }
        }

        /// <summary>Robottikäsi näkyy: asu näkyy ja robotin kerroskuvat ladattu.</summary>
        bool Robotissa
        {
            get
            {
                if (RobottiPois || !EvaNakyy) return false;
                if (robottiKuvat == null)
                {
                    robottiKuvat = new Texture2D[RobottiKerrokset.Length];
                    for (int i = 0; i < RobottiKerrokset.Length; i++) robottiKuvat[i] = Resources.Load<Texture2D>("LiviaEva/" + RobottiKerrokset[i]);
                }
                return robottiKuvat[0] != null;
            }
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
            bool yv = kuvaaja.Ylivuoto || Robotissa;   // robottikäden varsi ulottuu ruudun oikeaan reunaan
            if (yv != ylivuoto)
            {
                ylivuoto = yv;
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
            if (Robotissa)
            {
                // Varsi paikallaan (webin .livia-lentonayttamo animation: none), vain Pulu keinuu ±2° / 6 s (livia-eva-jalkatuessa).
                if (sisus.style.translate != StyleKeyword.Null) { sisus.style.translate = StyleKeyword.Null; sisus.style.rotate = StyleKeyword.Null; }
                float vanha = keinunta;
                if (LinssiUi.VahennettyLiike()) keinunta = 0;
                else
                {
                    if (tila.Puhe < 0) keinuntaAika += Mathf.Min(0.1f, t.deltaTime / 1000f);
                    float uk = keinuntaAika % 6f / 6f, pk = uk < .5f ? uk * 2 : (uk - .5f) * 2, ek = pk * pk * (3 - 2 * pk);
                    keinunta = -2 + 4 * (uk < .5f ? ek : 1 - ek);
                }
                if (!Mathf.Approximately(vanha, keinunta)) eva.MarkDirtyRepaint();
                return;
            }
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
                if (kuva.EvaNakyy) return;
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
                if (kuva.kuvaaja.KyparaIndeksi < 0 || kyparaKuva == null || kuva.EvaNakyy) return;
                var m = kuva.Nakyma(r) * kuva.kuvaaja.KyparaMatriisi;
                const float X = -7, Y = -10, W = 126, H = 126;
                var md = mgc.Allocate(4, 6, kyparaKuva);
                if (md.vertexCount == 0) return;
                var valk = Tyylikirja.Kehys.Valkoinen;
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

        /// <summary>Avaruuskävelyasun kerroskuvat viewBoxin 0 0 152 304 päälle; valokerrokset tilan peittävyydellä.</summary>
        sealed class Eva : VisualElement
        {
            static readonly ushort[] Kolmiot = { 0, 1, 2, 0, 2, 3 };
            static readonly ushort[] KolmiotPeili = { 0, 2, 1, 0, 3, 2 };
            readonly LiviaKuva kuva;

            public Eva(LiviaKuva kuva)
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
                if (r.width <= 0 || r.height <= 0 || !kuva.EvaNakyy) return;
                var m = kuva.Nakyma(r);
                var t = kuva.tila;
                if (kuva.Robotissa) { Robotti(mgc, m, t); return; }
                for (int i = 0; i < evaKuvat.Length; i++)
                {
                    var kuvaI = evaKuvat[i];
                    if (kuvaI == null) continue;
                    float alfa = i == 2 ? t.EvaKasvo : i == 3 ? t.EvaLamput : i == 4 ? t.EvaMaa : 1f;
                    if (alfa <= 0.004f) continue;
                    var md = mgc.Allocate(4, 6, kuvaI);
                    if (md.vertexCount == 0) continue;
                    var savy = Valkoinen(alfa);
                    void Kulma(float x, float y, float u, float v)
                    {
                        var p = m.Kuvaa(new Vector2(x, y));
                        md.SetNextVertex(new Vertex { position = new Vector3(p.x, p.y, Vertex.nearZ), tint = savy, uv = new Vector2(u, v) });
                    }
                    // Tekstuurin v kasvaa ylöspäin, kuvan y alaspäin.
                    Kulma(0, 0, 0, 1);
                    Kulma(152, 0, 1, 1);
                    Kulma(152, 304, 1, 0);
                    Kulma(0, 304, 0, 0);
                    md.SetAllIndices(m.Determinantti >= 0 ? Kolmiot : KolmiotPeili);
                }
            }

            /// <summary>Kerroskuvan sävy: valkoinen (kuva sellaisenaan) peittävyydellä alfa.</summary>
            static Color Valkoinen(float alfa) => new Color(1, 1, 1, Mathf.Clamp01(alfa));

            /// <summary>
            /// Robottikäden kerrokset (webin eva-robotti-sommittelu; omistaja 2.10. 21.3x): kaikki 75 yksikköä ylös; Pulu ja robotin
            /// turvaköysi kierrettynä keinunnan kulmalla pisteen (113, 300) ympäri. Pulu on VARJOKUVA (perus, varsi, köysi ja pidikkeet
            /// tummina, Maan reunavalo ennallaan) ja vain kasvot loistavat kypärävalossa (kasvovalo täysi). Varsi kulkee jalkatuesta
            /// ensimmäiseen niveleen pystyssä ja sieltä vaakasuoraan ruudun oikean reunan yli aluksen (ISS) suuntaan.
            /// </summary>
            void Robotti(MeshGenerationContext mgc, Affiini m, LiviaTila t)
            {
                const float Nosto = -75;
                // Varren ensimmäinen nivel (kuvassa px 248, 818 → yksiköt 124, 409) ja puomin pää (y 800).
                const float NivelX = 124, NivelY = 409, PaaY = 800, Poikittain = 0.6f;
                // Vaakaosan läpinäkymätön kaista alkaa kuvan x:stä 31,5 (robotin-varsi.png, mitattu 3.10.): se on puomin alareuna.
                const float VarsiMinX = 31.5f;
                float a = kuva.keinunta * Mathf.Deg2Rad, ca = Mathf.Cos(a), sa = Mathf.Sin(a);
                var varjo = (Color)Tyylikirja.LasiAvaruus.Pinta;
                varjo = Color.Lerp(varjo, Color.white, 0.14f); varjo.a = 1f;
                // Ruudun oikea reuna viewBoxin yksiköissä (elementti voi olla skaalattu: worldBound / contentRect).
                var r = contentRect;
                var wb = worldBound;
                float leveys = panel != null ? panel.visualTree.layout.width : 0f;
                float sx = r.width > 0 ? wb.width / r.width : 1f, s1 = r.width / kuva.viewBox.width;
                float reunaX = leveys > 0 && sx > 0 && s1 > 0 ? (leveys - wb.xMin) / (sx * s1) + kuva.viewBox.x + 60f : 600f;
                float venytys = Mathf.Max(0.2f, (reunaX - NivelX) / (PaaY - NivelY));
                // Puomin nousu (yksikköä per yksikkö oikealle): alareuna nivelessä on VarsiMinX-kaistan reuna (diagnostiikka 1875fff9: NivelY + Nosto
                // jäi 33 pt liian ylös), ja esteen kohdalla sen pitää olla
                // 6 pt esteen yläpuolella. Ilman estettä vaaka kuten ennen.
                float nousu = 0f;
                if (kuva.VarrenEste is Vector2 este && sx > 0 && s1 > 0 && r.height > 0)
                {
                    float sy = wb.height / r.height;
                    float ex = (este.x - wb.xMin) / (sx * s1) + kuva.viewBox.x, ey = (este.y - wb.yMin) / (sy * s1) + kuva.viewBox.y;
                    float vara = 6f / (sy * s1);
                    if (ex > NivelX + 1f) nousu = Mathf.Max(0f, (NivelY - (VarsiMinX - NivelX) * Poikittain + Nosto - (ey - vara)) / (ex - NivelX));
                }
                // VALOSPOTTI (omistaja 3.10.2026: "ISS:n oma valospotti valaisee pulua, mutta tukivarsi jää jo varjon puolelle … pallomaisella
                // gradient-maskilla, joka tummentaisi spotin ulkopuoliset alueet"): Cupolan ikkunan takana (Valospotti) kerrokset piirretään
                // ruudukkona, ja kärkien sävy tummuu spotin keskipisteestä (kypärän ja vartalon kohta) ulospäin pehmeästi siluetiksi.
                bool spotti = kuva.Valospotti;
                // Siluetti = varjosävy (Tyylikirja.LasiAvaruus.Pinta) tummennettuna kertoimella, ei uutta värivakiota (pohjavahti).
                var siluetti = varjo * 0.45f; siluetti.a = 1f;
                Color Spotissa(Color pohja, float x, float y)
                {
                    float d = new Vector2(x - SpottiX, (y - SpottiY) * 0.8f).magnitude;   // hieman pystysuunnassa venytetty pallo
                    float w = 1f - Mathf.SmoothStep(0f, 1f, Mathf.InverseLerp(SpottiSisa, SpottiUlko, d));
                    var c = Color.Lerp(siluetti, pohja, w); c.a = pohja.a; return c;
                }
                void Kuva(Texture2D kuvaI, float korkeus, float alfa, bool keinuu, Color savyPohja, float y0 = 0, float y1 = -1, bool vaaka = false)
                {
                    if (kuvaI == null || alfa <= 0.004f) return;
                    if (y1 < 0) y1 = korkeus;
                    // Ilman spottia yksi nelikulmio kuten ennen; spotissa 3 × 16 ruudukko, jotta gradientti seuraa kärkien sävyä.
                    int sar = spotti ? 3 : 1, riv = spotti ? 16 : 1;
                    var md = mgc.Allocate((sar + 1) * (riv + 1), sar * riv * 6, kuvaI);
                    if (md.vertexCount == 0) return;
                    var savy = savyPohja; savy.a *= Mathf.Clamp01(alfa);
                    void Kulma(float x, float y)
                    {
                        float u = x / 152f, v = 1f - y / korkeus;
                        if (vaaka) { float dx = x - NivelX, dy = y - NivelY; x = NivelX + dy * venytys; y = NivelY - dx * Poikittain - dy * venytys * nousu; }
                        if (keinuu) { float dx = x - 113, dy = y - 300; x = 113 + dx * ca - dy * sa; y = 300 + dx * sa + dy * ca; }
                        var p = m.Kuvaa(new Vector2(x, y + Nosto));
                        md.SetNextVertex(new Vertex { position = new Vector3(p.x, p.y, Vertex.nearZ), tint = spotti ? Spotissa(savy, x, y) : savy, uv = new Vector2(u, v) });
                    }
                    for (int j = 0; j <= riv; j++)
                        for (int i = 0; i <= sar; i++)
                            Kulma(152f * i / sar, y0 + (y1 - y0) * j / riv);
                    var ind = new ushort[sar * riv * 6];
                    bool suora = m.Determinantti >= 0;
                    int q = 0;
                    for (int j = 0; j < riv; j++)
                        for (int i = 0; i < sar; i++)
                        {
                            ushort a0 = (ushort)(j * (sar + 1) + i), a1 = (ushort)(a0 + 1), b0 = (ushort)(a0 + sar + 1), b1 = (ushort)(b0 + 1);
                            if (suora) { ind[q++] = a0; ind[q++] = a1; ind[q++] = b1; ind[q++] = a0; ind[q++] = b1; ind[q++] = b0; }
                            else { ind[q++] = a0; ind[q++] = b1; ind[q++] = a1; ind[q++] = a0; ind[q++] = b0; ind[q++] = b1; }
                        }
                    md.SetAllIndices(ind);
                }
                var valo = Color.white;
                // Visiirin soikio (kasvot, viewBox x 90–137, y 237–280) perus-kuvasta sävyttämättä varjokuvan päälle: kasvot näkyvät.
                void Soikio(Texture2D kuvaI, float cx, float cy, float rx, float ry, Color savy)
                {
                    const int N = 28;
                    if (kuvaI == null) return;
                    var md = mgc.Allocate(N + 1, N * 3, kuvaI);
                    if (md.vertexCount == 0) return;
                    void Piste(float x, float y)
                    {
                        float u = x / 152f, v = 1f - y / 304f;
                        float dx = x - 113, dy = y - 300; x = 113 + dx * ca - dy * sa; y = 300 + dx * sa + dy * ca;
                        var p = m.Kuvaa(new Vector2(x, y + Nosto));
                        md.SetNextVertex(new Vertex { position = new Vector3(p.x, p.y, Vertex.nearZ), tint = savy, uv = new Vector2(u, v) });
                    }
                    Piste(cx, cy);
                    for (int i = 0; i < N; i++) { float th = i * Mathf.PI * 2f / N; Piste(cx + rx * Mathf.Cos(th), cy + ry * Mathf.Sin(th)); }
                    var ind = new ushort[N * 3];
                    bool suora = m.Determinantti >= 0;
                    for (int i = 0; i < N; i++)
                    {
                        ushort b0 = (ushort)(1 + i), b1 = (ushort)(1 + (i + 1) % N);
                        ind[i * 3] = 0; ind[i * 3 + 1] = suora ? b0 : b1; ind[i * 3 + 2] = suora ? b1 : b0;
                    }
                    md.SetAllIndices(ind);
                }
                // Varsi kahdessa osassa: jalkatuki ja ranne pystyyn niveleen asti, loput vaakaan (venytettynä reunaan).
                Kuva(robottiKuvat[0], 800, 1f, false, varjo, 0, NivelY + 6);
                Kuva(robottiKuvat[0], 800, 1f, false, varjo, NivelY, PaaY, vaaka: true);
                Kuva(robottiKuvat[1], 800, t.EvaMaa, false, valo, 0, NivelY + 6);
                Kuva(robottiKuvat[1], 800, t.EvaMaa, false, valo, NivelY, PaaY, vaaka: true);
                // Puomin alin kohta paneelin pisteinä (puomi on suora, joten alin kohta on jommassakummassa päässä).
                float Alin(float yI)
                {
                    float dy = yI - NivelY;
                    var p = m.Kuvaa(new Vector2(NivelX + dy * venytys, NivelY - (VarsiMinX - NivelX) * Poikittain + Nosto - dy * venytys * nousu));
                    return this.LocalToWorld(p).y;
                }
                kuva.VarrenAlin = Mathf.Max(Alin(NivelY), Alin(PaaY));
                kuva.VarrenAlinEvasta = kuva.VarrenAlin - worldBound.yMax;
                // Kyynärpää = nivelen keskipiste (kuva c9e42de3: puomin alareuna nivelessä oli 40 pt näkyvän kyynärpään alapuolella).
                kuva.KyynarEvasta = this.LocalToWorld(m.Kuvaa(new Vector2(NivelX, NivelY + Nosto))).y - worldBound.yMax;
                {
                    float dx = 113.5f - 113, dy = 258.5f - 300;   // visiirin soikion keskipiste (Soikio), keinunta mukana
                    var kp = m.Kuvaa(new Vector2(113 + dx * ca - dy * sa, 300 + dx * sa + dy * ca + Nosto));
                    kuva.KyparaEvasta = this.LocalToWorld(kp).y - worldBound.yMax;
                }
                kuva.VarrenAlinVersio++;
                // Pulu valaistuna eikä pelkkänä varjokuvana (omistaja 3.10.2026 "pulun kasvot pitää näkyä"; Päätoimittaja: kypärävalo
                // valaisee, ei pelkkä varjokuva): perus 75 % kohti omia värejään, varsi ja pidikkeet yhä varjossa.
                Kuva(evaKuvat[1], 304, 1f, true, Color.Lerp(varjo, valo, 0.75f));
                // Kasvovalo ensin ja kasvot sen päälle (Päätoimittajan kuvatarkistus 2.10.: valo peitti silmät ja nokan, visiirissä
                // näkyi vain vaalea soikio): valo jää kasvojen ympärille sädekehäksi.
                Kuva(evaKuvat[2], 304, 0.6f, true, valo);                // kasvot loistavat kypärävalossa
                Soikio(kasvoKuva != null ? kasvoKuva : evaKuvat[1], 113.5f, 258.5f, 21f, 19f, valo);   // kasvot kypärävalossa
                Kuva(evaKuvat[3], 304, t.EvaLamput, true, valo);
                Kuva(evaKuvat[4], 304, t.EvaMaa, true, valo);            // Maan reunavalo piirtää siluetin reunan
                // robotin turvaköysi (vanha vapaa köysi pois); 152 × 400, koska lenkki ulottuu y ≈ 322:een
                Kuva(robottiKuvat[2], 400, 1f, true, varjo);
                Kuva(robottiKuvat[3], 304, 1f, false, varjo);            // jalkapidikkeet
            }
        }
    }
}
