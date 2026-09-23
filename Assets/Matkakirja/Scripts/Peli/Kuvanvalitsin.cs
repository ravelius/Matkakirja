// KUVANVALITSIN: iOS:n kuvanvalinta palautteen ja kuvavinkin kuviin (Pelikoodari, 23.9.2026).
//
// Webissä <input type=file> + canvas-pienennys (js/ehdotukset.js skaalaaEhdotusKuva).
// Natiivissa PHPickerViewController (Plugins/iOS/MatkakirjaKuvat.mm): kuvat tulevat jpeginä
// (laatu 0.85 kuten webissä), pisin sivu enintään annettu, EXIF-orientaatio käännetty
// pikseleihin, HEIC muunnettu jpegiksi. Kuvakirjaston käyttölupaa ei kysytä.
//
// KYTKENTÄ: käynnistyksessä Palautekanava.Kuvanvalitsin = Valitse, vain iOS-laitteella
// (UNITY_IOS && !UNITY_EDITOR). Editorissa ja muualla kytkentä jää nulliksi, jolloin
// Natiivi-UI:n kuvanappi kertoo, ettei valinta toimi.
//
// Paluu: valmis(lista) kutsutaan tasan kerran pääsäikeessä (iOS:ssä liitännäinen kutsuu
// pääjonossa, joka on Unityn säie). Peruminen, epäonnistuminen ja jo auki oleva valitsin
// antavat tyhjän listan. Tavut kopioidaan natiivipuskurista heti kuvakutsussa, joten
// natiivipuoli vapauttaa omansa (ARC) kutsun palattua.
using System;
using System.Collections.Generic;
using UnityEngine;
#if UNITY_IOS && !UNITY_EDITOR
using System.Runtime.InteropServices;
using AOT;
#endif

namespace Matkakirja.Natiivi
{
    public static class Kuvanvalitsin
    {
        /// <summary>Tosi, kun liitännäinen on käytössä (iOS-laite).</summary>
        public static bool Kaytossa
        {
            get
            {
#if UNITY_IOS && !UNITY_EDITOR
                return Application.platform == RuntimePlatform.IPhonePlayer;
#else
                return false;
#endif
            }
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void Kytke()
        {
            if (Kaytossa) Palautekanava.Kuvanvalitsin = Valitse;
        }

        /// <summary>
        /// Avaa valitsimen: enintään n kuvaa, pisin sivu ≤ sivu px (0 = ei pienennystä).
        /// valmis(kuvat) tasan kerran; tyhjä lista = peruttu tai ei onnistunut.
        /// </summary>
        public static void Valitse(int enintaan, int sivu, Action<List<Liitekuva>> valmis)
        {
#if UNITY_IOS && !UNITY_EDITOR
            int id;
            lock (kesken)
            {
                id = ++seuraava;
                kesken[id] = new Pyynto { Valmis = valmis };
            }
            try { MatkakirjaKuvat_Valitse(id, Math.Max(1, enintaan), Math.Max(0, sivu), KuvaKutsu, ValmisKutsu); }
            catch (Exception e)
            {
                Debug.LogWarning("MATKAKIRJA kuvat: valitsin ei auennut: " + e.Message);
                lock (kesken) kesken.Remove(id);
                valmis?.Invoke(new List<Liitekuva>());
            }
#else
            valmis?.Invoke(new List<Liitekuva>());
#endif
        }

#if UNITY_IOS && !UNITY_EDITOR
        sealed class Pyynto
        {
            public readonly List<Liitekuva> Kuvat = new List<Liitekuva>();
            public Action<List<Liitekuva>> Valmis;
        }

        static readonly Dictionary<int, Pyynto> kesken = new Dictionary<int, Pyynto>();
        static int seuraava;

        delegate void KuvaFn(int pyynto, int indeksi, IntPtr tavut, int pituus);
        delegate void ValmisFn(int pyynto, int maara);

        // Staattiset delegaatit: IL2CPP tekee MonoPInvokeCallback-metodeille C-osoittimen,
        // ja kentät pitävät delegaatit elossa koko ajon.
        static readonly KuvaFn KuvaKutsu = Kuva;
        static readonly ValmisFn ValmisKutsu = Valmis;

        [DllImport("__Internal")]
        static extern void MatkakirjaKuvat_Valitse(int pyynto, int enintaan, int sivu, KuvaFn kuva, ValmisFn valmis);

        [MonoPInvokeCallback(typeof(KuvaFn))]
        static void Kuva(int pyynto, int indeksi, IntPtr tavut, int pituus)
        {
            try
            {
                if (tavut == IntPtr.Zero || pituus <= 0) return;
                Pyynto p;
                lock (kesken) kesken.TryGetValue(pyynto, out p);
                if (p == null) return;
                var kopio = new byte[pituus];
                Marshal.Copy(tavut, kopio, 0, pituus);
                p.Kuvat.Add(new Liitekuva { Tavut = kopio, Nimi = "kuva.jpg", Tyyppi = "image/jpeg" });
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA kuvat: kuva " + indeksi + ": " + e.Message); }
        }

        [MonoPInvokeCallback(typeof(ValmisFn))]
        static void Valmis(int pyynto, int maara)
        {
            // Poikkeus ei saa karata natiivikoodiin (IL2CPP kaatuisi).
            try
            {
                Pyynto p;
                lock (kesken)
                {
                    if (!kesken.TryGetValue(pyynto, out p)) return;
                    kesken.Remove(pyynto);
                }
                Debug.Log("MATKAKIRJA kuvat: " + p.Kuvat.Count + " kuvaa valittu");
                p.Valmis?.Invoke(p.Kuvat);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA kuvat: paluu: " + e); }
        }
#endif
    }
}
