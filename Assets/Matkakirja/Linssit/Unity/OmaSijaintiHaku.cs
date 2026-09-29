// OMA SIJAINTI ISS-KYYTIIN (Linssiseppä 2, 28.9.2026; logiikka Ydin/Iss/OmaSijainti.cs): maa Cloudflaren trace-rivistä
// (loc=FI, IP:n mukaan, ilman lupakyselyä), varalla laitteen alueasetus; paikka ja nimi MaatAineistosta (maan nimen
// keskipiste). Haetaan kerran istunnossa, kun kyyti avautuu ensimmäisen kerran. Testikomento: astro kyyti sijainti [ISO2].
using System;
using System.Collections;
using System.Globalization;
using Matkakirja.Linssit.Iss;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class OmaSijaintiHaku
    {
        /// <summary>Maa ISO2-koodina (null = ei vielä tiedossa).</summary>
        public static string Iso2 { get; private set; }
        /// <summary>"cloudflare", "alueasetus" tai "testi".</summary>
        public static string Lahde { get; private set; }
        public static bool Haettu { get; private set; }
        static bool hakee;
        /// <summary>Haku valmis (UI päivittää valikon rivin).</summary>
        public static event Action Valmis;

        /// <summary>Käynnistää haun, jos sitä ei ole tehty (LinssiOhjainin korutiinina).</summary>
        public static void Aloita()
        {
            if (Haettu || hakee || LinssiOhjain.Instanssi == null) return;
            hakee = true;
            LinssiOhjain.Instanssi.StartCoroutine(Hae());
        }

        static IEnumerator Hae()
        {
            string koodi = null;
            using (var p = UnityWebRequest.Get(OmaSijainti.TraceUrl))
            {
                p.timeout = 6;
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success) koodi = OmaSijainti.LueMaa(p.downloadHandler.text);
            }
            if (koodi != null) Lahde = "cloudflare";
            else
            {
                try { koodi = RegionInfo.CurrentRegion.TwoLetterISORegionName?.ToUpperInvariant(); } catch { koodi = null; }
                if (OmaSijainti.Kelpaa(koodi)) Lahde = "alueasetus"; else koodi = null;
            }
            Iso2 = koodi;
            hakee = false;
            Haettu = true;
            Debug.Log($"MATKAKIRJA linssit: oma sijainti: {Iso2 ?? "-"} ({Lahde ?? "ei lähdettä"})");
            Valmis?.Invoke();
        }

        /// <summary>Testikomento: maa pakotettuna (ISO2), ilman verkkoa.</summary>
        public static void Pakota(string iso2)
        {
            Iso2 = OmaSijainti.Kelpaa(iso2?.ToUpperInvariant()) ? iso2.ToUpperInvariant() : null;
            Lahde = "testi";
            Haettu = true;
            Valmis?.Invoke();
        }

        /// <summary>Maan nimi ja keskipiste (MaatAineisto), jos maa on tiedossa ja aineisto ladattu.</summary>
        public static bool Paikka(out string nimi, out double lat, out double lon)
        {
            nimi = null; lat = lon = 0;
            var a = LinssiOhjain.MaatAineisto;
            if (Iso2 == null || a == null) return false;
            foreach (var m in a.Maat.Values)
            {
                if (!string.Equals(m.Iso2, Iso2, StringComparison.OrdinalIgnoreCase)) continue;
                nimi = m.Nimi ?? m.Id; lat = m.KeskusLat; lon = m.KeskusLon;
                return true;
            }
            return false;
        }

        /// <summary>Valikon rivi: "Oma sijainti · Suomi" tai "Oma sijainti".</summary>
        public static string Rivi() => OmaSijainti.Rivi(Paikka(out var nimi, out _, out _) ? nimi : null);
    }
}
