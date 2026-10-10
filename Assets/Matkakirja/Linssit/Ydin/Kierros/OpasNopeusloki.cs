// PALLON NOPEUSLOKI (omistaja TF 180: "Kippi pysähtyy vieläkin välillä liiaksi paikalleen"; PT juna 181, Linssiseppä): QA-rivi pallon
// liikkeestä ValiS:n välein, jotta simu- tai laiteajosta voidaan laskea pysähdyslista ilman videota. Sovitin kirjoittaa rivit
// komennolla "opas nopeusloki 0|1", testiajuri laskee samat näytteet Ydin-tasolla (KippiPysahdyksetTestit).
//   MATKAKIRJA opas nopeus t=<s> v=<m/s> kulma=<°/s> kohde=<id> vaihe=<lento|kierto|odotus|lataus|siirto>
// v = silmän nopeus (3D, m/s), kulma = katsesuunnan kääntymisnopeus (°/s; suuntima ja kallistus yhdessä, eli kuvan pyöriminen),
// vaihe lento | kierto | odotus | lataus | siirto (tumma siirtoruutu ei ole seisahdus).
// SEISAHDUS (PT 11.10.): sekä v < SeisOsuus × matkanopeus että kulma < SeisKulmaAstS yhtäjaksoisesti yli SeisMinS. Matkanopeus on
// pysähdysten kierron tyypillinen silmänopeus (kierto-vaiheen näytteiden mediaani), eli pallo "seisoo", kun se liikkuu alle
// kymmenesosalla tavallisesta kiertovauhdista eikä kuva käänny.
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class OpasNopeusloki
    {
        public const double ValiS = 0.1, SeisOsuus = 0.1, SeisKulmaAstS = 1.0, SeisMinS = 1.0;

        public struct Nayte { public double T, V, Kulma; public string Kohde, Vaihe; }
        public struct Seisahdus { public double Alku, Kesto; public string Kohde, Vaihe; }

        double seuraava = double.NaN, edT, lat0, lon0;
        (double e, double n, double u) edSilma; (double x, double y, double z) edSuunta;

        /// <summary>Kerran kehyksessä (t = monotoninen s): palauttaa näytteen ValiS:n välein (nopeus ja kulma edellisestä näytteestä).</summary>
        public Nayte? Paivita(double t, Kuvakulma a, string kohde, string vaihe)
        {
            if (double.IsNaN(seuraava)) { lat0 = a.Lat; lon0 = a.Lon; Ota(t, a); seuraava = t + ValiS; return null; }
            if (t < seuraava - 1e-9) return null;
            var silma = OpasKuvaus.KameraPaikka(a, lat0, lon0); var suunta = Suunta(a);
            double dt = Math.Max(1e-6, t - edT);
            double de = silma.e - edSilma.e, dn = silma.n - edSilma.n, du = silma.u - edSilma.u;
            double pis = Math.Max(-1, Math.Min(1, suunta.x * edSuunta.x + suunta.y * edSuunta.y + suunta.z * edSuunta.z));
            var n = new Nayte { T = t, V = Math.Sqrt(de * de + dn * dn + du * du) / dt, Kulma = Math.Acos(pis) * 180 / Math.PI / dt, Kohde = kohde, Vaihe = vaihe };
            Ota(t, a);
            // Seuraava näyte tasavälein (kehysnopeus ei kasauta virhettä); pitkä katko (tauko) aloittaa uuden rytmin.
            seuraava = t - seuraava > ValiS ? t + ValiS : seuraava + ValiS;
            return n;
        }

        void Ota(double t, Kuvakulma a) { edT = t; edSilma = OpasKuvaus.KameraPaikka(a, lat0, lon0); edSuunta = Suunta(a); }

        /// <summary>Katsesuunta yksikkövektorina (itä, pohjoinen, ylös): kallistus pystysuorasta alas, suuntima pohjoisesta.</summary>
        static (double x, double y, double z) Suunta(Kuvakulma a)
        {
            double k = a.Kallistus * Math.PI / 180, s = a.Suuntima * Math.PI / 180;
            return (Math.Sin(k) * Math.Sin(s), Math.Sin(k) * Math.Cos(s), -Math.Cos(k));
        }

        /// <summary>Lokirivi (pisteet desimaalierottimena; sama muoto jäsentyy Jasenna-funktiolla).</summary>
        public static string Rivi(Nayte n) => string.Format(CultureInfo.InvariantCulture, "MATKAKIRJA opas nopeus t={0:F1} v={1:F2} kulma={2:F2} kohde={3} vaihe={4}",
            n.T, n.V, n.Kulma, string.IsNullOrEmpty(n.Kohde) ? "-" : n.Kohde.Replace(' ', '_'), n.Vaihe ?? "-");

        /// <summary>Lokirivin jäsennys (simuajon konsolista); false = ei nopeusrivi.</summary>
        public static bool Jasenna(string rivi, out Nayte n)
        {
            n = default;
            int i = rivi?.IndexOf("opas nopeus ", StringComparison.Ordinal) ?? -1;
            if (i < 0) return false;
            foreach (var osa in rivi.Substring(i + 12).Split(' '))
            {
                int p = osa.IndexOf('=');
                if (p <= 0) continue;
                string k = osa.Substring(0, p), x = osa.Substring(p + 1);
                double D() => double.Parse(x, CultureInfo.InvariantCulture);
                switch (k) { case "t": n.T = D(); break; case "v": n.V = D(); break; case "kulma": n.Kulma = D(); break; case "kohde": n.Kohde = x; break; case "vaihe": n.Vaihe = x; break; }
            }
            return n.Vaihe != null;
        }

        /// <summary>Liikkeen vaihe: lento (lento kohteeseen tai kaupungin yleiskuvaan), lataus (lähtö tai saapuminen odottaa laattoja),
        /// kierto (pysähdyksellä kertoja puhuu), odotus (pysähdyksellä ilman kerrontaa: seuraava, kysymys tai lähdön tauko) tai siirto
        /// (tumma siirtoruutu, kamera ei näy; ei seisahdus).</summary>
        public static string Vaihe(OpasSilmukka s)
        {
            if (s.Siirtymassa || s.AvausTauolla) return "siirto";
            if (s.Vaihe == OpasVaihe.Lentaa) return s.VaiheAika > s.LentoKestoS ? "lataus" : "lento";
            if (s.LaattaOdotusS > 0) return "lataus";
            return s.PuheSoi ? "kierto" : "odotus";
        }

        /// <summary>Matkanopeus: kierto-vaiheen näytteiden silmänopeuden mediaani (m/s); ei kiertoa → kaikkien mediaani.</summary>
        public static double Matkanopeus(IReadOnlyList<Nayte> n)
        {
            var l = new List<double>();
            foreach (var x in n) if (x.Vaihe == "kierto") l.Add(x.V);
            if (l.Count == 0) foreach (var x in n) l.Add(x.V);
            if (l.Count == 0) return 0;
            l.Sort();
            return l[l.Count / 2];
        }

        /// <summary>Seisahdukset (v &lt; SeisOsuus × matkanopeus ja kulma &lt; SeisKulmaAstS yli minS): alku, kesto, kohde ja vaihe
        /// (seisahduksen pisin vaihe).</summary>
        public static List<Seisahdus> Seisahdukset(IReadOnlyList<Nayte> n, double matkanopeus, double minS = SeisMinS)
        {
            var tulos = new List<Seisahdus>();
            double raja = SeisOsuus * matkanopeus;
            int alku = -1;
            for (int i = 0; i <= n.Count; i++)
            {
                bool seis = i < n.Count && n[i].V < raja && n[i].Kulma < SeisKulmaAstS && n[i].Vaihe != "siirto";
                if (seis && alku < 0) alku = i;
                if (!seis && alku >= 0)
                {
                    // Näyte i kuvaa väliä (T[i−1], T[i]]: seisahdus alkaa edellisestä näytteestä.
                    double t0 = alku > 0 ? n[alku - 1].T : n[alku].T - ValiS, kesto = n[i - 1].T - t0;
                    if (kesto > minS)
                    {
                        var vaiheet = new Dictionary<string, int>();
                        for (int j = alku; j < i; j++) vaiheet[n[j].Vaihe ?? "-"] = vaiheet.TryGetValue(n[j].Vaihe ?? "-", out int c) ? c + 1 : 1;
                        string paras = null; int m = -1;
                        foreach (var kv in vaiheet) if (kv.Value > m) { m = kv.Value; paras = kv.Key; }
                        tulos.Add(new Seisahdus { Alku = t0, Kesto = kesto, Kohde = n[alku].Kohde, Vaihe = paras });
                    }
                    alku = -1;
                }
            }
            return tulos;
        }
    }
}
