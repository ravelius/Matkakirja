// POTKURIT (Natiivi-UI 24.9.2026, Natiivisepän pyynnöstä): pyörittää lentokonemallin lapsiolioita,
// joiden nimi alkaa "Potkuri" (DC3.fbx: Potkuri_V ja Potkuri_O, origo navassa). Pyörimisakseli on
// potkurin paikallinen Z (Blenderin Y → Unityn +Z = koneen nokan suunta). Nopeus on tahallaan hidas
// (kuvataajuudella täysi kierrosluku näyttäisi stroboskoopilta paikallaan seisovalta).
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    public sealed class Potkurit : MonoBehaviour
    {
        [Tooltip("Asteita sekunnissa.")]
        public float nopeus = 900f;
        public Vector3 akseli = Vector3.forward;

        readonly List<Transform> potkurit = new List<Transform>();

        void Awake()
        {
            foreach (var t in GetComponentsInChildren<Transform>(true))
                if (t.name.StartsWith("Potkuri")) potkurit.Add(t);
        }

        void Update()
        {
            float a = nopeus * Time.deltaTime;
            for (int i = 0; i < potkurit.Count; i++)
                potkurit[i].Rotate(akseli, i % 2 == 0 ? a : -a, Space.Self);
        }
    }
}
