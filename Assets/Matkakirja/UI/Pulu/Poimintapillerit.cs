// PÖLLÖPOIMINNAT ARTIKKELIN LOPPUUN (Natiivi-UI): webin js/pollopoiminnat.js piirraPoimintapillerit.
//
// Omistajan kuratoimat pöllön kysymys–vastaus-parit (js/packs/pollo-poiminnat.js → sisältöpaketin
// moduulit/js/packs/pollo-poiminnat.json, POLLO_POIMINNAT) näkyvät siinä artikkelissa, jonka äärellä
// ne kysyttiin: lehden aihesivun (aihe:omistaja:aihe) ja nähtävyysjutun (juttu:kaupunki:nimi) lopussa
// rivinä "LIVIALTA KYSYTTYÄ" + kysymyspillerit. Napautus avaa vastauksen minipopupiin (otsikko = kysymys,
// kappaleet \n\n-rajoista). Pelaajan omat ehdotukset eivät näy koskaan (ne kulkevat kuratointiin).
// Kehittäjän laitteen omat parit ja poistopyynnöt ovat webin työkaluja (ei natiivissa).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Poimintapillerit
    {
        const string Moduuli = "moduulit/js/packs/pollo-poiminnat.json";
        static Dictionary<string, List<(string Kysymys, string Vastaus)>> parit;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        static void Lataa(Action valmis)
        {
            if (parit != null) { valmis(); return; }
            odottajat.Add(valmis);
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Sisalto.HaePaketista(Moduuli, json =>
            {
                var t = new Dictionary<string, List<(string, string)>>();
                try
                {
                    var e = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(json != null ? MiniJson.Jasenna(json) : null), "exportit"));
                    var x = MiniJson.Kentta(e, "POLLO_POIMINNAT");
                    if (Rakenne.Olio(x) is Dictionary<string, object> o && o.ContainsKey("arvo")) x = o["arvo"];
                    foreach (var kv in Rakenne.Olio(x) ?? new Dictionary<string, object>())
                    {
                        var lista = new List<(string, string)>();
                        var nahdyt = new HashSet<string>();
                        foreach (var p in (Rakenne.Lista(kv.Value) ?? new List<object>()).Select(Rakenne.Olio).Where(p => p != null))
                        {
                            string k = MiniJson.Teksti(p, "kysymys"), v = MiniJson.Teksti(p, "vastaus");
                            if (string.IsNullOrEmpty(k) || string.IsNullOrEmpty(v) || !nahdyt.Add(k)) continue;
                            lista.Add((k, v));
                        }
                        if (lista.Count > 0) t[kv.Key] = lista;
                    }
                }
                catch (FormatException) { /* rikkinäinen moduuli = ei pillereitä */ }
                parit = t;
                haussa = false;
                var kutsut = odottajat.ToArray();
                odottajat.Clear();
                foreach (var k in kutsut) { try { k(); } catch (Exception ex) { Debug.LogException(ex); } }
            }, true));
        }

        /// <summary>Pilleririvi isän loppuun (tyhjä avain tai ei pareja = ei mitään).</summary>
        public static void Piirra(VisualElement isa, string avain)
        {
            if (isa == null || string.IsNullOrEmpty(avain)) return;
            // Paikka varataan heti, jotta rivi osuu artikkelin loppuun, vaikka data tulisi myöhemmin.
            var rivi = Rakenne.El("mk-poiminnat", isa, PickingMode.Ignore);
            rivi.style.display = DisplayStyle.None;
            Lataa(() =>
            {
                if (rivi.panel == null || !parit.TryGetValue(avain, out var lista)) return;
                Kirjasimet.Aseta(Rakenne.Teksti("LIVIALTA KYSYTTYÄ", "mk-poiminnat__nimio", rivi), Kirjasin.Kone);
                foreach (var (k, v) in lista)
                {
                    var (kysymys, vastaus) = (k, v);
                    var b = Rakenne.Nappi(kysymys, "mk-poiminnat__pilleri", () => Minipopup.Avaa(kysymys, s =>
                    {
                        foreach (var kappale in vastaus.Split(new[] { "\n\n" }, StringSplitOptions.RemoveEmptyEntries))
                            Rakenne.Teksti(kappale, "mk-minipopup__teksti", s);
                    }, "mk-minipopup--poiminta", UiKerros.Traileri), rivi);
                    Kirjasimet.Aseta(b, Kirjasin.Luku);
                }
                rivi.style.display = DisplayStyle.Flex;
            });
        }
    }
}
