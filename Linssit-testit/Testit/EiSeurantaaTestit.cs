// ISS:N RINNALLA POIS PELISTÄ (omistaja 2.10.2026 klo 10.4x): seurantatila vain kehittäjälle (IssKyyti.SeurantaKaytossa).
// Oletuksena ISS:n napautus vie kaukonäkymästä suoraan Cupolaan, kohteen yltä ja avaruuskävelyltä palataan Cupolaan, eikä
// Pulun taulussa ole ISS:n rinnalla -riviä tai tietä seurantaan.
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class EiSeurantaaTestit
    {
        static readonly IssHetki Iss = new IssHetki(new LatLon(50, 10), 420_000, 60);

        [Testi] static void OletuksenaSeurantaPois() => Oleta.Tosi(!IssKyyti.SeurantaKaytossa, "seuranta vain kehittäjälle");

        [Testi] static void NapautusKaukostaSuoraanCupolaan()
        {
            var k = new IssKyyti();
            var alku = IssKuvakulma.Kauko(50, 10, 8_000_000, 0, 0);
            k.Napauta(alku, Iss, 45, 0, false);
            Oleta.Sama(KyydinTila.Ikkuna, k.Tila, "kauko → Cupola yhdellä napautuksella");
            Oleta.Tosi(k.Siirtyy, "siirtymä alkaa");
            k.Paivita(60, Iss, 45, out var ikkunassa, out _, out _);
            Oleta.Tosi(!k.Siirtyy, "perillä");
            k.Napauta(ikkunassa, Iss, 45, 61, false);
            Oleta.Sama(KyydinTila.Ikkuna, k.Tila, "Cupolassa napautus ei vie seurantaan");
            Oleta.Tosi(!k.Siirtyy, "eikä aloita siirtymää");
        }

        [Testi] static void KohteenYltaJaKavelyltaCupolaan()
        {
            var k = new IssKyyti();
            var alku = IssKuvakulma.Kauko(50, 10, 8_000_000, 0, 0);
            k.Napauta(alku, Iss, 45, 0, true);
            k.Paivita(0, Iss, 45, out var ikkuna, out _, out _);
            k.Kohteeseen(new LatLon(52, 12), ikkuna, 45, 1, true);
            Oleta.Sama(KyydinTila.Kohde, k.Tila);
            k.Paivita(1, Iss, 45, out var kohde, out _, out _);
            k.Napauta(kohde, Iss, 45, 2, true);
            Oleta.Sama(KyydinTila.Ikkuna, k.Tila, "kohteen yltä Cupolaan");
            k.Ulos(kohde, 45, 3, true);
            Oleta.Sama(KyydinTila.Ulkona, k.Tila, "avaruuskävely lähtee Cupolasta");
            k.Paivita(3, Iss, 45, out var ulkona, out _, out _);
            k.Sisaan(ulkona, 45, 4, true);
            Oleta.Sama(KyydinTila.Ikkuna, k.Tila, "kävelyn jälkeen sisään Cupolaan");
        }

        [Testi] static void PulunTaulussaEiRinnallaRivia()
        {
            var rivit = PulunTaulu.Rivit(true, true, AstroMoodi.Pallo).Select(r => r.Tunnus);
            Oleta.Sama("pallo iss-sisalle kuvat", string.Join(" ", rivit));
            Oleta.Sama(MoodinAskel.Napauta, PulunTaulu.Askel(AstroMoodi.Ikkuna, false, KyydinTila.Kauko, false), "Cupola yhdellä napautuksella");
            Oleta.Sama(MoodinAskel.Ei, PulunTaulu.Askel(AstroMoodi.Seuranta, false, KyydinTila.Ikkuna, false), "ei tietä seurantaan");
            Oleta.Sama(MoodinAskel.Napauta, PulunTaulu.Askel(AstroMoodi.Ikkuna, false, KyydinTila.Kohde, false), "kohteen yltä Cupolaan");
        }

        // Savuke 1117: avaruuskävelyltä "ISS:n sisälle" jäi luukkunäkymään (ilmalukossa kyyti on Ikkuna → askelkone luuli olevansa perillä).
        [Testi] static void KavelyltaTaulustaCupolaan()
        {
            Oleta.Sama(MoodinAskel.LopetaKavely, PulunTaulu.Askel(AstroMoodi.Ikkuna, false, KyydinTila.Ikkuna, false, true), "ilmalukosta");
            Oleta.Sama(MoodinAskel.LopetaKavely, PulunTaulu.Askel(AstroMoodi.Ikkuna, false, KyydinTila.Ulkona, false, true), "ulkoa");
            Oleta.Sama(MoodinAskel.Perilla, PulunTaulu.Askel(AstroMoodi.Ikkuna, false, KyydinTila.Ikkuna, false, false), "Cupolassa");
            Oleta.Sama(MoodinAskel.Poistu, PulunTaulu.Askel(AstroMoodi.Pallo, false, KyydinTila.Ulkona, false, true), "maapalloon Poistu lopettaa kävelyn");
        }
    }
}
