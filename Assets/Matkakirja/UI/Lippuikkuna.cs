// LIPUN TARINA (Natiivi-UI): webin js/liput.js avaaLippuikkuna (omistaja 15.8.2026: "Tee lipusta
// klikattava"). Minipopup: maan nimi ja ×, nykyinen lippu isona ("Nykyinen lippu"), symboliikka
// ("Sininen = järvien ja taivaan väri."), tarinan kappaleet ja "Muut asut ja historialliset
// liput" -rivi (pikkulippu ja nimi). E14 (web liput.js tarkenna): versiolipun napautus kasvattaa sen paikallaan
// 1,7-kertaiseksi paperipohjalla, selite sen alla (10rem, 0,55rem), muu kortti häivyttyy (webissä blur 3 px —
// UITK:ssa ei sumennussuodatinta, joten peitto 0,3); uusi napautus tai napautus muualle palauttaa. Data: skeeman 1.15
// maat.lipputarina. Löydös 72: "Vaakunat ja tunnukset" (lipputarina.tunnukset) kuvarivein; napautus näyttää
// pelkän vaakunan isona ja selitteen sen alla. Avaajat: kartuschan lippu ja maalehden aiheotsikon lippu.
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
                var tunnukset = (Rakenne.Lista(MiniJson.Kentta(t, "tunnukset")) ?? new List<object>()).Select(MiniJson.Objekti).Where(x => x != null).ToList();
                if (versiot.Count == 0 && tunnukset.Count == 0) return;
                // Web tarkenna: yksi tarkennettu kerrallaan koko kortissa (versiolippu tai vaakuna); muu kortti ja
                // saman haaran muut häivyttyvät.
                Button tarkennettu = null;
                void Tyhjenna()
                {
                    if (tarkennettu == null) return;
                    tarkennettu.RemoveFromClassList("mk-lippu__versio--tarkennettu");
                    tarkennettu.RemoveFromClassList("mk-lippu__tunnus--tarkennettu");
                    tarkennettu.style.translate = StyleKeyword.Null;
                    var haara = tarkennettu.parent;
                    tarkennettu = null;
                    foreach (var c in s.Children()) c.RemoveFromClassList("mk-lippu__sumea");
                    foreach (var c in haara.Children()) c.RemoveFromClassList("mk-lippu__sumea");
                }
                void Sumenna(Button b)
                {
                    foreach (var c in s.Children()) if (c != b.parent) c.AddToClassList("mk-lippu__sumea");
                    foreach (var c in b.parent.Children()) if (c != b) c.AddToClassList("mk-lippu__sumea");
                }
                void Tarkenna(Button b)
                {
                    bool auki = tarkennettu == b;
                    Tyhjenna();
                    if (auki) return;
                    tarkennettu = b;
                    Sumenna(b);
                    b.AddToClassList("mk-lippu__versio--tarkennettu");
                    b.BringToFront();
                    // Web siirraVaakaan: kasvanut laatta ei saa ylittää kortin reunaa (skaala 1,7 keskipisteen ympäri).
                    float puoli = b.layout.width * 1.7f / 2f, keski = b.layout.center.x;
                    float ylitys = Mathf.Max(0f, puoli - keski) - Mathf.Max(0f, keski + puoli - b.parent.layout.width);
                    b.style.translate = new Translate(Mathf.Round(ylitys), 0);
                }
                // Web .lippu-tunnus.tarkennettu: pelkkä vaakuna isona (min(64 %, 13rem)) ja selite paperilla sen alla,
                // kasvaa paikalleen 0,55:stä (lippu-kasvu 240 ms); tarkennettu vieritetään näkyviin täysikokoisena.
                void TarkennaTunnus(Button b)
                {
                    bool auki = tarkennettu == b;
                    Tyhjenna();
                    if (auki) return;
                    tarkennettu = b;
                    Sumenna(b);
                    b.AddToClassList("mk-lippu__tunnus--tarkennettu");
                    b.style.scale = new Scale(new Vector3(0.55f, 0.55f, 1f));
                    b.style.opacity = 0.4f;
                    b.schedule.Execute(() => { b.style.scale = StyleKeyword.Null; b.style.opacity = StyleKeyword.Null; });
                    b.schedule.Execute(() =>
                    {
                        if (tarkennettu == b) b.GetFirstAncestorOfType<ScrollView>()?.ScrollTo(b);
                    }).ExecuteLater(300);
                }
                s.RegisterCallback<ClickEvent>(e =>
                {
                    if (tarkennettu == null) return;
                    for (var v = e.target as VisualElement; v != null && v != s; v = v.parent)
                        if (v.ClassListContains("mk-lippu__versio") || v.ClassListContains("mk-lippu__tunnus")) return;
                    Tyhjenna();
                });
                if (versiot.Count > 0)
                {
                    Kirjasimet.Aseta(Rakenne.Teksti("MUUT ASUT JA HISTORIALLISET LIPUT", "mk-lippu__versiotyhdys", s), Kirjasin.KoneLihava);
                    var rivi = Rakenne.El("mk-lippu__versiot", s, PickingMode.Ignore);
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
                }
                // Löydös 72 (web liput.js "Vaakunat ja tunnukset"): kuva vasemmalla, nimi ja selite oikealla, rivi on nappi.
                if (tunnukset.Count > 0)
                {
                    Kirjasimet.Aseta(Rakenne.Teksti("Vaakunat ja tunnukset", "mk-lippu__tunnusotsikko", s), Kirjasin.KoneLihava);
                    var lista = Rakenne.El("mk-lippu__tunnukset", s, PickingMode.Ignore);
                    foreach (var x in tunnukset)
                    {
                        string osoite = Osoite(MiniJson.Teksti(x, "polku"));
                        Button b = null;
                        b = Rakenne.Nappi(null, "mk-lippu__tunnus", () => TarkennaTunnus(b), lista);
                        var kuva = Rakenne.El("mk-lippu__tunnuskuva", b, PickingMode.Ignore);
                        if (osoite != null)
                            Kuvat.Hae(osoite, tx =>
                            {
                                if (tx == null) return;
                                kuva.style.backgroundImage = new StyleBackground(tx);
                                // Web img height: auto — korkeus kuvan mittasuhteesta (leveys USS:ssä, tarkennettuna isompi).
                                void Korkeus()
                                {
                                    float w = kuva.resolvedStyle.width;
                                    if (!float.IsNaN(w) && w > 0) kuva.style.height = Mathf.Round(w * tx.height / Mathf.Max(1f, tx.width));
                                }
                                kuva.RegisterCallback<GeometryChangedEvent>(_ => Korkeus());
                                Korkeus();
                            });
                        var teksti = Rakenne.El("mk-lippu__tunnusteksti", b, PickingMode.Ignore);
                        Kirjasimet.Aseta(Rakenne.Teksti(MiniJson.Teksti(x, "nimi") ?? "", "mk-lippu__tunnusnimi", teksti), Kirjasin.Kone);
                        string selite = MiniJson.Teksti(x, "selite");
                        if (!string.IsNullOrEmpty(selite))
                            Kirjasimet.Aseta(Rakenne.Teksti(selite, "mk-lippu__tunnusselite", teksti), Kirjasin.Luku);
                    }
                }
            }, "mk-minipopup--lippu").Arkkipohja(); // löydös 72: maalehden vaalea korttipohja kuten webin .lippu-kehys
        }

        /// <summary>Versioiden polku on sivuston suhteellinen (assets/liput/versiot/…).</summary>
        static string Osoite(string polku) =>
            string.IsNullOrEmpty(polku) ? null : polku.StartsWith("http") ? polku : Laukku.SivustoJuuri + polku.TrimStart('/');

    }
}
