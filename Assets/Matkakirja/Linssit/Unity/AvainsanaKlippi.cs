// AVAINSANAKLIPPI (DioraamaTimeline, linna-unity-suunnitelma-20261005.md kohta 2b, Siirtoseppä 5.10.2026): kertoja.jaksot[].
// avainsanat[].t_s Timelinen Avainsanat-raidalla (alku = kertojan klipin alku + t_s, kesto DioraamaTaulu.AvainsanaS tai jakson
// loppuun). Näkymä on yhä DioraamaTaulu.PaivitaAvainsana (kertojan klipin PuheenKohta ≥ t_s), jottei toimiva avainsananäyttö
// muutu; raita on aikataulun dokumentti, Cinemachinen myöhempi kytkentäkohta ja mittari: alkaessaan klippi kirjaa lokiin
// puheen todellisen kohdan ja eron t_s:stä (hyväksyntä ±100 ms).
using System;
using UnityEngine;
using UnityEngine.Playables;

namespace Matkakirja.Natiivi
{
    public sealed class AvainsanaKlippi : PlayableAsset
    {
        [NonSerialized] public int Jakso, Indeksi, Sukupolvi;
        [NonSerialized] public double Ts;
        [NonSerialized] public string Aani, Sanat;
        [NonSerialized] public DioraamaTimeline Omistaja;

        public override Playable CreatePlayable(PlayableGraph graph, GameObject owner)
        {
            var p = ScriptPlayable<AvainsanaKaytos>.Create(graph);
            p.GetBehaviour().Klippi = this;
            return p;
        }
    }

    public sealed class AvainsanaKaytos : PlayableBehaviour
    {
        public AvainsanaKlippi Klippi;
        bool soi;

        public override void OnBehaviourPlay(Playable playable, FrameData info)
        {
            if (soi || Klippi?.Omistaja == null || Klippi.Omistaja.Sukupolvi != Klippi.Sukupolvi) return;
            soi = true;
            var o = Klippi.Omistaja;
            float? kohta = DioraamaAanet.PuheenKohta(Klippi.Aani);
            string ero = kohta is float k ? $"puheen kohta {DioraamaTimeline.S(k)} s, ero {(k - Klippi.Ts) * 1000:F0} ms" : "puhe ei soi";
            Debug.Log($"MATKAKIRJA linssit: poikki: timeline avainsana {Klippi.Jakso}.{Klippi.Indeksi} \"{Klippi.Sanat}\" t_s={DioraamaTimeline.S(Klippi.Ts)} " +
                      $"alkaa t={DioraamaTimeline.S(o.Alku + o.DirectorAika)} (kierros +{DioraamaTimeline.S(o.DirectorAika)} s), {ero}");
        }

        public override void OnBehaviourPause(Playable playable, FrameData info) => soi = false;
        public override void OnPlayableDestroy(Playable playable) => soi = false;
    }
}
