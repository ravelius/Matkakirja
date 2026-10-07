// Päätoimittaja 7.10. 06.4x: avaimet pois lokista (Cesiumin tiilivirheen osoite).
namespace Matkakirja.Linssit.Testit
{
    public static class LokiPeittoTestit
    {
        [Testi] static void AvainPeitetaanOsoitteesta()
        {
            var r = LokiPeitto.Peita("[error] Received status code 404 for tile content https://tile.googleapis.com/v1/3dtiles/x.glb?session=CJb&key=AIzaSyAbc_def-123");
            Oleta.Tosi(r.EndsWith("session=CJb&key=***"), r);
            Oleta.Sama("https://x/?access_token=***&v=2", LokiPeitto.Peita("https://x/?access_token=eyJhbGci.x.y&v=2"));
            Oleta.Sama("a key=*** b", LokiPeitto.Peita("a key=abc b"));
        }

        [Testi] static void MuutRivitEnnallaan()
        {
            const string s = "opas: kamera 6 s Eiffel-torni: tokens=12, session=abc, laatat 99 %";
            Oleta.Tosi(ReferenceEquals(s, LokiPeitto.Peita(s)) || LokiPeitto.Peita(s) == s);
            Oleta.Sama("ei yhtäsuuruusmerkkiä", LokiPeitto.Peita("ei yhtäsuuruusmerkkiä"));
            Oleta.Tosi(LokiPeitto.Peita(null) == null);
        }
    }
}
