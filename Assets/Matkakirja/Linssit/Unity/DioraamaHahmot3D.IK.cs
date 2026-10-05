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
            e.Ik.solver.Update();
            MittaaJalat(e);
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
