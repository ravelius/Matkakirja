// MITÄ UUTTA JA PELI PÄIVITTYI (Natiivi-UI): webin #muutokset-dialog ja #paivitys-dialog
// (index.html, js/main.js avaaMuutokset / paivitysTapahtui).
//
// Versiorivi (päävalikon alareuna) avaa "Mitä uutta": lista "v<versio>  teksti", alla "Kehittäjä"
// (webin #kehittaja-btn → koodi-ikkuna; webin "Päivitä" ei kuulu natiiviin, App Store päivittää)
// ja "Sulje". Napautus kortin ohi sulkee.
// Kun sovellus käynnistyy uudella versiolla ja laitteella oli aiempi versio, näkyy kerran
// "Peli päivittyi" kahden uusimman rivin kera ja "Jatka".
//
// Sisältö (Fable 24.9.2026): natiivin OMA muutosloki, ei webin versioita — sisältöpaketin
// kokoelma muutosloki-natiivi (rivit: versio/build, päivä, 1–3 lausetta suomeksi), jonka
// Julkaisija täyttää joka TestFlight-buildissa. Kunnes kokoelma on paketissa, lista on
// nykyisen buildin rivi "Ensimmäinen natiiviversio."
// VANHA TIETO ESTETTY (omistajan löydös 27.9.2026 klo 12.0x: päivityksen jälkeen näkyi build 11:n rivi): asennetun
// buildin rivi tunnistetaan versio + build -merkkijonosta (VersioJaBuild, sama muoto kuin muutoslokin "1.0.29 (29)").
// Jos lokissa ei ole asennetun buildin riviä, kärkeen tulee sen oma rivi ("tiedot päivittyvät"), eikä "Peli päivittyi"
// näytä vanhempien buildien rivejä uutena: vain asennettua edeltävää versiota uudemmat rivit.
// Sisältöpaketin päivitys (Siirtoseppä, skeema 1.22) on osoittimessa (sisalto/1/uusin.json:
// muutos {paiva, teksti}, esim. "Sisältö päivittyi: 3 uutta kaupunkilehteä") ja näytetään listan kärjessä.
// LAPPU NÄYTTÄÄ OIKEAT MUUTOKSET (omistaja 28.9.2026, TF 1.0.34: "Peli päivittyi" -lapussa oli vain "Sisältöä
// päivitettiin." ja "muutokset päivittyvät tähän pian"): muutosloki luetaan laitteen sisältöpaketista, joka voi olla
// päivitystä vanhempi (1.0.34:n rivi tuli pakettiin vasta v257:ssä). Jos asennetun buildin rivi puuttuu, loki haetaan
// osoittimen nykyisestä paketista verkosta. Pelkkä yleinen "Sisältöä päivitettiin." ei kerro mitään, joten sitä ei
// näytetä; versio näkyy ilman build-aikaleimaa ("v1.0.34").
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class MitaUutta
    {
        public struct Rivi { public string Versio, Paiva, Teksti, Otsake; }

        const string VersioAvain = "matkakirja-natiivi-versio";
        /// <summary>Osoittimen muutosrivi, joka ei kerro sisällöstä mitään (vientityökalun oletus).</summary>
        const string YleinenSisaltomuutos = "Sisältöä päivitettiin.";
        static List<Rivi> loki;
        /// <summary>Testi (`ui mitauutta paivittyi <versio (build)> [vanha]`): asennettu versio ja vanhan paketin jäljittely.</summary>
        static string testiVersio;
        static bool testiVanhaPaketti;

        readonly VisualElement himmennys, lista, paivitys, paivitysLista;
        readonly Action avaaKehittaja;
        public bool Auki { get; private set; }

        public MitaUutta(UiKerros kerros, Action avaaKehittaja)
        {
            this.avaaKehittaja = avaaKehittaja;
            (himmennys, lista) = Dialogi(kerros.Juuri(UiKerros.Valikot), "Mitä uutta", out var napit);
            var kehittaja = Rakenne.Nappi("Kehittäjä", "mk-nappi--toiminto", () => { Sulje(); this.avaaKehittaja?.Invoke(); }, napit);
            kehittaja.tooltip = "Kehittäjätila";
            if (avaaKehittaja == null) kehittaja.style.display = DisplayStyle.None;
            Nappi(napit, "Sulje", Sulje);

            // Päivitysilmoitus kaiken päälle (myös aloitusnäkymän, joka on Traileri-kerroksessa).
            // Esc sulkee (UI-pohjat: yksi sulkupino; savuke 1102). Päivitysilmoitus on päällimmäisenä, joten korkeampi prioriteetti.
            Nappaimisto.Rekisteroi("mitauutta", 55, () => Auki, null, null, Sulje);
            Nappaimisto.Rekisteroi("paivittyi", 56, () => paivitys != null && paivitys.style.display == DisplayStyle.Flex, null, null, SuljePaivitys);
            (paivitys, paivitysLista) = Dialogi(kerros.Juuri(UiKerros.Traileri), "Peli päivittyi", out var pnapit);
            Nappi(pnapit, "Jatka", SuljePaivitys);
        }

        readonly List<Label> versiot = new List<Label>();
        void PaivitaVersio() { string v = AsennettuVersio(); foreach (var l in versiot) l.text = v; }

        (VisualElement Himmennys, VisualElement Lista) Dialogi(VisualElement isa, string otsikko, out VisualElement napit)
        {
            var h = Rakenne.El("mk-himmennys mk-himmennys--tumma", isa);
            h.style.display = DisplayStyle.None;
            var kortti = new Kortti("mk-tietoja mk-muutokset", pohja: true); // KORTTI-pohja (web #3799)
            h.Add(kortti);
            // Asennettu versio TestFlightin muodossa "1.1 (144)" KORTIN kapiteelina otsikon yllä (omistaja 5.10.2026 klo 14.2x:
            // "siinä saisi näkyä build numero suluissa, koska muuten vaikea erottaa mistä versiosta kyse"); build CFBundleVersionista.
            var versio = Rakenne.Teksti("", "mk-kortti__kapiteeli mk-muutokset__asennettu", kortti.Sisus);
            Kirjasimet.Aseta(versio, Tyylikirja.Kirjain.Kapiteeli);
            versiot.Add(versio);   // teksti näyttöhetkellä (PaivitaVersio): BuildNumero kytketään vasta kohtauksen latauduttua
            Kirjasimet.Aseta(Rakenne.Teksti(otsikko, "mk-kortti__otsikko", kortti.Sisus), Tyylikirja.Kirjain.Otsikko);
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-tietoja__vieritys");
            // Pitkä loki (Mitä uutta): vain lista joustaa, kapiteeli, otsikko ja napit pysyvät kortin sisällä (iPhone 5.10.: napit
            // valuivat kortin alareunan yli).
            vieritys.style.minHeight = 0;
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Sisus.Add(vieritys);
            var l = Rakenne.El("mk-muutokset__lista", vieritys, PickingMode.Ignore);
            napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            napit.style.flexShrink = 0;
            versio.style.flexShrink = 0;
            Kirjasimet.Aseta(napit, Kirjasin.Kone);
            h.RegisterCallback<PointerDownEvent>(e =>
            {
                if (e.target != h) return;
                if (h == himmennys) Sulje(); else SuljePaivitys();
            });
            return (h, l);
        }

        static void Nappi(VisualElement napit, string teksti, Action painettu)
        {
            var n = Rakenne.Nappi(teksti, "mk-nappi--toiminto", painettu, napit);
            Kirjasimet.Aseta(n, Kirjasin.KoneLihava);
        }

        /// <summary>Pelaajalle näkyvä versio ilman build-aikaleimaa: "1.0.34 (202609272058)" → "1.0.34".</summary>
        static string Nakyva(string versio)
        {
            int i = versio?.IndexOf(" (", StringComparison.Ordinal) ?? -1;
            return i > 0 ? versio.Substring(0, i) : versio;
        }

        static void Tayta(VisualElement lista, IEnumerable<Rivi> rivit, int enintaan = int.MaxValue)
        {
            lista.Clear();
            int i = 0;
            foreach (var r in rivit)
            {
                if (i++ >= enintaan) break;
                var rivi = Rakenne.El("mk-muutos", lista, PickingMode.Ignore);
                // Versio kapiteelina, rivin jatko alkaa tekstin kohdalta (web #3799).
                var v = Rakenne.Teksti(r.Otsake ?? "v" + Nakyva(r.Versio), "mk-muutos__versio", rivi);
                Kirjasimet.Aseta(v, Tyylikirja.Kirjain.Kapiteeli);
                var t = Rakenne.Teksti(string.IsNullOrEmpty(r.Paiva) ? r.Teksti : r.Teksti + " (" + r.Paiva + ")", "mk-muutos__teksti", rivi);
                Kirjasimet.Aseta(t, Kirjasin.Luku);
            }
        }

        public void Avaa()
        {
            if (Auki) return;
            Auki = true;
            PaivitaVersio();
            Lataa(() => Tayta(lista, loki));
            Rakenne.Nayta(himmennys, true, 320);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(himmennys, false, 250);
            SyoteLukko.Vapauta(this);
        }

        /// <summary>
        /// Käynnistyksessä (UiNakymat): versio talteen; jos laitteella oli aiempi eri versio,
        /// "Peli päivittyi" kahden uusimman rivin kera (web paivitysTapahtui &amp;&amp; edellinenVersio).
        /// </summary>
        /// <summary>
        /// CFBundleVersion (build-numero), jos iOS-liitännäinen kertoo sen; muuten null. Ilman sitä
        /// "Peli päivittyi" tunnistaa uuden buildin Unityn build-tunnisteesta (Application.buildGUID
        /// vaihtuu joka viennissä; Rakennus.IosTestFlight vie jokaisen TestFlight-buildin erikseen).
        /// </summary>
        public static Func<string> BuildNumero;

        /// <summary>CFBundleVersion tai null (valikon alarivi kehittäjätilassa, omistaja 2.10.).</summary>
        public static string Build()
        {
            try { var b = BuildNumero?.Invoke(); return string.IsNullOrEmpty(b) ? null : b; }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui build-numero: " + e.Message); return null; }
        }

        /// <summary>Asennettu versio pelaajalle TestFlightin muodossa: "Versio 1.1 (144)"; ilman build-numeroa pelkkä versio.</summary>
        public static string AsennettuVersio()
        {
            string b = Build();
            return "Versio " + Application.version + (b != null ? " (" + b + ")" : "");
        }

        /// <summary>Versio + build (Fable 24.9.: myös pelkkä build-numeron vaihto 1.0.0 (2) → (3) on päivitys).</summary>
        static string VersioJaBuild()
        {
            string build = null;
            try { build = BuildNumero?.Invoke(); } catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui build-numero: " + e.Message); }
            if (testiVersio != null) return testiVersio;
            return Application.version + " (" + (string.IsNullOrEmpty(build) ? Application.buildGUID : build) + ")";
        }

        /// <summary>Testikomento: asennetuksi versioksi <paramref name="versio"/>; vanha = paikallinen loki ohitetaan.</summary>
        public void TestaaPaivitys(string versio, bool vanha)
        {
            testiVersio = string.IsNullOrEmpty(versio) ? null : versio;
            testiVanhaPaketti = vanha;
            loki = null;
            TarkistaPaivitys(true);
        }

        public void TarkistaPaivitys(bool pakota = false)
        {
            string edellinen = PlayerPrefs.GetString(VersioAvain, null);
            string nyt = VersioJaBuild();
            if (edellinen != nyt) { PlayerPrefs.SetString(VersioAvain, nyt); PlayerPrefs.Save(); }
            if (!pakota && (string.IsNullOrEmpty(edellinen) || edellinen == nyt)) return;
            Lataa(() =>
            {
                Tayta(paivitysLista, Uudet(loki, edellinen == nyt ? null : edellinen), 2); // pakotettu testi: kärki
                PaivitaVersio();
                paivitys.BringToFront();
                Rakenne.Nayta(paivitys, true, 320);
                SyoteLukko.Esta(paivitys);
            });
        }

        /// <summary>
        /// "Peli päivittyi" -rivit: sisältörivi ja buildirivit asennetusta (kärki, Lue takaa) edelliseen asennettuun asti;
        /// edellisen buildin rivi ja sitä vanhemmat eivät ole uutta.
        /// </summary>
        static List<Rivi> Uudet(List<Rivi> rivit, string edellinen)
        {
            var uudet = new List<Rivi>();
            foreach (var r in rivit)
            {
                if (r.Otsake == null && r.Versio == edellinen) break;
                uudet.Add(r);
            }
            return uudet;
        }

        void SuljePaivitys()
        {
            Rakenne.Nayta(paivitys, false, 250);
            SyoteLukko.Vapauta(paivitys);
        }

        // --- loki ------------------------------------------------------------------------------

        static void Lataa(Action valmis)
        {
            if (loki != null) { valmis(); return; }
            UiKerros.Hae().StartCoroutine(Lue(valmis));
        }

        static readonly IReadOnlyList<(string Uusi, string Vanha)> Kentat = Paataso.Samat("versio", "build", "paiva", "teksti");

        static List<Rivi> Jasenna(string teksti)
        {
            var rivit = new List<Rivi>();
            try
            {
                var alkiot = Rakenne.Lista(MiniJson.Kentta(Rakenne.Olio(MiniJson.Jasenna(teksti ?? "{}")), "alkiot"));
                foreach (var a in alkiot ?? new List<object>())
                {
                    var o = a as Dictionary<string, object>;
                    // Päätaso ensin (versio, build, paiva, teksti), raaka data vain Paatason kautta.
                    var d = Paataso.Nakyma(o, Kentat);
                    string v = MiniJson.Teksti(d, "versio") ?? MiniJson.Teksti(d, "build") ?? MiniJson.Teksti(o, "id");
                    string t = MiniJson.Teksti(d, "teksti");
                    if (v == null || string.IsNullOrEmpty(t)) continue;
                    rivit.Add(new Rivi { Versio = v, Paiva = MiniJson.Teksti(d, "paiva"), Teksti = t });
                }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui muutosloki: " + e.Message); }
            return rivit;
        }

        static IEnumerator HaeVerkosta(string osoite, Action<string> valmis)
        {
            using (var r = UnityEngine.Networking.UnityWebRequest.Get(osoite))
            {
                r.timeout = 8;
                yield return r.SendWebRequest();
                valmis(r.result == UnityEngine.Networking.UnityWebRequest.Result.Success ? r.downloadHandler.text : null);
            }
        }

        static IEnumerator Lue(Action valmis)
        {
            string teksti = null;
            if (!testiVanhaPaketti) yield return Sisalto.HaeTeksti("muutosloki-natiivi", t => teksti = t, valinnainen: true);
            var rivit = Jasenna(teksti);
            string nyt = VersioJaBuild();

            // Osoitin: sisältöpäivityksen rivi ja nykyisen paketin polku.
            Dictionary<string, object> osoitin = null;
            string osoitinTeksti = null;
            yield return HaeVerkosta(Sisalto.Osoitin, t => osoitinTeksti = t);
            try { if (osoitinTeksti != null) osoitin = Rakenne.Olio(MiniJson.Jasenna(osoitinTeksti)); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui muutosloki: osoitin: " + e.Message); }

            // Laitteen paketti voi olla päivitystä vanhempi: asennetun buildin rivi nykyisestä paketista verkosta.
            string polku = MiniJson.Teksti(osoitin, "polku");
            if (!rivit.Exists(x => x.Versio == nyt) && !string.IsNullOrEmpty(polku))
            {
                string verkosta = null;
                yield return HaeVerkosta(Sisalto.Juuri + polku + "kokoelmat/muutosloki-natiivi.json", t => verkosta = t);
                var uudet = Jasenna(verkosta);
                if (uudet.Exists(x => x.Versio == nyt) || uudet.Count > rivit.Count) rivit = uudet;
            }

            // Asennetun buildin rivi aina kärkeen: vanhan buildin teksti ei saa näkyä tämän buildin tietona.
            if (rivit.Count == 0 || rivit[0].Versio != nyt)
            {
                if (rivit.Count > 0)
                    Debug.LogWarning($"MATKAKIRJA ui muutosloki: asennetun buildin {nyt} rivi puuttuu (uusin {rivit[0].Versio}); Julkaisija: tools/vienti/muutosloki-natiivi.mjs");
                int oma = rivit.FindIndex(x => x.Versio == nyt);
                if (oma > 0) { var r = rivit[oma]; rivit.RemoveAt(oma); rivit.Insert(0, r); }
                else if (oma < 0)
                    rivit.Insert(0, new Rivi
                    {
                        Versio = nyt,
                        Teksti = rivit.Count == 0 ? "Ensimmäinen natiiviversio." : "Uusi versio asennettu. Tämän version muutokset päivittyvät tähän pian.",
                    });
            }

            // Sisältöpäivityksen rivi osoittimesta listan kärkeen (versionumero syntyy vasta paketin tiivisteestä);
            // yleinen "Sisältöä päivitettiin." ei kerro mitään, joten se jää pois.
            var m = MiniJson.Kentta(osoitin, "muutos") as Dictionary<string, object>;
            string mt = MiniJson.Teksti(m, "teksti");
            if (!string.IsNullOrEmpty(mt) && mt.Trim() != YleinenSisaltomuutos)
            {
                var nro = MiniJson.Luku(osoitin, "versio");
                rivit.Insert(0, new Rivi
                {
                    Otsake = nro.HasValue ? "sisältö " + (int)nro.Value : "sisältö",
                    Paiva = MiniJson.Teksti(m, "paiva"), Teksti = mt,
                });
            }
            loki = rivit;
            valmis();
        }
    }
}
