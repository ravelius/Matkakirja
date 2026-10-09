// ÄÄNISOITIN (B7 erä 3, spesifikaatio §2 ja §5.2): musiikki ja äänimaisema AudioSourceilla.
//
// AaniTila (Peli/Aani/AaniTila.cs, puhdas C#) päättää, mitä soi ja millä tasolla; tämä soitin
// toteuttaa sen Toiveet kanavittain ja kertoo takaisin, mitä laitteella tapahtui:
//   KestoTiedossa(s)   maiseman klippi latautui → arvottu aloituskohta (§2.6)
//   SilmukkaVaihtuu()  maiseman kierros on 2,6 s:n päässä lopusta (tai loppui) → kaupunkimaisema häipyy (kerran läpi),
//                      linssin taustaääni vaihtaa kierroksen ristiin
//   PohjaLoppui()      taustamusiikki soi kerran loppuun (omistaja 30.9.2026: ei silmukkaa)
//   Puuttuu(kanava)    HTTP-virhe, purkuvirhe tai latausvahti (§2.7)
//   AarreLoppui()      aarreaihe soi loppuun
//
// KANAVAT: Pohja, Maisema, Visa, Siirtyma ja Aarre, kullakin kaksi AudioSourcea (A/B): uusi soitin
// nousee, kun edellinen vielä häipyy (pohjan vaihto 1500 ms, maiseman vaihto 1800 ms ja silmukka
// 2600 ms, siirtymälajin vaihto, visan uudelleenavaus). Jos molemmat ovat käytössä, hiljaisin
// häipyvä katkaistaan.
//
// RAMPIT: lineaarisesti Time.unscaledDeltaTime-askelin (Tasoramppi, askel enintään 0,1 s, joten
// jumi tai tauko ei hyppää loppuarvoon). Uusi soitin nousee vasta, kun soitto on oikeasti alkanut
// (timeSamples liikkuu); siihen asti se on nollassa. Taso on AudioSource.volume = min(1, tavoite),
// paitsi maisemalla (alla).
//
// KOMPRESSORI (§2.2, ilman AudioMixeriä): maiseman lähteet ovat omissa lapsi-GameObjecteissaan
// ("Maisema A/B"), joissa MaisemaKompressori (OnAudioFilterRead) ajaa webin DynamicsCompressorin
// (Peli/Aani/Kompressori.cs, Chromiumin portti, makeup noin +6,4 dB) ja kertoo tuloksen tasolla
// kompressorin JÄLKEEN kuten web (kompressori → gain). Maiseman AudioSource.volume on aina 1 ja taso
// menee suodattimeen leikkaamatta (web-gain sallii yli 1:n). Kompressori nollataan klipin alussa
// (web: oma solmu jokaiselle soittimelle). Pohjaa, visaa, siirtymää ja aarretta ei kompressoida.
//
// LATAUS (oma, ei Natiivi-UI:n Aanet.Hae): 1) tavut levylle kerran (persistentDataPath/aanet/,
// sama nimikaava kuin Aanet.Levy, atominen siirto), latausvahti 6 s ilman uusia tavuja; 2) klippi
// levyltä UnityWebRequestMultimedialla: yli 3 Mt striimattuna (streamAudio, oma klippi per soitin),
// muuten purettuna ja jaettuna saman osoitteen soittimien kesken (viitelaskuri). Soitin omistaa
// klippinsä ja tuhoaa ne, kun viimeinen soitin vapautuu, joten Aanet-palvelun LRU (24 klippiä) ei voi
// tuhota soivaa raitaa eikä purettuja musiikkiklippejä kerry muistiin.
//
// TAUSTALLE (§2.8): OnApplicationPause(true) → kaikki soivat Pause() ja rampit jäädytetään, sitten
// AaniTila.TaustalleSiirto(true). Paluussa kone kertoo, mitkä jatkavat (UnPause) ja mitkä loppuvat.
//
// ASETUKSET (Natiivi-UI:n Asetukset): Kytkin.Musiikki → MusiikkiPaalle, Kytkin.Aanimaisema →
// AanimaisemaPaalle, Voima.Musiikki → AsetaLiuku(round(taso × 100)), Voima.Tausta → AsetaTausta.
//
// KOUKUT: PeliOhjain.Aanet.cs syöttää pelin tilan (Aanikoukut). Natiivi-UI:n koukut ovat alla
// staattisina kutsuina (yksi rivi per koukku), esim. Aanisoitin.Hiljennys("pollo", true).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using Matkakirja.Linssit;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
#if UNITY_IOS && !UNITY_EDITOR
using System.Runtime.InteropServices;
#endif

namespace Matkakirja.Natiivi
{
    [DisallowMultipleComponent]
    public sealed class Aanisoitin : MonoBehaviour
    {
        public static Aanisoitin Instanssi { get; private set; }

        /// <summary>Musiikin ja äänimaiseman tapahtumakone (UI:n ja linssien koukut kutsuvat tätä).</summary>
        public AaniTila Tila { get; private set; }
        /// <summary>Äänitaulut (PeliOhjain täyttää paketista: kaupungit, aanitaulut, aani-ehdokkaat).</summary>
        public AaniTaulut Taulut { get; private set; }
        /// <summary>Pelin tilasta AaniTilan tapahtumiksi (PeliOhjain.Aanet.cs).</summary>
        public Aanikoukut Koukut { get; private set; }

        const int Kanavia = 5, LahteitaKanavalla = 2;

        // =====================================================================
        // NATIIVI-UI:N JA LINSSIEN KOUKUT (§3 *UI*): yksi rivi per koukku, turvallinen ennen käynnistystä.
        // =====================================================================

        /// <summary>
        /// Hiljennyssyy (web hiljennaAmbienssi/palautaAmbienssi): "pollo" (PuluChat auki/kiinni), "lehti"
        /// (lehti, joka ei avaudu PeliOhjaimen ILehtiNakyman kautta; tuplakutsu on harmiton).
        /// </summary>
        public static void Hiljennys(string syy, bool paalla)
        {
            var s = Instanssi;
            if (s == null || syy == null) return;
            if (syy == "lehti") s.Koukut.Lehti(paalla); else s.Tila.Hiljennys(syy, paalla);
        }

        /// <summary>Musiikkitila (web asetaMusiikkitila): "matkalaukku" auki/kiinni (Matkalaukku.AukiMuuttui).</summary>
        public static void MusiikkiTila(string nimi, bool auki) => Instanssi?.Tila.Tila(nimi, auki);

        /// <summary>Portin "Aloita seikkailu" (web aloitaAvauksenAani). Purku tulee pelistä (intron loppu / kartalle).</summary>
        /// <summary>
        /// Portin "Aloita seikkailu" (UI). Ei tee mitään: avauksen sekoitus alkaa intron luennan alkaessa
        /// (PeliOhjain.Aanet.cs), koska natiivin aloituskaavassa intro alkaa vasta lennolla.
        /// </summary>
        public static void AvausAlkoi() { }

        /// <summary>Paljastuskortti näkyy (laattatyyppi: star, mannerAarre, isoAarre, pieniAarre; muut = ei aihetta).</summary>
        public static void AarrePaljastui(string tyyppi) => Instanssi?.Tila.AarrePaljastui(tyyppi);

        /// <summary>Musiikkisuunnitelman aiheet (vaihe 1, 26.9.2026): aloituslento, uusi kaupunki ja matkan loppu.</summary>
        public static void AloituslentoAlkoi() => Instanssi?.Tila.AloituslentoAlkoi();
        public static void UusiKaupunki(string kaupunki) => Instanssi?.Tila.UusiKaupunki(kaupunki);
        public static void MatkaLoppui() => Instanssi?.Tila.MatkaLoppui();
        /// <summary>Vaihe 2: tehtävän tulos (oikein → musa-ratkaisu, muuten musa-epaonnistuminen), ei katkaise aihetta.</summary>
        public static void TehtavanTulos(bool oikein) => Instanssi?.Tila.TehtavanTulos(oikein);

        static bool puluPuhuu, nayteSoi;

        /// <summary>Pulun puhe soi (web merkitsePuhuja PUHUJA_PULU): vain reunat välitetään.</summary>
        public static void PuluPuhuu(bool puhuu)
        {
            var s = Instanssi;
            if (s == null || puhuu == puluPuhuu) return;
            puluPuhuu = puhuu;
            s.Tila.Puhe(puhuu);
        }

        /// <summary>Kulttuurinäyte (tai muu ääninäyte) soi lehdessä: tausta 0,15:een (web vaimennaTausta).</summary>
        public static void Nayte(bool soi)
        {
            var s = Instanssi;
            if (s == null || soi == nayteSoi) return;
            nayteSoi = soi;
            s.Tila.Nayte(soi);
        }

        /// <summary>Linssin oma raita: "keksinnot", "ihmisen-matka"; null = linssin raita loppuu.</summary>
        public static void LinssiMusiikki(string laji)
        {
            var s = Instanssi;
            if (s == null) return;
            if (laji == null) s.Koukut.LinssinRaitaLoppui(); else s.Koukut.Siirtyma(laji);
        }

        /// <summary>
        /// Linssien taustaäänet (ILinssiYmparisto.Taustaaani, Pelikoodari 26.9.2026): tunnus → osoite, voima (web
        /// KERROKSET-nupit) ja nousu. Uudet tunnukset lisätään tähän (musiikki- ja äänisuunnitelma 26.9.).
        /// </summary>
        public static readonly Dictionary<string, (string Url, double Voima, int NousuMs)> LinssiTaustat =
            new Dictionary<string, (string, double, int)>
            {
                // Web js/linssit/satelliitti-aani.js ASTRONAUTIN_HUMINA: 84 s, −30,48 LUFS, voima 0,45, nousu 2 s.
                ["astro-humina"] = ("https://media.matkakirja.app/matkakirja/aanet/linssit/astronautin-kamera/20260916/"
                                    + "93aaf7fb15092bac80abd1d740aa2a22a0fdb761558df2273673bc263fde2f2b.mp3", 0.45, 2000),
            };

        /// <summary>Linssin taustaääni tunnuksella; null = pois. Tuntematon tunnus kirjataan eikä soi.</summary>
        public static void LinssiTausta(string tunnus)
        {
            var s = Instanssi;
            if (s == null) return;
            // Linssiseppä 1.10. (savuke 1.1 (83) FAIL): ISS-humina (CupolaAani) korvaa astro-huminan koko linssin ajan. Linssi
            // asettaa taustansa CupolaAanin jälkeen, joten korvaus tehdään tässä eikä kutsujärjestys ratkaise.
            if (tunnus != null && Matkakirja.Natiivi.CupolaAani.KorvaaLinssinTaustan(tunnus)) tunnus = null;
            if (tunnus == null) { s.Tila.LinssiTausta(null, 0, 0); return; }
            if (!LinssiTaustat.TryGetValue(tunnus, out var t)) { Debug.Log("MATKAKIRJA aani: tuntematon linssin taustaääni " + tunnus); return; }
            s.Tila.LinssiTausta(t.Url, t.Voima, t.NousuMs);
        }

        /// <summary>Linssin raidan himmennys (kellon pysäytys 0,5; jatko 1).</summary>
        public static void LinssiHimmennys(double kerroin) => Instanssi?.Tila.Himmennys(kerroin);

        static bool dioraamaRepliikkiPuhuu;

        /// <summary>
        /// Dioraaman repliikki soi (ILinssiYmparisto.Repliikki, sama reunarajapinta kuin PuluPuhuu, oma tunnus
        /// "dioraama-repliikki"): kuuluu samaan puhujien laskuriin kuin Kertoja ja Pulu, joten 5 kanavaa
        /// väistyvät repliikin ajan. Tuplakutsu samalla arvolla on harmiton (vain reuna vaikuttaa).
        /// </summary>
        public static void DioraamaRepliikki(bool puhuu)
        {
            var s = Instanssi;
            if (s == null || puhuu == dioraamaRepliikkiPuhuu) return;
            dioraamaRepliikkiPuhuu = puhuu;
            s.Tila.Puhe(puhuu);
        }

        /// <summary>
        /// Uusi nimetty taustasilmukka poolista (ILinssiYmparisto.Silmukka): tunnus on valmis URL. Kahva
        /// palautuu aina (ei koskaan null), vaikka Aanisoitin ei olisi käynnistynyt tai lataus epäonnistuisi;
        /// se ei silloin vain soi. Nimi LinssiSilmukka (ei Silmukka): Matkakirja.Peli.Silmukka on tässä
        /// tiedostossa käytössä oleva staattinen apuluokka (maiseman ristihäivytyksen ajoitus).
        /// </summary>
        public static ISilmukka LinssiSilmukka(string tunnus)
        {
            var s = Instanssi;
            var l = new PooliAani { Url = tunnus, Saumaton = true };
            var kahva = new SilmukkaKahva(s, l);
            if (s == null || string.IsNullOrEmpty(tunnus)) return kahva;
            s.pooliElossa.Add(l);
            s.TaytaTarvittaessa(l);
            s.StartCoroutine(s.HaePooli(l, l.Vuoro));
            return kahva;
        }

        // =====================================================================
        // SOITTIMET JA KLIPIT
        // =====================================================================

        sealed class Klippi
        {
            public string Url;
            public AudioClip Clip;
            /// <summary>Striimatun klipin pyyntö pidetään elossa klipin ajan.</summary>
            public UnityWebRequest Pyynto;
            public int Viitteet;
            public bool Striimi, Valmis, Virhe, Tuhottu;
            /// <summary>Välimuistiavain, jos eri kuin Url (saumaton silmukka: Url + "#saumaton").</summary>
            public string Avain;
        }

        sealed class Lahde
        {
            public Kanava Kanava;
            public AudioSource A;
            /// <summary>Maiseman kompressori (lähteen lapsi-GameObjectissa); muilla kanavilla null.</summary>
            public MaisemaKompressori Komp;
            public string Url;
            public Klippi K;
            public readonly Tasoramppi Taso = new Tasoramppi(0);
            public double Tavoite, Alku;
            public int NousuMs;
            public bool Silmukka, Kerran, Tauko = true;
            public bool Ladattu, Kaynnistetty, Soi, Tauotettu, Poistuva, Vapautettu;
            public bool SilmukkaPyydetty, LoppuIlmoitettu, OdottaaVerkkoa;
            public float KaynnistysAika, Uusinta;
            public int AlkuNayte, Vuoro;
        }

        sealed class Latausvirhe { public long Http; public bool Verkko, Aika, Purku; }

        // --- silmukkapooli (Linnanrakentaja erä 2, dioraama; ISilmukka) --------

        /// <summary>Yksi poolin silmukka: oma AudioSource, ei jaa kanavien 5×2 lähdettä eikä Toive-järjestelmää.</summary>
        sealed class PooliAani
        {
            public string Url;
            public AudioSource A;
            public Klippi K;
            /// <summary>Kutsujan pyytämä taso (ISilmukka.Voimakkuus), rampattuna liukuS:ssä.</summary>
            public readonly Tasoramppi Taso = new Tasoramppi(0);
            public bool Ladattu, Kaynnistetty, Lopetettu, Vapautettu, VaroitettuKerran;
            /// <summary>Sanelun kova tauko on pysäyttänyt silmukan (Natiiviseppä 29.9., katselmointi a/c).</summary>
            public bool Tauotettu;
            public int Vuoro;
            /// <summary>Linssin silmukka (LinssiSilmukka): puretaan saumattomaksi (PuraSaumaton).</summary>
            public bool Saumaton;
        }

        /// <summary>ISilmukka-kahva: turvallinen kutsua vapautuksen jälkeenkin (L.Vapautettu ohittaa hiljaa).</summary>
        sealed class SilmukkaKahva : ISilmukka
        {
            readonly Aanisoitin s;
            internal readonly PooliAani L;
            public SilmukkaKahva(Aanisoitin s, PooliAani l) { this.s = s; L = l; }
            public void Voimakkuus(float taso, float liukuS) => s?.PooliVoimakkuus(L, taso, liukuS);
            public void Lopeta(float haiveS = 0.35f) => s?.PooliLopeta(L, haiveS);
        }

        /// <summary>Enintään näin monta samanaikaista poolisilmukkaa; ylite lopettaa hiljaisimman (loki kerran).</summary>
        public const int SilmukkaKatto = 6;
        readonly List<PooliAani> pooliElossa = new List<PooliAani>();
        /// <summary>AaniTilan globaali väistö (Voimassa, esim. Pulun puhe) rampattuna poolille samalla 650 ms:llä
        /// kuin muu puheväistö (AaniVakiot.VaistoLiukuMs).</summary>
        readonly Tasoramppi pooliVaisto = new Tasoramppi(1);

        readonly AudioSource[,] lahteet = new AudioSource[Kanavia, LahteitaKanavalla];
        readonly MaisemaKompressori[,] kompressorit = new MaisemaKompressori[Kanavia, LahteitaKanavalla];
        readonly Lahde[] nykyiset = new Lahde[Kanavia];
        readonly List<Lahde> elavat = new List<Lahde>();
        readonly Dictionary<string, Klippi> klipit = new Dictionary<string, Klippi>();
        readonly HashSet<string> ladataan = new HashSet<string>();
        readonly Dictionary<string, Latausvirhe> latausvirheet = new Dictionary<string, Latausvirhe>();
        readonly List<Action> jalkeen = new List<Action>();
        readonly System.Random arpa = new System.Random();
        bool jaassa;

        static string Kansio => Path.Combine(Application.persistentDataPath, "aanet");

        /// <summary>Buildiin mukana oleva (Mukana, esim. etusivun musiikki, löydös 118) tai levyvälimuistin polku.</summary>
        static string LevyPolku(string url) =>
            Mukana.Polku(url) ?? Path.Combine(Kansio, Aanilataus.LevyNimi(url).Replace('/', Path.DirectorySeparatorChar));

        // --- elinkaari ---------------------------------------------------------

        void Awake()
        {
            if (Instanssi != null && Instanssi != this) { Destroy(this); return; }
            Instanssi = this;
            dioraamaRepliikkiPuhuu = false; // (Natiiviseppä 29.9., katselmointi a/c)
            Taulut = AaniTaulut.Oletus();
            Tila = new AaniTila(Taulut, arpa.NextDouble);
            Koukut = new Aanikoukut(Tila, Taulut);
            for (int k = 0; k < Kanavia; k++)
                for (int i = 0; i < LahteitaKanavalla; i++)
                {
                    bool maisema = (Kanava)k == Kanava.Maisema;
                    // Maisema omaan lapsiobjektiinsa: suodatin koskee kaikkia saman olion lähteitä.
                    var go = gameObject;
                    if (maisema)
                    {
                        go = new GameObject(i == 0 ? "Maisema A" : "Maisema B");
                        go.transform.SetParent(transform, false);
                    }
                    var a = go.AddComponent<AudioSource>();
                    a.playOnAwake = false;
                    a.spatialBlend = 0f;
                    a.volume = maisema ? 1f : 0f;
                    a.priority = maisema ? 96 : 64;
                    lahteet[k, i] = a;
                    if (maisema) kompressorit[k, i] = go.AddComponent<MaisemaKompressori>();
                }
            Tila.Muuttui += TilaMuuttui;
            Asetukset.Muuttui += AsetuksetMuuttuivat;
            Sanelu.Alkoi += SaneluAlkoi;
            Sanelu.Loppui += SaneluLoppui;
            // Oletuksesta poikkeavat asetukset koneeseen ennen ensimmäistä paikkaa (ei pohjaa ilman paikkaa).
            if (!Asetukset.Paalla(Kytkin.Aanimaisema)) Tila.AanimaisemaPaalle(false);
            if (!Asetukset.Paalla(Kytkin.Musiikki)) Tila.MusiikkiPaalle(false);
            Tila.AsetaLiuku(Musiikkitaso.Asetuksesta(Asetukset.Taso(Voima.Musiikki)));
            Tila.AsetaTausta(Asetukset.Taso(Voima.Tausta));
        }

        void OnDestroy()
        {
            Asetukset.Muuttui -= AsetuksetMuuttuivat;
            if (Tila != null) Tila.Muuttui -= TilaMuuttui;
            Sanelu.Alkoi -= SaneluAlkoi;
            Sanelu.Loppui -= SaneluLoppui;
            foreach (var l in elavat.ToArray()) Vapauta(l);
            foreach (var l in pooliElossa.ToArray()) PooliVapauta(l);
            foreach (var k in new List<Klippi>(klipit.Values)) Tuhoa(k);
            if (Instanssi == this) { Instanssi = null; dioraamaRepliikkiPuhuu = false; } // (Natiiviseppä 29.9., katselmointi a/c)
        }

        void AsetuksetMuuttuivat(string nimi)
        {
            // Kytkin.Musiikki ja Voima.Musiikki ovat molemmat "Musiikki"; Nollaa = "kaikki".
            bool kaikki = nimi == "kaikki";
            if (kaikki || nimi == nameof(Kytkin.Aanimaisema))
            {
                bool p = Asetukset.Paalla(Kytkin.Aanimaisema);
                if (p != Tila.Aanimaisema) Tila.AanimaisemaPaalle(p);
            }
            if (kaikki || nimi == nameof(Kytkin.Musiikki))
            {
                bool p = Asetukset.Paalla(Kytkin.Musiikki);
                if (p != Tila.Musiikki) Tila.MusiikkiPaalle(p);
                Tila.AsetaLiuku(Musiikkitaso.Asetuksesta(Asetukset.Taso(Voima.Musiikki)));
            }
            if (kaikki || nimi == nameof(Voima.Tausta)) Tila.AsetaTausta(Asetukset.Taso(Voima.Tausta));
        }

        // SANELUN KOVA TAUKO (web ambience-stream.js taukoaSanelunAjaksi / jatkaSanelunJalkeen, §2.8):
        // maisema ja pohjaraita pysäytetään oikeasti sanelun ajaksi ja jatketaan samasta kohdasta.
        // Kone ei tiedä tauosta (web: saneluTauolla-lippu soittimessa), joten toiveet pysyvät ennallaan.
        readonly List<Lahde> sanelunTauottamat = new List<Lahde>();
        // Poolisilmukat (Linssi/dioraama) tauotetaan samoin (Natiiviseppä 29.9., katselmointi a/c).
        readonly List<PooliAani> sanelunTauottamatPooli = new List<PooliAani>();

        void SaneluAlkoi()
        {
            foreach (var l in elavat)
                if ((l.Kanava == Kanava.Pohja || l.Kanava == Kanava.Maisema) && l.Kaynnistetty && !l.Tauotettu && l.A.isPlaying)
                { l.A.Pause(); l.Tauotettu = true; sanelunTauottamat.Add(l); }
            // (Natiiviseppä 29.9., katselmointi a/c): poolisilmukat samoin kuin Pohja ja Maisema.
            foreach (var p in pooliElossa)
                if (!p.Vapautettu && p.Kaynnistetty && !p.Tauotettu && p.A != null && p.A.isPlaying)
                { p.A.Pause(); p.Tauotettu = true; sanelunTauottamatPooli.Add(p); }
        }

        void SaneluLoppui()
        {
            foreach (var l in sanelunTauottamat)
                if (!l.Vapautettu && l.Tauotettu && !jaassa) { l.A.UnPause(); l.Tauotettu = false; }
            sanelunTauottamat.Clear();
            // (Natiiviseppä 29.9., katselmointi a/c): poolisilmukat jatkuvat samasta kohdasta.
            foreach (var p in sanelunTauottamatPooli)
                if (!p.Vapautettu && p.Tauotettu && p.A != null && !jaassa) { p.A.UnPause(); p.Tauotettu = false; }
            sanelunTauottamatPooli.Clear();
        }

        void OnApplicationPause(bool tauko)
        {
            if (tauko == jaassa || Tila == null) return;
            jaassa = tauko;
            if (tauko)
            {
                // Kaikki soivat (myös häipyvät) seis ja rampit jäädytetään (Update ei askella).
                foreach (var l in elavat)
                    if (l.Kaynnistetty && !l.Tauotettu && l.A.isPlaying) { l.A.Pause(); l.Tauotettu = true; }
                Tila.TaustalleSiirto(true);
                return;
            }
            Tila.TaustalleSiirto(false);
            // Häipyvät jatkavat häivytystään; nykyiset ovat jo koneen toiveen mukaisesti jatkaneet tai loppuneet.
            foreach (var l in elavat)
                if (l.Poistuva && l.Tauotettu) { l.A.UnPause(); l.Tauotettu = false; }
        }

        // --- toiveet ---------------------------------------------------------------

        bool sovelletaan;

        void TilaMuuttui(AaniTila t)
        {
            sovelletaan = true;
            try { for (int k = 0; k < Kanavia; k++) Sovella((Kanava)k, t.Toive((Kanava)k)); }
            catch (Exception e) { Debug.LogException(e); }
            finally { sovelletaan = false; }
            // Silmukkapoolin globaali väistö (esim. Pulun puhe): samalla rampilla kuin muu puheväistö.
            if (t.Voimassa != pooliVaisto.Kohde) pooliVaisto.Aloita(t.Voimassa, AaniVakiot.VaistoLiukuMs);
            if (jalkeen.Count == 0) return;
            var teot = jalkeen.ToArray();
            jalkeen.Clear();
            foreach (var teko in teot) { try { teko(); } catch (Exception e) { Debug.LogException(e); } }
        }

        void Sovella(Kanava k, Toive w)
        {
            var nyk = nykyiset[(int)k];
            if (nyk != null && (w.Uusi || w.Url == null))
            {
                nykyiset[(int)k] = null;
                Poista(nyk, w.PoisMs ?? 0);
                nyk = null;
            }
            if (w.Url == null) return;
            if (nyk == null)
            {
                nyk = Luo(k, w);
                nykyiset[(int)k] = nyk;
            }
            else if (nyk.Url != w.Url) VaihdaOsoite(nyk, w.Url); // varareitti samalla soittimella
            nyk.Tavoite = w.Tavoite;
            nyk.Alku = w.Alku;
            nyk.Silmukka = w.Silmukka;
            nyk.Kerran = w.Kerran;
            nyk.Tauko = w.Tauko;
            if (w.KestoMs.HasValue)
            {
                if (nyk.Soi) nyk.Taso.Aloita(w.Tavoite, w.KestoMs.Value);
                else if (nyk.NousuMs == 0 && w.KestoMs.Value > 0) nyk.NousuMs = w.KestoMs.Value;
            }
            PaivitaSoitto(nyk);
        }

        Lahde Luo(Kanava k, Toive w)
        {
            var a = VapaaLahde(k);
            var l = new Lahde
            {
                Kanava = k, A = a, Komp = KompressoriLahteelle(k, a), Url = w.Url, Tavoite = w.Tavoite, Alku = w.Alku,
                Silmukka = w.Silmukka, Kerran = w.Kerran, Tauko = w.Tauko, NousuMs = w.KestoMs ?? 0,
            };
            if (l.Komp != null) l.Komp.Ohita = w.IlmanKompressoria;
            elavat.Add(l);
            StartCoroutine(Hae(l, l.Vuoro));
            return l;
        }

        MaisemaKompressori KompressoriLahteelle(Kanava k, AudioSource a)
        {
            for (int i = 0; i < LahteitaKanavalla; i++) if (lahteet[(int)k, i] == a) return kompressorit[(int)k, i];
            return null;
        }

        /// <summary>
        /// Lähteen taso: maisemalla kompressorin jälkeen suodattimessa (volume 1, ei leikkausta, web-gain),
        /// muilla AudioSource.volume = min(1, taso).
        /// </summary>
        static void AsetaTaso(Lahde l, double taso)
        {
            if (l.A == null) return;
            if (l.Komp != null) { l.A.volume = 1f; l.Komp.Taso = (float)taso; }
            else l.A.volume = (float)Math.Min(1.0, taso);
        }

        static float Taso(Lahde l) => l.Komp != null ? l.Komp.Taso : l.A != null ? l.A.volume : 0f;

        /// <summary>Kanavan vapaa AudioSource; jos molemmat ovat käytössä, hiljaisin häipyvä katkaistaan.</summary>
        AudioSource VapaaLahde(Kanava k)
        {
            for (int i = 0; i < LahteitaKanavalla; i++)
            {
                var a = lahteet[(int)k, i];
                bool varattu = false;
                foreach (var l in elavat) if (l.A == a) { varattu = true; break; }
                if (!varattu) return a;
            }
            Lahde uhri = null;
            foreach (var l in elavat)
                if (l.Kanava == k && l.Poistuva && (uhri == null || l.Taso.Arvo < uhri.Taso.Arvo)) uhri = l;
            if (uhri == null) foreach (var l in elavat) if (l.Kanava == k && l != nykyiset[(int)k]) { uhri = l; break; }
            if (uhri == null) uhri = nykyiset[(int)k];
            if (uhri == null) return lahteet[(int)k, 0];
            var lahde = uhri.A;
            Vapauta(uhri);
            return lahde;
        }

        void VaihdaOsoite(Lahde l, string url)
        {
            l.Vuoro++;
            VapautaKlippi(l);
            l.A.Stop();
            l.Url = url;
            l.Ladattu = l.Kaynnistetty = l.Soi = l.Tauotettu = l.OdottaaVerkkoa = false;
            l.Taso.Aseta(0);
            AsetaTaso(l, 0);
            StartCoroutine(Hae(l, l.Vuoro));
        }

        /// <summary>Häivytys nollaan ja vapautus (0 tai soimaton = heti).</summary>
        void Poista(Lahde l, int ms)
        {
            l.Poistuva = true;
            if (!l.Soi || ms <= 0) { Vapauta(l); return; }
            l.Taso.Aloita(0, ms);
        }

        void Vapauta(Lahde l)
        {
            if (l.Vapautettu) return;
            l.Vapautettu = true;
            l.Vuoro++;
            if (l.A != null) { l.A.Stop(); l.A.clip = null; AsetaTaso(l, 0); l.A.loop = false; }
            VapautaKlippi(l);
            elavat.Remove(l);
            if (nykyiset[(int)l.Kanava] == l) nykyiset[(int)l.Kanava] = null;
        }

        void VapautaKlippi(Lahde l)
        {
            var k = l.K;
            l.K = null;
            if (k == null) return;
            k.Viitteet--;
            if (k.Viitteet <= 0) Tuhoa(k);
        }

        void Tuhoa(Klippi k)
        {
            if (k.Tuhottu) return;
            k.Tuhottu = true;
            string avain = k.Avain ?? k.Url;
            if (klipit.TryGetValue(avain, out var x) && x == k) klipit.Remove(avain);
            if (k.Clip != null) Destroy(k.Clip);
            k.Clip = null;
            k.Pyynto?.Dispose();
            k.Pyynto = null;
        }

        // --- soitto -------------------------------------------------------------

        void PaivitaSoitto(Lahde l)
        {
            if (l.Vapautettu || l.Poistuva || !l.Ladattu) return;
            if (l.Tauko || jaassa)
            {
                if (l.Kaynnistetty && !l.Tauotettu && l.A.isPlaying) { l.A.Pause(); l.Tauotettu = true; }
                return;
            }
            if (!l.Kaynnistetty) { Kaynnista(l); return; }
            if (l.Tauotettu)
            {
                l.A.UnPause();
                l.Tauotettu = false;
                l.KaynnistysAika = Time.unscaledTime;
            }
        }

        void Kaynnista(Lahde l)
        {
            AsetaIstunto();
            var a = l.A;
            var c = l.K.Clip;
            a.clip = c;
            // Kerran läpi soiva kaupunkimaisema ei silmukoi lyhyttäkään klippiä (omistaja 30.9.2026).
            a.loop = l.Silmukka || (l.Kanava == Kanava.Maisema && !l.Kerran && Silmukka.Liianlyhyt(c.length));
            a.pitch = 1f;
            AsetaTaso(l, 0);
            l.Komp?.Nollaa(); // uusi klippi: kompressori alkutilaan ennen ensimmäistä puskuria
            a.Play();
            if (l.Alku > 0 && c.length > 0) a.time = Mathf.Clamp((float)l.Alku, 0f, Mathf.Max(0f, c.length - 0.05f));
            l.Kaynnistetty = true;
            l.Tauotettu = false;
            l.KaynnistysAika = Time.unscaledTime;
            l.AlkuNayte = a.timeSamples;
        }

        int jaksoTaukoNahty;
        float jaksoTaukoLoppuu;

        // --- KAUPUNKI-INTRO (Pariisin nykyintro, kohta 4): musiikin ajoitus intron kohtaukseen 1 ---------------------------
        /// <summary>
        /// Intron musiikkitahti alkaa: nopea kappale soi (t0 = sen todellinen alku, myös jo soivasta laskettuna). Intro aloittaa
        /// kohtauksen 1 tästä ruudusta. Argumentti: kaupunki ja nopean kappaleen kohta sekunteina (0 = juuri alkoi).
        /// </summary>
        public static event Action<string, float> KaupunkiIntroAlkoi;
        string introKaupunki, introUrl;
        float introKatkoS, introHaivytysS, introHidasS, introT0 = -1f;
        bool introKatkottu, introHidasAlkoi;

        /// <summary>
        /// Intro pyytää kaupunkijakson ajoitusta: nopea katkeaa katkoS:ssä (häivytys haivytysS) ja hidas alkaa hidasS:ssä ilman
        /// jakson taukoa. Kutsutaan saapumisen yhteydessä (ennen tai jälkeen Paikka-tapahtuman); false = kaupungilla ei jaksoa.
        /// </summary>
        public bool KaupunkiIntro(string kaupunki, float katkoS = 31f, float haivytysS = 2f, float hidasS = 32f)
        {
            var polku = Tila?.JaksonNopea(kaupunki);
            if (polku == null) return false;
            introKaupunki = kaupunki; introUrl = AaniOsoite.Url(polku);
            introKatkoS = katkoS; introHaivytysS = haivytysS; introHidasS = hidasS;
            introT0 = -1f; introKatkottu = introHidasAlkoi = introOhita = false;
            return true;
        }

        /// <summary>
        /// Intron ohitus (napautus hyppää kohtaukseen 7 eli siirtymään vanhaan): musiikki tekee heti saman kuin katkoS:ssä, eli
        /// nopean häivytys alkaa nyt ja hidas alkaa (hidasS − katkoS) myöhemmin. Toimii missä tahansa intron kohdassa, myös ennen
        /// kuin nopea on alkanut soida (KaupunkiIntroAlkoi ei silloin enää laukea). false = intro ei ole käynnissä.
        /// </summary>
        public bool KaupunkiIntroOhita()
        {
            if (introKaupunki == null) return false;
            introOhita = true;
            return true;
        }
        bool introOhita;

        void PaivitaIntro(float nyt, Action<Action> tee)
        {
            if (introKaupunki == null) return;
            var l = nykyiset[(int)Kanava.Pohja];
            if (introOhita)
            {
                introOhita = false;
                // Siirretään intron kello niin, että katko on tässä ruudussa; jo tehty katko ei toistu, hidas tulee ajallaan.
                if (!introKatkottu) introT0 = nyt - introKatkoS;
                Debug.Log($"MATKAKIRJA aani: kaupunki-intro {introKaupunki} ohitettu");
            }
            if (introT0 < 0f)
            {
                if (l == null || !l.Kaynnistetty || l.A == null || l.Url != introUrl) return;
                introT0 = nyt - l.A.time;
                string k = introKaupunki; float kohta = l.A.time;
                tee(() => KaupunkiIntroAlkoi?.Invoke(k, kohta));
                Debug.Log($"MATKAKIRJA aani: kaupunki-intro {k} alkoi (nopea {kohta:0.00} s)");
            }
            float s = nyt - introT0;
            if (!introKatkottu && s >= introKatkoS) { introKatkottu = true; int ms = (int)(introHaivytysS * 1000); tee(() => Tila.JaksonIntroKatko(ms)); }
            if (!introHidasAlkoi && s >= introHidasS) { introHidasAlkoi = true; tee(() => Tila.JaksonIntroHidas()); introKaupunki = null; }
        }

        void Update()
        {
            if (jaassa || Tila == null) return;
            double dt = Time.unscaledDeltaTime;
            float nyt = Time.unscaledTime;
            List<Action> teot = null;
            void Tee(Action a) => (teot ??= new List<Action>()).Add(a);
            PaivitaPooli(dt);
            // Kaupunkijakson tauko (AaniTila.JaksonTaukoNro/Ms): ajastus täällä, siirtymä hitaaseen kappaleeseen koneessa.
            if (Tila.JaksonTaukoNro != jaksoTaukoNahty) { jaksoTaukoNahty = Tila.JaksonTaukoNro; jaksoTaukoLoppuu = nyt + Tila.JaksonTaukoMs / 1000f; }
            if (jaksoTaukoLoppuu > 0 && nyt >= jaksoTaukoLoppuu) { jaksoTaukoLoppuu = 0; int nro = jaksoTaukoNahty; Tee(() => Tila.JaksonTaukoOhi(nro)); }
            PaivitaIntro(nyt, Tee);

            // Takaperin ilman kopiota (ei roskaa joka ruudussa): Vapauta poistaa vain käsiteltävän.
            for (int i = elavat.Count - 1; i >= 0; i--)
            {
                if (i >= elavat.Count) continue;
                var l = elavat[i];
                if (l.Vapautettu) continue;
                var a = l.A;
                if (l.OdottaaVerkkoa && !l.Poistuva && nyt >= l.Uusinta)
                {
                    l.OdottaaVerkkoa = false;
                    l.Vuoro++;
                    StartCoroutine(Hae(l, l.Vuoro));
                }
                if (l.Kaynnistetty && !l.Soi && !l.Tauotettu)
                {
                    if (a.isPlaying && (a.timeSamples != l.AlkuNayte || nyt - l.KaynnistysAika > 0.5f))
                    {
                        // Soitto alkoi oikeasti: nousu nollasta voimassa olevaan tavoitteeseen.
                        l.Soi = true;
                        l.Taso.Aseta(0);
                        l.Taso.Aloita(l.Tavoite, l.NousuMs);
                    }
                    else if (!a.isPlaying && nyt - l.KaynnistysAika > Aanilataus.LatausvahtiS)
                    {
                        // Klippi ei lähtenyt soimaan (esim. striimi ei aukea): purkuvirhe, kerran.
                        var ll = l;
                        l.Kaynnistetty = l.Ladattu = false;
                        a.Stop();
                        Tee(() => Epaonnistui(ll, new Latausvirhe { Purku = true }));
                        continue;
                    }
                }
                if (!l.Soi) continue;
                l.Taso.Askel(dt);
                AsetaTaso(l, l.Taso.Arvo);
                if (l.Poistuva)
                {
                    if (!l.Taso.Kaynnissa) Vapauta(l);
                    continue;
                }
                if (l.Tauotettu || nykyiset[(int)l.Kanava] != l) continue;
                if (l.Kanava == Kanava.Maisema && !a.loop && !l.SilmukkaPyydetty && l.K?.Clip != null
                    && (Silmukka.Ajoissa(a.time, l.K.Clip.length) || !a.isPlaying))
                {
                    l.SilmukkaPyydetty = true;
                    Tee(() => Tila.SilmukkaVaihtuu());
                }
                else if (l.Kanava == Kanava.Aarre && !a.loop && !a.isPlaying && !l.LoppuIlmoitettu)
                {
                    l.LoppuIlmoitettu = true;
                    Tee(() => Tila.AarreLoppui());
                }
                else if (l.Kanava == Kanava.Pohja && !a.loop && !a.isPlaying && !l.LoppuIlmoitettu)
                {
                    l.LoppuIlmoitettu = true;
                    Tee(() => Tila.PohjaLoppui());
                }
            }
            if (teot != null) foreach (var t in teot) { try { t(); } catch (Exception e) { Debug.LogException(e); } }
        }

        // --- lataus -------------------------------------------------------------

        static bool Voimassa(Lahde l, int vuoro) => !l.Vapautettu && l.Vuoro == vuoro;

        IEnumerator Hae(Lahde l, int vuoro)
        {
            // Aina seuraavassa ruudussa: tulos (ja KestoTiedossa/Puuttuu) ei koskaan tule Sovellan sisältä.
            yield return null;
            if (!Voimassa(l, vuoro)) yield break;
            string url = l.Url;
            string levy = LevyPolku(url);
            if (!File.Exists(levy))
            {
                if (ladataan.Contains(url)) { while (ladataan.Contains(url)) yield return null; }
                else yield return Levylle(url, levy);
                if (!File.Exists(levy))
                {
                    if (Voimassa(l, vuoro))
                        Epaonnistui(l, latausvirheet.TryGetValue(url, out var v) ? v : new Latausvirhe { Verkko = true });
                    yield break;
                }
            }
            if (!Voimassa(l, vuoro)) yield break;

            long koko = 0;
            try { koko = new FileInfo(levy).Length; } catch (Exception) { }
            bool striimi = Aanilataus.Striimataan(koko);
            Klippi k;
            while (true)
            {
                if (!striimi && klipit.TryGetValue(url, out var jaettu) && !jaettu.Tuhottu)
                {
                    while (!jaettu.Valmis && !jaettu.Virhe && !jaettu.Tuhottu) yield return null;
                    if (jaettu.Tuhottu) continue;
                    if (jaettu.Virhe) { if (Voimassa(l, vuoro)) Epaonnistui(l, new Latausvirhe { Purku = true }); yield break; }
                    k = jaettu;
                    break;
                }
                k = new Klippi { Url = url, Striimi = striimi };
                if (!striimi) klipit[url] = k;
                yield return Pura(k, levy);
                if (k.Virhe)
                {
                    if (klipit.TryGetValue(url, out var x) && x == k) klipit.Remove(url);
                    if (Voimassa(l, vuoro)) Epaonnistui(l, new Latausvirhe { Purku = true });
                    yield break;
                }
                break;
            }
            if (!Voimassa(l, vuoro)) { if (k.Viitteet <= 0) Tuhoa(k); yield break; }
            k.Viitteet++;
            l.K = k;
            Ladattu(l);
        }

        void Ladattu(Lahde l)
        {
            l.Ladattu = true;
            // Maisema: kesto tiedossa → kone arpoo ensimmäisen kierroksen aloituskohdan (Sovella päivittää Alun).
            if (l.Kanava == Kanava.Maisema && nykyiset[(int)Kanava.Maisema] == l && !l.Kaynnistetty)
                Tila.KestoTiedossa(l.K.Clip.length);
            PaivitaSoitto(l);
        }

        void Epaonnistui(Lahde l, Latausvirhe v)
        {
            if (l.Vapautettu) return;
            var seuraus = Aanilataus.Luokittele(l.Kanava, v.Http, v.Verkko, v.Aika, v.Purku);
            Debug.LogWarning($"MATKAKIRJA ääni: {l.Kanava} {l.Url} ei soi (http {v.Http}, verkko {v.Verkko}, aika {v.Aika}, purku {v.Purku}) → {seuraus}");
            if (seuraus == Latausseuraus.YritaMyohemmin)
            {
                l.OdottaaVerkkoa = true;
                l.Uusinta = Time.unscaledTime + (float)Aanilataus.UusintaS;
                return;
            }
            if (nykyiset[(int)l.Kanava] != l) { Vapauta(l); return; }
            if (sovelletaan) { jalkeen.Add(() => { if (nykyiset[(int)l.Kanava] == l) Tila.Puuttuu(l.Kanava); }); return; }
            Tila.Puuttuu(l.Kanava);
        }

        /// <summary>Tavut levylle kerran (atomisesti). Latausvahti: 6 s ilman uusia tavuja katkaisee.</summary>
        IEnumerator Levylle(string url, string levy)
        {
            ladataan.Add(url);
            latausvirheet.Remove(url);
            var osa = levy + ".osa";
            Latausvirhe virhe = null;
            try { Directory.CreateDirectory(Path.GetDirectoryName(levy)); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ääni: " + e.Message); }
            var h = new UnityWebRequest(url, UnityWebRequest.kHttpVerbGET, new DownloadHandlerFile(osa) { removeFileOnAbort = true }, null);
            h.timeout = 180;
            var op = h.SendWebRequest();
            ulong tavuja = 0;
            double hiljaa = 0;
            bool aika = false;
            while (!op.isDone)
            {
                yield return null;
                if (h.downloadedBytes != tavuja) { tavuja = h.downloadedBytes; hiljaa = 0; }
                else hiljaa += Math.Min(Time.unscaledDeltaTime, 0.1);
                if (hiljaa > Aanilataus.LatausvahtiS) { aika = true; h.Abort(); break; }
            }
            if (aika) virhe = new Latausvirhe { Aika = true };
            else if (h.result == UnityWebRequest.Result.ProtocolError) virhe = new Latausvirhe { Http = h.responseCode };
            else if (h.result != UnityWebRequest.Result.Success) virhe = new Latausvirhe { Verkko = true, Http = h.responseCode };
            h.Dispose(); // tiedosto suljetaan ennen siirtoa
            if (virhe == null)
            {
                try
                {
                    if (File.Exists(levy)) File.Delete(levy);
                    File.Move(osa, levy);
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ääni: levylle ei voitu kirjoittaa: " + e.Message); virhe = new Latausvirhe { Purku = true }; }
            }
            if (virhe != null)
            {
                try { if (File.Exists(osa)) File.Delete(osa); } catch (Exception) { }
                latausvirheet[url] = virhe;
            }
            ladataan.Remove(url);
        }

        /// <summary>Klippi levyltä: yli 3 Mt striimattuna (pyyntö elää klipin ajan), muuten pakattuna muistiin.</summary>
        /// <summary>
        /// SAUMATON SILMUKKA (Siirtoseppä 5.10.2026; Päätoimittajan mittaus linnan esittelystä: täyskatko 9,065 s välein, ~25 ms
        /// digitaalista hiljaisuutta): FMOD ei lue MP3:n LAME/Info-otsakkeen gapless-tietoa, vaan soittaa enkooderin viiveen ja lopun
        /// täytteen osana silmukkaa. Linnan 9,000 s:n tuuli ja laineet soivat siksi 9,065 s:n jaksolla, ja kun kahden silmukan saumat
        /// osuvat yhteen, kuuluu nikotus. Linssin silmukat puretaan PCM:ksi (pienet, ei striimiä), alun hiljaisuus (< −80 dB) leikataan ja
        /// pituus asetetaan otsakkeen mukaiseksi (kehykset × 1152 − viive − täyte); ilman otsaketta myös lopun hiljaisuus leikataan.
        /// </summary>
        IEnumerator PuraSaumaton(Klippi k, string levy)
        {
            var p = UnityWebRequestMultimedia.GetAudioClip("file://" + levy, Tyyppi(k.Url));
            var dh = (DownloadHandlerAudioClip)p.downloadHandler;
            dh.streamAudio = false;
            dh.compressed = false; // GetData vaatii puretun klipin
            yield return p.SendWebRequest();
            AudioClip c = null;
            try { if (p.result == UnityWebRequest.Result.Success) c = DownloadHandlerAudioClip.GetContent(p); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ääni: " + e.Message); }
            p.Dispose();
            if (c == null || c.loadState == AudioDataLoadState.Failed || c.length <= 0 || k.Tuhottu)
            {
                if (c != null) Destroy(c);
                if (!k.Tuhottu) { Debug.LogWarning($"MATKAKIRJA ääni ei purkautunut (saumaton): {levy}"); k.Virhe = true; }
                yield break;
            }
            AudioClip tulos = c;
            try
            {
                int kan = c.channels, n = c.samples, taajuus = c.frequency;
                var data = new float[n * kan];
                if (c.GetData(data, 0))
                {
                    const float Raja = 1e-4f; // −80 dB: viiveen digitaalinen hiljaisuus, ei äänitteen omaa häivytystä
                    bool Hiljaa(int i) { for (int j = 0; j < kan; j++) if (Math.Abs(data[i * kan + j]) >= Raja) return false; return true; }
                    int alku = 0, loppu = n, raja = taajuus / 5;
                    while (alku < raja && alku < n - 1 && Hiljaa(alku)) alku++;
                    int odotettu = GaplessPituus(levy);
                    if (odotettu > 0 && alku + odotettu <= n) loppu = alku + odotettu;
                    else while (loppu > alku + 1 && n - loppu < raja && Hiljaa(loppu - 1)) loppu--;
                    // Sauman ristihäivytys (simu 5.10. 03.14: lähteiden omat 5 ms:n reunahäivytykset jättivät 9 dB:n notkon): viimeiset
                    // F näytettä sekoitetaan alkuun tasatehoisesti, ja silmukka lyhenee F:llä → loppu jatkuu suoraan alkuun ilman notkoa.
                    int f = Math.Min(taajuus / 20, (loppu - alku) / 8); // 50 ms
                    if (alku > 0 || loppu < n || f > 0)
                    {
                        int pit = loppu - alku - f;
                        var osa = new float[pit * kan];
                        Array.Copy(data, alku * kan, osa, 0, osa.Length);
                        for (int i = 0; i < f; i++)
                        {
                            float x = (float)i / f, gi = Mathf.Sin(x * Mathf.PI * 0.5f), gl = Mathf.Cos(x * Mathf.PI * 0.5f);
                            for (int j = 0; j < kan; j++) osa[i * kan + j] = data[(alku + i) * kan + j] * gi + data[(alku + pit + i) * kan + j] * gl;
                        }
                        loppu = alku + pit;
                        tulos = AudioClip.Create(c.name, pit, kan, taajuus, false);
                        tulos.SetData(osa, 0);
                        Destroy(c);
                        Debug.Log($"MATKAKIRJA ääni: saumaton silmukka {Path.GetFileName(k.Url)}: alusta {alku}, lopusta {n - loppu} näytettä → {(loppu - alku) / (double)taajuus:F3} s" +
                                  (odotettu > 0 ? " (otsake)" : " (hiljaisuus)"));
                    }
                }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ääni: saumaton silmukka ei onnistunut: " + e.Message); }
            tulos.name = k.Url;
            k.Clip = tulos;
            k.Valmis = true;
        }

        /// <summary>MP3:n Xing/Info + LAME/Lavc-otsakkeesta alkuperäinen pituus näytteinä (kehykset × 1152 − viive − täyte); −1 = ei tietoa.</summary>
        static int GaplessPituus(string levy)
        {
            try
            {
                var b = new byte[16384];
                int luettu;
                using (var f = File.OpenRead(levy)) luettu = f.Read(b, 0, b.Length);
                int o = 0;
                if (luettu > 10 && b[0] == 'I' && b[1] == 'D' && b[2] == '3') o = 10 + ((b[6] << 21) | (b[7] << 14) | (b[8] << 7) | b[9]);
                int i = -1;
                for (int x = o; x + 4 < Math.Min(luettu, o + 2048); x++)
                    if ((b[x] == 'X' && b[x + 1] == 'i' && b[x + 2] == 'n' && b[x + 3] == 'g') || (b[x] == 'I' && b[x + 1] == 'n' && b[x + 2] == 'f' && b[x + 3] == 'o')) { i = x; break; }
                if (i < 0 || i + 8 > luettu) return -1;
                int liput = (b[i + 4] << 24) | (b[i + 5] << 16) | (b[i + 6] << 8) | b[i + 7], j = i + 8, kehyksia = -1;
                if ((liput & 1) != 0) { kehyksia = (b[j] << 24) | (b[j + 1] << 16) | (b[j + 2] << 8) | b[j + 3]; j += 4; }
                if ((liput & 2) != 0) j += 4;
                if ((liput & 4) != 0) j += 100;
                if ((liput & 8) != 0) j += 4;
                if (kehyksia <= 0 || j + 24 > luettu) return -1;
                if (!((b[j] == 'L' && b[j + 1] == 'A' && b[j + 2] == 'M' && b[j + 3] == 'E') || (b[j] == 'L' && b[j + 1] == 'a' && b[j + 2] == 'v'))) return -1;
                int viive = (b[j + 21] << 4) | (b[j + 22] >> 4), tayte = ((b[j + 22] & 0x0F) << 8) | b[j + 23];
                long pituus = (long)kehyksia * 1152 - viive - tayte;
                return pituus > 0 && pituus < int.MaxValue ? (int)pituus : -1;
            }
            catch (Exception) { return -1; }
        }

        IEnumerator Pura(Klippi k, string levy)
        {
            var p = UnityWebRequestMultimedia.GetAudioClip("file://" + levy, Tyyppi(k.Url));
            var dh = (DownloadHandlerAudioClip)p.downloadHandler;
            dh.streamAudio = k.Striimi;
            // Pakattuna muistiin (Compressed In Memory): muuten FMOD purkaa koko mp3:n pääsäikeessä
            // (SoundManager.LoadFMODSound 73 ms iPadilla 2 Mt:n raidalla, Natiiviseppä 24.9.2026).
            dh.compressed = true;
            yield return p.SendWebRequest();
            AudioClip c = null;
            try { if (p.result == UnityWebRequest.Result.Success) c = DownloadHandlerAudioClip.GetContent(p); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ääni: " + e.Message); }
            bool kelpaa = c != null && c.loadState != AudioDataLoadState.Failed && (k.Striimi || c.length > 0);
            if (!kelpaa || k.Tuhottu)
            {
                if (c != null) Destroy(c);
                p.Dispose();
                if (!kelpaa)
                {
                    Debug.LogWarning($"MATKAKIRJA ääni ei purkautunut: {levy} ({p.error})");
                    try { File.Delete(levy); } catch (Exception) { }
                    k.Virhe = true;
                }
                yield break;
            }
            c.name = k.Url;
            k.Clip = c;
            k.Valmis = true;
            if (k.Striimi) k.Pyynto = p; else p.Dispose();
        }

        static AudioType Tyyppi(string url)
        {
            var polku = url;
            int i = polku.IndexOfAny(new[] { '?', '#' });
            if (i >= 0) polku = polku.Substring(0, i);
            switch (Path.GetExtension(polku).ToLowerInvariant())
            {
                case ".ogg": return AudioType.OGGVORBIS;
                case ".wav": return AudioType.WAV;
                case ".m4a": case ".aac": return AudioType.AUDIOQUEUE;
                default: return AudioType.MPEG;
            }
        }

        // --- silmukkapooli: toteutus (Silmukka-kahvan takana) --------------------

        /// <summary>Uusi silmukka ylitti katon: hiljaisin (pienin nykyinen taso) niistä, jotka eivät ole uusi
        /// itse eivätkä jo lopettamassa, lopetetaan heti (ei häivytystä: pooli on ylikuormassa).</summary>
        void TaytaTarvittaessa(PooliAani uusi)
        {
            if (pooliElossa.Count <= SilmukkaKatto) return;
            PooliAani uhri = null;
            foreach (var p in pooliElossa)
                if (p != uusi && !p.Vapautettu && !p.Lopetettu && (uhri == null || p.Taso.Arvo < uhri.Taso.Arvo)) uhri = p;
            if (uhri == null) return;
            Debug.Log($"MATKAKIRJA ääni: silmukkapooli täynnä ({SilmukkaKatto}), hiljaisin lopetettu: {uhri.Url}");
            PooliLopeta(uhri, 0f);
        }

        void PooliVoimakkuus(PooliAani l, float taso, float liukuS)
        {
            if (l == null || l.Vapautettu || l.Lopetettu) return;
            l.Taso.Aloita(Mathf.Clamp01(taso), Math.Max(0f, liukuS) * 1000.0);
            if (l.Ladattu && !l.Kaynnistetty) PooliKaynnista(l);
        }

        void PooliLopeta(PooliAani l, float haiveS)
        {
            if (l == null || l.Vapautettu || l.Lopetettu) return;
            l.Lopetettu = true;
            if (haiveS <= 0f || !l.Kaynnistetty) { PooliVapauta(l); return; }
            l.Taso.Aloita(0, haiveS * 1000.0);
        }

        void PooliVapauta(PooliAani l)
        {
            if (l.Vapautettu) return;
            l.Vapautettu = true;
            l.Vuoro++;
            if (l.A != null) { Destroy(l.A.gameObject); l.A = null; }
            VapautaPooliKlippi(l);
            pooliElossa.Remove(l);
        }

        void VapautaPooliKlippi(PooliAani l)
        {
            var k = l.K;
            l.K = null;
            if (k == null) return;
            k.Viitteet--;
            if (k.Viitteet <= 0) Tuhoa(k);
        }

        /// <summary>Oma AudioSource per silmukka: spatialBlend 0, priority 128 (kanavien 64/96 ja puheen
        /// voittavat RealVoiceCount-rajalla), silmukoi aina, ei A/B-ristihäivytystä.</summary>
        void PooliKaynnista(PooliAani l)
        {
            AsetaIstunto();
            var go = new GameObject("Silmukka");
            go.transform.SetParent(transform, false);
            var a = go.AddComponent<AudioSource>();
            a.playOnAwake = false;
            a.spatialBlend = 0f;
            a.priority = 128;
            a.loop = true;
            a.volume = 0f;
            a.clip = l.K.Clip;
            // Saumattomat linssin silmukat satunnaisesta kohdasta (simu 5.10. 02.40: tuulen ja laineiden lähteiden omat 5 ms:n
            // reunahäivytykset osuivat yhteen 9,000 s välein, notko −12 dB / 10 ms). Eri vaihe → saumat eivät osu päällekkäin.
            if (l.Saumaton && l.K.Clip != null && l.K.Clip.samples > 0 && l.K.Avain != null)
                a.timeSamples = UnityEngine.Random.Range(0, l.K.Clip.samples);
            a.Play();
            l.A = a;
            l.Kaynnistetty = true;
        }

        static bool PooliVoimassa(PooliAani l, int vuoro) => !l.Vapautettu && l.Vuoro == vuoro;

        /// <summary>Levylle-lataus epäonnistui: uusinnat näiden odotusten jälkeen (s). Natiivisepän löydös 5.10. (juna 143 -koe):
        /// linnan 88 tiedoston rinnakkaislatauksen aikana Levylle-vahti katkaisi järven laineet, eivätkä ne soineet koko käynnillä.</summary>
        static readonly float[] PooliUusinnatS = { 2f, 5f, 12f };

        /// <summary>Sama lataus/välimuistiputki kuin kanavilla (LevyPolku, Levylle, Pura, striimi > 3 Mt,
        /// jaettu klipit-välimuisti). Levylle saamatta jäänyt lataus uusitaan PooliUusinnatS:n mukaan (latauspiikin jälkeen);
        /// purkuvirhettä ei uusita (virheellinen tiedosto: kahva ei koskaan soi).</summary>
        IEnumerator HaePooli(PooliAani l, int vuoro)
        {
            yield return null;
            if (!PooliVoimassa(l, vuoro)) yield break;
            string url = l.Url;
            string levy = LevyPolku(url);
            for (int yritys = 0; !File.Exists(levy); yritys++)
            {
                if (ladataan.Contains(url)) { while (ladataan.Contains(url)) yield return null; }
                else yield return Levylle(url, levy);
                if (File.Exists(levy)) break;
                if (!PooliVoimassa(l, vuoro)) yield break;
                if (yritys >= PooliUusinnatS.Length) { PooliEpaonnistui(l, $"levylle ei saatu, {yritys + 1} yritystä"); yield break; }
                Debug.Log($"MATKAKIRJA ääni: silmukka {url} levylle ei saatu, uusinta {PooliUusinnatS[yritys]:0} s kuluttua");
                yield return new WaitForSecondsRealtime(PooliUusinnatS[yritys]);
                if (!PooliVoimassa(l, vuoro)) yield break;
            }
            if (!PooliVoimassa(l, vuoro)) yield break;

            long koko = 0;
            try { koko = new FileInfo(levy).Length; } catch (Exception) { }
            bool striimi = Aanilataus.Striimataan(koko);
            Klippi k;
            // PCM vie muistia (~0,35 Mt/s stereona): saumaton vain lyhyille silmukoille (< 600 kt ≈ 30 s), pidemmät kuten ennen.
            bool saumaton = l.Saumaton && !striimi && koko > 0 && koko < 600_000;
            string avain = saumaton ? url + "#saumaton" : url;
            while (true)
            {
                if (!striimi && klipit.TryGetValue(avain, out var jaettu) && !jaettu.Tuhottu)
                {
                    while (!jaettu.Valmis && !jaettu.Virhe && !jaettu.Tuhottu) yield return null;
                    if (jaettu.Tuhottu) continue;
                    if (jaettu.Virhe) { if (PooliVoimassa(l, vuoro)) PooliEpaonnistui(l, "purkuvirhe"); yield break; }
                    k = jaettu;
                    break;
                }
                k = new Klippi { Url = url, Striimi = striimi, Avain = saumaton ? avain : null };
                if (!striimi) klipit[avain] = k;
                yield return saumaton ? PuraSaumaton(k, levy) : Pura(k, levy);
                if (k.Virhe)
                {
                    if (klipit.TryGetValue(avain, out var x) && x == k) klipit.Remove(avain);
                    if (PooliVoimassa(l, vuoro)) PooliEpaonnistui(l, "purkuvirhe");
                    yield break;
                }
                break;
            }
            if (!PooliVoimassa(l, vuoro)) { if (k.Viitteet <= 0) Tuhoa(k); yield break; }
            k.Viitteet++;
            l.K = k;
            l.Ladattu = true;
            PooliKaynnista(l);
        }

        void PooliEpaonnistui(PooliAani l, string syy)
        {
            if (l.VaroitettuKerran) return;
            l.VaroitettuKerran = true;
            Debug.LogWarning($"MATKAKIRJA ääni: silmukka {l.Url} ei soi ({syy})");
        }

        /// <summary>
        /// Poolin rampit ja äänekkyys joka ruutu: kutsujan pyytämä taso (Voimakkuus) kertaa Äänimaisema-kytkimen,
        /// Tausta-voiman (TaustanKerroin) ja AaniTilan globaalin väistön (pooliVaisto, esim. Pulun puhe).
        /// </summary>
        void PaivitaPooli(double dt)
        {
            pooliVaisto.Askel(dt);
            double kerroin = (Tila.Aanimaisema ? 1.0 : 0.0) * Tila.TaustanKerroin * pooliVaisto.Arvo;
            for (int i = pooliElossa.Count - 1; i >= 0; i--)
            {
                if (i >= pooliElossa.Count) continue;
                var l = pooliElossa[i];
                if (l.Vapautettu) continue;
                l.Taso.Askel(dt);
                if (l.Kaynnistetty && l.A != null) l.A.volume = (float)Math.Min(1.0, l.Taso.Arvo * kerroin);
                if (l.Lopetettu && !l.Taso.Kaynnissa) PooliVapauta(l);
            }
        }

        /// <summary>
        /// Poolin tila testikomennolle (`astro kyyti suhina tila`, Natiivi-UI 4.10.: joystickin suhina −91 dB tallenteessa): tason
        /// kertoimet (Äänimaisema, Tausta, väistö) ja jokaisen silmukan lataus, pyydetty taso ja AudioSourcen äänekkyys.
        /// </summary>
        public static string PooliTila(string suodin = null)
        {
            var s = Instanssi;
            if (s == null) return "aanisoitin: ei käynnissä";
            var ic = CultureInfo.InvariantCulture;
            var sb = new StringBuilder();
            sb.Append($"pooli: äänimaisema {s.Tila.Aanimaisema}, tausta {s.Tila.TaustanKerroin.ToString("0.00", ic)}, väistö {s.pooliVaisto.Arvo.ToString("0.00", ic)}, silmukoita {s.pooliElossa.Count}");
            foreach (var l in s.pooliElossa)
            {
                if (suodin != null && (l.Url == null || !l.Url.Contains(suodin))) continue;
                string nimi = l.Url == null ? "-" : l.Url.Substring(l.Url.LastIndexOf('/') + 1);
                sb.Append($"; {nimi}: ladattu {l.Ladattu}, käynnissä {l.Kaynnistetty}, virhe {(l.K != null && l.K.Virhe)}, taso {l.Taso.Arvo.ToString("0.00", ic)}"
                    + $" (kohde {l.Taso.Kohde.ToString("0.00", ic)}), volume {(l.A != null ? l.A.volume.ToString("0.00", ic) : "-")}, soi {(l.A != null && l.A.isPlaying)}");
            }
            return sb.ToString();
        }

        // --- tila testikomennoille (PeliOhjain.TilaJson "musiikki") --------------

        public string Json()
        {
            var sb = new StringBuilder("{");
            sb.Append("\"paikka\":").Append(PeliApu.Json(Koukut.LahetettyPaikka));
            sb.Append(",\"siirtyma\":").Append(PeliApu.Json(Koukut.SiirtymaLaji));
            sb.Append(",\"voimassa\":").Append(Tila.Voimassa.ToString("0.###", CultureInfo.InvariantCulture));
            sb.Append(",\"hiljennykset\":[");
            for (int i = 0; i < Tila.Hiljennykset.Count; i++) sb.Append(i > 0 ? "," : "").Append(PeliApu.Json(Tila.Hiljennykset[i]));
            sb.Append("],\"kanavat\":{");
            for (int k = 0; k < Kanavia; k++)
            {
                var l = nykyiset[k];
                var w = Tila.Toive((Kanava)k);
                if (k > 0) sb.Append(',');
                sb.Append('"').Append(((Kanava)k).ToString().ToLowerInvariant()).Append("\":{\"url\":").Append(PeliApu.Json(w.Url))
                  .Append(",\"tavoite\":").Append(w.Tavoite.ToString("0.#####", CultureInfo.InvariantCulture))
                  .Append(",\"taso\":").Append(l != null ? Taso(l).ToString("0.#####", CultureInfo.InvariantCulture) : "0")
                  .Append(",\"soi\":").Append(l != null && l.Soi ? "true" : "false")
                  .Append(",\"ladattu\":").Append(l != null && l.Ladattu ? "true" : "false")
                  .Append(",\"tauko\":").Append(w.Tauko ? "true" : "false")
                  .Append(",\"alku\":").Append(w.Alku.ToString("0.#", CultureInfo.InvariantCulture))
                  .Append(",\"silmukka\":").Append(l != null && l.A != null ? (l.A.loop ? "true" : "false") : (w.Silmukka ? "true" : "false"))
                  .Append(",\"kerran\":").Append(w.Kerran ? "true" : "false")
                  .Append(",\"aika\":").Append(l != null && l.Kaynnistetty && l.A != null ? l.A.time.ToString("0.0", CultureInfo.InvariantCulture) : "0");
                if (l?.Komp != null) sb.Append(",\"kompressori\":").Append(l.Komp.Vahvistus.ToString("0.####", CultureInfo.InvariantCulture));
                sb.Append('}');
            }
            int haipyvia = 0;
            foreach (var l in elavat) if (l.Poistuva) haipyvia++;
            sb.Append("},\"haipyvia\":").Append(haipyvia).Append(",\"klippeja\":").Append(klipit.Count).Append('}');
            return sb.ToString();
        }

        // --- iOS: ääni-istunto (MatkakirjaAani.mm, sama kuin Puhe) -----------------

#if UNITY_IOS && !UNITY_EDITOR
        // Jokaisen raidan alussa (ennen: vain kerran sovelluksen elinaikana — kärki 30.9.2026): kevyt luokan tarkistus,
        // korjaus vain Ambientista (AaniIstunto.Varmista, MatkakirjaAani.mm).
        static void AsetaIstunto() => AaniIstunto.Varmista();
#else
        static void AsetaIstunto() { }
#endif
    }
}
