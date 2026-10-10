// Kehityskaupunkien julkisivuvalot (Linssiseppä 10.10.2026; PT junaan 175): kiinteä lista, ei Eiffeliä.
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class JulkisivuvalotTestit
    {
        [Testi] static void ListaJaEiEiffelia()
        {
            foreach (var (id, lat, lon) in new[] { ("pariisi", 48.86122, 2.35092), ("tukholma", 59.3299, 18.07382) })
            {
                var l = Julkisivuvalot.Kaupungin(id);
                Oleta.Tosi(l.Count == 3, id + ": kolme maamerkkiä (PT)");
                foreach (var k in l)
                {
                    Oleta.Tosi(KierrosLento.EtaisyysM(k.Lat, k.Lon, lat, lon) < 6000, $"{k.Nimi} kaupungin alueella (yövalojen maski 12,3 km)");
                    Oleta.Tosi(k.SadeM >= 25 && k.SadeM <= 70, $"{k.Nimi}: säde varjostimen rajoissa");
                    Oleta.Tosi(KierrosLento.EtaisyysM(k.Lat, k.Lon, 48.858296, 2.294479) > 1000, $"{k.Nimi}: ei Eiffel-tornia (PT: suojattu valaistus)");
                }
            }
            Oleta.Tosi(Julkisivuvalot.Kaupungin("lontoo").Count == 0 && Julkisivuvalot.Kaupungin(null).Count == 0, "muualla ei listaa");
            Oleta.Tosi(Julkisivuvalot.Listalla("pariisi", 48.8530, 2.3498) && !Julkisivuvalot.Listalla("pariisi", 48.858296, 2.294479), "Notre-Dame listalla, Eiffel ei");
        }

        [Testi] static void KytkentaOppaassa()
        {
            string c = System.IO.File.ReadAllText(System.IO.Path.Combine(System.AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Unity", "OpasSovitin.cs"));
            int i = c.IndexOf("Julkisivuvalot.Kaupungin(kid)"), j = c.IndexOf("(kierrosKohteet ?? kohteet) is List<OpasTaky> mk");
            Oleta.Tosi(i > 0 && j > i, "lista ennen kierroksen kohteita");
            Oleta.Tosi(c.Contains("Julkisivuvalot.Listalla(kid, t.Lat, t.Lon)") && c.Contains("if (OnEiffel(t.Lat, t.Lon)) continue;"), "ei tuplavaloa, Eiffel ohitetaan");
        }
    }
}
