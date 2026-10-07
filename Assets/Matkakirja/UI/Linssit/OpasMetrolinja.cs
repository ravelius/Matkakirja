// METROLINJA (omistaja 7.10.2026 klo 10.2x, Päätoimittajan kortti; Pariisin kaupunkiesitys): kierroksen eteneminen pystyviivana
// METROLINJA-pohjalla (Pohjat/metrolinja.uss). Kaikki asemat nimineen himmeinä, nykyinen tummana ja lihavoituna; kuljettu osuus
// viivasta korostusvärillä. Data LS1:ltä (OpasSovitin.KierrosKohteet, KierrosIndeksi, KierrosVaihtui). Paikka ja korkeus OpasValikolta.
// Omistaja 7.10. 12.3x: ei taustaa; porrastus nykyinen (välitotsikko, lihava) > viereiset (apuri) > muut (kapiteeli, hennompi),
// teksti ja viiva oppaan otsikon tyylillä (valkoinen, Himmennys-varjo ja ääriviiva). Kuumailmapallon lähtiessä (LS1
// KierrosLahtee) seuraava suurenee ja nykyinen pienenee pehmeästi ~1 s: sisältöanimaatio koodista joka ruudulla, ei USS-siirtymä.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OpasMetrolinja
    {
        /// <summary>Asemien väli (pt), kun tilaa on; muuten linja tiivistyy enimmäiskorkeuteen.</summary>
        const float AsemaVali = 26f;
        public const float AsemaValiPt = AsemaVali;
        /// <summary>Kompakti (iPhone vaaka, omistaja 13.3x): vain nykyinen ja viereiset nimellä, muut pisteinä tiiviisti.</summary>
        public bool Kompakti;
        /// <summary>iPhone pysty (omistaja 13.3x): Dynamic Islandin tasolla (rivin yläreuna &lt; IslandAlaY, paneelin pt) nimi enintään
        /// IslandKapea pt; alemmat rivit koko leveydellä. 0 = ei rajausta.</summary>
        public float IslandAlaY, IslandKapea;
        /// <summary>Pienin rivikorkeus (pt), jolla nimi mahtuu (apuri-koko + väli).</summary>
        public const float VahinRivi = 16f;
        /// <summary>Asemien määrä (viimeksi rakennettu).</summary>
        public int Maara => asemat.Count;
        readonly VisualElement juuri, viiva, kuljettu;
        readonly List<(VisualElement Rivi, Label Nimi, VisualElement Paikka)> asemat = new List<(VisualElement, Label, VisualElement)>();
        bool nakyy, likainen = true;
        int naytettyIndeksi = -2;
        /// <summary>Korostettava asema (lähdössä jo seuraava) ja animaation alku; porrastus lerpataan Vaihto-sekunnissa.</summary>
        int kohde = -2;
        float vaihtoAlku = -10f;
        float[] alkuTaso = new float[0], nytTaso = new float[0];
        const float Vaihto = 1f;
        /// <summary>Metrolinjan alareuna paneelin pisteinä (iPhonella otsikko sen alle); 0 = ei näy.</summary>
        public static float Alareuna { get; private set; }

        /// <summary>Testi (`ui opasvalikko metro`): Pariisin kohteet ilman kierrosta.</summary>
        public bool Testi;
        public int TestiIndeksi = 2;
        static readonly string[] TestiNimet = { "Eiffel-torni", "Trocadéro", "Riemukaari", "Champs-Élysées", "Place de la Concorde",
            "Louvre", "Notre-Dame de Paris", "Sacré-Cœurin basilika Montmartren kukkulalla" };

        public OpasMetrolinja(VisualElement isa)
        {
            juuri = Rakenne.El("tk-teema-harmaa mk-metrolinja", isa, PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;
            viiva = Rakenne.El("mk-metrolinja__viiva", juuri, PickingMode.Ignore);
            kuljettu = Rakenne.El("mk-metrolinja__kuljettu", juuri, PickingMode.Ignore);
            OpasSovitin.KierrosVaihtui += () => likainen = true;
            // Lähtö: seuraava korostuu jo lennon alussa (omistaja 12.3x).
            OpasSovitin.KierrosLahtee += (nyk, seur, kesto) => Kohdista(seur);
            juuri.RegisterCallback<GeometryChangedEvent>(_ => AsetteleViiva());
        }

        IReadOnlyList<string> Nimet()
        {
            if (Testi) return TestiNimet;
            var k = OpasSovitin.KierrosKohteet;
            var l = new List<string>();
            if (k != null) foreach (var x in k) l.Add(x.nimi);
            return l;
        }

        int Indeksi => Testi ? Mathf.Clamp(TestiIndeksi, 0, TestiNimet.Length - 1) : OpasSovitin.KierrosIndeksi;

        /// <summary>Korostus siirtyy asemaan i pehmeästi (Vaihto s).</summary>
        public void Kohdista(int i)
        {
            if (i == kohde) return;
            kohde = i;
            alkuTaso = (float[])nytTaso.Clone();
            vaihtoAlku = Time.unscaledTime;
        }

        /// <summary>Aseman taso 0–2: 2 = nykyinen, 1 = viereinen, 0 = muut.</summary>
        static float Taso(int k, int i) => k == i ? 2f : Mathf.Abs(k - i) == 1 ? 1f : 0f;

        /// <summary>Joka ruudulla: näkyvyys, pystykaista (yla…ala paneelin pisteinä), enimmäiskorkeus ja nimien enimmäisleveys.</summary>
        public void Paivita(bool nayta, float yla, float ala, float maksimi, float maksimiLeveys, float vasen)
        {
            var nimet = nayta ? Nimet() : null;
            nayta = nayta && nimet != null && nimet.Count > 1;
            if (nayta != nakyy)
            {
                nakyy = nayta;
                if (nayta) { juuri.style.display = DisplayStyle.Flex; juuri.schedule.Execute(() => { if (nakyy) juuri.AddToClassList("mk-metrolinja--nakyy"); }); }
                else
                {
                    juuri.RemoveFromClassList("mk-metrolinja--nakyy");
                    juuri.schedule.Execute(() => { if (!nakyy) juuri.style.display = DisplayStyle.None; }).StartingIn(Tyylikirja.Kesto.Sulku);
                }
            }
            if (!nayta) return;
            if (likainen || nimet.Count != asemat.Count) Rakenna(nimet);
            int i = Indeksi;
            // Saapuminen ilman lähtötapahtumaa (tai lähtö jäi väliin): sama siirtymä indeksin muuttuessa.
            if (i != naytettyIndeksi) { naytettyIndeksi = i; if (kohde != i) Kohdista(i); AsetteleViiva(); }
            Animoi();
            // Korkeus: asemaväli × määrä, enintään 40 % ja kaistan korkeus; keskelle kaistaa.
            float kaista = Mathf.Max(0f, ala - yla);
            float korkeus = Kompakti ? Mathf.Min(kaista, 3f * VahinRivi + (nimet.Count - 3) * 10f)
                : Mathf.Max(Mathf.Min(Mathf.Min(maksimi, kaista), AsemaVali * nimet.Count), VahinRivi * nimet.Count);
            float top = Mathf.Round(Keskita ? yla + (kaista - korkeus) * 0.5f : yla);
            if (juuri.style.top.value.value != top) juuri.style.top = top;
            if (juuri.style.height.value.value != korkeus) juuri.style.height = Mathf.Round(korkeus);
            if (juuri.style.left.value.value != vasen) juuri.style.left = vasen;
            if (juuri.style.maxWidth.value.value != maksimiLeveys) juuri.style.maxWidth = Mathf.Round(maksimiLeveys);
        }

        /// <summary>true = kaistan keskelle (iPad), false = kaistan yläreunaan (iPhone: vasen yläkulma).</summary>
        public bool Keskita = true;

        void Animoi()
        {
            int n = asemat.Count;
            if (nytTaso.Length != n) { nytTaso = new float[n]; alkuTaso = new float[n]; for (int k = 0; k < n; k++) nytTaso[k] = alkuTaso[k] = Taso(k, kohde); }
            float t = Mathf.Clamp01((Time.unscaledTime - vaihtoAlku) / Vaihto);
            float e = t * t * (3f - 2f * t);
            for (int k = 0; k < n; k++)
            {
                float taso = Mathf.Lerp(alkuTaso.Length == n ? alkuTaso[k] : 0f, Taso(k, kohde), e);
                nytTaso[k] = taso;
                var (rivi, nimi, paikka) = asemat[k];
                // Koko: kapiteeli 12 → apuri 14 → väliotsikko 18; peitto 0,6 → 0,85 → 1; piste 6 → 8 → 12 pt.
                float koko = taso < 1f ? Mathf.Lerp(Tyylikirja.Koko.Kapiteeli, Tyylikirja.Koko.Apuri, taso) : Mathf.Lerp(Tyylikirja.Koko.Apuri, Tyylikirja.Koko.Valiotsikko, taso - 1f);
                float peitto = taso < 1f ? Mathf.Lerp(0.6f, 0.85f, taso) : Mathf.Lerp(0.85f, 1f, taso - 1f);
                float piste = taso < 1f ? Mathf.Lerp(6f, 8f, taso) : Mathf.Lerp(8f, 12f, taso - 1f);
                if (Mathf.Abs(nimi.resolvedStyle.fontSize - koko) > 0.05f) nimi.style.fontSize = koko;
                rivi.style.opacity = peitto;
                var p = paikka[0];
                if (Mathf.Abs(p.resolvedStyle.width - piste) > 0.05f) { p.style.width = piste; p.style.height = piste; p.style.borderTopLeftRadius = p.style.borderTopRightRadius = p.style.borderBottomLeftRadius = p.style.borderBottomRightRadius = piste * 0.5f; }
                // Kompaktissa muut kuin nykyinen ja viereiset ilman nimeä (piste jää).
                var nd = Kompakti && taso < 0.5f ? DisplayStyle.None : DisplayStyle.Flex;
                if (nimi.style.display != nd) nimi.style.display = nd;
                float kapea = IslandAlaY > 0f && rivi.worldBound.yMin < IslandAlaY ? IslandKapea - 20f : -1f;
                if (kapea > 0f) { if (nimi.style.maxWidth.value.value != kapea) nimi.style.maxWidth = kapea; }
                else if (nimi.style.maxWidth.keyword != StyleKeyword.Null) nimi.style.maxWidth = StyleKeyword.Null;
                bool lihava = taso > 1.5f;
                if (rivi.ClassListContains("mk-metrolinja__asema--nykyinen") != lihava)
                {
                    rivi.EnableInClassList("mk-metrolinja__asema--nykyinen", lihava);
                    Kirjasimet.Aseta(nimi, lihava ? Kirjasin.ModerniLihava : Kirjasin.Moderni);
                }
            }
            if (t < 1f) AsetteleViiva();
            Alareuna = nakyy ? juuri.worldBound.yMax : 0f;
        }

        void Rakenna(IReadOnlyList<string> nimet)
        {
            likainen = false;
            foreach (var a in asemat) a.Rivi.RemoveFromHierarchy();
            asemat.Clear();
            foreach (var n in nimet)
            {
                var rivi = Rakenne.El("mk-metrolinja__asema", juuri, PickingMode.Ignore);
                var paikka = Rakenne.El("mk-metrolinja__paikka", rivi, PickingMode.Ignore);
                Rakenne.El("mk-metrolinja__piste", paikka, PickingMode.Ignore);
                var nimi = Rakenne.Teksti(n, "mk-metrolinja__nimi", rivi);
                Kirjasimet.Aseta(nimi, Kirjasin.Moderni);
                // Oppaan otsikon varjo ja ääriviiva (KierrosTaulu): erottuu ilman taustaa vaaleaa ja tummaa karttaa vasten.
                nimi.style.textShadow = new TextShadow { offset = new Vector2(0, 2), blurRadius = 14, color = Tyylikirja.Himmennys.Kuva };
                nimi.style.unityTextOutlineWidth = 0.8f;
                nimi.style.unityTextOutlineColor = (Color)Tyylikirja.Himmennys.Tumma;
                asemat.Add((rivi, nimi, paikka));
            }
            naytettyIndeksi = -2;
            nytTaso = new float[0];
        }

        /// <summary>Viiva ensimmäisen ja viimeisen aseman pisteiden keskeltä; kuljettu osuus nykyiseen asti.</summary>
        void AsetteleViiva()
        {
            if (asemat.Count < 2) return;
            var p0 = asemat[0].Paikka.worldBound; var p1 = asemat[asemat.Count - 1].Paikka.worldBound;
            if (p0.height <= 0 || float.IsNaN(p0.y)) return;
            Vector2 a = juuri.WorldToLocal(p0.center), b = juuri.WorldToLocal(p1.center);
            float x = Mathf.Round(a.x - 1f);
            viiva.style.left = x; viiva.style.top = a.y; viiva.style.height = Mathf.Max(0f, b.y - a.y);
            int i = Mathf.Clamp(naytettyIndeksi, 0, asemat.Count - 1);   // kuljettu osuus saavutettuun asemaan
            var pi = juuri.WorldToLocal(asemat[i].Paikka.worldBound.center);
            kuljettu.style.left = x; kuljettu.style.top = a.y; kuljettu.style.height = Mathf.Max(0f, pi.y - a.y);
            viiva.SendToBack(); kuljettu.PlaceInFront(viiva);
        }

        /// <summary>Testi: näkyvyys, laatikko ja nykyinen asema.</summary>
        public string Kuvaus()
        {
            var r = juuri.worldBound;
            return $"metrolinja {(nakyy ? "näkyy" : "piilossa")}, {asemat.Count} asemaa, nykyinen {naytettyIndeksi}, @ {r.xMin:0},{r.yMin:0} {r.width:0}×{r.height:0}";
        }
    }
}
