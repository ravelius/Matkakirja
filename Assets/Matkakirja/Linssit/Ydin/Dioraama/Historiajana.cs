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
// VUODET ALUSTAVIA (Lukittu = false): Sisältökirjuri tarkistaa vuodet ja tapahtumat ennen lukitusta (PT:n ehto 1; erityisesti
// Kellobastionin ja vesiportin bastionin vuodet, 1800-luvun palon päivämäärä ja restauroinnin vaiheet 1870-luvulta 1900-luvulle).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Dioraama
{
    public sealed class HistoriaVaihe
    {
        public readonly double Vuosi, KestoS, Korkeus, EtaisyysKerroin;
        /// <summary>Avainsana: vuosiluku (teksti, esim. "n. 9000 eaa.") ja muutama sana; null = ei avainsanaa.</summary>
        public readonly string VuosiTeksti, Sanat;
        public HistoriaVaihe(double vuosi, double kestoS, double korkeus, double etaisyysKerroin, string vuosiTeksti = null, string sanat = null)
        { Vuosi = vuosi; KestoS = kestoS; Korkeus = korkeus; EtaisyysKerroin = etaisyysKerroin; VuosiTeksti = vuosiTeksti; Sanat = sanat; }
    }

    public sealed class HistoriaOsa
    {
        public readonly string Etuliite;
        public readonly double Vuodesta, Vuoteen, RakennusVuotta;
        public HistoriaOsa(string etuliite, double vuodesta, double rakennusVuotta, double vuoteen = double.PositiveInfinity)
        { Etuliite = etuliite; Vuodesta = vuodesta; RakennusVuotta = rakennusVuotta; Vuoteen = vuoteen; }
    }

    public sealed class Historiajana
    {
        /// <summary>Sisältökirjurin faktatarkistus tehty (PT:n ehto 1). Ennen sitä historiatila vain kehityskomennolla.</summary>
        public const bool Lukittu = false;
        /// <summary>Avainsana näkyy vaiheen alusta AvainsanaAlkuS:sta AvainsanaS:n ajan.</summary>
        public const double AvainsanaAlkuS = 0.8, AvainsanaS = 5.0;
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
            return v.Sanat != null && s >= AvainsanaAlkuS && s < AvainsanaAlkuS + AvainsanaS ? v : null;
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
        /// Vuoden 1499 jälkeen rakennetut osat (LR:n leikkaukset, merkit leikkaus:vain-1499 ja vain-1499-b; huom-kentät 7.–8.10.:
        /// "1790-luvun länsivarustukset ja ponttonisilta", "Kellobastioni (1790-l.)"). ALUSTAVA: Sisältökirjuri tarkistaa.
        /// </summary>
        public static readonly IReadOnlyList<HistoriaOsa> OlavinlinnanOsat = new[]
        {
            new HistoriaOsa("b1499-vesiportin-bastioni", 1790, 8),
            new HistoriaOsa("b1499-porttikurtiini", 1791, 6),
            new HistoriaOsa("b1499-s201-rakennus", 1792, 6),
            new HistoriaOsa("b1499-kellobastioni", 1790, 8),
            new HistoriaOsa("pako-kellobastioni", 1790, 8),
            new HistoriaOsa("b1499-ponttonisilta", 1960, 6),
        };

        /// <summary>Linnan historia, noin 3 min (suunnitelma PT:lle 9.10.). Vuodet ja sanat ALUSTAVIA (Sisältökirjuri).</summary>
        public static readonly Historiajana Olavinlinna = new Historiajana(new[]
        {
            new HistoriaVaihe(-9000, 20, 35, 3.2, "n. 9000 eaa.", "Jää vetäytyy, Kyrönsalmi aukeaa"),
            new HistoriaVaihe(-5000, 15, 28, 2.6, "kivikausi", "Ensimmäiset asukkaat Saimaan rannoilla"),
            new HistoriaVaihe(1475, 25, 22, 2.0, "1475", "Erik Akselinpoika Tott perustaa linnan"),
            new HistoriaVaihe(1480, 20, 18, 1.7, "1480-luku", "Päälinnan tornit kohoavat"),
            new HistoriaVaihe(1499, 15, 14, 1.5, "1499", "Kesäyö linnassa"),
            new HistoriaVaihe(1500, 25, 24, 1.9, "1500–1600-luvut", "Esilinna ja uudet varustukset"),
            new HistoriaVaihe(1743, 15, 30, 2.2, "1743", "Linna Venäjän vallan alle"),
            new HistoriaVaihe(1800, 15, 26, 2.0, "1800-luku", "Tulipalo ja rapistuminen"),
            new HistoriaVaihe(1870, 20, 20, 1.8, "1870-luvulta", "Restaurointi: nykyinen linna"),
        }, 2026);

        /// <summary>K2-lyhennys (8 s): vuoden 1499 linna → 1790-luvun varustukset kasvavat → ponttonisilta. Ei avainsanoja.</summary>
        public static readonly Historiajana K2Lyhyt = new Historiajana(new[]
        {
            new HistoriaVaihe(1499, 1.0, 0, 0),
            new HistoriaVaihe(1785, 4.5, 0, 0),
            new HistoriaVaihe(1805, 1.0, 0, 0),
            new HistoriaVaihe(1958, 1.5, 0, 0),
        }, 1970);
    }
}
