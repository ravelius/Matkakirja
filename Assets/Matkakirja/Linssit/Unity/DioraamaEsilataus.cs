// LINNAN KUOREN ESILATAUS (Päätoimittaja 4.10.2026, Linnanrakentajan vaihtoehto b): iPadin saapumisesta 8,2 s:sta 6,6 s oli
// kevyen kuoren lataamista verkosta. Kun Olavinlinnan linssi on pelaajan saatavilla, kevyt kuori (glb ~12,7 Mt) ja sen 2k-tekstuuri
// (ASTC, päivä tai hämärä tunnelman mukaan) ladataan taustalla levyvälimuistiin (DioraamaLevyvalimuisti) jo kartalla, jolloin linssin
// avaus lukee ne levyltä. Omistajan taustapäivityslinja: kaikilla verkoilla. Kerran käynnistystä kohti; uusi osoitin (hash) siivoaa
// vanhan kansion välimuistin omassa Aseta-kutsussa. Linssin oma lataus odottaa kesken olevan tiedoston (DioraamaLevyvalimuisti).
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class DioraamaEsilataus
    {
        static bool aloitettu;
        /// <summary>Tila lokiin ja testikomentoon ("ei aloitettu", "käynnissä", "valmis …", "virhe …").</summary>
        public static string Tila { get; private set; } = "ei aloitettu";

        /// <summary>Kevyt kuori levyvälimuistiin. Ajetaan kerran; kirjaa = loki.</summary>
        public static IEnumerator Kuori(Action<string> kirjaa)
        {
            if (aloitettu) yield break;
            aloitettu = true;
            Tila = "käynnissä";
            float alku = Time.realtimeSinceStartup;
            string juuri = DioraamaSovitin.AmpariJuuri;

            string uusin = null;
            yield return Teksti(juuri + "uusin.json", t => uusin = t);
            string polku = null;
            try
            {
                var o = uusin != null ? Matkakirja.Peli.MiniJson.Jasenna(uusin) as Dictionary<string, object> : null;
                polku = o != null && o.TryGetValue("polku", out var p) ? p as string : null;
            }
            catch (Exception) { polku = null; }
            if (string.IsNullOrEmpty(polku)) { Loppu(kirjaa, "virhe: uusin.json", alku); yield break; }
            string paketti = juuri + polku.TrimEnd('/') + "/";
            DioraamaLevyvalimuisti.Aseta(juuri, polku.Trim('/'));

            string json = null;
            yield return Teksti(paketti + "rakennus.json", t => json = t);
            Rakennus rakennus = null;
            try { rakennus = json != null ? DioraamaData.Lue(json) : null; } catch (Exception) { rakennus = null; }
            var kuori = rakennus?.Ulkokuori;
            if (kuori == null || string.IsNullOrEmpty(kuori.Kevyt)) { Loppu(kirjaa, "virhe: rakennus.json ilman kevyttä kuorta", alku); yield break; }

            bool glbOk = false, astcOk = false;
            yield return DioraamaLevyvalimuisti.Hae(paketti + kuori.Kevyt, 300, t => glbOk = t != null);
            // Sama valinta kuin DioraamaUlkokuori.Lataa (AstcPolku): hämärä, jos tunnelma ja tiedosto, muuten päivä.
            bool hamara = DioraamaTunnelma.Hamara(rakennus);
            string astc = hamara && !string.IsNullOrEmpty(kuori.HamaraKevyt) ? kuori.HamaraKevyt : kuori.AstcKevyt;
            if (!string.IsNullOrEmpty(astc))
                yield return DioraamaLevyvalimuisti.HaeNatiivi(paketti + astc, 300, t => { astcOk = t.IsCreated; if (t.IsCreated) t.Dispose(); });
            Loppu(kirjaa, $"valmis: kuori kevyt {(glbOk ? "ok" : "EI")}, ASTC {(string.IsNullOrEmpty(astc) ? "ei paketissa" : astcOk ? "ok" : "EI")}", alku);
        }

        static void Loppu(Action<string> kirjaa, string tila, float alku)
        {
            Tila = $"{tila} ({Time.realtimeSinceStartup - alku:F1} s, osumia {DioraamaLevyvalimuisti.Osumia}, latauksia {DioraamaLevyvalimuisti.Latauksia})";
            kirjaa?.Invoke("dioraama: esilataus " + Tila);
        }

        static IEnumerator Teksti(string url, Action<string> valmis)
        {
            using var p = UnityWebRequest.Get(url + (url.EndsWith("uusin.json", StringComparison.Ordinal) ? "?t=" + DateTime.UtcNow.Ticks : ""));
            p.timeout = 20;
            yield return p.SendWebRequest();
            valmis(p.result == UnityWebRequest.Result.Success ? p.downloadHandler.text : null);
        }
    }
}
