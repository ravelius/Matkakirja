// UI:n testikomennot ilman kosketusta (Natiivi-UI), samalla tiedostoperiaatteella
// kuin PeliKomennot: Mac kirjoittaa sovelluksen Documents-kansioon tiedoston
// ui-komento.txt, sovellus lukee sen sekunnin välein, poistaa sen ja ajaa rivit
// jonossa. Rivit ja tulokset kirjataan Documents/ui-loki.txt:hen.
//
//   ui valikko | ui asetukset | ui sulje      avaa päävalikon / äänentasot, sulkee
//   ui matka                                  esimerkkimatkavalinta (ilman peliä)
//   ui kortti [kaupunki]                      kaupunkikortti (oletus firenze, ilman peliä)
//   ui kysymys [laji]                         esimerkkikysymys ilman peliä: visa (oletus), vaite,
//                                             kuva, lippu, pulma [id], kaksintaistelu,
//                                             tapahtumakortti, tulos [laattatyyppi], kohtaaminen,
//                                             kohtaaminen-tervehdys (KysymysEsimerkki.cs)
//   ui selite                                 karttaselite auki
//   ui pulu sano [teksti] | aani [lähde n] | ele id | tilanne laji | tunne t | pois | paalle
//   ui tietoja                                tekijätiedot ja lähteet
//   ui kartuscha [ISO3] [auki]                kartuscha maalle ilman peliä (oletus ITA)
//   ui heitto [teksti]                        kartan toimintonappi näkyviin
//   ui viesti teksti                          tilarivin hetkellinen viesti
//   ui tila teksti                            tilarivin teksti
//   ui pois | ui paalle                       koko UI piiloon / näkyviin
//   ui osuma x y                              osuuko piste (pikseleinä, origo vasen ala) UI:hin
//   kuva nimi                                 Documents/ui-nimi.png (koko ruutu)
//   odota s                                   seuraava rivi s sekunnin päästä
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class UiKomennot : MonoBehaviour
    {
        readonly Queue<string> jono = new Queue<string>();
        string polku, loki;
        float tarkistus, odotus;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista() => UiKerros.Hae().gameObject.AddComponent<UiKomennot>();

        void Start()
        {
            polku = Path.Combine(Application.persistentDataPath, "ui-komento.txt");
            loki = Path.Combine(Application.persistentDataPath, "ui-loki.txt");
        }

        void Update()
        {
            if (polku == null) return;
            if (Time.unscaledTime >= tarkistus)
            {
                tarkistus = Time.unscaledTime + 1f;
                try
                {
                    if (File.Exists(polku))
                    {
                        foreach (var rivi in File.ReadAllLines(polku)) if (rivi.Trim().Length > 0) jono.Enqueue(rivi.Trim());
                        File.Delete(polku);
                    }
                }
                catch (IOException e) { Debug.LogWarning("MATKAKIRJA ui-komento: " + e.Message); }
            }
            while (jono.Count > 0 && Time.unscaledTime >= odotus)
            {
                var rivi = jono.Dequeue();
                string tulos;
                try { tulos = Aja(rivi); }
                catch (System.Exception e) { tulos = "VIRHE " + e.Message; }
                Kirjaa(rivi + " → " + (tulos ?? "ok"));
            }
        }

        void Kirjaa(string teksti)
        {
            Debug.Log("MATKAKIRJA ui-komento: " + teksti);
            try { File.AppendAllText(loki, System.DateTime.Now.ToString("HH:mm:ss ") + teksti + "\n"); }
            catch (IOException) { }
        }

        string Aja(string rivi)
        {
            var osat = rivi.Split(new[] { ' ' }, 3, System.StringSplitOptions.RemoveEmptyEntries);
            string k = osat[0].ToLowerInvariant();
            if (k == "odota" && osat.Length > 1)
            {
                odotus = Time.unscaledTime + float.Parse(osat[1], CultureInfo.InvariantCulture);
                return null;
            }
            if (k == "kuva" && osat.Length > 1)
            {
                // Mobiilissa CaptureScreenshot tulkitsee nimen suhteessa persistentDataPathiin.
                var nimi = "ui-" + osat[1] + ".png";
                ScreenCapture.CaptureScreenshot(Application.isMobilePlatform ? nimi : Path.Combine(Application.persistentDataPath, nimi));
                // Kaappaus tapahtuu vasta ruudun lopussa: seuraava rivi odottaa, ettei kuvaan tule sen tila.
                odotus = Time.unscaledTime + 0.3f;
                return nimi;
            }
            if (k != "ui" || osat.Length < 2) return "tuntematon komento";
            string loput = osat.Length > 2 ? osat[2] : "";
            var ui = UiNakymat.Hae();
            switch (osat[1].ToLowerInvariant())
            {
                case "valikko": ui.Valikko.Avaa(); return null;
                case "asetukset": ui.Aanentasot.Avaa(); return null;
                case "sulje": ui.SuljeKaikki(); return null;
                case "matka": ui.Esimerkkimatka(); return null;
                case "pulu":
                {
                    var pu = ui.Pulu;
                    var pk = loput.Split(new[] { ' ' }, 2);
                    string arvo = pk.Length > 1 ? pk[1] : "";
                    switch (pk[0])
                    {
                        case "sano": pu.Sano(arvo.Length > 0 ? arvo : "Minä olen Livia. Kirjekyyhky, en mikään pulu."); return null;
                        case "aani":
                        {
                            var a = arvo.Split(' ');
                            string lahde = a[0].Length > 0 ? a[0] : "avaus";
                            int n = a.Length > 1 ? int.Parse(a[1]) - 1 : 0;
                            pu.Sano("(" + lahde + " " + (n + 1) + ")", Pulu.AaniOsoite(lahde, n));
                            return Pulu.AaniOsoite(lahde, n);
                        }
                        case "ele": return pu.Ele(arvo) ? null : "tuntematon ele " + arvo;
                        case "tilanne": return pu.Tilanne(arvo) ? null : "ei elettä (väli, puhe tai tuntematon)";
                        case "tunne": return pu.Tunne(arvo) ? null : "ei elettä";
                        case "pois": pu.Nayta(false); return null;
                        case "paalle": pu.Nayta(true); return null;
                        default: return "ui pulu sano|aani|ele|tilanne|tunne|pois|paalle";
                    }
                }
                case "tietoja": ui.Tietoja.Avaa(); return null;
                case "selite": ui.Karttaselite.Avaa(); return UiPalvelut.KarttaValot == null ? "ei KarttaValot-palvelua: vain selitykset" : null;
                case "kartuscha":
                {
                    var ks = loput.Split(' ');
                    ui.Kartuscha.Testaa(ks[0].Length > 0 ? ks[0].ToUpperInvariant() : "ITA", ks.Length > 1 && ks[1] == "auki");
                    return null;
                }
                case "kortti":
                    ui.Kaupunkikortti.Nayta(loput.Length > 0 ? loput : "firenze", null, new KaupunkiToiminnot
                    {
                        LueLehti = () => ui.Tilarivi.Viesti("Lue lehti"), Liiku = () => ui.Tilarivi.Viesti("Liiku"),
                        Sulje = () => { },
                    });
                    return null;
                case "kysymys": return ui.Esimerkkikysymys(loput);
                case "heitto": ui.Matkavalinta.NaytaHeitto(loput.Length > 0 ? loput : "Heitä noppaa → Lontoo", () => ui.Tilarivi.Viesti("Noppa: 4")); return null;
                case "viesti": ui.Tilarivi.Viesti(loput, 4f); return null;
                case "tila": ui.Tilarivi.Aseta(loput); return null;
                case "pois": UiKerros.Hae().Nayta(false); return null;
                case "paalle": UiKerros.Hae().Nayta(true); return null;
                case "osuma":
                {
                    var xy = loput.Split(' ');
                    var p = new Vector2(float.Parse(xy[0], CultureInfo.InvariantCulture), float.Parse(xy[1], CultureInfo.InvariantCulture));
                    return UiKerros.Peittaa(p) ? "peittää" : "vapaa";
                }
                default: return "tuntematon ui-komento";
            }
        }
    }
}
