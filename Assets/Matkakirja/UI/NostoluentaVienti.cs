// LUENTAVIENTI ESIGENEROINTIIN (Pelikoodarin pyynnöt 9.10.2026; omistaja hyväksyi klo 10.2x ja PT:n kortilla kuusi lajia): jokaisen
// luettavan tekstin palat täsmälleen kuten Puhe.Syntetisoi ne saa: Puhe.Katkaise(Lukijaaani.JsTrim(pala), TekstinKatto), NFC;
// loppuTagi ja persoona kuten pelissä. Lajit:
//   nostot        Nostokortti.LuennanTekstit → LuennanPalatJaTagit, kertoja (KortinLukija)
//   kohtaamiset   löytörepliikki Loyto ja tarinakaaren muoto KaariAarre + "\n" + Loyto; yksi pala, tagi "", kertoja (PeliOhjain.Vastaa)
//   lehdet        kaupunki- ja maalehtien sivut oikean Lehtinakyman kautta (SivunTekstit → LuennanPalatJaTagit), kertoja;
//                 lahde <kaupunki>#<sivu> tai maa:<ISO3>#<sivu>
//   saapumiset    isoisän saapumisteksti ilman ääntä (Matkakirjamerkinnat.Lukija); yksi pala, tagi "", merkinnat (Saapumisesitys)
//   nahtavyydet   kohdekarttojen jutut (Nahtavyysarkki.JutunLuettavat → LuennanPalatJaTagit), kertoja
//   oppaat        matkailijan oppaat (Nahtavyysarkki.OppaanLuettavat → LuennanPalatJaTagit), kertoja
// Otsakerivi (ääni, nopeus, manifesti, maat, lajit), sitten JSON-rivi palaa kohden: {"laji","lahde","nosto"(nostoissa),"maa","i",
// "teksti","loppuTagi","persoona"}. Sama (teksti, loppuTagi) voi toistua (esim. maalehden Menovinkit): yhdistä generoinnissa.
// persistentDataPath/nostoluennat.jsonl (.tmp → valmis). Komento: ui nostoluennat [kaikki|laji,laji…] [europe|ISO3,ISO3…] | tila
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
        public static readonly string[] Lajit = { "nostot", "kohtaamiset", "lehdet", "saapumiset", "nahtavyydet", "oppaat" };
        public static bool Kaynnissa { get; private set; }
        public static string Tila { get; private set; } = "ei ajettu";

        /// <summary>Argumentit: [lajit] [maat]; vanha muoto "europe" / "ISO3,…" = vain nostot.</summary>
        public static string Aloita(string argumentit)
        {
            if (Kaynnissa) return "nostoluennat: käynnissä jo (" + Tila + ")";
            var osat = (argumentit ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).ToList();
            var lajit = new List<string> { "nostot" };
            if (osat.Count > 0 && (osat[0] == "kaikki" || osat[0].Split(',').All(x => Lajit.Contains(x))))
            {
                lajit = osat[0] == "kaikki" ? Lajit.ToList() : osat[0].Split(',').ToList();
                osat.RemoveAt(0);
            }
            string maat = osat.Count > 0 ? osat[0] : "europe";
            HashSet<string> joukko = maat != "europe"
                ? new HashSet<string>(maat.Split(',').Select(x => x.Trim().ToUpperInvariant()).Where(x => x.Length == 3), StringComparer.Ordinal)
                : new HashSet<string>(UiSisalto.Kaikki.Where(k => k.Manner == "europe" && !string.IsNullOrEmpty(k.Maa)).Select(k => k.Maa), StringComparer.Ordinal);
            if (joukko.Count == 0) return "nostoluennat: ei maita (kaupungit lataamatta?)";
            Kaynnissa = true;
            UiKerros.Hae().StartCoroutine(Aja(lajit, joukko));
            return $"nostoluennat: aloitettu, lajit {string.Join(",", lajit)}, {joukko.Count} maata";
        }

        static string J(string s) => "\"" + (s ?? "").Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\n", "\\n").Replace("\r", "\\r").Replace("\t", "\\t") + "\"";

        sealed class Kirjoittaja
        {
            public readonly StringBuilder Sb = new StringBuilder();
            public int Paloja, Merkkeja;
            public readonly Dictionary<string, int> Lajeittain = new Dictionary<string, int>();

            public void Pala(string laji, string lahde, string maa, int i, string raaka, string tagi, string persoona)
            {
                string teksti = Puhe.Katkaise(Lukijaaani.JsTrim(raaka), Puhe.TekstinKatto).Normalize(NormalizationForm.FormC);
                if (string.IsNullOrEmpty(teksti)) return;
                Sb.Append("{\"laji\":").Append(J(laji)).Append(",\"lahde\":").Append(J(lahde));
                if (laji == "nostot") Sb.Append(",\"nosto\":").Append(J(lahde));
                Sb.Append(",\"maa\":").Append(J(maa)).Append(",\"i\":").Append(i).Append(",\"teksti\":").Append(J(teksti))
                  .Append(",\"loppuTagi\":").Append(J(tagi ?? "")).Append(",\"persoona\":").Append(J(persoona)).Append("}\n");
                Paloja++; Merkkeja += teksti.Length;
                Lajeittain[laji] = Lajeittain.TryGetValue(laji, out var n) ? n + 1 : 1;
            }

            /// <summary>Kortin lukijan polku (KortinLukija.Aloita): tyhjät pois, Trim, LuennanPalatJaTagit.</summary>
            public void Lukija(string laji, string lahde, string maa, IEnumerable<string> tekstit)
            {
                var raaka = tekstit.Where(t => !string.IsNullOrWhiteSpace(t)).Select(t => t.Trim()).ToList();
                if (raaka.Count == 0) return;
                var (palat, tagit) = Lukijaaani.LuennanPalatJaTagit(raaka);
                for (int i = 0; i < palat.Count; i++) Pala(laji, lahde, maa, i, palat[i], tagit != null && i < tagit.Count ? tagit[i] : null, "kertoja");
            }
        }

        static IEnumerator Aja(List<string> lajit, HashSet<string> maat)
        {
            string polku = Path.Combine(Application.persistentDataPath, "nostoluennat.jsonl"), tmp = polku + ".tmp";
            var k = new Kirjoittaja();
            var kaupungit = UiSisalto.Kaikki.Where(x => x.Maa != null && maat.Contains(x.Maa)).OrderBy(x => x.Id, StringComparer.Ordinal).ToList();
            string manifesti = Asetus.Teksti("osoitteet.luennat-manifesti", "https://media.matkakirja.app/aanet/luennat/v1/manifest.json");
            k.Sb.Append("{\"otsake\":true,\"aani\":").Append(J(Striimiaani.ElevenAani)).Append(",\"nopeus\":")
             .Append(Puhe.Saadot.Nopeus.ToString("F2", System.Globalization.CultureInfo.InvariantCulture))
             .Append(",\"manifesti\":").Append(J(manifesti)).Append(",\"maat\":").Append(J(string.Join(",", maat.OrderBy(x => x, StringComparer.Ordinal))))
             .Append(",\"lajit\":").Append(J(string.Join(",", lajit))).Append(",\"kaupunkeja\":").Append(kaupungit.Count)
             .Append(",\"luotu\":").Append(J(DateTime.UtcNow.ToString("o"))).Append("}\n");

            if (lajit.Contains("nostot"))
            {
                List<(string Id, string Maa)> idt = null;
                yield return NostoSisalto.ValoIdt(maat.Contains, x => idt = x);
                idt ??= new List<(string, string)>();
                for (int n = 0; n < idt.Count; n++)
                {
                    Nosto nosto = null;
                    yield return NostoSisalto.Hae(idt[n].Id, x => nosto = x);
                    if (nosto != null) k.Lukija("nostot", idt[n].Id, idt[n].Maa, Nostokortti.LuennanTekstit(nosto));
                    if (n % 50 == 0) Edisty("nostot", n, idt.Count, k);
                }
            }
            if (lajit.Contains("kohtaamiset"))
            {
                string kaari = null, kohtaamisTeksti = null;
                yield return Matkakirja.Sisalto.HaeTeksti("tarinakaari", t => kaari = t, true);
                yield return Matkakirja.Sisalto.HaeTeksti("kohtaamiset", t => kohtaamisTeksti = t, true);
                var ko = new Kohtaamiset();
                if (kaari != null) ko.LueTarinakaari(kaari);
                if (kohtaamisTeksti != null) ko.LueKohtaamiset(kohtaamisTeksti);
                foreach (var c in kaupungit)
                {
                    var x = ko.Kaupunki(c.Id);
                    if (x == null || string.IsNullOrEmpty(x.Loyto)) continue;
                    k.Pala("kohtaamiset", c.Id, c.Maa, 0, x.Loyto, "", "kertoja");
                    if (!string.IsNullOrEmpty(x.KaariAarre)) k.Pala("kohtaamiset", c.Id + "#kaari", c.Maa, 0, x.KaariAarre + "\n" + x.Loyto, "", "kertoja");
                }
                Edisty("kohtaamiset", kaupungit.Count, kaupungit.Count, k);
            }
            if (lajit.Contains("saapumiset"))
            {
                bool valmis = false;
                Matkakirjamerkinnat.Lataa(() => valmis = true);
                float raja = Time.realtimeSinceStartup + 30f;
                while (!valmis && Time.realtimeSinceStartup < raja) yield return null;
                foreach (var c in kaupungit)
                {
                    if (Matkakirjamerkinnat.Fokus(Fokusvirrat.Hae(c.Id)) != null) continue;   // fokusvirta: luento, ei saapumislukua
                    var m = Matkakirjamerkinnat.Saapuminen(c.Id) ?? Matkakirjamerkinnat.Havainto(c.Id);
                    if (m != null && m.AaniUrl == null && !string.IsNullOrEmpty(m.Lukija)) k.Pala("saapumiset", c.Id, c.Maa, 0, m.Lukija, "", "merkinnat");
                }
                Edisty("saapumiset", kaupungit.Count, kaupungit.Count, k);
            }
            if (lajit.Contains("nahtavyydet") || lajit.Contains("oppaat"))
                for (int n = 0; n < kaupungit.Count; n++)
                {
                    var c = kaupungit[n];
                    if (lajit.Contains("nahtavyydet"))
                    {
                        Kohdekartta kartta = null; bool ok = false;
                        Kohdekartat.Hae(c.Id, x => { kartta = x; ok = true; });
                        float raja = Time.realtimeSinceStartup + 20f;
                        while (!ok && Time.realtimeSinceStartup < raja) yield return null;
                        if (kartta != null)
                            foreach (var kohde in kartta.Kohteet.Concat(kartta.Tarinakohteet))
                                if (kohde.Juttu != null && !string.IsNullOrEmpty(kohde.Juttu.Teksti))
                                    k.Lukija("nahtavyydet", c.Id + "/" + (kohde.Juttu.Nimi ?? kohde.Nimi), c.Maa, Nahtavyysarkki.JutunLuettavat(kohde.Juttu));
                    }
                    if (lajit.Contains("oppaat"))
                    {
                        OpasArtikkeli opas = null; bool ok = false;
                        LehtiSisalto.HaeOpas(c.Id, x => { opas = x; ok = true; });
                        float raja = Time.realtimeSinceStartup + 20f;
                        while (!ok && Time.realtimeSinceStartup < raja) yield return null;
                        if (opas != null) k.Lukija("oppaat", c.Id, c.Maa, Nahtavyysarkki.OppaanLuettavat(opas));
                    }
                    if (n % 10 == 0) Edisty("nähtävyydet/oppaat", n, kaupungit.Count, k);
                }
            if (lajit.Contains("lehdet") && UiNakymat.Olemassa)
            {
                var lehti = UiNakymat.Hae().Lehti;
                // Kaikki kaupunki- ja maalehdet LehtiSisallosta (Pelikoodari 9.10.: KaupunkiTiedot.Lehti on tosi vain kaupungeilla,
                // joiden lehti on jo ladattu kaupungeittain, joten ensimmäinen vienti sai 6 kaupunkia 66:sta). Maalehdet samalla
                // kertojalla, lahde "maa:<ISO3>#<sivu>".
                var lehdet = new List<(LehtiLaji Laji, string Omistaja, string Maa)>();
                foreach (var c in kaupungit)
                {
                    Lehti l = null;
                    yield return LehtiSisalto.Hae(LehtiLaji.Kaupunki, c.Id, x => l = x);
                    if (l?.Sivut != null && l.Sivut.Count > 0) lehdet.Add((LehtiLaji.Kaupunki, c.Id, c.Maa));
                }
                foreach (var maa in maat.OrderBy(x => x, StringComparer.Ordinal))
                {
                    Lehti l = null;
                    yield return LehtiSisalto.Hae(LehtiLaji.Maa, maa, x => l = x);
                    if (l?.Sivut != null && l.Sivut.Count > 0) lehdet.Add((LehtiLaji.Maa, maa, maa));
                }
                for (int n = 0; n < lehdet.Count; n++)
                {
                    var (laji, omistaja, maa) = lehdet[n];
                    string etu = laji == LehtiLaji.Maa ? "maa:" : "";
                    yield return lehti.VieLuennat(laji, omistaja, (sivu, tekstit) => k.Lukija("lehdet", etu + omistaja + "#" + sivu, maa, tekstit));
                    Edisty("lehdet", n + 1, lehdet.Count, k);
                }
            }

            try
            {
                File.WriteAllText(tmp, k.Sb.ToString(), new UTF8Encoding(false));
                if (File.Exists(polku)) File.Delete(polku);
                File.Move(tmp, polku);
                Tila = $"valmis: {k.Paloja} palaa ({string.Join(", ", k.Lajeittain.Select(x => x.Key + " " + x.Value))}), {k.Merkkeja} merkkiä → {polku}";
            }
            catch (Exception e) { Tila = "kirjoitus epäonnistui: " + e.Message; }
            Debug.Log("MATKAKIRJA nostoluennat: " + Tila);
            Kaynnissa = false;
        }

        static void Edisty(string laji, int n, int kaikki, Kirjoittaja k)
        {
            Tila = $"{laji} {n}/{kaikki}, {k.Paloja} palaa";
            Debug.Log("MATKAKIRJA nostoluennat: " + Tila);
        }
    }
}
