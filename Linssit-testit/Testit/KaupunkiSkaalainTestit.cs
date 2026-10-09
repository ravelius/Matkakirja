// Kaupunkinäkymän skaalain (#4220 kohta 7, juna 172, Natiiviseppä): ilman ajallista ennallaan, STP 0,8–0,9 + terävöitys.
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiSkaalainTestit
    {
        [Testi] static void IlmanAjallistaEnnallaan()
        {
            var v = KaupunkiSkaalain.Valitse(false, 1, 0.85, 0f);
            Oleta.Tosi(!v.Ajallinen && !v.Stp && v.RenderScale == 1f && v.Terava == 0f, "ei ajallista: renderScale 1, ei STP:tä, terävöitys ennallaan");
            var t = KaupunkiSkaalain.Valitse(false, 1, 0.85, 0.5f);
            Oleta.Tosi(t.Terava == 0.5f, "asetuksen terävöitys säilyy");
        }

        [Testi] static void TaaIlmanSkaalainta()
        {
            var v = KaupunkiSkaalain.Valitse(true, 0, 0.85, 0f);
            Oleta.Tosi(v.Ajallinen && !v.Stp && v.RenderScale == 1f && v.Terava == 0f, "skaalain 0: TAA täydellä resoluutiolla");
        }

        [Testi] static void StpRajoissaJaTerava()
        {
            var v = KaupunkiSkaalain.Valitse(true, 1, double.NaN, 0f);
            Oleta.Tosi(v.Stp && v.RenderScale == KaupunkiSkaalain.StpOletus && v.Terava >= KaupunkiSkaalain.StpTerava, "oletus 0,85 + terävöitys");
            Oleta.Tosi(KaupunkiSkaalain.Valitse(true, 1, 0.5, 0f).RenderScale == KaupunkiSkaalain.StpMin, "alaraja 0,8");
            Oleta.Tosi(KaupunkiSkaalain.Valitse(true, 1, 1.0, 0f).RenderScale == KaupunkiSkaalain.StpMax, "yläraja 0,9 (STP vaatii < 1)");
            Oleta.Tosi(KaupunkiSkaalain.Valitse(true, 1, 0.85, 0.6f).Terava == 0.6f, "vahvempi asetus voittaa");
        }
    }
}
