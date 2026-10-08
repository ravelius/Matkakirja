// HAHMOJEN SUUNTA (Siirtoseppä 8.10.2026; omistaja: laiturin hahmot kävelivät takaperin "kuin moonwalkissa"). Skin-hahmo katsoo Unityssa
// paikallista −z:aa, joten jokainen irrallinen hahmo tarvitsee 180°:n kierron (tai istuimen oman suunnan). Vahti: jokainen
// LisaaIrrallinen-kutsu Linssit/Unity-kansiossa antaa kierron tai on merkitty "kierto: istuimen mukaan".
using System;
using System.IO;
using System.Linq;

namespace Matkakirja.Linssit.Testit
{
    public static class HahmojenSuuntaTestit
    {
        [Testi] static void IrrallisetHahmotSaavatKierron()
        {
            string kansio = Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Unity");
            int kutsuja = 0;
            foreach (var f in Directory.GetFiles(kansio, "*.cs"))
            {
                var rivit = File.ReadAllLines(f);
                for (int i = 0; i < rivit.Length; i++)
                {
                    var r = rivit[i];
                    if (!r.Contains(".LisaaIrrallinen(") || r.TrimStart().StartsWith("//") || r.Contains("public void LisaaIrrallinen")) continue;
                    kutsuja++;
                    Oleta.Tosi(r.Contains("Quaternion") || r.Contains("kierto: istuimen mukaan"), $"{Path.GetFileName(f)}:{i + 1}: LisaaIrrallinen ilman kiertoa (hahmo kävelisi takaperin)");
                }
            }
            Oleta.Tosi(kutsuja >= 5, $"kutsuja {kutsuja}");
        }
    }
}
