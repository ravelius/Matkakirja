// TAIDEMUSEO-LINSSI (Linssiseppä 10.10.2026; PT 09.5x, omistaja: "aloita samalla se taidemuseon tekeminen, se on tärkeämpi
// projekti"; Raamattu TAIDEMUSEO-LINSSI, MAITTAIN, ALANKOMAAT ENSIN, ESITYSMOOTTORI). Ensimmäinen pelattava pala: Alankomaiden
// sali (Linnanrakentajan sali.json, väliaikaishalli kunnes sali-lod*.glb tulee) ja 20 Rijksmuseumin teosta todellisessa koossa
// (paikkakuvat, kunnes Sisältökirjurin sisältöpaketti tuo kuvat). Kuten kuumailmapallossa: valmis esittelykierros (MuseoKierros:
// Linnanrakentajan reitti, tauko/seuraava/edellinen), vapaa kulku (SeikkailuTapit: vasen tappi liike, veto katse) ja teoksen
// esittely napista (MuseoTaulu, KORTTI-pohja). Näyttämö dioraaman tapaan omassa kerroksessa ja kuvassa (MuseoNayttamo).
// Testikomennot (linssi-komento.txt): "linssi taidemuseo" avaa; "museo tila|kierros|vapaa|seuraava|edellinen|tauko 0|1|
// siirry <n>|paikka <x> <z> <yaw> [pitch]|teos <nro 1…|id>|esittele [0|1]|liiku <eteen> <sivulle> <kääntö> <s>|katse <yaw> <pitch>|valotus <ev>|huone [0|1]|sali glb|halli|lod0|lod1|auto"; "museo kuvajuuri <url|pois>", "museo astc pois".
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
        /// <summary>LR:n sali-GLB väliaikaishallin tilalle (KuvaJuuri + MuseoRakennus.SaliKansio); false = väliaikaishalli ("museo sali halli").</summary>
        public static bool SaliGlb = true;
        /// <summary>Salien taustaääni (Aanisoitin.LinssiTaustat; omistaja 10.10. 22.0x: Belgradin nykytaiteen museo, hiljaisena).</summary>
        public const string SaliAani = "museo-sali";
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

        // --- KERTOJAN TEKSTITYS (PT 11.10. 09.0x, juna 182): oletus POIS (Raamattu PUHE ÄÄNENÄ, EI KUPLINA); pelaaja kytkee Linssivalikon
        // Tekstitys-riviltä (Natiivi-UI: Valikko.NaytaTekstitys(() => MuseoSovitin.TekstitysPaalla, MuseoSovitin.AsetaTekstitys)).
        const string TekstitysAvain = "museo-tekstitys";
        static bool? tekstitys;
        public static bool TekstitysPaalla { get { tekstitys ??= PlayerPrefs.GetInt(TekstitysAvain, 0) == 1; return tekstitys.Value; } }
        public static event Action<bool> TekstitysMuuttui;
        public static void AsetaTekstitys(bool paalla)
        {
            tekstitys = paalla; PlayerPrefs.SetInt(TekstitysAvain, paalla ? 1 : 0); PlayerPrefs.Save();
            LinssiOhjain.Instanssi?.Kirjaa("museo: tekstitys " + (paalla ? "päällä" : "pois"));
            TekstitysMuuttui?.Invoke(paalla);
        }
        /// <summary>Kertojan soiva virke tekstitykseen (null = ei mitään näytettävää: tekstitys pois, kertoja hiljaa tai tauko virkkeiden välissä).</summary>
        public static string KertojanVirke { get; private set; }
        /// <summary>Virke vaihtui (UI päivittää tekstityskaistaleen).</summary>
        public static event Action<string> KertojanVirkeVaihtui;
        int naytettyVersio = -1;
        readonly MuseoKertoja kertoja = new MuseoKertoja();
        int kertojaKohta = -1;
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
            y.Taustaaani(SaliAani);

            var pallonKamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            nayttamo = MuseoNayttamo.Luo(pallonKamera);
            rakennus = new MuseoRakennus(nayttamo.transform);
            if (!rakennus.Varjostin) o.Kirjaa("museo: MuseoValaistu-varjostin puuttuu tai ei tuettu");
            rakennus.Rakenna(sali);
            nayttamo.AsetaKeilat(sali);
            if (SaliGlb && !string.IsNullOrEmpty(KuvaJuuri)) o.StartCoroutine(rakennus.LataaSali(KuvaJuuri, SaliTaso, o.Kirjaa));
            // ASTC (MuseoTekstuurit) on ensisijainen; JPEG vain sen puuttuessa, ettei myöhässä valmistuva JPEG ylikirjoita seinätasoa.
            if (!Astc && !string.IsNullOrEmpty(KuvaJuuri)) o.StartCoroutine(rakennus.LataaKuvat(sali, KuvaJuuri, o.Kirjaa));
            // Teoskierros (PT 11.10. 00.4x): pysähdys jokaisella kertojan teoksella kierros.json:n järjestyksessä; ilman sitä LR:n reitti.
            List<string> kierrosTeokset = null;
            var kierrosJson = Resources.Load<TextAsset>("Museo/alankomaat/kierros");
            if (kierrosJson != null)
            {
                try
                {
                    kierrosTeokset = new List<string>();
                    foreach (var x in Matkakirja.Peli.MiniJson.TaulukkoTaiTyhja(Matkakirja.Peli.MiniJson.Kentta(Matkakirja.Peli.MiniJson.Objekti(Matkakirja.Peli.MiniJson.Jasenna(kierrosJson.text)), "pysahdykset")))
                        if (x is string id) kierrosTeokset.Add(id);
                }
                catch (Exception e) { kierrosTeokset = null; o.Kirjaa("museo: kierros.json virheellinen: " + e.Message); }
                Resources.UnloadAsset(kierrosJson);
            }
            Kierros = new MuseoKierros(sali, kierrosTeokset);
            if (Kierros.Puuttuvat.Count > 0) o.Kirjaa("museo: kierroksen teoksia ei salissa: " + string.Join(", ", Kierros.Puuttuvat));
            if (nayttamo.Kamera != null) Kierros.SovitaPysahdykset(nayttamo.Kamera.aspect);
            teosjarjestys.Clear();
            for (int k = 0; k < Kierros.Pysahdykset.Count; k++) teosjarjestys.Add(sali.HaeRipustus(Kierros.Pysahdys(k).Kohde)?.Teos.Id);
            tekstuurit = nayttamo.gameObject.AddComponent<MuseoTekstuurit>();
            // Paketit teoskohtaisesti kuva.paketista (Kuvapaikka.Paketti); kunnes MuseoTekstuurit lukee sen, juuri + "astc-v1/" + id.
            tekstuurit.Juuri = Astc && KuvaJuuri != null ? KuvaJuuri + "astc-v1/" : null;
            tekstuurit.MaaJuuri = Astc ? KuvaJuuri : null;
            tekstuurit.Kirjaa = o.Kirjaa;
            tekstuurit.Paikka = id => id != null && rakennus != null && rakennus.Kuvapaikat.TryGetValue(id, out var kp) ? kp : null;
            tekstuurit.EiPakettia = JpgVaralle;
            var kaikki = new List<string>();
            foreach (var r in sali.Ripustukset) kaikki.Add(r.Teos.Id);
            tekstuurit.Kaikki = kaikki;
            veistokset = nayttamo.gameObject.AddComponent<MuseoVeistokset>();
            veistokset.Juuri = KuvaJuuri != null && rakennus.Veistospaikat.Count > 0 ? KuvaJuuri + "astc-v1/patsaat/" : null;
            veistokset.Paikat = () => rakennus?.Veistospaikat;
            veistokset.Pohjamateriaali = () => rakennus?.VeistosPohja;
            veistokset.Kirjaa = o.Kirjaa;
            kertojaKohta = -1;
            o.StartCoroutine(kertoja.Lataa(o.Kirjaa));
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
            if (nayttamo.Kamera != null) Kierros.SovitaPysahdykset(nayttamo.Kamera.aspect);   // vain muuttuessa (kierto, avaus)
            nayttamo.Paivita(sali, Kierros.Nykyinen, dt);
            var korostus = Kierros.Vaihe == MuseoVaihe.Pysahtyy ? Kierros.NykyinenTeos : null;
            var (kw, kh) = korostus != null ? Kierros.Ulkomitat(korostus) : (0, 0);
            nayttamo.Korosta(korostus, kw / 2, kh / 2, dt);
            tekstuurit?.Paivita(nayttamo.Kamera, Kierros.NykyinenTeos?.Teos.Id, teosjarjestys, Kierros.Kohta);
            veistokset?.Paivita(nayttamo.Kamera);
            // Kertoja: kierroksen pysähdys soittaa teoksen äänitteen kerran saapuessa ja kestää vähintään sen ajan; matkaan lähtö pysäyttää.
            if (Kierros.Vaihe == MuseoVaihe.Pysahtyy)
            {
                var id = Kierros.NykyinenTeos?.Teos.Id;
                if (kertojaKohta != Kierros.Kohta && kertoja.On(id))
                {
                    kertojaKohta = Kierros.Kohta;
                    if (kertoja.Soita(id, false)) { Kierros.PidennaPysahdys(kertoja.Kesto(id) + 1.5); o.Kirjaa($"museo: kertoja {id} {kertoja.Kesto(id):F0} s"); }
                }
            }
            else if (Kierros.Vaihe == MuseoVaihe.Siirtyy) { kertojaKohta = -1; kertoja.Pysayta(); }
            PaivitaVirke();
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

        void PaivitaVirke()
        {
            string v = null, soiva = kertoja.Soiva;
            if (TekstitysPaalla && soiva != null)
            {
                if (kertoja.TarvitseeLatauksen(soiva)) o.StartCoroutine(kertoja.LataaTekstitys(soiva, o.Kirjaa));
                var p = Puhe.Instanssi;
                if (p != null && p.Soi) v = kertoja.Tekstitys(soiva)?.Virke(p.Aika);
            }
            if (v == KertojanVirke) return;
            KertojanVirke = v;
            if (v != null) o.Kirjaa("museo: virke " + (v.Length > 48 ? v.Substring(0, 48) + "…" : v));   // QA: tekstitys soi tahdissa
            KertojanVirkeVaihtui?.Invoke(v);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            if (KertojanVirke != null) { KertojanVirke = null; KertojanVirkeVaihtui?.Invoke(null); }
            if (Aktiivinen == this) Aktiivinen = null;
            EsittelyAuki = false; HuoneKorttiAuki = false; NykyinenHuone = null;
            kertoja.Pysayta();
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
        /// <summary>Zoom (omistaja 11.10. 12.4x): suurennuslasi vaihtaa, nipistys asettaa; veto tutkii teosta zoomissa.</summary>
        public static void Zoom() { var k = Aktiivinen?.Kierros; k?.AsetaZoom(!k.Zoom); }
        public static void Zoom(bool paalla) => Aktiivinen?.Kierros?.AsetaZoom(paalla);
        public static void ZoomVeda(double dx, double dy) => Aktiivinen?.Kierros?.ZoomVeda(dx, dy);
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

        /// <summary>Esittelynappi: teoksella on kertojan äänite → soi (pyynnöstä, myös vapaassa kulussa) ja true; muuten false (kortin lukija).</summary>
        public static bool KertojaEsittelee()
        {
            var a = Aktiivinen; var id = a?.Teos?.Teos.Id;
            if (a == null || !a.kertoja.On(id)) return false;
            a.kertoja.Soita(id, true);
            return true;
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
                   $"osa {sali.OsaPisteessa(a.P)?.Id ?? "-"}, teos {(r == null ? "-" : r.Teos.Id + " " + r.Teos.Otsikko)}, esittely {(EsittelyAuki ? "auki" : "kiinni")}, tekstitys {(TekstitysPaalla ? "päällä" : "pois")}, huone {NykyinenHuone?.Id ?? "-"}{(HuoneKorttiAuki ? " (kortti)" : "")}, valotuskorjaus {MuseoNayttamo.ValotusKorjausEv:+0.0;-0.0} EV";
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
            if (k == "heijastus")
            {
                if (osat.Length > 2 && (osat[2] == "0" || osat[2] == "1")) MuseoNayttamo.HeijastusPaalla = osat[2] == "1";
                else if (osat.Length > 3 && osat[2] == "voima" && float.TryParse(osat[3].Replace(',', '.'), System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out float v))
                    MuseoNayttamo.HeijastusVoima = Mathf.Clamp(v, 0f, 4f);
                o.Kirjaa("museo: " + (nayttamo != null ? nayttamo.HeijastusTila : $"heijastus {(MuseoNayttamo.HeijastusPaalla ? "päällä" : "pois")}"));
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
                case "himmennys" when osat.Length > 2: MuseoNayttamo.HimmennysPaalla = osat[2] != "0"; o.Kirjaa("museo: himmennys " + (MuseoNayttamo.HimmennysPaalla ? "päällä" : "pois")); break;
                case "tekstitys" when osat.Length > 2: AsetaTekstitys(osat[2] == "1" || osat[2] == "paalla"); break;
                case "siirry" when osat.Length > 2: Kierros.Siirry(int.Parse(osat[2], CultureInfo.InvariantCulture) - 1); break;
                case "esittele": Esittele(osat.Length > 2 ? osat[2] != "0" : (bool?)null); break;
                // QA (zoom, omistaja 11.10. 12.4x): "zoom 1|0" kuten suurennuslasi, "zoomveda dx dy" sormen siirto ruudun osuuksina.
                case "zoom": Kierros.AsetaZoom(osat.Length < 3 || osat[2] != "0"); o.Kirjaa($"museo: zoom {(Kierros.Zoom ? "päällä" : "pois")}"); break;
                case "zoomveda" when osat.Length > 3: Kierros.ZoomVeda(L(osat[2]), L(osat[3])); o.Kirjaa($"museo: zoomveto {Kierros.Nykyinen}"); break;
                case "huone": HuoneKortti(osat.Length > 2 ? osat[2] != "0" : (bool?)null); break;
                case "liiku" when osat.Length > 5:
                    if (Kierros.Vaihe != MuseoVaihe.Vapaa) Kierros.Vapaa();
                    for (double t = 0, s = L(osat[5]); t < s; t += 0.05) Kierros.VapaaLiike(L(osat[2]), L(osat[3]), L(osat[4]), 0, 0.05);
                    break;
                case "katse" when osat.Length > 3:
                    if (Kierros.Vaihe != MuseoVaihe.Vapaa) Kierros.Vapaa();
                    Kierros.VapaaLiike(0, 0, L(osat[2]) / (MuseoKierros.VapaaKaantoAs * 1.0), L(osat[3]) / (MuseoKierros.VapaaKaantoAs * 1.0), 1.0);
                    break;
                case "teos" when osat.Length > 2:
                    {
                        var r = int.TryParse(osat[2], NumberStyles.Integer, CultureInfo.InvariantCulture, out int nro) && nro >= 1 && nro <= sali.Ripustukset.Count
                            ? sali.Ripustukset[nro - 1] : sali.Ripustukset.Find(x => x.Teos.Id == osat[2]);
                        if (r == null || !Kierros.NaytaTeos(r)) o.Kirjaa($"museo: teos {osat[2]} ei katseluasentoa");
                        else o.Kirjaa($"museo: teos {r.Teos.Id} {r.Teos.Otsikko} ({r.Paikka.Id}) katseluasento {Kierros.Nykyinen}");
                    }
                    break;
                case "paikka" when osat.Length > 4:
                    if (!Kierros.Aseta(L(osat[2]), L(osat[3]), L(osat[4]), osat.Length > 5 ? L(osat[5]) : 0)) o.Kirjaa($"museo: paikka {osat[2]} {osat[3]} ei sallittu");
                    break;
                case "valotus" when osat.Length > 2: MuseoNayttamo.ValotusKorjausEv = (float)L(osat[2]); break;
            }
            o.Kirjaa(Tila());
            Vaihtui?.Invoke();
        }
    }

    /// <summary>
    /// TAIDEMUSEON KERTOJA (omistaja 11.10. hyväksyi 33 tekstiä, PT; Pelikoodari aanet/taidemuseo-kertoja-v1: William Iv4, eleven_v4_turbo,
    /// −17,2 dB): manifest.json {aanet:[{id, sali, aani, ajat, kesto_s}]} → teoksen tunnus → äänite. Soitto Puhe.Soitalla (kertojakytkin,
    /// väistöt ja pinnaus kuten muissa kertojissa); pyynnöstä = Esittele-nappi.
    /// </summary>
    public sealed class MuseoKertoja
    {
        public static string Juuri = "https://media.matkakirja.app/aanet/taidemuseo-kertoja-v2/";   // v2: tempo 1,10× (Pelikoodari 11.10.)
        readonly Dictionary<string, (string Url, double Kesto)> aanet = new Dictionary<string, (string, double)>();
        readonly Dictionary<string, string> ajat = new Dictionary<string, string>();
        readonly Dictionary<string, MuseoTekstitys> tekstitykset = new Dictionary<string, MuseoTekstitys>();
        readonly HashSet<string> ladataan = new HashSet<string>();
        public string Soiva { get; private set; }
        public int Maara => aanet.Count;

        public System.Collections.IEnumerator Lataa(Action<string> kirjaa)
        {
            if (aanet.Count > 0 || string.IsNullOrEmpty(Juuri)) yield break;
            using (var r = UnityEngine.Networking.UnityWebRequest.Get(Juuri + "manifest.json"))
            {
                yield return r.SendWebRequest();
                if (r.result != UnityEngine.Networking.UnityWebRequest.Result.Success) { kirjaa?.Invoke("museo: kertoja ei latautunut (" + r.error + ")"); yield break; }
                try
                {
                    var d = Matkakirja.Peli.MiniJson.Objekti(Matkakirja.Peli.MiniJson.Jasenna(r.downloadHandler.text));
                    foreach (var o in Matkakirja.Peli.MiniJson.TaulukkoTaiTyhja(Matkakirja.Peli.MiniJson.Kentta(d, "aanet")))
                    {
                        var a = Matkakirja.Peli.MiniJson.Objekti(o);
                        string id = Matkakirja.Peli.MiniJson.Teksti(a, "id"), aani = Matkakirja.Peli.MiniJson.Teksti(a, "aani");
                        if (!string.IsNullOrEmpty(id) && !string.IsNullOrEmpty(aani) && !aani.Contains(".."))
                            aanet[id] = (Juuri + aani, Matkakirja.Peli.MiniJson.Luku(a, "kesto_s") ?? 0);
                        string aj = Matkakirja.Peli.MiniJson.Teksti(a, "ajat");
                        if (!string.IsNullOrEmpty(id) && !string.IsNullOrEmpty(aj) && !aj.Contains("..")) ajat[id] = Juuri + aj;
                    }
                    kirjaa?.Invoke($"museo: kertoja {aanet.Count} äänitettä");
                }
                catch (Exception e) { kirjaa?.Invoke("museo: kertojan manifest virheellinen: " + e.Message); }
            }
        }

        public bool On(string id) => id != null && aanet.ContainsKey(id);

        /// <summary>Teoksen tekstitys (null, kunnes ladattu tai jos ajoja ei ole). Tarve() käynnistää latauksen kerran.</summary>
        public MuseoTekstitys Tekstitys(string id) => id != null && tekstitykset.TryGetValue(id, out var t) ? t : null;
        public bool TarvitseeLatauksen(string id) => id != null && ajat.ContainsKey(id) && !tekstitykset.ContainsKey(id) && !ladataan.Contains(id);

        /// <summary>Lataa teoksen sanojen ajat (vain kun pelaaja on kytkenyt tekstityksen; noin 5–10 kt).</summary>
        public System.Collections.IEnumerator LataaTekstitys(string id, Action<string> kirjaa)
        {
            if (!ajat.TryGetValue(id ?? "", out var url) || !ladataan.Add(id)) yield break;
            using (var r = UnityEngine.Networking.UnityWebRequest.Get(url))
            {
                yield return r.SendWebRequest();
                MuseoTekstitys t = null;
                if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success)
                    try { t = MuseoTekstitys.Lue(r.downloadHandler.text); } catch (Exception e) { kirjaa?.Invoke($"museo: tekstitys {id} virheellinen: {e.Message}"); }
                else kirjaa?.Invoke($"museo: tekstitys {id} ei latautunut ({r.error})");
                tekstitykset[id] = t;
                ladataan.Remove(id);
                if (t != null) kirjaa?.Invoke($"museo: tekstitys {id} {t.Virkkeet.Count} virkettä");
            }
        }
        public double Kesto(string id) => id != null && aanet.TryGetValue(id, out var a) ? a.Kesto : 0;

        public bool Soita(string id, bool pyynnosta)
        {
            var p = Puhe.Instanssi;
            if (p == null || !aanet.TryGetValue(id ?? "", out var a)) return false;
            if (Soiva == id && p.Soi && p.SoivaUrl == a.Url) return true;
            if (!p.Soita(a.Url, 0.3f, () => { if (Soiva == id) Soiva = null; }, pyynnosta)) return false;
            Soiva = id;
            return true;
        }

        public void Pysayta()
        {
            if (Soiva == null) return;
            var p = Puhe.Instanssi;
            if (p != null && aanet.TryGetValue(Soiva, out var a) && p.SoivaUrl == a.Url) p.Pysayta();
            Soiva = null;
        }
    }
}
