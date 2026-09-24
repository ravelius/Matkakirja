using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Offline-lataus (RAJAPINTA.md luku 7; omistajan linjaus: binaari pieni, kaikki
    /// striimataan; pelaaja lataa maanosittain tai "Kaikki", UI ryhmittelee maat Manner-kentällä). Latauslista on sisältöpaketin
    /// offline.json (Siirtoseppä, RAJAPINTA 10.2): globaali osa (rasteri z0–5, maaston
    /// yläosa) omana alueenaan "maailma" ja maat ISO3-tunnuksella.
    ///
    /// Tiedostot menevät Laattapalvelimen offline-kansioon samoilla avaimilla, joilla
    /// Cesium ne pyytää, joten ladattu maa toimii ilman verkkoa. Pohjaosoitteet otetaan
    /// ajossa olevasta kohtauksesta (rasteriPohja, maastoLayer), ei manifestista, jotta
    /// poltonvaihto ei riko ladattuja maita. Valmis maa kirjataan tiedostoon
    /// offline/_alueet/&lt;id&gt;.txt (polut riveittäin); poisto säilyttää muiden maiden
    /// yhteiset tiedostot.
    ///
    /// Natiivi-UI:n asetuspaneeli käyttää tätä IOfflineLataus-sillan kautta
    /// (Scripts/Kartta/OfflineSilta.cs).
    /// </summary>
    public class Alueet : MonoBehaviour
    {
        public enum Tila { Ei, Jonossa, Latautuu, Valmis, Virhe }

        public sealed class Alue
        {
            public string Id, Nimi;
            /// <summary>Maanosa offline.jsonin maat[].manner-kentästä (skeema 1.23); maailmalla null.</summary>
            public string Manner;
            public long Tavut, Ladattu;
            public Tila Tila;
            public string Virhe;
            internal Dictionary<string, object> Tiedot;
        }

        [Tooltip("Pohjalaattojen osoitepohja slippy-muodossa ({z}/{x}/{y}), sama kansio kuin Rakennus.LaattaUrl.")]
        public string rasteriPohja;
        [Tooltip("Maaston layer.json (sama kuin pallon url).")]
        public string maastoLayer;
        public int rinnakkain = 8;
        [Tooltip("Rinnakkaisuus, kun näkyvän kartan laattoja haetaan tai näkymä liikkuu (näkyvä ensin).")]
        public int rinnakkainKiireessa = 2;
        public PalloKierto kierto;

        int Raja => Laattapalvelin.Kiireinen || (kierto != null && kierto.Liikkeessa) ? rinnakkainKiireessa : rinnakkain;

        public IReadOnlyList<Alue> Luettelo => alueet;
        /// <summary>Lista tai tila muuttui (edistyminen enintään 4 kertaa sekunnissa).</summary>
        public event Action Muuttui;
        public bool Valmis { get; private set; }

        readonly List<Alue> alueet = new List<Alue>();
        readonly Queue<Alue> jono = new Queue<Alue>();
        Alue kaynnissa;
        bool peruttu;
        string maastoPohja;
        float seuraavaIlmoitus;

        static string Kirjanpito => Path.Combine(Laattapalvelin.OfflineKansio, "_alueet");
        static string Merkki(string id) => Path.Combine(Kirjanpito, id + ".txt");

        void Start()
        {
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            StartCoroutine(LataaLuettelo());
        }

        IEnumerator LataaLuettelo()
        {
            string teksti = null;
            yield return Sisalto.HaePaketista("offline.json", t => teksti = t, true);
            if (teksti == null) { Debug.Log("MATKAKIRJA alueet: offline.json puuttuu tästä paketista"); yield break; }
            var juuri = Peli.MiniJson.Jasenna(teksti) as Dictionary<string, object>;
            if (juuri == null) yield break;

            if (!string.IsNullOrEmpty(maastoLayer))
            {
                using var r = UnityEngine.Networking.UnityWebRequest.Get(maastoLayer);
                r.timeout = 20;
                yield return r.SendWebRequest();
                if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success &&
                    Peli.MiniJson.Jasenna(r.downloadHandler.text) is Dictionary<string, object> layer &&
                    layer.TryGetValue("tiles", out var t) && t is List<object> tl && tl.Count > 0 && tl[0] is string pohja)
                    maastoPohja = maastoLayer.Substring(0, maastoLayer.LastIndexOf('/') + 1) + pohja;
            }

            if (juuri.TryGetValue("globaali", out var g) && g is Dictionary<string, object> gd)
                alueet.Add(Uusi("maailma", "Maailma (yleiskartta)", gd));
            if (juuri.TryGetValue("maat", out var m) && m is Dictionary<string, object> maat)
            {
                var lista = new List<Alue>();
                foreach (var p in maat)
                    if (p.Value is Dictionary<string, object> md)
                        lista.Add(Uusi(p.Key, md.TryGetValue("nimi", out var n) && n is string ns ? ns : p.Key, md));
                lista.Sort((a, b) => string.Compare(a.Nimi, b.Nimi, StringComparison.CurrentCulture));
                alueet.AddRange(lista);
            }
            Valmis = true;
            Debug.Log($"MATKAKIRJA alueet: {alueet.Count} aluetta, maasto {maastoPohja ?? "puuttuu"}");
            Muuttui?.Invoke();
        }

        Alue Uusi(string id, string nimi, Dictionary<string, object> d)
        {
            long tavut = 0;
            if (d.TryGetValue("tavuja", out var t) && t is Dictionary<string, object> td && td.TryGetValue("yht", out var y) && y is double yd)
                tavut = (long)yd;
            var a = new Alue { Id = id, Nimi = nimi, Tavut = tavut, Tiedot = d, Manner = d.TryGetValue("manner", out var mn) ? mn as string : null };
            if (File.Exists(Merkki(id))) { a.Tila = Tila.Valmis; a.Ladattu = tavut; }
            return a;
        }

        Alue Etsi(string id) => alueet.Find(a => a.Id == id);

        public void Lataa(string id)
        {
            var a = Etsi(id);
            if (a == null || a.Tila == Tila.Valmis || a.Tila == Tila.Jonossa || a.Tila == Tila.Latautuu) return;
            // Maailman yleiskartta ensin, jos sitä ei ole.
            var maailma = Etsi("maailma");
            if (maailma != null && a != maailma && maailma.Tila == Tila.Ei) { maailma.Tila = Tila.Jonossa; jono.Enqueue(maailma); }
            a.Tila = Tila.Jonossa;
            a.Virhe = null;
            jono.Enqueue(a);
            Muuttui?.Invoke();
            if (kaynnissa == null) StartCoroutine(Tyojono());
        }

        public void Peru(string id)
        {
            var a = Etsi(id);
            if (a == null) return;
            if (a == kaynnissa) peruttu = true;
            else if (a.Tila == Tila.Jonossa) a.Tila = Tila.Ei;
            Muuttui?.Invoke();
        }

        public void Poista(string id)
        {
            var a = Etsi(id);
            if (a == null || a == kaynnissa) return;
            string merkki = Merkki(id);
            if (File.Exists(merkki))
            {
                var muut = new HashSet<string>();
                foreach (var f in Directory.GetFiles(Kirjanpito, "*.txt"))
                    if (f != merkki) foreach (var r in File.ReadAllLines(f)) muut.Add(r);
                int poistettu = 0;
                foreach (var r in File.ReadAllLines(merkki))
                {
                    if (muut.Contains(r)) continue;
                    var f = Laattapalvelin.Tiedosto(Laattapalvelin.OfflineKansio, r);
                    if (File.Exists(f)) { File.Delete(f); poistettu++; }
                }
                File.Delete(merkki);
                Debug.Log($"MATKAKIRJA alueet: {id} poistettu, {poistettu} tiedostoa");
            }
            a.Tila = Tila.Ei;
            a.Ladattu = 0;
            Muuttui?.Invoke();
        }

        /// <summary>Alueen tiedostot ämpärin polkuina (samat avaimet kuin Cesiumin pyynnöt).</summary>
        List<string> Polut(Alue a)
        {
            var polut = new List<string>();
            string Suhteellinen(string url) =>
                url.StartsWith(Laattapalvelin.Ampari) ? url.Substring(Laattapalvelin.Ampari.Length) : null;
            void Laatat(string kentta, string pohja)
            {
                if (pohja == null || !a.Tiedot.TryGetValue(kentta, out var k) || !(k is Dictionary<string, object> tasot)) return;
                foreach (var t in tasot)
                {
                    if (!int.TryParse(t.Key, out int z)) continue;
                    // Välit: [x0,y0,x1,y1] tai lista välejä.
                    var valit = new List<List<object>>();
                    if (t.Value is List<object> l && l.Count > 0)
                    {
                        if (l[0] is List<object>) foreach (var v in l) valit.Add((List<object>)v);
                        else valit.Add(l);
                    }
                    foreach (var v in valit)
                    {
                        if (v.Count < 4) continue;
                        int x0 = (int)(double)v[0], y0 = (int)(double)v[1], x1 = (int)(double)v[2], y1 = (int)(double)v[3];
                        for (int x = x0; x <= x1; x++)
                            for (int y = y0; y <= y1; y++)
                            {
                                var s = Suhteellinen(pohja.Replace("{z}", z.ToString()).Replace("{x}", x.ToString()).Replace("{y}", y.ToString()));
                                if (s != null) polut.Add(s);
                            }
                    }
                }
            }
            Laatat("rasteri", rasteriPohja);
            Laatat("maasto", maastoPohja);
            // Napakalotit (NapaKannet) kuuluvat yleiskarttaan: ilman niitä navat jäävät yksivärisiksi kansiksi.
            if (a.Id == "maailma") polut.AddRange(NapaKannet.OfflinePolut());
            if (a.Tiedot.TryGetValue("media", out var me) && me is List<object> media)
                foreach (var u in media) if (u is string us && Suhteellinen(us) is string s) polut.Add(s);
            return polut;
        }

        IEnumerator Tyojono()
        {
            while (jono.Count > 0)
            {
                var a = jono.Dequeue();
                if (a.Tila != Tila.Jonossa) continue;
                kaynnissa = a;
                peruttu = false;
                a.Tila = Tila.Latautuu;
                Muuttui?.Invoke();
                var polut = Polut(a);
                int valmiit = 0, virheet = 0, kesken = 0;
                long tavut = 0;
                float alku = Time.realtimeSinceStartup;
                for (int i = 0; i < polut.Count && !peruttu; i++)
                {
                    while (kesken >= Raja) yield return null;
                    kesken++;
                    StartCoroutine(Laataattiedosto(polut[i], b =>
                    {
                        kesken--;
                        if (b < 0) virheet++; else { valmiit++; tavut += b; }
                    }));
                    if (Time.unscaledTime >= seuraavaIlmoitus)
                    {
                        seuraavaIlmoitus = Time.unscaledTime + 0.25f;
                        a.Ladattu = a.Tavut > 0 ? a.Tavut * valmiit / Math.Max(1, polut.Count) : tavut;
                        Muuttui?.Invoke();
                    }
                }
                while (kesken > 0) yield return null;
                if (peruttu) { a.Tila = Tila.Ei; a.Ladattu = 0; }
                else if (virheet > polut.Count / 50 + 5)
                {
                    a.Tila = Tila.Virhe;
                    a.Virhe = $"{virheet} tiedostoa ei latautunut (verkko?)";
                }
                else
                {
                    Directory.CreateDirectory(Kirjanpito);
                    File.WriteAllLines(Merkki(a.Id), polut);
                    a.Tila = Tila.Valmis;
                    a.Ladattu = a.Tavut > 0 ? a.Tavut : tavut;
                }
                Debug.Log($"MATKAKIRJA alueet: {a.Id} {a.Tila}, {valmiit}/{polut.Count} tiedostoa, " +
                          $"{tavut / 1048576.0:0.0} Mt, virheitä {virheet}, {Time.realtimeSinceStartup - alku:0} s");
                kaynnissa = null;
                Muuttui?.Invoke();
            }
        }

        static IEnumerator Laataattiedosto(string polku, Action<long> valmis) => Laattapalvelin.LataaOffline(polku, valmis);
    }
}
