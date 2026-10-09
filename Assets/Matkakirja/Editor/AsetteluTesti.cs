// UITK-ASETTELUTESTI (Päätoimittaja 9.10.2026, Natiivi-UI): pallon (ja myöhemmin linnan) päänäkymien avainelementit neljässä
// laitekoossa ilman simulaattoria. UI-kuva-arkki 9.10. löysi viat (Kysy-paneelin Puhu/Kirjoita vierityksen takana iPhonen
// vaakatilassa, nyt-rivin päällekkäisyys), jotka jäivät kiinni vain simulla.
// Ajo käännöspalvelun projektissa (kuten KoriKoosteTesti): Unity -batchmode -executeMethod Matkakirja.Editori.AsetteluTesti.Aja
// (tyokalut/ui-asettelutesti.sh). Jokaiselle koolle: ympäristömuuttuja UiRuutu.TestiMuuttuja (säilyy domain reloadin yli) →
// Play-tila domain reloadin kanssa (kuten laitteella kylmäkäynnistys; ilman sitä tekstit jäivät toisesta koosta alkaen 0 × 0:ksi,
// ajo 9.10. 20.02) ja testin tila SessionStatessa reloadin yli → tyhjä kohtaus → UiKerros piirtää paneelit laitteen kokoiseen tekstuuriin → oppaan Kysy-paneeli ja ohjausnapit
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

        static readonly string[] TkOtsikot = { "Kalkki", "Pateeni", "Liuskekivi" };
        static readonly string[] TkLyhyet = { "Messun malja linnan kappelista.", "Kalkin kansi, jolla ehtoollisleipä kannettiin.",
            "Alttarin kivi, joka kulki pappien mukana." };
        static readonly string[] TkTekstit =
        {
            "Kalkki oli linnan kappelin arvokkain esine. Kun linna vaihtoi isäntää, papit kätkivät sen liinaan ja muurin rakoon, ettei se joutuisi vieraisiin käsiin. Maljan jalassa on kaiverrus, josta näkee, kenen lahjoittama se oli.",
            "Pateeni on matala lautanen, joka sopii kalkin kanneksi. Sen reunassa on risti ja kaksi kirjainta. Pateeni ja kalkki kuuluivat yhteen, ja ne käärittiin samaan liinaan.",
            "Liuskekivi on kannettava alttari: pieni kivilaatta, jonka päällä messu voitiin pitää missä tahansa. Kiven keskellä on syvennys, johon pyhäinjäännös suljettiin vahalla.",
        };

        enum Vaihe { Aloita, OdotaPelia, Kysy, AvaaKysy, OdotaKysy, Napit, OdotaNapit, NytRivi, OdotaNytRivi, Pallo, OdotaPallo, Mikseri, OdotaMikseri, Chat, OdotaChat, Pin, OdotaPin, Palkki, OdotaPalkki, Nosto, OdotaNosto,
            Taulu, OdotaTaulu, Linna, OdotaLinna, Loyto, OdotaLoyto,
            Tietokerros, AvaaTietokerros, OdotaTietokerros,
            Lopeta, OdotaLoppua, Valmis }

        static int kokoNro, kehyksia;
        static LinnaValikko linna;
        static double vaiheAlku;
        static Vaihe vaihe;
        static readonly List<string> rivit = new List<string>();
        static int virheita;

        const string Avain = "Matkakirja.AsetteluTesti.";

        public static void Aja()
        {
            rivit.Clear(); virheita = 0; kokoNro = 0; vaihe = Vaihe.Aloita;
            // Domain reload päälle ajon ajaksi (projektin oma asetus palautetaan lopussa).
            SessionState.SetBool(Avain + "optio", EditorSettings.enterPlayModeOptionsEnabled);
            EditorSettings.enterPlayModeOptionsEnabled = false;
            SessionState.SetBool(Avain + "kaynnissa", true);
            EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
            Tallenna();
            EditorApplication.update += Paivita;
        }

        /// <summary>Domain reloadin jälkeen (Play-tilaan mentäessä): tila SessionStatesta ja update-kytkentä takaisin.</summary>
        [InitializeOnLoadMethod]
        static void Jatka()
        {
            if (!SessionState.GetBool(Avain + "kaynnissa", false)) return;
            kokoNro = SessionState.GetInt(Avain + "koko", 0);
            vaihe = (Vaihe)SessionState.GetInt(Avain + "vaihe", 0);
            double.TryParse(SessionState.GetString(Avain + "alku", "0"), System.Globalization.NumberStyles.Float,
                System.Globalization.CultureInfo.InvariantCulture, out vaiheAlku);
            virheita = SessionState.GetInt(Avain + "virheita", 0);
            rivit.Clear();
            var r = SessionState.GetString(Avain + "rivit", "");
            if (r.Length > 0) rivit.AddRange(r.Split('\n'));
            EditorApplication.update += Paivita;
        }

        static void Tallenna()
        {
            SessionState.SetInt(Avain + "koko", kokoNro);
            SessionState.SetInt(Avain + "vaihe", (int)vaihe);
            SessionState.SetString(Avain + "alku", vaiheAlku.ToString("R", System.Globalization.CultureInfo.InvariantCulture));
            SessionState.SetInt(Avain + "virheita", virheita);
            SessionState.SetString(Avain + "rivit", string.Join("\n", rivit));
        }

        static void Siirry(Vaihe v) { vaihe = v; vaiheAlku = EditorApplication.timeSinceStartup; kehyksia = 0; }
        static double Kulunut => EditorApplication.timeSinceStartup - vaiheAlku;

        static void Paivita()
        {
            try { Askel(); if (vaihe != Vaihe.Valmis) Tallenna(); }
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
                    // Opas ensin näkyviin ja ☰ asettelluksi (laitteella pelaaja näkee oppaan ennen kuin avaa listan; lista
                    // sijoittuu ☰:n alle sen worldBoundista, OpasValikko.Asettele).
                    OpasValikko.TestiKysymykset = Kysymykset;
                    OpasValikko.Hae().Komento("sulje");
                    Siirry(Vaihe.AvaaKysy);
                    break;
                case Vaihe.AvaaKysy:
                    if (kehyksia < 10) return;
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
                    Siirry(Vaihe.Pallo);
                    break;
                case Vaihe.Pallo:
                {
                    // Pallon kierros (UI-kuva-arkki u02): metrolinja, esitysrivi, ■, Mikä tämä on ja tapit (vapaa tila) yhtä aikaa.
                    var o = OpasValikko.Hae();
                    o.Komento("esitys on"); o.Komento("metro 0"); o.Komento("mika"); o.Komento("lopeta"); o.Komento("sulje");
                    Siirry(Vaihe.OdotaPallo);
                    break;
                }
                case Vaihe.OdotaPallo:
                {
                    if (kehyksia < 20 || Kulunut < 1.0) return;
                    TarkistaPallo();
                    var o = OpasValikko.Hae();
                    o.Komento("metro auto"); o.Komento("mika pois"); o.Komento("lopeta pois"); o.Komento("esitys auto"); o.Komento("sulje");
                    Siirry(Vaihe.Mikseri);
                    break;
                }
                case Vaihe.Mikseri:
                    // Pallon mikseri (UI-kuva-arkki u06): demolähde ja paneeli auki (kuten `ui mikseri demo` + `ui mikseri auki`).
                    MikseriPaneeli.LappuPiilossa = false;
                    MikseriPaneeli.Lahde = new MikseriPaneeli.Demo();
                    (MikseriPaneeli.Viimeisin ?? new MikseriPaneeli(UiKerros.Hae())).Avaa(true);
                    Siirry(Vaihe.OdotaMikseri);
                    break;
                case Vaihe.OdotaMikseri:
                    if (kehyksia < 20 || Kulunut < 0.5) return;
                    TarkistaMikseri();
                    MikseriPaneeli.Viimeisin?.Avaa(false);
                    MikseriPaneeli.Lahde = null;
                    Siirry(Vaihe.Chat);
                    break;
                case Vaihe.Chat:
                    OpasValikko.Hae().Komento("sulje");
                    UiNakymat.Hae().Chat.Avaa();
                    Siirry(Vaihe.OdotaChat);
                    break;
                case Vaihe.OdotaChat:
                    if (kehyksia < 20 || Kulunut < 0.6) return;
                    TarkistaPaneeli(UiNakymat.Hae().Chat.TestiPaneeli, Pulu.Kerros, "chat");
                    Siirry(Vaihe.Pin);
                    break;
                case Vaihe.Pin:
                    // Pin päälle: chat nousee yläreunaan kokonaisena (omistaja 6.10.).
                    UiNakymat.Hae().Chat.TestiPinnaa();
                    Siirry(Vaihe.OdotaPin);
                    break;
                case Vaihe.OdotaPin:
                    if (kehyksia < 20 || Kulunut < 0.6) return;
                    TarkistaPaneeli(UiNakymat.Hae().Chat.TestiPaneeli, Pulu.Kerros, "chat pinnattu");
                    Pinnaus.Pienenna();   // kartan liike pienentää pinnatun chatin yhden rivin palkiksi
                    Siirry(Vaihe.Palkki);
                    break;
                case Vaihe.Palkki:
                    Siirry(Vaihe.OdotaPalkki);
                    break;
                case Vaihe.OdotaPalkki:
                    if (kehyksia < 20 || Kulunut < 0.6) return;
                    TarkistaPaneeli(Pinnaus.TestiPalkki, UiKerros.Tilarivi, "pinnattu palkki");
                    Pinnaus.Testi("pois");
                    UiNakymat.Hae().Chat.Sulje();
                    Siirry(Vaihe.Nosto);
                    break;
                case Vaihe.Nosto:
                    UiNakymat.Hae().Nostokortti.Avaa("kohde:pompeji@ITA");
                    Siirry(Vaihe.OdotaNosto);
                    break;
                case Vaihe.OdotaNosto:
                {
                    // Nosto latautuu paketista: odotetaan korttia enintään 10 s.
                    var nk = UiNakymat.Hae().Nostokortti;
                    bool valmis = nk.Auki && nk.TestiKortti?.panel != null && nk.TestiKortti.worldBound.height >= 1f;
                    if ((!valmis && Kulunut < 10) || kehyksia < 20 || Kulunut < 1.0) return;
                    if (!nk.Auki) Virhe("nosto: lukunäkymä ei aukea");
                    else TarkistaPaneeli(nk.TestiKortti, UiKerros.Valikot, "nosto");
                    nk.Sulje();
                    Siirry(Vaihe.Taulu);
                    break;
                }
                case Vaihe.Taulu:
                    // Taulu elää astronautin linssin ajan (PulunTauluNakyma.LinssiVaihtui): linssi "auki" taululle testin ajaksi.
                    UiNakymat.Hae().Linssit.Astronautti.Taulu.LinssiVaihtui(true);
                    UiNakymat.Hae().Linssit.Astronautti.Taulu.Testaa("auki", "");
                    Siirry(Vaihe.OdotaTaulu);
                    break;
                case Vaihe.OdotaTaulu:
                {
                    if (kehyksia < 20 || Kulunut < 0.8) return;
                    var taulu = UiNakymat.Hae().Linssit.Astronautti.Taulu;
                    if (!taulu.Auki) Virhe("ISS-taulu: ei aukea (" + taulu.Tila() + ")");
                    else TarkistaPaneeli(taulu.TestiPaneeli, LinssiUi.Ylakerros, "ISS-taulu");
                    taulu.Testaa("kiinni", "");
                    taulu.LinssiVaihtui(false);
                    Siirry(Vaihe.Linna);
                    break;
                }
                case Vaihe.Linna:
                    // Linnan HUD ilman SeikkailuPelaajaa: tapit näkyviin ja toimintonappi poimi-tilaan (testikytkimet). Oppaan
                    // esitysrivi (Kysy-rivi, tauko) pois: linnassa ei ole kierrosta.
                    // Linnassa oppaan napit eivät näy (DioraamaTaulu näyttää LinnaValikon): opas piiloon, linnan valikko näkyviin.
                    OpasValikko.Hae().Komento("esitys auto");
                    OpasValikko.Hae().Komento("sulje");
                    OpasValikko.Hae().Nayta(false);
                    linna = new LinnaValikko(UiKerros.Hae(), LinssiUi.RadioKerros);
                    linna.Nayta(true);
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
                    Siirry(Vaihe.Tietokerros);
                    break;
                case Vaihe.Tietokerros:
                    // Linnan tietokerroksen kortisto (UI-kuva-arkki u13): kolme pitkää korttia, jotta lista vierii ja Takaisin
                    // on silti näkyvissä.
                    SeikkailuTapit.NaytaTietokerros(TkOtsikot, TkTekstit, TkLyhyet);
                    Siirry(Vaihe.AvaaTietokerros);
                    break;
                case Vaihe.AvaaTietokerros:
                    // NaytaTietokerros kulkee UiKerros.PaaSaikeessa-jonon kautta: avaus vasta, kun tarjous on perillä.
                    if (!SeikkailuTapit.TietokerrosTarjolla && Kulunut < 10) return;
                    if (kehyksia < 5) return;
                    SeikkailuTapit.AvaaTietokerrosValikosta();
                    Siirry(Vaihe.OdotaTietokerros);
                    break;
                case Vaihe.OdotaTietokerros:
                    if (kehyksia < 20 || Kulunut < 0.6) return;
                    TarkistaTietokerros();
                    if (SeikkailuTapit.TestiTietokerros != null) Rakenne.Nayta(SeikkailuTapit.TestiTietokerros, false, 0);
                    linna?.Nayta(false);
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
                // iPhone vaaka (9.10.2026): Puhu ja Kirjoita OHJAUSNAPPI-kuvakkeina otsikkorivillä, VoiceOver-nimi tooltipissä.
                var e = Etsi(juuri, teksti) ?? opas.TestiValikko?.Query<VisualElement>(className: "mk-ohjausnappi")
                    .Where(n => n.tooltip == teksti && n.resolvedStyle.display != DisplayStyle.None).First();
                if (e == null) { Virhe($"Kysy: \"{teksti}\" puuttuu"); continue; }
                Kokonaan(e, turva, "Kysy: " + teksti);
                IlmanVieritysta(e, "Kysy: " + teksti);
            }
            // Erotinviiva kysymysten ja Puhu/Kirjoita-rivien välissä, ei listan alla (UI-kuva-arkki 9.10.2026 u03/u05).
            var puhu = Etsi(juuri, "Puhu oppaalle");
            if (puhu != null && opas.TestiValikko != null)
                opas.TestiValikko.Query<VisualElement>(className: "mk-linssivalikko__viiva").ForEach(v =>
                {
                    if (!Nakyvissa(v)) return;
                    if (v.worldBound.yMin > puhu.worldBound.yMax) Virhe($"Kysy: erotinviiva {Laatikko(v.worldBound)} on Puhu oppaalle -rivin alla");
                    else Kirjaa($"OK Kysy: erotinviiva {Laatikko(v.worldBound)} ennen Puhu oppaalle");
                });
            float peitto = Peitto(opas.TestiValikko, juuri);
            if (peitto > 0.45f) Virhe($"Kysy-paneelin peitto {peitto:P0} > 45 %"); else Kirjaa($"OK Kysy-paneelin peitto {peitto:P0}");
        }

        static void TarkistaNapit()
        {
            var opas = OpasValikko.Hae();
            var juuri = opas.TestiJuuri;
            if (juuri?.panel == null) { Virhe("oppaan paneeli puuttuu"); return; }
            var turva = TurvaAlue(juuri);
            var nakyvat = Nakyvat(opas.TestiAvainnapit()).ToList();
            foreach (var (nimi, _) in opas.TestiAvainnapit()) if (!nakyvat.Any(n => n.Nimi == nimi)) Kirjaa($"-- {nimi}: ei näkyvissä");
            foreach (var (nimi, e) in nakyvat)
            {
                // iPhone pystyssä ☀ ja ☰ ovat tarkoituksella Dynamic Islandin vierellä turva-alueen yläpuolella (omistajan TF 169
                // -palaute 9.10.2026, OpasValikko.SijoitaAikaNappi): ruudulla eivätkä Islandin päällä.
                if (Koot[kokoNro].Nimi == "iphone-pysty" && (nimi == "☰" || nimi == "☀/☾")) EiIslandilla(e, juuri, nimi);
                else Kokonaan(e, turva, nimi);
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
            var juuri = linna?.Juuri;
            if (juuri?.panel == null) { Virhe("linnan valikon paneeli puuttuu"); return; }
            var turva = TurvaAlue(juuri);
            var napit = Nakyvat(linna.TestiAvainnapit()).ToList();
            foreach (var (nimi, e) in napit) Kokonaan(e, turva, "linna: " + nimi);
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

        static void TarkistaPallo()
        {
            var opas = OpasValikko.Hae();
            var juuri = opas.TestiJuuri;
            if (juuri?.panel == null) { Virhe("pallo: oppaan paneeli puuttuu"); return; }
            var turva = TurvaAlue(juuri);
            var koko = juuri.panel.visualTree.layout;
            var napit = Nakyvat(opas.TestiAvainnapit()).ToList();
            var ohjaimet = Nakyvat(opas.TestiPallonOhjaimet()).ToList();
            foreach (var (nimi, _) in opas.TestiPallonOhjaimet()) if (!ohjaimet.Any(n => n.Nimi == nimi)) Kirjaa($"-- pallo: {nimi} ei näkyvissä");
            for (int i = 0; i < ohjaimet.Count; i++)
            {
                var (nimi, e) = ohjaimet[i];
                Kokonaan(e, turva, "pallo: " + nimi);
                // Oppaan napit ja muut ohjaimet (kukin pari kerran).
                foreach (var (n2, e2) in napit.Concat(ohjaimet.Skip(i + 1)))
                    if (e.worldBound.Overlaps(e2.worldBound))
                        Virhe($"pallo: {nimi} {Laatikko(e.worldBound)} on päällekkäin: {n2} {Laatikko(e2.worldBound)}");
            }
            // Metrolinja: tarkoituksella turva-alueen reunan yli (iPhone: Islandin viereen, OpasValikko.PaivitaMetro), joten ehto on
            // ruudulla pysyminen ja ettei se ole minkään ohjaimen päällä.
            var metro = opas.TestiMetro;
            if (metro == null || metro.panel == null || !Nakyvissa(metro)) { Virhe("pallo: metrolinja ei näkyvissä"); return; }
            var mb = SisallonLaatikko(metro);
            if (mb.xMin < -0.5f || mb.yMin < -0.5f || mb.xMax > koko.width + 0.5f || mb.yMax > koko.height + 0.5f)
                Virhe($"pallo: metrolinja {Laatikko(mb)} ei ole kokonaan ruudulla");
            else Kirjaa($"OK pallo: metrolinja {Laatikko(mb)}");
            foreach (var (n2, e2) in napit.Concat(ohjaimet))
                if (mb.Overlaps(e2.worldBound)) Virhe($"pallo: metrolinja {Laatikko(mb)} on päällekkäin: {n2} {Laatikko(e2.worldBound)}");
            var nyt = Matkakirja.Natiivi.NytRivi.TestiLappu;
            if (nyt?.panel != null && Nakyvissa(nyt) && nyt.resolvedStyle.opacity > 0.5f && mb.Overlaps(nyt.worldBound))
                Virhe($"pallo: metrolinja on nyt-rivin päällä {Laatikko(nyt.worldBound)}");
        }

        /// <summary>Näkyvien tekstien ja pisteiden yhteinen laatikko (linjan juuri voi olla koko ruudun kokoinen).</summary>
        static Rect SisallonLaatikko(VisualElement juuri)
        {
            Rect? r = null;
            juuri.Query<VisualElement>().ForEach(e =>
            {
                if (e == juuri || e.childCount > 0 || !Nakyvissa(e) || e.resolvedStyle.visibility == Visibility.Hidden) return;
                var b = e.worldBound;
                if (!(b.width >= 1f && b.height >= 1f)) return;
                r = r == null ? b : Rect.MinMaxRect(Mathf.Min(r.Value.xMin, b.xMin), Mathf.Min(r.Value.yMin, b.yMin),
                    Mathf.Max(r.Value.xMax, b.xMax), Mathf.Max(r.Value.yMax, b.yMax));
            });
            return r ?? juuri.worldBound;
        }

        /// <summary>Paneeli näkyvissä, mitoittunut ja kokonaan kerroksensa turva-alueella; peitto kirjataan.</summary>
        static void TarkistaPaneeli(VisualElement p, int kerros, string nimi)
        {
            if (p?.panel == null) { Virhe($"{nimi}: paneeli puuttuu"); return; }
            if (!Nakyvissa(p) || p.resolvedStyle.visibility == Visibility.Hidden) { Virhe($"{nimi}: ei näkyvissä"); return; }
            Kokonaan(p, TurvaAlue(p, kerros), nimi);
            Kirjaa($"-- {nimi}: peitto {Peitto(p, p):P0}");
        }

        static void TarkistaMikseri()
        {
            var p = MikseriPaneeli.Viimeisin?.TestiPaneeli;
            if (p?.panel == null) { Virhe("mikseri: paneeli puuttuu"); return; }
            if (!Nakyvissa(p)) { Virhe("mikseri: paneeli ei aukea"); return; }
            Kokonaan(p, TurvaAlue(p, MikseriPaneeli.Kerros), "mikseri: paneeli");
            float peitto = Peitto(p, p);
            if (peitto > 0.45f) Virhe($"mikseri: peitto {peitto:P0} > 45 %"); else Kirjaa($"OK mikseri: peitto {peitto:P0}");
        }

        static void TarkistaTietokerros()
        {
            var h = SeikkailuTapit.TestiTietokerros;
            if (h?.panel == null || !Nakyvissa(h)) { Virhe("tietokerros: kortisto ei aukea"); return; }
            var turva = TurvaAlue(h, UiKerros.Pelidialogit);
            var kortti = h.Query<VisualElement>(className: "mk-kortti-kehys--tumma").First();
            if (kortti != null) Kokonaan(kortti, turva, "tietokerros: kortti"); else Virhe("tietokerros: kortti puuttuu");
            var otsikko = Etsi(h, TkOtsikot[0].ToUpperInvariant());
            if (otsikko == null) Virhe("tietokerros: ensimmäinen kortti puuttuu");
            else { Kokonaan(otsikko, turva, "tietokerros: " + TkOtsikot[0]); IlmanVieritysta(otsikko, "tietokerros: " + TkOtsikot[0]); }
            var takaisin = Etsi(h, Kieli.T("ui.seikkailu.takaisin"));
            if (takaisin == null) Virhe("tietokerros: Takaisin puuttuu");
            else { Kokonaan(takaisin, turva, "tietokerros: Takaisin"); IlmanVieritysta(takaisin, "tietokerros: Takaisin"); }
        }

        // --- apurit ---------------------------------------------------------------------------------------------------

        /// <summary>Dynamic Island (iPhone 17 Pro): 126 pt leveä keskellä, yläreunasta 48 pt (OpasValikko.IslandLeveysPt).</summary>
        static void EiIslandilla(VisualElement e, VisualElement juuri, string nimi)
        {
            var koko = juuri.panel.visualTree.layout;
            var island = new Rect(koko.width * 0.5f - 63f, 0f, 126f, 48f);
            var b = e.worldBound;
            if (b.Overlaps(island)) Virhe($"{nimi} {Laatikko(b)} on Dynamic Islandin päällä {Laatikko(island)}");
            else if (b.xMin < 0 || b.yMin < 0 || b.xMax > koko.width || b.yMax > koko.height) Virhe($"{nimi} {Laatikko(b)} ei ole ruudulla");
            else Kirjaa($"OK {nimi} {Laatikko(b)} (Islandin vierellä)");
        }

        static IEnumerable<(string Nimi, VisualElement E)> Nakyvat(IEnumerable<(string Nimi, VisualElement E)> napit) =>
            napit.Where(n => n.E != null && n.E.panel != null && n.E.resolvedStyle.display != DisplayStyle.None
                && n.E.resolvedStyle.visibility != Visibility.Hidden && n.E.worldBound.width >= 1f && n.E.worldBound.height >= 1f
                && Nakyvissa(n.E));

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
            if (!(b.width >= 1f && b.height >= 1f)) { Virhe($"{nimi} {Laatikko(b)} ei mitoittunut"); return; }
            if (b.xMin >= turva.xMin - Vara && b.xMax <= turva.xMax + Vara && b.yMin >= turva.yMin - Vara && b.yMax <= turva.yMax + Vara)
                Kirjaa($"OK {nimi} {Laatikko(b)}");
            else Virhe($"{nimi} {Laatikko(b)} ei ole kokonaan turva-alueella {Laatikko(turva)}");
        }

        /// <summary>
        /// Näkyvä osa = vieritysikkunan, ScrollViewn ja sen isän (paneeli, esim. oppaan valikko) leikkaus: maxHeightilla rajattu
        /// paneeli leikkaa listan, vaikka vieritysikkuna jatkuisi sen alle.
        /// </summary>
        static void IlmanVieritysta(VisualElement e, string nimi)
        {
            for (var p = e.parent; p != null; p = p.parent)
            {
                if (!(p is ScrollView sv)) continue;
                var ikkuna = Leikkaa(sv.contentViewport.worldBound, sv.worldBound);
                if (sv.parent != null) ikkuna = Leikkaa(ikkuna, sv.parent.worldBound);
                var b = e.worldBound;
                if (b.yMin < ikkuna.yMin - 0.5f || b.yMax > ikkuna.yMax + 0.5f)
                    Virhe($"{nimi} {Laatikko(b)} vaatii vierityksen (näkyvä osa {Laatikko(ikkuna)})");
            }
        }

        static Rect Leikkaa(Rect a, Rect b) =>
            Rect.MinMaxRect(Mathf.Max(a.xMin, b.xMin), Mathf.Max(a.yMin, b.yMin), Mathf.Min(a.xMax, b.xMax), Mathf.Min(a.yMax, b.yMax));

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
            vaihe = Vaihe.Valmis;
            Environment.SetEnvironmentVariable(UiRuutu.TestiMuuttuja, null);
            EditorSettings.enterPlayModeOptionsEnabled = SessionState.GetBool(Avain + "optio", false);
            SessionState.EraseBool(Avain + "kaynnissa");
            Kirjaa(virheita == 0 ? "ASETTELUTESTI LÄPI" : $"ASETTELUTESTI {virheita} VIKAA");
            Directory.CreateDirectory("tulokset");
            File.WriteAllLines("tulokset/asettelutesti.txt", rivit);
            EditorApplication.Exit(virheita == 0 ? 0 : 1);
        }
    }
}
