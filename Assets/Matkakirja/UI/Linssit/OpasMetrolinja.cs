// METROLINJA (omistaja 7.10.2026 klo 10.2x, Päätoimittajan kortti; Pariisin kaupunkiesitys): kierroksen eteneminen pystyviivana
// METROLINJA-pohjalla (Pohjat/metrolinja.uss). Kaikki asemat nimineen himmeinä, nykyinen tummana ja lihavoituna; kuljettu osuus
// viivasta korostusvärillä. Data LS1:ltä (OpasSovitin.KierrosKohteet, KierrosIndeksi, KierrosVaihtui). Paikka ja korkeus OpasValikolta.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OpasMetrolinja
    {
        /// <summary>Asemien väli (pt), kun tilaa on; muuten linja tiivistyy enimmäiskorkeuteen.</summary>
        const float AsemaVali = 26f;
        readonly VisualElement juuri, viiva, kuljettu;
        readonly List<(VisualElement Rivi, Label Nimi, VisualElement Paikka)> asemat = new List<(VisualElement, Label, VisualElement)>();
        bool nakyy, likainen = true;
        int naytettyIndeksi = -2;

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

        /// <summary>Joka ruudulla: näkyvyys, pystykaista (yla…ala paneelin pisteinä), enimmäiskorkeus ja nimien enimmäisleveys.</summary>
        public void Paivita(bool nayta, float yla, float ala, float maksimi, float maksimiLeveys)
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
            if (i != naytettyIndeksi) Korosta(i);
            // Korkeus: asemaväli × määrä, enintään 40 % ja kaistan korkeus; keskelle kaistaa.
            float kaista = Mathf.Max(0f, ala - yla);
            float korkeus = Mathf.Min(Mathf.Min(maksimi, kaista), AsemaVali * nimet.Count);
            float top = Mathf.Round(yla + (kaista - korkeus) * 0.5f);
            if (juuri.style.top.value.value != top) juuri.style.top = top;
            if (juuri.style.height.value.value != korkeus) juuri.style.height = Mathf.Round(korkeus);
            if (juuri.style.left.value.value != OpasTapit.Reuna) juuri.style.left = OpasTapit.Reuna;
            if (juuri.style.maxWidth.value.value != maksimiLeveys) juuri.style.maxWidth = Mathf.Round(maksimiLeveys);
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
                asemat.Add((rivi, nimi, paikka));
            }
            naytettyIndeksi = -2;
        }

        void Korosta(int i)
        {
            naytettyIndeksi = i;
            for (int k = 0; k < asemat.Count; k++)
            {
                bool nyt = k == i;
                asemat[k].Rivi.EnableInClassList("mk-metrolinja__asema--nykyinen", nyt);
                Kirjasimet.Aseta(asemat[k].Nimi, nyt ? Kirjasin.ModerniLihava : Kirjasin.Moderni);
            }
            AsetteleViiva();
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
            int i = Mathf.Clamp(naytettyIndeksi, 0, asemat.Count - 1);
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
