// VOICEOVER-SILTA (Natiivi-UI, Fablen App Store -laatujono 27.9.2026 kohta 3, erä B): UI Toolkit ei välitä
// elementtejään iOS:n ruudunlukijalle, joten sovellus näkyi VoiceOverille tyhjänä. Tämä rakentaa Unityn
// AccessibilityHierarchyn (UnityEngine.Accessibility, Unity 6) näkyvistä UITK-ohjaimista ja teksteistä:
//   napit     Button/Kosketusnappi → rooli Button, nimi Saavutettavuus.Nimi (tooltip → teksti), aktivointi = napautus
//             keskipisteeseen (sama PointerDown/Up-reitti kuin ui napauta, joten Clickable ja Kosketusnapin ala toimivat)
//   kytkimet  Toggle (rooli Toggle, tila Selected), Slider (Slider, arvo, ylös/alas 10 %)
//   tekstit   Label/TextElement napin ulkopuolella → StaticText
// Järjestys: ylin kerros ensin, kerroksen sisällä ylhäältä alas, vasemmalta oikealle. Modaalinen peite (lähes koko
// ruudun poimittava elementti) rajaa puun peitteen kerrokseen ja sen yläpuolelle, kuten kosketuskin.
// Puu rakennetaan vain ruudunlukijan ollessa päällä (AssistiveSupport.isScreenReaderEnabled) tai testikomennolla
// `ui voiceover [paalle|pois|puu]`; muutos tarkistetaan 0,5 s:n välein kevyellä allekirjoituksella (lepopiirto säilyy:
// tarkistus ei merkitse UI:ta likaiseksi). Kehykset näyttöpikseleinä, origo vasen yläkulma.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using UnityEngine;
using UnityEngine.Accessibility;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class SaavutettavuusSilta
    {
        const int Enintaan = 400;
        static AccessibilityHierarchy puu;
        static int allekirjoitus;
        static bool? pakotettu;
        static IVisualElementScheduledItem ajastin;
        static readonly List<(VisualElement El, AccessibilityNode Solmu)> solmut = new List<(VisualElement, AccessibilityNode)>();

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { puu = null; allekirjoitus = 0; pakotettu = null; ajastin = null; solmut.Clear(); }

        static bool Paalla => pakotettu ?? AssistiveSupport.isScreenReaderEnabled;

        /// <summary>Käynnistys UiNakymat-rakennuksen lopussa: tarkistus 0,5 s:n välein, ruudunlukijan tilan muutos heti.</summary>
        public static void Kaynnista(UiKerros kerros)
        {
            ajastin?.Pause();
            ajastin = kerros.Juuri(UiKerros.Tilarivi).schedule.Execute(Tarkista).Every(500);
            AssistiveSupport.screenReaderStatusChanged -= Tila;
            AssistiveSupport.screenReaderStatusChanged += Tila;
        }

        static void Tila(bool paalla) { allekirjoitus = 0; Tarkista(); }

        /// <summary>Testikomento: paalle | pois | puu (kirjoittaa Documents/voiceover-puu.txt) | ilman = tila.</summary>
        public static string Komento(string mita)
        {
            switch (mita)
            {
                case "paalle": pakotettu = true; allekirjoitus = 0; Tarkista(); return "voiceover-silta pakotettu päälle";
                case "pois": pakotettu = null; allekirjoitus = 0; Tarkista(); return "voiceover-silta laitteen mukaan";
                case "puu":
                {
                    if (puu == null) { pakotettu = true; allekirjoitus = 0; Tarkista(); }
                    var sb = new StringBuilder();
                    foreach (var (_, s) in solmut)
                        sb.Append(s.role).Append('\t').Append(s.label).Append('\t')
                          .Append(string.Format(CultureInfo.InvariantCulture, "{0:0} {1:0} {2:0}×{3:0}", s.frame.x, s.frame.y, s.frame.width, s.frame.height))
                          .Append(string.IsNullOrEmpty(s.value) ? "" : "\t" + s.value).Append('\n');
                    File.WriteAllText(Path.Combine(Application.persistentDataPath, "voiceover-puu.txt"), sb.ToString());
                    return $"voiceover-puu: {solmut.Count} solmua → voiceover-puu.txt";
                }
                default:
                    return $"voiceover-silta {(Paalla ? "päällä" : "pois")} (ruudunlukija {AssistiveSupport.isScreenReaderEnabled}), solmuja {solmut.Count}";
            }
        }

        static void Tarkista()
        {
            if (!UiKerros.Olemassa) return;
            if (!Paalla)
            {
                if (puu != null) { AssistiveSupport.activeHierarchy = null; puu = null; solmut.Clear(); allekirjoitus = 0; }
                return;
            }
            var ehdokkaat = Keraa();
            int a = 17;
            foreach (var (e, nimi, _) in ehdokkaat)
            {
                var r = e.worldBound;
                a = a * 31 + e.GetHashCode();
                a = a * 31 + (nimi?.GetHashCode() ?? 0);
                a = a * 31 + Mathf.RoundToInt(r.x) * 7 + Mathf.RoundToInt(r.y) * 13;
            }
            if (a == allekirjoitus && puu != null) return;
            bool uusiNakyma = puu == null || Math.Abs(ehdokkaat.Count - solmut.Count) > 8;
            allekirjoitus = a;
            Rakenna(ehdokkaat);
            if (uusiNakyma) AssistiveSupport.notificationDispatcher.SendScreenChanged();
            else AssistiveSupport.notificationDispatcher.SendLayoutChanged();
        }

        enum Laji { Nappi, Kytkin, Liukusaadin, Teksti }

        /// <summary>Näkyvät ehdokkaat oikeassa lukujärjestyksessä.</summary>
        static List<(VisualElement El, string Nimi, Laji Laji)> Keraa()
        {
            var juuret = UiKerros.Hae().Juuret.Where(j => j.Juuri != null && j.Juuri.panel != null).ToList();
            // Modaalinen peite: ylin kerros, jossa on lähes koko ruudun poimittava elementti.
            int alin = int.MinValue;
            foreach (var (kerros, juuri) in juuret.OrderByDescending(j => j.Kerros))
            {
                if (OnPeite(juuri)) { alin = kerros; break; }
            }
            var tulos = new List<(VisualElement, string, Laji, int, Rect)>();
            foreach (var (kerros, juuri) in juuret)
            {
                if (kerros < alin) continue;
                var koko = juuri.worldBound;
                void Kay(VisualElement e, float opasiteetti, bool napinSisalla)
                {
                    var rs = e.resolvedStyle;
                    if (rs.display == DisplayStyle.None || rs.visibility == Visibility.Hidden) return;
                    opasiteetti *= rs.opacity;
                    if (opasiteetti <= 0.05f || tulos.Count >= Enintaan) return;
                    var r = e.worldBound;
                    bool ruudulla = r.width > 1 && r.height > 1 && r.xMax > koko.xMin && r.xMin < koko.xMax && r.yMax > koko.yMin && r.yMin < koko.yMax;
                    if (ruudulla && !napinSisalla)
                    {
                        if (e is Toggle && e.pickingMode == PickingMode.Position) { tulos.Add((e, Saavutettavuus.Nimi(e), Laji.Kytkin, kerros, r)); return; }
                        if (e is Slider) { tulos.Add((e, Saavutettavuus.Nimi(e) ?? Saavutettavuus.Nimi(e.hierarchy.parent), Laji.Liukusaadin, kerros, r)); return; }
                        if (e is Button && e.pickingMode == PickingMode.Position && e.enabledInHierarchy)
                        {
                            tulos.Add((e, Saavutettavuus.Nimi(e), Laji.Nappi, kerros, r));
                            napinSisalla = true;
                        }
                        else if (e is TextElement te && !(e is Button))
                        {
                            string t = System.Text.RegularExpressions.Regex.Replace(te.text ?? "", "<[^>]+>", "").Trim();
                            if (t.Length > 0) tulos.Add((e, t, Laji.Teksti, kerros, r));
                        }
                    }
                    foreach (var lapsi in e.hierarchy.Children()) Kay(lapsi, opasiteetti, napinSisalla);
                }
                Kay(juuri, 1f, false);
            }
            // Lukujärjestys ruudulla ylhäältä alas (peite on jo rajannut alemmat kerrokset); rivi = 8 yksikön kaista,
            // jotta samalla rivillä olevat luetaan vasemmalta oikealle.
            return tulos.OrderBy(x => Mathf.Round(x.Item5.y / 8f)).ThenBy(x => x.Item5.x)
                        .Select(x => (x.Item1, x.Item2, x.Item3)).ToList();
        }

        static bool OnPeite(VisualElement juuri)
        {
            var koko = juuri.worldBound;
            if (juuri.resolvedStyle.display == DisplayStyle.None || koko.width <= 0) return false;
            foreach (var lapsi in juuri.hierarchy.Children())
            {
                var rs = lapsi.resolvedStyle;
                if (rs.display == DisplayStyle.None || rs.visibility == Visibility.Hidden || rs.opacity < 0.05f || lapsi.pickingMode != PickingMode.Position) continue;
                var r = lapsi.worldBound;
                if (r.width * r.height >= 0.9f * koko.width * koko.height) return true;
            }
            return false;
        }

        static void Rakenna(List<(VisualElement El, string Nimi, Laji Laji)> ehdokkaat)
        {
            puu ??= new AccessibilityHierarchy();
            puu.Clear();
            solmut.Clear();
            foreach (var (e, nimi, laji) in ehdokkaat)
            {
                var s = puu.AddNode(nimi ?? "Nimetön painike");
                var el = e;
                s.frameGetter = () => Kehys(el);
                switch (laji)
                {
                    case Laji.Nappi:
                        s.role = AccessibilityRole.Button;
                        s.hint = Saavutettavuus.Vihje(el);
                        s.invoked += () => Paina(el);
                        break;
                    case Laji.Kytkin:
                        s.role = AccessibilityRole.Toggle;
                        if (el is Toggle t)
                        {
                            s.state = t.value ? AccessibilityState.Selected : AccessibilityState.None;
                            s.invoked += () => { t.value = !t.value; s.state = t.value ? AccessibilityState.Selected : AccessibilityState.None; return true; };
                        }
                        break;
                    case Laji.Liukusaadin:
                        s.role = AccessibilityRole.Slider;
                        if (el is Slider sl)
                        {
                            string Arvo() => sl.value.ToString("0.##", CultureInfo.InvariantCulture).Replace('.', ',');
                            s.value = Arvo();
                            float askel = (sl.highValue - sl.lowValue) / 10f;
                            s.incremented += () => { sl.value = Mathf.Min(sl.highValue, sl.value + askel); s.value = Arvo(); };
                            s.decremented += () => { sl.value = Mathf.Max(sl.lowValue, sl.value - askel); s.value = Arvo(); };
                        }
                        break;
                    default:
                        s.role = AccessibilityRole.StaticText;
                        break;
                }
                solmut.Add((e, s));
            }
            puu.RefreshNodeFrames();
            AssistiveSupport.activeHierarchy = puu;
        }

        /// <summary>Paneelin koordinaatit näyttöpikseleiksi (origo vasen yläkulma).</summary>
        static Rect Kehys(VisualElement e)
        {
            if (e.panel == null) return Rect.zero;
            var r = e.worldBound;
            var v = e.panel.visualTree.worldBound;
            if (v.width <= 0 || v.height <= 0) return Rect.zero;
            float sx = Screen.width / v.width, sy = Screen.height / v.height;
            return new Rect((r.x - v.x) * sx, (r.y - v.y) * sy, r.width * sx, r.height * sy);
        }

        /// <summary>Napautus keskipisteeseen (sama reitti kuin ui napauta): Clickable ja Kosketusnapin ala toimivat.</summary>
        static bool Paina(VisualElement e)
        {
            if (e.panel == null) return false;
            var p = e.worldBound.center;
            var alas = new Event { type = EventType.MouseDown, mousePosition = p, button = 0, clickCount = 1 };
            var ylos = new Event { type = EventType.MouseUp, mousePosition = p, button = 0, clickCount = 1 };
            using (var ev = PointerDownEvent.GetPooled(alas)) { ev.target = e; e.SendEvent(ev); }
            using (var ev = PointerUpEvent.GetPooled(ylos)) { ev.target = e; e.SendEvent(ev); }
            allekirjoitus = 0; // näkymä muuttuu todennäköisesti: puu uudelleen seuraavalla tarkistuksella
            return true;
        }
    }
}
