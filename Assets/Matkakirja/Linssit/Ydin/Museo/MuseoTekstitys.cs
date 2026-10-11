// TAIDEMUSEON KERTOJAN TEKSTITYS (PT 11.10.2026 09.0x, juna 182): kertojan äänitteen sanojen ajat (aanet/taidemuseo-kertoja-v2/ajat/
// <sali>/<id>.json: teksti, puhuttu, sanat[{sana, alku_s, loppu_s}]) virkkeiksi. Näytetään vain, kun pelaaja on kytkenyt tekstityksen
// Linssivalikon Tekstitys-riviltä (oletus pois; Raamattu PUHE ÄÄNENÄ, EI KUPLINA). Virke = näytettävän tekstin virke, jos virkkeitä on
// yhtä monta kuin puhutussa tekstissä (ajoitus puhutusta), muuten puhuttu virke. Puhdas C#: MuseoTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Museo
{
    public sealed class MuseoTekstitys
    {
        /// <summary>Virke jää näkyviin näin kauan viimeisen sanan jälkeen (s).</summary>
        public const double JalkiS = 1.5;
        /// <summary>Tätä pidempi virke jaetaan kahteen osaan keskikohtaa lähimmän pilkun kohdalta puheen tahdissa (NUI/PT 11.10.:
        /// puhelin pystyssä kaistale enintään kolme riviä; pisin virke 234 merkkiä).</summary>
        public const int PitkaMerkit = 120;

        public readonly List<(string Teksti, double Alku, double Loppu)> Virkkeet = new List<(string, double, double)>();

        /// <summary>Ajat-JSON tekstitykseksi; null, jos sanoja tai tekstiä ei ole.</summary>
        public static MuseoTekstitys Lue(string json)
        {
            var d = MiniJson.Objekti(MiniJson.Jasenna(json));
            string puhuttu = MiniJson.Teksti(d, "puhuttu"), naytetty = MiniJson.Teksti(d, "teksti");
            if (string.IsNullOrEmpty(puhuttu)) puhuttu = naytetty;
            if (string.IsNullOrEmpty(puhuttu)) return null;
            var sanat = new List<(string Sana, double Alku, double Loppu)>();
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, "sanat")))
            {
                var s = MiniJson.Objekti(o);
                sanat.Add((MiniJson.Teksti(s, "sana") ?? "", MiniJson.Luku(s, "alku_s") ?? 0, MiniJson.Luku(s, "loppu_s") ?? 0));
            }
            if (sanat.Count == 0) return null;

            var pv = Virkkeiksi(puhuttu); var nv = string.IsNullOrEmpty(naytetty) ? null : Virkkeiksi(naytetty);
            bool naytetyt = nv != null && nv.Count == pv.Count;
            // Sana → virke merkkipaikan mukaan: sanat haetaan puhutusta järjestyksessä (välimerkit ja välit ohitetaan).
            var alku = new double[pv.Count]; var loppu = new double[pv.Count];
            for (int i = 0; i < pv.Count; i++) { alku[i] = double.NaN; loppu[i] = double.NaN; }
            int kohta = 0;
            var sanaPaikat = new List<(int Merkki, double Alku)>();
            foreach (var (sana, a, l) in sanat)
            {
                string t = sana.Trim(); if (t.Length == 0) continue;
                int i = puhuttu.IndexOf(t, kohta, StringComparison.Ordinal);
                if (i < 0) continue;
                kohta = i + t.Length;
                sanaPaikat.Add((i, a));
                int v = pv.FindLastIndex(x => x.Alku <= i); if (v < 0) v = 0;
                if (double.IsNaN(alku[v])) alku[v] = a;
                loppu[v] = l;
            }
            var r = new MuseoTekstitys();
            for (int i = 0; i < pv.Count; i++)
            {
                if (double.IsNaN(alku[i])) continue;   // virke ilman ajoitettuja sanoja (ei pitäisi tapahtua)
                string teksti = naytetyt ? nv[i].Teksti : pv[i].Teksti;
                if (teksti.Length > PitkaMerkit && Jaa(pv[i], naytetyt ? nv[i].Teksti : null, sanaPaikat) is var (t1, t2, tj) && t1 != null)
                {
                    r.Virkkeet.Add((t1, alku[i], tj));
                    r.Virkkeet.Add((t2, tj, loppu[i]));
                }
                else r.Virkkeet.Add((teksti, alku[i], loppu[i]));
            }
            return r.Virkkeet.Count > 0 ? r : null;
        }

        /// <summary>Pitkä virke kahteen osaan (pilkku, jos osat mahtuvat rajaan, muuten keskimmäinen väli); jakohetki = jakokohdan jälkeisen
        /// sanan alku. Näytetty teksti jaetaan samasta suhteellisesta kohdasta. null, jos jakokohtaa ei löydy.</summary>
        static (string, string, double) Jaa((string Teksti, int Alku) p, string naytetty, List<(int Merkki, double Alku)> sanat)
        {
            // Jakokohta: keskikohtaa lähin pilkku, jos kumpikin osa jää PitkaMerkit-rajan alle; muuten keskikohtaa lähin väli.
            int L = p.Teksti.Length; int jako = Kohta(p.Teksti, ',', 0, 1);
            bool pilkku = jako >= 0 && Math.Max(jako + 1, L - jako - 1) <= PitkaMerkit;
            if (!pilkku) jako = Kohta(p.Teksti, ' ', 0, 1) - 1;
            if (jako < 0) return (null, null, 0);
            int raja = p.Alku + jako;
            double tj = double.NaN;
            foreach (var (m, a) in sanat) if (m > raja) { tj = a; break; }
            if (double.IsNaN(tj)) return (null, null, 0);
            string lahde = p.Teksti;
            if (naytetty != null)
            {
                // Näytetty teksti samasta suhteellisesta kohdasta (pilkku tai väli lähimpänä).
                double suhde = (double)jako / L;
                int nj = pilkku ? Kohta(naytetty, ',', Math.Max(0, suhde - 0.15), Math.Min(1, suhde + 0.15), suhde) : Kohta(naytetty, ' ', 0, 1, suhde) - 1;
                if (nj >= 0) { lahde = naytetty; jako = nj; }
            }
            return (lahde.Substring(0, jako + 1).Trim(), lahde.Substring(jako + 1).Trim(), tj);
        }

        /// <summary>Merkin c (jota seuraa väli; välille itse) paikka lähimpänä suhdetta keski (oletus 0,5) väliltä [a, b]; −1 = ei.</summary>
        static int Kohta(string t, char c, double a, double b, double keski = 0.5)
        {
            int paras = -1; double pd = double.MaxValue;
            for (int k = 1; k < t.Length - 1; k++)
            {
                if (t[k] != c || (c != ' ' && !char.IsWhiteSpace(t[k + 1]))) continue;
                double x = (double)k / t.Length; if (x < a || x > b) continue;
                double dd = Math.Abs(x - keski); if (dd < pd) { pd = dd; paras = c == ' ' ? k + 1 : k; }
            }
            return paras;
        }

        /// <summary>Virke soitossa ajan t (s äänitteen alusta) kohdalla: viimeisin alkanut virke, kunnes seuraava alkaa tai
        /// JalkiS kuluu viimeisen sanan jälkeen; null ennen ensimmäistä ja lopun jälkeen.</summary>
        public string Virke(double t)
        {
            for (int i = Virkkeet.Count - 1; i >= 0; i--)
                if (t >= Virkkeet[i].Alku) return i == Virkkeet.Count - 1 && t > Virkkeet[i].Loppu + JalkiS ? null : Virkkeet[i].Teksti;
            return null;
        }

        /// <summary>Teksti virkkeiksi: katkos ".", "?", "!" tai "…" jälkeen, kun perässä on väli ja iso alkukirjain (lainausmerkit kuuluvat virkkeeseen).</summary>
        static List<(string Teksti, int Alku)> Virkkeiksi(string s)
        {
            var r = new List<(string, int)>(); int a = 0;
            for (int i = 0; i < s.Length; i++)
            {
                char c = s[i];
                if (c != '.' && c != '?' && c != '!' && c != '…') continue;
                int j = i + 1; while (j < s.Length && (s[j] == '"' || s[j] == '”' || s[j] == '»' || s[j] == ')')) j++;
                if (j < s.Length && !char.IsWhiteSpace(s[j])) continue;
                int k = j; while (k < s.Length && char.IsWhiteSpace(s[k])) k++;
                if (k < s.Length && (char.IsLower(s[k]) || char.IsDigit(s[k]))) continue;   // lyhenne ("n. 1663", "esim. kun")
                Lisaa(r, s, a, j); a = j;
            }
            Lisaa(r, s, a, s.Length);
            return r;
        }

        static void Lisaa(List<(string, int)> r, string s, int a, int b)
        {
            while (a < b && char.IsWhiteSpace(s[a])) a++;
            if (b > a) r.Add((s.Substring(a, b - a).TrimEnd(), a));
        }
    }
}
