// ÄÄNEN TAPAHTUMAKONE (B7 §2–§3, §5.1): verkkopelin musiikin ja äänimaiseman sekoitus
// (js/ambience-stream.js playPlaceAmbience, pohjavire, visamusiikki, väistö, avaus, taustatauko;
// js/siirtymamusiikki.js; js/ui.js soitaAarreMusiikki) puhtaana C#:na ilman aikaa ja ääntä.
//
// Syötteet ovat pelin hetkiä (§3). Jokaisen tapahtuman jälkeen AaniTila kertoo kanavittain
// Toiveen: mikä osoite soi, mihin tasoon ramppi vie, kuinka kauan ramppi kestää, alkoiko uusi
// soitin ja häivytetäänkö edellinen pois. Unity-soitin (erä 3) toteuttaa toiveet AudioSourceilla
// ja kertoo takaisin: kesto tiedossa (aloituskohta), silmukan vaihto ja puuttuva raita.
//
// Kone mallintaa webin soittimet sellaisinaan (soitin syntyy, soitto alkaa, ramppi, vapautus),
// koska sekoituksen säännöt riippuvat järjestyksestä: esimerkiksi uusi soitin nousee vasta, kun
// soitto on alkanut, ja silloin käytetään sen hetken väistöä. Soiton alkamiset ajetaan
// tapahtuman lopussa samassa järjestyksessä kuin webin lupausketjut (mikrotehtävät).
// Kultainen jälki 10 (Kultaiset/aanijalki.json, kone) vartioi jokaisen tapahtuman tuloksen.
//
// KERRAN LÄPI (omistaja 30.9.2026, palaute-erä): kaupunkimaisema ja taustamusiikki alkavat aina alusta (ei arvottua
// aloituskohtaa eikä #alku-hyppyä) ja soivat kerran läpi jokaisen laukaisun (paikan tai musiikkiketjun vaihto) jälkeen;
// sen jälkeen hiljaisuus seuraavaan laukaisuun asti. Maiseman loppu häivytetään lyhyesti (SilmukkaRistiMs). Linssin
// taustaääni, visamusiikki, väistö ja dioraaman huoneäänet pysyvät ennallaan (silmukka).
//
// Poikkeamat webistä (natiivin omat, §2.7–§2.10):
//   - maiseman toinen virhe (peili → alkuperäinen → virhe) on hiljaisuus: webin CORS-kierros ja
//     synteesi eivät kuulu natiiviin;
//   - peilin katkaisijaa (VIRHERAJA 3) ei ole;
//   - linssin pito on Raamatun mukainen (§3 loppu, §6 kohta 1): pohja pitoon, hiljennys 'linssi',
//     maisema pois; purku käynnistää paikan uudelleen.
//
// LATAUSMUSIIKKI (omistaja 10.10.2026: "pelien ja linssien (jotka vaativat latausruudun) latausruudulla voisi kuulua musiikkia
// (olavin linnassa voi soittaa sen lopetusmusiikin toistaiseksi)"; Päätoimittajan täsmennys): oma kanava Lataus, jota linssin
// pito, väistö ja hiljennykset eivät koske (latausruutu on linssin sisällä, ja kuumailmapallon latauksen ajan muut äänet ovat
// kuuntelijan tasolla hiljaa, AaniVaimennus). Raita nousee pehmeästi latauksen alussa (LatausNousuMs), ristihäivyttyy näkymän
// omaan ääneen, kun näkymä aukeaa (LatausRistiMs), ja häipyy nopeasti ohitettaessa tai poistuttaessa (LatausPoisMs). Taso
// annetaan valmiina: kohdenäkymän mikserin musiikkitaso (Aanisoitin, sama kaava kuin linnan loppumusiikilla). Se EI seuraa liu'un
// käyrää (MusiikinKerroin), koska liuku vaihtuu mikserikontekstin mukana kesken latausruudun (simu 10.10. 20.57: linna 0,34 → 0,94
// kesken nimiruudun); liuku 0, Musiikki-kytkin tai äänimaisema pois = ei soi. Silmukka: lataus voi kestää kappaleen yli.
// Kuumailmapallo (Päätoimittaja 10.10. 20.2x): pallon mikseritasolla, varalla kartan alueraita, ja kierroksen alkaessa raita ei katkea vaan laskee tasorampilla kartan tasolle ja soi kerran läpi (LatausJatkuu);
// pohjan muu raita ristihäivyttää sen pois, sama raita ei ala alusta (LatausKantaa).
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli
{
    public enum Kanava { Pohja, Maisema, Visa, Siirtyma, Aarre, Lataus }

    /// <summary>Kanavan tila tapahtuman jälkeen (lineaarinen gain; ms).</summary>
    public sealed class Toive
    {
        public Kanava Kanava;
        /// <summary>Soiva osoite (https) tai null = kanava hiljaa.</summary>
        public string Url;
        /// <summary>Rampin loppuarvo (AudioSource.volume; maisemalla kompressorin jälkeinen taso).</summary>
        public double Tavoite;
        /// <summary>Tässä tapahtumassa alkanut ramppi (0 = asetetaan heti); null = taso ei muuttunut.</summary>
        public int? KestoMs;
        /// <summary>Ramppi tasainen desibeleissä (Tasoramppi; latausmusiikin jatko kartan tasolle).</summary>
        public bool Desibeli;
        /// <summary>Poistuvan häivytys desibeleissä tasainen (latausmusiikin ristihäivytys, Tasoramppi.HaivytysLattiaDb).</summary>
        public bool PoisDesibeli;
        /// <summary>Uusi soitin: lataa Url ja aloita kohdasta Alku (edellinen soitin, jos oli, häivytetään PoisMs:ssä).</summary>
        public bool Uusi;
        /// <summary>Edellinen soitin häivytetään nollaan ja vapautetaan (0 = heti); null = ei poistuvaa soitinta.</summary>
        public int? PoisMs;
        /// <summary>Soitin on tauolla (sovellus taustalla tai soitto ei ole vielä alkanut).</summary>
        public bool Tauko;
        /// <summary>Aloituskohta sekunteina (maisema: arvottu tai #alku).</summary>
        public double Alku;
        /// <summary>AudioSource.loop (musiikki saumaton master; maisema vaihtaa kierroksen ristiin).</summary>
        public bool Silmukka;
        /// <summary>Linssin taustaääni: ei maiseman kompressoria (web satelliitti-aani soittaa suoraan gainiin).</summary>
        public bool IlmanKompressoria;
        /// <summary>Soi kerran läpi (kaupunkimaisema): ei natiivia silmukkaa lyhyellekään klipille.</summary>
        public bool Kerran;

        public override string ToString() =>
            $"{Kanava}: {Url ?? "-"} taso {Tavoite} kesto {KestoMs?.ToString() ?? "-"} uusi {Uusi} pois {PoisMs?.ToString() ?? "-"} tauko {Tauko} alku {Alku} silmukka {Silmukka} kerran {Kerran}";
    }

    public sealed class AaniTila
    {
        sealed class Soitin
        {
            public Kanava Kanava;
            public string Url;
            public double Taso;
            public int MuutosT = -1, MuutosMs;         // viimeisin tasomuutos (myös suora asetus)
            public bool MuutosDb;                      // viimeisin ramppi desibeleissä tasainen
            public int RamppiT = -1, RamppiMs;         // viimeisin ramppi, jonka kesto > 0
            public double RamppiKohde;
            public int SyntyiT;
            public bool Tauko = true;                  // HTMLMediaElement.paused
            public bool Pelattu;                       // play() kutsuttu ainakin kerran
            public double Alku;
            public bool Silmukka;
            public bool Hypatty, ArvottuAlku, Soinut, VarareittiKokeiltu, TaustaTauolla;
            public bool Vapautettu, Kuollut;
            public bool IlmanKompressoria;             // linssin taustaääni (LinssiTausta)
            public bool Kerran;                        // kaupunkimaisema: kerran läpi, ei silmukkaa
            public string Polku;                       // pohja: ketjun polku; siirtymä: laji; visa: alkuperäinen
        }

        sealed class MaisemaOma
        {
            public string CityId, Url, Osoite;
            public double Alku, Tavoite, Vaimennus;
            public bool ArvoAlku, TaustaTauolla;
            /// <summary>Linssin taustaääni (LinssiTausta): linssin oma hiljennys ei väistä sitä (web vaistonPohja).</summary>
            public bool Linssi;
            public int Nouse;
            public Soitin Audio, Vaistyva;
        }

        readonly AaniTaulut t;
        readonly Musiikkivalitsin valitsin;
        readonly Func<double> arpa;
        static readonly int Kanavia = Enum.GetValues(typeof(Kanava)).Length;

        public AaniTila(AaniTaulut taulut, Func<double> arpa)
        {
            t = taulut ?? throw new ArgumentNullException(nameof(taulut));
            valitsin = new Musiikkivalitsin(t);
            this.arpa = arpa ?? throw new ArgumentNullException(nameof(arpa));
            for (int i = 0; i < toiveet.Length; i++) toiveet[i] = new Toive { Kanava = (Kanava)i };
        }

        /// <summary>Jokaisen tapahtuman jälkeen (Toiveet ajan tasalla).</summary>
        public event Action<AaniTila> Muuttui;

        // --- asetukset ja muisti ---------------------------------------------------

        /// <summary>Äänimaisema-kytkin (webin sfx.enabled): koko pelin mykistys.</summary>
        public bool Aanimaisema { get; private set; } = true;
        /// <summary>Musiikki-kytkin: vaientaa kaikki musiikkikerrokset (ei maisemaa).</summary>
        public bool Musiikki { get; private set; } = true;
        /// <summary>Musiikin liuku 0–100 (webin musiikinLiuku).</summary>
        public int Liuku { get; private set; } = AaniVakiot.LiukuOletus;
        /// <summary>Taustaäänen kerroin (webin kehittajanKerroin('tausta'), 0–3).</summary>
        public double TaustanKerroin { get; private set; } = 1;
        public bool Taustalla { get; private set; }
        public bool AvausKaynnissa { get; private set; }
        public bool VisaAuki { get; private set; }
        public bool Pidossa => pito;

        string paikka, paikanTyyppi, musiikinPaikka, musiikinMaa;
        readonly HashSet<string> tilat = new HashSet<string>();
        readonly List<string> hiljennykset = new List<string>();
        double pyydetty = 1;
        int puhujia;
        bool pito;
        readonly HashSet<string> puuttuvat = new HashSet<string>();
        readonly HashSet<string> puuttuvatLajit = new HashSet<string>();
        string arvottuPaikka, arvottuUrl;
        /// <summary>Kerran loppuun soinut pohjaraita: ei uudelleen ennen kuin paikka tai ketju vaihtuu (KERRAN LÄPI).</summary>
        string soinutPolku;

        // KAUPUNKIJAKSO (AaniTaulut.Jaksot): vaihe 0 nopea (kerran), 1 tauko, 2 hidas (kerran), 3 tausta (silmukka).
        string jaksoKaupunki;
        int jaksoVaihe;
        /// <summary>Kaupunki-intro soittaa jakson nopean ja hitaan linssipidon ohi (JaksonIntroAlusta); hitaan loppu palauttaa pidon.</summary>
        bool introPito;
        /// <summary>Kasvaa jokaisella jakson tauolla; soitin ajastaa JaksonTaukoMs:n ja kutsuu JaksonTaukoOhi(nro).</summary>
        public int JaksonTaukoNro { get; private set; }
        public int JaksonTaukoMs { get; private set; }
        /// <summary>Testeille ja lokiin: "pariisi:nopea" tms. tai null (ei jaksoa).</summary>
        public string Jakso => jaksoKaupunki == null ? null : jaksoKaupunki + ":" + new[] { "nopea", "tauko", "hidas", "tausta" }[jaksoVaihe];

        /// <summary>
        /// KERRAN LÄPI (omistaja 30.9.2026; oletus). false = webin käytös (arvottu aloituskohta, #alku, silmukat):
        /// kultaiset webvertailut (AaniTestit) ajetaan sillä.
        /// </summary>
        public bool KerranLapi { get; set; } = true;

        MaisemaOma nykyinen;
        Soitin pohja;
        string pohjaPolku;
        Soitin visa;
        double visanVoima = 1;
        Soitin siirtyma;
        string siirtymaLaji;
        double ajonHimmennys = 1, siirtymanVaisto = 1, vaistonPohja = 1;
        List<string> vaistonSyyt = new List<string>();
        Soitin aarre;
        Soitin lataus;
        string latausUrl, latausPolku;
        double latausTasoPyydetty;
        bool latausJatko, latausKantoi;
        /// <summary>Latausraidat, joita ei saatu (404, purku): eivät yritä uudelleen (pallon ruutu kutsuu LatausKaupunkia kierrossa).</summary>
        readonly HashSet<string> latausPuuttuvat = new HashSet<string>();
        readonly List<Soitin> vahdinPysayttamat = new List<Soitin>();
        readonly List<Soitin> elossa = new List<Soitin>();

        int tapahtuma = -1;
        readonly int?[] pois = new int?[Kanavia];
        readonly bool[] poisDb = new bool[Kanavia];
        readonly Queue<Action> jono = new Queue<Action>();
        readonly Toive[] toiveet = new Toive[Kanavia];

        public IReadOnlyList<Toive> Toiveet => toiveet;
        public Toive Toive(Kanava k) => toiveet[(int)k];
        public double Voimassa => Vaisto.Voimassa(pyydetty, hiljennykset);
        public double Pyydetty => pyydetty;
        public IReadOnlyList<string> Hiljennykset => hiljennykset;
        public double MusiikinKerroin => Musiikkitaso.Kerroin(Liuku);

        // --- tapahtumat -----------------------------------------------------------

        /// <summary>
        /// Missä ollaan (web syncAmbience → playPlaceAmbience). paikka = kaupunki tai virtuaalipaikka
        /// (etusivu, lentomatka, jalkamatka, merimatka), null = reitin varrella maitse / peli ohi.
        /// </summary>
        public void Paikka(string paikka, string tyyppi) => Tee(() =>
        {
            if (paikka != this.paikka) { soinutPolku = null; jaksoKaupunki = null; jaksoVaihe = 0; introPito = false; } // uusi laukaisu: musiikki (ja jakso) alusta
            this.paikka = paikka;
            paikanTyyppi = paikka == null ? null : tyyppi;
            SoitaPaikka();
        });

        /// <summary>Soittimen metatiedot: maiseman kesto sekunteina (webin hyppaa, arvottu aloituskohta).</summary>
        public void KestoTiedossa(double sekuntia) => Tee(() =>
        {
            var oma = nykyinen;
            var a = oma?.Audio;
            if (a == null || a.Hypatty || double.IsNaN(sekuntia) || double.IsInfinity(sekuntia)) return;
            var kohta = Maisemakori.Aloituskohta(oma.Alku, sekuntia, a.ArvottuAlku, arpa);
            a.Hypatty = true;
            if (kohta != 0) a.Alku = kohta;
        });

        /// <summary>
        /// Maiseman kierros lähestyy loppua (duration − 2,6 s). Kaupunkimaisema (KERRAN LÄPI): loppu häivytetään lyhyesti
        /// ja paikka on hiljaa seuraavaan laukaisuun asti. Linssin taustaääni: uusi kierros ristiin kohdasta #alku.
        /// </summary>
        public void SilmukkaVaihtuu() => Tee(() =>
        {
            var oma = nykyinen;
            var a = oma?.Audio;
            if (a == null || !a.Soinut) return;
            if (KerranLapi && !oma.Linssi)
            {
                oma.Audio = null; // nykyinen jää: sama paikka ei käynnisty uudelleen (SoitaPaikka)
                Ramppi(a, 0, AaniVakiot.SilmukkaRistiMs);
                Vapauta(a);
                return;
            }
            oma.Vaistyva = a;
            var uusi = LuoMaisemaSoitin(oma, false, AaniVakiot.SilmukkaRistiMs);
            oma.Audio = uusi;
            uusi.Hypatty = true;
            if (oma.Alku != 0) uusi.Alku = oma.Alku;
            Ramppi(a, 0, AaniVakiot.SilmukkaRistiMs);
            Vapauta(a);
            oma.Vaistyva = null;
        });

        /// <summary>Musiikkitila (web asetaMusiikkitila): 'matkalaukku' (lehti tulee hiljennyksestä). Tuntematon ohitetaan.</summary>
        public void Tila(string nimi, bool auki) => Tee(() => AsetaTila(nimi, auki));

        /// <summary>Hiljennyssyy (web hiljennaAmbienssi/palautaAmbienssi): lehti, pollo, linssi, …</summary>
        public void Hiljennys(string syy, bool paalla) => Tee(() => { if (paalla) Hiljenna(syy); else Palauta(syy); });

        /// <summary>Kertojan, lukijan tai pulun puhe alkoi/loppui (laskuri, web puheAlkoi/puheLoppui).</summary>
        public void Puhe(bool alkoi) => Tee(() =>
        {
            if (alkoi) { puhujia++; if (puhujia == 1) SaadaVaistoa(AaniVakiot.VaistoPuhe); }
            else { puhujia = Math.Max(0, puhujia - 1); if (puhujia == 0) SaadaVaistoa(1); }
        });

        /// <summary>Ääninäyte (kulttuurinäyte, zoom) soi: tausta 0,15:een (web vaimennaTausta/palautaTausta).</summary>
        public void Nayte(bool soi, double? kerroin = null) => Tee(() => SaadaVaistoa(soi ? (kerroin ?? AaniVakiot.VaistoNayte) : 1));

        /// <summary>
        /// Visan raita alkaa/loppuu (web startQuizMusic/stopQuizMusic). Vaihe 2: VisaAuki on myös webin visaSoi-lippu
        /// (asetaVisaSoi), jonka muutos valitsee pohjan uudelleen: kohtaaminen väistyy visan ajaksi ja palaa sen jälkeen.
        /// </summary>
        public void Visa(bool auki) => Tee(() =>
        {
            bool muuttui = VisaAuki != auki;
            VisaAuki = auki;
            if (auki) AloitaVisa(muuttui); else LopetaVisa(muuttui);
        });

        /// <summary>Siirtymä- tai linssiraita (jalan, laiva, lento, keksinnot, ihmisen-matka); null = lopeta.</summary>
        public void Siirtyma(string laji) => Tee(() => { if (laji == null) LopetaSiirtyma(); else AloitaSiirtyma(laji); });

        /// <summary>Linssiraidan himmennys (web himmennaSiirtymamusiikki; kellon pysäytys 0,5).</summary>
        public void Himmennys(double kerroin, int? kestoMs = null) => Tee(() =>
        {
            var arvo = Math.Min(1, Math.Max(0, kerroin));
            ajonHimmennys = double.IsNaN(arvo) ? 1 : arvo;
            if (siirtyma == null) return;
            Ramppi(siirtyma, RaidanTaso(siirtymaLaji), kestoMs ?? t.Siirtyma(siirtymaLaji).NousuMs);
        });

        /// <summary>Linssi auki/kiinni (ILinssiYmparisto.MusiikkiPitoon): pohja pitoon, hiljennys 'linssi', maisema pois.</summary>
        /// <param name="laskuMs">Pohjan ja maiseman häivytys (ms); oletus HaivytysMs. Linssin avaus 200 ms (omistaja TF 135: kaikki
        /// ääni katkeaa heti linssin alkaessa).</param>
        public void LinssiPito(bool paalla, int laskuMs = -1) => Tee(() =>
        {
            if (paalla == pito) return;
            if (paalla)
            {
                pito = true;
                LopetaPohja(laskuMs);
                Hiljenna(AaniVakiot.LinssinHiljennys);
                LopetaMaisema(laskuMs);
            }
            else
            {
                pito = false;
                introPito = false;
                Palauta(AaniVakiot.LinssinHiljennys);
                latausKantoi = false;
                SoitaPaikka();
                // Kierroksen raita jatkuu kartalle vain, jos kartan pohja on sama raita (LatausKantaa); muuten ristiin pois.
                if (LatausJatkuu && !latausKantoi) LopetaLataus(AaniVakiot.LatausRistiMs, desibeli: true);
            }
        });

        /// <summary>
        /// Linssin taustaääni (ILinssiYmparisto.Taustaaani; web js/linssit/satelliitti-aani.js humina): silmukka maiseman
        /// paikalla, joten sauma ristihäivytetään kuten maisemassa (SilmukkaVaihtuu). Taso = voima × taustan liuku; linssin
        /// oma hiljennys ei väistä sitä (web: vaistonPohja, kun LINSSIN_HILJENNYS on voimassa). url null = pois, ja jos linssi
        /// on jo suljettu, paikan maisema palaa. Äänimaisema-kytkin pois = ei soi.
        /// </summary>
        public void LinssiTausta(string url, double voima, int nousuMs) => Tee(() =>
        {
            if (url == null)
            {
                if (nykyinen == null || !nykyinen.Linssi) return;
                LopetaMaisema();
                if (!pito) SoitaPaikka();
                return;
            }
            if (!Aanimaisema) return;
            if (nykyinen != null && nykyinen.Linssi && nykyinen.Url == url) return;
            LopetaMaisema();
            var oma = new MaisemaOma
            {
                CityId = "linssi", Url = url, Osoite = url, Alku = 0, Linssi = true,
                Tavoite = voima, ArvoAlku = false, Nouse = nousuMs,
            };
            oma.Vaimennus = LinssinVaimennus(oma, Voimassa);
            nykyinen = oma;
            oma.Audio = LuoMaisemaSoitin(oma, false, nousuMs);
        });

        /// <summary>Web js/linssit/satelliitti-aani.js LASKU_MS: linssin taustaäänen ulosfeidi.</summary>
        public const int LinssinTaustanLaskuMs = 600;

        double LinssinVaimennus(MaisemaOma oma, double k) =>
            oma.Linssi && hiljennykset.Contains(AaniVakiot.LinssinHiljennys) ? pyydetty : k;

        /// <summary>Musiikki-kytkin (web kaannaMusiikki).</summary>
        public void MusiikkiPaalle(bool paalla) => Tee(() =>
        {
            if (paalla) soinutPolku = null; // pelaajan oma kytkentä on uusi laukaisu
            if (paalla != Musiikki) { Musiikki = paalla; MusiikkitilaMuuttui(); }
            KaynnistaLataus(AaniVakiot.SaadinMs);
            if (!paalla)
            {
                LopetaPohja(); LopetaVisaSoitin(); LopetaSiirtyma(); PysaytaAarre();
                return;
            }
            if (!Aanimaisema) return;
            KaynnistaPohja(musiikinPaikka, musiikinMaa);
            if (VisaAuki) AloitaVisa();
        });

        /// <summary>Äänimaisema-kytkin eli koko pelin mykistys (web kaannaTausta).</summary>
        public void AanimaisemaPaalle(bool paalla) => Tee(() =>
        {
            Aanimaisema = paalla;
            if (paalla) soinutPolku = null;
            KaynnistaLataus(AaniVakiot.SaadinMs);
            if (!paalla)
            {
                LopetaMaisema(); LopetaVisaSoitin(); LopetaPohja(); LopetaSiirtyma(); PysaytaAarre();
                return;
            }
            SoitaPaikka();
            if (VisaAuki) AloitaVisa();
        });

        /// <summary>Musiikin liuku 0–100 (web asetaMusiikinLiuku; natiivissa round(Taso(Voima.Musiikki) × 100)).</summary>
        public void AsetaLiuku(double arvo) => Tee(() =>
        {
            var uusi = Musiikkitaso.Rajaa(arvo);
            if (uusi == Liuku) return;
            Liuku = uusi;
            if (visa != null) Ramppi(visa, VisaTaso(Voimassa), AaniVakiot.SaadinMs);
            if (pohja != null) Ramppi(pohja, PohjaTaso(Voimassa), AaniVakiot.SaadinMs);
            if (siirtyma != null) Ramppi(siirtyma, RaidanTaso(siirtymaLaji), AaniVakiot.SaadinMs);
            if (aarre != null) Aseta(aarre, AarreTaso());
            KaynnistaLataus(AaniVakiot.SaadinMs); // liuku 0 → latausmusiikki pois; nosto käynnistää sen uudelleen
        });

        /// <summary>Taustaäänen kerroin (web kehittäjän 'tausta', natiivissa Taso(Voima.Tausta)).</summary>
        public void AsetaTausta(double arvo) => Tee(() =>
        {
            TaustanKerroin = double.IsNaN(arvo) || double.IsInfinity(arvo) ? 1
                : Math.Min(3, Math.Max(0, Math.Floor(arvo * 100 + 0.5) / 100));
            if (nykyinen?.Audio != null) Ramppi(nykyinen.Audio, MaisemaTaso(nykyinen), AaniVakiot.SaadinMs);
        });

        /// <summary>Soitin ilmoitti, ettei kanavan raitaa saa (HTTP 404, purkuvirhe tai latausvahti).</summary>
        public void Puuttuu(Kanava kanava) => Tee(() =>
        {
            switch (kanava)
            {
                case Kanava.Pohja: PohjaPuuttuu(); break;
                case Kanava.Maisema: MaisemaPuuttuu(); break;
                case Kanava.Visa: VisaPuuttuu(); break;
                case Kanava.Siirtyma: SiirtymaPuuttuu(); break;
                case Kanava.Aarre: if (aarre != null) { var a = aarre; Kuole(a); AarreOhi(a); } break;
                case Kanava.Lataus: LatausPuuttuu(); break;
            }
        });

        /// <summary>Paljastuskortti näkyy (laattatyyppi; web soitaAarreMusiikki). Tyhjä tai tuntematon = ei aihetta.</summary>
        public void AarrePaljastui(string tyyppi) => Tee(() =>
        {
            var aihe = t.Aarreaihe(tyyppi);
            if (aihe != null) SoitaAarre(aihe);
        });

        /// <summary>
        /// Musiikkisuunnitelman one-shot-aihe (aloituslento, saapumistunnus, loppu) aarreaiheen paikalla:
        /// pohja ja maisema väistyvät aiheen ajaksi ja palaavat sen loputtua. <paramref name="keskeyta"/> = false
        /// (saapumistunnus) ei katkaise soivaa aihetta, vaan jää pois. Aarreaihe katkaisee aina.
        /// </summary>
        public void Aihe(string polku, bool keskeyta = true) => Tee(() =>
        {
            if (polku == null || (!keskeyta && aarre != null)) return;
            SoitaAarre(polku);
        });

        /// <summary>Aloituslennon aihe (Lontoosta ensimmäiseen kaupunkiin, 26 s; päättyy perillä laskuun).</summary>
        /// Kartalla vain kaupungin oma kappale (KarttaVainKaupunki, omistaja 10.10.2026; PT 11.4x): lento ilman musiikkia.
        public void AloituslentoAlkoi() { if (!t.KarttaVainKaupunki) Aihe(t.AloituslentoAihe); }

        /// <summary>Kaikki aarteet löytyivät: matkan loppu (johtoaihe täytenä).</summary>
        public void MatkaLoppui() => Aihe(t.LoppuAihe);

        /// <summary>
        /// Ensimmäinen käynti kaupungissa: kaupungin maanosan saapumistunnus (suunnitelma: "uuteen
        /// kaupunkiin"; vaihe 2: avain maanosa, web SAAPUMISTUNNUKSET). Ei katkaise soivaa aihetta
        /// (aloituslento päättyy ensimmäiseen kaupunkiin).
        /// </summary>
        public void UusiKaupunki(string kaupunki)
        {
            if (t.KarttaVainKaupunki) return; // tulomusiikit pois kartalta (omistaja 10.10.2026)
            var maanosa = valitsin.Maanosa(kaupunki, t.Maa(kaupunki));
            if (maanosa != null && t.Saapumistunnukset.TryGetValue(maanosa, out var polku)) Aihe(polku, keskeyta: false);
        }

        /// <summary>
        /// Kohtaamisen tulos (vaihe 2, web ui.soitaKohtaamisenTulos): oikein → musa-ratkaisu, väärin tai aika
        /// loppui → musa-epaonnistuminen. Ei katkaise soivaa aihetta (kuten saapumistunnus); aarteen paljastus
        /// katkaisee tämän.
        /// </summary>
        public void TehtavanTulos(bool oikein) => Aihe(oikein ? t.RatkaisuAihe : t.EpaonnistuminenAihe, keskeyta: false);

        /// <summary>Kohtaaminen auki/kiinni (vaihe 2, web visa.js asetaMusiikkitila('kohtaaminen')); visan raita voittaa sen.</summary>
        public void Kohtaaminen(bool auki) => Tila(TilaKohtaaminen, auki);

        public const string TilaKohtaaminen = "kohtaaminen";

        /// <summary>Päällä olevat musiikkitilat (testit ja testikomento).</summary>
        public IReadOnlyCollection<string> Musiikkitilat => tilat;

        /// <summary>Aihe (aarre- tai suunnitelman aihe) soi nyt.</summary>
        public bool AiheSoi => aarre != null;

        /// <summary>Aarreaihe soi loppuun (ended).</summary>
        public void AarreLoppui() => Tee(() =>
        {
            var a = aarre;
            if (a == null) return;
            a.Tauko = true; // ended → paused
            Kuole(a);
            AarreOhi(a);
        });

        /// <summary>Pohjaraita soi loppuun (KERRAN LÄPI): hiljaisuus, kunnes paikka tai musiikkiketju vaihtuu.</summary>
        public void PohjaLoppui() => Tee(() =>
        {
            var s = pohja;
            if (s == null) return;
            if (jaksoKaupunki != null && (jaksoVaihe == 0 || jaksoVaihe == 2))
            {
                pohja = null;
                pohjaPolku = null;
                s.Tauko = true;
                Vapauta(s);
                var j = t.Jaksot[jaksoKaupunki];
                if (jaksoVaihe == 0 && j.TaukoMs > 0) { jaksoVaihe = 1; JaksonTaukoMs = j.TaukoMs; JaksonTaukoNro++; return; }
                if (jaksoVaihe == 2) introPito = false; // intro ohi: tausta ei soi linssipidossa
                jaksoVaihe = jaksoVaihe == 0 ? 2 : 3;
                JatkaJaksoa();
                return;
            }
            soinutPolku = s.Polku;
            pohja = null;
            pohjaPolku = null;
            s.Tauko = true; // ended → paused
            Vapauta(s);
        });

        /// <summary>Jakson tauko kului (soitin ajastaa JaksonTaukoMs:n): hidas kappale alkaa. Vanha numero = ohitetaan.</summary>
        public void JaksonTaukoOhi(int nro) => Tee(() =>
        {
            if (nro != JaksonTaukoNro || jaksoKaupunki == null || jaksoVaihe != 1) return;
            jaksoVaihe = 2;
            JatkaJaksoa();
        });

        /// <summary>
        /// KAUPUNKI-INTRON KATKO (Pariisin nykyintro, docs/kohtaukset/pallokierros/pariisi-nykyintro.md kohta 4): nopea kappale
        /// häivytetään haivytysMs:ssä ja jakso jää taukoon ilman ajastinta; JaksonIntroHidas aloittaa hitaan (ei 3 s:n taukoa).
        /// Soitin kutsuu nämä intron ajoista (Aanisoitin.KaupunkiIntro). Muualla kuin jakson nopeassa vaiheessa ei tee mitään.
        /// </summary>
        public void JaksonIntroKatko(int haivytysMs) => Tee(() =>
        {
            if (jaksoKaupunki == null || jaksoVaihe != 0) return;
            jaksoVaihe = 1;
            LopetaPohja(haivytysMs);
        });

        public void JaksonIntroHidas() => Tee(() =>
        {
            if (jaksoKaupunki == null || jaksoVaihe != 1) return;
            jaksoVaihe = 2;
            JatkaJaksoa();
        });

        /// <summary>
        /// KAUPUNKI-INTRO LINSSIN AUKI (LS1 9.10.: pallon nykyintro avautuu opas-linssissä, jolloin pohja on linssipidossa): jakson
        /// nopea alkaa heti alusta pidon ohi täysillä, katko ja hidas kuten JaksonIntroKatko/JaksonIntroHidas, ja hitaan loppu
        /// palauttaa pohjan pitoon (tausta ei soi). Ilman pitoa ei tee mitään (Paikka käynnistää jakson). Linssin sulku tai
        /// paikan vaihto lopettaa ohituksen.
        /// </summary>
        public void JaksonIntroAlusta(string kaupunki) => Tee(() =>
        {
            if (!pito || kaupunki == null || !Aanimaisema || !Musiikki || !t.Jaksot.ContainsKey(kaupunki)) return;
            introPito = true;
            musiikinPaikka = kaupunki;
            musiikinMaa = t.Maa(kaupunki);
            jaksoKaupunki = kaupunki;
            jaksoVaihe = 0;
            JatkaJaksoa();
        });

        /// <summary>Voiko kaupungin jakso soida (musiikki ja äänimaisema päällä, jakso olemassa); false = intron kello käy hiljaa.</summary>
        public bool JaksoVoiSoida(string kaupunki) => Aanimaisema && Musiikki && kaupunki != null && t.Jaksot.ContainsKey(kaupunki);

        /// <summary>Jakson seuraava vaihe: intron aikana suoraan jaksosta (pito ja tilaraidat ohi), muuten pohjan valinnan kautta.</summary>
        void JatkaJaksoa()
        {
            if (introPito && jaksoKaupunki != null && t.Jaksot.TryGetValue(jaksoKaupunki, out var j))
                SoitaJakso(j, Musiikkivalitsin.Valitse(valitsin.Ketju(null, jaksoKaupunki, t.Maa(jaksoKaupunki)), puuttuvat));
            else
                KaynnistaPohja(musiikinPaikka, musiikinMaa);
        }

        /// <summary>Jakson nopean kappaleen polku kaupungille (soittimen intro-ajastus tunnistaa sen), tai null.</summary>
        public string JaksonNopea(string kaupunki) =>
            kaupunki != null && t.Jaksot.TryGetValue(kaupunki, out var j) && j.Nopea != null ? t.MusaPolku(j.Nopea) : null;

        /// <summary>Portin "Aloita seikkailu" (true) ja intron loppu / eteneminen kartalle (false).</summary>
        public void Avaus(bool alkaa) => Tee(() =>
        {
            if (alkaa == AvausKaynnissa) return;
            AvausKaynnissa = alkaa;
            var kesto = alkaa ? AaniVakiot.AvauksenLiukuMs : AaniVakiot.HaivytysMs;
            if (pohja != null) Ramppi(pohja, PohjaTaso(Voimassa), kesto);
            if (nykyinen?.Audio != null) Ramppi(nykyinen.Audio, MaisemaTaso(nykyinen), kesto);
        });

        /// <summary>Sovellus taustalle (true) tai takaisin (false) (web aani-tausta.js, OnApplicationPause).</summary>
        public void TaustalleSiirto(bool taustalle) => Tee(() => { if (taustalle) MeneTaustalle(); else PalaaTaustalta(); });

        /// <summary>Uusi matka (main.js): maisema, visa, pohja ja siirtymäraita pois.</summary>
        // --- latausmusiikki ---------------------------------------------------------

        /// <summary>Latausruutu auki (Lataus tai LatausKaupunki kutsuttu, LatausOhi ei vielä).</summary>
        public bool LatausAuki { get; private set; }

        /// <summary>
        /// Pallon latausraita jatkuu kierroksella kartan tasolla kerran läpi (Päätoimittaja 10.10. 20.2x: "musiikki ei katkea"),
        /// kunnes pohja aloittaa muun raidan, linssi sulkeutuu toiseen raitaan tai raita loppuu (LatausLoppui).
        /// </summary>
        public bool LatausJatkuu { get; private set; }

        /// <summary>
        /// Latausruutu aukeaa (tai sen raita vaihtuu): url soi silmukkana tasolla taso (0–1, kohdenäkymän mikserin musiikkitaso),
        /// nousten LatausNousuMs:ssä.
        /// url null = latausruutu ilman musiikkia. Sama raita uudelleen ei ala alusta; eri raita ristiin (LatausRistiMs).
        /// jatkuu = raita jatkaa näkymässä kartan tasolla (LatausOhi), muuten se ristihäivytetään näkymän omaan ääneen.
        /// </summary>
        public void Lataus(string url, double taso, bool jatkuu = false) => Tee(() => AloitaLataus(null, url, taso, jatkuu));

        /// <summary>
        /// Kuumailmapallon latausruutu (Päätoimittaja: "kaupungin oma kappale, sama kuin kartalla"; 20.2x: varalla alueraita) tasolla
        /// taso (pallon mikserin musiikkitaso): raita jatkuu kierroksella kartan tasolla. Ei omaa eikä alueraitaa = hiljaa.
        /// </summary>
        public void LatausKaupunki(string kaupunki, double taso) => Tee(() =>
        {
            var polku = KaupunginPolku(kaupunki);
            AloitaLataus(polku, polku == null ? null : AaniOsoite.Url(polku), taso, true);
        });

        /// <summary>Latausmusiikin taso muuttui latausruudun aikana (mikserin säädin): säätimen ramppi. Jatkuvaan raitaan ei koske.</summary>
        public void AsetaLatausTaso(double taso) => Tee(() =>
        {
            if (!LatausAuki || LatausJatkuu) return;
            latausTasoPyydetty = Puhdas(taso);
            KaynnistaLataus(AaniVakiot.SaadinMs);
        });

        /// <summary>Pallon latausraita soittimen osoitteena (KaupunginPolku), tai null.</summary>
        public string KaupunginKappale(string kaupunki)
        {
            var polku = KaupunginPolku(kaupunki);
            return polku == null ? null : AaniOsoite.Url(polku);
        }

        /// <summary>
        /// Pallon latausraita (AaniTaulut.Latausraidat), muuten kaupungin oma raita (ketju ilman tiloja); jos sitä ei ole, VARARAITA (Päätoimittaja 10.10. 20.2x, kunnes uudet
        /// kaupunkikappaleet tulevat) on kartan alueraita samalla valinnalla (Musiikkivalitsin.Alueraita). Puuttuvat ohi.
        /// </summary>
        string KaupunginPolku(string kaupunki)
        {
            if (string.IsNullOrEmpty(kaupunki)) return null;
            // Pallon oma latausraita (AaniTaulut.Latausraidat) ensin; jos se puuttuu (404), kaupungin kappale tai alueraita.
            string oma = t.Latausraidat.TryGetValue(kaupunki, out var lr) ? t.MusaPolku(lr.Tunnus) : null;
            if (oma != null && !latausPuuttuvat.Contains(AaniOsoite.Url(oma))) return oma;
            var maa = t.Maa(kaupunki);
            var ketju = valitsin.Ketju(null, kaupunki, maa);
            var alue = valitsin.Alueraita(kaupunki, maa);
            if (alue != null && !ketju.Contains(alue)) ketju.Add(alue);
            return Musiikkivalitsin.Valitse(ketju, puuttuvat);
        }

        /// <summary>
        /// Latausruutu sulkeutuu. avautui = näkymä aukesi: jatkuva raita (pallo) laskee kartan tasolle tasorampilla LatausRistiMs:ssä
        /// ilman katkoa, tai ristihäivyttyy, jos pohjalla soi jo muu raita; muu latausraita (Olavinlinna) ristihäivyttyy näkymän
        /// omaan ääneen. Muuten ohitus tai poistuminen (LatausPoisMs).
        /// </summary>
        public void LatausOhi(bool avautui) => Tee(() =>
        {
            if (!LatausAuki) return;
            LatausAuki = false;
            latausUrl = null;
            if (!avautui) { LopetaLataus(AaniVakiot.LatausPoisMs); return; }
            if (!latausJatko || lataus == null || (pohja != null && pohjaPolku != lataus.Polku))
            {
                LopetaLataus(AaniVakiot.LatausRistiMs, desibeli: true);
                return;
            }
            // Sama raita jo pohjana (kaksi kopiota eri kohdissa): latausraita jatkaa, pohja pois.
            if (pohja != null) LopetaPohja(AaniVakiot.LatausRistiMs);
            LatausJatkuu = true;
            lataus.Silmukka = false; // kierroksella kerran läpi kuten kartalla (KERRAN LÄPI)
            // Desibeleissä tasainen (PT 21.0x: siirtymässä ≤ 1 dB:n askel; ~25 dB / 3 s ≈ 0,8 dB per 100 ms).
            Ramppi(lataus, JatkoTaso(), AaniVakiot.LatausRistiMs, desibeli: true);
        });

        /// <summary>Jatkuva latausraita soi loppuun (Aanisoitin): kartta ei soita samaa raitaa heti uudelleen (KERRAN LÄPI).</summary>
        public void LatausLoppui() => Tee(() =>
        {
            var s = lataus;
            if (s == null || s.Silmukka) return;
            if (s.Polku != null && pohja == null) soinutPolku = s.Polku;
            lataus = null;
            LatausJatkuu = false;
            s.Tauko = true;
            Vapauta(s);
        });

        double LatausTaso() => Liuku > 0 ? latausTasoPyydetty : 0;

        static double Puhdas(double taso) => double.IsNaN(taso) || double.IsInfinity(taso) ? 0 : Math.Min(1, Math.Max(0, taso));

        /// <summary>Kartan pohjaraidan taso (puheen, näytteen ja visan väistö mukana; linssin hiljennys ei, kuten introssa).</summary>
        double JatkoTaso() => AaniVakiot.MusiikinPerustaso * pyydetty * MusiikinKerroin;

        void AloitaLataus(string polku, string url, double taso, bool jatkuu)
        {
            LatausAuki = true;
            LatausJatkuu = false;
            latausJatko = jatkuu;
            latausUrl = string.IsNullOrEmpty(url) || latausPuuttuvat.Contains(url) ? null : url;
            latausPolku = latausUrl == null ? null : polku;
            latausTasoPyydetty = Puhdas(taso);
            KaynnistaLataus(AaniVakiot.SaadinMs);
        }

        /// <summary>Latausraita pyynnön ja asetusten mukaan: soi, vaihtaa raitaa, seuraa liukua ja väistöä (kestoMs) tai lopettaa.</summary>
        void KaynnistaLataus(int kestoMs)
        {
            if (LatausJatkuu)
            {
                if (lataus == null) { LatausJatkuu = false; return; }
                if (!Aanimaisema || !Musiikki || !(JatkoTaso() > 0)) { LopetaLataus(kestoMs); return; }
                if (lataus.Taso != JatkoTaso()) Ramppi(lataus, JatkoTaso(), kestoMs);
                return;
            }
            if (!LatausAuki || latausUrl == null || !Aanimaisema || !Musiikki || !(LatausTaso() > 0)) { LopetaLataus(kestoMs); return; }
            if (lataus != null && lataus.Url == latausUrl)
            {
                // Kierrokselta uuteen latausruutuun samalla raidalla: silmukka takaisin ja pehmeä nousu latauksen tasolle.
                if (!lataus.Silmukka) { lataus.Silmukka = true; kestoMs = AaniVakiot.LatausNousuMs; }
                lataus.Polku = latausPolku;
                if (lataus.Taso != LatausTaso()) Ramppi(lataus, LatausTaso(), kestoMs);
                return;
            }
            var vaistyva = lataus;
            lataus = null;
            if (vaistyva != null) { Ramppi(vaistyva, 0, AaniVakiot.LatausRistiMs, desibeli: true); Vapauta(vaistyva); }
            var s = Uusi(Kanava.Lataus, latausUrl, true);
            s.Polku = latausPolku;
            lataus = s;
            Soita(s, () =>
            {
                if (lataus != s) { s.Tauko = true; return; }
                Ramppi(s, LatausTaso(), AaniVakiot.LatausNousuMs);
            });
        }

        /// <summary>
        /// Pohja aloittaa raidan polku, kun latausraita jatkuu: sama raita = latausraita kantaa sen (true, pohja ei ala alusta),
        /// muu raita = latausraita ristiin pois (false).
        /// </summary>
        bool LatausKantaa(string polku)
        {
            if (!LatausJatkuu || lataus == null) return false;
            if (polku != null && lataus.Polku == polku) { latausKantoi = true; return true; }
            LopetaLataus(AaniVakiot.LatausRistiMs, desibeli: true);
            return false;
        }

        /// <summary>Latausraita pois: desibeli = ristihäivytys desibeleissä tasaisena (PT 10.10. 21.5x: linnan ristihäivytys samalla
        /// kaavalla kuin pallon jatko), muuten lineaarinen (ohitus, säädin).</summary>
        void LopetaLataus(int laskuMs, bool desibeli = false)
        {
            var vanha = lataus;
            lataus = null;
            LatausJatkuu = false;
            if (vanha == null) return;
            Ramppi(vanha, 0, laskuMs, desibeli);
            Vapauta(vanha);
        }

        /// <summary>Raitaa ei saa (404, purku): latausruutu jatkuu hiljaa, eikä sama raita yritä uudelleen (kuten pohjan puuttuvat).</summary>
        void LatausPuuttuu()
        {
            var s = lataus;
            if (s == null) return;
            lataus = null;
            latausUrl = null;
            LatausJatkuu = false;
            latausPuuttuvat.Add(s.Url);
            Vapauta(s);
        }

        public void UusiMatka() => Tee(() =>
        {
            LopetaMaisema(); LopetaVisaSoitin(); LopetaPohja(); LopetaSiirtyma();
            VisaAuki = false;
            soinutPolku = null;
        });

        // --- tapahtuman runko -----------------------------------------------------

        void Tee(Action teko)
        {
            tapahtuma++;
            for (int i = 0; i < pois.Length; i++) { pois[i] = null; poisDb[i] = false; }
            teko();
            while (jono.Count > 0) jono.Dequeue()();
            PaivitaToiveet();
            Muuttui?.Invoke(this);
        }

        void PaivitaToiveet()
        {
            for (int i = 0; i < toiveet.Length; i++)
            {
                var k = (Kanava)i;
                var s = Soiva(k);
                var w = toiveet[i];
                w.Url = s?.Url;
                w.Tavoite = s?.Taso ?? 0;
                w.KestoMs = s != null && s.MuutosT == tapahtuma ? s.MuutosMs : (int?)null;
                w.Desibeli = s != null && s.MuutosT == tapahtuma && s.MuutosDb;
                w.Uusi = s != null && s.SyntyiT == tapahtuma;
                w.PoisMs = pois[i];
                w.PoisDesibeli = pois[i] > 0 && poisDb[i];
                w.Tauko = s?.Tauko ?? false;
                w.Alku = s?.Alku ?? 0;
                w.Silmukka = s?.Silmukka ?? false;
                w.IlmanKompressoria = s?.IlmanKompressoria ?? false;
                w.Kerran = s?.Kerran ?? false;
            }
        }

        Soitin Soiva(Kanava k) => k switch
        {
            Kanava.Pohja => pohja,
            Kanava.Maisema => nykyinen?.Audio,
            Kanava.Visa => visa,
            Kanava.Siirtyma => siirtyma,
            Kanava.Lataus => lataus,
            _ => aarre,
        };

        Soitin Uusi(Kanava k, string url, bool silmukka)
        {
            var s = new Soitin { Kanava = k, Url = url, SyntyiT = tapahtuma, Silmukka = silmukka };
            Aseta(s, 0); // vahvistin syntyy nollasta
            elossa.Add(s);
            return s;
        }

        void Soita(Soitin s, Action alkoi)
        {
            s.Tauko = false;
            s.Pelattu = true;
            if (alkoi != null) jono.Enqueue(alkoi);
        }

        void Aseta(Soitin s, double arvo) { s.Taso = arvo; s.MuutosT = tapahtuma; s.MuutosMs = 0; s.MuutosDb = false; }

        void Ramppi(Soitin s, double kohde, int kesto, bool desibeli = false)
        {
            s.Taso = Math.Max(0, kohde);
            s.MuutosT = tapahtuma;
            s.MuutosMs = kesto;
            s.MuutosDb = desibeli;
            if (kesto > 0) { s.RamppiT = tapahtuma; s.RamppiMs = kesto; s.RamppiKohde = s.Taso; }
        }

        /// <summary>Poistuvan soittimen häivytys: tämän tapahtuman viimeinen ramppi nollaan, muuten heti.</summary>
        int PoisKesto(Soitin s) => s.RamppiT == tapahtuma && s.RamppiKohde == 0 ? s.RamppiMs : 0;

        void Vapauta(Soitin s)
        {
            if (s.Vapautettu) return;
            s.Vapautettu = true;
            s.Tauko = true;
            elossa.Remove(s);
            vahdinPysayttamat.Remove(s);
            if (!s.Kuollut) KirjaaPois(s);
        }

        /// <summary>Soitin mykistyi (virhe tai loppu) vapautumatta.</summary>
        void Kuole(Soitin s)
        {
            if (s.Kuollut || s.Vapautettu) return;
            s.Kuollut = true;
            KirjaaPois(s);
        }

        void KirjaaPois(Soitin s)
        {
            var i = (int)s.Kanava;
            pois[i] = Math.Max(pois[i] ?? 0, PoisKesto(s));
            if (s.RamppiT == tapahtuma && s.RamppiKohde == 0 && s.MuutosDb) poisDb[i] = true;
        }

        // --- tasot ----------------------------------------------------------------

        double PohjaTaso(double kerroin) =>
            AaniVakiot.MusiikinPerustaso * (introPito ? 1 : kerroin) * MusiikinKerroin * (AvausKaynnissa ? AaniVakiot.AvauksenMusiikki : 1);

        double VisaTaso(double kerroin) =>
            Math.Min(1, AaniVakiot.MusiikinPerustaso * AaniVakiot.VisanKerroin * visanVoima * kerroin * MusiikinKerroin);

        double AarreTaso() => AaniVakiot.MusiikinPerustaso * AaniVakiot.AarteenKerroin * MusiikinKerroin;

        double RaidanTaso(string laji)
        {
            var r = t.Siirtyma(laji);
            return (r?.Voima ?? 0) * Vaisto.Laji(r, vaistonSyyt, vaistonPohja, siirtymanVaisto) * ajonHimmennys * MusiikinKerroin;
        }

        double MaisemaTaso(MaisemaOma oma) => oma.Tavoite * AvauksenMaisemanKerroin(oma) * TaustanKerroin;

        double AvauksenMaisemanKerroin(MaisemaOma oma)
        {
            if (!(AvausKaynnissa && oma.CityId == "etusivu")) return oma.Vaimennus;
            return AaniVakiot.AvauksenMaisema * (hiljennykset.Count > 0 ? AaniVakiot.VaistoHiljennys : 1);
        }

        // --- väistö ja tilat ------------------------------------------------------

        void SaadaVaistoa(double kerroin)
        {
            pyydetty = kerroin;
            AjaVaisto(AaniVakiot.VaistoLiukuMs);
        }

        void AjaVaisto(int kesto)
        {
            var k = Voimassa;
            // Siirtymämusiikin väistäjä (lisaaVaistaja) ajetaan ensin, kuten webissä.
            siirtymanVaisto = k;
            vaistonSyyt = new List<string>(hiljennykset);
            vaistonPohja = pyydetty;
            if (siirtyma != null) Ramppi(siirtyma, RaidanTaso(siirtymaLaji), kesto != 0 ? kesto : t.Siirtyma(siirtymaLaji).NousuMs);
            if (visa != null && k < 1) Ramppi(visa, VisaTaso(k), kesto);
            if (pohja != null) Ramppi(pohja, PohjaTaso(k), kesto);
            if (LatausJatkuu) KaynnistaLataus(kesto); // kierroksen latausraita väistää kuten pohja
            if (nykyinen == null) return;
            nykyinen.Vaimennus = LinssinVaimennus(nykyinen, k);
            if (nykyinen.Audio != null) Ramppi(nykyinen.Audio, MaisemaTaso(nykyinen), kesto);
            if (nykyinen.Vaistyva != null && k < 1) Ramppi(nykyinen.Vaistyva, 0, kesto);
        }

        void Hiljenna(string syy)
        {
            if (hiljennykset.Contains(syy)) return;
            hiljennykset.Add(syy);
            AsetaTila(syy, true);
            AjaVaisto(AaniVakiot.HiljennysLiukuMs);
        }

        void Palauta(string syy)
        {
            if (!hiljennykset.Remove(syy)) return;
            AsetaTila(syy, false);
            AjaVaisto(AaniVakiot.HiljennysLiukuMs);
        }

        void AsetaTila(string nimi, bool auki)
        {
            if (nimi == null || !t.Tilaraidat.Exists(r => r.Nimi == nimi)) return;
            var muuttui = auki ? tilat.Add(nimi) : tilat.Remove(nimi);
            if (muuttui) MusiikkitilaMuuttui();
        }

        /// <summary>Webin musiikkiKuuntelijat: pohja uudelleen samaan paikkaan (pito pysäyttää).</summary>
        void MusiikkitilaMuuttui()
        {
            if (Aanimaisema) KaynnistaPohja(musiikinPaikka, musiikinMaa);
            if (pito && !introPito) LopetaPohja();
        }

        // --- pohjaraita -----------------------------------------------------------

        void KaynnistaPohja(string cityId, string maa)
        {
            if (introPito) { if (Aanimaisema && Musiikki) return; introPito = false; } // intro omistaa pohjan (JaksonIntroAlusta)
            musiikinPaikka = cityId;
            musiikinMaa = maa;
            if (!Aanimaisema || !Musiikki || pito) { LopetaPohja(); return; }
            var polku = Musiikkivalitsin.Valitse(valitsin.Ketju(tilat, cityId, maa, VisaAuki), puuttuvat);
            // Ei raitaa (kaupungin ulkopuolella kartalla, KarttaVainKaupunki): edellinen kappale häivytetään pois (web sama).
            if (polku == null) { LopetaPohja(); return; }
            if (KerranLapi && cityId != null && t.Jaksot.TryGetValue(cityId, out var jakso))
            {
                var oma = Musiikkivalitsin.Valitse(valitsin.Ketju(null, cityId, maa), puuttuvat);
                if (polku == oma) { if (jaksoKaupunki != cityId) { jaksoKaupunki = cityId; jaksoVaihe = 0; } SoitaJakso(jakso, oma); return; }
                // Tilaraita (lehti, kohtaaminen …) keskeyttää: saapumisen nopea ja tauko jäävät väliin, paluussa hidas.
                if (jaksoKaupunki == cityId && jaksoVaihe < 2) jaksoVaihe = 2;
            }
            if (pohja != null && pohjaPolku == polku) return;
            if (pohja == null && polku == soinutPolku) return; // soi jo kerran läpi tässä laukaisussa
            if (LatausKantaa(polku)) { LopetaPohja(AaniVakiot.PohjaVaihtoMs); return; } // pallon raita jatkuu: ei alusta
            var vaistyva = pohja;
            pohja = null;
            pohjaPolku = null;
            if (vaistyva != null) { Ramppi(vaistyva, 0, AaniVakiot.PohjaVaihtoMs); Vapauta(vaistyva); }
            var s = Uusi(Kanava.Pohja, AaniOsoite.Url(polku), !KerranLapi); // KERRAN LÄPI: ei silmukkaa (PohjaLoppui)
            s.Polku = polku;
            pohja = s;
            pohjaPolku = polku;
            var nousu = vaistyva != null ? AaniVakiot.PohjaVaihtoMs : AaniVakiot.PohjaNousuMs;
            Soita(s, () =>
            {
                if (pohja != s) { s.Tauko = true; return; }
                Ramppi(s, PohjaTaso(Voimassa), nousu);
            });
        }

        /// <summary>Jakson nykyinen vaihe pohjakanavalle; puuttuva raita ohitetaan (nopea → hidas ilman taukoa, hidas → tausta).</summary>
        void SoitaJakso(KaupunkiJakso j, string oma)
        {
            if (jaksoVaihe == 1) { LopetaPohja(); return; }
            // Tausta ilman omaa raitaa: pohjavire vain vanhassa ketjussa (KarttaVainKaupunki → hiljaisuus hitaan jälkeen).
            string Polku(int v) => v == 0 ? t.MusaPolku(j.Nopea) : v == 2 ? (j.Hidas != null ? t.MusaPolku(j.Hidas) : oma)
                : j.Tausta != null ? t.MusaPolku(j.Tausta) : t.KarttaVainKaupunki ? null : t.MusaPolku(t.Pohjaraita);
            var polku = Polku(jaksoVaihe);
            while (polku != null && puuttuvat.Contains(polku) && jaksoVaihe < 3) { jaksoVaihe = jaksoVaihe == 0 ? 2 : 3; polku = Polku(jaksoVaihe); }
            if (polku == null || puuttuvat.Contains(polku)) { LopetaPohja(); return; }
            if (pohja != null && pohjaPolku == polku) return;
            // Jakson vaihe tarvitsee oman soittimen (PohjaLoppui): jatkuva latausraita ristiin pois.
            if (LatausJatkuu) LopetaLataus(AaniVakiot.LatausRistiMs, desibeli: true);
            var vaistyva = pohja;
            pohja = null;
            pohjaPolku = null;
            if (vaistyva != null) { Ramppi(vaistyva, 0, AaniVakiot.PohjaVaihtoMs); Vapauta(vaistyva); }
            var s = Uusi(Kanava.Pohja, AaniOsoite.Url(polku), jaksoVaihe == 3); // nopea ja hidas kerran läpi, tausta silmukkana
            s.Polku = polku;
            pohja = s;
            pohjaPolku = polku;
            var nousu = vaistyva != null ? AaniVakiot.PohjaVaihtoMs : AaniVakiot.PohjaNousuMs;
            Soita(s, () =>
            {
                if (pohja != s) { s.Tauko = true; return; }
                Ramppi(s, PohjaTaso(Voimassa), nousu);
            });
        }

        void LopetaPohja(int laskuMs = -1)
        {
            var vanha = pohja;
            pohja = null;
            pohjaPolku = null;
            if (vanha == null) return;
            Ramppi(vanha, 0, laskuMs >= 0 ? laskuMs : AaniVakiot.HaivytysMs);
            Vapauta(vanha);
        }

        void PohjaPuuttuu()
        {
            var s = pohja;
            if (s == null) return;
            puuttuvat.Add(s.Polku);
            pohja = null;
            pohjaPolku = null;
            Vapauta(s);
            if (s.Polku != t.MusaPolku(t.Pohjaraita) && pohja == null) KaynnistaPohja(musiikinPaikka, musiikinMaa);
        }

        // --- äänimaisema ----------------------------------------------------------

        void SoitaPaikka()
        {
            var cityId = paikka;
            if (Aanimaisema) KaynnistaPohja(cityId, t.Maa(cityId)); else LopetaPohja();
            var url = ArvoAani(cityId, paikanTyyppi);
            if (!Aanimaisema || url == null) { LopetaMaisema(); return; }
            if (nykyinen != null && nykyinen.CityId == cityId && nykyinen.Url == url) return;
            LopetaMaisema();
            var jako = AaniOsoite.JaaAlku(url);
            var paikanVoima = cityId == "etusivu" ? AaniVakiot.EtusivunVoima
                : cityId == "lentomatka" ? AaniVakiot.LennonVoima
                : cityId == "jalkamatka" ? AaniVakiot.JalkamatkanVoima : 1;
            var oma = new MaisemaOma
            {
                // KERRAN LÄPI: aina alusta (ei #alku-hyppyä eikä arvottua aloituskohtaa).
                CityId = cityId, Url = url, Osoite = jako.Url, Alku = KerranLapi ? 0 : jako.Alku,
                Vaimennus = Voimassa,
                Tavoite = AaniVakiot.MaisemanVoima * jako.Voima * paikanVoima,
                ArvoAlku = !KerranLapi && !t.Vakiopaikat.Contains(cityId),
                Nouse = cityId == "lentomatka" ? AaniVakiot.LennonNousuMs
                    : cityId == "jalkamatka" ? AaniVakiot.JalkamatkanNousuMs : AaniVakiot.HaivytysMs,
            };
            nykyinen = oma;
            oma.Audio = LuoMaisemaSoitin(oma, oma.ArvoAlku, oma.Nouse);
        }

        /// <summary>Webin arvoAani: sama paikka = sama äänite (muisti), uusi paikka arvotaan.</summary>
        string ArvoAani(string cityId, string tyyppi)
        {
            if (string.IsNullOrEmpty(cityId)) return null;
            if (arvottuPaikka == cityId) return arvottuUrl;
            var kori = Maisemakori.Paikan(t, cityId, tyyppi);
            var url = Maisemakori.Arvo(kori, t.Vakiopaikat.Contains(cityId), arpa);
            if (url == null) return null;
            arvottuPaikka = cityId;
            arvottuUrl = url;
            return url;
        }

        Soitin LuoMaisemaSoitin(MaisemaOma oma, bool arvottuAlku, int nouse)
        {
            var s = Uusi(Kanava.Maisema, AaniOsoite.Url(oma.Osoite), false);
            s.ArvottuAlku = arvottuAlku;
            s.IlmanKompressoria = oma.Linssi;
            s.Kerran = KerranLapi && !oma.Linssi;
            SoitaMaisema(oma, s, nouse);
            return s;
        }

        void SoitaMaisema(MaisemaOma oma, Soitin s, int nouse)
        {
            if (Taustalla) { oma.TaustaTauolla = true; return; }
            Soita(s, () =>
            {
                if (nykyinen != oma) { Vapauta(s); return; }
                s.Soinut = true;
                Ramppi(s, MaisemaTaso(oma), nouse);
            });
        }

        void LopetaMaisema(int laskuMs = -1)
        {
            var vanha = nykyinen;
            nykyinen = null;
            if (vanha == null) return;
            // Linssin taustaääni laskee webin tahtiin (satelliitti-aani LASKU_MS 600), maisema omaansa; linssin avaus nopeasti.
            int lasku = laskuMs >= 0 ? laskuMs : vanha.Linssi ? LinssinTaustanLaskuMs : AaniVakiot.HaivytysMs;
            if (vanha.Vaistyva != null) { Ramppi(vanha.Vaistyva, 0, lasku); Vapauta(vanha.Vaistyva); }
            if (vanha.Audio == null) return; // kerran läpi soinut maisema on jo hiljaa
            Ramppi(vanha.Audio, 0, lasku);
            Vapauta(vanha.Audio);
        }

        void MaisemaPuuttuu()
        {
            var oma = nykyinen;
            var s = oma?.Audio;
            if (s == null) return;
            if (!s.VarareittiKokeiltu && s.Url != null && s.Url.StartsWith(AaniOsoite.Juuri, StringComparison.Ordinal))
            {
                // Peili petti: alkuperäinen osoite samalla soittimella (web petti → varareitti).
                s.VarareittiKokeiltu = true;
                s.Url = oma.Osoite;
                SoitaMaisema(oma, s, oma.Nouse);
                return;
            }
            // Natiivi: ei CORS-kierrosta eikä synteesiä, paikka on hiljaa (§2.7, §2.10).
            nykyinen = null;
            Vapauta(s);
        }

        // --- visamusiikki ---------------------------------------------------------

        void AloitaVisa(bool lippuMuuttui = false)
        {
            SaadaVaistoa(AaniVakiot.VaistoVisa);
            // Web asetaVisaSoi(true) ennen kytkimiä: lippu kertoo, että kysymys on auki.
            if (lippuMuuttui) MusiikkitilaMuuttui();
            if (!Aanimaisema || !Musiikki || visa != null) return;
            var valinta = t.VisaOletus;
            if (valinta == "") return;
            var jako = AaniOsoite.JaaAlku(valinta);
            visanVoima = jako.Voima;
            var alkuperainen = jako.Url ?? AaniVakiot.VisanVara;
            var s = Uusi(Kanava.Visa, AaniOsoite.Url(alkuperainen), true);
            s.Polku = alkuperainen;
            s.Alku = jako.Alku;
            visa = s;
            SoitaVisa(s);
        }

        void SoitaVisa(Soitin s) => Soita(s, () =>
        {
            if (visa != s) { s.Tauko = true; return; }
            Ramppi(s, VisaTaso(Voimassa), AaniVakiot.HaivytysMs);
        });

        void LopetaVisa(bool lippuMuuttui)
        {
            SaadaVaistoa(1);
            // Web asetaVisaSoi(false): auki oleva kohtaaminen palaa ketjun kärkeen.
            if (lippuMuuttui) MusiikkitilaMuuttui();
            PoistaVisaSoitin();
        }

        void LopetaVisaSoitin()
        {
            SaadaVaistoa(1);
            PoistaVisaSoitin();
        }

        void PoistaVisaSoitin()
        {
            var vanha = visa;
            visa = null;
            if (vanha == null) return;
            Ramppi(vanha, 0, AaniVakiot.HaivytysMs);
            Vapauta(vanha);
        }

        void VisaPuuttuu()
        {
            var s = visa;
            if (s == null) return;
            var peilista = s.Url != null && s.Url.StartsWith(AaniOsoite.Juuri, StringComparison.Ordinal);
            if (s.VarareittiKokeiltu || !peilista || AaniOsoite.OmaPolku(s.Polku) != null)
            {
                visa = null;
                Kuole(s);
                return;
            }
            s.VarareittiKokeiltu = true;
            s.Url = s.Polku;
            SoitaVisa(s);
        }

        // --- siirtymä- ja linssiraidat --------------------------------------------

        void AloitaSiirtyma(string laji)
        {
            var raita = t.Siirtyma(laji);
            // Matkan siirtymäraidat pois kartalta (KarttaVainKaupunki, omistaja 10.10.2026); linssien raidat soivat kuten ennen.
            if (raita != null && t.KarttaVainKaupunki && raita.Ryhma == "siirtyma") return;
            if (raita == null || !Aanimaisema || !Musiikki || puuttuvatLajit.Contains(laji)) return;
            if (siirtyma != null && siirtymaLaji == laji) return;
            if (siirtyma != null) LopetaSiirtyma();
            ajonHimmennys = 1;
            var s = Uusi(Kanava.Siirtyma, AaniOsoite.Musiikkiversio(raita.Ampari), true);
            s.Polku = laji;
            siirtyma = s;
            siirtymaLaji = laji;
            SoitaSiirtyma(s, raita);
        }

        void SoitaSiirtyma(Soitin s, SiirtymaRaita raita) => Soita(s, () =>
        {
            if (siirtyma != s) { s.Tauko = true; return; }
            Ramppi(s, RaidanTaso(raita.Laji), raita.NousuMs);
        });

        void LopetaSiirtyma()
        {
            var vanha = siirtyma;
            var laji = siirtymaLaji;
            siirtyma = null;
            siirtymaLaji = null;
            ajonHimmennys = 1;
            if (vanha == null) return;
            Ramppi(vanha, 0, t.Siirtyma(laji).LaskuMs);
            Vapauta(vanha);
        }

        void SiirtymaPuuttuu()
        {
            var s = siirtyma;
            if (s == null) return;
            var raita = t.Siirtyma(siirtymaLaji);
            if (s.VarareittiKokeiltu)
            {
                puuttuvatLajit.Add(raita.Laji);
                siirtyma = null;
                siirtymaLaji = null;
                Vapauta(s);
                return;
            }
            s.VarareittiKokeiltu = true;
            s.Url = AaniOsoite.AaniUrl(raita.Oma);
            SoitaSiirtyma(s, raita);
        }

        // --- aarreaihe ------------------------------------------------------------

        void SoitaAarre(string lahde)
        {
            if (!Aanimaisema || !Musiikki) return;
            PysaytaAarre();
            var s = Uusi(Kanava.Aarre, AaniOsoite.AaniUrl(lahde), false);
            Aseta(s, AarreTaso());
            Hiljenna(AaniVakiot.AarteenSyy);
            aarre = s;
            Soita(s, null);
        }

        void PysaytaAarre()
        {
            var s = aarre;
            aarre = null;
            if (s == null) return;
            Vapauta(s);
            Palauta(AaniVakiot.AarteenSyy);
        }

        void AarreOhi(Soitin s)
        {
            if (aarre != s) return;
            aarre = null;
            Palauta(AaniVakiot.AarteenSyy);
        }

        // --- taustalle ja takaisin --------------------------------------------------

        void MeneTaustalle()
        {
            if (Taustalla) return;
            Taustalla = true;
            // ambience-stream.js taukoaTaustanAjaksi: maisema (ja väistyvä), visa, pohja.
            var oma = nykyinen;
            if (oma?.Audio != null && !oma.Audio.Tauko) { oma.TaustaTauolla = true; oma.Audio.Tauko = true; }
            foreach (var s in new[] { oma?.Vaistyva, visa, pohja, lataus })
                if (s != null && !s.Tauko) { s.TaustaTauolla = true; s.Tauko = true; }
            // aani-tausta.js pysaytaLoput: kaikki muut soivat (siirtymä, aarre).
            foreach (var s in elossa)
                if (s.Pelattu && !s.Tauko) { s.Tauko = true; vahdinPysayttamat.Add(s); }
        }

        void PalaaTaustalta()
        {
            if (!Taustalla) return;
            Taustalla = false;
            var oma = nykyinen;
            if (oma != null && oma.TaustaTauolla)
            {
                oma.TaustaTauolla = false;
                if (oma.Audio != null) SoitaMaisema(oma, oma.Audio, oma.Nouse);
            }
            foreach (var s in new[] { oma?.Vaistyva, visa, pohja, lataus })
            {
                if (s == null || !s.TaustaTauolla) continue;
                s.TaustaTauolla = false;
                Soita(s, null);
            }
            var lista = new List<Soitin>(vahdinPysayttamat);
            vahdinPysayttamat.Clear();
            foreach (var s in lista)
            {
                if (s.Silmukka) { Soita(s, null); continue; }
                // Kertaluontoinen (aarreaihe) päättyy paluussa (webin 'ended').
                s.Tauko = true;
                Kuole(s);
                if (s == aarre) AarreOhi(s);
            }
        }
    }
}
