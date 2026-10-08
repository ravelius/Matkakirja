// KEHITYSKAUPUNGIT (omistaja 20.4x: pallon kehityskaupungit ovat Tukholma ja Pariisi, ne tehdään ensin mahdollisimman hyviksi; muut
// vasta omistajan päätöksellä). Yksi lista: KaupunkiPallot (Natiivi-UI, heijastuksella On(id)), ilmakehä ja vesi (LS2) koordinaateista.
// Keskipisteet LS1:n pallo-37-listasta (sama ENU kuin Karttasepän vesiaineistossa).
using System;

namespace Matkakirja.Linssit
{
    public static class Kehityskaupungit
    {
        public static readonly (string Id, double Lat, double Lon)[] Lista = { ("tukholma", 59.3299, 18.07382), ("pariisi", 48.86122, 2.35092) };
        public const double SadeM = 25000;

        public static bool On(string id) => id != null && Array.Exists(Lista, k => k.Id == id);

        /// <summary>Kehityskaupunki, jonka keskipisteestä (lat, lon) on alle SadeM; null jos ei mikään.</summary>
        public static string Lahella(double lat, double lon)
        {
            foreach (var k in Lista)
            {
                double x = (lon - k.Lon) * Math.PI / 180 * Math.Cos((lat + k.Lat) * 0.5 * Math.PI / 180), y = (lat - k.Lat) * Math.PI / 180;
                if (6371000 * Math.Sqrt(x * x + y * y) < SadeM) return k.Id;
            }
            return null;
        }
    }
}
