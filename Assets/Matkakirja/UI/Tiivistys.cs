// PIENENNETTY = MAHDOLLISIMMAN TIIVIS, ANIMOIDEN (omistaja 28.9.2026, Raamattu PR #3527, sanatarkasti astrolinssin
// selitteestä: "pitää pienentää tuo selittelen palkki kun se on Pienennetty. Tee siitä yleinen tapa. Se on jo
// matkakirjassa. Eli animoitu pienennys mahdollisimman tiiviiksi."): webin js/tiivistys.js animoiKoko natiivissa
// (Linssiseppä 29.9.2026, ensimmäinen käyttäjä astronautin kuvanäkymän selite, Kuvanakyma.cs).
//
// YLEINEN APURI kaikille pienennettäville selitteille, inforuuduille, palkeille ja paneeleille: AnimoiKoko(el, muutos)
// lukee laatikon koon, tekee muutoksen (luokka pois/päälle), lukee uuden koon ja liu'uttaa leveyden ja korkeuden
// vanhasta uuteen (FLIP, 250 ms, CSS:n ease kuten webissä). Lopuksi kiinteät mitat poistetaan, joten laatikko on taas
// sisältönsä kokoinen eikä jää animaation lukitsemaan mittaan.
//
// UI TOOLKIT EI MITTAA HETI: selain antaa uuden koon getBoundingClientRectillä heti luokan vaihdon jälkeen, UI Toolkit
// vasta seuraavalla asettelukierroksella. Uusi koko luetaan siksi kierroksen GeometryChangedEventistä, ja vanha koko
// asetetaan samassa kutsussa takaisin. Asettelija ajaa kierroksen silloin uudelleen saman ruudun aikana ennen piirtoa,
// joten uutta kokoa ei näy välikuvana. Kutsu, jota ei seuraa kokomuutos kolmen ruudun sisällä, ei animoi myöhempää
// muutosta (vanhentunut mittaus).
//
// Liuku alkaa kesken olevan liu'un kohdasta (kuten webissä). Pieni liike pois (päävalikko, LinssiUi.VahennettyLiike):
// muutos suoraan ilman liukua.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Tiivistys
    {
        /// <summary>Pienennyksen ja avauksen kesto (s), webin TIIVISTYKSEN_MS 250.</summary>
        public const float Kesto = 0.25f;

        /// <summary>Uuden koon on tultava viimeistään näin monen ruudun kuluttua; myöhempi muutos ei kuulu kutsulle.</summary>
        const int MittausRuutuja = 3;

        sealed class Liuku
        {
            public EventCallback<GeometryChangedEvent> Mittaus;
            public IVisualElementScheduledItem Ajo;
            public bool Lukittu;
        }

        static readonly Dictionary<VisualElement, Liuku> kesken = new Dictionary<VisualElement, Liuku>();

        /// <summary>Kesken olevat liu'ut (testikomennot ja laitemittaus).</summary>
        public static int Kesken => kesken.Count;

        /// <summary>
        /// Tekee <paramref name="muutos"/>-kutsun ja liu'uttaa <paramref name="el"/>:n koon vanhasta uuteen. Näkymätön tai
        /// mittaamaton laatikko (ensimmäinen avaus) muuttuu suoraan.
        /// </summary>
        public static void AnimoiKoko(VisualElement el, Action muutos, float kesto = Kesto)
        {
            if (el == null) { muutos?.Invoke(); return; }
            var ennen = el.layout;
            // Kesken oleva liuku päättyy: uusi alkaa siitä, mihin edellinen jäi (ennen on sen viimeisin koko).
            Lopeta(el);
            muutos?.Invoke();
            if (LinssiUi.VahennettyLiike() || el.panel == null || float.IsNaN(ennen.width) || !(ennen.width > 0f)
                || !(ennen.height > 0f) || el.resolvedStyle.display == DisplayStyle.None)
                return;

            var l = new Liuku();
            int ruutu = Time.frameCount;
            l.Mittaus = e =>
            {
                el.UnregisterCallback(l.Mittaus);
                l.Mittaus = null;
                var jalkeen = e.newRect;
                if (Time.frameCount - ruutu > MittausRuutuja || float.IsNaN(jalkeen.width)
                    || (Mathf.Abs(jalkeen.width - ennen.width) < 1f && Mathf.Abs(jalkeen.height - ennen.height) < 1f))
                {
                    Poista(el, l);
                    return;
                }
                Aloita(el, l, ennen.size, jalkeen.size, kesto);
            };
            kesken[el] = l;
            el.RegisterCallback(l.Mittaus);
            // Varmistus: jos kokomuutosta ei tule (sama koko), mittaus puretaan eikä jää odottamaan myöhempää muutosta.
            el.schedule.Execute(() => { if (l.Mittaus != null && !l.Lukittu) Poista(el, l); }).StartingIn(500);
            Ruudunpaivitys.Herata(kesto + 0.3f);
        }

        static void Aloita(VisualElement el, Liuku l, Vector2 a, Vector2 b, float kesto)
        {
            var s = el.style;
            l.Lukittu = true;
            s.overflow = Overflow.Hidden;
            // USS:n max-width (avattu 560 px, kelattu 78 %) ei saa katkaista lähtökokoa: liuku kulkee omilla mitoillaan.
            s.maxWidth = new StyleLength(StyleKeyword.None);
            s.maxHeight = new StyleLength(StyleKeyword.None);
            s.width = a.x;
            s.height = a.y;
            float alku = Time.unscaledTime;
            l.Ajo = el.schedule.Execute(() =>
            {
                Ruudunpaivitys.Herata(0.1f); // täysi taajuus liu'un ajan
                float t = kesto <= 0f ? 1f : Mathf.Clamp01((Time.unscaledTime - alku) / kesto);
                float k = Ease(t);
                s.width = Mathf.Lerp(a.x, b.x, k);
                s.height = Mathf.Lerp(a.y, b.y, k);
                if (t >= 1f) Lopeta(el);
            }).Every(16);
        }

        /// <summary>Päättää kesken olevan liu'un: laatikko palaa sisältönsä kokoiseksi (kiinteät mitat pois).</summary>
        public static void Lopeta(VisualElement el)
        {
            if (el == null || !kesken.TryGetValue(el, out var l)) return;
            Poista(el, l);
        }

        static void Poista(VisualElement el, Liuku l)
        {
            if (l.Mittaus != null) { el.UnregisterCallback(l.Mittaus); l.Mittaus = null; }
            l.Ajo?.Pause();
            l.Ajo = null;
            if (l.Lukittu)
            {
                var s = el.style;
                s.width = StyleKeyword.Null;
                s.height = StyleKeyword.Null;
                s.maxWidth = StyleKeyword.Null;
                s.maxHeight = StyleKeyword.Null;
                s.overflow = StyleKeyword.Null;
                l.Lukittu = false;
            }
            if (kesken.TryGetValue(el, out var nyt) && ReferenceEquals(nyt, l)) kesken.Remove(el);
        }

        /// <summary>CSS:n ease = cubic-bezier(0.25, 0.1, 0.25, 1), webin siirtymän käyrä: nopea alku, pehmeä loppu.</summary>
        public static float Ease(float x)
        {
            if (x <= 0f) return 0f;
            if (x >= 1f) return 1f;
            // Käyrän parametri t, jolla X(t) = x (Newton; X' > 0 koko välillä), ja sen Y(t).
            float t = x;
            for (int i = 0; i < 8; i++)
            {
                float ero = Bezier(t, 0.25f, 0.25f) - x;
                if (Mathf.Abs(ero) < 1e-5f) break;
                t = Mathf.Clamp01(t - ero / BezierDerivaatta(t, 0.25f, 0.25f));
            }
            return Bezier(t, 0.1f, 1f);
        }

        static float Bezier(float t, float p1, float p2)
        {
            float u = 1f - t;
            return 3f * u * u * t * p1 + 3f * u * t * t * p2 + t * t * t;
        }

        static float BezierDerivaatta(float t, float p1, float p2)
        {
            float u = 1f - t;
            return 3f * u * u * p1 + 6f * u * t * (p2 - p1) + 3f * t * t * (1f - p2);
        }
    }
}
