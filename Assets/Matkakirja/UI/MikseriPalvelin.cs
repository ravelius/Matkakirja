// MIKSERIN PALVELIN JA KONTEKSTI (omistaja 9.10.2026 klo 09.5x: "mikserillä pitää olla joku worker … tallentaa minun tekemät asetukset
// peliin kaikille käyttäjille vain nappia painamalla pelissä … vain, kun on se kehittäjäkoodi päällä"; Pelikoodarin Pöllö-worker PR #4270).
//   KÄYNNISTYS  välimuisti (persistentDataPath/mikseri-yhteiset.json) heti, sitten GET /mikseri/tasot → uusi välimuisti (sama kaikilla
//               verkoilla); kehittäjällä myös omat muutokset PlayerPrefsistä (Asetukset.MikseriOmatAvain)
//   KONTEKSTI   joka ruutu sen mukaan, mikä on auki: pallo (opas, kaupunkikierros), linna (poikkileikkaus), iss (satelliitti),
//               lautapelit (Mylly, Tavli), linssit (muut linssit), kartta (ei mitään)
//   TALLENNUS   POST /mikseri/tasot, otsake x-pollo-kehittaja = kehittäjäkoodi (Asetukset.PolloKoodi), runko {tasot, pohjaVersio};
//               200 → omat muutokset yhteisiksi; 409 → joku tallensi välissä: luetaan uudelleen ja pyydetään tallentamaan uudestaan
// Äänivahti (ui aanet vahti): soivat AudioSourcet, joiden klippiä ei ole rekisteröity (Aanimikseri.Rekisteroi).
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Aanet;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class MikseriPalvelin
    {
        public const string Osoite = "https://matkakirja-pollo.samireivinen.workers.dev/mikseri/tasot";
        static string Valimuisti => Path.Combine(Application.persistentDataPath, "mikseri-yhteiset.json");
        static Aanimikseri M => Aanimikseri.Yhteinen;
        static bool alustettu;
        /// <summary>Viimeisin tila testiä ja mikserin otsikkoa varten.</summary>
        public static string Tila { get; private set; } = "ei ladattu";

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Alusta()
        {
            if (alustettu) return;
            alustettu = true;
            try { if (File.Exists(Valimuisti) && M.LueYhteiset(File.ReadAllText(Valimuisti))) Tila = "välimuisti v" + M.YhteisetVersio; }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA mikseri: välimuisti: " + e.Message); }
            if (Asetukset.Kehittaja) M.LueOmat(PlayerPrefs.GetString(Asetukset.MikseriOmatAvain, ""));
            var k = UiKerros.Hae();
            k.JokaRuutu += PaivitaKonteksti;
            k.StartCoroutine(Hae(null));
        }

        /// <summary>Kontekstin nimi mikserin otsikkoon.</summary>
        public static string KontekstinNimi(string k) => k switch
        {
            "pallo" => "Kuumailmapallo", "linna" => "Olavinlinna", "iss" => "ISS", "lautapelit" => "Lautapelit", "linssit" => "Linssit", _ => "Kartta",
        };

        static void PaivitaKonteksti()
        {
            string k = "kartta";
            string linssi = UiNakymat.Olemassa ? UiNakymat.Hae().Linssit?.Auki?.Tiedot?.Id : null;
            if (OpasSovitin.Auki || (KierrosSovitin.Viimeisin != null && KierrosSovitin.Viimeisin.Auki)) k = "pallo";
            else if (linssi == "poikkileikkaus") k = "linna";
            else if (linssi == "satelliitti") k = "iss";
            else if (MyllyNakyma.AukiNyt || TavliNakyma.AukiNyt) k = "lautapelit";
            else if (!string.IsNullOrEmpty(linssi)) k = "linssit";
            M.AsetaNyt(k);
        }

        /// <summary>Yhteiset tasot workerista (käynnistys ja mikserin avaus); valmis(true) = luettu.</summary>
        public static IEnumerator Hae(Action<bool> valmis)
        {
            using (var r = UnityWebRequest.Get(Osoite))
            {
                Tunnisteet(r);
                r.timeout = 15;
                yield return r.SendWebRequest();
                bool ok = r.result == UnityWebRequest.Result.Success && M.LueYhteiset(r.downloadHandler.text);
                if (ok)
                {
                    Tila = "yhteiset v" + M.YhteisetVersio;
                    try { File.WriteAllText(Valimuisti, r.downloadHandler.text); } catch (Exception e) { Debug.LogWarning("MATKAKIRJA mikseri: " + e.Message); }
                }
                else Debug.Log($"MATKAKIRJA mikseri: haku ei onnistunut ({r.responseCode} {r.error}); {Tila}");
                valmis?.Invoke(ok);
            }
        }

        /// <summary>"Tallenna kaikille" (vain kehittäjäkoodilla): nykyisen kontekstin tasot kaikkien oletukseksi. tulos(viesti).</summary>
        public static void TallennaKaikille(Action<string> tulos)
        {
            string koodi = Asetukset.PolloKoodi;
            if (!Asetukset.Kehittaja || string.IsNullOrEmpty(koodi)) { tulos?.Invoke(Kieli.T("ui.mikseri.ei-koodia")); return; }
            UiKerros.Hae().StartCoroutine(Laheta(M.Nyt, koodi, tulos));
        }

        static IEnumerator Laheta(string konteksti, string koodi, Action<string> tulos)
        {
            string runko = M.TallennusJson(konteksti);
            using (var r = new UnityWebRequest(Osoite, "POST") { uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(runko)), downloadHandler = new DownloadHandlerBuffer() })
            {
                r.SetRequestHeader("Content-Type", "application/json");
                r.SetRequestHeader("x-pollo-kehittaja", koodi);
                Tunnisteet(r);
                r.timeout = 20;
                yield return r.SendWebRequest();
                long s = r.responseCode;
                Debug.Log($"MATKAKIRJA mikseri: tallennus {konteksti} → {s}");
                if (s == 200)
                {
                    int versio = M.YhteisetVersio + 1;
                    try { if (MiniJson.Jasenna(r.downloadHandler.text) is Dictionary<string, object> j) versio = (int)(MiniJson.Luku(j, "versio") ?? versio); } catch (FormatException) { }
                    M.Tallennettu(konteksti, versio);
                    Asetukset.Tallenna();
                    yield return Hae(null);
                    tulos?.Invoke(Kieli.T("ui.mikseri.tallennettu", KontekstinNimi(konteksti), versio));
                }
                else if (s == 409) { yield return Hae(null); tulos?.Invoke(Kieli.T("ui.mikseri.ristiriita")); }
                else if (s == 403) tulos?.Invoke(Kieli.T("ui.mikseri.koodi-ei-kelpaa"));
                else tulos?.Invoke(Kieli.T("ui.mikseri.virhe", s == 0 ? r.error : s.ToString()));
            }
        }

        static void Tunnisteet(UnityWebRequest r)
        {
            r.SetRequestHeader("Accept", "application/json");
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
        }

        /// <summary>Äänivahti: soivat AudioSourcet, joiden klippiä ei ole rekisteröity; "OK" tai "VIKA n: klippi @ olio …".</summary>
        public static string Vahti()
        {
            var puuttuvat = new List<string>();
            foreach (var a in UnityEngine.Object.FindObjectsByType<AudioSource>(FindObjectsInactive.Exclude, FindObjectsSortMode.None))
                if (a.isPlaying && a.clip != null && !M.Rekisteroity(a.clip.name)) puuttuvat.Add(a.clip.name + " @ " + a.gameObject.name);
            puuttuvat = puuttuvat.Distinct().OrderBy(x => x, StringComparer.Ordinal).ToList();
            return puuttuvat.Count == 0 ? $"äänivahti OK ({M.RekisteroityjaAania} rekisteröityä, konteksti {M.Nyt})"
                : $"äänivahti VIKA {puuttuvat.Count} (konteksti {M.Nyt}): " + string.Join(" | ", puuttuvat.Take(20));
        }
    }
}
