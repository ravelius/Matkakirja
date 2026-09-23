// Paketin päätason kentät (skeema 1.19, Peli/Paataso.cs): kysymykset ja pulmat luetaan samoin,
// oli kenttä päätasolla, raa'assa datassa vai molemmissa.
using System;
using System.IO;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli.Testit
{
    static class PaatasoTestit
    {
        static string J(object o) { var sb = new StringBuilder(); Json.Kirjoita(sb, o); return sb.ToString(); }

        /// <summary>Kultaisen paketin kokoelma 1.19-muotoon: kentät päätasolle, data pois tai jätetään.</summary>
        static string Paatasolle(string json, System.Collections.Generic.IReadOnlyList<(string Uusi, string Vanha)> kentat, bool dataPois)
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna(json));
            var sb = new StringBuilder("{\"nimi\":").Append(J(MiniJson.Teksti(o, "nimi"))).Append(",\"alkiot\":[");
            bool eka = true;
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(o, "alkiot")).Select(MiniJson.Objekti))
            {
                var d = MiniJson.Objekti(a["data"]);
                var uusi = new System.Collections.Generic.Dictionary<string, object>(a);
                if (dataPois)
                {
                    uusi.Remove("data");
                    // Pulman tunnisteet ja generaattori ovat vain datassa (Siirtosepän skeema 1.19).
                    foreach (var k in new[] { "generaattori", "generate", "kuvat" }) if (d.ContainsKey(k)) uusi[k] = d[k];
                }
                foreach (var (u, v) in kentat) if (d.TryGetValue(v, out var arvo)) uusi[u] = arvo;
                if (!eka) sb.Append(',');
                eka = false;
                sb.Append(J(uusi));
            }
            return sb.Append("]}").ToString();
        }

        static string Kuvaus(Kysymys k) =>
            $"{k.Q}|{k.Vihje}|{k.Fakta}|{k.Paikka}|{string.Join(";", k.Lahteet)}|{k.Taso}|{k.Oikea}|{k.VaiteTotta}|{(k.Vaihtoehdot == null ? "-" : string.Join(";", k.Vaihtoehdot))}";

        static string Kaikki(Kysymysdata d) => string.Join("\n",
            d.Kaupungeittain.OrderBy(x => x.Key, StringComparer.Ordinal).SelectMany(x => x.Value.Select(Kuvaus))
                .Concat(d.Yleiset.Select(Kuvaus)).Concat(d.Vaitteet.Select(Kuvaus)));

        [Testi] static void KysymyksetPaatasoltaSamoinKuinDatasta()
        {
            var raaka = File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "kysymykset.json"));
            var vanha = new Kysymysdata(); vanha.LueKysymykset(raaka);
            var molemmat = new Kysymysdata(); molemmat.LueKysymykset(Paatasolle(raaka, Paataso.Kysymys, false));
            var uusi = new Kysymysdata(); uusi.LueKysymykset(Paatasolle(raaka, Paataso.Kysymys, true));
            Oleta.Tosi(vanha.Vaitteet.Count > 0 && vanha.Yleiset.Count > 0, "kultaisessa paketissa on väitteitä ja yleisiä");
            Oleta.Sama(Kaikki(vanha), Kaikki(molemmat), "päätaso + data");
            Oleta.Sama(Kaikki(vanha), Kaikki(uusi), "pelkkä päätaso");
        }

        [Testi] static void PulmatPaatasoltaSamoinKuinDatasta()
        {
            var raaka = File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "pulmat.json"));
            string Kuvaa(Pulmadata d) => string.Join("\n", d.Pulmat.Select(p =>
                $"{p.Id}|{p.Kaupunki}|{p.Otsikko}|{p.Selite}|{p.Kysymys}|{p.Fakta}|{p.Vihje}|{p.KuvaLahteet}|{p.Generaattori}|{string.Join(";", p.Lahteet)}|{p.Oikea}|{(p.Vaihtoehdot == null ? "-" : string.Join(";", p.Vaihtoehdot))}|{(p.Luonnos == null ? "-" : J(p.Luonnos))}"));
            var vanha = Pulmadata.Lue(raaka);
            Oleta.Tosi(vanha.Pulmat.Count == 11, "11 pulmaa");
            Oleta.Sama(Kuvaa(vanha), Kuvaa(Pulmadata.Lue(Paatasolle(raaka, Paataso.Pulma, false))), "päätaso + data");
            Oleta.Sama(Kuvaa(vanha), Kuvaa(Pulmadata.Lue(Paatasolle(raaka, Paataso.Pulma, true))), "pelkkä päätaso");
        }
    }
}
