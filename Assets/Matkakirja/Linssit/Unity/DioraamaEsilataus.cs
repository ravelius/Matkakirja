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
        // LAUKAISIN (omistaja 4.10. 14.5x: "linna olisi hyvä esiladata jo siinä vaiheessa kun pelaaja lähestyy sitä"; Päätoimittaja
        // 4.10.): A) pelaajan kaupunki tai matkan kohde (PeliOhjain.SaapuminenTiedossa) on Suomessa (Pietari ei yksinään), tai
        // B) kartta katsoo linnan seutua: Olavinlinnan paikka on ruudulla ja kamera enintään NakymaKm päässä. Myös testikomento
        // "esilataa linna". Valmistumisen etumatka saapumiseen kirjataan (MatkaPerilla, suomalainen kaupunki).
        const double LinnaLat = 61.8644, LinnaLon = 28.9003, NakymaKm = 600;
        static readonly HashSet<string> SuomalaisetKaupungit = new HashSet<string>(StringComparer.Ordinal) { "helsinki", "tampere", "turku", "savonlinna" };
        static PeliOhjain kytketty;
        static float valmisHetki = -1f;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { kytketty = null; aloitettu = false; valmisHetki = -1f; Tila = "ei aloitettu"; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista() => Esilataaja.AjaTaustalla(Seuraa());

        static IEnumerator Seuraa()
        {
            var odotus = new WaitForSecondsRealtime(2f);
            while (true)
            {
                var o = PeliOhjain.Instanssi;
                if (o != kytketty)
                {
                    if (kytketty != null) { kytketty.SaapuminenTiedossa -= KohdeTiedossa; kytketty.MatkaPerilla -= Perilla; }
                    kytketty = o;
                    if (o != null) { o.SaapuminenTiedossa += KohdeTiedossa; o.MatkaPerilla += Perilla; }
                }
                if (!aloitettu && o != null && Lahella(o.PelaajanKaupunki)) Aloita("pelaaja Suomessa: " + o.PelaajanKaupunki);
                if (!aloitettu && LinnaNakyy()) Aloita("linnan seutu kartalla");
                yield return odotus;
            }
        }

        static bool Lahella(string kaupunki)
        {
            if (kaupunki == null) return false;
            if (SuomalaisetKaupungit.Contains(kaupunki)) return true;
            var v = kytketty?.Verkko;
            if (v == null || !v.Kaupungit.TryGetValue(kaupunki, out var k)) return false;
            string maa = k.Maa ?? "";
            return maa == "FI" || maa == "FIN" || maa.Equals("Suomi", StringComparison.OrdinalIgnoreCase) || maa.Equals("Finland", StringComparison.OrdinalIgnoreCase);
        }

        static PalloKierto kierto;
        /// <summary>B: Olavinlinnan paikka ruudulla ja kamera enintään NakymaKm päässä (kartta katsoo linnan seutua).</summary>
        static bool LinnaNakyy()
        {
            if (kierto == null) kierto = UnityEngine.Object.FindAnyObjectByType<PalloKierto>();
            if (kierto == null || !kierto.RuutuPiste(LinnaLat, LinnaLon, out _)) return false;
            double d = kierto.Etaisyys(LinnaLat, LinnaLon);
            return !double.IsNaN(d) && d <= NakymaKm * 1000;
        }

        static void KohdeTiedossa(string kaupunki) { if (!aloitettu && Lahella(kaupunki)) Aloita("matkan kohde: " + kaupunki); }

        static void Perilla(string kaupunki)
        {
            if (!Lahella(kaupunki)) return;
            Debug.Log("MATKAKIRJA linssit: dioraama: esilataus saavuttaessa " + kaupunki + ": " +
                      (valmisHetki >= 0 ? $"valmis {Time.realtimeSinceStartup - valmisHetki:F0} s ennen saapumista" : aloitettu ? "kesken (" + Tila + ")" : "ei aloitettu"));
        }

        /// <summary>Käynnistää esilatauksen taustalla (kerran käynnistystä kohti).</summary>
        public static void Aloita(string syy)
        {
            if (aloitettu) return;
            Debug.Log("MATKAKIRJA linssit: dioraama: esilataus alkaa (" + syy + ")");
            Esilataaja.AjaTaustalla(Kuori(t => Debug.Log("MATKAKIRJA linssit: " + t)));
        }

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

            // Sama istunnon osoitin kuin linssillä (sisältövarasto 4.10.: osoittimen vaihto kesken ei enää mitätöi esilatausta).
            string polku = null;
            yield return DioraamaLevyvalimuisti.LueOsoitin(juuri, pv => polku = pv);
            if (string.IsNullOrEmpty(polku)) { Loppu(kirjaa, "virhe: uusin.json", alku); yield break; }
            string paketti = juuri + polku.TrimEnd('/') + "/";
            DioraamaLevyvalimuisti.Aseta(juuri, polku.Trim('/'));
            yield return DioraamaLevyvalimuisti.Valmistele(kirjaa);

            string json = null;
            yield return Teksti(paketti + "rakennus.json", t => json = t);
            Rakennus rakennus = null;
            try { rakennus = json != null ? DioraamaData.Lue(json) : null; } catch (Exception) { rakennus = null; }
            var kuori = rakennus?.Ulkokuori;
            if (kuori == null || string.IsNullOrEmpty(kuori.Kevyt)) { Loppu(kirjaa, "virhe: rakennus.json ilman kevyttä kuorta", alku); yield break; }

            // Koko laitekohtainen paketti levylle tärkeysjärjestyksessä (kevyt kuori ensin). Omistaja 4.10.: sama kaikilla verkoilla,
            // ei verkkotyypin ehtoja. Ympäristö (maasto, puut, aluskasvit; iPadilla ~29 Mt) latautuu linssin avauksessa.
            var tiedostot = Tiedostot(rakennus);
            // Ympäristö (Päätoimittaja 4.10.: esiladattu avaus ei odota verkkoa lainkaan) rakennus.jsonin ymparisto-puusta.
            try { foreach (var yp in YmparistonTiedostot(Matkakirja.Peli.MiniJson.Jasenna(json) as Dictionary<string, object>, rakennus)) if (!tiedostot.Contains(yp)) tiedostot.Add(yp); }
            catch (Exception e) { kirjaa?.Invoke("dioraama: esilataus: ympäristön luettelo ei onnistunut: " + e.Message); }
            int ok = 0, virheita = 0;
            foreach (var polkuP in tiedostot)
            {
                bool onnistui = false;
                yield return DioraamaLevyvalimuisti.Esilataa(paketti + polkuP, 300, b => onnistui = b);
                if (onnistui) ok++; else virheita++;
            }
            valmisHetki = Time.realtimeSinceStartup;
            Loppu(kirjaa, $"valmis: {ok}/{tiedostot.Count} tiedostoa levyllä{(virheita > 0 ? $", {virheita} epäonnistui" : "")}", alku);
            if (virheita == 0) DioraamaLevyvalimuisti.SiivoaVanhat(kirjaa);
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
                    // Päivän JPEG-vara (tekstuurit.jpg, 4.10.) kuten DioraamaUlkokuori; puuttuva = glb:n oma kuva.
                    string paivaJpg = q == DioraamaUlkokuori.Laatu.Huippu ? k.JpgHuippu : q == DioraamaUlkokuori.Laatu.Normaali ? k.JpgNormaali : k.JpgKevyt;
                    return hamara && !string.IsNullOrEmpty(jpg) ? jpg : string.IsNullOrEmpty(paivaJpg) ? null : paivaJpg;
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

        /// <summary>Ympäristön tiedostot (DioraamaYmparisto.Lataa): maaston glb ja päivän orto vain laitteen tasolta (puhelimessa huipun
        /// orto normaalina); muut (puut, puukortit, horisontti, taivas, syvyys, splat, maastokerrokset, aluskasvit)
        /// kaikki, koska ne ovat pieniä ja osa valitaan vasta ajossa (taivaan tunnelma).</summary>
        static List<string> YmparistonTiedostot(Dictionary<string, object> juuriJson, Rakennus r)
        {
            var l = new List<string>();
            if (juuriJson == null || !juuriJson.TryGetValue("ymparisto", out var yo) || !(yo is Dictionary<string, object> y)) return l;
            string taso = DioraamaUlkokuori.Valittu.ToString().ToLowerInvariant();
            bool puhelin = SystemInfo.deviceModel != null && SystemInfo.deviceModel.StartsWith("iPhone");
            string ortoTaso = taso == "huippu" && puhelin ? "normaali" : taso;
            void Keraa(object o, string polku)
            {
                if (o is Dictionary<string, object> d) { foreach (var kv in d) Keraa(kv.Value, polku + "." + kv.Key); return; }
                if (o is List<object> lista) { foreach (var v in lista) Keraa(v, polku + "[]"); return; }
                if (!(o is string p) || p.IndexOf('/') < 0 || p.LastIndexOf('.') < p.LastIndexOf('/')) return;
                if (polku == ".huippu" || polku == ".normaali" || polku == ".kevyt") { if (polku == "." + taso) l.Add(p); return; }
                // Orto: DioraamaYmparisto käyttää aina päivän ortoa (iPad 4.10.: hämäräorto esiladattu turhaan, 8k-päiväorto verkosta).
                if (polku.StartsWith(".hamara.orto.", StringComparison.Ordinal)) return;
                if (polku.StartsWith(".orto.", StringComparison.Ordinal))
                {
                    string q = polku.Substring(polku.LastIndexOf('.') + 1);
                    if (q == ortoTaso) l.Add(p);
                    return;
                }
                l.Add(p);
            }
            Keraa(y, "");
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
