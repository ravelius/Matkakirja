// PILVIEN ILMASTO (Linssiseppä 2, 10.10.2026): Karttasepän pilvet-kaudet.json (kultainen kopio ämpäristä, pilvet-v1) luetaan
// kaupungin ja kauden mukaan; pohja rajataan pallon lentokorkeuden yläpuolelle, puuttuva kaupunki tai kausi → null.
using System;
using System.IO;
using Matkakirja.Linssit.Ilmakeha;

namespace Matkakirja.Linssit.Testit
{
    public static class PilviKaudetTestit
    {
        static string Json() => File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "pilvet-kaudet-v1.json"));

        [Testi] static void KesanPohjaSellaisenaan()
        {
            var k = PilviKaudet.Hae(Json(), "pariisi", "kesa");
            Oleta.Tosi(k.HasValue, "pariisi kesä löytyy");
            Oleta.Tosi(k.Value.PohjaM > 1200 && k.Value.PohjaM < 1500, "Pariisin kesän pohja ~1372 m: " + k.Value);
            Oleta.Sama(1000.0, k.Value.PaksuusM, "kesän kumpu 1000 m");
        }

        [Testi] static void TalvenMatalaPohjaRajataan()
        {
            var k = PilviKaudet.Hae(Json(), "tukholma", "talvi").Value;
            Oleta.Sama(PilviKaudet.MinPohjaM, k.PohjaM, "Tukholman talven 366 m → alaraja");
            Oleta.Sama(500.0, k.PaksuusM, "talven stratus 500 m");
            Oleta.Tosi(k.MatalaOsuus > 0.9 && k.Peitto > 0.5, "matala ja pilvinen: " + k);
        }

        [Testi] static void PuuttuvaKaupunkiTaiKausi()
        {
            Oleta.Tosi(PilviKaudet.Hae(Json(), "rooma", "kesa") == null, "ei Roomaa");
            Oleta.Tosi(PilviKaudet.Hae(Json(), "pariisi", "monsuuni") == null, "ei kautta");
            Oleta.Tosi(PilviKaudet.Hae("", "pariisi", "kesa") == null && PilviKaudet.Hae("{}", "pariisi", "kesa") == null, "tyhjä json");
        }
    }
}
