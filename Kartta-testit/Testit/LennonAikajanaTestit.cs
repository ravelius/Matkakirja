// LENNON AIKAJANA (kamerareitti build 11, kamerakäsikirjoitus 24.9.2026): puhtaan aikajanan testit.
// Nopeuden jatkuvuus saumoissa (numeerinen derivaatta), vaihekestot 20 s:n referenssillä ja 16/26 s:n ääripäillä,
// orbitin vakiokulmanopeus, loppuasento (kallistus 0, pohjoinen), kone ruudulla loittonuksessa ja kamera maan
// yllä. Kameran geometria on PalloKierto.Aseta pallomallina, koneen paikka ja kohde kuten Nappula.Lento.
using System;
using System.Collections.Generic;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class LennonAikajanaTestit
    {
        const double R = 6371000.0;
        const double LontooLat = 51.507, LontooLon = -0.128;

        /// <summary>Kohteet: (lat, lon, taulukon avain). Koordinaatit likimain (kaupunkien keskustat).</summary>
        static readonly (string Id, double Lat, double Lon)[] Kohteet =
        {
            ("ateena", 37.98, 23.73), ("istanbul", 41.01, 28.98), ("kairo", 30.04, 31.24), ("tanger", 35.76, -5.83),
            ("moskova", 55.75, 37.62), ("tokio", 35.68, 139.69), ("sydney", -33.87, 151.21), ("newyork", 40.71, -74.0),
            ("kapkaupunki", -33.92, 18.42), ("rio", -22.91, -43.17),
        };

        sealed class Lento
        {
            public double Lat1, Lon1, ReittiM, Huippu, SaapumisKorkeus = 1_200_000.0;
            public LennonAikajana.Jako Jako;
            public LennonAikajana.Avain[] Avaimet;
            public LennonAikajana.Kierto Maisema;

            public double P(double t) => LennonAikajana.KoneenOsuus(t, Jako);
            public double Suunta(double t) => Suuntima(LontooLat, LontooLon, Lat1, Lon1, P(t));
            public (double e, double k, double s, double kohde, double kone) Arvo(double t) => LennonAikajana.Arvo(Avaimet, t, Suunta(t));
        }

        static Lento Tee(string id, double lat1, double lon1, double? kestoS = null)
        {
            var l = new Lento { Lat1 = lat1, Lon1 = lon1 };
            l.ReittiM = LennonAikajana.ReittiM(LontooLat, LontooLon, lat1, lon1);
            l.Huippu = Math.Min(900000.0, l.ReittiM * 0.12);
            l.Jako = LennonAikajana.Jaa(kestoS ?? LennonAikajana.Kesto(l.ReittiM));
            l.Maisema = id != null && LennonAikajana.Kaupungit.TryGetValue(id, out var k) ? k : LennonAikajana.EiMaisemaa;
            l.Avaimet = LennonAikajana.Laske(l.ReittiM, l.SaapumisKorkeus, l.Maisema, l.Jako, l.Suunta);
            // Lähtöasento kuten Nappula: valintanäkymä / Lontoon zoomi, pohjoinen ylös.
            l.Avaimet[0] = new LennonAikajana.Avain { Osuus = 0, Kohde = -1, SuuntaAbs = true, Etaisyys = 2_000_000, Kallistus = 0, Suunta = 0 };
            return l;
        }

        static Lento Ateena(double? kesto = null) => Tee("ateena", 37.98, 23.73, kesto);

        // ---- Kesto ja vaihejako ----

        [Testi]
        static void KestoLontooAteenaOn20s()
        {
            double k = LennonAikajana.Kesto(LennonAikajana.ReittiM(LontooLat, LontooLon, 37.98, 23.73));
            Oleta.Tosi(Math.Abs(k - 20.0) < 0.05, $"Ateena {k:0.000} s");
        }

        [Testi]
        static void KestoRajautuu16Ja26()
        {
            Oleta.Tosi(LennonAikajana.Kesto(LennonAikajana.ReittiM(LontooLat, LontooLon, 48.86, 2.35)) == 16.0, "Pariisi 16 s");
            double sydney = LennonAikajana.Kesto(LennonAikajana.ReittiM(LontooLat, LontooLon, -33.87, 151.21));
            Oleta.Tosi(sydney > 25.0 && sydney <= 26.0, $"Sydney {sydney:0.00}");
            Oleta.Tosi(LennonAikajana.Kesto(40_000_000) == 26.0, "katto 26 s");
            Oleta.Tosi(LennonAikajana.Kesto(1) == 16.0, "lattia 16 s");
            // Monotoninen reitin pituuden mukaan.
            double ed = 0;
            for (double m = 100_000; m < 20_000_000; m *= 1.3)
            {
                double k = LennonAikajana.Kesto(m);
                Oleta.Tosi(k >= ed, "monotoninen");
                ed = k;
            }
        }

        static double[] Loput(LennonAikajana.Jako j) =>
            new[] { j.Syoksy, j.Sivu, j.Loitto, j.Liuku, j.Kierto, j.Tasainen, 1.0 };

        [Testi]
        static void AloituslentoDynaaminen()
        {
            // Löydös 120: kiinteä 10 s, vaihejako Nappulan rajapinnalle (Liuku = matkan alku 6,0 s, Kierto = orbit 8,6 s),
            // kone monotoninen 0 → 1, lähes paikallaan lähikuvissa (1,0–4,3 s) ja nopein matkassa.
            var j = LennonAikajana.JaaAloitus(LennonAikajana.AloituslennonKestoS);
            Oleta.Tosi(j.Aloitus && Math.Abs(j.KestoS - 10) < 1e-9, "kesto 10 s");
            var loput = Loput(j);
            for (int i = 1; i < loput.Length; i++) Oleta.Tosi(loput[i] >= loput[i - 1], $"raja {i}: {loput[i]} < {loput[i - 1]}");
            Oleta.Tosi(Math.Abs(j.Liuku - 0.6) < 1e-12 && Math.Abs(j.Kierto - 0.86) < 1e-12, "Liuku 6,0 s, Kierto 8,6 s");
            Oleta.Tosi(LennonAikajana.Vaihe(0.5, j) == LennonVaihe.Nousu && LennonAikajana.Vaihe(0.65, j) == LennonVaihe.Matka
                       && LennonAikajana.Vaihe(0.75, j) == LennonVaihe.Lasku, "vaiheet");
            double edellinen = 0;
            for (int i = 1; i <= 200; i++)
            {
                double p = LennonAikajana.KoneenOsuus(i / 200.0, j);
                Oleta.Tosi(p >= edellinen - 1e-12, $"kone taaksepäin t={i / 200.0}");
                edellinen = p;
            }
            Oleta.Tosi(Math.Abs(edellinen - 1) < 1e-9, "kone perillä");
            double V(double t) => LennonAikajana.KoneenOsuus(t + 0.01, j) - LennonAikajana.KoneenOsuus(t, j);
            foreach (double t in new[] { 0.12, 0.2, 0.3, 0.4 })
                Oleta.Tosi(V(t) * 10 < V(0.64), $"lähikuva t={t} hitaampi kuin matka: {V(t):0.00000} / {V(0.64):0.00000}");
            // Kone 10 km:n vähimmäiskorkeudessa ennen kuin kamera saapuu (ylitys 1,15 s).
            Oleta.Tosi(LennonAikajana.KoneenMinimi(0.115, j, LennonAikajana.AloituksenNousu) >= LennonAikajana.MinKoneKorkeusM - 1e-6, "kone ylhäällä");
        }

        [Testi]
        static void VaiheetReferenssissa()
        {
            var j = LennonAikajana.Jaa(20);
            var odotettu = new[] { 2.6, 4.2, 11.0, 12.0, 15.5, 18.5, 20.0 };
            var saatu = Loput(j);
            for (int i = 0; i < odotettu.Length; i++)
                Oleta.Tosi(Math.Abs(saatu[i] * 20 - odotettu[i]) < 1e-9, $"raja {i}: {saatu[i] * 20:0.000} ≠ {odotettu[i]}");
            Oleta.Tosi(Math.Abs(j.LoittoSauma * 20 - (4.2 + 0.4 * 6.8)) < 1e-9, "loittonuksen sauma");
        }

        [Testi]
        static void VaiheetAaripaissa()
        {
            // 16 s: sivukylki 1,28 → 1,4 s ja orbit 3,6 → 4 s; muut jakavat loput (10,6 s) referenssin suhteessa.
            var j = LennonAikajana.Jaa(16);
            double S(double o) => o * 16;
            Oleta.Tosi(Math.Abs(S(j.Sivu - j.Syoksy) - 1.4) < 1e-9, $"sivukylki {S(j.Sivu - j.Syoksy):0.000}");
            Oleta.Tosi(Math.Abs(S(1 - j.Kierto) - 4.0) < 1e-9, $"orbit {S(1 - j.Kierto):0.000}");
            double m = 10.6 / 13.9;
            Oleta.Tosi(Math.Abs(S(j.Syoksy) - 2.6 * m) < 1e-9, "syöksy");
            Oleta.Tosi(Math.Abs(S(j.Loitto - j.Sivu) - 6.8 * m) < 1e-9, "loittonus");
            Oleta.Tosi(Math.Abs(S(j.Liuku - j.Loitto) - 1.0 * m) < 1e-9, "liuku");
            Oleta.Tosi(Math.Abs(S(j.Kierto - j.Liuku) - 3.5 * m) < 1e-9, "kierto");
            Oleta.Tosi(Math.Abs(S(1 - j.Tasainen) - 4.0 / 3) < 1e-9, "jarrutus 1/3 orbitista");
            // 26 s: kaikki 1,3-kertaisina (alarajat eivät vaikuta).
            var k = LennonAikajana.Jaa(26);
            var r = Loput(LennonAikajana.Jaa(20));
            var q = Loput(k);
            for (int i = 0; i < r.Length; i++) Oleta.Tosi(Math.Abs(q[i] - r[i]) < 1e-12, $"26 s suhde {i}");
            Oleta.Tosi(Math.Abs((k.Sivu - k.Syoksy) * 26 - 2.08) < 1e-9, "26 s sivukylki 2,08");
        }

        // ---- Jatkuvuus ----

        static double[] Raidat(Lento l, double t)
        {
            var a = l.Arvo(t);
            return new[] { Math.Log(a.e), a.k, a.s, a.kohde, a.kone };
        }

        /// <summary>Raidan muutos; suunta modulo 360 (suhteellisen ja absoluuttisen raidan saumassa luku voi kiertyä
        /// täyden kierroksen, mikä ei näy kuvassa: PalloKierto käyttää suuntaa vain sin/cos-muodossa).</summary>
        static double Ero(int raita, double b, double a) => raita == 2 ? ((b - a) % 360 + 540) % 360 - 180 : b - a;

        static readonly string[] RaidanNimi = { "log etäisyys", "kallistus", "suunta", "kohde", "kone" };

        [Testi]
        static void NopeusJatkuvaSaumoissa()
        {
            foreach (var kesto in new double?[] { 16, 20, 26, null })
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Tee(id, lat, lon, kesto);
                double T = l.Jako.KestoS;
                // Raitojen suurin nopeus (yksikköä / s) koko lennolla: saumahypyn mittakaava.
                var maks = new double[5];
                double[] ed = Raidat(l, 0);
                for (int i = 1; i <= 4000; i++)
                {
                    double t = i / 4000.0;
                    var r = Raidat(l, t);
                    for (int k = 0; k < 5; k++) maks[k] = Math.Max(maks[k], Math.Abs(Ero(k, r[k], ed[k])) * 4000 / T);
                    ed = r;
                }
                double h = 1e-6;
                foreach (var a in l.Avaimet)
                {
                    double t = a.Osuus;
                    if (t <= 0 || t >= 1) continue;
                    var v0 = Raidat(l, t - h);
                    var v1 = Raidat(l, t);
                    var v2 = Raidat(l, t + h);
                    for (int k = 0; k < 5; k++)
                    {
                        double vasen = Ero(k, v1[k], v0[k]) / (h * T), oikea = Ero(k, v2[k], v1[k]) / (h * T);
                        Oleta.Tosi(Math.Abs(oikea - vasen) <= 0.01 * maks[k] + 1e-6,
                            $"{id} {T:0.0} s, sauma {t * T:0.00} s, {RaidanNimi[k]}: {vasen:0.####} → {oikea:0.####} (maks {maks[k]:0.###})");
                    }
                }
            }
        }

        // ---- Orbit ----

        [Testi]
        static void OrbitinKulmanopeusVakio()
        {
            foreach (var kesto in new double?[] { 16, 20, 26, null })
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Tee(id, lat, lon, kesto);
                var j = l.Jako;
                double T = j.KestoS, h = 1e-6;
                double W(double t) => (l.Arvo(t + h).s - l.Arvo(t - h).s) / (2 * h * T);
                double w0 = W(j.Kierto + 1e-4);
                Oleta.Tosi(Math.Abs(w0) > 1, $"{id}: orbit liikkuu ({w0:0.00} °/s)");
                for (int i = 1; i < 20; i++)
                {
                    double t = j.Kierto + (j.Tasainen - j.Kierto) * i / 20.0;
                    Oleta.Tosi(Math.Abs(W(t) - w0) < 1e-6 * Math.Abs(w0), $"{id}: vakio {W(t):0.0000} vs {w0:0.0000}");
                }
                // Kierto (c): kulmanopeus kasvaa samaan suuntaan kuin orbit.
                double ed = 0;
                for (int i = 1; i <= 20; i++)
                {
                    double t = j.Liuku + (j.Kierto - j.Liuku) * i / 20.0 - 1e-5;
                    double w = W(t) * Math.Sign(w0);
                    Oleta.Tosi(w >= ed - 1e-9, $"{id}: kierron kulmanopeus kasvaa ({w:0.00} < {ed:0.00})");
                    ed = w;
                }
                // Jarrutus: sama suunta loppuun asti (ei pysähdystä kesken eikä paluuta).
                for (int i = 0; i < 20; i++)
                {
                    double t = j.Tasainen + (1 - j.Tasainen) * i / 20.0 + 1e-5;
                    Oleta.Tosi(W(t) * Math.Sign(w0) > 0, $"{id}: jarrutus ei pysähdy kesken");
                }
            }
        }

        [Testi]
        static void LoppuasentoPohjoinenJaKallistus0()
        {
            foreach (var kesto in new double?[] { 16, 20, 26, null })
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Tee(id, lat, lon, kesto);
                var a = l.Arvo(1.0);
                Oleta.Tosi(Math.Abs(a.k) < 1e-9, $"{id}: kallistus {a.k}");
                double s = ((a.s % 360) + 360) % 360;
                Oleta.Tosi(Math.Min(s, 360 - s) < 1e-9, $"{id}: suunta {a.s}");
                Oleta.Tosi(Math.Abs(a.kohde - 2) < 1e-12, $"{id}: kohde saapumisnäkymä");
                Oleta.Tosi(Math.Abs(a.e - l.SaapumisKorkeus) < 1e-3, $"{id}: korkeus {a.e}");
            }
        }

        [Testi]
        static void KiertoEnintaan180LyhyempaanSuuntaan()
        {
            // Fable 24.9. klo 18: kierron (c + d) kokonaiskulma ≤ 180° lyhyempään suuntaan; maisema ratkaisee vain
            // tasatilanteen (180° ± 15°), jolloin kaari saa olla enintään 195°.
            foreach (var kesto in new double?[] { 16, 20, 26, null })
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Tee(id, lat, lon, kesto);
                double kaari = l.Arvo(1).s - l.Arvo(l.Jako.Liuku).s;
                Oleta.Tosi(Math.Abs(kaari) <= 180.0 + 1e-9, $"{id} {l.Jako.KestoS:0.0} s: kierto {kaari:0.0}°");
            }
            // Kaikki lentosuunnat: ilman maisemaa ≤ 180°, maiseman kanssa ≤ 195° ja yli 180° vain maiseman takia.
            for (double f = 0; f < 360; f += 0.5)
            {
                double k0 = LennonAikajana.Kaari(f, double.NaN, 163, out _);
                Oleta.Tosi(Math.Abs(k0) <= 180.0 + 1e-9, $"f={f}: {k0:0.0}°");
                foreach (double m in new[] { 0.0, 45, 135, 235, 315 })
                {
                    double k = LennonAikajana.Kaari(f, m, 163, out _);
                    Oleta.Tosi(Math.Abs(k) <= 195.0 + 1e-9, $"f={f}, maisema {m}: {k:0.0}°");
                    if (Math.Abs(k) > 180.0 + 1e-9) Oleta.Tosi(Math.Abs(k0) >= 165.0 - 1e-9, $"f={f}: yli 180° ilman tasatilannetta");
                }
            }
        }

        [Testi]
        static void KiertoTavoitenopeudenLahella()
        {
            // Sivukylki valitaan sille puolelle, jolta kulma on lähimpänä tavoitetta (35°/s ≈ 163° 20 s:n lennolla):
            // puolten kaaret eroavat 117°, joten vakio-osuuden nopeus on ~12–38°/s.
            for (double f = 0; f < 360; f += 1)
            {
                double k = LennonAikajana.Kaari(f, double.NaN, 163, out _);
                Oleta.Tosi(Math.Abs(k) >= 50 && Math.Abs(k) <= 180, $"f={f}: {k:0.0}°");
            }
        }

        // ---- Kone ruudulla ja maastoturva (pallomalli PalloKierto.Aseta ja Nappula.Lento) ----

        struct V
        {
            public double X, Y, Z;
            public V(double x, double y, double z) { X = x; Y = y; Z = z; }
            public static V operator +(V a, V b) => new V(a.X + b.X, a.Y + b.Y, a.Z + b.Z);
            public static V operator -(V a, V b) => new V(a.X - b.X, a.Y - b.Y, a.Z - b.Z);
            public static V operator *(V a, double k) => new V(a.X * k, a.Y * k, a.Z * k);
            public double Pituus => Math.Sqrt(X * X + Y * Y + Z * Z);
            public V Yksikko => this * (1 / Pituus);
            public static double Piste(V a, V b) => a.X * b.X + a.Y * b.Y + a.Z * b.Z;
            public static V Risti(V a, V b) => new V(a.Y * b.Z - a.Z * b.Y, a.Z * b.X - a.X * b.Z, a.X * b.Y - a.Y * b.X);
        }

        static V Yks(double lat, double lon)
        {
            double f = lat * Math.PI / 180, l = lon * Math.PI / 180;
            return new V(Math.Cos(f) * Math.Cos(l), Math.Cos(f) * Math.Sin(l), Math.Sin(f));
        }

        static (double lat, double lon) Isoympyra(double lat0, double lon0, double lat1, double lon1, double p)
        {
            V a = Yks(lat0, lon0), b = Yks(lat1, lon1);
            double w = Math.Acos(Math.Max(-1, Math.Min(1, V.Piste(a, b))));
            V q = w < 1e-12 ? a : a * (Math.Sin((1 - p) * w) / Math.Sin(w)) + b * (Math.Sin(p * w) / Math.Sin(w));
            return (Math.Asin(q.Z) * 180 / Math.PI, Math.Atan2(q.Y, q.X) * 180 / Math.PI);
        }

        /// <summary>Kuten Nappula.Suuntima.</summary>
        static double Suuntima(double lat0, double lon0, double lat1, double lon1, double p)
        {
            double pa = Math.Min(p, 0.995), pb = pa + 0.005;
            var a = Isoympyra(lat0, lon0, lat1, lon1, pa);
            var b = Isoympyra(lat0, lon0, lat1, lon1, pb);
            double r = Math.PI / 180, f1 = a.lat * r, f2 = b.lat * r, dl = (b.lon - a.lon) * r;
            double y = Math.Sin(dl) * Math.Cos(f2);
            double x = Math.Cos(f1) * Math.Sin(f2) - Math.Sin(f1) * Math.Cos(f2) * Math.Cos(dl);
            return Math.Atan2(y, x) * 180 / Math.PI;
        }

        /// <summary>Kameran silmä ja katsepiste (PalloKierto.Aseta pallolla) sekä koneen paikka hetkellä t.</summary>
        static (V silma, V kohde, V kone, double koneKorkeus) Kuva(Lento l, double t)
        {
            var j = l.Jako;
            double p = l.P(t);
            var q = Isoympyra(LontooLat, LontooLon, l.Lat1, l.Lon1, p);
            double h = Math.Max(l.Huippu * Math.Sin(Math.PI * p), LennonAikajana.KoneenMinimi(t, j));
            var a = l.Arvo(t);
            // Kohde kuten Nappula: −1 lähtöpiste (Lontoo, maassa) → 0 kone → 1 kaupunki → 2 saapumisnäkymä (≈ kaupunki).
            double klat, klon, katse;
            if (a.kohde < 0) { double s = a.kohde + 1; klat = LontooLat + (q.lat - LontooLat) * s; klon = LontooLon + (q.lon - LontooLon) * s; katse = h * s; }
            else { double s = Math.Min(1, a.kohde); klat = q.lat + (l.Lat1 - q.lat) * s; klon = q.lon + (l.Lon1 - q.lon) * s; katse = h * (1 - s); }
            V ylos = Yks(klat, klon);
            V kohde = ylos * (R + katse);
            V napa = new V(0, 0, 1);
            V pohjoinen = (napa - ylos * V.Piste(napa, ylos)).Yksikko;
            V ita = V.Risti(pohjoinen, ylos).Yksikko;
            double b = a.s * Math.PI / 180, k = Math.Min(85, a.k) * Math.PI / 180;
            V eteen = pohjoinen * Math.Cos(b) + ita * Math.Sin(b);
            V suunta = ylos * Math.Cos(k) - eteen * Math.Sin(k);
            V silma = kohde + suunta * a.e;
            V kone = Yks(q.lat, q.lon) * (R + h);
            return (silma, kohde, kone, h);
        }

        static double Kulma(V a, V b) => Math.Acos(Math.Max(-1, Math.Min(1, V.Piste(a.Yksikko, b.Yksikko)))) * 180 / Math.PI;

        [Testi]
        static void KoneRuudullaLoittonuksessa()
        {
            // iPad pystyssä: pystysuunnan FOV 50°, vaakasuunnan ~36°; keskialue = puolet vaakasuunnan puolikkaasta.
            const double PuoliFov = 18.0;
            foreach (var kesto in new double?[] { 16, 20, 26 })
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Tee(id, lat, lon, kesto);
                var j = l.Jako;
                double edKone = double.MaxValue;
                for (int i = 0; i <= 400; i++)
                {
                    double t = j.Sivu + (j.Liuku - j.Sivu) * i / 400.0;
                    var (silma, kohde, kone, _) = Kuva(l, t);
                    double kulma = Kulma(kohde - silma, kone - silma);
                    Oleta.Tosi(kulma < 0.5 * PuoliFov, $"{id}: kone {kulma:0.0}° katseesta t={t * j.KestoS:0.00} s");
                    Oleta.Tosi(V.Piste((kone - silma), (kohde - silma)) > 0, $"{id}: kone kameran takana");
                    // Koko ei kasva loittonuksessa, eikä mene alle merkkikoon (Nappula: max(malliPx, Kone × leveys)).
                    double k = l.Arvo(t).kone;
                    Oleta.Tosi(k >= 0 && k <= edKone + 1e-12, $"{id}: koneen koko {k}");
                    edKone = k;
                }
            }
        }

        [Testi]
        static void KameraEiMaanAlla()
        {
            foreach (var kesto in new double?[] { 16, 20, 26 })
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Tee(id, lat, lon, kesto);
                var j = l.Jako;
                for (int i = 0; i <= 2000; i++)
                {
                    double t = i / 2000.0;
                    var (silma, _, _, h) = Kuva(l, t);
                    double silmanKorkeus = silma.Pituus - R;
                    // Kamera aina maan yllä; lähikuvissa (sivukylki) koneen tasolla tai yläpuolella.
                    Oleta.Tosi(silmanKorkeus > 1000, $"{id}: silmä {silmanKorkeus:0} m t={t * j.KestoS:0.00} s");
                    if (t >= j.Syoksy && t <= j.Kierto)
                        Oleta.Tosi(h >= LennonAikajana.MinKoneKorkeusM - 1e-6, $"{id}: kone {h:0} m t={t * j.KestoS:0.00} s");
                    // Lähikuvat ja loittonus (kohde = kone): silmä koneen tasolla tai yläpuolella. Kierrossa kamera
                    // katsoo kaupunkia, ja liioitellulla kaarella (huippu · sin πp) lentävä kone voi olla sen yllä.
                    if (t >= j.Syoksy && t <= j.Loitto)
                        Oleta.Tosi(silmanKorkeus >= h, $"{id}: silmä {silmanKorkeus:0} m koneen ({h:0} m) alla");
                }
            }
        }

        [Testi]
        static void SivukylkiLahikuvassa()
        {
            var l = Ateena();
            var j = l.Jako;
            var alku = l.Arvo(j.Syoksy);
            var loppu = l.Arvo(j.Sivu);
            double rel(double s, double t) => ((s - l.Suunta(t)) % 360 + 360) % 360;
            // Sivukylki 90° → 110° tai peilattuna 270° → 250° (puoli valitaan kierron tavoitekulmasta).
            double r0 = rel(alku.s, j.Syoksy), r1 = rel(loppu.s, j.Sivu);
            Oleta.Tosi(Math.Abs(Math.Min(r0, 360 - r0) - 90) < 1e-6, $"syöksyn loppu {r0:0.0}°");
            Oleta.Tosi(Math.Abs(Math.Min(r1, 360 - r1) - 110) < 1e-6, $"sivukyljen loppu {r1:0.0}°");
            Oleta.Tosi(Math.Abs(alku.k - 84) < 1e-9 && Math.Abs(alku.kone - 0.9) < 1e-9, "84°, 0,9 ruutua");
            Oleta.Tosi(Math.Abs(l.Arvo(j.Loitto).e - 3_000_000) < 1, "loittonus 3000 km");
            Oleta.Tosi(Math.Abs(l.Arvo(j.Loitto).k - 35) < 1e-9, "loittonus 35°");
            Oleta.Tosi(Math.Abs(l.Arvo(j.Kierto).e - 250_000) < 1 && Math.Abs(l.Arvo(j.Kierto).k - 55) < 1e-9, "kierto 250 km, 55°");
        }

        [Testi]
        static void TulostaReferenssi()
        {
            // Ei väitteitä: raportti Fablelle (./kaanna.sh TulostaReferenssi).
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Tee(id, lat, lon);
                var j = l.Jako;
                double T = j.KestoS, h = 1e-6;
                double kaari = l.Arvo(1).s - l.Arvo(j.Liuku).s;
                double w = (l.Arvo(j.Kierto + 0.01 + h).s - l.Arvo(j.Kierto + 0.01 - h).s) / (2 * h * T);
                double maxKulma = 0;
                for (int i = 0; i <= 200; i++)
                {
                    double t = j.Liuku + (j.Kierto - j.Liuku) * i / 200.0;
                    var (silma, kohde, kone, _) = Kuva(l, t);
                    maxKulma = Math.Max(maxKulma, Kulma(kohde - silma, kone - silma));
                }
                Console.WriteLine($"      {id,-12} {l.ReittiM / 1000,6:0} km {T,5:0.0} s  kierto {kaari,7:0} °  orbit {w,6:0.0} °/s  " +
                                  $"kone (c):ssä enint. {maxKulma,5:0.0}° katseesta, p(liuku) {l.P(j.Liuku):0.00}");
            }
        }
    }
}
