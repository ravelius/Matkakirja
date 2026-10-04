// SIJAINTIPALLO (Linssiseppä 1.10.2026; omistaja klo 00.1x Päätoimittajan kautta: "pystyisikö näytölle tekemään ilman pilviä ja
// muuta ylimääräistä pienen maapallon, joka näyttäisi pisteellä aina kyseisen kuvan maapallolla? se saisi pyörähtää pehmeästi
// aina uuteen paikkaa jos nuolinäppäimillä selataan kohteita."): astronautin kameran kuvanäkymän vasemmassa alakulmassa
// (pikkukuvanauhan yllä) pieni pallo (puhelin 72 pt, tabletti 96 pt). Pinta BMNG Z1 (4 tiiltä, kuukausi kuten kyydissä), meripihkan piste kohteessa, joka
// on pallon keskellä. Selatessa (‹ ›, nuolinäppäimet, pyyhkäisy) pallo kiertyy lyhintä reittiä 0,7 s ease-in-out.
// Toteutus: oma kerros 12 ja ortokamera RenderTextureen (320², MSAA 4), piirto vain liikkeen aikana (kamera päällä liikkeen
// ja yhden kehyksen ajan) → levossa ei kustannusta. Pääkamera ei piirrä kerrosta 12. A/B `ui linssi sijaintipallo 0|1`.
// PYÖRITETTÄVÄ KOHDESELAIN (omistaja 3.10.2026, vain natiivi; Päätoimittaja hyväksyi toteutuksen): "Voisiko mini maapalloa pystyä
// pyörittämään? Se valitsisi silloin aina automaattisesti pienen viiveen jälkeen keskimmäisimmän kohteen. Kohteiden nimet voisivat
// näkyä heti pallon alapuolella kun sitä pyörittää … Pallo voisi lisäksi kasvaa kokoa kun siihen tarttuu." Tartunta kasvattaa pallon
// (Tyylikirja.Kesto.Avaus) noin 2×:ksi, peitto ≤ 45 % ruudusta; kuva himmenee taakse (Kuvanakyma, lavan peitto). Sormi pyörittää
// (pohjoinen pysyy ylhäällä), irrotus jättää vauhdin (inertia); keskellä hento tähtäin (Ikonit.Plus) ja meripihkan piste
// seuraa keskimmäistä kohdetta. Kohteen nimi pallon alla (vaakatilassa oikealla) kuvanäkymän nimipillerin tyylillä
// (mk-astrokuva__selite mk-kiinni mk-korostus + mk-astrokuva__otsikko). Valinta, kun pallo on pysähtynyt ja sormi irti 0,5 s
// (Pallovalitsin, Ydin): nimi häviää, pallo pienenee ja kuvanäkymä vaihtaa kohteen (Valittu). Testikomento `astro pallo …`.
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Astronautti;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering.Universal;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Sijaintipallo
    {
        public const int Kerros = 12;
        public static bool Paalla = true;
        /// <summary>Koko (pt): puhelimella 120, tabletilla 160 (omistaja: "pienen maapallon"; 2.10. "Pieni karttapallo vähän
        /// isompana" → 94 / 125; 2.10. 21.3x "Maapallokuvake suuremmaksi" → +28 %).</summary>
        static float KokoPt => UiKerros.Tabletti ? 160f : 120f;
        /// <summary>iPhonen vaakatilassa pallo ruudun vasempaan alakulmaan turva-alueen ulkopuolelle (omistaja 2.10. 21.3x
        /// "siirtyy selvästi enemmän vasempaan alakulmaan"): kuva on keskellä, ja sen vasemmalla puolella on vapaa kaistale.</summary>
        const float VaakaReuna = 8f;
        const float KestoS = 0.7f, Sade = 1000f;
        const float Vasen = 12f, Alas = 62f, Rako = 6f, MinKokoPt = 62f;   // min 48 → 62 (+30 %, omistaja 2.10.)
        const string PintaJuuri = "https://media.matkakirja.app/julisteet/pallo/bmng/";

        readonly VisualElement el;
        GameObject juuri;
        Transform pallo;
        Camera kamera;
        Material materiaali;
        RenderTexture rt;
        Quaternion alku = Quaternion.identity, loppu = Quaternion.identity;
        float t0 = -1f;
        int piirtoKehyksia;
        bool pintaHaettu;
        Vector3 kohde = new Vector3(0, 0, -1);
        IVisualElementScheduledItem ajo;

        // --- pyöritettävä kohdeselain (omistaja 3.10.2026) ---
        /// <summary>Tartunnan koko KokoPt:n kertoimena (omistaja: "kasvaa kokoa kun siihen tarttuu"), peiton katto ruudusta.</summary>
        const float Suurennos = 2f, PeittoMax = 0.45f;
        /// <summary>Pystyssä pallo nousee nimen verran, jotta nimi mahtuu heti sen alle ‹ ›-rivin yläpuolelle.</summary>
        const float NimiNosto = 36f, NimiVali = 6f, NimiVaakaVali = 10f, VaakaNimiTila = 120f, Reuna = 8f, TahtainPeitto = 0.5f;
        const int EiSormea = int.MinValue, TestiSormi = -77;
        readonly Pallovalitsin valitsin = new Pallovalitsin();
        readonly VisualElement nimiLaatikko, tahtain;
        readonly Label nimi;
        /// <summary>Valittavat kohteet (Kuvanakyma: linssin aineisto); haetaan tartunnassa.</summary>
        public System.Func<IReadOnlyList<Havaintokohde>> Ehdokkaat;
        /// <summary>true = tartunta alkoi (kuva himmenee, AUTO tauolle), false = pallo palasi (valinta tai keskeytys).</summary>
        public event System.Action<bool> Tartuttu;
        /// <summary>Valinta: keskimmäinen kohde (null = mikään ei näy); kuvanäkymä avaa sen tai palauttaa pallon nykyiseen.</summary>
        public event System.Action<Havaintokohde> Valittu;
        /// <summary>Keskimmäinen kohde vakiintui (0,15 s): sen kuva välimuistiin ennen valintaa.</summary>
        public event System.Action<Havaintokohde> Esilataa;
        IReadOnlyList<Havaintokohde> lista;
        Havaintokohde ehdokas, esiladattu;
        float ehdokasAika, skaala = 1f;
        Vector2 siirto, sormiPaikka;
        int sormi = EiSormea, taustaVaihto;
        bool selaa, nimiVaaka, nimiNakyy;
        double viimeLat = double.NaN, viimeLon;

        public Sijaintipallo(VisualElement isa)
        {
            el = new VisualElement { name = "mk-astrokuva__sijaintipallo", pickingMode = PickingMode.Position };
            var s = el.style;
            s.position = Position.Absolute; s.left = Vasen; s.bottom = Alas; s.width = KokoPt; s.height = KokoPt;
            s.display = DisplayStyle.None;
            s.transformOrigin = new TransformOrigin(Length.Percent(0), Length.Percent(100));
            isa.Add(el);
            // Tähtäin: olemassa oleva viivaikoni (ympyrä + risti), väri kuvanäkymän tekstiväristä, näkyy vain pyöritettäessä.
            tahtain = Rakenne.Ikoni(Ikonit.Plus, null, el);
            var ts = tahtain.style;
            ts.position = Position.Absolute; ts.left = Length.Percent(40); ts.top = Length.Percent(40);
            ts.width = Length.Percent(20); ts.height = Length.Percent(20); ts.opacity = 0f;
            // Nimi pallon alla: kuvanäkymän vasemman yläkulman nimipilleri (kelattu selite täydellä peitolla), ei uutta pohjaa.
            nimiLaatikko = Rakenne.El("mk-astrokuva__selite mk-kiinni mk-korostus", isa, PickingMode.Ignore);
            nimiLaatikko.name = "mk-astrokuva__pallonimi";
            nimiLaatikko.style.right = StyleKeyword.Auto;
            nimiLaatikko.style.display = DisplayStyle.None;
            nimiLaatikko.style.opacity = 0f;
            nimi = Rakenne.Teksti("", "mk-astrokuva__otsikko", nimiLaatikko);
            Kirjasimet.Aseta(nimi, Kirjasin.Kone);
            el.RegisterCallback<PointerDownEvent>(SormiAlas);
            el.RegisterCallback<PointerMoveEvent>(SormiLiikkuu);
            el.RegisterCallback<PointerUpEvent>(e => SormiYlos(e.pointerId));
            el.RegisterCallback<PointerCancelEvent>(e => SormiYlos(e.pointerId));
            el.RegisterCallback<PointerCaptureOutEvent>(e => SormiYlos(e.pointerId));
        }

        /// <summary>Kosketus osuu palloon (kuvanäkymän AUTO-käsittelijät ohittavat sen: pyöritys ei pysäytä AUTOa).</summary>
        public bool Sisaltaa(VisualElement e) => e != null && (e == el || el.Contains(e));

        /// <summary>Kuvanäkymän kohde (lat, lon asteina); animoi = selaus (pehmeä kierto), muuten heti.</summary>
        public void Kohteeseen(double lat, double lon, bool animoi)
        {
            if (!Paalla) { el.style.display = DisplayStyle.None; return; }
            if (!Varmista()) return;
            el.style.display = DisplayStyle.Flex;
            // Kohde vaihtui muualta kesken pyörityksen (‹ ›, pyyhkäisy): pyöritys päättyy ilman valintaa.
            if (selaa) LopetaSelaus(false);
            valitsin.Aseta(lat, lon);
            viimeLat = double.NaN;
            kohde = Suunta(lat, lon);
            materiaali.SetVector("_Kohde", kohde);
            var uusi = Asento(kohde);
            // Kesken kierron uusi kohde: jatketaan nykyisestä asennosta (ei hyppyä).
            if (animoi && Quaternion.Angle(pallo.localRotation, uusi) > 0.5f) { alku = pallo.localRotation; loppu = uusi; t0 = Time.unscaledTime; }
            else { pallo.localRotation = uusi; t0 = -1f; }
            piirtoKehyksia = 2;
            kamera.enabled = true;
            ajo ??= el.schedule.Execute(Paivita).Every(0);
            ajo.Resume();
        }

        /// <summary>
        /// Pallosta valittu kohde (omistaja 4.10.2026): vain kohdemerkki uuteen kohteeseen; pallo ei kierry keskittämään sitä vaan
        /// pysyy asennossa, johon sormi sen jätti (‹ ›, pyyhkäisy ja AUTO kiertävät edelleen Kohteeseen-kutsulla).
        /// </summary>
        public void MerkitseKohde(double lat, double lon)
        {
            if (!Paalla || !Varmista()) return;
            kohde = Suunta(lat, lon);
            materiaali.SetVector("_Kohde", kohde);
            piirtoKehyksia = 2;
            kamera.enabled = true;
            ajo ??= el.schedule.Execute(Paivita).Every(0);
            ajo.Resume();
        }

        public VisualElement Isa => el.parent;

        /// <summary>
        /// Koko kuvan mukaan (<paramref name="kuva"/> isän koordinaateissa): jos kuva on pallon korkeudella ja ulottuu sen
        /// kohdalle (vaaka), pallo pienenee reunukseen (vähintään 48 pt); pystyssä kuva on yläpuolella → täysi koko.
        /// </summary>
        public void Mitoita(Rect kuva, float isanKorkeus)
        {
            if (float.IsNaN(isanKorkeus) || isanKorkeus <= 0f || kuva.width <= 0f) return;
            float koko = KokoPt;
            var isa = el.parent;
            float isanLeveys = isa != null ? isa.layout.width : 0f;
            bool puhelinVaaka = !UiKerros.Tabletti && isanLeveys > isanKorkeus;
            if (puhelinVaaka && isa.panel != null && SijoitaKulmaan(isa, ref koko)) return;
            NauhanVasen = float.NaN;
            el.style.left = Vasen; el.style.bottom = Alas;
            float vasen = Vasen;
            float yla = isanKorkeus - Alas - koko;
            bool samallaKorkeudella = kuva.yMax > yla && kuva.yMin < isanKorkeus - Alas;
            if (samallaKorkeudella && kuva.xMin < vasen + koko + Rako)
                koko = Mathf.Clamp(kuva.xMin - vasen - Rako, MinKokoPt, KokoPt);
            el.style.width = koko; el.style.height = koko;
        }

        /// <summary>Pikkukuvanauhan vasen reuna isän koordinaateissa, kun pallo on iPhonen vaakatilan kulmassa (NaN = tyylin 12 pt).</summary>
        public float NauhanVasen { get; private set; } = float.NaN;

        /// <summary>Näytön pyöristetyn kulman säde (pt), iPhone 16 Pro / 17 -sarja 62; Unity ei kerro sitä, joten suurin nykyinen.</summary>
        const float NaytonKulma = 62f;

        /// <summary>
        /// IPHONE VAAKA (omistaja 2.10. 21.3x "ihan enemmän vasempaan alareunaan"; Päätoimittaja 2.10. valinta E2): pallo täysikokoisena
        /// ruudun vasempaan alakulmaan Dynamic Islandin alle, ja pikkukuvanauha pallon oikealle puolelle. Ehdot: väli ruudun reunoihin,
        /// näytön pyöristettyyn kulmaan ja saaren alareunaan vähintään VaakaReuna (8 pt); jos saari ei jätä tilaa, pallo pienenee
        /// (vähintään MinKokoPt). Palauttaa false, jos paneelin mittoja ei vielä ole.
        /// </summary>
        bool SijoitaKulmaan(VisualElement isa, ref float koko)
        {
            // Layout eikä worldBound: kuvanäkymän avausanimaatio (skaala) siirsi worldBoundia, ja pallo jäi 31 pt reunan yli (kuva
            // a8f0939c). Isä (turva-alue) on ruudun kokoisen näkymän lapsi, joten sen layout antaa turva-alueen reunat.
            var ruutu = isa.parent != null ? isa.parent.layout : isa.panel.visualTree.layout;
            var lo = isa.layout;
            if (!(ruutu.width > 0f) || !(ruutu.height > 0f) || float.IsNaN(lo.xMin)) return false;
            float pp = Screen.height / ruutu.height;
            // Saaren alareuna (pt ylhäältä) niiltä loviilta, jotka ovat pallon vaakakaistalla (Screen.cutouts: pikselit, origo alhaalla).
            float saariAla = 0f;
            foreach (var c in Screen.cutouts)
                if (c.xMin / pp < VaakaReuna + koko + VaakaReuna) saariAla = Mathf.Max(saariAla, (Screen.height - c.yMin) / pp);
            float a = VaakaReuna;
            for (int kierros = 0; kierros < 2; kierros++)
            {
                a = KulmaVali(koko * 0.5f);
                // Saaren alle: pallon yläreuna (ruudun alareunasta a + koko) vähintään 8 pt saaren alapuolelle.
                float tila = ruutu.height - saariAla - VaakaReuna - a;
                if (saariAla <= 0f || koko <= tila) break;
                koko = Mathf.Max(MinKokoPt, tila);
            }
            float vasen = a - lo.xMin, ala = a - (ruutu.height - lo.yMax);
            el.style.left = vasen; el.style.bottom = ala;
            el.style.width = koko; el.style.height = koko;
            NauhanVasen = vasen + koko + VaakaReuna;
            return true;
        }

        /// <summary>
        /// Pienin etäisyys a ruudun vasemmasta ja alareunasta pallon reunaan, jolla r-säteinen pallo pysyy kokonaan näytön
        /// pyöristetyn kulman sisällä VaakaReunan välillä (kulman kaaren keskipiste (K, K), säde K − 8 pt).
        /// </summary>
        static float KulmaVali(float r)
        {
            const float K = NaytonKulma, Raja = NaytonKulma - VaakaReuna;
            for (float a = VaakaReuna; a < K + r; a += 0.5f)
            {
                float c = a + r;
                bool sopii = true;
                for (int i = 0; i < 90 && sopii; i++)
                {
                    float th = Mathf.PI + i * (Mathf.PI * 0.5f) / 89f;
                    float x = c + r * Mathf.Cos(th), y = c + r * Mathf.Sin(th);
                    if (x < K && y < K && (new Vector2(x - K, y - K)).magnitude > Raja) sopii = false;
                }
                if (sopii) return a;
            }
            return K;
        }

        public void Piilota()
        {
            if (selaa) LopetaSelaus(true);
            el.style.display = DisplayStyle.None;
            if (kamera != null) kamera.enabled = false;
            ajo?.Pause();
        }

        /// <summary>Asento, jossa kohde on kameraa kohti (maailma −Z) ja pohjoinen ylös.</summary>
        static Quaternion Asento(Vector3 p)
        {
            Vector3 ylos = Vector3.up - p * p.y;
            if (ylos.sqrMagnitude < 1e-6f) ylos = new Vector3(-p.x, 0, -p.z);   // navalla: mikä tahansa meridiaani
            var q1 = Quaternion.LookRotation(p, ylos.normalized);
            return Quaternion.Euler(0f, 180f, 0f) * Quaternion.Inverse(q1);
        }

        static Vector3 Suunta(double lat, double lon)
        {
            double la = lat * Mathf.Deg2Rad, lo = lon * Mathf.Deg2Rad;
            return new Vector3((float)(System.Math.Cos(la) * System.Math.Cos(lo)), (float)System.Math.Sin(la), (float)(System.Math.Cos(la) * System.Math.Sin(lo)));
        }

        void Paivita()
        {
            if (pallo == null) { ajo?.Pause(); return; }
            if (taustaVaihto > 0 && --taustaVaihto == 0) el.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(rt));
            if (selaa) { PaivitaSelaus(); return; }
            if (t0 >= 0f)
            {
                float t = Mathf.Clamp01((Time.unscaledTime - t0) / KestoS);
                float e = t * t * (3f - 2f * t);   // ease-in-out
                pallo.localRotation = Quaternion.Slerp(alku, loppu, e);   // lyhin reitti
                if (t >= 1f) { t0 = -1f; piirtoKehyksia = 2; }
                return;
            }
            if (piirtoKehyksia-- > 0) return;
            kamera.enabled = false;   // RenderTexture säilyttää viimeisen kuvan
            ajo.Pause();
        }

        // --- pyöritettävä kohdeselain ---------------------------------------------------------

        void SormiAlas(PointerDownEvent e)
        {
            if (pallo == null || !Paalla || el.resolvedStyle.display == DisplayStyle.None) return;
            // Kuvan veto, kelaus ja reunan napautus eivät saa pallon kosketusta (pallo ei ole lavan lapsi; varmuuden vuoksi).
            e.StopPropagation();
            if (sormi != EiSormea) return;   // toinen sormi ei nipistä palloa
            sormi = e.pointerId;
            sormiPaikka = e.position;
            el.CapturePointer(sormi);
            Tartu();
        }

        void SormiLiikkuu(PointerMoveEvent e)
        {
            if (e.pointerId != sormi) return;
            e.StopPropagation();
            Vector2 d = (Vector2)e.position - sormiPaikka;
            sormiPaikka = e.position;
            Pyorita(d, double.NaN);
        }

        void SormiYlos(int id)
        {
            if (id != sormi) return;
            sormi = EiSormea;
            if (el.HasPointerCapture(id)) el.ReleasePointer(id);
            Irti(false);
        }

        void Tartu()
        {
            RekisteroiAanet();
            MatkakirjaHaptiikka_Valmistele();
            if (!selaa) AloitaSelaus();
            valitsin.Tartu(Time.unscaledTime);
            Ruudunpaivitys.Herata(0.5f);
            ajo?.Resume();
        }

        /// <summary>Sormen siirto (pt): pallon halkaisijan mittainen veto kiertää 180°; pinta seuraa sormea.</summary>
        void Pyorita(Vector2 d, double kestoS)
        {
            float halkaisija = Mathf.Max(1f, el.layout.width * skaala);
            float k = 180f / halkaisija;
            valitsin.Veto(d.y * k, -d.x * k, Time.unscaledTime, kestoS);
            Ruudunpaivitys.Herata(0.5f);
            ajo?.Resume();
        }

        void Irti(bool pidaVauhti)
        {
            // LUKITUS (omistaja 4.10.2026, TF 134: "sormen nosto ei aiheuttaisi pallon pyörimistä. Se saisi lukittua valittuun paikkaan
            // kunnes palloa pyöritettäiskin uudelleen"): ei inertiaa, ei nopeassakaan heitossa; pallo jää sormen jättämään asentoon.
            valitsin.Irti(Time.unscaledTime, inertia: false, pidaVauhti: false);
            // Ruutu päivittyy valintaan asti, vaikka mikään muu ei liiku.
            Ruudunpaivitys.Herata((float)Pallovalitsin.ValintaViiveS + 1.5f);
            ajo?.Resume();
        }

        void AloitaSelaus()
        {
            selaa = true;
            t0 = -1f;   // kesken oleva kierto kohteeseen päättyy, katse jatkuu valitsimen keskipisteestä
            viimeLat = double.NaN;
            lista = Ehdokkaat?.Invoke();
            ehdokas = esiladattu = null;
            nimiLaatikko.style.display = DisplayStyle.Flex;   // läpinäkyvänä valmiiksi, jotta häivytys ehtii alkaa
            // Kaksinkertainen koko: tarkempi RenderTexture (320² venyisi sumeaksi), vaihdetaan kerran.
            if (rt != null && rt.width < 640)
            {
                var iso = new RenderTexture(640, 640, 16, RenderTextureFormat.ARGB32) { name = "Sijaintipallo", antiAliasing = 4, hideFlags = HideFlags.HideAndDontSave };
                iso.Create();
                kamera.targetTexture = iso;
                var vanha = rt;
                rt = iso;
                // Tausta vaihtuu vasta, kun kamera on piirtänyt uuden (ei tyhjää kehystä).
                taustaVaihto = 3;
                el.schedule.Execute(() => { if (vanha != null) { vanha.Release(); Object.Destroy(vanha); } }).StartingIn(500);
            }
            Tartuttu?.Invoke(true);
            Kasva(true, false);
            Hento(tahtain, TahtainPeitto, true);
            kamera.enabled = true;
            piirtoKehyksia = 2;
        }

        /// <summary>Pyöritys päättyy: pallo pienenee, nimi ja tähtäin häviävät, piste palaa nykyiseen kohteeseen.</summary>
        void LopetaSelaus(bool heti)
        {
            selaa = false;
            valitsin.Paata();
            if (sormi != EiSormea && sormi != TestiSormi && el.HasPointerCapture(sormi)) el.ReleasePointer(sormi);
            sormi = EiSormea;
            Kasva(false, heti);
            Hento(tahtain, 0f, false, heti);
            NaytaNimi(false, heti);
            if (materiaali != null) materiaali.SetVector("_Kohde", kohde);
            piirtoKehyksia = 2;
            if (kamera != null) kamera.enabled = true;
            lista = null;
            Tartuttu?.Invoke(false);
        }

        void PaivitaSelaus()
        {
            float nyt = Time.unscaledTime;
            valitsin.Askel(nyt);
            if (valitsin.Lat != viimeLat || valitsin.Lon != viimeLon)
            {
                viimeLat = valitsin.Lat; viimeLon = valitsin.Lon;
                pallo.localRotation = Asento(Suunta(viimeLat, viimeLon));
                piirtoKehyksia = 2;
            }
            PaivitaEhdokas(nyt);
            SijoitaNimi();
            if (valitsin.ValintaValmis(nyt))
            {
                var k = ehdokas;
                LopetaSelaus(false);
                Debug.Log("MATKAKIRJA pallo valitsi: " + (k?.Tunnus ?? "-"));
                Aanet.Tehoste(AaniLukko);   // kohde lukittu: hieman tic:iä kuuluvampi, ei silti kova (omistaja 3.10.2026)
                Valittu?.Invoke(k);
                return;
            }
            // Kamera piirtää vain liikkeen aikana (+ 2 kehystä), kuten levossa.
            kamera.enabled = piirtoKehyksia-- > 0;
            if (sormi != EiSormea || !valitsin.Pysahtynyt) Ruudunpaivitys.Herata(0.3f);
        }

#if UNITY_IOS && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern void MatkakirjaHaptiikka_Valinta();
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern void MatkakirjaHaptiikka_Valmistele();
#else
        static void MatkakirjaHaptiikka_Valinta() { }
        static void MatkakirjaHaptiikka_Valmistele() { }
#endif
        // ÄÄNET (omistaja 3.10.2026: "hienovarainen tic-ääni ja sitten hieman kovempi ääni, kun kohde on lukittu, mutta ei mitenkään
        // kova sekään"): pelin omat syntetisoidut PCM-klipit (ei näytteitä), soivat tehosteväylällä (mykistys, sanelutauko, Master).
        //   tic   12 ms, 2,4 kHz sinipurske, nopea vaimeneminen (τ 2,5 ms), gain 0,10
        //   lukko 140 ms, 880 + 1320 Hz (kvintti), 4 ms:n nousu, vaimeneminen τ 45 ms, gain 0,22
        const string AaniTic = "pallo-tic", AaniLukko = "pallo-lukko";
        static bool aanetRekisteroity;

        static void RekisteroiAanet()
        {
            if (aanetRekisteroity) return;
            aanetRekisteroity = true;
            Aanet.RekisteroiTehoste(AaniTic, Syntetisoi(AaniTic, 0.012f, t => Mathf.Sin(2f * Mathf.PI * 2400f * t) * Mathf.Exp(-t / 0.0025f)), 0.10f);
            Aanet.RekisteroiTehoste(AaniLukko, Syntetisoi(AaniLukko, 0.14f, t =>
                (0.6f * Mathf.Sin(2f * Mathf.PI * 880f * t) + 0.4f * Mathf.Sin(2f * Mathf.PI * 1320f * t))
                * Mathf.Min(1f, t / 0.004f) * Mathf.Exp(-t / 0.045f)), 0.22f);
        }

        static AudioClip Syntetisoi(string nimi, float kestoS, System.Func<float, float> f)
        {
            const int Taajuus = 44100;
            int n = Mathf.CeilToInt(kestoS * Taajuus);
            var d = new float[n];
            for (int i = 0; i < n; i++) d[i] = f(i / (float)Taajuus) * (i > n - 64 ? (n - i) / 64f : 1f);   // loppu nollaan ilman napsua
            var c = AudioClip.Create(nimi, n, 1, Taajuus, false);
            c.SetData(d, 0);
            return c;
        }

        /// <summary>Haptisten napsahdusten määrä (testitila: simulaattorissa napsahdus ei tunnu, mutta määrä näkyy lokissa).</summary>
        public static int Napsahduksia { get; private set; }

        void PaivitaEhdokas(float nyt)
        {
            int i = Pallovalitsin.Keskimmainen(lista, valitsin.Lat, valitsin.Lon);
            var k = i >= 0 ? lista[i] : null;
            if (!ReferenceEquals(k, ehdokas))
            {
                // Haptinen napsahdus, kun keskimmäinen kohde vaihtuu pyörittäessä (omistaja 3.10.2026); ei ensimmäisestä ehdokkaasta
                // tartunnassa eikä tyhjään (kohteeton puoli).
                if (ehdokas != null && k != null && selaa) { MatkakirjaHaptiikka_Valinta(); Napsahduksia++; Aanet.Tehoste(AaniTic); }
                ehdokas = k;
                ehdokasAika = nyt;
                nimi.text = k?.Nimi ?? "";
                NaytaNimi(k != null, false);
                // Meripihkan piste keskimmäiseen kohteeseen: näkyy, mikä tähtäimen alla valitaan.
                materiaali.SetVector("_Kohde", k != null ? Suunta(k.Lat, k.Lon) : kohde);
                piirtoKehyksia = 2;
            }
            if (k != null && !ReferenceEquals(k, esiladattu) && nyt - ehdokasAika >= 0.15f) { esiladattu = k; Esilataa?.Invoke(k); }
        }

        /// <summary>
        /// Tartunnan koko ja siirto: KokoPt × 2, kuitenkin peitto ≤ 45 % ruudusta, turva-alueen sisällä (pystyssä nimen tila alla,
        /// vaakana oikealla). Loven (iPhone vaaka: saari vasemmassa reunassa) kohdalla pallo siirtyy sen oikealle puolelle.
        /// </summary>
        void Mittaa(out float s, out Vector2 d, out bool vaaka)
        {
            s = 1f; d = Vector2.zero; vaaka = false;
            var isa = el.parent;
            if (isa == null) return;
            var ruutu = isa.parent != null ? isa.parent.layout : isa.layout;
            var lo = isa.layout;
            var r = el.layout;
            if (!(ruutu.width > 0f) || !(ruutu.height > 0f) || !(r.width > 0f) || float.IsNaN(lo.xMin)) return;
            vaaka = ruutu.width > ruutu.height;
            float nosto = vaaka ? 0f : NimiNosto;
            float x0 = lo.xMin + r.xMin, ala = lo.yMin + r.yMax - nosto;   // pallon vasen ja alareuna ruudussa
            float D = Mathf.Min(Suurennos * KokoPt, Mathf.Sqrt(PeittoMax * ruutu.width * ruutu.height));
            D = Mathf.Min(D, ala - (lo.yMin + Reuna));
            float dx = 0f;
            float pp = Screen.height / ruutu.height;
            foreach (var c in Screen.cutouts)
            {
                // Screen.cutouts: pikselit, origo alhaalla → pisteet ylhäältä.
                var lovi = Rect.MinMaxRect(c.xMin / pp - Reuna, (Screen.height - c.yMax) / pp - Reuna, c.xMax / pp + Reuna, (Screen.height - c.yMin) / pp + Reuna);
                if (Rect.MinMaxRect(x0 + dx, ala - D, x0 + dx + D, ala).Overlaps(lovi)) dx = Mathf.Max(dx, lovi.xMax - x0);
            }
            D = Mathf.Min(D, lo.xMax - Reuna - (vaaka ? VaakaNimiTila : 0f) - (x0 + dx));
            D = Mathf.Max(D, r.width);
            s = D / r.width;
            d = new Vector2(dx, -nosto);
        }

        void Kasva(bool iso, bool heti)
        {
            float kesto = heti || LinssiUi.VahennettyLiike() ? 0f : (iso ? Tyylikirja.Kesto.Avaus : Tyylikirja.Kesto.Sulku) / 1000f;
            Siirtyma(el, kesto, "scale", "translate");
            if (iso) Mittaa(out skaala, out siirto, out nimiVaaka);
            else { skaala = 1f; siirto = Vector2.zero; }
            el.style.scale = new Scale(new Vector3(skaala, skaala, 1f));
            el.style.translate = new Translate(siirto.x, siirto.y);
        }

        /// <summary>Nimi pallon alle keskelle (pystyssä) tai oikealle puolelle pystykeskelle (vaaka), turva-alueen sisällä.</summary>
        void SijoitaNimi()
        {
            var isa = el.parent;
            var r = el.layout;
            if (isa == null || !(r.width > 0f)) return;
            float D = r.width * skaala, x = r.xMin + siirto.x, ala = r.yMax + siirto.y;
            var n = nimiLaatikko.layout;
            float w = n.width > 0f ? n.width : 0f, h = n.height > 0f ? n.height : 0f;
            if (nimiVaaka)
            {
                nimiLaatikko.style.left = x + D + NimiVaakaVali;
                nimiLaatikko.style.top = ala - D * 0.5f - h * 0.5f;
            }
            else
            {
                float iw = isa.layout.width;
                nimiLaatikko.style.left = Mathf.Max(Mathf.Min(x, Reuna), Mathf.Min(x + D * 0.5f - w * 0.5f, iw - w - Reuna));
                nimiLaatikko.style.top = ala + NimiVali;
            }
        }

        void NaytaNimi(bool nakyy, bool heti)
        {
            if (nakyy == nimiNakyy && !heti) return;
            nimiNakyy = nakyy;
            if (nakyy) { nimiLaatikko.style.display = DisplayStyle.Flex; nimiLaatikko.BringToFront(); }
            Hento(nimiLaatikko, nakyy ? 1f : 0f, nakyy, heti);
        }

        static void Hento(VisualElement e, float peitto, bool avaus, bool heti = false)
        {
            float kesto = heti || LinssiUi.VahennettyLiike() ? 0f : (avaus ? Tyylikirja.Kesto.Avaus : Tyylikirja.Kesto.Sulku) / 1000f;
            Siirtyma(e, kesto, "opacity");
            e.style.opacity = peitto;
        }

        static void Siirtyma(VisualElement e, float kestoS, params string[] ominaisuudet)
        {
            var o = new List<StylePropertyName>();
            var k = new List<TimeValue>();
            foreach (var n in ominaisuudet) { o.Add(new StylePropertyName(n)); k.Add(new TimeValue(kestoS)); }
            e.style.transitionProperty = new StyleList<StylePropertyName>(o);
            e.style.transitionDuration = new StyleList<TimeValue>(k);
        }

        // --- testikomento --------------------------------------------------------------------

        /// <summary>
        /// `astro pallo tartu|pyorita dx dy [ms]|irti|tila` (Linssiseppä 2, ilman oikeaa kosketusta): tartu = sormi palloon,
        /// pyorita = sormen siirto pisteinä (ms > 0 antaa vauhdin, jolloin irti jättää inertian), irti = sormi irti (valinta
        /// 0,5 s pysähdyksestä). Palauttaa tilan.
        /// </summary>
        public string Testaa(string[] a)
        {
            string k = a.Length > 0 ? a[0] : "tila";
            float F(int i) => a.Length > i && float.TryParse(a[i].Replace(',', '.'), System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var v) ? v : 0f;
            switch (k)
            {
                case "tartu":
                    if (pallo == null || el.resolvedStyle.display == DisplayStyle.None) return "pallo ei näy";
                    if (sormi == EiSormea) { sormi = TestiSormi; Tartu(); }
                    break;
                case "pyorita":
                    if (sormi != TestiSormi) return "tartu ensin (astro pallo tartu); " + Tila;
                    Pyorita(new Vector2(F(1), F(2)), F(3) > 0f ? F(3) / 1000.0 : double.PositiveInfinity);
                    break;
                case "irti":
                    if (sormi == TestiSormi) { sormi = EiSormea; Irti(true); }
                    break;
            }
            return Tila;
        }

        public string Tila
        {
            get
            {
                var isa = el.parent;
                var ruutu = isa?.parent != null ? isa.parent.layout : isa?.layout ?? default;
                float D = el.layout.width * skaala;
                float peitto = ruutu.width > 0f ? 100f * D * D / (ruutu.width * ruutu.height) : float.NaN;
                double j = valitsin.Jaljella(Time.unscaledTime);
                return $"pallo {(selaa ? "tartuttu" : "levossa")}{(sormi != EiSormea ? " (sormi)" : "")}, koko {el.layout.width:0}→{D:0} pt (×{skaala:0.00}), "
                    + $"peitto {peitto:0.0} %, katse {valitsin.Lat:0.0}, {valitsin.Lon:0.0}, vauhti {valitsin.Vauhti:0} °/s, "
                    + $"keskimmäinen {ehdokas?.Tunnus ?? "-"} \"{nimi.text}\", viive {(double.IsNaN(j) ? "-" : j.ToString("0.00") + " s")}, "
                    + $"nimi {(nimiNakyy ? (nimiVaaka ? "oikealla" : "alla") : "piilossa")}, napsahduksia {Napsahduksia}";
            }
        }

        bool Varmista()
        {
            if (juuri != null) return true;
            var sh = Resources.Load<Shader>("Varjostimet/Sijaintipallo");
            if (sh == null) { Debug.LogWarning("MATKAKIRJA sijaintipallo: varjostin puuttuu"); Paalla = false; return false; }
            juuri = new GameObject("Sijaintipallo");
            Object.DontDestroyOnLoad(juuri);
            var p = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            Object.Destroy(p.GetComponent<Collider>());
            p.name = "Pallo";
            p.layer = Kerros;
            p.transform.SetParent(juuri.transform, false);
            p.transform.localScale = Vector3.one * (2f * Sade);
            materiaali = new Material(sh) { name = "Sijaintipallo" };
            var r = p.GetComponent<MeshRenderer>();
            r.sharedMaterial = materiaali;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            pallo = p.transform;

            rt = new RenderTexture(320, 320, 16, RenderTextureFormat.ARGB32) { name = "Sijaintipallo", antiAliasing = 4, hideFlags = HideFlags.HideAndDontSave };
            rt.Create();
            var kg = new GameObject("SijaintipallonKamera");
            kg.transform.SetParent(juuri.transform, false);
            kg.transform.localPosition = new Vector3(0, 0, -3f * Sade);
            kamera = kg.AddComponent<Camera>();
            kamera.orthographic = true;
            kamera.orthographicSize = Sade * 1.02f;
            kamera.nearClipPlane = Sade; kamera.farClipPlane = 5f * Sade;
            kamera.clearFlags = CameraClearFlags.SolidColor;
            kamera.backgroundColor = new Color(0, 0, 0, 0);
            kamera.cullingMask = 1 << Kerros;
            kamera.targetTexture = rt;
            kamera.allowHDR = false; kamera.allowMSAA = true;
            kamera.depth = -50;
            var d = kamera.GetUniversalAdditionalCameraData();
            if (d != null) { d.renderPostProcessing = false; d.renderShadows = false; d.requiresDepthTexture = false; d.requiresColorTexture = false; }
            kamera.enabled = false;
            // Muut kamerat eivät piirrä kerrosta 12 (pallo on maan keskipisteessä, mutta varmuuden vuoksi).
            foreach (var c in Camera.allCameras) if (c != kamera) c.cullingMask &= ~(1 << Kerros);
            el.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(rt));
            if (!pintaHaettu) { pintaHaettu = true; UiKerros.Hae().StartCoroutine(HaePinta()); }
            return true;
        }

        IEnumerator HaePinta()
        {
            var tex = new Texture2D(512, 512, TextureFormat.RGB24, false) { name = "SijaintipallonPinta", wrapMode = TextureWrapMode.Repeat, filterMode = FilterMode.Bilinear };
            int kk = System.DateTime.UtcNow.Month;
            for (int x = 0; x < 2; x++)
                for (int y = 0; y < 2; y++)
                {
                    // XYZ y = 0 pohjoisessa, ämpärin polku samoin (ei reverseY, tarkistettu curlilla 1.10.). Unityn rivi 0 alhaalla: pohjoinen ylös.
                    string url = $"{PintaJuuri}{kk:00}/1/{x}/{y}.jpg";
                    using var r = UnityWebRequestTexture.GetTexture(url);
                    yield return r.SendWebRequest();
                    if (r.result != UnityWebRequest.Result.Success) { Debug.LogWarning("MATKAKIRJA sijaintipallo: " + url + " " + r.error); continue; }
                    var t = DownloadHandlerTexture.GetContent(r);
                    if (t.width != 256 || t.height != 256) { Object.Destroy(t); continue; }
                    tex.SetPixels(x * 256, (1 - y) * 256, 256, 256, t.GetPixels());
                    Object.Destroy(t);
                }
            tex.Apply(false, true);
            materiaali.SetTexture("_MainTex", tex);
            if (kamera != null) { kamera.enabled = true; piirtoKehyksia = 2; ajo?.Resume(); }
        }
    }
}
