// REAKTIOT (Natiivi-UI): webin js/reaktiot.js — kaksi kaiverrettua nappia sisällön kylkeen
// (omistajan tilaus 27.8.2026, uudistus 21.9.2026) ja css .reaktiorivi / .reaktio-*.
//
//   sydän        hyvä: yksi napautus kirjaa äänen 'ihana', toinen napautus peruu
//   peukku alas  huono: minipopup "Mikä oli vialla?" → Tylsä | Virhe tiedoissa | Muu
//                (Tylsä ja Muu = 'tylsa'; Virhe tiedoissa avaa virheilmoituksen, kerran per
//                sisältö per istunto): tekstikenttä, "Lähetä Livialle" / "Peru"; tyhjällä
//                kentällä Livia kysyy kerran tarkennusta, lähetyksen jälkeen Livian nolo kiitos
//                ja "Peru" → "Sulje".
// Oma ääni on laitteen muistissa (PlayerPrefs matkakirja-reaktioaanet, yksi per kohde, 500 kattona),
// luvut ovat kaikkien pelaajien yhteisiä: ehdotuskanavan worker (web EHDOTUS_OSOITE)
//   GET  /reaktiot?kohteet=…   laskurit kerran per kohde per istunto (verkko poikki = nollat)
//   POST /reaktio              {kohde, otsikko, symboli, edellinen} (tulessa-ja-unohda)
//   POST /laheta               virheilmoituksen vapaateksti (REAKTIO/VIRHE-etuliite; epäonnistunut
//                              jonoon matkakirja-reaktiojono, 40 kattona, puretaan rivin piirtyessä)
// Pyynnöt tunnistautuvat kuten pulun chat (x-matkakirja-natiivi + User-Agent, PuluChat.Pyynto).
//
// Kohdeavaimet (samat kuin webissä, jotta äänet ovat yhteisiä):
//   aihe:<kaupunki|ISO3>:<aihe>               lehden aihesivu (sivun loppu)
//   otsikko:<sivun avain>:<ankkuri>           noston loppurivi ja listaryhmän otsikko (OtsikkoAvain)
//   juttu:<kaupunki>:<nimi>                   nähtävyysjuttu
//   kohde:<id>                                kohdekortti (karttavalon nostokortti)
// Kuivaharjoitus (Kuiva = true, testikomento ui reaktio): napit, kysymys ja lomake toimivat, mutta
// verkkoon ei lähde mitään eikä mitään jonoteta; lähetys vain erillisellä komennolla
// (ui reaktio laheta …, TestiLahetys).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Reaktiot
    {
        /// <summary>Ehdotuskanavan worker (web js/ehdotukset.js EHDOTUS_OSOITE).</summary>
        public const string Osoite = "https://matkakirja-ehdotukset.samireivinen.workers.dev";

        /// <summary>Viisi vanhaa laskuria (web REAKTIO_SYMBOLIT); kaksi nappia kokoaa ne.</summary>
        public static readonly string[] Symbolit = { "hieno", "ihana", "mielenkiintoinen", "tylsa", "virhe" };
        static readonly string[] HyvaSymbolit = { "hieno", "ihana", "mielenkiintoinen" };
        static readonly string[] HuonoSymbolit = { "tylsa", "virhe" };
        public const string HyvaAani = "ihana", HuonoMuuAani = "tylsa";
        public const string VirheEtuliite = "REAKTIO/VIRHE";
        public const int TekstinKatto = 300;
        const int JononKatto = 40, AaniaKatto = 500;
        const string JonoAvain = "matkakirja-reaktiojono", AanetAvain = "matkakirja-reaktioaanet";

        // Web SYM_SYDAN ja SYM_PEUKKU (väliaikaiset viivaikonit, 24 × 24, pelkkä ääriviiva).
        internal const string SymSydan = "<path d=\"M12 20.2C12 20.2 3.8 15 3.8 9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 8.2 1.8c0 5.6-8.2 10.8-8.2 10.8z\"/>";
        internal const string SymPeukku = "<path d=\"M14.3 3.4H9.6a2 2 0 0 0-1.9 1.4L5.7 10.6a2 2 0 0 0 1.9 2.6h3.3l-1 5.2a1.7 1.7 0 0 0 3.1 1.3l3.5-5.7V5.2a1.8 1.8 0 0 0-1.8-1.8Z\"/>"
            + "<path d=\"M17.2 5.2h2.1a1.6 1.6 0 0 1 1.6 1.6v5.2a1.6 1.6 0 0 1-1.6 1.6h-2.1\"/>";

        // Web LIVIAN_KIITOKSET ja LIVIAN_JATKOKYSYMYS (Livian puhekieli, Raamattu v1270).
        internal static readonly string[] Kiitokset =
        {
            "Kiitos. Minä merkitsen tän ylös. — Livia katsoo hetken tosi tarkasti muualle.",
            "Ohhoh. No kiitos, nyt se virhe on ainakin matkalla oikeaan osoitteeseen. — Livia painottaa sanaa oikeaan.",
            "Kiitos. Ei tää muuten ollut minun vika. — Livia sanoo sen vähän liian nopeasti.",
        };
        internal const string Jatkokysymys = "Livia kallistaa päätään: no mikä kohta siinä "
            + "oli väärin? Yks rivi riittää — muuten minä en löydä sitä.";

        static readonly HashSet<string> ilmoitetut = new HashSet<string>();
        static readonly Dictionary<string, Dictionary<string, int>> valimuisti = new Dictionary<string, Dictionary<string, int>>();
        static readonly HashSet<string> haussa = new HashSet<string>();
        static bool purkaa;
        internal static readonly System.Random Arpa = new System.Random();

        // Turvalliset muunnokset (MiniJson.Objekti/Taulukko heittävät väärästä tyypistä).
        static Dictionary<string, object> Obj(object o) => o as Dictionary<string, object>;
        static List<object> Lista(object o) => o as List<object>;

        /// <summary>Kuivaharjoitus: ei verkkoa eikä jonoa (testikomento). Pelissä false.</summary>
        public static bool Kuiva;

        /// <summary>Viimeksi piirretty rivi (testikomento: ui reaktio huono | virhe).</summary>
        public static ReaktioRivi Viimeisin { get; private set; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            ilmoitetut.Clear(); valimuisti.Clear(); haussa.Clear();
            purkaa = false; Kuiva = false; Viimeisin = null;
        }

        // --- piirto ---------------------------------------------------------------------------

        /// <summary>Web piirraReaktiot: rivi isän loppuun (null, jos tunnistetta ei ole).</summary>
        public static ReaktioRivi Piirra(VisualElement isa, string tunniste, string otsikko = null, string luokka = null)
        {
            if (isa == null || string.IsNullOrEmpty(tunniste)) return null;
            // Odottavat virheilmoitukset pois alta aina kun rivi piirtyy (verkko on ehkä palannut).
            PuraJono();
            var r = new ReaktioRivi(tunniste, otsikko ?? "", luokka);
            isa.Add(r.Juuri);
            Viimeisin = r;
            return r;
        }

        /// <summary>Web piirraOtsikonReaktio: pieni rivi väliotsikon päähän.</summary>
        public static ReaktioRivi PiirraOtsikolle(VisualElement otsikkorivi, string sivunAvain, string otsikko) =>
            Piirra(otsikkorivi, OtsikkoAvain(sivunAvain, otsikko), otsikko, "mk-reaktiot--otsikko");

        // --- avaimet (web js/pollopoiminnat.js, js/reaktiot.js, js/fokuskohteet.js) ------------

        public static string AiheAvain(string omistaja, string aihe) =>
            string.IsNullOrEmpty(omistaja) || string.IsNullOrEmpty(aihe) ? null : $"aihe:{omistaja}:{aihe}";

        public static string JuttuAvain(string kaupunki, string nimi) =>
            string.IsNullOrEmpty(kaupunki) || string.IsNullOrEmpty(nimi) ? null : $"juttu:{kaupunki}:{nimi}";

        public static string KohdeAvain(string id) => string.IsNullOrEmpty(id) ? null : "kohde:" + id;

        /// <summary>Web otsikkoAvain: "otsikko:&lt;sivu&gt;:&lt;ankkuri&gt;", ankkuri pienaakkosin ilman diakriittejä.</summary>
        public static string OtsikkoAvain(string sivunAvain, string otsikko)
        {
            string sivu = (sivunAvain ?? "").Trim();
            var sb = new StringBuilder();
            foreach (var c in (otsikko ?? "").ToLowerInvariant().Normalize(NormalizationForm.FormD))
                if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark) sb.Append(c);
            string ankkuri = Regex.Replace(sb.ToString(), "[^a-z0-9]+", "-").Trim('-');
            if (ankkuri.Length > 60) ankkuri = ankkuri.Substring(0, 60);
            return sivu.Length == 0 || ankkuri.Length == 0 ? null : $"otsikko:{sivu}:{ankkuri}";
        }

        // --- ryhmät ja laskurit ---------------------------------------------------------------

        /// <summary>Web reaktioRyhma: "hyva" | "huono" | "".</summary>
        public static string Ryhma(string symboli) =>
            Array.IndexOf(HyvaSymbolit, symboli) >= 0 ? "hyva" : Array.IndexOf(HuonoSymbolit, symboli) >= 0 ? "huono" : "";

        public static int RyhmanAanet(Dictionary<string, int> aanet, string ryhma) =>
            (ryhma == "huono" ? HuonoSymbolit : HyvaSymbolit).Sum(s => aanet != null && aanet.TryGetValue(s, out var n) ? n : 0);

        public static Dictionary<string, int> Tyhjat() => Symbolit.ToDictionary(s => s, _ => 0);

        static Dictionary<string, int> Siivoa(object raaka)
        {
            var d = Obj(raaka);
            var a = Tyhjat();
            foreach (var s in Symbolit)
            {
                var n = d != null ? MiniJson.Luku(d, s) : null;
                if (n.HasValue && n.Value > 0 && !double.IsInfinity(n.Value)) a[s] = (int)Math.Floor(n.Value);
            }
            return a;
        }

        internal static Dictionary<string, int> Valimuistista(string avain) =>
            valimuisti.TryGetValue(avain, out var a) ? new Dictionary<string, int>(a) : null;

        internal static void Muista(string avain, Dictionary<string, int> aanet) => valimuisti[avain] = new Dictionary<string, int>(aanet);

        internal static bool Ilmoitettu(string avain) => ilmoitetut.Contains(avain);
        internal static void MerkitseIlmoitetuksi(string avain) => ilmoitetut.Add(avain);

        // --- laitteen oma ääni ----------------------------------------------------------------

        static Dictionary<string, object> LueOmat()
        {
            try { return Obj(MiniJson.Jasenna(PlayerPrefs.GetString(AanetAvain, "{}"))) ?? new Dictionary<string, object>(); }
            catch { return new Dictionary<string, object>(); }
        }

        /// <summary>Laitteen oma ääni kohteelle (tunnettu symboli) tai "".</summary>
        public static string OmaAani(string kohde) =>
            LueOmat().TryGetValue(kohde ?? "", out var v) && v is string s && Array.IndexOf(Symbolit, s) >= 0 ? s : "";

        /// <summary>Web asetaOmaAani: tyhjä symboli poistaa; palauttaa edellisen.</summary>
        internal static string AsetaOma(string kohde, string symboli)
        {
            var omat = LueOmat();
            string edellinen = omat.TryGetValue(kohde, out var v) && v is string s && Array.IndexOf(Symbolit, s) >= 0 ? s : "";
            if (!string.IsNullOrEmpty(symboli)) { omat.Remove(kohde); omat[kohde] = symboli; }
            else omat.Remove(kohde);
            var parit = omat.Where(kv => kv.Value is string).Select(kv => (kv.Key, (string)kv.Value)).ToList();
            if (parit.Count > AaniaKatto) parit = parit.Skip(parit.Count - AaniaKatto).ToList();
            PlayerPrefs.SetString(AanetAvain, "{" + string.Join(",", parit.Select(p => PeliApu.Json(p.Item1) + ":" + PeliApu.Json(p.Item2))) + "}");
            PlayerPrefs.Save();
            return edellinen;
        }

        // --- verkko ---------------------------------------------------------------------------

        static void Otsakkeet(UnityWebRequest r)
        {
            // Sama tunnistus kuin pulun chatilla (PuluChat.Pyynto, Puhe.cs).
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            r.timeout = 20;
        }

        static void Aja(IEnumerator e) => UiKerros.Hae().StartCoroutine(e);

        static void KuivaLoki(string mita) => Debug.Log("MATKAKIRJA reaktiot (kuiva, ei lähetetty): " + mita);

        /// <summary>Laskurit kohteelle kerran per istunto; verkkovirhe = ei muutosta (nollanäkymä jää).</summary>
        internal static void HaeLaskurit(string kohde, Action<Dictionary<string, int>> valmis)
        {
            if (valimuisti.ContainsKey(kohde) || haussa.Contains(kohde)) return;
            if (Kuiva) { KuivaLoki("GET /reaktiot " + kohde); return; }
            haussa.Add(kohde);
            Aja(Hae(kohde, valmis));
        }

        static IEnumerator Hae(string kohde, Action<Dictionary<string, int>> valmis)
        {
            using var r = UnityWebRequest.Get(Osoite + "/reaktiot?kohteet=" + Uri.EscapeDataString(kohde));
            Otsakkeet(r);
            yield return r.SendWebRequest();
            haussa.Remove(kohde);
            if (r.result != UnityWebRequest.Result.Success) yield break;
            Dictionary<string, object> data = null;
            try { data = Obj(MiniJson.Jasenna(r.downloadHandler.text)); } catch { }
            var kaikki = Obj(MiniJson.Kentta(data, "reaktiot"));
            if (data == null) yield break;
            var aanet = Siivoa(MiniJson.Kentta(kaikki, kohde));
            valimuisti[kohde] = aanet;
            valmis?.Invoke(new Dictionary<string, int>(aanet));
        }

        /// <summary>Web lahetaAani: yksi ääni jaettuun laskuriin (tulessa-ja-unohda); valmis(vahvistetut) tai ei kutsua.</summary>
        internal static void LahetaAani(string kohde, string symboli, string edellinen, string otsikko, Action<Dictionary<string, int>> valmis)
        {
            if (string.IsNullOrEmpty(kohde) || (string.IsNullOrEmpty(symboli) && string.IsNullOrEmpty(edellinen))) return;
            string runko = "{\"kohde\":" + PeliApu.Json(kohde) + ",\"otsikko\":" + PeliApu.Json(otsikko ?? "")
                + ",\"symboli\":" + (string.IsNullOrEmpty(symboli) ? "null" : PeliApu.Json(symboli))
                + ",\"edellinen\":" + (string.IsNullOrEmpty(edellinen) ? "null" : PeliApu.Json(edellinen)) + "}";
            if (Kuiva) { KuivaLoki("POST /reaktio " + runko); return; }
            Aja(PostaAani(runko, (ok, aanet) => { if (ok) valmis?.Invoke(aanet); }));
        }

        static IEnumerator PostaAani(string runko, Action<bool, Dictionary<string, int>> valmis, Action<long> tila = null)
        {
            using var r = new UnityWebRequest(Osoite + "/reaktio", "POST")
            {
                uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(runko)) { contentType = "application/json" },
                downloadHandler = new DownloadHandlerBuffer(),
            };
            r.SetRequestHeader("Content-Type", "application/json");
            Otsakkeet(r);
            yield return r.SendWebRequest();
            tila?.Invoke(r.responseCode);
            if (r.result != UnityWebRequest.Result.Success) { valmis(false, null); yield break; }
            Dictionary<string, object> data = null;
            try { data = Obj(MiniJson.Jasenna(r.downloadHandler.text)); } catch { }
            valmis(data != null, data != null ? Siivoa(MiniJson.Kentta(data, "aanet")) : null);
        }

        /// <summary>Web reaktionKuorma: ehdotuksen muotoinen kuorma (teksti, sivu, tarkenne).</summary>
        public static (string Teksti, string Sivu, string Tarkenne) Kuorma(string tunniste, string teksti, string otsikko)
        {
            string nimi = (otsikko ?? "").Trim(), kohde = (tunniste ?? "").Trim();
            string vapaa = (teksti ?? "").Trim();
            if (vapaa.Length > TekstinKatto) vapaa = vapaa.Substring(0, TekstinKatto);
            string versio = Application.version;
            var rivit = new List<string> { $"{VirheEtuliite}: {(nimi.Length > 0 ? nimi : kohde)}" };
            if (vapaa.Length > 0) { rivit.Add(""); rivit.Add(vapaa); }
            rivit.Add(""); rivit.Add("Sisältö: " + kohde);
            if (nimi.Length > 0) rivit.Add("Otsikko: " + nimi);
            if (!string.IsNullOrEmpty(versio)) rivit.Add("Versio: " + versio);
            return (string.Join("\n", rivit), kohde, $"{VirheEtuliite} · {(nimi.Length > 0 ? nimi : kohde)}");
        }

        /// <summary>Web lahetaReaktio: virheilmoitus tekstikanavaan; epäonnistunut jonoon (ei koskaan kaada peliä).</summary>
        internal static void LahetaVirhe(string tunniste, string teksti, string otsikko)
        {
            if (string.IsNullOrEmpty(tunniste)) return;
            var k = Kuorma(tunniste, teksti, otsikko);
            if (Kuiva) { KuivaLoki("POST /laheta " + k.Tarkenne + " | " + k.Teksti.Replace("\n", " / ")); return; }
            Aja(PostaEhdotus(k, ok => { if (!ok) Jonota(k); }));
        }

        static IEnumerator PostaEhdotus((string Teksti, string Sivu, string Tarkenne) k, Action<bool> valmis, Action<long> tila = null)
        {
            // Web lahetaEhdotus: samat kentät kuin lukijan ehdotuslomakkeella (worker lukee formDatan).
            var lomake = new WWWForm();
            lomake.AddField("laji", "");
            lomake.AddField("teksti", k.Teksti ?? "");
            lomake.AddField("sivu", k.Sivu ?? "");
            lomake.AddField("tarkenne", k.Tarkenne ?? "");
            lomake.AddField("nimimerkki", "");
            lomake.AddField("sahkoposti", "");
            lomake.AddField("saaKrediitteihin", "");
            lomake.AddField("lisenssivakuutus", "");
            lomake.AddField("hunaja", "");
            using var r = UnityWebRequest.Post(Osoite + "/laheta", lomake);
            Otsakkeet(r);
            yield return r.SendWebRequest();
            tila?.Invoke(r.responseCode);
            valmis(r.result == UnityWebRequest.Result.Success);
        }

        // --- jono -----------------------------------------------------------------------------

        static List<(string Teksti, string Sivu, string Tarkenne)> LueJono()
        {
            var l = new List<(string, string, string)>();
            try
            {
                foreach (var o in Lista(MiniJson.Jasenna(PlayerPrefs.GetString(JonoAvain, "[]"))) ?? new List<object>())
                {
                    var d = Obj(o);
                    if (MiniJson.Teksti(d, "teksti") is string t) l.Add((t, MiniJson.Teksti(d, "sivu") ?? "", MiniJson.Teksti(d, "tarkenne") ?? ""));
                }
            }
            catch { }
            return l;
        }

        static void KirjoitaJono(List<(string Teksti, string Sivu, string Tarkenne)> jono)
        {
            if (jono.Count > JononKatto) jono = jono.Skip(jono.Count - JononKatto).ToList();
            if (jono.Count == 0) PlayerPrefs.DeleteKey(JonoAvain);
            else PlayerPrefs.SetString(JonoAvain, "[" + string.Join(",", jono.Select(k =>
                "{\"teksti\":" + PeliApu.Json(k.Teksti) + ",\"sivu\":" + PeliApu.Json(k.Sivu) + ",\"tarkenne\":" + PeliApu.Json(k.Tarkenne) + "}")) + "]");
            PlayerPrefs.Save();
        }

        static void Jonota((string, string, string) k)
        {
            var jono = LueJono();
            jono.Add(k);
            KirjoitaJono(jono);
        }

        /// <summary>Jonossa odottavia virheilmoituksia (testikomennon tilaan).</summary>
        public static int Jonossa => LueJono().Count;

        /// <summary>Web puraReaktiojono: jono tyhjäksi ennen lähetystä, epäonnistuneet takaisin.</summary>
        static void PuraJono()
        {
            if (Kuiva || purkaa) return;
            var jono = LueJono();
            if (jono.Count == 0) return;
            KirjoitaJono(new List<(string, string, string)>());
            purkaa = true;
            Aja(Pura(jono));
        }

        static IEnumerator Pura(List<(string Teksti, string Sivu, string Tarkenne)> jono)
        {
            var jaljelle = new List<(string, string, string)>();
            foreach (var k in jono)
            {
                bool ok = false;
                yield return PostaEhdotus(k, t => ok = t);
                if (!ok) jaljelle.Add(k);
            }
            purkaa = false;
            if (jaljelle.Count > 0) { var nyt = LueJono(); nyt.AddRange(jaljelle); KirjoitaJono(nyt); }
        }

        // --- erillinen lähetyskomento (ui reaktio laheta …) ----------------------------------

        /// <summary>
        /// Testikomennon oikea lähetys (ohittaa Kuivan): laji "virhe" (arvo = vapaateksti) tai "aani"
        /// (arvo = symboli, tyhjä = peru oma). tulos saa HTTP-tilan tai virheen.
        /// </summary>
        public static string TestiLahetys(string laji, string kohde, string arvo, Action<string> tulos)
        {
            if (string.IsNullOrEmpty(kohde)) return "kohde puuttuu";
            if (laji == "virhe")
            {
                var k = Kuorma(kohde, arvo, null);
                Aja(PostaEhdotus(k, ok => tulos?.Invoke(ok ? "virheilmoitus lähti" : "virheilmoitus EI lähtenyt (ei jonoon)"),
                    koodi => tulos?.Invoke("POST /laheta HTTP " + koodi)));
                return null;
            }
            if (laji == "aani")
            {
                string symboli = string.IsNullOrEmpty(arvo) ? "" : arvo;
                if (symboli.Length > 0 && Array.IndexOf(Symbolit, symboli) < 0) return "tuntematon symboli " + symboli;
                string edellinen = AsetaOma(kohde, symboli);
                if (symboli.Length == 0 && edellinen.Length == 0) return "ei omaa ääntä peruttavaksi";
                string runko = "{\"kohde\":" + PeliApu.Json(kohde) + ",\"otsikko\":\"\",\"symboli\":" + (symboli.Length == 0 ? "null" : PeliApu.Json(symboli))
                    + ",\"edellinen\":" + (edellinen.Length == 0 ? "null" : PeliApu.Json(edellinen)) + "}";
                valimuisti.Remove(kohde);
                Aja(PostaAani(runko, (ok, aanet) => tulos?.Invoke(ok ? "ääni kirjattu: " + string.Join(" ", aanet.Select(kv => kv.Key + "=" + kv.Value)) : "ääni EI mennyt perille"),
                    koodi => tulos?.Invoke("POST /reaktio HTTP " + koodi)));
                return null;
            }
            return "ui reaktio laheta virhe|aani <kohde> [teksti|symboli]";
        }
    }

    /// <summary>Yksi reaktiorivi (web piirraReaktiot): sydän, peukku alas ja kuittaus.</summary>
    public sealed class ReaktioRivi
    {
        const long KuittausMs = 2600;

        public readonly VisualElement Juuri;
        readonly string avain, otsikko;
        readonly Button hyva, huono;
        readonly Label hyvaLuku, huonoLuku, kuittaus;
        Dictionary<string, int> aanet;
        string oma;
        IVisualElementScheduledItem kuittausAjastin;

        public string Avain => avain;

        internal ReaktioRivi(string avain, string otsikko, string luokka)
        {
            this.avain = avain;
            this.otsikko = otsikko;
            Juuri = Rakenne.El("mk-reaktiot", null, PickingMode.Ignore);
            Rakenne.Luokat(Juuri, luokka);
            aanet = Reaktiot.Valimuistista(avain) ?? Reaktiot.Tyhjat();
            oma = Reaktiot.OmaAani(avain);

            hyva = Rakenne.Nappi(null, "mk-reaktionappi mk-reaktionappi--hyva", () =>
                // Oma ääni jo hyvä-ryhmässä: sama ele antaa ja ottaa.
                Aanesta(Reaktiot.Ryhma(oma) == "hyva" ? "" : Reaktiot.HyvaAani), Juuri, Reaktiot.SymSydan);
            hyvaLuku = Rakenne.Teksti("", "mk-reaktiot__luku", hyva);
            huono = Rakenne.Nappi(null, "mk-reaktionappi mk-reaktionappi--huono", () =>
            {
                if (Reaktiot.Ryhma(oma) == "huono") { Aanesta(""); return; }
                AvaaKysymys();
            }, Juuri, Reaktiot.SymPeukku);
            huonoLuku = Rakenne.Teksti("", "mk-reaktiot__luku", huono);
            kuittaus = Rakenne.Teksti("", "mk-reaktiot__kuittaus", Juuri);
            Kirjasimet.Aseta(Juuri, Kirjasin.Kone);
            Paivita();
            Reaktiot.HaeLaskurit(avain, vahvistetut => { aanet = vahvistetut; Paivita(); });
        }

        void Paivita()
        {
            int h = Reaktiot.RyhmanAanet(aanet, "hyva"), p = Reaktiot.RyhmanAanet(aanet, "huono");
            string ryhma = Reaktiot.Ryhma(oma);
            string nimi = otsikko.Length > 0 ? " — " + otsikko : "";
            hyvaLuku.text = h > 0 ? h.ToString() : "";
            hyvaLuku.style.display = h > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            hyva.EnableInClassList("mk-reaktionappi--oma", ryhma == "hyva");
            hyva.tooltip = "Hyvä" + nimi + (h > 0 ? $", {h} {(h == 1 ? "ääni" : "ääntä")}" : "");
            huonoLuku.text = p > 0 ? p.ToString() : "";
            huonoLuku.style.display = p > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            huono.EnableInClassList("mk-reaktionappi--oma", ryhma == "huono");
            huono.tooltip = "Huono" + nimi + (p > 0 ? $", {p} {(p == 1 ? "ääni" : "ääntä")}" : "");
        }

        void Sano(string teksti, bool pysyva = false)
        {
            if (Juuri.ClassListContains("mk-reaktiot--otsikko")) return; // web: otsikon rivillä ei kuittausta
            kuittaus.text = teksti ?? "";
            kuittaus.style.display = string.IsNullOrEmpty(teksti) ? DisplayStyle.None : DisplayStyle.Flex;
            kuittausAjastin?.Pause();
            if (!pysyva && !string.IsNullOrEmpty(teksti))
                kuittausAjastin = kuittaus.schedule.Execute(() => { kuittaus.text = ""; kuittaus.style.display = DisplayStyle.None; }).StartingIn(KuittausMs);
        }

        /// <summary>Web aanestaSymboli: optimistinen päivitys heti, palvelimen vastaus korjaa.</summary>
        void Aanesta(string uusi)
        {
            string edellinen = oma;
            if (edellinen == uusi) return;
            if (!string.IsNullOrEmpty(edellinen) && aanet.TryGetValue(edellinen, out var e) && e > 0) aanet[edellinen] = e - 1;
            if (!string.IsNullOrEmpty(uusi)) aanet[uusi] = (aanet.TryGetValue(uusi, out var n) ? n : 0) + 1;
            oma = uusi;
            Reaktiot.AsetaOma(avain, uusi);
            Reaktiot.Muista(avain, aanet);
            Paivita();
            if (!string.IsNullOrEmpty(uusi) && !LinssiUi.VahennettyLiike())
            {
                // Web reaktio-poks: ikoni pullahtaa (1,28 ja −8°) ja palaa.
                var nappi = Reaktiot.Ryhma(uusi) == "huono" ? huono : hyva;
                nappi.AddToClassList("mk-reaktionappi--poks");
                nappi.schedule.Execute(() => nappi.RemoveFromClassList("mk-reaktionappi--poks")).StartingIn(190);
            }
            Reaktiot.LahetaAani(avain, uusi, edellinen, otsikko, vahvistetut =>
            {
                aanet = vahvistetut;
                Reaktiot.Muista(avain, aanet);
                Paivita();
            });
        }

        /// <summary>Peukku alas: "Mikä oli vialla?" (web avaaKysymys).</summary>
        public void AvaaKysymys()
        {
            Minipopup m = null;
            m = Minipopup.Avaa(otsikko.Length > 0 ? "Mikä oli vialla? — " + otsikko : "Mikä oli vialla?", s =>
            {
                Kirjasimet.Aseta(Rakenne.Teksti("Mikä oli vialla?", "mk-reaktio__ohje", s), Kirjasin.Luku);
                void Vaihtoehto(string teksti, Action a)
                {
                    var b = Rakenne.Nappi(teksti, "mk-reaktio__vaihtoehto", () => { m?.Sulje(); a(); }, s);
                    Kirjasimet.Aseta(b, Kirjasin.Luku);
                }
                Vaihtoehto("Tylsä", () => Aanesta(Reaktiot.HuonoMuuAani));
                Vaihtoehto("Virhe tiedoissa", () =>
                {
                    // Kenttä ei aukea toista kertaa samalle sisällölle, mutta ääni kirjautuu silti.
                    if (Reaktiot.Ilmoitettu(avain) || oma == "virhe") { Aanesta("virhe"); return; }
                    AvaaVirheikkuna();
                });
                Vaihtoehto("Muu", () => Aanesta(Reaktiot.HuonoMuuAani));
            }, "mk-minipopup--reaktio-kysymys", UiKerros.Traileri);
        }

        /// <summary>Virheilmoitus: tekstikenttä, "Lähetä Livialle" / "Peru" (web avaaVirheikkuna).</summary>
        public void AvaaVirheikkuna()
        {
            TextField kentta = null;
            Minipopup m = null;
            m = Minipopup.Avaa(otsikko.Length > 0 ? "Virheilmoitus — " + otsikko : "Virheilmoitus", s =>
            {
                Kirjasimet.Aseta(Rakenne.Teksti("Mikä tässä on väärin? Kirjoita lyhyesti — vuosiluku, nimi, "
                    + "paikka tai mikä tahansa, mikä ei täsmää.", "mk-reaktio__ohje", s), Kirjasin.Luku);
                kentta = new TextField { multiline = true, maxLength = Reaktiot.TekstinKatto };
                kentta.AddToClassList("mk-reaktio__kentta");
                kentta.textEdition.placeholder = "Esimerkiksi: silta valmistui 1894, ei 1849.";
                kentta.tooltip = "Virheen kuvaus";
                Kirjasimet.Aseta(kentta, Kirjasin.Luku);
                s.Add(kentta);
                var livia = Rakenne.Teksti("", "mk-reaktio__livia", s);
                Kirjasimet.Aseta(livia, Kirjasin.LukuKursiivi);
                livia.style.display = DisplayStyle.None;
                var napit = Rakenne.El("mk-reaktio__napit", s, PickingMode.Ignore);
                Button laheta = null, peru = null;
                bool kysytty = false;
                laheta = Rakenne.Nappi("Lähetä Livialle", "mk-reaktio__nappi", () =>
                {
                    string teksti = (kentta.value ?? "").Trim();
                    // Jatkokysymys kerran: toinen tyhjä lähetys lähtee sellaisenaan.
                    if (teksti.Length == 0 && !kysytty)
                    {
                        kysytty = true;
                        livia.text = Reaktiot.Jatkokysymys;
                        livia.style.display = DisplayStyle.Flex;
                        kentta.Focus();
                        return;
                    }
                    Reaktiot.MerkitseIlmoitetuksi(avain);
                    // Tahra on ääni siinä missä muutkin: sama polku, samat laskurit.
                    if (oma != "virhe") Aanesta("virhe"); else Paivita();
                    Reaktiot.LahetaVirhe(avain, teksti, otsikko);
                    livia.text = Reaktiot.Kiitokset[Reaktiot.Arpa.Next(Reaktiot.Kiitokset.Length)];
                    livia.style.display = DisplayStyle.Flex;
                    kentta.SetEnabled(false);
                    laheta.SetEnabled(false);
                    var pt = peru.Q<Label>(className: "mk-nappi__teksti");
                    if (pt != null) pt.text = "Sulje";
                    Sano("Kiitos — ilmoitus lähti.", true);
                }, napit);
                peru = Rakenne.Nappi("Peru", "mk-reaktio__nappi", () => m?.Sulje(), napit);
                Kirjasimet.Aseta(napit, Kirjasin.Luku);
            }, "mk-minipopup--reaktio", UiKerros.Traileri);
            kentta?.schedule.Execute(() => kentta.Focus()).StartingIn(50);
        }
    }
}
