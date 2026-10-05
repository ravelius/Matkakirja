// OPPAAN TAPIT (omistaja 5.10.2026 klo 21.3x, juna 145; Päätoimittajan tilaus): kaksi pientä tappiohjainta alakulmiin vain
// pysähdyksellä. VASEN: pysty = korkeus (ylös = ylemmäs), vaaka = etäisyys (oikealle = kauemmas). OIKEA: vaaka = kierto
// (oikealle = myötäpäivään). Kamera katsoo aina kohteeseen (Siirtoseppä, Ydin/Kierros/OpasOhjaus.cs; Linssiseppä kytkee:
// ohjaus.Paivita(dt, Oikea.x, Vasen.y, Vasen.x) ja OpasSilmukka.PelaajaOhjaa = Kosketaan).
// Pohja: OHJAUSNAPPI-pohjan TAPPI (Pohjat/ohjausnappi.uss, harmaan lasin tokenit): Ø 64 pt lasi, nuppi Ø 26 pt, levossa
// himmeä ja kosketuksessa täysin näkyvä, häivytys 200 ms. Nopeusohjaus: nupin poikkeama keskeltä −1…1, irrotus palauttaa
// nupin keskelle (150 ms) ja arvon nollaan. Kumpikin tappi kaappaa oman osoittimensa (kaksi peukaloa yhtä aikaa).
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OpasTapit
    {
        /// <summary>Vasen tappi: x = etäisyys (+ kauemmas), y = korkeus (+ ylemmäs); −1…1, irrotus → 0.</summary>
        public static Vector2 Vasen { get; private set; }
        /// <summary>Oikea tappi: x = kierto (+ myötäpäivään); −1…1, irrotus → 0.</summary>
        public static Vector2 Oikea { get; private set; }
        /// <summary>Pelaaja koskee jompaakumpaa tappia (silmukka pysäyttää automaattisen kierron ja seuraavaan siirtymisen).</summary>
        public static bool Kosketaan => vasen.Kosketaan || oikea.Kosketaan;

        public const float Halkaisija = 64f, Reuna = 12f;
        const string PystyIkoni = "<path d=\"M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4\"/>";

        static Tappi vasen = new Tappi(), oikea = new Tappi();
        bool nakyy;

        public OpasTapit(VisualElement isa)
        {
            vasen = new Tappi(isa, "mk-tappi mk-tappi--vasen", PystyIkoni, v => Vasen = v);
            oikea = new Tappi(isa, "mk-tappi mk-tappi--oikea", Ikonit.PaivitaVersio, v => Oikea = new Vector2(v.x, 0f));
            vasen.Juuri.tooltip = "Korkeus ja etäisyys";
            oikea.Juuri.tooltip = "Kierrä kohdetta";
        }

        /// <summary>Näkyvyys ja alareuna (krediittien yläpuolella) joka ruudulla OpasValikolta; piiloon mennessä arvot nollaan.</summary>
        public void Paivita(bool nayta, float ala)
        {
            if (nayta != nakyy)
            {
                nakyy = nayta;
                vasen.Nayta(nayta);
                oikea.Nayta(nayta);
            }
            vasen.Juuri.style.bottom = ala;
            oikea.Juuri.style.bottom = ala;
        }

        public bool Nakyy => nakyy;
        public Rect VasenLaatikko => vasen.Juuri.worldBound;
        public Rect OikeaLaatikko => oikea.Juuri.worldBound;

        /// <summary>Testi: tila ja laatikot (`ui opasvalikko tapit`).</summary>
        public string Kuvaus()
        {
            Rect a = VasenLaatikko, b = OikeaLaatikko;
            return $"tapit {(nakyy ? "näkyy" : "piilossa")}, vasen {Vasen.x:0.00},{Vasen.y:0.00} @ {a.xMin:0},{a.yMin:0} {a.width:0}×{a.height:0}, "
                 + $"oikea {Oikea.x:0.00} @ {b.xMin:0},{b.yMin:0} {b.width:0}×{b.height:0}, kosketaan {Kosketaan}";
        }

        sealed class Tappi
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
                Juuri.RegisterCallback<PointerCaptureOutEvent>(e => Ylos(osoitin));
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
