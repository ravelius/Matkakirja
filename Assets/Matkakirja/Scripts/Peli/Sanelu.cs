// SANELU: pöllön mikrofoni natiivissa (Pelikoodari, 24.9.2026).
//
// Webissä js/pollo.js aloitaSanelu/aloitaNatiiviSanelu (SpeechRecognition fi-FI,
// interimResults, continuous=false; iOS-kuoressa SaneluSilta.swift). Natiivissa
// Plugins/iOS/MatkakirjaSanelu.mm: SFSpeechRecognizer fi-FI, tunnistus laitteella kun
// laite osaa, luvat (puheentunnistus + mikrofoni) kysytään vasta Aloita-kutsussa.
//
// KULKU (kuten webissä):
//   Aloita → Alkoi (äänet tauolle; UI: "Käynnistän mikrofonia…")
//          → MikrofoniAuki (UI: "Kuuntelen…", web onaudiostart)
//          → osittainen(teksti) joka kerta kun tunnistettu teksti muuttuu
//          → sanelu päättyy: Lopeta (mikkinappi), hiljaisuus puheen jälkeen, ei puhetta
//            alussa, aikaraja tai keskeytys (taustalle, puhelu, luenta alkaa)
//          → Loppui (mikrofoni kiinni, ääni-istunto palautettu; äänet takaisin)
//          → valmis(teksti) TAI virhe(lause) tasan kerran.
//   valmis saa tyhjän tekstin vain, kun pelaaja lopetti napista ennen kuin mitään
//   tunnistettiin (web: ei kysymystä, ei moitetta). Itsestään päättynyt sanelu ilman
//   puhetta on virhe "En kuullut mitään. Yritä uudelleen." (ViimeisinVirhe = EiKuultu).
//   Peruuta (web lopetaSanelu ilman lähetystä, esim. paneeli suljetaan): ei valmis/virhe.
//
// Virhelauseet ovat valmiita suomenkielisiä rivejä tilariville. ViimeisinVirhe kertoo
// lajin pöllön reaktiota varten (web virhereaktio: Lupa → 'mikrofoni.virhe.lupa' ja
// kirjoitustilaan, muut → 'mikrofoni.eikuullut').
//
// Alkoi/Loppui ovat B7-äänisoittimen kytkentä (spesifikaatio §2.8: maisema ja pohjaraita
// pysäytetään sanelun ajaksi). Ne tulevat aina parina, myös Peruutassa.
// Luenta: Aloita pysäyttää soivan Puheen (kuori: sanelu.aloita → luenta.pysayta), ja
// sanelun aikana alkava Puhe keskeyttää sanelun (kuori: luenta.puhu → sanelu.keskeyta),
// koska mikrofoni kuulisi luennan pelaajan puheena.
//
// Editorissa ja muilla alustoilla Saatavilla = false ja Aloita antaa heti virheen.
using System;
using UnityEngine;
#if UNITY_IOS && !UNITY_EDITOR
using System.Runtime.InteropServices;
using System.Text;
using AOT;
#endif

namespace Matkakirja.Natiivi
{
    public enum SaneluVirhe
    {
        Ei = 0,
        /// <summary>Laite tai kieli ei tue sanelua, tai tunnistus ei ole juuri nyt käytettävissä.</summary>
        EiSaatavilla = 1,
        /// <summary>Mikrofoni- tai puheentunnistuslupa puuttuu.</summary>
        Lupa = 2,
        /// <summary>Sanelu päättyi itsestään ilman tunnistettua puhetta.</summary>
        EiKuultu = 3,
        /// <summary>Taustalle meno, puhelu, luenta tms. ennen kuin mitään tunnistettiin.</summary>
        Keskeytyi = 4,
        Muu = 5,
    }

    public static class Sanelu
    {
        /// <summary>Hiljaisuus viimeisen tunnistetun muutoksen jälkeen, jonka jälkeen sanelu päättyy (web continuous=false).</summary>
        public const int HiljaisuusMs = 1500;
        /// <summary>Jos alussa ei tunnisteta mitään tässä ajassa, sanelu päättyy (Chromen no-speech ~8 s).</summary>
        public const int AlkuMs = 8000;
        /// <summary>Yhden sanelun enimmäiskesto (SFSpeechRecognizerin raja on noin minuutti).</summary>
        public const int EnintaanMs = 55000;

        /// <summary>Äänet tauolle: sanelu ottaa ääni-istunnon (luvat on saatu, mikrofoni avautuu).</summary>
        public static event Action Alkoi;
        /// <summary>Mikrofoni on oikeasti auki (UI: "Kuuntelen…").</summary>
        public static event Action MikrofoniAuki;
        /// <summary>Mikrofoni kiinni ja ääni-istunto palautettu: äänet saavat jatkaa.</summary>
        public static event Action Loppui;

        /// <summary>Aloita kutsuttu eikä valmis/virhe ole vielä tullut (lupien odotus mukaan lukien).</summary>
        public static bool Kaynnissa => nykyinen != 0;
        /// <summary>Mikrofoni auki (MikrofoniAuki … Loppui).</summary>
        public static bool Kuuntelee { get; private set; }
        /// <summary>Viimeisimmän virhe-kutsun laji.</summary>
        public static SaneluVirhe ViimeisinVirhe { get; private set; }

        static int nykyinen, seuraava;
        static Action<string> osittainenKutsu, valmisKutsu, virheKutsu;
        static bool aaniTauolla;
        static Puhe kuunneltuPuhe;

        /// <summary>
        /// Voiko tällä laitteella sanella: iOS-laite, Info.plistissä NSMicrophoneUsageDescription ja
        /// NSSpeechRecognitionUsageDescription, ja SFSpeechRecognizer tukee suomea. Lupia ei kysytä.
        /// </summary>
        public static bool Saatavilla
        {
            get
            {
#if UNITY_IOS && !UNITY_EDITOR
                if (Application.platform != RuntimePlatform.IPhonePlayer) return false;
                try { return MatkakirjaSanelu_Saatavilla() != 0; }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA sanelu: " + e.Message); return false; }
#else
                return false;
#endif
            }
        }

        /// <summary>
        /// Aloittaa sanelun. Kesken oleva sanelu perutaan (sen valmis/virhe jää tulematta).
        /// Kaikki kutsut tulevat pääsäikeessä, eivät koskaan tämän kutsun sisältä iOS:ssä.
        /// </summary>
        public static void Aloita(Action<string> osittainen, Action<string> valmis, Action<string> virhe)
        {
            if (nykyinen != 0) Peruuta();
            ViimeisinVirhe = SaneluVirhe.Ei;
            if (!Saatavilla)
            {
                ViimeisinVirhe = SaneluVirhe.EiSaatavilla;
                virhe?.Invoke("Sanelu ei ole käytettävissä tällä laitteella.");
                return;
            }
#if UNITY_IOS && !UNITY_EDITOR
            int id = ++seuraava;
            nykyinen = id;
            osittainenKutsu = osittainen;
            valmisKutsu = valmis;
            virheKutsu = virhe;
            // Luenta ei soi päälle (kuori: sanelu.aloita → luenta.pysayta).
            var puhe = Puhe.Instanssi;
            if (puhe != null)
            {
                if (puhe.Soi || puhe.SoivaUrl != null) puhe.Pysayta(0.2f);
                kuunneltuPuhe = puhe;
                puhe.Puhuu += PuheMuuttui;
            }
            try { MatkakirjaSanelu_Aloita(id, HiljaisuusMs, AlkuMs, EnintaanMs, TapahtumaKutsu); }
            catch (Exception e)
            {
                Debug.LogWarning("MATKAKIRJA sanelu: aloitus epäonnistui: " + e.Message);
                Paatos(id, false, (int)SaneluVirhe.Muu, "Sanelu ei käynnisty juuri nyt.");
            }
#endif
        }

        /// <summary>Mikkinappi: mikrofoni kiinni, viimeistelty teksti tulee valmis-kutsussa.</summary>
        public static void Lopeta()
        {
#if UNITY_IOS && !UNITY_EDITOR
            if (nykyinen == 0) return;
            try { MatkakirjaSanelu_Lopeta(nykyinen); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA sanelu: " + e.Message); }
#endif
        }

        /// <summary>Kaikki kiinni ilman tulosta (paneeli suljetaan). Loppui tulee, valmis/virhe ei.</summary>
        public static void Peruuta()
        {
#if UNITY_IOS && !UNITY_EDITOR
            int id = nykyinen;
            if (id == 0) return;
            Tyhjenna();
            try { MatkakirjaSanelu_Peruuta(id); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA sanelu: " + e.Message); }
#endif
        }

        static void Tyhjenna()
        {
            nykyinen = 0;
            osittainenKutsu = valmisKutsu = virheKutsu = null;
            if (kuunneltuPuhe != null) kuunneltuPuhe.Puhuu -= PuheMuuttui;
            kuunneltuPuhe = null;
        }

        static void PuheMuuttui(bool puhuu)
        {
#if UNITY_IOS && !UNITY_EDITOR
            // Luenta alkoi kesken sanelun (kuori: luenta.puhu → sanelu.keskeyta).
            if (!puhuu || nykyinen == 0) return;
            try { MatkakirjaSanelu_Keskeyta(nykyinen); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA sanelu: " + e.Message); }
#endif
        }

        static void Laukaise(Action tapahtuma, string nimi)
        {
            try { tapahtuma?.Invoke(); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA sanelu: " + nimi + ": " + e); }
        }

        static void Paatos(int id, bool onnistui, int koodi, string teksti)
        {
            if (id != nykyinen) return;
            var valmis = valmisKutsu;
            var virhe = virheKutsu;
            Tyhjenna();
            if (onnistui) valmis?.Invoke(teksti ?? "");
            else
            {
                ViimeisinVirhe = Enum.IsDefined(typeof(SaneluVirhe), koodi) ? (SaneluVirhe)koodi : SaneluVirhe.Muu;
                virhe?.Invoke(teksti ?? "");
            }
        }

#if UNITY_IOS && !UNITY_EDITOR
        // Lajit: MatkakirjaSanelu.mm (enum alussa).
        const int Osittainen = 0, Valmis = 1, Virhe = 2, AlkoiLaji = 3, Kuuntelu = 4, LoppuiLaji = 5;

        delegate void TapahtumaFn(int pyynto, int laji, int koodi, IntPtr teksti);

        // Staattinen delegaatti: IL2CPP tekee MonoPInvokeCallback-metodille C-osoittimen,
        // ja kenttä pitää delegaatin elossa koko ajon.
        static readonly TapahtumaFn TapahtumaKutsu = Tapahtuma;

        [DllImport("__Internal")] static extern int MatkakirjaSanelu_Saatavilla();
        [DllImport("__Internal")] static extern void MatkakirjaSanelu_Aloita(int pyynto, int hiljaisuusMs, int alkuMs, int enintaanMs, TapahtumaFn kutsu);
        [DllImport("__Internal")] static extern void MatkakirjaSanelu_Lopeta(int pyynto);
        [DllImport("__Internal")] static extern void MatkakirjaSanelu_Keskeyta(int pyynto);
        [DllImport("__Internal")] static extern void MatkakirjaSanelu_Peruuta(int pyynto);

        /// <summary>UTF-8 C-merkkijono → string (natiivipuskuri on voimassa vain kutsun ajan).</summary>
        static string Utf8(IntPtr p)
        {
            if (p == IntPtr.Zero) return "";
            int n = 0;
            while (Marshal.ReadByte(p, n) != 0) n++;
            if (n == 0) return "";
            var tavut = new byte[n];
            Marshal.Copy(p, tavut, 0, n);
            return Encoding.UTF8.GetString(tavut);
        }

        [MonoPInvokeCallback(typeof(TapahtumaFn))]
        static void Tapahtuma(int pyynto, int laji, int koodi, IntPtr tekstiOs)
        {
            // Poikkeus ei saa karata natiivikoodiin (IL2CPP kaatuisi).
            try
            {
                switch (laji)
                {
                    case AlkoiLaji:
                        if (aaniTauolla) return;
                        aaniTauolla = true;
                        Laukaise(Alkoi, "Alkoi");
                        return;
                    case Kuuntelu:
                        if (pyynto != nykyinen) return;
                        Kuuntelee = true;
                        Laukaise(MikrofoniAuki, "MikrofoniAuki");
                        return;
                    case LoppuiLaji:
                        Kuuntelee = false;
                        if (!aaniTauolla) return;
                        aaniTauolla = false;
                        Laukaise(Loppui, "Loppui");
                        return;
                    case Osittainen:
                        if (pyynto != nykyinen) return;
                        osittainenKutsu?.Invoke(Utf8(tekstiOs));
                        return;
                    case Valmis:
                        Paatos(pyynto, true, 0, Utf8(tekstiOs));
                        return;
                    case Virhe:
                        Paatos(pyynto, false, koodi, Utf8(tekstiOs));
                        return;
                }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA sanelu: tapahtuma " + laji + ": " + e); }
        }
#endif
    }
}
