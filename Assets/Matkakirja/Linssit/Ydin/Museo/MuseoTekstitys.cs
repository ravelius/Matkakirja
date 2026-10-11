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
            foreach (var (sana, a, l) in sanat)
            {
                string t = sana.Trim(); if (t.Length == 0) continue;
                int i = puhuttu.IndexOf(t, kohta, StringComparison.Ordinal);
                if (i < 0) continue;
                kohta = i + t.Length;
                int v = pv.FindLastIndex(x => x.Alku <= i); if (v < 0) v = 0;
                if (double.IsNaN(alku[v])) alku[v] = a;
                loppu[v] = l;
            }
            var r = new MuseoTekstitys();
            for (int i = 0; i < pv.Count; i++)
            {
                if (double.IsNaN(alku[i])) continue;   // virke ilman ajoitettuja sanoja (ei pitäisi tapahtua)
                r.Virkkeet.Add(((naytetyt ? nv[i].Teksti : pv[i].Teksti), alku[i], loppu[i]));
            }
            return r.Virkkeet.Count > 0 ? r : null;
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
