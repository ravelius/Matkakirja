// UI-NÄKYMÄT: natiivin käyttöliittymän kokoaja (Natiivi-UI, erä 1).
//
// Rakentaa yläpalkin (tilarivi, ratas, hampurilainen), pudotuspaneelit,
// vahvistusdialogin, matkavalinnan, kaupunkikortin ja kysymysnäkymän
// UiKerroksen paneeleihin ja kytkee ne
// Pelikoodarin näkymätehtaaseen (PeliNakymat, BeforeSceneLoad), joten
// PeliOhjain käyttää näitä UGUI-varanäkymien sijaan. Näkymät ovat olemassa
// myös ilman pelisilmukkaa (peli pois -tila, 3D-mittaukset).
//
// Pelin teot vain PeliOhjaimen julkisen API:n kautta (RAJAPINTA.md):
// "uusi peli" → PeliOhjain.Instanssi.UusiPeli(null).
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class UiNakymat
    {
        static UiNakymat instanssi;

        /// <summary>Sisältöpaketin versio valikon alariville (PeliOhjain tai Sisalto voi asettaa).</summary>
        public static string SisaltoVersio;

        public readonly UiKerros Kerros;
        public readonly Ylapalkki Tilarivi;
        public readonly Matkavalinta Matkavalinta;
        public readonly Vahvistus Vahvistus;
        public readonly Paavalikko Valikko;
        public readonly Aanentasot Aanentasot;
        public readonly Matkalaukku Matkalaukku;
        public readonly KaupunkiKortti Kaupunkikortti;
        public readonly KysymysNakyma Kysymys;
        public readonly Karttaselite Karttaselite;
        public readonly OfflineTilaUi OfflineTila;
        public readonly Kartuscha Kartuscha;
        public readonly Pulu Pulu;
        public readonly Matkakirjakortti Matkakirja;
        public readonly Saapumisesitys Saapuminen;
        public readonly PuluChat Chat;
        public readonly Saapumistraileri Traileri;
        public readonly Tietoja Tietoja;
        /// <summary>"Kerro mitä huomasit": ehdotus, kuvavinkki ja pro (webin naytaPalauteKulmasta).</summary>
        public readonly PalauteIkkuna Palaute;
        public readonly LinssiUi Linssit;
        public readonly Aloitusnakyma Aloitus;
        public readonly Huipennus Huipennus;
        public readonly Nostokortti Nostokortti;
        public readonly Lehtinakyma Lehti;
        public readonly Paljastus Paljastus;
        public readonly SahkeNakyma Sahke;
        /// <summary>Pöllön sähketehtävä (sähkösanomalomake, PeliNakymat.Sahketehtava).</summary>
        public readonly SahketehtavaNakyma Sahkelomake;
        public readonly Julistegalleria Julistegalleria;
        public readonly Nahtavyysarkki Nahtavyydet;
        public readonly Nahtavyysnakyma Nahtavyysnakyma;
        public readonly PieniLiike Liike;
        public readonly Noppa Noppa;
        public readonly Leima Leima;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void KytkeTehdas()
        {
            PeliNakymat.Tilarivi = _ => Hae().Tilarivi;
            PeliNakymat.MatkaValinta = _ => Hae().Matkavalinta;
            PeliNakymat.KaupunkiKortti = _ => Hae().Kaupunkikortti;
            PeliNakymat.Saapumistraileri = (kaupunki, url, valmis) => Hae().Traileri.NaytaPelista(kaupunki, url, valmis);
            PeliNakymat.Kysymys = _ => Hae().Kysymys;
            // Sähkelinja (B5): pöllön liuska ja valikon retkikunta. Asettamattomana linjaa ei avata.
            PeliNakymat.Sahke = _ => Hae().Sahke;
            // Pöllön sähketehtävä: vihreä piste sähkekaupungissa avaa lomakkeen laattakysymyksen sijaan.
            PeliNakymat.Sahketehtava = _ => Hae().Sahkelomake;
            // Sähkehakemisto maalle (web sisaltohakemisto) ja Livian linkki kartan kohteeseen (web kohdeavaus).
            PeliOhjain.SahkeHakemisto = SahkeHakemistot.Hae;
            PeliOhjain.AvaaKohde = (maa, kohde) =>
            {
                if (string.IsNullOrEmpty(maa) || string.IsNullOrEmpty(kohde)) return false;
                Hae().Nostokortti.Avaa("kohde:" + kohde + "@" + maa.ToUpperInvariant());
                return true;
            };
            // Näkyvä noppa (B16/P45): liike odottaa valmis()-kutsua (Pelikoodarin koukku, varareitti 4 s).
            PeliNakymat.Noppa = (arvo, lat, lon, valmis) => UiKerros.PaaSaikeessa(() => Hae().HeitaNoppa(arvo, lat, lon, valmis));
            // Natiivilehti (B1): WKWebView-kuori jää käyttämättä.
            PeliNakymat.Lehti = _ => Hae().Lehti;
            // Aloitusnäkymä: silmukka odottaa tilassa Aloitus (Jatka / Uusi matka).
            PeliOhjain.AloitusNakyma = true;
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista() => Hae();

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() => instanssi = null; // editorin Enter Play Mode ilman domain reloadia

        public static bool Olemassa => instanssi != null;

        public static UiNakymat Hae() => instanssi ??= new UiNakymat(UiKerros.Hae());

        UiNakymat(UiKerros kerros)
        {
            instanssi = this;
            Kerros = kerros;
            Tilarivi = new Ylapalkki(kerros);
            Matkavalinta = new Matkavalinta(kerros);
            Vahvistus = new Vahvistus(kerros);
            Valikko = new Paavalikko(kerros, () => Tilarivi.Alareuna, Vahvistus);
            Aanentasot = new Aanentasot(kerros, () => Tilarivi.Alareuna);
            Matkalaukku = new Matkalaukku(kerros, () => Tilarivi.Alareuna, () => Tilarivi.Pilleri);
            Tilarivi.PudotusAuki = () => Valikko.Auki || Aanentasot.Auki || Matkalaukku.Auki;
            Kaupunkikortti = new KaupunkiKortti(kerros);
            Kysymys = new KysymysNakyma(kerros);
            Kartuscha = new Kartuscha(kerros);
            Karttaselite = new Karttaselite(kerros);
            OfflineTila = new OfflineTilaUi(kerros, Tilarivi, () => { Valikko.Sulje(); Aanentasot.Avaa(); });
            Matkakirja = new Matkakirjakortti(kerros);
            Pulu = Natiivi.Pulu.Hae();
            Saapuminen = new Saapumisesitys(Matkakirja, Pulu);
            Chat = new PuluChat(kerros, Pulu);
            Traileri = new Saapumistraileri(kerros);
            Pulu.Napautus += Chat.Vaihda;
            // Livia lennähtää paikalle, kun käyttöliittymä on valmis (webin ensisaapuminen: handoff).
            kerros.Juuri(UiKerros.Tilarivi).schedule.Execute(() => Pulu.Tilanne("arrival")).StartingIn(1500);
            Tietoja = new Tietoja(kerros);
            Palaute = new PalauteIkkuna(kerros); // hampurilaisen "ehdota sisältöä"
            Valikko.MitaUutta.TarkistaPaivitys(); // web: "Peli päivittyi", kun laitteella oli aiempi versio
            Aloitus = new Aloitusnakyma(kerros);
            Huipennus = new Huipennus(kerros);
            Nostokortti = new Nostokortti(kerros);
            Lehti = new Lehtinakyma(kerros);
            Nahtavyysnakyma = new Nahtavyysnakyma(kerros); // kaupunkikortin "Nähtävyydet"
            Nahtavyydet = new Nahtavyysarkki(kerros); // lehden ja nähtävyysnäkymän päälle (sama kerros, myöhemmin)
            Liike = new PieniLiike(kerros); // kerros 10: pallon päällä, muun UI:n alla
            Noppa = new Noppa(kerros.Juuri(PieniLiike.Kerros)); // web die-layer karttaruudussa, UI:n alla
            Leima = new Leima(kerros); // tapahtumakuplat (rahan muutokset)
            // Lehti aukeaa kaiken päälle: auki jääneet valikot ja popupit kiinni.
            // B7-soitin: lehti hiljentää äänimaiseman myös testiavauksessa (tuplakutsu ohjaimen kanssa on harmiton).
            Lehti.Avautui += _ => Aanisoitin.Hiljennys("lehti", true);
            Lehti.Suljettu += _ => Aanisoitin.Hiljennys("lehti", false);
            // Pulun puhekanavan reunat soittimelle (soitin suodattaa toistot).
            kerros.JokaRuutu += () => Aanisoitin.PuluPuhuu(Aanet.PuluPuhuu);
            Lehti.Avautui += _ => { Valikko.Sulje(); Aanentasot.Sulje(); Matkalaukku.Sulje(); Vahvistus.Sulje(); Julistegalleria.Sulje(); Minipopup.SuljeAuki(); };
            Paljastus = new Paljastus(kerros);
            // Löytö päätyy matkalaukkuun: laukku heilahtaa paljastuksen sulkeutuessa (web elavoitaLaukku).
            Paljastus.Suljettiin += aarre => { if (aarre) Tilarivi.ElavoitaLaukku(); };
            Sahke = new SahkeNakyma(kerros, Valikko);
            Sahkelomake = new SahketehtavaNakyma(kerros); // pelidialogien kerros (30), pulun kuplat päällä
            Julistegalleria = new Julistegalleria(kerros); // laukun päälle (sama kerros, myöhemmin)
            // Karttavalon napautus (Natiiviseppä: AiheValot → KarttaValotSilta) → nostokortti;
            // linssin aikana ei (web linssiEstaa).
            UiPalvelut.ValoNapautettu += id => UiKerros.PaaSaikeessa(() =>
            {
                if (LinssiUi.Rekisteri?.Auki != null || Aloitus.Auki) return;
                Nostokortti.Avaa(id);
            });
            // Linssit (valitsin, peite, selite, astronautti, vertailu, aikajanat): kartuschan ja selitteen jälkeen.
            Linssit = new LinssiUi(kerros, this);
            Valikko.TietojaPainettu += Tietoja.Avaa;
            Valikko.EhdotaPainettu += () => Palaute.Avaa();
            Tilarivi.LogoPainettu += () => { Valikko.Sulje(); Aanentasot.Sulje(); Matkalaukku.Sulje(); Tietoja.Avaa(); };
            UiSisalto.Lataa(null); // kaupunkidata valmiiksi ennen ensimmäistä napautusta
            Aanet.Alusta(); // tehostekanava, mykistyksen napsahdus ja tehosteiden tiedostot laitteelle

            Tilarivi.Valikko.clicked += () => { Aanentasot.Sulje(); Matkalaukku.Sulje(); Valikko.Vaihda(); };
            Tilarivi.Ratas.clicked += () => { Valikko.Sulje(); Matkalaukku.Sulje(); Aanentasot.Vaihda(); };
            Tilarivi.PilleriPainettu += () => { Valikko.Sulje(); Aanentasot.Sulje(); Matkalaukku.Vaihda(); };
            Valikko.AukiMuuttui += auki => Tilarivi.Valikko.EnableInClassList("mk-valittu", auki);
            Aanentasot.AukiMuuttui += auki => Tilarivi.Ratas.EnableInClassList("mk-valittu", auki);
            Valikko.UusiPeli += () =>
            {
                var o = PeliOhjain.Instanssi;
                if (o != null) o.UusiPeli(null);
                else Tilarivi.Viesti("Peli ei ole vielä käynnissä");
            };

            // Pallo ei lue elettä, joka alkaa UI:n päältä (kaikki kerrokset, myös ei-modaaliset napit).
            SyoteLukko.LisaaPeitto(UiKerros.Peittaa);
            // Pelisilmukka pois (3D-mittaukset) = koko UI pois. PeliOhjain syntyy samassa
            // AfterSceneLoad-vaiheessa, joten kytkentä odottaa sen ilmestymistä.
            kerros.Juuri(UiKerros.Tilarivi).schedule.Execute(KytkeOhjain).Every(250).Until(() => ohjainKytketty);
        }

        bool ohjainKytketty;
        MatkanYhteenveto odottavaHuipennus;

        void KytkeOhjain()
        {
            var o = PeliOhjain.Instanssi;
            if (o == null || ohjainKytketty) return;
            ohjainKytketty = true;
            o.KaytossaMuuttui += paalla =>
            {
                if (!paalla) SuljeKaikki();
                Kerros.Nayta(paalla);
                KorvaaNimikortti(paalla);
                Pulu.Nayta(paalla);
            };
            if (!o.Kaytossa) Kerros.Nayta(false);
            KorvaaNimikortti(o.Kaytossa);
            Saapuminen.Kytke(o);
            // Pelin tilanteet puluun (webin ilmoitaLivianTilanne; Pelikoodarin tapahtuma).
            o.LivianTilanne += (laji, tunne, v) =>
            {
                if (laji == "tunne") Pulu.Tunne(tunne, v);
                else Pulu.Tilanne(laji, null, tunne, v);
            };
            // Aloitus ja matkan huipennus (Pelikoodarin tapahtumat); tila voi olla jo Aloitus.
            o.AloitusTarjolla += () => UiKerros.PaaSaikeessa(() => NaytaAloitus(o));
            // Aloituskaava: avausteksti häipyy, kun aloituslento on perillä (Pelikoodarin PeliOhjain.Aloitus).
            o.AloituslentoPaattyi += _ => UiKerros.PaaSaikeessa(Aloitus.AloituslentoPaattyi);
            if (o.Tila == SilmukanTila.Aloitus) NaytaAloitus(o);
            // Rahan muutos kupliksi (web buildToast kind stamp, "+10 puntaa · Lehden minitehtävä ratkesi").
            o.RahaMuuttui += (muutos, syy, _) => UiKerros.PaaSaikeessa(() => Leima.Raha(muutos, syy));
            // Noppa häipyy, kun nappula on perillä (web haivyta saapuessa).
            o.MatkaPerilla += _ => UiKerros.PaaSaikeessa(() => Noppa.Haivyta());
            // Livian sähkekuplat (johdanto, odotus, vinkki, linkin saate, oikein, paluu) puluun.
            o.LivianKuplat += (kaupunki, kentta, kuplat) => Sahkelomake.LivianKuplat(kaupunki, kentta, kuplat);
            // Sähkehakemisto valmiiksi, kun saavutaan sähkekaupunkiin (lehtien jäsennys ennen pisteen napautusta).
            o.MatkaPerilla += kaupunki => UiKerros.PaaSaikeessa(() => EsilataaSahkehakemisto(kaupunki));
            EsilataaSahkehakemisto(o.PelaajanKaupunki);
            // Huipennus vasta, kun viimeisen aarteen kysymys (ja sen paljastus) on suljettu: tapahtuma
            // tulee löytöhetkellä, ennen paljastusta, eikä huipennus saa jäädä paljastuksen alle.
            // Web: voittoikkuna aukeaa → sfx.play('win').
            o.KaikkiAarteetLoytyi += yv => UiKerros.PaaSaikeessa(() =>
            {
                if (!Kysymys.Auki && !Paljastus.Auki) { Aanet.Tehoste("win"); Huipennus.Nayta(yv, () => UusiMatka(o)); return; }
                odottavaHuipennus = yv;
            });
            Kysymys.Piilotettu += () =>
            {
                var yv = odottavaHuipennus;
                odottavaHuipennus = null;
                if (yv != null) { Aanet.Tehoste("win"); Huipennus.Nayta(yv, () => UusiMatka(o)); }
            };
            // Pelin tehosteet (webin sfx.play-tunnukset) ja lennon moottoriääni (startFlight/stopFlight),
            // B7 §1.8: siivut UI:n äänimoottorilla.
            o.Aani += tunnus => UiKerros.PaaSaikeessa(() => Aanet.Tehoste(tunnus));
            o.LentoAani += (alkaa, kesto) => UiKerros.PaaSaikeessa(() => Aanet.LentoAani(alkaa, kesto));
            // Lehti (WKWebView) aukeaa kaiken päälle: auki jääneet valikot kiinni.
            if (o.Lehti != null) o.Lehti.Avautui += _ => { Valikko.Sulje(); Aanentasot.Sulje(); Matkalaukku.Sulje(); Vahvistus.Sulje(); };
        }

        static void EsilataaSahkehakemisto(string kaupunki)
        {
            if (kaupunki == null) return;
            Fokusvirrat.Lataa(() =>
            {
                var t = Fokusvirrat.Hae(kaupunki)?.Sahketehtava;
                if (t != null) SahkeHakemistot.Lataa(t.HakemistoMaa ?? UiSisalto.Kaupunki(kaupunki)?.Maa, null);
            });
        }

        void NaytaAloitus(PeliOhjain o)
        {
            if (Aloitus.Auki) return;
            SuljeKaikki();
            Aloitus.Nayta(id => Aloita(o, id), o.Lahtokaupungit(), o.TallennusOn ? () => { var v = o.Jatka(); if (v != null) Tilarivi.Viesti(v); } : (System.Action)null);
        }

        void UusiMatka(PeliOhjain o)
        {
            SuljeKaikki();
            Aloitus.NaytaAvaus(id => Aloita(o, id), o.Lahtokaupungit());
        }

        void Aloita(PeliOhjain o, string id)
        {
            var virhe = o.UusiMatka(id);
            if (virhe != null) { Debug.LogWarning("MATKAKIRJA ui aloitus: " + virhe); Tilarivi.Viesti(virhe); }
        }

        KaupunkiMerkit merkit;
        NimiKortti nimikortti3d;

        /// <summary>
        /// Pelin aikana kaupunkikortti korvaa 3D:n nimikortin (RAJAPINTA: KaupunkiMerkit.kortti = null);
        /// peli pois (3D-mittaukset) palauttaa sen.
        /// </summary>
        void KorvaaNimikortti(bool peliPaalla)
        {
            if (merkit == null) merkit = Object.FindAnyObjectByType<KaupunkiMerkit>();
            if (merkit == null) return;
            if (peliPaalla)
            {
                if (merkit.kortti != null) { nimikortti3d = merkit.kortti; nimikortti3d.Piilota(); }
                merkit.kortti = null;
            }
            else if (nimikortti3d != null) merkit.kortti = nimikortti3d;
        }

        public void SuljeKaikki()
        {
            odottavaHuipennus = null; // uusi matka tai UI pois: odottanut huipennus ei enää kuulu tähän hetkeen
            Valikko.Sulje();
            Aanentasot.Sulje();
            Matkalaukku.Sulje();
            Huipennus.Sulje();
            // Aloitus (kerros 45) jäi muuten kaiken päälle: ui sulje ja pelin tilanvaihdot sulkevat sen.
            Aloitus.Piilota();
            Nostokortti.Sulje();
            Nahtavyydet.SuljeKokonaan();
            Nahtavyysnakyma.Sulje();
            Lehti.Sulje();
            Paljastus.Sulje();
            Julistegalleria.Sulje();
            Minipopup.SuljeAuki();
            Pikkuseloste.Sulje();
            Vahvistus.Sulje();
            Matkavalinta.Piilota();
            Matkavalinta.PiilotaHeitto();
            Kaupunkikortti.Piilota();
            Kysymys.Piilota();
            Sahkelomake.Sulje();
            Karttaselite.Sulje();
            Karttaselite.Maakunnat.SuljeKortti();
            Kartuscha.Sulje();
            Tietoja.Sulje();
            Palaute.Sulje();
            Linssit.SuljeValikot();
            Chat.Sulje();
        }

        PalloKierto kierto;

        /// <summary>
        /// Web ui.animateDie: noppa lähtee pelaajan paikasta ruudulla (nappula 5000 m korkeudella) ja
        /// pomppii lepopaikkaan (web decor.dieSpot, oikea alaneljännes, pieni satunnaisheitto).
        /// Pallon takapuolelta tai ruudun ulkopuolelta noppa lähtee lepopaikasta.
        /// </summary>
        public void HeitaNoppa(int arvo, double lat, double lon, System.Action valmis)
        {
            var juuri = Kerros.Juuri(PieniLiike.Kerros);
            float w = juuri.resolvedStyle.width, h = juuri.resolvedStyle.height;
            if (float.IsNaN(w) || w <= 0 || juuri.panel == null) { valmis?.Invoke(); return; }
            var arpa = new System.Random();
            var loppu = new Vector2(w * (0.8f + (float)(arpa.NextDouble() - 0.5) * 0.06f), h * (0.74f + (float)(arpa.NextDouble() - 0.5) * 0.05f));
            var alku = loppu;
            kierto ??= UnityEngine.Object.FindAnyObjectByType<PalloKierto>();
            if (kierto != null && kierto.RuutuPiste(lat, lon, out var ruutu, 5000))
                alku = UnityEngine.UIElements.RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            // Web animateDie: onTick → dieTick (pyörintä), onLand → dieLand (ensimmäinen osuma; ohjain ei
            // soita sitä näkyvän nopan kanssa, Pelikoodari b32be57), onBounce → clack (pomppu).
            Noppa.Heita(arvo, alku, loppu, valmis, vahennettyLiike: LinssiUi.VahennettyLiike(),
                laskeutui: () => Aanet.Tehoste(Aanitunnukset.Noppa),
                pomppu: () => Aanet.Tehoste("clack"), kohina: () => Aanet.Tehoste("dieTick"));
        }

        /// <summary>Testikomento 'ui matka': esimerkkivalinta ilman peliä.</summary>
        public void Esimerkkimatka()
        {
            Matkavalinta.Nayta("Lontoo", "300 £ · päivä 1 · aamu", new[]
            {
                ("Bussi", "50 £ · perillä heti, aika ei kulu"),
                ("Lento", "300 £ · perillä, vie vuoron"),
                ("Liftaus", "ilmainen · noppa · 4 askelta perille"),
                ("Laiva", "100 £ · noppa · 6 askelta perille"),
            }, i => { Matkavalinta.Piilota(); Tilarivi.Viesti("Valittu: " + i); }, () => Tilarivi.Viesti("Peruttu"));
        }

        /// <summary>Testikomento 'ui kysymys [laji]': esimerkkikysymys ilman peliä (KysymysEsimerkki).</summary>
        public string Esimerkkikysymys(string laji) => KysymysEsimerkki.Nayta(Kysymys, laji, s => Tilarivi.Viesti(s));
    }
}
