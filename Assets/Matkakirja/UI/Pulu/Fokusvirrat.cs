// FOKUSVIRRAT: kaupungin saapumisvirran näyttödata (Natiivi-UI, erä 5).
//
// Siirtosepän kokoelma fokusvirrat (webin js/packs/fokusvirta-<kaupunki>.js):
//   matkakirja: paikkarivi, teksti, luentakuva, luentakuva2
//               kuva = {osoite|ampari|tiedosto, lyhyt, selite, lahde}
//   pollo:      kuvat[] (PuluCam), kommentti[] (Livian repliikit luennan jälkeen)
// Jäsennetään taustasäikeessä kerran (0,9 Mt), muistissa vain nämä kentät.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class VirtaKuva
    {
        /// <summary>https-osoite tai Commons-tiedostonimi (Kuvat.Hae hoitaa molemmat).</summary>
        public string Osoite, Lyhyt, Selite, Lahde;
    }

    public sealed class Saapumisvirta
    {
        public string Kaupunki, Paikkarivi, Teksti;
        public List<VirtaKuva> Luentakuvat = new List<VirtaKuva>();
        public List<VirtaKuva> PuluKuvat = new List<VirtaKuva>();
        public List<string> PuluKommentit = new List<string>();

        /// <summary>
        /// Paikkarivin jako (webin matkakirjanOtsikko): ensimmäisen vuosiluvun jälkeinen
        /// ". " erottaa otsikon ("Ateena, elokuussa 1873") ja tunnelman ("Pölyä ja puhetta kullasta.").
        /// </summary>
        public (string Otsikko, string Tunnelma) Otsikko()
        {
            if (string.IsNullOrEmpty(Paikkarivi)) return (null, null);
            var m = System.Text.RegularExpressions.Regex.Match(Paikkarivi, @"^(.*?\b\d{4})\.\s+(.*)$");
            return m.Success ? (m.Groups[1].Value, m.Groups[2].Value) : (Paikkarivi.TrimEnd('.'), null);
        }
    }

    public static class Fokusvirrat
    {
        static Dictionary<string, Saapumisvirta> virrat;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        public static Saapumisvirta Hae(string kaupunki) =>
            kaupunki != null && virrat != null && virrat.TryGetValue(kaupunki, out var v) ? v : null;

        public static void Lataa(Action valmis)
        {
            if (virrat != null) { valmis?.Invoke(); return; }
            if (valmis != null) odottajat.Add(valmis);
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Lue());
        }

        static IEnumerator Lue()
        {
            string teksti = null;
            yield return Sisalto.HaeTeksti("fokusvirrat", t => teksti = t, valinnainen: true);
            Task.Run(() =>
            {
                var t = new Dictionary<string, Saapumisvirta>();
                try { Jasenna(teksti, t); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui fokusvirrat: " + e.Message); }
                UiKerros.PaaSaikeessa(() =>
                {
                    virrat = t;
                    haussa = false;
                    var k = odottajat.ToArray();
                    odottajat.Clear();
                    foreach (var a in k) { try { a(); } catch (Exception e) { Debug.LogException(e); } }
                });
            });
        }

        static VirtaKuva Kuva(object o)
        {
            var d = MiniJson.Objekti(o);
            if (d == null) return null;
            var osoite = MiniJson.Teksti(d, "osoite") ?? MiniJson.Teksti(d, "tiedosto");
            var ampari = MiniJson.Teksti(d, "ampari");
            if (osoite == null && ampari != null) osoite = Kuvat.PeiliJuuri + "julisteet/" + ampari;
            if (osoite == null) return null;
            return new VirtaKuva
            {
                Osoite = osoite, Lyhyt = MiniJson.Teksti(d, "lyhyt"),
                Selite = MiniJson.Teksti(d, "selite"), Lahde = MiniJson.Teksti(d, "lahde"),
            };
        }

        static void Jasenna(string teksti, Dictionary<string, Saapumisvirta> t)
        {
            if (string.IsNullOrEmpty(teksti)) return;
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(teksti));
            var alkiot = MiniJson.Taulukko(MiniJson.Kentta(juuri, "alkiot"));
            if (alkiot == null) return;
            foreach (var a in alkiot)
            {
                var o = MiniJson.Objekti(a);
                var d = MiniJson.Objekti(MiniJson.Kentta(o, "data")) ?? o;
                string kaupunki = MiniJson.Teksti(o, "kaupunki") ?? MiniJson.Teksti(d, "kaupunki");
                if (kaupunki == null) continue;
                var v = new Saapumisvirta { Kaupunki = kaupunki };
                var m = MiniJson.Objekti(MiniJson.Kentta(d, "matkakirja"));
                if (m != null)
                {
                    v.Paikkarivi = MiniJson.Teksti(m, "paikkarivi");
                    v.Teksti = MiniJson.Teksti(m, "teksti");
                    foreach (var kentta in new[] { "luentakuva", "luentakuva2" })
                    {
                        var k = Kuva(MiniJson.Kentta(m, kentta));
                        if (k != null) v.Luentakuvat.Add(k);
                    }
                }
                var p = MiniJson.Objekti(MiniJson.Kentta(d, "pollo"));
                if (p != null)
                {
                    var kuvat = MiniJson.Taulukko(MiniJson.Kentta(p, "kuvat"));
                    if (kuvat != null) foreach (var k in kuvat) { var vk = Kuva(k); if (vk != null) v.PuluKuvat.Add(vk); }
                    var kommentit = MiniJson.Kentta(p, "kommentti");
                    if (kommentit is string yksi) v.PuluKommentit.Add(yksi);
                    else if (MiniJson.Taulukko(kommentit) is List<object> lista)
                        foreach (var r in lista) if (r is string s) v.PuluKommentit.Add(s);
                }
                t[kaupunki] = v;
            }
        }
    }
}
