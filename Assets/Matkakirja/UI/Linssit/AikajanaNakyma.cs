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
//   KuvaKasittelija      löytöpaikan paneeli (kuva, otsikko, paikka, ajoitus, löytö)
//   PuluKasittelija / TunneKasittelija → Pulu.Sano / Pulu.Tunne
//   LoppuKasittelija     loppukortti
// Ohjaimet (ylärivi): ◀ ⏸ ▶. Keksinnöissä selaus (Ajo.Siirry) ja
// Ajo.Tauko/Jatka; ihmisen matkassa Esitys.Valitse(edellinen/seuraava jakso)
// ja Esitys.Tauko/Jatka. Linssi-oliot sovittimien takaa: LinssiUi.Keksinnot/IhmisenMatka.
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
        readonly VisualElement ylarivi, paneeli, paneelinKuva, kertomus, valinaytos, esittely, loppu, musta;
        readonly Label otsikko, paikka, kello, pVuosi, pOtsikko, pAlarivi, pTeksti, kertomusTeksti, vOtsikko, vTeksti;
        readonly Label eOtsikko, eTeksti, lOtsikko, lTeksti;
        readonly Button tauko, edellinen, seuraava, kaynnista, lueJuttu;
        readonly Tiedeliitenakyma tiedeliite;
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
            var turva = kerros.Turva(LinssiUi.Kerros);

            // Ylärivi: otsikot, kello ja ohjaimet (webin .aikajana-ylarivi).
            ylarivi = Rakenne.El("mk-aikajana-ylarivi", turva);
            ylarivi.style.display = DisplayStyle.None;
            var otsikot = Rakenne.El("mk-aikajana-ylarivi__otsikot", ylarivi, PickingMode.Ignore);
            otsikko = Rakenne.Teksti("", "mk-aikajana-ylarivi__otsikko", otsikot);
            Kirjasimet.Aseta(otsikko, Kirjasin.Kone);
            paikka = Rakenne.Teksti("", "mk-aikajana-ylarivi__paikka", otsikot);
            Kirjasimet.Aseta(paikka, Kirjasin.LukuKursiivi);
            kello = Rakenne.Teksti("", "mk-aikajana-kello", ylarivi);
            Kirjasimet.Aseta(kello, Kirjasin.Kone);
            var ohjaimet = Rakenne.El("mk-aikajana-ohjaimet", ylarivi, PickingMode.Ignore);
            edellinen = Rakenne.Nappi(null, "mk-aikajana-nappi", () => Selaa(-1), ohjaimet, Ikonit.Edellinen);
            edellinen.tooltip = "Edellinen";
            tauko = Rakenne.Nappi(null, "mk-aikajana-nappi", VaihdaTauko, ohjaimet, Ikonit.Tauko);
            tauko.tooltip = "Tauko";
            seuraava = Rakenne.Nappi(null, "mk-aikajana-nappi", () => Selaa(1), ohjaimet, Ikonit.Toista);
            seuraava.tooltip = "Seuraava";
            Valikko = new LinssiValikko(kerros, () => linssit.SuljeLinssi(), AloitaAlusta);
            ohjaimet.Add(Valikko.Nappi);

            // Paneeli oikealla (webin .aikajana-ilmio): keksinnön tai löytöpaikan kortti.
            paneeli = Rakenne.El("mk-aikajana-paneeli", turva, PickingMode.Ignore);
            paneeli.style.display = DisplayStyle.None;
            Rakenne.Tausta(paneeli, Kuviot.Pergamentti);
            paneelinKuva = Rakenne.El("mk-aikajana-paneeli__kuva", paneeli, PickingMode.Ignore);
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

            // Kertojan teksti (ihmisen matka).
            kertomus = Rakenne.El("mk-aikajana-kertomus", turva, PickingMode.Ignore);
            kertomus.style.display = DisplayStyle.None;
            kertomusTeksti = Rakenne.Teksti("", "mk-aikajana-kertomus__teksti", kertomus);
            Kirjasimet.Aseta(kertomusTeksti, Kirjasin.Luku);

            // Välinäytös (webin .aikajana-valinaytos): teksti vasemmalla kartan päällä.
            valinaytos = Rakenne.El("mk-aikajana-valinaytos", turva, PickingMode.Ignore);
            valinaytos.style.display = DisplayStyle.None;
            vOtsikko = Rakenne.Teksti("", "mk-aikajana-valinaytos__otsikko", valinaytos);
            Kirjasimet.Aseta(vOtsikko, Kirjasin.LukuLihava);
            vTeksti = Rakenne.Teksti("", "mk-aikajana-valinaytos__teksti", valinaytos);
            Kirjasimet.Aseta(vTeksti, Kirjasin.Luku);
            var jatka = Rakenne.Nappi("Jatka", "mk-aikajana-avausnappi", JatkaValinaytoksesta, valinaytos);
            Kirjasimet.Aseta(jatka, Kirjasin.LukuLihava);

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
            // Yläkulman rivillä ovat taikalasit ja "Sulje linssi": ylärivi niiden alle, paneeli sen alle.
            ylarivi.style.top = Ylapalkki.Varaus + 8 + 48;
            paneeli.style.top = Ylapalkki.Varaus + 8 + 48 + 52;
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
                    if (IhmisenMatkaKerros.EsittelyUIssa && e != null && !e.Kaynnissa && !e.Paattynyt && e.I < 0) NaytaIhmisenAloitus();
                });
            }
        }

        /// <summary>Esitys alkoi (koukku tai Kytke): ylärivi näkyviin (ihmisen matkassa vasta valoissa).</summary>
        void Ala(Tila t)
        {
            if (tila == t) return;
            if (tila != Tila.Ei) Pois();
            tila = t;
            if (t == Tila.Keksinnot) ylarivi.style.display = DisplayStyle.Flex;
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
            paneeli.style.display = DisplayStyle.None;
            kertomus.style.display = DisplayStyle.None;
            valinaytos.style.display = DisplayStyle.None;
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
            tauko.Q<SvgIkoni>().Polku = tauolla ? Ikonit.Toista : Ikonit.Tauko;
            tauko.tooltip = tauolla ? "Jatka" : "Tauko";
            kello.EnableInClassList("mk-tauolla", tauolla);
        }

        void VaihdaTauko()
        {
            if (tila == Tila.Keksinnot)
            {
                var ajo = LinssiUi.Keksinnot?.Ajo;
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

        void Selaa(int suunta)
        {
            if (tila == Tila.Keksinnot)
            {
                var ajo = LinssiUi.Keksinnot?.Ajo;
                if (ajo == null) return;
                valinaytos.style.display = DisplayStyle.None;
                ajo.Siirry(Mathf.Max(0, pysakki + suunta));
            }
            else if (tila == Tila.Ihminen && ihminen != null)
            {
                var e = LinssiUi.IhmisenMatka?.Esitys;
                if (e == null) return;
                int i = Mathf.Clamp(e.I + suunta, 0, ihminen.Kertomus.Count - 1);
                e.Valitse(ihminen.Kertomus[i].Id);
                AsetaTauko(false);
            }
        }

        // --- hampurilaisvalikko -----------------------------------------------------------

        /// <summary>
        /// Joka ruutu: onko hampurilainen käytettävissä (ylärivi esillä eikä esittelyn alla).
        /// Pimeässä ja avaruusvaiheessa ylärivi on poissa (web esitys-musta/-avaruus), ja
        /// silloin valikko sulkeutuu ja linssin oma sulkupilleri jää paikalleen.
        /// </summary>
        public void VahdiValikkoa()
        {
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
                valinaytos.style.display = DisplayStyle.None;
                paneeli.style.display = DisplayStyle.None;
                Rakenne.Nayta(loppu, false, 0);
                paikka.text = "";
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
            if (l == null) return;
            if (keksinnot == null) { LataaKeksinnot(() => tiedeliite.Avaa(l, i, keksinnot?.Pysakit.Count ?? 0)); return; }
            tiedeliite.Avaa(l, i, keksinnot.Pysakit.Count);
        });

        void Kaynnistyi() => UiKerros.PaaSaikeessa(() => Rakenne.Nayta(esittely, false, 250));

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
            paikka.text = Liita(p.Henkilo, p.Paikka);
            paneelinKuva.style.display = DisplayStyle.None;
            pVuosi.text = double.IsNaN(p.Vuosi) ? "" : ((int)p.Vuosi).ToString(CultureInfo.InvariantCulture);
            pOtsikko.text = p.Otsikko ?? "";
            pAlarivi.text = Liita(p.Henkilo, p.Paikka) ?? "";
            pTeksti.text = i < keksinnot.Selitteet.Count ? keksinnot.Selitteet[i] ?? "" : "";
            pTeksti.style.display = pTeksti.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            lueJuttu.style.display = LinssiUi.Keksinnot?.Tiedeliite(i) != null ? DisplayStyle.Flex : DisplayStyle.None;
            paneeli.style.display = DisplayStyle.Flex;
        }

        void NaytaValinaytos(int i)
        {
            Ala(Tila.Keksinnot);
            if (keksinnot == null) { LataaKeksinnot(() => NaytaValinaytos(i)); return; }
            var v = i >= 0 && i < keksinnot.Valinaytokset.Count ? keksinnot.Valinaytokset[i] : default;
            vOtsikko.text = v.Otsikko ?? "";
            vTeksti.text = v.Kertoja ?? "";
            valinaytos.style.display = DisplayStyle.Flex;
            // Kapealla ruudulla paneeli ja välinäytös menisivät päällekkäin: paneeli odottaa Jatka-nappia.
            paneeli.style.display = DisplayStyle.None;
            AsetaTauko(true);
        }

        void JatkaValinaytoksesta()
        {
            valinaytos.style.display = DisplayStyle.None;
            if (pysakki >= 0) paneeli.style.display = DisplayStyle.Flex;
            var l = LinssiUi.Keksinnot;
            if (l != null) l.JatkaValinaytoksesta();
            else AsetaTauko(false);
        }

        void KeksintojenLoppu()
        {
            Ala(Tila.Keksinnot);
            lOtsikko.text = keksinnot?.LoppuOtsikko ?? "Kaari päättyi";
            lTeksti.text = keksinnot?.LoppuTeksti ?? "";
            Rakenne.Nayta(loppu, true, 320);
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
                musta.style.display = DisplayStyle.Flex;
                musta.style.opacity = 1f;
                musta.pickingMode = PickingMode.Position;
                ylarivi.style.display = DisplayStyle.None;
                kertomus.AddToClassList("mk-keskella");
                return;
            }
            musta.pickingMode = PickingMode.Ignore;
            musta.style.opacity = 0f;
            mustaPois = musta.schedule.Execute(() => musta.style.display = DisplayStyle.None).StartingIn((long)Math.Max(0, feidiMs) + 50);
        }

        void Valot(double feidiMs)
        {
            Ala(Tila.Ihminen);
            kertomus.RemoveFromClassList("mk-keskella");
            ylarivi.style.transitionDuration = new List<TimeValue> { new TimeValue((float)Math.Max(0, feidiMs), TimeUnit.Millisecond) };
            ylarivi.style.opacity = 0f;
            ylarivi.style.display = DisplayStyle.Flex;
            ylarivi.schedule.Execute(() => ylarivi.style.opacity = 1f);
        }

        void NaytaJakso(int i, KertomusJakso j)
        {
            Ala(Tila.Ihminen);
            jakso = i;
            if (j == null) return;
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
        }

        void NaytaLoytopaikka(string tunnus)
        {
            Ala(Tila.Ihminen);
            if (tunnus == null) { paneeli.style.display = DisplayStyle.None; paikka.text = ""; return; }
            if (ihminen == null) { LataaIhminen(() => NaytaLoytopaikka(tunnus)); return; }
            var p = ihminen.Paikat.FirstOrDefault(x => x.Tunnus == tunnus) ?? ihminen.Lisanostot.FirstOrDefault(x => x.Tunnus == tunnus);
            if (p == null) { paneeli.style.display = DisplayStyle.None; return; }
            paikka.text = Liita(p.Paikka, p.Maa) ?? "";
            pVuosi.text = p.Ajoitus ?? "";
            pOtsikko.text = p.Otsikko ?? "";
            pAlarivi.text = Liita(p.Paikka, p.Maa) ?? "";
            pTeksti.text = p.Loyto ?? p.Selite ?? "";
            pTeksti.style.display = pTeksti.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            paneelinKuva.style.display = DisplayStyle.None;
            paneelinKuva.style.backgroundImage = StyleKeyword.None;
            if (!string.IsNullOrEmpty(p.Kuva))
                Kuvat.Hae(p.Kuva, t =>
                {
                    if (t == null || tila != Tila.Ihminen) return;
                    paneelinKuva.style.backgroundImage = new StyleBackground(t);
                    paneelinKuva.style.display = DisplayStyle.Flex;
                });
            paneeli.style.display = DisplayStyle.Flex;
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
            // Sama järjestys kuin KeksinnotAineistossa: vuoden mukaan, saman vuoden sisällä aineiston järjestys.
            var tapahtumat = (MiniJson.Kentta(kaari, "tapahtumat") as List<object>) ?? (MiniJson.Kentta(v, "KEKSINNOT") as List<object>) ?? new List<object>();
            var jarjestetty = tapahtumat.Select(Ob).Where(x => x != null).Select((x, n) => (x, n))
                .OrderBy(p => MiniJson.Luku(p.x, "vuosi") ?? double.NaN).ThenBy(p => p.n).Select(p => p.x).ToList();
            foreach (var x in jarjestetty)
            {
                t.Selitteet.Add(MiniJson.Teksti(x, "selite"));
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
