// VÄLIAIKAINEN: Livian piirtorigin rajapinta, kunnes natiivi-ui/livia (UI/Livia/)
// yhdistetään. Poistetaan samassa commitissa.
using System.Collections.Generic;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class LiviaTila
    {
        public string Ele = "blink";
        public float P;
        public float Puhe = -1f;
        public float Leiju;
        public float Hengitys;
        public bool Astronautti;
        public float Oikealle;
    }

    public static class LiviaEleet
    {
        static readonly Dictionary<string, float> kestot = new Dictionary<string, float> { ["blink"] = 1600, ["sleep"] = 5400 };
        public static IReadOnlyList<string> Kaikki => new List<string>(kestot.Keys);
        public static float KestoMs(string id) => kestot.TryGetValue(id ?? "", out var k) ? k : 2400;
        public static string Ryhma(string id) => null;
        public static string Nimi(string id) => id;
        public static bool Olemassa(string id) => true;
    }

    public sealed class LiviaKuva : VisualElement
    {
        public LiviaKuva(bool mini = false) { }
        public void Aseta(LiviaTila tila) { }
    }
}
