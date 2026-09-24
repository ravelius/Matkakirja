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
//   RadioNakyma        maailmanradion kotelo alalaidassa (pistenäyttö, merkkivalo, asteikko)
// Linssin ollessa auki kartan kalusteet väistyvät (kartuscha, karttaselitteen
// nappi) ja oikeaan yläkulmaan tulee "✕ Sulje linssi" (Rekisteri.Sulje).
// Aikajanalinsseissä (keksinnöt, ihmisen matka) sulku on ylärivin hampurilaisen
// ensimmäinen rivi "Poistu" (LinssiValikko, web js/aikajana-valikko.js), joten
// pilleri väistyy aina, kun hampurilainen on käytettävissä.
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
        public readonly RadioNakyma Radio;
        readonly Button sulje;
        Linssirekisteri kuunneltu;
        // Sulkupillerin peittäjät: astronautin kuvanäkymä, vertailuarkki ja aikajanan hampurilainen.
        bool kuvaPeittaa, arkkiPeittaa, valikkoKorvaa;

        /// <summary>Auki oleva linssi (null = ei mitään).</summary>
        public ILinssi Auki { get; private set; }

        public LinssiUi(UiKerros kerros, UiNakymat ui)
        {
            this.ui = ui;
            kerros.JokaRuutu += AjaOdottava;
            Peite = new LinssiPeite(kerros);
            Selite = new LinssiSelite(kerros);
            Valitsin = new Linssivalitsin(kerros);
            Astronautti = new AstronautinNakyma(kerros);
            Maat = new MaidenNakyma(kerros, ui);
            Aikajana = new AikajanaNakyma(kerros, this);
            Radio = new RadioNakyma(kerros);

            // Pieni pilleri oikeassa yläkulmassa, taikalasien vasemmalla puolella.
            var turva = kerros.Turva(SulkuKerros);
            sulje = Rakenne.Nappi("Sulje linssi", "mk-linssiSulje", SuljeLinssi, turva);
            sulje.Insert(0, Rakenne.Teksti("×", "mk-linssiSulje__risti"));
            sulkuTeksti = sulje.Q<Label>(className: "mk-nappi__teksti");
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
            // Kertojan kytkin (päävalikko, linssin hampurilainen) koskee myös linssin luentaa ja
            // kertomusta (web luentaKytkinPaalla); Äänimaisema pois = koko pelin mykistys.
            // Mykistys-koukku on Pelikoodarin: vain jos kukaan ei ole asettanut omaansa.
            EsityksenAani.Mykistetty ??= () => !Asetukset.Paalla(Kytkin.Kertoja) || !Asetukset.Paalla(Kytkin.Aanimaisema);

            Valitsin.Valittu += Valitse;
            Valitsin.Suljettava += SuljeLinssi;
            Astronautti.KuvaAuki += auki => { kuvaPeittaa = auki; PaivitaSulku(); };
            Maat.ArkkiMuuttui += auki => { arkkiPeittaa = auki; PaivitaSulku(); };
            Aikajana.ValikkoKaytettavissa += kaytossa => { valikkoKorvaa = kaytossa; PaivitaSulku(); };

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
            s.top = astroTila ? 12 : Ylapalkki.Varaus + 8 + 4;
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

        /// <summary>Linssin valinta muualta (laukun Varusteet): sama vaihtokytkin kuin valitsimessa.</summary>
        public void ValitseLinssi(string id) => Valitse(id);

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
        Action odottava;
        int odottavanKehys;

        /// <summary>Ajaa toiminnon aikaisintaan seuraavassa kehyksessä (uusi korvaa odottavan).</summary>
        void SeuraavaKehys(Action a)
        {
            odottava = a;
            odottavanKehys = Time.frameCount;
        }

        void AjaOdottava()
        {
            if (odottava == null || Time.frameCount <= odottavanKehys) return;
            var a = odottava;
            odottava = null;
            a();
        }

        // Piikkiseurannan merkit (KehysPiikit suodattaa nimen "UI"-alkuosasta).
        static readonly Unity.Profiling.ProfilerMarker MerkkiAikajana = new Unity.Profiling.ProfilerMarker("UI.Linssi.Aikajana");
        static readonly Unity.Profiling.ProfilerMarker MerkkiSelite = new Unity.Profiling.ProfilerMarker("UI.Linssi.Selite");
        static readonly Unity.Profiling.ProfilerMarker MerkkiMaat = new Unity.Profiling.ProfilerMarker("UI.Linssi.Maat");
        static readonly Unity.Profiling.ProfilerMarker MerkkiRadio = new Unity.Profiling.ProfilerMarker("UI.Linssi.Radio");

        void Vaihtui(ILinssi linssi)
        {
            // Vaihtui voi tulla LinssiOhjaimen komennoista; UI:ta muutetaan vain pääsäikeessä,
            // ja LinssiOhjain.Update on pääsäie, joten suora kutsu riittää.
            Auki = linssi;
            bool paalla = linssi != null;
            string id = linssi?.Tiedot?.Id;
            ui.Kartuscha.NaytaSallittu(!paalla);
            ui.Nostot.NaytaSallittu(!paalla);
            ui.OfflineTila.NaytaSallittu(!paalla);
            ui.Matkavalinta.NaytaSallittu(!paalla);
            ui.Matkakirja.NaytaSallittu(!paalla);
            ui.Karttaselite.NaytaNappi(!paalla);
            if (paalla) ui.Karttaselite.Sulje();
            Valitsin.Sulje();
            Valitsin.Merkitse(id);
            // Linssin vaihtuessa pilleri esiin kuten ennenkin; peittäjät ilmoittavat itsensä uudelleen.
            kuvaPeittaa = arkkiPeittaa = false;
            sulkuNakyi = false; // uusi linssi: pilleri taas kokonaan ja kutistuu uudelleen
            PaivitaSulku();
            // Selite, maat ja radio seuraavaan kehykseen (keksintöjen avaus 11,4 ms yhdessä kehyksessä,
            // Linssisepän piikkiajo 2); aikajana heti, koska sen palkki korvaa yläpalkin tässä kehyksessä.
            if (!paalla) using (MerkkiSelite.Auto()) Selite.Nayta(null);
            // Astronautin kamera (Linssisepän kuvaus 23.9.2026): yläpalkki piiloon, vain ✕
            // oikeassa yläkulmassa; Livialle kypärä.
            bool astro = id == AstronauttiId;
            astroTila = astro;
            Asettele();
            // Aikajanalinsseillä oma palkki korvaa Matkakirjan yläpalkin (web body.aikajana-palkki-auki .topbar).
            bool aikajana = id == AikajanaNakyma.KeksinnotId || id == AikajanaNakyma.IhmisenMatkaId;
            ui.Tilarivi.NaytaPalkki(!astro && !aikajana);
            Valitsin.NaytaNappi(!astro && !aikajana);
            Pulu.Hae().Astronautti = astro;
            Astronautti.Vaihtui(astro);
            using (MerkkiAikajana.Auto())
            {
                Aikajana.Kytke(linssi);
                Aikajana.VahdiValikkoa(); // hampurilainen korvaa pillerin jo tässä ruudussa
            }
            if (!paalla)
            {
                using (MerkkiMaat.Auto()) Maat.Kytke(null);
                using (MerkkiRadio.Auto()) Radio.Kytke(null);
                Peite.Aseta(false);
                return;
            }
            SeuraavaKehys(() =>
            {
                if (Auki != linssi) return;
                using (MerkkiSelite.Auto()) Selite.Nayta(linssi.Tiedot);
                using (MerkkiMaat.Auto()) Maat.Kytke(linssi);
                using (MerkkiRadio.Auto()) Radio.Kytke(linssi);
            });
        }

        /// <summary>
        /// Sulkupilleri näkyy, kun linssi on auki eikä sitä peitä kuvanäkymä tai vertailuarkki
        /// eikä korvaa aikajanan hampurilainen (sen "Poistu").
        /// </summary>
        void PaivitaSulku()
        {
            bool nakyy = Auki != null && !kuvaPeittaa && !arkkiPeittaa && !valikkoKorvaa;
            sulje.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (nakyy && !sulkuNakyi) Kutista();
            else if (!nakyy) { kutistus?.Pause(); kutistus = null; }
            sulkuNakyi = nakyy;
        }

        // Löydös 32 (omistaja, build 10; natiivin oma lisäys, webissä ei vastinetta): "✕ Sulje linssi" näkyy ensin
        // kokonaan, ja 1,2 s:n päästä teksti sulaa oikealta vasemmalle kirjain kerrallaan 0,6 s:ssa pehmeällä
        // easingillä (smoothstep), kunnes jäljellä on pelkkä ✕ yläkulmassa. Pieni liike pois: suoraan ✕:ksi.
        const string SulkuTeksti = "Sulje linssi";
        const float KutistusViive = 1.2f, KutistusKesto = 0.6f;
        Label sulkuTeksti;
        bool sulkuNakyi;
        IVisualElementScheduledItem kutistus;

        void Kutista()
        {
            kutistus?.Pause();
            if (sulkuTeksti == null) return;
            sulkuTeksti.text = SulkuTeksti;
            sulkuTeksti.style.display = DisplayStyle.Flex;
            sulje.RemoveFromClassList("mk-linssiSulje--risti");
            if (VahennettyLiike()) { sulje.schedule.Execute(Risti).StartingIn((long)(KutistusViive * 1000)); return; }
            float alku = Time.unscaledTime + KutistusViive;
            kutistus = sulje.schedule.Execute(() =>
            {
                float t = (Time.unscaledTime - alku) / KutistusKesto;
                if (t < 0f) return;
                if (t >= 1f) { Risti(); kutistus?.Pause(); return; }
                int n = Mathf.CeilToInt(SulkuTeksti.Length * (1f - Mathf.SmoothStep(0f, 1f, t)));
                sulkuTeksti.text = SulkuTeksti.Substring(0, n).TrimEnd();
            }).Every(16);
        }

        void Risti()
        {
            sulkuTeksti.text = "";
            sulkuTeksti.style.display = DisplayStyle.None;
            sulje.AddToClassList("mk-linssiSulje--risti");
        }

        /// <summary>Kaikki linssien valikot ja testinäkymät kiinni (UiNakymat.SuljeKaikki).</summary>
        public void SuljeValikot()
        {
            Valitsin.Sulje();
            Maat.SuljeArkki();
            Aikajana.Valikko.Sulje();
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
