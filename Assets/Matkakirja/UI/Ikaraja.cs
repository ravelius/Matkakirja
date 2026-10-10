// IKÄRAJA JA KURATOITU LIVE (omistaja 10.10.2026 klo 08.0x, Raamattu LIVE-TEKOÄLY KAIKILLE, ALLE 18 KURATOITU; Natiivi-UI,
// Päätoimittajan hyväksymä suunnitelma 10.10.): ennen ensimmäistä live-kysymystä peli kysyy kerran syntymävuoden ja tallentaa
// vain tiedon aikuinen kyllä/ei (ei vuotta). Aikuisille live toimii kuten ennen; alle 18-vuotiaille ja tuntemattomalle iälle
// live on kuratoitu (Kuratoitu = true: worker käyttää omaa järjestelmäkehotetta ja suodatusta; Pelikoodari välittää tilan).
//
//   KORTTI-pohja, modaali (kuten Vahvistus): kapiteeli, otsikko, leipä (tekoälymerkintä ja mitä tallennetaan),
//   Lomake.Valinta (syntymävuosi), napit Ei nyt (TOIMINTO) ja Jatka (kulta, vasta kun vuosi on valittu).
//   Ei nyt = tuntematon ikä: kuratoitu, ja peli ei kysy uudelleen itse ("kysyy kerran"; arvo "?" säilyy, PT 10.10. 11.5x).
//   Aikuinen vain varmasti: syntymävuodesta laskettu pienin mahdollinen ikä ≥ 18 (vuosi − syntymävuosi − 1).
// ASETUKSET (PT 10.10. 11.5x): Asetukset-näkymän Ikäraja-rivi (UiNakymat.RakennaAsetusnakyma, valikkonapin pohja) näyttää tilan
// ja avaa SAMAN kortin: vastaamaton voi vastata myöhemmin; vastauksen jälkeen vain tiukempaan suuntaan (aikuinen → alle 18),
// alle 18 on lukittu (rivi kertoo sen tilarivillä). Säännöt Peli/IkarajaSaanto.cs (testit IkarajaTestit).
// Testikomento: ui ikaraja kysy | asetukset | aikuinen | kuratoitu | nollaa | sulje (UiKomennot).
using System;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Ikaraja
    {
        /// <summary>PlayerPrefs: "1" = aikuinen, "0" = alle 18, "?" = kysytty, ei vastattu; puuttuu = ei kysytty.</summary>
        public const string Avain = "matkakirja-aikuinen";
        public const int Taysi = IkarajaSaanto.Taysi, Vanhin = 1920;

        static VisualElement himmennys;
        static DropdownField vuosi;
        static Button jatka;
        static readonly List<Action> odottavat = new List<Action>();

        /// <summary>Aikuinen (true), alle 18 (false) tai ei tiedossa (null).</summary>
        public static bool? Aikuinen => IkarajaSaanto.Lue(PlayerPrefs.GetString(Avain, ""));

        /// <summary>Kuratoitu live: alle 18 tai tuntematon ikä (Raamattu). Worker-pyyntö lukee tämän.</summary>
        public static bool Kuratoitu => Aikuinen != true;

        /// <summary>Workerin otsake (Pelikoodari 10.10.): 1 = aikuinen, 0 = kuratoitu (alle 18 tai tuntematon); puuttuu = kuratoitu.</summary>
        public const string Otsake = "x-matkakirja-aikuinen";
        public static string OtsakeArvo => Kuratoitu ? "0" : "1";

        /// <summary>Kysytty kerran (vastaus tai Ei nyt tallessa): peli ei kysy enää itse.</summary>
        public static bool Kysytty => IkarajaSaanto.Kysytty(PlayerPrefs.GetString(Avain, ""));

        /// <summary>Asetukset-rivin tila: aikuinen, alle 18 tai ei vastattu.</summary>
        public static string TilaTeksti => Kieli.T(Aikuinen == true ? "ui.ikaraja.tila.aikuinen" : Aikuinen == false ? "ui.ikaraja.tila.alle-18" : "ui.ikaraja.tila.ei-vastattu");

        /// <summary>Tila muuttui (vastaus tai nollaus).</summary>
        public static event Action Muuttui;

        public static bool Auki => himmennys != null && himmennys.style.display == DisplayStyle.Flex;

        /// <summary>
        /// Ennen live-tekoälyä: jos ikää ei ole kysytty, kortti aukeaa ja jatko ajetaan vastauksen jälkeen (true = odottaa).
        /// Kysytty → false, ja kutsuja jatkaa heti itse.
        /// </summary>
        public static bool KysyEnsin(Action jatko)
        {
            if (Kysytty) return false;
            if (jatko != null) odottavat.Add(jatko);
            Nayta();
            return true;
        }

        /// <summary>Aikuinen jos pienin mahdollinen ikä tänä vuonna on vähintään 18 (syntymäpäivä voi olla vielä edessä).</summary>
        public static bool OnAikuinen(int syntymavuosi, int nyt) => IkarajaSaanto.OnAikuinen(syntymavuosi, nyt);

        /// <summary>
        /// Asetukset-rivi: sama kortti, kun tilaa voi vielä vaihtaa (ei vastattu tai aikuinen); alle 18 on lukittu → tilarivin viesti.
        /// </summary>
        public static void AvaaAsetuksista()
        {
            if (!IkarajaSaanto.VoiVaihtaa(Aikuinen))
            {
                if (UiNakymat.Olemassa) UiNakymat.Hae().Tilarivi.Viesti(Kieli.T("ui.ikaraja.lukittu"));
                return;
            }
            Nayta();
        }

        public static void Tallenna(bool aikuinen)
        {
            PlayerPrefs.SetString(Avain, aikuinen ? IkarajaSaanto.ArvoAikuinen : IkarajaSaanto.ArvoAlle18);
            PlayerPrefs.Save();
            Debug.Log("MATKAKIRJA ikaraja: " + (aikuinen ? "aikuinen" : "alle 18 (kuratoitu)"));
            Muuttui?.Invoke();
        }

        public static void Nollaa()
        {
            PlayerPrefs.DeleteKey(Avain);   // myös "?" (ei vastattu): kysytään taas seuraavalla live-kysymyksellä
            PlayerPrefs.Save();
            Muuttui?.Invoke();
        }

        static void Rakenna()
        {
            var juuri = UiKerros.Hae().Juuri(UiKerros.Valikot);
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            himmennys.style.display = DisplayStyle.None;
            var kortti = new Kortti("mk-vahvistus", pohja: true);
            himmennys.Add(kortti);
            Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.ikaraja.kapiteeli"), "mk-kortti__kapiteeli", kortti.Sisus), Tyylikirja.Kirjain.Kapiteeli);
            Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.ikaraja.otsikko"), "mk-kortti__otsikko", kortti.Sisus), Tyylikirja.Kirjain.Otsikko);
            Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.ikaraja.teksti"), "mk-kortti__teksti", kortti.Sisus), Tyylikirja.Kirjain.Leipa);
            int nyt = DateTime.Now.Year;
            var nimet = new List<string> { Kieli.T("ui.ikaraja.valitse") };
            for (int v = nyt; v >= Vanhin; v--) nimet.Add(v.ToString());
            vuosi = Lomake.Valinta(kortti.Sisus, nimet);
            vuosi.tooltip = Kieli.T("ui.ikaraja.syntymavuosi");
            vuosi.RegisterValueChangedCallback(_ => jatka?.SetEnabled(vuosi.index > 0));
            Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.ikaraja.tallennus"), "mk-kortti__teksti", kortti.Sisus), Tyylikirja.Kirjain.Apuri);
            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            Rakenne.Nappi(Kieli.T("ui.ikaraja.ei-nyt"), "mk-nappi--toiminto", () => { EiNyt(); Sulje(); }, napit);
            jatka = Rakenne.Nappi(Kieli.T("ui.ikaraja.jatka"), "mk-nappi--kulta", () =>
            {
                if (vuosi.index <= 0) return;
                // Vain tiukempaan suuntaan: alle 18 ei muutu aikuiseksi (IkarajaSaanto.Uusi).
                Tallenna(IkarajaSaanto.Uusi(Aikuinen, OnAikuinen(nyt - (vuosi.index - 1), nyt)));
                Sulje();
            }, napit);
            Kirjasimet.Aseta(napit, Kirjasin.Kone);
            Kirjasimet.Aseta(jatka, Kirjasin.KoneLihava);
        }

        /// <summary>Ei nyt: vastaamaton tila talteen ("?", kuratoitu, ei kysytä uudelleen); annettu vastaus säilyy ennallaan.</summary>
        static void EiNyt()
        {
            if (Aikuinen.HasValue) return;
            PlayerPrefs.SetString(Avain, IkarajaSaanto.ArvoEiVastattu);
            PlayerPrefs.Save();
            Debug.Log("MATKAKIRJA ikaraja: ei nyt (kuratoitu, ei kysytä uudelleen)");
            Muuttui?.Invoke();
        }

        static void Nayta()
        {
            if (himmennys == null) Rakenna();
            if (Auki) return;
            vuosi.index = 0;
            jatka.SetEnabled(false);
            Rakenne.Nayta(himmennys, true, Tyylikirja.Kesto.Avaus);
            SyoteLukko.Esta(himmennys);
        }

        static void Sulje()
        {
            if (himmennys == null) return;
            Rakenne.Nayta(himmennys, false, Tyylikirja.Kesto.Sulku);
            SyoteLukko.Vapauta(himmennys);
            var jatkot = odottavat.ToArray();
            odottavat.Clear();
            foreach (var j in jatkot) j();
        }

        /// <summary>Testikomento ui ikaraja …</summary>
        public static string Testi(string komento)
        {
            switch (komento)
            {
                case "kysy": Nayta(); return "ikäkysely auki";
                case "asetukset": AvaaAsetuksista(); return Auki ? "ikäkysely auki (Asetukset)" : "ikäraja lukittu (alle 18)";
                case "aikuinen": Tallenna(true); return "aikuinen";
                case "kuratoitu": Tallenna(false); return "alle 18 (kuratoitu)";
                case "nollaa": Nollaa(); return "nollattu (kysytään seuraavalla live-kysymyksellä)";
                case "sulje": Sulje(); return "ikäkysely kiinni";
                default: return $"ikaraja: {(Aikuinen == true ? "aikuinen" : Aikuinen == false ? "alle 18" : Kysytty ? "ei vastattu" : "ei kysytty")}, kuratoitu {Kuratoitu}";
            }
        }
    }
}
