// MAAN OSUMATESTI: mikä maa on pisteessä (lat, lon)? Natiiviseppä kutsuu tätä
// pallon napautuksesta (MaaNapautettu) ja Sumu.PaljastaMaasta; linssit eivät
// tarvitse omaa säteenheittoa (sovittu 23.9.2026).
//
// Web ei tarvitse tätä: Globe.gl osuu monikulmioon itse. Siksi kultaisena
// arvona on pelin kaupunkien maa (kokoelmat/kaupungit.json maa = ISO3).
//
// Rajat ovat maarajat.jsonista: renkaat eivät erottele saaria ja reikiä, joten
// sisäpuolisuus lasketaan parillisuussäännöllä kaikkien renkaiden yli (enklaavi
// kuten Lesotho on Etelä-Afrikan rengaslistassa reikänä). Päivämäärärajan
// ylittävän maan rengas voi jatkua yli ±180°, joten piste kokeillaan myös
// ±360° siirrettynä. Jos kaksi maata osuu (rajojen harvennus 0,05° jättää
// kapeita limityksiä), pienempi laatikko voittaa.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit.Maat
{
    public sealed class MaaOsuma
    {
        readonly Maa[] maat;

        public MaaOsuma(MaatAineisto aineisto) : this(aineisto?.Maat.Values) { }

        public MaaOsuma(IEnumerable<Maa> maat)
        {
            if (maat == null) throw new ArgumentNullException(nameof(maat));
            // Pienin laatikko ensin: ensimmäinen osuma on samalla paras.
            this.maat = maat.OrderBy(m => (m.E - m.W) * (m.N - m.S)).ThenBy(m => m.Id, StringComparer.Ordinal).ToArray();
        }

        /// <summary>
        /// Pisteen maa (ISO3) tai null (meri, maa ei aineistossa). Toleranssi
        /// (asteina, leveyspiirin suunnassa kosinilla korjattu): jos piste on
        /// meressä, lähin raja enintään näin kaukana kelpaa. Napautukselle
        /// sopii noin sormenpään kaari ruudulla; 0 = vain tarkka osuma.
        /// </summary>
        public string Hae(double lat, double lon, double toleranssi = 0) => HaeMaa(lat, lon, toleranssi)?.Id;

        public Maa HaeMaa(double lat, double lon, double toleranssi = 0)
        {
            if (double.IsNaN(lat) || double.IsNaN(lon)) return null;
            lon = ((lon + 180) % 360 + 360) % 360 - 180;
            return Tarkka(lat, lon) ?? (toleranssi > 0 ? Lahin(lat, lon, toleranssi) : null);
        }

        Maa Tarkka(double lat, double lon)
        {
            foreach (var m in maat)
            {
                if (lat < m.S || lat > m.N) continue;
                foreach (var x in Siirrot(lon))
                {
                    if (x < m.W || x > m.E) continue;
                    bool sisalla = false;
                    foreach (var r in m.Renkaat) if (Sisalla(r, x, lat)) sisalla = !sisalla;
                    if (sisalla) return m;
                }
            }
            return null;
        }

        /// <summary>Lähin raja enintään toleranssin päässä (pisteen etäisyys janaan).</summary>
        Maa Lahin(double lat, double lon, double tol)
        {
            double kx = Math.Max(0.05, Math.Cos(lat * Math.PI / 180));
            Maa paras = null;
            double parasD2 = tol * tol;
            foreach (var m in maat)
            {
                if (lat < m.S - tol || lat > m.N + tol) continue;
                foreach (var x in Siirrot(lon))
                {
                    if (x < m.W - tol / kx || x > m.E + tol / kx) continue;
                    foreach (var r in m.Renkaat)
                        for (int i = 0, j = r.Length - 1; i < r.Length; j = i++)
                        {
                            double ax = (r[j].Lon - x) * kx, ay = r[j].Lat - lat;
                            double bx = (r[i].Lon - x) * kx, by = r[i].Lat - lat;
                            double dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
                            double t = l2 > 0 ? Math.Clamp(-(ax * dx + ay * dy) / l2, 0, 1) : 0;
                            double px = ax + t * dx, py = ay + t * dy, d2 = px * px + py * py;
                            if (d2 < parasD2) { parasD2 = d2; paras = m; }
                        }
                }
            }
            return paras;
        }

        static IEnumerable<double> Siirrot(double lon)
        {
            yield return lon;
            yield return lon + 360;
            yield return lon - 360;
        }

        /// <summary>Onko (x, y) renkaan sisällä (säde +x-suuntaan, parillisuus).</summary>
        public static bool Sisalla((double Lon, double Lat)[] r, double x, double y)
        {
            bool c = false;
            for (int i = 0, j = r.Length - 1; i < r.Length; j = i++)
            {
                if ((r[i].Lat > y) != (r[j].Lat > y)
                    && x < (r[j].Lon - r[i].Lon) * (y - r[i].Lat) / (r[j].Lat - r[i].Lat) + r[i].Lon)
                    c = !c;
            }
            return c;
        }
    }
}
