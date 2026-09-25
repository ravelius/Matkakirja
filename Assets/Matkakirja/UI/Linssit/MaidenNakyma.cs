// VERTAILU JA MAIDEN TIEDOT (Natiivi-UI): webin js/vertailu.js
// rakennaVertailuPalkki, valitseVertailuMaa, avaaVertailuNakyma ja maakyltti
// (.maa-pilleri). Linssit kertovat tapahtumilla (Linssit/Ydin/Maat/MaatLinssit.cs):
//
//   VertailuLinssi   Muuttui → alapalkki uudestaan: ohje ilman valintoja,
//                    muuten laput (värilaatta + nimi; napautus poistaa) ja
//                    Vertaa-nappi (vähintään kaksi maata). Tayttui → ilmoitus
//                    "Vertailuun mahtuu 4 maata / Poista ensin jokin lappu
//                    alapalkista." VertailuPyydetty → vertailuarkki.
//   MaatiedotLinssi  ValittuMuuttui → maakyltti (lippu + NIMI + "Lue lehti ›")
//                    vasemmassa alakulmassa kartuschan paikalla (kartuscha on
//                    linssin ajan piilossa). Kyltin napautus → AvaaLehti →
//                    LehtiPyydetty → PeliOhjain.LueMaalehti(iso3).
//
// Vertailuarkki: koko ruudun pergamentti, ylärivillä maiden laput (kytkevät
// maan kortin pois/päälle, eivät muuta kartan valintaa) ja "Muuta valintoja"
// (paluu kartalle). Kortit rinnakkain: lippu, nimi ja tunnusluvut
// (Maa.Tunnusluvut, webin rakennaVertailuTunnusluvut). Korttien alla maakäyrät
// (web piirraVertailu: väkiluku, tulot, elinajanodote, kaupungistuminen ja
// hiilidioksidipäästöt samoilla asteikoilla) ja lähderivi, piirto Maakayrakuva.cs.
// Näkyvät maat ja niiden värit kuten webissä: ylärivin pois kytketyt jäävät pois ja
// jäljelle jäävät saavat värit järjestyksessä (kortti ja käyrä samalla värillä).
// Aineisto: VertailuLinssi.Kayrat (LinssiOhjain lataa sen linssin ensimmäisellä
// avauksella). Sillä välin "Haetaan tilastoja…"; arkki kyselee aineistoa ja piirtää
// käyrät heti, kun se tulee. Jos sitä ei kuulu, webin verkkoyhteysrivi.
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Maat;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class MaidenNakyma
    {
        readonly UiNakymat ui;
        readonly VisualElement palkki, kyltti, kylttiLippu, arkki, arkinYlarivi, kortit, kayrat;
        readonly Label kylttiNimi, kylttiLehti;
        VertailuLinssi vertailu;
        MaatiedotLinssi maatiedot;
        readonly HashSet<MaatilaLinssi> kytketyt = new HashSet<MaatilaLinssi>();
        readonly HashSet<string> pois = new HashSet<string>();
        List<(Maa Maa, Rgba Vari)> arkinMaat = new List<(Maa, Rgba)>();
        Maa kylttiMaa;
        // Testikomennot ilman linssiä: laput ja kyltti suoraan.
        List<(Maa Maa, Rgba Vari)> testiLaput;

        // Maakäyrien tila arkissa (web avaaVertailuNakyma: "Haetaan tilastoja…" → käyrät / verkkorivi).
        public const string KayratHaussa = "Haetaan tilastoja…";
        public const string KayratEiVerkkoa = "Tämä näkymä tarvitsee verkkoyhteyden ensimmäisellä avauksella "
            + "— luvut haetaan silloin talteen.";
        public const string KayratVirhe = "Tilastoja ei saatu haettua.";
        /// <summary>Näin kauan odotetaan aineistoa ennen verkkoyhteysriviä (kysely jatkuu silti).</summary>
        const float KayraOdotus = 15f;
        enum KayraTesti { Ei, Latautuu, EiVerkkoa }
        KayraTesti kayraTesti;
        IVisualElementScheduledItem kayraKysely;
        float kayraHakuAlkoi;
        bool kayratPiirretty;
        // Testikomennon oma aineisto (ilman linssiä): null = ei haettu, haussa-lippu estää tuplahaun.
        static MaakayratAineisto testiKayrat;
        static bool testiKayratHaussa, testiKayratPuuttuu;

        public bool ArkkiAuki { get; private set; }
        /// <summary>Vertailuarkki auki/kiinni (LinssiUi piilottaa linssin sulkunapin sen ajaksi).</summary>
        public event System.Action<bool> ArkkiMuuttui;

        public MaidenNakyma(UiKerros kerros, UiNakymat ui)
        {
            this.ui = ui;
            var turva = kerros.Turva(LinssiUi.Kerros);

            palkki = Rakenne.El("mk-vertailupalkki", turva);
            palkki.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(palkki, Kirjasin.Kone);

            kyltti = Rakenne.Nappi(null, "mk-maakyltti", AvaaLehti, turva);
            kyltti.style.display = DisplayStyle.None;
            kyltti.tooltip = "Lue maan lehti";
            Kirjasimet.Aseta(kyltti, Kirjasin.Kone);
            var rivi = Rakenne.El("mk-maakyltti__rivi", kyltti, PickingMode.Ignore);
            kylttiLippu = Rakenne.El("mk-maakyltti__lippu", rivi, PickingMode.Ignore);
            kylttiNimi = Rakenne.Teksti("", "mk-maakyltti__nimi", rivi);
            kylttiLehti = Rakenne.Teksti("Lue lehti ›", "mk-maakyltti__lehti", kyltti);
            // Linssipariteetti rivi 41 (web .maa-pilleri): yksi rivi, lippu + NIMI; koko pilleri avaa lehden.
            kylttiLehti.style.display = DisplayStyle.None;

            // Vertailuarkki pelidialogien tasolla (koko ruutu, ottaa kosketukset).
            arkki = Rakenne.El("mk-vertailuarkki", kerros.Juuri(LinssiUi.Ylakerros));
            arkki.style.display = DisplayStyle.None;
            Rakenne.Tausta(arkki, Kuviot.Pergamentti);
            Kirjasimet.Aseta(arkki, Kirjasin.Luku);
            var sisus = Rakenne.El("mk-vertailuarkki__sisus", arkki, PickingMode.Ignore);
            kerros.TurvaMuuttui += () =>
            {
                var r = kerros.Reunat(LinssiUi.Ylakerros);
                sisus.style.paddingTop = r.y + 10; sisus.style.paddingBottom = r.w + 10;
                sisus.style.paddingLeft = r.x + 12; sisus.style.paddingRight = r.z + 12;
            };
            var otsikko = Rakenne.Teksti("Vertailu", "mk-vertailuarkki__otsikko", sisus);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            arkinYlarivi = Rakenne.El("mk-vertailuarkki__ylarivi", sisus, PickingMode.Ignore);
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-vertailuarkki__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            sisus.Add(vieritys);
            kortit = Rakenne.El("mk-vertailuarkki__kortit", vieritys, PickingMode.Ignore);
            kayrat = Rakenne.El("mk-vertailuarkki__kayrat", vieritys, PickingMode.Ignore);
            kayraKysely = arkki.schedule.Execute(KyseleKayria).Every(250);
            kayraKysely.Pause();

            kerros.TurvaMuuttui += Asettele;
            Asettele();
        }

        void Asettele()
        {
            // Web .maa-pilleri: kartan oikea yläkulma (top/right 0,4rem kartan kehyksestä), matkakirjan lapun
            // korkeudella. Natiivissa linssin ✕ ja selitenappi ovat samassa kulmassa, joten pilleri niiden
            // vasemmalle puolelle paikkakuplan riville (b13-linssit-2 rivi 41: kortti peitti kartuschan).
            var r = UiKerros.Hae().Reunat(LinssiUi.Kerros);
            kyltti.style.top = Ylapalkki.Varaus + 8f;
            kyltti.style.right = r.z + 96f;
        }

        /// <summary>Linssi vaihtui: kuunnellaan maatilan linssin tapahtumia, muuten kaikki pois.</summary>
        public void Kytke(ILinssi linssi)
        {
            testiLaput = null;
            var l = (linssi as LinssiOhjain.MaatSovitin)?.Linssi;
            vertailu = l as VertailuLinssi;
            maatiedot = l as MaatiedotLinssi;
            if (l != null && kytketyt.Add(l))
            {
                // Linssi-olio säilyy sulkemisen yli (valinnat muistissa), joten kytketään kerran.
                if (l is VertailuLinssi v)
                {
                    v.Muuttui += () => UiKerros.PaaSaikeessa(RakennaPalkki);
                    v.Tayttui += () => UiKerros.PaaSaikeessa(Taynna);
                    v.VertailuPyydetty += m => { var lista = m.ToList(); UiKerros.PaaSaikeessa(() => AvaaArkki(lista)); };
                }
                if (l is MaatiedotLinssi t)
                {
                    t.ValittuMuuttui += m => UiKerros.PaaSaikeessa(() => NaytaKyltti(maatiedot != null && maatiedot.Auki ? m : null));
                    t.LehtiPyydetty += m => UiKerros.PaaSaikeessa(() => LueLehti(m));
                }
            }
            RakennaPalkki();
            NaytaKyltti(maatiedot?.Valittu);
            if (vertailu == null) SuljeArkki();
        }

        // --- vertailun alapalkki --------------------------------------------------------

        void RakennaPalkki()
        {
            bool nakyy = testiLaput != null || (vertailu != null && vertailu.Auki);
            palkki.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            palkki.Clear();
            if (!nakyy) return;
            var laput = testiLaput ?? vertailu.Laput.Where(x => x.Maa != null).Select(x => (x.Maa, x.Vari)).ToList();
            if (laput.Count == 0)
            {
                Rakenne.Teksti(VertailuLinssi.Ohje, "mk-vertailupalkki__ohje", palkki);
                return;
            }
            foreach (var (maa, vari) in laput)
            {
                string iso = maa.Id;
                var lappu = Lappu(maa, vari, palkki, () => PoistaLappu(iso));
                lappu.tooltip = VertailuLinssi.LappuOhje;
            }
            bool voi = testiLaput != null ? laput.Count >= 2 : vertailu.VoiVerrata;
            var vertaa = Rakenne.Nappi(VertailuLinssi.VertaaNappi, "mk-nappi--kulta mk-vertailupalkki__vertaa", Vertaa, palkki);
            Rakenne.Tausta(vertaa, Kuviot.Kulta);
            Kirjasimet.Aseta(vertaa, Kirjasin.KoneLihava);
            vertaa.SetEnabled(voi);
            vertaa.tooltip = voi ? VertailuLinssi.VertaaOhje : VertailuLinssi.VertaaEiOhje;
        }

        static Button Lappu(Maa maa, Rgba vari, VisualElement isa, System.Action painettu)
        {
            var b = Rakenne.Nappi(null, "mk-vertailulappu", painettu, isa);
            var laatta = Rakenne.El("mk-vertailulappu__laatta", b, PickingMode.Ignore);
            laatta.style.backgroundColor = new Color(vari.R, vari.G, vari.B, vari.A);
            Rakenne.Teksti(maa.Nimi ?? maa.Id, "mk-vertailulappu__nimi", b);
            return b;
        }

        void PoistaLappu(string iso)
        {
            if (testiLaput != null) { testiLaput.RemoveAll(x => x.Maa.Id == iso); RakennaPalkki(); return; }
            vertailu?.Valitse(iso);
        }

        void Vertaa()
        {
            if (testiLaput != null) { AvaaArkki(testiLaput.Select(x => x.Maa).ToList()); return; }
            vertailu?.Vertaa();
        }

        void Taynna() => ui.Tilarivi.Viesti(VertailuLinssi.TaynnaOtsikko + "\n" + VertailuLinssi.TaynnaAlarivi, 4f);

        // --- vertailuarkki -------------------------------------------------------------

        void AvaaArkki(IReadOnlyList<Maa> maat)
        {
            arkinMaat = maat.Where(m => m != null)
                .Select((m, i) => (m, VertailuLinssi.Varit[Mathf.Min(i, VertailuLinssi.Varit.Count - 1)])).ToList();
            pois.Clear();
            kayraHakuAlkoi = Time.realtimeSinceStartup;
            RakennaArkki();
            if (!ArkkiAuki)
            {
                ArkkiAuki = true;
                Rakenne.Nayta(arkki, true, 250);
                SyoteLukko.Esta(this);
                ArkkiMuuttui?.Invoke(true);
            }
        }

        public void SuljeArkki()
        {
            if (!ArkkiAuki) return;
            ArkkiAuki = false;
            kayraKysely.Pause();
            kayraTesti = KayraTesti.Ei;
            Rakenne.Nayta(arkki, false, 250);
            SyoteLukko.Vapauta(this);
            ArkkiMuuttui?.Invoke(false);
        }

        void RakennaArkki()
        {
            arkinYlarivi.Clear();
            foreach (var (maa, vari) in arkinMaat)
            {
                string iso = maa.Id;
                var b = Lappu(maa, vari, arkinYlarivi, () =>
                {
                    if (!pois.Remove(iso)) pois.Add(iso);
                    RakennaArkki();
                });
                b.EnableInClassList("mk-pois", pois.Contains(iso));
            }
            var muuta = Rakenne.Nappi("Muuta valintoja", "mk-nappi--haamu mk-vertailuarkki__muuta", SuljeArkki, arkinYlarivi);
            Kirjasimet.Aseta(muuta, Kirjasin.Kone);

            kortit.Clear();
            var nakyvat = arkinMaat.Where(x => !pois.Contains(x.Maa.Id)).Select(x => x.Maa).ToList();
            for (int i = 0; i < nakyvat.Count; i++)
            {
                var maa = nakyvat[i];
                // Web piirraVertailu: värit näkyvien maiden järjestyksessä (sama kuin käyrillä).
                var vari = VertailuLinssi.Varit[Mathf.Min(i, VertailuLinssi.Varit.Count - 1)];
                var k = Rakenne.El("mk-vertailukortti", kortit, PickingMode.Ignore);
                k.style.borderTopColor = new Color(vari.R, vari.G, vari.B, 1f);
                var ylarivi = Rakenne.El("mk-vertailukortti__yla", k, PickingMode.Ignore);
                var lippu = Rakenne.El("mk-vertailukortti__lippu", ylarivi, PickingMode.Ignore);
                AsetaLippu(lippu, maa, 20f);
                var nimi = Rakenne.Teksti(maa.Nimi ?? maa.Id, "mk-vertailukortti__nimi", ylarivi);
                Kirjasimet.Aseta(nimi, Kirjasin.LukuLihava);
                if (maa.Tunnusluvut.Count == 0) Rakenne.Teksti("Ei tunnuslukuja.", "mk-vertailukortti__tyhja", k);
                foreach (var (nimio, arvo) in maa.Tunnusluvut)
                {
                    if (string.IsNullOrEmpty(arvo)) continue;
                    var r = Rakenne.El("mk-vertailukortti__rivi", k, PickingMode.Ignore);
                    var n = Rakenne.Teksti((nimio ?? "").Trim(), "mk-vertailukortti__nimio", r);
                    Kirjasimet.Aseta(n, Kirjasin.Kone);
                    Rakenne.Teksti(arvo, "mk-vertailukortti__arvo", r);
                }
            }
            RakennaKayrat();
        }

        // --- maakäyrät -------------------------------------------------------------------

        /// <summary>Käyrien aineisto: auki olevan (tai aiemmin kytketyn) vertailulinssin, testissä oma.</summary>
        MaakayratAineisto KayraAineisto()
        {
            if (kayraTesti != KayraTesti.Ei) return null;
            if (testiLaput != null) return testiKayrat;
            if (vertailu?.Kayrat != null) return vertailu.Kayrat;
            foreach (var l in kytketyt)
                if (l is VertailuLinssi v && v.Kayrat != null) return v.Kayrat;
            return null;
        }

        void RakennaKayrat()
        {
            kayrat.Clear();
            kayratPiirretty = false;
            var data = KayraAineisto();
            if (data == null)
            {
                bool eiVerkkoa = kayraTesti == KayraTesti.EiVerkkoa
                    || (kayraTesti == KayraTesti.Ei && (testiLaput != null ? testiKayratPuuttuu
                        : Time.realtimeSinceStartup - kayraHakuAlkoi > KayraOdotus));
                Rakenne.Teksti(eiVerkkoa ? KayratEiVerkkoa : KayratHaussa, "mk-maakayrat__tila", kayrat);
                kayraKysely.Resume(); // KyseleKayria pysähtyy itse, kun arkki sulkeutuu
                return;
            }
            kayraKysely.Pause();
            var isot = arkinMaat.Where(x => !pois.Contains(x.Maa.Id)).Select(x => x.Maa.Id).ToList();
            try
            {
                MaakayraRistikko.Rakenna(Maakayrat.Vertailu(isot, data), kayrat);
                kayratPiirretty = true;
            }
            catch (System.Exception e)
            {
                Debug.LogWarning("MATKAKIRJA ui vertailu: maakäyrät " + e);
                kayrat.Clear();
                Rakenne.Teksti(KayratVirhe, "mk-maakayrat__tila", kayrat);
            }
        }

        /// <summary>Aineisto tuli (linssi latasi sen) tai odotus venyi: käyrät tai verkkorivi.</summary>
        void KyseleKayria()
        {
            if (!ArkkiAuki) { kayraKysely.Pause(); return; }
            if (kayratPiirretty) { kayraKysely.Pause(); return; }
            bool tila = kayrat.childCount == 1 && kayrat[0] is Label t && t.text == KayratHaussa;
            if (KayraAineisto() != null
                || (tila && kayraTesti == KayraTesti.Ei && (testiLaput != null ? testiKayratPuuttuu
                    : Time.realtimeSinceStartup - kayraHakuAlkoi > KayraOdotus)))
                RakennaKayrat();
        }

        static System.Collections.IEnumerator HaeTestiKayrat()
        {
            testiKayratHaussa = true;
            testiKayratPuuttuu = false;
            string teksti = null;
            yield return LinssiSisalto.Hae("tiedostot/assets/data/maakayrat.json", t => teksti = t);
            testiKayratHaussa = false;
            if (teksti == null) { testiKayratPuuttuu = true; Debug.LogWarning("MATKAKIRJA ui vertailu: maakayrat.json puuttuu"); yield break; }
            try { testiKayrat = MaakayratAineisto.Lue(Matkakirja.Peli.MiniJson.Jasenna(teksti)); }
            catch (System.Exception e) { testiKayratPuuttuu = true; Debug.LogWarning("MATKAKIRJA ui vertailu: maakäyrät " + e.Message); }
        }

        // --- maakyltti -------------------------------------------------------------------

        void NaytaKyltti(Maa m)
        {
            kylttiMaa = m;
            if (m == null) { kyltti.style.display = DisplayStyle.None; return; }
            kylttiNimi.text = (m.Nimi ?? m.Id).ToUpperInvariant();
            kylttiLehti.style.display = string.IsNullOrEmpty(m.Maalehti) ? DisplayStyle.None : DisplayStyle.Flex;
            AsetaLippu(kylttiLippu, m, 16f);
            Asettele();
            kyltti.style.display = DisplayStyle.Flex;
        }

        static void AsetaLippu(VisualElement e, Maa m, float korkeus)
        {
            e.style.backgroundImage = StyleKeyword.None;
            e.style.display = DisplayStyle.None;
            string lahde = !string.IsNullOrEmpty(m.LippuUrl) ? m.LippuUrl : m.Lippu;
            if (string.IsNullOrEmpty(lahde)) return;
            Kuvat.Hae(lahde, t =>
            {
                if (t == null) return;
                e.style.backgroundImage = new StyleBackground(t);
                e.style.height = korkeus;
                e.style.width = korkeus * t.width / Mathf.Max(1, t.height);
                e.style.display = DisplayStyle.Flex;
            }, "liput");
        }

        void AvaaLehti()
        {
            if (maatiedot != null && maatiedot.Auki) { maatiedot.AvaaLehti(); return; }
            if (kylttiMaa != null) LueLehti(kylttiMaa); // testitila
        }

        void LueLehti(Maa m)
        {
            if (m == null) return;
            var o = PeliOhjain.Instanssi;
            if (o == null) { ui.Tilarivi.Viesti("Peli ei ole vielä käynnissä"); return; }
            var virhe = o.LueMaalehti(m.Id);
            if (virhe != null)
            {
                Debug.LogWarning("MATKAKIRJA ui maatiedot: " + virhe);
                ui.Tilarivi.Viesti(m.Nimi + ": lehteä ei voi avata");
            }
        }

        // --- testit ----------------------------------------------------------------------

        static Maa Testimaa(string iso, string nimi, string lippu, params (string, string)[] luvut) => new Maa
        {
            Id = iso, Nimi = nimi, Lippu = lippu, Maalehti = iso.ToLowerInvariant(),
            Tunnusluvut = luvut.ToList(),
        };

        static List<Maa> Testimaat() => new List<Maa>
        {
            Testimaa("FIN", "Suomi", "Flag of Finland.svg", ("Väkiluku ", "5,6 milj."), ("Pinta-ala ", "338 000 km²"), ("Tulot ", "49 000 $/v"), ("V-Dem ", "0,86")),
            Testimaa("ITA", "Italia", "Flag of Italy.svg", ("Väkiluku ", "59 milj."), ("Pinta-ala ", "302 000 km²"), ("Tulot ", "42 100 $/v"), ("V-Dem ", "0,64")),
            Testimaa("JPN", "Japani", "Flag of Japan.svg", ("Väkiluku ", "124 milj."), ("Pinta-ala ", "378 000 km²"), ("Tulot ", "45 500 $/v"), ("V-Dem ", "0,75")),
        };

        /// <summary>
        /// Testikomento: alapalkki esimerkkimailla ilman linssiä (arkki = vertailuarkki heti).
        /// isot = omat maat (ISO3, enintään neljä); tila "latautuu" / "verkko" pysäyttää käyrät
        /// hakutilaan tai verkkoyhteysriville. Käyrien aineisto haetaan paketista kerran.
        /// </summary>
        public void TestaaVertailu(bool arkki, IReadOnlyList<string> isot = null, string tila = null)
        {
            var esimerkit = Testimaat();
            var maat = isot == null || isot.Count == 0 ? esimerkit
                : isot.Take(VertailuLinssi.VertailuMax).Select(iso => esimerkit.FirstOrDefault(m => m.Id == iso) ?? Testimaa(iso, iso, null)).ToList();
            testiLaput = maat.Select((m, i) => (m, VertailuLinssi.Varit[i])).ToList();
            RakennaPalkki();
            if (!arkki) return;
            if (testiKayrat == null && !testiKayratHaussa) UiKerros.Hae().StartCoroutine(HaeTestiKayrat());
            kayraTesti = tila == "latautuu" ? KayraTesti.Latautuu : tila == "verkko" ? KayraTesti.EiVerkkoa : KayraTesti.Ei;
            Vertaa();
        }

        /// <summary>Testikomento: maakyltti ilman linssiä.</summary>
        public void TestaaKyltti(string iso)
        {
            var m = Testimaat().FirstOrDefault(x => x.Id == iso) ?? Testimaa(iso, iso, null);
            NaytaKyltti(m);
        }

        /// <summary>Testinäkymät pois.</summary>
        public void TestiPois()
        {
            testiLaput = null;
            RakennaPalkki();
            if (maatiedot == null || !maatiedot.Auki) NaytaKyltti(null);
            SuljeArkki();
        }

        /// <summary>Testikomento: "täysi lista" -ilmoitus.</summary>
        public void TestaaTaynna() => Taynna();
    }
}
