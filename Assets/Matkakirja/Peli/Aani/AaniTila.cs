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
// Poikkeamat webistä (natiivin omat, §2.7–§2.10):
//   - maiseman toinen virhe (peili → alkuperäinen → virhe) on hiljaisuus: webin CORS-kierros ja
//     synteesi eivät kuulu natiiviin;
//   - peilin katkaisijaa (VIRHERAJA 3) ei ole;
//   - linssin pito on Raamatun mukainen (§3 loppu, §6 kohta 1): pohja pitoon, hiljennys 'linssi',
//     maisema pois; purku käynnistää paikan uudelleen.
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli
{
    public enum Kanava { Pohja, Maisema, Visa, Siirtyma, Aarre }

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

        public override string ToString() =>
            $"{Kanava}: {Url ?? "-"} taso {Tavoite} kesto {KestoMs?.ToString() ?? "-"} uusi {Uusi} pois {PoisMs?.ToString() ?? "-"} tauko {Tauko} alku {Alku}";
    }

    public sealed class AaniTila
    {
        sealed class Soitin
        {
            public Kanava Kanava;
            public string Url;
            public double Taso;
            public int MuutosT = -1, MuutosMs;         // viimeisin tasomuutos (myös suora asetus)
            public int RamppiT = -1, RamppiMs;         // viimeisin ramppi, jonka kesto > 0
            public double RamppiKohde;
            public int SyntyiT;
            public bool Tauko = true;                  // HTMLMediaElement.paused
            public bool Pelattu;                       // play() kutsuttu ainakin kerran
            public double Alku;
            public bool Silmukka;
            public bool Hypatty, ArvottuAlku, Soinut, VarareittiKokeiltu, TaustaTauolla;
            public bool Vapautettu, Kuollut;
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
        readonly List<Soitin> vahdinPysayttamat = new List<Soitin>();
        readonly List<Soitin> elossa = new List<Soitin>();

        int tapahtuma = -1;
        readonly int?[] pois = new int?[5];
        readonly Queue<Action> jono = new Queue<Action>();
        readonly Toive[] toiveet = new Toive[5];

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

        /// <summary>Maiseman kierros lähestyy loppua (duration − 2,6 s): uusi kierros ristiin kohdasta #alku.</summary>
        public void SilmukkaVaihtuu() => Tee(() =>
        {
            var oma = nykyinen;
            var a = oma?.Audio;
            if (a == null || !a.Soinut) return;
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
        public void Nayte(bool soi, double kerroin = AaniVakiot.VaistoNayte) => Tee(() => SaadaVaistoa(soi ? kerroin : 1));

        /// <summary>Kysymys auki/kiinni (web startQuizMusic/stopQuizMusic).</summary>
        public void Visa(bool auki) => Tee(() =>
        {
            VisaAuki = auki;
            if (auki) AloitaVisa(); else LopetaVisa();
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
        public void LinssiPito(bool paalla) => Tee(() =>
        {
            if (paalla == pito) return;
            if (paalla)
            {
                pito = true;
                LopetaPohja();
                Hiljenna(AaniVakiot.LinssinHiljennys);
                LopetaMaisema();
            }
            else
            {
                pito = false;
                Palauta(AaniVakiot.LinssinHiljennys);
                SoitaPaikka();
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

        double LinssinVaimennus(MaisemaOma oma, double k) =>
            oma.Linssi && hiljennykset.Contains(AaniVakiot.LinssinHiljennys) ? pyydetty : k;

        /// <summary>Musiikki-kytkin (web kaannaMusiikki).</summary>
        public void MusiikkiPaalle(bool paalla) => Tee(() =>
        {
            if (paalla != Musiikki) { Musiikki = paalla; MusiikkitilaMuuttui(); }
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
            }
        });

        /// <summary>Paljastuskortti näkyy (laattatyyppi; web soitaAarreMusiikki). Tyhjä tai tuntematon = ei aihetta.</summary>
        public void AarrePaljastui(string tyyppi) => Tee(() =>
        {
            var aihe = t.Aarreaihe(tyyppi);
            if (aihe != null) SoitaAarre(aihe);
        });

        /// <summary>Aarreaihe soi loppuun (ended).</summary>
        public void AarreLoppui() => Tee(() =>
        {
            var a = aarre;
            if (a == null) return;
            a.Tauko = true; // ended → paused
            Kuole(a);
            AarreOhi(a);
        });

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
        public void UusiMatka() => Tee(() =>
        {
            LopetaMaisema(); LopetaVisaSoitin(); LopetaPohja(); LopetaSiirtyma();
            VisaAuki = false;
        });

        // --- tapahtuman runko -----------------------------------------------------

        void Tee(Action teko)
        {
            tapahtuma++;
            for (int i = 0; i < pois.Length; i++) pois[i] = null;
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
                w.Uusi = s != null && s.SyntyiT == tapahtuma;
                w.PoisMs = pois[i];
                w.Tauko = s?.Tauko ?? false;
                w.Alku = s?.Alku ?? 0;
                w.Silmukka = s?.Silmukka ?? false;
            }
        }

        Soitin Soiva(Kanava k) => k switch
        {
            Kanava.Pohja => pohja,
            Kanava.Maisema => nykyinen?.Audio,
            Kanava.Visa => visa,
            Kanava.Siirtyma => siirtyma,
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

        void Aseta(Soitin s, double arvo) { s.Taso = arvo; s.MuutosT = tapahtuma; s.MuutosMs = 0; }

        void Ramppi(Soitin s, double kohde, int kesto)
        {
            s.Taso = Math.Max(0, kohde);
            s.MuutosT = tapahtuma;
            s.MuutosMs = kesto;
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
        }

        // --- tasot ----------------------------------------------------------------

        double PohjaTaso(double kerroin) =>
            AaniVakiot.MusiikinPerustaso * kerroin * MusiikinKerroin * (AvausKaynnissa ? AaniVakiot.AvauksenMusiikki : 1);

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
            if (pito) LopetaPohja();
        }

        // --- pohjaraita -----------------------------------------------------------

        void KaynnistaPohja(string cityId, string maa)
        {
            musiikinPaikka = cityId;
            musiikinMaa = maa;
            if (!Aanimaisema || !Musiikki || pito) { LopetaPohja(); return; }
            var polku = Musiikkivalitsin.Valitse(valitsin.Ketju(tilat, cityId, maa), puuttuvat);
            if (polku == null || (pohja != null && pohjaPolku == polku)) return;
            var vaistyva = pohja;
            pohja = null;
            pohjaPolku = null;
            if (vaistyva != null) { Ramppi(vaistyva, 0, AaniVakiot.PohjaVaihtoMs); Vapauta(vaistyva); }
            var s = Uusi(Kanava.Pohja, AaniOsoite.Url(polku), true);
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

        void LopetaPohja()
        {
            var vanha = pohja;
            pohja = null;
            pohjaPolku = null;
            if (vanha == null) return;
            Ramppi(vanha, 0, AaniVakiot.HaivytysMs);
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
                CityId = cityId, Url = url, Osoite = jako.Url, Alku = jako.Alku,
                Vaimennus = Voimassa,
                Tavoite = AaniVakiot.MaisemanVoima * jako.Voima * paikanVoima,
                ArvoAlku = !t.Vakiopaikat.Contains(cityId),
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

        void LopetaMaisema()
        {
            var vanha = nykyinen;
            nykyinen = null;
            if (vanha == null) return;
            if (vanha.Vaistyva != null) { Ramppi(vanha.Vaistyva, 0, AaniVakiot.HaivytysMs); Vapauta(vanha.Vaistyva); }
            Ramppi(vanha.Audio, 0, AaniVakiot.HaivytysMs);
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

        void AloitaVisa()
        {
            SaadaVaistoa(AaniVakiot.VaistoVisa);
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

        void LopetaVisa() => LopetaVisaSoitin();

        void LopetaVisaSoitin()
        {
            SaadaVaistoa(1);
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
            if (raita == null || !Aanimaisema || !Musiikki || puuttuvatLajit.Contains(laji)) return;
            if (siirtyma != null && siirtymaLaji == laji) return;
            if (siirtyma != null) LopetaSiirtyma();
            ajonHimmennys = 1;
            var s = Uusi(Kanava.Siirtyma, raita.Ampari, true);
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
            foreach (var s in new[] { oma?.Vaistyva, visa, pohja })
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
            foreach (var s in new[] { oma?.Vaistyva, visa, pohja })
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
