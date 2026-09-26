// KUVASUURENNOS (Natiivi-UI): kuva isona paperikehyksessä, pitkä selite ja lähderivi
// (webin naytaKulttuuriKuva / avaaKohdeSuurennos). Sarjaa voi selata ‹ ›; napautus kuvan
// ohi sulkee. Kuvat NostoSisalto.HaeKuva-reitillä (https, media.json, Commons). Ihmekuvalla
// kulmanauha kuten kortissa (web avaaKohdeSuurennos piirraIhmenauha) ja oma reaktiorivi
// (LehtiKuva.Reaktio, web piirraReaktiot luokalla reaktiot-suurennos).
//
// KOKORUUTU (löydös 150, omistaja build 16, Fablen linjaus A 26.9.2026; vain nostokortti): tumma näkymä ilman kehystä,
// kuva reunasta reunaan (contain koko ruutuun), ei kuvatekstiä eikä lähderiviä (138:n linja; Commons-tekijärivi jää
// korttiin), nipistyszoomi 1–4 × ja panorointi zoomattuna, sulku napautuksesta tai pyyhkäisystä alas. Tausta
// sumennetaan (löydös 132, AukiMuuttui). Sarjaa selataan pyyhkäisyllä, kun kuvaa ei ole zoomattu.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Kuvasuurennos
    {
        readonly VisualElement kerros, kuva, kehys, pysaytys;
        ReaktioRivi reaktiot;
        readonly Label teksti, lahde, laskuri;
        string lahdeUrl;
        VisualElement nauha;
        Texture2D ladattu;
        readonly Button edellinen, seuraava;
        List<LehtiKuva> sarja = new List<LehtiKuva>();
        int i, versio;

        public bool Auki { get; private set; }

        /// <summary>Avautui (true) tai alkoi sulkeutua (false); nostokortti pehmentää itsensä taustaksi (löydös 132).</summary>
        public event Action<bool> AukiMuuttui;

        /// <summary>
        /// Löydös 102 (omistaja, build 13): noston kuvasuurennos niin isona kuin mahtuu (web fokuskohteet.js
        /// avaaKohdeSuurennos mitoita + ui-apurit.js suurennoksenMitat tayteen: 0,97 ruudusta, reunavara 16 pt, kuva
        /// enintään 1,4 × luonnollinen leveys, vähintään 140 pt ja 28 % ruudun korkeudesta). Web-mitat
        /// b13o/web/web-mitat-94-102-90.json: iPhone kehys 365 × 521, iPad 793 × 685. Ilman tätä kehys 640 ja kuva 420.
        /// </summary>
        public bool Tayteen
        {
            get => tayteen;
            set { tayteen = value; kerros.EnableInClassList("mk-suurennos--tayteen", value); Mitoita(); }
        }
        bool tayteen;

        /// <summary>Löydös 150: kokoruututila (ks. tiedoston alku).</summary>
        public bool Kokoruutu
        {
            get => kokoruutu;
            set { kokoruutu = value; kerros.EnableInClassList("mk-suurennos--kokoruutu", value); selaus.VainPyyhkaisy = value; Mitoita(); }
        }
        bool kokoruutu;
        const float ZoomMax = 4f, AlasSulku = 90f, Liike = 8f;
        readonly KuvaSelaus selaus;
        readonly Dictionary<int, Vector2> osoittimet = new Dictionary<int, Vector2>();
        float zoom = 1f, alkuZoom = 1f, alkuEtaisyys = 1f;
        Vector2 siirto, alkuSiirto, alkuKeski, yksiAlku, viimeYksi;
        bool liikkui;
        bool Zoomattu => zoom > 1.01f;
        const float TayteenOsuus = 0.97f, TayteenReuna = 16f, TayteenVenyma = 1.4f, TayteenKapein = 140f, TayteenVahinKorkeus = 0.28f;

        public Kuvasuurennos(VisualElement isa)
        {
            kerros = Rakenne.El("mk-nosto__suurennos mk-suurennos", isa);
            kerros.style.display = DisplayStyle.None;
            // Löydös 132: kokoruudun taustaksi pallon sumennettu pysäytyskuva (Natiiviseppä, PalloKierto.Pysaytyskuva)
            // tummennettuna; pallon kamera on sen ajan pois (lämpö).
            pysaytys = Rakenne.El("mk-suurennos__pysaytys", kerros, PickingMode.Ignore);
            pysaytys.style.display = DisplayStyle.None;
            PalloKierto.PysaytysValmis += t => { if (kokoruutu && Auki) AsetaPysaytys(t); };
            PalloKierto.PysaytysPoistui += () => AsetaPysaytys(null); // synkronisesti: tekstuuri vapautetaan heti tämän jälkeen
            kerros.RegisterCallback<PointerDownEvent>(e => { if (e.target == kerros && !kokoruutu) Sulje(); });
            kehys = Rakenne.El("mk-nosto__suurennoskehys", kerros);
            kuva = Rakenne.El("mk-nosto__suurennoskuva", kehys, PickingMode.Ignore);
            edellinen = Rakenne.Nappi("‹", "mk-nosto__selaa mk-nosto__selaa--vasen", () => Nayta(i - 1), kuva);
            seuraava = Rakenne.Nappi("›", "mk-nosto__selaa mk-nosto__selaa--oikea", () => Nayta(i + 1), kuva);
            kuva.pickingMode = PickingMode.Position;
            selaus = new KuvaSelaus(kehys, () => sarja?.Count ?? 0, s => Nayta(i + s), () => kuva) { Esta = () => kokoruutu && Zoomattu };
            kerros.RegisterCallback<PointerDownEvent>(Alas, TrickleDown.TrickleDown);
            kerros.RegisterCallback<PointerMoveEvent>(Liiku, TrickleDown.TrickleDown);
            kerros.RegisterCallback<PointerUpEvent>(Ylos, TrickleDown.TrickleDown);
            kerros.RegisterCallback<PointerCancelEvent>(e => { osoittimet.Remove(e.pointerId); }, TrickleDown.TrickleDown);
            laskuri = Rakenne.Teksti("", "mk-nosto__laskuri", kuva);
            kuva.RegisterCallback<GeometryChangedEvent>(_ => Nostokortti.SovitaNauha(kuva, nauha, ladattu));
            kerros.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
            kehys.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
            Kirjasimet.Aseta(laskuri, Kirjasin.Kone);
            teksti = Rakenne.Teksti("", "mk-nosto__suurennosteksti", kehys);
            Kirjasimet.Aseta(teksti, Kirjasin.Luku);
            lahde = Rakenne.Teksti("", "mk-nosto__lahde", kehys);
            Kirjasimet.Aseta(lahde, Kirjasin.Kone);
            lahde.RegisterCallback<ClickEvent>(e => { if (lahdeUrl != null) { e.StopPropagation(); Application.OpenURL(lahdeUrl); } });
        }

        public void Avaa(IReadOnlyList<LehtiKuva> kuvat, int alku = 0)
        {
            sarja = new List<LehtiKuva>(kuvat ?? Array.Empty<LehtiKuva>());
            if (sarja.Count == 0) return;
            Nayta(alku);
            bool oli = Auki;
            Auki = true;
            if (kokoruutu && PalloKierto.Pysaytyskuva != null) AsetaPysaytys(PalloKierto.Pysaytyskuva);
            Rakenne.Nayta(kerros, true, 220);
            if (!oli) AukiMuuttui?.Invoke(true);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            versio++;
            NollaaZoom();
            Rakenne.Nayta(kerros, false, 180);
            AukiMuuttui?.Invoke(false);
        }

        /// <summary>Täyttötila: kuvan koko contain-periaatteella; kehyksen muu tila (paperi, teksti) vähennetään varasta.</summary>
        void Mitoita()
        {
            if (kokoruutu && ladattu != null && ladattu.height > 0)
            {
                // Löydös 150: contain koko ruutuun ilman reunoja ja venymärajaa.
                float kl = kerros.layout.width, kk = kerros.layout.height;
                if (float.IsNaN(kl) || float.IsNaN(kk) || kl <= 0f || kk <= 0f) return;
                float s = (float)ladattu.width / ladattu.height;
                float lw = kl, lh = lw / s;
                if (lh > kk) { lh = kk; lw = lh * s; }
                lw = Mathf.Round(lw); lh = Mathf.Round(lh);
                if (Mathf.Abs(kuva.layout.width - lw) <= 1f && Mathf.Abs(kuva.layout.height - lh) <= 1f) return;
                kuva.style.width = lw;
                kuva.style.height = lh;
                kehys.style.width = lw;
                return;
            }
            if (!tayteen || ladattu == null || ladattu.height <= 0) return;
            float rl = kerros.layout.width, rk = kerros.layout.height;
            float kw = kuva.layout.width, kh = kuva.layout.height;
            float vaakaTila = kehys.layout.width - kw, pystyTila = kehys.layout.height - kh;
            if (float.IsNaN(rl) || float.IsNaN(kw) || float.IsNaN(vaakaTila) || float.IsNaN(pystyTila) || rl <= 0f || rk <= 0f) return;
            float suhde = (float)ladattu.width / ladattu.height;
            float leveysKatto = Mathf.Min(rl * TayteenOsuus - vaakaTila - TayteenReuna, ladattu.width * TayteenVenyma);
            float korkeusKatto = Mathf.Max(rk * TayteenOsuus - pystyTila - TayteenReuna, rk * TayteenVahinKorkeus);
            float w = leveysKatto, h = w / suhde;
            if (h > korkeusKatto) { h = korkeusKatto; w = h * suhde; }
            if (w < TayteenKapein) { w = TayteenKapein; h = w / suhde; }
            w = Mathf.Round(w);
            h = Mathf.Round(h);
            if (Mathf.Abs(kw - w) <= 1f && Mathf.Abs(kh - h) <= 1f) return;
            kuva.style.width = w;
            kuva.style.height = h;
            kehys.style.width = w + vaakaTila;
        }

        void AsetaPysaytys(Texture t)
        {
            if (t == null) { pysaytys.style.backgroundImage = StyleKeyword.None; pysaytys.style.display = DisplayStyle.None; return; }
            var tausta = t is RenderTexture rt ? Background.FromRenderTexture(rt) : t is Texture2D t2 ? Background.FromTexture2D(t2) : default;
            pysaytys.style.backgroundImage = new StyleBackground(tausta);
            pysaytys.style.display = DisplayStyle.Flex;
        }

        // --- kokoruudun eleet (löydös 150) ------------------------------------------------------------

        void NollaaZoom()
        {
            zoom = 1f;
            siirto = Vector2.zero;
            osoittimet.Clear();
            kuva.style.scale = StyleKeyword.Null;
            kuva.style.translate = StyleKeyword.Null;
        }

        void Alas(PointerDownEvent e)
        {
            if (!kokoruutu) return;
            osoittimet[e.pointerId] = e.position;
            if (osoittimet.Count == 1) { yksiAlku = viimeYksi = e.position; alkuSiirto = siirto; liikkui = false; }
            else if (osoittimet.Count == 2) AloitaNipistys();
        }

        void AloitaNipistys()
        {
            var p = new List<Vector2>(osoittimet.Values);
            alkuEtaisyys = Mathf.Max(1f, Vector2.Distance(p[0], p[1]));
            alkuZoom = zoom;
            alkuKeski = (p[0] + p[1]) / 2f;
            alkuSiirto = siirto;
            liikkui = true;
        }

        void Liiku(PointerMoveEvent e)
        {
            if (!kokoruutu || !osoittimet.ContainsKey(e.pointerId)) return;
            osoittimet[e.pointerId] = e.position;
            if (osoittimet.Count >= 2)
            {
                var p = new List<Vector2>(osoittimet.Values);
                float d = Vector2.Distance(p[0], p[1]);
                zoom = Mathf.Clamp(alkuZoom * d / alkuEtaisyys, 1f, ZoomMax);
                var keski = (p[0] + p[1]) / 2f;
                siirto = alkuSiirto * (zoom / alkuZoom) + (keski - alkuKeski);
                Aseta(0f);
                e.StopPropagation();
                return;
            }
            var ero = (Vector2)e.position - yksiAlku;
            viimeYksi = e.position;
            if (ero.magnitude > Liike) liikkui = true;
            if (Zoomattu) { siirto = alkuSiirto + ero; Aseta(0f); e.StopPropagation(); }
            else if (ero.y > 0f && ero.y > Mathf.Abs(ero.x)) Aseta(ero.y); // pyyhkäisy alas: kuva seuraa sormea
        }

        void Ylos(PointerUpEvent e)
        {
            if (!kokoruutu || !osoittimet.Remove(e.pointerId)) return;
            if (osoittimet.Count == 1)
            {
                // Nipistyksestä yhteen sormeen: panorointi jatkuu nykyisestä kohdasta.
                foreach (var p in osoittimet.Values) { yksiAlku = viimeYksi = p; }
                alkuSiirto = siirto;
                return;
            }
            if (osoittimet.Count > 0) return;
            var ero = (Vector2)e.position - yksiAlku;
            if (!Zoomattu)
            {
                zoom = 1f;
                siirto = Vector2.zero;
                if (ero.y > AlasSulku && ero.y > Mathf.Abs(ero.x)) { Sulje(); return; }
                Aseta(0f);
                if (!liikkui) Sulje(); // napautus sulkee
            }
        }

        /// <summary>Zoom ja siirto kuvalle, siirto rajattuna niin, ettei zoomatun kuvan reuna irtoa ruudun reunasta.</summary>
        void Aseta(float alasVeto)
        {
            float kl = kerros.layout.width, kk = kerros.layout.height, w = kuva.layout.width, h = kuva.layout.height;
            if (!float.IsNaN(kl) && !float.IsNaN(w))
            {
                float mx = Mathf.Max(0f, (w * zoom - kl) / 2f), my = Mathf.Max(0f, (h * zoom - kk) / 2f);
                siirto = new Vector2(Mathf.Clamp(siirto.x, -mx, mx), Mathf.Clamp(siirto.y, -my, my));
            }
            kuva.style.scale = new Scale(new Vector2(zoom, zoom));
            kuva.style.translate = new Translate(siirto.x, siirto.y + alasVeto);
            Ruudunpaivitys.Herata(0.1f);
        }

        void Nayta(int uusi)
        {
            i = (uusi % sarja.Count + sarja.Count) % sarja.Count;
            var k = sarja[i];
            int v = ++versio;
            NollaaZoom();
            kuva.style.backgroundImage = StyleKeyword.None;
            ladattu = null;
            nauha?.RemoveFromHierarchy();
            nauha = null;
            if (k.Nauha != null)
            {
                nauha = Nostokortti.Ihmenauha(kuva, k.Nauha);
                nauha.style.display = DisplayStyle.None; // näkyviin, kun kuvan kulma tiedetään
                nauha.SendToBack();
            }
            NostoSisalto.HaeKuva(k.Lahde, t =>
            {
                if (t == null || v != versio) return;
                ladattu = t;
                kuva.style.backgroundImage = new StyleBackground(t);
                Mitoita();
                if (nauha == null) return;
                nauha.style.display = DisplayStyle.Flex;
                Nostokortti.SovitaNauha(kuva, nauha, t);
            });
            teksti.text = k.Selite ?? k.Lyhyt ?? "";
            // Löydös 150: kokoruudussa ei kuvatekstiä eikä lähderiviä (inline-tyyli voittaisi USS:n, siksi täällä).
            teksti.style.display = teksti.text.Length > 0 && !kokoruutu ? DisplayStyle.Flex : DisplayStyle.None;
            lahde.text = k.LahdeRivi ?? "";
            lahdeUrl = string.IsNullOrEmpty(k.LahdeUrl) ? null : k.LahdeUrl;
            lahde.pickingMode = lahdeUrl != null ? PickingMode.Position : PickingMode.Ignore;
            lahde.EnableInClassList("mk-nosto__lahde--linkki", lahdeUrl != null);
            lahde.style.display = lahde.text.Length > 0 && !kokoruutu ? DisplayStyle.Flex : DisplayStyle.None;
            bool monta = sarja.Count > 1;
            // Löydös 34: ei nuolia kuvan päällä; selaus reunanapautuksella ja pyyhkäisyllä (KuvaSelaus).
            edellinen.style.display = seuraava.style.display = DisplayStyle.None;
            laskuri.style.display = monta ? DisplayStyle.Flex : DisplayStyle.None;
            laskuri.text = $"{i + 1} / {sarja.Count}";
            // Kuvan oma reaktiorivi paperin alle (web avaaKohdeSuurennos / naytaKulttuuriKuva: kuva.reaktio,
            // käytännössä Matkakirjan ihme); vaihtuu kuvan mukana.
            reaktiot?.Juuri.RemoveFromHierarchy();
            reaktiot = Reaktiot.Piirra(kehys, k.Reaktio, k.ReaktioOtsikko ?? k.Otsikko ?? k.Lyhyt, "mk-reaktiot--suurennos");
        }
    }
}
