// DIORAAMA-SOVITIN: Poikkileikkaus-linssin Unity-kytkentä (Linnanrakentaja, erä 1, 29.9.2026; MaapallonVuosiSovitin-
// malli). Ydin (Matkakirja.Linssit.Dioraama.PoikkileikkausLinssi, A3) ei tunne Unitya: tämä sovitin lataa
// rakennus.json + glb + atlas-tekstuurit, pitää DioraamaNayttamo/DioraamaRakennus/DioraamaHahmot/DioraamaSyote-
// oliot ja syöttää ajan (t = ymparisto.Aika; kertojan kierroksen aikana DioraamaTimelinen director, kun "poikki timeline 1")
// Ytimelle joka kehys. Katso dioraama-rajapinnat-20260929.md kohta 6.
//
// ÄMPÄRI (Päätoimittaja 29.9.: CI rakentaa paketin deterministisesti ja vie sen polkuun dioraama/<rakennus>/<hash>/,
// uusin.json viimeisenä): sovitin lukee ensin AmpariJuuri + "uusin.json" ({ polku: "<hash>/" }) ja lataa paketin sen
// alta. KEHITYSPEILI: "poikki peili file:///…/dist/dioraama/olavinlinna/" ohjaa ämpäripolut paikalliseen rakennukseen
// (siellä ei ole uusin.jsonia, joten paketti luetaan suoraan juuresta).
//
// TESTIKOMENNOT (linssi-komento.txt): "poikki peili <url|pois> | yleis | tila <id> | aika <s|pois> |
// taso <tila> <0-2> | napauta | lataa | mittaus | tila | dof <0|1> | hehku <0|1> | aanet [0|1] | drift <0|1> |
// hahmot <2d|3d> | timeline [0|1]" (LinssiOhjain.Komento reitittää "poikki"-alkuiset tänne). timeline = kertojan esittely
// Unityn Timelinellä (DioraamaTimeline, linna-unity-suunnitelma 2b), oletus pois. drift = Leijunta (era 2b, kohta 5,
// agentti P5): hidas ajelehtiminen levossa, oletus pois. hahmot = 3D-pienoisfiguuri vs. 2D-kortti (era 2b
// kohta 4, agentti P4b), oletus 3d.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Profiling;
// "Nakyma" on kahdessa nimiavaruudessa (Matkakirja.Linssit.Nakyma = pallon lat/lon-asento,
// Matkakirja.Linssit.Dioraama.Nakyma = dioraaman NakymaHetkella-tulos): alias poistaa CS0104-ristiriidan.
using DioraamaNakyma = Matkakirja.Linssit.Dioraama.Nakyma;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaSovitin : ILinssi
    {
        /// <summary>
        /// HISTORIAMOOTTORI H0 (Siirtoseppä 7.10.2026; omistajan linja 08.4x: Olavinlinna, Kielletty kaupunki ja Giza seikkailuina):
        /// rakennuksen ämpärijuuri rakennus-id:stä (ennen vakio …/olavinlinna/). Id asetetaan ennen linssin avausta
        /// (AsetaRakennus tai "poikki rakennus &lt;id&gt;"); osoitin, paketti, äänet ja levyvälimuisti seuraavat sitä. Oletus olavinlinna.
        /// </summary>
        public static string RakennusId { get; private set; } = Oletusrakennus;
        public const string Oletusrakennus = "olavinlinna";
        public static string AmpariJuuri => MediaJuuri + "/dioraama/" + RakennusId + "/";
        /// <summary>Valitse avattava rakennus (vain pienet kirjaimet, numerot ja väliviiva; muu → oletus). Avoin linssi ei vaihdu
        /// kesken (vaikuttaa seuraavaan avaukseen).</summary>
        public static bool AsetaRakennus(string id)
        {
            bool ok = !string.IsNullOrEmpty(id) && id.Length <= 64;
            if (ok) foreach (char c in id) if (!(c >= 'a' && c <= 'z' || c >= '0' && c <= '9' || c == '-')) { ok = false; break; }
            RakennusId = ok ? id : Oletusrakennus;
            return ok;
        }

        /// <summary>Auki oleva linssi (Natiivi-UI:n paneeli, DioraamaTaulu), muuten null.</summary>
        public static PoikkileikkausLinssi Linssi { get; private set; }
        /// <summary>Linssi avautui tai sulkeutui.</summary>
        public static event Action<PoikkileikkausLinssi> Vaihtui;
        /// <summary>Viimeisin NakymaHetkella-tulos ja sen ajanhetki (DioraamaTaulu lukee näitä joka ruutu; ei
        /// vielä kytketty LinssiUi.cs:ään tässä erässä, ks. luovutusraportti).</summary>
        public static DioraamaNakyma? ViimeisinNakyma { get; private set; }
        /// <summary>Saapumiskaari odottaa kuorta: DioraamaTaulu piilottaa Pulun ja taulun (Päätoimittaja 30.9.: pelkkä hämärä järvi).</summary>
        public static bool SaapumisOdotus { get; private set; }
        public static double ViimeisinT { get; private set; }
        /// <summary>Näyttämön kamera (DioraamaTaulu: Pulun 3D-paikka → ruutupiste), null kun linssi on kiinni.</summary>
        public static Camera AktiivinenKamera { get; private set; }
        /// <summary>
        /// DioraamaTaulu (UI Toolkit, ei vielä kytketty LinssiUi.cs:ään tässä erässä) voi rekisteröidä tähän oman
        /// paneelinsa ruutualueen, jottei napautus paneeliin myös osu 3D-näkymään (DioraamaSyote tarkistaa tämän
        /// ennen eleen alkua, PalloKierto.UiPeittaa-mallilla).
        /// </summary>
        public static Func<Vector2, bool> PeittaaRuutu;

        readonly LinssiOhjain o;
        readonly PalloKierto kierto;
        readonly PoikkileikkausLinssi linssi = new PoikkileikkausLinssi();

        ILinssiYmparisto y;
        Camera pallonKamera;
        DioraamaNayttamo nayttamo;
        DioraamaRakennus rakennus3D;
        DioraamaHahmot hahmot3D;
        DioraamaSyote syote;
        readonly DioraamaKameraJousi jousi = new DioraamaKameraJousi();
        // LATAUSPALKKI (omistaja 5.10. klo 12.5x; Natiivi-UI:n pohja DioraamaTaulu.LatausEdistyminen): nimiruudun odotuksen aikana
        // linnan tiedostojen tavut (DioraamaLevyvalimuisti.Edistys). Nimittäjä on vähintään edellisen täyden latauksen tavumäärä
        // (PlayerPrefs), jottei palkki täyty, kun myöhemmät osat (tilat, hahmot, ympäristö) vasta jonoutuvat. Ei koskaan taaksepäin.
        static DioraamaSovitin aktiivinen;
        static float latausOsuus;
        // Rakennuskohtaiset avaimet (H0): Olavinlinnan avaimet ennallaan (pelaajien tallennukset), muille rakennuksille ":<id>".
        static string RakennusAvain(string a) => RakennusId == Oletusrakennus ? a : a + ":" + RakennusId;
        static string LatausAvain => RakennusAvain("linna-latauksen-tavut");
        static string KestoAvain => RakennusAvain("linna-latauksen-kesto");
        static float latausAika, latausTavut, latausVaiheet, latausLokiAika;
        public static float LatausOsuus()
        {
            var a = aktiivinen;
            if (a == null || a.kuoriOdotusAlku < 0f && !a.latausKaynnissa) return float.NaN;
            long muistettu = 0;
            try { long.TryParse(PlayerPrefs.GetString(LatausAvain, "0"), out muistettu); } catch (Exception) { }
            float e = DioraamaLevyvalimuisti.Edistys(muistettu);
            if (float.IsNaN(e)) e = 0f;
            // Natiivi-UI 5.10. (b274b20c): tavut 99 % jo 13 s:ssa, mutta saapuminen vasta 26 s:ssa (kuoren jälkeen tilat, hahmot ja
            // ympäristö puretaan ja viedään GPU:lle välimuistista). Tavoite = 0,5 × tavut + 0,5 × valmiit vaiheet (kuori, tilat,
            // hahmot, ympäristö), ja vähintään 0,9 × kulunut / edellisen täyden latauksen kesto (PlayerPrefs). Näytetty arvo ei
            // pysähdy (Päätoimittaja: ei yli 1–2 s:n seisahdusta): se ryömii 1,5 %/s tavoitteen yli enintään 6 %:iin asti.
            float vaiheet = a.VaiheOsuus();
            float kulunut = a.kuoriOdotusAlku >= 0f ? Time.realtimeSinceStartup - a.kuoriOdotusAlku : 0f;
            float muistettuKesto = 0f;
            try { muistettuKesto = PlayerPrefs.GetFloat(KestoAvain, 0f); } catch (Exception) { }
            float tavoite = 0.5f * e + 0.5f * vaiheet;
            if (muistettuKesto > 1f) tavoite = Mathf.Max(tavoite, 0.9f * Mathf.Clamp01(kulunut / muistettuKesto));
            float dt = Mathf.Clamp(Time.unscaledTime - latausAika, 0f, 0.25f);
            latausAika = Time.unscaledTime;
            float ryomi = Mathf.Min(latausOsuus + 0.015f * dt, tavoite + 0.06f);
            latausOsuus = Mathf.Min(0.99f, Mathf.Max(latausOsuus, Mathf.Max(tavoite, ryomi)));
            latausTavut = e; latausVaiheet = vaiheet;
            return latausOsuus;
        }

        static (string Tila, string Hahmo, int Kohta)? puluJono;
        /// <summary>Pulun napautusvuoro keskustelun jälkeen (viimeisin napautus voittaa).</summary>
        public static void PuluJonoon(string tila, string hahmo, int kohta = -1) => puluJono = (tila, hahmo, kohta);
        /// <summary>"poikki pulu napautus 0|1": Pulu vain napautuksesta (oletus päällä elävässä linnassa) vs. vanha käsikirjoitus.</summary>
        public static bool PuluNapautuksesta = true;
        /// <summary>Cinemachine-kamerat (suunnitelma kohta 1); luodaan näyttämön kanssa, tuhoutuu sen mukana.</summary>
        DioraamaCinemachine cm;
        // TIMELINE (linna-unity-suunnitelma-20261005.md kohta 2b): kertojan kierroksen aikana PlayableDirector on Ytimen kello.
        // kelloSiirto pitää Ytimen ajan jatkuvana kierroksen jälkeen (YdinAika = seinäkello + siirto; 0 ilman timelinea).
        readonly DioraamaTimeline timeline = new DioraamaTimeline();
        double kelloSiirto;
        double YdinAika => y.Aika + kelloSiirto;

        // ESITTELYN TAUKO (omistaja 6.10.2026, Linnanrakentajan esittelyerä): pelaajan II/▶ jäädyttää linnan ajan (kamera-ajo,
        // kertojan jakso, avainsanat, nimet, hahmot) ja pysäyttää linnan puheen kohtaansa; jatko siirtää kelloa tauon verran,
        // joten kaikki jatkuu samasta hetkestä. Kehittäjän "poikki aika" (pysaytettyT) on erillinen ja voittaa.
        double? taukoT;
        public static bool Tauolla => Linssi != null && aktiivinenSovitin?.taukoT != null;
        static DioraamaSovitin aktiivinenSovitin;

        /// <summary>Esittelyn tauko päälle/pois (LinnaValikon II/▶). Palauttaa uuden tilan.</summary>
        public static bool VaihdaTauko()
        {
            var s = aktiivinenSovitin;
            if (s == null || s.y == null) return false;
            if (s.taukoT.HasValue)
            {
                s.kelloSiirto -= s.YdinAika - s.taukoT.Value;
                s.taukoT = null;
                DioraamaAanet.TaukoPuhe(false);
                Debug.Log("MATKAKIRJA linssit: poikki: esittely jatkuu");
                return false;
            }
            s.taukoT = s.YdinAika;
            DioraamaAanet.TaukoPuhe(true);
            Debug.Log($"MATKAKIRJA linssit: poikki: esittely tauolla ({s.taukoT:F1} s)");
            return true;
        }
        // ERA 2 (dioraama-aanirajapinta-ehdotus.md): PYSYVÄ kenttä (ei nollata Sulje:ssa, ks. DioraamaAanet.cs:n
        // alkukommentti) -- klippivälimuisti säilyy sulkemisen ja uudelleenavaamisen yli. HUOM (UUDELLEENAVAUS-
        // korjaus 29.9.2026, katselmointi): ladatutPinnat/ladatutLiekkiAtlakset EIVÄT enää säily samoin --
        // NollaaNakymanLataukset tyhjentää nekin Sulje:ssa, koska rakennus3D/hahmot3D/nayttamo tuhotaan samalla
        // eikä uusi näyttämö koskaan täyttyisi, jos latausjonot muistaisivat vanhan kerran "valmiiksi".
        DioraamaAanet aanet;

        Rakennus rakennus;
        bool avoinna, latausKaynnissa;
        /// <summary>Kasvaa joka Sulje/"poikki lataa" -kutsulla (NollaaNakymanLataukset): kesken olevat
        /// latauskorutiinit (LataaTila/LataaAtlas/LataaPinta/LataaLiekkiAtlas) tunnistavat tästä palatessaan
        /// yield-lauseesta, että niiden kohdenäkymä on vanhentunut, ja perääntyvät kirjoittamatta siihen.</summary>
        int avauskerta;
        readonly HashSet<string> tilatJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        readonly HashSet<string> atlaksetJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        /// <summary>Era 2b (kohta 4, ali-agentti P4b): 3D-hahmojen glb-polut, sama dedup-malli kuin
        /// atlaksetJonossaTaiValmiit (avain glb-polku, ei henkilö-id — ks. DioraamaHahmot3D.TarvittavatGlb).</summary>
        readonly HashSet<string> hahmoGlbJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        // ERA 2 (dioraama-rajapinnat-era2-20260929.md kohta 3): pintojen tekstuurit ja liekkien atlakset ovat
        // rakennustason (ei tilakohtaista) dataa, jo rakennuskoneen esisuodattamia "käytettyjä" (kohta 2) --
        // siksi ei tarvita DioraamaHahmot.TarvittavatAtlakset-tyylistä tila-suodatusta, ks. TaydennaPinnatJaLiekit.
        readonly HashSet<string> pinnatJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        readonly HashSet<string> liekkiatlaksetJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        /// <summary>Sovittimen itse lataamat pinta-/liekkitekstuurit ("poikki mittaus" -muistiraportti); avain on
        /// pinnan/liekin id, ei tiedostopolku (toisin kuin hahmoatlaksissa, joissa monta henkilöä voisi jakaa polun).</summary>
        readonly Dictionary<string, Texture2D> ladatutPinnat = new Dictionary<string, Texture2D>(StringComparer.Ordinal);
        readonly Dictionary<string, Texture2D> ladatutLiekkiAtlakset = new Dictionary<string, Texture2D>(StringComparer.Ordinal);
        /// <summary>Olavinlinna: tilojen leivotut valoatlakset (avain tilan id), sama omistus kuin pinnoilla.</summary>
        readonly Dictionary<string, Texture2D> ladatutValoAtlakset = new Dictionary<string, Texture2D>(StringComparer.Ordinal);
        string peiliKuvaus = "pois (ämpäri)";
        Func<string, string> peili = s => s;
        bool peiliPaalla;
        bool peiliHttps;
        /// <summary>Paketin juuri: AmpariJuuri + uusin.json:n polku, tai AmpariJuuri (kehityspeili).</summary>
        string paketinJuuri = AmpariJuuri;

        double? pysaytettyT;
        string pakotettuTila;
        int pakotettuTaso = -1;
        DioraamaNakyma? viimeNakyma;

        public DioraamaSovitin(LinssiOhjain o, PalloKierto kierto)
        {
            this.o = o;
            this.kierto = kierto;
            nakymaPeitto = () => avoinna;
            // Kehittäjän kuoritason vaihto (komento tai DioraamaTaulun nappi) lataa kuoren uudelleen, jos linssi on auki.
            DioraamaUlkokuori.PakotusVaihtui += () => { if (avoinna && rakennus != null) LataaUlkokuori(); };
            // Tunnelman vaihto: kuori ja jo ladattujen tilojen atlakset uudelleen oikealla versiolla.
            DioraamaTunnelma.Vaihtui += () =>
            {
                if (!avoinna || rakennus == null) return;
                LataaUlkokuori();
                foreach (var t in rakennus.Tilat)
                    if (!string.IsNullOrEmpty(t.ValoAtlas) && rakennus3D != null && rakennus3D.SisaltaaTilan(t.Id)) o.StartCoroutine(LataaValoAtlas(t));
            };
        }

        /// <summary>Koko ruudun näkymäpeitto (SyoteLukko): tosi, kun linssi on auki.</summary>
        readonly Func<bool> nakymaPeitto;

        public LinssiTiedot Tiedot => linssi.Tiedot;
        public bool Auki => linssi.Auki;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            aktiivinen = this;
            latausOsuus = 0f;
            DioraamaLevyvalimuisti.NollaaEdistys();
            DioraamaTaulu.LatausEdistyminen = LatausOsuus; // Natiivi-UI:n latauspalkki (omistaja hyväksyi 5.10. klo 14.0x, juna 144)
            y = ymparisto;
            avoinna = true;
            kelloSiirto = 0;
            pallonKamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            // Pallo piiloon talon omalla näkymäpeitolla (kuten koko ruudun lehti): PalloKierto.Peitetty → Ruudunpaivitys
            // sammuttaa pallon kameran, eikä kehysmittari laske peitettyjä kehyksiä lepoon.
            SyoteLukko.LisaaNakymaPeitto(nakymaPeitto);
            if (kierto != null) SyoteLukko.Esta(this);

            ymparisto.Pelikerrokset(false);
            ymparisto.MusiikkiPitoon(true);
            // ERA 2: dioraama väistää maiseman taustaäänen (Maisema väistyy) -- omat silmukat (DioraamaAanet)
            // korvaavat sen. Palautus (jos tarvitaan) Sulje:ssa; kukaan muu ei aseta Taustaaania linssin auki
            // ollessa, koska tunnus on yksinomaan avoinna olevan linssin oma (ks. ILinssiYmparisto.Taustaaani).
            ymparisto.Taustaaani(null);
            ymparisto.Peite(true);
            o.StartCoroutine(PeiteHetkeksi(0.3f));

            if (nayttamo == null) nayttamo = DioraamaNayttamo.Luo(pallonKamera);
            if (cm == null) cm = new DioraamaCinemachine(nayttamo.Kamera, nayttamo.transform);
            cm.Nollaa();
            AktiivinenKamera = nayttamo.Kamera;
            if (rakennus3D == null) rakennus3D = new DioraamaRakennus(nayttamo.transform);
            DioraamaHahmot3D.TilanMalli = id => rakennus3D != null && rakennus3D.Tilat.TryGetValue(id, out var tg) ? tg : null; // Final IK -lattiat
            if (hahmot3D == null) hahmot3D = new DioraamaHahmot(nayttamo.transform);
            if (syote == null) syote = new DioraamaSyote(this, nayttamo);
            jousi.Nollaa();
            if (aanet == null) aanet = new DioraamaAanet(o, this);
            aanet.Avaa(ymparisto, rakennus, nayttamo.transform);

            Linssi = linssi;
            Vaihtui?.Invoke(linssi);
            LukitseVaaka(true);

            if (PelattavaPalaPyydetty && DioraamaLevyvalimuisti.TestiOsoitin != PelattavaPalaHash)
            {
                // Ennen latausta: pala-paketti osoittimeksi; jo ladattu tuotantorakennus unohdetaan (ladataan uudelleen alla).
                if (peiliPaalla) AsetaPeili("pois");
                DioraamaLevyvalimuisti.TestiOsoitin = PelattavaPalaHash;
                if (rakennus != null) LataaUudelleen();
            }
            if (rakennus == null)
            {
                if (!latausKaynnissa) { latausKaynnissa = true; o.StartCoroutine(LataaRakennus()); }
            }
            else
            {
                linssi.Avaa(rakennus, ymparisto.Aika, SaapuminenNahty);
                TaydennaPinnatJaLiekit();
                LataaUlkokuori();
                AloitaKuoriOdotus(ymparisto.Aika);
                TaydennaLataamattomat();
            }
            o.Kirjaa(Tilaraportti());
        }

        public void Paivita()
        {
            // Nimiruutu jo rakennus.jsonin latauksen ajan (simu 4.10.: ensimmäinen sekunti oli vaalea tyhjä ruutu).
            RakennusLatautuu = avoinna && rakennus == null && latausKaynnissa;
            // rakennus == null: "poikki lataa" kesken (1.0.54-ajossa DioraamaAanet.Paivita kaatui NullReferenceen).
            if (!avoinna || y == null || !linssi.Auki || rakennus == null) return;
            aktiivinenSovitin = this;
            double t = pysaytettyT ?? taukoT ?? YdinAika;
            // Laajat kuvat sovitetaan todelliseen kuvasuhteeseen: näyttämön kameran oma (kuvan) suhde, ei ympäristön arvo
            // (1.1 (79) vaaka: kierron jälkeen sovitus käytti vielä pystyn suhdetta ja linna jäi pieneksi).
            float kameranSuhde = nayttamo.Kamera != null ? nayttamo.Kamera.aspect : 0f;
            linssi.Kuvasuhde = kameranSuhde > 0.05f ? kameranSuhde : y.Kuvasuhde;
            if (nayttamo.Ulkokuori?.Pohja is { } po) linssi.AsetaPohja(po.minX, po.maxX, po.minZ, po.maxZ);
            if (kuoriOdotusAlku >= 0f)
            {
                float odotettu = Time.realtimeSinceStartup - kuoriOdotusAlku;
                // OMISTAJAN LINJA 4.10. (14.5x): "olavinlinna saisi latautua täydellä tarkkuudella ennen kuin linssi alkaa." Nimiruutu
                // (DioraamaTaulu, latausrivit 4 ja 9 s) pysyy, kunnes kuori (kevyt + laitteen taso + detalji), tilat valoatlaksineen,
                // hahmot ja ympäristö ovat valmiit; vasta sitten linna sumusta ja kertojan kierros. Kevyestä täyteen ei vaihdeta kesken.
                bool kuoriValmis = nayttamo.Ulkokuori == null || nayttamo.Ulkokuori.KaikkiValmis;
                bool tilatValmiit = tilojaKasitelty >= TilojaGlb();
                bool hahmotValmiit = hahmojaKasitelty >= hahmoGlbJonossaTaiValmiit.Count;
                bool ymparistoValmis = rakennus.Ymparisto == null || nayttamo.Ymparisto == null || nayttamo.Ymparisto.Valmis;
                // Latauspalkin aikasarja todisteeksi (Päätoimittaja 5.10.): kerran sekunnissa nimiruudun aikana.
                if (Time.realtimeSinceStartup - latausLokiAika >= 1f)
                {
                    latausLokiAika = Time.realtimeSinceStartup;
                    float palkki = LatausOsuus();
                    o.Kirjaa($"poikki: latauspalkki {(float.IsNaN(palkki) ? -1 : palkki * 100):F0} % {odotettu:F1} s (tavut {latausTavut * 100:F0} %, vaiheet {latausVaiheet * 100:F0} %)");
                }
                int valmistuneita = DioraamaLevyvalimuisti.Valmistuneita;
                if (valmistuneita != viimeValmistuneita) { viimeValmistuneita = valmistuneita; viimeEdistys = Time.realtimeSinceStartup; }
                // Lataushäiriö tai offline: olemassa oleva virheviesti (DioraamaTaulu → tilarivi) ja linssi kiinni, ei loputonta odotusta.
                bool virhe = DioraamaLevyvalimuisti.Epaonnistui > virheitaAlussa;
                bool jumissa = Time.realtimeSinceStartup - viimeEdistys > JumiS;
                if (virhe || jumissa)
                {
                    kuoriOdotusAlku = -1f;
                    LatausVirhe = "Linnaa ei saatu ladattua. Tarkista verkkoyhteys.";
                    o.Kirjaa($"poikki: latausvirhe ({(virhe ? "lataus epäonnistui" : $"ei edistystä {JumiS:F0} s")}, odotettiin {odotettu:F1} s, " +
                             $"kuori {(kuoriValmis ? "ok" : "kesken")}, tilat {tilojaKasitelty}/{TilojaGlb()}, hahmot {hahmojaKasitelty}/{hahmoGlbJonossaTaiValmiit.Count}, ympäristö {(ymparistoValmis ? "ok" : "kesken")})");
                    nayttamo.Odota(true); t = kuoriOdotusT;
                }
                else if ((kuoriValmis && tilatValmiit && hahmotValmiit && ymparistoValmis && odotettu >= NimiruutuMinS) || rakennus.Ulkokuori == null)
                {
                    kuoriOdotusAlku = -1f;
                    nayttamo.Odota(false);
                    nayttamo.Haivyta(HaivytysS);
                    linssi.Avaa(rakennus, YdinAika, SaapuminenNahty); // kaari (ja kertoja) alusta tästä hetkestä
                    try { PlayerPrefs.SetString(LatausAvain, DioraamaLevyvalimuisti.PyydettyTavuja.ToString()); PlayerPrefs.SetFloat(KestoAvain, odotettu); } catch (Exception) { }
                    o.Kirjaa($"poikki: latauspalkki 100 % {odotettu:F1} s (avaus)");
                    latausOsuus = 1f;
                    t = pysaytettyT ?? taukoT ?? YdinAika;
                    o.Kirjaa($"poikki: saapuminen alkaa (kaikki valmiina täydellä tarkkuudella: kuori, tilat {tilojaKasitelty}/{TilojaGlb()}, " +
                             $"hahmot {hahmojaKasitelty}/{hahmoGlbJonossaTaiValmiit.Count}, ympäristö; odotettiin {odotettu:F1} s, " +
                             $"välimuistista {DioraamaLevyvalimuisti.Osumia - osumiaAlussa}, verkosta {DioraamaLevyvalimuisti.Latauksia - latauksiaAlussa})");
                    DioraamaLevyvalimuisti.SiivoaVanhat(o.Kirjaa); // vanhan pakettiversion sisältö pois vasta, kun uusi on valmis
                }
                else { nayttamo.Odota(true); t = kuoriOdotusT; }
            }
            SaapumisOdotus = kuoriOdotusAlku >= 0f;
            bool pysty = linssi.Kuvasuhde < 1.0; // kameran oma suhde (ks. yllä)
            // TIMELINE (2b): soiva director on esittelyn ainoa kello (t = kierroksen alku + director.time); seinäkellon siirtymä
            // seuraa, jotta Ytimen aika jatkuu kierroksen jälkeen ilman hyppyä. Jäädytetty aika ja nimiruutu ohittavat directorin.
            if (!pysaytettyT.HasValue && !taukoT.HasValue && !SaapumisOdotus && timeline.Soi) { t = timeline.Kello(t); kelloSiirto = t - y.Aika; }
            if (paluuPyydetty) { paluuPyydetty = false; Yleisnakymaan(t); }
            if (pyydettyTila != null) { string pt = pyydettyTila; pyydettyTila = null; if (rakennus?.Tila(pt) != null) Kohdista(pt, t); }
            // Aloitus, uudelleenrakennus (napautus, uusinta, asento) ja pysäytys (huone, kierroksen loppu) Ytimen aikataulusta.
            // Omistajan linnapalaute 5.10. klo 12.4x: Pulu ei puhu keskustelujen väliin, vaan vain napautuksesta (elävä linna).
            linssi.PuluNapautuksesta = PuluNapautuksesta && rakennus.Saapuminen != null;
            KuunnelmaKaistale.IlmanPulua = linssi.PuluNapautuksesta;
            // Keskustelun aikana napautettu Pulun vuoro (DioraamaSyote): soi, kun kuunnelma on päättynyt, jos ollaan yhä samassa huoneessa.
            if (puluJono.HasValue && !KuunnelmaKaistale.SoiNyt)
            {
                var (jTila, jHahmo, jKohta) = puluJono.Value;
                puluJono = null;
                if (jTila == ViimeisinNakyma?.KohdeTila) { linssi.Napauta(t, jHahmo, jKohta); o.Kirjaa($"poikki: pulu jonosta ({jHahmo ?? (jKohta >= 0 ? "kohde " + jKohta : "kohta")})"); }
            }
            timeline.Paivita(linssi, rakennus, t, pysty, pysaytettyT.HasValue || taukoT.HasValue || SaapumisOdotus);
            var nakyma = linssi.NakymaHetkella(t, pysty);
            timeline.Tarkista(nakyma.KertojaJakso, t);
            // Elävä linna: saapumiskaaren eteneminen → soihtujen syttyminen; kaari nähty → seuraavalla kerralla lyhyt.
            if (rakennus.Saapuminen != null)
            {
                double osuus = linssi.SaapuminenOsuus(t);
                nayttamo.Liekit?.Syttyminen(osuus, DioraamaNayttamo.UnityPiste((pysty ? rakennus.YleisPysty : rakennus.YleisVaaka).Kohde));
                if (osuus >= 1 && !SaapuminenNahty) SaapuminenNahty = true;
                // Uusi linna: kertojan kierroksen aikana ei elävien kohteiden sykkeitä (1.1 (73) -kuva: renkaat jaksojen päällä).
                nayttamo.Syke?.Paivita(rakennus, SeikkailuPelaaja.Aktiivinen == null && SeikkailuVene.Aktiivinen == null && nakyma.KohdeTila == null && osuus >= 1 && nakyma.KertojaJakso < 0 && !linssi.KertojaKaynnissa(t), nakyma.KohdeTila != null, t, y.VahennettyLiike);
                // Etsintä: vaihe näkyy vasta perillä tilassa (ei kesken lennon).
                var leikkaus = linssi.LeikkausHetkella(t);
                bool perilla = nakyma.KohdeTila != null && leikkaus.tila == nakyma.KohdeTila && leikkaus.osuus >= 1; // ei edellisen tilan leikkausta (4.10.)
                nayttamo.Etsinta?.Paivita(rakennus, perilla ? nakyma.KohdeTila : null, t, y.VahennettyLiike);
            }
            if (pakotettuTila != null && pakotettuTaso >= 0 && nakyma.Tasot != null) nakyma.Tasot[pakotettuTila] = pakotettuTaso;
            viimeNakyma = nakyma;
            ViimeisinNakyma = nakyma;
            ViimeisinT = t;

            // Omistajan TF 141 -palaute (5.10.): pehmeät liikkeet ja aina käynnissä oleva orbit (DioraamaKameraJousi). Odotuksen
            // aikana (nimiruutu, kamera järvellä) ja pakotetulla kameralla jousi asettuu suoraan, jottei saapuminen ala jousesta.
            float dt = Time.unscaledDeltaTime;
            Asento kameraAsento;
            // Cinemachine (5.10.2026, DioraamaCinemachine): lepokamerat + brainin blendit korvaavat jousen askeleen; jousesta jää
            // jatkuvan orbitin vaihe. "poikki cinemachine 0" palauttaa vanhan jousipolun A/B-vertailuun.
            // Historiamoottorin kävelytila: pelaajan olan yli -kamera ohittaa lepokamerat, pakotetun kameran ja jousen (V1 7.10.).
            // Kehittäjävalikon "Olavinlinna – pelattava pala (kokeilu)" (Päätoimittaja 7.10. 16.0x): E1 heti, kun rakennus on ladattu.
            if (PelattavaPalaPyydetty && rakennus != null && nayttamo != null && cm != null && SeikkailuVene.Aktiivinen == null && SeikkailuPelaaja.Aktiivinen == null)
            {
                PelattavaPalaPyydetty = false; pelattavaPala = true;
                // V6: jatko tallennuksesta vain pyynnöstä (Natiivi-UI "Jatka"); muuten aina alusta (veneyö).
                var jatka = PelattavaPalaJatka ? SeikkailuTallentaja.LueTiedosto("olavinlinna", PelattavaPalaHash) : null;
                PelattavaPalaJatka = false;
                SeikkailuTallentaja.Luo(nayttamo.transform, "olavinlinna", PelattavaPalaHash, jatka, o.Kirjaa);
                SeikkailuVihjeet.Luo(nayttamo.transform, o.Kirjaa);
                SeikkailuYo.Luo(nayttamo.transform, mustaAlku: true);   // omistaja 8.10.: pimeämpi yö, ei lintuperspektiiviä ennen venettä
                if (jatka != null && jatka.OnTarkistus) o.StartCoroutine(JatkaTallennuksesta(jatka));
                else o.StartCoroutine(VenePaalle(VeneKestoS));
                o.Kirjaa($"seikkailu: pelattava pala käynnistyy{(jatka != null ? " (jatko tallennuksesta)" : "")}");
            }
            var pelaaja = cm != null ? SeikkailuPelaaja.Aktiivinen : null;
            var vene = cm != null ? SeikkailuVene.Aktiivinen : null;
            // V2: vene etenee aina (myös kun pelaaja on jo laiturilla: vene jää kiinnitettynä); perillä pelaaja laiturille.
            if (vene != null)
            {
                var vt = vene.Paivita(y.VahennettyLiike);
                if (vt.Perilla && pelaaja == null && !veneLaituriin) { veneLaituriin = true; o.StartCoroutine(VeneLaituriin()); }
                // Huone 1 (Veneyö): soutajan repliikit käsikirjoituksen ikkunoissa (soutaja-1 25–40 s, soutaja-2 40–55 s; 50 s:n matkalla 28 ja 44 s).
                var rep = SeikkailuRepliikit.Aktiivinen;
                if (rep != null && rep.Valmis && vene.IstuinSoutaja != null)
                {
                    if (veneRepliikki == 0) { rep.Esilataa("soutaja-1"); rep.Esilataa("soutaja-2"); veneRepliikki = 1; }
                    double osuus = vene.Aika / Math.Max(1, vene.Ydin.KestoS);
                    if (veneRepliikki == 1 && osuus >= 0.56) { rep.Soita("soutaja-1", vene.IstuinSoutaja); veneRepliikki = 2; }
                    else if (veneRepliikki == 2 && osuus >= 0.88) { rep.Soita("soutaja-2", vene.IstuinSoutaja); veneRepliikki = 3; }
                }
            }
            var seikkailuKamera = pelaaja != null ? pelaaja.Kamera : vene?.Kamera;
            if (seikkailuKamera != null) SeikkailuYo.Aktiivinen?.Avaa();   // musta alku avautuu vasta veneen tai pelaajan kameraan
            bool cmKaytossa = cm != null && (seikkailuKamera != null || DioraamaCinemachine.Paalla && pakotettuKamera == null);
            cm?.Kaytossa(cmKaytossa);
            if (KameraVapaa && nayttamo.Kamera != null)
            {
                // Pelattavan palan loppu (E3 vaihe 11): SeikkailuNousu (LS2) tai varanousu ohjaa kameraa; tämä ei kirjoita siihen.
                cm?.Kaytossa(false); jousi.Nollaa();
                var kp = nayttamo.Kamera.transform.position;
                kameraAsento = new Asento(new Matkakirja.Linssit.Dioraama.V3(kp.x, kp.y, -kp.z), 0, 0, VeneSumuM, nayttamo.Kamera.fieldOfView, 0);
            }
            else if (seikkailuKamera != null)
            {
                jousi.Nollaa();
                string tapa = (pelaaja != null ? "pelaaja " : "vene ") + cm.PaivitaPelaaja(seikkailuKamera, nayttamo.Kamera, dt);
                if (tapa != pelaajaKameraTapa) { o.Kirjaa($"seikkailu: kamera {tapa}, {nayttamo.Kamera.transform.position}"); pelaajaKameraTapa = tapa; }
                SeikkailuKuulija.Paivita(nayttamo.Kamera.transform);   // 3D-äänet kuulostavat aktiivisesta kamerasta
                // Sumu ja syväterävyys: kohde 25 m päässä (veneessä linna kaukana: 120 m), ei taustan sumennusta (aukko 0).
                var pp = seikkailuKamera.transform.position;
                kameraAsento = new Asento(new Matkakirja.Linssit.Dioraama.V3(pp.x, pp.y, -pp.z), 0, 0, pelaaja != null ? KavelySumuM : VeneSumuM, 55, 0);
            }
            else if (pakotettuKamera is Asento pk) { pelaajaKameraTapa = null; jousi.Nollaa(); kameraAsento = pk; }
            else if (cmKaytossa)
            {
                if (SaapumisOdotus) cm.Nollaa();
                bool veto = linssi.VetoKaynnissa;
                jousi.Etene(dt, veto);
                bool vl = y.VahennettyLiike;
                System.Func<Asento, Asento> muokkaa = a => syote.Sovita(jousi.Sovella(a, vl));
                cm.Paivita(nayttamo.Kamera, nakyma.Kamera, PuhujaanPain(linssi.LepoHetkella(t, pysty), nakyma.KohdeTila), muokkaa, vl, dt);
                kameraAsento = muokkaa(nakyma.Kamera); // sumu ja syväterävyys: etäisyys ja aukko Ytimen asennosta
                jousi.Nollaa(); // kytkettäessä pois jousi alkaa suoraan tavoitteesta
            }
            else
            {
                if (SaapumisOdotus) jousi.Nollaa();
                bool veto = linssi.VetoKaynnissa;
                kameraAsento = jousi.Askel(syote.Sovita(jousi.Orbit(nakyma.Kamera, dt, veto, y.VahennettyLiike)), dt, veto);
            }
            // t mukaan (era 2): DioraamaNayttamo.Paivita antaa sen liekkinäkymälle (DioraamaLiekit.Paivita, ruutu
            // ajasta) -- nayttamo-kentän kommentti kutsui juuri tätä ("Sovitin voi jatkossa antaa Ydin-ajan tähän").
            // Lähileikkaus puolilähikuvassa: kaikki yli PuolilahiVapaaM lähempänä kameraa kuin puhuja jää piirtämättä (ei peittäjiä).
            nayttamo.LahiLeikkaus = puolilahiRinta is Vector3 pr && nayttamo.Kamera != null
                ? Mathf.Clamp(Vector3.Distance(nayttamo.Kamera.transform.position, pr) - PuolilahiVapaaM, 0f, PuolilahiLeikkausMaxM) : 0f;   // enintään 1,2 m: kuulija ei katoa blendissä
            // Kävely: kameran ja pelaajan väliin jäävä lähieste (pylväs, soihtu, oven pieli) jää piirtämättä (Päätoimittaja 7.10. 14.0x:
            // pihakuvassa pylväs peitti kolmanneksen) — leikkaus 1,2 m ennen pelaajaa, ettei hahmo itse katoa.
            if (SeikkailuPelaaja.Aktiivinen != null && SeikkailuPelaaja.Ensimmainen) nayttamo.LahiLeikkaus = 0f;   // silmistä: ei peittäjiä
            else if (SeikkailuPelaaja.Aktiivinen is SeikkailuPelaaja sp && nayttamo.Kamera != null)
                nayttamo.LahiLeikkaus = Mathf.Clamp(Vector3.Distance(nayttamo.Kamera.transform.position, sp.transform.position + Vector3.up * 1.2f) - 1.6f, 0f, KavelyLahiMaxM);   // enintään 2,2 m: lattia ruudun alareunassa ei katoa
            // Rengas piilossa myös 1,5 s puolilähikuvan jälkeen: blendi takaisin lepoon on vielä lähellä kasvoja (eleet-2-ajo 7.10.: kaari kokin yllä).
            if (puolilahiRinta.HasValue) himmennysAsti = Time.unscaledTime + 1.5f;
            // Kävelytilassa ei etsinnän renkaita (v44-ajo 7.10.: renkaat kameran edessä keittiössä).
            DioraamaEtsinta.Himmennys = Time.unscaledTime < himmennysAsti || SeikkailuPelaaja.Aktiivinen != null || SeikkailuVene.Aktiivinen != null;
            puolilahiRinta = null;
            nayttamo.Paivita(kameraAsento, y.VahennettyLiike, t, asetaKamera: !cmKaytossa && !KameraVapaa);
            hahmot3D.Paivita(rakennus, nakyma, nayttamo.Kamera, t);
            // era 2b kohta 4 (ali-agentti P4b): 3D-pienoisfiguurit -- SAMAAN kohtaan kuin vanha 2D-hahmot3D
            // yllä, mutta Nayttamon omistama (ks. DioraamaNayttamo.cs:n Hahmot3D-kommentti).
            // Kohtaukset v2: keskustelun puhuva hahmo (KuunnelmaKaistale: puhujittaiset aikaleimat) puhe-silmukalle; muut ennallaan.
            string puhuva = KuunnelmaKaistale.PuhuvaHahmo;
            if (puhuva != null && puhuva != DioraamaHahmot3D.Puhuja && DioraamaHahmot3D.Puhuja != null) DioraamaHahmot3D.EdellinenPuhuja = DioraamaHahmot3D.Puhuja;
            if (puhuva != null) DioraamaHahmot3D.Puhuja = puhuva;
            else if (!KuunnelmaKaistale.SoiNyt) DioraamaHahmot3D.Puhuja = DioraamaHahmot3D.EdellinenPuhuja = null; // keskustelu ohi
            DioraamaHahmot3D.PuhujanTila = nakyma.KohdeTila;
            // Puhujakuva (Codexin kasvot) pois linnasta (omistaja 6.10.2026: "ota codexin kasvot pois linnasta, se ei toimi"); vuorojen
            // ilme-kenttä jää dataan myöhempiä 3D-kasvoja varten.
            if (puhuva != null && nakyma.KohdeTila != null && nakyma.Hahmot != null)
                for (int hi = 0; hi < nakyma.Hahmot.Count; hi++)
                {
                    var hn = nakyma.Hahmot[hi];
                    if (hn.TilaId == nakyma.KohdeTila && hn.HahmoId == puhuva && hn.Naky)
                        nakyma.Hahmot[hi] = new HahmoNakyma(hn.TilaId, hn.HahmoId, hn.Naky, KuunnelmaKaistale.PuhuvaEle ?? "puhe", hn.Ruutu);
                }
            nayttamo.Hahmot3D?.Paivita(rakennus, nakyma, t);
            // Olavinlinna: kuoren leikkausikkuna kohdistetun tilan kohdalle (kasvaa kaarilennon jälkipuoliskolla).
            nayttamo.Ulkokuori?.PaivitaLeikkaus(rakennus, linssi.LeikkausHetkella(t), nayttamo.Kamera);
            syote.Paivita(rakennus, t);
            aanet?.Paivita(rakennus, nakyma, t);
        }

        public void Sulje()
        {
            if (aktiivinen == this) aktiivinen = null;
            linssi.Sulje();
            timeline.Tuhoa(); // ennen aanet.Sulje: vanhan graafin klipit eivät enää koske kertojaan
            kelloSiirto = 0;
            kuoriOdotusAlku = -1f; SaapumisOdotus = false; RakennusLatautuu = false; LatausVirhe = null; // näyttämö (ja sen odotuspiilotus) tuhoutuu alla
            // Historiamoottori: seikkailu pois (näyttämön lapset tuhoutuvat; globaalit kuoren leikkaukset ja kävelydata nollataan).
            SeikkailuVartijat.Poista(); SeikkailuVene.Poista(); SeikkailuPelaaja.Poista(); SeikkailuRepliikit.Poista(); SeikkailuEsineet.Poista(); SeikkailuKynttilat.Poista(); SeikkailuKappeli.Poista(); SeikkailuAanet.Poista(); SeikkailuTallentaja.Poista(); SeikkailuVihjeet.Poista(); SeikkailuValot.Poista(); SeikkailuYo.Poista(); SeikkailuSade.Poista(); SeikkailuKasittely.Tyhjenna(); SeikkailuKavely.Pura();
            SeikkailuEsineet.Kolahti -= KokkiKuuleeKolahduksen;
            cm?.SeikkailuPois(); PelattavaPalaPyydetty = false; KameraVapaa = false;
            if (DioraamaLevyvalimuisti.TestiOsoitin == PelattavaPalaHash)
            {
                // Seuraava avaus taas tuotannosta (myös kesken latauksen suljettaessa): osoitin pois ja rakennus unohdetaan ilman latausta.
                DioraamaLevyvalimuisti.TestiOsoitin = null;
                rakennus = null; latausKaynnissa = false;
            }
            pelattavaPala = false;
            rakennus3D?.Tyhjenna(); rakennus3D = null;
            hahmot3D?.Tyhjenna(); hahmot3D = null;
            nayttamo?.Tuhoa(); nayttamo = null;
            cm = null; // kamerat olivat näyttämön lapsia
            AktiivinenKamera = null;
            syote = null;
            aanet?.Sulje(); // kahvat kiinni ja puhuja pois; aanet ITSE säilyy (klippivälimuisti), ks. kentän kommentti.
            // UUDELLEENAVAUS (löydös, katselmointi 29.9.2026): ilman tätä tilatJonossaTaiValmiit jne. muistaisivat
            // edellisen (juuri tuhotun) näyttämön lataukset valmiiksi tehdyiksi, eikä uusi rakennus3D/hahmot3D/
            // Liekit koskaan täyttyisi toisella avauksella.
            NollaaNakymanLataukset();
            SyoteLukko.PoistaNakymaPeitto(nakymaPeitto);
            if (kierto != null) SyoteLukko.Vapauta(this);
            y?.Pelikerrokset(true);
            y?.MusiikkiPitoon(false);
            y?.Taustaaani(null); // palautus (ks. Avaa): ei jätetä muuta arvoa roikkumaan, vaikka aanet ei sitä asettanutkaan.
            avoinna = false;
            pysaytettyT = null;
            if (taukoT.HasValue) { taukoT = null; DioraamaAanet.TaukoPuhe(false); }
            if (aktiivinenSovitin == this) aktiivinenSovitin = null;
            pakotettuTila = null;
            pakotettuTaso = -1;
            viimeNakyma = null;
            ViimeisinNakyma = null;
            Linssi = null;
            Vaihtui?.Invoke(null);
            LukitseVaaka(false);
        }

        // LINNA AUKEAA VAAKANA (omistaja 4.10. 20.2x): iPhonella poikkileikkaus lukittuu vaaka-asentoon avattaessa (laitteen
        // vaakasuunta, jos puhelin on jo vaakana) ja palaa suljettaessa pelaajan aiempaan asentoon. iPad myös (omistaja 6.10.2026:
        // "ipadissa näyttö voisi myös kääntyä valmiiksi vaakatilaan tässä linssissä"; Unity 6 käyttää iPadOS 16+:ssa
        // requestGeometryUpdatea, UIRequiresFullScreen = true). Paluussa ensin entinen asento ja seuraavassa kehyksessä
        // automaattikierto takaisin (Natiiviseppä 6.10.: Screen.orientation = asentoEnnen lukitsi laitteen siihen asentoon).
        static ScreenOrientation? asentoEnnen;
        static void LukitseVaaka(bool paalle)
        {
            if (paalle)
            {
                if (asentoEnnen.HasValue || !Application.isMobilePlatform) return;
                asentoEnnen = Screen.orientation;
                var pyydetty = Input.deviceOrientation == DeviceOrientation.LandscapeRight ? ScreenOrientation.LandscapeRight : ScreenOrientation.LandscapeLeft;
                Screen.orientation = pyydetty;
                // Screen.orientation vaihtuu vasta seuraavissa kehyksissä (savuke 1141: loki "Portrait → Portrait" tulkittiin
                // FAILiksi): lokiin pyydetty asento heti ja toteutunut, kun kierto on ehtinyt tapahtua.
                Debug.Log($"MATKAKIRJA linssit: poikki: linna vaakaan ({asentoEnnen} → pyydetty {pyydetty})");
                UiKerros.Hae().StartCoroutine(KirjaaToteutunutAsento(pyydetty));
            }
            else if (asentoEnnen.HasValue)
            {
                Screen.orientation = asentoEnnen.Value;
                Debug.Log($"MATKAKIRJA linssit: poikki: linna suljettu, asento palautettu ({asentoEnnen}), automaattikierto seuraavassa kehyksessä");
                asentoEnnen = null;
                UiKerros.Hae().StartCoroutine(AutomaattikiertoTakaisin());
            }
        }

        static IEnumerator AutomaattikiertoTakaisin()
        {
            yield return null;
            if (asentoEnnen.HasValue) yield break;   // linna avattiin uudelleen välissä
            Screen.orientation = ScreenOrientation.AutoRotation;
        }

        static IEnumerator KirjaaToteutunutAsento(ScreenOrientation pyydetty)
        {
            float loppu = Time.unscaledTime + 2f;
            while (Screen.orientation != pyydetty && asentoEnnen.HasValue && Time.unscaledTime < loppu) yield return null;
            if (asentoEnnen.HasValue)
                Debug.Log($"MATKAKIRJA linssit: poikki: linnan asento toteutui {Screen.orientation}{(Screen.orientation == pyydetty ? "" : " (pyydetty " + pyydetty + ", ei toteutunut 2 s:ssa)")}");
        }

        /// <summary>Kohdistus (napautus tilan AABB:hen, "poikki tila"/"poikki yleis" -komennot): nollaa pelaajan vedon/nipistyksen.</summary>
        public void Kohdista(string tilaId, double t)
        {
            linssi.Kohdista(tilaId, t);
            syote?.NollaaPoikkeama();
        }

        public void Yleisnakymaan(double t) => Kohdista(null, t);

        /// <summary>Elävä linna: UI:n ‹-nappi (DioraamaTaulu) pyytää paluuta yleisnäkymään; toteutetaan seuraavassa Paivitassa.</summary>
        public static void PyydaPaluu() => paluuPyydetty = true;
        static bool paluuPyydetty;

        /// <summary>Linnan valikon Huoneet-lista (omistaja 2.10. 14.44): siirtyy tilaan seuraavassa Paivitassa.</summary>
        public static void PyydaTila(string tilaId) { pyydettyTila = tilaId; ValikkoPyysi = Time.unscaledTime; }
        /// <summary>Savuke 1139 (4.10.): linnan valikon huonevalinnan hetki — saman kosketuksen irrotus ei saa kohdistaa
        /// dioraamaa (DioraamaSyote), muuten näkymä palasi edelliseen huoneeseen.</summary>
        public static float ValikkoPyysi { get; private set; } = -1e9f;
        static string pyydettyTila;

        /// <summary>Äänen URL (era 2, DioraamaAanet.cs): Rakennus.Aanet[id].Tiedosto on suhteessa RAKENNUKSEN
        /// JUUREEN eli uusin.json:n kansioon (AmpariJuuri), EI hash-kansioon (dioraama-rajapinnat-era2-20260929.md
        /// kohta 1 ja 2 "AANET": äänet asuvat ämpärissä polussa dioraama/&lt;r&gt;/aanet/v&lt;versio&gt;/). Peili-ajossa
        /// juuret ovat samat. Löydös 29.9. PEILI=pois-ajosta: paketinJuuri antoi 404 kaikille äänille.</summary>
        public string AaniUrl(string tiedostoRelPolku) =>
            string.IsNullOrEmpty(tiedostoRelPolku) ? null
            // "/…" = median juuresta (Pelikoodarin mikseristemit aanet/mikseri/v1/ ovat ämpärin juuressa, 30.9.2026),
            // "https://…" sellaisenaan; muuten rakennuksen juuresta kuten ennen.
            : tiedostoRelPolku.StartsWith("https://", StringComparison.Ordinal) ? tiedostoRelPolku
            : tiedostoRelPolku.StartsWith("/", StringComparison.Ordinal) ? MediaJuuri + tiedostoRelPolku
            // https-peili (ämpärin hash-kansio, puhdas kuittaus ennen osoitinta): äänet eivät ole hash-kansiossa vaan
            // rakennuksen juuressa kuten tuotannossa (1.10.: kuittausajojen 145 äänen 404:ää) → peiliä ei käytetä.
            : peiliHttps ? AmpariJuuri + tiedostoRelPolku
            : peili(AmpariJuuri + tiedostoRelPolku);
        const string MediaJuuri = "https://media.matkakirja.app";

        IEnumerator PeiteHetkeksi(float sekuntia)
        {
            yield return new WaitForSecondsRealtime(sekuntia);
            if (avoinna) y?.Peite(false);
        }

        // --- lataus -----------------------------------------------------------------------------------------

        /// <summary>Tyhjentää tämän avauskerran latausjonot/-välimuistit (Sulje ja "poikki lataa"): UUDELLEENAVAUS-
        /// löydös (katselmointi 29.9.2026) -- ilman tätä tilatJonossaTaiValmiit jne. muistaisivat edellisen kerran
        /// lataukset "valmiiksi", eikä toisen avauksen tuore rakennus3D/hahmot3D/Liekit koskaan täyttyisi.
        /// avauskerta kasvaa aina kutsulla: kesken olevat latauskorutiinit (LataaTila/LataaAtlas/LataaPinta/
        /// LataaLiekkiAtlas) tunnistavat vanhentuneen kertansa palatessaan yield-lauseesta ja perääntyvät
        /// kirjoittamatta mihinkään (ei NullReferenceä, ei kirjoitusta vanhaan/väärään näyttämöön).</summary>
        void NollaaNakymanLataukset()
        {
            avauskerta++;
            tilojaKasitelty = hahmojaKasitelty = 0;
            tilatJonossaTaiValmiit.Clear();
            atlaksetJonossaTaiValmiit.Clear();
            hahmoGlbJonossaTaiValmiit.Clear();
            pinnatJonossaTaiValmiit.Clear();
            liekkiatlaksetJonossaTaiValmiit.Clear();
            foreach (var vanhaKuva in ladatutPinnat.Values) if (vanhaKuva != null) UnityEngine.Object.Destroy(vanhaKuva);
            ladatutPinnat.Clear();
            foreach (var vanhaKuva in ladatutLiekkiAtlakset.Values) if (vanhaKuva != null) UnityEngine.Object.Destroy(vanhaKuva);
            ladatutLiekkiAtlakset.Clear();
            foreach (var vanhaKuva in ladatutValoAtlakset.Values) if (vanhaKuva != null) UnityEngine.Object.Destroy(vanhaKuva);
            ladatutValoAtlakset.Clear();
        }

        string edellinenPeili = "pois (ämpäri)";

        /// <summary>Peili (ämpärin paketti toisesta juuresta) tai "pois"/null = tuotanto (uusin.json). Vaihto lataa rakennuksen uudelleen.</summary>
        void AsetaPeili(string arvo)
        {
            peiliHttps = false;
            peiliPaalla = !(arvo == null || arvo == "pois");
            if (!peiliPaalla) { peili = s => s; peiliKuvaus = "pois (ämpäri)"; }
            else
            {
                peiliHttps = arvo.StartsWith("https://", StringComparison.Ordinal);
                string uusiJuuri = arvo;
                peili = s => s.StartsWith(AmpariJuuri, StringComparison.Ordinal) ? uusiJuuri.TrimEnd('/') + "/" + s.Substring(AmpariJuuri.Length) : s;
                peiliKuvaus = uusiJuuri;
            }
            o.Kirjaa("poikki: peili " + peiliKuvaus);
            // Natiiviseppä 7.10. (FACEIT ABAB): "peili pois" A-peilin jälkeen käytti muistissa olevaa rakennusta, jonka juuri oli
            // hashiton (peilissä ei ole uusin.jsonia) → kaikki 404. Peilin vaihto lataa rakennuksen uudelleen seuraavassa avauksessa.
            if (peiliKuvaus != edellinenPeili && rakennus != null) { LataaUudelleen(); o.Kirjaa("poikki: peili vaihtui, rakennus ladataan uudelleen"); }
            edellinenPeili = peiliKuvaus;
        }

        /// <summary>Pelattavan palan kiinnitetty paketti (Linnanrakentajan v44g: kävely, Fogg, vene, laiturin kansi). Tuotannon osoitin
        /// (uusin.json) ei muutu: pala lukee tämän paketin testiosoittimena (sama hash-juuri ja manifest.json kuin julkaisulla, joten
        /// levyvälimuisti toimii; Päätoimittaja 7.10.: ei 250–400 Mt joka avauksella) ja palauttaa tuotannon, kun linna suljetaan.</summary>
        /// Uusi yhteensopimaton paketti (8.10.): vaihdetaan tässä, ei uusin.json:ssa, joten vanhat appit pysyvät omassa paketissaan.
        public const string PelattavaPalaHash = Matkakirja.Linssit.Seikkailu.PelattavaPala.Hash;   // Ydin PelattavaPala (v44z; testi sitoo simulaation kultaisiin)

        void LataaUudelleen()
        {
            rakennus = null; latausKaynnissa = false;
            NollaaNakymanLataukset();
            rakennus3D?.Tyhjenna(); hahmot3D?.Tyhjenna(); nayttamo?.Hahmot3D?.Tyhjenna(); nayttamo?.Liekit?.Tyhjenna();
            nayttamo?.Savu?.Tyhjenna(); nayttamo?.Ikkunat?.Tyhjenna(); nayttamo?.Ulkokuori?.Tyhjenna(); nayttamo?.Ymparisto?.Tyhjenna(); nayttamo?.Lokit?.Tyhjenna(); // Olavinlinna: ei tuplia
            if (avoinna) { latausKaynnissa = true; o.StartCoroutine(LataaRakennus()); }
        }

        IEnumerator LataaRakennus()
        {
            string uusin = null;
            paketinJuuri = AmpariJuuri;
            if (!peiliPaalla)
            {
                // Sisältövarasto (4.10.): sama istunnon osoitin kuin esilatauksella, ja manifesti ennen ensimmäistä hakua.
                string osoitin = null;
                yield return DioraamaLevyvalimuisti.LueOsoitin(AmpariJuuri, pv => osoitin = pv);
                // Natiiviseppä 7.10. (FACEIT ABAB): osoitin jäi tyhjäksi → paketti luettiin hashittomasta juuresta (404 kaikelle, "odotettiin
                // 0,1 s"). Tyhjä osoitin haetaan vielä kerran suoraan uusin.jsonista; hashittomasta juuresta ei koskaan ladata.
                if (string.IsNullOrEmpty(osoitin))
                {
                    o.Kirjaa("poikki: osoitin tyhjä, uusin.json uudelleen");
                    string u2 = null;
                    if (!DioraamaLevyvalimuisti.EstaOsoitin) yield return HaeTeksti(AmpariJuuri + "uusin.json?t=" + DateTime.UtcNow.Ticks, t => u2 = t);
                    try { if (u2 != null && Matkakirja.Peli.MiniJson.Jasenna(u2) is Dictionary<string, object> uo && uo.TryGetValue("polku", out var up)) osoitin = up as string; }
                    catch (Exception e) { o.Kirjaa("poikki: uusin.json: " + e.Message); }
                    if (string.IsNullOrEmpty(osoitin))
                    {
                        latausKaynnissa = false;
                        o.Kirjaa("poikki: linnan osoitinta ei saatu (uusin.json), ei ladata hashittomasta juuresta");
                        LatausVirhe = "Linnaa ei saatu ladattua. Tarkista verkkoyhteys.";
                        yield break;
                    }
                }
                if (!string.IsNullOrEmpty(osoitin))
                {
                    paketinJuuri = AmpariJuuri + osoitin.TrimEnd('/') + "/";
                    DioraamaLevyvalimuisti.Aseta(AmpariJuuri, osoitin.Trim('/'));
                    yield return DioraamaLevyvalimuisti.Valmistele(o.Kirjaa);
                }
                else DioraamaLevyvalimuisti.Aseta(AmpariJuuri, null);
            }
            else
            {
                yield return HaeTeksti(peili(AmpariJuuri + "uusin.json"), t => uusin = t);
                DioraamaLevyvalimuisti.Aseta(AmpariJuuri, null);
            }
            if (uusin != null)
            {
                try
                {
                    var o = Matkakirja.Peli.MiniJson.Jasenna(uusin) as Dictionary<string, object>;
                    string polku = o != null && o.TryGetValue("polku", out var p) ? p as string : null;
                    if (!string.IsNullOrEmpty(polku))
                    {
                        paketinJuuri = AmpariJuuri + polku.TrimEnd('/') + "/";
                        DioraamaLevyvalimuisti.Aseta(AmpariJuuri, polku.Trim('/'));
                    }
                }
                catch (Exception e) { o.Kirjaa("poikki: uusin.json: " + e.Message); }
            }
            string json = null;
            yield return HaeTeksti(peili(paketinJuuri + "rakennus.json"), t => json = t);
            latausKaynnissa = false;
            if (json == null) { o.Kirjaa("poikki: rakennus.json ei latautunut"); LatausVirhe = "Linnaa ei saatu ladattua. Tarkista verkkoyhteys."; yield break; }
            try { rakennus = DioraamaData.Lue(json); }
            catch (Exception e) { o.Kirjaa("poikki: rakennus.json jäsennys: " + e.Message); yield break; }
            if (rakennus?.Tilat == null) { o.Kirjaa("poikki: rakennus.json ilman tiloja"); yield break; }
            o.Kirjaa($"poikki: {rakennus.Nimi} ladattu, {rakennus.Tilat.Count} tilaa, juuri {paketinJuuri}");
            if (avoinna)
            {
                linssi.Avaa(rakennus, YdinAika, SaapuminenNahty);
                aanet?.RakennusValmis(rakennus); // rakennus oli null Avaa-kutsun hetkellä: äänet saavat sen vasta nyt.
                TaydennaPinnatJaLiekit();
                LataaUlkokuori();
                AloitaKuoriOdotus(YdinAika);
                TaydennaLataamattomat();
            }
        }

        // Saapumiskaari odottaa linnaa (4.10.: täysi tarkkuus, ks. Paivita; ennen kevyttä kuorta): 1.0.64-puhdasajossa kaaren 3. sekunnilla
        // kuorta ei vielä ollut ja harmaat tilapalikat näkyivät veden päällä. Odotuksen ajan aika on jäädytetty kaaren
        // alkuun (kamera kaukana järvellä), ja näyttämö piilottaa kaiken paitsi veden (DioraamaNayttamo.Odota).
        // 4.10.: odotus päättyy, kun kaikki on valmiina tai lataus häiriintyy (JumiS ilman edistystä), ei kiinteää enimmäisaikaa.
        const float HaivytysS = 2.5f, NimiruutuMinS = 2f;
        /// <summary>Saapumisodotuksen nimiruudun tekstit (DioraamaTaulu): rakennuksen nimi versaalina ja alarivi.</summary>
        public static string SaapumisNimi
        {
            get
            {
                string n = Linssi?.Rakennus?.Nimi;
                // Ennen rakennus.jsonia linssin oma lyhyt kuvaus ("Olavinlinna aukileikattuna") → ensimmäinen sana; muu rakennus: id.
                if (string.IsNullOrEmpty(n)) n = RakennusId == Oletusrakennus ? (PoikkileikkausLinssi.PoikkiTiedot.Lyhyt ?? "").Split(' ')[0] : RakennusId.Replace('-', ' ');
                return n.ToUpperInvariant();
            }
        }
        /// <summary>Linssi auki ja rakennus.json latautuu (nimiruutu näkyy jo silloin).</summary>
        public static bool RakennusLatautuu { get; private set; }
        public const string SaapumisAlarivi = "Savonlinna · 1475";
        /// <summary>Nimiruudun alarivi: rakennus.jsonin alarivi (Kielletty kaupunki "Peking · 1873"), muuten SaapumisAlarivi.</summary>
        public static string SaapumisAlariviNyt => !string.IsNullOrEmpty(Linssi?.Rakennus?.Alarivi) ? Linssi.Rakennus.Alarivi : SaapumisAlarivi;
        float kuoriOdotusAlku = -1f;
        /// <summary>Täyden tarkkuuden odotus: käsitellyt tilat ja hahmomallit (onnistuneet tai epäonnistuneet), lataushäiriön tunnistus.</summary>
        int tilojaKasitelty, hahmojaKasitelty, virheitaAlussa, viimeValmistuneita, osumiaAlussa, latauksiaAlussa;
        float viimeEdistys;
        const float JumiS = 60f;
        /// <summary>Lataushäiriö (DioraamaTaulu näyttää tilarivillä ja sulkee linssin); null = ei virhettä.</summary>
        public static string LatausVirhe { get; private set; }

        /// <summary>Ajaa latauksen loppuun ja laskee sen käsitellyksi (myös yield break -perääntyminen ja virhe).</summary>
        IEnumerator Kasitelty(IEnumerator lataus, Action valmis)
        {
            int kerta = avauskerta;
            yield return lataus;
            if (kerta == avauskerta) valmis();
        }

        /// <summary>
        /// KAMERA PUHUJAAN (omistaja 5.10. klo 14.4x, Päätoimittaja: rauhallisesti, ~1 s pehmeä blendi, kuulija jää kehyksen reunaan,
        /// ei leikkauksia, hidas kierto jatkuu): huoneen lepoasennon kohde siirtyy PuhujaSiirtyma-osuuden puhujan rintakehää kohti
        /// ja etäisyys lyhenee hieman. Oma lepokamera per puhuja (avain "tila:x|puhuja"), blendi ~1 s; puhuja tulee
        /// KuunnelmaKaistale.TulevaPuhujasta 0,5 s ennen vuoron vaihtoa. Muut lepoasennot ennallaan.
        /// </summary>
        (string, Asento, double, bool) PuhujaanPain((string Avain, Asento Perus, double Jaljella, bool Saapumassa) lepo, string tila)
        {
            string puhuja = KuunnelmaKaistale.TulevaPuhuja;
            // Vakaa kääntymisviite hahmoille: lepokameran suunta (kanoninen (sin a, −cos a) → Unity (sin a, 0, cos a)).
            if (tila != null && lepo.Avain == "tila:" + tila) { double la = lepo.Perus.Atsimuutti * Math.PI / 180; DioraamaHahmot3D.LepoKameraSuunta = new Vector3((float)Math.Sin(la), 0f, (float)Math.Cos(la)); }
            else DioraamaHahmot3D.LepoKameraSuunta = null;
            if (puhuja == null || lepo.Jaljella > 0 || tila == null || lepo.Avain != "tila:" + tila || rakennus?.Tila(tila) is not Tila t) return lepo;
            Hahmo h = null;
            foreach (var x in t.Hahmot) if (x.Id == puhuja) { h = x; break; }
            if (h == null) return lepo;
            if (Puolilahi && DioraamaHahmot3D.EleetPaalla)
            {
                Hahmo lk = null; double ld = double.MaxValue;
                foreach (var x in t.Hahmot)
                {
                    if (x == h || x.Reitti != null) continue;
                    double dx = x.Paikka.X - h.Paikka.X, dz = x.Paikka.Z - h.Paikka.Z;
                    if (dx * dx + dz * dz < ld) { ld = dx * dx + dz * dz; lk = x; }
                }
                return Puolilahikuva(lepo, lepo.Perus, h, lk, ld, puhuja, tila);
            }
            if (h.Reitti != null) return lepo;
            // KESKUSTELUKUVA (Päätoimittaja 5.10. 15.3x: eleet näkyviin puhelimella): kuulijaksi lähin paikallaan oleva hahmo;
            // kohde puhujan ja kuulijan väliin puhujaa painottaen ja etäisyys niin, että hahmo täyttää ~40 % ruudun korkeudesta
            // ja molemmat mahtuvat leveyssuunnassa. Rajat: enintään 0,88 × huoneen lepoetäisyys, vähintään 0,3 ×.
            Hahmo kuulija = null; double lahin = double.MaxValue;
            foreach (var x in t.Hahmot)
            {
                if (x == h || x.Reitti != null) continue;
                double dx = x.Paikka.X - h.Paikka.X, dz = x.Paikka.Z - h.Paikka.Z, d2 = dx * dx + dz * dz;
                if (d2 < lahin) { lahin = d2; kuulija = x; }
            }
            var p = lepo.Perus;
            var puhujanKeski = new Matkakirja.Linssit.Dioraama.V3(h.Paikka.X, h.Paikka.Y + HahmonKeski, h.Paikka.Z);
            var keski = puhujanKeski;
            double vali = 0;
            if (kuulija != null && lahin < KuulijaMaxM * KuulijaMaxM)
            {
                var kuulijanKeski = new Matkakirja.Linssit.Dioraama.V3(kuulija.Paikka.X, kuulija.Paikka.Y + HahmonKeski, kuulija.Paikka.Z);
                keski = puhujanKeski + (kuulijanKeski - puhujanKeski) * (1 - PuhujanPaino);
                vali = Math.Sqrt(lahin);
            }
            var kohde = p.Kohde + (keski - p.Kohde) * PuhujaSiirtyma;
            double tanPuoli = Math.Tan((p.Fov > 1 ? p.Fov : 40.0) * Math.PI / 360.0);
            double korkeudesta = HahmonKorkeus / (2 * HahmonOsuusKorkeudesta * tanPuoli);
            double leveydesta = (vali + 1.6) / (2 * tanPuoli * RuudunSuhde * 0.8);
            double etaisyys = Math.Clamp(Math.Max(korkeudesta, leveydesta), p.Etaisyys * 0.3, p.Etaisyys * 0.88);
            return (lepo.Avain + "|" + puhuja, new Asento(kohde, p.Atsimuutti, p.Korkeus, etaisyys, p.Fov, p.Aukko, p.Kierto), 0.2, false);
        }
        /// <summary>
        /// PUOLILÄHIKUVA (Päätoimittaja 7.10. 03.0x, omistajan linja 6.10. "kamera puhujan mukaan, rauhallisesti", ~1 s blendi, ei
        /// leikkauksia): kamera puhujan eteen viistosti (puhuja kääntyy kuulijaan, DioraamaHahmot3D.KatseenKohde), kohde rintakehä,
        /// näkyvissä vyötäröstä pään yläpuolelle (kasvot, kädet, FACEIT-ilmeet ja huulet). Suunta pysyy huoneen avoimella puolella
        /// (enintään PuolilahiMaxKierto lepokamerasta, poikkileikkauksen seinät), korkeuskulma matala, pieni kierto jatkuu.
        /// "poikki puolilahi 0|1" (A/B; pois = keskustelukuva kuten ennen).
        /// </summary>
        public static bool Puolilahi = true;
        (string, Asento, double, bool) Puolilahikuva((string Avain, Asento Perus, double Jaljella, bool Saapumassa) lepo, Asento p, Hahmo h, Hahmo kuulija, double lahin, string puhuja, string tila)
        {
            // Kasvojen suunta kompassiasteina (kanoninen (sin a, −cos a)): kohti lähintä kuulijaa, muuten hahmon oma suunta.
            // Ilman paikallaan olevaa kuulijaa puhuja kääntyy kameraan (DioraamaHahmot3D.KatseenKohde "@kamera") → kasvot lepokameran suuntaan.
            double kasvot = p.Atsimuutti;
            if (kuulija != null && lahin < KuulijaMaxM * KuulijaMaxM && lahin > 0.01)
                kasvot = Math.Atan2(kuulija.Paikka.X - h.Paikka.X, -(kuulija.Paikka.Z - h.Paikka.Z)) * 180 / Math.PI;
            // Kamera kasvojen puolelle ±PuolilahiSivu (lepokameran puolelle), rajattuna lepokameran ympärille.
            // RAJAUS (Päätoimittaja 7.10.: vouti jäi reunaan, kuvassa tyhjiä penkkejä): kun tämä on soiva puhuja, kohde ja kasvot tulevat
            // hahmon tämän hetken paikasta ja suunnasta (kävelevä vouti, kuulijaan kääntynyt puhuja), ei datan lähtöpaikasta.
            // PUHUJA AINA KUVASSA (Päätoimittaja 7.10. 09.4x: kappelissa tyhjiä penkkejä): kohde ja kasvot puhujan TÄMÄN HETKEN paikasta
            // (DioraamaHahmot3D.TilanHahmot; myös vuoroon tuleva ja kävelevä puhuja), datan lähtöpaikka vain jos hahmoa ei vielä näy.
            var hx = h.Paikka;
            foreach (var th in DioraamaHahmot3D.TilanHahmot)
                if (th.Id == puhuja)
                {
                    hx = new Matkakirja.Linssit.Dioraama.V3(th.Juuri.x, th.Juuri.y, -th.Juuri.z);   // UnityPiste peilaa z:n
                    if (new Vector2(th.Kasvot.x, th.Kasvot.z).sqrMagnitude > 1e-4f) kasvot = Math.Atan2(th.Kasvot.x, th.Kasvot.z) * 180 / Math.PI;
                    break;
                }
            var rinta = new Matkakirja.Linssit.Dioraama.V3(hx.X, hx.Y + PuolilahiKohdeY, hx.Z);   // puhuja keskelle (ei kuulijaan päin)
            puolilahiRinta = DioraamaNayttamo.UnityPiste(rinta);
            double fov = p.Fov > 1 ? p.Fov : 40.0;
            double etaisyys = Math.Max(PuolilahiKorkeusM / (2 * Math.Tan(fov * Math.PI / 360.0)), PuolilahiMinM);
            double korkeus = Math.Min(p.Korkeus, PuolilahiKorkeusAst);
            // KAMERAN PUOLI (Päätoimittaja 7.10.: kuulija tai liekkikartio puhujan edessä): ehdokkaat kasvojen molemmin puolin
            // (ensin lepokameran puoli), kukin rajattuna ±PuolilahiMaxKierto lepokamerasta; valitaan ensimmäinen, jonka näkölinjalla
            // kamerasta rintaan ei ole toista hahmoa (0,45 m) eikä tilan liekkiä (0,6 m).
            double ero = KiertoEro(p.Atsimuutti, kasvot);
            double puoli = -Math.Sign(ero == 0 ? 1 : ero);
            double atsimuutti = double.NaN, varalla = double.NaN;
            foreach (double sivu in new[] { PuolilahiSivu * puoli, -PuolilahiSivu * puoli, 55 * puoli, -55 * puoli, 0 })
            {
                double ehd = p.Atsimuutti + Math.Clamp(KiertoEro(p.Atsimuutti, kasvot + sivu), -PuolilahiMaxKierto, PuolilahiMaxKierto);
                if (double.IsNaN(varalla)) varalla = ehd;
                var (kp, _) = Kameraliike.AsentoSijainti(new Asento(rinta, ehd, korkeus, etaisyys, fov, p.Aukko));
                if (!NakolinjaPeitossa(DioraamaNayttamo.UnityPiste(kp), puolilahiRinta.Value, puhuja, tila)) { atsimuutti = ehd; break; }
            }
            if (double.IsNaN(atsimuutti)) atsimuutti = varalla;
            return (lepo.Avain + "|" + puhuja + DioraamaCinemachine.PuolilahiPaate, new Asento(rinta, atsimuutti, korkeus, etaisyys, fov, p.Aukko, p.Kierto), 0.2, false);
        }
        static double KiertoEro(double a0, double a1) => ((a1 - a0 + 180) % 360 + 360) % 360 - 180;
        // HISTORIAMOOTTORI: kävelytila. Kävelygeometria (Linnanrakentajan kavely { osat, merkit } tai kehitysjuuri), sitten pelaaja
        // aloituspaikkaan: merkki "ovi:<tid>-alku"/osa tid tai tilan kamerakohde, ja pudotus lähimmälle törmäyspinnalle.
        static string kavelyKehitysJuuri;
        string pelaajaKameraTapa;
        /// <summary>Kehittäjävalikon pelattava pala (LinssiOhjain.AvaaPelattavaPala): käynnistyy, kun Olavinlinna on ladattu.</summary>
        public static bool PelattavaPalaPyydetty;
        /// <summary>Pelattava pala jatkuu tallennuksesta (Natiivi-UI:n Jatka; SeikkailuTallentaja.LueTiedosto kertoo, onko jatkettavaa).</summary>
        public static bool PelattavaPalaJatka;

        IEnumerator Botti(int alkuN)
        {
            var d = SeikkailuKavely.Data; var p = SeikkailuPelaaja.Aktiivinen;
            if (d == null || p == null) { o.Kirjaa("botti: ei pelaajaa tai kävelydataa"); yield break; }
            var pisteet = new SortedDictionary<int, Matkakirja.Linssit.Seikkailu.KavelyMerkki>();
            foreach (var m in d.Lajia("reitti"))
                if (m.Tunnus.StartsWith("pelaaja-", StringComparison.Ordinal) && int.TryParse(m.Tunnus.Substring(8), out int n) && n >= alkuN) pisteet[n] = m;
            int kiinni = 0; void Laske(string osa) => kiinni++;
            SeikkailuVartijat.Kiinnijaatiin += Laske;
            float alku = Time.unscaledTime;
            o.Kirjaa($"botti: {pisteet.Count} pistettä (reitti:pelaaja-{alkuN}…)");
            foreach (var kv in pisteet)
            {
                p = SeikkailuPelaaja.Aktiivinen; if (p == null) break;
                var kohde = new Vector3((float)kv.Value.X, (float)kv.Value.Y, (float)-kv.Value.Z);
                bool reitti = p.KaveleKohti(kohde);
                float t0 = Time.unscaledTime;
                while (p != null && p.Napautuskavely && Time.unscaledTime - t0 < 40f) { yield return null; p = SeikkailuPelaaja.Aktiivinen; }
                float etaisyys = p != null ? Vector3.Distance(p.transform.position, kohde) : -1;
                o.Kirjaa($"botti: pelaaja-{kv.Key} {(etaisyys >= 0 && etaisyys < 1.0f ? "OK" : "VIRHE")} {etaisyys:F1} m, {Time.unscaledTime - t0:F1} s{(reitti ? "" : " (ei NavMesh-reittiä)")}, kiinni {kiinni}");
            }
            SeikkailuVartijat.Kiinnijaatiin -= Laske;
            var tv = typeof(DioraamaSovitin).Assembly.GetType("Matkakirja.Natiivi.SeikkailuTapit")?.GetMethod("Tekstivahti", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            string teksti = tv != null ? tv.Invoke(null, null) as string : "ei Tekstivahtia";
            o.Kirjaa($"botti: valmis {Time.unscaledTime - alku:F0} s, kiinnijäämisiä {kiinni}, tekstivahti {teksti}");
        }

        /// <summary>V6 jatko: pelaaja viimeisimpään tarkistuspisteeseen ilman saapumista, armoaika 4 s, vartijat ja kappeli kuten laiturilta.</summary>
        IEnumerator JatkaTallennuksesta(Matkakirja.Linssit.Seikkailu.SeikkailuTallennus t)
        {
            yield return VarmistaKavelyData();
            if (nayttamo == null || rakennus == null) yield break;
            SeikkailuKavely.Leikkaukset(true);
            Physics.SyncTransforms();
            var alku = new Vector3((float)t.X, (float)t.Y, (float)t.Z);
            if (Physics.Raycast(alku + Vector3.up * 1.5f, Vector3.down, out var osuma, 4f, 1 << DioraamaNayttamo.Kerros)) alku = osuma.point + Vector3.up * 0.05f;
            var sp = SeikkailuPelaaja.Luo(nayttamo.transform, alku, 0f, DioraamaNayttamo.Kerros);
            LisaaPelaajahahmo(sp);
            SeikkailuVartijat.AlkuArmo = true;
            o.StartCoroutine(VartijatPaalle());
            o.StartCoroutine(KappeliPaalle());
            o.Kirjaa($"seikkailu: jatko tarkistuspisteestä {t.TarkistusOsa} ({alku}), kulunut {t.KulunutS:F0} s");
            // M-osa: tila (puettu, avaimet, ovet, kulho, köysi, tiilet, kilvet, arkku, kello) takaisin, kun esineet ja huoneiden 6–10 osat
            // on luotu (enintään 60 s).
            for (float w = 0; w < 60f && !(SeikkailuEsineet.Aktiivinen is SeikkailuEsineet es0 && es0.Valmis); w += Time.unscaledDeltaTime) yield return null;
            if (SeikkailuEsineet.Aktiivinen is SeikkailuEsineet es && es.Valmis)
            {
                var m = Matkakirja.Linssit.Seikkailu.MTila.Lue(t);
                es.PalautaM(m); SeikkailuSali.Aktiivinen?.PalautaM(m); SeikkailuKomero.Aktiivinen?.PalautaM(m); SeikkailuPako.Aktiivinen?.PalautaM(m);
                for (float w = 0; w < 30f && SeikkailuKappeli.Aktiivinen == null; w += Time.unscaledDeltaTime) yield return null;
                SeikkailuKappeli.Aktiivinen?.Palauta(t);   // ratkaistu kappeli ei toistu jatkossa huoneisiin 6–10
            }
        }
        /// <summary>Kamera ulkoisen ohjauksen vallassa (E3 loppu: SeikkailuNousu); Sovitin ei kirjoita kameraan.</summary>
        public static bool KameraVapaa;
        bool pelattavaPala;
        bool veneLaituriin; int veneRepliikki;
        // Omistaja 8.10.: souto noin 22 s (oli 50 s): reitin loppuosa 46 m samalla soutuvauhdilla (~2,1 m/s), linna näkyy heti.
        const double VeneSumuM = 120, VeneKestoS = 22, VeneMatkaM = 46;
        float himmennysAsti = -1f;
        const double KavelySumuM = 25;
        const float KavelyLahiMaxM = 2.2f;
        IEnumerator VarmistaKavelyData()
        {
            if (SeikkailuKavely.Ladattu) yield break;
            string osatUrl = kavelyKehitysJuuri != null ? kavelyKehitysJuuri + "osat.json" : !string.IsNullOrEmpty(rakennus.KavelyOsat) ? paketinJuuri + rakennus.KavelyOsat : null;
            string merkitUrl = kavelyKehitysJuuri != null ? kavelyKehitysJuuri + "merkit.json" : !string.IsNullOrEmpty(rakennus.KavelyMerkit) ? paketinJuuri + rakennus.KavelyMerkit : null;
            if (osatUrl != null) yield return SeikkailuKavely.Lataa(osatUrl, merkitUrl, peili, rakennus3D, rakennus, nayttamo.transform, o.Kirjaa);
            SeikkailuKavely.AsetaMarkyys(rakennus3D);
        }

        // HISTORIAMOOTTORI V2: venesaapuminen. Reitti merkeistä vene:* (järjestyksessä; vene:laituri kierto_y = keulan suunta), muuten
        // varareitti laiturin tilan kameran suunnasta (vedenpinnassa, 120 / 40 / 8 m → 2 m laiturin kohteesta). Perillä pelaaja nousee
        // merkkiin nousu:laituri (tai laiturin kohteeseen) ja kamera blendaa olan yli -kameraan.
        IEnumerator VenePaalle(double kesto)
        {
            if (nayttamo == null || rakennus == null) { o.Kirjaa("poikki: vene: linssi ei auki"); yield break; }
            var vm = rakennus.Ymparisto?.Rekvisiitta?.Find(x => x.Id == "vene") ?? default;
            if (vm.Id == null) { o.Kirjaa("poikki: vene: rekvisiitta vene puuttuu (ymparisto.mallit, maailmaan: false)"); yield break; }
            yield return VarmistaKavelyData();
            SeikkailuPelaaja.Poista(); SeikkailuVene.Poista(); cm?.SeikkailuPois(); veneLaituriin = false; veneRepliikki = 0;
            AanetPaalle();
            SeikkailuRepliikit.Luo(nayttamo.transform, MediaJuuri + "/seikkailu/" + RakennusId + "/repliikit-v3/manifest.json", o.Kirjaa);
            SeikkailuTietokerros.Luo(nayttamo.transform, MediaJuuri + "/seikkailu/" + RakennusId + "/tietokerros-v1/tietokerros.json", RakennusId, o.Kirjaa);
            double vesi = rakennus.Ulkokuori?.VesiY ?? 0;
            var reitti = new List<(double X, double Y, double Z)>(); double? loppuSuunta = null;
            if (SeikkailuKavely.Data != null)
                foreach (var m in SeikkailuKavely.Data.Lajia("vene")) { reitti.Add((m.X, vesi, m.Z)); if (m.Tunnus == "laituri") loppuSuunta = m.KiertoY; }
            string lahde = "merkit";
            if (reitti.Count < 2)
            {
                lahde = "varareitti";
                reitti.Clear();
                var lt = rakennus.Tila("laituri");
                if (lt == null) { o.Kirjaa("poikki: vene: ei vene:-merkkejä eikä laituri-tilaa"); yield break; }
                var (ks, _) = Kameraliike.AsentoSijainti(lt.Kamera);
                double dx = ks.X - lt.Kamera.Kohde.X, dz = ks.Z - lt.Kamera.Kohde.Z, l = Math.Sqrt(dx * dx + dz * dz);
                dx /= Math.Max(1e-6, l); dz /= Math.Max(1e-6, l);
                foreach (double e in new[] { 120.0, 40, 8, 2 }) reitti.Add((lt.Kamera.Kohde.X + dx * e + (e > 30 ? dz * e * 0.15 : 0), vesi, lt.Kamera.Kohde.Z + dz * e - (e > 30 ? dx * e * 0.15 : 0)));
            }
            reitti = Matkakirja.Linssit.Seikkailu.Venesaapuminen.Lyhenna(reitti, VeneMatkaM * kesto / VeneKestoS);
            var ydin = new Matkakirja.Linssit.Seikkailu.Venesaapuminen(reitti, kesto, loppuSuunta);
            bool puhelin = SystemInfo.deviceModel != null && SystemInfo.deviceModel.StartsWith("iPhone");
            string polku = puhelin ? (vm.Kevyt ?? vm.Huippu) : (vm.Huippu ?? vm.Kevyt);
            linssi.KertojaPois();
            yield return SeikkailuVene.Aloita(peili(paketinJuuri + polku), ydin, nayttamo.transform, DioraamaNayttamo.Kerros, o.Kirjaa,
                nayttamo.Hahmot3D, rakennus, rakennus.Henkilot != null && rakennus.Henkilot.ContainsKey("soutaja-1500") ? "soutaja-1500" : null);
            var irrallisetGlb = new List<string>();
            nayttamo.Hahmot3D?.IrrallistenGlb(irrallisetGlb);
            foreach (var glb in irrallisetGlb)
                if (hahmoGlbJonossaTaiValmiit.Add(glb)) o.StartCoroutine(LataaHahmoGlb(glb));
            o.Kirjaa($"poikki: vene päällä ({lahde}, {reitti.Count} pistettä, {ydin.Pituus:F0} m, {ydin.KestoS:F0} s)");
        }

        /// <summary>Pelaajahahmo (rakennus.json pelaaja, Linnanrakentajan Fogg) kapselin tilalle: irrallinen hahmo pelaajan hahmosolmussa
        /// (skin-hahmo katsoo Unityssa paikallista −z:aa → 180°), leike pelaajan liikkeestä. Henkilö syntetisoidaan rakennuksen henkilöihin.</summary>
        /// <summary>E2: keittiön heitettävät esineet ja kolahduksen ääni (kerran per kävelydata).</summary>
        IEnumerator EsineetPaalle()
        {
            if (SeikkailuEsineet.Aktiivinen != null || SeikkailuKavely.Data == null) yield break;
            yield return SeikkailuEsineet.Lataa(SeikkailuKavely.Data, SeikkailuKavely.Juuri, peili, nayttamo.transform, o.Kirjaa);
            if (SeikkailuEsineet.KolahdusKlippi == null && rakennus?.Aanet != null && rakennus.Aanet.TryGetValue("pikari-1", out var ko) && !string.IsNullOrEmpty(ko.Tiedosto))
            {
                using var q = UnityEngine.Networking.UnityWebRequestMultimedia.GetAudioClip(AaniUrl(ko.Tiedosto), AudioType.MPEG);
                ((UnityEngine.Networking.DownloadHandlerAudioClip)q.downloadHandler).streamAudio = false;
                yield return q.SendWebRequest();
                if (q.result == UnityEngine.Networking.UnityWebRequest.Result.Success) SeikkailuEsineet.KolahdusKlippi = UnityEngine.Networking.DownloadHandlerAudioClip.GetContent(q);
            }
            // E3: koputuksen ontto ääni (väliaikaisesti ovi-puu matalammalla sävelellä, kunnes oma koputusääni on pankissa).
            if (SeikkailuEsineet.OnttoKlippi == null && rakennus?.Aanet != null && rakennus.Aanet.TryGetValue("ovi-puu", out var ov) && !string.IsNullOrEmpty(ov.Tiedosto))
            {
                using var q2 = UnityEngine.Networking.UnityWebRequestMultimedia.GetAudioClip(AaniUrl(ov.Tiedosto), AudioType.MPEG);
                ((UnityEngine.Networking.DownloadHandlerAudioClip)q2.downloadHandler).streamAudio = false;
                yield return q2.SendWebRequest();
                if (q2.result == UnityEngine.Networking.UnityWebRequest.Result.Success) SeikkailuEsineet.OnttoKlippi = UnityEngine.Networking.DownloadHandlerAudioClip.GetContent(q2);
            }
        }

        void LisaaPelaajahahmo(SeikkailuPelaaja sp)
        {
            var pm = rakennus?.Pelaaja;
            if (sp == null || pm == null || nayttamo?.Hahmot3D == null) return;
            const string id = "pelaaja-hahmo";
            rakennus.Henkilot ??= new Dictionary<string, Henkilo>();
            rakennus.Henkilot[id] = new Henkilo { Id = id, Nimi = pm.Nimi, Malli3d = new Malli3d { Skin = new SkinMalli { Glb = pm.Glb, Leikkeet = new Dictionary<string, string>(pm.Leikkeet) } } };
            sp.Malli = pm;
            nayttamo.Hahmot3D.PoistaIrralliset(id);
            if (SeikkailuPelaaja.Ensimmainen)
            {
                // Ensimmäinen persoona: ei vartaloa (omistaja 7.10. 18.5x); leikkeiden kestot (nousu) silti mallista. Kädet hihoineen ja
                // hanskoineen (18.7x) silmien lapsena, jos paketissa on pelaaja.kadet.
                if (pm.Kadet != null)
                {
                    const string kid = "pelaaja-kadet";
                    rakennus.Henkilot[kid] = new Henkilo { Id = kid, Nimi = pm.Kadet.Nimi, Malli3d = new Malli3d { Skin = new SkinMalli { Glb = pm.Kadet.Glb, Leikkeet = new Dictionary<string, string>(pm.Kadet.Leikkeet) } } };
                    nayttamo.Hahmot3D.PoistaIrralliset(kid);
                    nayttamo.Hahmot3D.LisaaIrrallinen(rakennus, kid, sp.Silmat, sp.KadetLeike, Quaternion.Euler(0f, 180f, 0f));
                    var h3 = nayttamo.Hahmot3D; sp.KadetSolmu = n => h3 != null ? h3.IrrallisenSolmu(kid, n) : null;
                    var kg = new List<string>(); nayttamo.Hahmot3D.IrrallistenGlb(kg);
                    foreach (var glb in kg) if (hahmoGlbJonossaTaiValmiit.Add(glb)) o.StartCoroutine(LataaHahmoGlb(glb));
                }
                // Takakuvan hahmo (M-osa: ulkoseinä, köysilasku): Fogg asu v2 piilossa, kunnes pelaaja on takakuvassa.
                if (sp.TakakuvaHahmo != null)
                {
                    nayttamo.Hahmot3D.LisaaIrrallinen(rakennus, id, sp.TakakuvaHahmo, sp.Leike, Quaternion.Euler(0f, 180f, 0f));
                    var tg = new List<string>(); nayttamo.Hahmot3D.IrrallistenGlb(tg);
                    foreach (var glb in tg) if (hahmoGlbJonossaTaiValmiit.Add(glb)) o.StartCoroutine(LataaHahmoGlb(glb));
                }
                o.StartCoroutine(EsineetPaalle());
                o.Kirjaa("seikkailu: ensimmäinen persoona (ei pelaajahahmoa)");
                return;
            }
            nayttamo.Hahmot3D.LisaaIrrallinen(rakennus, id, sp.Hahmo, sp.Leike, Quaternion.Euler(0f, 180f, 0f));
            var glbt = new List<string>();
            nayttamo.Hahmot3D.IrrallistenGlb(glbt);
            foreach (var glb in glbt) if (hahmoGlbJonossaTaiValmiit.Add(glb)) o.StartCoroutine(LataaHahmoGlb(glb));
            sp.KapseliPiiloon();
            o.StartCoroutine(EsineetPaalle());
            o.Kirjaa($"seikkailu: pelaajahahmo {pm.Nimi} ({pm.Glb}, {pm.Leikkeet.Count} leikettä)");
        }

        /// <summary>Henkilön ensimmäisen tilahahmon paikka Unityssa (kokki liedellä), tai null.</summary>
        Vector3? HenkilonPaikka(string henkiloId)
        {
            if (rakennus?.Tilat == null) return null;
            foreach (var t in rakennus.Tilat) if (t.Hahmot != null) foreach (var h in t.Hahmot) if (h.HenkiloId == henkiloId) return DioraamaNayttamo.UnityPiste(h.Paikka) + Vector3.up * 1.6f;
            return null;
        }

        void KokkiKuuleeKolahduksen(Vector3 kohta)
        {
            var r = SeikkailuRepliikit.Aktiivinen;
            if (r == null || !r.Valmis || Time.unscaledTime < kokkiRepliikkiAsti || DioraamaHahmot3D.PiilotetutHenkilot.Contains("kokki-1500") || HenkilonPaikka("kokki-1500") is not Vector3 kp || (kp - kohta).sqrMagnitude > 144f) return;   // partioiva kokki kuulee itse (SeikkailuVartijat)
            kokkiRepliikkiAsti = Time.unscaledTime + 8f;
            r.Soita(++kokkiLaskuri % 2 == 0 ? "kokki-harhautus-1" : "kokki-harhautus-2", kp);
        }
        float kokkiRepliikkiAsti; int kokkiLaskuri;

        /// <summary>E3a: kappelin kohtaus ja pimeys (SeikkailuKappeli); kynttilät ensin, keskustelun ääni rakennuksen äänistä.</summary>
        /// <summary>Seikkailun äänet ja repliikit (kerran; jo veneessä, Siirtoseppä 8.10.: veneyön "Hä?" ja sydän sekä sade soivat
        /// vasta laiturilla luotuina). Toinen kutsu ei lataa manifesteja uudelleen.</summary>
        void AanetPaalle()
        {
            if (nayttamo == null) return;
            SeikkailuRepliikit.Luo(nayttamo.transform, MediaJuuri + "/seikkailu/" + RakennusId + "/repliikit-v3/manifest.json", o.Kirjaa);
            var ennen = SeikkailuAanet.Aktiivinen;
            var a = SeikkailuAanet.Luo(nayttamo.transform, MediaJuuri + "/seikkailu/" + RakennusId + "/aanet-e3-v1/manifest.json", o.Kirjaa);
            if (a != ennen || SeikkailuSade.Aktiivinen == null)
            {
                SeikkailuAanet.LisaaManifest(MediaJuuri + "/seikkailu/" + RakennusId + "/aanet-fp-v1/manifest.json");   // Pelikoodari: askeleet, kantele (puuttuva ohitetaan)
                SeikkailuAanet.LisaaManifest(MediaJuuri + "/seikkailu/" + RakennusId + "/aanet-fp-v3/manifest.json");   // M-osa: tiilet, köysi, kello, uinti, airot … (v3: sukellus ja köysi uusittu, Pelikoodari 8.10.)
                SeikkailuAanet.LisaaManifest(MediaJuuri + "/seikkailu/" + RakennusId + "/aanet-saa-v3/manifest.json");   // Pelikoodari 8.10.: sade, tippuminen, ukkonen, märät askeleet, vihje-kimallus
                SeikkailuSade.Luo(nayttamo.transform);
            }
        }

        IEnumerator KappeliPaalle()
        {
            if (nayttamo == null || rakennus == null) yield break;
            yield return VarmistaKavelyData();
            if (SeikkailuKynttilat.Aktiivinen == null && rakennus.Tila("kappeli") != null)
            {
                var ky = SeikkailuKynttilat.Luo(nayttamo.transform, "kappeli", nayttamo.Liekit, rakennus3D, o.Kirjaa);
                if (ky != null) ky.Ydin.OmaKynttila = true;
            }
            AanetPaalle();
            AudioClip klippi = null;
            if (rakennus.Aanet != null && rakennus.Aanet.TryGetValue("kappeli-keskustelu", out var ka) && !string.IsNullOrEmpty(ka.Tiedosto))
            {
                using var q = UnityEngine.Networking.UnityWebRequestMultimedia.GetAudioClip(AaniUrl(ka.Tiedosto), AudioType.MPEG);
                ((UnityEngine.Networking.DownloadHandlerAudioClip)q.downloadHandler).streamAudio = false;
                yield return q.SendWebRequest();
                if (q.result == UnityEngine.Networking.UnityWebRequest.Result.Success) klippi = UnityEngine.Networking.DownloadHandlerAudioClip.GetContent(q);
            }
            SeikkailuKappeli.Luo(nayttamo.transform, rakennus, nayttamo.Hahmot3D, klippi, o.Kirjaa);
            var glbt = new List<string>();
            nayttamo.Hahmot3D?.IrrallistenGlb(glbt);
            foreach (var glb in glbt) if (hahmoGlbJonossaTaiValmiit.Add(glb)) o.StartCoroutine(LataaHahmoGlb(glb));
        }

        IEnumerator VartijatPaalle()
        {
            if (nayttamo == null || rakennus == null) { o.Kirjaa("poikki: vartijat: linssi ei auki"); yield break; }
            yield return VarmistaKavelyData();
            SeikkailuRepliikit.Luo(nayttamo.transform, MediaJuuri + "/seikkailu/" + RakennusId + "/repliikit-v3/manifest.json", o.Kirjaa);
            SeikkailuEsineet.Kolahti -= KokkiKuuleeKolahduksen; SeikkailuEsineet.Kolahti += KokkiKuuleeKolahduksen;
            SeikkailuVartijat.Liekit = nayttamo.Liekit;
            SeikkailuVartijat.Luo(nayttamo.transform, rakennus, SeikkailuKavely.Data, nayttamo.Hahmot3D, o.Kirjaa);
            SeikkailuKavely.AsetaMarkyys(rakennus3D);   // myöhemmin ladatut tilat (laituri, piha) märiksi
            // Askeleet (vartijat askel-kivi; pelaajan omat askeleet pinnan mukaan: askel-puu ym. rakennuksen äänistä, olki/sora/vesi aanet-fp-manifestista).
            if (rakennus.Aanet != null)
                foreach (var kv in rakennus.Aanet)
                {
                    if (!kv.Key.StartsWith("askel-", StringComparison.Ordinal) || string.IsNullOrEmpty(kv.Value?.Tiedosto) || SeikkailuVartijat.AskelKlipit.ContainsKey(kv.Key)) continue;
                    using var q = UnityEngine.Networking.UnityWebRequestMultimedia.GetAudioClip(AaniUrl(kv.Value.Tiedosto), AudioType.MPEG);   // äänet rakennuksen juuressa (E1-ajo: hash-juuri 404)
                    ((UnityEngine.Networking.DownloadHandlerAudioClip)q.downloadHandler).streamAudio = false;
                    yield return q.SendWebRequest();
                    if (q.result == UnityEngine.Networking.UnityWebRequest.Result.Success) SeikkailuVartijat.AskelKlipit[kv.Key] = UnityEngine.Networking.DownloadHandlerAudioClip.GetContent(q);
                    if (kv.Key == "askel-kivi") SeikkailuVartijat.AskelKlippi = SeikkailuVartijat.AskelKlipit.TryGetValue(kv.Key, out var kk) ? kk : null;
                    o.Kirjaa($"seikkailu: askeleet {kv.Key} {(SeikkailuVartijat.AskelKlipit.ContainsKey(kv.Key) ? "ladattu" : "ei latautunut")} ({kv.Value.Tiedosto})");
                }
            var glbt = new List<string>();
            nayttamo.Hahmot3D?.IrrallistenGlb(glbt);
            foreach (var glb in glbt) if (hahmoGlbJonossaTaiValmiit.Add(glb)) o.StartCoroutine(LataaHahmoGlb(glb));
        }

        IEnumerator VeneLaituriin()
        {
            yield return VarmistaKavelyData();
            if (SeikkailuPelaaja.Aktiivinen != null) yield break;
            var v = SeikkailuVene.Aktiivinen;
            var nm = SeikkailuKavely.Data == null ? null : System.Linq.Enumerable.FirstOrDefault(SeikkailuKavely.Data.Merkit, x => x.Nimi == "nousu:laituri");
            Vector3 alku; float yaw = 0f;
            var lt = rakennus.Tila("laituri");
            if (nm != null) alku = new Vector3((float)nm.X, (float)nm.Y, (float)-nm.Z);
            else if (lt != null) alku = DioraamaNayttamo.UnityPiste(lt.Kamera.Kohde);
            else { o.Kirjaa("seikkailu: vene perillä, ei nousupaikkaa"); yield break; }
            // Katse vesiportin oveen (E1-ajo 7.10.: veneestä poispäin katsova pelaaja käveli kannen reunalta veteen); varalla keulan suunta.
            var ovi = SeikkailuKavely.Data == null ? null : System.Linq.Enumerable.FirstOrDefault(SeikkailuKavely.Data.Merkit, x => x.Nimi == "ovi:vesiportti-alku");
            if (ovi != null) { var kohti = new Vector3((float)ovi.X, alku.y, (float)-ovi.Z) - alku; if (kohti.sqrMagnitude > 0.25f) yaw = Mathf.Atan2(kohti.x, kohti.z) * Mathf.Rad2Deg; }
            else if (v != null)
            {
                var vt = v.Ydin.Tila(v.Ydin.KestoS);
                yaw = Mathf.Atan2((float)vt.SuuntaX, (float)-vt.SuuntaZ) * Mathf.Rad2Deg;
            }
            SeikkailuKavely.Leikkaukset(true);
            Physics.SyncTransforms();
            if (Physics.Raycast(alku + Vector3.up * 2f, Vector3.down, out var osuma, 30f, 1 << DioraamaNayttamo.Kerros)) alku = osuma.point + Vector3.up * 0.05f;
            else o.Kirjaa($"seikkailu: nousupaikan alla ei törmäyspintaa ({alku}) — laituri puuttuu törmäyksestä?");
            // v44j: Fogg nousee veneestä kannelle (leike nousu_laiturille, juurisiirto root_siirto): alku veneen pohjalla kannen reunan edessä.
            var pm = rakennus.Pelaaja;
            bool nousuLeike = pm != null && pm.Leikkeet.ContainsKey("nousu_laiturille") && pm.JuuriSiirto.ContainsKey("nousu_laiturille");
            Vector3 kannelle = Vector3.zero;
            if (nousuLeike && KannenReuna(alku) is (Vector3 reuna, Vector3 eteen))
            {
                var js = pm.JuuriSiirto["nousu_laiturille"];
                yaw = Mathf.Atan2(eteen.x, eteen.z) * Mathf.Rad2Deg;
                alku = reuna - eteen * 0.55f - Vector3.up * (float)js[1];
                kannelle = new Vector3((float)js[0], (float)js[1], (float)js[2]);
            }
            else nousuLeike = false;
            var sp = SeikkailuPelaaja.Luo(nayttamo.transform, alku, yaw, DioraamaNayttamo.Kerros);
            LisaaPelaajahahmo(sp);
            if (nousuLeike) sp.SoitaEle("nousu_laiturille", (float)pm.Liikkeet["nousu_laiturille"].KestoS, kannelle,
                () => o.Kirjaa($"seikkailu: Fogg kannella ({SeikkailuPelaaja.Aktiivinen?.transform.position})"));
            if (pelattavaPala)
            {
                o.StartCoroutine(VartijatPaalle());   // pelattavassa palassa vartijat partioon heti laiturille noustessa
                o.StartCoroutine(KappeliPaalle());   // kynttilät (Foggilla tarjottimen kynttilä mukana) + kappelin kohtaus kaari-ovella
            }
            o.Kirjaa($"seikkailu: vene perillä, pelaaja laiturilla ({alku}, yaw {yaw:F0}, {(nm != null ? "nousu:laituri" : "laiturin kohde")})");
        }

        /// <summary>Kannen reuna nousupaikan lähellä ja suunta kannelle (vaaka, Unity): säteet alas 0,4 m:n kehältä; kannen puoleisten
        /// suuntien keskiarvo = eteen, sitten taaksepäin reunaan asti (0,05 m:n askelin, enintään 1,5 m). Null, jos kansi joka puolella tai ei missään.</summary>
        static (Vector3 Reuna, Vector3 Eteen)? KannenReuna(Vector3 kansi)
        {
            bool Kansi(Vector3 p, out Vector3 osuma)
            {
                osuma = p;
                if (!Physics.Raycast(p + Vector3.up * 1.5f, Vector3.down, out var h, 3f, 1 << DioraamaNayttamo.Kerros) || Mathf.Abs(h.point.y - kansi.y) > 0.2f) return false;
                osuma = h.point; return true;
            }
            var summa = Vector3.zero; int n = 0;
            for (int i = 0; i < 24; i++)
            {
                float a = i * Mathf.PI * 2 / 24; var d = new Vector3(Mathf.Sin(a), 0f, Mathf.Cos(a));
                if (Kansi(kansi + d * 0.4f, out _)) { summa += d; n++; }
            }
            if (n == 0 || n == 24 || summa.sqrMagnitude < 0.01f) return null;
            var eteen = summa.normalized;
            Vector3 reuna = kansi;
            for (float t = 0f; t <= 1.5f; t += 0.05f) { if (Kansi(kansi - eteen * t, out var q)) reuna = q; else break; }
            return (reuna, eteen);
        }

        IEnumerator KavelyPaalle(string tid)
        {
            if (nayttamo == null || rakennus == null) { o.Kirjaa("poikki: kävely: linssi ei auki"); yield break; }
            yield return VarmistaKavelyData();
            int tilaTormays = SeikkailuKavely.Ladattu ? 0 : SeikkailuPelaaja.LisaaTormaykset(nayttamo.transform);   // vara: tilameshit
            SeikkailuKavely.Leikkaukset(true);
            linssi.KertojaPois();   // ei kertojan jaksotekstejä (vuosiluvut, nimet) kävellessä
            Vector3 alku; float yaw;
            var m = SeikkailuKavely.Data == null ? null : System.Linq.Enumerable.FirstOrDefault(SeikkailuKavely.Data.Merkit, x => x.Laji == "ovi" && (x.Osa == tid || x.Tunnus.StartsWith(tid, StringComparison.Ordinal)));
            if (m != null)
            {
                // Katse oviaukosta osan keskelle (glTF z etelä → Unityn −z).
                alku = new Vector3((float)m.X, (float)m.Y, (float)-m.Z); yaw = 0f;
                if (m.Osa != null && SeikkailuKavely.Data.Osat.TryGetValue(m.Osa, out var ko))
                {
                    double kx = (ko.RajatMin[0] + ko.RajatMax[0]) / 2 - m.X, kz = -((ko.RajatMin[2] + ko.RajatMax[2]) / 2 - m.Z);
                    if (kx * kx + kz * kz > 0.25) yaw = (float)(Math.Atan2(kx, kz) * 180 / Math.PI);
                }
            }
            else
            {
                var tl = rakennus.Tila(tid);
                if (tl == null) { o.Kirjaa($"poikki: kävely: tilaa tai osaa {tid} ei löydy"); yield break; }
                alku = DioraamaNayttamo.UnityPiste(tl.Kamera.Kohde); yaw = (float)Matkakirja.Linssit.Seikkailu.Kavely.Kulma(tl.Kamera.Atsimuutti + 180.0);
            }
            Physics.SyncTransforms();
            if (Physics.Raycast(alku + Vector3.up * 2f, Vector3.down, out var osuma, 30f, 1 << DioraamaNayttamo.Kerros)) alku = osuma.point + Vector3.up * 0.05f;
            else o.Kirjaa($"seikkailu: aloituspaikan alla ei törmäyspintaa ({alku})");
            LisaaPelaajahahmo(SeikkailuPelaaja.Luo(nayttamo.transform, alku, yaw, DioraamaNayttamo.Kerros));
            o.Kirjaa($"poikki: kävely päällä tilassa {tid} ({alku}), kävelygeometria {(SeikkailuKavely.Ladattu ? "ladattu" : "ei (tilameshit " + tilaTormays + ")")}");
        }


        /// <summary>Onko kamerasta puhujan rintaan kulkevalla janalla toinen hahmo (pystysauva 0–1,8 m, säde 0,45 m) tai tilan liekki (0,6 m).</summary>
        bool NakolinjaPeitossa(Vector3 kamera, Vector3 rinta, string puhuja, string tilaId)
        {
            foreach (var th in DioraamaHahmot3D.TilanHahmot)
            {
                if (th.Id == puhuja) continue;
                var keski = th.Juuri + Vector3.up * Mathf.Clamp(Mathf.Lerp(kamera.y, rinta.y, 0.5f) - th.Juuri.y, 0.2f, 1.6f);
                if (EtaisyysJanaan(keski, kamera, rinta) < 0.45f) return true;
            }
            var t = tilaId != null ? rakennus?.Tila(tilaId) : null;
            if (t?.Liekit != null)
                foreach (var l in t.Liekit)
                    if (EtaisyysJanaan(DioraamaNayttamo.UnityPiste(l.Paikka), kamera, rinta) < 0.6f) return true;
            return false;
        }
        static float EtaisyysJanaan(Vector3 p, Vector3 a, Vector3 b)
        {
            var ab = b - a; float u = Mathf.Clamp01(Vector3.Dot(p - a, ab) / Mathf.Max(1e-6f, ab.sqrMagnitude));
            return Vector3.Distance(p, a + ab * u);
        }
        IEnumerator Kuvakaappaus(string nimi, double skaala)
        {
            yield return new WaitForEndOfFrame();
            var cam = nayttamo?.Kamera;
            if (cam == null) { o.Kirjaa("poikki: kuva: ei kameraa"); yield break; }
            int w = Mathf.Clamp((int)(Screen.width * skaala), 64, 8192), h = Mathf.Clamp((int)(Screen.height * skaala), 64, 8192);
            var rt = new RenderTexture(w, h, 24, RenderTextureFormat.ARGB32) { antiAliasing = 4 };
            var vanha = cam.targetTexture; float vanhaAspect = cam.aspect;
            cam.targetTexture = rt; cam.aspect = (float)w / h;
            cam.Render();
            cam.targetTexture = vanha; cam.aspect = vanhaAspect;
            var edellinen = RenderTexture.active; RenderTexture.active = rt;
            var tex = new Texture2D(w, h, TextureFormat.RGB24, false);
            tex.ReadPixels(new Rect(0, 0, w, h), 0, 0); tex.Apply();
            RenderTexture.active = edellinen;
            string polku = System.IO.Path.Combine(Application.persistentDataPath, System.IO.Path.GetFileName(nimi));
            try { System.IO.File.WriteAllBytes(polku, tex.EncodeToPNG()); o.Kirjaa($"poikki: kuva {System.IO.Path.GetFileName(nimi)} {w}×{h}"); }
            catch (Exception e) { o.Kirjaa("poikki: kuva: " + e.Message); }
            UnityEngine.Object.Destroy(tex); rt.Release(); UnityEngine.Object.Destroy(rt);
        }

        Vector3? puolilahiRinta;
        const float PuolilahiVapaaM = 0.9f, PuolilahiLeikkausMaxM = 1.2f;
        const double PuolilahiSivu = 35, PuolilahiMaxKierto = 60, PuolilahiKohdeY = 1.35, PuolilahiKorkeusM = 1.5, PuolilahiMinM = 1.7,
            PuolilahiKorkeusAst = 22;
        const double PuhujaSiirtyma = 0.9, PuhujanPaino = 0.65, HahmonKeski = 0.9, HahmonKorkeus = 1.75,
            HahmonOsuusKorkeudesta = 0.4, RuudunSuhde = 2.0, KuulijaMaxM = 4.0;

        /// <summary>Latauksen vaiheet 0…1 (kuori, tilat, hahmot, ympäristö tasapainoin), LatausOsuuden toinen puolisko.</summary>
        float VaiheOsuus()
        {
            if (nayttamo == null || rakennus == null) return 0f;
            float kuori = nayttamo.Ulkokuori == null || nayttamo.Ulkokuori.KaikkiValmis ? 1f : 0f;
            int tilat = TilojaGlb(), hahmot = hahmoGlbJonossaTaiValmiit.Count;
            float t = tilat > 0 ? Mathf.Clamp01((float)tilojaKasitelty / tilat) : 1f;
            float h = hahmot > 0 ? Mathf.Clamp01((float)hahmojaKasitelty / hahmot) : (tilojaKasitelty >= tilat ? 1f : 0f);
            float y = rakennus.Ymparisto == null || nayttamo.Ymparisto == null || nayttamo.Ymparisto.Valmis ? 1f : 0f;
            return (kuori + t + h + y) / 4f;
        }

        int TilojaGlb()
        {
            // 4.10.: jokainen tila kulkee Kasitelty-käärön läpi (myös glb:ttömät) → odotetaan kaikkia; glb-laskenta antoi 9/8 ja
            // saattoi päästää saapumisen alkamaan ennen viimeistä glb-tilaa.
            return rakennus?.Tilat?.Count ?? 0;
        }
        double kuoriOdotusT;

        void AloitaKuoriOdotus(double t)
        {
            kuoriOdotusAlku = -1f;
            if (rakennus?.Saapuminen == null || rakennus.Ulkokuori == null || nayttamo?.Ulkokuori == null) return;
            // 4.10.: myös uudelleenavauksessa (tilat latautuvat uudelleen, välimuistista nopeasti) linna vasta täydellä tarkkuudella.
            kuoriOdotusAlku = Time.realtimeSinceStartup; kuoriOdotusT = t;
            LatausVirhe = null;
            virheitaAlussa = DioraamaLevyvalimuisti.Epaonnistui; viimeValmistuneita = DioraamaLevyvalimuisti.Valmistuneita;
            osumiaAlussa = DioraamaLevyvalimuisti.Osumia; latauksiaAlussa = DioraamaLevyvalimuisti.Latauksia;
            viimeEdistys = Time.realtimeSinceStartup;
        }

        static string SaapuminenAvain => RakennusAvain("dioraama-saapuminen-nahty");
        /// <summary>Elävä linna: toisella käynnillä saapumiskaari on lyhyt (Saapuminen.Lyhyt), kehittäjä nollaa
        /// "poikki saapuminen alusta".</summary>
        static bool SaapuminenNahty
        {
            get => PlayerPrefs.GetInt(SaapuminenAvain, 0) == 1;
            set { PlayerPrefs.SetInt(SaapuminenAvain, value ? 1 : 0); PlayerPrefs.Save(); }
        }

        /// <summary>Olavinlinna: ulkokuori valitulla laatutasolla (DioraamaUlkokuori), jos paketissa on kuori.</summary>
        void LataaUlkokuori()
        {
            nayttamo?.AsetaTunnelma(DioraamaTunnelma.Hamara(rakennus));
            if (rakennus?.Ulkokuori == null || nayttamo?.Ulkokuori == null) return;
            o.StartCoroutine(nayttamo.Ulkokuori.Lataa(rakennus.Ulkokuori, s => peili(paketinJuuri + s), o.Kirjaa, DioraamaTunnelma.Hamara(rakennus)));
            // Boat Attack -järvi aina kuoren kanssa (Päätoimittaja 1.10.: vesi toimii myös ilman ympäristöpakettia, tuotannossa v17);
            // maasto, puut, horisontti ja syvyyskartta vain, kun paketissa on ympäristö (#3749 jälkeen). Maalattu järvi vain,
            // jos näyttämöllä ei ole ympäristöä (varjostin puuttuu tms.).
            if (nayttamo.Ymparisto != null)
            {
                nayttamo.Ulkokuori.LisaaVesi(null, 0, 1);
                // 4.10.: ympäristö ei enää odota kuorta — linna näytetään vasta kaiken valmistuttua, joten rinnakkaisuus lyhentää odotusta
                // (iPad esiladattuna: ympäristö odotti kuorta 0,9 s ennen omaa latausta).
                o.StartCoroutine(nayttamo.Ymparisto.Lataa(rakennus.Ymparisto ?? new Ymparisto(), (float)rakennus.Ulkokuori.VesiY, s => peili(paketinJuuri + s), o.Kirjaa, null, o.StartCoroutine));
                return;
            }
            // Järvi kuoren alle rakennuksen omalla "vesi"-pinnalla (Lataa tyhjentää vanhan ensin, joten tämä sen jälkeen).
            double toisto = rakennus.Pinnat != null && rakennus.Pinnat.TryGetValue("vesi", out var vp) && vp.ToistoU > 0 ? vp.ToistoU : 8;
            nayttamo.Ulkokuori.LisaaVesi(rakennus3D?.PinnanMateriaali(rakennus, "vesi"), (float)rakennus.Ulkokuori.VesiY, (float)toisto);
        }

        /// <summary>Kevyt Tila-kopio, jonka Hahmot-lista suodattaa POIS henkilöt, joilla ON malli3d.glb JA
        /// DioraamaHahmot3D.Paalla on päällä (era 2b kohta 4, ali-agentti P4b: "3D-hahmo korvaa kortin").
        /// Vanha 2D-DioraamaHahmot (ei muokattu tässä erässä) ei tiedä mitään 3D-malleista, niin suodatus
        /// tehdään TÄSSÄ, ennen sen LisaaTila/TarvittavatAtlakset-kutsuja. Muut Tila-kentät (paitsi Id/Hahmot)
        /// jäävät oletukseen -- turvallista, koska DioraamaHahmot.cs lukee vain näitä kahta (tarkistettu).</summary>
        Tila SuodataHahmot3dPois(Tila tila)
        {
            if (!DioraamaHahmot3D.Paalla || tila.Hahmot == null) return tila;
            List<Hahmo> jaljelle = null;
            foreach (var hahmo in tila.Hahmot)
            {
                bool onMalli3d = rakennus.Henkilot != null && rakennus.Henkilot.TryGetValue(hahmo.HenkiloId, out var henkilo)
                    && !string.IsNullOrEmpty(henkilo.Malli3d?.NatiiviGlb);
                if (!onMalli3d) (jaljelle ??= new List<Hahmo>()).Add(hahmo);
            }
            if (jaljelle != null && jaljelle.Count == tila.Hahmot.Count) return tila; // ei yhtään suodatettavaa
            return new Tila { Id = tila.Id, Hahmot = jaljelle ?? new List<Hahmo>() };
        }

        /// <summary>Jonottaa lataamatta olevat tilat (glb) ja hahmoatlakset yksi kerrallaan (ei rinnakkaisia hakuja).</summary>
        void TaydennaLataamattomat()
        {
            foreach (var tila in rakennus.Tilat)
            {
                if (tilatJonossaTaiValmiit.Contains(tila.Id)) continue;
                tilatJonossaTaiValmiit.Add(tila.Id);
                o.StartCoroutine(Kasitelty(LataaTila(tila), () => tilojaKasitelty++));
                var tila2d = SuodataHahmot3dPois(tila);
                hahmot3D.LisaaTila(rakennus, tila2d, o.Kirjaa);
                // era 2b kohta 4 (ali-agentti P4b): 3D-pienoisfiguurit, alkuperäisellä (suodattamattomalla)
                // tila-oliolla -- DioraamaHahmot3D.LisaaTila suodattaa ITSE (Malli3d.Glb + Paalla), sama
                // Nayttamo-omistus/elinkaari kuin Liekit/Valot (ks. DioraamaNayttamo.cs).
                nayttamo.Hahmot3D?.LisaaTila(rakennus, tila, o.Kirjaa);
                aanet?.TilaValmis(tila); // esilataa tilan tehosteet ja puheäänet (era 2).
                // ERA 2 -LISÄYS (ei ollut kirjaimellisesti tehtävänannon tiedostokohdan listalla, mutta välttämätön):
                // DioraamaLiekit on rakennettu DioraamaHahmot-mallilla -- LisaaTila luo liekkien GameObjectit
                // paikka/koko-tiedosta, eikä mikään muu kutsu sitä. Ilman tätä liekit eivät koskaan ilmesty
                // näyttämölle, vaikka atlas latautuisi. Siksi tässä ei käytetä TarvittavatAtlakset-reittiä, vaan
                // rakennustason latausta (alla, TaydennaPinnatJaLiekit), joka avaimistaa atlaksen polulla
                // (liekki.Atlas) samoin kuin AsetaAtlas-signatuuri (korjattu 29.9.2026, katselmointi: vanha koodi
                // deduplikoi liekki.Id:llä, vaikka monta liekkimääritystä voi jakaa yhden atlas-tiedoston).
                nayttamo.Liekit?.LisaaTila(rakennus, tila, o.Kirjaa);
                var atlakset = new List<string>();
                hahmot3D.TarvittavatAtlakset(rakennus, tila2d, atlakset);
                foreach (var atlas in atlakset)
                {
                    if (atlaksetJonossaTaiValmiit.Contains(atlas)) continue;
                    atlaksetJonossaTaiValmiit.Add(atlas);
                    o.StartCoroutine(LataaAtlas(atlas));
                }
                var hahmoGlbt = new List<string>();
                nayttamo.Hahmot3D?.TarvittavatGlb(rakennus, tila, hahmoGlbt);
                foreach (var glb in hahmoGlbt)
                {
                    if (hahmoGlbJonossaTaiValmiit.Contains(glb)) continue;
                    hahmoGlbJonossaTaiValmiit.Add(glb);
                    o.StartCoroutine(Kasitelty(LataaHahmoGlb(glb), () => hahmojaKasitelty++));
                }
            }
        }

        /// <summary>Jonottaa rakennustason pintatekstuurit (Rakennus.Pinnat) ja liekkiatlakset (Rakennus.Liekit) --
        /// era 2, ei tilakohtaista suodatusta (ks. kenttien alkukommentti). Kutsutaan aina TaydennaLataamattomat-
        /// kutsun rinnalla; HashSetit estävät saman pinnan/liekin lataamisen kahdesti.</summary>
        void TaydennaPinnatJaLiekit()
        {
            foreach (var pinta in rakennus.Pinnat.Values)
            {
                if (string.IsNullOrEmpty(pinta.Tekstuuri) || pinnatJonossaTaiValmiit.Contains(pinta.Id)) continue;
                pinnatJonossaTaiValmiit.Add(pinta.Id);
                // Puolikas pienelle laitteelle (era 2b, tekstuurimuisti 29.9.2026, ks. PieniLaite) --
                // vanha paketti ilman TekstuuriPuolia putoaa aina täyteen (ei virhe, ks. Pinta-kommentti).
                bool puoli = PieniLaite() && !string.IsNullOrEmpty(pinta.TekstuuriPuoli);
                o.StartCoroutine(LataaPinta(pinta.Id, puoli ? pinta.TekstuuriPuoli : pinta.Tekstuuri, puoli));
            }
            foreach (var liekki in rakennus.Liekit.Values)
            {
                // Deduplikointi ATLAKSEN POLULLA (ei liekki.Id): monta liekkimääritystä voi jakaa saman
                // atlas-tiedoston, ja AsetaAtlas itsekin avaimistaa polulla (korjattu 29.9.2026, katselmointi).
                if (string.IsNullOrEmpty(liekki.Atlas) || liekkiatlaksetJonossaTaiValmiit.Contains(liekki.Atlas)) continue;
                liekkiatlaksetJonossaTaiValmiit.Add(liekki.Atlas);
                o.StartCoroutine(LataaLiekkiAtlas(liekki.Atlas));
            }
        }

        IEnumerator LataaTila(Tila tila)
        {
            int kerta = avauskerta;
            if (string.IsNullOrEmpty(tila.GlbTiedosto)) { o.Kirjaa($"poikki: {tila.Id} ilman glb-tiedostoa"); yield break; }
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + tila.GlbTiedosto), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: {tila.Id} glb ei latautunut (tila jää puuttumaan)"); yield break; }
            // UUDELLEENAVAUS (löydös 29.9.2026): linssi on voitu sulkea/avata uudelleen latauksen aikana --
            // rakennus3D on silloin joko tuhottu (null) tai uuden avauskerran tuore instanssi. Kirjoitus siihen
            // olisi vanhentunutta tietoa tai NullReferenceä, joten perääntytään hiljaa.
            if (kerta != avauskerta || rakennus3D == null) yield break;
            if (!rakennus3D.LisaaTila(rakennus, tila, tavut, o.Kirjaa)) yield break;
            o.Kirjaa($"poikki: {tila.Id} valmis ({rakennus3D.Kolmiot} kolmiota yhteensä)");
            // Olavinlinna (Siirtoseppä 29.9.2026): Blenderin tyhjät → 3D-liekit ja savu; leivottu valoatlas.
            var tyhjat = rakennus3D.Tyhjat(tila.Id);
            rakennus3D.Tilat.TryGetValue(tila.Id, out var tilaGo);
            // Kukin liekki kerran (2.10.2026): glb:n liekki:-solmut korvaavat tilan JSON-liekit (sama kohta, piirtyi kahdesti).
            int solmuja = 0;
            foreach (var t in tyhjat) if (t.Laji == "liekki") solmuja++;
            int pois = solmuja > 0 ? nayttamo?.Liekit?.PoistaJsonLiekit(tila.Id) ?? 0 : 0;
            if (pois > 0) o.Kirjaa($"poikki: {tila.Id} liekit glb:n {solmuja} liekki:-solmusta, JSON-liekit {pois} pois");
            // TF 136 -kierros 4.10.: ilman valoatlasta leivottu tila piirtyi valkoisena palikkana. Tila (ja sen liekit, savu ja
            // valot) näkyviin vasta, kun valoatlas on ladattu.
            bool piiloon = tilaGo != null && !string.IsNullOrEmpty(tila.ValoAtlas);
            if (piiloon) tilaGo.SetActive(false);
            if (!string.IsNullOrEmpty(tila.ValoAtlas)) yield return LataaValoAtlas(tila);
            if (kerta != avauskerta || rakennus3D == null) yield break;
            if (piiloon && tilaGo != null) tilaGo.SetActive(true);
            if (tyhjat.Count > 0 && tilaGo != null)
            {
                foreach (var t in tyhjat)
                    if (t.Laji == "liekki") nayttamo?.Liekit?.LisaaTyhja(tila.Id, t, tilaGo.transform.TransformPoint(t.Paikka), o.Kirjaa);
                nayttamo?.Savu?.LisaaTila(tila.Id, tilaGo.transform, tyhjat, o.Kirjaa);
                nayttamo?.Ikkunat?.LisaaTila(tila.Id, tilaGo.transform, tyhjat, o.Kirjaa);
                nayttamo?.Lokit?.LisaaTila(tila.Id, tilaGo.transform, tyhjat, o.Kirjaa);
                foreach (var t in tyhjat)
                    if (t.Laji == "valo") nayttamo?.Valot?.LisaaTyhja(tila.Id, t, tilaGo.transform.TransformPoint(t.Paikka));
            }
            // Elävä linna: tilan irtoesineet (arkun kansi, sinetti) etsintää varten.
            if (tila.Esineet.Count > 0 && nayttamo?.Etsinta != null)
                yield return nayttamo.Etsinta.LataaEsineet(rakennus, tila, s => peili(paketinJuuri + s), o.Kirjaa);
        }

        /// <summary>Tilan leivottu valoatlas (Blender Cycles, Linnanrakentaja): puolikas (2k) pienelle laitteelle kuten
        /// pinnoilla (PieniLaite), muuten täysi (4k). sRGB, mipmapit, Clamp; Compress(false) pakkaa GPU-muotoon.
        /// Virhe ei kaada linssiä: tila jää harmaaksi (varjostimen "grey").</summary>
        IEnumerator LataaValoAtlas(Tila tila)
        {
            int kerta = avauskerta;
            // Hämärä (DioraamaTunnelma): tilan hämäräatlas, jos paketissa; muuten päiväversio.
            bool hamara = DioraamaTunnelma.Hamara(rakennus) && !string.IsNullOrEmpty(tila.HamaraAtlas);
            string atlas = hamara ? tila.HamaraAtlas : tila.ValoAtlas, atlasPuoli = hamara ? tila.HamaraAtlasPuoli : tila.ValoAtlasPuoli;
            string astcTaysi = hamara ? tila.HamaraAtlasAstc : tila.ValoAtlasAstc, astcPuoliP = hamara ? tila.HamaraAtlasAstcPuoli : tila.ValoAtlasAstcPuoli;
            bool puoli = PieniLaite() && !string.IsNullOrEmpty(atlasPuoli);
            string polku = puoli ? atlasPuoli : atlas;
            // ASTC-mipketju ensin (valoatlas.astc / astcPuoli), JPEG varalla.
            string astcPolku = puoli ? astcPuoliP : astcTaysi;
            if (!string.IsNullOrEmpty(astcPolku))
            {
                // Linnan piikit (iPad 2.10.): 8 valoatlasta (4096² ASTC, ~22 Mt) latautui peräkkäin kukin yhdessä ruudussa →
                // 108 ms:n ruutu. Nyt natiivimuistiin ja kaistoina yhteisellä ruutubudjetilla (DioraamaAstc.LueKaistoina).
                var astcTavut = default(Unity.Collections.NativeArray<byte>);
                yield return DioraamaLevyvalimuisti.HaeNatiivi(peili(paketinJuuri + astcPolku), 120, t => astcTavut = t);
                Texture2D astc = null; string astcSyy = null;
                if (astcTavut.IsCreated)
                {
                    try { yield return DioraamaAstc.LueKaistoina(astcTavut, "Valoatlas:" + tila.Id + ":astc", TextureWrapMode.Clamp, 0, false, (k, sy) => { astc = k; astcSyy = sy; }); }
                    finally { astcTavut.Dispose(); }
                    if (astc != null) DioraamaRuutu.Gpu(null, astc);
                }
                if (kerta != avauskerta || rakennus3D == null) { if (astc != null) UnityEngine.Object.Destroy(astc); yield break; }
                if (astc != null)
                {
                    if (ladatutValoAtlakset.TryGetValue(tila.Id, out var vanhaA) && vanhaA != null && vanhaA != astc) UnityEngine.Object.Destroy(vanhaA);
                    ladatutValoAtlakset[tila.Id] = astc;
                    rakennus3D.AsetaValoAtlas(tila.Id, astc);
                    o.Kirjaa($"poikki: valoatlas {tila.Id} valmis ({astc.width}x{astc.height} {astc.format}{(puoli ? ", puolikas" : "")})");
                    yield break;
                }
                o.Kirjaa($"poikki: valoatlas {tila.Id} ASTC ei käytössä ({astcSyy ?? "ei latautunut"}), JPEG varalla");
            }
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + polku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: valoatlas {polku} ei latautunut (tila harmaana)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true, false)
            { name = "Valoatlas:" + tila.Id, filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Clamp, anisoLevel = 2 };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: valoatlas {polku} ei jäsentynyt (tila harmaana)"); UnityEngine.Object.Destroy(kuva); yield break; }
            kuva.Compress(false);
            if (kerta != avauskerta || rakennus3D == null) { UnityEngine.Object.Destroy(kuva); yield break; } // ks. LataaTila-kommentti
            if (ladatutValoAtlakset.TryGetValue(tila.Id, out var vanha) && vanha != null && vanha != kuva) UnityEngine.Object.Destroy(vanha); // tunnelman vaihto
            ladatutValoAtlakset[tila.Id] = kuva;
            rakennus3D.AsetaValoAtlas(tila.Id, kuva);
            o.Kirjaa($"poikki: valoatlas {tila.Id} valmis ({kuva.width}x{kuva.height}{(puoli ? ", puolikas" : "")})");
        }

        IEnumerator LataaAtlas(string atlasPolku)
        {
            int kerta = avauskerta;
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + atlasPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: atlas {atlasPolku} ei latautunut (hahmo harmaana)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true) { name = atlasPolku, filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: atlas {atlasPolku} ei jäsentynyt (hahmo harmaana)"); UnityEngine.Object.Destroy(kuva); yield break; }
            if (kerta != avauskerta || hahmot3D == null) { UnityEngine.Object.Destroy(kuva); yield break; } // ks. LataaTila-kommentti
            hahmot3D.AsetaAtlas(atlasPolku, kuva);
            o.Kirjaa($"poikki: atlas {atlasPolku} valmis ({kuva.width}x{kuva.height})");
        }

        /// <summary>3D-pienoisfiguurin glb (era 2b kohta 4, ali-agentti P4b): sama LataaTila-malli, mutta
        /// yksi glb per HENKILÖ (ei per tila) -- DioraamaGlb.Lue(unityyn:true) peilaa Unityyn samassa kutsussa
        /// kuin rakennus3D:n LataaTila. Virhe (verkko/jäsennys) EI kaada linssiä: 3D-hahmo jää puuttumaan (ks.
        /// DioraamaHahmot3D.cs:n Esiintyma-kommentti "kortti on varalla" -poikkeamasta).</summary>
        IEnumerator LataaHahmoGlb(string glbPolku)
        {
            int kerta = avauskerta;
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + glbPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: hahmo3d {glbPolku} ei latautunut (hahmo puuttuu)"); yield break; }
            GlbMalli malli;
            try { malli = DioraamaGlb.Lue(tavut, true); }
            catch (Exception e) { o.Kirjaa($"poikki: hahmo3d {glbPolku} virhe: {e.Message}"); yield break; }
            if (kerta != avauskerta || nayttamo?.Hahmot3D == null) yield break; // ks. LataaTila-kommentti
            nayttamo.Hahmot3D.AsetaGlb(glbPolku, malli);
            o.Kirjaa($"poikki: hahmo3d {glbPolku} valmis ({malli.Solmut.Count} solmua"
                + (malli.Skinit.Count > 0 ? $", skin {malli.Skinit[0].Nivelet.Length} luuta, leikkeet {string.Join(",", malli.Animaatiot.ConvertAll(a => a.Nimi))}" : "") + ")");
        }

        /// <summary>Pinnan Tekstuuri/TekstuuriPuoli (era 2 kohta 3, puolikas era 2b): mipmapattu, ei-lineaarinen
        /// (sRGB-lähde), toistuva ja anisotrooppinen -- kutsuu rakennusnäkymän (Sovittimen rakennus3D-kenttä,
        /// sama reitti kuin LataaTila) AsetaPinta-metodia (agentti D:n lisäys DioraamaRakennus.cs:ään).
        /// Compress(false) pakkaa GPU-muotoon (iOS: ETC/EAC-perhe, Unityn dokumentaatio) latauksen jälkeen --
        /// pienentää tekstuurimuistia edelleen RGBA32:sta, highQuality-parametri ei vaikuta ETC:hen.</summary>
        IEnumerator LataaPinta(string pintaId, string tekstuuriPolku, bool puoli)
        {
            int kerta = avauskerta;
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + tekstuuriPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: pinta {pintaId} ei latautunut (paikkaväri)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true, false)
            { name = "Pinta:" + pintaId, filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Repeat, anisoLevel = 4 };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: pinta {pintaId} ei jäsentynyt (paikkaväri)"); UnityEngine.Object.Destroy(kuva); yield break; }
            kuva.Compress(false);
            if (kerta != avauskerta || rakennus3D == null) { UnityEngine.Object.Destroy(kuva); yield break; } // ks. LataaTila-kommentti
            ladatutPinnat[pintaId] = kuva;
            rakennus3D.AsetaPinta(pintaId, kuva);
            o.Kirjaa($"poikki: pinta {pintaId} tekstuuri valmis ({kuva.width}x{kuva.height}{(puoli ? ", puolikas" : "")})");
        }

        /// <summary>Liekkipankin (Rakennus.Liekit) atlas (era 2 kohta 3): kuten hahmoatlas (Clamp/Bilinear) --
        /// kutsuu näyttämön Liekit-näkymän AsetaAtlas-metodia. Dedupikoitu ja välimuistissa ATLAKSEN POLULLA
        /// (ei liekki.Id, ks. kutsupaikan kommentti TaydennaPinnatJaLiekit:ssä).</summary>
        IEnumerator LataaLiekkiAtlas(string atlasPolku)
        {
            int kerta = avauskerta;
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + atlasPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: liekkiatlas {atlasPolku} ei latautunut (näkymättä)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true)
            { name = "Liekki:" + atlasPolku, filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: liekkiatlas {atlasPolku} ei jäsentynyt (näkymättä)"); UnityEngine.Object.Destroy(kuva); yield break; }
            if (kerta != avauskerta || nayttamo?.Liekit == null) { UnityEngine.Object.Destroy(kuva); yield break; } // ks. LataaTila-kommentti
            ladatutLiekkiAtlakset[atlasPolku] = kuva;
            nayttamo.Liekit.AsetaAtlas(atlasPolku, kuva);
            o.Kirjaa($"poikki: liekkiatlas {atlasPolku} valmis ({kuva.width}x{kuva.height})");
        }

        static IEnumerator HaeTeksti(string url, Action<string> valmis)
        {
            using var p = UnityWebRequest.Get(url);
            p.timeout = 20;
            yield return p.SendWebRequest();
            valmis(p.result == UnityWebRequest.Result.Success ? p.downloadHandler.text : null);
        }

        // Hash-paketin tiedostot levyvälimuistin kautta. Aikakatkaisu 120 s: 1.0.61:n Blender-paketin 22 Mt:n
        // ASTC-atlakset eivät ehtineet 30 sekunnissa mobiiliverkossa.
        static IEnumerator HaeTavut(string url, Action<byte[]> valmis) => DioraamaLevyvalimuisti.Hae(url, 120, valmis);

        // --- testikomento "poikki …" --------------------------------------------------------------------------

        public void Komento(string[] osat)
        {
            string mita = osat.Length > 1 ? osat[1] : "tila";
            string arvo = osat.Length > 2 ? osat[2] : null;
            // "poikki laput": nimilappujen viimeisin valinta lokiin (näkyvät ja piilotettujen syyt; kuvaukset ja savukkeet).
            // "poikki vaakasuunta vasen|oikea": testi molemmille vaakasuunnille (turva-alue, Dynamic Island) ilman laitteen kääntöä.
            if (mita == "vaakasuunta" && asentoEnnen.HasValue)
            {
                Screen.orientation = arvo == "oikea" ? ScreenOrientation.LandscapeRight : ScreenOrientation.LandscapeLeft;
                o.Kirjaa("poikki: vaakasuunta " + Screen.orientation); return;
            }
            if (mita == "laput") { o.Kirjaa("poikki: nimilaput: " + DioraamaTaulu.LappuMittaus); return; }
            // "poikki timeline [0|1]": kertojan esittely Timelinellä (DioraamaTimeline, linna-unity-suunnitelma 2b; oletus pois).
            // Kytkentä kesken kierroksen: seuraava Paivita aloittaa tai pysäyttää directorin nykyhetkestä (puhe ei ala alusta).
            if (mita == "timeline")
            {
                if (arvo == "1" || arvo == "0") DioraamaTimeline.Paalla = arvo == "1";
                o.Kirjaa("poikki: timeline " + timeline.Raportti());
                return;
            }
            // "poikki kavely 1 [tila] | 0 | tapit lx ly kx ky s": historiamoottori V1 — pelaaja vapaaseen kävelyyn tilan kohteeseen (tai nykyiseen),
            // törmäykset tilojen mesheistä (väliaikaiset), kamera olan yli; tapit = testisyöte s sekuntia (simulaattori ilman kosketusta).
            if (mita == "kavely")
            {
                if (arvo == "0") { SeikkailuPelaaja.Poista(); SeikkailuVene.Poista(); SeikkailuVartijat.Poista(); SeikkailuKavely.Leikkaukset(false); cm?.SeikkailuPois(); o.Kirjaa("poikki: kävely pois"); return; }
                // "poikki kavely siirra <merkki | x y z>": pelaaja merkkiin (glTF) testiajoja varten (piilo, ovi).
                if (arvo == "siirra" && osat.Length > 3 && SeikkailuPelaaja.Aktiivinen is SeikkailuPelaaja sps)
                {
                    Vector3? kohde = null;
                    if (osat.Length > 5) kohde = new Vector3((float)Luku(osat[3]), (float)Luku(osat[4]), (float)-Luku(osat[5]));
                    else if (SeikkailuKavely.Data != null) foreach (var mk in SeikkailuKavely.Data.Merkit) if (mk.Nimi == osat[3]) { kohde = new Vector3((float)mk.X, (float)mk.Y + 0.05f, (float)-mk.Z); break; }
                    if (kohde is Vector3 kv) { sps.Siirra(kv); o.Kirjaa($"poikki: kävely siirretty {osat[3]} {kv}"); } else o.Kirjaa($"poikki: kävely: merkkiä {osat[3]} ei löydy");
                    return;
                }
                if (arvo == "tapit" && osat.Length > 7)
                {
                    string tapa = osat.Length > 8 ? osat[8] : "";
                    SeikkailuPelaaja.Testi = new Matkakirja.Linssit.Seikkailu.KavelySyote { LiikeX = Luku(osat[3]), LiikeY = Luku(osat[4]), KatseX = Luku(osat[5]), KatseY = Luku(osat[6]),
                        Hiipiminen = tapa == "hiipii", Juoksu = tapa == "juoksu" };
                    SeikkailuPelaaja.TestiLoppuu = Time.unscaledTime + (float)Luku(osat[7]);
                    o.Kirjaa($"poikki: kävely tapit {osat[3]} {osat[4]} {osat[5]} {osat[6]} {osat[7]} s");
                    return;
                }
                if (arvo == "toiminto") { SeikkailuEsineet.ToimintoPyydetty = true; o.Kirjaa($"poikki: toiminto (lähin {SeikkailuEsineet.Aktiivinen?.Lahin ?? "-"}, kädessä {SeikkailuEsineet.Aktiivinen?.Kadessa ?? "-"})"); return; }
                if (arvo == "fp") { SeikkailuPelaaja.Ensimmainen = osat.Length <= 3 || osat[3] != "0"; o.Kirjaa($"poikki: kävely {(SeikkailuPelaaja.Ensimmainen ? "ensimmäinen persoona" : "olan yli")} (seuraavasta aloituksesta)"); return; }
                if (arvo == "data") { kavelyKehitysJuuri = osat.Length > 3 ? osat[3].TrimEnd('/') + "/" : null; o.Kirjaa($"poikki: kävelydata {kavelyKehitysJuuri ?? "paketista"}"); return; }
                string tid = osat.Length > 3 ? osat[3] : Linssi?.NakymaHetkella(YdinAika, false).KohdeTila ?? "laituri";
                o.StartCoroutine(KavelyPaalle(tid));
                return;
            }
            // "poikki seikkailu botti [alku-N]": vianselvitys (pelattavuusmalli 11, EI ennen junaa/TF:ää) — kävelee reitti:pelaaja-N -merkit
            // napautuskävelyllä, kirjaa saapumiset, kiinnijäämiset ja ajat sekä lopuksi Natiivi-UI:n Tekstivahdin (ei näkyvää tekstiä).
            // "poikki valot volumetriset 0|1 | liekit 0|1": laatutaso (PT 7.10.: volumetriset Mac + M-iPad, liekit kaikilla).
            if (mita == "valot")
            {
                bool p1 = osat.Length <= 3 || osat[3] != "0";
                if (arvo == "volumetriset") SeikkailuValot.Aseta(volumetriset: p1); else if (arvo == "liekit") SeikkailuValot.Aseta(liekit: p1);
                o.Kirjaa($"poikki: valot volumetriset {SeikkailuValot.Volumetriset}, liekit {SeikkailuValot.Liekit} (seuraavasta avauksesta)");
                return;
            }
            if (mita == "seikkailu" && arvo == "botti")
            {
                int alkuN = osat.Length > 3 && int.TryParse(osat[3], out int an) ? an : 1;
                o.StartCoroutine(Botti(alkuN));
                return;
            }
            // "poikki vartijat 1 | 0 | tila": historiamoottori V3 — vartijat partioreiteille (merkit partio:*), NavMesh kävelypinnoista.
            if (mita == "vartijat")
            {
                if (arvo == "0") { SeikkailuVartijat.Poista(); o.Kirjaa("poikki: vartijat pois"); return; }
                if (arvo == "tila") { o.Kirjaa("poikki: " + (SeikkailuVartijat.Aktiivinen?.Raportti() ?? "vartijat pois")); return; }
                o.StartCoroutine(VartijatPaalle());
                return;
            }
            // "poikki kynttilat 1 [tila] | 0 | sammuta | oma 0|1 | tila": E3 kappelin kynttilät (oletustila kappeli).
            if (mita == "kynttilat" || mita == "kynttilät")
            {
                var ky = SeikkailuKynttilat.Aktiivinen;
                if (arvo == "0") SeikkailuKynttilat.Poista();
                else if (arvo == "sammuta") ky?.Ydin.SammutaKaikki();
                else if (arvo == "oma" && ky != null) { ky.Ydin.OmaKynttila = true; ky.Ydin.AsetaOma(osat.Length > 3 && osat[3] == "1"); }
                else if (arvo != "tila") SeikkailuKynttilat.Luo(nayttamo.transform, osat.Length > 3 ? osat[3] : "kappeli", nayttamo.Liekit, rakennus3D, o.Kirjaa);
                ky = SeikkailuKynttilat.Aktiivinen;
                o.Kirjaa("poikki: kynttilät " + (ky == null ? "pois" : $"{ky.TilaId} palavia {ky.Ydin.Palavia}/{ky.Ydin.Maara}, oma {(ky.Ydin.OmaPalaa ? "palaa" : ky.Ydin.OmaKynttila ? "sammunut" : "ei")}"));
                return;
            }
            // "poikki kappeli 1 | 0 | tila": E3a kappelin kohtaus ja pimeys (kaari-ovelle astuminen käynnistää).
            if (mita == "kappeli")
            {
                if (arvo == "0") { SeikkailuKappeli.Poista(); SeikkailuKynttilat.Poista(); }
                else if (arvo != "tila") o.StartCoroutine(KappeliPaalle());
                o.Kirjaa("poikki: kappeli " + (SeikkailuKappeli.Aktiivinen?.Nyt.ToString() ?? "pois"));
                return;
            }
            // "poikki vene 1 [kesto_s] | 0": historiamoottori V2 — venesaapuminen laituriin, sitten vapaa kävely.
            if (mita == "vene")
            {
                if (arvo == "0") { SeikkailuVene.Poista(); SeikkailuPelaaja.Poista(); SeikkailuVartijat.Poista(); SeikkailuKavely.Leikkaukset(false); cm?.SeikkailuPois(); o.Kirjaa("poikki: vene pois"); return; }
                o.StartCoroutine(VenePaalle(osat.Length > 3 ? Luku(osat[3]) : VeneKestoS));
                return;
            }
            if (mita == "kavely-vanha")
            {
                string tid = osat.Length > 3 ? osat[3] : "laituri";
                var tl = rakennus?.Tila(tid);
                if (tl == null || nayttamo == null) { o.Kirjaa($"poikki: kävely: tilaa {tid} ei löydy"); return; }
                int tormayksia = SeikkailuPelaaja.LisaaTormaykset(nayttamo.transform);
                var kp = tl.Kamera.Kohde;
                var alku = DioraamaNayttamo.UnityPiste(kp);
                if (Physics.Raycast(alku + Vector3.up * 3f, Vector3.down, out var osuma, 30f)) alku = osuma.point + Vector3.up * 0.05f;
                // Katse lepokameran suunnasta tilaan päin (kamera pelaajan takana kuten huonekuvassa).
                float yaw = (float)(tl.Kamera.Atsimuutti + 180.0);
                SeikkailuPelaaja.Luo(nayttamo.transform, alku, (float)Matkakirja.Linssit.Seikkailu.Kavely.Kulma(yaw), DioraamaNayttamo.Kerros);
                o.Kirjaa($"poikki: kävely päällä tilassa {tid} ({alku}), törmäyksiä {tormayksia}");
                return;
            }
            // "poikki kuva <nimi.png> [skaala]": puhdas kuva dioraamakamerasta ilman käyttöliittymää ja tekstityksiä (Päätoimittaja 7.10.:
            // apurahakortin kuva), ruudun koko × skaala, Documents/<nimi>.
            if (mita == "kuva")
            {
                o.StartCoroutine(Kuvakaappaus(string.IsNullOrEmpty(arvo) ? "linna.png" : arvo, osat.Length > 3 ? Luku(osat[3]) : 1.0));
                return;
            }
            // "poikki rakennus <id>": seuraava avaus lataa rakennuksen dioraama/<id>/ (H0). Ilman arvoa kertoo nykyisen.
            if (mita == "rakennus")
            {
                if (arvo != null && !AsetaRakennus(arvo)) o.Kirjaa($"poikki: rakennus-id '{arvo}' ei kelpaa → {Oletusrakennus}");
                o.Kirjaa($"poikki: rakennus {RakennusId} ({AmpariJuuri}){(Linssi != null ? ", vaihtuu seuraavassa avauksessa" : "")}");
                return;
            }
            if (mita == "peili") { AsetaPeili(arvo); return; }
            if (mita == "peili-vanha")
            {
                peiliHttps = false;
                peiliPaalla = !(arvo == null || arvo == "pois");
                if (arvo == null || arvo == "pois") { peili = s => s; peiliKuvaus = "pois (ämpäri)"; }
                else
                {
                    peiliHttps = arvo.StartsWith("https://", StringComparison.Ordinal);
                    string uusiJuuri = arvo;
                    peili = s => s.StartsWith(AmpariJuuri, StringComparison.Ordinal) ? uusiJuuri.TrimEnd('/') + "/" + s.Substring(AmpariJuuri.Length) : s;
                    peiliKuvaus = uusiJuuri;
                }
                o.Kirjaa("poikki: peili " + peiliKuvaus);
                // Natiiviseppä 7.10. (FACEIT ABAB): "peili pois" A-peilin jälkeen käytti muistissa olevaa rakennusta, jonka juuri oli
                // hashiton (peilissä ei ole uusin.jsonia) → kaikki 404. Peilin vaihto lataa rakennuksen uudelleen seuraavassa avauksessa.
                if (peiliKuvaus != edellinenPeili && rakennus != null) { LataaUudelleen(); o.Kirjaa("poikki: peili vaihtui, rakennus ladataan uudelleen"); }
                edellinenPeili = peiliKuvaus;
                return;
            }
            // "poikki osoitin <hash>|pois" (sisältövarasto 4.10.): testiosoitin uusin.jsonin tilalle seuraavaan lataukseen
            // (esilataus ja linssi); "poikki välimuisti": välimuistin tila ja levynkäyttö lokiin.
            if (mita == "osoitin")
            {
                // "poikki osoitin esta 1|0": uusin.json-haku epäonnistuu (verkko pois / väärä osoite) toistoajoa varten (Päätoimittaja 7.10.).
                if (arvo == "esta") { DioraamaLevyvalimuisti.EstaOsoitin = osat.Length > 3 && osat[3] == "1"; o.Kirjaa("poikki: osoitin esto " + (DioraamaLevyvalimuisti.EstaOsoitin ? "päällä" : "pois")); return; }
                DioraamaLevyvalimuisti.TestiOsoitin = arvo == null || arvo == "pois" ? null : arvo.Trim('/');
                o.Kirjaa("poikki: testiosoitin " + (DioraamaLevyvalimuisti.TestiOsoitin ?? "pois (uusin.json)"));
                return;
            }
            if (mita == "valimuisti" || mita == "välimuisti") { DioraamaLevyvalimuisti.KirjaaKoko(); return; }
            // "poikki pakkaus pois|paalle" (häviötön pakkaus, juna 143): pois = ladataan aina pakkaamaton polku (A/B-mittaus).
            if (mita == "pakkaus")
            {
                if (arvo == "pois" || arvo == "paalle") DioraamaPakkaus.Sallittu = arvo == "paalle";
                o.Kirjaa("poikki: pakkaus " + (DioraamaPakkaus.Kaytossa ? "käytössä (Brotli)" : DioraamaPakkaus.Sallittu ? "ei tällä alustalla" : "pois"));
                return;
            }
            // "poikki saapuminen alusta": seuraava avaus näyttää täyden saapumiskaaren (kehittäjä, kuvaukset).
            if (mita == "etsinta")
            {
                if (arvo == "alusta") DioraamaEtsinta.Nollaa(rakennus);
                else if (arvo == "seuraava") o.Kirjaa("poikki: etsintä seuraava " + (nayttamo?.Etsinta?.Suorita(rakennus) == true ? "suoritettu" : "ei aktiivista vaihetta tässä tilassa"));
                o.Kirjaa("poikki: etsintä " + DioraamaEtsinta.Tila(rakennus));
                return;
            }
            if (mita == "vihje")
            {
                if (arvo == "alusta") DioraamaSyke.Nahty = false;
                o.Kirjaa($"poikki: vihje {(DioraamaSyke.Nahty ? "nähty" : "näytetään")}");
                return;
            }
            if (mita == "saapuminen")
            {
                if (arvo == "alusta") SaapuminenNahty = false;
                o.Kirjaa($"poikki: saapuminen {(SaapuminenNahty ? "nähty (lyhyt)" : "täysi")}, osuus {(Linssi != null ? Linssi.SaapuminenOsuus(y != null ? YdinAika : 0).ToString("F2", CultureInfo.InvariantCulture) : "-")}");
                return;
            }
            // "poikki puolilahi 0|1": keskustelun puolilähikuva puhujaan pois/päällä (A/B).
            if (mita == "puolilahi")
            {
                if (arvo != null) Puolilahi = arvo != "0";
                o.Kirjaa($"poikki: puolilähikuva {(Puolilahi ? "päällä" : "pois")}");
                return;
            }
            // "poikki eleet 0|1": eleet puheen tahdissa (ajoitetut kertaeleet, nyökkäykset, katse, harhailu) pois/päällä A/B:tä varten.
            if (mita == "eleet")
            {
                if (arvo != null) DioraamaHahmot3D.EleetPaalla = arvo != "0";
                o.Kirjaa($"poikki: eleet {(DioraamaHahmot3D.EleetPaalla ? "päällä" : "pois")}");
                return;
            }
            // "poikki tunnelma [paiva|hamara|auto]": päivä / iltahämärä (kehittäjä, muistetaan; auto = rakennuksen oletus).
            if (mita == "tunnelma")
            {
                if (arvo != null) DioraamaTunnelma.Pakotettu = arvo == "hamara" ? true : arvo == "paiva" ? false : (bool?)null;
                o.Kirjaa($"poikki: tunnelma {(DioraamaTunnelma.Hamara(rakennus) ? "hämärä" : "päivä")} ({(DioraamaTunnelma.Pakotettu.HasValue ? "pakotettu" : "rakennuksen oletus " + (rakennus?.Tunnelma ?? "paiva"))})");
                return;
            }
            // "poikki mikseri 1|0 | kaiku lyhyt|pitka|pois|<0…1>": mikseritilan testaus ilman AaniMikseri-paneelia (30.9.2026).
            if (mita == "mikseri")
            {
                if (arvo == "1" || arvo == "0") DioraamaAanet.MikseriTila = arvo == "1";
                else if (arvo == "kaiku" && osat.Length > 3)
                {
                    string k = osat[3];
                    if (k == "pois") DioraamaAanet.KaikuPois = true;
                    else if (k == "lyhyt" || k == "pitka") { DioraamaAanet.KaikuPois = false; DioraamaAanet.KaikunPituus = k; }
                    else if (float.TryParse(k.Replace(',', '.'), NumberStyles.Float, CultureInfo.InvariantCulture, out var kt))
                        DioraamaAanet.KaikuKerroin[DioraamaAanet.NykyinenHuone ?? ""] = kt;
                }
                o.Kirjaa($"poikki: mikseri {(DioraamaAanet.MikseriTila ? "päällä" : "pois")}, kaiku {(DioraamaAanet.KaikuPois ? "pois" : DioraamaAanet.KaikunPituus)}, huone {DioraamaAanet.NykyinenHuone ?? "(yleis)"}");
                return;
            }
            // "poikki kamera <atsimuutti> <korkeus> <etäisyys> [fov] [x y z] | pois": kiinteä kamera kuvauksiin (vesi, ympäristö).
            if (mita == "kamera")
            {
                if (arvo == null || arvo == "pois") pakotettuKamera = null;
                else if (osat.Length > 4)
                {
                    Matkakirja.Linssit.Dioraama.V3 kohde = osat.Length > 8 ? new Matkakirja.Linssit.Dioraama.V3(Luku(osat[6]), Luku(osat[7]), Luku(osat[8])) : rakennus != null ? rakennus.YleisVaaka.Kohde : new Matkakirja.Linssit.Dioraama.V3(0, 0, 0);
                    pakotettuKamera = new Matkakirja.Linssit.Dioraama.Asento(kohde, Luku(osat[2]), Luku(osat[3]), Luku(osat[4]), osat.Length > 5 ? Luku(osat[5]) : 40, 0.3);
                }
                o.Kirjaa("poikki: kamera " + (pakotettuKamera.HasValue ? $"{pakotettuKamera.Value.Atsimuutti:F0}° {pakotettuKamera.Value.Korkeus:F0}° {pakotettuKamera.Value.Etaisyys:F0} m" : "pois"));
                return;
            }
            // "poikki aluskasvit 0|1": linnan aluskasvit piiloon/näkyviin (Linssiseppä 2, 1.10., kuvapari samasta kohdasta).
            if (mita == "aluskasvit")
            {
                if (arvo == "lajit" && osat.Length > 3)
                {
                    DioraamaAluskasvit.VainLajit = osat[3] == "kaikki" ? null
                        : new HashSet<int>(System.Linq.Enumerable.Where(System.Linq.Enumerable.Select(osat[3].Split(','), x => int.TryParse(x, out int n) ? n : -1), n => n >= 0));
                    o.Kirjaa($"poikki: aluskasvit lajit {osat[3]} (seuraava lataus)"); return;
                }
                if (arvo == "osat" && osat.Length > 3) { DioraamaAluskasvit.Osiin = osat[3] != "0"; o.Kirjaa($"poikki: aluskasvit osiin {DioraamaAluskasvit.Osiin} (seuraava lataus)"); return; }
                o.Kirjaa("poikki: " + DioraamaAluskasvit.Kytke(arvo != "0"));
                return;
            }
            // "poikki vesi [heijastus 0|1|auto]": järven planaariheijastus (Boat Attack -vesi, 1.10.2026) ja ympäristön tila.
            if (mita == "vesi")
            {
                if (arvo == "syvyys" && osat.Length > 3) DioraamaYmparisto.SyvyysPaalla = osat[3] != "0";
                if (arvo == "heijastus" && osat.Length > 3)
                    DioraamaYmparisto.HeijastusPakotettu = osat[3] == "0" ? false : osat[3] == "1" ? true : (bool?)null;
                // "poikki vesi siirto <m>": vedenpinta alas/ylös vianetsintään (näkyykö maa veden alla), 0 = datan taso.
                if (arvo == "siirto" && osat.Length > 3) nayttamo?.Ymparisto?.SiirraVesi((float)Luku(osat[3]));
                o.Kirjaa($"poikki: vesi: ympäristö {nayttamo?.Ymparisto?.Tila ?? "-"}, heijastus {(DioraamaYmparisto.HeijastusPakotettu.HasValue ? (DioraamaYmparisto.HeijastusPakotettu.Value ? "päällä" : "pois") : "auto")}");
                return;
            }
            // "poikki kaistat [0|1|auto]": isojen ASTC-tekstuurien kaistoittainen GPU-lataus (linnan piikit 2.10.) vertailuun.
            if (mita == "kaistat")
            {
                DioraamaAstc.KaistatPakotettu = arvo == "0" ? false : arvo == "1" ? true : (bool?)null;
                o.Kirjaa($"poikki: kaistat {(DioraamaAstc.KaistatPakotettu == false ? "pois" : "päällä")} (seuraava lataus)");
                return;
            }
            // "poikki detalji [0|1|auto]": kuoren lähidetalji päälle/pois vertailua varten (menetelmä B, 30.9.2026).
            if (mita == "detalji")
            {
                DioraamaUlkokuori.DetaljiPakotettu = arvo == "0" ? false : arvo == "1" ? true : (bool?)null;
                nayttamo?.Ulkokuori?.AsetaDetaljiParam();
                o.Kirjaa($"poikki: detalji {(DioraamaUlkokuori.DetaljiPakotettu.HasValue ? (DioraamaUlkokuori.DetaljiPakotettu.Value ? "päällä" : "pois") : "auto")}, " +
                         $"data {(rakennus?.Ulkokuori?.Detalji != null ? "on" : "ei")}, {DioraamaLaatu.Kuvaus}");
                return;
            }
            // "poikki kuori [auto|huippu|normaali|kevyt]": ulkokuoren laatutaso (kehittäjän valitsin, muistetaan).
            if (mita == "kuori")
            {
                var uk = nayttamo?.Ulkokuori;
                if (arvo != null)
                {
                    // Setteri laukaisee PakotusVaihtui → LataaUlkokuori (konstruktori).
                    DioraamaUlkokuori.Pakotettu = arvo == "huippu" ? DioraamaUlkokuori.Laatu.Huippu : arvo == "normaali" ? DioraamaUlkokuori.Laatu.Normaali
                        : arvo == "kevyt" ? DioraamaUlkokuori.Laatu.Kevyt : (DioraamaUlkokuori.Laatu?)null;
                }
                o.Kirjaa("poikki: " + (uk != null ? uk.Kuvaus() : "kuori ei käytössä (näyttämö puuttuu)"));
                return;
            }
            if (mita == "lataa") { LataaUudelleen(); o.Kirjaa("poikki: lataa uudelleen"); return; }
            if (mita == "avainsana")
            {
                // Testi ennen dataa: poikki avainsana <jakso> <t_s> <vuosi|-> <sanat…> (lisää jakson avainsanoihin).
                var o2 = osat.Length > 4 && rakennus != null && int.TryParse(osat[2], out int ji) && ji >= 0 && ji < rakennus.Kertoja.Count
                    ? new Avainsana { Ts = Luku(osat[3]), Vuosi = osat[4] == "-" ? null : osat[4], Sanat = string.Join(" ", osat, 5, osat.Length - 5) } : null;
                if (o2 != null) rakennus.Kertoja[int.Parse(osat[2])].Avainsanat.Add(o2);
                o.Kirjaa("poikki: avainsana " + (o2 != null ? $"lisätty jaksoon {osat[2]}: {o2.Vuosi} {o2.Sanat} @ {o2.Ts:F1} s" : "käyttö: poikki avainsana <jakso> <t_s> <vuosi|-> <sanat>"));
                return;
            }
            if (mita == "pakota-virhe")
            {
                DioraamaLevyvalimuisti.PakotaVirheJalkeen = int.TryParse(arvo, out int pv) ? pv : -1;
                o.Kirjaa("poikki: pakota-virhe " + (DioraamaLevyvalimuisti.PakotaVirheJalkeen >= 0 ? $"{DioraamaLevyvalimuisti.PakotaVirheJalkeen} tiedoston jälkeen" : "pois"));
                return;
            }
            if (mita == "pulu" && arvo == "napautus")
            {
                if (osat.Length > 3) PuluNapautuksesta = osat[3] != "0";
                if (linssi != null) linssi.PuluNapautuksesta = PuluNapautuksesta && linssi.Rakennus?.Saapuminen != null;
                o.Kirjaa($"poikki: pulu napautus {(PuluNapautuksesta ? "päällä" : "pois")} (linssi {(linssi?.PuluNapautuksesta == true ? "päällä" : "pois")})");
                return;
            }
            // "poikki pulu hahmo <id>": testinapautus hahmoon (Pulun reaktio) samaan tapaan kuin "poikki napauta".
            if (mita == "pulu" && arvo == "hahmo" && osat.Length > 3) { linssi.Napauta(pysaytettyT ?? YdinAika, osat[3]); o.Kirjaa("poikki: pulu hahmo " + osat[3]); return; }
            if (mita == "cinemachine" || mita == "kohina" || mita == "cm")
            {
                if (mita == "cinemachine") DioraamaCinemachine.Paalla = arvo != "0";
                if (mita == "kohina") DioraamaCinemachine.Kohina = arvo != "0";
                var odotettu = viimeNakyma.HasValue && syote != null ? syote.Sovita(jousi.Sovella(viimeNakyma.Value.Kamera, false)) : default;
                o.Kirjaa("poikki: " + (cm != null && nayttamo != null ? cm.Tila(nayttamo.Kamera, odotettu)
                    : $"cinemachine {(DioraamaCinemachine.Paalla ? "päällä" : "pois")}, kohina {(DioraamaCinemachine.Kohina ? "päällä" : "pois")} (linssi kiinni)"));
                return;
            }
            if (mita == "ik")
            {
                DioraamaHahmot3D.IkPaalla = arvo != "0";
                o.Kirjaa("poikki: ik " + (DioraamaHahmot3D.IkPaalla ? "päällä" : "pois"));
                return;
            }
            if (mita == "orbit")
            {
                DioraamaKameraJousi.OrbitPaalla = arvo != "0";
                o.Kirjaa("poikki: orbit " + (DioraamaKameraJousi.OrbitPaalla ? "päällä" : "pois"));
                return;
            }
            if (mita == "dof")
            {
                DioraamaNayttamo.DofPaalla = arvo == "1";
                o.Kirjaa("poikki: dof " + (DioraamaNayttamo.DofPaalla ? "päällä" : "pois"));
                return;
            }
            if (mita == "hehku")
            {
                // Hehku (Bloom, erä 2) on nayttamo-instanssin ominaisuus (ei staattinen kuten DofPaalla): jos
                // linssi on kiinni (nayttamo == null), kytkin ei säily seuraavaan avaukseen -- poikkeama raportoitu.
                if (nayttamo != null) nayttamo.Hehku = arvo == "1";
                o.Kirjaa("poikki: hehku " + (arvo == "1" ? "päällä" : "pois"));
                return;
            }
            if (mita == "drift")
            {
                // Leijunta (era 2b, kohta 5) on linssi-instanssin ominaisuus. Toisin kuin Hehku (nayttamo-
                // instanssin ominaisuus, nayttamo tuhotaan/luodaan uudelleen joka Sulje/Avaa) linssi-kenttä on
                // readonly ja säilyy koko Sovittimen elinajan -- kytkin jää päälle Sulje/Avaa-kierron yli (vain
                // uusi peli-/Sovitin-instanssi nollaa sen oletukseen, pois).
                linssi.Leijunta = arvo == "1";
                o.Kirjaa("poikki: drift " + (arvo == "1" ? "päällä" : "pois"));
                return;
            }
            if (mita == "hahmot")
            {
                // 3D-malli vs. 2D-kortti (era 2b kohta 4, ali-agentti P4b): DioraamaHahmot3D.Paalla on
                // staattinen, oletus 3d (tosi) -- vaikuttaa seuraaviin LisaaTila-kutsuihin (SuodataHahmot3dPois
                // + DioraamaHahmot3D.LisaaTila), "poikki lataa" lataa tilat uudelleen. Sama sopimus kuin liekit.
                if (arvo == "3d" || arvo == "2d") DioraamaHahmot3D.Paalla = arvo == "3d";
                o.Kirjaa("poikki: hahmot " + (DioraamaHahmot3D.Paalla ? "3d" : "2d"));
                return;
            }
            if (mita == "skin")
            {
                // Skinnatun hahmon sävyn juurisyy (Linnanrakentaja 2.10. 19.1x): "valkoinen" = kuva pois (_Tila 0, _Vari
                // valkoinen) → näkyy pelkkä valo × AO; "kuva" = takaisin. Tila kertoo kärkivärit (AO) ja kuvat.
                o.Kirjaa("poikki: skin " + (nayttamo?.Hahmot3D?.SkinKoe(arvo) ?? "ei näyttämöä"));
                return;
            }
            if (mita == "liekit")
            {
                // 3D-liekki vs. atlas-billboard (era 2b kohta 6): DioraamaLiekit.Kolmiulotteinen on staattinen,
                // oletus 3d -- vaikuttaa seuraaviin LisaaTila-kutsuihin ("poikki lataa" lataa tilat uudelleen).
                if (arvo == "3d" || arvo == "atlas") DioraamaLiekit.Kolmiulotteinen = arvo == "3d";
                o.Kirjaa("poikki: liekit " + (DioraamaLiekit.Kolmiulotteinen ? "3d" : "atlas"));
                return;
            }
            if (mita == "aanet")
            {
                // A/B-kehityskytkin (era 2) + tilaraportti ("poikki aanet"): ladatut klipit, silmukat, puhuja.
                if (aanet == null) { o.Kirjaa("poikki: äänet eivät ole valmiit (linssiä ei ole avattu kertaakaan)"); return; }
                if (arvo == "unohda-kertoja") { o.Kirjaa($"poikki: kertojan klipit unohdettu ({aanet.UnohdaKertoja()})"); return; }
                if (arvo == "0" || arvo == "1")
                {
                    aanet.Paalla = arvo == "1";
                    o.Kirjaa("poikki: äänet " + (arvo == "1" ? "päällä" : "pois"));
                }
                else o.Kirjaa(aanet.Tilaraportti());
                return;
            }
            if (mita == "valo")
            {
                // Aurinko/Lamput/Tuli (era 2b, DioraamaValot.cs): nayttamo.Valot-olion kytkimet, kuten Hehku.
                // Nelisanainen komento: osat[2] = aurinko|lamput|tuli, osat[3] = 0|1 (kuten "taso"-komento).
                string kohde = arvo;
                bool paalla = (osat.Length > 3 ? osat[3] : null) == "1";
                if (nayttamo?.Valot == null) { o.Kirjaa("poikki: valot eivät ole valmiit (linssiä ei ole avattu kertaakaan)"); return; }
                if (kohde == "aurinko") nayttamo.Valot.Aurinko = paalla;
                else if (kohde == "lamput") nayttamo.Valot.Lamput = paalla;
                else if (kohde == "tuli") nayttamo.Valot.Tuli = paalla;
                else { o.Kirjaa("poikki: tuntematon valo " + kohde + " (aurinko|lamput|tuli)"); return; }
                o.Kirjaa("poikki: valo " + kohde + " " + (paalla ? "päällä" : "pois"));
                return;
            }
            if (mita == "valaistus")
            {
                // DioraamaValaistu/DioraamaMaalattu-vaihto (era 2b, DioraamaRakennus.Valaistus-ominaisuus): kuten
                // Hehku nayttamolle -- jos linssi on kiinni, kytkin ei säily seuraavaan avaukseen.
                if (rakennus3D != null) rakennus3D.Valaistus = arvo == "1";
                o.Kirjaa("poikki: valaistus " + (arvo == "1" ? "päällä (DioraamaValaistu)" : "pois (DioraamaMaalattu)"));
                return;
            }
            if (mita == "pinnat")
            {
                // A/B-vertailu (kohta 2: "Taulussa A/B-kytkin vain kehittäjätilassa"): kertaluonteinen pakotus
                // kaikille jo luoduille materiaaleille (ei pysyvä tila), ks. DioraamaRakennus.PakotaTilaKaikille.
                if (arvo != "a" && arvo != "b") { o.Kirjaa("poikki: pinnat a|b"); return; }
                rakennus3D?.PakotaTilaKaikille(arvo == "b");
                o.Kirjaa("poikki: pinnat " + arvo);
                return;
            }
            if (!avoinna) { o.Kirjaa("poikki: linssi ei ole auki (linssi poikkileikkaus)"); return; }
            // rakennus.json (ja siis Ydin-linssin Avaa) voi olla vielä lataamatta: PoikkileikkausLinssi.Kohdista
            // lukee Rakennus-kentän suoraan eikä tarkista nulliä (AsentoFor → Rakennus.YleisVaaka).
            if (rakennus == null) { o.Kirjaa("poikki: rakennus.json ei ole vielä ladattu"); return; }
            double t = pysaytettyT ?? YdinAika;
            if (mita == "yleis") Kohdista(null, t);
            else if (mita == "tila" && arvo != null)
            {
                if (rakennus.Tila(arvo) == null) { o.Kirjaa("poikki: tuntematon tila " + arvo); return; }
                Kohdista(arvo, t);
            }
            else if (mita == "aika") pysaytettyT = (arvo == null || arvo == "pois") ? (double?)null : arvo == "nyt" ? t : Luku(arvo); // "nyt" jäädyttää nykyhetkeen (kuvaparit)
            else if (mita == "taso" && arvo != null && osat.Length > 3) { pakotettuTila = arvo; pakotettuTaso = (int)Luku(osat[3]); }
            else if (mita == "napauta") linssi.Napauta(t);
            // "poikki kertoja": esittely (kertojan kierros) alusta kuten valikon "Esittely uudelleen" (savukkeiden todennus 2.10.).
            else if (mita == "kertoja") { Yleisnakymaan(t); linssi.KertojaUudelleen(t + 0.1); }
            else if (mita == "mittaus") { o.Kirjaa(Mittausraportti()); return; }
            else if (mita != "tila") { o.Kirjaa("poikki: tuntematon " + mita); return; }
            o.Kirjaa(Tilaraportti());
        }

        /// <summary>Kehittäjän kiinteä kamera ("poikki kamera"), null = linssin oma.</summary>
        Matkakirja.Linssit.Dioraama.Asento? pakotettuKamera;

        static double Luku(string s) => double.Parse(s.Replace(',', '.'), CultureInfo.InvariantCulture);

        /// <summary>Puolikas pintatekstuuri, jos laite on pieni (era 2b, tekstuurimuisti 29.9.2026, omistaja:
        /// natiivissa 89 Mt Codexin pinnoilla, liikaa iPhonelle): fyysinen pikselimäärä (Screen.width×
        /// Screen.height -- EI riipu suunnasta/kierrosta, kertolasku on symmetrinen) alle 4 000 000 TAI
        /// SystemInfo.systemMemorySize (Mt) alle 6000. Kumpi tahansa riittää: pieninäyttöinen laite voi olla
        /// muistiltaan iso (silti täysi näyttö turhaa), ja iso näyttö voi olla muistiltaan pieni (silti
        /// vanhempi/halvempi laite). "poikki mittaus" (Mittausraportti) näyttää kumman tämän laite valitsi.</summary>
        // Omistaja 30.9.2026: täyden laadun laitteilla (DioraamaLaatu.Taysi, A17 Proa uudemmat) aina täydet tekstuurit ja 4k-atlakset.
        internal static bool PieniLaite() => !DioraamaLaatu.Taysi && ((long)Screen.width * Screen.height < 4_000_000L || SystemInfo.systemMemorySize < 6000);

        string Tilaraportti()
        {
            if (!avoinna) return "poikki: kiinni";
            if (rakennus == null) return "poikki: lataa" + (latausKaynnissa ? "…" : "");
            string kohde = viimeNakyma?.KohdeTila ?? "yleisnäkymä";
            return $"poikki: {rakennus.Nimi}, kohde {kohde}, tiloja {rakennus3D.TilojaLadattu}/{rakennus.Tilat.Count}, " +
                   $"hahmoja {hahmot3D.Maara}+{nayttamo.Hahmot3D?.Maara ?? 0} 3d ({nayttamo.Hahmot3D?.MallejaLadattu ?? 0} mallia), " +
                   $"peili {peiliKuvaus}, aika {(pysaytettyT.HasValue ? pysaytettyT.Value.ToString("F1", CultureInfo.InvariantCulture) : "elää")}, " + DioraamaLevyvalimuisti.Raportti();
        }

        string Mittausraportti()
        {
            var kamera = nayttamo != null ? nayttamo.Kamera : null;
            string asento = kamera != null
                ? $"paikka ({kamera.transform.position.x:F1}, {kamera.transform.position.y:F1}, {kamera.transform.position.z:F1}), fov {kamera.fieldOfView:F0}°"
                : "-";
            // ERA 2: pintojen ja liekkien tekstuurimuisti lisätään hahmoatlaksien arvioon (Profiler antaa todellisen
            // GPU-koon mipmapit mukaan lukien; hahmoatlas ei tässä sovittimessa ole omistuksessamme, joten sen oma
            // TekstuuriTavuja()-arvio pysyy ennallaan w·h·4-approksimaationa).
            long uusienTavuja = 0;
            foreach (var t in ladatutPinnat.Values) uusienTavuja += TekstuuriTavuja(t);
            foreach (var t in ladatutLiekkiAtlakset.Values) uusienTavuja += TekstuuriTavuja(t);
            foreach (var t in ladatutValoAtlakset.Values) uusienTavuja += TekstuuriTavuja(t);
            double tekstuuriMt = ((hahmot3D?.TekstuuriTavuja() ?? 0) + uusienTavuja) / (1024.0 * 1024.0);
            // era 2b (kohta 4, ali-agentti P4b): 3D-hahmojen kolmiot lasketaan JAETUSTA geometriasta (kerran
            // per henkilö, ei per instanssi -- ks. DioraamaHahmot3D.KolmiotJaetussaGeometriassa-kommentti).
            int hahmo3dKolmiot = nayttamo?.Hahmot3D?.KolmiotJaetussaGeometriassa() ?? 0;
            // Era 2b (tekstuurimuisti): kertoo kumman pintakoon PieniLaite valitsi ja MIKSI (näyttöpikselit,
            // muisti) -- omistajan pyyntö "kertoo kumpi ja muistin".
            long naytonPikselit = (long)Screen.width * Screen.height;
            string pintakoko = (PieniLaite() ? "puolikas" : "täysi") + ", " + DioraamaLaatu.Kuvaus;
            return $"poikki mittaus: tiloja {rakennus3D?.TilojaLadattu ?? 0}/{rakennus?.Tilat?.Count ?? 0}, kolmioita {(rakennus3D?.Kolmiot ?? 0) + hahmo3dKolmiot} (3d-hahmot {hahmo3dKolmiot}), " +
                   $"kärkiä {rakennus3D?.Karjet ?? 0}, rendereitä {(rakennus3D?.Renderereita ?? 0) + (hahmot3D?.Maara ?? 0)}, " +
                   $"materiaaleja {(rakennus3D?.Materiaaleja ?? 0) + (hahmot3D?.AtlaksiaLadattu ?? 0)}, tekstuurimuisti (arvio) {tekstuuriMt:F1} Mt, " +
                   $"pinnat {pintakoko} (näyttö {naytonPikselit} px, laitemuisti {SystemInfo.systemMemorySize} Mt), kamera {asento}";
        }

        /// <summary>GPU-tekstuurimuisti (Profiler antaa todellisen koon mipmapit/pakkaus mukaan lukien; era 2 kohta 3
        /// mainitsee tämän tai käsinlasketun w·h·4·1,33-arvion -- Profiler on tarkempi kun se on saatavilla).</summary>
        static long TekstuuriTavuja(Texture2D t) => t != null ? Profiler.GetRuntimeMemorySizeLong(t) : 0;
    }
}
