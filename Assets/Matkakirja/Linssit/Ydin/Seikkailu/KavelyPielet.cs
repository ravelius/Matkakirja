// PORTAALIN PIELET JA KYNNYS (Siirtoseppä 11.10.2026; Laitetestaaja laituri-a1 f1041376: "laiturilla eteenpäin → kamera katsoo lattiaa").
// Mittaus (vesiportti-tormays.glb, paketti b257fdf63e18f222): kansi ja silta ovat samassa korkeudessa (−5,90), askel ei estä. Suora
// nousu:laituri → ovi:vesiportti-alku kulkee 0,07–0,43 m kannen itäreunan sisäpuolella; silta kääntyy portaalista 55° oikealle, joten
// tatti pohjassa kapseli liukuu kannen seinää pitkin aukon ohi kannen kaakkoiskulmaan (glTF −55,05 / 16,71, Unity z +16,71 peilattuna)
// kalliorannan eteen. Lisäksi aukossa kaksi putoamiskohtaa: kannen seinän pää ja sillan seinän matala kiila (0,47–0,8 m rako) sekä
// kolmioaukko kannen reunan ja sillan alun välissä (enintään 0,75 m). LR:n geometriakorjaukseen asti näkymättömät laatikot portaalin
// kehyksessä (t = matka portaalista kohti paria, s = sivu, + = n = (−u.z, u.x), glTF): pielet ohjaavat reunaa myötäilevän pelaajan
// sillalle ja kynnys peittää kolmioaukon. Vain taulukon portaalit; laatikot vain, kun portaali on mitatussa paikassa (±0,3 m).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Seikkailu
{
    public static class KavelyPielet
    {
        public const double PieliPaksuusM = 0.1, PieliAlaM = 0.3, PieliYlaM = 1.1, KynnysPaksuusM = 0.2, PaikkaVaraM = 0.3;

        /// <summary>Portaali, sen pari (suunta), mitattu paikka (glTF x, z) sekä pielet (t0, s0) → (t1, s1) ja kynnys (t, s -välit).</summary>
        sealed class Maaritys
        {
            public string Portaali, Pari; public double X, Z;
            public (double T0, double S0, double T1, double S1)[] Pielet;
            public double KynnysT0, KynnysT1, KynnysS0, KynnysS1;
        }

        static readonly Maaritys[] Taulu =
        {
            new Maaritys
            {
                Portaali = "ovi:vesiportti-alku", Pari = "ovi:vesiportti-loppu", X = -58.381, Z = 20.926,
                Pielet = new[]
                {
                    (0.0, -1.2, 2.5, -1.2),    // kannen puoli: seinän pää (t 1,05 / s −1,59) ja sillan kiila (0,78 / −1,21); kannen sisällä 0,7 m suppilona
                    (0.8, 1.2, 2.5, 1.2),      // sillan pohjoisseinän matala kiila (astuttava t 0,8–1,5)
                    (-1.0, 1.69, 0.85, 1.2),   // kannen seinän pää (−0,91 / 1,67) → sillan seinän alku (0,81 / 1,19): kolmioaukko kiinni
                },
                KynnysT0 = -1.0, KynnysT1 = 1.0, KynnysS0 = -1.2, KynnysS1 = 1.7,
            },
        };

        /// <summary>Laatikot glTF-koordinaateissa (KavelyLeikkaus: keskipiste, koko x = pituus, y, z = paksuus, kierto_y = atan2(u.z, u.x));
        /// nimet "pieli:&lt;portaali&gt;-N" ja "kynnys:&lt;portaali&gt;". Tyhjä, jos portaalia tai paria ei ole tai portaali on siirtynyt.</summary>
        public static List<KavelyLeikkaus> Laske(KavelyData d)
        {
            var ulos = new List<KavelyLeikkaus>();
            if (d == null) return ulos;
            foreach (var m in Taulu)
            {
                KavelyMerkki p = null, q = null;
                foreach (var k in d.Merkit) { if (k.Nimi == m.Portaali) p = k; else if (k.Nimi == m.Pari) q = k; }
                if (p == null || q == null || Math.Abs(p.X - m.X) > PaikkaVaraM || Math.Abs(p.Z - m.Z) > PaikkaVaraM) continue;
                double ux = q.X - p.X, uz = q.Z - p.Z, l = Math.Sqrt(ux * ux + uz * uz);
                if (l < 1e-6) continue;
                ux /= l; uz /= l;
                double nx = -uz, nz = ux;
                (double, double) Piste(double t, double s) => (p.X + ux * t + nx * s, p.Z + uz * t + nz * s);
                int i = 0;
                foreach (var (t0, s0, t1, s1) in m.Pielet)
                {
                    var (ax, az) = Piste(t0, s0); var (bx, bz) = Piste(t1, s1);
                    double dx = bx - ax, dz = bz - az, pit = Math.Sqrt(dx * dx + dz * dz);
                    // Paksuus ulospäin käytävästä: sisäpinta pysyy viivalla (käytävän leveys ennallaan).
                    double ox = -dz / pit, oz = dx / pit, puoli = (ox * nx + oz * nz) * (s0 + s1) >= 0 ? 1 : -1;
                    double cx = (ax + bx) / 2 + ox * puoli * PieliPaksuusM / 2, cz = (az + bz) / 2 + oz * puoli * PieliPaksuusM / 2;
                    ulos.Add(new KavelyLeikkaus($"pieli:{p.Tunnus}-{++i}", cx, p.Y + (PieliYlaM - PieliAlaM) / 2, cz,
                        pit, PieliAlaM + PieliYlaM, PieliPaksuusM, Math.Atan2(dz, dx)));
                }
                var (kx, kz) = Piste((m.KynnysT0 + m.KynnysT1) / 2, (m.KynnysS0 + m.KynnysS1) / 2);
                ulos.Add(new KavelyLeikkaus($"kynnys:{p.Tunnus}", kx, p.Y - KynnysPaksuusM / 2, kz,
                    m.KynnysT1 - m.KynnysT0, KynnysPaksuusM, m.KynnysS1 - m.KynnysS0, Math.Atan2(uz, ux)));
            }
            return ulos;
        }
    }
}
