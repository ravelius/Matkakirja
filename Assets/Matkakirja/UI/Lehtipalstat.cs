// LEHTIPALSTAT (Natiivi-UI): pitkä nostoteksti kahdelle palstalle, kun tekstin oma leveys on vähintään 600 pt.
//
// Web .lehtipalsta (css/styles.css "@container (min-width: 600px)", js/ui-apurit.js lehtipalstaKotelo ja
// onPitkaNostoteksti): pitkä = vähintään 600 merkkiä tai vähintään kaksi kappaletta. Palstaväli 1,4 rem
// (22,4 pt), vasen tasaus, kappaleväli 0,65 em, viimeisellä ei väliä. Kapeammassa tilassa (puhelin) yksi palsta.
//
// UITK:ssa ei ole column-countia. Palstat ladotaan itse: koko tekstin korkeus palstan leveydellä mitataan,
// vasen palsta täytetään puoliväliin asti (webin tasapalstat: vasen saa ylimääräisen rivin), ja rajalle osuva
// kappale jaetaan sanojen välistä. <link>…</link>-jaksoa ei katkaista kesken (Nostokortti.Korosta).
// Anfangi puuttuu vielä (web .lehtipalsta p:first-of-type::first-letter).

using System;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Lehtipalstat
    {
        /// <summary>Web LEHTIPALSTA_MERKKEJA.</summary>
        public const int Merkkeja = 600;
        /// <summary>Web @container (min-width: 600px).</summary>
        public const float Raja = 600f;
        /// <summary>Web column-gap 1,4 rem.</summary>
        public const float Rako = 22.4f;

        /// <summary>Web onPitkaNostoteksti: vähintään 600 merkkiä tai vähintään kaksi kappaletta.</summary>
        public static bool OnPitka(string teksti, int kappaleita)
        {
            string koko = (teksti ?? "").Trim();
            return koko.Length >= Merkkeja || kappaleita >= 2;
        }

        /// <summary>
        /// Kappaleet (valmis rich text ilman riviväliä) palstoihin. alku = jokaisen tekstin eteen (riviväli),
        /// varusta = jokaiselle luodulle kappaleelle (linkkien kuuntelu).
        /// </summary>
        public static VisualElement Luo(VisualElement isa, IReadOnlyList<string> kappaleet, string alku, string luokka,
            Kirjasin kirjasin, Action<Label> varusta)
        {
            var kotelo = Rakenne.El("mk-palstat", isa, PickingMode.Ignore);
            // Mittari kantaa kappaleen tyylin (koko, fontti, kappaleväli) ja pysyy piilossa.
            var mittari = Rakenne.Teksti("", luokka, kotelo);
            Kirjasimet.Aseta(mittari, kirjasin);
            mittari.AddToClassList("mk-palstat__mittari");
            var sisus = Rakenne.El("mk-palstat__sisus", kotelo, PickingMode.Ignore);
            float leveys = -1f;

            Label Kappale(VisualElement p, string t)
            {
                var l = Rakenne.Teksti(alku + t, luokka, p);
                Kirjasimet.Aseta(l, kirjasin);
                varusta?.Invoke(l);
                return l;
            }

            void Lado()
            {
                float w = kotelo.contentRect.width;
                if (w <= 0 || float.IsNaN(w) || Mathf.Abs(w - leveys) < 0.5f) return;
                leveys = w;
                sisus.Clear();
                bool kaksi = w >= Raja;
                kotelo.EnableInClassList("mk-palstat--kaksi", kaksi);
                if (!kaksi)
                {
                    foreach (var k in kappaleet) Kappale(sisus, k);
                    return;
                }
                float palsta = Mathf.Floor((w - Rako) / 2f);
                float Korkeus(string s) => mittari.MeasureTextSize(alku + s, palsta, VisualElement.MeasureMode.Exactly, 0,
                    VisualElement.MeasureMode.Undefined).y;
                float vali = mittari.resolvedStyle.marginBottom;
                float rivi = Korkeus("A");
                int n = kappaleet.Count;
                var h = new float[n];
                float yht = 0f;
                for (int i = 0; i < n; i++) { h[i] = Korkeus(kappaleet[i]); yht += h[i] + (i > 0 ? vali : 0f); }
                float tavoite = yht / 2f + rivi * 0.5f;

                var vasen = new List<string>();
                var oikea = new List<string>();
                float kertyma = 0f;
                int j = 0;
                for (; j < n; j++)
                {
                    float alkuvali = vasen.Count > 0 ? vali : 0f;
                    if (kertyma + alkuvali + h[j] <= tavoite) { vasen.Add(kappaleet[j]); kertyma += alkuvali + h[j]; continue; }
                    // Rajalle osuva kappale jaetaan sanojen välistä: vasemmalle niin monta sanaa kuin mahtuu.
                    var sanat = Sanat(kappaleet[j]);
                    float tila = tavoite - kertyma - alkuvali;
                    int ala = 0, yla = sanat.Count - 1;
                    while (ala < yla)
                    {
                        int keski = (ala + yla + 1) / 2;
                        if (Korkeus(string.Join(" ", sanat.GetRange(0, keski))) <= tila) ala = keski; else yla = keski - 1;
                    }
                    if (ala > 0)
                    {
                        vasen.Add(string.Join(" ", sanat.GetRange(0, ala)));
                        oikea.Add(string.Join(" ", sanat.GetRange(ala, sanat.Count - ala)));
                    }
                    else oikea.Add(kappaleet[j]);
                    j++;
                    break;
                }
                for (; j < n; j++) oikea.Add(kappaleet[j]);

                var pv = Rakenne.El("mk-palstat__palsta", sisus, PickingMode.Ignore);
                var po = Rakenne.El("mk-palstat__palsta mk-palstat__palsta--oikea", sisus, PickingMode.Ignore);
                Label viimeinen = null;
                foreach (var k in vasen) viimeinen = Kappale(pv, k);
                if (viimeinen != null) viimeinen.style.marginBottom = 0; // web p:last-child / palstan vaihto kesken kappaleen
                viimeinen = null;
                foreach (var k in oikea) viimeinen = Kappale(po, k);
                if (viimeinen != null) viimeinen.style.marginBottom = 0;
            }

            kotelo.RegisterCallback<GeometryChangedEvent>(_ => Lado());
            return kotelo;
        }

        /// <summary>Välilyönnein erotetut sanat; &lt;link&gt;…&lt;/link&gt; ja muut tagit pysyvät ehjinä.</summary>
        static List<string> Sanat(string teksti)
        {
            var tulos = new List<string>();
            var sb = new StringBuilder();
            int linkki = 0;
            bool tagissa = false;
            for (int i = 0; i < teksti.Length; i++)
            {
                char c = teksti[i];
                if (c == '<')
                {
                    if (string.CompareOrdinal(teksti, i, "<link", 0, 5) == 0) linkki++;
                    else if (string.CompareOrdinal(teksti, i, "</link>", 0, 7) == 0) linkki = Math.Max(0, linkki - 1);
                    tagissa = true;
                }
                else if (c == '>') tagissa = false;
                if (c == ' ' && linkki == 0 && !tagissa)
                {
                    if (sb.Length > 0) { tulos.Add(sb.ToString()); sb.Clear(); }
                    continue;
                }
                sb.Append(c);
            }
            if (sb.Length > 0) tulos.Add(sb.ToString());
            return tulos;
        }
    }
}
