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
    ///   panoroi lat lon x y [s]   piste (lat, lon) ruudun kohtaan (x, y) (osuudet 0–1, origo vasen alakulma);
    ///                             korkeus, kallistus ja suuntima pysyvät (PalloKierto.Panoroi, oletus 0,42 s)
    ///   odota s                   seuraava rivi vasta s sekunnin päästä
    ///   mittaus alku nimi         raakakehysajat talteen (ms, yksi per rivi)
    ///   mittaus loppu             kirjoittaa Documents/mittaus-nimi.txt
    ///   veto x0 y0 x1 y1 s        yhden sormen veto (näytön osuudet 0–1, y ylöspäin);
    ///                             nopea veto on heitto: irrotuksen jälkeen pallo liukuu
    ///   nipistys cx cy d0 d1 s    kahden sormen nipistys keskipisteen ympäri, sormien
    ///                             väli d0 → d1 (osuus näytön leveydestä)
    ///   kallista y0 y1 s          kahden sormen pystyveto (kallistus), y näytön osuutena
    ///   kallista aste             kallistus suoraan (0–85; käytetty kallistus rajautuu korkeuden ja maaston mukaan)
    ///   suunta aste               suuntima suoraan (0 = pohjoinen ylös, 90 = itä ylös)
    ///   kierra aste s             kahden sormen kiertoele ruudun keskellä (vastapäivään +)
    ///   pohjoinen [s]             pohjoinen ylös (PalautaPohjoinen, kuin tuplanapautus tai kompassinappi)
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
    ///   korkeus <kerroin>         korkeuserojen liioittelu heti (KorkeusKerroin, 1–3, oletus 2; ei tallennu)
    ///   satelliitti <versio> [bmng|bmng-bathy] [s2|s2-alkup] | satelliitti pois   lennon pinta (oletus
    ///                             2026-09-24 bmng-bathy s2-alkup; pois = sileä sarja), voimaan seuraavalla lennolla
    ///   nimet paalle|pois|laske   alue-, meri- ja valtamerinimet (Nimikerros); laske = näkyvät nimiöt, taso ja
    ///                             ladonnan kesto lokiin. nimet valtameret paalle|pois, nimet siirto x (tasovalinta)
    ///   nostot tila [ISO3] | nostot maa <ISO3|pois>   nostokerroksen portit lokiin (NostoKerros.Kuvaus): näkyvät,
    ///                             piilotetut syineen (kaupunki nimi/12 km, meri, taso 3, ruutu, katto), uloin osuus,
    ///                             lähizoomi ja ZoomKerroin; maa = pakotettu maa (NostoKerros.Maa)
    ///   lentoharmaa vara|kattavuus|uv|taso|varapois|s2|sumu|satloki|normaali   harmaiden suorakulmioiden kokeilu (varjostimen
    ///                             testitilat, KarttaKerrokset.LentoTesti); lentoharmaa paikka <0|1|2> <alfa>;
    ///                             lentoharmaa usva|pilvet pois|paalle; lentoharmaa pois = kaikki normaaliksi
    ///   mastot koe [n] | mastot pois   radiomastojen kokeilu ilman radiolinssiä (RadioMastot.Koe): n kaupunkia
    ///                             (oletus 115), koot vuorotellen, joka viides kanavaton, hämärä 1, valittu lähin,
    ///                             VU-tahtia jäljittelevä kirkkaus ja renkaat
    ///   mastot tila               mastot, näkyvät, valot, valittu, renkaat ja hämärä lokiin
    ///   mastot osoita <id>        napauttaa maston puoliväliä (napautuksen päästä päähän -testi)
    ///   hamara <0–1>              radion hämärä suoraan (tileset, napakannet, mastot, tausta)
    ///   s2meri r g b kynnys       Sentinelin meren värjäys heti (sRGB 0–1 tai 0–255; kynnys = sRGB-luma, 0 = pois;
    ///                             oletus 17 46 92 0.18)
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

        /// <summary>
        /// Harmaiden suorakulmioiden hypoteesit simulaattorissa (kylmä ensimmäinen lento, loittonus):
        ///   vara       magenta siellä, missä paikan 1 (Blue Marble) rasteri puuttuu → magenta suorakulmiot = laatta ilman
        ///              rasteria (ja varakartta laukeaa); harmaa ilman magentaa = rasteri on, mutta sisältö harmaa (c)
        ///   kattavuus  paikka 1 vihreänä (rasteri) / magentana (puuttuu) koko pallolla
        ///   uv         varakartan UV väreinä (r = pituus, g = leveys); punainen = maan akselit puuttuvat
        ///   taso       paikan 1 rasterin absoluuttinen taso: punainen ≤ varataso (varakartta), keltainen→vihreä 2–8,
        ///              magenta rasteri puuttuu, sininen varakartta puuttuu
        ///   sumu pois|paalle   etäisyyssumu (Aurinko) pois lennolta
        ///   varataso z varakartta, kun paikan 1 käytetty rasteri on itse tasolla ≤ z (oletus 2,5, 0 = pois)
        ///   satloki    Laattapalvelimen satelliittiloki alkaa alusta (minuutti seuraavasta satelliittipyynnöstä)
        ///   varapois   varakartta pois (vertailu: sama harmaa ilman varaa?)
        ///   s2         paikan 2 (Sentinel) peitto syaanina (d)
        ///   paikka n a raster-paikan n globaali alfa (0 = piiloon), esim. paikka 0 0 → pergamentti pois
        ///   usva pois|paalle, pilvet pois|paalle   usvalevy (a) ja pilvikuori (e) piiloon
        ///   pois       kaikki normaaliksi
        /// </summary>
        void LentoHarmaa(string[] o)
        {
            var kk = KarttaKerrokset.Instanssi;
            string m = o.Length > 1 ? o[1] : "pois";
            bool paalle = o.Length > 2 && o[2] == "paalle";
            switch (m)
            {
                case "vara": KarttaKerrokset.LentoTesti = 2; break;
                case "kattavuus": KarttaKerrokset.LentoTesti = 3; break;
                case "uv": KarttaKerrokset.LentoTesti = 4; break;
                case "taso": KarttaKerrokset.LentoTesti = 5; break;
                case "varataso" when o.Length > 2:
                    KarttaKerrokset.VaraTaso = (float)double.Parse(o[2], CultureInfo.InvariantCulture);
                    break;
                case "sumu": Aurinko.SumuEstetty = !paalle; break;
                case "satloki": SatelliittiLoki.Aloita(); break;
                case "normaali": KarttaKerrokset.LentoTesti = 0; break;
                case "varapois": KarttaKerrokset.LentoTestiVaraPois = !(o.Length > 2 && o[2] == "pois"); break;
                case "s2": KarttaKerrokset.LentoTestiS2 = !(o.Length > 2 && o[2] == "pois"); break;
                case "paikka" when o.Length > 3:
                    Shader.SetGlobalFloat("_overlayAlfa_" + o[2], (float)double.Parse(o[3], CultureInfo.InvariantCulture));
                    break;
                case "usva": Usvalevy.Estetty = !paalle; break;
                case "pilvet":
                {
                    var kuori = GameObject.Find("Pilvikuori");
                    var r = kuori != null ? kuori.GetComponent<MeshRenderer>() : null;
                    if (r != null) r.enabled = paalle;
                    else Debug.LogWarning("MATKAKIRJA lentoharmaa: pilvikuorta ei ole (vasta lennon aikana)");
                    break;
                }
                default:
                    KarttaKerrokset.LentoTesti = 0;
                    KarttaKerrokset.LentoTestiVaraPois = false;
                    KarttaKerrokset.LentoTestiS2 = false;
                    Usvalevy.Estetty = false;
                    Aurinko.SumuEstetty = false;
                    KarttaKerrokset.VaraTaso = 2.5f;
                    for (int i = 0; i < 3; i++) Shader.SetGlobalFloat("_overlayAlfa_" + i, 1f);
                    var pk = GameObject.Find("Pilvikuori");
                    if (pk != null && pk.TryGetComponent<MeshRenderer>(out var pr)) pr.enabled = true;
                    break;
            }
            kk?.LentoTestiVoimaan();
            Debug.Log($"MATKAKIRJA lentoharmaa {string.Join(" ", o, 1, o.Length - 1)}: testi {KarttaKerrokset.LentoTesti}, varataso {KarttaKerrokset.VaraTaso}, " +
                      $"varapois {KarttaKerrokset.LentoTestiVaraPois}, s2 {KarttaKerrokset.LentoTestiS2}, usva estetty {Usvalevy.Estetty}");
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
                case "panoroi":
                {
                    // panoroi lat lon x y [s]: liuskan avausajo (löydös 48); valmis-rivi ja pisteen ruutupaikka lokiin.
                    double lat = D(1), lon = D(2);
                    var maali = new Vector2((float)D(3) * Screen.width, (float)D(4) * Screen.height);
                    kierto.Panoroi(lat, lon, maali, o.Length > 5 ? (float)D(5) : Panorointi.LiuskanAjoS, () =>
                    {
                        bool nakyy = kierto.RuutuPiste(lat, lon, out var r);
                        Debug.Log($"MATKAKIRJA panorointi valmis: maali ({maali.x:0}, {maali.y:0}), piste " +
                                  (nakyy ? $"({r.x:0}, {r.y:0}), ero {Vector2.Distance(r, maali):0.#} px" : "ei näy"));
                    });
                    break;
                }
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
                case "kallista" when o.Length == 2:
                    kierto.kallistus = System.Math.Clamp(D(1), 0.0, 85.0);
                    break;
                case "suunta":
                    kierto.suuntima = D(1);
                    break;
                case "pohjoinen":
                    kierto.PalautaPohjoinen(o.Length > 1 ? (float)D(1) : 0.4f);
                    break;
                case "kierra":
                    kierto.AloitaEle(new PalloKierto.Ele
                    {
                        kaksi = true,
                        a0 = new Unity.Mathematics.float2(0.35f, 0.5f),
                        a1 = new Unity.Mathematics.float2(0.35f, 0.5f),
                        b0 = new Unity.Mathematics.float2(0.65f, 0.5f),
                        b1 = new Unity.Mathematics.float2(0.65f, 0.5f),
                        kiertoAst = (float)D(1),
                        kesto = (float)D(2),
                    });
                    break;
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
                case "kerros":
                {
                    // kerros <avain> paalle|pois: KarttaKerrokset.Nakyvyys (esim. "kerros kaupungit pois" +
                    // "kerros nimiot pois" + "kerros linssinimet paalle" = linssin nimikartta kuvausta varten).
                    var kk = KarttaKerrokset.Instanssi;
                    if (kk == null || o.Length < 3) break;
                    kk.Nakyvyys(o[1], o[2] == "paalle");
                    Debug.Log($"MATKAKIRJA kerrokset: {o[1]} {o[2]} (linssinimet voimassa {kk.Linssinimet})");
                    break;
                }
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
                case "lentoharmaa":
                    LentoHarmaa(o);
                    break;
                case "s2meri":
                {
                    // s2meri r g b kynnys: meren värjäys (KarttaKerrokset.S2Meri). Arvot > 1 tulkitaan 0–255-asteikoksi.
                    var kk = KarttaKerrokset.Instanssi;
                    if (kk == null || o.Length < 5) break;
                    float r = (float)D(1), g = (float)D(2), b = (float)D(3);
                    if (r > 1f || g > 1f || b > 1f) { r /= 255f; g /= 255f; b /= 255f; }
                    kk.S2Meri(new Color(r, g, b), (float)D(4));
                    Debug.Log($"MATKAKIRJA lennon pinta: s2meri {KarttaKerrokset.S2MeriVari} kynnys {KarttaKerrokset.S2MeriKynnys:0.###}");
                    break;
                }
                case "nimet":
                {
                    // nimet paalle|pois|laske | nimet valtameret paalle|pois | nimet siirto <x> (Nimikerros, löydös 38)
                    var nk = Nimikerros.Instanssi;
                    if (nk == null) { Debug.LogWarning("MATKAKIRJA komento: nimikerros puuttuu"); break; }
                    if (o.Length > 1 && (o[1] == "paalle" || o[1] == "pois")) nk.paalla = o[1] == "paalle";
                    else if (o.Length > 2 && o[1] == "valtameret") nk.valtameret = o[2] == "paalle";
                    else if (o.Length > 2 && o[1] == "siirto") nk.tasoSiirto = (float)D(2);
                    Debug.Log(nk.Kuvaus());
                    break;
                }
                case "nostot":
                {
                    // nostot tila [ISO3] | nostot maa <ISO3|pois> (NostoKerros, löydös 50 B): portit maittain lokiin
                    var nk = NostoKerros.Instanssi;
                    if (nk == null) { Debug.LogWarning("MATKAKIRJA komento: nostokerros puuttuu"); break; }
                    if (o.Length > 2 && o[1] == "maa") nk.Maa = o[2] == "pois" ? null : o[2].ToUpperInvariant();
                    Debug.Log(nk.Kuvaus(o.Length > 2 && o[1] == "tila" ? o[2] : null));
                    break;
                }
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
                case "mastot":
                {
                    var rm = RadioMastot.Instanssi;
                    if (rm == null) { Debug.LogWarning("MATKAKIRJA komento: RadioMastot puuttuu"); break; }
                    if (o.Length > 1 && o[1] == "koe") rm.Koe(true, o.Length > 2 ? int.Parse(o[2], CultureInfo.InvariantCulture) : 115);
                    else if (o.Length > 1 && o[1] == "pois") rm.Koe(false);
                    else if (o.Length > 2 && o[1] == "osoita")
                    {
                        if (rm.RuutuPaikka(o[2], out var mp)) kierto.Napauta(mp);
                        else Debug.LogWarning("MATKAKIRJA mastot: " + o[2] + " ei näy");
                    }
                    Debug.Log($"MATKAKIRJA mastot: {rm.Maara} mastoa, näkyvissä {rm.Nakyvia}, valoja {rm.Valoja}, valittu {rm.ValittuId ?? "-"}, " +
                              $"renkaita {rm.Renkaita}, hämärä {rm.HamaraArvo:F2}");
                    break;
                }
                case "hamara":
                    RadioMastot.Instanssi?.Hamara((float)D(1));
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
