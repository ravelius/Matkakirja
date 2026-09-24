// SISÄLTÖPAKETTI 2.0 (Pelikoodari 24.9.2026): alkioilla ei ole `data`-kenttää, vain päätaso. Linssien
// lukijat lukevat ensin päätason ja raakaa dataa vain Paataso-varareitin kautta. Testi siirtää paketin
// (kultaiset/paketti/linssiaineisto.json) data-kentät päätasolle, kieltää raa'an datan (RaakaKielletty)
// ja vaatii saman tuloksen kuin vanhasta muodosta.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Virrat;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class Paketti2Testit
    {
        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);
        static Dictionary<string, object> Paketti() =>
            (Dictionary<string, object>)MiniJson.Jasenna(File.ReadAllText(Polku("paketti/linssiaineisto.json")));

        static Dictionary<string, object> Alkio(Dictionary<string, object> paketti, string id) =>
            ((List<object>)paketti["alkiot"]).Cast<Dictionary<string, object>>().Single(a => (string)a["id"] == id);

        /// <summary>2.0-muoto: data-kentät päätasolle, data pois.</summary>
        static Dictionary<string, object> Paatasolle(Dictionary<string, object> paketti)
        {
            foreach (var a in ((List<object>)paketti["alkiot"]).Cast<Dictionary<string, object>>())
            {
                if (!(a.TryGetValue("data", out var d) && d is Dictionary<string, object> data)) continue;
                foreach (var kv in data) a[kv.Key] = kv.Value;
                a.Remove("data");
            }
            return paketti;
        }

        static T IlmanRaakaa<T>(Func<T> f)
        {
            Paataso.RaakaKielletty = true;
            try { return f(); } finally { Paataso.RaakaKielletty = false; }
        }

        [Testi] static void KeksintojenLuennatPaatasolta()
        {
            var vanha = KeksintoLuennat.Lue(Paketti());
            var uusi = IlmanRaakaa(() => KeksintoLuennat.Lue(Paatasolle(Paketti())));
            Oleta.Tosi(vanha != null && vanha.Maara > 0, "vanha paketti luettiin");
            Oleta.Sama(vanha.Juuri, uusi.Juuri);
            Oleta.Sama(vanha.Maara, uusi.Maara);
        }

        [Testi] static void RaakaKiellettyKatkaiseeVanhanMuodon()
        {
            var l = IlmanRaakaa(() => KeksintoLuennat.Lue(Paketti()));
            Oleta.Tosi(l == null || l.Maara == 0, "raaka data luettiin Paatason ohi");
        }

        [Testi] static void RantamaskiPaatasolta()
        {
            // Kultaisessa paketissa (v11) ei ole rantamaskia: pieni maski 4 × 2, juoksut meri 3, maa 5 (LEB128 → "AwU=").
            var kentat = new Dictionary<string, object> { ["leveys"] = 4.0, ["korkeus"] = 2.0, ["aste"] = 1.0, ["juoksut"] = "AwU=" };
            var vanha = Ruutumaski.Lue(new Dictionary<string, object> { ["id"] = "rantamaski", ["data"] = kentat });
            var paatasolla = new Dictionary<string, object>(kentat) { ["id"] = "rantamaski" };
            var uusi = IlmanRaakaa(() => Ruutumaski.Lue(paatasolla));
            Oleta.Sama(4, uusi.Leveys);
            Oleta.Sama(2, uusi.Korkeus);
            Oleta.Tosi(vanha.Maa.SequenceEqual(uusi.Maa), "maskin tavut eroavat");
            Oleta.Sama(5, uusi.Maa.Count(b => b != 0));
            // Vanha muoto ilman raakaa: juoksut puuttuu → virhe, ei hiljaista väärää maskia.
            bool heitti = false;
            try { IlmanRaakaa(() => Ruutumaski.Lue(new Dictionary<string, object> { ["id"] = "rantamaski", ["data"] = kentat })); }
            catch (FormatException) { heitti = true; }
            Oleta.Tosi(heitti, "raaka data luettiin Paatason ohi");
        }
    }
}
