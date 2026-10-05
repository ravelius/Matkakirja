// ISS:n kohdevalikon rajaus (Päätoimittaja 4.10.2026): enintään 30 lähintä aluksen alapisteestä, etäisyysjärjestyksessä.
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class KohdeRajausTestit
    {
        [Testi] static void EnintaanKolmekymmentaLahintaJarjestyksessa()
        {
            // 100 kohdetta 0,5°:n välein päiväntasaajalla; alus 0,0:ssa → 30 lähintä, etäisyys nouseva.
            var kohteet = Enumerable.Range(0, 100).Select(i => (Nimi: "K" + i, Lat: 0.0, Lon: (i - 50) * 0.5)).ToList();
            var r = KohdeRajaus.Lahimmat(kohteet, k => k.Lat, k => k.Lon, k => k.Nimi, 0, 0);
            Oleta.Sama(30, r.Count, "valikon koko");
            var d = r.Select(k => KohdeRajaus.EtaisyysKm(0, 0, k.Lat, k.Lon)).ToList();
            for (int i = 1; i < d.Count; i++) Oleta.Tosi(d[i] >= d[i - 1], "nouseva " + i);
            Oleta.Sama("K50", r[0].Nimi, "lähin ensin");
            // Tasapeli (±0,5°) nimen mukaan: K49 ennen K51.
            Oleta.Sama("K49", r[1].Nimi);
        }

        [Testi] static void VahanKohteitaKaikkiMukaan()
        {
            var kohteet = new List<(string Nimi, double Lat, double Lon)> { ("Rooma", 41.9, 12.5), ("Helsinki", 60.17, 24.94) };
            var r = KohdeRajaus.Lahimmat(kohteet, k => k.Lat, k => k.Lon, k => k.Nimi, 60, 25);
            Oleta.Sama("Helsinki Rooma", string.Join(" ", r.Select(k => k.Nimi)));
            Oleta.Tosi(System.Math.Abs(KohdeRajaus.EtaisyysKm(60.17, 24.94, 59.33, 18.07) - 396) < 10, "Helsinki–Tukholma ~396 km");
        }
    }
}
