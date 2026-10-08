// Märkyysdata (LR v45f, omistajan palaute 8.10. (2)): osa.markyys ja pinta-merkkien markyys luetaan kävelydatasta.
using System.Linq;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class MarkyysTestit
    {
        [Testi] static void OsienJaPintojenMarkyys()
        {
            var d = Huonesimulaatio.Data;
            Oleta.Tosi(d.Osat.TryGetValue("vesiportti", out var vp) && System.Math.Abs(vp.Markyys - 0.85) < 1e-9, "vesiportti 0,85");
            Oleta.Tosi(d.Osat.TryGetValue("ulkoalue", out var ua) && System.Math.Abs(ua.Markyys - 0.75) < 1e-9, "ulkoalue 0,75");
            Oleta.Tosi(d.Osat.Values.All(o => o.Markyys >= 0 && o.Markyys <= 1), "märkyys 0–1");
            var puu = d.Merkit.FirstOrDefault(m => m.Laji == "pinta" && m.Tunnus == "puu-1");
            Oleta.Tosi(puu != null && System.Math.Abs(puu.Markyys - 0.9) < 1e-9, $"laiturin kansi puu-1 0,9 ({puu?.Markyys})");
        }

        [Testi] static void MaratAskeleet()
        {
            // Pelikoodarin aanet-saa-v2: märkä äänite edelle, kuiva varana; sisällä kuiva.
            var kuiva = Askelaani.OmaAskel("kivi", Liiketapa.Kavely, 0.25);
            var marka = Askelaani.OmaAskel("kivi", Liiketapa.Kavely, 0.75);
            var laituri = Askelaani.OmaAskel("puu", Liiketapa.Kavely, 0.9);
            Oleta.Sama("askel-kivi", kuiva.Tunnukset[0]);
            Oleta.Tosi(marka.Tunnukset[0] == "askel-kivi-marka" && marka.Tunnukset[marka.Tunnukset.Length - 1] == "askel-kivi", "märkä kivi + kuiva vara");
            Oleta.Tosi(laituri.Tunnukset[0] == "askel-laituri-marka" && laituri.Tunnukset[1] == "askel-puu-marka", "laiturin kansi märkänä");
            Oleta.Sama(kuiva.Voimakkuus, marka.Voimakkuus);
            // Laiturin kannella (puu-1) märkyys tulee pinta-merkistä.
            var d = Huonesimulaatio.Data;
            var p = d.Merkit.First(m => m.Laji == "pinta" && m.Tunnus == "puu-1");
            Oleta.Tosi(System.Math.Abs(Askelaani.Markyys(d, p.X, p.Y, p.Z) - 0.9) < 1e-9, "laiturin märkyys pisteessä 0,9");
        }
    }
}
