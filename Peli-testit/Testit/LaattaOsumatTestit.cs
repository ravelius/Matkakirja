// Laattojen osuma-% (Kartta/LaattaOsumat.cs, build 22): esiladattu + välimuistista = osuma, levyltä muuten = levyllä,
// verkosta = huti. ./kaanna.sh LaattaOsumat
namespace Matkakirja.Peli.Testit
{
    public static class LaattaOsumatTestit
    {
        [Testi] static void LuokatJaProsentti()
        {
            LaattaOsumat.Nollaa();
            LaattaOsumat.Esiladattu("a/7/1/1.jpg");
            LaattaOsumat.Levylta("a/7/1/1.jpg", true);      // osuma
            LaattaOsumat.Levylta("a/7/1/2.jpg", true);      // aiempi istunto: levyllä
            LaattaOsumat.Levylta("a/7/1/1.jpg", false);     // paketti/offline: levyllä
            LaattaOsumat.Verkosta();                        // huti
            Oleta.Tosi(LaattaOsumat.Json().Contains("\"osumia\":1,\"huteja\":1,\"levylla\":2,\"esiladattuja\":1,\"pros\":50"), LaattaOsumat.Json());
            LaattaOsumat.NollaaSummat();
            LaattaOsumat.Levylta("a/7/1/1.jpg", true);      // esiladatut säilyvät nollauksessa
            Oleta.Tosi(LaattaOsumat.Json().Contains("\"osumia\":1,\"huteja\":0"), LaattaOsumat.Json());
            LaattaOsumat.Nollaa();
            Oleta.Sama(-1, LaattaOsumat.Prosentti(0, 0));
        }
    }
}
