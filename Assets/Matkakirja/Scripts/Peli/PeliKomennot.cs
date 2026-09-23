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
//   heita                     "Heitä noppaa" (matka kesken reitillä, kohti tavoitetta)
//   sulje-lehti               sulkee kaupunkilehden kuin pelaaja
//   tila [nimi]               kirjoittaa Documents/peli-tila.json (tai peli-tila-nimi.json)
//   odota s                   seuraava rivi s sekunnin päästä
//   odota-tila tila [max s]   odottaa silmukan tilaa (Kartta, Dialogi, Matkalla, Lehti), oletus 20 s
//   uusi-peli [siemen]        uusi peli Pariisista (siemen = toistettava noppa)
//   peli pois | peli paalle   pelisilmukka pois (3D:n napautus kuten ennen) tai päälle
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
        SilmukanTila? odotettuTila;
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
            if (ohjain.Tila == odotettuTila.Value) { Kirjaa("odota-tila", "ok " + ohjain.Tila); odotettuTila = null; return true; }
            if (Time.unscaledTime >= odotusLoppuu) { Kirjaa("odota-tila", $"AIKARAJA: odotettiin {odotettuTila}, tila {ohjain.Tila}"); odotettuTila = null; return true; }
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
                case "peruuta":
                    return ohjain.Peruuta();
                case "matka":
                {
                    var tapa = PeliApu.TapaTekstista(A(2));
                    if (A(1) == null || tapa == null) return "käyttö: matka kaupunki bussi|lento|liftaus|laiva";
                    return ohjain.Matkusta(A(1), tapa.Value);
                }
                case "heita":
                    return ohjain.Heita();
                case "sulje-lehti":
                    return ohjain.SuljeLehti();
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
                    if (!Enum.TryParse(A(1) ?? "", true, out SilmukanTila t)) return "tuntematon tila " + A(1);
                    odotettuTila = t;
                    odotusLoppuu = Time.unscaledTime + Luku(A(2), 20f);
                    return null;
                case "uusi-peli":
                    if (ohjain.Verkko == null) return "sisältö ei ole vielä latautunut";
                    ohjain.UusiPeli(long.TryParse(A(1), NumberStyles.Integer, CultureInfo.InvariantCulture, out var s) ? s : (long?)null);
                    return null;
                case "peli":
                    if (A(1) != "pois" && A(1) != "paalle") return "käyttö: peli pois|paalle";
                    ohjain.AsetaKaytossa(A(1) == "paalle");
                    return null;
                default:
                    return "tuntematon komento";
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
