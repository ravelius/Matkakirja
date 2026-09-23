// ÄÄNIMAISEMAN KORI JA ARVONTA (B7 §1.7, §2.6): verkkopelin js/aani-ehdokkaat.js kaupunkiKori →
// maaKori → tyyppiKori (OLETUSKORIT) ja js/ambience-stream.js arvoAani + hyppaa puhtaina funktioina.
//
// Porrastus: kaupungin omat äänitykset (maailmankartta perii mannerlautojen listan YHDISTETYT-
// järjestyksessä, ensimmäinen osuma voittaa) → saman maan muiden kaupunkien äänitykset → tyypin
// oletuskori → tyhjä (natiivissa hiljaisuus, §2.10). VAKIOPAIKAT (etusivu, lentomatka) soittavat
// kori[0]:n, muut arpovat floor(r × n). Paketin valmiit maisemakori-rivit (skeema ≥ 1.22) ovat
// tämän laskennan tulos maailmankartalle; kultainen jälki 7 vartioi molemmat.
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli
{
    public static class Maisemakori
    {
        /// <summary>Laudan kaupunkikohtaiset äänitykset (webin laudanKaupungit).</summary>
        static List<(string Kaupunki, List<KaupunkiAanite> Aanitteet)> LaudanKaupungit(AaniTaulut t, string lauta)
        {
            var ulos = new List<(string, List<KaupunkiAanite>)>();
            if (lauta != null && t.Yhdistetyt.TryGetValue(lauta, out var osat))
            {
                var nahty = new HashSet<string>();
                foreach (var osa in osat)
                    foreach (var (lautaId, kaupungit) in t.KaupunkiEhdokkaat)
                        if (lautaId == osa)
                            foreach (var (id, lista) in kaupungit)
                                if (nahty.Add(id)) ulos.Add((id, lista));
                return ulos;
            }
            foreach (var (lautaId, kaupungit) in t.KaupunkiEhdokkaat)
                if (lautaId == lauta) { ulos.AddRange(kaupungit); break; }
            return ulos;
        }

        /// <summary>
        /// Kori porrastuksineen: kaupunki → maa → tyyppi. <paramref name="maat"/> on kaupunki → ISO3
        /// (null = maata ei tunneta; web cityCountry puuttuu).
        /// </summary>
        public static MaisemaKoriRivi Kori(AaniTaulut t, string lauta, string paikka, string tyyppi, IReadOnlyDictionary<string, string> maat)
        {
            var omat = LaudanKaupungit(t, lauta);
            foreach (var (id, lista) in omat)
                if (id == paikka && lista.Count > 0)
                    return Rivi(paikka, tyyppi, "kaupunki", lista.ConvertAll(a => a.Valinta));
            if (maat != null && paikka != null && maat.TryGetValue(paikka, out var iso) && !string.IsNullOrEmpty(iso))
            {
                var maa = new List<string>();
                foreach (var (id, lista) in omat)
                {
                    if (id == paikka || !maat.TryGetValue(id, out var m) || m != iso) continue;
                    foreach (var a in lista) maa.Add(a.Valinta);
                }
                if (maa.Count > 0) return Rivi(paikka, tyyppi, "maa", maa);
            }
            if (!string.IsNullOrEmpty(tyyppi) && t.Oletuskorit.TryGetValue(tyyppi, out var kori) && kori.Count > 0)
                return Rivi(paikka, tyyppi, "tyyppi", new List<string>(kori));
            return Rivi(paikka, tyyppi, null, new List<string>());
        }

        static MaisemaKoriRivi Rivi(string paikka, string tyyppi, string porras, List<string> kori) =>
            new MaisemaKoriRivi { Paikka = paikka, Tyyppi = tyyppi, Porras = porras, Kori = kori };

        /// <summary>
        /// Paikan kori ajon aikana: paketin valmis rivi (laudalle t.Lauta, sama tyyppi), muuten laskettu
        /// (t.Maat, t.KaupunkiEhdokkaat, t.Oletuskorit). Valmis rivi on laskettu kaupungin omalla
        /// tyypillä, joten poikkeava tyyppi (tyyppikorin porras) lasketaan erikseen.
        /// </summary>
        public static IReadOnlyList<string> Paikan(AaniTaulut t, string paikka, string tyyppi)
        {
            if (paikka != null && t.Maisemakorit.TryGetValue(paikka, out var valmis) && valmis.Tyyppi == tyyppi) return valmis.Kori;
            return Kori(t, t.Lauta, paikka, tyyppi, t.Maat).Kori;
        }

        /// <summary>Webin arvoAani ilman muistia: vakiopaikka → kori[0], muuten kori[floor(r × n)]; tyhjä → null.</summary>
        public static string Arvo(IReadOnlyList<string> kori, bool vakiopaikka, Func<double> arpa)
        {
            if (kori == null || kori.Count == 0) return null;
            if (vakiopaikka) return kori[0];
            return kori[(int)Math.Floor(arpa() * kori.Count)];
        }

        /// <summary>
        /// Webin hyppaa: ensimmäisen kierroksen aloituskohta. yla = kesto − 45; jos arvottu ja
        /// yla &gt; alku + 5, kohta = alku + r × (yla − alku) (arpa kulutetaan vain silloin), muuten alku.
        /// </summary>
        public static double Aloituskohta(double alku, double kesto, bool arvottu, Func<double> arpa)
        {
            if (double.IsNaN(kesto) || double.IsInfinity(kesto)) return alku;
            var yla = kesto - AaniVakiot.LoppuvaraS;
            return arvottu && yla > alku + 5 ? alku + arpa() * (yla - alku) : alku;
        }
    }
}
