// LIVIAN AVAUSESITTELY (Natiivi-UI): webin js/livia.js naytaLivianAvaus, livianAvausSarja,
// peruLivianAvaus (omistaja 29.8.2026; Raamattu "LIVIAN AVAUSESITTELY").
//
// Kun lähtövalinta pallolla alkaa (web aloitaPallolta → naytaLivianAvaus), Livia lennähtää
// mukaan kiireisellä ensiliidolla ("glideIn", omistaja "opening") ja esittäytyy kuplilla.
// Sarja kerrotaan KERRAN PER LAITE: lippu matkakirja-livia-avaus = 1 kirjoitetaan vasta,
// kun ensimmäinen kupla oikeasti näkyi.
//
// Ajoitus (web): ensimmäinen repliikki 900 ms kohdalla jo lennossa (AVAUKSEN_VIIVE), toinen
// odottaa laskeutumista; kuplien väli 280 ms (KUPLIEN_VALI); kukin kupla lukuajan
// (78 ms/merkki, 3,2–18 s) tai puheen loppuun + 400 ms (livianKuplanAjastin), napautus vie
// eteenpäin. Vähennetty liike: ei liitoa eikä viivettä. Äänet: saapuu ensimmäisellä,
// sekoilee humoristisilla (SEKOILUN_MERKIT), lahtee sarjan loputtua, jos kupla näkyi.
// Repliikki 4 (yhden reitin kupla) väistyy, kun lähtökohteita on useita; äänite kulkee
// kaanonin numerolla. Viides repliikki (opaslupaus) saa Viisaan Pöllön muotokuvan.
//
// Loppu: sarja päättyy itsestään (viimeinen puhe saa soida loppuun) tai keskeytyy, kun
// valinta tehdään (valinnassa() = false; web doPickStart → peruLivianAvaus), chat on auki,
// linssi on auki tai sovellus menee taustalle (web visibilitychange) — silloin puhe vaiennetaan.
//
// KERRAN + OHITA (omistaja 27.9.2026 klo 17.2x, web #3431 v2333 naytaLivianLyhytAvaus): kun koko esittely on nähty,
// seuraavilla uusilla matkoilla Livia lennähtää samalla sisäänliidolla, saapumistehoste soi ja YKSI kupla näkyy 900 ms
// jälkeen (vähennetty liike 0). Repliikit kiertävät (lippu matkakirja-livia-uusi-matka = seuraava indeksi), kuplassa
// Ohita; kupla pois lukuajan jälkeen, napautuksesta, Ohitasta tai valinnasta. Äänitteitä ei ole (kupla puhuu, ääni vaikenee).
// Puhelimella kupla alkaa suljettuna kuten muutkin Pulun kuplat (Pulu.TekstitPiilossa).
//
// Kutsu: LivianAvaus.Nayta(() => ValitseePallolla) lähtövalinnan alkaessa; Peru() kesken kaiken.
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class LivianAvaus
    {
        /// <summary>Laitteen lippu (webin localStorage LIVIA_AVAUS_TALLE).</summary>
        public const string Avain = "matkakirja-livia-avaus";
        const long AvauksenViive = 900, KuplienVali = 280;
        const float PuheenHanta = 400f;

        /// <summary>Kaanonin järjestysnumero kuplalle, joka väistyy usealla reitillä (web LIVIAN_YHDEN_REITIN_KUPLA).</summary>
        public const int YhdenReitinKupla = 3;

        /// <summary>LIVIAN AVAUSREPLIIKIT — KAANONIA (päätoimittaja 29.8.2026). Sanatarkkoja: ei muokata täällä.</summary>
        public static readonly string[] Repliikit =
        {
            "Hei, odotas kaveri. Sinähän olet ihan hiessä.",
            "Minä olen Livia. Pöllö luki isoisäsi kirjan, ja minä kannoin ne sähkeet.",
            "Valitse rauhassa mistä aloitat — vaikka se maanosa, joka kutkuttaa eniten.",
            "Ai niin, ja anteeksi valikoima: pöllö on tarkistanut vasta yhden reitin. Ateenasta se alkaa.",
            "Perillä sinua odottaa Viisas Pöllö. Minä olen vain viestinviejä.",
        };

        /// <summary>Uuden matkan lyhyet tervehdykset (web LIVIAN_UUSI_MATKA; Pelikoodarin luonnos, Fable hyväksyy).</summary>
        public static readonly string[] UusiMatka =
        {
            "Taas matkaan? Hyvä. Isoisäsi kirjassa on sivuja, joita kukaan ei ole lukenut.",
            "Uusi matka, uudet sähkeet. Valitse lähtö — minä hoidan postin.",
            "Sinä taas. Kartta on sama, mutta tällä kertaa mennään eri järjestyksessä.",
        };

        /// <summary>Lyhyen tervehdyksen kierto (web LIVIA_UUSI_MATKA_TALLE): seuraavan repliikin numero.</summary>
        public const string UusiMatkaAvain = "matkakirja-livia-uusi-matka";

        /// <summary>Seuraava lyhyt repliikki kierrosta; kirjaa seuraavan numeron talteen (web livianUudenMatkanRepliikki).</summary>
        public static string UudenMatkanRepliikki()
        {
            int n = UusiMatka.Length, i = ((PlayerPrefs.GetInt(UusiMatkaAvain, 0) % n) + n) % n;
            PlayerPrefs.SetInt(UusiMatkaAvain, (i + 1) % n);
            PlayerPrefs.Save();
            return UusiMatka[i];
        }

        /// <summary>Äänitteiden versiokysely (web LIVIAN_AANITETYT + LIVIAN_AANIERAT, avaus-1…5).</summary>
        static readonly string[] Aaniversiot = { "62c6bcbd-4", "30c6eb27-4", "1446cf47-4", "b8bf54c6-4", "c7f488b4-4" };

        /// <summary>Opaslupauksen muotokuva (web assets/tietaja/viisas-pollo-muotokuva-v1.png).</summary>
        const string MuotokuvaUrl = Laukku.SivustoJuuri + "assets/tietaja/viisas-pollo-muotokuva-v1.png";
        const int MuotokuvanRepliikki = 4;

        /// <summary>Web SEKOILUN_MERKIT: repliikit, joihin kuuluu doing-ääni.</summary>
        static readonly Regex Sekoilu = new Regex("Melkein joka ikisen|ihan hiessä|anteeksi valikoima");

        static bool kesken, nakyi, liitoValmis;
        static int liidonJalkeinen = -1, pyydetty, kohteita, versio;
        static IVisualElementScheduledItem ajastin, vahti, liitoVara;
        static Func<bool> valinnassa;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaTila()
        {
            kesken = nakyi = liitoValmis = false;
            liidonJalkeinen = -1;
            ajastin = vahti = liitoVara = null;
            valinnassa = null;
            Application.focusChanged -= Fokus;
        }

        /// <summary>Onko esittely jo nähty tällä laitteella.</summary>
        public static bool Nahty => PlayerPrefs.GetInt(Avain, 0) == 1;

        /// <summary>Testaukseen: lippu pois (web localStorage.removeItem('matkakirja-livia-avaus')).</summary>
        public static void NollaaLippu()
        {
            PlayerPrefs.DeleteKey(Avain);
            PlayerPrefs.Save();
        }

        public static bool Kaynnissa => kesken;

        /// <summary>Sarja tälle pelille (web livianAvausSarja): yhden reitin kupla vain, jos kohteita ≤ 1.</summary>
        public static List<(string Teksti, int Indeksi)> Sarja(int kohteita)
        {
            var t = new List<(string, int)>();
            for (int i = 0; i < Repliikit.Length; i++)
                if (kohteita <= 1 || i != YhdenReitinKupla) t.Add((Repliikit[i], i));
            return t;
        }

        static VisualElement Kello => UiKerros.Hae().Juuri(UiKerros.Tilarivi);
        static bool Jatkuu() => valinnassa == null || valinnassa();

        /// <summary>
        /// Livia lennähtää mukaan ja esittäytyy (web naytaLivianAvaus). valinnassa = lähtövalinta
        /// yhä käynnissä (null = testi, ei valintavahtia); kohteita = valittavien lähtökohteiden
        /// määrä (oletus Aloitusnakyma.Kohteet). false = jo nähty, jo käynnissä tai ei valinnassa.
        /// </summary>
        public static bool Nayta(Func<bool> valinnassa = null, int kohteita = -1)
        {
            if (kesken) return false;
            if (valinnassa != null && !valinnassa()) return false;
            // KERRAN + OHITA: koko esittely vain ensimmäisellä kerralla laitteella.
            if (Nahty) return NaytaLyhyt(valinnassa);
            var pulu = Pulu.Hae();
            LivianAvaus.valinnassa = valinnassa;
            LivianAvaus.kohteita = kohteita >= 0 ? kohteita : Aloitusnakyma.Kohteet.Length;
            kesken = true;
            nakyi = false;
            liitoValmis = false;
            liidonJalkeinen = -1;
            pyydetty = 0;
            int v = ++versio;
            Application.focusChanged -= Fokus;
            Application.focusChanged += Fokus;

            bool vahennetty = LinssiUi.VahennettyLiike();
            void Laskeutui()
            {
                if (!kesken || v != versio || liitoValmis) return;
                liitoValmis = true;
                liitoVara?.Pause();
                if (liidonJalkeinen >= 0)
                {
                    int i = liidonJalkeinen;
                    liidonJalkeinen = -1;
                    Ajasta(() => NaytaRepliikki(i, v), KuplienVali);
                }
            }
            if (!pulu.Ensiliito(Laskeutui, vahennetty)) Laskeutui();
            // Varalla: toinen ele (esim. napautus) voi katkaista liidon ilman valmistumiskutsua.
            else if (!liitoValmis) liitoVara = Kello.schedule.Execute(Laskeutui).StartingIn((long)LiviaEleet.KestoMs("glideIn") + 200);
            Ajasta(() => NaytaRepliikki(0, v), vahennetty ? 0 : AvauksenViive);
            // Valinnan vahti (web doPickStart → peruLivianAvaus): kaupungin voi valita kesken repliikin.
            vahti?.Pause();
            if (valinnassa != null) vahti = Kello.schedule.Execute(() => { if (kesken && v == versio && !Jatkuu()) Lopeta(true); }).Every(200);
            return true;
        }

        /// <summary>
        /// Uuden matkan lyhyt tervehdys (web naytaLivianLyhytAvaus): sisäänliito + saapumistehoste + yksi kupla Ohitalla.
        /// Kupla ei odota laskeutumista, koska repliikkejä on yksi.
        /// </summary>
        static bool NaytaLyhyt(Func<bool> valinnassa)
        {
            var pulu = Pulu.Hae();
            LivianAvaus.valinnassa = valinnassa;
            kesken = true;
            nakyi = false;
            liitoValmis = true;
            liidonJalkeinen = -1;
            int v = ++versio;
            Application.focusChanged -= Fokus;
            Application.focusChanged += Fokus;
            bool vahennetty = LinssiUi.VahennettyLiike();
            pulu.Ensiliito(null, vahennetty);
            Ajasta(() =>
            {
                ajastin = null;
                if (!kesken || v != versio) return;
                bool chat = UiNakymat.Olemassa && UiNakymat.Hae().Chat.Auki;
                if (!Jatkuu() || chat || LinssiUi.Rekisteri?.Auki != null || !pulu.Nakyvissa) { Lopeta(true); return; }
                // Web jaaKappaleiksi: ≥ 3 virkettä → kaksi kappaletta ("Taas matkaan? Hyvä." | loput).
                string teksti = UudenMatkanRepliikki();
                var kupla = pulu.Sano(string.Join("\n\n", Kappalejako.Jaa(teksti)), null, null, () => Lopeta(true));
                if (kupla != null) { pulu.Kuplat.Avauskupla(kupla); pulu.Kuplat.LisaaOhita(kupla); }
                nakyi = true;
                Aanet.PulunOhjelma("saapuu");
                Ajasta(() => Lopeta(false), (long)PuluKuplat.Lukuaika(teksti));
            }, vahennetty ? 0 : AvauksenViive);
            vahti?.Pause();
            if (valinnassa != null) vahti = Kello.schedule.Execute(() => { if (kesken && v == versio && !Jatkuu()) Lopeta(true); }).Every(200);
            return true;
        }

        /// <summary>Sarja pois kesken kaiken (web peruLivianAvaus). Ei tee mitään, jos sarja ei ole käynnissä.</summary>
        public static void Peru()
        {
            if (kesken) Lopeta(true);
        }

        static void Ajasta(Action kutsu, long ms)
        {
            ajastin?.Pause();
            ajastin = Kello.schedule.Execute(kutsu).StartingIn(ms);
        }

        static void NaytaRepliikki(int i, int v)
        {
            if (!kesken || v != versio) return;
            ajastin = null;
            var sarja = Sarja(kohteita);
            var pulu = Pulu.Hae();
            // Web naytaAvauskupla: ei linssin päälle, ei auki olevan chatin taakse; sarja päättyy siististi.
            bool chat = UiNakymat.Olemassa && UiNakymat.Hae().Chat.Auki;
            if (!Jatkuu() || i >= sarja.Count || chat || LinssiUi.Rekisteri?.Auki != null || !pulu.Nakyvissa)
            {
                Lopeta(true);
                return;
            }
            var (teksti, indeksi) = sarja[i];
            float puheMs = -1f;
            var kupla = pulu.Sano(teksti, Pulu.AaniOsoite("avaus", indeksi, Aaniversiot[indeksi]), null,
                () => Seuraava(i + 1, v), klippi => puheMs = klippi != null ? klippi.length * 1000f : 0f, naytaAina: true);
            if (kupla == null) { Lopeta(true); return; }
            pulu.Kuplat.Avauskupla(kupla);
            if (indeksi == MuotokuvanRepliikki) pulu.Kuplat.LisaaMuotokuva(kupla, MuotokuvaUrl);
            // Lippu vasta kun sarja oikeasti näkyi.
            if (i == 0) { PlayerPrefs.SetInt(Avain, 1); PlayerPrefs.Save(); }
            nakyi = true;
            if (i == 0) Aanet.PulunOhjelma("saapuu");
            else if (Sekoilu.IsMatch(teksti)) Aanet.PulunOhjelma("sekoilee");
            // Kupla odottaa puheen loppuun: lukuaika on vähimmäisaika (web livianKuplanAjastin).
            float lukuaika = PuluKuplat.Lukuaika(teksti);
            Ajasta(() =>
            {
                float jaljella = (puheMs > 0 ? puheMs + PuheenHanta : 0f) - lukuaika;
                if (jaljella > 0) Ajasta(() => Seuraava(i + 1, v), (long)jaljella);
                else Seuraava(i + 1, v);
            }, (long)lukuaika);
        }

        /// <summary>Tauko ja seuraava repliikki — tai sarjan loppu (web seuraavaRepliikki). Kuittaus ja ajastin: vain kerran.</summary>
        static void Seuraava(int i, int v)
        {
            if (!kesken || v != versio || i <= pyydetty) return;
            pyydetty = i;
            ajastin?.Pause();
            ajastin = null;
            if (!liitoValmis) { liidonJalkeinen = i; return; }
            // Sarja päättyi itsestään: viimeinen repliikki saa puhua loppuun.
            if (i >= Sarja(kohteita).Count) { Lopeta(false); return; }
            Ajasta(() => NaytaRepliikki(i, v), KuplienVali);
        }

        /// <summary>Web lopetaAvaus: ajastimet ja kuplat pois; keskeytys vaientaa puheen.</summary>
        static void Lopeta(bool vaienna)
        {
            ajastin?.Pause();
            vahti?.Pause();
            liitoVara?.Pause();
            ajastin = vahti = liitoVara = null;
            kesken = false;
            versio++;
            if (nakyi) Aanet.PulunOhjelma("lahtee");
            nakyi = false;
            if (vaienna) Aanet.Pysayta(AaniKanava.Puhe);
            Application.focusChanged -= Fokus;
            var pulu = Pulu.Hae();
            pulu.PeruEnsiliito();
            liitoValmis = false;
            liidonJalkeinen = -1;
            valinnassa = null;
            pulu.Kuplat.TyhjennaKaikki();
        }

        static void Fokus(bool fokus)
        {
            if (!fokus) Peru();
        }
    }
}
