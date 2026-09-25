// KOHDEKARTAT (Natiivi-UI): kaupunkien nähtävyyskartat sisältöpaketista (skeema 1.17 kokoelma
// kohdekartat, Siirtoseppä 23.9.2026) ja nähtävyysjutut (kokoelma nahtavyydet, liitos kaupunki +
// nimi), miniatyyripiirrokset (kokoelma miniatyyrit). Web: js/nahtavyydet.js KAUPUNKIKARTAT,
// NAHTAVYYSJUTUT, MINIATYYRIT; speksi docs/raportit/natiivi-ui-nahtavyydet-opas-speksi-20260923.md.
//
// Kohteen x/y ovat prosentteja kuvasta (pelin karttapiste()). Kun piirtoRajat on annettu, kuva on
// ydinrajausta (rajat) laajempi: Ydin kertoo ydinalueen suorakulmion kuvan osuuksina 0–1, ja
// levossa näytetään vain se (web ydinAla / lava).
//
// Skeema 1.24: kohteen linkit [{tunnus, laji, aihe, kategoria, nimi}] (laji fokuskohde | skandaalit |
// historianHetket | syvennys | takynosto | maalehtinosto) ja aihe = ensimmäisen linkin aihe (sama kaava
// kuin webin kaupunkiliuskassa: kohteenKategoria → nostosymPaakategoria). Vanhassa paketissa vain nosto.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class KohdekarttaKohde
    {
        public string Nimi, Wiki, Nosto, NimiPuoli, Aika;
        /// <summary>Kaikki nostolinkit (web nosto: tunnus tai taulukko); Nosto = ensimmäinen.</summary>
        public List<string> Nostot = new List<string>();
        /// <summary>Nostolinkit tyypitettyinä (skeema 1.24; tyhjä vanhassa paketissa).</summary>
        public List<KohdeLinkki> Linkit = new List<KohdeLinkki>();
        /// <summary>Kohteen aihe (karttaselitteen aihe, esim. "historia"), tai null.</summary>
        public string Aihe;
        /// <summary>Paikka prosentteina kuvasta (0–100).</summary>
        public float X, Y;
        /// <summary>Kyltin siirto pikseleinä (web siirto {x, y}), tai nolla.</summary>
        public Vector2 Siirto;
        /// <summary>Järjestysnumero kartalla (1…); web "Kohde n".</summary>
        public int Numero;
        /// <summary>Miniatyyripiirroksen osoite (läpinäkyvä webp) tai null.</summary>
        public string Piirros;
        /// <summary>Nähtävyysjuttu (teksti ja kuvat) tai null (pelkkä wiki-kohde).</summary>
        public NahtavyysKohde Juttu;
        /// <summary>Selattava (web): juttu, jossa on teksti ja vähintään yksi kuva.</summary>
        public bool Selattava => Juttu != null && !string.IsNullOrEmpty(Juttu.Teksti) && Juttu.Kuvat.Count > 0;
        /// <summary>Avattava ☰-valikosta: teksti tai wiki.</summary>
        public bool Avattava => (Juttu != null && !string.IsNullOrEmpty(Juttu.Teksti)) || !string.IsNullOrEmpty(Wiki);
    }

    /// <summary>Kohdekartan kohteen nostolinkki (skeema 1.24 kohteet[].linkit[]).</summary>
    public sealed class KohdeLinkki
    {
        /// <summary>Webin noston tunnus ("syvennys-amsterdam-haikarat", "nosto-…", "skandaali-…", "hetki-…", kohteen id).</summary>
        public string Tunnus, Laji, Aihe, Kategoria, Nimi;
    }

    public sealed class Kohdekartta
    {
        public string Kaupunki, KuvaUrl, Lahde, Esittely;
        public int Leveys, Korkeus;
        /// <summary>Ydinalue kuvan osuuksina (x, y, leveys, korkeus 0–1); koko kuva, jos piirtoRajoja ei ole.</summary>
        public Rect Ydin = new Rect(0, 0, 1, 1);
        /// <summary>Numeroympyräkartta (web numeroympyrat: luxemburg, bryssel, ljubljana, kosice, valletta).</summary>
        public bool Numeroympyrat;
        public List<KohdekarttaKohde> Kohteet = new List<KohdekarttaKohde>();
        /// <summary>Mittakaavajanan leveys osuutena koko kuvan leveydestä (0–1), tai 0 (ei janaa); JanaTeksti "500 m".</summary>
        public float JanaOsuus;
        public string JanaTeksti;
        public float Suhde => Leveys > 0 && Korkeus > 0 ? (float)Korkeus / Leveys : 1f;
    }

    public static class Kohdekartat
    {
        static Dictionary<string, Kohdekartta> kartat;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        /// <summary>Onko kokoelmat ladattu (myös epäonnistunut lataus = tyhjä).</summary>
        public static bool Ladattu => kartat != null;

        /// <summary>Kaikki kohdekartat (tyhjä, kunnes ladattu).</summary>
        public static IEnumerable<Kohdekartta> Kaikki => kartat != null ? kartat.Values : Enumerable.Empty<Kohdekartta>();

        /// <summary>Onko kaupungilla kohdekartta (false, kunnes ladattu).</summary>
        public static bool On(string kaupunki) => kartat != null && kaupunki != null && kartat.ContainsKey(kaupunki);

        /// <summary>Kaupungin kohdekartta (null = ei karttaa). Lataa kokoelmat kerran taustasäikeessä.</summary>
        public static void Hae(string kaupunki, Action<Kohdekartta> valmis)
        {
            Kohdekartta Tulos() => kaupunki != null && kartat != null && kartat.TryGetValue(kaupunki, out var k) ? k : null;
            if (kartat != null) { valmis?.Invoke(Tulos()); return; }
            odottajat.Add(() => valmis?.Invoke(Tulos()));
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Lataa());
        }

        static IEnumerator Lataa()
        {
            string kk = null, na = null, mi = null;
            yield return Sisalto.HaeTeksti("kohdekartat", t => kk = t, valinnainen: true);
            yield return Sisalto.HaeTeksti("nahtavyydet", t => na = t, valinnainen: true);
            yield return Sisalto.HaeTeksti("miniatyyrit", t => mi = t, valinnainen: true);
            Dictionary<string, Kohdekartta> tulos = null;
            var tehtava = Task.Run(() =>
            {
                try { tulos = Jasenna(kk, na, mi); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui kohdekartat: " + e.Message); }
            });
            while (!tehtava.IsCompleted) yield return null;
            kartat = tulos ?? new Dictionary<string, Kohdekartta>();
            haussa = false;
            var kutsut = odottajat.ToArray();
            odottajat.Clear();
            foreach (var k in kutsut) { try { k(); } catch (Exception e) { Debug.LogException(e); } }
        }

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static string T(Dictionary<string, object> o, string k) => MiniJson.Teksti(o, k);
        static IEnumerable<Dictionary<string, object>> Alkiot(string json) =>
            (Rakenne.Lista(MiniJson.Kentta(Ob(MiniJson.Jasenna(json ?? "{}")), "alkiot")) ?? new List<object>()).Select(Ob).Where(x => x != null);

        static string MiniatyyriOsoite(string polku)
        {
            if (polku.StartsWith("http")) return polku;
            string nimi = polku.Substring(polku.LastIndexOf('/') + 1);
            if (nimi.IndexOf('.') < 0) nimi += ".png";
            return Aanet.Juuri + "kohtaamiset/miniatyyrit/" + nimi;
        }

        static Dictionary<string, Kohdekartta> Jasenna(string kohdekartat, string nahtavyydet, string miniatyyrit)
        {
            // Nähtävyysjutut: "kaupunki:nimi" → data {aika, teksti, kuvat, lainaus, lahde, wiki}.
            var jutut = new Dictionary<string, NahtavyysKohde>();
            foreach (var a in Alkiot(nahtavyydet))
            {
                // Päätaso ensin (skeema 1.26: aika, teksti, kuvat[url], lainaus, lahde, wiki), raaka data vain Paatason kautta.
                var d = Paataso.Nakyma(a, JutunKentat);
                string kaupunki = T(a, "kaupunki"), nimi = T(a, "nimi");
                if (kaupunki == null || nimi == null || (T(d, "teksti") == null && MiniJson.Kentta(d, "kuvat") == null)) continue;
                jutut[kaupunki + ":" + nimi] = Juttu(nimi, d);
            }
            var piirrokset = new Dictionary<string, string>();
            foreach (var a in Alkiot(miniatyyrit))
            {
                // Skeema 1.18: kuva.url on valmis osoite. Vanhemmassa paketissa data on polku
                // ("assets/kartat/miniatyyrit/x.webp") tai pelkkä tunnus ("denver-…"); molemmat ovat
                // ämpärissä kansiossa kohtaamiset/miniatyyrit/ (pelin assetOsoite, tunnukselle .png).
                string kaupunki = T(a, "kaupunki"), nimi = T(a, "nimi");
                var raaka = Paataso.RaakaArvo(a);
                string polku = T(Ob(MiniJson.Kentta(a, "kuva")), "url") ?? raaka as string ?? T(Ob(raaka), "url");
                if (kaupunki != null && nimi != null && polku != null)
                    piirrokset[kaupunki + ":" + nimi] = MiniatyyriOsoite(polku);
            }
            var t = new Dictionary<string, Kohdekartta>();
            foreach (var a in Alkiot(kohdekartat))
            {
                string id = T(a, "kaupunki") ?? T(a, "id");
                var kuva = Ob(MiniJson.Kentta(a, "kuva"));
                if (id == null || kuva == null) continue;
                var k = new Kohdekartta
                {
                    Kaupunki = id, KuvaUrl = T(kuva, "url"), Lahde = T(a, "lahde"), Esittely = T(a, "esittely"),
                    Leveys = (int)(MiniJson.Luku(kuva, "leveys") ?? 0), Korkeus = (int)(MiniJson.Luku(kuva, "korkeus") ?? 0),
                    Numeroympyrat = Rakenne.Lista(MiniJson.Kentta(a, "numeroympyrat")) is List<object> ny && ny.Count > 0,
                };
                var rajat = Ob(MiniJson.Kentta(a, "rajat"));
                var piirto = Ob(MiniJson.Kentta(a, "piirtoRajat"));
                if (rajat != null && T(a, "projektio") != "laea") Mittakaava(k, rajat, piirto ?? rajat);
                if (rajat != null && piirto != null)
                {
                    double L(Dictionary<string, object> o, string n) => MiniJson.Luku(o, n) ?? 0;
                    double pw = L(piirto, "ita") - L(piirto, "lansi"), ph = L(piirto, "pohjoinen") - L(piirto, "etela");
                    if (pw > 0 && ph > 0)
                    {
                        float x0 = (float)((L(rajat, "lansi") - L(piirto, "lansi")) / pw);
                        float x1 = (float)((L(rajat, "ita") - L(piirto, "lansi")) / pw);
                        float y0 = (float)((L(piirto, "pohjoinen") - L(rajat, "pohjoinen")) / ph);
                        float y1 = (float)((L(piirto, "pohjoinen") - L(rajat, "etela")) / ph);
                        k.Ydin = Rect.MinMaxRect(Mathf.Clamp01(x0), Mathf.Clamp01(y0), Mathf.Clamp01(x1), Mathf.Clamp01(y1));
                    }
                }
                int numero = 0;
                foreach (var o in (Rakenne.Lista(MiniJson.Kentta(a, "kohteet")) ?? new List<object>()).Select(Ob).Where(x => x != null))
                {
                    string nimi = T(o, "nimi");
                    if (nimi == null || !(MiniJson.Luku(o, "x") is double x) || !(MiniJson.Luku(o, "y") is double y)) continue;
                    var siirto = Ob(MiniJson.Kentta(o, "siirto"));
                    var kohde = new KohdekarttaKohde
                    {
                        Nimi = nimi, Wiki = T(o, "wiki"), NimiPuoli = T(o, "nimiPuoli"), Aika = T(o, "aika"),
                        X = (float)x, Y = (float)y, Numero = ++numero,
                        Siirto = siirto != null ? new Vector2((float)(MiniJson.Luku(siirto, "x") ?? 0), (float)(MiniJson.Luku(siirto, "y") ?? 0)) : Vector2.zero,
                    };
                    // Nostolinkki on tunnus tai taulukko (Tuileriain rauniot: syvennys + tuileries).
                    var linkki = MiniJson.Kentta(o, "nosto");
                    if (linkki is string ls && ls.Length > 0) kohde.Nostot.Add(ls);
                    else foreach (var osa in Rakenne.Lista(linkki) ?? new List<object>()) if (osa is string xs && xs.Length > 0) kohde.Nostot.Add(xs);
                    kohde.Nosto = kohde.Nostot.Count > 0 ? kohde.Nostot[0] : null;
                    foreach (var l in (Rakenne.Lista(MiniJson.Kentta(o, "linkit")) ?? new List<object>()).Select(Ob).Where(x => x != null))
                        if (T(l, "tunnus") is string tunnus)
                            kohde.Linkit.Add(new KohdeLinkki { Tunnus = tunnus, Laji = T(l, "laji"), Aihe = T(l, "aihe"), Kategoria = T(l, "kategoria"), Nimi = T(l, "nimi") });
                    kohde.Aihe = T(o, "aihe") ?? kohde.Linkit.Select(x => x.Aihe).FirstOrDefault(x => !string.IsNullOrEmpty(x));
                    string avain = id + ":" + nimi;
                    piirrokset.TryGetValue(avain, out kohde.Piirros);
                    // Juttu: kohteen oma teksti (1.17) tai nähtävyyskokoelman juttu samalla nimellä.
                    if (!string.IsNullOrEmpty(T(o, "teksti"))) kohde.Juttu = Juttu(nimi, o);
                    else if (jutut.TryGetValue(avain, out var j)) kohde.Juttu = j;
                    if (kohde.Juttu != null && string.IsNullOrEmpty(kohde.Juttu.Aika)) kohde.Juttu.Aika = kohde.Aika;
                    k.Kohteet.Add(kohde);
                }
                t[id] = k;
            }
            return t;
        }

        static readonly IReadOnlyList<(string Uusi, string Vanha)> JutunKentat = Paataso.Samat("aika", "teksti", "kuvat", "lainaus", "lahde", "wiki");

        static NahtavyysKohde Juttu(string nimi, Dictionary<string, object> d)
        {
            var j = new NahtavyysKohde
            {
                Nimi = nimi, Aika = T(d, "aika"), Teksti = T(d, "teksti"), Wiki = T(d, "wiki"), Lahde = T(d, "lahde"),
            };
            var lainaus = Ob(MiniJson.Kentta(d, "lainaus"));
            if (lainaus != null) { j.LainausTeksti = T(lainaus, "teksti"); j.LainausLahde = T(lainaus, "lahde"); }
            foreach (var k in (Rakenne.Lista(MiniJson.Kentta(d, "kuvat")) ?? new List<object>()).Select(Ob).Where(x => x != null))
            {
                string lahde = T(k, "url") ?? T(k, "tiedosto") ?? T(k, "osoite") ?? T(k, "arvo");
                if (string.IsNullOrEmpty(lahde)) continue;
                j.Kuvat.Add(new LehtiKuva
                {
                    Lahde = lahde, Lyhyt = T(k, "lyhyt") ?? T(k, "selite"), Selite = T(k, "selite") ?? T(k, "lyhyt"), LahdeRivi = T(k, "lahde"),
                });
            }
            return j;
        }

        // Web js/packs/maakartat.js mittakaava(): pituus vakiosarjasta, tavoite neljäsosa ydinrajauksen leveydestä,
        // osuus koko piirretystä kuvasta; kilometrit rajauksen keskileveydellä. Laea-kartoille ei janaa.
        static readonly int[] JananPituudet = { 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000 };

        static void Mittakaava(Kohdekartta k, Dictionary<string, object> rajat, Dictionary<string, object> piirto)
        {
            double L(Dictionary<string, object> o, string n) => MiniJson.Luku(o, n) ?? double.NaN;
            double kosini = Math.Cos((L(rajat, "pohjoinen") + L(rajat, "etela")) / 2 * Math.PI / 180);
            double metria = (L(piirto, "ita") - L(piirto, "lansi")) * 111320 * kosini;
            double ydinMetria = (L(rajat, "ita") - L(rajat, "lansi")) * 111320 * kosini;
            if (double.IsNaN(metria) || metria <= 0 || double.IsNaN(ydinMetria)) return;
            double tavoite = ydinMetria * 0.25;
            int paras = JananPituudet[0];
            foreach (int p in JananPituudet) if (Math.Abs(p - tavoite) < Math.Abs(paras - tavoite)) paras = p;
            k.JanaOsuus = (float)(paras / metria);
            k.JanaTeksti = paras < 1000 ? paras + " m" : (paras / 1000.0).ToString(System.Globalization.CultureInfo.InvariantCulture).Replace('.', ',') + " km";
        }
    }
}
