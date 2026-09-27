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
        static List<Rivi> loki;

        readonly VisualElement himmennys, lista, paivitys, paivitysLista;
        readonly Action avaaKehittaja;
        public bool Auki { get; private set; }

        public MitaUutta(UiKerros kerros, Action avaaKehittaja)
        {
            this.avaaKehittaja = avaaKehittaja;
            (himmennys, lista) = Dialogi(kerros.Juuri(UiKerros.Valikot), "Mitä uutta", out var napit);
            var kehittaja = Rakenne.Nappi("Kehittäjä", "mk-nappi--haamu", () => { Sulje(); this.avaaKehittaja?.Invoke(); }, napit);
            kehittaja.tooltip = "Kehittäjätila";
            if (avaaKehittaja == null) kehittaja.style.display = DisplayStyle.None;
            Nappi(napit, "Sulje", Sulje);

            // Päivitysilmoitus kaiken päälle (myös aloitusnäkymän, joka on Traileri-kerroksessa).
            (paivitys, paivitysLista) = Dialogi(kerros.Juuri(UiKerros.Traileri), "Peli päivittyi", out var pnapit);
            Nappi(pnapit, "Jatka", SuljePaivitys);
        }

        (VisualElement Himmennys, VisualElement Lista) Dialogi(VisualElement isa, string otsikko, out VisualElement napit)
        {
            var h = Rakenne.El("mk-himmennys mk-himmennys--tumma", isa);
            h.style.display = DisplayStyle.None;
            var kortti = new Kortti("mk-tietoja mk-muutokset");
            h.Add(kortti);
            Kirjasimet.Aseta(Rakenne.Teksti(otsikko, "mk-kortti__otsikko", kortti.Sisus), Kirjasin.LukuLihava);
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-tietoja__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Sisus.Add(vieritys);
            var l = Rakenne.El("mk-muutokset__lista", vieritys, PickingMode.Ignore);
            napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
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
            var n = Rakenne.Nappi(teksti, "mk-nappi--kulta", painettu, napit);
            Rakenne.Tausta(n, Kuviot.Kulta);
            Kirjasimet.Aseta(n, Kirjasin.KoneLihava);
        }

        static void Tayta(VisualElement lista, IEnumerable<Rivi> rivit, int enintaan = int.MaxValue)
        {
            lista.Clear();
            int i = 0;
            foreach (var r in rivit)
            {
                if (i++ >= enintaan) break;
                var rivi = Rakenne.El("mk-muutos", lista, PickingMode.Ignore);
                var v = Rakenne.Teksti(r.Otsake ?? "v" + r.Versio, "mk-muutos__versio", rivi);
                Kirjasimet.Aseta(v, Kirjasin.KoneLihava);
                var t = Rakenne.Teksti(string.IsNullOrEmpty(r.Paiva) ? r.Teksti : r.Teksti + " (" + r.Paiva + ")", "mk-muutos__teksti", rivi);
                Kirjasimet.Aseta(t, Kirjasin.Luku);
            }
        }

        public void Avaa()
        {
            if (Auki) return;
            Auki = true;
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

        /// <summary>Versio + build (Fable 24.9.: myös pelkkä build-numeron vaihto 1.0.0 (2) → (3) on päivitys).</summary>
        static string VersioJaBuild()
        {
            string build = null;
            try { build = BuildNumero?.Invoke(); } catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui build-numero: " + e.Message); }
            return Application.version + " (" + (string.IsNullOrEmpty(build) ? Application.buildGUID : build) + ")";
        }

        public void TarkistaPaivitys(bool pakota = false)
        {
            string edellinen = PlayerPrefs.GetString(VersioAvain, null);
            string nyt = VersioJaBuild();
            if (edellinen != nyt) { PlayerPrefs.SetString(VersioAvain, nyt); PlayerPrefs.Save(); }
            if (!pakota && (string.IsNullOrEmpty(edellinen) || edellinen == nyt)) return;
            Lataa(() =>
            {
                Tayta(paivitysLista, Uudet(loki, edellinen), 2);
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

        static IEnumerator Lue(Action valmis)
        {
            string teksti = null;
            yield return Sisalto.HaeTeksti("muutosloki-natiivi", t => teksti = t, valinnainen: true);
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
            // Asennetun buildin rivi aina kärkeen: vanhan buildin teksti ei saa näkyä tämän buildin tietona.
            string nyt = VersioJaBuild();
            if (rivit.Count == 0 || rivit[0].Versio != nyt)
            {
                if (rivit.Count > 0)
                    Debug.LogWarning($"MATKAKIRJA ui muutosloki: asennetun buildin {nyt} rivi puuttuu (uusin {rivit[0].Versio}); Julkaisija: tools/vienti/muutosloki-natiivi.mjs");
                rivit.RemoveAll(x => x.Versio == nyt);
                rivit.Insert(0, new Rivi
                {
                    Versio = nyt,
                    Teksti = rivit.Count == 0 ? "Ensimmäinen natiiviversio." : "Uusi versio asennettu. Tämän version muutokset päivittyvät tähän pian.",
                });
            }

            // Sisältöpäivityksen rivi osoittimesta listan kärkeen (versionumero syntyy vasta paketin tiivisteestä).
            using (var r = UnityEngine.Networking.UnityWebRequest.Get(Sisalto.Osoitin))
            {
                r.timeout = 8;
                yield return r.SendWebRequest();
                if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success)
                {
                    try
                    {
                        var o = Rakenne.Olio(MiniJson.Jasenna(r.downloadHandler.text));
                        var m = MiniJson.Kentta(o, "muutos") as Dictionary<string, object>;
                        string t = MiniJson.Teksti(m, "teksti");
                        if (!string.IsNullOrEmpty(t))
                        {
                            var nro = MiniJson.Luku(o, "versio");
                            rivit.Insert(0, new Rivi
                            {
                                Otsake = nro.HasValue ? "sisältö " + (int)nro.Value : "sisältö",
                                Paiva = MiniJson.Teksti(m, "paiva"), Teksti = t,
                            });
                        }
                    }
                    catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui muutosloki: osoitin: " + e.Message); }
                }
            }
            loki = rivit;
            valmis();
        }
    }
}
