// PÖLLÖPOIMINNAT ARTIKKELIN LOPPUUN (Natiivi-UI): webin js/pollopoiminnat.js piirraPoimintapillerit.
//
// Omistajan kuratoimat pöllön kysymys–vastaus-parit (js/packs/pollo-poiminnat.js → sisältöpaketin
// moduulit/js/packs/pollo-poiminnat.json, POLLO_POIMINNAT) näkyvät siinä artikkelissa, jonka äärellä
// ne kysyttiin: lehden aihesivun (aihe:omistaja:aihe) ja nähtävyysjutun (juttu:kaupunki:nimi) lopussa
// rivinä "LIVIALTA KYSYTTYÄ" + kysymyspillerit. Napautus avaa vastauksen minipopupiin (otsikko = kysymys,
// kappaleet \n\n-rajoista). Pelaajan omat ehdotukset eivät näy koskaan (ne kulkevat kuratointiin).
// Kehittäjätilassa mukana myös laitteen omat parit (PoimintaVarasto, katkoviivan sijaan himmeämpi pilleri, koska
// UI Toolkitissa ei ole dashed-reunaa), ja vastauksen alla on "Poista laitteelta" / "Pyydä poistoa paketista".
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

        // Piirretyt rivit, jotta "Tallenna juttuun" ja poisto päivittävät auki olevan jutun heti (web paivitaPillerit).
        static readonly List<(WeakReference<VisualElement> Rivi, string Avain)> piirretyt = new List<(WeakReference<VisualElement>, string)>();

        /// <summary>Pilleririvi isän loppuun (tyhjä avain tai ei pareja = ei mitään).</summary>
        public static void Piirra(VisualElement isa, string avain)
        {
            if (isa == null || string.IsNullOrEmpty(avain)) return;
            // Paikka varataan heti, jotta rivi osuu artikkelin loppuun, vaikka data tulisi myöhemmin.
            var rivi = Rakenne.El("mk-poiminnat", isa, PickingMode.Ignore);
            rivi.style.display = DisplayStyle.None;
            piirretyt.RemoveAll(p => !p.Rivi.TryGetTarget(out var r) || r.panel == null && r != rivi);
            piirretyt.Add((new WeakReference<VisualElement>(rivi), avain));
            Lataa(() => Tayta(rivi, avain));
        }

        /// <summary>Auki olevien juttujen rivit tällä avaimella uudelleen (web paivitaPillerit).</summary>
        public static void Paivita(string avain)
        {
            foreach (var (viite, a) in piirretyt.ToList())
                if (a == avain && viite.TryGetTarget(out var rivi) && rivi.panel != null) Lataa(() => Tayta(rivi, avain));
        }

        /// <summary>Web poiminnat(): paketin parit ja kehittäjätilassa laitteen omat (sama kysymys vain kerran).</summary>
        static List<(string Kysymys, string Vastaus, bool Oma)> Parit(string avain)
        {
            var ulos = new List<(string, string, bool)>();
            var nahdyt = new HashSet<string>();
            if (parit.TryGetValue(avain, out var paketti))
                foreach (var (k, v) in paketti) if (nahdyt.Add(k)) ulos.Add((k, v, false));
            if (!Asetukset.Kehittaja) return ulos;
            if (PoimintaVarasto.Lue().TryGetValue(avain, out var omat))
                foreach (var (k, v) in omat) if (nahdyt.Add(k)) ulos.Add((k, v, true));
            return ulos;
        }

        static void Tayta(VisualElement rivi, string avain)
        {
            if (rivi.panel == null) return;
            rivi.Clear();
            var lista = Parit(avain);
            rivi.style.display = lista.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (lista.Count == 0) return;
            Kirjasimet.Aseta(Rakenne.Teksti("LIVIALTA KYSYTTYÄ", "mk-poiminnat__nimio", rivi), Kirjasin.Kone);
            foreach (var pari in lista)
            {
                var b = Rakenne.Nappi(pari.Kysymys, pari.Oma ? "mk-poiminnat__pilleri mk-poiminnat__pilleri--oma" : "mk-poiminnat__pilleri",
                    () => AvaaVastaus(avain, pari.Kysymys, pari.Vastaus, pari.Oma), rivi);
                if (pari.Oma) b.tooltip = "Tallennettu tällä laitteella — ei vielä paketissa";
                Kirjasimet.Aseta(b, Kirjasin.Luku);
            }
        }

        static void AvaaVastaus(string avain, string kysymys, string vastaus, bool oma) => Minipopup.Avaa(kysymys, s =>
        {
            foreach (var kappale in vastaus.Split(new[] { "\n\n" }, StringSplitOptions.RemoveEmptyEntries))
                Rakenne.Teksti(kappale, "mk-minipopup__teksti", s);
            if (Asetukset.Kehittaja) Poistorivi(s, avain, kysymys, oma);
        }, "mk-minipopup--poiminta", UiKerros.Traileri);

        /// <summary>
        /// Kehittäjän poisto (web minipopup-poistorivi): oma pari pois laitteelta (ja peruutus kanavaan),
        /// paketin parista poistopyyntö Fablelle ehdotuskanavaa pitkin.
        /// </summary>
        static void Poistorivi(VisualElement s, string avain, string kysymys, bool oma)
        {
            var rivi = Rakenne.El("mk-minipopup__poistorivi", s, PickingMode.Ignore);
            Label kuittaus = null;
            Button poista = null;
            poista = Rakenne.Nappi(oma ? "Poista laitteelta" : "Pyydä poistoa paketista", "mk-minipopup__poista", () =>
            {
                poista.SetEnabled(false);
                if (oma)
                {
                    PoimintaVarasto.Poista(avain, kysymys);
                    Paivita(avain);
                    kuittaus.text = "Poistettu laitteelta.";
                    Palautekanava.Postita("/laheta", Kentat("Pöllöpoiminta: PERUUTUS\n\nKysymys: " + kysymys, avain, "Pöllöpoiminta: peruutus"), null, _ => { });
                    return;
                }
                kuittaus.text = "Lähetetään…";
                Palautekanava.Postita("/laheta", Kentat("Pöllöpoiminta: POISTOPYYNTÖ\n\nKysymys: " + kysymys, avain, "Pöllöpoiminta: poisto"), null, t =>
                {
                    if (rivi.panel == null) return;
                    if (t.Ok) { kuittaus.text = "Poistopyyntö lähti Fablelle."; return; }
                    kuittaus.text = t.Estetty ? Palautekanava.Virheviesti(t) : "Ei lähtenyt. Yritä uudelleen.";
                    poista.SetEnabled(true);
                });
            }, rivi);
            Kirjasimet.Aseta(poista, Kirjasin.Kone);
            kuittaus = Rakenne.Teksti("", "mk-chat__poimintatila", rivi);
        }

        static List<(string, string)> Kentat(string teksti, string sivu, string tarkenne) =>
            new List<(string, string)> { ("laji", ""), ("teksti", teksti), ("sivu", sivu), ("tarkenne", tarkenne) };
    }
}
