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
        static void S2VainLumettominaKausina()
        {
            Oleta.Tosi(!Vuodenaika.S2Nakyy(Vuodenaika.Talvi), "talvi = BMNG (lumi)");
            foreach (var k in new[] { Vuodenaika.Kevat, Vuodenaika.Kesa, Vuodenaika.Syksy }) Oleta.Tosi(Vuodenaika.S2Nakyy(k), "kausi " + k);
        }

        [Testi]
        static void NimetMahtuvatKilpeen()
        {
            Oleta.Sama(4, Vuodenaika.Nimet.Length);
            foreach (var n in Vuodenaika.Nimet) Oleta.Tosi(n.Length <= 5, "kilven nimi enintään 5 merkkiä: " + n);
        }
    
        /// <summary>Kauden Euroopan S2-mosaiikki (Karttaseppä 7.10.): syksy syksy/v1, kevät kevat/v1, kesä ja talvi kesän v2 (null).</summary>
        [Testi] static void KaudenS2Mosaiikki()
        {
            Oleta.Tosi(Vuodenaika.S2EuroopanVersio(Vuodenaika.Syksy) == "syksy/v1", "syksy");
            Oleta.Tosi(Vuodenaika.S2EuroopanVersio(Vuodenaika.Kevat) == "kevat/v1", "kevät");
            Oleta.Tosi(Vuodenaika.S2EuroopanVersio(Vuodenaika.Kesa) == null && Vuodenaika.S2EuroopanVersio(Vuodenaika.Talvi) == null, "kesä ja talvi v2");
            Oleta.Tosi(Vuodenaika.S2EuroopanVersio(Vuodenaika.Kausi(10)) == "syksy/v1" && Vuodenaika.S2EuroopanVersio(Vuodenaika.Kausi(12)) == null, "lokakuu syksy, joulukuu ei");
            Oleta.Tosi(Vuodenaika.S2EuroopanVersio(Vuodenaika.Kausi(4)) == "kevat/v1" && Vuodenaika.S2EuroopanVersio(Vuodenaika.Kausi(7)) == null, "huhtikuu kevät, heinäkuu kesä");
        }
}
}
