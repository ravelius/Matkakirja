// ISS:N KYYTI (Linssisepän suositus docs/raportit/iss-kyyti-suositus-20260928.md; Natiivi-UI katselmoi):
// AstronauttiKerros.KyytiKasittelija. Kyydissä (seuranta, ikkuna ja kohteen yllä):
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
// napautuksen päässä). Jos kehys ei lataudu, valaistu 3D-kehys (CupolaKerros) on varalla.
// SYVÄTERÄVYYS (omistaja 28.9. iltapäivällä Fablen kautta: "tuo cupola ei voi näkyä noin terävänä, koska katse on
// maapallossa"): oletuksena Linssisepän poltettu muunnelma iss-cupola2-pehmea-* (kehys levysumennuksella voimakkaasti
// epäterävä, ulko-osat vähemmän, heijastus lasin etäisyydeltä, aavistus raetta; ei ajonaikaista sumennusta).
// A/B: astro kyyti cupola uusi|pehmea|terava|3d|vanha (uusi = pehmea2, pehmea = 1.0.37, terava = Codexin alkuperäinen).
// LÄHEMMÄS LASIA (omistaja 28.9. klo 18.0x): ikkuna zoomataan 1,3 × (kenttä 80° → 65,7°, Cupola-kerrokset samassa suhteessa) ja
// sumennusta on vähemmän (pehmea2); A/B astro kyyti lasi 1|1.3.
// NOPEUTUS JA "LENNÄ KOHTEEN YLLE" (omistaja 28.9. klo 12.1x; web iss-kyyti-nakyma.js ja css/satelliitti.css, commit
// 891958e17, px → pt 1:1): pillerin alla porras LIVE · 10× · 100× · 1000× (valittu vihreänä ja lihavoituna; nopeutettuna
// LIVE-nappi on "Palaa LIVE"), sen alla "Lennä kohteen ylle…" ja ylilennon rivi ("Venetsia · Ylilento klo 14.32, 3 h 12 min
// päästä" → perillä "Venetsia: ISS 123 km sivussa"). Nopeutettuna pilleri on "● 100× · ISS …" ilman LIVE-sanaa, piste
// harmaa, ja pillerin napautus = Palaa LIVE. Valikko: webissä selaimen oma valinta; natiivissa lista napin alla (Euroopan
// NASA-kohteet samassa järjestyksessä, AstronauttiLinssi.YlilennonKohteet), napautus listan ohi sulkee sen vaihtamatta
// kyydin tilaa.
using System;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IssKyytiNakyma
    {
        const string Juuri = "https://media.matkakirja.app/karttanostot/20260926/";
        const string Juuri2 = "https://media.matkakirja.app/karttanostot/20260928/";

        readonly VisualElement juuri, kehys, heijastus, ulko2, heijastus2, kehys2, polyt, turva, pilleri, piste, ohjaimet, peite;
        readonly Label live, tieto, ylilento, liveNappi;
        readonly Button[] napit;
        readonly Button valikko;
        readonly ScrollView lista;
        bool nopeutettu, listaTaytetty;
        /// <summary>Valikon rivin korkeus (pt, web min-height 28 px).</summary>
        const float RiviPt = 28;
        bool kuvatHaettu, kuva2Haettu, sykkii;
        IVisualElementScheduledItem heilunta, syke;

        public KyydinTila Tila { get; private set; } = KyydinTila.Kauko;
        /// <summary>Kuvapari samasta käännöksestä (`ui linssi kehys 0|1`): ikkuna ilman Cupola-kehystä.</summary>
        public static bool IlmanKehysta;
        /// <summary>
        /// Cupola 2:n kuvasarja (A/B `astro kyyti cupola uusi|pehmea|terava`): "pehmea2" (oletus, omistaja 28.9. klo 18.0x:
        /// "pehmennyksen määrää voi hieman vähentää"; levysumennus iPhonella kehys r 7 px, ulko-osat 2 px, heijastus 4,6 px,
        /// iPadilla × 1,27, rae 4/255 ennallaan ja 1/1,3 hienompi, koska lasin zoom suurentaa sen; ruudulla ~0,75 × entinen
        /// sumennus), "pehmea" (1.0.37: 12 / 3,5 / 8 px) tai "" = Codexin terävä alkuperäinen. Työkalu cupola_pehmea.py.
        /// </summary>
        public static string Sarja = "pehmea2";
        string haettuSarja;
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
            // Pölyhiukkaset leijuvat kuvun sisällä katsojan ja lasin välissä: kehyksen edessä, käyttöliittymän takana.
            polyt = Rakenne.El("mk-isskyyti__polyt", juuri, PickingMode.Ignore);
            polyt.style.position = Position.Absolute;
            polyt.style.left = 0; polyt.style.top = 0; polyt.style.right = 0; polyt.style.bottom = 0;
            polyt.style.display = DisplayStyle.None;
            polyt.generateVisualContent += PiirraPolyt;
            kehys = Rakenne.El("mk-isskyyti__kehys", juuri, PickingMode.Ignore);
            heijastus = Rakenne.El("mk-isskyyti__heijastus", juuri, PickingMode.Ignore);
            // Valikon peite: napautus listan ohi sulkee sen eikä vaihda kyydin tilaa (webissä selaimen oma valikko).
            peite = Rakenne.El("mk-isskyyti__peite", juuri);
            peite.style.display = DisplayStyle.None;
            peite.RegisterCallback<PointerDownEvent>(_ => SuljeLista());
            turva = Rakenne.El("mk-isskyyti__turva", juuri, PickingMode.Ignore);
            pilleri = Rakenne.El("mk-isskyyti__tieto", turva, PickingMode.Ignore);
            piste = Rakenne.El("mk-isskyyti__piste", pilleri, PickingMode.Ignore);
            live = Rakenne.Teksti("LIVE", "mk-isskyyti__live", pilleri);
            tieto = Rakenne.Teksti("", "mk-isskyyti__teksti", pilleri);
            // Pillerin napautus nopeutettuna = Palaa LIVE (poimittava vain nopeutettuna).
            pilleri.AddManipulator(new Clickable(() => { if (nopeutettu) Linssi()?.AsetaNopeus(1); }));

            // Ohjaimet pillerin alla (web .iss-kyyti-ohjaimet): porras, valikko ja ylilennon rivi.
            ohjaimet = Rakenne.El("mk-isskyyti__ohjaimet", turva, PickingMode.Ignore);
            var porras = Rakenne.El("mk-isskyyti__nopeudet", ohjaimet);
            napit = new Button[Simukello.Nopeudet.Length];
            for (int i = 0; i < napit.Length; i++)
            {
                int kerroin = Simukello.Nopeudet[i];
                var b = Rakenne.Nappi(kerroin == 1 ? "LIVE" : kerroin + "×", "mk-isskyyti__nopeus", () => Linssi()?.AsetaNopeus(kerroin), porras);
                if (i > 0) b.AddToClassList("mk-isskyyti__nopeus--jatko");
                if (i == 0) b.AddToClassList("mk-isskyyti__nopeus--eka");
                if (i == napit.Length - 1) b.AddToClassList("mk-isskyyti__nopeus--vika");
                b.userData = kerroin;
                napit[i] = b;
            }
            liveNappi = napit[0].Q<Label>(className: "mk-nappi__teksti");
            valikko = Rakenne.Nappi("Lennä kohteen ylle…", "mk-isskyyti__kohteet", VaihdaLista, ohjaimet);
            valikko.tooltip = "Lennä kohteen ylle";
            lista = new ScrollView(ScrollViewMode.Vertical);
            lista.AddToClassList("mk-isskyyti__lista");
            lista.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            lista.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            lista.style.display = DisplayStyle.None;
            ohjaimet.Add(lista);
            ylilento = Rakenne.Teksti("", "mk-isskyyti__ylilento", ohjaimet);
            ylilento.pickingMode = PickingMode.Position;   // web: ohjainten lapset ottavat kosketuksen (ei vaihda tilaa)
            ylilento.style.display = DisplayStyle.None;

            var sulku = Rakenne.Nappi("×", "mk-astrokuva__sulku", Poistu, turva);
            sulku.tooltip = "Pois kyydistä";
            juuri.RegisterCallback<GeometryChangedEvent>(_ =>
            {
                var r = kerros.Reunat(LinssiUi.Kerros);
                turva.style.left = r.x; turva.style.top = r.y; turva.style.right = r.z; turva.style.bottom = r.w;
            });
        }

        static AstronauttiLinssi Linssi() => UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi;

        static void Poistu() => Linssi()?.PoistuKyydista();

        /// <summary>"Lennä kohteen ylle…": lista auki tai kiinni (täytetään ensimmäisellä avauksella linssin kohteista).</summary>
        void VaihdaLista()
        {
            if (lista.style.display == DisplayStyle.Flex) { SuljeLista(); return; }
            if (!listaTaytetty)
            {
                var kohteet = Linssi()?.YlilennonKohteet;
                if (kohteet == null || kohteet.Count == 0) return;
                listaTaytetty = true;
                foreach (var k in kohteet)
                {
                    string tunnus = k.Tunnus;
                    Rakenne.Nappi(k.Nimi, "mk-isskyyti__kohde", () => { SuljeLista(); Linssi()?.LennaKohteeseen(tunnus); }, lista);
                }
            }
            // Korkeus: rivit (28 pt) turva-alueen alareunaan asti (12 pt:n marginaali), vähintään neljä riviä; loput vierittäen.
            float tarve = lista.contentContainer.childCount * RiviPt + 2;
            float tila = turva.layout.height - (ohjaimet.layout.y + valikko.layout.yMax + 6) - 12;
            lista.style.height = float.IsNaN(tila) ? tarve : Mathf.Min(tarve, Mathf.Max(4 * RiviPt, tila));
            lista.scrollOffset = Vector2.zero;
            lista.style.display = DisplayStyle.Flex;
            peite.style.display = DisplayStyle.Flex;
        }

        void SuljeLista()
        {
            lista.style.display = DisplayStyle.None;
            peite.style.display = DisplayStyle.None;
        }

        /// <summary>AstronauttiKerros.KyytiKasittelija.</summary>
        public void Aseta(KyydinTila tila, double korkeusKm, double nopeusKmh, bool arvio, KyydinAika aika)
        {
            bool oliAuki = Tila != KyydinTila.Kauko;
            Tila = tila;
            bool auki = tila != KyydinTila.Kauko;
            juuri.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            // Nopeutettuna (web tietorivi kertoimella): "● 100× · ISS · …" ilman LIVE-sanaa, piste harmaa eikä syki.
            var rivi = KyydinTeksti.Tietorivi(korkeusKm, nopeusKmh, arvio, aika.Nopeutettu ? aika.Nopeus : (double?)null);
            if (auki) { tieto.text = rivi.Teksti; live.text = rivi.Merkki ?? ""; }
            var merkkiNakyy = auki && rivi.Merkki != null ? DisplayStyle.Flex : DisplayStyle.None;
            piste.style.display = merkkiNakyy; live.style.display = merkkiNakyy;
            nopeutettu = auki && aika.Nopeutettu;
            pilleri.EnableInClassList("mk-isskyyti__tieto--nopeutettu", nopeutettu);
            pilleri.pickingMode = nopeutettu ? PickingMode.Position : PickingMode.Ignore;
            pilleri.tooltip = nopeutettu ? "Palaa LIVE" : null;
            Syke(auki && rivi.Live);
            // Porras: valittu kerroin (kelauksessa ei mitään), nopeutettuna LIVE-nappi on "Palaa LIVE"; ylilennon rivi.
            var valittu = aika.Valittu;
            foreach (var b in napit) b.EnableInClassList("mk-isskyyti__nopeus--valittu", valittu.HasValue && (int)b.userData == valittu.Value);
            liveNappi.text = aika.Nopeutettu ? "Palaa LIVE" : "LIVE";
            ylilento.text = aika.Ylilento ?? "";
            ylilento.style.display = auki && aika.Ylilento != null ? DisplayStyle.Flex : DisplayStyle.None;
            if (!auki) SuljeLista();
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
            // A/B pehmeä ↔ terävä: haetaan kerrokset uudelleen (Aseta kutsuu tätä sekunnin välein).
            if (kuva2Haettu && haettuSarja != Sarja) { kuva2Haettu = false; Kuva2Tila = null; }
            bool vanha = ikkuna && !IlmanKehysta && CupolaKerros.Vanha;
            bool uusi = ikkuna && !IlmanKehysta && CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kuva && Kuva2Tila == true;
            if (vanha && !kuvatHaettu) HaeKuvat();
            if (ikkuna && !kuva2Haettu && CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kuva) HaeKuvat2();
            juuri.EnableInClassList("mk-isskyyti--ikkuna", vanha);
            juuri.EnableInClassList("mk-isskyyti--kuva2", uusi);
            Heilu(vanha || uusi);
            // Lasin zoom (IssKuvakulma.LasiZoom) myös ilman ajelehdusta (vähennetty liike tai A/B): kerrokset lepoasentoon.
            if (!(heiluu && Ajelehdus)) AjelehdusLepoon();
            PolytPaalle(ikkuna && !IlmanKehysta && (vanha || uusi || KolmiulotteinenKehys));
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
            haettuSarja = Sarja;
            bool ipad = Screen.width > 0.5f * Screen.height;
            string koko = ipad ? "ipad-1536x2732" : "iphone-1206x2622";
            string sarja = string.IsNullOrEmpty(Sarja) ? "iss-cupola2-" : "iss-cupola2-" + Sarja + "-";
            int odottaa = 3;
            bool kehysOk = false;
            void Valmis(VisualElement e, Texture2D t)
            {
                if (t != null) e.style.backgroundImage = t;
                if (e == kehys2) kehysOk = t != null;
                if (--odottaa > 0) return;
                Kuva2Tila = kehysOk;
                Debug.Log($"MATKAKIRJA linssit: cupola2 {(kehysOk ? "valmis" : "kehys ei latautunut, 3D-kehys varalla")} ({sarja}{koko})");
                PaivitaKehys();
            }
            Kuvat.Hae(Juuri2 + sarja + "ulkoosat-" + koko + ".png", t => Valmis(ulko2, t));
            Kuvat.Hae(Juuri2 + sarja + "heijastus-" + koko + ".png", t => Valmis(heijastus2, t));
            Kuvat.Hae(Juuri2 + sarja + "kehys-" + koko + ".png", t => Valmis(kehys2, t));
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
            AjelehdusLepoon();
            if (!paalla) return;
            float t0 = Time.unscaledTime;
            // Heijastus lasissa ja ulko-osat lasin takana liikkuvat hitaasti vastakkain (katsojan pää liikkuu): syvyys.
            heilunta = heijastus.schedule.Execute(() =>
            {
                float u = (Time.unscaledTime - t0) / 8f * 2f * Mathf.PI;
                var h = new Translate(3f * Mathf.Sin(u), 2f * Mathf.Sin(u * 0.5f));
                heijastus.style.translate = heijastus2.style.translate = h;
                ulko2.style.translate = new Translate(-1.6f * Mathf.Sin(u), -1f * Mathf.Sin(u * 0.5f));
                if (Ajelehdus) Ajelehdi(Time.unscaledTime - t0, h);
                else AjelehdusLepoon();
            }).Every(33);
        }

        /// <summary>
        /// PAINOTON AJELEHDUS (omistaja 28.9. klo 16.3x Päätoimittajan kautta: "pitäisikö kameran liikkua hieman sisällä (eteen,
        /// taakse ja sivuille) niin että lasin muoto ja näkymä eläisivät hieman kuin kamera olisi painottomassa tilassa kuvun
        /// sisällä?"): katsojan pää ajelehtii hitaasti (jaksot 23–47 s, useampi sini, jotta liike ei toistu), joten lähellä oleva
        /// kehys ja lasin heijastus siirtyvät ja skaalautuvat, ulko-osat (~10 m) vain kymmenesosan, ja maa pysyy (parallaksi).
        /// Kallistus enintään 0,5°. Kehys on skaalattu 1,08:aan, jotta reunat eivät tule näkyviin siirtymän ja kierron aikana.
        /// Vähennetty liike: pois (Heilu ei käynnisty). A/B `astro kyyti ajelehdus 0|1`.
        /// </summary>
        public static bool Ajelehdus = true;
        const float AjelehdusX = 8f, AjelehdusY = 7f, AjelehdusSkaala = 0.015f, AjelehdusKallistus = 0.5f, KehysPohja = 1.08f;

        void Ajelehdi(float t, Translate heijastuksenOma)
        {
            const float tau = 2f * Mathf.PI;
            float x = AjelehdusX * (0.6f * Mathf.Sin(tau * t / 31f) + 0.4f * Mathf.Sin(tau * t / 47f + 1.3f));
            float y = AjelehdusY * (0.6f * Mathf.Sin(tau * t / 23f + 0.7f) + 0.4f * Mathf.Sin(tau * t / 41f + 2.1f));
            float z = Mathf.Sin(tau * t / 37f + 0.4f);
            float kulma = AjelehdusKallistus * Mathf.Sin(tau * t / 29f + 1.1f);
            // Lähellä: kehys ja lasin heijastus (pää liikkuu, lähellä oleva siirtyy vastakkain); heijastuksen oma heilunta päälle.
            // Pohja on lasin zoom (1,3) tai vähintään KehysPohja, jotta reunat eivät tule näkyviin.
            float pohja = Mathf.Max(LasinZoom, KehysPohja);
            var lahi = new Scale(Vector3.one * (pohja + AjelehdusSkaala * z));
            kehys2.style.translate = new Translate(-x, -y);
            kehys2.style.scale = lahi;
            kehys2.style.rotate = new Rotate(-kulma);
            heijastus2.style.translate = new Translate(heijastuksenOma.x.value - x, heijastuksenOma.y.value - y);
            heijastus2.style.scale = lahi;
            heijastus2.style.rotate = new Rotate(-kulma);
            // Kaukana: ulko-osat kymmenesosan, kallistus sama (pään kierto kääntää kaiken).
            var ulko = ulko2.style.translate.value;
            ulko2.style.translate = new Translate(ulko.x.value - 0.1f * x, ulko.y.value - 0.1f * y);
            ulko2.style.scale = new Scale(Vector3.one * (pohja + 0.1f * AjelehdusSkaala * z));
            ulko2.style.rotate = new Rotate(-kulma);
        }

        /// <summary>Ajelehdus pois (A/B tai vähennetty liike): kerrokset lepoasentoon (skaala = lasin zoom, ei kiertoa).</summary>
        void AjelehdusLepoon()
        {
            var zoom = new Scale(Vector3.one * LasinZoom);
            foreach (var e in new[] { kehys2, heijastus2, ulko2 })
            {
                e.style.scale = zoom;
                e.style.rotate = StyleKeyword.Null;
            }
            kehys2.style.translate = StyleKeyword.Null;
        }

        /// <summary>Cupola-kerrosten suurennos: sama kuin ikkunan kenttäkulman zoom (IssKuvakulma.LasiZoom), vähintään 1.</summary>
        static float LasinZoom => Mathf.Max(1f, (float)IssKuvakulma.LasiZoom);

        /// <summary>
        /// PÖLYHIUKKASET AURINGONSÄTEESSÄ (Päätoimittajan käsky 28.9. klo 16.3x): 34 pehmeää hiukkasta leijuu kuvun sisällä ja
        /// näkyy vain vinossa valokeilassa, kun ISS on auringossa (CupolaKerros.Valo.w, maan varjo); yöpuolella ei mitään.
        /// Keila tulee auringon suunnasta ruudulla (Valo.xy; suoraan edessä tai takana oletusvinous ylävasemmalta), joten se
        /// kääntyy hitaasti ISS:n kiertäessä. Hiukkanen on kolme sisäkkäistä ympyrää (pehmeä reuna, isommat epätarkempia) ja
        /// välähtää kääntyessään (tuike). Liike 0,6–2 pt/s ja kevyt pyörre; vähennetyllä liikkeellä paikallaan.
        /// A/B `astro kyyti polyt 0|1`.
        /// </summary>
        public static bool Polyt = true;
        const int PolyMaara = 34;
        /// <summary>Keilan puolileveys (σ) osuutena ruudun lyhyemmästä sivusta ja hiukkasen suurin peitto.</summary>
        const float KeilaOsuus = 0.2f, PolyPeitto = 0.65f;
        /// <summary>Hiukkaset: paikka 0–1 (u, v), säde pt ja tuikkeen vaihe; nopeus pt/s.</summary>
        readonly Vector4[] poly = new Vector4[PolyMaara];
        readonly Vector2[] polyNopeus = new Vector2[PolyMaara];
        bool polytAlustettu, polytPaalla;
        float polyAika, polyEdellinen;
        IVisualElementScheduledItem polyAjo;

        void PolytPaalle(bool paalla)
        {
            paalla &= Polyt;
            if (paalla == polytPaalla) return;
            polytPaalla = paalla;
            polyAjo?.Pause();
            polyt.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
            if (!paalla) return;
            if (!polytAlustettu)
            {
                polytAlustettu = true;
                var r = new System.Random(28092026);
                for (int i = 0; i < PolyMaara; i++)
                {
                    // Muutama iso ja epätarkka lähellä katsojaa, loput pieniä.
                    float sade = i < 5 ? 3f + 1.5f * (float)r.NextDouble() : 1.2f + 1.6f * (float)r.NextDouble();
                    poly[i] = new Vector4((float)r.NextDouble(), (float)r.NextDouble(), sade, (float)(r.NextDouble() * 6.283));
                    float suunta = (float)(r.NextDouble() * 6.283), vauhti = 0.6f + 1.4f * (float)r.NextDouble();
                    polyNopeus[i] = new Vector2(Mathf.Cos(suunta), Mathf.Sin(suunta)) * vauhti;
                }
            }
            polyEdellinen = Time.unscaledTime;
            // Kuten heilunta: 30 kertaa sekunnissa, vain ikkunassa; valo luetaan joka piirrossa (keila kääntyy ISS:n mukana).
            polyAjo = polyt.schedule.Execute(() =>
            {
                float nyt = Time.unscaledTime, dt = Mathf.Min(0.1f, nyt - polyEdellinen);
                polyEdellinen = nyt;
                if (!LinssiUi.VahennettyLiike()) polyAika += dt;
                polyt.MarkDirtyRepaint();
            }).Every(33);
        }

        void PiirraPolyt(MeshGenerationContext mgc)
        {
            float w = polyt.contentRect.width, h = polyt.contentRect.height;
            if (!(w > 0) || !(h > 0) || !CupolaKerros.ValoTiedossa) return;
            var valo = CupolaKerros.Valo;
            float aurinko = Mathf.Clamp01(valo.w);
            if (aurinko < 0.01f) return;
            // Keilan suunta ruudulla (y alas): valo kulkee auringosta poispäin, eli (−x, +y); suoraan edessä tai takana vinosti.
            var suunta = new Vector2(-valo.x, valo.y);
            if (suunta.sqrMagnitude < 0.04f) suunta = new Vector2(0.55f, 0.83f);
            suunta.Normalize();
            var normaali = new Vector2(-suunta.y, suunta.x);
            var keski = new Vector2(w * 0.5f, h * 0.45f);
            float sigma = KeilaOsuus * Mathf.Min(w, h);
            var p = mgc.painter2D;
            bool liikkuu = !LinssiUi.VahennettyLiike();
            for (int i = 0; i < PolyMaara; i++)
            {
                var q = poly[i];
                var v = polyNopeus[i];
                // Ajelehdus ja pyörre (pieni sini), kiedottuna ruudun ympäri.
                float x = q.x * w + v.x * polyAika + (liikkuu ? 6f * Mathf.Sin(0.21f * polyAika + q.w) : 0f);
                float y = q.y * h + v.y * polyAika + (liikkuu ? 5f * Mathf.Cos(0.17f * polyAika + 1.7f * q.w) : 0f);
                x = Mathf.Repeat(x, w); y = Mathf.Repeat(y, h);
                float etaisyys = Vector2.Dot(new Vector2(x, y) - keski, normaali) / sigma;
                float keila = Mathf.Exp(-etaisyys * etaisyys);
                float tuike = liikkuu ? 0.6f + 0.4f * Mathf.Sin(1.3f * polyAika + 3f * q.w) : 0.8f;
                float b = PolyPeitto * aurinko * keila * tuike;
                if (b < 0.01f) continue;
                var c = new Vector2(x, y);
                for (int k = 0; k < 3; k++)
                {
                    float sade = q.z * (k == 0 ? 1.8f : k == 1 ? 1.1f : 0.55f);
                    float a = b * (k == 0 ? 0.18f : k == 1 ? 0.35f : 0.8f);
                    p.fillColor = new Color(1f, 0.96f, 0.88f, a);
                    p.BeginPath();
                    p.Arc(c, sade, Angle.Degrees(0f), Angle.Degrees(360f));
                    p.Fill();
                }
            }
        }

        /// <summary>Linssi vaihtui tai suljettiin: kyydin UI pois.</summary>
        public void Pois() { if (Tila != KyydinTila.Kauko) Aseta(KyydinTila.Kauko, 0, 0, false, default); }
    }
}
