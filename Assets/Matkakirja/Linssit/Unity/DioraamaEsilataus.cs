// LINNAN ESILATAUS (Päätoimittaja ja omistaja 4.10.2026): linna avataan vasta täydellä tarkkuudella, joten kun Olavinlinnan linssi on
// pelaajan saatavilla, koko laitekohtainen paketti (Tiedostot: iPad ~430 Mt, iPhone ~190 Mt) ladataan taustalla suoraan levy-
// välimuistiin (DioraamaLevyvalimuisti.Esilataa) jo kartalla, kevyt kuori ensin. Omistajan linja: sama kaikilla verkoilla, ei
// verkkotyypin tarkistusta. Kerran käynnistystä kohti; uusi osoitin (hash) siivoaa vanhan kansion Aseta-kutsussa. Linssin oma lataus
// odottaa kesken olevan tiedoston eikä lataa sitä toista kertaa.
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

            // Koko laitekohtainen paketti levylle tärkeysjärjestyksessä (kevyt kuori ensin). Omistaja 4.10.: sama kaikilla verkoilla,
            // ei verkkotyypin ehtoja. Ympäristö (maasto, puut, aluskasvit; iPadilla ~29 Mt) latautuu linssin avauksessa.
            var tiedostot = Tiedostot(rakennus);
            int ok = 0, virheita = 0;
            foreach (var polkuP in tiedostot)
            {
                bool onnistui = false;
                yield return DioraamaLevyvalimuisti.Esilataa(paketti + polkuP, 300, b => onnistui = b);
                if (onnistui) ok++; else virheita++;
            }
            Loppu(kirjaa, $"valmis: {ok}/{tiedostot.Count} tiedostoa levyllä{(virheita > 0 ? $", {virheita} epäonnistui" : "")}", alku);
        }

        /// <summary>Linssin tällä laitteella lataamat paketin tiedostot (samat valinnat kuin DioraamaUlkokuori.Lataa,
        /// DioraamaSovitin.LataaValoAtlas/LataaPinta/LataaTila ja DioraamaHahmot3D.TarvittavatGlb): kuori kevyt + laitteen taso
        /// tekstuureineen, detalji, tilojen glb:t ja valoatlakset, esineet, pinnat, liekkiatlakset ja hahmomallit.</summary>
        public static List<string> Tiedostot(Rakennus r)
        {
            var l = new List<string>();
            void Lisaa(string p) { if (!string.IsNullOrEmpty(p) && !l.Contains(p)) l.Add(p); }
            bool astc = SystemInfo.SupportsTextureFormat(TextureFormat.ASTC_4x4);
            bool hamara = DioraamaTunnelma.Hamara(r);
            bool pieni = DioraamaSovitin.PieniLaite();
            var k = r.Ulkokuori;
            if (k != null)
            {
                string Polku(DioraamaUlkokuori.Laatu q) => q == DioraamaUlkokuori.Laatu.Huippu ? k.Huippu : q == DioraamaUlkokuori.Laatu.Normaali ? k.Normaali : k.Kevyt;
                string Tekstuuri(DioraamaUlkokuori.Laatu q)
                {
                    string paiva = q == DioraamaUlkokuori.Laatu.Huippu ? k.AstcHuippu : q == DioraamaUlkokuori.Laatu.Normaali ? k.AstcNormaali : k.AstcKevyt;
                    string ham = q == DioraamaUlkokuori.Laatu.Huippu ? k.HamaraHuippu : q == DioraamaUlkokuori.Laatu.Normaali ? k.HamaraNormaali : k.HamaraKevyt;
                    string jpg = q == DioraamaUlkokuori.Laatu.Huippu ? k.HamaraJpgHuippu : q == DioraamaUlkokuori.Laatu.Normaali ? k.HamaraJpgNormaali : k.HamaraJpgKevyt;
                    if (astc) return hamara && !string.IsNullOrEmpty(ham) ? ham : paiva;
                    return hamara ? jpg : null;   // muuten glb:n oma kuva
                }
                Lisaa(k.Kevyt); Lisaa(Tekstuuri(DioraamaUlkokuori.Laatu.Kevyt));
                var tavoite = DioraamaUlkokuori.Valittu;
                if (tavoite != DioraamaUlkokuori.Laatu.Kevyt) { Lisaa(Polku(tavoite)); Lisaa(Tekstuuri(tavoite)); }
                var d = k.Detalji;
                if (d != null)
                {
                    Lisaa(d.Maski);
                    for (int c = 0; c < 4; c++)
                    {
                        var (diff, nor, _) = c < d.Kanavat.Count ? d.Kanavat[c] : (null, null, 2.0);
                        var (diffAstc, norAstc, keski) = c < d.KanavatAstc.Count ? d.KanavatAstc[c] : (null, null, (double?)null);
                        bool kaytaAstc = keski.HasValue && astc;
                        Lisaa(kaytaAstc ? diffAstc : diff);
                        if (DioraamaLaatu.Taysi) Lisaa(kaytaAstc ? norAstc : nor);
                    }
                }
            }
            foreach (var t in r.Tilat)
            {
                Lisaa(t.GlbTiedosto);
                if (!string.IsNullOrEmpty(t.ValoAtlas))
                {
                    bool h = hamara && !string.IsNullOrEmpty(t.HamaraAtlas);
                    string atlas = h ? t.HamaraAtlas : t.ValoAtlas, puoli = h ? t.HamaraAtlasPuoli : t.ValoAtlasPuoli;
                    string astcT = h ? t.HamaraAtlasAstc : t.ValoAtlasAstc, astcP = h ? t.HamaraAtlasAstcPuoli : t.ValoAtlasAstcPuoli;
                    bool p = pieni && !string.IsNullOrEmpty(puoli);
                    string astcPolku = p ? astcP : astcT;
                    Lisaa(astc && !string.IsNullOrEmpty(astcPolku) ? astcPolku : p ? puoli : atlas);
                }
                foreach (var e in t.Esineet) Lisaa(e.Tiedosto);
                if (t.Hahmot != null && r.Henkilot != null)
                    foreach (var hahmo in t.Hahmot)
                        if (r.Henkilot.TryGetValue(hahmo.HenkiloId, out var henkilo)) Lisaa(henkilo.Malli3d?.NatiiviGlb);
            }
            if (r.Pinnat != null)
                foreach (var pinta in r.Pinnat.Values) Lisaa(pieni && !string.IsNullOrEmpty(pinta.TekstuuriPuoli) ? pinta.TekstuuriPuoli : pinta.Tekstuuri);
            if (r.Liekit != null)
                foreach (var liekki in r.Liekit.Values) Lisaa(liekki.Atlas);
            return l;
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
