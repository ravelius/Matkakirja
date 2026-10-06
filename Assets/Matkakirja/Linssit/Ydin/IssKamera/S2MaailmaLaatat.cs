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
        /// <summary>
        /// KORJAUSKERROKSET uusin ensin (Karttaseppä 6.10.: pieni korjauserä uuteen kansioon vain muuttuneilla laatoilla, ei koko
        /// sarjan uudelleenvientiä). Kullakin kansiolla oma korjaus.json (sama bittikartta absoluuttisessa XYZ:ssä); ensimmäinen
        /// kansio, jonka bitti on 1, voittaa – myös Euroopan lohkossa (Madeira), muuten Eurooppa tai maailman v2.
        /// </summary>
        public static readonly string[] KorjausKansiot = { "v2-korjaus2" };   // 6.10. 11.01: WorldCover-tasaus, järvet, rengas, 4 aluetta
        public const string KorjausJuuriPohja = "https://media.matkakirja.app/linssit/astronautin-kamera/s2-maailma/";
        public const string KorjausPolkuPohja = "linssit/astronautin-kamera/s2-maailma/";
        public readonly int ZMin, ZMax;
        readonly byte[][] bitit;
        /// <summary>Korjauskerrokset KorjausKansiot-järjestyksessä (tyhjä = ei korjauksia); asetetaan ennen julkaisua muille säikeille.</summary>
        public (string Kansio, S2MaailmaLaatat Bitit)[] Korjaukset = Array.Empty<(string, S2MaailmaLaatat)>();

        S2MaailmaLaatat(int zmin, int zmax, byte[][] b) { ZMin = zmin; ZMax = zmax; bitit = b; }

        /// <summary>Korjauskansio laatalle (ensimmäinen kerros, jonka bitti on 1) tai null; sieltä haetaan sama z/x/y.</summary>
        public string KorjausKansio(int z, int x, int y)
        {
            foreach (var (k, b) in Korjaukset) if (b != null && b.Onko(z, x, y)) return k;
            return null;
        }

        public bool Korjattu(int z, int x, int y) => KorjausKansio(z, x, y) != null;

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
