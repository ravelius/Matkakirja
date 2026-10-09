// NOSTOJEN LUENTAVIENTI (Pelikoodarin pyyntö 9.10.2026; omistaja hyväksyi klo 10.2x, että Euroopan nostot generoidaan valmiiksi
// Valmisluennat-avainmallilla): jokaisen noston luettavat palat täsmälleen kuten Puhe.Syntetisoi ne saa – Nostokortti.LuennanTekstit
// → Lukijaaani.LuennanPalatJaTagit → Puhe.Katkaise(Lukijaaani.JsTrim(pala), TekstinKatto), NFC; loppuTagi kuten luennassa; persoona
// aina kertoja (nostokortti ei välitä persoonaa). Ensimmäinen rivi on otsake (ääni, nopeus, manifesti, paketti); sitten JSON-rivi
// palaa kohden. Tiedosto persistentDataPath/nostoluennat.jsonl (.tmp → valmis). Komento: ui nostoluennat [europe|ISO3,ISO3…]
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class NostoluentaVienti
    {
        public static bool Kaynnissa { get; private set; }
        public static string Tila { get; private set; } = "ei ajettu";

        public static string Aloita(string maat)
        {
            if (Kaynnissa) return "nostoluennat: käynnissä jo (" + Tila + ")";
            HashSet<string> joukko = null;
            if (!string.IsNullOrWhiteSpace(maat) && maat.Trim() != "europe")
                joukko = new HashSet<string>(maat.Split(',').Select(x => x.Trim().ToUpperInvariant()).Where(x => x.Length == 3), StringComparer.Ordinal);
            else
                joukko = new HashSet<string>(UiSisalto.Kaikki.Where(k => k.Manner == "europe" && !string.IsNullOrEmpty(k.Maa)).Select(k => k.Maa), StringComparer.Ordinal);
            if (joukko.Count == 0) return "nostoluennat: ei maita (kaupungit lataamatta?)";
            Kaynnissa = true;
            UiKerros.Hae().StartCoroutine(Aja(joukko));
            return $"nostoluennat: aloitettu, {joukko.Count} maata";
        }

        static string J(string s) => "\"" + (s ?? "").Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\n", "\\n").Replace("\r", "\\r").Replace("\t", "\\t") + "\"";

        static IEnumerator Aja(HashSet<string> maat)
        {
            string polku = Path.Combine(Application.persistentDataPath, "nostoluennat.jsonl"), tmp = polku + ".tmp";
            List<(string Id, string Maa)> idt = null;
            yield return NostoSisalto.ValoIdt(maat.Contains, x => idt = x);
            idt ??= new List<(string, string)>();
            int nostoja = 0, ohitettu = 0, paloja = 0, merkkeja = 0;
            var sb = new StringBuilder();
            string aani = Striimiaani.ElevenAani;
            double nopeus = Puhe.Saadot.Nopeus;
            string manifesti = Asetus.Teksti("osoitteet.luennat-manifesti", "https://media.matkakirja.app/aanet/luennat/v1/manifest.json");
            sb.Append("{\"otsake\":true,\"aani\":").Append(J(aani)).Append(",\"nopeus\":").Append(nopeus.ToString("F2", System.Globalization.CultureInfo.InvariantCulture))
              .Append(",\"manifesti\":").Append(J(manifesti)).Append(",\"maat\":").Append(J(string.Join(",", maat.OrderBy(x => x, StringComparer.Ordinal))))
              .Append(",\"valoja\":").Append(idt.Count).Append(",\"luotu\":").Append(J(DateTime.UtcNow.ToString("o"))).Append("}\n");
            for (int n = 0; n < idt.Count; n++)
            {
                var (id, maa) = idt[n];
                Nosto nosto = null;
                yield return NostoSisalto.Hae(id, x => nosto = x);
                if (nosto == null) { ohitettu++; continue; }
                var (palat, tagit) = Lukijaaani.LuennanPalatJaTagit(Nostokortti.LuennanTekstit(nosto));
                for (int i = 0; i < palat.Count; i++)
                {
                    string teksti = Puhe.Katkaise(Lukijaaani.JsTrim(palat[i]), Puhe.TekstinKatto).Normalize(NormalizationForm.FormC);
                    if (string.IsNullOrEmpty(teksti)) continue;
                    sb.Append("{\"nosto\":").Append(J(id)).Append(",\"maa\":").Append(J(maa)).Append(",\"i\":").Append(i)
                      .Append(",\"teksti\":").Append(J(teksti)).Append(",\"loppuTagi\":").Append(J(tagit != null && i < tagit.Count ? tagit[i] ?? "" : ""))
                      .Append(",\"persoona\":\"kertoja\"}\n");
                    paloja++; merkkeja += teksti.Length;
                }
                nostoja++;
                if (n % 25 == 0) { Tila = $"{n + 1}/{idt.Count}"; Debug.Log($"MATKAKIRJA nostoluennat: {Tila}, {paloja} palaa"); }
            }
            try
            {
                File.WriteAllText(tmp, sb.ToString(), new UTF8Encoding(false));
                if (File.Exists(polku)) File.Delete(polku);
                File.Move(tmp, polku);
                Tila = $"valmis: {nostoja} nostoa, {ohitettu} ohitettu (ei nostoja), {paloja} palaa, {merkkeja} merkkiä → {polku}";
            }
            catch (Exception e) { Tila = "kirjoitus epäonnistui: " + e.Message; }
            Debug.Log("MATKAKIRJA nostoluennat: " + Tila);
            Kaynnissa = false;
        }
    }
}
