// ELEET PUHEEN TAHDISSA (Siirtoseppä 7.10.2026): painotukset ja lauseen loput kohdistuksesta ja puheen voimakkuudesta.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class EleajoitusTestit
    {
        static Kohdistus K(string merkit, double vali = 0.08)
        {
            var k = new Kohdistus { Merkit = merkit, Alut = new double[merkit.Length], Loput = new double[merkit.Length] };
            for (int i = 0; i < merkit.Length; i++) { k.Alut[i] = i * vali; k.Loput[i] = (i + 1) * vali; }
            return k;
        }

        [Testi] static void LauseenAlkuJaLoppu()
        {
            //          0         1         2         3         4         5
            var k = K("Herra vouti, kuulkaa minua. Missä on kirkkoherra? Täällä.");
            var t = Eleajoitus.Kohdistuksesta(k);
            var p = t.Where(x => x.Laji == Eleajoitus.Laji.Painotus).ToList();
            var l = t.Where(x => x.Laji == Eleajoitus.Laji.LauseLoppu).ToList();
            Oleta.Tosi(p.Count >= 2 && Math.Abs(p[0].T - 0) < 1e-9, $"ensimmäinen painotus puheen alussa ({string.Join(", ", p)})");
            Oleta.Tosi(l.Count == 3, $"kolme lauseen loppua ({string.Join(", ", l)})");
            Oleta.Tosi(l[1].Kysymys && !l[0].Kysymys && !l[2].Kysymys, "toinen lause on kysymys");
            int missa = k.Merkit.IndexOf("Missä");
            Oleta.Tosi(p.Any(x => Math.Abs(x.T - k.Alut[missa]) < 1e-9 && x.Kysymys), "kysymyslauseen alku merkitty kysymykseksi");
            Oleta.Tosi(Math.Abs(l[0].T - k.Loput[k.Merkit.IndexOf('.') - 1]) < 1e-9, "loppu = viimeisen kirjaimen loppu");
        }

        [Testi] static void PainotuksetHarvennetaan()
        {
            // Lyhyitä lausekkeita tiheästi: painotusten väli ≥ MinValiS.
            var k = K("Ei, ei, ei, kyllä, ehkä, no, joo, ei, kyllä, ehkä, no, joo, ei, kyllä, ehkä.", 0.1);
            var p = Eleajoitus.Kohdistuksesta(k).Where(x => x.Laji == Eleajoitus.Laji.Painotus).ToList();
            for (int i = 1; i < p.Count; i++) Oleta.Tosi(p[i].T - p[i - 1].T >= Eleajoitus.MinValiS - 1e-9, $"väli {p[i].T - p[i - 1].T:F2} s");
            Oleta.Tosi(p.Count >= 2, $"painotuksia {p.Count}");
        }

        [Testi] static void PitkaSanaPainottuu()
        {
            // Yksi lause, pitkä sana yli 2,2 s alusta → toinen painotus pitkän sanan alussa.
            var k = K("ja sitten me menimme sinne ylös linnanpihalle asti", 0.1);
            var p = Eleajoitus.Kohdistuksesta(k).Where(x => x.Laji == Eleajoitus.Laji.Painotus).ToList();
            int pitka = k.Merkit.IndexOf("linnanpihalle");
            Oleta.Tosi(p.Count == 2 && Math.Abs(p[1].T - k.Alut[pitka]) < 1e-9, $"painotukset {string.Join(", ", p)}");
        }

        [Testi] static void ValillaRajat()
        {
            var t = new List<Eleajoitus.Tapahtuma> { new Eleajoitus.Tapahtuma(1, Eleajoitus.Laji.Painotus, false), new Eleajoitus.Tapahtuma(2, Eleajoitus.Laji.LauseLoppu, false) };
            var u = new List<Eleajoitus.Tapahtuma>();
            Eleajoitus.Valilla(t, 1, 2, u); Oleta.Tosi(u.Count == 1 && u[0].T == 2, "(a, b]: alaraja pois, yläraja mukaan");
            Eleajoitus.Valilla(t, 0, 3, u); Oleta.Tosi(u.Count == 2, "molemmat");
            Eleajoitus.Kohdistuksesta(null); Oleta.Tosi(Eleajoitus.Kohdistuksesta(new Kohdistus()).Count == 0, "tyhjä kohdistus");
        }

        [Testi] static void TasoAjoitusFraasit()
        {
            var a = new TasoAjoitus();
            var tap = new List<Eleajoitus.Tapahtuma>();
            // 0–2 s puhetta, 2–3 s tauko, 3–4,5 s puhetta, 4,5–6 s tauko, 6–6,5 s puhetta (alle PuheS → ei loppua); 3,1 s:n lyhyt
            // nousu ilman taukoa ei ole uusi fraasi.
            for (double t = 0; t < 8; t += 1 / 60.0)
            {
                float taso = t < 2 ? 0.6f : t < 3 ? 0.01f : t < 3.1 ? 0.5f : t < 3.2 ? 0.05f : t < 4.5 ? 0.5f : t < 6 ? 0.0f : t < 6.5 ? 0.5f : 0f;
                var x = a.Syota(t, taso); if (x.HasValue) tap.Add(x.Value);
            }
            var p = tap.Where(x => x.Laji == Eleajoitus.Laji.Painotus).Select(x => x.T).ToList();
            var l = tap.Where(x => x.Laji == Eleajoitus.Laji.LauseLoppu).Select(x => x.T).ToList();
            Oleta.Tosi(p.Count == 3 && p[0] < 0.02 && Math.Abs(p[1] - 3) < 0.05 && Math.Abs(p[2] - 6) < 0.05, $"painotukset 0, 3 ja 6 s ({string.Join(", ", p.Select(v => v.ToString("F2")))})");
            Oleta.Tosi(l.Count == 2 && Math.Abs(l[0] - 2) < 0.05 && Math.Abs(l[1] - 4.5) < 0.05, $"loput 2 s ja 4,5 s ({string.Join(", ", l.Select(v => v.ToString("F2")))})");
        }
    }
}
