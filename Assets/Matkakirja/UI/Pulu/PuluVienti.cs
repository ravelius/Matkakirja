// PULUN ESIGENEROINNIN VIENTI (omistaja 9.10.2026, Päätoimittaja: valmiit kysymykset ja vastaukset Sonnet-parvella, peruspeli ilman
// API-krediittejä). Jokainen Kysy-napin kohta (nosto, jolla on kysymyksiä: Nostokortti → PuluChat.AvaaKortista) viedään sellaisena
// kuin pelaaja sen kysyisi kohteen kaupungissa kartalla: kortin aihe (PuluChat.NostonAihe), valmiit kysymykset ja jokaisen kysymyksen
// oma konteksti pelin omalla polulla (PuluChat.EsigenerointiKonteksti + PuluHaku.Hae, ilman matkapäivää). Lisäksi kohdan yhteinen
// konteksti (kysymysten katkelmat yhdessä) uusille kysymyksille, joita kohdalla ei vielä ole.
// persistentDataPath/puluvienti.jsonl (.tmp → valmis), rivi kohtaa kohden:
//   {"kohta","maa","kaupunki","aihe":{otsake,nimi,tyyppi,teksti},"kysymykset":[{"kysymys","konteksti"}],"yhteinen"}
// Komento: ui puluvienti [europe|ISO3,ISO3…] | tila
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class PuluVienti
    {
        public static bool Kaynnissa { get; private set; }
        public static string Tila { get; private set; } = "ei ajettu";

        public static string Aloita(string argumentit)
        {
            if (Kaynnissa) return "puluvienti: käynnissä jo (" + Tila + ")";
            string maat = string.IsNullOrWhiteSpace(argumentit) ? "europe" : argumentit.Trim();
            HashSet<string> joukko = maat != "europe"
                ? new HashSet<string>(maat.Split(',').Select(x => x.Trim().ToUpperInvariant()).Where(x => x.Length == 3), StringComparer.Ordinal)
                : new HashSet<string>(UiSisalto.Kaikki.Where(k => k.Manner == "europe" && !string.IsNullOrEmpty(k.Maa)).Select(k => k.Maa), StringComparer.Ordinal);
            if (joukko.Count == 0) return "puluvienti: ei maita (kaupungit lataamatta?)";
            Kaynnissa = true;
            UiKerros.Hae().StartCoroutine(Aja(joukko));
            return $"puluvienti: aloitettu, {joukko.Count} maata";
        }

        static string J(string s) => s == null ? "null"
            : "\"" + s.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\n", "\\n").Replace("\r", "\\r").Replace("\t", "\\t") + "\"";

        static IEnumerator Aja(HashSet<string> maat)
        {
            string polku = Path.Combine(Application.persistentDataPath, "puluvienti.jsonl"), tmp = polku + ".tmp";
            var sb = new StringBuilder();
            int kohtia = 0, kysymyksia = 0;
            // Konteksti tarvitsee kaupungit, isoisän merkinnät ja Pulun hakuindeksin (sama kuin chatin ensimmäisellä avauksella).
            bool uiValmis = false, virratValmis = false;
            UiSisalto.Lataa(() => uiValmis = true);
            Fokusvirrat.Lataa(() => virratValmis = true);
            PuluHaku.Valmistele();
            float raja = Time.realtimeSinceStartup + 120f;
            while ((!uiValmis || !virratValmis || !PuluHaku.Valmis) && Time.realtimeSinceStartup < raja) yield return null;

            List<(string Id, string Maa)> idt = null;
            yield return NostoSisalto.ValoIdt(maat.Contains, x => idt = x);
            idt ??= new List<(string, string)>();
            for (int n = 0; n < idt.Count; n++)
            {
                Nosto nosto = null;
                yield return NostoSisalto.Hae(idt[n].Id, x => nosto = x);
                if (n % 50 == 0) { Tila = $"nostot {n}/{idt.Count}, {kohtia} kohtaa"; Debug.Log("MATKAKIRJA puluvienti: " + Tila); }
                if (nosto == null || nosto.Kysymykset.Count == 0) continue;
                var aihe = PuluChat.NostonAihe(nosto);
                if (aihe == null) continue;
                string kaupunki = nosto.Kaupunki, maa = idt[n].Maa;
                var yhteiset = new List<PuluHaku.Katkelma>();
                sb.Append("{\"kohta\":").Append(J(idt[n].Id)).Append(",\"maa\":").Append(J(maa)).Append(",\"kaupunki\":").Append(J(kaupunki))
                  .Append(",\"aihe\":{\"otsake\":").Append(J(aihe.Otsake)).Append(",\"nimi\":").Append(J(aihe.Nimi))
                  .Append(",\"tyyppi\":").Append(J(aihe.Tyyppi)).Append(",\"teksti\":").Append(J(aihe.Teksti)).Append("},\"kysymykset\":[");
                for (int i = 0; i < nosto.Kysymykset.Count; i++)
                {
                    string q = nosto.Kysymykset[i].Trim();
                    // Minitehtävän fakta pois (pelaaja ei ole välttämättä vastannut), kuten chatissa vastaamattomana.
                    var aineisto = PuluHaku.Hae(q, kaupunki, maa, _ => false);
                    foreach (var a in aineisto)
                        if (!yhteiset.Any(y => y.Leima == a.Leima && y.Teksti == a.Teksti)) yhteiset.Add(a);
                    if (i > 0) sb.Append(',');
                    sb.Append("{\"kysymys\":").Append(J(q)).Append(",\"konteksti\":").Append(J(PuluChat.EsigenerointiKonteksti(aihe, kaupunki, aineisto))).Append('}');
                    kysymyksia++;
                }
                var paras = yhteiset.OrderByDescending(a => a.Piste).Take(4).ToList();
                sb.Append("],\"yhteinen\":").Append(J(PuluChat.EsigenerointiKonteksti(aihe, kaupunki, paras))).Append("}\n");
                kohtia++;
            }

            try
            {
                File.WriteAllText(tmp, sb.ToString(), new UTF8Encoding(false));
                if (File.Exists(polku)) File.Delete(polku);
                File.Move(tmp, polku);
                Tila = $"valmis: {kohtia} kohtaa, {kysymyksia} kysymystä → {polku}";
            }
            catch (Exception e) { Tila = "kirjoitus epäonnistui: " + e.Message; }
            Debug.Log("MATKAKIRJA puluvienti: " + Tila);
            Kaynnissa = false;
        }
    }
}
