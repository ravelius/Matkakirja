using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// MAASTON LAATAT ESILATAUKSEEN (löydös 80, BUILD 16): Karttasepän quantized-mesh-maasto (layer.json: scheme "tms",
    /// projection EPSG:4326; taso z = 2^(z+1) × 2^z laattaa, rivi 0 etelässä) pisteen ympäriltä. Aloitusnäytön esilataus
    /// (KarttaKerrokset.EsilataaAloituslahto) hakee näillä Lontoon lähikuvan maaston levylle: mittauksessa (lokit/verho-jalkeen)
    /// lähikuvan maastolaatat tulivat kylmänä ja toisellakin käynnistyksellä verkosta (maasto v11/10, v23/15), koska
    /// esilatauslistassa oli vain rasterit. Cesium pyytää vain layer.jsonin available-väleillä olevia laattoja, joten
    /// esilataus rajataan samoin (muualla ämpäri vastaa 404, jonka runko on ~27 kt).
    ///
    /// Puhdas luokka ilman UnityEngineä (Kartta-testit/MaastoLaatatTestit). layer.json luetaan käsin (MiniJson loisi
    /// available-kentästä tuhansia olioita), vain tarvittavat tasot.
    /// </summary>
    public static class MaastoLaatat
    {
        /// <summary>Tason z laatta (x, y) pisteelle (TMS: y = 0 etelässä, x = 0 pituuspiirillä −180°).</summary>
        public static (int x, int y) Laatta(int z, double lat, double lon)
        {
            int nx = 2 << z, ny = 1 << z;
            int x = (int)Math.Floor((lon + 180.0) / 360.0 * nx);
            int y = (int)Math.Floor((lat + 90.0) / 180.0 * ny);
            return (((x % nx) + nx) % nx, Math.Max(0, Math.Min(ny - 1, y)));
        }

        /// <summary>
        /// layer.jsonin ensimmäinen tiles-pohja (esim. "{z}/{x}/{y}.terrain?v=2026-09-24-maailma"), {version} korvattuna
        /// version-kentällä kuten Cesium tekee; null, jos kenttää ei löydy.
        /// </summary>
        public static string TilesPohja(string json)
        {
            string pohja = EnsimmainenMerkkijono(json, "tiles", true);
            if (pohja == null) return null;
            if (pohja.Contains("{version}")) pohja = pohja.Replace("{version}", EnsimmainenMerkkijono(json, "version", false) ?? "");
            return pohja;
        }

        /// <summary>Kentän (tai taulukkokentän ensimmäisen alkion) merkkijonoarvo ilman JSON-kirjastoa; null = ei löydy.</summary>
        static string EnsimmainenMerkkijono(string json, string kentta, bool taulukko)
        {
            if (string.IsNullOrEmpty(json)) return null;
            int i = json.IndexOf("\"" + kentta + "\"", StringComparison.Ordinal);
            if (i < 0) return null;
            i = json.IndexOf(':', i);
            if (i < 0) return null;
            i++;
            while (i < json.Length && char.IsWhiteSpace(json[i])) i++;
            if (taulukko)
            {
                if (i >= json.Length || json[i] != '[') return null;
                i++;
                while (i < json.Length && char.IsWhiteSpace(json[i])) i++;
            }
            if (i >= json.Length || json[i] != '"') return null;
            int loppu = json.IndexOf('"', i + 1);
            return loppu < 0 ? null : json.Substring(i + 1, loppu - i - 1).Replace("\\/", "/");
        }

        /// <summary>
        /// available-välit tasoille 0…maxTaso: [taso] → välit (x0, y0, x1, y1), rajat mukaan lukien. null = kenttää ei ole
        /// (Cesium olettaa silloin kaikki laatat maxzoomiin asti saataville) tai se ei ole luettavissa.
        /// </summary>
        public static List<(int x0, int y0, int x1, int y1)>[] Saatavuus(string json, int maxTaso)
        {
            if (string.IsNullOrEmpty(json) || maxTaso < 0) return null;
            int i = json.IndexOf("\"available\"", StringComparison.Ordinal);
            if (i < 0) return null;
            i = json.IndexOf('[', i);
            if (i < 0) return null;
            var tasot = new List<(int, int, int, int)>[maxTaso + 1];
            int taso = -1, syvyys = 0;
            for (; i < json.Length; i++)
            {
                char c = json[i];
                if (c == '[')
                {
                    if (++syvyys == 2)
                    {
                        if (++taso > maxTaso) break;
                        tasot[taso] = new List<(int, int, int, int)>();
                    }
                }
                else if (c == ']')
                {
                    if (--syvyys == 0) break;
                }
                else if (c == '{' && syvyys == 2)
                {
                    int loppu = json.IndexOf('}', i);
                    if (loppu < 0) return null;
                    string o = json.Substring(i, loppu - i);
                    int x0 = Luku(o, "startX"), y0 = Luku(o, "startY"), x1 = Luku(o, "endX"), y1 = Luku(o, "endY");
                    if (x0 >= 0 && y0 >= 0 && x1 >= x0 && y1 >= y0) tasot[taso].Add((x0, y0, x1, y1));
                    i = loppu;
                }
            }
            if (taso < 0) return null;
            // Tasot, joita available ei luettele (maxzoomin yli), eivät ole saatavilla: tyhjä lista.
            for (int z = 0; z <= maxTaso; z++) if (tasot[z] == null) tasot[z] = new List<(int, int, int, int)>();
            return tasot;
        }

        static int Luku(string o, string avain)
        {
            int k = o.IndexOf("\"" + avain + "\"", StringComparison.Ordinal);
            if (k < 0) return -1;
            k = o.IndexOf(':', k);
            if (k < 0) return -1;
            k++;
            while (k < o.Length && char.IsWhiteSpace(o[k])) k++;
            int alku = k;
            while (k < o.Length && char.IsDigit(o[k])) k++;
            return k > alku && int.TryParse(o.Substring(alku, k - alku), out int v) ? v : -1;
        }

        /// <summary>Onko laatta saatavilla (saatavuus null = kaikki).</summary>
        public static bool Saatavilla(List<(int x0, int y0, int x1, int y1)>[] saatavuus, int z, int x, int y)
        {
            if (saatavuus == null) return true;
            if (z < 0 || z >= saatavuus.Length || saatavuus[z] == null) return false;
            foreach (var v in saatavuus[z])
                if (x >= v.x0 && x <= v.x1 && y >= v.y0 && y <= v.y1) return true;
            return false;
        }

        /// <summary>
        /// Ämpärin polut (kansio + tiles-pohja täytettynä) pisteen ympäriltä: jokaiselle (taso, säde) laatat
        /// (2·säde + 1)² ruudukosta, vain saatavilla olevat, annetussa tasojärjestyksessä. Rivit napojen yli jätetään pois,
        /// pituussuunnassa kierretään.
        /// </summary>
        public static List<string> Ymparilta(string kansio, string tilesPohja, List<(int x0, int y0, int x1, int y1)>[] saatavuus,
            double lat, double lon, IEnumerable<(int z, int sade)> tasot)
        {
            var polut = new List<string>();
            if (string.IsNullOrEmpty(tilesPohja)) return polut;
            var nahty = new HashSet<string>();
            foreach (var (z, sade) in tasot)
            {
                int nx = 2 << z, ny = 1 << z;
                var (cx, cy) = Laatta(z, lat, lon);
                for (int dy = -sade; dy <= sade; dy++)
                    for (int dx = -sade; dx <= sade; dx++)
                    {
                        int x = ((cx + dx) % nx + nx) % nx, y = cy + dy;
                        if (y < 0 || y >= ny || !Saatavilla(saatavuus, z, x, y)) continue;
                        string p = (kansio ?? "") + tilesPohja.Replace("{z}", z.ToString()).Replace("{x}", x.ToString())
                            .Replace("{y}", y.ToString());
                        if (nahty.Add(p)) polut.Add(p);
                    }
            }
            return polut;
        }
    }
}
