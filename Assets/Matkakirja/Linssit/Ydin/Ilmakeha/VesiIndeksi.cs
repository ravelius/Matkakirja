// VEDEN INDEKSI JA TASOT (Linssiseppä 2, 9.10.2026; Karttaseppä index-v5, Natiivisepän ehdot): indeksit haetaan uusimmasta alkaen
// (v6 → v5 → v4 → v3 → v2 → index; uusi versio omalla nimellä, vanhat buildit lukevat vanhaa; v6 = Karttasepän Strömmen–Norrström-aluenosto 10.10., muoto kuten v5). v5:n kohdekohtainen "tarkkuudet" valitsee
// tasot: 48m mukana → kolmas taso kauko2 KaukoM–KaukoM2 (Tukholman saaristo 20–40 km), muuten 16 m jatkuu KaukoM2:een (Pariisi);
// ilman kenttää (v4 ja vanhemmat) kuten ennen: 6 m ja 16 m KaukoM:ään.
using System;

namespace Matkakirja.Linssit.Ilmakeha
{
    public static class VesiIndeksi
    {
        public static readonly string[] Nimet = { "index-v6.json", "index-v5.json", "index-v4.json", "index-v3.json", "index-v2.json", "index.json" };
        public const float KaukoM = 20000f, KaukoM2 = 40000f;

        /// <summary>Ensimmäinen saatavilla oleva indeksi (hae palauttaa null, jos tiedostoa ei ole); KaupunkiVesi käy Nimet samassa järjestyksessä.</summary>
        public static string Ensimmainen(Func<string, string> hae)
        {
            foreach (var n in Nimet) { var t = hae(n); if (t != null) return t; }
            return null;
        }

        /// <summary>Ladattavat ruudut (taso 0 lähi, 1 kauko, 2 kauko2) ja kauko-tason ulkoraja.</summary>
        public static ((string Ruutu, int Taso)[] Ruudut, float KaukaRaja) Tasot(string[] tarkkuudet)
        {
            if (tarkkuudet == null || tarkkuudet.Length == 0) return (new[] { ("6m", 0), ("16m", 1) }, KaukoM);
            bool kauko2 = Array.IndexOf(tarkkuudet, "48m") >= 0;
            return kauko2 ? (new[] { ("6m", 0), ("16m", 1), ("48m", 2) }, KaukoM) : (new[] { ("6m", 0), ("16m", 1) }, KaukoM2);
        }
    }
}
