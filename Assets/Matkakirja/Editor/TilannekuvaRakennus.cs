using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Editori
{
    /// <summary>
    /// SISÄLTÖPAKETIN TILANNEKUVA BUILDIIN (esilatauspolitiikan kohta 1 osa 3, build 19; sovittu Siirtosepän kanssa 26.9.2026).
    /// Aloitusdata (kaupungit, reitit, maarajat, aluenimet, ui-tekstit) haettiin kylmänä verkosta (Pelikoodarin mittaus
    /// proto-3d/lokit/kohta1-kaynnistys-20260926.md). Sama tulos kuin Matkakirja-repon tools/vienti/tilannekuva.mjs
    /// (Siirtoseppä, PR #3299) ilman Nodea käännösympäristössä:
    ///   osoitin.json        tuotannon uusin.json (version osoitin)
    ///   hakemisto.json      version koko hakemisto (sha256 osoitinta vasten, rivien tiiviste = osoitin.sha256)
    ///   tiedostot/&lt;sha256&gt;  tilannekuvan tiedostot sisällön mukaan avainnettuina (natiivin varaston avain)
    ///   tilannekuva.json    { versio, polku, tiedostot, tavuja }
    /// Lukupuoli: Kartta/PakettiPaivitys.TuoTilannekuva (Siirtoseppä). Ei gitiin: Build/tilannekuva/ haetaan jokaisen käännöksen
    /// alussa (<see cref="Varmista"/>, uusin versio) ja kopioidaan Xcode-projektin Data/Raw/sisalto/tilannekuva/:iin
    /// (<see cref="KopioiBuildiin"/>). Virhe → build ilman tilannekuvaa (kylmä käynnistys hakee verkosta kuten ennen).
    /// MATKAKIRJA_TILANNEKUVA=0 ohittaa.
    /// </summary>
    public static class TilannekuvaRakennus
    {
        const string Juuri = "https://media.matkakirja.app/";
        const int Paa = 1;

        /// <summary>Aloitusdata (sama lista kuin tilannekuva.mjs TILANNEKUVAN_TIEDOSTOT).</summary>
        public static readonly string[] Tiedostot =
        {
            "kokoelmat/kaupungit.json", "kokoelmat/reitit.json", "kokoelmat/maarajat.json", "kokoelmat/aluenimet.json",
            "moduulit/js/ui-tekstit.json",
        };

        public static string Kansio => Path.GetFullPath(Path.Combine("Build", "tilannekuva"));

        static string Sha(byte[] b)
        {
            using var s = SHA256.Create();
            return string.Concat(s.ComputeHash(b).Select(x => x.ToString("x2")));
        }

        /// <summary>Rivit "polku\tsha256\n" polun mukaan (ordinaali) = osoitin.sha256 (julkaise-sisalto.mjs paketinTiiviste).</summary>
        static string HakemistonTiiviste(IEnumerable<(string polku, string sha)> rivit) =>
            Sha(Encoding.UTF8.GetBytes(string.Concat(rivit.OrderBy(r => r.polku, StringComparer.Ordinal).Select(r => r.polku + "\t" + r.sha + "\n"))));

        /// <summary>Hakee tilannekuvan Build/tilannekuva/:iin (aina uusin versio). Rakennus kutsuu ennen vientiä.</summary>
        public static void Varmista()
        {
            if (Environment.GetEnvironmentVariable("MATKAKIRJA_TILANNEKUVA") == "0")
            {
                Debug.Log("MATKAKIRJA tilannekuva: ohitettu (MATKAKIRJA_TILANNEKUVA=0)");
                return;
            }
            string kohde = Kansio, tmp = kohde + ".tmp";
            try
            {
                var kasittelija = new HttpClientHandler { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate };
                using var http = new HttpClient(kasittelija) { Timeout = TimeSpan.FromSeconds(60) };
                byte[] Hae(string url) => http.GetByteArrayAsync(url).GetAwaiter().GetResult();

                byte[] osoitinTavut = Hae(Juuri + "sisalto/" + Paa + "/uusin.json");
                var osoitin = MiniJson.Objekti(MiniJson.Jasenna(Encoding.UTF8.GetString(osoitinTavut)));
                string polku = MiniJson.Teksti(osoitin, "polku");
                int versio = (int)(MiniJson.Luku(osoitin, "versio") ?? 0);
                var hak = MiniJson.ObjektiTaiNull(MiniJson.Kentta(osoitin, "hakemisto"));
                if (polku == null || hak == null || MiniJson.Teksti(hak, "sha256") == null)
                    throw new Exception($"v{versio}: osoittimessa ei hakemistoa");
                byte[] hakemistoTavut = Hae(Juuri + polku + MiniJson.Teksti(hak, "polku"));
                if (Sha(hakemistoTavut) != MiniJson.Teksti(hak, "sha256")) throw new Exception("hakemiston sha256 ei vastaa osoitinta");
                var rivit = MiniJson.Taulukko(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(Encoding.UTF8.GetString(hakemistoTavut))), "tiedostot"))
                    .Select(MiniJson.Objekti).Select(r => (polku: MiniJson.Teksti(r, "polku"), sha: MiniJson.Teksti(r, "sha256"))).ToList();
                if (HakemistonTiiviste(rivit) != MiniJson.Teksti(osoitin, "sha256"))
                    throw new Exception("hakemiston rivit eivät vastaa osoittimen sha256:ta");

                if (Directory.Exists(tmp)) Directory.Delete(tmp, true);
                Directory.CreateDirectory(Path.Combine(tmp, "tiedostot"));
                File.WriteAllBytes(Path.Combine(tmp, "osoitin.json"), osoitinTavut);
                File.WriteAllBytes(Path.Combine(tmp, "hakemisto.json"), hakemistoTavut);
                long tavuja = osoitinTavut.Length + hakemistoTavut.Length;
                var mukana = new List<string>();
                foreach (var t in Tiedostot)
                {
                    var r = rivit.FirstOrDefault(x => x.polku == t);
                    if (r.polku == null) throw new Exception($"{t} ei ole version v{versio} hakemistossa");
                    byte[] b = Hae(Juuri + polku + t);
                    if (Sha(b) != r.sha) throw new Exception($"{t}: sha256 ei täsmää");
                    File.WriteAllBytes(Path.Combine(tmp, "tiedostot", r.sha), b);
                    tavuja += b.Length;
                    mukana.Add(t);
                }
                string kuvaus = "{\"versio\":" + versio + ",\"polku\":\"" + polku + "\",\"tiedostot\":[" +
                                string.Join(",", mukana.Select(m => "\"" + m + "\"")) + "],\"tavuja\":" + tavuja + "}\n";
                File.WriteAllText(Path.Combine(tmp, "tilannekuva.json"), kuvaus);
                if (Directory.Exists(kohde)) Directory.Delete(kohde, true);
                Directory.Move(tmp, kohde);
                Debug.Log($"MATKAKIRJA tilannekuva: v{versio} {mukana.Count} tiedostoa, {tavuja / 1e6:0.0} Mt → {kohde}");
            }
            catch (Exception e)
            {
                try { if (Directory.Exists(tmp)) Directory.Delete(tmp, true); } catch (IOException) { }
                // Vanha tilannekuva kelpaa (PakettiPaivitys hakee kohdeversion hakemiston kylmänä); puuttuessa build ilman.
                Debug.LogWarning("MATKAKIRJA tilannekuva: haku epäonnistui (" + e.Message + ")" +
                                 (Directory.Exists(kohde) ? ", käytetään edellistä" : ", build ilman tilannekuvaa"));
            }
        }

        /// <summary>Kopioi tilannekuvan Xcode-projektin Data/Raw/sisalto/tilannekuva/:iin (StreamingAssets iOS:llä).</summary>
        public static void KopioiBuildiin(string xcodeProjekti)
        {
            string kohde = Path.Combine(xcodeProjekti, "Data", "Raw", "sisalto", "tilannekuva");
            if (Directory.Exists(kohde)) Directory.Delete(kohde, true);
            if (!File.Exists(Path.Combine(Kansio, "tilannekuva.json")) || Environment.GetEnvironmentVariable("MATKAKIRJA_TILANNEKUVA") == "0")
            {
                Debug.LogWarning("MATKAKIRJA tilannekuva: ei tilannekuvaa buildissa");
                return;
            }
            foreach (var f in Directory.GetFiles(Kansio, "*", SearchOption.AllDirectories))
            {
                string k = Path.Combine(kohde, Path.GetRelativePath(Kansio, f));
                Directory.CreateDirectory(Path.GetDirectoryName(k));
                File.Copy(f, k, true);
            }
            Debug.Log("MATKAKIRJA tilannekuva: buildiin " + kohde);
        }
    }
}
