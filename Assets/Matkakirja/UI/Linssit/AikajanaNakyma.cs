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
// ja Esitys.Tauko/Jatka. Linssi-oliot luetaan LinssiUi.LinssiOlio-heijastuksella.
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
        readonly Button tauko, edellinen, seuraava, kaynnista;
        Tila tila;
        string kelloTeksti;
        int pysakki = -1, jakso = -1;
        bool tauolla;
        KeksintoTekstit keksinnot;
        IhmisenMatkaAineisto ihminen;
        bool keksinnotHaussa, ihminenHaussa;
        IVisualElementScheduledItem mustaPois;

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
            edellinen = Rakenne.Nappi("◀", "mk-aikajana-nappi", () => Selaa(-1), ohjaimet);
            edellinen.tooltip = "Edellinen";
            tauko = Rakenne.Nappi("⏸", "mk-aikajana-nappi", VaihdaTauko, ohjaimet);
            tauko.tooltip = "Tauko";
            seuraava = Rakenne.Nappi("▶", "mk-aikajana-nappi", () => Selaa(1), ohjaimet);
            seuraava.tooltip = "Seuraava";

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

            kerros.TurvaMuuttui += Asettele;
            Asettele();

            // Koukut.
            KeksinnotKerros.EsittelyUIssa = LinssiUi.SovitinLuettavissa("KeksinnotSovitin");
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
            ylarivi.style.top = Ylapalkki.Korkeus + 8 + 48;
            paneeli.style.top = Ylapalkki.Korkeus + 8 + 48 + 52;
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
                    var ajo = LinssiUi.LinssiOlio<KeksinnotLinssi>(LinssiUi.Rekisteri?.Auki)?.Ajo;
                    if (KeksinnotKerros.EsittelyUIssa && ajo != null && !ajo.Kaynnissa && ajo.Tila.I < 0) NaytaEsittely();
                });
            }
            else
            {
                otsikko.text = (linssi.Tiedot.Nimi ?? "").ToUpperInvariant();
                LataaIhminen(null);
            }
        }

        /// <summary>Esitys alkoi (koukku tai Kytke): ylärivi näkyviin (ihmisen matkassa vasta valoissa).</summary>
        void Ala(Tila t)
        {
            if (tila == t) return;
            if (tila != Tila.Ei) Pois();
            tila = t;
            if (t == Tila.Keksinnot) ylarivi.style.display = DisplayStyle.Flex;
            tauolla = false;
            PaivitaTauko();
        }

        /// <summary>Kaikki esityksen osat pois (linssi suljettu tai vaihtui).</summary>
        public void Pois()
        {
            tila = Tila.Ei;
            ylarivi.style.display = DisplayStyle.None;
            ylarivi.style.opacity = StyleKeyword.Null;
            paneeli.style.display = DisplayStyle.None;
            kertomus.style.display = DisplayStyle.None;
            valinaytos.style.display = DisplayStyle.None;
            // Rakenne.Nayta mitätöi myös kesken olevan avauksen (versiolaskuri).
            Rakenne.Nayta(esittely, false, 0);
            Rakenne.Nayta(loppu, false, 0);
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
            string luku = n.ToString("#,0", CultureInfo.InvariantCulture).Replace(",", " ");
            return luku + (n == 1 ? " vuosi sitten" : " vuotta sitten");
        }

        void AsetaTauko(bool t)
        {
            tauolla = t;
            PaivitaTauko();
        }

        void PaivitaTauko()
        {
            ((Label)tauko[0]).text = tauolla ? "▶︎" : "⏸";
            tauko.tooltip = tauolla ? "Jatka" : "Tauko";
            kello.EnableInClassList("mk-tauolla", tauolla);
        }

        void VaihdaTauko()
        {
            var auki = LinssiUi.Rekisteri?.Auki;
            if (tila == Tila.Keksinnot)
            {
                var ajo = LinssiUi.LinssiOlio<KeksinnotLinssi>(auki)?.Ajo;
                if (ajo == null) { AsetaTauko(!tauolla); return; }
                if (ajo.ValinaytosAuki) { JatkaValinaytoksesta(); return; }
                if (ajo.Kaynnissa) ajo.Tauko(); else ajo.Jatka();
            }
            else if (tila == Tila.Ihminen)
            {
                var e = LinssiUi.LinssiOlio<IhmisenMatkaLinssi>(auki)?.Esitys;
                if (e == null) { AsetaTauko(!tauolla); return; }
                if (e.Kaynnissa) e.Tauko(); else e.Jatka();
                AsetaTauko(!e.Kaynnissa);
            }
        }

        void Selaa(int suunta)
        {
            var auki = LinssiUi.Rekisteri?.Auki;
            if (tila == Tila.Keksinnot)
            {
                var ajo = LinssiUi.LinssiOlio<KeksinnotLinssi>(auki)?.Ajo;
                if (ajo == null) return;
                valinaytos.style.display = DisplayStyle.None;
                ajo.Siirry(Mathf.Max(0, pysakki + suunta));
            }
            else if (tila == Tila.Ihminen && ihminen != null)
            {
                var e = LinssiUi.LinssiOlio<IhmisenMatkaLinssi>(auki)?.Esitys;
                if (e == null) return;
                int i = Mathf.Clamp(e.I + suunta, 0, ihminen.Kertomus.Count - 1);
                e.Valitse(ihminen.Kertomus[i].Id);
                AsetaTauko(false);
            }
        }

        // --- keksinnöt -------------------------------------------------------------------

        void NaytaEsittely()
        {
            eOtsikko.text = keksinnot?.EsittelyOtsikko ?? keksinnot?.Otsikko ?? "Keksinnöt";
            eTeksti.text = keksinnot?.EsittelyTeksti ?? "";
            Rakenne.Nayta(esittely, true, 250);
        }

        void Kaynnista()
        {
            Rakenne.Nayta(esittely, false, 250);
            var l = LinssiUi.LinssiOlio<KeksinnotLinssi>(LinssiUi.Rekisteri?.Auki);
            l?.Kaynnista();
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
            var l = LinssiUi.LinssiOlio<KeksinnotLinssi>(LinssiUi.Rekisteri?.Auki);
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

        /// <summary>Testikomento: ihmisen matkan osat ilman linssiä (musta|valot|jakso i|kuva i|loppu).</summary>
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
