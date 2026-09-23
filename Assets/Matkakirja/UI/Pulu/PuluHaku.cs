// PULUN PAIKALLINEN TIETOHAKU (Natiivi-UI): webin js/pollo-haku.js natiivina.
//
// Ennen kuin kysymys lähtee pollo-workerille, pelin omasta tarkistetusta aineistosta haetaan
// muutama osuvin katkelma. Ne liitetään kontekstiin ("PELIN TARKISTETTUA AINEISTOA", PuluChat) ja
// niistä rakennetaan vastauksen alle matkakirjalinkit ("Matkakirja: A · B").
//
// Indeksoidaan (kuten webissä): kaupunkilehtien ja maalehtien aihesivut (johdanto ja nostot,
// minitehtävän fakta vasta kun pelaaja on vastannut), nähtävyysjutut lainauksineen ja
// kohdekarttojen pisteiden nimet nimiankkureiksi. EI tarinakaanonia eikä kysymyspankkeja.
// Indeksi rakennetaan laiskasti taustasäikeessä, kun chat avataan ensimmäisen kerran.
//
// Pisteytys, kynnykset, painot ja sanalistat ovat webin arvoja sellaisinaan (HAUN_POHJAPISTE 15,
// suhde 0,8, avainsanaraja 0,9, sijaintikerroin 2, otsikko 2 / teksti 1, tarkka osuma × 2,5).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class PuluHaku
    {
        public const int PohjaPiste = 15, LinkkiKatto = 2;
        const double SuhdeKynnys = 0.8, AvainsanaRaja = 0.9, SijaintiKerroin = 2;
        const double OtsikonPaino = 2, TekstinPaino = 1, TarkanOsumanKerroin = 2.5;
        const int KatkelmanKatto = 700, AnkkurinVahimmais = 5, SananVahimmais = 3, TakaperinVahimmais = 5, YleissananPaate = 6;

        static readonly HashSet<string> Ohitettavat = new HashSet<string>
        {
            "mikä", "mika", "mitä", "mita", "miksi", "miten", "kuka", "ketkä", "ketka",
            "missä", "missa", "mistä", "mista", "mihin", "milloin", "kuinka", "onko",
            "oli", "olivat", "ovat", "olla", "sen", "tämä", "tama", "tuo", "siellä",
            "siella", "täällä", "taalla", "että", "etta", "mutta", "kun", "niin",
            "myös", "myos", "vielä", "viela", "sekä", "seka", "joka", "jossa", "jonka",
            "voi", "saa", "ole", "olen", "kerro", "kerrotko", "kertoisitko",
            "millainen", "millaista", "millaisia", "minkälainen", "minkalainen",
            "paljonko", "montako", "monta", "kannattaa", "nähdä", "nahda",
            "tapahtui", "tapahtuu", "tiedätkö", "tiedatko", "osaatko", "tarkoittaa",
            "olisi", "pitäisi", "pitaisi", "sitten", "muuta", "tässä", "tassa",
            "tuolla", "ihan",
        };

        static readonly HashSet<string> KohteenYleissanat = new HashSet<string>
        {
            "torni", "tornit", "museo", "museon", "kirkko", "kirkot", "silta", "sillat",
            "satama", "satamat", "teatteri", "asema", "linna", "linnake", "linnoitus",
            "palatsi", "puisto", "aukio", "portti", "katedraali", "moskeija", "temppeli",
            "basaari", "koulu", "panimo", "laituri", "laiturit", "hautausmaa", "majakka",
            "kirjasto", "yliopisto", "sairaala", "tuomiokirkko", "raatihuone",
            "eläintarha", "elaintarha", "kaupungintalo",
        };

        static readonly string[] YleissanojenRungot =
        {
            "kaupun", "maailma", "histori", "synty", "sijait", "asukk", "ihmis",
            "vuosi", "vuode", "aikaan", "aikana", "nykyis", "paikk", "alue",
            "rakenne", "elämä", "elama", "perint", "kuului", "tunnet", "merkit",
            "kesku", "seudu", "seutu",
        };

        // Web: /[^0-9a-zà-öø-ÿåäö]+/i
        static readonly Regex Erotin = new Regex("[^0-9a-zà-öø-ÿåäö]+", RegexOptions.IgnoreCase);

        static bool Yleissana(string sana) =>
            KohteenYleissanat.Contains(sana) || YleissanojenRungot.Any(r => sana.StartsWith(r, StringComparison.Ordinal) && sana.Length <= r.Length + YleissananPaate);

        public static List<string> Sanoita(string teksti) =>
            Erotin.Split((teksti ?? "").ToLowerInvariant()).Where(s => s.Length >= SananVahimmais).ToList();

        public static List<string> Hakusanat(string kysymys) => Sanoita(kysymys).Where(s => !Ohitettavat.Contains(s)).Distinct().ToList();

        // --- merkinnät ----------------------------------------------------------------------

        /// <summary>Linkin kohde (web reitti): maalehti / kaupunkilehti (+ sivu = aihe) tai nahtavyys (+ kohde).</summary>
        public sealed class Reitti
        {
            public string Tyyppi, Tunniste, Sivu, Kohde, Otsikko, Leima, Nimi;
        }

        sealed class Merkinta
        {
            public string Tyyppi, Omistaja, Aihe, AiheNimi, Otsikko, Teksti, Lahde, TehtavaAvain;
            public Reitti Reitti;
            public List<string> OtsikkoSanat, TekstiSanat, NimiSanat = new List<string>();
        }

        public sealed class Katkelma
        {
            public double Piste;
            public bool Oma;
            public string Leima, Teksti, Lahde;
            public List<string> Ankkurit;
            public Reitti Reitti;
        }

        static Merkinta Uusi(string tyyppi, string omistaja, string aihe, string aiheNimi, string otsikko, string teksti,
            Reitti reitti, string lahde = null, string tehtavaAvain = null)
        {
            string puhdas = Regex.Replace(teksti ?? "", @"\s+", " ").Trim();
            if (puhdas.Length == 0) return null;
            return new Merkinta
            {
                Tyyppi = tyyppi, Omistaja = omistaja, Aihe = aihe, AiheNimi = aiheNimi, Otsikko = (otsikko ?? "").Trim(),
                Teksti = puhdas, Lahde = lahde, TehtavaAvain = tehtavaAvain, Reitti = reitti,
                OtsikkoSanat = Sanoita(otsikko).Distinct().ToList(), TekstiSanat = Sanoita(puhdas).Distinct().ToList(),
            };
        }

        static string T(Dictionary<string, object> o, string k) => MiniJson.Teksti(o, k);

        static void LisaaKategoriat(List<Merkinta> ulos, Dictionary<string, List<object>> taulu, string tyyppi)
        {
            foreach (var kv in taulu)
                foreach (var k in kv.Value.Select(Rakenne.Olio).Where(x => x != null))
                {
                    string id = T(k, "id"), nimi = T(k, "nimi") ?? id;
                    if (id == null) continue;
                    Reitti R() => new Reitti { Tyyppi = tyyppi == "maa" ? "maalehti" : "kaupunkilehti", Tunniste = kv.Key, Sivu = id, Otsikko = nimi };
                    var johdanto = Uusi(tyyppi, kv.Key, id, nimi, nimi, T(k, "johdanto"), R());
                    if (johdanto != null) ulos.Add(johdanto);
                    foreach (var n in (Rakenne.Lista(MiniJson.Kentta(k, "nostot")) ?? new List<object>()).Select(Rakenne.Olio).Where(x => x != null))
                    {
                        string teksti = string.Join(" — ", new[] { T(n, "aika"), T(n, "teksti") }.Where(x => !string.IsNullOrEmpty(x)));
                        var m = Uusi(tyyppi, kv.Key, id, nimi, T(n, "otsikko"), teksti, R(), T(n, "lahde"));
                        if (m != null) ulos.Add(m);
                    }
                    // Minitehtävän fakta: tyyppi 'fakta' (web: sama kenttä ohittaa tyypin, joten leima on kaupunkilehden).
                    if (T(Rakenne.Olio(MiniJson.Kentta(k, "tehtava")), "fakta") is string fakta)
                    {
                        var m = Uusi("fakta", kv.Key, id, nimi, nimi, fakta, R(), tehtavaAvain: id);
                        if (m != null) ulos.Add(m);
                    }
                }
        }

        static void LisaaNahtavyydet(List<Merkinta> ulos, IEnumerable<(string Kaupunki, string Nimi, Dictionary<string, object> Juttu)> jutut)
        {
            foreach (var (kaupunki, nimi, j) in jutut)
            {
                var osat = new List<string> { T(j, "aika"), T(j, "teksti") };
                var lainaus = Rakenne.Olio(MiniJson.Kentta(j, "lainaus"));
                if (T(lainaus, "teksti") is string lt) osat.Add("\"" + lt + "\" — " + (T(lainaus, "lahde") ?? ""));
                var m = Uusi("nahtavyys", kaupunki, "nahtavyys", "Kohdekartta", nimi, string.Join(" ", osat.Where(x => !string.IsNullOrEmpty(x))),
                    new Reitti { Tyyppi = "nahtavyys", Tunniste = kaupunki, Kohde = nimi, Otsikko = nimi });
                if (m != null) ulos.Add(m);
            }
        }

        /// <summary>Web kohteenNimiSanat: sulkeiden osat omiksi ryhmikseen, yleissanat pois.</summary>
        static List<List<string>> KohteenNimiSanat(string nimi)
        {
            var ryhmat = new List<List<string>>();
            foreach (var osa in Regex.Split(nimi ?? "", @"[()\[\]]"))
            {
                var sanat = Sanoita(osa).Where(s => s.Length >= AnkkurinVahimmais && !Ohitettavat.Contains(s) && !KohteenYleissanat.Contains(s)).Distinct().ToList();
                if (sanat.Count > 0) ryhmat.Add(sanat);
            }
            return ryhmat;
        }

        static int YhteinenAlku(string a, string b)
        {
            int raja = Math.Min(a.Length, b.Length), i = 0;
            while (i < raja && a[i] == b[i]) i++;
            return i;
        }

        static void LiitaKohdenimet(List<Merkinta> merkinnat, IEnumerable<(string Kaupunki, string Nimi)> kohteet)
        {
            var nimet = new Dictionary<string, List<List<string>>>();
            foreach (var (kaupunki, nimi) in kohteet)
                foreach (var ryhma in KohteenNimiSanat(nimi))
                {
                    // Kaupungin oma nimi ei ole kohteen ankkuri (web: Pariisin "pariisin" ei tee jokaisesta merkinnästä kohdetta).
                    if (ryhma.Count == 1 && YhteinenAlku(ryhma[0], kaupunki ?? "") >= Math.Min(5, ryhma[0].Length)) continue;
                    if (!nimet.TryGetValue(kaupunki, out var lista)) nimet[kaupunki] = lista = new List<List<string>>();
                    string avain = string.Join(" ", ryhma);
                    if (!lista.Any(r => string.Join(" ", r) == avain)) lista.Add(ryhma);
                }
            foreach (var m in merkinnat)
            {
                if (m.Tyyppi == "nahtavyys" || !nimet.TryGetValue(m.Omistaja, out var ryhmat)) continue;
                foreach (var ryhma in ryhmat)
                {
                    if (!ryhma.All(s => Osuu(m.TekstiSanat, s) > 0 || Osuu(m.OtsikkoSanat, s) > 0)) continue;
                    foreach (var s in ryhma)
                    {
                        if (!m.NimiSanat.Contains(s)) m.NimiSanat.Add(s);
                        if (!m.OtsikkoSanat.Contains(s)) m.OtsikkoSanat.Add(s);
                    }
                }
            }
        }

        /// <summary>Web osuu: 0 ei osumaa, 1 alkuosuma (kumpaan suuntaan tahansa), 2 tarkka sana.</summary>
        static int Osuu(List<string> sanat, string haku)
        {
            int paras = 0;
            foreach (var s in sanat)
            {
                if (s == haku) return 2;
                if (s.StartsWith(haku, StringComparison.Ordinal)) paras = 1;
                else if (s.Length >= TakaperinVahimmais && haku.StartsWith(s, StringComparison.Ordinal)) paras = 1;
            }
            return paras;
        }

        static string LahdeLeima(Merkinta m)
        {
            string nimi = m.Tyyppi == "maa" ? UiSisalto.Maa(m.Omistaja)?.Nimi ?? m.Omistaja : UiSisalto.Kaupunki(m.Omistaja)?.Nimi ?? m.Omistaja;
            string lehti = m.Tyyppi == "maa" ? nimi + " — maalehti" : m.Tyyppi == "nahtavyys" ? nimi + " — kohdekartta" : nimi + " — kaupunkilehti";
            string otsikko = !string.IsNullOrEmpty(m.Otsikko) && m.Otsikko != m.AiheNimi ? ": " + m.Otsikko : "";
            return lehti + " / " + m.AiheNimi + otsikko;
        }

        static List<string> AnkkuriSanat(Merkinta m)
        {
            var ulos = new List<string>();
            bool Kelpaa(string s) => s.Length >= AnkkurinVahimmais && !Ohitettavat.Contains(s) && !Yleissana(s) && !ulos.Contains(s);
            void Lisaa(string t) { foreach (var s in Sanoita(t)) if (Kelpaa(s)) ulos.Add(s); }
            void Nimet() { foreach (var s in m.NimiSanat) if (Kelpaa(s)) ulos.Add(s); }
            if (m.Tyyppi == "nahtavyys") { Lisaa(m.Otsikko); Nimet(); }
            else { Nimet(); Lisaa(m.Otsikko); }
            Lisaa(m.AiheNimi);
            return ulos;
        }

        // --- indeksi ----------------------------------------------------------------------

        static List<Merkinta> indeksi;
        static bool haussa;

        public static bool Valmis => indeksi != null;

        /// <summary>Rakentaa indeksin kerran (kaupunkilehdet, maalehdet, nähtävyydet, kohdekartat) taustasäikeessä.</summary>
        public static void Valmistele()
        {
            if (indeksi != null || haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Rakenna());
        }

        static IEnumerator Rakenna()
        {
            string kl = null, ml = null, na = null, kk = null;
            yield return Sisalto.HaeTeksti("kaupunkilehdet", t => kl = t, valinnainen: true);
            yield return Sisalto.HaeTeksti("maalehdet", t => ml = t, valinnainen: true);
            yield return Sisalto.HaeTeksti("nahtavyydet", t => na = t, valinnainen: true);
            yield return Sisalto.HaeTeksti("kohdekartat", t => kk = t, valinnainen: true);
            List<Merkinta> tulos = null;
            var tehtava = Task.Run(() =>
            {
                try
                {
                    var m = new List<Merkinta>();
                    LisaaKategoriat(m, Taulu(kl, "kaupunki"), "kaupunki");
                    LisaaKategoriat(m, Taulu(ml, "maa"), "maa");
                    var jutut = Alkiot(na).Select(a => (T(a, "kaupunki"), T(a, "nimi"), Rakenne.Olio(MiniJson.Kentta(a, "data"))))
                        .Where(x => x.Item1 != null && x.Item2 != null && x.Item3 != null).ToList();
                    LisaaNahtavyydet(m, jutut);
                    var kohteet = new List<(string, string)>();
                    foreach (var a in Alkiot(kk))
                    {
                        string id = T(a, "kaupunki") ?? T(a, "id");
                        foreach (var o in (Rakenne.Lista(MiniJson.Kentta(a, "kohteet")) ?? new List<object>()).Select(Rakenne.Olio).Where(x => x != null))
                            if (id != null && T(o, "nimi") is string n) kohteet.Add((id, n));
                    }
                    kohteet.AddRange(jutut.Select(j => (j.Item1, j.Item2)));
                    LiitaKohdenimet(m, kohteet);
                    tulos = m;
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA pulun haku: indeksi epäonnistui: " + e.Message); }
            });
            while (!tehtava.IsCompleted) yield return null;
            indeksi = tulos ?? new List<Merkinta>();
            haussa = false;
            Debug.Log("MATKAKIRJA pulun haku: " + indeksi.Count + " merkintää");
        }

        static IEnumerable<Dictionary<string, object>> Alkiot(string json)
        {
            if (string.IsNullOrEmpty(json)) return Enumerable.Empty<Dictionary<string, object>>();
            return (Rakenne.Lista(MiniJson.Kentta(Rakenne.Olio(MiniJson.Jasenna(json)), "alkiot")) ?? new List<object>()).Select(Rakenne.Olio).Where(x => x != null);
        }

        /// <summary>Kokoelman alkiot omistajittain: raaka data (skeema 1.15) tai tyypitetyt aiheet (kuten LehtiSisalto).</summary>
        static Dictionary<string, List<object>> Taulu(string json, string avain)
        {
            var t = new Dictionary<string, List<object>>();
            foreach (var o in Alkiot(json))
            {
                string id = T(o, avain) ?? T(o, "id");
                var aiheet = Rakenne.Lista(MiniJson.Kentta(o, "data")) ?? Rakenne.Lista(MiniJson.Kentta(o, "aiheet"));
                if (id != null && aiheet != null) t[id] = aiheet;
            }
            return t;
        }

        // --- haku --------------------------------------------------------------------------

        /// <summary>
        /// Web haeKatkelmat: enintään maara osuvinta katkelmaa (TF-IDF-painot, otsikko- ja tarkan osuman
        /// bonus, oma kaupunki/maa × 2, kynnykset). onVastattu: minitehtävän fakta vain vastatulle aiheelle.
        /// </summary>
        public static List<Katkelma> Hae(string kysymys, string kaupunki, string maa, Func<string, bool> onVastattu, int maara = 4)
        {
            var tulos = new List<Katkelma>();
            var sanat = Hakusanat(kysymys);
            var ind = indeksi;
            if (ind == null || ind.Count == 0 || sanat.Count == 0) return tulos;
            var osumat = new List<(Merkinta M, List<(int I, int Ots, int Teks)> Rivi)>();
            var tiheys = new int[sanat.Count];
            foreach (var m in ind)
            {
                if (m.Tyyppi == "fakta" && !(onVastattu?.Invoke(m.TehtavaAvain) ?? false)) continue;
                List<(int, int, int)> rivi = null;
                for (int i = 0; i < sanat.Count; i++)
                {
                    int ots = Osuu(m.OtsikkoSanat, sanat[i]), teks = Osuu(m.TekstiSanat, sanat[i]);
                    if (ots == 0 && teks == 0) continue;
                    tiheys[i]++;
                    (rivi ??= new List<(int, int, int)>()).Add((i, ots, teks));
                }
                if (rivi != null) osumat.Add((m, rivi));
            }
            int yhteensa = Math.Max(ind.Count, 1);
            var painot = tiheys.Select(df => Math.Max(Math.Log(yhteensa / (1.0 + df)), 0.05)).ToArray();
            double suurin = painot.Length > 0 ? painot.Max() : 0;
            var avainsana = painot.Select(p => p >= AvainsanaRaja * suurin).ToArray();
            var pisteet = new List<(Merkinta M, double Piste, bool Oma)>();
            foreach (var (m, rivi) in osumat)
            {
                double piste = 0;
                int avaimia = 0;
                foreach (var (i, ots, teks) in rivi)
                {
                    double p = painot[i];
                    if (ots > 0) piste += OtsikonPaino * p * (ots == 2 ? TarkanOsumanKerroin : 1);
                    if (teks > 0) piste += TekstinPaino * p * (teks == 2 ? TarkanOsumanKerroin : 1);
                    if (avainsana[i]) avaimia++;
                }
                bool oma = (kaupunki != null && m.Omistaja == kaupunki) || (maa != null && m.Omistaja == maa);
                if (oma) piste *= SijaintiKerroin;
                if (avaimia < 1 || piste < PohjaPiste) continue;
                pisteet.Add((m, piste, oma));
            }
            pisteet.Sort((a, b) => b.Piste != a.Piste ? b.Piste.CompareTo(a.Piste) : b.M.Teksti.Length.CompareTo(a.M.Teksti.Length));
            double paras = pisteet.Count > 0 ? pisteet[0].Piste : 0;
            foreach (var (m, piste, oma) in pisteet.Where(p => p.Piste >= SuhdeKynnys * paras).Take(maara))
            {
                string leima = LahdeLeima(m);
                tulos.Add(new Katkelma
                {
                    Piste = piste, Oma = oma, Leima = leima, Lahde = m.Lahde, Ankkurit = AnkkuriSanat(m),
                    Teksti = m.Teksti.Length > KatkelmanKatto ? m.Teksti.Substring(0, KatkelmanKatto - 1) + "…" : m.Teksti,
                    Reitti = m.Reitti == null ? null : new Reitti
                    {
                        Tyyppi = m.Reitti.Tyyppi, Tunniste = m.Reitti.Tunniste, Sivu = m.Reitti.Sivu, Kohde = m.Reitti.Kohde,
                        Otsikko = m.Reitti.Otsikko, Leima = leima, Nimi = string.IsNullOrEmpty(m.Otsikko) ? m.Reitti.Otsikko : m.Otsikko,
                    },
                });
            }
            return tulos;
        }
    }
}
