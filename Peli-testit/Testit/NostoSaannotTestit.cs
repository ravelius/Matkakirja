// Nostojen kuvamerkkien kynnys (Kartta/NostoSaannot.cs) = web js/pallolauta/nostot.js (löydös 155, 26.9.2026):
// kuvamerkki kertoimesta 2,5, kertoimilla 2,5–4 kooltaan 0,85, ykköstaso aina täysikokoisena. ./kaanna.sh NostoSaannot
namespace Matkakirja.Peli.Testit
{
    public static class NostoSaannotTestit
    {
        [Testi] static void KuvamerkkiKertoimesta25()
        {
            Oleta.Sama(2.5, NostoSaannot.TyyppimerkinKerroin, "web NOSTOJEN_TYYPPIMERKIN_KERROIN");
            Oleta.Tosi(!NostoSaannot.KuvamerkkiKaytossa(2, 2.4), "kaukana piste");
            Oleta.Tosi(NostoSaannot.KuvamerkkiKaytossa(2, 2.5), "kynnyksellä merkki");
            Oleta.Tosi(NostoSaannot.KuvamerkkiKaytossa(1, 1.0), "ykköstaso aina");
        }

        [Testi] static void PieniKertoimilla25_4()
        {
            Oleta.Sama(0.85f, NostoSaannot.TyyppimerkinPieniKoko, "web NOSTOJEN_TYYPPIMERKIN_PIENI");
            Oleta.Tosi(NostoSaannot.KuvamerkkiPieni(2, 3.0), "kerroin 3 pieni");
            Oleta.Tosi(!NostoSaannot.KuvamerkkiPieni(2, 4.0), "4:stä täysi koko");
            Oleta.Tosi(!NostoSaannot.KuvamerkkiPieni(2, 2.0), "pisteellä ei kokoa");
            Oleta.Tosi(!NostoSaannot.KuvamerkkiPieni(1, 3.0), "ykköstaso ei pienene");
        }
    }
}
