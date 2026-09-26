using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Text;

namespace Matkakirja
{
    /// <summary>
    /// Kevyt GeoJSON-lukija pelaajan maan kehälle (Maaraja; puhdas C#, ajetaan taustasäikeessä, testit
    /// Kartta-testit/Testit/GeojsonTestit.cs). Siirretty Maaraja.cs:stä sellaisenaan (löydös 127), jotta Karttasepän
    /// maa–maa-rajat (maamaa.geojson, MultiLineString) voidaan testata ilman Unityä. Käy UTF-8-tavut kerran läpi
    /// rakentamatta MiniJson-puuta: FeatureCollectionin jokaisesta featuresta poimitaan properties.iso ja
    /// geometry.coordinates, kaikki muu ohitetaan. Kenttien järjestys vapaa.
    ///
    /// Sisäkkäisyys päätellään taulukoista: taulukko, jonka alkiot ovat lukupareja, on yksi viiva. Polygon ja
    /// MultiPolygon antavat renkaat (sulkeva piste mukana), LineString ja MultiLineString avoimet viivat; kutsuja
    /// tietää tiedostosta, kumpi on kyseessä (Maaraja: maapolygonit = renkaat, maamaa = avoimet). Tyhjä geometria
    /// (saarimaan "coordinates": []) jättää maan tulokseen tulematta.
    /// Tulos: ISO3 → viivat [(lon, lat)], jokainen viiva sellaisenaan.
    /// </summary>
    public static class Geojson
    {
        /// <summary>Purkaa gzipin, jos tavut alkavat 0x1f 0x8b (palvelin ei välitä Content-Encodingia).</summary>
        public static byte[] Pura(byte[] tavut)
        {
            if (tavut == null || tavut.Length < 2 || tavut[0] != 0x1f || tavut[1] != 0x8b) return tavut;
            using var sisaan = new MemoryStream(tavut);
            using var gz = new GZipStream(sisaan, CompressionMode.Decompress);
            using var ulos = new MemoryStream(tavut.Length * 4);
            gz.CopyTo(ulos);
            return ulos.ToArray();
        }

        public static Dictionary<string, List<(double Lon, double Lat)[]>> Lue(byte[] tavut)
        {
            var l = new Lukija { b = tavut };
            // UTF-8 BOM
            if (tavut.Length >= 3 && tavut[0] == 0xef && tavut[1] == 0xbb && tavut[2] == 0xbf) l.i = 3;
            var tulos = new Dictionary<string, List<(double Lon, double Lat)[]>>(System.StringComparer.Ordinal);
            l.Objekti(k =>
            {
                if (k != "features" || l.OnNull()) { l.Ohita(); return; }
                l.Taulukko(() => l.Feature(tulos));
            });
            return tulos;
        }

        sealed class Lukija
        {
            public byte[] b;
            public int i;
            readonly List<(double, double)> puskuri = new List<(double, double)>(4096);
            static readonly double[] Potenssit =
            {
                1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11,
                1e12, 1e13, 1e14, 1e15, 1e16, 1e17, 1e18, 1e19, 1e20, 1e21, 1e22,
            };

            public void Feature(Dictionary<string, List<(double Lon, double Lat)[]>> tulos)
            {
                if (OnNull()) { Ohita(); return; }
                string iso = null;
                var renkaat = new List<(double Lon, double Lat)[]>();
                Objekti(k =>
                {
                    if (k == "properties" && !OnNull())
                        Objekti(k2 => { if (k2 == "iso" && b[i] == '"') iso = Merkkijono(); else Ohita(); });
                    else if (k == "geometry" && !OnNull())
                        Objekti(k2 => { if (k2 == "coordinates" && b[i] == '[') Koordinaatit(renkaat); else Ohita(); });
                    else Ohita();
                });
                if (string.IsNullOrEmpty(iso) || renkaat.Count == 0) return;
                if (tulos.TryGetValue(iso, out var vanhat)) vanhat.AddRange(renkaat);
                else tulos[iso] = renkaat;
            }

            /// <summary>Sisäkkäiset taulukot: taulukko, jonka alkiot ovat lukupareja, on rengas.</summary>
            void Koordinaatit(List<(double Lon, double Lat)[]> renkaat)
            {
                Odota('[');
                Ws();
                if (b[i] == ']') { i++; return; }
                if (OnLukuAlku(b[i]))
                {
                    // Yksittäinen piste (Point) ei ole rengas: ohitetaan.
                    while (true) { Luku(); Ws(); if (b[i] == ',') { i++; continue; } Odota(']'); return; }
                }
                int j = i + 1;
                while (j < b.Length && OnTyhja(b[j])) j++;
                if (b[i] == '[' && j < b.Length && OnLukuAlku(b[j]))
                {
                    puskuri.Clear();
                    while (true)
                    {
                        Ws();
                        Odota('[');
                        double lon = Luku();
                        Ws(); Odota(',');
                        double lat = Luku();
                        Ws();
                        while (b[i] == ',') { i++; Luku(); Ws(); } // korkeus tms.
                        Odota(']');
                        puskuri.Add((lon, lat));
                        Ws();
                        if (b[i] == ',') { i++; continue; }
                        Odota(']');
                        break;
                    }
                    if (puskuri.Count >= 2) renkaat.Add(puskuri.ToArray());
                    return;
                }
                while (true)
                {
                    Ws();
                    Koordinaatit(renkaat);
                    Ws();
                    if (b[i] == ',') { i++; continue; }
                    Odota(']');
                    return;
                }
            }

            public void Objekti(System.Action<string> kentta)
            {
                Ws();
                Odota('{');
                Ws();
                if (b[i] == '}') { i++; return; }
                while (true)
                {
                    Ws();
                    string avain = Merkkijono();
                    Ws(); Odota(':'); Ws();
                    kentta(avain);
                    Ws();
                    if (b[i] == ',') { i++; continue; }
                    Odota('}');
                    return;
                }
            }

            public void Taulukko(System.Action alkio)
            {
                Ws();
                Odota('[');
                Ws();
                if (b[i] == ']') { i++; return; }
                while (true)
                {
                    Ws();
                    alkio();
                    Ws();
                    if (b[i] == ',') { i++; continue; }
                    Odota(']');
                    return;
                }
            }

            public bool OnNull()
            {
                Ws();
                return b[i] == 'n';
            }

            /// <summary>Ohittaa minkä tahansa arvon (merkkijono, luku, literaali, objekti, taulukko).</summary>
            public void Ohita()
            {
                Ws();
                byte c = b[i];
                if (c == '"') { OhitaMerkkijono(); return; }
                if (c == '{' || c == '[')
                {
                    int syvyys = 0;
                    while (true)
                    {
                        c = b[i];
                        if (c == '"') { OhitaMerkkijono(); continue; }
                        i++;
                        if (c == '{' || c == '[') syvyys++;
                        else if ((c == '}' || c == ']') && --syvyys == 0) return;
                    }
                }
                while (i < b.Length && b[i] != ',' && b[i] != '}' && b[i] != ']' && !OnTyhja(b[i])) i++;
            }

            void OhitaMerkkijono()
            {
                i++; // "
                while (b[i] != '"') i += b[i] == '\\' ? 2 : 1;
                i++;
            }

            public string Merkkijono()
            {
                Odota('"');
                int alku = i;
                bool pako = false;
                while (b[i] != '"') { if (b[i] == '\\') { pako = true; i++; } i++; }
                int loppu = i++;
                if (!pako) return Encoding.UTF8.GetString(b, alku, loppu - alku);
                var sb = new StringBuilder();
                for (int k = alku; k < loppu; k++)
                {
                    if (b[k] != '\\') { sb.Append((char)b[k]); continue; } // avaimet ja ISO-koodit ovat ASCIIta
                    char c = (char)b[++k];
                    switch (c)
                    {
                        case 'n': sb.Append('\n'); break;
                        case 't': sb.Append('\t'); break;
                        case 'r': sb.Append('\r'); break;
                        case 'b': sb.Append('\b'); break;
                        case 'f': sb.Append('\f'); break;
                        case 'u':
                            sb.Append((char)System.Convert.ToInt32(Encoding.ASCII.GetString(b, k + 1, 4), 16));
                            k += 4;
                            break;
                        default: sb.Append(c); break;
                    }
                }
                return sb.ToString();
            }

            /// <summary>
            /// JSON-luku ilman merkkijonoa: mantissa kokonaislukuna ja jako kymmenen potenssilla
            /// (≤ 22 tarkka, joten 7.022 = 7022 / 1e3 pyöristyy oikein).
            /// </summary>
            double Luku()
            {
                Ws();
                bool miinus = false;
                if (b[i] == '-') { miinus = true; i++; }
                else if (b[i] == '+') i++;
                long m = 0;
                int numeroita = 0, eksp = 0;
                int alku = i;
                while (i < b.Length && b[i] >= '0' && b[i] <= '9')
                {
                    if (numeroita < 18) { m = m * 10 + (b[i] - '0'); if (m != 0) numeroita++; }
                    else eksp++;
                    i++;
                }
                bool nahty = i > alku;
                if (i < b.Length && b[i] == '.')
                {
                    i++;
                    nahty |= i < b.Length && b[i] >= '0' && b[i] <= '9';
                    while (i < b.Length && b[i] >= '0' && b[i] <= '9')
                    {
                        if (numeroita < 18) { m = m * 10 + (b[i] - '0'); if (m != 0) numeroita++; eksp--; }
                        i++;
                    }
                }
                if (i < b.Length && (b[i] == 'e' || b[i] == 'E'))
                {
                    i++;
                    bool em = false;
                    if (b[i] == '-') { em = true; i++; }
                    else if (b[i] == '+') i++;
                    int e = 0;
                    while (i < b.Length && b[i] >= '0' && b[i] <= '9') { e = e * 10 + (b[i] - '0'); i++; }
                    eksp += em ? -e : e;
                }
                if (!nahty)
                    throw new System.FormatException("GeoJSON: luku puuttuu kohdassa " + i);
                double arvo = m;
                if (eksp < 0) arvo = -eksp < Potenssit.Length ? arvo / Potenssit[-eksp] : arvo / System.Math.Pow(10, -eksp);
                else if (eksp > 0) arvo = eksp < Potenssit.Length ? arvo * Potenssit[eksp] : arvo * System.Math.Pow(10, eksp);
                return miinus ? -arvo : arvo;
            }

            void Ws() { while (i < b.Length && OnTyhja(b[i])) i++; }

            void Odota(char c)
            {
                if (i >= b.Length || b[i] != c)
                    throw new System.FormatException($"GeoJSON: odotettiin '{c}' kohdassa {i}");
                i++;
            }

            static bool OnTyhja(byte c) => c == ' ' || c == '\n' || c == '\r' || c == '\t';
            static bool OnLukuAlku(byte c) => (c >= '0' && c <= '9') || c == '-' || c == '+' || c == '.';
        }
    }

    /// <summary>
    /// Kehän viivojen puhtaat osat (Maaraja.TeeTaulukot, löydös 127; testit GeojsonTestit.cs): mitkä janat viivasta
    /// piirretään ja viivan laatikon lävistäjä pienimmän renkaan karsintaan.
    /// </summary>
    public static class Kehaviivat
    {
        /// <summary>
        /// Janojen määrä: rengas (maapolygonit) suljetaan viimeisestä pisteestä ensimmäiseen (GeoJSONin sulkeva
        /// piste antaa nollajanan, jonka piirto ohittaa), avoin viiva (Karttasepän maa–maa-raja) ei. Täysi rengas
        /// maamaa.geojsonissa (CHE, sisämaa) tulee avoimena viivana, jonka viimeinen piste on ensimmäinen.
        /// </summary>
        public static int Janoja(int pisteita, bool avoin) => pisteita < 2 ? 0 : avoin ? pisteita - 1 : pisteita;

        /// <summary>Janan k loppupisteen indeksi.</summary>
        public static int Loppu(int k, int pisteita, bool avoin) => avoin ? k + 1 : (k + 1) % pisteita;

        /// <summary>
        /// Viivan laatikon lävistäjä asteina (pituus kavennettuna leveyspiirin mukaan, kuten webin rengasNakyy); pituudet
        /// avataan sauman yli (Venäjän ja Fidžin renkaat ylittävät ±180°:n), jottei saumaviiva saa koko maailman
        /// levyistä laatikkoa.
        /// </summary>
        public static double Lavistaja(IList<(double Lon, double Lat)> viiva)
        {
            if (viiva == null || viiva.Count == 0) return 0;
            double w = double.MaxValue, e = double.MinValue, s = double.MaxValue, no = double.MinValue;
            double edellinen = viiva[0].Lon, siirto = 0;
            foreach (var p in viiva)
            {
                double lon = p.Lon + siirto;
                if (lon - edellinen > 180) { siirto -= 360; lon -= 360; }
                else if (lon - edellinen < -180) { siirto += 360; lon += 360; }
                edellinen = lon;
                w = System.Math.Min(w, lon); e = System.Math.Max(e, lon);
                s = System.Math.Min(s, p.Lat); no = System.Math.Max(no, p.Lat);
            }
            double kerroin = System.Math.Max(0.05, System.Math.Cos((s + no) / 2 * System.Math.PI / 180.0));
            return System.Math.Sqrt((e - w) * kerroin * (e - w) * kerroin + (no - s) * (no - s));
        }
    }
}
