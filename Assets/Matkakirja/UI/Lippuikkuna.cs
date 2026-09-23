// LIPUN TARINA (Natiivi-UI): webin js/liput.js avaaLippuikkuna (omistaja 15.8.2026: "Tee lipusta
// klikattava"). Minipopup: maan nimi ja ×, nykyinen lippu isona ("Nykyinen lippu"), symboliikka
// ("Sininen = järvien ja taivaan väri."), tarinan kappaleet ja "Muut asut ja historialliset
// liput" -rivi (pikkulippu ja nimi; napautus → suurennos selitteen kanssa). Data: skeeman 1.15
// maat.lipputarina. Avaajat: kartuschan lippu ja maalehden aiheotsikon lippu.
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Lippuikkuna
    {
        static Kuvasuurennos suurennos;

        /// <summary>Onko maalla lipun tarina (napautettava lippu).</summary>
        public static bool On(string iso3) => UiSisalto.Maa(iso3)?.Lipputarina != null;

        public static void Avaa(string iso3)
        {
            var m = UiSisalto.Maa(iso3);
            var t = m?.Lipputarina;
            if (t == null) return;
            Aanet.PulunTehoste("paper");
            Minipopup.Avaa(MiniJson.Teksti(t, "maa") ?? m.Nimi ?? iso3, s =>
            {
                var iso = Rakenne.El("mk-lippu__iso", s);
                if (m.Lippu.Count > 0)
                    Kuvat.Hae(m.Lippu[0], tx =>
                    {
                        if (tx == null) { iso.style.display = DisplayStyle.None; return; }
                        iso.style.backgroundImage = new StyleBackground(tx);
                        float w = iso.resolvedStyle.width;
                        if (float.IsNaN(w) || w <= 0) w = 300;
                        iso.style.height = Mathf.Round(w * tx.height / Mathf.Max(1f, tx.width));
                    }, "liput");
                Kirjasimet.Aseta(Rakenne.Teksti("Nykyinen lippu", "mk-lippu__valinta", s), Kirjasin.Kone);
                var symbolit = Rakenne.Lista(MiniJson.Kentta(t, "symboliikka"));
                if (symbolit != null && symbolit.Count > 0)
                {
                    var lohko = Rakenne.El("mk-lippu__symbolit", s, PickingMode.Ignore);
                    foreach (var x in symbolit.Select(MiniJson.Objekti).Where(x => x != null))
                    {
                        var l = Rakenne.Teksti($"<b>{MiniJson.Teksti(x, "osa")} = </b>{MiniJson.Teksti(x, "selite")}", "mk-lippu__symboli", lohko);
                        Kirjasimet.Aseta(l, Kirjasin.Luku);
                    }
                }
                foreach (var k in (Rakenne.Lista(MiniJson.Kentta(t, "kappaleet")) ?? new List<object>()).OfType<string>())
                    Kirjasimet.Aseta(Rakenne.Teksti(k, "mk-minipopup__teksti", s), Kirjasin.Luku);
                var versiot = (Rakenne.Lista(MiniJson.Kentta(t, "versiot")) ?? new List<object>()).Select(MiniJson.Objekti).Where(x => x != null).ToList();
                if (versiot.Count == 0) return;
                Kirjasimet.Aseta(Rakenne.Teksti("MUUT ASUT JA HISTORIALLISET LIPUT", "mk-lippu__versiotyhdys", s), Kirjasin.KoneLihava);
                var rivi = Rakenne.El("mk-lippu__versiot", s, PickingMode.Ignore);
                var sarja = versiot.Select(v => new LehtiKuva
                {
                    Lahde = Osoite(MiniJson.Teksti(v, "polku")), Otsikko = MiniJson.Teksti(v, "nimi"),
                    Selite = MiniJson.Teksti(v, "selite") ?? MiniJson.Teksti(v, "nimi"), LahdeRivi = MiniJson.Teksti(v, "lahde"),
                }).ToList();
                for (int i = 0; i < versiot.Count; i++)
                {
                    int kohta = i;
                    var b = Rakenne.Nappi(null, "mk-lippu__versio", () => Suurennos().Avaa(sarja, kohta), rivi);
                    var kuva = Rakenne.El("mk-lippu__versiokuva", b, PickingMode.Ignore);
                    if (sarja[i].Lahde != null)
                        Kuvat.Hae(sarja[i].Lahde, tx => { if (tx != null) kuva.style.backgroundImage = new StyleBackground(tx); });
                    Kirjasimet.Aseta(Rakenne.Teksti(sarja[i].Otsikko ?? "", "mk-lippu__versionimi", b), Kirjasin.Kone);
                }
                Rakenne.Ruudukko(rivi, 96f, 10f);
            }, "mk-minipopup--lippu");
        }

        /// <summary>Versioiden polku on sivuston suhteellinen (assets/liput/versiot/…).</summary>
        static string Osoite(string polku) =>
            string.IsNullOrEmpty(polku) ? null : polku.StartsWith("http") ? polku : Laukku.SivustoJuuri + polku.TrimStart('/');

        static Kuvasuurennos Suurennos() => suurennos ??= new Kuvasuurennos(UiKerros.Hae().Juuri(UiKerros.Traileri));
    }
}
