// SILTALAUSEET (omistaja 5.10. 21.5x, Päätoimittaja; Pelikoodari generoi 94 lausetta Williamilla, juna 146): lyhyt valmis lause
// soi heti pelaajan valinnasta (siru, toive, kaupungin vaihto) tai kierroksen siirtymästä, jotta workerin vasteaika (12–17 s)
// ei ole hiljaisuutta. Ryhmä tulee workerin tunnisteesta (vaihtoehtojen_ryhmat sirujen järjestyksessä, toiveen_ryhma);
// sama lause ei toistu istunnossa. Aineisto: media.matkakirja.app/aanet/opas/siltalauseet-v1/siltalauseet.json
//   { "versio": 1, "ryhmat": { "kuittaus": [ { "id", "teksti", "kesto_s", "url" }, … ], … } }
// Moottoriton: lataus ja soitto ovat OpasSovittimessa.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class Siltalause
    {
        public string Id, Ryhma, Teksti, Url;
        public double KestoS;
    }

    public sealed class OpasSiltalauseet
    {
        /// <summary>Ryhmät (Pelikoodari): kuittaus, ruoka, moderni, vihrea, vesi, vanha, lento, kierros, syventava, kaupunki, aloitus, odotus.</summary>
        public const string Kuittaus = "kuittaus", Kaupunki = "kaupunki", Kierros = "kierros", Lento = "lento", Aloitus = "aloitus", Odotus = "odotus";

        readonly Dictionary<string, List<Siltalause>> ryhmat = new Dictionary<string, List<Siltalause>>(StringComparer.Ordinal);
        readonly HashSet<string> kaytetyt = new HashSet<string>(StringComparer.Ordinal);
        readonly Random satunnainen;

        public OpasSiltalauseet(int siemen = 0) { satunnainen = siemen == 0 ? new Random() : new Random(siemen); }

        public int Maara { get; private set; }

        public IEnumerable<Siltalause> Kaikki()
        {
            foreach (var r in ryhmat.Values) foreach (var l in r) yield return l;
        }

        /// <summary>JSON (MiniJson-sanakirja) luetuksi; virheelliset rivit ohitetaan. null, jos ryhmiä ei ole.</summary>
        public static OpasSiltalauseet Lue(Dictionary<string, object> j, int siemen = 0)
        {
            if (j == null || !j.TryGetValue("ryhmat", out var ro) || !(ro is Dictionary<string, object> rd)) return null;
            var s = new OpasSiltalauseet(siemen);
            foreach (var kv in rd)
            {
                if (!(kv.Value is IList<object> lista)) continue;
                var r = new List<Siltalause>();
                foreach (var x in lista)
                {
                    if (!(x is Dictionary<string, object> d)) continue;
                    string S(string k) => d.TryGetValue(k, out var v) ? v as string : null;
                    string id = S("id"), url = S("url");
                    if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(url)) continue;
                    double kesto = d.TryGetValue("kesto_s", out var ko) && ko != null ? Convert.ToDouble(ko, System.Globalization.CultureInfo.InvariantCulture) : 0;
                    r.Add(new Siltalause { Id = id, Ryhma = kv.Key, Teksti = S("teksti"), Url = url, KestoS = kesto });
                }
                if (r.Count > 0) { s.ryhmat[kv.Key] = r; s.Maara += r.Count; }
            }
            return s.Maara > 0 ? s : null;
        }

        /// <summary>
        /// Käyttämätön lause ryhmästä (satunnainen, ei toistoa istunnossa); jos ryhmä puuttuu tai on käytetty loppuun, vararyhmästä
        /// (oletus kuittaus). null = ei mitään soitettavaa. saatavilla rajaa ladattuihin (esim. mp3 ladattu).
        /// </summary>
        public Siltalause Valitse(string ryhma, string vara = Kuittaus, Func<Siltalause, bool> saatavilla = null)
        {
            return Ryhmasta(ryhma, saatavilla) ?? (vara != null && vara != ryhma ? Ryhmasta(vara, saatavilla) : null);
        }

        Siltalause Ryhmasta(string ryhma, Func<Siltalause, bool> saatavilla)
        {
            if (ryhma == null || !ryhmat.TryGetValue(ryhma, out var r)) return null;
            var vapaat = r.FindAll(l => !kaytetyt.Contains(l.Id) && (saatavilla == null || saatavilla(l)));
            if (vapaat.Count == 0) return null;
            var valittu = vapaat[satunnainen.Next(vapaat.Count)];
            kaytetyt.Add(valittu.Id);
            return valittu;
        }

        /// <summary>
        /// Pelaajan toiveen ryhmä: siru (teksti = jokin vaihtoehdoista) → sen ryhmä workerin vaihtoehtojen_ryhmat-listasta,
        /// muuten (vapaa teksti tai ryhmä puuttuu) kuittaus.
        /// </summary>
        public static string RyhmaToiveelle(string teksti, string[] vaihtoehdot, string[] ryhmat)
        {
            if (string.IsNullOrWhiteSpace(teksti) || vaihtoehdot == null || ryhmat == null) return Kuittaus;
            string t = teksti.Trim();
            for (int i = 0; i < vaihtoehdot.Length && i < ryhmat.Length; i++)
                if (string.Equals(vaihtoehdot[i]?.Trim(), t, StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(ryhmat[i])) return ryhmat[i];
            return Kuittaus;
        }
    }
}
