// LONTOO-PILOTTI vaihe 1 (Päätoimittaja 5.10.2026, omistaja 16.3x; Linssiseppä): käsikirjoitettu kameralento Lontoon yllä
// Cesium ionin datalla (World Terrain, Bing Aerial, OSM Buildings). Tämä tiedosto on moottoriton osa: reitti, ajoitus ja
// kameran asento ajan funktiona. Unity-osa (Cesium-tilesetit, esilataus, UI) on Linssit/Unity/LontooSovitin.cs.
//
// Pysähdykset: docs/raportit/lontoo-pysahdykset-20261005.md (kehystys CesiumJS-esikatselussa, maaston korkeus World
// Terrainista); kertojan tekstit docs/raportit/lontoo-kertojatekstit-20261005.md (Päätoimittaja 13.1x). Ääniä ei vielä ole:
// pysähdyksen kesto lasketaan tekstin pituudesta, ja kun ääni tulee, pysähdys venyy sen mittaiseksi (linnan jaksomalli).
//
// Vaiheet: Odotus(0) → Pysahdys(0) → Lento(0→1) → Odotus(1) → Pysahdys(1) → … → Pysahdys(6) → Nousu → Valmis.
// Odotus päättyy, kun laatat ovat valmiit (sovitin kertoo) tai aikaraja täyttyy. Pysähdyksessä kamera kiertää hitaasti
// (ei jäätynyttä kuvaa), ja seuraava lento alkaa siitä asennosta, johon kierto jäi, joten mikään ei hyppää.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Lontoo
{
    /// <summary>Yksi pysähdys: katsottava kohde ja kameran kiertorata sen ympärillä.</summary>
    public sealed class Pysahdys
    {
        public string Id, Nimi, Alarivi, Teksti;
        /// <summary>Kohde (astetta) ja maaston korkeus ellipsoidista (m, World Terrain); katse osuu korkeuteen MaaM + NostoM.</summary>
        public double Lat, Lon, MaaM, NostoM;
        /// <summary>Kameran katsesuunta asteina pohjoisesta, kallistus asteina pystysuorasta (90 = vaaka) ja etäisyys (m).</summary>
        public double Suuntima, Kallistus, EtaisyysM;
        public double KatseKorkeusM => MaaM + NostoM;
    }

    public enum LentoVaihe { Odotus, Pysahdys, Lento, Nousu, Valmis }

    /// <summary>Lennon tila ajan funktiona. Paivita kerran kehyksessä; Asento on kameran asento tälle kehykselle.</summary>
    public sealed class LontooLento
    {
        /// <summary>Pysähdyksen vähimmäiskesto (s) ja puhenopeus (sanaa/s, Williamin suomi ~2,3) + hengähdys lopussa.</summary>
        public const double PysahdysMinS = 18, SanaaSekunnissa = 2.3, HengahdysS = 2.0;
        /// <summary>Lennon kesto: perus + per km, rajattuna (suunnitelma: lähestyminen 8–14 s).</summary>
        public const double LentoPerusS = 6.5, LentoPerKmS = 1.4, LentoMinS = 8, LentoMaxS = 15;
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
        /// <summary>Pysähdyksen ulkoinen vähimmäiskesto (kertojan ääni, s); 0 = vain tekstin arvio.</summary>
        public Func<int, double> AanenKesto;
        /// <summary>Saapuminen pysähdykseen (kertoja ja nimi alkavat).</summary>
        public event Action<int> Saapui;

        double kierto;          // pysähdyksen kierto (°) suuntimaan
        Kuvakulma lahto;        // lennon alkuasento

        public LontooLento(IReadOnlyList<Pysahdys> reitti)
        {
            if (reitti == null || reitti.Count == 0) throw new ArgumentException("tyhjä reitti");
            this.reitti = reitti;
            Asento = PysahdysAsento(0, 0);
            AloitaVaihe(LentoVaihe.Odotus, AlkuOdotusMaxS);
        }

        public IReadOnlyList<Pysahdys> Reitti => reitti;
        public Pysahdys Nykyinen => reitti[Math.Min(Indeksi, reitti.Count - 1)];
        /// <summary>Kertojan teksti ruudulle (vain pysähdyksessä), muuten null.</summary>
        public string Teksti => Vaihe == LentoVaihe.Pysahdys ? reitti[Indeksi].Teksti : null;

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

        /// <summary>Koko lennon arvioitu kesto ilman laattojen odotusta (s).</summary>
        public double ArvioituKesto()
        {
            double s = NousuS;
            for (int i = 0; i < reitti.Count; i++)
            {
                s += Math.Max(PysahdysKesto(reitti[i].Teksti), AanenKesto?.Invoke(i) ?? 0);
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

        /// <summary>Napautus: pysähdyksestä heti seuraavaan lentoon (odotus ja lento eivät ohitu).</summary>
        public void Ohita()
        {
            if (Vaihe == LentoVaihe.Pysahdys) VaiheAika = VaiheKesto;
        }

        /// <summary>Etenee dt sekuntia. laatatValmiit = seuraavan näkymän laatat ladattu (odotus päättyy).</summary>
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
                        AloitaVaihe(LentoVaihe.Pysahdys, Math.Max(PysahdysKesto(reitti[Indeksi].Teksti), AanenKesto?.Invoke(Indeksi) ?? 0));
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
                    var loppu = PysahdysAsento(Indeksi, 0);
                    double matka = EtaisyysM(lahto.Lat, lahto.Lon, loppu.Lat, loppu.Lon);
                    double kaari = Math.Min(KaariMaxM, KaariOsuus * matka) * Math.Sin(Math.PI * t);
                    Asento = Valissa(lahto, loppu, Smootherstep(t), kaari);
                    if (t >= 1) AloitaVaihe(LentoVaihe.Odotus, OdotusMaxS);
                    break;
                }
                case LentoVaihe.Nousu:
                {
                    double t = Math.Min(1, VaiheAika / VaiheKesto), s = Smootherstep(t);
                    Asento = new Kuvakulma(lahto.Lat, lahto.Lon, lahto.EtaisyysM * (1 + (NousuKerroin - 1) * s),
                        lahto.Kallistus + (NousuKallistus - lahto.Kallistus) * s, lahto.Suuntima + KiertoAsteS * VaiheAika, lahto.KatseKorkeusM);
                    if (t >= 1) AloitaVaihe(LentoVaihe.Valmis, 0);
                    break;
                }
            }
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
    }
}
