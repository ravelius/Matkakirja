// CODEXIN PUURADIO YHTENÄ KUVANA (omistaja 29.9.2026: "Radio on aina päällä, joten ei tarvitse kikkailla tasojen kanssa,
// vaan Codex voi suoraan tehdä yhden kuvan. Ainut, mikä jätetään tyhjäksi, on VU-mittarin neula, joka animoidaan, sekä
// näytön teksti."; Codexin toimitus ~/Documents/Codex/2026-09-29/radio-yksikuva/<versio>, manifest.json, tuonti
// tyokalut/radio_yksikuva.py): iPad 1400 × 520 ja iPhone 1100 × 600, valaistu radio.png (lamput valaisevat puuta, runko
// varjossa, ohut sinertävä reunavalo) ja VU-neula 160 × 160 -rajauksena (akseli rajauksen keskellä = vu_needle_pivot).
// Pelin omat osat kuvan päällä: pistenäyttö display_text_safe_boundsiin (kuvan pistepohja korvaa sammuneet pisteet),
// asteikon nimet ja veto tuning_scale_boundsiin (kuvan viivat ja punainen osoitin korvaavat piirretyt), virtakytkin
// power_hit-kohtaan (vähintään 44 pt; kytkin sulkee linssin). Radio vie enintään 22 % näkymän pinta-alasta.
// Ilman kuvia (vanha käännös) vanha kotelo jää käyttöön.
using Matkakirja.Linssit.Radio;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed partial class RadioNakyma
    {
        /// <summary>Codexin radion variantti: kangas, neula ja alueet kankaan pikseleinä (manifest.json).</summary>
        sealed class CodexVariantti
        {
            public string Nimi;
            public Vector2 Kangas, VirtaKeski;
            public float VirtaSade;
            public Rect Teksti, Asteikko, Neula;
            public Texture2D Radio, NeulaKuva;
        }

        static Rect Alue(float x0, float y0, float x1, float y1) => Rect.MinMaxRect(x0, y0, x1, y1);

        static CodexVariantti ipad, iphone;
        static bool codexHaettu;

        static CodexVariantti Lataa(CodexVariantti v)
        {
            v.Radio = Resources.Load<Texture2D>($"RadioUusi/{v.Nimi}/radio");
            v.NeulaKuva = Resources.Load<Texture2D>($"RadioUusi/{v.Nimi}/vu-neula");
            return v.Radio != null && v.NeulaKuva != null ? v : null;
        }

        static void HaeCodex()
        {
            if (codexHaettu) return;
            codexHaettu = true;
            ipad = Lataa(new CodexVariantti
            {
                Nimi = "ipad", Kangas = new Vector2(1400, 520), Neula = Alue(328, 216, 488, 376),
                Teksti = Alue(599, 163, 1108, 275), Asteikko = Alue(335, 340, 1119, 391), VirtaKeski = new Vector2(1203, 212), VirtaSade = 21,
            });
            iphone = Lataa(new CodexVariantti
            {
                Nimi = "iphone", Kangas = new Vector2(1100, 600), Neula = Alue(310, 237, 470, 397),
                Teksti = Alue(558, 185, 837, 300), Asteikko = Alue(315, 386, 836, 447), VirtaKeski = new Vector2(914, 232), VirtaSade = 20,
            });
        }

        /// <summary>Codexin radio käytössä (kuvat mukana käännöksessä; A/B: ui linssi radio kuori vanha|uusi).</summary>
        public static bool CodexSallittu = true;
        static bool CodexSaatavilla { get { HaeCodex(); return ipad != null && iphone != null; } }

        /// <summary>Neulan lepokulma kuvassa (pystystä, astetta) ja asteikon puolikulma.</summary>
        const float NeulaKuvassa = -45f, NeulanPuolikulma = 62f;
        /// <summary>Radio enintään tämän osuuden näkymän pinta-alasta (Codexin README).</summary>
        const float PintaAlaKatto = 0.22f;

        VisualElement codex, cNeula, cTeksti, cAsteikko, cVirta;
        CodexVariantti cVar;
        VisualElement vanhaNayttoIsa, vanhaAsteikkoIsa, vanhaLamppuIsa, vanhaLinkkiIsa;
        float cNeulaPiirretty = float.NaN;

        /// <summary>Rakentaa Codexin kuoren (piilossa, kunnes Mitoita valitsee variantin).</summary>
        void RakennaCodex()
        {
            if (!CodexSaatavilla) return;
            codex = Rakenne.El("mk-radio__codex", juuri, PickingMode.Ignore);
            codex.style.display = DisplayStyle.None;
        }

        static Length Pros(float osa, float koko) => Length.Percent(osa / koko * 100f);

        void Sijoita(VisualElement e, Rect r, Vector2 kangas)
        {
            e.style.position = Position.Absolute;
            e.style.left = Pros(r.xMin, kangas.x); e.style.top = Pros(r.yMin, kangas.y);
            e.style.width = Pros(r.width, kangas.x); e.style.height = Pros(r.height, kangas.y);
        }

        /// <summary>Kuva ja neula variantille (iPad tai iPhone); toiminnalliset osat siirretään kuvan päälle.</summary>
        void KaytaVarianttia(CodexVariantti v)
        {
            if (cVar == v) return;
            cVar = v;
            codex.Clear();
            var k = v.Kangas;
            var radio = Rakenne.El("mk-radio__kerros", codex, PickingMode.Ignore);
            radio.style.backgroundImage = new StyleBackground(v.Radio);
            cTeksti = Rakenne.El("mk-radio__codex-teksti", codex, PickingMode.Ignore); Sijoita(cTeksti, v.Teksti, k);
            cAsteikko = Rakenne.El("mk-radio__codex-asteikko", codex, PickingMode.Ignore); Sijoita(cAsteikko, v.Asteikko, k);
            // Neula kääntyy rajauksen keskipisteen (vu_neula_pivot_local 80,80) eli VU-akselin ympäri.
            cNeula = Rakenne.El("mk-radio__codex-neula", codex, PickingMode.Ignore); Sijoita(cNeula, v.Neula, k);
            cNeula.style.backgroundImage = new StyleBackground(v.NeulaKuva);
            cNeula.usageHints = UsageHints.DynamicTransform;
            cNeula.style.transformOrigin = new TransformOrigin(Length.Percent(50), Length.Percent(50));
            // Virtakytkin: osuma-ala vähintään 44 pt (koko asetetaan Mitoitessa).
            cVirta = Rakenne.El("mk-radio__codex-virta", codex);
            cNeulaPiirretty = float.NaN;

            // Siirrot (kerran): näyttö, asteikko (nimet + veto), lamppu (virtakytkin) ja linkkirivi.
            vanhaNayttoIsa ??= naytto.parent; vanhaAsteikkoIsa ??= asteikko.parent; vanhaLamppuIsa ??= lamppu.parent; vanhaLinkkiIsa ??= linkkiRivi.parent;
            cTeksti.Add(naytto);
            naytto.Sammuneet = false;   // kuvan pistepohja näyttää sammuneet pisteet
            cAsteikko.Add(asteikko);
            asteikko.AddToClassList("mk-radio__asteikko--codex");
            asteikko.style.backgroundImage = StyleKeyword.None;
            asteikko.style.backgroundColor = new Color(0, 0, 0, 0);
            if (asteikko is Asteikkoviivat av) av.Nakymaton = true;
            viisari.style.display = DisplayStyle.None;
            cVirta.Add(lamppu);
            lamppu.Nakymaton = true;
            codex.Add(linkkiRivi);
            linkkiRivi.AddToClassList("mk-radio__linkki--codex");
        }

        /// <summary>Codexin kuoren koko ruudun mukaan: variantti (iPad &gt; 700 pt), leveys enintään 22 % pinta-alasta.</summary>
        void MitoitaCodex()
        {
            if (codex == null) return;
            var puu = juuri.panel?.visualTree.layout ?? Rect.zero;
            bool kaytossa = CodexSallittu && puu.width > 0;
            codex.style.display = kaytossa ? DisplayStyle.Flex : DisplayStyle.None;
            kotelo.style.display = kaytossa ? DisplayStyle.None : DisplayStyle.Flex;
            if (!kaytossa) { PalautaVanha(); return; }
            var v = puu.width > 700 ? ipad : iphone;
            KaytaVarianttia(v);
            float suhde = v.Kangas.x / v.Kangas.y;
            float w = Mathf.Min(puu.width - 16f, Mathf.Sqrt(PintaAlaKatto * puu.width * puu.height * suhde));
            float h = w / suhde;
            codex.style.width = w; codex.style.height = h;
            codex.style.marginBottom = kerros.Reunat(LinssiUi.Kerros).w + 4f;
            float m = w / v.Kangas.x, osuma = Mathf.Max(44f, v.VirtaSade * 2f * m);
            cVirta.style.left = v.VirtaKeski.x * m - osuma / 2f; cVirta.style.top = v.VirtaKeski.y * m - osuma / 2f;
            cVirta.style.width = osuma; cVirta.style.height = osuma;
        }

        void PalautaVanha()
        {
            if (cVar == null) return;
            cVar = null;
            vanhaNayttoIsa?.Add(naytto); naytto.Sammuneet = true;
            vanhaAsteikkoIsa?.Insert(0, asteikko);
            asteikko.RemoveFromClassList("mk-radio__asteikko--codex");
            if (asteikko is Asteikkoviivat av) av.Nakymaton = false;
            if (!RadioPinnat.Paperi(asteikko)) Rakenne.Tausta(asteikko, Paperi);
            viisari.style.display = StyleKeyword.Null;
            vanhaLamppuIsa?.Add(lamppu); lamppu.Nakymaton = false;
            vanhaLinkkiIsa?.Add(linkkiRivi); linkkiRivi.RemoveFromClassList("mk-radio__linkki--codex");
            codex.Clear();
        }

        /// <summary>Kehys: neula VU:n mukaan (muu radio on valmis kuva; aina päällä).</summary>
        void PaivitaCodex()
        {
            if (cVar == null || codex.resolvedStyle.display == DisplayStyle.None) return;
            var mittari = linssi?.Mittari;
            double osuus = mittari != null ? mittari.Osuus : VuMittari.Lepo;
            float neula = (float)((2 * osuus - 1) * NeulanPuolikulma) - NeulaKuvassa;
            if (float.IsNaN(cNeulaPiirretty) || Mathf.Abs(neula - cNeulaPiirretty) > 0.05f)
            {
                cNeulaPiirretty = neula;
                cNeula.style.rotate = new Rotate(new Angle(neula, AngleUnit.Degree));
            }
        }
    }
}
