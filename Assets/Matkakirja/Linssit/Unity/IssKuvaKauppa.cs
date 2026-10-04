// ISS-KAMERAN KUVAN OSTO (omistaja 4.10.2026 klo 15.0x, loki #3939: "kuvat ovat 50 senttiä kappale. ja kehittäjä voi ottaa niin
// paljon kuvia kuin haluaa"; Päätoimittajan hyväksymä ostovirta). Ensimmäinen kuva ilmainen (IssKameraKuva.Ilmaisia), sen jälkeen
// kulutettava IAP (StoreKit 2, MatkakirjaKauppa.swift). Pöllön kehittäjäkoodilla (Asetukset.Kehittaja: vain TF- ja kehitys-
// käännöksissä; App Storessa aina false, Applen ohje 3.1.1) kuvat rajattomia eikä laskuri juokse.
//   Lataa()            tuote ja hinta (Hinta, esim. "0,50 €") linssin avautuessa; Transaction-kuuntelija hyvittää keskeytyneet
//   Osta(valmis)       Applen ostoikkuna → tulos (Onnistui → +1 ostettu kuva, tapahtuma päätetään hyvityksen tallennuksen jälkeen;
//                      Peruttu; Odottaa → hyvitys myöhemmin kuuntelijasta; Epaonnistui)
//   ostetut kuvat      PlayerPrefs iss-kuvia-ostettu (laskuri IssKameraKuva.Otettu vähenee vasta valmiista kuvasta); hyvitetyt
//                      tapahtumat iss-kuva-tapahtumat (ei tuplahyvitystä)
// Simussa StoreKit-konfiguraatio ei vaikuta simctl-ajossa (Natiiviseppä 4.10.), joten testitila `kauppa koe osta|odota|peru|virhe`
// ajaa saman polun ilman StoreKitiä. Oikea osto TestFlightissa (sandbox).
using System;
using System.Collections.Generic;
using UnityEngine;
#if UNITY_IOS && !UNITY_EDITOR
using System.Runtime.InteropServices;
using AOT;
#endif

namespace Matkakirja.Natiivi
{
    public static class IssKuvaKauppa
    {
        /// <summary>Tuotetunnus (Julkaisija vahvistaa App Store Connectissa).</summary>
        public static string Tuote = "fi.matkakirja.peli.isskuva";
        public enum Tulos { Onnistui, Peruttu, Odottaa, Epaonnistui }

        const string OstettuAvain = "iss-kuvia-ostettu", TapahtumatAvain = "iss-kuva-tapahtumat";
        /// <summary>Ostetut kuvat yhteensä (IssKameraKuva.KuviaJaljella = ilmaiset + ostetut − otetut).</summary>
        public static int Ostettu => PlayerPrefs.GetInt(OstettuAvain, 0);
        /// <summary>Hinta pelaajan valuutassa Applen tuotetiedoista; null = ei vielä ladattu (UI näyttää silloin kiinteän "0,50 €").</summary>
        public static string Hinta { get; private set; }
        public const string HintaOletus = "0,50 €";
        /// <summary>Osto käynnissä (kilpi ODOTTAA / Applen ikkuna auki).</summary>
        public static bool Kesken { get; private set; }
        /// <summary>Odottava osto (Ask to Buy / SCA): hyvitys tulee kuuntelijasta.</summary>
        public static bool Odottaa { get; private set; }
        /// <summary>Hyvitys tuli (osto tai keskeytyneen hyvitys): UI päivittää kilven.</summary>
        public static event Action Hyvitetty;
        /// <summary>Testitila simulle: null = StoreKit; "osta" | "odota" | "peru" | "virhe".</summary>
        public static string Koe;

        static bool ladattu;

        public static void Lataa()
        {
            if (ladattu) return;
            ladattu = true;
#if UNITY_IOS && !UNITY_EDITOR
            try { MatkakirjaKauppa_Kuuntele(UusiKutsu); MatkakirjaKauppa_Lataa(Tuote, LadattuKutsu); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA kauppa: " + e.Message); }
#endif
        }

        public static void Osta(Action<Tulos> valmis)
        {
            if (Kesken) { valmis?.Invoke(Tulos.Epaonnistui); return; }
            Kesken = true;
            Debug.Log($"MATKAKIRJA kauppa: osto {Tuote} ({Hinta ?? HintaOletus}){(Koe != null ? " koe " + Koe : "")}");
            if (Koe != null || !Saatavilla)
            {
                // Testitila (simu, editori): sama polku kuin StoreKitin tulos ilman Applen ikkunaa.
                string k = Koe ?? "virhe";
                Valmistui(k == "osta" ? 1 : k == "peru" ? 0 : k == "odota" ? 2 : -1, k == "osta" ? "koe-" + DateTime.UtcNow.Ticks : "", valmis);
                return;
            }
#if UNITY_IOS && !UNITY_EDITOR
            int id;
            lock (kesken) { id = ++seuraava; kesken[id] = valmis; }
            try { MatkakirjaKauppa_Osta(id, Tuote, OstettuKutsu); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA kauppa: " + e.Message); lock (kesken) kesken.Remove(id); Valmistui(-1, "", valmis); }
#endif
        }

        static bool Saatavilla => Application.platform == RuntimePlatform.IPhonePlayer;

        static void Valmistui(int tulos, string tapahtuma, Action<Tulos> valmis)
        {
            Kesken = false;
            var t = tulos == 1 ? Tulos.Onnistui : tulos == 0 ? Tulos.Peruttu : tulos == 2 ? Tulos.Odottaa : Tulos.Epaonnistui;
            Odottaa = t == Tulos.Odottaa;
            if (t == Tulos.Onnistui) Hyvita(tapahtuma);
            Debug.Log($"MATKAKIRJA kauppa: tulos {t}{(string.IsNullOrEmpty(tapahtuma) ? "" : " " + tapahtuma)}, ostettu {Ostettu}");
            try { valmis?.Invoke(t); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>+1 ostettu kuva kerran per tapahtuma (tallennus ensin), sitten tapahtuma päätetään StoreKitissä.</summary>
        static void Hyvita(string tapahtuma)
        {
            var hyvitetyt = new HashSet<string>(PlayerPrefs.GetString(TapahtumatAvain, "").Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries));
            if (!string.IsNullOrEmpty(tapahtuma) && hyvitetyt.Contains(tapahtuma)) { Paata(tapahtuma); return; }
            PlayerPrefs.SetInt(OstettuAvain, Ostettu + 1);
            if (!string.IsNullOrEmpty(tapahtuma)) { hyvitetyt.Add(tapahtuma); PlayerPrefs.SetString(TapahtumatAvain, string.Join(",", hyvitetyt)); }
            PlayerPrefs.Save();
            Paata(tapahtuma);
            Odottaa = false;
            try { Hyvitetty?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        static void Paata(string tapahtuma)
        {
#if UNITY_IOS && !UNITY_EDITOR
            if (!string.IsNullOrEmpty(tapahtuma) && !tapahtuma.StartsWith("koe-"))
                try { MatkakirjaKauppa_Paata(tapahtuma); } catch (Exception e) { Debug.LogWarning("MATKAKIRJA kauppa: " + e.Message); }
#endif
        }

        /// <summary>Testi: ostetut ja hyvitetyt tapahtumat nollaan (`kauppa koe nollaa`).</summary>
        public static void Nollaa() { PlayerPrefs.DeleteKey(OstettuAvain); PlayerPrefs.DeleteKey(TapahtumatAvain); PlayerPrefs.Save(); }

        public static string TilaTeksti() => $"kauppa: tuote {Tuote}, hinta {Hinta ?? "-"}, ostettu {Ostettu}, kesken {Kesken}, odottaa {Odottaa}, koe {Koe ?? "-"}";

#if UNITY_IOS && !UNITY_EDITOR
        delegate void LadattuFn(int ok, IntPtr hinta);
        delegate void OstettuFn(int pyynto, int tulos, IntPtr tapahtuma);
        delegate void UusiFn(IntPtr tuote, IntPtr tapahtuma);
        static readonly LadattuFn LadattuKutsu = Ladattu;
        static readonly OstettuFn OstettuKutsu = Ostettu_;
        static readonly UusiFn UusiKutsu = Uusi;
        static readonly Dictionary<int, Action<Tulos>> kesken = new Dictionary<int, Action<Tulos>>();
        static int seuraava;

        [DllImport("__Internal")] static extern void MatkakirjaKauppa_Lataa(string tunnus, LadattuFn valmis);
        [DllImport("__Internal")] static extern void MatkakirjaKauppa_Osta(int pyynto, string tunnus, OstettuFn valmis);
        [DllImport("__Internal")] static extern void MatkakirjaKauppa_Kuuntele(UusiFn uusi);
        [DllImport("__Internal")] static extern void MatkakirjaKauppa_Paata(string tapahtuma);

        [MonoPInvokeCallback(typeof(LadattuFn))]
        static void Ladattu(int ok, IntPtr hinta)
        {
            string h = Marshal.PtrToStringUTF8(hinta);
            if (ok == 1 && !string.IsNullOrEmpty(h)) Hinta = h;
            Debug.Log($"MATKAKIRJA kauppa: tuote {Tuote} {(ok == 1 ? "ladattu, hinta " + h : "ei saatu")}");
        }

        [MonoPInvokeCallback(typeof(OstettuFn))]
        static void Ostettu_(int pyynto, int tulos, IntPtr tapahtuma)
        {
            Action<Tulos> v;
            lock (kesken) { kesken.TryGetValue(pyynto, out v); kesken.Remove(pyynto); }
            Valmistui(tulos, Marshal.PtrToStringUTF8(tapahtuma), v);
        }

        /// <summary>Kuuntelija: keskeytyneen tai hyväksytyn odottavan oston hyvitys (Transaction.unfinished / updates).</summary>
        [MonoPInvokeCallback(typeof(UusiFn))]
        static void Uusi(IntPtr tuote, IntPtr tapahtuma)
        {
            string t = Marshal.PtrToStringUTF8(tuote), id = Marshal.PtrToStringUTF8(tapahtuma);
            Debug.Log($"MATKAKIRJA kauppa: tapahtuma kuuntelijasta {t} {id}");
            if (t == Tuote) Hyvita(id);
        }
#endif
    }
}
