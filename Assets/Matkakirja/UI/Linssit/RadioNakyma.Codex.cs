// CODEXIN UUSI RADIO (radiolinssin uudistus, omistaja 28.9.2026 Päätoimittajan kautta; Codexin toimitus 29.9.
// ~/Documents/Codex/2026-09-29/radio-uusi, manifest.json): pyöristetty puurunko kerroksina, iPad 1400 × 520 ja iPhone
// 1100 × 600, kaikki kerrokset koko kankaan kokoisia ja kohdistettuja. Järjestys (manifest layer_order_on):
//   cabinet · vu-backlight · vu-face · vu-needle · vu-glass · vu-reflection · display-backlight · display-window ·
//   tuning-backlight · tuning-window · tuning-pointer · power-on|power-off · tuning-knob
// Neula kääntyy vu_needle_pivotin ympäri (kuvassa lepoasennossa −45°, asteikko noin ±62°), nuppi tuning_knob_pivotin
// ympäri taajuuden mukaan (±135°). Pelin omat osat kerrosten päällä: pistenäyttö display_text_safe_boundsiin (kuvan
// pistepohja korvaa sammuneet pisteet), asteikon nimet ja veto tuning_scale_boundsiin (kuvan viivat ja osoitin korvaavat
// piirretyt), virtakytkin power_hit-kohtaan (vähintään 44 pt). Radio vie enintään 22 % näkymän pinta-alasta.
// Ilman kuvia (vanha käännös) vanha kotelo jää käyttöön.
using System.Collections.Generic;
using Matkakirja.Linssit.Radio;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed partial class RadioNakyma
    {
        /// <summary>Codexin radion variantti: kangas, akselit ja alueet kankaan pikseleinä (manifest.json).</summary>
        sealed class CodexVariantti
        {
            public string Nimi;
            public Vector2 Kangas, NeulanAkseli, NupinAkseli, VirtaKeski;
            public float VirtaSade;
            public Rect Teksti, Asteikko;
            public readonly Dictionary<string, Texture2D> Kuvat = new Dictionary<string, Texture2D>();
        }

        static readonly string[] CodexKerrokset =
        {
            "cabinet", "vu-backlight", "vu-face", "vu-needle", "vu-glass", "vu-reflection", "display-backlight", "display-window",
            "tuning-backlight", "tuning-window", "tuning-pointer", "power", "tuning-knob",
        };

        static Rect Alue(float x0, float y0, float x1, float y1) => Rect.MinMaxRect(x0, y0, x1, y1);

        static CodexVariantti ipad, iphone;
        static bool codexHaettu;

        static CodexVariantti Lataa(CodexVariantti v)
        {
            foreach (var k in CodexKerrokset)
                foreach (var nimi in k == "power" ? new[] { "power-on", "power-off" } : new[] { k })
                {
                    var t = Resources.Load<Texture2D>($"RadioUusi/{v.Nimi}/{nimi}");
                    if (t == null) return null;
                    v.Kuvat[nimi] = t;
                }
            return v;
        }

        static void HaeCodex()
        {
            if (codexHaettu) return;
            codexHaettu = true;
            ipad = Lataa(new CodexVariantti
            {
                Nimi = "ipad", Kangas = new Vector2(1400, 520), NeulanAkseli = new Vector2(408, 296), NupinAkseli = new Vector2(1203, 315),
                Teksti = Alue(599, 163, 1108, 275), Asteikko = Alue(335, 340, 1119, 391), VirtaKeski = new Vector2(1203, 212), VirtaSade = 21,
            });
            iphone = Lataa(new CodexVariantti
            {
                Nimi = "iphone", Kangas = new Vector2(1100, 600), NeulanAkseli = new Vector2(390, 317), NupinAkseli = new Vector2(921, 333),
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

        VisualElement codex, cNeula, cNuppi, cPaalla, cPois, cTeksti, cAsteikko, cVirta;
        VisualElement[] cValot;
        CodexVariantti cVar;
        VisualElement vanhaNayttoIsa, vanhaAsteikkoIsa, vanhaLamppuIsa, vanhaLinkkiIsa;
        float cNeulaPiirretty = float.NaN, cNuppiPiirretty = float.NaN;

        /// <summary>Rakentaa Codexin kuoren (piilossa, kunnes Mitoita valitsee variantin).</summary>
        void RakennaCodex()
        {
            if (!CodexSaatavilla) return;
            codex = Rakenne.El("mk-radio__codex", juuri, PickingMode.Ignore);
            codex.style.display = DisplayStyle.None;
        }

        VisualElement Kerros(Texture2D t, string luokka = "mk-radio__kerros")
        {
            var e = Rakenne.El(luokka, codex, PickingMode.Ignore);
            e.style.backgroundImage = new StyleBackground(t);
            return e;
        }

        static Length Pros(float osa, float koko) => Length.Percent(osa / koko * 100f);

        void Sijoita(VisualElement e, Rect r, Vector2 kangas)
        {
            e.style.position = Position.Absolute;
            e.style.left = Pros(r.xMin, kangas.x); e.style.top = Pros(r.yMin, kangas.y);
            e.style.width = Pros(r.width, kangas.x); e.style.height = Pros(r.height, kangas.y);
        }

        /// <summary>Kerrokset variantille (iPad tai iPhone); toiminnalliset osat siirretään kerrosten päälle.</summary>
        void KaytaVarianttia(CodexVariantti v)
        {
            if (cVar == v) return;
            cVar = v;
            codex.Clear();
            var k = v.Kangas;
            var valot = new List<VisualElement>();
            foreach (var nimi in CodexKerrokset)
            {
                if (nimi == "power")
                {
                    cPaalla = Kerros(v.Kuvat["power-on"]);
                    cPois = Kerros(v.Kuvat["power-off"]);
                    continue;
                }
                var e = Kerros(v.Kuvat[nimi]);
                if (nimi.EndsWith("backlight")) valot.Add(e);
                if (nimi == "vu-needle") { cNeula = e; e.usageHints = UsageHints.DynamicTransform; e.style.transformOrigin = new TransformOrigin(Pros(v.NeulanAkseli.x, k.x), Pros(v.NeulanAkseli.y, k.y)); }
                if (nimi == "tuning-knob") { cNuppi = e; e.usageHints = UsageHints.DynamicTransform; e.style.transformOrigin = new TransformOrigin(Pros(v.NupinAkseli.x, k.x), Pros(v.NupinAkseli.y, k.y)); }
                // Pelin osat oikeaan väliin: näyttö ikkunan päälle, nimet asteikkoikkunan päälle ennen osoitinta.
                if (nimi == "display-window") { cTeksti = Rakenne.El("mk-radio__codex-teksti", codex, PickingMode.Ignore); Sijoita(cTeksti, v.Teksti, k); }
                if (nimi == "tuning-window") { cAsteikko = Rakenne.El("mk-radio__codex-asteikko", codex, PickingMode.Ignore); Sijoita(cAsteikko, v.Asteikko, k); }
            }
            cValot = valot.ToArray();
            // Virtakytkin: osuma-ala vähintään 44 pt (koko asetetaan Mitoitessa).
            cVirta = Rakenne.El("mk-radio__codex-virta", codex);
            cNeulaPiirretty = cNuppiPiirretty = float.NaN;

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

        /// <summary>Kehys: neula VU:n mukaan, nuppi taajuuden mukaan, virta ja taustavalot tilan mukaan.</summary>
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
            float nuppi = (float)(((linssi?.Tila?.Taajuus ?? 0.5) - 0.5) * 270.0);
            if (float.IsNaN(cNuppiPiirretty) || Mathf.Abs(nuppi - cNuppiPiirretty) > 0.1f)
            {
                cNuppiPiirretty = nuppi;
                cNuppi.style.rotate = new Rotate(new Angle(nuppi, AngleUnit.Degree));
            }
            bool paalla = nakyvissa;
            cPaalla.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
            cPois.style.display = paalla ? DisplayStyle.None : DisplayStyle.Flex;
            float valo = vaihe == RadioVaihe.Soi || vaihe == RadioVaihe.Viritys ? 1f : 0.55f;
            foreach (var e in cValot) if (!Mathf.Approximately(e.resolvedStyle.opacity, valo)) e.style.opacity = valo;
        }
    }
}
