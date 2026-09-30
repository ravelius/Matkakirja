// DIORAAMAN LAATUTASO PIIRIN MUKAAN (omistaja 30.9.2026, Päätoimittajan välittämänä): "älä pudota laatua yhtään. vasta jos
// puhelin on iphone 15 pro tai heikompi niin sitten pudota." Täysi laatu = ulkokuoren huipputaso, 4k-valoatlakset ja
// täydet pintatekstuurit. Kevennys (ennen 30.9. kaikille iPhoneille) vain A17 Pro -tasolla tai heikommalla.
//
//   iPhone   mallitunnus iPhoneNN,x: NN ≥ 17 (iPhone 16 -sarja, A18, ja uudemmat) → täysi; muuten kevennys
//   iPad     M-sarja (≥ 7000 Mt) → täysi; iPad mini A17 Pro (iPad16,1/16,2) ja muistiltaan pienemmät → kevennys
//   muu      Mac ("Mac…"), editori ja tuntematon: muistin mukaan (≥ 7000 Mt → täysi)
// Simulaattori ilmoittaa simuloidun laitteen tunnuksen (esim. iPhone18,1), joten sääntö on testattavissa.
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class DioraamaLaatu
    {
        static bool? taysi;

        /// <summary>Täysi laatu tälle laitteelle (välimuistissa; "poikki kuori" -pakotus ohittaa kuoren tason erikseen).</summary>
        public static bool Taysi => taysi ??= OnkoTaysi(SystemInfo.deviceModel, SystemInfo.systemMemorySize);

        public static bool OnkoTaysi(string malli, int muistiMt)
        {
            malli ??= "";
            if (malli.StartsWith("iPhone") && Paaversio(malli, "iPhone") is int p) return p >= 17;
            if (malli.StartsWith("iPad"))
            {
                if (malli == "iPad16,1" || malli == "iPad16,2") return false; // iPad mini (A17 Pro)
                return muistiMt >= 7000;
            }
            return muistiMt >= 7000;
        }

        static int? Paaversio(string malli, string etuliite)
        {
            int pilkku = malli.IndexOf(',');
            if (pilkku <= etuliite.Length) return null;
            return int.TryParse(malli.Substring(etuliite.Length, pilkku - etuliite.Length), out var n) ? n : (int?)null;
        }

        public static string Kuvaus => $"laatu {(Taysi ? "täysi" : "kevennetty")} ({SystemInfo.deviceModel}, {SystemInfo.systemMemorySize} Mt)";
    }
}
