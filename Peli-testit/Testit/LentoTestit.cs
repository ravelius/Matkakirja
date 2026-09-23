// Lennon suunnitelma ja vaiheet (Scripts/Peli/Lento.cs; lennon esitys, omistaja 23.9.2026).
using System;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    static class LentoTestit
    {
        [Testi] static void VaiheetJaKesto()
        {
            var s = Lentosuunnitelma.Laske("lontoo", "rooma", (51.507, -0.128), (41.9, 12.5), 5f);
            Oleta.Sama(1f, s.Nousu, "20 % viidestä sekunnista");
            Oleta.Sama(1f, s.Lasku);
            Oleta.Sama(3f, s.Matka);
            Oleta.Sama(LennonVaihe.Nousu, s.VaiheHetkella(0.5f));
            Oleta.Sama(LennonVaihe.Matka, s.VaiheHetkella(2f));
            Oleta.Sama(LennonVaihe.Lasku, s.VaiheHetkella(4.5f));
            Oleta.Sama(LennonVaihe.Perilla, s.VaiheHetkella(5f));

            var pitka = Lentosuunnitelma.Laske("lontoo", "tokio", (51.507, -0.128), (35.68, 139.76), 30f);
            Oleta.Sama(Lentosuunnitelma.VaiheKattoS, pitka.Nousu, "nousun katto");
            Oleta.Sama(30f, pitka.Nousu + pitka.Matka + pitka.Lasku, "vaiheet = kesto");
        }

        [Testi] static void AloituslennonMinimiKestoJaReitti()
        {
            var s = Lentosuunnitelma.Laske("lontoo", "rooma", (51.507, -0.128), (41.9, 12.5), 3f, minimiKesto: 42f, aloitus: true);
            Oleta.Sama(42f, s.Kesto, "intro sitoo minimikeston");
            Oleta.Tosi(s.Aloitus, "aloituslento");
            Oleta.Sama(Lentosuunnitelma.PisteMaara, s.Pisteet.Count);
            Oleta.Tosi(Math.Abs(s.Pisteet[0].Lat - 51.507) < 1e-9 && Math.Abs(s.Pisteet[^1].Lon - 12.5) < 1e-9, "päät lähtö ja kohde");
            var keski = s.Pisteet[Lentosuunnitelma.PisteMaara / 2];
            Oleta.Tosi(keski.Lat < 51.507 && keski.Lat > 41.9, "reitti kulkee välissä");
        }
    }
}
