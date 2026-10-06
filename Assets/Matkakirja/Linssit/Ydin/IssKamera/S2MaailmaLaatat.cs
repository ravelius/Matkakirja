// S2-MAAILMA v2 (Karttaseppä 5.10.2026, Päätoimittaja: juna 145): Sentinel-2-mediaanimosaiikki Euroopan ulkopuolelle,
// absoluuttinen XYZ {z}/{x}/{y}.jpg (y pohjoisesta), z6–z10, 80 m. laatat.json: saatavuus[z] = base64-bittikartta
// (bitti i = rivi · 2^z + sarake; tavu i >> 3, bitti i & 7; 1 = laatta on olemassa). Avomerellä ei laattoja (oma meri alla).
// Eurooppa on erikseen s2-eurooppa-sarjassa (rajattu jako, KuvanTyosto.Euroopassa), joten Euroopan lohkon laatat tulevat sieltä.
// Natiivisepän ehdot 5.10.: purku taustasäikeessä; hakuvirhe = nykyinen käytös (Eurooppa v1, muualla BMNG).
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.IssKamera
{
    public sealed class S2MaailmaLaatat
    {
        public const string Versio = "v2";
        public const string Juuri = "https://media.matkakirja.app/linssit/astronautin-kamera/s2-maailma/" + Versio + "/";
        public const string Polku = "linssit/astronautin-kamera/s2-maailma/" + Versio + "/";
        /// <summary>Korjaussarja (Karttaseppä: v2-korjaus/ + korjaus.json, sama bittikartta; 1 = laatta korjaussarjasta).</summary>
        /// Kansio on vakio: Karttasepän uusi tasaus tulee uuteen polkuun (v2-korjaus2/), jolloin vaihto on tämä yksi rivi.
        public const string KorjausKansio = "v2-korjaus2";   // Karttaseppä 6.10. 11.01: WorldCover-tasaus, järvet, rengas, 4 aluetta
        public const string KorjausJuuri = "https://media.matkakirja.app/linssit/astronautin-kamera/s2-maailma/" + KorjausKansio + "/";
        public const string KorjausPolku = "linssit/astronautin-kamera/s2-maailma/" + KorjausKansio + "/";
        public readonly int ZMin, ZMax;
        readonly byte[][] bitit;
        /// <summary>Korjaussarjan saatavuus (null = ei korjauksia); asetetaan ennen kuin olio julkaistaan muille säikeille.</summary>
        public S2MaailmaLaatat Korjaus;

        S2MaailmaLaatat(int zmin, int zmax, byte[][] b) { ZMin = zmin; ZMax = zmax; bitit = b; }

        /// <summary>Onko laatalle korjaus (korjaussarjasta haetaan sama z/x/y).</summary>
        public bool Korjattu(int z, int x, int y) => Korjaus != null && Korjaus.Onko(z, x, y);

        /// <summary>laatat.json → saatavuus; null, jos muoto on väärä (kutsujan käytös ennallaan).</summary>
        public static S2MaailmaLaatat Jasenna(string json)
        {
            if (!(MiniJson.Jasenna(json) is Dictionary<string, object> juuri)) return null;
            // Korjaus.json (Karttaseppä 19.04): bittikartta kentässä "korjatut" ja ilman "tasot"-kenttää → tasot 6–10.
            var tasot = MiniJson.Kentta(juuri, "tasot") as Dictionary<string, object>;
            if (!((MiniJson.Kentta(juuri, "saatavuus") ?? MiniJson.Kentta(juuri, "korjatut")) is Dictionary<string, object> s)) return null;
            int zmin = (int)(MiniJson.Luku(tasot, "min") ?? 6), zmax = (int)(MiniJson.Luku(tasot, "max") ?? 10);
            if (zmin < 0 || zmax > 16 || zmin > zmax) return null;
            var b = new byte[zmax + 1][];
            for (int z = zmin; z <= zmax; z++)
            {
                if (!(MiniJson.Kentta(s, z.ToString()) is string t)) return null;
                var raaka = Convert.FromBase64String(t);
                long n = 1L << z;
                if (raaka.Length < n * n / 8) return null;
                b[z] = raaka;
            }
            return new S2MaailmaLaatat(zmin, zmax, b);
        }

        /// <summary>Onko laatta z/x/y (XYZ, y pohjoisesta) olemassa.</summary>
        public bool Onko(int z, int x, int y)
        {
            if (z < ZMin || z > ZMax) return false;
            long n = 1L << z;
            if (x < 0 || y < 0 || x >= n || y >= n) return false;
            long i = y * n + x;
            return (bitit[z][i >> 3] >> (int)(i & 7) & 1) != 0;
        }
    }
}
