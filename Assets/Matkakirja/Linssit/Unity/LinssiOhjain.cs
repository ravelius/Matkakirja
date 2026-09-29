// LINSSIOHJAIN: linssien Unity-kytkentä (Linssiseppä 23.9.2026).
//
// KÄYNNISTYY ITSE (RuntimeInitializeOnLoadMethod, kuten PeliOhjain): etsii
// PalloKierron, luo olion "LinssiOhjain", rekisteröi linssit ja kutsuu
// rekisterin Paivita-metodia joka kehys. Rakennus.cs:ään ei tarvita muutoksia.
//
// Tämä tiedosto on Assembly-CSharpissa (ei asmdefiä), jotta Natiivi-UI näkee
// ohjaimen suoraan. Linssien logiikka on puhtaassa ytimessä (Linssit/Ydin,
// asmdef Matkakirja.Linssit.Ydin); tässä on vain sovitin sen ja kartan välillä:
//   - kerrokset → KarttaKerrokset.Instanssi (Natiiviseppä, RAJAPINTA.md luku 4)
//   - kamera    → PalloKierto (RAJAPINTA.md luku 1)
//   - peite, musiikki ja vähennetty liike → koukut, jotka UI ja äänet asettavat
//
// TESTIKOMENNOT ilman UI:ta: Documents/linssi-komento.txt, rivi kerrallaan
// "linssi <id>" (vaihtokytkin), "linssi pois", "linssit" (luettelo lokiin);
// maatilan linsseille "maa <ISO3>" (napautus), "vertaa" ja "lehti" (maakyltti);
// keksinnöille "keksinnot kaynnista | jatka | tauko | tila | <pysäkki 0–25>";
// ihmisen matkalle "esitys <jakso-id> | kaynnista | alusta | tauko | jatka | toista | alkuun | loppuun | tila" (toista, alkuun ja
// loppuun = II:n soittimen ⏯ ⏮ ⏭, IhmisenMatkaLinssi.Ohjaus) ja II:lle "sumu pois | paalle | tila"
// (kehysaikojen vertailu sumun kanssa ja ilman); kaikille
// "kamera <lat> <lon> <korkeus km>" (hyppy kuvakaappausta varten), "tila" ja
// "kyllaisyys 0.8|1" (astronautin reliefi) ja "kehittaja 0|1" (kaikki linssit auki);
// radiolle "radio <ISO3> | kaupunki <id> | taajuus <0–1> | aani <0–1> | tauko 0|1 | stop | tila" (aani 0 = testit ilman ääntä, soi-tila näkyy silti);
// kylläisyys ja kehittäjätila muistetaan PlayerPrefsissä; isoisän linssille 1873 "isoisa tila";
// linssien äänille "aani tila | keksinto | vuosi | humina [pois]" (soitto ja lähteen aika hetken päästä, humina
// Pelikoodarin maisemakanavalla ilman linssiä); elävälle kartalle "elava kreikka [alku s] [nopeus] | kuva <s> | jatka |
// saapuminen <kaupunki> | saato | ui | pois | tila" (ElavaKartta); ISS:n radalle "iss tila | lataa" (IssTleLataaja).
// Tulos lokiin ja Documents/linssi-loki.txt:hen.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using CesiumForUnity;
using Matkakirja.Linssit;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public class LinssiOhjain : MonoBehaviour, ILinssiYmparisto
    {
        public static LinssiOhjain Instanssi { get; private set; }

        /// <summary>Linssirekisteri (Natiivi-UI:n valitsin lukee tätä).</summary>
        public static Linssirekisteri Rekisteri => Instanssi?.rekisteri;

        /// <summary>Tumma odotuspeite (Natiivi-UI asettaa). Ilman sitä peite on vain lokissa.</summary>
        public static Action<bool> PeiteKasittelija;
        /// <summary>Taustamusiikin pito (Pelikoodarin äänet asettavat).</summary>
        public static Action<bool> MusiikkiKasittelija;

        /// <summary>
        /// Linssin portti (web linssikarttaEstaa): true = auki oleva linssi estää Liikun, siirrot ja lehdet.
        /// Pelikoodari lukee tämän PeliOhjain.LiikuEstetty-/Kulkutavat-tilaan ja kuuntelee PorttiMuuttui-
        /// tapahtumaa (→ LiikuMuuttui), jotta Liiku harmaantuu ja palaa heti.
        /// </summary>
        public static bool KarttaEstetty => Instanssi?.rekisteri?.EstaaKartan ?? false;
        /// <summary>Testikomento "radio esikuuntelu pois|paalle": radion esikuuntelun A/B-mittaus (oletus päällä).</summary>
        public static bool EsikuunteluPois;
        public static event Action<bool> PorttiMuuttui;
        bool porttiOli;
        /// <summary>Linssin oma raita (Pelikoodari: Aanisoitin.LinssiMusiikki): laji tai null = pois.</summary>
        public static Action<string> LinssiMusiikkiKasittelija;
        /// <summary>Linssin äänitehoste ja taustaääni (Aanisoitin, PeliOhjain.Aanet kytkee).</summary>
        public static Action<string, float> TehosteKasittelija;
        public static Action<string> TaustaaaniKasittelija;
        /// <summary>Nimetty taustasilmukka poolista (Aanisoitin.LinssiSilmukka), Linnanrakentaja erä 2 (dioraama).</summary>
        public static Func<string, ISilmukka> SilmukkaKasittelija;
        /// <summary>Dioraaman repliikin puhuja-merkki (Aanisoitin.DioraamaRepliikki), Linnanrakentaja erä 2.</summary>
        public static Action<bool> RepliikkiKasittelija;
        /// <summary>Raidan taso 0…1 (Pelikoodari: Aanisoitin.LinssiHimmennys): 1 ajossa, 0,5 tauolla ja lopussa.</summary>
        public static Action<double> LinssiHimmennysKasittelija;
        /// <summary>
        /// Pallon pisteen ruutusijainti Unityn ruutupikseleinä (origo vasen ALAkulma, kuten
        /// Camera.WorldToScreenPoint); null, kun piste on pallon takana. Linssien UI-merkit (radion
        /// napit) muuntavat paneeliin RuntimePanelUtils.ScreenToPanel(panel, (x, Screen.height − y)).
        /// </summary>
        public static Vector2? Ruutupiste(double lat, double lon)
        {
            var o = Instanssi;
            var kierto = o != null ? o.kierto : null;
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            var g = kierto != null ? kierto.georeferenssi : null;
            if (kamera == null || g == null) return null;
            var keskus = g.TransformEarthCenteredEarthFixedPositionToUnity(Unity.Mathematics.double3.zero);
            var u = g.TransformEarthCenteredEarthFixedPositionToUnity(
                CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new Unity.Mathematics.double3(lon, lat, 0)));
            Vector3 paikka = g.transform.TransformPoint((Vector3)(Unity.Mathematics.float3)u);
            Vector3 normaali = g.transform.TransformDirection((Vector3)(Unity.Mathematics.float3)Unity.Mathematics.math.normalize(u - keskus));
            if (Vector3.Dot(normaali, (kamera.transform.position - paikka).normalized) <= 0.02f) return null;
            Vector3 r = kamera.WorldToScreenPoint(paikka);
            return r.z > 0 ? new Vector2(r.x, r.y) : (Vector2?)null;
        }

        /// <summary>Pelaajan paikka pallolla (PeliOhjain + reittiverkko); null ennen matkaa.</summary>
        public static Matkakirja.Linssit.Aikajana.LatLon? PelaajanPaikka()
        {
            var p = PeliOhjain.Instanssi;
            var m = p?.Matka;
            if (m == null || p.Verkko == null) return null;
            var k = PeliApu.Koordinaatti(p.Verkko, m.Tila.Pelaaja.Sijainti);
            return k is var (lat, lon) ? new Matkakirja.Linssit.Aikajana.LatLon(lat, lon) : (Matkakirja.Linssit.Aikajana.LatLon?)null;
        }

        /// <summary>
        /// Laitepikseliä yhdellä pisteellä (CSS px / iOS pt), kuten Natiivi-UI: Round(dpi / 163).
        /// iPadin 1x-tiheys on 132 dpi, joten pyöristämätön dpi/163 antoi 264 dpi:n iPadille 1,62
        /// eikä 2: lamput, reikä ja vanat olivat 0,81× webin koosta (kontakti 24.9.).
        /// </summary>
        public static float Pistekerroin => Screen.dpi > 0 ? Mathf.Max(1f, Mathf.Round(Screen.dpi / 163f)) : 1f;

        /// <summary>Vähennetty liike (iOS UIAccessibilityIsReduceMotionEnabled, liitännäinen).</summary>
        public static Func<bool> VahennettyLiikeKysely;

        PalloKierto kierto;
        /// <summary>Maiden aineisto (vertailu ja maatiedot), kun ladattu; muuten null.</summary>
        internal static Matkakirja.Linssit.Maat.MaatAineisto MaatAineisto;
        MaapallonVuosiSovitin vuosi;
        DioraamaSovitin poikki;
        Linssirekisteri rekisteri;

        /// <summary>PlayerPrefs-avain astronautin reliefin kylläisyydelle (Natiivi-UI:n kehittäjävalikko).</summary>
        // v2: oletus vaihtui webin 0,8:aan (23.9.), vanha tallennettu 1,0 ei jää voimaan.
        public const string KyllaisyysAvain = "linssi.astronautti.kyllaisyys.v2";

        /// <summary>PlayerPrefs-avain linssien kehittäjätilalle (kaikki auki).</summary>
        public const string KehittajatilaAvain = "linssi.kehittajatila";
        /// <summary>
        /// Kehittäjätilan oletus, kun PlayerPrefsissä ei ole arvoa (Fable 23.9.2026): sisäisissä
        /// TestFlight-buildeissa kaikki linssit auki, ja KOEKET-valikon "kynnykset päällä" kytkee
        /// sen pois; App Store -versiossa kynnykset aina (määrite MATKAKIRJA_APPSTORE, jonka
        /// Rakennus asettaa App Store -käännökseen).
        /// </summary>
#if MATKAKIRJA_APPSTORE
        public static readonly bool KehittajatilaOletus = false;
#else
        public static readonly bool KehittajatilaOletus = true;
#endif

        /// <summary>Kehittäjätila päälle/pois ja muistiin (Natiivi-UI:n KOKEET, testikomento kehittaja).</summary>
        public static void AsetaKehittajatila(bool paalla)
        {
#if MATKAKIRJA_APPSTORE
            return;   // App Store: kynnykset aina
#endif
            Linssirekisteri.Kehittajatila = paalla;
            PlayerPrefs.SetInt(KehittajatilaAvain, paalla ? 1 : 0);
            PlayerPrefs.Save();
        }

        /// <summary>Asettaa ja muistaa astronautin reliefin kylläisyyden (0,8 tai 1,0); vaikuttaa seuraavaan avaukseen.</summary>
        public static void AsetaAstronautinKyllaisyys(float arvo)
        {
            Matkakirja.Linssit.Astronautti.AstronauttiLinssi.Kyllaisyys = arvo;
            PlayerPrefs.SetFloat(KyllaisyysAvain, arvo);
            PlayerPrefs.Save();
        }
        KerrosSovitin kerrokset;
        /// <summary>Keksintöjen kilahdus ja vuosinaksahdus syntetisoituina (Tehoste ohjaa ne tänne).</summary>
        LinssiTehosteet tehosteet;
        string komentoPolku, lokiPolku;
        float komentoKello;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        public static void Kaynnista()
        {
            if (Instanssi != null) return;
            var kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto == null)
            {
                Debug.LogWarning("MATKAKIRJA linssit: kohtauksessa ei ole PalloKiertoa, linssit eivät käynnisty");
                return;
            }
            var go = new GameObject("LinssiOhjain");
            go.AddComponent<LinssiOhjain>().Alusta(kierto);
        }

        void Alusta(PalloKierto k)
        {
            Instanssi = this;
            kierto = k;
            kerrokset = new KerrosSovitin();
            // Astronautin reliefin kylläisyys: oletus webin 0,8, täysväri 1,0 vain KOKEET-kytkimellä.
            Matkakirja.Linssit.Astronautti.AstronauttiLinssi.Kyllaisyys =
                PlayerPrefs.GetFloat(KyllaisyysAvain, (float)Matkakirja.Linssit.Astronautti.AstronauttiLinssi.WebinKyllaisyys);
            // Kehittäjätila (kaikki linssit auki): sisäinen build oletuksena päällä, App Store ei koskaan.
#if MATKAKIRJA_APPSTORE
            Linssirekisteri.Kehittajatila = false;   // App Store: kynnykset aina, ei kytkintä
#else
            Linssirekisteri.Kehittajatila = PlayerPrefs.GetInt(KehittajatilaAvain, KehittajatilaOletus ? 1 : 0) == 1;
#endif
            // Radiotila (web luentaSallittu): kaupungin napautus on play-nappi eikä avaa korttia,
            // ja luennat vaikenevat (Pelikoodarin koukut, pelikoodari/linssikytkennat).
            // Linssin portti (web linssikarttaEstaa) estää myös kaupungin napautuksen.
            PeliOhjain.NapautusSallittu = () => Matkakirja.Linssit.Radio.RadioLinssi.LuentaSallittu && !KarttaEstetty;
            // Liiku, Matkusta, Tutki ja lehdet kiinni portin ajan (Pelikoodarin pelikoodari/linssiportti).
            PeliOhjain.LinssiEstaa = () => KarttaEstetty;
            PorttiMuuttui += _ => PeliOhjain.LinssiPorttiMuuttui();
            PeliOhjain.LuentaSallittu = () => Matkakirja.Linssit.Radio.RadioLinssi.LuentaSallittu;
            Linssirekisteri.Mittaa = Mittaa;
            foreach (var id in MitattavatLinssit)
                foreach (var v in new[] { Linssirekisteri.Avaus, Linssirekisteri.Paivitys, Linssirekisteri.Sulku, Linssirekisteri.Vaihto, OsaKerros, OsaAani, OsaLinssi, OsaTahdet, OsaPilvet,
                    "Avaa.Muisti", "Avaa.Esitys", "Avaa.Jatka", "Avaa.Vanat", "Virta.Avaa", "Viritin.Aloita", "Korosta" })
                    Merkki(id, v);
            rekisteri = new Linssirekisteri(this);
            rekisteri.Lisaa(new Topografia());
            // Yökartta (Linssiseppä 29.9.2026, omistaja NATIIVI ENSIN): vain natiivi, kehittäjätilassa (ei avauskynnystä).
            rekisteri.Lisaa(new YokarttaSovitin(this));
            // Maapallon vuosi (Linssiseppä 2, 28.9.2026): hiomassa, vain kehittäjätilassa (ei avauskynnystä).
            rekisteri.Lisaa(vuosi = new MaapallonVuosiSovitin(this, k));
            rekisteri.Lisaa(poikki = new DioraamaSovitin(this, k));
            StartCoroutine(LataaLinssitJoutilaana());
            StartCoroutine(LammitaFontti());
            rekisteri.Vaihtui += l => Kirjaa("auki: " + (l?.Tiedot.Id ?? "ei mitään"));
            // Zoomikaista pois aina, kun mikään linssi ei ole auki (linssin oma Sulje palauttaa sen myös vaihdossa).
            rekisteri.Vaihtui += l => { if (l == null) kierto?.LinssinRajat(null, null); };
            // ESILATAUSPOLITIIKKA kohdat 6 (linssi aukeaa) ja 4 (joutilaana): Linssisepän listat Esilataajan jonoon.
            LinssienEsilataaja.Kytke(this, rekisteri);
            // Syntetisoidut tehosteet (ESILATAUSPOLITIIKKA kohta 1: efektiäänet ilman verkkoa) taustasäikeessä heti.
            tehosteet = LinssiTehosteet.Luo(transform);
            // Elävä kartta: saapuminen uuteen maahan (≤ 5 s, ohitettava) ja aineiston esilataus taustalla.
            ElavaKartta.KytkeSaapumiset(this);
            rekisteri.Vaihtui += _ =>
            {
                bool nyt = rekisteri.EstaaKartan;
                if (nyt == porttiOli) return;
                porttiOli = nyt;
                PorttiMuuttui?.Invoke(nyt);
            };
            komentoPolku = Path.Combine(Application.persistentDataPath, "linssi-komento.txt");
            lokiPolku = Path.Combine(Application.persistentDataPath, "linssi-loki.txt");
        }

        /// <summary>
        /// FONTIN ESILÄMMITYS: linssien 3D-nimet (TextMeshPro, kartan fontti) lataavat ensimmäisellä
        /// jäsennyksellä fontin OpenType-taulut (GetOpenTypeFontFeatures, GetLigatureSubstitutionRecords):
        /// ~11 ms satelliitin avauksen kehyksessä iPadilla (ui piikit 24.9., ajo 3). Tehdään kerran heti,
        /// kun kartan fontti on olemassa, piilotetulla tekstillä, jossa on skandit ja isot kirjaimet.
        /// </summary>
        /// <summary>Linssien 3D-nimien merkistö (paikannimet eri kielistä latinalaisin kirjaimin).</summary>
        const string Merkisto =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,:;-–—'’\"()/&!?°" +
            "ÅÄÖÜÉÈÊËÁÀÂÃÍÌÎÏÓÒÔÕÚÙÛÑÇØÆŒÝŠŽČĆĐŁŃŚŹŻĘĄŐŰĞŞİ" +
            "åäöüéèêëáàâãíìîïóòôõúùûñçøæœýšžčćđłńśźżęąőűğşıß";

        System.Collections.IEnumerator LammitaFontti()
        {
            TMPro.TMP_FontAsset fontti = null;
            for (float t = 0; t < 60 && fontti == null; t += 0.5f)
            {
                fontti = KarttaKerrokset.Instanssi != null && KarttaKerrokset.Instanssi.merkit != null ? KarttaKerrokset.Instanssi.merkit.fontti : null;
                if (fontti == null) yield return new WaitForSecondsRealtime(0.5f);
            }
            if (fontti == null) { Kirjaa("fonttilämmitys: kartan fonttia ei löytynyt"); yield break; }
            // Natiiviseppä 26.9. (aloitusverho-katto): lämmitys varasi pääsäikeen verhon aikana, jolloin Cesium ei edennyt ja
            // ensimmäinen käynnistys osui verhon 8 s:n kattoon. Nyt se alkaa vasta verhon jälkeen, ja kehyksessä tehdään
            // enintään LammitysMs työtä (vähintään yksi merkki, jotta työ etenee).
            float odotusAlku = Time.realtimeSinceStartup;
            while (Aloitusverho.Nakyvissa && Time.realtimeSinceStartup - odotusAlku < 60f) yield return null;
            float t1 = Time.realtimeSinceStartup, pisinLisays = 0, pisinJasennys = 0, suurinMerkki = 0, suurinPala = 0;
            int kehyksia = 0;
            // Ajo 4 (24.9.): kustannus syntyy jokaisesta UUDESTA merkistä dynaamiseen atlakseen (glyfin rasterointi +
            // OpenType-tietueet), joten koko nimien merkistö lisätään ennalta (TryAddCharacters) merkki kerrallaan.
            // Natiiviseppä 26.9. b24-lammin: pisin työ kerran 5,6 ms. Raja on nyt ennakoiva: seuraava merkki (tai pala)
            // aloitetaan vain, jos tähänastinen työ + kallein yksittäinen merkki (pala) mahtuu LammitysMs:iin.
            int i = 0;
            while (i < Merkisto.Length)
            {
                float alku = Time.realtimeSinceStartup, kulunut;
                do
                {
                    float m0 = Time.realtimeSinceStartup;
                    fontti.TryAddCharacters(Merkisto.Substring(i, 1), out _);
                    i++;
                    suurinMerkki = Mathf.Max(suurinMerkki, (Time.realtimeSinceStartup - m0) * 1000f);
                    kulunut = (Time.realtimeSinceStartup - alku) * 1000f;
                } while (i < Merkisto.Length && kulunut + suurinMerkki < LammitysMs);
                pisinLisays = Mathf.Max(pisinLisays, kulunut);
                kehyksia++;
                yield return null;
            }
            // Jäsennys (OpenType-tietueet) JasennysPala merkin paloina näkymättömällä tekstillä ruudun ulkopuolella.
            var go = new GameObject("Fonttilämmitys");
            go.transform.position = new Vector3(0, -1e7f, 0);
            var t0 = go.AddComponent<TMPro.TextMeshPro>();
            t0.font = fontti;
            // Ensimmäinen jäsennys lataa fontin OpenType-taulut kerran (ei pilkottavissa): se tehdään yhdellä merkillä omassa
            // kehyksessään ja kirjataan erikseen (kylmä käynnistys b24-kylma: pisin 6,2–6,3 ms, todennäköisesti tämä).
            float ensimmainen = Time.realtimeSinceStartup;
            t0.text = Merkisto.Substring(0, 1);
            t0.ForceMeshUpdate(true, true);
            ensimmainen = (Time.realtimeSinceStartup - ensimmainen) * 1000f;
            kehyksia++;
            yield return null;
            int k = 1;
            while (k < Merkisto.Length)
            {
                float alku = Time.realtimeSinceStartup, kulunut;
                do
                {
                    float p0 = Time.realtimeSinceStartup;
                    t0.text = Merkisto.Substring(k, Math.Min(JasennysPala, Merkisto.Length - k));
                    t0.ForceMeshUpdate(true, true);
                    k += JasennysPala;
                    suurinPala = Mathf.Max(suurinPala, (Time.realtimeSinceStartup - p0) * 1000f);
                    kulunut = (Time.realtimeSinceStartup - alku) * 1000f;
                } while (k < Merkisto.Length && kulunut + suurinPala < LammitysMs);
                pisinJasennys = Mathf.Max(pisinJasennys, kulunut);
                kehyksia++;
                yield return null;
            }
            Destroy(go);
            // TryAddCharacters palauttaa false myös jo atlaksessa olevalle merkille (simulaattori 26.9.: "puuttuu 66" = kartan
            // nimien kirjaimet), joten todelliset puuttujat tarkistetaan lopuksi atlaksesta.
            var puuttuu = new System.Text.StringBuilder();
            foreach (char c in Merkisto) if (!fontti.HasCharacter(c)) puuttuu.Append(c);
            string puuttuvat = puuttuu.ToString();
            Kirjaa($"fonttilämmitys: {Merkisto.Length} merkkiä verhon jälkeen (odotus {(t1 - odotusAlku) * 1000:F0} ms), " +
                $"{(Time.realtimeSinceStartup - t1) * 1000:F0} ms {kehyksia} kehyksessä, pisin työ {Mathf.Max(ensimmainen, Mathf.Max(pisinLisays, pisinJasennys)):F1} ms " +
                $"(lisäys {pisinLisays:F1}, kallein merkki {suurinMerkki:F1}; ensimmäinen jäsennys {ensimmainen:F1}; " +
                $"jäsennys {pisinJasennys:F1}, kallein pala {suurinPala:F1})" +
                (string.IsNullOrEmpty(puuttuvat) ? "" : $", fontista puuttuu {puuttuvat.Length}: {puuttuvat}"));
        }

        /// <summary>Fonttilämmityksen jäsennyspala (merkkiä); 16 → 8, jotta yksi pala mahtuu LammitysMs:iin.</summary>
        const int JasennysPala = 8;

        /// <summary>Fonttilämmityksen työ kehyksessä enintään (ms), Natiivisepän pyyntö 26.9.</summary>
        public const float LammitysMs = 4f;

        /// <summary>Astronautin kamera rekisteriin, kun sen aineisto on ladattu paketista.</summary>
        /// <summary>Linssien aineiston katto (s käynnistyksestä), jos peli ei joudu joutilaaksi kartalla sitä ennen.</summary>
        public const float AineistoKattoS = 20f;
        static bool aineistoHeti;
        /// <summary>Linssien aineisto on haettu ja linssit rekisteröity.</summary>
        public static bool AineistoValmis { get; private set; }

        /// <summary>
        /// Linssien aineisto heti (valitsin avautuu tai linssiä pyydetään ennen joutilasta hetkeä). Natiivi-UI kutsuu, kun
        /// linssivalitsin avataan; linssi-komento kutsuu itse.
        /// </summary>
        public static void LataaAineistoHeti() => aineistoHeti = true;

        /// <summary>
        /// ESILATAUSPOLITIIKKA (Pelikoodarin käynnistysanalyysi 26.9.2026, lokit/kohta1-kaynnistys-20260926.md): linssien
        /// noin 20 aineistotiedostoa eivät kuulu kylmään käynnistykseen, vaan ensimmäiseen joutilaaseen hetkeen kartalla
        /// (kohta 4: Esilataaja.Joutilas, peli kartalla) tai linssin pyyntöön (kohta 6). Katto AineistoKattoS. Haut
        /// peräkkäin kevyimmästä, jottei verkko ruuhkaudu; rekisteröinti samoilla korutiineilla kuin ennen.
        /// </summary>
        System.Collections.IEnumerator LataaLinssitJoutilaana()
        {
            bool joutilas = false;
            Action kuuntelija = () => joutilas |= PeliOhjain.Instanssi != null && PeliOhjain.Instanssi.Tila == SilmukanTila.Kartta;
            Esilataaja.Joutilas += kuuntelija;
            float alku = Time.realtimeSinceStartup;
            while (!joutilas && !aineistoHeti && Time.realtimeSinceStartup - alku < AineistoKattoS) yield return null;
            Esilataaja.Joutilas -= kuuntelija;
            Kirjaa($"linssien aineisto: {(aineistoHeti ? "pyydetty" : joutilas ? "joutilaana kartalla" : "katto")} {Time.realtimeSinceStartup - alku:F1} s käynnistyksestä");
            foreach (var lataus in new Func<System.Collections.IEnumerator>[]
                { LataaKeksinnot, LataaMaat, LataaIhmisenMatka, LataaVesistot, LataaRadio, LataaAstronautti, LataaIsoisa })
                yield return lataus();
            AineistoValmis = true;
            Kirjaa($"linssien aineisto valmis {Time.realtimeSinceStartup - alku:F1} s käynnistyksestä");
        }

        /// <summary>Linssi-komento ennen aineistoa: haku heti, ja valinta, kun linssi on rekisteröity (enintään 30 s).</summary>
        System.Collections.IEnumerator ValitseKunValmis(string id)
        {
            LataaAineistoHeti();
            float alku = Time.realtimeSinceStartup;
            while (!AineistoValmis && rekisteri.Kaikki.All(l => l.Tiedot.Id != id) && Time.realtimeSinceStartup - alku < 30f) yield return null;
            rekisteri.Valitse(id);
        }

        System.Collections.IEnumerator LataaAstronautti()
        {
            string data = null, kysymykset = null;
            yield return LinssiSisalto.Hae("moduulit/js/linssit/satelliitti-data.json", t => data = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/astronaut-kysymykset.json", t => kysymykset = t);
            if (data == null) { Kirjaa("astronautin kamera: aineisto puuttuu"); yield break; }
            try
            {
                var aineisto = Matkakirja.Linssit.Astronautti.AstronauttiAineisto.Lue(
                    Matkakirja.Peli.MiniJson.Jasenna(data), kysymykset == null ? null : Matkakirja.Peli.MiniJson.Jasenna(kysymykset));
                rekisteri.Lisaa(new AstronauttiSovitin(this, aineisto));
                Kirjaa($"astronautin kamera: {aineisto.Kohteet.Count} kohdetta");
            }
            catch (Exception e) { Kirjaa("astronautin kamera: " + e.Message); }
        }

        static Dictionary<string, object> Olio(object x) => x as Dictionary<string, object>;

        /// <summary>Hakee osoitteen tekstinä (manifestit ämpäristä); null, jos ei onnistu.</summary>
        static System.Collections.IEnumerator HaeOsoite(string osoite, Action<string> valmis)
        {
            using var p = UnityEngine.Networking.UnityWebRequest.Get(osoite);
            p.timeout = 20;
            yield return p.SendWebRequest();
            valmis(p.result == UnityEngine.Networking.UnityWebRequest.Result.Success ? p.downloadHandler.text : null);
        }

        /// <summary>
        /// Ihmisen matka: aineisto, kertomusmanifesti ja rantamaski paketista; virrat ja
        /// vanat lasketaan taustasäikeessä heti latauksen jälkeen, jotta ne ovat valmiit,
        /// kun pelaaja avaa linssin (webissä Käynnistä-nappi odottaa samoin).
        /// </summary>
        System.Collections.IEnumerator LataaIhmisenMatka()
        {
            string data = null, kertomus = null, linssi = null, aineisto = null, manifesti = null;
            yield return LinssiSisalto.Hae("moduulit/js/linssit/ihmisen-matka-data.json", t => data = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/ihmisen-matka-kertomus.json", t => kertomus = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/ihmisen-matka.json", t => linssi = t);
            yield return LinssiSisalto.Hae("kokoelmat/linssiaineisto.json", t => aineisto = t);
            if (data == null || kertomus == null || linssi == null) { Kirjaa("ihmisen matka: aineisto puuttuu"); yield break; }

            Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto a;
            Matkakirja.Linssit.Virrat.VirtaAineisto virrat;
            Matkakirja.Linssit.Virrat.Ruutumaski rantamaski = null;
            string manifestinOsoite = null, aanenJuuri = null;
            try
            {
                a = Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto.Lue(Matkakirja.Peli.MiniJson.Jasenna(data), Matkakirja.Peli.MiniJson.Jasenna(kertomus));
                var linssiOlio = Olio(Olio(Olio(Matkakirja.Peli.MiniJson.Jasenna(linssi))?["exportit"])?["LINSSI"]);
                virrat = Matkakirja.Linssit.Virrat.AineistonLukija.LueLinssista(linssiOlio);
                var alkiot = aineisto == null ? null : Olio(Matkakirja.Peli.MiniJson.Jasenna(aineisto))?["alkiot"] as List<object>;
                foreach (var o in alkiot ?? new List<object>())
                {
                    var alkio = Olio(o);
                    var id = alkio?["id"] as string;
                    if (id == "rantamaski") rantamaski = Matkakirja.Linssit.Virrat.Ruutumaski.Lue(alkio);
                    // Päätaso ensin (2.0: alkiolla ei dataa); raaka data vain Paatason kautta (Pelikoodari 24.9.).
                    if (id == "kertomus" && (alkio.TryGetValue("manifesti", out var pm) && pm != null ? alkio : Matkakirja.Peli.Paataso.Raaka(alkio)) is Dictionary<string, object> k)
                    {
                        manifestinOsoite = k.TryGetValue("manifesti", out var m) ? m as string : null;
                        aanenJuuri = k.TryGetValue("juuri", out var j) ? j as string : null;
                    }
                }
            }
            catch (Exception e) { Kirjaa("ihmisen matka: " + e.Message); yield break; }

            if (manifestinOsoite != null) yield return HaeOsoite(manifestinOsoite, t => manifesti = t);
            object manifestiOlio = manifesti == null ? null : Matkakirja.Peli.MiniJson.Jasenna(manifesti);
            var leimat = manifestiOlio == null
                ? new Dictionary<string, Matkakirja.Linssit.Aikajana.JaksonLeimat>()
                : Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto.LueManifesti(manifestiOlio);
            string aanite = manifestiOlio == null || aanenJuuri == null ? null
                : Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto.ManifestinAanite(manifestiOlio, aanenJuuri);

            var sovitin = new IhmisenMatkaSovitin(this, a, leimat, aanite, virrat, rantamaski);
            rekisteri.Lisaa(sovitin);
            // IHMISEN MATKA II (omistaja 25.9.2026): sama aineisto, kertoja ja vanat, oma näkymän tehostekerros ja muisti.
            // Piirto esirakennetaan vasta avatessa (VanatSeuraavassa odottaa taustasäiettä), jottei käynnistys tee työtä kahdesti.
            var sovitin2 = new IhmisenMatkaSovitin(this, a, leimat, aanite, virrat, rantamaski,
                Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi.IhmisenMatka2Tiedot, versio2: true);
            rekisteri.Lisaa(sovitin2);
            Kirjaa($"ihmisen matka: {a.Kertomus.Count} jaksoa, {leimat.Count} aikaleimaa, ääni {(aanite ?? "ei")} (I ja II)");

            var laskenta = System.Threading.Tasks.Task.Run(() => Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi.Laske(virrat));
            while (!laskenta.IsCompleted) yield return null;
            if (laskenta.IsFaulted) { Kirjaa("ihmisen matka: virtojen laskenta: " + laskenta.Exception?.InnerException?.Message); yield break; }
            sovitin.VanatValmiit(laskenta.Result);
            sovitin2.VanatValmiit(laskenta.Result);
            Kirjaa($"ihmisen matka: {laskenta.Result.Vanat.Count} vanaa laskettu");
        }

        /// <summary>Linssin muisti laitteelle (web localStorage): PlayerPrefs, tallennus heti levylle.</summary>
        public sealed class PlayerPrefsVarasto : Matkakirja.Linssit.Aikajana.ILinssiVarasto
        {
            public string Lue(string avain) => PlayerPrefs.HasKey(avain) ? PlayerPrefs.GetString(avain) : null;
            public void Kirjoita(string avain, string arvo) { PlayerPrefs.SetString(avain, arvo); PlayerPrefs.Save(); }
            public void Poista(string avain) { PlayerPrefs.DeleteKey(avain); PlayerPrefs.Save(); }
        }

        public sealed class IhmisenMatkaSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto aineisto;
            readonly IReadOnlyDictionary<string, Matkakirja.Linssit.Aikajana.JaksonLeimat> leimat;
            readonly string aanite;
            readonly Matkakirja.Linssit.Virrat.VirtaAineisto virrat;
            readonly Matkakirja.Linssit.Virrat.Ruutumaski rantamaski;
            Matkakirja.Linssit.Virrat.VanatTulos vanat;
            Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi linssi;
            IhmisenMatkaKerros kerros;
            EsityksenAani aani;
            readonly LinssiTiedot tiedot;
            Matkakirja.Linssit.Aikajana.IhmisenMatka2Ymparisto kaare;
            /// <summary>Ihmisen matka II: tehostekerros (IhmisenMatka2Tehosteet) näkymän päälle, esirakennus vasta avatessa.</summary>
            public readonly bool Versio2;

            public IhmisenMatkaSovitin(LinssiOhjain o, Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto a,
                IReadOnlyDictionary<string, Matkakirja.Linssit.Aikajana.JaksonLeimat> leimat, string aanite,
                Matkakirja.Linssit.Virrat.VirtaAineisto virrat, Matkakirja.Linssit.Virrat.Ruutumaski rantamaski,
                LinssiTiedot tiedot = null, bool versio2 = false)
            {
                this.o = o; aineisto = a; this.leimat = leimat; this.aanite = aanite; this.virrat = virrat; this.rantamaski = rantamaski;
                this.tiedot = tiedot ?? Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi.IhmisenMatkaTiedot;
                Versio2 = versio2;
            }

            public LinssiTiedot Tiedot => tiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Käynnissä oleva linssi (Natiivi-UI: Esitys.Tauko/Jatka/Valitse).</summary>
            public Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi Linssi => linssi;
            /// <summary>Linssin aineisto (esilatauslistat, LinssienEsilataaja).</summary>
            public Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto Aineisto => aineisto;
            /// <summary>Kertojan ääni (linssi-loki), null ennen avausta.</summary>
            public EsityksenAani Aani => aani;
            /// <summary>II:n kameran kääre (lähikuvan laskeutuminen, IhmisenMatka2Tehosteet.Kuva), null I:ssä ja suljettuna.</summary>
            public Matkakirja.Linssit.Aikajana.IhmisenMatka2Ymparisto Kaare => kaare;

            public void VanatValmiit(Matkakirja.Linssit.Virrat.VanatTulos tulos)
            {
                vanat = tulos;
                if (linssi == null) { if (!Versio2) Esirakenna(); return; }
                // Valmiiksi rakennettu piirto taustasäikeestä, jos ehti (muuten kerros rakentaa itse).
                var p = valmis is { IsCompleted: true, IsFaulted: false, IsCanceled: false } ? valmis.Result : null;
                valmis = null;
                // Rantamaski (linssiaineisto) puuttuu julkaistusta paketista v2: vanat
                // piirretään silloin ilman rannan leikkausta (VanaPiirto sietää nullin).
                kerros.AsetaVanat(tulos, virrat, rantamaski, p);
                linssi.AsetaVanat(tulos, virrat.Virrat);
            }

            /// <summary>
            /// VANAPIIRTO VALMIIKSI TAUSTASÄIKEESSÄ (ui piikit 24.9.: avauksessa 23 ms, josta piirron rakennus
            /// ja rantamaskin tekstuuri suurin osa). Rakennetaan, kun vanat valmistuvat, ja uudelleen jokaisen
            /// sulun jälkeen, koska piirrolla on tila (kello, pito, korostus). Rantamaskin tavut samalla.
            /// </summary>
            System.Threading.Tasks.Task<Matkakirja.Linssit.Virrat.VanaPiirto> valmis;

            void Esirakenna()
            {
                if (vanat == null || valmis != null) return;
                var (t, v, r) = (vanat, virrat, rantamaski);
                valmis = System.Threading.Tasks.Task.Run(() => new Matkakirja.Linssit.Virrat.VanaPiirto(
                    t, v.Virrat, v.Vanat?.Kaista, r, Matkakirja.Linssit.Virrat.Ruutumaski.Kulkumaskista(v.Maamaski)));
                VanaKerros.EsivalmisteleMaski(r);
                o.StartCoroutine(VanaKerros.EsilataaMaski(r));
            }

            public void Avaa(ILinssiYmparisto y)
            {
                string id = tiedot.Id;
                // II esirakentaa piirron vasta nyt (taustasäikeessä); VanatSeuraavassa odottaa sitä ~1,5 s.
                if (Versio2) Esirakenna();
                using (Merkki(id, OsaKerros).Auto()) kerros = IhmisenMatkaKerros.Luo(o.kierto, aineisto.Paikat, Versio2);
                using (Merkki(id, OsaAani).Auto()) aani = EsityksenAani.Luo(kerros.transform, aanite);
                using var _ = Merkki(id, OsaLinssi).Auto();
                linssi = new Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi(aineisto, leimat, kerros, aani, tiedot)
                {
                    // Linssi muistaa paikkansa (web localStorage → PlayerPrefs, sama avain).
                    Varasto = new PlayerPrefsVarasto(),
                    TutkimuksenNakyma = kerros,
                };
                // Esittelylaatikko (Natiivi-UI) käynnistää esityksen Kaynnista-kutsulla.
                linssi.Itsestaan = !IhmisenMatkaKerros.EsittelyUIssa;
                // II: kohteiden jaksoissa laskeutuminen kallistettuna (IhmisenMatka2Ymparisto); muu ympäristö sellaisenaan.
                // Kääre kirjaa ajonsa numeroineen lokiin (kuvan väistö kulkee niiden käyrällä, löydös 151).
                kaare = Versio2 ? new Matkakirja.Linssit.Aikajana.IhmisenMatka2Ymparisto(y) { Kirjaa = o.Kirjaa } : null;
                // Ohjauksen tila lokiin (löydös 148: ⏮ ▶/⏸ ⏭ videon ajoitukset).
                linssi.OhjausMuuttui += t => o.Kirjaa($"{id}: ohjaus {t}");
                linssi.Avaa(kaare ?? y);
                if (vanat != null) o.StartCoroutine(VanatSeuraavassa(linssi));
            }

            /// <summary>
            /// Vanat avauksen jälkeisessä kehyksessä (ui piikit ajo 7: Avaa.Vanat 9,6 ms samassa kehyksessä kuin
            /// linssin luonti → 31,7 ms). Odottaa taustasäikeen valmista piirtoa enintään ~1,5 s, jotta kerros ei
            /// rakenna sitä pääsäikeessä. Vanat näkyvät vasta avausjakson jälkeen, joten viive ei näy.
            /// </summary>
            System.Collections.IEnumerator VanatSeuraavassa(Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi avattu)
            {
                yield return null;
                for (int i = 0; i < 90 && valmis is { IsCompleted: false }; i++) yield return null;
                if (linssi != avattu || vanat == null) yield break;
                using (Merkki(tiedot.Id, "Avaa.Vanat").Auto()) VanatValmiit(vanat);
            }

            public void Paivita()
            {
                kaare?.Paivita();
                linssi?.Paivita();
            }

            public void Sulje()
            {
                if (kaare != null) kaare.Kallista = false;   // paluu pelaajan omaan näkymään ilman kallistusta
                linssi?.Sulje();
                linssi = null;
                kaare = null;
                if (kerros != null) Destroy(kerros.gameObject);
                kerros = null;
                aani = null;
                // II vapauttaa piirron (ei esirakenneta seuraavaa varten: muisti; I pitää valmiin kuten ennen).
                if (Versio2) valmis = null;
                else Esirakenna();
            }
        }

        /// <summary>
        /// Vesistölinssi: maasto (järvet, joet), nimipaketti (luokat ja nimet) ja
        /// LINSSI-tiedot paketista. Pallon muunnos ja järvien kolmiointi lasketaan
        /// kerran tässä (muutama ms), joten linssin avaus on vain meshien rakennus.
        /// Ei avauskynnystä (Linssirekisteri.Avauskynnykset): vain kehittäjätilassa.
        /// </summary>
        System.Collections.IEnumerator LataaVesistot()
        {
            string maasto = null, nimet = null, linssi = null;
            yield return LinssiSisalto.Hae("moduulit/js/packs/maailmankartta-maasto.json", t => maasto = t);
            yield return LinssiSisalto.Hae("moduulit/js/packs/maailmankartta-nimet.json", t => nimet = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/vesistot.json", t => linssi = t);
            if (maasto == null || linssi == null) { Kirjaa("vesistöt: aineisto puuttuu"); yield break; }
            try
            {
                var a = Matkakirja.Linssit.Vesistot.VesistotAineisto.Lue(Matkakirja.Peli.MiniJson.Jasenna(maasto),
                    nimet == null ? null : Matkakirja.Peli.MiniJson.Jasenna(nimet), Matkakirja.Peli.MiniJson.Jasenna(linssi));
                var pallolla = Matkakirja.Linssit.Vesistot.VesistotPallolle.Laske(a);
                rekisteri.Lisaa(new VesistotSovitin(this, a, pallolla));
                Kirjaa($"vesistöt: {pallolla.Jarvet.Count} järveä, {pallolla.Uomat.Count} uomaa, {pallolla.Nimet.Count} nimeä, muunnos {pallolla.KestoMs:F1} ms");
            }
            catch (Exception e) { Kirjaa("vesistöt: " + e.Message); }
        }

        /// <summary>Vesistölinssi Unityssä: 3D-kerros avatessa, purku sulkiessa (logiikka VesistotLinssissä).</summary>
        public sealed class VesistotSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Vesistot.VesistotAineisto aineisto;
            readonly Matkakirja.Linssit.Vesistot.VesistotPallolla pallolla;
            Matkakirja.Linssit.Vesistot.VesistotLinssi linssi;
            VesistotKerros kerros;
            public VesistotSovitin(LinssiOhjain o, Matkakirja.Linssit.Vesistot.VesistotAineisto a, Matkakirja.Linssit.Vesistot.VesistotPallolla p)
            { this.o = o; aineisto = a; pallolla = p; }
            public LinssiTiedot Tiedot => aineisto.Tiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Auki oleva linssi (Natiivi-UI), muuten null.</summary>
            public Matkakirja.Linssit.Vesistot.VesistotLinssi Linssi => linssi;
            public void Avaa(ILinssiYmparisto y)
            {
                kerros = VesistotKerros.Luo(o.kierto);
                linssi = new Matkakirja.Linssit.Vesistot.VesistotLinssi(aineisto, kerros, pallolla);
                linssi.Avaa(y);
            }
            public void Paivita() => linssi?.Paivita();
            public void Sulje()
            {
                linssi?.Sulje();   // kutsuu kerroksen Pois-metodia, joka tuhoaa sen
                linssi = null;
                kerros = null;
            }
        }

        /// <summary>
        /// Isoisän linssi 1873: rajat ja valtioiden nimet striimataan ämpäristä (GPL-3.0, ei binaariin),
        /// maakunnat paketin nimistöstä (aika = '1873').
        /// </summary>
        System.Collections.IEnumerator LataaIsoisa()
        {
            string data = null, nimisto = null;
            yield return LinssiSisalto.HaeVirrasta(Matkakirja.Linssit.Isoisa.Isoisa1873Linssi.AineistonOsoite, "isoisa-1873.json", t => data = t);
            yield return LinssiSisalto.Hae("moduulit/js/packs/nimisto-1873.json", t => nimisto = t);
            if (data == null) { Kirjaa("isoisä 1873: aineisto puuttuu"); yield break; }
            try
            {
                var a = Matkakirja.Linssit.Isoisa.Isoisa1873Aineisto.Lue(Matkakirja.Peli.MiniJson.Jasenna(data),
                    nimisto == null ? null : Matkakirja.Peli.MiniJson.Jasenna(nimisto));
                rekisteri.Lisaa(new IsoisaSovitin(this, a));
                Kirjaa($"isoisä 1873: {a.Viivat.Count} rajaa, {a.Nimet.Count} nimeä ({a.Lisenssi})");
            }
            catch (Exception e) { Kirjaa("isoisä 1873: " + e.Message); }
        }

        /// <summary>Isoisän linssi 1873 Unityssä: 3D-kerros avatessa, purku sulkiessa.</summary>
        public sealed class IsoisaSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Isoisa.Isoisa1873Aineisto aineisto;
            Matkakirja.Linssit.Isoisa.Isoisa1873Linssi linssi;
            IsoisaKerros kerros;
            public IsoisaSovitin(LinssiOhjain o, Matkakirja.Linssit.Isoisa.Isoisa1873Aineisto a) { this.o = o; aineisto = a; }
            public LinssiTiedot Tiedot => Matkakirja.Linssit.Isoisa.Isoisa1873Linssi.IsoisaTiedot;
            public bool Auki => linssi != null && linssi.Auki;
            public Matkakirja.Linssit.Isoisa.Isoisa1873Linssi Linssi => linssi;
            public IsoisaKerros Kerros => kerros;
            public void Avaa(ILinssiYmparisto y)
            {
                kerros = IsoisaKerros.Luo(o.kierto);
                linssi = new Matkakirja.Linssit.Isoisa.Isoisa1873Linssi(aineisto, kerros);
                linssi.Avaa(y);
            }
            public void Paivita() => linssi?.Paivita();
            public void Sulje()
            {
                linssi?.Sulje();   // kerroksen Pois tuhoaa sen
                linssi = null;
                kerros = null;
            }
        }

        System.Collections.IEnumerator LataaKeksinnot()
        {
            string data = null, aineisto = null;
            yield return LinssiSisalto.Hae("moduulit/js/linssit/keksinnot.json", t => data = t);
            if (data == null) { Kirjaa("keksinnöt: aineisto puuttuu"); yield break; }
            KeksinnotSovitin sovitin;
            try
            {
                var a = Matkakirja.Linssit.Aikajana.KeksinnotAineisto.Lue(Matkakirja.Peli.MiniJson.Jasenna(data));
                sovitin = new KeksinnotSovitin(this, a);
                rekisteri.Lisaa(sovitin);
                Kirjaa($"keksinnöt: {a.Pysakit.Count} pysäkkiä");
            }
            catch (Exception e) { Kirjaa("keksinnöt: " + e.Message); yield break; }

            // Pysäkkiluennat linssiaineistosta (koepaketti v9+; julkaistussa v2:ssa ei ole).
            // Linssiaineistossa on isoja maskeja, joten jäsennys taustasäikeessä.
            yield return LinssiSisalto.Hae("kokoelmat/linssiaineisto.json", t => aineisto = t);
            if (aineisto == null) { Kirjaa("keksinnöt: luennat puuttuvat (ei linssiaineistoa)"); yield break; }
            var lataus = System.Threading.Tasks.Task.Run(() =>
                Matkakirja.Linssit.Aikajana.KeksintoLuennat.Lue(Matkakirja.Peli.MiniJson.Jasenna(aineisto)));
            while (!lataus.IsCompleted) yield return null;
            if (lataus.IsFaulted) { Kirjaa("keksinnöt: luennat: " + lataus.Exception?.InnerException?.Message); yield break; }
            sovitin.Luennat = lataus.Result;
            Kirjaa($"keksinnöt: {lataus.Result?.Maara ?? 0} pysäkkiluentaa");
        }

        /// <summary>
        /// Vertailu ja maiden tiedot: maarajat ja maat kokoelmista, linssitiedot moduuleista.
        /// Jäsennys (maarajat ~1 Mt) taustasäikeessä. Maatila on Natiivisepän
        /// KarttaKerrokset.Maat (MaaKartta), joka haetaan vasta avatessa.
        /// </summary>
        System.Collections.IEnumerator LataaMaat()
        {
            string rajat = null, maat = null, vertailu = null, maatiedot = null;
            yield return LinssiSisalto.Hae("kokoelmat/maarajat.json", t => rajat = t);
            yield return LinssiSisalto.Hae("kokoelmat/maat.json", t => maat = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/vertailu.json", t => vertailu = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/maatiedot.json", t => maatiedot = t);
            if (rajat == null) { Kirjaa("maat: maarajat puuttuu"); yield break; }
            object J(string t) => t == null ? null : Matkakirja.Peli.MiniJson.Jasenna(t);
            var lataus = System.Threading.Tasks.Task.Run(() =>
                Matkakirja.Linssit.Maat.MaatAineisto.Lue(J(rajat), J(maat), J(vertailu), J(maatiedot)));
            while (!lataus.IsCompleted) yield return null;
            if (lataus.IsFaulted) { Kirjaa("maat: " + lataus.Exception?.InnerException?.Message); yield break; }
            var a = lataus.Result;
            MaatAineisto = a;   // ISS-kyydin "Oma sijainti" (OmaSijaintiHaku): maan nimi ja keskipiste ISO2-koodilla
            rekisteri.Lisaa(new MaatSovitin(this, a, vertailu: true));
            rekisteri.Lisaa(new MaatSovitin(this, a, vertailu: false));
            Kirjaa($"maat: {a.Maat.Count} maata, {a.Maat.Values.Count(m => m.NimiPallolle)} nimeä");
        }

        /// <summary>
        /// Vertailu- tai maatietolinssi Unityssä. Linssi-olio säilyy (vertailun valinnat
        /// säilyvät sulkemisen yli kuten webissä); maanimikerros luodaan avatessa.
        /// Natiivi-UI kuuntelee Linssi-olion tapahtumia (VertailuLinssi.Muuttui,
        /// Tayttui, VertailuPyydetty; MaatiedotLinssi.ValittuMuuttui, LehtiPyydetty).
        /// </summary>
        public sealed class MaatSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Maat.MaatAineisto aineisto;
            readonly bool onVertailu;
            Matkakirja.Linssit.Maat.MaatilaLinssi linssi;
            Matkakirja.Linssit.Maat.IMaaKartta kartta;
            MaidenNimetKerros nimet;

            public MaatSovitin(LinssiOhjain o, Matkakirja.Linssit.Maat.MaatAineisto a, bool vertailu)
            { this.o = o; aineisto = a; onVertailu = vertailu; }
            public LinssiTiedot Tiedot => onVertailu ? aineisto.Vertailu : aineisto.Maatiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Linssi-olio (luodaan ensimmäisellä avauksella; null ennen sitä).</summary>
            public Matkakirja.Linssit.Maat.MaatilaLinssi Linssi => linssi;

            public void Avaa(ILinssiYmparisto y)
            {
                var k = KarttaKerrokset.Instanssi?.Maat;
                if (k == null) o.Kirjaa("maat: maatila puuttuu (KarttaKerrokset.Maat)");
                if (linssi == null || k != kartta)
                {
                    kartta = k;
                    linssi = onVertailu
                        ? new Matkakirja.Linssit.Maat.VertailuLinssi(aineisto, k, new NimetValitys(this))
                        : new Matkakirja.Linssit.Maat.MaatiedotLinssi(aineisto, k);
                    Kirjaaja(linssi);
                }
                linssi.Avaa(y);
                if (linssi is Matkakirja.Linssit.Maat.VertailuLinssi v && v.Kayrat == null && !kayratHaussa)
                    o.StartCoroutine(LataaKayrat(v));
            }
            public void Paivita() => linssi?.Paivita();
            public void Sulje() => linssi?.Sulje();

            bool kayratHaussa;
            /// <summary>Maakäyrät laiskasti ensimmäisellä avauksella (web lataaMaakayrat); epäonnistuminen yrittää uudelleen seuraavalla.</summary>
            System.Collections.IEnumerator LataaKayrat(Matkakirja.Linssit.Maat.VertailuLinssi v)
            {
                kayratHaussa = true;
                string teksti = null;
                yield return LinssiSisalto.Hae("tiedostot/assets/data/maakayrat.json", t => teksti = t);
                kayratHaussa = false;
                if (teksti == null) { o.Kirjaa("vertailu: maakäyrät puuttuvat"); yield break; }
                // Jäsennys taustasäikeessä: pääsäikeessä 93 ms:n kehys vertailun avauksessa (ui piikit 24.9.).
                var lataus = System.Threading.Tasks.Task.Run(() =>
                    Matkakirja.Linssit.Maat.MaakayratAineisto.Lue(Matkakirja.Peli.MiniJson.Jasenna(teksti)));
                while (!lataus.IsCompleted) yield return null;
                if (lataus.IsFaulted) { o.Kirjaa("vertailu: maakäyrät " + lataus.Exception?.InnerException?.Message); yield break; }
                v.Kayrat = lataus.Result;
                o.Kirjaa($"vertailu: maakäyrät {v.Kayrat.Maat.Count} maalle");
            }

            void Kirjaaja(Matkakirja.Linssit.Maat.MaatilaLinssi l)
            {
                if (l is Matkakirja.Linssit.Maat.VertailuLinssi v)
                {
                    v.Muuttui += () => { if (v.Auki) o.Kirjaa("vertailu: " + string.Join(", ", v.Valinnat)); };
                    v.Tayttui += () => o.Kirjaa("vertailu: " + Matkakirja.Linssit.Maat.VertailuLinssi.TaynnaOtsikko);
                    v.VertailuPyydetty += m =>
                    {
                        var kuva = v.Kayrakuva();
                        o.Kirjaa("vertailu pyydetty: " + string.Join(", ", m.Select(x => x.Nimi))
                            + (kuva == null ? " (käyrät latautuvat)" : kuva.Tyhja ?? $", {kuva.Lohkot.Count} käyrälohkoa"));
                    };
                }
                if (l is Matkakirja.Linssit.Maat.MaatiedotLinssi t)
                {
                    t.ValittuMuuttui += m => o.Kirjaa("maatiedot: " + (m?.Nimi ?? "ei valintaa"));
                    t.LehtiPyydetty += m => o.Kirjaa($"maatiedot lehti: {m.Nimi} ({m.Maalehti ?? "ei lehteä"})");
                }
            }

            /// <summary>Maanimikerros elää vain linssin avauksen ajan.</summary>
            sealed class NimetValitys : Matkakirja.Linssit.Maat.IMaidenNimet
            {
                readonly MaatSovitin s;
                public NimetValitys(MaatSovitin s) { this.s = s; }
                public void Nimet(IReadOnlyList<Matkakirja.Linssit.Maat.Maa> maat)
                {
                    if (s.nimet == null) s.nimet = MaidenNimetKerros.Luo(s.o.kierto);
                    s.nimet.Nimet(maat);
                }
                public void Pois()
                {
                    s.nimet?.Pois();
                    s.nimet = null;
                }
            }
        }

        /// <summary>
        /// Maailmanradio: asemat (kokoelmat/radiot.json, varalla moduuli RADIOT), kaupungit,
        /// maat, viritysäänet ja LINSSI. Jäsennys taustasäikeessä.
        /// </summary>
        System.Collections.IEnumerator LataaRadio()
        {
            string radiot = null, moduuli = null, kaupungit = null, maat = null, aanet = null, linssi = null;
            yield return LinssiSisalto.Hae("kokoelmat/radiot.json", t => radiot = t);
            yield return LinssiSisalto.Hae("moduulit/js/packs/radiot.json", t => moduuli = t);
            yield return LinssiSisalto.Hae("kokoelmat/kaupungit.json", t => kaupungit = t);
            yield return LinssiSisalto.Hae("kokoelmat/maat.json", t => maat = t);
            yield return LinssiSisalto.Hae("moduulit/js/packs/viritysaanet.json", t => aanet = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/radio.json", t => linssi = t);
            if ((radiot == null && moduuli == null) || kaupungit == null) { Kirjaa("radio: asemat tai kaupungit puuttuvat"); yield break; }
            object J(string t) => t == null ? null : Matkakirja.Peli.MiniJson.Jasenna(t);
            var lataus = System.Threading.Tasks.Task.Run(() =>
                Matkakirja.Linssit.Radio.RadioAineisto.Lue(J(radiot), J(moduuli), J(kaupungit), J(maat), J(aanet), J(linssi)));
            while (!lataus.IsCompleted) yield return null;
            if (lataus.IsFaulted) { Kirjaa("radio: " + lataus.Exception?.InnerException?.Message); yield break; }
            var a = lataus.Result;
            rekisteri.Lisaa(new RadioSovitin(this, a));
            var luokat = a.Asemat.Values.GroupBy(x => x.Luokka ?? "tuntematon").Select(g => $"{g.Key} {g.Count()}");
            Kirjaa($"radio: {a.Asemat.Count} asemaa ({string.Join(", ", luokat)}), {a.Viritysaanet.Count} viritysääntä");
        }

        /// <summary>
        /// Maailmanradio Unityssä: lähetys ja viritin luodaan avatessa, kartta Natiivisepän
        /// KaupunkiMerkit.NaytaVain/Korosta ja PalloKierto.KaupunkiNapautettu. Natiivi-UI lukee
        /// Linssi.TilaMuuttui-tapahtumaa (kotelo, pistenäyttö) ja kartuscha Linssi.MaanAsema.
        /// </summary>
        public sealed class RadioSovitin : ILinssi
        {
            static readonly Color Soiva = new Color32(194, 69, 47, 255);   // web PUNAINEN #c2452f
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Radio.RadioAineisto aineisto;
            Matkakirja.Linssit.Radio.RadioLinssi linssi;
            RadioVirta virta;
            RadioViritin viritin;
            /// <summary>Tehosteet elävät linssin yli (sulun kytkinääni ehtii soida loppuun).</summary>
            RadioEfektit efektit;
            Kartta kartta;

            public RadioSovitin(LinssiOhjain o, Matkakirja.Linssit.Radio.RadioAineisto a) { this.o = o; aineisto = a; }
            public LinssiTiedot Tiedot => aineisto.Tiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Auki oleva radio (Natiivi-UI), muuten null.</summary>
            public Matkakirja.Linssit.Radio.RadioLinssi Linssi => linssi;
            /// <summary>Asemat ilman avaamista (kartuscha: maan asema).</summary>
            public Matkakirja.Linssit.Radio.RadioAineisto Aineisto => aineisto;
            /// <summary>
            /// Natiivi-UI piirtää radion ▶-napit itse (web radio.js pallonNapit): tosi piilottaa pelin
            /// kaupunkimerkit ja nappulan radion ajaksi (RadioLinssi.OmatNapit). Aseta ennen avausta.
            /// </summary>
            public static bool OmatNapit;
            /// <summary>Radio avataan (Natiivi-UI kytkee NapitMuuttuivat ja piirtää Napit).</summary>
            public static event Action<Matkakirja.Linssit.Radio.RadioLinssi> Avattiin;
            /// <summary>
            /// Radiouudistus (build 12): mastojen, hämärän, renkaiden ja yövalojen piirto (Natiiviseppä asettaa,
            /// RAJAPINTA luku 4 / suunnitelma luku 9). null = ei mastoja eikä kallistusta (entinen radio).
            /// </summary>
            public static Func<Matkakirja.Linssit.Radio.IRadioMastot> MastoPiirto;

            Matkakirja.Linssit.Radio.RadioLinssi sulkeva;

            public void Avaa(ILinssiYmparisto y)
            {
                // Edellisen sulun ulosliuku kesken: loppuun heti, ettei vanha purku poista uuden avauksen reliefiä.
                sulkeva?.LopetaSulku();
                sulkeva = null;
                virta = RadioVirta.Luo(o.transform, etusija: true);
                viritin = RadioViritin.Luo(o.transform, aineisto.Viritysaanet);
                kartta = new Kartta(o.kierto);
                linssi = new Matkakirja.Linssit.Radio.RadioLinssi(aineisto, virta, viritin, kartta,
                    Matkakirja.Linssit.Radio.RadioAineisto.Pistefontti);
                if (efektit == null) efektit = RadioEfektit.Luo(o.transform);
                linssi.Efektit = efektit;
                // Pelaajan kaupunki näkyy aina radiotilassa (web sääntö 1).
                linssi.Sijainti = () => PeliOhjain.Instanssi?.PelaajanKaupunki;
                // Esikuuntelu (Natiivisepän ehto 4): ei kuumana eikä virransäästössä (Lampo.Kuuma, sama kuin Esilataaja.Seis).
                linssi.EsikuunteluSallittu = () => !Esilataaja.Seis && !EsikuunteluPois;
                linssi.TilaMuuttui += t => o.Kirjaa($"radio: {t.Vaihe}{(t.Viritys != Matkakirja.Linssit.Radio.ViritysVaihe.Ei ? "/" + t.Viritys : "")} " +
                    $"{t.AsemaId ?? "-"} {t.KaupunkiNimi ?? ""} {t.Nimi ?? ""}{(t.Viesti != null ? " (" + t.Viesti + ")" : "")}{(t.Sivu != null ? " → " + t.Sivu : "")}"); 
                // Diagnoosi ennen kuin virta suljetaan (Laitetestaajan simulaattorilöydös 23.9.).
                linssi.VirheSyntyy += syy => o.Kirjaa($"radio: {syy} | soitin: {virta?.Kuvaus ?? "-"}");
                linssi.OmatNapit = OmatNapit;
                linssi.Mastot3D = MastoPiirto?.Invoke();
                Avattiin?.Invoke(linssi);
                linssi.Avaa(y);
                if (o.kierto != null) o.kierto.PelaajanEle += linssi.PelaajanEle;
            }
            public void Paivita() => linssi?.Paivita();
            public void Sulje()
            {
                if (linssi != null && o.kierto != null) o.kierto.PelaajanEle -= linssi.PelaajanEle;
                linssi?.Sulje();
                if (linssi != null && linssi.Sulkeutuu)
                {
                    var l = linssi;
                    sulkeva = l;
                    o.Jalkiajo(() =>
                    {
                        bool jatkuu = l.PaivitaSulku();
                        if (!jatkuu && ReferenceEquals(sulkeva, l)) sulkeva = null;
                        return jatkuu;
                    }, () =>
                    {
                        l.LopetaSulku();
                        if (ReferenceEquals(sulkeva, l)) sulkeva = null;
                    });
                }
                linssi = null;
                if (virta != null) Destroy(virta.gameObject);
                if (viritin != null) Destroy(viritin.gameObject);
                kartta?.Pura();
                virta = null; viritin = null; kartta = null;
            }

            sealed class Kartta : Matkakirja.Linssit.Radio.IRadioKartta
            {
                readonly PalloKierto kierto;
                public event Action<string> KaupunkiNapautettu;
                public Kartta(PalloKierto k) { kierto = k; if (kierto != null) kierto.KaupunkiNapautettu += Valita; }
                void Valita(string id) => KaupunkiNapautettu?.Invoke(id);
                public void Pura() { if (kierto != null) kierto.KaupunkiNapautettu -= Valita; }
                static KaupunkiMerkit Merkit => KarttaKerrokset.Instanssi?.merkit;
                public void NaytaVain(ICollection<string> kaupungit) => Merkit?.NaytaVain(kaupungit);
                public void Korosta(string kaupunki)
                {
                    using var _ = Merkki("radio", "Korosta").Auto();
                    var m = Merkit;
                    if (m == null) return;
                    if (edellinen != null && edellinen != kaupunki) m.Korosta(edellinen, null);
                    if (kaupunki != null) m.Korosta(kaupunki, Soiva);
                    edellinen = kaupunki;
                }
                string edellinen;
            }
        }

        public sealed class KeksinnotSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Aikajana.KeksinnotAineisto aineisto;
            Matkakirja.Linssit.Aikajana.KeksinnotLinssi linssi;
            KeksinnotKerros kerros;
            public KeksinnotSovitin(LinssiOhjain o, Matkakirja.Linssit.Aikajana.KeksinnotAineisto a) { this.o = o; aineisto = a; }
            /// <summary>Pysäkkiluennat (ladataan linssin rekisteröinnin jälkeen; null = hiljainen ajo).</summary>
            public Matkakirja.Linssit.Aikajana.KeksintoLuennat Luennat;
            public LinssiTiedot Tiedot => aineisto.Tiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Käynnissä oleva linssi (Natiivi-UI: Kaynnista, JatkaValinaytoksesta, Ajo.Tauko, Ajo.Siirry).</summary>
            public Matkakirja.Linssit.Aikajana.KeksinnotLinssi Linssi => linssi;
            /// <summary>Linssin aineisto (esilatauslistat, LinssienEsilataaja).</summary>
            public Matkakirja.Linssit.Aikajana.KeksinnotAineisto Aineisto => aineisto;
            public void Avaa(ILinssiYmparisto y)
            {
                kerros = KeksinnotKerros.Luo(o.kierto, aineisto);
                // Soitin on kerroksen lapsi: kerroksen tuho sulkee luennan.
                var soitin = Luennat == null ? null : LuentaSoitin.Luo(kerros.transform);
                linssi = new Matkakirja.Linssit.Aikajana.KeksinnotLinssi(aineisto, kerros, luennat: Luennat, soitin: soitin)
                {
                    // Web pelaajanAsteet: pelaajan paikka (myös matkalla) kaaren X-toiveeksi.
                    Pelaaja = PelaajanPaikka,
                };
                linssi.Avaa(y);
                // Kartan nimet ja kaupunkipisteet näkyvät kuten webin linssikartan laatoissa (Fable 24.9.:
                // lopputulos kuten webissä; natiivin laatat on poltettu ilman nimiä). Natiiviseppä e8d95dd:
                // voimassa, kun "kaupungit" on pois (Pelikerrokset(false)); purkautuu pelikerrosten palatessa.
                KarttaKerrokset.Instanssi?.Nakyvyys("linssinimet", true);
                kerros.ValoNapautettu += i => { o.Kirjaa("keksinnöt: lamppu " + i); linssi?.NapautaValoa(i); };
                if (!KeksinnotKerros.EsittelyUIssa) linssi.Kaynnista();
            }
            public void Paivita() => linssi?.Paivita();
            public void Sulje()
            {
                KarttaKerrokset.Instanssi?.Nakyvyys("linssinimet", false);
                linssi?.Sulje();
                linssi = null;
                if (kerros != null) Destroy(kerros.gameObject);
                kerros = null;
            }
        }

        /// <summary>
        /// Astronautin kamera Unityssä: luo 3D-kerroksen avatessa ja purkaa sen
        /// sulkiessa; logiikka on puhtaassa AstronauttiLinssissä.
        /// </summary>
        /// <summary>Yökartta: linssi (Ydin) ja yökuori (YokarttaKerros) linssin ajaksi.</summary>
        public sealed class YokarttaSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            Matkakirja.Linssit.Yokartta.YokarttaLinssi linssi;
            YokarttaKerros kerros;
            public YokarttaSovitin(LinssiOhjain o) { this.o = o; }
            public LinssiTiedot Tiedot => Matkakirja.Linssit.Yokartta.YokarttaLinssi.YokarttaTiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Auki oleva linssi (testikomento yokartta), muuten null.</summary>
            public Matkakirja.Linssit.Yokartta.YokarttaLinssi Linssi => linssi;
            public void Avaa(ILinssiYmparisto y)
            {
                kerros = YokarttaKerros.Luo(o.kierto != null ? o.kierto.georeferenssi : null);
                linssi = new Matkakirja.Linssit.Yokartta.YokarttaLinssi(kerros);
                linssi.Avaa(y);
            }
            public void Paivita() => linssi?.Paivita();
            public void Sulje()
            {
                linssi?.Sulje();
                if (kerros != null) Destroy(kerros.gameObject);
                linssi = null; kerros = null;
            }
        }

        public sealed class AstronauttiSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Astronautti.AstronauttiAineisto aineisto;
            Matkakirja.Linssit.Astronautti.AstronauttiLinssi linssi;
            AstronauttiKerros kerros;
            public AstronauttiSovitin(LinssiOhjain o, Matkakirja.Linssit.Astronautti.AstronauttiAineisto a) { this.o = o; aineisto = a; }
            public LinssiTiedot Tiedot => Matkakirja.Linssit.Astronautti.AstronauttiLinssi.AstronauttiTiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Auki oleva linssi (Natiivi-UI), muuten null.</summary>
            public Matkakirja.Linssit.Astronautti.AstronauttiLinssi Linssi => linssi;
            /// <summary>Linssin aineisto (esilatauslistat, LinssienEsilataaja).</summary>
            public Matkakirja.Linssit.Astronautti.AstronauttiAineisto Aineisto => aineisto;
            /// <summary>Auki olevan linssin 3D-kerros (Natiivi-UI: kohteiden napautus), muuten null.</summary>
            public AstronauttiKerros Kerros => kerros;
            public void Avaa(ILinssiYmparisto y)
            {
                IssTleLataaja.Lataa(o);   // ISS:n todellinen rata (välimuisti ja buildi heti, ämpäri taustalla)
                using (Merkki("satelliitti", OsaKerros).Auto()) kerros = AstronauttiKerros.Luo(o.kierto);
                using var _ = Merkki("satelliitti", OsaLinssi).Auto();
                linssi = new Matkakirja.Linssit.Astronautti.AstronauttiLinssi(aineisto, kerros);
                kerros.Linssi = linssi;
                linssi.Avaa(y);
                // Pelaajan veto tai nipistys päättää ISS-seurannan (web otePalloon); napautus AstronauttiKerros.Napautuksessa.
                if (o.kierto != null) o.kierto.PelaajanEle += linssi.PelaajanEle;
                mustaAlku = Time.realtimeSinceStartup;
            }
            float mustaAlku = -1f;
            public void Paivita()
            {
                linssi?.Paivita();
                // Musta ruutu odottaa reliefiä (AvauksenVaihe.Musta): mittari "linssi satelliitti:musta" (esiladattu
                // avausnäkymä lyhentää sitä minimiaikaan PaljastuksenMinimiMs asti).
                if (mustaAlku < 0 || linssi == null || linssi.Vaihe == Matkakirja.Linssit.Astronautti.AvauksenVaihe.Musta) return;
                VerkkoOdotus.Kirjaa("linssi", Tiedot.Id + ":musta", (Time.realtimeSinceStartup - mustaAlku) * 1000.0);
                mustaAlku = -1f;
            }
            public void Sulje()
            {
                if (linssi != null && o.kierto != null) o.kierto.PelaajanEle -= linssi.PelaajanEle;
                linssi?.Sulje(); linssi = null; kerros = null; mustaAlku = -1f;
            }
        }

        // ── Profilointimerkit (`ui piikit`, KehysPiikit.cs) ────────────────
        // Nimet alkavat "Update.Linssi", jotta KehysPiikit poimii ne (suodatin ja Ensin-järjestys). Merkit
        // luodaan käynnistyksessä: KehysPiikit ottaa seurantaan vain aloitushetkellä olemassa olevat merkit.

        static readonly string[] MitattavatLinssit =
            { "topografia", "vesistot", "satelliitti", "keksinnot", "ihmisen-matka", "ihmisen-matka-2", "vertailu", "maatiedot", "radio", "isoisa-1873", "maapallon-vuosi" };
        static readonly Dictionary<(string, string), Unity.Profiling.ProfilerMarker> merkit =
            new Dictionary<(string, string), Unity.Profiling.ProfilerMarker>();
        static readonly Unity.Profiling.ProfilerMarker KytkeMerkki = new Unity.Profiling.ProfilerMarker("Update.Linssi.Kerrokset");
        static readonly Unity.Profiling.ProfilerMarker KomennotMerkki = new Unity.Profiling.ProfilerMarker("Update.Linssi.Komennot");
        static readonly Unity.Profiling.ProfilerMarker PelikerroksetMerkki = new Unity.Profiling.ProfilerMarker("Update.Linssi.Ymparisto.Pelikerrokset");
        static readonly Unity.Profiling.ProfilerMarker KameraMerkki = new Unity.Profiling.ProfilerMarker("Update.Linssi.Ymparisto.AjaKamera");
        static readonly Unity.Profiling.ProfilerMarker KirjaaMerkki = new Unity.Profiling.ProfilerMarker("Update.Linssi.Ymparisto.Kirjaa");

        /// <summary>Avauksen osat (Merkki(id, Osa…)): 3D-kerroksen luonti, äänen luonti, ytimen linssi.</summary>
        internal const string OsaKerros = "Avaa.Kerros", OsaAani = "Avaa.Aani", OsaLinssi = "Avaa.Linssi",
            OsaTahdet = "Avaa.Tahdet", OsaPilvet = "Avaa.Pilvet";

        internal static Unity.Profiling.ProfilerMarker Merkki(string id, string vaihe)
        {
            if (!merkit.TryGetValue((id, vaihe), out var m))
                merkit[(id, vaihe)] = m = new Unity.Profiling.ProfilerMarker("Update.Linssi." + id + "." + vaihe);
            return m;
        }

        static void Mittaa(string id, string vaihe, bool alku)
        {
            var m = Merkki(id, vaihe);
            if (alku) m.Begin(); else m.End();
        }

        void Update()
        {
            using (KytkeMerkki.Auto()) kerrokset.Kytke();
            rekisteri.Paivita();
            // Suljettujen linssien jälkiajot (radion ulosliuku): true = jatkuu.
            if (jalkiajot.Count > 0) jalkiajot.RemoveAll(j => !j.Ajo());
#if !MATKAKIRJA_APPSTORE
            // App Store -käännöksessä ei testikomentoja (kuten ui-komento.txt ja komento.txt).
            komentoKello -= Time.unscaledDeltaTime;
            if (komentoKello <= 0f) { komentoKello = 0.5f; using (KomennotMerkki.Auto()) LueKomennot(); }
#endif
        }

        readonly List<(Func<bool> Ajo, Action Lopetus)> jalkiajot = new List<(Func<bool>, Action)>();

        /// <summary>
        /// Kehyksittäinen ajo linssin sulun jälkeen (esim. radion hämärän ulosliuku); palauttaa false, kun valmis.
        /// Lopetus viedään loppuun heti, jos ohjain poistuu tai kytketään pois kesken (löydös 77: radion hämärä,
        /// mastot ja reliefi jäivät pallolle, kun jälkiajo katkesi).
        /// </summary>
        internal void Jalkiajo(Func<bool> ajo, Action lopetus = null) { if (ajo != null) jalkiajot.Add((ajo, lopetus)); }

        void ViimeisteleJalkiajot()
        {
            var kesken = jalkiajot.ToArray();
            jalkiajot.Clear();
            foreach (var j in kesken)
            {
                try { j.Lopetus?.Invoke(); }
                catch (Exception e) { Debug.LogException(e); }
            }
        }

        void OnDisable() { ViimeisteleJalkiajot(); PalautaKuvaus(); kierto?.LinssinRajat(null, null); }

        void OnDestroy()
        {
            rekisteri?.Sulje();
            ViimeisteleJalkiajot();
            PalautaKuvaus();
            kerrokset?.Irrota();
            if (Instanssi == this) Instanssi = null;
        }

        // ── ILinssiYmparisto ──────────────────────────────────────────────

        public IKarttaKerrokset Kerrokset => kerrokset;

        public Nakyma Kamera => new Nakyma(kierto.leveys, kierto.pituus, kierto.korkeus, kierto.KaytettyKallistus);

        public void AjaKamera(Nakyma kohde, float kestoS, Func<double, double> pehmennys = null, double? kallistukseen = null)
        {
            // Laitetestien jälki: keksintöjen loppukamera jäi iPadilla ajamatta (24.9.), syy selvitettävä.
            using var _ = KameraMerkki.Auto();
            Kirjaa($"kamera-ajo → {kohde} {kestoS:F1} s (nyt {Kamera})");
            // KAMERA-AJOT (Raamattu, omistaja 24.9.): ease in / ease out ilman lineaarisia pätkiä. Pelin oletus
            // (trapetsi, ramppi 0,3) kulkee keskellä vakionopeudella, joten linssien oletus on smootherstep.
            // Kohde katon yläpuolella (ihmisen matkan nousu avaruuteen): PalloKierto sallii sen vain pyydettäessä.
            kierto.Aja(kohde.Lat, kohde.Lon, kohde.Korkeus, Mathf.Max(0.01f, kestoS), null,
                pehmennys ?? Matkakirja.Linssit.Aikajana.Kameramatikka.Pehmennys, yliKaton: kohde.Korkeus > KokoPallonKorkeus,
                kallistukseen: kallistukseen);
        }

        /// <summary>
        /// Pelin oma loitonnuksen katto on jo koko pallo (PalloKierto.MaxKorkeus),
        /// joten topografian pyyntö ei muuta mitään. Tiukempi katto tarvitaan
        /// vasta, jos jokin linssi rajaa loitonnusta; silloin PalloKierto saa asettimen.
        /// </summary>
        /// <summary>Linssin zoomikaista PalloKierrolle (LinssinRajat, Natiivisepän rajapinta 29.9.2026); null = pelin oma sääntö.</summary>
        public void ZoomiKatto(double? maxKorkeus, double? minKorkeus = null) => kierto?.LinssinRajat(minKorkeus, maxKorkeus);

        public void KameraAvaruuteen(double lat, double lon, double pallonSateita)
        {
            Kirjaa($"kamera avaruuteen → {lat:F1}, {lon:F1}, {pallonSateita:F0} R");
            kierto.AsetaKaukaa(lat, lon, pallonSateita * CesiumWgs84Ellipsoid.GetMaximumRadius());
        }

        public double KokoPallonKorkeus => kierto.KokoPallonKorkeus();

        /// <summary>
        /// PalloKierto.KorkeusKaarelle mittaa kapeamman suunnan kaaren. Pystyruudulla
        /// se on leveys; vaakaruudulla leveyden kaari muunnetaan korkeuden kaareksi
        /// kuvasuhteella (pienillä kulmilla tarkka, koko pallolla katto rajaa).
        /// </summary>
        public double KorkeusLeveydelle(double leveysAsteina)
        {
            double suhde = Kuvasuhde;
            double kapea = suhde > 1 ? leveysAsteina / suhde : leveysAsteina;
            return kierto.KorkeusKaarelle(kapea);
        }

        public double Nakokulma
        {
            get
            {
                var kamera = kierto.GetComponent<Camera>();
                return kamera != null ? kamera.fieldOfView : 50;
            }
        }

        public double Suuntima => kierto.suuntima;

        // KUVAUS (ISS:n kyyti, Linssiseppä 28.9.2026): kamera kiinni liikkuvaan kohteeseen PalloKierto.Kuvaa-metodilla kuten
        // ElavaKartta. Kenttäkulma (Natiiviseppä 28.9.): ensimmäinen asetus tallentaa kameran oman arvon, null ja kaikki
        // poistumistiet (SeurantaLoppui, linssin purku, OnDisable/OnDestroy) palauttavat sen; projektiomatriisiin ei kosketa.
        float? omaKentta;
        bool kuvataan;

        public void Kuvaa(Kuvakulma a)
        {
            if (kierto == null) return;
            kuvataan = true;
            kierto.Kuvaa(a.Lat, a.Lon, a.EtaisyysM, a.Kallistus, a.Suuntima, a.KatseKorkeusM);
        }

        public void KuvausLoppui()
        {
            if (!kuvataan) return;
            kuvataan = false;
            if (kierto != null) kierto.SeurantaLoppui();
        }

        public void Kenttakulma(double? asteina)
        {
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            if (kamera == null) return;
            if (asteina is double a)
            {
                omaKentta ??= kamera.fieldOfView;
                kamera.fieldOfView = (float)a;
            }
            else if (omaKentta is float oma)
            {
                kamera.fieldOfView = oma;
                omaKentta = null;
            }
        }

        void PalautaKuvaus()
        {
            KuvausLoppui();
            Kenttakulma(null);
        }

        public double Kuvasuhde
        {
            get
            {
                var kamera = kierto.GetComponent<Camera>();
                return kamera != null && kamera.aspect > 0 ? kamera.aspect : (double)Screen.width / Mathf.Max(1, Screen.height);
            }
        }

        public void Pelikerrokset(bool nakyvissa)
        {
            using var _ = PelikerroksetMerkki.Auto();
            var k = KarttaKerrokset.Instanssi;
            if (k == null) return;
            k.Nakyvyys("kaupungit", nakyvissa);
            k.Nakyvyys("nimiot", nakyvissa);
            PalloKierto.LinssiAuki = !nakyvissa;
            // Web body.aikajana-paalla piilottaa myös nappulan ja nostot (RAJAPINTA 4, Natiiviseppä c6c83c9).
            k.Nakyvyys("nappula", nakyvissa);
            k.Nakyvyys("pisteet", nakyvissa);
            // Kermahuntu pois linssin ajaksi (web lauta.js "KERMA POIS MYÖS LINSSIN AJAKSI"; löydös 43: radiossa
            // kaikki maat ilman huntua). Vertailu ja maatiedot pitävät sen kuten webissä (mitattu 24.9.,
            // lokit/linssit-loydos43-20260924/web). Rasterilinssit väistävät sen jo (KarttaKerrokset.LisaaRasteri).
            if (k.varitaso != null && (nakyvissa || !(rekisteri?.Auki is MaatSovitin))) k.varitaso.Pelikerrokset(nakyvissa);
            // Kotimaan kehä samoin: webissä vain aikajana piilottaa sen (lauta.js:5089), ja vertailu- ja maatietolinssissä
            // kotimaa näkyy kehällä (Linssisepän kierros 3 rivi 39). "kaupungit"-portti yllä piilotti sen kaikilta linsseiltä.
            if (k.maaraja != null) k.maaraja.SallittuLinssissa(!nakyvissa && rekisteri?.Auki is MaatSovitin);
            // Kaupungin nimikortti pois linssin tieltä (web body.aikajana-paalla .fact-card;
            // iPad-kuvassa Pariisin kortti jäi ihmisen matkan päälle). Kortti palaa
            // seuraavasta kaupungin napautuksesta, joten palautusta ei tarvita.
            if (!nakyvissa)
            {
                // Välimuistissa: FindAnyObjectByType käy koko kohtauksen läpi joka avauksessa.
                if (nimiKortti == null) nimiKortti = FindAnyObjectByType<NimiKortti>();
                if (nimiKortti != null) nimiKortti.Piilota();
            }
        }

        NimiKortti nimiKortti;

        float peiteAlku = -1f;

        public void Peite(bool paalla)
        {
            Kirjaa("peite " + (paalla ? "päälle" : "pois"));
            PeiteKasittelija?.Invoke(paalla);
            // Pelaaja odottaa linssin kerrosta peitteen takana (topografia, vesistöt): mittari "linssi <id>:peite"
            // (ESILATAUSPOLITIIKKA: laatat ±1 esiladataan, joten odotuksen pitäisi lyhentyä).
            if (paalla) { peiteAlku = Time.realtimeSinceStartup; return; }
            if (peiteAlku < 0) return;
            VerkkoOdotus.Kirjaa("linssi", (rekisteri?.Auki?.Tiedot.Id ?? "?") + ":peite",
                (Time.realtimeSinceStartup - peiteAlku) * 1000.0);
            peiteAlku = -1f;
        }

        static readonly Unity.Profiling.ProfilerMarker MusiikkiMerkki = new Unity.Profiling.ProfilerMarker("Update.Linssi.Ymparisto.Musiikki");
        public void MusiikkiPitoon(bool pidossa) { using (MusiikkiMerkki.Auto()) MusiikkiKasittelija?.Invoke(pidossa); }

        public void LinssiMusiikki(string laji) => LinssiMusiikkiKasittelija?.Invoke(laji);

        public void LinssiMusiikkiHimmennys(double taso) => LinssiHimmennysKasittelija?.Invoke(taso);

        public void Tehoste(string nimi, float voima = 1f)
        {
            // Keksintöjen kilahdus ja vuosinaksahdus ovat webissä synteesiä: LinssiTehosteet rekisteröi ne tehosteväylälle
            // (Aanet.RekisteroiTehoste) ja soittaa väylältä sekä laskee ne lokiin. Muut nimet Pelikoodarin väylälle.
            if (tehosteet != null && LinssiTehosteet.Tuntee(nimi))
            {
                var (lahde, tila) = tehosteet.Soita(nimi, voima);
                // Naksu voi soida 8 kertaa sekunnissa: lokiin vain kilahdukset (naksut laskurina, "aani tila").
                if (nimi != Matkakirja.Linssit.Aanet.KeksintojenAanet.Keksinto) return;
                string alku = $"linssiaani: keksinto {tila}, {AaniLaskurit()}";
                if (lahde == null) Kirjaa(alku);
                else StartCoroutine(tehosteet.KirjaaMyohemmin(lahde, alku, 0.2f));
                return;
            }
            Kirjaa($"tehoste {nimi} {voima:0.##}");
            TehosteKasittelija?.Invoke(nimi, voima);
        }

        /// <summary>Auki olevan keksintölinssin kilahdukset ja naksut (web keksinnonAani, naksahda) lokiriville.</summary>
        string AaniLaskurit()
        {
            var l = (rekisteri?.Auki as KeksinnotSovitin)?.Linssi;
            if (l?.Ajo == null) return "keksinnöt ei auki";
            var a = l.Aanet;
            return $"pysäkki {l.Ajo.Tila.I}, vuosi {l.Ajo.Tila.Paikka:F1}, kilahduksia {a.Kilahduksia}, naksuja {a.Naksuja} (harvennettu {a.Harvennettuja})";
        }

        public void Taustaaani(string tunnus)
        {
            Kirjaa("taustaääni " + (tunnus ?? "pois"));
            TaustaaaniKasittelija?.Invoke(tunnus);
        }

        public ISilmukka Silmukka(string tunnus) => SilmukkaKasittelija != null ? SilmukkaKasittelija(tunnus) : TyhjaSilmukka.Kahva;

        public void Repliikki(bool puhuu) => RepliikkiKasittelija?.Invoke(puhuu);

        /// <summary>
        /// Turvallinen kahva, kun SilmukkaKasittelija ei ole (vielä) kytketty (esim. Aanisoitin ei ole
        /// käynnistynyt): Silmukka ei koskaan palauta nullia, mutta tämä kahva ei koskaan soi.
        /// </summary>
        sealed class TyhjaSilmukka : ISilmukka
        {
            public static readonly ISilmukka Kahva = new TyhjaSilmukka();
            public void Voimakkuus(float taso, float liukuS) { }
            public void Lopeta(float haiveS = 0.35f) { }
        }

        public bool VahennettyLiike => VahennettyLiikeKysely?.Invoke() ?? false;

        public double Aika => Time.realtimeSinceStartupAsDouble;

        // ── Testikomennot ─────────────────────────────────────────────────

        void LueKomennot()
        {
            if (!File.Exists(komentoPolku)) return;
            string[] rivit;
            try { rivit = File.ReadAllLines(komentoPolku); File.Delete(komentoPolku); }
            catch (IOException e) { Debug.LogWarning("MATKAKIRJA linssi-komento: " + e.Message); return; }
            foreach (var rivi in rivit.Select(r => r.Trim()).Where(r => r.Length > 0)) Suorita(rivi);
        }

        void Suorita(string rivi)
        {
            var osat = rivi.Split(' ');
            try
            {
                if (osat[0] == "linssit")
                    Kirjaa(string.Join(", ", rekisteri.Kaikki.Select(l => l.Tiedot.Id)));
                else if (osat[0] == "linssi" && osat.Length > 1 && osat[1] == "pois")
                    rekisteri.Sulje();
                else if (osat[0] == "linssi" && osat.Length > 1)
                {
                    if (!AineistoValmis && rekisteri.Kaikki.All(l => l.Tiedot.Id != osat[1])) StartCoroutine(ValitseKunValmis(osat[1]));
                    else rekisteri.Valitse(osat[1]);
                }
                else if (osat[0] == "erikois")
                    ErikoismalliElavat.Testi(osat.Length > 1 ? string.Join(" ", osat, 1, osat.Length - 1) : "tila", this);
                else if (osat[0] == "elava")
                    ElavaKartta.Komento(osat, this);
                else if (osat[0] == "iss")
                {
                    // "iss lataa" hakee TLE:n (välimuisti, buildi, ämpäri), "iss tila" kertoo lähteen, iän ja laadun.
                    if (osat.Length > 1 && osat[1] == "lataa") IssTleLataaja.Lataa(this);
                    var utc = Matkakirja.Linssit.Iss.IssNyt.Kello();
                    var p = Matkakirja.Linssit.Iss.IssNyt.Paikka(utc);
                    Kirjaa($"iss: {IssTleLataaja.Tila()}, alapiste {p.Lat:F2}, {p.Lon:F2} ({utc:HH:mm:ss} UTC)");
                }
                else if (osat[0] == "yokartta")
                {
                    // Yökartta: "yokartta" = tila (auringon alihajapiste ja iltaraja), "yokartta kelaa <k>" = aika k-kertaisena
                    // (1 = todellinen), "yokartta valot <0…1>" = valojen osuus (A/B kuten astro kyyti valot).
                    var s = rekisteri?.Hae("yokartta") as YokarttaSovitin;
                    var l = s?.Linssi;
                    if (osat.Length > 2 && osat[1] == "kelaa") l?.Kelaa(Luku(osat[2]));
                    if (osat.Length > 2 && osat[1] == "valot") Yokuori.ValojenOsuus = Mathf.Clamp01((float)Luku(osat[2]));
                    var utc = Matkakirja.Linssit.Iss.IssNyt.Kello();
                    Matkakirja.Linssit.Iss.Aurinko.Alihajapiste(Matkakirja.Linssit.Iss.Aika.Jd(utc), out double sl, out double so);
                    var r = Matkakirja.Linssit.Yokartta.YokarttaLinssi.Iltaraja(utc, kierto != null ? kierto.leveys : 0);
                    Kirjaa($"yokartta: {(l != null ? "auki" : "kiinni")}, kello {Matkakirja.Linssit.Iss.IssNyt.Simu} ({utc:HH:mm} UTC), "
                        + $"aurinko zeniitissä {sl:F1}, {so:F1}, iltaraja {r.Lat:F1}, {r.Lon:F1}, valot {Yokuori.ValojenOsuus:0.##}");
                }
                else if (osat[0] == "kaista")
                {
                    // Zoomikaista (LinssinRajat): "kaista" kertoo pallon lähimmän ja kaukaisimman korkeuden sekä koko pallon;
                    // "kaista kauas|lahelle" ajaa kameran kaistan reunaan (0,6 s), kuten pelaajan loitonnus tai lähennys.
                    if (kierto != null && osat.Length > 1 && (osat[1] == "kauas" || osat[1] == "lahelle"))
                        kierto.Aja(kierto.leveys, kierto.pituus, osat[1] == "kauas" ? kierto.MaxKorkeus() : kierto.MinKorkeus(), 0.6f, null);
                    Kirjaa(kierto == null ? "kaista: ei palloa"
                        : $"kaista: {kierto.MinKorkeus() / 1000:F0}–{kierto.MaxKorkeus() / 1000:F0} km, koko pallo {kierto.KokoPallonKorkeus() / 1000:F0} km, "
                        + $"nyt {kierto.korkeus / 1000:F0} km, linssi {rekisteri?.Auki?.Tiedot.Id ?? "-"}");
                }
                else if (osat[0] == "astro" && osat.Length > 1)
                {
                    // Kuvaselain (Linssisepän suositus 28.9.): "astro kuva <tunnus|n>" avaa astronautin linssin kuvan
                    // (napautuksen reitti), "astro naapuri 1|-1 [galleria]" viereiseen kohteeseen, "astro kierros" kertoo järjestyksen.
                    var l = FindAnyObjectByType<AstronauttiKerros>()?.Linssi;
                    if (l == null) Kirjaa("astro: linssi ei auki (linssi satelliitti)");
                    else if (osat[1] == "kuva" && osat.Length > 2)
                    {
                        var kohteet = l.Kohteet;
                        var k = int.TryParse(osat[2], out int n) && n >= 0 && n < kohteet.Count ? kohteet[n] : kohteet.Find(x => x.Tunnus == osat[2]);
                        if (k != null) l.Napauta(k.Tunnus);
                        Kirjaa($"astro kuva: {k?.Tunnus ?? "ei kohdetta"} ({k?.Lat:F1}, {k?.Lon:F1})");
                    }
                    else if (osat[1] == "naapuri" && osat.Length > 2)
                    {
                        var k = l.Naapuri(osat[2] == "-1" ? -1 : 1, osat.Length > 3 && osat[3] == "galleria");
                        Kirjaa($"astro naapuri: {k?.Tunnus ?? "-"}");
                    }
                    else if (osat[1] == "kierros")
                        Kirjaa("astro kierros: " + string.Join(" ", l.KierrosTunnukset()));
                    else if (osat[1] == "seuranta")
                    {
                        // ISS-seuranta avauksesta (web PAATOKSET 53): "astro seuranta" kertoo, seuraako kamera asemaa, ja kameran
                        // katseen etäisyyden aseman alapisteestä; "astro seuranta ote" = pelaajan ote palloon.
                        if (osat.Length > 2 && osat[2] == "ote") l.PelaajanEle();
                        var p = Matkakirja.Linssit.Iss.IssNyt.Paikka(Matkakirja.Linssit.Iss.IssNyt.Kello());
                        var (kl, ko) = l.Katse;
                        Kirjaa($"astro seuranta: {(l.IssSeuranta ? "päällä" : "pois")}, vaihe {l.Vaihe}, katse {kl:F2}, {ko:F2}, "
                            + $"ISS {p.Lat:F2}, {p.Lon:F2}, ero {Matkakirja.Linssit.Iss.Ylilennot.MaaEtaisyysKm(kl, ko, p.Lat, p.Lon):F0} km, "
                            + $"korkeus {l.Suhde:F2} × avaus");
                    }
                    else if (osat[1] == "kavely")
                    {
                        // Avaruuskävely (29.9.): "astro kavely" = kyytiin tarvittaessa ja kävely alkaa, "astro kavely napauta" =
                        // pelaajan napautus (seuraava vaihe), "astro kavely pois" = keskeytys, "astro kavely tila" = tila lokiin.
                        string a = osat.Length > 2 ? osat[2] : "";
                        if (a == "napauta") l.NapautaIss();
                        else if (a == "pois") l.LopetaKavely();
                        else if (a == "alas" && osat.Length > 3)   // A/B katse alas ulkona (°): 45 = oletus, Codexin horisontti ~45 %
                            Matkakirja.Linssit.Iss.IssKuvakulma.UlkonaKatseAlas = Math.Max(22, Math.Min(70, Luku(osat[3])));
                        else if (a == "suunta" && osat.Length > 3) Matkakirja.Linssit.Iss.Avaruuskavely.KohtiAurinkoa = osat[3] != "sivu";
                        else if (a != "tila" && a != "alas" && a != "suunta")
                        {
                            if (!l.Kyydissa) l.NapautaIss();
                            if (!l.AloitaKavely()) Kirjaa("astro kavely: ei alkanut (kyyti, kuva tai avaus kesken)");
                        }
                        var k = l.Kavely;
                        var v = l.KavelynVertailu;
                        Kirjaa($"astro kavely: {k.Vaihe} (kyyti {l.Kyyti}, alas {Matkakirja.Linssit.Iss.IssKuvakulma.UlkonaKatseAlas:0}°), nousu {(k.NousuHetki.HasValue ? k.NousuHetki.Value.ToString("HH:mm:ss") + " UTC" : "-")}, "
                            + $"kello {Matkakirja.Linssit.Iss.IssNyt.Simu}, vertailu {(v.HasValue ? v.Value.Kohde.Tunnus + " " + v.Value.Km.ToString("F0") + " km" : "-")}");
                    }
                    else if (osat[1] == "kyyti")
                    {
                        // ISS:n kyyti (suositus 28.9.): "astro kyyti" = napautus ISS:ään (kauko → seuranta → ikkuna → seuranta),
                        // "astro kyyti pois" = ✕, "astro kyyti tila" = tila, kamera ja ISS lokiin.
                        string a = osat.Length > 2 ? osat[2] : "";
                        if (a == "pois") l.PoistuKyydista();
                        else if (a == "yo" && osat.Length > 3) Yokuori.Pois = osat[3] == "0";   // A/B: astro kyyti yo 0|1
                        // A/B omistajan Cupola-palautteeseen (28.9.): uusi = Codexin tumma kuva syväterävyydellä (poltettu),
                        // terava = Codexin alkuperäinen, 3d = valaistu 3D-kehys, vanha = 1.0.35:n UI-kehys.
                        // ISS-säätöpaneeli (omistaja 29.9.): välilehti, kutistus ja nahka kuvapariin.
                        else if (a == "paneeli") Kirjaa(Matkakirja.Natiivi.IssKyytiNakyma.Paneeli(osat.Skip(3).ToArray()));
                        else if (a == "cupola" && osat.Length > 3)
                        {
                            CupolaKerros.Tyyli = osat[3] == "vanha" ? CupolaKerros.Tyylit.Vanha
                                : osat[3] == "3d" ? CupolaKerros.Tyylit.Kolmiulotteinen : CupolaKerros.Tyylit.Kuva;
                            // uusi = oletussarja (pehmea4), pehmea = 1.0.37, pehmea2–4 = vertailusarjat, terava = Codexin alkuperäinen.
                            Matkakirja.Natiivi.IssKyytiNakyma.Sarja = osat[3] == "terava" ? ""
                                : osat[3].StartsWith("pehmea", StringComparison.Ordinal) ? osat[3] : Matkakirja.Natiivi.IssKyytiNakyma.OletusSarja;
                        }
                        else if (a == "ilmakeha" && osat.Length > 3)
                        {
                            Avaruus.VanhaIlmakeha = osat[3] == "vanha";
                            FindAnyObjectByType<Avaruus>()?.Kyyti(l.Kyydissa);
                        }
                        else if (a == "varsi" && osat.Length > 3) CupolaKerros.Varsi = osat[3] != "0";
                        else if (a == "ajelehdus" && osat.Length > 3) Matkakirja.Natiivi.IssKyytiNakyma.Ajelehdus = osat[3] != "0"; // A/B painoton ajelehdus
                        else if (a == "lasi" && osat.Length > 3   // A/B lähemmäs lasia: 1 = 1.0.37, 1.3 = uusi
                                 && double.TryParse(osat[3], System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out double lasi))
                            Matkakirja.Linssit.Iss.IssKuvakulma.LasiZoom = Math.Max(0.5, Math.Min(3.0, lasi));
                        else if (a == "polyt" && osat.Length > 3) Matkakirja.Natiivi.IssKyytiNakyma.Polyt = osat[3] != "0"; // A/B pölyhiukkaset auringonsäteessä
                        // IKKUNAN RAJAUS (omistaja 28.9. klo 21.5x ja 22.5x): pyöreä kattoikkuna tiiviisti (oletus), iso sivuikkuna
                        // horisonttiin tai 1.0.40:n koko kupoli; pimeä ohjaamo ja auringonvalo pokissa kahdessa ensimmäisessä.
                        else if (a == "rajaus" && osat.Length > 3)
                            Matkakirja.Linssit.Iss.IssKuvakulma.Rajaus = osat[3] == "horisontti" ? Matkakirja.Linssit.Iss.IssKuvakulma.IkkunanRajaus.Horisontti
                                : osat[3] == "katto" ? Matkakirja.Linssit.Iss.IssKuvakulma.IkkunanRajaus.Katto : Matkakirja.Linssit.Iss.IssKuvakulma.IkkunanRajaus.Pyorea;
                        // CUPOLA 3 (Codexin toimitus 28.9. klo 22.4x): pyöreän rajauksen ohjaamo, 3 = kulma A keskitetty, pehmeä ja umpinainen
                        // (oletus, omistaja 23.1x + alfakorjaus 29.9.), 3pehmea = cl19–cl20, 3terava = Codexin terävä (cl18), 3b = hieman vino, 2 = Cupola 2.
                        else if (a == "ohjaamo" && osat.Length > 3)
                        {
                            Matkakirja.Natiivi.IssKyytiNakyma.Ohjaamo3 = osat[3] != "2";
                            Matkakirja.Natiivi.IssKyytiNakyma.Ohjaamo3Kulma = osat[3] == "3b" ? "b" : "a";
                            Matkakirja.Natiivi.IssKyytiNakyma.Ohjaamo3Sarja = osat[3] == "3terava" ? "" : osat[3] == "3pehmea" ? "pehmea" : "pehmea-umpi";
                        }
                        // Läpikuulon kontrollikoe (Natiiviseppä 28.9.): kehys pelkkänä mustana taustana ilman kuvaa.
                        else if (a == "kehysmusta" && osat.Length > 3) Matkakirja.Natiivi.IssKyytiNakyma.KehysMustana = osat[3] != "0";
                        else if (a == "katse" && osat.Length > 3)   // katse <astetta vaakatason alapuolelle> | pois (tilan mukaan)
                            Matkakirja.Linssit.Iss.IssKuvakulma.KatseAlasPakotettu = double.TryParse(osat[3].Replace(',', '.'),
                                System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out double katse)
                                ? Math.Max(0, Math.Min(90, katse)) : double.NaN;
                        else if (a == "tumma" && osat.Length > 3 && float.TryParse(osat[3].Replace(',', '.'),
                                     System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out float tumma))
                        {
                            // Pyöreässä rajauksessa Cupola 3:n tummuus (oletus 1), muuten Cupola 2 -kehyksen (0,22).
                            if (Matkakirja.Natiivi.IssKyytiNakyma.Ohjaamo3 && Matkakirja.Linssit.Iss.IssKuvakulma.Rajaus == Matkakirja.Linssit.Iss.IssKuvakulma.IkkunanRajaus.Pyorea)
                                Matkakirja.Natiivi.IssKyytiNakyma.Cupola3Tummuus = Mathf.Clamp01(tumma);
                            else Matkakirja.Natiivi.IssKyytiNakyma.OhjaamonTummuus = Mathf.Clamp01(tumma);
                        }
                        else if (a == "reunavalo" && osat.Length > 3) Matkakirja.Natiivi.IssKyytiNakyma.Reunavalo = osat[3] != "0";
                        else if (a == "valot" && osat.Length > 3)   // A/B kaupunkien valot: 0 | 1 | osuus 0…1 (esim. 0.8)
                        {
                            Yokuori.ValotPois = osat[3] == "0";
                            if (!Yokuori.ValotPois && float.TryParse(osat[3], System.Globalization.NumberStyles.Float,
                                    System.Globalization.CultureInfo.InvariantCulture, out float osuus))
                                Yokuori.ValojenOsuus = Mathf.Clamp01(osuus);
                        }
                        else if (a == "kiilto" && osat.Length > 3) Yokuori.KiiltoPois = osat[3] == "0"; // A/B auringon heijastus
                        else if (a == "varjo" && osat.Length > 3) Yokuori.VarjoPois = osat[3] == "0";   // A/B päiväpuolen varjostus
                        else if (a == "hehku" && osat.Length > 3) Avaruus.HehkuPois = osat[3] == "0";    // A/B hämärä ja ilmahehku
                        else if (a == "taivas" && osat.Length > 3) { KyydinTaivas.Pois = osat[3] == "0"; KyydinTaivas.VarjoPakko = osat[3] == "2"; } // A/B oikeat tähdet ja Kuu; 2 = ISS varjossa
                        else if (a == "paivanpilvet" && osat.Length > 3) AstronauttiKerros.PaivanPilvetPois = osat[3] == "0";
                        else if (a == "tarkat" && osat.Length > 3)   // A/B terävät pilvet: 0 | 1 | kohinan pohja km (esim. 20)
                        {
                            AstronauttiKerros.TarkatPilvetPois = osat[3] == "0";
                            if (osat[3] != "0" && osat[3] != "1" && float.TryParse(osat[3].Replace(',', '.'), System.Globalization.NumberStyles.Float,
                                    System.Globalization.CultureInfo.InvariantCulture, out float km))
                                AstronauttiKerros.TarkkojenPilvienKm = Mathf.Clamp(km, 2f, 200f);
                        }
                        else if (a == "revontulet" && osat.Length > 3) Revontulet.Pois = osat[3] == "0";
                        else if (a == "siirtyma")
                            Kirjaa("astro kyyti siirtymä: " + (FindAnyObjectByType<AstronauttiKerros>()?.Linssi?.ViimeisinSiirtymaS is double ss
                                ? $"{ss:F2} s (raja {Matkakirja.Linssit.Iss.Simukello.SiirtymaMaxS:0} s)" : "ei perillä"));
                        else if (a == "pilvimaara" && osat.Length > 3) AstronauttiKerros.PilvienMaara = Mathf.Clamp01((float)Luku(osat[3])); // säädin 0–1
                        else if (a == "sijainti")
                        {
                            // Oma sijainti: "astro kyyti sijainti [ISO2]" (ISO2 pakottaa maan ilman verkkoa).
                            if (osat.Length > 3) OmaSijaintiHaku.Pakota(osat[3]);
                            if (OmaSijaintiHaku.Paikka(out var sn, out var slat, out var slon))
                                Kirjaa($"oma sijainti: {OmaSijaintiHaku.Iso2} ({OmaSijaintiHaku.Lahde}) {sn} {slat:F2}, {slon:F2} → "
                                    + ((FindAnyObjectByType<AstronauttiKerros>()?.Linssi?.LennaPaikkaan($"Oma sijainti ({sn})", slat, slon)) is Matkakirja.Linssit.Iss.Ylilento yl
                                        ? $"ylilento {yl.Hetki:HH:mm} UTC, {yl.SivuttainKm:F0} km" : "ei ylilentoa/ei kyydissä"));
                            else { OmaSijaintiHaku.Aloita(); Kirjaa($"oma sijainti: ei vielä ({OmaSijaintiHaku.Iso2 ?? "-"}, haettu {OmaSijaintiHaku.Haettu})"); }
                        }
                        else if (a == "kuukausi" && osat.Length > 3 && osat[3].StartsWith("m") && int.TryParse(osat[3].Substring(1), out int pakko))
                            AstronauttiKerros.KuukausiPakotettu = pakko;                                   // 4a: m<kk> pakottaa, m0 pois
                        else if (a == "kuukausi" && osat.Length > 3 && osat[3].StartsWith("a") && float.TryParse(osat[3].Substring(1).Replace(',', '.'),
                            System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out float kkAlfa))
                            AstronauttiKerros.KuukaudenAlfa = Mathf.Clamp01(kkAlfa);                        // 4a: a<0–1> BMNG:n alfa
                        else if (a == "kuukausi" && osat.Length > 3) AstronauttiKerros.KuukaudenPintaPois = osat[3] == "0"; // 4a
                        else if (a == "kello" && osat.Length > 3) Kirjaa("astro kyyti kello: " + KyydinKello(osat[3]));
                        else if (a == "pilvet" && osat.Length > 3)
                        {
                            AstronauttiKerros.PilvetKyydissa = osat[3];
                            FindAnyObjectByType<AstronauttiKerros>()?.PaivitaPilvet();
                        }
                        // Nopeutus ja "Lennä kohteen ylle" (web 891958e17): nopeus 1|10|100|1000, live (= Palaa LIVE),
                        // kohde <tunnus> [valoisa] (seuraava ylilento, kelaus ja katse kohteeseen), kohteet (valikon järjestys).
                        else if (a == "nopeus" && osat.Length > 3) Kirjaa("astro kyyti nopeus: " + KyydinNopeus(l, osat[3]));
                        else if (a == "live") Kirjaa("astro kyyti live: " + KyydinNopeus(l, "1"));
                        else if (a == "kohde" && osat.Length > 3) Kirjaa("astro kyyti kohde: " + KyydinKohde(l, osat[3], osat.Length > 4 && osat[4] == "valoisa"));
                        else if (a == "kohteet") Kirjaa("astro kyyti kohteet: " + string.Join(" ", l.YlilennonKohteet.Select(x => x.Tunnus)));
                        else if (a != "tila") l.NapautaIss();
                        var utc = Matkakirja.Linssit.Iss.IssNyt.Kello();
                        var p = Matkakirja.Linssit.Iss.IssNyt.Paikka(utc);
                        var kam = kierto.GetComponent<Camera>();
                        Kirjaa($"astro kyyti: {l.Kyyti} (kyydissä {l.Kyydissa}), ISS ({p.Lat:F2}, {p.Lon:F2}) " +
                               $"{Matkakirja.Linssit.Iss.IssNyt.KorkeusKm(utc):F0} km suunta {Matkakirja.Linssit.Iss.IssNyt.Suuntima(utc):F0}°, " +
                               $"laatu {Matkakirja.Linssit.Iss.IssNyt.Laatu(utc)}, kamera ({kierto.leveys:F2}, {kierto.pituus:F2}) " +
                               $"{kierto.korkeus / 1000:F0} km kall {kierto.KaytettyKallistus:F1}° suunt {kierto.suuntima:F0}° fov {kam?.fieldOfView:F0}");
                        Kirjaa("astro kyyti aika: " + KyydinAikaTila(l));
                        Kirjaa("astro kyyti ohjaamo: " + Matkakirja.Natiivi.IssKyytiNakyma.OhjaamonTila);
                    }
                }
                else if (osat[0] == "keksinnot" && osat.Length > 1)
                    Keksinnot(osat[1]);
                else if (osat[0] == "esitys" && osat.Length > 1)
                    Esitys(osat[1]);
                else if (osat[0] == "sumu" && osat.Length > 1)
                {
                    // Ihmisen matka II:n sumu pois/päälle (kehysaikojen vertailu samasta jaksosta, Natiiviseppä 25.9.).
                    if (osat[1] == "pois" || osat[1] == "paalle") IhmisenMatka2Sumu.Pois = osat[1] == "pois";
                    Kirjaa(IhmisenMatkaKerros.Instanssi?.Tehosteet?.Sumu?.Kuvaus() ?? $"sumu: II ei auki (pois {IhmisenMatka2Sumu.Pois})");
                }
                else if (osat[0] == "hiukkaset" && osat.Length > 1)
                {
                    // Ihmisen matka II:n hiukkaset pois/päälle (kehysaikojen vertailu), tila lokiin.
                    if (osat[1] == "pois" || osat[1] == "paalle") IhmisenMatka2Hiukkaset.Pois = osat[1] == "pois";
                    Kirjaa(IhmisenMatkaKerros.Instanssi?.Tehosteet?.Hiukkaset?.Kuvaus()
                        ?? $"hiukkaset: II ei auki (pois {IhmisenMatka2Hiukkaset.Pois})");
                }
                else if (osat[0] == "ihminen" && osat.Length > 1 && osat[1] == "tutkimus")
                {
                    // Testikomento: ihmisen matka auki ja suoraan tutkimusvaiheeseen (Laitetestaajan
                    // virtanappien ja nostopisteiden tarkistus ilman koko esitystä).
                    // "ihminen tutkimus 2" = Ihmisen matka II.
                    string haluttu = osat.Length > 2 && osat[2] == "2" ? "ihmisen-matka-2" : "ihmisen-matka";
                    if (rekisteri.Auki?.Tiedot.Id != haluttu) rekisteri.Valitse(haluttu);
                    var l = (rekisteri.Auki as IhmisenMatkaSovitin)?.Linssi;
                    bool ok = l?.SiirryTutkimukseen() ?? false;
                    Kirjaa($"ihminen tutkimus: {(ok ? (l.Tutkimus != null ? $"auki, {l.Tutkimus.Nostot.Count} nostoa" : "odottaa vanoja") : "ei onnistunut")}");
                }
                else if (osat[0] == "kamera" && osat.Length > 3)
                    AjaKamera(new Nakyma(Luku(osat[1]), Luku(osat[2]), Luku(osat[3]) * 1000), 0f);
                else if (osat[0] == "kehittaja" && osat.Length > 1)
                {
                    AsetaKehittajatila(osat[1] == "1");
                    Kirjaa($"kehittäjätila {Linssirekisteri.Kehittajatila}, valittavissa {string.Join(", ", rekisteri.Valittavat.Select(l => l.Tiedot.Id))}");
                }
                else if (osat[0] == "kyllaisyys" && osat.Length > 1)
                {
                    AsetaAstronautinKyllaisyys((float)Luku(osat[1]));
                    Kirjaa($"astronautin kylläisyys {Matkakirja.Linssit.Astronautti.AstronauttiLinssi.Kyllaisyys:F1}, sarja {Matkakirja.Linssit.Astronautti.AstronauttiLinssi.ReliefinSarja()}");
                }
                else if (osat[0] == "radio" && osat.Length > 1)
                {
                    var r = (rekisteri.Auki as RadioSovitin)?.Linssi;
                    // Linssin tila on rekisterin (yksi totuus); ui linssi radio näyttää vain Natiivi-UI:n testikuoren.
                    if (r == null) Kirjaa(RadioNakyma.Testikuori
                        ? "radio: linssi ei ole auki (näkyvissä testikuori ui linssi radio; oikea linssi: linssi radio)"
                        : "radio: linssi ei ole auki");
                    else if (osat[1] == "stop") r.Keskeyta();
                    else if (osat[1] == "taajuus" && osat.Length > 2) r.Taajuus(Luku(osat[2]));
                    else if (osat[1] == "tauko" && osat.Length > 2) r.Tauko(osat[2] == "1");
                    else if (osat[1] == "aani" && osat.Length > 2) { r.Voimakkuus = (float)Luku(osat[2]); Kirjaa($"radio: äänenvoimakkuus {Luku(osat[2]):F2}"); }
                    // Esikuuntelun A/B-mittaus (Natiivisepän ehto 5): kytkin pois/päälle, tila lokiin.
                    else if (osat[1] == "esikuuntelu" && osat.Length > 2) { EsikuunteluPois = osat[2] == "pois"; Kirjaa($"radio: esikuuntelu {(EsikuunteluPois ? "pois" : "päällä")}"); }
                    else if (osat[1] == "tila") Kirjaa($"radio: {r.Tila.Vaihe}{(r.Tauolla ? " (tauolla)" : "")} {r.Tila.AsemaId} {r.Tila.Rivi1} / {r.Tila.Rivi2}, asteikolla {r.Asteikko.Count}, taajuus {r.Tila.Taajuus:F4}, esikuuntelu {r.Esikuunneltu ?? "-"}, näkyvissä {r.Nakyvat.Count}, VU {r.Mittari.Osuus:F2}{(r.Mittari.Jaljitelty ? " (varakuvio)" : "")}, rms {((r.Virta as Matkakirja.Natiivi.RadioVirta)?.Taso ?? -1):F4}, {VuSyy((r.Virta as Matkakirja.Natiivi.RadioVirta)?.Kuvaus)}");
                    else if (osat[1] == "kaupunki" && osat.Length > 2) r.SoitaKaupunki(osat[2]);
                    // A/B Codexin uusi radio (29.9.) ↔ vanha kotelo kuvapariin.
                    else if (osat[1] == "kuori" && osat.Length > 2) { RadioNakyma.Kuori(osat[2] != "vanha"); Kirjaa($"radio: kuori {osat[2]}"); }
                    else r.Viritä(osat[1].ToUpperInvariant());
                }
                else if (osat[0] == "isoisa" && osat.Length > 1 && osat[1] == "tila")
                    Kirjaa((rekisteri.Auki as IsoisaSovitin)?.Kerros is IsoisaKerros ik
                        ? $"isoisä 1873: näkyvissä {ik.Nakyvia} nimeä, kamera {Kamera}" : "isoisä 1873: linssi ei ole auki");
                else if (osat[0] == "vuosi")
                    vuosi.Komento(osat);
                else if (osat[0] == "poikki")
                    poikki.Komento(osat);
                else if (osat[0] == "tila")
                    Kirjaa($"tila: auki {rekisteri.Auki?.Tiedot.Id ?? "ei"}, kamera {Kamera}");
                else if (osat[0] == "maa" && osat.Length > 1)
                    (rekisteri.Auki as MaatSovitin)?.Linssi?.Napauta(osat[1].ToUpperInvariant());
                else if (osat[0] == "vertaa")
                    Kirjaa("vertaa: " + ((rekisteri.Auki as MaatSovitin)?.Linssi is Matkakirja.Linssit.Maat.VertailuLinssi v && v.Vertaa()));
                else if (osat[0] == "aani" && osat.Length > 1)
                    Aani(osat);
                else if (osat[0] == "lehti")
                    Kirjaa("lehti: " + ((rekisteri.Auki as MaatSovitin)?.Linssi is Matkakirja.Linssit.Maat.MaatiedotLinssi m && m.AvaaLehti()));
                else
                    Kirjaa("tuntematon komento: " + rivi);
            }
            catch (ArgumentException e) { Kirjaa("virhe: " + e.Message); }
        }

        static double Luku(string s) =>
            double.Parse(s.Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture);

        void Keksinnot(string mita)
        {
            var l = (rekisteri.Auki as KeksinnotSovitin)?.Linssi;
            if (l?.Ajo == null) { Kirjaa("keksinnöt: linssi ei ole auki"); return; }
            if (mita == "kaynnista") l.Kaynnista();
            else if (mita == "jatka") l.JatkaValinaytoksesta();
            else if (mita == "tauko") l.Ajo.Tauko();
            else if (int.TryParse(mita, out int i))
            {
                // Selaus ennen Käynnistä-nappia: kaari käynnistetään ensin (esittely väistyy).
                if (!l.OnKaynnistetty) l.Kaynnista();
                l.Ajo.Siirry(i);
            }
            else if (mita != "tila") { Kirjaa("keksinnöt: tuntematon " + mita); return; }
            var t = l.Ajo.Tila;
            Kirjaa($"keksinnöt: pysäkki {t.I}, vuosi {t.Paikka:F1}, käynnissä {l.Ajo.Kaynnissa}, välinäytös {l.Ajo.ValinaytosAuki}, luenta {System.IO.Path.GetFileName(l.Luenta ?? "-")}");
        }

        void Esitys(string mita)
        {
            // "esitys kaynnista" = aloituskortin Käynnistä (Aloita avauksesta), "esitys alusta" = valikon Aloita alusta.
            // Löydös 148 (II:n soitin): "toista" = ▶/⏸, "alkuun" = ⏮, "loppuun" = ⏭ (IhmisenMatkaLinssi.Ohjaus);
            // "tauko" ja "jatka" kutsuvat Esitystä suoraan kuten UI:n Tauko-nappi (linssi seuraa tilaa kehyksittäin).
            var il = (rekisteri.Auki as IhmisenMatkaSovitin)?.Linssi;
            if (mita == "kaynnista" && il != null) Kirjaa("esitys: käynnistä " + il.Kaynnista());
            else if (mita == "alusta" && il != null) Kirjaa("esitys: alusta " + il.AloitaAlusta());
            else if (mita == "alkuun" && il != null) Kirjaa("esitys: alkuun " + il.Alkuun());
            else if (mita == "loppuun" && il != null) Kirjaa("esitys: loppuun " + il.Loppuun());
            else if (mita == "toista" && il != null) Kirjaa("esitys: toista/tauko " + il.ToistaTaiTauko());
            var e = (rekisteri.Auki as IhmisenMatkaSovitin)?.Linssi?.Esitys;
            if (e == null) { Kirjaa("esitys: ihmisen matka ei ole auki tai ei käynnissä"); return; }
            if (mita == "tauko") e.Tauko();
            else if (mita == "jatka") e.Jatka();
            else if (mita != "tila" && mita != "kaynnista" && mita != "alusta" && mita != "alkuun" && mita != "loppuun" && mita != "toista")
                e.Valitse(mita);
            var sovitin = rekisteri.Auki as IhmisenMatkaSovitin;
            var kaare = sovitin?.Kaare;
            Kirjaa($"esitys: jakso {e.I}, kulunut {e.Kulunut / 1000:F1}/{e.Kesto / 1000:F1} s, vuosia {e.Vuosia:F0}, käynnissä {e.Kaynnissa}, " +
                $"ohjaus {il?.Ohjaus}, ääni {sovitin?.Aani?.Tila ?? "ei"}" +
                (kaare != null ? $", kääre {(kaare.Tauolla ? "tauolla" : "käy")} ajo #{kaare.Ajo?.Numero ?? 0}{(kaare.Saattaa ? " saattaa" : "")}" : ""));
        }

        /// <summary>
        /// Linssien äänet simulaattorimittaukseen: "aani keksinto|vuosi" soittaa tehosteen ja kirjaa lähteen ajan hetken
        /// päästä (play() ei todista ääntä), "aani humina [pois]" soittaa astronautin huminan Pelikoodarin maisemakanavalla
        /// ilman linssiä, "aani tila" kertoo tehosteet, laskurit ja huminan lähteet (Aanisoitin "Maisema A/B").
        /// </summary>
        void Aani(string[] osat)
        {
            string mita = osat[1];
            if (LinssiTehosteet.Tuntee(mita))
            {
                if (tehosteet == null) { Kirjaa("linssiaani: tehosteita ei ole"); return; }
                var (lahde, tila) = tehosteet.Soita(mita);
                string alku = $"linssiaani: {mita} {tila}";
                if (lahde == null) Kirjaa(alku);
                else StartCoroutine(tehosteet.KirjaaMyohemmin(lahde, alku, mita == Matkakirja.Linssit.Aanet.KeksintojenAanet.Vuosi ? 0.02f : 0.2f));
            }
            else if (mita == "humina")
            {
                bool pois = osat.Length > 2 && osat[2] == "pois";
                Taustaaani(pois ? null : Matkakirja.Linssit.Astronautti.AstronauttiLinssi.Humina);
                if (!pois) StartCoroutine(KirjaaHuminaMyohemmin(3f));
            }
            else if (mita == "tila")
                Kirjaa($"linssiaani: {tehosteet?.Kuvaus() ?? "tehosteita ei ole"}; {AaniLaskurit()}; {Humina()}");
            else Kirjaa("linssiaani: tuntematon " + mita + " (aani tila | keksinto | vuosi | humina [pois])");
        }

        System.Collections.IEnumerator KirjaaHuminaMyohemmin(float s)
        {
            yield return new WaitForSecondsRealtime(s);
            Kirjaa("linssiaani: " + Humina());
        }

        /// <summary>Huminan tila Pelikoodarin äänisoittimesta: maisemakanavan toive ja huminaklippiä soittavat lähteet.</summary>
        static string Humina()
        {
            if (!Aanisoitin.LinssiTaustat.TryGetValue(Matkakirja.Linssit.Astronautti.AstronauttiLinssi.Humina, out var h)) return "humina: ei taulussa";
            var toive = Aanisoitin.Instanssi?.Tila?.Toive(Matkakirja.Peli.Kanava.Maisema);
            string kanava = toive == null ? "ei äänisoitinta" : toive.Url == h.Url ? $"maisemakanavalla, taso {toive.Tavoite:0.000}" : "ei maisemakanavalla";
            var lahteet = new List<string>();
            foreach (var s in FindObjectsByType<AudioSource>(FindObjectsInactive.Exclude, FindObjectsSortMode.None))
                if (s.clip != null && s.clip.name == h.Url) lahteet.Add($"{s.gameObject.name}: {LinssiTehosteet.Lahteen(s)}");
            return $"humina {kanava} (voima {h.Voima:0.00}, nousu {h.NousuMs} ms), lähteet [{string.Join("; ", lahteet)}]";
        }

        /// <summary>Natiivin Kuvauksen loppu "VU <tila> <syy>" (Natiiviseppä 161fa35), muuten koko kuvaus.</summary>
        static string VuSyy(string kuvaus)
        {
            if (string.IsNullOrEmpty(kuvaus)) return "-";
            int i = kuvaus.LastIndexOf("VU ", StringComparison.Ordinal);
            return i >= 0 ? kuvaus.Substring(i) : kuvaus;
        }

        /// <summary>
        /// Testikello ISS:lle ja auringolle (yökuori, ilmakehän kaari, Cupolan valo, taivas): "yo-eurooppa" hyppää seuraavaan
        /// syvän yön ylitykseen Keski-Euroopan yllä (kaupunkien valot, tähdet ja Kuu), "hamara" iltahämärään kohti yötä
        /// (varjostus, hämärän kaari, syttyvät valot), "kiilto" auringon heijastukseen vedestä; "+H" siirtää H tuntia; "pois"
        /// palauttaa oikean kellon. Kello kulkee siirron jälkeen. Siirto asettaa simuloidun kellon LIVE-hetken (IssNyt.Simu):
        /// kello hyppää hetkeen LIVE:nä, nopeutus (astro kyyti nopeus) juoksee siitä ja Palaa LIVE palaa siihen.
        /// </summary>
        static string KyydinKello(string arvo)
        {
            if (arvo == "pois") { Matkakirja.Linssit.Iss.IssNyt.Simu.AsetaSiirto(TimeSpan.Zero); return "oikea aika"; }
            TimeSpan siirto;
            if (arvo.StartsWith("+") && double.TryParse(arvo.Substring(1), System.Globalization.NumberStyles.Float,
                    System.Globalization.CultureInfo.InvariantCulture, out double tunnit))
                siirto = TimeSpan.FromHours(tunnit);
            else if (arvo == "yo-eurooppa")
            {
                // Syvä yö Keski-Euroopan yllä (lat 40–60, lon −10…35, aurinko alapisteessä alle −20°, jolloin ISS on
                // yleensä maan varjossa ja tähdet näkyvät täysinä) enintään 24 vrk:n päästä: syys–lokakuun vaihteessa
                // ISS ylittää Euroopan vain iltahämärässä (laitteen cl3-ajo 28.9.: 36 h:n haku ei löytänyt yötä), joten
                // testikello hakee seuraavan aamuyön ylityksen (tietorivillä rata-arvio, jos TLE on yli 7 vrk vanha).
                // Varalla väljempi ehto 72 h:n sisällä (aurinko alle −8°).
                var nyt = DateTime.UtcNow;
                // Ensin Länsi- ja Keski-Eurooppa (lat 43–58, lon −5…20, alle −18°: laite cl4 osui 40–60/−10…35-rajauksella Turkin ja
                // Mustanmeren ylle, jossa kamera katsoo Kaukasiaan), sitten laajempi, lopuksi väljä 72 h.
                var loyto = HaeKyydinHetki(nyt, 24 * 24, 30, (t, lat, lon) => lat >= 43 && lat <= 58 && lon >= -5 && lon <= 20
                                && AurinkoKorkeus(t, lat, lon) < -18)
                    ?? HaeKyydinHetki(nyt, 24 * 24, 30, (t, lat, lon) => lat >= 40 && lat <= 60 && lon >= -10 && lon <= 35
                                && AurinkoKorkeus(t, lat, lon) < -20)
                    ?? HaeKyydinHetki(nyt, 72, 20, (t, lat, lon) => lat >= 35 && lat <= 65 && lon >= -15 && lon <= 45
                                && AurinkoKorkeus(t, lat, lon) < -8);
                if (loyto == null) return "ei yöylitystä Euroopan yllä 24 vrk:n sisällä";
                siirto = loyto.Value.AddSeconds(30) - nyt;
            }
            else if (arvo == "hamara")
            {
                // Iltahämärä Euroopan yllä kohti yötä (alapisteessä aurinko +2…+6° ja laskee): kamera katsoo eteenpäin
                // yön rajalle, jolloin päiväpuolen varjostus, hämärän kaari ja syttyvät valot näkyvät samassa kuvassa.
                var nyt = DateTime.UtcNow;
                var loyto = HaeKyydinHetki(nyt, 72, 20, (t, lat, lon) =>
                {
                    if (lat < 38 || lat > 62 || lon < -15 || lon > 40) return false;
                    double h = AurinkoKorkeus(t, lat, lon);
                    if (h < 2 || h > 6) return false;
                    var q = Matkakirja.Linssit.Iss.IssNyt.Paikka(t.AddSeconds(60));
                    return AurinkoKorkeus(t.AddSeconds(60), q.Lat, q.Lon) < h;
                });
                if (loyto == null) return "ei iltahämärää Euroopan yllä 72 tunnin sisällä";
                siirto = loyto.Value - nyt;
            }
            else if (arvo == "kiilto")
            {
                // Heijastus seurannan kuvan keskellä (laite cl6 28.9.: ikkunan heijastuskohta jäi Cupolan kehyksen taakse tai kuvan
                // ulkopuolelle): heijastussuunta (auringon atsimuutti, painuma = auringon korkeus alapisteessä) enintään 20° seurannan
                // kameran akselista (radan suunta, painuma 35°), alla vettä puolen minuutin ajan. Syys–lokakuun vaihteessa tämä
                // geometria toteutuu vasta lokakuun lopulla (laskettu 28.9.), joten haku ulottuu 35 vrk:een (rata-arvio).
                var nyt = DateTime.UtcNow;
                DateTime? loyto = null;
                double raja = Math.Cos(20 * Math.PI / 180), dp = 35 * Math.PI / 180;
                for (int s = 0; s < 35 * 86400 && loyto == null; s += 30)
                {
                    var t = nyt.AddSeconds(s);
                    var p = Matkakirja.Linssit.Iss.IssNyt.Paikka(t);
                    var aur = Aurinko.AurinkoEcef(t);
                    double la = p.Lat * Math.PI / 180, lo = p.Lon * Math.PI / 180;
                    double ylos = Math.Cos(la) * Math.Cos(lo) * aur.x + Math.Cos(la) * Math.Sin(lo) * aur.y + Math.Sin(la) * aur.z;
                    if (ylos < 0.17) continue;   // aurinko alle 10°
                    double ita = -Math.Sin(lo) * aur.x + Math.Cos(lo) * aur.y;
                    double pohj = -Math.Sin(la) * Math.Cos(lo) * aur.x - Math.Sin(la) * Math.Sin(lo) * aur.y + Math.Cos(la) * aur.z;
                    double h = Math.Asin(Math.Min(1, ylos)), ero = Math.Atan2(ita, pohj) - Matkakirja.Linssit.Iss.IssNyt.Suuntima(t) * Math.PI / 180;
                    double pistetulo = Math.Cos(dp) * Math.Cos(h) * Math.Cos(ero) + Math.Sin(dp) * Math.Sin(h);
                    if (pistetulo < raja) continue;
                    if (!Yokuori.OnVesi(p.Lat, p.Lon)) continue;
                    var q = Matkakirja.Linssit.Iss.IssNyt.Paikka(t.AddSeconds(30));
                    if (!Yokuori.OnVesi(q.Lat, q.Lon)) continue;
                    loyto = t;
                }
                if (loyto == null) return "ei heijastushetkeä 35 vrk:n sisällä";
                siirto = loyto.Value.AddSeconds(-8) - nyt;   // seuranta on yhden napautuksen (~6 s) päässä
            }
            else if (arvo == "paiva-eurooppa")
            {
                // Päivä Euroopan yllä (lat 40–60, lon −10…30, aurinko alapisteessä yli 20°): päivän pilvet ja kuukauden pinta.
                var nyt = DateTime.UtcNow;
                var loyto = HaeKyydinHetki(nyt, 72, 20, (t, lat, lon) => lat >= 40 && lat <= 60 && lon >= -10 && lon <= 30
                                && AurinkoKorkeus(t, lat, lon) > 20);
                if (loyto == null) return "ei päiväylitystä Euroopan yllä 72 tunnin sisällä";
                siirto = loyto.Value.AddSeconds(30) - nyt;
            }
            else return "käyttö: astro kyyti kello yo-eurooppa|hamara|kiilto|paiva-eurooppa|+H|pois";
            Matkakirja.Linssit.Iss.IssNyt.Simu.AsetaSiirto(siirto);
            var k = Matkakirja.Linssit.Iss.IssNyt.Kello();
            var paikka = Matkakirja.Linssit.Iss.IssNyt.Paikka(k);
            return $"{k:yyyy-MM-dd HH:mm:ss} UTC (siirto {siirto.TotalHours:F2} h), ISS ({paikka.Lat:F2}, {paikka.Lon:F2}), " +
                   $"aurinko alapisteessä {AurinkoKorkeus(k, paikka.Lat, paikka.Lon):F1}°";
        }

        /// <summary>Testikomento astro kyyti nopeus: porras 1 (Palaa LIVE, pehmeä kelaus), 10, 100 tai 1000.</summary>
        static string KyydinNopeus(Matkakirja.Linssit.Astronautti.AstronauttiLinssi l, string arvo) =>
            int.TryParse(arvo, out int k) && l.AsetaNopeus(k) ? (k == 1 ? "Palaa LIVE" : k + "×") : "käyttö: astro kyyti nopeus 1|10|100|1000";

        /// <summary>
        /// Testikomento astro kyyti kohde &lt;tunnus&gt; [valoisa] (webin "Lennä kohteen ylle"): seuraava ylilento SGP4:llä
        /// (valoisa: aurinko kohteessa yli 10°), kelaus sinne noin 1000×:llä ja perillä katse kohteeseen. Vain kyydissä.
        /// </summary>
        static string KyydinKohde(Matkakirja.Linssit.Astronautti.AstronauttiLinssi l, string tunnus, bool valoisa)
        {
            if (!l.Kyydissa) return "ei kyydissä (ensin astro kyyti)";
            if (l.YlilennonKohteet.All(x => x.Tunnus != tunnus))
                return $"tuntematon kohde {tunnus}; kohteet: " + string.Join(" ", l.YlilennonKohteet.Select(x => x.Tunnus));
            var y = l.LennaKohteeseen(tunnus, valoisa);
            return y.HasValue ? $"{tunnus}{(valoisa ? " (valoisa)" : "")}: {y.Value}; {l.YlilennonRivi()}" : l.YlilennonRivi() ?? "ei ylilentoa";
        }

        /// <summary>Kyydin simuloitu aika ja ylilento (astro kyyti tila): kello, nopeus, kohde ja pillerin alla näkyvä rivi.</summary>
        static string KyydinAikaTila(Matkakirja.Linssit.Astronautti.AstronauttiLinssi l)
        {
            var lento = l.ViimeisinLento;
            string kohde = lento == null ? "ei kohdetta"
                : $"kohde {lento.Value.Kohde.Tunnus}" + (lento.Value.Hetki.HasValue ? $", ylilento {lento.Value.Hetki.Value}" : ", ei ylilentoa")
                  + (lento.Value.Perilla ? ", perillä" : "");
            return $"{Matkakirja.Linssit.Iss.IssNyt.Simu}; {kohde}; rivi: {l.YlilennonRivi() ?? "-"}";
        }

        /// <summary>Ikkunan katsekohde ISS:n hetkellä t (IssKuvakulma.Ikkuna).</summary>
        static Matkakirja.Linssit.Kuvakulma IkkunanKatse(DateTime t)
        {
            var p = Matkakirja.Linssit.Iss.IssNyt.Paikka(t);
            return Matkakirja.Linssit.Iss.IssKuvakulma.Ikkuna(new Matkakirja.Linssit.Iss.IssHetki(p,
                Matkakirja.Linssit.Iss.IssNyt.KorkeusKm(t) * 1000, Matkakirja.Linssit.Iss.IssNyt.Suuntima(t)));
        }

        /// <summary>Ensimmäinen hetki (askel s, enintään tunnit), jolloin ISS:n alapiste täyttää ehdon; null = ei löydy.</summary>
        static DateTime? HaeKyydinHetki(DateTime alku, double tunnit, int askel, Func<DateTime, double, double, bool> ehto)
        {
            for (int s = 0; s < tunnit * 3600; s += askel)
            {
                var t = alku.AddSeconds(s);
                var p = Matkakirja.Linssit.Iss.IssNyt.Paikka(t);
                if (ehto(t, p.Lat, p.Lon)) return t;
            }
            return null;
        }

        /// <summary>Auringon korkeus (asteina) maan pisteessä lat, lon hetkellä t.</summary>
        static double AurinkoKorkeus(DateTime t, double lat, double lon)
        {
            var aur = Aurinko.AurinkoEcef(t);
            double la = lat * Math.PI / 180, lo = lon * Math.PI / 180;
            double s = Math.Cos(la) * Math.Cos(lo) * aur.x + Math.Cos(la) * Math.Sin(lo) * aur.y + Math.Sin(la) * aur.z;
            return Math.Asin(Math.Max(-1, Math.Min(1, s))) * 180 / Math.PI;
        }

        internal void Kirjaa(string teksti)
        {
            using var _ = KirjaaMerkki.Auto();
            Debug.Log("MATKAKIRJA linssit: " + teksti);
            try { File.AppendAllText(lokiPolku, $"{Aika:F2} {teksti}\n"); } catch (IOException) { }
        }

        // ── Kerrokset ─────────────────────────────────────────────────────

        /// <summary>
        /// IKarttaKerrokset KarttaKerrokset-komponentin päälle. Kerroksen tila
        /// seurataan KerrosValmis- ja KerrosEpaonnistui-tapahtumista.
        /// KarttaKerrokset.Instanssi on null ennen kohtauksen latausta, joten
        /// tapahtumat kytketään ensimmäisellä kehyksellä, kun se on olemassa.
        /// </summary>
        sealed class KerrosSovitin : IKarttaKerrokset
        {
            readonly Dictionary<string, KerrosTila> tilat = new Dictionary<string, KerrosTila>();
            KarttaKerrokset kytketty;

            public void Kytke()
            {
                var k = KarttaKerrokset.Instanssi;
                if (k == kytketty) return;
                Irrota();
                kytketty = k;
                if (k == null) return;
                k.KerrosValmis += Valmis;
                k.KerrosEpaonnistui += Epaonnistui;
            }

            public void Irrota()
            {
                if (kytketty == null) return;
                kytketty.KerrosValmis -= Valmis;
                kytketty.KerrosEpaonnistui -= Epaonnistui;
                kytketty = null;
            }

            void Valmis(string avain) { if (tilat.ContainsKey(avain)) tilat[avain] = KerrosTila.Valmis; }
            void Epaonnistui(string avain) { if (tilat.ContainsKey(avain)) tilat[avain] = KerrosTila.Luovutti; }

            public void LisaaRasteri(string avain, Rasteri r)
            {
                Kytke();
                if (kytketty == null) { tilat[avain] = KerrosTila.Luovutti; return; }
                tilat[avain] = KerrosTila.Latautuu;
                kytketty.LisaaRasteri(avain, r.CesiumUrl,
                    r.Projektio == Projektio.Geographic
                        ? CesiumUrlTemplateRasterOverlayProjection.Geographic
                        : CesiumUrlTemplateRasterOverlayProjection.WebMercator,
                    r.MinTaso, r.MaxTaso, r.Alfa);
            }

            public void Poista(string avain)
            {
                tilat.Remove(avain);
                kytketty?.PoistaRasteri(avain);
            }

            public void Nakyvyys(string avain, bool nakyvissa) => KarttaKerrokset.Instanssi?.Nakyvyys(avain, nakyvissa);

            public KerrosTila Tila(string avain) =>
                tilat.TryGetValue(avain, out var t) ? t : KerrosTila.Luovutti;
        }
    }

    /// <summary>
    /// KEHYSJONO: raskas olioiden luonti (TextMeshPro-nimet) usealle kehykselle aikabudjetilla.
    /// Linssin avaus ei saa venyttää kehystä (tavoite ei yli 16 ms, ui piikit 24.9.: 64 nimeä yhdessä
    /// kehyksessä vei ~26 ms). Omistaja kutsuu Aja() joka kehys (LateUpdate); Tyhjenna() pudottaa
    /// odottavat työt, kun kerros puretaan tai sisältö vaihtuu.
    /// </summary>
    public sealed class Kehysjono
    {
        readonly Queue<Action> jono = new Queue<Action>();
        readonly System.Diagnostics.Stopwatch kello = new System.Diagnostics.Stopwatch();
        readonly double budjettiMs;
        public Kehysjono(double budjettiMs = 2) { this.budjettiMs = budjettiMs; }
        public int Odottaa => jono.Count;
        public void Lisaa(Action tyo) => jono.Enqueue(tyo);
        public void Tyhjenna() => jono.Clear();
        /// <summary>Ajaa töitä, kunnes budjetti täyttyy (vähintään yhden, jotta jono etenee aina).</summary>
        public void Aja()
        {
            if (jono.Count == 0) return;
            kello.Restart();
            do jono.Dequeue()(); while (jono.Count > 0 && kello.Elapsed.TotalMilliseconds < budjettiMs);
        }
    }
}
