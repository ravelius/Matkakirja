// PELIOHJAIN: pelattava silmukka pallolla (Pelikoodari, erä 3, 23.9.2026).
//
//   kartta → napautus kaupunkiin → matkavalinta (MatkaDialogi) → Matkan teot
//   (PeliApu.Matkusta) → kamera-ajo kohteeseen (IKamera.Aja) → saapuessa
//   kaupunkilehti (ILehtiNakyma, Natiivi-UI) → lehti suljetaan → tallennus → kartta.
//   Reitin varrella ei lehteä: "Heitä noppaa" -nappi jatkaa kohti tavoitetta.
//   Kaupungissa, jossa on tehtävä (laatta, kohtaaminen, tutkimaton), alareunan
//   "Tutki kaupunkia" -nappi avaa kysymyksen (Kysely.Tutki → IKysymysNakyma,
//   erä 4): vastaus, vihje, 50:50 ja aikaraja; oikea vastaus kääntää laatan.
//
// LUENNAT: isoisän äänet (Puhe + Luennat): intro uuden pelin alussa,
// lennon alun repliikki, saapumispuhe kaupunkiin saavuttaessa ja kaupungin
// matkakirjaluento lehden sulkeuduttua (kerran per kaupunki istunnossa).
//
// NÄKYMÄT: rajapintojen takana (NakymaSopimukset.cs). Natiivi-UI asettaa
// UI Toolkit -toteutukset PeliNakymat-tehtaaseen; muuten UGUI-varanäkymät.
// Modaalisen näkymän ajan pallo ei ota kosketuksia (SyoteLukko).
//
// KÄYNNISTYY ITSE: RuntimeInitializeOnLoadMethod(AfterSceneLoad) etsii
// kohtauksesta PalloKierron (IKamera) ja KaupunkiMerkit ja luo
// olion "PeliOhjain". Rakennus.cs:ään ei tarvita muutoksia. Pois päältä:
// tiedosto Documents/peli-pois.txt käynnistyksessä tai testikomento 'peli pois'
// (3D-mittaukset, joissa napautuksen pitää lentää kaupunkiin kuten ennen).
//
// SISÄLTÖ: sama ämpäri ja välimuisti kuin Sisalto.cs (uusin.json → versiopolku
// → kokoelmat/*.json, välimuisti persistentDataPath/sisalto/<polku>), mutta
// raakatekstinä, koska pelilogiikka jäsentää paketin itse (SisaltoTuonti,
// Kysymysdata). Kysymykset ladataan taustalla seuraavaa erää varten.
//
// TALLENNUS: persistentDataPath/tallennus.json (Matka.Tallenna) atomisesti
// joka teon, saapumisen ja lehden sulkemisen jälkeen sekä sovelluksen
// siirtyessä taustalle; napautettu tavoite erikseen peli-tavoite.txt.
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit;
using Matkakirja.Peli;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.UI;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    /// <summary>Silmukan tila (testikomentojen 'odota-tila' ja peli-tila.json).</summary>
    public enum SilmukanTila { Lataa, Kartta, Dialogi, Matkalla, Lehti, Virhe, Kysymys, Traileri, Aloitus, Sahketehtava }

    [DisallowMultipleComponent]
    public sealed partial class PeliOhjain : MonoBehaviour
    {
        /// <summary>Varaoletus, jos lähtöä ei valita: tarina alkaa Lontoosta (Fablen tarkastus C8).</summary>
        public const string AloitusKaupunki = "lontoo";
        public const string PelaajanNimi = "Fogg";
        const float AjonVara = 0.75f;       // valmis-kutsun varareitti, jos sormi keskeyttää kamera-ajon
        const float YleiskuvanKesto = 1.0f;

        public static PeliOhjain Instanssi { get; private set; }

        PalloKierto kierto;
        KaupunkiMerkit merkit;
        /// <summary>Natiivilehti (PeliNakymat.Lehti, Natiivi-UI). null = ei lehteä (WKWebView-kuori poistettu, A4).</summary>
        ILehtiNakyma lehtiNakyma;
        /// <summary>Fokustehtävät ja vihreä aarrepiste (kokoelma fokusvirrat, Fokus.cs).</summary>
        Fokusdata fokus = new Fokusdata();
        /// <summary>
        /// Natiivi-UI asettaa: onko kaupungilla kulttuurivisa (web KULTTUURIT[lauta][kaupunki].kysymys),
        /// joka on yksi aarteen avaajista. Asettamaton = ei.
        /// </summary>
        public static Func<string, bool> KulttuurivisaTarjolla;
        IMatkaValinta dialogi;
        ITilarivi tilarivi;
        IKysymysNakyma kysymysNakyma;
        IKaupunkiKortti kaupunkiKortti;
        Kysely kysely;
        Pulmat pulmat;
        Kaupat kaupat;
        Puhe puhe;
        readonly Luennat luennat = new Luennat();
        Pulmadata pulmadata;
        Kuvakokoelmat kuvakokoelmat;
        Kohtaamiset kohtaamiset;
        readonly Aarrenimet aarrenimet = new Aarrenimet();
        readonly HashSet<string> tervehdyksetNahty = new HashSet<string>();
        KysymysToiminnot kysymysToiminnot;
        Loyto kysymysLoyto;
        readonly List<string> kysymysLisat = new List<string>();
        float kysymysJaljella;
        bool tervehdysAloitettu, tulosPaljastettu, tervehdysNakyi;
        float paljastusAika;
        /// <summary>Tuomion kesto ennen paljastusta (web visa.js: 900 ms).</summary>
        const float TuomioS = 0.9f;
        bool lukossa;

        Reittiverkko verkko;
        Matka matka;
        string versioPolku;

        SilmukanTila silmukanTila = SilmukanTila.Lataa;
        public SilmukanTila Tila
        {
            get => silmukanTila;
            private set
            {
                if (silmukanTila == value) return;
                var vanha = silmukanTila;
                silmukanTila = value;
                TilaAsetettu(vanha, value);   // TilaVaihtui (PeliOhjain.Aanet.cs)
            }
        }
        public Matka Matka => matka;
        public IReittiverkko Verkko => verkko;
        /// <summary>Aarrelaattojen määrät paketista; null = peli ilman laattoja.</summary>
        public Laattamaarat Laattamaarat { get; private set; }
        /// <summary>Kysymykset, tarinakaari ja paikkatiedot (ladataan taustalla; null kunnes valmis).</summary>
        public Kysymysdata Kysymykset { get; private set; }
        /// <summary>Pois päältä: napautukset menevät 3D:lle kuten ennen, eikä UI:ta näytetä.</summary>
        public bool Kaytossa { get; private set; } = true;
        public string DialogiKohde { get; private set; }
        public IReadOnlyList<MatkaVaihtoehto> Vaihtoehdot => vaihtoehdot;
        public string Tavoite { get; private set; }
        public MatkanTulos Viimeisin { get; private set; }
        public string ViimeViesti { get; private set; }
        public string ViimeVirhe { get; private set; }
        public bool LehtiAuki => lehtiNakyma != null && lehtiNakyma.Auki;
        /// <summary>Onko lehti käytössä (natiivilehti asetettu).</summary>
        bool LehtiOn => lehtiNakyma != null;
        /// <summary>Lehden sivu tuli näkyviin (omistaja, aihe, sivu, laji): pulun ja luentojen reaktiot.</summary>
        public event Action<string, string, int, string> LehtiSivuNakyi;
        /// <summary>Natiivilehti (Natiivi-UI: Avautui-tapahtuma); null ilman PeliNakymat.Lehti-tehdasta.</summary>
        public ILehtiNakyma Lehti => lehtiNakyma;
        /// <summary>Kaupunkikortin kaupunki, kun kortti on auki; muuten null.</summary>
        public string KorttiKaupunki { get; private set; }
        /// <summary>Kysymysmoottori (null, kunnes kysymykset on ladattu).</summary>
        public Kysely Kysely => kysely;
        /// <summary>Ostot ja palkkiot (Natiivi-UI:n lehdet, pulu, sähke kutsuvat PeliOhjaimen kautta).</summary>
        public Kaupat Kaupat => kaupat;
        /// <summary>Isoisän luennat (Natiivi-UI: kaiutinnappi Luennat.Luento(kaupunki) → SoitaLuento).</summary>
        public Luennat Luennat => luennat;
        /// <summary>Avoimen kysymyksen näkymätila (null, jos kysymys ei ole auki).</summary>
        public KysymysNaytto KysymysTila { get; private set; }
        /// <summary>
        /// Livian (pulu) tilanteet pelin tapahtumista, webin ilmoitaLivianTilanne-
        /// sanastolla (Natiivi-UI kytkee Pulu.Tilanne/Tunne): (laji, tunne, voimakkuus).
        /// laji: success | retry (kysymyksen tulos), tunne (kohtaamisen
        /// tunnetagit), narration | narrationEnd (luento alkaa/loppuu), reaction
        /// (luennan kuuntelureaktio: tunne = tarkoitus).
        /// </summary>
        public event Action<string, string, float> LivianTilanne;
        void Livia(string laji, string tunne = null, double voimakkuus = 0)
        {
            try { LivianTilanne?.Invoke(laji, tunne, (float)voimakkuus); }
            catch (Exception e) { Debug.LogException(e); }
        }
        void Livia(string laji, (string Tunne, double Voimakkuus)? t)
        {
            if (t.HasValue) Livia(laji, t.Value.Tunne, t.Value.Voimakkuus);
        }

        /// <summary>
        /// Luento alkoi soida (kaupunki, luento; intro ja lento-alku: kaupunki null) —
        /// webin aloitaMerkinta-hetki; Natiivi-UI näyttää matkakirjakortin.
        /// </summary>
        public event Action<string, Luento> LuentoAlkoi;
        /// <summary>Luento loppui (kaupunki): soi loppuun, pysäytettiin tai toinen puhe korvasi sen.</summary>
        public event Action<string> LuentoLoppui;

        /// <summary>
        /// Kortin Ohita-nappi (web ohitaSaapumisluenta): ohituslippu ensin, sitten kertoja ja pulu vaikenevat ja kuplat
        /// lähtevät (VaiennaPaikanPuhe). LuentoLoppui herää, mutta LuentoOhitettu estää pulun kommentin.
        /// </summary>
        public void OhitaLuento() => VaiennaPaikanPuhe();

        /// <summary>Soiva luento, tai null.</summary>
        public Luento SoivaLuento => soivaLuento;

        /// <summary>Pelisilmukka päälle/pois (Natiivi-UI piilottaa omat näkymänsä).</summary>
        public event Action<bool> KaytossaMuuttui;

        /// <summary>
        /// Pelin tila tallentui teon jälkeen (raha, tavarat, julisteet, tietäjäpisteet voivat
        /// muuttua): laukun päivitys ja kukkaron välähdys (Natiivi-UI). Ei joka ruudussa.
        /// </summary>
        public event Action TilaMuuttui;

        /// <summary>
        /// Kukkaro muuttui teon jälkeen (web kukkaroleima): (muutos puntina, syy näyttötekstinä, saldo).
        /// Syy on webin leiman alarivi ("Lehden minitehtävä ratkesi", "pulla Livialle", "Bussimatka −5 puntaa").
        /// Tulee ennen TilaMuuttui-tapahtumaa. Kolikon ääni tulee erikseen Aani("coin")-tapahtumasta, kun rahaa tulee.
        /// </summary>
        public event Action<int, string, int> RahaMuuttui;

        /// <summary>
        /// Matkan liike päättyi (kaupunki, johon saavuttiin, tai null reitin varrella) ennen lehteä tai
        /// traileria: Natiivi-UI:n noppa häipyy (web: noppa jää näkyviin saapumiseen asti).
        /// </summary>
        public event Action<string> MatkaPerilla;

        // --- aloitusnäkymä ja virstanpylväät (Natiivi-UI) -------------------

        /// <summary>
        /// Natiivi-UI asettaa BeforeSceneLoad: sisällön latauduttua silmukka jää tilaan
        /// Aloitus (AloitusTarjolla) eikä aloita tai jatka peliä itse. Näkymä kutsuu
        /// Jatka() (TallennusOn) tai UusiMatka(lähtökaupunki). false = entinen vuo.
        /// </summary>
        public static bool AloitusNakyma;

        /// <summary>Silmukka on tilassa Aloitus: näytä aloitusnäkymä (Jatka / Uusi matka).</summary>
        public event Action AloitusTarjolla;

        /// <summary>Kelvollinen tallennus odottaa jatkamista (aloitusnäkymän Jatka-nappi).</summary>
        public bool TallennusOn => jatkettava != null;
        Matka jatkettava;

        /// <summary>Lähtökaupungit (web start: true; paketin kaupungit.aloitus) laudan järjestyksessä.</summary>
        public List<(string Id, string Nimi)> Lahtokaupungit() =>
            verkko == null ? new List<(string, string)>()
                : verkko.KaupunkiLista.Where(k => k.Aloitus).Select(k => (k.Id, k.Nimi)).ToList();

        /// <summary>
        /// Kaikki unohdetut aarteet löytyivät (web NATIIVI_SAAVUTUKSET.kaikkiAarteet, kerran
        /// per matka). Vaellustilassa ei ole voittajaa (web checkWin vain moninpelissä); tämä on
        /// matkan huipennus. Peli jatkuu (Jatka vaeltamista = sulje), Uusi matka = UusiMatka.
        /// </summary>
        public event Action<MatkanYhteenveto> KaikkiAarteetLoytyi;

        /// <summary>Matkan yhteenveto (päivät, kaupungit, aarteet, jakoteksti) tai null.</summary>
        public MatkanYhteenveto Yhteenveto() => matka == null ? null : MatkanYhteenveto.Laske(matka, Laukku());

        // --- äänitapahtumat (Natiivi-UI:n äänimoottori) ---------------------

        /// <summary>
        /// Tehoste webin sfx.play-tunnuksella (Aanitunnukset: correct, wrong, hint, swipe,
        /// quizOpen, tick, timeout, arrive, dieLand, coin, ferry, flight, stuck, turn, star, gem,
        /// empty). UI:n omat napit (click, paper, pen) soittaa näkymä itse.
        /// </summary>
        public event Action<string> Aani;

        /// <summary>Lennon ääni kamera-ajon ajan (web sfx.startFlight(ms) / stopFlight): (alkaa, kesto s).</summary>
        public event Action<bool, float> LentoAani;

        void Aanita(string tunnus)
        {
            if (tunnus == null) return;
            aaniLoki.Add(tunnus);
            if (aaniLoki.Count > 12) aaniLoki.RemoveAt(0);
            try { Aani?.Invoke(tunnus); } catch (Exception e) { Debug.LogException(e); }
        }

        readonly List<string> aaniLoki = new List<string>();
        bool lentoSoi;
        void Lentoaani(bool alkaa, float kestoS = 0)
        {
            if (alkaa == lentoSoi) return;
            lentoSoi = alkaa;
            try { LentoAani?.Invoke(alkaa, kestoS); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>Kokoelma julisteet (ja eläintäyt) laukkua varten; null ennen latausta.</summary>
        Kauppasisalto kauppasisalto;

        /// <summary>
        /// Matkalaukun sisältö (web #passport-dialog): kukkaro, tietäjätaso, tilastot,
        /// Aarnin luettelo, tavarat ja julisteet. null ennen kuin peli on valmis.
        /// linssejaOmistetaan: Linssisepän omistustieto tyhjän laukun tekstiin.
        /// </summary>
        public LaukkuNaytto Laukku(bool linssejaOmistetaan = false) =>
            matka == null ? null : Natiivi.Laukku.Rakenna(matka, aarrenimet, kauppasisalto, linssejaOmistetaan);

        List<MatkaVaihtoehto> vaihtoehdot = new List<MatkaVaihtoehto>();
        readonly List<string> tapahtumat = new List<string>();
        string saapumisKaupunki;
        (double Lat, double Lon) matkaKohde;
        Action kameranOhitus;
        Action ajoValmis;
        int ajoTunnus;
        float ajoLoppuu;
        bool ohitaPisteTarkistus;

        static string Documents => Application.persistentDataPath;
        static string TallennusPolku => Path.Combine(Documents, "tallennus.json");
        /// <summary>Passi (leimat) on pelaajan oma eikä pelin: säilyy uuden pelin yli (web localStorage 'matkakirja.passi.v1').</summary>
        static string PassiPolku => Path.Combine(Documents, "passi.json");

        // --- linssit, passi ja radio (B8, B9, B14; Linssiseppä) ------------------

        Passi passi;
        Linssiomistus linssit;
        Linssirekisteri kytkettyRekisteri;
        /// <summary>Linssien omistus ja hankinta (null ennen peliä). Linssirekisteri.Omistaa kytketään tähän.</summary>
        public Linssiomistus Linssit => linssit;
        public Passi Passi => passi;
        /// <summary>Radiotila (Linssiseppä): kaupungin napautus on play-nappi, ei korttia eikä matkavalintaa. null = sallittu.</summary>
        public static Func<bool> NapautusSallittu;
        /// <summary>Radiotila: luentojen ääni vaimeana (web luentaSallittu), tila päivittyy silti. null = sallittu.</summary>
        public static Func<bool> LuentaSallittu;
        /// <summary>Pelaajan kaupunki (reitillä null): radion oma kaupunki (web sääntö 1).</summary>
        public string PelaajanKaupunki => matka != null && matka.Tila.Pelaaja.Sijainti.Kaupungissa ? matka.Tila.Pelaaja.Sijainti.Kaupunki : null;

        void LataaPassi()
        {
            try { passi = File.Exists(PassiPolku) ? Passi.Lue(File.ReadAllText(PassiPolku)) : new Passi(); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: passi ei kelpaa (" + e.Message + "), tyhjä passi"); passi = new Passi(); }
            passi.Muuttui += () =>
            {
                try { PeliApu.KirjoitaAtomisesti(PassiPolku, passi.Kirjoita()); }
                catch (Exception e) { Debug.LogError("MATKAKIRJA peli: passin tallennus epäonnistui: " + e.Message); }
            };
        }

        /// <summary>Linssirekisterin omistus ja kynnyssääntö (omistajan sääntö, Linssiseppä) linssiomistukseen.</summary>
        void KytkeRekisteri()
        {
            var r = LinssiOhjain.Rekisteri;
            if (r == null || linssit == null || r == kytkettyRekisteri) return;
            kytkettyRekisteri = r;
            r.Omistaa = linssit.Omistaa;
        }
        static string TavoitePolku => Path.Combine(Documents, "peli-tavoite.txt");
        static string PoisPolku => Path.Combine(Documents, "peli-pois.txt");
        static string SisaltoKansio => Path.Combine(Documents, "sisalto");
        static string ViimeisinPolku => Path.Combine(SisaltoKansio, "viimeisin.txt");

        // --- käynnistys -----------------------------------------------------

        /// <summary>
        /// Itsekäynnistys kohtauksen latauksen jälkeen. Julkinen, jotta sen voi
        /// kutsua myös käsin (esim. KaupunkiMerkit.Start), jos alusta ei kutsuisi
        /// attribuuttia; toinen kutsu ei tee mitään.
        /// </summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        public static void Kaynnista()
        {
            if (Instanssi != null) return;
            var kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto == null)
            {
                Debug.LogWarning("MATKAKIRJA peli: kohtauksessa ei ole PalloKiertoa, pelisilmukka ei käynnisty");
                return;
            }
            var go = new GameObject("PeliOhjain");
            var o = go.AddComponent<PeliOhjain>();
            o.Alusta(kierto, FindAnyObjectByType<KaupunkiMerkit>());
        }

        void Awake()
        {
            if (Instanssi != null && Instanssi != this) { Destroy(gameObject); return; }
            Instanssi = this;
        }

        void OnDestroy()
        {
            if (Instanssi == this) Instanssi = null;
            if (kierto != null) { kierto.KaupunkiNapautettu -= Napautettu; kierto.Napautettu -= PalloNapautettu; kierto.PelaajanEle -= KarttaKosketettu; }
            if (lehtiNakyma != null) lehtiNakyma.Suljettu -= LehtiSuljettu;
        }

        void Alusta(PalloKierto k, KaupunkiMerkit m)
        {
            kierto = k;
            merkit = m;
            KytkeReitit();
            TMP_FontAsset fontti = m != null ? m.fontti : null;
            if (fontti == null) { var kortti = FindAnyObjectByType<NimiKortti>(); if (kortti != null) fontti = kortti.fontti; }

            LuoTapahtumajarjestelma();
            tilarivi = PeliNakymat.Tilarivi?.Invoke(gameObject);
            if (tilarivi == null) { var t = gameObject.AddComponent<Tilarivi>(); t.Rakenna(fontti); tilarivi = t; }
            dialogi = PeliNakymat.MatkaValinta?.Invoke(gameObject);
            if (dialogi == null) { var d = gameObject.AddComponent<MatkaDialogi>(); d.Rakenna(fontti); dialogi = d; }
            kysymysNakyma = PeliNakymat.Kysymys?.Invoke(gameObject);
            if (kysymysNakyma == null) { var kd = gameObject.AddComponent<KysymysDialogi>(); kd.Rakenna(fontti); kysymysNakyma = kd; }
            kaupunkiKortti = PeliNakymat.KaupunkiKortti?.Invoke(gameObject);
            lehtiNakyma = PeliNakymat.Lehti?.Invoke(gameObject);
            kysymysToiminnot = new KysymysToiminnot
            {
                Vastaa = i => Vastaa(i),
                Vihje = () => Vihje(),
                Puolita = () => Puolita(),
                Jatka = () => JatkaKysymyksesta(),
                Aloita = () => AloitaKysymys(),
            };
            AlustaSahke();
            gameObject.AddComponent<PeliKomennot>().ohjain = this;
            puhe = Puhe.Hae();
            puhe.Puhuu += PuheMuuttui;

            ((IKamera)kierto).KaupunkiNapautettu += Napautettu;
            // Pallon kosketus peruu pöllön valintavihjeen (web kartallaKosketettu, PeliOhjain.Liiku.cs).
            kierto.Napautettu += PalloNapautettu;
            kierto.PelaajanEle += KarttaKosketettu;
            // Heittonapin päältä alkava veto ei pyöritä palloa.
            SyoteLukko.LisaaPeitto(p => Kaytossa && dialogi.PeittaaPisteen(p));
            // Lehti peittää pallon: pallo piirtää harvemmin sen ajan (NakymaPeitetty).
            if (lehtiNakyma != null)
            {
                SyoteLukko.LisaaNakymaPeitto(() => lehtiNakyma.Auki);
                lehtiNakyma.Suljettu += LehtiSuljettu;
            }
            AlustaAanet();

            if (File.Exists(PoisPolku))
            {
                Debug.Log("MATKAKIRJA peli: " + PoisPolku + " löytyi, pelisilmukka pois päältä");
                AsetaKaytossa(false);
            }
            LataaPassi();
            StartCoroutine(Lataa());
        }

        /// <summary>UGUI-napit tarvitsevat EventSystemin; projekti käyttää vain Input Systemiä.</summary>
        static void LuoTapahtumajarjestelma()
        {
            if (EventSystem.current != null || FindAnyObjectByType<EventSystem>() != null) return;
            var go = new GameObject("EventSystem", typeof(EventSystem));
            var moduuli = go.AddComponent<InputSystemUIInputModule>();
            moduuli.AssignDefaultActions();
        }

        /// <summary>Pelisilmukka päälle tai pois (pois: 3D:n napautus ja nimikortti toimivat kuten ennen).</summary>
        public void AsetaKaytossa(bool paalla)
        {
            Kaytossa = paalla;
            foreach (var c in GetComponentsInChildren<Canvas>(true)) c.enabled = paalla;
            if (!paalla)
            {
                dialogi.Piilota(); dialogi.PiilotaHeitto(); kysymysNakyma.Piilota();
                if (sahkeKorttiKaupunki != null) SuljeSahkekortti();
                if (Tila == SilmukanTila.Dialogi || Tila == SilmukanTila.Kysymys) Tila = SilmukanTila.Kartta;
            }
            else if (AvoinTehtava != Tehtava.Ei) NaytaKysymys();
            else PaivitaNakyma();
            PaivitaNappula();
            KaytossaMuuttui?.Invoke(paalla);
        }

        // --- sisältö --------------------------------------------------------

        static string Valimuisti(string polku) =>
            Path.Combine(SisaltoKansio, polku.Replace('/', Path.DirectorySeparatorChar));

        IEnumerator HaeVersio()
        {
            versioPolku = null;
            using (var p = UnityWebRequest.Get(Sisalto.Osoitin))
            {
                p.timeout = 10;
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success)
                {
                    try { versioPolku = JsonUtility.FromJson<Sisalto.OsoitinTiedot>(p.downloadHandler.text)?.polku; }
                    catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: uusin.json ei jäsenny: " + e.Message); }
                }
                if (string.IsNullOrEmpty(versioPolku) && File.Exists(ViimeisinPolku))
                {
                    versioPolku = File.ReadAllText(ViimeisinPolku).Trim();
                    Debug.LogWarning($"MATKAKIRJA peli: osoitin ei vastaa ({p.error}), käytetään {versioPolku}");
                }
            }
        }

        /// <summary>Kokoelma raakatekstinä välimuistista tai ämpäristä. valmis(null) = ei saatu.</summary>
        IEnumerator HaeKokoelma(string kokoelma, bool ohitaValimuisti, Action<string> valmis) =>
            HaeTiedosto("kokoelmat/" + kokoelma + ".json", ohitaValimuisti, false, valmis);

        /// <summary>Versiokansion tiedosto (esim. kokoelmat/reitit.json). hiljaa = puuttuminen ei ole virhe.</summary>
        IEnumerator HaeTiedosto(string suhteellinen, bool ohitaValimuisti, bool hiljaa, Action<string> valmis)
        {
            string polku = versioPolku + suhteellinen;
            string tiedosto = Valimuisti(polku);
            if (!ohitaValimuisti && File.Exists(tiedosto))
            {
                valmis(File.ReadAllText(tiedosto));
                yield break;
            }
            using var k = UnityWebRequest.Get(Sisalto.Juuri + polku);
            k.timeout = 30;
            yield return k.SendWebRequest();
            if (k.result != UnityWebRequest.Result.Success)
            {
                if (hiljaa) Debug.Log($"MATKAKIRJA peli: {polku} ei saatavilla ({k.responseCode})");
                else Debug.LogError($"MATKAKIRJA peli: {polku} epäonnistui: {k.error}");
                valmis(null);
                yield break;
            }
            var teksti = k.downloadHandler.text;
            try
            {
                // Atomisesti: Sisalto.cs lukee samaa välimuistia rinnakkain.
                PeliApu.KirjoitaAtomisesti(tiedosto, teksti);
                PeliApu.KirjoitaAtomisesti(ViimeisinPolku, versioPolku);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: välimuistiin ei voitu kirjoittaa: " + e.Message); }
            valmis(teksti);
        }

        IEnumerator Lataa()
        {
            Tila = SilmukanTila.Lataa;
            tilarivi.Aseta("Haetaan matkakirjaa…");
            for (int yritys = 0; ; yritys++)
            {
                yield return HaeVersio();
                if (versioPolku != null)
                {
                    string kaupungit = null, reitit = null;
                    // Toisella yrityksellä ohitetaan välimuisti (rikkinäinen tai kesken kirjoitettu tiedosto).
                    bool ohita = yritys % 2 == 1;
                    yield return HaeKokoelma("kaupungit", ohita, t => kaupungit = t);
                    yield return HaeKokoelma("reitit", ohita, t => reitit = t);
                    if (kaupungit != null && reitit != null)
                    {
                        try
                        {
                            verkko = new Reittiverkko(SisaltoTuonti.LueKaupungit(kaupungit), SisaltoTuonti.LueReitit(reitit));
                            Debug.Log($"MATKAKIRJA peli: sisältö {versioPolku}, {verkko.Kaupungit.Count} kaupunkia, {verkko.Reitit.Count} reittiä, {verkko.Lennot.Count} lentoa");
                        }
                        catch (Exception e) { Virhe("Sisältöpaketti ei jäsenny: " + e.Message); verkko = null; }
                        if (verkko != null) break;
                    }
                }
                Tila = SilmukanTila.Virhe;
                tilarivi.Aseta("Matkakirjaa ei saatu — yritetään uudelleen");
                yield return new WaitForSecondsRealtime(yritys < 3 ? 3f : 15f);
            }
            AloitaAanitaulut();
            StartCoroutine(HaeMaamerkit()); // taustalla (PeliOhjain.Maamerkit.cs)

            yield return HaeLaattamaarat();
            AloitaTaiJatka();
            KaynnistaSahke();
            yield return HaeKysymykset();
            yield return HaeLuennat();
        }

        /// <summary>
        /// Aarrelaattojen määrät: kokoelma kokoelmat/laatat.json (Siirtoseppä #2944; päätason maarat,
        /// skeema 1.26). Webin moduulin varareitti (moduulit/js/packs/maailmankartta.json) on poistettu
        /// 24.9.2026: se oli raakaa dataa, ja jokaisessa ämpärin paketissa on kokoelma laatat.
        /// Ei saatu → null = peli ilman laattoja (erän 1–2 muodot).
        /// </summary>
        IEnumerator HaeLaattamaarat()
        {
            Laattamaarat = null;
            // Määrät kirjoitetaan kerran pieneksi tiedostoksi versiokansion viereen.
            var tiivis = Valimuisti(versioPolku + "peli/laattamaarat.json");
            try
            {
                if (File.Exists(tiivis)) Laattamaarat = Laattamaarat.Lue(File.ReadAllText(tiivis));
                if (Laattamaarat != null && Laattamaarat.Yhteensa > 0) { Debug.Log($"MATKAKIRJA peli: laattoja {Laattamaarat.Yhteensa} (välimuisti)"); yield break; }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: laattamäärien välimuisti ei kelpaa: " + e.Message); }
            Laattamaarat = null;
            foreach (var polku in new[] { "kokoelmat/laatat.json" })
            {
                string teksti = null;
                yield return HaeTiedosto(polku, false, true, t => teksti = t);
                if (teksti == null) continue;
                try
                {
                    var m = Laattamaarat.Lue(teksti);
                    if (m.Yhteensa <= 0) throw new FormatException("ei yhtään laattaa");
                    Laattamaarat = m;
                    Debug.Log($"MATKAKIRJA peli: laattoja {m.Yhteensa} ({polku})");
                    PeliApu.KirjoitaAtomisesti(tiivis, PeliApu.LaattamaaratJson(m));
                    yield break;
                }
                catch (Exception e) { Debug.LogWarning($"MATKAKIRJA peli: {polku} ei kelpaa laattamääriksi: {e.Message}"); }
            }
            Debug.LogWarning("MATKAKIRJA peli: laattamääriä ei saatu, peli ilman aarrelaattoja");
        }

        IEnumerator HaeKysymykset()
        {
            string kysymykset = null, kaari = null, paikat = null;
            yield return HaeKokoelma("kysymykset", false, t => kysymykset = t);
            yield return HaeKokoelma("tarinakaari", false, t => kaari = t);
            yield return HaeKokoelma("paikkatiedot", false, t => paikat = t);
            string pulmaTeksti = null, kuvaTeksti = null, lippuTeksti = null, kohtaamisTeksti = null;
            yield return HaeTiedosto("kokoelmat/kohtaamiset.json", false, true, t => kohtaamisTeksti = t);
            string kuvaKohtaamiset = null, laattaTeksti = null, paikallisTeksti = null, saannotTeksti = null;
            yield return HaeTiedosto("kokoelmat/kohtaamiskuvat.json", false, true, t => kuvaKohtaamiset = t);
            yield return HaeTiedosto("kokoelmat/laatat.json", false, true, t => laattaTeksti = t);
            yield return HaeTiedosto("kokoelmat/paikallisaarteet.json", false, true, t => paikallisTeksti = t);
            yield return HaeTiedosto("kokoelmat/saannot.json", false, true, t => saannotTeksti = t);
            string elaintayt = null, julisteet = null;
            yield return HaeTiedosto("kokoelmat/elaintayt.json", false, true, t => elaintayt = t);
            yield return HaeTiedosto("kokoelmat/julisteet.json", false, true, t => julisteet = t);
            string fokusvirrat = null, lehtitehtavat = null;
            yield return HaeTiedosto("kokoelmat/fokusvirrat.json", false, true, t => fokusvirrat = t);
            // Lehtitehtävien palkinnot (skeema 1.26: fokusvirran päätason lehtitehtavat on id-lista).
            yield return HaeTiedosto("kokoelmat/lehtitehtavat.json", false, true, t => lehtitehtavat = t);
            try
            {
                fokus = Fokusdata.Lue(fokusvirrat, lehtitehtavat: lehtitehtavat);
                LueSahketehtavat(fokusvirrat);
                if (KulttuurivisaTarjolla != null) fokus.Kulttuurivisa = KulttuurivisaTarjolla;
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: fokusvirrat eivät jäsenny: " + e.Message); }
            try { kauppasisalto = Kauppasisalto.Lue(elaintayt, julisteet); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: julisteet tai eläintäyt eivät jäsenny: " + e.Message); }
            try
            {
                // Löytöjen manner- ja maakohtaiset nimet (web aarreMantereella).
                if (laattaTeksti != null) aarrenimet.LueLaatat(laattaTeksti);
                if (paikallisTeksti != null) aarrenimet.LuePaikallisaarteet(paikallisTeksti);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: aarrenimet eivät jäsenny: " + e.Message); }
            yield return HaeTiedosto("kokoelmat/kuvakysymykset.json", false, true, t => kuvaTeksti = t);
            yield return HaeTiedosto("kokoelmat/lippumaat.json", false, true, t => lippuTeksti = t);
            try { LueKuvatJaLiput(kuvaTeksti, lippuTeksti); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: kuva- tai lippukysymykset eivät jäsenny: " + e.Message); }
            yield return HaeTiedosto("kokoelmat/pulmat.json", false, true, t => pulmaTeksti = t);
            try { if (pulmaTeksti != null) pulmadata = Pulmadata.Lue(pulmaTeksti); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: pulmat eivät jäsenny: " + e.Message); }
            if (kysymykset == null) yield break;
            try
            {
                var d = new Kysymysdata();
                d.LueKysymykset(kysymykset);
                if (kaari != null) d.LueTarinakaari(kaari);
                kohtaamiset = new Kohtaamiset();
                // Kaikki laudan kaupungit avaimiksi: kuvat kohdistetaan nimellä (web kuvaAvain).
                foreach (var id in verkko.Kaupungit.Keys) kohtaamiset.Kaupungit[id] = new Kohtaaminen();
                if (kaari != null) kohtaamiset.LueTarinakaari(kaari);
                if (kohtaamisTeksti != null) kohtaamiset.LueKohtaamiset(kohtaamisTeksti);
                if (kuvaKohtaamiset != null) kohtaamiset.LueKohtaamiskuvat(kuvaKohtaamiset);
                if (saannotTeksti != null) kohtaamiset.LueSaannot(saannotTeksti);
                if (paikat != null) d.LuePaikkatiedot(paikat);
                Kysymykset = d;
                KytkeKysely();
                Debug.Log($"MATKAKIRJA peli: kysymyksiä {d.Kaupungeittain.Sum(x => x.Value.Count)} kaupungeissa, {d.Yleiset.Count} yleistä, {d.Kaaret.Count} kaarta");
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: kysymykset eivät jäsenny: " + e.Message); }
            if (kysely == null) SuljeAvoinKysymys();
        }

        /// <summary>Kokoelmat kuvakysymykset ja lippumaat (skeema 1.9): kuvapooli, liput ja valmiit osoitteet.</summary>
        void LueKuvatJaLiput(string kuvat, string liput)
        {
            kuvakokoelmat = Kuvakokoelmat.Lue(kuvat, liput);
            Debug.Log($"MATKAKIRJA peli: kuvakysymyksiä {kuvakokoelmat.Kuvat?.Count ?? 0}, lippumaita {kuvakokoelmat.Liput?.Count ?? 0}");
        }

        /// <summary>Saapumispuheet (v2:ssa) ja luennat (tuleva kokoelma); kumpikin valinnainen.</summary>
        IEnumerator HaeLuennat()
        {
            string puheet = null, luennatTeksti = null;
            yield return HaeTiedosto("kokoelmat/saapumispuheet.json", false, true, t => puheet = t);
            yield return HaeTiedosto("kokoelmat/luennat.json", false, true, t => luennatTeksti = t);
            try
            {
                if (puheet != null) luennat.LueSaapumispuheet(puheet);
                if (luennatTeksti != null) luennat.LueLuennat(luennatTeksti);
                Debug.Log($"MATKAKIRJA peli: saapumispuheita {luennat.Saapumispuheita}, luentoja {luennat.Luentoja}");
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: luennat eivät jäsenny: " + e.Message); }
        }

        /// <summary>
        /// Kauppa- tai palkkioteko (Natiivi-UI: lehti, pulu, sähke, mannerlento):
        /// ajaa teon, tallentaa ja päivittää näkymän. Mannerlento siirtää kameran.
        /// Esim. PeliOhjain.Instanssi.KauppaTeko(k => k.Kulttuuri(id, oikein)).
        /// </summary>
        public KauppaTulos KauppaTeko(Func<Kaupat, KauppaTulos> teko, string rahanSyy = null)
        {
            rahaSyy = rahanSyy;
            if (kaupat == null || matka == null) return KauppaTulos.Epaonnistui("peli ei ole valmis");
            var lahto = matka.Tila.Pelaaja.Sijainti;
            tapahtumat.Clear();
            KauppaTulos t;
            int rahaEnnen = matka.Tila.Pelaaja.Raha;
            try { t = teko(kaupat); }
            catch (Exception e) { Debug.LogException(e); rahaSyy = null; return KauppaTulos.Epaonnistui(e.Message); }
            if (!t.Ok) { rahaSyy = null; return t; }
            if (matka.Tila.Pelaaja.Raha > rahaEnnen) Aanita(Aanitunnukset.Kolikot);
            Tallenna();
            if (tapahtumat.Count > 0) Viesti(string.Join(" · ", tapahtumat));
            if (Tila == SilmukanTila.Lehti || Tila == SilmukanTila.Matkalla) { tilarivi.Aseta(PeliApu.TilaTeksti(verkko, matka.Tila)); return t; }
            if (AvoinTehtava != Tehtava.Ei) { Tila = SilmukanTila.Kartta; NaytaKysymys(); }
            else if (!matka.Tila.Pelaaja.Sijainti.Equals(lahto)) Kartalle(true);
            else PaivitaNakyma();
            return t;
        }

        Luento odottavaLuento, soivaLuento;
        List<(double AikaS, LuentaReaktio Reaktio)> reaktioJono;
        int reaktioSeuraava;

        void PuheMuuttui(bool puhuu)
        {
            if (puhuu)
            {
                soivaLuento = odottavaLuento != null && puhe.SoivaUrl == odottavaLuento.Url ? odottavaLuento : null;
                odottavaLuento = null;
                reaktioJono = soivaLuento?.Reaktiot.Count > 0 ? soivaLuento.ReaktioAjat(puhe.Kesto > 0 ? puhe.Kesto : soivaLuento.Kesto ?? 0) : null;
                reaktioSeuraava = 0;
                if (soivaLuento != null)
                {
                    Livia("narration");
                    try { LuentoAlkoi?.Invoke(soivaLuento.Kaupunki, soivaLuento); } catch (Exception e) { Debug.LogException(e); }
                }
            }
            else if (soivaLuento != null)
            {
                var kaupunki = soivaLuento.Kaupunki;
                soivaLuento = null;
                reaktioJono = null;
                Livia("narrationEnd");
                try { LuentoLoppui?.Invoke(kaupunki); } catch (Exception e) { Debug.LogException(e); }
            }
        }

        /// <summary>Luennan kuuntelureaktiot ajallaan (web luentareaktiot.js).</summary>
        void PaivitaReaktiot()
        {
            if (reaktioJono == null || soivaLuento == null || !puhe.Soi) return;
            while (reaktioSeuraava < reaktioJono.Count && reaktioJono[reaktioSeuraava].AikaS <= puhe.Aika)
            {
                var r = reaktioJono[reaktioSeuraava++].Reaktio;
                Livia("reaction", r.Tarkoitus, r.Voimakkuus);
            }
        }

        /// <summary>Soittaa luennan (kaiutinnappi, testikomento). Palauttaa virheen tai null.</summary>
        public string SoitaLuento(Luento l, float viiveS = 0)
        {
            if (l == null) return "luentoa ei ole";
            if (!Puhe.Paalla) return "luennat pois päältä";
            if (LuentaSallittu != null && !LuentaSallittu()) return "radio soi";
            odottavaLuento = l;
            if (!puhe.Soita(l.Url, viiveS)) { odottavaLuento = null; return "ei soi"; }
            Debug.Log("MATKAKIRJA peli: luento " + (l.Id ?? l.Kaupunki) + " " + l.Url);
            return null;
        }

        // --- peli ja tallennus ----------------------------------------------

        void AloitaTaiJatka()
        {
            matka = null;
            jatkettava = null;
            if (File.Exists(TallennusPolku))
            {
                try
                {
                    // Laattamäärillä vanha (versio 1–2) tallennus saa laatat; versio 3 käyttää omiaan.
                    var m = Laattamaarat != null
                        ? Matka.Lataa(verkko, File.ReadAllText(TallennusPolku), Laattamaarat)
                        : Matka.Lataa(verkko, File.ReadAllText(TallennusPolku));
                    if (PeliApu.Koordinaatti(verkko, m.Tila.Pelaaja.Sijainti) == null)
                        throw new FormatException("sijainti " + m.Tila.Pelaaja.Sijainti + " ei ole laudalla");
                    matka = m;
                    Debug.Log("MATKAKIRJA peli: jatketaan tallennuksesta, " + PeliApu.TilaTeksti(verkko, m.Tila));
                }
                catch (Exception e)
                {
                    // Talteen ennen kuin uusi peli korvaa tiedoston: uudemman sovelluksen
                    // tallennus (UudempiTallennus) omalla nimellään, jotta päivitetty
                    // sovellus tai tuki voi palauttaa sen; aikaleima ettei edellinen katoa.
                    var nimi = (e is UudempiTallennus u ? "tallennus-v" + u.Versio : "tallennus-rikki")
                        + "-" + DateTime.UtcNow.ToString("yyyyMMdd-HHmmss", System.Globalization.CultureInfo.InvariantCulture) + ".json";
                    Debug.LogWarning("MATKAKIRJA peli: tallennus ei kelpaa (" + e.Message + "), talteen " + nimi + ", aloitetaan uusi peli");
                    try { File.Copy(TallennusPolku, Path.Combine(Documents, nimi), true); } catch { }
                }
            }
            if (matka != null && matka.Tila.Vaihe == Vaihe.Ohi) matka = null;
            if (AloitusNakyma)
            {
                jatkettava = matka;
                matka = null;
                Tila = SilmukanTila.Aloitus;
                tilarivi.Aseta("");
                PaivitaNappula();
                Debug.Log("MATKAKIRJA peli: aloitusnäkymä, tallennus " + (jatkettava != null ? "on" : "ei"));
                try { AloitusTarjolla?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
                return;
            }
            if (matka == null)
            {
                UusiPeli(null);
                // Isoisän avaus uuden matkan alussa (web playIntroVoice).
                SoitaLuento(luennat.Intro, 1.0f);
                return;
            }
            JatkaMatkaa();
        }

        /// <summary>Aloitusnäkymän Jatka: tallennettu matka jatkuu. Palauttaa virheen tai null.</summary>
        public string Jatka()
        {
            using var _ = Ajoita("jatka");
            if (Tila != SilmukanTila.Aloitus) return "silmukka on tilassa " + Tila;
            if (jatkettava == null) return "tallennusta ei ole";
            matka = jatkettava;
            jatkettava = null;
            JatkaMatkaa();
            return null;
        }

        /// <summary>
        /// Uusi matka lähtökaupungista (aloitusnäkymä, voiton Uusi matka). null = Pariisi.
        /// Korvaa tallennuksen. Palauttaa virheen tai null.
        /// </summary>
        public string UusiMatka(string lahtokaupunki, long? siemen = null)
        {
            using var _ = Ajoita("uusiMatka");
            if (verkko == null) return "sisältö ei ole vielä latautunut";
            if (lahtokaupunki != null && !Lahtokaupungit().Any(k => k.Id == lahtokaupunki)) return "ei lähtökaupunki: " + lahtokaupunki;
            if (Tila != SilmukanTila.Aloitus && Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi) return "silmukka on tilassa " + Tila;
            jatkettava = null;
            UusiPeli(siemen, lahtokaupunki);
            // Aloituskaava (omistaja 24.9.2026 klo 16.1x): intro soi avausruudulla ennen karttaa (Natiivi-UI,
            // SoitaIntro); valintaan siirtyminen ohittaa sen, ja kone lentää Lontoosta valittuun kaupunkiin (PeliOhjain.Aloitus.cs).
            // Ilman lentoa (Lontoo, ei nappulaa) valinta keskeyttää intron silti (web doPickStart); aloitusnäkymän
            // ulkopuolella (voiton Uusi matka) intro soi tässä.
            if (!AloitaAloituslento(matka.Tila.Pelaaja.Sijainti.Kaupunki))
            {
                if (AloitusNakyma) OhitaLuento();
                else SoitaLuento(luennat.Intro, 1.0f);
            }
            return null;
        }

        void JatkaMatkaa()
        {
            Kytke(matka);
            try { Tavoite = File.Exists(TavoitePolku) ? File.ReadAllText(TavoitePolku).Trim() : null; } catch { Tavoite = null; }
            if (Tavoite != null && !verkko.Kaupungit.ContainsKey(Tavoite)) Tavoite = null;
            // Auki jäänyt kysymys avataan uudelleen, kun kysymykset on ladattu (KytkeKysely).
            Kartalle(true);
            // Heiton ja siirron väliin jäänyt tallennus: tavoitteen kanssa siirrytään heti, muuten kohteet
            // odottavat kartalla (web: vaihe 'move' latautuu korostettuine kohteineen).
            if (matka.Tila.Vaihe == Vaihe.Siirto && Tavoite != null)
                Matkusta(Tavoite, matka.Tila.Kulkutapa ?? Kulkutapa.Maa);
        }

        /// <summary>
        /// Uusi peli lähtökaupungista (null = Pariisi tai paketin ensimmäinen aloituskaupunki).
        /// siemen null = kellosta.
        /// </summary>
        public void UusiPeli(long? siemen, string lahtokaupunki = null)
        {
            if (verkko == null) return;
            var aloitus = lahtokaupunki != null && verkko.Kaupungit.ContainsKey(lahtokaupunki) ? lahtokaupunki
                : verkko.Kaupungit.ContainsKey(AloitusKaupunki) ? AloitusKaupunki
                : (verkko.KaupunkiLista.FirstOrDefault(k => k.Aloitus) ?? verkko.KaupunkiLista[0]).Id;
            if (LehtiAuki) SuljeLehti();
            jatkettava = null;
            var rng = new Satunnainen(siemen ?? (long)(uint)DateTime.UtcNow.Ticks);
            matka = Laattamaarat != null
                ? Matka.UusiPeli(verkko, rng, PelaajanNimi, aloitus, Laattamaarat)
                : Matka.UusiPeli(verkko, rng, PelaajanNimi, aloitus);
            Kytke(matka);
            Tavoite = null;
            Viimeisin = null;
            kysymysNakyma.Piilota();
            KysymysTila = null;
            Tallenna();
            Debug.Log("MATKAKIRJA peli: uusi peli, " + PeliApu.TilaTeksti(verkko, matka.Tila));
            IlmoitaUusiMatka();
            Kartalle(true);
        }

        void Kytke(Matka m)
        {
            using var _ = Ajoita("kytke");
            linssit = new Linssiomistus(passi ?? new Passi(), m.Tila.Linssit).Kytke(m);
            linssit.Kynnyssaanto = Linssirekisteri.Kynnys;   // omistajan sääntö (1400: radio ja topografia)
            kytkettyRekisteri = null;
            KytkeRekisteri();
            m.Tapahtui += (laji, teksti) => { tapahtumat.Add(teksti); if (m == matka) Aanita(Aanitunnukset.Tapahtuma(laji)); };
            m.Loysi += (p, l) =>
            {
                kysymysLoyto = l;
                // Aarreääni (star/gem/empty) ei soi tässä: web soittaa treasureSound(type) vasta laatan
                // paljastuskortilla (ui.js playTokenReveal), joten UI soittaa Aanitunnukset.Aarre(tyyppi) itse.
                if (l.Tyyppi != Laattatyypit.Paaaarre || m != matka) return;
                var yv = MatkanYhteenveto.Laske(m, Laukku());
                if (!yv.KaikkiLoytyi) return;
                Debug.Log("MATKAKIRJA peli: kaikki aarteet löytyivät, " + yv.Teksti);
                try { KaikkiAarteetLoytyi?.Invoke(yv); } catch (Exception e) { Debug.LogException(e); }
            };
            // Tietäjätason nousu (web pöllön onnittelukupla) kysymyksen tulokseen tai matkan viestiin.
            m.Kokemus.TasoNousi += (p, taso) =>
            {
                var rivi = $"Uusi tietäjätaso: {taso.Nimi}" + (string.IsNullOrEmpty(taso.Onnittelu) ? "" : " — " + taso.Onnittelu);
                if (Tila == SilmukanTila.Kysymys) kysymysLisat.Add(rivi); else tapahtumat.Add(rivi);
            };
            SahkeKytke(m);
            rahaNahty = m.Tila.Pelaaja.Raha;
            rahaSyy = null;
            kysely = null;
            KytkeKysely();
        }

        /// <summary>Kysymysmoottori matkaan, kun sekä matka että kysymykset ovat valmiit.</summary>
        void KytkeKysely()
        {
            using var _ = Ajoita("kytkeKysely");
            if (matka == null || Kysymykset == null || (kysely != null && kysely.Matka == matka)) return;
            kysely = new Kysely(matka, Kysymykset);
            kysely.Tapahtui += (laji, teksti) => kysymysLisat.Add(teksti);
            pulmat = pulmadata != null ? Pulmat.Kytke(kysely, pulmadata) : null;
            kaupat = new Kaupat(matka);
            kuvakokoelmat?.Kytke(kysely);
            // Pysy-tapa tuli tarjolle vasta nyt: vuoron alun esivalinta puretaan kuten webissä.
            if (matka.ArvioiEsivalinta()) Tallenna();
            if (AvoinTehtava != Tehtava.Ei) { if (Tila == SilmukanTila.Kartta) NaytaKysymys(); }
            else if (matka.Tila.Vaihe == Vaihe.Kysymys)
                SuljeAvoinKysymys();
            else PaivitaNakyma();
        }

        /// <summary>Kysymysvaihe ilman näytettävää (moottori tai data puuttuu): vuoro päättyy.</summary>
        void SuljeAvoinKysymys()
        {
            if (matka == null) return;
            var v = matka.Tila.Vaihe;
            if (v != Vaihe.Kysymys) return;
            matka.Tila.Kysely.Kysymys = null;
            matka.Tila.Vaihe = Vaihe.Toiminta;
            matka.PaataVuoro();
            Tallenna();
            if (Tila == SilmukanTila.Kysymys) Kartalle(false); else PaivitaNakyma();
        }

        void Tallenna()
        {
            using var _ = Ajoita("tallennus");
            if (matka == null) return;
            // Kuten web (visa.js): jäljellä oleva aika talteen kokonaisina sekunteina.
            if (Tila == SilmukanTila.Kysymys && KysymysTila != null && KysymysTila.Sekunnit.HasValue && !KysymysTila.Vastattu)
            {
                int jaljella = Mathf.Max(1, Mathf.CeilToInt(kysymysJaljella));
                var q = matka.Tila.Kysely.Kysymys;
                if (AvoinTehtava == Tehtava.Kysymys) q.Sekunnit = jaljella;
            }
            try
            {
                using var __ = Ajoita("tallennus.kirjoitus");
                PeliApu.KirjoitaAtomisesti(TallennusPolku, matka.Tallenna());
                PeliApu.KirjoitaAtomisesti(TavoitePolku, Tavoite ?? "");
            }
            catch (Exception e) { Debug.LogError("MATKAKIRJA peli: tallennus epäonnistui: " + e.Message); }
            PaivitaAarrepiste();
            SahkeTallennettu();
            IlmoitaRaha();
            using (Ajoita("tallennus.tilaMuuttui"))
                try { TilaMuuttui?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        void OnApplicationPause(bool tauko)
        {
            // Web visibilitychange: etualalle palatessa sähkeet heti.
            if (!tauko) { SahkeEtualalle(); return; }
            Tallenna();
            // Web taustaHiljennaLuennat: taustalle mentäessä luenta katkeaa (ei jää tauolle).
            if (puhe != null) puhe.Pysayta(0.1f);
        }
        void OnApplicationQuit() => Tallenna();

        // --- kartta, napautus ja matkavalinta ---------------------------------

        void Kartalle(bool kameraPelaajaan)
        {
            using var _ = Ajoita("kartalle");
            PiilotaLentokaaret();
            Lentoaani(false);
            PaataLento();
            dialogi.Piilota();
            PiilotaKortti();
            DialogiKohde = null;
            vaihtoehdot = new List<MatkaVaihtoehto>();
            riviValittu = null;
            Tila = SilmukanTila.Kartta;
            PaivitaNakyma();
            PaivitaNappula();
            if (kameraPelaajaan && Kaytossa) Saavu();
        }

        double SaapumisKaari => merkit != null ? merkit.saapumisKaari : 18.6;

        void PaivitaNakyma()
        {
            if (matka == null) return;
            tilarivi.Aseta(PeliApu.TilaTeksti(verkko, matka.Tila));
            // Web vaihe 'roll': noppa (ja "Vaihda matkustustapa") sekä kesken reittiä että kaupungissa
            // esivalitulla tai itse valitulla noppatavalla (PeliOhjain.Liiku.cs).
            if (Tila == SilmukanTila.Kartta && Kaytossa && matka.Tila.Vaihe == Vaihe.Heitto)
                NaytaHeittonappi(Tavoite != null ? "Heitä noppaa → " + PeliApu.KaupunginNimi(verkko, Tavoite) : "Heitä noppaa", () => Heita());
            else if (Tila == SilmukanTila.Kartta && Kaytossa && matka.Tila.Vaihe == Vaihe.Siirto && Tavoite != null)
                NaytaHeittonappi("Jatka matkaa → " + PeliApu.KaupunginNimi(verkko, Tavoite), () => Heita());
            else
                // Myös siirtovaihe ilman tavoitetta: ei nappia eikä listaa, kohteet korostuvat kartalla (web
                // vaihe 'move', PaivitaSiirtoKohteet; Laitetestaajan pariteettiero 24.9.2026).
                dialogi.PiilotaHeitto();
            PaivitaSiirtoKohteet();
            PaivitaMatkareitit();
            LiikuMuuttui?.Invoke();
            AjastaAutomaattinenHeitto();
        }

        /// <summary>
        /// IKamera.KaupunkiNapautettu. KaupunkiMerkit kutsuu tätä ennen omaa
        /// kamera-ajoaan kaupunkiin, joten pelin oma kameraliike asetetaan
        /// LateUpdateen (kameranOhitus), jolloin se korvaa 3D:n ajon samassa ruudussa.
        /// </summary>
        void Napautettu(string kaupunki)
        {
            using var _ = Ajoita("napautus");
            if (NapautusSallittu != null && !NapautusSallittu()) return;
            if (!Kaytossa || matka == null) return;
            bool uiPaalla = false;
            if (!ohitaPisteTarkistus && Pointer.current != null)
                uiPaalla = dialogi.PeittaaPisteen(Pointer.current.position.ReadValue());

            switch (Tila)
            {
                case SilmukanTila.Dialogi when SiirtoAvain(kaupunki) != null:
                    Siirry(SiirtoAvain(kaupunki));
                    return;
                case SilmukanTila.Dialogi:
                case SilmukanTila.Kysymys:
                case SilmukanTila.Sahketehtava:
                    PysaytaKamera(); // modaalinen: himmennyksen napautus peruu, pallo ei lennä
                    return;
                case SilmukanTila.Matkalla:
                    // Aloituslentoa sormi ei pysäytä (Nappula.AloitusLento hoitaa kameran).
                    if (AloituslentoKaynnissa) return;
                    // Sormi keskeytti matka-ajon: jatketaan kohteeseen (varareitti hoitaa valmis-kutsun).
                    kameranOhitus = () => kierto.Aja(matkaKohde.Lat, matkaKohde.Lon, kierto.KorkeusKaarelle(SaapumisKaari), 0.8f, null);
                    return;
                case SilmukanTila.Kartta:
                    if (uiPaalla) { PysaytaKamera(); return; }
                    // Kehittäjän maailmanäkymä: napautus on saapuminen (löydös 58).
                    if (MaailmaHyppy(kaupunki)) return;
                    // Siirtovaiheessa korostettu kaupunki valitsee siirron (web lauta.js valitseSiirto → doMove).
                    if (SiirtoAvain(kaupunki) != null) { Siirry(SiirtoAvain(kaupunki)); return; }
                    if (kaupunkiKortti != null) { AvaaKorttiAjonJalkeen(kaupunki); return; }
                    AvaaDialogi(kaupunki);
                    return;
                default:
                    return;
            }
        }

        /// <summary>
        /// Kaupunkimerkin ruutupiste kortin avautuessa pikseleinä (origo vasen alakulma). Web lauta.js
        /// napautaKaupunki: merkki vaakasuunnassa neljännekseen leveydestä (LIUSKAN_MERKIN_OSUUS_X 1/4), jotta
        /// liuskalle jää tilaa oikealle, ja pystysuunnassa vapaan kaistan keskelle (kalusteiden ja liuskan
        /// korkeuden mukaan). Natiivi-UI voi asettaa tarkemman pisteen (kaupunki → piste); oletus on ruudun
        /// korkeuden puoliväli.
        /// </summary>
        public static Func<string, Vector2> KortinRuutupiste;

        /// <summary>
        /// Löydös 48 (web napautaKaupunki → kamera.ajaKamera, LIUSKAN_AJO_MS 420 ja LIUSKAN_PEHMENNYS): kamera
        /// panoroi merkin kortin viereen, korkeus, kallistus ja suuntima pysyvät. KaupunkiMerkkien oma lento
        /// kaupunkiin (uloszoomaus, omistajan moite) korvataan samassa ruudussa (kameranOhitus).
        /// </summary>
        void KortinKamera(string kaupunki, Action valmis = null)
        {
            var k = PeliApu.Koordinaatti(verkko, Sijainti.KaupungissaSijainti(kaupunki));
            if (!k.HasValue || kierto == null) { PysaytaKamera(); valmis?.Invoke(); return; }
            Vector2 maali = new Vector2(Screen.width / 4f, Screen.height / 2f);
            try { if (KortinRuutupiste != null) maali = KortinRuutupiste(kaupunki); }
            catch (Exception e) { Debug.LogException(e); }
            double lat = k.Value.Lat, lon = k.Value.Lon;
            kameranOhitus = () => kierto.Panoroi(lat, lon, maali, Panorointi.LiuskanAjoS, valmis);
        }

        int korttiAjo;

        /// <summary>
        /// Liikkumisen pariteetti D17 (web lauta.js napautaKaupunki: await ajaKamera(LIUSKAN_AJO_MS) → ladoLevossa →
        /// avaaLiuskaKaupungista): kortti aukeaa vasta, kun 420 ms:n ajo on perillä, jolloin Natiivi-UI ripustaa sen
        /// merkin uuteen ruutupisteeseen. Sormen keskeyttämä ajo ei kutsu valmista, joten varakutsu ajon keston
        /// jälkeen; kortti aukeaa kerran, ja uusi napautus ohittaa vanhan.
        /// </summary>
        void AvaaKorttiAjonJalkeen(string kaupunki)
        {
            int oma = ++korttiAjo;
            Action avaa = () =>
            {
                if (oma != korttiAjo) return;
                korttiAjo++;
                AvaaKortti(kaupunki);
            };
            KortinKamera(kaupunki, avaa);
            StartCoroutine(Viiveella(Panorointi.LiuskanAjoS + 0.15f, avaa));
        }

        void PysaytaKamera() => kameranOhitus = () => kierto.Aja(kierto.leveys, kierto.pituus, 0, 0.05f, null);

        /// <summary>
        /// Kaupunkikortti (web kaupunkiliuska): Lue kaupunkilehti, Liiku tänne tai omassa kaupungissa
        /// Mannerlento. Napautuksesta kamera siirtyy vain sivuun (KortinKamera), ei lennä kaupunkiin.
        ///
        /// "LIIKU TÄNNE" WEBIN MUKAAN (WEB ON MALLI, Natiivi-UI:n havainto 24.9.2026; web js/pallolauta/lauta.js
        /// napautaKaupunki ja liuskan 'liiku'-rivi): rivi on vain, kun kaupunkiin on nopan siirto tarjolla
        /// (siirtovaihe, game.moveOptions), ja se valitsee siirron suoraan (valitseSiirto → doMove). Ei
        /// kulkutapalistaa: webissä kulkutapa valitaan vain Liiku-liuskasta. Kohdekaupungin napautus valitsee
        /// siirron jo ennen korttia (Napautettu), joten rivi näkyy käytännössä vain webin reunatapauksissa.
        /// </summary>
        public string AvaaKortti(string kaupunki)
        {
            using var _ = Ajoita("kortti");
            if (matka == null) return "peli ei ole valmis";
            if (kaupunkiKortti == null) return AvaaDialogi(kaupunki);
            if (Tila != SilmukanTila.Kartta) return "silmukka on tilassa " + Tila;
            if (!verkko.Kaupungit.ContainsKey(kaupunki)) return "tuntematon kaupunki " + kaupunki;
            // Ei Mannerlento-riviä (liikkumisen pariteetti D13): webin kaupunkiliuskassa on vain Liiku tänne ja aiheet;
            // mannerlento avataan Liiku → Lentäen -listasta (web ui.js 11407–11440), joka on natiivissakin.
            string siirto = SiirtoAvain(kaupunki);
            var t = new KaupunkiToiminnot
            {
                LueLehti = LehtiOn ? () => LueLehti(kaupunki) : (Action)null,
                Liiku = siirto != null ? () => { PiilotaKortti(); ValitseSiirto(siirto); } : (Action)null,
                LiikuTeksti = siirto != null ? LiikuNimio : null,
                Sulje = () => PiilotaKortti(),
            };
            KorttiKaupunki = kaupunki;
            using (Ajoita("kortti.nayta"))
                kaupunkiKortti.Nayta(kaupunki, PeliApu.KaupunginNimi(verkko, kaupunki), t);
            return null;
        }

        /// <summary>Kortin rivin teksti (web js/pallolauta/kaupunkiliuska.js LIIKU_NIMIO).</summary>
        public const string LiikuNimio = "Liiku tänne";

        /// <summary>
        /// Kortin "Liiku tänne" (testikomento 'liiku'): vain nopan siirtokohteeseen, valitsee siirron kuten
        /// kohdemerkki (web valitseSiirto). Muuten virhe: kulkutapa valitaan Liiku-liuskasta.
        /// </summary>
        public string Liiku(string kaupunki)
        {
            var avain = SiirtoAvain(kaupunki);
            if (avain == null) return "ei siirtokohde: " + kaupunki + " (kulkutapa Liiku-liuskasta)";
            PiilotaKortti();
            return ValitseSiirto(avain);
        }

        void PiilotaKortti()
        {
            if (KorttiKaupunki == null) return;
            KorttiKaupunki = null;
            kaupunkiKortti?.Piilota();
        }

        /// <summary>Kaupunkilehti ilman matkaa (kortin "Lue kaupunkilehti"). Palauttaa virheen tai null.</summary>
        public string LueLehti(string kaupunki)
        {
            if (LinssiAuki) return LinssiAukiSyy;
            if (!LehtiOn) return "lehteä ei ole";
            if (Tila != SilmukanTila.Kartta) return "silmukka on tilassa " + Tila;
            PiilotaKortti();
            dialogi.PiilotaHeitto();
            Tila = SilmukanTila.Lehti;
            AvaaLehti(kaupunki);
            return null;
        }

        /// <summary>Avaa matkavalinnan napautettuun kaupunkiin. Palauttaa virheen tai null.</summary>
        public string AvaaDialogi(string kaupunki)
        {
            if (matka == null) return "peli ei ole valmis";
            if (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi) return "silmukka on tilassa " + Tila;
            if (!verkko.Kaupungit.ContainsKey(kaupunki)) return "tuntematon kaupunki " + kaupunki;
            var p = matka.Tila.Pelaaja;
            // Oma kaupunki: 3D:n lento ja nimikortti kuten ennen.
            if (p.Sijainti.Kaupungissa && p.Sijainti.Kaupunki == kaupunki) return null;

            vaihtoehdot = PeliApu.Vaihtoehdot(matka, kaupunki);
            if (linssit != null && linssit.VapaaSiirtyminenKaytettavissa()) vaihtoehdot.Insert(0, PeliApu.VapaaVaihtoehto());
            DialogiKohde = kaupunki;
            riviValittu = null;
            Tila = SilmukanTila.Dialogi;
            dialogi.PiilotaHeitto();
            string ala = $"{p.Raha} {PeliApu.Valuutta} · päivä {matka.Tila.Paiva()} · {PeliApu.AikaNimi(matka.Tila.Vuorokaudenaika())}";
            if (vaihtoehdot.Count == 0) ala += " · ei kulkutapaa nyt";
            dialogi.Nayta(PeliApu.KaupunginNimi(verkko, kaupunki), ala,
                vaihtoehdot.Select(v => (v.Nimi, v.Selite)).ToList(),
                i => Matkusta(DialogiKohde, vaihtoehdot[i].Tapa, vaihtoehdot[i].Mannerlento, vaihtoehdot[i].Vapaa),
                () => Kartalle(false));

            // Yleiskuva: pelaaja ja kohde samaan kuvaan (korvaa 3D:n lennon napautettuun kaupunkiin).
            var a = PeliApu.Koordinaatti(verkko, p.Sijainti);
            var b = PeliApu.Koordinaatti(verkko, Sijainti.KaupungissaSijainti(kaupunki));
            if (a.HasValue && b.HasValue)
            {
                double kulma = PeliApu.Kulma(a.Value.Lat, a.Value.Lon, b.Value.Lat, b.Value.Lon);
                var keski = PeliApu.Isoympyra(a.Value.Lat, a.Value.Lon, b.Value.Lat, b.Value.Lon, 0.5);
                double kaari = PeliApu.YleiskuvanKaari(kulma, SaapumisKaari);
                kameranOhitus = () => kierto.Aja(keski.Lat, keski.Lon, kierto.KorkeusKaarelle(kaari), YleiskuvanKesto, null);
            }
            return null;
        }

        /// <summary>
        /// Matkavalinta mannerlennoille (kortin "Mannerlento", testikomento 'mannerlennot'):
        /// rivi per mantere, jonka aarre on kateissa. Palauttaa virheen tai null.
        /// </summary>
        public string AvaaMannerlennot()
        {
            if (matka == null || kaupat == null) return "peli ei ole valmis";
            if (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi) return "silmukka on tilassa " + Tila;
            var kohteet = kaupat.MannerLennot();
            if (kohteet.Count == 0) return "mannerlentoa ei ole tarjolla";
            var p = matka.Tila.Pelaaja;
            // NaytaRivit asettaa riviValittu-käsittelijän, joten myös testikomento `rivi i` toimii (Laitetestaaja 24.9.2026).
            NaytaRivit("Mannerlento", $"{p.Raha} {PeliApu.Valuutta} · mantereen aarre löytyi, matka voi jatkua",
                kohteet.Select(PeliApu.MannerlentoVaihtoehto).ToList(),
                i => Matkusta(kohteet[i].Kaupunki, Kulkutapa.Lento, true));
            return null;
        }

        /// <summary>Peruuta-nappi (myös testikomento).</summary>
        public string Peruuta()
        {
            if (Tila != SilmukanTila.Dialogi) return "matkavalinta ei ole auki";
            dialogi.Peruuta();
            return null;
        }

        /// <summary>Matkavalinnan nappi tavan mukaan (testikomento 'valitse').</summary>
        public string Valitse(Kulkutapa tapa)
        {
            if (Tila != SilmukanTila.Dialogi) return "matkavalinta ei ole auki";
            if (DialogiKohde == null) return "mannerlentolista: valitse komennolla 'matka <kaupunki> mannerlento'";
            var valittu = vaihtoehdot.FirstOrDefault(v => v.Tapa == tapa);
            if (valittu == null)
                return $"{PeliApu.TavanNimi(tapa)} ei ole tarjolla (tarjolla: {string.Join(", ", vaihtoehdot.Select(v => v.Nimi))})";
            return Matkusta(DialogiKohde, tapa, valittu.Mannerlento);
        }

        /// <summary>"Heitä noppaa" -nappi: matka jatkuu kohti tavoitetta.</summary>
        public string Heita()
        {
            if (matka == null) return "peli ei ole valmis";
            if (matka.Tila.Vaihe != Vaihe.Heitto && matka.Tila.Vaihe != Vaihe.Siirto) return "nyt ei heitetä (vaihe " + matka.Tila.Vaihe + ")";
            // Ilman tavoitetta (Liiku-vuo, web): noppa ensin, kohde nopan siirroista.
            if (Tavoite == null) return HeitaJaValitse();
            return Matkusta(Tavoite, matka.Tila.Kulkutapa ?? Kulkutapa.Maa);
        }

        /// <summary>
        /// Matka kohteeseen valitulla tavalla (dialogin nappi, heittonappi ja
        /// testikomento 'matka'). Palauttaa virheen tai null.
        /// </summary>
        public string Matkusta(string kohde, Kulkutapa tapa, bool mannerlento = false, bool vapaa = false, string siirto = null)
        {
            using var _ = Ajoita("matka");
            if (matka == null) return "peli ei ole valmis";
            if (LinssiAuki) return LinssiAukiSyy;
            if (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi) return "silmukka on tilassa " + Tila;
            if (kohde != null && !verkko.Kaupungit.ContainsKey(kohde)) return "tuntematon kaupunki " + kohde;
            dialogi.Piilota();
            dialogi.PiilotaHeitto();
            if (kohde != null) Tavoite = kohde;
            // Lähtö vaientaa paikan puheen (web doRoll/doMove → vaiennaPaikanPuhe).
            VaiennaPaikanPuhe();

            tapahtumat.Clear();
            var t = PeliApu.Matkusta(matka, Tavoite, tapa, mannerlento, vapaa && linssit != null ? linssit.VapaaSiirtyminen : (Func<string, TekoTulos>)null, siirto);
            // Liiku-vuossa noppa näytettiin jo heitettäessä (HeitaJaValitse): ei toista kertaa siirrossa.
            if (siirto != null) t.Noppa = null;
            Viimeisin = t;
            if (!t.Ok)
            {
                Virhe(t.Virhe);
                Kartalle(false);
                return t.Virhe;
            }
            if (t.Saapui != null && t.Saapui == Tavoite) Tavoite = null; // perillä
            Tallenna();

            var osat = new List<string>();
            // Näkyvä noppa kertoo silmäluvun itse (web: ei tekstiä); ilman sitä tilariville.
            if (t.Noppa.HasValue && (PeliNakymat.Noppa == null || !Kaytossa)) osat.Add("Noppa " + t.Noppa.Value);
            osat.AddRange(tapahtumat);
            // Webissä ei ole saapumisilmoitusta (saapumisen kertovat nimikortti ja traileri), ja siirron alussa
            // näytettynä se ennätti nappulan ohi (liikkumisen pariteetti, c535aea-video). Vain ilman pelinäkymää.
            if (t.Saapui != null && !Kaytossa) osat.Add("Saavuit: " + PeliApu.KaupunginNimi(verkko, t.Saapui));
            Viesti(string.Join(" · ", osat));
            Debug.Log($"MATKAKIRJA peli: {PeliApu.TavanNimi(t.Tapa)} {t.Lahto} → {t.Kohde}" + (t.Noppa.HasValue ? $" (noppa {t.Noppa})" : "")
                      + (t.Saapui != null ? ", saapui " + t.Saapui : ""));

            var a = PeliApu.Koordinaatti(verkko, t.Lahto);
            var b = PeliApu.Koordinaatti(verkko, t.Kohde);
            // dieLand: näkyvän nopan kanssa UI soittaa sen nopan ensimmäisessä osumassa (web animateDie
            // onLand); ohjain soittaa sen vain, kun noppaa ei näytetä (sama ehto kuin PeliNakymat.Noppa-kutsulla).
            bool noppaNakyy = t.Noppa.HasValue && PeliNakymat.Noppa != null && Kaytossa && a.HasValue && t.Liikkui && b.HasValue;
            if (t.Noppa.HasValue && !noppaNakyy) Aanita(Aanitunnukset.Noppa);
            if (!t.Liikkui || !b.HasValue)
            {
                Kartalle(false);
                return null;
            }
            double kulma = a.HasValue ? PeliApu.Kulma(a.Value.Lat, a.Value.Lon, b.Value.Lat, b.Value.Lon) : 0;
            saapumisKaupunki = t.Saapui;
            matkaKohde = b.Value;
            Tila = SilmukanTila.Matkalla;
            // Reitit piirretään lähtöpaikasta koko siirron ajan (web siirtoKaynnissa, B8).
            siirtoLahto = t.Lahto;
            saapumisaaniSoi = false;
            PaivitaMatkareitit();
            tilarivi.Aseta(PeliApu.TilaTeksti(verkko, matka.Tila));
            // Lennon alun repliikki kerran istunnossa; muuten saapumispuhe kohteeseen.
            var lentoRepliikki = t.Tapa == Kulkutapa.Lento ? luennat.OtaLentoAlku() : null;
            if (lentoRepliikki != null) SoitaLuento(lentoRepliikki, 0.2f);
            else if (t.Saapui != null && PeliNakymat.Saapumistraileri == null) SoitaLuento(luennat.Saapumispuhe(t.Saapui), 0.3f);
            float kesto = PeliApu.AjoKesto(kulma);
            // Näkyvä noppa (B16/P45, web animateDie): liike alkaa vasta, kun noppa on pysähtynyt.
            if (t.Noppa.HasValue && PeliNakymat.Noppa != null && Kaytossa && a.HasValue)
            {
                int tunnus = ++noppaTunnus;
                noppaLiike = () => AloitaLiike(t, a, b.Value, kesto);
                noppaLoppuu = Time.unscaledTime + NopanVaraS;
                try { PeliNakymat.Noppa(t.Noppa.Value, a.Value.Lat, a.Value.Lon, () => { if (tunnus == noppaTunnus) NoppaValmis(); }); }
                catch (Exception e) { Debug.LogException(e); NoppaValmis(); }
                return null;
            }
            AloitaLiike(t, a, b.Value, kesto);
            return null;
        }

        const float NopanVaraS = 4f;   // valmis-kutsun varareitti, jos näkymä ei kutsu sitä
        int noppaTunnus;
        Action noppaLiike;
        float noppaLoppuu;

        void NoppaValmis()
        {
            var l = noppaLiike;
            noppaLiike = null;
            if (l != null && Tila == SilmukanTila.Matkalla) l();
        }

        /// <summary>Lentoääni, nappula tai kamera-ajo kohteeseen; perillä Perilla.</summary>
        void AloitaLiike(MatkanTulos t, (double Lat, double Lon)? a, (double Lat, double Lon) b, float kesto)
        {
            IlmoitaLiike(t.Tapa, t.Polku?.Count ?? 0, siirtymaraita: !t.Mannerlento);
            if (t.Tapa == Kulkutapa.Lento)
            {
                Lentoaani(true, kesto);
                if (a.HasValue)
                    AloitaLento(Lentosuunnitelma.Laske(t.Lahto.Kaupungissa ? t.Lahto.Kaupunki : null, t.Kohde.Kaupunki, a.Value, b, kesto));
            }
            var nappula = Nappula;
            if (nappula != null && a.HasValue)
            {
                // Pelinappula (Natiiviseppä, B16): liftaus, laiva ja bussi ajavat reitin pisteet
                // (autokyyti), lento lentää kaaren; kamera seuraa nappulaa (seuraaKamera).
                if (t.Tapa == Kulkutapa.Lento)
                    NappulaAjo(v => nappula.Lenna(a.Value.Lat, a.Value.Lon, b.Lat, b.Lon, kesto, v), kesto, Perilla);
                else
                {
                    // Webin koreografia (Natiiviseppä, RAJAPINTA 3b; pariteetti A20, A21, B12–B16): ennakkozoomi,
                    // saattava kamera ja liftauksen hypyt / bussin ajo / laivan liuku; kesto askelmäärästä kuten webissä.
                    var liike = new Nappula.Matkaliike
                    {
                        Pisteet = PeliApu.Matkapisteet(verkko, t.Lahto, t.Polku, t.Kohde), Tapa = t.Tapa,
                        Askelia = t.Polku?.Count ?? 0,
                    };
                    TilaaNappulanVaiheet(); // Laskeutui → askel- ja saapumisääni (B21)
                    float matkanKesto = nappula.MatkanKesto(liike);
                    NappulaAjo(v => nappula.Aja(liike, v), matkanKesto, Perilla);
                }
                return;
            }
            Ajo(b.Lat, b.Lon, SaapumisKaari, kesto, Perilla);
        }

        /// <summary>Kamera-ajo perille: kaupungissa lehti, reitin varrella takaisin kartalle.</summary>
        void Perilla() => Perilla(false);

        void Perilla(bool aloituslento, bool kameraPerilla = false)
        {
            if (Tila != SilmukanTila.Matkalla) return;
            Lentoaani(false);
            PaataLento();
            var kaupunki = saapumisKaupunki;
            saapumisKaupunki = null;
            // Uusi paikka: edellisen kaupungin ohitus ei koske tämän kerrontaa (web luennanOhitus per saapuminen).
            if (kaupunki != null) LuentoOhitettu = false;
            // Nappula laskeutui: reitit lähtöpaikasta pois; toisessa kaupungissa sessio päättyy (B9, löydös 60).
            siirtoLahto = null;
            PaivitaMatkareitit();
            // Liike päättyi (kaupunki tai null = reitin varrella): noppa häipyy (web saapuessa).
            try { MatkaPerilla?.Invoke(kaupunki); } catch (Exception e) { Debug.LogException(e); }
            // Hyppyketju soitti saapumisäänen jo viimeisellä laskeutumisella (NappulaLaskeutui); muuten tässä.
            if (kaupunki != null && !saapumisaaniSoi) Aanita(Aanitunnukset.Saapuminen);
            saapumisaaniSoi = false;
            // Kaupunkiin päättynyt matka: kamera saapumisnäkymään (web ui.js palaaMaanRajaukseen ja siirto.js laske
            // → lauta.saavu; avauslento → kamera.kotiin ilman maan laatikkoa). Reitin varrella kamera jää paikalleen.
            if (kaupunki != null && !kameraPerilla) Saavu(maaRajaus: !aloituslento);
            if (kaupunki != null && TraileriTarjolla(kaupunki))
            {
                // Traileri ennen isoisän luentoa (web render: naytaSaapumistraileri → aloitaMerkinta); lehti ei aukea itsestään.
                trailerinaytetty.Add(kaupunki);
                Tila = SilmukanTila.Traileri;
                traileriKaupunki = kaupunki;
                bool valmis = false;
                try
                {
                    PeliNakymat.Saapumistraileri(kaupunki, luennat.Saapumispuhe(kaupunki)?.Url, () =>
                    {
                        if (valmis) return;
                        valmis = true;
                        TraileriValmis(kaupunki);
                    });
                }
                catch (Exception e) { Debug.LogException(e); TraileriValmis(kaupunki); }
                return;
            }
            SaavuLehteen(kaupunki);
        }

        readonly HashSet<string> trailerinaytetty = new HashSet<string>();
        string traileriKaupunki;

        /// <summary>
        /// Traileri kerran per kaupunki istunnossa, kun kaupungilla on fokusvirran matkakirjamerkintä (web ui.js ~13577
        /// fokusvirtaMatkakirja ja ~13790; kuvat tarkistaa näkymä). Laatta ei vaikuta: aarrekaupungissakin traileri näkyy
        /// (liikkumisen pariteetti C4; ennen natiivi ohitti laattakaupungit ja näytti fokusvirrattomat).
        /// </summary>
        bool TraileriTarjolla(string kaupunki) =>
            PeliNakymat.Saapumistraileri != null && Kaytossa && !trailerinaytetty.Contains(kaupunki)
            && !string.IsNullOrEmpty(Fokusvirrat.Hae(kaupunki)?.Teksti);

        /// <summary>Ohittaa trailerin ohjaimen puolelta (testikomento 'ohita-traileri'); näkymä piilottaa itsensä Tilan vaihtuessa.</summary>
        public string OhitaTraileri()
        {
            if (Tila != SilmukanTila.Traileri) return "traileri ei ole auki";
            TraileriValmis(traileriKaupunki);
            return null;
        }

        void TraileriValmis(string kaupunki)
        {
            if (Tila != SilmukanTila.Traileri || traileriKaupunki != kaupunki) return;
            traileriKaupunki = null;
            SaavuLehteen(kaupunki);
        }

        /// <summary>Kaupunki, jonka saapumislehti on auki: sen sulkeminen aloittaa matkakirjaluennan (web saapuminen).</summary>
        string saapumisLehti;

        /// <summary>
        /// Löydös 59 (build 12): saapuminen ei avaa lehteä (web game.js offerQuiz palauttaa aina false, omistajan ohje:
        /// "mikään ikkuna ei aukea itsestään", myös laattakaupungissa). Kartalle ja isoisän matkakirjaluento heti (web
        /// aloitaMerkinta trailerin jälkeen); lehti avataan napautuksesta.
        /// </summary>
        void SaavuLehteen(string kaupunki)
        {
            Kartalle(false);
            if (kaupunki == null) return;
            var l = luennat.OtaLuento(kaupunki);
            if (l != null && SoitaLuento(l, 0.6f) == null && !string.IsNullOrEmpty(l.Paikkarivi)) Viesti(l.Paikkarivi);
        }

        /// <summary>Kaupunki, jonka lehti (tai jonka kautta maalehti) avattiin: Suljettu antaa maalehdessä ISO3:n.</summary>
        string lehdenKaupunki;

        void LehtiSuljettu(string omistaja)
        {
            if (Tila != SilmukanTila.Lehti) return;
            var kaupunki = lehdenKaupunki ?? omistaja;
            lehdenKaupunki = null;
            bool maalehti = maalehtiAuki;
            maalehtiAuki = false;
            Tallenna();
            Kartalle(false);
            // Lehdestä avattu tehtävä näkyviin vasta nyt.
            if (AvoinTehtava != Tehtava.Ei) { NaytaKysymys(); return; }
            // Lehden aikana tapahtunut mannerlento: kamera pelaajaan (web: paikanvaihto ilman siirtoa → lauta.saavu).
            if (matka.Tila.Pelaaja.Sijainti.Kaupunki != kaupunki) Saavu();
            // Isoisän matkakirjaluento saapuessa, kun saapumislehti on luettu (web: jokaisella saapumisella;
            // ei kortista avatusta lehdestä eikä maalehdestä).
            bool saapuminen = saapumisLehti != null && saapumisLehti == kaupunki;
            saapumisLehti = null;
            var l = maalehti || !saapuminen ? null : luennat.OtaLuento(kaupunki);
            if (l != null && SoitaLuento(l, 0.6f) == null && !string.IsNullOrEmpty(l.Paikkarivi)) Viesti(l.Paikkarivi);
        }

        /// <summary>Avaa lehden natiivin rahalla ja kauppojen kirjanpidolla (lehtikuoren #tila).</summary>
        bool maalehtiAuki;

        /// <summary>
        /// Maalehti (kartuscha, Natiivi-UI): maan lehti aiheen sivulta (aihe = webin
        /// MAA_KATEGORIAT-id, esim. "historia"). Pelaajan sijainti on kuoren kaupunki
        /// (reitillä lähtökaupunki). Palauttaa virheen tai null.
        /// </summary>
        public string LueMaalehti(string iso3, string aihe = null)
        {
            if (!LehtiOn) return "lehteä ei ole";
            if (matka == null) return "peli ei ole valmis";
            if (Tila != SilmukanTila.Kartta) return "silmukka on tilassa " + Tila;
            var s = matka.Tila.Pelaaja.Sijainti;
            var kaupunki = s.Kaupungissa ? s.Kaupunki : verkko.Reitit.TryGetValue(s.Reitti, out var r) ? r.A : null;
            if (kaupunki == null) return "sijainti ei ole kaupungissa eikä reitillä";
            PiilotaKortti();
            dialogi.PiilotaHeitto();
            Tila = SilmukanTila.Lehti;
            maalehtiAuki = true;
            AvaaLehti(kaupunki, iso3, aihe);
            return null;
        }

        void AvaaLehti(string kaupunki, string maa = null, string sivu = null)
        {
            lehdenKaupunki = kaupunki;
            if (lehtiNakyma != null)
            {
                lehtiNakyma.Nayta(new LehtiAvaus { Maalehti = maa != null, Kaupunki = kaupunki, Maa = maa, Aihe = sivu },
                    LehtiTilaNyt(kaupunki), TeeLehtiTeko);
            }
        }

        /// <summary>Sulkee lehden (testikomento 'sulje-lehti').</summary>
        public string SuljeLehti()
        {
            if (!LehtiAuki) return "lehti ei ole auki";
            lehtiNakyma.Sulje();
            return null;
        }

        // --- natiivilehti, tehtävänappi ja vihreä aarrepiste (B1, B3) -----------

        /// <summary>Lehden näkymätila (web lehtikuoren tila + fokustehtävät). Tehtävänappi vain omassa kaupungissa.</summary>
        LehtiTila LehtiTilaNyt(string kaupunki)
        {
            var t = new LehtiTila();
            if (matka == null || kaupat == null) return t;
            var p = matka.Tila.Pelaaja;
            t.Raha = p.Raha;
            t.Matkapaiva = matka.Tila.Paiva();
            t.KulttuuriVastattu = k => kaupat.KulttuuriVastattu(k);
            t.MinitehtavaVastattu = (k, a) => kaupat.MinitehtavaVastattu(k, a);
            t.MinitehtavaRatkaistu = (k, a) => kaupat.MinitehtavaRatkaistu(k, a);
            t.PullaVinkkiOstettu = k => kaupat.PullaVinkkiOstettu(k);
            t.JulisteLaukussa = k => kaupat.JulisteLaukussa(k);
            t.AarreAuki = k => fokus.AarreAuki(kaupat, k);
            bool oma = p.Sijainti.Kaupungissa && p.Sijainti.Kaupunki == kaupunki && matka.Tila.Vaihe == Vaihe.Toiminta;
            var nappi = oma ? KysymysApu.TehtavaNappi(kysely, kaupunki, kohtaamiset, pulmat) : null;
            t.TehtavaNappi = nappi?.Teksti;
            t.TehtavaNappiPois = nappi?.Pois ?? false;
            return t;
        }

        /// <summary>Natiivilehden teko (ILehtiNakyma.Nayta:n teeTeko): tulos heti, tila päivittyy lehteen.</summary>
        KauppaTulos TeeLehtiTeko(LehtiTeko t)
        {
            if (t == null) return KauppaTulos.Epaonnistui("teko puuttuu");
            KauppaTulos tulos;
            switch (t.Laji)
            {
                case LehtiTekoLaji.Kulttuurivastaus: tulos = KauppaTeko(k => k.Kulttuuri(t.Kaupunki, t.Oikein), RahaSyyt.Kulttuuri); break;
                case LehtiTekoLaji.Minitehtavavastaus:
                    tulos = KauppaTeko(k => k.Minitehtava(t.Kaupunki, t.Aihe, t.Oikein, t.Palkkio > 0 ? t.Palkkio : KauppaVakiot.MinitehtavaPalkkio),
                        t.Selite != null ? t.Selite + " ratkesi" : RahaSyyt.Minitehtava(t.Aihe));
                    break;
                case LehtiTekoLaji.JulisteMyonto: tulos = KauppaTeko(k => k.MyonnaJuliste(t.Avain), RahaSyyt.Juliste); break;
                case LehtiTekoLaji.PullaVinkki: tulos = KauppaTeko(k => k.PullaVinkki(t.Kaupunki), t.Selite ?? RahaSyyt.Pulla); break;
                case LehtiTekoLaji.EtsiKatko:
                {
                    // Web etsiKatko: lehti kiinni ja kohtaaminen/kysymys alkaa (LehtiSuljettu näyttää sen).
                    var virhe = EtsiKatko(t.Kaupunki);
                    return virhe == null ? new KauppaTulos { Ok = true } : KauppaTulos.Epaonnistui(virhe);
                }
                case LehtiTekoLaji.AvaaMaalehti:
                    maalehtiAuki = true;
                    lehtiNakyma?.Nayta(new LehtiAvaus { Maalehti = true, Maa = t.Maa, Aihe = t.Aihe, Kaupunki = t.Kaupunki },
                        LehtiTilaNyt(t.Kaupunki), TeeLehtiTeko);
                    return new KauppaTulos { Ok = true };
                case LehtiTekoLaji.SivuNakyi:
                    try { LehtiSivuNakyi?.Invoke(t.Omistaja, t.Aihe, t.Sivu, t.SivunLaji); } catch (Exception e) { Debug.LogException(e); }
                    return new KauppaTulos { Ok = true };
                default: return KauppaTulos.Epaonnistui("tuntematon teko " + t.Laji);
            }
            if (lehtiNakyma != null && lehtiNakyma.Auki) lehtiNakyma.PaivitaTila(LehtiTilaNyt(t.Kaupunki));
            return tulos;
        }

        /// <summary>
        /// Web etsiKatko / avaaFokusKohtaaminen: kohtaaminen tai laattakysymys pelaajan kaupungissa (lehden
        /// tehtävänappi, vihreä piste, laatan napautus). Kohtaamiskaupungissa muoto on visa, ellei pulma odota.
        /// Lehden ollessa auki se suljetaan ja kysymys näkyy sulkeutumisen jälkeen. Palauttaa virheen tai null.
        /// </summary>
        public string EtsiKatko(string kaupunki = null)
        {
            if (matka == null || kysely == null) return "peli ei ole valmis";
            var p = matka.Tila.Pelaaja;
            if (!p.Sijainti.Kaupungissa || (kaupunki != null && p.Sijainti.Kaupunki != kaupunki)) return "pelaaja ei ole kaupungissa " + kaupunki;
            if (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Lehti) return "silmukka on tilassa " + Tila;
            if (matka.Tila.Vaihe == Vaihe.Heitto) matka.PeruKulkutapa();
            if (matka.Tila.Vaihe != Vaihe.Toiminta) return "vaihe " + matka.Tila.Vaihe;
            if (puhe != null && puhe.Soi) puhe.Pysayta();
            kysymysLoyto = null;
            kysymysLisat.Clear();
            bool quiz = fokus.Kohtaaminen(p.Sijainti.Kaupunki) && pulmat?.Odottaa() == null;
            var t = kysely.Tutki(false, quiz ? KysymysMuoto.Visa : (KysymysMuoto?)null);
            if (!t.Ok) { Virhe(t.Virhe); return t.Virhe; }
            Tallenna();
            if (Tila == SilmukanTila.Lehti) { SuljeLehti(); return null; }   // LehtiSuljettu näyttää kysymyksen
            if (AvoinTehtava != Tehtava.Ei) NaytaKysymys(); else PaivitaNakyma();
            return null;
        }

        /// <summary>Nykyisen kaupungin vihreä aarrepiste (web fokusvirtaKohtaamispiste) tai null.</summary>
        public Aarrepiste Aarrepiste() => matka != null && kaupat != null ? fokus.Piste(kaupat) : null;

        /// <summary>Aarrepiste asteina (lat, lon) piirtoa varten (laudan Miller-piste → ReittiGeometria.Asteiksi).</summary>
        public (double Lat, double Lon)? AarrepisteAsteina()
        {
            var a = Aarrepiste();
            if (a == null) return null;
            var d = ReittiGeometria.Asteiksi(a.X, a.Y);
            return (d.x, d.y);
        }

        /// <summary>Vihreän pisteen napautus: auki → kohtaaminen/kysymys (EtsiKatko), lukittuna ohje. Virhe tai null.</summary>
        public string AvaaAarrepiste()
        {
            var a = Aarrepiste();
            if (a == null) return "aarrepistettä ei ole";
            if (a.Lukittu) { Viesti("Aarteen jälki on vielä piilossa: " + Fokusdata.Lukkolappu + "."); return "lukittu"; }
            // Sähkekaupunki: pöllön sähke kohtaamisen sijaan (web piirraSisalto); ilman näkymää laattakysymys.
            if (sahketehtavat.ContainsKey(a.Kaupunki) && (sahketehtavaNakyma != null || sahketila.LentoKesken(a.Kaupunki)))
                return AvaaSahketehtava(a.Kaupunki);
            return EtsiKatko(a.Kaupunki);
        }

        // --- kysymys (erä 4) ---------------------------------------------------

        /// <summary>"Tutki kaupunkia" -nappi: kaupungissa, vuoron alussa, ja tehtävä tarjolla (web tehtavaTarjolla).</summary>
        public bool TutkiTarjolla =>
            kysely != null && matka != null && Tila == SilmukanTila.Kartta && matka.Tila.Vaihe == Vaihe.Toiminta
            && matka.Tila.Pelaaja.Sijainti.Kaupungissa && kysely.TehtavaTarjolla(matka.Tila.Pelaaja);

        /// <summary>Tutki-nappi (web actionTravel('stay')): avaa kysymyksen. Palauttaa virheen tai null.</summary>
        public string Tutki(bool vaikea = false)
        {
            if (matka == null) return "peli ei ole valmis";
            if (LinssiAuki) return LinssiAukiSyy;
            if (kysely == null) return "kysymykset eivät ole vielä latautuneet";
            if (Tila != SilmukanTila.Kartta) return "silmukka on tilassa " + Tila;
            kysymysLoyto = null;
            kysymysLisat.Clear();
            // Kysymys ei ala luennan päälle.
            if (puhe != null && puhe.Soi) puhe.Pysayta();
            var t = kysely.Tutki(vaikea);
            if (!t.Ok) { Virhe(t.Virhe); PaivitaNakyma(); return t.Virhe; }
            if (AvoinTehtava == Tehtava.Ei)
            {
                Tallenna();
                PaivitaNakyma();
                return null;
            }
            Tallenna();
            NaytaKysymys();
            var q = matka.Tila.Kysely.Kysymys;
            Debug.Log($"MATKAKIRJA peli: {AvoinTehtava} {q?.Laji} {q?.Kaupunki}");
            return null;
        }

        /// <summary>Mikä modaalinen tehtävä on auki pelitilassa.</summary>
        public enum Tehtava { Ei, Kysymys }

        public Tehtava AvoinTehtava
        {
            get
            {
                if (matka == null) return Tehtava.Ei;
                var t = matka.Tila;
                if (t.Vaihe == Vaihe.Kysymys && t.Kysely.Kysymys != null && kysely != null) return Tehtava.Kysymys;
                return Tehtava.Ei;
            }
        }

        int? TehtavanSekunnit()
        {
            switch (AvoinTehtava)
            {
                case Tehtava.Kysymys: { var q = matka.Tila.Kysely.Kysymys; return q.Valittu.HasValue ? null : q.Sekunnit; }
                default: return null;
            }
        }

        /// <summary>Avoin tehtävä (kysymys, pulma, tapahtumakortti) näkyviin, myös tallennuksesta jatkettaessa.</summary>
        void NaytaKysymys(string viesti = null)
        {
            using var _ = Ajoita("kysymysNayta");
            var tehtava = AvoinTehtava;
            if (tehtava == Tehtava.Ei) return;
            if (Tila != SilmukanTila.Kysymys)
            {
                // Jatkettaessa aika on tallennuksessa; uusi tehtävä asettaa sen tässä.
                kysymysJaljella = TehtavanSekunnit() ?? 0;
                tervehdysAloitettu = false;
                tulosPaljastettu = false;
                tervehdysNakyi = false;
                dialogi.Piilota();
                dialogi.PiilotaHeitto();
                DialogiKohde = null;
                Tila = SilmukanTila.Kysymys;
                PysaytaKamera();
                Aanita(Aanitunnukset.KysymysAuki);
            }
            switch (tehtava)
            {
                case Tehtava.Kysymys:
                {
                    var q = matka.Tila.Kysely.Kysymys;
                    KysymysTila = KysymysApu.Nakyma(kysely, q, kysymysLoyto, kysymysLisat, viesti, kuvakokoelmat?.Osoitteet, aarrenimet);
                    // Kaupungin tavallinen tervehdys kerran istunnossa (web ui.kohtaamisetNahty).
                    if (KysymysApu.LisaaKohtaaminen(KysymysTila, q, kohtaamiset, q.Kaupunki != null && tervehdyksetNahty.Contains(q.Kaupunki)))
                        tervehdyksetNahty.Add(q.Kaupunki);
                    // Näytetty tervehdys pysyy tervehdyssivulla, kunnes pelaaja painaa Aloita peli.
                    if (!tervehdysAloitettu && KysymysTila.Tervehdys == null && !q.Valittu.HasValue) tervehdysAloitettu = true;
                    bool tervehdysEnnen = tervehdysNakyi;
                    KysymysApu.LisaaVaiheet(KysymysTila, kysely, q, tervehdysAloitettu);
                    LisaaKaveriapu(KysymysTila);
                    tervehdysNakyi = KysymysTila.TervehdysVaihe;
                    if (tervehdysNakyi && !tervehdysEnnen)
                    {
                        // Viimeisen yrityksen jännitys voittaa tervehdyksen sävyn (web visa.js).
                        if (KysymysTila.Varoitus != null) Livia("tunne", "jannitys", 0.6);
                        else Livia("tunne", kohtaamiset?.Tunne(q.Kaupunki, "tervehdys", q.Kaari));
                    }
                }
                    break;
            }
            KysymysTila.TulosVaihe = !KysymysTila.Vastattu ? 0
                : tulosPaljastettu ? 2 : 1;
            if (Kaytossa) kysymysNakyma.Nayta(KysymysTila, kysymysToiminnot);
            if (KysymysTila.Sekunnit.HasValue) kysymysNakyma.PaivitaAika(kysymysJaljella);
            tilarivi.Aseta(PeliApu.TilaTeksti(verkko, matka.Tila));
        }

        /// <summary>Tervehdyssivun "Aloita peli" (testikomento 'aloita'): kysymys ja aika alkavat.</summary>
        public string AloitaKysymys()
        {
            if (Tila != SilmukanTila.Kysymys || KysymysTila == null) return "kysymys ei ole auki";
            if (!KysymysTila.TervehdysVaihe) return "ei tervehdyssivua";
            tervehdysAloitettu = true;
            NaytaKysymys();
            return null;
        }

        string KysymysTeko(Func<TekoTulos> teko)
        {
            if (Tila != SilmukanTila.Kysymys || AvoinTehtava == Tehtava.Ei) return "kysymys ei ole auki";
            bool vastattuEnnen = KysymysTila != null && KysymysTila.Vastattu;
            var t = teko();
            if (!t.Ok) { rahaSyy = null; NaytaKysymys(t.Virhe); return t.Virhe; }
            // Vastaus: ensin tuomio, 0,9 s myöhemmin paljastus (Update).
            if (!vastattuEnnen) { tulosPaljastettu = false; paljastusAika = Time.unscaledTime + TuomioS; }
            Tallenna();
            NaytaKysymys();
            return null;
        }

        /// <summary>Vaihtoehdon valinta (näkymä ja testikomento 'vastaa i'): kysymys tai pulma.</summary>
        public string Vastaa(int indeksi)
        {
            var tehtava = AvoinTehtava;
            var r = KysymysTeko(() => kysely.Vastaa(indeksi));
            if (r == null && KysymysTila != null)
            {
                Aanita(KysymysTila.Oikein ? Aanitunnukset.Oikein : Aanitunnukset.Vaarin);
                var q = matka.Tila.Kysely.Kysymys;
                Livia(KysymysTila.Oikein ? "success" : "retry");
                if (KysymysTila.Tuloslaji != null) Livia("tunne", kohtaamiset?.Tunne(q?.Kaupunki, KysymysTila.Tuloslaji, false));
                if (q != null && q.Kaari && KysymysTila.Oikein) Livia("tunne", kohtaamiset?.Tunne(q.Kaupunki, "aarre", true));
                if (q?.AarreLukittui == true) Livia("tunne", "vakava", 0.6);
            }
            // Löytöhetken repliikki luetaan ääneen (web lueKertojana, persoona kertoja).
            if (r == null && KysymysTila != null && KysymysTila.RepliikkiLoyto && puhe != null)
                puhe.Lue(KysymysTila.Repliikki, "kertoja", 0.3f);
            if (r == null) Debug.Log($"MATKAKIRJA peli: {tehtava} vastaus {indeksi}, {(KysymysTila.Oikein ? "oikein" : "väärin")}"
                                     + (kysymysLoyto != null ? ", laatta " + kysymysLoyto.WebTulos : "") + $", raha {matka.Tila.Pelaaja.Raha}");
            return r;
        }

        public string Vihje()
        {
            if (AvoinTehtava != Tehtava.Kysymys) return "vihjettä ei ole tarjolla";
            rahaSyy = RahaSyyt.Vihje;
            var r = KysymysTeko(() => kysely.Vihje());
            if (r == null) Aanita(Aanitunnukset.Vihje);
            return r;
        }

        /// <summary>50:50 kysymyksessä.</summary>
        public string Puolita()
        {
            switch (AvoinTehtava)
            {
                case Tehtava.Kysymys: rahaSyy = RahaSyyt.Puolitus; return Aanella(KysymysTeko(() => kysely.Puolita()), Aanitunnukset.Puolitus);
                default: return "50:50 ei ole tarjolla";
            }
        }

        string Aanella(string virhe, string tunnus)
        {
            if (virhe == null) Aanita(tunnus);
            return virhe;
        }

        /// <summary>
        /// Tuloksen Jatka-nappi (testikomento 'jatka'): kysymys suljetaan.
        /// </summary>
        public string JatkaKysymyksesta()
        {
            using var _ = Ajoita("kysymysJatka");
            var tehtava = AvoinTehtava;
            if (Tila != SilmukanTila.Kysymys || tehtava == Tehtava.Ei) return "kysymys ei ole auki";
            if (KysymysTila != null && !KysymysTila.Vastattu) return "kysymykseen ei ole vastattu";
            var lahto = matka.Tila.Pelaaja.Sijainti;
            var t = kysely.Sulje();
            if (!t.Ok) return t.Virhe;
            kysymysLoyto = null;
            kysymysLisat.Clear();
            Tallenna();
            if (AvoinTehtava != Tehtava.Ei)
            {
                Tila = SilmukanTila.Kartta;
                NaytaKysymys();
                Debug.Log("MATKAKIRJA peli: " + AvoinTehtava + " alkoi");
                return null;
            }
            kysymysNakyma.Piilota();
            KysymysTila = null;
            Kartalle(!matka.Tila.Pelaaja.Sijainti.Equals(lahto));
            return null;
        }

        void PaivitaKysymysAika()
        {
            if (Tila == SilmukanTila.Kysymys && KysymysTila != null && KysymysTila.TulosVaihe == 1 && Time.unscaledTime >= paljastusAika)
            {
                tulosPaljastettu = true;
                NaytaKysymys();
                return;
            }
            if (Tila != SilmukanTila.Kysymys || KysymysTila == null || KysymysTila.Vastattu || !KysymysTila.Sekunnit.HasValue) return;
            // Tervehdyssivulla aika ei kulu (web: tiimalasi vasta Aloita peli -napista).
            if (KysymysTila.TervehdysVaihe) return;
            if (!Kaytossa) return;
            // Kaveriavun odotus: tiimalasi seis (web sahkePysaytaKello).
            if (KelloPysaytetty) return;
            int ennen = Mathf.CeilToInt(kysymysJaljella);
            kysymysJaljella -= Time.unscaledDeltaTime;
            // Web visa.js: tikitys viimeisillä kymmenellä sekunnilla, kerran per kokonainen sekunti.
            int nyt = Mathf.CeilToInt(kysymysJaljella);
            if (nyt != ennen && nyt > 0 && nyt <= 10) Aanita(Aanitunnukset.Tikitys);
            if (kysymysJaljella > 0) { kysymysNakyma.PaivitaAika(kysymysJaljella); return; }
            kysymysJaljella = 0;
            kysymysNakyma.PaivitaAika(0);
            Aanita(Aanitunnukset.AikaLoppui);
            KysymysTeko(() => kysely.AikaLoppui());
        }

        // --- kamera -----------------------------------------------------------

        /// <summary>
        /// IKamera.Aja ja varareitti: sormi ruudulla keskeyttää PalloKierron ajon
        /// ilman valmis-kutsua, joten valmis kutsutaan viimeistään kesto + vara.
        /// </summary>
        void Ajo(double lat, double lon, double kaari, float kesto, Action valmis)
        {
            int tunnus = ++ajoTunnus;
            // Uusi ajo korvaa samassa ruudussa aiemmin asetetun ohituksen (esim. napin
            // alla olleen kaupungin napautus käsiteltiin ennen napin painallusta).
            kameranOhitus = null;
            ajoValmis = valmis;
            ajoLoppuu = Time.unscaledTime + kesto + AjonVara;
            ((IKamera)kierto).Aja(lat, lon, kierto.KorkeusKaarelle(kaari), kesto, () => { if (tunnus == ajoTunnus) AjoValmis(); });
        }

        /// <summary>
        /// SAAPUMISNÄKYMÄ pelaajan paikkaan (web js/pallolauta/lauta.js saavu → kamera.js kotiin, 1400 ms): maa
        /// ruutuun, kallistus 0 (Kartta/Saapumisnakyma.cs, PalloKierto.AjaSaapumisnakymaan). Maa = pelaajan
        /// kaupungin ISO3 (web cityOf; reitin varrella null → kaupunkinäkymä). Varareitti kuten Ajo.
        /// </summary>
        void Saavu(bool maaRajaus = true, Action valmis = null)
        {
            if (matka == null || kierto == null) return;
            var s = matka.Tila.Pelaaja.Sijainti;
            var k = PeliApu.Koordinaatti(verkko, s);
            if (!k.HasValue) return;
            string maa = s.Kaupungissa && verkko.Kaupungit.TryGetValue(s.Kaupunki, out var kp) ? kp.Maa : null;
            NappulaAjo(v => kierto.AjaSaapumisnakymaan(maa, k.Value.Lat, k.Value.Lon, Saapumisnakyma.AjoS, v, maaRajaus),
                Saapumisnakyma.AjoS, valmis);
        }

        /// <summary>Pelinappula tai null (kohtaus ilman nappulaa: kamera-ajo kuten ennen).</summary>
        static Nappula Nappula => KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.nappula : null;

        /// <summary>Nappulan liike samalla valmis-vartioinnilla kuin kamera-ajo (varareitti ajon jälkeen).</summary>
        void NappulaAjo(Action<Action> kaynnista, float kesto, Action valmis)
        {
            int tunnus = ++ajoTunnus;
            kameranOhitus = null;
            ajoValmis = valmis;
            ajoLoppuu = Time.unscaledTime + kesto + AjonVara;
            try { kaynnista(() => { if (tunnus == ajoTunnus) AjoValmis(); }); }
            catch (Exception e) { Debug.LogException(e); AjoValmis(); }
        }

        // --- vihreä aarrepiste kartalle (B3, Natiivisepän Karttapisteet) ----------

        const string AarrepisteId = "aarre";
        /// <summary>Webin fokuspisteen vihreä (css/fokusvirta.css .fokuspiste #4f9d3a).</summary>
        static readonly Color AarrepisteVari = new Color32(0x4f, 0x9d, 0x3a, 0xff);
        Karttapisteet kytketytPisteet;

        static Karttapisteet Pisteet => KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pisteet : null;

        /// <summary>Piste nykyisen kaupungin kohtaamispaikkaan (lukittuna tai auki), muuten pois.</summary>
        void PaivitaAarrepiste()
        {
            var p = Pisteet;
            if (p == null) return;
            if (p != kytketytPisteet)
            {
                if (kytketytPisteet != null) kytketytPisteet.Napautettu -= PisteNapautettu;
                kytketytPisteet = p;
                p.Napautettu += PisteNapautettu;
            }
            var a = Kaytossa && Tila != SilmukanTila.Aloitus ? Aarrepiste() : null;
            if (a == null) { p.Poista(AarrepisteId); return; }
            var d = ReittiGeometria.Asteiksi(a.X, a.Y);
            p.Aseta(AarrepisteId, d.x, d.y, AarrepisteVari, a.Lukittu);
        }

        void PisteNapautettu(string id)
        {
            if (id != AarrepisteId || !Kaytossa) return;
            if (NapautusSallittu != null && !NapautusSallittu()) return;
            if (Tila != SilmukanTila.Kartta) return;
            var virhe = AvaaAarrepiste();
            if (virhe != null && virhe != "lukittu") Debug.Log("MATKAKIRJA peli: aarrepiste: " + virhe);
        }

        /// <summary>Nappula pelaajan kohdalle (lataus, uusi peli, mannerlento, matkan jälkeen); piiloon ilman peliä.</summary>
        void PaivitaNappula()
        {
            var n = Nappula;
            if (n == null || n.Liikkeessa) return;
            var k = matka != null ? PeliApu.Koordinaatti(verkko, matka.Tila.Pelaaja.Sijainti) : null;
            if (k.HasValue && Kaytossa) n.Aseta(k.Value.Lat, k.Value.Lon); else n.Piilota();
            PaivitaAarrepiste();
        }

        void AjoValmis()
        {
            var v = ajoValmis;
            ajoValmis = null;
            v?.Invoke();
        }

        void Update()
        {
            if (ajoValmis != null && Time.unscaledTime > ajoLoppuu) AjoValmis();
            if (noppaLiike != null && Time.unscaledTime > noppaLoppuu) NoppaValmis();
            KytkeRekisteri();
            PaivitaReaktiot();
            PaivitaKysymysAika();
            PaivitaSahke();
            PaivitaLento();
            // Maan rajat pois maailmatilassa (Natiivisepän PalloKierto.MaailmaTila, pariteetti D7/D8/D11; setteri ei tee
            // mitään samalla arvolla, sammutus puristaa kameran heti maan rajaan).
            if (kierto != null) kierto.MaailmaTila = Paavalikko.Maailma;
            PaivitaAutomaattiheitto();
            if (matka != null) { PaivitaSiirtoKohteet(); PaivitaValintavihje(); }
            // Pallo ei ota kosketuksia modaalisen näkymän (ja lehden) aikana.
            bool esta = Kaytossa && (Tila == SilmukanTila.Dialogi || Tila == SilmukanTila.Kysymys || Tila == SilmukanTila.Lehti
                                     || Tila == SilmukanTila.Traileri || Tila == SilmukanTila.Sahketehtava || AloituslentoKaynnissa);
            if (esta != lukossa) { lukossa = esta; SyoteLukko.Aseta(this, esta); }
            PaivitaAanet();
        }

        void LateUpdate()
        {
            // Korvaa KaupunkiMerkkien samassa ruudussa aloittaman lennon napautettuun kaupunkiin.
            var o = kameranOhitus;
            kameranOhitus = null;
            o?.Invoke();
        }

        // --- viestit ja testikomennot ---------------------------------------

        void Viesti(string teksti)
        {
            if (string.IsNullOrEmpty(teksti)) return;
            ViimeViesti = teksti;
            tilarivi.Viesti(teksti, 3.5f);
        }

        void Virhe(string teksti)
        {
            ViimeVirhe = teksti;
            Debug.LogWarning("MATKAKIRJA peli: " + teksti);
            tilarivi.Viesti(teksti, 4f);
        }

        /// <summary>Napautus ohjelmallisesti (testikomento): kuten sormi kaupungin merkillä.</summary>
        public string Napauta(string kaupunki)
        {
            if (verkko == null || !verkko.Kaupungit.ContainsKey(kaupunki)) return "tuntematon kaupunki " + kaupunki;
            ohitaPisteTarkistus = true;
            try
            {
                // Sama reitti kuin sormella: KaupunkiMerkit → IKamera.KaupunkiNapautettu → Napautettu.
                if (merkit == null || !merkit.ValitseKaupunki(kaupunki)) kierto.IlmoitaKaupunki(kaupunki);
            }
            finally { ohitaPisteTarkistus = false; }
            if (!Kaytossa) return "peli pois päältä";
            return Tila == SilmukanTila.Dialogi || KorttiKaupunki == kaupunki || (matka != null && matka.Tila.Pelaaja.Sijainti.Kaupunki == kaupunki)
                ? null : "matkavalinta ei auennut (tila " + Tila + ")";
        }

        public string TilaJson()
        {
            var json = PeliApu.TilaJson(matka, Tila.ToString(), DialogiKohde, Tila == SilmukanTila.Dialogi ? vaihtoehdot : null,
                Tavoite, LehtiAuki, ViimeViesti, ViimeVirhe, Viimeisin);
            // Kysymys ja syötelukko perään (PeliApu.TilaJson pysyy testattavana ilman Unityä).
            var lisa = ",\"syoteEstetty\":" + (SyoteLukko.Estetty ? "true" : "false")
                + ",\"tutkiTarjolla\":" + (TutkiTarjolla ? "true" : "false")
                + ",\"kortti\":" + PeliApu.Json(KorttiKaupunki)
                + ",\"puhe\":{\"paalla\":" + (Puhe.Paalla ? "true" : "false") + ",\"soi\":" + (puhe != null && puhe.Soi ? "true" : "false")
                + ",\"url\":" + PeliApu.Json(puhe?.SoivaUrl) + ",\"aika\":" + ((int)((puhe?.Aika ?? 0) * 10) / 10.0).ToString(System.Globalization.CultureInfo.InvariantCulture)
                + ",\"virhe\":" + PeliApu.Json(puhe?.ViimeVirhe) + ",\"saapumispuheita\":" + luennat.Saapumispuheita + ",\"luentoja\":" + luennat.Luentoja + "}"
                + ",\"kysymys\":" + KysymysApu.Json(KysymysTila, kysymysJaljella)
                + ",\"laukku\":" + Natiivi.Laukku.Json(Laukku())
                + ",\"aanet\":[" + string.Join(",", aaniLoki.Select(PeliApu.Json)) + "],\"lentoSoi\":" + (lentoSoi ? "true" : "false")
                + ",\"musiikki\":" + (aanisoitin != null ? aanisoitin.Json() : "null")
                + ",\"aarrepiste\":" + (Aarrepiste() is Aarrepiste ap ? "{\"kaupunki\":" + PeliApu.Json(ap.Kaupunki) + ",\"lukittu\":" + (ap.Lukittu ? "true" : "false") + "}" : "null")
                + ",\"sahke\":" + SahkeJson()
                + ",\"ajoitus\":" + PeliApu.Json(viimeAjoitus)
                + ",\"lento\":" + (Lento == null ? "null" : "{\"vaihe\":" + PeliApu.Json(lennonVaihe.ToString()) + ",\"kohde\":" + PeliApu.Json(Lento.Kohde)
                    + ",\"kesto\":" + Lento.Kesto.ToString("0.0", System.Globalization.CultureInfo.InvariantCulture) + ",\"aloitus\":" + (Lento.Aloitus ? "true" : "false") + "}")
                + ",\"siirtoKohteet\":[" + string.Join(",", siirtoKohteet.Select(k => "{\"avain\":" + PeliApu.Json(k.Avain) + ",\"kaupunki\":" + PeliApu.Json(k.Kaupunki)
                    + ",\"askeleet\":" + k.Askeleet + "}")) + "],\"valintavihje\":{\"kay\":" + (valintavihje.Kay ? "true" : "false") + ",\"nakyy\":" + (valintavihje.Nakyy ? "true" : "false") + "}"
                + ",\"tehtavaNappi\":" + PeliApu.Json(matka != null && matka.Tila.Pelaaja.Sijainti.Kaupungissa ? LehtiTilaNyt(matka.Tila.Pelaaja.Sijainti.Kaupunki).TehtavaNappi : null);
            return json.Substring(0, json.Length - 1) + lisa + "}";
        }
    }
}
