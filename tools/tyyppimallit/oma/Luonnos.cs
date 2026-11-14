// Komentorivi: kirjoittaa tyyppimallien luonnokset OBJ:ksi (kärkivärit sRGB:nä) ja tulostaa kolmiot rajaa vasten. Käyttö: dotnet Luonnos.dll <kansio>
using System;
using System.Globalization;
using System.IO;
using System.Text;

namespace Matkakirja
{
    public static class Luonnos
    {
        static float Srgb(float l) => l <= 0.0031308f ? l * 12.92f : 1.055f * (float)Math.Pow(l, 1 / 2.4) - 0.055f;
        public static int Main(string[] a)
        {
            var ulos = a.Length > 0 ? a[0] : "obj";
            var ci = CultureInfo.InvariantCulture;
            if (ulos == "ikonit") return Ikonit(a[1], a.Length > 2 ? a[2] : "ikonit.json");   // Luonnos.dll ikonit <koodimallit.tsv> <ikonit.json>
            if (ulos == "budjetti") return Budjetti(a[1], a[2]);   // Luonnos.dll budjetti <muunnelmat.tsv> <ulos.tsv> (KK 14.11. 23.59 budjetti)
            Directory.CreateDirectory(ulos);
            var lista = OhjelmaKohdeGeometria.TyyppiLuonnokset();
            // Parametrinen vienti (sovituskuviin): Luonnos.dll <kansio> <nimi> palatsi-piha <pituus> <leveys> [julkisivu +z|-z|+x|-x] [avoin sivu]
            //   (KK 23.32 ja 23.40 työ D); Luonnos.dll <kansio> <nimi> asema <halleja> <pituus> <leveys> (KK 23.40 työ E; halleja 0 = leveydestä).
            if (a.Length >= 5 && a[2] == "palatsi-piha")
                lista = new System.Collections.Generic.List<(string, OhjelmaKohdeGeometria.Verkko, int)> { (a[1], OhjelmaKohdeGeometria.TyyppiPalatsiPiha(float.Parse(a[3], ci), float.Parse(a[4], ci),
                    a.Length > 5 ? a[5] : "+z", a.Length > 6 ? a[6] : ""), 1500) };
            if (a.Length >= 6 && a[2] == "asema")
            {
                int h = int.Parse(a[3]); float L = float.Parse(a[4], ci), W = float.Parse(a[5], ci);
                lista = new System.Collections.Generic.List<(string, OhjelmaKohdeGeometria.Verkko, int)> { (a[1], OhjelmaKohdeGeometria.TyyppiAsema(h > 0 ? h : OhjelmaKohdeGeometria.AsemanHallit(W), L, W), 1500) };
            }
            foreach (var (nimi, v, raja) in lista)
            {
                var sb = new StringBuilder();
                sb.Append("# ").Append(nimi).Append(" kolmioita ").Append(v.Kolmioita).Append('\n');
                // Neutraali valo leivottuna kärkiväriin (Blender piirtää tasavärinä): lounaasta ylhäältä, ympäristö 0,62 + suora 0,38.
                float lx = -0.5f, ly = 0.75f, lz = -0.45f, ll = (float)Math.Sqrt(lx * lx + ly * ly + lz * lz); lx /= ll; ly /= ll; lz /= ll;
                for (int i = 0; i < v.Karkia; i++)
                {
                    float k = 0.62f + 0.38f * Math.Max(0f, v.Normaalit[i * 3] * lx + v.Normaalit[i * 3 + 1] * ly + v.Normaalit[i * 3 + 2] * lz);
                    sb.AppendFormat(ci, "v {0:0.###} {1:0.###} {2:0.###} {3:0.####} {4:0.####} {5:0.####}\n",
                        v.Paikat[i * 3], v.Paikat[i * 3 + 1], -v.Paikat[i * 3 + 2], Srgb(v.Varit[i * 3] * k), Srgb(v.Varit[i * 3 + 1] * k), Srgb(v.Varit[i * 3 + 2] * k));
                }
                // z peilataan (Unity vasenkätinen → OBJ oikeakätinen), joten kolmion kiertosuunta käännetään.
                for (int t = 0; t < v.Kolmioita; t++) sb.Append("f ").Append(t * 3 + 1).Append(' ').Append(t * 3 + 3).Append(' ').Append(t * 3 + 2).Append('\n');
                File.WriteAllText(Path.Combine(ulos, nimi + ".obj"), sb.ToString());
                string tila = raja == 0 ? "" : (v.Kolmioita <= raja ? " OK" : " YLI");
                Console.WriteLine($"{nimi}\tkolmioita {v.Kolmioita}\traja {raja}{tila}\tkoko {v.MaxX - v.MinX:0} × {v.MaxZ - v.MinZ:0} × {v.MaxY:0} m");
            }
            return 0;
        }

        /// <summary>BUDJETTI (KK 14.11. 23.59): jokaisen mallimuunnelman kolmiot ja kärjet. Rivi: avain, tyyppi, parametrit (tab). Tyypit:
        /// kirkko-pieni|kirkko-keski paikka torneja huippu; kirkko-suuri; asema halleja pituus leveys; piha pituus leveys julkisivu avoin;
        /// kupolikirkko pylvaspaaty(true/false); pylvastemppeli pituus leveys paaty harja.</summary>
        static int Budjetti(string sisaan, string ulos)
        {
            var ci = CultureInfo.InvariantCulture;
            var sb = new StringBuilder("avain\tkolmioita\tkarkia\tsyvyys\tulko\tleveys_x\tsyvyys_z\tkorkeus_y\n");
            foreach (var rivi in File.ReadAllLines(sisaan))
            {
                var o = rivi.Split('\t'); if (o.Length < 2 || o[0] == "avain") continue;
                float F(int i) => float.Parse(o[i], ci);
                OhjelmaKohdeGeometria.Verkko v = o[1] switch
                {
                    "kirkko-pieni" => OhjelmaKohdeGeometria.TyyppiKirkkoPieni(o[2], int.Parse(o[3]), o[4]),
                    "kirkko-keski" => OhjelmaKohdeGeometria.TyyppiKirkkoKeski(o[2], int.Parse(o[3]), o[4]),
                    "kirkko-suuri" => OhjelmaKohdeGeometria.TyyppiKirkkoSuuri(),
                    "asema" => OhjelmaKohdeGeometria.TyyppiAsema(int.Parse(o[2]), F(3), F(4)),
                    "piha" => OhjelmaKohdeGeometria.TyyppiPalatsiPiha(F(2), F(3), o[4], o.Length > 5 ? o[5] : ""),
                    "kupolikirkko" => OhjelmaKohdeGeometria.TyyppiKupolikirkko(o[2] == "true"),
                    "pylvastemppeli" => OhjelmaKohdeGeometria.TyyppiPylvastemppeli(F(2), F(3), int.Parse(o[4]), o[5] == "true"),
                    _ => throw new ArgumentException("tuntematon tyyppi " + o[1]),
                };
                int ulkoja = 0; if (v.Ulko != null) foreach (var u in v.Ulko) if (u) ulkoja++;
                sb.AppendFormat(ci, "{0}\t{1}\t{2}\t{3}\t{4}\t{5:0.0}\t{6:0.0}\t{7:0.0}\n", o[0], v.Kolmioita, v.Karkia, v.Syvyys != null ? 1 : 0, ulkoja,
                    v.MaxX - v.MinX, v.MaxZ - v.MinZ, v.MaxY);
            }
            File.WriteAllText(ulos, sb.ToString());
            return 0;
        }

        /// <summary>IKONIEN POHJAT (KK 14.11. 23.40 F): koodimallin verkon XZ-rajat, paikka ja kierto json:ksi tyypitys.py:n leikkaustestiin.
        /// Paikka ja kierto kuten OhjelmaKohteet.cs (juna-224, 1ccace4a6; rivit 34 ja 1046–1056): ankkuri = Lat/Lon + (SiirtoX, SiirtoZ) kierrettynä;
        /// itä = x·cos a − z·sin a, pohjoinen = x·sin a + z·cos a, a = Akseli. Koko (komento "ohjelmakohteet isot") jätetään pois: oletus 1.
        /// Kaikki koodimallit ovat ikoneita (KK 14.11. 23.59: käsin tehty voittaa aina).</summary>
        static int Ikonit(string luettelo, string polku)
        {
            var ci = CultureInfo.InvariantCulture;
            var G = typeof(OhjelmaKohdeGeometria);
            // Luettelo pelin koodimalleista (ikonilista.py OhjelmaKohteet.cs:stä; KK 14.11. 23.59: kaikki koodimallit ikoneiksi, ei käsin ylläpidettävää listaa).
            // Vakiot ja verkot heijastuksella: "OhjelmaKohdeGeometria.X" → const-kenttä tai parametriton metodi.
            double Arvo(string t) => t.StartsWith("OhjelmaKohdeGeometria.") ? Convert.ToDouble(G.GetField(t.Substring(22)).GetRawConstantValue(), ci) : double.Parse(t, ci);
            var lista = new System.Collections.Generic.List<(string kaupunki, string nimi, bool lista, double lat, double lon, double akseli, double sx, double sz, Func<OhjelmaKohdeGeometria.Verkko> tee)>();
            foreach (var rivi in File.ReadAllLines(luettelo))
            {
                var o = rivi.Split('\t'); if (o.Length < 8) continue;
                var m = G.GetMethod(o[7].Substring(22), Type.EmptyTypes);
                if (m == null) { Console.WriteLine($"puuttuu osakirjastosta: {o[1]} ({o[7]})"); continue; }
                try { lista.Add((o[0], o[1], true, Arvo(o[2]), Arvo(o[3]), Arvo(o[4]), Arvo(o[5]), Arvo(o[6]), () => (OhjelmaKohdeGeometria.Verkko)m.Invoke(null, null))); }
                catch (Exception e) { Console.WriteLine($"ei ratkea: {o[1]}: {e.Message}"); }
            }
            var k = lista.ToArray();
            var sb = new StringBuilder("[\n");
            for (int i = 0; i < k.Length; i++)
            {
                var e = k[i]; var v = e.tee();
                // Rungon rajat: Ulko-kärjet (portaat, terassi, pihan kiveys, maa; Verkko.Ulko) eivät kuulu pohjaan.
                float x0 = float.MaxValue, x1 = float.MinValue, z0 = float.MaxValue, z1 = float.MinValue; int ulkoja = 0;
                var pis = new System.Collections.Generic.List<(float, float)>();
                for (int j = 0; j < v.Karkia; j++)
                {
                    if (v.Ulko != null && v.Ulko[j]) { ulkoja++; continue; }
                    x0 = Math.Min(x0, v.Paikat[j * 3]); x1 = Math.Max(x1, v.Paikat[j * 3]); z0 = Math.Min(z0, v.Paikat[j * 3 + 2]); z1 = Math.Max(z1, v.Paikat[j * 3 + 2]);
                    pis.Add(((float)Math.Round(v.Paikat[j * 3], 1), (float)Math.Round(v.Paikat[j * 3 + 2], 1)));
                }
                // Kupera kuori (monotone chain) rungon kärjistä: tarkempi kuin akselien suuntaiset rajat, kun malli ei ole akselin suuntainen (Louvre).
                var ps = new System.Collections.Generic.List<(float x, float z)>(new System.Collections.Generic.HashSet<(float, float)>(pis));
                ps.Sort((p, q) => p.x != q.x ? p.x.CompareTo(q.x) : p.z.CompareTo(q.z));
                double Ri((float x, float z) o, (float x, float z) p, (float x, float z) q) => (double)(p.x - o.x) * (q.z - o.z) - (double)(p.z - o.z) * (q.x - o.x);
                var h = new System.Collections.Generic.List<(float x, float z)>();
                for (int kierros = 0; kierros < 2; kierros++)
                {
                    int alku = h.Count;
                    for (int j = 0; j < ps.Count; j++)
                    {
                        var p = kierros == 0 ? ps[j] : ps[ps.Count - 1 - j];
                        while (h.Count >= alku + 2 && Ri(h[h.Count - 2], h[h.Count - 1], p) <= 0) h.RemoveAt(h.Count - 1);
                        h.Add(p);
                    }
                    h.RemoveAt(h.Count - 1);
                }
                var kuori = new StringBuilder();
                for (int j = 0; j < h.Count; j++) kuori.AppendFormat(ci, "{0}[{1:0.0},{2:0.0}]", j > 0 ? "," : "", h[j].x, h[j].z);
                double r = e.akseli * Math.PI / 180.0, ita = e.sx * Math.Cos(r) - e.sz * Math.Sin(r), poh = e.sx * Math.Sin(r) + e.sz * Math.Cos(r);
                double lat = e.lat + poh / 111319.49079327358, lon = e.lon + ita / (111319.49079327358 * Math.Cos(e.lat * Math.PI / 180.0));
                sb.AppendFormat(ci, "{{\"kaupunki\":\"{0}\",\"nimi\":\"{1}\",\"lista\":{2},\"lat\":{3:0.0000000},\"lon\":{4:0.0000000},\"akseli\":{5},\"rajat\":[{6:0.0},{7:0.0},{8:0.0},{9:0.0}],\"kuori\":[{12}],\"kolmioita\":{10}}}{11}\n",
                    e.kaupunki, e.nimi, e.lista ? "true" : "false", lat, lon, e.akseli, x0, x1, z0, z1, v.Kolmioita, i < k.Length - 1 ? "," : "", kuori);
                Console.WriteLine($"{e.kaupunki}\t{e.nimi}\trunko {x1 - x0:0} × {z1 - z0:0} m (koko verkko {v.MaxX - v.MinX:0} × {v.MaxZ - v.MinZ:0}, ulko-kärkiä {ulkoja})");
            }
            File.WriteAllText(polku, sb.Append("]\n").ToString());
            return 0;
        }
    }
}
