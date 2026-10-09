// UITK-ASETTELUTESTI (Päätoimittaja 9.10.2026, Natiivi-UI): pallon (ja myöhemmin linnan) päänäkymien avainelementit neljässä
// laitekoossa ilman simulaattoria. UI-kuva-arkki 9.10. löysi viat (Kysy-paneelin Puhu/Kirjoita vierityksen takana iPhonen
// vaakatilassa, nyt-rivin päällekkäisyys), jotka jäivät kiinni vain simulla.
// Ajo käännöspalvelun projektissa (kuten KoriKoosteTesti): Unity -batchmode -executeMethod Matkakirja.Editori.AsetteluTesti.Aja
// (tyokalut/ui-asettelutesti.sh). Jokaiselle koolle: ympäristömuuttuja UiRuutu.TestiMuuttuja (säilyy domain reloadin yli) →
// Play-tila tyhjässä kohtauksessa → UiKerros piirtää paneelit laitteen kokoiseen tekstuuriin → oppaan Kysy-paneeli ja ohjausnapit
// → tarkistukset → Play-tilasta pois. Tarkistukset: elementti kokonaan turva-alueella, vieritettävän listan rivi näkyy ilman
// vieritystä, paneelin peitto ≤ 45 %. Tulos tulokset/asettelutesti.txt; exit 0 = kaikki läpi.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Natiivi;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Editori
{
    public static class AsetteluTesti
    {
        /// <summary>Laitekoot: nimi, pikselit, turva-alue (origo vasen alakulma kuten Screen.safeArea), pikseliä pisteessä, tabletti.</summary>
        static readonly (string Nimi, string Arvo)[] Koot =
        {
            // iPhone 17 Pro 402 × 874 pt @3: Dynamic Island 62 pt, kotipalkki 34 pt (vaakana sivuilla 62 pt, alhaalla 21 pt).
            ("iphone-pysty", "1206,2622,0,102,1206,2334,3,0"),
            ("iphone-vaaka", "2622,1206,186,63,2250,1143,3,0"),
            // iPad Pro 11" 834 × 1210 pt @2: statuspalkki 24 pt, kotipalkki 20 pt.
            ("ipad-pysty", "1668,2420,0,40,1668,2332,2,1"),
            ("ipad-vaaka", "2420,1668,0,40,2420,1580,2,1"),
        };

        static readonly string[] Kysymykset =
        {
            "Kerro lisää", "Miksi katedraalin kattotuolia kutsuttiin metsäksi?", "Mitä tornihuipun kultainen kukko kätkee sisäänsä?",
            "Kuinka monta kelloa katedraalin torneissa soi?", "Pääseekö katedraalin torneihin taas kiipeämään?",
            "Mikä tehtävä katedraalin gargoileilla on?",
        };

        enum Vaihe { Aloita, OdotaPelia, Kysy, OdotaKysy, Napit, OdotaNapit, NytRivi, OdotaNytRivi, Linna, OdotaLinna, Loyto, OdotaLoyto,
            Lopeta, OdotaLoppua, Valmis }

        static int kokoNro, kehyksia;
        static double vaiheAlku;
        static Vaihe vaihe;
        static readonly List<string> rivit = new List<string>();
        static int virheita;

        static bool vanhaOptioPaalla;
        static EnterPlayModeOptions vanhaOptio;

        public static void Aja()
        {
            rivit.Clear(); virheita = 0; kokoNro = 0; vaihe = Vaihe.Aloita;
            // Ilman domain reloadia: tämän luokan tila ja update-kytkentä säilyvät Play-tilan yli (pelin staattiset nollautuvat
            // omilla SubsystemRegistration-nollauksillaan, kuten editorissa muutenkin). Palautetaan lopussa.
            vanhaOptioPaalla = EditorSettings.enterPlayModeOptionsEnabled; vanhaOptio = EditorSettings.enterPlayModeOptions;
            EditorSettings.enterPlayModeOptionsEnabled = true;
            EditorSettings.enterPlayModeOptions = EnterPlayModeOptions.DisableDomainReload;
            EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
            EditorApplication.update += Paivita;
        }

        static void Siirry(Vaihe v) { vaihe = v; vaiheAlku = EditorApplication.timeSinceStartup; kehyksia = 0; }
        static double Kulunut => EditorApplication.timeSinceStartup - vaiheAlku;

        static void Paivita()
        {
            try { Askel(); }
            catch (Exception e) { Kirjaa("KAATUI " + e); virheita++; Lopeta(); }
        }

        static void Askel()
        {
            kehyksia++;
            switch (vaihe)
            {
                case Vaihe.Aloita:
                    if (kokoNro >= Koot.Length) { Lopeta(); return; }
                    Environment.SetEnvironmentVariable(UiRuutu.TestiMuuttuja, Koot[kokoNro].Arvo);
                    Kirjaa($"== {Koot[kokoNro].Nimi} ({Koot[kokoNro].Arvo})");
                    EditorApplication.EnterPlaymode();
                    Siirry(Vaihe.OdotaPelia);
                    break;
                case Vaihe.OdotaPelia:
                    // Pelin oma käynnistys (UiNakymat ym.) ehtii ensimmäisiin ruutuihin; odotetaan, että UiKerros on olemassa.
                    if (EditorApplication.isPlaying && UiKerros.Olemassa && kehyksia > 30) Siirry(Vaihe.Kysy);
                    else if (Kulunut > 120) { Virhe("Play-tila ei käynnistynyt 120 s:ssa"); Siirry(Vaihe.Lopeta); }
                    break;
                case Vaihe.Kysy:
                    OpasValikko.TestiKysymykset = Kysymykset;
                    OpasValikko.Hae().Komento("kysy");
                    Siirry(Vaihe.OdotaKysy);
                    break;
                case Vaihe.OdotaKysy:
                    if (kehyksia < 20) return;
                    TarkistaKysy();
                    OpasValikko.Hae().Komento("sulje");
                    Siirry(Vaihe.Napit);
                    break;
                case Vaihe.Napit:
                    OpasValikko.Hae().Komento("esitys on");
                    OpasValikko.Hae().Komento("sulje");
                    Siirry(Vaihe.OdotaNapit);
                    break;
                case Vaihe.OdotaNapit:
                    if (kehyksia < 20) return;
                    TarkistaNapit();
                    Siirry(Vaihe.NytRivi);
                    break;
                case Vaihe.NytRivi:
                    Matkakirja.Natiivi.NytRivi.Nayta("Pariisi", 48.8566, 2.3522, "pariisi");
                    Siirry(Vaihe.OdotaNytRivi);
                    break;
                case Vaihe.OdotaNytRivi:
                    // Sää odottaa enintään NytRivi.SaanOdotusS; rivi näkyy ~3 s (Nimikyltti).
                    if (Kulunut < Matkakirja.Natiivi.NytRivi.SaanOdotusS + 0.8) return;
                    TarkistaNytRivi();
                    Siirry(Vaihe.Linna);
                    break;
                case Vaihe.Linna:
                    // Linnan HUD ilman SeikkailuPelaajaa: tapit näkyviin ja toimintonappi poimi-tilaan (testikytkimet).
                    SeikkailuTapit.TestiNakyy = true;
                    SeikkailuTapit.TestiToiminto = "poimi";
                    Siirry(Vaihe.OdotaLinna);
                    break;
                case Vaihe.OdotaLinna:
                    // Toimintonappi häivyttäen (Tyylikirja.Kesto.Sulku).
                    if (kehyksia < 20 || Kulunut < 0.8) return;
                    TarkistaLinna();
                    Siirry(Vaihe.Loyto);
                    break;
                case Vaihe.Loyto:
                    SeikkailuTapit.NaytaLoyto("Liinanyytti", "Liinaan kääritty nyytti, jonka joku jätti muurin rakoon kauan sitten.",
                        null, "+5 tp");
                    Siirry(Vaihe.OdotaLoyto);
                    break;
                case Vaihe.OdotaLoyto:
                    var paljastus = UiNakymat.Hae().Paljastus;
                    if (!paljastus.TestiJatkaEsilla && Kulunut < 15) return;
                    if (kehyksia < 10) return;
                    TarkistaLoyto(paljastus);
                    paljastus.Sulje();
                    Siirry(Vaihe.Lopeta);
                    break;
                case Vaihe.Lopeta:
                    OpasValikko.TestiKysymykset = null;
                    SeikkailuTapit.TestiNakyy = null;
                    SeikkailuTapit.TestiToiminto = null;
                    if (EditorApplication.isPlaying) EditorApplication.ExitPlaymode();
                    Siirry(Vaihe.OdotaLoppua);
                    break;
                case Vaihe.OdotaLoppua:
                    if (EditorApplication.isPlaying && Kulunut < 60) return;
                    kokoNro++;
                    Siirry(Vaihe.Aloita);
                    break;
            }
        }

        static void TarkistaKysy()
        {
            var opas = OpasValikko.Hae();
            var juuri = opas.TestiJuuri;
            if (juuri?.panel == null) { Virhe("oppaan paneeli puuttuu"); return; }
            var turva = TurvaAlue(juuri);
            foreach (var teksti in new[] { Kieli.T("ui.opas.kysy-oppaalta-2"), "Puhu oppaalle", "Kirjoita oppaalle" })
            {
                var e = Etsi(juuri, teksti);
                if (e == null) { Virhe($"Kysy: \"{teksti}\" puuttuu"); continue; }
                Kokonaan(e, turva, "Kysy: " + teksti);
                IlmanVieritysta(e, "Kysy: " + teksti);
            }
            float peitto = Peitto(opas.TestiValikko, juuri);
            if (peitto > 0.45f) Virhe($"Kysy-paneelin peitto {peitto:P0} > 45 %"); else Kirjaa($"OK Kysy-paneelin peitto {peitto:P0}");
        }

        static void TarkistaNapit()
        {
            var opas = OpasValikko.Hae();
            var juuri = opas.TestiJuuri;
            if (juuri?.panel == null) { Virhe("oppaan paneeli puuttuu"); return; }
            var turva = TurvaAlue(juuri);
            foreach (var (nimi, e) in opas.TestiAvainnapit())
            {
                if (e == null || e.panel == null || e.resolvedStyle.display == DisplayStyle.None || e.resolvedStyle.visibility == Visibility.Hidden)
                { Kirjaa($"-- {nimi}: ei näkyvissä"); continue; }
                Kokonaan(e, turva, nimi);
            }
        }

        static void TarkistaNytRivi()
        {
            var e = Matkakirja.Natiivi.NytRivi.TestiLappu;
            if (e?.panel == null) { Virhe("nyt-rivi ei syntynyt"); return; }
            if (e.resolvedStyle.visibility == Visibility.Hidden || e.resolvedStyle.opacity < 0.5f) { Virhe("nyt-rivi ei näkyvissä"); return; }
            var turva = TurvaAlue(OpasValikko.Hae().TestiJuuri);
            Kokonaan(e, turva, "nyt-rivi");
            var b = e.worldBound;
            foreach (var (nimi, n) in OpasValikko.Hae().TestiAvainnapit())
            {
                if (n == null || n.panel == null || n.resolvedStyle.display == DisplayStyle.None || n.resolvedStyle.visibility == Visibility.Hidden) continue;
                if (b.Overlaps(n.worldBound)) Virhe($"nyt-rivi {Laatikko(b)} on päällekkäin: {nimi} {Laatikko(n.worldBound)}");
            }
        }

        static void TarkistaLinna()
        {
            var juuri = OpasValikko.Hae().TestiJuuri;
            if (juuri?.panel == null) { Virhe("oppaan paneeli puuttuu"); return; }
            var turva = TurvaAlue(juuri);
            var napit = Nakyvat(OpasValikko.Hae().TestiAvainnapit()).ToList();
            foreach (var (nimi, e) in Nakyvat(SeikkailuTapit.TestiAvainnapit()))
            {
                Kokonaan(e, turva, "linna: " + nimi);
                foreach (var (n2, e2) in napit)
                    if (e.worldBound.Overlaps(e2.worldBound))
                        Virhe($"linna: {nimi} {Laatikko(e.worldBound)} on päällekkäin: {n2} {Laatikko(e2.worldBound)}");
            }
            if (!Nakyvat(SeikkailuTapit.TestiAvainnapit()).Any(t => t.Nimi == "toimintonappi")) Virhe("linna: toimintonappi ei näkyvissä");
        }

        static void TarkistaLoyto(Paljastus p)
        {
            if (!p.TestiJatkaEsilla) { Virhe("löytö: Jatka matkaa ei tullut esiin 15 s:ssa"); return; }
            var jatka = p.TestiJatka;
            if (jatka?.panel == null) { Virhe("löytö: paneeli puuttuu"); return; }
            var turva = TurvaAlue(jatka, UiKerros.Valikot);
            Kokonaan(jatka, turva, "löytö: Jatka matkaa");
            var nimi = Etsi(jatka, "Liinanyytti");
            if (nimi == null) Virhe("löytö: nimi puuttuu"); else Kokonaan(nimi, turva, "löytö: nimi");
        }

        // --- apurit ---------------------------------------------------------------------------------------------------

        static IEnumerable<(string Nimi, VisualElement E)> Nakyvat(IEnumerable<(string Nimi, VisualElement E)> napit) =>
            napit.Where(n => n.E != null && n.E.panel != null && n.E.resolvedStyle.display != DisplayStyle.None
                && n.E.resolvedStyle.visibility != Visibility.Hidden && Nakyvissa(n.E));

        /// <summary>Elementti ja kaikki sen esivanhemmat display ≠ None (piilotetun ryhmän lapsen oma tyyli on Flex).</summary>
        static bool Nakyvissa(VisualElement e)
        {
            for (var p = e; p != null; p = p.parent) if (p.resolvedStyle.display == DisplayStyle.None) return false;
            return true;
        }

        static Rect TurvaAlue(VisualElement e, int kerros = LinssiUi.RadioKerros)
        {
            var koko = e.panel.visualTree.layout;
            var r = UiKerros.Hae().Reunat(kerros);
            return Rect.MinMaxRect(r.x, r.y, koko.width - r.z, koko.height - r.w);
        }

        static VisualElement Etsi(VisualElement juuri, string teksti) =>
            juuri.panel.visualTree.Query<TextElement>().Where(t => t.text == teksti && t.resolvedStyle.display != DisplayStyle.None).First();

        static void Kokonaan(VisualElement e, Rect turva, string nimi)
        {
            var b = e.worldBound;
            const float Vara = 0.5f;
            if (b.xMin >= turva.xMin - Vara && b.xMax <= turva.xMax + Vara && b.yMin >= turva.yMin - Vara && b.yMax <= turva.yMax + Vara)
                Kirjaa($"OK {nimi} {Laatikko(b)}");
            else Virhe($"{nimi} {Laatikko(b)} ei ole kokonaan turva-alueella {Laatikko(turva)}");
        }

        static void IlmanVieritysta(VisualElement e, string nimi)
        {
            for (var p = e.parent; p != null; p = p.parent)
            {
                if (!(p is ScrollView sv)) continue;
                var ikkuna = sv.contentViewport.worldBound;
                var b = e.worldBound;
                if (b.yMin < ikkuna.yMin - 0.5f || b.yMax > ikkuna.yMax + 0.5f)
                    Virhe($"{nimi} {Laatikko(b)} vaatii vierityksen (näkyvä osa {Laatikko(ikkuna)})");
            }
        }

        static float Peitto(VisualElement e, VisualElement juuri)
        {
            var koko = juuri.panel.visualTree.layout;
            var b = e.worldBound;
            return koko.width * koko.height > 0 ? b.width * b.height / (koko.width * koko.height) : 1f;
        }

        static string Laatikko(Rect r) => $"[{r.xMin:0},{r.yMin:0} {r.width:0}×{r.height:0}]";

        static void Kirjaa(string s) { rivit.Add(s); Debug.Log("ASETTELUTESTI " + s); }
        static void Virhe(string s) { virheita++; Kirjaa("VIKA " + (kokoNro < Koot.Length ? Koot[kokoNro].Nimi + ": " : "") + s); }

        static void Lopeta()
        {
            EditorApplication.update -= Paivita;
            Environment.SetEnvironmentVariable(UiRuutu.TestiMuuttuja, null);
            EditorSettings.enterPlayModeOptionsEnabled = vanhaOptioPaalla; EditorSettings.enterPlayModeOptions = vanhaOptio;
            Kirjaa(virheita == 0 ? "ASETTELUTESTI LÄPI" : $"ASETTELUTESTI {virheita} VIKAA");
            Directory.CreateDirectory("tulokset");
            File.WriteAllLines("tulokset/asettelutesti.txt", rivit);
            EditorApplication.Exit(virheita == 0 ? 0 : 1);
        }
    }
}
