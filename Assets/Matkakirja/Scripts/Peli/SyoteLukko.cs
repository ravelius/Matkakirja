// Pallon kosketusten esto modaalisten näkymien ajaksi (Pelikoodari, erä 4).
// Useampi näkymä voi olla auki yhtä aikaa (kysymys + linssi + valikko), joten
// lukko pidetään omistajittain: pallo on estetty, kun yksikin omistaja pitää
// lukkoa. Kirjoittaa ISyoteEsto.SyoteEstetty-kytkimen (PalloKierto,
// Natiiviseppä). Sopimus: /Users/Shared/Claude/proto-3d/RAJAPINTA.md.
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class SyoteLukko
    {
        static readonly HashSet<object> omistajat = new HashSet<object>();
        static ISyoteEsto kohde;

        /// <summary>Onko pallon syöte estetty (joku pitää lukkoa).</summary>
        public static bool Estetty => omistajat.Count > 0;

        /// <summary>Lukon pitäjät (testikomentojen tilaraporttiin).</summary>
        public static int Omistajia => omistajat.Count;

        /// <summary>Estää pallon syötteen, kunnes sama omistaja kutsuu Vapauta. Toistuva kutsu ei kasvata lukkoa.</summary>
        public static void Esta(object omistaja)
        {
            if (omistaja == null) return;
            omistajat.Add(omistaja);
            Kirjoita();
        }

        public static void Vapauta(object omistaja)
        {
            if (omistaja == null) return;
            omistajat.Remove(omistaja);
            Kirjoita();
        }

        /// <summary>Asettaa tai poistaa lukon yhdellä kutsulla (näkymän Auki-tilan mukaan).</summary>
        public static void Aseta(object omistaja, bool esta)
        {
            if (esta) Esta(omistaja); else Vapauta(omistaja);
        }

        static void Kirjoita()
        {
            // Tuhottu omistaja (Unity-olio) ei saa jättää palloa lukkoon.
            omistajat.RemoveWhere(o => o is Object u && u == null);
            if (kohde == null || (kohde is Object k && k == null))
            {
                kohde = null;
                foreach (var mb in Object.FindObjectsByType<MonoBehaviour>(FindObjectsSortMode.None))
                    if (mb is ISyoteEsto e) { kohde = e; break; }
            }
            if (kohde != null && kohde.SyoteEstetty != Estetty) kohde.SyoteEstetty = Estetty;
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            omistajat.Clear();
            kohde = null;
        }
    }
}
