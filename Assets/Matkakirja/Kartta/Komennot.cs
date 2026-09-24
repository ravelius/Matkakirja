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
    ///   hiljaa | aanet            koko sovellus mykäksi / äänet takaisin (laitetestit)
    ///   alue|offline lataa|peru|poista <ISO3|maailma> | offline tila   offline-lataus (Alueet)
    ///   palvelin                  laattapalvelimen osumat lokiin (offline / välimuisti / verkko)
    ///   valot <aihe>|kaikki|ei|tila     karttavalot (AiheValot), tila = laskurit lokiin
    ///   valot osoita <id>               napauttaa valon kohtaa (esim. skandaali:shakkiturkkilainen)
    ///   maakunta <ISO3:tunnus>|pois  maakunnan värjäys (B17)
    ///   maat paalle|pois | maat korosta ISO3 [#täyttö #raja] | maat pois-korostus   Maatila (MaaKartta)
    ///   lentokaaret lähtö kohde … | lentokaaret pois   lentolistan kaaret + kameran sovitus (Reitit)
    ///   nappula aseta lat lon | aja lat lon … kesto | lenna lat0 lon0 lat1 lon1 kesto | aloitus lat0 lon0 lat1 lon1 kesto | pois
    ///   piste <id> lat lon [lukittu] | piste pois <id>   pelin karttapiste (vihreä)
    ///   napauta x y               synteettinen napautus (osuus näytöstä, origo vasen alakulma)
    ///   portti paalle|pois        aloitusportin pallo (PalloKierto.PorttiSumea): sumennus 6 pt, täyttö, kierto
    ///   renkaat id,id,… [valittu] | renkaat pois   aloitusvalinnan huomiorenkaat (KaupunkiMerkit.Renkaat)
    ///   maasto paalle|pois        Karttasepän maasto (layer.json) tai ellipsoidi; valinta
    ///                             muistetaan tiedostossa Documents/maasto.txt
    ///   korkeus <kerroin>         korkeuserojen liioittelu heti (KorkeusKerroin, 1–3, oletus 1; ei tallennu)
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
#if MATKAKIRJA_APPSTORE
            // App Store -käännöksessä ei testikomentoja (kuten Natiivi-UI:n ui-komento.txt).
            enabled = false;
#endif
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
                case "hiljaa":
                case "aanet":
                    // Laitetestit ilman ääniä (Fable 24.9.): koko sovellus mykäksi tai takaisin.
                    AudioListener.volume = o[0] == "hiljaa" ? 0f : 1f;
                    break;
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
                case "lentokaaret":
                {
                    // lentokaaret <lähtö> <kohde> … | lentokaaret pois ; sovita = kamera kohteisiin (Reitit.SovitaKohteet)
                    var rt = FindAnyObjectByType<Reitit>();
                    if (rt == null) break;
                    if (o.Length < 3) { rt.Lentokaaret(null, null); break; }
                    var kohteet = new List<string>();
                    for (int i = 2; i < o.Length; i++) kohteet.Add(o[i]);
                    rt.Lentokaaret(o[1], kohteet);
                    rt.SovitaKohteet(kohteet);
                    break;
                }
                case "nappula":
                {
                    // nappula aseta lat lon | nappula aja lat lon lat lon … kesto | nappula lenna lat0 lon0 lat1 lon1 kesto | nappula pois
                    var np = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.nappula : null;
                    if (np == null) break;
                    if (o[1] == "aseta") np.Aseta(D(2), D(3));
                    else if (o[1] == "aloitus") np.AloitusLento(D(2), D(3), D(4), D(5), (float)D(6), () => Debug.Log("MATKAKIRJA nappula: aloituslento lähti"), () => Debug.Log("MATKAKIRJA nappula: aloituslento perillä"));
                    else if (o[1] == "lenna") np.Lenna(D(2), D(3), D(4), D(5), (float)D(6), () => Debug.Log("MATKAKIRJA nappula: perillä"));
                    else if (o[1] == "aja")
                    {
                        var pisteet = new List<(double, double)>();
                        for (int i = 2; i + 1 < o.Length - 1; i += 2) pisteet.Add((D(i), D(i + 1)));
                        np.Aja(pisteet, (float)D(o.Length - 1), () => Debug.Log("MATKAKIRJA nappula: perillä"));
                    }
                    else if (o[1] == "pois") np.Piilota();
                    break;
                }
                case "piste":
                {
                    // piste <id> lat lon [lukittu] | piste pois <id>: pelin karttapiste (Karttapisteet)
                    var kp = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pisteet : null;
                    if (kp == null) break;
                    if (o[1] == "pois") kp.Poista(o[2]);
                    else kp.Aseta(o[1], D(2), D(3), new Color(0.24f, 0.62f, 0.33f), o.Length > 4 && o[4] == "lukittu");
                    break;
                }
                case "portti":
                    PalloKierto.PorttiSumea = o[1] == "paalle";
                    break;
                case "renkaat":
                    if (o[1] == "pois") merkit.Renkaat(null, null);
                    else merkit.Renkaat(o[1].Split(','), o.Length > 2 ? o[2] : null);
                    break;
                case "napauta":
                    // napauta x y: osuus näytöstä 0–1, origo vasen alakulma
                    kierto.Napauta(new Vector2((float)D(1) * Screen.width, (float)D(2) * Screen.height));
                    break;
                case "maasto":
                    Maasto(o[1] == "paalle");
                    break;
                case "alue":
                case "offline":
                {
                    // alue lataa|peru|poista <id> | alue tila
                    var al = FindAnyObjectByType<Alueet>();
                    if (al == null) break;
                    if (o[1] == "lataa") al.Lataa(o[2]);
                    else if (o[1] == "peru") al.Peru(o[2]);
                    else if (o[1] == "poista") al.Poista(o[2]);
                    long vapaa = -1;
                    try { vapaa = new DriveInfo(Application.persistentDataPath).AvailableFreeSpace; } catch { }
                    var sb = new StringBuilder($"MATKAKIRJA alueet (vapaa {vapaa / 1073741824.0:0.0} Gt):");
                    foreach (var a in al.Luettelo)
                        if (a.Tila != Alueet.Tila.Ei || a.Id == "maailma")
                            sb.Append($" {a.Id}={a.Tila} {a.Ladattu / 1048576.0:0.0}/{a.Tavut / 1048576.0:0.0} Mt");
                    Debug.Log(sb.ToString());
                    break;
                }
                case "vari":
                {
                    // vari <ISO3> | vari pelaaja | vari pois | vari paalle
                    var vt = FindAnyObjectByType<Varitaso>();
                    if (vt == null) break;
                    if (o[1] == "alin" && o.Length > 2 && int.TryParse(o[2], out int alin))
                    {
                        Varitaso.AlinKaytetty = alin;
                        vt.Uudelleen();
                    }
                    else if (o[1] == "pois" || o[1] == "paalle") vt.Nakyvat(o[1] == "paalle");
                    else vt.Pakotettu = o[1] == "pelaaja" ? null : o[1];
                    Debug.Log($"MATKAKIRJA väritaso: komento {o[1]}, nyt {vt.Maa ?? "ei"}");
                    break;
                }
                case "korkeus":
                    // korkeus <kerroin>: löydös 29 -koelippu (vertailukuvat 1 / 1.5 / 2 / 2.5). Rajataan 1–3.
                    Debug.Log("MATKAKIRJA korkeuskerroin: " + KorkeusKerroin.Aseta(o.Length > 1 ? (float)D(1) : 1f)
                        .ToString("0.##", CultureInfo.InvariantCulture));
                    break;
                case "satelliitti":
                    // satelliitti <versio> | satelliitti pois: lennon pinta Karttasepän satelliittisarjaan (LENNON PINTA).
                    // satelliitti <versio> [bmng|bmng-bathy] [s2|s2-alkup]
                    KarttaKerrokset.SatelliittiVersio = o.Length > 1 && o[1] != "pois" ? o[1] : null;
                    if (o.Length > 2) KarttaKerrokset.SatelliittiMeri = o[2];
                    if (o.Length > 3) KarttaKerrokset.SatelliittiS2 = o[3];
                    Debug.Log("MATKAKIRJA lennon pinta: satelliitti " + (KarttaKerrokset.SatelliittiVersio ?? "pois (sileä)"));
                    break;
                case "palvelin":
                    Debug.Log($"MATKAKIRJA laattapalvelin: {Laattapalvelin.Juuri} offline {Laattapalvelin.Offline}, " +
                              $"välimuisti {Laattapalvelin.Valimuistista}, verkko {Laattapalvelin.Verkosta}, virheitä {Laattapalvelin.Virheita}, varalaattoja {Laattapalvelin.Varakuvia}");
                    break;
                case "valot":
                {
                    // valot <aihe> | valot kaikki | valot ei | valot tila (laskurit lokiin)
                    var av = FindAnyObjectByType<AiheValot>();
                    if (av == null) break;
                    if (o[1] == "osoita" && o.Length > 2)
                    {
                        // valot osoita <id>: napauttaa valon kohtaa näytöllä (valon napautuksen päästä päähän -testi)
                        if (av.RuutuPaikka(o[2], out var rp)) kierto.Napauta(rp);
                        else Debug.LogWarning("MATKAKIRJA valot: " + o[2] + " ei näy");
                        break;
                    }
                    if (o[1] != "tila") av.Valitse(o[1]);
                    var valoRivi = new StringBuilder("MATKAKIRJA valot: valittu " + av.Valittu + ":");
                    foreach (var p in av.Laskurit) valoRivi.Append(' ').Append(p.Key).Append('=').Append(p.Value);
                    Debug.Log(valoRivi.ToString());
                    break;
                }
                case "maakunta":
                {
                    // maakunta <ISO3:tunnus> | maakunta pois (B17, sama kuin Natiivi-UI:n Maakunnat-valinta)
                    var mk = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.maakunnat : null;
                    if (mk == null) break;
                    mk.KorostusPois(null);
                    if (o[1] == "pois") { mk.MaaTila(false); break; }
                    mk.Korosta(rivi.Substring(rivi.IndexOf(' ') + 1),
                        new Matkakirja.Linssit.Maat.Savy(new Matkakirja.Linssit.Maat.Rgba(0.7f, 0.3f, 0.2f, 0.35f), new Matkakirja.Linssit.Maat.Rgba(0.45f, 0.16f, 0.1f, 0.95f)));
                    mk.MaaTila(true);
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
