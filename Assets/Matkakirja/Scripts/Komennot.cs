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

        void Start() => polku = Path.Combine(Application.persistentDataPath, "komento.txt");

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
