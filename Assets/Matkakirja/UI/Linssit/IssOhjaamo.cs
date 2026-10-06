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
using Matkakirja.Linssit;
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
        // OBJEKTIIVI (Päätoimittaja 6.10., juna 147): LAAJA/TELE kahtena LCD-nappina kameranapin ja rummun yläpuolella
        // (laajennuksen .mk-issohjaamo__lcdnappi, valittu käänteisenä); osuma-ala 48 pt korkea, päättyy kameranapin yläreunaan.
        readonly VisualElement objektiivi;
        readonly Button laajaNappi, teleNappi;
        // KUVAUS LCD:SSÄ (omistaja 6.10.): kuvauksen ajan "KEHITETÄÄN…" ja alla SEGMENTTIPALKKI (omistaja 6.10. 08.1x: "Saisi olla
        // pienistä neliöistä koostuva"): rivi LCD-neliöitä, jotka syttyvät edistymisen mukaan, sammuneet himmeinä kuten LCD:n
        // sammuneet segmentit. Valmiin kuvan jälkeen "KUVA VALMIS" 2 s; sitten sijainti takaisin.
        public const int Segmentteja = 12;
        readonly VisualElement nopeusRivi;
        readonly Label kerroinT, nopeusT, valoT;
        float nopeusAsti = -1f;
        public const float NopeusS = 3f, NopeusPt = 13f, ValoOsuus = 0.70f, VaroitusKerroin = 300f, TaysiKerroin = 1000f;
        /// <summary>LCD:n ×: 70 % koko ja hieman alemmas (VT323:n × on piirretty korotettuna).</summary>
        public const string KertaMerkki = "<size=70%><voffset=-0.06em>×</voffset></size>";
        /// <summary>Valon nopeus km/h (c = 299 792,458 km/s).</summary>
        public const double ValoKmh = 299792.458 * 3600.0;
        /// <summary>Suomalainen lukumuoto ilman kulttuuritietoja (IL2CPP:ssä fi-FI voi puuttua): pilkku, tuhaterotin välilyönti.</summary>
        static readonly System.Globalization.NumberFormatInfo Fi = new System.Globalization.NumberFormatInfo
            { NumberDecimalSeparator = ",", NumberGroupSeparator = " ", NumberGroupSizes = new[] { 3 } };
        /// <summary>Laajennuksen nappien väli ja reunaväli (pt), sama kaikkialla (omistaja 6.10.; USS-arvo 4px).</summary>
        public const float LaajennusVali = 4f, VaakaOsuus = 0.30f;
        readonly VisualElement segmentit;
        readonly VisualElement[] segmentti = new VisualElement[Segmentteja];
        /// <summary>Testi (`astro ohjaamo kehitys 0–1|valmis|pois`): edistyminen ilman kuvausta stilliä varten.</summary>
        public static float? TestiEdistyminen;
        float valmisAsti = -1f, syyAsti = -1f;
        string syy;
        bool oliKaynnissa;
        public const float ValmisS = 2f, ObjektiiviPt = 11f;
        readonly Func<AstronauttiLinssi> linssi;
        readonly Action kuvaa;
        JoystickSuunta suunta = JoystickSuunta.Ei;
        int kaasuNyt = 1;
        /// <summary>Portaaton kerroin 1…1000 (omistaja 6.10.: kahva portaattomasti, LS2:n AsetaKaasuPortaaton).</summary>
        double kaasuArvo = 1;
        double lokiKerroin;
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
        /// <summary>
        /// KESKELTÄ TARTTUMINEN (omistaja 6.10.2026 klo 00.2x, TF 144: "jos tartun keskeltä niin peli alkaa kääntää alusta
        /// vasemmalle"): sormen kosketus on laajempi kuin 12 pt:n kuollut alue, joten keskeltä tarttuminen antoi heti suunnan.
        /// Keskiruudun (34 pt) sisältä alkava kosketus on nyt neutraali, ja suunta lasketaan liikkeestä tartuntakohdasta
        /// (kynnys LiikePt); varresta alkava kosketus ohjaa heti kuten ennen.
        /// </summary>
        public const float KeskiPt = 24f, LiikePt = 14f;
        /// <summary>
        /// Sauvan NÄKYVÄ keskipiste osuutena sauvan laatikosta. Kuvapaneelissa (ohjaamo.json "sauva" 128 × 78 pt) piirretty sauva
        /// on laatikon vasemmalla puoliskolla (nuolet ◂ ▸ ja ▼ ympärillä): TF 145:llä 6.10. klo 00.08 sauvan keskeltä tarttuminen
        /// antoi "Vasen", koska logiikka käytti laatikon keskipistettä (~18 pt oikealla). ohjaamo.json:n "sauvaKeski" ohittaa.
        /// </summary>
        public static Vector2 SauvaKeskiOsuus = new Vector2(0.36f, 0.5f);

        /// <summary>Joystickin keskipiste paikallisissa koordinaateissa: kuvapaneelissa sauvan näkyvä keski, piirretyssä laatikon keski.</summary>
        Vector2 Keski()
        {
            var r = joystick.contentRect;
            if (ankkurit == null || !joystick.ClassListContains("mk-issohjaamo--kuvat")) return r.center;
            var o = ankkurit.SauvaKeski ?? SauvaKeskiOsuus;
            return new Vector2(r.x + r.width * o.x, r.y + r.height * o.y);
        }
        Vector2? tartunta;

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
            osuma.RegisterCallback<PointerDownEvent>(e => { osuma.CapturePointer(e.pointerId); Tartu(Paikka(e.position)); e.StopPropagation(); });
            osuma.RegisterCallback<PointerMoveEvent>(e => { if (osuma.HasPointerCapture(e.pointerId)) Ohjaa(Paikka(e.position)); });
            osuma.RegisterCallback<PointerUpEvent>(e => { osuma.ReleasePointer(e.pointerId); tartunta = null; AsetaSuunta(JoystickSuunta.Ei); });
            osuma.RegisterCallback<PointerCancelEvent>(_ => AsetaSuunta(JoystickSuunta.Ei));
            osuma.RegisterCallback<PointerCaptureOutEvent>(_ => AsetaSuunta(JoystickSuunta.Ei));

            // --- LCD: kohde isolla, maa alla ---------------------------------------------------------------------
            lcd = Rakenne.El("mk-issohjaamo__lcd", paneeli);
            Matriisi(lcd);
            kohde = Rakenne.Teksti("", "mk-issohjaamo__kohde", lcd);
            maa = Rakenne.Teksti("", "mk-issohjaamo__maa", lcd);
            // NOPEUSLUKEMA (omistaja 6.10. 09.0x): kaasua muutettaessa 3 s vasemmalla kerroin ja oikealla oikea nopeus, sen alla
            // osuus valon nopeudesta (≥ 0,1 %); vihreä, oranssi ≥ 300× (--tk-lcd-varoitus), punainen 1000× (--tk-lcd-vaara).
            nopeusRivi = Rakenne.El("mk-issohjaamo__nopeusrivi", lcd, PickingMode.Ignore);
            kerroinT = Rakenne.Teksti("", "mk-issohjaamo__kerroin", nopeusRivi);
            var sarake = Rakenne.El("mk-issohjaamo__nopeussarake", nopeusRivi, PickingMode.Ignore);
            nopeusT = Rakenne.Teksti("", "mk-issohjaamo__nopeus", sarake);
            valoT = Rakenne.Teksti("", "mk-issohjaamo__valo", sarake);
            foreach (var t in new[] { kerroinT, nopeusT, valoT }) { t.pickingMode = PickingMode.Ignore; Kirjasimet.Aseta(t, Kirjasin.Lcd); }
            nopeusRivi.style.display = DisplayStyle.None;
            foreach (var t in new[] { kohde, maa }) { t.pickingMode = PickingMode.Ignore; Kirjasimet.Aseta(t, Kirjasin.Lcd); }
            segmentit = Rakenne.El("mk-issohjaamo__segmentit", lcd, PickingMode.Ignore);
            for (int i = 0; i < Segmentteja; i++) segmentti[i] = Rakenne.El("mk-issohjaamo__segmentti", segmentit, PickingMode.Ignore);
            segmentit.style.display = DisplayStyle.None;
            IssKameraKuva.Aloitettu += () => UiKerros.PaaSaikeessa(() => { valmisAsti = -1f; Paivita(); });
            IssKameraKuva.Valmis += _ => UiKerros.PaaSaikeessa(() => { valmisAsti = Time.unscaledTime + ValmisS; Paivita(); });
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
            objektiivi = Rakenne.El("mk-issohjaamo__objektiivi", paneeli, PickingMode.Ignore);
            objektiivi.style.position = Position.Absolute;
            objektiivi.style.flexDirection = FlexDirection.Row;
            laajaNappi = ObjektiiviNappi("LAAJA", true);
            teleNappi = ObjektiiviNappi("TELE", false);
            PaivitaObjektiivi();
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

            // --- mininäyttö --------------------------------------------------------------------------------------
            mini = Rakenne.El("mk-issohjaamo__mini", Juuri);
            mini.tooltip = "Avaa ohjaamo";
            Matriisi(mini);
            miniTeksti = Rakenne.Teksti("", "mk-issohjaamo__miniteksti", mini);
            miniTeksti.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(miniTeksti, Kirjasin.Lcd);
            mini.style.display = DisplayStyle.None;
            mini.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            mini.AddManipulator(new Clickable(() => AsetaMini(false)));
            // Kuvanahka vasta kaikkien osien (myös mininäytön) jälkeen.
            KaytaNahka();
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
            // Ohjaamo v3 (6.10.): ei rumpua eikä rumpu-kolo-kuvaa; kolo vain, kun ankkuri on.
            if (ankkurit != null && ankkurit.RumpuKolo.width > 0) { Pukeudu(rumpuKoloKuva, "rumpu-kolo"); rumpuKoloKuva.style.display = DisplayStyle.Flex; rumpuKoloKuva.BringToFront(); laajennus.BringToFront(); }
            else if (ankkurit != null) { rumpuKoloKuva.style.display = DisplayStyle.None; laajennus.BringToFront(); }
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
            var kt = NahkaKuva(ankkurit?.Ura != null ? "kaasu-1" : "kaasu-" + kaasuNyt);
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
            var r2 = Rakenne.El("mk-issohjaamo__rivi mk-issohjaamo__rivi--toinen", rivit, PickingMode.Ignore);
            for (int i = 0; i < 4; i++)
            {
                int k = i;
                kausiNapit[i] = Nappi(Vuodenaika.Nimet[i].ToUpperInvariant(), null, r1, () => { AsetaKausi?.Invoke(k); PaivitaLaajennus(); });
                vuorokausiNapit[i] = Nappi(Vuorokausi.Nimet[i].ToUpperInvariant(), null, r2, () => { AsetaVuorokausi?.Invoke(k); PaivitaLaajennus(); });
            }
            Nappi("OK", "mk-issohjaamo__iso", laajennus, () => AsetaLaajennus(false)).tooltip = "Takaisin sijaintiin";
        }

        /// <summary>Objektiivin nappi: osuma-ala (läpinäkyvä, 48 pt korkea) ja sen sisällä LCD-nappi (pohja .mk-issohjaamo__lcdnappi).</summary>
        Button ObjektiiviNappi(string teksti, bool laaja)
        {
            var osa = Rakenne.El(null, objektiivi);
            osa.style.flexGrow = 1; osa.style.flexBasis = 0; osa.style.justifyContent = Justify.FlexEnd;
            if (!laaja) osa.style.marginLeft = LaajennusVali;   // sama väli kuin laajennuksen napeilla (omistaja 6.10.)
            osa.tooltip = laaja ? "Laaja objektiivi" : "Teleobjektiivi";
            osa.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            osa.AddManipulator(new Clickable(() => ValitseObjektiivi(laaja)));
            var b = Nappi(teksti, null, osa, null);
            b.pickingMode = PickingMode.Ignore;
            foreach (var c in b.Children()) c.pickingMode = PickingMode.Ignore;
            return b;
        }

        void ValitseObjektiivi(bool laaja)
        {
            if (IssKameraKuva.Laaja == laaja) return;
            IssKameraKuva.Laaja = laaja;
            Debug.Log("MATKAKIRJA linssit: ohjaamon objektiivi " + (laaja ? "LAAJA" : "TELE"));
            PaivitaObjektiivi();
        }

        void PaivitaObjektiivi()
        {
            laajaNappi.EnableInClassList("mk-valittu", IssKameraKuva.Laaja);
            teleNappi.EnableInClassList("mk-valittu", !IssKameraKuva.Laaja);
        }

        /// <summary>Objektiivin paikka: LCD-napit kameranapin ja rummun yläpuolella (ohjaamo.json "objektiivi" ohittaa).</summary>
        void AseteleObjektiivi(float s)
        {
            Rect r;
            if (ankkurit != null)
            {
                var a = ankkurit;
                r = a.Objektiivi.width > 0 ? a.Objektiivi
                    : new Rect(a.Kamera.x, 15.5f, Mathf.Max(a.RumpuKolo.xMax, a.Kamera.xMax) - a.Kamera.x, 22f);
                // v3:n objektiivipinta (52 pt) on kahdelle LCD-sanalle liian kapea (simu f3e10f82: "LAAJA" ei mahtunut): koko
                // kameran laatikon levyinen, jos se on leveämpi.
                if (a.Objektiivi.width > 0 && a.Kamera.width > 0)
                {
                    float x0 = Mathf.Min(r.x, a.Kamera.x), x1 = Mathf.Max(r.xMax, a.Kamera.xMax);
                    r = new Rect(x0, r.y, x1 - x0, r.height);
                }
            }
            else r = new Rect(kamera.layout.x, 2f, Mathf.Max(96f, kamera.layout.width), 22f);
            // Osuma-ala ylöspäin: 48 pt korkea, alareuna napin alareunassa (kameranapin osuma alkaa sen alta).
            float h = r.height * s, osuma = Mathf.Max(48f, h);
            objektiivi.style.left = r.x * s; objektiivi.style.width = r.width * s;
            objektiivi.style.top = r.yMax * s - osuma; objektiivi.style.height = osuma;
            foreach (var b in new[] { laajaNappi, teleNappi })
            {
                // Pohjan lcdnappi on rivin solu (flex-basis 0): pystysarakkeessa korkeus tulee perusmitasta, ei heightistä.
                b.style.height = h; b.style.flexBasis = h; b.style.flexGrow = 0; b.style.flexShrink = 0;
                var t = b.Q<Label>(className: "mk-nappi__teksti");
                if (t != null) t.style.fontSize = ObjektiiviPt * s;
            }
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
            // VAAKA (omistaja 6.10.: "vie nyt aivan liikaa tilaa näkymältä"): paneelin korkeus enintään VaakaOsuus ruudun
            // korkeudesta (iPhone vaaka 560 pt leveänä 183 pt = 45 %).
            float ruutuK = Juuri.panel?.visualTree.layout.height ?? 0f;
            if (Screen.width > Screen.height && ruutuK > 0f && ankkurit != null)
                w = Mathf.Min(w, ruutuK * VaakaOsuus * ankkurit.Koko.width / ankkurit.Koko.height);
            paneeli.style.width = w;
            Juuri.style.left = 0; Juuri.style.right = 0;
            // VAAKA (omistaja 6.10. 08.3x: "vaaka-asennossa koko ohjain saisi olla ihan kiinni alareunassa"): ei väliä turva-alueen
            // alareunaan (pystyssä USS:n --tk-vali-s).
            Juuri.style.bottom = Screen.width > Screen.height ? 0f : StyleKeyword.Null;
            if (ankkurit != null) AsetteleKuvat(w);
            else
            {
                paneeli.style.height = StyleKeyword.Null;
                foreach (var e in new[] { joystick, lcd, kamera, kaasu, rumpu, laajennus }) Vapauta(e);
                osuma.style.left = StyleKeyword.Null; osuma.style.top = StyleKeyword.Null; osuma.style.width = StyleKeyword.Null; osuma.style.height = StyleKeyword.Null;
                foreach (var e in new VisualElement[] { maa, rumpuA, rumpuB, kerta, luvut }) { e.style.fontSize = StyleKeyword.Null; e.style.height = StyleKeyword.Null; }
                kerta.style.display = StyleKeyword.Null;
                foreach (var t in new[] { rumpuA, rumpuB }) if (!string.IsNullOrEmpty(t.text)) t.text = t.text.TrimEnd('×');
                laajennus.style.paddingLeft = laajennus.style.paddingTop = laajennus.style.paddingRight = laajennus.style.paddingBottom = StyleKeyword.Null;
                mittakaava = 1f;
                objektiivi.schedule.Execute(() => { if (ankkurit == null) AseteleObjektiivi(1f); });
                SovitaKohde();
            }
        }

        // --- KUVA-ASETTELU (Linnanrakentajan konsepti v1, omistaja 4.10.2026 klo 17.2x; juna 139) -----------------------------
        // Resources/IssOhjaamo/ohjaamo.json: {"koko":{w,h}, "sauva"|"lcd"|"kamera"|"rumpu"|"kaasu"|"lcdIso":{x,y,w,h} pt pohjan
        // vasemmasta yläkulmasta, "kaasu":{…, "pykalat":[y1, y10, y100, y1000]} pt kaasun laatikon yläreunasta,
        // valinnainen "sauvaKeski":{x,y} piirretyn sauvan keskipiste osuutena sauvan laatikosta (oletus 0.36, 0.5)}. Paneeli skaalautuu
        // leveyden mukaan (korkeus koon suhteessa) ja osat sijoitetaan ankkureihin; ilman tiedostoa piirretty asettelu kuten ennen.

        sealed class Ankkurit { public Rect Koko, Sauva, Lcd, Kamera, Rumpu, RumpuKolo, Kaasu, LcdIso, LcdIsoKuva; public float[] Pykalat; public float MiniSlice; public Rect Objektiivi; public Vector2? SauvaKeski; public Vector2? Ura; }
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
                    RumpuKolo = LueRect(o, "rumpuKolo"), LcdIsoKuva = LueRect(o, "lcdIsoKuva"), Objektiivi = LueRect(o, "objektiivi"),
                };
                var ms = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(MiniJson.Kentta(o, "mini")), "slice"));
                a.MiniSlice = ms != null && MiniJson.Kentta(ms, "vasen") is object v ? Convert.ToSingle(v) : 0f;
                var sk = Rakenne.Olio(MiniJson.Kentta(o, "sauvaKeski"));
                if (sk != null && MiniJson.Kentta(sk, "x") is object sx && MiniJson.Kentta(sk, "y") is object sy)
                    a.SauvaKeski = new Vector2(Convert.ToSingle(sx, System.Globalization.CultureInfo.InvariantCulture), Convert.ToSingle(sy, System.Globalization.CultureInfo.InvariantCulture));
                // v3b (Linnanrakentaja 6.10.): kaasu.ura {yla, ala} = vivun juuren liikealue (portaaton kahva, juna 148).
                var ura = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(MiniJson.Kentta(o, "kaasu")), "ura"));
                if (ura != null && MiniJson.Kentta(ura, "yla") is object uy && MiniJson.Kentta(ura, "ala") is object ua)
                    a.Ura = new Vector2(Convert.ToSingle(uy, System.Globalization.CultureInfo.InvariantCulture), Convert.ToSingle(ua, System.Globalization.CultureInfo.InvariantCulture));
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
            // Ohjaamo v3 (6.10.: sauva oikealla heti kameran vieressä): osuma ei ulotu kameran laatikon päälle.
            float vasenVara = Mathf.Clamp((a.Sauva.x - a.Kamera.xMax) * s, 0f, 18f);
            if (a.Sauva.xMax <= a.Kamera.x) vasenVara = 18f;   // v2: sauva vasemmalla, kamera oikealla
            osuma.style.left = -vasenVara; osuma.style.width = jw + vasenVara + 18f; osuma.style.top = (jh - oh) * 0.5f; osuma.style.height = oh;
            Aseta(lcd, a.Lcd, s);
            Aseta(kamera, a.Kamera, s);
            AseteleObjektiivi(s);
            Aseta(kaasu, a.Kaasu, s);
            Aseta(rumpu, a.Rumpu, s);
            // Ohjaamo v3 (omistaja 6.10.: rumpu pois): ilman rumpu-ankkuria numerorumpua ei näytetä.
            rumpu.style.display = a.Rumpu.width > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (a.RumpuKolo.width > 0 && rumpuKoloKuva != null) Aseta(rumpuKoloKuva, a.RumpuKolo, s);
            // Laajennus: lcd-iso-kuvan laatikko, sisältö lasin sisäalueelle (lcdIso) täytteenä.
            var iso = a.LcdIsoKuva.width > 0 ? a.LcdIsoKuva : a.LcdIso;
            if (iso.width > 0)
            {
                Aseta(laajennus, iso, s);
                // TASAISET VÄLIT (omistaja 6.10. 08.3x: "kaikki nappien välit mukaan lukien äärireunat yhtä leveitä"): lasin reunasta
                // ensimmäiseen nappiin sama LaajennusVali kuin nappien välissä (USS .mk-issohjaamo__laajennus/__rivit/__lcdnappi).
                laajennus.style.paddingLeft = (a.LcdIso.x - iso.x) * s + LaajennusVali; laajennus.style.paddingTop = (a.LcdIso.y - iso.y) * s + LaajennusVali;
                laajennus.style.paddingRight = (iso.xMax - a.LcdIso.xMax) * s + LaajennusVali; laajennus.style.paddingBottom = (iso.yMax - a.LcdIso.yMax) * s + LaajennusVali;
            }
            // Tekstit pohjan mittakaavassa (Linnanrakentaja: LCD:n rivi 1 ~15 pt, rivi 2 ≥ 10–11 pt; rummun numerot täyttävät aukon).
            mittakaava = s;
            maa.style.fontSize = MaaPt * s;
            luvut.style.height = a.Rumpu.height * s;
            kerta.style.display = DisplayStyle.None;
            foreach (var t in new[] { rumpuA, rumpuB })
            {
                t.style.height = a.Rumpu.height * s;
                if (!string.IsNullOrEmpty(t.text) && int.TryParse(t.text.TrimEnd('×'), out int k)) t.text = RummunTeksti(k);
                SovitaRumpu(t);
            }
            var nakyva = rumpuANakyy ? rumpuA : rumpuB;
            if (!string.IsNullOrEmpty(nakyva.text)) luvut.style.width = nakyva.MeasureTextSize(nakyva.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x + 1f;
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

        /// <summary>Kosketuksen alku: keskiruudusta neutraali (suunta liikkeestä), varresta heti suunta.</summary>
        void Tartu(Vector2 p)
        {
            var k = Keski();
            if (Mathf.Max(Mathf.Abs(p.x - k.x), Mathf.Abs(p.y - k.y)) < KeskiPt)
            {
                tartunta = p;
                AsetaSuunta(JoystickSuunta.Ei);
                Debug.Log($"MATKAKIRJA linssit: ohjaamon joystick tartunta keskeltä ({p.x - k.x:0},{p.y - k.y:0})");
                return;
            }
            tartunta = null;
            Ohjaa(p);
        }

        void Ohjaa(Vector2 p)
        {
            var k = tartunta ?? Keski();
            float dx = p.x - k.x, dy = p.y - k.y;
            if (Mathf.Max(Mathf.Abs(dx), Mathf.Abs(dy)) < (tartunta.HasValue ? LiikePt : KuollutPt)) { AsetaSuunta(JoystickSuunta.Ei); return; }
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
            // PORTAATON (omistaja 6.10. 09.0x; v3b ura = vivun juuren liikealue): logaritminen 1× (ala) … 1000× (yla).
            if (ankkurit?.Ura is Vector2 u2 && u2.y > u2.x)
            {
                float s = ankkurit.Koko.width > 0 ? paneeli.layout.width / ankkurit.Koko.width : 1f;
                float osuus = Mathf.Clamp01((u2.y - y / s) / (u2.y - u2.x));
                AsetaKaasuPortaaton(Math.Pow(10, 3 * osuus));
                return;
            }
            if (ankkurit?.Pykalat != null) { AsetaKaasu(Kertoimet[PykalaKuvasta(y)]); return; }
            var u = ura.layout;
            if (!(u.height > 0)) return;
            float t = Mathf.Clamp01(1f - (y - u.y) / u.height);
            int i = Mathf.Clamp(Mathf.RoundToInt(t * (Kertoimet.Length - 1)), 0, Kertoimet.Length - 1);
            AsetaKaasu(Kertoimet[i]);
        }

        /// <summary>Portaaton kaasu: linssille (LS2 AsetaKaasuPortaaton) ja kahva, LCD ja heilunta perään.</summary>
        public void AsetaKaasuPortaaton(double kerroin)
        {
            kerroin = Math.Max(1, Math.Min(1000, kerroin));
            if (Math.Abs(kerroin - kaasuArvo) < 1e-6) return;
            linssi()?.AsetaKaasuPortaaton(kerroin);
            NaytaKaasuArvo(kerroin);
        }

        void NaytaKaasuArvo(double kerroin)
        {
            kaasuArvo = kerroin;
            NaytaNopeus(kerroin);
            AsetaKahvaKuva();
            int pykala = 1;
            foreach (int k in Kertoimet) if (kerroin >= k - 1e-6) pykala = k;
            if (pykala != kaasuNyt) { kaasuNyt = pykala; AsetaKahva(); }
            AsetaTarina(Nopeustehoste.TarinaKertoimesta(kerroin) > 0f);
        }

        /// <summary>Kahvan kuva uran kohtaan: kaasu-1-kuva (vipu alimmassa pykälässä) siirretään juuren y:hyn (v3b ura).</summary>
        void AsetaKahvaKuva()
        {
            if (kaasuKuva == null || !(ankkurit?.Ura is Vector2 u2) || ankkurit.Pykalat == null) return;
            var kt = NahkaKuva("kaasu-1");
            if (kt != null) kaasuKuva.style.backgroundImage = new StyleBackground(kt);
            float s = ankkurit.Koko.width > 0 ? paneeli.layout.width / ankkurit.Koko.width : 1f;
            float t = (float)(Math.Log10(kaasuArvo) / 3.0);
            float juuri = Mathf.Lerp(u2.y, u2.x, t);                 // pt kaasu-laatikon yläreunasta
            kaasuKuva.style.translate = new Translate(0, (juuri - ankkurit.Pykalat[0]) * s);
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
            NaytaNopeus(kerroin);
            AsetaTarina(kerroin >= TaysiKerroin);
            int suuntaY = kerroin > kaasuNyt ? -1 : 1;   // kaasu ylös: rumpu pyörii ylöspäin (uusi luku alhaalta)
            kaasuNyt = kerroin;
            AsetaKahva();
            if (kaasuKuva != null) PaivitaNahkaTila();
            var vanha = rumpuANakyy ? rumpuA : rumpuB;
            var uusi = rumpuANakyy ? rumpuB : rumpuA;
            rumpuANakyy = !rumpuANakyy;
            uusi.text = RummunTeksti(kerroin);
            if (ankkurit != null) SovitaRumpu(uusi);
            // Kolon leveys luvun mukaan, jolloin "1 ×" ja "1000 ×" ovat kolossa keskellä (siirtymän ajan leveämmän mukaan).
            float Lev(Label t) => string.IsNullOrEmpty(t.text) ? 0f
                : t.MeasureTextSize(t.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x;
            float lu = Lev(uusi), lv = Lev(vanha);
            if (lu > 0) luvut.style.width = Mathf.Max(lu, lv) + 1f;
            luvut.schedule.Execute(() => { if (uusi.text == RummunTeksti(kerroin) && lu > 0) luvut.style.width = lu + 1f; }).ExecuteLater(230);
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

        /// <summary>Rummun teksti: kuvapaneelin mekaanisessa laskurissa "1000×" yhtenä (×-merkki mittarifontissa), muuten numero.</summary>
        string RummunTeksti(int kerroin) => ankkurit != null ? kerroin + "×" : kerroin.ToString();

        /// <summary>Laskurin luku täyttää ikkunan: korkeintaan 0,72 × korkeus, pitkä luku pienenee ikkunan leveyteen (90 %).</summary>
        void SovitaRumpu(Label t)
        {
            if (ankkurit == null || string.IsNullOrEmpty(t.text)) return;
            float max = ankkurit.Rumpu.height * 0.72f * mittakaava, w = ankkurit.Rumpu.width * 0.9f * mittakaava;
            t.style.fontSize = max;
            float l = t.MeasureTextSize(t.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x;
            if (l > w) t.style.fontSize = Mathf.Floor(max * w / l * 10f) / 10f;
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
        /// <summary>
        /// LCD:N TAUSTAHEHKU (omistaja 6.10. 08.3x "aavistusvihreää LCD-matriisiä", 11.1x tarkennus: ei erillisiä pisteitä vaan
        /// "melkein tasainen, hyvin haalea vihreä laatta"): tasainen vihreä kerros tekstin alla, väri USS:stä (.mk-issohjaamo__matriisi).
        /// </summary>
        static void Matriisi(VisualElement isa)
        {
            var m = Rakenne.El("mk-issohjaamo__matriisi", isa, PickingMode.Ignore);
            m.style.position = Position.Absolute;
            m.style.left = 0; m.style.top = 0; m.style.right = 0; m.style.bottom = 0;
            m.SendToBack();
        }

        /// <summary>Oikea nopeus tekstinä: alle miljoonan "275 700 km/h", sitten "9,37 milj. km/h" / "27,6 milj. km/h".</summary>
        public static string NopeusTeksti(double kmh)
        {
            if (kmh < 1e6) return (Math.Round(kmh / 10.0) * 10.0).ToString("#,0", Fi) + " km/h";
            double milj = kmh / 1e6;
            return milj.ToString(milj < 10 ? "0.00" : "0.0", Fi) + " milj. km/h";
        }

        /// <summary>Osuus valon nopeudesta ("2,6 % valon nopeudesta") tai null alle 0,1 %:n.</summary>
        public static string ValoTeksti(double kmh)
        {
            double p = kmh / ValoKmh * 100.0;
            return p < 0.1 ? null : p.ToString("0.0", Fi) + " % valon nopeudesta";
        }

        /// <summary>Cupolan kehys (IssKyytiNakyma.kupu), joka tärisee paneelin kanssa täydellä teholla.</summary>
        public VisualElement Kehys;
        IVisualElementScheduledItem tarina;

        /// HEILUNTA (omistaja 6.10. 09.3x: alkaa oranssissa, kasvaa punaiseen) samassa tahdissa kameran kanssa: LS2:n
        /// Nopeustehoste.RuudunSiirtoPx (px, x oikealle, y alas) pisteiksi; Cupolan kehys liikkuu samalla siirrolla.
        void AsetaTarina(bool paalla)
        {
            if (paalla && LinssiUi.VahennettyLiike()) paalla = false;
            if (!paalla)
            {
                tarina?.Pause(); tarina = null;
                Juuri.style.translate = StyleKeyword.Null;
                if (Kehys != null) Kehys.style.translate = StyleKeyword.Null;
                return;
            }
            if (tarina != null) return;
            tarina = Juuri.schedule.Execute(() =>
            {
                float ph = Juuri.panel?.visualTree.layout.height ?? 0f;
                if (!(ph > 0f) || Screen.height <= 0) return;
                Vector2 d = Nopeustehoste.RuudunSiirtoPx * (ph / Screen.height);
                Juuri.style.translate = new Translate(d.x, d.y);
                if (Kehys != null) Kehys.style.translate = new Translate(d.x, d.y);
            }).Every(16);
        }

        /// <summary>Kaasun muutos: nopeuslukema LCD:hen 3 s (värit kertoimen mukaan), sitten paikka takaisin.</summary>
        public void NaytaNopeus(double kerroin)
        {
            var hetki = IssNyt.Kello();
            double kmh = IssNyt.NopeusKmh(IssNyt.KorkeusKm(hetki)) * kerroin;
            // ×-merkki kuten asteikossa (Päätoimittaja 6.10.: VT323:n × näkyi isona korotettuna X:nä): pienempänä ja rivin
            // keskilinjalla.
            kerroinT.text = Math.Round(kerroin).ToString("0", Fi) + KertaMerkki;
            nopeusT.text = NopeusTeksti(kmh);
            string valo = ValoTeksti(kmh);
            valoT.text = valo ?? "";
            valoT.style.display = valo != null ? DisplayStyle.Flex : DisplayStyle.None;
            nopeusRivi.EnableInClassList("mk-issohjaamo__nopeusrivi--varoitus", kerroin >= VaroitusKerroin && kerroin < TaysiKerroin);
            nopeusRivi.EnableInClassList("mk-issohjaamo__nopeusrivi--vaara", kerroin >= TaysiKerroin);
            nopeusAsti = Time.unscaledTime + NopeusS;
            // Portaattomassa vedossa lokiin vain ~25 %:n välein (ei rivi per ruutu).
            if (lokiKerroin <= 0 || kerroin / lokiKerroin > 1.25 || lokiKerroin / kerroin > 1.25 || kerroin >= TaysiKerroin && lokiKerroin < TaysiKerroin)
            {
                lokiKerroin = kerroin;
                Debug.Log($"MATKAKIRJA linssit: ohjaamon LCD {Math.Round(kerroin)}× {nopeusT.text}{(valo != null ? " / " + valo : "")}");
            }
            PaivitaNopeusrivi();
            SovitaNopeus();
        }

        void PaivitaNopeusrivi()
        {
            bool nayta = Time.unscaledTime < nopeusAsti && !(IssKameraKuva.Kaynnissa || TestiEdistyminen.HasValue);
            bool nyt = nopeusRivi.style.display == DisplayStyle.Flex;
            if (nayta == nyt) return;
            nopeusRivi.style.display = nayta ? DisplayStyle.Flex : DisplayStyle.None;
            kohde.style.display = nayta ? DisplayStyle.None : DisplayStyle.Flex;
            if (nayta) maa.style.display = DisplayStyle.None;
            else lcdKohde = lcdMaa = null;   // paikka takaisin seuraavassa päivityksessä
        }

        /// <summary>Kerroin ja nopeus samalle riville LCD:n leveyteen: kirjasin pienenee tarvittaessa (enintään NopeusPt × mittakaava).</summary>
        void SovitaNopeus()
        {
            float leveys = lcd.contentRect.width;
            if (!(leveys > 0)) { lcd.schedule.Execute(SovitaNopeus).ExecuteLater(16); return; }
            float koko = NopeusPt * mittakaava;
            float Lev(Label t, float k)
            {
                t.style.fontSize = k;
                return t.MeasureTextSize(t.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x;
            }
            for (int i = 0; i < 12; i++)
            {
                float oikea = Mathf.Max(Lev(nopeusT, koko), valoT.style.display == DisplayStyle.None ? 0f : Lev(valoT, koko * ValoOsuus));
                float tarve = Lev(kerroinT, koko) + oikea + 6f * mittakaava;
                if (tarve <= leveys * 0.96f) break;
                koko *= 0.92f;
            }
            kerroinT.style.fontSize = koko; nopeusT.style.fontSize = koko;
            valoT.style.fontSize = koko * ValoOsuus;
        }

        /// <summary>Testi: kehitys 0–1 (segmentit), "valmis" (KUVA VALMIS 2 s) tai "pois".</summary>
        public void TestaaKehitys(string arvo)
        {
            if (arvo == "pois") TestiEdistyminen = null;
            else if (arvo == "valmis") { TestiEdistyminen = null; oliKaynnissa = false; valmisAsti = Time.unscaledTime + ValmisS; }
            else if (float.TryParse(arvo, System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out float f)) TestiEdistyminen = f;
            Paivita();
        }

        /// <summary>LCD:n kuvausrivi: "KEHITETÄÄN…" palkin kanssa kuvauksen ajan, "KUVA VALMIS" 2 s; muuten null (sijainti).</summary>
        string KuvausTeksti()
        {
            bool kaynnissa = IssKameraKuva.Kaynnissa || TestiEdistyminen.HasValue;
            // Kuva ei valmistunut (LS2 6.10.: Tila kertoo syyn, kun Kaynnissa → false): syy LCD:hen 2 s.
            if (oliKaynnissa && !kaynnissa)
            {
                syy = IssKameraKuva.Tila switch
                {
                    "ei maata" => "EI MAATA KUVASSA",
                    "ei kuvauspaikkaa" => "EI KUVA-AINEISTOA",
                    "keskeytyi" => "KUVAUS KESKEYTYI",
                    _ => null,
                };
                if (syy != null) { syyAsti = Time.unscaledTime + ValmisS; Debug.Log("MATKAKIRJA linssit: ohjaamon LCD " + syy); }
            }
            oliKaynnissa = kaynnissa;
            segmentit.style.display = kaynnissa ? DisplayStyle.Flex : DisplayStyle.None;
            if (kaynnissa)
            {
                float e = Mathf.Clamp01(TestiEdistyminen ?? IssKameraKuva.Edistyminen);
                int paalla = Mathf.CeilToInt(e * Segmentteja - 0.001f);
                for (int i = 0; i < Segmentteja; i++) segmentti[i].EnableInClassList("mk-issohjaamo__segmentti--paalla", i < paalla);
            }
            if (kaynnissa) return "KEHITETÄÄN…";
            if (Time.unscaledTime < valmisAsti) return "KUVA VALMIS";
            if (syy != null && Time.unscaledTime < syyAsti) return syy;
            return null;
        }

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
            PaivitaObjektiivi();   // myös testikomento `astro kyyti kuvaa laaja 0|1`
            PaivitaNopeusrivi();
            string kuvaus = KuvausTeksti();
            if (kuvaus != null)
            {
                if (kohde.text != kuvaus)
                {
                    kohde.text = kuvaus; miniTeksti.text = kuvaus;
                    maa.style.display = DisplayStyle.None;
                    lcdKohde = lcdMaa = null;   // kuvauksen jälkeen sijainti piirretään uudelleen
                    SovitaKohde();
                }
                k = lcdKohde; m = lcdMaa;
            }
            // Omistaja 4.10.2026 klo 21.5x: rivi 1 = tarkka sijainti (lähin saman maan kaupunki, meri, alue tai vuori), rivi 2 = maa;
            // korkeus ja nopeus näkyvät Cupolan mustassa ISS-ruudussa, eivät LCD:ssä. Kuvapaneelissa rivit keskitettyinä.
            if (k != lcdKohde || m != lcdMaa)
            {
                lcdKohde = k; lcdMaa = m;
                kohde.text = string.IsNullOrEmpty(k) ? "…" : k;
                maa.text = m ?? "";
                maa.style.display = string.IsNullOrEmpty(m) ? DisplayStyle.None : DisplayStyle.Flex;
                // Mininäyttö: sama tarkka sijainti, maa perään jos mahtuu (≤ 24 merkkiä yhteensä).
                miniTeksti.text = string.IsNullOrEmpty(m) || kohde.text.Length + m.Length > 22 ? kohde.text : kohde.text + ", " + m;
                SovitaKohde();
            }
            if (Laajennettu) PaivitaLaajennus();
            // Kaasu muuttui muualta (testikomento, linssin nollaus): vipu ja rumpu perään.
            if (ankkurit?.Ura != null) { if (Math.Abs(l.KaasuArvo - kaasuArvo) > 1e-6) NaytaKaasuArvo(l.KaasuArvo); }
            else if (l.Kaasu != kaasuNyt) NaytaKaasu(l.Kaasu);
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
                + $", objektiivi {(IssKameraKuva.Laaja ? "LAAJA" : "TELE")} @ {objektiivi.worldBound.xMin:0},{objektiivi.worldBound.yMin:0} {objektiivi.worldBound.width:0}×{objektiivi.worldBound.height:0}"
                + (segmentit.resolvedStyle.display == DisplayStyle.Flex ? $", kehitys {segmentit.Query(className: "mk-issohjaamo__segmentti--paalla").ToList().Count}/{Segmentteja}" : "")
                + (Laajennettu ? $", laajennettu: kausi {KausiNyt?.Invoke()}, vuorokausi {VuorokausiNyt?.Invoke()}" : "");
        }

        // Kuvakkeet (24-ruudukko, viiva): joystickin väkänen ylöspäin (varret kiertävät), kamera.
        const string Kulma = "<path d=\"M6.5 14.5 12 9l5.5 5.5\"/>";
        const string Kamera = "<path d=\"M4 8.5h3.2l1.6-2.3h6.4l1.6 2.3H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1z\"/><circle cx=\"12\" cy=\"13.3\" r=\"3.4\"/>";
    }
}
