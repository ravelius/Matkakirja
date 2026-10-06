// ASTRONAUTIN KAMERAN UI (Natiivi-UI): AstronauttiKerroksen koukut.
//
//   AvausKasittelija   webin luoPaljastus (js/linssit/satelliitti-avaruus.js):
//                      musta ruutu, jonka keskellä pelin oma otsikkokortti
//                      "ASTRONAUTIN KAMERA", 3,2 rem:n viiva ja "kuvat: NASA"
//                      (NASAn tunnusta ei käytetä). Vaiheet: Musta → OtsikkoPois
//                      (otsikko häipyy 700 ms) → MustaPois (musta häipyy 1100 ms,
//                      kosketukset läpi) → Pois. Musta ottaa kosketukset, jottei
//                      näkymätöntä palloa pyöritetä; linssin ✕ on sen päällä.
//   KuvaKasittelija    astronautin valokuva (Kuvanakyma); (null, −1) sulkee.
//   SumuKasittelija    avaruussumu (Avaruussumu): kaksi ajelehtivaa harsoa.
//   KyytiKasittelija   ISS:n kyyti (IssKyytiNakyma): tietorivi, ✕ ja ikkunassa Cupola-kehys; avaruuskävely
//                      (AvaruuskavelyNakyma) kyydin päällä.
//   Taulu              Pulun taulu (PulunTauluNakyma, web #3590): moodit Pulun napautuksesta.
//   CupolaAvaus        Cupolan suora avaus (omistaja 4.10.2026, AstronauttiLinssi.CupolaAvautuu): sama musta ruutu kuin linssin
//                      avauksessa (mk-astroavaus) ja ajattelijoiden nimiruudun tekstit (mk-ajattelija__nimi ja __vuodet, teema
//                      tumma): ISS, lentokorkeus, nopeus sekä linssin päivämäärä ja kellonaika pelaajan vyöhykkeellä; 2 s, sitten
//                      mustan oma häivytys (mk-astroavaus--haipyy). Ei uutta tyyliä.
// Linssin ollessa auki pulu on astronautti (LinssiUi asettaa Pulu.Astronautti).
using System;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class AstronautinNakyma
    {
        /// <summary>Avaruuskävelyn rivi Pulun valikossa (omistaja 4.10.2026 klo 11.44: pois; koodi talteen palautusta varten).</summary>
        public static readonly bool AvaruuskavelyValikossa = false;

        public const int OtsikonHaivytysMs = (int)AstronauttiLinssi.OtsikonHaivytysMs;
        public const int MustanHaivytysMs = (int)AstronauttiLinssi.MustanHaivytysMs;

        readonly VisualElement musta, otsikko;
        public readonly Kuvanakyma Kuva;
        public readonly Avaruussumu Sumu;
        public readonly IssKyytiNakyma Kyyti;
        public readonly AvaruuskavelyNakyma Kavely;
        /// <summary>Pulun taulu (web #3590): linssin moodit, Kysy Pululta ja ilman Pulua Näkymät-nappi.</summary>
        public readonly PulunTauluNakyma Taulu;
        IVisualElementScheduledItem piilotus;
        /// <summary>Cupolan avauksen musta ruutu (ISS ja radan arvot) ja sen ajastukset.</summary>
        readonly VisualElement cupolaMusta;
        readonly Label cupolaKorkeus, cupolaNopeus, cupolaAika;
        IVisualElementScheduledItem cupolaHaivytys, cupolaPiilotus, kirjoitus;
        // ALKUTEKSTI KIRJOITTUEN (omistaja 6.10. 09.0x: "keskellä ruutua ja keskitettynä ... kahdessa osassa ... ihan kuin tietokone
        // kirjoittaisi sen tekstin näytölle"): osa 1 "ISS", tauko, osa 2 radan arvot rivi kerrallaan; kirjain kerrallaan LCD-
        // kirjasimella (VT323) ja vilkkuva kursori. Häivytys (Cupola valmis) keskeyttää ja näyttää loput.
        Label cupolaNimi;
        public const int KirjainMs = 28, OsienValiMs = 350, KursoriMs = 450;
        const string Kursori = "_";
        /// <summary>Musta ruutu näkyy näin kauan ennen häivytystä (omistaja: "feidaa oikeaan näkymään 2sek jälkeen").</summary>
        public const int CupolanMustaMs = 2000;
        /// <summary>
        /// Enimmäisodotus: musta jatkuu 2 s:n yli vain, kunnes Cupolan kehys (IssKyytiNakyma.Kuva2Tila, esiladataan linssin
        /// avautuessa) on valmis ja näkymässä ei ole yhtään lataamatonta laattaa (KarttaKerrokset.LataamattomatLaatat; Päätoimittaja
        /// 4.10.: kriteeri laatat, ei latausprosentti). Laattojen lataus alkaa mustan alussa, koska kamera on jo Cupolan asennossa.
        /// </summary>
        public const int CupolanMustaMaxMs = 4000;
        float cupolaAlku;
        long cupolaTavut;
        static double VerkostaMt(long alku) => (Matkakirja.Laattapalvelin.VerkostaTavuja - alku) / 1048576.0;
        /// <summary>Testi (`ui linssi astro cupolakuvat 1`): ruutukaappaus Documents/cupola-&lt;ms&gt;.png jälkitarkistusten hetkillä
        /// (iPad-todiste ilman tallennetta, Päätoimittaja 4.10.: maasto heti häivytyksen jälkeen).</summary>
        public static bool CupolaKuvat;
        static int cupolaAvauksia;

        public AvauksenVaihe Vaihe { get; private set; } = AvauksenVaihe.Pois;

        /// <summary>Kuvanäkymä auki/kiinni (LinssiUi piilottaa linssin sulkunapin sen ajaksi).</summary>
        public event Action<bool> KuvaAuki;

        public AstronautinNakyma(UiKerros kerros)
        {
            musta = Rakenne.El("mk-astroavaus", kerros.Juuri(LinssiUi.Ylakerros));
            musta.style.display = DisplayStyle.None;
            otsikko = Rakenne.El("mk-astroavaus__otsikko", musta, PickingMode.Ignore);
            Kirjasimet.Aseta(otsikko, Kirjasin.Kone);
            var nimi = Rakenne.Teksti("ASTRONAUTIN KAMERA", "mk-astroavaus__nimi", otsikko);
            Kirjasimet.Aseta(nimi, Kirjasin.KoneLihava);
            Rakenne.El("mk-astroavaus__viiva", otsikko, PickingMode.Ignore);
            Rakenne.Teksti("kuvat: NASA", "mk-astroavaus__lahde", otsikko);

            Kuva = new Kuvanakyma(kerros);
            Kuva.AukiMuuttui += auki => KuvaAuki?.Invoke(auki);
            Sumu = new Avaruussumu(kerros);
            Kyyti = new IssKyytiNakyma(kerros);
            // Kyydin ✕ on linssin sulkunapin paikalla, joten sulkunappi piiloon kuten kuvanäkymässä.
            Kyyti.AukiMuuttui += auki => KuvaAuki?.Invoke(auki);
            // Avaruuskävely (29.9.): paikkamerkit ja vertailukortti kyydin päällä.
            Kavely = new AvaruuskavelyNakyma(kerros);
            Kyyti.AukiMuuttui += Kavely.Kyydissa;
            // Taulu kuvanäkymän ja kyydin päälle (web z-index 50 > kyydin kosketuskerros 48).
            Taulu = new PulunTauluNakyma(kerros, this);
            // Avaruuskävely Pulun taulusta (Päätoimittaja 29.9.): rivi ISS-rivien jälkeen; valinta vie ensin Cupolaan (kuva kiinni,
            // kyytiin; ISS:n rinnalla pois pelistä 2.10.) ja aloittaa kävelyn perillä. Omistaja 4.10.2026 klo 11.44: pois
            // valikosta, koodi jää talteen (AvaruuskavelyValikossa palauttaa rivin).
            if (AvaruuskavelyValikossa)
                Taulu.LisaaRivi("avaruuskavely", "Avaruuskävely", "Ulos kaiteelle katsomaan auringonnousua",
                    () => AstroLinssi()?.Kavely?.Kaynnissa == true, () => { AstroLinssi()?.AloitaKavely(); }, AstroMoodi.Ikkuna);
            // ÄÄNISÄÄTIMET PULUN VALIKKOON (omistaja 6.10. 08.3x: "siirrä tuon äänisäätimet pulun valikon taakse pois tuolta näytön
            // keskivaiheilta"): kehittäjän mikseri avataan taulun Äänet-rivistä; pyöreä säätönappi on astronautin linssissä piilossa.
            Taulu.LisaaRivi("aanet", "Äänet", "Kaiut ja taustaäänet",
                () => false, () => UiNakymat.Hae()?.Linssit?.Mikseri?.Avaa(true),
                nakyy: () => Asetukset.Kehittaja && MikseriPaneeli.Lahde != null);
            // Laite 29.9. kavely1: linssin avauksen automaattitaulu jäi auki kävelyn päälle (kehittäjäkomennolla aloitettu).
            Kavely.Alkoi += () => { if (Taulu.Auki) Taulu.Sulje("avaruuskavely"); };
            // PULU KYYDIN PÄÄLLÄ (web body.satelliitti-kyyti .pollo-nappi z-index 49 > kyydin kerros 48): Cupola-kehys peitti
            // Pulun, joka on taulun avaaja kaikissa moodeissa. Kyydin ajaksi Pulun kerros nousee kehyksen yläpuolelle.
            // Cupolassa (Ikkuna) Pulu on ulkona avaruuskävelyllä ikkunan aukossa (omistaja 29.9.2026), joten kerros pysyy kehyksen
            // alla ja lasi, heijastus ja pölyt piirtyvät sen päälle; Cupolan läpinäkyvät osat päästävät napautuksen Puluun.
            // Omistaja 2.10. 21.3x: robottikäden Pulu on vasemmassa alakulmassa myös Cupolassa, joten kerros kehyksen yläpuolelle
            // (ilman robottikättä, A/B `astro eva robotti pois`, Pulu pysyy ikkunan takana kehyksen alla).
            // Omistaja 3.10. klo 06.5x "Pulun pitäisi olla cupolan ulkopuolella": oikean reunan robottikäden Pulu on Cupolassa taas ikkunan
            // takana (kehys, pultit, teipit ja lasi sen edessä); vasemman alakulman tila (A/B pulu-oikealla 0) pitää 2.10.:n järjestyksen.
            Kyyti.TilaMuuttui += tila => kerros.AsetaJarjestys(Pulu.Kerros,
                tila != KyydinTila.Kauko && (tila != KyydinTila.Ikkuna || (!LiviaKuva.RobottiPois && !IssKyytiNakyma.PuluOikealla))
                    ? LinssiUi.SulkuKerros : Pulu.Kerros);

            // Cupolan suora avaus: musta ruutu kaiken linssin UI:n päälle, myös Pulun (38) ja mikserinapin (39); valikot (40) yllä.
            cupolaMusta = Rakenne.El("mk-astroavaus tk-teema-tumma", kerros.Juuri(MikseriPaneeli.Kerros));
            cupolaMusta.style.display = DisplayStyle.None;
            var lohko = Rakenne.El("mk-ajattelija__teksti mk-ajattelija__nimilohko", cupolaMusta, PickingMode.Ignore);
            lohko.style.opacity = 1f;
            // Keskelle ruutua ja keskitettynä (ei ajattelijan vasen 6 % / 58 %): mustan ruudun flex keskittää.
            lohko.style.position = Position.Relative; lohko.style.left = StyleKeyword.Auto; lohko.style.bottom = StyleKeyword.Auto;
            lohko.style.alignItems = Align.Center;
            cupolaNimi = Rakenne.Teksti("ISS", "mk-ajattelija__nimi", lohko);
            Kirjasimet.Aseta(cupolaNimi, Kirjasin.Lcd);
            cupolaKorkeus = Rakenne.Teksti("", "mk-ajattelija__vuodet", lohko);
            cupolaNopeus = Rakenne.Teksti("", "mk-ajattelija__vuodet", lohko);
            cupolaAika = Rakenne.Teksti("", "mk-ajattelija__vuodet", lohko);
            foreach (var t in new[] { cupolaNimi, cupolaKorkeus, cupolaNopeus, cupolaAika })
            {
                if (t != cupolaNimi) Kirjasimet.Aseta(t, Kirjasin.Lcd);
                t.style.unityTextAlign = TextAnchor.MiddleCenter;
            }
            AstronauttiLinssi.CupolaAvautuu += a => UiKerros.PaaSaikeessa(() => CupolaAvaus(a));

            AstronauttiKerros.AvausKasittelija = Avaus;
            AstronauttiKerros.KuvaKasittelija = (kohde, indeksi) =>
            {
                if (kohde == null) Kuva.Sulje(false);
                else Kuva.Avaa(kohde, indeksi);
            };
            AstronauttiKerros.SumuKasittelija = Sumu.Aseta;
            AstronauttiKerros.KyytiKasittelija = Kyyti.Aseta;
        }

        static AstronauttiLinssi AstroLinssi() => UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi;

        /// <summary>AstronauttiKerros.AvausKasittelija: avauksen vaihe.</summary>
        public void Avaus(AvauksenVaihe vaihe)
        {
            Vaihe = vaihe;
            piilotus?.Pause();
            switch (vaihe)
            {
                case AvauksenVaihe.Musta:
                    musta.RemoveFromClassList("mk-astroavaus--haipyy");
                    otsikko.RemoveFromClassList("mk-astroavaus__otsikko--haipyy");
                    musta.style.opacity = 1f;
                    otsikko.style.opacity = 1f;
                    musta.pickingMode = PickingMode.Position;
                    musta.style.display = DisplayStyle.Flex;
                    break;
                case AvauksenVaihe.OtsikkoPois:
                    musta.style.display = DisplayStyle.Flex;
                    otsikko.AddToClassList("mk-astroavaus__otsikko--haipyy");
                    otsikko.style.opacity = 0f;
                    break;
                case AvauksenVaihe.MustaPois:
                    musta.style.display = DisplayStyle.Flex;
                    otsikko.style.opacity = 0f;
                    musta.pickingMode = PickingMode.Ignore;
                    musta.AddToClassList("mk-astroavaus--haipyy");
                    musta.style.opacity = 0f;
                    // Varmistus, jos Pois-vaihetta ei tule (linssi suljetaan kesken).
                    piilotus = musta.schedule.Execute(() => { if (Vaihe == AvauksenVaihe.MustaPois) musta.style.display = DisplayStyle.None; })
                        .StartingIn(MustanHaivytysMs + 200);
                    break;
                default:
                    musta.pickingMode = PickingMode.Ignore;
                    musta.style.display = DisplayStyle.None;
                    break;
            }
        }

        /// <summary>Cupolan suora avaus: musta ruutu radan arvoilla heti, 2 s:n jälkeen häivytys valmiiseen näkymään.</summary>
        public void CupolaAvaus(AstronauttiLinssi.CupolanAvaus a)
        {
            cupolaHaivytys?.Pause();
            cupolaPiilotus?.Pause();
            // Tuhaterotin tavallisena välilyöntinä (simu 6e8576ff: lukukirjaimessa U+00A0 näkyi leveänä aukkona "27  600").
            cupolaKorkeus.text = $"Lentokorkeus {KyydinTeksti.Luku(a.KorkeusKm).Replace('\u00a0', ' ')} km";
            // Sama lähde ja pyöristys kuin ohjaamon tietorivillä (Päätoimittaja 4.10.: musta 27 600 vs. LCD 27 560).
            cupolaNopeus.text = $"Nopeus {KyydinTeksti.Nopeus(a.NopeusKmh).Replace('\u00a0', ' ')} km/h";
            var d = TimeZoneInfo.ConvertTimeFromUtc(DateTime.SpecifyKind(a.Utc, DateTimeKind.Utc), TimeZoneInfo.Local);
            cupolaAika.text = $"{d.Day}.{d.Month}.{d.Year} klo {d.Hour}.{d.Minute:00}";
            Kirjoita();
            cupolaMusta.RemoveFromClassList("mk-astroavaus--haipyy");
            cupolaMusta.style.opacity = 1f;
            cupolaMusta.pickingMode = PickingMode.Position;
            cupolaMusta.style.display = DisplayStyle.Flex;
            cupolaMusta.BringToFront();
            cupolaAlku = Time.realtimeSinceStartup;
            cupolaAvauksia++;
            cupolaTavut = Matkakirja.Laattapalvelin.VerkostaTavuja;
            Ruudunpaivitys.Herata(CupolanMustaMaxMs / 1000f + MustanHaivytysMs / 1000f + 0.5f);
            // Häivytyksen siirtymä luokkana jo ennen häivytystä (sama kehys kuin peiton muutos ei aina käynnistänyt siirtymää).
            cupolaMusta.schedule.Execute(() => cupolaMusta.AddToClassList("mk-astroavaus--haipyy")).StartingIn(100);
            cupolaHaivytys = cupolaMusta.schedule.Execute(() =>
            {
                float ms = (Time.realtimeSinceStartup - cupolaAlku) * 1000f;
                if (ms < CupolanMustaMs) return;
                var pallo = KarttaKerrokset.Instanssi?.pallo;
                bool kehys = IssKyytiNakyma.Kuva2Tila != null || CupolaKerros.Tyyli != CupolaKerros.Tyylit.Kuva;
                float lataus = pallo != null ? pallo.ComputeLoadProgress() : 100f;
                bool karkein = !AstronauttiKerros.KyydinVarakartta || KarttaKerrokset.VarakarttaValmis;
                // Päätoimittaja 4.10.: kriteeri on, ettei näkymässä ole yhtään lataamatonta (harmaata) laattaa, ei latausprosentti.
                var (puuttuu, nakyy) = KarttaKerrokset.Instanssi?.LataamattomatLaatat() ?? (-1, -1);
                // Simu 9b1d4af1: häivytyksessä 0/0 = yhtään laattaa ei vielä piirretty, jolloin näkyy pohjapallon harmaa; valmis vasta,
                // kun näkymässä on laattoja ja niistä yhdeltäkään ei puutu rasteria. Mittari ei käytettävissä (< 0: ei palloa tai
                // kameraa, savuke 1137) → ei odoteta 4 s:n kattoon, häivytys 2 s:n jälkeen ja syy lokiin.
                // Tarkka taso (Päätoimittaja 4.10.: 0/1 ja lataus 5 % → maasto vasta ~17 s): ei esivanhemman rasteria yhdelläkään
                // näkyvällä laatalla ja pallon lataus ≥ 90 % (valitut laatat ladattu); enintään CupolanMustaMaxMs.
                int karkeat = KarttaKerrokset.Instanssi?.KarkeatLaatat ?? 0;
                bool laatat = puuttuu < 0 || (nakyy > 0 && puuttuu == 0 && karkeat == 0 && lataus >= 90f);
                if (ms < CupolanMustaMaxMs && (!kehys || !karkein || !laatat)) return;
                cupolaHaivytys.Pause();
                KirjoitaLoppuun();
                Debug.Log($"MATKAKIRJA linssit: cupolan musta häivyy {ms:0} ms (kehys {(kehys ? "valmis" : "kesken")}, karkein taso {(karkein ? "valmis" : "kesken")}, lataamattomia laattoja {puuttuu}/{nakyy}, karkeita {karkeat}, lataus {lataus:0} %)");
                // Jälkitarkistus: lataamattomat laatat 0,5, 1, 2 ja 4 s häivytyksen alusta (todiste, ettei harmaata näy).
                foreach (int jalkeen in new[] { 500, 1000, 2000, 4000 })
                    cupolaMusta.schedule.Execute(() =>
                    {
                        var (p2, n2) = KarttaKerrokset.Instanssi?.LataamattomatLaatat() ?? (-1, -1);
                        var pl = KarttaKerrokset.Instanssi?.pallo;
                        Debug.Log($"MATKAKIRJA linssit: cupolan jälkeen {jalkeen} ms: lataamattomia laattoja {p2}/{n2}, karkeita {KarttaKerrokset.Instanssi?.KarkeatLaatat}, "
                            + $"lataus {(pl != null ? pl.ComputeLoadProgress() : 100f):0} %, verkosta avauksesta {VerkostaMt(cupolaTavut):0.0} Mt"
                            + $" (ennakosta {(CupolaEnnakko.AlkuTavut >= 0 ? VerkostaMt(CupolaEnnakko.AlkuTavut) : 0):0.0} Mt)");
                        if (CupolaKuvat) ScreenCapture.CaptureScreenshot($"cupola-{cupolaAvauksia}-{jalkeen}.png");
                    }).StartingIn(jalkeen);
                cupolaMusta.pickingMode = PickingMode.Ignore;
                cupolaMusta.style.opacity = 0f;
                cupolaPiilotus = cupolaMusta.schedule.Execute(() => CupolaPois()).StartingIn(MustanHaivytysMs + 100);
            }).Every(100);
        }

        Label[] kirjoitusRivit;
        string[] kirjoitusTekstit;

        /// <summary>Alkuteksti kirjain kerrallaan: osa 1 (ISS), tauko, osa 2 (kolme riviä); kursori kirjoittavan rivin perässä.</summary>
        void Kirjoita()
        {
            kirjoitus?.Pause();
            kirjoitusRivit = new[] { cupolaNimi, cupolaKorkeus, cupolaNopeus, cupolaAika };
            kirjoitusTekstit = new string[kirjoitusRivit.Length];
            for (int i = 0; i < kirjoitusRivit.Length; i++) { kirjoitusTekstit[i] = kirjoitusRivit[i].text; kirjoitusRivit[i].text = Osittain(kirjoitusTekstit[i], 0, false); }
            // Rivit varaavat tilansa heti (ei hyppelyä): näkymätön loppuosa alfalla 0.
            int rivi = 0, merkki = 0;
            float tauko = 0f, kursoriAika = 0f;
            float edellinen = Time.realtimeSinceStartup;
            kirjoitus = cupolaMusta.schedule.Execute(() =>
            {
                float nyt = Time.realtimeSinceStartup, dt = (nyt - edellinen) * 1000f;
                edellinen = nyt;
                kursoriAika += dt;
                bool kursori = (int)(kursoriAika / KursoriMs) % 2 == 0;
                if (rivi >= kirjoitusRivit.Length)
                {
                    // Valmis: kursori vilkkuu viimeisen rivin perässä, kunnes musta häivytetään.
                    var v = kirjoitusRivit[kirjoitusRivit.Length - 1];
                    v.text = kirjoitusTekstit[kirjoitusRivit.Length - 1] + (kursori ? Kursori : "<alpha=#00>" + Kursori + "</alpha>");
                    return;
                }
                if (tauko > 0f) { tauko -= dt; kirjoitusRivit[rivi].text = Osittain(kirjoitusTekstit[rivi], merkki, kursori); return; }
                merkki = Mathf.Min(kirjoitusTekstit[rivi].Length, merkki + Mathf.Max(1, Mathf.RoundToInt(dt / KirjainMs)));
                kirjoitusRivit[rivi].text = Osittain(kirjoitusTekstit[rivi], merkki, true);
                if (merkki < kirjoitusTekstit[rivi].Length) return;
                kirjoitusRivit[rivi].text = kirjoitusTekstit[rivi];
                rivi++; merkki = 0;
                if (rivi == 1) tauko = OsienValiMs;   // kaksi osaa: nimi, sitten radan arvot
            }).Every(KirjainMs);
        }

        /// <summary>
        /// Keskitetty rivi ei liiku kirjoitettaessa: kirjoittamaton loppu läpinäkyvänä (rich text), kursori seuraavan merkin paikalla.
        /// </summary>
        static string Osittain(string koko, int n, bool kursori)
        {
            if (n >= koko.Length) return koko;
            string loppu = koko.Substring(n + 1);
            return koko.Substring(0, n) + (kursori ? Kursori : "<alpha=#00>" + koko[n] + "</alpha>") + (loppu.Length > 0 ? "<alpha=#00>" + loppu + "</alpha>" : "");
        }

        /// <summary>Häivytys alkaa: loput tekstit kerralla, ei kursoria.</summary>
        void KirjoitaLoppuun()
        {
            kirjoitus?.Pause();
            if (kirjoitusRivit == null) return;
            for (int i = 0; i < kirjoitusRivit.Length; i++) kirjoitusRivit[i].text = kirjoitusTekstit[i];
        }

        void CupolaPois()
        {
            KirjoitaLoppuun();
            cupolaHaivytys?.Pause();
            cupolaPiilotus?.Pause();
            cupolaMusta.pickingMode = PickingMode.Ignore;
            cupolaMusta.style.display = DisplayStyle.None;
        }

        /// <summary>Cupolan mustan ruudun tila testeille.</summary>
        public string CupolanMustaTila() => cupolaMusta.style.display == DisplayStyle.None ? "piilossa"
            : $"näkyy (peitto {cupolaMusta.resolvedStyle.opacity:0.00}): ISS · {cupolaKorkeus.text} · {cupolaNopeus.text} · {cupolaAika.text}";

        /// <summary>Linssi vaihtui: muu kuin astronautti siivoaa jäljet (koukut eivät ehkä ehtineet).</summary>
        public void Vaihtui(bool astronauttiAuki)
        {
            Taulu.LinssiVaihtui(astronauttiAuki);
            if (astronauttiAuki) { Kyyti.Esilataa(); return; }
            if (Vaihe != AvauksenVaihe.Pois) Avaus(AvauksenVaihe.Pois);
            CupolaPois();
            Sumu.Aseta(0);
            Kuva.Sulje(false);
            Kyyti.Pois();
            Kavely.Kyydissa(false);
        }

        // --- testit ----------------------------------------------------------------------

        /// <summary>Testikomento: koko avaus oikeassa ajassa (musta 2 s, sitten häivytykset).</summary>
        public void TestaaAvaus()
        {
            Avaus(AvauksenVaihe.Musta);
            musta.schedule.Execute(() => Avaus(AvauksenVaihe.OtsikkoPois)).StartingIn(2000);
            musta.schedule.Execute(() => Avaus(AvauksenVaihe.MustaPois)).StartingIn(2000 + OtsikonHaivytysMs);
            musta.schedule.Execute(() => Avaus(AvauksenVaihe.Pois)).StartingIn(2000 + OtsikonHaivytysMs + MustanHaivytysMs + 50);
        }
    }
}
