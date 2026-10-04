// ISS-OHJAAMON LCD: NYKYINEN SIJAINTI (omistaja 4.10.2026 klo 11.3x "ISS-OHJAAMO UUSIKSI": "vihreä lcd näyttö joka näyttää
// nykyisen sijainnin reilun kokoisilla kirjaimilla, esim. ROOMA, ITALIA (lähin tunnistettava karttakohde, kaupunki, meri, vuori).
// Maan nimi tulee kohteen alapuolelle"). Vain olemassa oleva paikkadata (Unity-puoli täyttää Aineiston: maat MaaOsumalla,
// kaupungit, vuoristot, meret ja valtameret). Säännöt:
//   maalla (omistaja 4.10. 21.5x "miksi ei ole tarkempaa sijaintia"; Päätoimittaja: Poznańin yllä "VARSOVA" 280 km:n päästä):
//            lähin saman maan kaupunki ≤ KaupunkiKm (40 km) pelin kaupungeista ja Natural Earthin paikoista (Paikat, ~7 300,
//            Resources/IssPaikat) → KAUPUNKI / MAA; Natural Earthin paikka saa pelin suomenkielisen nimen, kun pelin kaupunki on
//            samassa maassa ≤ PelinNimiKm päässä siitä (Varsova, Krakova); muuten vuoristo ≤ VuoriKm → VUORI / MAA; muuten MAA;
//   merellä (ei maata pisteessä): lähin nimetty meri ≤ MeriKm → MERI; muuten lähin valtameri (aina jokin).
// Puhdas C#: Linssit-testit IssSijaintiTestit.
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja.Linssit.Iss
{
    public static class IssSijainti
    {
        /// <summary>KaupunkiKm: kaupunki näytetään vain tämän säteellä pisteestä; VuoriKm: "vuoristossa"; PelinNimiKm: pelin nimi.</summary>
        public const double KaupunkiKm = 40, VuoriKm = 150, MeriKm = 600, PelinNimiKm = 15;

        public readonly struct Paikka
        {
            public readonly string Nimi, Maa; public readonly double Lat, Lon; public readonly int Tarkeys;
            public Paikka(string nimi, double lat, double lon, string maa = null, int tarkeys = 0)
            { Nimi = nimi; Lat = lat; Lon = lon; Maa = maa; Tarkeys = tarkeys; }
        }

        /// <summary>Paikkadata (Unity täyttää, kun sisältö on ladattu). Maa: (lat, lon) → (ISO3, nimi) tai null merellä.</summary>
        public sealed class Aineisto
        {
            public Func<double, double, (string Iso, string Nimi)?> Maa;
            /// <summary>ISO3 → maan nimi (kaupungin oma maa LCD:n toiselle riville); null = pisteen maa.</summary>
            public Func<string, string> MaanNimi;
            public readonly List<Paikka> Kaupungit = new List<Paikka>(), Vuoret = new List<Paikka>(),
                Meret = new List<Paikka>(), Valtameret = new List<Paikka>();
            /// <summary>Natural Earthin asutut paikat (Tarkeys = väkiluku); paikallinen nimi.</summary>
            public readonly List<Paikka> Paikat = new List<Paikka>();
        }

        /// <summary>Unityn täyttämä aineisto (null = ei vielä ladattu).</summary>
        public static Aineisto Nykyinen;

        static readonly CultureInfo Fi = new CultureInfo("fi-FI");

        /// <summary>LCD:n rivit: kohde (isolla) ja maa (isolla, tyhjä merellä tai kun kohde on itse maa).</summary>
        public static (string Kohde, string Maa) Hae(Aineisto a, double lat, double lon) => Hae(a, lat, lon, true);

        /// <summary>Kuten Hae, mutta nimet sellaisinaan (kuvateksti: "Oma kuva · Helsinki · …"; LCD käyttää versaaleja).</summary>
        public static (string Kohde, string Maa) Nimet(Aineisto a, double lat, double lon) => Hae(a, lat, lon, false);

        static (string Kohde, string Maa) Hae(Aineisto a, double lat, double lon, bool versaalit)
        {
            Func<string, string> Iso = versaalit ? (Func<string, string>)IssSijainti.Iso : x => x ?? "";
            if (a == null) return ("", "");
            var maa = a.Maa?.Invoke(lat, lon);
            if (maa.HasValue)
            {
                string m = Iso(maa.Value.Nimi);
                // Päätoimittaja 4.10.: maa on aina pisteen maa (jonka yllä ISS on) ja kaupunki lähin SAMAN maan kaupunki (ei "BERLIINI /
                // PUOLA" eikä rajan takainen "LONTOO" Ranskan pisteessä). Kaupunki, jonka maata ei tunneta, kelpaa vain sellaisenaan.
                var (k, kKm) = LahinKm(a.Kaupungit, lat, lon, KaupunkiKm, maa.Value.Iso);
                var (ne, neKm) = LahinVakiluvulla(a.Paikat, lat, lon, KaupunkiKm, maa.Value.Iso);
                if (ne.HasValue && (!k.HasValue || neKm < kKm))
                {
                    // Pelin kaupunki samassa paikassa → pelin suomenkielinen nimi (Warszawa → Varsova).
                    var (peli, _) = LahinKm(a.Kaupungit, ne.Value.Lat, ne.Value.Lon, PelinNimiKm + 30, maa.Value.Iso);
                    bool sama = peli.HasValue && Ylilennot.MaaEtaisyysKm(ne.Value.Lat, ne.Value.Lon, peli.Value.Lat, peli.Value.Lon) <= PelinNimiKm;
                    return (Iso(sama ? peli.Value.Nimi : ne.Value.Nimi), m);
                }
                if (k.HasValue) return (Iso(k.Value.Nimi), m);
                var (v, _) = LahinKm(a.Vuoret, lat, lon, VuoriKm, null);
                if (v.HasValue) return (Iso(v.Value.Nimi), m);
                return (m, "");
            }
            var meri = Lahin(a.Meret, lat, lon, MeriKm, null) ?? Lahin(a.Valtameret, lat, lon, double.PositiveInfinity, null);
            return (meri.HasValue ? Iso(meri.Value.Nimi) : "", "");
        }

        /// <summary>
        /// Testitaulukolle: LCD:n kohteen (isolla) lähimmän samannimisen paikan etäisyys pisteestä (km) ja laji (kaupunki, paikka,
        /// vuori, meri, valtameri); maa-kohteelle (−1, "maa").
        /// </summary>
        public static (double Km, string Laji) Selitys(Aineisto a, string kohde, double lat, double lon)
        {
            if (a == null || string.IsNullOrEmpty(kohde)) return (-1, "");
            foreach (var (lista, laji) in new[] { (a.Kaupungit, "kaupunki"), (a.Paikat, "paikka"), (a.Vuoret, "vuori"), (a.Meret, "meri"), (a.Valtameret, "valtameri") })
            {
                double paras = double.MaxValue;
                foreach (var x in lista)
                    if (Iso(x.Nimi) == kohde) paras = Math.Min(paras, Ylilennot.MaaEtaisyysKm(lat, lon, x.Lat, x.Lon));
                if (paras < double.MaxValue) return (paras, laji);
            }
            return (-1, "maa");
        }

        /// <summary>Lähin paikka säteellä (km), suurempi väkiluku voittaa lievästi (2 km per kymmenkertainen väkiluku yli 10 000).</summary>
        static (Paikka? p, double km) LahinVakiluvulla(List<Paikka> p, double lat, double lon, double maxKm, string maa)
        {
            Paikka? paras = null; double parasKm = double.PositiveInfinity;
            foreach (var x in p)
            {
                if (maa != null && x.Maa != maa) continue;
                double km = Ylilennot.MaaEtaisyysKm(lat, lon, x.Lat, x.Lon);
                if (km > maxKm) continue;
                km -= 2 * Math.Log10(Math.Max(1, x.Tarkeys / 10000.0));
                if (km < parasKm) { parasKm = km; paras = x; }
            }
            return (paras, parasKm);
        }

        /// <summary>Kuten Lahin, lisäksi painotettu etäisyys (km, tärkeys vähennettynä) vertailuun.</summary>
        static (Paikka? p, double km) LahinKm(List<Paikka> p, double lat, double lon, double maxKm, string maa)
        {
            Paikka? paras = null; double parasKm = maxKm;
            foreach (var x in p)
            {
                if (maa != null && x.Maa != maa) continue;
                double km = Ylilennot.MaaEtaisyysKm(lat, lon, x.Lat, x.Lon) - 10 * x.Tarkeys;
                if (km <= parasKm) { parasKm = km; paras = x; }
            }
            return (paras, parasKm);
        }

        /// <summary>Lähin paikka säteellä (km); maa != null rajaa saman maan paikkoihin. Tasapelissä tärkeämpi.</summary>
        static Paikka? Lahin(List<Paikka> p, double lat, double lon, double maxKm, string maa)
        {
            Paikka? paras = null; double parasKm = maxKm;
            foreach (var x in p)
            {
                if (maa != null && x.Maa != maa) continue;
                double km = Ylilennot.MaaEtaisyysKm(lat, lon, x.Lat, x.Lon) - 10 * x.Tarkeys;   // tärkeä kaupunki voittaa vierustoverinsa
                if (km <= parasKm) { parasKm = km; paras = x; }
            }
            return paras;
        }

        static string Iso(string s) => string.IsNullOrEmpty(s) ? "" : s.ToUpper(Fi);
    }
}
