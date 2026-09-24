// ASETUKSET: pelaajan ääni- ja karttavalinnat (Natiivi-UI, 23.9.2026).
//
// Samat valinnat ja oletukset kuin verkkopelissä, samoilla avaimilla
// (localStorage → PlayerPrefs), jotta vientityökalut ja muistiinpanot pätevät:
//   päävalikko (hampurilainen), js/main.js AANIKYTKIMET ja kartan kytkin:
//     Kertoja      matkakirja-kertoja      "ei" = pois       oletus päällä
//     Musiikki     matkakirja-musiikki     "0"/"1"           oletus päällä
//     Äänimaisema  matkakirja-aanimaisema  "0"/"1"           oletus päällä (myös koko pelin mykistys; webissä sound.js:n tila, avain natiivin oma)
//     Pieni liike  matkakirja-kartan-liike "0"/"1"           oletus päällä
//   ratas "Äänentasot", js/main.js AANIVOIMAT + js/kehittajan-voimat.js
//   (avain matkakirja-dev-voima-<laji>, 0…1, tallennetaan vain oletuksesta poikkeava):
//     tehosteet 1,0 · pulu 1,0 · lukija 0,9 · musiikki 0,35 · tausta 1,0
// Äänimoottori ja kartta lukevat arvot täältä ja kuuntelevat Muuttui-tapahtumaa.
using System;
using System.Collections.Generic;
using System.Globalization;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public enum Kytkin { Kertoja, Musiikki, Aanimaisema, PieniLiike }
    public enum Voima { Tehosteet, Pulu, Lukija, Musiikki, Tausta }

    public static class Asetukset
    {
        /// <summary>Jokin asetus muuttui (kytkimen tai voiman nimi).</summary>
        public static event Action<string> Muuttui;

        // --- kehittäjätila (webin js/main.js kytkeKehittaja) ------------------------------
        // Koodit vain SHA-256-tiivisteinä kuten webissä (sama pää- ja rajattu koodi).
        // Kehitysbuildissa (Development Build) päällä aina; muuten koodilla, muistetaan.
        const string KehittajaAvain = "matkakirja-kehittaja";
        const string KehittajaTiiviste = "2f7f15d0bb83b97a7ce3054be0972e80b60742cfc8b4c36ce06f3330f6f045c6";
        const string KehittajaTiivisteRajattu = "b3282a2f2a28757b3a18ab833de16a9c54518c0b0cf493e3f0a7cf09386f326a";

        /// <summary>
        /// Kehittäjätila. App Store -käännöksessä (määrite MATKAKIRJA_APPSTORE, Rakennus.IosTestFlight) aina pois
        /// eikä koodilla kytkettävissä (Fable 24.9.: portti build-määrityksestä, ei vain kytkimestä). Sisäisessä
        /// TestFlightissä (release, ei määritettä) oletuksena pois ja koodilla päälle kuten webissä.
        /// </summary>
#if MATKAKIRJA_APPSTORE
        public static bool Kehittaja => false;
#else
        public static bool Kehittaja => Debug.isDebugBuild || PlayerPrefs.GetString(KehittajaAvain, "") == "1";
#endif

        /// <summary>
        /// Pöllön kehittäjäkoodi chatin x-pollo-kehittaja-otsakkeeseen (Fable 24.9.: ei koskaan kovakoodattuna eikä
        /// PlayerPrefsissä). Omistaja syöttää sen kerran kehittäjätilan kytkennässä; arvo säilyy vain iOS Keychainissa
        /// (MatkakirjaAvaimet, kuten Lukijoilta-avain). Editorissa vain muistissa. App Store -käännöksessä aina null.
        /// </summary>
        public static string PolloKoodi
        {
            get
            {
#if MATKAKIRJA_APPSTORE
                return null;
#else
                if (!polloKoodiLuettu)
                {
                    polloKoodiLuettu = true;
#if UNITY_IOS && !UNITY_EDITOR
                    polloKoodi = MatkakirjaAvaimet_Hae(PolloKeychain);
#endif
                }
                return string.IsNullOrEmpty(polloKoodi) ? null : polloKoodi;
#endif
            }
        }

#if !MATKAKIRJA_APPSTORE
        const string PolloKeychain = "pollo-kehittajakoodi";
        static string polloKoodi;
        static bool polloKoodiLuettu;
#if UNITY_IOS && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern int MatkakirjaAvaimet_Aseta(string nimi, string arvo);
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern string MatkakirjaAvaimet_Hae(string nimi);
#endif

        static void TalletaPolloKoodi(string koodi)
        {
            polloKoodi = string.IsNullOrEmpty(koodi) ? null : koodi;
            polloKoodiLuettu = true;
#if UNITY_IOS && !UNITY_EDITOR
            if (MatkakirjaAvaimet_Aseta(PolloKeychain, polloKoodi) != 1)
                Debug.LogWarning("MATKAKIRJA asetukset: avainnippuun kirjoitus ei onnistunut (pöllön koodi vain muistissa)");
#endif
        }
#endif

        /// <summary>Kytkee kehittäjätilan koodilla (true = onnistui) tai pois (koodi null).</summary>
        public static bool AsetaKehittaja(string koodi)
        {
#if MATKAKIRJA_APPSTORE
            PlayerPrefs.DeleteKey(KehittajaAvain);
            return koodi == null;
#else
            if (koodi == null)
            {
                PlayerPrefs.DeleteKey(KehittajaAvain);
                PlayerPrefs.Save();
                // Web talletaPolloKoodi(''): pöllön ohitus pois.
                Puhe.TalletaKehittajakoodi(null);
                TalletaPolloKoodi(null);
                Muuttui?.Invoke("Kehittaja");
                return true;
            }
            string t;
            using (var sha = System.Security.Cryptography.SHA256.Create())
            {
                var tavut = sha.ComputeHash(System.Text.Encoding.UTF8.GetBytes(koodi.Trim()));
                var sb = new System.Text.StringBuilder();
                foreach (var b in tavut) sb.Append(b.ToString("x2"));
                t = sb.ToString();
            }
            if (t != KehittajaTiiviste && t != KehittajaTiivisteRajattu) return false;
            // Web talletaPolloKoodi(taysi ? syote : ''): vain pääkoodi workerille (lukijaäänen ääni ja ohje).
            Puhe.TalletaKehittajakoodi(t == KehittajaTiiviste ? koodi.Trim() : null);
            TalletaPolloKoodi(t == KehittajaTiiviste ? koodi.Trim() : null);
            PlayerPrefs.SetString(KehittajaAvain, "1");
            PlayerPrefs.Save();
            Muuttui?.Invoke("Kehittaja");
            return true;
#endif
        }

        static string Avain(Kytkin k) => k switch
        {
            Kytkin.Kertoja => "matkakirja-kertoja",
            Kytkin.Musiikki => "matkakirja-musiikki",
            Kytkin.Aanimaisema => "matkakirja-aanimaisema",
            _ => "matkakirja-kartan-liike",
        };

        static string Avain(Voima v) => "matkakirja-dev-voima-" + v switch
        {
            Voima.Tehosteet => "tehosteet",
            Voima.Pulu => "pulu",
            Voima.Lukija => "lukija",
            Voima.Musiikki => "musiikki",
            _ => "tausta",
        };

        public static float Oletus(Voima v) => v switch
        {
            Voima.Lukija => 0.9f,
            Voima.Musiikki => 0.35f,
            _ => 1f,
        };

        public static bool Paalla(Kytkin k)
        {
            string s = PlayerPrefs.GetString(Avain(k), null);
            if (string.IsNullOrEmpty(s)) return true;
            return k == Kytkin.Kertoja ? s != "ei" : s != "0";
        }

        public static void Aseta(Kytkin k, bool paalla)
        {
            if (Paalla(k) == paalla) return;
            PlayerPrefs.SetString(Avain(k), k == Kytkin.Kertoja ? (paalla ? "kaikki" : "ei") : (paalla ? "1" : "0"));
            PlayerPrefs.Save();
            Muuttui?.Invoke(k.ToString());
        }

        /// <summary>Äänentaso 0…1.</summary>
        public static float Taso(Voima v)
        {
            string s = PlayerPrefs.GetString(Avain(v), null);
            if (string.IsNullOrEmpty(s) || !float.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out var t))
                return Oletus(v);
            return Mathf.Clamp01(t);
        }

        /// <summary>
        /// Asettaa tason heti (äänimoottori kuulee Muuttui-tapahtumasta). tallenna = false
        /// liukusäätimen vedon aikana: levylle vasta Tallenna-kutsussa (sormi irti).
        /// </summary>
        public static void AsetaTaso(Voima v, float taso, bool tallenna = true)
        {
            taso = Mathf.Clamp01(Mathf.Round(taso * 100f) / 100f);
            if (Mathf.Approximately(Taso(v), taso)) { if (tallenna) PlayerPrefs.Save(); return; }
            if (Mathf.Approximately(taso, Oletus(v))) PlayerPrefs.DeleteKey(Avain(v));
            else PlayerPrefs.SetString(Avain(v), taso.ToString("0.##", CultureInfo.InvariantCulture));
            if (tallenna) PlayerPrefs.Save();
            Muuttui?.Invoke(v.ToString());
        }

        public static void Tallenna() => PlayerPrefs.Save();

        /// <summary>Onko muutoksen nimi (Muuttui-tapahtuman argumentti) äänentaso.</summary>
        public static bool OnTaso(string nimi) => Enum.TryParse<Voima>(nimi, out _);

        /// <summary>Kaikki asetukset oletuksiin (Uusi peli tyhjentää myös ääniasetukset, kuten webissä).</summary>
        public static void Nollaa()
        {
            foreach (Kytkin k in Enum.GetValues(typeof(Kytkin))) PlayerPrefs.DeleteKey(Avain(k));
            foreach (Voima v in Enum.GetValues(typeof(Voima))) PlayerPrefs.DeleteKey(Avain(v));
            PlayerPrefs.Save();
            Muuttui?.Invoke("kaikki");
        }

        public static string Nimi(Kytkin k) => k switch
        {
            Kytkin.Kertoja => "Kertoja",
            Kytkin.Musiikki => "Musiikki",
            Kytkin.Aanimaisema => "Äänimaisema",
            _ => "Pieni liike",
        };

        public static string Seloste(Kytkin k) => k switch
        {
            Kytkin.Kertoja => "Kertoja lukee matkakirjan merkinnät ja avaustekstin",
            Kytkin.Musiikki => "Pelin omat raidat: pohjavire, kaupunkien kappaleet, matkat ja visa",
            Kytkin.Aanimaisema => "Paikkojen äänitykset ja tehosteet — myös koko pelin mykistys",
            _ => "Pulu, pilven varjo ja kellonajan sävy kartalla",
        };

        public static string Nimi(Voima v) => v switch
        {
            Voima.Tehosteet => "Äänitehosteet",
            Voima.Pulu => "Pulun ääni",
            Voima.Lukija => "Lukija",
            Voima.Musiikki => "Taustamusiikki",
            _ => "Taustaäänet",
        };

        public static readonly IReadOnlyList<Voima> VoimaJarjestys = new[] { Voima.Tehosteet, Voima.Pulu, Voima.Lukija, Voima.Musiikki, Voima.Tausta };
    }
}
