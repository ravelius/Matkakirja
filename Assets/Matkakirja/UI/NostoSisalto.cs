// NOSTOKORTTIEN SISÄLTÖ (Natiivi-UI): karttavalon id → kortin data sisältöpaketista.
//
//   "skandaali:<id>"   kokoelma skandaalit       (otsikko, paikka, vuosi, kortti, teksti, kuvat|kuva, visa)
//   "hetki:<id>"       kokoelma historianHetket  (otsikko, paikka, paivays, teksti, kuvat[tiedosto], visa)
//   "elaintaky:<ISO>"  kokoelma elaintayt        (elain, otsikko, teksti, kuva | kuvat[url])
//   "kohde:<id>[~n]"   moduulit fokuskohteet-/maastokohteet-/hahmotelma-<iso> (maa karttavaloista;
//                      testeissä "kohde:<id>@ISO")
// Kuvan osoite: suora https-osoite sellaisenaan; paketin omat tiedostot (hetkikuvat,
// assets/elaimet/…) media.json:n viitteistä; muut Commons-nimet Kuvat.Hae-reitillä.
// Kokoelmat ja moduulit haetaan kerran ja pidetään muistissa (media.json jäsennetään
// taustasäikeessä, siitä pidetään vain muut kuin Commons-viitteet).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public enum NostoLaji { Kohde, Skandaali, Hetki, Elain }

    public sealed class NostoKuva
    {
        /// <summary>https-osoite tai tiedosto-/Commons-nimi (NostoSisalto.HaeKuva ratkaisee).</summary>
        public string Lahde;
        public string Lyhyt, Selite, Tekija;
        /// <summary>Lähderivi: lähde · lisenssi.</summary>
        public string LahdeRivi;
    }

    public sealed class NostoVisa
    {
        public string Kysymys, Fakta;
        public List<string> Vaihtoehdot = new List<string>();
        public int Oikea;
    }

    public sealed class Nosto
    {
        public NostoLaji Laji;
        public string Id, Iso;
        public string Luokka;           // ylärivin luokka versaalina ("SKANDAALIT")
        public string Otsikko, Meta, Ingressi, Teksti;
        public List<NostoKuva> Kuvat = new List<NostoKuva>();
        public NostoVisa Visa;
        public List<string> Kysymykset = new List<string>();
        public List<(string Nappi, string Url)> Kierrokset = new List<(string, string)>();
        /// <summary>Minitehtävän avain (Kaupat.Minitehtava(kaupunki, aihe)) ja palkkio.</summary>
        public string VisaKaupunki, VisaAihe;
        public int VisaPalkkio;
    }

    public static class NostoSisalto
    {
        static readonly Dictionary<string, Dictionary<string, Dictionary<string, object>>> kokoelmat =
            new Dictionary<string, Dictionary<string, Dictionary<string, object>>>();
        static readonly Dictionary<string, List<object>> moduulit = new Dictionary<string, List<object>>();
        static Dictionary<string, string> valojenMaat;
        static Dictionary<string, string> media;
        static bool mediaHaussa;
        static readonly List<Action> mediaOdottajat = new List<Action>();

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static string T(Dictionary<string, object> o, string k) => MiniJson.Teksti(o, k);

        // --- haku --------------------------------------------------------------------------

        /// <summary>Hakee kortin datan valon id:llä (null = ei löytynyt tai paketissa ei ole).</summary>
        public static IEnumerator Hae(string valoId, Action<Nosto> valmis)
        {
            Nosto n = null;
            int i = valoId?.IndexOf(':') ?? -1;
            string laji = i > 0 ? valoId.Substring(0, i) : "", tunnus = i > 0 ? valoId.Substring(i + 1) : "";
            switch (laji)
            {
                case "skandaali":
                {
                    Dictionary<string, object> d = null; string iso = null;
                    yield return Alkio("skandaalit", tunnus, (x, m) => { d = x; iso = m; });
                    if (d != null) n = Skandaali(tunnus, iso, d);
                    break;
                }
                case "hetki":
                {
                    Dictionary<string, object> d = null; string iso = null;
                    yield return Alkio("historianHetket", tunnus, (x, m) => { d = x; iso = m; });
                    if (d != null) n = Hetki(tunnus, iso ?? T(d, "iso"), d);
                    break;
                }
                case "elaintaky":
                {
                    Dictionary<string, object> d = null;
                    yield return Alkio("elaintayt", tunnus, (x, _) => d = x);
                    if (d != null) n = Elain(tunnus, d);
                    break;
                }
                case "kohde":
                {
                    string iso = null;
                    int at = tunnus.IndexOf('@');
                    if (at > 0) { iso = tunnus.Substring(at + 1); tunnus = tunnus.Substring(0, at); }
                    if (iso == null)
                    {
                        yield return ValojenMaat();
                        valojenMaat.TryGetValue("kohde:" + tunnus, out iso);
                    }
                    int tilde = tunnus.IndexOf('~');
                    if (tilde > 0) tunnus = tunnus.Substring(0, tilde);
                    if (string.IsNullOrEmpty(iso)) break;
                    Dictionary<string, object> d = null;
                    foreach (var (tiedosto, vienti) in new[] { ("fokuskohteet", "FOKUSKOHTEET"), ("maastokohteet", "MAASTOKOHTEET"), ("hahmotelma", "HAHMOTELMA") })
                    {
                        List<object> lista = null;
                        yield return Moduuli($"moduulit/js/packs/{tiedosto}-{iso.ToLowerInvariant()}.json", $"{vienti}_{iso.ToUpperInvariant()}", l => lista = l);
                        d = lista?.Select(Ob).FirstOrDefault(x => x != null && T(x, "id") == tunnus);
                        if (d != null) break;
                    }
                    if (d != null) n = Kohde(tunnus, iso.ToUpperInvariant(), d);
                    break;
                }
            }
            valmis(n);
        }

        static IEnumerator Alkio(string kokoelma, string id, Action<Dictionary<string, object>, string> valmis)
        {
            if (!kokoelmat.TryGetValue(kokoelma, out var taulu))
            {
                string teksti = null;
                yield return Sisalto.HaeTeksti(kokoelma, t => teksti = t, valinnainen: true);
                taulu = new Dictionary<string, Dictionary<string, object>>();
                try
                {
                    var alkiot = MiniJson.Kentta(Ob(MiniJson.Jasenna(teksti ?? "{}")), "alkiot") as List<object>;
                    foreach (var a in alkiot ?? new List<object>())
                    {
                        var o = Ob(a);
                        var aid = T(o, "id");
                        if (aid == null) continue;
                        // Maa talteen dataan (skandaalin ja hetken minitehtävän avain).
                        var data = Ob(MiniJson.Kentta(o, "data")) ?? o;
                        if (T(o, "maa") != null && !data.ContainsKey("$maa")) data["$maa"] = T(o, "maa");
                        taulu[aid] = data;
                    }
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui nostot: " + kokoelma + ": " + e.Message); }
                kokoelmat[kokoelma] = taulu;
            }
            taulu.TryGetValue(id, out var d);
            valmis(d, d != null ? T(d, "$maa") : null);
        }

        static IEnumerator ValojenMaat()
        {
            if (valojenMaat != null) yield break;
            string teksti = null;
            yield return Sisalto.HaeTeksti("karttavalot", t => teksti = t, valinnainen: true);
            var m = new Dictionary<string, string>();
            try
            {
                foreach (var a in MiniJson.Kentta(Ob(MiniJson.Jasenna(teksti ?? "{}")), "alkiot") as List<object> ?? new List<object>())
                    if (Ob(a) is Dictionary<string, object> o && T(o, "id") is string id) m[id] = T(o, "maa");
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui nostot: karttavalot: " + e.Message); }
            valojenMaat = m;
        }

        static IEnumerator Moduuli(string polku, string vienti, Action<List<object>> valmis)
        {
            if (!moduulit.TryGetValue(polku, out var lista))
            {
                string teksti = null;
                yield return Sisalto.HaePaketista(polku, t => teksti = t, true);
                try
                {
                    var v = Ob(MiniJson.Kentta(Ob(MiniJson.Jasenna(teksti ?? "{}")), "exportit"));
                    var x = MiniJson.Kentta(v, vienti);
                    if (Ob(x) is Dictionary<string, object> kaare) x = MiniJson.Kentta(kaare, "arvo") ?? x;
                    lista = x as List<object>;
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui nostot: " + polku + ": " + e.Message); }
                moduulit[polku] = lista;
            }
            valmis(lista);
        }

        // --- muunnos ----------------------------------------------------------------------

        static Nosto Skandaali(string id, string iso, Dictionary<string, object> d)
        {
            var n = new Nosto
            {
                Laji = NostoLaji.Skandaali, Id = id, Iso = iso, Luokka = "SKANDAALIT",
                Otsikko = T(d, "otsikko"), Meta = Liita(T(d, "paikka"), T(d, "vuosi")),
                Ingressi = T(d, "kortti"), Teksti = T(d, "teksti"),
                VisaKaupunki = iso, VisaAihe = "skandaali:" + id, VisaPalkkio = 50,
            };
            Kuvat(n, MiniJson.Kentta(d, "kuvat") ?? MiniJson.Kentta(d, "kuva"), "osoite");
            n.Visa = Visa(d);
            return n;
        }

        static Nosto Hetki(string id, string iso, Dictionary<string, object> d)
        {
            var n = new Nosto
            {
                Laji = NostoLaji.Hetki, Id = id, Iso = iso, Luokka = "HISTORIAN HETKET",
                Otsikko = T(d, "otsikko"), Meta = Liita(T(d, "paikka"), T(d, "paivays")), Teksti = T(d, "teksti"),
                VisaKaupunki = iso, VisaAihe = "hetki:" + id, VisaPalkkio = 50,
            };
            // Hetken kuvat[].url on lähdesivu, ei kuva: kuva on aina tiedostonimi (media.json).
            Kuvat(n, MiniJson.Kentta(d, "kuvat"), "tiedosto");
            n.Visa = Visa(d);
            return n;
        }

        static Nosto Elain(string iso, Dictionary<string, object> d)
        {
            var n = new Nosto
            {
                Laji = NostoLaji.Elain, Id = iso, Iso = iso, Luokka = "ELÄIMET",
                Otsikko = T(d, "otsikko"), Teksti = T(d, "teksti"),
            };
            string elain = T(d, "elain");
            string vara = elain == null ? null : char.ToUpperInvariant(elain[0]) + elain.Substring(1)
                + (UiSisalto.Maa(iso)?.Nimi is string maa ? ", " + maa : "");
            if (MiniJson.Kentta(d, "kuvat") is List<object> kk && kk.Count > 0) Kuvat(n, kk, "url");
            else if (T(d, "kuva") is string k) n.Kuvat.Add(new NostoKuva { Lahde = k, Lyhyt = vara, Selite = vara });
            foreach (var x in n.Kuvat) { x.Lyhyt ??= vara; x.Selite ??= x.Lyhyt; }
            return n;
        }

        static readonly Dictionary<string, string> Tyypit = new Dictionary<string, string>
        {
            { "kaupunki", "KAUPUNGIT" }, { "historia", "HISTORIA" }, { "luonto", "LUONTO" }, { "vuori", "LUONTO · VUORI" },
            { "joki", "LUONTO · JOKI" }, { "jarvi", "LUONTO · JÄRVI" }, { "elain", "ELÄIMET" }, { "kulttuuri", "KULTTUURI" },
            { "kauppa", "KAUPPA" }, { "ihme", "IHMEET" }, { "nahtavyys", "NÄHTÄVYYDET" }, { "saari", "LUONTO · SAARI" },
        };

        static Nosto Kohde(string id, string iso, Dictionary<string, object> d)
        {
            string tyyppi = T(d, "symboli") ?? T(d, "tyyppi") ?? "";
            var n = new Nosto
            {
                Laji = NostoLaji.Kohde, Id = id, Iso = iso,
                Luokka = Tyypit.TryGetValue(tyyppi, out var l) ? l : tyyppi.ToUpperInvariant(),
                Otsikko = T(d, "nimi"), Teksti = T(d, "teksti"),
                VisaKaupunki = "nosto", VisaAihe = id, VisaPalkkio = 25,
            };
            var kuvat = new List<object>();
            if (MiniJson.Kentta(d, "kuva") is object k1) kuvat.Add(k1);
            if (MiniJson.Kentta(d, "kuvat") is List<object> kk) kuvat.AddRange(kk);
            Kuvat(n, kuvat, "osoite");
            n.Kuvat = n.Kuvat.GroupBy(x => x.Lahde).Select(g => g.First()).ToList();
            n.Visa = Visa(d);
            if (MiniJson.Kentta(d, "kysymykset") is List<object> q) n.Kysymykset = q.OfType<string>().Take(2).ToList();
            var kierrokset = MiniJson.Kentta(d, "kierrokset") as List<object> ?? (MiniJson.Kentta(d, "kierros") is object yksi ? new List<object> { yksi } : null);
            foreach (var x in kierrokset?.Select(Ob).Where(x => x != null) ?? Enumerable.Empty<Dictionary<string, object>>())
                if (T(x, "url") is string url) n.Kierrokset.Add((T(x, "nappi") ?? "Kierros", url));
            return n;
        }

        static void Kuvat(Nosto n, object arvo, string ensisijainen)
        {
            var lista = arvo as List<object> ?? (arvo != null ? new List<object> { arvo } : new List<object>());
            foreach (var a in lista)
            {
                if (a is string s) { n.Kuvat.Add(new NostoKuva { Lahde = s }); continue; }
                var o = Ob(a);
                if (o == null) continue;
                string lahde = T(o, ensisijainen) ?? T(o, "osoite") ?? T(o, "tiedosto");
                if (ensisijainen != "tiedosto") lahde ??= T(o, "url");
                if (string.IsNullOrEmpty(lahde)) continue;
                n.Kuvat.Add(new NostoKuva
                {
                    Lahde = lahde,
                    Lyhyt = T(o, "lyhyt") ?? T(o, "selite") ?? T(o, "kuvateksti"),
                    Selite = T(o, "selite") ?? T(o, "kuvateksti") ?? T(o, "lyhyt"),
                    Tekija = T(o, "tekija"),
                    LahdeRivi = Liita(T(o, "lahde"), T(o, "lisenssi")),
                });
            }
        }

        static NostoVisa Visa(Dictionary<string, object> d)
        {
            var v = Ob(MiniJson.Kentta(d, "visa"));
            if (v == null || !(MiniJson.Kentta(v, "vaihtoehdot") is List<object> vv) || vv.Count == 0) return null;
            var tulos = new NostoVisa { Kysymys = T(v, "kysymys"), Fakta = T(v, "fakta"), Vaihtoehdot = vv.Select(x => x?.ToString() ?? "").ToList() };
            var oikea = MiniJson.Kentta(v, "oikea");
            if (oikea is string os) tulos.Oikea = Math.Max(0, tulos.Vaihtoehdot.IndexOf(os));
            else tulos.Oikea = (int)(MiniJson.Luku(v, "oikea") ?? 0);
            return tulos.Kysymys == null ? null : tulos;
        }

        static string Liita(params string[] osat)
        {
            var l = osat.Where(x => !string.IsNullOrEmpty(x)).ToList();
            return l.Count == 0 ? null : string.Join(" · ", l);
        }

        // --- kuvat ------------------------------------------------------------------------

        /// <summary>Kuva tekstuurina: https suoraan, paketin tiedostot media.json:sta, muut Commonsista.</summary>
        public static void HaeKuva(string lahde, Action<Texture2D> valmis)
        {
            if (string.IsNullOrEmpty(lahde)) { valmis(null); return; }
            if (lahde.StartsWith("http")) { Natiivi.Kuvat.Hae(lahde, valmis); return; }
            Media(() => Natiivi.Kuvat.Hae(media != null && media.TryGetValue(lahde, out var url) ? url : lahde, valmis));
        }

        static void Media(Action valmis)
        {
            if (media != null) { valmis(); return; }
            mediaOdottajat.Add(valmis);
            if (mediaHaussa) return;
            mediaHaussa = true;
            UiKerros.Hae().StartCoroutine(Sisalto.HaePaketista("media.json", t =>
            {
                // Jäsennys taustasäikeessä (~20 000 viitettä); muistiin vain muut kuin Commons-kuvat.
                Task.Run(() =>
                {
                    var m = new Dictionary<string, string>();
                    try
                    {
                        foreach (var a in MiniJson.Kentta(Ob(MiniJson.Jasenna(t ?? "{}")), "viitteet") as List<object> ?? new List<object>())
                        {
                            var o = Ob(a);
                            if (o == null || T(o, "laji") == "kuva-commons") continue;
                            if (T(o, "arvo") is string arvo && T(o, "url") is string url) m[arvo] = url;
                        }
                    }
                    catch (Exception) { }
                    return m;
                }).ContinueWith(tt => UiKerros.PaaSaikeessa(() =>
                {
                    media = tt.Result ?? new Dictionary<string, string>();
                    mediaHaussa = false;
                    var o = mediaOdottajat.ToList();
                    mediaOdottajat.Clear();
                    foreach (var a in o) a();
                }));
            }, true));
        }
    }
}
