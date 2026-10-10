// VUODENAIKA ISS-KYYDISSÄ (omistaja 1.10.2026): neljä kautta, edustavat BMNG-kuukaudet ja S2 vain lumettomina kausina.
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class VuodenaikaTestit
    {
        [Testi]
        static void KuukaudetKausiin()
        {
            int[] odotettu = { 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 0 };   // tammi … joulu
            for (int kk = 1; kk <= 12; kk++) Oleta.Sama(odotettu[kk - 1], Vuodenaika.Kausi(kk), "kuukausi " + kk);
        }

        [Testi]
        static void EdustavaKuukausiKuuluuKauteensa()
        {
            for (int k = 0; k < 4; k++) Oleta.Sama(k, Vuodenaika.Kausi(Vuodenaika.Kuukausi(k)), "kausi " + k);
            Oleta.Sama(1, Vuodenaika.Kuukausi(Vuodenaika.Talvi));
            Oleta.Sama(7, Vuodenaika.Kuukausi(Vuodenaika.Kesa));
        }

        [Testi]
        static void S2KaikkinaKausinaTalvellaVainEurooppa()
        {
            // 9.10.: Karttasepän talvi/v1 → S2 myös talvella, mutta vain Euroopan lohko (maailman S2 on kesää, BMNG:n lumi muualla).
            for (int k = 0; k < 4; k++) Oleta.Tosi(Vuodenaika.S2Nakyy(k), "kausi " + k);
            Oleta.Tosi(Vuodenaika.S2VainEurooppa(Vuodenaika.Talvi), "talvi vain Eurooppa");
            foreach (var k in new[] { Vuodenaika.Kevat, Vuodenaika.Kesa, Vuodenaika.Syksy }) Oleta.Tosi(!Vuodenaika.S2VainEurooppa(k), "kausi " + k + " koko maailma");
        }

        [Testi]
        static void NimetMahtuvatKilpeen()
        {
            Oleta.Sama(4, Vuodenaika.Nimet.Length);
            foreach (var n in Vuodenaika.Nimet) Oleta.Tosi(n.Length <= 5, "kilven nimi enintään 5 merkkiä: " + n);
        }
    
        /// <summary>Kauden Euroopan S2-mosaiikki (Karttaseppä 7.10. ja 9.10.): syksy syksy/v1, kevät kevat/v1, talvi talvi/v1, kesä v2 (null).</summary>
        [Testi] static void KaudenS2Mosaiikki()
        {
            Oleta.Tosi(Vuodenaika.S2EuroopanVersio(Vuodenaika.Syksy) == "syksy/v1", "syksy");
            Oleta.Tosi(Vuodenaika.S2EuroopanVersio(Vuodenaika.Kevat) == "kevat/v1", "kevät");
            Oleta.Tosi(Vuodenaika.S2EuroopanVersio(Vuodenaika.Kesa) == null, "kesä v2");
            Oleta.Tosi(Vuodenaika.S2EuroopanVersio(Vuodenaika.Talvi) == "talvi/v1", "talvi");
            Oleta.Tosi(Vuodenaika.S2EuroopanVersio(Vuodenaika.Kausi(10)) == "syksy/v1" && Vuodenaika.S2EuroopanVersio(Vuodenaika.Kausi(12)) == "talvi/v1", "lokakuu syksy, joulukuu talvi");
            Oleta.Tosi(Vuodenaika.S2EuroopanVersio(Vuodenaika.Kausi(4)) == "kevat/v1" && Vuodenaika.S2EuroopanVersio(Vuodenaika.Kausi(7)) == null, "huhtikuu kevät, heinäkuu kesä");
        }
}
}
