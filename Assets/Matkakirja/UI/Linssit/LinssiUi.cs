// LINSSIEN KÄYTTÖLIITTYMÄ (Natiivi-UI, 23.9.2026): kokoaja, joka kytkee
// Linssisepän koukut (Linssit/Unity: LinssiOhjain, AstronauttiKerros,
// KeksinnotKerros, IhmisenMatkaKerros; Ydin: VertailuLinssi, MaatiedotLinssi)
// natiivin UI:n osiin:
//   Linssivalitsin     taikalasit-nappi kartalla + pergamenttivalitsin
//   LinssiPeite        tumma odotuspeite rgba(20,16,10,.96) (PeiteKasittelija)
//   LinssiSelite       auki olevan linssin selitekortti (Selite + Lähde)
//   AstronautinNakyma  musta avaus + otsikkokortti, kuvanäkymä, avaruussumu
//   MaidenNakyma       vertailun alapalkki + vertailuarkki, maatietojen maakyltti
//   AikajanaNakyma     keksintöjen ja ihmisen matkan esitys (kello, paneeli, kertomus)
// Linssin ollessa auki kartan kalusteet väistyvät (kartuscha, karttaselitteen
// nappi) ja oikeaan yläkulmaan tulee "✕ Sulje linssi" (Rekisteri.Sulje).
//
// Kerrokset (UiKerros, sortingOrder): 5 avaruussumu (3D:n päällä, kaiken UI:n
// alla), 24 ihmisen matkan musta (tilarivin päällä), 25 linssien kalusteet
// (RAJAPINTA.md), 37 peite, astronautin avaus ja kuvanäkymä (pulun 35 päällä),
// 38 linssin sulkunappi (webissä ✕ on mustan kerroksen yläpuolella).
//
// Rekisteri syntyy LinssiOhjaimen mukana (AfterSceneLoad), joten kytkentä
// odottaa sitä ja kytkeytyy uudelleen, jos ohjain vaihtuu.
using System;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Aikajana;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class LinssiUi
    {
        public const int Kerros = 25, SumuKerros = 5, MustaKerros = 24, Ylakerros = 37, SulkuKerros = 38;
        /// <summary>Astronautin kameran tunnus (AstronauttiLinssi.AstronauttiTiedot.Id).</summary>
        public const string AstronauttiId = "satelliitti";

        readonly UiNakymat ui;
        public readonly Linssivalitsin Valitsin;
        public readonly LinssiPeite Peite;
        public readonly LinssiSelite Selite;
        public readonly AstronautinNakyma Astronautti;
        public readonly MaidenNakyma Maat;
        public readonly AikajanaNakyma Aikajana;
        readonly Button sulje;
        Linssirekisteri kuunneltu;

        /// <summary>Auki oleva linssi (null = ei mitään).</summary>
        public ILinssi Auki { get; private set; }

        public LinssiUi(UiKerros kerros, UiNakymat ui)
        {
            this.ui = ui;
            Peite = new LinssiPeite(kerros);
            Selite = new LinssiSelite(kerros);
            Valitsin = new Linssivalitsin(kerros);
            Astronautti = new AstronautinNakyma(kerros);
            Maat = new MaidenNakyma(kerros, ui);
            Aikajana = new AikajanaNakyma(kerros, this);

            // Pieni pilleri oikeassa yläkulmassa, taikalasien vasemmalla puolella.
            var turva = kerros.Turva(SulkuKerros);
            sulje = Rakenne.Nappi("Sulje linssi", "mk-linssiSulje", SuljeLinssi, turva);
            sulje.Insert(0, Rakenne.Teksti("✕", "mk-linssiSulje__risti"));
            Kirjasimet.Aseta(sulje, Kirjasin.Kone);
            sulje.tooltip = "Sulje linssi";
            sulje.style.display = DisplayStyle.None;
            kerros.TurvaMuuttui += Asettele;
            Asettele();

            // Koukut. Peite on UI:n; musiikin pito kuuluu Pelikoodarin äänille, joilla ei
            // vielä ole taustamusiikkia natiivissa: tyhjä käsittelijä vain, jos kukaan ei
            // ole asettanut omaansa (ei jyrätä myöhempää kytkentää).
            LinssiOhjain.PeiteKasittelija = Peite.Aseta;
            LinssiOhjain.MusiikkiKasittelija ??= _ => { };
            // Vähennetty liike: pelaajan "Pieni liike" pois = vähemmän liikettä.
            // TODO: iOS:n UIAccessibilityIsReduceMotionEnabled liitännäisenä (LinssiOhjaimen kommentti).
            LinssiOhjain.VahennettyLiikeKysely ??= VahennettyLiike;

            Valitsin.Valittu += Valitse;
            Valitsin.Suljettava += SuljeLinssi;
            Astronautti.KuvaAuki += auki => SulkuNakyviin(!auki);
            Maat.ArkkiMuuttui += auki => SulkuNakyviin(!auki);

            kerros.Juuri(Kerros).schedule.Execute(Kytke).Every(500);
            Kytke();
        }

        public static Linssirekisteri Rekisteri => LinssiOhjain.Rekisteri;

        /// <summary>Asetuksista: "Pieni liike" pois = vähennetty liike.</summary>
        public static bool VahennettyLiike() => !Asetukset.Paalla(Kytkin.PieniLiike);

        bool astroTila;

        void Asettele()
        {
            // Tavallisesti taikalasien vasemmalla puolella; astronautin kamerassa (ei yläpalkkia
            // eikä taikalaseja) oikeassa yläkulmassa kuten webin .satelliitti-linssisulku.
            var s = sulje.style;
            s.top = astroTila ? 12 : Ylapalkki.Korkeus + 8 + 4;
            s.right = astroTila ? 12 : 10 + 40 + 8;
        }

        void Kytke()
        {
            var r = Rekisteri;
            if (ReferenceEquals(r, kuunneltu)) { Valitsin.PaivitaNappi(r); return; }
            if (kuunneltu != null) kuunneltu.Vaihtui -= Vaihtui;
            kuunneltu = r;
            if (r != null) r.Vaihtui += Vaihtui;
            Valitsin.PaivitaNappi(r);
            Vaihtui(r?.Auki);
        }

        void Valitse(string id)
        {
            var r = Rekisteri;
            if (r == null) { Valitsin.Merkitse(id); return; } // testitila ilman LinssiOhjainta
            try { r.Valitse(id); }
            catch (ArgumentException e)
            {
                Debug.LogWarning("MATKAKIRJA ui linssit: " + e.Message);
                ui.Tilarivi.Viesti("Linssi ei ole vielä käytössä");
            }
        }

        /// <summary>Auki oleva linssi kiinni (sulkunappi, valitsimen "Ota linssi pois", loppukortti).</summary>
        public void SuljeLinssi()
        {
            Valitsin.Sulje();
            if (Rekisteri?.Auki != null) Rekisteri.Sulje();
            else Vaihtui(null); // testitila: näkymät kiinni ilman linssiä
        }

        /// <summary>Rekisterin Vaihtui: uusi auki oleva linssi tai null.</summary>
        void Vaihtui(ILinssi linssi)
        {
            // Vaihtui voi tulla LinssiOhjaimen komennoista; UI:ta muutetaan vain pääsäikeessä,
            // ja LinssiOhjain.Update on pääsäie, joten suora kutsu riittää.
            Auki = linssi;
            bool paalla = linssi != null;
            string id = linssi?.Tiedot?.Id;
            ui.Kartuscha.NaytaSallittu(!paalla);
            ui.Karttaselite.NaytaNappi(!paalla);
            if (paalla) ui.Karttaselite.Sulje();
            Valitsin.Sulje();
            Valitsin.Merkitse(id);
            sulje.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
            Selite.Nayta(linssi?.Tiedot);
            // Astronautin kamera (Linssisepän kuvaus 23.9.2026): yläpalkki piiloon, vain ✕
            // oikeassa yläkulmassa; Livialle kypärä.
            bool astro = id == AstronauttiId;
            astroTila = astro;
            Asettele();
            ui.Tilarivi.NaytaPalkki(!astro);
            Valitsin.NaytaNappi(!astro);
            Pulu.Hae().Astronautti = astro;
            Astronautti.Vaihtui(astro);
            Maat.Kytke(linssi);
            Aikajana.Kytke(linssi);
            if (!paalla) Peite.Aseta(false);
        }

        /// <summary>Kuvanäkymä tai muu koko ruudun linssinäkymä peittää sulkunapin.</summary>
        public void SulkuNakyviin(bool nakyy)
        {
            bool paalla = Auki != null;
            sulje.style.display = paalla && nakyy ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>Kaikki linssien valikot ja testinäkymät kiinni (UiNakymat.SuljeKaikki).</summary>
        public void SuljeValikot()
        {
            Valitsin.Sulje();
            Maat.SuljeArkki();
        }

        // --- linssi-oliot sovittimien takaa ---------------------------------------------

        /// <summary>Auki oleva keksintölinssi (LinssiOhjain.KeksinnotSovitin), muuten null.</summary>
        public static KeksinnotLinssi Keksinnot =>
            (Rekisteri?.Auki as LinssiOhjain.KeksinnotSovitin)?.Linssi;

        /// <summary>Auki oleva ihmisen matkan linssi (LinssiOhjain.IhmisenMatkaSovitin), muuten null.</summary>
        public static IhmisenMatkaLinssi IhmisenMatka =>
            (Rekisteri?.Auki as LinssiOhjain.IhmisenMatkaSovitin)?.Linssi;
    }
}
