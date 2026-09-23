using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Testikomennot laitteelle ilman kosketusta: Mac kirjoittaa sovelluksen
    /// Documents-kansioon tiedoston komento.txt (xcrun devicectl device copy to …),
    /// ja sovellus lukee sen sekunnin välein, poistaa tiedoston ja ajaa rivit
    /// jonossa järjestyksessä. Tulokset menevät Documents-kansioon, josta ne haetaan
    /// komennolla devicectl device copy from.
    ///
    ///   kuva nimi                 kuvakaappaus Documents/nimi.png
    ///   kaupunki id               lento kaupunkiin ja nimikortti (kuin napautus)
    ///   aja lat lon kaari [s]     kamera-ajo; kaari = kapeamman suunnan asteet
    ///   pallo                     koko pallo kuvaan
    ///   odota s                   seuraava rivi vasta s sekunnin päästä
    ///   mittaus alku nimi         raakakehysajat talteen (ms, yksi per rivi)
    ///   mittaus loppu             kirjoittaa Documents/mittaus-nimi.txt
    ///   veto x0 y0 x1 y1 s        yhden sormen veto (näytön osuudet 0–1, y ylöspäin);
    ///                             nopea veto on heitto: irrotuksen jälkeen pallo liukuu
    ///   nipistys cx cy d0 d1 s    kahden sormen nipistys keskipisteen ympäri, sormien
    ///                             väli d0 → d1 (osuus näytön leveydestä)
    ///   kallista y0 y1 s          kahden sormen pystyveto (kallistus), y näytön osuutena
    ///   alue lataa|peru|poista <ISO3|maailma> | alue tila   offline-lataus (Alueet)
    ///   palvelin                  laattapalvelimen osumat lokiin (offline / välimuisti / verkko)
    ///   valot <aihe>|kaikki|ei|tila     karttavalot (AiheValot), tila = laskurit lokiin
    ///   maat paalle|pois | maat korosta ISO3 [#täyttö #raja] | maat pois-korostus   Maatila (MaaKartta)
    ///   maasto paalle|pois        Karttasepän maasto (layer.json) tai ellipsoidi; valinta
    ///                             muistetaan tiedostossa Documents/maasto.txt
    /// </summary>
    public class Komennot : MonoBehaviour
    {
        public PalloKierto kierto;
        public KaupunkiMerkit merkit;

        readonly Queue<string> jono = new Queue<string>();
        string polku;
        float tarkistus, odotus;
        string mittausNimi;
        StringBuilder mittaus;

        void Start()
        {
            polku = Path.Combine(Application.persistentDataPath, "komento.txt");
            if (File.Exists(MaastoTiedosto)) Maasto(File.ReadAllText(MaastoTiedosto).Trim() == "paalle");
        }

        static string MaastoTiedosto => Path.Combine(Application.persistentDataPath, "maasto.txt");

        /// <summary>Vaihtaa pallon pohjan maastoon (tileset.url) tai ellipsoidiin.</summary>
        static void Maasto(bool paalle)
        {
            var pallo = FindAnyObjectByType<CesiumForUnity.Cesium3DTileset>();
            if (pallo == null) return;
            var lahde = paalle ? CesiumForUnity.CesiumDataSource.FromUrl : CesiumForUnity.CesiumDataSource.FromEllipsoid;
            if (pallo.tilesetSource != lahde) pallo.tilesetSource = lahde;
            File.WriteAllText(MaastoTiedosto, paalle ? "paalle" : "pois");
        }

        void Update()
        {
            if (mittaus != null)
                mittaus.Append((Time.unscaledDeltaTime * 1000f).ToString("0.###", CultureInfo.InvariantCulture)).Append('\n');

            if (Time.unscaledTime >= tarkistus)
            {
                tarkistus = Time.unscaledTime + 1f;
                if (File.Exists(polku))
                {
                    foreach (var rivi in File.ReadAllLines(polku)) jono.Enqueue(rivi.Trim());
                    File.Delete(polku);
                }
            }
            while (jono.Count > 0 && Time.unscaledTime >= odotus) Aja(jono.Dequeue());
        }

        void Aja(string rivi)
        {
            if (rivi.Length == 0 || rivi.StartsWith("#")) return;
            var o = rivi.Split(' ');
            double D(int i) => double.Parse(o[i], CultureInfo.InvariantCulture);
            switch (o[0])
            {
                case "kuva":
                    // Mobiilissa polku on suhteellinen persistentDataPathiin.
                    ScreenCapture.CaptureScreenshot(Application.isMobilePlatform
                        ? o[1] + ".png" : Path.Combine(Application.persistentDataPath, o[1] + ".png"));
                    break;
                case "kaupunki":
                    if (!merkit.ValitseKaupunki(o[1])) Debug.LogWarning("MATKAKIRJA komento: ei kaupunkia " + o[1]);
                    break;
                case "aja":
                    kierto.Aja(D(1), D(2), kierto.KorkeusKaarelle(D(3)), o.Length > 4 ? (float)D(4) : 1.4f, null);
                    break;
                case "pallo":
                    kierto.Aja(kierto.leveys, kierto.pituus, kierto.MaxKorkeus(), 1.4f, null);
                    break;
                case "veto":
                    kierto.AloitaEle(new PalloKierto.Ele
                    {
                        a0 = new Unity.Mathematics.float2((float)D(1), (float)D(2)),
                        a1 = new Unity.Mathematics.float2((float)D(3), (float)D(4)),
                        kesto = (float)D(5),
                    });
                    break;
                case "nipistys":
                {
                    float cx = (float)D(1), cy = (float)D(2), d0 = (float)D(3) / 2, d1 = (float)D(4) / 2;
                    float suhde = (float)Screen.width / Screen.height; // väli mitataan leveyden osuutena
                    kierto.AloitaEle(new PalloKierto.Ele
                    {
                        kaksi = true,
                        a0 = new Unity.Mathematics.float2(cx - d0, cy - d0 * suhde),
                        a1 = new Unity.Mathematics.float2(cx - d1, cy - d1 * suhde),
                        b0 = new Unity.Mathematics.float2(cx + d0, cy + d0 * suhde),
                        b1 = new Unity.Mathematics.float2(cx + d1, cy + d1 * suhde),
                        kesto = (float)D(5),
                    });
                    break;
                }
                case "kallista":
                    kierto.AloitaEle(new PalloKierto.Ele
                    {
                        kaksi = true,
                        a0 = new Unity.Mathematics.float2(0.4f, (float)D(1)),
                        a1 = new Unity.Mathematics.float2(0.4f, (float)D(2)),
                        b0 = new Unity.Mathematics.float2(0.6f, (float)D(1)),
                        b1 = new Unity.Mathematics.float2(0.6f, (float)D(2)),
                        kesto = (float)D(3),
                    });
                    break;
                case "maasto":
                    Maasto(o[1] == "paalle");
                    break;
                case "alue":
                {
                    // alue lataa|peru|poista <id> | alue tila
                    var al = FindAnyObjectByType<Alueet>();
                    if (al == null) break;
                    if (o[1] == "lataa") al.Lataa(o[2]);
                    else if (o[1] == "peru") al.Peru(o[2]);
                    else if (o[1] == "poista") al.Poista(o[2]);
                    var sb = new StringBuilder("MATKAKIRJA alueet:");
                    foreach (var a in al.Luettelo)
                        if (a.Tila != Alueet.Tila.Ei || a.Id == "maailma")
                            sb.Append($" {a.Id}={a.Tila} {a.Ladattu / 1048576.0:0.0}/{a.Tavut / 1048576.0:0.0} Mt");
                    Debug.Log(sb.ToString());
                    break;
                }
                case "palvelin":
                    Debug.Log($"MATKAKIRJA laattapalvelin: {Laattapalvelin.Juuri} offline {Laattapalvelin.Offline}, " +
                              $"välimuisti {Laattapalvelin.Valimuistista}, verkko {Laattapalvelin.Verkosta}, virheitä {Laattapalvelin.Virheita}");
                    break;
                case "valot":
                {
                    // valot <aihe> | valot kaikki | valot ei | valot tila (laskurit lokiin)
                    var av = FindAnyObjectByType<AiheValot>();
                    if (av == null) break;
                    if (o[1] != "tila") av.Valitse(o[1]);
                    var valoRivi = new StringBuilder("MATKAKIRJA valot: valittu " + av.Valittu + ":");
                    foreach (var p in av.Laskurit) valoRivi.Append(' ').Append(p.Key).Append('=').Append(p.Value);
                    Debug.Log(valoRivi.ToString());
                    break;
                }
                case "maat":
                {
                    // maat paalle|pois | maat korosta ISO3 [#täyttö #raja] | maat pois-korostus
                    var mk = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.maaKartta : null;
                    if (mk == null) { Debug.LogWarning("MATKAKIRJA komento: maatila puuttuu"); break; }
                    if (o[1] == "paalle" || o[1] == "pois") mk.MaaTila(o[1] == "paalle");
                    else if (o[1] == "korosta" && o.Length > 2)
                        mk.Korosta(o[2], new Matkakirja.Linssit.Maat.Savy(o.Length > 3 ? o[3] : "#c0392b", o.Length > 4 ? o[4] : "#3b2f22"));
                    else if (o[1] == "pois-korostus") mk.KorostusPois(null);
                    break;
                }
                case "odota":
                    odotus = Time.unscaledTime + (float)D(1);
                    break;
                case "mittaus" when o.Length > 2 && o[1] == "alku":
                    mittausNimi = o[2];
                    mittaus = new StringBuilder();
                    break;
                case "mittaus" when o[1] == "loppu" && mittaus != null:
                    File.WriteAllText(Path.Combine(Application.persistentDataPath, "mittaus-" + mittausNimi + ".txt"), mittaus.ToString());
                    mittaus = null;
                    break;
                default:
                    Debug.LogWarning("MATKAKIRJA komento: tuntematon " + rivi);
                    return;
            }
            Debug.Log("MATKAKIRJA komento: " + rivi);
        }
    }
}
