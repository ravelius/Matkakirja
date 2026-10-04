// ISS-OHJAAMON LCD: NYKYINEN SIJAINTI (omistaja 4.10.2026 klo 11.3x "ISS-OHJAAMO UUSIKSI": "vihreä lcd näyttö joka näyttää
// nykyisen sijainnin reilun kokoisilla kirjaimilla, esim. ROOMA, ITALIA (lähin tunnistettava karttakohde, kaupunki, meri, vuori).
// Maan nimi tulee kohteen alapuolelle"). Vain olemassa oleva paikkadata (Unity-puoli täyttää Aineiston: maat MaaOsumalla,
// kaupungit, vuoristot, meret ja valtameret). Säännöt:
//   maalla (omistaja 4.10. 21.5x Natiivi-UI:n kautta: "miksi ei ole tarkempaa sijaintia"): vuoristossa (vuoristo ≤ VuoriKm ja
//            lähempänä kuin kaupunki) VUORI / MAA, muuten lähin saman maan kaupunki ilman etäisyysrajaa → KAUPUNKI / MAA; pelkkä
//            MAA vain, jos aineistossa ei ole yhtään sen maan kaupunkia eikä vuoristoa lähellä;
//   merellä (ei maata pisteessä): lähin nimetty meri ≤ MeriKm → MERI; muuten lähin valtameri (aina jokin).
// Puhdas C#: Linssit-testit IssSijaintiTestit.
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja.Linssit.Iss
{
    public static class IssSijainti
    {
        /// <summary>KaupunkiKm: Nimet-reitin ja vanhan säännön raja (ei enää LCD:n maalla); VuoriKm: "vuoristossa".</summary>
        public const double KaupunkiKm = 200, VuoriKm = 150, MeriKm = 600;

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
                var (k, kKm) = LahinKm(a.Kaupungit, lat, lon, double.PositiveInfinity, maa.Value.Iso);
                var (v, vKm) = LahinKm(a.Vuoret, lat, lon, VuoriKm, null);
                if (v.HasValue && (!k.HasValue || vKm < kKm)) return (Iso(v.Value.Nimi), m);
                if (k.HasValue) return (Iso(k.Value.Nimi), m);
                return (m, "");
            }
            var meri = Lahin(a.Meret, lat, lon, MeriKm, null) ?? Lahin(a.Valtameret, lat, lon, double.PositiveInfinity, null);
            return (meri.HasValue ? Iso(meri.Value.Nimi) : "", "");
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
