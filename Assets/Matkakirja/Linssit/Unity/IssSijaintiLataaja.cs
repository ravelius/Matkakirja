// ISS-OHJAAMON LCD:N PAIKKADATA (omistaja 4.10.2026 "ISS-OHJAAMO UUSIKSI": nykyinen sijainti olemassa olevasta paikkadatasta).
// Kokoaa Iss.IssSijainti.Nykyinen-aineiston kerran (LinssiOhjain.LataaAstronautti): maat ja niiden suomenkieliset nimet
// (LinssiOhjain.MaatAineisto + MaaOsuma), kaupungit (KaupunkiMerkit; tyyppi vuoristo → vuoret, meri → meret), meret ja
// valtameret (Nimikerros: aluenimet luokat meri / valtameri) sekä vuoristot (kokoelma maastonimet, laji vuori).
// Puuttuva osa ei estä muita (esim. ilman maastonimiä vuoria ei ole).
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Iss;
using Matkakirja.Linssit.Maat;
using System.Globalization;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class IssSijaintiLataaja
    {
        static bool kaynnissa;

        public static IEnumerator Lataa()
        {
            if (IssSijainti.Nykyinen != null || kaynnissa) yield break;
            kaynnissa = true;
            var a = new IssSijainti.Aineisto();
            for (float t = 0; LinssiOhjain.MaatAineisto == null && t < 20f; t += Time.unscaledDeltaTime) yield return null;
            if (LinssiOhjain.MaatAineisto != null)
            {
                var osuma = new MaaOsuma(LinssiOhjain.MaatAineisto);
                a.Maa = (lat, lon) => { var m = osuma.HaeMaa(lat, lon, 0.3); return m == null ? ((string, string)?)null : (m.Id, m.Nimi); };
                var maat = LinssiOhjain.MaatAineisto.Maat;
                a.MaanNimi = iso => iso != null && maat.TryGetValue(iso, out var mm) ? mm.Nimi : null;
            }
            for (float t = 0; KarttaKerrokset.Instanssi?.merkit == null && t < 20f; t += Time.unscaledDeltaTime) yield return null;
            var merkit = KarttaKerrokset.Instanssi?.merkit;
            if (merkit != null)
                foreach (var k in merkit.Kaupungit())
                {
                    if (k == null || string.IsNullOrEmpty(k.nimi)) continue;
                    var p = new IssSijainti.Paikka(k.nimi, k.lat, k.lon, k.maa, Math.Max(0, k.tarkeys));
                    if (k.tyyppi == "vuoristo") a.Vuoret.Add(p);
                    else if (k.tyyppi == "meri") a.Meret.Add(p);
                    else if (k.tyyppi == "aavikko") a.Vuoret.Add(p);   // maastokohde kuten vuoristo (Sahara)
                    else a.Kaupungit.Add(p);
                }
            // Natural Earthin asutut paikat (PD, ~7 300; tyokalut/iss_paikat.py): LCD:n tarkka kaupunki ≤ 40 km (Päätoimittaja 4.10.).
            var paikatTeksti = Resources.Load<TextAsset>("IssPaikat/paikat");
            // Ajantasaiset suomenkieliset nimet (Päätoimittaja 7.10.: LCD:ssä "ILLICHIVSK", nimi Tšornomorsk vuodesta 2016; kartta elää
            // nykyajassa): Resources/IssPaikat/nimet-fi.json "nimi|ISO3" → nimi (Wikidata fi, SFS 4900); vain LCD, ei oppaan valikkoa.
            var nimetTeksti = Resources.Load<TextAsset>("IssPaikat/nimet-fi");
            string nimetJson = nimetTeksti != null ? nimetTeksti.text : null;
            if (nimetTeksti != null) Resources.UnloadAsset(nimetTeksti);
            if (paikatTeksti != null)
            {
                string json = paikatTeksti.text;
                var jasennys = System.Threading.Tasks.Task.Run(() =>
                {
                    var r = new List<IssSijainti.Paikka>();
                    var nimet = nimetJson == null ? null : Matkakirja.Peli.MiniJson.Kentta(Matkakirja.Peli.MiniJson.Jasenna(nimetJson) as Dictionary<string, object>, "nimet") as Dictionary<string, object>;
                    var juuri = Matkakirja.Peli.MiniJson.Jasenna(json) as Dictionary<string, object>;
                    if (Matkakirja.Peli.MiniJson.Kentta(juuri, "paikat") is List<object> rivit)
                        foreach (var o in rivit)
                            if (o is List<object> x && x.Count >= 5)
                                r.Add(new IssSijainti.Paikka(nimet != null && nimet.TryGetValue((x[0] as string) + "|" + (x[3] as string), out var uusi) && uusi is string un && un.Length > 0 ? un : x[0] as string,
                                    Convert.ToDouble(x[1], CultureInfo.InvariantCulture),
                                    Convert.ToDouble(x[2], CultureInfo.InvariantCulture), x[3] as string, Convert.ToInt32(x[4], CultureInfo.InvariantCulture),
                                    x.Count > 6 ? x[6] as string : null));
                    return r;
                });
                while (!jasennys.IsCompleted) yield return null;
                if (jasennys.IsFaulted) Debug.LogWarning("MATKAKIRJA linssit: iss-sijainti: paikat: " + jasennys.Exception?.GetBaseException().Message);
                else a.Paikat.AddRange(jasennys.Result);
                Resources.UnloadAsset(paikatTeksti);
            }
            // Natural Earthin merialueet (PD, 306; tyokalut/iss_meret.py): merellä piste polygonissa (Päätoimittaja 4.10. 23.2x).
            var meretTeksti = Resources.Load<TextAsset>("IssPaikat/meret");
            if (meretTeksti != null)
            {
                string json = meretTeksti.text;
                var jasennys = System.Threading.Tasks.Task.Run(() =>
                {
                    var r = new List<IssSijainti.MeriAlue>();
                    var juuri = Matkakirja.Peli.MiniJson.Jasenna(json) as Dictionary<string, object>;
                    if (Matkakirja.Peli.MiniJson.Kentta(juuri, "alueet") is List<object> rivit)
                        foreach (var o in rivit)
                        {
                            if (!(o is List<object> x) || x.Count < 4 || !(x[3] is List<object> renkaat)) continue;
                            var rr = new List<double[]>();
                            foreach (var rg in renkaat)
                                if (rg is List<object> lv) { var d = new double[lv.Count]; for (int i = 0; i < lv.Count; i++) d[i] = Convert.ToDouble(lv[i], CultureInfo.InvariantCulture); rr.Add(d); }
                            r.Add(new IssSijainti.MeriAlue(x[0] as string, x[1] as string, rr));
                        }
                    return r;
                });
                while (!jasennys.IsCompleted) yield return null;
                if (jasennys.IsFaulted) Debug.LogWarning("MATKAKIRJA linssit: iss-sijainti: meret: " + jasennys.Exception?.GetBaseException().Message);
                else a.MeriAlueet.AddRange(jasennys.Result);
                Resources.UnloadAsset(meretTeksti);
            }
            var nimisto = Nimikerros.Instanssi?.Nimisto;
            if (nimisto != null)
                foreach (var n in nimisto.Nimet)
                {
                    if ((n.Luokka != "meri" && n.Luokka != "valtameri") || n.Paikat.Count == 0) continue;
                    foreach (var pk in n.Paikat.Values)
                    {
                        var p = new IssSijainti.Paikka(n.Teksti, pk.Lat, pk.Lon);
                        (n.Luokka == "meri" ? a.Meret : a.Valtameret).Add(p);
                    }
                }
            string maasto = null;
            yield return Sisalto.HaeTeksti("maastonimet", s => maasto = s, true);
            if (!string.IsNullOrEmpty(maasto))
            {
                try
                {
                    var juuri = Matkakirja.Peli.MiniJson.Jasenna(maasto);
                    var lista = juuri as List<object> ?? (Matkakirja.Peli.MiniJson.Kentta(juuri as Dictionary<string, object>, "nimet") as List<object>);
                    if (lista != null)
                        foreach (var x in lista)
                            if (x is Dictionary<string, object> o && Matkakirja.Peli.MiniJson.Kentta(o, "laji") as string == "vuori"
                                && Matkakirja.Peli.MiniJson.Kentta(o, "nimi") is string nimi)
                                a.Vuoret.Add(new IssSijainti.Paikka(nimi, Luku(o, "lat"), Luku(o, "lon")));
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA linssit: iss-sijainti: maastonimet: " + e.Message); }
            }
            IssSijainti.Nykyinen = a;
            kaynnissa = false;
            Debug.Log($"MATKAKIRJA linssit: iss-sijainti: maat {(a.Maa != null ? "on" : "ei")}, kaupunkeja {a.Kaupungit.Count}, paikkoja {a.Paikat.Count}, merialueita {a.MeriAlueet.Count}, vuoria {a.Vuoret.Count}, "
                + $"meriä {a.Meret.Count}, valtameriä {a.Valtameret.Count}");
        }

        static double Luku(Dictionary<string, object> o, string k) =>
            Matkakirja.Peli.MiniJson.Kentta(o, k) is object v ? Convert.ToDouble(v, System.Globalization.CultureInfo.InvariantCulture) : double.NaN;
    }
}
