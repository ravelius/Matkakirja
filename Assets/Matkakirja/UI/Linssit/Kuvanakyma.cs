// ASTRONAUTIN VALOKUVA (Natiivi-UI): webin .satelliitti-katselu
// (css/satelliitti.css, js/linssit/satelliitti.js avaaKuva).
//
// Koko ruutu #040907, kuva mahtuu kokonaan (contain) ja sitä voi zoomata
// sormilla (nipistys, veto; hiiren rulla editorissa; kaksoisnapautus 1× ↔ 2,5×)
// enintään 8× tai kuvan omaan tarkkuuteen asti (webin min(8, luonnollinen /
// näytetty leveys)).
//   vasen ylä    selite (tumma lasi, vihreä reuna): otsikko "Nimi — seutu"
//                vihreällä, teksti, ⌄-väkänen avaa lisätiedot (aineisto,
//                kuvausaika, paikka, kuvaustapa, kuvatunnus, lisenssi, lähde).
//                Selitteen napautus kelaa rungon kiinni/auki (otsikko jää); kohteen
//                ensimmäisellä avauksella selite on auki 1,5 s ja kelautuu sitten.
//   oikea ylä    ✕ sulkee kuvan (linssi jää auki; AstronauttiLinssi.SuljeKuva).
//   vasen ala    pikkukuvat (38 × 26), jos kohteella on useampi havainto.
//   oikea ala    minipulu astronauttina (LiviaKuva mini, leijuu itsestään);
//                napautus kujertaa ja avaa minipulun kysymyskortin (MinipulunKortti:
//                kohteen valmiit kysymykset + vapaa kysymys pulun chatin reittiä).
//   ala keskellä ‹ › viereinen kohde kartalla (AstronauttiKierros: maailmankierros myötäpäivään).
// KUVASELAIN (omistaja 27.9.2026 klo 23.5x Fablen kautta, Linssisepän suositus docs/raportit/astronautin-kuvaselain-20260928.md):
// vaakapyyhkäisy ja napautus kuvan reunaan (ulommat 22 %) selaavat kuvia kuin galleriassa: ensin kohteen omat kuvat, sitten
// viereisen kohteen kuvat maailmankierroksella, joten selaus ei pääty. Tausta on läpikuultava, ja linssin pallo liukuu kuvan
// kohteen ylle (AstronauttiLinssi.AvaaKohde): kuvan takana hohtaa himmeästi maapallo juuri kuvan kohdalta, kuin ikkunasta.
// Liu'ut 140 + 160 ms; pieni liike pois: suora vaihto.
using System;
using System.Collections.Generic;
using System.Globalization;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Astronautti;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Kuvanakyma
    {
        const float MaxZoomi = 8f, Kaksoiszoomi = 2.5f;

        readonly VisualElement juuri, lava, kuva, selite, runko, lisatiedot, nauha, pulukulma;
        readonly Label otsikko, teksti;
        readonly Button vakanen;
        readonly LiviaKuva minipulu;
        readonly MinipulunKortti pulukortti;
        Havaintokohde kohde;
        int indeksi = -1;
        Texture2D tekstuuri;
        Rect sovitus;
        float zoomi = 1f;
        Vector2 siirto;
        readonly Dictionary<int, Vector2> sormet = new Dictionary<int, Vector2>();
        float alkuEtaisyys, alkuZoomi;
        Vector2 alkuKeski, alkuSiirto;
        float edellinenNapautus = -1f;
        readonly HashSet<string> nahdyt = new HashSet<string>();
        IVisualElementScheduledItem kelaus;

        // Kuvaselain: kohdenapit, pyyhkäisy ja liuku.
        const float ReunaOsuus = 0.22f, PyyhkaisyRaja = 0.2f, PyyhkaisyNopeus = 0.6f, LiukuUlosMs = 140f, LiukuSisaanMs = 160f;
        readonly VisualElement kohdeNapit;
        Vector2 alkuPiste, viimeinenPiste;
        float alkuAika, vetoX;
        bool pyyhkaisy, liukuu;
        IVisualElementScheduledItem liuku;

        public bool Auki { get; private set; }
        public Havaintokohde Kohde => kohde;
        public event Action<bool> AukiMuuttui;

        public Kuvanakyma(UiKerros kerros)
        {
            juuri = Rakenne.El("mk-astrokuva", kerros.Juuri(LinssiUi.Ylakerros));
            juuri.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(juuri, Kirjasin.Luku);

            lava = Rakenne.El("mk-astrokuva__lava", juuri);
            kuva = Rakenne.El("mk-astrokuva__kuva", lava, PickingMode.Ignore);
            lava.RegisterCallback<GeometryChangedEvent>(_ => Sovita());
            lava.RegisterCallback<PointerDownEvent>(SormiAlas);
            lava.RegisterCallback<PointerMoveEvent>(SormiLiikkuu);
            lava.RegisterCallback<PointerUpEvent>(e => SormiYlos(e.pointerId));
            lava.RegisterCallback<PointerCancelEvent>(e => SormiYlos(e.pointerId));
            lava.RegisterCallback<PointerCaptureOutEvent>(e => SormiYlos(e.pointerId));
            lava.RegisterCallback<WheelEvent>(e =>
            {
                ZoomaaKohtaan(zoomi * Mathf.Pow(1.0015f, -e.delta.y * 40f), e.localMousePosition);
                e.StopPropagation();
            });

            // Turva-alueen sisällä: selite, sulku, nauha ja pulu.
            var turva = Rakenne.El("mk-astrokuva__turva", juuri, PickingMode.Ignore);
            kerros.TurvaMuuttui += () => AsetaTurva(turva, kerros);
            AsetaTurva(turva, kerros);

            selite = Rakenne.El("mk-astrokuva__selite", turva);
            selite.RegisterCallback<ClickEvent>(_ => Kelaa());
            otsikko = Rakenne.Teksti("", "mk-astrokuva__otsikko", selite);
            Kirjasimet.Aseta(otsikko, Kirjasin.Kone);
            runko = Rakenne.El("mk-astrokuva__runko", selite, PickingMode.Ignore);
            teksti = Rakenne.Teksti("", "mk-astrokuva__teksti", runko);
            var vakasenRivi = Rakenne.El("mk-astrokuva__vakasenRivi", runko, PickingMode.Ignore);
            vakanen = Rakenne.Nappi(null, "mk-astrokuva__vakanen", null, vakasenRivi, Ikonit.NuoliAlas);
            vakanen.tooltip = "Näytä lisätiedot";
            // Väkänen ei kelaa selitettä (web: stopPropagation).
            vakanen.RegisterCallback<ClickEvent>(e => { e.StopPropagation(); Lisatiedot(!lisatiedotAuki); });
            lisatiedot = Rakenne.El("mk-astrokuva__lisatiedot", runko, PickingMode.Ignore);
            lisatiedot.style.display = DisplayStyle.None;

            var sulku = Rakenne.Nappi("×", "mk-astrokuva__sulku", SuljeKuva, turva);
            sulku.tooltip = "Sulje kuva";

            nauha = Rakenne.El("mk-astrokuva__nauha", turva);

            // Kuvaselain: alhaalla keskellä ‹ › viereiseen kohteeseen kartalla (Linssisepän suositus 28.9.).
            kohdeNapit = Rakenne.El("mk-astrokuva__kohteet", turva, PickingMode.Ignore);
            Rakenne.Nappi("‹", "mk-astrokuva__kohdenappi", () => VaihdaKohde(-1), kohdeNapit).tooltip = "Edellinen kohde kartalla";
            Rakenne.Nappi("›", "mk-astrokuva__kohdenappi", () => VaihdaKohde(1), kohdeNapit).tooltip = "Seuraava kohde kartalla";

            // Web .satelliitti-pulukulma (löydös 96): sarake oikeassa alakulmassa, kortti pulun yläpuolella 8 pt:n välein.
            pulukulma = Rakenne.El("mk-astrokuva__pulu", turva, PickingMode.Ignore);
            pulukortti = new MinipulunKortti(pulukulma);
            pulunappi = Rakenne.El("mk-astrokuva__pulunappi", pulukulma);
            minipulu = new LiviaKuva(mini: true);
            pulunappi.Add(minipulu);
            minipulu.Aseta(new LiviaTila { Astronautti = true });
            pulunappi.RegisterCallback<PointerDownEvent>(e =>
            {
                e.StopPropagation();
                Aanet.PulunTehoste("pulu.kujerrus");
                pulukortti.Vaihda(kohde);
            });
            // Web minipulu koko 'auto': 84 pt, pieni ruutu (≤ 620 × 500) 56 pt; kortin mitat samasta ruudusta.
            turva.RegisterCallback<GeometryChangedEvent>(e =>
            {
                float w = e.newRect.width, h = e.newRect.height;
                if (float.IsNaN(w) || float.IsNaN(h) || w <= 0 || h <= 0) return;
                minipulu.MiniKorkeus(w <= 620f || h <= 500f ? 56f : 84f);
                pulukortti.Mitoita(w, h);
            });
            // Web satelliitti-pulu-leijuu (PAATOKSET 53): nappi leijuu 5 s:n kierroksella 5 pt ja ±3°, ja pysähtyy, kun pulu
            // puhuu (kysymys matkalla). Pieni liike pois: ei leijuntaa.
            pulunappi.schedule.Execute(t =>
            {
                if (!Auki || pulukortti.Kesken || LinssiUi.VahennettyLiike()) return;
                leijunta += Mathf.Min(0.1f, t.deltaTime / 1000f);
                float u = leijunta % 5f / 5f;
                float puoli = u < .5f ? u * 2 : (u - .5f) * 2;
                float e = puoli * puoli * (3 - 2 * puoli);
                float k = u < .5f ? e : 1 - e;
                pulunappi.style.translate = new Translate(0, -5 * k);
                pulunappi.style.rotate = new Rotate(new Angle(-3 + 6 * k, AngleUnit.Degree));
            }).Every(16);
        }

        readonly VisualElement pulunappi;
        float leijunta;

        static void AsetaTurva(VisualElement turva, UiKerros kerros)
        {
            // Ylakerroksella ei ole omaa turva-aluetta (Reunat = 0, jolloin otsikkopilleri jäi iPhonella Dynamic Islandin
            // alle, löydös 96); sama ruutu, joten linssikerroksen reunat (web --satelliitti-yla: 10 px + safe-area-inset-top).
            var r = kerros.Reunat(LinssiUi.Kerros);
            turva.style.left = r.x; turva.style.top = r.y; turva.style.right = r.z; turva.style.bottom = r.w;
        }

        // --- avaus ja sulku ------------------------------------------------------------

        /// <summary>AstronauttiKerros.KuvaKasittelija: kohteen havainto indeksi.</summary>
        public void Avaa(Havaintokohde k, int i)
        {
            if (k == null) { Sulje(false); return; }
            bool uusi = !ReferenceEquals(k, kohde);
            kohde = k;
            if (!Auki)
            {
                Auki = true;
                juuri.style.display = DisplayStyle.Flex;
                SyoteLukko.Esta(this);
                AukiMuuttui?.Invoke(true);
            }
            if (uusi)
            {
                // Selite on auki 1,5 s kohteen ensimmäisellä avauksella (webin sessionStorage
                // per kohde), sen jälkeen kelattuna; myöhemmin suoraan kelattuna.
                Lisatiedot(false);
                bool ensiKerta = k.Tunnus == null || nahdyt.Add(k.Tunnus);
                AsetaKiinni(!ensiKerta);
                kelaus?.Pause();
                if (ensiKerta) kelaus = selite.schedule.Execute(() => { if (!lisatiedotAuki) KelaaRiveittain(); }).StartingIn(1500);
                RakennaNauha();
                if (pulukortti.Auki) pulukortti.Avaa(k);
            }
            kohdeNapit.style.display = Linssi()?.KatsoNaapuri(1) != null ? DisplayStyle.Flex : DisplayStyle.None;
            Valitse(Mathf.Clamp(i, 0, Math.Max(0, k.Havainnot.Count - 1)));
            Esilataa();
        }

        /// <summary>Piilottaa näkymän. ilmoitaLinssille = ✕-nappi: linssi kuulee (SuljeKuva).</summary>
        public void Sulje(bool ilmoitaLinssille)
        {
            if (ilmoitaLinssille)
            {
                var linssi = UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi;
                if (linssi != null && linssi.AvoinKuva != null) { linssi.SuljeKuva(); return; } // koukku kutsuu Sulje(false)
            }
            if (!Auki) return;
            Auki = false;
            liuku?.Pause();
            liukuu = pyyhkaisy = false;
            kuva.style.opacity = StyleKeyword.Null;
            juuri.style.display = DisplayStyle.None;
            pulukortti.Sulje();
            sormet.Clear();
            SyoteLukko.Vapauta(this);
            kohde = null;
            indeksi = -1;
            AukiMuuttui?.Invoke(false);
        }

        void SuljeKuva() => Sulje(true);

        /// <summary>
        /// Avoin kuva pulun kontekstiin (web pollo.js avoinAvaruuskuva): nimi, seutu ja pelaajan näkemä
        /// selite; null, kun kuva on kiinni (vanhentunut kuva kontekstissa olisi pahempi kuin puuttuva).
        /// </summary>
        public (string Nimi, string Seutu, string Teksti)? AvoinKuva =>
            Auki && kohde != null ? (kohde.Nimi, kohde.Seutu, teksti.text) : ((string, string, string)?)null;

        /// <summary>Testikomento: minipulun kysymyskortti auki nykyiselle kohteelle.</summary>
        public void AvaaPulukortti() { if (Auki) pulukortti.Avaa(kohde); }

        void Valitse(int i)
        {
            if (kohde == null) return;
            indeksi = i;
            var h = i >= 0 && i < kohde.Havainnot.Count ? kohde.Havainnot[i] : null;
            otsikko.text = kohde.Nimi + (string.IsNullOrEmpty(kohde.Seutu) ? "" : " — " + kohde.Seutu);
            teksti.text = h?.Teksti ?? kohde.Selite ?? "";
            if (lisatiedotAuki) LadoLisatiedot();
            for (int n = 0; n < nauha.childCount; n++) nauha[n].EnableInClassList("mk-valittu", n == i);
            NollaaZoomi();
            tekstuuri = null;
            kuva.style.backgroundImage = StyleKeyword.None;
            string osoite = h?.Kuva;
            if (string.IsNullOrEmpty(osoite)) return;
            var odotettu = kohde;
            Kuvat.Hae(osoite, t =>
            {
                if (t == null || !ReferenceEquals(odotettu, kohde) || indeksi != i) return;
                tekstuuri = t;
                kuva.style.backgroundImage = new StyleBackground(t);
                Sovita();
            });
        }

        void RakennaNauha()
        {
            nauha.Clear();
            int n = kohde.Havainnot.Count;
            nauha.style.display = n > 1 ? DisplayStyle.Flex : DisplayStyle.None;
            if (n <= 1) return;
            for (int i = 0; i < n; i++)
            {
                int j = i;
                var h = kohde.Havainnot[i];
                var b = Rakenne.Nappi(null, "mk-astrokuva__pikku", () => Valitse(j), nauha);
                b.tooltip = h.Aika ?? "";
                var odotettu = kohde;
                Kuvat.Hae(h.Pikku ?? h.Kuva, t =>
                {
                    if (t != null && ReferenceEquals(odotettu, kohde)) b.style.backgroundImage = new StyleBackground(t);
                });
            }
        }

        // --- selite ------------------------------------------------------------------

        bool kiinni, lisatiedotAuki;

        void Kelaa()
        {
            kelaus?.Pause();
            AsetaKiinni(!kiinni);
        }

        IVisualElementScheduledItem riveittain;

        /// <summary>
        /// Löydös 97 (SÄÄNTÖ, omistaja build 13): automaattinen kelaus madaltaa selitteen rivin (20 pt) 45 ms:n välein ja
        /// kutistaa sen lopuksi tekstin kokoiseksi nimilaatikoksi (web .satelliitti-selite-kiinni width auto). Pieni liike
        /// pois: suoraan.
        /// </summary>
        void KelaaRiveittain()
        {
            float h = runko.layout.height;
            if (kiinni || LinssiUi.VahennettyLiike() || float.IsNaN(h) || h <= 20f) { AsetaKiinni(true); return; }
            riveittain?.Pause();
            runko.style.overflow = Overflow.Hidden;
            riveittain = runko.schedule.Execute(() =>
            {
                h -= 20f;
                if (h > 0f && !kiinni) { runko.style.maxHeight = h; return; }
                riveittain?.Pause();
                if (!kiinni) AsetaKiinni(true);
            }).Every(45);
        }

        void AsetaKiinni(bool k)
        {
            riveittain?.Pause();
            runko.style.maxHeight = StyleKeyword.Null;
            runko.style.overflow = StyleKeyword.Null;
            kiinni = k;
            selite.EnableInClassList("mk-kiinni", k);
            runko.style.display = k ? DisplayStyle.None : DisplayStyle.Flex;
        }

        void Lisatiedot(bool auki)
        {
            lisatiedotAuki = auki;
            if (auki) LadoLisatiedot();
            lisatiedot.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            vakanen.EnableInClassList("mk-auki", auki);
            vakanen.tooltip = auki ? "Piilota lisätiedot" : "Näytä lisätiedot";
        }

        void LadoLisatiedot()
        {
            lisatiedot.Clear();
            if (kohde == null) return;
            var h = indeksi >= 0 && indeksi < kohde.Havainnot.Count ? kohde.Havainnot[indeksi] : new Havainto();
            var l = AstronauttiLinssi.AstronauttiTiedot.Lahde;
            Rivi("Aineisto", l?.Aineisto);
            Rivi("Kuvausaika", Aikateksti(h.Aika));
            Rivi("Paikka", Liita(kohde.Seutu, Paikkateksti(kohde.Lat, kohde.Lon)));
            Rivi("Kuvaustapa", Liita(h.Kuvaustapa, h.Retkikunta, string.IsNullOrEmpty(h.Kuvaaja) ? null : "kuvaaja " + h.Kuvaaja));
            Rivi("Kuvatunnus", h.Id);
            Rivi("Lisenssi", l?.Lisenssi);
            // Web ulkolinkki: kuvasivu ja kuvakirjasto avautuvat selaimeen.
            Rivi("Lähde", string.IsNullOrEmpty(h.Sivu) ? null : "NASAn kuvasivu", h.Sivu);
            Rivi("Kuvakirjasto", string.IsNullOrEmpty(l?.Osoite) ? null : "NASA Image and Video Library", l?.Osoite);
        }

        void Rivi(string nimi, string arvo, string osoite = null)
        {
            if (string.IsNullOrEmpty(arvo)) return;
            var r = Rakenne.El("mk-astrokuva__lisarivi", lisatiedot, PickingMode.Ignore);
            var n = Rakenne.Teksti(nimi + ": ", "mk-astrokuva__lisanimi", r);
            Kirjasimet.Aseta(n, Kirjasin.LukuLihava);
            var a = Rakenne.Teksti(arvo, "mk-astrokuva__lisaarvo" + (osoite != null ? " mk-astrokuva__linkki" : ""), r);
            if (osoite == null) return;
            a.pickingMode = PickingMode.Position;
            a.AddManipulator(new Clickable(() => Application.OpenURL(osoite)));
        }

        static string Liita(params string[] osat)
        {
            var l = new List<string>();
            foreach (var o in osat) if (!string.IsNullOrEmpty(o)) l.Add(o);
            return l.Count == 0 ? null : string.Join(" · ", l);
        }

        /// <summary>ISO-aika suomalaiseksi päiväykseksi (webin aikateksti); muuten sellaisenaan.</summary>
        public static string Aikateksti(string aika)
        {
            if (string.IsNullOrEmpty(aika)) return null;
            if (DateTime.TryParse(aika, CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal | DateTimeStyles.AssumeUniversal, out var d))
                return aika.Length > 10
                    ? d.ToString("d.M.yyyy 'klo' H.mm 'UTC'", CultureInfo.InvariantCulture)
                    : d.ToString("d.M.yyyy", CultureInfo.InvariantCulture);
            return aika;
        }

        /// <summary>Koordinaatit suomeksi: "55,9° P · 4,3° L".</summary>
        public static string Paikkateksti(double lat, double lon)
        {
            if (double.IsNaN(lat) || double.IsNaN(lon)) return null;
            string A(double x) => Math.Abs(x).ToString("0.0", CultureInfo.InvariantCulture).Replace('.', ',');
            return A(lat) + "° " + (lat >= 0 ? "P" : "E") + " · " + A(lon) + "° " + (lon >= 0 ? "I" : "L");
        }

        // --- zoomi -------------------------------------------------------------------

        void Sovita()
        {
            var alue = lava.contentRect;
            if (tekstuuri == null || alue.width <= 0 || alue.height <= 0) return;
            float s = Mathf.Min(alue.width / tekstuuri.width, alue.height / tekstuuri.height);
            float w = tekstuuri.width * s, h = tekstuuri.height * s;
            sovitus = new Rect((alue.width - w) / 2, (alue.height - h) / 2, w, h);
            var st = kuva.style;
            st.left = sovitus.x; st.top = sovitus.y; st.width = w; st.height = h;
            Rajoita();
        }

        float Suurin => tekstuuri == null || sovitus.width <= 0 ? 1f
            : Mathf.Max(1f, Mathf.Min(MaxZoomi, tekstuuri.width / sovitus.width * PisteetPikseleina()));

        /// <summary>Paneelin piste näytön pikseleinä (kuvan oma tarkkuus rajaa zoomin).</summary>
        float PisteetPikseleina()
        {
            var p = lava.panel;
            if (p == null) return 1f;
            var a = RuntimePanelUtils.ScreenToPanel(p, Vector2.zero);
            var b = RuntimePanelUtils.ScreenToPanel(p, new Vector2(100, 0));
            float pisteita = Mathf.Abs(b.x - a.x);
            return pisteita > 0 ? pisteita / 100f : 1f;
        }

        void NollaaZoomi()
        {
            zoomi = 1f;
            siirto = Vector2.zero;
            Aseta();
        }

        void ZoomaaKohtaan(float uusi, Vector2 kohta)
        {
            uusi = Mathf.Clamp(uusi, 1f, Suurin);
            // Kohta (lavan pisteinä) pysyy paikallaan: kuvan keskipiste on sovituksen keskellä + siirto.
            var keski = sovitus.center + siirto;
            siirto += (kohta - keski) * (1 - uusi / zoomi);
            zoomi = uusi;
            Rajoita();
        }

        void Rajoita()
        {
            if (zoomi <= 1.0001f) { zoomi = 1f; siirto = Vector2.zero; }
            var alue = lava.contentRect;
            float vx = Mathf.Max(0, (sovitus.width * zoomi - alue.width) / 2);
            float vy = Mathf.Max(0, (sovitus.height * zoomi - alue.height) / 2);
            // Kuvan keskipiste saa siirtyä lavan keskeltä enintään ylityksen verran.
            var keskiero = alue.center - sovitus.center;
            siirto.x = Mathf.Clamp(siirto.x, keskiero.x - vx, keskiero.x + vx);
            siirto.y = Mathf.Clamp(siirto.y, keskiero.y - vy, keskiero.y + vy);
            if (vx <= 0) siirto.x = zoomi > 1 ? keskiero.x : 0;
            if (vy <= 0) siirto.y = zoomi > 1 ? keskiero.y : 0;
            Aseta();
        }

        void Aseta()
        {
            kuva.style.scale = new Scale(new Vector3(zoomi, zoomi, 1));
            kuva.style.translate = new Translate(siirto.x, siirto.y);
            juuri.EnableInClassList("mk-zoomattu", zoomi > 1.001f);
        }

        void SormiAlas(PointerDownEvent e)
        {
            sormet[e.pointerId] = e.localPosition;
            lava.CapturePointer(e.pointerId);
            if (sormet.Count == 1)
            {
                alkuPiste = viimeinenPiste = e.localPosition;
                alkuAika = Time.unscaledTime;
                pyyhkaisy = false;
                vetoX = 0f;
                // Reunan napautus selaa (kuvaselain), joten kaksoisnapautuksen zoomi vain keskiosassa.
                if (zoomi <= 1.001f && Reunalla(e.localPosition.x) != 0) { edellinenNapautus = -1f; AloitaEle(); return; }
                // Kaksoisnapautus: 1× ↔ 2,5× napautuskohtaan.
                float nyt = Time.unscaledTime;
                if (edellinenNapautus > 0 && nyt - edellinenNapautus < 0.3f)
                {
                    edellinenNapautus = -1f;
                    if (zoomi > 1.01f) NollaaZoomi();
                    else ZoomaaKohtaan(Kaksoiszoomi, e.localPosition);
                }
                else edellinenNapautus = nyt;
            }
            else if (pyyhkaisy)
            {
                // Toinen sormi kesken pyyhkäisyn: nipistys voittaa, kuva palaa paikalleen.
                pyyhkaisy = false;
                Liu(vetoX, 0f, 120f, 1f, null);
            }
            AloitaEle();
        }

        void SormiLiikkuu(PointerMoveEvent e)
        {
            if (!sormet.ContainsKey(e.pointerId)) return;
            sormet[e.pointerId] = e.localPosition;
            if (sormet.Count == 1) viimeinenPiste = e.localPosition;
            // Kuvaselain: yhden sormen vaakaveto täysikokoisessa kuvassa kuljettaa kuvaa sormen mukana.
            if (sormet.Count == 1 && zoomi <= 1.001f && !liukuu)
            {
                var d = (Vector2)e.localPosition - alkuPiste;
                if (!pyyhkaisy && Mathf.Abs(d.x) > 10f && Mathf.Abs(d.x) > 1.3f * Mathf.Abs(d.y)) { pyyhkaisy = true; edellinenNapautus = -1f; }
                if (pyyhkaisy)
                {
                    vetoX = d.x;
                    kuva.style.translate = new Translate(siirto.x + vetoX, siirto.y);
                    return;
                }
            }
            var (keski, etaisyys) = Ele();
            if (sormet.Count >= 2 && alkuEtaisyys > 1f)
            {
                float uusi = Mathf.Clamp(alkuZoomi * etaisyys / alkuEtaisyys, 1f, Suurin);
                // Nipistyksen keskipiste pysyy sormien välissä ja liikkuu niiden mukana.
                var kuvanKeski = sovitus.center + alkuSiirto;
                siirto = alkuSiirto + (alkuKeski - kuvanKeski) * (1 - uusi / alkuZoomi) + (keski - alkuKeski);
                zoomi = uusi;
                Rajoita();
            }
            else if (zoomi > 1f)
            {
                siirto = alkuSiirto + (keski - alkuKeski);
                Rajoita();
            }
        }

        void SormiYlos(int id)
        {
            if (!sormet.Remove(id)) return;
            if (lava.HasPointerCapture(id)) lava.ReleasePointer(id);
            if (sormet.Count == 0) PaataPyyhkaisy();
            AloitaEle();
        }

        // --- kuvaselain ---------------------------------------------------------------

        /// <summary>Reunavyöhyke: −1 vasen, +1 oikea, 0 keskiosa (lavan leveydestä ulommat <see cref="ReunaOsuus"/>).</summary>
        int Reunalla(float x)
        {
            float w = lava.contentRect.width;
            if (!(w > 0)) return 0;
            return x < w * ReunaOsuus ? -1 : x > w * (1 - ReunaOsuus) ? 1 : 0;
        }

        /// <summary>Sormi nousi: pyyhkäisy ratkeaa (matka tai vauhti) tai reunan napautus selaa.</summary>
        void PaataPyyhkaisy()
        {
            float kesto = Mathf.Max(1f, (Time.unscaledTime - alkuAika) * 1000f);
            if (pyyhkaisy)
            {
                pyyhkaisy = false;
                float w = Mathf.Max(1f, lava.contentRect.width);
                bool menee = Mathf.Abs(vetoX) > w * PyyhkaisyRaja || Mathf.Abs(vetoX) / kesto > PyyhkaisyNopeus;
                if (menee) Selaa(vetoX < 0 ? 1 : -1);
                else Liu(vetoX, 0f, 120f, 1f, null);   // takaisin paikalleen
                return;
            }
            // Napautus reunaan (lyhyt, ei liikettä): edellinen / seuraava kuva.
            if (zoomi <= 1.001f && !liukuu && kesto < 300f && (viimeinenPiste - alkuPiste).sqrMagnitude < 100f)
            {
                int r = Reunalla(alkuPiste.x);
                if (r != 0) Selaa(r);
            }
        }

        /// <summary>Galleria: kohteen seuraava tai edellinen kuva; kohteen lopussa jatketaan viereiseen kohteeseen.</summary>
        public void Selaa(int suunta)
        {
            if (kohde == null || suunta == 0 || liukuu) return;
            int j = indeksi + Math.Sign(suunta);
            if (j >= 0 && j < kohde.Havainnot.Count) { Vaihda(suunta, () => Valitse(j)); return; }
            var linssi = Linssi();
            if (linssi == null) { Liu(vetoX, 0f, 120f, 1f, null); return; }
            Vaihda(suunta, () => linssi.Naapuri(suunta, galleria: true));
        }

        /// <summary>Alanapit ‹ ›: viereinen kohde kartalla (sen oletuskuva); pallo liukuu uuden kohteen ylle.</summary>
        public void VaihdaKohde(int suunta)
        {
            var linssi = Linssi();
            if (linssi == null || liukuu) return;
            Vaihda(suunta, () => linssi.Naapuri(suunta));
        }

        static AstronauttiLinssi Linssi()
        {
            var l = UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi;
            return l != null && l.AvoinKuva != null ? l : null;
        }

        /// <summary>
        /// Liuku: nykyinen kuva ulos suunnan vastaiselle puolelle (140 ms), vaihto, uusi sisään toiselta puolelta
        /// neljänneksen matkalta häivyttäen (160 ms). Pieni liike pois: suora vaihto.
        /// </summary>
        void Vaihda(int suunta, Action vaihto)
        {
            if (LinssiUi.VahennettyLiike()) { vetoX = 0f; vaihto(); Esilataa(); return; }
            float w = Mathf.Max(1f, lava.contentRect.width);
            Liu(vetoX, -Math.Sign(suunta) * w, LiukuUlosMs, 1f, () =>
            {
                vaihto();
                Liu(Math.Sign(suunta) * w * 0.25f, 0f, LiukuSisaanMs, 0f, Esilataa);
            });
        }

        /// <summary>Kuvan vaakasiirto <paramref name="alku"/> → <paramref name="loppu"/> (pt) ajassa <paramref name="ms"/>;
        /// läpinäkyvyys <paramref name="alkuPeitto"/> → 1 (pehmeä käyrä).</summary>
        void Liu(float alku, float loppu, float ms, float alkuPeitto, Action valmis)
        {
            liuku?.Pause();
            liukuu = true;
            float t0 = Time.unscaledTime;
            liuku = kuva.schedule.Execute(() =>
            {
                float u = Mathf.Clamp01((Time.unscaledTime - t0) * 1000f / ms);
                float s = u * u * (3f - 2f * u);
                kuva.style.translate = new Translate(siirto.x + Mathf.Lerp(alku, loppu, s), siirto.y);
                kuva.style.opacity = Mathf.Lerp(alkuPeitto, 1f, s);
                if (u < 1f) return;
                liuku.Pause();
                liukuu = false;
                vetoX = 0f;
                kuva.style.opacity = StyleKeyword.Null;
                valmis?.Invoke();
            }).Every(16);
        }

        /// <summary>Seuraavat kuvat välimuistiin (Kuvat.Hae): kohteen naapurikuvat ja viereisten kohteiden ensimmäiset kuvat.</summary>
        void Esilataa()
        {
            if (kohde == null) return;
            void Hae(Havaintokohde k, int i)
            {
                if (k == null || i < 0 || i >= k.Havainnot.Count || string.IsNullOrEmpty(k.Havainnot[i].Kuva)) return;
                Kuvat.Hae(k.Havainnot[i].Kuva, _ => { });
            }
            Hae(kohde, indeksi + 1);
            Hae(kohde, indeksi - 1);
            var l = Linssi();
            if (l == null) return;
            var s = l.KatsoNaapuri(1);
            Hae(s, 0);
            var e = l.KatsoNaapuri(-1);
            Hae(e, e != null ? e.Havainnot.Count - 1 : -1);
        }

        void AloitaEle()
        {
            var (keski, etaisyys) = Ele();
            alkuKeski = keski;
            alkuEtaisyys = etaisyys;
            alkuZoomi = zoomi;
            alkuSiirto = siirto;
        }

        (Vector2 Keski, float Etaisyys) Ele()
        {
            if (sormet.Count == 0) return (Vector2.zero, 0);
            Vector2 a = default, b = default;
            int n = 0;
            foreach (var p in sormet.Values) { if (n == 0) a = p; else if (n == 1) b = p; n++; }
            return n >= 2 ? ((a + b) / 2, Vector2.Distance(a, b)) : (a, 0);
        }

        // --- testi -------------------------------------------------------------------

        /// <summary>Testikomennon esimerkkikohde (Commonsin NASA-kuvat, PD).</summary>
        public static Havaintokohde Esimerkki() => new Havaintokohde
        {
            Tunnus = "testi", Nimi = "Maa Apollo 17:stä", Seutu = "Afrikka ja Arabian niemimaa",
            Selite = "Sininen marmori: Apollo 17:n miehistön kuva koko valaistusta maapallosta.",
            Lat = -3, Lon = 30,
            Havainnot = new List<Havainto>
            {
                new Havainto { Id = "AS17-148-22727", Aika = "1972-12-07T10:39:00Z", Kuvaustapa = "käsikamera", Retkikunta = "Apollo 17",
                    Teksti = "Sininen marmori, 7.12.1972.", Kuva = "The Earth seen from Apollo 17.jpg" },
                new Havainto { Id = "AS08-14-2383", Aika = "1968-12-24", Kuvaustapa = "käsikamera", Retkikunta = "Apollo 8",
                    Teksti = "Maannousu Kuun takaa, 24.12.1968.", Kuva = "NASA-Apollo8-Dec24-Earthrise.jpg" },
            },
        };
    }
}
