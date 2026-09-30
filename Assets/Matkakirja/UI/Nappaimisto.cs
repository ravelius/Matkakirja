// NÄPPÄIMISTÖKERROS (Natiivi-UI 30.9.2026, omistaja klo 22.4x: "lisää nuolinäppäimet kuvien ja lehtien sivujen yms.
// selailuun"): fyysinen näppäimistö (Mac ja iPad) — ← → selaa sitä, mitä nyt selataan pyyhkäisyllä tai ‹ ›:llä, ↑ ↓ vierittää,
// Esc sulkee päällimmäisen (muuten kaikki kuten "ui sulje"). Kosketus ennallaan. Näkymät rekisteröivät itsensä
// prioriteetilla (suurin ensin: koko ruudun kuvasuurennos 100 > lehti 50); vain auki olevat vastaavat.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

namespace Matkakirja.Natiivi
{
    public static class Nappaimisto
    {
        sealed class Kasittelija
        {
            public int Prioriteetti;
            public Func<bool> Auki;
            public Action<int> Vaaka, Pysty;
            public Action Sulje;
            public string Nimi;
        }

        static readonly List<Kasittelija> kasittelijat = new List<Kasittelija>();
        static bool kytketty;

        /// <summary>Viimeisin toiminto testikomentoon (ui nappain).</summary>
        public static string Viimeisin { get; private set; } = "–";

        /// <summary>Rekisteröi näkymän; palauttaa avaimen poistoon (Poista), esim. paneelista irrotettaessa.</summary>
        public static object Rekisteroi(string nimi, int prioriteetti, Func<bool> auki, Action<int> vaaka, Action<int> pysty = null, Action sulje = null)
        {
            var h = new Kasittelija { Nimi = nimi, Prioriteetti = prioriteetti, Auki = auki, Vaaka = vaaka, Pysty = pysty, Sulje = sulje };
            kasittelijat.Add(h);
            kasittelijat.Sort((a, b) => b.Prioriteetti.CompareTo(a.Prioriteetti));
            if (!kytketty && UiKerros.Olemassa) { kytketty = true; UiKerros.Hae().JokaRuutu += Paivita; }
            return h;
        }

        public static void Poista(object avain) { if (avain is Kasittelija h) kasittelijat.Remove(h); }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { kasittelijat.Clear(); kytketty = false; Viimeisin = "–"; }

        static void Paivita()
        {
            var k = Keyboard.current;
            if (k == null) return;
            if (k.leftArrowKey.wasPressedThisFrame) Paina("vasen");
            else if (k.rightArrowKey.wasPressedThisFrame) Paina("oikea");
            else if (k.upArrowKey.wasPressedThisFrame) Paina("ylos");
            else if (k.downArrowKey.wasPressedThisFrame) Paina("alas");
            else if (k.escapeKey.wasPressedThisFrame) Paina("esc");
        }

        /// <summary>Näppäin nimellä (myös testikomento): vasen | oikea | ylos | alas | esc.</summary>
        public static string Paina(string nappain)
        {
            foreach (var h in kasittelijat.ToArray()) // kopio: sulkeminen voi poistaa käsittelijän kesken silmukan
            {
                bool auki;
                try { auki = h.Auki(); } catch (Exception) { auki = false; }
                if (!auki) continue;
                switch (nappain)
                {
                    case "vasen": if (h.Vaaka == null) continue; h.Vaaka(-1); break;
                    case "oikea": if (h.Vaaka == null) continue; h.Vaaka(1); break;
                    case "ylos": if (h.Pysty == null) continue; h.Pysty(-1); break;
                    case "alas": if (h.Pysty == null) continue; h.Pysty(1); break;
                    case "esc": if (h.Sulje == null) continue; h.Sulje(); break;
                    default: return Viimeisin = "tuntematon " + nappain;
                }
                Ruudunpaivitys.Herata(0.2f);
                return Viimeisin = nappain + " → " + h.Nimi;
            }
            if (nappain == "esc") { UiNakymat.Hae()?.SuljeKaikki(); return Viimeisin = "esc → sulje kaikki"; }
            return Viimeisin = nappain + " → ei vastaanottajaa";
        }
    }
}
