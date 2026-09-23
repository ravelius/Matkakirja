// SÄHKENÄKYMÄ (Natiivi-UI, B5 23.9.2026): pöllön paperiliuska kartan päällä ja
// retkikuntaosio päävalikossa. Web js/sahke.js kohdat 12 (LIUSKA) ja 16 (RETKIKUNTA),
// tyylit css/sahke.css → Resources/MatkakirjaUI/Sahke.uss. Logiikka ja tila ovat
// Pelikoodarin Sahkepinnassa (Scripts/Peli/Sahke.cs); tämä vain piirtää ja kutsuu
// ISahkeNakyma-sopimuksen takaisinkutsuja (RAJAPINTA "Sähke, retkikunta …").
//
// LIUSKA (web .sahke-liuska): pergamenttilappu ruudun alaosan keskellä, heittonapin
// yläpuolella (natiivin heittonappi on siinä, missä webin liuska; kartuscha vasemmalla
// ja Livia oikealla alhaalla). Ylärivillä pöllö ja saate kursiivilla, alla
// lennättimen liuska (versaali konekirjoitus) ja alarivi (lähettäjä · aika). Apupyynnöllä
// kysymys, vaihtoehtonapit A–D ja "En osaa auttaa". Ei modaalinen: kerros 20
// (matkavalinta), kosketukset peittää UiNakymien yhteinen SyoteLukko.LisaaPeitto.
// Liuska väistyy (piiloon, ei sulkeudu), kun pelin tila ei ole Kartta tai kaupunkikortti
// on auki (web: lennon ja kamera-ajon ajan opacity 0).
//
// RETKIKUNTA (web retkikuntaOsio): Paavalikko.Retkikunta-paikkaan RETKIKUNTA-otsikon
// alle. Kolme tilaa: linja kiinni (yksi rivi), ei retkikuntaa (nimimerkki kolmesta
// arvotusta + Perusta, tai koodi + Liity), jäsen (koodi, vinkkisähkeen pohja → paikka,
// Eroa). Ei vapaata tekstiä: koodikenttä suodatetaan SiistiKoodilla joka näppäilyllä.
// Osio rakennetaan uudelleen vain, kun sen tila vaihtuu (pollauksen päivitys ei nollaa
// kesken olevaa valintaa).
//
// Säikeet: ohjaimen kutsut voivat tulla muualta kuin pääsäikeestä → UiKerros.PaaSaikeessa.
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class SahkeNakyma : ISahkeNakyma
    {
        readonly UiKerros kerros;
        readonly int paaSaie;

        // --- liuska ---
        readonly VisualElement alue, liuska, sisus;
        bool liuskaAuki, liuskaNakyy;
        Action liuskaSuljettu;

        // --- retkikunta ---
        readonly VisualElement osio, osioSisus;
        RetkikuntaToiminnot toiminnot = new RetkikuntaToiminnot();
        string osioAvain;
        int sukupolvi;

        public bool LiuskaAuki => liuskaAuki;

        /// <param name="kerros">UI-kerrokset (liuska kerrokseen 20).</param>
        /// <param name="valikko">Päävalikko, jonka Retkikunta-paikkaan osio rakennetaan (null = ei osiota).</param>
        public SahkeNakyma(UiKerros kerros, Paavalikko valikko)
        {
            this.kerros = kerros;
            paaSaie = Thread.CurrentThread.ManagedThreadId;

            var turva = kerros.Turva(UiKerros.Matkavalinta);
            alue = Rakenne.El("mk-sahke-alue", turva, PickingMode.Ignore);
            alue.style.bottom = Matkavalinta.HeittoAlhaalta + 62f;
            liuska = Rakenne.El("mk-sahke-liuska", alue);
            liuska.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(liuska, Kirjasin.Luku);
            sisus = Rakenne.El("mk-sahke-liuska__sisus", liuska, PickingMode.Ignore);
            // ✕ puuttuu kirjasimista: kertomerkki.
            var sulje = Rakenne.Nappi("×", "mk-sahke-liuska__sulje", () => SuljeKayttajana(), liuska);
            sulje.tooltip = "Sulje sähke";
            kerros.JokaRuutu += SeuraaRuutua;

            if (valikko?.Retkikunta != null)
            {
                osio = valikko.Retkikunta;
                osio.Clear();
                osio.style.display = DisplayStyle.None;
                Rakenne.Teksti("RETKIKUNTA", "mk-pudotus__otsikko", osio);
                osioSisus = Rakenne.El("mk-sahke", osio, PickingMode.Ignore);
            }
        }

        void Paa(Action a)
        {
            if (Thread.CurrentThread.ManagedThreadId == paaSaie) a();
            else UiKerros.PaaSaikeessa(a);
        }

        // =====================================================================
        // LIUSKA
        // =====================================================================

        public void NaytaLiuska(SahkeViesti viesti, Action<int> veikkaa, Action suljettu)
        {
            if (viesti == null) return;
            liuskaAuki = true; // heti: ohjain kysyy LiuskaAuki samassa ruudussa
            Paa(() =>
            {
                if (!liuskaAuki) return; // suljettiin ennen piirtoa
                liuskaSuljettu = suljettu;
                RakennaLiuska(viesti, veikkaa);
                liuskaNakyy = false;
                SeuraaRuutua();
                // Web sfx.play('paper'): pöllön paperin kahina.
                Aanet.PulunTehoste("pulu.sahke");
            });
        }

        public void SuljeLiuska()
        {
            liuskaAuki = false;
            Paa(() =>
            {
                if (liuskaAuki) return; // uusi liuska ehti jo tilalle
                liuskaSuljettu = null;
                liuskaNakyy = false;
                Rakenne.Nayta(liuska, false, 240);
            });
        }

        /// <summary>✕ tai "En osaa auttaa": liuska pois ja ohjaimelle tieto.</summary>
        void SuljeKayttajana()
        {
            if (!liuskaAuki) return;
            var s = liuskaSuljettu;
            Aanet.PulunTehoste("paper");
            SuljeLiuska();
            try { s?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        void RakennaLiuska(SahkeViesti v, Action<int> veikkaa)
        {
            sisus.Clear();
            bool apu = v.Laji == SahkeViestiLaji.Apupyynto;
            liuska.EnableInClassList("mk-sahke-liuska--apu", apu);

            var saaterivi = Rakenne.El("mk-sahke-liuska__saaterivi", sisus, PickingMode.Ignore);
            Rakenne.Ikoni(Ikonit.Viiva["pollo"], "mk-sahke-liuska__pollo", saaterivi);
            var saate = Rakenne.Teksti(apu ? SahkePohjat.ApupyynnonSaate : v.Saate ?? "", "mk-sahke-liuska__saate", saaterivi);
            Kirjasimet.Aseta(saate, Kirjasin.LukuKursiivi);

            var paperi = Rakenne.El("mk-sahke-liuska__paperi", sisus, PickingMode.Ignore);
            if (!apu)
            {
                var teksti = Rakenne.Teksti(SahkeTeksti.JsIsot(v.Teksti ?? ""), "mk-sahke-liuska__teksti", paperi);
                Kirjasimet.Aseta(teksti, Kirjasin.KoneLihava);
                var ala = v.Alarivi;
                if (!string.IsNullOrEmpty(ala)) Rakenne.Teksti(ala, "mk-sahke-liuska__alarivi", paperi);
                return;
            }

            Rakenne.Teksti(v.Alarivi, "mk-sahke-liuska__alarivi mk-sahke-liuska__kysyja", paperi);
            Rakenne.Teksti(v.Kysymys ?? "", "mk-sahke-liuska__kysymys", paperi);
            var napit = Rakenne.El("mk-sahke-liuska__vaihtoehdot", paperi, PickingMode.Ignore);
            var lista = v.Vaihtoehdot ?? new List<string>();
            var kaikki = new List<Button>();
            for (int i = 0; i < lista.Count; i++)
            {
                int indeksi = i;
                Button nappi = null;
                nappi = Rakenne.Nappi(null, "mk-sahke-liuska__vaihtoehto", () =>
                {
                    if (!nappi.enabledSelf) return;
                    foreach (var muu in kaikki) muu.SetEnabled(false);
                    nappi.AddToClassList("mk-valittu");
                    Aanet.PulunTehoste("coin");
                    // Ohjain lähettää veikkauksen ja sulkee liuskan (verkkovirhekin sulkee).
                    try { veikkaa?.Invoke(indeksi); }
                    catch (Exception e) { Debug.LogException(e); SuljeLiuska(); }
                }, napit);
                var kirjain = Rakenne.Teksti(((char)('A' + i)).ToString(), "mk-sahke-liuska__kirjain", nappi);
                Kirjasimet.Aseta(kirjain, Kirjasin.LukuLihava);
                Rakenne.Teksti(lista[i], "mk-sahke-liuska__vaihtoehtoteksti", nappi);
                kaikki.Add(nappi);
            }
            var ohita = Rakenne.Nappi(null, "mk-sahke-liuska__ohita", SuljeKayttajana, paperi);
            Rakenne.Teksti("En osaa auttaa", "mk-sahke-liuska__ohitateksti", ohita);
            kaikki.Add(ohita);
        }

        /// <summary>Joka ruudussa: liuska väistää muut näkymät (ei sulkeudu).</summary>
        void SeuraaRuutua()
        {
            if (!liuskaAuki) return;
            bool vapaa = RuutuVapaa();
            if (vapaa == liuskaNakyy) return;
            liuskaNakyy = vapaa;
            Rakenne.Nayta(liuska, vapaa, 240);
        }

        static bool RuutuVapaa()
        {
            var o = PeliOhjain.Instanssi;
            if (o != null && o.Kaytossa && o.Tila != SilmukanTila.Kartta) return false;
            if (UiNakymat.Olemassa)
            {
                var ui = UiNakymat.Hae();
                if (ui.Kaupunkikortti != null && ui.Kaupunkikortti.Auki) return false;
            }
            return true;
        }

        // =====================================================================
        // RETKIKUNTA
        // =====================================================================

        public void NaytaRetkikunta(RetkikuntaNaytto tila, RetkikuntaToiminnot t)
        {
            if (tila == null) return;
            Paa(() => PiirraRetkikunta(tila, t));
        }

        void PiirraRetkikunta(RetkikuntaNaytto tila, RetkikuntaToiminnot t)
        {
            if (osio == null) return;
            toiminnot = t ?? new RetkikuntaToiminnot();
            var avain = string.Join("|", tila.LinjaAuki, tila.Jasen, tila.Koodi, tila.Nimimerkki, tila.Rivi, tila.Teksti,
                string.Join(",", (tila.Pohjat ?? new List<SahkePohja>()).Select(p => p?.Id)));
            osio.style.display = DisplayStyle.Flex;
            if (avain == osioAvain) return; // sama tila: kesken oleva valinta säilyy
            osioAvain = avain;
            sukupolvi++;
            osioSisus.Clear();
            if (!tila.LinjaAuki) Huomio(tila.Rivi ?? SahkeVakiot.LinjaKiinni, osioSisus);
            else if (tila.Jasen) RakennaJasen(tila);
            else RakennaLiittyminen(tila);
        }

        static Label Teksti(string teksti, VisualElement isa) => Rakenne.Teksti(teksti ?? "", "mk-sahke__teksti", isa);
        static Label Huomio(string teksti, VisualElement isa) => Rakenne.Teksti(teksti ?? "", "mk-sahke__huomio", isa);

        Button Siru(string teksti, VisualElement isa, Action painettu)
        {
            var b = Rakenne.Nappi(null, "mk-sahke__siru", painettu, isa);
            Rakenne.Teksti(teksti, "mk-sahke__siruteksti", b);
            return b;
        }

        static void Valitse(VisualElement rivi, VisualElement valittu)
        {
            foreach (var c in rivi.Children()) c.EnableInClassList("mk-valittu", c == valittu);
        }

        /// <summary>Takaisinkutsu, joka toimii vain, jos osio on yhä sama (ei uudelleenrakennettu välissä).</summary>
        Action<T> Tuore<T>(Action<T> a)
        {
            int oma = sukupolvi;
            return x => Paa(() => { if (oma == sukupolvi) a(x); });
        }

        Action<T1, T2> Tuore<T1, T2>(Action<T1, T2> a)
        {
            int oma = sukupolvi;
            return (x, y) => Paa(() => { if (oma == sukupolvi) a(x, y); });
        }

        // --- ei retkikuntaa: nimimerkki + perusta tai liity -----------------------

        void RakennaLiittyminen(RetkikuntaNaytto tila)
        {
            var s = osioSisus;
            Teksti(tila.Teksti, s);
            Huomio("Valitse nimimerkkisi:", s);
            var nimirivi = Rakenne.El("mk-sahke__sirut", s, PickingMode.Ignore);
            string valittu = null;
            Label huomio = null;

            void ArvoNimet()
            {
                nimirivi.Clear();
                valittu = null;
                List<string> nimet = null;
                try { nimet = toiminnot.ArvoNimet?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
                foreach (var nimi in nimet ?? new List<string>())
                {
                    Button b = null;
                    b = Siru(nimi, nimirivi, () =>
                    {
                        valittu = nimi;
                        Valitse(nimirivi, b);
                        huomio.text = $"Nimimerkkisi on {nimi}.";
                    });
                }
            }

            Rakenne.Nappi("Arvo uudet nimet", "mk-sahke__haamu", ArvoNimet, s);

            Button perusta = null, liity = null;
            perusta = Rakenne.Nappi("Perusta retkikunta", "mk-nappi--kulta mk-sahke__laheta", () =>
            {
                if (valittu == null) { huomio.text = "Valitse ensin nimimerkki."; return; }
                if (toiminnot.Perusta == null) return;
                perusta.SetEnabled(false);
                huomio.text = "Perustetaan…";
                var valmis = Tuore<string>(rivi =>
                {
                    // null = onnistui: ohjain piirtää jäsennäkymän NaytaRetkikunnalla.
                    perusta.SetEnabled(true);
                    huomio.text = rivi ?? "";
                });
                try { toiminnot.Perusta(valittu, valmis); }
                catch (Exception e) { Debug.LogException(e); valmis("Ei onnistunut."); }
            }, s);
            Rakenne.Tausta(perusta, Kuviot.Kulta);
            Kirjasimet.Aseta(perusta, Kirjasin.KoneLihava);

            Huomio("Tai liity kaverin koodilla:", s);
            var koodi = new TextField { maxLength = SahkeVakiot.KoodinPituus };
            koodi.AddToClassList("mk-sahke__koodi");
            koodi.textEdition.placeholder = $"Koodi ({SahkeVakiot.KoodinPituus} merkkiä)";
            koodi.keyboardType = TouchScreenKeyboardType.ASCIICapable;
            koodi.tooltip = "Retkikunnan liittymiskoodi";
            // Ei vapaa tekstikenttä: jokainen näppäily suodatetaan koodiaakkostoon.
            koodi.RegisterValueChangedCallback(e =>
            {
                var siisti = Siisti(e.newValue);
                if (siisti != e.newValue) koodi.SetValueWithoutNotify(siisti);
            });
            Kirjasimet.Aseta(koodi, Kirjasin.Kone);
            s.Add(koodi);

            liity = Rakenne.Nappi("Liity retkikuntaan", "mk-komentorivi mk-sahke__laheta", () =>
            {
                if (valittu == null) { huomio.text = "Valitse ensin nimimerkki."; return; }
                var arvo = Siisti(koodi.value);
                if (arvo.Length != SahkeVakiot.KoodinPituus) { huomio.text = $"Koodissa on {SahkeVakiot.KoodinPituus} merkkiä."; return; }
                if (toiminnot.Liity == null) return;
                koodi.Blur();
                liity.SetEnabled(false);
                huomio.text = "Liitytään…";
                var valmis = Tuore<string>(rivi =>
                {
                    liity.SetEnabled(true);
                    huomio.text = rivi ?? "";
                });
                try { toiminnot.Liity(arvo, valittu, valmis); }
                catch (Exception e) { Debug.LogException(e); valmis("Ei onnistunut."); }
            }, s);
            Kirjasimet.Aseta(liity, Kirjasin.KoneLihava);

            huomio = Huomio("", s);
            ArvoNimet();
        }

        string Siisti(string teksti)
        {
            var f = toiminnot.SiistiKoodi ?? SahkeKoodi.Siisti;
            try { return f(teksti ?? "") ?? ""; }
            catch (Exception) { return SahkeKoodi.Siisti(teksti); }
        }

        // --- jäsen: koodi, vinkkisähkeet, ero -------------------------------------

        void RakennaJasen(RetkikuntaNaytto tila)
        {
            var s = osioSisus;
            Teksti(tila.Teksti, s);

            var koodirivi = Rakenne.El("mk-sahke__koodirivi", s, PickingMode.Ignore);
            Huomio("Liittymiskoodi:", koodirivi);
            var arvo = Rakenne.Teksti(tila.Koodi ?? "", "mk-sahke__koodiarvo", koodirivi);
            Kirjasimet.Aseta(arvo, Kirjasin.KoneLihava);

            Huomio("Lähetä sähke retkikunnalle:", s);
            var pohjarivi = Rakenne.El("mk-sahke__sirut", s, PickingMode.Ignore);
            var paikkarivi = Rakenne.El("mk-sahke__sirut", s, PickingMode.Ignore);
            Label huomio = null;

            void NaytaPaikat(SahkePohja pohja)
            {
                paikkarivi.Clear();
                if (pohja == null) return;
                IReadOnlyList<SahkePaikka> paikat = null;
                try { paikat = toiminnot.Paikat?.Invoke(pohja.Id); } catch (Exception e) { Debug.LogException(e); }
                if (paikat == null || paikat.Count == 0)
                {
                    Huomio(Sahkepinta.EiPaikkoja(pohja), paikkarivi).AddToClassList("mk-sahke__huomio--rivi");
                    return;
                }
                foreach (var paikka in paikat)
                {
                    var p = paikka;
                    Siru(string.IsNullOrEmpty(p.Nimi) ? p.PaikkaId : p.Nimi, paikkarivi, () =>
                    {
                        if (toiminnot.Laheta == null) return;
                        foreach (var c in paikkarivi.Children()) c.SetEnabled(false);
                        huomio.text = "Lähetetään…";
                        var valmis = Tuore<bool, string>((ok, rivi) =>
                        {
                            huomio.text = rivi ?? "";
                            if (ok) Aanet.PulunTehoste("paper");
                            paikkarivi.Clear();
                            Valitse(pohjarivi, null);
                        });
                        try { toiminnot.Laheta(pohja.Id, p.PaikkaId, valmis); }
                        catch (Exception e) { Debug.LogException(e); valmis(false, "Ei onnistunut."); }
                    });
                }
            }

            foreach (var pohja in tila.Pohjat ?? new List<SahkePohja>())
            {
                if (pohja == null) continue;
                var p = pohja;
                Button b = null;
                b = Siru(p.Nimi, pohjarivi, () =>
                {
                    Valitse(pohjarivi, b);
                    NaytaPaikat(p);
                });
            }

            huomio = Huomio("", s);
            Rakenne.Nappi("Eroa retkikunnasta", "mk-sahke__haamu", () =>
            {
                try { toiminnot.Eroa?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
            }, s);
        }

        // =====================================================================
        // TESTIKOMENTO (pääsessio kytkee UiKomentoihin, esim. 'ui sahke <mita>')
        // =====================================================================

        /// <summary>
        /// Esimerkit ilman peliä ja workeria: liuska | apu | sulje | kiinni | uusi | jasen | tila.
        /// Retkikuntatilat avaavat päävalikon. Palauttaa selitteen tai virheen.
        /// </summary>
        public string Testaa(string mita)
        {
            switch ((mita ?? "").Trim().ToLowerInvariant())
            {
                case "":
                case "liuska":
                case "sahke":
                    SuljeLiuska();
                    NaytaLiuska(new SahkeViesti
                    {
                        Laji = SahkeViestiLaji.Sahke,
                        Saate = SahkePohjat.Saatteet[0],
                        PohjaId = SahkePohjat.AarreLoytyi, PaikkaId = "tukholma",
                        Teksti = SahkePohjat.Teksti(SahkePohjat.AarreLoytyi, "tukholma", _ => "Tukholma"),
                        Lahettaja = "Utelias Ilves",
                        Aika = DateTimeOffset.UtcNow.ToString("o"),
                    }, null, () => Debug.Log("MATKAKIRJA ui sähke: liuska suljettu"));
                    return "sähkeliuska näkyvissä";
                case "apu":
                case "apupyynto":
                    SuljeLiuska();
                    NaytaLiuska(new SahkeViesti
                    {
                        Laji = SahkeViestiLaji.Apupyynto,
                        ApuId = "testi", Kysyja = "Salaperäinen Kurki",
                        Kysymys = "Minkä joen varrella Budapest on?",
                        Vaihtoehdot = new List<string> { "Tonava", "Reinin", "Elben", "Veiksel" },
                    }, i =>
                    {
                        Debug.Log("MATKAKIRJA ui sähke: veikkaus " + i);
                        liuska.schedule.Execute(SuljeLiuska).StartingIn(600);
                    }, () => Debug.Log("MATKAKIRJA ui sähke: apupyyntö ohitettu"));
                    return "apupyyntöliuska näkyvissä";
                case "sulje":
                    SuljeLiuska();
                    return "liuska suljettu";
                case "kiinni":
                    NaytaRetkikunta(new RetkikuntaNaytto { LinjaAuki = false, Rivi = SahkeVakiot.LinjaKiinni }, new RetkikuntaToiminnot());
                    AvaaValikko();
                    return "retkikunta: linja kiinni";
                case "uusi":
                case "liity":
                    NaytaTestiLiittyminen();
                    AvaaValikko();
                    return "retkikunta: nimimerkki ja perusta/liity";
                case "jasen":
                    NaytaTestiJasen("KTPX4R", "Utelias Ilves");
                    AvaaValikko();
                    return "retkikunta: jäsen";
                case "tila":
                    return $"liuska {(liuskaAuki ? "auki" : "kiinni")}{(liuskaAuki && !liuskaNakyy ? " (väistää)" : "")}, osio {(osio == null ? "puuttuu" : osioAvain ?? "tyhjä")}";
                default:
                    return "tuntematon: liuska | apu | sulje | kiinni | uusi | jasen | tila";
            }
        }

        void AvaaValikko()
        {
            if (!UiNakymat.Olemassa) return;
            var ui = UiNakymat.Hae();
            ui.Aanentasot?.Sulje();
            ui.Matkalaukku?.Sulje();
            ui.Valikko?.Avaa();
        }

        RetkikuntaToiminnot TestiToiminnot() => new RetkikuntaToiminnot
        {
            ArvoNimet = () => SahkeNimet.ArvoNimet(() => UnityEngine.Random.value * 0.9999f),
            Perusta = (nimi, valmis) => liuska.schedule.Execute(() =>
            {
                NaytaTestiJasen("KTPX4R", nimi);
                valmis?.Invoke(null);
            }).StartingIn(700),
            Liity = (koodi, nimi, valmis) => liuska.schedule.Execute(() =>
            {
                if (koodi == "AAAAAA") { valmis?.Invoke("Ei onnistunut: Retkikuntaa ei löydy"); return; }
                NaytaTestiJasen(koodi, nimi);
                valmis?.Invoke(null);
            }).StartingIn(700),
            Paikat = pohjaId => pohjaId == "juliste-saatu"
                ? new List<SahkePaikka> { new SahkePaikka("lontoo", "Lontoo"), new SahkePaikka("pariisi", "Pariisi") }
                : pohjaId == "vinkki-vuori" ? new List<SahkePaikka>()
                : new List<SahkePaikka> { new SahkePaikka("tukholma", "Tukholma") },
            Laheta = (pohjaId, paikkaId, valmis) => liuska.schedule.Execute(() =>
                valmis?.Invoke(true, "Sähke lähti: " + SahkePohjat.Teksti(pohjaId, paikkaId, id => char.ToUpperInvariant(id[0]) + id.Substring(1))))
                .StartingIn(500),
            Eroa = () => NaytaTestiLiittyminen(),
        };

        void NaytaTestiLiittyminen() => NaytaRetkikunta(new RetkikuntaNaytto
        {
            LinjaAuki = true,
            Teksti = "Retkikunta on pieni porukka, joka sähköttää toisilleen matkan käänteistä. Kaikki viestit ovat "
                   + "valmiita sähkepohjia — omaa tekstiä ei kirjoiteta eikä lähetetä.",
        }, TestiToiminnot());

        void NaytaTestiJasen(string koodi, string nimi) => NaytaRetkikunta(new RetkikuntaNaytto
        {
            LinjaAuki = true, Jasen = true, Koodi = koodi, Nimimerkki = nimi,
            Teksti = $"Olet retkikunnassa nimellä {nimi}.",
            Pohjat = SahkePohjat.Vinkit.ToList(),
        }, TestiToiminnot());
    }
}
