using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Matkakirja
{
    /// <summary>
    /// ESILATAAJAN OSUMA-% JA ODOTUS (suunnitelma docs/raportit/esilataaja-suunnitelma-20260925.md, "Mittarit": kun
    /// Nakyva-pyyntö löytää kohteen valmiina esilatauksen jäljiltä, se on osuma, muuten huti ja odotus kirjataan).
    /// Puhdas logiikka ilman UnityEngineä (Peli-testit/Testit/EsilataajaMittariTestit.cs); Esilataaja.cs kytkee sen
    /// hakuihin ja VerkkoOdotus.Yhteenveto kirjoittaa sen verkko-yhteenveto.json:n "esilataaja"/"mittari"-avaimeen.
    ///
    /// Kohteen avain on osoite ilman kyselyä (<see cref="Avain"/>). Esilataus = haku tasolla, joka ei ole Nakyva
    /// (<see cref="EsilatausAlkoi"/> jonoon mennessä, <see cref="HakuValmis"/> valmistuessa). Nakyva-pyynnön
    /// (<see cref="Nakyva"/>) luokka:
    ///   - Osuma: esilataus valmistui ja kutsujan välimuisti löysi kohteen → odotus 0.
    ///   - Kesken: esilataus jonossa tai haussa → huti; odotus Nakyva-pyynnöstä kohteen valmistumiseen.
    ///   - EiEsiladattu: kohdetta ei ole pyydetty esilataukseen → huti; odotus samoin.
    ///   - Hukattu: esilataus valmistui, mutta kutsuja ei löytänyt kohdetta (eri välimuisti, siivottu, levykirjoitus
    ///     kesken) → huti; odotus samoin.
    ///   - Levylla: kohde oli jo valmiina (muisti, levy, buildissa) ilman tämän istunnon esilatausta. EI lasketa
    ///     osuma-%:iin: se ei kerro esilataajasta mitään (edellisen istunnon välimuisti, paketti tai buildin mukana
    ///     tuleva), ja lämpimässä ajossa se nostaisi osuma-%:n lähes sataan. Pelaaja ei odottanut, joten määrä
    ///     raportoidaan erikseen. Lähdekohtainen välimuistiosuma on VerkkoOdotus.Osuma (osumat-avain).
    ///   - Toisto: saman kohteen myöhempi Nakyva-pyyntö (muistista); vain laskuri, ei osuma-%:iin.
    /// Osuma-% = osumat / (osumat + hudit). Odotus lasketaan huteista, kun kohde valmistuu (<see cref="HakuValmis"/>
    /// tai <see cref="NakyvaValmis"/>, kumpi ensin); valmistumattomat näkyvät "avoimia"-lukuna.
    /// Säieturvallinen (lukko), mutta kutsutaan käytännössä pääsäikeestä.
    /// </summary>
    public sealed class EsilataajaMittari
    {
        public enum Luokka { Osuma, Kesken, EiEsiladattu, Hukattu, Levylla, Toisto }

        enum Tila { Jonossa, Valmis, Kaytetty }

        sealed class Avoin { public string Vaihe; public double Alku; public Luokka Luokka; }

        /// <summary>Päättynyt huti (build 22: mitkä kohteet pelaaja odotti, jotta esilataus osataan kohdistaa).</summary>
        public sealed class Huti { public string Vaihe, Kohde; public Luokka Luokka; public double Ms; }
        public const int HutejaEnintaan = 300;
        readonly List<Huti> hudit = new List<Huti>();

        /// <summary>Vaiheen (tai kaikkien) laskurit ja huteista kirjatut odotukset.</summary>
        public sealed class Tilasto
        {
            public int Osumat, Kesken, EiEsiladattu, Hukattu, Levylla, Toistot;
            public readonly List<double> Odotukset = new List<double>();
            public int Hudit => Kesken + EiEsiladattu + Hukattu;
            /// <summary>Osuma-% kokonaislukuna, −1 = ei yhtään laskettavaa Nakyva-pyyntöä.</summary>
            public int Pros => Osumat + Hudit > 0 ? (int)Math.Round(100.0 * Osumat / (Osumat + Hudit)) : -1;
            public double SummaMs { get { double s = 0; foreach (var o in Odotukset) s += o; return s; } }
            public double MaxMs { get { double m = 0; foreach (var o in Odotukset) if (o > m) m = o; return m; } }
            public double MediaaniMs => Persentiili(50);
            public double P95Ms => Persentiili(95);

            /// <summary>Lähimmän sijan persentiili (0 ilman odotuksia).</summary>
            public double Persentiili(double p)
            {
                if (Odotukset.Count == 0) return 0;
                var j = new List<double>(Odotukset);
                j.Sort();
                int i = (int)Math.Ceiling(p / 100.0 * j.Count) - 1;
                return j[Math.Max(0, Math.Min(j.Count - 1, i))];
            }

            internal void Lisaa(Luokka l)
            {
                switch (l)
                {
                    case Luokka.Osuma: Osumat++; break;
                    case Luokka.Kesken: Kesken++; break;
                    case Luokka.EiEsiladattu: EiEsiladattu++; break;
                    case Luokka.Hukattu: Hukattu++; break;
                    case Luokka.Levylla: Levylla++; break;
                    default: Toistot++; break;
                }
            }
        }

        readonly object lukko = new object();
        readonly Dictionary<string, Tila> kohteet = new Dictionary<string, Tila>();
        readonly Dictionary<string, Avoin> avoimet = new Dictionary<string, Avoin>();
        readonly Tilasto kaikki = new Tilasto();
        readonly SortedDictionary<string, Tilasto> vaiheet = new SortedDictionary<string, Tilasto>(StringComparer.Ordinal);

        /// <summary>Osoite ilman kyselyä (kehittäjän kuvaosoitteissa on avain ?avain=, eikä se erota kohteita).</summary>
        public static string Avain(string osoite)
        {
            if (string.IsNullOrEmpty(osoite)) return null;
            int q = osoite.IndexOf('?');
            return q > 0 ? osoite.Substring(0, q) : osoite;
        }

        /// <summary>Esilataus (taso ei Nakyva) meni jonoon. Jo käytettyä tai valmista kohdetta ei palauteta keskeneräiseksi.</summary>
        public void EsilatausAlkoi(string osoite)
        {
            var a = Avain(osoite);
            if (a == null) return;
            lock (lukko) if (!kohteet.ContainsKey(a)) kohteet[a] = Tila.Jonossa;
        }

        /// <summary>
        /// Haku valmistui (mikä tahansa taso). Esilataus: onnistunut → Valmis, epäonnistunut → unohdetaan (seuraava
        /// Nakyva on "ei esiladattu"). Kohteen avoin Nakyva-odotus päättyy (Kesken-huti odotti tätä), paitsi epäonnistuneesta
        /// esilatauksesta: silloin kutsuja hakee itse, ja odotus jatkuu sen hakuun tai <see cref="NakyvaValmis"/>-kutsuun.
        /// </summary>
        public void HakuValmis(string osoite, bool esilataus, bool ok, double nytMs)
        {
            var a = Avain(osoite);
            if (a == null) return;
            lock (lukko)
            {
                if (esilataus && kohteet.TryGetValue(a, out var t) && t == Tila.Jonossa)
                {
                    if (ok) kohteet[a] = Tila.Valmis; else kohteet.Remove(a);
                }
                if (ok || !esilataus) Sulje(a, nytMs);
            }
        }

        /// <summary>
        /// Nakyva-pyyntö (pelaaja tarvitsee kohteen nyt). valmiina = kutsujan välimuisti (muisti, levy, buildi) löysi sen.
        /// Palauttaa luokan; huteille avataan odotus, jonka <see cref="HakuValmis"/> tai <see cref="NakyvaValmis"/> päättää.
        /// </summary>
        public Luokka Nakyva(string osoite, bool valmiina, string vaihe, double nytMs)
        {
            var a = Avain(osoite);
            vaihe ??= "?";
            if (a == null) return Luokka.Toisto;
            lock (lukko)
            {
                Luokka l;
                bool tunnettu = kohteet.TryGetValue(a, out var t);
                if (tunnettu && t == Tila.Kaytetty) l = Luokka.Toisto;
                else if (tunnettu && t == Tila.Valmis) l = valmiina ? Luokka.Osuma : Luokka.Hukattu;
                else if (tunnettu && t == Tila.Jonossa) l = valmiina ? Luokka.Levylla : Luokka.Kesken;
                else l = valmiina ? Luokka.Levylla : Luokka.EiEsiladattu;
                if (l == Luokka.Toisto)
                {
                    // Toisto kesken edellisen hudin odotusta ei avaa uutta odotusta (ensimmäinen odottaa jo).
                    kaikki.Lisaa(l); Vaihe(vaihe).Lisaa(l);
                    return l;
                }
                kohteet[a] = Tila.Kaytetty;
                kaikki.Lisaa(l);
                Vaihe(vaihe).Lisaa(l);
                if (l == Luokka.Osuma) { kaikki.Odotukset.Add(0); Vaihe(vaihe).Odotukset.Add(0); }
                else if (l != Luokka.Levylla) avoimet[a] = new Avoin { Vaihe = vaihe, Alku = nytMs, Luokka = l };
                return l;
            }
        }

        /// <summary>Kutsujan Nakyva-pyyntö sai kohteen (tai luovutti); päättää avoimen odotuksen. Toistuva kutsu ei haittaa.</summary>
        public void NakyvaValmis(string osoite, double nytMs)
        {
            var a = Avain(osoite);
            if (a == null) return;
            lock (lukko) Sulje(a, nytMs);
        }

        void Sulje(string a, double nytMs)
        {
            if (!avoimet.TryGetValue(a, out var o)) return;
            avoimet.Remove(a);
            double ms = Math.Max(0, nytMs - o.Alku);
            kaikki.Odotukset.Add(ms);
            Vaihe(o.Vaihe).Odotukset.Add(ms);
            if (hudit.Count < HutejaEnintaan) hudit.Add(new Huti { Vaihe = o.Vaihe, Kohde = a, Luokka = o.Luokka, Ms = ms });
        }

        /// <summary>Päättyneet hudit pisimmästä alkaen (kopio).</summary>
        public List<Huti> Hudit()
        {
            lock (lukko) { var j = new List<Huti>(hudit); j.Sort((x, y) => y.Ms.CompareTo(x.Ms)); return j; }
        }

        Tilasto Vaihe(string v)
        {
            if (!vaiheet.TryGetValue(v, out var s)) vaiheet[v] = s = new Tilasto();
            return s;
        }

        /// <summary>Kaikkien vaiheiden tilasto (sisäinen olio lukemiseen; älä muokkaa).</summary>
        public Tilasto Kaikki { get { lock (lukko) return kaikki; } }
        public Tilasto VaiheTilasto(string vaihe) { lock (lukko) return vaiheet.TryGetValue(vaihe, out var s) ? s : new Tilasto(); }
        public int Avoimia { get { lock (lukko) return avoimet.Count; } }

        /// <summary>`verkko nollaa`: laskurit ja avoimet odotukset pois; kohteiden tila (mitä on esiladattu) jää.</summary>
        public void NollaaSummat()
        {
            lock (lukko)
            {
                avoimet.Clear();
                vaiheet.Clear();
                hudit.Clear();
                kaikki.Osumat = kaikki.Kesken = kaikki.EiEsiladattu = kaikki.Hukattu = kaikki.Levylla = kaikki.Toistot = 0;
                kaikki.Odotukset.Clear();
            }
        }

        /// <summary>Kaikki pois (istunnon alku).</summary>
        public void Nollaa()
        {
            lock (lukko) { kohteet.Clear(); NollaaSummat(); }
        }

        /// <summary>JSON-olio verkko-yhteenvetoon: kokonaisuus ja "vaiheet".</summary>
        public string Json()
        {
            var sb = new StringBuilder(512);
            lock (lukko)
            {
                sb.Append('{');
                Kirjoita(sb, kaikki);
                sb.Append(",\"avoimia\":").Append(avoimet.Count).Append(",\"vaiheet\":{");
                bool eka = true;
                foreach (var kv in vaiheet)
                {
                    if (!eka) sb.Append(',');
                    eka = false;
                    sb.Append('"').Append(kv.Key.Replace("\"", "'")).Append("\":{");
                    Kirjoita(sb, kv.Value);
                    sb.Append('}');
                }
                sb.Append("},\"hudit\":[");
                var j = new List<Huti>(hudit);
                j.Sort((x, y) => y.Ms.CompareTo(x.Ms));
                for (int i = 0; i < j.Count; i++)
                {
                    if (i > 0) sb.Append(',');
                    sb.Append("{\"vaihe\":\"").Append(j[i].Vaihe.Replace("\"", "'")).Append("\",\"kohde\":\"")
                      .Append(j[i].Kohde.Replace("\\", "/").Replace("\"", "'")).Append("\",\"luokka\":\"").Append(j[i].Luokka)
                      .Append("\",\"ms\":").Append(((long)Math.Round(j[i].Ms)).ToString(CultureInfo.InvariantCulture)).Append('}');
                }
                sb.Append("]}");
            }
            return sb.ToString();
        }

        static void Kirjoita(StringBuilder sb, Tilasto s)
        {
            sb.Append("\"osumia\":").Append(s.Osumat).Append(",\"huteja\":").Append(s.Hudit).Append(",\"pros\":").Append(s.Pros)
              .Append(",\"kesken\":").Append(s.Kesken).Append(",\"eiEsiladattu\":").Append(s.EiEsiladattu).Append(",\"hukattu\":").Append(s.Hukattu)
              .Append(",\"levylla\":").Append(s.Levylla).Append(",\"toistoja\":").Append(s.Toistot)
              .Append(",\"odotusMs\":").Append(Ms(s.SummaMs)).Append(",\"mediaaniMs\":").Append(Ms(s.MediaaniMs))
              .Append(",\"p95Ms\":").Append(Ms(s.P95Ms)).Append(",\"maxMs\":").Append(Ms(s.MaxMs));
        }

        static string Ms(double ms) => Math.Round(ms).ToString(CultureInfo.InvariantCulture);

        /// <summary>Lokirivin loppu: "osuma 12/20 60 % (kesken 3, ei esiladattu 5, hukattu 0; levyllä 7, toistoja 4, avoimia 0) odotus …".</summary>
        public string Rivi()
        {
            lock (lukko)
            {
                var s = kaikki;
                string pros = s.Pros < 0 ? "–" : s.Pros + " %";
                return $"osuma {s.Osumat}/{s.Osumat + s.Hudit} {pros} (kesken {s.Kesken}, ei esiladattu {s.EiEsiladattu}, hukattu {s.Hukattu}; "
                     + $"levyllä {s.Levylla}, toistoja {s.Toistot}, avoimia {avoimet.Count}) odotus {Ms(s.SummaMs)} ms "
                     + $"(mediaani {Ms(s.MediaaniMs)}, p95 {Ms(s.P95Ms)}, max {Ms(s.MaxMs)})";
            }
        }
    }
}
