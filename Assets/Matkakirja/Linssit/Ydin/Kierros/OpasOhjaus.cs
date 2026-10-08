// PELAAJAN TAPPIOHJAUS OPPAASSA (omistaja 5.10.2026, juna 145; Siirtoseppä: kuvakieli, Natiivi-UI: tapit, Linssiseppä: kytkentä).
// Pelaaja säätää pysähdyksen kuvaa kolmella akselilla (−1…1): kierto kohteen ympäri, korkeus (jyrkkyys) ja etäisyys. Kamera katsoo
// aina kohteeseen (Kuvakulma kiertää katsekohdetta). Puhdas, kehysnopeudesta riippumaton tila:
//  - nopeus seuraa tappia pehmeästi (aikavakio SyoteAikaS) ja hiipuu irrotuksen jälkeen (HiipumaAikaS) → ei nykäyksiä;
//  - rajat: jyrkkyys KallistusMin…KallistusMax kohteen pystysuorasta, etäisyys EtMin…EtMax, ja kamera vähintään KattoYlaM
//    maan yläpuolella (kattojen yllä) — korkeusraja jyrkentää kulmaa tarvittaessa, ettei kamera mene kattoihin;
//  - Aktiivinen: tappia käytetty viimeisen PaluuS:n aikana → silmukka pysäyttää automaattisen hitaan kierron (OpasKuvaus.
//    Pysahdyksella-aika ei etene) ja jatkaa sitä irrotuksen jälkeen pelaajan kulmasta (siirtymät jäävät voimaan).
//  - Nollaa lennon alussa: lento alkaa nykyisestä asennosta (siirtymät mukana), ja seuraava kehys on taas automaattinen.
// Esilataus ei muutu: esikamera katsoo seuraavaa kohdetta (OpasKuvaus.Kehysta), ei pelaajan kulmaa.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class OpasOhjaus
    {
        public const double KiertoMaxAstS = 50, KallistusMaxAstS = 28, EtaisyysMaxS = 0.9;   // täysi tappi (etäisyys log-asteikolla /s)
        public const double SyoteAikaS = 0.18, HiipumaAikaS = 0.45, PaluuS = 1.5, KuollutAlue = 0.12;
        public const double KallistusMin = 25, KallistusMax = 78, EtMinM = 110, EtMaxM = 2200, KattoYlaM = 55, YlaKerroin = 1.5;

        /// <summary>Pelaajan siirtymät automaattiseen kehykseen: kierto (°), jyrkkyys (°, + = vaakaan) ja etäisyyskerroin (log).</summary>
        public double Kierto { get; private set; }
        public double Kallistus { get; private set; }
        public double EtaisyysLog { get; private set; }
        double vKierto, vKallistus, vEt, lepoS = double.PositiveInfinity;

        /// <summary>Tappia käytetty äskettäin: automaattinen kierto seis.</summary>
        public bool Aktiivinen => lepoS < PaluuS;
        public bool Siirretty => Math.Abs(Kierto) > 1e-6 || Math.Abs(Kallistus) > 1e-6 || Math.Abs(EtaisyysLog) > 1e-6;

        /// <summary>Kerran kehyksessä: akselit −1…1 (kierto + = myötäpäivään ylhäältä, korkeus + = ylemmäs, etäisyys + = kauemmas).</summary>
        public void Paivita(double dt, double kierto, double korkeus, double etaisyys)
        {
            dt = Math.Max(0, Math.Min(0.1, dt));
            double K(double x) => Math.Abs(x) < KuollutAlue ? 0 : Math.Sign(x) * (Math.Abs(x) - KuollutAlue) / (1 - KuollutAlue);
            kierto = K(Rajaa(kierto, -1, 1)); korkeus = K(Rajaa(korkeus, -1, 1)); etaisyys = K(Rajaa(etaisyys, -1, 1));
            bool syote = kierto != 0 || korkeus != 0 || etaisyys != 0;
            lepoS = syote ? 0 : lepoS + dt;
            double a = 1 - Math.Exp(-dt / (syote ? SyoteAikaS : HiipumaAikaS));
            vKierto += (kierto * KiertoMaxAstS - vKierto) * a;
            vKallistus += (-korkeus * KallistusMaxAstS - vKallistus) * a;   // ylemmäs = jyrkemmin alas = pienempi kallistus
            vEt += (etaisyys * EtaisyysMaxS - vEt) * a;
            Kierto = KierrosLento.Kiedo(Kierto + vKierto * dt);
            Kallistus += vKallistus * dt;
            EtaisyysLog += vEt * dt;
        }

        /// <summary>Siirtymät automaattiseen asentoon rajoineen. maaM = maan korkeus ellipsoidista kohteessa (kattoraja).</summary>
        public Kuvakulma Sovella(Kuvakulma perus, double maaM)
        {
            double kall = Rajaa(perus.Kallistus + Kallistus, KallistusMin, KallistusMax);
            // Rajat perussuhteisia (Linssiseppä 6.10.: kaupungin vaihdon 5 km:n yläkuva hyppäsi 2 200 m:iin): enintään
            // max(EtMaxM, 1,5 × perus), vähintään min(EtMinM, perus) — perusasento itse on aina sallittu.
            double et = Rajaa(perus.EtaisyysM * Math.Exp(EtaisyysLog), Math.Min(EtMinM, perus.EtaisyysM), Math.Max(EtMaxM, perus.EtaisyysM * YlaKerroin));
            // Korkeusraja: kameran korkeus = katse + et·cos(kall) ≥ maa + KattoYlaM → cos(kall) ≥ (maa + KattoYlaM − katse) / et.
            double tarve = (maaM + KattoYlaM - perus.KatseKorkeusM) / et;
            if (tarve > 0)
            {
                if (tarve >= 1) et = Math.Max(et, maaM + KattoYlaM - perus.KatseKorkeusM);   // suoraan ylhäältä ja kauemmas
                double maxKall = Math.Acos(Math.Min(1, tarve)) * 180 / Math.PI;
                kall = Math.Min(kall, maxKall);
            }
            // Rajat sitovat myös tilaa (ettei rajan takana "kerry" liikettä, joka purkautuisi viiveellä).
            Kallistus = kall - perus.Kallistus;
            EtaisyysLog = Math.Log(et / Math.Max(1e-6, perus.EtaisyysM));
            return new Kuvakulma(perus.Lat, perus.Lon, et, kall, KierrosLento.Kiedo(perus.Suuntima + Kierto), perus.KatseKorkeusM);
        }

        /// <summary>
        /// Rajat ilman pelaajan ohjausta (kallistus KallistusMin…KallistusMax, kamera vähintään KattoYlaM maan yläpuolella): lennon
        /// kohdekehys on sama kuin pysähdyksen Sovella-asento levossa (Linssiseppä 8.10., PalloKaupungitTestit: matalilla kehyksillä
        /// kamera hyppäsi saapuessa 1,5–14,5 m, kun raja tuli voimaan vasta pysähdyksellä).
        /// </summary>
        public static Kuvakulma Rajoita(Kuvakulma perus, double maaM)
        {
            double kall = Rajaa(perus.Kallistus, KallistusMin, KallistusMax), et = perus.EtaisyysM;
            double tarve = (maaM + KattoYlaM - perus.KatseKorkeusM) / Math.Max(1e-6, et);
            if (tarve > 0)
            {
                if (tarve >= 1) et = Math.Max(et, maaM + KattoYlaM - perus.KatseKorkeusM);
                kall = Math.Min(kall, Math.Acos(Math.Min(1, tarve)) * 180 / Math.PI);
            }
            return new Kuvakulma(perus.Lat, perus.Lon, et, kall, perus.Suuntima, perus.KatseKorkeusM);
        }

        /// <summary>Lennon alussa: siirtymät pois (lento alkaa nykyisestä asennosta, joten mikään ei hyppää).</summary>
        public void Nollaa()
        {
            Kierto = Kallistus = EtaisyysLog = 0; vKierto = vKallistus = vEt = 0; lepoS = double.PositiveInfinity;
        }

        static double Rajaa(double x, double min, double max) => Math.Max(min, Math.Min(max, x));
    }
}
