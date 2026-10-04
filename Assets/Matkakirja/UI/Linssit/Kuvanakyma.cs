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
//                ensimmäisellä avauksella selite on auki 1,5 s ja kelautuu sitten; kun selaus vie
//                jo nähtyyn kohteeseen, nimipilleri kirkastuu täyteen peittoon 1,2 s:ksi.
//                Koko liukuu nimipillerin ja avatun välillä (Tiivistys, omistaja 28.9. "animoitu
//                pienennys mahdollisimman tiiviiksi"), ja selite luetaan ääneen kertojan äänellä
//                (säilölohko astro-selite kuten webissä, PR #3568). Kuvan napautus, veto, nipistys
//                ja rulla pienentävät auki olevan selitteen (web LISÄYS 6), mutta eivät koskaan avaa sitä.
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
// AUTO (omistaja 2.10.2026, Hongkongin kaappaus: "Automaattinen kohteen vaihto olisi tässä kiva."; web satelliitti.js PR #3817):
// NOSTOKORTTI-pohjan osa AUTO samalla asetuksella kuin nostoselaimen AUTO (Nostoselain.Auto, PlayerPrefs matkakirja-lukija-auto).
// Kytkin "● AUTO" ‹ ›:n ryhmään alhaalle keskelle (LASI-AVARUUS; Päätoimittaja 2.10.), TUMMA lappu "Seuraava: <nimi> 3 s · Pysäytä"
// rivin yläpuolelle.
// AUTOn aikana selite pysyy minimoituna, otsikkona on pelkkä kohteen nimi, ja kertoja lukee leipätekstin (vaikka Kertoja olisi
// pois); luennan jälkeen 3 s ja seuraava kohde AstronauttiKierroksen järjestyksessä. Pelaajan kosketus (muu kuin kytkin tai
// lappu) pysäyttää AUTOn.
// PALLOVALITSIN (omistaja 3.10.2026, vain natiivi): vasemman alakulman sijaintipalloa voi pyörittää; tartunta kasvattaa sen ja
// himmentää kuvan, keskimmäisen kohteen nimi näkyy pallon alla, ja 0,5 s pysähdyksestä (sormi irti) kohde avautuu kuten ‹ ›.
// AUTO on tauolla pyörityksen ajan ja jatkaa valitusta kohteesta (Sijaintipallo, Pallovalitsin).
// AVAUS JA SULKU (Raamattu PR #3602, omistaja 29.9.2026): näkymä kasvaa ja häivyttyy esiin kohteen pisteestä ruudulla
// (napautettu kohta; Pulun tervetulossa väärä kohde) ja sulkeutuu samaa reittiä, Ponnahdus-apurilla webin arvoin.
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
        // AUTO (web PR #3817).
        const float AutoSiirtoS = 3f;
        readonly VisualElement autoKulma, autoLappu, autoPalkki;
        // AUTON HILJAINEN TILA (omistaja 2.10. 21.3x, web sama Pelikoodarin kanssa): AUTOn aikana ✕, Pulu, ‹ › ja AUTO häivytetään
        // (Kesto.Sulku), ensimmäinen napautus vain palauttaa ne (Kesto.Avaus) ja ne häviävät taas 4 s viimeisen kosketuksen jälkeen.
        const float AutoPiilotusS = 4f;
        VisualElement sulkuNappi;
        bool autoNapitPiilossa;
        float autoKosketus;
        IVisualElementScheduledItem autoPiilotus;
        readonly System.Collections.Generic.Dictionary<int, Vector3> autoSormet = new System.Collections.Generic.Dictionary<int, Vector3>();
        readonly Button autoNappi;
        readonly Label autoNimi, autoAika;
        IVisualElementScheduledItem autoAjo;
        float autoAlku;
        int luentaVuoro;
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

        /// <summary>Kuvapari samasta käännöksestä (`ui linssi kuvaselain 0|1`): true = 1.0.33 (läpinäkymätön tausta, ei ‹ ›).</summary>
        public static bool Vanha;

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
                KelaaKuvasta();
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

            // ✕ OHJAUSNAPPI-neliönä harmaalla teemalla (omistaja 16.9. harmaa, 2.10. klo 14.2x EI OVAALEJA; Päätoimittaja 3.10.).
            var sulku = Ohjausnappi.Nappi(Ikonit.Viiva["rasti"], "Sulje kuva", SuljeKuva, turva, "harmaa");
            sulku.AddToClassList("mk-kuvanakyma__sulku");
            sulkuNappi = sulku;

            nauha = Rakenne.El("mk-astrokuva__nauha", turva);

            // Kuvaselain: alhaalla keskellä ‹ › viereiseen kohteeseen kartalla (Linssisepän suositus 28.9.).
            kohdeNapit = Rakenne.El("mk-astrokuva__kohteet", turva, PickingMode.Ignore);
            // OHJAUSNAPPI-neliöinä avaruuslasin teemalla kuten AUTO (omistaja 2.10. klo 14.2x EI OVAALEJA; Päätoimittaja 3.10.: ennen
            // piirretty 30 pt:n kiekko); väkänen viivakuvakkeena (Ikonit.Takaisin / NuoliOikea).
            foreach (int suunta in new[] { -1, 1 })
            {
                int s = suunta;
                var n = Ohjausnappi.Nappi(s < 0 ? Ikonit.Takaisin : Ikonit.NuoliOikea, s < 0 ? "Edellinen kohde kartalla" : "Seuraava kohde kartalla",
                    () => VaihdaKohde(s), kohdeNapit, "lasi-avaruus");
                n.AddToClassList("mk-astrokuva__kohdenappi");
            }

            // AUTO: kytkin ‹ ›:n ryhmään alhaalle keskelle "AUTO ‹ ›" (Päätoimittaja 2.10.: vasemmassa alakulmassa pilleri osui
            // pikkukuvanauhaan; natiivissa vasemmalla on myös minipallo), siirtolappu rivin yläpuolelle koko leveydelle.
            autoKulma = Rakenne.El("mk-astrokuva__autokulma tk-teema-lasi-avaruus", null, PickingMode.Ignore);
            kohdeNapit.Insert(0, autoKulma);
            autoNappi = Rakenne.Nappi(null, "mk-astrokuva__auto", () => AsetaAuto(!Nostoselain.Auto), autoKulma);
            Rakenne.El("mk-astrokuva__autopiste", autoNappi, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("AUTO", "mk-nappi__teksti mk-astrokuva__autoteksti", autoNappi), Kirjasin.KoneBold);
            autoNappi.tooltip = "Auto: lukee kohteen ja siirtyy seuraavaan";
            autoLappu = Rakenne.El("mk-astrokuva__autolappu tk-teema-tumma", turva);
            autoLappu.style.display = DisplayStyle.None;
            var lappuTeksti = Rakenne.El("mk-astrokuva__autolapputeksti", autoLappu, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("Seuraava:", "mk-astrokuva__autolappuohje", lappuTeksti), Kirjasin.Kone);
            autoNimi = Rakenne.Teksti("", "mk-astrokuva__autolappunimi", lappuTeksti);
            Kirjasimet.Aseta(autoNimi, Kirjasin.Kone);
            autoAika = Rakenne.Teksti("", "mk-astrokuva__autolappuaika", autoLappu);
            Kirjasimet.Aseta(autoAika, Kirjasin.KoneBold);
            var pysayta = Rakenne.Nappi("Pysäytä", "mk-astrokuva__autopysayta", () => AsetaAuto(false), autoLappu);
            Kirjasimet.Aseta(pysayta, Kirjasin.KoneBold);
            autoPalkki = Rakenne.El("mk-astrokuva__autopalkki", autoLappu, PickingMode.Ignore);
            // AUTOn aikana (web sama): piilotettujen nappien aikana ensimmäinen napautus vain palauttaa ne (ei toimintoa alla);
            // näkyvillä napeilla ‹ › ja AUTO toimivat itse, veto ja nipistys pysäyttävät AUTOn (web pysaytaAuto).
            juuri.RegisterCallback<PointerDownEvent>(e =>
            {
                if (!AutoKaytossa || sijaintipallo.Sisaltaa(e.target as VisualElement)) return;   // pallo: AUTO tauolla, ei pysähdy
                autoKosketus = Time.unscaledTime;
                if (autoNapitPiilossa)
                {
                    NaytaAutoNapit(true);
                    e.StopImmediatePropagation();
                    return;
                }
                var k = e.target as VisualElement;
                if (k != null && kohdeNapit.Contains(k) && !autoKulma.Contains(k)) AsetaAuto(false);   // ‹ ›
                AjastaAutoPiilotus();
            }, TrickleDown.TrickleDown);
            // Veto (> 12 pt alkupisteestä) tai toinen sormi (nipistys) pysäyttää AUTOn kuten ennen.
            juuri.RegisterCallback<PointerDownEvent>(e =>
            {
                if (sijaintipallo.Sisaltaa(e.target as VisualElement)) return;
                autoSormet[e.pointerId] = e.position;
                if (AutoKaytossa && autoSormet.Count > 1) AsetaAuto(false);
            }, TrickleDown.TrickleDown);
            juuri.RegisterCallback<PointerMoveEvent>(e =>
            {
                if (!AutoKaytossa || !autoSormet.TryGetValue(e.pointerId, out var alku)) return;
                if (((Vector2)e.position - (Vector2)alku).sqrMagnitude > 144f) AsetaAuto(false);
            }, TrickleDown.TrickleDown);
            juuri.RegisterCallback<PointerUpEvent>(e => autoSormet.Remove(e.pointerId), TrickleDown.TrickleDown);
            juuri.RegisterCallback<PointerCancelEvent>(e => autoSormet.Remove(e.pointerId), TrickleDown.TrickleDown);

            sijaintipallo = new Sijaintipallo(turva);
            sijaintipallo.Ehdokkaat = () => Linssi()?.Kohteet;
            sijaintipallo.Tartuttu += PalloTartuttu;
            sijaintipallo.Valittu += PalloValitsi;
            sijaintipallo.Esilataa += k =>
            {
                int i = k.OletusIndeksi;
                if (i >= 0 && i < k.Havainnot.Count && !string.IsNullOrEmpty(k.Havainnot[i].Kuva)) Kuvat.Hae(k.Havainnot[i].Kuva, _ => { });
            };

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
                // Web #3590: minipulu avaa Pulun taulun, jonka "Kysy Pululta" avaa tämän kortin; ilman taulua kortti.
                if (MinipuluNapautettu != null) MinipuluNapautettu();
                else pulukortti.Vaihda(kohde);
            });
            // Web minipulu koko 'auto': 84 pt, pieni ruutu (≤ 620 × 500) 56 pt; kortin mitat samasta ruudusta.
            turva.RegisterCallback<GeometryChangedEvent>(e =>
            {
                float w = e.newRect.width, h = e.newRect.height;
                if (float.IsNaN(w) || float.IsNaN(h) || w <= 0 || h <= 0) return;
                minipulu.MiniKorkeus(w <= 620f || h <= 500f ? 56f : 84f);
                pulukortti.Mitoita(w, h);
                turvaLeveys = w;
                RajaaNauha();
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
        /// <summary>Pieni sijaintipallo vasemmassa alakulmassa (omistaja 1.10.).</summary>
        readonly Sijaintipallo sijaintipallo;
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
            bool selaus = uusi && Auki && kohde != null;   // kohde vaihtui kuvaselaimessa (pyyhkäisy, reuna tai ‹ ›)
            kohde = k;
            if (!Auki)
            {
                Auki = true;
                // Kasvaa esiin kohteen pisteestä (Raamattu AVAUS JA SULKU AINA ANIMOIDEN, omistaja 29.9.2026; Ponnahdus = webin arvot).
                Ponnahdus.Avaa(juuri, Origo(k));
                SyoteLukko.Esta(this);
                AukiMuuttui?.Invoke(true);
            }
            if (uusi)
            {
                // Selite on auki 1,5 s kohteen ensimmäisellä avauksella (webin sessionStorage
                // per kohde), sen jälkeen kelattuna; myöhemmin suoraan kelattuna.
                Lisatiedot(false);
                bool ensiKerta = (k.Tunnus == null || nahdyt.Add(k.Tunnus)) && !AutoKaytossa;   // AUTO: selite minimoituna
                // Selauksessa laatikko liukuu edellisen kohteen koosta uuteen (PIENENNETTY = MAHDOLLISIMMAN TIIVIS, ANIMOIDEN).
                if (selaus) Tiivistys.AnimoiKoko(selite, () => AsetaKiinni(!ensiKerta));
                else AsetaKiinni(!ensiKerta);
                vinkki = ensiKerta;
                kelaus?.Pause();
                if (ensiKerta)
                    kelaus = selite.schedule.Execute(() => { if (lisatiedotAuki) vinkki = false; else KelaaRiveittain(); }).StartingIn(1500);
                else if (selaus && !Vanha) Korosta();
                RakennaNauha();
                if (pulukortti.Auki) pulukortti.Avaa(k);
                // Pallosta valittu kohde: pallo pysyy sormen jättämässä asennossa, vain merkki siirtyy (omistaja 4.10.2026).
                if (palloValitsi) { palloValitsi = false; sijaintipallo.MerkitseKohde(k.Lat, k.Lon); }
                else sijaintipallo.Kohteeseen(k.Lat, k.Lon, selaus && !LinssiUi.VahennettyLiike());
            }
            PaivitaVanha();
            NaytaAutoTila();
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
            sijaintipallo.Piilota();
            autoOdottaa = false;
            LopetaSiirto();
            NaytaAutoNapit(true);   // seuraava avaus alkaa napit näkyvissä
            autoPiilotus?.Pause();
            autoSormet.Clear();
            luentaVuoro++;
            LopetaLuenta();
            kelaus?.Pause();
            riveittain?.Pause();
            vinkki = false;
            Tiivistys.Lopeta(selite);
            korostus?.Pause();
            selite.RemoveFromClassList("mk-korostus");
            liuku?.Pause();
            liukuu = pyyhkaisy = false;
            kuva.style.opacity = StyleKeyword.Null;
            // Sulkeutuu samaa reittiä avauksen pisteeseen (Ponnahdus, 200 ms); linssi ja pallo saavat syötteen heti.
            Ponnahdus.Sulje(juuri);
            pulukortti.Sulje();
            sormet.Clear();
            SyoteLukko.Vapauta(this);
            kohde = null;
            indeksi = -1;
            AukiMuuttui?.Invoke(false);
        }

        void SuljeKuva() => Sulje(true);

        /// <summary>
        /// Avauksen suunta: kohteen piste ruudulla paneelin koordinaateissa eli napautettu kohta, tai Pulun tervetulossa väärä
        /// kohde, jonka nokka räppäisi auki. null (keskeltä), jos piste ei näy.
        /// </summary>
        Vector2? Origo(Havaintokohde k)
        {
            var kerros = UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>();
            if (k == null || kerros == null || juuri.panel == null || !kerros.KohdeRuudulla(k.Tunnus, out var px)) return null;
            return RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(px.x, Screen.height - px.y));
        }

        /// <summary>
        /// Avoin kuva pulun kontekstiin (web pollo.js avoinAvaruuskuva): nimi, seutu ja pelaajan näkemä
        /// selite; null, kun kuva on kiinni (vanhentunut kuva kontekstissa olisi pahempi kuin puuttuva).
        /// </summary>
        public (string Nimi, string Seutu, string Teksti)? AvoinKuva =>
            Auki && kohde != null ? (kohde.Nimi, kohde.Seutu, teksti.text) : ((string, string, string)?)null;

        /// <summary>Testikomento ja Pulun taulun "Kysy Pululta": minipulun kysymyskortti auki nykyiselle kohteelle.</summary>
        public void AvaaPulukortti() { if (Auki) pulukortti.Avaa(kohde); }

        /// <summary>Pulun taulu avautuu kortin paikalle (web: taulu ja kuvan chatti eivät ole yhtä aikaa samassa kulmassa).</summary>
        public void SuljePulukortti() => pulukortti.Sulje();

        /// <summary>Minipulun napautus (web #3590: valokuvan minipulu avaa Pulun taulun). Ilman kuuntelijaa kortti.</summary>
        public event Action MinipuluNapautettu;

        /// <summary>Minipulun laatikko Pulun taulun sijoitukseen (web pulunLaatikko: kuvan ollessa auki minipulu).</summary>
        public Rect MinipulunLaatikko => Auki && pulunappi.panel != null ? pulunappi.worldBound : default;

        /// <summary>Alarivin AUTO ‹ › -ryhmä Pulun taulun väistöön (laite 4.10.: taulu peitti AUTOn kuvamoodissa).</summary>
        public Rect KohdenappienLaatikko => Auki && kohdeNapit.panel != null && kohdeNapit.resolvedStyle.display == DisplayStyle.Flex
            ? kohdeNapit.worldBound : default;

        void Valitse(int i)
        {
            if (kohde == null) return;
            indeksi = i;
            var h = i >= 0 && i < kohde.Havainnot.Count ? kohde.Havainnot[i] : null;
            AsetaOtsikko();
            teksti.text = h?.Teksti ?? kohde.Selite ?? "";
            LueSelite(h);
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

        /// <summary>Kohteen ensimmäisen avauksen vinkki (auki 1,5 s, sitten automaattinen kelaus) on kesken.</summary>
        bool vinkki;

        /// <summary>
        /// Selitteen napautus kelaa rungon kiinni tai auki. PIENENNETTY = MAHDOLLISIMMAN TIIVIS, ANIMOIDEN (omistaja 28.9.2026,
        /// Raamattu PR #3527; web satelliitti.js asetaSelite + js/tiivistys.js): laatikko liukuu nimipillerin ja avatun koon
        /// välillä (Tiivistys.AnimoiKoko, 250 ms) eikä hyppää. PELAAJAN ELE VOITTAA VINKIN (web kelaaSelite): napautus kesken
        /// vinkin tai sen automaattisen kelauksen lopettaa sen ja jättää selitteen auki, muuten laatikko sulkeutuisi juuri
        /// kun pelaaja alkaa lukea.
        /// </summary>
        void Kelaa()
        {
            kelaus?.Pause();
            bool k = !vinkki && !kiinni;
            Tiivistys.AnimoiKoko(selite, () => AsetaKiinni(k));
        }

        /// <summary>
        /// KUVAN KÄSITTELY PIENENTÄÄ SELITTEEN (web LISÄYS 6: "Inforuutu saisi pienentyä automaattisesti kun kuvaa klikataan,
        /// panoroidaan tai zoomataan"; web satelliitti.js kelaaKuvasta): lavan kosketus (napautus, veto, nipistys, pyyhkäisy ja
        /// reunan napautus) ja rulla pienentävät auki olevan selitteen liukuen ja lopettavat vinkin. Yksisuuntainen: kuva ei
        /// koskaan avaa selitettä, vaan avaus tapahtuu vain selitteen napautuksesta (muuten panorointi vilkuttaisi laatikkoa).
        /// </summary>
        void KelaaKuvasta()
        {
            kelaus?.Pause();
            vinkki = false;
            if (kiinni) return;
            Tiivistys.AnimoiKoko(selite, () => AsetaKiinni(true));
        }

        IVisualElementScheduledItem riveittain;

        /// <summary>
        /// Löydös 97 (SÄÄNTÖ, omistaja build 13): automaattinen kelaus madaltaa selitteen rivin (20 pt) 45 ms:n välein ja
        /// kutistaa sen lopuksi tekstin kokoiseksi nimilaatikoksi (web .satelliitti-selite-kiinni width auto). Viimeinen
        /// vaihe liukuu nimipilleriksi (Tiivistys, omistaja 28.9.: animoitu pienennys mahdollisimman tiiviiksi), joten
        /// leveys ei hyppää. Pieni liike pois: suoraan.
        /// </summary>
        void KelaaRiveittain()
        {
            if (kiinni) { AsetaKiinni(true); return; }
            float h = runko.layout.height;
            if (LinssiUi.VahennettyLiike() || float.IsNaN(h) || h <= 20f) { Tiivistys.AnimoiKoko(selite, () => AsetaKiinni(true)); return; }
            riveittain?.Pause();
            runko.style.overflow = Overflow.Hidden;
            riveittain = runko.schedule.Execute(() =>
            {
                h -= 20f;
                if (h > 0f && !kiinni) { runko.style.maxHeight = h; return; }
                riveittain?.Pause();
                if (!kiinni) Tiivistys.AnimoiKoko(selite, () => AsetaKiinni(true));
            }).Every(45);
        }

        IVisualElementScheduledItem korostus;

        /// <summary>
        /// Kuvaselain (Fable hyväksyi 28.9. klo 00.0x): kun selaus vie jo nähtyyn kohteeseen, kiinni oleva nimipilleri
        /// kirkastuu täyteen peittoon 1,2 s:ksi (häivytys 150 ms, Linssit.uss mk-korostus), jotta kohteen vaihto huomataan
        /// aina. Ensimmäisellä käynnillä selite avautuu kokonaan 1,5 s:ksi, joten korostusta ei tarvita.
        /// </summary>
        void Korosta()
        {
            korostus?.Pause();
            selite.AddToClassList("mk-korostus");
            korostus = selite.schedule.Execute(() => selite.RemoveFromClassList("mk-korostus")).StartingIn(1200);
        }

        void AsetaKiinni(bool k)
        {
            riveittain?.Pause();
            vinkki = false;
            runko.style.maxHeight = StyleKeyword.Null;
            runko.style.overflow = StyleKeyword.Null;
            kiinni = k;
            selite.EnableInClassList("mk-kiinni", k);
            runko.style.display = k ? DisplayStyle.None : DisplayStyle.Flex;
        }

        // --- luenta ------------------------------------------------------------------

        string luettu, luennanUrl;

        /// <summary>
        /// Selitettä ei lueta, kun tämä on tosi: Pulun tervetulo puhuu, ja sen C1 avaa väärän kuvan kesken repliikin (omistaja
        /// 8.9.2026: pulun ja kertojan äänet eivät mene päällekkäin; PulunTervetuloNakyma asettaa).
        /// </summary>
        public static Func<bool> LuentaEste;

        /// <summary>
        /// SELITE LUETAAN ÄÄNEEN (omistaja 28.9.2026: "Tee selitteelle myös striinilukija joka automaattisesti päällä"; web
        /// satelliitti.js lueSelite, PR #3568): kuvan avautuessa ja vaihtuessa selite luetaan kertojan äänellä palavirtana
        /// (Puhe.Lue), kun Kertoja on päällä (sama kytkin kuin matkakirjan automaattisella luennalla). Uusi kuva keskeyttää
        /// edellisen luennan (yksi puhuja kerrallaan), ja kuvan sulkeminen lopettaa sen. Teksti (Havaintokohde.Luettava) ja
        /// säilölohko (AstronauttiLinssi.SelitteenSailio) ovat samat kuin webissä, joten sama selite syntetisoidaan kerran
        /// molemmille alustoille (laite, reuna ja ämpäri).
        /// </summary>
        void LueSelite(Havainto h)
        {
            // AUTO lukee itse, vaikka Kertoja olisi pois (web: NOSTOKORTTI-osa AUTO "luenta, siirtyy seuraavaan").
            bool auto = AutoKaytossa;
            if (kohde == null || (!Puhe.Paalla && !auto) || LuentaEste?.Invoke() == true) return;
            string t = kohde.Luettava(h);
            if (string.IsNullOrEmpty(t) || t == luettu) return;
            luettu = t;
            var puhe = Puhe.Hae();
            int vuoro = ++luentaVuoro;
            luennanUrl = puhe.Lue(t, "kertoja", loppu: () => LuentaLoppui(vuoro), pyynnosta: auto, lohko: AstronauttiLinssi.SelitteenSailio)
                ? puhe.SoivaUrl : null;
            if (luennanUrl == null) LuentaLoppui(vuoro);   // ei ääntä: AUTO siirtyy silti
            Debug.Log($"MATKAKIRJA kuvaselite luetaan ({AstronauttiLinssi.SelitteenSailio}, {t.Length} mrk): "
                + (luennanUrl != null ? t.Substring(0, Math.Min(60, t.Length)) : "ei alkanut"));
        }

        /// <summary>Kuvan sulkeminen lopettaa selitteen luennan, ei muiden puhujien (esim. pulun vastausta).</summary>
        void LopetaLuenta()
        {
            var puhe = Puhe.Instanssi;
            if (luennanUrl != null && puhe != null && puhe.SoivaUrl == luennanUrl) puhe.Pysayta(0.3f);
            luettu = luennanUrl = null;
        }

        // --- AUTO (web PR #3817) ---------------------------------------------------------

        /// <summary>AUTO päällä ja kuvaselain käytössä (‹ › näkyvissä).</summary>
        bool AutoKaytossa => Nostoselain.Auto && !Vanha && kohdeNapit.style.display != DisplayStyle.None;

        /// <summary>Otsikko: "Nimi — seutu", AUTOn aikana pelkkä nimi (omistaja 2.10.: "tekstin voisi lyhentää pelkkään kaupungin nimeen").</summary>
        void AsetaOtsikko()
        {
            if (kohde == null) return;
            otsikko.text = kohde.Nimi + (AutoKaytossa || string.IsNullOrEmpty(kohde.Seutu) ? "" : " — " + kohde.Seutu);
        }

        /// <summary>AUTOn tila näkyviin: kytkin, otsikko ja selite minimoituna (web naytaAutoTila).</summary>
        void NaytaAutoTila()
        {
            bool nakyy = !Vanha && kohdeNapit.style.display != DisplayStyle.None;
            autoKulma.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            RajaaNauha();
            autoNappi.EnableInClassList("mk-valittu", Nostoselain.Auto);
            bool paalla = Nostoselain.Auto && nakyy;
            juuri.EnableInClassList("mk-astrokuva--auto", paalla);
            if (paalla && !kiinni) { kelaus?.Pause(); AsetaKiinni(true); }
            AsetaOtsikko();
        }

        /// <summary>Kytkin tai pysäytys: asetus (jaettu nostoselaimen kanssa), päälle → nykyinen kohde luetaan nyt.</summary>
        void AsetaAuto(bool paalle)
        {
            Nostoselain.Auto = paalle;
            NaytaAutoTila();
            if (!paalle) { LopetaSiirto(); NaytaAutoNapit(true); return; }
            autoKosketus = Time.unscaledTime;
            AjastaAutoPiilotus();
            luettu = null;
            if (kohde != null && indeksi >= 0) LueSelite(indeksi < kohde.Havainnot.Count ? kohde.Havainnot[indeksi] : null);
        }

        /// <summary>Luenta loppui: AUTO päällä → lappu ja 3 s:n päästä seuraava kohde (vain tämän kuvan tuorein luenta).</summary>
        void LuentaLoppui(int vuoro)
        {
            if (vuoro != luentaVuoro || !Auki || !AutoKaytossa) return;
            if (palloSelaa) { autoOdottaa = true; return; }   // pallon pyöritys: siirto vasta valinnan jälkeen
            var seuraava = Linssi()?.KatsoNaapuri(1);
            if (seuraava == null) return;
            LopetaSiirto();
            // Omistaja 2.10. 21.3x: AUTOn aikana ei "Seuraava … Pysäytä" -lappua; siirto tapahtuu hiljaa samalla 3 s:n viiveellä.
            autoNimi.text = seuraava.Nimi;
            autoAika.text = Mathf.CeilToInt(AutoSiirtoS) + " s";
            autoPalkki.style.width = Length.Percent(0);
            autoAlku = Time.unscaledTime;
            Ruudunpaivitys.Herata(AutoSiirtoS + 0.2f);
            autoAjo = autoLappu.schedule.Execute(() =>
            {
                float t = Time.unscaledTime - autoAlku;
                if (t >= AutoSiirtoS) { LopetaSiirto(); if (Auki && AutoKaytossa) VaihdaKohde(1); return; }
                autoAika.text = Mathf.CeilToInt(AutoSiirtoS - t) + " s";
                autoPalkki.style.width = Length.Percent(100f * t / AutoSiirtoS);
            }).Every(0);
        }

        void LopetaSiirto()
        {
            autoAjo?.Pause();
            autoAjo = null;
            autoLappu.style.display = DisplayStyle.None;
        }

        /// <summary>AUTOn napit (✕, Pulu, ‹ › ja AUTO) näkyviin tai häivytetyiksi; piilossa ne eivät ota kosketuksia.</summary>
        void NaytaAutoNapit(bool nakyvissa)
        {
            autoNapitPiilossa = !nakyvissa;
            float kesto = (nakyvissa ? Tyylikirja.Kesto.Avaus : Tyylikirja.Kesto.Sulku) / 1000f;
            foreach (var e in new[] { sulkuNappi, pulukulma, kohdeNapit })
            {
                if (e == null) continue;
                e.style.transitionProperty = new StyleList<StylePropertyName>(new System.Collections.Generic.List<StylePropertyName> { new StylePropertyName("opacity") });
                e.style.transitionDuration = new StyleList<TimeValue>(new System.Collections.Generic.List<TimeValue> { new TimeValue(kesto) });
                e.style.opacity = nakyvissa ? 1f : 0f;
            }
            if (nakyvissa) AjastaAutoPiilotus();
        }

        /// <summary>Piilotus 4 s viimeisen kosketuksen jälkeen, jos AUTO on yhä päällä.</summary>
        void AjastaAutoPiilotus()
        {
            autoPiilotus?.Pause();
            if (!AutoKaytossa) return;
            autoPiilotus = juuri.schedule.Execute(() =>
            {
                if (!Auki || !AutoKaytossa) { autoPiilotus?.Pause(); return; }
                if (!autoNapitPiilossa && Time.unscaledTime - autoKosketus >= AutoPiilotusS) NaytaAutoNapit(false);
            }).Every(250);
            Ruudunpaivitys.Herata(AutoPiilotusS + 0.5f);
        }

        // --- pallovalitsin (omistaja 3.10.2026) ----------------------------------------------

        /// <summary>Kuvan himmennys pyöritettäessä (lavan peitto: kuva painuu taustan himmeään avaruuteen, ei uutta väriä).</summary>
        const float PalloHimmennys = 0.55f;
        bool palloSelaa, autoOdottaa;

        /// <summary>Tartunta: kuva himmenee taakse, selite pienenee ja AUTOn siirto odottaa valintaa; paluu: kuva kirkastuu.</summary>
        void PalloTartuttu(bool tartuttu)
        {
            palloSelaa = tartuttu;
            float kesto = LinssiUi.VahennettyLiike() || !Auki ? 0f : (tartuttu ? Tyylikirja.Kesto.Avaus : Tyylikirja.Kesto.Sulku) / 1000f;
            lava.style.transitionProperty = new StyleList<StylePropertyName>(new List<StylePropertyName> { new StylePropertyName("opacity") });
            lava.style.transitionDuration = new StyleList<TimeValue>(new List<TimeValue> { new TimeValue(kesto) });
            lava.style.opacity = tartuttu ? PalloHimmennys : 1f;
            if (!tartuttu) return;
            KelaaKuvasta();
            autoKosketus = Time.unscaledTime;
            if (autoAjo != null) { LopetaSiirto(); autoOdottaa = true; }
        }

        /// <summary>
        /// Valinta: uusi kohde avautuu kuten ‹ › (liuku itään +1 / länteen −1, otsikko vasempaan yläkulmaan, AUTO jatkaa sen
        /// luennasta); sama kohde tai ei mitään → pallo kiertyy takaisin nykyiseen ja AUTOn odottava siirto jatkuu.
        /// </summary>
        void PalloValitsi(Havaintokohde k)
        {
            if (!Auki || kohde == null) return;
            var l = Linssi();
            if (k != null && !ReferenceEquals(k, kohde) && l != null && !liukuu)
            {
                autoOdottaa = false;
                double d = (k.Lon - kohde.Lon) % 360;
                if (d > 180) d -= 360; else if (d < -180) d += 360;
                palloValitsi = true;
                Vaihda(d >= 0 ? 1 : -1, () => l.AvaaValittu(k));
                return;
            }
            // Sama kohde tai ei mitään: pallo ei kierry takaisin (omistaja 4.10.2026), merkki pysyy nykyisessä kohteessa.
            sijaintipallo.MerkitseKohde(kohde.Lat, kohde.Lon);
            if (autoOdottaa) { autoOdottaa = false; if (AutoKaytossa) LuentaLoppui(luentaVuoro); }
        }

        /// <summary>`astro pallo tartu|pyorita dx dy [ms]|irti|tila`: pallon tila + kuvanäkymän kohde, otsikko ja AUTO.</summary>
        public string TestaaPallo(string[] a)
        {
            if (!Auki) return "kuva ei ole auki";
            string t = sijaintipallo.Testaa(a);
            return t + $", kohde {kohde?.Tunnus ?? "-"}, otsikko \"{otsikko.text}\", kuva {(palloSelaa ? "himmennetty" : "kirkas")}, "
                + $"auto {(AutoKaytossa ? (palloSelaa ? "tauolla" : autoAjo != null ? "siirto " + autoAika.text : "päällä") : "pois")}{(autoOdottaa ? " (siirto odottaa)" : "")}";
        }

        // --- testikomento --------------------------------------------------------------

        /// <summary>
        /// `ui linssi kuvaselite [kelaa|kiinni|auki|automaatti|mittaa|auto|auto-pois|tila]` (Linssiseppä 29.9.): kelaa = selitteen
        /// napautus, kiinni/auki = napautus vain tarvittaessa, automaatti = vinkin automaattinen kelaus heti, mittaa =
        /// pelkkä kokomittari 1,2 s (esim. ennen `ui napauta x y` kuvaan, LISÄYS 6). Liukuvat komennot käynnistävät
        /// kokomittarin, joka kirjaa selitteen koon jokaisella ruudulla 0,8 s ajan (MATKAKIRJA kuvaselite koko …):
        /// liu'un on edettävä vanhasta koosta uuteen ilman välikuvaa uudessa koossa. Palauttaa tilan.
        /// </summary>
        public string TestaaSelite(string komento)
        {
            // Suljetun kuvan jälkeen tila kertoo, soiko puhe vielä (sulku lopettaa selitteen luennan).
            if (!Auki) return $"kuva ei ole auki, puhe {(Puhe.Instanssi != null && Puhe.Instanssi.Soi ? "soi" : "hiljaa")}";
            switch (komento)
            {
                case "kelaa": MittaaKoko(0.8f); Kelaa(); break;
                case "kiinni": if (!kiinni) { MittaaKoko(0.8f); Kelaa(); } break;
                case "auki": if (kiinni) { MittaaKoko(0.8f); Kelaa(); } break;
                case "automaatti": kelaus?.Pause(); MittaaKoko(1.2f); KelaaRiveittain(); break;
                case "mittaa": MittaaKoko(1.2f); break;
                case "auto": AsetaAuto(true); break;          // AUTO päälle (web PR #3817)
                case "auto-pois": AsetaAuto(false); break;
                default:
                    // ui linssi kuvaselite zoomi:<x>: kuva x-kertaiseksi keskeltä (rajattu ylärajaan Suurin = 8×), tila lokiin.
                    if (komento.StartsWith("zoomi:") && float.TryParse(komento.Substring(6), System.Globalization.NumberStyles.Float,
                            System.Globalization.CultureInfo.InvariantCulture, out float z))
                    {
                        ZoomaaKohtaan(z, new Vector2(lava.layout.width / 2f, lava.layout.height / 2f));
                        return $"zoomi {zoomi:0.##} (yläraja {Suurin:0.##}, kuva {tekstuuri?.width ?? 0} px, näytetty {sovitus.width:0} pt)";
                    }
                    break;
            }
            return SeliteTila;
        }

        /// <summary>Selitteen tila testikomennoille: kelaus, koko, kesken olevat liu'ut ja luenta.</summary>
        public string SeliteTila
        {
            get
            {
                var r = selite.layout;
                var puhe = Puhe.Instanssi;
                // Oma luenta on kesken, kunnes Puhe päättää sen (SoivaUrl nollautuu viimeisen palan jälkeen tai pysäytyksessä).
                bool oma = puhe != null && luennanUrl != null && puhe.SoivaUrl == luennanUrl;
                string luenta = luettu == null ? "ei" : luennanUrl == null ? "ei alkanut" : !oma ? "ohi"
                    : puhe.Soi ? $"soi {puhe.Aika:0.0}/{puhe.Kesto:0.0} s" : "latautuu";
                return $"selite {(kiinni ? "kiinni" : "auki")}{(vinkki ? " (vinkki)" : "")} {r.width:0}x{r.height:0}, otsikko \"{otsikko.text}\", "
                    + $"auto {(AutoKaytossa ? (autoAjo != null ? "siirto " + autoAika.text : "päällä") : "pois")}, liukuja {Tiivistys.Kesken}, "
                    + $"luenta {luenta} ({AstronauttiLinssi.SelitteenSailio}, {luettu?.Length ?? 0} mrk)";
            }
        }

        void MittaaKoko(float s)
        {
            float alku = Time.unscaledTime;
            var sb = new System.Text.StringBuilder();
            IVisualElementScheduledItem mittari = null;
            mittari = selite.schedule.Execute(() =>
            {
                Ruudunpaivitys.Herata(0.1f);
                var r = selite.layout;
                sb.Append($" {(Time.unscaledTime - alku) * 1000f:0}:{r.width:0}x{r.height:0}");
                if (Time.unscaledTime - alku < s) return;
                mittari.Pause();
                Debug.Log("MATKAKIRJA kuvaselite koko" + sb);
            }).Every(0);
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
            // Sijaintipallo väistää kuvaa (vaaka: kuva täyttää korkeuden, reunus kapea; Laitetestaaja 1.10. build 86).
            var turva = sijaintipallo.Isa;
            if (turva?.panel != null)
            {
                Vector2 vy = turva.WorldToLocal(lava.LocalToWorld(sovitus.position));
                Vector2 aa = turva.WorldToLocal(lava.LocalToWorld(sovitus.position + sovitus.size));
                sijaintipallo.Mitoita(Rect.MinMaxRect(vy.x, vy.y, aa.x, aa.y), turva.layout.height);
                // iPhone vaaka: pallo on vasemmassa alakulmassa, joten nauha sen oikealle puolelle (Päätoimittaja 2.10. E2).
                float nv = sijaintipallo.NauhanVasen;
                nauha.style.left = float.IsNaN(nv) ? (StyleLength)StyleKeyword.Null : nv;
                RajaaNauha();
            }
        }

        /// <summary>Pallosta valittu kohde odottaa avautumista: avautuessa pallo ei kierry (MerkitseKohde).</summary>
        bool palloValitsi;

        /// <summary>
        /// Zoomin yläraja: kiinteä 8× kuvan tarkkuudesta riippumatta (omistaja 4.10.2026, TF 134: "kuvaa pitäisi pystyä zoomaamaan
        /// lähemmäs"; ennen raja oli kuvan oma tarkkuus, jolloin pieni kuva pysähtyi 1:1-pikseliin). Web ei mallina (jäädytetty).
        /// </summary>
        float Suurin => tekstuuri == null || sovitus.width <= 0 ? 1f : MaxZoomi;

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
            // Sulkeutuva kuva (Ponnahdus, 240 ms) ei ota kosketuksia (web .maakunta-kortti-sulkeutuu pointer-events: none).
            if (!Auki) return;
            // Kuvan napautus, panorointi, nipistys ja selaus pienentävät selitteen (web LISÄYS 6).
            KelaaKuvasta();
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

        /// <summary>A/B-tila (Vanha) näkyviin heti, myös jo auki olevaan kuvaan (`ui linssi kuvaselain 0|1` kesken kuvan).</summary>
        public void PaivitaVanha()
        {
            juuri.EnableInClassList("mk-astrokuva--vanha", Vanha);
            kohdeNapit.style.display = !Vanha && Linssi()?.KatsoNaapuri(1) != null ? DisplayStyle.Flex : DisplayStyle.None;
            RajaaNauha();
        }

        float turvaLeveys = float.NaN;

        /// <summary>
        /// Pikkukuvanauha (vasen ala, 42 pt/kuva) ei saa ulottua ‹ ›-nappien alle (Natiivi-UI:n katselmointi 28.9.: iPhonella
        /// neljäs pikkukuva jäi ‹:n alle, ja nappi vei napautuksen). Napit pysyvät paikallaan kohteesta toiseen, joten nauha
        /// rajataan niiden vasemmalle puolelle (8 pt:n väli) ja rivittyy. Ilman nappeja (A/B vanha) raja on 50 % kuten ennen.
        /// </summary>
        void RajaaNauha()
        {
            if (kohdeNapit.style.display == DisplayStyle.None || float.IsNaN(turvaLeveys)) { nauha.style.maxWidth = Length.Percent(50); return; }
            const float NappienPuolikas = 52f, Vasen = 12f, Vali = 8f, Pikkukuva = 42f;
            // AUTO ‹ ›:n ryhmässä (Päätoimittaja 2.10.) levittää ryhmää vasemmalle puolella omasta leveydestään (+ 7 pt:n väli).
            // 375 pt:n ruudulla raja on ~71 pt, joten kaksi pikkukuvaa rivittyy eikä mene ryhmän alle (web #3825: väli ~1 pt).
            float auto = autoKulma.style.display == DisplayStyle.None ? 0f
                : (autoKulma.layout.width > 0f ? autoKulma.layout.width : 81f) + 7f;
            float vasen = float.IsNaN(sijaintipallo.NauhanVasen) ? Vasen : sijaintipallo.NauhanVasen;   // pallon oikealla puolella (vaaka)
            nauha.style.maxWidth = Mathf.Max(Pikkukuva, turvaLeveys / 2f - NappienPuolikas - auto / 2f - vasen - Vali);
        }

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
            palloValitsi = false;
            int j = indeksi + Math.Sign(suunta);
            if (j >= 0 && j < kohde.Havainnot.Count) { Vaihda(suunta, () => Valitse(j)); return; }
            var linssi = Linssi();
            if (linssi == null) { Liu(vetoX, 0f, 120f, 1f, null); return; }
            Vaihda(suunta, () => linssi.Naapuri(suunta, galleria: true));
        }

        /// <summary>Kohdenappi: lasikiekko 30 pt ja väkänen, jonka painopiste on kiekon keskellä (kärki siirtyy 1 pt suuntaan).</summary>
        /// <summary>Alanapit ‹ ›: viereinen kohde kartalla (sen oletuskuva); pallo liukuu uuden kohteen ylle.</summary>
        public void VaihdaKohde(int suunta)
        {
            var linssi = Linssi();
            if (linssi == null || liukuu) return;
            palloValitsi = false;
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
