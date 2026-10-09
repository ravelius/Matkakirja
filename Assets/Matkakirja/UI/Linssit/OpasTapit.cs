// OPPAAN TAPIT (omistaja 5.10.2026 klo 21.3x, juna 145; Päätoimittajan tilaus): kaksi pientä tappiohjainta alakulmiin vain
// pysähdyksellä. Suunnat omistajalta (21.3x): VASEN pysty = etäisyys (ylös = lähemmäs, alas = kauemmas). OIKEA vaaka = kierto
// kohteen ympäri (oikealle = myötäpäivään), pysty = kameran korkeus (ylös = ylemmäs). Kamera katsoo aina kohteeseen
// (Siirtoseppä, Ydin/Kierros/OpasOhjaus.cs; Linssiseppä kytkee: ohjaus.Paivita(dt, Oikea.x, Oikea.y, -Vasen.y) ja
// OpasSilmukka.PelaajaOhjaa = Kosketaan).
// Pohja: OHJAUSNAPPI-pohjan TAPPI (Pohjat/ohjausnappi.uss, harmaan lasin tokenit): Ø 64 pt lasi, nuppi Ø 26 pt, levossa
// himmeä ja kosketuksessa täysin näkyvä, häivytys 200 ms. Nopeusohjaus: nupin poikkeama keskeltä −1…1, irrotus palauttaa
// nupin keskelle (150 ms) ja arvon nollaan. Kumpikin tappi kaappaa oman osoittimensa (kaksi peukaloa yhtä aikaa).
// NOPEUSVIPU (omistaja 9.10.2026, juna 170: "vasemmalla keskellä myös pieni säädin vipu, millä voisi vaikuttaa maksiminopeuteen";
// Päätoimittaja: mikserin liukusäädin pystyasennossa, .mk-saadin--pysty): vain vapaassa lennossa vasemmassa reunassa keskellä,
// ylös = nopeampi (Ydin VapaaNopeusVipu: ×0,25 … ×3, oletus ×1), asento muistetaan. Kerroin LS1:n OpasSovitin.VapaaNopeus-arvoon
// joka ruudulla vapaassa tilassa (464ac4b12, sama alue 0,25–3).
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OpasTapit
    {
        /// <summary>Vasen tappi: y = lähemmäs (+) / kauemmas (−); x = sivuttain (+ oikealle) vain vapaassa tilassa (omistaja 8.10.:
        /// "vasemmanpuoleiseen joystickiin pitää lisätä vapaassa liikkumistilassa sivuttaissuunnassa liikkuminen"; LS1 OpasVapaaLento),
        /// pysähdyksellä x ei vaikuta. −1…1, irrotus → 0.</summary>
        public static Vector2 Vasen { get; private set; }
        /// <summary>Oikea tappi: x = kierto (+ myötäpäivään), y = korkeus (+ ylemmäs); −1…1, irrotus → 0.</summary>
        public static Vector2 Oikea { get; private set; }
        /// <summary>Pelaaja koskee jompaakumpaa tappia (silmukka pysäyttää automaattisen kierron ja seuraavaan siirtymisen).</summary>
        public static bool Kosketaan => vasen.Kosketaan || oikea.Kosketaan;

        /// <summary>Nopeusvivun asento (VapaaNopeusVipu.Min … Max, ylös = nopeampi); muistetaan PlayerPrefsissä.</summary>
        public static float NopeusVipu { get; private set; } = LueVipu();
        /// <summary>Vapaan lennon enimmäisnopeuden kerroin vivusta (0,25 … 3, oletus 1) → OpasSovitin.VapaaNopeus (LS1).</summary>
        public static double NopeusKerroin => VapaaNopeusVipu.Kerroin(NopeusVipu);
        const string VipuAvain = "opas.vapaa.nopeusvipu";
        public const float VipuKorkeus = 120f, VipuLeveys = 26f;

        static float LueVipu()
        {
            try { return PlayerPrefs.GetFloat(VipuAvain, VapaaNopeusVipu.Oletus); } catch { return VapaaNopeusVipu.Oletus; }
        }

        public const float Halkaisija = 64f, Reuna = 12f;
        const string PystyIkoni = "<path d=\"M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4\"/>";

        static Tappi vasen = new Tappi(), oikea = new Tappi();
        readonly Slider vipu;
        bool nakyy, vipuNakyy;

        public OpasTapit(VisualElement isa)
        {
            vasen = new Tappi(isa, "mk-tappi mk-tappi--vasen", PystyIkoni, v => Vasen = v);
            oikea = new Tappi(isa, "mk-tappi mk-tappi--oikea", Ikonit.PaivitaVersio, v => Oikea = v);
            vasen.Juuri.tooltip = "Lähemmäs ja kauemmas";
            oikea.Juuri.tooltip = "Kierrä kohdetta ja nosta tai laske kameraa";
            // Pystysäädin: Unityn pystysuunnassa pienin arvo on ylhäällä, inverted kääntää (ylös = nopeampi; `ui opasvalikko vipu`).
            vipu = new Slider(VapaaNopeusVipu.Min, VapaaNopeusVipu.Max, SliderDirection.Vertical) { pageSize = 0, inverted = true };
            vipu.AddToClassList("mk-saadin");
            vipu.AddToClassList("mk-saadin--pysty");
            vipu.style.position = Position.Absolute;
            vipu.style.top = Length.Percent(50);
            vipu.style.marginTop = -VipuKorkeus * 0.5f;
            vipu.style.display = DisplayStyle.None;
            vipu.SetValueWithoutNotify(NopeusVipu);
            vipu.tooltip = VipuNimi();
            vipu.RegisterValueChangedCallback(e => { NopeusVipu = e.newValue; vipu.tooltip = VipuNimi(); });
            vipu.RegisterCallback<PointerCaptureOutEvent>(_ => { try { PlayerPrefs.SetFloat(VipuAvain, NopeusVipu); } catch { } });
            isa.Add(vipu);
        }

        static string VipuNimi() => "Lentonopeus " + VapaaNopeusVipu.Teksti(NopeusVipu);

        bool vapaa;

        /// <summary>Vapaa tila: vasemman tapin kuvake nelisuuntaiseksi (kompassi, liike kaikkiin suuntiin), pysähdyksellä pystynuolet.</summary>
        public void Vapaa(bool paalla)
        {
            if (paalla == vapaa || vasen?.Nuppi == null) return;
            vapaa = paalla;
            vasen.Nuppi.Clear();
            Rakenne.Ikoni(paalla ? Ikonit.Viiva["kompassi"] : PystyIkoni, "mk-tappi__ikoni", vasen.Nuppi);
            vasen.Juuri.tooltip = paalla ? "Liiku eteen, taakse ja sivuille" : "Lähemmäs ja kauemmas";
        }

        /// <summary>Näkyvyys, alareuna ja etäisyys sivureunasta joka ruudulla OpasValikolta (juna 156: iPadilla sisemmäs ja
        /// ylemmäs); piiloon mennessä arvot nollaan.</summary>
        public void Paivita(bool nayta, float ala, float sivu)
        {
            if (nayta != nakyy)
            {
                nakyy = nayta;
                vasen.Nayta(nayta);
                oikea.Nayta(nayta);
            }
            Ala = ala;
            if (vasen.Juuri.style.bottom.value.value != ala) { vasen.Juuri.style.bottom = ala; oikea.Juuri.style.bottom = ala; }
            if (vasen.Juuri.style.left.value.value != sivu) { vasen.Juuri.style.left = sivu; oikea.Juuri.style.right = sivu; }
            // Nopeusvipu vain vapaassa lennossa, vasemman tapin sarakkeen keskellä.
            bool v = nayta && vapaa;
            if (vapaa) OpasSovitin.VapaaNopeus = NopeusKerroin;
            if (v != vipuNakyy) { vipuNakyy = v; vipu.style.display = v ? DisplayStyle.Flex : DisplayStyle.None; }
            float vl = sivu + (Halkaisija - VipuLeveys) * 0.5f;
            if (vipu.style.left.value.value != vl) vipu.style.left = vl;
        }

        public bool VipuNakyy => vipuNakyy;

        /// <summary>Testi `ui opasvalikko vipu [asento]`: asento, kerroin, laatikko ja suunta (nuppi ylempänä, kun nopeampi kuin keskellä).</summary>
        public string VipuKuvaus(float? aseta)
        {
            if (aseta is float a) vipu.value = Mathf.Clamp(a, VapaaNopeusVipu.Min, VapaaNopeusVipu.Max);
            var r = vipu.worldBound;
            var nuppi = vipu.Q("unity-dragger");
            string suunta = "-";
            if (nuppi != null && r.height > 0f)
            {
                float keski = (VapaaNopeusVipu.Min + VapaaNopeusVipu.Max) * 0.5f, ero = NopeusVipu - keski;
                float ylos = r.center.y - nuppi.worldBound.center.y;
                suunta = Mathf.Abs(ero) < 0.05f ? "keskellä" : (ero > 0f) == (ylos > 0f) ? "ylös = nopeampi ok" : "VIKA: suunta väärin";
            }
            return $"vipu {(vipuNakyy ? "näkyy" : "piilossa")}, asento {NopeusVipu:0.00} = {VapaaNopeusVipu.Teksti(NopeusVipu)}, @ {r.xMin:0},{r.yMin:0} "
                 + $"{r.width:0}×{r.height:0}, nuppi y {(nuppi != null ? nuppi.worldBound.center.y.ToString("0") : "-")}, {suunta}";
        }

        /// <summary>Tappien alareuna (viimeisin Paivita).</summary>
        public float Ala { get; private set; }

        public bool Nakyy => nakyy;
        public Rect VasenLaatikko => vasen.Juuri.worldBound;
        public Rect OikeaLaatikko => oikea.Juuri.worldBound;

        /// <summary>Testi: tila ja laatikot (`ui opasvalikko tapit`).</summary>
        public string Kuvaus()
        {
            Rect a = VasenLaatikko, b = OikeaLaatikko;
            return $"tapit {(nakyy ? "näkyy" : "piilossa")}, vasen {Vasen.y:0.00} @ {a.xMin:0},{a.yMin:0} {a.width:0}×{a.height:0}, "
                 + $"oikea {Oikea.x:0.00},{Oikea.y:0.00} @ {b.xMin:0},{b.yMin:0} {b.width:0}×{b.height:0}, kosketaan {Kosketaan}";
        }

        /// <summary>Yksi tappi (TAPPI-pohja); käytössä myös SeikkailuTapit.</summary>
        internal sealed class Tappi
        {
            public readonly VisualElement Juuri, Nuppi;
            readonly System.Action<Vector2> asetaArvo;
            int osoitin = -1;
            bool nakyy;
            public bool Kosketaan => osoitin >= 0;

            public Tappi() { }

            public Tappi(VisualElement isa, string luokat, string ikoni, System.Action<Vector2> aseta)
            {
                asetaArvo = aseta;
                Juuri = Rakenne.El("tk-teema-harmaa " + luokat, isa, PickingMode.Position);
                Juuri.style.display = DisplayStyle.None;
                Nuppi = Rakenne.El("mk-tappi__nuppi", Juuri, PickingMode.Ignore);
                Rakenne.Ikoni(ikoni, "mk-tappi__ikoni", Nuppi);
                Juuri.RegisterCallback<PointerDownEvent>(Alas, TrickleDown.TrickleDown);
                Juuri.RegisterCallback<PointerMoveEvent>(Liiku);
                Juuri.RegisterCallback<PointerUpEvent>(e => Ylos(e.pointerId));
                Juuri.RegisterCallback<PointerCancelEvent>(e => Ylos(e.pointerId));
                // Vain oma sormi: toisen tapin kaappaus tai irrotus ei nollaa tätä (moniosuma, juna 170).
                Juuri.RegisterCallback<PointerCaptureOutEvent>(e => Ylos(e.pointerId));
            }

            public void Nayta(bool nayta)
            {
                nakyy = nayta;
                if (!nayta) Ylos(osoitin);
                if (nayta)
                {
                    Juuri.style.display = DisplayStyle.Flex;
                    Juuri.schedule.Execute(() => { if (nakyy) Juuri.AddToClassList("mk-tappi--nakyy"); });
                }
                else
                {
                    Juuri.RemoveFromClassList("mk-tappi--nakyy");
                    Juuri.schedule.Execute(() => { if (!nakyy) Juuri.style.display = DisplayStyle.None; }).StartingIn(Tyylikirja.Kesto.Sulku);
                }
            }

            void Alas(PointerDownEvent e)
            {
                if (osoitin >= 0) return;
                osoitin = e.pointerId;
                Juuri.CapturePointer(osoitin);
                Juuri.AddToClassList("mk-tappi--kosketus");
                Nuppi.RemoveFromClassList("mk-tappi__nuppi--palaa");
                Siirra(e.position);
                e.StopPropagation();
            }

            void Liiku(PointerMoveEvent e)
            {
                if (e.pointerId != osoitin) return;
                Siirra(e.position);
                e.StopPropagation();
            }

            /// <summary>Nuppi kosketuskohtaan säteen sisällä; arvo = poikkeama / säde (y ylös positiivinen).</summary>
            void Siirra(Vector2 maailma)
            {
                var r = Juuri.worldBound;
                float sade = r.width * 0.5f;
                if (!(sade > 0f)) return;
                var d = (maailma - r.center) / sade;
                if (d.sqrMagnitude > 1f) d.Normalize();
                Nuppi.style.translate = new Translate(d.x * sade * 0.62f, d.y * sade * 0.62f);
                asetaArvo?.Invoke(new Vector2(d.x, -d.y));
            }

            void Ylos(int id)
            {
                if (id < 0 || id != osoitin) return;
                osoitin = -1;
                if (Juuri.HasPointerCapture(id)) Juuri.ReleasePointer(id);
                Juuri.RemoveFromClassList("mk-tappi--kosketus");
                Nuppi.AddToClassList("mk-tappi__nuppi--palaa");
                Nuppi.style.translate = new Translate(0, 0);
                asetaArvo?.Invoke(Vector2.zero);
            }
        }
    }
}
