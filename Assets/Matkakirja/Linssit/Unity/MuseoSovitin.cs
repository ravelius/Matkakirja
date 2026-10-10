// TAIDEMUSEO-LINSSI (Linssiseppä 10.10.2026; PT 09.5x, omistaja: "aloita samalla se taidemuseon tekeminen, se on tärkeämpi
// projekti"; Raamattu TAIDEMUSEO-LINSSI, MAITTAIN, ALANKOMAAT ENSIN, ESITYSMOOTTORI). Ensimmäinen pelattava pala: Alankomaiden
// sali (Linnanrakentajan sali.json, väliaikaishalli kunnes sali-lod*.glb tulee) ja 20 Rijksmuseumin teosta todellisessa koossa
// (paikkakuvat, kunnes Sisältökirjurin sisältöpaketti tuo kuvat). Kuten kuumailmapallossa: valmis esittelykierros (MuseoKierros:
// Linnanrakentajan reitti, tauko/seuraava/edellinen), vapaa kulku (SeikkailuTapit: vasen tappi liike, veto katse) ja teoksen
// esittely napista (MuseoTaulu, KORTTI-pohja). Näyttämö dioraaman tapaan omassa kerroksessa ja kuvassa (MuseoNayttamo).
// Testikomennot (linssi-komento.txt): "linssi taidemuseo" avaa; "museo tila|kierros|vapaa|seuraava|edellinen|tauko 0|1|
// siirry <n>|esittele [0|1]|liiku <eteen> <sivulle> <kääntö> <s>|katse <yaw> <pitch>|valotus <ev>|huone [0|1]|sali glb|halli|lod0|lod1|auto"; "museo kuvajuuri <url|pois>", "museo astc pois".
using System;
using System.Collections.Generic;
using System.Globalization;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Museo;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class MuseoSovitin : ILinssi
    {
        public const string Ikoni = "<path d=\"M3 20.5h18M4.5 20.5V10M19.5 20.5V10M3 10h18L12 4.5z\"/><path d=\"M7.5 12.5h4v5h-4zM13.5 12.5h3v3h-3z\"/>";
        public static readonly LinssiTiedot MuseoTiedot = new LinssiTiedot
        {
            Id = "taidemuseo",
            Nimi = "Taidemuseo",
            Lyhyt = "Alankomaiden sali: Rembrandt, Vermeer ja Hals oikeassa koossaan.",
            Jarjestys = 255,
            Ikoni = Ikoni,
            Kesken = true,
        };

        /// <summary>UI (MuseoTaulu): avoinna oleva linssi tai null; Vaihtui kun avautuu, sulkeutuu tai vaihe/kohta muuttuu.</summary>
        public static MuseoSovitin Aktiivinen { get; private set; }
        public static event Action Vaihtui;
        /// <summary>Esittelykortti auki (napista tai komennolla "museo esittele").</summary>
        public static bool EsittelyAuki { get; private set; }
        /// <summary>Huonekortti auki (vain pelaajan napautuksesta tai komennolla "museo huone 1"; ei koskaan automaattisesti).</summary>
        public static bool HuoneKorttiAuki { get; private set; }
        /// <summary>Kävelijä tuli uuteen huoneeseen (myös avauksessa): UI näyttää nimen ~3 s ja häivyttää (kuten elävän oppaan paikan nimi).</summary>
        public static event Action<Huone> HuoneVaihtui;
        /// <summary>Maan juuri: teokset.json:n kuva.paketti (ASTC, Natiiviseppä) ja kuva.seina_lahde (JPEG-vara, Sisältökirjuri) sen alla;
        /// null = paikkakuvat. Testissä "museo kuvajuuri file:///…/alankomaat/" tai "pois".</summary>
        public static string KuvaJuuri = "https://media.matkakirja.app/taidemuseo/alankomaat/";
        /// <summary>ASTC-seinätaso ja yksityiskohtaruudut (MuseoTekstuurit); false = vain JPEG-seinäkuvat ("museo astc pois").</summary>
        public static bool Astc = true;
        /// <summary>LR:n sali-GLB väliaikaishallin tilalle (KuvaJuuri + "sali-v1/"); false = väliaikaishalli ("museo sali halli").</summary>
        public static bool SaliGlb = true;
        /// <summary>Sali-GLB:n taso: 0 = 13 k kolmiota + atlas 4096² (22 Mt), 1 = 7,8 k + 2048² (5,6 Mt); −1 = laitteen muistin mukaan.</summary>
        public static int SaliLod = -1;
        static int SaliTaso => SaliLod >= 0 ? SaliLod : SystemInfo.systemMemorySize >= 7000 ? 0 : 1;

        readonly LinssiOhjain o;
        readonly PalloKierto kierto;
        readonly Func<bool> nakymaPeitto;
        ILinssiYmparisto y;
        MuseoNayttamo nayttamo;
        MuseoRakennus rakennus;
        MuseoTekstuurit tekstuurit;
        MuseoVeistokset veistokset;
        readonly List<string> teosjarjestys = new List<string>();
        /// <summary>ASTC-paketittomat teokset JPEG-varalle yksi kerrallaan (purettu alkuperäinen ei kasaudu muistiin).</summary>
        readonly Queue<string> jpgJono = new Queue<string>();
        bool jpgKaynnissa;
        Sali sali;
        public MuseoKierros Kierros { get; private set; }
        int naytettyVersio = -1;
        float viimeLoki;

        public MuseoSovitin(LinssiOhjain o, PalloKierto kierto)
        {
            this.o = o;
            this.kierto = kierto;
            nakymaPeitto = () => Auki;
        }

        public LinssiTiedot Tiedot => MuseoTiedot;
        public bool Auki { get; private set; }
        public Sali Sali => sali;
        /// <summary>Teos, jonka kortti esittelynapista avautuu (pysähdyksen teos tai vapaassa tilassa katsottu).</summary>
        public Ripustus Teos => Kierros?.NykyinenTeos;
        /// <summary>Huone, jossa kävelijä on (huoneet.json); null = ei huonetekstejä.</summary>
        public Huone NykyinenHuone { get; private set; }

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            y = ymparisto;
            var t0 = Time.realtimeSinceStartup;
            var saliJson = Resources.Load<TextAsset>("Museo/alankomaat/sali");
            var teoksetJson = Resources.Load<TextAsset>("Museo/alankomaat/teokset");
            if (saliJson == null || teoksetJson == null) { o.Kirjaa("museo: sali.json tai teokset.json puuttuu"); return; }
            try { sali = Sali.Lue(saliJson.text, teoksetJson.text); }
            catch (Exception e) { o.Kirjaa("museo: sali virheellinen: " + e.Message); return; }
            finally { Resources.UnloadAsset(saliJson); Resources.UnloadAsset(teoksetJson); }
            var huoneetJson = Resources.Load<TextAsset>("Museo/alankomaat/huoneet");
            if (huoneetJson != null)
            {
                try { sali.LueHuoneet(huoneetJson.text); }
                catch (Exception e) { o.Kirjaa("museo: huoneet.json virheellinen: " + e.Message); }
                Resources.UnloadAsset(huoneetJson);
            }
            NykyinenHuone = null; HuoneKorttiAuki = false;
            var veistoksetJson = Resources.Load<TextAsset>("Museo/alankomaat/veistokset");
            if (veistoksetJson != null)
            {
                try { o.Kirjaa($"museo: veistoksia sijoitettu {sali.LueVeistokset(veistoksetJson.text)}/{sali.Jalustat.Count}"); }
                catch (Exception e) { o.Kirjaa("museo: veistokset.json virheellinen: " + e.Message); }
                Resources.UnloadAsset(veistoksetJson);
            }

            Auki = true;
            Aktiivinen = this;
            SyoteLukko.LisaaNakymaPeitto(nakymaPeitto);
            if (kierto != null) SyoteLukko.Esta(this);
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            y.Taustaaani(null);

            var pallonKamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            nayttamo = MuseoNayttamo.Luo(pallonKamera);
            rakennus = new MuseoRakennus(nayttamo.transform);
            if (!rakennus.Varjostin) o.Kirjaa("museo: MuseoValaistu-varjostin puuttuu tai ei tuettu");
            rakennus.Rakenna(sali);
            nayttamo.AsetaKeilat(sali);
            if (SaliGlb && !string.IsNullOrEmpty(KuvaJuuri)) o.StartCoroutine(rakennus.LataaSali(KuvaJuuri, SaliTaso, o.Kirjaa));
            // ASTC (MuseoTekstuurit) on ensisijainen; JPEG vain sen puuttuessa, ettei myöhässä valmistuva JPEG ylikirjoita seinätasoa.
            if (!Astc && !string.IsNullOrEmpty(KuvaJuuri)) o.StartCoroutine(rakennus.LataaKuvat(sali, KuvaJuuri, o.Kirjaa));
            Kierros = new MuseoKierros(sali);
            teosjarjestys.Clear();
            foreach (int i in Kierros.Pysahdykset) teosjarjestys.Add(sali.HaeRipustus(sali.Reitti[i].Kohde)?.Teos.Id);
            tekstuurit = nayttamo.gameObject.AddComponent<MuseoTekstuurit>();
            // Paketit teoskohtaisesti kuva.paketista (Kuvapaikka.Paketti); kunnes MuseoTekstuurit lukee sen, juuri + "astc-v1/" + id.
            tekstuurit.Juuri = Astc && KuvaJuuri != null ? KuvaJuuri + "astc-v1/" : null;
            tekstuurit.MaaJuuri = Astc ? KuvaJuuri : null;
            tekstuurit.Kirjaa = o.Kirjaa;
            tekstuurit.Paikka = id => id != null && rakennus != null && rakennus.Kuvapaikat.TryGetValue(id, out var kp) ? kp : null;
            tekstuurit.EiPakettia = JpgVaralle;
            veistokset = nayttamo.gameObject.AddComponent<MuseoVeistokset>();
            veistokset.Juuri = KuvaJuuri != null && rakennus.Veistospaikat.Count > 0 ? KuvaJuuri + "astc-v1/patsaat/" : null;
            veistokset.Paikat = () => rakennus?.Veistospaikat;
            veistokset.Pohjamateriaali = () => rakennus?.VeistosPohja;
            veistokset.Kirjaa = o.Kirjaa;
            SeikkailuTapit.MuseoKavely = () => Auki && Kierros != null && Kierros.Vaihe == MuseoVaihe.Vapaa;
            EsittelyAuki = false;
            o.Kirjaa($"museo: auki {sali.Nimi}: {sali.Osat.Count} osaa, {sali.Ripustukset.Count} teosta, {Kierros.Pysahdykset.Count} pysähdystä, " +
                     $"{rakennus.Kolmioita} kolmiota, {(Time.realtimeSinceStartup - t0) * 1000:F0} ms");
            Vaihtui?.Invoke();
        }

        public void Paivita()
        {
            if (!Auki || Kierros == null) return;
            float dt = Mathf.Min(Time.unscaledDeltaTime, 0.1f);
            if (Kierros.Vaihe == MuseoVaihe.Vapaa)
            {
                var liike = SeikkailuTapit.Vasen;
                var katse = SeikkailuTapit.OtaKatse();
                // Veto: sormi oikealle → katse vasemmalle (SeikkailuTapit: asteina valmiiksi), muunnetaan osuudeksi VapaaKaantoAs:sta.
                double kaanto = dt > 0 ? -katse.x / (MuseoKierros.VapaaKaantoAs * dt) : 0, nosto = dt > 0 ? katse.y / (MuseoKierros.VapaaKaantoAs * dt) : 0;
                Kierros.VapaaLiike(liike.y, liike.x, kaanto, nosto, dt);
            }
            else Kierros.Paivita(dt);
            nayttamo.Paivita(sali, Kierros.Nykyinen, dt);
            tekstuurit?.Paivita(nayttamo.Kamera, Kierros.NykyinenTeos?.Teos.Id, teosjarjestys, Kierros.Kohta);
            veistokset?.Paivita(nayttamo.Kamera);
            var huone = sali.HuonePisteessa(Kierros.Nykyinen.P, NykyinenHuone);
            if (huone != NykyinenHuone)
            {
                NykyinenHuone = huone;
                if (HuoneKorttiAuki) HuoneKortti(false);   // vanhan huoneen kortti ei jää auki uuteen huoneeseen
                o.Kirjaa($"museo: huone {huone?.Id ?? "-"} {huone?.Nimi}");
                HuoneVaihtui?.Invoke(huone);
                Vaihtui?.Invoke();
            }
            if (Kierros.Versio != naytettyVersio)
            {
                naytettyVersio = Kierros.Versio;
                var r = Kierros.NykyinenTeos;
                o.Kirjaa($"museo: {Kierros.Vaihe}{(Kierros.Tauolla ? " (tauko)" : "")} {Kierros.Kohta + 1}/{Kierros.Pysahdykset.Count}" +
                         (r != null ? $" {r.Teos.Id} {r.Teos.Otsikko} ({r.Paikka.Id})" : ""));
                Vaihtui?.Invoke();
            }
            if (Time.realtimeSinceStartup - viimeLoki > 5f && Kierros.Vaihe == MuseoVaihe.Vapaa)
            {
                viimeLoki = Time.realtimeSinceStartup;
                Vaihtui?.Invoke();   // katsottu teos vaihtuu ilman vaihetta
            }
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            if (Aktiivinen == this) Aktiivinen = null;
            EsittelyAuki = false; HuoneKorttiAuki = false; NykyinenHuone = null;
            SeikkailuTapit.MuseoKavely = null;
            tekstuurit?.Vapauta(); tekstuurit = null;
            veistokset?.Vapauta(); veistokset = null;
            jpgJono.Clear();
            rakennus?.Tuhoa(); rakennus = null;
            nayttamo?.Tuhoa(); nayttamo = null;
            Kierros = null; sali = null; naytettyVersio = -1;
            SyoteLukko.PoistaNakymaPeitto(nakymaPeitto);
            if (kierto != null) SyoteLukko.Vapauta(this);
            y?.Pelikerrokset(true);
            y?.MusiikkiPitoon(false);
            y?.Taustaaani(null);
            Vaihtui?.Invoke();
        }

        // UI:n napit (MuseoTaulu).
        public static void Tauko() { var k = Aktiivinen?.Kierros; if (k == null) return; if (k.Vaihe == MuseoVaihe.Vapaa) k.Kierrokselle(); else k.Tauko(!k.Tauolla); }
        public static void Seuraava() => Aktiivinen?.Kierros?.Seuraava();
        public static void Edellinen() => Aktiivinen?.Kierros?.Edellinen();
        public static void VapaaTaiKierros() { var k = Aktiivinen?.Kierros; if (k == null) return; if (k.Vaihe == MuseoVaihe.Vapaa) k.Kierrokselle(); else k.Vapaa(); }
        public static void Esittele(bool? auki = null)
        {
            if (Aktiivinen == null) return;
            EsittelyAuki = auki ?? !EsittelyAuki;
            if (EsittelyAuki) HuoneKorttiAuki = false;
            // Esittelyn ajaksi kierros pysähtyy teoksen ääreen (pallon tapaan), sulkiessa jatkuu.
            var k = Aktiivinen.Kierros;
            if (k != null && k.Vaihe != MuseoVaihe.Vapaa) k.Tauko(EsittelyAuki);
            Vaihtui?.Invoke();
        }

        /// <summary>Huonekortti (KORTTI-pohja, NUI): vain pelaajan napautuksesta nimikyltistä. Kierros pysähtyy kuten esittelyssä.</summary>
        public static void HuoneKortti(bool? auki = null)
        {
            if (Aktiivinen?.NykyinenHuone == null) { HuoneKorttiAuki = false; return; }
            bool oli = HuoneKorttiAuki;
            HuoneKorttiAuki = auki ?? !HuoneKorttiAuki;
            if (HuoneKorttiAuki) EsittelyAuki = false;
            var k = Aktiivinen.Kierros;
            if (oli != HuoneKorttiAuki && k != null && k.Vaihe != MuseoVaihe.Vapaa) k.Tauko(HuoneKorttiAuki);
            Vaihtui?.Invoke();
        }

        public string Tila()
        {
            if (!Auki || Kierros == null) return "museo: kiinni";
            var r = Kierros.NykyinenTeos; var a = Kierros.Nykyinen;
            return $"museo: {Kierros.Vaihe}{(Kierros.Tauolla ? " tauko" : "")} {Kierros.Kohta + 1}/{Kierros.Pysahdykset.Count}, paikka {a.P}, suunta {a.Suunta}, " +
                   $"osa {sali.OsaPisteessa(a.P)?.Id ?? "-"}, teos {(r == null ? "-" : r.Teos.Id + " " + r.Teos.Otsikko)}, esittely {(EsittelyAuki ? "auki" : "kiinni")}, huone {NykyinenHuone?.Id ?? "-"}{(HuoneKorttiAuki ? " (kortti)" : "")}, valotuskorjaus {MuseoNayttamo.ValotusKorjausEv:+0.0;-0.0} EV";
        }

        static double L(string s) => double.Parse(s, CultureInfo.InvariantCulture);

        void JpgVaralle(string id)
        {
            if (!Auki || string.IsNullOrEmpty(KuvaJuuri)) return;
            jpgJono.Enqueue(id);
            if (!jpgKaynnissa) o.StartCoroutine(AjaJpgJono());
        }

        System.Collections.IEnumerator AjaJpgJono()
        {
            jpgKaynnissa = true;
            while (Auki && rakennus != null && jpgJono.Count > 0) yield return rakennus.LataaKuvat(sali, KuvaJuuri, o.Kirjaa, jpgJono.Dequeue());
            jpgKaynnissa = false;
        }

        /// <summary>Testikomennot "museo …" (LinssiOhjain.Suorita).</summary>
        public void Komento(string[] osat)
        {
            string k = osat.Length > 1 ? osat[1] : "tila";
            if (k == "kuvajuuri")
            {
                KuvaJuuri = osat.Length > 2 && osat[2] != "pois" ? (osat[2].EndsWith("/") ? osat[2] : osat[2] + "/") : null;
                o.Kirjaa("museo: kuvajuuri " + (KuvaJuuri ?? "pois (paikkakuvat)") + (Auki ? " (voimaan seuraavassa avauksessa)" : ""));
                return;
            }
            if (k == "sali")
            {
                string a = osat.Length > 2 ? osat[2] : "";
                if (a == "halli") SaliGlb = false; else if (a == "glb") SaliGlb = true;
                else if (a == "lod0" || a == "lod1") { SaliGlb = true; SaliLod = a[3] - '0'; }
                else if (a == "auto") SaliLod = -1;
                o.Kirjaa($"museo: sali {(SaliGlb ? "glb lod" + SaliTaso : "väliaikaishalli")}{(rakennus?.SaliGlb == true ? " (nyt glb)" : "")}" + (Auki ? " (voimaan seuraavassa avauksessa)" : ""));
                return;
            }
            if (k == "astc")
            {
                Astc = osat.Length < 3 || osat[2] != "pois";
                o.Kirjaa("museo: astc " + (Astc ? "päällä" : "pois (vain JPEG-seinäkuvat)") + (Auki ? " (voimaan seuraavassa avauksessa)" : ""));
                return;
            }
            if (!Auki && k != "tila") { o.Kirjaa("museo: linssi ei ole auki (linssi taidemuseo)"); return; }
            switch (k)
            {
                case "kierros": if (Kierros.Vaihe == MuseoVaihe.Vapaa) Kierros.Kierrokselle(); else Kierros.Tauko(false); break;
                case "vapaa": if (Kierros.Vaihe != MuseoVaihe.Vapaa) Kierros.Vapaa(); break;
                case "seuraava": Kierros.Seuraava(); break;
                case "edellinen": Kierros.Edellinen(); break;
                case "tauko": Kierros.Tauko(osat.Length < 3 || osat[2] != "0"); break;
                case "siirry" when osat.Length > 2: Kierros.Siirry(int.Parse(osat[2], CultureInfo.InvariantCulture) - 1); break;
                case "esittele": Esittele(osat.Length > 2 ? osat[2] != "0" : (bool?)null); break;
                case "huone": HuoneKortti(osat.Length > 2 ? osat[2] != "0" : (bool?)null); break;
                case "liiku" when osat.Length > 5:
                    if (Kierros.Vaihe != MuseoVaihe.Vapaa) Kierros.Vapaa();
                    for (double t = 0, s = L(osat[5]); t < s; t += 0.05) Kierros.VapaaLiike(L(osat[2]), L(osat[3]), L(osat[4]), 0, 0.05);
                    break;
                case "katse" when osat.Length > 3:
                    if (Kierros.Vaihe != MuseoVaihe.Vapaa) Kierros.Vapaa();
                    Kierros.VapaaLiike(0, 0, L(osat[2]) / (MuseoKierros.VapaaKaantoAs * 1.0), L(osat[3]) / (MuseoKierros.VapaaKaantoAs * 1.0), 1.0);
                    break;
                case "valotus" when osat.Length > 2: MuseoNayttamo.ValotusKorjausEv = (float)L(osat[2]); break;
            }
            o.Kirjaa(Tila());
            Vaihtui?.Invoke();
        }
    }
}
