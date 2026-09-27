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
            nakyma.Iss(Iss.IssNyt.Paikka(utc), kaari);
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
            if (!Auki || Vaihe == AvauksenVaihe.Musta) return;
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

        /// <summary>Maailmankierros (AstronauttiKierros), lasketaan kerran ensimmäisellä käytöllä.</summary>
        int[] Kierros => kierros ??= AstronauttiKierros.Laske(aineisto.Kohteet);

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
