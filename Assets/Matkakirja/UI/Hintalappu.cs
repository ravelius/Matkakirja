// HINTALAPPU (Natiivi-UI; omistaja 11.10.2026 Päätoimittajan kautta, juna 182): maksullisen karttakohteen hinta sen kyljessä 3 s:n
// ajan, kun pelaaja ei ole kohteen paikassa (kuumailmapallo muusta maasta "KUUMAILMAPALLO £200", raketti muualta kuin Tromssasta
// "ISS £500"). Napautus ei silloin avaa eikä veloita. Pohja: päivälaskurin lasipilleri ja kellorivi (mk-pelikello +
// mk-pelikello__kello, kuten aarrelaskuri; kapiteelirivin harvennus levitti tekstin ruudun yli, simuajo d868ab8d). Yksi lappu kerrallaan; seuraa kohde-elementtiä (worldBound) ruutu ruudulta ja häviää, kun kohde
// piiloutuu. Kutsu: Hintalappu.Nayta(kohdeElementti, teksti[, vasemmalle]).
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Hintalappu
    {
        public const float KestoS = 3f;

        static VisualElement juuri, lappu;
        static Label rivi;
        static VisualElement kohde;
        static bool vasen;
        static float loppuu;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaTila() { juuri = lappu = kohde = null; rivi = null; }

        /// <summary>Lappu kohteen kylkeen (oletus oikealle; vasemmalle = kohteen vasemmalle puolelle) KestoS sekunniksi.</summary>
        public static void Nayta(VisualElement kohdeElementti, string teksti, bool vasemmalle = false)
        {
            if (kohdeElementti == null) return;
            if (juuri == null)
            {
                var k = UiKerros.Hae();
                juuri = Rakenne.El("mk-erikoisnostot", k.Juuri(UiKerros.Nostot), PickingMode.Ignore);
                juuri.name = "hintalappu";
                lappu = Rakenne.El("mk-pelikello", juuri, PickingMode.Ignore);
                rivi = Rakenne.Teksti("", "mk-pelikello__kello", lappu);
                Kirjasimet.Aseta(rivi, Kirjasin.KoneBold);
                lappu.style.display = DisplayStyle.None;
                k.JokaRuutu += Ruutu;
            }
            juuri.BringToFront();
            rivi.text = teksti ?? "";
            kohde = kohdeElementti;
            vasen = vasemmalle;
            loppuu = Time.unscaledTime + KestoS;
            lappu.style.display = DisplayStyle.None;   // paikka seuraavassa ruudussa
            Debug.Log("MATKAKIRJA hintalappu: " + rivi.text);
        }

        /// <summary>Testikomennoille: näkyvä teksti tai null.</summary>
        public static string Teksti => lappu != null && lappu.style.display == DisplayStyle.Flex ? rivi.text : null;

        static void Ruutu()
        {
            if (lappu == null) return;
            var k = kohde;
            bool nayta = k != null && k.panel != null && Time.unscaledTime < loppuu && k.resolvedStyle.display != DisplayStyle.None
                         && k.resolvedStyle.visibility != Visibility.Hidden && k.resolvedStyle.opacity > 0.01f;
            if (!nayta) { if (lappu.style.display != DisplayStyle.None) lappu.style.display = DisplayStyle.None; kohde = null; return; }
            var r = k.worldBound;
            Vector2 a = juuri.WorldToLocal(new Vector2(r.xMin, r.yMin)), b = juuri.WorldToLocal(new Vector2(r.xMax, r.yMax));
            float lw = lappu.resolvedStyle.width, W = juuri.layout.width;
            if (float.IsNaN(lw)) lw = 0f;
            float x = vasen ? a.x + (b.x - a.x) * 0.15f - lw : a.x + (b.x - a.x) * 0.85f;
            if (!float.IsNaN(W) && W > 0) x = Mathf.Clamp(x, 4f, Mathf.Max(4f, W - lw - 4f));
            lappu.style.left = x;
            lappu.style.top = a.y + (b.y - a.y) * 0.3f;
            lappu.style.display = DisplayStyle.Flex;
        }
    }
}
