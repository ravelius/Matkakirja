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
using System.Collections.Generic;
using System.Linq;
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
        /// <summary>Kaupungin avauskortti (web v2296 avaaAvauskortti): kaupungin napautus avaa tämän.</summary>
        public readonly Avauskortti Kaupunkikortti;
        /// <summary>Vanha kaupunkiliuska (web KAUPUNKILIUSKA = false): vain testikomennolle ui kaupunki.</summary>
        public readonly KaupunkiKortti Liuska;
        /// <summary>Avauskortin kutsuminiatyyri pelaajan kaupungin vieressä (web kaupunkikortin-kutsu).</summary>
        public readonly Kutsuminiatyyri Kutsu;
        public readonly KysymysNakyma Kysymys;
        public readonly Karttaselite Karttaselite;
        public readonly OfflineTilaUi OfflineTila;
        public readonly Kartuscha Kartuscha;
        /// <summary>Elävä kartta: heränneiden maakuntien käsialanimet kartalla (kartussin maa).</summary>
        public readonly MaakuntanimetKartalla MaakuntaNimet;
        /// <summary>Nostomerkit kartalla (Natiivisepän NostoKerros → merkit, nimiöt, napautus).</summary>
        public readonly NostotKartalla Nostot;
        public readonly Pulu Pulu;
        public readonly Matkakirjakortti Matkakirja;
        public readonly Saapumisesitys Saapuminen;
        public readonly PuluChat Chat;
        public readonly Saapumistraileri Traileri;
        /// <summary>Saapumisen välikortti aloituslennon jälkeen (Traileri-kerroksen päällimmäinen).</summary>
        public readonly Saapumiskortti Saapumiskortti;
        public readonly Tietoja Tietoja;
        /// <summary>"Kerro mitä huomasit": ehdotus, kuvavinkki ja pro (webin naytaPalauteKulmasta).</summary>
        public readonly PalauteIkkuna Palaute;
        public readonly LinssiUi Linssit;
        public readonly Aloitusnakyma Aloitus;
        public readonly Huipennus Huipennus;
        public readonly Nostokortti Nostokortti;
        public readonly Lehtinakyma Lehti;
        /// <summary>Lue lisää -artikkeli (web #wiki-dialog): lehden ja nähtävyysarkin päällä.</summary>
        public readonly WikiIkkuna Wiki;
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
            PeliNakymat.Saapumiskortti = (rivi, arkkiTaynna, valmis) =>
            {
                var ui = Hae();
                // Aloituslento perillä (tai ohitettu): Ohita-nappi ja lennon kaistale pois, yläpalkki palaa arkin yllä.
                ui.AloituslentoPerilla();
                ui.Saapumiskortti.Nayta(rivi, arkkiTaynna, valmis);
            };
            PeliNakymat.Kysymys = _ => Hae().Kysymys;
            // Sähkelinja (B5): pöllön liuska ja valikon retkikunta. Asettamattomana linjaa ei avata.
            PeliNakymat.Sahke = _ => Hae().Sahke;
            // Pöllön sähketehtävä: vihreä piste sähkekaupungissa avaa lomakkeen laattakysymyksen sijaan.
            PeliNakymat.Sahketehtava = _ => Hae().Sahkelomake;
            // Testikomento uusi-peli sulkee aloitusnäkymän kuten ui aloita (PeliKomennot).
            PeliNakymat.SuljeAloitus = () => Hae().Aloitus.Piilota();
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

        /// <summary>
        /// Omistaja 24.9.2026, löydös 19 (iPhone ja iPad): kartta kevyesti sumeana aina,
        /// kun isoisän tai pulun kuvia on näkyvillä — luennan kuvasarja (isoisän kuvakupla), kohtaamiskortti,
        /// nostokortti ja pulun kuvakortti. Kameran puoli kuuntelee tätä (miedompi kuin portin verho, liukuen).
        /// </summary>
        public static event System.Action<bool> KuvaSumeaMuuttui;
        public static bool KuvaSumea { get; private set; }

        /// <summary>Testikomento (ui kuvasumea paalle|pois|auto): null = näkymien mukaan.</summary>
        public static bool? PakotaKuvaSumea;

        /// <summary>
        /// Löydös 132: sumennuksen taso (Ei / Kortti / Kokoruutu). Kokoruutu = kuva koko ruudulla: pallo vahvemmin sumeaksi,
        /// ja kun sumennus on täysi, pallo pysähtyy pysäytyskuvaksi (PalloKierto.Pysaytyskuva, PysaytysValmis/PysaytysPoistui).
        /// Runko (Natiiviseppä): Kortti aina kun KuvaSumea; Natiivi-UI lisää Kokoruudun laskennan.
        /// </summary>
        public static event System.Action<KuvaSumennus> KuvaTasoMuuttui;
        public static KuvaSumennus KuvaTaso { get; private set; }

        /// <summary>Testikomento (ui kuvasumea kokoruutu): null = näkymien mukaan.</summary>
        public static KuvaSumennus? PakotaKuvaTaso;

        /// <summary>
        /// ☰-valikon rivit linssien alle (omistaja ja Fable 24.9.2026, löydös 20; kaikki laitteet löydös 65): pelaajan asetukset,
        /// vanhan päävalikon komennot ja kehittäjätilassa viimeisenä Kehittäjä (ei App Store -käännöksessä).
        /// </summary>
        void RakennaPuhelinvalikko()
        {
            var v = Linssit.Valitsin;
            v.Avaaja = Tilarivi.Valikko;
            // Omistaja 24.9.2026 klo 13.3x: rivi 1 äänikytkimet, rivi 2 Uusi peli · Muut · Kehittäjä; Muut avaa oman
            // paneelin (Offline-kartat, Asetukset, Ehdota, Tekijätiedot, Mitä uutta); viivan alla LINSSIT.
            var aanet = v.LisaNappirivi();
            foreach (var (k, ikoni) in new[] { (Kytkin.Kertoja, Ikonit.Kertoja), (Kytkin.Musiikki, Ikonit.Musiikki), (Kytkin.Aanimaisema, Ikonit.Aanimaisema) })
            {
                var kk = k;
                v.LisaKytkin(aanet, Asetukset.Nimi(kk), ikoni, () => Asetukset.Paalla(kk), () => Asetukset.Aseta(kk, !Asetukset.Paalla(kk)));
            }
            var toiminnot = v.LisaNappirivi();
            v.LisaNappi(toiminnot, "Uusi peli", Ikonit.Viiva["paivita"], Valikko.KysyUusiPeli);
            v.LisaMuutNappi(toiminnot, "Muut", Ikonit.Valikko);
#if !MATKAKIRJA_APPSTORE
            v.LisaNappi(toiminnot, "Kehittäjä", Ikonit.Ratas, () => Valikko.AvaaOsa(Paavalikko.Osa.Kehittaja), () => Asetukset.Kehittaja);
#endif
            v.LisaMuuRivi("Offline-kartat", Ikonit.Viiva["taitekartta"], () => Aanentasot.AvaaOsa(Aanentasot.Osa.Offline), () => UiPalvelut.Offline != null);
            v.LisaMuuRivi("Asetukset", Ikonit.Viiva["kaiutin"], () => { Aanentasot.Sulje(); Valikko.AvaaOsa(Paavalikko.Osa.Asetukset); });
            // Löydös 65 (omistaja 25.9.2026): retkikunta yhden napin takana omana paneelinaan.
            v.LisaMuuRivi("Retkikunta", Ikonit.Viiva["kompassi"], () => { Aanentasot.Sulje(); Valikko.AvaaOsa(Paavalikko.Osa.Retkikunta); },
                () => Valikko.RetkikuntaSaatavilla);
            v.LisaMuuRivi("Ehdota sisältöä", Ikonit.Kyna, Valikko.Ehdota);
            v.LisaMuuRivi("Tekijätiedot ja lähteet", Ikonit.Viiva["kirja"], Valikko.Tietoja);
            v.LisaMuuRivi("Mitä uutta", Ikonit.Viiva["tahti"], Valikko.MitaUutta.Avaa);
        }

        /// <summary>
        /// Lennon aikana piilossa (omistaja 24.9.2026, löydös 23; iPad ja iPhone): yläpalkki ja yläkulmien pillerit ja
        /// napit (Tilarivi: laukku, ☰, ⚙, karttanappi, kaupunkipilleri, kartuscha, matkakirja), linssinappi, nostot,
        /// Liiku ja pulu. Näkyvissä vain lento ja luennan tekstipalkki (Traileri-kerros). Häivytys 0,6 s, paluu laskun jälkeen.
        /// </summary>
        public static readonly int[] LennonPiilokerrokset = { UiKerros.Nostot, UiKerros.Tilarivi, UiKerros.Matkavalinta, LinssiUi.Kerros, Natiivi.Pulu.Kerros };
        /// <summary>
        /// Löydökset 81 ja 82 (omistaja 25.9., build 13): aloitusnäytöllä (portti, avaus ja kaupungin valinta) ei
        /// ruskeaa yläpalkkia, logoa eikä ☰-nappia (web: aloitusnäkymässä ei palkkia). Pulu jää: se esittelee valinnan.
        /// </summary>
        static readonly int[] AloituksenPiilokerrokset = { UiKerros.Nostot, UiKerros.Tilarivi, UiKerros.Matkavalinta };
        public bool LentoPiilossa => lentoVaihePiilo || aloituslentoPiilo;
        /// <summary>LennonVaihe Nousu … Lasku (kaikki lennot).</summary>
        bool lentoVaihePiilo;
        /// <summary>
        /// Löydös 83: aloituslennon koko esitys (kameran zoomi ja musta verho ennen nousua, lento) valinnasta
        /// saapumiskorttiin; LennonVaihe alkaa vasta koneen lähtiessä, joten pelkkä vaihe jätti palkin ja pulun näkyviin.
        /// </summary>
        bool aloituslentoPiilo;
        readonly System.Collections.Generic.HashSet<int> piilotetut = new System.Collections.Generic.HashSet<int>();

        public void LentoPiilo(bool piiloon)
        {
            lentoVaihePiilo = piiloon;
            if (!piiloon) aloituslentoPiilo = false;
            PaivitaPiilot();
        }

        void AloituslentoPiilo(bool piiloon)
        {
            aloituslentoPiilo = piiloon;
            Aloitus.NaytaOhita(piiloon);
            PaivitaPiilot();
        }

        void PaivitaPiilot()
        {
            bool lento = LentoPiilossa;
            var ui = UiKerros.Hae();
            foreach (int k in LennonPiilokerrokset)
            {
                bool piiloon = lento || (Aloitusnakyma.AloitusAuki && System.Array.IndexOf(AloituksenPiilokerrokset, k) >= 0);
                if (piiloon == piilotetut.Contains(k)) continue;
                if (piiloon) piilotetut.Add(k); else piilotetut.Remove(k);
                int kk = k;
                var j = ui.Juuri(k);
                // Häivytys USS-luokalla (Matkakirja.uss .mk-lentopiilo: opacity 0,6 s); paluu 0,8 s.
                j.AddToClassList("mk-lentosiirtyma");
                j.EnableInClassList("mk-lentopiilo", piiloon);
                // Häivytyksen jälkeen ei napautuksia (näkymätön ei ota osumia); paluu heti näkyväksi.
                if (piiloon) j.schedule.Execute(() => { if (piilotetut.Contains(kk)) j.style.visibility = UnityEngine.UIElements.Visibility.Hidden; }).StartingIn(650);
                else j.style.visibility = UnityEngine.UIElements.StyleKeyword.Null;
            }
        }

        void PaivitaKuvaSumea()
        {
            // Kaikilla laitteilla (Fable 24.9.: omistajan ohje koski karttaa yleisesti, ei vain iPhonea).
            bool s = PakotaKuvaSumea ?? (Matkakirja.Kuvat.Nakyy || Nostokortti.Auki || Kysymys.Auki || Chat.KuvakorttiAuki
                || Kohdekartan.KortistaAuki);
            // Löydös 132 (Natiivi-UI): Kokoruutu, kun noston kuva on kokoruudulla (löydös 150); muut näkymät Kortti.
            var taso = PakotaKuvaTaso ?? (Nostokortti.KuvaKokoruudulla ? KuvaSumennus.Kokoruutu : s ? KuvaSumennus.Kortti : KuvaSumennus.Ei);
            if (taso != KuvaSumennus.Ei) s = true;
            if (taso != KuvaTaso) { KuvaTaso = taso; KuvaTasoMuuttui?.Invoke(taso); }
            if (s == KuvaSumea) return;
            KuvaSumea = s;
            KuvaSumeaMuuttui?.Invoke(s);
        }

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
            Liuska = new KaupunkiKortti(kerros);
            Kaupunkikortti = new Avauskortti(kerros);
            Kysymys = new KysymysNakyma(kerros);
            Nostot = new NostotKartalla(kerros);
            Kutsu = new Kutsuminiatyyri(kerros); // nostojen merkkien päälle samassa kerroksessa
            Kartuscha = new Kartuscha(kerros);
            Kartuscha.AukiMuuttui += auki => Matkavalinta?.VaistaLiiku(auki);
            MaakuntaNimet = new MaakuntanimetKartalla(kerros, Kartuscha);
            Karttaselite = new Karttaselite(kerros);
            OfflineTila = new OfflineTilaUi(kerros, Tilarivi, () => { Valikko.Sulje(); Aanentasot.Avaa(); });
            Matkakirja = new Matkakirjakortti(kerros);
            OfflineTila.Kortti = Matkakirja;
            Pulu = Natiivi.Pulu.Hae();
            Saapuminen = new Saapumisesitys(Matkakirja, Pulu);
            Chat = new PuluChat(kerros, Pulu);
            Traileri = new Saapumistraileri(kerros);
            KaupunkiMerkit.Kalusteet = KartanKalusteet; // löydös 164
            // Löydös 170: sisältöpaketti vaihtui kesken istunnon (Siirtoseppä) → maakunta- ja nostodata uudesta versiosta.
            PakettiPaivitys.SisaltoVaihtui += (versio, muuttuneet) =>
            {
                MaakuntaTiedot.Hylkaa();
                NostoSisalto.Hylkaa();
                Karttaselite?.Maakunnat?.SisaltoVaihtui();
                Debug.Log($"MATKAKIRJA ui: sisältö v{versio} käyttöön kesken istunnon ({muuttuneet?.Count ?? 0} muuttunutta): maakunta- ja nostodata hylätty");
            };
            // Web pollo.js avaa → linssiEstaaChatin (satelliitti.js asettaa aikajana-paalla): astronautin pallonäkymässä
            // ison pulun napautus ei avaa pääkeskustelua (löydös 96); kuvanäkymässä keskustelu on minipulun kortissa.
            Pulu.Napautus += Chat.Vaihda;
            Pulu.NapautusEstetty = () =>
            {
                var l = Linssit;
                return !Chat.Auki && l != null && l.Auki?.Tiedot?.Id == LinssiUi.AstronauttiId && !l.Astronautti.Kuva.Auki;
            };
            // Livia lennähtää paikalle, kun käyttöliittymä on valmis (webin ensisaapuminen: handoff).
            kerros.Juuri(UiKerros.Tilarivi).schedule.Execute(() => Pulu.Tilanne("arrival")).StartingIn(1500);
            Tietoja = new Tietoja(kerros);
            // Commons-tekijätaulu heti (38 kt): ensimmäinenkin lähderivi täydentyy (Kuvatekija, #3438).
            kerros.Juuri(UiKerros.Tilarivi).schedule.Execute(Kuvatekija.Esilataa).StartingIn(3000);
            Palaute = new PalauteIkkuna(kerros); // hampurilaisen "ehdota sisältöä"
            Valikko.MitaUutta.TarkistaPaivitys(); // web: "Peli päivittyi", kun laitteella oli aiempi versio
            Aloitus = new Aloitusnakyma(kerros);
            // Löydökset 81/82: yläpalkki pois aloitusnäytöltä. Sulkeutuessa päivitys seuraavassa ruudussa, jotta
            // valinnan Aloita ehtii merkitä aloituslennon (palkki ei välähdä valinnan ja lennon välissä).
            Aloitusnakyma.AukiMuuttui += auki =>
            {
                if (auki) PaivitaPiilot();
                else kerros.Juuri(UiKerros.Traileri).schedule.Execute(PaivitaPiilot);
            };
            Huipennus = new Huipennus(kerros);
            Nostokortti = new Nostokortti(kerros);
            Lehti = new Lehtinakyma(kerros);
            Nahtavyysnakyma = new Nahtavyysnakyma(kerros); // kaupunkikortin "Nähtävyydet"
            Nahtavyydet = new Nahtavyysarkki(kerros); // lehden ja nähtävyysnäkymän päälle (sama kerros, myöhemmin)
            Wiki = new WikiIkkuna(kerros); // kaikkien edellisten päälle (sama kerros, myöhemmin; avaus tuo eteen)
            Saapumiskortti = new Saapumiskortti(kerros, () => Tilarivi.Alareuna); // karttaruudun päälle, myös lennon kaistaleen
            Liike = new PieniLiike(kerros); // kerros 10: pallon päällä, muun UI:n alla
            Noppa = new Noppa(kerros.Juuri(PieniLiike.Kerros)); // web die-layer karttaruudussa, UI:n alla
            Leima = new Leima(kerros); // tapahtumakuplat (rahan muutokset)
            // Lehti aukeaa kaiken päälle: auki jääneet valikot ja popupit kiinni.
            // B7-soitin: lehti hiljentää äänimaiseman myös testiavauksessa (tuplakutsu ohjaimen kanssa on harmiton).
            Lehti.Avautui += _ => Aanisoitin.Hiljennys("lehti", true);
            Lehti.Suljettu += _ => Aanisoitin.Hiljennys("lehti", false);
            // Webissä pulu ja chat asuvat avoimessa lehdessä (arrival-dialog on LIVIAN_NAPPIDIALOGIT): pulun
            // kerros lehden päälle lehden ajaksi; nähtävyysjuttu aukeaa taas chatin päälle (web: juttu chatin päälle).
            Lehti.Avautui += _ => { lehtiAuki = true; PulunKerros(); };
            Lehti.Suljettu += _ => { lehtiAuki = false; PulunKerros(); };
            Nahtavyydet.Avautui += () => { arkkiAuki = true; PulunKerros(); };
            Nahtavyydet.Suljettu += () => { arkkiAuki = false; PulunKerros(); };
            // Pulun puhekanavan reunat soittimelle (soitin suodattaa toistot).
            kerros.JokaRuutu += () => Aanisoitin.PuluPuhuu(Aanet.PuluPuhuu);
            kerros.JokaRuutu += PaivitaKuvaSumea;
            // Omistaja 11.5x (Linssiseppä, ElavaHerays): elävän kartan saapuminen, elävät hetket ja maakunnan herätys odottavat,
            // kunnes saapumisen kortit ovat kiinni: matkakirjakortti auki (ei lappuna), saapumiskortti, paljastus, nostokortti,
            // lehti ja kysymys. Puheen ja kuvasumennuksen Linssiseppä lukee itse.
            ElavaHerays.KorttiAukiKysely = () => (Matkakirja.Nakyy && !Matkakirja.Lappuna) || Saapumiskortti.Auki || Paljastus.Auki
                || Nostokortti.Auki || Lehti.Auki || Kysymys.Auki;
            // Löydös 162 (omistaja: saapuminen ≤ 1 s kortin tai luennan jälkeen): kun jäljellä on vain kuvasumennus,
            // Linssiseppä pyytää pakan lähtemään heti — kuvat lentävät korttiin ilman 6 s hiljaisuutta (LoppuMs).
            ElavaHerays.KuvapakkaLahtee = () => Matkakirja.Kuvat.Hiljeni(0);
            kerros.JokaRuutu += ChatinKerros;
            // Löydös 19: kameran puolen mieto sumennus (Natiiviseppä, 2,25 pt, 0,3 s; portti voittaa).
            // Löydös 132: taso (Kortti / Kokoruutu) kameralle; KuvaSumea on tason yhteensopiva bool.
            KuvaTasoMuuttui += t => PalloKierto.KuvaTaso = t;
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
            Karttaselite.AukiMuuttui += auki => { Linssit.Valitsin.Vaista(auki); Matkakirja.SeliteVaisto(auki); };
            Valikko.TietojaPainettu += Tietoja.Avaa;
            Valikko.EhdotaPainettu += () => Palaute.Avaa();
            Tilarivi.LogoPainettu += () => { Valikko.Sulje(); Aanentasot.Sulje(); Matkalaukku.Sulje(); Tietoja.Avaa(); };
            Matkalaukku.LogoPainettu += () => Tietoja.Avaa();
            UiSisalto.Lataa(null); // kaupunkidata valmiiksi ennen ensimmäistä napautusta
            Aanet.Alusta(); // tehostekanava, mykistyksen napsahdus ja tehosteiden tiedostot laitteelle

            // ☰ avaa linssivalikon koko pelin valikkona (löydös 20 iPhone, löydös 65 kaikki laitteet).
            Tilarivi.Valikko.clicked += () =>
            {
                Aanentasot.Sulje(); Matkalaukku.Sulje();
                if (Linssivalitsin.Valikkona) { Valikko.Sulje(); Linssit.Valitsin.Vaihda(); }
                else Valikko.Vaihda();
            };
            Linssit.Valitsin.AukiMuuttui += auki => { if (Linssivalitsin.Valikkona) Tilarivi.Valikko.EnableInClassList("mk-valittu", auki); };
            RakennaPuhelinvalikko();
            Tilarivi.Vieras(Karttaselite.Nappi);
            Matkakirja.Kiinnita(Tilarivi);
            Tilarivi.Ratas.clicked += () => { Valikko.Sulje(); Matkalaukku.Sulje(); Aanentasot.Vaihda(); };
            Tilarivi.PilleriPainettu += () => { Valikko.Sulje(); Aanentasot.Sulje(); Matkalaukku.Vaihda(); };
            Valikko.AukiMuuttui += auki => Tilarivi.Valikko.EnableInClassList("mk-valittu", auki);
            Aanentasot.AukiMuuttui += auki => Tilarivi.Ratas.EnableInClassList("mk-valittu", auki);
            // Löydös 24: Uusi peli palaa aloitusporttiin ilman tallennuksen jatkoa → avausruutu → valinta → lento;
            // PeliOhjain.UusiMatka korvaa tallennuksen vasta, kun kaupunki valitaan.
            Valikko.UusiPeli += () =>
            {
                var o = PeliOhjain.Instanssi;
                if (o == null) { Tilarivi.Viesti("Peli ei ole vielä käynnissä"); return; }
                SuljeKaikki();
                // Löydös 177: kaikki pelin muistit pois (web tyhjennaMuistit), myös linssien muistit ja passi.
                o.TyhjennaMuistit();
                Aloitus.Nayta(id => Aloita(o, id), o.Lahtokaupungit(), null);
            };

            // Pallo ei lue elettä, joka alkaa UI:n päältä (kaikki kerrokset, myös ei-modaaliset napit).
            SyoteLukko.LisaaPeitto(UiKerros.Peittaa);
            // Pelisilmukka pois (3D-mittaukset) = koko UI pois. PeliOhjain syntyy samassa
            // AfterSceneLoad-vaiheessa, joten kytkentä odottaa sen ilmestymistä.
            kerros.Juuri(UiKerros.Tilarivi).schedule.Execute(KytkeOhjain).Every(250).Until(() => ohjainKytketty);
        }

        bool ohjainKytketty;
        MatkanYhteenveto odottavaHuipennus;

        /// <summary>
        /// Löydös 177: UI:n muistissa pidetyt tilat alkuun Uusi peli -tyhjennyksen jälkeen (PlayerPrefs on jo pyyhitty):
        /// maakuntien valinta ja selitteen välilehti, laukun tilastolohko, pulun keskustelu, trailerit ja saapumisen
        /// istuntomuistit. Kuvanäkymän "nähdyt" jäävät (web sessionStorage säilyy latauksessa).
        /// </summary>
        void NollaaMuistit()
        {
            Karttaselite.Nollaa();
            Matkalaukku.Nollaa();
            Chat.Nollaa();
            Traileri.Nollaa();
            Saapuminen.Nollaa();
            Lukijoilta.Unohda();
        }

        /// <summary>Vanhan matkan sisältöikkunat kiinni uuden matkan alkaessa (aloitusnäkymä ja pelin näkymät jäävät).</summary>
        void SuljeSisaltoikkunat()
        {
            Nostokortti.Sulje();
            Nahtavyydet.SuljeKokonaan();
            Nahtavyysnakyma.Sulje();
            Wiki.Sulje();
            Minipopup.SuljeAuki();
            Pikkuseloste.Sulje();
        }

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
            // Löydös 177: Uusi peli tyhjentää pelin muistit (Pelikoodarin TyhjennaMuistit); webissä sivu latautuu
            // uudelleen, joten myös UI:n istuntomuistit alkavat alusta.
            o.MuistitTyhjennetty += NollaaMuistit;
            // Löydös 177 (Laitetestaajan resepti 1.0.27): uusi matka millä reitillä tahansa (valikko, huipennus,
            // testikomento uusi-peli) sulkee vanhan pelin sisältöikkunat; webissä sivu latautuu uudelleen.
            o.MatkaAlkoi += () => UiKerros.PaaSaikeessa(SuljeSisaltoikkunat);
            // Pelin tilanteet puluun (webin ilmoitaLivianTilanne; Pelikoodarin tapahtuma).
            o.LivianTilanne += (laji, tunne, v) =>
            {
                if (laji == "tunne") Pulu.Tunne(tunne, v);
                else Pulu.Tilanne(laji, null, tunne, v);
            };
            // Aloitus ja matkan huipennus (Pelikoodarin tapahtumat); tila voi olla jo Aloitus.
            o.AloitusTarjolla += () => UiKerros.PaaSaikeessa(() => NaytaAloitus(o));
            // Liiku ja kulkutapaliuku (Pelikoodarin PeliOhjain.Liiku): tila muuttui → napit uudelleen.
            o.LiikuMuuttui += () => UiKerros.PaaSaikeessa(() => Matkavalinta.PaivitaLiiku(o));
            o.TilaMuuttui += () => UiKerros.PaaSaikeessa(() => Matkavalinta.PaivitaLiiku(o));
            Matkavalinta.PaivitaLiiku(o);
            // Aloituskaava: avausteksti häipyy, kun aloituslento on perillä (Pelikoodarin PeliOhjain.Aloitus).
            // Aloituslento ilman pallovalintaa (testikomento ui aloita, muut polut): avausteksti silti lennolle.
            o.AloituslentoAlkoi += _ => UiKerros.PaaSaikeessa(() => { if (!Aloitus.Lennolla) Aloitus.LentoKirjoitus(); AloituslentoPiilo(true); });
            // Löydös 23: lennon ajaksi kaikki muu piiloon (Nousu … Perilla, myös aloituslento).
            o.LennonVaiheMuuttui += (v, _) => UiKerros.PaaSaikeessa(() => LentoPiilo(v != LennonVaihe.Perilla));
            // Pöllön valintavihje nopan jälkeen (Pelikoodari: 15 s ilman valintaa, kerran vaiheessa).
            o.ValintavihjeAika += t => UiKerros.PaaSaikeessa(() => Pulu.NaytaVihje(t));
            o.ValintavihjePois += () => UiKerros.PaaSaikeessa(Pulu.PiilotaVihje);
            o.AloituslentoPaattyi += _ => UiKerros.PaaSaikeessa(() => { AloituslentoPerilla(); Aloitus.AloituslentoPaattyi(); });
            // C16: Livian tuurauspaljastus (ensimmäinen saapuminen koskaan) tai saapumisen ohjekuplat aloituslennon jälkeen.
            LivianPaljastus.Kytke(o);
            if (o.Tila == SilmukanTila.Aloitus) NaytaAloitus(o);
            // Rahan muutos kupliksi (web buildToast kind stamp, "+10 puntaa · Lehden minitehtävä ratkesi").
            o.RahaMuuttui += (muutos, syy, _) => UiKerros.PaaSaikeessa(() => Leima.Raha(muutos, syy));
            KytkeTalous(o);
            // Noppa häipyy, kun nappula on perillä (web haivyta saapuessa).
            // A11 (web ui.js piilotaNoppa): noppa häipyy vain kaupunkiin päättyneellä matkalla; reitin varrella se jää
            // lepopaikalleen seuraavaan heittoon asti.
            o.MatkaPerilla += k => { if (k != null) UiKerros.PaaSaikeessa(() => Noppa.Haivyta()); };
            // Avauskortti on ruudun yläosassa eikä merkin vieressä: kamera ei panoroi (web avaaAvauskortti ilman ajoa).
            PeliOhjain.KortinRuutupiste = KaupunginRuutupiste;
            PeliOhjain.KorttiIlmanAjoa = true; // Pelikoodari c7b475d7: napautus avaa kortin heti (web avaaAvauskortti)
            // Livian sähkekuplat (johdanto, odotus, vinkki, linkin saate, oikein, paluu) puluun.
            o.LivianKuplat += (kaupunki, kentta, kuplat) => Sahkelomake.LivianKuplat(kaupunki, kentta, kuplat);
            // Sähkehakemisto valmiiksi, kun saavutaan sähkekaupunkiin (lehtien jäsennys ennen pisteen napautusta).
            o.MatkaPerilla += kaupunki => UiKerros.PaaSaikeessa(() => EsilataaSahkehakemisto(kaupunki));
            EsilataaSahkehakemisto(o.PelaajanKaupunki);
            // Löydös 104: maan karttanostojen data valmiiksi saapuessa (web sw.js), jotta kortti aukeaa heti.
            o.MatkaPerilla += kaupunki => UiKerros.PaaSaikeessa(() => EsilataaNostot(kaupunki));
            EsilataaNostot(o.PelaajanKaupunki);
            UiSisalto.LataaLehti(o.PelaajanKaupunki);
            // Esilataaja erä 2 (ESILATAUSPOLITIIKKA kohta 3): kohdekaupungin kuvat ja nostodata jo lennon/matkan aikana.
            o.SaapuminenTiedossa += kaupunki => UiKerros.PaaSaikeessa(() => EsilataaSaapuminen(kaupunki));
            // Esilataaja erä 3: kohdat 4–5 (nopan päässä / siirtokohteena näkyvä kaupunki) ja kohta 4 (joutilaana
            // tämän maan nostojen kuvat). Kohdekaupunkien nostodata viimeisenä (taso Muu).
            o.KaupunkiEnnakoitu += (kaupunki, taso) => UiKerros.PaaSaikeessa(() => EsilataaSaapuminen(kaupunki, taso, Taso.Muu));
            o.JoutilasKaupungissa += kaupunki => UiKerros.PaaSaikeessa(() => EsilataaNostojenKuvat(kaupunki));
            // Huipennus vasta, kun viimeisen aarteen kysymys (ja sen paljastus) on suljettu: tapahtuma
            // tulee löytöhetkellä, ennen paljastusta, eikä huipennus saa jäädä paljastuksen alle.
            // Web: voittoikkuna aukeaa → sfx.play('win').
            // Musiikkisuunnitelma vaihe 1: matkan loppu (musa-loppu) soi huipennuksen alla.
            void NaytaHuipennus(MatkanYhteenveto yv)
            {
                Aanet.Tehoste("win");
                Aanisoitin.MatkaLoppui();
                Huipennus.Nayta(yv, () => UusiMatka(o));
            }
            o.KaikkiAarteetLoytyi += yv => UiKerros.PaaSaikeessa(() =>
            {
                if (!Kysymys.Auki && !Paljastus.Auki) { NaytaHuipennus(yv); return; }
                odottavaHuipennus = yv;
            });
            Kysymys.Piilotettu += () =>
            {
                var yv = odottavaHuipennus;
                odottavaHuipennus = null;
                if (yv != null) NaytaHuipennus(yv);
            };
            // Pelin tehosteet (webin sfx.play-tunnukset) ja lennon moottoriääni (startFlight/stopFlight),
            // B7 §1.8: siivut UI:n äänimoottorilla.
            o.Aani += tunnus => UiKerros.PaaSaikeessa(() => Aanet.Tehoste(tunnus));
            o.LentoAani += (alkaa, kesto) => UiKerros.PaaSaikeessa(() => Aanet.LentoAani(alkaa, kesto));
            // Lehti (WKWebView) aukeaa kaiken päälle: auki jääneet valikot kiinni.
            if (o.Lehti != null) o.Lehti.Avautui += _ => { Valikko.Sulje(); Aanentasot.Sulje(); Matkalaukku.Sulje(); Vahvistus.Sulje(); };
        }

        // --- TALOUDEN VAIHE 1 (web #3394, Pelikoodarin PeliOhjain.Talous fbda3812) ------------------------------------

        /// <summary>
        /// Kassarivi (Ylapalkki.Talous), rahatilanteen kupla + Livian tunne (web playEvents) ja loppukortti
        /// (web naytaMatkanLoppu). Loppukortti myös käynnistyksessä, jos tallennettu matka on jo päättynyt.
        /// </summary>
        void KytkeTalous(PeliOhjain o)
        {
            o.TilaMuuttui += () => UiKerros.PaaSaikeessa(() => PaivitaKassa(o));
            o.MatkaAlkoi += () => UiKerros.PaaSaikeessa(() => { Huipennus.Sulje(); PaivitaKassa(o); });
            o.Rahatilanne += (tilanne, otsikko, ala) => UiKerros.PaaSaikeessa(() =>
            {
                Leima.Nayta(otsikko, ala, "kukkaro");
                if (tilanne == "peli.vararikko.varoitus") Pulu.Tunne("vakava", 0.55f);
                else if (tilanne == "peli.vararikko.selvisi") Pulu.Tunne("lammin", 0.5f);
            });
            // Pelistreak (talous 5b, web playEvents tilanne 'peli.streak'): sama kupla + Livian ilo.
            o.Pelistreak += (pituus, otsikko, ala) => UiKerros.PaaSaikeessa(() =>
            {
                Leima.Nayta(otsikko, ala, "kukkaro");
                Pulu.Tunne("ilo", 0.5f);
            });
            o.MatkaPaattyi += loppu => UiKerros.PaaSaikeessa(() => NaytaMatkanLoppu(o, loppu));
            // Jatka (tallennettu matka) ei laukaise TilaMuuttui-tapahtumaa, mutta asettaa pelirivin: kassa ja
            // jo päättyneen matkan loppukortti siitä.
            Tilarivi.RiviAsetettu += () => PaivitaKassa(o);
            Tilarivi.ElamaAnkkurit = () => (Karttaselite.Nappi?.worldBound ?? Rect.zero, Matkakirja.Rajat);
            PaivitaKassa(o);
        }

        global::Matkakirja.Peli.MatkanLoppu naytettyLoppu;

        void PaivitaKassa(PeliOhjain o)
        {
            var m = o.Matka;
            // Elämäpalkki: jäljellä olevat 6 h vuorot ennen matkan päättymistä (web rahattomuuttaJaljella vuoroina).
            var p = m?.Tila.Pelaaja;
            int? vuoroja = p?.Rahaton == null ? (int?)null
                : Mathf.Max(0, global::Matkakirja.Peli.Talous.RahattomuusVuoroja - (m.Tila.VuoroLaskuri - p.Rahaton.AlkuVuoro));
            Tilarivi.Talous(m?.RahattomuuttaJaljella(), o.MatkanLoppu != null, Matkalaukku.KassaVihje(m), vuoroja);
            if (o.MatkanLoppu != null && o.MatkanLoppu != naytettyLoppu) NaytaMatkanLoppu(o, o.MatkanLoppu);
        }

        /// <summary>
        /// Web naytaMatkanLoppu: voittoruudun dialogi otsikolla "Matka päättyi"; "Jatka viimeisestä tallennuksesta"
        /// vain turvatallennuksen ollessa olemassa. Ei voittoääntä eikä läpipeluusaavutusta.
        /// </summary>
        void NaytaMatkanLoppu(PeliOhjain o, global::Matkakirja.Peli.MatkanLoppu loppu)
        {
            if (loppu == null) return;
            naytettyLoppu = loppu;
            var m = o.Matka;
            var p = m?.Tila.Pelaajat?.FirstOrDefault(x => x.Id == loppu.Pelaaja) ?? m?.Tila.Pelaaja;
            int loydot = p?.Loydot.Count ?? 0;
            int maat = p?.LoytoMaat.Where(x => !string.IsNullOrEmpty(x)).Distinct().Count() ?? 0;
            string paikka = loppu.Kaupunki != null ? "kaupungissa " + loppu.Kaupunki : "matkalla";
            string teksti = $"Rahat loppuivat {paikka}, matkan {loppu.Paiva}. päivänä. "
                + $"Laukussa {loydot} löytöä{(maat > 0 ? $" {maat} maasta" : "")} ja {p?.Paaaarteet ?? 0} unohdettua aarretta.";
            SuljeSisaltoikkunat();
            Huipennus.NaytaLoppu(teksti, o.Yhteenveto()?.Teksti, o.TurvaTallennusOn ? () =>
            {
                var virhe = o.JatkaTurvasta();
                if (virhe != null) Tilarivi.Viesti(virhe);
            } : (System.Action)null, () => UusiMatka(o));
        }

        static string esiladattuMaa;

        /// <summary>
        /// Saapumisen kuvat levylle ennen perillä oloa (Pelikoodari, Esilataaja erä 2): isoisän luentakuvat ja PuluCam-kuvat
        /// (Fokusvirrat), trailerin avaus- ja kansikuvat (UiSisalto) sekä maan nostodata heti (SeuraavaRuutu-taso: ei odota
        /// lennon laattoja kuten taustataso).
        /// </summary>
        static void EsilataaSaapuminen(string kaupunki) => EsilataaSaapuminen(kaupunki, Taso.SeuraavaRuutu, Taso.SeuraavaRuutu);

        /// <summary>Saapumisen kuvat tasolla taso ja maan nostodata tasolla nostoTaso (erä 3: ennakointi taustalla).</summary>
        static void EsilataaSaapuminen(string kaupunki, Taso taso, Taso nostoTaso)
        {
            if (string.IsNullOrEmpty(kaupunki)) return;
            // Kaupungin lehti (skeema 1.48, kaupungeittain): kansi- ja avauskuvat, johdanto ja aiheet lennon aikana.
            UiSisalto.LataaLehti(kaupunki);
            Fokusvirrat.Lataa(() =>
            {
                var v = Fokusvirrat.Hae(kaupunki);
                if (v == null) return;
                foreach (var k in v.Luentakuvat) Kuvat.Esilataa(k.Osoite, taso);
                foreach (var k in v.PuluKuvat) Kuvat.Esilataa(k.Osoite, taso);
            });
            EsilataaAvauskuvat(kaupunki, taso);
            var maa = UiSisalto.Kaupunki(kaupunki)?.Maa;
            // NostoSisalto pitää jäsennetyn datan muistissa: toinen kutsu samalle maalle ei hae verkosta.
            if (!string.IsNullOrEmpty(maa) && (nostoTaso != Taso.SeuraavaRuutu || maa != esiladattuMaa))
            {
                if (nostoTaso == Taso.SeuraavaRuutu) esiladattuMaa = maa;
                UiKerros.Hae().StartCoroutine(NostoSisalto.Esilataa(maa, nostoTaso));
            }
            Debug.Log($"MATKAKIRJA ui: saapumisen esilataus {kaupunki} ({taso})");
        }

        /// <summary>
        /// Trailerin avaus- ja kansikuvat (kaupunkilehti, skeema 1.48 kaupungeittain). Esilataaja erä 5 (kylmä savuke
        /// lokit/esilataaja-5/kylma4): lehti saapuu asynkronisesti (UiSisalto.LataaLehti), joten EsilataaSaapuminen näki
        /// avauskuvat yleensä tyhjinä ja hero-kuvat (julisteet/herokoe, ~1,1 s) haettiin vasta saapumisessa. Nyt odottava
        /// kaupunki muistetaan ja kuvat pyydetään, kun lehti on liitetty (LehdetSaapuivat). Kaikki avauskuvat (traileri
        /// näyttää ne kaikki, Ateenalla 4).
        /// </summary>
        static void EsilataaAvauskuvat(string kaupunki, Taso taso)
        {
            var tiedot = UiSisalto.Kaupunki(kaupunki);
            if (tiedot == null) return;
            if (tiedot.Avauskuvat.Count == 0 && tiedot.Kansikuvat.Count == 0)
            {
                if (!odottavatAvauskuvat.ContainsKey(kaupunki) || taso < odottavatAvauskuvat[kaupunki]) odottavatAvauskuvat[kaupunki] = taso;
                if (!avausKuuntelu) { avausKuuntelu = true; UiSisalto.LehdetSaapuivat += AvauskuvatLehdesta; }
                return;
            }
            foreach (var k in tiedot.Avauskuvat) Kuvat.Esilataa(k.Tiedosto, taso);
            if (tiedot.Kansikuvat.Count > 0) Kuvat.Esilataa(tiedot.Kansikuvat[0].Tiedosto, taso);
        }

        static readonly Dictionary<string, Taso> odottavatAvauskuvat = new Dictionary<string, Taso>();
        static bool avausKuuntelu;

        static void AvauskuvatLehdesta()
        {
            foreach (var kv in new List<KeyValuePair<string, Taso>>(odottavatAvauskuvat))
            {
                var t = UiSisalto.Kaupunki(kv.Key);
                if (t == null || (t.Avauskuvat.Count == 0 && t.Kansikuvat.Count == 0))
                {
                    // Lehti liitetty, mutta siinä ei ole kuvia: ei jäädä odottamaan (Natiivi-UI:n katselmointi 26.9.).
                    if (UiSisalto.LehtiLuettu(kv.Key)) odottavatAvauskuvat.Remove(kv.Key);
                    continue;
                }
                odottavatAvauskuvat.Remove(kv.Key);
                EsilataaAvauskuvat(kv.Key, kv.Value);
            }
        }

        /// <summary>Kohta 4 (erä 3): joutilaana tämän maan karttanostojen kuvat levylle.</summary>
        static void EsilataaNostojenKuvat(string kaupunki)
        {
            var maa = kaupunki != null ? UiSisalto.Kaupunki(kaupunki)?.Maa : null;
            if (!string.IsNullOrEmpty(maa)) UiKerros.Hae().StartCoroutine(NostoSisalto.EsilataaKuvat(maa, Taso.TamaKaupunki));
        }

        /// <summary>Saapumismaan nostodata taustalla 2 s:n päästä (saapumisen animaatio ja luenta ensin); maa kerran.</summary>
        static void EsilataaNostot(string kaupunki)
        {
            var maa = kaupunki != null ? UiSisalto.Kaupunki(kaupunki)?.Maa : null;
            if (string.IsNullOrEmpty(maa) || maa == esiladattuMaa) return;
            esiladattuMaa = maa;
            UiKerros.Hae().StartCoroutine(Viiveella(2f, NostoSisalto.Esilataa(maa)));
        }

        static System.Collections.IEnumerator Viiveella(float s, System.Collections.IEnumerator ajo)
        {
            yield return new WaitForSecondsRealtime(s);
            yield return ajo;
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

        bool lehtiAuki, arkkiAuki, chatNostonPaalla;

        void PulunKerros() =>
            Kerros.AsetaJarjestys(Pulu.Kerros, lehtiAuki && !arkkiAuki ? UiKerros.Traileri + 2
                : chatNostonPaalla ? UiKerros.Valikot + 2 : Pulu.Kerros);

        /// <summary>
        /// Löydös 136 (omistaja, build 16): nostokortin valmis kysymys tai korostettu sana avaa chatin nosto taustalla
        /// auki; pulu ja chat (kerros 35) nousevat nostokortin (Valikot 40) päälle chatin ajaksi. Ohi napautus sulkee
        /// vain chatin (sen sulkija on ylempänä), ja nosto jää näkyviin.
        /// </summary>
        void ChatinKerros()
        {
            bool p = Chat.Auki && Nostokortti.Auki;
            if (p == chatNostonPaalla) return;
            chatNostonPaalla = p;
            PulunKerros();
        }

        void UusiMatka(PeliOhjain o)
        {
            SuljeKaikki();
            // Uusi peli unohtaa linssin muistin (web: linssimuisti kuuluu matkaan).
            PlayerPrefs.DeleteKey(global::Matkakirja.Linssit.Aikajana.LinssiMuisti.Etuliite + "ihmisen-matka"); PlayerPrefs.DeleteKey(global::Matkakirja.Linssit.Aikajana.LinssiMuisti.Etuliite + "ihmisen-matka-2");
            Aloitus.NaytaAvaus(id => Aloita(o, id), o.Lahtokaupungit());
        }

        /// <summary>Aloituslento perillä, ohitettu tai katkennut: Ohita-nappi ja kaistale pois, piilotetut takaisin.</summary>
        void AloituslentoPerilla()
        {
            Aloitus.LentoPerilla();
            if (aloituslentoPiilo || Aloitus.OhitaNakyy) AloituslentoPiilo(false);
        }

        void Aloita(PeliOhjain o, string id)
        {
            // Kehittäjän maailmatilassa mikä tahansa kaupunki kelpaa lähdöksi (D6, web doPickStart).
            var virhe = o.UusiMatka(id, kaikkiKelpaa: Paavalikko.Maailma);
            // Palkki ja pulu pysyvät piilossa valinnasta suoraan lennolle (ei välähdystä, kun aloitus sulkeutuu).
            if (o.AloituslentoKaynnissa) AloituslentoPiilo(true);
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
            Wiki.Sulje();
            Paljastus.Sulje();
            Julistegalleria.Sulje();
            Minipopup.SuljeAuki();
            Pikkuseloste.Sulje();
            Vahvistus.Sulje();
            Matkavalinta.Piilota();
            Matkavalinta.PiilotaHeitto();
            Kaupunkikortti.Piilota();
            Liuska.Piilota();
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
            // A9 (web dieRestingSpot, packs/maailmankartta.js dieSpot): lepo vasemmassa reunassa puolivälissä (0,06; 0,5);
            // jos matkakirjakortti on samassa (vasen ala) kulmassa, oikea reuna (dieSpotAlt 0,94; 0,5). Värinä ±0,03 / ±0,025.
            float sx = 0.06f;
            if (Matkakirja != null && Matkakirja.Nakyy)
            {
                var r = Matkakirja.Laatikko;
                if (r.center.x < w * 0.5f && r.center.y >= h * 0.5f) sx = 0.94f;
            }
            var loppu = new Vector2(w * (sx + (float)(arpa.NextDouble() - 0.5) * 0.06f), h * (0.5f + (float)(arpa.NextDouble() - 0.5) * 0.05f));
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

        /// <summary>
        /// D17 (web lauta.js napautaKaupunki, PAATOKSET 34 kohdat 10 ja 12): kaupunkimerkki liuskan avautuessa
        /// vaakasuunnassa neljännekseen leveydestä (LIUSKAN_MERKIN_OSUUS_X) ja pystysuunnassa vapaan kaistan keskelle:
        /// ylärajana ylimmän kolmanneksen kalusteet (yläpalkki, matkakirjakortti) + 18 px, alarajana alimman kolmanneksen
        /// kalusteet (pulu, Liiku) − 18 px (LIUSKAN_YLAVARA_PX, YLAKALUSTEEN_RAJA 1/3). Jos kaista on listaa korkeampi,
        /// merkki saa jäädä ruudun keskelle kaistan sisällä. Palauttaa ruudun pikselit (origo vasen ala).
        /// Löydös 146: iPhonella (liuska merkin yläpuolella) merkki vaakasuunnassa keskelle ja liuskan korkeuden verran
        /// yläkalusteiden alle; iPadilla kuten yllä.
        /// </summary>
        /// <summary>Kaupungin nykyinen ruutupiste (kamera pysyy paikallaan); ei näkyvissä → liuskan paikka.</summary>
        Vector2 KaupunginRuutupiste(string kaupunki)
        {
            var k = UiSisalto.Kaupunki(kaupunki);
            var kierto = Object.FindAnyObjectByType<PalloKierto>();
            if (k != null && kierto != null && kierto.RuutuPiste(k.Lat, k.Lon, out var r)) return r;
            return LiuskanRuutupiste(kaupunki);
        }

        Vector2 LiuskanRuutupiste(string kaupunki)
        {
            var juuri = Kerros.Juuri(UiKerros.Valikot);
            float w = juuri.layout.width, h = juuri.layout.height;
            if (float.IsNaN(w) || w <= 0 || h <= 0) return new Vector2(Screen.width / 4f, Screen.height / 2f);
            const float Vara = 18f, Raja = 1f / 3f;
            // Löydös 146: liuskan korkeus herokuvan ja noin seitsemän rivin kanssa (ennen 8 × 18,85 pelkille riveille).
            float tarve = KaupunkiKortti.ArvioituKorkeus(w);
            float r0 = Kerros.Reunat(UiKerros.Valikot).y;
            var ylat = new System.Collections.Generic.List<Rect> { new Rect(0, 0, w, r0 + Ylapalkki.Varaus) };
            if (Matkakirja != null && Matkakirja.Nakyy) ylat.Add(Matkakirja.Laatikko);
            var alat = new System.Collections.Generic.List<Rect> { Pulu.Laatikko, Matkavalinta.LiikuLaatikko };
            float ylaRaja = Vara, alaRaja = h - Vara;
            foreach (var k in ylat) if (k.height > 0 && k.yMin < h * Raja) ylaRaja = Mathf.Max(ylaRaja, k.yMax + Vara);
            foreach (var k in alat) if (k.height > 0 && k.yMax > h * (1f - Raja)) alaRaja = Mathf.Min(alaRaja, k.yMin - Vara);
            if (!UiKerros.Tabletti)
            {
                // Löydös 146: iPhonella liuska on kaupungin yläpuolella keskitettynä (enintään 45 % ruudusta, rako 16),
                // joten merkki vaakasuunnassa keskelle ja pystyssä niin alas, että liuska mahtuu sen ylle (mallissa
                // Ateena 50 % / 55 %). Ei mahdu → liuska menee merkin alle (KaupunkiKortti.Asemoi).
                float ylle = Mathf.Min(tarve, h * 0.45f) + 16f;
                float yp = Mathf.Min(Mathf.Max(h / 2f, ylaRaja + ylle), Mathf.Max(ylaRaja, alaRaja));
                return new Vector2(Screen.width * 0.5f, Screen.height * (1f - yp / h));
            }
            float puolikas = tarve / 2f;
            float y = alaRaja - ylaRaja >= tarve
                ? Mathf.Min(Mathf.Max(h / 2f, ylaRaja + puolikas), alaRaja - puolikas)
                : (ylaRaja + alaRaja) / 2f;
            return new Vector2(Screen.width * 0.25f, Screen.height * (1f - y / h));
        }

        readonly System.Collections.Generic.List<Ruutulaatikko> kalusteet = new System.Collections.Generic.List<Ruutulaatikko>();

        /// <summary>
        /// Löydös 164 (omistaja 1.0.21, Alankomaat): kaupunkien ja alueiden nimiöt väistävät ruudun kalusteita kuten
        /// webissä (lauta.js LIUSKAN_KALUSTEET: yläpalkki, kartuutsi, toimintorivin Liiku, pulu). Laatikot paneelista
        /// ruutupikseleiksi (y ylös) + 4 pt vara; KaupunkiMerkit varaa ne joka piirrettävässä kehyksessä.
        /// </summary>
        System.Collections.Generic.IReadOnlyList<Ruutulaatikko> KartanKalusteet()
        {
            kalusteet.Clear();
            var juuri = Kerros.Juuri(UiKerros.Valikot);
            var paneeli = juuri.panel;
            float w = juuri.layout.width;
            if (paneeli == null || float.IsNaN(w) || w <= 0) return kalusteet;
            // Paneeli → ruutu: ScreenToPanel kulmista (kaikki kerrokset samalla skaalalla, vrt. LiuskanRuutupiste).
            var a = UnityEngine.UIElements.RuntimePanelUtils.ScreenToPanel(paneeli, Vector2.zero);
            var b = UnityEngine.UIElements.RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(Screen.width, Screen.height));
            if (b.x - a.x <= 0 || b.y - a.y <= 0) return kalusteet;
            float sx = Screen.width / (b.x - a.x), sy = Screen.height / (b.y - a.y);
            const float Vara = 4f;
            void Lisaa(Rect r)
            {
                if (r.width <= 0 || r.height <= 0) return;
                float x0 = (r.xMin - Vara - a.x) * sx, x1 = (r.xMax + Vara - a.x) * sx;
                float yla = (r.yMin - Vara - a.y) * sy, ala = (r.yMax + Vara - a.y) * sy;
                kalusteet.Add(new Ruutulaatikko(x0, Screen.height - ala, x1, Screen.height - yla));
            }
            if (!Ylapalkki.PalkkiPiilossa) Lisaa(new Rect(0, 0, w, Kerros.Reunat(UiKerros.Valikot).y + Ylapalkki.Varaus));
            var kortti = Kartuscha?.NakyvaKortti;
            if (kortti != null) Lisaa(kortti.worldBound);
            if (Matkavalinta != null) Lisaa(Matkavalinta.LiikuLaatikko);
            if (Pulu != null) Lisaa(Pulu.Laatikko);
            return kalusteet;
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
