// ELÄVÄ KARTTA, "ISOISÄN MUSTE": saapumisen koreografia yhtenä aikajanana (Linssiseppä 26.9.2026).
//
// Käsikirjoitus: pelin repo docs/raportit/elava-kartta-kasikirjoitus-20260926.md (Fable hyväksyi 26.9. klo 00.4x
// korjauksella: maakunnat syttyvät ETÄISYYSJÄRJESTYKSESSÄ saapumiskaupungista, koska kaanonissa ei ole kiinteää
// 1873-reittiä). Raamattu ELÄVÄ KARTTA — ISOISÄN MUSTE. Suunnitelma docs/raportit/elava-kartta-suunnitelma-20260926.md.
//
// PUHDAS YDIN: kohtaus lasketaan kerran syötteistä (saapumiskaupunki, maakunnat renkaineen, joet, nostot kokoluokkineen,
// laivareitti, kuljettu reitti), ja jokaisen vaiheen tila kysytään ajan funktiona (sekunteja kohtauksen alusta). Unity-
// puoli (Linssit/Unity/ElavaKartta.cs) vain piirtää tilan, joten kohtauksen voi pysäyttää mihin kohtaan tahansa
// (pysäytyskuvat) ja se testataan ilman editoria (Linssit-testit/Testit/ElavaKarttaTestit.cs).
//
// VAIHEET (s)   0,0–1,0 saapuminen (lennon loppu Ateenan ylle) | 1,0–3,5 huntu kuivuu Ateenasta ulospäin
//               2,0–4,5 joet ja maakuntarajat kynällä | 4,0–5,5 maakunnat syttyvät etäisyysjärjestyksessä
//               5,0–6,5 nostot putoavat musteläikkinä luokittain | 5,5–8,0 aamuaurinko ja kallistettu kierto
//               8,0–11,5 maakunta herää (napautus, väri valuu, käsialanimi, löydösmerkit) | 11,5–14,5 elävä hetki (laiva)
//               14,5–18,0 kirjoitettu maailma (vetäytyminen hämärään, reitti kynänjälkenä, käydyt kaupungit hehkuvat) + pito
//
// RAJAPINNAT, joiden paikalla on nyt paikkamerkki (Natiiviseppä tekee pallon puolen, muut datana):
//   Paljastus(keskus, säde, t)  ← HuntuSadeKm         Viivapiirto(kerros, osuus) ← Piirtoviiva.Osuus
//   Maakuntavari(id, t)         ← MaakunnanPeitto/Tulva   Aurinko(atsimuutti, korkeus) ← Aurinko
//   Yovalot(maski käydyt)       ← ValonVoima          Boidit / laiva ← Laiva, Savu
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Kamera;

namespace Matkakirja.Linssit.Elava
{
    public sealed class ElavaKohtaus
    {
        // ── Ajat (käsikirjoitus) ──────────────────────────────────────────
        public const double SaapuminenLoppu = 1.0;
        public const double HuntuAlku = 1.0, HuntuLoppu = 3.5;
        public const double ViivatAlku = 2.0, ViivatLoppu = 4.5;
        public const double RajanKesto = 0.35, JoenKestoMin = 0.6, JoenKestoMax = 1.2, JokiVali = 0.15;
        public const double MaakunnatAlku = 4.0, MaakuntaVali = 0.12, MaakuntienKesto = 1.1, MaakunnanTaytto = 0.4;
        public const double NostotAlku = 5.0, NostotLoppu = 6.5;
        public const double AurinkoAlku = 5.5, AurinkoLoppu = 8.0;
        /// <summary>
        /// Muut maakunnat asettuvat paperiksi ennen heräämistä (käsikirjoituksen tulkinta: kaikki syttyvät saapuessa, mutta
        /// "maakunta on tasaista paperia, kunnes sen ensimmäinen nosto löytyy", suunnitelma kohta 3).
        /// </summary>
        public const double AsettuminenAlku = 6.5, AsettuminenLoppu = 7.8, AsettunutOsuus = 0.4;
        public const double HerataAlku = 8.0, HerataLoppu = 11.5;
        public const double NapautusKesto = 0.35, TulvaAlku = 8.1, TulvaKesto = 0.8, TulvaValmisKesto = 0.3;
        public const double NimiAlku = 8.6, NimiKesto = 1.2, MerkitAlku = 9.8, MerkitKesto = 0.3;
        public const double HetkiAlku = 11.5, HetkiLoppu = 14.5, LaivanHaive = 0.3;
        public const double SavuVali = 0.12, SavunIka = 1.6;
        public const double MaailmaAlku = 14.5, MaailmaLoppu = 18.0, Pito = 0.5;
        public const double ReittiAlku = 14.8, ReitinKesto = 2.2, ValonHaive = 0.6;
        public const double Kesto = MaailmaLoppu + Pito;

        /// <summary>
        /// Aamuaurinko: matala itä → etelä (atsimuutti pohjoisesta myötäpäivään, korkeus asteina). Muutettavissa ajossa
        /// (komento "elava saato aamukorkeus 10"), jotta valo viritetään ilman käännöstä.
        /// </summary>
        public static double AamuAtsimuutti = 80, AamuKorkeus = 12, PaivaAtsimuutti = 160, PaivaKorkeus = 30;
        /// <summary>Hunnun alkusäde (vain Ateena näkyy) ja reunan leveys kilometreinä.</summary>
        public const double HuntuAlkuKm = 25, HuntuReunaKm = 60;
        public const double KmAsteella = 111.195;

        // ── Syötteet ja johdetut ─────────────────────────────────────────
        public readonly LatLon Keskus;
        public readonly IReadOnlyList<ElavaMaakunta> Maakunnat;
        /// <summary>Maakuntien syttymishetket (indeksi = Maakunnat) ja järjestys (etäisyys saapumiskaupungista).</summary>
        public readonly double[] Sytytys;
        public readonly int[] Jarjestys;
        public readonly List<Piirtoviiva> Rajat = new List<Piirtoviiva>();
        public readonly List<Piirtoviiva> Joet = new List<Piirtoviiva>();
        public readonly List<Pudotus> Nostot = new List<Pudotus>();
        public readonly int Heraava = -1, Napautus = -1;
        public readonly LatLon TulvaKeskus, NimenPaikka;
        public readonly double HuntuMaxKm, TulvaMaxKm;
        public readonly int HeraavanNostoja;
        public readonly Piirtoviiva Laiva;
        public readonly Piirtoviiva Reitti;
        public readonly List<(string Nimi, LatLon Paikka, double Alku, double Voima)> Valot = new List<(string, LatLon, double, double)>();
        public readonly Kamerapolku Kamera;
        public readonly double AlkuAtsimuutti, AlkuKorkeus;
        /// <summary>Tempo: video (käsikirjoitus 18,5 s) tai saapuminen (pelattava kohta 1, ≤ 5 s).</summary>
        public readonly ElavaProfiili P;
        readonly List<(double T, double Atsimuutti, double Korkeus)> aurinko;

        /// <summary>Kohtauksen kesto profiilin mukaan (video <see cref="Kesto"/>).</summary>
        public double KestoS => P.Kesto;

        public ElavaKohtaus(LatLon keskus, IReadOnlyList<ElavaMaakunta> maakunnat, IReadOnlyList<ElavaJoki> joet,
            IReadOnlyList<ElavaNosto> nostot, string heraavaId, string napautusId, IReadOnlyList<LatLon> laivareitti,
            IReadOnlyList<(string Nimi, LatLon Paikka)> kuljettu, double kokoPallonEtaisyysM,
            double alkuAtsimuutti = 315, double alkuKorkeus = 35, ElavaProfiili profiili = null)
        {
            P = profiili ?? ElavaProfiili.Video;
            Keskus = keskus;
            Maakunnat = maakunnat ?? Array.Empty<ElavaMaakunta>();
            AlkuAtsimuutti = alkuAtsimuutti;
            AlkuKorkeus = alkuKorkeus;
            int n = Maakunnat.Count;

            // Maakunnat syttyvät etäisyysjärjestyksessä (Fable 26.9.: ei reittiä, kaupungit missä järjestyksessä tahansa).
            var etaisyydet = Maakunnat.Select(m => Maakuntarajat.Etaisyys(keskus, m)).ToArray();
            Jarjestys = Enumerable.Range(0, n).OrderBy(i => etaisyydet[i]).ThenBy(i => Maakunnat[i].Id, StringComparer.Ordinal).ToArray();
            Sytytys = new double[n];
            double vali = n > 0 ? Math.Min(P.MaakuntaVali, P.MaakuntienKesto / n) : 0;
            for (int k = 0; k < n; k++) Sytytys[Jarjestys[k]] = P.MaakunnatAlku + k * vali;

            // Maakuntarajat kynällä keskuksesta ulospäin, jokainen RajanKesto; alkuhetket jaettu ikkunaan.
            var rajat = Maakuntarajat.Sisarajat(Maakunnat).Select(r => Maakuntarajat.Keskuksesta(keskus, r))
                .OrderBy(r => r.Etaisyys).ToList();
            double rajaVali = rajat.Count > 1 ? Math.Min(P.RajanKesto, (P.ViivatLoppu - P.ViivatAlku - P.RajanKesto) / (rajat.Count - 1)) : 0;
            for (int k = 0; k < rajat.Count; k++)
                Rajat.Add(new Piirtoviiva("raja " + k, rajat[k].Pisteet) { Alku = P.ViivatAlku + k * rajaVali, Kesto = P.RajanKesto });

            // Joet lähimmästä alkaen (lähin piste), kesto pituuden mukaan.
            var jl = (joet ?? Array.Empty<ElavaJoki>()).Where(j => j.Pisteet.Length > 1)
                .Select(j => (j, e: j.Pisteet.Min(p => Kameramatikka.KulmaAsteina(keskus, p)))).OrderBy(x => x.e).ToList();
            double pisin = jl.Count > 0 ? jl.Max(x => new Piirtoviiva(x.j.Nimi, x.j.Pisteet).Pituus) : 1;
            double jokiVali = jl.Count > 1 ? Math.Min(P.JokiVali, (P.ViivatLoppu - P.ViivatAlku - P.JoenKestoMax) / (jl.Count - 1)) : 0;
            for (int k = 0; k < jl.Count; k++)
            {
                var v = new Piirtoviiva(jl[k].j.Nimi, jl[k].j.Pisteet);
                v.Alku = P.ViivatAlku + k * jokiVali;
                v.Kesto = P.JoenKestoMin + (P.JoenKestoMax - P.JoenKestoMin) * (pisin > 0 ? v.Pituus / pisin : 1);
                Joet.Add(v);
            }

            // Hunnun suurin säde: kauimmainen kärki (km) + reuna, jotta huntu kuivuu kokonaan.
            double kauin = 0;
            foreach (var m in Maakunnat) foreach (var r in m.Renkaat) foreach (var q in r) kauin = Math.Max(kauin, Kameramatikka.KulmaAsteina(keskus, q));
            HuntuMaxKm = kauin * KmAsteella + HuntuReunaKm;

            // Heräävä maakunta ja napautettava nosto.
            for (int i = 0; i < n; i++) if (Maakunnat[i].Id == heraavaId) Heraava = i;
            if (Heraava < 0 && heraavaId != null) for (int i = 0; i < n; i++) if (etaisyydet[i] == 0) { Heraava = i; break; }

            // Nostot luokittain (pääkohteet ensin), luokan sisällä keskuksesta ulospäin.
            var lista = (nostot ?? Array.Empty<ElavaNosto>()).ToList();
            var ikkunat = P.NostoIkkunat;
            foreach (Kokoluokka luokka in new[] { Kokoluokka.Paakohde, Kokoluokka.Kohde, Kokoluokka.Pieni })
            {
                var ryhma = lista.Where(x => x.Luokka == luokka).OrderBy(x => Kameramatikka.KulmaAsteina(keskus, x.Paikka))
                    .ThenBy(x => x.Id, StringComparer.Ordinal).ToList();
                var (a, b, kesto) = ikkunat[(int)luokka];
                for (int k = 0; k < ryhma.Count; k++)
                {
                    int maakunta = -1;
                    for (int i = 0; i < n && maakunta < 0; i++) if (Maakuntarajat.Sisalla(ryhma[k].Paikka, Maakunnat[i])) maakunta = i;
                    Nostot.Add(new Pudotus { Nosto = ryhma[k], Alku = a + (b - a) * k / Math.Max(1, ryhma.Count), Kesto = kesto, Maakunta = maakunta });
                }
            }
            if (Heraava >= 0)
            {
                HeraavanNostoja = Nostot.Count(x => x.Maakunta == Heraava);
                Napautus = Nostot.FindIndex(x => x.Nosto.Id == napautusId && x.Maakunta == Heraava);
                if (Napautus < 0) Napautus = Nostot.FindIndex(x => x.Maakunta == Heraava);
                var hm = Maakunnat[Heraava];
                TulvaKeskus = Napautus >= 0 ? Nostot[Napautus].Nosto.Paikka : hm.Keskus;
                NimenPaikka = hm.Keskus;
                // Tulva kattaa napautuksen renkaan (Attikan manner); saaret täyttyvät lopuksi (TulvaValmis).
                var rengas = hm.Renkaat.FirstOrDefault(r => Maakuntarajat.Sisalla(TulvaKeskus, r))
                    ?? hm.Renkaat.OrderByDescending(r => r.Length).FirstOrDefault();
                TulvaMaxKm = rengas == null ? 50 : rengas.Max(q => Kameramatikka.KulmaAsteina(TulvaKeskus, q)) * KmAsteella + 5;
            }

            // Elävä hetki: laiva.
            Laiva = new Piirtoviiva("laiva", (laivareitti ?? Array.Empty<LatLon>()).ToArray()) { Alku = HetkiAlku, Kesto = HetkiLoppu - HetkiAlku };

            // Kirjoitettu maailma: reitti isoympyröinä (0,5° välein), ja kaupunki syttyy, kun kynä saavuttaa sen.
            var kaupungit = (kuljettu ?? Array.Empty<(string, LatLon)>()).ToList();
            var reitti = new List<LatLon>();
            var kaupunginMatka = new List<double>();
            double matka = 0;
            for (int i = 0; i < kaupungit.Count; i++)
            {
                if (i == 0) { reitti.Add(kaupungit[0].Paikka); kaupunginMatka.Add(0); continue; }
                var a = kaupungit[i - 1].Paikka; var b = kaupungit[i].Paikka;
                double kulma = Kameramatikka.KulmaAsteina(a, b);
                int osia = Math.Max(1, (int)Math.Ceiling(kulma / 0.5));
                for (int s = 1; s <= osia; s++) reitti.Add(Kameramatikka.IsoympyranPiste(a, b, (double)s / osia));
                matka += kulma;
                kaupunginMatka.Add(matka);
            }
            Reitti = new Piirtoviiva("reitti", reitti.ToArray()) { Alku = ReittiAlku, Kesto = ReitinKesto };
            for (int i = 0; i < kaupungit.Count; i++)
            {
                double u = Reitti.Pituus > 0 ? kaupunginMatka[i] / Reitti.Pituus : 1;
                Valot.Add((kaupungit[i].Nimi, kaupungit[i].Paikka, HetkiKynalle(Reitti, u), i == kaupungit.Count - 1 ? 1.0 : 0.72));
            }

            aurinko = P.AurinkoPolku(alkuAtsimuutti, alkuKorkeus);
            // Saapumisessa kamera on pelin saapumisajo (Natiivisepän), joten polku on vain paikallaan pysyvä asento.
            Kamera = P.Kamera ? new Kamerapolku(Avaimet(kokoPallonEtaisyysM, kaupungit.Select(k => k.Paikka).ToList()))
                : new Kamerapolku(new[] { new Avainasento(0, new Asento(keskus, 1_000_000, 0, 0), null, "pelin saapumisajo") });
        }

        /// <summary>Hetki, jolloin viivan piirto saavuttaa osuuden u (Piirtoviiva.Osuus on pehmeä, joten käännetään puolitushaulla).</summary>
        static double HetkiKynalle(Piirtoviiva v, double u)
        {
            double a = 0, b = 1;
            for (int i = 0; i < 40; i++) { double c = (a + b) / 2; if (ElavaKayrat.Pehmea(c) < u) a = c; else b = c; }
            return v.Alku + v.Kesto * (a + b) / 2;
        }

        /// <summary>Maan painopiste (renkaiden pinta-alalla painotettu, cos(lat)).</summary>
        LatLon MaanKeskus()
        {
            double sx = 0, sy = 0, sw = 0;
            foreach (var m in Maakunnat)
                foreach (var r in m.Renkaat)
                {
                    var c = Maakuntarajat.Painopiste(r);
                    double w = Math.Abs(Ala(r)) * Math.Cos(c.Lat * Math.PI / 180);
                    sx += c.Lon * w; sy += c.Lat * w; sw += w;
                }
            return sw > 0 ? new LatLon(sy / sw, sx / sw) : Keskus;
        }

        static double Ala(LatLon[] r)
        {
            double a = 0;
            for (int i = 0, j = r.Length - 1; i < r.Length; j = i++) a += r[j].Lon * r[i].Lat - r[i].Lon * r[j].Lat;
            return a / 2;
        }

        List<Avainasento> Avaimet(double kokoPallo, List<LatLon> kaupungit)
        {
            const double Km = 1000;
            var kehys = Kameramatikka.IsoympyranPiste(Keskus, MaanKeskus(), 0.5);
            var attika = Heraava >= 0 ? NimenPaikka : Keskus;
            var laivalla = Laiva.Pisteet.Length > 1 ? Laiva.Piste(0.62) : attika;
            var seuranta = Kameramatikka.IsoympyranPiste(attika, laivalla, 0.8);
            // Kirjoitettu maailma: reitin laatikon keskelle, koko pallo ruutuun (katto ei rajoita: PalloKierto.Kuvaa).
            var maailma = kaupungit.Count > 0
                ? new LatLon((kaupungit.Min(k => k.Lat) + kaupungit.Max(k => k.Lat)) / 2, (kaupungit.Min(k => k.Lon) + kaupungit.Max(k => k.Lon)) / 2)
                : Keskus;
            var jarruttava = ElavaKayrat.Kayralle(Kayra.Jarruttava);
            var kuminauha = ElavaKayrat.Kayralle(Kayra.Kuminauha, 0.6);
            Func<double, double> pehmea = ElavaKayrat.Pehmea;
            Func<double, double> liuku = t => ElavaKayrat.Liuku(t, 0.3);
            return new List<Avainasento>
            {
                new Avainasento(0.0, new Asento(Keskus, 1450 * Km, 8, 0), pehmea, "lennon loppu"),
                new Avainasento(SaapuminenLoppu, new Asento(Keskus, 1200 * Km, 15, 0), jarruttava, "pysähtyy"),
                new Avainasento(ViivatAlku, new Asento(Keskus, 1200 * Km, 15, 0), pehmea, "pito"),
                new Avainasento(ViivatLoppu, new Asento(kehys, 1000 * Km, 18, 0), pehmea, "kevyt lähestyminen"),
                new Avainasento(AurinkoAlku, new Asento(kehys, 1000 * Km, 18, 0), pehmea, "pito"),
                new Avainasento(AurinkoLoppu, new Asento(attika, 900 * Km, 35, 20), pehmea, "kallistettu kierto"),
                new Avainasento(9.6, new Asento(attika, 700 * Km, 38, 24), kuminauha, "kuminauha Attikaan"),
                new Avainasento(HerataLoppu, new Asento(attika, 690 * Km, 38, 27), pehmea, "hengitys"),
                new Avainasento(HetkiLoppu, new Asento(seuranta, 700 * Km, 38, 30), pehmea, "laivan seuranta"),
                new Avainasento(MaailmaLoppu, new Asento(maailma, Math.Max(3000 * Km, kokoPallo), 0, 0), liuku, "vetäytyminen"),
                new Avainasento(Kesto, new Asento(maailma, Math.Max(3000 * Km, kokoPallo), 0, 0), pehmea, "pito"),
            };
        }

        // ── Tila ajan funktiona ──────────────────────────────────────────

        static double U(double t, double alku, double kesto) => kesto <= 0 ? (t >= alku ? 1 : 0) : ElavaKayrat.Rajaa((t - alku) / kesto);

        /// <summary>Hunnun paljastussäde (km) saapumiskaupungista; ≥ HuntuMaxKm = kuivunut kokonaan.</summary>
        public double HuntuSadeKm(double t)
        {
            if (t <= P.HuntuAlku) return HuntuAlkuKm;
            return HuntuAlkuKm + (HuntuMaxKm - HuntuAlkuKm) * ElavaKayrat.Hidastuva(U(t, P.HuntuAlku, P.HuntuLoppu - P.HuntuAlku), 1.8);
        }

        /// <summary>Kuivumisreunan tummuus 0–1 (vesiraja): vain kun reuna liikkuu.</summary>
        public double Vesiraja(double t) => t < P.HuntuAlku ? 0 : 1 - ElavaKayrat.Pehmea(U(t, P.HuntuLoppu - 0.4, 0.4));

        public bool HuntuNakyy(double t) => t < P.HuntuLoppu + 0.05;

        /// <summary>Omien kerrosten peitto: 1, ja saapumisen lopussa häivytys pelin pysyviin kerroksiin (luovutus).</summary>
        public double KerrostenPeitto(double t) =>
            t < P.LuovutusAlku ? 1 : 1 - ElavaKayrat.Pehmea(U(t, P.LuovutusAlku, P.Kesto - P.LuovutusAlku));

        /// <summary>Maakunnan täytön kerroin 0–1 paletin peitolle (heräävä erikseen: <see cref="Tulva"/>).</summary>
        public double MaakunnanPeitto(int i, double t)
        {
            double syty = ElavaKayrat.Hidastuva(U(t, Sytytys[i], P.MaakunnanTaytto), 2);
            return syty * (1 - (1 - P.AsettunutOsuus) * Asettuminen(t));
        }

        public double Asettuminen(double t) =>
            double.IsNaN(P.AsettuminenAlku) ? 0 : ElavaKayrat.Pehmea(U(t, P.AsettuminenAlku, P.AsettuminenLoppu - P.AsettuminenAlku));

        /// <summary>Heräävän maakunnan värin valuminen: säde km napautuksesta ja valmis-osuus (saaret täyttyvät lopuksi).</summary>
        public (double SadeKm, double Valmis) Tulva(double t) =>
            (TulvaMaxKm * ElavaKayrat.Hidastuva(U(t, TulvaAlku, TulvaKesto), 1.6), ElavaKayrat.Pehmea(U(t, TulvaAlku + TulvaKesto, TulvaValmisKesto)));

        /// <summary>Napautuksen rengas: säde km ja peitto (0 = ei näy).</summary>
        public (double SadeKm, double Peitto) NapautusRengas(double t)
        {
            double u = U(t, HerataAlku, NapautusKesto);
            if (t < HerataAlku || u >= 1) return (0, 0);
            return (4 + 22 * ElavaKayrat.Hidastuva(u, 2), 1 - u);
        }

        public double NimiOsuus(double t) => ElavaKayrat.Liuku(U(t, NimiAlku, NimiKesto), 0.12);

        /// <summary>Löydösmerkkien leima: mittakaava (1,5 → 1) ja peitto.</summary>
        public (double Mittakaava, double Peitto) Merkit(double t)
        {
            if (t < MerkitAlku) return (1.5, 0);
            double u = U(t, MerkitAlku, MerkitKesto);
            return (1.5 - 0.5 * ElavaKayrat.Hidastuva(u, 3), Math.Min(1, u * 2.5));
        }

        /// <summary>
        /// Noston musteläikkä: mittakaava (pudotuksessa jousi yli 1:n) ja peitto (löytämätön himmeä jälki, löydetty täysi),
        /// sekä roiskerenkaan osuus (0–1 laajenemisesta, 1 = poissa).
        /// </summary>
        public (double Mittakaava, double Peitto, double Roiske) Nosto(int i, double t)
        {
            var p = Nostot[i];
            double u = U(t, p.Alku, p.Kesto);
            if (t < p.Alku) return (0, 0, 1);
            // easeOutBack: pisara osuu ja leviää hieman yli, sitten asettuu.
            double c1 = 1.7, c3 = c1 + 1, v = u - 1;
            double mitta = 1 + c3 * v * v * v + c1 * v * v;
            double peitto = Math.Min(1, u * 3) * (p.Nosto.Luokka == Kokoluokka.Paakohde ? 0.62 : 0.5);
            if (i == Napautus && t >= HerataAlku)
            {
                double w = ElavaKayrat.Pehmea(U(t, HerataAlku, 0.25));
                peitto += (0.95 - peitto) * w;
                mitta *= 1 + 0.18 * w;
            }
            double roiske = ElavaKayrat.Rajaa((t - p.Alku) / (p.Kesto + 0.25));
            return (mitta, peitto, roiske);
        }

        public double Aurinko(double t, out double korkeus)
        {
            var k = aurinko;
            double a = k[0].Atsimuutti, e = k[0].Korkeus;
            for (int i = 1; i < k.Count; i++)
            {
                if (t < k[i - 1].T) break;
                double w = ElavaKayrat.Pehmea(U(t, k[i - 1].T, k[i].T - k[i - 1].T));
                a = Kulma(k[i - 1].Atsimuutti, k[i].Atsimuutti, w);
                e = k[i - 1].Korkeus + (k[i].Korkeus - k[i - 1].Korkeus) * w;
            }
            korkeus = e;
            return (a % 360 + 360) % 360;
        }

        static double Kulma(double a, double b, double w)
        {
            double d = ((b - a) % 360 + 540) % 360 - 180;
            return a + d * w;
        }

        /// <summary>Laiva: näkyy, paikka, kulkusuunta (atsimuutti) ja peitto.</summary>
        public (bool Nakyy, LatLon Paikka, double Suunta, double Peitto) LaivanTila(double t)
        {
            if (Laiva.Pisteet.Length < 2 || t < HetkiAlku || t > HetkiLoppu) return (false, default, 0, 0);
            double u = ElavaKayrat.Liuku(U(t, HetkiAlku, HetkiLoppu - HetkiAlku), 0.25);
            var p = Laiva.Piste(u);
            var q = Laiva.Piste(Math.Min(1, u + 0.02));
            if (u >= 0.98) { p = Laiva.Piste(0.98); q = Laiva.Piste(1); }
            double peitto = Math.Min(U(t, HetkiAlku, LaivanHaive), 1 - U(t, HetkiLoppu - LaivanHaive, LaivanHaive));
            return (true, Laiva.Piste(u), Suunta(p, q), peitto);
        }

        /// <summary>Savupuhallukset hetkellä t: syntyhetki, syntypaikka, laivan suunta ja ikä (s).</summary>
        public IEnumerable<(double Synty, LatLon Paikka, double Suunta, double Ika)> Savu(double t)
        {
            if (Laiva.Pisteet.Length < 2) yield break;
            for (double s = HetkiAlku + 0.05; s <= Math.Min(t, HetkiLoppu - LaivanHaive); s += SavuVali)
            {
                double ika = t - s;
                if (ika > SavunIka) continue;
                var tila = LaivanTila(s);
                if (tila.Nakyy) yield return (s, tila.Paikka, tila.Suunta, ika);
            }
        }

        /// <summary>Atsimuutti a → b asteina (pohjoisesta myötäpäivään).</summary>
        public static double Suunta(LatLon a, LatLon b)
        {
            double r = Math.PI / 180, la1 = a.Lat * r, la2 = b.Lat * r, d = (b.Lon - a.Lon) * r;
            double y = Math.Sin(d) * Math.Cos(la2), x = Math.Cos(la1) * Math.Sin(la2) - Math.Sin(la1) * Math.Cos(la2) * Math.Cos(d);
            return (Math.Atan2(y, x) / r + 360) % 360;
        }

        /// <summary>Pallon hämärä 0–1 kirjoitetussa maailmassa.</summary>
        public double Hamara(double t) => ElavaKayrat.Pehmea(U(t, MaailmaAlku, 3.1));

        /// <summary>Käydyn kaupungin valo 0–1 (syttyy, kun kynä saavuttaa sen).</summary>
        public double ValonVoima(int i, double t) => Valot[i].Voima * ElavaKayrat.Hidastuva(U(t, Valot[i].Alku, ValonHaive), 2);

        public Asento KameranAsento(double t) => Kamera.Asento(t);

        /// <summary>Käynnissä olevat vaiheet lokiin.</summary>
        public string Vaihe(double t)
        {
            var v = new List<string>();
            if (P.Kamera && t < SaapuminenLoppu) v.Add("saapuminen");
            if (t >= P.HuntuAlku && t < P.HuntuLoppu) v.Add("huntu kuivuu");
            if (t >= P.ViivatAlku && t < P.ViivatLoppu) v.Add("joet ja rajat");
            if (t >= P.MaakunnatAlku && t < P.MaakunnatAlku + P.MaakuntienKesto + P.MaakunnanTaytto) v.Add("maakunnat syttyvät");
            if (t >= P.NostoIkkunat[0].Alku && t < P.NostoIkkunat[2].Loppu + P.NostoIkkunat[2].Kesto) v.Add("nostot putoavat");
            if (P.Kamera)
            {
                if (t >= AurinkoAlku && t < AurinkoLoppu) v.Add("aamuaurinko");
                if (t >= HerataAlku && t < HerataLoppu) v.Add("maakunta herää");
                if (t >= HetkiAlku && t < HetkiLoppu) v.Add("elävä hetki");
                if (t >= MaailmaAlku && t < MaailmaLoppu) v.Add("kirjoitettu maailma");
                if (t >= MaailmaLoppu) v.Add("pito");
            }
            else if (t >= P.LuovutusAlku) v.Add("luovutus pysyville kerroksille");
            return string.Join(" + ", v);
        }
    }
}
