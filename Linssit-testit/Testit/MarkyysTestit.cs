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
    }
}
