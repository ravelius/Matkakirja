// FINAL IK LINNAN HAHMOILLE (omistaja 5.10.2026 klo 14.4x: osti Final IK:n; Päätoimittaja: Grounder → Aim IK → Interaction System).
// Hahmoja ei animoi Animator vaan oma DioraamaSekoitin, joten Final IK:n komponentit ovat pois päältä ja ratkaisija päivitetään
// käsin animaation ja sijainnin jälkeen (PaivitaSkin: Sekoitin → IkPalauta → luut → PaivitaSijainti → Ik → PaaKatse).
// Vaihe 1 (tämä): FullBodyBipedIK + GrounderFBBIK, jalat lattiaan ja portaille (kirjuri ja renki kierreportailla, epätasainen
// lattia). Säteet osuvat huoneen meshistä tehtyyn MeshCollideriin kerroksessa IkKerros (vain kohdistetussa huoneessa, kerran).
// Testikomento "poikki ik 0|1" (DioraamaSovitin). Final IK on Asset Storen lisenssillä vain yksityisessä proto-gitissä (LAHTEET.md).
using System;
using System.Collections.Generic;
using RootMotion;
using RootMotion.FinalIK;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class DioraamaHahmot3D
    {
        /// <summary>Final IK päällä ("poikki ik 0|1").</summary>
        public static bool IkPaalla = true;
        /// <summary>Huoneen GameObject (DioraamaRakennus.Tilat), josta Grounderin törmäysmalli tehdään.</summary>
        public static Func<string, GameObject> TilanMalli;
        /// <summary>Grounderin säteiden kerros (huoneiden MeshColliderit; muu peli ei käytä fysiikkaa).</summary>
        public const int IkKerros = 30;
        static readonly HashSet<GameObject> kolliderit = new HashSet<GameObject>();

        /// <summary>Ennen luiden kirjoitusta: animoimattomat luut takaisin lepoasentoon (muuten IK:n muutos kertyisi).</summary>
        void IkPalauta(Esiintyma e)
        {
            if (e.Ik != null && e.Ik.solver.initiated) e.Ik.solver.FixTransforms();
        }

        /// <summary>Animaation ja sijainnin jälkeen: kohdistetun huoneen hahmoille FBBIK + Grounder.</summary>
        void Ik(Esiintyma e)
        {
            if (e.TilaId == null || e.TilaId != PuhujanTila) return;
            if (!IkPaalla) { MittaaJalat(e); return; }
            if (e.Ik == null)
            {
                if (e.IkYritetty) return;
                e.IkYritetty = true;
                e.Ik = LuoIk(e);
                if (e.Ik == null) return;
            }
            Kolliderit(e.TilaId);
            // Istuva tai polvistuva asento (lantio alle 0,65 m lattiasta): Grounder pois pehmeästi, ettei se vedä
            // polvistujan jalkoja lattiaan (kappalainen alttarilla).
            var g = e.Ik.GetComponent<GrounderFBBIK>();
            if (g != null)
            {
                var lantio = e.Ik.references.pelvis;
                bool seisoo = !Physics.Raycast(lantio.position + Vector3.up * 0.3f, Vector3.down, out var lattia, 2f, 1 << IkKerros)
                    || lantio.position.y - lattia.point.y > 0.65f;
                g.weight = Mathf.MoveTowards(g.weight, seisoo ? 1f : 0f, Time.unscaledDeltaTime * 2f);
            }
            Kadet(e);
            e.Ik.solver.Update();
            MittaaJalat(e);
        }

        /// <summary>Seikkailun jalat: Grounder vain tätä lähempänä kameraa (iPadin suoritin; kaukana jalat eivät erotu).</summary>
        public const float JalatMaxM = 22f;

        /// <summary>
        /// SEIKKAILUN KÄVELIJÖIDEN JALAT (omistaja 8.10. klo 19.1x: jalat maassa portailla ja kivillä; LisaaIrrallinen(jalat: true)):
        /// sama FBBIK + Grounder kuin huonehahmoilla, säteet kävelyn törmäysmalleihin (SeikkailuKavely kopioi ne IkKerrokseen;
        /// portaat askelmina). Istuessa (torkku, syo, nousu_istumasta, *istu*) tai lantion ollessa alle 0,65 m maasta Grounder
        /// häivytetään pois. Kaukana kamerasta (> JalatMaxM) ratkaisija ohitetaan: asento on silloin pelkkä animaatio.
        /// </summary>
        void IkJalat(Esiintyma e, string leike)
        {
            // Juuren korkeutta ei pehmennetä (LS2:n A/B 8.10.: pehmennetty juuri jäi askelmasta jälkeen, kantapää 3,1 → 10,4 cm).
            if (!IkPaalla || e.Juuri == null) return;
            var kam = Camera.main;
            if (kam != null && (kam.transform.position - e.Juuri.transform.position).sqrMagnitude > JalatMaxM * JalatMaxM) return;
            if (e.Ik == null)
            {
                if (e.IkYritetty) return;
                e.IkYritetty = true;
                e.Ik = LuoIk(e);
                if (e.Ik == null) return;
                var g0 = e.Ik.GetComponent<GrounderFBBIK>();
                // maxStep 0,5 (LS2:n Grounder-testi 8.10.: 0,3:lla tukijalka ponnahti 9 cm joka askeleella, 0,5:llä ei kertaakaan;
                // askelma 0,17–0,205 m). Paino nousee pehmeästi nollasta.
                // quality Best (säde + kapseli) ja heightOffset −0,02 (LS2:n ruudukko 8.10.: varpaat portaan etureunassa 8,5 → 2,6 cm,
                // kantapää 3,9 ja leijunta 4,2 cm, ponnahdukset 0, sama askelmilla 0,17–0,205 m). Kustannus rajattu JalatMaxM:llä.
                if (g0 != null) { g0.solver.maxStep = 0.5f; g0.solver.quality = Grounding.Quality.Best; g0.solver.heightOffset = -0.02f; g0.weight = 0f; }
            }
            var g = e.Ik.GetComponent<GrounderFBBIK>();
            if (g != null && g.solver.legs != null)
                foreach (var jalka in g.solver.legs) if (jalka != null) jalka.invertFootCenter = true;   // malli käännetty 180°: kasvot juuren −forward, varpaan säde eteen
            if (g != null)
            {
                string l = leike ?? "";
                bool istuu = l == "torkku" || l == "syo" || l == "nousu_istumasta" || l.Contains("istu");
                var lantio = e.Ik.references.pelvis;
                bool matala = Physics.Raycast(lantio.position + Vector3.up * 0.3f, Vector3.down, out var maa, 2f, 1 << IkKerros)
                    && lantio.position.y - maa.point.y < 0.65f;
                g.weight = Mathf.MoveTowards(g.weight, istuu || matala ? 0f : 1f, Time.unscaledDeltaTime * 2f);
            }
            e.Ik.solver.Update();
        }

        /// <summary>KÄDET ESINEISIIN (Linnanrakentaja 5.10., `kadet[]`): "tartu" vie käden efektorin kahvaan (sijoitettu paikka →
        /// UnityPiste), kun silmukka vastaa `milloin`-ehtoa; paino häivytetään 0,3 s:ssa. Vaihe 1: vain paikka (kämmenen kierto
        /// animaatiosta; kierto vaatii luun ja kämmenkehyksen kalibroinnin). "kanna" (esine luuhun) ei vielä käytössä.</summary>
        void Kadet(Esiintyma e)
        {
            var kadet = e.Hahmo.Kadet;
            if (kadet == null || kadet.Count == 0) return;
            float tavoiteR = 0f, tavoiteL = 0f;
            bool kiertoR = false, kiertoL = false;
            foreach (var k in kadet)
            {
                if (k.Tyyppi != "tartu") continue;
                bool voimassa = k.Milloin == "aina" || k.Milloin == e.Silmukka || (k.Milloin == "puhe" && e.EleNimi != null);
                if (!voimassa) continue;
                var eff = k.Kasi == "l" ? e.Ik.solver.leftHandEffector : e.Ik.solver.rightHandEffector;
                eff.position = DioraamaNayttamo.UnityPiste(k.Paikka);
                bool kierto = KadetKierto && k.Kierto != null && KammenKierto(e, k.Kasi, k.Kierto) is Quaternion q && SetRot(eff, q);
                if (k.Kasi == "l") { tavoiteL = (float)k.Paino; kiertoL = kierto; } else { tavoiteR = (float)k.Paino; kiertoR = kierto; }
            }
            float askel = Time.unscaledDeltaTime / 0.3f;
            e.KasiPainoR = Mathf.MoveTowards(e.KasiPainoR, tavoiteR, askel);
            e.KasiPainoL = Mathf.MoveTowards(e.KasiPainoL, tavoiteL, askel);
            e.Ik.solver.rightHandEffector.positionWeight = e.KasiPainoR;
            e.Ik.solver.leftHandEffector.positionWeight = e.KasiPainoL;
            e.Ik.solver.rightHandEffector.rotationWeight = kiertoR ? e.KasiPainoR : 0f;
            e.Ik.solver.leftHandEffector.rotationWeight = kiertoL ? e.KasiPainoL : 0f;
        }
        static bool SetRot(IKEffector eff, Quaternion q) { eff.rotation = q; return true; }

        /// <summary>Kämmenen kierto datasta ("poikki kadet kierto 0|1"; PT 9.10., juna 174: kädet kirjalle ja pulpetille).</summary>
        public static bool KadetKierto = true;

        /// <summary>
        /// KÄMMENEN KIERTO (`kadet[].kierto`, kämmenen kehys: kämmen −Y, sormet +Z, sijoitettuna kuten paikka): käden luun tavoitekierto
        /// = (datan kehys) · (luista laskettu nykyinen kehys)⁻¹ · luun nykyinen kierto, joten erillistä kalibrointia ei tarvita.
        /// Luista: sormet = middle_01 − hand, peukalon puoli = index_01 − pinky_01, kämmenen normaali = sormet × peukalon puoli
        /// (oikea) tai peukalon puoli × sormet (vasen) Unityn vasenkätisessä tilassa. Data peilataan z:ssä kuten UnityPiste.
        /// null = luita ei löydy (nivelhahmo tai eri luusto).
        /// </summary>
        static Quaternion? KammenKierto(Esiintyma e, string kasi, double[] kierto)
        {
            string p = kasi == "l" ? "_l" : "_r";
            Transform kasiLuu = null, keski = null, etu = null, pikku = null;
            foreach (var tr in e.SolmuT)
            {
                if (tr == null) continue;
                string n = tr.name;
                if (n == "hand" + p) kasiLuu = tr; else if (n == "middle_01" + p) keski = tr; else if (n == "index_01" + p) etu = tr; else if (n == "pinky_01" + p) pikku = tr;
            }
            if (kasiLuu == null || keski == null || etu == null || pikku == null) return null;
            Vector3 sormet = keski.position - kasiLuu.position, peukalo = etu.position - pikku.position;
            Vector3 normaali = kasi == "l" ? Vector3.Cross(peukalo, sormet) : Vector3.Cross(sormet, peukalo);
            if (sormet.sqrMagnitude < 1e-8f || normaali.sqrMagnitude < 1e-8f) return null;
            var nyt = Quaternion.LookRotation(sormet, -normaali);
            var r = new Quaternion((float)kierto[0], (float)kierto[1], (float)kierto[2], (float)kierto[3]);
            Vector3 Peili(Vector3 v) => new Vector3(v.x, v.y, -v.z);   // kanoninen → Unity (DioraamaNayttamo.UnityPiste)
            var tavoite = Quaternion.LookRotation(Peili(r * Vector3.forward), Peili(r * Vector3.up));   // kämmen −Y → kämmenselkä +Y
            return tavoite * Quaternion.Inverse(nyt) * kasiLuu.rotation;
        }

        /// <summary>A/B-mittari: 2 s välein kummankin nilkan korkeus lattiasta (säde IkKerrokseen) lokiin, IK päällä tai pois.
        /// Nilkka on ~8–10 cm pohjan yläpuolella; vertailu IK pois/päällä on se, mikä kertoo (porras: läpi tai ilmassa).</summary>
        void MittaaJalat(Esiintyma e)
        {
            if (Time.unscaledTime < e.JalkaMittausT) return;
            e.JalkaMittausT = Time.unscaledTime + 2f;
            Kolliderit(e.TilaId);
            string Korkeus(string nimi)
            {
                foreach (var tr in e.SolmuT)
                    if (tr != null && tr.name == nimi)
                        return Physics.Raycast(tr.position + Vector3.up * 0.25f, Vector3.down, out var osuma, 1.5f, 1 << IkKerros)
                            ? $"{(tr.position.y - osuma.point.y) * 100f:0}" : "–";
                return "?";
            }
            Debug.Log($"MATKAKIRJA linssit: ik jalat {e.HahmoId} ik={(IkPaalla ? 1 : 0)} vasen {Korkeus("foot_l")} cm oikea {Korkeus("foot_r")} cm");
            if (e.Hahmo.Kadet != null)
                foreach (var k in e.Hahmo.Kadet)
                {
                    if (k.Tyyppi != "tartu") continue;
                    string luu = k.Kasi == "l" ? "hand_l" : "hand_r";
                    foreach (var tr in e.SolmuT)
                        if (tr != null && tr.name == luu)
                        {
                            float d = Vector3.Distance(tr.position, DioraamaNayttamo.UnityPiste(k.Paikka)) * 100f;
                            Debug.Log($"MATKAKIRJA linssit: ik käsi {e.HahmoId} {k.Kasi} {k.Esine} ik={(IkPaalla ? 1 : 0)} silmukka {e.Silmukka} paino {(k.Kasi == "l" ? e.KasiPainoL : e.KasiPainoR):0.00} etäisyys {d:0} cm");
                            break;
                        }
                }
        }

        FullBodyBipedIK LuoIk(Esiintyma e)
        {
            Transform Luu(string nimi)
            {
                foreach (var t in e.SolmuT) if (t != null && t.name == nimi) return t;
                return null;
            }
            var r = new BipedReferences
            {
                root = e.Juuri.transform,
                pelvis = Luu("pelvis"),
                leftThigh = Luu("thigh_l"), leftCalf = Luu("calf_l"), leftFoot = Luu("foot_l"),
                rightThigh = Luu("thigh_r"), rightCalf = Luu("calf_r"), rightFoot = Luu("foot_r"),
                leftUpperArm = Luu("upperarm_l"), leftForearm = Luu("lowerarm_l"), leftHand = Luu("hand_l"),
                rightUpperArm = Luu("upperarm_r"), rightForearm = Luu("lowerarm_r"), rightHand = Luu("hand_r"),
                head = Luu("Head"),
                spine = new[] { Luu("spine_01"), Luu("spine_02"), Luu("spine_03") },
                eyes = new Transform[0],
            };
            if (!r.isFilled || Array.Exists(r.spine, s => s == null))
            {
                Debug.Log($"MATKAKIRJA linssit: ik {e.HahmoId}: luuranko ei ole kaksijalkainen (luita puuttuu), ei IK:ta");
                return null;
            }
            var ik = e.Juuri.AddComponent<FullBodyBipedIK>();
            ik.fixTransforms = false;
            ik.SetReferences(r, IKSolverFullBodyBiped.DetectRootNodeBone(r));
            ik.enabled = false; // OnDisable → InitiateSolver; päivitys käsin (Ik)
            if (!ik.solver.initiated) { Debug.Log($"MATKAKIRJA linssit: ik {e.HahmoId}: FBBIK ei käynnistynyt"); UnityEngine.Object.Destroy(ik); return null; }
            var g = e.Juuri.AddComponent<GrounderFBBIK>();
            g.ik = ik;
            g.solver.layers = 1 << IkKerros;
            g.solver.maxStep = 0.45f;
            g.solver.footRadius = 0.1f;
            g.solver.quality = Grounding.Quality.Simple;
            g.spineBend = 1f;
            Debug.Log($"MATKAKIRJA linssit: ik {e.HahmoId} ({e.TilaId}): FBBIK + Grounder valmis");
            return ik;
        }

        /// <summary>Kerran per huone: huoneen meshistä MeshCollider IkKerrokseen (mesh on luettava, DioraamaRakennus).</summary>
        static void Kolliderit(string tilaId)
        {
            var go = TilanMalli?.Invoke(tilaId);
            if (go == null || kolliderit.Contains(go)) return;
            kolliderit.RemoveWhere(g => g == null); // linnan sulkeminen tuhoaa huoneet
            kolliderit.Add(go);
            var mf = go.GetComponent<MeshFilter>();
            if (mf == null || mf.sharedMesh == null) return;
            var kg = new GameObject("IkLattia:" + tilaId) { layer = IkKerros };
            kg.transform.SetParent(go.transform, false);
            var c = kg.AddComponent<MeshCollider>();
            c.sharedMesh = mf.sharedMesh;
            Debug.Log($"MATKAKIRJA linssit: ik törmäysmalli {tilaId} ({mf.sharedMesh.vertexCount} kärkeä)");
        }
    }
}
