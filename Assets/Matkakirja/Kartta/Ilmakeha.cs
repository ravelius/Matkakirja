using System;

namespace Matkakirja
{
    /// <summary>
    /// ILMAKEHÄ KAMERAN KORKEUDESTA ALOITUSLENNOLLA (omistaja 11.10.2026 klo 11.5x Päätoimittajan kautta: Ateenan lennossa
    /// horisontti vaaleni lennon aikana ja näytti hassulta. Musta avaruus saa vaihtua vaaleaksi ilmakehäksi vasta, kun kamera
    /// on tarpeeksi lähellä maata, korkeudella, jolla avaruuden musta katoaa lentokoneesta katsottuna; horisontin ohut sininen
    /// ilmakehäkaari saa näkyä jo avaruudesta).
    ///
    /// JUURISYY: kartan horisonttiusva (Aurinko.Usva: pergamenttitausta, lineaarinen sumu, Karttataivaan utu ja merkkien
    /// usva) voimistuu KALLISTUKSEN mukaan (webin min(1, kulma / 8°), Horisonttiusva.Vahvuus). Aloitusradan lähestymisessä
    /// kamera kallistuu 8°:een jo ~2 s:ssa noin 5 000 km:n korkeudessa, joten avaruus vaaleni pergamentiksi ja utuiseksi
    /// siniseksi koko lennon ajaksi kaukana avaruudessa.
    ///
    /// KORJAUS: aloituslennon ajan (Aurinko.IlmakehaKorkeudesta) usvan voima kerrotaan silmän todellisen korkeuden
    /// osuudella <see cref="Osuus"/>: yli <see cref="AvaruusM"/> taivas on musta (yläilmakehä: 40 km:ssä ilmanpaine on
    /// ~0,3 % merenpinnan paineesta, taivas on käytännössä musta myös päivällä), alle <see cref="ValmisM"/> täysi ilmakehä
    /// (matkalentokorkeus: paine ~26 %, taivas sininen ja horisontti vaalea), välissä pehmeä S-käyrä log-korkeudessa.
    /// Avaruudesta horisontin yllä näkyy ohut sininen kaari (Taivas.shader _Kaari): ilmakehän näkyvä kerros
    /// <see cref="KaariPaksuusM"/> pallon reunalla kulmana <see cref="KaarenLeveys"/> (7 600 km:stä ~0,3°, 40 km:stä ~5°),
    /// ja kaari häipyy ilmakehän tullessa (peitto <see cref="KaariPeitto"/> × (1 − osuus)). Kartan tavallinen kallistus
    /// (ei aloituslento) toimii ennallaan. Puhdas laskenta ilman UnityEngineä (Kartta-testit/AloituslennonRataTestit).
    /// </summary>
    public static class Ilmakeha
    {
        /// <summary>Silmän korkeus (m), jonka yläpuolella taivas on täysin musta (ei horisonttiusvaa eikä utua).</summary>
        public const double AvaruusM = 40_000.0;
        /// <summary>Silmän korkeus (m), jonka alapuolella ilmakehä on täysi (kartan horisonttiusva ja Karttataivas ennallaan).</summary>
        public const double ValmisM = 10_000.0;
        /// <summary>Ilmakehän näkyvän kerroksen paksuus (m) pallon reunalla: siitä ohuen kaaren kulmaleveys.</summary>
        public const double KaariPaksuusM = 60_000.0;
        /// <summary>Kaaren peitto avaruudessa (0–1) heti pallon reunalla.</summary>
        public const double KaariPeitto = 0.85;

        /// <summary>Ilmakehän osuus 0 (musta avaruus) … 1 (täysi ilmakehä) silmän korkeudesta maanpinnasta (m): monotoninen,
        /// 0 korkeudesta <see cref="AvaruusM"/> ylöspäin, 1 korkeudesta <see cref="ValmisM"/> alaspäin, välissä smoothstep
        /// log-korkeudessa (tasainen tuntuma, kun kamera laskee eksponentiaalisesti). NaN = avaruus.</summary>
        public static double Osuus(double korkeusM)
        {
            if (!(korkeusM < AvaruusM)) return 0.0;
            if (korkeusM <= ValmisM) return 1.0;
            double x = Math.Log(AvaruusM / korkeusM) / Math.Log(AvaruusM / ValmisM);
            return x * x * (3.0 - 2.0 * x);
        }

        /// <summary>Ilmakehän kaaren kulmaleveys (rad) silmän korkeudelta: kerroksen paksuus / etäisyys pallon reunaan
        /// √(h(2R + h)). Pienenee korkeuden kasvaessa.</summary>
        public static double KaarenLeveys(double korkeusM, double R)
        {
            double h = Math.Max(1.0, korkeusM);
            return Math.Atan(KaariPaksuusM / Math.Sqrt(h * (2.0 * R + h)));
        }

        /// <summary>Kaaren peitto silmän korkeudelta: täysi avaruudessa, häipyy ilmakehän tullessa (vaalea taivas korvaa sen).</summary>
        public static double KaarenPeitto(double korkeusM) => KaariPeitto * (1.0 - Osuus(korkeusM));
    }
}
