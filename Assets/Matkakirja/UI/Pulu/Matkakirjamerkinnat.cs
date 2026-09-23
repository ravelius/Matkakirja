// MATKAKIRJAMERKINNÄT: matkakirjakortin kaikki sisältöpolut (Natiivi-UI).
//
// Webin renderFact (js/ui.js) valitsee kortin sisällön tässä järjestyksessä,
// ja jokainen haara on tässä oma rakentajansa:
//
//   Fokus       fokusvirtakaupunki (50): virran matkakirja (paikkarivi → otsikko
//               "Ateena, elokuussa 1873" + tunnelma), luento ja luentakuvat.
//               Web fokusvirtaMatkakirja.
//   Aarre       sama kortti, myöhempi sivu: kun fokuskaupungin laatta kääntyy,
//               aarremerkintä voittaa saapumismerkinnän koko käynnin ajan.
//               Otsikko "Isoisän merkintä · Ateena". Ei luentaa. Web
//               fokusvirtaAarremerkinta.
//   Saapuminen  muu kaupunki: pakin saapumisteksti (SAAPUMISTEKSTIT: kuvaus +
//               nosto), ensimmäinen lause lihavoituna; otsake "MATKAKIRJASTA" +
//               kaupunki. Varalla tarinakaaren `saapuminen` (web KAARI_LAUDAT).
//   Havainto    saapuminen ilman merkintää: kaupungin paikkatieto, isoisän ääni
//               ensin (web placeFacts + factVoice), ensimmäinen lause lihavoituna,
//               otsake äänen mukaan ("ISOISÄN PÄIVÄKIRJASTA, 1873"), "Katso kuva",
//               jos tiedolla on wiki.
//   Satunnainen kortti ilman merkintää (jatkettu tallennus reitillä tms.):
//               paikkatieto arvottuna hash01("fact:<kaupunki>:<vuoro>:<pelaaja>"),
//               reitillä paikkarivi "Matkalla — X" (lähempi pää, web factCity),
//               lähderivi tekstin perään, "Katso kuva", jos wiki.
//
// Sisältö: fokusvirrat (Fokusvirrat.cs), paikkatiedot (PeliOhjain.Kysymykset tai
// oma lataus ilman peliä), tarinakaari (vain `saapuminen`) ja valinnainen
// kokoelma saapumistekstit, jota paketissa EI VIELÄ OLE (Siirtoseppä): alkiot
// [{kaupunki, data: {kuvaus, nosto}}]. Kun se ilmestyy, Saapuminen-haara
// toimii ilman koodimuutosta.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>Yksi korttiin kirjoitettava merkintä (webin renderFact-haaran tulos).</summary>
    public sealed class Merkinta
    {
        /// <summary>Web factKey: sama avain = kortti ei kirjoitu uudelleen.</summary>
        public string Avain, Kaupunki, Laji;
        /// <summary>Otsikkorivi (#fact-voice). PaikkaAika = paikka ja aika (ei versaaleja).</summary>
        public string Otsikko;
        public bool PaikkaAika;
        /// <summary>Paikkarivi (#fact-place); Tunnelma = kursiivi alaotsikko. Lyhyt = lapun paikkarivi (null = Paikkarivi).</summary>
        public string Paikkarivi, Lyhyt;
        public bool Tunnelma;
        /// <summary>Lihavoitu ensimmäinen lause (web .fact-lead) ja muu teksti.</summary>
        public string Lihava, Teksti;
        /// <summary>Lähteet tekstin perään (web sourceLine), vain satunnaishavainnolla.</summary>
        public List<string> Lahteet = new List<string>();
        /// <summary>Wikipedia-otsikko "Katso kuva" -napille (web factImageTitle), tai null.</summary>
        public string Wiki;
        /// <summary>Kaiutin (Kertoja-kytkin) näkyvissä: vain merkinnöillä, joilla on luento.</summary>
        public bool Kaiutin;
    }

    public static class Matkakirjamerkinnat
    {
        // Web VOICES (js/pack.js).
        public const string AaniNuori = "Nuoren Foggin havainto", AaniIsoisa = "Isoisän päiväkirjasta, 1873";

        static Dictionary<string, (string Kuvaus, string Nosto)> saapumistekstit;
        static Dictionary<string, string> kaarisaapumiset;
        static Dictionary<string, List<Paikkatieto>> omatPaikkatiedot;
        static bool ladattu, haussa;
        static readonly List<Action> odottajat = new List<Action>();

        /// <summary>Lataa (kerran) saapumistekstit, tarinakaaren saapumiset ja fokusvirrat; valmis pääsäikeessä.</summary>
        public static void Lataa(Action valmis)
        {
            if (ladattu) { Fokusvirrat.Lataa(valmis); return; }
            if (valmis != null) odottajat.Add(valmis);
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Lue());
        }

        static IEnumerator Lue()
        {
            string st = null, kaari = null, paikat = null;
            yield return Sisalto.HaeTeksti("saapumistekstit", t => st = t, valinnainen: true);
            yield return Sisalto.HaeTeksti("tarinakaari", t => kaari = t, valinnainen: true);
            // Ilman peliä (testikomento) paikkatiedot omasta latauksesta.
            if (PeliOhjain.Instanssi?.Kysymykset == null)
                yield return Sisalto.HaeTeksti("paikkatiedot", t => paikat = t, valinnainen: true);
            Task.Run(() =>
            {
                var s = new Dictionary<string, (string, string)>();
                var k = new Dictionary<string, string>();
                Dictionary<string, List<Paikkatieto>> p = null;
                try
                {
                    foreach (var (kaupunki, d) in Alkiot(st))
                    {
                        var kuvaus = MiniJson.Teksti(d, "kuvaus");
                        if (!string.IsNullOrEmpty(kuvaus)) s[kaupunki] = (kuvaus, MiniJson.Teksti(d, "nosto") ?? "");
                    }
                    foreach (var (kaupunki, d) in Alkiot(kaari))
                    {
                        var saapuminen = MiniJson.Teksti(d, "saapuminen");
                        if (!string.IsNullOrEmpty(saapuminen)) k[kaupunki] = saapuminen;
                    }
                    if (paikat != null)
                    {
                        var kd = new Kysymysdata();
                        kd.LuePaikkatiedot(paikat);
                        p = kd.Paikkatiedot;
                    }
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui matkakirjamerkinnät: " + e.Message); }
                UiKerros.PaaSaikeessa(() =>
                {
                    saapumistekstit = s;
                    kaarisaapumiset = k;
                    omatPaikkatiedot = p;
                    ladattu = true;
                    haussa = false;
                    var a = odottajat.ToArray();
                    odottajat.Clear();
                    Fokusvirrat.Lataa(() =>
                    {
                        foreach (var x in a) { try { x(); } catch (Exception e) { Debug.LogException(e); } }
                    });
                });
            });
        }

        static IEnumerable<(string Kaupunki, Dictionary<string, object> Data)> Alkiot(string json)
        {
            if (string.IsNullOrEmpty(json)) yield break;
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(json));
            if (!(MiniJson.Kentta(juuri, "alkiot") is List<object> alkiot)) yield break;
            foreach (var o in alkiot)
            {
                var a = MiniJson.Objekti(o);
                var d = MiniJson.Objekti(MiniJson.Kentta(a, "data")) ?? a;
                var kaupunki = MiniJson.Teksti(a, "kaupunki") ?? MiniJson.Teksti(d, "kaupunki") ?? MiniJson.Teksti(d, "id");
                if (kaupunki != null && d != null) yield return (kaupunki, d);
            }
        }

        /// <summary>Kaupungin paikkatiedot (web pack.placeFacts[id]), tai null.</summary>
        public static List<Paikkatieto> Paikkatiedot(string kaupunki)
        {
            var kaikki = PeliOhjain.Instanssi?.Kysymykset?.Paikkatiedot ?? omatPaikkatiedot;
            return kaupunki != null && kaikki != null && kaikki.TryGetValue(kaupunki, out var l) && l.Count > 0 ? l : null;
        }

        public static string Nimi(string kaupunki)
        {
            var k = UiSisalto.Kaupunki(kaupunki);
            if (!string.IsNullOrEmpty(k?.Nimi)) return k.Nimi;
            var v = PeliOhjain.Instanssi?.Verkko;
            return v != null ? PeliApu.KaupunginNimi(v, kaupunki) : kaupunki;
        }

        // --- haarat --------------------------------------------------------------

        /// <summary>Web fokusvirtaMatkakirja (virran oma merkintä).</summary>
        public static Merkinta Fokus(Saapumisvirta v)
        {
            if (v == null || string.IsNullOrEmpty(v.Teksti)) return null;
            string nimi = Nimi(v.Kaupunki);
            var (o, t) = MatkakirjanOtsikko(v.Paikkarivi ?? nimi, nimi);
            return new Merkinta
            {
                Avain = "fokus:" + v.Kaupunki, Kaupunki = v.Kaupunki, Laji = "fokus",
                Otsikko = o, PaikkaAika = true, Paikkarivi = t, Tunnelma = true, Lyhyt = "",
                Teksti = v.Teksti, Kaiutin = true,
            };
        }

        /// <summary>Web fokusvirtaAarremerkinta: "Isoisän merkintä · X", ei luentaa.</summary>
        public static Merkinta Aarre(Saapumisvirta v)
        {
            if (v?.AarreTeksti == null) return null;
            string nimi = Nimi(v.Kaupunki);
            var (o, t) = MatkakirjanOtsikko(v.AarrePaikkarivi ?? "Isoisän merkintä · " + nimi, nimi);
            return new Merkinta
            {
                Avain = "fokusaarre:" + v.Kaupunki, Kaupunki = v.Kaupunki, Laji = "aarre",
                Otsikko = o, PaikkaAika = true, Paikkarivi = t, Tunnelma = true, Lyhyt = "",
                Teksti = v.AarreTeksti,
            };
        }

        /// <summary>
        /// Web renderFactin saapumishaara: SAAPUMISTEKSTIT ensin, tarinakaaren saapuminen
        /// vain ilman sitä. kaariSaa = false ohittaa kaaren (testikomento).
        /// </summary>
        public static Merkinta Saapuminen(string kaupunki, bool kaariSaa = true)
        {
            string kuvaus = null, nosto = "";
            string laji = "saapuminen";
            if (saapumistekstit != null && saapumistekstit.TryGetValue(kaupunki, out var s)) (kuvaus, nosto) = s;
            else if (kaariSaa && kaarisaapumiset != null && kaarisaapumiset.TryGetValue(kaupunki, out var k)) { kuvaus = k; laji = "kaari"; }
            if (string.IsNullOrEmpty(kuvaus)) return null;
            string nimi = Nimi(kaupunki);
            var (eka, loput) = EkaLause(kuvaus);
            var m = new Merkinta
            {
                Avain = "saapui:" + kaupunki, Kaupunki = kaupunki, Laji = laji,
                Lihava = eka, Teksti = string.Join(" ", new[] { loput, nosto }).Trim(),
            };
            // Euroopan (fokusvirtapakin) kaupungilla sama otsikko kuin virran kortilla ("Kreeta, 1873").
            if (Fokusvirrat.Hae(kaupunki) != null)
            {
                m.Otsikko = MatkakirjanOtsikko(nimi, nimi).Otsikko;
                m.PaikkaAika = true;
                m.Paikkarivi = "";
                m.Lyhyt = "";
            }
            else
            {
                m.Otsikko = "Matkakirjasta";
                m.Paikkarivi = nimi;
            }
            return m;
        }

        /// <summary>Web renderFactin saapumishavainto: isoisän paikkatieto ensin, muuten ensimmäinen.</summary>
        public static Merkinta Havainto(string kaupunki)
        {
            var faktat = Paikkatiedot(kaupunki);
            if (faktat == null) return null;
            var f = faktat.Find(x => x.Aani == "isoisa") ?? faktat[0];
            if (string.IsNullOrEmpty(f.Teksti)) return null;
            var (eka, loput) = EkaLause(f.Teksti);
            return new Merkinta
            {
                Avain = "saapui:" + kaupunki, Kaupunki = kaupunki, Laji = "havainto",
                Otsikko = AanenOtsikko(f.Aani), Paikkarivi = Nimi(kaupunki),
                Lihava = eka, Teksti = loput, Wiki = Tyhja(f.Wiki),
            };
        }

        /// <summary>
        /// Web renderFactin viimeinen haara: arvottu paikkatieto (hash01), reitillä
        /// "Matkalla — X". vuoro = web turnCount, pelaaja = web player.id.
        /// </summary>
        public static Merkinta Satunnainen(string kaupunki, bool reitilla, int vuoro, int pelaaja)
        {
            var faktat = Paikkatiedot(kaupunki);
            if (faktat == null) return null;
            int i = (int)Math.Floor(Hash01("fact:" + kaupunki + ":" + vuoro + ":" + pelaaja) * faktat.Count);
            var f = faktat[Math.Min(i, faktat.Count - 1)];
            if (string.IsNullOrEmpty(f.Teksti)) return null;
            string nimi = Nimi(kaupunki);
            var m = new Merkinta
            {
                Avain = kaupunki + ":" + f.Teksti, Kaupunki = kaupunki, Laji = reitilla ? "reitti" : "satunnainen",
                Otsikko = AanenOtsikko(f.Aani), Paikkarivi = reitilla ? "Matkalla — " + nimi : nimi, Lyhyt = nimi,
                Teksti = f.Teksti, Wiki = Tyhja(f.Wiki),
            };
            if (!string.IsNullOrWhiteSpace(f.Lahde)) m.Lahteet.Add(f.Lahde.Trim());
            return m;
        }

        /// <summary>Web factCity reitillä: se pää, jota lähempänä pelaaja on.</summary>
        public static string ReitinKaupunki(IReittiverkko verkko, Sijainti s)
        {
            if (s.Kaupungissa) return s.Kaupunki;
            if (verkko == null || s.Reitti == null || !verkko.Reitit.TryGetValue(s.Reitti, out var r)) return null;
            return s.Askel * 2 <= r.Askeleet ? r.A : r.B;
        }

        // --- apurit (js/ui-apurit.js, js/pack.js, js/mapart.js) --------------------

        static string Tyhja(string s) => string.IsNullOrWhiteSpace(s) ? null : s;

        /// <summary>Web voiceTitle(factVoice(f)).</summary>
        public static string AanenOtsikko(string aani) => aani == "isoisa" ? AaniIsoisa : AaniNuori;

        static readonly Regex EkaLauseKuvio = new Regex(@"^[\s\S]*?[.!?…](?:[""»”])?(?=\s|$)", RegexOptions.Compiled);

        /// <summary>Web ekaLause: ensimmäinen virke päätösmerkkeineen ja loput.</summary>
        public static (string Eka, string Loput) EkaLause(string teksti)
        {
            teksti ??= "";
            var m = EkaLauseKuvio.Match(teksti);
            if (!m.Success) return (teksti, "");
            return (m.Value, teksti.Substring(m.Length).TrimStart());
        }

        static readonly Regex Vuosi = new Regex(@"\b1\d{3}\b", RegexOptions.Compiled);
        static readonly Regex LoppuPiste = new Regex(@"\s*\.$", RegexOptions.Compiled);

        /// <summary>
        /// Web matkakirjanOtsikko: "Ateena, elokuussa 1873. Pölyä ja puhetta." →
        /// ("Ateena, elokuussa 1873", "Pölyä ja puhetta"). Ilman vuosilukua pelkkä
        /// kaupunki saa vuoden ("Kreeta, 1873") ja muu rivi jää otsikoksi.
        /// </summary>
        public static (string Otsikko, string Tunnelma) MatkakirjanOtsikko(string paikkarivi, string kaupunki)
        {
            string rivi = (paikkarivi ?? "").Trim(), nimi = (kaupunki ?? "").Trim();
            string IlmanPistetta(string t) => LoppuPiste.Replace(t.Trim(), "");
            if (Vuosi.IsMatch(rivi))
            {
                var raja = Regex.Match(rivi, @"\.\s");
                if (!raja.Success) return (IlmanPistetta(rivi), "");
                return (IlmanPistetta(rivi.Substring(0, raja.Index)), IlmanPistetta(rivi.Substring(raja.Index + 1)));
            }
            if (rivi.Length == 0 || rivi == nimi) return (nimi.Length > 0 ? nimi + ", 1873" : "", "");
            return (IlmanPistetta(rivi), "");
        }

        /// <summary>Web hash01 (js/mapart.js): FNV-1a UTF-16-yksiköistä → [0, 1).</summary>
        public static double Hash01(string avain)
        {
            uint h = 2166136261;
            foreach (char c in avain) { h ^= c; h *= 16777619; }
            return (h % 100003) / 100003.0;
        }

        /// <summary>Web isSourceUrl.</summary>
        public static bool OnOsoite(string lahde) => Regex.IsMatch(lahde.Trim(), @"^https?://\S+$");

        /// <summary>Web sourceLabel: osoitteesta palvelimen nimi ilman www:tä.</summary>
        public static string LahteenNimi(string lahde)
        {
            var t = lahde.Trim();
            if (!OnOsoite(t)) return t;
            return Uri.TryCreate(t, UriKind.Absolute, out var u) ? Regex.Replace(u.Host, @"^www\.", "") : t;
        }
    }
}
