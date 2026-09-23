// IHMISEN MATKAN ESITYKSEN PUHTAAT KAAVAT (web js/linssit/ihmisen-matka-esitys.js
// avauksenVaiheet, marokonPehmennys, marokonKaari, jaksonTahti, kelauksenLukema,
// kelauksenPehmennys, jaksonRajaus, ESITYKSEN_ALUEET; ihmisen-matka-tutkimus.js
// vananRajaus, rajauksenLeveys; ihmisen-matka-kortti.js kulmaEro;
// js/aikajana-vanat.js karkiHetkella).
//
// Esitystä ajaa kertojan ääni: kartta seuraa kertojaa, ei päinvastoin. Siksi
// avausjakson hetket lasketaan luennan kestosta ja sanan "Afrik" hetkestä, ja
// jokaisen jakson kello kulkee luennan osuutena.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>Avausjakson hetket millisekunteina luennan alusta.</summary>
    public readonly struct AvauksenVaiheet
    {
        public readonly double Musta, Feidi, Piste, ZoomAlku, ZoomPerus, ZoomKesto, ZoomLoppu, Afrikka;
        public AvauksenVaiheet(double musta, double feidi, double piste, double zoomAlku, double zoomPerus,
            double zoomKesto, double afrikka)
        {
            Musta = musta; Feidi = feidi; Piste = piste; ZoomAlku = zoomAlku; ZoomPerus = zoomPerus;
            ZoomKesto = zoomKesto; ZoomLoppu = zoomAlku + zoomKesto; Afrikka = afrikka;
        }
    }

    /// <summary>Rajaus asteina: keskipiste ja koko (web vananRajaus).</summary>
    public readonly struct Rajaus
    {
        public readonly double Lat, Lon, LeveysAst, KorkeusAst;
        public Rajaus(double lat, double lon, double leveysAst, double korkeusAst)
        { Lat = lat; Lon = lon; LeveysAst = leveysAst; KorkeusAst = korkeusAst; }
    }

    /// <summary>Laatikko asteina (ESITYKSEN_ALUEET).</summary>
    public readonly struct Laatikko
    {
        public readonly double LatMin, LatMax, LonMin, LonMax;
        public Laatikko(double latMin, double latMax, double lonMin, double lonMax)
        { LatMin = latMin; LatMax = latMax; LonMin = lonMin; LonMax = lonMax; }
        public Rajaus Rajaus() => new Rajaus((LatMin + LatMax) / 2, (LonMin + LonMax) / 2, LonMax - LonMin, LatMax - LatMin);
    }

    public static class Esitysmatikka
    {
        public const double ValojenMs = 2600;
        public const double KehyksenLiukuMs = 500;
        public const double AvaruudenMs = 7000;
        public const double AvaruudenMinMs = 1200;
        public const double ZoominJatkoMs = 4000;
        public const double AfrikanViiveMs = 700;
        public const double MustanOsuus = 0.35;
        public const double TahtienFeidiMs = 1800;
        public const double FeidinOsuus = 0.45;
        public const double KelauksenMs = 2400;
        public const double KameranPohjaMs = 1400;
        public const double KameranKattoMs = 9000;
        public const double KameranOsuus = 0.85;
        public const double MarokonJarru = 0.8;
        public const double MarokonPohjaMs = 1600;
        public const double MarokonTaukoMs = 1200;
        public const double MarokonEsivaihe = 1.35;
        public const double LopunAsetusMs = 1200;
        public const double KuvanOsuus = 0.66;
        public const double KuvanPoistumaMs = 420;
        /// <summary>Esityksen lähikuva lautayksiköinä (ESITYKSEN_LAHIKUVA).</summary>
        public const double Lahikuva = 1200;
        public const double PulunVaimennusPutkessa = 0.55;
        public const double KarjenEtaisyysMaxAst = 80;
        public const double HaaranEtaisyysMaxAst = 45;
        public const double KarjenLiikeMinAst = 2;
        static readonly double[] KarjenNaytteet = { 0, 0.25, 0.5, 0.75, 1 };
        public const double RajauksenVara = 0.12;
        public const double RajausMin = 900;
        public const double RajausMax = 12000;
        public const double VananEnnakkoMaxAst = 10;
        /// <summary>Tutkimusvaiheen kääntö vanaan (KAANNON_KESTO_MS).</summary>
        public const double KaannonKestoMs = 1500;

        /// <summary>Nimetyt alueet kaanonin alue-kentälle; "maailma" = koko pallo (null).</summary>
        public static readonly IReadOnlyDictionary<string, Laatikko?> Alueet = new Dictionary<string, Laatikko?>
        {
            ["afrikka"] = new Laatikko(-35, 37, -18, 52),
            ["afrikka-ita"] = new Laatikko(0, 18, 30, 50),
            ["keski-aasia"] = new Laatikko(28, 60, 50, 105),
            ["maailma"] = null,
        };

        public static AvauksenVaiheet Avaus(IReadOnlyList<double> lauseet, double? sana, double kesto)
        {
            double kaikki = Math.Max(1, double.IsFinite(kesto) ? kesto : 0);
            double afrikka = sana is double h && double.IsFinite(h) && h > 0 ? Math.Min(h + AfrikanViiveMs, kaikki) : kaikki;
            double toinen = lauseet != null && lauseet.Count > 1 ? lauseet[1] : double.NaN;
            double musta = Math.Max(0, Math.Min(double.IsFinite(toinen) && toinen > 0 ? toinen : afrikka * MustanOsuus,
                afrikka - AvaruudenMinMs));
            double tilaa = Math.Max(0, afrikka - musta);
            double feidi = Math.Max(0, Math.Min(TahtienFeidiMs, tilaa * FeidinOsuus));
            double piste = musta + feidi;
            double zoomPerus = Math.Max(AvaruudenMinMs, Math.Min(AvaruudenMs, afrikka - piste));
            double zoomAlku = Math.Max(musta, afrikka - zoomPerus);
            return new AvauksenVaiheet(musta, feidi, piste, zoomAlku, zoomPerus, zoomPerus + ZoominJatkoMs, afrikka);
        }

        public static double MarokonPehmennys(double t, double jarru = MarokonJarru)
        {
            double x = Math.Max(0, Math.Min(1, double.IsNaN(t) ? 0 : t));
            double j = Math.Min(0.95, Math.Max(0.05, jarru));
            double d = 1 - j;
            double a = 1 / (j * j * j + 1.5 * j * j * d);
            if (x <= j) return a * x * x * x;
            double u = (x - j) / d;
            return a * j * j * j + 3 * a * j * j * d * (u - u * u / 2);
        }

        public static double MarokonKaari(double t, double esivaihe = MarokonEsivaihe, double jarru = MarokonJarru)
        {
            double x = Math.Max(0, Math.Min(1, double.IsNaN(t) ? 0 : t));
            double p = Math.Max(1, esivaihe);
            return MarokonPehmennys(Math.Pow(x, p), jarru);
        }

        /// <summary>Jakson kellon alku ja loppu (vuosia sitten); hypyn edellä kello seisoo.</summary>
        public static (double alku, double loppu) JaksonTahti(IReadOnlyList<double?> vuosia, IReadOnlyList<string> vaiheet, int i)
        {
            double? a = i >= 0 && i < vuosia.Count ? vuosia[i] : null;
            double perus = a ?? 0;
            if (i + 1 < vaiheet.Count && vaiheet[i + 1] == "hyppy") return (perus, perus);
            double? b = i + 1 < vuosia.Count ? vuosia[i + 1] : null;
            return (perus, b ?? perus);
        }

        public static double KelauksenPehmennys(double t)
        {
            double x = Math.Max(0, Math.Min(1, t));
            return x < 0.5 ? 2 * x * x : 1 - Math.Pow(-2 * x + 2, 2) / 2;
        }

        /// <summary>Kameran ajon kesto jaksossa: clamp(luenta · 0,85, 1400, 9000).</summary>
        public static double KameranKesto(double luentaMs) =>
            Math.Max(KameranPohjaMs, Math.Min(KameranKattoMs, luentaMs * KameranOsuus));

        public static double KierraLon(double lon)
        {
            double l = lon;
            while (l < -180) l += 360;
            while (l >= 180) l -= 360;
            return l;
        }

        public static double KulmaEro(double aLat, double aLon, double bLat, double bLon)
        {
            const double R = Math.PI / 180;
            double f1 = aLat * R, f2 = bLat * R;
            double dl = KierraLon(bLon - aLon) * R;
            if (!double.IsFinite(dl)) dl = 0;
            double k = Math.Sin(f1) * Math.Sin(f2) + Math.Cos(f1) * Math.Cos(f2) * Math.Cos(dl);
            return Math.Acos(Math.Max(-1, Math.Min(1, k))) / R;
        }

        /// <summary>
        /// Vanan kärki hetkellä nyt (vuosia sitten). Pisteet [lat, lon, aika] aika
        /// laskevana. Ennakko > 0 katsoo edelle, enintään maxAst oikeasta kärjestä.
        /// </summary>
        public static LatLon? KarkiHetkella(IReadOnlyList<double[]> pisteet, double nyt, double ennakko = 0, double maxAst = VananEnnakkoMaxAst)
        {
            if (pisteet == null || pisteet.Count == 0) return null;
            if (ennakko > 0 && maxAst > 0)
            {
                var karki = KarkiHetkella(pisteet, nyt, 0);
                var edella = KarkiHetkella(pisteet, nyt, ennakko, 0);
                if (karki == null || edella == null) return karki ?? edella;
                const double R = Math.PI / 180;
                double f1 = karki.Value.Lat * R, f2 = edella.Value.Lat * R;
                double dl = edella.Value.Lon - karki.Value.Lon;
                while (dl > 180) dl -= 360;
                while (dl < -180) dl += 360;
                double d = Math.Acos(Math.Max(-1, Math.Min(1,
                    Math.Sin(f1) * Math.Sin(f2) + Math.Cos(f1) * Math.Cos(f2) * Math.Cos(dl * R)))) / R;
                if (!(d > maxAst)) return edella;
                double osuus = maxAst / d;
                double lng = karki.Value.Lon + dl * osuus;
                while (lng > 180) lng -= 360;
                while (lng < -180) lng += 360;
                return new LatLon(karki.Value.Lat + (edella.Value.Lat - karki.Value.Lat) * osuus, lng);
            }
            double hetki = ennakko > 0 ? nyt * (1 - ennakko) : nyt;
            var eka = pisteet[0];
            var vika = pisteet[pisteet.Count - 1];
            if (!(hetki < eka[2])) return new LatLon(eka[0], eka[1]);
            if (hetki <= vika[2]) return new LatLon(vika[0], vika[1]);
            for (int k = 0; k + 1 < pisteet.Count; k++)
            {
                var a = pisteet[k];
                var b = pisteet[k + 1];
                if (hetki <= a[2] && hetki >= b[2])
                {
                    double t = a[2] == b[2] ? 1 : (a[2] - hetki) / (a[2] - b[2]);
                    double dLon = b[1] - a[1];
                    while (dLon > 180) dLon -= 360;
                    while (dLon < -180) dLon += 360;
                    double lng = a[1] + dLon * t;
                    while (lng > 180) lng -= 360;
                    while (lng < -180) lng += 360;
                    return new LatLon(a[0] + (b[0] - a[0]) * t, lng);
                }
            }
            return new LatLon(vika[0], vika[1]);
        }

        /// <summary>Pisteiden rajaus; antimeridiaani puretaan siirtämällä ±360° lähimmäksi edellistä.</summary>
        public static Rajaus? VananRajaus(IEnumerable<LatLon> pisteet)
        {
            double latMin = double.PositiveInfinity, latMax = double.NegativeInfinity;
            double lonMin = double.PositiveInfinity, lonMax = double.NegativeInfinity;
            double? edellinen = null;
            bool yksikaan = false;
            foreach (var p in pisteet)
            {
                if (!double.IsFinite(p.Lat) || !double.IsFinite(p.Lon)) continue;
                yksikaan = true;
                double l = p.Lon;
                if (edellinen is double e)
                {
                    while (l - e > 180) l -= 360;
                    while (e - l > 180) l += 360;
                }
                edellinen = l;
                latMin = Math.Min(latMin, p.Lat); latMax = Math.Max(latMax, p.Lat);
                lonMin = Math.Min(lonMin, l); lonMax = Math.Max(lonMax, l);
            }
            if (!yksikaan) return null;
            return new Rajaus((latMin + latMax) / 2, KierraLon((lonMin + lonMax) / 2),
                Math.Min(360, lonMax - lonMin), latMax - latMin);
        }

        /// <summary>Rajauksen leveys lautayksiköinä ruudun leveydellä (kuvasuhde = leveys/korkeus).</summary>
        public static double? RajauksenLeveys(Rajaus? rajaus, double kuvasuhde = 1, double vara = RajauksenVara)
        {
            if (rajaus == null) return null;
            double kerroin = 1 + 2 * vara;
            double leveys = rajaus.Value.LeveysAst * Kameramatikka.LautayksikkoaAsteella * kerroin;
            double korkeus = rajaus.Value.KorkeusAst * Kameramatikka.LautayksikkoaAsteella * kerroin * Math.Max(0.2, kuvasuhde);
            return Math.Max(RajausMin, Math.Min(RajausMax, Math.Max(leveys, korkeus)));
        }

        /// <summary>
        /// Jakson kamerarajaus: kohde + jakson kellovälillä liikkuvien vanojen kärjet
        /// (5 näytettä). Selkäranka (vanat[0]) ≤ 80°, haara ≤ 45° kohteesta; liike ≥ 2°.
        /// Vanan pisteet [lat, lon, aika], aika laskevana. alku ≥ loppu (vuosia sitten).
        /// </summary>
        public static (Rajaus? rajaus, List<LatLon> karjet) JaksonRajaus(LatLon? kohde,
            IReadOnlyList<IReadOnlyList<double[]>> vanat, double alku, double loppu, double pitoMin = double.PositiveInfinity)
        {
            var karjet = new List<LatLon>();
            if (kohde == null || !double.IsFinite(kohde.Value.Lat) || !double.IsFinite(kohde.Value.Lon)) return (null, karjet);
            var pisteet = new List<LatLon> { kohde.Value };
            double hi = Math.Min(alku, double.IsFinite(pitoMin) ? pitoMin : double.PositiveInfinity);
            double lo = Math.Min(loppu, hi);
            if (!double.IsFinite(hi) || !double.IsFinite(lo)) return (VananRajaus(pisteet), karjet);
            var naytteet = new List<double>();
            if (hi == lo) naytteet.Add(hi);
            else foreach (var f in KarjenNaytteet) naytteet.Add(hi + (lo - hi) * f);
            for (int k = 0; k < (vanat?.Count ?? 0); k++)
            {
                var p = vanat[k];
                if (p == null || p.Count == 0) continue;
                double eka = p[0][2], vika = p[p.Count - 1][2];
                if (!(vika < hi && eka > lo)) continue;
                var kohdat = new List<LatLon>();
                foreach (var t in naytteet) { var c = KarkiHetkella(p, t); if (c != null) kohdat.Add(c.Value); }
                if (kohdat.Count == 0) continue;
                double liike = KulmaEro(kohdat[0].Lat, kohdat[0].Lon, kohdat[kohdat.Count - 1].Lat, kohdat[kohdat.Count - 1].Lon);
                if (hi != lo && liike < KarjenLiikeMinAst) continue;
                double katto = k == 0 ? KarjenEtaisyysMaxAst : HaaranEtaisyysMaxAst;
                bool liianKaukana = false;
                foreach (var c in kohdat)
                    if (KulmaEro(kohde.Value.Lat, kohde.Value.Lon, c.Lat, c.Lon) > katto) { liianKaukana = true; break; }
                if (liianKaukana) continue;
                pisteet.AddRange(kohdat);
                karjet.AddRange(kohdat);
            }
            return (VananRajaus(pisteet), karjet);
        }
    }
}
