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
            Debug.Log($"MATKAKIRJA linssit: iss-sijainti: maat {(a.Maa != null ? "on" : "ei")}, kaupunkeja {a.Kaupungit.Count}, vuoria {a.Vuoret.Count}, "
                + $"meriä {a.Meret.Count}, valtameriä {a.Valtameret.Count}");
        }

        static double Luku(Dictionary<string, object> o, string k) =>
            Matkakirja.Peli.MiniJson.Kentta(o, k) is object v ? Convert.ToDouble(v, System.Globalization.CultureInfo.InvariantCulture) : double.NaN;
    }
}
