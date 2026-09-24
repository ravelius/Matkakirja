// KULTTUURIVISAT (Natiivi-UI): kokoelma kulttuurivisat (web KULTTUURIT[pack][kaupunki].kysymys:
// q, options, correct, fact). Ladataan kerran lehden ensimmäisellä avauksella.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class Kulttuurivisa
    {
        public string Kysymys, Fakta;
        public List<string> Vaihtoehdot = new List<string>();
        public int Oikea;
    }

    public static class Kulttuurivisat
    {
        static Dictionary<string, Kulttuurivisa> visat;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        public static Kulttuurivisa Hae(string kaupunki) =>
            kaupunki != null && visat != null && visat.TryGetValue(kaupunki, out var v) ? v : null;

        public static void Lataa(Action valmis)
        {
            if (visat != null) { valmis?.Invoke(); return; }
            if (valmis != null) odottajat.Add(valmis);
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Sisalto.HaeTeksti("kulttuurivisat", json =>
            {
                var t = new Dictionary<string, Kulttuurivisa>();
                try
                {
                    foreach (var a in (Rakenne.Lista(MiniJson.Kentta(Rakenne.Olio(json != null ? MiniJson.Jasenna(json) : null), "alkiot")) ?? new List<object>())
                        .Select(Rakenne.Olio).Where(x => x != null))
                    {
                        string k = MiniJson.Teksti(a, "kaupunki") ?? MiniJson.Teksti(a, "id"), q = MiniJson.Teksti(a, "kysymys");
                        var vaihtoehdot = (Rakenne.Lista(MiniJson.Kentta(a, "vaihtoehdot")) ?? new List<object>()).OfType<string>().ToList();
                        if (k == null || q == null || vaihtoehdot.Count < 2) continue;
                        t[k] = new Kulttuurivisa
                        {
                            Kysymys = q, Fakta = MiniJson.Teksti(a, "fakta"), Vaihtoehdot = vaihtoehdot,
                            Oikea = (int)(MiniJson.Luku(a, "oikea") ?? 0),
                        };
                    }
                }
                catch (FormatException e) { Debug.LogWarning("MATKAKIRJA ui kulttuurivisat: " + e.Message); }
                visat = t;
                haussa = false;
                var kutsut = odottajat.ToArray();
                odottajat.Clear();
                foreach (var c in kutsut) { try { c(); } catch (Exception e) { Debug.LogException(e); } }
            }, valinnainen: true));
        }
    }
}
