// PARIISIN NYKYINTRO, Unity-osa (kuvakäsikirjoitus docs/kohtaukset/pallokierros/pariisi-nykyintro.md; aikajana Ydin KaupunkiIntro).
// Kaupunkitilan esitys Pariisissa: ennen isoisän avausta 31 s nykyajan Pariisia musiikin tahdissa ("Pariisi nyt 2", Pelikoodarin
// kaupunkijakso: Aanisoitin.KaupunkiIntro + KaupunkiIntroAlkoi tahdistaa intron kellon kappaleen kohtaan). Otokset: 3D-avausnäkymä
// (kierto jatkuu, AsetaAvausKesto koko intro + avaus), Eiffel-otos kiinteällä kameralla (laatat esiladataan reittikameralla intron
// alusta otoksen loppuun) ja Codex-havainnekuvat C1–C5 koko ruudulla Ken Burnsilla. Nyt-rivi (NUI:n NytRivi) nousun kohdalla.
// Napautus intron aikana hyppää kohtaukseen 7 (Aanisoitin.KaupunkiIntroOhita, NytRivi.Piilota). Isoisän avaus 33,5 s (ilman C5:tä
// 31,5 s). Kun intro soitettiin, 1. kyydin opastus siirtyy ensimmäisen pysähdyksen (Notre-Dame) kerronnan jälkeen ennen lähtöä:
// silmukka saa AaniLoppui vasta opastuksen jälkeen (sama odotus kuin kertojan äänellä). Kytkin "opas intro 0|1|tila|ohita".
// UI-POHJA: koko ruudun kuvalle ei ole omaa pohjaa → LATAUSKUVA-pohja (Latauskuva: koko ruudun kuva, peittävä rajaus, Ken Burns
// juuren skaalana kuten TaustaLahentyy) UiKerros.Nostot-kerroksessa linssin napien alla; havainnekuva-merkintä oppaan nimilapun
// pohjalla (sama kuin NytRivi) oikeaan alakulmaan; napautuksen sieppaus OpasKuvanoston sulkijan mallilla (näkymätön, koko ruutu).
using System;
using System.Collections;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed partial class OpasSovitin
    {
        /// <summary>Nykyintro Pariisissa (oletus päällä; komento "opas intro 0|1"). Muut kaupungit kuten ennen.</summary>
        public static bool IntroPaalla = true;

        bool introKaynnissa, introAvausVapaa = true, introOhitusPyynto;
        /// <summary>Intro soitettiin tällä esityksellä ja 1. kyydin opastus odottaa ensimmäistä pysähdystä.</summary>
        bool opastusSiirretty;
        string opastusUrl;
        int introVersio;
        float esitysAlku;
        /// <summary>Esityksen alusta avauksen ääneen (s): avauskehyksen kierron mitoitus (kierto alkoi jo intron alussa).</summary>
        double avausEnnenS;
        /// <summary>Eiffel-otoksen kamera (PaivitaKamera kuvaa tämän silmukan asennon sijaan) ja sen esilatausnäkymä.</summary>
        Kuvakulma? introKamera, introEsilataus;
        readonly Texture2D[] introKuvat = new Texture2D[KaupunkiIntro.Kuvia + 1];
        static IntroKerros introKerros;

        /// <summary>Avauskehyksen kierron lisä avauksen jälkeen: opastus (ellei kuultu tai siirretty pysähdykselle) + lepo.</summary>
        double AvausLisaS => (OpastusKuultu || opastusSiirretty ? 0 : OpastusArvioS) + AvausLepoS;
        /// <summary>Avauksen ääni odottaa intron aikajanaa (33,5 s tai ilman C5:tä 31,5 s).</summary>
        bool IntroOdottaa() => introKaynnissa && !introAvausVapaa;
        bool IntroVoimassa(int versio) => versio == introVersio && silmukka != null && Kaupunkitila && Viimeisin == this && KaupunkitilaId == introKaupunki;
        /// <summary>Kaupunki, jonka intro on käynnissä (kaupungin vaihto päättää sen, TF 176).</summary>
        string introKaupunki;

        /// <summary>Komento "opas intro tila".</summary>
        public static string IntroTila()
        {
            var v = Viimeisin;
            return $"intro {(IntroPaalla ? "päällä" : "pois")} (vain {KaupunkiIntro.Kaupunki}), {(v != null && v.introKaynnissa ? "käynnissä" : "ei käynnissä")}"
                + $", opastus {(OpastusKuultu ? "kuultu" : v != null && v.opastusSiirretty ? "siirretty 1. pysähdykselle" : "avauksessa")}";
        }

        /// <summary>Komento "opas intro ohita": sama kuin napautus intron aikana.</summary>
        public static bool IntroOhita()
        {
            var v = Viimeisin;
            if (v == null || !v.introKaynnissa) return false;
            v.introOhitusPyynto = true;
            return true;
        }

        /// <summary>Esityksen alussa (EsitysAvaus): käynnistää intron, jos kaupunki on Pariisi ja kytkin päällä. true = intro alkoi.</summary>
        bool AloitaIntro(string kaupunkiId)
        {
            esitysAlku = Time.unscaledTime; avausEnnenS = 0;
            opastusSiirretty = false; opastusUrl = null;
            if (Testi || !IntroPaalla || !KaupunkiIntro.OnIntro(kaupunkiId) || kaupunkitila == null) return false;
            // Vähän muistia (juna 173, iPad Pro 13 jetsam): koko nykyintro ohitetaan, avaus kuten ilman introa (juna 172).
            long vapaaAlussa = CesiumKaupunki.VapaaMuisti();
            if (vapaaAlussa > 0 && vapaaAlussa / 1e9 < IntroOhitusRajaGt)
            {
                o.Kirjaa($"opas: intro {kaupunkiId} ohitettu: vapaa muisti {vapaaAlussa / 1e9:F2} Gt < {IntroOhitusRajaGt:F1} Gt (avaus kuten ennen)");
                return false;
            }
            introKaynnissa = true; introAvausVapaa = false; introOhitusPyynto = false; introKaupunki = kaupunkiId;
            opastusSiirretty = !OpastusKuultu;
            o.StartCoroutine(EsitysIntro(kaupunkiId, ++introVersio));
            return introKaynnissa;   // ilman kaupunkijaksoa intro päättyy heti (avaus ja opastus kuten ennen)
        }

        IEnumerator EsitysIntro(string kaupunkiId, int versio)
        {
            var kk = kaupunkitila;
            var aani = Aanisoitin.Instanssi;
            if (aani == null || !aani.KaupunkiIntro(kaupunkiId, KaupunkiIntro.MusiikinKatkoS, KaupunkiIntro.MusiikinHaivytysS, KaupunkiIntro.HidasAlkaaS))
            {
                IntroLoppuu(versio, false, $"ei kaupunkijaksoa ({(aani == null ? "soitin puuttuu" : "KaupunkiIntro false")}), avaus kuten ennen");
                yield break;
            }
            o.Kirjaa($"opas: intro {kaupunkiId} alkaa: odotetaan musiikkia (enintään {KaupunkiIntro.MusiikkiOdotusS:F0} s)");
            NytRivi.Valmistele(kk.Lat, kk.Lon, kaupunkiId);
            // MUISTIVARA (juna 173, iPad Pro 13: jetsam intron alussa, vapaa 0,44 Gt, kaupungin laatat 98 %): kuvat haetaan yksi
            // kerrallaan (ei viittä purkua yhtä aikaa), ja vähällä muistilla Eiffel-otoksen laattoja ei esiladata intron alusta asti
            // reittikameralla (PT 9.10.: laatat latautuvat vasta otoksen alkaessa).
            long vapaa = CesiumKaupunki.VapaaMuisti();
            // Pienen muistin laite (alle 12 Gt, KaupunkiKuva.PieniMuisti; iPad Pro 13 8 Gt, 173b-todennus 22.3x: vapaa 1,33 Gt ennen
            // introa ja yli 1 Gt kului kahdessa sekunnissa, kun Trocadérolta lähes vaakasuoraan katsova Eiffel-näkymä alkoi latautua):
            // ei Eiffel-esilatausta eikä Eiffel-otosta, otos näytetään 3D-avausnäkymänä. Muilla laitteilla vapaan muistin raja.
            introEiffel = !KaupunkiKuva.PieniMuisti && (vapaa <= 0 || vapaa / 1e9 >= IntroEiffelRajaGt);
            o.StartCoroutine(HaeIntroKuvat(versio));
            // Eiffel-otoksen laatat valmiiksi reittikameralla (PaivitaKamera → IntroReitti) otoksen loppuun asti.
            double eMaa = OmaMaaKehalla(KaupunkiIntro.EiffelLat, KaupunkiIntro.EiffelLon);
            introEsilataus = introEiffel ? KaupunkiIntro.EiffelKulma(0.5, eMaa) : (Kuvakulma?)null;
            if (!introEiffel) o.Kirjaa($"opas: intro {kaupunkiId}: {(KaupunkiKuva.PieniMuisti ? "pieni muisti" : $"vapaa muisti {vapaa / 1e9:F2} Gt < {IntroEiffelRajaGt:F1}")} → Eiffel-esilataus ja -otos pois (3D-avausnäkymä)");
            // Avausnäkymän kierto koko intro + avaus (muuten 16 s:n kierto pysähtyisi ja avauksen ääni hyppäisi kulmaa taaksepäin).
            silmukka?.AsetaAvausKesto(KaupunkiIntro.AvausS + KaupunkiIntro.AvausArvioS + AvausLisaS);
            introKerros ??= new IntroKerros();
            introKerros.Napautus = () => { if (versio == introVersio) introOhitusPyynto = true; };
            introKerros.Sieppaa(true);

            // Tahdistus: intron kello = nopean kappaleen kohta (KaupunkiIntroAlkoi laukeaa ruudulla, jolla kappale soi).
            float? alku = null;
            Action<string, float> kuuntelija = (k, kohta) => { if (KaupunkiIntro.OnIntro(k)) alku = Time.unscaledTime - kohta; };
            Aanisoitin.KaupunkiIntroAlkoi += kuuntelija;
            float raja = Time.unscaledTime + (float)KaupunkiIntro.MusiikkiOdotusS;
            try
            {
                while (alku == null && !introOhitusPyynto && Time.unscaledTime < raja && IntroVoimassa(versio)) yield return null;
            }
            finally { Aanisoitin.KaupunkiIntroAlkoi -= kuuntelija; }
            if (!IntroVoimassa(versio)) { aani.KaupunkiIntroOhita(); IntroLoppuu(versio, false, "keskeytyi ennen musiikkia"); yield break; }
            if (alku == null && !introOhitusPyynto)
            {
                // Musiikki ei alkanut aikarajassa (lataus tai verkko): ilman tahtia 31 s:n kuvasarja olisi irrallinen ja myöhässä
                // alkava kappale katkeaisi kesken, joten intro ohitetaan kokonaan ja jakso siirtyy hitaaseen (KaupunkiIntroOhita).
                // Avaus ja opastus kuten ennen.
                aani.KaupunkiIntroOhita();
                IntroLoppuu(versio, false, $"musiikki ei alkanut {KaupunkiIntro.MusiikkiOdotusS:F0} s:ssa, intro ohitettu");
                yield break;
            }
            double t0;
            if (alku is float a) { t0 = a; o.Kirjaa($"opas: intro {kaupunkiId} musiikki alkoi (kohta {Time.unscaledTime - a:F2} s)"); }
            else
            {
                introOhitusPyynto = false;
                aani.KaupunkiIntroOhita();
                t0 = Time.unscaledTime - KaupunkiIntro.SiirtymaS;
                o.Kirjaa($"opas: intro {kaupunkiId} ohitettu ennen musiikkia → otos 7");
            }

            // Kori pois nykyajan otoksista (KaupunkiIntro.KoriPalaa); palautetaan aina (IntroPurku).
            PalloKori.IntroPiilossa = true;
            int otos = -1;
            bool nytKasitelty = false, c5Lukittu = false, c5 = false;
            while (true)
            {
                if (!IntroVoimassa(versio)) { aani.KaupunkiIntroOhita(); NytRivi.Piilota(); IntroLoppuu(versio, true, "keskeytyi"); yield break; }
                double t = Time.unscaledTime - t0;
                if (introOhitusPyynto)
                {
                    introOhitusPyynto = false;
                    double u = KaupunkiIntro.Ohita(t);
                    if (u > t)
                    {
                        t0 -= u - t;
                        bool musa = aani.KaupunkiIntroOhita();
                        NytRivi.Piilota(); nytKasitelty = true;
                        o.Kirjaa($"opas: intro {kaupunkiId} ohitettu {t:F2} s → otos 7 (musiikki {(musa ? "siirtyy" : "jo siirtynyt")})");
                        t = u;
                    }
                }
                if (!c5Lukittu && t >= KaupunkiIntro.SiirtymaS)
                {
                    c5Lukittu = true; c5 = introKuvat[5] != null;
                    introKerros.Sieppaa(false);   // siirtymä vanhaan: ei enää ohitettavaa, kosketus taas kameralle
                    o.Kirjaa(c5 ? $"opas: intro {kaupunkiId}: C5 ristihäivytys {KaupunkiIntro.C5AlkaaS:F1}–{KaupunkiIntro.C5TaysiS:F1} s, avaus {KaupunkiIntro.AvausS:F1} s"
                                : $"opas: intro {kaupunkiId}: C5 puuttuu → kova leikkaus 3D-avausnäkymään, avaus {KaupunkiIntro.AvausIlmanC5S:F1} s");
                }
                if (!nytKasitelty && t >= KaupunkiIntro.NytRiviS)
                {
                    nytKasitelty = true;
                    if (t < KaupunkiIntro.NytRiviS + 1) { NytRivi.Nayta(kk.Nimi, kk.Lat, kk.Lon, kaupunkiId); o.Kirjaa($"opas: intro {kaupunkiId} nyt-rivi {t:F2} s"); }
                }
                bool c5Nyt = c5Lukittu ? c5 : introKuvat[5] != null;
                if (PalloKori.IntroPiilossa && c5Lukittu && t >= KaupunkiIntro.KoriPalaa(c5)) KoriTakaisin();
                var tila = KaupunkiIntro.Tila(t, n => introKuvat[n] != null, c5Nyt);
                if (!KaupunkiIntro.EiffelEsilataus(t)) introEsilataus = null;
                introKamera = tila.Laji == IntroLaji.Eiffel && introEiffel ? KaupunkiIntro.EiffelKulma(KaupunkiIntro.EiffelOsuus(t), eMaa) : (Kuvakulma?)null;
                introKerros.Aseta(tila, tila.Kuva > 0 ? introKuvat[tila.Kuva] : null);
                if (tila.Kuva > introNakyvaKuva)
                {
                    introNakyvaKuva = tila.Kuva;
                    for (int i = 1; i < tila.Kuva; i++) if (introKuvat[i] != null) { Kuvat.Poista(introKuvat[i]); introKuvat[i] = null; }
                }
                if (tila.Otos != otos)
                {
                    otos = tila.Otos;
                    string mita = tila.Ohi ? "ohi (3D)" : tila.Laji == IntroLaji.Eiffel ? "eiffel" : tila.Kuva > 0 ? "kuva c" + tila.Kuva : "3d-avausnäkymä";
                    o.Kirjaa($"opas: intro {kaupunkiId} otos {otos} {mita} {t:F2} s");
                }
                if (!introAvausVapaa && c5Lukittu && t >= KaupunkiIntro.AvausAlkaa(c5))
                {
                    introAvausVapaa = true; avausEnnenS = Time.unscaledTime - esitysAlku;
                    o.Kirjaa($"opas: intro {kaupunkiId}: avaus alkaa {t:F2} s");
                }
                if (tila.Ohi && introAvausVapaa) break;
                yield return null;
            }
            IntroLoppuu(versio, true, "valmis");
        }

        /// <summary>Eiffel-otoksen esilataus vain, kun vapaata muistia on vähintään tämän verran intron alussa (Gt; iPad-kaatuminen juna 173).</summary>
        public const double IntroEiffelRajaGt = 1.3, IntroOhitusRajaGt = 0.8;   // Natiiviseppä: esilataus 0,3–0,7 Gt
        bool introEiffel = true;

        /// <summary>Introkuvat yksi kerrallaan ja enintään kaksi muistissa: kuva n haetaan vasta, kun kuva n − 1 on ruudulla
        /// (introNakyvaKuva), ja aiemmat poistetaan myös välimuistista (Kuvat.Poista).</summary>
        int introNakyvaKuva;
        IEnumerator HaeIntroKuvat(int versio)
        {
            introNakyvaKuva = 0;
            for (int n = 1; n <= KaupunkiIntro.Kuvia; n++)
            {
                while (n > introNakyvaKuva + 1 && versio == introVersio && introKaynnissa) yield return null;
                if (versio != introVersio || !introKaynnissa) yield break;
                bool valmis = false; int k = n;
                Kuvat.Hae(KaupunkiIntro.KuvaUrl(k), t =>
                {
                    valmis = true;
                    if (versio != introVersio || !introKaynnissa) return;
                    if (t == null) { o.Kirjaa($"opas: intro kuva c{k} ei latautunut (otos 3D-avausnäkymänä)"); return; }
                    introKuvat[k] = t; Kuvat.Kiinnita(t);
                    o.Kirjaa($"opas: intro kuva c{k} valmis ({t.width}×{t.height})");
                });
                while (!valmis && versio == introVersio && introKaynnissa) yield return null;
                if (versio != introVersio || !introKaynnissa) yield break;
            }
        }

        /// <summary>Intron korin piilotus pois (A/B-kytkin PalloKori.Paalla ennallaan: kesken intron annettu `opas kori 0` pitää).</summary>
        void KoriTakaisin() => PalloKori.IntroPiilossa = false;

        /// <summary>Intro päättyi (soitettu = kuvat ja tahti ajettiin; muuten opastus jää avaukseen kuten ennen).</summary>
        void IntroLoppuu(int versio, bool soitettu, string syy)
        {
            if (versio != introVersio) return;
            if (!soitettu) opastusSiirretty = false;
            if (!introAvausVapaa) avausEnnenS = Time.unscaledTime - esitysAlku;
            IntroPurku(syy);
        }

        void IntroPurku(string syy)
        {
            bool oli = introKaynnissa;
            introKaynnissa = false; introAvausVapaa = true; introOhitusPyynto = false;
            introKamera = null; introEsilataus = null;
            KoriTakaisin();
            introKerros?.Pois();
            for (int i = 0; i < introKuvat.Length; i++) { if (introKuvat[i] != null) Kuvat.Poista(introKuvat[i]); introKuvat[i] = null; }
            if (oli) o.Kirjaa($"opas: intro loppui ({syy})");
        }

        /// <summary>Oppaan sulkeutuessa (Sulje): musiikki pois intron ajastuksesta, nyt-rivi piiloon, kuvat vapaiksi.</summary>
        void IntroSulje()
        {
            if (introKaynnissa) { Aanisoitin.Instanssi?.KaupunkiIntroOhita(); NytRivi.Piilota(); }
            introVersio++;
            IntroPurku("opas suljettu");
            opastusSiirretty = false; opastusUrl = null;
        }

        /// <summary>Reittikameroiden näkymiin Eiffel-otoksen näkymä intron alusta otoksen loppuun (palauttaa määrän).</summary>
        int IntroReitti(int n)
        {
            if (introEsilataus is Kuvakulma e && n < reittiNakymat.Length) reittiNakymat[n++] = e;
            return n;
        }

        /// <summary>Kerronta loppui: soitetaanko siirretty opastus nyt (ensimmäinen kierroksen pysähdys, ennen lähtöä)?</summary>
        bool OpastusPysahdyksella() =>
            opastusSiirretty && opastusUrl != null && !introKaynnissa && Kaupunkitila && silmukka != null && silmukka.KierrosKaynnissa
            && silmukka.Nykyinen is OpasKohde nk && !nk.Kysymys && !nk.PelaajanVastaus;

        /// <summary>1. kyydin opastus pysähdyksen kerronnan jälkeen; silmukan lähtö odottaa (AaniLoppui vasta tämän jälkeen).</summary>
        IEnumerator OpastusPysahdyksenJalkeen()
        {
            string url = opastusUrl; opastusUrl = null; opastusSiirretty = false;
            o.Kirjaa($"opas: opastus (1. kyyti) pysähdyksen {silmukka?.Nykyinen?.Nimi} jälkeen");
            yield return SoitaJaOdota(url, "opastus");
            OpastusKuultu = true;
            silmukka?.AaniLoppui();
        }

        /// <summary>
        /// Intron kuvakerros: LATAUSKUVA-pohja koko ruudulle (peittävä rajaus, Ken Burns juuren skaalana), havainnekuva-merkintä
        /// oppaan nimilapun pohjalla ja näkymätön napautuksen sieppari (OpasKuvanoston sulkijan malli). Ei omia värejä eikä tyylejä.
        /// </summary>
        sealed class IntroKerros
        {
            readonly VisualElement isa, sieppari;
            readonly Latauskuva kuva;
            readonly Label merkki;
            Texture2D nyt;
            public Action Napautus;

            public IntroKerros()
            {
                var ui = UiKerros.Hae();
                isa = ui.Juuri(UiKerros.Nostot);
                kuva = new Latauskuva(isa);
                sieppari = Rakenne.El(null, isa, PickingMode.Position);
                sieppari.style.position = Position.Absolute;
                sieppari.style.left = 0; sieppari.style.right = 0; sieppari.style.top = 0; sieppari.style.bottom = 0;
                sieppari.style.display = DisplayStyle.None;
                sieppari.RegisterCallback<PointerDownEvent>(e => { e.StopPropagation(); Napautus?.Invoke(); });
                merkki = Rakenne.Teksti(Kieli.T("ui.opas.lahde.havainnekuva"), "tk-teema-harmaa mk-opas-nimilappu mk-opas-nimilappu--nakyy", ui.Turva(UiKerros.Nostot));
                merkki.pickingMode = PickingMode.Ignore;
                Kirjasimet.Aseta(merkki, Kirjasin.Moderni);
                merkki.style.right = Tyylikirja.Vali.Xl; merkki.style.bottom = Tyylikirja.Vali.Xl;
                merkki.style.display = DisplayStyle.None;
            }

            /// <summary>Napautus ohittaa intron (kohtauksiin 1–6 asti); ylemmät kerrokset (napit, valikot) saavat osumansa ensin.</summary>
            public void Sieppaa(bool paalla) => sieppari.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;

            public void Aseta(IntroTila tila, Texture2D t)
            {
                if (tila.Ohi || tila.Kuva == 0 || t == null || tila.Alfa <= 0) { Piiloon(); return; }
                if (t != nyt) { nyt = t; kuva.Aseta(t); }
                float w = isa.layout.width, h = isa.layout.height;
                if (!float.IsNaN(w) && !float.IsNaN(h) && w > 0 && h > 0)
                {
                    var (x, y, l, k) = LatausLiike.Peita(w, h, t.width / (double)Mathf.Max(1, t.height));
                    kuva.Sovita(new Rect((float)x, (float)y, (float)l, (float)k));
                }
                if (!kuva.Nakyy) kuva.Nayta(true, false);
                float alfa = Mathf.Clamp01((float)tila.Alfa);
                var j = kuva.Juuri;
                j.style.opacity = alfa;
                var r = tila.Rajaus;
                j.style.transformOrigin = new TransformOrigin(Length.Percent((float)(r.AnkkuriX * 100)), Length.Percent((float)(r.AnkkuriY * 100)));
                j.style.scale = new Scale(new Vector2((float)r.Skaala, (float)r.Skaala));
                merkki.style.display = DisplayStyle.Flex;
                merkki.style.opacity = alfa;
            }

            void Piiloon()
            {
                if (kuva.Nakyy) kuva.Nayta(false);
                merkki.style.display = DisplayStyle.None;
            }

            public void Pois()
            {
                Piiloon();
                Sieppaa(false);
                Napautus = null;
                if (nyt != null) { nyt = null; kuva.Aseta(null); }
            }
        }
    }
}
