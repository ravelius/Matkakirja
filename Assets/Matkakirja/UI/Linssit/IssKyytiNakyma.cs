// ISS:N KYYTI (Linssisepän suositus docs/raportit/iss-kyyti-suositus-20260928.md; Natiivi-UI katselmoi):
// AstronauttiKerros.KyytiKasittelija. Kyydissä (seuranta ja ikkuna):
//   vasen ylä    tietorivi "● LIVE · ISS · 418 km · 27 580 km/h" kuvanäkymän nimipillerin tyylillä; punainen piste sykkii
//                (0,9 s, vähennetty liike: paikallaan), jotta pelaaja ymmärtää ISS:n olevan juuri nyt tuossa kohdassa (omistaja
//                28.9.). Ilman tuoretta TLE:tä ei LIVE-merkkiä vaan loppuun "rata-arvio".
//   oikea ylä    ✕ palaa kaukonäkymään (AstronauttiLinssi.PoistuKyydista); linssin oma sulkunappi on piilossa (KuvaAuki)
// Ikkunassa lisäksi Cupola-kehys (Codexin toimitus 26.9., ämpäri karttanostot/20260926/iss-cupola-*): keskilasi ja kuusi
// trapetsilasia koko ruudulle (cover), ja lasin heijastus omana kerroksenaan hitaalla heilunnalla (8 s, 3 pt; pieni liike
// pois: paikallaan). Kuvat haetaan ensimmäisellä kyydillä (Kuvat.Hae, levyvälimuisti); ilman verkkoa ikkuna ilman kehystä.
// Kehys ja heijastus häivyttyvät 300 ms. Kaikki paitsi ✕ päästää kosketukset läpi, jolloin napautus vaihtaa tilaa.
// CUPOLA 2 (omistajan päätös 28.9. klo 11.0x: "Pyydä Codexilta vain uusi kuva tuosta kupolasta … tummempi … ISS-elementit
// … melkein vain mustia varjokuvia"): Codexin kolme kerrosta ämpäristä karttanostot/20260928/iss-cupola2-* takaa eteen:
// ulko-osat (siluetit, pieni vastakkainen heilunta = syvyys), heijastus ja kehys. Haetaan jo seurannassa (ikkuna on yhden
// napautuksen päässä). Jos kehys ei lataudu, valaistu 3D-kehys (CupolaKerros) on varalla. A/B: astro kyyti cupola uusi|3d|vanha.
using System;
using System.Globalization;
using Matkakirja.Linssit.Iss;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IssKyytiNakyma
    {
        const string Juuri = "https://media.matkakirja.app/karttanostot/20260926/";
        const string Juuri2 = "https://media.matkakirja.app/karttanostot/20260928/";
        static readonly CultureInfo Fi = CultureInfo.GetCultureInfo("fi-FI");

        readonly VisualElement juuri, kehys, heijastus, ulko2, heijastus2, kehys2, turva, piste;
        readonly Label live, tieto;
        bool kuvatHaettu, kuva2Haettu, sykkii;
        IVisualElementScheduledItem heilunta, syke;

        public KyydinTila Tila { get; private set; } = KyydinTila.Kauko;
        /// <summary>Kuvapari samasta käännöksestä (`ui linssi kehys 0|1`): ikkuna ilman Cupola-kehystä.</summary>
        public static bool IlmanKehysta;
        /// <summary>Codexin Cupola 2: null = ei vielä haettu tai latautuu, true = kehys valmis, false = ei saatu (3D varalla).</summary>
        public static bool? Kuva2Tila { get; private set; }
        /// <summary>Piirretäänkö ikkunassa valaistu 3D-kehys (A/B 3d tai Cupola 2:n kehys ei latautunut).</summary>
        public static bool KolmiulotteinenKehys => CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kolmiulotteinen
            || (CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kuva && Kuva2Tila == false);
        /// <summary>Kyyti alkoi tai päättyi (LinssiUi piilottaa linssin sulkunapin kyydin ajaksi).</summary>
        public event Action<bool> AukiMuuttui;

        public IssKyytiNakyma(UiKerros kerros)
        {
            juuri = Rakenne.El("mk-isskyyti", kerros.Juuri(LinssiUi.Ylakerros), PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;
            ulko2 = Rakenne.El("mk-isskyyti__ulko2", juuri, PickingMode.Ignore);
            heijastus2 = Rakenne.El("mk-isskyyti__heijastus2", juuri, PickingMode.Ignore);
            kehys2 = Rakenne.El("mk-isskyyti__kehys2", juuri, PickingMode.Ignore);
            kehys = Rakenne.El("mk-isskyyti__kehys", juuri, PickingMode.Ignore);
            heijastus = Rakenne.El("mk-isskyyti__heijastus", juuri, PickingMode.Ignore);
            turva = Rakenne.El("mk-isskyyti__turva", juuri, PickingMode.Ignore);
            var pilleri = Rakenne.El("mk-isskyyti__tieto", turva, PickingMode.Ignore);
            piste = Rakenne.El("mk-isskyyti__piste", pilleri, PickingMode.Ignore);
            live = Rakenne.Teksti("LIVE", "mk-isskyyti__live", pilleri);
            tieto = Rakenne.Teksti("", "mk-isskyyti__teksti", pilleri);
            var sulku = Rakenne.Nappi("×", "mk-astrokuva__sulku", Poistu, turva);
            sulku.tooltip = "Pois kyydistä";
            juuri.RegisterCallback<GeometryChangedEvent>(_ =>
            {
                var r = kerros.Reunat(LinssiUi.Kerros);
                turva.style.left = r.x; turva.style.top = r.y; turva.style.right = r.z; turva.style.bottom = r.w;
            });
        }

        static void Poistu() => UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi?.PoistuKyydista();

        /// <summary>AstronauttiKerros.KyytiKasittelija.</summary>
        public void Aseta(KyydinTila tila, double korkeusKm, double nopeusKmh, bool arvio)
        {
            bool oliAuki = Tila != KyydinTila.Kauko;
            Tila = tila;
            bool auki = tila != KyydinTila.Kauko;
            juuri.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            if (auki)
                tieto.text = string.Format(Fi, "{0}ISS · {1:N0} km · {2:N0} km/h{3}", arvio ? "" : "· ", korkeusKm,
                    Math.Round(nopeusKmh / 10) * 10, arvio ? " · rata-arvio" : "");
            var liveNakyy = auki && !arvio ? DisplayStyle.Flex : DisplayStyle.None;
            piste.style.display = liveNakyy; live.style.display = liveNakyy;
            Syke(auki && !arvio);
            bool ikkuna = tila == KyydinTila.Ikkuna;
            if (ikkuna && !kuvatHaettu && CupolaKerros.Vanha) HaeKuvat();
            if (auki && !kuva2Haettu && CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kuva) HaeKuvat2();
            this.ikkuna = ikkuna;
            PaivitaKehys();
            if (auki != oliAuki) AukiMuuttui?.Invoke(auki);
        }

        bool ikkuna;

        /// <summary>Kehys ja heijastus näkyviin ikkunassa (ellei A/B ilman kehystä).</summary>
        public void PaivitaKehys()
        {
            // Oletus Codexin Cupola 2 (UI-kerrokset); valaistu 3D-kerros (CupolaKerros) A/B:ssä ja varalla; 1.0.35:n UI-kehys
            // vain A/B:n "ennen"-kuvaan (CupolaKerros.Vanha).
            bool vanha = ikkuna && !IlmanKehysta && CupolaKerros.Vanha;
            bool uusi = ikkuna && !IlmanKehysta && CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kuva && Kuva2Tila == true;
            if (vanha && !kuvatHaettu) HaeKuvat();
            if (ikkuna && !kuva2Haettu && CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kuva) HaeKuvat2();
            juuri.EnableInClassList("mk-isskyyti--ikkuna", vanha);
            juuri.EnableInClassList("mk-isskyyti--kuva2", uusi);
            Heilu(vanha || uusi);
        }

        void HaeKuvat()
        {
            kuvatHaettu = true;
            // iPad-kehys leveämmälle ruudulle (1536 × 2732), muuten iPhone (1206 × 2622); cover rajaa loput.
            bool ipad = Screen.width > 0.5f * Screen.height;
            string koko = ipad ? "ipad-1536x2732" : "iphone-1206x2622";
            Kuvat.Hae(Juuri + "iss-cupola-kokonainen-" + koko + ".png", t => { if (t != null) kehys.style.backgroundImage = t; });
            Kuvat.Hae(Juuri + "iss-cupola-heijastus-" + koko + ".png", t => { if (t != null) heijastus.style.backgroundImage = t; });
        }

        /// <summary>LIVE-piste sykkii (luokka vaihtuu 0,9 s:n välein, USS-siirtymä); käynnistyy vain tilan vaihtuessa.</summary>
        void Syke(bool paalla)
        {
            paalla &= !LinssiUi.VahennettyLiike();
            if (paalla == sykkii) return;
            sykkii = paalla;
            syke?.Pause();
            piste.RemoveFromClassList("mk-isskyyti__piste--himmea");
            if (!paalla) return;
            bool himmea = false;
            syke = piste.schedule.Execute(() => { himmea = !himmea; piste.EnableInClassList("mk-isskyyti__piste--himmea", himmea); }).Every(900);
        }

        /// <summary>Codexin Cupola 2 (kolme kerrosta); kehys ratkaisee (ulko-osat ja heijastus ovat valinnaisia).</summary>
        void HaeKuvat2()
        {
            kuva2Haettu = true;
            bool ipad = Screen.width > 0.5f * Screen.height;
            string koko = ipad ? "ipad-1536x2732" : "iphone-1206x2622";
            int odottaa = 3;
            bool kehysOk = false;
            void Valmis(VisualElement e, Texture2D t)
            {
                if (t != null) e.style.backgroundImage = t;
                if (e == kehys2) kehysOk = t != null;
                if (--odottaa > 0) return;
                Kuva2Tila = kehysOk;
                Debug.Log($"MATKAKIRJA linssit: cupola2 {(kehysOk ? "valmis" : "kehys ei latautunut, 3D-kehys varalla")} ({koko})");
                PaivitaKehys();
            }
            Kuvat.Hae(Juuri2 + "iss-cupola2-ulkoosat-" + koko + ".png", t => Valmis(ulko2, t));
            Kuvat.Hae(Juuri2 + "iss-cupola2-heijastus-" + koko + ".png", t => Valmis(heijastus2, t));
            Kuvat.Hae(Juuri2 + "iss-cupola2-kehys-" + koko + ".png", t => Valmis(kehys2, t));
        }

        bool heiluu;

        /// <summary>Heilunta päälle tai pois vain tilan vaihtuessa: Aseta kutsuu tätä joka sekunti (tietorivi), ja uudelleenkäynnistys
        /// palautti heijastuksen alkuun sekunnin välein (2 pt:n nykäys).</summary>
        void Heilu(bool paalla)
        {
            paalla &= !LinssiUi.VahennettyLiike();
            if (paalla == heiluu) return;
            heiluu = paalla;
            heilunta?.Pause();
            heijastus.style.translate = heijastus2.style.translate = ulko2.style.translate = new Translate(0, 0);
            if (!paalla) return;
            float t0 = Time.unscaledTime;
            // Heijastus lasissa ja ulko-osat lasin takana liikkuvat hitaasti vastakkain (katsojan pää liikkuu): syvyys.
            heilunta = heijastus.schedule.Execute(() =>
            {
                float u = (Time.unscaledTime - t0) / 8f * 2f * Mathf.PI;
                var h = new Translate(3f * Mathf.Sin(u), 2f * Mathf.Sin(u * 0.5f));
                heijastus.style.translate = heijastus2.style.translate = h;
                ulko2.style.translate = new Translate(-1.6f * Mathf.Sin(u), -1f * Mathf.Sin(u * 0.5f));
            }).Every(33);
        }

        /// <summary>Linssi vaihtui tai suljettiin: kyydin UI pois.</summary>
        public void Pois() { if (Tila != KyydinTila.Kauko) Aseta(KyydinTila.Kauko, 0, 0, false); }
    }
}
