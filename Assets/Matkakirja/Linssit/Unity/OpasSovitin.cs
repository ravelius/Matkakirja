// ELÄVÄ OPAS (omistaja 5.10.2026 klo 17.5x, Päätoimittaja; Linssiseppä): Unity-osa. Silmukka on ytimessä (OpasSilmukka),
// Cesium-näkymä CesiumKaupunki-luokassa ja UI KierrosTaulussa (avausruutu, kohteen nimi; teksti vain, jos ääntä ei ole).
//
// WORKER (Pelikoodari, Pulun worker): POST {PuluChat.Palvelin}/opas/seuraava {istunto, toive, kaupunki, sijainti, nahdyt, kieli}
// → {id, nimi, alarivi, lat, lon, koko_m, korkeus_m, teksti, aani, kesto_s}. Natiivi pyytää seuraavan heti, kun kappale alkaa
// soida (esihaku), ja pelaajan toive (Pulu-chat, sanelu; PuluChat.Sieppaa-koukku, Natiivi-UI bb27e664) keskeyttää.
// ÄÄNI: kappaleen mp3 ladataan heti vastauksen tultua ja soitetaan saapuessa; puhe merkitään puhujaksi (Repliikki), jolloin
// pelin muut kanavat väistyvät. Kertoja-kytkin pois tai lataus epäonnistui → teksti ruudulle ja kesto kesto_s:stä.
// TESTITILA ("opas testi"): Kööpenhaminan 15 kohdetta järjestyksessä ilman workeria ja ääntä (KoopenhaminaTesti).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class OpasSovitin : ILinssi
    {
        public static readonly LinssiTiedot OpasTiedot = new LinssiTiedot
        {
            Id = "opas",
            Nimi = "Kuumailmapallo",   // omistaja 7.10. 09.1x: näkyvä nimi (valikko, otsikot, VoiceOver); id "opas" ennallaan
            Lyhyt = "Opas lentää kanssasi minne haluat ja kertoo paikoista.",
            Jarjestys = 98,
            // Kuumailmapallo (oli karttanasta) (Päätoimittaja 8.10.2026: omat viivakuvakkeet, kuvaketaulukko).
            Ikoni = "<path d=\"M12 2.8c-3.9 0-6.6 2.9-6.6 6.5 0 2.9 2 4.9 3.7 6.6h5.8c1.7-1.7 3.7-3.7 3.7-6.6 0-3.6-2.7-6.5-6.6-6.5z\"/><path d=\"M12 2.8c-1.6 1.8-2.4 4-2.4 6.5 0 2.6.6 4.7 1.4 6.6M12 2.8c1.6 1.8 2.4 4 2.4 6.5 0 2.6-.6 4.7-1.4 6.6\"/><path d=\"M9.1 15.9l1.2 2.8M14.9 15.9l-1.2 2.8\"/><rect x=\"10\" y=\"18.7\" width=\"4\" height=\"2.7\" rx=\".6\"/>",
            Valokuva = true,
            Kesken = false,   // omistaja 6.10. 20.1x: matkaopas pois keskeneräisistä
            Lahde = new Lahde
            {
                Aineisto = "Cesium ion (Google Photorealistic 3D Tiles tai World Terrain, Bing ja OSM Buildings); Wikipedia",
                Lisenssi = "Cesium ion- ja Google-ehdot; Wikipedia CC BY-SA",
                Osoite = "https://cesium.com/platform/cesium-ion/content/",
                Haettu = "2026-10-05",
            },
        };

        /// <summary>Avausruudun tekstit (KierrosTaulu).</summary>
        public const string Otsikko = "KUUMAILMAPALLO", Alaotsikko = "KERRO, MITÄ HALUAT NÄHDÄ";
        /// <summary>Workerin polku ja aikaraja (s).</summary>
        public const string Polku = "/opas/seuraava";
        public const int AikarajaS = 30;

        public static OpasSovitin Viimeisin { get; private set; }
        public static event Action<OpasSovitin> Vaihtui;
        /// <summary>Testitila ilman workeria (komento "opas testi 1|0").</summary>
        public static bool Testi;
        /// <summary>Kamera pysäytetty paikalleen (komento "opas pysayta 1|0"; kuvaparit samasta kulmasta), silmukka odottaa.</summary>
        public static bool Pysaytetty;
        /// <summary>Testiotsake (komento "opas testiotsake 1"): worker palauttaa kerronnan ilman ääntä (ei ElevenLabs-kulutusta simussa).</summary>
        public static bool Testiotsake;
        /// <summary>PCM-suoratoisto (Pöllön aani_pcm) käytössä. OLETUS PÄÄLLÄ (Päätoimittaja 6.10. 13.2x, juna 148): Pöllön kylmä mp3 alkaa
        /// ~14 s:ssa, PCM-virta ~0,9 s:ssa (mitattu 6.10. 13.1x). Virran virheessä mp3-varapolku (LataaPcm). Komento "opas pcm 0|1".</summary>
        public static bool PcmKaytossa = true;
        /// <summary>Kappaleen äänen avain: PCM-virta vain kytkimellä, muuten mp3.</summary>
        static string AaniAvain(OpasKohde k) => k == null ? null : PcmKaytossa ? k.AaniAvain : (string.IsNullOrEmpty(k.Aani) ? null : k.Aani);
        /// <summary>Aloituskaupunki (komento "opas kaupunki <nimi>"); ensimmäinen pyyntö on tämä toive.</summary>
        public static string Aloituskaupunki = "Kööpenhamina";
        /// <summary>
        /// Kaupunki, jossa kamera nyt on (Siirtoseppä 7.10.: pelaajan toive Pariisista Venetsiaan ei vaihda Aloituskaupunkia, ja
        /// äänimaisema soitti Pariisin karttaa Venetsiassa): sallitun kaupungin tunnus kameran paikasta (OpasSallitut), muuten
        /// Aloituskaupungin tunnus (KaupunkiTiet.Tunnus). Äänimaisema, yövalojen kadut ja muut kaupunkikohtaiset aineistot lukevat tämän.
        /// </summary>
        public static string NykyinenKaupunkiId
        {
            get
            {
                if (Auki && Viimeisin.silmukka != null)
                {
                    var a = Viimeisin.silmukka.Asento;
                    var k = OpasSallitut.Alue(sallitut, a.Lat, a.Lon);
                    if (k != null) return k.Id;
                }
                return KaupunkiTiet.Tunnus(Aloituskaupunki);
            }
        }

        /// <summary>
        /// Koukku elokuvamaiselle kameralle (Siirtoseppä, juna 145, OpasCinemachine.cs): kutsutaan joka kehys KyydinKameraEnnen-vaiheessa
        /// (−50) heti sen jälkeen, kun PalloKierto.Kuvaa on asettanut silmukan asennon (paikka, asento, lähi- ja kaukotaso).
        /// Kuuntelija voi ohjata kameraa (Brain ManualUpdate) ennen Cesiumin laattavalintaa.
        /// </summary>
        public static event Action<Camera, OpasSilmukka> KameraKuvattu;
        /// <summary>Kertojan kappale soi (Natiivi-UI: vastaussirut vasta kappaleen jälkeen).</summary>
        public static bool KertojaPuhuu => Viimeisin != null && Viimeisin.puhuu;
        /// <summary>Oppaan linssi auki (Natiivi-UI: chatin syöte oppaalle).</summary>
        public static bool Auki => Viimeisin != null && Viimeisin.silmukka != null && Viimeisin.Virhe == null;

        /// <summary>Pelaajan toive chatista; true = otettu oppaalle (Pulun workeria ei kutsuta).</summary>
        public static bool Toive(string teksti)
        {
            if (!Auki || string.IsNullOrWhiteSpace(teksti)) return false;
            Viimeisin.o.Kirjaa("opas: toive \"" + teksti.Trim() + "\"");
            var v = Viimeisin;
            var kys = v.silmukka.OdottaaVastausta && v.viimeKysymys != null ? v.viimeKysymys : v.silmukka.Nykyinen;
            string ryhma = OpasSiltalauseet.RyhmaToiveelle(teksti, kys?.Vaihtoehdot, kys?.VaihtoehtojenRyhmat);
            v.silmukka.Toive(teksti);
            v.Silta(ryhma, true);
            return true;
        }

        /// <summary>
        /// Kaupungin vaihto valikosta (Natiivi-UI OpasValikko.KohdeValittu): puhe katkeaa ja seuraava pyyntö menee valittuun
        /// paikkaan (kaupunki ja sijainti). true = otettu oppaalle.
        /// </summary>
        public static bool VaihdaKaupunki(string nimi, double lat, double lon) => VaihdaKaupunki(nimi, lat, lon, null);

        /// <summary>Kuten yllä, maan ISO-koodilla (samannimiset kaupungit, esim. Jerusalem IL/PS); nimi sanotaan Williamin äänellä.</summary>
        public static bool VaihdaKaupunki(string nimi, double lat, double lon, string iso) => VaihdaKaupunki(nimi, lat, lon, iso, null, double.NaN, double.NaN);

        /// <summary>Kuten yllä, ja kohde samassa kaupungissa (worker #4107): siirto vie suoraan kohteeseen yleiskuvan sijaan.
        /// Kohde ilman sijaintia tai toisessa kaupungissa ohitetaan (yleiskuva).</summary>
        public static bool VaihdaKaupunki(string nimi, double lat, double lon, string iso, string kohde, double kLat, double kLon)
        {
            if (!Auki || string.IsNullOrWhiteSpace(nimi)) return false;
            // Sallitut kaupungit (omistaja 7.10. 00.4x): vain listan kaupungit; keskipiste listalta (hyvän 3D:n alueen keskus).
            bool kohteella = !string.IsNullOrWhiteSpace(kohde) && !double.IsNaN(kLat) && !double.IsNaN(kLon);
            if (sallitut != null && sallitut.Count > 0)
            {
                var sk = OpasSallitut.Nimella(sallitut, nimi) ?? OpasSallitut.Sisalla(sallitut, lat, lon);
                if (sk == null) { Viimeisin.o.Kirjaa($"opas: kaupunki {nimi} ei ole sallittujen listalla, ei vaihdeta"); Viimeisin.Torjunta(); return false; }
                if (kaupunkitila != null && sk.Id != kaupunkitila.Id)
                { Viimeisin.o.Kirjaa($"opas: kaupunkitila {kaupunkitila.Nimi}: {nimi} on toinen kaupunki, ei vaihdeta"); Viimeisin.Torjunta(); return false; }
                lat = sk.Lat; lon = sk.Lon;
                if (kohteella && OpasSallitut.Sisalla(sallitut, kLat, kLon) != sk) kohteella = false;
            }
            else
            {
                (lat, lon) = Keskusta(lat, lon);   // Natural Earth -piste → kaupungin keskusta (Wikidata P625)
                if (kohteella && KierrosLento.EtaisyysM(lat, lon, kLat, kLon) > OpasSilmukka.SiirtoRajaM) kohteella = false;
            }
            if (!kohteella && !string.IsNullOrWhiteSpace(kohde)) Viimeisin.o.Kirjaa($"opas: kohde {kohde} ei ole kaupungissa {nimi} tai sijainti puuttuu → yleiskuva");
            Aloituskaupunki = nimi.Trim();
            Viimeisin.pakotettuSijainti = (lat, lon);
            AloitusKeskusta = (lat, lon);
            Viimeisin.o.Kirjaa($"opas: kaupunki vaihtuu → {Aloituskaupunki} ({lat:F3}, {lon:F3})");
            if (!Viimeisin.AvaaKaupunki(lat, lon, Aloituskaupunki)) return false;
            if (kohteella)
            {
                Viimeisin.o.Kirjaa($"opas: kaupungin vaihto suoraan kohteeseen {kohde} ({kLat:F4}, {kLon:F4})");
                Viimeisin.silmukka.VaihdaPaikkaKohteeseen(kohde.Trim(), kLat, kLon);
            }
            else
            {
                if (esitysAlkaa) Viimeisin.silmukka.PyynnotSeis = true;   // esitys: avaus ja opastus ensin, ei workerin kaupunkikysymystä
                Viimeisin.silmukka.AvausEtaisyysOhitus = Kaupunkitila ? KaupunkitilaAvausM : (double?)null;
                Viimeisin.silmukka.AvausKallistusOhitus = Kaupunkitila ? KaupunkitilaAvausKallistus : (double?)null;
                Viimeisin.silmukka.VaihdaPaikka(lat, lon, nimi.Trim());   // kamera lentää heti kaupungin yleiskuvaan (Natiivi-UI 6.10. 00.2x)
            }
            var v = Viimeisin;
            if (!v.SanoNimi(nimiaanet?.Kaupungille(iso, nimi))) v.Silta(OpasSiltalauseet.Kaupunki, true);
            return true;
        }

        /// <summary>Maan valinta Vaihda kohde -valikossa (Natiivi-UI, juna 146): maan nimi Williamin äänellä heti. true = sanottiin.</summary>
        public static bool MaaValittu(string iso)
        {
            // Omistaja TF 149 (16.5x): ei puhetta maanosan eikä maan valinnasta (pelaaja voi vielä peruuttaa); kertoja vasta
            // kaupungin tai suosikin valinnasta, kerran (VaihdaKaupunki: nimi + yksi jatko).
            return false;
        }
        (double lat, double lon)? pakotettuSijainti;

        // ---- KAUPUNKIÄÄNIMAISEMA (Siirtoseppä, PÄÄTOIMITTAJA 6.10. 21.4x; pilotti Pariisi, Venetsia, Kööpenhamina) ----
        // Tila luettavaksi ilman riippuvuutta soittimen luokkaan: KaupunkiAanimaisemaSoitin lukee nämä joka kehys.
        /// <summary>Kaupunkinäkymä näkyy (opas auki, kartta avattu valinnasta, ei virhettä).</summary>
        public static bool KaupunkiNakyvissa => Auki && !Viimeisin.kaupunkiOdottaa && Viimeisin.nakymaAuki;
        /// <summary>Kertoja (William) tai siltalause soi oppaan omista AudioSourceista (ei Aanisoittimen kautta): äänimaisema väistää.
        /// (KertojaPuhuu on vain kappale; Natiivi-UI:n vastaussirut.)</summary>
        public static bool OpasAaniSoi => Auki && (Viimeisin.puhuu || (Viimeisin.silta != null && Viimeisin.silta.isPlaying));
        /// <summary>Kamera: korkeus maasta (m), todellinen nopeus (m/s, pehmennetty), nykyisen kohteen lat/lon; null, kun kaupunkia
        /// ei näytetä tai siirtoruutu on päällä.</summary>
        public static (double korkeusM, double nopeusMs, double lat, double lon)? KaupunkiKamera =>
            KaupunkiNakyvissa && !Viimeisin.silmukka.Siirtymassa ? Viimeisin.kameraTila : null;
        (double korkeusM, double nopeusMs, double lat, double lon)? kameraTila;
        double3? edellinenEcef;

        void PaivitaKameraTila()
        {
            var kam = kaupunki.Kamera; var g = kaupunki.Georef;
            if (kam == null || g == null || silmukka.Siirtymassa) { kameraTila = null; edellinenEcef = null; return; }
            var p = kam.transform.position;
            var ecef = g.TransformUnityPositionToEarthCenteredEarthFixed(new double3(p.x, p.y, p.z));
            var llh = CesiumForUnity.CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(ecef);
            double dt = Math.Max(1e-3, Time.unscaledDeltaTime);
            double v = edellinenEcef is double3 e ? math.length(ecef - e) / dt : 0;
            if (v > 3000) v = 0;   // siirto tai origon vaihto: ei äkkinopeutta
            double vanha = kameraTila?.nopeusMs ?? v;
            double maa = viimeMaa.h is double vh && KierrosLento.EtaisyysM(viimeMaa.lat, viimeMaa.lon, llh.y, llh.x) < 15000 ? vh : OpasSilmukka.MaaArvioM;
            var k = silmukka.Nykyinen;
            kameraTila = (Math.Max(0, llh.z - maa), vanha + (v - vanha) * Math.Min(1, dt / 0.3), k?.Lat ?? llh.y, k?.Lon ?? llh.x);
            edellinenEcef = ecef;
        }
        /// <summary>Valitun kaupungin keskusta (kaupunki, täky tai avaus): pyyntöjen sijainti, kunnes kamera on kaupungissa (TF 152).
        /// Staattinen kuten Aloituskaupunki, jotta nimi ja paikka vaihtuvat aina yhdessä.</summary>
        public static (double lat, double lon) AloitusKeskusta = (KoopenhaminaTesti.Alku.Lat, KoopenhaminaTesti.Alku.Lon);
        (double lat, double lon) PyynnonPaikka() => OpasSilmukka.PyynnonPaikka(silmukka.Asento, AloitusKeskusta);

        readonly LinssiOhjain o;
        readonly PalloKierto kierto;
        readonly CesiumKaupunki kaupunki;
        readonly PalloKori kori = new PalloKori();
        /// <summary>Katse ylös korista (omistaja 21.1x, PT 22.0x): kupu näkyy vedettäessä.</summary>
        readonly KoriKatseVeto koriKatse = new KoriKatseVeto();
        /// <summary>Pallon äänimaisema kehityskaupungeissa (Pelikoodari 8.10., Tausta-säädin).</summary>
        readonly PalloAanimaisemaSoitin palloAanet = new PalloAanimaisemaSoitin();
        public static string KoriKatseTila => Auki ? Viimeisin.koriKatse.Tila() : "opas ei auki";
        readonly Dictionary<string, double> maaKorkeudet = new Dictionary<string, double>(StringComparer.Ordinal);
        readonly Dictionary<string, AudioClip> klipit = new Dictionary<string, AudioClip>(StringComparer.Ordinal);
        ILinssiYmparisto y;
        OpasSilmukka silmukka;
        AudioSource puhe;
        string istunto;
        int testiIndeksi, paivitetty = -1;
        float puheLoppuu = -1f;
        bool puhuu;

        public OpasSovitin(LinssiOhjain o, PalloKierto kierto)
        {
            this.o = o; this.kierto = kierto;
            kaupunki = new CesiumKaupunki(kierto, o.Kirjaa);
        }
        public LinssiTiedot Tiedot => OpasTiedot;
        bool ILinssi.Auki => silmukka != null;
        public OpasSilmukka Silmukka => silmukka;
        /// <summary>Avauksen virhe tai näkymän myöhempi virhe (tunnuksen haku Pöllöstä epäonnistui); UI näyttää sen ja sulkee linssin.</summary>
        public string Virhe { get => virhe ?? (nakymaAuki ? kaupunki.Virhe : null); private set => virhe = value; }
        string virhe;
        bool nakymaAuki;
        public float Latausaste => kaupunki.Latausaste;
        /// <summary>Kertojan teksti ruudulle: vain kun puhe ei soi (PUHE ÄÄNENÄ -sääntö).</summary>
        public string TekstiRuudulle => silmukka != null && !puhuu && tekstina != null && !ChatKaytossa ? tekstina.Teksti : null;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            y = ymparisto;
            Virhe = null;
            Viimeisin = this;
            var alku = OpasSilmukka.Avauskuva(KoopenhaminaTesti.Alku.Lat, KoopenhaminaTesti.Alku.Lon);
            silmukka = new OpasSilmukka(alku);
            // AVAUS ILMAN KARTTAA (omistaja 6.10. 14.2x, juna 149): täkyavauksessa Cesium avataan vasta pelaajan valinnasta
            // (AvaaKaupunki), joten aloitusvalikko aukeaa heti eikä yhtään laattaa ladata ennen valintaa.
            // Natiivi-UI nostaa TakyAvaus-lipun valikon Nayta-kutsussa (KytkeChat): kytke ensin, päätä sitten (simu 6.10. 17.00:
            // lippu nousi vasta tämän jälkeen, ja kartta latautui turhaan mustan aloitusvalikon taakse).
            KytkeChat(true);
            kaupunkiOdottaa = TakyAvaus && !Testi;
            if (kaupunkiOdottaa) silmukka.PakotaSiirto = true;   // mikä tahansa ensimmäinen liike avaa kartan siirtoruudun kautta
            if (!kaupunkiOdottaa && !kaupunki.Avaa(alku.Lat, alku.Lon, 45))
            {
                Virhe = OpasTiedot.Nimi + ": " + kaupunki.Virhe;
                Vaihtui?.Invoke(this);
                return;
            }
            nakymaAuki = true;
            // Omistaja 7.10. 21.4x: "Notre Damen kyltti kartalla ei ole oikealla kohdalla, kannattaa ottaa pois kokonaan kun on tuo
            // pilvi kuitenkin kohteen ympärillä" → kierroksen kohteiden nimilappu pois, korostus riittää.
            KytkeNimilappu(false);
            istunto = Guid.NewGuid().ToString("N");
            testiIndeksi = 0;
            if (kierto != null) SyoteLukko.Esta(this);
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            y.Peite(true);
            if (!kaupunkiOdottaa) o.StartCoroutine(PeitePois());   // simu 18.39: peite jäi päälle ja tummensi koko näkymän
            else y.Peite(false);   // aloitusvalikko piirtää oman tumman pintansa; peite himmensi sen ja esti napautukset (simu 6.10. 17.2x, juna 151)
            if (puhe == null)
            {
                puhe = o.gameObject.AddComponent<AudioSource>();
                puhe.playOnAwake = false; puhe.spatialBlend = 0f; puhe.loop = false;
            }
            // KytkeChat(true) ajettiin jo ennen karttapäätöstä; chat ei aukea itsestään (opas kevyeksi, Päätoimittaja 5.10.), vain valikon "Näytä teksti" -rivistä
            silmukka.Pyyda += Pyyda;
            silmukka.Saapui += Saapui;
            silmukka.Hiljenna += Hiljenna;
            silmukka.Kysyy += Kysyy;
            silmukka.LentoAlkaa += LentoAlkoi;
            silmukka.LentoKohdeVaihtui += k => o.Kirjaa($"opas: avauksen laskeutuminen jatkuu suoraan kohteeseen {k.Nimi} (kehys vaihtuu {OpasSilmukka.AvausVaihtoS:F0} s, lento {silmukka.LentoKestoS:F1} s, kulunut {silmukka.VaiheAika:F1} s)");
            silmukka.Torjuttu += (n, pelaajalta) =>
            {
                o.Kirjaa($"opas: {n} on sallitun 3D-alueen ulkopuolella, ei lennetä{(pelaajalta ? " (siltalause)" : "")}");
                if (pelaajalta) Torjunta();
            };
            if (sallitut == null) LueSallitutLevylta();
            silmukka.Sallitut = SilmukanSallitut;
            if (!sallitutHaussa && (sallitut == null || Time.realtimeSinceStartup - sallitutHaettu > SallitutUusintaS)) o.StartCoroutine(HaeSallitutKerran());
            // Siirto ilman lentoa (omistaja 6.10. 12.0x): origo heti kohteeseen, latausaste kohdekameran laatoista.
            silmukka.SiirtoAlkaa += (la, lo) => { if (kaupunkiOdottaa && !AvaaKaupunki(la, lo, silmukka.SiirtoNimi)) return; kaupunki.YritaGoogleUudelleen(); kaupunki.Karkeaksi(); kaupunki.SiirraOrigo(la, lo, MaaPisteessa(la, lo) is double m && !double.IsNaN(m) ? m : 45); o.Kirjaa($"opas: siirrytään {silmukka.SiirtoNimi} ({la:F3}, {lo:F3})"); };
            silmukka.LatausEdistys = () => kaupunki.Latausaste / 100.0;
            // Maaston korkeus kohdekehykseen (simu 6.10. 12.42: Praha aukesi 45 m:n arviolla mäen sisältä): näyte pisteeseen.
            silmukka.MaaPisteessa = MaaPisteessa;
            silmukka.MaaTarvitaan += (la, lo) => o.StartCoroutine(KorkeusPisteessa(la, lo));
            silmukka.KehysKorjattu += (arvio, m) => o.Kirjaa($"opas: kehyksen maa {arvio:F0} → {m:F0} m (näyte)");
            if (silta == null)
            {
                silta = o.gameObject.AddComponent<AudioSource>();
                silta.playOnAwake = false; silta.spatialBlend = 0f; silta.loop = false;
            }
            if (siltalauseet == null && !Testi) o.StartCoroutine(LataaSiltalauseet());
            if (nimiaanet == null && !nimiaLadataan && !Testi) o.StartCoroutine(LataaNimiaanet());
            silmukka.AlkaaPuhua += AlkaaPuhua;
            if (o.GetComponent<KyydinKameraEnnen>() == null) o.gameObject.AddComponent<KyydinKameraEnnen>();
            KyydinKameraEnnen.Ajo = PaivitaKamera;
            // TÄKYAVAUS (omistaja TF 144): kun UI näyttää täkyluettelon (TakyAvaus), opas ei pyydä mitään ennen pelaajan valintaa.
            if (kaupunkitila != null) { takyt = null; VaihdaKaupunki(kaupunkitila.Nimi, kaupunkitila.Lat, kaupunkitila.Lon); }
            else if (TakyAvaus && !Testi) { takyt = null; o.StartCoroutine(LataaTakyt()); }
            else silmukka.Aloita(Aloituskaupunki);
            PaivitaKamera();
            Vaihtui?.Invoke(this);
            o.Kirjaa($"opas: auki{(kaupunkiOdottaa ? " (aloitusvalikko, kartta valinnasta)" : "")}, data {kaupunki.Kaytossa}, {(Testi ? "TESTI (ei workeria)" : "worker " + PuluChat.Palvelin + Polku)}{(PolloTestitunnus.Asetettu ? ", testitunnus asetettu" : "")}");
        }

        // Natiivi-UI:n koukku (PuluChat.Sieppaa, haara natiivi-ui/pulu-sieppaus) heijastuksella, jotta tämä kääntyy myös ilman sitä.
        static Delegate vanhaSieppaus;
        static void KytkeChat(bool paalle)
        {
            // Natiivi-UI:n OpasValikko (hampurilainen): KohdeValittu(nimi, lat, lon) ja Nayta(bool), jos luokka on käännöksessä.
            var valikko = typeof(PuluChat).Assembly.GetType("Matkakirja.Natiivi.OpasValikko");
            var kv = valikko?.GetField("KohdeValittu", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            if (kv != null && kv.FieldType == typeof(Action<string, double, double>))
                kv.SetValue(null, paalle ? (Action<string, double, double>)((n, la, lo) => VaihdaKaupunki(n, la, lo)) : null);
            var nayta = valikko?.GetMethod("Nayta", new[] { typeof(bool) });
            if (nayta != null)
            {
                object olio = nayta.IsStatic ? null : valikko.GetMethod("Hae", Type.EmptyTypes)?.Invoke(null, null);
                if (nayta.IsStatic || olio != null) nayta.Invoke(olio, new object[] { paalle });
            }
            var kentta = typeof(PuluChat).GetField("Sieppaa", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            if (kentta == null || kentta.FieldType != typeof(Func<string, bool>)) return;
            // Mikrofoni ja kirjoitus suoraan oppaalle keskusteluna (omistaja 6.10. 11.57): vastaus ja toiminto /opas/kysy:stä.
            if (paalle) { vanhaSieppaus = kentta.GetValue(null) as Delegate; kentta.SetValue(null, (Func<string, bool>)Puhu); }
            else kentta.SetValue(null, vanhaSieppaus);
        }

        /// <summary>Aloitusvalikko: opas auki, paikkaa ei valittu, Cesium ei auki (UI piirtää läpinäkymättömän tumman taustan).</summary>
        public static bool Avausvalikko => Auki && Viimeisin.kaupunkiOdottaa;
        bool kaupunkiOdottaa;

        /// <summary>Ensimmäinen valinta: Cesium auki suoraan kohteeseen, ja paikka avautuu siirtoruudun kautta. true = auki.</summary>
        bool AvaaKaupunki(double lat, double lon, string nimi)
        {
            if (!kaupunkiOdottaa) return true;
            kaupunkiOdottaa = false;
            AloitusKeskusta = (lat, lon);
            double maa = MaaPisteessa(lat, lon);
            if (!kaupunki.Avaa(lat, lon, double.IsNaN(maa) ? 45 : maa))
            {
                Virhe = OpasTiedot.Nimi + ": " + kaupunki.Virhe;
                Vaihtui?.Invoke(this);
                return false;
            }
            o.StartCoroutine(PeitePois());
            silmukka.PakotaSiirto = true;
            o.Kirjaa($"opas: kartta auki valinnasta → {nimi} ({lat:F3}, {lon:F3})");
            return true;
        }

        public void Paivita()
        {
            if (silmukka == null || Virhe != null) return;
            PaivitaKamera();
        }

        void PaivitaKamera()
        {
            if (silmukka == null || Virhe != null || paivitetty == Time.frameCount) return;
            paivitetty = Time.frameCount;
            // Aloitusvalikko: ei kameraa eikä laattoja; silmukka etenee silti (toive tai kysymys ennen valintaa → ensimmäinen
            // lento on pakotettu siirto, joka avaa kartan SiirtoAlkaa-kutsussa suoraan kohteeseen).
            if (kaupunkiOdottaa) { silmukka.Paivita(Time.unscaledDeltaTime, MaaKorkeus, () => false); return; }
            // Kuumailmapallon korinäkymä (Päätoimittaja 7.10. 09.1x) koko oppaassa: omistaja TF 162 tuli linssivalikon kautta
            // (aloitusvalikko → Pariisi, ei kaupunkitilaa) eikä nähnyt koria eikä köysiä.
            kori.Kayta(nakymaAuki, kaupunki.Kamera);
            koriKatse.Paivita(kori.Nakyy, kaupunki.Kamera, kierto);
            // Kompassin merkki: lennolla kohti määränpäätä, pysähdyksellä kohti seuraavaa kohdetta (katsepisteestä).
            {
                var mk = silmukka.Vaihe == OpasVaihe.Lentaa ? silmukka.Nykyinen : silmukka.Seuraava; var asento = silmukka.Asento;
                PalloKori.SeuraavaSuunta = mk != null && !mk.Kysymys ? OpasSilmukka.Suunta(asento.Lat, asento.Lon, mk.Lat, mk.Lon) : (double?)null;
            }
            IlmoitaKierros();
            // Esilataus latauskuvan aikana: esityksen ensimmäinen kohde heti, kun kierroslista on haettu (omistaja 12.5x).
            // Linssireitti (omistaja 8.10. ~09.0x): sama esilataus siirtoruudun aikana (palkki kattaa myös 1. kohteen), ilman avausnäkymän kohdistusta.
            if (!Kaupunkitila && silmukka.Siirtymassa && silmukka.EsiKohde == null && esiKohdeKaupunki != Aloituskaupunki
                && (kierrosKohteet ?? kohteet) is List<OpasTaky> lk && lk.Count > 0 && kohteetKaupunki == Aloituskaupunki)
            {
                esiKohdeKaupunki = Aloituskaupunki;
                silmukka.EsiKohde = (lk[0].Nimi, lk[0].Lat, lk[0].Lon); o.Kirjaa($"opas: esilataus ensimmäinen kohde {lk[0].Nimi} (linssireitti, siirron aikana)");
                // Yksityiskohtaluettelo (JSON pääsäikeessä) ja kortin esilämmitys tumman siirtoruudun alla, ei laskeutumisen aikana
                // (video7 13,9 s: 83 ms:n ruutu, kun molemmat käynnistyivät vasta kertojan alkaessa).
                EsilataaYksityiskohdat(YksKaupunkiId());
                kortti ??= new YksityiskohtaKortti(o);
                if (kaupunki?.Kamera != null) kortti.Lammita(kaupunki.Kamera);
            }
            if (Kaupunkitila && silmukka.PyynnotSeis && silmukka.EsiKohde == null && (kierrosKohteet ?? kohteet) is List<OpasTaky> ek && ek.Count > 0 && kohteetKaupunki == Aloituskaupunki)
            {
                silmukka.EsiKohde = (ek[0].Nimi, ek[0].Lat, ek[0].Lon); o.Kirjaa($"opas: esilataus ensimmäinen kohde {ek[0].Nimi}");
                // Omistaja TF 162 (Rooma) / Päätoimittaja 22.4x: avausnäkymä katsoo ensimmäistä kohdetta (alakolmannes), 1,1 km / 50°.
                if (silmukka.KohdistaAvausKohteeseen(ek[0].Nimi, ek[0].Lat, ek[0].Lon)) o.Kirjaa($"opas: avausnäkymä kohti ensimmäistä kohdetta ({ek[0].Nimi}, {silmukka.Asento})");
            }
            if (esitysAlkaa && Kaupunkitila && !silmukka.Siirtymassa && !silmukka.AvausTauolla && kohteet != null && kohteet.Count > 0 && kohteetKaupunki == Aloituskaupunki)
            { esitysAlkaa = false; o.StartCoroutine(EsitysAvaus(KaupunkitilaId)); }
            // Vasta kun vastaus on kuultu: ei odottavaa vastausta (Seuraava = Esita(vastaus) ennen kuin se alkaa) eikä kysymyksen
            // odotusta (Alkoi vasta vastauksen puheesta). TF 166 (omistaja 8.10. 18.0x "ei ota kysymyksiä vastaan, jatkaa seuraavaan"):
            // vastaus tuli 4 s:ssa, kun Vaihe oli jo Odottaa yli JatkoViiveS → kierros jatkui samassa ruudussa ja vastaus jäi soimatta.
            if (jatkoVastauksenJalkeen && OpasSilmukka.JatkoVastauksenJalkeen(silmukka.KierrosKeskeytetty, silmukka.Vaihe, silmukka.VaiheAika, JatkoViiveS,
                    puhuu || (silta != null && silta.isPlaying), silmukka.Seuraava != null, kysyOdotus.Kaynnissa))
            { jatkoVastauksenJalkeen = false; o.Kirjaa("opas: kierros jatkuu vastauksen jälkeen"); JatkaKierrosta(); }
            OpasSilmukka.PalloLento = kori.Nakyy;
            // Laattaodotus lähdössä (hidas verkko 11–13 s ilman kertojaa, Päätoimittaja 8.10. ilta: hyväksytään, kun pallon omat äänet
            // soivat): korin narina ja köysi kerran odotuksen alussa; tuuli soi äänimaisemassa korkeuden mukaan (TuuliMaa ≥ 0,08).
            if (OpasSilmukka.PalloLento && silmukka.LaattaOdotusS > 0.5) { if (!odotusAaniSoi) { odotusAaniSoi = true; kori.OdotusAani(); } }
            else if (silmukka.LaattaOdotusS <= 0) odotusAaniSoi = false;
            // PCM: loppu = kaikki ladattu ja soitettu; varmistus: klippi pysähtyi (ei saa jäädä odottamaan ikuisesti, toisto 16.4x).
            bool pcmPysahtyi = pcmNyt != null && puhe != null && !puhe.isPlaying && Time.unscaledTime - puheAlkoi > 1f;
            bool loppui = !tauolla && (pcmNyt != null ? (puhe != null && pcmNyt.SoitettuLoppuun(puhe.timeSamples)) || pcmPysahtyi : Time.unscaledTime >= puheLoppuu && (puhe == null || !puhe.isPlaying));
            if (puhuu && loppui)
            {
                if (pcmNyt != null) { if (pcmNyt.Katkoja > 0) o.Kirjaa($"opas: PCM-virrassa {pcmNyt.Katkoja} katkoa"); pcmNyt = null; if (puhe != null) puhe.Stop(); }
                puhuu = false; y.Repliikki(false); silmukka.AaniLoppui();
            }
            kaupunki.PidaMaski();
            kaupunki.PaivitaAvauslataus();   // ion-logo avauslatauksen ajan (Natiivi-UI KrediititTiivis)
            // OSM-tekijätieto aina oppaan ajan: worker käyttää Nominatimia koordinaatteihin ja reittiviivoihin (ODbL, juna 146).
            KrediititTiivis.OsmNakyvissa = true;
            KrediititTiivis.Paivita(true);   // kapealla ruudulla logot + "Data sources" (Googlen policy)
            if (KiinteaKamera is Kuvakulma kk)   // kuvaparit samasta kulmasta (testi)
            {
                y.Kuvaa(kk); kaupunki.AsetaEsikamera(kk);
                if (!kiinteaKirjattu) { kiinteaKirjattu = true; kiinteaAlku = Time.realtimeSinceStartup; kiinteaLaski = false; o.Kirjaa($"opas: kiinteä kamera käytössä {kk}"); }
                // Latausaika kiinnityksestä 99 %:iin (Päätoimittaja: kolmikon latausajat); vasta kun aste on ensin laskenut tai 3 s.
                if (kiinteaAlku > 0)
                {
                    if (kaupunki.Latausaste < CesiumKaupunki.ValmisProsentti) kiinteaLaski = true;
                    else if ((kiinteaLaski || Time.realtimeSinceStartup - kiinteaAlku > 3f) && !kaupunki.KarkeaKaytossa)
                    {
                        o.Kirjaa($"opas: kiinteä kamera: laatat 99 % {Time.realtimeSinceStartup - kiinteaAlku:F1} s:ssa (kerroin {CesiumKaupunki.SseKerroin:F2})"); kiinteaAlku = -1f;
                        // Kulma ei toistunut istunnosta toiseen (6.10. kolmikko 1,71/1,3/1,0): kameran todellinen asento vertailuun.
                        var kam = kierto != null ? kierto.GetComponent<Camera>() : null;
                        if (kam != null) o.Kirjaa($"opas: kiinteä kamera: fov {kam.fieldOfView:F2}, aspect {kam.aspect:F3}, paikka {kam.transform.position}, kulmat {kam.transform.eulerAngles}, korkeuskerroin {Matkakirja.KorkeusKerroin.Arvo:F3}, origo {kaupunki.OrigoTeksti}");
                    }
                }
                if (kaupunki.KarkeaKaytossa && kaupunki.Latausaste >= CesiumKaupunki.ValmisProsentti) kaupunki.Tarkenna();
                return;
            }
            kiinteaKirjattu = false;
            if (Pysaytetty) { y.Kuvaa(silmukka.Asento); return; }
            var ennen = silmukka.Vaihe;
            LueTapit();
            bool siirtyy = silmukka.Siirtymassa;
            if (siirtyy != siirtymaEdellinen) { siirtymaEdellinen = siirtyy; if (siirtyy) SiirtymaAlkaa?.Invoke(silmukka.SiirtoNimi); else SiirtymaValmis?.Invoke(); }
            if (silmukka.Aloitettu) PaivitaKohteet();
            if (!tauolla && pelaajanToimi > 0 && !puhuu && Time.unscaledTime - pelaajanToimi > OdotusLauseS) { pelaajanToimi = -1f; Silta(silmukka.Vaihe == OpasVaihe.Lentaa ? OpasSiltalauseet.Odotus : OpasSiltalauseet.OdotusPaikalla, false); }
            if (!tauolla)
                switch (kysyOdotus.Paivita(Time.unscaledDeltaTime))
                {
                    case KysyOdotus.Tapahtuma.Odotus5: Silta(OpasSiltalauseet.Odotus5, false); break;
                    case KysyOdotus.Tapahtuma.Odotus12: Silta(OpasSiltalauseet.Odotus12, false); break;
                    case KysyOdotus.Tapahtuma.Virhe: o.Kirjaa("opas: kysymykseen ei vastausta 25 s:ssa"); Silta(OpasSiltalauseet.Virhe, false); break;
                }
            silmukka.Paivita(Time.unscaledDeltaTime, MaaKorkeus, () => kaupunki.Valmis);
            // Kaksivaiheinen tarkkuus: pysähdyksellä (ei lento eikä siirto) ja laatat ≥ 99 % → tarkentuminen tavoitekertoimeen.
            // Vapaan tilan liike (LS2 6.10. 19.4x, Eiffel 40 m: venyneet laatat liikkeessä): tapit käytössä → karkea valinta kuten
            // saapuessa; paikallaan ja laatat ≥ 99 % → tarkentuminen.
            var vt = silmukka.VapaaTapit;
            bool vapaaLiikkuu = silmukka.VapaaTila && (Math.Abs(vt.vx) + Math.Abs(vt.vy) + Math.Abs(vt.ox) + Math.Abs(vt.oy)) > 0.05;
            if (vapaaLiikkuu) kaupunki.Karkeaksi();
            // Omistaja TF 162 (iPad, Notre-Dame möykkynä): laitteella laatat eivät kierron aikana ehkä koskaan saavuta 99 %:a, jolloin
            // karkea valinta jäi päälle koko kerronnan ajaksi → tarkentuu viimeistään TarkennaViimeistaanS pysähdyksen alusta.
            else if (kaupunki.KarkeaKaytossa && !silmukka.Siirtymassa && silmukka.Vaihe != OpasVaihe.Lentaa
                && (kaupunki.Latausaste >= CesiumKaupunki.ValmisProsentti || silmukka.VaiheAika > TarkennaViimeistaanS))
            {
                if (kaupunki.Latausaste < CesiumKaupunki.ValmisProsentti) o.Kirjaa($"opas: tarkennus aikarajalla {silmukka.VaiheAika:F1} s, laatat {kaupunki.Latausaste:F0} %");
                kaupunki.Tarkenna();
            }
            if (silmukka.Vaihe != ennen) o.Kirjaa($"opas: {ennen} → {silmukka.Vaihe} {(silmukka.Nykyinen?.Nimi ?? "")}, laatat {kaupunki.Latausaste:F0} %"
                + (silmukka.Vaihe == OpasVaihe.Lentaa && silmukka.LahtoOdottiS > 0 ? $", lähtö odotti laattoja {silmukka.LahtoOdottiS:F1} s" : ""));
            if (silmukka.Vaihe != ennen && silmukka.Vaihe == OpasVaihe.Lentaa) { OpasKorostusKuva.Piilota(); KohdeKorostus.Piilota(); }
            y.Kuvaa(silmukka.Asento);
            PaivitaKameraTila();
            // Yövalot v4: nykyinen kohde saa yöllä lämpimän valonheiton (KaupunkiYovalot; Päätoimittaja 22.3x "Eiffel kultaisena").
            KaupunkiYovalot.KaupunkiId = NykyinenKaupunkiId;
            var yk = silmukka.Nykyinen; var kh = silmukka.NykyinenKehys;
            // Kohde vasta korostuksen syttyessä (video4 14,3–16,2 s: varjostin muutti kohdealuetta nollavoimallakin lennon alussa).
            KaupunkiYovalot.Kohde = yk != null && kh != null && !yk.Kysymys && silmukka.KorostusOsuus > 0.001 && !KohdeKorostus.Kaytossa ? (yk.Lat, yk.Lon, kh.MaaM, yk.KokoM) : ((double, double, double, double)?)null;
            KohdeKorostus.Paivita(kaupunki.Georef);
            // Yövalot v6 (kehityskaupungit): kierroksen muut kohteet valaistuina, maa omasta korkeusmallista (päivitys kerran sekunnissa).
            if (Time.unscaledTime - maamerkitAika > 1f)
            {
                maamerkitAika = Time.unscaledTime;
                KaupunkiYovalot.Maamerkit.Clear();
                string kid = NykyinenKaupunkiId;
                if (kid != null && Kehityskaupungit.On(kid) && (kierrosKohteet ?? kohteet) is List<OpasTaky> mk)
                    foreach (var t in mk)
                    {
                        if (yk != null && Math.Abs(t.Lat - yk.Lat) < 1e-5 && Math.Abs(t.Lon - yk.Lon) < 1e-5) continue;   // nykyinen kohde: oma valo
                        double h = MaaPisteessa(t.Lat, t.Lon);   // kehyksen maa (kehän näytteistä), jos kohteessa on käyty
                        if (double.IsNaN(h)) h = OmaMaaKehalla(t.Lat, t.Lon);
                        if (!double.IsNaN(h)) KaupunkiYovalot.Maamerkit.Add((t.Lat, t.Lon, h, 60));
                    }
            }
            // Kohdevalo ja rengas häivyttyvät silmukan korostusosuuden mukaan (sammuvat ennen lähtöä, syttyvät saapumisesta).
            KaupunkiYovalot.KohdeOsuus = OpasKorostusKuva.Osuus = (float)silmukka.KorostusOsuus;
            // A3 lähitarkkuus: pysähdyksellä (ei lento eikä siirto) kohteen ympärille tarkemmat laatat, kun valinta on tarkentunut.
            kaupunki.AsetaLahikamera(yk != null && kh != null && !yk.Kysymys && !silmukka.Siirtymassa && silmukka.Vaihe != OpasVaihe.Lentaa && kaupunki.Georef != null
                ? KohdeMaailmassa(yk.Lat, yk.Lon, kh.MaaM + Math.Max(10, yk.KorkeusM * 0.4)) : (Vector3?)null);
            LatausKuvaPaivita();
            Luotaa();
            KameraKuvattu?.Invoke(kierto != null ? kierto.GetComponent<Camera>() : null, silmukka);
            // Esilataus: lennon aikana laskeutumiskehys, muuten esihaetun kohteen kehys (OpasKuvaus, sama kuin lento).
            var esi = silmukka.Esilataus(MaaKorkeus);
            // Siirtoruudun aikana 1. kohde puolikkaalla tarkkuudella: yleiskuva saa kaistan, tarkka kohde latautuu laskeutumisessa.
            if (esi.HasValue) kaupunki.AsetaEsikamera(esi.Value, silmukka.Siirtymassa ? CesiumKaupunki.ReittiSkaala : 1f);
            else kaupunki.EsikameraPois();   // ei esilattavaa: piilokamera ei pidä vanhoja laattoja elossa
            // Reitin välinäkymät (Päätoimittaja 8.10. 07.4x: sumea kortteli lennon alussa); 0 näkymää → reittikamerat pois.
            kaupunki.AsetaReittikamerat(reittiNakymat, silmukka.ReittiEsilataus(MaaKorkeus, reittiNakymat));
            EsilataaKortit();
            Telemetria(ennen);
            SaaLive();
            SaaTehosteet();
            PaivitaAanitasot();
            kaupunki.TarkistaReiat();   // Googlen 404-tiilet → aluskerros (Varsova)
            // Lähdön valmistelu lokiin kerran sekunnissa (laattaodotuksen säätö).
            if (silmukka.LahtoValmisteilla && Time.realtimeSinceStartup - lahtoLokiAika >= 1f)
            {
                lahtoLokiAika = Time.realtimeSinceStartup;
                o.Kirjaa($"opas: lähtö valmisteilla {silmukka.Seuraava?.Nimi}, laatat {kaupunki.Latausaste:F0} %, korostus {silmukka.KorostusOsuus:F2}, reittikameroita {silmukka.ReittiEsilataus(MaaKorkeus, reittiNakymat)}");
            }
        }

        readonly Kuvakulma[] reittiNakymat = new Kuvakulma[OpasSilmukka.ReittiNaytteet.Length];
        float maamerkitAika = -9f;
        double MaaKorkeus(OpasKohde k) => maaKorkeudet.TryGetValue(Avain(k), out var h) ? h : MaaPisteessa(k.Lat, k.Lon);
        double MaaPisteessa(double lat, double lon) => pisteKorkeudet.TryGetValue(PisteAvain(lat, lon), out var h) ? h : double.NaN;
        static string PisteAvain(double lat, double lon) => lat.ToString("F4") + "," + lon.ToString("F4");
        readonly Dictionary<string, double> pisteKorkeudet = new Dictionary<string, double>(StringComparer.Ordinal);
        readonly HashSet<string> pisteNaytteet = new HashSet<string>(StringComparer.Ordinal);
        (double lat, double lon, double? h) viimeMaa;
        static string Avain(OpasKohde k) => k.Id ?? (k.Lat.ToString("F5") + "," + k.Lon.ToString("F5"));

        // ── Pyynnöt workerille (tai testilista) ──────────────────────────────
        void Pyyda(int n, string toive)
        {
            if (Testi) { o.StartCoroutine(TestiVastaus(n)); return; }
            o.StartCoroutine(Hae(n, toive));
        }

        // ---- KYSY, LIIKU, KAUPUNKIKIERROS, KESKUSTELU (omistaja 6.10. 11.57; Pelikoodarin endpointit, Natiivi-UI:n nimet) ----
        /// <summary>Kysy-lista: vastauksen jatkokysymykset ensin, sitten paikan kysymykset; null = latautuu.</summary>
        public static IReadOnlyList<string> Kysymykset => Viimeisin?.kysymykset;

        // ---- PARIISI-KOKEILU (omistaja 7.10. 10.1x): metrokartta ja Kysy aina näkyvissä (Natiivi-UI) ----
        /// <summary>Kierroksen kohteet (nimi, lat, lon) järjestyksessä; tyhjä ilman kierrosta.</summary>
        public static IReadOnlyList<(string nimi, double lat, double lon)> KierrosKohteet =>
            Auki ? Viimeisin.silmukka.KierrosJono : (IReadOnlyList<(string, double, double)>)Array.Empty<(string, double, double)>();
        /// <summary>Nykyisen kierroskohteen indeksi KierrosKohteet-listassa; −1 = ei kierrosta.</summary>
        public static int KierrosIndeksi => Auki ? Viimeisin.silmukka.KierrosNykyinen : -1;
        /// <summary>Kohteet, indeksi tai kohteen valmiit kysymykset (KysyKysymykset) vaihtuivat.</summary>
        public static event Action KierrosVaihtui;
        /// <summary>
        /// Pallo lähtee kierroksen seuraavaan kohteeseen (omistaja 7.10. 12.3x: metrokartta suurentaa seuraavan ja pienentää nykyisen
        /// ~1 s:ssa): (nykyinen indeksi, seuraava indeksi, lennon kesto s) KierrosKohteet-listassa; nykyinen −1 = ei edellistä.
        /// </summary>
        public static event Action<int, int, float> KierrosLahtee;
        /// <summary>Nykyisen kohteen valmiit kysymykset (enintään 5; /opas/kysymykset tai pysähdyksen kysymykset).</summary>
        /// <summary>Korin vasemman köyden ruutuala normalisoituna (0–1, y ylhäältä); tyhjä, kun köyttä ei näy (PalloKori).</summary>
        public static Rect KoriVasenKoysiNorm => PalloKori.VasenKoysiNorm;
        public static IReadOnlyList<string> KysyKysymykset
        {
            get
            {
                var k = Viimeisin?.kysymykset ?? Array.Empty<string>();
                var r = new List<string>(6);
                // Yksi esitys (omistaja 10.3x): kierroksella ensimmäinen vaihtoehto "Kerro lisää" (pidempi pysähdysteksti).
                if (Kaupunkitila && Auki && (Viimeisin.silmukka.KierrosKaynnissa || Viimeisin.silmukka.KierrosKeskeytetty)) r.Add(KerroLisaaTeksti);
                for (int i = 0; i < k.Length && i < 5; i++) r.Add(k[i]);
                return r;
            }
        }
        public const string KerroLisaaTeksti = "Kerro lisää";
        /// <summary>Kaupunkitilan yleiskuvan etäisyys (m; oletus 5 000): lyhyempi siirtymä ensimmäiseen kohteeseen (omistaja 12.5x).</summary>
        // Päätoimittaja 22.4x (omistaja TF 162, Rooma: "kohde on liian kaukana"): puoliväli 2,2 km:n pystykuvan ja lähikuvan välillä.
        public const double KaupunkitilaAvausM = 1100, KaupunkitilaAvausKallistus = 50;

        // ---- ESITYKSEN AVAUS JA OPASTUS (omistaja 7.10. 10.1x / 12.4x) ----
        // Kaupunkitilan esitys: siirtymä → kaupungin avaus (opas/esittely-v1/<id>.json "avaus") → opastuslause VAIN pelaajan
        // ensimmäisellä kuumailmapallokyydillä (opas/yleiset-v1.json "opastus"[0]; lippu PlayerPrefs, pysyvä) → kaupunkikierros.
        // Kamera kiertää yleiskuvaa avauksen ajan; workerin pyynnöt seis (OpasSilmukka.PyynnotSeis), kunnes kierros alkaa.
        public const string EsittelyJuuri = "https://media.matkakirja.app/opas/";
        public const string OpastusKuultuAvain = "matkakirja-pallo-opastus-kuultu";
        /// <summary>Ensimmäinen kuumailmapallokyyty tehty (opastus kuultu). Testi `opas opastus nollaa`.</summary>
        public static bool OpastusKuultu { get => PlayerPrefs.GetInt(OpastusKuultuAvain, 0) == 1; set { PlayerPrefs.SetInt(OpastusKuultuAvain, value ? 1 : 0); PlayerPrefs.Save(); } }

        // Uudet avaukset (Pelikoodari #4141): ämpäri on muuttumaton, joten /opas/aineistot "esittely_polut" {id: polku opas/:n
        // alta (esim. "opas/esittely-v1b/praha.json")} kertoo uuden polun; muuten opas/esittely-v1/<id>.json.
        static Dictionary<string, string> esittelyPolut = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        /// <summary>Nykyisellä kaupungilla on valmis esittely (kierroksen järjestys valmiina, 37 sallittua kaupunkia).</summary>
        static bool ValmisEsittely => YksKaupunkiId() is string id && esittelyPolut.ContainsKey(id);
        static void LueEsittelyPolut(object json)
        {
            if (json is Dictionary<string, object> j && j.TryGetValue("esittely_polut", out var ep) && ep is Dictionary<string, object> d)
            {
                var uusi = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
                foreach (var kv in d) if (kv.Value is string pol && !string.IsNullOrWhiteSpace(pol)) uusi[kv.Key] = pol.Trim();
                esittelyPolut = uusi;
            }
        }
        /// <summary>Kaupungin esittely-JSONin osoite (esittely_polut ensin, muuten esittely-v1/&lt;id&gt;.json).</summary>
        public static string EsittelyOsoite(string kaupunkiId)
        {
            if (esittelyPolut.TryGetValue(kaupunkiId, out var pol))
                return "https://media.matkakirja.app/" + (pol.StartsWith("opas/") ? pol : "opas/" + pol.TrimStart('/'));
            return EsittelyJuuri + "esittely-v1/" + UnityWebRequest.EscapeURL(kaupunkiId) + ".json";
        }

        // ---- YKSITYISKOHTAKUVAT (omistaja 7.10. 10.1x, Päätoimittaja 16.5x, juna 163) ----
        // Kerronnan aikana kuva ankkurisanan kohdalla (OpasYksityiskohdat, YksityiskohtaKortti). Paketin polku /opas/aineistot
        // "yksityiskohdat_polut" {kaupunki-id: polku}; sana-ajat kohteen "aani_ajat" (kerro lisää: kerro_lisaa_aani_ajat) tai avauksen
        // .ajat.json; ilman aikoja ankkurin osuus tekstistä × klipin kesto. Ei kuvaa, kun valikko tai chat on auki.
        static Dictionary<string, string> yksPolut = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        static string yksKaupunki;
        YksityiskohtaKortti kortti;
        Coroutine yksAjo;

        static string YksKaupunkiId() => KaupunkitilaId ?? OpasSallitut.Nimella(sallitut, Aloituskaupunki)?.Id;

        // Luettelot välimuistissa polun mukaan; esilataus jo kaupunkitilan avautuessa (iPad-simu 21.32: avauksen 3,7 s:n kuva jäi
        // pois, kun luettelo latautui vasta esityksen alussa).
        static readonly Dictionary<string, List<OpasYksityiskohdat.Kuva>> yksValimuisti = new Dictionary<string, List<OpasYksityiskohdat.Kuva>>();
        static readonly HashSet<string> yksLataukset = new HashSet<string>();
        static string yksPolku;

        /// <summary>
        /// Nykyisen kaupungin yksityiskohtakuvien lähteet (omistaja 7.10. 22.5x: tekijät eivät näy kortissa vaan Kuumailmapallon
        /// ☰-valikon "Lähteet ›" -näkymässä, Natiivi-UI): Kohde = kohteen näkyvä nimi (avaus → kaupunki), tyhjä, jos ei ladattu.
        /// </summary>
        public static IReadOnlyList<(string Kohde, string Tekija, string Lisenssi, bool Havainnekuva)> KuvaLahteet
        {
            get
            {
                var l = new List<(string, string, string, bool)>();
                var kuvat = yksPolku != null && yksValimuisti.TryGetValue(yksPolku, out var kv) ? kv : null;
                var t = Viimeisin?.kierrosKohteet ?? Viimeisin?.kohteet;
                foreach (var k in kuvat ?? new List<OpasYksityiskohdat.Kuva>())
                {
                    string nimi = string.Equals(k.KohdeId, "avaus", StringComparison.OrdinalIgnoreCase) ? Aloituskaupunki
                        : t?.Find(x => string.Equals(x.Id, k.KohdeId, StringComparison.OrdinalIgnoreCase))?.Nimi;
                    l.Add((string.IsNullOrWhiteSpace(nimi) ? k.KohdeId : nimi, k.Tekija?.Trim() ?? "", k.Lisenssi?.Trim() ?? "", k.Havainnekuva));
                }
                // Historiaosioiden kuvat (kohde = osion otsikko).
                var v = Viimeisin;
                if (v?.historiaKuvat != null)
                    foreach (var k in v.historiaKuvat)
                        l.Add((v.historiaOsiot.Find(x => x.Tunnus == k.KohdeId)?.Otsikko ?? k.KohdeId, k.Tekija?.Trim() ?? "", k.Lisenssi?.Trim() ?? "", k.Havainnekuva));
                return l;
            }
        }

        /// <summary>Kaupungin luettelo välimuistiin taustalla (ei mitään, jos polkua ei ole, se on jo ladattu tai latautumassa).</summary>
        static void EsilataaYksityiskohdat(string id)
        {
            if (id == null || Testi || !yksPolut.TryGetValue(id, out var polku)) return;
            if (yksValimuisti.ContainsKey(polku) || !yksLataukset.Add(polku)) return;
            var lo = LinssiOhjain.Instanssi;
            if (lo == null) { yksLataukset.Remove(polku); return; }
            lo.StartCoroutine(HaeYksityiskohdat(id, polku));
        }

        static IEnumerator HaeYksityiskohdat(string id, string polku)
        {
            using (var r = UnityWebRequest.Get("https://media.matkakirja.app/" + polku))
            {
                r.timeout = 10;
                yield return r.SendWebRequest();
                var l = r.result == UnityWebRequest.Result.Success ? OpasYksityiskohdat.Lue(MiniJson.Jasenna(r.downloadHandler.text)) : null;
                if (l != null) yksValimuisti[polku] = l;
                KirjaaS($"opas: yksityiskohtakuvat {id}: {(l != null ? l.Count + " kuvaa" : "ei latautunut (" + r.responseCode + ")")} [{polku}]");
            }
            yksLataukset.Remove(polku);
        }

        /// <summary>Nykyisen kaupungin luettelo (mikä tahansa esittelykaupunki, jolla on yksityiskohdat_polut-rivi).</summary>
        void VarmistaYksityiskohdat()
        {
            string id = YksKaupunkiId();
            yksKaupunki = id;
            yksPolku = id != null && yksPolut.TryGetValue(id, out var p) ? p : null;
            EsilataaYksityiskohdat(id);
        }

        /// <summary>Seuraavan kohteen (lennossa nykyisen) yksityiskohtakuvat tekstuureiksi valmiiksi (YksityiskohtaKortti.Esilataa).</summary>
        string esiKortitId, esiKohdeKaupunki;

        // LIVE-SÄÄ JA -AIKA (omistaja 8.10. 09.1x, Saatila; Pelikoodarin GET /opas/saa PR #4194; juna 166): LiveAika kohteen auringosta
        // 30 s välein, sää vain LIVEn ollessa päällä kaupungin vaihtuessa ja enintään 15 min välein; 502 → arvo pysyy.
        /// <summary>Viimeisin onnistunut säähaku (tehosteiden hienosäätö); null ennen ensimmäistä.</summary>
        public static PalloSaaTiedot SaaTiedot { get; private set; }
        float saaHaettu = -1e9f, liveAikaTarkistettu = -1e9f; string saaKaupunki; bool saaHaussa;
        void SaaLive()
        {
            if (!Saatila.Live || silmukka == null) return;
            var a = silmukka.Asento; float nyt = Time.realtimeSinceStartup;
            if (nyt - liveAikaTarkistettu >= 30f) { liveAikaTarkistettu = nyt; Saatila.LiveAika = PalloSaaTiedot.AikaAuringosta(DateTime.UtcNow, a.Lat, a.Lon); }
            string kaup = NykyinenKaupunkiId ?? Aloituskaupunki;
            if (saaHaussa || Testi || !PalloSaaTiedot.Hae(true, kaup, saaKaupunki, nyt - saaHaettu)) return;
            saaHaussa = true; saaHaettu = nyt; saaKaupunki = kaup;
            o.StartCoroutine(HaeSaa(a.Lat, a.Lon, kaup));
        }

        // SÄÄTEHOSTEET (Päätoimittaja 8.10.: kevyet ensin, A/B COZYllä myöhemmin; juna 166): vain pallonäkymässä; Saatila.Saa →
        // PalloSaaVaikutus → KaupunkiKuva (sävy ja sumu) ja PalloSaaKerros (sade, lumi, salama); ukkosen kumahdus kirjastosta.
        readonly PalloSaaVaikutus saaVaikutus = new PalloSaaVaikutus();
        PalloSaaKerros saaKerros;
        // Sadekuurot itsestään (omistaja TF 168, Päätoimittaja juna 170; Ydin PalloKuurot): kehityskaupungeissa selkeällä tai pilvisellä
        // säällä harvoin kuuro, osa ukkoskuuroja (alussa kaukainen jyrinä, Pelikoodarin elava-kaupunki-v1); KuuroVoima Linssiseppä 2:lle.
        readonly PalloKuurot kuurot = new PalloKuurot(Environment.TickCount);
        /// <summary>Itsestään tulevan kuuron voima 0–1 (Linssiseppä 2:n KaupunkiKuuro.Voima: pilvet ja märät kadut).</summary>
        public static double KuuroVoima => Viimeisin?.kuurot.Voima ?? 0;
        AudioClip jyrinaKlippi; bool jyrinaLadataan;
        IEnumerator SoitaJyrina()
        {
            if (jyrinaKlippi == null && !jyrinaLadataan)
            {
                jyrinaLadataan = true;
                using var r = UnityWebRequestMultimedia.GetAudioClip("https://media.matkakirja.app/aanet/elava-kaupunki-v1/ukkonen-kaukainen.mp3", AudioType.MPEG);
                r.timeout = 20;
                yield return r.SendWebRequest();
                if (r.result == UnityWebRequest.Result.Success) jyrinaKlippi = DownloadHandlerAudioClip.GetContent(r);
                jyrinaLadataan = false;
            }
            if (jyrinaKlippi == null || !Asetukset.Paalla(Kytkin.Aanimaisema)) yield break;
            if (ukkosLahde == null) { ukkosLahde = o.gameObject.AddComponent<AudioSource>(); ukkosLahde.playOnAwake = false; ukkosLahde.spatialBlend = 0; }
            ukkosLahde.volume = UkkosenTavoite();
            ukkosLahde.PlayOneShot(jyrinaKlippi, 0.8f);
            o.Kirjaa("opas: ukkoskuuro alkaa (kaukainen jyrinä)");
        }

        void SaaTehosteet()
        {
            float dt = Time.unscaledDeltaTime;
            bool kuuroSallittu = nakymaAuki && OpasSilmukka.PalloLento && Kehityskaupungit.On(NykyinenKaupunkiId) && (Saatila.Saa == PalloSaa.Selkea || Saatila.Saa == PalloSaa.Pilvinen);
            var kuuro = kuurot.Paivita(tauolla ? 0 : dt, kuuroSallittu);
            if (kuurot.UkkonenAlkoi && !Testi) o.StartCoroutine(SoitaJyrina());
            saaVaikutus.Paivita(tauolla ? 0 : dt, nakymaAuki ? Saatila.Saa : PalloSaa.Pois, Saatila.Live ? SaaTiedot : null, kuuro);
            KaupunkiKuva.Saa = saaVaikutus.Nyt; KaupunkiKuva.Salama = saaVaikutus.Salama;
            if (saaKerros == null && saaVaikutus.Nyt.Tyhja) return;
            saaKerros ??= new PalloSaaKerros();
            saaKerros.Aseta(kaupunki.Kamera, saaVaikutus.Nyt, saaVaikutus.Salama, SaaTiedot?.TuuliMs ?? 4, Time.unscaledTime);
            if (saaVaikutus.Nyt.Ukkonen > 0.01 && ukkosKlipit == null) { ukkosKlipit = new List<AudioClip>(); o.StartCoroutine(LataaUkkonen()); }
            if (saaVaikutus.Kumahdus) SoitaUkkonen();
        }

        /// <summary>Ukkosen kumahdukset kirjastosta (Pelikoodari: CC0, aanet/tehosteet/ukkonen/); puuttuva tiedosto ohitetaan.</summary>
        public static readonly string[] UkkonenOsoitteet = {
            "https://media.matkakirja.app/aanet/tehosteet/ukkonen/ukkonen-01.mp3", "https://media.matkakirja.app/aanet/tehosteet/ukkonen/ukkonen-02.mp3",
            "https://media.matkakirja.app/aanet/tehosteet/ukkonen/ukkonen-03.mp3", "https://media.matkakirja.app/aanet/tehosteet/ukkonen/ukkonen-04.mp3" };
        List<AudioClip> ukkosKlipit; AudioSource ukkosLahde;
        IEnumerator LataaUkkonen()
        {
            foreach (var url in UkkonenOsoitteet)
                using (var r = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG))
                {
                    r.timeout = 15;
                    yield return r.SendWebRequest();
                    if (r.result == UnityWebRequest.Result.Success && DownloadHandlerAudioClip.GetContent(r) is AudioClip c && ukkosKlipit != null) ukkosKlipit.Add(c);
                }
            o.Kirjaa($"opas: ukkosen kumahduksia {ukkosKlipit?.Count ?? 0}/{UkkonenOsoitteet.Length}");
        }
        /// <summary>Kertojan ja siltalauseen taso mikserin Lukija-säätimestä (OpasAanitasot; ennen 8.10. aina 1,0).</summary>
        static float KertojanTaso => (float)Matkakirja.Linssit.Aanet.OpasAanitasot.Kertoja(Asetukset.Taso(Voima.Lukija));
        /// <summary>Ukkonen: −3 dB (omistaja TF 166), mikserin Sää, väistö kertojan alla (PalloKaupungitTestit.Aanitasot: ilman väistöä
        /// kumahdus oli hetkellisesti kertojan tasolla).</summary>
        float UkkosenTavoite() => (float)Matkakirja.Linssit.Aanet.OpasAanitasot.Ukkonen(PalloKori.TehosteKerroin, Asetukset.Taso(Voima.Saa), OpasAaniSoi);
        /// <summary>Joka ruutu: mikserin muutokset kuuluvat heti, ukkosen väistö liukuu.</summary>
        void PaivitaAanitasot()
        {
            {
                var g = kaupunki.Georef; var kam = kaupunki.Kamera;
                float mt = g != null ? Mathf.Max(1e-6f, g.transform.lossyScale.x) : 1f;
                double kork = g != null && kam != null ? (kam.transform.position.y - g.transform.position.y) / mt : 300;
                palloAanet.Paivita(o, nakymaAuki ? NykyinenKaupunkiId : null, kork);
            }
            if (puhe != null) puhe.volume = KertojanTaso;
            if (silta != null) silta.volume = KertojanTaso;
            if (ukkosLahde != null) ukkosLahde.volume = (float)Matkakirja.Linssit.Aanet.OpasAanitasot.Liuku(ukkosLahde.volume, UkkosenTavoite(), Time.unscaledDeltaTime);
            if (kelloLahde != null && kelloLahde.isPlaying) kelloLahde.volume = (float)Matkakirja.Linssit.Aanet.OpasAanitasot.Liuku(kelloLahde.volume, KellojenTavoite(), Time.unscaledDeltaTime);
        }

        // ---- KIRKONKELLOT (Päätoimittaja 9.10., juna 170; Pelikoodari aanet/sonniss-aanet-v2/kirkonkellot-kyla.mp3, Sonniss, 30 s
        // silmukka, −23 LUFS): kun pallo pysähtyy kehityskaupungin kirkkokohteeseen, kellot soivat kerran kierroksella kaupunkia kohti
        // KelloS sekuntia pehmeästi häivyttäen, etäisyyden mukaan hiljaa ja kertojan alla väistäen (OpasAanitasot.Maisema). ----
        public const string KelloOsoite = "https://media.matkakirja.app/aanet/sonniss-aanet-v2/kirkonkellot-kyla.mp3";
        public const float KelloS = 24f, KelloHaivytysS = 3f, KelloPerus = 0.55f, KelloVertailuM = 300f;
        AudioSource kelloLahde; AudioClip kelloKlippi; readonly HashSet<string> kellotSoineet = new HashSet<string>(); float kelloAlku, kelloEtaisyys = 300f;

        static bool OnKirkko(OpasKohde k) => k != null && (string.Equals(k.Luokka, "kirkko", StringComparison.OrdinalIgnoreCase)
            || (k.Nimi ?? "").IndexOf("kirkko", StringComparison.OrdinalIgnoreCase) >= 0 || (k.Nimi ?? "").IndexOf("katedraali", StringComparison.OrdinalIgnoreCase) >= 0);

        float KellojenTavoite()
        {
            float t = Time.unscaledTime - kelloAlku;
            float haivytys = Mathf.Clamp01(t / KelloHaivytysS) * Mathf.Clamp01((KelloS - t) / KelloHaivytysS);
            float etaisyys = Mathf.Clamp(KelloVertailuM / Mathf.Max(1f, kelloEtaisyys), 0.25f, 1f);
            return (float)Matkakirja.Linssit.Aanet.OpasAanitasot.Maisema(KelloPerus * etaisyys * haivytys, OpasAaniSoi) * (Asetukset.Paalla(Kytkin.Aanimaisema) ? 1f : 0f);
        }

        IEnumerator SoitaKellot(OpasKohde k)
        {
            if (kelloKlippi == null)
            {
                using var p = UnityWebRequestMultimedia.GetAudioClip(KelloOsoite, AudioType.MPEG);
                p.timeout = 20;
                yield return p.SendWebRequest();
                if (p.result != UnityWebRequest.Result.Success) { o.Kirjaa($"opas: kirkonkellot ei latautunut ({p.responseCode})"); yield break; }
                kelloKlippi = DownloadHandlerAudioClip.GetContent(p);
            }
            if (silmukka == null || silmukka.Nykyinen != k) yield break;
            if (kelloLahde == null) { kelloLahde = o.gameObject.AddComponent<AudioSource>(); kelloLahde.playOnAwake = false; kelloLahde.spatialBlend = 0; kelloLahde.loop = true; }
            kelloEtaisyys = (float)silmukka.Asento.EtaisyysM;
            kelloLahde.clip = kelloKlippi; kelloLahde.volume = 0; kelloAlku = Time.unscaledTime; kelloLahde.Play();
            o.Kirjaa($"opas: kirkonkellot {k.Nimi} ({kelloEtaisyys:F0} m)");
            while (kelloLahde != null && Time.unscaledTime - kelloAlku < KelloS) yield return null;
            if (kelloLahde != null) kelloLahde.Stop();
        }

        void SoitaUkkonen()
        {
            if (ukkosKlipit == null || ukkosKlipit.Count == 0 || !Asetukset.Paalla(Kytkin.Aanimaisema)) return;
            if (ukkosLahde == null) { ukkosLahde = o.gameObject.AddComponent<AudioSource>(); ukkosLahde.playOnAwake = false; ukkosLahde.spatialBlend = 0; }
            ukkosLahde.volume = UkkosenTavoite();
            ukkosLahde.PlayOneShot(ukkosKlipit[UnityEngine.Random.Range(0, ukkosKlipit.Count)]);
        }

        IEnumerator HaeSaa(double lat, double lon, string kaup)
        {
            var ic = System.Globalization.CultureInfo.InvariantCulture;
            using var r = Pyynto($"/opas/saa?lat={lat.ToString("F4", ic)}&lon={lon.ToString("F4", ic)}&kaupunki={UnityWebRequest.EscapeURL(kaup ?? "")}");
            r.timeout = 10;
            yield return r.SendWebRequest();
            saaHaussa = false;
            var t = r.result == UnityWebRequest.Result.Success ? PalloSaaTiedot.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>) : null;
            if (t == null) { o.Kirjaa($"opas: sää {kaup}: ei saatu ({r.responseCode}), pidetään {Saatila.LiveSaa}"); yield break; }
            SaaTiedot = t; Saatila.LiveSaa = t.Tila;
            o.Kirjaa($"opas: sää {kaup}: {t.Tila}, pilvisyys {t.PilvisyysPct:F0} %, sade {t.SadeMmH:F1} mm/h, sumu {t.SumuPct:F0} %, tuuli {t.TuuliMs:F0} m/s, {(t.Paiva ? "päivä" : "yö")}");
        }

        // LENNON TELEMETRIA (Päätoimittaja 8.10. 08.3x): ruuduittain kulkunopeus (katsepisteen maajälki m/s), kuvan nopeus
        // (silmän nopeus / katse-etäisyys, rad/s), kääntönopeus (°/s) ja silmän korkeus; perillä yhteenveto (OpasKuvaus.Telemetria).
        readonly List<double> telV = new List<double>(), telVk = new List<double>(), telEt = new List<double>();
        Kuvakulma? telEd; (double e, double n, double u) telSilma; double telKaanto, telKierto, telAika; string telKohde;
        void Telemetria(OpasVaihe ennen)
        {
            bool lentaa = silmukka.Vaihe == OpasVaihe.Lentaa && !silmukka.Siirtymassa && !silmukka.AvausTauolla;
            var a = silmukka.Asento; float dt = Time.unscaledDeltaTime;
            if (lentaa && dt > 0)
            {
                if (telEd == null) { telV.Clear(); telVk.Clear(); telEt.Clear(); telKaanto = 0; telKierto = 0; telAika = 0; telKohde = silmukka.Nykyinen?.Nimi; telSilma = OpasKuvaus.KameraPaikka(a, a.Lat, a.Lon); telEd = a; telLat0 = a.Lat; telLon0 = a.Lon; return; }
                var ed = telEd.Value; var silma = OpasKuvaus.KameraPaikka(a, telLat0, telLon0);
                double v = KierrosLento.EtaisyysM(ed.Lat, ed.Lon, a.Lat, a.Lon) / dt;
                double de = silma.e - telSilma.e, dn = silma.n - telSilma.n, du = silma.u - telSilma.u;
                double vk = Math.Sqrt(de * de + dn * dn + du * du) / dt, k = Math.Abs(KierrosLento.Kiedo(a.Suuntima - ed.Suuntima)) / dt;
                telAika += dt; telV.Add(v); telVk.Add(vk); telEt.Add(a.EtaisyysM); telKaanto = Math.Max(telKaanto, k); telKierto += k * dt;
                o.Kirjaa($"opas: telemetria {telAika:F2} s kulku {v:F1} m/s kuva {vk / Math.Max(1, a.EtaisyysM):F3} rad/s kääntö {k:F1} °/s korkeus {silma.u:F0} m");
                telSilma = silma; telEd = a;
            }
            else if (telEd != null)
            {
                telEd = null;
                if (telV.Count > 10)
                {
                    var (nousu, hidastus, huippu, _) = OpasKuvaus.Telemetria(telV, telEt, telAika / telV.Count);
                    var (_, _, huippuK, kasvu) = OpasKuvaus.Telemetria(telVk, telEt, telAika / telV.Count);
                    o.Kirjaa($"opas: telemetria yhteenveto {telKohde}: kesto {telAika:F1} s, kulku huippu {huippu:F0} m/s, nousu 10→90 % {nousu:F1} s, hidastus 90→10 % {hidastus:F1} s, "
                        + $"silmä huippu {huippuK:F0} m/s, kuvan nopeuden kasvu huipun jälkeen {kasvu:P1}, kääntö enintään {telKaanto:F1} °/s, kokonaiskierto {telKierto:F0}°");
                }
            }
        }
        double telLat0, telLon0;
        float lahtoLokiAika;
        void EsilataaKortit()
        {
            var k = silmukka.Vaihe == OpasVaihe.Lentaa ? silmukka.Nykyinen : silmukka.Seuraava;
            if (k?.Id == null || k.Kysymys || k.Id == esiKortitId || Testi) return;
            string id = YksKaupunkiId();
            if (id == null || !yksPolut.TryGetValue(id, out var polku) || !yksValimuisti.TryGetValue(polku, out var l) || l == null) return;
            esiKortitId = k.Id;
            kortti ??= new YksityiskohtaKortti(o);
            // Esilämmitys vain paikallaan tai siirtoruudun alla (ensimmäinen piirto voi viedä ruudun).
            if (kaupunki?.Kamera != null && (silmukka.Siirtymassa || silmukka.Vaihe != OpasVaihe.Lentaa)) kortti.Lammita(kaupunki.Kamera);
            foreach (var x in l)
                if (string.Equals(x.KohdeId, k.Id, StringComparison.OrdinalIgnoreCase)) YksityiskohtaKortti.Esilataa(o, x.Url);
        }

        static bool YksPeittaa()
        {
            if (Matkakirja.Natiivi.OpasValikko.Viimeisin?.Auki == true) return true;
            return !tekstiAvasiChatin && ChatAuki;
        }
        static bool ChatAuki => Matkakirja.Natiivi.UiNakymat.Olemassa && Matkakirja.Natiivi.UiNakymat.Hae()?.Chat?.Auki == true;

        // ÄÄNETÖN KAPPALE NÄKYVIIN: oppaan chat (Näytä teksti -näkymä, kappaleet ovat jo siellä) aukeaa itsestään, jos se ei ollut
        // auki, ja sulkeutuu kappaleen jälkeen, ellei uutta äänetöntä kappaletta ala heti (ei välkettä peräkkäisissä).
        static bool tekstiAvasiChatin;
        double tekstiKulunut;
        void TekstiNakyviin()
        {
            if (Testi || ChatAuki) return;
            ChatOppaalle(true);
            tekstiAvasiChatin = ChatAuki;
        }
        IEnumerator TekstiPoisViiveella()
        {
            yield return new WaitForSecondsRealtime(1.5f);
            TekstiPois();
        }
        void TekstiPois()
        {
            if (!tekstiAvasiChatin || tekstina != null) return;
            tekstiAvasiChatin = false;
            if (ChatAuki) ChatOppaalle(false);
        }

        void YksPois()
        {
            if (yksAjo != null) { o.StopCoroutine(yksAjo); yksAjo = null; }
            kortti?.Piilota();
            // Kuvanosto: suurennettu kuva pysyy, kunnes pelaaja sulkee sen (Natiivi-UI 9.10.); pieni poistuu omalla ajallaan.
            if (Nosto is Matkakirja.Natiivi.OpasKuvanosto n && n.Nakyy && !n.Suurennettu && !nostoPoistuu) o.StartCoroutine(NostoPois(n));
        }

        // ---- KUVANOSTO (omistaja TF 168, Päätoimittaja 9.10.: kuvat pienenä reunaan, pidempään; Natiivi-UI:n OpasKuvanosto) ----
        static Matkakirja.Natiivi.OpasKuvanosto Nosto => Testi ? null : Matkakirja.Natiivi.OpasKuvanosto.Viimeisin;
        /// <summary>Näkyvän kuvanoston kuvan kulunut aika (s; tauko ei kulu) ja kuvan tunniste.</summary>
        float nostoKulunut; int nostoVersio; bool nostoPoistuu;

        void NostoNayta(Matkakirja.Natiivi.OpasKuvanosto n, OpasYksityiskohdat.Kuva k) { n.Nayta(k); nostoKulunut = 0; nostoVersio++; nostoPoistuu = false; }

        /// <summary>Yksi ruutu: kulunut aika ja pienen kuvan poisto NayttoS:n jälkeen (suurennettu odottaa sulkemista).</summary>
        void NostoAskel(Matkakirja.Natiivi.OpasKuvanosto n)
        {
            if (n == null || !n.Nakyy) return;
            if (!tauolla) nostoKulunut += Time.unscaledDeltaTime;
            if (!n.Suurennettu && nostoKulunut >= OpasYksityiskohdat.NayttoS) n.Piilota();
        }

        /// <summary>Kerronta loppui tai vaihtui: pieni kuva jää loppuajakseen (ei katkea kesken), sitten pois.</summary>
        IEnumerator NostoPois(Matkakirja.Natiivi.OpasKuvanosto n)
        {
            int v = nostoVersio; nostoPoistuu = true;
            while (n != null && n.Nakyy && v == nostoVersio) { NostoAskel(n); yield return null; }
            if (v == nostoVersio) nostoPoistuu = false;
        }

        /// <summary>Kerronta alkoi: kohteen (tai "avaus") kuvat ajoitetaan ja näytetään soivan klipin ajan mukaan.</summary>
        void YksAloita(string kohdeId, string teksti, AudioSource lahde, AudioClip klippi, string ajatUrl, double kestoS)
        {
            if (lahde == null || klippi == null) return;
            YksAloita(kohdeId, teksti, ajatUrl, kestoS, () => lahde != null ? lahde.time : 0f,
                () => lahde != null && lahde.clip == klippi && (lahde.isPlaying || tauolla));
        }

        /// <summary>Äänetön kappale: aika on kulunut lukuaika (TekstiLoppuu, tauko pysäyttää), jatkuu niin kauan kuin kappale on esillä.</summary>
        void YksAloitaTeksti(string kohdeId, string teksti, double kestoS, Func<bool> esilla)
            => YksAloita(kohdeId, teksti, null, kestoS, () => tekstiKulunut, esilla);

        void YksAloita(string kohdeId, string teksti, string ajatUrl, double kestoS, Func<double> aika, Func<bool> kaynnissa)
        {
            YksPois();
            VarmistaYksityiskohdat();
            if (string.IsNullOrEmpty(kohdeId) || string.IsNullOrEmpty(teksti) || Testi) return;
            if (kohdeId.EndsWith("-lisaa")) kohdeId = kohdeId.Substring(0, kohdeId.Length - 6);
            yksAjo = o.StartCoroutine(YksAja(kohdeId, teksti, ajatUrl, kestoS, aika, kaynnissa));
        }

        IEnumerator YksAja(string kohdeId, string teksti, string ajatUrl, double kestoS, Func<double> aika, Func<bool> kaynnissa)
        {
            float raja = Time.unscaledTime + 12f;
            while (yksPolku != null && yksLataukset.Contains(yksPolku) && Time.unscaledTime < raja && kaynnissa()) yield return null;
            var yksKuvat = historiaOsiot.Exists(x => x.Tunnus == kohdeId) ? historiaKuvat : yksPolku != null && yksValimuisti.TryGetValue(yksPolku, out var vk) ? vk : null;
            if (yksKuvat == null || yksKuvat.Count == 0) yield break;
            List<(int, double)> ajat = null;
            if (!string.IsNullOrEmpty(ajatUrl))
                using (var r = UnityWebRequest.Get(ajatUrl))
                {
                    r.timeout = 5;
                    yield return r.SendWebRequest();
                    if (r.result == UnityWebRequest.Result.Success) ajat = OpasYksityiskohdat.LueAjat(MiniJson.Jasenna(r.downloadHandler.text));
                }
            var lista = OpasYksityiskohdat.Ajoita(yksKuvat, kohdeId, teksti, kestoS, ajat);
            if (lista.Count == 0) yield break;
            o.Kirjaa($"opas: yksityiskohtakuvat {kohdeId}: {lista.Count} ({(ajat != null && ajat.Count > 0 ? "sana-ajat" : "osuus tekstistä")}) "
                     + string.Join(", ", lista.ConvertAll(x => $"{x.AikaS:F1} s")));
            var nosto = Nosto;
            if (nosto != null)
            {
                // Kuvanosto: kuva pienenä reunaan ankkurin kohdalla, NayttoS tai seuraavaan kuvaan asti; suurennettua ei vaihdeta
                // ennen kuin pelaaja sulkee sen (myöhästyneet ankkurit ohitetaan). Valikko, chat ja siirtymä piilottavat sen itse.
                foreach (var (kuva, t) in lista)
                {
                    while (kaynnissa() && (aika() < t - 0.35 || nosto.Suurennettu)) { NostoAskel(nosto); yield return null; }
                    if (!kaynnissa()) break;
                    if (aika() > t + 1.0) continue;
                    NostoNayta(nosto, kuva);
                }
                yksAjo = null;
                if (nosto.Nakyy) yield return NostoPois(nosto);
                yield break;
            }
            kortti ??= new YksityiskohtaKortti(o);
            foreach (var (kuva, t) in lista)
            {
                // Kuva lähtee ~0,35 s ennen ankkuria (lataus ja sisääntulo), kun klippi yhä soi.
                if (aika() > t + 1.0) continue;   // luettelo tai ajat tulivat myöhässä: ankkuri jo ohi, ei kuvaa väärään kohtaan
                while (kaynnissa() && aika() < t - 0.35) yield return null;
                if (!kaynnissa()) yield break;
                if (YksPeittaa() || kaupunki?.Kamera == null) continue;
                kortti.Nayta(kaupunki.Kamera, kuva, YksPeittaa);
            }
            yksAjo = null;
        }

        /// <summary>Avaus ilman ääntä (tai Kertoja pois): teksti chattiin ja näkyviin lukuajan, yksityiskohtakuvat lukuajasta.</summary>
        IEnumerator AvausTekstina(string teksti)
        {
            double kesto = KierrosLento.LukuKesto(teksti);
            o.Kirjaa($"opas: esitys avaus tekstinä ({kesto:F1} s)");
            KysymysChattiin(new OpasKohde { Id = "avaus", Teksti = teksti });
            TekstiNakyviin();
            var avausK = new OpasKohde { Id = "avaus", Teksti = teksti };
            tekstina = avausK; tekstiKulunut = 0;
            YksAloitaTeksti("avaus", teksti, kesto, () => tekstina == avausK);
            double t = 0;
            while (t < kesto && silmukka != null && Kaupunkitila && tekstina == avausK) { if (!tauolla) t += Time.unscaledDeltaTime; tekstiKulunut = t; yield return null; }
            if (tekstina == avausK) tekstina = null;
            TekstiPois();
        }

        /// <summary>Hiljainen hetki avauksen (ja opastuksen) jälkeen ennen kierroksen ensimmäistä lentoa.</summary>
        public const float AvausLepoS = 2.5f;

        IEnumerator EsitysAvaus(string kaupunkiId)
        {
            // Yksityiskohtaluettelo esiin heti (iPad-simu 7.10. 21.24: avauksen kuva jäi pois, kun luettelo latautui vasta
            // avauksen soidessa ja ajoitus odotti 3 s).
            VarmistaYksityiskohdat();
            if (!Testi && Kehityskaupungit.On(kaupunkiId)) o.StartCoroutine(LataaHistoria(kaupunkiId));
            o.Kirjaa($"opas: esitys alkaa ({kaupunkiId}): avaus{(OpastusKuultu ? "" : " + opastus (1. kyyti)")}{(kaupunkiId != null && esittelyPolut.ContainsKey(kaupunkiId) ? " [" + esittelyPolut[kaupunkiId] + "]" : "")}");
            if (!Testi && !string.IsNullOrEmpty(kaupunkiId))
            {
                Dictionary<string, object> avaus = null;
                using (var r = UnityWebRequest.Get(EsittelyOsoite(kaupunkiId)))
                {
                    r.timeout = 10;
                    yield return r.SendWebRequest();
                    if (r.result == UnityWebRequest.Result.Success && MiniJson.Jasenna(r.downloadHandler.text) is Dictionary<string, object> j)
                        avaus = j.TryGetValue("avaus", out var a) ? a as Dictionary<string, object> : null;
                }
                string avausTeksti = avaus != null && avaus.TryGetValue("teksti", out var at) ? at as string : null;
                if (avaus != null && avaus.TryGetValue("aani", out var au) && au is string url && Asetukset.Paalla(Kytkin.Kertoja))
                    yield return SoitaJaOdota(url, "avaus", avausTeksti);
                else if (!string.IsNullOrWhiteSpace(avausTeksti) && silmukka != null)
                    yield return AvausTekstina(avausTeksti);
                if (!OpastusKuultu && silmukka != null && Kaupunkitila)
                {
                    string ourl = null;
                    using (var r = UnityWebRequest.Get(EsittelyJuuri + "yleiset-v1.json"))
                    {
                        r.timeout = 10;
                        yield return r.SendWebRequest();
                        if (r.result == UnityWebRequest.Result.Success && MiniJson.Jasenna(r.downloadHandler.text) is Dictionary<string, object> j
                            && j.TryGetValue("opastus", out var ol) && ol is IList<object> l && l.Count > 0 && l[0] is Dictionary<string, object> o0
                            && o0.TryGetValue("aani", out var ou)) ourl = ou as string;
                    }
                    if (ourl != null) { yield return SoitaJaOdota(ourl, "opastus"); OpastusKuultu = true; }
                }
            }
            // Avaus kunnolla ohi ennen ensimmäistä siirtymää (omistaja TF 168, 9.10.: "parin kertojan lauseen jälkeen kip kääntyy").
            if (!Testi) yield return new WaitForSeconds(AvausLepoS);
            if (silmukka == null || !Kaupunkitila) yield break;
            o.Kirjaa("opas: esitys: kaupunkikierros");
            Kaupunkikierros();
            if (silmukka != null) silmukka.PyynnotSeis = false;   // kierroksen ulkopuolella (tyhjä lista) pyynnöt taas sallittu
        }

        /// <summary>Esityksen puhe (avaus, opastus) siltalauseiden kanavalla; odottaa loppuun (ei kertojaa päälle).</summary>
        IEnumerator SoitaJaOdota(string url, string mika, string teksti = null)
        {
            if (silta == null || !Asetukset.Paalla(Kytkin.Kertoja)) yield break;
            using var p = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG);
            p.timeout = 15;
            float t0 = Time.realtimeSinceStartup;
            yield return p.SendWebRequest();
            if (p.result != UnityWebRequest.Result.Success || silmukka == null) { o.Kirjaa($"opas: esitys {mika} ei latautunut ({p.responseCode})"); yield break; }
            var klippi = DownloadHandlerAudioClip.GetContent(p);
            silta.clip = klippi; silta.volume = KertojanTaso; silta.Play();
            // Avauksen sana-ajat avauksen äänen rinnalla (.mp3 → .ajat.json, Pelikoodari #4152); puuttuessa varapolku.
            if (teksti != null) YksAloita("avaus", teksti, silta, klippi, url.EndsWith(".mp3") ? url.Substring(0, url.Length - 4) + ".ajat.json" : null, klippi.length);
            o.Kirjaa($"opas: esitys {mika} soi ({klippi.length:F1} s, lataus {Time.realtimeSinceStartup - t0:F1} s)");
            float loppu = Time.realtimeSinceStartup + klippi.length + 0.6f;
            while (Time.realtimeSinceStartup < loppu && silmukka != null && Kaupunkitila) yield return null;
        }
        /// <summary>Kaupunkitilan avaus aloittaa esityksen (kaupunkikierros) heti, kun kohdelista on haettu ja siirtymä ohi.</summary>
        static bool esitysAlkaa;
        bool kerroLisaaOdottaa;
        OpasKohde kerroLisaa; string kerroLisaaId;
        /// <summary>Kohde, jonka kysymykset Kysy-lista näyttää (lennon aikana yhä edellinen pysähdys).</summary>
        string kysymystenId, kysymystenNimi;
        /// <summary>Kaupunkitilassa kysymyksen vastauksen jälkeen kierros jatkuu tämän tauon jälkeen (s).</summary>
        public const float JatkoViiveS = 2f;
        bool jatkoVastauksenJalkeen, odotusAaniSoi;
        int ilmoitettuIndeksi = -2, ilmoitettuMaara = -1; string[] ilmoitetutKysymykset;
        void IlmoitaKierros()
        {
            int i = KierrosIndeksi, n = KierrosKohteet.Count;
            if (i == ilmoitettuIndeksi && n == ilmoitettuMaara && ReferenceEquals(kysymykset, ilmoitetutKysymykset)) return;
            ilmoitettuIndeksi = i; ilmoitettuMaara = n; ilmoitetutKysymykset = kysymykset;
            KierrosVaihtui?.Invoke();
        }
        /// <summary>Liiku-lista: kaupungin 12 tärkeintä (GET /opas/liiku); null = latautuu.</summary>
        public static IReadOnlyList<OpasTaky> Kohteet => Viimeisin?.kohteet;
        public static bool KierrosKaynnissa => Viimeisin?.silmukka != null && Viimeisin.silmukka.KierrosKaynnissa;

        /// <summary>JATKA KIERROSTA -nappi näkyviin (Natiivi-UI): kysymys keskeytti kierroksen, ja vastaus on kuultu.</summary>
        public static bool KierrosJatkettavissa
        {
            get
            {
                var v = Viimeisin;
                return Auki && v.silmukka.KierrosKeskeytetty && !v.puhuu && !v.kysyOdotus.Kaynnissa && v.silmukka.Vaihe != OpasVaihe.Lentaa
                    && (v.silta == null || !v.silta.isPlaying);
            }
        }

        /// <summary>JATKA KIERROSTA -napin napautus: kesken jäänyt kohde alusta, muuten seuraava. true = jatkui.</summary>
        public static bool JatkaKierrosta()
        {
            if (!Auki) return false;
            var v = Viimeisin;
            v.puhuttu = null;   // sama kohde saa alkaa uudelleen alusta
            // Kesken jäänyt kohde luetaan alusta: ääni uudelleen, jos se ehdittiin vapauttaa (simu 17.4x: luettiin tekstinä).
            if (v.silmukka.JatkoKohde is OpasKohde jk) v.Valmistele(jk);
            bool ok = v.silmukka.JatkaKierrosta();
            v.o.Kirjaa(ok ? $"opas: kierros jatkuu ({v.silmukka.KierrosTieto.numero}/{v.silmukka.KierrosTieto.maara})" : "opas: ei keskeytettyä kierrosta");
            return ok;
        }

        // ---- VAPAA LENTO JA PALUU KIERROKSELLE (omistaja 9.10., Päätoimittaja juna 170; napit Natiivi-UI heijastuksella,
        // natiivi-ui/vapaa-lento) ----
        /// <summary>Vapaan lennon nopeusvipu (Natiivi-UI kirjoittaa; 1 = oletus, OpasVapaaLento.VipuMin…VipuMax).</summary>
        public static double VapaaNopeus { get => Viimeisin?.silmukka?.Vapaa.Vipu ?? 1; set { if (Viimeisin?.silmukka != null) Viimeisin.silmukka.Vapaa.Vipu = value; } }
        /// <summary>"Vapaa lento" -nappi: kierros käynnissä, ei siirtoruutua.</summary>
        public static bool VapaaLentoKaytettavissa => Auki && Viimeisin.silmukka.VapaaLentoKaytettavissa;
        /// <summary>Kierros keskeytyy (kohde, paikka ja kesken jäänyt kerronta talteen), kertoja vaikenee, käsiohjaus. true = alkoi.</summary>
        public static bool AloitaVapaaLento()
        {
            if (!Auki) return false;
            var v = Viimeisin;
            if (v.tauolla) Tauko(false);
            bool ok = v.silmukka.AloitaVapaaLento();
            if (ok) { v.Hiljenna(); if (v.silta != null && v.silta.isPlaying) v.silta.Stop(); }
            v.o.Kirjaa(ok ? "opas: vapaa lento (kierros keskeytetty, paluukohta talteen)" : "opas: vapaa lento ei käytettävissä");
            return ok;
        }
        /// <summary>"Palaa kierrokselle" -nappi: vapaassa lennossa ja keskeytyskohta tallessa.</summary>
        public static bool PaluuKierrokselleKaytettavissa => Auki && Viimeisin.silmukka.PaluuKierrokselleKaytettavissa;
        /// <summary>Pehmeä lento keskeytyskohtaan; perillä kierros jatkuu (kesken jäänyt kohde alusta). true = paluu alkoi.</summary>
        public static bool PalaaKierrokselle()
        {
            if (!Auki) return false;
            var v = Viimeisin;
            v.puhuttu = null;
            if (v.silmukka.JatkoKohde is OpasKohde jk) v.Valmistele(jk);   // ääni valmiiksi paluulennon aikana (kuten JATKA)
            bool ok = v.silmukka.PalaaKierrokselle();
            v.o.Kirjaa(ok ? "opas: paluu kierrokselle (lento keskeytyskohtaan)" : "opas: paluu ei käytettävissä");
            return ok;
        }

        /// <summary>■ LOPETA KIERROS (Natiivi-UI, tauon vasemmalla): kierros päättyy, kertoja vaikenee, vapaa tila. true = lopetettiin.</summary>
        public static bool LopetaKierros()
        {
            if (!Auki) return false;
            var v = Viimeisin;
            if (v.tauolla) Tauko(false);
            v.silmukka.LopetaKierros();
            v.Hiljenna();
            if (v.silta != null && v.silta.isPlaying) v.silta.Stop();
            v.o.Kirjaa("opas: kierros lopetettu, vapaa tila");
            return true;
        }

        // ---- MIKÄ TÄMÄ ON? (omistaja 6.10. 16.4x, Päätoimittaja C, juna 152; Pelikoodari GET /opas/lahella #4064) ----
        /// <summary>Nappi näkyvissä (Natiivi-UI): vapaa tila eikä siirtoa tai hakua kesken.</summary>
        public static bool MikaTamaKaytettavissa => Auki && Viimeisin.silmukka.VapaaTila && !Viimeisin.silmukka.Siirtymassa && !Viimeisin.mikaLataa;
        /// <summary>Lähikohteiden haku kesken (UI: odotustila; ODOTUS5-lauseet hoitaa KysyOdotus).</summary>
        public static bool MikaTamaLataa => Viimeisin != null && Viimeisin.mikaLataa;
        /// <summary>Useampi osuma: lista valittavaksi (Liiku-pohja); tyhjä lista = ei tunnettua kohdetta lähellä; null = ei listaa.</summary>
        public static IReadOnlyList<OpasTaky> MikaTamaVaihtoehdot => Viimeisin?.mikaLista;
        List<OpasTaky> mikaLista;
        bool mikaLataa;
        public const int MikaTamaSadeM = 150;

        /// <summary>Napautus: katsepisteen (ruudun keskikohdan maapiste) lähikohteet; yksi osuma → opas kertoo, useampi → lista.</summary>
        public static bool MikaTamaOn()
        {
            if (!MikaTamaKaytettavissa) return false;
            var v = Viimeisin;
            v.mikaLista = null;
            v.o.StartCoroutine(v.HaeLahella(v.silmukka.Asento.Lat, v.silmukka.Asento.Lon));
            return true;
        }

        /// <summary>Listasta valittu kohde: kysytään "Mikä tämä on?" ja kohde kehystetään ja luetaan.</summary>
        public static bool MikaTamaValitse(OpasTaky t)
        {
            if (!Auki || t == null) return false;
            var v = Viimeisin;
            v.mikaLista = null;
            v.KysyPaikasta(t);
            return true;
        }

        /// <summary>Lista suljettiin ilman valintaa.</summary>
        public static void MikaTamaPeru() { if (Viimeisin != null) Viimeisin.mikaLista = null; }

        void KysyPaikasta(OpasTaky t)
        {
            o.Kirjaa($"opas: mikä tämä on → {t.Nimi} ({(double.IsNaN(t.EtaisyysM) ? "?" : t.EtaisyysM.ToString("F0"))} m)");
            if (!kysyOdotus.Kaynnissa) { Silta(OpasSiltalauseet.Kysymys, false); kysyOdotus.Aloita(); }
            o.StartCoroutine(KysyWorkerilta("Mikä tämä on?", kysyOdotus.Numero, t));
        }

        IEnumerator HaeLahella(double lat, double lon)
        {
            mikaLataa = true;
            Silta(OpasSiltalauseet.Kysymys, false);
            kysyOdotus.Aloita();   // haku 3–7 s kylmänä: odotus5 → odotus12 → virhe kuten kysymyksessä
            int nro = kysyOdotus.Numero;
            var ci = System.Globalization.CultureInfo.InvariantCulture;
            using var r = UnityWebRequest.Get($"{PuluChat.Palvelin}/opas/lahella?lat={lat.ToString("F5", ci)}&lon={lon.ToString("F5", ci)}&r={MikaTamaSadeM}");
            r.timeout = 20;
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            PolloTestitunnus.Lisaa(r);
            if (GizaKokeilu) r.SetRequestHeader("x-matkakirja-kokeilu", "giza");
            float t0 = Time.realtimeSinceStartup;
            yield return r.SendWebRequest();
            mikaLataa = false;
            if (silmukka == null || !kysyOdotus.Kelpaa(nro)) yield break;
            var lista = r.result == UnityWebRequest.Result.Success ? OpasTaky.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>) : null;
            o.Kirjaa($"opas: lähellä ({lat:F4}, {lon:F4}) {(lista == null ? "VIRHE " + r.responseCode : lista.Count + " kohdetta")} ({Time.realtimeSinceStartup - t0:F1} s)");
            if (lista == null) { if (kysyOdotus.Epaonnistui(nro)) Silta(OpasSiltalauseet.Virhe, false); yield break; }
            if (lista.Count == 1) { KysyPaikasta(lista[0]); yield break; }   // odotusportaat jatkuvat vastaukseen asti
            kysyOdotus.Alkoi();   // lista tai ei mitään: pelaaja valitsee
            mikaLista = lista;
        }

        /// <summary>Testikomento "opas testi429": Googlen root-pyyntö kuin 429 (uusintayritykset ja ion-vara lokiin).</summary>
        /// <summary>VAIN TESTIKÄYTTÖÖN (Päätoimittaja 6.10. 19.0x: still-parit täsmälleen samasta kulmasta): komento
        /// "opas kamera lat lon etäisyys_m kallistus suuntima katseKorkeus_m" lukitsee kameran; "opas kamera pois" vapauttaa.</summary>
        public static Kuvakulma? KiinteaKamera;
        bool kiinteaKirjattu, kiinteaLaski;
        float kiinteaAlku = -1f;

        public static void TestiGoogle429() { if (Viimeisin != null && Viimeisin.nakymaAuki) Viimeisin.kaupunki.TestiVirhe429(); }

        /// <summary>Vapaa tila (■ jälkeen): ei kohdetta, Linssiseppä 2:n vapaa ohjaus (juna 152).</summary>
        public static bool VapaaTila => Auki && Viimeisin.silmukka.VapaaTila;
        /// <summary>Vapaan lennon tila (komento `opas vapaa`): korkeus, pinta ja tunnetut näytteet; null = ei vapaassa tilassa.</summary>
        public static string VapaanTila => !VapaaTila ? null : Viimeisin.silmukka.Vapaa.Tila() +
            (Viimeisin.luotain is OpasLahiluotain l ? $", luotain {l.PiirtoMs:0.00} ms × {1 / OpasLahiluotain.ValiS:0}/s ({l.Mittauksia} mittausta), syvyys ala {l.AlaKeski:0} / ylä {l.YlaKeski:0} m" : "");
        string[] kysymykset, jatkoKysymykset = Array.Empty<string>();
        List<OpasTaky> kohteet, kierrosKohteet;   // kierrosKohteet: /opas/liiku "kierros"-järjestys (lyhin reitti), muuten kohteet
        string kohteetKaupunki;
        readonly List<(string rooli, string teksti)> historia = new List<(string, string)>();
        int kysyLaskuri;

        /// <summary>Liiku-listan kohde: lento heti (yli 30 km siirtoruudulla), pysähdys pyydetään samalla.</summary>
        public static bool Siirry(OpasTaky t)
        {
            if (!Auki || t == null || string.IsNullOrEmpty(t.Nimi)) return false;
            var v = Viimeisin;
            if (!SallittuPiste(t.Lat, t.Lon)) { v.o.Kirjaa($"opas: liiku {t.Nimi} → sallitun 3D-alueen ulkopuolella, ei lennetä"); v.Torjunta(); return false; }
            if (v.tauolla) Tauko(false);
            v.o.Kirjaa($"opas: liiku {t.Nimi}");
            v.silmukka.Liiku(t.Nimi, t.Lat, t.Lon);
            v.Silta(OpasSiltalauseet.Valinta, true);   // siirrossa (> 30 km) hiljaa: kertoja odottaa näkymää
            return true;
        }

        /// <summary>Sama kuin Siirry (Natiivi-UI:n nimi Liiku-listalle).</summary>
        public static bool Liiku(OpasTaky t) => Siirry(t);

        /// <summary>Kaupunkikierros: Liiku-listan kohteet järjestyksessä, lyhyt kerronta kullekin.</summary>
        public static bool Kaupunkikierros()
        {
            var v = Viimeisin;
            if (!Auki || v.kohteet == null || v.kohteet.Count == 0) return false;
            if (v.tauolla) Tauko(false);
            var jono = new List<(string, double, double)>();
            foreach (var t in v.kierrosKohteet ?? v.kohteet) jono.Add((t.Nimi, t.Lat, t.Lon));
            v.o.Kirjaa($"opas: kaupunkikierros {jono.Count} kohdetta");
            v.kellotSoineet.Clear();   // kirkonkellot kerran kierroksella
            v.silmukka.AloitaKierros(jono);
            v.Silta(OpasSiltalauseet.Aloitus, true);
            return true;
        }

        /// <summary>Kysy-listan kysymys: sama keskustelureitti kuin mikki ja näppäimistö.</summary>
        public static bool Kysy(string kysymys) => Puhu(kysymys, true);

        /// <summary>Mikki ja näppäimistö suoraan oppaalle: POST /opas/kysy → vastaus (Williamin ääni) ja toiminto.</summary>
        public static bool Puhu(string teksti) => Puhu(teksti, false);

        static bool Puhu(string teksti, bool kysymysListalta)
        {
            if (!Auki || string.IsNullOrWhiteSpace(teksti)) return false;
            var v = Viimeisin;
            if (v.tauolla) Tauko(false);
            if (string.Equals(teksti.Trim(), KerroLisaaTeksti, StringComparison.OrdinalIgnoreCase) && Kaupunkitila)
            {
                var nyt = v.silmukka.Nykyinen;
                // Lennon aikana Nykyinen on jo seuraava kohde, mutta Kysy-lista näyttää edellisen kohteen kysymykset ja "Kerro lisää"
                // tarkoittaa sitä (todistusajo kysy166b 8.10.: worker-polku → /opas/seuraava → valmis esittely jatkoi seuraavaan).
                if (v.kerroLisaa != null && v.kerroLisaaId != null && (nyt != null && v.kerroLisaaId == nyt.Id || v.kerroLisaaId == v.kysymystenId))
                {
                    // Valmis pidempi teksti (Pelikoodari #4126): heti paikalla, ei workeria; kierros jatkuu sen jälkeen seuraavasta.
                    v.o.Kirjaa("opas: kerro lisää (valmis teksti)");
                    v.silmukka.KeskeytaKierrosOhittaen();
                    v.Valmistele(v.kerroLisaa); v.silmukka.Esita(v.kerroLisaa);
                    v.jatkoVastauksenJalkeen = true;
                    return true;
                }
                if (ValmisEsittely)
                {
                    // Valmiissa esittelyssä /opas/seuraava palauttaa aina kierroksen seuraavan kohteen (toivetta ei mallinneta), joten
                    // ilman valmista tekstiä "Kerro lisää" kysytään oppaalta kuten muutkin kysymykset (POST /opas/kysy).
                    string nimi = v.kysymystenNimi ?? nyt?.Nimi;
                    teksti = string.IsNullOrEmpty(nimi) ? "Kerro lisää tästä paikasta." : $"Kerro lisää kohteesta {nimi}.";
                    v.o.Kirjaa("opas: kerro lisää (kysymyksenä: " + teksti + ")");
                }
                else
                {
                    v.o.Kirjaa("opas: kerro lisää (worker)");
                    v.silmukka.KerroLisaa();
                    v.kerroLisaaOdottaa = true;
                    return true;
                }
            }
            v.o.Kirjaa("opas: kysy \"" + teksti.Trim() + "\"");
            // Kierroksella kysymys keskeyttää kierroksen heti (omistaja TF 149): kamera paikalleen, kertoja vaikenee, JATKA-nappi vastauksen jälkeen.
            if (v.silmukka.KeskeytaKierros()) v.o.Kirjaa("opas: kierros keskeytetty kysymykseen");
            // Siltalause tilanteen mukaan (juna 150): kysymykseen syventävä lause ilman odotus-ajastinta (vastaus PCM:llä ~5–6 s);
            // käskyyn ("vie minut …") ei lausetta ennen vastausta, koska liikettä ei vielä tiedetä (vastauksen oma ääni kuittaa).
            if (kysymysListalta || OpasSiltalauseet.OnKysymys(teksti)) v.Silta(OpasSiltalauseet.Kysymys, false);
            v.kysyOdotus.Aloita();   // vastaus ei ala: odotus5 → odotus12 → virhe (PaivitaKamera)
            v.o.StartCoroutine(v.KysyWorkerilta(teksti.Trim(), v.kysyOdotus.Numero));
            return true;
        }

        IEnumerator KysyWorkerilta(string kysymys, int nro, OpasTaky paikka = null)
        {
            var nyt = silmukka.Nykyinen; var kehys = silmukka.NykyinenKehys;
            var sb = new StringBuilder("{");
            sb.Append("\"istunto\":\"").Append(istunto).Append("\",\"kaupunki\":\"").Append(Escape(Aloituskaupunki)).Append("\",");
            if (paikka != null)   // Mikä tämä on? -valinta (GET /opas/lahella)
                sb.Append("\"paikka\":{\"id\":").Append(paikka.Id == null ? "null" : "\"" + Escape(paikka.Id) + "\"").Append(",\"nimi\":\"").Append(Escape(paikka.Nimi ?? ""))
                  .Append("\",\"lat\":").Append(paikka.Lat.ToString("F5", System.Globalization.CultureInfo.InvariantCulture))
                  .Append(",\"lon\":").Append(paikka.Lon.ToString("F5", System.Globalization.CultureInfo.InvariantCulture)).Append("},");
            else if (nyt != null && kehys != null && !nyt.Kysymys)
                sb.Append("\"paikka\":{\"id\":").Append(nyt.Id == null ? "null" : "\"" + Escape(nyt.Id) + "\"").Append(",\"nimi\":\"").Append(Escape(nyt.Nimi ?? ""))
                  .Append("\",\"lat\":").Append(kehys.Lat.ToString("F5", System.Globalization.CultureInfo.InvariantCulture))
                  .Append(",\"lon\":").Append(kehys.Lon.ToString("F5", System.Globalization.CultureInfo.InvariantCulture)).Append("},");
            else sb.Append("\"paikka\":null,");
            sb.Append("\"kysymys\":\"").Append(Escape(kysymys)).Append("\",\"historia\":[");
            for (int i = Math.Max(0, historia.Count - 6); i < historia.Count; i++)
            {
                if (i > Math.Max(0, historia.Count - 6)) sb.Append(',');
                sb.Append("{\"rooli\":\"").Append(historia[i].rooli).Append("\",\"teksti\":\"").Append(Escape(historia[i].teksti)).Append("\"}");
            }
            sb.Append("],\"kaydyt\":[");
            bool eka = true;
            foreach (var id in silmukka.Nahdyt) { if (!eka) sb.Append(','); sb.Append('"').Append(Escape(id)).Append('"'); eka = false; }
            sb.Append("],\"kieli\":\"fi\",\"krediitit\":[\"osm\"]}");
            using var r = Pyynto("/opas/kysy", sb.ToString());
            float t0 = Time.realtimeSinceStartup;
            yield return r.SendWebRequest();
            if (silmukka == null) yield break;
            var v = r.result == UnityWebRequest.Result.Success ? OpasKysyVastaus.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>) : null;
            o.Kirjaa($"opas: kysy-vastaus {(v == null ? "VIRHE " + r.responseCode : v.Toiminto + (v.ToimintoNimi != null ? " " + v.ToimintoNimi : ""))} ({Time.realtimeSinceStartup - t0:F1} s)");
            if (v == null) { if (kysyOdotus.Epaonnistui(nro)) Silta(OpasSiltalauseet.Virhe, false); yield break; }
            if (!kysyOdotus.Kelpaa(nro)) { o.Kirjaa("opas: kysy-vastaus myöhästyi tai uudempi kysymys, hylätty"); yield break; }
            // Toiminnoton vastaus alkaa kerrontana (AlkaaPuhua kuittaa portaat); toiminto kuittaa heti.
            if (v.Toiminto != OpasToiminto.Ei) kysyOdotus.Alkoi();
            historia.Add(("pelaaja", kysymys));
            if (!string.IsNullOrWhiteSpace(v.Teksti)) historia.Add(("opas", v.Teksti));
            while (historia.Count > 12) historia.RemoveAt(0);
            jatkoKysymykset = v.Jatkokysymykset ?? Array.Empty<string>();
            kysymykset = OpasKysyVastaus.Yhdista(jatkoKysymykset, nyt?.Kysymykset ?? kysymykset);
            // Vastaus kerrotaan paikalla (toiminnoton) tai toiminnon kuittauksena (siirry/kaupunki/kierros), sitten toiminto.
            var vastaus = paikka != null
                // Mikä tämä on?: kohde kehystetään ja luetaan kuten tavallinen pysäkki (lento kohteeseen).
                ? new OpasKohde { Id = "kysy-" + (++kysyLaskuri), Nimi = paikka.Nimi, Alarivi = paikka.Alarivi, Teksti = v.Teksti, Aani = v.Aani, AaniPcm = v.AaniPcm,
                    KestoS = v.KestoS, Lat = paikka.Lat, Lon = paikka.Lon, KokoM = 100, Kysymykset = kysymykset }
                : new OpasKohde { Id = "kysy-" + (++kysyLaskuri), Nimi = nyt?.Nimi, Alarivi = nyt?.Alarivi, Teksti = v.Teksti, Aani = v.Aani, AaniPcm = v.AaniPcm,
                KestoS = v.KestoS, Lat = kehys?.Lat ?? silmukka.Asento.Lat, Lon = kehys?.Lon ?? silmukka.Asento.Lon, KokoM = nyt?.KokoM ?? 100, Kuvat = nyt?.Kuvat,
                Korostus = nyt?.Korostus, Kysymykset = kysymykset };
            if (paikka != null) { Valmistele(vastaus); silmukka.Esita(vastaus); yield break; }
            jatkoVastauksenJalkeen = Kaupunkitila;   // Pariisi-kokeilu (omistaja 10.1x): kierros jatkuu itsestään vastauksen jälkeen
            switch (v.Toiminto)
            {
                case OpasToiminto.Siirry:
                    if (!double.IsNaN(v.ToimintoLat)) LiikuVastauksesta(v, vastaus, v.ToimintoNimi ?? kysymys, v.ToimintoLat, v.ToimintoLon);
                    break;
                case OpasToiminto.Kohde:
                {
                    var t = kohteet?.Find(x => x.Id == v.ToimintoId);
                    if (t != null) LiikuVastauksesta(v, vastaus, t.Nimi, t.Lat, t.Lon);
                    else if (!string.IsNullOrWhiteSpace(v.Teksti)) { Valmistele(vastaus); silmukka.Esita(vastaus); }
                    break;
                }
                case OpasToiminto.Kaupunki:
                    if (!double.IsNaN(v.ToimintoLat)) { SoitaKuittaus(v); VaihdaKaupunki(v.ToimintoNimi, v.ToimintoLat, v.ToimintoLon, null, v.KohdeNimi, v.KohdeLat, v.KohdeLon); }
                    break;
                case OpasToiminto.Kierros: SoitaKuittaus(v); Kaupunkikierros(); break;
                case OpasToiminto.Tauko: Tauko(true); break;
                case OpasToiminto.Jatka: if (silmukka.KierrosKeskeytetty) JatkaKierrosta(); else Tauko(false); break;
                default:
                    if (!string.IsNullOrWhiteSpace(v.Teksti)) { Valmistele(vastaus); silmukka.Esita(vastaus); }
                    break;
            }
        }

        /// <summary>Toiminnon kuittaus ("Lennetään Nyhavniin.") siltalauseen kanavalla; pysähdyksen kerronta jatkaa sen perään.</summary>
        /// <summary>Vastauksen siirto: alle LahiVastausM nykyisestä kohteesta = sama paikka → vastaus kerrotaan tässä (ei uutta lentoa
        /// eikä toista kerrontaa); kauempana lento, ja keskeytetty kierros säilyy jatkettavana.</summary>
        void LiikuVastauksesta(OpasKysyVastaus v, OpasKohde vastaus, string nimi, double lat, double lon)
        {
            var k = silmukka.NykyinenKehys;
            double et = k != null ? KierrosLento.EtaisyysM(k.Lat, k.Lon, lat, lon) : KierrosLento.EtaisyysM(silmukka.Asento.Lat, silmukka.Asento.Lon, lat, lon);
            if (et < LahiVastausM && !string.IsNullOrWhiteSpace(v.Teksti)) { Valmistele(vastaus); silmukka.Esita(vastaus); return; }
            SoitaKuittaus(v);
            silmukka.LiikuVastauksesta(nimi, lat, lon);
        }
        const double LahiVastausM = 300;

        void SoitaKuittaus(OpasKysyVastaus v)
        {
            if (string.IsNullOrEmpty(v.Aani) || silta == null || !Asetukset.Paalla(Kytkin.Kertoja)) return;
            o.StartCoroutine(SoitaUrl(v.Aani));
        }

        IEnumerator SoitaUrl(string url)
        {
            using var p = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG);
            p.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            PolloTestitunnus.Lisaa(p);
            p.timeout = 10;
            yield return p.SendWebRequest();
            if (p.result != UnityWebRequest.Result.Success || silmukka == null || puhuu) yield break;
            silta.clip = DownloadHandlerAudioClip.GetContent(p); silta.volume = KertojanTaso; silta.Play();
        }

        /// <summary>Saapuessa: pysähdyksen omat kysymykset, muuten GET /opas/kysymykset (worker esihakee ne jo taustalla).</summary>
        void PaivitaKysymykset(OpasKohde k)
        {
            jatkoKysymykset = Array.Empty<string>();
            // Esitys (kaupunkitila): /opas/kysymykset haetaan aina, koska se palauttaa myös valmiin "Kerro lisää" -tekstin (#4126).
            if (k.Kysymykset != null && k.Kysymykset.Length > 0) { kysymykset = k.Kysymykset; if (!Kaupunkitila || Testi || string.IsNullOrEmpty(k.Id)) return; }
            else kysymykset = null;
            if (!Testi && !string.IsNullOrEmpty(k.Id)) o.StartCoroutine(HaeKysymykset(k));
        }

        IEnumerator HaeKysymykset(OpasKohde k)
        {
            using var r = Pyynto($"/opas/kysymykset?paikka={UnityWebRequest.EscapeURL(k.Id)}&nimi={UnityWebRequest.EscapeURL(k.Nimi ?? "")}&kaupunki={UnityWebRequest.EscapeURL(Aloituskaupunki)}");
            yield return r.SendWebRequest();
            if (silmukka == null || silmukka.Nykyinen?.Id != k.Id) yield break;
            string[] lista = null;
            if (r.result == UnityWebRequest.Result.Success && MiniJson.Jasenna(r.downloadHandler.text) is Dictionary<string, object> j
                && j.TryGetValue("kysymykset", out var ko) && ko is IList<object> l)
            {
                var t = new List<string>();
                foreach (var x in l) if (x is string s && !string.IsNullOrWhiteSpace(s)) t.Add(s.Trim());
                lista = t.ToArray();
            }
            if (r.result == UnityWebRequest.Result.Success && MiniJson.Jasenna(r.downloadHandler.text) is Dictionary<string, object> jl
                && jl.TryGetValue("kerro_lisaa_teksti", out var kt) && kt is string kts && !string.IsNullOrWhiteSpace(kts))
            {
                string S(string n) => jl.TryGetValue(n, out var x) ? x as string : null;
                double D(string n, double o0) => jl.TryGetValue(n, out var x) && x != null && !(x is string) ? Convert.ToDouble(x, System.Globalization.CultureInfo.InvariantCulture) : o0;
                kerroLisaa = new OpasKohde { Id = k.Id + "-lisaa", Nimi = k.Nimi, Alarivi = k.Alarivi, Teksti = kts.Trim(), Aani = S("kerro_lisaa_aani"),
                    AaniPcm = S("kerro_lisaa_aani_pcm"), AaniAjat = S("kerro_lisaa_aani_ajat"), AaniTaajuus = (int)D("kerro_lisaa_aani_taajuus", 24000), KestoS = D("kerro_lisaa_kesto_s", 0),
                    Lat = k.Lat, Lon = k.Lon, KokoM = k.KokoM, KorkeusM = k.KorkeusM, Luokka = k.Luokka, Kuvat = k.Kuvat, Korostus = k.Korostus, Kierros = true };
                kerroLisaaId = k.Id;
            }
            if (lista == null || lista.Length == 0) lista = k.Kysymykset;
            k.Kysymykset = lista;
            kysymykset = OpasKysyVastaus.Yhdista(jatkoKysymykset, lista ?? Array.Empty<string>());
            kysymystenId = k.Id; kysymystenNimi = k.Nimi;
            o.Kirjaa($"opas: kysymykset {kysymykset.Length} ({k.Nimi}){(kerroLisaaId == k.Id ? ", kerro lisää valmiina" + (kerroLisaa.AaniAvain == null ? " (ei ääntä)" : "") : "")}");
        }

        /// <summary>Liiku-lista kaupungin vaihtuessa (ja avauksessa): GET /opas/liiku?kaupunki=…</summary>
        // ---- SALLITUT KAUPUNGIT (omistaja 7.10. 00.4x; LS2:n lista Pöllön /opas/aineistot "sallitut", juna 157) ----
        static List<OpasSallitut.Kaupunki> sallitut;
        static float sallitutHaettu = -1e9f;
        const float SallitutUusintaS = 600f;
        static List<OpasTaky> sallitutTakyt = new List<OpasTaky>();
        /// <summary>Aloitusvalikon kaupunkiehdotukset (Natiivi-UI): vain sallitut kaupungit, Id = kaupungin tunnus. Tyhjä, kunnes
        /// lista on haettu tai jos palvelin ei vielä palauta sitä (silloin ei rajausta).</summary>
        public static IReadOnlyList<OpasTaky> SallitutKaupungit => sallitutTakyt;
        public static event Action SallitutVaihtui;
        /// <summary>Saako pisteeseen lentää (Kysy, Liiku, vapaa liike); lista tyhjä = kyllä.</summary>
        public static bool SallittuPiste(double lat, double lon) => OpasSallitut.Sallittu(sallitut, lat, lon);
        /// <summary>Sallittu kaupunki, jonka alueella piste on (vapaan liikkeen rajaus: OpasSallitut.Rajaa); null = ei rajausta tai ulkona.</summary>
        public static OpasSallitut.Kaupunki SallittuKaupunki(double lat, double lon) => OpasSallitut.Sisalla(sallitut, lat, lon);

        // Viimeisin saatu lista säilyy (Päätoimittaja 7.10. 01.1x: hetkellinen verkkokatko ei saa avata kaikkia kaupunkeja): levylle
        // Documents/opas-sallitut.json; epäonnistunut haku tai tyhjä vastaus ei korvaa olemassa olevaa listaa.
        static string SallitutPolku => System.IO.Path.Combine(Application.persistentDataPath, "opas-sallitut.json");

        static void LueSallitutLevylta()
        {
            try
            {
                if (!System.IO.File.Exists(SallitutPolku)) return;
                var lj = MiniJson.Jasenna(System.IO.File.ReadAllText(SallitutPolku));
                LueEsittelyPolut(lj);
                yksPolut = OpasYksityiskohdat.LuePolut(lj);
                var l = OpasSallitut.Lue(lj);
                if (l.Count > 0) { AsetaSallitut(l); Debug.Log($"MATKAKIRJA linssit: opas: sallitut kaupungit levyltä {l.Count}"); }
            }
            catch (Exception) { }
        }

        static void AsetaSallitut(List<OpasSallitut.Kaupunki> l)
        {
            sallitut = l;
            sallitutTakyt = l.ConvertAll(k => new OpasTaky { Id = k.Id, Nimi = k.Nimi, Kaupunki = k.Nimi, Lat = k.Lat, Lon = k.Lon });
            if (Viimeisin != null && Viimeisin.silmukka != null) Viimeisin.silmukka.Sallitut = SilmukanSallitut;
            SallitutVaihtui?.Invoke();
            PalloKuvatEsiin();
        }

        // KUUMAILMAPALLON LATAUSKUVA (Päätoimittaja 7.10. 13.5x, Codex PR #4143): kaupunkitilan siirtymän tausta (Natiivi-UI:n
        // OpasValikko piirtää). Laitteen rajaukset ladataan välimuistiin Documents/latauskuvat/, kun sallittujen lista saapuu
        // (kartta), jotta kuva on valmiina jo ensimmäisessä siirtymässä (simu 14.15: iPadilla 2 s mustaa ilman esilatausta).
        const string PalloKuvaJuuri = "https://media.matkakirja.app/julisteet/latauskuva-kuumailmapallo/20261007/";
        static readonly string[] PalloKuvat = { "latauskuva-pallo-iphone.png", "latauskuva-pallo-ipad-pysty.png", "latauskuva-pallo-ipad-vaaka.png" };
        static readonly HashSet<string> palloHaussa = new HashSet<string>();
        public static string PalloKuvaPolku(string n) => System.IO.Path.Combine(Application.persistentDataPath, "latauskuvat", n);
        static bool PalloIpad => Mathf.Min(Screen.width, Screen.height) / Mathf.Max(Mathf.Max(Screen.width, Screen.height), 1f) >= 0.6f;
        /// <summary>Ruudun rajaus: iPhone pysty, iPad pysty tai vaaka (myös iPhone vaaka).</summary>
        public static string PalloKuvaRuudulle() => Screen.width > Screen.height ? PalloKuvat[2] : PalloIpad ? PalloKuvat[1] : PalloKuvat[0];

        static void PalloKuvatEsiin()
        {
            if (sallitut == null || sallitut.Count == 0) return;
            HaePalloKuva(PalloIpad ? PalloKuvat[1] : PalloKuvat[0]);
            HaePalloKuva(PalloKuvat[2]);
            if (!Auki) PalloTekstuuriMuistiin();
        }

        // Purettu tekstuuri valmiiksi muistiin kartalla (Cesium kiinni, muistia vapaana): simu 14.24 iPad 2048×2732 PNG:n
        // purku vei siirtymän alussa ~4 s Cesiumin käynnistyksen rinnalla. Vapautetaan siirtymän jälkeen (UI), uudelleen kun
        // kaupunkitila päättyy (takaisin kartalle).
        static Texture2D palloTekstuuri; static string palloTekstuuriNimi, palloPyydetty; static bool palloPurussa;
        /// <summary>Tekstuuri purettu muistiin (pääsäikeessä).</summary>
        public static event Action PalloTekstuuriValmis;
        /// <summary>Muistissa oleva purettu rajaus, jos se on <paramref name="n"/>; muuten null.</summary>
        public static Texture2D PalloTekstuuri(string n) => palloTekstuuri != null && palloTekstuuriNimi == n ? palloTekstuuri : null;

        /// <summary>Purkaa rajauksen (oletus: ruudun) muistiin; puuttuva tiedosto ladataan ensin ja puretaan sitten.</summary>
        public static void PalloTekstuuriMuistiin(string n = null)
        {
            n ??= PalloKuvaRuudulle();
            if (PalloTekstuuri(n) != null) { PalloTekstuuriValmis?.Invoke(); return; }
            palloPyydetty = n;
            if (!System.IO.File.Exists(PalloKuvaPolku(n))) { HaePalloKuva(n); return; }
            if (palloPurussa) return;
            palloPurussa = true;
            float alku = Time.realtimeSinceStartup;
            var r = UnityWebRequestTexture.GetTexture("file://" + PalloKuvaPolku(n), true);
            r.SendWebRequest().completed += _ =>
            {
                palloPurussa = false;
                var t = r.result == UnityWebRequest.Result.Success ? DownloadHandlerTexture.GetContent(r) : null;
                r.Dispose();
                if (t == null) { KirjaaS("opas: pallon latauskuva ei auennut " + n); return; }
                if (palloTekstuuri != null) UnityEngine.Object.Destroy(palloTekstuuri);
                palloTekstuuri = t; palloTekstuuriNimi = n;
                KirjaaS($"opas: pallon latauskuva muistissa {n} ({t.width}×{t.height}, {Time.realtimeSinceStartup - alku:F1} s)");
                if (palloPyydetty != null && palloPyydetty != n) { var m = palloPyydetty; palloPyydetty = null; PalloTekstuuriMuistiin(m); return; }
                palloPyydetty = null;
                PalloTekstuuriValmis?.Invoke();
            };
        }

        // KIERTO KARTALLA (Natiivi-UI 9.10., BUILD 167 -ajo: latauskuva musta, koska muistissa oli ipad-pysty ja siirtymä tarvitsi
        // vaakarajauksen, jonka purku ei ehtinyt kuormassa): kun ruudun asento vaihtuu kartalla, uuden asennon rajaus puretaan heti.
        static bool? edellinenVaaka;
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void KytkeKierto() { Application.onBeforeRender -= TarkistaKierto; Application.onBeforeRender += TarkistaKierto; }
        static void TarkistaKierto()
        {
            bool vaaka = Screen.width > Screen.height;
            if (edellinenVaaka == vaaka) return;
            bool muuttui = edellinenVaaka.HasValue;
            edellinenVaaka = vaaka;
            if (muuttui && !Auki && sallitut != null && sallitut.Count > 0)
            {
                KirjaaS($"opas: ruutu kiertyi ({(vaaka ? "vaaka" : "pysty")}), latauskuva {PalloKuvaRuudulle()} muistiin");
                PalloTekstuuriMuistiin();
            }
        }

        /// <summary>Siirtymän jälkeen: tekstuuri pois muistista.</summary>
        public static void VapautaPalloTekstuuri()
        {
            palloPyydetty = null;
            if (palloTekstuuri == null) return;
            UnityEngine.Object.Destroy(palloTekstuuri); palloTekstuuri = null; palloTekstuuriNimi = null;
        }

        public static void HaePalloKuva(string n)
        {
            string polku = PalloKuvaPolku(n);
            if (System.IO.File.Exists(polku) || !palloHaussa.Add(n)) return;
            try { System.IO.Directory.CreateDirectory(System.IO.Path.GetDirectoryName(polku)); } catch (Exception) { palloHaussa.Remove(n); return; }
            var r = UnityWebRequest.Get(PalloKuvaJuuri + n);
            r.downloadHandler = new DownloadHandlerFile(polku + ".osa") { removeFileOnAbort = true };
            r.timeout = 60;
            r.SendWebRequest().completed += _ =>
            {
                bool ok = r.result == UnityWebRequest.Result.Success;
                r.Dispose();
                try { if (ok) System.IO.File.Move(polku + ".osa", polku); else System.IO.File.Delete(polku + ".osa"); } catch (Exception) { ok = false; }
                palloHaussa.Remove(n);
                KirjaaS($"opas: pallon latauskuva {n} {(ok ? "välimuistiin" : "ei latautunut")}");
                if (ok && (palloPyydetty == n || (!Auki && n == PalloKuvaRuudulle()))) PalloTekstuuriMuistiin(n);
            };
        }

        static void KirjaaS(string t) => Debug.Log("MATKAKIRJA linssit: " + t);

        /// <summary>Sallitut kaupungit (Pöllön /opas/aineistot "sallitut"; LS2:n karttaelementit): tyhjä, kunnes haettu tai levyltä
        /// luettu. Muutos: SallitutVaihtui.</summary>
        public static IReadOnlyList<OpasSallitut.Kaupunki> SallitutLista => (IReadOnlyList<OpasSallitut.Kaupunki>)sallitut ?? Array.Empty<OpasSallitut.Kaupunki>();

        /// <summary>Lista ilman oppaan avausta (kartta): levyltä heti ja palvelimelta, jos edellisestä hausta on yli 10 min.</summary>
        public static void LataaSallitut()
        {
            if (sallitut == null) LueSallitutLevylta();
            var lo = LinssiOhjain.Instanssi;
            if (lo != null && !sallitutHaussa && (sallitut == null || Time.realtimeSinceStartup - sallitutHaettu > SallitutUusintaS))
                lo.StartCoroutine(HaeSallitutKerran());
        }
        static bool sallitutHaussa;
        static IEnumerator HaeSallitutKerran() { sallitutHaussa = true; try { yield return HaeSallitut(); } finally { sallitutHaussa = false; } }

        // ---- KAUPUNKITILA (omistaja 7.10. 08.3x, Päätoimittaja: kaupunkiopas karttaelementtinä, juna 159) ----
        // Kartan kaupunkielementti (LS2, kuumailmapallo) avaa oppaan suoraan yhteen sallittuun kaupunkiin ilman aloitusvalintaa.
        // Kaupunkitilassa Kysy, Liiku ja Seuraava toimivat vain sen kaupungin alueella: silmukan sallittu alue on vain tämä
        // kaupunki, ja kaupungin vaihto (valikko, "vie minut X", workerin kaupunki-toiminto #4107) torjutaan nykyisellä
        // torjuntatekstillä ilman lentoa. Linssivalikon Elävä opas (laaja) toimii ennallaan: tila päättyy oppaan sulkeutuessa.
        static OpasSallitut.Kaupunki kaupunkitila;
        /// <summary>Kaupunkitilan kaupungin tunnus (sallittujen listan id); null = laaja opas.</summary>
        public static string KaupunkitilaId => kaupunkitila?.Id;
        /// <summary>Opas avattiin kartan kaupunkielementistä yhteen kaupunkiin (Natiivi-UI: ei aloitusvalintaa eikä Vaihda kohde -riviä).</summary>
        public static bool Kaupunkitila => kaupunkitila != null;
        /// <summary>Kaupunkitila alkoi tai päättyi.</summary>
        public static event Action KaupunkitilaVaihtui;
        static IReadOnlyList<OpasSallitut.Kaupunki> SilmukanSallitut =>
            kaupunkitila != null ? new[] { kaupunkitila } : (IReadOnlyList<OpasSallitut.Kaupunki>)sallitut ?? Array.Empty<OpasSallitut.Kaupunki>();

        static void AsetaKaupunkitila(OpasSallitut.Kaupunki k)
        {
            if (kaupunkitila == k) return;
            kaupunkitila = k;
            if (k != null) EsilataaYksityiskohdat(k.Id);   // yksityiskohtakuvat valmiiksi ennen avausta
            if (Viimeisin != null && Viimeisin.silmukka != null) Viimeisin.silmukka.Sallitut = SilmukanSallitut;
            KirjaaS(k != null ? $"opas: kaupunkitila {k.Nimi} ({k.Id})" : "opas: kaupunkitila päättyi");
            if (k == null) PalloTekstuuriMuistiin();   // takaisin kartalle: seuraavan siirtymän kuva valmiiksi
            KaupunkitilaVaihtui?.Invoke();
        }

        /// <summary>
        /// Kartan kaupunkielementti: oppaan linssi auki suoraan kaupunkiin <paramref name="kaupunkiId"/> (sallittujen listan id tai
        /// nimi) kaupunkitilassa. Jos opas on jo auki, se siirtyy kaupunkiin ja jää kaupunkitilaan. false = tuntematon kaupunki
        /// (lista ei vielä haettu tai kaupunki ei sallittu) tai linssejä ei ole.
        /// </summary>
        public static bool AvaaKaupunkitila(string kaupunkiId)
        {
            if (string.IsNullOrWhiteSpace(kaupunkiId)) return false;
            if (sallitut == null) LueSallitutLevylta();
            var k = sallitut?.Find(x => string.Equals(x.Id, kaupunkiId, StringComparison.OrdinalIgnoreCase)) ?? OpasSallitut.Nimella(sallitut, kaupunkiId);
            if (k == null) { KirjaaS($"opas: kaupunkitila {kaupunkiId}: ei sallittujen listalla ({sallitut?.Count ?? 0})"); return false; }
            var rek = LinssiOhjain.Rekisteri;
            if (rek == null) return false;
            AsetaKaupunkitila(k);
            esitysAlkaa = true;
            Aloituskaupunki = k.Nimi; AloitusKeskusta = (k.Lat, k.Lon);
            if (Auki) return VaihdaKaupunki(k.Nimi, k.Lat, k.Lon);
            rek.Valitse(OpasTiedot.Id);
            return true;
        }


        static IEnumerator HaeSallitut()
        {
            sallitutHaettu = Time.realtimeSinceStartup;
            using var r = Pyynto("/opas/aineistot");
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success)
            { KirjaaS($"opas: sallitut kaupungit ei latautunut ({r.responseCode}), {(sallitut != null && sallitut.Count > 0 ? $"pidetään {sallitut.Count} edellistä" : "ei rajausta")}"); yield break; }
            var teksti = r.downloadHandler.text;
            var hj = MiniJson.Jasenna(teksti);
            LueEsittelyPolut(hj);
            yksPolut = OpasYksityiskohdat.LuePolut(hj);
            if (kaupunkitila != null) EsilataaYksityiskohdat(kaupunkitila.Id);
            var l = OpasSallitut.Lue(hj);
            if (l.Count == 0 && sallitut != null && sallitut.Count > 0) { KirjaaS($"opas: sallitut-lista tyhjä vastauksessa, pidetään {sallitut.Count} edellistä"); yield break; }
            if (l.Count > 0) try { System.IO.File.WriteAllText(SallitutPolku, teksti); } catch (Exception) { }
            KirjaaS($"opas: sallitut kaupungit {l.Count}{(l.Count == 0 ? " (ei rajausta)" : ": " + string.Join(", ", l.ConvertAll(k => k.Nimi)))}");
            AsetaSallitut(l);
        }

        void PaivitaKohteet()
        {
            if (Testi || string.IsNullOrEmpty(Aloituskaupunki) || kohteetKaupunki == Aloituskaupunki) return;
            kohteetKaupunki = Aloituskaupunki; kohteet = null; kierrosKohteet = null;
            o.StartCoroutine(HaeKohteet(Aloituskaupunki));
        }

        IEnumerator HaeKohteet(string kaupunki)
        {
            var (aLat, aLon) = PyynnonPaikka();
            using var r = Pyynto($"/opas/liiku?kaupunki={UnityWebRequest.EscapeURL(kaupunki)}&lat={aLat.ToString("F4", System.Globalization.CultureInfo.InvariantCulture)}&lon={aLon.ToString("F4", System.Globalization.CultureInfo.InvariantCulture)}");
            yield return r.SendWebRequest();
            if (silmukka == null || kohteetKaupunki != kaupunki) yield break;
            var lj = r.result == UnityWebRequest.Result.Success ? MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object> : null;
            kohteet = lj != null ? OpasTaky.Lue(lj) : new List<OpasTaky>();
            kierrosKohteet = OpasTaky.Kierros(lj, kohteet);
            // Lyhin reitti kehityskaupungeissa (omistaja 9.10.: "liikuttaisiin mahdollisimman lyhyitä reittejä"; Päätoimittaja: kaukaiset
            // kohteet pois, jos ne venyttävät reittiä): ensimmäinen pysyy (avaus osoittaa sitä), muut lyhimpään järjestykseen.
            if (OpasSilmukka.PalloLento && kierrosKohteet.Count > 2 && Kehityskaupungit.Lahella(kierrosKohteet[0].Lat, kierrosKohteet[0].Lon) != null)
            {
                double ennen = OpasReitti.Pituus(kierrosKohteet, t => (t.Lat, t.Lon));
                kierrosKohteet = OpasReitti.Lyhin(kierrosKohteet, t => (t.Lat, t.Lon), out var pois);
                o.Kirjaa($"opas: lyhin reitti {ennen / 1000:F1} → {OpasReitti.Pituus(kierrosKohteet, t => (t.Lat, t.Lon)) / 1000:F1} km{(pois.Count > 0 ? ", pois: " + string.Join(", ", pois.ConvertAll(x => x.Nimi)) : "")}");
            }
            o.Kirjaa($"opas: liiku-lista {kohteet.Count} ({kaupunki} {aLat:F3}/{aLon:F3}, {(r.result == UnityWebRequest.Result.Success ? "ok" : r.responseCode.ToString())})");
        }

        /// <summary>Pöllö-pyyntö natiiviotsakkein (GET, tai POST jos body).</summary>
        static UnityWebRequest Pyynto(string polku, string body = null)
        {
            var r = body == null ? UnityWebRequest.Get(PuluChat.Palvelin + polku)
                : new UnityWebRequest(PuluChat.Palvelin + polku, "POST") { uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(body)), downloadHandler = new DownloadHandlerBuffer() };
            r.timeout = AikarajaS;
            if (body != null) r.SetRequestHeader("Content-Type", "application/json");
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            string koodi = Asetukset.PolloKoodi;
            if (!string.IsNullOrEmpty(koodi)) r.SetRequestHeader(Lukijaaani.KoodiOtsake, koodi);
            if (GizaKokeilu) r.SetRequestHeader("x-matkakirja-kokeilu", "giza");
            PolloTestitunnus.Lisaa(r);
            return r;
        }

        /// <summary>Gizan kokeilu (omistaja 7.10. 08.4x, Päätoimittaja: vain kehityskäännökset): Pöllö listaa Gizan sallituissa ja
        /// palauttaa sen kohteet vain otsakkeella x-matkakirja-kokeilu: giza (Pelikoodari #4116). App Store -käännöksessä aina pois.</summary>
#if MATKAKIRJA_APPSTORE
        public static bool GizaKokeilu => false;
#else
        public static bool GizaKokeilu => Asetukset.Kehittaja || Linssirekisteri.Kehittajatila;
#endif

        // Natiivi-UI:n nimet siirtoruudulle (tapahtumat reunoista PaivitaKamerassa).
        public static event Action<string> SiirtymaAlkaa;
        public static event Action SiirtymaValmis;
        public static float SiirtymaEdistyminen => SiirtymaEdistys;
        bool siirtymaEdellinen;
        /// <summary>Karkea laattavalinta tarkentuu pysähdyksellä viimeistään tämän ajan kuluttua, vaikka laatat eivät ole 99 %.</summary>
        public const double TarkennaViimeistaanS = 4.0;

        // ---- KUVASUURENNOKSEN SUMENNUS (omistaja 12.1x): kevyt Gaussian-syväterävyys koko kuvalle ja kamera seis ----
        UnityEngine.Rendering.Volume sumennus;
        bool vanhaJalkikasittely, sumeana;
        /// <summary>Natiivi-UI: Kuvasuurennoksen AukiMuuttui → KuvaSumennus = auki (sama kuin Sumenna).</summary>
        public static bool KuvaSumennus { get => Viimeisin != null && Viimeisin.sumeana; set => Sumenna(value); }
        public static void Sumenna(bool paalle)
        {
            var v = Viimeisin;
            if (v == null || v.silmukka == null || v.sumeana == paalle) return;
            v.sumeana = paalle;
            v.silmukka.KameraSeis = paalle;
            var kamera = v.kaupunki.Kamera;
            if (kamera == null) return;
            var lisa = UnityEngine.Rendering.Universal.CameraExtensions.GetUniversalAdditionalCameraData(kamera);
            if (paalle)
            {
                if (v.sumennus == null)
                {
                    var go = new GameObject("OpasSumennus");
                    v.sumennus = go.AddComponent<UnityEngine.Rendering.Volume>();
                    v.sumennus.isGlobal = true; v.sumennus.priority = 100;
                    var profiili = ScriptableObject.CreateInstance<UnityEngine.Rendering.VolumeProfile>();
                    var dof = profiili.Add<UnityEngine.Rendering.Universal.DepthOfField>(true);
                    dof.mode.Override(UnityEngine.Rendering.Universal.DepthOfFieldMode.Gaussian);
                    dof.gaussianStart.Override(0f); dof.gaussianEnd.Override(1f); dof.gaussianMaxRadius.Override(1.5f); dof.highQualitySampling.Override(false);
                    v.sumennus.sharedProfile = profiili;
                }
                v.sumennus.weight = 1f; v.sumennus.enabled = true;
                if (lisa != null) { v.vanhaJalkikasittely = lisa.renderPostProcessing; lisa.renderPostProcessing = true; }
            }
            else
            {
                if (v.sumennus != null) v.sumennus.enabled = false;
                if (lisa != null) lisa.renderPostProcessing = v.vanhaJalkikasittely;
            }
            v.o.Kirjaa($"opas: sumennus {(paalle ? "päälle" : "pois")}");
        }

        // ---- SIIRTO ILMAN LENTOA (UI: tumma ruutu "Siirrytään", nimi ja latauspalkki; Natiivi-UI) ----
        public static bool Siirtymassa => Viimeisin?.silmukka != null && Viimeisin.silmukka.Siirtymassa;
        public static string SiirtymaNimi => Viimeisin?.silmukka?.SiirtoNimi;
        /// <summary>0–1: kohdekameran laattojen todellinen latausaste; näkymä aukeaa 0,95:ssä (enintään 25 s).</summary>
        public static float SiirtymaEdistys => Viimeisin?.silmukka != null ? (float)Viimeisin.silmukka.SiirtoEdistys : 0f;

        // ---- KAUPUNKIEN KESKUSTAT (Päätoimittaja 6.10. 00.4x: Amsterdam laskeutui Natural Earthin pisteeseen 2,5 km keskustasta) ----
        /// <summary>
        /// Valikon kaupunkipisteet ovat Natural Earthin asutuspaikkoja, jotka voivat olla kilometrien päässä keskustasta. Korjaustaulu
        /// Resources/Opas/keskustat.json: "lat,lon" (4 desimaalia, paikat.json:n arvot) → Wikidata P625 (NE:n WIKIDATAID), vain kun
        /// ero on 250 m – 30 km. Muuten piste sellaisenaan.
        /// </summary>
        public static (double lat, double lon) Keskusta(double lat, double lon)
        {
            if (keskustat == null)
            {
                keskustat = new Dictionary<string, (double, double)>(StringComparer.Ordinal);
                var ta = Resources.Load<TextAsset>("Opas/keskustat");
                if (ta != null && MiniJson.Jasenna(ta.text) is Dictionary<string, object> j && j.TryGetValue("keskustat", out var ko) && ko is Dictionary<string, object> kd)
                    foreach (var kv in kd)
                        if (kv.Value is IList<object> l && l.Count >= 2)
                            keskustat[kv.Key] = (Convert.ToDouble(l[0], System.Globalization.CultureInfo.InvariantCulture), Convert.ToDouble(l[1], System.Globalization.CultureInfo.InvariantCulture));
            }
            string avain = lat.ToString("F4", System.Globalization.CultureInfo.InvariantCulture) + "," + lon.ToString("F4", System.Globalization.CultureInfo.InvariantCulture);
            return keskustat.TryGetValue(avain, out var k) ? k : (lat, lon);
        }
        static Dictionary<string, (double, double)> keskustat;

        // ---- TAUKO JA TÄKYLUETTELO (omistaja TF 144, juna 146; UI Natiivi-UI heijastuksella) ----
        /// <summary>UI asettaa true, kun se näyttää täkyluettelon avauksessa; muuten opas alkaa kuten ennen (vanha UI).</summary>
        // ---- SEURAAVA-NAPPI (›|; omistaja 6.10. 23.3x; Natiivi-UI tekee napin play/pausen viereen, juna 156) ----
        /// <summary>Seuraava-nappi käytettävissä (opas käynnissä, ei siirtoruutua).</summary>
        public static bool SeuraavaKaytettavissa => Auki && Viimeisin.silmukka.SeuraavaKaytettavissa;
        /// <summary>Ohittaa nykyisen kohteen ja siirtyy seuraavaan (myös kierroksella ja vapaassa tilassa). true = ohitettiin.</summary>
        public static bool Seuraava()
        {
            if (!Auki) return false;
            var v = Viimeisin;
            if (v.tauolla) Tauko(false);
            var s = v.silmukka;
            // KIERROKSEN ULKOPUOLELLA (VIE-savu 3332027d 7.10. 05.1x: Eiffel valinnasta → Seuraava → worker "odota" #4034, opas jäi
            // paikalleen): workerin vapaa seuraava ei tule ilman pelaajan valintaa, joten Seuraava jatkaa kaupungin kohdelistan
            // (kierros-järjestys, muuten Liiku-lista) seuraavasta näkemättömästä kohteesta kierroksena.
            // Kierroksen viimeinen kohde (Päätoimittaja 05.2x: "viimeisen kohteen jälkeen ei jumia") lasketaan kierroksen loppumiseksi.
            bool kierrosLopussa = s.KierrosKaynnissa && s.KierrosTieto.Item2 > 0 && s.KierrosTieto.Item1 >= s.KierrosTieto.Item2;
            if ((!s.KierrosKaynnissa || kierrosLopussa) && !s.KierrosKeskeytetty && s.SeuraavaKaytettavissa)
            {
                string ohitettu = s.Nykyinen?.Nimi;
                var jono = SeuraavatKohteet(v);
                v.LatausKuvaPois("ohitus");
                if (jono.Count > 0)
                {
                    s.AloitaKierros(jono);
                    v.Silta(OpasSiltalauseet.Valinta, true);
                    v.o.Kirjaa($"opas: seuraava (ohitettiin {ohitettu}) → kohdelistan kierros {jono.Count} kohdetta, ensin {jono[0].Item1}");
                    return true;
                }
                // Kaikki listan kohteet nähty: pelaajan puolesta toive (worker vastaa toiveeseen pysähdyksellä, ei "odota").
                s.Toive(SeuraavaToive);
                v.o.Kirjaa($"opas: seuraava (ohitettiin {ohitettu}) → kohdelista käyty, toive \"{SeuraavaToive}\"");
                return true;
            }
            bool ok = s.OhitaKohde();
            if (ok) { v.LatausKuvaPois("ohitus"); v.o.Kirjaa($"opas: seuraava (ohitettiin {s.Nykyinen?.Nimi})"); }
            return ok;
        }

        /// <summary>Seuraava, kun kohdelista on käyty: toive workerille (vapaa seuraava ilman toivetta palauttaa "odota").</summary>
        public const string SeuraavaToive = "Näytä jokin toinen kiinnostava paikka läheltä.";

        /// <summary>Kaupungin kohdelista (kierros-järjestys, muuten Liiku-lista) ilman nähtyjä ja nykyistä kohdetta (Id tai alle 80 m).</summary>
        static List<(string, double, double)> SeuraavatKohteet(OpasSovitin v)
        {
            var l = new List<(string, double, double)>();
            var lahde = v.kierrosKohteet ?? v.kohteet;
            if (lahde == null) return l;
            var nahdyt = new HashSet<string>(v.silmukka.Nahdyt);
            var nyt = v.silmukka.Nykyinen;
            foreach (var t in lahde)
            {
                if (t.Id != null && nahdyt.Contains(t.Id)) continue;
                if (nyt != null && (t.Id != null && t.Id == nyt.Id || KierrosLento.EtaisyysM(t.Lat, t.Lon, nyt.Lat, nyt.Lon) < 80)) continue;
                l.Add((t.Nimi, t.Lat, t.Lon));
            }
            return l;
        }

        // ---- KUVA LATAUKSEN AJAKSI (omistaja 23.3x: "näyttää automaattisesti yhden kuvan 80% kokoisena", juna 156) ----
        /// <summary>Saavuttaessa laattoja alle LatausKuvaRaja: kohteen ensimmäinen kuva (Natiivi-UI näyttää 80 %:n kokoisena
        /// Kuvasuurennoksen pohjalla); null, kun laattoja on ≥ raja tai LatausKuvaMaxS kului. Ei kuvaa → ei näytetä.</summary>
        public static OpasKuva LatausKuva => Auki ? Viimeisin.latausKuva : null;
        public static event Action<OpasKuva> LatausKuvaVaihtui;
        public const float LatausKuvaRaja = 90f, LatausKuvaMaxS = 8f;
        OpasKuva latausKuva; float latausKuvaAlku, saapumisAika = -1f;

        void LatausKuvaPaivita()
        {
            // Tarkka näkymä saapumisesta (mittari ennen/jälkeen esilatauksen, Päätoimittaja: Pariisi ja Sydney).
            if (saapumisAika > 0 && kaupunki.Latausaste >= CesiumKaupunki.ValmisProsentti && !kaupunki.KarkeaKaytossa)
            { o.Kirjaa($"opas: tarkka näkymä {Time.realtimeSinceStartup - saapumisAika:F1} s saapumisesta ({silmukka.Nykyinen?.Nimi})"); saapumisAika = -1f; }
            if (latausKuva == null) return;
            if (kaupunki.Latausaste >= LatausKuvaRaja) LatausKuvaPois($"laatat {kaupunki.Latausaste:F0} %");
            else if (Time.realtimeSinceStartup - latausKuvaAlku > LatausKuvaMaxS) LatausKuvaPois("aikaraja");
            else if (silmukka.Vaihe == OpasVaihe.Lentaa) LatausKuvaPois("lento");
        }

        void LatausKuvaPois(string syy)
        {
            if (latausKuva == null) return;
            latausKuva = null;
            o.Kirjaa($"opas: latauskuva pois ({syy}, {Time.realtimeSinceStartup - latausKuvaAlku:F1} s)");
            LatausKuvaVaihtui?.Invoke(null);
        }

        public static bool TakyAvaus;
        /// <summary>Täkyt (null = latautuu, tyhjä = ei saatu); UI lukee avauksessa.</summary>
        public static IReadOnlyList<OpasTaky> Takyt => Viimeisin?.takyt;
        public static bool Tauolla => Viimeisin != null && Viimeisin.tauolla;
        List<OpasTaky> takyt;
        bool tauolla;
        float taukoAlku;

        /// <summary>Pause (UI:n II/▶): kerronta, siltalause, lento ja kierto seis; jatka palauttaa ne kohdasta. true = otettu oppaalle.</summary>
        public static bool Tauko(bool paalle)
        {
            if (!Auki) return false;
            var v = Viimeisin;
            if (v.tauolla == paalle) return true;
            v.tauolla = paalle; v.silmukka.Tauolla = paalle;
            if (paalle)
            {
                v.taukoAlku = Time.unscaledTime;
                v.puhe?.Pause(); v.silta?.Pause();
                if (v.nimiSoitto != null) { v.o.StopCoroutine(v.nimiSoitto); v.nimiSoitto = null; }
            }
            else
            {
                float kesto = Time.unscaledTime - v.taukoAlku;
                if (v.puheLoppuu < float.MaxValue) v.puheLoppuu += kesto;   // klipin loppu siirtyy tauon verran
                if (v.pelaajanToimi > 0) v.pelaajanToimi += kesto;
                v.puhe?.UnPause(); v.silta?.UnPause();
            }
            v.o.Kirjaa($"opas: {(paalle ? "tauko" : "jatkuu")}");
            return true;
        }

        /// <summary>Pelaajan täkyvalinta: opas alkaa (tai siirtyy) kohteen kaupunkiin ja pyytää kohteen. true = otettu oppaalle.</summary>
        public static bool Valitse(OpasTaky t)
        {
            if (!Auki || t == null || string.IsNullOrEmpty(t.Nimi)) return false;
            var v = Viimeisin;
            if (!string.IsNullOrEmpty(t.Kaupunki)) Aloituskaupunki = t.Kaupunki;
            v.pakotettuSijainti = (t.Lat, t.Lon);
            AloitusKeskusta = (t.Lat, t.Lon);
            v.o.Kirjaa($"opas: täky valittu {t.Nimi} ({t.Kaupunki}, {t.Iso2})");
            if (v.tauolla) Tauko(false);
            if (v.kaupunkiOdottaa)
            {
                // Aloitusvalikosta: kartta auki kohteeseen ja siirtoruutu heti; workerin pysähdys pyydetään samalla (Liiku).
                if (!v.AvaaKaupunki(t.Lat, t.Lon, t.Nimi)) return false;
                v.silmukka.Liiku(t.Nimi, t.Lat, t.Lon);
            }
            else v.silmukka.Toive(t.Nimi);
            v.Silta(OpasSiltalauseet.Valinta, true);
            return true;
        }
        /// <summary>Kuten Valitse(OpasTaky) luettelon indeksillä (heijastuksen helpottamiseksi).</summary>
        public static bool Valitse(int indeksi) => Takyt != null && indeksi >= 0 && indeksi < Takyt.Count && Valitse(Takyt[indeksi]);

        /// <summary>Aloituksen suosikit (omistaja 6.10. 14.2x: jopa 50; Pelikoodari #4054 GET /opas/kohteet?n=50). Kylmä 50 kestää
        /// workerilla 30–60 s, joten aikarajan jälkeen haetaan tavalliset 8 täkyä (lämpimät) ennen kuin luovutetaan.</summary>
        public const int SuosikkejaMax = 50;
        public const int SuosikitAikarajaS = 20;

        IEnumerator LataaTakyt()
        {
            List<OpasTaky> lista = null; string tila = "";
            foreach (var polku in new[] { "/opas/kohteet?n=" + SuosikkejaMax, "/opas/kohteet" })
            {
                using var r = UnityWebRequest.Get(PuluChat.Palvelin + polku);
                r.timeout = SuosikitAikarajaS;
                r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
                r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
                PolloTestitunnus.Lisaa(r);
                if (GizaKokeilu) r.SetRequestHeader("x-matkakirja-kokeilu", "giza");
                yield return r.SendWebRequest();
                if (silmukka == null) yield break;
                tila += (tila.Length > 0 ? ", " : "") + polku + " " + (r.result == UnityWebRequest.Result.Success ? "ok" : r.responseCode.ToString());
                if (r.result != UnityWebRequest.Result.Success) continue;
                lista = OpasTaky.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>);
                if (lista.Count > 0) break;
            }
            takyt = lista ?? new List<OpasTaky>();
            o.Kirjaa($"opas: täkyt {takyt.Count} ({tila})");
            if (takyt.Count == 0 && !silmukka.Aloitettu)
            {
                // Ei täkyjä: vanha alku (Kööpenhamina) ja kartta auki heti.
                var a = KoopenhaminaTesti.Alku;
                if (AvaaKaupunki(a.Lat, a.Lon, Aloituskaupunki)) silmukka.Aloita(Aloituskaupunki);
            }
        }

        // ---- MAIDEN JA KAUPUNKIEN NIMET (juna 146; Ydin OpasNimiaanet) ----
        public const string NimetOsoite = "https://media.matkakirja.app/aanet/opas/nimet-v3/nimet.json",   // v3 (Pelikoodari 8.10. ilta, omistaja TF 166 alkukatko): puhe ≥ 120 ms   // v2 (Pelikoodari 6.10.): suomi pakotettuna + 38 uutta jatkoa
            MaatOsoite = "https://media.matkakirja.app/aanet/opas/maat-v2/maat.json";   // v2: puhe ≥ 120 ms (TF 166 alkukatko)
        static OpasNimiaanet nimiaanet;
        static bool nimiaLadataan;
        static readonly Dictionary<string, AudioClip> nimiKlipit = new Dictionary<string, AudioClip>(StringComparer.Ordinal);
        Coroutine nimiSoitto;

        /// <summary>Nimi tai nimi + jatko heti (leikkeet haetaan tarvittaessa, ~0,3 s). false = ei aineistoa → siltalause käy.</summary>
        bool SanoNimi(NimiLeike[] leikkeet)
        {
            pelaajanToimi = Time.unscaledTime;
            if (silmukka != null && silmukka.Siirtymassa) return true;   // ei puhetta latausruudun aikana
            if (leikkeet == null || leikkeet.Length == 0 || silta == null || !Asetukset.Paalla(Kytkin.Kertoja)) return false;
            if (nimiSoitto != null) o.StopCoroutine(nimiSoitto);
            nimiSoitto = o.StartCoroutine(SoitaNimi(leikkeet));
            return true;
        }

        IEnumerator SoitaNimi(NimiLeike[] leikkeet)
        {
            if (silta.isPlaying) silta.Stop();
            foreach (var l in leikkeet)
            {
                if (!nimiKlipit.TryGetValue(l.Url, out var c) || c == null)
                {
                    using var p = UnityWebRequestMultimedia.GetAudioClip(l.Url, AudioType.MPEG);
                    p.timeout = 8;
                    yield return p.SendWebRequest();
                    if (p.result != UnityWebRequest.Result.Success) { o.Kirjaa($"opas: nimi {l.Id} ei latautunut ({p.responseCode})"); continue; }
                    c = DownloadHandlerAudioClip.GetContent(p);
                    if (nimiKlipit.Count > 64) nimiKlipit.Clear();   // pieni välimuisti: kukin leike ~20–60 kt
                    nimiKlipit[l.Url] = c;
                }
                if (silmukka == null || puhuu) yield break;   // kerronta ehti alkaa: nimi jää pois
                silta.clip = c; silta.volume = KertojanTaso; silta.Play();
                o.Kirjaa($"opas: nimi {l.Id} \"{l.Teksti}\"");
                while (silta.isPlaying) yield return null;
            }
            nimiSoitto = null;
        }

        IEnumerator LataaNimiaanet()
        {
            nimiaLadataan = true;
            Dictionary<string, object> n = null, m = null;
            using (var r = UnityWebRequest.Get(NimetOsoite)) { r.timeout = 15; yield return r.SendWebRequest(); if (r.result == UnityWebRequest.Result.Success) n = MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>; }
            using (var r = UnityWebRequest.Get(MaatOsoite)) { r.timeout = 15; yield return r.SendWebRequest(); if (r.result == UnityWebRequest.Result.Success) m = MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>; }
            nimiaanet = OpasNimiaanet.Lue(n, m);
            nimiaLadataan = false;
            o.Kirjaa(nimiaanet != null ? "opas: nimiäänet ladattu" : "opas: nimiäänet ei latautunut");
        }

        // ---- SILTALAUSEET (juna 146; Ydin OpasSiltalauseet) ----
        public const string SiltalauseetOsoite = "https://media.matkakirja.app/aanet/opas/siltalauseet-v4/siltalauseet.json";   // v4 (Pelikoodari 8.10. ilta, omistaja TF 166 "siirtymälauseista jää pätkä alusta pois"): v3b + puhe aikaisintaan 120 ms:n kohdalla, 30 ms:n sisäänhäivytys   // v3b (Pelikoodari 8.10.): v2 + pallo-lahto/-nousu/-kaanto/-lasku (pallo-lasku-04 pois)   // v2 (Pelikoodari 7.10.): v1 + "ei-sallittu" (omistaja hyväksyi 09.4x)
        /// <summary>Kuittaukset-v1 (Pelikoodari 6.10.): kysymys, odotus5, odotus12, virhe; yhdistetään siltalauseisiin.</summary>
        public const string KuittauksetOsoite = "https://media.matkakirja.app/aanet/opas/kuittaukset-v2/kuittaukset.json";   // v2: puhe ≥ 120 ms (TF 166 alkukatko)
        /// <summary>Kysymyksen odotusportaat (juna 150): 5 s / 12 s / 25 s, myöhäinen vastaus hylätään.</summary>
        readonly KysyOdotus kysyOdotus = new KysyOdotus();
        const float OdotusLauseS = 6f, SiltaOdotusS = 5f;
        AudioSource silta;
        OpasSiltalauseet siltalauseet;
        readonly Dictionary<string, AudioClip> siltaKlipit = new Dictionary<string, AudioClip>(StringComparer.Ordinal);
        float pelaajanToimi = -1f;
        OpasKohde siltaOdottaa;

        /// <summary>Lause ryhmästä heti (ei toistoa istunnossa); pelaajan valinnasta käynnistää myös 6 s:n odotus-lauseen ajastimen.
        /// Ei soi, jos Kertoja on pois tai kerronta jo soi.</summary>
        bool Silta(string ryhma, bool pelaajalta)
        {
            if (pelaajalta) pelaajanToimi = Time.unscaledTime;
            if (silmukka != null && silmukka.Siirtymassa) return false;   // kertoja odottaa näkymän aukeamista (omistaja 12.0x)
            if (siltalauseet == null || silta == null || !Asetukset.Paalla(Kytkin.Kertoja) || puhuu || silta.isPlaying) return false;
            // Valmiin esittelyn kaupungissa reitti on jo mietitty (omistaja TF 163): ei "Etsin meille parhaan reitin" -tyyppisiä lauseita.
            if (ValmisEsittely) { ryhma = OpasSiltalauseet.ValmiillaReitilla(ryhma); if (ryhma == null) return false; }
            bool eiVaraa = ryhma == OpasSiltalauseet.Odotus || ryhma == OpasSiltalauseet.OdotusValmis || ryhma == OpasSiltalauseet.Odotus5 || ryhma == OpasSiltalauseet.Odotus12 || ryhma == OpasSiltalauseet.Virhe
                || ryhma == OpasSiltalauseet.EiSallittu;
            var l = siltalauseet.Valitse(ryhma, eiVaraa ? null : OpasSiltalauseet.Kuittaus, x => siltaKlipit.ContainsKey(x.Url));
            if (l == null) return false;
            silta.clip = siltaKlipit[l.Url]; silta.volume = KertojanTaso; silta.Play();
            o.Kirjaa($"opas: siltalause {l.Id} ({ryhma}) \"{l.Teksti}\"");
            return true;
        }

        /// <summary>Torjunnan teksti Pulun chattiin (Natiivi-UI: PuluChat.Vastaa), kun siltalause ei soinut (ei ryhmää, kertoja pois
        /// tai toinen ääni soi); puhuttua ei näytetä tekstinä (PUHE ÄÄNENÄ, EI KUPLINA).</summary>
        public static event Action<string> TorjuntaTeksti;
        public const string EiSallittuTeksti = "Sitä paikkaa ei ole vielä kuvattu tarpeeksi tarkasti. Valitse kohde listasta.";
        void Torjunta() { if (!Silta(OpasSiltalauseet.EiSallittu, true)) TorjuntaTeksti?.Invoke(EiSallittuTeksti); }

        /// <summary>Kierroksen siirtymä: automaattinen lento soittaa "kierros" (yli 20 km "lento"); toiveen lento soitti jo valinnasta.</summary>
        void LentoAlkoi(OpasKohde k, double matkaM, bool toiveesta)
        {
            if (silmukka.KierrosKaynnissa && k != null)
            {
                var jono = silmukka.KierrosJono; int seur = -1;
                for (int i = 0; i < jono.Count; i++)
                    if (string.Equals(jono[i].nimi, k.Nimi, StringComparison.OrdinalIgnoreCase) || KierrosLento.EtaisyysM(jono[i].lat, jono[i].lon, k.Lat, k.Lon) < 80) { seur = i; break; }
                if (seur >= 0) { int nyk = seur - 1; o.Kirjaa($"opas: kierros lähtee {nyk} → {seur}"); KierrosLahtee?.Invoke(nyk, seur, (float)silmukka.LentoKestoS); }
                if (seur == 1) pallolauseet.Nollaa();   // kierroksen ensimmäinen lähtö
            }
            kaupunki.Karkeaksi();   // kaksivaiheinen tarkkuus (juna 153): lento ja saapuminen karkealla valinnalla
            o.Kirjaa($"opas: lento {k.Nimi} {matkaM:F0} m, kesto {silmukka.LentoKestoS:F1} s, suurin kiihtyvyys {silmukka.LentoMittari.kiihtyvyys:F1} m/s², suurin lasku {silmukka.LentoMittari.lasku:F1} m/s");
            kaupunki.YritaGoogleUudelleen();   // ion-varalla: Google uudelleen seuraavassa kohteessa (laatat lennon aikana)
            if (toiveesta) return;
            // Pallolauseet (Pelikoodari 8.10., juna 165): kierroksen siirtymässä pallon oma ryhmä, muuten tavallinen.
            bool pallo = OpasSilmukka.PalloLento && silmukka.KierrosKaynnissa && matkaM <= 20000 && siltalauseet != null;
            // Pallokierros (omistaja 9.10. "puuduttavalta", Päätoimittaja): lause vain noin joka 4. siirtymään, muissa hiljaa, ja
            // kertoja alkaa jo lennon aikana (OpasSilmukka.PuheLennolla), joten lennon loppuun ei soiteta lasku-lausetta.
            if (pallo)
            {
                var pr = pallolauseet.Lahtoon(OpasSilmukka.Suunta(silmukka.Asento.Lat, silmukka.Asento.Lon, k.Lat, k.Lon), matkaM, siltalauseet.OnRyhma);
                if (pr != null) Silta(pr, false); else HistoriaLennolle();
                return;
            }
            Silta(matkaM > 20000 ? OpasSiltalauseet.Lento : OpasSiltalauseet.Kierros, false);
        }

        readonly OpasPallolauseet pallolauseet = new OpasPallolauseet();
        /// <summary>pallo-lasku lennon loppuun ennen kertojaa (PuheEnnenS): ~PalloLaskuS ennen kertojan alkua, jos siltalause ei soi.</summary>
        const double PalloLaskuS = 4.5;
        IEnumerator PalloLaskuun(OpasKohde k)
        {
            double alku = silmukka.LentoKestoS - OpasSilmukka.PuheEnnen(silmukka.LentoKestoS) - PalloLaskuS;
            while (silmukka != null && silmukka.Vaihe == OpasVaihe.Lentaa && silmukka.Nykyinen == k && silmukka.VaiheAika < alku) yield return null;
            if (silmukka == null || silmukka.Vaihe != OpasVaihe.Lentaa || silmukka.Nykyinen != k || alku < 3 || silta == null || silta.isPlaying) yield break;
            var r = pallolauseet.Laskuun(siltalauseet.OnRyhma);
            if (r != null) Silta(r, false);
        }

        IEnumerator SoitaSillanJalkeen(OpasKohde k)
        {
            float t0 = Time.realtimeSinceStartup;
            while (silta != null && silta.isPlaying && Time.realtimeSinceStartup - t0 < (historiaSoi ? HistoriaOdotusMaxS : SiltaOdotusS)) yield return null;
            historiaSoi = false;
            yield return new WaitForSecondsRealtime(historiaSoiOli ? 0.8f : 0.25f);   // pieni hengähdys lauseen (historian: pidempi) ja kerronnan väliin
            historiaSoiOli = false;
            if (silmukka == null) yield break;
            Soita(k);
        }

        // ---- HISTORIAOSIOT LENNOILLE (omistaja 9.10.: "lentojen aikanakin kertoja voisi kertoa jotain vaikka tulevasta kohteesta tai
        // sitten jostain muusta … samalla voisi selittää vaikka muuten kaupungin historiasta"; Pelikoodari opas/historia-v1, juna 170) ----
        // Kehityskaupungeissa kierroksen lähtöön, jossa ei soi siltalausetta, soi joka HistoriaVali:nteen lentoon (yli HistoriaMinLentoS)
        // seuraava kuulematon osio siltalauseiden kanavalla; seuraavan kohteen kerronta alkaa sen perään (SoitaSillanJalkeen), joten
        // pallo kiertää kohdetta osion loppuun. Osio ei toistu kaupungissa; ääni workerilta /opas/aani/<sha>.mp3, seuraava esiladataan.
        public const float HistoriaOdotusMaxS = 60f;
        List<OpasHistoria.Osio> historiaOsiot = new List<OpasHistoria.Osio>();
        List<OpasYksityiskohdat.Kuva> historiaKuvat;
        string historiaSoiTunnus;

        /// <summary>Soivan historiaosion otsikko (Natiivi-UI: esim. "Lutetia" kertojan rivillä); null, kun osio ei soi.</summary>
        public static string HistoriaOtsikko
        {
            get
            {
                var v = Viimeisin;
                if (v == null || v.historiaSoiTunnus == null || v.silta == null || !v.silta.isPlaying) return null;
                return v.historiaOsiot.Find(x => x.Tunnus == v.historiaSoiTunnus)?.Otsikko;
            }
        }
        /// <summary>Nykyisen kaupungin historiaosioiden lähteet (Natiivi-UI: ☰ Lähteet): otsikko ja lähde-URLit; tyhjä, jos ei ladattu.</summary>
        public static IReadOnlyList<(string Otsikko, IReadOnlyList<string> Lahteet)> HistoriaLahteet
        {
            get
            {
                var l = new List<(string, IReadOnlyList<string>)>();
                var v = Viimeisin;
                if (v == null) return l;
                foreach (var o in v.historiaOsiot) l.Add((o.Otsikko, o.Lahteet));
                return l;
            }
        }
        readonly HashSet<string> historiaKuultu = new HashSet<string>();
        string historiaKaupunki; AudioClip historiaKlippi; string historiaKlippiTunnus; int historiaLaskuri; bool historiaSoi, historiaSoiOli;

        IEnumerator LataaHistoria(string id)
        {
            if (historiaKaupunki == id && historiaOsiot.Count > 0) yield break;
            historiaKaupunki = id; historiaOsiot = new List<OpasHistoria.Osio>(); historiaKuultu.Clear(); historiaKlippi = null; historiaKlippiTunnus = null; historiaLaskuri = 0;
            using (var r = UnityWebRequest.Get("https://media.matkakirja.app/opas/historia-v1/" + UnityWebRequest.EscapeURL(id) + ".json"))
            {
                r.timeout = 10;
                yield return r.SendWebRequest();
                if (r.result != UnityWebRequest.Result.Success) { o.Kirjaa($"opas: historiaosiot {id} ei latautunut ({r.responseCode})"); yield break; }
                historiaOsiot = OpasHistoria.Lue(MiniJson.Jasenna(r.downloadHandler.text));
            }
            o.Kirjaa($"opas: historiaosiot {id}: {historiaOsiot.Count}");
            // Historiaosioiden yksityiskohtakuvat (Pelikoodari 9.10., Sisältökirjuri: esittely/<id>-historia-v1/<id>-historia-yksityiskohdat.json,
            // sama muoto kuin kohteilla; kohde_id = osion tunnus) kuvanostoon ankkurisanan kohdalla.
            using (var r = UnityWebRequest.Get($"https://media.matkakirja.app/esittely/{UnityWebRequest.EscapeURL(id)}-historia-v1/{UnityWebRequest.EscapeURL(id)}-historia-yksityiskohdat.json"))
            {
                r.timeout = 10;
                yield return r.SendWebRequest();
                historiaKuvat = r.result == UnityWebRequest.Result.Success ? OpasYksityiskohdat.Lue(MiniJson.Jasenna(r.downloadHandler.text)) : null;
                o.Kirjaa($"opas: historiaosioiden kuvat {id}: {(historiaKuvat != null ? historiaKuvat.Count.ToString() : "ei (" + r.responseCode + ")")}");
            }
            yield return EsilataaHistoria();
        }

        IEnumerator EsilataaHistoria()
        {
            var seur = OpasHistoria.Seuraava(historiaOsiot, historiaKuultu);
            if (seur == null || historiaKlippiTunnus == seur.Tunnus) yield break;
            using var p = UnityWebRequestMultimedia.GetAudioClip(PuluChat.Palvelin + "/opas/aani/" + seur.Sha + ".mp3", AudioType.MPEG);
            p.timeout = 20;
            yield return p.SendWebRequest();
            if (p.result == UnityWebRequest.Result.Success && DownloadHandlerAudioClip.GetContent(p) is AudioClip c) { historiaKlippi = c; historiaKlippiTunnus = seur.Tunnus; }
            else o.Kirjaa($"opas: historiaosio {seur.Tunnus} ei latautunut ({p.responseCode})");
        }

        /// <summary>Kierroksen lähtö ilman siltalausetta: historiaosio, jos vuoro ja ääni valmiina.</summary>
        void HistoriaLennolle()
        {
            if (Testi || historiaKlippi == null || historiaKaupunki == null || historiaKaupunki != NykyinenKaupunkiId || silta == null || silta.isPlaying
                || !Asetukset.Paalla(Kytkin.Kertoja)) return;
            if (!OpasHistoria.Vuoro(ref historiaLaskuri, silmukka.LentoKestoS)) return;
            var osio = historiaOsiot.Find(x => x.Tunnus == historiaKlippiTunnus);
            if (osio == null) return;
            historiaKuultu.Add(historiaKlippiTunnus);
            silta.clip = historiaKlippi; silta.volume = KertojanTaso; silta.Play();
            historiaSoi = true; historiaSoiOli = true; historiaSoiTunnus = osio.Tunnus;
            YksAloita(osio.Tunnus, osio.Teksti, silta, historiaKlippi, PuluChat.Palvelin + "/opas/aani/" + osio.Sha + ".ajat.json", historiaKlippi.length);
            o.Kirjaa($"opas: historiaosio {osio.Tunnus} lennolle ({historiaKlippi.length:F1} s, lento {silmukka.LentoKestoS:F1} s)");
            historiaKlippi = null; historiaKlippiTunnus = null;
            o.StartCoroutine(EsilataaHistoria());
        }

        /// <summary>Siltalauseiden JSON ja kaikki mp3:t kerran avauksessa (94 × ~2 s, ~4 Mt; 4 rinnakkain).</summary>
        IEnumerator LataaSiltalauseet()
        {
            using (var r = UnityWebRequest.Get(SiltalauseetOsoite))
            {
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (r.result != UnityWebRequest.Result.Success) { o.Kirjaa($"opas: siltalauseet ei latautunut ({r.responseCode})"); yield break; }
                siltalauseet = OpasSiltalauseet.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>);
            }
            if (siltalauseet == null) { o.Kirjaa("opas: siltalauseet: virheellinen JSON"); yield break; }
            using (var k = UnityWebRequest.Get(KuittauksetOsoite))
            {
                k.timeout = 15;
                yield return k.SendWebRequest();
                var ku = k.result == UnityWebRequest.Result.Success ? OpasSiltalauseet.Lue(MiniJson.Jasenna(k.downloadHandler.text) as Dictionary<string, object>) : null;
                if (ku != null) siltalauseet.Yhdista(ku);
                o.Kirjaa($"opas: kuittaukset {(ku != null ? ku.Maara + " lausetta" : "ei latautunut (" + k.responseCode + ")")}");
            }
            var jono = new Queue<Siltalause>(siltalauseet.Kaikki());
            int kesken = 0, ok = 0;
            float t0 = Time.realtimeSinceStartup;
            IEnumerator Yksi(Siltalause l)
            {
                kesken++;
                using (var p = UnityWebRequestMultimedia.GetAudioClip(l.Url, AudioType.MPEG))
                {
                    ((DownloadHandlerAudioClip)p.downloadHandler).compressed = true;
                    p.timeout = 20;
                    yield return p.SendWebRequest();
                    if (p.result == UnityWebRequest.Result.Success) { var c = DownloadHandlerAudioClip.GetContent(p); if (c != null) { siltaKlipit[l.Url] = c; ok++; } }
                }
                kesken--;
            }
            while (jono.Count > 0 || kesken > 0)
            {
                while (jono.Count > 0 && kesken < 4) o.StartCoroutine(Yksi(jono.Dequeue()));
                yield return null;
            }
            o.Kirjaa($"opas: siltalauseet {ok}/{siltalauseet.Maara} ladattu {Time.realtimeSinceStartup - t0:F1} s:ssa");
            // Avauksen lause, jos kerronta ei vielä soi (worker suunnittelee ensimmäistä pysähdystä). Ei aloitusvalikossa: kertoja
            // puhuu vasta kaupungin tai suosikin valinnasta (omistaja TF 149, simu 17.2x: "Lähdetään kierrokselle" valikossa).
            if (silmukka != null && !puhuu && !kaupunkiOdottaa && silmukka.Aloitettu) Silta(OpasSiltalauseet.Aloitus, false);
        }

        /// <summary>
        /// Tappiohjaus (juna 145): Natiivi-UI:n OpasTapit (UI-kokoonpano, luetaan heijastuksella kuten OpasValikko, jotta
        /// linssit kääntyy ilman UI-haaraa) silmukalle; komento "opas tapit kierto korkeus etäisyys s" ohittaa kestoksi (simutesti).
        /// Akselit (Päätoimittaja 5.10. 21.4x, hyväksytty): oikea ↔ kiertää (Oikea.x), oikea ↕ nostaa/laskee (Oikea.y), vasen ylös
        /// lähentää ja alas loitontaa (etäisyys = −Vasen.y). Järjestys Siirtosepän OpasOhjaus.Paivita(kierto, korkeus, etäisyys).
        /// </summary>
        /// <summary>
        /// Kohteen nimilappu (Natiivi-UI OpasNimilappu, juna 145; UI-kokoonpano heijastuksella): nasta kohteen yläpuolella (maa + korkeus,
        /// 5–80 m) pysähdyksellä, kamera kaupunkinäkymän pääkamera. Sulje irrottaa.
        /// </summary>
        void KytkeNimilappu(bool paalle)
        {
            var t = typeof(PuluChat).Assembly.GetType("Matkakirja.Natiivi.OpasNimilappu");
            if (t == null) return;
            const System.Reflection.BindingFlags F = System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static;
            Func<Vector3?> kohde = null; Func<Camera> kamera = null;
            if (paalle)
            {
                kohde = () =>
                {
                    var l = silmukka; var k = l?.Nykyinen; var kehys = l?.NykyinenKehys;
                    if (k == null || kehys == null || k.Kysymys) return null;
                    double nosto = Math.Max(5, Math.Min(80, k.KorkeusM > 0 ? k.KorkeusM : k.KokoM * 0.3));
                    return kaupunki.MaailmaPiste(k.Lat, k.Lon, kehys.MaaM + nosto);
                };
                kamera = () => kaupunki.Kamera;
            }
            t.GetField("Kohde", F)?.SetValue(null, kohde);
            t.GetField("Kamera", F)?.SetValue(null, kamera);
        }

        OpasLahiluotain luotain;
        /// <summary>Vapaassa tilassa syvyysluotain toivotun liikkeen suuntaan (ristikkorakenteet, OpasLahiluotain) → Vapaa.EsteM.</summary>
        void Luotaa()
        {
            var kam = kierto != null ? kierto.GetComponent<Camera>() : null;
            if (silmukka.VapaaTila && kam != null)
            {
                luotain ??= new OpasLahiluotain();
                luotain.Paivita(kam, silmukka.Vapaa.ToiveSuuntaEro, kaupunki.Ylos(kam.transform.position));
                silmukka.Vapaa.EsteM = luotain.VaakaM; silmukka.Vapaa.EsteAllaM = luotain.AllaM;
            }
            else if (luotain != null) { luotain.Dispose(); luotain = null; silmukka.Vapaa.EsteM = silmukka.Vapaa.EsteAllaM = double.PositiveInfinity; }
        }

        void LueTapit()
        {
            if (Time.unscaledTime < vapaaTestiLoppuu) { silmukka.VapaaTapit = vapaaTesti; silmukka.Tapit = default; silmukka.PelaajaOhjaa = true; return; }
            if (Time.unscaledTime < tapitTestiLoppuu) { silmukka.Tapit = tapitTesti; silmukka.PelaajaOhjaa = true; return; }
            if (!tapitHaettu)
            {
                tapitHaettu = true;
                var t = typeof(PuluChat).Assembly.GetType("Matkakirja.Natiivi.OpasTapit");
                const System.Reflection.BindingFlags F = System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static;
                tapVasen = t?.GetProperty("Vasen", F); tapOikea = t?.GetProperty("Oikea", F); tapKosketaan = t?.GetProperty("Kosketaan", F);
            }
            if (tapVasen == null || tapOikea == null || tapKosketaan == null) { silmukka.Tapit = default; silmukka.PelaajaOhjaa = false; return; }
            var v = (Vector2)tapVasen.GetValue(null); var o2 = (Vector2)tapOikea.GetValue(null);
            // Oikean tapin vaakasuunta käännetty (omistaja 6.10. TF 149 iPad: "oikeanpuoleinen joystick toimii väärinpäin
            // panoroitaessa vasemmalle ja oikealle"): tappi oikealle → näkymä panoroi oikealle. Pystysuunta ennallaan.
            silmukka.Tapit = (-o2.x, o2.y, -v.y);
            silmukka.VapaaTapit = (v.x, v.y, o2.x, o2.y);   // vapaa tila: vasen liikkuu, oikea kääntää ja nostaa
            silmukka.PelaajaOhjaa = (bool)tapKosketaan.GetValue(null);
        }
        bool tapitHaettu;
        System.Reflection.PropertyInfo tapVasen, tapOikea, tapKosketaan;
        static (double, double, double) tapitTesti;
        static float tapitTestiLoppuu = -1f;
        static (double, double, double, double) vapaaTesti;
        static float vapaaTestiLoppuu = -1f;
        /// <summary>Komento "opas vapaa vx vy ox oy s": vapaan tilan tapit −1…1 kestoksi s sekuntia (video ja testi; ■ ensin).</summary>
        public static void TestiVapaa(double vx, double vy, double ox, double oy, float s)
        {
            vapaaTesti = (Mathf.Clamp((float)vx, -1, 1), Mathf.Clamp((float)vy, -1, 1), Mathf.Clamp((float)ox, -1, 1), Mathf.Clamp((float)oy, -1, 1));
            vapaaTestiLoppuu = Time.unscaledTime + Mathf.Max(0, s);
        }

        /// <summary>Komento "opas tapit k h e s" (LinssiOhjain): akselit −1…1 kestoksi s sekuntia.</summary>
        public static void TestiTapit(double kierto, double korkeus, double etaisyys, float s)
        {
            tapitTesti = (Mathf.Clamp((float)kierto, -1, 1), Mathf.Clamp((float)korkeus, -1, 1), Mathf.Clamp((float)etaisyys, -1, 1));
            tapitTestiLoppuu = Time.unscaledTime + Mathf.Max(0, s);
        }

        /// <summary>Virheen jälkeen: 429 → "Opas lepää hetken" (kerran virhesarjaa kohden); luovutus → linssi kiinni viestillä
        /// (KierrosTaulu näyttää Virheen tilarivillä ja sulkee).</summary>
        void VirheIlmoitus(string viesti)
        {
            var l = silmukka;
            if (l == null) return;
            if (l.Luovutti)
            {
                Virhe = l.ViimeKoodi == 429 ? (viesti ?? "Opas lepää tänään. Palaa huomenna.") : "Opas ei vastaa juuri nyt. Yritä hetken päästä uudelleen.";
                o.Kirjaa($"opas: luovutti, {l.Virheita} virhettä (viimeisin {l.ViimeKoodi}), linssi kiinni");
                return;
            }
            o.Kirjaa($"opas: virhe {l.Virheita}/{OpasSilmukka.VirheitaMax} ({l.ViimeKoodi}), seuraava yritys {l.VirheTauko:F0} s:n päästä");
        }

        /// <summary>Workerin virhevastauksen "viesti"-kenttä (Pöllö #4018, 429), tai null.</summary>
        static string WorkerinViesti(string json)
        {
            if (string.IsNullOrEmpty(json)) return null;
            try { return (MiniJson.Jasenna(json) as Dictionary<string, object>)?.TryGetValue("viesti", out var v) == true ? v as string : null; }
            catch { return null; }
        }

        IEnumerator TestiVastaus(int n)
        {
            yield return new WaitForSecondsRealtime(0.8f);
            var lista = KoopenhaminaTesti.Kohteet;
            var k = lista[testiIndeksi++ % lista.Length];
            k.Teksti ??= k.Nimi + ": " + k.Alarivi + ".";
            Valmistele(k);
            silmukka?.Vastaus(n, k);
        }

        IEnumerator Hae(int n, string toive)
        {
            var (sLat, sLon) = PyynnonPaikka();
            if (pakotettuSijainti is (double, double) ps) { sLat = ps.lat; sLon = ps.lon; pakotettuSijainti = null; }
            if (silmukka.PyynnonSijainti is (double, double) pk) { sLat = pk.lat; sLon = pk.lon; silmukka.PyynnonSijainti = null; }
            var kt = silmukka.KierrosTieto;
            o.Kirjaa($"opas: pyyntö {n} {Aloituskaupunki} {sLat:F3}/{sLon:F3}");
            var sb = new StringBuilder("{");
            sb.Append("\"istunto\":\"").Append(istunto).Append("\",");
            sb.Append("\"toive\":").Append(toive == null ? "null" : "\"" + Escape(toive) + "\"").Append(',');
            sb.Append("\"kaupunki\":\"").Append(Escape(Aloituskaupunki)).Append("\",");
            sb.Append("\"sijainti\":{\"lat\":").Append(sLat.ToString("F5", System.Globalization.CultureInfo.InvariantCulture))
              .Append(",\"lon\":").Append(sLon.ToString("F5", System.Globalization.CultureInfo.InvariantCulture)).Append("},");
            sb.Append("\"nahdyt\":[");
            bool eka = true;
            foreach (var id in silmukka.Nahdyt) { if (!eka) sb.Append(','); sb.Append('"').Append(Escape(id)).Append('"'); eka = false; }
            sb.Append("],\"kieli\":\"fi\"");
            // Kaupunkikierros: lyhyt kerronta ja järjestysnumero (omistaja 11.57).
            if (silmukka.PitkaPyynto) { silmukka.PitkaPyynto = false; o.Kirjaa("opas: kerro lisää → pitkä teksti"); }
            else if (kt.numero > 0) sb.Append(",\"kierros\":{\"numero\":").Append(kt.numero).Append(",\"maara\":").Append(kt.maara).Append("},\"lyhyt\":true");
            // Näytettävät tekijätiedot (Pelikoodari #4028, ODbL): worker palauttaa OSM-pohjaista dataa vain, kun "osm" on mukana.
            sb.Append(",\"krediitit\":[\"osm\"]");
            // "Kerro lisää" ei toista edellistä kappaletta (Pelikoodari #4011).
            var ed = silmukka.Nykyinen?.Teksti;
            if (!string.IsNullOrEmpty(ed)) sb.Append(",\"edellinen_teksti\":\"").Append(Escape(ed)).Append('"');
            sb.Append('}');
            using var r = new UnityWebRequest(PuluChat.Palvelin + Polku, "POST")
            {
                uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(sb.ToString())),
                downloadHandler = new DownloadHandlerBuffer(),
                timeout = AikarajaS,
            };
            r.SetRequestHeader("Content-Type", "application/json");
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            if (GizaKokeilu) r.SetRequestHeader("x-matkakirja-kokeilu", "giza");   // /opas/seuraava (simu 7.10. 09.15: 403 ilman)
            PolloTestitunnus.Lisaa(r);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            string koodi = Asetukset.PolloKoodi;   // kehittäjäkoodi Keychainista kuten Pulun chatissa; ei lokiin
            if (!string.IsNullOrEmpty(koodi)) r.SetRequestHeader(Lukijaaani.KoodiOtsake, koodi);
            if (Testiotsake) r.SetRequestHeader("x-matkakirja-testi", "1");
            float t0 = Time.realtimeSinceStartup;
            yield return r.SendWebRequest();
            if (silmukka == null) yield break;
            OpasKohde k = null;
            if (r.result == UnityWebRequest.Result.Success)
                k = OpasKohde.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>);
            o.Kirjaa($"opas: vastaus {n} {(k == null ? "VIRHE " + r.responseCode + " " + r.error : k.Kysymys ? "kysymys (" + (k.Vaihtoehdot?.Length ?? 0) + " vaihtoehtoa)" : k.Nimi)} ({Time.realtimeSinceStartup - t0:F1} s), ääni {(k?.Aani != null ? "url" : "ei")}");
            if (k != null) Valmistele(k);
            double odota = 0;
            if (k == null && double.TryParse(r.GetResponseHeader("Retry-After"), System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var ra)) odota = ra;
            silmukka.Vastaus(n, k, k == null ? (int)r.responseCode : 0, odota);
            if (k == null) VirheIlmoitus(r.responseCode == 429 ? WorkerinViesti(r.downloadHandler?.text) : null);
        }

        static string Escape(string s) => s.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\n", " ");

        /// <summary>Vastauksen tultua: maaston korkeus näytteenä ja äänen lataus (molemmat ehtivät lennon aikana).</summary>
        void Valmistele(OpasKohde k)
        {
            if (!k.Kysymys) o.StartCoroutine(Korkeus(k));
            if (PcmKaytossa && !string.IsNullOrEmpty(k.AaniPcm)) { if (!klipit.ContainsKey(k.AaniPcm) && !pcmVirrat.ContainsKey(k.AaniPcm)) o.StartCoroutine(LataaPcm(k)); }
            else if (!string.IsNullOrEmpty(k.Aani) && !klipit.ContainsKey(k.Aani)) o.StartCoroutine(LataaAani(k.Aani));
        }

        /// <summary>PCM-virrat avaimittain (Pöllön aani_pcm) ja soiva virta (loppu tunnistetaan siitä, ei klipin pituudesta).</summary>
        readonly Dictionary<string, PcmVirta> pcmVirrat = new Dictionary<string, PcmVirta>(StringComparer.Ordinal);
        PcmVirta pcmNyt;
        // Toisto alkaa, kun virrassa on OpasPcmPuskuri.Tarvitaan (nopealla virralla 1 s; Päätoimittaja 16.5x) tai lataus on valmis;
        // alivuodossa PcmVirta puskuroi ~2 s.

        /// <summary>PCM-virran lataus: klippi valmiina (klipit[avain]), kun puskuria on OpasPcmPuskuri.Tarvitaan; lataus jatkuu taustalla loppuun.</summary>
        IEnumerator LataaPcm(OpasKohde k)
        {
            string avain = k.AaniPcm;
            var virta = new PcmVirta(k.AaniTaajuus, (float)k.KestoS);
            pcmVirrat[avain] = virta;
            using var p = new UnityWebRequest(avain, "GET") { downloadHandler = virta, timeout = AikarajaS + 30, disposeDownloadHandlerOnDispose = false };   // virta elää klipin mukana
            p.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            PolloTestitunnus.Lisaa(p);
            p.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            float t0 = Time.realtimeSinceStartup, tEka = -1f;
            var op = p.SendWebRequest();
            // Alkupuskuri mitatusta latausnopeudesta (juna 154): hidas virta (< 1 × reaaliaika) puskuroi niin, ettei kertoja katkea.
            double nopeus = double.NaN, tarvitaan = OpasPcmPuskuri.PohjaS;
            while (!op.isDone)
            {
                if (tEka < 0 && virta.KirjoitettuS > 0) tEka = Time.realtimeSinceStartup;
                if (tEka >= 0)
                {
                    nopeus = OpasPcmPuskuri.Nopeus(virta.KirjoitettuS, Time.realtimeSinceStartup - tEka);
                    tarvitaan = OpasPcmPuskuri.Tarvitaan(k.KestoS, nopeus);
                    virta.AlkuTarve = (float)tarvitaan;
                    if (virta.PuskuroituS >= tarvitaan) break;
                }
                yield return null;
            }
            if (p.result == UnityWebRequest.Result.ConnectionError || p.result == UnityWebRequest.Result.ProtocolError || virta.KirjoitettuS <= 0f)
            {
                while (!op.isDone) yield return null;
                o.Kirjaa($"opas: PCM-virta epäonnistui ({p.responseCode} {p.error}), mp3-varapolku");
                pcmVirrat.Remove(avain);
                if (!string.IsNullOrEmpty(k.Aani) && !klipit.ContainsKey(k.Aani)) { yield return LataaAani(k.Aani); if (klipit.TryGetValue(k.Aani, out var mp3)) klipit[avain] = mp3; }
                else klipit[avain] = null;
                yield break;
            }
            klipit[avain] = virta.Klippi("opas-pcm", (float)k.KestoS);
            o.Kirjaa($"opas: PCM-virta soittovalmis {Time.realtimeSinceStartup - t0:F1} s:ssa ({virta.PuskuroituS:F1} s puskurissa, nopeus {nopeus:F2} ×, tarve {tarvitaan:F1} s)");
            while (!op.isDone) yield return null;
            o.Kirjaa($"opas: PCM-virta valmis {Time.realtimeSinceStartup - t0:F1} s, {virta.KirjoitettuS:F1} s ääntä ({virta.KirjoitettuS / Mathf.Max(0.1f, Time.realtimeSinceStartup - (tEka >= 0 ? tEka : t0)):F2} ×)");
        }

        /// <summary>Paikka (lat, lon, ellipsoidikorkeus) kaupunkinäkymän maailmassa (georeferenssi).</summary>
        Vector3 KohdeMaailmassa(double lat, double lon, double h)
        {
            var ecef = CesiumForUnity.CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, h));
            var u = kaupunki.Georef.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            return new Vector3((float)u.x, (float)u.y, (float)u.z);
        }

        // ---- OMA KORKEUSMALLI (Linssiseppä 8.10., PT: Googlen Map Tiles -ehdot C4 kieltävät korkeuksien lukemisen laatoista) ----
        // Kaikki oppaan pintanäytteet (kohteen maa ja kehä, kehyksen maa, vapaan lennon pinta, testikomento `opas pinta`) kulkevat
        // Pinnat-kutsun kautta: kytkin OmaKorkeusPaalla (asetus opas.OmaKorkeus, oletus 1; komento `opas korkeus oma|google`)
        // valitsee Karttasepän mallin (Ydin OmaKorkeus, R2 kartta/korkeus/v1/korkeus-<id>.json + -lahi/-kauko.png, kaupunki
        // lähimmästä sallitusta) tai vanhan Googlen SampleHeightMostDetailedin. Mallin ulkopuolella tai latauksen epäonnistuessa NaN
        // (kutsujat käyttävät lähintä tunnettua tai arviota), ei Googlea. Enintään kaksi kaupunkia muistissa.
        public static bool? OmaKorkeusPakko;
        public static bool OmaKorkeusPaalla => OmaKorkeusPakko ?? Asetus.Luku("opas.OmaKorkeus", 1) != 0;
        public const string KorkeusJuuri = "https://media.matkakirja.app/kartta/korkeus/v1/";
        static readonly Dictionary<string, OmaKorkeus> korkeusMallit = new Dictionary<string, OmaKorkeus>();
        static readonly List<string> korkeusJarjestys = new List<string>();
        static readonly HashSet<string> korkeusHaussa = new HashSet<string>(), korkeusPuuttuu = new HashSet<string>();
        /// <summary>Ladatun mallin krediitti (Lähteet): viimeksi käytetyn kaupungin.</summary>
        public static string OmaKorkeusKrediitti { get; private set; }

        /// <summary>Pinnan ellipsoidikorkeus ladatusta omasta mallista (elävän kaupungin kyyhkyt); NaN, jos mallia ei ole muistissa.</summary>
        public static double OmaMaa(double lat, double lon)
        {
            string id = KorkeusId(lat, lon);
            return id != null && korkeusMallit.TryGetValue(id, out var m) ? m.Korkeus(lat, lon) : double.NaN;
        }

        /// <summary>Maa kohteen ympäriltä: pienin pinta keskeltä ja 8 pisteestä 70 m:n kehältä (tornin huippu ei ole maa; Eiffel).</summary>
        public static double OmaMaaKehalla(double lat, double lon)
        {
            double h = OmaMaa(lat, lon);
            if (double.IsNaN(h)) return h;
            for (int i = 0; i < 8; i++)
            {
                double a = i * Math.PI / 4, la = lat + 70 * Math.Cos(a) / 111132.0, lo = lon + 70 * Math.Sin(a) / (111320.0 * Math.Cos(lat * Math.PI / 180));
                double hk = OmaMaa(la, lo); if (!double.IsNaN(hk)) h = Math.Min(h, hk);
            }
            return h;
        }

        static string KorkeusId(double lat, double lon)
        {
            string paras = null; double lahin = double.MaxValue;
            foreach (var k in SallitutLista)
            {
                double d = KierrosLento.EtaisyysM(k.Lat, k.Lon, lat, lon);
                if (d < lahin && d < Math.Max(k.RM, 5000) + 15000) { lahin = d; paras = k.Id; }
            }
            return paras ?? Kehityskaupungit.Lahella(lat, lon);
        }

        /// <summary>Pinnan ellipsoidikorkeus pisteissä (lon, lat): NaN, jos ei osumaa.</summary>
        IEnumerator Pinnat(double3[] pisteet, Action<double[]> valmis)
        {
            var hs = new double[pisteet.Length];
            for (int i = 0; i < hs.Length; i++) hs[i] = double.NaN;
            if (pisteet.Length == 0) { valmis(hs); yield break; }
            if (OmaKorkeusPaalla)
            {
                string id = KorkeusId(pisteet[0].y, pisteet[0].x);
                if (id == null) { valmis(hs); yield break; }
                if (!korkeusMallit.ContainsKey(id) && !korkeusPuuttuu.Contains(id))
                {
                    if (!korkeusHaussa.Contains(id)) o.StartCoroutine(LataaKorkeus(id));
                    float t0 = Time.realtimeSinceStartup;
                    while (korkeusHaussa.Contains(id) && Time.realtimeSinceStartup - t0 < 40f) yield return null;
                }
                if (korkeusMallit.TryGetValue(id, out var m))
                {
                    for (int i = 0; i < hs.Length; i++) hs[i] = m.Korkeus(pisteet[i].y, pisteet[i].x);
                    OmaKorkeusKrediitti = m.Krediitti;
                }
                valmis(hs); yield break;
            }
            var pinta = kaupunki.Pinta;
            if (pinta == null) { valmis(hs); yield break; }
            var tehtava = pinta.SampleHeightMostDetailed(pisteet);
            while (!tehtava.IsCompleted) yield return null;
            var t = tehtava.IsFaulted ? null : tehtava.Result;
            if (t?.sampleSuccess != null)
                for (int i = 0; i < hs.Length && i < t.sampleSuccess.Length; i++) if (t.sampleSuccess[i]) hs[i] = t.longitudeLatitudeHeightPositions[i].z;
            valmis(hs);
        }

        /// <summary>Kaupungin malli: Documents/korkeus/ (testi) tai R2; PNG:t puretaan taustasäikeessä.</summary>
        IEnumerator LataaKorkeus(string id)
        {
            korkeusHaussa.Add(id);
            float t0 = Time.realtimeSinceStartup;
            string kansio = System.IO.Path.Combine(Application.persistentDataPath, "korkeus");
            var tavut = new Dictionary<string, byte[]>();
            IEnumerator Hae(string nimi)
            {
                string pol = System.IO.Path.Combine(kansio, nimi);
                if (System.IO.File.Exists(pol)) { try { tavut[nimi] = System.IO.File.ReadAllBytes(pol); } catch (Exception) { } if (tavut.ContainsKey(nimi)) yield break; }
                using var p = UnityWebRequest.Get(KorkeusJuuri + nimi);
                p.timeout = 60;
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success) tavut[nimi] = p.downloadHandler.data;
            }
            string jsonNimi = "korkeus-" + id + ".json";
            yield return Hae(jsonNimi);
            if (!tavut.TryGetValue(jsonNimi, out var jt)) { korkeusHaussa.Remove(id); korkeusPuuttuu.Add(id); o.Kirjaa($"opas: korkeusmalli {id} puuttuu"); yield break; }
            string json = Encoding.UTF8.GetString(jt);
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            foreach (var oo in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "osat")))
                if (MiniJson.Teksti(MiniJson.Objekti(oo), "tiedosto") is string n) yield return Hae(n);
            var tyo = System.Threading.Tasks.Task.Run(() => OmaKorkeus.Lue(json, n => tavut.TryGetValue(n, out var b) ? b : null));
            while (!tyo.IsCompleted) yield return null;
            korkeusHaussa.Remove(id);
            if (tyo.IsFaulted || tyo.Result.Osat.Count == 0) { korkeusPuuttuu.Add(id); o.Kirjaa($"opas: korkeusmalli {id} virheellinen ({tyo.Exception?.GetBaseException().Message})"); yield break; }
            korkeusMallit[id] = tyo.Result; korkeusJarjestys.Remove(id); korkeusJarjestys.Add(id);
            while (korkeusJarjestys.Count > 2) { korkeusMallit.Remove(korkeusJarjestys[0]); korkeusJarjestys.RemoveAt(0); }
            o.Kirjaa($"opas: korkeusmalli {id} ladattu {Time.realtimeSinceStartup - t0:F1} s ({string.Join(", ", tyo.Result.Osat.ConvertAll(x => $"{x.Nimi} {x.W}×{x.H} {x.RuutuM:F0} m"))})");
        }

        /// <summary>Kohteen maa ja korkeus: keskipiste + kehä (OpasKuvaus.MaaJaKorkeus; Eiffel-korjaus 7.10.).</summary>
        IEnumerator Korkeus(OpasKohde k)
        {
            if (kaupunki.Pinta == null && !OmaKorkeusPaalla) yield break;
            double r = OpasKuvaus.KehaSade(k.KokoM);
            var pisteet = new double3[1 + OpasKuvaus.KehaPisteita];
            pisteet[0] = new double3(k.Lon, k.Lat, 0);
            for (int i = 0; i < OpasKuvaus.KehaPisteita; i++) { var (la, lo) = OpasKuvaus.KehaPiste(k.Lat, k.Lon, r, i); pisteet[1 + i] = new double3(lo, la, 0); }
            double[] hs = null;
            yield return Pinnat(pisteet, x => hs = x);
            if (hs == null) yield break;
            double H(int i) => hs[i];
            var keha = new List<double>();
            for (int i = 1; i < pisteet.Length; i++) keha.Add(H(i));
            double keskus = H(0);
            if (double.IsNaN(keskus) && keha.TrueForAll(double.IsNaN)) yield break;
            var (maa, korkeus) = OpasKuvaus.MaaJaKorkeus(keskus, keha);
            maaKorkeudet[Avain(k)] = pisteKorkeudet[PisteAvain(k.Lat, k.Lon)] = maa;
            viimeMaa = (k.Lat, k.Lon, maa);   // varaarvo myös kohteiden näytteistä (simu 17.4x: Pláka sai 45 m)
            double vanha = k.KorkeusM;
            if (korkeus > k.KorkeusM) k.KorkeusM = korkeus;   // workerin korkeus_m puuttuu tai on liian pieni
            o.Kirjaa($"opas: {k.Nimi}: maa {maa:F0} m (keskus {keskus:F0}, kehä r {r:F0} m), korkeus {(vanha > 0 ? vanha.ToString("F0") : "-")} → {k.KorkeusM:F0} m");
        }

        /// <summary>Kohdekehyksen maa pisteeseen (silmukka.MaaTarvitaan); epäonnistuessa arvio 45 m, jottei siirto jää odottamaan.</summary>
        /// <summary>Testi `opas pinta lat lon [lat lon …]` (Linnanrakentaja 7.10.: Gizan maapohja): Googlen pinnan ellipsoidikorkeus
        /// pisteissä (SampleHeightMostDetailed, yksittäiset pisteet ilman kehää) lokiin.</summary>
        public static bool Pinta(IReadOnlyList<(double lat, double lon)> pisteet)
        {
            if (!Auki || (Viimeisin.kaupunki.Pinta == null && !OmaKorkeusPaalla) || pisteet.Count == 0) return false;
            Viimeisin.o.StartCoroutine(Viimeisin.PintaNayte(pisteet));
            return true;
        }
        IEnumerator PintaNayte(IReadOnlyList<(double lat, double lon)> p)
        {
            var q = new double3[p.Count];
            for (int i = 0; i < p.Count; i++) q[i] = new double3(p[i].lon, p[i].lat, 0);
            double[] hs = null;
            yield return Pinnat(q, x => hs = x);
            for (int i = 0; i < p.Count; i++)
                o.Kirjaa($"opas: pinta {p[i].lat.ToString("F5", System.Globalization.CultureInfo.InvariantCulture)}, {p[i].lon.ToString("F5", System.Globalization.CultureInfo.InvariantCulture)}: "
                    + (hs != null && !double.IsNaN(hs[i]) ? $"{hs[i]:F2} m (ellipsoidi, {(OmaKorkeusPaalla ? "oma malli" : "Google")})" : "ei osumaa"));
        }

        IEnumerator KorkeusPisteessa(double lat, double lon)
        {
            string a = PisteAvain(lat, lon);
            var pinta = kaupunki.Pinta;
            // Vapaa lento (LS1 6.10.): pitkässä lennossa yli 2 km:n päässä olevat vanhat näytteet pois, kun niitä on yli 1 500.
            if (silmukka != null && silmukka.VapaaTila && pisteKorkeudet.Count > 1500)
            {
                var poistettavat = new List<string>();
                foreach (var avain in pisteKorkeudet.Keys)
                {
                    // Avain "lat,lon" F4:llä laitteen kulttuurissa: fi-FI:ssä desimaalipilkku → neljä osaa.
                    var o2 = avain.Split(',');
                    string sl = o2.Length == 4 ? o2[0] + "." + o2[1] : o2.Length == 2 ? o2[0] : null, so = o2.Length == 4 ? o2[2] + "." + o2[3] : o2.Length == 2 ? o2[1] : null;
                    if (sl != null && double.TryParse(sl, System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out double pl)
                        && double.TryParse(so, System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out double po)
                        && KierrosLento.EtaisyysM(pl, po, lat, lon) > 2000) poistettavat.Add(avain);
                }
                foreach (var avain in poistettavat) pisteKorkeudet.Remove(avain);
            }
            // Vapaa lento (LS1 6.10.): enintään 6 näytettä kesken (kamera, ennakko ja kehät), muut pyydetään seuraavalla kierroksella.
            if ((pinta == null && !OmaKorkeusPaalla) || pisteKorkeudet.ContainsKey(a) || (silmukka != null && silmukka.VapaaTila && pisteNaytteet.Count >= 6) || !pisteNaytteet.Add(a)) yield break;
            float t0 = Time.realtimeSinceStartup;
            // Kehyksen maa (ei vapaa tila): keskipiste + kehä kuten Korkeus(k), jottei tornin tai katon keskipiste ehdi kehykseen
            // ennen kohteen omaa näytettä (Eiffel-korjaus 7.10.). Vapaa lento näytteistää yhden pisteen (luotain, kehät erikseen).
            bool kehalla = silmukka == null || !silmukka.VapaaTila;
            var pisteet = new double3[kehalla ? 1 + OpasKuvaus.KehaPisteita : 1];
            pisteet[0] = new double3(lon, lat, 0);
            if (kehalla) for (int i = 0; i < OpasKuvaus.KehaPisteita; i++) { var (la, lo) = OpasKuvaus.KehaPiste(lat, lon, OpasKuvaus.KehaSade(60), i); pisteet[1 + i] = new double3(lo, la, 0); }
            double[] hs = null;
            yield return Pinnat(pisteet, x => hs = x);
            pisteNaytteet.Remove(a);
            bool ok = hs != null && hs.Length > 0 && !double.IsNaN(hs[0]);
            double tulosH = ok ? hs[0] : double.NaN;
            if (kehalla && hs != null && hs.Length == pisteet.Length)
            {
                var keha = new List<double>();
                for (int i = 1; i < pisteet.Length; i++) keha.Add(hs[i]);
                var (maaK, _) = OpasKuvaus.MaaJaKorkeus(tulosH, keha);
                if (!double.IsNaN(maaK)) { ok = true; tulosH = maaK; }
            }
            // Epäonnistunut näyte (simu 17.0x: Pláka 0,1 s:ssa, arvio 45 m, vaikka Ateena ~100 m): lähin tunnettu korkeus 15 km:n
            // sisältä (sama kaupunki), vasta sitten yleisarvio.
            double vara = viimeMaa.h is double vh && KierrosLento.EtaisyysM(viimeMaa.lat, viimeMaa.lon, lat, lon) < 15000 ? vh : OpasSilmukka.MaaArvioM;
            pisteKorkeudet[a] = ok ? tulosH : vara;
            if (ok) viimeMaa = (lat, lon, pisteKorkeudet[a]);
            if (silmukka == null || !silmukka.VapaaTila)   // vapaa lento näytteistää useita kertoja sekunnissa: ei lokiin
                o.Kirjaa($"opas: maa ({lat:F4}, {lon:F4}) {(ok ? "" : "näyte epäonnistui, lähin tunnettu ")}{pisteKorkeudet[a]:F0} m, {Time.realtimeSinceStartup - t0:F1} s");
        }

        IEnumerator LataaAani(string url)
        {
            using var p = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG);
            ((DownloadHandlerAudioClip)p.downloadHandler).streamAudio = false;
            p.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            PolloTestitunnus.Lisaa(p);
            p.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            p.timeout = AikarajaS;
            yield return p.SendWebRequest();
            if (p.result != UnityWebRequest.Result.Success) { o.Kirjaa("opas: ääni ei latautunut: " + p.error); klipit[url] = null; yield break; }
            klipit[url] = DownloadHandlerAudioClip.GetContent(p);
        }

        // ── Saapuminen ja puhe ───────────────────────────────────────────────
        /// <summary>Kehys ja kameran todellinen paikka lokiin (Eiffel-korjauksen todennus 7.10.: silmän korkeus maasta, etäisyys kohteesta).</summary>
        void KameraLoki(OpasKohde k, string milloin)
        {
            var kam = kierto != null ? kierto.GetComponent<Camera>() : null;
            var g = kaupunki.Georef; var kh = silmukka?.NykyinenKehys;
            if (kam == null || g == null || kh == null) return;
            var llh = CesiumForUnity.CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(
                g.TransformUnityPositionToEarthCenteredEarthFixed((double3)(float3)kam.transform.position));
            double vaaka = KierrosLento.EtaisyysM(llh.y, llh.x, k.Lat, k.Lon);
            o.Kirjaa($"opas: kamera {milloin} {k.Nimi}: kehys et {kh.EtaisyysM:F0} m, kallistus {kh.Kallistus:F0}°, maa {kh.MaaM:F0}, nosto {kh.NostoM:F0}, korkeus_m {k.KorkeusM:F0}, koko {k.KokoM:F0} " +
                $"| silmä {llh.z - kh.MaaM:F0} m maasta, {vaaka:F0} m kohteesta, kallistus käytössä {kierto.KaytettyKallistus:F0}°");
        }
        IEnumerator KameraLokiMyohemmin(OpasKohde k, float s) { yield return new WaitForSecondsRealtime(s); if (silmukka?.Nykyinen == k) KameraLoki(k, $"{s:F0} s"); }

        public const double SaapumisOrigoRajaM = 3000;

        void Saapui(OpasKohde k)
        {
            // Origo vain kauemmas siirryttäessä (Päätoimittaja 8.10. 07.5x, saapumisen nykäys: SetOriginLongitudeLatitudeHeight
            // päivittää kaikkien ~850 laatan sijainnit samassa ruudussa); kaupungin sisällä float-tarkkuus riittää SaapumisOrigoRajaM:iin.
            kaupunki.SiirraOrigoTarvittaessa(k.Lat, k.Lon, MaaKorkeus(k) is double m && !double.IsNaN(m) ? m : 45, SaapumisOrigoRajaM);
            if (puhuttu != k) AlkaaPuhua(k);   // ei aloitettu lennon lopussa (esim. sama paikka): nyt
            if (!Testi && OpasSilmukka.PalloLento && silmukka.KierrosKaynnissa && OnKirkko(k) && NykyinenKaupunkiId is string kid && Kehityskaupungit.On(kid) && kellotSoineet.Add(kid))
                o.StartCoroutine(SoitaKellot(k));
            if (!k.Id?.StartsWith("kysy-") ?? true) PaivitaKysymykset(k);
            saapumisia++;
            o.StartCoroutine(Siivoa());
            o.Kirjaa($"opas: saapui {k.Nimi} ({k.Lat:F4}, {k.Lon:F4}), ääni {(puhuu ? "soi" : "ei")}, laatat {kaupunki.Latausaste:F0} %");
            KameraLoki(k, "saapuessa"); o.StartCoroutine(KameraLokiMyohemmin(k, 6f));
            saapumisAika = Time.realtimeSinceStartup;
            if (kaupunki.Latausaste < LatausKuvaRaja && k.Kuvat != null && k.Kuvat.Length > 0 && !k.Kysymys)
            {
                latausKuva = k.Kuvat[0]; latausKuvaAlku = Time.realtimeSinceStartup;
                o.Kirjaa($"opas: latauskuva näkyviin (laatat {kaupunki.Latausaste:F0} %)");
                LatausKuvaVaihtui?.Invoke(latausKuva);
            }
            o.Kirjaa($"opas: kuvat {k.Kuvat?.Length ?? 0} (tekijällä {System.Linq.Enumerable.Count(k.Kuvat ?? Array.Empty<OpasKuva>(), x => !string.IsNullOrEmpty(x.Tekija))}), hylätty yhteensä {OpasKuva.Hylatyt}");
            {
                double maaK = silmukka?.NykyinenKehys?.MaaM ?? (MaaKorkeus(k) is double mk && !double.IsNaN(mk) ? mk : 45);
                // Muotoa seuraava korostus (omistaja 9.10., juna 170), jos kohteella on pohjapiirros; muuten Siirtosepän rengas (juna 145).
                if (!KohdeKorostus.Nayta(NykyinenKaupunkiId, k, maaK)) OpasKorostusKuva.Nayta(k, maaK, kaupunki.Georef);
            }
        }

        /// <summary>Kappale tai kysymys ääneen; ilman ääntä (testi, Kertoja pois, lataus kesken) teksti ruudulle kestoksi.</summary>
        void Soita(OpasKohde k)
        {
            // Siltalause soi vielä: kerronta alkaa pehmeästi sen perään (enintään SiltaOdotusS).
            if (silta != null && silta.isPlaying && siltaOdottaa != k) { siltaOdottaa = k; o.StartCoroutine(SoitaSillanJalkeen(k)); return; }
            siltaOdottaa = null;
            Hiljenna();
            tekstina = null;
            bool kertoja = Asetukset.Paalla(Kytkin.Kertoja);
            // Ääni latautuu vielä (simu 19.0x: saapumiset ilman ääntä): odotetaan enintään AaniOdotusS ennen tekstiä.
            string avain = AaniAvain(k);
            if (kertoja && !string.IsNullOrEmpty(avain) && !klipit.ContainsKey(avain) && aaniOdotus != k) { aaniOdotus = k; o.StartCoroutine(OdotaAani(k)); return; }
            aaniOdotus = null;
            if (kertoja && !string.IsNullOrEmpty(avain) && klipit.TryGetValue(avain, out var klippi) && klippi != null && puhe != null)
            {
                puhe.clip = klippi; puhe.volume = KertojanTaso; puhe.Play();
                TekstiPois();   // äänellinen kerronta: tekstitilan itse avaama chat kiinni
                // PCM-virran klipin pituus ei ole kerronnan kesto: vastauksen kesto_s ensin (yksityiskohtakuvien varapolku).
                if (!k.Kysymys) YksAloita(k.Id, k.Teksti, puhe, klippi, k.AaniAjat, k.KestoS > 0 && pcmVirrat.ContainsKey(avain) ? k.KestoS : klippi.length);
                puhuu = true; y.Repliikki(true); puheAlkoi = Time.unscaledTime;
                pelaajanToimi = -1f;   // kerronta alkoi: odotus-lausetta ei tarvita
                pcmNyt = pcmVirrat.TryGetValue(avain, out var v) ? v : null;
                puheLoppuu = pcmNyt != null ? float.MaxValue : Time.unscaledTime + klippi.length;
                return;
            }
            o.Kirjaa($"opas: kappale tekstinä ({(!kertoja ? "Kertoja pois" : string.IsNullOrEmpty(avain) ? "ei ääntä vastauksessa" : "ääni ei latautunut")})");
            tekstina = k;
            // ÄÄNETÖN KAUPUNKIESITYS (Päätoimittaja 7.10. 18.2x): kesto lukunopeudesta (kesto_s etusijalla, jos annettu), teksti
            // näkyy itsestään oppaan Näytä teksti -näkymässä, ja yksityiskohtakuvat ajoitetaan kuluvasta lukuajasta.
            double s = k.KestoS > 0 ? k.KestoS : KierrosLento.LukuKesto(k.Teksti);
            tekstiKulunut = 0;
            if (!k.Kysymys) { TekstiNakyviin(); YksAloitaTeksti(k.Id, k.Teksti, s, () => tekstina == k); }
            o.StartCoroutine(TekstiLoppuu(s, k));
        }
        OpasKohde tekstina, aaniOdotus;
        float puheAlkoi;
        const float AaniOdotusS = 10f;
        /// <summary>Alkupuskurin tarve, jonka ylittyessä odotus täytetään siltalauseella (Päätoimittaja: ~3 s).</summary>
        const float PcmSiltaS = 3f;   // #4018: mp3 valmistuu GETissä ~8–9 s tekstin jälkeen (toiveen polku)

        IEnumerator OdotaAani(OpasKohde k)
        {
            float t0 = Time.realtimeSinceStartup;
            string avain = AaniAvain(k);
            bool siltaSoitettu = false;
            // Hidas PCM-virta (juna 154): odotus voi venyä alkupuskurin verran (enintään OpasPcmPuskuri.MaxS), ja yli PcmSiltaS:n
            // odotus täytetään siltalauseella eikä hiljaisuudella (Päätoimittaja 6.10. 21.0x).
            while (silmukka != null && !klipit.ContainsKey(avain)
                && Time.realtimeSinceStartup - t0 < AaniOdotusS + (pcmVirrat.ContainsKey(avain) ? (float)OpasPcmPuskuri.MaxS : 0f))
            {
                if (!siltaSoitettu && pcmVirrat.TryGetValue(avain, out var pv) && pv.AlkuTarve > PcmSiltaS)
                {
                    siltaSoitettu = true;
                    o.Kirjaa($"opas: hidas PCM-virta, alkupuskuri {pv.AlkuTarve:F1} s → siltalause");
                    Silta(silmukka.Vaihe == OpasVaihe.Lentaa ? OpasSiltalauseet.Odotus : OpasSiltalauseet.OdotusPaikalla, false);
                }
                yield return null;
            }
            if (silmukka == null || (silmukka.Nykyinen != k && !(silmukka.OdottaaVastausta && viimeKysymys == k))) yield break;
            o.Kirjaa($"opas: ääni {(klipit.ContainsKey(avain) ? "latautui" : "ei latautunut")} {Time.realtimeSinceStartup - t0:F1} s:ssa");
            Soita(k);
        }

        int saapumisia;
        OpasKohde puhuttu;

        /// <summary>Kappale alkaa noin 3 s ennen saapumista (Päätoimittaja 5.10. 19.4x: hiljaisuus pysähdysten välissä enintään ~3 s).</summary>
        void AlkaaPuhua(OpasKohde k)
        {
            if (kerroLisaaOdottaa) { kerroLisaaOdottaa = false; jatkoVastauksenJalkeen = true; }
            if (k == null || puhuttu == k) return;
            puhuttu = k;
            if (k.Id != null && k.Id.StartsWith("kysy-")) kysyOdotus.Alkoi();   // kysymyksen vastaus alkoi: odotusportaat seis
            VapautaVanhatAanet(k);
            Soita(k);
            KysymysChattiin(k);   // kappale ja sen vaihtoehdot Pulu-chatiin (Natiivi-UI 18.0x)
        }

        /// <summary>Muut kuin nykyinen ja esihaettu kappale pois muistista (AudioClip vapautetaan).</summary>
        void VapautaVanhatAanet(OpasKohde nyt)
        {
            var pidetaan = new HashSet<string>();
            if (AaniAvain(nyt) != null) pidetaan.Add(AaniAvain(nyt));
            if (AaniAvain(silmukka?.Seuraava) != null) pidetaan.Add(AaniAvain(silmukka.Seuraava));
            if (AaniAvain(silmukka?.JatkoKohde) != null) pidetaan.Add(AaniAvain(silmukka.JatkoKohde));   // JATKA lukee sen alusta
            if (AaniAvain(viimeKysymys) != null && silmukka != null && silmukka.OdottaaVastausta) pidetaan.Add(AaniAvain(viimeKysymys));
            var pois = new List<string>();
            foreach (var kv in klipit) if (!pidetaan.Contains(kv.Key)) pois.Add(kv.Key);
            foreach (var u in pois) { if (klipit[u] != null && (puhe == null || puhe.clip != klipit[u])) UnityEngine.Object.Destroy(klipit[u]); klipit.Remove(u); pcmVirrat.Remove(u); }
        }

        /// <summary>Pysähdyksen alussa (kamera kiertää hitaasti): käyttämättömät resurssit pois ja muistierittely lokiin.</summary>
        IEnumerator Siivoa()
        {
            yield return new WaitForSecondsRealtime(1.5f);
            if (silmukka == null) yield break;
            var op = Resources.UnloadUnusedAssets();
            while (!op.isDone) yield return null;
            o.Kirjaa($"opas: {saapumisia}. pysähdys, " + kaupunki.Muisti());
        }

        IEnumerator TekstiLoppuu(double s, OpasKohde k)
        {
            double t = 0;
            while (t < s) { if (!tauolla) t += Time.unscaledDeltaTime; if (tekstina == k) tekstiKulunut = t; yield return null; }   // tauko pysäyttää myös tekstikappaleen
            if (silmukka != null && tekstina == k && !puhuu) { tekstina = null; silmukka.AaniLoppui(); o.StartCoroutine(TekstiPoisViiveella()); }
        }

        /// <summary>
        /// Workerin kysymys: William kysyy ääneen, ja vaihtoehdot näkyvät Pulu-chatissa kahtena jatkokysymyksenä
        /// (Natiivi-UI: UiNakymat.Chat.Vastaa, heijastuksella, jotta tämä kääntyy myös ilman sitä). Valinta tulee Toive-kutsuna.
        /// </summary>
        void Kysyy(OpasKohde k)
        {
            if ((!PcmKaytossa || string.IsNullOrEmpty(k.AaniPcm)) && !string.IsNullOrEmpty(k.Aani) && !klipit.ContainsKey(k.Aani)) { o.StartCoroutine(SoitaLadattuna(k)); }
            else Soita(k);   // PCM: Soita odottaa virtaa (OdotaAani)
            KysymysChattiin(k);
            o.Kirjaa($"opas: kysyy \"{k.Teksti}\" [{string.Join(" | ", k.Vaihtoehdot ?? Array.Empty<string>())}]");
        }

        IEnumerator SoitaLadattuna(OpasKohde k)
        {
            yield return LataaAani(k.Aani);
            if (silmukka != null && silmukka.OdottaaVastausta) Soita(k);
        }

        /// <summary>Viimeisin kysymys ja vaihtoehdot (UI näyttää ne myös ilman chattia).</summary>
        public OpasKohde Kysymys => silmukka != null && silmukka.OdottaaVastausta ? viimeKysymys : null;
        OpasKohde viimeKysymys;

        /// <summary>Pulu-chat on käytettävissä (Natiivi-UI): kappale näytetään vain siellä, ei kertojalaatikossa.</summary>
        public static bool ChatKaytossa => ChatVastaa(out _, out _) != null;

        static System.Reflection.MethodInfo ChatVastaa(out object chat, out System.Reflection.ParameterInfo[] p)
        {
            chat = null; p = null;
            var ui = UiNakymat.Hae();
            chat = ui?.GetType().GetField("Chat")?.GetValue(ui) ?? ui?.GetType().GetProperty("Chat")?.GetValue(ui);
            var m = chat?.GetType().GetMethod("Vastaa");
            p = m?.GetParameters();
            return m;
        }

        /// <summary>Chat auki oppaalle (Natiivi-UI: Chat.AvaaOppaalle()) tai kiinni (Chat.SuljeOppaalta()), jos metodit ovat olemassa.</summary>
        static void ChatOppaalle(bool auki)
        {
            try
            {
                ChatVastaa(out var chat, out _);
                var m = chat?.GetType().GetMethod(auki ? "AvaaOppaalle" : "SuljeOppaalta", Type.EmptyTypes);
                m?.Invoke(chat, null);
            }
            catch (Exception) { }
        }

        void KysymysChattiin(OpasKohde k)
        {
            if (k.Kysymys) viimeKysymys = k;
            try
            {
                var vastaa = ChatVastaa(out var chat, out var p);
                if (vastaa == null) return;
                object jatkot = k.Vaihtoehdot ?? Array.Empty<string>();
                if (p.Length == 2 && !p[1].ParameterType.IsAssignableFrom(jatkot.GetType()))
                    jatkot = p[1].ParameterType.IsAssignableFrom(typeof(List<string>)) ? new List<string>(k.Vaihtoehdot ?? Array.Empty<string>()) : null;
                vastaa.Invoke(chat, p.Length == 2 ? new[] { (object)k.Teksti, jatkot } : new object[] { k.Teksti });
            }
            catch (Exception e) { o.Kirjaa("opas: kysymys chattiin epäonnistui: " + e.GetType().Name); }
        }

        void Hiljenna()
        {
            YksPois();
            pcmNyt = null;
            if (puhe != null && puhe.isPlaying) puhe.Stop();
            if (puhuu) { puhuu = false; y.Repliikki(false); }
        }

        public string Muisti() => "opas: " + kaupunki.Muisti();

        public string Tila() => silmukka == null ? "opas: kiinni"
            : $"opas: {kaupunki.Kaytossa} {silmukka.Vaihe} {(silmukka.Nykyinen?.Nimi ?? "-")}, seuraava {(silmukka.Seuraava?.Nimi ?? "-")}, nähty {System.Linq.Enumerable.Count(silmukka.Nahdyt)}, laatat {kaupunki.Latausaste:F0} %"
              + (Testi ? ", TESTI" : "") + (Virhe != null ? ", VIRHE " + Virhe : "");

        /// <summary>Peite pois vasta, kun kaupunkia näkyy (laatat ≥ PeiteRaja %, enintään PeiteMaxS): ei tasaista värilaattaa avauksessa
        /// (omistaja TF 144, toisto 6.10. 00.04). Vähintään 0,3 s (simu 18.39: peite jäi päälle ilman ajastinta).</summary>
        System.Collections.IEnumerator PeitePois()
        {
            float t0 = Time.realtimeSinceStartup;
            yield return new WaitForSecondsRealtime(0.3f);
            while (silmukka != null && kaupunki.Latausaste < PeiteRaja && Time.realtimeSinceStartup - t0 < PeiteMaxS) yield return null;
            y?.Peite(false);
            o.Kirjaa($"opas: peite pois {Time.realtimeSinceStartup - t0:F1} s, laatat {kaupunki.Latausaste:F0} %");
        }
        // Päätoimittaja 8.10. 09.0x: peite pois vasta ≥ 95 % (yleiskuva ja 1. kohde), turvaraja ~12 s (oli 35 % / 4 s).
        const float PeiteRaja = 95f, PeiteMaxS = 20f;   // juna 165: turvaraja 20 s (1. kohde yleiskuvan jälkeen)

        public void Sulje()
        {
            YksPois(); kortti?.Sulje(); kortti = null; tekstiAvasiChatin = false; Nosto?.Piilota(); if (kelloLahde != null) kelloLahde.Stop(); kellotSoineet.Clear();
            luotain?.Dispose(); luotain = null;
            OpasKorostusKuva.Piilota(true); KohdeKorostus.Piilota(true);
            KaupunkiYovalot.Kohde = null;
            KaupunkiYovalot.KohdeOsuus = OpasKorostusKuva.Osuus = 1f;
            saaKerros?.Sulje(); saaKerros = null; KaupunkiKuva.Saa = default; KaupunkiKuva.Salama = 0;
            if (ukkosLahde != null) { UnityEngine.Object.Destroy(ukkosLahde); ukkosLahde = null; }
            KyydinKameraEnnen.Ajo = null;
            KytkeNimilappu(false);
            Sumenna(false);
            kysymykset = null; kohteet = null; kohteetKaupunki = null; historia.Clear(); siirtymaEdellinen = false;
            if (silta != null && silta.isPlaying) silta.Stop();
            pelaajanToimi = -1f;
            kysyOdotus.Alkoi();
            if (nimiaanet == null) nimiaLadataan = false;   // lataus katkesi sulkuun: uusi yritys seuraavassa avauksessa
            nimiSoitto = null;
            KrediititTiivis.OsmNakyvissa = false;
            KrediititTiivis.Paivita(false);
            Hiljenna();
            KytkeChat(false);
            ChatOppaalle(false);
            y?.KuvausLoppui();
            bool avattiin = nakymaAuki;
            nakymaAuki = false;
            kaupunki.Sulje();
            SyoteLukko.Vapauta(this);
            if (avattiin)
            {
                y?.Pelikerrokset(true);
                y?.MusiikkiPitoon(false);
            }
            silmukka = null; paivitetty = -1; Virhe = null; puhuu = false; tauolla = false; takyt = null;
            foreach (var k in klipit.Values) if (k != null) UnityEngine.Object.Destroy(k);
            klipit.Clear();
            pcmVirrat.Clear(); pcmNyt = null;
            maaKorkeudet.Clear();
            kori.Sulje(); koriKatse.Pois(); palloAanet.Sulje(); OpasSilmukka.PalloLento = false;
            AsetaKaupunkitila(null);
            Vaihtui?.Invoke(null);
        }
    }
}
