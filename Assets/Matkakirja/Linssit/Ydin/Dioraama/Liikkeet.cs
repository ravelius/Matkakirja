// DIORAAMAN LIIKESILMUKOIDEN PUHDAS LOGIIKKA — C#-PORTTI (Linnanrakentaja, erä 2b, ali-agentti P4b,
// 29.9.2026). JS-pari: js/dioraama/liikkeet.js (nivelKulmat, juuriNousu). Speksi: docs/raportit/
// dioraama-rajapinnat-era2b-20260929.md kohta 4 "3D-HAHMOT". Pariteetti: kultaiset vektorit
// Linssit-testit/kultaiset/dioraama-liikkeet-vektorit.json (tools/dioraama/tee-liikevektorit.mjs),
// testattu Linssit-testit/Testit/DioraamaTestit.cs:ssä.
//
// ERO JS:ÄÄN NÄHDEN (rakenteellinen, EI logiikassa): JS:ssä LIIKKEET-pankki on kiinteä moduulin
// sisäinen import (js/dioraama/pankit/liikkeet.js); C#:ssa liikedata tulee rakennus.json:sta
// (DioraamaData.Rakennus.Liikkeet, ks. DioraamaData.cs:n Liike-luokka) — kutsuja (DioraamaHahmot3D)
// hakee Liike-olion nimellä pankista ja antaa SEN (ei nimeä) tälle luokalle. Itse liikelogiikka
// (näytteistys avainten välillä, smoothstep, juuren kaksi pomppua per silmukka) on bittitäsmällinen
// JS:n kanssa (double-tarkkuudella, kuten muukin Ydin — vrt. Kameraliike.cs).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Dioraama
{
    public static class Liikkeet
    {
        /// <summary>Kaikki 16 niveltä, SAMA järjestys/nimet kuin js/dioraama/liikkeet.js:n NIVELET
        /// (== tools/dioraama/hahmot3d.mjs:n nivelPuu()). NivelKulmat palauttaa AINA kaikki nämä —
        /// nivel, jota Liike.Avaimet ei mainitse, on levossa [0,0,0] (ei virhe, ei puuttuva avain).</summary>
        public static readonly string[] Nivelet =
        {
            "lantio", "selka", "kaula", "paa",
            "olka_v", "kyynar_v", "kasi_v", "olka_o", "kyynar_o", "kasi_o",
            "lonkka_v", "polvi_v", "nilkka_v", "lonkka_o", "polvi_o", "nilkka_o",
        };

        /// <summary>Kolmion hermiittimäinen pehmennys [0,1] → [0,1] (sama kaava kuin js/dioraama/liikkeet.js:
        /// nopeus 0 molemmissa päissä). Kutsuja (NivelenKulma) takaa f ∈ [0,1] — ei rajausta tässä.</summary>
        public static double Smoothstep(double f) => f * f * (3 - 2 * f);

        /// <summary>Yhden nivelen avainlista ([t01,rx,ry,rz][], t01 KASVAVA) → [rx,ry,rz] annetulla t:llä.
        /// t ennen ensimmäistä/jälkeen viimeisen avaimen → reunan arvo (ei ekstrapolointia) — sama kuin
        /// JS:n nivelenKulma.</summary>
        static double[] NivelenKulma(double[][] avaimet, double t)
        {
            if (avaimet == null || avaimet.Length == 0) return new double[] { 0, 0, 0 };
            if (avaimet.Length == 1 || t <= avaimet[0][0]) return new[] { avaimet[0][1], avaimet[0][2], avaimet[0][3] };
            var viimeinen = avaimet[avaimet.Length - 1];
            if (t >= viimeinen[0]) return new[] { viimeinen[1], viimeinen[2], viimeinen[3] };
            for (int i = 0; i < avaimet.Length - 1; i++)
            {
                var a = avaimet[i];
                var b = avaimet[i + 1];
                if (t >= a[0] && t <= b[0])
                {
                    double vali = b[0] - a[0];
                    double f = vali > 1e-9 ? Smoothstep((t - a[0]) / vali) : 0;
                    return new[]
                    {
                        a[1] + (b[1] - a[1]) * f,
                        a[2] + (b[2] - a[2]) * f,
                        a[3] + (b[3] - a[3]) * f,
                    };
                }
            }
            return new[] { viimeinen[1], viimeinen[2], viimeinen[3] }; // ei pitäisi tapahtua (ks. JS-kommentti)
        }

        /// <summary>Kaikkien 16 nivelen kulmat (asteina) annetulla t01:llä (0..1) — levossa [0,0,0], jos
        /// silmukka ei liikuta niveltä. `silmukka` on kutsujan DioraamaData.Rakennus.Liikkeet-pankista
        /// hakema Liike-olio (EI nimi — ks. tiedoston yläkommentti).</summary>
        public static Dictionary<string, double[]> NivelKulmat(Liike silmukka, double t)
        {
            if (silmukka == null) throw new ArgumentNullException(nameof(silmukka));
            var tulos = new Dictionary<string, double[]>();
            foreach (var nivel in Nivelet)
            {
                var avaimet = silmukka.Avaimet.TryGetValue(nivel, out var a) ? a : null;
                tulos[nivel] = NivelenKulma(avaimet, t);
            }
            return tulos;
        }

        /// <summary>Juuren pystysuora nousu (m) — 0, jos silmukalla ei ole JuuriNousuM-kenttää. Kaksi
        /// "pomppua" per silmukka (yksi per askel): |sin(2·π·t)| on 0 kohdissa t=0, 0.5, 1 ja huipussaan
        /// (=JuuriNousuM) kohdissa t=0.25, 0.75 — sama kaava kuin JS:n juuriNousu.</summary>
        public static double JuuriNousu(Liike silmukka, double t)
        {
            if (silmukka == null) throw new ArgumentNullException(nameof(silmukka));
            double nousu = silmukka.JuuriNousuM ?? 0;
            if (nousu == 0) return 0;
            return nousu * Math.Abs(Math.Sin(2 * Math.PI * t));
        }
    }
}
