// OLAVINLINNAN HISTORIA-ANIMAATIO (PT 9.10.2026, suunnitelma hyväksytty juna 171:een): aikajana jääkaudesta nykylinnaan drone-
// kameralla, rakennusvaiheet kasvavat korkeuden mukaan. Puhdas logiikka; Unity-puoli Linssit/Unity/SeikkailuHistoria.cs, testit
// Linssit-testit/Testit/HistoriajanaTestit.cs.
//
//   Vaiheet: vuosi, kesto (s), drone-kameran korkeuskulma ja etäisyys, avainsana (vuosiluku + muutama sana; vain historiassa,
//   ei pelin aikana — PT:n ehto 2). Vaiheen aikana vuosi etenee lineaarisesti vaiheen vuodesta seuraavan vaiheen vuoteen.
//   Osat: kävelydatan leikkaukset (leikkaus:vain-1499*, LR) nimen etuliitteen mukaan: rakennettu vuodesta, purettu vuoteen,
//   rakennusaika. Kasvu 0 = koko leikkauslaatikko piilottaa osan, 1 = osa kokonaan näkyvissä; välillä laatikon alareuna nousee
//   (osa kasvaa maasta ylös). LR:n vaihemallien extras "vuodesta"/"vuoteen" korvaavat taulukon, kun ne tulevat.
//   K2-lyhennys: pelattavan palan lopun drone (SeikkailuNousu) näyttää 8 s:ssa vuoden 1499 linnan kasvavan nykylinnaksi
//   ilman kertojaa ja ilman tekstiä.
//
// VUODET LUKITTU (PT:n ehto 1): Sisältökirjurin faktatarkistus 9.10.2026 (docs/raportit/olavinlinna-historia-animaatio-tekstit-
// 20261009.md, PT-hyväksytty). Kellobastionille ei vuotta; epävarmat (Paksun tornin räjähdys, 1600-luvun palo) eivät ole mukana.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Dioraama
{
    public sealed class HistoriaVaihe
    {
        public readonly double Vuosi, KestoS, Korkeus, EtaisyysKerroin;
        /// <summary>Avainsanan tekstiavain (olavinlinna.historia.&lt;Avain&gt;.vuosi / .sanat, Kielitaulu); null = ei avainsanaa.</summary>
        public readonly string Avain;
        public string VuosiTeksti => Avain != null ? Kielitaulu.Hae("olavinlinna.historia." + Avain + ".vuosi") : null;
        public string Sanat => Avain != null ? Kielitaulu.Hae("olavinlinna.historia." + Avain + ".sanat") : null;
        public HistoriaVaihe(double vuosi, double kestoS, double korkeus, double etaisyysKerroin, string avain = null)
        { Vuosi = vuosi; KestoS = kestoS; Korkeus = korkeus; EtaisyysKerroin = etaisyysKerroin; Avain = avain; }

        // ELOKUVA (omistaja 9.10., Raamattu LIIKKUVAT KOHTAUKSET TEHDÄÄN KUIN ELOKUVA; kohtauslista docs/raportit/olavinlinna-historia-elokuva/):
        /// <summary>Kameran avainasento kohtauksen LOPUSSA (kompassiatsimuutti, korkeus, etäisyys = Korkeus/EtaisyysKerroin) ja kohteen
        /// siirto linnan keskeltä (glTF x, z metreinä). Kamera kulkee avainasentojen läpi jatkuvaa käyrää (Historiajana.Kamera).</summary>
        public double Atsimuutti, KohdeX, KohdeZ;
        /// <summary>Avainsana näkyviin tästä hetkestä kohtauksen alusta (s): kun kertoja sanoo vuoden (sana-ajat, juna 174).</summary>
        public double AvainsanaAlku = Historiajana.AvainsanaAlkuS;
        /// <summary>Vuoden ankkurit kohtauksen sisällä (s, vuosi): vuosi etenee niiden kautta lineaarisesti, jotta näky osuu kertojan sanaan
        /// (esim. palot 1868, kun kertoja sanoo "Palot").</summary>
        public (double S, double Vuosi)[] Ankkurit;
        /// <summary>Kertojan rivi alkaa kohtauksen alusta tämän viiveen jälkeen (Historiajana.KertojaViiveS).</summary>
        public bool Kertoja = true;
        /// <summary>Kertojan rivin tekstiavain (olavinlinna.historia.&lt;KertojaAvain&gt;.kertoja.aani), jos eri kuin avainsanan (esittely:
        /// rivi esi-1323 alkaa rautakauden kohtauksesta); null = Avain.</summary>
        public string KertojaAvain;
    }

    public sealed class HistoriaOsa
    {
        public readonly string Etuliite;
        public readonly double Vuodesta, Vuoteen, RakennusVuotta;
        public HistoriaOsa(string etuliite, double vuodesta, double rakennusVuotta, double vuoteen = double.PositiveInfinity)
        { Etuliite = etuliite; Vuodesta = vuodesta; RakennusVuotta = rakennusVuotta; Vuoteen = vuoteen; }
    }

    /// <summary>LR:n vaihemalli (blender/vaiheet/vaiheet.json, v45y): oma glb, joka näkyy vuodesta (null = alusta) vuoteen (null = loppuun)
    /// asti; valinnainen leikkauslista (palon jäljet: kuoren katot piiloon vaiheen ajaksi).</summary>
    public sealed class HistoriaVaihemalli
    {
        public string Id, Glb, Leikkaukset;
        public double? Vuodesta, Vuoteen;
        public bool Nakyy(double vuosi) => Valilla(vuosi, Vuodesta, Vuoteen);
        /// <summary>Vuosi välillä [vuodesta, vuoteen); null = avoin pää (myös glb-solmujen extras, LR:n restaurointitelineet).</summary>
        public static bool Valilla(double vuosi, double? vuodesta, double? vuoteen) => (vuodesta == null || vuosi >= vuodesta) && (vuoteen == null || vuosi < vuoteen);

        /// <summary>Glb-solmuryhmän vuodet ovat kalenterivuosia päät mukaan lukien (LR v45z: teline-kurtiini-1963 = 1963–1963,
        /// teline-eerikintorni-1962 = 1962–1963): näkyy välillä [vuodesta, vuoteen + 1).</summary>
        public static bool RyhmaVuonna(double vuosi, double? vuodesta, double? vuoteen) => Valilla(vuosi, vuodesta, vuoteen + 1);

        /// <summary>Solmujen perityt vuodet: oma extras "vuodesta"/"vuoteen" tai lähimmän esivanhemman (LR: teline-kellotorni 1961–1964
        /// lapsineen). vanhempi[i] = −1 juurelle; puuttuva = (null, null).</summary>
        public static (double? Vuodesta, double? Vuoteen)[] SolmujenVuodet(IReadOnlyList<int> vanhempi, IReadOnlyList<(double? Vuodesta, double? Vuoteen)> omat)
        {
            var v = new (double?, double?)[vanhempi.Count];
            for (int i = 0; i < v.Length; i++)
            {
                (double? a, double? b) = (null, null);
                for (int j = i, n = 0; j >= 0 && n < 64; j = vanhempi[j], n++)
                    if (omat[j].Vuodesta != null || omat[j].Vuoteen != null) { (a, b) = omat[j]; break; }
                v[i] = (a, b);
            }
            return v;
        }
    }

    public sealed class Historiajana
    {
        /// <summary>Kivilinna (Sisältökirjuri 9.10.: puuvarustus 1475, kivi 1477): sitä ennen linnan kuori, tilat ja hahmot piilossa,
        /// näkyvissä vain vaihemallit (tyhjä saari, puuvarustus) ja ympäristö.</summary>
        public const double KivilinnaVuosi = 1477;
        public static bool LinnaNakyy(double vuosi) => vuosi >= KivilinnaVuosi;

        public static List<HistoriaVaihemalli> LueVaihemallit(string json)
        {
            var l = new List<HistoriaVaihemalli>();
            foreach (var x in MiniJson.TaulukkoTaiTyhja(MiniJson.Jasenna(json)))
            {
                var o = MiniJson.ObjektiTaiNull(x); string glb = MiniJson.Teksti(o, "glb");
                if (o == null || string.IsNullOrEmpty(glb)) continue;
                l.Add(new HistoriaVaihemalli { Id = MiniJson.Teksti(o, "id"), Glb = glb, Leikkaukset = MiniJson.Teksti(o, "leikkaukset"),
                    Vuodesta = MiniJson.Luku(o, "vuodesta"), Vuoteen = MiniJson.Luku(o, "vuoteen") });
            }
            return l;
        }

        /// <summary>Vaiheen leikkaukset (palon-jaljet-leikkaukset.json: nimi, keskipiste, koko, kierto_y, vuodesta, vuoteen).</summary>
        public static List<KavelyLeikkaus> LueLeikkaukset(string json)
        {
            var l = new List<KavelyLeikkaus>();
            foreach (var x in MiniJson.TaulukkoTaiTyhja(MiniJson.Jasenna(json)))
            {
                var o = MiniJson.ObjektiTaiNull(x); if (o == null) continue;
                var k = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "keskipiste")); var s = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "koko"));
                if (k.Count < 3 || s.Count < 3) continue;
                double L(List<object> a, int i) => Convert.ToDouble(a[i], System.Globalization.CultureInfo.InvariantCulture);
                l.Add(new KavelyLeikkaus(MiniJson.Teksti(o, "nimi"), L(k, 0), L(k, 1), L(k, 2), L(s, 0), L(s, 1), L(s, 2), MiniJson.Luku(o, "kierto_y") ?? 0,
                    MiniJson.Luku(o, "vuodesta"), MiniJson.Luku(o, "vuoteen")));
            }
            return l;
        }

        /// <summary>Sisältökirjurin faktatarkistus tehty (PT:n ehto 1). Ennen sitä historiatila vain kehityskomennolla.</summary>
        public const bool Lukittu = true;   // Sisältökirjuri 9.10., PT-hyväksytty
        /// <summary>Avainsana näkyy vaiheen alusta AvainsanaAlkuS:sta AvainsanaS:n ajan (4 s kuten esittelyssä, PT 9.10.).</summary>
        public const double AvainsanaAlkuS = 0.8, AvainsanaS = 4.0;
        /// <summary>Kertojan rivi alkaa kohtauksen alusta (s): kamera ehtii liikkeelle ensin, ei tyhjää taukoa.</summary>
        public const double KertojaViiveS = 0.8, Fov = 50;
        /// <summary>Kameran alkuasento (ensimmäinen avainasento ajassa 0).</summary>
        public double AlkuAtsimuutti = 130, AlkuKorkeus = 38, AlkuEtaisyysKerroin = 3.4;
        /// <summary>Lokin nimi (historia / esittely).</summary>
        public string Nimi = "historia";
        /// <summary>Kertojan äänien kansio (&lt;juuri&gt;&lt;KertojaAvain&gt;.mp3); null = historian sha-taulu workerin kautta.</summary>
        public string KertojaJuuri;

        /// <summary>Alkuasennon korkeus ja etäisyys (esittely jatkaa saapumiskaaren loppuasennosta, ei hyppyä); kamerakäyrä lasketaan uudelleen.</summary>
        public void AsetaAlku(double korkeus, double etaisyysKerroin) { AlkuKorkeus = korkeus; AlkuEtaisyysKerroin = etaisyysKerroin; ajat = null; }

        /// <summary>Asento (kompassiatsimuutti, korkeuskulma, etäisyys) kameran sijainnista kohteeseen nähden; Kameraliike.AsentoSijainnin käänteinen.</summary>
        public static (double Atsimuutti, double Korkeus, double Etaisyys) AsentoSijainnista(V3 sijainti, V3 kohde)
        {
            var d = sijainti - kohde; double e = d.Pituus;
            if (e < 1e-9) return (0, 0, 0);
            double a = Math.Atan2(d.X / e, -d.Z / e) * 180 / Math.PI;
            return (a < 0 ? a + 360 : a, Math.Asin(Math.Max(-1, Math.Min(1, d.Y / e))) * 180 / Math.PI, e);
        }

        public readonly IReadOnlyList<HistoriaVaihe> Vaiheet;
        public readonly double LoppuVuosi, Kesto;
        readonly double[] alut;

        public Historiajana(IReadOnlyList<HistoriaVaihe> vaiheet, double loppuVuosi)
        {
            if (vaiheet == null || vaiheet.Count == 0) throw new ArgumentException("ei vaiheita");
            Vaiheet = vaiheet; LoppuVuosi = loppuVuosi;
            alut = new double[vaiheet.Count];
            double t = 0;
            for (int i = 0; i < vaiheet.Count; i++) { alut[i] = t; t += vaiheet[i].KestoS; }
            Kesto = t;
        }

        static double Rajaa01(double x) => x < 0 ? 0 : x > 1 ? 1 : x;

        /// <summary>Vaihe hetkellä t (s) ja kulunut osuus vaiheesta (0–1). Lopun jälkeen viimeinen vaihe, osuus 1.</summary>
        public (int vaihe, double u) Kohta(double t)
        {
            if (t <= 0) return (0, 0);
            for (int i = Vaiheet.Count - 1; i >= 0; i--)
                if (t >= alut[i]) return (i, Rajaa01((t - alut[i]) / Vaiheet[i].KestoS));
            return (0, 0);
        }

        public double VaiheenAlku(int i) => alut[i];

        /// <summary>Kivilinnan rakentuminen (arvio 3 9.10.: linna ilmestyi vuonna 1477 kerralla ja puuvarustus seisoi vedessä vuonna 1476,
        /// kun tyhjä saari oli jo piilossa): kuori nousee vedestä ylös RakennusS sekunnissa ja valmistuu kivilinnan kohtauksen alkuun.</summary>
        public const double RakennusS = 8;   // arvio 5: 6 s ja raja 60 m näytti nousun vain ~2 s:n hyppynä
        /// <summary>Ensimmäisen kivilinnan kohtauksen (Vuosi ≥ KivilinnaVuosi) alku: rakentuminen valmis.</summary>
        public double RakennusValmisT
        {
            get { for (int i = 0; i < Vaiheet.Count; i++) if (Vaiheet[i].Vuosi >= KivilinnaVuosi) return alut[i]; return 0; }
        }
        /// <summary>Rakentumisen osuus 0…1 hetkellä t (smootherstep; 0 ennen alkua, 1 kivilinnan kohtauksesta alkaen).</summary>
        public double Rakennus(double t) => Kameraliike.Smootherstep((t - (RakennusValmisT - RakennusS)) / RakennusS);
        /// <summary>Linnan kuori näkyvissä (rakentuminen alkanut).</summary>
        public bool LinnaNakyyT(double t) => t >= RakennusValmisT - RakennusS;
        /// <summary>Rakentumisen leikkausraja (glTF y, m): kuori näkyy tämän alapuolella; RakennusAla (veden alla) → RakennusYla (tornien yli).</summary>
        public const double RakennusAla = -8, RakennusYla = 38, MaanPinta = 2;   // yläraja tornien katoille (ei tyhjää nousua)
        public double RakennusKorkeus(double t) => RakennusAla + Rakennus(t) * (RakennusYla - RakennusAla);
        /// <summary>Maavaihemalli (ei vuodesta-kenttää, tyhjä saari) näkyy, kunnes kuoren kallio on noussut maan pinnan yli (ei
        /// päällekkäisiä pintoja), vaikka sen vuoteen olisi aiemmin (puuvarustus seisoi vedessä vuonna 1476).</summary>
        public bool MaaNakyy(double t) => !LinnaNakyyT(t) || RakennusKorkeus(t) < MaanPinta;

        /// <summary>Historian myöhempien rakenteiden (vain-1499-listat) leikkaus vain maan yläpuolelta (arvio 5): leikkauslaatikon alareuna
        /// nostetaan tasolle <paramref name="maa"/>, jolloin onton fotogrammetriakuoren juuri jää ehjäksi ja LR:n ranta-1499-täyttö (v46g:
        /// rakennusten juurella −2,0) jatkuu siitä; laatikko kokonaan maan alla = ei leikkausta (puoli 0).</summary>
        public const double LeikkausMaa = -2.0;
        public static (double Y, double Puoli) MaanYlapuolella(double y, double puoli, double maa)
        {
            double ala = y - puoli, yla = y + puoli;
            if (ala >= maa) return (y, puoli);
            if (yla <= maa) return (maa, 0);
            return ((maa + yla) / 2, (yla - maa) / 2);
        }

        /// <summary>Vuosi hetkellä t: vaiheen vuodesta seuraavan vaiheen vuoteen (viimeinen: LoppuVuosi) lineaarisesti ankkureiden kautta.</summary>
        public double Vuosi(double t)
        {
            var (i, u) = Kohta(t);
            var v = Vaiheet[i];
            double a = v.Vuosi, b = i + 1 < Vaiheet.Count ? Vaiheet[i + 1].Vuosi : LoppuVuosi, s = u * v.KestoS;
            double s0 = 0, y0 = a;
            if (v.Ankkurit != null)
                foreach (var (sa, ya) in v.Ankkurit)
                {
                    if (s <= sa) return y0 + (ya - y0) * (sa > s0 ? (s - s0) / (sa - s0) : 1);
                    s0 = sa; y0 = ya;
                }
            return y0 + (b - y0) * (v.KestoS > s0 ? (s - s0) / (v.KestoS - s0) : 1);
        }

        /// <summary>Avainsana hetkellä t (vain historiassa): vaiheen vuosiluku ja sanat vaiheen alussa; muuten null.</summary>
        public HistoriaVaihe Avainsana(double t)
        {
            if (t < 0 || t >= Kesto) return null;
            var (i, _) = Kohta(t);
            double s = t - alut[i];
            var v = Vaiheet[i];
            return v.Avain != null && s >= v.AvainsanaAlku && s < v.AvainsanaAlku + AvainsanaS ? v : null;
        }

        /// <summary>
        /// Drone-kameran asento hetkellä t (LIIKESÄÄNNÖT, juna 174): avainasennot ajassa 0 (Alku*) ja jokaisen kohtauksen lopussa;
        /// välit monotonisella kuutiollisella Hermite-käyrällä kanavittain (atsimuutti, korkeus, etäisyys, kohteen siirto): nopeus on
        /// jatkuva kohtausten rajoilla (ei pysähdyksiä eikä nykäyksiä), ei ylitystä avainasentojen yli, alku ja loppu pysähtyvät
        /// pehmeästi (tangentti 0). alkuAtsimuutti siirtää koko käyrää (oletus 0).
        /// </summary>
        public Asento Kamera(double t, V3 keski, double sade, double alkuAtsimuutti = 0)
        {
            int n = Vaiheet.Count + 1;
            if (ajat == null)
            {
                ajat = new double[n]; kanavat = new double[5][];
                for (int c = 0; c < 5; c++) kanavat[c] = new double[n];
                ajat[0] = 0; Aseta(0, AlkuAtsimuutti, AlkuKorkeus, AlkuEtaisyysKerroin, 0, 0);
                for (int i = 0; i < Vaiheet.Count; i++) { var v = Vaiheet[i]; ajat[i + 1] = alut[i] + v.KestoS; Aseta(i + 1, v.Atsimuutti, v.Korkeus, v.EtaisyysKerroin, v.KohdeX, v.KohdeZ); }
            }
            double a = Kayra(0, t), k = Kayra(1, t), e = Kayra(2, t), kx = Kayra(3, t), kz = Kayra(4, t);
            return new Asento(new V3(keski.X + kx, keski.Y, keski.Z + kz), a + alkuAtsimuutti, k, sade * e, Fov, 0);
        }

        double[] ajat; double[][] kanavat;
        void Aseta(int i, params double[] x) { for (int c = 0; c < 5; c++) kanavat[c][i] = x[c]; }

        /// <summary>Monotoninen kuutiollinen Hermite (Fritsch–Carlson) epätasaisin ajoin; päätetangentit 0.</summary>
        double Kayra(int c, double t)
        {
            var y = kanavat[c]; int n = ajat.Length;
            if (t <= 0) return y[0];
            if (t >= ajat[n - 1]) return y[n - 1];
            int i = 0; while (i < n - 2 && t > ajat[i + 1]) i++;
            double Kulma(int j) => (y[j + 1] - y[j]) / (ajat[j + 1] - ajat[j]);
            double Tangentti(int j)
            {
                if (j == 0 || j == n - 1) return 0;
                double d0 = Kulma(j - 1), d1 = Kulma(j);
                if (d0 * d1 <= 0) return 0;
                double h0 = ajat[j] - ajat[j - 1], h1 = ajat[j + 1] - ajat[j];
                return 3 * (h0 + h1) / ((2 * h1 + h0) / d0 + (h1 + 2 * h0) / d1);   // painotettu harmoninen keskiarvo
            }
            double h = ajat[i + 1] - ajat[i], u = (t - ajat[i]) / h, u2 = u * u, u3 = u2 * u;
            return (2 * u3 - 3 * u2 + 1) * y[i] + (u3 - 2 * u2 + u) * h * Tangentti(i) + (-2 * u3 + 3 * u2) * y[i + 1] + (u3 - u2) * h * Tangentti(i + 1);
        }

        /// <summary>Osan näkyvyys vuonna v: 0 ennen rakentamista, kasvaa (smootherstep) rakennusajan, 1 valmiina; purettaessa
        /// (vuoteen) laskee takaisin nollaan samassa ajassa.</summary>
        public static double Kasvu(double vuosi, HistoriaOsa osa)
        {
            if (osa == null) return 1;
            double r = Math.Max(osa.RakennusVuotta, 1e-6);
            double k = Kameraliike.Smootherstep((vuosi - osa.Vuodesta) / r);
            if (!double.IsPositiveInfinity(osa.Vuoteen)) k = Math.Min(k, 1 - Kameraliike.Smootherstep((vuosi - osa.Vuoteen) / r));
            return k;
        }

        /// <summary>Kasvun leikkauslaatikko (keskipisteen y ja puolikorkeus): yläreuna pysyy, alareuna nousee kasvun mukana;
        /// kasvu 1 → puolikorkeus 0 (ei leikkausta).</summary>
        public static (double y, double puoli) KasvuLaatikko(double y, double puoli, double kasvu)
        {
            double k = Rajaa01(kasvu);
            return (y + puoli * k, puoli * (1 - k));
        }

        /// <summary>Datan vuodet (LR v45y: leikkausobjektien vuodesta / historia_vuosi / vuoteen) historiaosiksi; rakennusaika
        /// DatanRakennusVuotta. Tyhjä lista = datassa ei vuosia (käytetään OlavinlinnanOsat-taulukkoa).</summary>
        public const double DatanRakennusVuotta = 6;
        public static List<HistoriaOsa> OsatDatasta(IEnumerable<(string Nimi, double? Vuodesta, double? Vuoteen)> leikkaukset)
        {
            var l = new List<HistoriaOsa>();
            foreach (var (n, a, b) in leikkaukset)
                if (!string.IsNullOrEmpty(n) && a is double v) l.Add(new HistoriaOsa(n, v, DatanRakennusVuotta, b ?? double.PositiveInfinity));
            return l;
        }

        /// <summary>Vuoden 1499 kalliorannan täyttö (LR:n kävelyosa ranta-1499) kuuluu vain vuoden 1499 näkymään: historiassa se näkyy,
        /// kunnes ensimmäinen myöhempi rakenne (osista pienin Vuodesta, Olavinlinnalla Kellobastioni 1745) alkaa kasvaa (arvio 10
        /// virhe 3: täytön terassi y ≈ −6 jäi ruskeaksi laataksi veteen bastionien ja nykylinnan viereen). SIDOTTU KUOREEN (PT 9.10.):
        /// koskee vain nykyasuista kuorta (v24); vuoden 1499 kuorella (<paramref name="kuori1499"/>, ulkokuori.asu "1499") ranta kuuluu
        /// 1499-näkymään ja näkyy aina.</summary>
        public static bool Ranta1499Nakyy(double vuosi, bool kuori1499 = false, IReadOnlyList<HistoriaOsa> osat = null)
        {
            if (kuori1499) return true;
            double eka = double.PositiveInfinity;
            foreach (var o in osat ?? OlavinlinnanOsat) if (o.Vuodesta < eka) eka = o.Vuodesta;
            return vuosi < eka;
        }

        /// <summary>Leikkauksen historiaosa nimen etuliitteen mukaan (pisin osuma); null = ei historiaosa (näkyy aina).</summary>
        public static HistoriaOsa Osa(string leikkaus, IReadOnlyList<HistoriaOsa> osat = null)
        {
            if (string.IsNullOrEmpty(leikkaus)) return null;
            HistoriaOsa paras = null;
            foreach (var o in osat ?? OlavinlinnanOsat)
                if (leikkaus.StartsWith(o.Etuliite, StringComparison.Ordinal) && (paras == null || o.Etuliite.Length > paras.Etuliite.Length)) paras = o;
            return paras;
        }

        /// <summary>
        /// Vuoden 1499 jälkeen rakennetut osat (LR:n leikkaukset, merkit leikkaus:vain-1499 ja vain-1499-b). Vuodet Sisältökirjurin
        /// faktatarkistuksesta 9.10. (docs/raportit/olavinlinna-historia-animaatio-tekstit-20261009.md, PT-hyväksytty): Vesiportin
        /// bastioni ja kurtiinit 1749–55 (rakennus 1751–55); Kellobastionin vuotta ei löytynyt (olemassa 1751, Venäjän aika 1743–),
        /// joten se kasvaa ennen vuotta 1751 eikä sille näytetä vuotta; ponttonisilta nykyajan kulkuyhteys (suuri restaurointi 1961–75).
        /// </summary>
        public static readonly IReadOnlyList<HistoriaOsa> OlavinlinnanOsat = new[]
        {
            new HistoriaOsa("b1499-vesiportin-bastioni", 1751, 5),
            new HistoriaOsa("b1499-porttikurtiini", 1749, 6),
            new HistoriaOsa("b1499-s201-rakennus", 1752, 4),
            new HistoriaOsa("b1499-kellobastioni", 1745, 6),
            new HistoriaOsa("pako-kellobastioni", 1745, 6),
            new HistoriaOsa("b1499-ponttonisilta", 1965, 6),
            // Paksu bastioni (LR v46t 10.10.: 1790-luvulta, korvasi 1560-luvun Paksun tornin, joka räjähti 1791; vuosi LR:n, tarkistettava
            // Sisältökirjurilla): b1499-paksu-bastioni ja -pohjoinen.
            new HistoriaOsa("b1499-paksu-bastioni", 1791, 6),
        };

        /// <summary>Linnan historia, noin 3 min. Avainsanat (vuosiluku + muutama sana) Sisältökirjurin tarkistetuista teksteistä
        /// 9.10.; epävarmat vuodet (Kyrönsalmen synty, kivikauden ensiasutus, Kellobastioni) ilman lukua.</summary>
        public static readonly Historiajana Olavinlinna = new Historiajana(new[]
        {
            // KOHTAUSLISTA (docs/raportit/olavinlinna-historia-elokuva/kohtauslista.md): kesto = kertoja (KertojaViiveS + rivi) + hengähdys;
            // avainsana kun kertoja sanoo vuoden (sana-ajat opas/<sha>.ajat.json); kamera = kohtauksen loppuasento.
            new HistoriaVaihe(-7500, 9.5, 34, 3.0, "jaakausi") { Atsimuutti = 140, AvainsanaAlku = 1.1 },
            new HistoriaVaihe(-3900, 10, 30, 2.6, "kivikausi") { Atsimuutti = 155, AvainsanaAlku = 2.7 },
            new HistoriaVaihe(1475, 17.5, 24, 2.0, "1475") { Atsimuutti = 170, AvainsanaAlku = 1.2 },
            new HistoriaVaihe(1477, 12.5, 20, 1.75, "1477") { Atsimuutti = 185, AvainsanaAlku = 1.5 },
            new HistoriaVaihe(1499, 11.5, 16, 1.55, "1499") { Atsimuutti = 200, AvainsanaAlku = 1.2 },
            new HistoriaVaihe(1550, 12.5, 22, 1.85, "1500") { Atsimuutti = 212, AvainsanaAlku = 1.0 },
            // Bastionit kasvavat, kun kertoja sanoo "1750-luvulla … bastionit" (7,0–10,5 s); kohde lounaaseen bastionien puolelle.
            new HistoriaVaihe(1743, 13.5, 28, 2.1, "1743") { Atsimuutti = 228, AvainsanaAlku = 3.35, KohdeX = -10, KohdeZ = 8, Ankkurit = new[] { (7.0, 1749.0), (10.5, 1756.0) } },
            // Palot 1868, kun kertoja sanoo "Palot" (7,7 s): palon jäljet ja katot pois kohtauksen loppuun.
            new HistoriaVaihe(1847, 18.5, 30, 2.0, "1847") { Atsimuutti = 246, AvainsanaAlku = 2.7, Ankkurit = new[] { (7.7, 1868.0) } },
            // Kertojan rivi 9 alkaa tästä ja jatkuu restaurointiin; kohtaus vaihtuu sanaan "suuri restaurointi" (0,8 + 4,5 s).
            new HistoriaVaihe(1872, 5.3, 27, 1.9, "1872") { Atsimuutti = 252, AvainsanaAlku = 2.1 },
            new HistoriaVaihe(1961, 17, 20, 1.65, "1961") { Atsimuutti = 272, AvainsanaAlku = 1.3, Kertoja = false },
            new HistoriaVaihe(1976, 8, 15, 1.7) { Atsimuutti = 282, Kertoja = false },   // nykylinna (ponttonisilta), Kellotornin kaaren suunta
        }, 1985);

        /// <summary>ESITTELYN VAIHEET (omistaja 10.10. 07.1x: "esittelyn pitää näyttää linnan eri vaiheet" + "avata hieman suomen esihistoriaa";
        /// PT:n hyväksymä suunnitelma): saapumisen jälkeen ~26 s esihistoriaa (Saimaa, kivikausi, rautakausi, 1323) ja ~51 s kivilinnasta nykyasuun samalla moottorilla kuin historia (vuosileikkaukset, vaihemallit, kasvu), ilman
        /// kertojaa; avainsanat historian tarkistetuista teksteistä (Paksu bastioni 1788–1800 ja nykyasu ilman tekstiä). Atsimuutit ovat
        /// suhteellisia: SeikkailuHistoria siirtää käyrän saapumiskaaren loppuasentoon ja kamera kiertää ~25° vaiheessa.</summary>
        public static readonly Historiajana Esittely = new Historiajana(new[]
        {
            // ESIHISTORIA (omistaja 10.10. 07.1x, PT:n hyväksymä; faktapohja docs/raportit/olavinlinna-esihistoria-faktapohja-20261010.md):
            // tyhjä saari, vuosi pysyy ankkurilla aikakaudessa (LR:n vaihemallit vuodesta/vuoteen: kota, nuotio ja kalliomaalaus kivikaudella,
            // haapiot ja kaskisavu rautakaudella) ja hyppää lopussa seuraavaan. Ei Savonlinnaa koskevia väitteitä (faktapohjan aukot);
            // 1323 ilman rajaviivaa, drone korkealla. Kertoja (omistaja 10.10. 07.3x, 4 riviä Williamilla): esi-saimaa (Saimaa + kivikausi),
            // esi-1323 (rautakausi + 1323), vaihe-1475 ja vaihe-nyky (Pelikoodari vaihe-esittely-v1: 17,56 / 15,52 / 11,84 / 6,36 s); rivi soi
            // kohtauksen alusta ja jatkuu seuraavan yli, ja kohtaus vaihtuu sana-aikojen mukaan ("Rannoilla" 8,24 s, "Vuonna" 5,56 s).
            new HistoriaVaihe(-7500, 9.0, 34, 3.0, "esi-saimaa") { Atsimuutti = -60, KertojaAvain = "esi-saimaa", Ankkurit = new[] { (8.5, -7000.0) } },
            new HistoriaVaihe(-3900, 10.5, 26, 2.4, "esi-kalliomaalaukset") { Atsimuutti = -40, Kertoja = false, Ankkurit = new[] { (10.0, -3000.0) } },
            new HistoriaVaihe(500, 6.3, 24, 2.4, "esi-rautakausi") { Atsimuutti = -20, KertojaAvain = "esi-1323", Ankkurit = new[] { (5.8, 900.0) } },
            new HistoriaVaihe(1323, 11, 52, 4.0, "esi-1323") { Atsimuutti = 0, Kertoja = false, AvainsanaAlku = 0.5, Ankkurit = new[] { (10.5, 1400.0) } },
            new HistoriaVaihe(1475, 8, 24, 2.2, "1475") { Atsimuutti = 20, KertojaAvain = "vaihe-1475" },   // puuvarustus; kivilinna nousee RakennusS:ssä
            new HistoriaVaihe(1477, 6, 20, 1.9, "1477") { Atsimuutti = 45, Kertoja = false },
            new HistoriaVaihe(1499, 5, 16, 1.7, "1499") { Atsimuutti = 70, Kertoja = false },
            new HistoriaVaihe(1550, 5, 22, 1.9, "1500") { Atsimuutti = 95, Kertoja = false },
            // Bastionit 1749–1756 kasvavat näkyvästi (kuten historiassa), kohde lounaaseen bastionien puolelle.
            new HistoriaVaihe(1743, 8, 28, 2.1, "1743") { Atsimuutti = 120, KohdeX = -10, KohdeZ = 8, Kertoja = false, Ankkurit = new[] { (3.0, 1749.0), (6.0, 1756.0) } },
            new HistoriaVaihe(1788, 4, 24, 2.0) { Atsimuutti = 145, Kertoja = false, Ankkurit = new[] { (3.0, 1800.0) } },   // Paksu bastioni 1791 (LR v46t)
            new HistoriaVaihe(1847, 5, 30, 2.0, "1847") { Atsimuutti = 170, Kertoja = false, Ankkurit = new[] { (2.5, 1868.0) } },
            new HistoriaVaihe(1961, 5, 20, 1.8, "1961") { Atsimuutti = 195, Kertoja = false },
            new HistoriaVaihe(1976, 8, 16, 1.8) { Atsimuutti = 215, KertojaAvain = "vaihe-nyky" },   // nykyasu (ponttonisilta)
        }, 1985) { Nimi = "esittely", KertojaJuuri = "https://media.matkakirja.app/seikkailu/olavinlinna/vaihe-esittely-v1/aani/", AlkuAtsimuutti = -80, AlkuKorkeus = 20, AlkuEtaisyysKerroin = 2.0 };

        /// <summary>K2-lyhennys (8 s): vuoden 1499 linna → 1740–50-luvun varustukset kasvavat → ponttonisilta. Ei avainsanoja.</summary>
        public static readonly Historiajana K2Lyhyt = new Historiajana(new[]
        {
            new HistoriaVaihe(1499, 1.0, 0, 0),
            new HistoriaVaihe(1743, 3.0, 0, 0),
            new HistoriaVaihe(1758, 0.5, 0, 0),
            new HistoriaVaihe(1788, 1.5, 0, 0),   // Paksu bastioni 1791 (LR v46t) kasvaa näkyvästi
            new HistoriaVaihe(1800, 0.5, 0, 0),
            new HistoriaVaihe(1963, 1.5, 0, 0),
        }, 1973);
    }
}
