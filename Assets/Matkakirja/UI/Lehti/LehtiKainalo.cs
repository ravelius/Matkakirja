// LEHDEN LEVEÄ TAITTO (Natiivi-UI): aihesivun nostot ≥ 700 pt:n ruudulla kuten webissä (css/styles.css
// @media (min-width: 700px), js/maalehti.js piirraKategoria).
//
//   Kuvallinen nosto, KAINALO: kuva kelluu oikealla (36 % leveydestä, pystykuva > 1,15 × leveys 27 %,
//   marginaali 0,2 rem 0 0,7 rem 1,6 rem) ja leipäteksti juoksee sen vierellä yhtenä palstana ja kuvan alta
//   täysleveänä. TÄYSLEVEÄ (noston leveys 'taysi' tai kuvasuhde ≥ 1,6, ei kun leveys 'kapea'): kuva koko
//   palstan levyisenä (enintään 520 px) ja teksti kahdella palstalla. Kuvaton nosto: kaksi palstaa.
//   Palstat: väli 2,2 rem, välissä 1 px:n viiva rgba(70, 51, 31, 0.25).
//
// UITK ei kelluta eikä palstoita: Virtaa latoo kappaleet alueisiin (kuvan viereinen + alle, tai vasen + oikea
// palsta), mittaa korkeudet samalla rivivälillä kuin Leipa ja jakaa rajalle osuvan kappaleen sanojen välistä.
// Anfangi ja lihavoitu aloitus säilyvät (AnfangiKappale, JaaLihavointi).

using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed partial class Lehtinakyma
    {
        /// <summary>Web @media (min-width: 700px).</summary>
        const float LeveaTaitto = 700f;
        const float KainaloOsuus = 0.36f, KainaloPystyOsuus = 0.27f, KainaloVali = 25.6f, KainaloYla = 3.2f, KainaloAla = 11.2f;
        const float PalstaRako = 35.2f;
        /// <summary>Web .wiki-nosto .leipa column-rule rgba(70, 51, 31, 0.25) paperin #f5f0e2 päällä (sRGB).</summary>
        static readonly Color PalstaViiva = new Color32(201, 193, 177, 255);

        bool LeveaLehti()
        {
            float w = UiKerros.Hae().Juuri(Kerros).layout.width;
            return !float.IsNaN(w) && w >= LeveaTaitto;
        }

        /// <summary>
        /// Noston kuva ja leipäteksti leveällä ruudulla. kuvat tyhjä = kuvaton (kaksi palstaa).
        /// Palauttaa false, kun leveä taitto ei koske tätä nostoa (kapea ruutu).
        /// </summary>
        bool LeveaNosto(VisualElement lohko, LehtiNosto n, List<LehtiKuva> kuvat, bool ensimmainen, Action<VisualElement> media)
        {
            if (!LeveaLehti()) return false;
            var paikka = Rakenne.El("mk-lehti__levea", lohko, PickingMode.Ignore);
            // Ääneenluku: sama piilotettu kokonaisteksti kuin Leipassa.
            if (!string.IsNullOrEmpty(n.Teksti))
            {
                var luettava = Rakenne.Teksti(n.Teksti.Replace("**", ""), "mk-lehti__luettava", lohko);
                luettava.enableRichText = false;
                luettava.style.display = DisplayStyle.None;
            }
            var kappaleet = string.IsNullOrEmpty(n.Teksti) ? new List<string>() : Kappalejako.Jaa(n.Teksti);
            if (kappaleet.Count > 0) kappaleet[0] = Aloitus(kappaleet[0], ensimmainen);
            string tila = kuvat.Count == 0 ? "palstat" : n.Leveys == "taysi" ? "taysi" : "kainalo";

            void Rakenna()
            {
                // Loppurivi voi olla siirretty kainaloon (KainaloonLoppu): se säilyy uudelleenrakennuksen yli.
                var loppu = paikka.Q(className: "mk-lehti__nostoloppu");
                loppu?.RemoveFromHierarchy();
                paikka.Clear();
                if (tila == "kainalo" || tila == "pysty") Kainalo(paikka, n, kuvat, kappaleet, ensimmainen, tila == "pysty", media, suhde =>
                {
                    // Web: suunta ja suhde selviävät vasta kuvan latauduttua (pysty > 1,15; täysleveä ≥ 1,6).
                    string uusi = n.Leveys != "kapea" && 1f / suhde >= 1.6f ? "taysi" : suhde > 1.15f ? "pysty" : "kainalo";
                    if (uusi == tila) return;
                    tila = uusi;
                    paikka.schedule.Execute(Rakenna);
                });
                else
                {
                    if (kuvat.Count > 1) Kuvasarja(paikka, kuvat, "mk-lehti__nostokuva mk-lehti__nostokuva--taysi", true);
                    else if (kuvat.Count == 1)
                    {
                        Kuva(paikka, kuvat[0], kuvat, 0, "mk-lehti__nostokuva mk-lehti__nostokuva--taysi", 0.56f);
                        Kuvateksti(paikka, kuvat[0], true);
                    }
                    media?.Invoke(paikka);
                    Palstat(paikka, kappaleet, ensimmainen);
                }
                if (loppu != null)
                {
                    if (paikka.Q(className: "mk-lehti__kainalo") != null) KainaloonLoppu(paikka, loppu);
                    else lohko.Insert(lohko.IndexOf(paikka) + 1, loppu);
                }
            }
            Rakenna();
            return true;
        }

        /// <summary>Kuva oikealle kellumaan, teksti vierelle ja alle.</summary>
        void Kainalo(VisualElement isa, LehtiNosto n, List<LehtiKuva> kuvat, List<string> kappaleet, bool anfangi, bool pysty,
            Action<VisualElement> media, Action<float> suhdeSelvisi)
        {
            media?.Invoke(isa);
            var virtaus = Rakenne.El("mk-lehti__kainalo", isa, PickingMode.Ignore);
            var kuvapalsta = Rakenne.El("mk-lehti__kainalokuva", virtaus, PickingMode.Ignore);
            kuvapalsta.style.width = Length.Percent((pysty ? KainaloPystyOsuus : KainaloOsuus) * 100f);
            kuvapalsta.style.top = KainaloYla;
            if (kuvat.Count > 1) Kuvasarja(kuvapalsta, kuvat, "mk-lehti__nostokuva", true);
            else
            {
                Kuva(kuvapalsta, kuvat[0], kuvat, 0, "mk-lehti__nostokuva", 0.66f);
                Kuvateksti(kuvapalsta, kuvat[0], true);
            }
            var vieri = Rakenne.El("mk-lehti__kainaloteksti", virtaus, PickingMode.Ignore);
            var ala = Rakenne.El("mk-lehti__kainaloteksti", virtaus, PickingMode.Ignore);
            var mittari = LeipanMittari(virtaus);
            float leveys = -1f, kuvaKorkeus = -1f;
            void Lado()
            {
                float w = virtaus.contentRect.width;
                var kehys = kuvapalsta.Q(className: "mk-lehti__kuvakehys");
                float kh = kuvapalsta.layout.height;
                if (w <= 0 || float.IsNaN(w) || float.IsNaN(kh)) return;
                if (kehys != null && kehys.layout.width > 0 && kehys.layout.height > 0) suhdeSelvisi?.Invoke(kehys.layout.height / kehys.layout.width);
                if (Mathf.Abs(w - leveys) < 0.5f && Mathf.Abs(kh - kuvaKorkeus) < 0.5f) return;
                leveys = w;
                kuvaKorkeus = kh;
                float kuvaLeveys = kuvapalsta.layout.width;
                float vieriLeveys = Mathf.Max(1f, w - kuvaLeveys - KainaloVali);
                float kuvanAla = KainaloYla + kh + KainaloAla;
                vieri.style.width = vieriLeveys;
                // Kelluva kuva varaa korkeutensa, vaikka teksti loppuisi sen vierellä.
                virtaus.style.minHeight = kuvanAla;
                float rivi = mittari.Rivi;
                Virtaa(new[] { vieri, ala }, new[] { vieriLeveys, w }, new[] { kuvanAla, float.PositiveInfinity }, rivi - 1f,
                    kappaleet, anfangi, mittari);
                virtaus.userData = vieriLeveys;
                Loppuriville(virtaus);
            }
            virtaus.RegisterCallback<GeometryChangedEvent>(_ => Lado());
            kuvapalsta.RegisterCallback<GeometryChangedEvent>(_ => Lado());
            // Täysleveä osa alkaa aina kuvan alta (web: kelluvan kuvan ohi ei ladota leveää riviä).
            vieri.RegisterCallback<GeometryChangedEvent>(_ =>
            {
                float yla = ala.childCount > 0 ? Mathf.Max(0f, KainaloYla + kuvaKorkeus + KainaloAla - vieri.layout.height) : 0f;
                if (!Mathf.Approximately(ala.resolvedStyle.marginTop, yla)) ala.style.marginTop = yla;
            });
        }

        /// <summary>
        /// Web: noston loppurivi ("Lue lisää aiheesta" ja reaktiot) on tekstin jatkoa, joten se asettuu kuvan
        /// vierelle, jos teksti loppuu ennen kuvan alareunaa; noston alareuna (viiva) tulee silti kuvan alta.
        /// </summary>
        static void KainaloonLoppu(VisualElement lohko, VisualElement loppu)
        {
            var virtaus = lohko.Q(className: "mk-lehti__kainalo");
            if (virtaus == null || loppu == null) return;
            virtaus.Add(loppu);
            Loppuriville(virtaus);
        }

        static void Loppuriville(VisualElement virtaus)
        {
            var loppu = virtaus.Q(className: "mk-lehti__nostoloppu");
            var tekstit = virtaus.Query(className: "mk-lehti__kainaloteksti").ToList();
            if (loppu == null || tekstit.Count < 2 || !(virtaus.userData is float vieriLeveys)) return;
            bool vierella = tekstit[1].childCount == 0;
            loppu.style.width = vierella ? vieriLeveys : StyleKeyword.Null;
        }

        /// <summary>Kaksi palstaa ja välissä viiva (web .wiki-nosto .leipa columns 2, column-rule).</summary>
        void Palstat(VisualElement isa, List<string> kappaleet, bool anfangi)
        {
            if (kappaleet.Count == 0) return;
            var rivi0 = Rakenne.El("mk-lehti__palstat", isa, PickingMode.Ignore);
            var vasen = Rakenne.El("mk-lehti__palsta", rivi0, PickingMode.Ignore);
            var viiva = Rakenne.El("mk-lehti__palstaviiva", rivi0, PickingMode.Ignore);
            viiva.style.backgroundColor = PalstaViiva;
            var oikea = Rakenne.El("mk-lehti__palsta", rivi0, PickingMode.Ignore);
            var mittari = LeipanMittari(isa);
            float leveys = -1f;
            void Lado()
            {
                float w = rivi0.contentRect.width;
                if (w <= 0 || float.IsNaN(w) || Mathf.Abs(w - leveys) < 0.5f) return;
                leveys = w;
                float palsta = Mathf.Floor((w - PalstaRako) / 2f);
                vasen.style.width = palsta;
                oikea.style.width = palsta;
                // Tasapalstat: vasen täytetään puoliväliin (web column-fill balance, vasen saa ylimääräisen rivin).
                float yht = mittari.Yhteensa(kappaleet, palsta, anfangi);
                Virtaa(new[] { vasen, oikea }, new[] { palsta, palsta }, new[] { yht / 2f, float.PositiveInfinity },
                    mittari.Rivi * 0.5f, kappaleet, anfangi, mittari);
            }
            rivi0.RegisterCallback<GeometryChangedEvent>(_ => Lado());
        }

        /// <summary>
        /// Leipätekstin mittari ja anfangin mitat. Oletus mk-lehti__teksti (Iowan, riviväli 1,62, kappaleväli 0,49 em);
        /// etusivun intro mk-lehti__esittely (American Typewriter, 1,6, 0,7 em, tasattu).
        /// </summary>
        sealed class LeipaMittari
        {
            public Label Teksti, Kirjain;
            public string Luokka = "mk-lehti__teksti";
            public float RiviEm = 1.62f, ValiEm = 0.49f, OletusKoko = 16.32f;
            public Kirjasin Kirjasin = Kirjasin.Luku;
            public bool Tasaa;
            float Koko => Teksti.resolvedStyle.fontSize > 0 ? Teksti.resolvedStyle.fontSize : OletusKoko;
            public float Rivi => RiviEm * Koko;
            public float Vali => Mathf.Round(ValiEm * Koko);

            public float Korkeus(string s, float w) =>
                Teksti.MeasureTextSize(Rivivali(s, RiviEm, Tasaa), w, VisualElement.MeasureMode.Exactly, 0, VisualElement.MeasureMode.Undefined).y;

            /// <summary>AnfangiKappaleen korkeus: viereiset rivit (rivit × riviväli) ja loput täysleveänä.</summary>
            public float KorkeusAnfangilla(string s, float w)
            {
                float f = Koko, iso = 3.1f * f, rivi = RiviEm * f;
                int n = 0;
                while (n < s.Length && !char.IsLetterOrDigit(s[n])) n++;
                n = Mathf.Min(s.Length, n + 1);
                string eka = s.Substring(0, n), loput = s.Substring(n);
                Kirjain.style.fontSize = iso;
                int rivit = Mathf.Max(1, Mathf.CeilToInt(0.88f * iso / rivi - 0.05f));
                float sisennys = Kirjain.MeasureTextSize(eka, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x + 0.12f * iso;
                float kapea = Mathf.Max(1f, w - sisennys);
                float raja = Korkeus("A" + string.Concat(Enumerable.Repeat("\n" + "A", rivit - 1)), kapea) + 0.5f;
                var sanat = loput.Split(' ');
                int ala = 0, yla = sanat.Length;
                while (ala < yla)
                {
                    int keski = (ala + yla + 1) / 2;
                    if (Korkeus(string.Join(" ", sanat, 0, keski), kapea) <= raja) ala = keski; else yla = keski - 1;
                }
                string jaljella = string.Join(" ", sanat, ala, sanat.Length - ala).TrimStart();
                return rivit * rivi + (jaljella.Length > 0 ? Korkeus(jaljella, w) : 0f);
            }

            public float Yhteensa(List<string> kappaleet, float w, bool anfangi)
            {
                float y = 0f;
                for (int i = 0; i < kappaleet.Count; i++)
                    y += (i > 0 ? Vali : 0f) + (i == 0 && anfangi ? KorkeusAnfangilla(kappaleet[i], w) : Korkeus(kappaleet[i], w));
                return y;
            }
        }

        static LeipaMittari LeipanMittari(VisualElement isa, LeipaMittari m = null)
        {
            m ??= new LeipaMittari();
            m.Teksti = Rivitetty("", m.Luokka + " mk-lehti__mittari", m.RiviEm, isa, m.Kirjasin, m.Tasaa);
            var k = Rakenne.Teksti("", "mk-lehti__anfangi mk-lehti__mittari", isa);
            k.enableRichText = false;
            Kirjasimet.Aseta(k, Kirjasin.KoneBold);
            m.Kirjain = k;
            return m;
        }

        /// <summary>Web @media (min-width: 768px): etusivun intro kahdella palstalla.</summary>
        const float IntroRaja = 768f, IntroRako = 32f;

        bool IntroLevea()
        {
            float w = UiKerros.Hae().Juuri(Kerros).layout.width;
            return !float.IsNaN(w) && w >= IntroRaja;
        }

        /// <summary>
        /// Web .dialog.lehti #arrival-intro ≥ 768 px (mitattu 24.9. b12, web-intro-mitat.txt): column-count 2, väli
        /// 2 rem (32), ei palstaviivaa, text-align justify, hyphens auto, p 0 0 0,7 em; American Typewriter 16 px,
        /// riviväli 1,6, anfangi ensimmäisessä kappaleessa. Tavutus pehmein tavuviivoin (Tavutus.Suomi).
        /// </summary>
        void IntroPalstat(VisualElement isa, string teksti)
        {
            var lohko = Rakenne.El("mk-lehti__leipa", isa, PickingMode.Ignore);
            var luettava = Rakenne.Teksti(teksti.Replace("**", ""), "mk-lehti__luettava", lohko);
            luettava.enableRichText = false;
            luettava.style.display = DisplayStyle.None;
            var kappaleet = Kappalejako.Jaa(teksti).Select(Tavutus.Suomi).ToList();
            if (kappaleet.Count == 0) return;
            var rivi0 = Rakenne.El("mk-lehti__palstat", lohko, PickingMode.Ignore);
            var vasen = Rakenne.El("mk-lehti__palsta", rivi0, PickingMode.Ignore);
            var vali = Rakenne.El(null, rivi0, PickingMode.Ignore);
            vali.style.width = IntroRako;
            var oikea = Rakenne.El("mk-lehti__palsta", rivi0, PickingMode.Ignore);
            var mittari = LeipanMittari(lohko, new LeipaMittari
            {
                Luokka = "mk-lehti__esittely", RiviEm = 1.6f, ValiEm = 0.7f, OletusKoko = 16f, Kirjasin = Kirjasin.Kone, Tasaa = true,
            });
            float leveys = -1f;
            void Lado()
            {
                float w = rivi0.contentRect.width;
                if (w <= 0 || float.IsNaN(w) || Mathf.Abs(w - leveys) < 0.5f) return;
                leveys = w;
                float palsta = Mathf.Floor((w - IntroRako) / 2f);
                vasen.style.width = palsta;
                oikea.style.width = palsta;
                float yht = mittari.Yhteensa(kappaleet, palsta, true);
                Virtaa(new[] { vasen, oikea }, new[] { palsta, palsta }, new[] { yht / 2f, float.PositiveInfinity },
                    mittari.Rivi * 0.5f, kappaleet, true, mittari);
            }
            rivi0.RegisterCallback<GeometryChangedEvent>(_ => Lado());
        }

        /// <summary>
        /// Kappaleet alueisiin järjestyksessä: kukin alue ottaa tekstiä, kunnes seuraava rivi ei enää mahdu sen
        /// kattoon (+ vara); rajalle osuva kappale jaetaan sanojen välistä ja jatkuu seuraavassa alueessa.
        /// Viimeinen alue ottaa loput.
        /// </summary>
        static void Virtaa(VisualElement[] alueet, float[] leveydet, float[] katot, float vara, List<string> kappaleet, bool anfangi, LeipaMittari m)
        {
            foreach (var a in alueet) a.Clear();
            int r = 0;
            float y = 0f;
            VisualElement viimeinen = null;
            for (int i = 0; i < kappaleet.Count; i++)
            {
                string k = kappaleet[i];
                bool anf = anfangi && i == 0;
                while (true)
                {
                    float w = leveydet[r], alkuvali = y > 0 ? m.Vali : 0f;
                    bool viimeinenAlue = r == alueet.Length - 1;
                    float h = anf ? m.KorkeusAnfangilla(k, w) : m.Korkeus(k, w);
                    if (viimeinenAlue || y + alkuvali + h <= katot[r] + vara)
                    {
                        if (viimeinen != null && y > 0) viimeinen.style.marginBottom = m.Vali;
                        viimeinen = Lisaa(alueet[r], k, anf, m);
                        y += alkuvali + h;
                        break;
                    }
                    // Rajalle osuva kappale: vasemmalle niin monta sanaa kuin mahtuu.
                    var sanat = k.Split(' ');
                    float tila = katot[r] + vara - y - alkuvali;
                    int ala = 0, yla = sanat.Length - 1;
                    while (ala < yla)
                    {
                        int keski = (ala + yla + 1) / 2;
                        string osa = string.Join(" ", sanat, 0, keski);
                        if ((anf ? m.KorkeusAnfangilla(osa, w) : m.Korkeus(osa, w)) <= tila) ala = keski; else yla = keski - 1;
                    }
                    if (ala > 0)
                    {
                        var (alku, loppu) = JaaLihavointi(string.Join(" ", sanat, 0, ala), string.Join(" ", sanat, ala, sanat.Length - ala));
                        if (viimeinen != null && y > 0) viimeinen.style.marginBottom = m.Vali;
                        Lisaa(alueet[r], alku, anf, m);
                        k = loppu;
                        anf = false;
                    }
                    viimeinen = null;
                    r++;
                    y = 0f;
                }
            }
            if (viimeinen != null) viimeinen.style.marginBottom = 0;
        }

        static VisualElement Lisaa(VisualElement alue, string k, bool anfangi, LeipaMittari m)
        {
            var e = anfangi ? AnfangiKappale(alue, k, m.Luokka, m.RiviEm, m.Kirjasin, m.Tasaa)
                : Rivitetty(k, m.Luokka, m.RiviEm, alue, m.Kirjasin, m.Tasaa);
            e.style.marginBottom = 0;
            return e;
        }
    }
}
