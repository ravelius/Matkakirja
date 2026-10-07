// KAUPUNKIKIERROS (Linssiseppä 5.10.2026; Lontoo-pilotti → Kööpenhamina ensin, omistaja 17.4x): käsikirjoitettu kameralento
// kaupungin yllä Cesium ionin datalla. Tämä on moottoriton osa: kierroksen data, ajoitus ja kameran asento ajan funktiona. Unity-osa
// (Cesium-tilesetit, esilataus, ääni, UI) on Linssit/Unity/KierrosSovitin.cs ja UI/Linssit/KierrosTaulu.cs.
//
// KAKSI AJOITUSTA:
//  - TEKSTI (ei ääntä): Odotus(0) → Pysahdys(0) → Lento(0→1) → Odotus(1) → … → Pysahdys(n−1) → Nousu → Valmis. Pysähdyksen kesto
//    tekstin pituudesta; odotus päättyy, kun laatat ovat valmiit tai aikaraja täyttyy.
//  - ÄÄNI (kertojan yksi otto, Päätoimittaja 5.10.): kello on äänen soittokohta. Kohteen nimen ensimmäinen esiintymä tekstissä
//    on kameran SAAPUMISHETKI (saapumiset[i], kohdistuksesta); lento i−1 → i päättyy tasan siihen. Ennen ensimmäistä saapumista
//    kamera on ensimmäisessä kohteessa (johdanto). Viimeisen jälkeen kierto jatkuu äänen loppuun ja sitten nousu.
// Pysähdyksessä kamera kiertää hitaasti, ja lento alkaa siitä asennosta, johon kierto jäi, joten mikään ei hyppää.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    /// <summary>Yksi pysähdys: katsottava kohde ja kameran kiertorata sen ympärillä.</summary>
    public sealed class Pysahdys
    {
        public string Id, Nimi, Alarivi, Teksti;
        /// <summary>Kohde (astetta) ja maaston korkeus ellipsoidista (m); katse osuu korkeuteen MaaM + NostoM.</summary>
        public double Lat, Lon, MaaM, NostoM;
        /// <summary>Kameran katsesuunta asteina pohjoisesta, kallistus asteina pystysuorasta (90 = vaaka) ja etäisyys (m).</summary>
        public double Suuntima, Kallistus, EtaisyysM;
        /// <summary>Korkean kohteen vähimmäisetäisyys (m), jolla koko kohde mahtuu kuvaan (OpasKuvaus.KorkeaEtaisyys); 0 = ei rajaa.
        /// Pysähdyksen lähemmäs-vaihe ja dolly eivät mene tätä lähemmäs.</summary>
        public double MinEtM;
        public double KatseKorkeusM => MaaM + NostoM;

        public static Pysahdys P(string id, string nimi, string alarivi, double lat, double lon, double maa, double nosto,
            double suuntima, double pitch, double etaisyys, string teksti = null) => new Pysahdys
        {
            Id = id, Nimi = nimi, Alarivi = alarivi, Lat = lat, Lon = lon, MaaM = maa, NostoM = nosto,
            Suuntima = suuntima, Kallistus = 90 + pitch, EtaisyysM = etaisyys, Teksti = teksti,
        };
    }

    /// <summary>Kaupunkikierroksen data: linssin tiedot, avausruutu, origo ja pysähdykset; ääni ja ajoitus ajossa ämpäristä.</summary>
    public sealed class Kierros
    {
        public LinssiTiedot Tiedot;
        /// <summary>Avausruudun nimi (versaalit) ja alarivi.</summary>
        public string Otsikko, Alaotsikko;
        /// <summary>Georeferenssin origo lennon ajaksi: reitin keskikohta (float-tarkkuus ~1 mm koko reitillä).</summary>
        public double OrigoLat, OrigoLon, OrigoKorkeusM;
        public Pysahdys[] Pysahdykset;
        /// <summary>Kertojan ääni ja saapumisajat ämpärissä (ämpärin juuri + polku): {"aani": "...mp3", "saapumiset": [s, …]}; null = vain teksti.</summary>
        public string AjoitusPolku;
    }

    public enum LentoVaihe { Odotus, Pysahdys, Lento, Nousu, Valmis }

    /// <summary>Lennon tila ajan funktiona. Paivita (teksti) tai PaivitaAanella (ääni) kerran kehyksessä; Asento tälle kehykselle.</summary>
    public sealed class KierrosLento
    {
        /// <summary>Pysähdyksen vähimmäiskesto (s) ja puhenopeus (sanaa/s, Williamin suomi ~2,3) + hengähdys lopussa.</summary>
        public const double PysahdysMinS = 18, SanaaSekunnissa = 2.3, HengahdysS = 2.0;
        /// <summary>Lennon kesto: perus + per km, rajattuna. Äänitilassa lento lyhenee, jos väli on lyhyt (enintään osuus välistä).</summary>
        public const double LentoPerusS = 6.5, LentoPerKmS = 1.4, LentoMinS = 8, LentoMaxS = 15, AaniLentoMinS = 3.5, AaniLentoOsuus = 0.6;
        /// <summary>Lennon kaari: etäisyyttä lisätään keskellä osuus × matka (rajattuna), jolloin kamera nousee yleiskuvaan.</summary>
        public const double KaariOsuus = 0.22, KaariMaxM = 1400;
        /// <summary>Laattojen odotus: vähintään (ettei vaihe välähdä) ja enintään (ei loputonta odotusta).</summary>
        public const double OdotusMinS = 0.4, OdotusMaxS = 8, AlkuOdotusMaxS = 20;
        /// <summary>Kierto pysähdyksessä (°/s) ja loppunousu (s, etäisyys × kerroin, kallistus kohti pystyä).</summary>
        public const double KiertoAsteS = 0.6, NousuS = 6, NousuKerroin = 3.2, NousuKallistus = 55;

        readonly IReadOnlyList<Pysahdys> reitti;
        public LentoVaihe Vaihe { get; private set; } = LentoVaihe.Odotus;
        /// <summary>Nykyinen pysähdys (Odotus/Pysahdys) tai lennon kohde (Lento).</summary>
        public int Indeksi { get; private set; }
        public double VaiheAika { get; private set; }
        public double VaiheKesto { get; private set; }
        public Kuvakulma Asento { get; private set; }
        /// <summary>Saapuminen pysähdykseen (nimi ruudulle, lokiin).</summary>
        public event Action<int> Saapui;

        double kierto;          // pysähdyksen kierto (°) suuntimaan
        Kuvakulma lahto;        // lennon tai nousun alkuasento
        double aaniLoppu;       // äänitila: nousun alku (äänen aika)
        int saapunut = -1;      // äänitila: viimeisin Saapui-tapahtuma

        public KierrosLento(IReadOnlyList<Pysahdys> reitti)
        {
            if (reitti == null || reitti.Count == 0) throw new ArgumentException("tyhjä reitti");
            this.reitti = reitti;
            Asento = PysahdysAsento(0, 0);
            AloitaVaihe(LentoVaihe.Odotus, AlkuOdotusMaxS);
        }

        public IReadOnlyList<Pysahdys> Reitti => reitti;
        public Pysahdys Nykyinen => reitti[Math.Min(Indeksi, reitti.Count - 1)];

        /// <summary>Pysähdyksen kesto tekstistä: sanat / puhenopeus + hengähdys, vähintään PysahdysMinS.</summary>
        public static double PysahdysKesto(string teksti)
        {
            int sanat = 0;
            if (!string.IsNullOrEmpty(teksti))
                foreach (var s in teksti.Split((char[])null, StringSplitOptions.RemoveEmptyEntries)) sanat++;
            return Math.Max(PysahdysMinS, sanat / SanaaSekunnissa + HengahdysS);
        }

        /// <summary>Lennon kesto kahden pysähdyksen välillä (kohteiden etäisyydestä).</summary>
        public static double LentoKesto(Pysahdys a, Pysahdys b)
        {
            double km = EtaisyysM(a.Lat, a.Lon, b.Lat, b.Lon) / 1000.0;
            return Math.Min(LentoMaxS, Math.Max(LentoMinS, LentoPerusS + LentoPerKmS * km));
        }

        /// <summary>Koko lennon arvioitu kesto tekstitilassa ilman laattojen odotusta (s).</summary>
        public double ArvioituKesto()
        {
            double s = NousuS;
            for (int i = 0; i < reitti.Count; i++)
            {
                s += PysahdysKesto(reitti[i].Teksti);
                if (i + 1 < reitti.Count) s += LentoKesto(reitti[i], reitti[i + 1]);
            }
            return s;
        }

        /// <summary>Pysähdyksen kamera-asento kierrolla (°) lisättynä suuntimaan.</summary>
        public Kuvakulma PysahdysAsento(int i, double kiertoAsteina)
        {
            var p = reitti[i];
            return new Kuvakulma(p.Lat, p.Lon, p.EtaisyysM, p.Kallistus, Kiedo(p.Suuntima + kiertoAsteina), p.KatseKorkeusM);
        }

        /// <summary>Napautus (tekstitila): pysähdyksestä heti seuraavaan lentoon (odotus ja lento eivät ohitu).</summary>
        public void Ohita()
        {
            if (Vaihe == LentoVaihe.Pysahdys) VaiheAika = VaiheKesto;
        }

        /// <summary>TEKSTITILA: etenee dt sekuntia. laatatValmiit = seuraavan näkymän laatat ladattu (odotus päättyy).</summary>
        public void Paivita(double dt, bool laatatValmiit)
        {
            if (Vaihe == LentoVaihe.Valmis) return;
            VaiheAika += Math.Max(0, dt);
            switch (Vaihe)
            {
                case LentoVaihe.Odotus:
                    Asento = PysahdysAsento(Indeksi, 0);
                    if ((laatatValmiit && VaiheAika >= OdotusMinS) || VaiheAika >= VaiheKesto)
                    {
                        kierto = 0;
                        AloitaVaihe(LentoVaihe.Pysahdys, PysahdysKesto(reitti[Indeksi].Teksti));
                        Saapui?.Invoke(Indeksi);
                    }
                    break;
                case LentoVaihe.Pysahdys:
                    kierto = KiertoAsteS * VaiheAika;
                    Asento = PysahdysAsento(Indeksi, kierto);
                    if (VaiheAika >= VaiheKesto)
                    {
                        lahto = Asento;
                        if (Indeksi + 1 < reitti.Count)
                        {
                            AloitaVaihe(LentoVaihe.Lento, LentoKesto(reitti[Indeksi], reitti[Indeksi + 1]));
                            Indeksi++;
                        }
                        else AloitaVaihe(LentoVaihe.Nousu, NousuS);
                    }
                    break;
                case LentoVaihe.Lento:
                {
                    double t = Math.Min(1, VaiheAika / VaiheKesto);
                    Asento = Lennossa(lahto, Indeksi, t);
                    if (t >= 1) AloitaVaihe(LentoVaihe.Odotus, OdotusMaxS);
                    break;
                }
                case LentoVaihe.Nousu:
                    PaivitaNousu();
                    break;
            }
        }

        /// <summary>Äänitilan lennon kesto välille i → i+1 (lyhenee lyhyellä välillä).</summary>
        public double AaniLento(int i, IReadOnlyList<double> saapumiset)
        {
            double vali = saapumiset[i + 1] - saapumiset[i];
            return Math.Max(Math.Min(AaniLentoMinS, vali), Math.Min(LentoKesto(reitti[i], reitti[i + 1]), AaniLentoOsuus * vali));
        }

        /// <summary>
        /// ÄÄNITILA: asento äänen soittokohdasta t (s). saapumiset[i] = kohteen i nimen ensimmäinen esiintymä; kesto = äänen
        /// pituus. Ennen saapumista 0 kamera on kohteessa 0 (johdanto); lento i−1 → i päättyy tasan saapumiseen i.
        /// </summary>
        public void PaivitaAanella(double t, IReadOnlyList<double> saapumiset, double kesto)
        {
            if (Vaihe == LentoVaihe.Valmis) return;
            if (Vaihe == LentoVaihe.Nousu) { VaiheAika = t - aaniLoppu; PaivitaNousu(); return; }
            int n = Math.Min(reitti.Count, saapumiset.Count);
            int i = 0;
            while (i + 1 < n && t >= saapumiset[i + 1]) i++;
            Indeksi = i;
            if (t >= saapumiset[0] && saapunut < i) { saapunut = i; Saapui?.Invoke(i); }
            double saapui = Math.Min(t, saapumiset[i]);
            if (i + 1 < n)
            {
                double lento = AaniLento(i, saapumiset), alku = saapumiset[i + 1] - lento;
                if (t >= alku && t >= saapumiset[0])
                {
                    var lahtoAsento = PysahdysAsento(i, KiertoAsteS * Math.Max(0, alku - saapumiset[i]));
                    Vaihe = LentoVaihe.Lento;
                    Indeksi = i + 1;
                    VaiheAika = t - alku; VaiheKesto = lento;
                    Asento = Lennossa(lahtoAsento, i + 1, (t - alku) / lento);
                    return;
                }
            }
            kierto = KiertoAsteS * Math.Max(0, t - saapui);
            Vaihe = t >= saapumiset[0] ? LentoVaihe.Pysahdys : LentoVaihe.Odotus;
            VaiheAika = t - saapui;
            VaiheKesto = i + 1 < n ? saapumiset[i + 1] - saapumiset[i] : Math.Max(0, kesto - saapumiset[i]);
            Asento = PysahdysAsento(i, kierto);
            if (i == n - 1 && t >= kesto)
            {
                lahto = Asento; aaniLoppu = t;
                AloitaVaihe(LentoVaihe.Nousu, NousuS);
            }
        }

        Kuvakulma Lennossa(Kuvakulma alku, int kohde, double t)
        {
            t = Math.Max(0, Math.Min(1, t));
            var loppu = PysahdysAsento(kohde, 0);
            double matka = EtaisyysM(alku.Lat, alku.Lon, loppu.Lat, loppu.Lon);
            double kaari = Math.Min(KaariMaxM, KaariOsuus * matka) * Math.Sin(Math.PI * t);
            return Valissa(alku, loppu, Smootherstep(t), kaari);
        }

        void PaivitaNousu()
        {
            double t = Math.Min(1, VaiheAika / VaiheKesto), s = Smootherstep(t);
            Asento = new Kuvakulma(lahto.Lat, lahto.Lon, lahto.EtaisyysM * (1 + (NousuKerroin - 1) * s),
                lahto.Kallistus + (NousuKallistus - lahto.Kallistus) * s, lahto.Suuntima + KiertoAsteS * VaiheAika, lahto.KatseKorkeusM);
            if (t >= 1) AloitaVaihe(LentoVaihe.Valmis, 0);
        }

        void AloitaVaihe(LentoVaihe v, double kesto)
        {
            Vaihe = v;
            VaiheAika = 0;
            VaiheKesto = kesto;
        }

        /// <summary>Kahden asennon välissä: kaikki kentät pehmeästi, suuntima lyhintä tietä, etäisyyteen kaari.</summary>
        public static Kuvakulma Valissa(Kuvakulma a, Kuvakulma b, double s, double kaariM)
        {
            double L(double x, double y) => x + (y - x) * s;
            double ds = Kiedo(b.Suuntima - a.Suuntima);
            return new Kuvakulma(L(a.Lat, b.Lat), L(a.Lon, b.Lon), L(a.EtaisyysM, b.EtaisyysM) + kaariM, L(a.Kallistus, b.Kallistus),
                Kiedo(a.Suuntima + ds * s), L(a.KatseKorkeusM, b.KatseKorkeusM));
        }

        /// <summary>Kulma välille −180…180.</summary>
        public static double Kiedo(double a)
        {
            a %= 360;
            if (a > 180) a -= 360;
            if (a <= -180) a += 360;
            return a;
        }

        public static double Smootherstep(double t)
        {
            t = Math.Max(0, Math.Min(1, t));
            return t * t * t * (t * (6 * t - 15) + 10);
        }

        /// <summary>Isoympyräetäisyys (m), pallo R = 6 371 km.</summary>
        public static double EtaisyysM(double lat1, double lon1, double lat2, double lon2)
        {
            const double R = 6371000, r = Math.PI / 180;
            double dLat = (lat2 - lat1) * r, dLon = (lon2 - lon1) * r;
            double h = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) + Math.Cos(lat1 * r) * Math.Cos(lat2 * r) * Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            return 2 * R * Math.Asin(Math.Min(1, Math.Sqrt(h)));
        }

        /// <summary>Ajoitus-JSON (MiniJson-sanakirja): {"aani": "...", "saapumiset": [s, …]}, nousevat ajat.</summary>
        public static bool LueAjoitus(IDictionary<string, object> json, out string aani, out double[] saapumiset)
        {
            aani = null; saapumiset = null;
            if (json == null) return false;
            aani = json.TryGetValue("aani", out var a) ? a as string : null;
            if (!json.TryGetValue("saapumiset", out var s) || !(s is IList<object> lista) || lista.Count == 0) return false;
            var t = new double[lista.Count];
            for (int i = 0; i < lista.Count; i++)
            {
                t[i] = Convert.ToDouble(lista[i], System.Globalization.CultureInfo.InvariantCulture);
                if (i > 0 && t[i] < t[i - 1]) return false;
            }
            saapumiset = t;
            return !string.IsNullOrEmpty(aani);
        }
    }
}
