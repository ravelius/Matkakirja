// KAMERA-RAIDAN JAKSOKLIPPI (DioraamaTimeline, linna-unity-suunnitelma-20261005.md kohta 2b, Siirtoseppä 5.10.2026): ennen
// Cinemachinea raita kertoo vain kertojan jakson indeksin (lennon alusta jakson loppuun; −1 = paluulento yleisnäkymään).
// Kameran asennon laskevat yhä Ydin (PoikkileikkausLinssi.NakymaHetkella) ja DioraamaKameraJousi. DioraamaTimeline.Tarkista
// vertaa indeksiä Ytimen KertojaJaksoon. Cinemachinen tultua raita vaihtuu CinemachineTrackiin (Shot per jakso).
using System;
using UnityEngine;
using UnityEngine.Playables;

namespace Matkakirja.Natiivi
{
    public sealed class JaksoKlippi : PlayableAsset
    {
        [NonSerialized] public int Jakso, Sukupolvi;
        [NonSerialized] public DioraamaTimeline Omistaja;

        public override Playable CreatePlayable(PlayableGraph graph, GameObject owner)
        {
            var p = ScriptPlayable<JaksoKaytos>.Create(graph);
            p.GetBehaviour().Klippi = this;
            return p;
        }
    }

    public sealed class JaksoKaytos : PlayableBehaviour
    {
        public JaksoKlippi Klippi;
        bool soi;

        bool Ajantasainen => Klippi != null && Klippi.Omistaja != null && Klippi.Omistaja.Sukupolvi == Klippi.Sukupolvi;

        public override void OnBehaviourPlay(Playable playable, FrameData info)
        {
            if (soi || !Ajantasainen) return;
            soi = true;
            var o = Klippi.Omistaja;
            o.KameraJakso = Klippi.Jakso;
            string mika = Klippi.Jakso >= 0 ? "jakso " + Klippi.Jakso : "paluu yleisnäkymään";
            Debug.Log($"MATKAKIRJA linssit: poikki: timeline {mika} alkaa t={DioraamaTimeline.S(o.Alku + o.DirectorAika)} " +
                      $"(kierros +{DioraamaTimeline.S(o.DirectorAika)} s{(playable.GetTime() > 0.05 ? ", jatkuu uudelleenrakennuksen jälkeen kohdasta " + DioraamaTimeline.S(playable.GetTime()) : "")})");
        }

        public override void OnBehaviourPause(Playable playable, FrameData info)
        {
            if (!soi) return;
            soi = false;
            if (Ajantasainen && Klippi.Omistaja.KameraJakso == Klippi.Jakso) Klippi.Omistaja.KameraJakso = -2;
        }

        public override void OnPlayableDestroy(Playable playable) => soi = false;
    }
}
