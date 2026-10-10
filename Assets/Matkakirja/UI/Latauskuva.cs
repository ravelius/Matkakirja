// LATAUSKUVA (omistaja 8.10.2026 ~08.5x: "Lataus kuvista pitää tehdä kevyesti animoituja. Esim ilmapallo kuva pitää tehdä kahdesta
// osasta uudestaan niin että pallo heiluu hitaasti ruudulla ja köysi piirretään vektorina"; Päätoimittaja: uusi hyväksytty pohja,
// tyylikirja pohjat.LATAUSKUVA). Yksi yhteinen kerroksellinen latauskuva odotusruuduille:
//   tausta      still-kuva (nykyinen latauskuva; isäntä antaa kuvan alan ruudulla, esim. peittävä rajaus)
//   köydet      vektoriviivat (Painter2D) kiintopisteestä liikkuvan kerroksen kiinnityspisteeseen riippumalla: riippuköydet
//               (kori → kupu) ja ankkuriköysi korista maan kiinnityspisteeseen taustassa (omistaja 8.10. 08.4x: "köysi, joka pitää
//               pallon paikallaan"; isompi riippuma, pieni kaari)
//   kerrokset   1–2 liikkuvaa kuvaa alfalla; vähäeleinen sinimuotoinen heilahdus ja nousu (Ydin LatausLiike, ±0,5–0,75°,
//               nousu ≤ 4 pt, jakso 7–8 s); kuumailmapallo tuulessa (omistaja 10.10. 16.5x): LatausLiike.Profiili.Tuuli ±2–3°,
//               sivuliike ±10–15 pt, jakso 5–7 s puuskineen, kori viiveellä; ankkuriköysi ketjukäyränä (Koysi.Ketju)
//   valokuva   koko kuvan hidas lähentyminen (Ken Burns 1,00 → 1,04 / 8 s ja takaisin; TaustaLahentyy, Päätoimittaja 8.10.);
//              sama liike oppaan latauskuvan valokuvalle Kuvasuurennoksessa (Kuvasuurennos.Lahentyy → Latauskuva.AsetaRajaus).
//   alaosa     valinnainen toinen kuva (sama rajaus) taustan alaosaan kohdasta AlaosaAlku alkaen: korvaa taustan etualan
//              (omistaja TF 176: "poista etuala, jossa köyden kiinnityspiste maassa näkyy"; pallossa still-kuvan tumma alaosa,
//              pikselilleen sama kuin tausta saumassa)
// LIIKE PIIRTYY (omistaja TF 176, 6.7: "pallo ei liiku lainkaan"): liikkeen ajan UiKerros.MerkitseMuutos joka päivityksessä, jotta
// Ruudunpaivitys ei harvenna piirtoa PAIKALLAAN-väliin (2 s); taajuus pysyy lepotilan 30 fps:ssä.
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
            /// <summary>Vene vedessä (null = tavallinen kerros): vesiraja, heijastus ja kosketusvarjo (Vesi).</summary>
            public Vesi Vesi;
        }

        /// <summary>
        /// VESI (PT 10.10.2026 20.3x, omistajan kuva Olavinlinnan latauskuvasta: vene kellui ilman heijastusta ja varjoa ja näytti
        /// liimatulta). Veneen kerros piirtyy vesirajaan asti (alaosa upoksissa, raja pehmeä), ja sen taakse tulee vesitaso, jossa on
        /// peilikuva vesirajasta alas (tummennettu, häipyy alaspäin, kevyt aaltovääristymä LatausLiike.Aaltosiirto) sekä tumma
        /// kosketusvarjo vesirajassa. Vesitaso seuraa veneen nousua ja sivuliikettä mutta ei kallistu (vesi pysyy vaakasuorassa).
        /// </summary>
        public sealed class Vesi
        {
            /// <summary>Veneen rajat kerroksen osuuksina (kuvan alfan rajaus), y alas.</summary>
            public Rect Vene;
            /// <summary>Upotus veneen korkeudesta: vesiraja on näin paljon kölin yläpuolella.</summary>
            public float Upotus = 0.28f;
            /// <summary>Heijastuksen peitto vesirajassa ja syvyys veneen näkyvän korkeuden kerrannaisena.</summary>
            public float Heijastus = 0.62f, Syvyys = 1.35f;
            /// <summary>Heijastuksen tummennus (0 = kuvan värit, 1 = tyylikirjan kuvahimmennys).</summary>
            public float Tummennus = 0.45f;
            /// <summary>Aallon sivusiirto veneen leveydestä heijastuksen alareunassa.</summary>
            public float Aalto = 0.035f;
            /// <summary>Kosketusvarjon peitto vesirajassa.</summary>
            public float Varjo = 0.7f;

            /// <summary>Vesiraja kerroksen osuutena (y alas).</summary>
            public float Raja => Vene.yMax - Upotus * Vene.height;
        }

        /// <summary>
        /// Köysi: kiintopiste taustakuvan osuuksina → kerroksen (indeksi) kiinnityspiste kerroksen osuuksina. Riippuköysi (kori →
        /// kupu) Riippuma ~0,02–0,03; ankkuriköysi (maa → kori) Ankkuri()-oletuksilla.
        /// </summary>
        public sealed class Koysi
        {
            public Vector2 Kiinto;
            /// <summary>Kiintopisteen kerros (−1 = tausta): riippuköysi kahden liikkuvan kerroksen välillä (kori → kupu).</summary>
            public int KiintoKerros = -1;
            public int Kerros;
            public Vector2 Kiinnitys;
            public float LeveysPt = 1.5f;
            public Color Vari = Tyylikirja.Kehys.MapInk;
            /// <summary>Riippuma köyden pituudesta (0 = suora).</summary>
            public float Riippuma = 0.03f;
            /// <summary>Ketjukäyrä (omistaja 10.10. 16.5x "köysi pitää taipua aidosti"): vakiopituinen köysi, pituus = lepoasennon
            /// etäisyys × (1 + Lotko); painuma ja kaari seuraavat kiinnityspistettä joka ruudussa (LatausLiike.Ketjukayra).</summary>
            public bool Ketju;
            public float Lotko = 0.05f;
            /// <summary>Häivytys sumuun (omistaja 10.10. 17.5x "köyden pitää jatkua alemmas ja hävitä sumuun"): täysi peittävyys
            /// taustan korkeuteen HaivyAlku asti, siitä sileästi pois korkeuteen HaivyLoppu (osuuksina, y alas; LatausLiike.Haivytys).
            /// HaivyLoppu ≤ HaivyAlku = ei häivytystä.</summary>
            public float HaivyAlku, HaivyLoppu;

            /// <summary>Ankkuriköysi maasta (taustan osuus) korin kerrokseen: hieman paksumpi, riippuu ketjukäyränä.</summary>
            public static Koysi Ankkuri(Vector2 maa, int koriKerros, Vector2 kiinnitys) =>
                new Koysi { Kiinto = maa, Kerros = koriKerros, Kiinnitys = kiinnitys, LeveysPt = 2f, Riippuma = 0.06f, Ketju = true };
        }

        public const int PaivitysMs = 33;

        /// <summary>Juuri (koko isännän ala, ei kosketuksia); isäntä lisää palkin ja nimen tämän päälle.</summary>
        public readonly VisualElement Juuri;
        readonly VisualElement tausta, alaosa, koysiTaso;
        float alaosaAlku;
        readonly List<(VisualElement El, Kerros K)> kerrokset = new List<(VisualElement, Kerros)>();
        /// <summary>Vesitasot (heijastus ja kosketusvarjo) veneen kerroksen takana: (vesitaso, kerroksen indeksi).</summary>
        readonly List<(VisualElement El, int I)> vedet = new List<(VisualElement, int)>();
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
            alaosa = Rakenne.El("mk-latauskuva__alaosa", Juuri, PickingMode.Ignore);
            alaosa.style.position = Position.Absolute;
            alaosa.style.display = DisplayStyle.None;
            koysiTaso = Taysi(Rakenne.El("mk-latauskuva__koydet", Juuri, PickingMode.Ignore));
            koysiTaso.generateVisualContent += PiirraKoydet;
        }

        static VisualElement Taysi(VisualElement e)
        {
            e.style.position = Position.Absolute;
            e.style.left = 0; e.style.right = 0; e.style.top = 0; e.style.bottom = 0;
            return e;
        }

        /// <summary>
        /// Koko kuva kerroksineen lähentyy hitaasti (Ken Burns, LatausLiike.Lahentyminen) juuren muunnoksena, jolloin liikkuvat
        /// kerrokset pysyvät taustan kohdallaan (vene vedessä); suunta tunnisteesta (LatausLiike.Suunta, null = keskeltä).
        /// </summary>
        public bool TaustaLahentyy;
        public string TaustaTunniste;

        /// <summary>
        /// Lähentymisen rajaus elementin taustakuvaan (background-size ja -position, ei muunnosta eikä asettelua): kuva rajautuu
        /// elementin alaan. null = poista inline-arvot (elementin oma tyyli palaa).
        /// </summary>
        public static void AsetaRajaus(VisualElement e, LatausLiike.Rajaus? r)
        {
            if (r == null)
            {
                e.style.backgroundSize = StyleKeyword.Null;
                e.style.backgroundPositionX = StyleKeyword.Null; e.style.backgroundPositionY = StyleKeyword.Null;
                return;
            }
            var q = r.Value;
            float s = (float)(q.Skaala * 100);
            e.style.backgroundSize = new BackgroundSize(Length.Percent(s), Length.Percent(s));
            e.style.backgroundPositionX = new BackgroundPosition(BackgroundPositionKeyword.Left, Length.Percent((float)(q.AnkkuriX * 100)));
            e.style.backgroundPositionY = new BackgroundPosition(BackgroundPositionKeyword.Top, Length.Percent((float)(q.AnkkuriY * 100)));
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
            AsetaAlaosa(null, 0f);
            foreach (var (el, _) in kerrokset) el.RemoveFromHierarchy();
            foreach (var (el, _) in vedet) el.RemoveFromHierarchy();
            kerrokset.Clear(); koydet.Clear(); vedet.Clear();
            if (uudet != null)
                foreach (var k in uudet)
                {
                    if (k?.Kuva == null) continue;
                    if (k.Vesi != null && k.Vesi.Vene.width > 0f && k.Vesi.Vene.height > 0f)
                    {
                        // Vesitaso ennen venettä (piirtyy sen taakse); vene itse meshinä vesirajaan asti.
                        var vesi = Taysi(Rakenne.El("mk-latauskuva__vesi", Juuri, PickingMode.Ignore));
                        int i = kerrokset.Count;
                        vesi.generateVisualContent += mgc => PiirraVesi(mgc, i);
                        vedet.Add((vesi, i));
                    }
                    var el = Rakenne.El("mk-latauskuva__kerros", Juuri, PickingMode.Ignore);
                    el.style.position = Position.Absolute;
                    if (k.Vesi != null && k.Vesi.Vene.width > 0f && k.Vesi.Vene.height > 0f)
                    {
                        var kk = k;
                        el.generateVisualContent += mgc => PiirraVene(mgc, kk);
                    }
                    else
                    {
                        el.style.backgroundImage = new StyleBackground(k.Kuva);
                        el.style.backgroundSize = new BackgroundSize(Length.Percent(100), Length.Percent(100));
                    }
                    el.style.transformOrigin = new TransformOrigin(Length.Percent(k.Kaanto.x * 100f), Length.Percent(k.Kaanto.y * 100f));
                    kerrokset.Add((el, k));
                }
            if (uudetKoydet != null)
                foreach (var k in uudetKoydet)
                    if (k != null && k.Kerros >= 0 && k.Kerros < kerrokset.Count && k.KiintoKerros < kerrokset.Count) koydet.Add(k);
            Asettele();
            Paivita();
            Kaynnista();
        }

        /// <summary>
        /// Alaosa (null = pois): kuva, jolla on sama rajaus kuin taustalla, näytetään taustan päällä kohdasta alku (osuus kuvan
        /// korkeudesta) alas; köydet ja kerrokset piirtyvät sen päälle.
        /// </summary>
        public void AsetaAlaosa(Texture2D kuva, float alku)
        {
            alaosaAlku = Mathf.Clamp(alku, 0f, 0.99f);
            alaosa.style.backgroundImage = kuva != null ? new StyleBackground(kuva) : new StyleBackground(StyleKeyword.None);
            alaosa.style.display = kuva != null ? DisplayStyle.Flex : DisplayStyle.None;
            Asettele();
        }

        public bool AlaosaNakyy => alaosa.style.display == DisplayStyle.Flex;

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
            // Alaosa: kuva koko taustan korkuisena, alareunaan kohdistettuna; elementti alkaa kohdasta alaosaAlku.
            float osa = 1f - alaosaAlku;
            alaosa.style.left = ala.x; alaosa.style.top = ala.y + alaosaAlku * ala.height;
            alaosa.style.width = ala.width; alaosa.style.height = osa * ala.height;
            alaosa.style.backgroundSize = new BackgroundSize(Length.Percent(100), Length.Percent(100f / osa));
            alaosa.style.backgroundPositionY = new BackgroundPosition(BackgroundPositionKeyword.Bottom, 0);
            foreach (var (el, k) in kerrokset)
            {
                el.style.left = ala.x + k.Paikka.x * ala.width; el.style.top = ala.y + k.Paikka.y * ala.height;
                el.style.width = k.Paikka.width * ala.width; el.style.height = k.Paikka.height * ala.height;
            }
            foreach (var (vesi, i) in vedet)
            {
                var k = kerrokset[i].K;
                vesi.style.left = ala.x + k.Paikka.x * ala.width; vesi.style.top = ala.y + k.Paikka.y * ala.height;
                vesi.style.width = k.Paikka.width * ala.width; vesi.style.height = k.Paikka.height * ala.height;
                vesi.style.right = StyleKeyword.Auto; vesi.style.bottom = StyleKeyword.Auto;
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
            bool liikkuu = nakyy && (kerrokset.Count > 0 || TaustaLahentyy);
            if (!TaustaLahentyy) { Juuri.style.scale = StyleKeyword.Null; Juuri.style.transformOrigin = StyleKeyword.Null; }
            if (!liikkuu) { ajastin?.Pause(); return; }
            if (ajastin == null) ajastin = Juuri.schedule.Execute(Paivita).Every(PaivitysMs);
            else ajastin.Resume();
        }

        /// <summary>Kerrosten asento hetkellä nyt − alku (UITK rotate/translate, ei asettelua) ja köysien uudelleenpiirto.</summary>
        void Paivita()
        {
            double t = Time.unscaledTime - alku;
            if (nakyy && (kerrokset.Count > 0 || TaustaLahentyy) && UiKerros.Olemassa) UiKerros.Hae().MerkitseMuutos();
            if (TaustaLahentyy)
            {
                var (sx, sy) = TaustaTunniste == null ? (0.0, 0.0) : LatausLiike.Suunta(TaustaTunniste);
                var q = LatausLiike.Lahentyminen(t, sx, sy);
                Juuri.style.transformOrigin = new TransformOrigin(Length.Percent((float)(q.AnkkuriX * 100)), Length.Percent((float)(q.AnkkuriY * 100)));
                Juuri.style.scale = new Scale(new Vector2((float)q.Skaala, (float)q.Skaala));
            }
            if (kerrokset.Count == 0) return;
            foreach (var (el, k) in kerrokset)
            {
                var a = LatausLiike.Tila(k.Liike, t);
                el.style.rotate = new Rotate(new Angle((float)a.KulmaAste));
                el.style.translate = new Translate((float)a.SivuPt, (float)-a.NousuPt);
            }
            // Vesitaso seuraa veneen nousua ja sivuliikettä (heijastus kiinni kyljessä) ilman kallistusta; aallot liikkuvat.
            foreach (var (vesi, i) in vedet)
            {
                var a = LatausLiike.Tila(kerrokset[i].K.Liike, t);
                vesi.style.translate = new Translate((float)a.SivuPt, (float)-a.NousuPt);
                vesi.MarkDirtyRepaint();
            }
            if (koydet.Count > 0) koysiTaso.MarkDirtyRepaint();
        }

        /// <summary>Kuvan piste (osuuksina, y alas) tekstuurin uv:ksi meshissä (Unityn uv: y ylös, atlaksen alue uvRegion).</summary>
        static Vector2 Uv(MeshWriteData md, float u, float v) =>
            new Vector2(md.uvRegion.x + u * md.uvRegion.width, md.uvRegion.y + (1f - v) * md.uvRegion.height);

        /// <summary>
        /// Vene vesirajaan asti: veneen rajaus kuvasta, alaosa upoksissa (Vesi.Raja), raja pehmeä (alin 7 % näkyvästä korkeudesta
        /// häipyy), jottei kylkeen jää terävää leikkausta.
        /// </summary>
        void PiirraVene(MeshGenerationContext mgc, Kerros k)
        {
            var el = mgc.visualElement;
            float w = el.layout.width, h = el.layout.height;
            if (!(w > 0f) || !(h > 0f)) return;
            var v = k.Vesi;
            float raja = v.Raja, yla = v.Vene.yMin, pehmea = raja - 0.07f * (raja - yla);
            var md = mgc.Allocate(6, 12, k.Kuva);
            if (md.vertexCount == 0) return;
            float[] rivit = { yla, pehmea, raja };
            byte[] peitto = { 255, 255, 0 };
            for (int r = 0; r < 3; r++)
                foreach (float x in new[] { v.Vene.xMin, v.Vene.xMax })
                    md.SetNextVertex(new Vertex { position = new Vector3(x * w, rivit[r] * h, Vertex.nearZ),
                        tint = Peitto(Color.white, peitto[r]), uv = Uv(md, x, rivit[r]) });
            for (int r = 0; r < 2; r++) Nelio(md, r * 2);
        }

        static Color32 Peitto(Color32 c, byte a) { c.a = a; return c; }

        /// <summary>Kaksi kolmiota myötäpäivään (y alas): ylä-vasen a, ylä-oikea a+1, ala-vasen a+2, ala-oikea a+3.</summary>
        static void Nelio(MeshWriteData md, int a)
        {
            md.SetNextIndex((ushort)a); md.SetNextIndex((ushort)(a + 1)); md.SetNextIndex((ushort)(a + 3));
            md.SetNextIndex((ushort)a); md.SetNextIndex((ushort)(a + 3)); md.SetNextIndex((ushort)(a + 2));
        }

        const int HeijastusRivit = 18, VarjoReuna = 28;

        /// <summary>
        /// Vesitaso: peilikuva vesirajasta alas (lähde = vene vesirajan yläpuolelta peilattuna, tummennettu kohti tyylikirjan
        /// kuvahimmennystä, peitto LatausLiike.HeijastusPeitto, rivit siirtyvät sivuttain LatausLiike.Aaltosiirto) ja sen päälle
        /// kosketusvarjo: tumma litteä ellipsi vesirajassa, reunoille häipyvä.
        /// </summary>
        void PiirraVesi(MeshGenerationContext mgc, int i)
        {
            if (i >= kerrokset.Count) return;
            var k = kerrokset[i].K;
            var v = k.Vesi;
            var el = mgc.visualElement;
            float w = el.layout.width, h = el.layout.height;
            if (v == null || k.Kuva == null || !(w > 0f) || !(h > 0f)) return;
            double t = Time.unscaledTime - alku;
            float raja = v.Raja, nakyva = raja - v.Vene.yMin, syva = nakyva * v.Syvyys;
            float aalto = v.Aalto * v.Vene.width * w;
            Color32 himmea = Tyylikirja.Himmennys.Kuva;
            var savy = Color.Lerp(Color.white, Peitto(himmea, 255), v.Tummennus);

            var md = mgc.Allocate((HeijastusRivit + 1) * 2, HeijastusRivit * 6, k.Kuva);
            if (md.vertexCount > 0)
            {
                for (int r = 0; r <= HeijastusRivit; r++)
                {
                    float s = (float)r / HeijastusRivit;
                    float y = raja + s * syva, lahde = raja - s * syva;
                    float dx = (float)LatausLiike.Aaltosiirto(s, t, aalto);
                    var c = savy; c.a = (float)LatausLiike.HeijastusPeitto(s, v.Heijastus);
                    foreach (float x in new[] { v.Vene.xMin, v.Vene.xMax })
                        md.SetNextVertex(new Vertex { position = new Vector3(x * w + dx, y * h, Vertex.nearZ), tint = c, uv = Uv(md, x, lahde) });
                }
                for (int r = 0; r < HeijastusRivit; r++) Nelio(md, r * 2);
            }

            // Kosketusvarjo: vesirajan kohdalla, veneen levyinen, korkeus vajaa puolet näkyvästä (esikatselu 20.4x, iPad pysty).
            var vm = mgc.Allocate(VarjoReuna + 1, VarjoReuna * 3);
            if (vm.vertexCount == 0) return;
            float cx = v.Vene.center.x * w, cy = (raja + 0.02f * nakyva) * h;
            float rx = 0.5f * v.Vene.width * w, ry = 0.42f * nakyva * h;
            Color32 keski = himmea; keski.a = (byte)Mathf.RoundToInt(255f * Mathf.Clamp01(v.Varjo));
            Color32 reuna = himmea; reuna.a = 0;
            vm.SetNextVertex(new Vertex { position = new Vector3(cx, cy, Vertex.nearZ), tint = keski });
            for (int r = 0; r < VarjoReuna; r++)
            {
                float a = 2f * Mathf.PI * r / VarjoReuna;
                vm.SetNextVertex(new Vertex { position = new Vector3(cx + rx * Mathf.Cos(a), cy + ry * Mathf.Sin(a), Vertex.nearZ), tint = reuna });
            }
            for (int r = 0; r < VarjoReuna; r++)
            {
                vm.SetNextIndex(0); vm.SetNextIndex((ushort)(1 + r)); vm.SetNextIndex((ushort)(1 + (r + 1) % VarjoReuna));
            }
        }

        /// <summary>Kerroksen paikallinen piste (osuuksina) isännän koordinaatteihin nykyisessä asennossa.</summary>
        Vector2 KerroksenPiste(int i, Vector2 osuus, double t, bool lepo = false)
        {
            var k = kerrokset[i].K;
            float x0 = ala.x + k.Paikka.x * ala.width, y0 = ala.y + k.Paikka.y * ala.height;
            float w = k.Paikka.width * ala.width, h = k.Paikka.height * ala.height;
            var p = LatausLiike.Muunna(x0 + osuus.x * w, y0 + osuus.y * h, x0 + k.Kaanto.x * w, y0 + k.Kaanto.y * h,
                lepo ? default : LatausLiike.Tila(k.Liike, t));
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
                var a = k.KiintoKerros >= 0 ? KerroksenPiste(k.KiintoKerros, k.Kiinto, t) : new Vector2(ala.x + k.Kiinto.x * ala.width, ala.y + k.Kiinto.y * ala.height);
                var b = KerroksenPiste(k.Kerros, k.Kiinnitys, t);
                p.strokeColor = k.Vari;
                p.lineWidth = k.LeveysPt;
                if (k.Ketju)
                {
                    var a0 = k.KiintoKerros >= 0 ? KerroksenPiste(k.KiintoKerros, k.Kiinto, t, lepo: true) : a;
                    var b0 = KerroksenPiste(k.Kerros, k.Kiinnitys, t, lepo: true);
                    var kayra = LatausLiike.Ketjukayra(a.x, a.y, b.x, b.y, Vector2.Distance(a0, b0) * (1f + k.Lotko), k.HaivyLoppu > k.HaivyAlku ? 64 : 24);
                    if (k.HaivyLoppu > k.HaivyAlku) { PiirraHaipyva(p, k, kayra); p.lineCap = LineCap.Round; continue; }
                    p.BeginPath();
                    p.MoveTo(a);
                    for (int i = 1; i < kayra.Length; i++) p.LineTo(new Vector2((float)kayra[i].X, (float)kayra[i].Y));
                }
                else
                {
                    p.BeginPath();
                    p.MoveTo(a);
                    var c = LatausLiike.Ohjauspiste(a.x, a.y, b.x, b.y, k.Riippuma);
                    p.QuadraticCurveTo(new Vector2((float)c.X, (float)c.Y), b);
                }
                p.Stroke();
            }
        }

        /// <summary>
        /// Sumuun häipyvä köysi: peittävyys pisteen korkeuden mukaan (LatausLiike.Haivytys). Saman peittävyyden peräkkäiset palat
        /// (1/32-portain) yhtenä polkuna; häivytetyt palat tasapäin (LineCap.Butt), jotta läpikuultavat päät eivät kerrostu helmiksi.
        /// Täysin häipynyt loppu jää piirtämättä: köydellä ei ole näkyvää päätä.
        /// </summary>
        void PiirraHaipyva(Painter2D p, Koysi k, (double X, double Y)[] kayra)
        {
            float Peitto(int i) => (float)LatausLiike.Haivytys((kayra[i].Y - ala.y) / ala.height, k.HaivyAlku, k.HaivyLoppu);
            int j = 0;
            while (j < kayra.Length - 1)
            {
                float q = Mathf.Round((Peitto(j) + Peitto(j + 1)) * 16f) / 32f;
                int loppu = j + 1;
                while (loppu < kayra.Length - 1 && Mathf.Round((Peitto(loppu) + Peitto(loppu + 1)) * 16f) / 32f == q) loppu++;
                if (q > 0f)
                {
                    var v = k.Vari; v.a *= q;
                    p.strokeColor = v;
                    p.lineCap = q < 1f ? LineCap.Butt : LineCap.Round;
                    p.BeginPath();
                    p.MoveTo(new Vector2((float)kayra[j].X, (float)kayra[j].Y));
                    for (int i = j + 1; i <= loppu; i++) p.LineTo(new Vector2((float)kayra[i].X, (float)kayra[i].Y));
                    p.Stroke();
                }
                j = loppu;
            }
        }

        /// <summary>Testi- ja lokikuvaus: näkyvyys, kerrokset asentoineen, köydet.</summary>
        public string Kuvaus()
        {
            var sb = new System.Text.StringBuilder($"latauskuva {(nakyy ? "näkyy" : "piilossa")}, ala {ala.x:0},{ala.y:0} {ala.width:0}×{ala.height:0}, kerroksia {kerrokset.Count}, köysiä {koydet.Count}, alaosa {(AlaosaNakyy ? alaosaAlku.ToString("0.00") : "-")}");
            double t = Time.unscaledTime - alku;
            foreach (var (_, k) in kerrokset)
            {
                var a = LatausLiike.Tila(k.Liike, t);
                sb.Append($" | {a.KulmaAste:+0.00;-0.00}° {a.NousuPt:+0.0;-0.0} pt sivu {a.SivuPt:+0.0;-0.0} pt");
            }
            return sb.ToString();
        }
    }
}
