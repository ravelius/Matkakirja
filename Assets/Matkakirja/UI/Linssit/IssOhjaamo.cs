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
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
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
            joystick.RegisterCallback<PointerDownEvent>(e => { joystick.CapturePointer(e.pointerId); Ohjaa(e.localPosition); e.StopPropagation(); });
            joystick.RegisterCallback<PointerMoveEvent>(e => { if (joystick.HasPointerCapture(e.pointerId)) Ohjaa(e.localPosition); });
            joystick.RegisterCallback<PointerUpEvent>(e => { joystick.ReleasePointer(e.pointerId); AsetaSuunta(JoystickSuunta.Ei); });
            joystick.RegisterCallback<PointerCancelEvent>(_ => AsetaSuunta(JoystickSuunta.Ei));
            joystick.RegisterCallback<PointerCaptureOutEvent>(_ => AsetaSuunta(JoystickSuunta.Ei));

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
            kaasu = Rakenne.El("mk-issohjaamo__kaasu", paneeli);
            kaasu.tooltip = "Kaasu: ajan nopeus";
            ura = Rakenne.El("mk-issohjaamo__ura", kaasu, PickingMode.Ignore);
            for (int i = 0; i < Kertoimet.Length; i++) Rakenne.El("mk-issohjaamo__pykala", ura, PickingMode.Ignore);
            kahva = Rakenne.El("mk-issohjaamo__kahva", ura, PickingMode.Ignore);
            rumpu = Rakenne.El("mk-issohjaamo__rumpu", kaasu, PickingMode.Ignore);
            luvut = Rakenne.El("mk-issohjaamo__luvut", rumpu, PickingMode.Ignore);
            rumpuA = Rakenne.Teksti("1", "mk-issohjaamo__luku", luvut);
            rumpuB = Rakenne.Teksti("", "mk-issohjaamo__luku", luvut);
            foreach (var t in new[] { rumpuA, rumpuB }) { t.pickingMode = PickingMode.Ignore; Kirjasimet.Aseta(t, Kirjasin.Segmentti); }
            rumpuB.style.translate = new Translate(0, Length.Percent(100));
            Kirjasimet.Aseta(Rakenne.Teksti("×", "mk-issohjaamo__kerta", rumpu), Kirjasin.Lcd);
            kaasu.RegisterCallback<PointerDownEvent>(e => { kaasu.CapturePointer(e.pointerId); Vipu(e.localPosition.y); e.StopPropagation(); });
            kaasu.RegisterCallback<PointerMoveEvent>(e => { if (kaasu.HasPointerCapture(e.pointerId)) Vipu(e.localPosition.y); });
            kaasu.RegisterCallback<PointerUpEvent>(e => kaasu.ReleasePointer(e.pointerId));
            ura.RegisterCallback<GeometryChangedEvent>(_ => AsetaKahva());

            RakennaLaajennus();

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
        public void Asettele(float turvanLeveys)
        {
            if (!(turvanLeveys > 0)) return;
            float w = Mathf.Min(Enintaan, turvanLeveys - 24f);
            paneeli.style.width = w;
            Juuri.style.left = 0; Juuri.style.right = 0;
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
        }

        public JoystickSuunta Suunta => suunta;

        // --- kaasu ------------------------------------------------------------------------------------------------

        /// <summary>Vivun veto tai napautus: lähin pykälä (ylin = 1000×).</summary>
        void Vipu(float y)
        {
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

        /// <summary>Kameranapin painallus testikomennolle (sama polku kuin kosketus, myös osto).</summary>
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
