// LIVIAN TUURAUSPALJASTUS JA SAAPUMISEN OHJEKUPLAT (Natiivi-UI, liikkumisen pariteetti C16): webin
// js/livia.js naytaLivianPaljastus + paljastusRepliikki + odotaLuenta ja js/ui.js saapumisenKuplat +
// saapumisenOhjekuplat. Vain aloituslennon jälkeen, ei tavallisilla saapumisilla.
//
// ENSIMMÄINEN SAAPUMINEN KOSKAAN (laitelippu matkakirja-livia-paljastus + istunnon lippu; omistaja
// 7.9.2026, repliikit sanatarkkoja): isoisän luenta on lykätty (PeliOhjain.Lykkays.cs). 1800 ms saapumisen
// jälkeen pulu sanoo kaksi kuplaa (kumpikin lukuajan tai puheen loppuun + 400 ms; napautus vie eteenpäin),
// toisen jälkeen luenta päästetään liikkeelle ja sarja odottaa sen loppua (ilman luentaa 3,2 s). Pulu on
// hiljaa luennan ajan; kommentti (Saapumisesitys) tulee sarjan jälkeen. Linssin ajan sarja odottaa (700 ms).
// Äänite on vain äänitetylle variantille (Ateenaan / Ateenaa, web LIVIAN_AANITETTY_PALJASTUS).
//
// MUUT ALOITUSLENNOT: luennan jälkeen +900 ms (ilman luentaa 1800 ms) ohjekupla "Tervetuloa X. Sinun on
// ratkaistava tehtävä Y ennen kuin voit etsiä aarretta." ja +2500 ms "Klikkaa kaupungin kultaista merkkiä
// kartalla." (web ui.js:821–828, polloVihje + polloLisavihje).
//
// Traileri: saapumiskuplat odottavat, kunnes silmukka on kartalla (web odotaLivianTraileria). Paikan puheen
// vaiennus (Ohita, lähtö) ja kaupungin vaihto katkaisevat sarjan.
using System;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class LivianPaljastus
    {
        /// <summary>Laitteen lippu (web LIVIA_PALJASTUS_TALLE).</summary>
        public const string Avain = "matkakirja-livia-paljastus";

        /// <summary>Web SAAPUMISEN_KUPLA_MS, SAAPUMISEN_KUPLA_VALI_MS, SAAPUMISEN_KUPLA_LUENNAN_JALKEEN_MS.</summary>
        const long KuplaMs = 1800, KuplaValiMs = 2500, LuennanJalkeenMs = 900;
        /// <summary>Web PALJASTUKSEN_LINSSIVALI ja LUENNAN_VARAVIIVE (= LUKUAIKA_VAHINTAAN 3,2 s).</summary>
        const long LinssiValiMs = 700, LuennanVaraviiveMs = 3200;
        const float PuheenHanta = 400f;
        /// <summary>Kuinka kauan saapuminen saa odottaa karttaa (traileri, välikortti).</summary>
        const float KarttaOdotusS = 240f;

        const string OhjeToinen = "Klikkaa kaupungin kultaista merkkiä kartalla.";

        /// <summary>Äänitetty variantti (web LIVIAN_AANITETTY_PALJASTUS) ja äänitteiden versiot (paljastus-1, -2).</summary>
        const string AanitettyPaikkaan = "Ateenaan";
        static readonly string[] Aaniversiot = { "4dd412c2-4", "55959b90-4" };

        /// <summary>LIVIAN PALJASTUS — KAANONIA (web livianPaljastus, kaksi ensimmäistä; sanatarkkoja).</summary>
        public static string[] Repliikit(string paikkaan)
        {
            string tervetuloa = string.IsNullOrEmpty(paikkaan) ? "Tervetuloa." : "Tervetuloa " + paikkaan + ".";
            return new[]
            {
                "Kääk, apua! Pöllö on matkoilla, mutta ei hätää, tuuraan häntä sen aikaa.",
                tervetuloa + " Kuunnellaan, mitä isoisä on kirjoittanut tästä paikasta.",
            };
        }

        static PeliOhjain ohjain;
        static bool annettu, kesken, luentaSoi;
        static string kaupunki;
        static int versio;
        static IVisualElementScheduledItem ajastin;
        static Action luennanLoppu;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaTila()
        {
            ohjain = null;
            annettu = kesken = luentaSoi = false;
            kaupunki = null;
            ajastin = null;
            luennanLoppu = null;
        }

        /// <summary>Onko paljastus jo nähty tällä laitteella.</summary>
        public static bool Nahty => PlayerPrefs.GetInt(Avain, 0) == 1;

        /// <summary>Web livianPaljastusKesken: sarja tulossa tai käynnissä → pulun kommentti odottaa.</summary>
        public static bool Kesken => kesken;

        /// <summary>Testaukseen: lippu pois (web localStorage.removeItem('matkakirja-livia-paljastus')).</summary>
        public static void NollaaLippu()
        {
            PlayerPrefs.DeleteKey(Avain);
            PlayerPrefs.Save();
            annettu = false;
        }

        static VisualElement Kello => UiKerros.Hae().Juuri(UiKerros.Tilarivi);

        /// <summary>Kytkentä pelin silmukkaan (UiNakymat).</summary>
        public static void Kytke(PeliOhjain o)
        {
            ohjain = o;
            // Synkroninen kysymys ennen saapumista (web luennanLykkays = livianPaljastusOdottaa).
            o.EnsisaapumisenLykkays = _ => !annettu && !Nahty;
            // AloituslentoLoppui laukaisee tapahtuman ENNEN Perilla → AsetaLykkays (Pelikoodarin havainto 25.9.): Saapui
            // seuraavaan ruutuun, jotta LuentaLykatty(k) on jo asetettu (muuten paljastus = false ja luenta alkaa heti).
            o.AloituslentoPaattyi += k => UiKerros.PaaSaikeessa(() => Kello.schedule.Execute(() => Saapui(k)));
            o.PaikanPuheVaiennettu += () => UiKerros.PaaSaikeessa(Peru);
            o.LuentoAlkoi += (k, _) => UiKerros.PaaSaikeessa(() => { if (k != null && k == kaupunki) luentaSoi = true; });
            o.LuentoLoppui += k => UiKerros.PaaSaikeessa(() =>
            {
                if (k == null || k != kaupunki) return;
                luentaSoi = false;
                var jatko = luennanLoppu;
                luennanLoppu = null;
                jatko?.Invoke();
            });
        }

        static void Ajasta(Action kutsu, long ms)
        {
            ajastin?.Pause();
            ajastin = Kello.schedule.Execute(kutsu).StartingIn(ms);
        }

        static bool Voimassa(int v) => v == versio && ohjain != null && ohjain.PelaajanKaupunki == kaupunki;

        /// <summary>Aloituslento perillä: saapumiskuplat, kun silmukka on kartalla (traileri ja välikortti ohi).</summary>
        static void Saapui(string k)
        {
            if (ohjain == null || string.IsNullOrEmpty(k)) return;
            Lopeta();
            int v = ++versio;
            kaupunki = k;
            luentaSoi = ohjain.SoivaLuento?.Kaupunki == k;
            bool paljastus = ohjain.LuentaLykatty(k);
            // Paljastus on tämän saapumisen puheenvuoro heti: kommentti odottaa (web livianPaljastusKesken).
            kesken = paljastus;
            float alku = Time.realtimeSinceStartup;
            IVisualElementScheduledItem odota = null;
            odota = Kello.schedule.Execute(() =>
            {
                if (v != versio) { odota.Pause(); return; }
                if (ohjain.PelaajanKaupunki != k || Time.realtimeSinceStartup - alku > KarttaOdotusS)
                {
                    odota.Pause();
                    Lopeta();
                    ohjain.AloitaLykattyLuenta(); // lykkäys ei saa jäädä ylös (tarkistaa itse kaupungin)
                    return;
                }
                if (ohjain.Tila != SilmukanTila.Kartta) return;
                odota.Pause();
                // Web saapumisenKuplat: luenta soi → 900 ms sen jälkeen, muuten 1800 ms (varapolku).
                if (luentaSoi) { luennanLoppu = () => Ajasta(() => Kuplat(v), LuennanJalkeenMs); return; }
                Ajasta(() =>
                {
                    // Luenta ehti alkaa varapolun aikana: odotetaan sen loppu (web: kupla ei kertojan päälle).
                    if (luentaSoi && Voimassa(v)) { luennanLoppu = () => Ajasta(() => Kuplat(v), LuennanJalkeenMs); return; }
                    Kuplat(v);
                }, KuplaMs);
            }).Every(200);
        }

        /// <summary>Web naytaKuplat: paljastus, jos se on tälle saapumiselle; muuten lykätty luenta ja ohjekuplat.</summary>
        static void Kuplat(int v)
        {
            if (!Voimassa(v)) { Lopeta(); return; }
            var tiedot = UiSisalto.Kaupunki(kaupunki);
            string nimi = tiedot?.Nimi;
            if (ohjain.LuentaLykatty(kaupunki) && !annettu)
            {
                annettu = true;
                kesken = true;
                try { PlayerPrefs.SetInt(Avain, 1); PlayerPrefs.Save(); } catch (Exception) { }
                string paikkaan = Sijamuodot.Maahan(nimi);
                Repliikki(v, 0, Repliikit(paikkaan), paikkaan == AanitettyPaikkaan);
                return;
            }
            kesken = false;
            ohjain.AloitaLykattyLuenta();
            string maa = tiedot?.MaaNimi, paikka = Sijamuodot.Paikassa(nimi);
            string tervetuloa = !string.IsNullOrEmpty(maa) && paikka.Length > 0
                ? "Tervetuloa " + Sijamuodot.Maahan(maa) + ". Sinun on ratkaistava tehtävä " + paikka + " ennen kuin voit etsiä aarretta."
                : "";
            Ohjekuplat(v, tervetuloa);
        }

        /// <summary>Web saapumisenOhjekuplat: tervetulotoivotus ja 2,5 s päästä toimintaohje (tai pelkkä ohje).</summary>
        static void Ohjekuplat(int v, string tervetuloa)
        {
            var pulu = Pulu.Hae();
            pulu.Sano(tervetuloa.Length > 0 ? tervetuloa : OhjeToinen);
            if (tervetuloa.Length == 0) return;
            Ajasta(() => { if (Voimassa(v)) pulu.Sano(OhjeToinen); }, KuplaValiMs);
        }

        /// <summary>Web paljastusRepliikki: kupla, ääni ja jatko (napautus tai ajastin, vain kerran).</summary>
        static void Repliikki(int v, int i, string[] repliikit, bool aanitetty)
        {
            ajastin?.Pause();
            ajastin = null;
            if (!Voimassa(v)) { Lopeta(true); return; }
            // Linssi päällä: sarja odottaa vuoroaan eikä katkea (web linssiEstaa, omistaja 4.9.2026).
            if (LinssiUi.Rekisteri?.Auki != null) { Ajasta(() => Repliikki(v, i, repliikit, aanitetty), LinssiValiMs); return; }
            if (i >= repliikit.Length) { Lopeta(); return; }
            string teksti = repliikit[i];
            bool viimeinen = i == repliikit.Length - 1;
            int kuitattu = 0;
            void Jatka()
            {
                if (kuitattu++ > 0 || v != versio) return;
                ajastin?.Pause();
                if (viimeinen) OdotaLuenta(v);
                else Repliikki(v, i + 1, repliikit, aanitetty);
            }
            var pulu = Pulu.Hae();
            float puheMs = -1f;
            var aani = aanitetty && i < Aaniversiot.Length ? Pulu.AaniOsoite("paljastus", i, Aaniversiot[i]) : null;
            if (!pulu.Nakyvissa)
            {
                // Kupla ei mahdu (web polloSaapumiskupla false): luenta heti liikkeelle, ei jäädä odottamaan.
                Lopeta(true);
                ohjain?.AloitaLykattyLuenta();
                return;
            }
            pulu.Sano(teksti, aani, null, Jatka, klippi => puheMs = klippi != null ? klippi.length * 1000f : 0f);
            // Kupla odottaa puheen loppuun: lukuaika on vähimmäisaika (web livianKuplanAjastin).
            float lukuaika = PuluKuplat.Lukuaika(teksti);
            Ajasta(() =>
            {
                float jaljella = (puheMs > 0 ? puheMs + PuheenHanta : 0f) - lukuaika;
                if (jaljella > 0) Ajasta(Jatka, (long)jaljella);
                else Jatka();
            }, (long)lukuaika);
        }

        /// <summary>Web odotaLuenta: luenta liikkeelle ja sarjan loppu sen jälkeen (ilman luentaa 3,2 s).</summary>
        static void OdotaLuenta(int v)
        {
            if (!Voimassa(v)) { Lopeta(); return; }
            if (!ohjain.AloitaLykattyLuenta()) { Ajasta(() => { if (v == versio) Lopeta(); }, LuennanVaraviiveMs); return; }
            luentaSoi = true;
            luennanLoppu = () => { if (v == versio) Lopeta(); };
        }

        /// <summary>Paikan puhe vaiennettiin (Ohita, lähtö): sarja ja ohjekuplat pois.</summary>
        static void Peru()
        {
            if (kaupunki == null) return;
            Lopeta(true);
        }

        static void Lopeta(bool vaienna = false)
        {
            ajastin?.Pause();
            ajastin = null;
            luennanLoppu = null;
            bool oliKesken = kesken;
            kesken = false;
            versio++;
            if (vaienna && oliKesken) Aanet.Pysayta(AaniKanava.Puhe);
        }
    }
}
