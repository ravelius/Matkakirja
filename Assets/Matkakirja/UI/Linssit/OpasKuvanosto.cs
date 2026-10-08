// KUVANOSTO (omistaja TF 168, 9.10.2026: "Kuvat jotka näkyvät välillä voisivat tulla pienempinä ruudun reunalle ja jäädä vähän
// pidemmäksi aikaa. Ne voisi olla klikattavissa suuremmaksi, vähän nykykokoa isommiksi"; Päätoimittaja: NOSTOKORTTI-kehys).
// Pallokierroksen yksityiskohtakuva pienenä oikeaan reunaan ylänappien alle (KuvanostoAsettelu.Pieni); napautus avaa sen keskelle
// hieman nykyistä 3D-korttia suurempana kuvatekstin ja lähteen kanssa (KuvanostoAsettelu.Iso), toinen napautus tai sivuun
// napautus palauttaa pieneksi. NOSTOKORTTI-pohjan paperi (mk-nosto), kuvakehys (mk-nosto__kuvakehys--nyky), kuvateksti ja lähde;
// siirtymät Tyylikirja.Kesto.Avaus (0,22 s). Ajoitus (milloin näkyy ja kuinka kauan) on LS1:n: OpasKuvanosto.Viimeisin.Nayta(kuva) /
// Piilota(); Suurennettu kertoo, että pelaaja katsoo kuvaa (ajastin voi odottaa).
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OpasKuvanosto
    {
        public static OpasKuvanosto Viimeisin { get; private set; }

        readonly VisualElement isa, sulkija, kortti, kehys, kuva;
        readonly Label teksti, lahde;
        OpasYksityiskohdat.Kuva nyt;
        float suhde = 0.8f;
        bool iso, este;
        int versio;

        /// <summary>Kuva näkyy (pienenä tai suurena).</summary>
        public bool Nakyy => nyt != null;
        /// <summary>Pelaaja avasi kuvan suureksi.</summary>
        public bool Suurennettu => nyt != null && iso;
        /// <summary>Kuvateksti ja lähde suuren kuvan alla (pt).</summary>
        const float Kaista = 44f;

        public OpasKuvanosto(VisualElement isa)
        {
            this.isa = isa;
            sulkija = Rakenne.El(null, isa, PickingMode.Position);
            sulkija.style.position = Position.Absolute;
            sulkija.style.left = 0; sulkija.style.right = 0; sulkija.style.top = 0; sulkija.style.bottom = 0;
            sulkija.style.display = DisplayStyle.None;
            sulkija.RegisterCallback<PointerDownEvent>(e => { e.StopPropagation(); Pieneksi(); });

            kortti = Rakenne.El("mk-nosto mk-nosto--kuvanosto", isa, PickingMode.Position);
            kortti.style.position = Position.Absolute;
            kortti.style.maxWidth = StyleKeyword.None; kortti.style.maxHeight = StyleKeyword.None;
            kortti.style.paddingTop = kortti.style.paddingBottom = kortti.style.paddingLeft = kortti.style.paddingRight = Tyylikirja.Vali.Xs;
            kortti.style.display = DisplayStyle.None;
            kortti.style.opacity = 0f;
            float s = Tyylikirja.Kesto.Avaus / 1000f;
            kortti.style.transitionProperty = new List<StylePropertyName> { "opacity", "left", "top", "width" };
            kortti.style.transitionDuration = new List<TimeValue> { new TimeValue(s), new TimeValue(s), new TimeValue(s), new TimeValue(s) };
            kortti.tooltip = "Kuva";
            kehys = Rakenne.El("mk-nosto__kuvakehys mk-nosto__kuvakehys--nyky", kortti, PickingMode.Ignore);
            kehys.style.transitionProperty = new List<StylePropertyName> { "height" };
            kehys.style.transitionDuration = new List<TimeValue> { new TimeValue(s) };
            kuva = Rakenne.El("mk-nosto__kuva", kehys, PickingMode.Ignore);
            teksti = Rakenne.Teksti("", "mk-nosto__kuvateksti", kortti);
            Kirjasimet.Aseta(teksti, Kirjasin.Luku);
            lahde = Rakenne.Teksti("", "mk-nosto__lahde", kortti);
            Kirjasimet.Aseta(lahde, Kirjasin.Kone);
            teksti.pickingMode = lahde.pickingMode = PickingMode.Ignore;
            kortti.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            kortti.RegisterCallback<ClickEvent>(_ => { if (iso) Pieneksi(); else Suureksi(); });
            isa.RegisterCallback<GeometryChangedEvent>(_ => Asettele());
            Viimeisin = this;
        }

        /// <summary>Uusi yksityiskohtakuva pienenä reunaan (LS1:n ajoitus).</summary>
        public void Nayta(OpasYksityiskohdat.Kuva k)
        {
            if (k == null || string.IsNullOrEmpty(k.Url)) { Piilota(); return; }
            int v = ++versio;
            nyt = k; iso = false;
            teksti.text = OpasYksityiskohdat.KortinTeksti(k);
            lahde.text = OpasYksityiskohdat.Tekijarivi(k) ?? "";
            Kuvat.Hae(k.Url, t =>
            {
                if (v != versio || nyt != k) return;
                if (t == null) { Debug.Log("MATKAKIRJA opas: kuvanosto ei latautunut " + k.Url); Piilota(); return; }
                kuva.style.backgroundImage = new StyleBackground(t);
                suhde = t.width / (float)Mathf.Max(1, t.height);
                Asettele();
                kortti.style.display = DisplayStyle.Flex;
                kortti.schedule.Execute(() => { if (v == versio) kortti.style.opacity = este ? 0f : 1f; }).ExecuteLater(16);
                Debug.Log($"MATKAKIRJA opas: kuvanosto {k.Ankkuri ?? k.Url} ({t.width}×{t.height})");
            });
        }

        /// <summary>Kuva pois (LS1:n ajoitus tai kohteen vaihto).</summary>
        public void Piilota()
        {
            int v = ++versio;
            nyt = null; iso = false;
            sulkija.style.display = DisplayStyle.None;
            kortti.style.opacity = 0f;
            kortti.schedule.Execute(() => { if (v == versio) { kortti.style.display = DisplayStyle.None; kuva.style.backgroundImage = StyleKeyword.Null; } })
                .StartingIn(Tyylikirja.Kesto.Avaus);
        }

        /// <summary>Valikko, chat tai siirtymä auki: kuva piiloon tilapäisesti (palaa, kun este poistuu).</summary>
        public bool Este
        {
            set
            {
                if (este == value) return;
                este = value;
                if (este && iso) Pieneksi();
                if (nyt != null) kortti.style.opacity = este ? 0f : 1f;
                kortti.pickingMode = este ? PickingMode.Ignore : PickingMode.Position;
            }
        }

        void Suureksi() { if (nyt == null || este) return; iso = true; sulkija.style.display = DisplayStyle.Flex; Asettele(); Debug.Log("MATKAKIRJA opas: kuvanosto suureksi"); }

        void Pieneksi() { if (!iso) return; iso = false; sulkija.style.display = DisplayStyle.None; Asettele(); }

        void Asettele()
        {
            float w = isa.layout.width, h = isa.layout.height;
            if (float.IsNaN(w) || w <= 0 || float.IsNaN(h) || h <= 0) return;
            var r = iso ? KuvanostoAsettelu.Iso(w, h, suhde, Kaista) : KuvanostoAsettelu.Pieni(w, h, suhde);
            float pad = Tyylikirja.Vali.Xs;
            kortti.style.left = r.X - pad; kortti.style.top = r.Y - pad;
            kortti.style.width = r.Lev + 2 * pad;
            kehys.style.height = r.Kork;
            teksti.style.display = iso && teksti.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            lahde.style.display = iso && lahde.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            kortti.BringToFront();
        }

        public string Kuvaus() => nyt == null ? "kuvanosto: ei kuvaa" : $"kuvanosto: {(iso ? "suuri" : "pieni")} {nyt.Url}" + (este ? " (este)" : "");
    }
}
