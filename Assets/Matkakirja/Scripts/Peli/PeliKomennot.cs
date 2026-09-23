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
//   sulje-lehti               sulkee kaupunkilehden kuin pelaaja
//   ohita-traileri            saapumistrailerin ohitus (Natiivi-UI:n traileri, tila Traileri)
//   kortti kaupunki           kaupunkikortti (vain jos Natiivi-UI on asettanut PeliNakymat.KaupunkiKortti)
//   liiku kaupunki            kortin "Liiku tänne" → matkavalinta (ilman korttia kuten napauta)
//   maalehti ISO3 [aihe]      maan lehti aiheen sivulta (kartuscha)
//   lue-lehti kaupunki        kaupunkilehti ilman matkaa (kortin "Lue kaupunkilehti")
//   tutki [vaikea]            "Tutki kaupunkia" -nappi: kysymys auki (tila Kysymys)
//   vastaa i | vastaa oikea   valitsee vaihtoehdon i (0..) tai oikean
//   vastaa vaara              valitsee ensimmäisen näkyvän väärän vaihtoehdon
//   aloita                    tervehdyssivun Aloita peli (kohtaaminen)
//   vihje | puolita           vihje (40 £) tai 50:50 (80 £)
//   jatka                     tuloksen Jatka-nappi: kysymys kiinni, vuoro päättyy
//   luento kaupunki|intro|lento|saapuminen kaupunki   soittaa luennan (kerran-säännöistä välittämättä)
//   puhe seis|pois|paalle     pysäyttää puheen / luennat pois tai päälle (PlayerPrefs)
//   tila [nimi]               kirjoittaa Documents/peli-tila.json (tai peli-tila-nimi.json)
//   odota s                   seuraava rivi s sekunnin päästä
//   odota-tila tila [max s]   odottaa silmukan tilaa (Kartta, Dialogi, Matkalla, Lehti, Kysymys), oletus 20 s
//   uusi-peli [siemen]        uusi peli Pariisista (siemen = toistettava noppa)
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
            Kirjaa(rivi, virhe == null ? "ok" : "VIRHE " + virhe);
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
                        case "lento": return ohjain.SoitaLuento(l.LentoAlku);
                        case "saapuminen": return ohjain.SoitaLuento(l.Saapumispuhe(A(2)));
                        default: return ohjain.SoitaLuento(l.Luento(A(1)));
                    }
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

        void Kirjaa(string rivi, string tulos)
        {
            var teksti = $"{Time.unscaledTime.ToString("0.00", CultureInfo.InvariantCulture)} {rivi} → {tulos} [{ohjain.Tila}]";
            Debug.Log("MATKAKIRJA peli-komento: " + teksti);
            try { File.AppendAllText(loki, teksti + "\n"); } catch (IOException) { }
        }
    }
}
