// OMAT MALLIT CESIUM-KAUPUNKIIN (Linssiseppä 7.10.2026, Giza-pilotti; omistaja 6.10. 23.35 "voiko tuollaisiin kohteisiin tehdä
// itse paremmat 3d rakenteet samalle cesium pallolle?", Päätoimittajan lupa 7.10. 00.3x): Linnanrakentajan mallit 3D Tilesinä
// (tyokalut/omat_mallit_tileset.py) ja leikkauspolygonit, joiden alueelta Googlen Photorealistic 3D Tiles piilotetaan.
// EHDOT (Googlen Map Tiles -ohjeet, tarkistettu 7.10.): omat 3D-objektit sallittu, kun niitä ei ole "extracted, traced, or
// otherwise derived" Googlen tiilistä; leikkaus vain näyttöhetkellä, dataa ei tallenneta; Googlen logo ja tekijärivit
// muuttamattomina ja oma tekijärivi erillään. Leikkaus vain, kun oma malli on ladattu (reikä ei saa jäädä tyhjäksi).
// Puhdas C#: mallit.json-luku, lähellä olevat kohteet ja polygonin paikalliset koordinaatit (metriä kohteen keskeltä).
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Kierros
{
    public static class OmatMallit
    {
        public sealed class Kohde
        {
            public string Id, Tileset;
            public double Lat, Lon, KorkeusM;
            public List<(double lat, double lon)> Leikkaus = new List<(double, double)>();
        }

        public sealed class Paketti
        {
            public string Tekija;
            public List<Kohde> Kohteet = new List<Kohde>();
        }

        /// <summary>KORKEUS (PT 9.10., Map Tiles C4): mallin korkeus on aina mallit.json:n ellipsoidikorkeus omasta korkeusmallista;
        /// Googlen pinnan mukaista korjausta ei ole. Googlen pinta näytteistetään vain kehittäjätilassa lokiin (saumojen arviointi),
        /// ei koskaan oman korkeusmallin ollessa käytössä.</summary>
        public static bool GooglenPintaLokiin(bool kehittajatila, bool omaKorkeusmalli) => kehittajatila && !omaKorkeusmalli;

        /// <summary>Mallit näytetään, kun kaupunkinäkymän keskus on enintään tämän matkan päässä (m).</summary>
        public const double LahellaM = 30000;

        /// <summary>mallit.json (omat_mallit_tileset.py): {"tekija", "kohteet":[{id, lat, lon, korkeus, leikkaus:[[lat,lon]…], tileset}]}.
        /// Puutteellinen kohde (ei tilesetiä tai alle 3 leikkauspistettä) jätetään pois; väärä muoto → null.</summary>
        public static Paketti Lue(string json)
        {
            if (!(MiniJson.Jasenna(json) is Dictionary<string, object> j)) return null;
            var p = new Paketti { Tekija = MiniJson.Teksti(j, "tekija") };
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "kohteet")))
            {
                if (!(o is Dictionary<string, object> k)) continue;
                var kohde = new Kohde
                {
                    Id = MiniJson.Teksti(k, "id"), Tileset = MiniJson.Teksti(k, "tileset"),
                    Lat = MiniJson.Luku(k, "lat") ?? double.NaN, Lon = MiniJson.Luku(k, "lon") ?? double.NaN,
                    KorkeusM = MiniJson.Luku(k, "korkeus") ?? 0,
                };
                foreach (var pt in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(k, "leikkaus")))
                    if (pt is List<object> l && l.Count >= 2 && l[0] is double la && l[1] is double lo) kohde.Leikkaus.Add((la, lo));
                if (string.IsNullOrEmpty(kohde.Id) || string.IsNullOrEmpty(kohde.Tileset) || kohde.Tileset.Contains("..")
                    || double.IsNaN(kohde.Lat) || double.IsNaN(kohde.Lon) || kohde.Leikkaus.Count < 3) continue;
                p.Kohteet.Add(kohde);
            }
            return p;
        }

        /// <summary>Kohteet enintään rM:n päässä pisteestä.</summary>
        public static List<Kohde> Lahella(Paketti p, double lat, double lon, double rM = LahellaM)
        {
            var l = new List<Kohde>();
            if (p == null) return l;
            foreach (var k in p.Kohteet) if (KierrosLento.EtaisyysM(lat, lon, k.Lat, k.Lon) <= rM) l.Add(k);
            return l;
        }

        /// <summary>Leikkauspolygonin pisteet paikallisina metreinä (itä, pohjoinen) pisteestä (lat0, lon0); tasokuvaus riittää
        /// muutaman sadan metrin alueella (virhe alle sentin).</summary>
        public static List<(double e, double n)> Paikallinen(IReadOnlyList<(double lat, double lon)> pisteet, double lat0, double lon0)
        {
            const double R = 6371008.8, A = Math.PI / 180;
            var l = new List<(double, double)>(pisteet.Count);
            foreach (var (lat, lon) in pisteet) l.Add(((lon - lon0) * A * R * Math.Cos(lat0 * A), (lat - lat0) * A * R));
            return l;
        }
    }
}
