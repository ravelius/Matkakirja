// LIPUN TARINA (Natiivi-UI): webin js/liput.js avaaLippuikkuna (omistaja 15.8.2026: "Tee lipusta
// klikattava"). Minipopup: maan nimi ja ×, nykyinen lippu isona ("Nykyinen lippu"), symboliikka
// ("Sininen = järvien ja taivaan väri."), tarinan kappaleet ja "Muut asut ja historialliset
// liput" -rivi (pikkulippu ja nimi). E14 (web liput.js tarkenna): versiolipun napautus kasvattaa sen paikallaan
// 1,7-kertaiseksi paperipohjalla, selite sen alla (10rem, 0,55rem), muu kortti häivyttyy (webissä blur 3 px —
// UITK:ssa ei sumennussuodatinta, joten peitto 0,3); uusi napautus tai napautus muualle palauttaa. Data: skeeman 1.15
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
        /// <summary>Onko maalla lipun tarina (napautettava lippu).</summary>
        public static bool On(string iso3) => UiSisalto.Maa(iso3)?.Lipputarina != null;

        public static void Avaa(string iso3)
        {
            var m = UiSisalto.Maa(iso3);
            var t = m?.Lipputarina;
            if (t == null) return;
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
                Button tarkennettu = null;
                void Tyhjenna()
                {
                    if (tarkennettu == null) return;
                    tarkennettu.RemoveFromClassList("mk-lippu__versio--tarkennettu");
                    tarkennettu.style.translate = StyleKeyword.Null;
                    tarkennettu = null;
                    foreach (var c in s.Children()) c.RemoveFromClassList("mk-lippu__sumea");
                    foreach (var c in rivi.Children()) c.RemoveFromClassList("mk-lippu__sumea");
                }
                void Tarkenna(Button b)
                {
                    bool auki = tarkennettu == b;
                    Tyhjenna();
                    if (auki) return;
                    tarkennettu = b;
                    foreach (var c in s.Children()) if (c != rivi) c.AddToClassList("mk-lippu__sumea");
                    foreach (var c in rivi.Children()) if (c != b) c.AddToClassList("mk-lippu__sumea");
                    b.AddToClassList("mk-lippu__versio--tarkennettu");
                    b.BringToFront();
                    // Web siirraVaakaan: kasvanut laatta ei saa ylittää kortin reunaa (skaala 1,7 keskipisteen ympäri).
                    float puoli = b.layout.width * 1.7f / 2f, keski = b.layout.center.x;
                    float ylitys = Mathf.Max(0f, puoli - keski) - Mathf.Max(0f, keski + puoli - rivi.layout.width);
                    b.style.translate = new Translate(Mathf.Round(ylitys), 0);
                }
                s.RegisterCallback<ClickEvent>(e =>
                {
                    if (tarkennettu == null) return;
                    for (var v = e.target as VisualElement; v != null && v != s; v = v.parent)
                        if (v.ClassListContains("mk-lippu__versio")) return;
                    Tyhjenna();
                });
                foreach (var v in versiot)
                {
                    string osoite = Osoite(MiniJson.Teksti(v, "polku"));
                    Button b = null;
                    b = Rakenne.Nappi(null, "mk-lippu__versio", () => Tarkenna(b), rivi);
                    var kuva = Rakenne.El("mk-lippu__versiokuva", b, PickingMode.Ignore);
                    if (osoite != null)
                        Kuvat.Hae(osoite, tx => { if (tx != null) kuva.style.backgroundImage = new StyleBackground(tx); });
                    Kirjasimet.Aseta(Rakenne.Teksti(MiniJson.Teksti(v, "nimi") ?? "", "mk-lippu__versionimi", b), Kirjasin.Kone);
                    string selite = MiniJson.Teksti(v, "selite");
                    if (!string.IsNullOrEmpty(selite))
                        Kirjasimet.Aseta(Rakenne.Teksti(selite, "mk-lippu__versioselite", b), Kirjasin.Luku);
                }
                Rakenne.Ruudukko(rivi, 96f, 10f);
            }, "mk-minipopup--lippu").Arkkipohja(); // löydös 72: maalehden vaalea korttipohja kuten webin .lippu-kehys
        }

        /// <summary>Versioiden polku on sivuston suhteellinen (assets/liput/versiot/…).</summary>
        static string Osoite(string polku) =>
            string.IsNullOrEmpty(polku) ? null : polku.StartsWith("http") ? polku : Laukku.SivustoJuuri + polku.TrimStart('/');

    }
}
