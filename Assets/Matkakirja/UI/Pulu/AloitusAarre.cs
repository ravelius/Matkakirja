// ALOITUSKAUPUNGIN AARRETEKSTI (Natiivi-UI; omistaja 11.10.2026 klo 13.4x–13.5x Päätoimittajan kautta, juna 182):
// matkan aloituskaupungissa (Pelaaja.Aloitus; Ateena, Pariisi tai Tukholma) isoisän aarreteksti ja sumea valokuva korvaavat
// kaupungin oman isoisän merkinnän, luennan ja luentakuvat. Omistajan ehto: aloituskaupungin alkuperäinen isoisän teksti ei
// näy missään, joten korvaus koskee matkan kaikkia käyntejä aloituskaupungissa (Fokusvirrat.Hae, Luennat.Korvaava).
//
// Data Pelikoodarilta yhdestä tiedostosta (ei kovakoodattuja ääni- tai kuvaosoitteita; isoisän ääni voi vaihtua):
//   seikkailu/aloitus-aarre-v1/aarre.json {teksti, kaupungit.<id>.paikkarivi, kuva.url, isoisa.{url, kesto_s},
//   pulu[0..1].{id, teksti, url, kesto_s}}. Datan kaupungit-avaimet kertovat, mitkä kaupungit kuuluvat korvaukseen.
// Haetaan pelin alussa ja tallennetaan levylle (toimii seuraavalla käynnistyksellä ilman verkkoa). Pulun repliikkien äänet
// (LivianPaljastus: aarre-1 ja aarre-2) luetaan samasta datasta.
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class AloitusAarre
    {
        public const string Osoite = "https://media.matkakirja.app/seikkailu/aloitus-aarre-v1/aarre.json";

        sealed class Data
        {
            public string Teksti, KuvaUrl, IsoisaUrl;
            public double? IsoisaKesto;
            public readonly Dictionary<string, string> Paikkarivit = new Dictionary<string, string>();
            public readonly List<string> PuluUrlit = new List<string>();
        }

        static Data data;
        static bool haettu;
        static readonly Dictionary<string, (Saapumisvirta Pohja, Saapumisvirta Kopio)> virrat = new Dictionary<string, (Saapumisvirta, Saapumisvirta)>();
        static readonly Dictionary<string, Luento> luennot = new Dictionary<string, Luento>();

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaTila()
        {
            data = null;
            haettu = false;
            virrat.Clear();
            luennot.Clear();
        }

        static string Tiedosto => Path.Combine(Application.persistentDataPath, "aloitus-aarre-v1.json");

        /// <summary>Data levyltä heti ja verkosta taustalla (kerran käynnistyksessä).</summary>
        public static void Lataa()
        {
            if (haettu) return;
            haettu = true;
            try { if (File.Exists(Tiedosto)) Aseta(Jasenna(File.ReadAllText(Tiedosto))); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA aloitusaarre: levy " + e.Message); }
            Esilataaja.AjaTaustalla(Hae());
        }

        static IEnumerator Hae()
        {
            string teksti = null;
            yield return Esilataaja.Hae(() => { var q = UnityWebRequest.Get(Osoite); q.timeout = 20; return q; }, Taso.Nakyva, "aloitusaarre",
                r => { if (r.result == UnityWebRequest.Result.Success) teksti = r.downloadHandler.text; });
            if (string.IsNullOrEmpty(teksti)) { Debug.LogWarning("MATKAKIRJA aloitusaarre: haku epäonnistui"); yield break; }
            var d = Jasenna(teksti);
            if (d == null) yield break;
            Aseta(d);
            try { File.WriteAllText(Tiedosto, teksti); } catch (Exception e) { Debug.LogWarning("MATKAKIRJA aloitusaarre: tallennus " + e.Message); }
        }

        static void Aseta(Data d)
        {
            if (d == null) return;
            data = d;
            virrat.Clear();
            luennot.Clear();
            Debug.Log("MATKAKIRJA aloitusaarre: " + string.Join(", ", d.Paikkarivit.Keys));
        }

        static Data Jasenna(string json)
        {
            var j = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(json));
            var teksti = MiniJson.Teksti(j, "teksti");
            if (string.IsNullOrEmpty(teksti)) return null;
            var d = new Data { Teksti = teksti };
            if (MiniJson.Kentta(j, "kuva") is Dictionary<string, object> kuva) d.KuvaUrl = MiniJson.Teksti(kuva, "url");
            if (MiniJson.Kentta(j, "isoisa") is Dictionary<string, object> iso)
            {
                d.IsoisaUrl = MiniJson.Teksti(iso, "url");
                if (MiniJson.Kentta(iso, "kesto_s") is double s) d.IsoisaKesto = s;
            }
            if (MiniJson.Kentta(j, "kaupungit") is Dictionary<string, object> kaupungit)
                foreach (var kv in kaupungit)
                    d.Paikkarivit[kv.Key] = kv.Value is Dictionary<string, object> k ? MiniJson.Teksti(k, "paikkarivi") : null;
            if (MiniJson.Kentta(j, "pulu") is List<object> pulu)
                foreach (var p in pulu) d.PuluUrlit.Add(p is Dictionary<string, object> pd ? MiniJson.Teksti(pd, "url") : null);
            return d;
        }

        /// <summary>Matkan aloituskaupunki (tallennuksessa pysyvä Pelaaja.Aloitus).</summary>
        static string Aloitus => PeliOhjain.Instanssi?.Matka?.Tila?.Pelaaja?.Aloitus;

        /// <summary>Korvataanko kaupungin isoisän merkintä aarretekstillä (aloituskaupunki ja datassa).</summary>
        public static bool Koskee(string kaupunki) =>
            data != null && kaupunki != null && kaupunki == Aloitus && data.Paikkarivit.ContainsKey(kaupunki);

        /// <summary>Fokusvirta aloituskaupungissa: teksti, paikkarivi ja luentakuvaksi sumea valokuva; muut kentät ennallaan.</summary>
        public static Saapumisvirta Virta(string kaupunki, Saapumisvirta v)
        {
            if (v == null || !Koskee(kaupunki)) return v;
            if (virrat.TryGetValue(kaupunki, out var c) && c.Pohja == v) return c.Kopio;
            var k = v.Kopio();
            k.Teksti = data.Teksti;
            k.Paikkarivi = data.Paikkarivit[kaupunki] ?? v.Paikkarivi;
            k.Luentakuvat = new List<VirtaKuva>();
            if (!string.IsNullOrEmpty(data.KuvaUrl)) k.Luentakuvat.Add(new VirtaKuva { Osoite = data.KuvaUrl });
            k.PuluKuvat = new List<VirtaKuva>();
            virrat[kaupunki] = (v, k);
            return k;
        }

        /// <summary>Isoisän aarreluenta aloituskaupungissa (Luennat.Korvaava), tai null.</summary>
        public static Luento Luento(string kaupunki)
        {
            if (!Koskee(kaupunki) || string.IsNullOrEmpty(data.IsoisaUrl)) return null;
            if (luennot.TryGetValue(kaupunki, out var l)) return l;
            l = new Luento
            {
                Id = "aloitus-aarre:" + kaupunki, Kaupunki = kaupunki, Url = data.IsoisaUrl,
                Teksti = data.Teksti, Paikkarivi = data.Paikkarivit[kaupunki], Kesto = data.IsoisaKesto,
            };
            luennot[kaupunki] = l;
            return l;
        }

        /// <summary>Pulun aarrerepliikin ääni (0 = "Isoisäsi ei tiettävästi…", 1 = "Onnea aarteen etsintään!"), tai null.</summary>
        public static string PuluUrl(int i) => data != null && i >= 0 && i < data.PuluUrlit.Count ? data.PuluUrlit[i] : null;
    }
}
