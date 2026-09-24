using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// SAAPUMISLAATIKOT MAITTAIN (web js/pallolauta/lauta.js haeMaanLaatikko + saapumislaatikko):
    /// maarajat.jsonin renkaista (myös muutRenkaat, <see cref="Saapumisnakyma.LueMaarajat"/>) maan mantereen
    /// lautalaatikko pelaajan kaupungin ympäriltä (<see cref="Saapumisnakyma.MaanLautalaatikko"/>), väljennettynä
    /// 5 % (<see cref="Saapumisnakyma.Valjenna"/>). Muisti on maakohtainen kuten webissä: ensimmäinen kysely
    /// ankkuroi (saman maan kaupungit ovat samalla mantereella). Ennen latausta ja tuntemattomalle maalle null,
    /// jolloin saapumisnäkymä on webin tapaan kaupunkinäkymä. PalloKierto käynnistää latauksen.
    /// </summary>
    public static class Saapumisrajaus
    {
        static Dictionary<string, List<(double Lon, double Lat)[]>> rajat;
        static bool lataus;
        static readonly Dictionary<string, Saapumisnakyma.Laatikko?> muisti = new Dictionary<string, Saapumisnakyma.Laatikko?>();

        public static bool Valmis => rajat != null;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            rajat = null;
            lataus = false;
            muisti.Clear();
        }

        /// <summary>Lataa maarajat.jsonin kerran (jäsennys taustasäikeessä).</summary>
        public static IEnumerator Lataa()
        {
            if (lataus) yield break;
            lataus = true;
            string teksti = null;
            yield return Sisalto.HaeTeksti("maarajat", t => teksti = t, true);
            if (teksti == null) { Debug.LogWarning("MATKAKIRJA saapuminen: maarajat.json puuttuu, saapumisnäkymä on kaupunkinäkymä"); yield break; }
            var tehtava = Task.Run(() => Saapumisnakyma.LueMaarajat(MiniJson.Jasenna(teksti)));
            while (!tehtava.IsCompleted) yield return null;
            if (tehtava.IsFaulted) { Debug.LogError("MATKAKIRJA saapuminen: " + tehtava.Exception?.GetBaseException()); yield break; }
            rajat = tehtava.Result;
            Debug.Log($"MATKAKIRJA saapuminen: {rajat.Count} maan rajat saapumisrajaukseen");
        }

        /// <summary>Maan saapumislaatikko laudan yksiköissä (väljennetty), tai null.</summary>
        public static Saapumisnakyma.Laatikko? Laatikko(string maa, double kaupunkiLat, double kaupunkiLon)
        {
            if (string.IsNullOrEmpty(maa) || rajat == null) return null;
            if (muisti.TryGetValue(maa, out var valmis)) return valmis;
            var raaka = rajat.TryGetValue(maa, out var renkaat)
                ? Saapumisnakyma.MaanLautalaatikko(renkaat, kaupunkiLat, kaupunkiLon) : null;
            Saapumisnakyma.Laatikko? l = raaka.HasValue ? Saapumisnakyma.Valjenna(raaka.Value) : (Saapumisnakyma.Laatikko?)null;
            muisti[maa] = l;
            return l;
        }
    }
}
