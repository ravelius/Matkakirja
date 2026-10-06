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
        /// <summary>
        /// Kuvanäkymän selitteen luentojen pysyvä säilölohko (web satelliitti.js SELITTEEN_SAILIO, PR #3568): sama lohko kuin
        /// webissä, joten kerran syntetisoitu selite soi molemmilla alustoilla ämpäristä (workerin lohko /^[a-z0-9-]{1,24}$/).
        /// </summary>
        public const string SelitteenSailio = "astro-selite";
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

        // ---- ISS KESKELLÄ, MAA PYÖRII SEN ALLA (web satelliitti-avaruus.js seuranta, Raamattu PAATOKSET 53) ----
        // Omistaja 19.9.2026: "Alussa iss voisi pysyä keskellä ja maapallo pyöriä kunnes pelaaja pysäyttää liikkeen." Avauksesta
        // alkaen (jo mustan aikana) kamera katsoo joka kehys aseman alapistettä, joten ISS pysyy ruudun keskellä ja Maa liukuu
        // sen alla todellisella nopeudella (noin 4° minuutissa). Avauszoomi lasketaan silloin itse joka kehys (web ajaAvaus: vain
        // korkeus, suunta seurannasta). Pelaajan ensimmäinen ote (napautus, veto tai nipistys), kuvan avaus ja kyyti päättävät
        // seurannan; sen jälkeen ohjaus on tavallinen. Vähennetyllä liikkeellä ei seurantaa (web !reduced).
        bool seuranta;
        double ajoAlku = double.NaN, ajoAlkuH, ajoLoppuH;
        /// <summary>Seurannan korkeus: avauskorkeus, zoomin aikana käyrältä ja sen jälkeen lepokorkeus (pelaajan nipistys päättää
        /// seurannan, joten korkeutta ei tarvitse lukea kamerasta).</summary>
        double seurantaH;

        /// <summary>Seuraako kamera asemaa (web tila().issSeuranta; testikomento `astro tila`).</summary>
        public bool IssSeuranta => seuranta;

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
            kavely = new Iss.Avaruuskavely();
            kavely.Vaihtui += KavelyVaihtui;
            kyyti.UlkonaSuunta = () => Iss.Avaruuskavely.KohtiAurinkoa ? Iss.Avaruuskavely.AuringonSuunta(Iss.IssNyt.Kello()) : (double?)null;
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
            seuranta = !y.VahennettyLiike;
            ajoAlku = double.NaN;
            seurantaH = avaus;

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
            // Pimeässä kamera avauskorkeuteen: seurannassa aseman ylle, muuten saman paikan ylle (lat rajattu ±55°, ettei napa
            // jää keskelle).
            if (seuranta)
            {
                var iss = Iss.IssNyt.Paikka(Iss.IssNyt.Kello());
                y.AjaKamera(new Nakyma(iss.Lat, iss.Lon, avaus), 0f);
            }
            else y.AjaKamera(new Nakyma(Math.Max(-55, Math.Min(55, talteen.Lat)), talteen.Lon, avaus), 0f);
            // Zoomikaista (web zoomirajat: säteinä max(0,1; 0,084 × avaus) … 1,3 × avaus): lähin noin 820–2 200 km, kaukaisin koko
            // pallon taakse.
            var kaista = Astronauttimatikka.Zoomirajat(avaus / MaanSade);
            y.ZoomiKatto(kaista.max * MaanSade, kaista.min * MaanSade);
            nakyma.Kohteet(aineisto.Kohteet);
            nakyma.Tahdet(1);
        }

        public void Paivita()
        {
            if (!Auki) return;
            PaivitaSuhina();
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
            // Kyyti kirjoittaa kameran ensin; seuranta vain kyydin ulkopuolella (web askel: if (!kyydissa) seuraaAsemaa()).
            if (seuranta && !kyyti.Kyydissa) SeuraaAsemaa(nyt, paikka);
        }

        /// <summary>Yksi seurannan kehys: kamera aseman alapisteen ylle seurannan korkeudella (web seuraaAsemaa).</summary>
        void SeuraaAsemaa(double nyt, LatLon paikka)
        {
            if (double.IsNaN(paikka.Lat) || double.IsNaN(paikka.Lon)) return;
            if (!double.IsNaN(ajoAlku))
            {
                double osuus = Math.Min(1, (nyt - ajoAlku) / Astronauttimatikka.AvauszoominKestoMs);
                seurantaH = ajoAlkuH + (ajoLoppuH - ajoAlkuH) * Astronauttimatikka.AvausPehmennys(osuus);
                if (osuus >= 1) ajoAlku = double.NaN;
            }
            y.AjaKamera(new Nakyma(paikka.Lat, paikka.Lon, seurantaH), 0f);
        }

        /// <summary>
        /// Seuranta päättyy (web lopetaSeuranta + paataAvausajo): kamera jää siihen, missä se on, myös kesken avauszoomin.
        /// </summary>
        void LopetaSeuranta()
        {
            seuranta = false;
            ajoAlku = double.NaN;
        }

        /// <summary>
        /// Pelaajan ote palloon (PalloKierto.PelaajanEle ja pallon napautus; web otePalloon): seuranta päättyy. Mustan aikana
        /// ote ei vielä päätä sitä (pelaaja ei näe palloa).
        /// </summary>
        public void PelaajanEle()
        {
            if (!Auki || Vaihe == AvauksenVaihe.Musta) return;
            LopetaSeuranta();
        }

        // ---- ISS:n kyyti (omistajan kysymys 27.9.2026 klo 23.5x, suositus docs/raportit/iss-kyyti-suositus-20260928.md) ----

        readonly Iss.IssKyyti kyyti = new Iss.IssKyyti();
        /// <summary>Cupolan alus todellisen radan kierrettynä kopiona (kohteen valinta, Iss.AlusSiirto); nollautuu kyydistä poistuttaessa.</summary>
        readonly Iss.AlusSiirto siirto = new Iss.AlusSiirto();

        /// <summary>
        /// CUPOLA AVAUTUU SUORAAN (omistaja 4.10.2026 klo 11.5x: "kun cupola näkymä avautuu, kartta ei saa lentää sinne ... cupolan
        /// näkymä voisi avautua vaikka mustan näkymän kautta jossa lukee ISS ja lentokorkeus ja sitten feidaa oikeaan näkymään 2sek
        /// jälkeen"; lisäksi nopeus sekä päivämäärä ja kellonaika): kaukonäkymästä Cupolaan kamera asettuu heti oikeaan asentoon ja
        /// UI näyttää mustan ruudun (ISS, lentokorkeus, nopeus, linssin aika) 2 s ja häivyttää sen. Tapahtuma kertoo arvot.
        /// </summary>
        public static event Action<CupolanAvaus> CupolaAvautuu;
        public readonly struct CupolanAvaus
        {
            public readonly double KorkeusKm, NopeusKmh; public readonly DateTime Utc;
            public CupolanAvaus(double korkeusKm, double nopeusKmh, DateTime utc) { KorkeusKm = korkeusKm; NopeusKmh = nopeusKmh; Utc = utc; }
        }
        double kentta0 = double.NaN, tietoAika = -1;
        Iss.KyydinTila ilmoitettu = Iss.KyydinTila.Kauko;
        bool kuvataan, ilmoitettuLive = true;

        public Iss.KyydinTila Kyyti => kyyti.Tila;
        public bool Kyydissa => kyyti.Kyydissa;

        /// <summary>Cupolan katse vetämällä lasista (omistaja 3.10.2026; Unity CupolaVeto syöttää eleen, IssKyyti käyttää).</summary>
        public Iss.IssKatse CupolanKatse => kyyti.Katse;

        /// <summary>Kyydin siirtymä kesken (Pulun taulun askelkone odottaa sen loppuun, web kyytiMoodi siirtyy).</summary>
        public bool KyytiSiirtyy => kyyti.Siirtyy;

        /// <summary>Kameran katsekohde (web aloitustila().pov): Pulun taulun kuvamoodi avaa sitä lähimmän kohteen.</summary>
        public (double Lat, double Lon) Katse => y == null ? (double.NaN, double.NaN) : (y.Kamera.Lat, y.Kamera.Lon);

        Iss.IssHetki Hetki(DateTime utc, LatLon paikka) =>
            new Iss.IssHetki(paikka, Iss.IssNyt.KorkeusKm(utc) * 1000, Iss.IssNyt.Suuntima(utc));

        /// <summary>Kyydin viimeisin kamera-asento (katsepiste, kallistus, suuntima) testeille; Siirretty = alus pois todelliselta radalta.</summary>
        public Kuvakulma KyydinAsento => kyyti.Viimeisin;
        public bool AlusSiirretty => siirto.Siirretty;

        /// <summary>Aluksen nykyinen alapiste siirto mukaan lukien (Natiivi-UI:n kohdevalikko: ≤ 30 lähintä maajälkeä, juna 141).</summary>
        public (double Lat, double Lon) AlusAlapiste()
        {
            var p = AlusHetki(Iss.IssNyt.Kello(), Nyt / 1000).Paikka;
            return (p.Lat, p.Lon);
        }

        /// <summary>Cupolan aluksen hetki: todellinen rata kierrettynä (Iss.AlusSiirto); suunta aluksen omasta liikkeestä.</summary>
        Iss.IssHetki AlusHetki(DateTime utc, double nyt)
        {
            var p = Iss.IssNyt.Paikka(utc);
            if (!siirto.Siirretty) return Hetki(utc, p);
            var a = siirto.Paikka(Iss.IssNyt.Paikka(utc.AddSeconds(-1)), nyt);
            var b = siirto.Paikka(Iss.IssNyt.Paikka(utc.AddSeconds(1)), nyt);
            return new Iss.IssHetki(siirto.Paikka(p, nyt), Iss.IssNyt.KorkeusKm(utc) * 1000, Iss.IssKuvakulma.Suunta(a.Lat, a.Lon, b.Lat, b.Lon));
        }

        /// <summary>
        /// KOHTEEN VALINTA CUPOLASSA (omistaja 4.10. klo 11.5x, korvaa ylilennon kelauksen ja kohteen ylle kääntymisen): alus
        /// siirtyy pehmeästi (Iss.AlusSiirto.SiirtoS) niin, että nykyinen katse (kulma alas ja ilmansuunta) osuu kohteeseen
        /// näkymän keskellä; korkeus on radan. Siirron loppuhetki lasketaan kellon nopeudella, jotta kohde on keskellä perillä.
        /// </summary>
        public bool SiirraAlus(double lat, double lon)
        {
            if (!Auki || !kyyti.Kyydissa || kavely.Kaynnissa) return false;
            if (kyyti.Tila == Iss.KyydinTila.Kohde) NapautaIss();
            if (kyyti.Tila != Iss.KyydinTila.Ikkuna) return false;
            var utc = Iss.IssNyt.Kello();
            double nyt = Nyt / 1000;
            var h = AlusHetki(utc, nyt);
            double alas = kyyti.Katse.AlasNyt(Iss.IssKuvakulma.IkkunanKatse(h.KorkeusM));
            var katse = Iss.IssKuvakulma.Ikkuna(h, alas, kyyti.Katse.Suunta);
            double kaari = Iss.IssKuvakulma.Kaari(h.Paikka.Lat, h.Paikka.Lon, katse.Lat, katse.Lon);
            double kesto = y.VahennettyLiike ? 0 : Iss.AlusSiirto.SiirtoS;
            var loppu = utc.AddSeconds(kesto * Iss.IssNyt.Simu.Nopeus());
            var uusi = Iss.AlusSiirto.Kohteeseen(lat, lon, kaari, kyyti.Katse.Suunta, katse.Suuntima, h.Suuntima);
            siirto.Aseta(Iss.IssNyt.Paikka(loppu), Iss.IssNyt.Suuntima(loppu), uusi.Paikka, uusi.Suunta, nyt, kesto);
            lento = null;
            tietoAika = -1;
            sijaintiAika = -1;
            return true;
        }

        /// <summary>
        /// ISS:ää napautettiin (AstronauttiKerros, 44 pt): kauko → Cupola (kohteen yltä Cupolaan); seuranta vain kehittäjälle
        /// (Iss.IssKyyti.SeurantaKaytossa).
        /// Ei avauksen aikana eikä kuvan ollessa auki.
        /// </summary>
        public void NapautaIss()
        {
            if (!Auki || Vaihe == AvauksenVaihe.Musta || AvoinKuva != null) return;
            if (kavely.Kaynnissa) { kavely.Napauta(Nyt / 1000); return; }
            // Kyyti ottaa kameran: seuranta ja avauszoomi päättyvät (web ennenKyytia).
            LopetaSeuranta();
            var utc = Iss.IssNyt.Kello();
            if (!kyyti.Kyydissa) kentta0 = y.Nakokulma;
            bool kaukaa = !kyyti.Kyydissa;
            kyyti.Napauta(Nykyinen(), AlusHetki(utc, Nyt / 1000), y.Nakokulma, Nyt / 1000, y.VahennettyLiike);
            // Suora avaus: päivänvaloon kelataan heti mustan ruudun aikana (ei näkyvää kelausta häivytyksen jälkeen).
            bool suoraan = kaukaa && kyyti.Tila == Iss.KyydinTila.Ikkuna && Iss.IssKyyti.SuoraAvaus;
            if (kyyti.Tila == Iss.KyydinTila.Ikkuna) PaivanvaloonJosYo(utc, suoraan);
            tietoAika = -1;
            if (suoraan)
            {
                var hetki = Iss.IssNyt.Kello();
                double km = Iss.IssNyt.KorkeusKm(hetki);
                CupolaAvautuu?.Invoke(new CupolanAvaus(km, Iss.IssNyt.NopeusKmh(km), hetki));
            }
        }

        /// <summary>
        /// CUPOLA PÄIVÄNVALOON (arvioijan ensivaikutelma 1.1 (75), Päätoimittaja 30.9.2026: LIVE-hetken yöpuolella ikkunasta näkyi
        /// vain harmaita pilvilaikkuja mustaa vasten): kun Cupola avataan LIVEnä ISS:n ollessa yöpuolella, kello kelaa lähimpään
        /// päivänvaloon (Avaruuskavely.SeuraavaPaivanvalo, ≤ 3,6 s) ja jää 1×:ään: PALAA meripihkana, kilpi PÄIVÄ. LIVE-kytkin
        /// palauttaa todellisen hetken, jolloin yöpuolella lukemassa on rivi "ISS on nyt Maan yöpuolella". A/B `astro kyyti paiva 0|1`.
        /// </summary>
        public static bool CupolaPaivanvaloon = true;

        /// <summary>
        /// NASA-VERTAILU (fotorealismi, Päätoimittaja 30.9.): kamera Gateway to Astronaut Photography -kuvan tiedoista (nadir,
        /// korkeus, kuvan keskipiste, polttoväli → pystykenttä) ja kello kuvan UTC-hetkeen; null = kyydin oma asento.
        /// </summary>
        public static Kuvakulma? Vertailu;
        public static double VertailuKentta = 27;

        /// <summary>Vertailukamera: silmä nadirin yllä <paramref name="korkeusKm"/>, katse kuvan keskipisteeseen.</summary>
        public static Kuvakulma VertailuKulma(double nadirLat, double nadirLon, double korkeusKm, double lat, double lon) =>
            Iss.IssKuvakulma.KohteenKulma(new Iss.IssHetki(new LatLon(nadirLat, nadirLon), korkeusKm * 1000, 0), lat, lon);
        /// <summary>Kello siirretty päivänvaloon (kilpi PÄIVÄ); päättyy, kun aika palaa LIVE:ksi tai kyydistä poistutaan.</summary>
        public bool PaivanvaloSiirto { get; private set; }
        int paivaKelaus;

        /// <summary>
        /// CUPOLAN ENNAKKO (iPad 75ddd638: kylmä ensiavaus jäi 4 s:n kattoon karkeana, lämpimät 2,1–2,4 s tarkkoina): asento, johon
        /// Cupola avautuisi juuri nyt kaukonäkymästä (NapautaIss → suora avaus, katse nollattu, LIVEnä yöpuolelta päivänvaloon
        /// kelattu hetki). Unity-puoli pitää piirtämättömän ennakkokameran tässä, jotta Cesium lataa näkymän laatat jo ennen
        /// napautusta. false = ei kaukonäkymässä (kyydissä oma kamera lataa, avauksen aikana ei vielä).
        /// </summary>
        /// <param name="sekuntiaEteen">Asento näin monta (reaali)sekuntia myöhemmin radalla (Natiiviseppä juna 140: alus oli siirtynyt
        /// 1° ja uusi esihaku vasta alkanut, kun Cupola avattiin → 4,0 s / 86 %); 0 = nyt.</param>
        public bool CupolanEnnakko(out Kuvakulma asento, double sekuntiaEteen = 0)
        {
            asento = default;
            // Myös linssin avauksen mustan aikana (Natiiviseppä ab-b139: Cupola 2,4 s linssin avauksesta, esihaku 107/892).
            if (!Auki || kyyti.Kyydissa || !Iss.IssKyyti.SuoraAvaus) return false;
            var simu = Iss.IssNyt.Simu;
            var utc = Iss.IssNyt.Kello().AddSeconds(sekuntiaEteen * simu.Nopeus());
            if (CupolaPaivanvaloon && simu.Live && lento == null && Iss.Avaruuskavely.Yopuolella(utc))
                utc = Iss.Avaruuskavely.SeuraavaPaivanvalo(Iss.IssNyt.Paikka, utc) ?? utc;
            asento = Iss.IssKuvakulma.Ikkuna(AlusHetki(utc, Nyt / 1000 + sekuntiaEteen));
            return true;
        }

        void PaivanvaloonJosYo(DateTime utc, bool heti = false)
        {
            var simu = Iss.IssNyt.Simu;
            if (!CupolaPaivanvaloon || !simu.Live || lento != null || !Iss.Avaruuskavely.Yopuolella(utc)) return;
            var hetki = Iss.Avaruuskavely.SeuraavaPaivanvalo(Iss.IssNyt.Paikka, utc);
            if (!hetki.HasValue) return;
            paivaKelaus = simu.KelaaHetkeen(hetki.Value, vahennetty: heti || y.VahennettyLiike);
            PaivanvaloSiirto = true;
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
            kavely.Lopeta(Nyt / 1000);
            // Web poistu: ylilento unohtuu ja aika kelautuu todelliseen hetkeen paluulennon ajassa (ei hyppyä).
            lento = null;
            siirto.Nollaa();
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
                    l.PerillaAika = y.Aika;
                    // Vain oma sijainti (kohde voi olla radan ulottumattomissa); kohteet katsotaan suoraan kuten ennen.
                    var katse = l.Kohde.Tunnus == OmaSijaintiTunnus
                        ? Iss.OmaSijainti.Katsepiste(l.Ylilento.Value.Lat, l.Ylilento.Value.Lon, l.Kohde.Lat, l.Kohde.Lon)
                        : (lat: l.Kohde.Lat, lon: l.Kohde.Lon);
                    kyyti.Kohteeseen(new LatLon(katse.lat, katse.lon), Nykyinen(), y.Nakokulma, nyt, y.VahennettyLiike);
                    tietoAika = -1;
                }
                else if (Iss.IssNyt.Simu.KelausId != l.Id) { lento = null; tietoAika = -1; }
            }
            if (kavely.Kaynnissa) kavely.Paivita(nyt, utc);
            double perus = double.IsNaN(kentta0) ? y.Nakokulma : kentta0;
            kyyti.Katse.Vahennetty = y.VahennettyLiike;
            if (!kyyti.Paivita(nyt, AlusHetki(utc, nyt), perus, out var asento, out double kentta, out bool paluuValmis)) return;
            // NASA-vertailu (fotorealismi 30.9.): kamera astronauttikuvan paikkaan, suuntaan ja objektiiviin (astro kyyti vertailu).
            if (Vertailu.HasValue) { asento = Vertailu.Value; kentta = VertailuKentta; }
            y.Kuvaa(asento);
            y.Kenttakulma(kentta);
            kuvataan = true;
            if (paluuValmis) { LopetaKyyti(); return; }
            // Tietorivi kerran sekunnissa (nopeutettuna 4 kertaa: kerroin ja ylilennon aika muuttuvat), tilan vaihtuessa ja heti,
            // kun kelaus palaa LIVE:ksi (webissä pilleri jäi sekunniksi kertoimeen).
            var simu = Iss.IssNyt.Simu;
            bool live = simu.Live;
            // Päivänvalosiirto päättyy, kun aika palaa LIVE:ksi, pelaaja valitsee nopeuden tai ylilennon, tai Cupola suljetaan.
            if (PaivanvaloSiirto && (live || lento != null || (simu.Kelaa && simu.KelausId != paivaKelaus)
                || (!simu.Kelaa && Math.Abs(simu.Kerroin - 1) > 1e-9) || kyyti.Tila != Iss.KyydinTila.Ikkuna))
            { PaivanvaloSiirto = false; tietoAika = -1; }
            if (ilmoitettu != kyyti.Tila || live != ilmoitettuLive || nyt - tietoAika >= (live ? 1 : 0.25) || tietoAika < 0)
            {
                ilmoitettu = kyyti.Tila;
                ilmoitettuLive = live;
                tietoAika = nyt;
                double h = Iss.IssNyt.KorkeusKm(utc);
                nakyma.Kyyti(kyyti.Tila, h, Iss.IssNyt.NopeusKmh(h), Iss.IssNyt.Laatu(utc) != Iss.RadanLaatu.Tarkka,
                    Iss.KyydinAika.Kellosta(simu, YlilennonRivi() ?? YopuolenRivi(utc, live), PaivanvaloSiirto));
            }
        }

        /// <summary>LIVEnä yöpuolella Cupolassa pieni rivi (Päätoimittaja 30.9.), muuten null.</summary>
        string YopuolenRivi(DateTime utc, bool live) =>
            live && kyyti.Tila == Iss.KyydinTila.Ikkuna && Iss.Avaruuskavely.Yopuolella(utc) ? "ISS on nyt Maan yöpuolella" : null;

        void LopetaKyyti()
        {
            kavely.Lopeta(Nyt / 1000);
            kyyti.Nollaa();
            siirto.Nollaa();
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

        // ---- Avaruuskävely (omistaja 29.9.2026; Iss.Avaruuskavely): kyydistä ilmalukkoon, ulos kaiteelle, auringonnousu, kuva ----

        Iss.Avaruuskavely kavely;
        /// <summary>Avaruuskävelyn tilakone (Unity-näkymä kuuntelee Vaihtui-tapahtumaa).</summary>
        public Iss.Avaruuskavely Kavely => kavely;
        /// <summary>Vertailukuva (Vertailu-vaiheessa): astronautin NASA-kohde lähinnä ISS:n alapistettä kuvaushetkellä.</summary>
        public (Havaintokohde Kohde, double Km)? KavelynVertailu { get; private set; }

        /// <summary>Avaruuskävely alkaa (Pulun taulu / `astro kavely`): vain kyydissä, ei kesken avauksen tai kuvan.</summary>
        public bool AloitaKavely()
        {
            if (!Auki || Vaihe == AvauksenVaihe.Musta || AvoinKuva != null) return false;
            if (!kyyti.Kyydissa || kyyti.Tila == Iss.KyydinTila.Kauko || kavely.Kaynnissa) return false;
            KavelynVertailu = null;
            kavely.Aloita(Nyt / 1000);
            return true;
        }

        /// <summary>Kävely keskeytetään (testikomento): takaisin sisään seurantaan.</summary>
        public void LopetaKavely() { if (Auki) kavely.Lopeta(Nyt / 1000); }

        void KavelyVaihtui(Iss.KavelynVaihe v)
        {
            double nyt = Nyt / 1000, kentta = kyyti.OnAsento ? kyyti.ViimeisinKentta : y.Nakokulma;
            switch (v)
            {
                case Iss.KavelynVaihe.Ulos:
                    if (double.IsNaN(kentta0)) kentta0 = y.Nakokulma;
                    kyyti.Ulos(Nykyinen(), kentta, nyt, y.VahennettyLiike);
                    break;
                case Iss.KavelynVaihe.Auringonnousu:
                {
                    // Seuraava auringonnousu ISS:ltä; kello kelaa sinne (≤ 3,6 s) ja pysähtyy EnnenS ennen nousua.
                    lento = null;
                    var utc = Iss.IssNyt.Kello();
                    var nousu = Iss.Avaruuskavely.SeuraavaNousu(utc);
                    kavely.AsetaNousu(nousu);
                    var kelaus = nousu.HasValue ? Iss.Avaruuskavely.KelausHetki(nousu.Value, utc) : null;
                    if (kelaus.HasValue) Iss.IssNyt.Simu.KelaaHetkeen(kelaus.Value, vahennetty: y.VahennettyLiike);
                    break;
                }
                case Iss.KavelynVaihe.Pulu:
                    // Aurinko nousee Pulun repliikin ajan nopeutettuna (valo ehtii maahan), kuvasta eteenpäin 1×.
                    if (!y.VahennettyLiike) Iss.IssNyt.Simu.AsetaKerroin(Iss.Avaruuskavely.NousuKerroin);
                    break;
                case Iss.KavelynVaihe.Kuva:
                    if (!Iss.IssNyt.Simu.Live && !Iss.IssNyt.Simu.Kelaa) Iss.IssNyt.Simu.AsetaKerroin(1);
                    break;
                case Iss.KavelynVaihe.Vertailu:
                {
                    var p = Iss.IssNyt.Paikka(Iss.IssNyt.Kello());
                    KavelynVertailu = Iss.Avaruuskavely.LahinKohde(aineisto?.Kohteet, p.Lat, p.Lon);
                    break;
                }
                case Iss.KavelynVaihe.Takaisin:
                case Iss.KavelynVaihe.Ei:
                    if (kyyti.Tila == Iss.KyydinTila.Ulkona) kyyti.Sisaan(Nykyinen(), kentta, nyt, y.VahennettyLiike);
                    break;
            }
            tietoAika = -1;
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
            /// <summary>Lennon alku (y.Aika) ja perilläolon hetki; siirtymä = ero + kohteeseen kääntyminen.</summary>
            public double Alku = double.NaN, PerillaAika = double.NaN;
        }

        /// <summary>
        /// Viimeisimmän lennon koko siirtymä sekunteina (kelaus + kääntyminen kohteeseen, IssKyyti.KohteeseenS; vähennetyllä
        /// liikkeellä 0), tai null ennen perilläoloa. Omistaja 28.9.: enintään 5 s (Simukello.SiirtymaMaxS); laitemittaus.
        /// </summary>
        public double? ViimeisinSiirtymaS
        {
            get
            {
                var l = lento;
                if (l == null || double.IsNaN(l.Alku) || double.IsNaN(l.PerillaAika)) return null;
                return l.PerillaAika - l.Alku + (y.VahennettyLiike ? 0 : Iss.IssKyyti.KohteeseenS);
            }
        }

        Lento lento;
        List<Havaintokohde> ylilennonKohteet;
        List<Havaintokohde> Ylikohteet => ylilennonKohteet ??= Iss.Ylilennot.Kohteet(aineisto?.Kohteet);

        /// <summary>"Lennä kohteen ylle" -valikon kohteet: Euroopan NASA-kohteet nimen mukaan (web ylilennonKohteet).</summary>
        public IReadOnlyList<Havaintokohde> YlilennonKohteet => Ylikohteet;

        /// <summary>Viimeisin ylilento: kohde, hetki (null = ei ylilentoa) ja onko perillä (testikomento astro kyyti tila).</summary>
        public (Havaintokohde Kohde, Iss.Ylilento? Hetki, bool Perilla)? ViimeisinLento =>
            lento == null ? ((Havaintokohde, Iss.Ylilento?, bool)?)null : (lento.Kohde, lento.Ylilento, lento.Perilla);

        // ---- OHJAAMO (omistaja 4.10.2026 klo 11.3x "ISS-OHJAAMO UUSIKSI"; UI Natiivi-UI, logiikka tässä) ----

        /// <summary>
        /// Joystick (plus-muotoinen): kutsu vain muutoksessa (painallus, suunnan vaihto, irrotus = Ei). Katse liikkuu Cupolassa
        /// IssKatse.Askeleessa pidon ajan, kiihtyy hieman ja pysähtyy heti irrotettaessa (ei inertiaa).
        /// </summary>
        public void Joystick(Iss.JoystickSuunta suunta) => kyyti.Katse.Ohjaa(suunta, y?.Aika ?? 0);

        /// <summary>Joystick pidossa ja katse liikkuu (suhinaääni, paneelin animaatio).</summary>
        public bool JoystickLiikkuu => kyyti.Katse.JoystickLiikkuu;

        /// <summary>
        /// LCD:n sijainti (omistaja: "ROOMA, ITALIA", lähin kaupunki, meri tai vuori; maa alle): ISS:n alapisteestä nyt (simuloitu
        /// kello), isoilla kirjaimilla. Lasketaan enintään kerran sekunnissa; ("", "") ennen paikkadatan latausta.
        /// </summary>
        public (string Kohde, string Maa) Sijainti()
        {
            double t = y?.Aika ?? 0;
            if (sijaintiAika >= 0 && t - sijaintiAika < 1.0 && !string.IsNullOrEmpty(sijainti.Kohde)) return sijainti;
            sijaintiAika = t;
            var p = siirto.Paikka(Iss.IssNyt.Paikka(Iss.IssNyt.Kello()), t);
            sijainti = Iss.IssSijainti.Hae(Iss.IssSijainti.Nykyinen, p.Lat, p.Lon);
            return sijainti;
        }
        (string Kohde, string Maa) sijainti = ("", "");
        double sijaintiAika = -1;

        /// <summary>
        /// Kuvauspaikka, jonka kohdalla Cupolan katse on (omistaja 4.10.: kameranappi aktiivinen vain kuvauspaikan kohdalla):
        /// katsepiste enintään Iss.Kuvauspaikat.KuvausKm keskipisteestä, ei siirtymän aikana; null = nappi ei aktiivinen.
        /// </summary>
        public Iss.Kuvauspaikka Kuvauspaikka()
        {
            if (!Auki || kyyti.Tila != Iss.KyydinTila.Ikkuna || kyyti.Siirtyy || !kyyti.OnAsento || siirto.Siirtyy(Nyt / 1000)) return null;
            var a = kyyti.Viimeisin;
            var p = Iss.Kuvauspaikat.Lahin(Iss.Kuvauspaikat.Nykyiset, a.Lat, a.Lon);
            // Vain kun paikka näkyy ISS:ltä riittävän jyrkästi (Natiivi-UI 4.10.: Etna 1 782 km:n päästä kallistuksella 83,8° →
            // kenttä 0,06° ja tasaisen sininen kuva); muuten COG-polku kuten muualla.
            if (p != null && Iss.IssKuvakulma.KohteenKulma(AlusHetki(Iss.IssNyt.Kello(), Nyt / 1000), p.Lat, p.Lon).Kallistus > Iss.Kuvauspaikat.MaxKallistus)
                return null;
            return p;
        }

        /// <summary>
        /// COG-KUVAN KAMERA (Päätoimittaja 4.10.2026): kohde on pelaajan näkymän keskipiste maassa (lat, lon), ja kamera siirretään
        /// virtuaalisesti radan korkeudella kohti kohdetta niin, että kohde näkyy zeniittikulmassa enintään <paramref name="maxKallistus"/>
        /// ("kuin otettu hetkeä myöhemmin, kun ISS on lähempänä"); suunta kohteesta alukseen säilyy, joten kuva on samalta puolelta.
        /// Loiva Cupolan katse (~74°) toi pitkän ilmakehäpolun ja violetin usvan.
        /// </summary>
        public Kuvakulma JyrkkaKuvakulma(double lat, double lon, double maxKallistus)
        {
            var h = AlusHetki(Iss.IssNyt.Kello(), Nyt / 1000);
            var nyt = Iss.IssKuvakulma.KohteenKulma(h, lat, lon);
            if (nyt.Kallistus <= maxKallistus) return nyt;
            const double R = 6_371_000, D = Math.PI / 180;
            double z = maxKallistus * D, eta = Math.Asin(R / (R + Math.Max(1000, h.KorkeusM)) * Math.Sin(z));
            double kaari = (z - eta) / D;
            double suunta = Iss.IssKuvakulma.Suunta(lat, lon, h.Paikka.Lat, h.Paikka.Lon);
            Iss.IssKuvakulma.Kohde(lat, lon, suunta, kaari, out double plat, out double plon, out _);
            return Iss.IssKuvakulma.KohteenKulma(new Iss.IssHetki(new LatLon(plat, plon), h.KorkeusM, h.Suuntima), lat, lon);
        }

        /// <summary>Tarkan kuvan kamera kuvauspaikkaan aluksen nykyisestä paikasta (Iss.Kuvauspaikat.Rajaus).</summary>
        public (Kuvakulma Asento, double Pystykentta) KuvausRajaus(Iss.Kuvauspaikka p, double leveysPerKorkeus) =>
            Iss.Kuvauspaikat.Rajaus(AlusHetki(Iss.IssNyt.Kello(), Nyt / 1000), p, leveysPerKorkeus);

        /// <summary>Kaasun asento (ajan kerroin 1, 10, 100 tai 1000).</summary>
        public int Kaasu { get; private set; } = 1;

        /// <summary>Kaasun asento vaihtui (Unity: vivun naksahdus).</summary>
        public event Action<int> KaasuVaihtui;

        /// <summary>
        /// Kaasu (omistaja: "kaasu, jolla voi säätää ajan kulumisen nopeutta", 1×/10×/100×/1000×): ajan kerroin tästä hetkestä ilman
        /// hyppyä, myös 1× (toisin kuin AsetaNopeus, jonka 1 palaa LIVE-hetkeen). Ylilento unohtuu. false = ei auki tai ei pykälä.
        /// </summary>
        public bool AsetaKaasu(int kerroin)
        {
            if (!Auki || Array.IndexOf(Iss.Simukello.Nopeudet, kerroin) < 0) return false;
            lento = null;
            Iss.IssNyt.Simu.AsetaKerroin(kerroin);
            tietoAika = -1;
            KaasuKerroin = kerroin;
            if (kerroin != Kaasu)
            {
                Kaasu = kerroin;
                y?.Tehoste(KaasuTehoste, 1f);   // vivun pykälän aito naksahdus (Sisältökirjuri, Tehostetaulu)
                KaasuVaihtui?.Invoke(kerroin);
            }
            return true;
        }

        /// <summary>Kaasun portaaton kerroin 1…1000 (AsetaKaasuPortaaton; pykälillä sama kuin Kaasu).</summary>
        public double KaasuKerroin { get; private set; } = 1;

        /// <summary>
        /// Portaaton kaasu (omistaja 6.10.: portaaton nopeuskahva 1×–1000×, Natiivi-UI): kerroin 1…1000 tästä hetkestä ilman hyppyä.
        /// Kaasu (int) on lähin pykälä log-asteikolla (LCD, KaasuVaihtui); naksahdus soi pykälän vaihtuessa kuten vivussa.
        /// </summary>
        public bool AsetaKaasuPortaaton(double kerroin)
        {
            if (!Auki || double.IsNaN(kerroin)) return false;
            var p = Iss.Simukello.Nopeudet;
            kerroin = Math.Max(p[0], Math.Min(p[p.Length - 1], kerroin));
            lento = null;
            Iss.IssNyt.Simu.AsetaKerroin(kerroin);
            tietoAika = -1;
            KaasuKerroin = kerroin;
            int lahin = p[0];
            foreach (int x in p) if (Math.Abs(Math.Log10(x) - Math.Log10(kerroin)) < Math.Abs(Math.Log10(lahin) - Math.Log10(kerroin))) lahin = x;
            if (lahin != Kaasu)
            {
                Kaasu = lahin;
                y?.Tehoste(KaasuTehoste, 1f);
                KaasuVaihtui?.Invoke(lahin);
            }
            return true;
        }

        /// <summary>Vivun naksahduksen tehostetunnus Tehostetaulussa (Sisältökirjuri: aito äänite, ei generoitua).</summary>
        public const string KaasuTehoste = "iss-kaasu";
        /// <summary>
        /// Joystickin liikkeen suhina (omistaja: "kun alus liikkuu, pitäisi kuulua äänitehoste, vaikka vähän voimakkaampi suhina"):
        /// aito äänite silmukkana (Sisältökirjuri), soi kun JoystickLiikkuu, häivytys SuhinaLiukuS. null = ei ääntä.
        /// </summary>
        public static string SuhinaUrl = "https://media.matkakirja.app/aanet/cupola/ohjaamo/v1/iss-kaasu-suhina-loop.wav";
        public const float SuhinaLiukuS = 0.1f;
        ISilmukka suhina;

        void PaivitaSuhina()
        {
            bool cupola = kyyti.Tila == Iss.KyydinTila.Ikkuna;
            if (suhina == null && cupola && !string.IsNullOrEmpty(SuhinaUrl) && y != null) suhina = y.Silmukka(SuhinaUrl);
            suhina?.Voimakkuus(cupola && JoystickLiikkuu ? 1f : 0f, SuhinaLiukuS);
        }

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
            // Pohjoisempana kuin rata ulottuu (Suomi 64,5°N, laitemittaus 28.9.: "ei ylilentoa 48 tunnin sisällä"): ylilento
            // radan pohjoisimmalle osuudelle samalla pituudella, kamera kääntyy perillä silti omaan maahan (horisontissa).
            return Lenna(new Havaintokohde { Tunnus = OmaSijaintiTunnus, Nimi = nimi, Lat = lat, Lon = lon }, valoisa,
                Iss.OmaSijainti.HakuLeveys(lat));
        }

        Iss.Ylilento? Lenna(Havaintokohde k, bool valoisa, double? hakuLat = null)
        {
            if (k == null || !kyyti.Kyydissa || kyyti.Tila == Iss.KyydinTila.Kauko || kavely.Kaynnissa) return null;
            // Cupolassa (omistaja 4.10.): alus siirtyy kohteeseen katse säilyttäen, ei ylilennon kelausta eikä kääntöä alas.
            // Ylilento kelauksineen jää kehittäjän seurantatilaan.
            if (!Iss.IssKyyti.SeurantaKaytossa) { SiirraAlus(k.Lat, k.Lon); return null; }
            var yl = Iss.Ylilennot.Seuraava(hakuLat ?? k.Lat, k.Lon, Iss.IssNyt.Kello(), valoisa: valoisa);
            tietoAika = -1;
            if (yl == null) { lento = new Lento { Kohde = k }; return null; }
            // Kehittäjän seurantatilassa lento lähtee seurannasta (ikkunasta napautus vie sinne); muuten Cupolasta suoraan.
            if (Iss.IssKyyti.SeurantaKaytossa && kyyti.Tila != Iss.KyydinTila.Seuranta) NapautaIss();
            var uusi = new Lento { Kohde = k, Ylilento = yl, Alku = y.Aika };
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
                ? $"{l.Kohde.Nimi}: ISS {Iss.KyydinTeksti.Luku(SivussaKm(l.Kohde, yl))} km sivussa"
                : $"{l.Kohde.Nimi} · {Iss.KyydinTeksti.YlilennonTeksti(yl.Hetki, Iss.IssNyt.Kello())}";
        }

        /// <summary>Etäisyys kohteeseen itseensä: oman sijainnin haku voi osua radan pohjoisimpaan kohtaan (OmaSijainti.HakuLeveys),
        /// jolloin rivi kertoo matkan omaan maahan eikä hakupisteeseen (laite 28.9.: Suomi "20 km sivussa").</summary>
        internal static double SivussaKm(Havaintokohde k, Iss.Ylilento yl) =>
            Math.Max(yl.SivuttainKm, Iss.Ylilennot.MaaEtaisyysKm(yl.Lat, yl.Lon, k.Lat, k.Lon));

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
            // Avauszoomi alkaa paljastuksesta (web: ei kulje, kun paljastus odottaa). Seurannassa korkeus lasketaan joka kehys
            // (SeuraaAsemaa), muuten kamera-ajona.
            var k = y.Kamera;
            double loppu = avaus * Astronauttimatikka.AvausajonLoppu;
            // Lähtö on avauskorkeus, johon kamera asetettiin pimeässä (Avaa).
            if (seuranta) { ajoAlku = nyt; ajoAlkuH = avaus; ajoLoppuH = loppu; return; }
            float kesto = y.VahennettyLiike ? 0f : (float)(Astronauttimatikka.AvauszoominKestoMs / 1000);
            y.AjaKamera(new Nakyma(k.Lat, k.Lon, loppu), kesto, Astronauttimatikka.AvausPehmennys);
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
            // Kamera liukuu kuvan kohteen ylle: seuranta päättyy (web katsoKohteeseen → lopetaSeuranta).
            LopetaSeuranta();
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

        /// <summary>
        /// Pallovalitsin (natiivin sijaintipallo, omistaja 3.10.2026): pyöritetyn pallon keskimmäinen kohde avautuu kuten ‹ ›
        /// (oletuskuva, kamera liukuu sen ylle). null, jos kuva ei ole auki tai kohde on jo auki.
        /// </summary>
        public Havaintokohde AvaaValittu(Havaintokohde k)
        {
            if (!Auki || AvoinKuva == null || k == null || ReferenceEquals(k, AvoinKuva) || !aineisto.Kohteet.Contains(k)) return null;
            AvaaKohde(k, k.OletusIndeksi);
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
            LopetaSeuranta();
            LopetaKyyti();
            kyyti.Katse.Ohjaa(Iss.JoystickSuunta.Ei, y?.Aika ?? 0);
            suhina?.Lopeta(SuhinaLiukuS);
            suhina = null;
            Kaasu = 1; KaasuKerroin = 1;
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
