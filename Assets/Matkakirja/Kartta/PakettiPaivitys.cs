using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// SISÄLTÖPAKETIN TAUSTAPÄIVITYS (Siirtoseppä, vaihe 2; suunnitelma docs/raportit/paketin-taustapaivitys-suunnitelma-20260925.md,
    /// omistaja hyväksyi 25.9.2026). Päätökset: PakettiPaatokset.cs (Kartta-testit).
    ///
    /// Levy (persistentDataPath/sisalto/):
    ///   tiedostot/&lt;sha256&gt;              sisällön mukaan avainnettu varasto (versioiden yhteiset tiedostot kerran)
    ///   sisalto/&lt;p&gt;/v&lt;N&gt;/hakemisto.json versio N:n tiedostot (tarkistettu osoittimen tiivisteitä vasten); sama kansio kuin
    ///                                    laiskan tilan välimuisti (Sisalto.Valimuisti)
    ///   sisalto/&lt;p&gt;/v&lt;N&gt;/valmis.json    kaikki N:n tiedostot varastossa ja tarkistettu → kelpaa käyttöön
    ///   kaytossa.txt                     käytössä oleva versiopolku
    /// Levysiivous (Esilataaja erä 4) ei koske näihin.
    ///
    /// Kulku: käynnistyksessä <see cref="Valitse"/> (Sisalto.VersioPolku) ottaa käyttöön osoittimen kohdeversion, jos se on
    /// valmis, muuten käytössä olleen valmiin (palautus toimii ilman latausta); ilman valmista luetaan laiskasti kuten ennen.
    /// Taustalla (<see cref="KaynnistysViive"/> s käynnistyksestä ja taustalta palatessa, enintään kerran <see cref="VaaliH"/> h:ssa)
    /// haetaan kohdeversion hakemisto ja puuttuvat tiedostot Esilataajan kautta (Taso.Muu, Kohta.Kaynnistys: kaikilla verkoilla,
    /// myös kuumana), tarkistetaan sha256 ja kirjoitetaan valmis.json. Uusi versio tulee käyttöön SEURAAVASSA käynnistyksessä,
    /// ei kesken pelin. Käyttöönoton jälkeen siivotaan muut kuin käytössä oleva, edellinen valmis ja kesken oleva uudempi.
    /// </summary>
    public sealed class PakettiPaivitys : MonoBehaviour
    {
        /// <summary>Tämän buildin sisältötaso (julkaise-sisalto.mjs MIN_SOVELLUS.ios). Nosta, kun natiivi oppii uuden paketin muodon.</summary>
        public const int SisaltoTaso = 1;
        public const float KaynnistysViive = 20f;
        public const float VaaliH = 6f;

        static PakettiPaivitys instanssi;
        static string havaittuOsoitin;
        static int kaytossaVersio;
        static float viimeisinTarkistus = -1e9f;
        static bool kaynnissa;
        /// <summary>Käytössä olevan valmiin version hakemisto: suhteellinen polku → sha256 (null = laiska tila).</summary>
        static Dictionary<string, string> kaytossaHakemisto;
        static string kaytossaPolku;

        public static string Tila { get; private set; } = "ei aloitettu";

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            instanssi = null; havaittuOsoitin = null; kaytossaVersio = 0; viimeisinTarkistus = -1e9f; kaynnissa = false;
            kaytossaHakemisto = null; kaytossaPolku = null; Tila = "ei aloitettu";
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (instanssi != null) return;
            var go = new GameObject("PakettiPaivitys");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<PakettiPaivitys>();
        }

        static string Juuri => Path.Combine(Application.persistentDataPath, "sisalto");
        static string Varasto => Path.Combine(Juuri, "tiedostot");
        static string KaytossaTxt => Path.Combine(Juuri, "kaytossa.txt");
        /// <summary>Sama kansio kuin Sisalto.Valimuisti (persistentDataPath/sisalto/&lt;versiopolku&gt;), jotta laiskan tilan tiedostot siirtyvät ja siivoutuvat.</summary>
        static string VersioKansio(string versioPolku) => Path.Combine(Juuri, versioPolku.TrimEnd('/').Replace('/', Path.DirectorySeparatorChar));
        static string ValmisJson(string versioPolku) => Path.Combine(VersioKansio(versioPolku), "valmis.json");
        static string HakemistoJson(string versioPolku) => Path.Combine(VersioKansio(versioPolku), "hakemisto.json");

        /// <summary>
        /// Sisalto.VersioPolku kutsuu kerran istunnossa: osoitin (null = ei verkkoa) ja sen polku (tai viimeisin.txt).
        /// Palauttaa istunnon versiopolun. Ei koskaan heitä: virheessä palautetaan annettu polku (laiska tila).
        /// </summary>
        public static string Valitse(string osoitinTeksti, string osoitinPolku)
        {
            try
            {
                havaittuOsoitin = osoitinTeksti;
                var o = osoitinTeksti != null ? PakettiPaatokset.LueOsoitin(osoitinTeksti) : null;
                string pohja = o?.Polku ?? osoitinPolku ?? (File.Exists(KaytossaTxt) ? File.ReadAllText(KaytossaTxt).Trim() : null);
                if (pohja == null) return osoitinPolku;
                int kohde = o != null ? PakettiPaatokset.KohdeVersio(o, SisaltoTaso) : PakettiPaatokset.VersioPolusta(pohja);
                int kaytossa = File.Exists(KaytossaTxt) ? PakettiPaatokset.VersioPolusta(File.ReadAllText(KaytossaTxt).Trim()) : 0;
                var valmiit = ValmiitVersiot(pohja);
                int valittu = PakettiPaatokset.ValitseKaytto(kohde, kaytossa, valmiit);
                if (valittu > 0)
                {
                    string polku = PakettiPaatokset.VersionPolku(pohja, valittu);
                    var rivit = PakettiPaatokset.LueHakemisto(File.ReadAllText(HakemistoJson(polku)));
                    kaytossaHakemisto = rivit.ToDictionary(r => r.Polku, r => r.Sha256);
                    kaytossaPolku = polku; kaytossaVersio = valittu;
                    File.WriteAllText(KaytossaTxt, polku);
                    Debug.Log($"MATKAKIRJA paketti: käytössä v{valittu} varastosta (kohde v{kohde}, valmiit {string.Join(",", valmiit.OrderBy(v => v))})");
                    return polku;
                }
                string laiska = kohde > 0 ? PakettiPaatokset.VersionPolku(pohja, kohde) : (osoitinPolku ?? pohja);
                Debug.Log($"MATKAKIRJA paketti: ei valmista versiota, luetaan laiskasti {laiska} (kohde v{kohde})");
                return laiska;
            }
            catch (Exception e)
            {
                Debug.LogWarning("MATKAKIRJA paketti: valinta epäonnistui, laiska tila: " + e.Message);
                kaytossaHakemisto = null;
                return osoitinPolku;
            }
        }

        /// <summary>Käytössä olevan valmiin version tiedosto varastossa (null = ei valmista versiota tai polkua ei hakemistossa).</summary>
        public static string Varastosta(string versioPolku, string suhteellinen)
        {
            if (kaytossaHakemisto == null || versioPolku != kaytossaPolku) return null;
            return kaytossaHakemisto.TryGetValue(suhteellinen, out var sha) ? Path.Combine(Varasto, sha) : null;
        }

        static HashSet<int> ValmiitVersiot(string pohja)
        {
            var s = new HashSet<int>();
            string paa = Path.GetDirectoryName(VersioKansio(pohja));
            if (!Directory.Exists(paa)) return s;
            foreach (var d in Directory.GetDirectories(paa, "v*"))
                if (File.Exists(Path.Combine(d, "valmis.json")) && File.Exists(Path.Combine(d, "hakemisto.json")))
                {
                    int v = PakettiPaatokset.VersioPolusta(d.Replace(Path.DirectorySeparatorChar, '/'));
                    if (v > 0) s.Add(v);
                }
            return s;
        }

        void Start() => StartCoroutine(Aja(KaynnistysViive));

        void OnApplicationPause(bool tauolla)
        {
            if (!tauolla && Time.realtimeSinceStartup - viimeisinTarkistus > VaaliH * 3600f) StartCoroutine(Aja(2f));
        }

        IEnumerator Aja(float viive)
        {
            if (kaynnissa) yield break;
            kaynnissa = true;
            try
            {
                yield return new WaitForSecondsRealtime(viive);
                viimeisinTarkistus = Time.realtimeSinceStartup;
                yield return Paivita();
                yield return Siivoa();
            }
            finally { kaynnissa = false; }
        }

        static IEnumerator HaeTeksti(string osoite, Action<byte[]> valmis)
        {
            byte[] tulos = null;
            yield return Esilataaja.Hae(() => { var q = UnityWebRequest.Get(osoite); q.timeout = 30; return q; }, Taso.Muu, "paketti",
                q => { if (q != null && q.result == UnityWebRequest.Result.Success) tulos = q.downloadHandler.data; }, Kohta.Kaynnistys);
            valmis(tulos);
        }

        IEnumerator Paivita()
        {
            // Osoitin: sama teksti kuin istunnon alussa (Sisalto.VersioPolku); ilman sitä haetaan itse.
            string teksti = havaittuOsoitin;
            if (teksti == null)
            {
                byte[] b = null;
                yield return HaeTeksti(Sisalto.Osoitin, t => b = t);
                teksti = b == null ? null : Encoding.UTF8.GetString(b);
            }
            var uusin = teksti != null ? PakettiPaatokset.LueOsoitin(teksti) : null;
            if (uusin == null) { Tila = "ei osoitinta (ei verkkoa?)"; yield break; }
            int kohde = PakettiPaatokset.KohdeVersio(uusin, SisaltoTaso);
            if (kohde <= 0) { Tila = $"ei tasolle {SisaltoTaso} sopivaa versiota"; Debug.Log("MATKAKIRJA paketti: " + Tila); yield break; }
            string polku = PakettiPaatokset.VersionPolku(uusin.Polku, kohde);
            if (File.Exists(ValmisJson(polku))) { Tila = $"v{kohde} valmis"; yield break; }

            var o = uusin;
            if (kohde != uusin.Versio)
            {
                byte[] b = null;
                yield return HaeTeksti(Sisalto.Juuri + polku + "osoitin.json", t => b = t);
                o = b == null ? null : PakettiPaatokset.LueOsoitin(Encoding.UTF8.GetString(b));
                if (o == null || o.Versio != kohde) { Tila = $"v{kohde}:n osoitin puuttuu"; Debug.LogWarning("MATKAKIRJA paketti: " + Tila); yield break; }
            }
            if (string.IsNullOrEmpty(o.HakemistoSha256)) { Tila = $"v{kohde} ilman hakemistoa (paketti ennen vaihetta 1)"; Debug.Log("MATKAKIRJA paketti: " + Tila); yield break; }

            // Hakemisto: levyltä, jos jo tarkistettu; muuten verkosta ja tarkistus osoittimen tiivisteitä vasten.
            List<PakettiPaatokset.Rivi> rivit = null;
            string hakemistoPolku = HakemistoJson(polku), virhe = null;
            byte[] hakemisto = File.Exists(hakemistoPolku) ? File.ReadAllBytes(hakemistoPolku) : null;
            if (hakemisto == null) yield return HaeTeksti(Sisalto.Juuri + polku + "hakemisto.json", t => hakemisto = t);
            if (hakemisto == null) { Tila = $"v{kohde}: hakemisto ei latautunut"; yield break; }
            yield return Taustalla(() => virhe = PakettiPaatokset.TarkistaHakemisto(o, hakemisto, out rivit));
            if (virhe != null)
            {
                Tila = $"v{kohde}: {virhe}";
                Debug.LogWarning("MATKAKIRJA paketti: " + Tila);
                if (File.Exists(hakemistoPolku)) File.Delete(hakemistoPolku);
                yield break;
            }
            Directory.CreateDirectory(VersioKansio(polku));
            Directory.CreateDirectory(Varasto);
            if (!File.Exists(hakemistoPolku)) File.WriteAllBytes(hakemistoPolku, hakemisto);

            // Laiskasti välimuistiin haetut saman version tiedostot varastoon (siirtymä vanhasta mallista, ei latausta).
            string versioKansio = VersioKansio(polku), varasto = Varasto;
            yield return Taustalla(() =>
            {
                foreach (var r in rivit)
                {
                    string vanha = Path.Combine(versioKansio, r.Polku.Replace('/', Path.DirectorySeparatorChar));
                    string uusi = Path.Combine(varasto, r.Sha256);
                    if (File.Exists(uusi) || !File.Exists(vanha)) continue;
                    using (var f = File.OpenRead(vanha)) if (PakettiPaatokset.Sha256(f) != r.Sha256) continue;
                    File.Copy(vanha, uusi + ".tmp", true);
                    File.Move(uusi + ".tmp", uusi);
                }
            });

            var puuttuvat = PakettiPaatokset.Puuttuvat(rivit, sha => File.Exists(Path.Combine(varasto, sha)));
            long siirto = puuttuvat.Sum(r => r.Siirto > 0 ? r.Siirto : r.Tavuja);
            Debug.Log($"MATKAKIRJA paketti: v{kohde} ({o.Skeemaversio}) {rivit.Count} tiedostoa, puuttuu {puuttuvat.Count} ({siirto / 1e6:0.0} Mt siirto)");
            if (puuttuvat.Count > 0)
            {
                string ryhma = $"paketti:{polku.TrimEnd('/')}";
                bool valmis = false; int ok = 0, vika = 0;
                foreach (var r in puuttuvat)
                    Esilataaja.Pyyda(Kohde.Tiedosto(Sisalto.Juuri + polku + r.Polku, r.Sha256, r.Siirto, $"tiedostot/{r.Sha256}.lataus"),
                        Taso.Muu, Kohta.Kaynnistys, ryhma);
                Esilataaja.RyhmaValmis(ryhma, (v, e) => { ok = v; vika = e; valmis = true; });
                Tila = $"v{kohde}: ladataan {puuttuvat.Count} tiedostoa";
                while (!valmis) yield return null;
                int hylatty = 0;
                yield return Taustalla(() =>
                {
                    foreach (var r in puuttuvat)
                    {
                        string lataus = Path.Combine(varasto, r.Sha256 + ".lataus"), kohdeTiedosto = Path.Combine(varasto, r.Sha256);
                        if (!File.Exists(lataus)) continue;
                        string sha;
                        using (var f = File.OpenRead(lataus)) sha = PakettiPaatokset.Sha256(f);
                        if (sha == r.Sha256) { if (File.Exists(kohdeTiedosto)) File.Delete(lataus); else File.Move(lataus, kohdeTiedosto); }
                        else { File.Delete(lataus); hylatty++; }
                    }
                });
                Debug.Log($"MATKAKIRJA paketti: v{kohde} lataus {ok} valmista, {vika} virhettä, {hylatty} väärää tiivistettä");
            }
            if (PakettiPaatokset.Puuttuvat(rivit, sha => File.Exists(Path.Combine(varasto, sha))).Count > 0)
            {
                Tila = $"v{kohde}: kesken, jatkuu seuraavalla kierroksella";
                yield break;
            }
            File.WriteAllText(ValmisJson(polku), $"{{\"versio\":{kohde},\"polku\":\"{polku}\",\"sha256\":\"{o.Sha256}\",\"valmistui\":\"{DateTime.UtcNow:o}\"}}\n");
            Tila = $"v{kohde} valmis, käyttöön seuraavassa käynnistyksessä";
            Debug.Log("MATKAKIRJA paketti: " + Tila);
        }

        /// <summary>Muut versiot ja orvot varastotiedostot pois (vain kun käytössä on valmis versio).</summary>
        IEnumerator Siivoa()
        {
            if (kaytossaVersio <= 0 || kaytossaPolku == null) yield break;
            string paa = Path.GetDirectoryName(VersioKansio(kaytossaPolku)), varasto = Varasto;
            int kaytossa = kaytossaVersio;
            yield return Taustalla(() =>
            {
                var valmiit = new List<int>(); var kesken = new List<int>();
                var kansiot = new Dictionary<int, string>();
                foreach (var d in Directory.GetDirectories(paa, "v*"))
                {
                    int v = PakettiPaatokset.VersioPolusta(d.Replace(Path.DirectorySeparatorChar, '/'));
                    if (v <= 0) continue;
                    kansiot[v] = d;
                    if (File.Exists(Path.Combine(d, "valmis.json"))) valmiit.Add(v);
                    else if (File.Exists(Path.Combine(d, "hakemisto.json"))) kesken.Add(v);
                }
                var sailyta = PakettiPaatokset.Sailytettavat(kaytossa, valmiit, kesken);
                int poistettu = 0;
                foreach (var kv in kansiot)
                    if (!sailyta.Contains(kv.Key)) { Directory.Delete(kv.Value, true); poistettu++; }
                    else if (valmiit.Contains(kv.Key))
                    {
                        // Valmiin version laiskan tilan kopiot (kokoelmat/ …) ovat varastossa: vain hakemisto ja valmis jäävät.
                        foreach (var d in Directory.GetDirectories(kv.Value)) Directory.Delete(d, true);
                        foreach (var f in Directory.GetFiles(kv.Value))
                            if (Path.GetFileName(f) != "hakemisto.json" && Path.GetFileName(f) != "valmis.json") File.Delete(f);
                    }
                var hakemistot = sailyta.Where(kansiot.ContainsKey)
                    .Select(v => Path.Combine(kansiot[v], "hakemisto.json")).Where(File.Exists)
                    .Select(p => PakettiPaatokset.LueHakemisto(File.ReadAllText(p))).ToList();
                var varastossa = Directory.Exists(varasto)
                    ? Directory.GetFiles(varasto).Select(Path.GetFileName).Where(n => n.Length == 64).ToList() : new List<string>();
                var orvot = PakettiPaatokset.Orvot(varastossa, hakemistot);
                foreach (var sha in orvot) File.Delete(Path.Combine(varasto, sha));
                Debug.Log($"MATKAKIRJA paketti: siivous, säilytetään v{string.Join(",v", sailyta.OrderBy(v => v))}, poistettiin {poistettu} versiokansiota ja {orvot.Count} varastotiedostoa");
            });
        }

        /// <summary>Työ taustasäikeessä, odotus kehyksittäin; poikkeus kirjataan.</summary>
        static IEnumerator Taustalla(Action tyo)
        {
            var t = System.Threading.Tasks.Task.Run(tyo);
            while (!t.IsCompleted) yield return null;
            if (t.IsFaulted) Debug.LogWarning("MATKAKIRJA paketti: " + t.Exception?.GetBaseException().Message);
        }
    }
}
