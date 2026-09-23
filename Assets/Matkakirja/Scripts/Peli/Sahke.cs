// SÄHKEPINTA (web js/sahke.js; Raamattu "SÄHKEJÄRJESTELMÄ — MONINPELI ILMAN VAPAATA TEKSTIÄ",
// omistaja 25.8.2026): retkikunta liittymiskoodilla, valmispohjaiset sähkeet (virstanpylväät ja
// vinkit) sekä kaveriapu aarrekysymyksessä. Pöllö on sähkeiden postinkantaja.
//
// EI YHTÄÄN VAPAATA TEKSTIKENTTÄÄ: nimimerkki tulee generaattorista (SahkeNimet), sähke on pohjan
// tunnus + paikan tunnus (vastaanottaja ladelmoi tekstin omasta pohjastaan ja kaupunkitaulustaan),
// veikkaus on vaihtoehdon INDEKSI, ja liittymiskoodi suodatetaan merkki kerrallaan aakkostoon.
//
// PELI EI SAA HAJOTA ILMAN WORKERIA: Kaynnista tekee terveystarkistuksen; kiinni oleva linja
// piilottaa kaiken (Apunappi.Nakyy = false, ei pollausta, retkikuntaosio = "Sähkelinja avataan pian.").
// Jokainen verkkokutsu kulkee ISahkeYhteys-rajapinnan läpi, ja pudonnut yhteys on hiljainen
// ei-mitään (ei poikkeusta pelille). Unity-kuljetus: Scripts/Peli/SahkeYhteys.cs.
//
// TILA: retkikunnan tunnus ja nähdyt sähkeet ovat laitteen muistissa (injektoitu lue/kirjoita,
// Unityssa PlayerPrefs), EIVÄT pelitallennuksessa; jono, virstanpylväiden lähtötilanne ja kesken
// oleva kaveriapu elävät istunnon ajan (web sahkeTila). Kello ja satunnaisuus injektoidaan.
//
// POIKKEAMAT WEBISTÄ (natiivin korjaukset, perustelut kohdissa):
//   - lähettäjän, kysyjän ja vastaajan NIMI haetaan tilan jäsenlistasta (worker lähettää jasenId:n;
//     web näyttää tunnuksen sellaisenaan); omat sähkeet ja omat apupyynnöt merkitään nähdyiksi
//     mutta ei näytetä (worker hylkää vastauksen omaan pyyntöön 409:llä);
//   - terveystarkistus lukee HTTP-tilan eikä virheviestiä: 401/404 = laitteen tunnus vanhentunut
//     (unohdetaan, linja auki), 403 = Origin-portti (natiivi ei pääse sisään, linja KIINNI);
//   - vinkkisähke tarkistetaan logiikassa: vinkata saa vain itse löydetystä aarteesta.
// Ei UnityEngineä: testattavissa (Peli-testit/Testit/SahkeTestit.cs).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using Matkakirja.Peli;

namespace Matkakirja.Natiivi
{
    /// <summary>Sähkepinnan vakiot (web js/sahke.js; osa on workerin kanssa sitovia).</summary>
    public static class SahkeVakiot
    {
        /// <summary>Workerin osoite (web SAHKE_OSOITE). Tyhjänä koko sähkepinta on kiinni.</summary>
        public const string Osoite = "https://matkakirja-sahke.samireivinen.workers.dev";
        /// <summary>Verkkokutsun katto (web SAHKE_AIKAKATKO_MS = 12 000).</summary>
        public const int AikakatkoS = 12;
        /// <summary>Liittymiskoodin pituus (web SAHKE_KOODIN_PITUUS; sitova).</summary>
        public const int KoodinPituus = 6;
        /// <summary>Koodin aakkosto: ei O/0, I/1, S/5 (web SAHKE_KOODIN_MERKIT; sitova).</summary>
        public const string KoodinMerkit = "ABCDEFGHJKLMNPQRTUVWXYZ23467889";
        /// <summary>Nähtyjen muistilistan katto (web SAHKE_NAHTYJA_KATTO).</summary>
        public const int NahtyjaKatto = 300;
        /// <summary>Pollausväli ja kaveriavun odotuksen tiheämpi väli (web SAHKE_POLLAUS_MS, SAHKE_APUPOLLAUS_MS).</summary>
        public const long PollausMs = 60 * 1000, ApupollausMs = 5 * 1000;
        /// <summary>Odotuksen katto: tämän jälkeen odotuksen saa perua ilman hyvitystä (web SAHKE_ODOTUKSEN_KATTO_MS).</summary>
        public const long OdotuksenKattoMs = 10 * 60 * 1000;
        /// <summary>Kaveriavun hinta (web KAVERIAPU_HINTA; veloitus Kysely.Kaveriapu).</summary>
        public const int KaveriapuHinta = KysymysVakiot.KaveriapuHinta;
        /// <summary>Laitteen muistin avaimet (web SAHKE_TUNNUS_TALLE, SAHKE_NAHDYT_TALLE).</summary>
        public const string TunnusAvain = "matkakirja-retkikunta", NahdytAvain = "matkakirja-sahke-nahdyt";
        /// <summary>Kiinni olevan linjan rivi retkikuntaosiossa.</summary>
        public const string LinjaKiinni = "Sähkelinja avataan pian.";
    }

    // =====================================================================
    // NIMIMERKIT, KOODI JA POHJAT (puhtaat funktiot)
    // =====================================================================

    /// <summary>Nimimerkkigeneraattori (web SAHKE_ADJEKTIIVIT × SAHKE_SUBSTANTIIVIT; listat ovat osa workerin rajapintaa).</summary>
    public static class SahkeNimet
    {
        public static readonly IReadOnlyList<string> Adjektiivit = new[]
        {
            "Utelias", "Höyryävä", "Vaitelias", "Ripeä", "Uskalias", "Verkkainen",
            "Tarkkanäköinen", "Kärsivällinen", "Salaperäinen", "Kohtelias", "Sitkeä", "Valpas",
            "Rohkea", "Huolellinen", "Levoton", "Sinnikäs", "Oivaltava", "Vakaa",
            "Nokkela", "Hiljainen", "Iloinen", "Peloton", "Tarmokas", "Viisas",
        };

        public static readonly IReadOnlyList<string> Substantiivit = new[]
        {
            "Ilves", "Majakka", "Kompassi", "Näätä", "Höyrylaiva", "Kurki",
            "Lennätin", "Ahma", "Kiikari", "Peltosirkku", "Postivaunu", "Saukko",
            "Tiimalasi", "Kärppä", "Kartturi", "Merikotka", "Ankkuri", "Mursu",
            "Karavaani", "Naali", "Sekstantti", "Haikara", "Matkalaukku", "Sorsa",
        };

        /// <summary>Web sahkeArvoNimi. <paramref name="satunnainen"/> = Math.random (arvo väliltä [0, 1)).</summary>
        public static string Arvo(Func<double> satunnainen)
        {
            var a = Adjektiivit[(int)Math.Floor(satunnainen() * Adjektiivit.Count)];
            var s = Substantiivit[(int)Math.Floor(satunnainen() * Substantiivit.Count)];
            return a + " " + s;
        }

        /// <summary>Web sahkeArvoNimet: eri nimet valittaviksi (katto 40 arvontaa).</summary>
        public static List<string> ArvoNimet(Func<double> satunnainen, int montako = 3)
        {
            var nimet = new List<string>();
            for (int i = 0; nimet.Count < montako && i < 40; i++)
            {
                var n = Arvo(satunnainen);
                if (!nimet.Contains(n)) nimet.Add(n);
            }
            return nimet;
        }

        /// <summary>Onko nimimerkki generaattorin tuotos ("Adjektiivi Substantiivi")?</summary>
        public static bool Kelpaa(string nimimerkki)
        {
            if (string.IsNullOrEmpty(nimimerkki)) return false;
            var osat = nimimerkki.Split(' ');
            return osat.Length == 2 && Adjektiivit.Contains(osat[0]) && Substantiivit.Contains(osat[1]);
        }
    }

    /// <summary>Liittymiskoodi (web sahkeSiistiKoodi).</summary>
    public static class SahkeKoodi
    {
        /// <summary>Suodattaa syötteen koodiaakkostoon ja katkaisee kuuteen merkkiin; mitään muuta ei jää.</summary>
        public static string Siisti(string teksti)
        {
            var sb = new StringBuilder();
            foreach (var c in SahkeTeksti.JsIsot(teksti ?? ""))
                if (SahkeVakiot.KoodinMerkit.IndexOf(c) >= 0) sb.Append(c);
            return sb.Length > SahkeVakiot.KoodinPituus ? sb.ToString(0, SahkeVakiot.KoodinPituus) : sb.ToString();
        }
    }

    /// <summary>Tekstiapurit, jotka toistavat JS:n käytöksen.</summary>
    public static class SahkeTeksti
    {
        // String.prototype.toUpperCase laajentaa nämä (SpecialCasing.txt); muut merkit 1:1.
        static readonly Dictionary<char, string> Laajennukset = new Dictionary<char, string>
        {
            ['ß'] = "SS", ['ﬀ'] = "FF", ['ﬁ'] = "FI", ['ﬂ'] = "FL", ['ﬃ'] = "FFI", ['ﬄ'] = "FFL",
            ['ﬅ'] = "ST", ['ﬆ'] = "ST", ['ŉ'] = "ʼN", ['ǰ'] = "J̌", ['ẖ'] = "H̱",
            ['ẗ'] = "T̈", ['ẘ'] = "W̊", ['ẙ'] = "Y̊", ['ẚ'] = "Aʾ",
        };

        /// <summary>JS toUpperCase (versaalit kuten webissä, myös ß → SS).</summary>
        public static string JsIsot(string s)
        {
            if (string.IsNullOrEmpty(s)) return "";
            var sb = new StringBuilder(s.Length);
            foreach (var c in s)
            {
                if (Laajennukset.TryGetValue(c, out var l)) sb.Append(l);
                else sb.Append(char.ToUpperInvariant(c));
            }
            return sb.ToString();
        }

        /// <summary>JSON.stringify(merkkijono).</summary>
        public static string Json(string s)
        {
            if (s == null) return "null";
            var sb = new StringBuilder(s.Length + 2).Append('"');
            for (int i = 0; i < s.Length; i++)
            {
                char c = s[i];
                switch (c)
                {
                    case '"': sb.Append("\\\""); break;
                    case '\\': sb.Append("\\\\"); break;
                    case '\b': sb.Append("\\b"); break;
                    case '\f': sb.Append("\\f"); break;
                    case '\n': sb.Append("\\n"); break;
                    case '\r': sb.Append("\\r"); break;
                    case '\t': sb.Append("\\t"); break;
                    default:
                        bool yksinainen = char.IsSurrogate(c) && !(char.IsHighSurrogate(c) && i + 1 < s.Length && char.IsLowSurrogate(s[i + 1]))
                                          && !(char.IsLowSurrogate(c) && i > 0 && char.IsHighSurrogate(s[i - 1]));
                        if (c < 0x20 || yksinainen) sb.Append("\\u").Append(((int)c).ToString("x4"));
                        else sb.Append(c);
                        break;
                }
            }
            return sb.Append('"').ToString();
        }

        /// <summary>JSON.stringify olio: kentät annetussa järjestyksessä (arvo string, int tai IEnumerable&lt;string&gt;).</summary>
        public static string JsonOlio(params (string Nimi, object Arvo)[] kentat)
        {
            var sb = new StringBuilder("{");
            for (int i = 0; i < kentat.Length; i++)
            {
                if (i > 0) sb.Append(',');
                sb.Append(Json(kentat[i].Nimi)).Append(':');
                switch (kentat[i].Arvo)
                {
                    case null: sb.Append("null"); break;
                    case string t: sb.Append(Json(t)); break;
                    case int n: sb.Append(n.ToString(CultureInfo.InvariantCulture)); break;
                    case IEnumerable<string> l: sb.Append('[').Append(string.Join(",", l.Select(Json))).Append(']'); break;
                    default: throw new ArgumentException("tuntematon JSON-arvo " + kentat[i].Arvo.GetType());
                }
            }
            return sb.Append('}').ToString();
        }

        /// <summary>URLSearchParams-koodaus (application/x-www-form-urlencoded, UTF-8, välilyönti = +).</summary>
        public static string LomakeKoodaa(string s)
        {
            var sb = new StringBuilder();
            foreach (var b in Encoding.UTF8.GetBytes(s ?? ""))
            {
                char c = (char)b;
                if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '*' || c == '-' || c == '.' || c == '_') sb.Append(c);
                else if (c == ' ') sb.Append('+');
                else sb.Append('%').Append(b.ToString("X2"));
            }
            return sb.ToString();
        }

        /// <summary>JS Number(arvo) merkkijonolle: tyhjä = 0, kelvoton = NaN (web aukkoOsuu).</summary>
        public static double JsLuku(string s)
        {
            var t = (s ?? "").Trim();
            if (t.Length == 0) return 0;
            var tl = t.ToLowerInvariant();
            if (tl.Length > 2 && tl[0] == '0' && (tl[1] == 'x' || tl[1] == 'o' || tl[1] == 'b'))
            {
                int kanta = tl[1] == 'x' ? 16 : tl[1] == 'o' ? 8 : 2;
                double arvo = 0;
                foreach (var c in tl.Substring(2))
                {
                    int d = c >= '0' && c <= '9' ? c - '0' : c >= 'a' && c <= 'z' ? c - 'a' + 10 : 99;
                    if (d >= kanta) return double.NaN;
                    arvo = arvo * kanta + d;
                }
                return arvo;
            }
            var ilman = t.TrimStart('+', '-');
            if (ilman == "Infinity") return t[0] == '-' ? double.NegativeInfinity : double.PositiveInfinity;
            // Desimaaliluku: [+-] numerot [. numerot] [e[+-]numerot]; ei tuhaterottimia eikä muita merkkejä.
            int i = 0;
            if (t[i] == '+' || t[i] == '-') i++;
            int alku = i, numeroita = 0;
            while (i < t.Length && char.IsDigit(t[i]) && t[i] < 128) { i++; numeroita++; }
            if (i < t.Length && t[i] == '.') { i++; while (i < t.Length && t[i] >= '0' && t[i] <= '9') { i++; numeroita++; } }
            if (numeroita == 0) return double.NaN;
            if (i < t.Length && (t[i] == 'e' || t[i] == 'E'))
            {
                i++;
                if (i < t.Length && (t[i] == '+' || t[i] == '-')) i++;
                int eAlku = i;
                while (i < t.Length && t[i] >= '0' && t[i] <= '9') i++;
                if (i == eAlku) return double.NaN;
            }
            if (i != t.Length) return double.NaN;
            return double.Parse(t, NumberStyles.Float, CultureInfo.InvariantCulture);
        }

        /// <summary>JS String(luku) kokonaisluvuille ja tavallisille desimaaleille.</summary>
        public static string JsLukuTekstiksi(double d) =>
            double.IsNaN(d) ? "NaN" : d == Math.Floor(d) && Math.Abs(d) < 1e21 ? d.ToString("0", CultureInfo.InvariantCulture) : d.ToString("R", CultureInfo.InvariantCulture);
    }

    public enum SahkePohjaTyyppi
    {
        /// <summary>Peli lähettää virstanpylväästä itse.</summary>
        Auto,
        /// <summary>Pelaaja lähettää käsin retkikuntaosiosta.</summary>
        Vinkki,
        /// <summary>Kaveriavun saatesähke (lähtee /apu/kysy-kutsun mukana).</summary>
        Apu,
    }

    /// <summary>Sähkepohja (web SAHKE_POHJAT): tunnus + teksti paikan nimestä.</summary>
    public sealed class SahkePohja
    {
        public string Id;
        public SahkePohjaTyyppi Tyyppi;
        /// <summary>Käsin lähetettävän paikkalista: "loydot" (omat aarteet) tai "kaydyt"; muilla null.</summary>
        public string Paikat;
        /// <summary>Napin teksti ("Vinkki: seuraa vettä").</summary>
        public string Nimi;
        /// <summary>Sähkeen teksti versaalisesta paikan nimestä.</summary>
        public Func<string, string> Teksti;
    }

    /// <summary>Sähkepohjat ja pöllön saatteet (web SAHKE_POHJAT, SAHKE_SAATTEET).</summary>
    public static class SahkePohjat
    {
        public const string AarreLoytyi = "aarre-loytyi", Saavuin = "saavuin";

        public static readonly IReadOnlyList<SahkePohja> Kaikki = new[]
        {
            new SahkePohja { Id = AarreLoytyi, Tyyppi = SahkePohjaTyyppi.Auto, Nimi = "Aarre löytyi", Teksti = p => $"AARRE LÖYTYNYT {p} STOP" },
            new SahkePohja { Id = Saavuin, Tyyppi = SahkePohjaTyyppi.Auto, Nimi = "Saavuin perille", Teksti = p => $"SAAVUIN {p} STOP MATKA JATKUU" },
            new SahkePohja { Id = "vinkki-ei-paakaupunki", Tyyppi = SahkePohjaTyyppi.Vinkki, Paikat = "loydot", Nimi = "Vinkki: ei pääkaupungissa",
                Teksti = p => $"VINKKI {p} STOP AARRE EI OLLUT PÄÄKAUPUNGISSA" },
            new SahkePohja { Id = "vinkki-vesi", Tyyppi = SahkePohjaTyyppi.Vinkki, Paikat = "loydot", Nimi = "Vinkki: seuraa vettä",
                Teksti = p => $"VINKKI {p} STOP SEURAA VETTÄ" },
            new SahkePohja { Id = "vinkki-vuori", Tyyppi = SahkePohjaTyyppi.Vinkki, Paikat = "loydot", Nimi = "Vinkki: katso vuorille",
                Teksti = p => $"VINKKI {p} STOP KATSO VUORILLE" },
            new SahkePohja { Id = "juliste-saatu", Tyyppi = SahkePohjaTyyppi.Vinkki, Paikat = "kaydyt", Nimi = "Sain julisteen",
                Teksti = p => $"JULISTE {p} STOP LISÄTTY KOKOELMAAN" },
            new SahkePohja { Id = "apua-arvoitus", Tyyppi = SahkePohjaTyyppi.Apu, Nimi = "Pyydän apua arvoitukseen",
                Teksti = p => $"PYYDÄN APUA ARVOITUKSEEN {p} STOP" },
        };

        /// <summary>Retkikuntaosion käsin lähetettävät pohjat (web tyyppi 'vinkki').</summary>
        public static IEnumerable<SahkePohja> Vinkit => Kaikki.Where(p => p.Tyyppi == SahkePohjaTyyppi.Vinkki);

        /// <summary>Pohja tunnuksella; tuntematon on null eikä keksitty teksti (web sahkePohja).</summary>
        public static SahkePohja Hae(string id) => Kaikki.FirstOrDefault(p => p.Id == id);

        /// <summary>Web sahkePaikanNimi: nimi laudalta versaalina, tuntematon tunnus versaalina, ei tyhjää.</summary>
        public static string PaikanNimi(Func<string, string> nimiTunnuksella, string paikkaId) =>
            SahkeTeksti.JsIsot((paikkaId != null ? nimiTunnuksella?.Invoke(paikkaId) : null) ?? paikkaId ?? "");

        /// <summary>Web sahkeTeksti: tuntematon pohja = "" (ei sähkettä).</summary>
        public static string Teksti(string pohjaId, string paikkaId, Func<string, string> nimiTunnuksella)
        {
            var p = Hae(pohjaId);
            return p == null ? "" : p.Teksti(PaikanNimi(nimiTunnuksella, paikkaId));
        }

        /// <summary>Kaupunkitaulu sisältöpaketista (web board.cityById.get(id)?.name).</summary>
        public static Func<string, string> Nimet(IReittiverkko verkko) =>
            id => verkko != null && verkko.Kaupungit.TryGetValue(id, out var k) ? k.Nimi : null;

        /// <summary>Pöllön saatteet saapuneelle sähkeelle (Raamattu: enintään kaksi virkettä, ei huutomerkkejä).</summary>
        public static readonly IReadOnlyList<string> Saatteet = new[]
        {
            "Sähke sinulle. Luin sen jo matkalla.",
            "Lennätin naksui. Tässä on tulos.",
            "Sähke retkikunnalta. En kommentoi sisältöä.",
            "Toin sähkeen. Postinkantaja tekee työnsä.",
            "Sähke. Luin sen jo. Hyviä uutisia.",
        };

        /// <summary>Apupyynnön saate (web SAHKE_APUPYYNNON_SAATE).</summary>
        public const string ApupyynnonSaate = "Retkikunnalta sähke: he pyytävät apua arvoitukseen.";

        /// <summary>Saapuneen veikkauksen saate (web sahkeVeikkauksenSaate). Pöllö ei ota kantaa oikeellisuuteen.</summary>
        public static string VeikkauksenSaate(string nimi) => $"{nimi} vastasi sähkeeseen. Päätös on sinun.";
    }

    // =====================================================================
    // KULJETUS
    // =====================================================================

    /// <summary>Yhden verkkokutsun tulos. Tila 0 = ei yhteyttä (verkkovirhe, aikakatkaisu, osoite puuttuu).</summary>
    public sealed class SahkeVastaus
    {
        public int Tila;
        /// <summary>Jäsennetty JSON-runko tai null (tyhjä tai kelvoton runko).</summary>
        public Dictionary<string, object> Data;
        public bool Ok => Tila >= 200 && Tila < 300;
        /// <summary>Web: data?.virhe ?? `HTTP ${status}`; onnistuneella null.</summary>
        public string Virhe => Ok ? null
            : (Data != null ? MiniJson.Teksti(Data, "virhe") : null) ?? (Tila == 0 ? "Sähkelinja ei vastaa" : "HTTP " + Tila);

        public static SahkeVastaus Katkos() => new SahkeVastaus { Tila = 0 };

        /// <summary>Vastaus HTTP-tilasta ja rungosta; kelvoton runko on null-data (web: tyhjä runko).</summary>
        public static SahkeVastaus Jasenna(int tila, string runko)
        {
            Dictionary<string, object> d = null;
            if (!string.IsNullOrEmpty(runko))
            {
                try { d = MiniJson.Jasenna(runko) as Dictionary<string, object>; }
                catch (Exception) { d = null; }
            }
            return new SahkeVastaus { Tila = tila, Data = d };
        }
    }

    /// <summary>
    /// Sähkeworkerin kuljetus (web sahkeKutsu). Toteutus: Scripts/Peli/SahkeYhteys.cs (UnityWebRequest).
    /// Rajapinta (sitova, web js/sahke.js kohta 1):
    ///   POST /retkikunta/luo {nimimerkki} → {koodi, jasenId, avain}
    ///   POST /retkikunta/liity {koodi, nimimerkki} → {jasenId, avain, jasenet}
    ///   GET  /retkikunta/tila?koodi&amp;jasenId&amp;avain → {jasenet, sahkeet, apupyynnot, apuvastaukset}
    ///   POST /sahke {koodi, jasenId, avain, pohjaId, paikkaId}
    ///   POST /apu/kysy {koodi, jasenId, avain, apuId, kysymys, vaihtoehdot}
    ///   POST /apu/vastaa {koodi, jasenId, avain, apuId, veikkaus}
    /// </summary>
    public interface ISahkeYhteys
    {
        /// <summary>
        /// Yksi kutsu: metodi "GET", "POST" tai "HEAD"; polku alkaa "/" (juuri = ""); runko JSON tai null.
        /// <paramref name="valmis"/> kutsutaan tasan kerran (pääsäikeessä); katkos ja aikakatkaisu = Tila 0.
        /// Toteutus ei heitä poikkeusta.
        /// </summary>
        void Kutsu(string metodi, string polku, string runko, Action<SahkeVastaus> valmis);
    }

    // =====================================================================
    // RETKIKUNTA, JONO JA KAVERIAPU
    // =====================================================================

    /// <summary>Retkikunnan tunnus laitteella (web {koodi, jasenId, avain, nimimerkki}).</summary>
    public sealed class RetkikuntaTunnus
    {
        public string Koodi, JasenId, Avain, Nimimerkki;

        public bool Kelpaa => !string.IsNullOrEmpty(Koodi) && !string.IsNullOrEmpty(JasenId) && !string.IsNullOrEmpty(Avain);

        /// <summary>Web sahkeTunnus: rikki mennyt tai vajaa muisti = null.</summary>
        public static RetkikuntaTunnus Lue(string json)
        {
            if (string.IsNullOrEmpty(json)) return null;
            try
            {
                if (!(MiniJson.Jasenna(json) is Dictionary<string, object> o)) return null;
                var t = new RetkikuntaTunnus
                {
                    Koodi = Arvo(o, "koodi"), JasenId = Arvo(o, "jasenId"), Avain = Arvo(o, "avain"),
                    Nimimerkki = Arvo(o, "nimimerkki") ?? "",
                };
                return t.Kelpaa ? t : null;
            }
            catch (Exception) { return null; }
        }

        /// <summary>Kenttä tekstinä (worker antaa tekstit; luku muunnetaan kuten JS String).</summary>
        internal static string Arvo(Dictionary<string, object> o, string nimi) => MiniJson.Kentta(o, nimi) switch
        {
            string s => s,
            double d => SahkeTeksti.JsLukuTekstiksi(d),
            _ => null,
        };

        /// <summary>Web sahkeAsetaTunnus: JSON samassa kenttäjärjestyksessä.</summary>
        public string Kirjoita() => SahkeTeksti.JsonOlio(("koodi", Koodi), ("jasenId", JasenId), ("avain", Avain), ("nimimerkki", Nimimerkki ?? ""));
    }

    /// <summary>Paikka sähkeeseen (web {paikkaId, nimi}).</summary>
    public sealed class SahkePaikka
    {
        public string PaikkaId, Nimi;
        public SahkePaikka(string paikkaId, string nimi) { PaikkaId = paikkaId; Nimi = nimi; }
    }

    public enum SahkeViestiLaji { Sahke, Apupyynto }

    /// <summary>Jonon liuska (web sahkeTila.jono): saapunut sähke tai retkikunnan apupyyntö.</summary>
    public sealed class SahkeViesti
    {
        public SahkeViestiLaji Laji;
        /// <summary>Pöllön saate ylärivillä.</summary>
        public string Saate;
        // sähke
        public string PohjaId, PaikkaId, Lahettaja, Aika;
        /// <summary>Sähkeen teksti omasta pohjasta ja kaupunkitaulusta ("AARRE LÖYTYNYT TUKHOLMA STOP").</summary>
        public string Teksti;
        // apupyyntö
        public string ApuId, Kysyja, Kysymys;
        public List<string> Vaihtoehdot;
        /// <summary>Alarivi: lähettäjä ja aika (web "lahettaja · aika"); apupyynnöllä "Kysyjä kysyy:".</summary>
        public string Alarivi => Laji == SahkeViestiLaji.Apupyynto ? $"{Kysyja} kysyy:"
            : string.Join(" · ", new[] { Lahettaja, AikaTekstina(Aika) }.Where(s => !string.IsNullOrEmpty(s)));

        /// <summary>Web sahkeAika (fi-FI short): "23.9.2026 klo 14.05"; kelvoton = "".</summary>
        public static string AikaTekstina(string iso)
        {
            if (string.IsNullOrEmpty(iso)) return "";
            if (!DateTimeOffset.TryParse(iso, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out var t)) return "";
            var p = t.ToLocalTime();
            return $"{p.Day}.{p.Month}.{p.Year} klo {p.Hour}.{p.Minute:00}";
        }
    }

    /// <summary>Kesken oleva kaveriapu (web sahkeTila.apu).</summary>
    public sealed class Kaveriapu
    {
        public string ApuId;
        /// <summary>Kysymys, johon apua pyydettiin (web apu.quiz; identiteetti).</summary>
        public AvoinKysymys Kysymys;
        /// <summary>Alkuhetki (kello, ms).</summary>
        public long Alkoi;
        /// <summary>Saapunut veikkaus (vaihtoehdon indeksi) tai null.</summary>
        public int? Veikkaus;
        public string Vastaaja;
        /// <summary>"Sähke ei mennyt perille. Voit perua odotuksen." tai null.</summary>
        public string Virhe;
    }

    /// <summary>Kaveriavun nappi kysymysnäkymän apurivillä (web sahkePaivitaApu).</summary>
    public sealed class ApuNappi
    {
        /// <summary>Linja auki, retkikunta olemassa, rahaa ≥ 25 ja kysymys avoinna vaihtoehtoineen.</summary>
        public bool Nakyy;
        /// <summary>Epätosi, kun kaverilta on jo kysytty (nappi harmaana).</summary>
        public bool Kaytossa;
        /// <summary>"Kysy kaverilta (25 £)" / "Kaverilta kysytty".</summary>
        public string Teksti;
    }

    /// <summary>Odotus- ja veikkauskortti kysymyksen ja vaihtoehtojen väliin (web sahkePaivitaApukortti).</summary>
    public sealed class ApuKortti
    {
        public string Saate;
        /// <summary>Lähetysvirhe tai null.</summary>
        public string Virhe;
        /// <summary>Veikattu vaihtoehto (korostus; kaikki vastausnapit pysyvät auki) tai null.</summary>
        public int? VeikattuIndeksi;
        /// <summary>"Nimi veikkaa: vaihtoehto" tai null.</summary>
        public string VeikkausTeksti;
        /// <summary>Napin teksti ("Selvä" / "Peru odotus") tai null, kun odotusta ei vielä saa perua.</summary>
        public string Nappi;
        /// <summary>"Odotuksen voi perua N min kuluttua, tai heti kun veikkaus saapuu." tai null.</summary>
        public string Alarivi;
    }

    /// <summary>Retkikuntaosio valikossa (web retkikuntaOsio): kolme tilaa, linja kiinni / ei retkikuntaa / jäsen.</summary>
    public sealed class RetkikuntaNaytto
    {
        public string Otsikko = "Retkikunta";
        /// <summary>Epätosi: osio on pelkkä Rivi ("Sähkelinja avataan pian."), ei yhtään nappia.</summary>
        public bool LinjaAuki;
        public string Rivi;
        /// <summary>Tosi: jäsennäkymä (koodi, vinkkisähkeet, ero). Epätosi: nimimerkin valinta + perusta/liity.</summary>
        public bool Jasen;
        /// <summary>Selite ("Retkikunta on pieni porukka…" tai "Olet retkikunnassa nimellä …").</summary>
        public string Teksti;
        public string Nimimerkki, Koodi;
        /// <summary>Käsin lähetettävät pohjat (Nimi napissa); paikat Sahkepinta.Paikat(pohja, matka).</summary>
        public List<SahkePohja> Pohjat = new List<SahkePohja>();
    }

    /// <summary>Retkikuntaosion teot (data sisään, takaisinkutsut ulos; valmis-rivi näytetään huomiorivillä).</summary>
    public sealed class RetkikuntaToiminnot
    {
        /// <summary>Kolme uutta nimimerkkiä napautettavaksi ("Arvo uudet nimet").</summary>
        public Func<List<string>> ArvoNimet;
        /// <summary>(nimimerkki, valmis(null = onnistui | rivi)).</summary>
        public Action<string, Action<string>> Perusta;
        /// <summary>(koodi, nimimerkki, valmis). Koodikenttä suodatetaan joka näppäilyllä: SiistiKoodi.</summary>
        public Action<string, string, Action<string>> Liity;
        public Func<string, string> SiistiKoodi = SahkeKoodi.Siisti;
        /// <summary>Pohjan paikat (pohjaId → paikat); tyhjä lista → Sahkepinta.EiPaikkoja(pohja).</summary>
        public Func<string, IReadOnlyList<SahkePaikka>> Paikat;
        /// <summary>(pohjaId, paikkaId, valmis(ok, rivi)).</summary>
        public Action<string, string, Action<bool, string>> Laheta;
        public Action Eroa;
    }

    /// <summary>
    /// Sähkepinnan istunto (web js/sahke.js kohdat 6–9 ja 13–17). Yksi olio koko sovelluksen ajan;
    /// uusi peli = Nollaa (retkikunta säilyy). Ei ajastimia: PeliOhjain kutsuu Aja() ruudun välein
    /// (pollaus kellon mukaan) ja Etualalle(), kun sovellus palaa etualalle.
    /// </summary>
    public sealed class Sahkepinta
    {
        readonly ISahkeYhteys yhteys;
        readonly Func<string, string> lue;
        readonly Action<string, string> kirjoita;
        readonly Func<double> satunnainen;
        readonly Func<long> kello;
        readonly List<SahkeViesti> jono = new List<SahkeViesti>();
        int? aarteita;
        string maa;
        long seuraavaPollaus;
        bool pollausKesken;

        /// <summary>Kaupungin nimi tunnuksella (sähketekstit). PeliOhjain: SahkePohjat.Nimet(verkko).</summary>
        public Func<string, string> KaupunginNimi = _ => null;

        /// <summary>Linjan tila: null = ei vielä tiedetä, tosi = auki, epätosi = kiinni (web sahkeLinja).</summary>
        public bool? Linja { get; private set; }
        public bool LinjaAuki => Linja == true;

        /// <summary>Jono, apu tai tunnus muuttui: näkymä päivittää liuskan, apukortin ja retkikuntaosion.</summary>
        public event Action Muuttui;

        /// <summary>Näytettävät liuskat saapumisjärjestyksessä (yksi kerrallaan ruudulle).</summary>
        public IReadOnlyList<SahkeViesti> Jono => jono;

        /// <summary>Kesken oleva kaveriapu tai null.</summary>
        public Kaveriapu Apu { get; private set; }

        /// <param name="lue">Muistin luku avaimella (Unity: PlayerPrefs.GetString); null = ei arvoa.</param>
        /// <param name="kirjoita">Muistiin kirjoitus; arvo null = poista (Unity: PlayerPrefs.DeleteKey).</param>
        /// <param name="satunnainen">Math.random (saatteen ja apuId:n arvonta); oletus System.Random.</param>
        /// <param name="kello">Nykyhetki millisekunteina (Unix-aika); oletus järjestelmän kello.</param>
        public Sahkepinta(ISahkeYhteys yhteys, Func<string, string> lue, Action<string, string> kirjoita,
            Func<double> satunnainen = null, Func<long> kello = null)
        {
            this.yhteys = yhteys;
            this.lue = lue;
            this.kirjoita = kirjoita;
            var r = new Random();
            this.satunnainen = satunnainen ?? r.NextDouble;
            this.kello = kello ?? (() => DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());
        }

        void Ilmoita() { try { Muuttui?.Invoke(); } catch (Exception) { /* näkymän vika ei kaada sähkettä */ } }

        // --- laitteen muisti (web kohta 6) --------------------------------------

        string Lue(string avain) { try { return lue?.Invoke(avain); } catch (Exception) { return null; } }
        void Kirjoita(string avain, string arvo) { try { kirjoita?.Invoke(avain, arvo); } catch (Exception) { /* sähke voi nousta uudestaan */ } }

        /// <summary>Retkikunnan tunnus muistista tai null (web sahkeTunnus).</summary>
        public RetkikuntaTunnus Tunnus => RetkikuntaTunnus.Lue(Lue(SahkeVakiot.TunnusAvain));

        internal void AsetaTunnus(RetkikuntaTunnus t) => Kirjoita(SahkeVakiot.TunnusAvain, t != null && t.Kelpaa ? t.Kirjoita() : null);

        /// <summary>Nähtyjen tunnusten lista (web sahkeNahdyt; järjestys säilyy, kaksoiskappaleet pois).</summary>
        public List<string> Nahdyt()
        {
            var tulos = new List<string>();
            try
            {
                var teksti = Lue(SahkeVakiot.NahdytAvain);
                if (MiniJson.Jasenna(string.IsNullOrEmpty(teksti) ? "[]" : teksti) is List<object> l)
                    foreach (var x in l) if (x is string s && !tulos.Contains(s)) tulos.Add(s);
            }
            catch (Exception) { tulos.Clear(); }
            return tulos;
        }

        /// <summary>Web sahkeMerkitseNahdyksi: vanhimmat unohtuvat katon yli.</summary>
        internal void MerkitseNahdyksi(IEnumerable<string> tunnukset)
        {
            var kaikki = Nahdyt();
            kaikki.AddRange(tunnukset.Where(t => !string.IsNullOrEmpty(t)));
            var jaa = kaikki.Skip(Math.Max(0, kaikki.Count - SahkeVakiot.NahtyjaKatto));
            Kirjoita(SahkeVakiot.NahdytAvain, "[" + string.Join(",", jaa.Select(SahkeTeksti.Json)) + "]");
        }

        // --- verkko (web kohta 7) ----------------------------------------------

        void Kutsu(string metodi, string polku, string runko, Action<SahkeVastaus> valmis)
        {
            if (yhteys == null || string.IsNullOrEmpty(SahkeVakiot.Osoite)) { valmis(SahkeVastaus.Katkos()); return; }
            bool kutsuttu = false;
            try
            {
                yhteys.Kutsu(metodi, polku, runko, v =>
                {
                    if (kutsuttu) return;
                    kutsuttu = true;
                    try { valmis(v ?? SahkeVastaus.Katkos()); } catch (Exception) { /* sähke on lisäys peliin, ei sen ehto */ }
                });
            }
            catch (Exception)
            {
                if (!kutsuttu) { kutsuttu = true; valmis(SahkeVastaus.Katkos()); }
            }
        }

        static (string, object)[] Tunnukset(RetkikuntaTunnus t, params (string, object)[] lisat) =>
            new (string, object)[] { ("koodi", t.Koodi), ("jasenId", t.JasenId), ("avain", t.Avain) }.Concat(lisat).ToArray();

        /// <summary>POST /sahke -runko (web sahkeLahetaPohja).</summary>
        public static string SahkeRunko(RetkikuntaTunnus t, string pohjaId, string paikkaId) =>
            SahkeTeksti.JsonOlio(Tunnukset(t, ("pohjaId", pohjaId), ("paikkaId", paikkaId)));

        /// <summary>POST /apu/kysy -runko (web sahkeLahetaApupyynto).</summary>
        public static string ApupyyntoRunko(RetkikuntaTunnus t, string apuId, string kysymys, IEnumerable<string> vaihtoehdot) =>
            SahkeTeksti.JsonOlio(Tunnukset(t, ("apuId", apuId), ("kysymys", kysymys ?? ""), ("vaihtoehdot", vaihtoehdot ?? new List<string>())));

        /// <summary>POST /apu/vastaa -runko (web sahkeLahetaVeikkaus): pelkkä vaihtoehdon indeksi.</summary>
        public static string VeikkausRunko(RetkikuntaTunnus t, string apuId, int veikkaus) =>
            SahkeTeksti.JsonOlio(Tunnukset(t, ("apuId", apuId), ("veikkaus", veikkaus)));

        /// <summary>Web sahkeHaeTila: tilakyselyn polku.</summary>
        public static string TilaPolku(RetkikuntaTunnus t) =>
            "/retkikunta/tila?koodi=" + SahkeTeksti.LomakeKoodaa(t.Koodi) + "&jasenId=" + SahkeTeksti.LomakeKoodaa(t.JasenId)
            + "&avain=" + SahkeTeksti.LomakeKoodaa(t.Avain);

        // --- terveystarkistus ja pollaus (web kohdat 8, 13, 17) ---------------

        /// <summary>
        /// Web kytkeSahke: terveystarkistus ja heti yksi tilakysely. Tunnuksellinen: tila-kutsu
        /// (401/404 = tunnus vanhentunut → unohdetaan, linja auki). Tunnukseton: HEAD juureen,
        /// mikä tahansa vastaus paitsi 403 riittää. 403 = Origin-portti, natiivi ei pääse sisään.
        /// </summary>
        public void Kaynnista(Action<bool> valmis = null)
        {
            var t = Tunnus;
            void Paata(bool auki)
            {
                Linja = auki;
                Ilmoita();
                valmis?.Invoke(auki);
                if (auki) Pollaa();
            }
            if (t != null)
            {
                Kutsu("GET", TilaPolku(t), null, v =>
                {
                    if (v.Ok) Paata(true);
                    else if (v.Tila == 401 || v.Tila == 404) { AsetaTunnus(null); Paata(true); }
                    else Paata(false);
                });
            }
            else Kutsu("HEAD", "", null, v => Paata(v.Tila != 0 && v.Tila != 403));
        }

        /// <summary>Pollausväli nyt: kaveriavun odotus nostaa tahdin (web sahkeViritaPollaus).</summary>
        public long PollausVali => Apu != null ? SahkeVakiot.ApupollausMs : SahkeVakiot.PollausMs;

        void ViritaPollaus() => seuraavaPollaus = kello() + PollausVali;

        /// <summary>Ruudun välein (PeliOhjain.Update): tilakysely, kun väli on kulunut.</summary>
        public void Aja()
        {
            if (!LinjaAuki || pollausKesken || kello() < seuraavaPollaus) return;
            if (Tunnus == null) return;
            Pollaa();
        }

        /// <summary>Sovellus palasi etualalle (OnApplicationPause(false)): sähkeet heti (web visibilitychange).</summary>
        public void Etualalle() { if (!pollausKesken) Pollaa(); }

        /// <summary>Web sahkePollaa: yksi tilakysely; virhe on hiljainen ja seuraava kierros yrittää uudestaan.</summary>
        public void Pollaa(Action valmis = null)
        {
            var t = Tunnus;
            if (!LinjaAuki || t == null) { valmis?.Invoke(); return; }
            pollausKesken = true;
            Kutsu("GET", TilaPolku(t), null, v =>
            {
                pollausKesken = false;
                // Pelaaja erosi tai vaihtoi retkikuntaa kyselyn aikana: vastaus ei ole enää hänen.
                var nyt = Tunnus;
                if (v.Ok && nyt != null && nyt.Koodi == t.Koodi && nyt.JasenId == t.JasenId) KasitteleTila(v.Data);
                ViritaPollaus();
                valmis?.Invoke();
            });
        }

        /// <summary>
        /// Web sahkeKasitteleTila: uudet sähkeet ja apupyynnöt jonoon, oman apupyynnön veikkaus talteen.
        /// Tuntematon pohja ja kelvoton pyyntö merkitään nähdyiksi mutta ei näytetä.
        /// </summary>
        public void KasitteleTila(Dictionary<string, object> tila)
        {
            var nahdyt = new HashSet<string>(Nahdyt());
            var uudet = new List<string>();
            var oma = Tunnus?.JasenId;
            var nimet = new Dictionary<string, string>();
            if (tila != null && MiniJson.Kentta(tila, "jasenet") is List<object> jl)
                foreach (var j in jl.OfType<Dictionary<string, object>>())
                    if (RetkikuntaTunnus.Arvo(j, "jasenId") is string id && MiniJson.Teksti(j, "nimimerkki") is string n && n.Length > 0) nimet[id] = n;
            // Worker lähettää jäsentunnuksen; näytetään nimimerkki, kun se on listalla.
            string Nimi(string id, string oletus) => id == null ? oletus : nimet.TryGetValue(id, out var n) ? n : id;
            bool muuttui = false;

            foreach (var s in Lista(tila, "sahkeet"))
            {
                var id = RetkikuntaTunnus.Arvo(s, "id");
                if (string.IsNullOrEmpty(id) || nahdyt.Contains(id)) continue;
                uudet.Add(id);
                var pohjaId = MiniJson.Teksti(s, "pohjaId");
                if (SahkePohjat.Hae(pohjaId) == null) continue;
                var lahettaja = RetkikuntaTunnus.Arvo(s, "lahettaja");
                if (oma != null && lahettaja == oma) continue;   // oma sähke palasi tilannekuvassa
                var paikkaId = RetkikuntaTunnus.Arvo(s, "paikkaId");
                jono.Add(new SahkeViesti
                {
                    Laji = SahkeViestiLaji.Sahke,
                    Saate = SahkePohjat.Saatteet[(int)Math.Floor(satunnainen() * SahkePohjat.Saatteet.Count)],
                    PohjaId = pohjaId, PaikkaId = paikkaId,
                    Lahettaja = Nimi(lahettaja, ""),
                    Aika = MiniJson.Teksti(s, "aika") ?? "",
                    Teksti = SahkePohjat.Teksti(pohjaId, paikkaId, KaupunginNimi),
                });
                muuttui = true;
            }

            foreach (var p in Lista(tila, "apupyynnot"))
            {
                var apuId = RetkikuntaTunnus.Arvo(p, "apuId");
                if (string.IsNullOrEmpty(apuId) || nahdyt.Contains("apu:" + apuId)) continue;
                uudet.Add("apu:" + apuId);
                var vaihtoehdot = MiniJson.Kentta(p, "vaihtoehdot") is List<object> vl ? vl.OfType<string>().ToList() : new List<string>();
                var kysymys = MiniJson.Teksti(p, "kysymys");
                if (string.IsNullOrEmpty(kysymys) || vaihtoehdot.Count < 2) continue;
                var kysyja = RetkikuntaTunnus.Arvo(p, "kysyja");
                if (oma != null && kysyja == oma) continue;   // omaan pyyntöön ei vastata (worker 409)
                jono.Add(new SahkeViesti
                {
                    Laji = SahkeViestiLaji.Apupyynto,
                    Saate = SahkePohjat.ApupyynnonSaate,
                    ApuId = apuId, Kysyja = Nimi(kysyja, "Retkikunta"), Kysymys = kysymys, Vaihtoehdot = vaihtoehdot,
                });
                muuttui = true;
            }

            if (uudet.Count > 0) MerkitseNahdyksi(uudet);

            var apu = Apu;
            if (apu != null && apu.Veikkaus == null)
            {
                var vastaus = Lista(tila, "apuvastaukset").FirstOrDefault(v => RetkikuntaTunnus.Arvo(v, "apuId") == apu.ApuId);
                // Number.isInteger: kokonaisluku, ei murtolukua eikä tekstiä.
                if (vastaus != null && MiniJson.Kentta(vastaus, "veikkaus") is double d && d == Math.Floor(d) && !double.IsInfinity(d)
                    && Math.Abs(d) <= int.MaxValue)
                {
                    apu.Veikkaus = (int)d;
                    apu.Vastaaja = Nimi(RetkikuntaTunnus.Arvo(vastaus, "vastaaja"), "Retkikunta");
                    muuttui = true;
                }
            }
            if (muuttui) Ilmoita();
        }

        static IEnumerable<Dictionary<string, object>> Lista(Dictionary<string, object> o, string nimi) =>
            o != null && MiniJson.Kentta(o, nimi) is List<object> l ? l.OfType<Dictionary<string, object>>() : Enumerable.Empty<Dictionary<string, object>>();

        // --- jono ---------------------------------------------------------------

        /// <summary>
        /// Web sahkeNaytaJonosta: seuraava liuska ruudulle tai null. Kutsu vain, kun ruutu on vapaa
        /// (ei dialogia, kohtaamiskorttia, lehteä eikä kamera-ajoa) eikä edellinen liuska ole auki.
        /// </summary>
        public SahkeViesti SeuraavaJonosta()
        {
            if (jono.Count == 0) return null;
            var v = jono[0];
            jono.RemoveAt(0);
            return v;
        }

        /// <summary>Apupyyntöliuskan vaihtoehto: veikkaus (indeksi) workerille; verkkovirhe katoaa hiljaa.</summary>
        public void Veikkaa(SahkeViesti apupyynto, int indeksi, Action valmis = null)
        {
            var t = Tunnus;
            if (t == null || apupyynto?.ApuId == null) { valmis?.Invoke(); return; }
            Kutsu("POST", "/apu/vastaa", VeikkausRunko(t, apupyynto.ApuId, indeksi), _ => valmis?.Invoke());
        }

        // --- retkikunta (web kohta 16) -----------------------------------------

        /// <summary>Retkikuntaosion tila (web retkikuntaOsio, sahkePiirraLiittyminen, sahkePiirraJasen).</summary>
        public RetkikuntaNaytto Retkikunta()
        {
            if (!LinjaAuki) return new RetkikuntaNaytto { LinjaAuki = false, Rivi = SahkeVakiot.LinjaKiinni };
            var t = Tunnus;
            if (t == null)
                return new RetkikuntaNaytto
                {
                    LinjaAuki = true,
                    Teksti = "Retkikunta on pieni porukka, joka sähköttää toisilleen matkan käänteistä. Kaikki viestit ovat "
                           + "valmiita sähkepohjia — omaa tekstiä ei kirjoiteta eikä lähetetä.",
                };
            return new RetkikuntaNaytto
            {
                LinjaAuki = true, Jasen = true, Nimimerkki = t.Nimimerkki, Koodi = t.Koodi,
                Teksti = $"Olet retkikunnassa nimellä {(string.IsNullOrEmpty(t.Nimimerkki) ? "matkalainen" : t.Nimimerkki)}.",
                Pohjat = SahkePohjat.Vinkit.ToList(),
            };
        }

        /// <summary>Kolme nimimerkkiehdotusta napautettavaksi (web sahkeArvoNimet).</summary>
        public List<string> ArvoNimet(int montako = 3) => SahkeNimet.ArvoNimet(satunnainen, montako);

        /// <summary>"Perusta retkikunta": valmis(null) = onnistui, muuten pelaajalle näytettävä rivi.</summary>
        public void Perusta(string nimimerkki, Action<string> valmis)
        {
            if (!LinjaAuki) { valmis?.Invoke(SahkeVakiot.LinjaKiinni); return; }
            if (!SahkeNimet.Kelpaa(nimimerkki)) { valmis?.Invoke("Valitse ensin nimimerkki."); return; }
            Kutsu("POST", "/retkikunta/luo", SahkeTeksti.JsonOlio(("nimimerkki", nimimerkki)), v =>
            {
                if (!v.Ok) { valmis?.Invoke("Ei onnistunut: " + v.Virhe); return; }
                AsetaTunnus(new RetkikuntaTunnus
                {
                    Koodi = RetkikuntaTunnus.Arvo(v.Data, "koodi"), JasenId = RetkikuntaTunnus.Arvo(v.Data, "jasenId"),
                    Avain = RetkikuntaTunnus.Arvo(v.Data, "avain"), Nimimerkki = nimimerkki,
                });
                ViritaPollaus();
                Ilmoita();
                valmis?.Invoke(Tunnus != null ? null : "Ei onnistunut: vastaus puutteellinen");
            });
        }

        /// <summary>"Liity retkikuntaan" kaverin koodilla (siistitään aakkostoon, kuusi merkkiä).</summary>
        public void Liity(string koodi, string nimimerkki, Action<string> valmis)
        {
            if (!LinjaAuki) { valmis?.Invoke(SahkeVakiot.LinjaKiinni); return; }
            if (!SahkeNimet.Kelpaa(nimimerkki)) { valmis?.Invoke("Valitse ensin nimimerkki."); return; }
            var arvo = SahkeKoodi.Siisti(koodi);
            if (arvo.Length != SahkeVakiot.KoodinPituus) { valmis?.Invoke($"Koodissa on {SahkeVakiot.KoodinPituus} merkkiä."); return; }
            Kutsu("POST", "/retkikunta/liity", SahkeTeksti.JsonOlio(("koodi", arvo), ("nimimerkki", nimimerkki)), v =>
            {
                if (!v.Ok) { valmis?.Invoke("Ei onnistunut: " + v.Virhe); return; }
                // Web {koodi: arvo, ...vastaus}: vastauksen koodi voittaa, jos sellainen tulee.
                AsetaTunnus(new RetkikuntaTunnus
                {
                    Koodi = RetkikuntaTunnus.Arvo(v.Data, "koodi") ?? arvo, JasenId = RetkikuntaTunnus.Arvo(v.Data, "jasenId"),
                    Avain = RetkikuntaTunnus.Arvo(v.Data, "avain"), Nimimerkki = nimimerkki,
                });
                ViritaPollaus();
                Ilmoita();
                valmis?.Invoke(Tunnus != null ? null : "Ei onnistunut: vastaus puutteellinen");
            });
        }

        /// <summary>"Eroa retkikunnasta": tunnus pois, jono tyhjäksi (retkikuntaa ei pureta workerilla).</summary>
        public void Eroa()
        {
            AsetaTunnus(null);
            jono.Clear();
            Ilmoita();
        }

        /// <summary>Omat aarrelöydöt löytöjärjestyksessä (web sahkeOmatLoydot: world.starsFound manner → kaupunki).</summary>
        public IReadOnlyList<SahkePaikka> OmatLoydot(Matka m)
        {
            var l = new List<SahkePaikka>();
            var taulu = m?.Laatat?.PaaaarteetLoydetty;
            if (taulu == null) return l;
            foreach (var id in taulu.Values)
                if (!string.IsNullOrEmpty(id)) l.Add(new SahkePaikka(id, PeliApu.KaupunginNimi(m.Verkko, id)));
            return l;
        }

        /// <summary>Käydyt kaupungit (web sahkeKaydytPaikat; natiivissa tunnusjärjestyksessä, kuten tallennuksessa).</summary>
        public IReadOnlyList<SahkePaikka> KaydytPaikat(Matka m)
        {
            if (m == null) return new List<SahkePaikka>();
            return m.Tila.Pelaaja.Kaydyt.OrderBy(k => k, StringComparer.Ordinal)
                .Where(k => m.Verkko.Kaupungit.ContainsKey(k))
                .Select(k => new SahkePaikka(k, m.Verkko.Kaupungit[k].Nimi)).ToList();
        }

        /// <summary>Pohjan paikkalista ("kaydyt" tai omat löydöt).</summary>
        public IReadOnlyList<SahkePaikka> Paikat(SahkePohja pohja, Matka m) =>
            pohja?.Paikat == "kaydyt" ? KaydytPaikat(m) : OmatLoydot(m);

        /// <summary>Tyhjän paikkalistan rivi (web naytaPaikat).</summary>
        public static string EiPaikkoja(SahkePohja pohja) => pohja?.Paikat == "kaydyt"
            ? "Et ole vielä käynyt yhdessäkään kaupungissa."
            : "Vinkata saa vain aarteesta, jonka on itse löytänyt — etsi ensin yksi.";

        /// <summary>
        /// Vinkkisähke retkikunnalle. valmis(ok, rivi): "Sähke lähti: TEKSTI" tai "Ei onnistunut: …".
        /// Vinkata saa vain itse löydetystä aarteesta (Raamattu): paikan on oltava pohjan listalla.
        /// </summary>
        public void LahetaVinkki(string pohjaId, string paikkaId, Matka m, Action<bool, string> valmis)
        {
            var pohja = SahkePohjat.Hae(pohjaId);
            var t = Tunnus;
            if (pohja == null || pohja.Tyyppi != SahkePohjaTyyppi.Vinkki) { valmis?.Invoke(false, "Tuntematon sähkepohja."); return; }
            if (!LinjaAuki || t == null) { valmis?.Invoke(false, SahkeVakiot.LinjaKiinni); return; }
            if (!Paikat(pohja, m).Any(p => p.PaikkaId == paikkaId)) { valmis?.Invoke(false, EiPaikkoja(pohja)); return; }
            Kutsu("POST", "/sahke", SahkeRunko(t, pohjaId, paikkaId), v =>
                valmis?.Invoke(v.Ok, v.Ok ? "Sähke lähti: " + SahkePohjat.Teksti(pohjaId, paikkaId, KaupunginNimi) : "Ei onnistunut: " + v.Virhe));
        }

        // --- virstanpylväät (web kohta 14) --------------------------------------

        /// <summary>
        /// Web sahkeVirstanpylvaat pelitilasta (kutsu jokaisen tallennuksen jälkeen, PeliOhjain.TilaMuuttui):
        /// uusi unohdettu aarre → "aarre-loytyi", uusi maa → "saavuin". Ensimmäinen kutsu vain kirjaa
        /// lähtötilanteen, jottei kesken jäänyt peli sähkötä vanhoja aarteita uudestaan.
        /// </summary>
        public void Virstanpylvaat(Matka m)
        {
            if (m == null) return;
            var s = m.Tila.Pelaaja.Sijainti;
            string kaupunki = s.Kaupungissa ? s.Kaupunki : null;
            string maa = kaupunki != null && m.Verkko.Kaupungit.TryGetValue(kaupunki, out var k) ? k.Maa : null;
            Virstanpylvaat(OmatLoydot(m), kaupunki, maa);
        }

        /// <summary>Sama puhtaana: omat löydöt löytöjärjestyksessä, nykyinen kaupunki ja sen maa (null = reitillä).</summary>
        public void Virstanpylvaat(IReadOnlyList<SahkePaikka> loydot, string kaupunki, string maa)
        {
            var t = Tunnus;
            if (!LinjaAuki || t == null) return;
            if (aarteita == null)
            {
                aarteita = loydot.Count;
                this.maa = maa;
                return;
            }
            if (loydot.Count > aarteita)
            {
                var uusin = loydot[loydot.Count - 1];
                aarteita = loydot.Count;
                if (uusin != null) LahetaAuto(t, SahkePohjat.AarreLoytyi, uusin.PaikkaId);
            }
            if (maa != null && maa != this.maa)
            {
                this.maa = maa;
                if (kaupunki != null) LahetaAuto(t, SahkePohjat.Saavuin, kaupunki);
            }
        }

        void LahetaAuto(RetkikuntaTunnus t, string pohjaId, string paikkaId) =>
            Kutsu("POST", "/sahke", SahkeRunko(t, pohjaId, paikkaId), _ => { });

        // --- kaveriapu (web kohta 15) -------------------------------------------

        static AvoinKysymys AvoinKysymys(Matka m)
        {
            var q = m?.Tila.Kysely.Kysymys;
            return m != null && m.Tila.Vaihe == Vaihe.Kysymys && q != null && !q.Valittu.HasValue ? q : null;
        }

        /// <summary>Kaveriavun nappi (web sahkePaivitaApu). Nakyy vaatii myös ≥ 2 vaihtoehtoa (karttakysymykseen ei apua).</summary>
        public ApuNappi Apunappi(Matka m)
        {
            var q = AvoinKysymys(m);
            if (q == null) return new ApuNappi { Nakyy = false, Kaytossa = false, Teksti = "" };
            bool kaytossa = LinjaAuki && Tunnus != null;
            bool rahaa = m.Tila.Pelaaja.Raha >= SahkeVakiot.KaveriapuHinta;
            return new ApuNappi
            {
                Nakyy = kaytossa && rahaa && q.Vaihtoehdot != null && q.Vaihtoehdot.Count >= 2,
                Kaytossa = !q.Kaveriapu,
                Teksti = q.Kaveriapu ? "Kaverilta kysytty" : $"Kysy kaverilta ({SahkeVakiot.KaveriapuHinta} £)",
            };
        }

        /// <summary>
        /// "Kysy kaverilta (25 £)" (web sahkeKysyKaverilta). Järjestys on tarkka: ensin veloitus pelin omalla
        /// reitillä (Kysely.Kaveriapu), vasta sitten sähke. Aika pysähtyy (KelloPysaytetty). Jos verkko pettää,
        /// odotuksen saa perua heti; raha on silti mennyt, kuten 50:50:ssä. PeliOhjain tallentaa onnistuneen teon.
        /// </summary>
        public TekoTulos KysyKaverilta(Kysely kysely)
        {
            var q = AvoinKysymys(kysely?.Matka);
            var t = Tunnus;
            if (q == null) return TekoTulos.Epaonnistui("Ei avointa kysymystä");
            if (!LinjaAuki || t == null) return TekoTulos.Epaonnistui(SahkeVakiot.LinjaKiinni);
            if (Apu != null) return TekoTulos.Epaonnistui("Kaverilta on jo kysytty");
            var tulos = kysely.Kaveriapu();
            if (!tulos.Ok || !q.Kaveriapu) return tulos;

            var apuId = "apu-" + Base36(kello()) + "-" + ArvoMerkit(6);
            Apu = new Kaveriapu { ApuId = apuId, Kysymys = q, Alkoi = kello() };
            ViritaPollaus();
            Ilmoita();
            Kutsu("POST", "/apu/kysy", ApupyyntoRunko(t, apuId, q.Kysymys, q.Vaihtoehdot), v =>
            {
                if (v.Ok || Apu?.ApuId != apuId) return;
                Apu.Virhe = "Sähke ei mennyt perille. Voit perua odotuksen.";
                Ilmoita();
            });
            return tulos;
        }

        static string Base36(long n)
        {
            const string merkit = "0123456789abcdefghijklmnopqrstuvwxyz";
            if (n <= 0) return "0";
            var sb = new StringBuilder();
            while (n > 0) { sb.Insert(0, merkit[(int)(n % 36)]); n /= 36; }
            return sb.ToString();
        }

        string ArvoMerkit(int n)
        {
            const string merkit = "0123456789abcdefghijklmnopqrstuvwxyz";
            var sb = new StringBuilder();
            for (int i = 0; i < n; i++) sb.Append(merkit[Math.Min(35, (int)Math.Floor(satunnainen() * 36))]);
            return sb.ToString();
        }

        /// <summary>Onko kysymyksen kello pysäytetty (kaveriavun odotus tähän kysymykseen)? PeliOhjain ei vähennä aikaa.</summary>
        public bool KelloPysaytetty(AvoinKysymys q) => q != null && Apu != null && ReferenceEquals(Apu.Kysymys, q);

        /// <summary>Joka päivityksessä: kysymys suljettu tai vastattu → apu päättyy (kello ei jatku, web jatkaKello: false).</summary>
        public void PaivitaApu(Matka m)
        {
            if (Apu == null) return;
            var q = AvoinKysymys(m);
            if (q == null || !ReferenceEquals(q, Apu.Kysymys)) LopetaApu();
        }

        /// <summary>Odotus- tai veikkauskortti avoimelle kysymykselle, tai null (web sahkePaivitaApukortti).</summary>
        public ApuKortti Apukortti(Matka m)
        {
            var q = AvoinKysymys(m);
            var apu = Apu;
            if (apu == null || q == null || !ReferenceEquals(apu.Kysymys, q)) return null;
            if (apu.Veikkaus is int i)
            {
                var teksti = i >= 0 && i < q.Vaihtoehdot.Count ? q.Vaihtoehdot[i] : "";
                return new ApuKortti
                {
                    Saate = SahkePohjat.VeikkauksenSaate(apu.Vastaaja),
                    VeikattuIndeksi = i,
                    VeikkausTeksti = $"{apu.Vastaaja} veikkaa: {teksti}",
                    Nappi = "Selvä",
                };
            }
            var kortti = new ApuKortti { Saate = "Sähke lähti retkikunnalle. Aika on pysähtynyt odotuksen ajaksi.", Virhe = apu.Virhe };
            long kulunut = kello() - apu.Alkoi;
            if (kulunut >= SahkeVakiot.OdotuksenKattoMs || apu.Virhe != null) kortti.Nappi = "Peru odotus";
            else
            {
                var jaljella = (long)Math.Ceiling((SahkeVakiot.OdotuksenKattoMs - kulunut) / 60000.0);
                kortti.Alarivi = $"Odotuksen voi perua {jaljella} min kuluttua, tai heti kun veikkaus saapuu.";
            }
            return kortti;
        }

        /// <summary>
        /// Kortin nappi ("Selvä" tai "Peru odotus"): apu päättyy ja kello jatkuu. Ennen veikkausta perua saa
        /// vasta 10 minuutin tai lähetysvirheen jälkeen (muuten apu olisi 25 punnan aikalisä). Palauttaa, päättyikö.
        /// </summary>
        public bool SuljeApu()
        {
            var apu = Apu;
            if (apu == null) return false;
            if (apu.Veikkaus == null && apu.Virhe == null && kello() - apu.Alkoi < SahkeVakiot.OdotuksenKattoMs) return false;
            LopetaApu();
            return true;
        }

        void LopetaApu()
        {
            Apu = null;
            ViritaPollaus();
            Ilmoita();
        }

        /// <summary>Testeille: kesken oleva apu suoraan (kultainen tilankäsittely).</summary>
        internal void AsetaApu(Kaveriapu apu) => Apu = apu;

        /// <summary>Uusi peli (web nollaaSahke): jono, apu ja virstanpylväät nollille; retkikunta säilyy.</summary>
        public void Nollaa()
        {
            jono.Clear();
            Apu = null;
            aarteita = null;
            maa = null;
            Ilmoita();
        }
    }
}
