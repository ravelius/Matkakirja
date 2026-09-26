// Pelisilmukan testikomennot ilman kosketusta (Pelikoodari, erä 3), samalla
// tiedostoperiaatteella kuin 3D:n Komennot.cs, mutta omassa tiedostossa,
// jotta 3D:n komennot eivät muutu: Mac kirjoittaa sovelluksen
// Documents-kansioon tiedoston peli-komento.txt (simulaattorissa
// `xcrun simctl get_app_container <UDID> app.matkakirja.proto3d data`/Documents,
// laitteella devicectl device copy to), sovellus lukee sen sekunnin välein,
// poistaa sen ja ajaa rivit jonossa. Jokainen rivi ja tulos kirjataan
// Documents/peli-loki.txt:hen ja lokiin (MATKAKIRJA peli-komento).
//
//   napauta kaupunki          kuin sormi kaupungin merkillä: matkavalinta auki
//   valitse tapa              matkavalinnan nappi: bussi | lento | liftaus | laiva
//   peruuta                   matkavalinnan Peruuta
//   matka kaupunki tapa       napauta + valitse yhdellä rivillä (ilman dialogia)
//   heita                     "Heitä noppaa" (vaihe Heitto; kohti tavoitetta, jos se on)
//   vaihda                    "Vaihda matkustustapa" (web actionCancelTravel, heittonapin vieressä)
//   kulkutapa tapa            Liiku-liu'un nappi: liftaus (heitto, siirtokohteet kartalle) | bussi | laiva | lento (kohdelista)
//   rivi i                    Liiku-vuon kohdelistan rivi i (0..); siirtovaiheessa ilman listaa i:s siirtokohde
//                             kartalla (PeliOhjain.SiirtoKohteet: kaupungit nimen mukaan, sitten reitin varsi)
//   siirto avain              siirtokohteen napautus avaimella (c:kaupunki | e:reitti:askel), kuten renkaan napautus
//   sulje-lehti               sulkee kaupunkilehden kuin pelaaja
//   ohita-traileri            saapumistrailerin ohitus (Natiivi-UI:n traileri, tila Traileri)
//   kortti kaupunki           kaupunkikortti (vain jos Natiivi-UI on asettanut PeliNakymat.KaupunkiKortti)
//   liiku kaupunki            kortin "Liiku tänne": nopan siirto kaupunkiin (vain siirtokohde, web valitseSiirto)
//   maalehti ISO3 [aihe]      maan lehti aiheen sivulta (kartuscha)
//   lue-lehti kaupunki        kaupunkilehti ilman matkaa (kortin "Lue kaupunkilehti")
//   tutki [vaikea]            "Tutki kaupunkia" -nappi: kysymys auki (tila Kysymys)
//   vastaa i | vastaa oikea   valitsee vaihtoehdon i (0..) tai oikean
//   vastaa vaara              valitsee ensimmäisen näkyvän väärän vaihtoehdon
//   aloita                    tervehdyssivun Aloita peli (kohtaaminen)
//   vihje | puolita           vihje (40 £) tai 50:50 (80 £)
//   jatka                     tuloksen Jatka-nappi: kysymys kiinni, vuoro päättyy
//   luento kaupunki|intro|lento|lento-alku|saapuminen kaupunki   soittaa luennan (kerran-säännöistä välittämättä)
//   puhe seis|pois|paalle     pysäyttää puheen / luennat pois tai päälle (PlayerPrefs)
//   aani mittaa [s]           todellinen lähtötaso s sekuntia (AudioListener.GetOutputData: rms, huippu), soivat
//                             lähteet ja iOS:n ääni-istunto (luokka, voimakkuus, reitti) peli-lokiin (löydös 49)
//   tila [nimi]               kirjoittaa Documents/peli-tila.json (tai peli-tila-nimi.json)
//   vieritys [pois|paalle|nollaa]  ScrollViewien herätys täyteen taajuuteen (löydös 137) ja mittari
//   nostokuvat [ISO] [max]    savukevartija "nostokuva näkyy" (löydös 149): maan karttanostojen ensimmäiset kuvat, tulos
//                             lokiin "RAJA nostokuva näkyy: PASS|FAIL" ja Documents/nostokuvat.txt
//   muste tila|loyda <valo> | muste maakunnat <ISO>  Elävä kartta: noston kokoluokka ja löytötila, löydön kirjaus, laskurit
//   ruutu                     ruudunpäivityksen tila (täysi/lepo/paikallaan, fps, piirtoväli, lämpö, kamera)
//   lampo normaali|kuuma|kriittinen|auto  pakottaa lämpötason (Lampo.Pakotettu)
//   verkko [nollaa]           verkko-odotusmittarin yhteenveto (Documents/verkko-yhteenveto.json; rivit verkko-odotus.jsonl)
//   verkko raja [vaihe]       vartija: "RAJA saapuminen 0 ms verkko-odotusta: PASS|FAIL (ms, kpl)" lokiin ja peli-lokiin
//   levy [Mt]                 levyvälimuistien koko ja siivous vanhimmasta (oletus 2048 Mt; pienempi raja testiin) sekä
//                             purettujen kuvien muisti (LRU tavuina, iPhone 200 / iPad 300 Mt); tulos lokiin "levy:"
//   tiedosto osoite polku     Esilataaja.Pyyda(Kohde.Tiedosto) ryhmään "testi" (polku suhteessa Documents/sisalto;
//                             Range-jatko jos polku on jo osin ladattu); lokiin "ryhmä testi valmis (v valmista, e virhettä)"
//   odota s                   seuraava rivi s sekunnin päästä
//   odota-tila tila [max s]   odottaa silmukan tilaa (Kartta, Dialogi, Matkalla, Lehti, Kysymys), oletus 20 s
//   uusi-peli [siemen] [kaupunki]  uusi peli (oletus Lontoo; siemen = toistettava noppa); sulkee aloitusnäkymän
//   koetila mannerlento       TESTI: oman mantereen pääaarre löydetyksi + raha ≥ 1000 → mannerlennot tarjolla
//                             (laivareitti: uusi-peli 1 lontoo → kulkutapa laiva, Lontoo–Amsterdam)
//   peli pois | peli paalle   pelisilmukka pois (3D:n napautus kuten ennen) tai päälle
//   sahke kaynnista           sähkelinjan terveystarkistus myös ilman Natiivi-UI:n sähkenäkymää
//   sahke perusta [Adj Subst] retkikunta (nimimerkki arvotaan, jos puuttuu); tulos lokiin
//   sahke liity KOODI [Adj Subst] | sahke eroa | sahke pollaa | sahke vinkki pohjaId paikkaId
//   kaveriapu | kaveriapu-valmis   kysymyksen "Kysy kaverilta (25 £)" / kortin Selvä tai Peru odotus
//   sahketehtava avaa [kaupunki]   pöllön sähketehtävä (oletus: pelaajan kaupunki), myös ilman näkymää
//   sahketehtava laheta aukko=arvo …   lomakkeen lähetys (välilyönti arvossa: _)
//   sahketehtava vapaa teksti…     vapaa vastaus (pöllön tuomio lokiin) | sahketehtava sulje
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class PeliKomennot : MonoBehaviour
    {
        public PeliOhjain ohjain;

        readonly Queue<string> jono = new Queue<string>();
        string polku, loki;
        float tarkistus, odotus;
        List<SilmukanTila> odotettuTila;
        float odotusLoppuu;

        void Start()
        {
#if MATKAKIRJA_APPSTORE
            // App Store -käännöksessä ei testikomentoja (kuten Komennot.cs ja Natiivi-UI:n ui-komento.txt).
            enabled = false;
            return;
#endif
            polku = Path.Combine(Application.persistentDataPath, "peli-komento.txt");
            loki = Path.Combine(Application.persistentDataPath, "peli-loki.txt");
        }

        void Update()
        {
            if (polku == null || ohjain == null) return;
            if (Time.unscaledTime >= tarkistus)
            {
                tarkistus = Time.unscaledTime + 1f;
                try
                {
                    if (File.Exists(polku))
                    {
                        foreach (var rivi in File.ReadAllLines(polku)) jono.Enqueue(rivi.Trim());
                        File.Delete(polku);
                    }
                }
                catch (IOException e) { Debug.LogWarning("MATKAKIRJA peli-komento: " + e.Message); }
            }
            while (jono.Count > 0 && Valmis()) Aja(jono.Dequeue());
        }

        /// <summary>Saako seuraavan rivin ajaa: odota-aika kulunut ja odotettu tila saavutettu (tai aikaraja).</summary>
        bool Valmis()
        {
            if (Time.unscaledTime < odotus) return false;
            if (odotettuTila == null) return true;
            if (odotettuTila.Contains(ohjain.Tila)) { Kirjaa("odota-tila", "ok " + ohjain.Tila); odotettuTila = null; return true; }
            if (Time.unscaledTime >= odotusLoppuu) { Kirjaa("odota-tila", $"AIKARAJA: odotettiin {string.Join("|", odotettuTila)}, tila {ohjain.Tila}"); odotettuTila = null; return true; }
            return false;
        }

        void Aja(string rivi)
        {
            if (rivi.Length == 0 || rivi.StartsWith("#")) return;
            var o = rivi.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string virhe;
            try { virhe = Suorita(o); }
            catch (Exception e) { virhe = "poikkeus: " + e.Message; }
            // "="-alkuinen tulos on tietoa (ruutu, verkko, levy), ei virhe (Laitetestaajan havainto 25.9.).
            Kirjaa(rivi, virhe == null ? "ok" : virhe.StartsWith("=") ? "ok " + virhe.Substring(1) : "VIRHE " + virhe);
        }

        string Suorita(string[] o)
        {
            string A(int i) => o.Length > i ? o[i] : null;
            switch (o[0])
            {
                case "napauta":
                    return A(1) == null ? "kaupunki puuttuu" : ohjain.Napauta(A(1));
                case "valitse":
                {
                    var tapa = PeliApu.TapaTekstista(A(1));
                    return tapa == null ? "tuntematon tapa " + A(1) : ohjain.Valitse(tapa.Value);
                }
                case "etsi-katko":
                    return ohjain.EtsiKatko(A(1));
                case "aarrepiste":
                    return ohjain.AvaaAarrepiste();
                case "koetila":
                    return A(1) == "mannerlento" ? ohjain.KoetilaMannerlento() : "käyttö: koetila mannerlento";
                case "mannerlennot":
                    return ohjain.AvaaMannerlennot();
                case "peruuta":
                    return ohjain.Peruuta();
                case "matka":
                {
                    if (A(2) == "mannerlento") return A(1) == null ? "kaupunki puuttuu" : ohjain.Matkusta(A(1), Matkakirja.Peli.Kulkutapa.Lento, true);
                    if (A(2) == "peninkulma") return A(1) == null ? "kaupunki puuttuu" : ohjain.Matkusta(A(1), Matkakirja.Peli.Kulkutapa.Lento, false, true);
                    var tapa = PeliApu.TapaTekstista(A(2));
                    if (A(1) == null || tapa == null) return "käyttö: matka kaupunki bussi|lento|liftaus|laiva|mannerlento";
                    return ohjain.Matkusta(A(1), tapa.Value);
                }
                case "heita":
                    return ohjain.Heita();
                case "vaihda":
                    return ohjain.VaihdaKulkutapa();
                case "kulkutapa":
                {
                    var tapa = PeliApu.TapaTekstista(A(1));
                    return tapa == null ? "käyttö: kulkutapa liftaus|bussi|laiva|lento" : ohjain.ValitseKulkutapa(tapa.Value);
                }
                case "rivi":
                    return int.TryParse(A(1), out var rivi) ? ohjain.ValitseRivi(rivi) : "käyttö: rivi i";
                case "siirto":
                    return A(1) == null ? "käyttö: siirto avain" : ohjain.ValitseSiirto(A(1));
                case "sulje-lehti":
                    return ohjain.SuljeLehti();
                case "ohita-traileri":
                    return ohjain.OhitaTraileri();
                case "kortti":
                    return A(1) == null ? "kaupunki puuttuu" : ohjain.AvaaKortti(A(1));
                case "liiku":
                    return A(1) == null ? "kaupunki puuttuu" : ohjain.Liiku(A(1));
                case "maalehti":
                    return A(1) == null ? "maa puuttuu" : ohjain.LueMaalehti(A(1), A(2));
                case "lue-lehti":
                    return A(1) == null ? "kaupunki puuttuu" : ohjain.LueLehti(A(1));
                case "tutki":
                    return ohjain.Tutki(A(1) == "vaikea");
                case "vastaa":
                {
                    // Näytön tila kattaa kysymyksen ja pulman.
                    var q = ohjain.KysymysTila;
                    if (q == null) return "kysymys ei ole auki";
                    int i;
                    if (A(1) == "oikea") i = q.Oikea;
                    else if (A(1) == "vaara")
                    {
                        i = -1;
                        for (int j = 0; j < q.Vaihtoehdot.Count; j++)
                            if (j != q.Oikea && !q.Piilotetut.Contains(j)) { i = j; break; }
                        if (i < 0) return "ei väärää vaihtoehtoa";
                    }
                    else if (!int.TryParse(A(1), NumberStyles.Integer, CultureInfo.InvariantCulture, out i)) return "käyttö: vastaa i|oikea|vaara";
                    return ohjain.Vastaa(i);
                }
                case "aloita":
                    return ohjain.AloitaKysymys();
                case "vihje":
                    return ohjain.Vihje();
                case "puolita":
                    return ohjain.Puolita();
                case "jatka":
                    return ohjain.JatkaKysymyksesta();
                case "luento":
                {
                    var l = ohjain.Luennat;
                    switch (A(1))
                    {
                        case null: return "käyttö: luento kaupunki|intro|lento|saapuminen kaupunki";
                        case "intro": return ohjain.SoitaLuento(l.Intro);
                        case "lento":
                        case "lento-alku": return ohjain.SoitaLuento(l.LentoAlku);   // paketin id (Siirtoseppä, build 8)
                        case "saapuminen": return ohjain.SoitaLuento(l.Saapumispuhe(A(2)));
                        default: return ohjain.SoitaLuento(l.Luento(A(1)));
                    }
                }
                case "aani" when A(1) == "mittaa":
                    // Löydös 49: todellinen lähtötaso (Unityn miksattu ulostulo ennen laitteistoa), ei play()-kutsu.
                    StartCoroutine(MittaaAani(float.TryParse(A(2), System.Globalization.NumberStyles.Float,
                        System.Globalization.CultureInfo.InvariantCulture, out var mittaS) ? mittaS : 3f));
                    return null;
                case "aani" when A(1) == "aihe":
                {
                    // Musiikkisuunnitelma vaihe 1: aiheen laukaisu ilman pelitilannetta (todennus: aani mittaa perään).
                    switch (A(2))
                    {
                        case "aloituslento": Aanisoitin.AloituslentoAlkoi(); break;
                        case "loppu": Aanisoitin.MatkaLoppui(); break;
                        case "kaupunki": Aanisoitin.UusiKaupunki(A(3)); break;
                        default: return "käyttö: aani aihe aloituslento|loppu|kaupunki <id>";
                    }
                    var t = ohjain.Aanisoitin?.Tila;
                    return "aihe " + (t?.Toive(Matkakirja.Peli.Kanava.Aarre).Url ?? "ei soi");
                }
                case "aani" when A(1) == "sini":
                {
                    // Positiivinen kontrolli (löydös 49): 440 Hz 2 s omasta klipistä ilman latausta. rms > 0 = Unityn
                    // miksaus toimii; rms 0 = ulostulo ei käy lainkaan (istunto, keskeytys tai AudioSettings).
                    int taajuus = AudioSettings.outputSampleRate > 0 ? AudioSettings.outputSampleRate : 48000;
                    var data = new float[taajuus * 2];
                    for (int i = 0; i < data.Length; i++) data[i] = 0.3f * Mathf.Sin(2f * Mathf.PI * 440f * i / taajuus);
                    var klippi = AudioClip.Create("sini440", data.Length, 1, taajuus, false);
                    klippi.SetData(data, 0);
                    var go = new GameObject("MatkakirjaSini");
                    var l = go.AddComponent<AudioSource>();
                    l.clip = klippi; l.spatialBlend = 0f; l.volume = 1f;
                    l.Play();
                    Destroy(go, 2.5f);
                    return null;
                }
                case "aani" when A(1) == "istunto":
                    // aani istunto playback|puhe|ambient: istunnon vaihto mittausta varten (AaniIstunto.Vaihda).
                    return AaniIstunto.Vaihda(A(2));
                case "aani" when A(1) == "nollaa":
                {
                    // Unityn ääni uudelleen käyntiin samoilla asetuksilla (FMOD avaa ulostulon uudelleen).
                    var k = AudioSettings.GetConfiguration();
                    bool ok = AudioSettings.Reset(k);
                    Kirjaa("aani nollaa", (ok ? "ok" : "EPÄONNISTUI") + ", näytetaajuus " + AudioSettings.outputSampleRate);
                    return null;
                }
                case "puhe":
                    switch (A(1))
                    {
                        case "seis": if (Puhe.Instanssi != null) Puhe.Instanssi.Pysayta(); return null;
                        case "ohita": ohjain.OhitaLuento(); return null;
                        case "pois": Puhe.Paalla = false; return null;
                        case "paalle": Puhe.Paalla = true; return null;
                        default: return "käyttö: puhe seis|ohita|pois|paalle";
                    }
                case "tila":
                {
                    var nimi = A(1) == null ? "peli-tila.json" : "peli-tila-" + A(1) + ".json";
                    PeliApu.KirjoitaAtomisesti(Path.Combine(Application.persistentDataPath, nimi), ohjain.TilaJson());
                    return null;
                }
                case "odota":
                    odotus = Time.unscaledTime + Luku(A(1), 1f);
                    return null;
                case "cpu":
                    // Kehyksen CPU-hinta (Kartta/CpuMittari.cs): cpu lista | cpu mittaa [s] [suodatin|kaikki] | cpu tila
                    if (A(1) == "lista") return "=" + CpuMittari.Lista();
                    if (A(1) == "tila") return "=" + CpuMittari.Tila;
                    if (A(1) == "profiler") return "=" + CpuMittari.Profiloi(A(2) != "pois");
                    if (A(1) == "mittaa") return CpuMittari.Mittaa(float.TryParse(A(2), out var cs) ? cs : 10f, A(3), A(4) == "piirto");
                    return "cpu lista | cpu profiler [pois] | cpu mittaa [s] [suodatin|-|kaikki] [piirto] | cpu tila";
                case "vieritys":
                    // Löydös 137 (UI/VieritysHeratys.cs): vieritys [pois|paalle|nollaa] → tila ja mittari.
                    if (A(1) == "pois") VieritysHeratys.Paalla = false;
                    else if (A(1) == "paalle") VieritysHeratys.Paalla = true;
                    else if (A(1) == "nollaa") VieritysHeratys.NollaaLaskurit();
                    else if (A(1) == "koe") return VieritysHeratys.Koe();
                    return "=" + VieritysHeratys.Kuvaus();
                case "nostokuvat":
                {
                    // Löydös 149: savukevartija "nostokuva näkyy" (UI/NostoSisalto.TarkistaKuvat) → lokiin ja Documents/nostokuvat.txt.
                    string iso = A(1) ?? "GRC";
                    int max = int.TryParse(A(2), out var nm) ? nm : 60;
                    UiKerros.Hae().StartCoroutine(NostoSisalto.TarkistaKuvat(iso, max, null));
                    return null;
                }
                case "muste":
                    // Elävä kartta (PeliOhjain.Muste.cs): muste tila|loyda <valo>, muste maakunnat <ISO>.
                    return ohjain.MusteKomento(A(1), A(2));
                case "ruutu":
                    // Dynaaminen ruudunpäivitys ja lämpö (Kartta/Ruudunpaivitys.cs, lämpöerä 25.9.2026).
                    return Ruudunpaivitys.Instanssi != null ? "=" + Ruudunpaivitys.Instanssi.Kuvaus() : "ei ruudunpäivitystä";
                case "lampo":
                {
                    // lampo normaali|kuuma|kriittinen|auto: pakottaa lämpötason (simulaattorissa thermalState on aina 0).
                    switch (A(1))
                    {
                        case "normaali": Lampo.Pakotettu = Lampotaso.Normaali; break;
                        case "kuuma": Lampo.Pakotettu = Lampotaso.Kuuma; break;
                        case "kriittinen": Lampo.Pakotettu = Lampotaso.Kriittinen; break;
                        case "auto": Lampo.Pakotettu = null; break;
                        default: return "käyttö: lampo normaali|kuuma|kriittinen|auto";
                    }
                    Lampo.Paivita(true);
                    return "=lämpö " + Lampo.Taso;
                }
                case "levy":
                {
                    // Esilataaja erä 4: Kartta/Levysiivous.cs (taustasäie, tulos lokiin) ja UI/Kuvat.cs:n LRU.
                    int raja = int.TryParse(A(1), out var r) && r > 0 ? r : Levysiivous.RajaMt;
                    Levysiivous.Siivoa(raja);
                    return $"=kuvat muistissa {Kuvat.MuistissaKpl} kpl, {Kuvat.MuistissaTavuja / 1048576} / {Kuvat.MuistiRaja / 1048576} Mt; "
                         + $"levy (edellinen) {Levysiivous.Viimeisin}";
                }
                case "tiedosto":
                {
                    // Esilataaja erä 4: Siirtosepän paketin taustapäivityksen latausväylä (EsilataajaTiedostot.cs).
                    if (A(1) == null || A(2) == null) return "tiedosto osoite polku";
                    Esilataaja.Pyyda(Kohde.Tiedosto(A(1), null, 0, A(2)), Taso.Muu, Kohta.Kaynnistys, "testi");
                    Esilataaja.RyhmaValmis("testi", (v, e) => Debug.Log($"MATKAKIRJA peli: tiedosto-testi {v} valmista, {e} virhettä"));
                    return null;
                }
                case "verkko":
                    // Verkko-odotusmittari (Kartta/VerkkoOdotus.cs): yhteenveto → verkko-yhteenveto.json; nollaa = summat pois.
                    if (A(1) == "nollaa") { VerkkoOdotus.NollaaSummat(); return null; }
                    // Vartija laitteelle: verkko raja [vaihe] → "RAJA saapuminen 0 ms verkko-odotusta: PASS|FAIL".
                    if (A(1) == "haut") { VerkkoOdotus.KirjaaHaut(A(2) != "pois"); return "=hakurivit " + (VerkkoOdotus.HautTiedostoon ? "päällä (verkko-haut.jsonl)" : "pois"); }
                    if (A(1) == "raja") { var r = VerkkoOdotus.Raja(A(2) ?? "saapuminen"); Debug.Log("MATKAKIRJA " + r); return "=" + r; }
                    return "=" + VerkkoOdotus.Yhteenveto();
                case "odota-tila":
                {
                    // Useampi tila pystyviivalla: odota-tila kartta|aloitus 40 (aloitusnäkymä käytössä tai ei).
                    var tilat = new List<SilmukanTila>();
                    foreach (var osa in (A(1) ?? "").Split('|'))
                    {
                        if (!Enum.TryParse(osa, true, out SilmukanTila t)) return "tuntematon tila " + osa;
                        tilat.Add(t);
                    }
                    odotettuTila = tilat;
                    odotusLoppuu = Time.unscaledTime + Luku(A(2), 20f);
                    return null;
                }
                case "jatka-matka":
                    return ohjain.Jatka();
                case "uusi-matka":
                    return ohjain.UusiMatka(A(1), long.TryParse(A(2), NumberStyles.Integer, CultureInfo.InvariantCulture, out var ms) ? ms : (long?)null);
                case "uusi-peli":
                    if (ohjain.Verkko == null) return "sisältö ei ole vielä latautunut";
                    // uusi-peli [siemen] [kaupunki]: oletuslähtö on Lontoo (C8); käsikirjoitukset antavat kaupungin.
                    // Aloitusnäkymä pois ensin (kuten ui aloita): muuten peli jää portin alle (Laitetestaaja 24.9.).
                    PeliNakymat.SuljeAloitus?.Invoke();
                    ohjain.UusiPeli(long.TryParse(A(1), NumberStyles.Integer, CultureInfo.InvariantCulture, out var s) ? s : (long?)null, A(2));
                    return null;
                case "sahke":
                    return Sahke(o);
                case "kaveriapu":
                    return ohjain.KysyKaverilta();
                case "kaveriapu-valmis":
                    return ohjain.KaveriapuValmis();
                case "sahketehtava":
                    switch (A(1))
                    {
                        case "avaa": return ohjain.AvaaSahketehtava(A(2) ?? ohjain.PelaajanKaupunki);
                        case "sulje": return ohjain.SuljeSahkekortti();
                        case "vapaa": return ohjain.SahkeVapaa(string.Join(" ", o, 2, Math.Max(0, o.Length - 2)));
                        case "laheta":
                        {
                            var arvot = new Dictionary<string, string>();
                            for (int i = 2; i < o.Length; i++)
                            {
                                int yh = o[i].IndexOf('=');
                                if (yh > 0) arvot[o[i].Substring(0, yh)] = o[i].Substring(yh + 1).Replace('_', ' ');
                            }
                            return ohjain.SahkeLaheta(arvot);
                        }
                        default: return "käyttö: sahketehtava avaa|laheta|vapaa|sulje";
                    }
                case "peli":
                    if (A(1) != "pois" && A(1) != "paalle") return "käyttö: peli pois|paalle";
                    ohjain.AsetaKaytossa(A(1) == "paalle");
                    return null;
                default:
                    return "tuntematon komento";
            }
        }

        /// <summary>Sähkepinnan testikomennot; verkkotulokset kirjataan lokiin, kun ne saapuvat.</summary>
        string Sahke(string[] o)
        {
            string A(int i) => o.Length > i ? o[i] : null;
            var s = ohjain.Sahke;
            if (s == null) return "sähkepinta puuttuu";
            string Nimi(int alku) => o.Length > alku + 1 ? o[alku] + " " + o[alku + 1] : s.ArvoNimet(1)[0];
            void Tulos(string mika, string r) => Kirjaa("sahke " + mika, r ?? "ok");
            switch (A(1))
            {
                case "kaynnista": return ohjain.KaynnistaSahke(true);
                case "perusta": s.Perusta(Nimi(2), r => Tulos("perusta", r)); return null;
                case "liity": s.Liity(A(2), Nimi(3), r => Tulos("liity", r)); return null;
                case "eroa": s.Eroa(); return null;
                case "pollaa": s.Pollaa(() => Tulos("pollaa", "jono " + s.Jono.Count)); return null;
                case "vinkki": s.LahetaVinkki(A(2), A(3), ohjain.Matka, (ok, r) => Tulos("vinkki", r)); return null;
                default: return "käyttö: sahke kaynnista|perusta|liity|eroa|pollaa|vinkki";
            }
        }

        static float Luku(string s, float oletus) =>
            float.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out var f) ? f : oletus;

        /// <summary>
        /// "aani mittaa [s]": s sekunnin ajan AudioListener.GetOutputData (kanavat 0 ja 1) joka kehys → RMS ja huippu,
        /// soivat AudioSourcet, kuuntelijan tila, asetusten kytkimet ja tasot sekä iOS:n ääni-istunto (AaniIstunto.Tila).
        /// Tulos peli-lokiin rivinä "aani:". RMS 0 = mitään ei soi pelin sisällä (vika Unityssä), RMS > 0 mutta ei
        /// kuulu = istunto tai laite (äänetön tila, reitti, voimakkuus).
        /// </summary>
        System.Collections.IEnumerator MittaaAani(float sekunnit)
        {
            var naytteet = new float[1024];
            double summa = 0; long lkm = 0; float huippu = 0;
            float loppu = Time.unscaledTime + Mathf.Clamp(sekunnit, 0.5f, 30f);
            while (Time.unscaledTime < loppu)
            {
                for (int k = 0; k < 2; k++)
                {
                    AudioListener.GetOutputData(naytteet, k);
                    foreach (var x in naytteet) { summa += x * x; huippu = Mathf.Max(huippu, Mathf.Abs(x)); }
                    lkm += naytteet.Length;
                }
                yield return null;
            }
            double rms = lkm > 0 ? Math.Sqrt(summa / lkm) : 0;
            var soivat = new List<string>();
            foreach (var l in FindObjectsByType<AudioSource>(FindObjectsInactive.Exclude, FindObjectsSortMode.None))
                if (l.isPlaying) soivat.Add($"{l.gameObject.name}:{(l.clip != null ? l.clip.name : "-")}@{l.volume:0.00}{(l.mute ? " mykkä" : "")}");
            var inv = System.Globalization.CultureInfo.InvariantCulture;
            var kokoonpano = AudioSettings.GetConfiguration();
            Kirjaa("aani", string.Format(inv, "rms {0:0.00000}, huippu {1:0.0000}, kuuntelijoita {11}, kuuntelija {2:0.00}{3}, näytetaajuus {4} ({8} {9}, dsp {10}), soivia {5} [{6}], istunto: {7}",
                rms, huippu, AudioListener.volume, AudioListener.pause ? " TAUOLLA" : "", AudioSettings.outputSampleRate,
                soivat.Count, string.Join(", ", soivat), AaniIstunto.Tila(), kokoonpano.sampleRate, kokoonpano.speakerMode,
                kokoonpano.dspBufferSize, AaniIstunto.Kuuntelijoita));
        }

        void Kirjaa(string rivi, string tulos)
        {
            var teksti = $"{Time.unscaledTime.ToString("0.00", CultureInfo.InvariantCulture)} {rivi} → {tulos} [{ohjain.Tila}]";
            Debug.Log("MATKAKIRJA peli-komento: " + teksti);
            try { File.AppendAllText(loki, teksti + "\n"); } catch (IOException) { }
        }
    }
}
