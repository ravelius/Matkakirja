// ASETUKSET: pelaajan ääni- ja karttavalinnat (Natiivi-UI, 23.9.2026).
//
// Samat valinnat ja oletukset kuin verkkopelissä, samoilla avaimilla
// (localStorage → PlayerPrefs), jotta vientityökalut ja muistiinpanot pätevät:
//   päävalikko (hampurilainen), js/main.js AANIKYTKIMET ja kartan kytkin:
//     Kertoja      matkakirja-kertoja      "ei" = pois       oletus päällä
//     Musiikki     matkakirja-musiikki     "0"/"1"           oletus päällä
//     Äänimaisema  matkakirja-aanimaisema  "0"/"1"           oletus päällä (myös koko pelin mykistys; webissä sound.js:n tila, avain natiivin oma)
//     Pieni liike  matkakirja-kartan-liike "0"/"1"           oletus päällä
//     Kuljettu reitti matkakirja-kuljettu-reitti "0"/"1"     oletus päällä (vain natiivi; omistaja 26.9.2026, kynäviiva
//                  lukee PlayerPrefsistä tai Paalla(Kytkin.KuljettuReitti) ja kuuntelee Muuttui("KuljettuReitti"))
//   ratas "Äänentasot", js/main.js AANIVOIMAT + js/kehittajan-voimat.js
//   (avain matkakirja-dev-voima-<laji>, 0…1, tallennetaan vain oletuksesta poikkeava):
//     tehosteet 1,0 · pulu 1,0 · lukija 0,9 · musiikki 0,35 · tausta 1,0
// Äänimoottori ja kartta lukevat arvot täältä ja kuuntelevat Muuttui-tapahtumaa.
// MIKSERI (omistaja 9.10.2026 klo 09.5x): äänentasot ovat konteksti- eli peli- ja linssikohtaisia (Ydin Aanimikseri.Yhteinen): Taso(Voima)
// = nykyisen kontekstin ryhmän taso (perus = Oletus × kerroin; yhteiset kertoimet workerista, kehittäjän omat muutokset PlayerPrefsissä).
// Vanhat matkakirja-dev-voima-*-avaimet eivät enää vaikuta; mikseri näkyy vain kehittäjäkoodilla (MikseriPalvelin).
using System;
using System.Collections.Generic;
using System.Globalization;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public enum Kytkin { Kertoja, Musiikki, Aanimaisema, PieniLiike, KuljettuReitti }
    /// <summary>Äänentasot (MIKSERI, omistaja 8.10.2026 klo 17.5x: kertoja ja puhe, hahmojen repliikit, musiikki, tehosteet,
    /// äänimaisema, sää, Pulu). Repliikit ja Saa luetaan soittavassa koodissa Asetukset.Taso(Voima.Repliikit / Voima.Saa).</summary>
    public enum Voima { Tehosteet, Pulu, Lukija, Musiikki, Tausta, Repliikit, Saa }

    public static class Asetukset
    {
        /// <summary>Jokin asetus muuttui (kytkimen tai voiman nimi).</summary>
        public static event Action<string> Muuttui;

        static Asetukset()
        {
            // Mikserin perustaso = koodin ja sisältöpaketin oletus; mikserin muutos (taso tai konteksti) → kaikki voimat muuttuivat.
            var m = Matkakirja.Linssit.Aanet.Aanimikseri.Yhteinen;
            m.PerusTaso = r => Oletus(VoimaRyhmasta(r));
            m.Muuttui += () => { foreach (var v in VoimaJarjestys) Muuttui?.Invoke(v.ToString()); };
        }

        /// <summary>Voima ↔ mikserin ryhmä (Ydin Aanimikseri.Ryhmat).</summary>
        public static string Ryhma(Voima v) => v switch
        {
            Voima.Tehosteet => "tehosteet", Voima.Pulu => "pulu", Voima.Lukija => "puhe", Voima.Musiikki => "musiikki",
            Voima.Repliikit => "repliikit", Voima.Saa => "saa", _ => "maisema",
        };

        public static Voima VoimaRyhmasta(string ryhma)
        {
            foreach (Voima v in Enum.GetValues(typeof(Voima))) if (Ryhma(v) == ryhma) return v;
            return Voima.Tehosteet;
        }

        // --- kehittäjätila (webin js/main.js kytkeKehittaja) ------------------------------
        // Koodit vain SHA-256-tiivisteinä kuten webissä (sama pää- ja rajattu koodi).
        // Kehitysbuildissa (Development Build) päällä aina; muuten koodilla, muistetaan.
        const string KehittajaAvain = "matkakirja-kehittaja";
        const string KehittajaTiiviste = "2f7f15d0bb83b97a7ce3054be0972e80b60742cfc8b4c36ce06f3330f6f045c6";
        const string KehittajaTiivisteRajattu = "b3282a2f2a28757b3a18ab833de16a9c54518c0b0cf493e3f0a7cf09386f326a";
        // TESTAAJATILA (omistaja 7.10.2026 klo 12.5x, beetatestaajat): kevyempi taso omalla koodillaan; vain SHA-256-tiiviste
        // (repo on julkinen). Avaa kaikki linssit (esittelylinssit) ja vapaan liikkumisen (maailmatila), ei kehittäjätyökaluja.
        const string TestaajaTiiviste = "5e8a21ead84851c212c2cae58849de4d37bc0babfcab05ceff51350412eb3e94";
        const string TestaajaAvain = "matkakirja-testaaja";
        /// <summary>Testaajatila avasi esittelylinssit (ne eivät olleet auki apurahakortista): poisto sulkee ne (Päätoimittaja 7.10.).</summary>
        const string TestaajaLinssitAvain = "matkakirja-testaaja-linssit";

        /// <summary>
        /// Kehittäjätila. Omistajan päätös 7.10.2026 klo 12.5x (kumoaa Fablen 24.9. portin): avautuu koodilla myös App Store
        /// -käännöksessä (MATKAKIRJA_APPSTORE = TestFlight, sama binääri App Storeen); oletuksena pois, ja vain oikea koodi
        /// (tiiviste) kytkee sen. Avaimet ajon aikana Keychainiin, ei binääriin eikä lokiin.
        /// </summary>
        public static bool Kehittaja => !PakotaPelaaja && (Debug.isDebugBuild || PlayerPrefs.GetString(KehittajaAvain, "") == "1");

        /// <summary>Testaajatila (ei kehittäjätilaa): kaikki linssit ja vapaa liikkuminen kartalla, ei syvempiä työkaluja.</summary>
        public static bool Testaaja => !PakotaPelaaja && !Kehittaja && PlayerPrefs.GetString(TestaajaAvain, "") == "1";

        /// <summary>
        /// Testi (ui pelaaja 1|0, Päätoimittaja 1.10.): pelaajan näkymä myös Debug-käännöksessä, jossa kehittäjätila on muuten
        /// aina päällä — kehittäjän napit ja tekstit (mikseri, "Kuori: auto") todennetaan piilossa simulaattorissa ilman TF:ää.
        /// Ei tallennu (istunnon ajan).
        /// </summary>
        public static bool PakotaPelaaja;

        /// <summary>
        /// Pöllön kehittäjäkoodi chatin x-pollo-kehittaja-otsakkeeseen (Fable 24.9.: ei koskaan kovakoodattuna eikä
        /// PlayerPrefsissä). Omistaja syöttää sen kerran kehittäjätilan kytkennässä; arvo säilyy vain iOS Keychainissa
        /// (MatkakirjaAvaimet, kuten Lukijoilta-avain). Editorissa vain muistissa. Myös App Store -käännöksessä (omistaja 7.10.).
        /// </summary>
        public static string PolloKoodi
        {
            get
            {
                if (!polloKoodiLuettu)
                {
                    polloKoodiLuettu = true;
#if UNITY_IOS && !UNITY_EDITOR
                    polloKoodi = MatkakirjaAvaimet_Hae(PolloKeychain);
#endif
                }
                return string.IsNullOrEmpty(polloKoodi) ? null : polloKoodi;
            }
        }

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

        /// <summary>Kytkee kehittäjätilan koodilla (true = onnistui) tai pois (koodi null).</summary>
        public static bool AsetaKehittaja(string koodi)
        {
            if (koodi == null)
            {
                PlayerPrefs.DeleteKey(KehittajaAvain);
                PlayerPrefs.DeleteKey(TestaajaAvain);
                PlayerPrefs.DeleteKey(TestaajaLinssitAvain);
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
            if (t == TestaajaTiiviste)
            {
                // Testaaja: kaikki linssit heti (LinssiOhjain.PaivitaKehittajatila Muuttui-tapahtumasta) ja vapaa liikkuminen (maailmatila).
                PlayerPrefs.DeleteKey(KehittajaAvain);
                PlayerPrefs.SetString(TestaajaAvain, "1");
                PlayerPrefs.Save();
                Muuttui?.Invoke("Kehittaja");
                return true;
            }
            if (t != KehittajaTiiviste && t != KehittajaTiivisteRajattu) return false;
            PlayerPrefs.DeleteKey(TestaajaAvain);
            // Web talletaPolloKoodi(taysi ? syote : ''): vain pääkoodi workerille (lukijaäänen ääni ja ohje).
            Puhe.TalletaKehittajakoodi(t == KehittajaTiiviste ? koodi.Trim() : null);
            TalletaPolloKoodi(t == KehittajaTiiviste ? koodi.Trim() : null);
            PlayerPrefs.SetString(KehittajaAvain, "1");
            PlayerPrefs.Save();
            Muuttui?.Invoke("Kehittaja");
            return true;
        }

        /// <summary>Kuljetun reitin kytkimen PlayerPrefs-avain ("0" = pois).</summary>
        public const string KuljettuReittiAvain = "matkakirja-kuljettu-reitti";

        static bool? kuljettuReitti;

        /// <summary>
        /// Linssisepän kynäviiva (ElavaMatka.NakyvissaKysely) kysyy joka kehys: arvo välimuistista, joka nollautuu
        /// muutoksessa. Muutos herättää pallon piirron (PallonLepo), jotta viiva katoaa tai palaa levosta.
        /// </summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void KytkeKuljettuReitti()
        {
            ElavaMatka.NakyvissaKysely = () => kuljettuReitti ??= Paalla(Kytkin.KuljettuReitti);
            Muuttui -= KuljettuReittiMuuttui;
            Muuttui += KuljettuReittiMuuttui;
        }

        static void KuljettuReittiMuuttui(string nimi)
        {
            if (nimi != nameof(Kytkin.KuljettuReitti) && nimi != "kaikki") return;
            kuljettuReitti = null;
            PallonLepo.Muuttui("kuljettu reitti");
        }

        static string Avain(Kytkin k) => k switch
        {
            Kytkin.Kertoja => "matkakirja-kertoja",
            Kytkin.Musiikki => "matkakirja-musiikki",
            Kytkin.Aanimaisema => "matkakirja-aanimaisema",
            Kytkin.KuljettuReitti => KuljettuReittiAvain,
            _ => "matkakirja-kartan-liike",
        };

        static string Avain(Voima v) => "matkakirja-dev-voima-" + v switch
        {
            Voima.Tehosteet => "tehosteet",
            Voima.Pulu => "pulu",
            Voima.Lukija => "lukija",
            Voima.Musiikki => "musiikki",
            Voima.Repliikit => "repliikit",
            Voima.Saa => "saa",
            _ => "tausta",
        };

        /// <summary>Mikserin avain asetukset.jsonissa: "aanet.mikseri.&lt;nimi&gt;" (0–1).</summary>
        public static string MikseriAvain(Voima v) => v switch
        {
            Voima.Tehosteet => "tehosteet", Voima.Pulu => "pulu", Voima.Lukija => "lukija", Voima.Musiikki => "musiikki",
            Voima.Repliikit => "repliikit", Voima.Saa => "saa", _ => "tausta",
        };

        /// <summary>Koodin oletus; sisältöpaketin kokoelmat/asetukset.json "aanet.mikseri.&lt;nimi&gt;" ohittaa (omistajan säätö
        /// kaikkien oletukseksi: kehittäjän Tallenna oletuksiksi → vienti).</summary>
        public static float Oletus(Voima v) => Mathf.Clamp01(Matkakirja.Peli.Asetus.Luku("aanet.mikseri." + MikseriAvain(v), v switch
        {
            Voima.Lukija => 0.9f,
            Voima.Musiikki => 0.35f,
            _ => 1f,
        }));

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

        /// <summary>Äänentaso 0…1 nykyisessä kontekstissa (mikserin ryhmä: perus × kerroin).</summary>
        public static float Taso(Voima v) => Matkakirja.Linssit.Aanet.Aanimikseri.Yhteinen.Kerroin(Ryhma(v));

        /// <summary>
        /// Asettaa tason heti (äänimoottori kuulee Muuttui-tapahtumasta). tallenna = false
        /// liukusäätimen vedon aikana: levylle vasta Tallenna-kutsussa (sormi irti).
        /// </summary>
        public static void AsetaTaso(Voima v, float taso, bool tallenna = true)
        {
            taso = Mathf.Clamp01(Mathf.Round(taso * 100f) / 100f);
            var m = Matkakirja.Linssit.Aanet.Aanimikseri.Yhteinen;
            float perus = Oletus(v);
            m.Aseta(Matkakirja.Linssit.Aanet.Aanimikseri.RyhmaAvain(m.Nyt, Ryhma(v)), perus > 0.001f ? taso / perus : 1f);
            if (tallenna) Tallenna();
        }

        /// <summary>Kehittäjän omat mikserimuutokset levylle (vain kehittäjätilassa; muille mikseriä ei näytetä).</summary>
        public static void Tallenna()
        {
            if (Kehittaja) PlayerPrefs.SetString(MikseriOmatAvain, Matkakirja.Linssit.Aanet.Aanimikseri.Yhteinen.OmatTalteen());
            PlayerPrefs.Save();
        }

        public const string MikseriOmatAvain = "matkakirja-mikseri-omat-v1";

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
            Kytkin.Kertoja => Kieli.T("ui.asetukset.kytkin.kertoja"),
            Kytkin.Musiikki => Kieli.T("ui.asetukset.kytkin.musiikki"),
            Kytkin.Aanimaisema => Kieli.T("ui.asetukset.kytkin.tila"), // valikossa "Tila" (omistaja 2.10.2026 klo 15.0x: "muuta äänimaisema muotoon tila"; web main.js)
            Kytkin.KuljettuReitti => Kieli.T("ui.asetukset.kytkin.kuljettu-reitti"),
            _ => Kieli.T("ui.asetukset.kytkin.pieni-liike"),
        };

        public static string Seloste(Kytkin k) => k switch
        {
            Kytkin.Kertoja => Kieli.T("ui.asetukset.seloste.kertoja"),
            Kytkin.Musiikki => Kieli.T("ui.asetukset.seloste.musiikki"),
            Kytkin.Aanimaisema => Kieli.T("ui.asetukset.seloste.tila"),
            Kytkin.KuljettuReitti => Kieli.T("ui.asetukset.seloste.kuljettu-reitti"),
            _ => Kieli.T("ui.asetukset.seloste.pieni-liike"),
        };

        public static string Nimi(Voima v) => v switch
        {
            Voima.Tehosteet => Kieli.T("ui.asetukset.voima.tehosteet"),
            Voima.Pulu => Kieli.T("ui.asetukset.voima.pulu"),
            Voima.Lukija => Kieli.T("ui.asetukset.voima.kertoja-ja-puhe"),
            Voima.Musiikki => Kieli.T("ui.asetukset.voima.musiikki"),
            Voima.Repliikit => Kieli.T("ui.asetukset.voima.repliikit"),
            Voima.Saa => Kieli.T("ui.asetukset.voima.saa"),
            _ => Kieli.T("ui.asetukset.voima.aanimaisema"),
        };

        /// <summary>Mikserin järjestys (omistaja 8.10. 17.5x): kertoja ja puhe, repliikit, musiikki, tehosteet, äänimaisema, sää, Pulu.</summary>
        public static readonly IReadOnlyList<Voima> VoimaJarjestys = new[] { Voima.Lukija, Voima.Repliikit, Voima.Musiikki, Voima.Tehosteet, Voima.Tausta, Voima.Saa, Voima.Pulu };

        /// <summary>Nykyiset tasot asetukset.json-palana { "aanet": { "mikseri": { … } } } (kehittäjän Tallenna oletuksiksi).</summary>
        public static string MikseriJson()
        {
            var sb = new System.Text.StringBuilder("{ \"aanet\": { \"mikseri\": { ");
            bool eka = true;
            foreach (var v in VoimaJarjestys)
            {
                if (!eka) sb.Append(", ");
                eka = false;
                sb.Append('"').Append(MikseriAvain(v)).Append("\": ").Append(Taso(v).ToString("0.##", CultureInfo.InvariantCulture));
            }
            return sb.Append(" } } }").ToString();
        }
    }
}
