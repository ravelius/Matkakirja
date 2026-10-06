// Valmiit luennat (Peli/Valmisluennat.cs): avain merkilleen sama kuin esigeneroijalla (Kultaiset/valmisluennat-avaimet.json =
// tee-valmisluennat-avaimet.mjs; ajautumissuoja, Natiiviseppä 6.10.2026), manifestin jäsennys ja haku äänen mallilla.
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    static class ValmisluennatTestit
    {
        [Testi] static void AvainOnEsigeneroijanAvain()
        {
            var d = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "valmisluennat-avaimet.json"))));
            var tapaukset = MiniJson.Taulukko(d["tapaukset"]).Select(MiniJson.Objekti).ToList();
            Oleta.Tosi(tapaukset.Count >= 5, "testivektoreita");
            foreach (var t in tapaukset)
                Oleta.Sama((string)t["avain"], Valmisluennat.Avain((string)t["teksti"], (string)t["malli"], (string)t["aani"],
                    (double)t["nopeus"], (string)t["loppuTagi"]), (string)t["teksti"]);
        }

        [Testi] static void NfdJaNfcSamaAvain()
        {
            Oleta.Sama(Valmisluennat.Avain("Äiti", "eleven_v4", "a", 1.15), Valmisluennat.Avain("Äiti", "eleven_v4", "a", 1.15));
        }

        [Testi] static void ManifestiJaHaku()
        {
            Valmisluennat.Nollaa();
            Oleta.Sama(null, Valmisluennat.Url("Teksti", "W", 1.15), "ilman manifestia ei osumaa");
            string avain = Valmisluennat.Avain("Teksti", "eleven_v4", "W", 1.15, "[pause]");
            int n = Valmisluennat.Lue("{\"versio\":1,\"aanet\":{\"W\":\"eleven_v4\"},\"palat\":{\"" + avain + "\":{\"u\":\"k/" + avain + ".mp3\",\"s\":3.2},"
                + "\"x\":{\"u\":\"https://muu.example/x.mp3\"}}}", "https://media.matkakirja.app/aanet/luennat/v1/manifest.json?t=1");
            Oleta.Sama(2, n);
            Oleta.Sama("https://media.matkakirja.app/aanet/luennat/v1/k/" + avain + ".mp3", Valmisluennat.Url("Teksti", "W", 1.15, "[pause]"));
            Oleta.Sama(null, Valmisluennat.Url("Teksti", "W", 1.15), "eri loppuTagi → eri avain");
            Oleta.Sama(null, Valmisluennat.Url("Teksti", "W", 1.0, "[pause]"), "eri nopeus → ei osumaa");
            Oleta.Sama(null, Valmisluennat.Url("Teksti", "Muu", 1.15, "[pause]"), "ääni ei manifestissa → ei osumaa");
            Oleta.Sama(0, Valmisluennat.Lue("ei jsonia", "https://x/y.json"), "virheellinen manifesti");
            Valmisluennat.Nollaa();
        }
    }
}
