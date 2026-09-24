// AIKAJANAN ESITYKSET (Natiivi-UI): keksintölinssin ja ihmisen matkan
// näkyvät osat (webin css/aikajana.css, js/aikajana.js, js/linssit/
// ihmisen-matka-esitys.js). Linssiseppä ohjaa, UI näyttää:
//
// KEKSINNÖT (KeksinnotKerros, IPysakkiajonNakyma)
//   esittely       EsittelyUIssa = true: pergamenttilaatikko (otsikko, teksti,
//                  Käynnistä) → KeksinnotLinssi.Kaynnista(). Tekstit
//                  sisältöpaketin keksinnot.json:sta (aikajana.esittely).
//   KelloKasittelija     vuosi ylärivin kelloon
//   PysakkiKasittelija   paneeli: vuosi, keksintö, henkilö · paikka, selite
//   ValinaytosKasittelija merkkipaalun välinäytös (otsikko + kertojan teksti
//                  vasemmalla kartan päällä, Jatka → JatkaValinaytoksesta)
//   TaukoKasittelija     ⏸/▶ ja kellon kulta tauolla
//   LoppuKasittelija     loppusanat (aikajana.loppusanat)
// IHMISEN MATKA (IhmisenMatkaKerros, IEsityksenNakyma)
//   MustaKasittelija     musta ruutu (kerros 24: tilarivin päällä, tekstien alla)
//   ValotKasittelija     kehys (yläriviin kello) esiin häivyttäen
//   JaksoKasittelija     kertojan teksti: pimeässä keskellä, muuten alareunassa
//   KelloKasittelija     "N vuotta sitten"
//   KuvaKasittelija      löytökuva kohdepisteen yllä (KuvanPiste); napautus avaa paikan kortin
//   PuluKasittelija / TunneKasittelija → Pulu.Sano / Pulu.Tunne
//   LoppuKasittelija     loppukortti
// Ohjaimet (palkki, web rakennaPalkki): Tauko/Jatka/Loppu-tekstinappi ja hampurilainen. Selaus:
// keksinnöissä karuselli (Keksijakaruselli → Ajo.Siirry), ihmisen matkassa aikaselain alareunassa
// (Aikaselain → Esitys.Esikatsele/Valitse). Linssi-oliot sovittimien takaa: LinssiUi.Keksinnot/IhmisenMatka.
// HAMPURILAINEN (LinssiValikko, web js/aikajana-valikko.js) ohjainten oikeassa
// laidassa: Poistu, Aloita alusta, Kertoja, Taustamusiikki. Se korvaa linssin
// "Sulje linssi" -pillerin aina, kun ylärivi on käytettävissä (web: ✕ ja ↺ pois
// palkista 8.9.2026); ValikkoKaytettavissa kertoo sen LinssiUi:lle.
// Aloita alusta: keksinnöissä Ajo.Alusta(aineiston alku) paikan päällä (web
// alusta); ihmisen matkassa IhmisenMatkaLinssi.AloitaAlusta (IhmisenAlustus).
// IHMISEN MATKAN ALOITUS: EsittelyUIssa = true: musta ruutu, Ken Burns -taustakuvat
// (AvausTausta) ja pergamentti, jossa IHMISEN_MATKA_ALOITUS; Käynnistä →
// IhmisenMatkaLinssi.Kaynnista() (false = vanat vielä laskennassa → uusi yritys).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class AikajanaNakyma
    {
        public const string KeksinnotId = "keksinnot", IhmisenMatkaId = "ihmisen-matka";
        enum Tila { Ei, Keksinnot, Ihminen }

        readonly LinssiUi linssit;
        readonly UiKerros kerros;
        readonly VisualElement ylarivi, paneeli, paneelinKuva, kertomus, valinaytos, valinaytosRivit, esittely, loppu, musta;
        readonly Label otsikko, paikka, kello, pVuosi, pOtsikko, pAlarivi, pTeksti, kertomusTeksti, vOtsikko;
        // Havainnekuva (web .aikajana-ilmiokuva): kaksi kerrosta ristihäivytykseen ja kuvateksti kuvan alareunassa.
        readonly VisualElement havainne, havainneTeksti;
        readonly VisualElement[] havainneKuvat = new VisualElement[2];
        readonly Label hVuosi, hNimi, hKuvateksti;
        readonly SvgIkoni hErotin;
        readonly Label eOtsikko, eTeksti, lOtsikko, lTeksti;
        readonly Button tauko, kaynnista, kahva, lueJuttu;
        readonly Aikaselain aikaselain;
        readonly Tiedeliitenakyma tiedeliite;
        readonly Keksijakaruselli karuselli;
        // Ihmisen matkan löytökuva (web .aikajana-kertomuskuva): kohdepisteen yläpuolella, seuraa pistettä.
        readonly VisualElement kertomuskuva;
        bool kertomuskuvaEsilla;
        // Löytökuvan napautuksen kortti (web luoNostokortti) ja sen löytöpaikka.
        readonly IhmisenNostokortti nostokortti;
        Loytopaikka kuvanPaikka;
        Tila tila;
        string kelloTeksti;
        int pysakki = -1, jakso = -1;
        bool tauolla;
        KeksintoTekstit keksinnot;
        IhmisenMatkaAineisto ihminen;
        IhmisenAloitus ihmisenAloitus = new IhmisenAloitus();
        bool keksinnotHaussa, ihminenHaussa;
        IVisualElementScheduledItem mustaPois, yritys;
        readonly AvausTausta avausTausta;
        /// <summary>Linssin hampurilaisvalikko ylärivin oikeassa laidassa.</summary>
        public readonly LinssiValikko Valikko;
        bool valikkoKaytossa;

        /// <summary>Hampurilainen käytettävissä (ylärivi esillä, ei esittelyn alla): linssin sulkupilleri väistyy.</summary>
        public event Action<bool> ValikkoKaytettavissa;

        /// <summary>
        /// IHMISEN MATKAN "ALOITA ALUSTA" (web aloitaAlusta: muisti pois ja linssi uudestaan
        /// avausjaksosta; Linssisepän IhmisenMatkaLinssi.AloitaAlusta, false suljettuna).
        /// </summary>
        static readonly Func<IhmisenMatkaLinssi, bool> IhmisenAlustus = l => l.AloitaAlusta();

        public AikajanaNakyma(UiKerros kerros, LinssiUi linssit)
        {
            this.linssit = linssit;
            this.kerros = kerros;
            var turva = kerros.Turva(LinssiUi.Kerros);

            // Palkki (web rakennaPalkki, .aikajana.palkki .aikajana-ylarivi): linssin oma palkki Matkakirjan
            // yläpalkin paikalla ja sen korkuisena, koko leveydeltä (LinssiUi piilottaa pelin palkin).
            ylarivi = Rakenne.El("mk-aikajana-ylarivi", kerros.Juuri(LinssiUi.Kerros));
            Rakenne.Tausta(ylarivi, Kuviot.Ylapalkki);
            ylarivi.style.display = DisplayStyle.None;
            var otsikot = Rakenne.El("mk-aikajana-ylarivi__otsikot", ylarivi, PickingMode.Ignore);
            otsikko = Rakenne.Teksti("", "mk-aikajana-ylarivi__otsikko", otsikot);
            Kirjasimet.Aseta(otsikko, Kirjasin.Kone);
            paikka = Rakenne.Teksti("", "mk-aikajana-ylarivi__paikka", otsikot);
            Kirjasimet.Aseta(paikka, Kirjasin.LukuKursiivi);
            kello = Rakenne.Teksti("", "mk-aikajana-kello", ylarivi);
            Kirjasimet.Aseta(kello, Kirjasin.Kone);
            var ohjaimet = Rakenne.El("mk-aikajana-ohjaimet", ylarivi, PickingMode.Ignore);
            // Lapun kahva (web .aikajana-kahva "Näytä X ▾"): kartan kosketus piilottaa paneelin, kahva tuo sen takaisin.
            kahva = Rakenne.Nappi("", "mk-aikajana-nappi mk-aikajana-kahva", NaytaLappu, ohjaimet);
            kahva.style.display = DisplayStyle.None;
            // Yksi tekstinappi: Tauko / Jatka (myös välinäytöksessä, hehkuen) / Loppu (web taukoNappi).
            tauko = Rakenne.Nappi("Tauko", "mk-aikajana-nappi mk-aikajana-nappi--teksti", VaihdaTauko, ohjaimet);
            Kirjasimet.Aseta(tauko, Kirjasin.Kone);
            Valikko = new LinssiValikko(kerros, () => linssit.SuljeLinssi(), AloitaAlusta);
            ohjaimet.Add(Valikko.Nappi);

            // Paneeli oikealla (webin .aikajana-ilmio): keksinnön tai löytöpaikan kortti.
            paneeli = Rakenne.El("mk-aikajana-paneeli", turva, PickingMode.Ignore);
            paneeli.style.display = DisplayStyle.None;
            Rakenne.Tausta(paneeli, Kuviot.Pergamentti);
            paneelinKuva = Rakenne.El("mk-aikajana-paneeli__kuva", paneeli, PickingMode.Ignore);
            havainne = Rakenne.El("mk-aikajana-havainne", paneeli);
            havainne.style.display = DisplayStyle.None;
            // Kehys 16:10 (web .aikajana-ilmiokuva aspect-ratio), leveys paneelista.
            havainne.RegisterCallback<GeometryChangedEvent>(e =>
            {
                float h = Mathf.Round(e.newRect.width * 10f / 16f);
                if (e.newRect.width > 0 && Mathf.Abs(e.newRect.height - h) > 0.5f) havainne.style.height = h;
            });
            for (int k = 0; k < 2; k++) havainneKuvat[k] = Rakenne.El("mk-aikajana-havainne__kuva", havainne, PickingMode.Ignore);
            havainneTeksti = Rakenne.El("mk-aikajana-havainne__teksti", havainne, PickingMode.Ignore);
            var hRivi = Rakenne.El("mk-aikajana-havainne__rivi", havainneTeksti, PickingMode.Ignore);
            hVuosi = Rakenne.Teksti("", "mk-aikajana-havainne__otsikko", hRivi);
            hErotin = Rakenne.Ikoni(Erotin, "mk-aikajana-havainne__erotin", hRivi);
            hNimi = Rakenne.Teksti("", "mk-aikajana-havainne__otsikko", hRivi);
            hKuvateksti = Rakenne.Teksti("", "mk-aikajana-havainne__kuvateksti", havainneTeksti);
            Kirjasimet.Aseta(hVuosi, Kirjasin.LukuLihava);
            Kirjasimet.Aseta(hNimi, Kirjasin.LukuLihava);
            Kirjasimet.Aseta(hKuvateksti, Kirjasin.LukuKursiivi);
            // Kuvan napautus avaa jutun (web kehys.avaa-jutun → avaaJuttu).
            havainne.RegisterCallback<ClickEvent>(_ => { if (pysakki >= 0 && LinssiUi.Keksinnot?.Tiedeliite(pysakki) != null) LinssiUi.Keksinnot.AvaaJuttu(pysakki); });
            pVuosi = Rakenne.Teksti("", "mk-aikajana-paneeli__vuosi", paneeli);
            Kirjasimet.Aseta(pVuosi, Kirjasin.Kone);
            pOtsikko = Rakenne.Teksti("", "mk-aikajana-paneeli__otsikko", paneeli);
            Kirjasimet.Aseta(pOtsikko, Kirjasin.LukuLihava);
            pAlarivi = Rakenne.Teksti("", "mk-aikajana-paneeli__alarivi", paneeli);
            Kirjasimet.Aseta(pAlarivi, Kirjasin.LukuKursiivi);
            pTeksti = Rakenne.Teksti("", "mk-aikajana-paneeli__teksti", paneeli);
            Kirjasimet.Aseta(pTeksti, Kirjasin.Luku);
            // "Lue juttu" (web aikajana.js .aikajana-lue): tiedeliitteen sivu, kun pysäkillä on juttu.
            lueJuttu = Rakenne.Nappi("Lue juttu", "mk-aikajana-lue", () => { if (pysakki >= 0) LinssiUi.Keksinnot?.AvaaJuttu(pysakki); }, paneeli);
            Kirjasimet.Aseta(lueJuttu, Kirjasin.KoneLihava);
            lueJuttu.style.display = DisplayStyle.None;
            tiedeliite = new Tiedeliitenakyma(kerros);

            // Löytökuva kerroksen juuressa (paneelin koordinaatit = IhmisenMatkaKerros.KuvanPiste muunnettuna).
            kertomuskuva = Rakenne.El("mk-aikajana-kertomuskuva", kerros.Juuri(LinssiUi.Kerros));
            kertomuskuva.style.display = DisplayStyle.None;
            // Napautus avaa noston kortin (web kuvan napautus → nostokortti.avaa).
            kertomuskuva.RegisterCallback<ClickEvent>(_ => { if (kertomuskuvaEsilla && kuvanPaikka != null) nostokortti.Avaa(kuvanPaikka); });
            nostokortti = new IhmisenNostokortti(turva);
            LinssiKysymykset.AvoinNosto = () => tila == Tila.Ihminen ? nostokortti.Auki : null;
            kerros.JokaRuutu += SijoitaKertomuskuva;

            // Ihmisen matkan aikaselain alareunassa (web luoAikaselain): veto esikatselee, irrotus valitsee.
            aikaselain = new Aikaselain(kerros.Juuri(LinssiUi.Kerros));
            aikaselain.Esikatselu += osuus => LinssiUi.IhmisenMatka?.Esitys?.Esikatsele(osuus);
            aikaselain.Valinta += id =>
            {
                var es = LinssiUi.IhmisenMatka?.Esitys;
                if (es == null) return;
                es.Valitse(id);
                AsetaTauko(!es.Kaynnissa);
            };

            // Keksijäkaruselli alareunassa (web .aikajana-nauha): veto ja napautus kelaavat kaarta tauolle.
            karuselli = new Keksijakaruselli(turva);
            karuselli.VetoAlkoi += () => { SuljeValinaytos(false); var a = LinssiUi.Keksinnot?.Ajo; if (a != null && a.Kaynnissa) a.Tauko(); };
            karuselli.Valittu += i => { SuljeValinaytos(false); NaytaLappu(); LinssiUi.Keksinnot?.Ajo?.Siirry(i); };
            karuselli.Avaa += i =>
            {
                var l = LinssiUi.Keksinnot;
                if (l == null || l.Tiedeliite(i) == null) return;
                if (l.Ajo != null && l.Ajo.Kaynnissa) l.Ajo.Tauko();
                l.AvaaJuttu(i);
            };

            // Kertojan teksti (ihmisen matka).
            kertomus = Rakenne.El("mk-aikajana-kertomus", turva, PickingMode.Ignore);
            kertomus.style.display = DisplayStyle.None;
            kertomusTeksti = Rakenne.Teksti("", "mk-aikajana-kertomus__teksti", kertomus);
            Kirjasimet.Aseta(kertomusTeksti, Kirjasin.Luku);

            // Välinäytös (web .aikajana-valinaytos, "TEKSTI SUORAAN KARTAN PÄÄLLE, EI KORTTIA"): otsikko ja
            // kertojan virkkeet rivi kerrallaan kartan vasemmalla puolella; Jatka on palkin nappi.
            valinaytos = Rakenne.El("mk-aikajana-valinaytos", turva, PickingMode.Ignore);
            valinaytos.style.display = DisplayStyle.None;
            vOtsikko = Rakenne.Teksti("", "mk-aikajana-valinaytos__otsikko", valinaytos);
            Kirjasimet.Aseta(vOtsikko, Kirjasin.LukuLihava);
            valinaytosRivit = Rakenne.El("mk-aikajana-valinaytos__rivit", valinaytos, PickingMode.Ignore);

            // Esittely- ja loppukortti: pergamentti keskellä kevyen himmennyksen päällä.
            var juuri = kerros.Juuri(LinssiUi.Kerros);
            esittely = Laatikko(juuri, out eOtsikko, out eTeksti, out var eNapit);
            kaynnista = Rakenne.Nappi("Käynnistä", "mk-aikajana-avausnappi", Kaynnista, eNapit);
            Kirjasimet.Aseta(kaynnista, Kirjasin.LukuLihava);
            loppu = Laatikko(juuri, out lOtsikko, out lTeksti, out var lNapit);
            var katso = Rakenne.Nappi("Katso karttaa", "mk-nappi--haamu", () => Rakenne.Nayta(loppu, false, 250), lNapit);
            Kirjasimet.Aseta(katso, Kirjasin.Kone);
            var suljeLinssi = Rakenne.Nappi("Sulje linssi", "mk-nappi--kulta", () => { Rakenne.Nayta(loppu, false, 250); linssit.SuljeLinssi(); }, lNapit);
            Rakenne.Tausta(suljeLinssi, Kuviot.Kulta);
            Kirjasimet.Aseta(suljeLinssi, Kirjasin.KoneLihava);

            // Ihmisen matkan musta: tilarivin (15) päällä, linssin tekstien (25) alla.
            musta = Rakenne.El("mk-aikajana-musta", kerros.Juuri(LinssiUi.MustaKerros));
            musta.style.display = DisplayStyle.None;
            // Aloituksen Ken Burns -tausta mustan päällä, pergamentin (25) alla.
            avausTausta = new AvausTausta(kerros.Juuri(LinssiUi.MustaKerros));

            kerros.TurvaMuuttui += Asettele;
            kerros.JokaRuutu += VahdiValikkoa;
            Asettele();

            // Koukut.
            KeksinnotKerros.EsittelyUIssa = true;
            IhmisenMatkaKerros.EsittelyUIssa = true;
            // Pulun chatin linssikysymykset (web kytkePulunKysymykset): ihmisen matkan kertomus ja jakso.
            LinssiKysymykset.Tila = () => tila == Tila.Ihminen && ihminen != null
                ? (ihminen.Kertomus, LinssiUi.IhmisenMatka?.Esitys?.I ?? -1)
                : ((IReadOnlyList<KertomusJakso>, int)?)null;
            KeksinnotKerros.KelloKasittelija = v => { Ala(Tila.Keksinnot); AsetaKello(Mathf.FloorToInt((float)v).ToString(CultureInfo.InvariantCulture)); };
            KeksinnotKerros.PysakkiKasittelija = NaytaPysakki;
            KeksinnotKerros.ValinaytosKasittelija = NaytaValinaytos;
            KeksinnotKerros.TaukoKasittelija = AsetaTauko;
            KeksinnotKerros.LoppuKasittelija = KeksintojenLoppu;

            IhmisenMatkaKerros.MustaKasittelija = Musta;
            IhmisenMatkaKerros.ValotKasittelija = Valot;
            IhmisenMatkaKerros.JaksoKasittelija = NaytaJakso;
            IhmisenMatkaKerros.KelloKasittelija = v => { Ala(Tila.Ihminen); AsetaKello(VuottaSitten(v)); };
            IhmisenMatkaKerros.KuvaKasittelija = NaytaLoytopaikka;
            IhmisenMatkaKerros.PuluKasittelija = t => { if (!string.IsNullOrEmpty(t)) Pulu.Hae().Sano(t); };
            IhmisenMatkaKerros.TunneKasittelija = (t, v, _) => Pulu.Hae().Tunne(t, (float)v);
            IhmisenMatkaKerros.LoppuKasittelija = IhmisenLoppu;
        }

        static VisualElement Laatikko(VisualElement juuri, out Label otsikko, out Label teksti, out VisualElement napit)
        {
            var h = Rakenne.El("mk-himmennys mk-himmennys--kevyt mk-aikajana-laatikko", juuri);
            h.style.display = DisplayStyle.None;
            var kortti = new Kortti("mk-aikajana-laatikko__kortti");
            h.Add(kortti);
            otsikko = Rakenne.Teksti("", "mk-kortti__otsikko mk-aikajana-laatikko__otsikko", kortti.Sisus);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            teksti = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus);
            napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            return h;
        }

        void Asettele()
        {
            // Palkki Matkakirjan yläpalkin paikalla: turva-alue ylä- ja sivureunoilla, sama korkeus (web
            // --aikajana-palkki-korkeus). Paneeli palkin alle 10 px väliin (web asetaPaneelinYla).
            var r = kerros.Reunat(LinssiUi.Kerros);
            ylarivi.style.paddingTop = r.y;
            ylarivi.style.paddingLeft = r.x + 14;
            ylarivi.style.paddingRight = r.z + 8;
            ylarivi.style.height = r.y + Ylapalkki.Korkeus;
            paneeli.style.top = Ylapalkki.Korkeus + 10;
            nostokortti.Yla = Ylapalkki.Korkeus + 11;
            // Oletusasettelut näyttöluokittain (web .aikajana-ilmio): puhelin pystyssä reunasta reunaan,
            // tabletti pystyssä 66 % hieman oikealle (right 3,5 %), vaakanäyttö 45 % oikeassa yläkulmassa.
            float skaala = Screen.dpi > 0 ? Mathf.Max(1f, Mathf.Round(Screen.dpi / 163f)) : 1f;
            bool pysty = Screen.height >= Screen.width, puhelin = Mathf.Min(Screen.width, Screen.height) / skaala < 701f;
            if (pysty && puhelin) { paneeli.style.left = 8; paneeli.style.right = 8; paneeli.style.width = StyleKeyword.Auto; }
            else
            {
                paneeli.style.left = StyleKeyword.Auto;
                paneeli.style.right = pysty ? Length.Percent(3.5f) : 10;
                paneeli.style.width = Length.Percent(pysty ? 66f : 45f);
            }
            valinaytos.EnableInClassList("mk-pysty", pysty);
            PaivitaAikaselain();
        }

        /// <summary>
        /// Aikaselain näkyy ihmisen matkassa, kun palkki on esillä (web: piilossa pimeässä ja avaruudessa);
        /// kertojan teksti nousee sen yläpuolelle (web --kertomusteksti-ala: korkeus + 0,7 rem).
        /// </summary>
        void PaivitaAikaselain()
        {
            bool nakyy = tila == Tila.Ihminen && ylarivi.style.display.value == DisplayStyle.Flex
                && musta.style.display.value != DisplayStyle.Flex;
            aikaselain.Nayta(nakyy, kerros.Reunat(LinssiUi.Kerros).w);
            kertomus.style.bottom = nakyy && !kertomus.ClassListContains("mk-keskella") ? aikaselain.Korkeus + 11 : StyleKeyword.Null;
        }

        // --- tila ------------------------------------------------------------------------

        /// <summary>Linssi vaihtui: esityksen osat näkyviin tai pois.</summary>
        public void Kytke(ILinssi linssi)
        {
            string id = linssi?.Tiedot?.Id;
            var uusi = id == KeksinnotId ? Tila.Keksinnot : id == IhmisenMatkaId ? Tila.Ihminen : Tila.Ei;
            if (uusi != tila) Pois();
            if (uusi == Tila.Ei) return;
            Ala(uusi);
            if (uusi == Tila.Keksinnot)
            {
                otsikko.text = (linssi.Tiedot.Nimi ?? "").ToUpperInvariant();
                LataaKeksinnot(() =>
                {
                    if (tila != Tila.Keksinnot) return;
                    if (!string.IsNullOrEmpty(keksinnot.Otsikko)) otsikko.text = keksinnot.Otsikko.ToUpperInvariant();
                    if (pysakki < 0 && !lopussa) paikka.text = keksinnot.Jakso;
                    karuselli.Rakenna(keksinnot.Pysakit);
                    // Esilämmitys linssin auetessa: GPU-luku ja ensimmäisten pysäkkien kuvat valmiiksi ennen
                    // käynnistystä, ettei ensimmäinen pysäkinvaihto odota niitä (web esilataa paneelikuvat).
                    Kuvat.Valmistele();
                    ValmistaSeuraavat(-1, 4);
                    // Nauha esiin vasta kaaren käynnistyessä (esittelyn aikana tyhjä kartta ja laatikko).
                    karuselli.Nayta(pysakki >= 0);
                    var l = LinssiUi.Keksinnot;
                    KuunteleKaynnistys(l);
                    var ajo = l?.Ajo;
                    // Esittely vain käynnistämättömälle kaarelle (selaus tai testikomento voi käynnistää ohi napin).
                    if (KeksinnotKerros.EsittelyUIssa && ajo != null && !l.OnKaynnistetty && !ajo.Kaynnissa && ajo.Tila.I < 0) NaytaEsittely();
                });
            }
            else
            {
                otsikko.text = (linssi.Tiedot.Nimi ?? "").ToUpperInvariant();
                LataaIhminen(() =>
                {
                    if (tila != Tila.Ihminen) return;
                    var e = LinssiUi.IhmisenMatka?.Esitys;
                    RakennaAikaselain();
                    LinssiKysymykset.Lataa();
                    if (IhmisenMatkaKerros.EsittelyUIssa && e != null && !e.Kaynnissa && !e.Paattynyt && e.I < 0) NaytaIhmisenAloitus();
                });
            }
        }

        /// <summary>Aikaselaimen pisteet linssiltä (IhmisenMatkaLinssi.AikaselaimenPisteet), vuosi kellon muodossa.</summary>
        void RakennaAikaselain()
        {
            var l = LinssiUi.IhmisenMatka;
            if (l == null) return;
            aikaselain.Rakenna(l.AikaselaimenPisteet(), v => Esitys.SelaimenVuositeksti(v));
            var e = l.Esitys;
            if (e != null && e.I >= 0 && ihminen != null && e.I < ihminen.Kertomus.Count) aikaselain.Aseta(ihminen.Kertomus[e.I].Id);
            PaivitaAikaselain();
        }

        /// <summary>Esitys alkoi (koukku tai Kytke): ylärivi näkyviin (ihmisen matkassa vasta valoissa).</summary>
        void Ala(Tila t)
        {
            if (tila == t) return;
            if (tila != Tila.Ei) Pois();
            tila = t;
            if (t == Tila.Keksinnot) ylarivi.style.display = DisplayStyle.Flex;
            // Kertomuskaarella palkin toinen rivi väistyy: vuosi on kellossa (web .aikajana.kertomus .aikajana-paikka).
            paikka.style.display = t == Tila.Ihminen ? DisplayStyle.None : DisplayStyle.Flex;
            PaivitaAikaselain();
            Valikko.NaytaAlusta(t == Tila.Keksinnot || IhmisenAlustus != null);
            tauolla = false;
            PaivitaTauko();
        }

        /// <summary>Kaikki esityksen osat pois (linssi suljettu tai vaihtui).</summary>
        public void Pois()
        {
            tila = Tila.Ei;
            Valikko.Sulje();
            ylarivi.style.display = DisplayStyle.None;
            ylarivi.style.opacity = StyleKeyword.Null;
            NaytaLappu();
            lapunNimi = null;
            paneeli.style.display = DisplayStyle.None;
            kertomus.style.display = DisplayStyle.None;
            SuljeValinaytos(false);
            PoisHavainne();
            lopussa = false;
            karuselli.Nayta(false);
            aikaselain.Nayta(false);
            kertomus.style.bottom = StyleKeyword.Null;
            PiilotaKertomuskuva();
            kuvanPaikka = null;
            nostokortti.Pois();
            tiedeliite?.Sulje();
            // Rakenne.Nayta mitätöi myös kesken olevan avauksen (versiolaskuri).
            Rakenne.Nayta(esittely, false, 0);
            Rakenne.Nayta(loppu, false, 0);
            yritys?.Pause();
            AsetaKaynnistaOdottaa(false);
            avausTausta.Pois(0);
            mustaPois?.Pause();
            musta.style.display = DisplayStyle.None;
            kelloTeksti = null;
            kello.text = "";
            paikka.text = "";
            pysakki = jakso = -1;
        }

        void AsetaKello(string teksti)
        {
            if (teksti == kelloTeksti) return;
            kelloTeksti = teksti;
            kello.text = teksti;
        }

        /// <summary>"300 000 vuotta sitten" (tuhaterotin ohut väli kuten webin kello).</summary>
        public static string VuottaSitten(double v)
        {
            long n = Math.Max(0, (long)Math.Round(v));
            string luku = n.ToString("#,0", CultureInfo.InvariantCulture).Replace(",", " ");
            return luku + (n == 1 ? " vuosi sitten" : " vuotta sitten");
        }

        void AsetaTauko(bool t)
        {
            tauolla = t;
            PaivitaTauko();
        }

        void PaivitaTauko()
        {
            // Web taukoNappi.textContent: käynnissä "Tauko", muuten loppu ? "Loppu" : "Jatka".
            tauko.Q<Label>().text = !tauolla ? "Tauko" : lopussa ? "Loppu" : "Jatka";
            tauko.tooltip = tauko.Q<Label>().text;
            // Ihmisen matkan lopussa nappi on pois käytöstä (web ihmisen-matka-esitys.js).
            tauko.SetEnabled(!(lopussa && tila == Tila.Ihminen));
            kello.EnableInClassList("mk-tauolla", tauolla);
        }

        bool lopussa;

        void VaihdaTauko()
        {
            if (tila == Tila.Keksinnot)
            {
                var ajo = LinssiUi.Keksinnot?.Ajo;
                if (lopussa && !(ajo?.Kaynnissa ?? false)) return; // "Loppu" ei tee mitään (web)
                if (ajo == null) { AsetaTauko(!tauolla); return; }
                if (ajo.ValinaytosAuki) { JatkaValinaytoksesta(); return; }
                if (ajo.Kaynnissa) ajo.Tauko(); else ajo.Jatka();
            }
            else if (tila == Tila.Ihminen)
            {
                var e = LinssiUi.IhmisenMatka?.Esitys;
                if (e == null) { AsetaTauko(!tauolla); return; }
                if (e.Kaynnissa) e.Tauko(); else e.Jatka();
                AsetaTauko(!e.Kaynnissa);
            }
        }

        // --- hampurilaisvalikko -----------------------------------------------------------

        /// <summary>
        /// Joka ruutu: onko hampurilainen käytettävissä (ylärivi esillä eikä esittelyn alla).
        /// Pimeässä ja avaruusvaiheessa ylärivi on poissa (web esitys-musta/-avaruus), ja
        /// silloin valikko sulkeutuu ja linssin oma sulkupilleri jää paikalleen.
        /// </summary>
        // --- lappu ja kahva (web aikajana.js piilotaLappu, naytaLappu, kytkeKartanKosketus) -------------

        const float LapunPaluuS = 0.9f; // web LAPUN_PALUU_MS
        bool lappuPiilossa, piilossaKartasta, painettiinKartalla;
        float lapunPaluu = -1f;
        string lapunNimi;

        void PiilotaLappu()
        {
            if (lappuPiilossa || paneeli.style.display.value != DisplayStyle.Flex) return;
            lappuPiilossa = true;
            paneeli.style.visibility = Visibility.Hidden;
            PaivitaKahva();
        }

        void NaytaLappu()
        {
            piilossaKartasta = false;
            lapunPaluu = -1f;
            if (!lappuPiilossa) return;
            lappuPiilossa = false;
            paneeli.style.visibility = Visibility.Visible;
            PaivitaKahva();
        }

        void PaivitaKahva()
        {
            string nimi = lapunNimi ?? "Kortti";
            kahva.Q<Label>().text = nimi + " ▾";
            kahva.tooltip = "Näytä " + nimi;
            kahva.style.display = lappuPiilossa ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>
        /// Joka ruutu: sormi kartalla (ei UI:n päällä) piilottaa paneelin; kun kartta on ollut rauhassa
        /// 0,9 s, lappu palaa. Ihmisen matkan kertomuskaarella kartan tutkiminen on oma vaiheensa: ei paluuta.
        /// </summary>
        void VahdiLappua()
        {
            if (tila == Tila.Ei) return;
            var osoitin = UnityEngine.InputSystem.Pointer.current;
            bool painettu = osoitin != null && osoitin.press.isPressed;
            if (painettu && !painettiinKartalla)
            {
                painettiinKartalla = !UiKerros.Peittaa(osoitin.position.ReadValue());
                if (painettiinKartalla && paneeli.style.display.value == DisplayStyle.Flex && !lappuPiilossa)
                {
                    PiilotaLappu();
                    piilossaKartasta = true;
                }
            }
            if (painettu && painettiinKartalla) lapunPaluu = -1f;
            if (!painettu && painettiinKartalla)
            {
                painettiinKartalla = false;
                if (piilossaKartasta && tila != Tila.Ihminen) lapunPaluu = Time.unscaledTime + LapunPaluuS;
            }
            if (lapunPaluu > 0f && Time.unscaledTime >= lapunPaluu && piilossaKartasta) NaytaLappu();
        }

        public void VahdiValikkoa()
        {
            VahdiLappua();
            bool kaytossa = tila != Tila.Ei
                && ylarivi.style.display.value == DisplayStyle.Flex
                && esittely.style.display.value != DisplayStyle.Flex;
            if (!kaytossa) Valikko.Sulje();
            if (kaytossa == valikkoKaytossa) return;
            valikkoKaytossa = kaytossa;
            ValikkoKaytettavissa?.Invoke(kaytossa);
        }

        /// <summary>Valikon "Aloita alusta" (web aloitaAlusta, kaksi haaraa).</summary>
        public void AloitaAlusta()
        {
            if (tila == Tila.Keksinnot)
            {
                // Pysäkkiajolla ei ole muistia eikä avausjaksoa: ajo palaa ensimmäiselle
                // pysäkille paikan päällä (web alusta). Linssiseppä sammuttaa valot, hiljentää
                // luennan (Selaus(-1)) ja ajaa kameran alkuun; UI tyhjentää paneelit.
                if (keksinnot == null) { LataaKeksinnot(AloitaAlusta); return; }
                SuljeValinaytos(false);
                PoisHavainne();
                paneeli.style.display = DisplayStyle.None;
                Rakenne.Nayta(loppu, false, 0);
                lopussa = false;
                paikka.text = keksinnot.Jakso;
                karuselli.Aseta(0);
                pysakki = -1;
                var ajo = LinssiUi.Keksinnot?.Ajo;
                if (ajo != null) ajo.Alusta(keksinnot.Alku);
                else
                {
                    // Testitila ilman linssiä: kello alkuun.
                    AsetaKello(Mathf.FloorToInt((float)keksinnot.Alku).ToString(CultureInfo.InvariantCulture));
                    AsetaTauko(false);
                }
                return;
            }
            if (tila == Tila.Ihminen)
            {
                var l = LinssiUi.IhmisenMatka;
                if (IhmisenAlustus == null || l == null || !IhmisenAlustus(l)) return;
                // Uusi esitys avausjaksosta: osat pois ja aloituskortti kuten linssin auetessa.
                var auki = linssit.Auki;
                Pois();
                Kytke(auki);
            }
        }

        // --- keksinnöt -------------------------------------------------------------------

        KeksinnotLinssi kuunneltu;

        /// <summary>Kaari käynnistyi mistä tahansa reitistä → esittely väistyy (Linssiseppä, Kaynnistetty).</summary>
        void KuunteleKaynnistys(KeksinnotLinssi l)
        {
            if (ReferenceEquals(l, kuunneltu)) return;
            if (kuunneltu != null) kuunneltu.Kaynnistetty -= Kaynnistyi;
            if (kuunneltu != null) kuunneltu.JuttuPyydetty -= JuttuPyydetty;
            kuunneltu = l;
            if (l != null) { l.Kaynnistetty += Kaynnistyi; l.JuttuPyydetty += JuttuPyydetty; }
        }

        /// <summary>Linssiseppä: tiedeliitteen sivu pyydettiin auki (Lue juttu tai AvaaJuttu).</summary>
        void JuttuPyydetty(int i) => UiKerros.PaaSaikeessa(() =>
        {
            var l = kuunneltu;
            if (l != null) tiedeliite.Avaa(l, i);
        });

        void Kaynnistyi() => UiKerros.PaaSaikeessa(() => { Rakenne.Nayta(esittely, false, 250); ValmistaSeuraavat(-1); });

        void NaytaEsittely()
        {
            eOtsikko.text = keksinnot?.EsittelyOtsikko ?? keksinnot?.Otsikko ?? "Keksinnöt";
            eTeksti.text = keksinnot?.EsittelyTeksti ?? "";
            Rakenne.Nayta(esittely, true, 250);
        }

        void Kaynnista()
        {
            if (tila == Tila.Ihminen) { KaynnistaIhminen(); return; }
            Rakenne.Nayta(esittely, false, 250);
            LinssiUi.Keksinnot?.Kaynnista();
        }

        void NaytaPysakki(int i)
        {
            Ala(Tila.Keksinnot);
            pysakki = i;
            if (keksinnot == null) { LataaKeksinnot(() => { if (pysakki == i) NaytaPysakki(i); }); return; }
            if (i < 0 || i >= keksinnot.Pysakit.Count) return;
            var p = keksinnot.Pysakit[i];
            karuselli.Nayta(true);
            karuselli.Aseta(i);
            string vuosi = double.IsNaN(p.Vuosi) ? null : ((int)p.Vuosi).ToString(CultureInfo.InvariantCulture);
            // Palkin toinen rivi pysäkillä: ajoitus · paikka (web [ajoitus(t), paikka(t)].join(' · ')).
            paikka.text = Liita(p.Ajoitus ?? vuosi, p.Paikka);
            lapunNimi = p.Otsikko ?? p.Henkilo ?? lapunNimi;
            if (lappuPiilossa) PaivitaKahva();
            bool juttu = LinssiUi.Keksinnot?.Tiedeliite(i) != null;
            if (p.Ilmio != null && p.Ilmio.OnKuva)
            {
                // Kuvahaara (web vaihdaPaneeli onKuva(t.ilmio)): pelkkä havainnekuva soikiohäivytyksellä,
                // vuosi ◈ nimi (tai nimi + kuvateksti) kuvan alareunassa; kuvasarja kiertää 7 s välein.
                var sarja = new List<string> { p.Ilmio.Osoite ?? p.Ilmio.Tiedosto };
                if (i < keksinnot.Sarjat.Count) sarja.AddRange(keksinnot.Sarjat[i]);
                NaytaHavainne(sarja, (int)(double.IsNaN(p.Vuosi) ? 0 : p.Vuosi), p.Ajoitus ?? vuosi ?? "", p.Otsikko ?? "", p.Ilmio.Kuvateksti);
            }
            else
            {
                // Tekstihaara: henkilö, otsikko, selite ja Lue juttu.
                NaytaTekstipaneeli((p.Henkilo ?? "").ToUpperInvariant(), p.Otsikko,
                    i < keksinnot.Selitteet.Count ? keksinnot.Selitteet[i] : null, juttu);
            }
            paneeli.style.display = DisplayStyle.Flex;
            ValmistaSeuraavat(i);
        }

        const int EsilatausPysakkeja = 2; // web PANEELIN_ESILATAUS_PYSAKKEJA

        /// <summary>
        /// Web valmistaSeuraavat: seuraavien pysäkkien havainnekuvat valmiiksi (lataus, purku, maski),
        /// jotta pysäkin vaihtuessa kuva on jo muistissa eikä vaihtokehys odota verkkoa tai GPU:ta.
        /// </summary>
        void ValmistaSeuraavat(int i, int maara = EsilatausPysakkeja)
        {
            if (keksinnot == null) return;
            for (int n = 1; n <= maara; n++)
            {
                if (i + n >= keksinnot.Pysakit.Count) return;
                var p = keksinnot.Pysakit[i + n];
                var u = p.Ilmio != null && p.Ilmio.OnKuva ? p.Ilmio.Osoite ?? p.Ilmio.Tiedosto : null;
                if (u != null) Valokeila.Hae(u, (int)(double.IsNaN(p.Vuosi) ? 0 : p.Vuosi), null);
            }
        }

        // Webin AIKAJANAN_EROTIN ◈ piirroksena (fonteista puuttuu merkki): vinoneliö, sisällä täytetty pienempi.
        const string Erotin = "<path d=\"M12 3.5 20.5 12 12 20.5 3.5 12z\"/><path class=\"taytto\" d=\"M12 8.6 15.4 12 12 15.4 8.6 12z\"/>";
        const long KuvakiertoMs = 7000; // web KUVAKIERTO_MS
        IVisualElementScheduledItem kuvakierto;
        int havainneVersio;

        void NaytaHavainne(List<string> sarja, int siemen, string vuosi, string nimi, string kuvateksti)
        {
            paneeli.AddToClassList("mk-aikajana-paneeli--kuva");
            paneeli.style.backgroundImage = StyleKeyword.None;
            SaadaTekstit(false);
            havainne.style.display = DisplayStyle.Flex;
            bool omaTeksti = !string.IsNullOrEmpty(kuvateksti);
            hVuosi.text = omaTeksti ? "" : vuosi;
            hVuosi.style.display = hErotin.style.display = omaTeksti ? DisplayStyle.None : DisplayStyle.Flex;
            hNimi.text = nimi;
            hKuvateksti.text = kuvateksti ?? "";
            hKuvateksti.style.display = omaTeksti ? DisplayStyle.Flex : DisplayStyle.None;
            kuvakierto?.Pause();
            int versio = ++havainneVersio;
            foreach (var k in havainneKuvat) { k.RemoveFromClassList("mk-esilla"); k.style.backgroundImage = StyleKeyword.None; }
            var pohja = havainneKuvat[0];
            Valokeila.Hae(sarja[0], siemen, t =>
            {
                if (versio != havainneVersio || t == null) return;
                pohja.style.backgroundImage = new StyleBackground(t);
                pohja.AddToClassList("mk-esilla");
            });
            if (sarja.Count < 2) return;
            int kohta = 0;
            kuvakierto = havainne.schedule.Execute(() =>
            {
                if (versio != havainneVersio) { kuvakierto?.Pause(); return; }
                kohta = (kohta + 1) % sarja.Count;
                int tama = kohta;
                Valokeila.Hae(sarja[tama], siemen, t =>
                {
                    if (versio != havainneVersio || t == null) return;
                    // Päällys ristihäivyttää pohjan päälle; kierroksen alussa pohja palaa (päällys pois).
                    var paallys = havainneKuvat[1];
                    if (tama == 0) { paallys.RemoveFromClassList("mk-esilla"); return; }
                    if (paallys.ClassListContains("mk-esilla")) { pohja.style.backgroundImage = paallys.style.backgroundImage; }
                    paallys.RemoveFromClassList("mk-esilla");
                    paallys.style.backgroundImage = new StyleBackground(t);
                    paallys.schedule.Execute(() => paallys.AddToClassList("mk-esilla"));
                });
            }).Every(KuvakiertoMs).StartingIn(KuvakiertoMs);
        }

        /// <summary>Tekstipaneeli (web .aikajana-ilmio-teksti): pergamentilla henkilö/merkintä, otsikko, selite.</summary>
        void NaytaTekstipaneeli(string henkilo, string otsikkoTeksti, string selite, bool juttu)
        {
            PoisHavainne();
            SaadaTekstit(true);
            paneelinKuva.style.display = DisplayStyle.None;
            pVuosi.text = henkilo ?? "";
            pVuosi.style.display = string.IsNullOrEmpty(henkilo) ? DisplayStyle.None : DisplayStyle.Flex;
            pOtsikko.text = otsikkoTeksti ?? "";
            pAlarivi.style.display = DisplayStyle.None;
            pTeksti.text = selite ?? "";
            pTeksti.style.display = pTeksti.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            lueJuttu.style.display = juttu ? DisplayStyle.Flex : DisplayStyle.None;
        }

        void PoisHavainne()
        {
            havainneVersio++;
            kuvakierto?.Pause();
            havainne.style.display = DisplayStyle.None;
            if (!paneeli.ClassListContains("mk-aikajana-paneeli--kuva")) return;
            paneeli.RemoveFromClassList("mk-aikajana-paneeli--kuva");
            Rakenne.Tausta(paneeli, Kuviot.Pergamentti);
        }

        void SaadaTekstit(bool nakyy)
        {
            var d = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            pVuosi.style.display = pOtsikko.style.display = pAlarivi.style.display = pTeksti.style.display = d;
            if (!nakyy) { lueJuttu.style.display = DisplayStyle.None; paneelinKuva.style.display = DisplayStyle.None; }
        }

        void NaytaValinaytos(int i)
        {
            Ala(Tila.Keksinnot);
            if (keksinnot == null) { LataaKeksinnot(() => NaytaValinaytos(i)); return; }
            var v = i >= 0 && i < keksinnot.Valinaytokset.Count ? keksinnot.Valinaytokset[i] : default;
            // Web avaaValinaytos: otsikko häivyttäen, virkkeet rivi kerrallaan (ilman luennan kestoa
            // VALINAYTOKSEN_RIVIVALI_MS 1900 ms), paneelin havainnekuva jää paikalleen ja kiertää.
            valinaytosVersio++;
            int versio = valinaytosVersio;
            vOtsikko.text = v.Otsikko ?? "";
            vOtsikko.RemoveFromClassList("mk-esilla");
            valinaytosRivit.Clear();
            var rivit = Virkkeet(v.Kertoja);
            valinaytos.style.opacity = StyleKeyword.Null;
            valinaytos.style.display = DisplayStyle.Flex;
            valinaytos.schedule.Execute(() => { if (versio == valinaytosVersio) vOtsikko.AddToClassList("mk-esilla"); });
            for (int n = 0; n < rivit.Count; n++)
            {
                var rivi = Rakenne.Teksti(rivit[n], "mk-aikajana-valinaytos__rivi", valinaytosRivit);
                Kirjasimet.Aseta(rivi, Kirjasin.Luku);
                valinaytos.schedule.Execute(() => { if (versio == valinaytosVersio) rivi.AddToClassList("mk-esilla"); }).StartingIn(ValinaytoksenRivivaliMs * (n + 1));
            }
            AsetaTauko(true);
            // Jatka alkaa hehkua hetken päästä (web VALINAYTOKSEN_HEHKUVIIVE_MS, .aikajana-nappi.hehku).
            hehku?.Pause();
            bool paalla = false;
            hehku = tauko.schedule.Execute(() =>
            {
                if (versio != valinaytosVersio) { hehku?.Pause(); tauko.RemoveFromClassList("mk-hehku"); return; }
                paalla = !paalla;
                tauko.EnableInClassList("mk-hehku", paalla);
            }).Every(1400).StartingIn(2500);
        }

        const long ValinaytoksenRivivaliMs = 1900;
        int valinaytosVersio;
        IVisualElementScheduledItem hehku;

        /// <summary>Web jaaVirkkeiksi: katkaisu . ! ? … jälkeen tulevasta välilyönnistä.</summary>
        static List<string> Virkkeet(string teksti) =>
            System.Text.RegularExpressions.Regex.Split(teksti ?? "", @"(?<=[.!?…])\s+").Select(x => x.Trim()).Where(x => x.Length > 0).ToList();

        void SuljeValinaytos(bool haivyta)
        {
            valinaytosVersio++;
            hehku?.Pause();
            tauko.RemoveFromClassList("mk-hehku");
            if (valinaytos.style.display.value != DisplayStyle.Flex) return;
            if (!haivyta) { valinaytos.style.display = DisplayStyle.None; return; }
            // Poistuma 420 ms (web VALINAYTOKSEN_POISTUMA_MS).
            int versio = valinaytosVersio;
            valinaytos.style.opacity = 0f;
            valinaytos.schedule.Execute(() => { if (versio == valinaytosVersio) valinaytos.style.display = DisplayStyle.None; }).StartingIn(420);
        }

        void JatkaValinaytoksesta()
        {
            SuljeValinaytos(true);
            var l = LinssiUi.Keksinnot;
            if (l != null) l.JatkaValinaytoksesta();
            else AsetaTauko(false);
        }

        /// <summary>
        /// Loppusanat (web lopeta → vaihdaPaneeli ilman kuvaa): paneelin tekstihaara, merkintänä kaaren
        /// nimi; ei nappeja. Palkin toinen rivi "1765–1928 · 25 valoa" ja nappi "Loppu".
        /// </summary>
        void KeksintojenLoppu()
        {
            Ala(Tila.Keksinnot);
            if (keksinnot == null) { LataaKeksinnot(KeksintojenLoppu); return; }
            SuljeValinaytos(false);
            lopussa = true;
            NaytaLappu();
            lapunNimi = keksinnot.LoppuOtsikko ?? lapunNimi;
            NaytaTekstipaneeli((keksinnot.Otsikko ?? "").ToUpperInvariant(), keksinnot.LoppuOtsikko ?? "Kaari päättyi", keksinnot.LoppuTeksti, false);
            paneeli.style.display = DisplayStyle.Flex;
            paikka.text = keksinnot.Jakso + " · " + keksinnot.Valoja + " valoa";
            AsetaTauko(true);
        }

        // --- ihmisen matka ---------------------------------------------------------------

        void NaytaIhmisenAloitus()
        {
            eOtsikko.text = ihmisenAloitus.Otsikko ?? "Ihmisen matka";
            eTeksti.text = ihmisenAloitus.Teksti ?? "";
            AsetaKaynnistaOdottaa(false);
            avausTausta.Nayta(ihmisenAloitus.Taustakuvat);
            Rakenne.Nayta(esittely, true, 250);
        }

        /// <summary>Käynnistä: esitys alkaa, kun vanat ovat valmiit (web aloitaAjo odottaa niitä).</summary>
        void KaynnistaIhminen()
        {
            yritys?.Pause();
            var l = LinssiUi.IhmisenMatka;
            if (l == null) { Rakenne.Nayta(esittely, false, 250); avausTausta.Pois(550); return; }
            if (!l.Kaynnista())
            {
                AsetaKaynnistaOdottaa(true);
                yritys = kaynnista.schedule.Execute(() => { if (tila == Tila.Ihminen) KaynnistaIhminen(); }).StartingIn(250);
                return;
            }
            AsetaKaynnistaOdottaa(false);
            Rakenne.Nayta(esittely, false, 250);
            // Esitys.Aloita laittoi mustan päälle saman tien: tausta häipyy sen päältä (web 550 ms).
            avausTausta.Pois(550);
        }

        /// <summary>
        /// Esitys käynnissä mistä tahansa reitistä (Käynnistä, aikaselain, testikomento): aloituslaatikko ja
        /// sen tausta pois (web aloitaAjo poistaa laatikon ennen esitys.aloita()).
        /// </summary>
        void EsittelyPoisKaynnissa()
        {
            if (esittely.style.display.value != DisplayStyle.Flex) return;
            // Vain alkaneelle esitykselle (käynnissä tai jakso valittu, myös tauolla aikaselaimesta tai
            // testikomennosta): aloituksen musta ja valmistelu eivät vie laatikkoa.
            var e = LinssiUi.IhmisenMatka?.Esitys;
            if (e == null || (!e.Kaynnissa && e.I < 0)) return;
            yritys?.Pause();
            AsetaKaynnistaOdottaa(false);
            Rakenne.Nayta(esittely, false, 250);
            avausTausta.Pois(550);
        }

        void AsetaKaynnistaOdottaa(bool odottaa)
        {
            kaynnista.SetEnabled(!odottaa);
            kaynnista.Q<Label>().text = odottaa ? "Hetki…" : "Käynnistä";
        }

        void Musta(bool paalla, double feidiMs)
        {
            Ala(Tila.Ihminen);
            mustaPois?.Pause();
            musta.style.transitionDuration = new List<TimeValue> { new TimeValue((float)Math.Max(0, feidiMs), TimeUnit.Millisecond) };
            if (paalla)
            {
                EsittelyPoisKaynnissa();
                musta.style.display = DisplayStyle.Flex;
                musta.style.opacity = 1f;
                musta.pickingMode = PickingMode.Position;
                ylarivi.style.display = DisplayStyle.None;
                kertomus.AddToClassList("mk-keskella");
                PaivitaAikaselain();
                return;
            }
            musta.pickingMode = PickingMode.Ignore;
            musta.style.opacity = 0f;
            mustaPois = musta.schedule.Execute(() => { musta.style.display = DisplayStyle.None; PaivitaAikaselain(); }).StartingIn((long)Math.Max(0, feidiMs) + 50);
        }

        void Valot(double feidiMs)
        {
            Ala(Tila.Ihminen);
            kertomus.RemoveFromClassList("mk-keskella");
            ylarivi.style.transitionDuration = new List<TimeValue> { new TimeValue((float)Math.Max(0, feidiMs), TimeUnit.Millisecond) };
            ylarivi.style.opacity = 0f;
            ylarivi.style.display = DisplayStyle.Flex;
            ylarivi.schedule.Execute(() => ylarivi.style.opacity = 1f);
            PaivitaAikaselain();
        }

        void NaytaJakso(int i, KertomusJakso j)
        {
            Ala(Tila.Ihminen);
            jakso = i;
            EsittelyPoisKaynnissa();
            if (j == null) return;
            aikaselain.Aseta(j.Id);
            bool pimea = j.Vaihe == "pimea";
            // Tekstin paikka luetaan omasta tyylistä (resolvedStyle päivittyy vasta asettelussa).
            kertomus.EnableInClassList("mk-keskella", pimea && musta.style.display.value == DisplayStyle.Flex);
            kertomusTeksti.text = j.Teksti ?? "";
            kertomus.style.display = string.IsNullOrEmpty(j.Teksti) ? DisplayStyle.None : DisplayStyle.Flex;
            // Pimeän jälkeen kehys on jo esillä (hyppy aikaselaimella ohi avauksen).
            if (!pimea && j.Vaihe != "valot" && ylarivi.style.display.value != DisplayStyle.Flex)
            {
                ylarivi.style.opacity = 1f;
                ylarivi.style.display = DisplayStyle.Flex;
            }
            PaivitaAikaselain();
        }

        void NaytaLoytopaikka(string tunnus)
        {
            Ala(Tila.Ihminen);
            PoisHavainne();
            SaadaTekstit(true);
            // Kortti ei ole esillä oikeassa reunassa (web: ilmiöpaneeli ei ole esityksessä käytössä); se
            // aukeaa löytökuvan napautuksesta.
            paneeli.style.display = DisplayStyle.None;
            if (tunnus == null) { PiilotaKertomuskuva(); paikka.text = ""; return; }
            if (ihminen == null) { LataaIhminen(() => NaytaLoytopaikka(tunnus)); return; }
            var p = ihminen.Paikat.FirstOrDefault(x => x.Tunnus == tunnus) ?? ihminen.Lisanostot.FirstOrDefault(x => x.Tunnus == tunnus);
            if (p == null) { PiilotaKertomuskuva(); return; }
            paikka.text = Liita(p.Paikka, p.Maa) ?? "";
            pVuosi.text = p.Ajoitus ?? "";
            pOtsikko.text = p.Otsikko ?? "";
            lapunNimi = p.Otsikko ?? lapunNimi;
            if (lappuPiilossa) PaivitaKahva();
            pAlarivi.text = Liita(p.Paikka, p.Maa) ?? "";
            pTeksti.text = p.Loyto ?? p.Selite ?? "";
            pTeksti.style.display = pTeksti.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            paneelinKuva.style.display = DisplayStyle.None;
            paneelinKuva.style.backgroundImage = StyleKeyword.None;
            PiilotaKertomuskuva();
            kuvanPaikka = p;
            if (!string.IsNullOrEmpty(p.Kuva))
            {
                Kuvat.Hae(p.Kuva, t =>
                {
                    if (t == null || tila != Tila.Ihminen) return;
                    paneelinKuva.style.backgroundImage = new StyleBackground(t);
                    paneelinKuva.style.display = DisplayStyle.Flex;
                });
                int versio = ++kertomuskuvaVersio;
                Valokeila.HaeKertomuskuva(p.Kuva, t =>
                {
                    if (t == null || tila != Tila.Ihminen || versio != kertomuskuvaVersio) return;
                    kertomuskuva.style.backgroundImage = new StyleBackground(t);
                    kertomuskuvaEsilla = true;
                    kertomuskuva.style.display = DisplayStyle.Flex;
                    SijoitaKertomuskuva();
                    kertomuskuva.schedule.Execute(() => { if (kertomuskuvaEsilla && versio == kertomuskuvaVersio) kertomuskuva.AddToClassList("mk-esilla"); });
                });
            }
        }

        int kertomuskuvaVersio;

        void PiilotaKertomuskuva()
        {
            kertomuskuvaVersio++;
            kertomuskuvaEsilla = false;
            kertomuskuva.RemoveFromClassList("mk-esilla");
            kertomuskuva.style.display = DisplayStyle.None;
        }

        /// <summary>
        /// Joka ruutu: löytökuva kohdepisteen yläpuolelle (web translate(−50 %, −100 % − 1,1 rem)), leveys
        /// 66 % ruudusta enintään 560, 3:2. Piste pallon takana (null) → kuva piiloon siksi aikaa.
        /// </summary>
        void SijoitaKertomuskuva()
        {
            if (!kertomuskuvaEsilla) return;
            var juuri = kertomuskuva.parent;
            var piste = IhmisenMatkaKerros.KuvanPiste;
            if (!piste.HasValue || juuri?.panel == null) { kertomuskuva.style.visibility = Visibility.Hidden; return; }
            var p = RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(piste.Value.x, Screen.height - piste.Value.y));
            float leveys = juuri.resolvedStyle.width;
            if (float.IsNaN(leveys) || leveys <= 0) return;
            float w = Mathf.Min(leveys * 0.66f, 560f), h = Mathf.Round(w * 2f / 3f);
            kertomuskuva.style.visibility = Visibility.Visible;
            kertomuskuva.style.width = w;
            kertomuskuva.style.height = h;
            kertomuskuva.style.left = p.x - w / 2f;
            kertomuskuva.style.top = p.y - h - 17.6f;
        }

        void IhmisenLoppu()
        {
            Ala(Tila.Ihminen);
            lOtsikko.text = "Kertomus päättyi";
            lTeksti.text = "";
            Rakenne.Nayta(loppu, true, 320);
        }

        static string Liita(params string[] osat)
        {
            var l = osat.Where(o => !string.IsNullOrEmpty(o)).ToList();
            return l.Count == 0 ? null : string.Join(" · ", l);
        }

        // --- aineisto (sisältöpaketista, sama välimuisti kuin Linssisepällä) --------------

        /// <summary>Keksintökaaren tekstit, joita KeksinnotAineisto ei lue (selitteet, esittely, loppusanat, välinäytös).</summary>
        sealed class KeksintoTekstit
        {
            public string Otsikko, EsittelyOtsikko, EsittelyTeksti, LoppuOtsikko, LoppuTeksti;
            /// <summary>Kaaren alkuvuosi (KeksinnotAineisto.Alku, sama oletus 1765): Aloita alusta.</summary>
            public double Alku = 1765;
            public List<Pysakki> Pysakit = new List<Pysakki>();
            public List<string> Selitteet = new List<string>();
            /// <summary>Pysäkin havainnekuvasarjan jatko (web t.ilmioSarja: osoitteet ilmion jälkeen).</summary>
            public List<List<string>> Sarjat = new List<List<string>>();
            /// <summary>Palkin toinen rivi levossa (web kaari.jakso ?? "alku–loppu") ja loppurivin valomäärä.</summary>
            public string Jakso = "";
            public int Valoja;
            public List<(string Otsikko, string Kertoja)> Valinaytokset = new List<(string, string)>();
        }

        readonly List<Action> keksintoOdottajat = new List<Action>(), ihminenOdottajat = new List<Action>();

        void LataaKeksinnot(Action valmis)
        {
            if (keksinnot != null) { valmis?.Invoke(); return; }
            if (valmis != null) keksintoOdottajat.Add(valmis);
            if (keksinnotHaussa) return;
            keksinnotHaussa = true;
            UiKerros.Hae().StartCoroutine(LinssiSisalto.Hae("moduulit/js/linssit/keksinnot.json", teksti =>
            {
                keksinnotHaussa = false;
                try { keksinnot = teksti == null ? new KeksintoTekstit() : LueKeksinnot(teksti); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui keksinnöt: " + e.Message); keksinnot = new KeksintoTekstit(); }
                var o = keksintoOdottajat.ToList();
                keksintoOdottajat.Clear();
                foreach (var a in o) a();
            }));
        }

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;

        static KeksintoTekstit LueKeksinnot(string json)
        {
            var moduuli = MiniJson.Jasenna(json);
            var aineisto = KeksinnotAineisto.Lue(moduuli);
            var v = Ob(MiniJson.Kentta(Ob(moduuli), "exportit"));
            var linssi = Ob(MiniJson.Kentta(v, "LINSSI"));
            if (Ob(MiniJson.Kentta(linssi, "arvo")) is Dictionary<string, object> arvo) linssi = arvo;
            var kaari = Ob(MiniJson.Kentta(linssi, "aikajana"));
            var es = Ob(MiniJson.Kentta(kaari, "esittely"));
            var lo = Ob(MiniJson.Kentta(kaari, "loppusanat"));
            var t = new KeksintoTekstit
            {
                Otsikko = MiniJson.Teksti(kaari, "otsikko") ?? aineisto.Otsikko,
                EsittelyOtsikko = MiniJson.Teksti(es, "otsikko"),
                EsittelyTeksti = MiniJson.Teksti(es, "teksti"),
                LoppuOtsikko = MiniJson.Teksti(lo, "otsikko"),
                LoppuTeksti = MiniJson.Teksti(lo, "teksti"),
                Pysakit = aineisto.Pysakit,
                Alku = aineisto.Alku,
            };
            double? alku = MiniJson.Luku(kaari, "alku"), loppu = MiniJson.Luku(kaari, "loppu");
            t.Jakso = MiniJson.Teksti(kaari, "jakso")
                ?? (alku.HasValue && loppu.HasValue ? $"{(int)alku.Value}–{(int)loppu.Value}" : "");
            // Sama järjestys kuin KeksinnotAineistossa: vuoden mukaan, saman vuoden sisällä aineiston järjestys.
            var tapahtumat = (MiniJson.Kentta(kaari, "tapahtumat") as List<object>) ?? (MiniJson.Kentta(v, "KEKSINNOT") as List<object>) ?? new List<object>();
            var jarjestetty = tapahtumat.Select(Ob).Where(x => x != null).Select((x, n) => (x, n))
                .OrderBy(p => MiniJson.Luku(p.x, "vuosi") ?? double.NaN).ThenBy(p => p.n).Select(p => p.x).ToList();
            foreach (var x in jarjestetty)
            {
                t.Selitteet.Add(MiniJson.Teksti(x, "selite"));
                var sarja = new List<string>();
                foreach (var k in (MiniJson.Kentta(x, "ilmioSarja") as List<object>) ?? new List<object>())
                    if (Ob(k) is Dictionary<string, object> ko && (MiniJson.Teksti(ko, "osoite") ?? MiniJson.Teksti(ko, "tiedosto")) is string u && u.Length > 0) sarja.Add(u);
                t.Sarjat.Add(sarja);
                // Loppurivin valot: keksinnöt ilman merkkipaaluja (web "1765–1928 · 25 valoa", 26 tapahtumaa).
                if (!(MiniJson.Kentta(x, "paalu") is bool paalu && paalu)) t.Valoja++;
                var va = Ob(MiniJson.Kentta(x, "valinaytos"));
                t.Valinaytokset.Add((MiniJson.Teksti(va, "otsikko"), MiniJson.Teksti(va, "kertoja")));
            }
            return t;
        }

        /// <summary>Aloituskortti, jota IhmisenMatkaAineisto ei lue (web ihmisen-matka.js avauslaatikko).</summary>
        sealed class IhmisenAloitus
        {
            public string Otsikko, Teksti;
            public List<string> Taustakuvat = new List<string>();
        }

        /// <summary>
        /// Taustakuvat matkan järjestyksessä (web ALOITUKSEN_TAUSTAKUVAT): aineiston
        /// havainnekuvat tunnuksilla; tuntematon tunnus jää pois (tausta vain lyhenee).
        /// </summary>
        static readonly string[] AloituksenTaustakuvat =
            { "jebel-irhoud", "pinnacle-point", "al-wusta", "madjedbebe", "beringia", "monte-verde" };

        static IhmisenAloitus LueIhmisenAloitus(object moduuli, IhmisenMatkaAineisto a)
        {
            var v = Ob(MiniJson.Kentta(Ob(moduuli), "exportit"));
            // laatikoksi(IHMISEN_MATKA_ALOITUS) ?? laatikoksi(IHMISEN_MATKA_ESITTELY): teksti tai { otsikko, teksti }.
            var t = new IhmisenAloitus();
            foreach (var nimi in new[] { "IHMISEN_MATKA_ALOITUS", "IHMISEN_MATKA_ESITTELY" })
            {
                var x = MiniJson.Kentta(v, nimi);
                // Vientiformaatti voi kääriä arvon ({ arvo: … }) kuten keksintöjen LINSSI.
                if (Ob(x) is Dictionary<string, object> o) x = MiniJson.Kentta(o, "arvo") ?? x;
                if (x is string teksti && teksti.Length > 0) { t.Teksti = teksti; break; }
                if (Ob(x) is Dictionary<string, object> l && MiniJson.Teksti(l, "teksti") is string lt)
                { t.Otsikko = MiniJson.Teksti(l, "otsikko"); t.Teksti = lt; break; }
            }
            // Paketin vientilistalla ei vielä ole ALOITUS/ESITTELY-vientejä (Siirtoseppä lisää):
            // siihen asti webin IHMISEN_MATKA_ALOITUS sanasta sanaan (js/linssit/ihmisen-matka-data.js).
            t.Teksti ??= "Yksi laji levisi yhdestä maanosasta kaikkiin. Kukaan ei suunnitellut matkaa: "
                + "jokainen sukupolvi siirtyi vain vähän kauemmas kuin edellinen, ja tuhat sukupolvea "
                + "myöhemmin oltiin toisella puolella maapalloa.";
            foreach (var tunnus in AloituksenTaustakuvat)
            {
                var p = a.Paikat.FirstOrDefault(x => x.Tunnus == tunnus) ?? a.Lisanostot.FirstOrDefault(x => x.Tunnus == tunnus);
                if (!string.IsNullOrEmpty(p?.Kuva)) t.Taustakuvat.Add(p.Kuva);
            }
            return t;
        }

        void LataaIhminen(Action valmis)
        {
            if (ihminen != null) { valmis?.Invoke(); return; }
            if (valmis != null) ihminenOdottajat.Add(valmis);
            if (ihminenHaussa) return;
            ihminenHaussa = true;
            UiKerros.Hae().StartCoroutine(LataaIhminenReitti());
        }

        System.Collections.IEnumerator LataaIhminenReitti()
        {
            string data = null, kertomusJson = null;
            yield return LinssiSisalto.Hae("moduulit/js/linssit/ihmisen-matka-data.json", t => data = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/ihmisen-matka-kertomus.json", t => kertomusJson = t);
            ihminenHaussa = false;
            try
            {
                ihminen = data == null || kertomusJson == null ? new IhmisenMatkaAineisto()
                    : IhmisenMatkaAineisto.Lue(MiniJson.Jasenna(data), MiniJson.Jasenna(kertomusJson));
                if (data != null) ihmisenAloitus = LueIhmisenAloitus(MiniJson.Jasenna(data), ihminen);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui ihmisen matka: " + e.Message); ihminen = new IhmisenMatkaAineisto(); }
            var o = ihminenOdottajat.ToList();
            ihminenOdottajat.Clear();
            foreach (var a in o) a();
        }

        // --- testit ----------------------------------------------------------------------

        /// <summary>Testikomento: keksintöjen osat ilman linssiä (esittely|pysakki i|valinaytos i|loppu|kello v).</summary>
        public string TestaaKeksinnot(string mita, int i)
        {
            Ala(Tila.Keksinnot);
            ylarivi.style.display = DisplayStyle.Flex;
            LataaKeksinnot(() =>
            {
                if (!string.IsNullOrEmpty(keksinnot.Otsikko)) otsikko.text = keksinnot.Otsikko.ToUpperInvariant();
                switch (mita)
                {
                    case "esittely": NaytaEsittely(); break;
                    case "valinaytos":
                        int paalu = i >= 0 ? i : keksinnot.Valinaytokset.FindIndex(x => x.Otsikko != null);
                        NaytaValinaytos(Math.Max(0, paalu)); break;
                    case "loppu": KeksintojenLoppu(); break;
                    default:
                        NaytaPysakki(Math.Max(0, i));
                        if (i >= 0 && i < keksinnot.Pysakit.Count) AsetaKello(((int)keksinnot.Pysakit[i].Vuosi).ToString(CultureInfo.InvariantCulture));
                        break;
                }
            });
            return null;
        }

        /// <summary>Testikomento: ihmisen matkan osat ilman linssiä (aloitus|musta|valot|jakso i|kuva i|loppu).</summary>
        public string TestaaIhminen(string mita, int i)
        {
            Ala(Tila.Ihminen);
            LataaIhminen(() =>
            {
                switch (mita)
                {
                    case "musta":
                        Musta(true, 0);
                        if (ihminen.Kertomus.Count > 0) NaytaJakso(0, ihminen.Kertomus[0]);
                        AsetaKello(VuottaSitten(300000));
                        break;
                    case "valot": Musta(false, 2600); Valot(2600); break;
                    case "kuva":
                        var p = ihminen.Paikat.Count > 0 ? ihminen.Paikat[Mathf.Clamp(i, 0, ihminen.Paikat.Count - 1)] : null;
                        if (p != null) { Valot(0); NaytaLoytopaikka(p.Tunnus); AsetaKello(VuottaSitten(p.VuosiaSitten)); }
                        break;
                    case "loppu": IhmisenLoppu(); break;
                    case "aloitus": NaytaIhmisenAloitus(); break;
                    default:
                        int n = Mathf.Clamp(i, 0, Math.Max(0, ihminen.Kertomus.Count - 1));
                        var j = ihminen.Kertomus.Count > 0 ? ihminen.Kertomus[n]
                            : new KertomusJakso { Id = "testi", Vaihe = "matka", Teksti = "Noin 300 000 vuotta sitten Afrikassa eli ihmisiä, jotka näyttivät meiltä." };
                        if (j.Vaihe == "pimea") Musta(true, 0); else Valot(0);
                        NaytaJakso(n, j);
                        AsetaKello(VuottaSitten(j.Vuosia ?? 300000));
                        break;
                }
            });
            return null;
        }
    }
}
