// ASETUKSET DATANA (Natiiviseppä 5.10.2026, Päätoimittajan kuittaus datasiirtoehdotukselle 5f7cc5418): tekstit, äänitasot,
// pelien ja linssien arvot sisältöpaketin kokoelmasta kokoelmat/asetukset.json, jotta ne vaihtuvat osoitinvaihdolla ilman
// käännöstä (kuten Olavinlinna). Koodin arvo on AINA oletus: puuttuva tiedosto (vanha paketti), puuttuva avain, väärä tyyppi
// tai rikkinäinen JSON → nykyinen käytös sellaisenaan. Avain on pisteellä eroteltu polku: "aanet.MaisemanVoima" →
// { "aanet": { "MaisemanVoima": 0.14 } }. Arvot luetaan käyttöhetkellä (ei välimuistia kutsujan puolella), joten uusi paketti
// vaikuttaa seuraavasta käytöstä alkaen; näkymät lukevat avautuessaan, eivät kesken pelin.
// Muoto: { "skeema": 1, "versio": "<vapaa>", "aanet": {…}, "pelit": {…}, "tekstit": {…} }. Skeema > Skeema → ohitetaan kokonaan.
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja.Peli
{
    public static class Asetus
    {
        /// <summary>Suurin skeema, jonka tämä build ymmärtää; uudempi tiedosto ohitetaan (oletukset).</summary>
        public const int Skeema = 1;

        static Dictionary<string, object> juuri;
        static readonly Dictionary<string, object> haetut = new Dictionary<string, object>();

        /// <summary>Lähde lokiin: "oletukset", "paketti v550", "koekansio" …</summary>
        public static string Lahde { get; private set; } = "oletukset";
        public static string Versio { get; private set; } = "-";
        /// <summary>Kutsutaan, kun asetukset vaihtuivat (uusi paketti tai tyhjennys).</summary>
        public static event Action Vaihtui;

        /// <summary>Jäsentää asetukset.json-tekstin. Null/tyhjä/rikkinäinen/liian uusi skeema → oletukset (palauttaa syyn).</summary>
        public static string Lue(string json, string lahde)
        {
            Dictionary<string, object> uusi = null;
            string syy;
            if (string.IsNullOrWhiteSpace(json)) syy = "ei tiedostoa";
            else
            {
                try
                {
                    uusi = MiniJson.Jasenna(json) as Dictionary<string, object>;
                    syy = uusi == null ? "ei objekti" : null;
                }
                catch (Exception e) { syy = "ei jäsenny: " + e.Message; }
                if (uusi != null)
                {
                    double s = MiniJson.Luku(uusi, "skeema") ?? 1;
                    if (s > Skeema) { syy = $"skeema {s} > {Skeema}"; uusi = null; }
                }
            }
            juuri = uusi;
            haetut.Clear();
            Lahde = uusi != null ? lahde : "oletukset (" + syy + ")";
            Versio = uusi != null ? (MiniJson.Kentta(uusi, "versio")?.ToString() ?? "-") : "-";
            Vaihtui?.Invoke();
            return syy;
        }

        public static void Tyhjenna() => Lue(null, "tyhjennys");

        static object Arvo(string avain)
        {
            if (juuri == null || avain == null) return null;
            if (haetut.TryGetValue(avain, out var v)) return v;
            object o = juuri;
            foreach (var osa in avain.Split('.'))
            {
                if (!(o is Dictionary<string, object> d) || !d.TryGetValue(osa, out o)) { o = null; break; }
            }
            haetut[avain] = o;
            return o;
        }

        public static double Luku(string avain, double oletus)
        {
            var v = Arvo(avain);
            if (v is double d && !double.IsNaN(d) && !double.IsInfinity(d)) return d;
            if (v is long l) return l;
            if (v is int i) return i;
            return oletus;
        }

        public static float Luku(string avain, float oletus) => (float)Luku(avain, (double)oletus);

        public static int Kokonais(string avain, int oletus)
        {
            var v = Arvo(avain);
            if (v is long l && l >= int.MinValue && l <= int.MaxValue) return (int)l;
            if (v is int i) return i;
            if (v is double d && d == Math.Floor(d) && Math.Abs(d) < int.MaxValue) return (int)d;
            return oletus;
        }

        public static bool Kytkin(string avain, bool oletus) => Arvo(avain) is bool b ? b : oletus;

        /// <summary>Teksti; tyhjä merkkijono kelpaa (tarkoituksellinen tyhjennys), muu tyyppi → oletus.</summary>
        public static string Teksti(string avain, string oletus) => Arvo(avain) is string s ? s : oletus;

        /// <summary>Pelaajalle näkyvä teksti avaimella "tekstit.&lt;avain&gt;".</summary>
        public static string T(string avain, string oletus) => Teksti("tekstit." + avain, oletus);

        /// <summary>Lokiin ja testikomentoon: lähde, versio, ryhmien avainmäärät.</summary>
        public static string Raportti()
        {
            if (juuri == null) return "asetukset: " + Lahde;
            var ryhmat = new List<string>();
            foreach (var kv in juuri)
                if (kv.Value is Dictionary<string, object> d) ryhmat.Add(kv.Key + " " + d.Count);
            return $"asetukset: {Lahde}, versio {Versio}, " + (ryhmat.Count > 0 ? string.Join(", ", ryhmat) : "ei ryhmiä");
        }

        /// <summary>Yksittäisen arvon kuvaus testikomentoon ("asetus aanet.MaisemanVoima").</summary>
        public static string Kuvaa(string avain)
        {
            var v = Arvo(avain);
            return avain + " = " + (v == null ? "(oletus)" : Convert.ToString(v, CultureInfo.InvariantCulture)) + " [" + Lahde + "]";
        }
    }
}
