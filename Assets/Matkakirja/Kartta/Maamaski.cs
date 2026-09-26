using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// MAAMASKI (omistajan löydös 157, build 21; Fable: rannan 1,2 km:n porras näkyy valitun maakunnan täytössä). Karttasepän
    /// maittaiset maapolygonit (GSHHG full taso 1, Douglas–Peucker 0,001°, järvet NE 10m) ämpäristä
    /// <see cref="Osoite"/>/ISO3.geojson (gzip siirrossa). Maakuntien tunnuskartta on 1,2 km:n rasteri, joten täytön reuna on
    /// rannassa porras; maski rasteroidaan maan rajaukseen <see cref="Kerroin"/> kertaa tarkempana (enintään
    /// <see cref="SuurinSivu"/>), ja MaaTaytto kertoo täytön peiton sillä (bilineaarinen, ~0,3 km:n reuna).
    /// Rasterointi nonzero-säännöllä (päällekkäiset laatikkoleikkeet eivät kumoa toisiaan), maa miinus järvet, taustasäikeessä.
    /// Haku kerran maata kohden (levyvälimuisti persistentDataPath/maamaski/), ESILATAUSPOLITIIKKA kohta 3: maakuntien kanssa.
    /// Karttasepän huomio: maata ei ole leikattu valtion rajaan, mutta täyttö on jo tunnuskartan mukaan maan sisällä.
    /// </summary>
    public static class Maamaski
    {
        public const string Osoite = "https://media.matkakirja.app/julisteet/pallo/vektorit/maamaski-maittain-2026-09-26/";
        public const int Kerroin = 4, SuurinSivu = 4096;

        /// <summary>Komento `maakunta maski pois|paalle`: vertailuun ilman maskia.</summary>
        public static bool Paalla = true;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { Paalla = true; lahteet.Clear(); }

        /// <summary>Maan renkaat (lon, lat asteina): maa ja järvet.</summary>
        public sealed class Lahde { public List<double[]> Maa = new List<double[]>(), Jarvet = new List<double[]>(); }

        static readonly Dictionary<string, Lahde> lahteet = new Dictionary<string, Lahde>();

        /// <summary>Maan lähde muistista, levyltä tai verkosta (null = ei saatavilla). Kutsu korutiinina pääsäikeestä.</summary>
        public static IEnumerator Hae(string iso3, Action<Lahde> valmis)
        {
            if (string.IsNullOrEmpty(iso3)) { valmis(null); yield break; }
            if (lahteet.TryGetValue(iso3, out var m)) { valmis(m); yield break; }
            string kansio = Path.Combine(Application.persistentDataPath, "maamaski");
            string polku = Path.Combine(kansio, iso3 + ".geojson");
            string teksti = null;
            if (File.Exists(polku))
            {
                try { teksti = File.ReadAllText(polku); } catch (IOException) { teksti = null; }
            }
            if (teksti == null)
            {
                using var p = UnityWebRequest.Get(Osoite + iso3 + ".geojson");
                p.timeout = 30;
                yield return p.SendWebRequest();
                if (p.result != UnityWebRequest.Result.Success)
                {
                    Debug.LogWarning($"MATKAKIRJA maamaski {iso3}: haku ei onnistunut ({p.error})");
                    valmis(null);
                    yield break;
                }
                teksti = p.downloadHandler.text;
                try { Directory.CreateDirectory(kansio); File.WriteAllText(polku, teksti); } catch (IOException) { }
            }
            Lahde l = null;
            Exception virhe = null;
            var t = System.Threading.Tasks.Task.Run(() => { try { l = Jasenna(teksti); } catch (Exception e) { virhe = e; } });
            while (!t.IsCompleted) yield return null;
            if (virhe != null || l == null) { Debug.LogWarning($"MATKAKIRJA maamaski {iso3}: jäsennys kaatui: {virhe?.Message}"); valmis(null); yield break; }
            lahteet[iso3] = l;
            valmis(l);
        }

        /// <summary>
        /// GeoJSON (FeatureCollection, MultiPolygon/Polygon, properties.osa "maa" tai "jarvet") renkaiksi: kevyt lukija,
        /// joka etsii jokaisen featuren osa-kentän ja coordinates-taulukon renkaat (taulukko, jonka alkiot ovat [lon, lat]).
        /// </summary>
        public static Lahde Jasenna(string s)
        {
            var l = new Lahde();
            int i = 0;
            while (true)
            {
                int f = s.IndexOf("\"osa\"", i, StringComparison.Ordinal);
                int c = s.IndexOf("\"coordinates\"", i, StringComparison.Ordinal);
                if (c < 0) break;
                bool jarvi = false;
                // Osa ennen koordinaatteja tai heti niiden jälkeen samassa featuressa.
                int seuraavaC = s.IndexOf("\"coordinates\"", c + 13, StringComparison.Ordinal);
                if (f >= 0 && (seuraavaC < 0 || f < seuraavaC))
                {
                    int lainaus = s.IndexOf('"', s.IndexOf(':', f + 5) + 1);
                    jarvi = string.CompareOrdinal(s, lainaus + 1, "jarv", 0, 4) == 0;
                }
                int k = s.IndexOf('[', c);
                i = Renkaat(s, k, jarvi ? l.Jarvet : l.Maa);
                if (f >= 0 && f > c && (seuraavaC < 0 || f < seuraavaC)) i = Math.Max(i, f + 5);
            }
            return l;
        }

        /// <summary>Lukee taulukon alkaen kohdasta k (merkki '['); renkaat listaan. Palauttaa kohdan taulukon jälkeen.</summary>
        static int Renkaat(string s, int k, List<double[]> ulos)
        {
            int syvyys = 0, i = k;
            var piste = new List<double>(256);
            while (i < s.Length)
            {
                char ch = s[i];
                if (ch == '[')
                {
                    // Rengas: '[' '[' luku ...
                    int j = Seuraava(s, i + 1);
                    if (j < s.Length && s[j] == '[' && OnLuku(s[Seuraava(s, j + 1)]))
                    {
                        piste.Clear();
                        i = j;
                        while (true)
                        {
                            i = Seuraava(s, i);
                            if (s[i] == ']') { i++; break; }
                            if (s[i] == ',') { i++; continue; }
                            // [lon, lat(, z)]
                            i = Seuraava(s, i + 1);
                            double lon = Luku(s, ref i); i = Seuraava(s, i); if (s[i] == ',') i++;
                            double lat = Luku(s, ref i);
                            while (s[i] != ']') i++;
                            i++;
                            piste.Add(lon); piste.Add(lat);
                        }
                        if (piste.Count >= 6) ulos.Add(piste.ToArray());
                        continue;
                    }
                    syvyys++;
                    i++;
                    continue;
                }
                if (ch == ']') { syvyys--; i++; if (syvyys <= 0) return i; continue; }
                i++;
            }
            return i;
        }

        static int Seuraava(string s, int i) { while (i < s.Length && char.IsWhiteSpace(s[i])) i++; return i; }
        static bool OnLuku(char c) => c == '-' || (c >= '0' && c <= '9');

        static double Luku(string s, ref int i)
        {
            i = Seuraava(s, i);
            int a = i;
            while (i < s.Length && (OnLuku(s[i]) || s[i] == '.' || s[i] == 'e' || s[i] == 'E' || s[i] == '+')) i++;
            return double.Parse(s.AsSpan(a, i - a), NumberStyles.Float, CultureInfo.InvariantCulture);
        }

        /// <summary>
        /// Maski rajaukseen (länsi lon0, pohjoinen lat1, välit asteina) w × h -tekseliin (rivi 0 pohjoisin), 255 = maata.
        /// Nonzero-sääntö (reunojen suunta), pituus kierretään välille [lon0, lon0 + 360). Järvet nollataan perään.
        /// </summary>
        public static byte[] Rasteroi(Lahde l, int w, int h, double lon0, double lat1, double lonVali, double latVali)
        {
            var kartta = new byte[w * h];
            Tayta(l.Maa, kartta, w, h, lon0, lat1, lonVali, latVali, 255);
            Tayta(l.Jarvet, kartta, w, h, lon0, lat1, lonVali, latVali, 0);
            return kartta;
        }

        static void Tayta(List<double[]> renkaat, byte[] kartta, int w, int h, double lon0, double lat1, double lonVali, double latVali, byte arvo)
        {
            var rivit = new List<(float x, sbyte s)>[h];
            double sx = w / lonVali, sy = h / latVali;
            foreach (var r in renkaat)
            {
                int n = r.Length / 2;
                // Renkaan pituuden kierto: ensimmäinen piste välille [lon0, lon0 + 360), muut jatkuvasti siitä.
                double kierto = 0;
                double eka = r[0] - lon0;
                kierto = -360.0 * Math.Floor(eka / 360.0);
                double px = (r[0] - lon0 + kierto) * sx, py = (lat1 - r[1]) * sy;
                double edLon = r[0];
                for (int k = 1; k <= n; k++)
                {
                    int q = k % n;
                    double lon = r[q * 2];
                    double dl = lon - edLon;
                    if (dl > 180) kierto -= 360; else if (dl < -180) kierto += 360;
                    edLon = lon;
                    double x = (lon - lon0 + kierto) * sx, y = (lat1 - r[q * 2 + 1]) * sy;
                    Reuna(rivit, h, px, py, x, y);
                    px = x; py = y;
                }
            }
            for (int y = 0; y < h; y++)
            {
                var rivi = rivit[y];
                if (rivi == null || rivi.Count < 2) continue;
                rivi.Sort((a, b) => a.x.CompareTo(b.x));
                int kaari = 0;
                for (int k = 0; k < rivi.Count - 1; k++)
                {
                    kaari += rivi[k].s;
                    if (kaari == 0) continue;
                    int x0 = Mathf.Max(0, Mathf.CeilToInt(rivi[k].x - 0.5f)), x1 = Mathf.Min(w - 1, Mathf.FloorToInt(rivi[k + 1].x - 0.5f));
                    int o = y * w;
                    for (int x = x0; x <= x1; x++) kartta[o + x] = arvo;
                }
            }
        }

        /// <summary>Reunan leikkaukset pikselirivien keskikohdissa (y + 0,5), suunta ylös/alas nonzero-sääntöä varten.</summary>
        static void Reuna(List<(float, sbyte)>[] rivit, int h, double x0, double y0, double x1, double y1)
        {
            if (y0 == y1) return;
            sbyte s = (sbyte)(y1 > y0 ? 1 : -1);
            double ya = Math.Min(y0, y1), yb = Math.Max(y0, y1);
            int r0 = Math.Max(0, (int)Math.Ceiling(ya - 0.5)), r1 = Math.Min(h - 1, (int)Math.Ceiling(yb - 0.5) - 1);
            for (int r = r0; r <= r1; r++)
            {
                double yc = r + 0.5;
                double x = x0 + (x1 - x0) * (yc - y0) / (y1 - y0);
                (rivit[r] ??= new List<(float, sbyte)>(8)).Add(((float)x, s));
            }
        }
    }
}
