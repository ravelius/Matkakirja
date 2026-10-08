// VARJOSTINTEN KÄÄNNÖSTARKISTUS (Linssiseppä 2, 8.10.2026; PT: "kuittaus, kun varjostinkäännös on vihreä"): Unity -batchmode -nographics
// -executeMethod Matkakirja.Editori.VarjostinTarkistus.Aja → jokainen Linssit/Resources/Varjostimet-varjostin tuodaan uudelleen ja sen
// käännösviestit luetaan (ShaderUtil.GetShaderMessages, editorin alusta + iOS Metal -esikäännös ShaderUtil.CompileShaderVariants:lla, kun
// saatavilla). Virheet tulokset/varjostimet.txt, exit 0 = ei virheitä. Valinnainen ympäristömuuttuja VARJOSTIMET=nimi1,nimi2 rajaa.
using System;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEngine;

namespace Matkakirja.Editori
{
    public static class VarjostinTarkistus
    {
        public static void Aja()
        {
            var loki = new StringBuilder(); int virheita = 0, tarkistettu = 0;
            try
            {
                var rajaus = Environment.GetEnvironmentVariable("VARJOSTIMET")?.Split(',').Select(x => x.Trim()).Where(x => x.Length > 0).ToArray();
                foreach (var polku in Directory.GetFiles("Assets/Matkakirja/Linssit/Resources/Varjostimet", "*.shader"))
                {
                    string nimi = Path.GetFileNameWithoutExtension(polku);
                    if (rajaus != null && rajaus.Length > 0 && !rajaus.Contains(nimi)) continue;
                    AssetDatabase.ImportAsset(polku, ImportAssetOptions.ForceUpdate | ImportAssetOptions.ForceSynchronousImport);
                    var sh = AssetDatabase.LoadAssetAtPath<Shader>(polku);
                    tarkistettu++;
                    if (sh == null) { loki.AppendLine($"{nimi}: EI LATAUDU"); virheita++; continue; }
                    var viestit = ShaderUtil.GetShaderMessages(sh);
                    int v = viestit.Count(m => m.severity == UnityEditor.Rendering.ShaderCompilerMessageSeverity.Error);
                    virheita += v;
                    loki.AppendLine($"{nimi}: {(v == 0 ? "OK" : v + " virhettä")} ({sh.name}, {viestit.Length} viestiä)");
                    foreach (var m in viestit) loki.AppendLine($"  {m.severity} {m.platform} r. {m.line}: {m.message}");
                }
            }
            catch (Exception e) { loki.AppendLine("kaatui: " + e); virheita++; }
            loki.AppendLine($"VARJOSTIMET: {tarkistettu} tarkistettu, virheitä {virheita}");
            try { Directory.CreateDirectory("tulokset"); File.WriteAllText("tulokset/varjostimet.txt", loki.ToString()); } catch { }
            Debug.Log("VARJOSTINTARKISTUS\n" + loki);
            EditorApplication.Exit(virheita == 0 ? 0 : 1);
        }
    }
}
