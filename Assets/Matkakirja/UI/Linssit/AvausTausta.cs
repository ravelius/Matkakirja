// IHMISEN MATKAN ALOITUKSEN KEN BURNS -TAUSTA (Natiivi-UI): webin css/aikajana.css
// "ALOITUSKORTIN KEN BURNS -TAUSTA" (omistaja 9.9.2026: kuvat isona taustalle,
// hidas liike + ristihäivytys, reunat mustaan, sumennettuina ja tummennettuina;
// paperi ja teksti päälle ilman kuvaa).
//
// Kerrokset: musta pohja — kuvat — vinjetti (Kuviot.Vinjetti: webin säteittäinen
// maski + suorat reunapimennykset yhtenä tekstuurina). Pergamentti on ylemmässä
// kerroksessa (LinssiUi.Kerros), joten se pysyy terävänä.
//
// Ajastus kuten webissä: kuusi kuvaa × 6,5 s = 39 s kierros; kuva i alkaa i × 6,5 s
// myöhemmin, nousee 1,5 s, näkyy 6,5 s:iin asti ja häipyy 8,0 s:iin; liike kestää
// koko näkyvyyden (0–8 s), kolme liikesuuntaa vuorotellen. Kierros lähtee, kun
// ensimmäinen kuva on ladattu (webin .kaynnissa). Pieni liike: ei Ken Burnsia,
// pelkkä ristihäivytys.
//
// Ero webiin: UI Toolkitissa ei ole filter: blur(); tummennus (brightness 0,55) on
// kuvan sävytyksenä, sumennus puuttuu.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class AvausTausta
    {
        const float Vaihto = 6.5f, Nousu = 1.5f, Nakyvilla = 6.5f, Haipynyt = 8.0f;
        const int SisaanMs = 1100;

        // webin avaus-tausta-liike-a/b/c: (skaala, x %, y %) alussa ja lopussa.
        static readonly (float s0, float x0, float y0, float s1, float x1, float y1)[] Liikkeet =
        {
            (1.05f, -1.6f, 1f, 1.15f, 1.6f, -1f),
            (1.14f, 1.4f, -1.2f, 1.05f, -1.4f, 0.8f),
            (1.06f, 1.5f, 1.2f, 1.15f, -1.5f, -1.2f),
        };

        readonly VisualElement juuri, kuvat;
        readonly List<VisualElement> tasot = new List<VisualElement>();
        IVisualElementScheduledItem ajo, piiloon;
        float alku = -1f;
        int versio;

        public AvausTausta(VisualElement isa)
        {
            juuri = Rakenne.El("mk-avaustausta", isa, PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;
            kuvat = Rakenne.El("mk-avaustausta__kuvat", juuri, PickingMode.Ignore);
            var vinjetti = Rakenne.El("mk-avaustausta__vinjetti", juuri, PickingMode.Ignore);
            Rakenne.Tausta(vinjetti, Kuviot.Vinjetti);
        }

        /// <summary>Tausta näkyviin (musta heti, kuvat häivyttäen, kun ensimmäinen on ladattu).</summary>
        public void Nayta(IReadOnlyList<string> osoitteet)
        {
            int v = ++versio;
            piiloon?.Pause();
            ajo?.Pause();
            kuvat.Clear();
            tasot.Clear();
            alku = -1f;
            juuri.style.transitionDuration = new List<TimeValue> { new TimeValue(0, TimeUnit.Millisecond) };
            juuri.style.opacity = 1f;
            juuri.style.display = DisplayStyle.Flex;
            kuvat.style.transitionDuration = new List<TimeValue> { new TimeValue(0, TimeUnit.Millisecond) };
            kuvat.style.opacity = 0f;
            for (int i = 0; i < osoitteet.Count; i++)
            {
                var taso = Rakenne.El("mk-avaustausta__kuva", kuvat, PickingMode.Ignore);
                taso.style.opacity = 0f;
                tasot.Add(taso);
                Kuvat.Hae(osoitteet[i], t =>
                {
                    if (t == null || v != versio) return;
                    taso.style.backgroundImage = new StyleBackground(t);
                    if (alku < 0f) Kaynnista();
                });
            }
        }

        void Kaynnista()
        {
            alku = Time.realtimeSinceStartup;
            kuvat.style.transitionDuration = new List<TimeValue> { new TimeValue(SisaanMs, TimeUnit.Millisecond) };
            kuvat.style.opacity = 1f;
            Paivita();
            ajo = juuri.schedule.Execute(Paivita).Every(33);
        }

        /// <summary>Tausta häipyy (Käynnistä: 550 ms kuten webin .pois) ja kierros pysähtyy.</summary>
        public void Pois(int kestoMs)
        {
            versio++;
            ajo?.Pause();
            piiloon?.Pause();
            if (juuri.style.display.value == DisplayStyle.None) return;
            juuri.style.transitionDuration = new List<TimeValue> { new TimeValue(kestoMs, TimeUnit.Millisecond) };
            juuri.style.opacity = 0f;
            piiloon = juuri.schedule.Execute(() =>
            {
                juuri.style.display = DisplayStyle.None;
                kuvat.Clear();
                tasot.Clear();
            }).StartingIn(kestoMs + 50);
        }

        void Paivita()
        {
            if (alku < 0f || tasot.Count == 0) return;
            float t = Time.realtimeSinceStartup - alku;
            float kierros = Vaihto * tasot.Count;
            bool liike = !LinssiUi.VahennettyLiike();
            for (int i = 0; i < tasot.Count; i++)
            {
                var taso = tasot[i];
                float oma = t - i * Vaihto;
                if (oma < 0f) { taso.style.opacity = 0f; continue; }
                oma %= kierros;
                float a = oma < Nousu ? oma / Nousu
                    : oma < Nakyvilla ? 1f
                    : oma < Haipynyt ? 1f - (oma - Nakyvilla) / (Haipynyt - Nakyvilla)
                    : 0f;
                taso.style.opacity = Mathf.Clamp01(a);
                if (!liike)
                {
                    taso.style.scale = new Scale(new Vector3(1.08f, 1.08f, 1f));
                    taso.style.translate = new Translate(0, 0);
                    continue;
                }
                var l = Liikkeet[i % Liikkeet.Length];
                // ease-in-out näkyvyyden ajan, sitten alkuun (peittävyys on jo nolla).
                float p = oma < Haipynyt ? oma / Haipynyt : 0f;
                p = p * p * (3f - 2f * p);
                float s = Mathf.Lerp(l.s0, l.s1, p);
                taso.style.scale = new Scale(new Vector3(s, s, 1f));
                taso.style.translate = new Translate(
                    new Length(Mathf.Lerp(l.x0, l.x1, p), LengthUnit.Percent),
                    new Length(Mathf.Lerp(l.y0, l.y1, p), LengthUnit.Percent));
            }
        }
    }
}
