// Vapaan lennon nopeusvipu (omistaja 9.10.2026, juna 170): ×0,25 … ×3 (LS1:n VapaaNopeus), oletus nykyinen nopeus.
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class VapaaNopeusVipuTestit
    {
        [Testi] static void OletusOnNykyinenNopeus() => Oleta.Tosi(System.Math.Abs(VapaaNopeusVipu.Kerroin(VapaaNopeusVipu.Oletus) - 1) < 1e-9, "oletus ×1");

        [Testi] static void AlueNeljasosastaKolminkertaiseen()
        {
            Oleta.Tosi(System.Math.Abs(VapaaNopeusVipu.Kerroin(VapaaNopeusVipu.Min) - 0.25) < 1e-9, "ala ×0,25");
            Oleta.Tosi(System.Math.Abs(VapaaNopeusVipu.Kerroin(VapaaNopeusVipu.Max) - 3) < 1e-6, "ylä ×3");
            Oleta.Tosi(System.Math.Abs(VapaaNopeusVipu.Kerroin(-9f) - 0.25) < 1e-9 && System.Math.Abs(VapaaNopeusVipu.Kerroin(9f) - 3) < 1e-6, "rajattu");
            Oleta.Tosi(System.Math.Abs(VapaaNopeusVipu.Kerroin(float.NaN) - 1) < 1e-9, "NaN → oletus");
        }

        [Testi] static void YlosOnNopeampi()
        {
            double edellinen = 0;
            for (float a = VapaaNopeusVipu.Min; a <= VapaaNopeusVipu.Max + 1e-4f; a += 0.25f)
            {
                double k = VapaaNopeusVipu.Kerroin(a);
                Oleta.Tosi(k > edellinen, $"kasvaa {a}: {k}");
                edellinen = k;
            }
        }

        [Testi] static void Teksti()
        {
            Oleta.Tosi(VapaaNopeusVipu.Teksti(0f) == "×1", VapaaNopeusVipu.Teksti(0f));
            Oleta.Tosi(VapaaNopeusVipu.Teksti(-1f) == "×0,5", VapaaNopeusVipu.Teksti(-1f));
            Oleta.Tosi(VapaaNopeusVipu.Teksti(1f) == "×2", VapaaNopeusVipu.Teksti(1f));
            Oleta.Tosi(VapaaNopeusVipu.Teksti(-2f) == "×0,25", VapaaNopeusVipu.Teksti(-2f));
            Oleta.Tosi(VapaaNopeusVipu.Teksti(VapaaNopeusVipu.Max) == "×3", VapaaNopeusVipu.Teksti(VapaaNopeusVipu.Max));
        }
    }
}
