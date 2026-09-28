// ASTRONAUTIN KAMERA (web js/linssit/satelliitti.js, satelliitti-avaruus.js).
//
// Maa avaruudesta: pelin kartan pinnat pois, reliefi vaimeana pohjana, tähdet,
// pilvikuori, ISS radallaan ja 64 vihreää havaintopistettä. Napautus avaa
// astronautin valokuvan (Natiivi-UI). Kaikki kuvat ovat NASAn arkistokuvia.
//
// Avaus kuten webissä: musta ruutu otsikkokortteineen, kunnes pallon laatat ovat
// ruudulla (3 valmista kehystä, vähintään 1800 ms, katto 12 s); sitten otsikko
// häipyy (700 ms), musta häipyy (1100 ms) ja kamera laskeutuu 5 s:ssa
// avauskorkeudesta lepokorkeuteen (0,72 ×) kuutiollisella ease-in-outilla.
//
// Korkeudet: web mittaa pallon säteinä. Natiivissa avauskorkeus on
// ILinssiYmparisto.KokoPallonKorkeus (sama 0,92-täyttö kuin webin marginaali
// 0,08), ja suhteet (lepo 0,72, nimet 0,25/0,29, pilvet, sumu) lasketaan siitä.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Astronautti
{
    /// <summary>Avausvaihe (web luoPaljastus: musta → otsikko-pois → musta-pois → pois).</summary>
    public enum AvauksenVaihe { Musta, OtsikkoPois, MustaPois, Pois }

    /// <summary>Astronautin kameran näkyvät osat (Unity-kerrokset ja Natiivi-UI).</summary>
    public interface IAstronautinNakyma
    {
        void Avaus(AvauksenVaihe vaihe);
        void Kohteet(IReadOnlyList<Havaintokohde> kohteet);
        void Nimet(bool nakyvissa);
        void Pilvet(double peitto, double kiertoAsteina);
        void Sumu(double peitto);
        void Tahdet(double peitto);
        void Iss(LatLon paikka, IReadOnlyList<LatLon> kaari);
        void Kuva(Havaintokohde kohde, int indeksi);
        void KuvaPois();
        void Pois();
        /// <summary>
        /// ISS:n kyyti (Iss.IssKyyti): tila, johon ollaan menossa, tietorivin arvot (korkeus km, nopeus km/h, rata-arvio
        /// ilman tuoretta TLE:tä) ja simuloitu aika (nopeutus, kelaus, ylilennon rivi). Kutsutaan tilan, nopeuden tai
        /// ylilennon vaihtuessa ja kyydissä kerran sekunnissa (nopeutettuna 4 kertaa sekunnissa).
        /// </summary>
        void Kyyti(Iss.KyydinTila tila, double korkeusKm, double nopeusKmh, bool arvio, Iss.KyydinAika aika);
    }

    public sealed class AstronauttiLinssi : ILinssi
    {
        /// <summary>Sulun paluuajo (s) pelaajan näkymään: avauskorkeudesta alas, joten pidempi kuin topografian 0,9 s.</summary>
        public const float PaluuAjoS = 1.6f;

        public const string Kerros = "astronautti";
        /// <summary>
        /// Linssin taustaääni (ILinssiYmparisto.Taustaaani; web js/linssit/satelliitti-aani.js ASTRONAUTIN_HUMINA): aseman
        /// humina 84 s, −30,48 LUFS. Taustaääni, ei musiikkia (Äänimaisema-kytkin ja taustaäänten säädin, omistaja 20.9.);
        /// osoite, voima 0,45 ja nousu 2 s ovat Pelikoodarin taulussa (Aanisoitin.LinssiTaustat). Musiikki on pidossa.
        /// </summary>
        public const string Humina = "astro-humina";
        public const double MaanSade = 6_371_000;
        public const double PaljastuksenMinimiMs = 1800, PaljastuksenKattoMs = 12000;
        public const int PaljastuksenKehykset = 3;
        public const double OtsikonHaivytysMs = 700, MustanHaivytysMs = 1100;

        /// <summary>
        /// Reliefin kylläisyys astronautin kamerassa: webissä 0,8 (satelliitti-avaruus.js
        /// RELIEFIN_SATURAATIO, canvas saturate). Natiivi valitsee sarjan, koska Cesiumin
        /// rasterikerroksella ei ole kylläisyyssäätöä: 1,0 = Topografia.ReliefiSarja,
        /// 0,8 = VaimeaSarja (Karttasepän polttama saturate(0.8) -versio). Oletus on webin 0,8
        /// (Fable 23.9. klo 22.4x: webin nykytila on oletus); täysväri vain KOKEET-kytkimellä.
        /// </summary>
        public const double WebinKyllaisyys = 0.8;
        public static double Kyllaisyys = WebinKyllaisyys;

        /// <summary>
        /// saturate(0.8) -reliefisarja (Karttaseppä 23.9.2026: sRGB-arvoihin ennen jpg-pakkausta,
        /// muuten sama kuin Topografia.ReliefiSarja; laatat.json "kyllaisyys": 0.8).
        /// null = täysvärinen.
        /// </summary>
        public static string VaimeaSarja =
            "https://media.matkakirja.app/matkakirja/reliefipyramidi/20260924/pallo-k08/{z}/{x}/{y}.jpg";

        /// <summary>Kytkimen mukainen sarja; vaimea vain, jos se on olemassa.</summary>
        public static string ReliefinSarja() =>
            Kyllaisyys < 0.95 && !string.IsNullOrEmpty(VaimeaSarja) ? VaimeaSarja : Topografia.ReliefiSarja;

        public static readonly LinssiTiedot AstronauttiTiedot = new LinssiTiedot
        {
            Id = "satelliitti",
            Nimi = "Astronautin kamera",
            Lyhyt = "Maa avaruudesta: astronauttien valokuvat kiertoradalta.",
            Jarjestys = 27,
            Valokuva = true,
        };

        readonly AstronauttiAineisto aineisto;
        readonly IAstronautinNakyma nakyma;
        ILinssiYmparisto y;
        Nakyma talteen;
        double avattu, vaiheAlkoi, avaus;
        int valmiitaKehyksia;
        bool zoomi, nimet;

        public AvauksenVaihe Vaihe { get; private set; }
        public Havaintokohde AvoinKuva { get; private set; }
        public LinssiTiedot Tiedot { get; }
        public bool Auki { get; private set; }

        public AstronauttiLinssi(AstronauttiAineisto aineisto, IAstronautinNakyma nakyma, LinssiTiedot tiedot = null)
        {
            this.aineisto = aineisto;
            this.nakyma = nakyma;
            Tiedot = tiedot ?? AstronauttiTiedot;
            if (tiedot == null && aineisto?.Lahde != null) Tiedot.Lahde = aineisto.Lahde;
        }

        double Nyt => y.Aika * 1000;

        /// <summary>Kameran korkeus avauskorkeuden osuutena (webin s = korkeus / avaus).</summary>
        public double Suhde => avaus > 0 ? y.Kamera.Korkeus / avaus : 1;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            y = ymparisto;
            Auki = true;
            talteen = y.Kamera;
            avattu = Nyt;
            valmiitaKehyksia = 0;
            zoomi = false;
            nimet = false;
            AvoinKuva = null;
            avaus = y.KokoPallonKorkeus;

            Vaihe = AvauksenVaihe.Musta;
            vaiheAlkoi = Nyt;
            nakyma.Avaus(Vaihe);
            y.Pelikerrokset(false);
            foreach (var k in new[] { "reitit", "napakannet" }) y.Kerrokset.Nakyvyys(k, false);
            y.Kerrokset.LisaaRasteri(Kerros, new Rasteri
            {
                Url = ReliefinSarja(), Projektio = Projektio.WebMercator,
                MinTaso = 0, MaxTaso = Topografia.ReliefiMaxTaso, Alfa = 1f,
            });
            y.Kerrokset.Nakyvyys(Topografia.Pohja, false);
            y.MusiikkiPitoon(true);
            // Oma ääni vasta muiden vaientamisen jälkeen (web satelliitti.js: linssiaani-vaihe aanet-vaiheen jälkeen).
            y.Taustaaani(Humina);
            // Pimeässä kamera avauskorkeuteen saman paikan yllä (lat rajattu ±55°, ettei napa jää keskelle).
            y.AjaKamera(new Nakyma(Math.Max(-55, Math.Min(55, talteen.Lat)), talteen.Lon, avaus), 0f);
            y.ZoomiKatto(avaus * Astronauttimatikka.ZoominKauin);
            nakyma.Kohteet(aineisto.Kohteet);
            nakyma.Tahdet(1);
        }

        public void Paivita()
        {
            if (!Auki) return;
            double nyt = Nyt;
            PaivitaAvaus(nyt);
            double s = Suhde;
            bool uudet = Astronauttimatikka.NimetNakyvat(s, 1, nimet);
            if (uudet != nimet) { nimet = uudet; nakyma.Nimet(nimet); }
            double t = (nyt - avattu) / 1000;
            nakyma.Pilvet(Astronauttimatikka.PilvienPeitto(s, 1), t / 60 * Astronauttimatikka.PilvienKiertoAstettaMin);
            nakyma.Sumu(Astronauttimatikka.SumunPeitto(s, 1));
            // ISS-linssi (omistaja 14.4x): todellinen paikka UTC-kellosta (SGP4, tai havainnollinen rata ilman TLE:tä) ja
            // maajälki puoli kierrosta taakse ja eteen, laskettuna IssNyt.KaarenValiS:n välein.
            var utc = Iss.IssNyt.Kello();
            if (!kaariLaskettu.HasValue || kaarenVersio != Iss.IssNyt.Versio
                || Math.Abs((utc - kaariLaskettu.Value).TotalSeconds) >= Iss.IssNyt.KaarenValiS)
            {
                Iss.IssNyt.Kaari(utc, kaari);
                kaariLaskettu = utc;
                kaarenVersio = Iss.IssNyt.Versio;
            }
            var paikka = Iss.IssNyt.Paikka(utc);
            nakyma.Iss(paikka, kaari);
            PaivitaKyyti(nyt / 1000, utc, paikka);
        }

        // ---- ISS:n kyyti (omistajan kysymys 27.9.2026 klo 23.5x, suositus docs/raportit/iss-kyyti-suositus-20260928.md) ----

        readonly Iss.IssKyyti kyyti = new Iss.IssKyyti();
        double kentta0 = double.NaN, tietoAika = -1;
        Iss.KyydinTila ilmoitettu = Iss.KyydinTila.Kauko;
        bool kuvataan, ilmoitettuLive = true;

        public Iss.KyydinTila Kyyti => kyyti.Tila;
        public bool Kyydissa => kyyti.Kyydissa;

        Iss.IssHetki Hetki(DateTime utc, LatLon paikka) =>
            new Iss.IssHetki(paikka, Iss.IssNyt.KorkeusKm(utc) * 1000, Iss.IssNyt.Suuntima(utc));

        /// <summary>
        /// ISS:ää napautettiin (AstronauttiKerros, 44 pt): kauko → seuranta → ikkuna → seuranta (kohteen yltä seurantaan).
        /// Ei avauksen aikana eikä kuvan ollessa auki.
        /// </summary>
        public void NapautaIss()
        {
            if (!Auki || Vaihe == AvauksenVaihe.Musta || AvoinKuva != null) return;
            var utc = Iss.IssNyt.Kello();
            if (!kyyti.Kyydissa) kentta0 = y.Nakokulma;
            kyyti.Napauta(Nykyinen(), Hetki(utc, Iss.IssNyt.Paikka(utc)), y.Nakokulma, Nyt / 1000, y.VahennettyLiike);
            tietoAika = -1;
        }

        /// <summary>
        /// Siirtymän lähtöasento: kyydissä kyydin oma viimeisin asento (web viimeisin; pelikameran näkymä ei kerro
        /// katsekorkeutta, joten seurannasta lähtenyt siirtymä alkoi 420 km liian matalalta), muuten pelaajan kamera.
        /// </summary>
        Kuvakulma Nykyinen()
        {
            if (kyyti.Kyydissa && kyyti.OnAsento) return kyyti.Viimeisin;
            var k = y.Kamera;
            return Iss.IssKuvakulma.Kauko(k.Lat, k.Lon, k.Korkeus, k.Kallistus, y.Suuntima);
        }

        /// <summary>✕ kyydissä: paluu kaukonäkymään ISS:n alapisteen ylle lepokorkeudelle; aika palaa LIVE:ksi paluulennon aikana.</summary>
        public void PoistuKyydista()
        {
            if (!Auki || !kyyti.Kyydissa || kyyti.Tila == Iss.KyydinTila.Kauko) return;
            // Web poistu: ylilento unohtuu ja aika kelautuu todelliseen hetkeen paluulennon ajassa (ei hyppyä).
            lento = null;
            Iss.IssNyt.Simu.PalaaLive(Iss.IssKyyti.KaukoonS, y.VahennettyLiike);
            kyyti.Poistu(avaus * Iss.IssKyyti.PaluuKorkeus, Nyt / 1000, y.VahennettyLiike);
            tietoAika = -1;
        }

        void PaivitaKyyti(double nyt, DateTime utc, LatLon paikka)
        {
            if (!kyyti.Kyydissa) return;
            // Ylilento perillä (kelaus ajettu loppuun): kamera kääntyy kohteeseen pitkällä objektiivilla. Jos kelaus keskeytyi
            // muualta (testikello), ylilento unohtuu, ettei rivi jää laskemaan aikaa ohitukseen, jota ei tule.
            var l = lento;
            if (l != null && l.Ylilento.HasValue && !l.Perilla && l.Id != 0 && kyyti.Tila != Iss.KyydinTila.Kauko)
            {
                if (Iss.IssNyt.Simu.ValmisId == l.Id)
                {
                    l.Perilla = true;
                    kyyti.Kohteeseen(new LatLon(l.Kohde.Lat, l.Kohde.Lon), Nykyinen(), y.Nakokulma, nyt, y.VahennettyLiike);
                    tietoAika = -1;
                }
                else if (Iss.IssNyt.Simu.KelausId != l.Id) { lento = null; tietoAika = -1; }
            }
            double perus = double.IsNaN(kentta0) ? y.Nakokulma : kentta0;
            if (!kyyti.Paivita(nyt, Hetki(utc, paikka), perus, out var asento, out double kentta, out bool paluuValmis)) return;
            y.Kuvaa(asento);
            y.Kenttakulma(kentta);
            kuvataan = true;
            if (paluuValmis) { LopetaKyyti(); return; }
            // Tietorivi kerran sekunnissa (nopeutettuna 4 kertaa: kerroin ja ylilennon aika muuttuvat), tilan vaihtuessa ja heti,
            // kun kelaus palaa LIVE:ksi (webissä pilleri jäi sekunniksi kertoimeen).
            var simu = Iss.IssNyt.Simu;
            bool live = simu.Live;
            if (ilmoitettu != kyyti.Tila || live != ilmoitettuLive || nyt - tietoAika >= (live ? 1 : 0.25) || tietoAika < 0)
            {
                ilmoitettu = kyyti.Tila;
                ilmoitettuLive = live;
                tietoAika = nyt;
                double h = Iss.IssNyt.KorkeusKm(utc);
                nakyma.Kyyti(kyyti.Tila, h, Iss.IssNyt.NopeusKmh(h), Iss.IssNyt.Laatu(utc) != Iss.RadanLaatu.Tarkka,
                    Iss.KyydinAika.Kellosta(simu, YlilennonRivi()));
            }
        }

        void LopetaKyyti()
        {
            kyyti.Nollaa();
            if (kuvataan)
            {
                kuvataan = false;
                y.KuvausLoppui();
                y.Kenttakulma(null);
            }
            kentta0 = double.NaN;
            if (ilmoitettu == Iss.KyydinTila.Kauko) return;
            ilmoitettu = Iss.KyydinTila.Kauko;
            nakyma.Kyyti(Iss.KyydinTila.Kauko, 0, 0, false, default);
        }

        // ---- Nopeutus ja "Lennä kohteen ylle" (omistaja 28.9.2026 klo 12.1x; web iss-kyyti-nakyma.js asetaNopeus ja
        // lennaKohteeseen, commit 891958e17). Aika on IssNyt.Simu, jota kaikki kerrokset lukevat IssNyt.Kellon kautta. ----

        sealed class Lento
        {
            public Havaintokohde Kohde;
            /// <summary>null = ei ylilentoa hakuajan sisällä (rivi kertoo sen).</summary>
            public Iss.Ylilento? Ylilento;
            public int Id;
            public bool Perilla;
        }

        Lento lento;
        List<Havaintokohde> ylilennonKohteet;
        List<Havaintokohde> Ylikohteet => ylilennonKohteet ??= Iss.Ylilennot.Kohteet(aineisto?.Kohteet);

        /// <summary>"Lennä kohteen ylle" -valikon kohteet: Euroopan NASA-kohteet nimen mukaan (web ylilennonKohteet).</summary>
        public IReadOnlyList<Havaintokohde> YlilennonKohteet => Ylikohteet;

        /// <summary>Viimeisin ylilento: kohde, hetki (null = ei ylilentoa) ja onko perillä (testikomento astro kyyti tila).</summary>
        public (Havaintokohde Kohde, Iss.Ylilento? Hetki, bool Perilla)? ViimeisinLento =>
            lento == null ? ((Havaintokohde, Iss.Ylilento?, bool)?)null : (lento.Kohde, lento.Ylilento, lento.Perilla);

        /// <summary>Nopeutus (web asetaNopeus): 1 = Palaa LIVE (pehmeä kelaus todelliseen hetkeen), 10, 100 tai 1000. Ylilento unohtuu.</summary>
        public bool AsetaNopeus(int kerroin)
        {
            if (!Auki || Array.IndexOf(Iss.Simukello.Nopeudet, kerroin) < 0) return false;
            lento = null;
            Iss.IssNyt.Simu.AsetaNopeus(kerroin, y.VahennettyLiike);
            tietoAika = -1;
            return true;
        }

        /// <summary>
        /// "Lennä kohteen ylle" (web lennaKohteeseen): SGP4:llä seuraava todellinen ylilento, kellonaika näkyviin ja kelaus sinne
        /// (kiihdytys noin 1000×:iin, hidastus 1×:iin); maa pyörii alla, ei teleporttia. Kamera seuraa ISS:ää kelauksen ajan
        /// (ikkunasta ja kohteen yltä ensin seurantaan) ja kääntyy perillä kohteeseen. Vain kyydissä. null = ei kyydissä,
        /// tuntematon kohde tai ei ylilentoa 48 tunnin sisällä (rivi kertoo sen).
        /// </summary>
        public Iss.Ylilento? LennaKohteeseen(string tunnus, bool valoisa = false)
        {
            if (!Auki) return null;
            return Lenna(Ylikohteet.Find(x => x.Tunnus == tunnus), valoisa);
        }

        /// <summary>Oman sijainnin tunnus "Lennä kohteen ylle" -rivillä ja testikomennoissa.</summary>
        public const string OmaSijaintiTunnus = "oma-sijainti";

        /// <summary>
        /// "Oma sijainti" (omistaja 28.9. TF 1.0.39: "Lisää myös mahdollisuus mennä käyttäjän sijainnin kohdalle"): kuten
        /// LennaKohteeseen, mutta paikka annetaan (karkea sijainti ilman lupakyselyä: maan keskipiste, Unity-puolen OmaSijainti).
        /// </summary>
        public Iss.Ylilento? LennaPaikkaan(string nimi, double lat, double lon, bool valoisa = false)
        {
            if (!Auki) return null;
            return Lenna(new Havaintokohde { Tunnus = OmaSijaintiTunnus, Nimi = nimi, Lat = lat, Lon = lon }, valoisa);
        }

        Iss.Ylilento? Lenna(Havaintokohde k, bool valoisa)
        {
            if (k == null || !kyyti.Kyydissa || kyyti.Tila == Iss.KyydinTila.Kauko) return null;
            var yl = Iss.Ylilennot.Seuraava(k.Lat, k.Lon, Iss.IssNyt.Kello(), valoisa: valoisa);
            tietoAika = -1;
            if (yl == null) { lento = new Lento { Kohde = k }; return null; }
            if (kyyti.Tila != Iss.KyydinTila.Seuranta) NapautaIss();
            var uusi = new Lento { Kohde = k, Ylilento = yl };
            lento = uusi;
            uusi.Id = Iss.IssNyt.Simu.KelaaHetkeen(yl.Value.Hetki, vahennetty: y.VahennettyLiike);
            return yl;
        }

        /// <summary>Ylilennon rivi pillerin alle (web ylilentoRivi) tai null.</summary>
        public string YlilennonRivi()
        {
            var l = lento;
            if (l == null) return null;
            if (!l.Ylilento.HasValue) return $"{l.Kohde.Nimi}: ei ylilentoa {Iss.Ylilennot.HakuH:0} tunnin sisällä";
            var yl = l.Ylilento.Value;
            return l.Perilla
                ? $"{l.Kohde.Nimi}: ISS {Iss.KyydinTeksti.Luku(yl.SivuttainKm)} km sivussa"
                : $"{l.Kohde.Nimi} · {Iss.KyydinTeksti.YlilennonTeksti(yl.Hetki, Iss.IssNyt.Kello())}";
        }

        readonly LatLon[] kaari = new LatLon[Astronauttimatikka.IssKaarenPisteita + 1];
        DateTime? kaariLaskettu;
        int kaarenVersio = -1;

        void PaivitaAvaus(double nyt)
        {
            switch (Vaihe)
            {
                case AvauksenVaihe.Musta:
                    var tila = y.Kerrokset.Tila(Kerros);
                    valmiitaKehyksia = tila == KerrosTila.Valmis ? valmiitaKehyksia + 1 : 0;
                    bool valmis = valmiitaKehyksia >= PaljastuksenKehykset
                        && (y.VahennettyLiike || nyt - avattu >= PaljastuksenMinimiMs);
                    if (valmis || tila == KerrosTila.Luovutti || nyt - avattu >= PaljastuksenKattoMs) Paljasta(nyt);
                    break;
                case AvauksenVaihe.OtsikkoPois when nyt - vaiheAlkoi >= OtsikonHaivytysMs:
                    Siirry(AvauksenVaihe.MustaPois, nyt);
                    break;
                case AvauksenVaihe.MustaPois when nyt - vaiheAlkoi >= MustanHaivytysMs + 50:
                    Siirry(AvauksenVaihe.Pois, nyt);
                    break;
            }
        }

        void Paljasta(double nyt)
        {
            Siirry(y.VahennettyLiike ? AvauksenVaihe.Pois : AvauksenVaihe.OtsikkoPois, nyt);
            if (zoomi) return;
            zoomi = true;
            // Avauszoomi alkaa paljastuksesta (web: ei kulje, kun paljastus odottaa).
            var k = y.Kamera;
            y.AjaKamera(new Nakyma(k.Lat, k.Lon, avaus * Astronauttimatikka.AvausajonLoppu),
                y.VahennettyLiike ? 0f : (float)(Astronauttimatikka.AvauszoominKestoMs / 1000),
                Astronauttimatikka.AvausPehmennys);
        }

        void Siirry(AvauksenVaihe v, double nyt)
        {
            Vaihe = v;
            vaiheAlkoi = nyt;
            nakyma.Avaus(v);
        }

        /// <summary>Havaintopistettä napautettiin (Unity-kerroksen osumatesti, 44 px).</summary>
        public void Napauta(string tunnus)
        {
            if (!Auki || Vaihe == AvauksenVaihe.Musta || kyyti.Kyydissa) return;
            var kohde = aineisto.Kohteet.Find(k => k.Tunnus == tunnus);
            if (kohde == null) return;
            AvaaKohde(kohde, kohde.OletusIndeksi);
        }

        // ---- Kuvaselain (omistajan toive 27.9.2026 klo 23.5x, Linssisepän suositus docs/raportit/astronautin-kuvaselain-20260928.md) ----

        /// <summary>Kameran liuku kuvan kohteen ylle (s): kuvan takana himmeänä näkyvä pallo on juuri kuvan kohdalta.</summary>
        public const float KuvaanAjoS = 0.9f;
        /// <summary>Kameran korkeus kuvan takana avauskorkeuden osuutena (enintään): lepokorkeus, jolloin pallon reuna näkyy
        /// pystyruudun ylä- ja alalaidassa kuin ikkunasta.</summary>
        public const double KuvanKorkeus = 0.72;

        int[] kierros;

        /// <summary>
        /// Maailmankierros: aineiston valmis lista (webin SATELLIITTI_KIERROS, sama järjestys molemmissa), muuten lasketaan
        /// kerran ensimmäisellä käytöllä (AstronauttiKierros).
        /// </summary>
        int[] Kierros => kierros ??= AstronauttiKierros.Aineistosta(aineisto.Kierros, aineisto.Kohteet) ?? AstronauttiKierros.Laske(aineisto.Kohteet);

        void AvaaKohde(Havaintokohde kohde, int indeksi)
        {
            AvoinKuva = kohde;
            nakyma.Kuva(kohde, indeksi);
            if (double.IsNaN(kohde.Lat) || double.IsNaN(kohde.Lon)) return;
            // Kamera kohteen ylle nykyisellä korkeudella, kuitenkin enintään lepokorkeudella (pallo täyttää ikkunan).
            double h = Math.Min(y.Kamera.Korkeus, avaus * KuvanKorkeus);
            y.AjaKamera(new Nakyma(kohde.Lat, kohde.Lon, h), y.VahennettyLiike ? 0f : KuvaanAjoS, Matkakirja.Linssit.Kamera.Kamerakayrat.Pehmea);
        }

        /// <summary>Aineiston kohteet (testikomento `astro kuva n`).</summary>
        public List<Havaintokohde> Kohteet => aineisto.Kohteet;

        /// <summary>Maailmankierros tunnuksina (testikomento `astro kierros`).</summary>
        public IEnumerable<string> KierrosTunnukset()
        {
            foreach (int i in Kierros) yield return aineisto.Kohteet[i].Tunnus;
        }

        /// <summary>Naapurikohde maailmankierroksella avatun kuvan kohteesta (null, jos kuva ei ole auki).</summary>
        public Havaintokohde KatsoNaapuri(int suunta)
        {
            if (AvoinKuva == null) return null;
            int i = AstronauttiKierros.Naapuri(Kierros, aineisto.Kohteet.IndexOf(AvoinKuva), suunta);
            return i >= 0 ? aineisto.Kohteet[i] : null;
        }

        /// <summary>
        /// Viereinen kohde kartalla (alanapit ‹ ›: kohteen oletuskuva) tai gallerian jatko kohteen kuvien lopusta
        /// (<paramref name="galleria"/>: eteenpäin ensimmäinen, taaksepäin viimeinen kuva). Kamera liukuu uuden kohteen ylle.
        /// </summary>
        public Havaintokohde Naapuri(int suunta, bool galleria = false)
        {
            if (!Auki || AvoinKuva == null || suunta == 0) return null;
            var k = KatsoNaapuri(suunta);
            if (k == null || ReferenceEquals(k, AvoinKuva)) return null;
            AvaaKohde(k, galleria ? (suunta > 0 ? 0 : k.Havainnot.Count - 1) : k.OletusIndeksi);
            return k;
        }

        public void SuljeKuva()
        {
            if (AvoinKuva == null) return;
            AvoinKuva = null;
            nakyma.KuvaPois();
        }

        public void Sulje()
        {
            if (!Auki) return;
            LopetaKyyti();
            // Web pura: linssi suljetaan, aika heti todelliseksi (testikellon siirto säilyy).
            lento = null;
            Iss.IssNyt.Simu.PalaaLive(vahennetty: true);
            Auki = false;
            SuljeKuva();
            nakyma.Pois();
            y.Kerrokset.Poista(Kerros);
            y.Kerrokset.Nakyvyys(Topografia.Pohja, true);
            foreach (var k in new[] { "reitit", "napakannet" }) y.Kerrokset.Nakyvyys(k, true);
            y.Pelikerrokset(true);
            y.ZoomiKatto(null);
            // Humina häipyy ennen kuin pito vapautuu (web pura: linssin ääni ensin, sitten muut äänet takaisin).
            y.Taustaaani(null);
            y.MusiikkiPitoon(false);
            // Pallo palaa täsmälleen lähtötilaan (web pura()); webissä hyppy, natiivissa pehmeä paluu
            // (Raamattu KAMERA-AJOT, omistaja 24.9.: ei hyppyjä), vähennetyllä liikkeellä heti.
            y.AjaKamera(talteen, y.VahennettyLiike ? 0f : PaluuAjoS, Matkakirja.Linssit.Kamera.Kamerakayrat.Funktio(Matkakirja.Linssit.Kamera.Kayra.Kuminauha, Matkakirja.Linssit.Kamera.Kamerakayrat.PaluunYlitys));
        }
    }
}
