// IHMISEN MATKA: VANAT PALLOLLA — PIIRRON CPU-OSA (web js/aikajana-vanat.js).
//
// OMISTAJA 7.9.2026 ilta (Raamattu, VANAT RANNIKKOA MAALAAVINA KAISTOINA,
// EI VIIVA JA HALO): vana on YKSI puoliläpinäkyvä kaista, joka maalaa
// rannikkoa sen ääriviivan mukaan ja levittäytyy hieman sisämaahan;
// leveys vaihtelee aineiston alueiden mukaan.
//
// Webissä kaikki, mikä lasketaan ennen GPU:ta, on tässä puhtaana C#:na:
//
//   1. PUHTAAT KAAVAT: MatkaHetkella, KarjenPaino, Leveyskerroin,
//      KaistanLeveysKm, VahimmaisleveysKm, RantamaskinRuutu, EtaisyysMaahan,
//      Merisyys, KarkiMerella, Lineaariseksi, KotipesanRengas. Kultaiset
//      arvot tulevat suoraan web-moduulista (Linssit-testit/kultaiset/
//      tee-vanat.mjs).
//   2. RAKENNUS (luoVanat → karjet + rakenna): jokainen vanan jana on yksi
//      instanssi (VananJana): edellisen janan alku, oma alku ja loppu,
//      seuraavan loppu (pyöreät liitokset ja OMISTUSSÄÄNTÖ varjostimessa),
//      kumulatiivinen matka, puolileveys km, saapumisaika, merisyys, etäisyys
//      rantaan ja virtojen indeksit. Nämä eivät muutu kehyksestä toiseen:
//      Unity-kerros (Linssit/Unity/VanaKerros.cs) kopioi ne GPU-puskuriin kerran.
//   3. KEHYS (paivita, korosta, karki): kasvu per vana (Kuljettu, pito on
//      yksisuuntainen maksimi), virtojen sävyt kellon hetkellä lineaarisina
//      (Vanha, Kirkas), korostus per vana (VanaPeitto), kotipesien
//      näkyvyys ja kameran kärki ennakolla. Nämä ovat varjostimen
//      taulukkouniformeja (webin uKuljettu, uVanaPeitto, uVanha, uKirkas).
//
// YKSIKÖT: puolileveydet ja etäisyys rantaan kilometreinä; matka on jänteen
// pituus pallolla, jonka säde annetaan rakentajalle (oletus 6371 km →
// kilometrejä). Varjostin käyttää matkaa vain janan katkaisuun osuutena
// (kuljettu − ma) / (mb − ma), joten yksiköllä ei ole väliä, kunhan Kuljettu
// ja janojen matkat ovat samaa. Testit antavat säteen 100 · 1,0005 (webin
// pallon maailmayksiköt), jolloin puskurin matkat ovat vertailukelpoisia.
//
// KOTIPESÄT (Afrikan kolme lähdettä) piirretään renkaina (webissä Line2,
// 2 px): tässä ne ovat omia janojaan (Renkaat), joilla on oma näkyvyys ja
// peitto. Niiden välinen viiva olisi keksitty muuttoliike.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Virrat
{
    /// <summary>
    /// Yksi vanan jana instanssina (webin lomitettu puskuri, INSTANSSIN_LEVEYS 36).
    /// Pisteet P0…P3: janan j−1 alku, janan j alku ja loppu, janan j+1 loppu
    /// (vanan päissä naapuri on rappeutunut: sama piste kahdesti).
    /// Kentät A = kärki j, B = kärki j+1.
    /// </summary>
    public struct VananJana
    {
        /// <summary>Vanan indeksi (0…VanojaMax−1); renkaalla VanojaMax + kotipesän indeksi.</summary>
        public int Vana;
        /// <summary>Virtojen indeksit kärjissä j ja j+1 (väri); renkaalla pesän virta.</summary>
        public int VirtaA, VirtaB;
        public LatLon P0, P1, P2, P3;
        /// <summary>Kumulatiivinen matka kärjissä j−1 … j+2 (säteen yksikköä).</summary>
        public double Matka0, Matka1, Matka2, Matka3;
        /// <summary>Kaistan PUOLIleveys km (perusleveys × aluekerroin / 2), ennen vähimmäisleveyttä.</summary>
        public double PuoliKmA, PuoliKmB;
        /// <summary>Saapumisaika (vuosia sitten); kärkiväri lasketaan tästä.</summary>
        public double AikaA, AikaB;
        /// <summary>Merisyys 0…1: 0 rannikolla (leveä, rantaviivaan leikattu), 1 merellä (kapea, ei maskia).</summary>
        public double MeriA, MeriB;
        /// <summary>Rannikkokärjen etäisyys rantaan vedessä km (0 maalla); kaista alkaa rannasta.</summary>
        public double RantaKmA, RantaKmB;
        /// <summary>Kotipesän rengas: kiinteä pikselileveys, ei maskia, pesän väri.</summary>
        public bool Rengas;
    }

    /// <summary>Lineaarinen väri 0…1 ja peitto.</summary>
    public readonly struct Rgba
    {
        public readonly double R, G, B, A;
        public Rgba(double r, double g, double b, double a) { R = r; G = g; B = b; A = a; }
        public override string ToString() => $"({R}, {G}, {B}, {A})";
    }

    /// <summary>Ruudun mittakaavasta johdetut leveydet km (webin tahdista).</summary>
    public readonly struct KaistanMitat
    {
        /// <summary>Vähimmäispuolileveys maalla ja merellä (KAISTAN_MIN_PX, KAISTAN_MERI_MIN_PX).</summary>
        public readonly double MinPuoliKm, MinPuoliMeriKm;
        /// <summary>Reunan pehmennys: max(KAISTAN_PEHMENNYS_KM, KAISTAN_PEHMENNYS_PX · km/px).</summary>
        public readonly double PehmennysKm;
        /// <summary>Kotipesän renkaan puolileveys (KOTIPESAN_LEVEYS_PX / 2).</summary>
        public readonly double RengasPuoliKm;
        /// <summary>Kaistan perusleveys pikseleinä (mittari).</summary>
        public readonly double LeveysPx;
        public KaistanMitat(double minPuoli, double minPuoliMeri, double pehmennys, double rengasPuoli, double leveysPx)
        {
            MinPuoliKm = minPuoli; MinPuoliMeriKm = minPuoliMeri; PehmennysKm = pehmennys;
            RengasPuoliKm = rengasPuoli; LeveysPx = leveysPx;
        }
    }

    public sealed class VanaPiirto
    {
        /* ------------------------------------------------------------ vakiot */

        /// <summary>Webin vanan nosto (pallon säteinä). Natiivi nostaa kaistan +3 km (VanaKerros).</summary>
        public const double VananKorkeus = 0.0005;
        /// <summary>Kaistan peitto: viivan (0,95) ja halon (0,14) välistä.</summary>
        public const double KaistanPeitto = 0.5;
        /// <summary>Kaistan KOKO leveys km kertoimella 1.</summary>
        public const double KaistanOletusleveysKm = 200;
        /// <summary>Meren ylityksen leveys osuutena maaleveydestä.</summary>
        public const double KaistanMeriKerroin = 0.3;
        /// <summary>Vähimmäisleveys ruudulla css-pikseleinä (koko leveys): maa / meri.</summary>
        public const double KaistanMinPx = 7, KaistanMeriMinPx = 3;
        /// <summary>Reunan pehmennys: vähintään tämä km ja vähintään tämä css-px.</summary>
        public const double KaistanPehmennysKm = 12, KaistanPehmennysPx = 1.5;
        /// <summary>Leveyskertoimen rajat.</summary>
        public const double KaistanKerroinMin = 0.3, KaistanKerroinMax = 3.5;
        /// <summary>Alueen reunan pehmeys asteina, ellei alue anna omaansa.</summary>
        public const double KaistanAlueenPehmeys = 4;
        /// <summary>Merisyyden rajat km: alle rannikkoa, yli merta, välissä liukuu.</summary>
        public const double KaistanMeriRajaAla = 25, KaistanMeriRajaYla = 45;
        /// <summary>Rantamaskin maa/meri-kynnys varjostimessa (bilineaarinen luku).</summary>
        public const double RantamaskinKynnysAla = 0.35, RantamaskinKynnysYla = 0.65;
        /// <summary>Kärki kulkee kameran edellä: osuus kellon lukemasta.</summary>
        public const double VananEnnakko = 0.04;
        /// <summary>Ennakon katto asteina (kohde enintään näin kaukana oikeasta kärjestä).</summary>
        public const double VananEnnakkoMaxAst = Esitysmatikka.VananEnnakkoMaxAst;
        /// <summary>Vähennetty liike: päivitys enintään puolen sekunnin välein.</summary>
        public const double VananAskelMs = 500;
        /// <summary>
        /// Pitotilan vara rintaman kärjessä (osuus rintaman leveydestä; omistaja
        /// 15.9.2026 "etuosa … välkkyy koko ajan"): pito nollaa värin vasta,
        /// kun kärki on selvästi kellon edellä.
        /// </summary>
        public const double KaistanPitoVara = 0.02;
        public const int KotipesanKarkia = 24;
        public const double KotipesanLeveysPx = 2;
        public const double KotipesanPeitto = 0.28;
        /// <summary>Tutkimusvaiheen korostus: valittu pitää peittonsa, muut vaimenevat.</summary>
        public const double KorostuksenHehku = 1, KorostuksenVaimea = 0.35;
        public const double MaapallonSadeKm = 6371;
        /// <summary>Varjostimen taulukoiden koot: vanoja, virtoja ja kotipesiä enintään.</summary>
        public const int VanojaMax = 24, VirtojaMax = 8, KotipesiaMax = 8;
        /// <summary>Per vana -taulukoiden koko varjostimessa (vanat + renkaat).</summary>
        public const int VanaTaulukko = VanojaMax + KotipesiaMax;

        const double Rad = Math.PI / 180;

        /* ---------------------------------------------------- puhtaat kaavat */

        /// <summary>
        /// Matka, jonka kärki on ehtinyt hetkellä `nyt` (vuosia sitten). `aika`
        /// on kärkien saapumisajat LASKEVASSA järjestyksessä: ennen alkua 0,
        /// lopun jälkeen koko matka, välissä lineaarinen.
        /// </summary>
        public static double MatkaHetkella(IReadOnlyList<double> matka, IReadOnlyList<double> aika, double nyt)
        {
            var n = Math.Min(matka?.Count ?? 0, aika?.Count ?? 0);
            if (n < 2) return 0;
            if (!(nyt < aika[0])) return 0;
            if (nyt <= aika[n - 1]) return matka[n - 1];
            for (var k = 0; k + 1 < n; k += 1)
            {
                var a = aika[k];
                var b = aika[k + 1];
                if (nyt <= a && nyt >= b)
                {
                    var t = a == b ? 1 : (a - nyt) / (a - b);
                    return matka[k] + (matka[k + 1] - matka[k]) * t;
                }
            }
            return matka[n - 1];
        }

        /// <summary>
        /// Kärjen paino 0…1 (1 rintamalla, 0 vanhalla osalla); sama kaava kuin
        /// varjostimessa. Pitotilassa kärki, joka on yli varan kellon edellä, on
        /// vanhaa väestöä (kelaus taaksepäin ei leimauta vanaa rintaman väriin).
        /// </summary>
        public static double KarjenPaino(double aika, double nyt, double rintama, bool pito = false)
        {
            if (!(aika > 0) || !(rintama > 0)) return 0;
            if (pito && nyt - aika > rintama * KaistanPitoVara) return 0;
            return Math.Max(0, Math.Min(1, 1 - (aika - nyt) / rintama));
        }

        /// <summary>Etäisyys laatikon reunaan asteina (≥ 0 sisällä); pituusväli saa kiertää 180°.</summary>
        static double LaatikonSyvyysAst(double lat, double lon, KaistanAlue laatikko)
        {
            double s = laatikko.Lat[0], n = laatikko.Lat[1];
            double w = laatikko.Lon[0], e = laatikko.Lon[1];
            var dLat = Math.Min(lat - s, n - lat);
            double dLon;
            if (w <= e) dLon = Math.Min(lon - w, e - lon);
            else
            {
                var lonK = lon >= w ? lon : lon + 360;
                var eK = e + 360;
                dLon = Math.Min(lonK - w, eK - lonK);
            }
            return Math.Min(dLat, dLon);
        }

        /// <summary>
        /// Kaistan leveyskerroin kärjelle: suurin levennys ja pienin kavennus
        /// kertautuvat (päällekkäiset alueet eivät summaudu), tulos rajataan.
        /// </summary>
        public static double Leveyskerroin(double lat, double lon, IReadOnlyList<KaistanAlue> alueet,
            double pehmeys = KaistanAlueenPehmeys, double rajaAla = KaistanKerroinMin, double rajaYla = KaistanKerroinMax)
        {
            double levein = 1, kapein = 1;
            if (alueet != null)
            {
                foreach (var alue in alueet)
                {
                    if (alue?.Lat == null || alue.Lon == null) continue;
                    var p = alue.Pehmeys ?? pehmeys;
                    var d = LaatikonSyvyysAst(lat, lon, alue);
                    var w = Math.Max(0, Math.Min(1, (d + p) / (2 * p)));
                    if (w <= 0) continue;
                    var k = 1 + (alue.Kerroin - 1) * w;
                    if (k >= 1) levein = Math.Max(levein, k);
                    else kapein = Math.Min(kapein, k);
                }
            }
            return Math.Max(rajaAla, Math.Min(rajaYla, levein * kapein));
        }

        /// <summary>Kaistan KOKO leveys km kärjelle: perusleveys × kerroin.</summary>
        public static double KaistanLeveysKm(double lat, double lon, Kaista kaista)
        {
            var perus = kaista?.LeveysKm ?? KaistanOletusleveysKm;
            return perus * Leveyskerroin(lat, lon, kaista?.Alueet);
        }

        /// <summary>Vähimmäisleveys km: `px` css-pikseliä nykyisellä km/px-mittakaavalla.</summary>
        public static double VahimmaisleveysKm(double kmPerPx, double px = KaistanMinPx) =>
            !(kmPerPx > 0) ? 0 : px * kmPerPx;

        /// <summary>Leveydet ruudun mittakaavasta (webin tahdista).</summary>
        public static KaistanMitat Mitat(double kmPerPx, Kaista kaista = null)
        {
            if (!(kmPerPx > 0)) return new KaistanMitat(0, 0, KaistanPehmennysKm, 0, 0);
            return new KaistanMitat(
                VahimmaisleveysKm(kmPerPx, KaistanMinPx) / 2,
                VahimmaisleveysKm(kmPerPx, KaistanMeriMinPx) / 2,
                Math.Max(KaistanPehmennysKm, KaistanPehmennysPx * kmPerPx),
                KotipesanLeveysPx / 2 * kmPerPx,
                (kaista?.LeveysKm ?? KaistanOletusleveysKm) / kmPerPx);
        }

        /// <summary>Rantamaskin ruutuindeksi (rivi 0 = 90°N, sarake 0 = 180°W).</summary>
        public static int RantamaskinRuutu(double lat, double lon, Ruutumaski maski)
        {
            var W = maski.Leveys;
            var H = maski.Korkeus;
            var aste = maski.Aste;
            var c = (int)Math.Min(W - 1, Math.Max(0, Math.Floor((((lon + 180) % 360) + 360) % 360 / aste)));
            var r = (int)Math.Min(H - 1, Math.Max(0, Math.Floor((90 - lat) / aste)));
            return r * W + c;
        }

        /// <summary>
        /// Etäisyys lähimpään maaruutuun km enintään `maxKm`:n säteellä
        /// (isoympyrämatka ruudun keskipisteeseen, pituusaste kiertää);
        /// +∞, jos maata ei ole. Ilman maskia 0.
        /// </summary>
        public static double EtaisyysMaahan(double lat, double lon, Ruutumaski maski, double maxKm = KaistanMeriRajaYla)
        {
            var maa = maski?.Maa;
            if (maa == null) return 0;
            if (maa[RantamaskinRuutu(lat, lon, maski)] != 0) return 0;
            var W = maski.Leveys;
            var H = maski.Korkeus;
            var aste = maski.Aste;
            var c0 = (int)Math.Floor((((lon + 180) % 360) + 360) % 360 / aste);
            var r0 = (int)Math.Min(H - 1, Math.Max(0, Math.Floor((90 - lat) / aste)));
            var cosLat = Math.Max(0.05, JsLuvut.Cos(lat * Rad));
            var nRivi = (int)Math.Ceiling(maxKm / (Ruudukko.KmAsteella * aste)) + 1;
            var nSar = (int)Math.Min(W >> 1, Math.Ceiling(maxKm / (Ruudukko.KmAsteella * aste * cosLat)) + 1);
            var paras = double.PositiveInfinity;
            var f1 = lat * Rad;
            var sinF1 = JsLuvut.Sin(f1);
            var cosF1 = JsLuvut.Cos(f1);
            for (var dr = -nRivi; dr <= nRivi; dr += 1)
            {
                var r = r0 + dr;
                if (r < 0 || r >= H) continue;
                var la = (90 - (r + 0.5) * aste) * Rad;
                var sinLa = JsLuvut.Sin(la);
                var cosLa = JsLuvut.Cos(la);
                for (var dc = -nSar; dc <= nSar; dc += 1)
                {
                    var c = ((c0 + dc) % W + W) % W;
                    if (maa[r * W + c] == 0) continue;
                    var lo = -180 + (c + 0.5) * aste;
                    var dl = lo - lon;
                    while (dl > 180) dl -= 360;
                    while (dl < -180) dl += 360;
                    var d = Math.Acos(Math.Max(-1, Math.Min(1, sinF1 * sinLa + cosF1 * cosLa * JsLuvut.Cos(dl * Rad)))) * MaapallonSadeKm;
                    if (d < paras) paras = d;
                }
            }
            return paras;
        }

        /// <summary>
        /// Kärjen merisyys 0…1: 0 rannikolla tai maalla, 1 aidosti merellä,
        /// välissä smoothstep. Mallin kulkumaski ratkaisee ensin: jos malli
        /// käveli kärjen 0,5° ruudussa, kärki on rannikkoa.
        /// </summary>
        public static double Merisyys(double lat, double lon, Ruutumaski maski, Ruutumaski kulku = null,
            double rajaAla = KaistanMeriRajaAla, double rajaYla = KaistanMeriRajaYla)
        {
            if (maski?.Maa == null) return 0;
            if (kulku?.Maa != null && kulku.Maa[Ruudukko.Ruutu(lat, lon, kulku.Leveys, kulku.Korkeus)] != 0) return 0;
            if (maski.Maa[RantamaskinRuutu(lat, lon, maski)] != 0) return 0;
            var d = EtaisyysMaahan(lat, lon, maski, rajaYla + 5);
            if (!(d > rajaAla)) return 0;
            if (d >= rajaYla) return 1;
            var t = (d - rajaAla) / (rajaYla - rajaAla);
            return t * t * (3 - 2 * t);
        }

        /// <summary>Onko kärki merellä kaistan mielessä (merisyys yli puolen).</summary>
        public static bool KarkiMerella(double lat, double lon, Ruutumaski maski, Ruutumaski kulku = null) =>
            Merisyys(lat, lon, maski, kulku) > 0.5;

        /// <summary>sRGB-tavu (0…255) lineaariseksi: varjostimen värit ovat lineaarisia.</summary>
        public static double Lineaariseksi(double c)
        {
            var v = Math.Max(0, Math.Min(1, c / 255));
            return v <= 0.04045 ? v / 12.92 : Math.Pow((v + 0.055) / 1.055, 2.4);
        }

        /// <summary>Kotipesän rengas asteina: ympyrä säteellä `sadeKm` (karkia + 1 pistettä, suljettu).</summary>
        public static List<LatLon> KotipesanRengas(double lat, double lon, double sadeKm, int karkia = KotipesanKarkia)
        {
            var sadeAst = sadeKm / Ruudukko.KmAsteella;
            var cosLat = Math.Max(0.2, JsLuvut.Cos((lat * Math.PI) / 180));
            var ulos = new List<LatLon>(karkia + 1);
            for (var k = 0; k <= karkia; k += 1)
            {
                var kulma = (2 * Math.PI * k) / karkia;
                var lng = lon + (sadeAst / cosLat) * JsLuvut.Cos(kulma);
                while (lng > 180) lng -= 360;
                while (lng < -180) lng += 360;
                ulos.Add(new LatLon(Math.Max(-89.9, Math.Min(89.9, lat + sadeAst * JsLuvut.Sin(kulma))), lng));
            }
            return ulos;
        }

        /// <summary>Piste pallolla webin (three/Globe.gl) akseleilla: y napa, z = (0°, 0°).</summary>
        public static void PallonPiste(double lat, double lon, double sade, out double x, out double y, out double z)
        {
            var la = lat * Rad;
            var lo = lon * Rad;
            x = sade * JsLuvut.Cos(la) * JsLuvut.Sin(lo);
            y = sade * JsLuvut.Sin(la);
            z = sade * JsLuvut.Cos(la) * JsLuvut.Cos(lo);
        }

        /* ------------------------------------------------------- rakennus */

        sealed class VananTiedot
        {
            public Vana Vana;
            public double[] Matka, Aika;
            public HashSet<string> Omat;
            public double Pitomatka;
        }

        sealed class PesanTiedot
        {
            public Kotipesa Pesa;
            public bool Nakyva;
            public double Peitto = KotipesanPeitto;
        }

        readonly List<VananTiedot> vanat = new List<VananTiedot>();
        readonly List<PesanTiedot> pesat = new List<PesanTiedot>();
        readonly List<double[]> selkaranka;
        readonly Dictionary<string, VirranVari> varit = new Dictionary<string, VirranVari>();
        readonly List<string> virtalista = new List<string>();
        double viimeNyt = -1;
        double viimeAskel = double.NegativeInfinity;
        bool purettu;

        /// <summary>Vanojen janat webin järjestyksessä (vana kerrallaan, kärki kerrallaan).</summary>
        public readonly List<VananJana> Janat = new List<VananJana>();
        /// <summary>Kotipesien renkaiden janat (Vana = VanojaMax + pesän indeksi).</summary>
        public readonly List<VananJana> Renkaat = new List<VananJana>();

        /// <summary>Kaistan peitto (kaista.peitto) ja meren leveyskerroin (kaista.meriKerroin).</summary>
        public readonly double Peitto, MeriKerroin;
        /// <summary>Onko rantamaski käytössä (varjostimen leikkaus).</summary>
        public readonly bool MaskiKaytossa;
        /// <summary>Säde, jonka jänteinä matka on laskettu.</summary>
        public readonly double Sade;
        /// <summary>Kotipesän renkaan väri (lineaarinen): pääjoukon vanha sävy.</summary>
        public readonly Rgba PesanVari;

        /* Kehyksen tila (webin uniformit samoine alkuarvoineen). */
        public double Nyt { get; private set; }
        public double Rintama { get; private set; } = 1;
        public bool Pito { get; private set; }
        /// <summary>Piirretty matka per vana (uKuljettu); renkailla ks. RenkaanKuljettu.</summary>
        public readonly double[] Kuljettu = new double[VanojaMax];
        /// <summary>Korostuksen peittokerroin per vana (uVanaPeitto).</summary>
        public readonly double[] VanaPeitto = new double[VanojaMax];
        /// <summary>Virtojen vanhan väestön ja rintaman sävy lineaarisena, r g b peräkkäin (uVanha, uKirkas).</summary>
        public readonly double[] Vanha = new double[VirtojaMax * 3];
        public readonly double[] Kirkas = new double[VirtojaMax * 3];
        /// <summary>Onko jokin vana piirretty (webin verkko.visible).</summary>
        public bool Nakyvissa { get; private set; } = true;
        /// <summary>Vähennetty liike: päivitys enintään VananAskelMs välein.</summary>
        public bool VahennettyLiike;
        public int Paivityksia { get; private set; }

        public int VanojaPiirrossa => vanat.Count;
        public int KotipesiaPiirrossa => pesat.Count;
        public string VananTunnus(int i) => vanat[i].Vana.Tunnus;
        public bool PesaNakyvissa(int i) => pesat[i].Nakyva;
        public double PesanPeitto(int i) => pesat[i].Peitto;

        /// <summary>
        /// Rakentaa janat (webin luoVanat: karjet + rakenna). `virrat` antaa
        /// virtojen järjestyksen (väri-indeksit) ja värit; `rantamaski` leikkaa
        /// kaistan rantaviivaan ja antaa merisyyden; `kulkumaski` on mallin
        /// 0,5° maski (kärki, jonka ruudussa malli käveli, on rannikkoa).
        /// </summary>
        public VanaPiirto(VanatTulos tulos, IReadOnlyList<Virta> virrat, Kaista kaista, Ruutumaski rantamaski,
            Ruutumaski kulkumaski = null, double sade = MaapallonSadeKm)
        {
            Sade = sade;
            Peitto = kaista?.Peitto ?? KaistanPeitto;
            MeriKerroin = kaista?.MeriKerroin ?? KaistanMeriKerroin;
            MaskiKaytossa = rantamaski?.Maa != null;
            for (var i = 0; i < VirtojaMax * 3; i += 1) { Vanha[i] = 0.5; Kirkas[i] = 0.8; }
            for (var i = 0; i < VanojaMax; i += 1) VanaPeitto[i] = 1;
            if (virrat != null)
            {
                foreach (var v in virrat)
                {
                    virtalista.Add(v.Tunnus);
                    if (v.Tunnus != null && v.Vari != null) varit[v.Tunnus] = v.Vari;
                }
            }

            foreach (var vana in tulos?.Vanat ?? new List<Vana>())
            {
                if (vanat.Count >= VanojaMax) break;
                var n = vana.Pisteet?.Count ?? 0;
                if (n < 2) continue;
                var vanaIdx = vanat.Count;
                var matka = new double[n];
                var aika = new double[n];
                var puoli = new double[n];
                var meri = new double[n];
                var ranta = new double[n];
                var virta = new int[n];
                double summa = 0, ex = 0, ey = 0, ez = 0;
                for (var k = 0; k < n; k += 1)
                {
                    var p = vana.Pisteet[k];
                    PallonPiste(p.Lat, p.Lon, sade, out var x, out var y, out var z);
                    if (k > 0) summa += JsLuvut.Hypot(x - ex, y - ey, z - ez);
                    ex = x; ey = y; ez = z;
                    matka[k] = summa;
                    aika[k] = p.Aika;
                    puoli[k] = KaistanLeveysKm(p.Lat, p.Lon, kaista) / 2;
                    meri[k] = Merisyys(p.Lat, p.Lon, rantamaski, kulkumaski);
                    var rantaKm = EtaisyysMaahan(p.Lat, p.Lon, rantamaski, KaistanMeriRajaYla);
                    ranta[k] = double.IsInfinity(rantaKm) ? KaistanMeriRajaYla : rantaKm;
                    var tunnus = vana.Virrat != null && k < vana.Virrat.Count && vana.Virrat[k] != null ? vana.Virrat[k] : vana.Virta;
                    var i = virtalista.IndexOf(tunnus);
                    virta[k] = i >= 0 ? i : 0;
                }
                int P(int k) => Math.Max(0, Math.Min(n - 1, k));
                for (var s = 0; s + 1 < n; s += 1)
                {
                    int i0 = P(s - 1), i3 = P(s + 2);
                    Janat.Add(new VananJana
                    {
                        Vana = vanaIdx,
                        VirtaA = virta[s], VirtaB = virta[s + 1],
                        P0 = Paikka(vana, i0), P1 = Paikka(vana, s), P2 = Paikka(vana, s + 1), P3 = Paikka(vana, i3),
                        Matka0 = matka[i0], Matka1 = matka[s], Matka2 = matka[s + 1], Matka3 = matka[i3],
                        PuoliKmA = puoli[s], PuoliKmB = puoli[s + 1],
                        AikaA = aika[s], AikaB = aika[s + 1],
                        MeriA = meri[s], MeriB = meri[s + 1],
                        RantaKmA = ranta[s], RantaKmB = ranta[s + 1],
                    });
                }
                var omat = new HashSet<string>();
                if (vana.Virrat != null && vana.Virrat.Count > 0) foreach (var t in vana.Virrat) omat.Add(t);
                else omat.Add(vana.Virta);
                vanat.Add(new VananTiedot { Vana = vana, Matka = matka, Aika = aika, Omat = omat });
            }
            if (vanat.Count > 0)
            {
                selkaranka = new List<double[]>(vanat[0].Vana.Pisteet.Count);
                foreach (var p in vanat[0].Vana.Pisteet) selkaranka.Add(new[] { p.Lat, p.Lon, p.Aika });
            }

            // Kotipesän väri: pääjoukon vanha sävy (webissä rgb()-merkkijono → three linearisoi).
            varit.TryGetValue("paavirta", out var paavari);
            var pv = VirranTilat.Vari(paavari ?? new VirranVari { Vanha = "#D9731E", Rintama = "#FFB347" }, 0).Vanha;
            PesanVari = new Rgba(Lineaariseksi(JsLuvut.Round(pv.R)), Lineaariseksi(JsLuvut.Round(pv.G)),
                Lineaariseksi(JsLuvut.Round(pv.B)), KotipesanPeitto);
            var pesaVirta = Math.Max(0, virtalista.IndexOf("paavirta"));
            foreach (var pesa in tulos?.Kotipesat ?? new List<Kotipesa>())
            {
                if (pesat.Count >= KotipesiaMax) break;
                var rengas = KotipesanRengas(pesa.Lat, pesa.Lon, pesa.Sade > 0 ? pesa.Sade : 350);
                var m = rengas.Count;
                var matka = new double[m];
                double summa = 0, ex = 0, ey = 0, ez = 0;
                for (var k = 0; k < m; k += 1)
                {
                    PallonPiste(rengas[k].Lat, rengas[k].Lon, sade, out var x, out var y, out var z);
                    if (k > 0) summa += JsLuvut.Hypot(x - ex, y - ey, z - ez);
                    ex = x; ey = y; ez = z;
                    matka[k] = summa;
                }
                int P(int k) => Math.Max(0, Math.Min(m - 1, k));
                for (var s = 0; s + 1 < m; s += 1)
                {
                    Renkaat.Add(new VananJana
                    {
                        Vana = VanojaMax + pesat.Count,
                        VirtaA = pesaVirta, VirtaB = pesaVirta,
                        P0 = rengas[P(s - 1)], P1 = rengas[s], P2 = rengas[s + 1], P3 = rengas[P(s + 2)],
                        Matka0 = matka[P(s - 1)], Matka1 = matka[s], Matka2 = matka[s + 1], Matka3 = matka[P(s + 2)],
                        MeriA = 1, MeriB = 1,
                        Rengas = true,
                    });
                }
                pesat.Add(new PesanTiedot { Pesa = pesa });
            }
        }

        static LatLon Paikka(Vana v, int k) => new LatLon(v.Pisteet[k].Lat, v.Pisteet[k].Lon);

        /* ----------------------------------------------------------- kehys */

        /// <summary>
        /// Kello siirtyi (webin paivita): kasvu per vana, virtojen sävyt ja
        /// kotipesien näkyvyys. PITO on yksisuuntainen maksimi: piirretty
        /// pituus ei koskaan lyhene (kertomus palaa ajassa taaksepäin
        /// Blombosista Karmelvuorelle ja Chilestä Keski-Aasiaan), ja
        /// kotipesät jäävät palamaan. Palauttaa false, jos mitään ei päivitetty
        /// (sama hetki, negatiivinen kello, vähennetyn liikkeen askel kesken).
        /// </summary>
        /// <param name="kelloMs">Seinäkello ms (vain vähennetylle liikkeelle).</param>
        public bool Paivita(double nyt, bool pito = false, double kelloMs = double.NaN)
        {
            if (purettu || (vanat.Count == 0 && pesat.Count == 0) || !(nyt >= 0)) return false;
            if (nyt == viimeNyt) return false;
            if (VahennettyLiike && !double.IsNaN(kelloMs))
            {
                if (kelloMs - viimeAskel < VananAskelMs) return false;
                viimeAskel = kelloMs;
            }
            viimeNyt = nyt;
            Paivityksia += 1;
            Nyt = nyt;
            Rintama = VirranTilat.RintamanLeveys(nyt);
            Pito = pito;
            for (var i = 0; i < virtalista.Count && i < VirtojaMax; i += 1)
            {
                var tunnus = virtalista[i];
                var vari = tunnus != null && varit.TryGetValue(tunnus, out var v) ? v : new VirranVari { Vanha = "#888888", Rintama = "#cccccc" };
                var savy = VirranTilat.Vari(vari, nyt);
                Vanha[i * 3] = Lineaariseksi(savy.Vanha.R);
                Vanha[i * 3 + 1] = Lineaariseksi(savy.Vanha.G);
                Vanha[i * 3 + 2] = Lineaariseksi(savy.Vanha.B);
                Kirkas[i * 3] = Lineaariseksi(savy.Rintama.R);
                Kirkas[i * 3 + 1] = Lineaariseksi(savy.Rintama.G);
                Kirkas[i * 3 + 2] = Lineaariseksi(savy.Rintama.B);
            }
            foreach (var p in pesat) p.Nakyva = (pito && p.Nakyva) || nyt <= p.Pesa.Aika;
            var nakyvia = 0;
            for (var i = 0; i < vanat.Count; i += 1)
            {
                var o = vanat[i];
                var kuljettu = MatkaHetkella(o.Matka, o.Aika, nyt);
                var matka = pito ? Math.Max(o.Pitomatka, kuljettu) : kuljettu;
                o.Pitomatka = matka;
                Kuljettu[i] = matka;
                if (matka > 0) nakyvia += 1;
            }
            Nakyvissa = nakyvia > 0;
            return true;
        }

        /// <summary>
        /// Tutkimusvaiheen korostus (webin korosta): valinta on VIRTA; vana
        /// kuuluu valintaan, jos yksikin sen kärki on valitun virran väriä.
        /// Valittu saa `hehku`-, muut `vaimea`-kertoimen; null palauttaa.
        /// </summary>
        public bool Korosta(string virta = null, double vaimea = KorostuksenVaimea, double hehku = KorostuksenHehku)
        {
            if (purettu) return false;
            var tyhja = string.IsNullOrEmpty(virta);
            foreach (var p in pesat) p.Peitto = !tyhja && virta != "paavirta" ? KotipesanPeitto * vaimea : KotipesanPeitto;
            for (var i = 0; i < vanat.Count; i += 1)
            {
                var valittu = tyhja || vanat[i].Omat.Contains(virta);
                VanaPeitto[i] = tyhja ? 1 : valittu ? hehku : vaimea;
            }
            return true;
        }

        /// <summary>Selkärangan kärki kameralle (ensimmäinen vana), ennakolla rajattuna.</summary>
        public LatLon? Karki(double nyt, double ennakko = VananEnnakko)
        {
            if (selkaranka == null) return null;
            var k = Esitysmatikka.KarkiHetkella(selkaranka, nyt, ennakko, VananEnnakkoMaxAst);
            return k == null ? (LatLon?)null : new LatLon(k.Value.Lat, k.Value.Lon);
        }

        /// <summary>Vanat pois käytöstä (Paivita ja Korosta eivät enää tee mitään).</summary>
        public void Pura() => purettu = true;

        /* ---------------------------------------------- apurit Unity-kerrokselle */

        /// <summary>Renkaan piirretty matka: näkyvä rengas kokonaan, piilotettu ei lainkaan.</summary>
        public double RenkaanKuljettu(int pesa) => pesat[pesa].Nakyva ? double.MaxValue : 0;

        /// <summary>Onko jana näkyvissä hetkellä Nyt: kello on ehtinyt janan alkuun (varjostimen katkaistuun).</summary>
        public bool JanaNakyvissa(in VananJana jana)
        {
            if (jana.Rengas) return jana.Vana - VanojaMax < pesat.Count && pesat[jana.Vana - VanojaMax].Nakyva;
            return jana.Vana < vanat.Count && Kuljettu[jana.Vana] > jana.Matka1;
        }

        /// <summary>Kuinka suuri osa janasta on piirretty (0…1; varjostimen f).</summary>
        public double JananOsuus(in VananJana jana)
        {
            if (jana.Rengas) return JanaNakyvissa(jana) ? 1 : 0;
            var kulj = jana.Vana < vanat.Count ? Kuljettu[jana.Vana] : 0;
            if (kulj <= jana.Matka1) return 0;
            return jana.Matka2 > jana.Matka1 ? Math.Max(0, Math.Min(1, (kulj - jana.Matka1) / (jana.Matka2 - jana.Matka1))) : 1;
        }

        /// <summary>
        /// Janan väri ja peitto kohdassa t (0 = kärki A, 1 = kärki B) samalla
        /// kaavalla kuin varjostin: paino saapumisajasta, sävy virtojen
        /// välillä, peitto = kaistan peitto × korostus (muotoa ja maskia ei).
        /// </summary>
        public Rgba JananVari(in VananJana jana, double t)
        {
            if (jana.Rengas)
            {
                var pi = jana.Vana - VanojaMax;
                return new Rgba(PesanVari.R, PesanVari.G, PesanVari.B, pi < pesat.Count ? pesat[pi].Peitto : 0);
            }
            // Varjostimen kaava (ei karjenPainon aika > 0 -ehtoa, kuten webin FRAGMENTTI).
            var aika = jana.AikaA + (jana.AikaB - jana.AikaA) * t;
            var paino = Rintama > 0 ? Math.Max(0, Math.Min(1, 1 - (aika - Nyt) / Rintama)) : 0;
            if (Pito && Nyt - aika > Rintama * KaistanPitoVara) paino = 0;
            int va = jana.VirtaA * 3, vb = jana.VirtaB * 3;
            double Kanava(double[] taulu, int k) => taulu[va + k] + (taulu[vb + k] - taulu[va + k]) * t;
            double Sekoita(int k) => Kanava(Vanha, k) + (Kanava(Kirkas, k) - Kanava(Vanha, k)) * paino;
            var peitto = Peitto * (jana.Vana < VanojaMax ? VanaPeitto[jana.Vana] : 1);
            return new Rgba(Sekoita(0), Sekoita(1), Sekoita(2), peitto);
        }
    }
}
