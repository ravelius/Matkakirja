// ISS-OHJAAMO (omistaja 4.10.2026 klo 11.40 "ISS-OHJAAMO UUSIKSI", vaihe 2; Natiivi-UI, logiikka Linssiseppä 2:n
// AstronauttiLinssi: Joystick, AsetaKaasu/Kaasu, Sijainti, Kuvauspaikka). Pohja Pohjat/iss-ohjaamo.uss (tyylikirja ISS-OHJAAMO).
//
//   ┌──────────────────────────────────────────────────────────┐
//   │   ▲                                        (◉)    ║▬║    │   vasen   JOYSTICK plus-muotoinen: yksi suunta kerrallaan,
//   │ ◀ ● ▶   │ ROOMA            │        kamera   ║ ║    │           liike pidon ajan, irrotus pysäyttää
//   │   ▼     │ I T A L I A      │                (100×)   │   keski   LCD vihreä: lähin kohde isolla, maa alla pienempänä
//   └──────────────────────────────────────────────────────────┘           ja leveämmällä kirjainvälillä (VT323)
//                                                                   oikea   KAMERA pyöreä (Cupolassa kaikkialla), KAASU vipu
//                                                                           neljällä pykälällä, juuressa pyöreä kolo, jossa
//                                                                           numerorumpu 1/10/100/1000 × (DSEG7): vanha luku
//                                                                           liukuu piiloon ja uusi esiin (200 ms)
// MININÄYTTÖ: napautus ohjaamon ulkopuolelle (pallo, lasi) pienentää paneelin yksiriviseksi LCD-näytöksi "ROOMA · ITALIA";
// mininäytön napautus palauttaa (Tyylikirja.Kesto.Avaus/Sulku). Muut entiset napit (nopeusporras, pilvet, kohdelista,
// poistu) pois; vuodenaika, vuorokausi ja kohdelista tulevat LCD:n laajennukseen (vaihe 3).
// Peitto puhelimella noin 15 % (paneeli 128 pt / 874 pt); mininäyttö 36 pt.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IssOhjaamo
    {
        /// <summary>Paneelin ja mininäytön yhteinen juuri (turva-alueen alareunaan keskelle).</summary>
        public readonly VisualElement Juuri;
        readonly VisualElement paneeli, joystick, napa, lcd, mini, kaasu, ura, kahva, rumpu, luvut;
        readonly VisualElement[] varret = new VisualElement[5];
        readonly Label kohde, maa, miniTeksti, rumpuA, rumpuB;
        readonly Button kamera;
        readonly Func<AstronauttiLinssi> linssi;
        readonly Action kuvaa;
        JoystickSuunta suunta = JoystickSuunta.Ei;
        int kaasuNyt = 1;
        bool rumpuANakyy = true;
        string lcdKohde, lcdMaa;
        IVisualElementScheduledItem kierros;

        public const float Korkeus = 128f, MiniKorkeus = 36f, Enintaan = 560f, JoystickPt = 108f;
        /// <summary>Kaasun pykälät alhaalta ylös (AstronauttiLinssi.AsetaKaasu).</summary>
        public static readonly int[] Kertoimet = { 1, 10, 100, 1000 };
        /// <summary>LCD:n kohdeteksti: suurin ja pienin koko (pitkä nimi pienenee mahtuakseen).</summary>
        public const float KohdePt = Tyylikirja.Koko.Lcd, KohdeMinPt = 17f;
        /// <summary>Kuolleen alueen säde joystickin keskellä (pt).</summary>
        public const float KuollutPt = 12f;

        public bool Mini { get; private set; }
        /// <summary>Paneelin koko vaihtui (iso ↔ mini): Pulu ja kerrosten väistöt mitataan uudelleen.</summary>
        public event Action KokoMuuttui;

        public IssOhjaamo(VisualElement isa, Func<AstronauttiLinssi> linssi, Action kuvaa)
        {
            this.linssi = linssi;
            this.kuvaa = kuvaa;
            Juuri = Rakenne.El("mk-issohjaamo", isa, PickingMode.Ignore);
            paneeli = Rakenne.El("mk-issohjaamo__paneeli tk-teema-tumma", Juuri);
            // Napautukset paneelissa eivät valu palloon (ei pienennä eikä vaihda kyydin tilaa).
            paneeli.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());

            // --- joystick: plus-muoto, neljä vartta ja napa --------------------------------------------------------
            joystick = Rakenne.El("mk-issohjaamo__joystick", paneeli);
            joystick.tooltip = "Ohjaa aluksen asentoa";
            Rakenne.El("mk-issohjaamo__keski", joystick, PickingMode.Ignore);
            string[] nimet = { "napa", "ylos", "alas", "vasen", "oikea" };
            for (int i = 1; i < 5; i++)
            {
                varret[i] = Rakenne.El("mk-issohjaamo__varsi mk-issohjaamo__varsi--" + nimet[i], joystick, PickingMode.Ignore);
                var nuoli = Rakenne.Ikoni(Kulma, "mk-issohjaamo__nuoli", varret[i]);
                nuoli.pickingMode = PickingMode.Ignore;
                nuoli.style.rotate = new Rotate(new Angle(i == 1 ? 0 : i == 2 ? 180 : i == 3 ? 270 : 90));
            }
            napa = Rakenne.El("mk-issohjaamo__napa", joystick, PickingMode.Ignore);
            // Osuma-ala näkymättömänä 132 × 132 pt (Päätoimittaja 4.10.: jokaiselle varrelle ≥ 44 × 44 pt; varsi 32 pt, ulkoasu ennallaan).
            joystick.pickingMode = PickingMode.Ignore;
            osuma = Rakenne.El("mk-issohjaamo__joyosuma", joystick);
            Vector2 Paikka(Vector3 ruutu) => joystick.WorldToLocal(ruutu);
            osuma.RegisterCallback<PointerDownEvent>(e => { osuma.CapturePointer(e.pointerId); Ohjaa(Paikka(e.position)); e.StopPropagation(); });
            osuma.RegisterCallback<PointerMoveEvent>(e => { if (osuma.HasPointerCapture(e.pointerId)) Ohjaa(Paikka(e.position)); });
            osuma.RegisterCallback<PointerUpEvent>(e => { osuma.ReleasePointer(e.pointerId); AsetaSuunta(JoystickSuunta.Ei); });
            osuma.RegisterCallback<PointerCancelEvent>(_ => AsetaSuunta(JoystickSuunta.Ei));
            osuma.RegisterCallback<PointerCaptureOutEvent>(_ => AsetaSuunta(JoystickSuunta.Ei));

            // --- LCD: kohde isolla, maa alla ---------------------------------------------------------------------
            lcd = Rakenne.El("mk-issohjaamo__lcd", paneeli);
            kohde = Rakenne.Teksti("", "mk-issohjaamo__kohde", lcd);
            maa = Rakenne.Teksti("", "mk-issohjaamo__maa", lcd);
            foreach (var t in new[] { kohde, maa }) { t.pickingMode = PickingMode.Ignore; Kirjasimet.Aseta(t, Kirjasin.Lcd); }
            lcd.RegisterCallback<GeometryChangedEvent>(_ => SovitaKohde());
            lcd.tooltip = "Näytön asetukset";
            lcd.AddManipulator(new Clickable(() => AsetaLaajennus(true)));

            // --- kamera ja kaasu ------------------------------------------------------------------------------------
            kamera = Rakenne.Nappi(null, "mk-issohjaamo__kamera", Laukaise, paneeli, Kamera);
            kamera.tooltip = "Ota tarkka ISS-kuva";
            kamera.SetEnabled(false);
            kamera.RegisterCallback<PointerDownEvent>(_ => PaivitaNahkaTila(true), TrickleDown.TrickleDown);
            kamera.RegisterCallback<PointerUpEvent>(_ => PaivitaNahkaTila(false), TrickleDown.TrickleDown);
            kamera.RegisterCallback<PointerLeaveEvent>(_ => PaivitaNahkaTila(false));
            kaasu = Rakenne.El("mk-issohjaamo__kaasu", paneeli);
            kaasu.tooltip = "Kaasu: ajan nopeus";
            ura = Rakenne.El("mk-issohjaamo__ura", kaasu, PickingMode.Ignore);
            for (int i = 0; i < Kertoimet.Length; i++) Rakenne.El("mk-issohjaamo__pykala", ura, PickingMode.Ignore);
            kahva = Rakenne.El("mk-issohjaamo__kahva", ura, PickingMode.Ignore);
            rumpu = Rakenne.El("mk-issohjaamo__rumpu", kaasu, PickingMode.Ignore);
            luvut = Rakenne.El("mk-issohjaamo__luvut", rumpu, PickingMode.Ignore);
            rumpuA = Rakenne.Teksti("1", "mk-issohjaamo__luku", luvut);
            rumpuB = Rakenne.Teksti("", "mk-issohjaamo__luku", luvut);
            foreach (var t in new[] { rumpuA, rumpuB }) { t.pickingMode = PickingMode.Ignore; Kirjasimet.Aseta(t, Kirjasin.Lcd); }
            rumpuB.style.translate = new Translate(0, Length.Percent(100));
            kerta = Rakenne.Teksti("×", "mk-issohjaamo__kerta", rumpu);
            Kirjasimet.Aseta(kerta, Kirjasin.Lcd);
            kaasu.RegisterCallback<PointerDownEvent>(e => { kaasu.CapturePointer(e.pointerId); Vipu(e.localPosition.y); e.StopPropagation(); });
            kaasu.RegisterCallback<PointerMoveEvent>(e => { if (kaasu.HasPointerCapture(e.pointerId)) Vipu(e.localPosition.y); });
            kaasu.RegisterCallback<PointerUpEvent>(e => kaasu.ReleasePointer(e.pointerId));
            ura.RegisterCallback<GeometryChangedEvent>(_ => AsetaKahva());

            RakennaLaajennus();
            KaytaNahka();

            // --- mininäyttö --------------------------------------------------------------------------------------
            mini = Rakenne.El("mk-issohjaamo__mini", Juuri);
            mini.tooltip = "Avaa ohjaamo";
            miniTeksti = Rakenne.Teksti("", "mk-issohjaamo__miniteksti", mini);
            miniTeksti.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(miniTeksti, Kirjasin.Lcd);
            mini.style.display = DisplayStyle.None;
            mini.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            mini.AddManipulator(new Clickable(() => AsetaMini(false)));
        }

        // --- KUVANAHKA (omistaja 4.10.2026 klo 16.4x: "ei näytä avaruusaluksen ohjaimilta"; Codexin grafiikka, Päätoimittaja) ---------
        // Resources/IssOhjaamo/*.png (@3x, alfa) korvaavat piirretyt osat tiloineen; puuttuva kuva = osa piirretään kuten ennen.
        //   pohja (9-slice 24 pt)            paneelin tausta          lcd-kehys, lcd-iso, mini-kehys (9-slice 10 pt)
        //   sauva-ei|ylos|alas|vasen|oikea   joystick 96 × 96 pt      kaasu-1|10|100|1000   vipu 56 × 52 pt
        //   kamera, kamera-painettu          Ø 48 pt                  rumpu-kolo            Ø 56 pt (numerot koodissa)
        // A/B `astro kyyti ohjaamo nahka 0|1`.

        public static bool NahkaKaytossa = true;
        public const string NahkaKansio = "IssOhjaamo/";
        public const float NahkaSkaala = 3f, PohjaSlicePt = 24f, KehysSlicePt = 10f;
        static readonly Dictionary<string, Texture2D> nahkaKuvat = new Dictionary<string, Texture2D>();
        VisualElement sauvaKuva, kaasuKuva;
        bool nahka;

        static Texture2D NahkaKuva(string nimi)
        {
            if (!NahkaKaytossa) return null;
            if (!nahkaKuvat.TryGetValue(nimi, out var t)) nahkaKuvat[nimi] = t = Resources.Load<Texture2D>(NahkaKansio + nimi);
            return t;
        }

        /// <summary>Kuva osalle: tausta kuvaksi ja piirretty ulkoasu pois (luokka mk-issohjaamo--kuva); 9-slice pt-reunoilla.</summary>
        static bool Pukeudu(VisualElement e, string nimi, float slicePt = 0f)
        {
            var t = NahkaKuva(nimi);
            e.EnableInClassList("mk-issohjaamo--kuva", t != null);
            if (t == null) { e.style.backgroundImage = StyleKeyword.Null; return false; }
            e.style.backgroundImage = new StyleBackground(t);
            if (slicePt > 0f)
            {
                int px = Mathf.RoundToInt(slicePt * NahkaSkaala);
                e.style.unitySliceLeft = px; e.style.unitySliceRight = px; e.style.unitySliceTop = px; e.style.unitySliceBottom = px;
                e.style.unitySliceScale = 1f / NahkaSkaala;
            }
            return true;
        }

        /// <summary>Nahka osiin (kuvien puuttuessa ei mitään); kutsutaan rakennettaessa ja A/B-vaihdossa.</summary>
        public void KaytaNahka()
        {
            nahkaKuvat.Clear();
            // Kuva-asettelu: pohja kokonaisena (ei 9-slice), rumpu omaan ankkuriinsa paneeliin, osat ohjaamo.json:n mukaan.
            ankkurit = NahkaKuva("pohja") != null ? LueAnkkurit() : null;
            nahka = Pukeudu(paneeli, "pohja", ankkurit != null ? 0f : PohjaSlicePt);
            paneeli.EnableInClassList("mk-issohjaamo--asettelu", ankkurit != null);
            if (ankkurit != null && rumpu.parent != paneeli) paneeli.Add(rumpu);
            else if (ankkurit == null && rumpu.parent != kaasu) kaasu.Add(rumpu);
            Pukeudu(lcd, "lcd-kehys", KehysSlicePt);
            Pukeudu(laajennus, "lcd-iso", ankkurit != null ? 0f : KehysSlicePt);
            Pukeudu(mini, "mini-kehys", ankkurit != null && ankkurit.MiniSlice > 0 ? ankkurit.MiniSlice : KehysSlicePt);
            // Rummun kolo numeroiden päälle omana elementtinään (piirtojärjestys pohja → numerot → kolo); piirretyssä tilassa kolo
            // on rummun oma kehys.
            rumpuKoloKuva ??= Rakenne.El("mk-issohjaamo__rumpukolo", paneeli, PickingMode.Ignore);
            if (ankkurit != null) { Pukeudu(rumpuKoloKuva, "rumpu-kolo"); rumpuKoloKuva.style.display = DisplayStyle.Flex; rumpuKoloKuva.BringToFront(); laajennus.BringToFront(); }
            else { rumpuKoloKuva.style.display = DisplayStyle.None; Pukeudu(rumpu, "rumpu-kolo"); }
            rumpu.EnableInClassList("mk-issohjaamo__rumpu--mekaaninen", ankkurit != null);
            // Mittarifontti kuvapaneelissa (DIN Condensed kuten kaiverrukset), muuten LCD-fontti VT323.
            var kirjain = ankkurit != null ? Kirjasin.Mittari : Kirjasin.Lcd;
            foreach (var t in new[] { kohde, maa, rumpuA, rumpuB, kerta, miniTeksti }) Kirjasimet.Aseta(t, kirjain);
            if (turvaLeveys > 0) Asettele(turvaLeveys);
            Pukeudu(kamera, "kamera");
            kamera.EnableInClassList("mk-issohjaamo--kuvanappi", NahkaKuva("kamera") != null);
            // Sauva ja vipu: kuvaelementti piirrettyjen osien päälle, tila vaihtaa kuvan.
            sauvaKuva ??= Rakenne.El("mk-issohjaamo__sauvakuva", joystick, PickingMode.Ignore);
            kaasuKuva ??= Rakenne.El("mk-issohjaamo__kaasukuva", kaasu, PickingMode.Ignore);
            joystick.EnableInClassList("mk-issohjaamo--kuvat", NahkaKuva("sauva-ei") != null);
            kaasu.EnableInClassList("mk-issohjaamo--kuvat", NahkaKuva("kaasu-1") != null);
            PaivitaNahkaTila();
            Debug.Log($"MATKAKIRJA linssit: ohjaamon nahka {(nahka ? "kuvat" : "piirretty")} (pohja {(NahkaKuva("pohja") != null)}, sauva {(NahkaKuva("sauva-ei") != null)}, kaasu {(NahkaKuva("kaasu-1") != null)}, kamera {(NahkaKuva("kamera") != null)})");
        }

        void PaivitaNahkaTila(bool painettu = false)
        {
            string sauva = suunta switch
            {
                JoystickSuunta.Ylos => "sauva-ylos", JoystickSuunta.Alas => "sauva-alas",
                JoystickSuunta.Vasen => "sauva-vasen", JoystickSuunta.Oikea => "sauva-oikea", _ => "sauva-ei",
            };
            var st = NahkaKuva(sauva) ?? NahkaKuva("sauva-ei");
            sauvaKuva.style.backgroundImage = st != null ? new StyleBackground(st) : StyleKeyword.Null;
            var kt = NahkaKuva("kaasu-" + kaasuNyt);
            kaasuKuva.style.backgroundImage = kt != null ? new StyleBackground(kt) : StyleKeyword.Null;
            var kk = painettu ? NahkaKuva("kamera-painettu") ?? NahkaKuva("kamera") : NahkaKuva("kamera");
            if (kk != null) kamera.style.backgroundImage = new StyleBackground(kk);
        }

        // --- LCD:n laajennus (vaihe 3) ----------------------------------------------------------------------------
        //   ┌────────┬──────────────────────────────┬────────┐   omistaja: "Näyttöä klikkaamalla näyttö suurenee peittäen muut
        //   │        │ TALVI  KEVÄT  KESÄ   SYKSY    │        │   ohjaimet alleen … talvi, kevät, kesä, syksy ja alempi rivi:
        //   │SIJAINTI│ AAMU   PÄIVÄ  ILTA   YÖ       │   OK   │   aamu, päivä, ilta ja yö … oikeassa reunassa tuplakorkea
        //   └────────┴──────────────────────────────┴────────┘   neliö "ok" … vasemmassa samanlainen "sijainti""

        VisualElement laajennus;
        readonly Button[] kausiNapit = new Button[4], vuorokausiNapit = new Button[4];
        /// <summary>Vuodenaika 0–3 (talvi, kevät, kesä, syksy) ja nykyinen (IssKyytiNakyma).</summary>
        public Action<int> AsetaKausi;
        public Func<int> KausiNyt;
        /// <summary>Vuorokausi 0–3 (aamu, päivä, ilta, yö) ja nykyinen (Iss.Vuorokausi.Valittu tai LIVE-hetken).</summary>
        public Action<int> AsetaVuorokausi;
        public Func<int> VuorokausiNyt;
        /// <summary>SIJAINTI: kohdelistan ikkuna (IssSijaintiIkkuna).</summary>
        public Action AvaaSijainti;
        public bool Laajennettu { get; private set; }
        /// <summary>LCD:n keskipiste ruudulla (sijainti-ikkuna kasvaa siitä).</summary>
        public Vector2 LcdKeski => (Laajennettu ? laajennus : lcd).worldBound.center;

        void RakennaLaajennus()
        {
            laajennus = Rakenne.El("mk-issohjaamo__laajennus", paneeli);
            laajennus.style.display = DisplayStyle.None;
            var sijainti = Nappi("SIJAINTI", "mk-issohjaamo__iso", laajennus, () => AvaaSijainti?.Invoke());
            sijainti.tooltip = "Valitse kohde listalta";
            var rivit = Rakenne.El("mk-issohjaamo__rivit", laajennus, PickingMode.Ignore);
            var r1 = Rakenne.El("mk-issohjaamo__rivi", rivit, PickingMode.Ignore);
            var r2 = Rakenne.El("mk-issohjaamo__rivi", rivit, PickingMode.Ignore);
            for (int i = 0; i < 4; i++)
            {
                int k = i;
                kausiNapit[i] = Nappi(Vuodenaika.Nimet[i].ToUpperInvariant(), null, r1, () => { AsetaKausi?.Invoke(k); PaivitaLaajennus(); });
                vuorokausiNapit[i] = Nappi(Vuorokausi.Nimet[i].ToUpperInvariant(), null, r2, () => { AsetaVuorokausi?.Invoke(k); PaivitaLaajennus(); });
            }
            Nappi("OK", "mk-issohjaamo__iso", laajennus, () => AsetaLaajennus(false)).tooltip = "Takaisin sijaintiin";
        }

        Button Nappi(string teksti, string lisa, VisualElement isa, Action painettu)
        {
            var b = Rakenne.Nappi(teksti, "mk-issohjaamo__lcdnappi" + (lisa != null ? " " + lisa : ""), painettu, isa);
            var t = b.Q<Label>(className: "mk-nappi__teksti");
            if (t != null) Kirjasimet.Aseta(t, Kirjasin.Lcd); else Kirjasimet.Aseta(b, Kirjasin.Lcd);
            return b;
        }

        /// <summary>LCD laajenee ohjainten päälle (kasvaa LCD:n kohdalta) tai palaa sijaintinäytöksi.</summary>
        public void AsetaLaajennus(bool auki)
        {
            if (Laajennettu && auki) { PaivitaLaajennus(); return; }
            if (Laajennettu == auki || Mini) return;
            Laajennettu = auki;
            if (auki)
            {
                AsetaSuunta(JoystickSuunta.Ei);
                PaivitaLaajennus();
                Ponnahdus.Avaa(laajennus, lcd.worldBound.center);
            }
            else Ponnahdus.Sulje(laajennus);
            Debug.Log("MATKAKIRJA linssit: ohjaamon LCD " + (auki ? "laajennettu" : "sijainniksi"));
        }

        void PaivitaLaajennus()
        {
            int kausi = KausiNyt?.Invoke() ?? -1, vk = VuorokausiNyt?.Invoke() ?? -1;
            for (int i = 0; i < 4; i++)
            {
                kausiNapit[i].EnableInClassList("mk-valittu", i == kausi);
                vuorokausiNapit[i].EnableInClassList("mk-valittu", i == vk);
            }
        }

        // --- elinkaari --------------------------------------------------------------------------------------------

        /// <summary>Kyydin tila vaihtui: paneeli näkyy Cupolassa (ikkuna ja kohteen yllä); muualla joystick vapautuu.</summary>
        public void Nayta(bool auki)
        {
            Juuri.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            if (!auki)
            {
                AsetaSuunta(JoystickSuunta.Ei);
                kierros?.Pause();
                return;
            }
            if (kierros == null) kierros = Juuri.schedule.Execute(Paivita).Every(250);
            else kierros.Resume();
            Paivita();
        }

        /// <summary>Paneelin leveys: turva-alue − 24, enintään 560 pt, keskellä; alareuna turva-alueen sisällä 8 pt.</summary>
        float turvaLeveys;

        public void Asettele(float turvanLeveys)
        {
            if (!(turvanLeveys > 0)) return;
            turvaLeveys = turvanLeveys;
            float w = Mathf.Min(Enintaan, turvanLeveys - 24f);
            paneeli.style.width = w;
            Juuri.style.left = 0; Juuri.style.right = 0;
            if (ankkurit != null) AsetteleKuvat(w);
            else
            {
                paneeli.style.height = StyleKeyword.Null;
                foreach (var e in new[] { joystick, lcd, kamera, kaasu, rumpu, laajennus }) Vapauta(e);
                osuma.style.left = StyleKeyword.Null; osuma.style.top = StyleKeyword.Null; osuma.style.width = StyleKeyword.Null; osuma.style.height = StyleKeyword.Null;
                foreach (var e in new VisualElement[] { maa, rumpuA, rumpuB, kerta, luvut }) { e.style.fontSize = StyleKeyword.Null; e.style.height = StyleKeyword.Null; }
                laajennus.style.paddingLeft = laajennus.style.paddingTop = laajennus.style.paddingRight = laajennus.style.paddingBottom = StyleKeyword.Null;
                mittakaava = 1f;
                SovitaKohde();
            }
        }

        // --- KUVA-ASETTELU (Linnanrakentajan konsepti v1, omistaja 4.10.2026 klo 17.2x; juna 139) -----------------------------
        // Resources/IssOhjaamo/ohjaamo.json: {"koko":{w,h}, "sauva"|"lcd"|"kamera"|"rumpu"|"kaasu"|"lcdIso":{x,y,w,h} pt pohjan
        // vasemmasta yläkulmasta, "kaasu":{…, "pykalat":[y1, y10, y100, y1000]} pt kaasun laatikon yläreunasta}. Paneeli skaalautuu
        // leveyden mukaan (korkeus koon suhteessa) ja osat sijoitetaan ankkureihin; ilman tiedostoa piirretty asettelu kuten ennen.

        sealed class Ankkurit { public Rect Koko, Sauva, Lcd, Kamera, Rumpu, RumpuKolo, Kaasu, LcdIso, LcdIsoKuva; public float[] Pykalat; public float MiniSlice; }
        Ankkurit ankkurit;

        static Rect LueRect(Dictionary<string, object> o, string avain)
        {
            var r = Rakenne.Olio(MiniJson.Kentta(o, avain));
            float F(string k) => r != null && MiniJson.Kentta(r, k) is object v ? Convert.ToSingle(v, System.Globalization.CultureInfo.InvariantCulture) : 0f;
            return r == null ? default : new Rect(F("x"), F("y"), F("w"), F("h"));
        }

        static Ankkurit LueAnkkurit()
        {
            var ta = NahkaKaytossa ? Resources.Load<TextAsset>(NahkaKansio + "ohjaamo") : null;
            if (ta == null) return null;
            try
            {
                var o = Rakenne.Olio(MiniJson.Jasenna(ta.text));
                var k = Rakenne.Olio(MiniJson.Kentta(o, "koko"));
                var a = new Ankkurit
                {
                    Koko = new Rect(0, 0, Convert.ToSingle(MiniJson.Kentta(k, "w")), Convert.ToSingle(MiniJson.Kentta(k, "h"))),
                    Sauva = LueRect(o, "sauva"), Lcd = LueRect(o, "lcd"), Kamera = LueRect(o, "kamera"),
                    Rumpu = LueRect(o, "rumpu"), Kaasu = LueRect(o, "kaasu"), LcdIso = LueRect(o, "lcdIso"),
                    RumpuKolo = LueRect(o, "rumpuKolo"), LcdIsoKuva = LueRect(o, "lcdIsoKuva"),
                };
                var ms = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(MiniJson.Kentta(o, "mini")), "slice"));
                a.MiniSlice = ms != null && MiniJson.Kentta(ms, "vasen") is object v ? Convert.ToSingle(v) : 0f;
                var p = Rakenne.Lista(MiniJson.Kentta(Rakenne.Olio(MiniJson.Kentta(o, "kaasu")), "pykalat"));
                if (p != null && p.Count == Kertoimet.Length) { a.Pykalat = new float[p.Count]; for (int i = 0; i < p.Count; i++) a.Pykalat[i] = Convert.ToSingle(p[i]); }
                return a.Koko.width > 0 && a.Koko.height > 0 ? a : null;
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA linssit: ohjaamo.json: " + e.Message); return null; }
        }

        static void Aseta(VisualElement e, Rect r, float s)
        {
            e.style.position = Position.Absolute;
            e.style.left = r.x * s; e.style.top = r.y * s; e.style.width = r.width * s; e.style.height = r.height * s;
            e.style.marginLeft = 0; e.style.marginRight = 0; e.style.marginTop = 0; e.style.marginBottom = 0;
        }

        static void Vapauta(VisualElement e)
        {
            e.style.position = StyleKeyword.Null; e.style.left = StyleKeyword.Null; e.style.top = StyleKeyword.Null;
            e.style.width = StyleKeyword.Null; e.style.height = StyleKeyword.Null;
            e.style.marginLeft = StyleKeyword.Null; e.style.marginRight = StyleKeyword.Null; e.style.marginTop = StyleKeyword.Null; e.style.marginBottom = StyleKeyword.Null;
        }

        void AsetteleKuvat(float w)
        {
            var a = ankkurit;
            float s = w / a.Koko.width;
            paneeli.style.height = a.Koko.height * s;
            Aseta(joystick, a.Sauva, s);
            // Osuma-ala sauvan laatikon ympärille: vähintään 132 pt korkea ja 18 pt yli reunojen (varsi ≥ 44 × 44 pt).
            float jw = a.Sauva.width * s, jh = a.Sauva.height * s, oh = Mathf.Max(132f, jh + 36f);
            osuma.style.left = -18f; osuma.style.width = jw + 36f; osuma.style.top = (jh - oh) * 0.5f; osuma.style.height = oh;
            Aseta(lcd, a.Lcd, s);
            Aseta(kamera, a.Kamera, s);
            Aseta(kaasu, a.Kaasu, s);
            Aseta(rumpu, a.Rumpu, s);
            if (a.RumpuKolo.width > 0 && rumpuKoloKuva != null) Aseta(rumpuKoloKuva, a.RumpuKolo, s);
            // Laajennus: lcd-iso-kuvan laatikko, sisältö lasin sisäalueelle (lcdIso) täytteenä.
            var iso = a.LcdIsoKuva.width > 0 ? a.LcdIsoKuva : a.LcdIso;
            if (iso.width > 0)
            {
                Aseta(laajennus, iso, s);
                laajennus.style.paddingLeft = (a.LcdIso.x - iso.x) * s; laajennus.style.paddingTop = (a.LcdIso.y - iso.y) * s;
                laajennus.style.paddingRight = (iso.xMax - a.LcdIso.xMax) * s; laajennus.style.paddingBottom = (iso.yMax - a.LcdIso.yMax) * s;
            }
            // Tekstit pohjan mittakaavassa (Linnanrakentaja: LCD:n rivi 1 ~15 pt, rivi 2 ≥ 10–11 pt; rummun numerot täyttävät aukon).
            mittakaava = s;
            maa.style.fontSize = MaaPt * s;
            foreach (var t in new[] { rumpuA, rumpuB }) { t.style.fontSize = a.Rumpu.height * 0.72f * s; t.style.height = a.Rumpu.height * s; }
            luvut.style.height = a.Rumpu.height * s;
            kerta.style.fontSize = a.Rumpu.height * 0.6f * s;
            SovitaKohde();
        }

        /// <summary>Kuva-asettelun tekstikoot pohjan mittakaavassa (374 pt): LCD:n rivit ja niiden alaraja.</summary>
        public const float KuvaKohdePt = 15f, KuvaKohdeMinPt = 9f, MaaPt = 10.5f;
        float mittakaava = 1f;
        VisualElement rumpuKoloKuva, osuma;
        Label kerta;

        /// <summary>Kuva-asettelussa vivun pykälä lähimmästä ankkurin y-arvosta (pt kaasun laatikon yläreunasta).</summary>
        int PykalaKuvasta(float y)
        {
            float s = ankkurit.Koko.width > 0 ? paneeli.layout.width / ankkurit.Koko.width : 1f;
            int paras = 0; float ero = float.MaxValue;
            for (int i = 0; i < ankkurit.Pykalat.Length; i++) { float d = Mathf.Abs(ankkurit.Pykalat[i] * s - y); if (d < ero) { ero = d; paras = i; } }
            return paras;
        }

        /// <summary>Paneelin (tai mininäytön) näkyvä yläreuna isän koordinaateissa: Pulu ja taulu väistävät.</summary>
        public float YlaReuna => Juuri.layout.y + (Mini ? mini.layout.y : paneeli.layout.y);

        /// <summary>Näkyvä osa ruudun koordinaateissa (osumat ja väistöt).</summary>
        public Rect Nakyva => Mini ? mini.worldBound : paneeli.worldBound;

        /// <summary>Iso ↔ mininäyttö (omistaja: napautus ohjaamon ulkopuolelle pienentää, mininäytön napautus palauttaa).</summary>
        public void AsetaMini(bool pieni)
        {
            if (Mini == pieni || Juuri.resolvedStyle.display == DisplayStyle.None) return;
            if (pieni && Laajennettu) { Laajennettu = false; Ponnahdus.Lopeta(laajennus); laajennus.style.display = DisplayStyle.None; }
            Mini = pieni;
            if (pieni) AsetaSuunta(JoystickSuunta.Ei);
            Rakenne.Nayta(paneeli, !pieni, pieni ? Tyylikirja.Kesto.Sulku : Tyylikirja.Kesto.Avaus);
            Rakenne.Nayta(mini, pieni, pieni ? Tyylikirja.Kesto.Avaus : Tyylikirja.Kesto.Sulku);
            Debug.Log("MATKAKIRJA linssit: ohjaamo " + (pieni ? "mininäytöksi" : "isoksi"));
            Juuri.schedule.Execute(() => KokoMuuttui?.Invoke()).ExecuteLater(Tyylikirja.Kesto.Avaus + 30);
        }

        /// <summary>Napautus ohjaamon ulkopuolelle (pallo, lasi): pienennä.</summary>
        public void UlkoNapautus() { if (Juuri.resolvedStyle.display != DisplayStyle.None) AsetaMini(true); }

        // --- joystick ---------------------------------------------------------------------------------------------

        void Ohjaa(Vector2 p)
        {
            var k = joystick.contentRect.center;
            float dx = p.x - k.x, dy = p.y - k.y;
            if (Mathf.Max(Mathf.Abs(dx), Mathf.Abs(dy)) < KuollutPt) { AsetaSuunta(JoystickSuunta.Ei); return; }
            // Plus-muoto: vain hallitseva akseli (yksi suunta kerrallaan).
            AsetaSuunta(Mathf.Abs(dx) > Mathf.Abs(dy) ? (dx < 0 ? JoystickSuunta.Vasen : JoystickSuunta.Oikea)
                : (dy < 0 ? JoystickSuunta.Ylos : JoystickSuunta.Alas));
        }

        /// <summary>Joystickin suunta: linssille vain muutoksessa (AstronauttiLinssi.Joystick), varsi korostuu ja napa kallistuu.</summary>
        public void AsetaSuunta(JoystickSuunta s)
        {
            if (s == suunta) return;
            suunta = s;
            for (int i = 1; i < varret.Length; i++) varret[i].EnableInClassList("mk-painettu", (int)s == i);
            const float kallistus = 7f;
            napa.style.translate = new Translate(s == JoystickSuunta.Vasen ? -kallistus : s == JoystickSuunta.Oikea ? kallistus : 0,
                s == JoystickSuunta.Ylos ? -kallistus : s == JoystickSuunta.Alas ? kallistus : 0);
            linssi()?.Joystick(s);
            Debug.Log("MATKAKIRJA linssit: ohjaamon joystick " + s);
            if (nahka || sauvaKuva != null) PaivitaNahkaTila();
        }

        public JoystickSuunta Suunta => suunta;

        // --- kaasu ------------------------------------------------------------------------------------------------

        /// <summary>Vivun veto tai napautus: lähin pykälä (ylin = 1000×).</summary>
        void Vipu(float y)
        {
            if (ankkurit?.Pykalat != null) { AsetaKaasu(Kertoimet[PykalaKuvasta(y)]); return; }
            var u = ura.layout;
            if (!(u.height > 0)) return;
            float t = Mathf.Clamp01(1f - (y - u.y) / u.height);
            int i = Mathf.Clamp(Mathf.RoundToInt(t * (Kertoimet.Length - 1)), 0, Kertoimet.Length - 1);
            AsetaKaasu(Kertoimet[i]);
        }

        /// <summary>Kaasu pykälään (linssille vain muutoksessa; naksahdus soi linssissä).</summary>
        public void AsetaKaasu(int kerroin)
        {
            if (Array.IndexOf(Kertoimet, kerroin) < 0) return;
            if (kerroin != kaasuNyt) linssi()?.AsetaKaasu(kerroin);
            NaytaKaasu(kerroin);
        }

        void NaytaKaasu(int kerroin)
        {
            if (kerroin == kaasuNyt) return;
            int suuntaY = kerroin > kaasuNyt ? -1 : 1;   // kaasu ylös: rumpu pyörii ylöspäin (uusi luku alhaalta)
            kaasuNyt = kerroin;
            AsetaKahva();
            if (kaasuKuva != null) PaivitaNahkaTila();
            var vanha = rumpuANakyy ? rumpuA : rumpuB;
            var uusi = rumpuANakyy ? rumpuB : rumpuA;
            rumpuANakyy = !rumpuANakyy;
            uusi.text = kerroin.ToString();
            // Kolon leveys luvun mukaan, jolloin "1 ×" ja "1000 ×" ovat kolossa keskellä (siirtymän ajan leveämmän mukaan).
            float Lev(Label t) => string.IsNullOrEmpty(t.text) ? 0f
                : t.MeasureTextSize(t.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x;
            float lu = Lev(uusi), lv = Lev(vanha);
            if (lu > 0) luvut.style.width = Mathf.Max(lu, lv) + 1f;
            luvut.schedule.Execute(() => { if (uusi.text == kerroin.ToString() && lu > 0) luvut.style.width = lu + 1f; }).ExecuteLater(230);
            uusi.RemoveFromClassList("mk-issohjaamo__luku--liukuu");
            uusi.style.translate = new Translate(0, Length.Percent(-suuntaY * 100));
            // Seuraavassa ruudussa siirtymä käyntiin: vanha liukuu piiloon, uusi esiin (USS translate 200 ms).
            uusi.schedule.Execute(() =>
            {
                vanha.AddToClassList("mk-issohjaamo__luku--liukuu");
                uusi.AddToClassList("mk-issohjaamo__luku--liukuu");
                vanha.style.translate = new Translate(0, Length.Percent(suuntaY * 100));
                uusi.style.translate = new Translate(0, 0);
            }).ExecuteLater(16);
        }

        void AsetaKahva()
        {
            var u = ura.layout;
            if (!(u.height > 0)) return;
            int i = Array.IndexOf(Kertoimet, kaasuNyt);
            float t = i / (float)(Kertoimet.Length - 1);
            kahva.style.top = (1f - t) * (u.height - kahva.layout.height);
        }

        public int KaasuNyt => kaasuNyt;

        /// <summary>Kameranapin keskipiste ruudulla (uusi kuva kasvaa siitä).</summary>
        public Vector2 KameraKeski => kamera.worldBound.center;

        /// <summary>Kameranapin painallus testikomennolle (sama polku kuin kosketus).</summary>
        public void PainaKamera() => Laukaise();

        /// <summary>Kameranappi: tarkka ISS-kuva (omistaja 4.10. klo 15.2x: ostot pois, kuvia rajattomasti; LS2 IssKameraKuva).</summary>
        void Laukaise()
        {
            if (!kamera.enabledSelf) return;
            kuvaa?.Invoke();
        }

        // --- LCD ja kamera ----------------------------------------------------------------------------------------

        void Paivita()
        {
            var l = linssi();
            if (l == null || !l.Auki) return;
            var (k, m) = l.Sijainti();
            if (k != lcdKohde || m != lcdMaa)
            {
                lcdKohde = k; lcdMaa = m;
                kohde.text = string.IsNullOrEmpty(k) ? "…" : k;
                maa.text = m ?? "";
                maa.style.display = string.IsNullOrEmpty(m) ? DisplayStyle.None : DisplayStyle.Flex;
                miniTeksti.text = string.IsNullOrEmpty(m) ? kohde.text : kohde.text + " · " + m;
                SovitaKohde();
            }
            if (Laajennettu) PaivitaLaajennus();
            // Kaasu muuttui muualta (testikomento, linssin nollaus): vipu ja rumpu perään.
            if (l.Kaasu != kaasuNyt) NaytaKaasu(l.Kaasu);
            // Kamera kaikkialla (loki #3934 koko Eurooppa 13.52, #3936 koko maailma 14.0x; kilpi kertoo, jos kuvaa ei saada):
            // aktiivinen Cupolassa, kun kuva ei ole jo työn alla; A/B VainKuvauspaikat rajaa kuvauspaikkoihin.
            bool kuvattavissa = l.Kyyti == KyydinTila.Ikkuna && !IssKameraKuva.Kaynnissa
                && (!IssKameraKuva.VainKuvauspaikat || l.Kuvauspaikka() != null);
            if (kamera.enabledSelf != kuvattavissa) kamera.SetEnabled(kuvattavissa);
        }

        /// <summary>
        /// Kohdenimi LCD:n leveyteen: lyhyt pysyy isona (30 pt); pitkä pienenee yhdellä rivillä 22 pt:iin asti, ja sitä pidempi
        /// rivittyy kahdelle riville (ATLANTIN / VALTAMERI) pisimmän sanan mukaan, enintään 24 ja vähintään 17 pt.
        /// </summary>
        void SovitaKohde()
        {
            float w = lcd.contentRect.width - 2f;
            if (!(w > 0) || string.IsNullOrEmpty(kohde.text)) return;
            float Leveys(string t) => kohde.MeasureTextSize(t, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x;
            kohde.style.whiteSpace = WhiteSpace.NoWrap;
            if (ankkurit != null)
            {
                // Kuvapaneelin pieni LCD: yksi rivi, pienenee leveyteen.
                float max = KuvaKohdePt * mittakaava;
                kohde.style.fontSize = max;
                float l1 = Leveys(kohde.text);
                kohde.style.fontSize = Mathf.Max(KuvaKohdeMinPt * mittakaava, l1 > w ? Mathf.Floor(max * w / l1 * 10f) / 10f : max);
                return;
            }
            kohde.style.fontSize = KohdePt;
            float yksi = Leveys(kohde.text);
            float koko = yksi > w ? Mathf.Floor(KohdePt * w / yksi) : KohdePt;
            if (koko < YksiRiviMinPt && kohde.text.IndexOf(' ') > 0)
            {
                float pisin = 0f;
                foreach (var sana in kohde.text.Split(' ')) pisin = Mathf.Max(pisin, Leveys(sana));
                koko = Mathf.Clamp(Mathf.Floor(KohdePt * w / Mathf.Max(1f, pisin)), KohdeMinPt, KaksiRiviaPt);
                kohde.style.whiteSpace = WhiteSpace.Normal;
            }
            kohde.style.fontSize = Mathf.Max(KohdeMinPt, koko);
        }

        /// <summary>Yhden rivin pienin koko ennen rivitystä ja kahden rivin suurin koko (LCD 84 pt: 2 × 24 + maa 15).</summary>
        public const float YksiRiviMinPt = 22f, KaksiRiviaPt = 24f;

        /// <summary>Testikomennon tila.</summary>
        public string Tila()
        {
            var r = Nakyva;
            return $"ohjaamo {(Juuri.resolvedStyle.display == DisplayStyle.None ? "piilossa" : Mini ? "mini" : "iso")}, "
                + $"{r.xMin:0},{r.yMin:0}–{r.xMax:0},{r.yMax:0}, joystick {suunta}, kaasu {kaasuNyt}×, kamera {(kamera.enabledSelf ? "aktiivinen" : "himmeä")}, "
                + $"LCD \"{kohde.text}\" / \"{maa.text}\" ({kohde.resolvedStyle.fontSize:0} pt)"
                + (Laajennettu ? $", laajennettu: kausi {KausiNyt?.Invoke()}, vuorokausi {VuorokausiNyt?.Invoke()}" : "");
        }

        // Kuvakkeet (24-ruudukko, viiva): joystickin väkänen ylöspäin (varret kiertävät), kamera.
        const string Kulma = "<path d=\"M6.5 14.5 12 9l5.5 5.5\"/>";
        const string Kamera = "<path d=\"M4 8.5h3.2l1.6-2.3h6.4l1.6 2.3H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1z\"/><circle cx=\"12\" cy=\"13.3\" r=\"3.4\"/>";
    }
}
