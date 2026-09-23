// MATKALAUKKU (Natiivi-UI): webin #passport-dialog (js/ui.js renderProgress,
// renderAarteet, renderFinds, renderJulisteet; css .passport-card).
//
// Avautuu yläpalkin tilapilleristä ja kiinnittyy pillerin alle (webin
// .pillerin-alla, asemoiLaukku: vasen reuna pillerin kohdalla, ruudun sisällä).
// Paperi nahkakehyksessä (#2b2015, 12 pt sivuilla ja alhaalla, ei ylhäällä),
// sisus vierii ja kehys pysyy. Napautus ohi sulkee (ei himmennystä, kuten web).
//
//   MATKA         Sijainti · Kukkaro · [muotokuva] tietäjätaso  N tp
//                 palkki + "Seuraava taso R tp: Nimi"
//   MATKAN TILASTOT ›   (väkänen, oletuksena kiinni, muistetaan:
//                        matkakirja-laukku-tilastot)
//                 tilastorivit · AARNIN LUETTELO (◈ löydetyt + Kateissa n)
//                 · TAVARAT (kuva + "Nimi ×n", tyhjänä teksti) · JULISTEET (3 viimeisintä, n/m »)
//
// Data: Pelikoodarin PeliOhjain.Instanssi.Laukku() (LaukkuNaytto), päivitys
// PeliOhjain.TilaMuuttui-tapahtumasta auki ollessa. Kukkaron muutos välähtää
// yläpalkin pillerissä (Ylapalkki.RahaMuuttui). VARUSTEET: linssit kuten webin
// linssikotelo (Fablen tarkastus C3: sekä laukussa että kartan taikalaseissa);
// rivin napautus sulkee laukun ja vaihtaa linssin (LinssiUi.ValitseLinssi).
// Julisterivi avaa julistegallerian (Galleriat.cs), tietäjärivin i Tietäjän tien
// (minipopup) ja Aarnin luettelon i pikkuselosteen (web pikkuselosteNappi).
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Matkalaukku : Pudotus
    {
        const string TilastotAvain = "matkakirja-laukku-tilastot";

        // Tarinakaanonia (Fablen teksti, web ui.js aarni-otsikko): ei lyhennetä.
        public const string AarniSeloste = "Aarnin luettelo on isoisän vanhan ystävän, keräilijä Aarnin, kokoama "
            + "lista aarteista, jotka ovat päässeet unohtumaan. Kateissa-luku "
            + "kertoo, montako niistä on vielä löytämättä — jokainen matkalla "
            + "ratkaistu johtolanka voi viedä yhden jäljille.";

        readonly Func<VisualElement> pilleri;
        readonly VisualElement matka, tilastot, lohko, aarteet, tavarat, julisteet;
        readonly Button tilastoNappi;
        readonly Label varusteOtsikko;
        readonly VisualElement varusteet;
        PeliOhjain kuunneltu;
        Func<LaukkuNaytto> testiData;
        LaukkuNaytto naytetty;

        public Matkalaukku(UiKerros kerros, Func<float> alareuna, Func<VisualElement> pilleri) : base(kerros, alareuna, "mk-laukku")
        {
            this.pilleri = pilleri;
            Rakenne.Tausta(Paneeli, Kuviot.Pergamentti);
            Kirjasimet.Aseta(Paneeli, Kirjasin.Luku);

            Osio("Matka");
            matka = Rakenne.El("mk-laukku__rivit", Sisalto, PickingMode.Ignore);

            tilastoNappi = Rakenne.Nappi(null, "mk-laukku__lohkonappi", VaihdaTilastot, Sisalto);
            var ot = Rakenne.Teksti("MATKAN TILASTOT", "mk-laukku__osio", tilastoNappi);
            Kirjasimet.Aseta(ot, Kirjasin.Kone);
            Rakenne.Teksti("›", "mk-laukku__vakanen", tilastoNappi);
            lohko = Rakenne.El("mk-laukku__lohko", Sisalto, PickingMode.Ignore);
            tilastot = Rakenne.El("mk-laukku__rivit", lohko, PickingMode.Ignore);
            var aarniOtsikko = Rakenne.El("mk-laukku__osiorivi", lohko, PickingMode.Ignore);
            Osio("Aarnin luettelo", aarniOtsikko);
            Pikkuseloste.Nappi(AarniSeloste, aarniOtsikko);
            aarteet = Rakenne.El("mk-laukku__rivit", lohko, PickingMode.Ignore);
            Osio("Tavarat", lohko);
            tavarat = Rakenne.El("mk-laukku__rivit", lohko, PickingMode.Ignore);
            julisteet = Rakenne.El("mk-laukku__julisteet", lohko);
            julisteet.AddManipulator(new Clickable(AvaaJulisteet));
            varusteOtsikko = Osio("Varusteet");
            varusteet = Rakenne.El("mk-laukku__rivit", Sisalto, PickingMode.Ignore);
            AsetaTilastot(PlayerPrefs.GetString(TilastotAvain, "0") == "1");
            AukiMuuttui += auki => { if (!auki) Pikkuseloste.Sulje(); };
        }

        /// <summary>Testikomento: tilastolohko auki (Aarnin luettelo näkyviin).</summary>
        public void AvaaTilastot() => AsetaTilastot(true);

        void AvaaJulisteet()
        {
            var d = naytetty;
            if (d == null || d.Julisteet.Count == 0) return;
            UiNakymat.Hae().Julistegalleria.Avaa(d.Julisteet.Select(j => j.Avain));
        }

        Label Osio(string teksti, VisualElement isa = null)
        {
            var l = Rakenne.Teksti(teksti.ToUpperInvariant(), "mk-laukku__osio", isa ?? Sisalto);
            Kirjasimet.Aseta(l, Kirjasin.Kone);
            return l;
        }

        // --- asettelu: pillerin alle ---------------------------------------------------

        protected override void Asettele()
        {
            base.Asettele();
            var p = pilleri?.Invoke();
            var juuri = Paneeli.parent;
            if (p == null || juuri == null || float.IsNaN(p.worldBound.x)) return;
            // Vasen reuna pillerin kohdalla, kokonaan ruudulla (web asemoiLaukku, VARA 8).
            float leveys = Mathf.Min(520f, juuri.resolvedStyle.width - 16f);
            float vasen = juuri.WorldToLocal(p.worldBound.position).x;
            vasen = Mathf.Clamp(vasen, 8f, Mathf.Max(8f, juuri.resolvedStyle.width - leveys - 8f));
            Paneeli.style.right = StyleKeyword.Auto;
            Paneeli.style.left = vasen;
            Paneeli.style.width = leveys;
            // Kiinni palkkiin kuten webin .pillerin-alla (ei ylärakoa).
            Paneeli.style.top = Paneeli.style.top.value.value - 6f;
        }

        // --- sisältö ---------------------------------------------------------------------

        protected override void Paivita()
        {
            KytkeOhjain();
            var d = testiData?.Invoke() ?? PeliOhjain.Instanssi?.Laukku();
            if (d != null) KehittajanJulisteet(d);
            naytetty = d;
            Pikkuseloste.Sulje();
            matka.Clear(); tilastot.Clear(); aarteet.Clear(); tavarat.Clear(); julisteet.Clear();
            Varusteet();
            if (d == null)
            {
                Rivi(matka, "Matka ei ole vielä alkanut.", null);
                tilastoNappi.style.display = DisplayStyle.None;
                lohko.style.display = DisplayStyle.None;
                return;
            }
            tilastoNappi.style.display = DisplayStyle.Flex;
            AsetaTilastot(tilastoNappi.ClassListContains("mk-auki"));

            Rivi(matka, "Sijainti", d.Sijainti);
            Rivi(matka, "Kukkaro", d.Kukkaro);
            if (d.Tietaja != null) Tietaja(d.Tietaja);

            foreach (var (otsikko, arvo) in d.Tilastot) Rivi(tilastot, otsikko, arvo);

            foreach (var a in d.AarninLuettelo)
            {
                if (!a.Loydetty) continue;
                var r = Rakenne.El("mk-laukku__aarre mk-loytynyt", aarteet, PickingMode.Ignore);
                r.Add(Aloitusnakyma.Merkki("mk-laukku__aarremerkki"));
                Rakenne.Teksti(a.Nimi, "mk-laukku__aarrenimi", r);
                var tila = Rakenne.Teksti("LÖYTYI", "mk-laukku__aarretila", r);
                Kirjasimet.Aseta(tila, Kirjasin.Kone);
            }
            var kateissa = Rakenne.El("mk-laukku__aarre", aarteet, PickingMode.Ignore);
            Rakenne.Teksti("Kateissa", "mk-laukku__aarrenimi", kateissa);
            Rakenne.Teksti(d.Kateissa.ToString(), "mk-laukku__arvo", kateissa);

            if (d.Tavarat.Count == 0) Rakenne.Teksti(d.TavaratTyhja ?? "Laukku on vielä tyhjä.", "mk-laukku__tyhja", tavarat);
            foreach (var t in d.Tavarat)
            {
                var r = Rakenne.El("mk-laukku__tavara", tavarat, PickingMode.Ignore);
                var ikoni = new LaattaIkoni(t.Tyyppi, t.KuvaUrl);
                ikoni.AddToClassList("mk-laukku__tavaraikoni");
                r.Add(ikoni);
                Rakenne.Teksti(t.Teksti, "mk-laukku__teksti", r);
            }

            julisteet.style.display = d.Julisteet.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (d.Julisteet.Count > 0)
            {
                var n = Rakenne.Teksti("JULISTEET", "mk-laukku__julistenimio", julisteet);
                Kirjasimet.Aseta(n, Kirjasin.Kone);
                var vedokset = Rakenne.El("mk-laukku__vedokset", julisteet, PickingMode.Ignore);
                foreach (var j in d.ViimeisimmatJulisteet)
                {
                    var v = Rakenne.El("mk-laukku__vedos", vedokset, PickingMode.Ignore);
                    if (!string.IsNullOrEmpty(j.Url)) Kuvat.Hae(j.Url, tex => { if (tex != null) v.style.backgroundImage = new StyleBackground(tex); else v.RemoveFromHierarchy(); });
                }
                var luku = Rakenne.Teksti($"{d.Julisteet.Count}/{d.JulisteitaKaikkiaan} »", "mk-laukku__arvo", julisteet);
                Kirjasimet.Aseta(luku, Kirjasin.Kone);
            }
        }

        /// <summary>Kehittäjätilassa kaikki julisteet näkyvät voitettuina (web julisteVoitot, omistaja 22.8.2026).</summary>
        static void KehittajanJulisteet(LaukkuNaytto d)
        {
            var kaikki = UiSisalto.Julisteet;
            if (!Asetukset.Kehittaja || kaikki.Count == 0) return;
            d.Julisteet = kaikki.Select(j => new LaukkuJuliste { Avain = j.Id, Otsikko = j.Otsikko, Lyhyt = j.Lyhyt, Selite = j.Selite, Url = j.Url }).ToList();
            d.JulisteitaKaikkiaan = kaikki.Count;
        }

        void Varusteet()
        {
            varusteet.Clear();
            var r = LinssiUi.Rekisteri;
            var lista = r?.Valittavat;
            bool on = lista != null && lista.Count > 0;
            varusteOtsikko.style.display = varusteet.style.display = on ? DisplayStyle.Flex : DisplayStyle.None;
            if (!on) return;
            string auki = r.Auki?.Tiedot?.Id;
            foreach (var l in lista)
            {
                var t = l.Tiedot;
                string id = t.Id;
                var b = Rakenne.Nappi(null, "mk-laukku__varuste", () => { Sulje(); UiNakymat.Hae()?.Linssit.ValitseLinssi(id); }, varusteet,
                    string.IsNullOrEmpty(t.Ikoni) ? Ikonit.Viiva["taikalasit"] : t.Ikoni);
                b.EnableInClassList("mk-valittu", id == auki);
                Rakenne.Teksti(t.Nimi ?? id, "mk-laukku__teksti", b);
                if (id == auki) Kirjasimet.Aseta(Rakenne.Teksti("PÄÄLLÄ", "mk-laukku__aarretila", b), Kirjasin.Kone);
            }
        }

        void Rivi(VisualElement isa, string nimi, string arvo)
        {
            var r = Rakenne.El("mk-laukku__rivi", isa, PickingMode.Ignore);
            Rakenne.Teksti(nimi, "mk-laukku__teksti", r);
            if (arvo != null) Rakenne.Teksti(arvo, "mk-laukku__arvo", r);
        }

        void Tietaja(LaukkuTietaja t)
        {
            var r = Rakenne.El("mk-laukku__rivi", matka, PickingMode.Ignore);
            var kuva = Rakenne.El("mk-laukku__muotokuva", r, PickingMode.Ignore);
            if (!string.IsNullOrEmpty(t.AvatarUrl))
                Kuvat.Hae(t.AvatarUrl, tex => { if (tex != null) kuva.style.backgroundImage = new StyleBackground(tex); });
            Rakenne.Teksti(t.Nimi, "mk-laukku__teksti", r);
            // i heti nimikkeen perään, pisteet yksin oikeaan reunaan (omistaja 18.8.2026).
            int pisteet = t.Pisteet;
            var info = Rakenne.Nappi("i", "mk-seloste-nappi", () => Tietajagalleria.Avaa(pisteet), r);
            Kirjasimet.Aseta(info, Kirjasin.Kone);
            Rakenne.Teksti(t.Pisteet + " tp", "mk-laukku__arvo", r);
            if (t.SeuraavaRaja == null) return;
            var palkki = Rakenne.El("mk-laukku__palkki", matka, PickingMode.Ignore);
            var tayte = Rakenne.El("mk-laukku__palkkitayte", palkki, PickingMode.Ignore);
            Rakenne.Tausta(tayte, Kuviot.Vaaka("tietaja-palkki", Kuviot.Vari("#8a6114"), Kuviot.Vari("#d9a13b")));
            tayte.style.width = Length.Percent(Mathf.Clamp01((float)t.Osuus) * 100f);
            Rakenne.Teksti($"Seuraava taso {t.SeuraavaRaja} tp: {t.SeuraavaNimi}", "mk-laukku__seuraava", matka);
        }

        void VaihdaTilastot()
        {
            bool auki = !tilastoNappi.ClassListContains("mk-auki");
            AsetaTilastot(auki);
            PlayerPrefs.SetString(TilastotAvain, auki ? "1" : "0");
            PlayerPrefs.Save();
        }

        void AsetaTilastot(bool auki)
        {
            tilastoNappi.EnableInClassList("mk-auki", auki);
            lohko.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
        }

        void KytkeOhjain()
        {
            var o = PeliOhjain.Instanssi;
            if (ReferenceEquals(o, kuunneltu)) return;
            if (kuunneltu != null) kuunneltu.TilaMuuttui -= TilaMuuttui;
            kuunneltu = o;
            if (o != null) o.TilaMuuttui += TilaMuuttui;
        }

        void TilaMuuttui() => UiKerros.PaaSaikeessa(() => { if (Auki) Paivita(); });

        /// <summary>Testikomento: laukku keksityllä sisällöllä ilman peliä (null = pelin data).</summary>
        public void Testaa(Func<LaukkuNaytto> data)
        {
            testiData = data;
            if (Auki) Paivita(); else Avaa();
        }

        /// <summary>Esimerkkilaukku kuvasarjoihin (web renderProgress-rivien muodossa).</summary>
        public static LaukkuNaytto Esimerkki() => new LaukkuNaytto
        {
            Sijainti = "Firenze",
            Raha = 340,
            Tietaja = new LaukkuTietaja
            {
                Taso = 3, Nimi = "Kartanlukija", Pisteet = 120, Osuus = 0.4, SeuraavaNimi = "Tähtien tulkitsija", SeuraavaRaja = 200,
                AvatarUrl = Laukku.SivustoJuuri + "assets/tietaja/taso-03.jpg",
            },
            Tilastot = { ("Avatut aarteet", "1 / 6"), ("Käydyt kaupungit", "9 / 266"), ("Käydyt maat", "4 / 61"), ("Tieto tästä laudasta", "7 %") },
            AarninLuettelo =
            {
                new LaukkuAarre { Id = "aarni:eurooppa", Manner = "eurooppa", Nimi = "Pyhän Graalin kopio", Loydetty = true },
                new LaukkuAarre { Id = "aarni:afrikka", Manner = "afrikka", Nimi = "Saban kuningattaren sormus" },
            },
            Tavarat =
            {
                new LaukkuTavara { Id = "tavara:star:eurooppa::0", Tyyppi = "star", Nimi = "Pyhän Graalin kopio", Maara = 1 },
                new LaukkuTavara { Id = "tavara:pieniAarre:eurooppa:ITA", Tyyppi = "pieniAarre", Nimi = "Medicien hopeafloriini", Maara = 2 },
            },
        };
    }
}
