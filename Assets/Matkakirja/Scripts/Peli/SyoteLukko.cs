// Pallon kosketusten hallinta näkymien puolesta (Pelikoodari, erä 4).
//
// 1) ESTO modaalisten näkymien ajaksi: useampi näkymä voi olla auki yhtä
//    aikaa (kysymys + linssi + valikko), joten lukko pidetään omistajittain:
//    pallo on estetty, kun yksikin omistaja pitää lukkoa
//    (PalloKierto.SyoteEstetty, Natiiviseppä).
// 2) PEITTO ei-modaalisille napeille ja paneeleille: kosketus, joka alkaa
//    rekisteröidyn peiton päältä, ei liikuta palloa koko eleen aikana
//    (PalloKierto.UiPeittaa on yksi Func, joten peitot kootaan tänne).
//
// Kukaan muu ei kirjoita PalloKierto.SyoteEstetty- tai UiPeittaa-kenttää.
// Sopimus: /Users/Shared/Claude/proto-3d/RAJAPINTA.md.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using Object = UnityEngine.Object;

namespace Matkakirja.Natiivi
{
    public static class SyoteLukko
    {
        static readonly HashSet<object> omistajat = new HashSet<object>();
        static readonly List<Func<Vector2, bool>> peitot = new List<Func<Vector2, bool>>();
        static PalloKierto kierto;

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

        /// <summary>
        /// Rekisteröi peiton: palauttaa true, jos näytön piste (pikseleinä, origo
        /// vasen alakulma) osuu näkymään. Kutsutaan kosketuksen alkaessa.
        /// </summary>
        public static void LisaaPeitto(Func<Vector2, bool> peittaa)
        {
            if (peittaa == null || peitot.Contains(peittaa)) return;
            peitot.Add(peittaa);
            Kirjoita();
        }

        public static void PoistaPeitto(Func<Vector2, bool> peittaa) => peitot.Remove(peittaa);

        /// <summary>Osuuko piste johonkin rekisteröityyn peittoon.</summary>
        public static bool Peittaa(Vector2 ruutu)
        {
            for (int i = 0; i < peitot.Count; i++)
            {
                try { if (peitot[i](ruutu)) return true; }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA syöte: peitto kaatui: " + e.Message); }
            }
            return false;
        }

        static void Kirjoita()
        {
            // Tuhottu omistaja (Unity-olio) ei saa jättää palloa lukkoon.
            omistajat.RemoveWhere(o => o is Object u && u == null);
            if (kierto == null) kierto = Object.FindAnyObjectByType<PalloKierto>();
            if (kierto == null) return;
            if (kierto.UiPeittaa == null) kierto.UiPeittaa = Peittaa;
            if (kierto.SyoteEstetty != Estetty) kierto.SyoteEstetty = Estetty;
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            omistajat.Clear();
            peitot.Clear();
            kierto = null;
        }
    }
}
