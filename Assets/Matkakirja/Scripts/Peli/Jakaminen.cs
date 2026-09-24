// JAKAMINEN: iOS:n jakoarkki "Jaa matka" -napille (Pelikoodari, 24.9.2026).
//
// Web: ui.js natiiviJaaTeksti(matkanYhteenveto). Natiivi: Plugins/iOS/MatkakirjaJako.mm
// (UIActivityViewController; iPadilla popover ruudun keskeltä). Saatavilla vain iOS-laitteella;
// muualla Natiivi-UI piilottaa napin. valmis(jaettu) kutsutaan tasan kerran pääsäikeessä
// (false = peruttu tai ei onnistunut).
using System;
using System.Collections.Generic;
using UnityEngine;
#if UNITY_IOS && !UNITY_EDITOR
using System.Runtime.InteropServices;
using AOT;
#endif

namespace Matkakirja.Natiivi
{
    public static class Jakaminen
    {
        public static bool Saatavilla
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

        /// <summary>Avaa jakoarkin tekstille. Ilman liitännäistä valmis(false) heti.</summary>
        public static void JaaTeksti(string teksti, Action<bool> valmis = null)
        {
#if UNITY_IOS && !UNITY_EDITOR
            if (Saatavilla && !string.IsNullOrEmpty(teksti))
            {
                int id;
                lock (kesken) { id = ++seuraava; kesken[id] = valmis; }
                try { MatkakirjaJako_Jaa(id, teksti, ValmisKutsu); return; }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA jako: " + e.Message); lock (kesken) kesken.Remove(id); }
            }
#endif
            try { valmis?.Invoke(false); } catch (Exception e) { Debug.LogException(e); }
        }

#if UNITY_IOS && !UNITY_EDITOR
        delegate void ValmisFn(int pyynto, int jaettu);
        static readonly ValmisFn ValmisKutsu = Valmis;
        static readonly Dictionary<int, Action<bool>> kesken = new Dictionary<int, Action<bool>>();
        static int seuraava;

        [DllImport("__Internal")]
        static extern void MatkakirjaJako_Jaa(int pyynto, string teksti, ValmisFn valmis);

        [MonoPInvokeCallback(typeof(ValmisFn))]
        static void Valmis(int pyynto, int jaettu)
        {
            try
            {
                Action<bool> v;
                lock (kesken)
                {
                    if (!kesken.TryGetValue(pyynto, out v)) return;
                    kesken.Remove(pyynto);
                }
                v?.Invoke(jaettu != 0);
            }
            catch (Exception e) { Debug.LogException(e); }
        }
#endif
    }
}
