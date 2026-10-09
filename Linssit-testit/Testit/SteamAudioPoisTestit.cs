// STEAM AUDIO POIS = ÄÄNIPOLKU KUTEN ENNEN (PT 9.10.2026, juna 172; Natiiviseppä: AudioManagerin spatialisoija on projektissa
// "Steam Audio Spatializer", koska playerissa sitä ei voi vaihtaa ajon aikana). Spatialisoija koskee vain lähteisiin, joilla
// spatialize on päällä, joten kytkimen ollessa pois (oletus) mikään lähde ei saa käyttää sitä:
// (1) millään kohtausten tai prefabien AudioSourcella ei ole spatialize- tai spatializePostEffects-arvoa päällä (myös prefab-ohitukset),
// (2) koodissa spatialize = true vain Steam Audion sillassa (MatkakirjaSteamAudio.Liita), ja siltaa kutsutaan vain SteamAudioKokeesta
//     kytkimen ollessa päällä (oletus pois),
// (3) Steam Audio ei alustu itsestään (SteamAudioManagerin automaattinen alustus vain MATKAKIRJA_STEAMAUDIO_AUTOINIT-määritteellä,
//     jota ei ole asetettu missään), eikä ambisonics-dekooderia ole valittu.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Matkakirja.Linssit.Testit
{
    public static class SteamAudioPoisTestit
    {
        static string Juuri => Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", ".."));
        static string Assets => Path.Combine(Juuri, "Assets");
        static string Suhteellinen(string f) => Path.GetRelativePath(Juuri, f);

        [Testi] static void KohtauksissaJaPrefabeissaEiSpatializea()
        {
            var tiedostot = Directory.EnumerateFiles(Assets, "*.*", SearchOption.AllDirectories)
                .Where(f => f.EndsWith(".unity", StringComparison.Ordinal) || f.EndsWith(".prefab", StringComparison.Ordinal)).ToList();
            Oleta.Tosi(tiedostot.Count > 0, "kohtauksia ja prefabeja löytyi");
            var viat = new List<string>();
            int lahteita = 0;
            var ohitus = new Regex(@"propertyPath: (Spatialize|SpatializePostEffects)\s*\n\s*value: (\S+)");
            foreach (var f in tiedostot)
            {
                string t = File.ReadAllText(f);
                // AudioSource = luokka 82; kentät lohkon sisällä (lohko päättyy seuraavaan "--- !u!").
                foreach (var lohko in t.Split(new[] { "--- !u!" }, StringSplitOptions.None).Where(l => l.StartsWith("82 ", StringComparison.Ordinal)))
                {
                    lahteita++;
                    foreach (var kentta in new[] { "Spatialize", "SpatializePostEffects" })
                    {
                        var m = Regex.Match(lohko, @"\n\s*" + kentta + @": (\S+)");
                        if (m.Success && m.Groups[1].Value != "0") viat.Add($"{Suhteellinen(f)}: AudioSource {kentta}: {m.Groups[1].Value}");
                    }
                }
                foreach (Match m in ohitus.Matches(t))
                    if (m.Groups[2].Value != "0") viat.Add($"{Suhteellinen(f)}: prefab-ohitus {m.Groups[1].Value} = {m.Groups[2].Value}");
            }
            Console.WriteLine($"      {tiedostot.Count} kohtausta/prefabia, {lahteita} AudioSourcea, spatialize päällä: {viat.Count}");
            Oleta.Tosi(viat.Count == 0, "spatialize pois kaikissa kohtausten ja prefabien lähteissä: " + string.Join("; ", viat));
        }

        [Testi] static void KoodiKytkeeSpatializenVainKokeessa()
        {
            var koodi = Directory.EnumerateFiles(Assets, "*.cs", SearchOption.AllDirectories).ToList();
            var paalle = new Regex(@"\.(spatialize|spatializePostEffects)\s*=(?!=)\s*(?!false\b)\S");
            var viat = new List<string>();
            foreach (var f in koodi)
            {
                string nimi = Path.GetFileName(f);
                var rivit = File.ReadAllLines(f);
                for (int i = 0; i < rivit.Length; i++)
                {
                    string r = rivit[i].Trim();
                    if (r.StartsWith("//", StringComparison.Ordinal) || r.StartsWith("///", StringComparison.Ordinal)) continue;
                    if (paalle.IsMatch(r) && nimi != "MatkakirjaSteamAudio.cs") viat.Add($"{Suhteellinen(f)}:{i + 1}: {r}");
                    if (r.Contains("MatkakirjaSteamAudio.Liita(") && nimi != "SteamAudioKoe.cs") viat.Add($"{Suhteellinen(f)}:{i + 1}: silta muualta kuin kokeesta");
                    if (r.Contains("MatkakirjaSteamAudio.Kaynnista(") && nimi != "SteamAudioKoe.cs") viat.Add($"{Suhteellinen(f)}:{i + 1}: Steam Audion käynnistys muualta kuin kokeesta");
                }
            }
            Oleta.Tosi(viat.Count == 0, "spatialize päälle vain Steam Audion sillassa: " + string.Join("; ", viat));

            // Silta: spatialize = true vain Liita-metodissa.
            string silta = File.ReadAllText(koodi.Single(f => Path.GetFileName(f) == "MatkakirjaSteamAudio.cs"));
            int liita = silta.IndexOf("static bool Liita(", StringComparison.Ordinal), irrota = silta.IndexOf("static void Irrota(", StringComparison.Ordinal);
            Oleta.Tosi(liita > 0, "MatkakirjaSteamAudio.Liita löytyi");
            foreach (Match m in paalle.Matches(silta))
            {
                int seuraava = silta.IndexOf("static ", liita + 10, StringComparison.Ordinal);
                Oleta.Tosi(m.Index > liita && (seuraava < 0 || m.Index < seuraava), $"sillan spatialize = true vain Liita-metodissa (kohta {m.Index})");
            }
            Oleta.Tosi(irrota < 0 || silta.Contains("a.spatialize = false"), "Irrota palauttaa spatialize = false");

            // Koe: oletus pois, ja silta liitetään vain kun koe on käytössä.
            string koe = File.ReadAllText(koodi.Single(f => Path.GetFileName(f) == "SteamAudioKoe.cs"));
            Oleta.Tosi(koe.Contains("Kytkin(AsetusAvain, false)") && koe.Contains("Luku(AsetusAvain, 0.0) != 0.0"), "asetuksen oletus pois");
            Oleta.Tosi(Regex.IsMatch(koe, @"static bool kaytossa\s*;"), "kaytossa alkaa false");
            foreach (Match m in Regex.Matches(koe, @"MatkakirjaSteamAudio\.Liita\("))
            {
                string ennen = koe.Substring(Math.Max(0, m.Index - 400), Math.Min(400, m.Index));
                Oleta.Tosi(ennen.Contains("if (kaytossa)") || ennen.Contains("kaytossa = true;"), "Liita vain kokeen ollessa käytössä");
            }
        }

        [Testi] static void SteamAudioEiAlustuItsestaan()
        {
            string mgr = File.ReadAllText(Path.Combine(Assets, "Plugins/SteamAudio/Scripts/Runtime/SteamAudioManager.cs"));
            var m = Regex.Match(mgr, @"\[RuntimeInitializeOnLoadMethod[^\]]*\]\s*\n\s*#endif\s*\n\s*static void AutoInitialize");
            Oleta.Tosi(m.Success && mgr.Substring(Math.Max(0, m.Index - 120), Math.Min(120, m.Index)).Contains("#if MATKAKIRJA_STEAMAUDIO_AUTOINIT"),
                "SteamAudioManagerin automaattinen alustus vain MATKAKIRJA_STEAMAUDIO_AUTOINIT-määritteellä");
            Oleta.Tosi(Regex.Matches(mgr, @"RuntimeInitializeOnLoadMethod").Count == 1, "SteamAudioManagerissa ei muita automaattisia alustuksia");
            // Määritettä ei aseteta missään (PlayerSettings, asmdef, csc.rsp).
            var asetukset = new List<string> { Path.Combine(Juuri, "ProjectSettings/ProjectSettings.asset") };
            asetukset.AddRange(Directory.EnumerateFiles(Assets, "*.asmdef", SearchOption.AllDirectories));
            asetukset.AddRange(Directory.EnumerateFiles(Assets, "*.rsp", SearchOption.AllDirectories));
            foreach (var f in asetukset.Where(File.Exists))
                Oleta.Tosi(!File.ReadAllText(f).Contains("MATKAKIRJA_STEAMAUDIO_AUTOINIT"), $"{Suhteellinen(f)}: ei MATKAKIRJA_STEAMAUDIO_AUTOINIT-määritettä");
            string am = File.ReadAllText(Path.Combine(Juuri, "ProjectSettings/AudioManager.asset"));
            var dek = Regex.Match(am, @"m_AmbisonicDecoderPlugin:[ \t]*(\S*)");
            Oleta.Tosi(dek.Success && dek.Groups[1].Value == "", "ambisonics-dekooderia ei ole valittu");
            var sp = Regex.Match(am, @"m_SpatializerPlugin:[ \t]*([^\n]*)");
            Oleta.Tosi(sp.Success && (sp.Groups[1].Value.Trim() == "" || sp.Groups[1].Value.Trim() == "Steam Audio Spatializer"),
                $"spatialisoija tyhjä tai Steam Audio ('{sp.Groups[1].Value.Trim()}')");
        }

        // (4) Simulaattorikäännös ilman Steam Audiota (juna 173: iOS-kirjastot ovat vain laitteen arm64:ää): Rakennus.IosSimulaattori
        //     asettaa MATKAKIRJA_EI_STEAMAUDIO, molemmat Steam Audion asmdefit jäävät pois sillä, ja SteamAudioKoe.cs:llä on tynkä.
        [Testi] static void SimulaattoriIlmanSteamAudiota()
        {
            foreach (var a in new[] { "Plugins/SteamAudio/SteamAudioUnity.asmdef", "Plugins/SteamAudio/Scripts/Editor/SteamAudioUnityEditor.asmdef" })
                Oleta.Tosi(File.ReadAllText(Path.Combine(Assets, a)).Contains("\"!MATKAKIRJA_EI_STEAMAUDIO\""), $"{a}: defineConstraints !MATKAKIRJA_EI_STEAMAUDIO");
            string koe = File.ReadAllText(Directory.EnumerateFiles(Assets, "SteamAudioKoe.cs", SearchOption.AllDirectories).Single());
            Oleta.Tosi(koe.Contains("#if !MATKAKIRJA_EI_STEAMAUDIO") && koe.Contains("#else"), "SteamAudioKoe.cs: tynkä MATKAKIRJA_EI_STEAMAUDIO-määritteellä");
            int tynka = koe.IndexOf("#else", StringComparison.Ordinal);
            foreach (var api in new[] { "AsetusAvain", "Pakko", "Asetus", "Paalla", "Rekisteroi(", "Paivita(", "Komento(", "Tila(" })
                Oleta.Tosi(koe.IndexOf(api, tynka, StringComparison.Ordinal) > 0, $"tyngässä {api}");
            string rakennus = File.ReadAllText(Path.Combine(Assets, "Matkakirja/Editor/Rakennus.cs"));
            int sim = rakennus.IndexOf("public static void IosSimulaattori()", StringComparison.Ordinal);
            Oleta.Tosi(sim > 0 && rakennus.IndexOf("EiSteamAudio", sim, StringComparison.Ordinal) > sim
                       && rakennus.IndexOf("SteamAudioIos(false)", sim, StringComparison.Ordinal) > sim, "IosSimulaattori kytkee Steam Audion pois");
        }
    }
}
