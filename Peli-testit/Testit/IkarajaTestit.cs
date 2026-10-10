// IKÄRAJAN SÄÄNNÖT (Peli/IkarajaSaanto.cs, PT 10.10. 11.5x): Ei nyt kysyy kerran, vastauksen jälkeen vain tiukempaan suuntaan.
namespace Matkakirja.Peli.Testit
{
    static class IkarajaTestit
    {
        [Testi] static void AikuinenVainVarmasti()
        {
            Oleta.Tosi(IkarajaSaanto.OnAikuinen(2007, 2026), "2007: vähintään 18");
            Oleta.Tosi(!IkarajaSaanto.OnAikuinen(2008, 2026), "2008: voi olla 17");
        }

        [Testi] static void EiNytKysyyKerran()
        {
            Oleta.Tosi(IkarajaSaanto.Kysytty("?") && IkarajaSaanto.Lue("?") == null, "ei vastattu: kysytty, tuntematon (kuratoitu)");
            Oleta.Tosi(!IkarajaSaanto.Kysytty("") && !IkarajaSaanto.Kysytty(null), "puuttuu: ei kysytty");
            Oleta.Tosi(IkarajaSaanto.Kysytty("1") && IkarajaSaanto.Lue("1") == true, "aikuinen");
            Oleta.Tosi(IkarajaSaanto.Kysytty("0") && IkarajaSaanto.Lue("0") == false, "alle 18");
        }

        [Testi] static void VainTiukempaanSuuntaan()
        {
            Oleta.Tosi(IkarajaSaanto.Uusi(null, true) && !IkarajaSaanto.Uusi(null, false), "vastaamaton: vastauksen mukaan");
            Oleta.Tosi(!IkarajaSaanto.Uusi(true, false) && IkarajaSaanto.Uusi(true, true), "aikuinen → alle 18 sallittu");
            Oleta.Tosi(!IkarajaSaanto.Uusi(false, true), "alle 18 → aikuinen estetty");
            Oleta.Tosi(IkarajaSaanto.VoiVaihtaa(null) && IkarajaSaanto.VoiVaihtaa(true) && !IkarajaSaanto.VoiVaihtaa(false), "alle 18 lukittu");
        }
    }
}
