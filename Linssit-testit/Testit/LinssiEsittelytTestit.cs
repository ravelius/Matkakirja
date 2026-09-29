// Linssien esittelyt pillerivalikon Linssit-näkymään (webin LINSSI.esittely #3611, kultaiset/linssi-esittelyt.json,
// tee-linssi-esittelyt.mjs): taulu vastaa webiä sanasta sanaan, katto 160 merkkiä, ja moduulin JSON voittaa taulun.
using System;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace Matkakirja.Linssit.Testit
{
    public static class LinssiEsittelytTestit
    {
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(
            Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "linssi-esittelyt.json"))).RootElement.GetProperty("linssit");

        [Testi] static void EsittelytKutenWebissa()
        {
            var web = K().EnumerateObject().ToList();
            Oleta.Tosi(web.Count > 0, "kultaisessa on linssejä");
            foreach (var l in web)
            {
                var esittely = l.Value.GetProperty("esittely");
                Oleta.Sama(esittely.ValueKind == JsonValueKind.String ? esittely.GetString() : null, LinssiEsittelyt.Esittely(l.Name), l.Name);
                var kuva = l.Value.GetProperty("havainnekuva");
                Oleta.Sama(kuva.ValueKind == JsonValueKind.String ? kuva.GetString() : null, LinssiEsittelyt.Havainnekuva(l.Name), l.Name);
            }
            // Taulussa ei ole linssejä, joita web ei tunne.
            foreach (var t in LinssiEsittelyt.Tunnukset) Oleta.Tosi(web.Any(w => w.Name == t), "webissä ei ole: " + t);
            foreach (var t in LinssiEsittelyt.Tunnukset) Oleta.Tosi(LinssiEsittelyt.Esittely(t).Length <= 160, t + ": yli 160 merkkiä");
        }

        [Testi] static void JsonVoittaaTaulun()
        {
            var t = new LinssiTiedot { Id = "radio" };
            Oleta.Sama(LinssiEsittelyt.Esittely("radio"), t.Esittely, "taulusta");
            t.Esittely = "Moduulin oma esittely.";
            Oleta.Sama("Moduulin oma esittely.", t.Esittely);
            Oleta.Tosi(new LinssiTiedot { Id = "tuntematon" }.Esittely == null, "tuntematon linssi: ei esittelyä (UI: Lyhyt)");
            Oleta.Tosi(new LinssiTiedot { Id = "radio" }.Havainnekuva == null, "havainnekuvia ei vielä ole");
        }
    }
}
