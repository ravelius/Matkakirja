// ÄÄNISOITIN (B7 erä 3, spesifikaatio §2 ja §5.2): musiikki ja äänimaisema AudioSourceilla.
//
// AaniTila (Peli/Aani/AaniTila.cs, puhdas C#) päättää, mitä soi ja millä tasolla; tämä soitin
// toteuttaa sen Toiveet kanavittain ja kertoo takaisin, mitä laitteella tapahtui:
//   KestoTiedossa(s)   maiseman klippi latautui → arvottu aloituskohta (§2.6)
//   SilmukkaVaihtuu()  maiseman kierros on 2,6 s:n päässä lopusta (tai loppui) → uusi kierros ristiin
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
            if (tunnus == null) { s.Tila.LinssiTausta(null, 0, 0); return; }
            if (!LinssiTaustat.TryGetValue(tunnus, out var t)) { Debug.Log("MATKAKIRJA aani: tuntematon linssin taustaääni " + tunnus); return; }
            s.Tila.LinssiTausta(t.Url, t.Voima, t.NousuMs);
        }

        /// <summary>Linssin raidan himmennys (kellon pysäytys 0,5; jatko 1).</summary>
        public static void LinssiHimmennys(double kerroin) => Instanssi?.Tila.Himmennys(kerroin);

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
            public bool Silmukka, Tauko = true;
            public bool Ladattu, Kaynnistetty, Soi, Tauotettu, Poistuva, Vapautettu;
            public bool SilmukkaPyydetty, LoppuIlmoitettu, OdottaaVerkkoa;
            public float KaynnistysAika, Uusinta;
            public int AlkuNayte, Vuoro;
        }

        sealed class Latausvirhe { public long Http; public bool Verkko, Aika, Purku; }

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
            foreach (var k in new List<Klippi>(klipit.Values)) Tuhoa(k);
            if (Instanssi == this) Instanssi = null;
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

        void SaneluAlkoi()
        {
            foreach (var l in elavat)
                if ((l.Kanava == Kanava.Pohja || l.Kanava == Kanava.Maisema) && l.Kaynnistetty && !l.Tauotettu && l.A.isPlaying)
                { l.A.Pause(); l.Tauotettu = true; sanelunTauottamat.Add(l); }
        }

        void SaneluLoppui()
        {
            foreach (var l in sanelunTauottamat)
                if (!l.Vapautettu && l.Tauotettu && !jaassa) { l.A.UnPause(); l.Tauotettu = false; }
            sanelunTauottamat.Clear();
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
                Silmukka = w.Silmukka, Tauko = w.Tauko, NousuMs = w.KestoMs ?? 0,
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
            if (klipit.TryGetValue(k.Url, out var x) && x == k) klipit.Remove(k.Url);
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
            a.loop = l.Silmukka || (l.Kanava == Kanava.Maisema && Silmukka.Liianlyhyt(c.length));
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

        void Update()
        {
            if (jaassa || Tila == null) return;
            double dt = Time.unscaledDeltaTime;
            float nyt = Time.unscaledTime;
            List<Action> teot = null;
            void Tee(Action a) => (teot ??= new List<Action>()).Add(a);

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
        [DllImport("__Internal")] static extern void MatkakirjaAani_Toisto();
        static bool istuntoAsetettu;
        static void AsetaIstunto()
        {
            if (istuntoAsetettu) return;
            istuntoAsetettu = true;
            try { MatkakirjaAani_Toisto(); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ääni: ääni-istunto: " + e.Message); }
        }
#else
        static void AsetaIstunto() { }
#endif
    }
}
