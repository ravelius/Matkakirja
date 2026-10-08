// LINNAN KOHTAUKSET v4 (Pelikoodari 8.10.: alkukatkon korjaus, puhe alkaa ≥ 120 ms ja ajat siirretty esivaran verran): vuorot ja sanat
// järjestyksessä äänitteen sisällä, ensimmäinen vuoro esivaran jälkeen, ja eleajoitus (Eleajoitus.Kohdistuksesta) jokaiselle vuorolle
// vuoron sisään. Data: kultaiset/linna-kohtaukset-v4/<huone>-vuorot.json ja -keskustelu.json (Pelikoodarin ajat-kansio).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class KohtauksetV4AjoitusTestit
    {
        static string Kansio => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "linna-kohtaukset-v4");
        static double D(object o) => o is double d ? d : 0;

        [Testi] static void VuorotJarjestyksessaJaEsivaranJalkeen()
        {
            var tiedostot = Directory.GetFiles(Kansio, "*-vuorot.json");
            Oleta.Tosi(tiedostot.Length >= 6, $"vuorotiedostoja {tiedostot.Length}");
            foreach (var f in tiedostot)
            {
                var o = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(File.ReadAllText(f)));
                double kesto = MiniJson.Luku(o, "kesto_s") ?? 0, edellinen = -1;
                var v = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "vuorot"));
                Oleta.Tosi(v.Count > 0 && kesto > 0, $"{Path.GetFileName(f)}: vuoroja {v.Count}, kesto {kesto}");
                for (int i = 0; i < v.Count; i++)
                {
                    var r = MiniJson.ObjektiTaiNull(v[i]);
                    double a = MiniJson.Luku(r, "alku_s") ?? -1, l = MiniJson.Luku(r, "loppu_s") ?? -1;
                    if (i == 0) Oleta.Tosi(a >= 0.03, $"{Path.GetFileName(f)}: ensimmäinen vuoro esivaran jälkeen ({a:F2} s)");
                    Oleta.Tosi(a < l && a >= edellinen - 1e-6 && l <= kesto + 0.05, $"{Path.GetFileName(f)} vuoro {i}: {a:F2}–{l:F2} (edellinen loppu {edellinen:F2}, kesto {kesto:F2})");
                    edellinen = l;
                }
            }
        }

        [Testi] static void SanatVuorojenSisallaJaEleetVuorossa()
        {
            int vuoroja = 0, tapahtumia = 0;
            foreach (var f in Directory.GetFiles(Kansio, "*-keskustelu.json"))
            {
                var o = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(File.ReadAllText(f)));
                double kesto = MiniJson.Luku(o, "kesto_s") ?? 0;
                foreach (var x in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "puhujat")))
                {
                    var p = MiniJson.ObjektiTaiNull(x);
                    double va = MiniJson.Luku(p, "alku_s") ?? 0, vl = MiniJson.Luku(p, "loppu_s") ?? 0;
                    var sanat = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(p, "sanat")).Select(MiniJson.ObjektiTaiNull).ToList();
                    if (sanat.Count == 0) continue;
                    vuoroja++;
                    double ed = va - 1e-6;
                    foreach (var s in sanat)
                    {
                        double a = MiniJson.Luku(s, "alku_s") ?? -1, l = MiniJson.Luku(s, "loppu_s") ?? -1;
                        Oleta.Tosi(a >= ed && a <= l && l <= vl + 0.25 && l <= kesto + 1e-6,   // Pelikoodari 8.10.: ajat rajattu mp3:n kestoon
                            $"{Path.GetFileName(f)}: sana {MiniJson.Teksti(s, "sana")} {a:F2}–{l:F2} (vuoro {va:F2}–{vl:F2})");
                        ed = a;
                    }
                    // Kohdistus merkeittäin vuoron alusta (sana kerrallaan, välilyönnit edellisen sanan loppuun) → eleajoitus vuoron sisään.
                    var merkit = new System.Text.StringBuilder(); var alut = new List<double>(); var loput = new List<double>();
                    foreach (var s in sanat)
                    {
                        string sana = MiniJson.Teksti(s, "sana") ?? ""; double a = (MiniJson.Luku(s, "alku_s") ?? va) - va, l = (MiniJson.Luku(s, "loppu_s") ?? va) - va;
                        if (merkit.Length > 0) { merkit.Append(' '); alut.Add(a); loput.Add(a); }
                        for (int i = 0; i < sana.Length; i++) { merkit.Append(sana[i]); alut.Add(a + (l - a) * i / Math.Max(1, sana.Length)); loput.Add(a + (l - a) * (i + 1) / Math.Max(1, sana.Length)); }
                    }
                    var t = Eleajoitus.Kohdistuksesta(new Kohdistus { Merkit = merkit.ToString(), Alut = alut.ToArray(), Loput = loput.ToArray() });
                    foreach (var e in t) Oleta.Tosi(e.T >= -1e-6 && e.T <= vl - va + 0.25, $"{Path.GetFileName(f)}: ele {e.T:F2} s vuoron ({vl - va:F2} s) ulkopuolella");
                    tapahtumia += t.Count;
                }
            }
            Oleta.Tosi(vuoroja >= 20 && tapahtumia >= vuoroja, $"vuoroja {vuoroja}, eletapahtumia {tapahtumia}");
            Console.WriteLine($"      kohtaukset v4: {vuoroja} vuoroa, {tapahtumia} eletapahtumaa");
        }
    }
}
