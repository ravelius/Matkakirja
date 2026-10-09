// Äänilähteiden ryhmät (Päätoimittaja 9.10.2026, juna 171): järjestys, aakkoset ja Muut.
using System.Linq;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class AaniLahdeRyhmatTestit
    {
        [Testi] static void RyhmatKiinteassaJarjestyksessaJaMuutLopussa()
        {
            var r = AaniLahdeRyhmat.Ryhmittele(new[]
            {
                ("Käyttöliittymä", "pulu · a · CC BY 4.0"), ("tuntematon", "x · b · CC BY 4.0"), ("Olavinlinna", "luuta · c · CC BY 4.0"),
                ("Kuumailmapallo ja kaupungit", "lokit · d · CC BY 4.0"), (null, "y · e · CC BY 3.0"),
            });
            Oleta.Tosi(string.Join("|", r.Select(x => x.Ryhma)) == "Kuumailmapallo ja kaupungit|Olavinlinna|Käyttöliittymä|Muut",
                string.Join("|", r.Select(x => x.Ryhma)));
            Oleta.Tosi(r.Last().Rivit.Count == 2, "muut 2");
        }

        [Testi] static void AakkosetSuomeksiJaKerran()
        {
            var r = AaniLahdeRyhmat.Ryhmittele(new[]
            {
                ("Olavinlinna", "Ö-ääni · a · CC BY"), ("Olavinlinna", "Ä-ääni · a · CC BY"), ("Olavinlinna", "b-ääni · a · CC BY"),
                ("Olavinlinna", "A-ääni · a · CC BY"), ("olavinlinna", "A-ääni · a · CC BY"), ("Olavinlinna", "Z-ääni · a · CC BY"),
            });
            Oleta.Tosi(r.Count == 1, "yksi ryhmä");
            Oleta.Tosi(string.Join(",", r[0].Rivit.Select(x => x[0])) == "A,b,Z,Ä,Ö", string.Join(",", r[0].Rivit));
        }

        [Testi] static void TyhjatPois() => Oleta.Tosi(AaniLahdeRyhmat.Ryhmittele(new[] { ("Lautapelit", " "), ("Lautapelit", null) }).Count == 0, "tyhjät");
    }
}
