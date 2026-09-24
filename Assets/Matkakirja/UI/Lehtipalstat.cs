// LEHTIPALSTAT (Natiivi-UI): pitkä nostoteksti kahdelle palstalle, kun tekstin oma leveys on vähintään 600 pt.
//
// Web .lehtipalsta (css/styles.css "@container (min-width: 600px)", js/ui-apurit.js lehtipalstaKotelo ja
// onPitkaNostoteksti): pitkä = vähintään 600 merkkiä tai vähintään kaksi kappaletta. Palstaväli 1,4 rem
// (22,4 pt), vasen tasaus, kappaleväli 0,65 em, viimeisellä ei väliä. Kapeammassa tilassa (puhelin) yksi palsta.
//
// UITK:ssa ei ole column-countia. Palstat ladotaan itse: koko tekstin korkeus palstan leveydellä mitataan,
// vasen palsta täytetään puoliväliin asti (webin tasapalstat: vasen saa ylimääräisen rivin), ja rajalle osuva
// kappale jaetaan sanojen välistä. <link>…</link>-jaksoa ei katkaista kesken (Nostokortti.Korosta).
// Anfangi vain palstoissa (web .lehtipalsta p:first-of-type::first-letter: American Typewriter 700, 3,1 em,
// line-height 0,82, oikealla 0,12 em, rgba(70, 51, 31, 0.9)); UITK ei kelluta, joten anfangin viereiset rivit
// ladotaan kapeampaan palstaan kuten lehden AnfangiKappale.

using System;
using System.Collections.Generic;
using System.Linq;
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
            var kirjainMittari = Rakenne.Teksti("", "mk-palstat__anfangi mk-palstat__mittari", kotelo);
            kirjainMittari.enableRichText = false;
            Kirjasimet.Aseta(kirjainMittari, Kirjasin.KoneBold);
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
                float koko = mittari.resolvedStyle.fontSize > 0 ? mittari.resolvedStyle.fontSize : 15.5f;
                var anf = Anfangi.Mitoita(kappaleet[0], koko, rivi, kirjainMittari, (s, lev) =>
                    mittari.MeasureTextSize(alku + s, lev, VisualElement.MeasureMode.Exactly, 0, VisualElement.MeasureMode.Undefined).y, palsta);
                // Ensimmäisen kappaleen (tai sen alkuosan) korkeus anfangin kanssa.
                float Korkeus0(string s) => anf == null ? Korkeus(s) : anf.Korkeus(s);
                int n = kappaleet.Count;
                var h = new float[n];
                float yht = 0f;
                for (int i = 0; i < n; i++) { h[i] = i == 0 ? Korkeus0(kappaleet[i]) : Korkeus(kappaleet[i]); yht += h[i] + (i > 0 ? vali : 0f); }
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
                        string osa = string.Join(" ", sanat.GetRange(0, keski));
                        if ((j == 0 ? Korkeus0(osa) : Korkeus(osa)) <= tila) ala = keski; else yla = keski - 1;
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
                VisualElement viimeinen = null;
                for (int i = 0; i < vasen.Count; i++)
                {
                    viimeinen = i == 0 && anf != null ? anf.Luo(pv, vasen[i], Kappale) : Kappale(pv, vasen[i]);
                    if (i == 0 && anf != null) viimeinen.style.marginBottom = vali;
                }
                if (viimeinen != null) viimeinen.style.marginBottom = 0; // web p:last-child / palstan vaihto kesken kappaleen
                viimeinen = null;
                foreach (var k in oikea) viimeinen = Kappale(po, k);
                if (viimeinen != null) viimeinen.style.marginBottom = 0;
            }

            kotelo.RegisterCallback<GeometryChangedEvent>(_ => Lado());
            return kotelo;
        }

        /// <summary>Anfangi palstan ensimmäiseen kappaleeseen: kirjain, sen viereen mahtuvat sanat ja loput alle.</summary>
        sealed class Anfangi
        {
            string kirjain;
            float iso, rivi, sisennys, top;
            int rivit;
            Func<string, float, float> mittaa;
            float palsta;

            /// <summary>null, kun kappale ei ala kirjaimella (esim. korostuslinkki alussa).</summary>
            public static Anfangi Mitoita(string kappale, float koko, float rivi, Label kirjainMittari, Func<string, float, float> mittaa, float palsta)
            {
                if (string.IsNullOrEmpty(kappale) || !char.IsLetterOrDigit(kappale[0])) return null;
                var a = new Anfangi { kirjain = kappale.Substring(0, 1), rivi = rivi, mittaa = mittaa, palsta = palsta };
                a.iso = 3.1f * koko;
                kirjainMittari.style.fontSize = a.iso;
                // Web kellutuslaatikko 0,06 + 0,82 em: se varaa niin monta tekstiriviä kuin ulottuu.
                a.rivit = Mathf.Max(1, Mathf.CeilToInt(0.88f * a.iso / rivi - 0.05f));
                a.sisennys = kirjainMittari.MeasureTextSize(a.kirjain, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x + 0.12f * a.iso;
                // Anfangin perusviiva viimeisen viereisen rivin perusviivalle (kuten lehden AnfangiKappale).
                a.top = Mathf.Round(Nousu(Kirjasin.Luku) * koko + (a.rivit - 1) * rivi - Nousu(Kirjasin.KoneBold) * a.iso);
                return a;
            }

            /// <summary>Fontin nousu kirjasinkoon osuutena (perusviivan etäisyys rivin yläreunasta).</summary>
            static float Nousu(Kirjasin k)
            {
                var fi = Kirjasimet.Hae(k)?.fontAsset?.faceInfo;
                return fi is UnityEngine.TextCore.FaceInfo f && f.pointSize > 0 ? f.ascentLine / f.pointSize : 0.8f;
            }

            (string Vieressa, string Alla) Jaa(string kappale)
            {
                var sanat = Sanat(kappale.Substring(kirjain.Length));
                float kapea = Mathf.Max(1f, palsta - sisennys);
                float raja = mittaa("A" + string.Concat(Enumerable.Repeat("\nA", rivit - 1)), kapea) + 0.5f;
                int ala = 0, yla = sanat.Count;
                while (ala < yla)
                {
                    int keski = (ala + yla + 1) / 2;
                    if (mittaa(string.Join(" ", sanat.GetRange(0, keski)), kapea) <= raja) ala = keski; else yla = keski - 1;
                }
                return (string.Join(" ", sanat.GetRange(0, ala)), string.Join(" ", sanat.GetRange(ala, sanat.Count - ala)));
            }

            public float Korkeus(string kappale)
            {
                var (_, alla) = Jaa(kappale);
                return rivit * rivi + (alla.Length > 0 ? mittaa(alla, palsta) : 0f);
            }

            public VisualElement Luo(VisualElement isa, string kappale, Func<VisualElement, string, Label> teksti)
            {
                var (vieressa, alla) = Jaa(kappale);
                var kpl = Rakenne.El("mk-palstat__anfangikappale", isa, PickingMode.Ignore);
                var k = Rakenne.Teksti(kirjain, "mk-palstat__anfangi", kpl);
                k.enableRichText = false;
                Kirjasimet.Aseta(k, Kirjasin.KoneBold);
                k.style.fontSize = iso;
                k.style.top = top;
                var v = teksti(kpl, vieressa);
                v.style.marginLeft = sisennys;
                v.style.height = rivit * rivi;
                v.style.marginBottom = 0;
                if (alla.Length > 0) { var l = teksti(kpl, alla); l.style.marginBottom = 0; }
                return kpl;
            }
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
