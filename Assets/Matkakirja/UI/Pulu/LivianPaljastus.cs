// LIVIAN TUURAUS ALOITUSKAUPUNGISSA (Natiivi-UI; omistaja 11.10.2026 klo 11.5x, PT: aloituskaupungin uusi rakenne, juna 182).
// Korvaa vanhan tuurauspaljastuksen (C16, webin naytaLivianPaljastus) ja opastuksen lauseet 1–3.
//
// JÄRJESTYS (vain alkulennon ensisaapuminen; laitelippu matkakirja-livia-paljastus, Uusi matka nollaa, LivianAvaus.NollaaEnsikerta):
//   1. alkulento → LS1:n aloitusintro (18 s, KaupunkiIntro.Paattyi(kaupunki, ohitettu)) → kartta näkyvissä
//   2. Pulu ilman kuplaa: tuuraus-1 "Kääk! Apua! Pöllö on kadonnut!" + tuuraus-2 "Kuuntele sillä välin isoisän matkakirjaa…"
//   3. KaupunkiIntro.PuluValmis(kaupunki) → LS1 päästää lykätyn luennan (ilman introa Pulu kutsuu itse AloitaLykattyLuenta)
//   4. LUENNAN JÄLKEEN tilarivi: ohje-1 1 s luennan lopusta 7 s, heti perään ohje-2 10 s (korvaavat vanhat "Tervetuloa <maahan>…"
//      ja "Klikkaa kaupungin kultaista merkkiä" -rivit aloituskaupungissa). PT 11.10. 13.5x: rivi ei saa peittää luettavaa
//      matkakirjatekstiä; tilaripohjalla ei ole toista paikkaa (yläkolmannes, kortin päällä puhelimella), joten vasta luennan jälkeen.
//   5. luennan jälkeen: tuuraus-3 "Pöllö sähkötti…" + tuuraus-4 "No, jos tulee kysyttävää, napauta minua…"; auki oleva nosto
//      suljetaan ensin (odotetaan). Aloituskaupungin oma Pulu-kommentti ja kuvat jäävät pois (Saapumisesitys, Aloituskaupunki).
// Myöhemmillä aloituslennoilla (lippu nähty) vain kohta 4. Äänet Pelikoodarilta: aanet/pulu/tuuraus-v2/livia-tuuraus-n.mp3.
//
// LS1:n rajapinta (linssiseppa/aloitusintro-182) heijastuksella, jotta haara kääntyy ilman sitä: TuleeAloitusintro(k) kertoo
// AloituslentoPaattyi-hetkellä, tuleeko intro; Paattyi-eventtiä odotetaan enintään 40 s. Luenta pysyy lykättynä
// (PeliOhjain.EnsisaapumisenLykkays) myös intron ajan. Paikan puheen vaiennus (Ohita, lähtö) ja kaupungin vaihto katkaisevat sarjan.
using System;
using System.Reflection;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class LivianPaljastus
    {
        /// <summary>Laitteen lippu (web LIVIA_PALJASTUS_TALLE): Pöllö-repliikit kuultu.</summary>
        public const string Avain = "matkakirja-livia-paljastus";

        const long KuplaMs = 1800, IntronJalkeenMs = 600, LinssiValiMs = 700, LuentaVaraMs = 5000, NostoOdotusMs = 500;
        const float PuheenHanta = 400f;
        /// <summary>Kuinka kauan saapuminen saa odottaa karttaa (traileri, välikortti) ja intron Paattyi-eventtiä.</summary>
        const float KarttaOdotusS = 240f, IntroOdotusS = 40f;
        /// <summary>Tilarivit luennan jälkeen (PT 13.5x; omistajan kestot: 7 s, heti perään 10 s).</summary>
        const long Ohje1AlkuMs = 1000;
        const float Ohje1S = 7f, Ohje2S = 10f;

        static readonly string[] Alku = { "ui.livia.tuuraus-1", "ui.livia.tuuraus-2" };
        static readonly string[] Loppu = { "ui.livia.tuuraus-3", "ui.livia.tuuraus-4" };

        static string AaniUrl(int n) => Aanet.Juuri + "aanet/pulu/tuuraus-v2/livia-tuuraus-" + n + ".mp3";

        static PeliOhjain ohjain;
        static bool annettu, kesken, luentaSoi, introTulee, ohjeetOdottaa, loppuOdottaa, introKytketty;
        static string kaupunki, aloitus;
        static int versio;
        static IVisualElementScheduledItem ajastin, ohjeAjastin;
        static Action luennanLoppu;
        static Action<string> introOdottaja;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaTila()
        {
            ohjain = null;
            annettu = kesken = luentaSoi = introTulee = ohjeetOdottaa = loppuOdottaa = introKytketty = false;
            kaupunki = aloitus = null;
            ajastin = ohjeAjastin = null;
            luennanLoppu = null;
            introOdottaja = null;
        }

        /// <summary>Onko tuuraus jo kuultu tällä laitteella (Uusi matka nollaa).</summary>
        public static bool Nahty => PlayerPrefs.GetInt(Avain, 0) == 1;

        /// <summary>Sarja tulossa tai käynnissä → Saapumisesityksen kommentti odottaa (web livianPaljastusKesken).</summary>
        public static bool Kesken => kesken;

        /// <summary>Tämän matkan aloituskaupunki; Saapumisesitys jättää siellä Pulun kommentin ja kuvat pois.</summary>
        public static string Aloituskaupunki => aloitus;

        /// <summary>Lippu pois (Uusi matka, testit).</summary>
        public static void NollaaLippu()
        {
            try { PlayerPrefs.DeleteKey(Avain); PlayerPrefs.Save(); } catch (Exception) { }
            annettu = false;
        }

        static VisualElement Kello => UiKerros.Hae().Juuri(UiKerros.Tilarivi);

        // --- LS1:n KaupunkiIntro (heijastuksella) -------------------------------------------------------------------------

        static bool TuleeIntro(string k)
        {
            var m = typeof(KaupunkiIntro).GetMethod("TuleeAloitusintro", BindingFlags.Public | BindingFlags.Static, null, new[] { typeof(string) }, null);
            try { return m != null && m.Invoke(null, new object[] { k }) is bool b && b; } catch (Exception) { return false; }
        }

        static void PuluValmis(string k)
        {
            var m = typeof(KaupunkiIntro).GetMethod("PuluValmis", BindingFlags.Public | BindingFlags.Static, null, new[] { typeof(string) }, null);
            if (m == null) { ohjain?.AloitaLykattyLuenta(); return; }
            try { m.Invoke(null, new object[] { k }); } catch (Exception e) { Debug.LogException(e); ohjain?.AloitaLykattyLuenta(); }
        }

        /// <summary>KaupunkiIntro.Paattyi (event tai Action-kenttä) → IntroPaattyi pääsäikeessä.</summary>
        static void KytkeIntro()
        {
            if (introKytketty) return;
            introKytketty = true;
            Action<string, bool> kasittelija = (k, ohitettu) => UiKerros.PaaSaikeessa(() => IntroPaattyi(k, ohitettu));
            const BindingFlags F = BindingFlags.Public | BindingFlags.Static;
            try
            {
                var ev = typeof(KaupunkiIntro).GetEvent("Paattyi", F);
                if (ev != null) { ev.AddEventHandler(null, kasittelija); return; }
                var kentta = typeof(KaupunkiIntro).GetField("Paattyi", F);
                if (kentta != null && kentta.FieldType == typeof(Action<string, bool>))
                    kentta.SetValue(null, Delegate.Combine((Delegate)kentta.GetValue(null), kasittelija));
            }
            catch (Exception e) { Debug.LogException(e); }
        }

        static void IntroPaattyi(string k, bool ohitettu)
        {
            Debug.Log($"MATKAKIRJA livia: intro päättyi {k}{(ohitettu ? " (ohitettu)" : "")}");
            var o = introOdottaja;
            introOdottaja = null;
            o?.Invoke(k);
        }

        /// <summary>Kytkentä pelin silmukkaan (UiNakymat).</summary>
        public static void Kytke(PeliOhjain o)
        {
            ohjain = o;
            KytkeIntro();
            // Synkroninen kysymys ennen saapumista: luenta odottaa Pulua (ensisaapuminen) tai intron loppua (LS1).
            o.EnsisaapumisenLykkays = k => (!annettu && !Nahty) || TuleeIntro(k);
            // AloituslentoLoppui laukaisee tapahtuman ENNEN Perilla → AsetaLykkays (Pelikoodarin havainto 25.9.): Saapui
            // seuraavaan ruutuun, jotta LuentaLykatty(k) on jo asetettu.
            o.AloituslentoPaattyi += k => UiKerros.PaaSaikeessa(() => Kello.schedule.Execute(() => Saapui(k)));
            o.PaikanPuheVaiennettu += () => UiKerros.PaaSaikeessa(Peru);
            o.LuentoAlkoi += (k, _) => UiKerros.PaaSaikeessa(() =>
            {
                if (k == null || k != kaupunki) return;
                luentaSoi = true;
            });
            o.LuentoLoppui += k => UiKerros.PaaSaikeessa(() =>
            {
                if (k == null || k != kaupunki) return;
                luentaSoi = false;
                if (ohjeetOdottaa) { ohjeetOdottaa = false; Ohjeet(k); }
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

        /// <summary>Aloituslento perillä: intron loppu (tai kartta + 1,8 s) ja sitten Pulun alkuosa.</summary>
        static void Saapui(string k)
        {
            if (ohjain == null || string.IsNullOrEmpty(k)) return;
            Lopeta();
            int v = ++versio;
            kaupunki = aloitus = k;
            loppuOdottaa = false;
            luentaSoi = ohjain.SoivaLuento?.Kaupunki == k;
            ohjeetOdottaa = true;
            introTulee = TuleeIntro(k);
            kesken = ohjain.LuentaLykatty(k) && !annettu && !Nahty;
            Debug.Log($"MATKAKIRJA livia: aloituskaupunki {k}, intro {(introTulee ? "tulee" : "ei")}, tuuraus {(kesken ? "tulee" : "ei")}");
            if (introTulee)
            {
                introOdottaja = kk => { if (kk == k && v == versio) Ajasta(() => Alkuosa(v), IntronJalkeenMs); };
                Ajasta(() =>
                {
                    if (v != versio) return;
                    introOdottaja = null;
                    introTulee = false;   // PuluValmis ei tee mitään ilman Paattyi-eventtiä → luenta suoraan AloitaLykattyLuenta
                    Debug.Log("MATKAKIRJA livia: intron loppua ei kuulunut 40 s:ssa");
                    Alkuosa(v);
                }, (long)(IntroOdotusS * 1000f));
                return;
            }
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
                Ajasta(() => Alkuosa(v), KuplaMs);
            }).Every(200);
        }

        /// <summary>Kohta 2–3: tuuraus-1 ja -2 (vain ensisaapuminen), sitten luenta liikkeelle.</summary>
        static void Alkuosa(int v)
        {
            if (!Voimassa(v)) { Lopeta(); return; }
            if (kesken && !annettu)
            {
                annettu = true;
                loppuOdottaa = true;
                try { PlayerPrefs.SetInt(Avain, 1); PlayerPrefs.Save(); } catch (Exception) { }
                Repliikki(v, Alku, 0, 1, () => VapautaLuenta(v));
                return;
            }
            VapautaLuenta(v);
        }

        /// <summary>Luenta liikkeelle (LS1:n kautta, jos intro oli) ja loppuosa luennan jälkeen (ilman luentaa 5 s).</summary>
        static void VapautaLuenta(int v)
        {
            if (!Voimassa(v)) { Lopeta(); return; }
            kesken = false;
            if (introTulee) PuluValmis(kaupunki);
            else ohjain.AloitaLykattyLuenta();
            string k = kaupunki;
            // Luenta ei alkanut (ei luentaa, ohitettu): ohjeet silti.
            Kello.schedule.Execute(() => { if (ohjeetOdottaa && !luentaSoi && ohjain?.PelaajanKaupunki == k) { ohjeetOdottaa = false; Ohjeet(k); } }).StartingIn(LuentaVaraMs);
            if (!loppuOdottaa) return;
            luennanLoppu = () => { if (v == versio) Ajasta(() => Loppuosa(v), KuplaMs); };
            // Luenta ei alkanut (ei luentaa, ohitettu): loppuosa silti.
            Kello.schedule.Execute(() => { if (v == versio && !luentaSoi && luennanLoppu != null) { luennanLoppu = null; Loppuosa(v); } }).StartingIn(LuentaVaraMs);
        }

        /// <summary>Kohta 5: tuuraus-3 ja -4; auki oleva nosto (tai chat, linssi, kertoja) odotetaan kiinni.</summary>
        static void Loppuosa(int v)
        {
            if (!Voimassa(v) || !loppuOdottaa) { Lopeta(); return; }
            bool nosto = UiNakymat.Olemassa && UiNakymat.Hae().Nostokortti.Auki;
            bool chat = UiNakymat.Olemassa && UiNakymat.Hae().Chat.Auki;
            if (nosto || chat || luentaSoi || LinssiUi.Rekisteri?.Auki != null || Aanet.KertojaPuhuu) { Ajasta(() => Loppuosa(v), NostoOdotusMs); return; }
            loppuOdottaa = false;
            Repliikki(v, Loppu, 0, 3, Lopeta);
        }

        /// <summary>Kohta 4: tilarivit luennan jälkeen (aloituskaupunki, kaikilla aloituslennoilla).</summary>
        static void Ohjeet(string k)
        {
            if (!UiNakymat.Olemassa) return;
            var rivi = UiNakymat.Hae().Tilarivi;
            ohjeAjastin?.Pause();
            ohjeAjastin = Kello.schedule.Execute(() =>
            {
                if (ohjain?.PelaajanKaupunki != k) return;
                Debug.Log("MATKAKIRJA livia: ohje 1");
                rivi.Viesti(Kieli.T("ui.livia.aloitus-ohje-1"), Ohje1S);
                ohjeAjastin = Kello.schedule.Execute(() =>
                {
                    if (ohjain?.PelaajanKaupunki != k) return;
                    Debug.Log("MATKAKIRJA livia: ohje 2");
                    rivi.Viesti(Kieli.T("ui.livia.aloitus-ohje-2"), Ohje2S);
                }).StartingIn((long)(Ohje1S * 1000f));
            }).StartingIn(Ohje1AlkuMs);
        }

        /// <summary>Repliikki ilman kuplaa (kartan kohtaus, 6.10.): ääni + ele, jatko lukuajan tai puheen loppuun + 400 ms.</summary>
        static void Repliikki(int v, string[] avaimet, int i, int aaniNro, Action valmis)
        {
            ajastin?.Pause();
            ajastin = null;
            if (!Voimassa(v)) { Lopeta(true); return; }
            // Linssi päällä: sarja odottaa vuoroaan eikä katkea (web linssiEstaa, omistaja 4.9.2026).
            if (LinssiUi.Rekisteri?.Auki != null) { Ajasta(() => Repliikki(v, avaimet, i, aaniNro, valmis), LinssiValiMs); return; }
            if (i >= avaimet.Length) { valmis?.Invoke(); return; }
            var pulu = Pulu.Hae();
            if (!pulu.Nakyvissa) { valmis?.Invoke(); return; }
            string teksti = Kieli.T(avaimet[i]);
            int kuitattu = 0;
            void Jatka()
            {
                if (kuitattu++ > 0 || v != versio) return;
                ajastin?.Pause();
                Repliikki(v, avaimet, i + 1, aaniNro + 1, valmis);
            }
            float puheMs = -1f;
            Debug.Log($"MATKAKIRJA livia: tuuraus {aaniNro}");
            pulu.Sano(teksti, AaniUrl(aaniNro), null, Jatka, klippi => puheMs = klippi != null ? klippi.length * 1000f : 0f, kuplaton: true);
            float lukuaika = PuluKuplat.Lukuaika(teksti);
            Ajasta(() =>
            {
                float jaljella = (puheMs > 0 ? puheMs + PuheenHanta : 0f) - lukuaika;
                if (jaljella > 0) Ajasta(Jatka, (long)jaljella);
                else Jatka();
            }, (long)lukuaika);
        }

        /// <summary>Paikan puhe vaiennettiin (Ohita, lähtö): sarja pois.</summary>
        static void Peru()
        {
            if (kaupunki == null) return;
            Lopeta(true);
        }

        static void Lopeta() => Lopeta(false);

        static void Lopeta(bool vaienna)
        {
            ajastin?.Pause();
            ajastin = null;
            luennanLoppu = null;
            introOdottaja = null;
            bool oliKesken = kesken || loppuOdottaa;
            kesken = false;
            if (vaienna) loppuOdottaa = false;
            versio++;
            if (vaienna && oliKesken) Aanet.Pysayta(AaniKanava.Puhe);
        }

        /// <summary>Testi (`ui livia tuuraus alku|loppu`): repliikit heti nykyisessä kaupungissa.</summary>
        public static void Testi(bool loppu)
        {
            if (ohjain == null) return;
            kaupunki = ohjain.PelaajanKaupunki;
            int v = ++versio;
            if (loppu) Repliikki(v, Loppu, 0, 3, null); else Repliikki(v, Alku, 0, 1, null);
        }
    }
}
