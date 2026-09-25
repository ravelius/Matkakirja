using System;
using System.Collections.Generic;
using System.Globalization;
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
    /// persistentDataPath/verkko-yhteenveto.json; `verkko nollaa` tyhjentää summat.
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
        static readonly Dictionary<string, Summa> odotukset = new Dictionary<string, Summa>();
        static readonly Dictionary<string, Summa> haut = new Dictionary<string, Summa>();
        static int hakuja;
        static string tiedosto;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            PeliVaihe = null;
            tiedosto = null;
            lock (lukko) { aktiiviset.Clear(); odotukset.Clear(); haut.Clear(); hakuja = 0; }
        }

        /// <summary>Nykyinen vaihe: viimeisin aktiivinen odotus, muuten pelin vaihe.</summary>
        public static string Vaihe
        {
            get
            {
                lock (lukko) if (aktiiviset.Count > 0) return aktiiviset[aktiiviset.Count - 1];
                try { return PeliVaihe?.Invoke() ?? "kaynnistys"; } catch (Exception) { return "?"; }
            }
        }

        static float Nyt => Time.realtimeSinceStartup;

        /// <summary>Pelaaja alkaa odottaa (pääsäie).</summary>
        public static Odotus Alku(string vaihe, string mita)
        {
            lock (lukko) { aktiiviset.Add(vaihe); return new Odotus(vaihe, mita, Nyt, hakuja); }
        }

        /// <summary>Odotus päättyi (näkymä tuli tai luovuttiin). Kutsu kerran jokaista Alkua kohden.</summary>
        public static void Loppu(Odotus o, string tulos = null)
        {
            if (o.Vaihe == null) return;
            int n;
            lock (lukko)
            {
                int i = aktiiviset.LastIndexOf(o.Vaihe);
                if (i >= 0) aktiiviset.RemoveAt(i);
                n = hakuja - o.Haut;
            }
            Kirjaa(o.Vaihe, o.Mita, (Nyt - o.Alku) * 1000.0, n, tulos);
        }

        /// <summary>Valmiiksi mitattu odotus (esim. aloituslennon musta verho).</summary>
        public static void Kirjaa(string vaihe, string mita, double ms, int verkkohaut = -1, string tulos = null)
        {
            lock (lukko) Lisaa(odotukset, vaihe, ms, 0);
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

        /// <summary>Oikea verkkohaku valmistui (lahde: sisalto, peli, kuva, puhe, laatta, linssi). Pääsäikeessä (Vaihe lukee pelin tilaa).</summary>
        public static void Haku(string lahde, double ms, long tavut)
        {
            string vaihe = Vaihe;
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
                sb.Append("}}");
            }
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
        public static void NollaaSummat()
        {
            lock (lukko) { odotukset.Clear(); haut.Clear(); }
        }
    }
}
