// AIKASELAIN (Natiivi-UI): ihmisen matkan nauha ruudun alalaidassa (web js/linssit/aikaselain.js
// luoAikaselain, aallonTaso, viivanPaikka, osuusPaikasta, lahinIndeksi; css/aikajana.css .aikaselain).
//
// Pelkkä pinta kuten webissä: viiva per jakso tasavälein, valittu kultaisena ja naapurit aaltona
// (kosini, leveys 3), vuosi valitun viivan yllä. Sormi nauhalla lukitsee kosketuksen (CapturePointer):
// veto esikatselee (Esikatselu(osuus)), irrotus tai napautus valitsee (Valinta(id)). Moottori
// (Esitys.Esikatsele / Valitse) on Linssisepän.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Aikaselain
    {
        const int AallonLeveys = 3; // web AALLON_LEVEYS

        readonly VisualElement nauha, viivarivi;
        readonly Label vuosi;
        readonly List<VisualElement> viivat = new List<VisualElement>();
        List<(string Id, string Otsikko, double Vuosia)> pisteet = new List<(string, string, double)>();
        Func<double, string> teksti = v => v.ToString("0");
        int valittu = -1, esikatselu = -1, osoitin = -1;
        bool vedossa;

        /// <summary>Veto nauhalla: jatkuva osuus 0…1 (web onEsikatselu).</summary>
        public event Action<double> Esikatselu;
        /// <summary>Irrotus tai napautus: jakson tunnus (web onValinta).</summary>
        public event Action<string> Valinta;

        public bool Nakyy => nauha.style.display.value == DisplayStyle.Flex;
        public bool Vedossa => vedossa;

        /// <summary>Nauhan korkeus (web --aikaselain-korkeus: 62 px, puhelimessa 54 px) ilman turva-aluetta.</summary>
        public float Korkeus => Puhelin ? 54f : 62f;
        bool Puhelin => Screen.width / Mathf.Max(1f, Screen.dpi > 0 ? Mathf.Round(Screen.dpi / 163f) : 1f) <= 600f;

        public Aikaselain(VisualElement isa)
        {
            nauha = Rakenne.El("mk-aikaselain", isa);
            nauha.style.display = DisplayStyle.None;
            viivarivi = Rakenne.El("mk-aikaselain__viivat", nauha, PickingMode.Ignore);
            vuosi = Rakenne.Teksti("", "mk-aikaselain__vuosi", nauha);
            vuosi.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(vuosi, Kirjasin.Kone);
            nauha.RegisterCallback<PointerDownEvent>(Alas);
            nauha.RegisterCallback<PointerMoveEvent>(Liike);
            nauha.RegisterCallback<PointerUpEvent>(Ylos);
            nauha.RegisterCallback<PointerCaptureOutEvent>(_ => { if (vedossa) PaataVeto(); });
            // Vuoden paikka lasketaan nauhan leveydestä: näkyviin tultaessa leveys oli vielä 0, jolloin
            // viimeisen tikin vuosi jäi vasempaan laitaan puoliksi ruudun ulkopuolelle (kontakti 794e96f).
            nauha.RegisterCallback<GeometryChangedEvent>(e =>
            {
                if (Mathf.Approximately(e.oldRect.width, e.newRect.width)) return;
                int i = vedossa ? esikatselu : valittu;
                if (i >= 0) Piirra(i);
            });
        }

        /// <summary>Pisteet jaksojärjestyksessä (IhmisenMatkaLinssi.AikaselaimenPisteet) ja vuoden muotoilu.</summary>
        public void Rakenna(IReadOnlyList<(string Id, string Otsikko, double Vuosia)> uudet, Func<double, string> muotoilu)
        {
            pisteet = new List<(string, string, double)>(uudet ?? Array.Empty<(string, string, double)>());
            if (muotoilu != null) teksti = muotoilu;
            viivarivi.Clear();
            viivat.Clear();
            for (int i = 0; i < pisteet.Count; i++)
            {
                var v = Rakenne.El("mk-aikaselain__viiva", viivarivi, PickingMode.Ignore);
                v.style.left = Length.Percent(ViivanPaikka(i, pisteet.Count));
                viivat.Add(v);
            }
            valittu = esikatselu = -1;
            Piirra(0);
        }

        /// <summary>Nauha näkyviin tai pois; turva-alue alareunassa (paddingBottom).</summary>
        public void Nayta(bool nakyy, float turvaAla = 0)
        {
            nauha.style.display = nakyy && pisteet.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            nauha.style.height = Korkeus + turvaAla;
            nauha.style.paddingBottom = turvaAla;
            nauha.EnableInClassList("mk-aikaselain--puhelin", Puhelin);
        }

        /// <summary>Nykyinen jakso (esityksen koukku): piirretään, ellei sormi ole nauhalla.</summary>
        public bool Aseta(string id)
        {
            int i = pisteet.FindIndex(p => p.Id == id);
            if (i < 0) return false;
            valittu = i;
            if (!vedossa) Piirra(i);
            return true;
        }

        // --- web aallonTaso, viivanPaikka, osuusPaikasta, lahinIndeksi -----------------------------

        static float AallonTaso(int d)
        {
            float e = Mathf.Abs(d);
            if (e > AallonLeveys) return 0;
            return (Mathf.Cos(e / (AallonLeveys + 1) * Mathf.PI) + 1) / 2f;
        }

        static float ViivanPaikka(int i, int maara) => maara > 0 ? (i + 0.5f) / maara * 100f : 0;

        static double OsuusPaikasta(float x, float leveys, int maara)
        {
            if (maara <= 1 || leveys <= 0) return 0;
            float vali = leveys / maara, matka = (maara - 1) * vali;
            return Mathf.Clamp01((x - vali / 2f) / matka);
        }

        static int LahinIndeksi(double osuus, int maara) =>
            maara <= 0 ? -1 : Mathf.Clamp(Mathf.RoundToInt((float)(Math.Max(0, Math.Min(1, osuus)) * (maara - 1))), 0, maara - 1);

        void Piirra(int i)
        {
            if (pisteet.Count == 0) return;
            i = Mathf.Clamp(i, 0, pisteet.Count - 1);
            bool puhelin = Puhelin;
            float pohja = puhelin ? 8f : 9f, nousu = puhelin ? 18f : 21f;
            for (int k = 0; k < viivat.Count; k++)
            {
                float taso = AallonTaso(k - i);
                viivat[k].style.height = pohja + taso * nousu;
                viivat[k].style.opacity = 0.62f + taso * 0.38f;
                viivat[k].EnableInClassList("mk-aikaselain__viiva--valittu", k == i);
            }
            vuosi.text = teksti(pisteet[i].Vuosia);
            // Rajataan laidoista, ettei pitkä vuosi valu ruudun yli (web clamp(4,2rem, paikka, 100 % − 4,2rem)).
            float leveys = nauha.resolvedStyle.width, raja = puhelin ? 58f : 67f;
            float x = ViivanPaikka(i, pisteet.Count) / 100f * (float.IsNaN(leveys) ? 0 : leveys);
            if (leveys > 2 * raja) x = Mathf.Clamp(x, raja, leveys - raja);
            vuosi.style.left = x;
        }

        // --- kosketus (web alku, liike, loppu, paataVeto) --------------------------------------------

        void Alas(PointerDownEvent e)
        {
            if (vedossa || pisteet.Count == 0) return;
            vedossa = true;
            osoitin = e.pointerId;
            nauha.CapturePointer(e.pointerId);
            nauha.AddToClassList("mk-aikaselain--vedossa");
            Esikatsele(e.localPosition.x);
            e.StopPropagation();
        }

        void Liike(PointerMoveEvent e)
        {
            if (!vedossa || e.pointerId != osoitin) return;
            Esikatsele(e.localPosition.x);
            e.StopPropagation();
        }

        void Ylos(PointerUpEvent e)
        {
            if (!vedossa || e.pointerId != osoitin) return;
            Esikatsele(e.localPosition.x);
            e.StopPropagation();
            PaataVeto();
        }

        void Esikatsele(float x)
        {
            double osuus = OsuusPaikasta(x, nauha.resolvedStyle.width, pisteet.Count);
            int i = LahinIndeksi(osuus, pisteet.Count);
            if (i != esikatselu) { esikatselu = i; Piirra(i); }
            Esikatselu?.Invoke(osuus);
        }

        void PaataVeto()
        {
            if (!vedossa) return;
            vedossa = false;
            if (nauha.HasPointerCapture(osoitin)) nauha.ReleasePointer(osoitin);
            osoitin = -1;
            nauha.RemoveFromClassList("mk-aikaselain--vedossa");
            int i = esikatselu;
            esikatselu = -1;
            if (i < 0) return;
            valittu = i;
            Piirra(i);
            Valinta?.Invoke(pisteet[i].Id);
        }
    }
}
