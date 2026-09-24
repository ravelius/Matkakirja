using System;
using System.Collections.Generic;
using System.Text;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// HARMAAT SUORAKULMIOT, build 11 -selvitys (Natiiviseppä 24.9.2026): Laattapalvelimen vastaukset satelliittikansiolle
    /// (julisteet/pallo/satelliitti/…) ensimmäisen minuutin ajalta ensimmäisestä satelliittipyynnöstä. Poikkeamat
    /// (tila ≠ 200, jpg alle 1500 t tai katkennut) lokiin heti rivinä "MATKAKIRJA satloki poikkeama …"; muut
    /// koostetaan 5 sekunnin välein riviksi "MATKAKIRJA satloki t=… sarja/z: n tilat lähteet tavut min/med/max".
    /// Kirjaa-kutsu tulee palvelimen säikeistä, joten tila on lukon takana; Yhteenveto ajetaan pääsäikeessä.
    /// Komento "lentoharmaa satloki" aloittaa uuden minuutin.
    /// </summary>
    public static class SatelliittiLoki
    {
        const double Kesto = 60.0, Vali = 5.0;
        static readonly object lukko = new object();
        static DateTime? alku;
        static DateTime seuraava;
        static bool paattynyt;
        sealed class Ryhma { public int n; public readonly Dictionary<string, int> tilat = new Dictionary<string, int>(); public readonly List<int> tavut = new List<int>(); }
        static readonly SortedDictionary<string, Ryhma> ryhmat = new SortedDictionary<string, Ryhma>(StringComparer.Ordinal);

        /// <summary>Uusi minuutti seuraavasta satelliittipyynnöstä.</summary>
        public static void Aloita()
        {
            lock (lukko) { alku = null; paattynyt = false; ryhmat.Clear(); }
        }

        /// <summary>Yksi vastaus (palvelimen säie).</summary>
        public static void Kirjaa(string polku, int tila, byte[] data, string lahde)
        {
            int tavut = data?.Length ?? 0;
            var nyt = DateTime.UtcNow;
            string poikkeama = null;
            lock (lukko)
            {
                if (paattynyt) return;
                if (alku == null) { alku = nyt; seuraava = nyt.AddSeconds(Vali); }
                double t = (nyt - alku.Value).TotalSeconds;
                if (t > Kesto) return;
                // Avain: sarja/z (esim. bmng-bathy/4), polku …/satelliitti/<versio>/<sarja>/<z>/<x>/<y>.jpg
                var osat = polku.Split('/');
                int i = Array.IndexOf(osat, "satelliitti");
                string avain = i >= 0 && osat.Length > i + 3 ? osat[i + 2] + "/" + osat[i + 3] : "muu";
                if (!ryhmat.TryGetValue(avain, out var r)) ryhmat[avain] = r = new Ryhma();
                r.n++;
                string tl = tila + ":" + lahde;
                r.tilat[tl] = r.tilat.TryGetValue(tl, out int k) ? k + 1 : 1;
                r.tavut.Add(tavut);
                bool jpg = polku.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) && lahde != "tyhja" && lahde != "kattamaton";
                if (tila != 200 || (jpg && (tavut < 1500 || !Laattapalvelin.KuvaEhja(polku, data))))
                    poikkeama = $"MATKAKIRJA satloki poikkeama t={t:0.0} {tila} {lahde} {tavut} t " +
                                $"ehja={Laattapalvelin.KuvaEhja(polku, data)} {polku}";
            }
            if (poikkeama != null) Debug.Log(poikkeama);
        }

        /// <summary>Kooste 5 s välein ja lopuksi (pääsäie, Laattapalvelin.Update).</summary>
        public static void Yhteenveto()
        {
            string rivi = null;
            lock (lukko)
            {
                if (alku == null || paattynyt) return;
                var nyt = DateTime.UtcNow;
                if (nyt < seuraava) return;
                double t = (nyt - alku.Value).TotalSeconds;
                seuraava = nyt.AddSeconds(Vali);
                if (t > Kesto + Vali) paattynyt = true;
                if (ryhmat.Count == 0) return;
                var sb = new StringBuilder($"MATKAKIRJA satloki t={Math.Min(t, Kesto):0}s{(paattynyt ? " (loppu)" : "")}:");
                foreach (var p in ryhmat)
                {
                    var r = p.Value;
                    r.tavut.Sort();
                    sb.Append($" [{p.Key} n={r.n}");
                    foreach (var tl in r.tilat) sb.Append($" {tl.Key}×{tl.Value}");
                    sb.Append($" t {r.tavut[0]}/{r.tavut[r.tavut.Count / 2]}/{r.tavut[r.tavut.Count - 1]}]");
                }
                ryhmat.Clear();
                rivi = sb.ToString();
            }
            Debug.Log(rivi);
        }
    }
}
