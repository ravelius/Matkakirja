// PELIOHJAIN: pelattava silmukka pallolla (Pelikoodari, erä 3, 23.9.2026).
//
//   kartta → napautus kaupunkiin → matkavalinta (MatkaDialogi) → Matkan teot
//   (PeliApu.Matkusta) → kamera-ajo kohteeseen (IKamera.Aja) → saapuessa
//   kaupunkilehti (ILehti, LehtiKuori) → lehti suljetaan → tallennus → kartta.
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
// kohtauksesta PalloKierron (IKamera), KaupunkiMerkit ja LehtiKuoren ja luo
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
    public enum SilmukanTila { Lataa, Kartta, Dialogi, Matkalla, Lehti, Virhe, Kysymys, Traileri, Aloitus }

    [DisallowMultipleComponent]
    public sealed class PeliOhjain : MonoBehaviour
    {
        /// <summary>Varaoletus, jos lähtöä ei valita: tarina alkaa Lontoosta (Fablen tarkastus C8).</summary>
        public const string AloitusKaupunki = "lontoo";
        public const string PelaajanNimi = "Fogg";
        const float AjonVara = 0.75f;       // valmis-kutsun varareitti, jos sormi keskeyttää kamera-ajon
        const float YleiskuvanKesto = 1.0f;

        public static PeliOhjain Instanssi { get; private set; }

        PalloKierto kierto;
        KaupunkiMerkit merkit;
        LehtiKuori lehti;
        /// <summary>Natiivilehti (PeliNakymat.Lehti); kun asetettu, WKWebView-kuorta ei käytetä.</summary>
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

        public SilmukanTila Tila { get; private set; } = SilmukanTila.Lataa;
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
        public bool LehtiAuki => lehtiNakyma != null ? lehtiNakyma.Auki : lehti != null && lehti.Auki;
        /// <summary>Onko jokin lehti käytössä (natiivilehti tai kuori).</summary>
        bool LehtiOn => lehtiNakyma != null || lehti != null;
        /// <summary>Lehden sivu tuli näkyviin (omistaja, aihe, sivu, laji): pulun ja luentojen reaktiot.</summary>
        public event Action<string, string, int, string> LehtiSivuNakyi;
        /// <summary>Kaupunkilehden kuori (Natiivi-UI: Avautui-tapahtuma latauspeitteelle).</summary>
        public LehtiKuori Lehti => lehti;
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

        /// <summary>Kortin Ohita-nappi: soiva luento häipyy nopeasti (LuentoLoppui herää).</summary>
        public void OhitaLuento()
        {
            if (soivaLuento != null || odottavaLuento != null) { odottavaLuento = null; puhe?.Pysayta(0.3f); }
        }

        /// <summary>Soiva luento, tai null.</summary>
        public Luento SoivaLuento => soivaLuento;

        /// <summary>Pelisilmukka päälle/pois (Natiivi-UI piilottaa omat näkymänsä).</summary>
        public event Action<bool> KaytossaMuuttui;

        /// <summary>
        /// Pelin tila tallentui teon jälkeen (raha, tavarat, julisteet, tietäjäpisteet voivat
        /// muuttua): laukun päivitys ja kukkaron välähdys (Natiivi-UI). Ei joka ruudussa.
        /// </summary>
        public event Action TilaMuuttui;

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
            o.Alusta(kierto, FindAnyObjectByType<KaupunkiMerkit>(), FindAnyObjectByType<LehtiKuori>() ?? LehtiKuori.Hae());
        }

        void Awake()
        {
            if (Instanssi != null && Instanssi != this) { Destroy(gameObject); return; }
            Instanssi = this;
        }

        void OnDestroy()
        {
            if (Instanssi == this) Instanssi = null;
            if (kierto != null) kierto.KaupunkiNapautettu -= Napautettu;
            if (lehti != null) { lehti.Suljettu -= LehtiSuljettu; lehti.Viesti -= LehtiViesti; }
            if (lehtiNakyma != null) lehtiNakyma.Suljettu -= LehtiSuljettu;
        }

        void Alusta(PalloKierto k, KaupunkiMerkit m, LehtiKuori l)
        {
            kierto = k;
            merkit = m;
            lehti = l;
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
            gameObject.AddComponent<PeliKomennot>().ohjain = this;
            puhe = Puhe.Hae();
            puhe.Puhuu += PuheMuuttui;

            ((IKamera)kierto).KaupunkiNapautettu += Napautettu;
            // Heittonapin päältä alkava veto ei pyöritä palloa.
            SyoteLukko.LisaaPeitto(p => Kaytossa && dialogi.PeittaaPisteen(p));
            // Lehti peittää pallon: pallo piirtää harvemmin sen ajan (NakymaPeitetty).
            if (lehtiNakyma != null)
            {
                SyoteLukko.LisaaNakymaPeitto(() => lehtiNakyma.Auki);
                lehtiNakyma.Suljettu += LehtiSuljettu;
            }
            else if (lehti != null)
            {
                SyoteLukko.LisaaNakymaPeitto(() => lehti != null && lehti.Auki);
                ((ILehti)lehti).Suljettu += LehtiSuljettu;
                lehti.Viesti += LehtiViesti;
            }

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

            yield return HaeLaattamaarat();
            AloitaTaiJatka();
            yield return HaeKysymykset();
            yield return HaeLuennat();
        }

        /// <summary>
        /// Aarrelaattojen määrät: kokoelma kokoelmat/laatat.json (Siirtoseppä
        /// #2944) tai, jos sitä ei vielä ole ämpärissä, laudan moduuli
        /// moduulit/js/packs/maailmankartta.json (Laattamaarat.Lue lukee molemmat).
        /// Kumpaakaan ei saatu → null = peli ilman laattoja (erän 1–2 muodot).
        /// </summary>
        IEnumerator HaeLaattamaarat()
        {
            Laattamaarat = null;
            // Moduuli on 1,7 Mt: sen määrät kirjoitetaan kerran pieneksi tiedostoksi versiokansion viereen.
            var tiivis = Valimuisti(versioPolku + "peli/laattamaarat.json");
            try
            {
                if (File.Exists(tiivis)) Laattamaarat = Laattamaarat.Lue(File.ReadAllText(tiivis));
                if (Laattamaarat != null && Laattamaarat.Yhteensa > 0) { Debug.Log($"MATKAKIRJA peli: laattoja {Laattamaarat.Yhteensa} (välimuisti)"); yield break; }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: laattamäärien välimuisti ei kelpaa: " + e.Message); }
            Laattamaarat = null;
            foreach (var polku in new[] { "kokoelmat/laatat.json", "moduulit/js/packs/maailmankartta.json" })
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
            string fokusvirrat = null;
            yield return HaeTiedosto("kokoelmat/fokusvirrat.json", false, true, t => fokusvirrat = t);
            try
            {
                fokus = Fokusdata.Lue(fokusvirrat);
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
                if (saannotTeksti != null)
                    foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(saannotTeksti)), "alkiot")))
                    {
                        var o = MiniJson.Objekti(a);
                        if (MiniJson.Teksti(o, "id") == "KATKOKUVA" && MiniJson.Kentta(o, "arvo") is Dictionary<string, object> k
                            && MiniJson.Teksti(k, "url") is string url) kohtaamiset.KatkoKuvaUrl = url;
                    }
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
        public KauppaTulos KauppaTeko(Func<Kaupat, KauppaTulos> teko)
        {
            if (kaupat == null || matka == null) return KauppaTulos.Epaonnistui("peli ei ole valmis");
            var lahto = matka.Tila.Pelaaja.Sijainti;
            tapahtumat.Clear();
            KauppaTulos t;
            int rahaEnnen = matka.Tila.Pelaaja.Raha;
            try { t = teko(kaupat); }
            catch (Exception e) { Debug.LogException(e); return KauppaTulos.Epaonnistui(e.Message); }
            if (!t.Ok) return t;
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
            if (verkko == null) return "sisältö ei ole vielä latautunut";
            if (lahtokaupunki != null && !Lahtokaupungit().Any(k => k.Id == lahtokaupunki)) return "ei lähtökaupunki: " + lahtokaupunki;
            if (Tila != SilmukanTila.Aloitus && Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi) return "silmukka on tilassa " + Tila;
            jatkettava = null;
            UusiPeli(siemen, lahtokaupunki);
            // Aloitusnäkymässä intro soi jo avaustekstin aikana ennen valintaa (web renderIntro →
            // playIntroVoice, Natiivi-UI); ilman näkymää se soi tässä kuten ennen.
            if (!AloitusNakyma) SoitaLuento(luennat.Intro, 1.0f);
            return null;
        }

        void JatkaMatkaa()
        {
            Kytke(matka);
            try { Tavoite = File.Exists(TavoitePolku) ? File.ReadAllText(TavoitePolku).Trim() : null; } catch { Tavoite = null; }
            if (Tavoite != null && !verkko.Kaupungit.ContainsKey(Tavoite)) Tavoite = null;
            // Auki jäänyt kysymys avataan uudelleen, kun kysymykset on ladattu (KytkeKysely).
            Kartalle(true);
            // Heiton ja siirron väliin jäänyt tallennus: siirrytään heti.
            if (matka.Tila.Vaihe == Vaihe.Siirto)
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
            Kartalle(true);
        }

        void Kytke(Matka m)
        {
            linssit = new Linssiomistus(passi ?? new Passi(), m.Tila.Linssit).Kytke(m);
            linssit.Kynnyssaanto = Linssirekisteri.Kynnys;   // omistajan sääntö (1400: radio ja topografia)
            kytkettyRekisteri = null;
            KytkeRekisteri();
            m.Tapahtui += (laji, teksti) => { tapahtumat.Add(teksti); if (m == matka) Aanita(Aanitunnukset.Tapahtuma(laji)); };
            m.Loysi += (p, l) =>
            {
                kysymysLoyto = l;
                if (m == matka) Aanita(Aanitunnukset.Aarre(l.Tyyppi));
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
            kysely = null;
            KytkeKysely();
        }

        /// <summary>Kysymysmoottori matkaan, kun sekä matka että kysymykset ovat valmiit.</summary>
        void KytkeKysely()
        {
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
                PeliApu.KirjoitaAtomisesti(TallennusPolku, matka.Tallenna());
                PeliApu.KirjoitaAtomisesti(TavoitePolku, Tavoite ?? "");
            }
            catch (Exception e) { Debug.LogError("MATKAKIRJA peli: tallennus epäonnistui: " + e.Message); }
            try { TilaMuuttui?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        void OnApplicationPause(bool tauko)
        {
            if (!tauko) return;
            Tallenna();
            // Web taustaHiljennaLuennat: taustalle mentäessä luenta katkeaa (ei jää tauolle).
            if (puhe != null) puhe.Pysayta(0.1f);
        }
        void OnApplicationQuit() => Tallenna();

        // --- kartta, napautus ja matkavalinta ---------------------------------

        void Kartalle(bool kameraPelaajaan)
        {
            Lentoaani(false);
            dialogi.Piilota();
            PiilotaKortti();
            DialogiKohde = null;
            vaihtoehdot = new List<MatkaVaihtoehto>();
            Tila = SilmukanTila.Kartta;
            PaivitaNakyma();
            PaivitaNappula();
            if (kameraPelaajaan && Kaytossa)
            {
                var k = PeliApu.Koordinaatti(verkko, matka.Tila.Pelaaja.Sijainti);
                if (k.HasValue) Ajo(k.Value.Lat, k.Value.Lon, SaapumisKaari, 1.5f, null);
            }
        }

        double SaapumisKaari => merkit != null ? merkit.saapumisKaari : 18.6;

        void PaivitaNakyma()
        {
            if (matka == null) return;
            tilarivi.Aseta(PeliApu.TilaTeksti(verkko, matka.Tila));
            bool kesken = Tila == SilmukanTila.Kartta && matka.Tila.Vaihe == Vaihe.Heitto && !matka.Tila.Pelaaja.Sijainti.Kaupungissa;
            if (kesken && Kaytossa)
                dialogi.NaytaHeitto(Tavoite != null ? "Heitä noppaa → " + PeliApu.KaupunginNimi(verkko, Tavoite) : "Heitä noppaa", () => Heita());
            else
                dialogi.PiilotaHeitto();
        }

        /// <summary>
        /// IKamera.KaupunkiNapautettu. KaupunkiMerkit kutsuu tätä ennen omaa
        /// kamera-ajoaan kaupunkiin, joten pelin oma kameraliike asetetaan
        /// LateUpdateen (kameranOhitus), jolloin se korvaa 3D:n ajon samassa ruudussa.
        /// </summary>
        void Napautettu(string kaupunki)
        {
            if (NapautusSallittu != null && !NapautusSallittu()) return;
            if (!Kaytossa || matka == null) return;
            bool uiPaalla = false;
            if (!ohitaPisteTarkistus && Pointer.current != null)
                uiPaalla = dialogi.PeittaaPisteen(Pointer.current.position.ReadValue());

            switch (Tila)
            {
                case SilmukanTila.Dialogi:
                case SilmukanTila.Kysymys:
                    PysaytaKamera(); // modaalinen: himmennyksen napautus peruu, pallo ei lennä
                    return;
                case SilmukanTila.Matkalla:
                    // Sormi keskeytti matka-ajon: jatketaan kohteeseen (varareitti hoitaa valmis-kutsun).
                    kameranOhitus = () => kierto.Aja(matkaKohde.Lat, matkaKohde.Lon, kierto.KorkeusKaarelle(SaapumisKaari), 0.8f, null);
                    return;
                case SilmukanTila.Kartta:
                    if (uiPaalla) { PysaytaKamera(); return; }
                    if (kaupunkiKortti != null) { AvaaKortti(kaupunki); return; }
                    AvaaDialogi(kaupunki);
                    return;
                default:
                    return;
            }
        }

        void PysaytaKamera() => kameranOhitus = () => kierto.Aja(kierto.leveys, kierto.pituus, 0, 0.05f, null);

        /// <summary>
        /// Kaupunkikortti (web kaupunkiliuska): Lue kaupunkilehti, Liiku tänne
        /// (matkavalinta) tai omassa kaupungissa Tutki kaupunkia. Kamera lentää
        /// kaupunkiin kuten 3D:ssä (KaupunkiMerkit), joten ohitusta ei aseteta.
        /// </summary>
        public string AvaaKortti(string kaupunki)
        {
            if (matka == null) return "peli ei ole valmis";
            if (kaupunkiKortti == null) return AvaaDialogi(kaupunki);
            if (Tila != SilmukanTila.Kartta) return "silmukka on tilassa " + Tila;
            if (!verkko.Kaupungit.ContainsKey(kaupunki)) return "tuntematon kaupunki " + kaupunki;
            var p = matka.Tila.Pelaaja;
            bool oma = p.Sijainti.Kaupungissa && p.Sijainti.Kaupunki == kaupunki;
            bool mannerlento = oma && kaupat != null && kaupat.MannerLennot().Count > 0;
            var t = new KaupunkiToiminnot
            {
                LueLehti = LehtiOn ? () => LueLehti(kaupunki) : (Action)null,
                Liiku = oma ? null : () => { PiilotaKortti(); AvaaDialogi(kaupunki); },
                LiikuTeksti = oma ? null : "Liiku tänne",
                Mannerlento = mannerlento ? () => { PiilotaKortti(); AvaaMannerlennot(); } : (Action)null,
                MannerlentoTeksti = mannerlento ? $"Mannerlento ({Vakiot.LentoHinta} {PeliApu.Valuutta})" : null,
                Sulje = () => PiilotaKortti(),
            };
            KorttiKaupunki = kaupunki;
            kaupunkiKortti.Nayta(kaupunki, PeliApu.KaupunginNimi(verkko, kaupunki), t);
            return null;
        }

        /// <summary>Kortin "Liiku tänne" (testikomento 'liiku'): kortti kiinni ja matkavalinta auki.</summary>
        public string Liiku(string kaupunki)
        {
            PiilotaKortti();
            return AvaaDialogi(kaupunki);
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
            vaihtoehdot = kohteet.Select(PeliApu.MannerlentoVaihtoehto).ToList();
            DialogiKohde = null;
            Tila = SilmukanTila.Dialogi;
            dialogi.PiilotaHeitto();
            var p = matka.Tila.Pelaaja;
            dialogi.Nayta("Mannerlento", $"{p.Raha} {PeliApu.Valuutta} · mantereen aarre löytyi, matka voi jatkua",
                vaihtoehdot.Select(v => (v.Nimi, v.Selite)).ToList(),
                i => Matkusta(kohteet[i].Kaupunki, Kulkutapa.Lento, true),
                () => Kartalle(false));
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
            return Matkusta(Tavoite, matka.Tila.Kulkutapa ?? Kulkutapa.Maa);
        }

        /// <summary>
        /// Matka kohteeseen valitulla tavalla (dialogin nappi, heittonappi ja
        /// testikomento 'matka'). Palauttaa virheen tai null.
        /// </summary>
        public string Matkusta(string kohde, Kulkutapa tapa, bool mannerlento = false, bool vapaa = false)
        {
            if (matka == null) return "peli ei ole valmis";
            if (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi) return "silmukka on tilassa " + Tila;
            if (kohde != null && !verkko.Kaupungit.ContainsKey(kohde)) return "tuntematon kaupunki " + kohde;
            dialogi.Piilota();
            dialogi.PiilotaHeitto();
            if (kohde != null) Tavoite = kohde;

            tapahtumat.Clear();
            var t = PeliApu.Matkusta(matka, Tavoite, tapa, mannerlento, vapaa && linssit != null ? linssit.VapaaSiirtyminen : (Func<string, TekoTulos>)null);
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
            if (t.Noppa.HasValue) osat.Add("Noppa " + t.Noppa.Value);
            osat.AddRange(tapahtumat);
            if (t.Saapui != null) osat.Add("Saavuit: " + PeliApu.KaupunginNimi(verkko, t.Saapui));
            Viesti(string.Join(" · ", osat));
            if (t.Noppa.HasValue) Aanita(Aanitunnukset.Noppa);
            Debug.Log($"MATKAKIRJA peli: {PeliApu.TavanNimi(t.Tapa)} {t.Lahto} → {t.Kohde}" + (t.Noppa.HasValue ? $" (noppa {t.Noppa})" : "")
                      + (t.Saapui != null ? ", saapui " + t.Saapui : ""));

            var a = PeliApu.Koordinaatti(verkko, t.Lahto);
            var b = PeliApu.Koordinaatti(verkko, t.Kohde);
            if (!t.Liikkui || !b.HasValue)
            {
                Kartalle(false);
                return null;
            }
            double kulma = a.HasValue ? PeliApu.Kulma(a.Value.Lat, a.Value.Lon, b.Value.Lat, b.Value.Lon) : 0;
            saapumisKaupunki = t.Saapui;
            matkaKohde = b.Value;
            Tila = SilmukanTila.Matkalla;
            tilarivi.Aseta(PeliApu.TilaTeksti(verkko, matka.Tila));
            // Lennon alun repliikki kerran istunnossa; muuten saapumispuhe kohteeseen.
            var lentoRepliikki = t.Tapa == Kulkutapa.Lento ? luennat.OtaLentoAlku() : null;
            if (lentoRepliikki != null) SoitaLuento(lentoRepliikki, 0.2f);
            else if (t.Saapui != null && PeliNakymat.Saapumistraileri == null) SoitaLuento(luennat.Saapumispuhe(t.Saapui), 0.3f);
            float kesto = PeliApu.AjoKesto(kulma);
            if (t.Tapa == Kulkutapa.Lento) Lentoaani(true, kesto);
            var nappula = Nappula;
            if (nappula != null && a.HasValue)
            {
                // Pelinappula (Natiiviseppä, B16): liftaus, laiva ja bussi ajavat reitin pisteet
                // (autokyyti), lento lentää kaaren; kamera seuraa nappulaa (seuraaKamera).
                if (t.Tapa == Kulkutapa.Lento)
                    NappulaAjo(v => nappula.Lenna(a.Value.Lat, a.Value.Lon, b.Value.Lat, b.Value.Lon, kesto, v), kesto, Perilla);
                else
                {
                    var pisteet = PeliApu.Matkapisteet(verkko, t.Lahto, t.Polku, t.Kohde);
                    NappulaAjo(v => nappula.Aja(pisteet, kesto, v), kesto, Perilla);
                }
                return null;
            }
            Ajo(b.Value.Lat, b.Value.Lon, SaapumisKaari, kesto, Perilla);
            return null;
        }

        /// <summary>Kamera-ajo perille: kaupungissa lehti, reitin varrella takaisin kartalle.</summary>
        void Perilla()
        {
            if (Tila != SilmukanTila.Matkalla) return;
            Lentoaani(false);
            var kaupunki = saapumisKaupunki;
            saapumisKaupunki = null;
            if (kaupunki != null) Aanita(Aanitunnukset.Saapuminen);
            if (kaupunki != null && TraileriTarjolla(kaupunki))
            {
                // Traileri ennen lehteä (web: saapumisesitys → lehti → luento).
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

        /// <summary>Traileri kerran per kaupunki istunnossa, ei aarrekaupungeissa (web saapumistraileri).</summary>
        bool TraileriTarjolla(string kaupunki) =>
            PeliNakymat.Saapumistraileri != null && Kaytossa && !trailerinaytetty.Contains(kaupunki) && !matka.LaattaTassa(kaupunki);

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

        void SaavuLehteen(string kaupunki)
        {
            if (kaupunki != null && LehtiOn)
            {
                Tila = SilmukanTila.Lehti;
                AvaaLehti(kaupunki);
                return;
            }
            Kartalle(false);
        }

        void LehtiSuljettu(string kaupunki)
        {
            if (Tila != SilmukanTila.Lehti) return;
            bool maalehti = maalehtiAuki;
            maalehtiAuki = false;
            Tallenna();
            Kartalle(false);
            // Lehdestä avattu tehtävä näkyviin vasta nyt.
            if (AvoinTehtava != Tehtava.Ei) { NaytaKysymys(); return; }
            // Lehden aikana tapahtunut mannerlento: kamera pelaajaan.
            var k = PeliApu.Koordinaatti(verkko, matka.Tila.Pelaaja.Sijainti);
            if (matka.Tila.Pelaaja.Sijainti.Kaupunki != kaupunki && k.HasValue) Ajo(k.Value.Lat, k.Value.Lon, SaapumisKaari, 1.5f, null);
            // Isoisän matkakirjaluento kaupungissa kerran istunnossa, kun lehti on luettu (ei maalehdestä).
            var l = maalehti ? null : luennat.OtaLuento(kaupunki);
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
            if (lehtiNakyma != null)
            {
                lehtiNakyma.Nayta(new LehtiAvaus { Maalehti = maa != null, Kaupunki = kaupunki, Maa = maa, Aihe = sivu },
                    LehtiTilaNyt(kaupunki), TeeLehtiTeko);
                return;
            }
            string tila = matka == null ? null
                : "{\"raha\":" + matka.Tila.Pelaaja.Raha.ToString(System.Globalization.CultureInfo.InvariantCulture)
                  + ",\"kaupat\":" + matka.Tila.Kaupat.Json() + "}";
            lehti.Avaa(kaupunki, tila, maa, sivu);
        }

        /// <summary>
        /// Lehtikuoren viesti {tapahtuma:'teko', teko, args} (verkkopelin
        /// js/lehtikuori.js kytkeTekoSilta): lehden kauppa- tai palkkioteko
        /// toistetaan natiivin Kaupoilla, jolloin raha ja kirjanpito tallentuvat.
        /// </summary>
        void LehtiViesti(string json)
        {
            Dictionary<string, object> o;
            try { o = MiniJson.Objekti(MiniJson.Jasenna(json)); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: lehden viesti ei jäsenny: " + e.Message); return; }
            if (MiniJson.Teksti(o, "tapahtuma") != "teko") return;
            var teko = MiniJson.Teksti(o, "teko");
            var a = MiniJson.Kentta(o, "args") as List<object> ?? new List<object>();
            var t = LehdenTeko(teko, a);
            Debug.Log($"MATKAKIRJA peli: lehden teko {teko} → {(t.Ok ? "ok" : t.Virhe)}, raha {matka?.Tila.Pelaaja.Raha}");
        }

        /// <summary>Lehden teko nimellä ja argumenteilla (webin metodinimet). Myös testikomento 'lehti-teko'.</summary>
        public KauppaTulos LehdenTeko(string teko, IReadOnlyList<object> a)
        {
            string S(int i) => i < a.Count ? a[i] as string : null;
            bool B(int i) => i < a.Count && a[i] is bool b && b;
            int? I(int i) => i < a.Count && a[i] is double d ? (int)d : (int?)null;
            return KauppaTeko(k =>
            {
                switch (teko)
                {
                    case "actionKulttuuri": return k.Kulttuuri(S(0), B(1), I(2) ?? KauppaVakiot.KulttuuriPalkkio);
                    case "actionMinitehtava": return k.Minitehtava(S(0), S(1), B(2), I(3) ?? KauppaVakiot.MinitehtavaPalkkio);
                    case "kirjaaNostotehtava": k.KirjaaNostotehtava(); return new KauppaTulos { Ok = true };
                    case "merkitseAarrepisteOhje": { bool uusi = k.MerkitseAarrepisteOhje(); return uusi ? new KauppaTulos { Ok = true } : KauppaTulos.Epaonnistui("Ohje jo nähty"); }
                    case "actionPullaVinkki": return k.PullaVinkki(S(0), I(1) ?? KauppaVakiot.PullaHinta);
                    case "actionPullaOstos": return k.PullaOstos(S(0), I(1) ?? KauppaVakiot.PullaHinta, S(2) ?? "sai vinkin");
                    case "actionElaintaky": return k.Elaintaky(S(0), I(1));
                    case "myonnaJuliste": return k.MyonnaJuliste(S(0));
                    default: return KauppaTulos.Epaonnistui("tuntematon teko " + teko);
                }
            });
        }

        /// <summary>Sulkee lehden (testikomento 'sulje-lehti').</summary>
        public string SuljeLehti()
        {
            if (!LehtiAuki) return "lehti ei ole auki";
            if (lehtiNakyma != null) lehtiNakyma.Sulje(); else lehti.Sulje();
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
                case LehtiTekoLaji.Kulttuurivastaus: tulos = KauppaTeko(k => k.Kulttuuri(t.Kaupunki, t.Oikein)); break;
                case LehtiTekoLaji.Minitehtavavastaus:
                    tulos = KauppaTeko(k => k.Minitehtava(t.Kaupunki, t.Aihe, t.Oikein, t.Palkkio > 0 ? t.Palkkio : KauppaVakiot.MinitehtavaPalkkio));
                    break;
                case LehtiTekoLaji.JulisteMyonto: tulos = KauppaTeko(k => k.MyonnaJuliste(t.Avain)); break;
                case LehtiTekoLaji.PullaVinkki: tulos = KauppaTeko(k => k.PullaVinkki(t.Kaupunki)); break;
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
            if (!t.Ok) { NaytaKysymys(t.Virhe); return t.Virhe; }
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
            var r = KysymysTeko(() => kysely.Vihje());
            if (r == null) Aanita(Aanitunnukset.Vihje);
            return r;
        }

        /// <summary>50:50 kysymyksessä.</summary>
        public string Puolita()
        {
            switch (AvoinTehtava)
            {
                case Tehtava.Kysymys: return Aanella(KysymysTeko(() => kysely.Puolita()), Aanitunnukset.Puolitus);
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

        /// <summary>Nappula pelaajan kohdalle (lataus, uusi peli, mannerlento, matkan jälkeen); piiloon ilman peliä.</summary>
        void PaivitaNappula()
        {
            var n = Nappula;
            if (n == null || n.Liikkeessa) return;
            var k = matka != null ? PeliApu.Koordinaatti(verkko, matka.Tila.Pelaaja.Sijainti) : null;
            if (k.HasValue && Kaytossa) n.Aseta(k.Value.Lat, k.Value.Lon); else n.Piilota();
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
            KytkeRekisteri();
            PaivitaReaktiot();
            PaivitaKysymysAika();
            // Pallo ei ota kosketuksia modaalisen näkymän (ja lehden) aikana.
            bool esta = Kaytossa && (Tila == SilmukanTila.Dialogi || Tila == SilmukanTila.Kysymys || Tila == SilmukanTila.Lehti || Tila == SilmukanTila.Traileri);
            if (esta != lukossa) { lukossa = esta; SyoteLukko.Aseta(this, esta); }
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
                + ",\"aarrepiste\":" + (Aarrepiste() is Aarrepiste ap ? "{\"kaupunki\":" + PeliApu.Json(ap.Kaupunki) + ",\"lukittu\":" + (ap.Lukittu ? "true" : "false") + "}" : "null")
                + ",\"tehtavaNappi\":" + PeliApu.Json(matka != null && matka.Tila.Pelaaja.Sijainti.Kaupungissa ? LehtiTilaNyt(matka.Tila.Pelaaja.Sijainti.Kaupunki).TehtavaNappi : null);
            return json.Substring(0, json.Length - 1) + lisa + "}";
        }
    }
}
