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
            Taulu, OdotaTaulu, Nakyma, OdotaNakyma, Linna, OdotaLinna, Loyto, OdotaLoyto,
            Tietokerros, AvaaTietokerros, OdotaTietokerros,
            Lopeta, OdotaLoppua, Valmis }

        static int kokoNro, kehyksia;
        static LinnaValikko linna;
        static double vaiheAlku;
        static Vaihe vaihe;
        static readonly List<string> rivit = new List<string>();
        static int virheita;

        const string Avain = "Matkakirja.AsetteluTesti.";

        /// <summary>
        /// Osa (Natiiviseppä 10.10.2026: kaksi ajoa omilla lukkovarauksilla, kumpikin 6 min:n rajalla): "pallo" = pallo ja kartta
        /// (Kysy … ISS-taulu ja kartan näkymät), "linna" = linna ja linssit (LinnanNakymat, linnan HUD, löytö, kortisto),
        /// tyhjä = kaikki. Ympäristömuuttuja säilyy domain reloadin yli (tyokalut/ui-asettelutesti.sh asettaa).
        /// </summary>
        public const string OsaMuuttuja = "MATKAKIRJA_ASETTELU_OSA";
        static string Osa => Environment.GetEnvironmentVariable(OsaMuuttuja) ?? "";
        static string OsaNimi => Osa.Length > 0 ? "osa " + Osa : "kaikki osat";

        static readonly HashSet<string> LinnanNakymat = new HashSet<string>
        {
            "linnan valikko", "linnan huoneet", "linnan äänet", "linnan lähteet", "keksinnöt", "aikajanan valikko", "ihmisen matka",
            "ihmisen matkan valikko", "radio", "maan kyltti", "linssin selite", "ajattelijat", "ISS-ohjaamo", "karttavalikko",
            "astronautin kuva", "minipulun kortti",
        };

        static bool OsaanKuuluu(string nimi) => Osa.Length == 0 || LinnanNakymat.Contains(nimi) == (Osa == "linna");

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
                    // Edellisen koon paneelitekstuurit pois ennen seuraavaa (ajo #14 kaatui GPU-muistin loppumiseen iPad pystyssä).
                    EditorUtility.UnloadUnusedAssetsImmediate();
                    GC.Collect();
                    Environment.SetEnvironmentVariable(UiRuutu.TestiMuuttuja, Koot[kokoNro].Arvo);
                    if (kokoNro == 0) Kirjaa("-- " + OsaNimi);
                    if (kokoNro == 0) Kirjaa("-- leikkausrajaus " + (ShouldClip != null ? "käytössä" : "EI käytössä (ShouldClip puuttuu)"));
                    Kirjaa($"== {Koot[kokoNro].Nimi} ({Koot[kokoNro].Arvo})");
                    EditorApplication.EnterPlaymode();
                    Siirry(Vaihe.OdotaPelia);
                    break;
                case Vaihe.OdotaPelia:
                    // Pelin oma käynnistys (UiNakymat ym.) ehtii ensimmäisiin ruutuihin; odotetaan, että UiKerros on olemassa.
                    if (EditorApplication.isPlaying && UiKerros.Olemassa && kehyksia > 30)
                    {
                        // Linnan osa alkaa suoraan isoista näkymistä (vain LinnanNakymat), sitten linnan HUD.
                        nakymaNro = 0;
                        Siirry(Osa == "linna" ? Vaihe.Nakyma : Vaihe.Kysy);
                    }
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
                    {
                        // Pinnattu chat nousee yläreunaan (omistaja 6.10.2026); iPhone vaaka (matala, chat sivulla) ennallaan.
                        var cp = UiNakymat.Hae().Chat.TestiPaneeli;
                        if (cp?.panel != null && Koot[kokoNro].Nimi != "iphone-vaaka")
                        {
                            float ph = cp.panel.visualTree.layout.height;
                            if (cp.worldBound.yMin > ph / 3f) Virhe($"chat pinnattu: yläreuna y {cp.worldBound.yMin:0} ei ole ylimmässä kolmanneksessa ({ph / 3f:0})");
                            else Kirjaa($"OK chat pinnattu yläreunassa (y {cp.worldBound.yMin:0})");
                        }
                    }
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
                    if ((!valmis && Kulunut < 20) || kehyksia < 20 || Kulunut < 1.0) return;
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
                    nakymaNro = 0;
                    Siirry(Vaihe.Nakyma);
                    break;
                }
                case Vaihe.Nakyma:
                    // Isot näkymät yksi kerrallaan: ennen avausta näkyvät napit talteen, avauksen jälkeen uudet tarkistetaan.
                    while (nakymaNro < Nakymat.Length && !OsaanKuuluu(Nakymat[nakymaNro].Nimi)) nakymaNro++;
                    if (nakymaNro >= Nakymat.Length) { Siirry(Osa == "pallo" ? Vaihe.Lopeta : Vaihe.Linna); break; }
                    if (kehyksia < 10) return;
                    ennen = NakyvatOhjaimet();
                    try { Nakymat[nakymaNro].Avaa(); Siirry(Vaihe.OdotaNakyma); }
                    catch (Exception e) { Virhe($"{Nakymat[nakymaNro].Nimi}: avaus kaatui {e.GetType().Name}: {e.Message}"); nakymaNro++; Siirry(Vaihe.Nakyma); }
                    break;
                case Vaihe.OdotaNakyma:
                {
                    var n = Nakymat[nakymaNro];
                    if (kehyksia < 20 || Kulunut < n.OdotusS) return;
                    // Sisältö latautuu paketeista (kuormitettu kone, ajo #14): odotetaan uusia näkyviä elementtejä enintään 20 s.
                    if (Kulunut < 20 && !NakyvatOhjaimet().Any(e => !ennen.Contains(e))) return;
                    TarkistaUudet(n.Nimi);
                    try { n.Sulje(); } catch (Exception e) { Virhe($"{n.Nimi}: sulku kaatui {e.Message}"); }
                    nakymaNro++;
                    Siirry(Vaihe.Nakyma);
                    break;
                }
                case Vaihe.Linna:
                    // Linnan HUD ilman SeikkailuPelaajaa: tapit näkyviin ja toimintonappi poimi-tilaan (testikytkimet). Oppaan
                    // esitysrivi (Kysy-rivi, tauko) pois: linnassa ei ole kierrosta.
                    // Linnassa oppaan napit eivät näy (DioraamaTaulu näyttää LinnaValikon): opas piiloon, linnan valikko näkyviin.
                    OpasValikko.Hae().Komento("esitys auto");
                    OpasValikko.Hae().Komento("sulje");
                    OpasValikko.Hae().Nayta(false);
                    linna ??= new LinnaValikko(UiKerros.Hae(), LinssiUi.RadioKerros);
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

        static int nakymaNro;
        static HashSet<VisualElement> ennen = new HashSet<VisualElement>();

        /// <summary>Isot näkymät (PT 9.10.2026): avaus samoin kuin UiKomennot-testikomennoilla, sulku, odotus ennen tarkistusta.</summary>
        static readonly (string Nimi, Action Avaa, Action Sulje, double OdotusS)[] Nakymat =
        {
            ("kaupunkilehti", () => UiNakymat.Hae().Lehti.Nayta(LehtiLaji.Kaupunki, "firenze", null, 1), () => UiNakymat.Hae().Lehti.Sulje(), 3.0),
            ("nähtävyys", () => Kohdekartat.Hae("firenze", k =>
                {
                    var kohde = k?.Kohteet.Find(x => x.Selattava);
                    if (kohde != null) UiNakymat.Hae().Nahtavyydet.AvaaKohde(k, kohde);
                }), () => UiNakymat.Hae().Nahtavyydet.SuljeKokonaan(), 3.0),
            ("päävalikko", () => { UiNakymat.Hae().Valikko.Sulje(); UiNakymat.Hae().Linssit.Valitsin.Avaa(); }, () => UiNakymat.Hae().Linssit.Valitsin.Sulje(), 0.6),
            ("asetukset", () => UiNakymat.Hae().Aanentasot.Avaa(), () => UiNakymat.Hae().Aanentasot.Sulje(), 0.6),
            // Karttapelin loput isot näkymät (PT 10.10.2026), avaus kuten UiKomennot-testikomennot, sulku SuljeKaikki.
            ("matkalaukku", () => { var u = UiNakymat.Hae(); u.Valikko.Sulje(); u.Aanentasot.Sulje(); u.Matkalaukku.Testaa(new Func<LaukkuNaytto>(Matkalaukku.Esimerkki)); }, SuljeKaikki, 0.6),
            ("tietoja", () => UiNakymat.Hae().Tietoja.Avaa(), SuljeKaikki, 0.6),
            ("visakysymys", () => UiNakymat.Hae().Esimerkkikysymys(""), SuljeKaikki, 0.6),
            ("matkavalinta", () => UiNakymat.Hae().Esimerkkimatka(), SuljeKaikki, 0.6),
            ("loppukortti", () => UiNakymat.Hae().Huipennus.NaytaLoppu("Rahat loppuivat kaupungissa Marseille, matkan 12. päivänä. Laukussa 0 löytöä ja 0 unohdettua aarretta.", null, () => { }, () => { }), SuljeKaikki, 0.6),
            ("wiki", () => UiNakymat.Hae().Wiki.Avaa("Venetsia"), SuljeKaikki, 3.0),
            ("palaute", () => UiNakymat.Hae().Palaute.Avaa(), SuljeKaikki, 0.6),
            ("sähke", () => UiNakymat.Hae().Sahke.Testaa("liuska"), SuljeKaikki, 0.6),
            ("mylly", () => MyllyNakyma.Hae().Avaa(), SuljeKaikki, 0.6),
            ("tavli", () => TavliNakyma.Hae().Avaa(), SuljeKaikki, 0.6),
            // Olavinlinnan ☰-valikko auki (PT 10.10.2026): pää, huoneet, äänet ja lähteet.
            ("linnan valikko", () => LinnanValikko("valikko"), SuljeLinna, 0.6),
            ("linnan huoneet", () => LinnanValikko("huoneet"), SuljeLinna, 0.6),
            ("linnan äänet", () => LinnanValikko("aanet"), SuljeLinna, 0.6),
            ("linnan lähteet", () => LinnanValikko("lahteet"), SuljeLinna, 0.6),
            // Pallon vapaa lento: Mikä tämä on, vapaan lennon nappi ja tapit (testikytkimet kuten `ui opasvalikko mika|vapaalento`).
            // Linssien omat näkymät LinssiKomennot-esimerkeillä (PT 10.10.2026; ajattelijat ja ISS-ohjaamo tarvitsevat linssin
            // sovittimen eivätkä aukea tyhjässä kohtauksessa).
            ("keksinnöt", () => Linssi("keksinnot pysakki 0"), SuljeLinssi, 1.0),
            ("aikajanan valikko", () => Linssi("valikko keksinnot"), SuljeLinssi, 1.0),
            ("ihmisen matka", () => Linssi("matka jakso 0"), () => { Linssi("matka pois"); SuljeLinssi(); }, 1.0),
            ("ihmisen matkan valikko", () => Linssi("valikko matka"), () => { Linssi("matka pois"); SuljeLinssi(); }, 1.0),
            ("radio", () => Linssi("radio"), SuljeLinssi, 0.6),
            ("maan kyltti", () => Linssi("maa ITA"), SuljeLinssi, 0.6),
            ("linssin selite", () => Linssi("selite"), () => { Linssi("selite pois"); SuljeLinssi(); }, 0.6),
            // Linssin sovitinta vaativat näkymät editorin testikytkimillä (#if UNITY_EDITOR, PT 10.10.2026).
            ("ajattelijat", () => AjattelijatSovitin.TestiValinta(true), () => { AjattelijatSovitin.TestiValinta(false); SuljeKaikki(); }, 1.0),
            ("ISS-ohjaamo", () => UiNakymat.Hae().Linssit.Astronautti.Kyyti.TestiNayta(Matkakirja.Linssit.Iss.KyydinTila.Ikkuna),
                () => UiNakymat.Hae().Linssit.Astronautti.Kyyti.TestiNayta(Matkakirja.Linssit.Iss.KyydinTila.Kauko), 1.0),
            ("karttavalikko", () =>
                {
                    UiNakymat.Hae().Linssit.TestiKarttalinssi("topografia");
                    UiKerros.Hae().Juuri(LinssiUi.RadioKerros).schedule.Execute(() => Linssi("karttavalikko auki")).StartingIn(200);
                }, () => { UiNakymat.Hae().Linssit.TestiKarttalinssi(null); SuljeKaikki(); }, 1.0),
            ("vapaa lento", () => { var o = OpasValikko.Hae(); o.Komento("sulje"); o.Komento("mika"); o.Komento("vapaalento"); },
                () => { var o = OpasValikko.Hae(); o.Komento("mika pois"); o.Komento("vapaalento pois"); o.Komento("sulje"); }, 0.6),
            // Pulu (Natiivi-UI 10.10.2026): kuplapino suoraan PuluKuplat.Lisaa:lla (Sano piilottaa tekstit oletuksena), lyhyt ja
            // pitkä kupla pinoon ilman ääntä; matkakirjan merkintä kuten `ui matkakirja tanger` + `auki`; Pulun chat linssitilassa
            // pelin omalla polulla (oppaan Näytä teksti, ankkuri sirurivi tai ☰: `ui opasvalikko teksti`). Ruudun reunaan
            // keksitty ankkuri (ajo 10.10. 03.18) vei paneelin iPhonen vaakatilassa turva-alueen yli: ei pelin polku.
            ("Pulun kuplat", () =>
                {
                    var p = UiNakymat.Hae().Pulu;
                    p.Nayta(true);
                    p.Kuplat.Lisaa(PuluLyhyt, 20000f, aani: false);
                    p.Kuplat.Lisaa(PuluPitka, 20000f, aani: false);
                }, () => UiNakymat.Hae().Pulu.Kuplat.TyhjennaKaikki(), 0.8),
            ("matkakirja", () =>
                {
                    var u = UiNakymat.Hae();
                    u.Saapuminen.Testi("tanger", "", t => { Kirjaa("-- matkakirja: " + t); u.Matkakirja.Avaa(); });
                }, () => { UiNakymat.Hae().Matkakirja.Piilota(); SuljeKaikki(); }, 3.0),
            ("oppaan teksti", () => { var o = OpasValikko.Hae(); o.Komento("sulje"); o.Komento("teksti"); },
                () => { UiNakymat.Hae().Chat.Sulje(); OpasValikko.Hae().Komento("sulje"); SuljeKaikki(); }, 1.0),
            // Astronautin kuvanäkymä ja minipulun kortti (Natiivi-UI 10.10.2026) kuten `ui linssi kuva` / `ui linssi kuva pulu`:
            // avautuvat ilman linssin sovitinta, aineisto paketista (puuttuessa Kuvanakyma.Esimerkki).
            ("astronautin kuva", () => Linssi("kuva"), SuljeKuva, 3.0),
            ("minipulun kortti", () => Linssi("kuva pulu"), SuljeKuva, 3.0),
            // Kartan näkymät (Natiivi-UI 10.10.2026) kuten `ui kortti firenze` ja `ui pilleri linssit|aarteet`. Karttaselite
            // (MaakuntaKartta: aina maakuntalappu) ja oman kaupungin kortti (samat elementit kuin edellisellä kortilla) eivät
            // tuottaneet tyhjässä kohtauksessa uusia näkyviä elementtejä (ajo 10.10. 04.50, aikaraja): ei listalla.
            ("kaupunkikortti", () => Kaupunkikortti(), () => UiNakymat.Hae().Kaupunkikortti.Sulje(), 1.0),
            ("pillerin linssit", () => { UiNakymat.Hae().Valikko.Sulje(); UiNakymat.Hae().Linssit.Valitsin.TestaaNakyma("linssit", -1); },
                () => UiNakymat.Hae().Linssit.Valitsin.Sulje(), 0.8),
            ("pillerin aarteet", () => { UiNakymat.Hae().Valikko.Sulje(); UiNakymat.Hae().Linssit.Valitsin.TestaaNakyma("aarteet", -1); },
                () => UiNakymat.Hae().Linssit.Valitsin.Sulje(), 0.8),
            // Saapumisen näkymät (Natiivi-UI 10.10.2026) kuten `ui saapumiskortti`, `ui traileri firenze` ja `ui luento ateena`
            // (ääneton testikomento: fokusmerkintä ja luentakuvat).
            ("saapumiskortti", () => UiNakymat.Hae().Saapumiskortti.Nayta("ATEENA · PÄIVÄ 1/80", () => { }, () => { }),
                () => UiNakymat.Hae().Saapumiskortti.Peru(), 1.5),
            // Trailerin kuvat tulevat kaupungin lehdestä (UiSisalto.LataaLehti; Firenzen lehti on jo ladattu kaupunkilehdessä);
            // ilman kuvia traileri ei ala (ajo 05.43: Ateena).
            ("traileri", () =>
                {
                    UiSisalto.LataaLehti("firenze");
                    UiKerros.Hae().Juuri(UiKerros.Valikot).schedule.Execute(() => UiNakymat.Hae().Traileri.Nayta("firenze", null, () => { })).StartingIn(800);
                }, () => UiNakymat.Hae().Traileri.Ohita(), 2.5),
            ("luento", () => UiNakymat.Hae().Saapuminen.Alkoi("ateena", pakota: true),
                () => { var u = UiNakymat.Hae(); u.Saapuminen.Loppui("ateena"); u.Matkakirja.Piilota(); SuljeKaikki(); }, 3.0),
        };

        static void Kaupunkikortti() =>
            UiNakymat.Hae().Kaupunkikortti.Nayta("firenze", null, new KaupunkiToiminnot
            {
                LueLehti = () => { },
                Liiku = () => { },
                Sulje = () => { },
            });

        static void SuljeKuva()
        {
            var kuva = UiNakymat.Hae().Linssit.Astronautti.Kuva;
            kuva.SuljePulukortti();
            kuva.Sulje(false);
            SuljeLinssi();
        }

        const string PuluLyhyt = "Minä olen Livia. Kirjekyyhky, en mikään pulu.";
        const string PuluPitka = "Tangerin satamassa kauppiaat huusivat hintojaan kolmella kielellä, ja isoisäsi kirjoitti muistiin jokaisen, "
            + "jonka ymmärsi.\n\nKatso, mitä hän piirsi sivun reunaan: kasbahin portin, jonka kaaren alla seisoi vesikauppias kuparimaljoineen.";

        static void SuljeKaikki() => UiNakymat.Hae().SuljeKaikki();

        static void Linssi(string komento) => LinssiKomennot.Aja(UiNakymat.Hae(), komento);
        static void SuljeLinssi() { Linssi("pois"); UiNakymat.Hae().SuljeKaikki(); }

        static void LinnanValikko(string mita)
        {
            linna ??= new LinnaValikko(UiKerros.Hae(), LinssiUi.RadioKerros);
            OpasValikko.Hae().Nayta(false);
            bool naytetty = linna.Juuri.resolvedStyle.display != DisplayStyle.None && linna.Juuri.panel != null;
            linna.Nayta(true);
            // Valikko sijoittuu ☰:n alle sen worldBoundista: juuri näytetyllä ☰:llä ei ole vielä asettelua (laitteella pelaaja
            // näkee ☰:n ennen napautusta), joten avaus seuraavassa ruudussa.
            if (naytetty) linna.Komento(mita);
            else linna.Juuri.schedule.Execute(() => linna.Komento(mita)).StartingIn(200);
        }

        static void SuljeLinna() { linna?.Komento("sulje"); linna?.Nayta(false); }

        /// <summary>Näkymän paneeli, jonka sisällä kaikkien sen nappien pitää olla (myös ruudun ulkopuolelle valuneiden).</summary>
        static VisualElement NakymanPaneeli(string nimi) => nimi == "asetukset" ? UiNakymat.Hae().Aanentasot.TestiPaneeli : null;

        /// <summary>Kaikkien kerrosten näkyvät napit ja tekstit (ketju display ≠ None, visibility, peitto > 0,01, mitoittunut).</summary>
        static HashSet<VisualElement> NakyvatOhjaimet()
        {
            var tulos = new HashSet<VisualElement>();
            foreach (var (_, juuri) in UiKerros.Hae().Juuret)
                juuri.Query<VisualElement>().ForEach(e =>
                {
                    if (!(e is Button) && !(e is TextElement t && !string.IsNullOrWhiteSpace(t.text))) return;
                    if (e is TextElement && e.parent is Button) return;   // napin teksti tarkistetaan nappina
                    if (Nakyva(e)) tulos.Add(e);
                });
            return tulos;
        }

        static readonly System.Reflection.MethodInfo ShouldClip =
            typeof(VisualElement).GetMethod("ShouldClip", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);

        /// <summary>Elementin näkyvä osa: worldBound rajattuna esivanhempiin, jotka leikkaavat (USS overflow: hidden, esim.
        /// matkamittarin numerorulla; ajo #20). UITK:n ShouldClip on sisäinen, joten heijastuksella; ilman sitä rajaamaton.</summary>
        static Rect NakyvaOsa(VisualElement e)
        {
            var b = e.worldBound;
            if (ShouldClip == null) return b;
            for (var p = e.parent; p != null; p = p.parent)
                if (p.parent != null && (bool)ShouldClip.Invoke(p, null))
                {
                    var r = p.worldBound;
                    b = Rect.MinMaxRect(Mathf.Max(b.xMin, r.xMin), Mathf.Max(b.yMin, r.yMin), Mathf.Min(b.xMax, r.xMax), Mathf.Min(b.yMax, r.yMax));
                    if (b.width <= 0f || b.height <= 0f) return Rect.zero;
                }
            return b;
        }

        static bool Nakyva(VisualElement e)
        {
            var b = NakyvaOsa(e);
            if (!(b.width >= 1f && b.height >= 1f)) return false;
            // Kokonaan ruudun ulkopuolella (esim. pudotusvalikon piilotetut napit oikean reunan takana) = ei näkyvissä.
            var koko = e.panel.visualTree.layout;
            if (b.xMin >= koko.width || b.xMax <= 0f || b.yMin >= koko.height || b.yMax <= 0f) return false;
            for (var p = e; p != null; p = p.parent)
                if (p.resolvedStyle.display == DisplayStyle.None || p.resolvedStyle.visibility == Visibility.Hidden || p.resolvedStyle.opacity < 0.01f)
                    return false;
            return true;
        }

        /// <summary>Avauksen jälkeen uudet näkyvät napit ja tekstit: kokonaan turva-alueella (vierityslistan sisältö: vain napit
        /// ja vain vieritysikkunan sisällä olevat). Enintään 6 vikariviä näkymää kohden.</summary>
        static void TarkistaUudet(string nimi)
        {
            var uudet = NakyvatOhjaimet().Where(e => !ennen.Contains(e)).ToList();
            if (uudet.Count == 0) { Virhe($"{nimi}: ei avautunut (ei uusia näkyviä elementtejä)"); return; }
            int viat = 0, ok = 0, ylivuodot = 0;
            foreach (var e in uudet)
            {
                var sv = e.GetFirstAncestorOfType<ScrollView>();
                var b = NakyvaOsa(e);
                if (sv != null)
                {
                    // Vierityslistassa vain näkyvä osa (vieritysikkuna rajaa pystysuunnassa); sivusuunta tarkistetaan kokonaan.
                    var ikkuna = sv.contentViewport.worldBound;
                    if (b.yMax < ikkuna.yMin || b.yMin > ikkuna.yMax) continue;   // vierityksen takana: ei tarkisteta
                    b = Rect.MinMaxRect(b.xMin, Mathf.Max(b.yMin, ikkuna.yMin), b.xMax, Mathf.Min(b.yMax, ikkuna.yMax));
                }
                if (e is TextElement te) Ylivuoto(te, nimi, ref ylivuodot);
                if (e is Button) e.Query<TextElement>().ForEach(t => { if (t != e && Nakyva(t)) Ylivuoto(t, nimi, ref ylivuodot); });
                var koko = e.panel.visualTree.layout;
                var turva = RuudunTurva(koko);
                const float Vara = 0.5f;
                if (b.xMin >= turva.xMin - Vara && b.xMax <= turva.xMax + Vara && b.yMin >= turva.yMin - Vara && b.yMax <= turva.yMax + Vara) { ok++; continue; }
                // iPhone pystyssä oppaan ☀ ja ☰ Islandin vierellä tarkoituksella (TarkistaNapit, EiIslandilla).
                if (Koot[kokoNro].Nimi == "iphone-pysty" && OpasValikko.Hae().TestiAvainnapit().Any(n => n.E == e && (n.Nimi == "☰" || n.Nimi == "☀/☾"))) { ok++; continue; }
                if (++viat <= 6)
                    Virhe($"{nimi}: {(e is Button ? "nappi" : "teksti")} \"{Lyhyt(e)}\" {Laatikko(b)} ei ole kokonaan turva-alueella {Laatikko(turva)}");
            }
            if (viat > 6) Kirjaa($"-- {nimi}: {viat - 6} muuta vikaa");
            if (ylivuodot > 6) Kirjaa($"YLIVUOTO {Koot[kokoNro].Nimi}: {nimi}: {ylivuodot - 6} muuta");
            // Paneelin napit paneelin sisällä (9.10.2026 ajo #12: Äänentasojen väkänen valui paneelin ja ruudun ulkopuolelle).
            var paneeli = NakymanPaneeli(nimi);
            if (paneeli?.panel != null && Nakyvissa(paneeli))
            {
                var pb = paneeli.worldBound;
                paneeli.Query<Button>().ForEach(nb =>
                {
                    if (!Nakyvissa(nb) || nb.resolvedStyle.visibility == Visibility.Hidden || !(nb.worldBound.width >= 1f)) return;
                    var bb = nb.worldBound;
                    if (bb.xMin < pb.xMin - 0.5f || bb.xMax > pb.xMax + 0.5f)
                        Virhe($"{nimi}: nappi \"{Lyhyt(nb)}\" {Laatikko(bb)} on paneelin {Laatikko(pb)} ulkopuolella");
                });
            }
            Kirjaa($"{(viat == 0 ? "OK" : "--")} {nimi}: {ok} elementtiä turva-alueella, {uudet.Count} uutta");
        }

        /// <summary>
        /// YLIVUOTO (raportti, ei vika; Päätoimittaja 10.10.2026): teksti ei mahdu laatikkoonsa. Rivittämätön teksti: luonnollinen
        /// leveys > sisältöleveys (katkeaa tai valuu yli); rivittyvä: korkeus sisältöleveydellä > sisältökorkeus (kiinteä korkeus
        /// leikkaa rivejä). text-overflow: ellipsis kirjataan erikseen (…-katkaisu on tarkoituksellinen, mutta teksti silti vajaa).
        /// Enintään 6 riviä näkymää kohden.
        /// </summary>
        static void Ylivuoto(TextElement t, string nimi, ref int n)
        {
            if (string.IsNullOrWhiteSpace(t.text)) return;
            var cr = t.contentRect;
            if (!(cr.width >= 1f) || !(cr.height >= 1f)) return;
            bool rivittyy = t.resolvedStyle.whiteSpace == WhiteSpace.Normal || t.resolvedStyle.whiteSpace == WhiteSpace.PreWrap;
            string mita;
            if (!rivittyy)
            {
                var m = t.MeasureTextSize(t.text, 0f, VisualElement.MeasureMode.Undefined, 0f, VisualElement.MeasureMode.Undefined);
                if (m.x <= cr.width + 1f) return;
                mita = $"leveys {m.x:0} > {cr.width:0}";
            }
            else
            {
                // Yhdelle riville mahtuva ohi: tasan sisältöleveydellä mitattu yksirivinen rivittyi kahdeksi (ajo 06.05: korkeus 2×).
                var yksi = t.MeasureTextSize(t.text, 0f, VisualElement.MeasureMode.Undefined, 0f, VisualElement.MeasureMode.Undefined);
                if (yksi.x <= cr.width + 1f) return;
                var m = t.MeasureTextSize(t.text, cr.width + 0.5f, VisualElement.MeasureMode.Exactly, 0f, VisualElement.MeasureMode.Undefined);
                if (m.y <= cr.height + 1f) return;
                mita = $"korkeus {m.y:0} > {cr.height:0}";
            }
            if (++n > 6) return;
            bool kolme = t.resolvedStyle.textOverflow == TextOverflow.Ellipsis;
            Kirjaa($"YLIVUOTO {Koot[kokoNro].Nimi}: {nimi}: \"{Lyhyt(t)}\" {mita}{(kolme ? " (…-katkaisu)" : "")} [{string.Join(" ", t.GetClasses().Take(2))}]");
        }

        static string Lyhyt(VisualElement e)
        {
            string t = e is TextElement te ? te.text : e.Q<TextElement>()?.text ?? e.tooltip ?? e.GetClasses().FirstOrDefault() ?? "-";
            t = (t ?? "-").Replace("\n", " ");
            return t.Length > 30 ? t.Substring(0, 30) + "…" : t;
        }

        /// <summary>Laitteen turva-alue paneelin pisteinä (UiRuutu: pikselit, origo vasen alakulma).</summary>
        static Rect RuudunTurva(Rect koko)
        {
            float s = UiRuutu.Korkeus > 0 ? koko.height / UiRuutu.Korkeus : 1f;
            var t = UiRuutu.Turva;
            return Rect.MinMaxRect(t.xMin * s, (UiRuutu.Korkeus - t.yMax) * s, t.xMax * s, (UiRuutu.Korkeus - t.yMin) * s);
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
            Kirjaa(virheita == 0 ? $"ASETTELUTESTI LÄPI ({OsaNimi})" : $"ASETTELUTESTI {virheita} VIKAA ({OsaNimi})");
            Directory.CreateDirectory("tulokset");
            File.WriteAllLines("tulokset/asettelutesti.txt", rivit);
            EditorApplication.Exit(virheita == 0 ? 0 : 1);
        }
    }
}
