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
        /// <summary>Drone kiertää linnaa koko historian ajan (astetta); vaihteen korkeus ja etäisyys siirtyvät vaiheen alun
        /// SiirtymaOsuus-osuudella.</summary>
        public const double KiertoAsteet = 300, SiirtymaOsuus = 0.4, Fov = 50;

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

        /// <summary>Vuosi hetkellä t: vaiheen vuodesta seuraavan vaiheen vuoteen (viimeinen: LoppuVuosi) lineaarisesti.</summary>
        public double Vuosi(double t)
        {
            var (i, u) = Kohta(t);
            double a = Vaiheet[i].Vuosi, b = i + 1 < Vaiheet.Count ? Vaiheet[i + 1].Vuosi : LoppuVuosi;
            return a + (b - a) * u;
        }

        /// <summary>Avainsana hetkellä t (vain historiassa): vaiheen vuosiluku ja sanat vaiheen alussa; muuten null.</summary>
        public HistoriaVaihe Avainsana(double t)
        {
            if (t < 0 || t >= Kesto) return null;
            var (i, _) = Kohta(t);
            double s = t - alut[i];
            var v = Vaiheet[i];
            return v.Avain != null && s >= AvainsanaAlkuS && s < AvainsanaAlkuS + AvainsanaS ? v : null;
        }

        /// <summary>
        /// Drone-kameran asento hetkellä t: kohde linnan keskipiste, atsimuutti kiertää tasaisesti KiertoAsteet koko historian ajan,
        /// korkeus ja etäisyys (linnan säde × kerroin) siirtyvät edellisestä vaiheesta smootherstepillä vaiheen alussa.
        /// </summary>
        public Asento Kamera(double t, V3 keski, double sade, double alkuAtsimuutti)
        {
            var (i, u) = Kohta(t);
            var v = Vaiheet[i];
            var e = i > 0 ? Vaiheet[i - 1] : v;
            double s = Kameraliike.Smootherstep(u / SiirtymaOsuus);
            double korkeus = e.Korkeus + (v.Korkeus - e.Korkeus) * s;
            double kerroin = e.EtaisyysKerroin + (v.EtaisyysKerroin - e.EtaisyysKerroin) * s;
            double a = alkuAtsimuutti + KiertoAsteet * Rajaa01(t / Kesto);
            return new Asento(keski, a, korkeus, sade * kerroin, Fov, 0);
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
        };

        /// <summary>Linnan historia, noin 3 min. Avainsanat (vuosiluku + muutama sana) Sisältökirjurin tarkistetuista teksteistä
        /// 9.10.; epävarmat vuodet (Kyrönsalmen synty, kivikauden ensiasutus, Kellobastioni) ilman lukua.</summary>
        public static readonly Historiajana Olavinlinna = new Historiajana(new[]
        {
            new HistoriaVaihe(-7500, 20, 35, 3.2, "jaakausi"),
            new HistoriaVaihe(-3900, 15, 28, 2.6, "kivikausi"),
            new HistoriaVaihe(1475, 25, 22, 2.0, "1475"),
            new HistoriaVaihe(1477, 20, 18, 1.7, "1477"),
            new HistoriaVaihe(1499, 15, 14, 1.5, "1499"),
            new HistoriaVaihe(1550, 25, 24, 1.9, "1500"),
            new HistoriaVaihe(1743, 15, 30, 2.2, "1743"),
            new HistoriaVaihe(1847, 15, 26, 2.0, "1847"),
            new HistoriaVaihe(1872, 10, 22, 1.9, "1872"),
            // Suuri restaurointi omaksi jaksokseen (LR:n restaurointivaihe 1961–1975, juna 173): telineet näkyvät noin 7 s.
            new HistoriaVaihe(1961, 12, 18, 1.6, "1961"),   // 1961–1976: 0,8 s/vuosi, yhden vuoden teline näkyy ~0,8 s
            new HistoriaVaihe(1976, 5, 26, 2.0),            // nykylinna (ponttonisilta kasvaa), ei avainsanaa
        }, 1985);

        /// <summary>K2-lyhennys (8 s): vuoden 1499 linna → 1740–50-luvun varustukset kasvavat → ponttonisilta. Ei avainsanoja.</summary>
        public static readonly Historiajana K2Lyhyt = new Historiajana(new[]
        {
            new HistoriaVaihe(1499, 1.0, 0, 0),
            new HistoriaVaihe(1743, 4.5, 0, 0),
            new HistoriaVaihe(1758, 1.0, 0, 0),
            new HistoriaVaihe(1963, 1.5, 0, 0),
        }, 1973);
    }
}
