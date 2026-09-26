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
    ///   pallo rajat paalle|pois [m]   laattojen renderöijien rajat laajennettuina (k − 1) × m kaikkiin suuntiin
    ///                             (PalloReiat, löydös 119; oletus päällä, m = 9 000; päivittyy komennolla "korkeus n")
    ///   pallo tausta magenta|pois kameran tausta magentaksi piirron ajaksi (reiät kuviin; lennon skybox, tähtitaivas ja
    ///                             astronautin ilmakehä pois samalla)
    ///   pallo pohja auto|paalle|pois|tila   pergamenttinen pohjapallo 3 km ellipsoidin alla (Pohjapallo, löydös 119):
    ///                             auto (oletus) = päällä paitsi magentataustan ajan, paalle = myös magentan kanssa
    ///                             (jäljelle jäävät reiät mitattavissa), pois = ei koskaan; tila = lokiin
    ///   pallo pohja paljas paalle|pois   testitila: maastolaatat piiloon, pohjapallo näkyy kokonaan
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
    ///   palvelin                  laattapalvelimen osumat lokiin (paketti / offline / välimuisti / verkko) ja maastoluokan
    ///                             laskurit
    ///   palvelin loki paalle|pois epäonnistuneet haut lokiin: "MATKAKIRJA palvelin virhe luokka polku koodi yritykset ms
    ///                             seuraus" (löydös 119)
    ///   palvelin maastouusinta paalle|pois   maastolaattaa ei palauteta Cesiumille virheenä verkkovirheen takia, vaan
    ///                             uusitaan 0,5–8 s:n välein niin kauan kuin Cesium odottaa (oletus päällä; löydös 119)
    ///   valmius seuraa [s]        pallon valmiusasteen seuranta lokiin 0,5 s välein (oletus 30 s; Valmius.cs, löydös 80):
    ///                             ComputeLoadProgress, Cesiumin valintatilasto, raster-kerrokset, palvelimen jonot, kameran liike
    ///   valmius auto paalle [s] | valmius auto pois   sama seuranta aloitusverhon ja mustan verhon alussa (PlayerPrefs
    ///                             matkakirja-valmius-auto tai Documents/valmius-auto.txt, oletus 12 s; voimaan seuraavista
    ///                             verhoista, myös käynnistyksessä; simulaattorissa xcrun simctl spawn &lt;UDID&gt; defaults write …)
    ///   valmius tila | valmius pois   yksi näyte heti / käynnissä olevat seurannat loppuun (yhteenveto)
    ///   saapuminen vartija paalle|pois|tila   löydös 171 (Saapumisvartija): korjaus (kohdemaan näkymä kiireellä lennon aikana,
    ///                             saapumistila, lennon hidastus) A/B-mittaukseen; muistetaan (PlayerPrefs matkakirja-saapumisvartija
    ///                             tai Documents/saapumisvartija-pois.txt). Mittausrivit "VARTIJA 171" tulevat aina.
    ///   valmius kevennys pois|paalle   verhon kevennys (Laattapalvelin: näkyvä jono 24 rinnakkain, tausta tauolla) pois
    ///                             A/B-mittaukseen; muistetaan (PlayerPrefs matkakirja-valmius-kevennys-pois tai
    ///                             Documents/valmius-kevennys-pois.txt), voimaan seuraavista verhoista
    ///   valot <aihe>|kaikki|ei|tila     karttavalot (AiheValot), tila = laskurit lokiin
    ///   valot osoita <id>               napauttaa valon kohtaa (esim. skandaali:shakkiturkkilainen)
    ///   maakunta <ISO3:tunnus>|pois|tila | maakunta maa ISO3|pois   maakunnan värjäys (B17); maa = pakotettu kerroksen maa
    ///   maat paalle|pois | maat korosta ISO3 [#täyttö #raja] | maat pois-korostus   Maatila (MaaKartta)
    ///   lentokaaret lähtö kohde … | lentokaaret pois   lentolistan kaaret + kameran sovitus (Reitit)
    ///   nappula aseta lat lon | aja lat lon … kesto | lenna lat0 lon0 lat1 lon1 kesto | aloitus lat0 lon0 lat1 lon1 kesto | pois
    ///   kamerareitti paalle|pois  lennon oikea kamera 0,1 s:n näytteinä lokiin lennon lopussa (nopeus m/s, kulmanopeus °/s,
    ///                             HYPPY/KULMAHYPPY = muutos yli 3 × ympäröivien keskiarvo; löydös 120, LennonKamerareitti)
    ///   piste <id> lat lon [lukittu] | piste pois <id>   pelin karttapiste (vihreä)
    ///   napauta x y               synteettinen napautus (osuus näytöstä, origo vasen alakulma)
    ///   portti paalle|pois        aloitusportin pallo (PalloKierto.PorttiSumea): sumennus 6 pt, täyttö, kierto
    ///   etusivu aika <s> [pysayta] | etusivu pysayta|jatka|tila | etusivu sumennus pois|paalle   portin etusivun
    ///                             lento (löydös 112): hyppy kierroksen hetkeen s (0–49,62; web julisteAika 17.833),
    ///                             aika seis/jatkuu, kerroksen blur(6 pt) pois vertailuun; jokainen rivi kirjaa tilan lokiin
    ///   renkaat id,id,… [valittu] | renkaat pois   aloitusvalinnan huomiorenkaat (KaupunkiMerkit.Renkaat)
    ///   maasto paalle|pois        Karttasepän maasto (layer.json) tai ellipsoidi; valinta
    ///                             muistetaan tiedostossa Documents/maasto.txt
    ///   korkeus <kerroin>         korkeuserojen liioittelu heti (KorkeusKerroin, 1–3, oletus 2; ei tallennu)
    ///   maasto sse <arvo>         tilesetin maximumScreenSpaceError (oletus 16; luo tilesetin uudelleen; löydös 46)
    ///   maasto liike 32|16|pois|tila   liikkeen laattavalinnan SSE-vastine (LiikeLaatat, löydös S10; oletus 32): eleissä,
    ///                             liu'ussa ja kamera-ajoissa (ei saapumisessa, lennossa eikä verhossa) Cesium valitsee
    ///                             laatat varjokameralla, jonka pikselikoko on pohja-SSE / arvo; 16 = varjo täysikokoisena
    ///                             (mekanismin kontrolli), pois = aina pääkamera; tila lokiin. Ei luo tilesetiä uudelleen
    ///   ruutu liike 120|60|pois|tila   Ruudunpaivityksen TÄYDEN tilan katto (löydös S10 A/B; pois = näytön taajuus)
    ///   valo pois|paalle|oletus|tila | valo kulma <atsimuutti> <korkeus> | valo voima <v>   kartan rinnevalo (Aurinko)
    ///   usva pois|paalle | usva raja <k> | usva vari r g b   horisonttiusva kallistuksessa (Aurinko)
    ///   symbolit tila|pois|paalle|loydetty|himmea|koko <pt>   nostojen 3D-mallit (Symbolimallit, löydös 160); tila = taso 1
    ///                             (erikoismallit, arkkityypit), tasot 2–3 (instanssit tyypeittäin, LOD, piirtokutsut) ja
    ///                             arkkityyppien kolmiot LOD0/LOD1
    ///   symbolit taso23 0|1       tasojen 2–3 arkkityypit pois/päälle (A/B-mittaus, oletus 1)
    ///   symbolit ylhaalta 3d|2d   1.0.27-kokeilu: 3d = Linna, Kirkko ja Majakka myös pystysuorasta ja mallien oma kallistus
    ///                             (oletus kokeiluhaarassa), 2d = 1.0.26:n sääntö (mallit vasta kallistuksesta 25°)
    ///   symbolit iso <aste>       mallin oma kallistus pystysuorassa kamerassa (0–30, oletus 15; häivytys kallistuksella 25–35°)
    ///   symbolit reuna <pt>       mallien ääriviivan leveys ruudulla (0–4 pt, oletus 1,2; 0 = pois)
    ///   symbolit kategoriat 1|0   kategoriasymbolit reliefeinä (oletus 1; tämä erä Kaari = historia ja Vuori) vai arkkityypit (A/B)
    ///   symbolit kategoriat ruutu|pohjoinen   reliefin ylös-suunta: ruudun ylös (oletus, kuten 2D-merkki) vai pohjoinen
    ///   lipputanko tila|pois|koe [lat lon]|koko <pt>|jatkuva|syke   kohdemaan lipputanko (Lipputanko, löydös 161; koe = testilippu)
    ///   taivas kartta pois|utu|vaalea|sini|r g b [voima] [kaari]   kallistetun kartan taivas usvan yllä (Karttataivas,
    ///                             löydös 154; oletus utu, omistaja 26.9.)
    ///   kallistus pois|paalle | kallistus katto pois|paalle   pelaajan kallistus ja horisonttiusvan katto (PalloKierto)
    ///   suodatus                  ladattujen laattojen tekstuurien suodatus lokiin
    ///   maaraja pois|paalle|auto | maaraja paksuus <pt>|web   pelaajan maan kehä (Maaraja); auto = vain kun vektoriranta
    ///                             ei piirry (omistaja 25.9.), paalle = aina vertailuun
    ///   maaraja paino web|kevyt|kevein|oletus | maaraja rengas paalle|pois   kehän paino (löydös 127: oletus kevyt,
    ///                             web = build 16:n korostus) ja koko rengas rannikkoineen vertailuun (oletus pois =
    ///                             vain Karttasepän maa–maa-rajat)
    ///   vari sarja p080|p060|p045|oletus|<versio>   kermahunnun sarja (löydös 128, Varitaso.Versio; peitto on poltettu
    ///                             sarjaan, oletus 2026-09-26-p060, omistaja 26.9.); vari <ISO3>|pelaaja|pois|paalle|alin <z> kuten ennen
    ///   rajat pois|paalle|tila | rajat taso <0–4>|auto | rajat peitto <a>|oletus   valtioiden rajat vektorina (Rajat, E2)
    ///   vektorit versio <nimi>|web|oletus   rannikko- ja rajasarjan versio (oletus 2026-09-25-gshhs-korkeus, web =
    ///                             2026-09-21-gshhs ilman korkeuksia); luettelo ja solut ladataan uudelleen
    ///   rannikko pois|paalle|tila | rannikko taso <0–4>|auto | rannikko syvyys pois|paalle | rannikko nosto <m> [osuus]
    ///   rannikko peitto <a>|oletus  rantaviiva vektorina (Rannikko, löydös 46 E1; löydös 126: oletuksena POIS, paalle =
    ///                             vertailuun): taso pakottaa webin tason, syvyys pois = ZTest Always, nosto = syvyysnosto
    ///                             (oletus 200 m + 0,002 × etäisyys), peitto = lineaarinen alfa (oletus 0,25 = omistajan
    ///                             himmeä, web = 0,732 eli webin 0,58 sRGB-sekoituksena); tila lokiin
    ///   satelliitti <versio> [bmng|bmng-bathy] [s2|s2-alkup] | satelliitti pois   lennon pinta (oletus
    ///                             2026-09-24 bmng-bathy s2-alkup; pois = sileä sarja), voimaan seuraavalla lennolla
    ///   nimet paalle|pois|laske   alue-, meri- ja valtamerinimet (Nimikerros); laske = näkyvät nimiöt, taso ja
    ///                             ladonnan kesto lokiin. nimet valtameret paalle|pois, nimet siirto x (tasovalinta)
    ///   nostot tila [ISO3] | nostot maa <ISO3|pois>   nostokerroksen portit lokiin (NostoKerros.Kuvaus): näkyvät,
    ///                             piilotetut syineen (kaupunki nimi/12 km, meri, taso 3, ruutu, katto), uloin osuus,
    ///                             lähizoomi ja ZoomKerroin; maa = pakotettu maa (NostoKerros.Maa); lisäksi minimerkit
    ///                             ja lajin puute datassa (löydös 125)
    ///   nostot kerroin <k> [lat lon] [s]   kamera korkeuteen, jossa kartan mittakerroin on k (saapumiskorkeus / k;
    ///                             webin portaat 1, 2 ja 3,13 kuvapariin, löydös 125), keskipiste lat lon tai nykyinen
    ///   nostot nimio reuna <O> [leveys px] | nostot nimio pohja <U>   nimiön reunan vahvistus samalla musteella
    ///                             (NostoKerros.NimionReunaPeitto: SDF-ääriviivan peitto, oletus 0,65, leveys 0,05 px;
    ///                             NimionPohjaPeitto: siirtymätön varjo, oletus 0; 0 = pois), heti (NostoKerros.Herata)
    ///   lentoharmaa vara|kattavuus|uv|taso|varapois|s2|sumu|satloki|normaali   harmaiden suorakulmioiden kokeilu (varjostimen
    ///                             testitilat, KarttaKerrokset.LentoTesti); lentoharmaa paikka <0|1|2> <alfa>;
    ///                             lentoharmaa usva|pilvet pois|paalle; lentoharmaa pois = kaikki normaaliksi
    ///   mastot koe [n] | mastot pois   radiomastojen kokeilu ilman radiolinssiä (RadioMastot.Koe): n kaupunkia
    ///                             (oletus 115), koot vuorotellen, joka viides kanavaton, hämärä 1, valittu lähin,
    ///                             VU-tahtia jäljittelevä kirkkaus ja renkaat
    ///   mastot tila               mastot, näkyvät, valot, valittu, renkaat ja hämärä lokiin
    ///   mastot osoita <id>        napauttaa maston puoliväliä (napautuksen päästä päähän -testi)
    ///   mastot yovalot <voimakkuus> [suodatettu|raaka]   yövalojen voimakkuus (oletus 0,85) ja painon lähde heti
    ///                             (suodatettu = poltossa leivottu w, varjostin käyttää luminanssia; RadioMastot.PaivitaYovalot)
    ///   hamara <0–1>              radion hämärä suoraan (tileset, napakannet, mastot, tausta)
    ///   valokeila lat lon sadeKm [pehmeys] [hamaryys] [kesto]   valokeila kohtaan, muu pallo hämärä (KarttaKerrokset.Valokeila;
    ///                             oletus pehmeys 0,35, hämäryys 0,6, kesto 1,2 s); päällä olevana liukuu isoympyrää pitkin
    ///   valokeila toinen lat lon sadeKm [voimakkuus] [kesto] | valokeila toinen pois [kesto]   toinen keila (oletus 0,6)
    ///   valokeila vari <K> [osuus] [kirkkaus] [kesto]   molempien keilojen värilämpötila (osuus 0–1 valkoisen päällä,
    ///                             oletus 3200 K × 0,5) ja keskustan lisäkirkkaus 0–0,3 (oletus 0,12)
    ///   valokeila pois [kesto] | valokeila tila   keilat pois (oletus 1,2 s) / tila lokiin
    ///   linssisiirto dx dy [kesto] | linssisiirto pois [kesto]   katsekohde ruudulla dx oikealle, dy ylös ruudun osuuksina
    ///                             (KarttaKerrokset.Linssisiirto; oletus kesto 0,8 s)
    ///   s2meri r g b kynnys       Sentinelin meren värjäys heti (sRGB 0–1 tai 0–255; kynnys = sRGB-luma, 0 = pois;
    ///                             oletus 17 46 92 0.18)
    ///   pallo lepo                pallon lepotila ja syy lokiin (PallonLepo: kamera, tilesetit, palvelin, herätys ja
    ///                             käynnissä olevat kartan animaatiot); ei herätä palloa
    ///   huntu paljastus <lat> <lon> <km> [reuna km] | huntu paljastus pois   elävän kartan hunnun kuivuminen (Varitaso.Paljastus)
    ///   hdr pois|paalle|oletus|tila   pallon kameran HDR (LampoSaadot; oletus ennallaan päällä) kuvapariin
    ///   varjot pois|auto|paalle|tila  päävalon varjot (LampoSaadot; oletus pois = nykyinen ilme, auto = vain kun
    ///                             maamerkki on ruudulla, varjokartan etäisyys maamerkeistä)
    ///   syke jaatyy|jatkuva|oletus|tila  jatkuvien idle-animaatioiden jäädytys levossa (Joutosyke; oletus jatkuva
    ///                             kehyksen hinta -erästä alkaen, jaatyy = 3 s levon jälkeen keskiasentoon); tila lokiin
    ///   piilo tila|pois|paalle    piilotettujen UI-alipuiden suotimet (PiiloVartija): poistot, piilossa piirrettävät ja
    ///                             vartijan hinta lokiin; pois palauttaa suotimet
    ///   liput tila|jatkuva|syke   aaltoilevat liput (Liput, löydös 144): tila lokiin; jatkuva = oma kello ja täysi voima
    ///                             aina näkyvissä, syke = seuraa Joutosykettä (oletus: levossa asettuu suoraksi)
    ///   liput koe nimi [aika]     koelippu (raidat + ruudukko) aaltoon hetkellä aika (s, oletus 0,8), kuva
    ///                             Documents/nimi.png (120 × 80): varjostimen tarkistus laitteella ilman UI:ta
    /// Jokainen muu komento herättää pallon hetkeksi (PallonLepo.Muuttui), jotta muutos piirtyy heti myös lepopiirrossa,
    /// ja kuva piirtää tuoreen kehyksen (Ruudunpaivitys.Herata).
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

        /// <summary>
        /// valokeila lat lon sadeKm [pehmeys] [hamaryys] [kesto] | toinen lat lon sadeKm [voimakkuus] [kesto] | toinen pois [kesto]
        /// | vari K [osuus] [kirkkaus] [kesto] | pois [kesto] | tila (KarttaKerrokset.Valokeila, Ihmisen matka II).
        /// </summary>
        static void Valokeila(string[] o, System.Func<int, double> D)
        {
            float F(int i, float oletus) => o.Length > i ? (float)D(i) : oletus;
            const float Kesto = 1.2f;
            var paa = KarttaKerrokset.PaaKeila;
            switch (o[1])
            {
                case "pois":
                    KarttaKerrokset.ValokeilaPois(F(2, Kesto));
                    break;
                case "tila":
                    break;
                case "toinen" when o.Length > 2 && o[2] == "pois":
                    if (paa.HasValue) KarttaKerrokset.Valokeila(paa.Value, null, KarttaKerrokset.KeilanHamaryys, F(3, Kesto));
                    break;
                case "toinen" when o.Length > 4:
                {
                    if (!paa.HasValue) { Debug.LogWarning("MATKAKIRJA valokeila: toinen vaatii pääkeilan"); break; }
                    var p = paa.Value;
                    var t = new KarttaKerrokset.Keila(D(2), D(3), (float)D(4), p.pehmeys, p.vari, p.kirkkaus, F(5, 0.6f));
                    KarttaKerrokset.Valokeila(p, t, KarttaKerrokset.KeilanHamaryys, F(6, Kesto));
                    break;
                }
                case "vari" when o.Length > 2:
                {
                    if (!paa.HasValue) { Debug.LogWarning("MATKAKIRJA valokeila: vari vaatii pääkeilan"); break; }
                    var vari = KarttaKerrokset.KelvinVari((float)D(2), F(3, KarttaKerrokset.LyhdynSavy));
                    float kirkkaus = F(4, paa.Value.kirkkaus);
                    var p = paa.Value; p.vari = vari; p.kirkkaus = kirkkaus;
                    KarttaKerrokset.Keila? t = KarttaKerrokset.ToinenKeila;
                    if (t.HasValue) { var tt = t.Value; tt.vari = vari; tt.kirkkaus = kirkkaus; t = tt; }
                    KarttaKerrokset.Valokeila(p, t, KarttaKerrokset.KeilanHamaryys, F(5, Kesto));
                    break;
                }
                default:
                    if (o.Length < 4) { Debug.LogWarning("MATKAKIRJA valokeila: lat lon sadeKm puuttuu"); break; }
                    KarttaKerrokset.Valokeila(D(1), D(2), (float)D(3), F(4, 0.35f), F(5, 0.6f), F(6, Kesto));
                    break;
            }
            Debug.Log("MATKAKIRJA valokeila: " + KarttaKerrokset.ValokeilaKuvaus());
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
                    // Lepopiirrossa (Ruudunpaivitys PAIKALLAAN) kehys piirretään vain 2 s välein: kaappaukseen tuore kehys.
                    Ruudunpaivitys.Herata(0.5f);
                    // Mobiilissa polku on suhteellinen persistentDataPathiin.
                    ScreenCapture.CaptureScreenshot(Application.isMobilePlatform
                        ? o[1] + ".png" : Path.Combine(Application.persistentDataPath, o[1] + ".png"));
                    break;
                case "huntu" when o.Length > 1 && o[1] == "paljastus":
                {
                    // Elävä kartta (build 19): huntu paljastus <lat> <lon> <säde km> [reuna km] | huntu paljastus pois
                    if (o.Length > 2 && o[2] == "pois") { Varitaso.PaljastusPois(); Debug.Log("MATKAKIRJA huntu: paljastus pois"); break; }
                    var ic = CultureInfo.InvariantCulture;
                    if (o.Length < 5 || !double.TryParse(o[2], NumberStyles.Float, ic, out double plat)
                        || !double.TryParse(o[3], NumberStyles.Float, ic, out double plon)
                        || !double.TryParse(o[4], NumberStyles.Float, ic, out double pkm))
                    { Debug.LogWarning("MATKAKIRJA komento: huntu paljastus <lat> <lon> <säde km> [reuna km] | pois"); break; }
                    double preuna = o.Length > 5 && double.TryParse(o[5], NumberStyles.Float, ic, out double r5) ? r5 : 40.0;
                    Varitaso.Paljastus(plat, plon, pkm, preuna);
                    Debug.Log($"MATKAKIRJA huntu: paljastus ({plat}, {plon}) säde {pkm} km, reuna {preuna} km");
                    break;
                }
                case "naytto":
                    // naytto valvo|oletus: näyttö ei lukitu mittausten aikana (löydös 161 A/B, 10 min lepojaksot)
                    Screen.sleepTimeout = o.Length > 1 && o[1] == "valvo" ? SleepTimeout.NeverSleep : SleepTimeout.SystemSetting;
                    Debug.Log("MATKAKIRJA naytto: sleepTimeout " + Screen.sleepTimeout);
                    break;
                case "pallo" when o.Length > 1 && o[1] == "kerros":
                {
                    // pallo kerros tila|pois|paalle|pakota taysi|kerros|auto (elävä kerros, löydös 161 B)
                    string m = o.Length > 2 ? o[2] : "tila";
                    if (m == "pois" || m == "paalle") ElavaKerros.Kaytossa = m == "paalle";
                    else if (m == "pakota" && o.Length > 3)
                        ElavaKerros.Pakota = o[3] == "taysi" ? ElavaKerros.Pakotus.Taysi : o[3] == "kerros" ? ElavaKerros.Pakotus.Kerros : ElavaKerros.Pakotus.Auto;
                    PallonLepo.Muuttui("pallo kerros");
                    Debug.Log("MATKAKIRJA pallo kerros " + m + ": " + ElavaKerros.Kuvaus());
                    break;
                }
                case "pallo" when o.Length > 1 && o[1] == "lepo":
                    // Lämpöerä: pallon lepotila ja syy (PallonLepo.Kuvaus); ei herätä palloa (ks. loppu).
                    Debug.Log(PallonLepo.Kuvaus());
                    break;
                case "hdr":
                {
                    // hdr pois|paalle|oletus|tila (LampoSaadot, kuvapari): oletus = ennallaan päällä (HdrOletus).
                    string m = o.Length > 1 ? o[1] : "tila";
                    var p = Lampopaatos.PaalleTaiPois(m);
                    if (p.HasValue) LampoSaadot.Hdr = p.Value;
                    else if (m == "oletus") LampoSaadot.Hdr = LampoSaadot.HdrOletus;
                    else if (m != "tila") { Debug.LogWarning("MATKAKIRJA komento: hdr pois|paalle|oletus|tila, ei " + m); return; }
                    Debug.Log("MATKAKIRJA lämpösäädöt: " + LampoSaadot.Kuvaus());
                    break;
                }
                case "varjot":
                {
                    // varjot pois|auto|paalle|tila (LampoSaadot, kuvapari): oletus pois (nykyinen ilme, VarjoOletus).
                    string m = o.Length > 1 ? o[1] : "tila";
                    var t = Lampopaatos.VarjoTilaksi(m);
                    if (t.HasValue) LampoSaadot.Varjot = t.Value;
                    else if (m == "oletus") LampoSaadot.Varjot = LampoSaadot.VarjoOletus;
                    else if (m != "tila") { Debug.LogWarning("MATKAKIRJA komento: varjot pois|auto|paalle|oletus|tila, ei " + m); return; }
                    Debug.Log("MATKAKIRJA lämpösäädöt: " + LampoSaadot.Kuvaus());
                    break;
                }
                case "syke":
                {
                    // syke jaatyy|jatkuva|oletus|tila (Joutosyke, Fable 25.9. klo 20.1x): idle-animaatioiden jäädytys levossa.
                    string m = o.Length > 1 ? o[1] : "tila";
                    if (m == "jaatyy" || m == "jäätyy") Joutosyke.Jaatyy = true;
                    else if (m == "jatkuva") Joutosyke.Jaatyy = false;
                    else if (m == "oletus") Joutosyke.Jaatyy = Lampopaatos.SykeJaatyy;
                    else if (m != "tila") { Debug.LogWarning("MATKAKIRJA komento: syke jaatyy|jatkuva|oletus|tila, ei " + m); return; }
                    Debug.Log("MATKAKIRJA joutosyke: " + Joutosyke.Kuvaus());
                    break;
                }
                case "piilo":
                {
                    // piilo tila|pois|paalle (PiiloVartija, kehyksen hinta -erä 25.9.): piilotettujen alipuiden suotimet.
                    string m = o.Length > 1 ? o[1] : "tila";
                    if (m == "pois" || m == "paalle") PiiloVartija.Paalla = m == "paalle";
                    else if (m != "tila") { Debug.LogWarning("MATKAKIRJA komento: piilo tila|pois|paalle, ei " + m); return; }
                    Debug.Log(PiiloVartija.Instanssi != null ? PiiloVartija.Instanssi.Kuvaus() : "MATKAKIRJA piilovartija: ei käynnissä");
                    break;
                }
                case "liput":
                {
                    // Löydös 144 (Liput.cs): aaltoilevien lippujen tila, kello ja laitekoe.
                    string m = o.Length > 1 ? o[1] : "tila";
                    if (m == "jatkuva") Liput.SeuraaSyketta = false;
                    else if (m == "syke") Liput.SeuraaSyketta = true;
                    else if (m == "koe" && o.Length > 2)
                    {
                        Debug.Log("MATKAKIRJA " + Liput.Koe(Path.Combine(Application.persistentDataPath, o[2] + ".png"),
                            o.Length > 3 ? (float)D(3) : 0.8f));
                        break;
                    }
                    else if (m != "tila") { Debug.LogWarning("MATKAKIRJA komento: liput tila|jatkuva|syke|koe nimi [aika], ei " + m); return; }
                    Debug.Log("MATKAKIRJA " + Liput.Kuvaus());
                    break;
                }
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
                case "pallo" when o.Length > 2 && o[1] == "rajat":
                    // pallo rajat paalle|pois [m]: laattojen rajat korkeuskertoimen mukaan (löydös 119, PalloReiat)
                    PalloReiat.Rajat(o[2] == "paalle", o.Length > 3 ? (float)D(3) : float.NaN);
                    Debug.Log(PalloReiat.Kuvaus());
                    break;
                case "pallo" when o.Length > 2 && o[1] == "tausta":
                    // pallo tausta magenta|pois: reiät erottuvat kuvissa (löydös 119, PalloReiat)
                    PalloReiat.Magenta = o[2] == "magenta";
                    Debug.Log(PalloReiat.Kuvaus());
                    break;
                case "pallo" when o.Length > 2 && o[1] == "pohja":
                    // pallo pohja auto|paalle|pois|tila | pallo pohja paljas paalle|pois: pergamenttinen pohjapallo
                    // (löydös 119, Pohjapallo); paljas = testitila, maastolaatat piiloon
                    if (o[2] == "paljas") Pohjapallo.Paljas = o.Length > 3 && o[3] == "paalle";
                    else if (o[2] == "auto") Pohjapallo.Tila = Pohjapallolaskenta.Tila.Auto;
                    else if (o[2] == "paalle") Pohjapallo.Tila = Pohjapallolaskenta.Tila.Paalle;
                    else if (o[2] == "pois") Pohjapallo.Tila = Pohjapallolaskenta.Tila.Pois;
                    Pohjapallo.Instanssi?.Paivita();
                    Debug.Log(Pohjapallo.Kuvaus());
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
                case "kamerareitti":
                    Nappula.KamerareittiLoki = o.Length < 2 || o[1] != "pois";
                    Debug.Log($"MATKAKIRJA kamerareitti: loki {(Nappula.KamerareittiLoki ? "päällä" : "pois")}");
                    break;
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
                case "etusivu" when o.Length > 1:
                {
                    // etusivu aika <s> [pysayta] | pysayta | jatka | sumennus pois|paalle | tila (löydös 112, Etusivulento).
                    switch (o[1])
                    {
                        case "aika" when o.Length > 2:
                            kierto.AsetaPorttiAika(D(2));
                            PalloKierto.PorttiAikaSeis = o.Length > 3 && o[3] == "pysayta";
                            break;
                        case "pysayta": PalloKierto.PorttiAikaSeis = true; break;
                        case "jatka": PalloKierto.PorttiAikaSeis = false; break;
                        case "sumennus" when o.Length > 2: Etusivulento.Sumea = o[2] != "pois"; break;
                    }
                    var lento = kierto.GetComponent<Etusivulento>();
                    // Tila kirjataan vasta tämän kehyksen projektion jälkeen (Etusivulento.LateUpdate).
                    if (lento != null) lento.KirjaaTila = true;
                    else Debug.Log($"MATKAKIRJA etusivu: t {kierto.PorttiAika:0.000} s (kerros luodaan portissa)");
                    break;
                }
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
                case "maasto" when o.Length > 1 && o[1] == "liike":
                {
                    // maasto liike <arvo>|pois|tila (löydös S10): liikkeen SSE-vastine varjokameralla, ei uudelleenluontia.
                    if (o.Length > 2 && o[2] != "tila")
                    {
                        var v = LiikeLaatatPaatos.LueSse(o[2]);
                        if (v.HasValue) LiikeLaatat.Sse = v.Value;
                        else Debug.LogWarning("MATKAKIRJA komento: maasto liike <1–128>|pois|tila");
                    }
                    Debug.Log("MATKAKIRJA maasto liike: " + LiikeLaatat.Kuvaus());
                    break;
                }
                case "ruutu" when o.Length > 1 && o[1] == "liike":
                {
                    // ruutu liike <hz>|pois|tila (löydös S10): TÄYDEN tilan katto liikkeen A/B-mittaukseen (Ruudunpaivitys).
                    if (o.Length > 2 && o[2] != "tila")
                    {
                        var k = LiikeLaatatPaatos.LueKatto(o[2]);
                        if (k.HasValue) Ruudunpaivitys.LiikeKatto = k.Value;
                        else Debug.LogWarning("MATKAKIRJA komento: ruutu liike <20–240>|pois|tila");
                    }
                    var rp = Ruudunpaivitys.Instanssi;
                    Debug.Log("MATKAKIRJA ruutu liike: katto " + (Ruudunpaivitys.LiikeKatto > 0 ? Ruudunpaivitys.LiikeKatto + " Hz" : "ei (näytön taajuus)")
                              + "; " + (rp != null ? rp.Kuvaus() : "ei ruudunpäivitystä"));
                    break;
                }
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
                case "symbolit":
                {
                    // symbolit tila|pois|paalle|koko <pt>|taso23 0|1 (löydös 160, 3D-symbolinostot)
                    string m = o.Length > 1 ? o[1] : "tila";
                    if (m == "pois" || m == "paalle") Symbolimallit.Paalla = m == "paalle";
                    else if (m == "taso23" && o.Length > 2) Symbolimallit.Taso23 = o[2] != "0" && o[2] != "pois";
                    else if (m == "loydetty" || m == "himmea") Symbolimallit.PakotaLoydetty = m == "loydetty";
                    else if (m == "koko" && o.Length > 2) Symbolimallit.KokoPt = float.Parse(o[2], CultureInfo.InvariantCulture);
                    else Symbolimallit.Komento(o);   // 1.0.27-kokeilu: ylhaalta 3d|2d, iso <aste>, reuna <pt>, kategoriat 1|0|ruutu|pohjoinen
                    // Natiivi-UI kysyy OnMallia merkkejä päivittäessään: näytettävät uudelleen, jotta 2D-merkit palaavat tai lähtevät.
                    if (m != "tila") NostoKerros.Instanssi?.Herata();
                    PallonLepo.Muuttui("symbolit");
                    Debug.Log("MATKAKIRJA symbolit " + m + ": " + Symbolimallit.Tila());
                    break;
                }
                case "lipputanko":
                {
                    // lipputanko tila | pois | koe [lat lon] | koko <pt> (löydös 161)
                    string m = o.Length > 1 ? o[1] : "tila";
                    if (m == "pois") Lipputanko.Pois();
                    else if (m == "jatkuva" || m == "syke") Lipputanko.AsetaJatkuva(m == "jatkuva");
                    else if (m == "koko" && o.Length > 2) Lipputanko.KorkeusPt = float.Parse(o[2], CultureInfo.InvariantCulture);
                    else if (m == "koe")
                    {
                        double la = o.Length > 3 ? double.Parse(o[2], CultureInfo.InvariantCulture) : 37.98;
                        double lo = o.Length > 3 ? double.Parse(o[3], CultureInfo.InvariantCulture) : 23.73;
                        Lipputanko.Aseta("GRC", la, lo, Lipputanko.Koelippu());
                    }
                    Debug.Log("MATKAKIRJA lipputanko " + m + ": " + Lipputanko.Tila());
                    break;
                }
                case "taivas" when o.Length > 2 && o[1] == "kartta":
                {
                    // taivas kartta pois|utu|vaalea|sini|r g b [voima] [kaari] (löydös 154)
                    double Luku(int i) => double.Parse(o[i], CultureInfo.InvariantCulture);
                    int loput = 3;
                    switch (o[2])
                    {
                        case "pois": Karttataivas.Savy = null; break;
                        case "utu": Karttataivas.Savy = Karttataivas.Utu; break;
                        case "vaalea": Karttataivas.Savy = Karttataivas.Vaalea; break;
                        case "sini": Karttataivas.Savy = Karttataivas.Sini; break;
                        default:
                            if (o.Length > 4)
                            {
                                double r = Luku(2), g = Luku(3), b = Luku(4);
                                double k = r > 1.0 || g > 1.0 || b > 1.0 ? 1.0 / 255.0 : 1.0;
                                Karttataivas.Savy = new Color((float)(r * k), (float)(g * k), (float)(b * k));
                                loput = 5;
                            }
                            break;
                    }
                    if (o.Length > loput) Karttataivas.Voima = Mathf.Clamp01((float)Luku(loput));
                    if (o.Length > loput + 1) Karttataivas.Kaari = Mathf.Clamp((float)Luku(loput + 1), 0.1f, 5f);
                    Debug.Log("MATKAKIRJA taivas kartta: " + Karttataivas.Tila());
                    break;
                }
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
                    // maaraja pois|paalle|auto | maaraja paksuus <pt>|web (löydös 46 jatko ja E2, Maaraja.Sallittu/Pakota/PaksuusPt):
                    // auto (oletus) = kehä vain, kun vektoriranta ei piirry; paalle = aina (vertailuun); pois = ei koskaan.
                    // maaraja paino web|kevyt|kevein|oletus | maaraja rengas paalle|pois (löydös 127, Maaraja.Paino/KokoRengas).
                    if (o.Length > 2 && o[1] == "paksuus")
                        Maaraja.PaksuusPt = o[2] == "web" ? float.NaN : (float)D(2);
                    else if (o.Length > 2 && o[1] == "paino")
                    {
                        if (o[2] == "oletus") Maaraja.Paino = Maaraja.OletusPaino;
                        else if (Viivaleveys.LueKehanPaino(o[2], out var paino)) Maaraja.Paino = paino;
                        else Debug.LogWarning("MATKAKIRJA komento: maaraja paino web|kevyt|kevein|oletus, ei " + o[2]);
                    }
                    else if (o.Length > 2 && o[1] == "rengas") Maaraja.KokoRengas = o[2] == "paalle";
                    else if (o.Length > 1) { Maaraja.Sallittu = o[1] != "pois"; Maaraja.Pakota = o[1] == "paalle"; }
                    Debug.Log($"MATKAKIRJA maaraja: sallittu {Maaraja.Sallittu}, pakotettu {Maaraja.Pakota}, " +
                              $"rannikko piirtyy {(Rannikko.Instanssi != null && Rannikko.Instanssi.Piirtyy)}, " +
                              $"{(Maaraja.KokoRengas ? "koko rengas" : "maa–maa-rajat")}, paino {Maaraja.Paino} " +
                              $"(peitto {Viivaleveys.KehaPeitto(Maaraja.Paino).ToString("0.##", CultureInfo.InvariantCulture)} web, " +
                              $"{Viivaleveys.KehaPeittoNatiivi(Maaraja.Paino).ToString("0.###", CultureInfo.InvariantCulture)} natiivi), paksuus " +
                              (Maaraja.PaksuusPt > 0 ? Maaraja.PaksuusPt.ToString("0.##", CultureInfo.InvariantCulture) + " pt"
                                  : Viivaleveys.KehaPt(0, double.NaN, Maaraja.Paino).ToString("0.##", CultureInfo.InvariantCulture) + "–" +
                                    Viivaleveys.KehaPt(1e9, double.NaN, Maaraja.Paino).ToString("0.##", CultureInfo.InvariantCulture) + " pt") +
                              $" × pistekerroin {PalloKierto.Pistekerroin}");
                    break;
                case "vektorit":
                    // vektorit versio <nimi>|web|oletus (löydös 46: rajakorkeussarja oletuksena, webin sarja vertailuun)
                    if (o.Length > 2 && o[1] == "versio") Vektorikerros.AsetaVersio(o[2]);
                    Debug.Log($"MATKAKIRJA vektorit: versio {Vektorikerros.Versio} (oletus {Vektorikerros.OletusVersio}), " +
                              $"luettelo {(Vektorikerros.Luettelo != null ? Vektorikerros.Luettelo.Versio : "lataamatta")}");
                    break;
                case "rannikko":
                case "rajat":
                {
                    // rannikko|rajat pois|paalle|tila | taso <n>|auto | peitto <a>|oletus; rannikko syvyys pois|paalle |
                    // rannikko nosto <m> [osuus] (yhteiset molemmille; löydös 46 E1–E2)
                    bool ranta = o[0] == "rannikko";
                    if (o.Length > 2 && o[1] == "taso")
                    {
                        int t = o[2] == "auto" ? -1 : (int)D(2);
                        if (ranta) Rannikko.PakotettuTaso = t; else Rajat.PakotettuTaso = t;
                    }
                    else if (o.Length > 2 && o[1] == "peitto")
                    {
                        // "web" = webin voima (lineaarikorjattu); "oletus" = omistajan valinta (rannikko 0,25, rajat web).
                        float p = o[2] == "oletus" ? float.NaN
                            : o[2] == "web" ? (ranta ? Rannikko.PeittoNatiivi : Rajat.PeittoNatiivi) : (float)D(2);
                        if (ranta) Rannikko.PeittoOhitus = p; else Rajat.PeittoOhitus = p;
                    }
                    else if (o.Length > 2 && o[1] == "syvyys") Vektorikerros.Syvyystesti = o[2] == "paalle";
                    else if (o.Length > 2 && o[1] == "nosto")
                    {
                        Vektorikerros.NostoM = (float)D(2);
                        if (o.Length > 3) Vektorikerros.NostoOsuus = (float)D(3);
                    }
                    else if (o.Length > 1 && (o[1] == "pois" || o[1] == "paalle"))
                    {
                        if (ranta) Rannikko.Sallittu = o[1] == "paalle"; else Rajat.Sallittu = o[1] == "paalle";
                    }
                    Vektorikerros k = ranta ? (Vektorikerros)Rannikko.Instanssi : Rajat.Instanssi;
                    Debug.Log($"MATKAKIRJA {o[0]}: " + (k != null ? k.Tila() : "ei kohtauksessa"));
                    break;
                }
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
                    // vari sarja p080|p060|p045|oletus|<versio> (löydös 128: kermasarjan vaihto kuvapariin)
                    else if (o[1] == "sarja") { if (o.Length > 2) Varitaso.AsetaVersio(o[2]); }
                    else if (o[1] == "pois" || o[1] == "paalle") vt.Nakyvat(o[1] == "paalle");
                    else vt.Pakotettu = o[1] == "pelaaja" ? null : o[1];
                    Debug.Log($"MATKAKIRJA väritaso: komento {o[1]}, nyt {vt.Maa ?? "ei"}, sarja {Varitaso.Versio} " +
                              $"(peitto {Varitaso.Peitto.ToString("0.00", CultureInfo.InvariantCulture)})");
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
                    // nostot kerroin <k> [lat lon] [s] | nostot nimio pohja <k> (löydös 125)
                    var nk = NostoKerros.Instanssi;
                    if (nk == null) { Debug.LogWarning("MATKAKIRJA komento: nostokerros puuttuu"); break; }
                    if (o.Length > 2 && o[1] == "maa") nk.Maa = o[2] == "pois" ? null : o[2].ToUpperInvariant();
                    if (o.Length > 2 && o[1] == "kerroin")
                    {
                        // Webin mittauksen portaat (kerroin 1 = saapumisnäkymä, 2, 3,13) samalla kaavalla kuin ZoomKerroin.
                        double h = nk.KorkeusKertoimella(D(2));
                        if (h <= 0) { Debug.LogWarning("MATKAKIRJA komento: nostot kerroin: saapumiskorkeus tuntematon"); break; }
                        bool paikka = o.Length > 4;
                        kierto.Aja(paikka ? D(3) : kierto.leveys, paikka ? D(4) : kierto.pituus, h, o.Length > 5 ? (float)D(5) : 1.2f, null);
                        Debug.Log($"MATKAKIRJA nostot: kerroin {D(2).ToString("0.###", CultureInfo.InvariantCulture)} → korkeus {h / 1000.0:0} km");
                        break;
                    }
                    if (o.Length > 3 && o[1] == "nimio" && o[2] == "pohja")
                        NostoKerros.NimionPohjaPeitto = Mathf.Clamp01((float)D(3));
                    if (o.Length > 3 && o[1] == "nimio" && o[2] == "reuna")
                    {
                        NostoKerros.NimionReunaPeitto = Mathf.Clamp01((float)D(3));
                        if (o.Length > 4) NostoKerros.NimionReunaLeveys = Mathf.Max(0f, (float)D(4));
                    }
                    if (o.Length > 1 && o[1] == "nimio") nk.Herata();
                    Debug.Log(nk.Kuvaus(o.Length > 2 && o[1] == "tila" ? o[2] : null));
                    break;
                }
                case "palvelin":
                    // palvelin | palvelin loki paalle|pois | palvelin maastouusinta paalle|pois (löydös 119)
                    // | palvelin yksiportti paalle|pois (löydös 176: PlayerPrefs, vaikuttaa seuraavasta käynnistyksestä)
                    if (o.Length > 2 && o[1] == "loki") Laattapalvelin.Loki = o[2] == "paalle";
                    else if (o.Length > 2 && o[1] == "maastouusinta") Laattapalvelin.MaastoUusinta = o[2] == "paalle";
                    else if (o.Length > 2 && o[1] == "yksiportti")
                    {
                        PlayerPrefs.SetInt(LaattaPortit.YksiPorttiAvain, o[2] == "paalle" ? 1 : 0);
                        PlayerPrefs.Save();
                        Debug.Log($"MATKAKIRJA laattapalvelin: yksi-portti {(o[2] == "paalle" ? "päälle" : "pois")} seuraavasta käynnistyksestä " +
                                  $"(nyt {(Laattapalvelin.YksiPortti ? "yksi portti" : Laattapalvelin.Portteja + " porttia")})");
                    }
                    Debug.Log($"MATKAKIRJA laattapalvelin: {Laattapalvelin.Juuri} paketti {Laattapalvelin.Paketista}" +
                              $" ({(Laattapalvelin.Paketti != null ? Laattapalvelin.Paketti.Laattoja + " laattaa" : "ei")}), offline {Laattapalvelin.Offline}, " +
                              $"välimuisti {Laattapalvelin.Valimuistista}, verkko {Laattapalvelin.Verkosta}, virheitä {Laattapalvelin.Virheita}, varalaattoja {Laattapalvelin.Varakuvia}, " +
                              $"väritason uusintoja {Laattapalvelin.VariUusintoja} (pelastettu {Laattapalvelin.VariPelastettu}) | {Laattapalvelin.YhteysKuvaus(0)} | {Laattapalvelin.JonoTila()}");
                    Debug.Log(Laattapalvelin.MaastoKuvaus());
                    break;
                case "saapuminen" when o.Length > 1 && o[1] == "vartija":
                    // saapuminen vartija paalle|pois|tila (löydös 171)
                    if (o.Length > 2 && (o[2] == "paalle" || o[2] == "pois")) Saapumisvartija.Paalla = o[2] == "paalle";
                    Debug.Log(Saapumisvartija.Kuvaus());
                    break;
                case "valmius":
                {
                    // valmius seuraa [s] | valmius auto paalle [s] | valmius auto pois | valmius kevennys pois|paalle | valmius tila | valmius pois
                    string m = o.Length > 1 ? o[1] : "tila";
                    if (m == "seuraa") Valmius.Seuraa("komento", o.Length > 2 ? (float)D(2) : 30f);
                    else if (m == "auto" && o.Length > 2)
                    {
                        Valmius.AutoS = o[2] == "paalle" ? (o.Length > 3 ? (float)D(3) : Valmius.AutoOletusS) : 0f;
                        Debug.Log($"MATKAKIRJA valmius: auto {(Valmius.AutoS > 0f ? Valmius.AutoS.ToString("0.#") + " s" : "pois")} (seuraavista verhoista)");
                    }
                    else if (m == "kevennys" && o.Length > 2)
                    {
                        // valmius kevennys pois|paalle: verhon kevennys A/B-mittaukseen (muistetaan PlayerPrefsissä)
                        Valmius.KevennysPois = o[2] == "pois";
                        Debug.Log($"MATKAKIRJA valmius: kevennys {Valmius.KevennysTila()} (seuraavista verhoista)");
                    }
                    else if (m == "pois") Valmius.Lopeta();
                    else Valmius.Tila();
                    break;
                }
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
                    // maakunta <ISO3:tunnus> | maakunta pois | maakunta tila (B17, sama kuin Natiivi-UI:n Maakunnat-valinta)
                    // maakunta maa <ISO3> | maakunta maa pois: kerroksen maa pakotetaan (oletus pelaajan maa, skeema 1.42)
                    // maakunta herays ab|pois: löydös 168 A/B-lippu (ab = vanha käytös, herääminen värjää maakunnan; oletus pois)
                    var mk = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.maakunnat : null;
                    if (mk == null) break;
                    if (o[1] == "tila")
                    {
                        // Löydös 74 d: vektorirajat vasta tiheydestä rajatMinTiheys, ja pois linssin ajan.
                        Debug.Log($"MATKAKIRJA maakunnat: päällä {mk.Paalla}, maa {mk.NykyinenMaa ?? "-"} (pakotettu {mk.Pakotettu ?? "-"}), " +
                                  $"rajojen häive {mk.RajaHaive:0.00}, tiheys {mk.RajaTiheys:0.0} px/° (rajat tiheydestä {System.Math.Max(mk.rajatMinTiheys, Viivaleveys.AluerajaMinTiheys):0}), " +
                                  $"leveys {mk.RajaLaitePx:0.00} laitepx (web taso z{Viivaleveys.AluerajaTaso(mk.RajaTiheys)})");
                        break;
                    }
                    if (o[1] == "valinta" && o.Length > 2)
                    {
                        // maakunta valinta <peitto>: valitun maakunnan täytön peitto (löydös 157, oletus 0,45; tavallinen 0,34)
                        MaaKartta.ValinnanPeitto = double.Parse(o[2], CultureInfo.InvariantCulture);
                        MaaKartta.PaivitaKaikki();
                        Debug.Log($"MATKAKIRJA maakunnat: valinnan peitto {MaaKartta.ValinnanPeitto:0.00}");
                        break;
                    }
                    if (o[1] == "herays" && o.Length > 2)
                    {
                        // maakunta herays ab|pois: löydös 168 A/B-vertailu (ab = vanha käytös, herääminen värjää maakunnan pysyvästi)
                        MaaKartta.HeraaminenVarjaaTaytonAB = o[2] == "ab";
                        MaaKartta.PaivitaKaikki();
                        Debug.Log($"MATKAKIRJA maakunnat: heräyksen täyttö {(MaaKartta.HeraaminenVarjaaTaytonAB ? "AB (vanha, värjää)" : "pois (oletus, ei värjää)")}");
                        break;
                    }
                    if (o[1] == "maski" && o.Length > 2)
                    {
                        // maakunta maski pois|paalle: rantaviivan maski (löydös 157) vertailuun
                        mk.MaskiNakyy(o[2] == "paalle");
                        Debug.Log($"MATKAKIRJA maakunnat: maamaski {(Maamaski.Paalla ? "päällä" : "pois")}");
                        break;
                    }
                    if (o[1] == "maa")
                    {
                        mk.Pakotettu = o.Length > 2 && o[2] != "pois" ? o[2].ToUpperInvariant() : null;
                        mk.MaaTila(true);
                        break;
                    }
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
                    else if (o.Length > 2 && o[1] == "yovalot")
                    {
                        rm.yovalojenVoimakkuus = Mathf.Max(0f, float.Parse(o[2], CultureInfo.InvariantCulture));
                        if (o.Length > 3) RadioMastot.YovalotSuodatettu = o[3] == "suodatettu";
                        Debug.Log($"MATKAKIRJA mastot: yövalot {rm.yovalojenVoimakkuus:0.00}, {(RadioMastot.YovalotSuodatettu ? "suodatettu" : "raaka")}");
                    }
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
                case "valokeila" when o.Length > 1:
                    Valokeila(o, D);
                    break;
                case "linssisiirto" when o.Length > 1:
                    if (o[1] == "pois") KarttaKerrokset.LinssisiirtoPois(o.Length > 2 ? (float)D(2) : 0.8f);
                    else KarttaKerrokset.Linssisiirto((float)D(1), o.Length > 2 ? (float)D(2) : 0f, o.Length > 3 ? (float)D(3) : 0.8f);
                    Debug.Log($"MATKAKIRJA linssisiirto: tavoite {o[1]} {(o.Length > 2 ? o[2] : "")}, nyt {PalloKierto.LinssisiirtoNyt}");
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
            // Lämpöerä: muutos näkyviin heti myös lepopiirrossa (PAIKALLAAN piirtää vain 2 s välein).
            if (Herattaa(o)) PallonLepo.Muuttui("komento " + o[0]);
            Debug.Log("MATKAKIRJA komento: " + rivi);
        }

        /// <summary>Muuttaako komento kuvaa: kyselyt, odotus ja mittaus eivät herätä palloa (lepomittaukset pysyvät puhtaina).</summary>
        static bool Herattaa(string[] o)
        {
            switch (o[0])
            {
                case "odota":
                case "mittaus":
                case "palvelin":
                case "suodatus":
                case "saapuminen":
                case "valmius":
                case "kamerareitti":
                    return false;
                case "pallo" when o.Length > 1 && o[1] == "lepo":
                    return false;
                case "pallo" when o.Length > 2 && o[1] == "pohja" && o[2] == "tila":
                    return false;
                default:
                    return !(o.Length > 1 && o[1] == "tila");
            }
        }
    }
}
