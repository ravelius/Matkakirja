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
    ///   maasto sse <arvo>         tilesetin maximumScreenSpaceError (oletus 16; luo tilesetin uudelleen; löydös 46)
    ///   valo pois|paalle|oletus|tila | valo kulma <atsimuutti> <korkeus> | valo voima <v>   kartan rinnevalo (Aurinko)
    ///   usva pois|paalle | usva raja <k> | usva vari r g b   horisonttiusva kallistuksessa (Aurinko)
    ///   kallistus pois|paalle | kallistus katto pois|paalle   pelaajan kallistus ja horisonttiusvan katto (PalloKierto)
    ///   suodatus                  ladattujen laattojen tekstuurien suodatus lokiin
    ///   maaraja pois|paalle | maaraja paksuus <pt>|web   pelaajan maan kehä (Maaraja) mittaukseen
    ///   rannikko pois|paalle|tila | rannikko taso <0–4>|auto | rannikko syvyys pois|paalle | rannikko nosto <m> [osuus]
    ///   rannikko peitto <a>|oletus  rantaviiva vektorina (Rannikko, löydös 46 E1): taso pakottaa webin tason, syvyys pois =
    ///                             ZTest Always, nosto = syvyysnosto (oletus 200 m + 0,002 × etäisyys), peitto = lineaarinen
    ///                             alfa (oletus 0,732 = webin 0,58 sRGB-sekoituksena); tila lokiin
    ///   satelliitti <versio> [bmng|bmng-bathy] [s2|s2-alkup] | satelliitti pois   lennon pinta (oletus
    ///                             2026-09-24 bmng-bathy s2-alkup; pois = sileä sarja), voimaan seuraavalla lennolla
    ///   nimet paalle|pois|laske   alue-, meri- ja valtamerinimet (Nimikerros); laske = näkyvät nimiöt, taso ja
    ///                             ladonnan kesto lokiin. nimet valtameret paalle|pois, nimet siirto x (tasovalinta)
    ///   lentoharmaa vara|kattavuus|uv|taso|varapois|s2|sumu|satloki|normaali   harmaiden suorakulmioiden kokeilu (varjostimen
    ///                             testitilat, KarttaKerrokset.LentoTesti); lentoharmaa paikka <0|1|2> <alfa>;
    ///                             lentoharmaa usva|pilvet pois|paalle; lentoharmaa pois = kaikki normaaliksi
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

        /// <summary>
        /// Kartan rinnevalo (löydös 46, Aurinko.cs):
        ///   valo pois|paalle            build 11:n kameravalo / matala aurinko karttatilassa
        ///   valo kulma &lt;atsimuutti&gt; &lt;korkeus&gt;   auringon suunta (° pohjoisesta myötäpäivään, ° vaakatasosta; oletus 315 35)
        ///   valo voima &lt;v&gt;              suoran valon osuus (1 = ambientti ennallaan, esim. 0.8 = pehmeämpi; tasamaa ennallaan)
        ///   valo oletus | valo tila     oletusarvot takaisin / tila lokiin (intensiteetti, ambientti, N·L, usva, sumu)
        /// </summary>
        void Valo(string[] o)
        {
            double D(int i) => double.Parse(o[i], CultureInfo.InvariantCulture);
            string m = o.Length > 1 ? o[1] : "tila";
            switch (m)
            {
                case "pois": Aurinko.RinnevaloSallittu = false; break;
                case "paalle": Aurinko.RinnevaloSallittu = true; break;
                case "kulma" when o.Length > 3:
                    Aurinko.Atsimuutti = D(2);
                    Aurinko.KorkeusAst = System.Math.Max(3.0, System.Math.Min(90.0, D(3)));
                    break;
                case "voima" when o.Length > 2: Aurinko.Voima = System.Math.Max(0.0, System.Math.Min(2.0, D(2))); break;
                case "oletus":
                    Aurinko.RinnevaloSallittu = true;
                    Aurinko.Atsimuutti = Karttavalo.OletusAtsimuutti;
                    Aurinko.KorkeusAst = Karttavalo.OletusKorkeus;
                    Aurinko.Voima = Karttavalo.OletusVoima;
                    break;
            }
            var au = FindAnyObjectByType<Aurinko>();
            Debug.Log("MATKAKIRJA valo " + string.Join(" ", o, 1, o.Length - 1) + ": " + (au != null ? au.Tila() : "ei aurinkoa"));
        }

        /// <summary>
        /// Horisonttiusva kallistuksessa (löydös 46, Aurinko.cs):
        ///   usva pois|paalle    usva ja pergamenttitausta / build 11:n tumma tausta
        ///   usva raja &lt;k&gt;       rajan maapinnan matka × korkeus (webin 0.6)
        ///   usva vari r g b     sävy (sRGB 0–1 tai 0–255; oletus webin --kerma 250 244 214)
        /// </summary>
        void Usva(string[] o)
        {
            double D(int i) => double.Parse(o[i], CultureInfo.InvariantCulture);
            string m = o.Length > 1 ? o[1] : "";
            switch (m)
            {
                case "pois": Aurinko.UsvaSallittu = false; break;
                case "paalle": Aurinko.UsvaSallittu = true; break;
                case "raja" when o.Length > 2: Aurinko.UsvaRaja = System.Math.Max(0.05, System.Math.Min(5.0, D(2))); break;
                case "vari" when o.Length > 4:
                {
                    double r = D(2), g = D(3), b = D(4);
                    double k = r > 1.0 || g > 1.0 || b > 1.0 ? 1.0 / 255.0 : 1.0;
                    Aurinko.UsvaVari = new Color((float)(r * k), (float)(g * k), (float)(b * k));
                    break;
                }
            }
            var au = FindAnyObjectByType<Aurinko>();
            Debug.Log("MATKAKIRJA usva " + string.Join(" ", o, 1, o.Length - 1) + ": " + (au != null ? au.Tila() : "ei aurinkoa")
                      + $", väri {Aurinko.UsvaVari}, katto {kierto.KallistusRaja():0.0}°");
        }

        /// <summary>
        /// Rasterikerrosten suodatus lokiin (löydös 46 kohta 2): ladattujen laattojen materiaalien tekstuurit ryhmiteltyinä
        /// (suodatin, anisotropia, mipit, koko) ja QualitySettings.anisotropicFiltering. Cesium for Unity 1.25.1 tekee
        /// raster-tekstuurit itse: mipit työsäikeessä (ImageDecoder::generateMipMaps), Clamp, Trilinear, anisoLevel 16.
        /// </summary>
        void Suodatus()
        {
            var pallo = FindAnyObjectByType<CesiumForUnity.Cesium3DTileset>();
            if (pallo == null) { Debug.LogWarning("MATKAKIRJA suodatus: ei tilesetiä"); return; }
            var ryhmat = new Dictionary<string, int>();
            var nahdyt = new HashSet<Texture>();
            var idt = new List<int>();
            foreach (var r in pallo.GetComponentsInChildren<MeshRenderer>())
            {
                var mat = r.sharedMaterial;
                if (mat == null) continue;
                idt.Clear();
                mat.GetTexturePropertyNameIDs(idt);
                foreach (int id in idt)
                {
                    var t = mat.GetTexture(id);
                    if (t == null || !nahdyt.Add(t)) continue;
                    string avain = $"{t.filterMode} aniso {t.anisoLevel} mipit {t.mipmapCount} {t.width}×{t.height} {t.wrapMode}";
                    ryhmat[avain] = ryhmat.TryGetValue(avain, out int n) ? n + 1 : 1;
                }
            }
            var sb = new StringBuilder($"MATKAKIRJA suodatus: {nahdyt.Count} tekstuuria, quality aniso {QualitySettings.anisotropicFiltering}");
            foreach (var p in ryhmat) sb.Append("\n  ").Append(p.Value).Append(" × ").Append(p.Key);
            Debug.Log(sb.ToString());
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
                case "maasto" when o.Length > 2 && o[1] == "sse":
                {
                    // maasto sse <arvo>: tilesetin maximumScreenSpaceError (löydös 46 lisäys 5). Luo tilesetin uudelleen.
                    var kk = KarttaKerrokset.Instanssi;
                    float v = kk != null ? kk.MaastoSse((float)D(2)) : float.NaN;
                    Debug.Log("MATKAKIRJA maasto sse: " + v.ToString("0.##", CultureInfo.InvariantCulture)
                              + " (layer.json-maastolla Cesium jakaa 8:lla: " + (v / 8f).ToString("0.##", CultureInfo.InvariantCulture) + " px)");
                    break;
                }
                case "maasto":
                    Maasto(o[1] == "paalle");
                    break;
                case "valo":
                    Valo(o);
                    break;
                case "usva":
                    Usva(o);
                    break;
                case "kallistus":
                    // kallistus pois|paalle | kallistus katto pois|paalle (löydös 46, PalloKierto.KallistusSallittu/-KattoPaalla)
                    if (o.Length > 2 && o[1] == "katto") PalloKierto.KallistusKattoPaalla = o[2] == "paalle";
                    else if (o.Length > 1) PalloKierto.KallistusSallittu = o[1] == "paalle";
                    Debug.Log($"MATKAKIRJA kallistus: sallittu {PalloKierto.KallistusSallittu}, katto {PalloKierto.KallistusKattoPaalla}, " +
                              $"raja nyt {kierto.KallistusRaja():0.0}°, käytetty {kierto.KaytettyKallistus:0.0}°");
                    break;
                case "suodatus":
                    Suodatus();
                    break;
                case "maaraja":
                    // maaraja pois|paalle | maaraja paksuus <pt>|web (löydös 46 jatko, Maaraja.Sallittu/PaksuusPt)
                    if (o.Length > 2 && o[1] == "paksuus")
                        Maaraja.PaksuusPt = o[2] == "web" ? float.NaN : (float)D(2);
                    else if (o.Length > 1) Maaraja.Sallittu = o[1] == "paalle";
                    Debug.Log($"MATKAKIRJA maaraja: näkyvissä {Maaraja.Sallittu}, paksuus " +
                              (Maaraja.PaksuusPt > 0 ? Maaraja.PaksuusPt.ToString("0.##", CultureInfo.InvariantCulture) + " pt" : "web 1,6–3 pt") +
                              $" × pistekerroin {PalloKierto.Pistekerroin}");
                    break;
                case "rannikko":
                    // rannikko pois|paalle|tila | taso <n>|auto | syvyys pois|paalle | nosto <m> [osuus] (löydös 46 E1)
                    if (o.Length > 2 && o[1] == "taso") Rannikko.PakotettuTaso = o[2] == "auto" ? -1 : (int)D(2);
                    else if (o.Length > 2 && o[1] == "syvyys") Rannikko.Syvyystesti = o[2] == "paalle";
                    else if (o.Length > 2 && o[1] == "peitto") Rannikko.PeittoOhitus = o[2] == "oletus" ? float.NaN : (float)D(2);
                    else if (o.Length > 2 && o[1] == "nosto")
                    {
                        Rannikko.NostoM = (float)D(2);
                        if (o.Length > 3) Rannikko.NostoOsuus = (float)D(3);
                    }
                    else if (o.Length > 1 && (o[1] == "pois" || o[1] == "paalle")) Rannikko.Sallittu = o[1] == "paalle";
                    Debug.Log("MATKAKIRJA rannikko: " + (Rannikko.Instanssi != null ? Rannikko.Instanssi.Tila() : "ei kohtauksessa"));
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
