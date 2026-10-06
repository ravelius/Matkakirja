// OPPAAN KOHTEEN NIMILAPPU (omistaja 5.10.2026 klo 21.3x, juna 145 "kohteen korostus"; Päätoimittaja): linnan NIMILAPPU-pohja
// (DioraamaTaulu: lappu + pystyviiva + nasta kohteen pisteessä) harmaalla lasilla ja Moderni-kirjasimella. Näkyy pysähdyksellä
// ja kulkee kohteen mukana joka ruudulla kameran kiertäessä; häivytys 200 ms. Maahan piirrettävä rengas on Siirtosepän.
// Kytkentä (Linssiseppä): Kohde = () => kohteen 3D-piste Unityn maailmassa (Cesiumin georeferenssistä), Kamera = oppaan kamera.
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OpasNimilappu
    {
        /// <summary>Kohteen piste maailmassa (null = ei kohdetta).</summary>
        public static Func<Vector3?> Kohde;
        /// <summary>Kamera, jolla piste viedään ruudulle (oletus Camera.main).</summary>
        public static Func<Camera> Kamera;

        const float ViivaPituus = 34f, Reuna = 8f;

        readonly VisualElement isa, viiva, nasta;
        readonly Label lappu;
        bool nakyy;
        string teksti, edellinen;
        float nimiAlku = -100f;

        public OpasNimilappu(VisualElement isa)
        {
            this.isa = isa;
            viiva = Rakenne.El("tk-teema-harmaa mk-opas-nimilappu__viiva", isa, PickingMode.Ignore);
            nasta = Rakenne.El("tk-teema-harmaa mk-opas-nimilappu__nasta", isa, PickingMode.Ignore);
            lappu = Rakenne.Teksti("", "tk-teema-harmaa mk-opas-nimilappu", isa);
            lappu.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(lappu, Kirjasin.ModerniLihava);
            foreach (var e in new VisualElement[] { viiva, nasta, lappu }) e.style.display = DisplayStyle.None;
        }

        public bool Nakyy => nakyy && lappu.style.display == DisplayStyle.Flex;
        public Rect Laatikko => lappu.worldBound;

        /// <summary>Joka ruudulla: nimi (null = piiloon); paikka kohteen pisteestä ruudulle, lappu viivan päässä yläpuolella.</summary>
        public void Paivita(string nimi)
        {
            // NIMIKYLTTI (omistaja 5.10.2026, juna 146): lappu ~3 s pysähdyksen alussa, sitten se häipyy (seuraava pysähdys
            // tuo sen takaisin); ei koko pysähdyksen ajan.
            if (string.IsNullOrEmpty(nimi)) edellinen = null;
            else if (nimi != edellinen) { edellinen = nimi; nimiAlku = Time.unscaledTime; }
            if (!string.IsNullOrEmpty(nimi) && Time.unscaledTime - nimiAlku >= Nimikyltti.NakyyMs / 1000f) nimi = null;
            Vector2? p = null;
            if (!string.IsNullOrEmpty(nimi) && isa.panel != null)
            {
                var k = Kohde?.Invoke();
                var kam = Kamera?.Invoke() ?? Camera.main;
                if (k.HasValue && kam != null)
                {
                    var s = kam.WorldToScreenPoint(k.Value);
                    if (s.z > 0f) p = isa.WorldToLocal(RuntimePanelUtils.ScreenToPanel(isa.panel, new Vector2(s.x, Screen.height - s.y)));
                }
            }
            float w = isa.layout.width, h = isa.layout.height;
            bool nayta = p.HasValue && !float.IsNaN(w) && p.Value.x >= 0 && p.Value.x <= w && p.Value.y >= 0 && p.Value.y <= h;
            if (nayta && nimi != teksti) { teksti = nimi; lappu.text = nimi; }
            Aseta(nayta);
            if (!nayta) return;
            var q = p.Value;
            nasta.style.left = q.x - 4f; nasta.style.top = q.y - 4f;
            float lw = float.IsNaN(lappu.layout.width) || lappu.layout.width <= 0 ? 80f : lappu.layout.width;
            float lh = float.IsNaN(lappu.layout.height) || lappu.layout.height <= 0 ? 24f : lappu.layout.height;
            float ylos = q.y - ViivaPituus - lh;
            float lx = Mathf.Clamp(q.x - lw * 0.5f, Reuna, Mathf.Max(Reuna, w - lw - Reuna));
            float ly = Mathf.Max(Reuna, ylos);
            lappu.style.left = Mathf.Round(lx); lappu.style.top = Mathf.Round(ly);
            viiva.style.left = q.x - 0.75f; viiva.style.top = ly + lh;
            viiva.style.height = Mathf.Max(0f, q.y - (ly + lh) - 4f);
        }

        void Aseta(bool nayta)
        {
            if (nayta == nakyy) return;
            nakyy = nayta;
            foreach (var e in new VisualElement[] { viiva, nasta, lappu })
            {
                if (nayta)
                {
                    e.style.display = DisplayStyle.Flex;
                    var el = e;
                    el.schedule.Execute(() => { if (nakyy) el.AddToClassList("mk-opas-nimilappu--nakyy"); });
                }
                else
                {
                    e.RemoveFromClassList("mk-opas-nimilappu--nakyy");
                    var el = e;
                    el.schedule.Execute(() => { if (!nakyy) el.style.display = DisplayStyle.None; }).StartingIn(Tyylikirja.Kesto.Sulku);
                }
            }
        }

        /// <summary>Testi (`ui opasvalikko nimilappu`).</summary>
        public string Kuvaus()
        {
            var r = lappu.worldBound;
            return $"nimilappu {(nakyy ? "näkyy" : "piilossa")} \"{teksti}\" @ {r.xMin:0},{r.yMin:0} {r.width:0}×{r.height:0}, kohde {(Kohde?.Invoke() is Vector3 v ? v.ToString("F0") : "-")}";
        }
    }
}
