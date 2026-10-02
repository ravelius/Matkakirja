// VALIKKO V2 (omistaja 2.10.2026: vedos klo 14.0x, hyväksytty muutoksin klo 14.37 ja 15.0x; web #3853 js/pilleri-paneeli.js
// valikkoV2, js/ui.js renderValikkoTaso, css/pohjat/pinnat/pillerivalikko.css "VALIKKO V2"). Pääsivu ylhäältä alas:
//   ÄÄNET       Kertoja · Musiikki · Äänimaisema kevyinä kytkinnappeina vierekkäin (päällä pergamenttitäyttö, pois himmeä muste)
//   tasorivi    avatar ympyränä, "Untuvikko (80 tp)", etenemispalkki ja › (avaa tasonäkymän)
//   päivärivi   natiivin oma (omistaja 2.10.2026 klo 15.1x): "Päivä 1/80, aamu · £400" ja lopussa punaisella päivän kulut
//               ruokaan ja majoitukseen "−£20" (Matka.PaivakuluNyt)
//   MATKALAUKKU Aarteet (N) · Julisteet (N) luettelorivinä (ikoni, nimi, ›, ohut viiva välissä); ei Linssejä (kartan oma nappi)
//   PELI        Retkikunta · Asetukset
//   alarivi     viivan alla "Uusi peli" hillittynä tekstinappina vasemmalla ja versio oikealla (natiivissa ei päivitä-nappia)
// Tasonäkymä: ‹ Takaisin + TIETÄJÄTASO, nykyinen avatar isona ja kaikki tasot ruudukkona (Tietajagalleria.Ruudukko), nykyinen
// ympyröity toimintovärillä. Ei kapseleita (EI OVAALEJA 2.10.): kulmat kulma-tokeneista, ympyrä vain avatar. Vanha järjestys:
// PlayerPrefs matkakirja-valikko = "vanha" (web ?valikko=vanha), luetaan valikkoa rakennettaessa.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed partial class Linssivalitsin
    {
        /// <summary>Valikko v2 oletuksena (web valikkoV2); "vanha" palauttaa 29.9. järjestyksen.</summary>
        public static bool ValikkoV2 => PlayerPrefs.GetString("matkakirja-valikko", "") != "vanha";

        /// <summary>Pääsivu on rakennettu v2-järjestykseen (AloitaV2).</summary>
        public bool V2 { get; private set; }

        VisualElement tasot, tasoAvatar, tasoPalkki, tasoTayte, paivaRivi;
        Label tasoNimi, paivaTeksti, paivaKulu;
        int avatarTaso = -1;
        readonly List<(Label Nimi, string Perus, Func<LaukkuNaytto, int> Maara)> maarat = new List<(Label, string, Func<LaukkuNaytto, int>)>();

        /// <summary>V2-pääsivu: paneelin tyyliluokka ja tasonäkymän kotelo (UiNakymat.RakennaValikkoV2).</summary>
        public void AloitaV2()
        {
            V2 = true;
            paneeli.AddToClassList("mk-pillerivalikko--v2");
            tasot = Rakenne.El("mk-tasonakyma", vieritys, PickingMode.Ignore);
            tasot.style.display = DisplayStyle.None;
            Avautuu += PaivitaV2;
        }

        /// <summary>ÄÄNET-rivi ilman yhteistä kehystä (web .tk-paneeli__ryhma--vierekkain v2: rako xs, ei väliviivoja).</summary>
        public VisualElement LisaKevytKytkinrivi() =>
            Rakenne.El("mk-valikkorivi mk-valikkorivi--kevyt", lisaosa, PickingMode.Ignore);

        /// <summary>Kevyt kytkin: ikoni ja nimi samalla rivillä, nimi ohuella kirjasimella (web font-weight 400).</summary>
        public Button LisaKevytKytkin(VisualElement rivi, string nimi, string ikoni, Func<bool> paalla, Action vaihda)
        {
            var b = LisaKytkin(rivi, nimi, ikoni, paalla, vaihda);
            if (rivi.IndexOf(b) > 0) b.AddToClassList("mk-valikkonappi--vali");
            var l = b.Q<Label>(className: "mk-valikkonappi__nimi");
            if (l != null) Kirjasimet.Aseta(l, Kirjasin.Kone);
            return b;
        }

        /// <summary>Luetteloryhmä (web .tk-paneeli__ryhma--luettelo), otsikko kapiteelina yllä (null = ei otsikkoa).</summary>
        public VisualElement LisaLuetteloRyhma(string otsikkoTeksti)
        {
            if (otsikkoTeksti != null) LisaOsioOtsikko(otsikkoTeksti);
            return Rakenne.El("mk-luetteloryhma", lisaosa, PickingMode.Ignore);
        }

        /// <summary>Luettelorivi (web pueLuetteloRivi): ikoni, nimi yhdellä koolla ja › oikeassa reunassa.</summary>
        public Button LisaLuetteloRivi(VisualElement ryhma, string nimi, string ikoni, Action painettu, Func<bool> nakyy = null)
        {
            var b = Rakenne.Nappi(null, "mk-luettelorivi", painettu, ryhma);
            b.tooltip = nimi;
            if (ikoni != null) Rakenne.Ikoni(ikoni, "mk-luettelorivi__ikoni", b).pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(Rakenne.Teksti(nimi, "mk-luettelorivi__nimi", b), Kirjasin.Kone);
            Rakenne.Teksti("›", "mk-luettelorivi__nuoli", b);
            if (nakyy != null) lisarivit.Add((b, nakyy));
            return b;
        }

        /// <summary>Rivin nimen perään kerätty määrä suluissa avattaessa: "Aarteet (3)" (web renderValikkoTaso).</summary>
        public void LisaMaara(Button rivi, Func<LaukkuNaytto, int> maara)
        {
            var l = rivi.Q<Label>(className: "mk-luettelorivi__nimi");
            if (l != null) maarat.Add((l, l.text, maara));
        }

        /// <summary>Tasorivi ilman otsikkoa: avatar, "Untuvikko (80 tp)", etenemispalkki ja ›; avaa tasonäkymän.</summary>
        public Button LisaTasorivi(VisualElement ryhma)
        {
            var b = Rakenne.Nappi(null, "mk-luettelorivi mk-tasorivi", () => NaytaNakyma(Nakyma.Matka), ryhma);
            b.tooltip = "Tietäjätaso";
            tasoAvatar = Rakenne.El("mk-tasorivi__avatar", b, PickingMode.Ignore);
            tasoNimi = Kirjasimet.Aseta(Rakenne.Teksti("", "mk-luettelorivi__nimi", b), Kirjasin.Kone);
            tasoPalkki = Rakenne.El("mk-tasorivi__palkki", b, PickingMode.Ignore);
            tasoTayte = Rakenne.El("mk-tasorivi__tayte", tasoPalkki, PickingMode.Ignore);
            Rakenne.Teksti("›", "mk-luettelorivi__nuoli", b);
            return b;
        }

        /// <summary>Päivärivi tasorivin alle (omistaja 2.10.2026 klo 15.1x): päivä, aika ja kassa; päivän kulut punaisella.</summary>
        public void LisaPaivarivi()
        {
            paivaRivi = Rakenne.El("mk-paivarivi", lisaosa, PickingMode.Ignore);
            paivaTeksti = Kirjasimet.Aseta(Rakenne.Teksti("", "mk-paivarivi__teksti", paivaRivi), Kirjasin.Kone);
            paivaKulu = Kirjasimet.Aseta(Rakenne.Teksti("", "mk-paivarivi__kulu", paivaRivi), Kirjasin.Kone);
        }

        /// <summary>Ohut viiva ennen alariviä (web .tk-paneeli__erotin).</summary>
        public void LisaErotin() => Rakenne.El("mk-linssivalitsin__erotin", lisaosa, PickingMode.Ignore);

        /// <summary>Alarivin hillitty tekstinappi vasemmalle ("Uusi peli"); valikko sulkeutuu ja toiminto ajetaan.</summary>
        public Button LisaAlarivinNappi(string nimi, Action toiminto)
        {
            var b = Rakenne.Nappi(nimi, "mk-alarivi__nappi", () => { Sulje(); toiminto?.Invoke(); });
            b.tooltip = nimi;
            Kirjasimet.Aseta(b.Q<Label>(), Kirjasin.Kone);
            pohja.Insert(0, b);
            return b;
        }

        /// <summary>Luetteloryhmien väliviivat näkyvien rivien väliin (web :not([hidden]) ~ :not([hidden])).</summary>
        void PaivitaLuettelot()
        {
            paneeli.Query<VisualElement>(className: "mk-luetteloryhma").ForEach(ryhma =>
            {
                bool eka = true;
                foreach (var c in ryhma.Children())
                {
                    if (c.style.display == DisplayStyle.None) continue;
                    c.EnableInClassList("mk-luettelorivi--viiva", !eka);
                    eka = false;
                }
            });
        }

        static int Pisteet() => PeliOhjain.Instanssi?.Matka?.Tila.Pelaaja.Xp ?? 0;

        /// <summary>Valikon avaus: tasorivi, määrät ja päivärivi pelin tilasta (web renderValikkoTaso).</summary>
        void PaivitaV2()
        {
            PaivitaLuettelot();
            int pisteet = Pisteet();
            var taso = Kokemus.TasoPisteille(pisteet);
            if (tasoNimi != null)
            {
                tasoNimi.text = $"{taso.Nimi} ({pisteet} {Kokemus.Lyhenne})";
                if (avatarTaso != taso.Taso) { avatarTaso = taso.Taso; Tietajagalleria.Kuva(tasoAvatar, taso.Taso); }
                // Etenemispalkki nykyisen tason alusta seuraavan rajaan; ylimmällä tasolla ei palkkia.
                tasoPalkki.style.display = Kokemus.SeuraavaTaso(pisteet) != null ? DisplayStyle.Flex : DisplayStyle.None;
                tasoTayte.style.width = Length.Percent((float)Kokemus.TasonOsuus(pisteet) * 100f);
            }
            if (maarat.Count > 0)
            {
                var d = AarteetData?.Invoke();
                foreach (var (l, perus, maara) in maarat) l.text = d == null ? perus : $"{perus} ({maara(d)})";
            }
            if (paivaRivi != null)
            {
                var m = PeliOhjain.Instanssi?.Matka;
                paivaRivi.style.display = m != null ? DisplayStyle.Flex : DisplayStyle.None;
                if (m == null) return;
                var t = m.Tila;
                paivaTeksti.text = $"Päivä {t.Paiva()}/{LaattaVakiot.EnnatysPaivat}, {PeliApu.AikaNimi(t.Vuorokaudenaika())} · {PeliApu.Valuutta}{t.Pelaaja.Raha}";
                int kulu = m.PaivakuluNyt().Yhteensa;
                paivaKulu.text = kulu > 0 ? $"−{PeliApu.Valuutta}{kulu}" : "";
                paivaRivi.tooltip = Matkalaukku.KassaVihje(m) ?? "";
            }
        }

        /// <summary>Tasonäkymä: nykyinen avatar isona ylhäällä ja sen alla kaikki tasot, nykyinen ympyröity.</summary>
        void RakennaTasot()
        {
            tasot.Clear();
            int pisteet = Pisteet();
            var nyt = Kokemus.TasoPisteille(pisteet);
            var iso = Rakenne.El("mk-tasonakyma__avatar", tasot, PickingMode.Ignore);
            iso.tooltip = nyt.Nimi;
            Tietajagalleria.Kuva(iso, nyt.Taso);
            Tietajagalleria.Ruudukko(tasot, pisteet, true);
        }
    }
}
