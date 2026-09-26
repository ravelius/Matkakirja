using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.IO;
using System.Text;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// VERKKO-ODOTUSMITTARI (Fable 25.9.2026: "pelaaja odotti verkkoa X ms" per vaihe; esilatauspolitiikan pohja,
    /// ei politiikkaa). Kaksi lajia:
    ///
    /// 1. ODOTUS: pelaaja odottaa näkymää, joka ei tule ennen dataa (käynnistyksen verho ja sisältö, aloituslennon
    ///    musta verho, nostokortti piilossa kunnes data jäsennetty, linssin aineisto, puheen lataus ennen ääntä).
    ///    <see cref="Alku"/> … <see cref="Loppu"/>; rivi lokiin "MATKAKIRJA verkko-odotus {json}" ja tiedostoon
    ///    persistentDataPath/verkko-odotus.jsonl. Rivin "haut" = odotuksen aikana valmistuneet verkkohaut (0 = odotus
    ///    ei johtunut verkosta: välimuisti, purku tai kiinteä ajastus).
    /// 2. HAKU: jokainen oikea verkkohaku (ei välimuistiosumia) yhteisistä latausavuista (Sisalto, PeliOhjain,
    ///    Kuvat, Puhe, Laattapalvelin) kirjataan vaiheen ja lähteen summiin (<see cref="Haku"/>).
    ///
    /// Vaihe: aktiivisen odotuksen vaihe, muuten <see cref="PeliVaihe"/> (PeliOhjain: kaynnistys, aloitus, lento,
    /// saapuminen, kaupunki, matka, lehti, linssi). Yhteenveto testikomennolla `verkko` (peli-komento.txt) →
    /// persistentDataPath/verkko-yhteenveto.json; `verkko nollaa` tyhjentää summat. Sama komento kirjoittaa lokiin
    /// "MATKAKIRJA esilataaja: mittari osuma …" ja yhteenvedon "esilataaja"/"mittari"-avaimeen (EsilataajaMittari.cs).
    /// </summary>
    public static class VerkkoOdotus
    {
        /// <summary>Pelin vaihe verkkohakujen kirjaukseen (PeliOhjain asettaa).</summary>
        public static Func<string> PeliVaihe;

        public readonly struct Odotus
        {
            public readonly string Vaihe, Mita;
            public readonly float Alku;
            public readonly int Haut;
            public Odotus(string vaihe, string mita, float alku, int haut) { Vaihe = vaihe; Mita = mita; Alku = alku; Haut = haut; }
        }

        class Summa { public int N; public double Ms, MaxMs; public long Tavut; }

        static readonly object lukko = new object();
        static readonly List<string> aktiiviset = new List<string>();
        /// <summary>Aktiivisten odotusten alkuhetket (kello, s). Yli <see cref="OdotusKatto"/> vanhat karsitaan: coroutine
        /// voi pysähtyä (StopCoroutine) ennen Loppua, eikä vaihe saa jäädä pinoon.</summary>
        static readonly List<double> aktiivisetAlku = new List<double>();
        const double OdotusKatto = 30;
        static readonly System.Diagnostics.Stopwatch kello = System.Diagnostics.Stopwatch.StartNew();

        /// <summary>Päällimmäinen voimassa oleva odotus tai null (lukon sisällä).</summary>
        static string Paallimmainen()
        {
            double nyt = kello.Elapsed.TotalSeconds;
            for (int i = aktiiviset.Count - 1; i >= 0; i--)
                if (nyt - aktiivisetAlku[i] > OdotusKatto) { aktiiviset.RemoveAt(i); aktiivisetAlku.RemoveAt(i); }
            return aktiiviset.Count > 0 ? aktiiviset[aktiiviset.Count - 1] : null;
        }
        static readonly Dictionary<string, Summa> odotukset = new Dictionary<string, Summa>();
        static readonly Dictionary<string, Summa> haut = new Dictionary<string, Summa>();
        /// <summary>Osuma-% (Esilataaja erä 1): vaihe/lähde → N = pyyntöjä, Tavut = välimuistista (osumat).</summary>
        static readonly Dictionary<string, Summa> osumat = new Dictionary<string, Summa>();
        /// <summary>
        /// "Pelaaja odotti verkkoa" (Raamattu ESILATAUSPOLITIIKKA, MITTARIT): vaihe → odotukset, joiden aikana valmistui
        /// verkkohaku (haut > 0) tai jotka ovat puheen latausta — sama sääntö kuin verkko-savukkeen RAJA-rivillä.
        /// </summary>
        static readonly Dictionary<string, Summa> verkkoaOdotettu = new Dictionary<string, Summa>();
        static int hakuja;
        /// <summary>Pääsäikeen viimeksi laskema vaihe (PaivitaVaihe), taustasäikeiden kirjauksiin.</summary>
        static volatile string vaiheKopio = "kaynnistys";
        static string tiedosto;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            PeliVaihe = null;
            tiedosto = null;
            lock (lukko) { aktiiviset.Clear(); aktiivisetAlku.Clear(); odotukset.Clear(); haut.Clear(); osumat.Clear(); hakuja = 0; }
            vaiheKopio = "kaynnistys";
        }

        /// <summary>Pääsäie (Esilataaja.Update): vaihe talteen taustasäikeiden kirjauksia varten.</summary>
        public static void PaivitaVaihe() => vaiheKopio = Vaihe;

        /// <summary>
        /// Pyyntö palveltiin välimuistista (osuma) tai verkosta. Osuma-% = osumat / pyynnöt per vaihe ja lähde.
        /// Säieturvallinen (Laattapalvelin kirjaa taustasäikeestä): käyttää pääsäikeen vaihekopiota.
        /// </summary>
        public static void Osuma(string lahde, bool valimuistista)
        {
            string avain;
            lock (lukko) avain = (Paallimmainen() ?? vaiheKopio) + "/" + lahde;
            lock (lukko)
            {
                if (!osumat.TryGetValue(avain, out var o)) osumat[avain] = o = new Summa();
                o.N++;
                if (valimuistista) o.Tavut++;
            }
        }

        /// <summary>Nykyinen vaihe: viimeisin aktiivinen odotus, muuten pelin vaihe.</summary>
        public static string Vaihe
        {
            get
            {
                lock (lukko) { var p = Paallimmainen(); if (p != null) return p; }
                try { return PeliVaihe?.Invoke() ?? "kaynnistys"; } catch (Exception) { return "?"; }
            }
        }

        static float Nyt => Time.realtimeSinceStartup;

        /// <summary>Pelaaja alkaa odottaa (pääsäie).</summary>
        public static Odotus Alku(string vaihe, string mita)
        {
            lock (lukko) { aktiiviset.Add(vaihe); aktiivisetAlku.Add(kello.Elapsed.TotalSeconds); return new Odotus(vaihe, mita, Nyt, hakuja); }
        }

        /// <summary>Odotus päättyi (näkymä tuli tai luovuttiin). Kutsu kerran jokaista Alkua kohden.</summary>
        public static void Loppu(Odotus o, string tulos = null)
        {
            if (o.Vaihe == null) return;
            int n;
            lock (lukko)
            {
                int i = aktiiviset.LastIndexOf(o.Vaihe);
                if (i >= 0) { aktiiviset.RemoveAt(i); aktiivisetAlku.RemoveAt(i); }
                n = hakuja - o.Haut;
            }
            Kirjaa(o.Vaihe, o.Mita, (Nyt - o.Alku) * 1000.0, n, tulos);
        }

        /// <summary>Valmiiksi mitattu odotus (esim. aloituslennon musta verho).</summary>
        public static void Kirjaa(string vaihe, string mita, double ms, int verkkohaut = -1, string tulos = null)
        {
            lock (lukko)
            {
                Lisaa(odotukset, vaihe, ms, 0);
                if (verkkohaut > 0 || (mita != null && mita.StartsWith("puhe:", StringComparison.Ordinal))) Lisaa(verkkoaOdotettu, vaihe, ms, 0);
            }
            var sb = new StringBuilder(160);
            sb.Append("{\"t\":").Append(Nyt.ToString("0.00", CultureInfo.InvariantCulture))
              .Append(",\"vaihe\":\"").Append(vaihe).Append("\",\"mita\":\"").Append(Puhdas(mita))
              .Append("\",\"ms\":").Append(Math.Round(ms).ToString(CultureInfo.InvariantCulture));
            if (verkkohaut >= 0) sb.Append(",\"haut\":").Append(verkkohaut);
            if (tulos != null) sb.Append(",\"tulos\":\"").Append(Puhdas(tulos)).Append('"');
            sb.Append('}');
            var rivi = sb.ToString();
            Debug.Log("MATKAKIRJA verkko-odotus " + rivi);
            try
            {
                tiedosto ??= Path.Combine(Application.persistentDataPath, "verkko-odotus.jsonl");
                File.AppendAllText(tiedosto, rivi + "\n");
            }
            catch (Exception) { }
        }

        /// <summary>
        /// Hakurivit osoitteineen (kehittäjätila tai komento `verkko haut paalle`): persistentDataPath/verkko-haut.jsonl
        /// {t, vaihe, lahde, url, ms, kt} — mitä käynnistyksessä haetaan verkosta (ESILATAUSPOLITIIKKA kohta 1 -analyysi).
        /// </summary>
        public static bool HautTiedostoon { get; private set; }
        static string hautTiedosto;

        /// <summary>Kytkee hakurivit (pääsäikeestä: polku luetaan täällä, Laattapalvelin kirjaa taustasäikeestä).</summary>
        public static void KirjaaHaut(bool paalla)
        {
            hautTiedosto = Path.Combine(Application.persistentDataPath, "verkko-haut.jsonl");
            HautTiedostoon = paalla;
        }

        /// <summary>Kylmän käynnistyksen mittaus: ympäristömuuttuja MATKAKIRJA_HAUT=1 (simctl: SIMCTL_CHILD_MATKAKIRJA_HAUT=1).</summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void HautYmparistosta()
        {
            if (Environment.GetEnvironmentVariable("MATKAKIRJA_HAUT") == "1") KirjaaHaut(true);
        }

        /// <summary>Oikea verkkohaku valmistui (lahde: sisalto, peli, kuva, puhe, laatta, linssi).</summary>
        public static void Haku(string lahde, double ms, long tavut, string url = null)
        {
            string vaihe;
            lock (lukko) vaihe = Paallimmainen() ?? vaiheKopio;
            if (HautTiedostoon && url != null)
            {
                int q = url.IndexOf('?');
                string rivi = "{\"t\":" + Nyt.ToString("0.00", CultureInfo.InvariantCulture) + ",\"vaihe\":\"" + vaihe + "\",\"lahde\":\"" + lahde
                    + "\",\"url\":\"" + Puhdas(q > 0 ? url.Substring(0, q) : url) + "\",\"ms\":" + Math.Round(ms).ToString(CultureInfo.InvariantCulture)
                    + ",\"kt\":" + (tavut / 1024) + "}";
                try
                {
                    if (hautTiedosto != null) lock (lukko) File.AppendAllText(hautTiedosto, rivi + "\n");
                }
                catch (Exception) { }
            }
            lock (lukko)
            {
                hakuja++;
                Lisaa(haut, vaihe + "/" + lahde, ms, tavut);
            }
        }

        static void Lisaa(Dictionary<string, Summa> d, string avain, double ms, long tavut)
        {
            if (!d.TryGetValue(avain, out var s)) d[avain] = s = new Summa();
            s.N++; s.Ms += ms; s.Tavut += tavut; if (ms > s.MaxMs) s.MaxMs = ms;
        }

        static string Puhdas(string s) => (s ?? "").Replace("\\", "/").Replace("\"", "'");

        /// <summary>Summat JSONina (vaihe → odotukset; vaihe/lähde → haut) ja tiedostoon verkko-yhteenveto.json.</summary>
        public static string Yhteenveto()
        {
            var sb = new StringBuilder(1024);
            lock (lukko)
            {
                sb.Append("{\"odotukset\":{");
                Kirjoita(sb, odotukset, false);
                sb.Append("},\"haut\":{");
                Kirjoita(sb, haut, true);
                sb.Append("},\"osumat\":{");
                bool eka = true;
                var avaimet = new List<string>(osumat.Keys);
                avaimet.Sort(StringComparer.Ordinal);
                foreach (var k in avaimet)
                {
                    var o = osumat[k];
                    if (!eka) sb.Append(',');
                    eka = false;
                    sb.Append('"').Append(k).Append("\":{\"n\":").Append(o.N).Append(",\"osumia\":").Append(o.Tavut)
                      .Append(",\"pros\":").Append(o.N > 0 ? (100 * o.Tavut / o.N).ToString(CultureInfo.InvariantCulture) : "0").Append('}');
                }
                sb.Append("},\"esilataaja\":{\"kaynnissa\":").Append(Esilataaja.Kaynnissa).Append(",\"jonossa\":").Append(Esilataaja.Jonossa)
                  .Append(",\"uusintoja\":").Append(Esilataaja.Uusintoja).Append(",\"joutilaita\":").Append(Esilataaja.JoutilaitaHetkia).Append(",\"ennakoituja\":").Append(Esilataaja.Ennakoituja)
                  .Append(",\"tiedostoja\":").Append(Esilataaja.TiedostojaValmiina)
                  // Esilataajan osuma-% ja Nakyva-pyyntöjen odotus (EsilataajaMittari.cs): kokonaisuus ja vaiheittain.
                  .Append(",\"mittari\":").Append(Esilataaja.Mittari.Json())
                  // Laatat omana rivinään (LaattaOsumat.cs, build 22).
                  .Append(",\"laatat\":").Append(LaattaOsumat.Json())
                  // VANHA SISÄLTÖ (Fable 26.9.): käynnistyksen kokoelmat, jotka luettiin buildin tilannekuvasta.
                  .Append(",\"vanhaaKaytetty\":[").Append(string.Join(",", Sisalto.VanhaaKaytetty.ConvertAll(x =>
                      $"{{\"kohde\":\"{x.Kohde}\",\"lahde\":\"{x.Lahde}\",\"ikaVrk\":{x.IkaVrk.ToString("0.0", System.Globalization.CultureInfo.InvariantCulture)}}}"))).Append("]}}");
            }
            Debug.Log(Esilataaja.MittariRivi());
            var json = sb.ToString();
            try { File.WriteAllText(Path.Combine(Application.persistentDataPath, "verkko-yhteenveto.json"), json); } catch (Exception) { }
            return json;
        }

        static void Kirjoita(StringBuilder sb, Dictionary<string, Summa> d, bool tavut)
        {
            bool eka = true;
            var avaimet = new List<string>(d.Keys);
            avaimet.Sort(StringComparer.Ordinal);
            foreach (var k in avaimet)
            {
                var s = d[k];
                if (!eka) sb.Append(',');
                eka = false;
                sb.Append('"').Append(k).Append("\":{\"n\":").Append(s.N)
                  .Append(",\"ms\":").Append(Math.Round(s.Ms).ToString(CultureInfo.InvariantCulture))
                  .Append(",\"max\":").Append(Math.Round(s.MaxMs).ToString(CultureInfo.InvariantCulture));
                if (tavut) sb.Append(",\"kt\":").Append((s.Tavut / 1024).ToString(CultureInfo.InvariantCulture));
                sb.Append('}');
            }
        }

        /// <summary>Testikomento `verkko nollaa`: summat pois (tiedosto jää).</summary>
        /// <summary>Vaiheen verkko-odotus millisekunteina (0 = pelaaja ei odottanut verkkoa).</summary>
        public static double VerkkoaOdotettuMs(string vaihe)
        {
            lock (lukko) return verkkoaOdotettu.TryGetValue(vaihe, out var s) ? s.Ms : 0;
        }

        /// <summary>Kaikkien vaiheiden verkko-odotus yhteensä (ms) ja osuma-% kaikista pyynnöistä (−1 = ei pyyntöjä).</summary>
        public static (double Ms, int OsumaPros) Kokonaisuus()
        {
            lock (lukko)
            {
                double ms = verkkoaOdotettu.Values.Sum(s => s.Ms);
                long n = osumat.Values.Sum(s => (long)s.N), o = osumat.Values.Sum(s => s.Tavut);
                return (ms, n > 0 ? (int)Math.Round(100.0 * o / n) : -1);
            }
        }

        /// <summary>
        /// VARTIJA laitteelle (Laitetestaajan kierros; komento `verkko raja [vaihe]`): "RAJA saapuminen 0 ms verkko-odotusta:
        /// PASS|FAIL (ms, kpl)". Sama sääntö kuin Peli-testit/verkko-savuke.sh, mutta ilman Macin skriptiä.
        /// </summary>
        public static string Raja(string vaihe = "saapuminen")
        {
            int n;
            double ms;
            lock (lukko) { verkkoaOdotettu.TryGetValue(vaihe, out var s); ms = s?.Ms ?? 0; n = s?.N ?? 0; }
            return $"RAJA {vaihe} 0 ms verkko-odotusta: {(ms == 0 ? "PASS" : "FAIL")} ({Math.Round(ms)} ms, {n} odotusta)";
        }

        /// <summary>Kehittäjätilan rivi (KehysMittari): odotettu verkkoa yhteensä ja saapumisessa, osuma-%.</summary>
        public static string Rivi()
        {
            var (ms, pros) = Kokonaisuus();
            return $"\"verkkoOdotusMs\":{Math.Round(ms)},\"saapuminenVerkkoMs\":{Math.Round(VerkkoaOdotettuMs("saapuminen"))},\"osumaPros\":{pros}";
        }

        public static void NollaaSummat()
        {
            lock (lukko) { odotukset.Clear(); haut.Clear(); osumat.Clear(); verkkoaOdotettu.Clear(); }
            Esilataaja.Mittari.NollaaSummat();
            LaattaOsumat.NollaaSummat();
        }
    }
}
