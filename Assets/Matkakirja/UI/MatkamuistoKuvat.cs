// MATKAMUISTOJEN KUVAT DIORAAMAN PAKETISTA (Päätoimittaja 29.9.2026: kuva viedään CI:llä vie-dioraama.yml:n hash-kansioon,
// ei kiinteään ämpäripolkuun). Sama osoitin kuin DioraamaSovitin.LataaRakennus: juuri + uusin.json → { polku: "<hash>/" }.
// Luetaan kerran taustalla (UiNakymat käynnistyksessä) ja uudelleen ennen löytökorttia, jos ensimmäinen ei ehtinyt.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class MatkamuistoKuvat
    {
        static bool ratkaistu;

        /// <summary>Asettaa Matkamuistot.PaketinJuuren osoittimesta; valmis kutsutaan aina (myös virheessä).</summary>
        public static IEnumerator Ratkaise(Action valmis = null)
        {
            if (!ratkaistu)
            {
                using var r = UnityWebRequest.Get(Matkamuistot.OletusJuuri + "uusin.json");
                r.timeout = 8;
                yield return r.SendWebRequest();
                if (r.result == UnityWebRequest.Result.Success)
                {
                    try
                    {
                        var o = MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>;
                        string polku = o != null && o.TryGetValue("polku", out var p) ? p as string : null;
                        if (!string.IsNullOrEmpty(polku))
                        {
                            Matkamuistot.PaketinJuuri = Matkamuistot.OletusJuuri + polku.TrimEnd('/') + "/";
                            ratkaistu = true;
                        }
                    }
                    catch (Exception e) { Debug.LogWarning("MATKAKIRJA matkamuisto: uusin.json: " + e.Message); }
                }
                Debug.Log("MATKAKIRJA matkamuisto: kuvien juuri " + Matkamuistot.PaketinJuuri);
            }
            valmis?.Invoke();
        }
    }
}
