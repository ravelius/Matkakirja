// AVAUS JA SULKU ANIMOIDEN (omistaja 29.9.2026: "Voiko lapun aukeamisen ja sulkeutumisen animoida? Ja jatkossa myös
// kaikki vastaavat", Raamattu PR #3602). Yhteinen apuri kaikille lapuille, korteille, paneeleille ja pop-upeille, joiden
// näkyvyys vaihtui hypyllä (inventaario docs/raportit/natiivi-ui-hyppyavaukset-20260929.md Natiivi-UI:n haarassa).
//
// WEBIN ARVOT (Siirtoseppä, mitattu WebKitissä; webin yhteinen apuri): paikka pysyy, vain mittakaava 0,92 ↔ 1 ja
// läpinäkyvyys liikkuvat; origo avaajan suunnasta. Auki: mittakaava 220 ms cubic-bezier(0.22, 0.9, 0.24, 1),
// läpinäkyvyys 180 ms cubic-bezier(0, 0, 0.2, 1). Kiinni: molemmat 200 ms cubic-bezier(0.4, 0, 1, 1), poisto 40 ms
// myöhemmin. Pieni liike (LinssiUi.VahennettyLiike): heti, ei animaatiota.
//
// KOODILLA EIKÄ USS-SIIRTYMÄLLÄ: UI Toolkitin transition-timing-function ei tue omaa cubic-bezieriä, ja USS-siirtymä
// alkaa vasta seuraavan tyylikierroksen jälkeen. Tässä alkutila asetetaan samassa kutsussa (avaus alkaa samalla
// ruudunpäivityksellä kuin napautus, löydös 134 säilyy) ja kaari lasketaan tarkasti. Kesken oleva liike jatkuu
// nykyisestä arvosta (avaus kesken sulun ei hyppää).
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Ponnahdus
    {
        public const float AukiS = 0.22f, AukiLapinakyvyysS = 0.18f, KiinniS = 0.2f, PoistoViiveS = 0.04f, Mittakaava = 0.92f;

        static readonly Dictionary<VisualElement, IVisualElementScheduledItem> ajot = new Dictionary<VisualElement, IVisualElementScheduledItem>();
        static readonly Dictionary<VisualElement, (float Lapinakyvyys, float Mittakaava)> nyt = new Dictionary<VisualElement, (float, float)>();

        /// <summary>Kesken olevien liikkeiden määrä (testit).</summary>
        public static int Kesken => ajot.Count;

        // AVAUSKOHTA ILMAN NAPPIA (web js/avausanimaatio.js): viimeisin napautus alle 1,5 s sitten, muuten keskusta.
        // UiKerros kirjaa jokaisen painalluksen kaikista kerroksista (paneelin koordinaatit, kerrokset samassa mittakaavassa).
        const float NapautusTuoreS = 1.5f;
        static Vector2 napautus;
        static Rect napautusKohde;
        static float napautusAika = -10f;

        /// <summary>Painallus paneelin koordinaateissa ja painettu elementti (UiKerros, TrickleDown).</summary>
        public static void Napautettu(Vector2 paneelissa, VisualElement kohde)
        {
            napautus = paneelissa;
            napautusKohde = kohde != null ? kohde.worldBound : default;
            napautusAika = Time.unscaledTime;
        }

        /// <summary>Viimeisin napautus, jos alle 1,5 s sitten.</summary>
        public static Vector2? TuoreNapautus => Time.unscaledTime - napautusAika < NapautusTuoreS ? napautus : (Vector2?)null;

        /// <summary>Viimeksi painetun elementin laatikko (esim. pikkukuva, josta suurennos lentää), jos alle 1,5 s sitten.</summary>
        public static Rect? TuoreKohde => Time.unscaledTime - napautusAika < NapautusTuoreS && napautusKohde.width > 0f ? napautusKohde : (Rect?)null;

        /// <summary>
        /// Avaa elementin: näkyviin (display flex) ja kasvu 0,92 → 1 häivyttäen; lopuksi läpinäkyvyys ja mittakaava USS:lle. origoPaneelissa = avaajan kohta paneelin
        /// koordinaateissa (napautus, nappi); ilman sitä origo-parametri (esim. oikea yläkulma), tuore napautus (alle 1,5 s,
        /// kuten web) tai keskusta.
        /// </summary>
        public static void Avaa(VisualElement e, Vector2? origoPaneelissa = null, TransformOrigin? origo = null)
        {
            if (e == null) return;
            Lopeta(e);
            e.style.display = DisplayStyle.Flex;
            if (LinssiUi.VahennettyLiike()) { Vapauta(e); return; }
            e.style.transitionDuration = Nolla; // USS-siirtymä ei saa pehmentää ruuduittaisia arvoja
            // Levossa ruudunpäivitys on 30 fps: liikkeen ajaksi täysi taajuus (Linssisepän huomio 29.9.).
            Ruudunpaivitys.Herata(AukiS + 0.1f);
            AsetaOrigo(e, origoPaneelissa ?? (origo == null ? TuoreNapautus : null), origo);
            var (a0, s0) = nyt.TryGetValue(e, out var n) ? n : (0f, Mittakaava);
            Aseta(e, a0, s0);
            var kello = new Kello();
            ajot[e] = e.schedule.Execute(() =>
            {
                float t = kello.Askel();
                float a = Mathf.Lerp(a0, 1f, Kaari(0f, 0f, 0.2f, 1f, t / AukiLapinakyvyysS));
                float s = Mathf.Lerp(s0, 1f, Kaari(0.22f, 0.9f, 0.24f, 1f, t / AukiS));
                Aseta(e, a, s);
                if (t < AukiS) return;
                Lopeta(e);
                Vapauta(e);
            }).Every(0);
        }

        /// <summary>Sulkee elementin samaa reittiä (origo pysyy) ja kutsuu valmis-toiminnon; oletuksena display none.</summary>
        public static void Sulje(VisualElement e, Action valmis = null)
        {
            if (e == null) return;
            Lopeta(e);
            valmis ??= () => e.style.display = DisplayStyle.None;
            void Loppu() { Vapauta(e); valmis(); }
            if (LinssiUi.VahennettyLiike() || e.panel == null || e.resolvedStyle.display == DisplayStyle.None) { Loppu(); return; }
            var (a0, s0) = nyt.TryGetValue(e, out var n) ? n : (1f, 1f);
            e.style.transitionDuration = Nolla;
            Ruudunpaivitys.Herata(KiinniS + PoistoViiveS + 0.1f);
            var kello = new Kello();
            ajot[e] = e.schedule.Execute(() =>
            {
                float t = kello.Askel();
                float k = Kaari(0.4f, 0f, 1f, 1f, t / KiinniS);
                Aseta(e, Mathf.Lerp(a0, 0f, k), Mathf.Lerp(s0, Mittakaava, k));
                if (t < KiinniS + PoistoViiveS) return;
                Lopeta(e);
                Loppu();
            }).Every(0);
        }

        // KUVAN SUURENNOS (Raamattu: poikkeus omilla arvoillaan 320 ms; web js/fokusvirta.js SUURENNOS_MS ja
        // js/fokuskohteet.js KOHDE_ZOOM_MS): kehys asettuu heti lopulliseen kokoonsa ja lentää pikkukuvan laatikosta
        // paikalleen (translate + scale, origo vasen yläkulma), sulku samaa reittiä takaisin; kaari
        // cubic-bezier(0.22, 0.9, 0.24, 1) molempiin suuntiin.
        public const float SuurennosS = 0.32f;
        static readonly Dictionary<VisualElement, float> lennot = new Dictionary<VisualElement, float>();

        /// <summary>
        /// Lento pikkukuvan laatikosta (paneelin koordinaatit) lopulliseen paikkaan (auki) tai takaisin (kiinni). Lopullinen
        /// laatikko luetaan asettelusta joka ruudulla, joten kuvan latautuminen kesken lennon ei hyppää. Kesken oleva lento
        /// kääntyy nykyisestä kohdasta.
        /// </summary>
        public static void Lenna(VisualElement e, Rect lahto, bool auki, Action valmis = null)
        {
            if (e == null) return;
            Lopeta(e);
            if (LinssiUi.VahennettyLiike() || lahto.width < 1f || lahto.height < 1f) { VapautaLento(e); valmis?.Invoke(); return; }
            float p0 = lennot.TryGetValue(e, out var p) ? p : (auki ? 0f : 1f);
            e.style.transitionDuration = Nolla;
            e.style.transformOrigin = new TransformOrigin(0f, 0f, 0f);
            Ruudunpaivitys.Herata(SuurennosS + 0.1f);
            AsetaLento(e, lahto, p0);
            var kello = new Kello();
            ajot[e] = e.schedule.Execute(() =>
            {
                float t = kello.Askel();
                float k = Kaari(0.22f, 0.9f, 0.24f, 1f, t / SuurennosS);
                AsetaLento(e, lahto, Mathf.Lerp(p0, auki ? 1f : 0f, k));
                if (t < SuurennosS) return;
                Lopeta(e);
                VapautaLento(e);
                valmis?.Invoke();
            }).Every(0);
        }

        static void AsetaLento(VisualElement e, Rect lahto, float p)
        {
            lennot[e] = p;
            // Skaalaamaton laatikko kuten AsetaOrigo; ennen ensimmäistä asettelua kehys odottaa näkymättömänä.
            var koko = e.layout.size;
            if (float.IsNaN(koko.x) || koko.x < 1f || koko.y < 1f) { e.style.opacity = 0f; return; }
            e.style.opacity = StyleKeyword.Null;
            var paikka = e.parent != null ? e.parent.worldBound.position + e.layout.position : e.layout.position;
            var siirto = (lahto.position - paikka) * (1f - p);
            var mittakaava = Vector2.Lerp(new Vector2(lahto.width / koko.x, lahto.height / koko.y), Vector2.one, p);
            e.style.translate = new Translate(siirto.x, siirto.y);
            e.style.scale = new Scale(mittakaava);
        }

        static void VapautaLento(VisualElement e)
        {
            lennot.Remove(e);
            e.style.opacity = StyleKeyword.Null;
            e.style.translate = StyleKeyword.Null;
            e.style.scale = StyleKeyword.Null;
            e.style.transformOrigin = StyleKeyword.Null;
            e.style.transitionDuration = StyleKeyword.Null;
        }

        /// <summary>Kesken oleva liike seis nykyiseen arvoon.</summary>
        public static void Lopeta(VisualElement e)
        {
            if (e != null && ajot.TryGetValue(e, out var ajo)) { ajo.Pause(); ajot.Remove(e); }
        }

        /// <summary>Liikkeen jälkeen arvot takaisin USS:lle (luokkien läpinäkyvyys, esim. väistyvä pilleri, toimii taas).</summary>
        static void Vapauta(VisualElement e)
        {
            nyt.Remove(e);
            e.style.opacity = StyleKeyword.Null;
            e.style.scale = StyleKeyword.Null;
            e.style.transitionDuration = StyleKeyword.Null;
        }

        /// <summary>
        /// Liikkeen kello: kulkee ruuduittain ja yksi askel on enintään 50 ms. Raskas ruutu (linssin lataus, saapuminen)
        /// hidastaa liikettä eikä hyppää sen yli (laite cl1 29.9.: 0,5 s:n jumin jälkeen valikko oli jo valmis).
        /// </summary>
        sealed class Kello
        {
            float edellinen = -1f, kulunut;
            public float Askel()
            {
                float nyt = Time.unscaledTime;
                if (edellinen >= 0f) kulunut += Mathf.Min(nyt - edellinen, 0.05f);
                edellinen = nyt;
                return kulunut;
            }
        }

        static readonly StyleList<TimeValue> Nolla = new StyleList<TimeValue>(new List<TimeValue> { new TimeValue(0f) });

        static void Aseta(VisualElement e, float lapinakyvyys, float mittakaava)
        {
            nyt[e] = (lapinakyvyys, mittakaava);
            e.style.opacity = lapinakyvyys;
            e.style.scale = new Scale(new Vector2(mittakaava, mittakaava));
        }

        static void AsetaOrigo(VisualElement e, Vector2? piste, TransformOrigin? origo)
        {
            if (piste == null) { e.style.transformOrigin = origo ?? new TransformOrigin(Length.Percent(50), Length.Percent(50)); return; }
            void Laske()
            {
                // Skaalaamaton laatikko: layout + vanhemman paikka (worldBound sisältäisi kesken olevan mittakaavan).
                var p = e.parent != null ? e.parent.worldBound.position + e.layout.position : e.layout.position;
                var r = new Rect(p, e.layout.size);
                e.style.transformOrigin = new TransformOrigin(Mathf.Clamp(piste.Value.x - r.x, 0f, r.width), Mathf.Clamp(piste.Value.y - r.y, 0f, r.height), 0f);
            }
            if (e.layout.width > 0 && !float.IsNaN(e.layout.width)) { Laske(); return; }
            // Ei vielä asettelua (display none → flex): origo ensimmäisestä asettelusta, siihen asti keskeltä.
            e.style.transformOrigin = new TransformOrigin(Length.Percent(50), Length.Percent(50));
            EventCallback<GeometryChangedEvent> kerran = null;
            kerran = _ => { e.UnregisterCallback(kerran); if (e.layout.width > 0) Laske(); };
            e.RegisterCallback(kerran);
        }

        /// <summary>CSS:n cubic-bezier(x1, y1, x2, y2) ajan osuudella x (0–1): y, kun käyrän x = aika (Newton + puolitus).</summary>
        public static float Kaari(float x1, float y1, float x2, float y2, float x)
        {
            x = Mathf.Clamp01(x);
            if (x <= 0f || x >= 1f) return x;
            float B(float a, float b, float u) => 3f * a * u * (1 - u) * (1 - u) + 3f * b * u * u * (1 - u) + u * u * u;
            float dB(float a, float b, float u) => 3f * a * (1 - u) * (1 - u) + 6f * (b - a) * u * (1 - u) + 3f * (1 - b) * u * u;
            float s = x;
            for (int i = 0; i < 8; i++)
            {
                float d = dB(x1, x2, s);
                if (Mathf.Abs(d) < 1e-5f) break;
                float v = B(x1, x2, s) - x;
                if (Mathf.Abs(v) < 1e-5f) return B(y1, y2, s);
                s = Mathf.Clamp01(s - v / d);
            }
            float lo = 0f, hi = 1f;
            for (int i = 0; i < 20 && Mathf.Abs(B(x1, x2, s) - x) > 1e-5f; i++)
            {
                if (B(x1, x2, s) < x) lo = s; else hi = s;
                s = (lo + hi) * 0.5f;
            }
            return B(y1, y2, s);
        }
    }
}
