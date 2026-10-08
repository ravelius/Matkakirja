// PALLON LIVE-SÄÄ JA -AIKA (omistaja 8.10.2026 09.1x, LIVE-laatikko; Natiivi-UI:n Saatila, Pelikoodarin GET /opas/saa PR #4194; juna 166).
// OpasSovitin hakee kohteen sään vain LIVEn ollessa päällä (kaupungin vaihtuessa ja enintään HakuValiS välein; 502 → arvo pysyy)
// ja asettaa Saatila.LiveSaa; Saatila.LiveAika tulee kohteen auringosta (sama raja kuin KaupunkiKuvan yötilassa).
// Vastaus: { "tila": "selkea|pilvinen|sade|sumu|lumi|ukkonen", "pilvisyys_pct", "sumu_pct", "sade_mm_h", "tuuli_ms",
//            "tuulen_suunta_ast", "lampotila_c", "paiva", "lahde": { … } }
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class PalloSaaTiedot
    {
        public PalloSaa Tila;
        public double PilvisyysPct, SumuPct, SadeMmH, TuuliMs, TuulenSuuntaAst, LampotilaC;
        public bool Paiva = true;

        /// <summary>Haun väli (s): MET Norwayn ehdot ja workerin 15 min välimuisti.</summary>
        public const double HakuValiS = 15 * 60;
        /// <summary>Yö, kun aurinko on tätä alempana (°; KaupunkiKuva: "yo" ≤ −8°).</summary>
        public const double YoRajaAst = -8;

        /// <summary>Tila-kenttä → PalloSaa; tuntematon → null (natiivi pitää nykyisen).</summary>
        public static PalloSaa? TilaksiSaa(string tila) => tila switch
        {
            "selkea" => PalloSaa.Selkea, "pilvinen" => PalloSaa.Pilvinen, "sade" => PalloSaa.Sade,
            "sumu" => PalloSaa.Sumu, "lumi" => PalloSaa.Lumi, "ukkonen" => PalloSaa.Ukkonen, _ => (PalloSaa?)null,
        };

        /// <summary>Workerin vastaus; null, jos tila puuttuu tai on tuntematon.</summary>
        public static PalloSaaTiedot Lue(Dictionary<string, object> j)
        {
            if (j == null || !(j.TryGetValue("tila", out var t) && t is string ts) || !(TilaksiSaa(ts) is PalloSaa s)) return null;
            double D(string k) => j.TryGetValue(k, out var v) && v != null && double.TryParse(Convert.ToString(v, System.Globalization.CultureInfo.InvariantCulture),
                System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var d) ? d : 0;
            return new PalloSaaTiedot
            {
                Tila = s, PilvisyysPct = D("pilvisyys_pct"), SumuPct = D("sumu_pct"), SadeMmH = D("sade_mm_h"), TuuliMs = D("tuuli_ms"),
                TuulenSuuntaAst = D("tuulen_suunta_ast"), LampotilaC = D("lampotila_c"), Paiva = !(j.TryGetValue("paiva", out var p) && p is bool pb) || pb,
            };
        }

        /// <summary>LIVE-aika kohteen auringosta (KaupunkiValo.Aurinko).</summary>
        public static PalloAika AikaAuringosta(DateTime utc, double lat, double lon) =>
            KaupunkiValo.Aurinko(utc, lat, lon).korkeus <= YoRajaAst ? PalloAika.Yo : PalloAika.Paiva;

        /// <summary>Haetaanko nyt: LIVE päällä ja (kaupunki vaihtui tai HakuValiS kulunut edellisestä onnistuneesta/yrityksestä).</summary>
        public static bool Hae(bool live, string kaupunki, string edellinenKaupunki, double sekunnitEdellisesta) =>
            live && !string.IsNullOrEmpty(kaupunki) && (!string.Equals(kaupunki, edellinenKaupunki, StringComparison.OrdinalIgnoreCase) || sekunnitEdellisesta >= HakuValiS);
    }
}
