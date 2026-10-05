// KERTOJAN KLIPPI (DioraamaTimeline, linna-unity-suunnitelma-20261005.md kohta 2b, Siirtoseppä 5.10.2026): kertojan jakson
// puhe Timelinen Kertoja-raidalla. Klippi ei soita ääntä itse (ei AudioTrackia): alkaessaan se kutsuu DioraamaAanet-reittiä
// (TimelineJakso → KertojanJaksoVaihtuu → SoitaErillinen), joten "yksi puhe kerrallaan", väistö, puheLoppuu, latausodotus ja
// avainsanojen PuheenKohta pysyvät ennallaan. Loppuessaan (jakson loppu tai napautus) puhe katkeaa kuten Ytimen jakson
// vaihtuessa ennenkin. Vanhentuneen graafin kutsut (sukupolvi) ohitetaan: uudelleenrakennus täsmäyttää tilan itse.
using System;
using UnityEngine;
using UnityEngine.Playables;

namespace Matkakirja.Natiivi
{
    public sealed class KertojaKlippi : PlayableAsset
    {
        [NonSerialized] public int Jakso, Sukupolvi;
        [NonSerialized] public string Aani;
        [NonSerialized] public DioraamaTimeline Omistaja;

        public override Playable CreatePlayable(PlayableGraph graph, GameObject owner)
        {
            var p = ScriptPlayable<KertojaKaytos>.Create(graph);
            p.GetBehaviour().Klippi = this;
            return p;
        }
    }

    public sealed class KertojaKaytos : PlayableBehaviour
    {
        public KertojaKlippi Klippi;
        bool soi;

        bool Ajantasainen => Klippi != null && Klippi.Omistaja != null && Klippi.Omistaja.Sukupolvi == Klippi.Sukupolvi;

        public override void OnBehaviourPlay(Playable playable, FrameData info)
        {
            if (soi || !Ajantasainen) return;
            soi = true;
            var o = Klippi.Omistaja;
            double t = o.Alku + o.DirectorAika;
            Debug.Log($"MATKAKIRJA linssit: poikki: timeline kertoja jakso {Klippi.Jakso} ({Klippi.Aani ?? "ei ääntä"}) alkaa t={DioraamaTimeline.S(t)} " +
                      $"(kierros +{DioraamaTimeline.S(o.DirectorAika)} s{(playable.GetTime() > 0.05 ? ", klippi jatkuu kohdasta " + DioraamaTimeline.S(playable.GetTime()) : "")})");
            DioraamaAanet.TimelineJakso(Klippi.Jakso, t, "timeline");
        }

        public override void OnBehaviourPause(Playable playable, FrameData info)
        {
            if (!soi) return; // Timeline kutsuu taukoa myös klipeille, jotka eivät ole vielä alkaneet
            soi = false;
            if (!Ajantasainen) return;
            var o = Klippi.Omistaja;
            DioraamaAanet.TimelineJaksoLoppuu(Klippi.Jakso, o.Alku + o.DirectorAika);
        }

        public override void OnPlayableDestroy(Playable playable) => soi = false;
    }
}
