// NIMIKYLTTI (omistaja 5.10.2026 klo 23.1x, Raamattu PR #4030; Päätoimittajan lista kuitattu junaan 146): näkymien, kohteiden
// ja maiden nimikyltit näkyvät saavuttaessa tai vaihtuessa noin 3 s ja häivytetään 200 ms:ssa (--tk-kesto-sulku). Häivytetty
// kyltti ei ota kosketuksia (visibility hidden); seuraava saapuminen tai vaihto tuo sen takaisin. Pidä(true) pitää kyltin
// näkyvissä (esim. avattu kartuscha) ja käynnistää 3 s:n laskun uudelleen vapautettaessa.
// Häivytys tehdään omalla opasiteettiajolla (ei USS-siirtymää), jotta elementin omat siirtymät eivät muutu.
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Nimikyltti
    {
        public const int NakyyMs = 3000;

        readonly VisualElement e;
        IVisualElementScheduledItem lasku, haivytys;
        string avain;
        bool pidetaan, haipynyt;

        public Nimikyltti(VisualElement e) { this.e = e; }

        /// <summary>Häivytetty (ei näy eikä ota kosketuksia).</summary>
        public bool Haipynyt => haipynyt;

        /// <summary>Saapuminen tai vaihto: kyltti esiin ja 3 s:n lasku. Sama avain uudelleen ei käynnistä laskua (null = aina).</summary>
        public void Nayta(string uusiAvain = null)
        {
            if (uusiAvain != null && uusiAvain == avain) return;
            avain = uusiAvain;
            haivytys?.Pause();
            haipynyt = false;
            e.style.visibility = StyleKeyword.Null;
            e.style.opacity = StyleKeyword.Null;
            Laske();
        }

        /// <summary>Unohtaa avaimen: seuraava Nayta samalla avaimella näyttää kyltin (esim. linssi suljettiin ja avattiin).</summary>
        public void Nollaa() { avain = null; }

        /// <summary>Pidä näkyvissä (true) tai päästä häipymään 3 s:n kuluttua (false).</summary>
        public void Pida(bool pida)
        {
            if (pida == pidetaan) return;
            pidetaan = pida;
            if (pida) { lasku?.Pause(); haivytys?.Pause(); haipynyt = false; e.style.visibility = StyleKeyword.Null; e.style.opacity = StyleKeyword.Null; }
            else Laske();
        }

        void Laske()
        {
            lasku?.Pause();
            if (pidetaan) return;
            lasku = e.schedule.Execute(Haivyta).StartingIn(NakyyMs);
        }

        void Haivyta()
        {
            if (pidetaan) return;
            float alku = Time.unscaledTime, kesto = Tyylikirja.Kesto.Sulku / 1000f;
            haivytys?.Pause();
            haivytys = e.schedule.Execute(() =>
            {
                float t = Mathf.Clamp01((Time.unscaledTime - alku) / kesto);
                e.style.opacity = 1f - t;
                if (t < 1f) return;
                haivytys.Pause();
                haipynyt = true;
                e.style.visibility = Visibility.Hidden;
            }).Every(0);
        }
    }
}
