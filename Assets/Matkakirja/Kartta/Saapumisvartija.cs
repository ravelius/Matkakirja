using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// VARTIJA 171 (omistajan löydös 171, P1, Natiiviseppä 26.9.2026; juurisyy ja päätökset <see cref="SaapumisKiire"/>):
    /// saapumisen kiire ja valvonta laskeutumisesta kohdemaan näkymän valmistumiseen. Istunto alkaa aloituslennon liu'usta
    /// (Nappula, odotus "lento") tai mistä tahansa saapumisajosta (PalloKierto.SaapuminenAlkaa, odotus "ajo"), ja päättyy, kun
    /// odotuksia ei ole, kamera on levossa ja pallon valmiusehto täyttyy (ValmiusEhto) kohdemaan näkymässä — tai
    /// katossa <see cref="SaapumisKiire.KattoS"/> s viimeisestä alusta.
    ///
    /// Istunnon ajan, kun korjaus on päällä (<see cref="Paalla"/>): Laattapalvelimen saapumistila (näkyvä jono 24 rinnakkain,
    /// muu esilataus ja tausta tauolla, pohjan varalaattojen uudelleenlataus seis) ja täysi ruudunpäivitys (Ruudunpaivitys.Aktiivinen:
    /// lepotilan 30 fps puolitti Cesiumin pääsäikeen latauskierrokset).
    ///
    /// Mittaus on aina päällä (A/B): rivit "MATKAKIRJA VARTIJA 171: …" alussa, kohdemaan paljastuksessa (<see cref="Paljastus"/>,
    /// aloituslennon saapumiskortin jälkeen: aste, valmis / kesken / EI VALMIS, palvelimen jonot) ja lopussa; lisäksi valmius-
    /// seuranta, jos valmius auto on päällä. Komento `saapuminen vartija paalle|pois|tila` (Komennot).
    /// </summary>
    [DefaultExecutionOrder(-900)]
    public sealed class Saapumisvartija : MonoBehaviour
    {
        /// <summary>Kehittäjälippu A/B: PlayerPrefs "matkakirja-saapumisvartija" 0 tai Documents/saapumisvartija-pois.txt = korjaus pois.</summary>
        public const string LippuAvain = "matkakirja-saapumisvartija";
        public const string PoisTiedosto = "saapumisvartija-pois.txt";

        static Saapumisvartija instanssi;
        static int lippu = -1;

        static bool aktiivinen;
        static readonly HashSet<string> odotukset = new HashSet<string>();
        static readonly ValmiusEhto ehto = new ValmiusEhto();
        static Laattapalvelin.Esilataus lataus;
        static string syy;
        static float alku, viimeAlku;
        /// <summary>Viimeisin istunto päättyi valmiusehtoon (ei kattoon).</summary>
        static bool viimeValmis;
        static string viimeTulos = "-";

        /// <summary>Paljastuksia (aloituslennon kortti) ja niistä ennen valmiusehtoa tapahtuneita (vaalean kohdemaan riski).</summary>
        public static int Paljastuksia { get; private set; }
        public static int EiValmiina { get; private set; }

        /// <summary>Istunto käynnissä (mittaus); kiire ja täysi piirto vain, kun lisäksi <see cref="Paalla"/>.</summary>
        public static bool Kaynnissa => aktiivinen;

        /// <summary>
        /// Korjaus päällä (oletus). Pois = aloituslento ei esilataa kohdemaan näkymää, ei hidastu eikä saapumistilaa ole
        /// (mittausrivit kirjataan silti). App Store -käännöksessä aina päällä.
        /// </summary>
        public static bool Paalla
        {
            get
            {
#if MATKAKIRJA_APPSTORE
                return true;
#else
                if (lippu < 0)
                {
                    lippu = PlayerPrefs.GetInt(LippuAvain, 1) != 0 ? 1 : 0;
                    try { if (System.IO.File.Exists(System.IO.Path.Combine(Application.persistentDataPath, PoisTiedosto))) lippu = 0; }
                    catch (System.Exception) { /* valinnainen */ }
                    Debug.Log($"MATKAKIRJA VARTIJA 171: korjaus {(lippu != 0 ? "päällä" : "POIS (kehittäjälippu)")}");
                }
                return lippu != 0;
#endif
            }
            set
            {
                lippu = value ? 1 : 0;
                PlayerPrefs.SetInt(LippuAvain, lippu);
                PlayerPrefs.Save();
                try
                {
                    string f = System.IO.Path.Combine(Application.persistentDataPath, PoisTiedosto);
                    if (value && System.IO.File.Exists(f)) System.IO.File.Move(f, f + ".kaytetty");
                }
                catch (System.Exception) { /* valinnainen */ }
                if (!value) Laattapalvelin.AsetaSaapumistila("vartija", false);
                else if (aktiivinen) Laattapalvelin.AsetaSaapumistila("vartija", true);
            }
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            instanssi = null; lippu = -1; aktiivinen = false; odotukset.Clear(); ehto.Nollaa(); lataus = null; syy = null;
            viimeValmis = false; viimeTulos = "-"; Paljastuksia = EiValmiina = 0;
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (instanssi != null) return;
            var go = new GameObject("Saapumisvartija");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<Saapumisvartija>();
            // Täysi ruudunpäivitys istunnon ajan (korjaus päällä): Cesium etenee pääsäikeessä kehys kerrallaan.
            Ruudunpaivitys.Aktiivinen.Add(() => aktiivinen && Paalla);
            // Jokainen saapumisajo (aloituslennon kortin alla, käynnistyksen jatko, matkat, elävän kartan maanäkymä).
            PalloKierto.SaapuminenAlkaa += (maa, s) => Aloita("saapuminen " + (maa ?? "-"), "ajo");
            PalloKierto.SaapuminenPaattyi += (maa, keskeytetty) => Vapauta("ajo");
        }

        /// <summary>
        /// Saapuminen alkaa tai jatkuu: odotus (esim. "lento", "ajo") pitää istunnon auki, kunnes <see cref="Vapauta"/>.
        /// <paramref name="esilataus"/> = kohdemaan näkymän esilataus (KarttaKerrokset.EsilataaSaapumisalue, kiire): sen tila
        /// kirjataan riveille (valmiuteen riittää pallon valmiusehto).
        /// </summary>
        public static void Aloita(string nimi, string odotus, Laattapalvelin.Esilataus esilataus = null)
        {
            float nyt = Time.realtimeSinceStartup;
            if (!string.IsNullOrEmpty(odotus)) odotukset.Add(odotus);
            if (esilataus != null) lataus = esilataus;
            viimeAlku = nyt;
            ehto.Nollaa();
            if (aktiivinen) { syy = syy + " + " + nimi; return; }
            aktiivinen = true;
            syy = nimi;
            alku = nyt;
            viimeValmis = false;
            if (Paalla) Laattapalvelin.AsetaSaapumistila("vartija", true);
            if (Valmius.AutoS > 0f) Valmius.Seuraa("saapuminen", Mathf.Max(Valmius.AutoS, 20f));
            Debug.Log($"MATKAKIRJA VARTIJA 171: {nimi} alkaa (korjaus {(Paalla ? "päällä" : "pois")}), " + Tila());
            PyyntoLoki.Merkki($"vartija171 alkaa {nimi}");
        }

        /// <summary>Odotus päättyi (lento purettu, kamera-ajo perillä): valmiusehto alkaa alusta.</summary>
        public static void Vapauta(string odotus)
        {
            if (!aktiivinen || !odotukset.Remove(odotus)) return;
            ehto.Nollaa();
            PyyntoLoki.Merkki($"vartija171 {odotus} ohi");
        }

        /// <summary>
        /// Kohdemaa paljastuu (aloituslennon saapumiskortti häipyy; SaapumisLaatatSilta: PeliOhjain.AloituslentoPaattyi):
        /// rivi "MATKAKIRJA VARTIJA 171: paljastus &lt;syy&gt; valmis|kesken|EI VALMIS aste …". EI VALMIS = aste alle
        /// ValmiusEhto.Raja: kohdemaan laattoja puuttuu paljastuksen hetkellä (vaalean laatan riski).
        /// </summary>
        public static void Paljastus(string nimi)
        {
            Paljastuksia++;
            var pallo = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pallo : null;
            float aste = pallo != null ? pallo.ComputeLoadProgress() : -1f;
            bool valmis = !aktiivinen && viimeValmis;
            string luokka = SaapumisKiire.Paljastus(valmis, aste);
            if (luokka == "EI VALMIS") EiValmiina++;
            PyyntoLoki.Merkki($"vartija171 paljastus {nimi} {luokka} aste {Aste(aste)}");
            Debug.Log($"MATKAKIRJA VARTIJA 171: paljastus {nimi} {luokka} aste {Aste(aste)} %" +
                      (aktiivinen ? $", istunto kesken {Time.realtimeSinceStartup - alku:0.0} s" : $", istunto {viimeTulos}") +
                      $" (#{Paljastuksia}, ei valmiina {EiValmiina}), " + Tila());
        }

        void Update()
        {
            if (!aktiivinen) return;
            float nyt = Time.realtimeSinceStartup;
            var kk = KarttaKerrokset.Instanssi;
            var pallo = kk != null ? kk.pallo : null;
            var kierto = kk != null && kk.nappula != null ? kk.nappula.kierto : null;
            bool liikkuu = (kierto != null && kierto.Liikkeessa) || (kk != null && kk.nappula != null && kk.nappula.Liikkeessa);
            if (liikkuu || odotukset.Count > 0) ehto.Nollaa();
            bool pallovalmis = !liikkuu && odotukset.Count == 0 && (pallo == null || Valmius.Tasaantunut(ehto, pallo));
            if (SaapumisKiire.Valmis(odotukset.Count, liikkuu, pallovalmis)) Lopeta("valmis");
            else if (nyt - viimeAlku > SaapumisKiire.KattoS) Lopeta("katto (odotukset " + (odotukset.Count > 0 ? string.Join(",", odotukset) : "-") + ")");
        }

        static void Lopeta(string tulos)
        {
            float nyt = Time.realtimeSinceStartup;
            aktiivinen = false;
            viimeValmis = tulos == "valmis";
            viimeTulos = $"{tulos} {(nyt - alku):0.0} s";
            Laattapalvelin.AsetaSaapumistila("vartija", false);
            Debug.Log($"MATKAKIRJA VARTIJA 171: {syy} {tulos} {(nyt - alku) * 1000:0} ms, " + Tila());
            PyyntoLoki.Merkki($"vartija171 {tulos} {(nyt - alku) * 1000:0} ms");
            odotukset.Clear();
            lataus = null;
            syy = null;
        }

        /// <summary>Tila lokiin: pallon aste, kohdemaan esilataus ja palvelimen jonot.</summary>
        public static string Tila()
        {
            var pallo = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pallo : null;
            string l = lataus == null ? "-" : $"{lataus.Valmis}+{lataus.Epaonnistui}/{lataus.Yhteensa}{(lataus.Peruttu ? " peruttu" : "")}";
            return $"aste {Aste(pallo != null ? pallo.ComputeLoadProgress() : -1f)} %, kohdemaa {l}, palvelin {Laattapalvelin.JonoTila()}";
        }

        /// <summary>Komento `saapuminen vartija tila`.</summary>
        public static string Kuvaus() =>
            $"MATKAKIRJA VARTIJA 171: korjaus {(Paalla ? "päällä" : "pois")}, istunto {(aktiivinen ? syy + " (odotukset " + string.Join(",", odotukset) + ")" : "ei")}, " +
            $"viimeisin {viimeTulos}, paljastuksia {Paljastuksia} (ei valmiina {EiValmiina}), " + Tila();

        static string Aste(float a) => a < 0 ? "-" : a.ToString("0.0");
    }
}
