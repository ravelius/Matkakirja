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
    public enum SilmukanTila { Lataa, Kartta, Dialogi, Matkalla, Lehti, Virhe, Kysymys }

    [DisallowMultipleComponent]
    public sealed class PeliOhjain : MonoBehaviour
    {
        public const string AloitusKaupunki = "pariisi";
        public const string PelaajanNimi = "Fogg";
        const float AjonVara = 0.75f;       // valmis-kutsun varareitti, jos sormi keskeyttää kamera-ajon
        const float YleiskuvanKesto = 1.0f;

        public static PeliOhjain Instanssi { get; private set; }

        PalloKierto kierto;
        KaupunkiMerkit merkit;
        LehtiKuori lehti;
        IMatkaValinta dialogi;
        ITilarivi tilarivi;
        IKysymysNakyma kysymysNakyma;
        Kysely kysely;
        Kaksintaistelu rosvo;
        Pulmat pulmat;
        Tapahtumat tapahtumakortit;
        Kaupat kaupat;
        Pulmadata pulmadata;
        Kaksintaistelut kaksintaistelut;
        Tapahtumadata tapahtumadata;
        KysymysToiminnot kysymysToiminnot;
        Loyto kysymysLoyto;
        readonly List<string> kysymysLisat = new List<string>();
        float kysymysJaljella;
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
        public bool LehtiAuki => lehti != null && lehti.Auki;
        /// <summary>Kysymysmoottori (null, kunnes kysymykset on ladattu).</summary>
        public Kysely Kysely => kysely;
        /// <summary>Rosvon kaksintaistelu (null, kunnes kokoelma on ladattu).</summary>
        public Kaksintaistelu Kaksintaistelu => rosvo;
        /// <summary>Ostot ja palkkiot (Natiivi-UI:n lehdet, pulu, sähke kutsuvat PeliOhjaimen kautta).</summary>
        public Kaupat Kaupat => kaupat;
        /// <summary>Avoimen kysymyksen näkymätila (null, jos kysymys ei ole auki).</summary>
        public KysymysNaytto KysymysTila { get; private set; }
        /// <summary>Pelisilmukka päälle/pois (Natiivi-UI piilottaa omat näkymänsä).</summary>
        public event Action<bool> KaytossaMuuttui;

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
            if (lehti != null) lehti.Suljettu -= LehtiSuljettu;
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
            kysymysToiminnot = new KysymysToiminnot
            {
                Vastaa = i => Vastaa(i),
                Vihje = () => Vihje(),
                Puolita = () => Puolita(),
                Jatka = () => JatkaKysymyksesta(),
            };
            gameObject.AddComponent<PeliKomennot>().ohjain = this;

            ((IKamera)kierto).KaupunkiNapautettu += Napautettu;
            ((ILehti)lehti).Suljettu += LehtiSuljettu;

            if (File.Exists(PoisPolku))
            {
                Debug.Log("MATKAKIRJA peli: " + PoisPolku + " löytyi, pelisilmukka pois päältä");
                AsetaKaytossa(false);
            }
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
            string pulmaTeksti = null, rosvoTeksti = null, tapahtumaTeksti = null;
            yield return HaeKokoelma("kaksintaistelut", false, t => rosvoTeksti = t);
            yield return HaeTiedosto("kokoelmat/pulmat.json", false, true, t => pulmaTeksti = t);
            yield return HaeTiedosto("kokoelmat/tapahtumat.json", false, true, t => tapahtumaTeksti = t);
            try { if (pulmaTeksti != null) pulmadata = Pulmadata.Lue(pulmaTeksti); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: pulmat eivät jäsenny: " + e.Message); }
            try { if (rosvoTeksti != null) kaksintaistelut = Kaksintaistelut.Lue(rosvoTeksti); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: kaksintaistelut eivät jäsenny: " + e.Message); }
            try { if (tapahtumaTeksti != null) tapahtumadata = Tapahtumadata.Lue(tapahtumaTeksti); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: tapahtumat eivät jäsenny: " + e.Message); }
            if (kysymykset == null) yield break;
            try
            {
                var d = new Kysymysdata();
                d.LueKysymykset(kysymykset);
                if (kaari != null) d.LueTarinakaari(kaari);
                if (paikat != null) d.LuePaikkatiedot(paikat);
                Kysymykset = d;
                KytkeKysely();
                Debug.Log($"MATKAKIRJA peli: kysymyksiä {d.Kaupungeittain.Sum(x => x.Value.Count)} kaupungeissa, {d.Yleiset.Count} yleistä, {d.Kaaret.Count} kaarta");
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: kysymykset eivät jäsenny: " + e.Message); }
            if (kysely == null) SuljeAvoinKysymys();
        }

        // --- peli ja tallennus ----------------------------------------------

        void AloitaTaiJatka()
        {
            matka = null;
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
                    Debug.LogWarning("MATKAKIRJA peli: tallennus ei kelpaa (" + e.Message + "), aloitetaan uusi peli");
                    try { File.Copy(TallennusPolku, Path.Combine(Documents, "tallennus-rikki.json"), true); } catch { }
                }
            }
            if (matka == null || matka.Tila.Vaihe == Vaihe.Ohi) { UusiPeli(null); return; }

            Kytke(matka);
            try { Tavoite = File.Exists(TavoitePolku) ? File.ReadAllText(TavoitePolku).Trim() : null; } catch { Tavoite = null; }
            if (Tavoite != null && !verkko.Kaupungit.ContainsKey(Tavoite)) Tavoite = null;
            // Auki jäänyt kysymys avataan uudelleen, kun kysymykset on ladattu (KytkeKysely).
            Kartalle(true);
            // Heiton ja siirron väliin jäänyt tallennus: siirrytään heti.
            if (matka.Tila.Vaihe == Vaihe.Siirto)
                Matkusta(Tavoite, matka.Tila.Kulkutapa ?? Kulkutapa.Maa);
        }

        /// <summary>Uusi peli Pariisista (tai paketin ensimmäisestä aloituskaupungista). siemen null = kellosta.</summary>
        public void UusiPeli(long? siemen)
        {
            if (verkko == null) return;
            var aloitus = verkko.Kaupungit.ContainsKey(AloitusKaupunki) ? AloitusKaupunki
                : (verkko.KaupunkiLista.FirstOrDefault(k => k.Aloitus) ?? verkko.KaupunkiLista[0]).Id;
            if (lehti != null && lehti.Auki) lehti.Sulje();
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
            m.Tapahtui += (laji, teksti) => tapahtumat.Add(teksti);
            m.Loysi += (p, l) => kysymysLoyto = l;
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
            tapahtumakortit = tapahtumadata != null && tapahtumadata.Kortit.Count > 0 ? Tapahtumat.Kytke(kysely, tapahtumadata) : null;
            if (tapahtumakortit != null) tapahtumakortit.Tapahtui += (laji, teksti) => kysymysLisat.Add(teksti);
            rosvo = kaksintaistelut != null ? new Kaksintaistelu(matka, kaksintaistelut) : null;
            kaupat = new Kaupat(matka);
            // Pysy-tapa tuli tarjolle vasta nyt: vuoron alun esivalinta puretaan kuten webissä.
            if (matka.ArvioiEsivalinta()) Tallenna();
            if (AvoinTehtava != Tehtava.Ei) { if (Tila == SilmukanTila.Kartta) NaytaKysymys(); }
            else if (matka.Tila.Vaihe == Vaihe.Kysymys || matka.Tila.Vaihe == Vaihe.Kaksintaistelu || matka.Tila.Vaihe == Vaihe.Tapahtuma)
                SuljeAvoinKysymys();
            else PaivitaNakyma();
        }

        /// <summary>Kysymys-, kaksintaistelu- tai tapahtumavaihe ilman näytettävää (moottori tai data puuttuu): vuoro päättyy.</summary>
        void SuljeAvoinKysymys()
        {
            if (matka == null) return;
            var v = matka.Tila.Vaihe;
            if (v != Vaihe.Kysymys && v != Vaihe.Kaksintaistelu && v != Vaihe.Tapahtuma) return;
            matka.Tila.Kysely.Kysymys = null;
            matka.Tila.Kaksintaistelu = null;
            matka.Tila.Tapahtumakortti = null;
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
                else if (AvoinTehtava == Tehtava.Kaksintaistelu) matka.Tila.Kaksintaistelu.Sekunnit = jaljella;
            }
            try
            {
                PeliApu.KirjoitaAtomisesti(TallennusPolku, matka.Tallenna());
                PeliApu.KirjoitaAtomisesti(TavoitePolku, Tavoite ?? "");
            }
            catch (Exception e) { Debug.LogError("MATKAKIRJA peli: tallennus epäonnistui: " + e.Message); }
        }

        void OnApplicationPause(bool tauko) { if (tauko) Tallenna(); }
        void OnApplicationQuit() => Tallenna();

        // --- kartta, napautus ja matkavalinta ---------------------------------

        void Kartalle(bool kameraPelaajaan)
        {
            dialogi.Piilota();
            DialogiKohde = null;
            vaihtoehdot = new List<MatkaVaihtoehto>();
            Tila = SilmukanTila.Kartta;
            PaivitaNakyma();
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
            else if (TutkiTarjolla && Kaytossa)
                dialogi.NaytaHeitto("Tutki kaupunkia", () => Tutki());
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
                    AvaaDialogi(kaupunki);
                    return;
                default:
                    return;
            }
        }

        void PysaytaKamera() => kameranOhitus = () => kierto.Aja(kierto.leveys, kierto.pituus, 0, 0.05f, null);

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
            DialogiKohde = kaupunki;
            Tila = SilmukanTila.Dialogi;
            dialogi.PiilotaHeitto();
            string ala = $"{p.Raha} {PeliApu.Valuutta} · päivä {matka.Tila.Paiva()} · {PeliApu.AikaNimi(matka.Tila.Vuorokaudenaika())}";
            if (vaihtoehdot.Count == 0) ala += " · ei kulkutapaa nyt";
            dialogi.Nayta(PeliApu.KaupunginNimi(verkko, kaupunki), ala,
                vaihtoehdot.Select(v => (v.Nimi, v.Selite)).ToList(),
                i => Matkusta(DialogiKohde, vaihtoehdot[i].Tapa),
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
            if (!vaihtoehdot.Any(v => v.Tapa == tapa))
                return $"{PeliApu.TavanNimi(tapa)} ei ole tarjolla (tarjolla: {string.Join(", ", vaihtoehdot.Select(v => v.Nimi))})";
            return Matkusta(DialogiKohde, tapa);
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
        public string Matkusta(string kohde, Kulkutapa tapa)
        {
            if (matka == null) return "peli ei ole valmis";
            if (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi) return "silmukka on tilassa " + Tila;
            if (kohde != null && !verkko.Kaupungit.ContainsKey(kohde)) return "tuntematon kaupunki " + kohde;
            dialogi.Piilota();
            dialogi.PiilotaHeitto();
            if (kohde != null) Tavoite = kohde;

            tapahtumat.Clear();
            var t = PeliApu.Matkusta(matka, Tavoite, tapa);
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
            Ajo(b.Value.Lat, b.Value.Lon, SaapumisKaari, PeliApu.AjoKesto(kulma), Perilla);
            return null;
        }

        /// <summary>Kamera-ajo perille: kaupungissa lehti, reitin varrella takaisin kartalle.</summary>
        void Perilla()
        {
            if (Tila != SilmukanTila.Matkalla) return;
            var kaupunki = saapumisKaupunki;
            saapumisKaupunki = null;
            if (kaupunki != null && lehti != null)
            {
                Tila = SilmukanTila.Lehti;
                lehti.Avaa(kaupunki);
                return;
            }
            Kartalle(false);
        }

        void LehtiSuljettu(string kaupunki)
        {
            if (Tila != SilmukanTila.Lehti) return;
            Tallenna();
            Kartalle(false);
        }

        /// <summary>Sulkee lehden (testikomento 'sulje-lehti').</summary>
        public string SuljeLehti()
        {
            if (lehti == null || !lehti.Auki) return "lehti ei ole auki";
            lehti.Sulje();
            return null;
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
            Debug.Log($"MATKAKIRJA peli: {AvoinTehtava} {q?.Laji} {q?.Kaupunki ?? matka.Tila.Tapahtumakortti?.Kaupunki}");
            return null;
        }

        /// <summary>Mikä modaalinen tehtävä on auki pelitilassa.</summary>
        public enum Tehtava { Ei, Kysymys, Kaksintaistelu, Tapahtuma }

        public Tehtava AvoinTehtava
        {
            get
            {
                if (matka == null) return Tehtava.Ei;
                var t = matka.Tila;
                if (t.Vaihe == Vaihe.Kysymys && t.Kysely.Kysymys != null && kysely != null) return Tehtava.Kysymys;
                if (t.Vaihe == Vaihe.Kaksintaistelu && t.Kaksintaistelu != null && rosvo != null) return Tehtava.Kaksintaistelu;
                if (t.Vaihe == Vaihe.Tapahtuma && t.Tapahtumakortti != null && tapahtumakortit != null) return Tehtava.Tapahtuma;
                return Tehtava.Ei;
            }
        }

        int? TehtavanSekunnit()
        {
            switch (AvoinTehtava)
            {
                case Tehtava.Kysymys: { var q = matka.Tila.Kysely.Kysymys; return q.Valittu.HasValue ? null : q.Sekunnit; }
                case Tehtava.Kaksintaistelu: { var d = matka.Tila.Kaksintaistelu; return d.Valittu.HasValue ? null : d.Sekunnit; }
                default: return null;
            }
        }

        /// <summary>Avoin tehtävä (kysymys, pulma, kaksintaistelu, tapahtumakortti) näkyviin, myös tallennuksesta jatkettaessa.</summary>
        void NaytaKysymys(string viesti = null)
        {
            var tehtava = AvoinTehtava;
            if (tehtava == Tehtava.Ei) return;
            if (Tila != SilmukanTila.Kysymys)
            {
                // Jatkettaessa aika on tallennuksessa; uusi tehtävä asettaa sen tässä.
                kysymysJaljella = TehtavanSekunnit() ?? 0;
                dialogi.Piilota();
                dialogi.PiilotaHeitto();
                DialogiKohde = null;
                Tila = SilmukanTila.Kysymys;
                PysaytaKamera();
            }
            switch (tehtava)
            {
                case Tehtava.Kysymys:
                    KysymysTila = KysymysApu.Nakyma(kysely, matka.Tila.Kysely.Kysymys, kysymysLoyto, kysymysLisat, viesti);
                    break;
                case Tehtava.Kaksintaistelu:
                    KysymysTila = KysymysApu.Kaksintaistelu(rosvo);
                    KysymysTila.Viesti = viesti;
                    break;
                case Tehtava.Tapahtuma:
                    KysymysTila = KysymysApu.Tapahtumakortti(matka, matka.Tila.Tapahtumakortti);
                    KysymysTila.Viesti = viesti;
                    break;
            }
            if (Kaytossa) kysymysNakyma.Nayta(KysymysTila, kysymysToiminnot);
            if (KysymysTila.Sekunnit.HasValue) kysymysNakyma.PaivitaAika(kysymysJaljella);
            tilarivi.Aseta(PeliApu.TilaTeksti(verkko, matka.Tila));
        }

        string KysymysTeko(Func<TekoTulos> teko)
        {
            if (Tila != SilmukanTila.Kysymys || AvoinTehtava == Tehtava.Ei) return "kysymys ei ole auki";
            var t = teko();
            if (!t.Ok) { NaytaKysymys(t.Virhe); return t.Virhe; }
            Tallenna();
            NaytaKysymys();
            return null;
        }

        /// <summary>Vaihtoehdon valinta (näkymä ja testikomento 'vastaa i'): kysymys, pulma tai kaksintaistelu.</summary>
        public string Vastaa(int indeksi)
        {
            var tehtava = AvoinTehtava;
            if (tehtava == Tehtava.Tapahtuma) return "tapahtumakortissa ei vastata";
            var r = KysymysTeko(() => tehtava == Tehtava.Kaksintaistelu ? rosvo.Vastaa(indeksi) : kysely.Vastaa(indeksi));
            if (r == null) Debug.Log($"MATKAKIRJA peli: {tehtava} vastaus {indeksi}, {(KysymysTila.Oikein ? "oikein" : "väärin")}"
                                     + (kysymysLoyto != null ? ", laatta " + kysymysLoyto.WebTulos : "") + $", raha {matka.Tila.Pelaaja.Raha}");
            return r;
        }

        public string Vihje() =>
            AvoinTehtava == Tehtava.Kysymys ? KysymysTeko(() => kysely.Vihje()) : "vihjettä ei ole tarjolla";

        /// <summary>50:50 kysymyksessä, helpotus kaksintaistelussa.</summary>
        public string Puolita()
        {
            switch (AvoinTehtava)
            {
                case Tehtava.Kysymys: return KysymysTeko(() => kysely.Puolita());
                case Tehtava.Kaksintaistelu: return KysymysTeko(() => rosvo.Helpotus());
                default: return "50:50 ei ole tarjolla";
            }
        }

        /// <summary>
        /// Tuloksen Jatka-nappi (testikomento 'jatka'): kysymys suljetaan (ryöstäjän
        /// jälkeen alkaa kaksintaistelu samassa näkymässä), kaksintaistelu ja
        /// tapahtumakortti päättävät vuoron.
        /// </summary>
        public string JatkaKysymyksesta()
        {
            var tehtava = AvoinTehtava;
            if (Tila != SilmukanTila.Kysymys || tehtava == Tehtava.Ei) return "kysymys ei ole auki";
            if (KysymysTila != null && !KysymysTila.Vastattu) return "kysymykseen ei ole vastattu";
            var lahto = matka.Tila.Pelaaja.Sijainti;
            TekoTulos t;
            switch (tehtava)
            {
                case Tehtava.Kysymys: t = kysely.Sulje(); break;
                case Tehtava.Kaksintaistelu: t = rosvo.Sulje(); break;
                default: t = tapahtumakortit.Sulje(); break;
            }
            if (!t.Ok) return t.Virhe;
            kysymysLoyto = null;
            kysymysLisat.Clear();
            Tallenna();
            if (AvoinTehtava != Tehtava.Ei)
            {
                // Ryöstäjä: kaksintaistelu jatkuu samassa näkymässä uudella ajastimella.
                Tila = SilmukanTila.Kartta;
                NaytaKysymys();
                Debug.Log("MATKAKIRJA peli: " + AvoinTehtava + " alkoi");
                return null;
            }
            kysymysNakyma.Piilota();
            KysymysTila = null;
            // Tapahtumakortin kyyti siirtää pelaajaa: kamera seuraa.
            Kartalle(!matka.Tila.Pelaaja.Sijainti.Equals(lahto));
            return null;
        }

        void PaivitaKysymysAika()
        {
            if (Tila != SilmukanTila.Kysymys || KysymysTila == null || KysymysTila.Vastattu || !KysymysTila.Sekunnit.HasValue) return;
            if (!Kaytossa) return;
            kysymysJaljella -= Time.unscaledDeltaTime;
            if (kysymysJaljella > 0) { kysymysNakyma.PaivitaAika(kysymysJaljella); return; }
            kysymysJaljella = 0;
            kysymysNakyma.PaivitaAika(0);
            if (AvoinTehtava == Tehtava.Kaksintaistelu) KysymysTeko(() => rosvo.AikaLoppui());
            else KysymysTeko(() => kysely.AikaLoppui());
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

        void AjoValmis()
        {
            var v = ajoValmis;
            ajoValmis = null;
            v?.Invoke();
        }

        void Update()
        {
            if (ajoValmis != null && Time.unscaledTime > ajoLoppuu) AjoValmis();
            PaivitaKysymysAika();
            // Pallo ei ota kosketuksia modaalisen näkymän (ja lehden) aikana.
            bool esta = Kaytossa && (Tila == SilmukanTila.Dialogi || Tila == SilmukanTila.Kysymys || Tila == SilmukanTila.Lehti);
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
            return Tila == SilmukanTila.Dialogi || (matka != null && matka.Tila.Pelaaja.Sijainti.Kaupunki == kaupunki)
                ? null : "matkavalinta ei auennut (tila " + Tila + ")";
        }

        public string TilaJson()
        {
            var json = PeliApu.TilaJson(matka, Tila.ToString(), DialogiKohde, Tila == SilmukanTila.Dialogi ? vaihtoehdot : null,
                Tavoite, LehtiAuki, ViimeViesti, ViimeVirhe, Viimeisin);
            // Kysymys ja syötelukko perään (PeliApu.TilaJson pysyy testattavana ilman Unityä).
            var lisa = ",\"syoteEstetty\":" + (SyoteLukko.Estetty ? "true" : "false")
                + ",\"tutkiTarjolla\":" + (TutkiTarjolla ? "true" : "false")
                + ",\"kysymys\":" + KysymysApu.Json(KysymysTila, kysymysJaljella);
            return json.Substring(0, json.Length - 1) + lisa + "}";
        }
    }
}
