// Ihmisen matkan nostojen korttikentät ja tiedeliitteen sivut webin kokoaNostot-
// ja tiedeliitteenKuvat-tuloksia vasten (kultaiset/nostot.json, tee-nostot.mjs).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Testit
{
    public static class NostoKentatTestit
    {
        static string Polku(string n) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", n);
        static object Lue(string n) => Matkakirja.Peli.MiniJson.Jasenna(File.ReadAllText(Polku(n)));

        public static IhmisenMatkaAineisto Aineisto() =>
            IhmisenMatkaAineisto.Lue(Lue("paketti/ihmisen-matka-data.json"), Lue("paketti/ihmisen-matka-kertomus.json"));

        static string S(JsonElement e, string k) =>
            e.TryGetProperty(k, out var v) && v.ValueKind == JsonValueKind.String ? v.GetString() : null;

        [Testi] static void KorttikentatKutenWebissa()
        {
            var a = Aineisto();
            var web = JsonDocument.Parse(File.ReadAllText(Polku("nostot.json"))).RootElement.GetProperty("nostot");
            var kaikki = a.Paikat.Concat(a.Lisanostot).ToDictionary(p => p.Tunnus);
            int n = 0;
            foreach (var w in web.EnumerateArray())
            {
                var t = S(w, "tunnus");
                Oleta.Tosi(kaikki.TryGetValue(t, out var p), "nosto puuttuu: " + t);
                Oleta.Sama(S(w, "laji") == "lisanosto", p.Lisanosto, t);
                Oleta.Sama(S(w, "teksti"), p.KortinTeksti, t + " teksti");
                Oleta.Sama(S(w, "kuvaSelite"), p.KuvaSelite, t + " kuvaSelite");
                Oleta.Sama(S(w, "esineSelite"), p.EsineSelite, t + " esineSelite");
                Oleta.Sama(S(w, "kuvaAito"), p.AitoTieto?.Osoite, t + " kuvaAito");
                Oleta.Sama(S(w, "kuvaAitoSelite"), p.AitoSelite, t + " kuvaAitoSelite");
                Oleta.Sama(S(w, "tekija"), p.AidonTiedot != null && p.AidonTiedot.TryGetValue("tekija", out var tk) ? tk as string : null, t + " tekijä");
                Oleta.Sama(S(w, "lahde"), p.Lahde, t + " lähde");
                Oleta.Sama(w.GetProperty("juttu").GetBoolean(), p.Juttu, t + " juttu");
                Oleta.Sama(S(w, "lyhytAjoitus"), p.LyhytAjoitus, t + " lyhytAjoitus");
                if (!p.Lisanosto) Oleta.Sama(S(w, "kuva"), p.KuvaTieto?.Osoite, t + " kuva");
                n++;
            }
            Oleta.Sama(40, n, "20 löytöpaikkaa + 20 lisänostoa");
        }

        [Testi] static void TiedeliitteenSivutKutenWebissa()
        {
            var a = Aineisto();
            var l = new IhmisenMatkaLinssi(a, null, null, null);
            var web = JsonDocument.Parse(File.ReadAllText(Polku("nostot.json"))).RootElement.GetProperty("sivut");
            foreach (var w in web.EnumerateArray())
            {
                int i = w.GetProperty("i").GetInt32();
                var s = l.Tiedeliite(i);
                Oleta.Sama(w.GetProperty("sivu").GetBoolean(), s != null, "sivu " + i);
                if (s == null) continue;
                var kasvot = s.Kasvot.Concat(s.Aito != null ? new[] { s.Aito } : Array.Empty<Kuvatieto>()).Select(k => k.Osoite).ToList();
                Oleta.Sama(string.Join("|", w.GetProperty("kasvot").EnumerateArray().Select(x => x.GetString())), string.Join("|", kasvot), "kasvot " + i);
                Oleta.Sama(string.Join("|", w.GetProperty("ilmiot").EnumerateArray().Select(x => x.GetString())),
                    string.Join("|", s.Ilmiot.Select(k => k.Osoite)), "ilmiöt " + i);
                Oleta.Sama(S(w, "vara"), s.Kasvot.FirstOrDefault()?.Vara, "vara " + i);
                Oleta.Tosi(s.Juttu.Count > 0, "juttu " + i);
            }
            var sisallys = l.TiedeliitteenSisallys();
            Oleta.Sama(20, sisallys.Count);
            Oleta.Sama(a.Paikat[0].LyhytAjoitus, sisallys[0].Ajoitus);
            Oleta.Sama(0, l.TiedeliitteenSivu(a.Paikat[0].Tunnus));
            Oleta.Sama(-1, l.TiedeliitteenSivu(a.Lisanostot[0].Tunnus), "lisänostolla ei sivua");
        }
    }
}
