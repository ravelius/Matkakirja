// TILASTOT KEHITTÄJÄN LIITTEENÄ (Natiivi-UI): webin js/tyohuone-tilastot.js tilastoSivut (Mantereet, Luvut, Kiintiöt).
//
// Taulu on valmiiksi laskettu (Siirtoseppä, skeema 1.28, kokoelma tyohuonetilastot = webin laskeTilastot()): mantereet
// → maat → kaupungit soluineen, juuressa sarakkeet { avain, otsikko, selite, taso }. Tuoreusmerkinnät tulevat
// Tilannelehden TUOREET-taulusta. Rivit rakennetaan vasta avattaessa (manner → maat, maa → kaupungit), koska koko
// taulu olisi ~600 riviä × 22 solua. Järjestys ja näkymä muistetaan laitteella kuten webissä (ei arkaluonteista).
// Kiintiöt: R2 (peilin manifesti) ja repon koko julkisista osoitteista; pöllö-workerin kiintiöt vaativat
// kehittäjäkoodin, jota natiivissa ei ole, joten ne jäävät "ei tietoa" -palkeiksi kuten webissä ilman koodia.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Tilastot
    {
        const string JarjestysAvain = "matkakirja-tilastot-jarjestys", NakymaAvain = "matkakirja-tilastot-nakyma";

        sealed class Sarake { public string Avain, Otsikko, Selite, Taso; }
        sealed class Solu { public int[] Pari; public string Teksti; public int? Luku; }
        sealed class Rivi
        {
            public string Id, Nimi, Iso;
            public double Osuus;
            public int Kaupunkeja;
            public Dictionary<string, int[]> Summa = new Dictionary<string, int[]>();
            public Dictionary<string, Solu> Solut = new Dictionary<string, Solu>();
            public List<Rivi> Lapset = new List<Rivi>();
        }

        static List<Sarake> sarakkeet;
        static List<Rivi> mantereet;
        static Dictionary<string, string> tuoreValmis = new Dictionary<string, string>();
        static HashSet<string> tuoreTyossa = new HashSet<string>();

        static string T(Dictionary<string, object> o, string k) => MiniJson.Teksti(o, k);
        static int I(object x) => x is double d ? (int)d : x is long l ? (int)l : 0;
        static int[] Pari(object x) => Rakenne.Lista(x) is List<object> l && l.Count == 2 ? new[] { I(l[0]), I(l[1]) } : null;
        static List<Dictionary<string, object>> L(Dictionary<string, object> o, string k) =>
            (Rakenne.Lista(MiniJson.Kentta(o, k)) ?? new List<object>()).Select(Rakenne.Olio).Where(x => x != null).ToList();

        static Rivi Lue(Dictionary<string, object> o, string lapset)
        {
            var r = new Rivi { Id = T(o, "id"), Nimi = T(o, "nimi") ?? "", Iso = T(o, "iso"), Kaupunkeja = I(MiniJson.Kentta(o, "kaupunkeja")) };
            r.Osuus = MiniJson.Kentta(o, "osuus") is double d ? d : 0;
            foreach (var kv in Rakenne.Olio(MiniJson.Kentta(o, "summa")) ?? new Dictionary<string, object>()) r.Summa[kv.Key] = Pari(kv.Value);
            foreach (var kv in Rakenne.Olio(MiniJson.Kentta(o, "solut")) ?? new Dictionary<string, object>())
            {
                var s = Rakenne.Olio(kv.Value);
                r.Solut[kv.Key] = new Solu { Pari = Pari(MiniJson.Kentta(s, "pari")), Teksti = T(s, "teksti"), Luku = MiniJson.Kentta(s, "luku") != null ? I(MiniJson.Kentta(s, "luku")) : (int?)null };
            }
            if (lapset != null) r.Lapset = L(o, lapset).Select(x => Lue(x, lapset == "maat" ? "kaupungit" : null)).ToList();
            return r;
        }

        public static void Avaa()
        {
            if (!Tyohuone.Sallittu) return;
            UiKerros.Hae().StartCoroutine(Sisalto.HaeTeksti("tyohuonetilastot", json =>
            {
                try
                {
                    var juuri = Rakenne.Olio(json != null ? MiniJson.Jasenna(json) : null);
                    if (juuri == null) { UiNakymat.Hae()?.Tilarivi.Viesti("Tilastot puuttuvat sisältöpaketista"); return; }
                    sarakkeet = L(juuri, "sarakkeet").Select(s => new Sarake { Avain = T(s, "avain"), Otsikko = T(s, "otsikko"), Selite = T(s, "selite"), Taso = T(s, "taso") }).ToList();
                    mantereet = L(juuri, "alkiot").Select(m => Lue(m, "maat")).ToList();
                }
                catch (FormatException) { UiNakymat.Hae()?.Tilarivi.Viesti("Tilastot puuttuvat sisältöpaketista"); return; }
                // Tuoreusmerkinnät Tilannelehden TUOREET-taulusta (puuttuessa ilman merkintöjä).
                UiKerros.Hae().StartCoroutine(Sisalto.HaePaketista("moduulit/js/tyohuone-tilanne.json", t =>
                {
                    try
                    {
                        var e = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(t != null ? MiniJson.Jasenna(t) : null), "exportit"));
                        var tu = Rakenne.Olio(MiniJson.Kentta(e, "TUOREET"));
                        if (tu != null && tu.Count == 1 && tu.ContainsKey("arvo")) tu = Rakenne.Olio(tu["arvo"]);
                        tuoreValmis = L(tu, "valmiit").Where(k => T(k, "id") != null).GroupBy(k => T(k, "id")).ToDictionary(g => g.Key, g => T(g.First(), "versio") ?? "");
                        tuoreTyossa = new HashSet<string>(L(tu, "tyossa").Select(k => T(k, "id")).Where(x => x != null));
                    }
                    catch (FormatException) { /* ei tuoreusmerkintöjä */ }
                    Tyohuone.Lehti?.NaytaLiite("Tilastot", new List<LehtiSivu>
                    {
                        Tyohuone.Sivu("Mantereet", Mantereet),
                        Tyohuone.Sivu("Luvut", Luvut),
                        Tyohuone.Sivu("Kiintiöt", Kiintiot),
                    });
                }, true));
            }, true));
        }

        // --- solut (web savy, soluTeksti, solu, palkki, nimisolu) ------------------------------------

        static string Savy(int[] p) => p == null || p[1] == 0 ? "tyhja" : p[0] >= p[1] ? "valmis" : p[0] > 0 ? "kesken" : "puuttuu";

        static string SoluTeksti(int[] p, bool koonti, string teksti = null, int? luku = null)
        {
            if (p == null) return "·";
            if (!string.IsNullOrEmpty(teksti)) return teksti;
            if (koonti) return $"{p[0]}/{p[1]}";
            if (p[1] == 1) return p[0] != 0 ? (luku.HasValue && luku.Value != 0 ? "✓ " + luku.Value : "✓") : "–";
            return $"{p[0]}/{p[1]}";
        }

        static void Numero(VisualElement rivi, int[] p, bool koonti, string teksti = null, int? luku = null) =>
            Tyohuone.Teksti(rivi, SoluTeksti(p, koonti, teksti, luku), "mk-tilastot__num mk-tilastot__num--" + Savy(p), Kirjasin.Kone);

        static VisualElement Nimisolu(VisualElement rivi, string nimi, string taso, bool avattava, double? osuus, string lisa)
        {
            var solu = Rakenne.El("mk-tilastot__nimi mk-tilastot__nimi--" + taso, rivi, PickingMode.Ignore);
            var yla = Rakenne.El("mk-tilastot__nimirivi", solu, PickingMode.Ignore);
            if (avattava) Tyohuone.Teksti(yla, "▸", "mk-tilastot__nuoli", Kirjasin.Kone);
            Tyohuone.Teksti(yla, nimi, "mk-tilastot__nimiteksti", Kirjasin.LukuLihava);
            if (osuus.HasValue)
            {
                Tyohuone.Teksti(yla, Mathf.RoundToInt((float)osuus.Value * 100) + " %", "mk-tilastot__osuus", Kirjasin.Kone);
                var palkki = Rakenne.El("mk-tilastot__palkki", solu, PickingMode.Ignore);
                Rakenne.El("mk-tilastot__palkkitayte", palkki, PickingMode.Ignore).style.width = Length.Percent(Mathf.Round((float)osuus.Value * 100));
            }
            if (!string.IsNullOrEmpty(lisa)) Tyohuone.Teksti(solu, lisa, "mk-tilastot__lisa");
            return yla;
        }

        static string Tiivistelma(Rivi manner)
        {
            var osat = new List<string>();
            foreach (var (nimi, avain) in new[] { ("lehdet", "lehti"), ("kartat", "kartta"), ("merkinnät", "merkinta"), ("maalehdet", "maalehti"), ("liput", "lippu") })
                if (manner.Summa.TryGetValue(avain, out var p) && p != null) osat.Add($"{nimi} {p[0]}/{p[1]}");
            return string.Join(" · ", osat);
        }

        // --- Mantereet (web piirraTilastosivu, piirraOhjausrivi, piirraTaulu) -------------------------

        static string Jarjestys { get => PlayerPrefs.GetString(JarjestysAvain, "") == "valmius" ? "valmius" : "aakkoset"; set => PlayerPrefs.SetString(JarjestysAvain, value); }
        static string Nakyma { get => PlayerPrefs.GetString(NakymaAvain, "") == "tuoreet" ? "tuoreet" : "kaikki"; set => PlayerPrefs.SetString(NakymaAvain, value); }

        static IComparer<string> Aakkoset
        {
            get
            {
                try { return StringComparer.Create(CultureInfo.GetCultureInfo("fi-FI"), false); }
                catch (CultureNotFoundException) { return StringComparer.OrdinalIgnoreCase; }
            }
        }

        static IEnumerable<Rivi> Jarjesta(IEnumerable<Rivi> l) => Jarjestys == "valmius"
            ? l.OrderByDescending(r => r.Osuus).ThenBy(r => r.Nimi, Aakkoset)
            : l.OrderBy(r => r.Nimi, Aakkoset);

        static string Tuoreus(string id) => id == null ? null : tuoreValmis.ContainsKey(id) ? "valmis" : tuoreTyossa.Contains(id) ? "tyossa" : null;

        static void Mantereet(VisualElement s)
        {
            var kotelo = Rakenne.El("mk-tilastot", s, PickingMode.Ignore);
            void Piirra()
            {
                kotelo.Clear();
                Ohjausrivi(kotelo, Piirra);
                Taulu(kotelo);
                Tyohuone.Teksti(kotelo, "Napauta mannerta: sen maat avautuvat, ja maan napautus paljastaa sen kaupungit. ✓ = tehty, – = puuttuu, "
                    + "suhde = tehdyt kaikista. Kooterivien luvut ovat sarakkeen summa. Osuus on rivin kaikkien osien keskiarvo, maan omat "
                    + "osat mukaan lukien. Luvut on laskettu pelin omista paketeista sisältöpaketin viennissä — käsin ylläpidettyä listaa ei ole.",
                    "mk-tyohuone__huomio");
            }
            Piirra();
        }

        static void Ohjausrivi(VisualElement isa, Action piirra)
        {
            var rivi = Rakenne.El("mk-tilastot__ohjaus", isa, PickingMode.Ignore);
            void Vipu(string nimi, (string Arvo, string Nimi)[] vaihtoehdot, Func<string> lue, Action<string> aseta)
            {
                Tyohuone.Teksti(rivi, nimi.ToUpperInvariant(), "mk-tilastot__ohjausnimi", Kirjasin.Kone);
                var napit = Rakenne.El("mk-tilastot__vipu", rivi, PickingMode.Ignore);
                foreach (var (arvo, teksti) in vaihtoehdot)
                {
                    string a = arvo;
                    var b = Rakenne.Nappi(teksti, "mk-tilastot__vipunappi", () => { aseta(a); PlayerPrefs.Save(); piirra(); }, napit);
                    b.EnableInClassList("mk-valittu", lue() == a);
                    Kirjasimet.Aseta(b, Kirjasin.Kone);
                }
            }
            Vipu("Järjestys", new[] { ("aakkoset", "aakkosittain"), ("valmius", "valmiit ylimpänä") }, () => Jarjestys, v => Jarjestys = v);
            Vipu("Näytä", new[] { ("kaikki", "kaikki"), ("tuoreet", "vain tuoreet") }, () => Nakyma, v => Nakyma = v);
        }

        static void Taulu(VisualElement isa)
        {
            bool vainTuoreet = Nakyma == "tuoreet";
            var vieri = new ScrollView(ScrollViewMode.Horizontal);
            vieri.AddToClassList("mk-tilastot__vieri");
            vieri.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            vieri.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            isa.Add(vieri);
            var taulu = Rakenne.El("mk-tilastot__taulu", vieri.contentContainer, PickingMode.Ignore);
            var otsikko = Rakenne.El("mk-tilastot__rivi mk-tilastot__rivi--otsikko", taulu, PickingMode.Ignore);
            Tyohuone.Teksti(otsikko, "KOHDE", "mk-tilastot__nimi", Kirjasin.KoneLihava);
            foreach (var sa in sarakkeet)
            {
                var o = Tyohuone.Teksti(otsikko, sa.Otsikko, "mk-tilastot__num", Kirjasin.KoneLihava);
                o.tooltip = sa.Selite;
            }
            foreach (var manner in mantereet)
            {
                var maat = vainTuoreet
                    ? manner.Lapset.Select(m => (Maa: m, Kaupungit: m.Lapset.Where(k => Tuoreus(k.Id) != null).ToList())).Where(x => x.Kaupungit.Count > 0).ToList()
                    : manner.Lapset.Select(m => (Maa: m, Kaupungit: m.Lapset)).ToList();
                if (vainTuoreet && maat.Count == 0) continue;
                var mRivi = RiviNappi(taulu, "manner");
                var mYla = Nimisolu(mRivi, manner.Nimi, "manner", true, manner.Osuus, $"{manner.Lapset.Count} maata · {manner.Kaupunkeja} kaupunkia — {Tiivistelma(manner)}");
                foreach (var sa in sarakkeet) Numero(mRivi, manner.Summa.TryGetValue(sa.Avain, out var p) ? p : null, true);
                // Maarivit ja kaupunkirivit syntyvät vasta avattaessa (kotelo rivin perään).
                var maaKotelo = Rakenne.El("mk-tilastot__lapset", taulu, PickingMode.Ignore);
                var kaupunkiKotelot = new List<(Button Rivi, VisualElement Kotelo, List<Rivi> Kaupungit)>();
                bool rakennettu = false;
                void RakennaMaat()
                {
                    if (rakennettu) return;
                    rakennettu = true;
                    foreach (var (maa, kaupungit) in Jarjesta(maat.Select(x => x.Maa)).Select(m => maat.First(x => x.Maa == m)))
                    {
                        var r = RiviNappi(maaKotelo, "maa");
                        Nimisolu(r, maa.Nimi, "maa", true, maa.Osuus, $"{maa.Lapset.Count} kaupunkia");
                        foreach (var sa in sarakkeet)
                        {
                            if (sa.Taso == "maa") { var so = maa.Solut.TryGetValue(sa.Avain, out var x) ? x : null; Numero(r, so?.Pari, false, null, so?.Luku); }
                            else Numero(r, maa.Summa.TryGetValue(sa.Avain, out var p2) ? p2 : null, true);
                        }
                        var kk = Rakenne.El("mk-tilastot__lapset", maaKotelo, PickingMode.Ignore);
                        kk.style.display = DisplayStyle.None;
                        var alkio = (r, kk, kaupungit);
                        kaupunkiKotelot.Add(alkio);
                        r.clicked += () => Vaihda(r, kk, kaupungit, kk.style.display == DisplayStyle.None);
                        if (vainTuoreet) Vaihda(r, kk, kaupungit, true);
                    }
                }
                void AsetaManner(bool auki)
                {
                    mRivi.EnableInClassList("mk-auki", auki);
                    if (auki) RakennaMaat();
                    maaKotelo.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
                    if (!auki) foreach (var (r, kk, k) in kaupunkiKotelot) Vaihda(r, kk, k, false);
                }
                maaKotelo.style.display = DisplayStyle.None;
                mRivi.clicked += () => AsetaManner(!mRivi.ClassListContains("mk-auki"));
                if (vainTuoreet) AsetaManner(true);
                else
                {
                    // "kaupungit esiin" avaa kaikki maat kaupunkeineen (web tk-kaikki-nappi).
                    Button kaikki = null;
                    kaikki = Rakenne.Nappi("kaupungit esiin", "mk-tilastot__kaikki", () =>
                    {
                        bool avataan = kaikki.Q<Label>()?.text == "kaupungit esiin";
                        Lomake.Nimi(kaikki, avataan ? "piilota kaupungit" : "kaupungit esiin");
                        AsetaManner(avataan);
                        if (avataan) foreach (var (r, kk, k) in kaupunkiKotelot) Vaihda(r, kk, k, true);
                    }, mYla);
                    kaikki.RegisterCallback<ClickEvent>(e => e.StopPropagation());
                    Kirjasimet.Aseta(kaikki, Kirjasin.Kone);
                }
            }
        }

        static Button RiviNappi(VisualElement isa, string taso)
        {
            var b = Rakenne.Nappi(null, "mk-tilastot__rivi mk-tilastot__rivi--" + taso, null, isa);
            return b;
        }

        static void Vaihda(Button maaRivi, VisualElement kotelo, List<Rivi> kaupungit, bool auki)
        {
            maaRivi.EnableInClassList("mk-auki", auki);
            if (auki && kotelo.childCount == 0)
                foreach (var k in Jarjesta(kaupungit))
                {
                    var r = Rakenne.El("mk-tilastot__rivi mk-tilastot__rivi--kaupunki", kotelo, PickingMode.Ignore);
                    string tuoreus = Tuoreus(k.Id);
                    var yla = Nimisolu(r, k.Nimi, "kaupunki", false, null, null);
                    if (tuoreus != null)
                    {
                        yla.parent.AddToClassList("mk-tilastot__nimi--tuore-" + tuoreus);
                        Tyohuone.Teksti(yla, tuoreValmis.TryGetValue(k.Id, out var v) && !string.IsNullOrEmpty(v) ? v : "työn alla", "mk-tilastot__tuoremerkki", Kirjasin.Kone);
                    }
                    foreach (var sa in sarakkeet)
                    {
                        if (sa.Taso == "maa") { Tyohuone.Teksti(r, "·", "mk-tilastot__num mk-tilastot__num--tyhja", Kirjasin.Kone); continue; }
                        var so = k.Solut.TryGetValue(sa.Avain, out var x) ? x : null;
                        Numero(r, so?.Pari, false, so?.Teksti, so?.Luku);
                    }
                }
            kotelo.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
        }

        // --- Luvut (web piirraLuvut, kokonaisluvut) --------------------------------------------------

        static void Luvut(VisualElement s)
        {
            var kaupungit = new HashSet<string>();
            var maat = new HashSet<string>();
            foreach (var m in mantereet)
                foreach (var maa in m.Lapset)
                {
                    if (!string.IsNullOrEmpty(maa.Iso)) maat.Add(maa.Iso);
                    foreach (var k in maa.Lapset) kaupungit.Add(k.Id);
                }
            Tyohuone.Teksti(s, $"{kaupungit.Count} eri kaupunkia {maat.Count} maassa seitsemällä mantereella. Rivit ovat suurin puute ensin: mitä "
                + "pidempi matka täyteen, sitä ylempänä. Luvut lasketaan samoista paketeista kuin taulu.", "mk-lehti__johdanto", Kirjasin.LukuKursiivi);
            Tyohuone.Teksti(s, "Luvut laskevat mannerrivit, joten porttikaupungit (Istanbul, Kairo, Teheran) ovat kokonaismäärissä kahdesti — ne "
                + "kuuluvat kahdelle laudalle. Kohderivit (Jutut, Miniat.) laskevat kohdekarttojen kohteita, eivät kaupunkeja.", "mk-tyohuone__huomio");
            var rivit = sarakkeet.Select(sa =>
            {
                int tehty = 0, kaikki = 0;
                foreach (var m in mantereet) if (m.Summa.TryGetValue(sa.Avain, out var p) && p != null) { tehty += p[0]; kaikki += p[1]; }
                return (sa, tehty, kaikki);
            }).OrderByDescending(x => x.kaikki - x.tehty).ToList();
            var taulu = Rakenne.El("mk-tilastot__taulu mk-tilastot__taulu--luvut", s, PickingMode.Ignore);
            var o = Rakenne.El("mk-tilastot__rivi mk-tilastot__rivi--otsikko", taulu, PickingMode.Ignore);
            foreach (var t in new[] { "OSA", "TEHTY", "PUUTTUU" }) Tyohuone.Teksti(o, t, t == "OSA" ? "mk-tilastot__nimi" : "mk-tilastot__num", Kirjasin.KoneLihava);
            foreach (var (sa, tehty, kaikki) in rivit)
            {
                var r = Rakenne.El("mk-tilastot__rivi", taulu, PickingMode.Ignore);
                var nimi = Rakenne.El("mk-tilastot__nimi", r, PickingMode.Ignore);
                Tyohuone.Teksti(nimi, sa.Otsikko, "mk-tilastot__nimiteksti", Kirjasin.LukuLihava);
                Tyohuone.Teksti(nimi, sa.Selite, "mk-tilastot__lisa");
                Numero(r, new[] { tehty, kaikki }, true);
                Tyohuone.Teksti(r, (kaikki - tehty).ToString(), "mk-tilastot__num", Kirjasin.Kone);
            }
        }

        // --- Kiintiöt (web piirraKiintiosivu, haeKiintiotila, piirraKiintiopalkit) --------------------

        const double R2Raja = 10.0 * 1024 * 1024 * 1024, RepoRajaKt = 1024 * 1024;
        static (long? RepoKt, long? PeiliTavut)? kiintiot; // muistetaan istunnon ajan (web kiintioTila)

        static void Kiintiot(VisualElement s)
        {
            Tyohuone.Teksti(s, "Tilankäyttö ja kuukausikiintiöt yhdellä silmäyksellä. Palkki on vihreä väljällä, keltainen kun rajasta on "
                + "käytetty 60 % ja punainen 85 %:sta ylöspäin.", "mk-lehti__johdanto", Kirjasin.LukuKursiivi);
            var kotelo = Rakenne.El("mk-tilastot__kiintiot", s, PickingMode.Ignore);
            Tyohuone.Teksti(s, "R2 on peiliämpärin koko (kuvat, liput, äänet, tekstit) ilmaistason 10 gigatavusta; Repo on GitHubin ilmoittama "
                + "repon koko suosituksen 1 gigatavusta. ElevenLabs ja Pöllö ovat kuukausikiintiöitä, OpenAI ja Google kuvageneroinnin kuluja; "
                + "ne tulevat pöllö-workerilta kehittäjäkoodilla, jota natiivissa ei ole, joten niiden palkit jäävät \"ei tietoa\" -palkeiksi. "
                + "Vastaus muistetaan istunnon ajan.", "mk-tyohuone__huomio");
            Palkit(kotelo, kiintiot);
            if (kiintiot == null) UiKerros.Hae().StartCoroutine(HaeKiintiot(() => { if (kotelo.panel != null) Palkit(kotelo, kiintiot); }));
        }

        static IEnumerator HaeKiintiot(Action valmis)
        {
            long? repo = null, peili = null;
            using (var r = UnityWebRequest.Get("https://api.github.com/repos/ravelius/Matkakirja"))
            {
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (r.result == UnityWebRequest.Result.Success)
                    try { repo = I(MiniJson.Kentta(Rakenne.Olio(MiniJson.Jasenna(r.downloadHandler.text)), "size")); } catch (FormatException) { }
            }
            using (var r = UnityWebRequest.Get(Aanet.Juuri + "manifesti.json"))
            {
                r.timeout = 20;
                r.SetRequestHeader("Cache-Control", "no-store");
                yield return r.SendWebRequest();
                if (r.result == UnityWebRequest.Result.Success)
                {
                    string teksti = r.downloadHandler.text;
                    long tavut = 0;
                    // Jäsennys taustasäikeessä: manifesti on iso.
                    var tehtava = System.Threading.Tasks.Task.Run(() =>
                    {
                        try
                        {
                            var m = Rakenne.Olio(MiniJson.Jasenna(teksti));
                            foreach (var laji in new[] { "kuvat", "liput", "aanet", "tekstit" })
                                foreach (var t in (Rakenne.Olio(MiniJson.Kentta(m, laji)) ?? new Dictionary<string, object>()).Values)
                                    if (MiniJson.Kentta(Rakenne.Olio(t), "koko") is double d) tavut += (long)d;
                        }
                        catch (FormatException) { tavut = -1; }
                    });
                    while (!tehtava.IsCompleted) yield return null;
                    if (tavut >= 0) peili = tavut;
                }
            }
            kiintiot = (repo, peili);
            valmis();
        }

        static void Palkit(VisualElement kotelo, (long? RepoKt, long? PeiliTavut)? d)
        {
            kotelo.Clear();
            string tyhja = d == null ? "haetaan…" : "ei tietoa";
            long? r2 = d?.PeiliTavut;
            string R2Arvo(long t) => t >= 1024L * 1024 * 1024 ? $"{(t / (1024.0 * 1024 * 1024)).ToString("0.0", CultureInfo.InvariantCulture)}/10 Gt" : $"{Math.Round(t / (1024.0 * 1024))} Mt/10 Gt";
            Palkki(kotelo, "R2", r2.HasValue ? r2.Value / R2Raja : (double?)null, r2.HasValue ? R2Arvo(r2.Value) : "", tyhja);
            long? repo = d?.RepoKt;
            Palkki(kotelo, "Repo", repo.HasValue ? repo.Value / RepoRajaKt : (double?)null, repo.HasValue ? $"{Math.Round(repo.Value / 1024.0)} Mt/1 Gt" : "", tyhja);
            foreach (var nimi in new[] { "ElevenLabs", "Pöllö/kk", "OpenAI/kk", "Google/kk" }) Palkki(kotelo, nimi, null, "", d == null ? tyhja : "ei tietoa");
        }

        static void Palkki(VisualElement isa, string nimi, double? osuus, string arvo, string tyhja)
        {
            var k = Rakenne.El("mk-tilastot__kiintio", isa, PickingMode.Ignore);
            var rivi = Rakenne.El("mk-tilastot__kiintiorivi", k, PickingMode.Ignore);
            Tyohuone.Teksti(rivi, nimi, "mk-tilastot__kiintionimi", Kirjasin.Kone);
            Tyohuone.Teksti(rivi, osuus.HasValue ? arvo : tyhja, "mk-tilastot__kiintioarvo", Kirjasin.Kone);
            var ura = Rakenne.El("mk-tilastot__kiintioura", k, PickingMode.Ignore);
            var tayte = Rakenne.El("mk-tilastot__kiintiotayte", ura, PickingMode.Ignore);
            if (!osuus.HasValue) { k.AddToClassList("mk-tilastot__kiintio--tyhja"); return; }
            double p = Math.Max(0, Math.Min(1, osuus.Value));
            tayte.AddToClassList(p >= 0.85 ? "mk-tilastot__kiintiotayte--punainen" : p >= 0.6 ? "mk-tilastot__kiintiotayte--keltainen" : "mk-tilastot__kiintiotayte--vihrea");
            tayte.style.width = Length.Percent((float)Math.Max(2, p * 100));
        }
    }
}
