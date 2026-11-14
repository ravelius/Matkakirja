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
            if (ulos == "ikonit") return Ikonit(a.Length > 1 ? a[1] : "ikonit.json");
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

        /// <summary>IKONIEN POHJAT (KK 14.11. 23.40 F): koodimallin verkon XZ-rajat, paikka ja kierto json:ksi tyypitys.py:n leikkaustestiin.
        /// Paikka ja kierto kuten OhjelmaKohteet.cs (juna-224, 1ccace4a6; rivit 34 ja 1046–1056): ankkuri = Lat/Lon + (SiirtoX, SiirtoZ) kierrettynä;
        /// itä = x·cos a − z·sin a, pohjoinen = x·sin a + z·cos a, a = Akseli. Koko (komento "ohjelmakohteet isot") jätetään pois: oletus 1.
        /// lista = on tyypitys.py:n IKONIT-listalla (KK:n hyväksymät ikonit); muut koodimallit raportoidaan, mutta niitä ei ohiteta.</summary>
        static int Ikonit(string polku)
        {
            var ci = CultureInfo.InvariantCulture;
            var G = typeof(OhjelmaKohdeGeometria);
            var k = new (string kaupunki, string nimi, bool lista, double lat, double lon, double akseli, double sx, double sz, Func<OhjelmaKohdeGeometria.Verkko> tee)[]
            {
                ("pariisi", "Notre-Dame", true, OhjelmaKohdeGeometria.NotreDameLat, OhjelmaKohdeGeometria.NotreDameLon, OhjelmaKohdeGeometria.NotreDameAkseli, 0, 0, OhjelmaKohdeGeometria.NotreDame),
                ("pariisi", "Sainte-Chapelle", true, OhjelmaKohdeGeometria.SainteChapelleLat, OhjelmaKohdeGeometria.SainteChapelleLon, OhjelmaKohdeGeometria.SainteChapelleAkseli, 0, 0, OhjelmaKohdeGeometria.SainteChapelle),
                ("pariisi", "Sacré-Cœur", true, OhjelmaKohdeGeometria.SacreCoeurLat, OhjelmaKohdeGeometria.SacreCoeurLon, OhjelmaKohdeGeometria.SacreCoeurAkseli, 0, 0, OhjelmaKohdeGeometria.SacreCoeur),
                ("pariisi", "Panthéon", true, OhjelmaKohdeGeometria.PantheonLat, OhjelmaKohdeGeometria.PantheonLon, OhjelmaKohdeGeometria.PantheonAkseli, 0, 0, OhjelmaKohdeGeometria.Pantheon),
                ("pariisi", "Invalides", true, OhjelmaKohdeGeometria.InvalidesLat, OhjelmaKohdeGeometria.InvalidesLon, OhjelmaKohdeGeometria.InvalidesAkseli, 0, 0, OhjelmaKohdeGeometria.Invalides),
                ("pariisi", "Opéra", true, OhjelmaKohdeGeometria.OperaLat, OhjelmaKohdeGeometria.OperaLon, OhjelmaKohdeGeometria.OperaAkseli, 0, 0, OhjelmaKohdeGeometria.Opera),
                ("pariisi", "Louvre", true, OhjelmaKohdeGeometria.LouvreLat, OhjelmaKohdeGeometria.LouvreLon, OhjelmaKohdeGeometria.LouvreAkseli, 0, 0, OhjelmaKohdeGeometria.Louvre),
                ("pariisi", "Orsay", true, OhjelmaKohdeGeometria.OrsayLat, OhjelmaKohdeGeometria.OrsayLon, OhjelmaKohdeGeometria.OrsayAkseli, 0, 0, OhjelmaKohdeGeometria.Orsay),
                ("pariisi", "Grand Palais", true, OhjelmaKohdeGeometria.GrandPalaisLat, OhjelmaKohdeGeometria.GrandPalaisLon, OhjelmaKohdeGeometria.GrandPalaisAkseli, 0, 0, OhjelmaKohdeGeometria.GrandPalais),
                ("pariisi", "Petit Palais", true, OhjelmaKohdeGeometria.PetitPalaisLat, OhjelmaKohdeGeometria.PetitPalaisLon, OhjelmaKohdeGeometria.PetitPalaisAkseli, 0, 0, OhjelmaKohdeGeometria.PetitPalais),
                ("pariisi", "Montparnasse", true, OhjelmaKohdeGeometria.MontparnasseLat, OhjelmaKohdeGeometria.MontparnasseLon, OhjelmaKohdeGeometria.MontparnasseAkseli, 0, 0, OhjelmaKohdeGeometria.Montparnasse),
                ("pariisi", "Riemukaari", true, OhjelmaKohdeGeometria.RiemukaariLat, OhjelmaKohdeGeometria.RiemukaariLon, OhjelmaKohdeGeometria.RiemukaariAkseli, 0, 0, OhjelmaKohdeGeometria.Riemukaari),
                ("pariisi", "Hôtel de Ville", false, 48.8563106, 2.3524401, 70.1, 14.3, 0, OhjelmaKohdeGeometria.HotelDeVille),
                ("pariisi", "Madeleine", false, 48.869911, 2.324353, -116.0, 0, 0, OhjelmaKohdeGeometria.Madeleine),
                ("pariisi", "Palais Bourbon", false, 48.8615973, 2.3182860, 64.3, 0, 0, OhjelmaKohdeGeometria.PalaisBourbon),
                ("pariisi", "Tour Saint-Jacques", false, 48.8579974, 2.3489140, -21.6, 0, 0, OhjelmaKohdeGeometria.TourSaintJacques),
                ("pariisi", "Saint-Eustache", false, 48.8634783, 2.3451651, -7.9, 0, 0, OhjelmaKohdeGeometria.SaintEustache),
                ("pariisi", "Saint-Sulpice", false, 48.8510098, 2.3349286, 7.3, 0, 0, OhjelmaKohdeGeometria.SaintSulpice),
                ("pariisi", "Pompidou", false, 48.8605387, 2.3524118, 69.93, 0, 0, OhjelmaKohdeGeometria.Pompidou),
                ("pariisi", "Eiffel", false, 48.8582606, 2.2944985, 45.8, 0, 0, OhjelmaKohdeGeometria.Eiffel),
                ("lontoo", "Abbey", true, OhjelmaKohdeGeometria.AbbeyLat, OhjelmaKohdeGeometria.AbbeyLon, OhjelmaKohdeGeometria.AbbeyAkseli, 4.5, 1, OhjelmaKohdeGeometria.WestminsterAbbey),
                ("lontoo", "St Paul", true, OhjelmaKohdeGeometria.StPaulLat, OhjelmaKohdeGeometria.StPaulLon, OhjelmaKohdeGeometria.StPaulAkseli, 0, 0, OhjelmaKohdeGeometria.StPauls),
                ("lontoo", "Westminster", true, OhjelmaKohdeGeometria.PalatsiLat, OhjelmaKohdeGeometria.PalatsiLon, OhjelmaKohdeGeometria.PalatsiAkseli, 0, 0, OhjelmaKohdeGeometria.WestminsterPalatsi),
                ("lontoo", "Big Ben", true, 51.500712, -0.124552, OhjelmaKohdeGeometria.BigBenAkseli, -1.2, -1.45, OhjelmaKohdeGeometria.BigBen),
                ("lontoo", "Tower", true, OhjelmaKohdeGeometria.LbTowerLat, OhjelmaKohdeGeometria.LbTowerLon, OhjelmaKohdeGeometria.LbTowerAkseli, 0, 0, OhjelmaKohdeGeometria.LontoonTower),
                ("lontoo", "British Museum", true, OhjelmaKohdeGeometria.LbBritishLat, OhjelmaKohdeGeometria.LbBritishLon, OhjelmaKohdeGeometria.LbBritishAkseli, 0, 0, OhjelmaKohdeGeometria.BritishMuseum),
                ("lontoo", "NHM", true, OhjelmaKohdeGeometria.LbNhmLat, OhjelmaKohdeGeometria.LbNhmLon, OhjelmaKohdeGeometria.LbNhmAkseli, 0, 0, OhjelmaKohdeGeometria.NaturalHistoryMuseum),
                ("lontoo", "Buckingham", true, 51.500916, -0.142449, 33.6, 0, 0, OhjelmaKohdeGeometria.BuckinghamPalatsi),
                ("lontoo", "Royal Albert Hall", true, 51.501021, -0.177405, 6.6, 0, 0, OhjelmaKohdeGeometria.RoyalAlbertHall),
                ("lontoo", "Kensington", true, 51.505158, -0.188124, 15.9, 0, 0, OhjelmaKohdeGeometria.KensingtonPalatsi),
                ("lontoo", "Greenwich College", true, OhjelmaKohdeGeometria.LdCollegeLat, OhjelmaKohdeGeometria.LdCollegeLon, OhjelmaKohdeGeometria.LdCollegeAkseli, 0, 0, OhjelmaKohdeGeometria.GreenwichCollege),
                ("lontoo", "Queens House", true, OhjelmaKohdeGeometria.LdQueensLat, OhjelmaKohdeGeometria.LdQueensLon, OhjelmaKohdeGeometria.LdQueensAkseli, 0, 0, OhjelmaKohdeGeometria.QueensHouse),
                ("lontoo", "Royal Observatory", false, OhjelmaKohdeGeometria.LdFlamsteedLat, OhjelmaKohdeGeometria.LdFlamsteedLon, OhjelmaKohdeGeometria.LdFlamsteedAkseli, 0, 0, OhjelmaKohdeGeometria.Flamsteed),
                ("lontoo", "Victoria Memorial", false, 51.50184, -0.14059, 33.6, 0, 0, OhjelmaKohdeGeometria.VictoriaMemorial),
                ("lontoo", "Albert Memorial", false, 51.502418, -0.17769, 6.5, 0, 0, OhjelmaKohdeGeometria.AlbertMemorial),
                ("lontoo", "Cutty Sark", false, OhjelmaKohdeGeometria.CuttySarkLat, OhjelmaKohdeGeometria.CuttySarkLon, OhjelmaKohdeGeometria.CuttySarkAkseli, 0, 0, OhjelmaKohdeGeometria.CuttySark),
            };
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
