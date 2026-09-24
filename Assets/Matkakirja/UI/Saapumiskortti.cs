// SAAPUMISEN VÄLIKORTTI (Pelikoodari, löydös 52): webin js/ui.js naytaSaapumiskortti ja piilotaAloitusverho
// (css .aloitusverho, .saapumiskortti, .saapumiskortti-teksti; omistajan tilaus 26.8.2026).
//
// Aloituslennon päätyttyä tyhjä pergamenttiarkki nousee koko näkymän päälle (420 ms, ALOITUSVERHO_SISAAN_MS),
// ja 280 ms tauon (SAAPUMISKORTTI_TAUKO_MS) jälkeen sen keskelle kirjoittuu konekirjoituksella
// "<KAUPUNKI> · PÄIVÄ <n>/80" (typeText 'saapuminen': 190 ms/sana huojuen, kynän naputus sanoittain). Valmis rivi
// jää 1000 ms:ksi, häipyy 320 ms, ja paperi jää hetkeksi tyhjäksi. Sen jälkeen peli jatkaa saapumista, ja arkki
// häipyy 700 ms:ssä (ALOITUSVERHO_ULOS_MS) valmiin kartan päältä. Kartan kamera siirtyy arkin alla (arkki täynnä),
// joten kartta paljastuu suoraan oikeassa näkymässä ilman zoomausanimaatiota.
//
// Mitat (web): fonttikoko clamp(1.05rem, 4.4vw, 1.6rem) = 16,8–25,6 pt, harvennus 0,13em, väri --map-ink
// #46331f, kirjasin --font-type (American Typewriter), palsta min(30rem, 100 % − 2rem), arkin sisennys 1,5rem.
// Arkki: --paper #efdcb4 ja --paper-noise (140 × 140, tavallinen sekoitus). Arkki nielee napautukset.
// Webissä arkki peittää vain karttaruudun (mapPane), ei yläpalkkia (mitattu 393 × 852: MATKAKIRJA-palkki ja
// napit näkyvät arkin yllä), joten natiivissa arkki alkaa yläpalkin alareunasta. Yläpalkki palaa lennon
// piilosta, kun lento päättyy (UiNakymat.LentoPiilo, LennonVaihe.Perilla).
using System;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Saapumiskortti
    {
        public const int SisaanMs = 420, TaukoMs = 280, SanaMs = 190, LukuaikaMs = 1000, TekstiUlosMs = 320, UlosMs = 700;
        const float FonttiMin = 16.8f, FonttiMax = 25.6f, FonttiVw = 0.044f, Harvennus = 0.13f;

        /// <summary>Web KIRJOITUSTAUOT ja KIRJOITUS_MIETE (sama rytmi kuin avaustekstissä, Aloitusnakyma).</summary>
        static readonly (Regex Osuu, int Tauko, int Huojunta)[] Tauot =
        {
            (new Regex("…\"?$"), 1200, 500),
            (new Regex("[.!?]$"), 620, 320),
            (new Regex("[,;:—–]$"), 300, 160),
        };

        readonly VisualElement arkki;
        readonly Func<float> ylapalkinAlareuna;
        readonly Label teksti;
        readonly System.Random arpa = new System.Random();
        IVisualElementScheduledItem ajo;
        int kierros;

        /// <summary>Onko kortti ruudulla (sisääntulosta arkin häipymisen loppuun).</summary>
        public bool Auki { get; private set; }
        /// <summary>Viimeksi kirjoitettu teksti (testikomento).</summary>
        public string Teksti { get; private set; }

        public Saapumiskortti(UiKerros kerros, Func<float> ylapalkinAlareuna)
        {
            this.ylapalkinAlareuna = ylapalkinAlareuna;
            arkki = Rakenne.El("mk-saapumiskortti", kerros.Juuri(UiKerros.Traileri));
            Kuviot.AsetaVerho(arkki);
            arkki.style.display = DisplayStyle.None;
            arkki.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            teksti = Rakenne.Teksti("", "mk-saapumiskortti__teksti", arkki);
            teksti.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(teksti, Kirjasin.Kone);
            arkki.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
        }

        /// <summary>
        /// Näyttää kortin. arkkiTaynna kutsutaan, kun arkki peittää näkymän (peli purkaa lennon ja siirtää kameran
        /// arkin alla); valmis, kun teksti on häipynyt (peli jatkaa saapumista), minkä jälkeen arkki häipyy itse.
        /// </summary>
        public void Nayta(string rivi, Action arkkiTaynna, Action valmis)
        {
            int oma = ++kierros;
            ajo?.Pause();
            Auki = true;
            Teksti = rivi;
            arkki.BringToFront();
            arkki.style.top = ylapalkinAlareuna?.Invoke() ?? 0f;
            arkki.style.display = DisplayStyle.Flex;
            arkki.style.transitionDuration = new StyleList<TimeValue>(new System.Collections.Generic.List<TimeValue> { new TimeValue(SisaanMs, TimeUnit.Millisecond) });
            arkki.style.opacity = 0f;
            teksti.style.opacity = 1f;
            Kirjoita(rivi, 0);
            Mitoita();
            // Alkuasento omana tilanaan (web getBoundingClientRect ennen verho-nakyy-luokkaa).
            arkki.schedule.Execute(() => { if (oma == kierros) arkki.style.opacity = 1f; });
            arkki.schedule.Execute(() =>
            {
                if (oma != kierros) return;
                Kutsu(arkkiTaynna);
            }).StartingIn(SisaanMs);
            var sanat = rivi.Split(' ');
            int n = 0;
            void Seuraava()
            {
                if (oma != kierros) return;
                n++;
                Kirjoita(rivi, n, sanat);
                Aanet.Tehoste("pen");
                if (n >= sanat.Length)
                {
                    ajo = arkki.schedule.Execute(() =>
                    {
                        if (oma != kierros) return;
                        teksti.style.opacity = 0f;
                        ajo = arkki.schedule.Execute(() =>
                        {
                            if (oma != kierros) return;
                            teksti.text = "";
                            Kutsu(valmis);
                            Piilota(oma);
                        }).StartingIn(TekstiUlosMs);
                    }).StartingIn(LukuaikaMs);
                    return;
                }
                ajo = arkki.schedule.Execute(Seuraava).StartingIn(Viive(sanat[n - 1]));
            }
            ajo = arkki.schedule.Execute(Seuraava).StartingIn(SisaanMs + TaukoMs + SanaMs);
        }

        /// <summary>Web piilotaAloitusverho: arkki häipyy 700 ms:ssä ja poistuu.</summary>
        void Piilota(int oma)
        {
            // Yksi ruutu kartalle ennen häivytystä (web: kaksi rAF:ia), jotta arkin alta ei paljastu tyhjää.
            arkki.schedule.Execute(() =>
            {
                if (oma != kierros) return;
                arkki.style.transitionDuration = new StyleList<TimeValue>(new System.Collections.Generic.List<TimeValue> { new TimeValue(UlosMs, TimeUnit.Millisecond) });
                arkki.style.opacity = 0f;
                arkki.schedule.Execute(() =>
                {
                    if (oma != kierros) return;
                    arkki.style.display = DisplayStyle.None;
                    Auki = false;
                }).StartingIn(UlosMs);
            }).StartingIn(32);
        }

        /// <summary>Kortti pois heti (uusi peli kesken kortin): ajastimet eivät enää kutsu mitään.</summary>
        public void Peru()
        {
            kierros++;
            ajo?.Pause();
            arkki.style.display = DisplayStyle.None;
            arkki.style.opacity = 0f;
            Auki = false;
        }

        /// <summary>Kirjoitettu osa näkyy, loput varaavat paikkansa näkymättöminä (web typed + pending).</summary>
        void Kirjoita(string rivi, int n, string[] sanat = null)
        {
            sanat ??= rivi.Split(' ');
            if (n >= sanat.Length) { teksti.text = "<noparse>" + rivi + "</noparse>"; return; }
            string nakyva = string.Join(" ", sanat, 0, n), loput = (n > 0 ? " " : "") + string.Join(" ", sanat, n, sanat.Length - n);
            teksti.text = "<noparse>" + nakyva + "</noparse><alpha=#00><noparse>" + loput + "</noparse>";
        }

        /// <summary>Web typeText-viive 'saapuminen'-paikalle (KIRJOITUSRYTMI): huojunta, välimerkkitauot, miettiminen.</summary>
        int Viive(string sana)
        {
            int viive = (int)(SanaMs * (0.7 + 0.6 * arpa.NextDouble()));
            foreach (var t in Tauot)
                if (t.Osuu.IsMatch(sana)) return viive + t.Tauko + (int)(t.Huojunta * arpa.NextDouble());
            if (arpa.NextDouble() < 0.15) viive += 280 + (int)(340 * arpa.NextDouble());
            return viive;
        }

        /// <summary>Fonttikoko clamp(1.05rem, 4.4vw, 1.6rem) paneelin leveydestä, harvennus 0,13em.</summary>
        void Mitoita()
        {
            float leveys = arkki.panel?.visualTree?.layout.width ?? 0f;
            if (float.IsNaN(leveys) || leveys <= 0f) return;
            float koko = Mathf.Clamp(leveys * FonttiVw, FonttiMin, FonttiMax);
            teksti.style.fontSize = koko;
            teksti.style.letterSpacing = koko * Harvennus;
        }

        /// <summary>
        /// Kalibrointi (testikomento ui saapumiskortti-mitta): rivin leveys MeasureTextSize-mittauksella harvennuksilla
        /// 0, 1, 2 ja 4 pt nykyisellä fonttikoolla. Kertoo, miten UITK:n letter-spacing kasvattaa leveyttä
        /// (CSS: jokainen merkki + harvennus); web 402 × 874: 17,69 px, harvennus 2,30 px, leveys 228,3 px.
        /// </summary>
        public string Mitta(string rivi)
        {
            Mitoita();
            var alku = teksti.style.letterSpacing;
            var tulos = new System.Text.StringBuilder();
            tulos.Append("fontti ").Append(teksti.resolvedStyle.fontSize.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture));
            foreach (float v in new[] { 0f, 1f, 2f, 4f })
            {
                teksti.style.letterSpacing = v;
                var koko = teksti.MeasureTextSize(rivi, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined);
                tulos.Append(string.Format(System.Globalization.CultureInfo.InvariantCulture, ", väli {0:0} → {1:0.0}×{2:0.0}", v, koko.x, koko.y));
            }
            teksti.style.letterSpacing = alku;
            return tulos.ToString();
        }

        static void Kutsu(Action a)
        {
            try { a?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }
    }
}
