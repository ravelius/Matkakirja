// Kuumailmapallon elokuvamainen jälkikäsittely (juna 170, Natiiviseppä): päivä tummempi kuin yö, kuuma pudottaa raskaat passit.
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiFilmiArvotTestit
    {
        [Testi] static void PaivaJaYo()
        {
            var p = KaupunkiFilmiArvot.Valitse(false, false);
            var y = KaupunkiFilmiArvot.Valitse(true, false);
            Oleta.Tosi(p.VarjoTummennus < y.VarjoTummennus && p.KeskiTummennus < y.KeskiTummennus, "päivällä tummennus vahvempi");
            Oleta.Tosi(p.VarjoTummennus < 0 && p.Saturaatio < 0, "tummennus ja maltillinen kylläisyys");
            Oleta.Tosi(p.VarjoB > p.VarjoR && p.ValoR > p.ValoB, "viileät varjot, lämmin valo");
            Oleta.Tosi(p.Rae > 0 && p.Rae <= 0.3f && p.Vinjetti <= 0.25f && !p.Pehmennys, "kevyet rae ja vinjetti; DoF pois (sumensi koko kuvan)");
            Oleta.Tosi(y.Hehku > p.Hehku, "yöllä valot hehkuvat enemmän");
        }

        [Testi] static void KuumaPudottaaRaskaat()
        {
            foreach (var yo in new[] { false, true })
            {
                var k = KaupunkiFilmiArvot.Valitse(yo, true);
                var n = KaupunkiFilmiArvot.Valitse(yo, false);
                Oleta.Tosi(k.Rae == 0 && k.Hehku == 0 && !k.Pehmennys, "kuuma: rae, hehku, pehmennys pois");
                Oleta.Tosi(k.VarjoTummennus == n.VarjoTummennus && k.Vinjetti == n.Vinjetti, "sävytys ja vinjetti jäävät");
            }
        }
    }
}
