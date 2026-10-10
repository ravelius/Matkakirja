// ÄÄNIMUISTIVAHTI (Pelikoodari 10.10.2026, PT:n muistikatselmus, juna 174): UnityWebRequestMultimedia.GetAudioClip purkaa
// oletuksena koko äänen PCM:ksi muistiin (compressed = false). Juna 174:ssä löytyi näin 45 Mt (Pariisi), 102 Mt (Olavinlinna):
// pidennetyt lokit ja kyyhkyt olisivat lisänneet vielä 35 Mt. Vahti: jokaisen GetAudioClip-kutsun on asetettava muoto itse
// (compressed = …, tai streamAudio = true) kuuden seuraavan rivin sisällä, tai kutsukohta on alla olevassa listassa perusteluineen
// (lyhyet äänet, PCM:ää tarvitsevat siivut ja puhe, joka vapautetaan). Uusi purkava lataus ilman perustelua → testi kaatuu.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Matkakirja.Linssit.Testit
{
    public static class AanimuistivahtiTestit
    {
        // tiedosto (Assets/Matkakirja:n alla) + metodi → miksi oletus (PCM) on hyväksytty.
        static readonly Dictionary<string, string> Perustellut = new Dictionary<string, string>(StringComparer.Ordinal)
        {
            ["UI/Aanet.cs Lataa"] = "UI-tehosteet ja lentomoottori: lento leikataan PCM-siivuksi (GetData), muut < 3 s",
            ["Linssit/Unity/OhjaamonAanet.cs Hae"] = "ISS-ohjaamon kaksi lyhyttä WAVia (< 1 s)",
            ["Linssit/Unity/OpasSovitin.cs SoitaJaOdota"] = "oppaan puhe: yksi klippi kerrallaan, vapautetaan soiton jälkeen",
            ["Linssit/Unity/OpasSovitin.cs SoitaUrl"] = "oppaan puhe (Pulu-vastaus, ~2 s)",
            ["Linssit/Unity/OpasSovitin.cs SoitaNimi"] = "nimileikkeet (< 2 s)",
            ["Linssit/Unity/OpasSovitin.cs EsilataaHistoria"] = "yksi historiaosio kerrallaan (historiaKlippi korvataan)",
            ["Linssit/Unity/OpasSovitin.cs LataaAani"] = "kertoja: VapautaVanhatAanet pitää vain nykyisen, seuraavan ja jatkon",
            ["Scripts/Peli/Puhe.cs LataaJaSoitaTiedosto"] = "puhekanava: yksi klippi kerrallaan",
            ["Linssit/Unity/DioraamaSovitin.cs EsineetPaalle"] = "Olavinlinnan pikari 1,6 s ja ovi 3 s (mono)",
            ["Linssit/Unity/DioraamaSovitin.cs KappeliPaalle"] = "kappelin keskustelu 29 s mono (PCM 2,5 Mt), soitetaan heti",
            ["Linssit/Unity/DioraamaSovitin.cs VartijatPaalle"] = "rakennuksen askeleet (lyhyet, rytminen liitos)",
        };

        static string Juuri() => Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja"));

        static IEnumerable<(string avain, int rivi)> Purkavat()
        {
            var juuri = Juuri();
            var metodi = new Regex(@"(IEnumerator|void|AudioClip|static\s+\w+)\s+([A-Za-z0-9_]+)\s*\(");
            foreach (var f in Directory.EnumerateFiles(juuri, "*.cs", SearchOption.AllDirectories))
            {
                var r = File.ReadAllLines(f); string nyt = "?";
                var suht = Path.GetRelativePath(juuri, f).Replace('\\', '/');
                for (int i = 0; i < r.Length; i++)
                {
                    var m = metodi.Match(r[i]); if (m.Success && !r[i].TrimStart().StartsWith("//")) nyt = m.Groups[2].Value;
                    if (!r[i].Contains("UnityWebRequestMultimedia.GetAudioClip(") || r[i].TrimStart().StartsWith("//")) continue;
                    var ikkuna = string.Join("\n", r.Skip(i).Take(7));
                    bool maaritelty = Regex.IsMatch(ikkuna, @"\bcompressed\s*=") || Regex.IsMatch(ikkuna, @"\bstreamAudio\s*=\s*(true|[A-Za-z_.!]+\.\w+|k\.)");
                    if (!maaritelty) yield return ($"{suht} {nyt}", i + 1);
                }
            }
        }

        [Testi] static void JokainenPurkavaLatausOnPerusteltu()
        {
            var puuttuvat = Purkavat().Where(p => !Perustellut.ContainsKey(p.avain)).Select(p => $"{p.avain} (rivi {p.rivi})").Distinct().ToList();
            Oleta.Tosi(puuttuvat.Count == 0, "GetAudioClip purkaa PCM:ksi ilman perustelua (aseta compressed tai lisää Perustellut-listaan): " + string.Join("; ", puuttuvat));
        }

        [Testi] static void PerustelutOvatAjantasalla()
        {
            var nyt = new HashSet<string>(Purkavat().Select(p => p.avain));
            var turhat = Perustellut.Keys.Where(k => !nyt.Contains(k)).ToList();
            Oleta.Tosi(turhat.Count == 0, "perustelu kutsukohdalle, joka ei enää pura (poista listasta): " + string.Join("; ", turhat));
        }
    }
}
