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
        public struct Rivi { public string Versio, Paiva, Teksti; }

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
                var v = Rakenne.Teksti("v" + r.Versio, "mk-muutos__versio", rivi);
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
        public void TarkistaPaivitys(bool pakota = false)
        {
            string edellinen = PlayerPrefs.GetString(VersioAvain, null);
            string nyt = Application.version;
            if (edellinen != nyt) { PlayerPrefs.SetString(VersioAvain, nyt); PlayerPrefs.Save(); }
            if (!pakota && (string.IsNullOrEmpty(edellinen) || edellinen == nyt)) return;
            Lataa(() =>
            {
                Tayta(paivitysLista, loki, 2);
                paivitys.BringToFront();
                Rakenne.Nayta(paivitys, true, 320);
                SyoteLukko.Esta(paivitys);
            });
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

        static IEnumerator Lue(Action valmis)
        {
            string teksti = null;
            yield return Sisalto.HaeTeksti("muutosloki-natiivi", t => teksti = t, valinnainen: true);
            var rivit = new List<Rivi>();
            try
            {
                var alkiot = Rakenne.Lista(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(teksti ?? "{}")), "alkiot"));
                foreach (var a in alkiot ?? new List<object>())
                {
                    var o = a as Dictionary<string, object>;
                    var d = MiniJson.Kentta(o, "data") as Dictionary<string, object> ?? o;
                    string v = MiniJson.Teksti(d, "versio") ?? MiniJson.Teksti(d, "build") ?? MiniJson.Teksti(o, "id");
                    string t = MiniJson.Teksti(d, "teksti");
                    if (v == null || string.IsNullOrEmpty(t)) continue;
                    rivit.Add(new Rivi { Versio = v, Paiva = MiniJson.Teksti(d, "paiva"), Teksti = t });
                }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui muutosloki: " + e.Message); }
            if (rivit.Count == 0) rivit.Add(new Rivi { Versio = Application.version, Teksti = "Ensimmäinen natiiviversio." });
            loki = rivit;
            valmis();
        }
    }
}
