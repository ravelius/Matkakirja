// DIORAAMAN TIMELINE (docs/raportit/linna-unity-suunnitelma-20261005.md kohta 2b, Siirtoseppä 5.10.2026): kertojan esittely
// (Ytimen kertojan kierros) Unityn Timelinella. TimelineAsset ja PlayableDirector rakennetaan AJON AIKANA datasta
// (rakennus.Kertoja, ei assetteja: linna on ämpärin dataa), aikataulu luetaan Ytimestä (PoikkileikkausLinssi.KertojanAikataulu:
// sama lento + JaksonKesto + napautukset kuin Kierros-metodissa; Ytimen laskentaa ei muuteta).
//
// KELLO: kun kierros soi, PlayableDirector (UnscaledGameTime) on esittelyn ainoa kello: DioraamaSovitin.Paivita syöttää
// Ytimelle t = kierroksen alku + director.time (Kello) ja siirtää seinäkellon (y.Aika) siirtymän tähän, jottei aika hyppää
// kierroksen loputtua. Raidat:
//  - Kamera: JaksoKlippi per jakso (lennon alusta jakson loppuun) + paluu (−1). Ennen Cinemachinea raita kertoo vain jakson
//    indeksin; Ydin ja DioraamaKameraJousi laskevat asennon kuten ennen. Cinemachinen tultua tilalle CinemachineTrack.
//  - Kertoja: KertojaKlippi tekstin noususta (lennon 60 %) jakson loppuun. Klipin alku kutsuu DioraamaAanet-reittiä
//    (TimelineJakso → KertojanJaksoVaihtuu → SoitaErillinen), joten yksi puhe kerrallaan, väistö, puheLoppuu, latausodotus
//    ja PuheenKohta pysyvät yhdessä paikassa. Ei AudioTrackia.
//  - Avainsanat: AvainsanaKlippi kertoja.jaksot[].avainsanat[].t_s:stä (tekstin alusta). Näkymä on yhä
//    DioraamaTaulu.PaivitaAvainsana (PuheenKohdan mukaan); raita on aikataulun dokumentti ja mittari (lokiin ero puheesta).
// NAPAUTUS: Ydin päättää jakson napautushetkeen (Napauta, kuten ennen) ja seuraava lento alkaa heti. Aikataulun muutos
// rakentaa assetin uudelleen: seuraavan jakson klipit siirtyvät napautushetkeen ja director.time asetetaan seuraavan jakson
// (uuteen) alkuun eli nykyhetkeen. Sama vaikutus kuin ennen, koska molemmat lukevat samaa Ytimen aikataulua.
// KYTKIN: "poikki timeline 0|1" (Paalla). Oletus POIS, kunnes simun A/B-todennus (raportti) on tehty: ilman sitä esittely
// kulkee täsmälleen ennallaan (Ytimen jaksovertailu DioraamaAanet.Paivitassa, seinäkello).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Playables;
using UnityEngine.Timeline;
using Object = UnityEngine.Object;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaTimeline
    {
        /// <summary>"poikki timeline 0|1" (kehittäjä; säilyy avausten yli). Oletus päällä (5.10.).</summary>
        public static bool Paalla = true; // Päätoimittaja 5.10. 06.0x: oletus päälle junaan 143 (A/B: ero ≤ 1 ms Ytimeen, napautus identtinen)
        /// <summary>Käynnissä olevan kertojan kierroksen alku Ytimen ajassa, NaN kun kierros ei ole käynnissä. Päivittyy joka
        /// ruutu kytkimestä riippumatta, jotta lokien kierrosaika (A/B-vertailu) on sama molemmissa tiloissa.</summary>
        public static double KierrosAlku { get; private set; } = double.NaN;
        /// <summary>Soiko timeline: silloin kertojan jaksot alkavat ja loppuvat KertojaKlipeistä, eivät DioraamaAanet.Paivitan
        /// Ytimen jaksovertailusta.</summary>
        public static bool OhjaaKertojaa => aktiivinen != null && aktiivinen.Soi;
        static DioraamaTimeline aktiivinen;

        GameObject go;
        PlayableDirector director;
        TimelineAsset asset;
        /// <summary>Kasvaa joka rakennuksella ja pysäytyksellä: vanhan graafin OnBehaviourPause/OnPlayableDestroy eivät
        /// koske kertojaan (uudelleenrakennuksen jälkeinen tila täsmäytetään erikseen, ks. Rakenna).</summary>
        internal int Sukupolvi { get; private set; }
        double alku = double.NaN, loppu;
        int ohituksia;
        readonly List<double> alut = new List<double>(), lennot = new List<double>(), loput = new List<double>();
        readonly List<double> uAlut = new List<double>(), uLennot = new List<double>(), uLoput = new List<double>();
        /// <summary>Kamera-raidan viimeksi alkanut jakso (−1 = paluulento, −2 = ei klippiä); Tarkista vertaa Ytimeen.</summary>
        internal int KameraJakso = -2;
        int poikkeamaKehyksia;
        double vahtiAika = double.NaN;
        int vahtiRuudut;

        public bool Soi => director != null && asset != null && director.playableAsset == asset && director.state == PlayState.Playing;
        /// <summary>Kierroksen alku (Ytimen aika), jonka mukaan director.time muunnetaan Ytimen ajaksi.</summary>
        internal double Alku => alku;
        internal double DirectorAika => director != null ? director.time : 0;

        /// <summary>Ytimen aika: soivan timelinen kello (alku + director.time), muuten annettu seinäkellon aika.</summary>
        public double Kello(double t) => Soi ? alku + director.time : t;

        internal static string S(double x) => double.IsNaN(x) ? "-" : x.ToString("F3", CultureInfo.InvariantCulture);

        /// <summary>Joka ruutu (DioraamaSovitin.Paivita, kohdistusten jälkeen ja ennen NakymaHetkellaa): aloittaa, rakentaa
        /// uudelleen (napautus, uusinta, asennon vaihto) tai pysäyttää timelinen Ytimen aikataulun mukaan.</summary>
        public void Paivita(PoikkileikkausLinssi linssi, Rakennus rak, double t, bool pysty, bool jaadytetty)
        {
            aktiivinen = this;
            bool kaynnissa = linssi.KertojanAikataulu(t, pysty, uAlut, uLennot, uLoput, out double a, out double l, out int oh);
            KierrosAlku = kaynnissa ? a : double.NaN;
            if (!kaynnissa || !Paalla || jaadytetty)
            {
                if (asset != null) Lopeta(!kaynnissa ? "kierros päättyi t=" + S(t) : jaadytetty ? "aika jäädytetty" : "kytkin pois");
                return;
            }
            bool sama = asset != null && a == alku && Math.Abs(l - loppu) < 1e-6 && Samat(alut, uAlut) && Samat(lennot, uLennot) && Samat(loput, uLoput);
            if (sama && Soi)
            {
                // Vahti: jos director ei etene (pysäytetty muualta, GameObject pois päältä), Ytimen kello jäätyisi kesken
                // kierroksen. 30 ruutua samaa aikaa → kytkin pois ja paluu seinäkelloon (Ytimen jaksovertailu jatkaa).
                if (director.time != vahtiAika) { vahtiAika = director.time; vahtiRuudut = 0; return; }
                if (Time.unscaledDeltaTime <= 0f || ++vahtiRuudut < 30) return;
                Paalla = false;
                Lopeta($"director ei edennyt 30 ruutuun (director.time {S(director.time)}), kytkin pois");
                return;
            }
            string syy;
            if (asset == null) syy = "alkaa";
            else if (sama) syy = "jatkuu (director ei soinut)";
            else if (a != alku) syy = "uusinta";
            else if (oh > ohituksia)
            {
                // Ohitettu jakso: ensimmäinen, jonka loppu aikaistui napautuksen vuoksi.
                int j = 0;
                while (j < uLoput.Count && j < loput.Count && uLoput[j] >= loput[j] - 1e-6) j++;
                syy = "ohitus";
                // Ydin päätti jakson napautushetkeen ja seuraava lento alkaa siitä: seuraavan jakson (uusi) alku on napautushetki,
                // jonka jälkeen kello on jo ehtinyt enintään ruudun verran (director.time = nykyhetki, ei taaksepäin).
                Debug.Log($"MATKAKIRJA linssit: poikki: timeline ohitus: jakso {j} päättyy t={S(j < uLoput.Count ? uLoput[j] : t)}, " +
                          $"seuraava {(j + 1 < uAlut.Count ? "jakso " + (j + 1) : "paluu")} alkaa kierroksen kohdassa {S((j < uLoput.Count ? uLoput[j] : t) - a)} s, " +
                          $"director.time → {S(t - a)}");
            }
            else syy = "aikataulu muuttui (asento tai kuvasuhde)";
            alut.Clear(); alut.AddRange(uAlut);
            lennot.Clear(); lennot.AddRange(uLennot);
            loput.Clear(); loput.AddRange(uLoput);
            alku = a; loppu = l; ohituksia = oh;
            Rakenna(rak, t - a, syy);
        }

        static bool Samat(List<double> x, List<double> y)
        {
            if (x.Count != y.Count) return false;
            for (int i = 0; i < x.Count; i++) if (Math.Abs(x[i] - y[i]) > 1e-6) return false;
            return true;
        }

        void Rakenna(Rakennus rak, double tau, string syy)
        {
            Sukupolvi++;
            if (director != null) director.Stop();
            PoistaAsset();
            if (go == null)
            {
                go = new GameObject("DioraamaTimeline");
                director = go.AddComponent<PlayableDirector>();
                director.playOnAwake = false;
                director.timeUpdateMode = DirectorUpdateMode.UnscaledGameTime;
                // Hold: loppuun tultua aika jää paluulennon loppuun; Paivita pysäyttää heti, kun Ydin sanoo kierroksen päättyneen.
                director.extrapolationMode = DirectorWrapMode.Hold;
            }
            asset = ScriptableObject.CreateInstance<TimelineAsset>();
            asset.name = "Kertojan kierros " + (rak?.Nimi ?? "");
            // Kiinteä pituus paluulennon yli (+0,5 s): Ydin päättää kierroksen (KertojanAikataulu → false) ennen kuin director
            // pysähtyy Hold-tilaan, joten pyöristys (alku + kesto ≠ loppu) ei voi jäädyttää kelloa juuri ennen loppua.
            asset.durationMode = TimelineAsset.DurationMode.FixedLength;
            asset.fixedDuration = loppu - alku + 0.5;
            var kamera = asset.CreateTrack<PlayableTrack>(null, "Kamera (jakso)");
            var kertoja = asset.CreateTrack<PlayableTrack>(null, "Kertoja");
            var sanat = asset.CreateTrack<PlayableTrack>(null, "Avainsanat");
            int klippeja = 0;
            for (int j = 0; j < alut.Count; j++)
            {
                double jAlku = alut[j] - alku, jLoppu = loput[j] - alku;
                var jakso = Klippi<JaksoKlippi>(kamera, jAlku, jLoppu - jAlku, "jakso " + j);
                if (jakso != null) { jakso.Jakso = j; jakso.Omistaja = this; jakso.Sukupolvi = Sukupolvi; klippeja++; }
                // Teksti ja puhe nousevat lennon KertojaTekstiOsuus-kohdassa (Ytimen Kierros: u ≥ 0,6), jakson loppuun.
                double teksti = jAlku + PoikkileikkausLinssi.KertojaTekstiOsuus * lennot[j];
                var kj = rak != null && j < rak.Kertoja.Count ? rak.Kertoja[j] : null;
                var puhe = Klippi<KertojaKlippi>(kertoja, teksti, jLoppu - teksti, "kertoja " + j);
                if (puhe == null) continue;
                puhe.Jakso = j; puhe.Aani = kj?.Aani; puhe.Omistaja = this; puhe.Sukupolvi = Sukupolvi; klippeja++;
                if (kj == null) continue;
                for (int k = 0; k < kj.Avainsanat.Count; k++)
                {
                    var av = kj.Avainsanat[k];
                    double s = teksti + av.Ts;
                    var sana = Klippi<AvainsanaKlippi>(sanat, s, Math.Min(DioraamaTaulu.AvainsanaS, jLoppu - s), $"avainsana {j}.{k}");
                    if (sana == null) continue;
                    sana.Jakso = j; sana.Indeksi = k; sana.Ts = av.Ts; sana.Aani = kj.Aani; sana.Sanat = ((av.Vuosi ?? "") + " " + (av.Sanat ?? "")).Trim();
                    sana.Omistaja = this; sana.Sukupolvi = Sukupolvi; klippeja++;
                }
            }
            double paluuAlku = (loput.Count > 0 ? loput[loput.Count - 1] : alku) - alku;
            var paluu = Klippi<JaksoKlippi>(kamera, paluuAlku, loppu - alku - paluuAlku, "paluu");
            if (paluu != null) { paluu.Jakso = -1; paluu.Omistaja = this; paluu.Sukupolvi = Sukupolvi; klippeja++; }

            KameraJakso = -2; poikkeamaKehyksia = 0; vahtiAika = double.NaN; vahtiRuudut = 0;
            director.playableAsset = asset;
            director.RebuildGraph();
            director.time = tau;
            director.Play();
            director.time = tau;
            Debug.Log($"MATKAKIRJA linssit: poikki: timeline {syy}: {alut.Count} jaksoa, {klippeja} klippiä, kesto {S(loppu - alku)} s, " +
                      $"director.time {S(tau)} (kierros alkoi t={S(alku)}), sukupolvi {Sukupolvi}");
            // Täsmäytys: vanhan graafin klippien loppukutsut ohitettiin (sukupolvi), joten kertojan tila asetetaan uuden
            // aikataulun mukaan heti (napautus: ohitettu puhe loppuu samassa ruudussa kuin ennen). Saman jakson jatkuessa
            // (asennon vaihto) tämä ei tee mitään, eikä myöhemmin tuleva OnBehaviourPlay aloita puhetta uudelleen.
            DioraamaAanet.TimelineJakso(KertojanJaksoHetkella(tau), alku + tau, "timeline " + syy);
        }

        /// <summary>Kertojan jakso, jonka puheklippi on aktiivinen kierroksen ajassa tau (−1 = ei mitään); sama ehto kuin
        /// Timelinen klipeillä (alku ≤ tau &lt; loppu) ja Ytimen tekstillä.</summary>
        int KertojanJaksoHetkella(double tau)
        {
            for (int j = 0; j < alut.Count; j++)
            {
                double teksti = alut[j] - alku + PoikkileikkausLinssi.KertojaTekstiOsuus * lennot[j], jLoppu = loput[j] - alku;
                if (jLoppu - teksti > KlippiMin && tau >= teksti && tau < jLoppu) return j;
            }
            return -1;
        }

        const double KlippiMin = 1e-4;

        static T Klippi<T>(TrackAsset raita, double alku, double kesto, string nimi) where T : PlayableAsset
        {
            if (kesto <= KlippiMin) return null; // napautus ennen tekstiä tai kahden napautuksen nollajakso: ei klippiä
            var c = raita.CreateClip<T>();
            c.start = alku;
            c.duration = kesto;
            c.displayName = nimi;
            return c.asset as T;
        }

        /// <summary>Ydin vs. kamera-raita (DioraamaSovitin, NakymaHetkellan jälkeen): kertojan jakson pitää olla sama. Kolmen
        /// ruudun armo (rakennuksen jälkeen uusi graafi arvioidaan vasta directorin seuraavassa päivityksessä).</summary>
        public void Tarkista(int ydinJakso, double t)
        {
            if (!Soi) { poikkeamaKehyksia = 0; return; }
            if (KameraJakso == ydinJakso) { poikkeamaKehyksia = 0; return; }
            if (++poikkeamaKehyksia == 3)
                Debug.Log($"MATKAKIRJA linssit: poikki: timeline POIKKEAA Ytimestä: kamera-raita jakso {KameraJakso}, Ydin {ydinJakso}, " +
                          $"t={S(t)}, director.time {S(DirectorAika)}");
        }

        void Lopeta(string syy)
        {
            Sukupolvi++;
            if (director != null) director.Stop();
            PoistaAsset();
            Debug.Log($"MATKAKIRJA linssit: poikki: timeline pysähtyi ({syy}), kertoja palaa Ytimen jaksovertailuun");
            alku = double.NaN; loppu = 0; ohituksia = 0;
            alut.Clear(); lennot.Clear(); loput.Clear();
            KameraJakso = -2; poikkeamaKehyksia = 0;
        }

        void PoistaAsset()
        {
            if (asset == null) return;
            if (director != null && director.playableAsset == asset) director.playableAsset = null;
            foreach (var raita in asset.GetOutputTracks())
            {
                foreach (var c in raita.GetClips()) if (c.asset != null) Object.Destroy(c.asset);
                Object.Destroy(raita);
            }
            Object.Destroy(asset);
            asset = null;
        }

        /// <summary>Linssi sulkeutuu (DioraamaSovitin.Sulje): timeline pois ja directorin GameObject tuhotaan.</summary>
        public void Tuhoa()
        {
            if (asset != null) Lopeta("linssi suljettu");
            if (go != null) Object.Destroy(go);
            go = null; director = null;
            KierrosAlku = double.NaN;
            if (aktiivinen == this) aktiivinen = null;
        }

        /// <summary>"poikki timeline": kytkin, tila ja aikataulu lokiin (kierroksen ajassa, s).</summary>
        public string Raportti()
        {
            var sb = new StringBuilder();
            sb.Append(Paalla ? "päällä" : "pois (oletus; Ytimen jaksovertailu ja seinäkello)");
            sb.Append(Soi ? $", soi: director.time {S(DirectorAika)}, kierros alkoi t={S(alku)}, kesto {S(loppu - alku)} s, ohituksia {ohituksia}, kamera-raidan jakso {KameraJakso}"
                          : ", ei soi");
            for (int j = 0; j < alut.Count; j++)
                sb.Append($"; jakso {j}: lento {S(alut[j] - alku)}, kertoja {S(alut[j] - alku + PoikkileikkausLinssi.KertojaTekstiOsuus * lennot[j])}, loppu {S(loput[j] - alku)}");
            return sb.ToString();
        }
    }
}
