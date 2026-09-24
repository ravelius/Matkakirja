// PELIOHJAIN: MUSIIKIN JA ÄÄNIMAISEMAN KOUKUT (B7 erä 4, spesifikaatio §3 P-rivit).
//
// Uudet tapahtumat (vanhojen järjestys ei muutu; nämä tulevat niiden lisäksi):
//   TilaVaihtui(vanha, uusi)   heti Tila-setterissä (esim. Aloitus → Matkalla)
//   LiikeAlkoi(tapa, askelia)  liike alkaa (noppa pysähtyi; aloituslennolla kone lähtee)
//   KysymysAvautui / KysymysSuljettu   ruudun lopussa: tehtävästä toiseen siirtyminen samassa
//                              ruudussa (Kartta → Kysymys) ei sulje ja avaa visamusiikkia
//   IntroLoppui                intron luenta päättyi (soivaLuento == luennat.Intro)
//   MatkaAlkoi                 uusi matka (UusiPeli: aloitusnäkymä, huipennuksen Uusi matka)
//
// Äänisoitin (Aanisoitin.cs) syntyy PeliOhjaimen lapseksi. Ruudun lopussa PaivitaAanet kokoaa
// Aanitilanteen (webin syncAmbience jokaisella renderillä) ja Aanikoukut lähettää AaniTilalle vain
// muutokset. Lisäksi AaniTila saa: MatkaPerilla (siirtymäraidan loppu), Puhe.Puhuu (väistö),
// aloituslennon tilan (matkustamon maisema vain avauslennolla; pelin lennot ja mannerlento soittavat
// kohdekaupunkia heti lennon alusta, web ennakoiAmbienssi), lehden Avautui/Suljettu (hiljennys 'lehti') ja
// LinssiOhjain.MusiikkiKasittelijan (linssin pito). KaikkiAarteetLoytyi ei muuta sekoitusta: web
// soittaa siinä vain tehosteen 'win', jonka Natiivi-UI soittaa jo.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>Silmukan tila vaihtui (vanha, uusi). Tulee heti, myös välitiloista samassa ruudussa.</summary>
        public event Action<SilmukanTila, SilmukanTila> TilaVaihtui;
        /// <summary>Liike alkaa (kulkutapa, askelia polulla; lennossa 0): noppa pysähtyi tai kone lähtee.</summary>
        public event Action<Kulkutapa, int> LiikeAlkoi;
        /// <summary>Kysymys (tai muu tehtävä) tuli auki; ruudun lopussa, ei välähdyksistä.</summary>
        public event Action KysymysAvautui;
        /// <summary>Kysymys sulkeutui; ruudun lopussa.</summary>
        public event Action KysymysSuljettu;
        /// <summary>Intron luenta päättyi (soi loppuun, ohitettiin tai katkesi).</summary>
        public event Action IntroLoppui;
        /// <summary>Uusi matka alkoi (UusiPeli).</summary>
        public event Action MatkaAlkoi;

        /// <summary>Musiikki ja äänimaisema (null ennen Alustaa).</summary>
        public Aanisoitin Aanisoitin => aanisoitin;

        Aanisoitin aanisoitin;
        bool introSoi, kysymysAukiAanille, aanitaulutValmiit;
        float aanitaulutAlkoi = -1f;
        /// <summary>Äänitaulujen odotus ensimmäisellä käynnistyksellä, ennen kuin paikka lähtee ilman niitä.</summary>
        const float AanitaulujenOdotusS = 3f;

        void Ilmoita(Action tapahtuma)
        {
            try { tapahtuma?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>Tila-setteri kutsuu (vain muutoksesta).</summary>
        void TilaAsetettu(SilmukanTila vanha, SilmukanTila uusi)
        {
            try { TilaVaihtui?.Invoke(vanha, uusi); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>Alusta kutsuu, kun puhe ja lehti on kytketty.</summary>
        void AlustaAanet()
        {
            var go = new GameObject("Aanisoitin");
            go.transform.SetParent(transform, false);
            aanisoitin = go.AddComponent<Aanisoitin>();
            var koukut = aanisoitin.Koukut;

            LuentoAlkoi += (_, l) => introSoi = l != null && l == luennat.Intro;
            LuentoLoppui += _ =>
            {
                if (!introSoi) return;
                introSoi = false;
                Ilmoita(IntroLoppui);
                koukut.IntroLoppui();
            };
            MatkaPerilla += kaupunki => koukut.MatkaPerilla(kaupunki);
            if (puhe != null) puhe.Puhuu += koukut.Puhe;
            if (lehtiNakyma != null)
            {
                lehtiNakyma.Avautui += _ => koukut.Lehti(true);
                lehtiNakyma.Suljettu += _ => koukut.Lehti(false);
            }
            // Linssin musiikin pito (Raamattu 14.9.): pohja pitoon, hiljennys 'linssi', maisema pois.
            // Suora asetus korvaa LinssiUi:n tyhjän oletuksen (se asettaa omansa vain ??=).
            LinssiOhjain.MusiikkiKasittelija = paalla => { if (aanisoitin != null) aanisoitin.Koukut.LinssiPito(paalla); };
            // Linssin oma raita (Linssiseppä: keksinnot / ihmisen-matka, null = pois) ja sen himmennys.
            LinssiOhjain.LinssiMusiikkiKasittelija = Aanisoitin.LinssiMusiikki;
            LinssiOhjain.LinssiHimmennysKasittelija = Aanisoitin.LinssiHimmennys;
        }

        /// <summary>
        /// Liike alkaa: tapahtuma ja siirtymäraita (AloitaLiike, aloituslennon lähtö). siirtymaraita = false
        /// avauslennolla ja mannerlennolla (web soittaa raidan vain doFlyssä ja doMovessa).
        /// </summary>
        void IlmoitaLiike(Kulkutapa tapa, int askelia, bool siirtymaraita = true)
        {
            try { LiikeAlkoi?.Invoke(tapa, askelia); } catch (Exception e) { Debug.LogException(e); }
            aanisoitin?.Koukut.LiikeAlkoi(tapa, askelia, siirtymaraita);
        }

        /// <summary>
        /// Uusi matka (UusiPeli): tapahtuma ja äänet alusta (main.js stopPlaceStream, stopQuizMusic, stopPohja,
        /// lopetaSiirtymamusiikki). Aloitusnäkymästä lähdettäessä etusivun raita ja maisema saavat soida,
        /// kunnes paikka vaihtuu (aloituslennon kone lähtee tai kartta aukeaa).
        /// </summary>
        void IlmoitaUusiMatka()
        {
            Ilmoita(MatkaAlkoi);
            aanisoitin?.Koukut.UusiMatka(pysayta: Tila != SilmukanTila.Aloitus);
        }

        /// <summary>Sisältö latautui: kaupunkien maa ja tyyppi heti, aanitaulut ja aani-ehdokkaat taustalla.</summary>
        void AloitaAanitaulut()
        {
            if (aanisoitin == null || verkko == null) return;
            try { aanisoitin.Taulut.LueKaupungit(verkko.KaupunkiLista); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ääni: kaupungit: " + e.Message); }
            aanitaulutAlkoi = Time.unscaledTime;
            StartCoroutine(HaeAanitaulut());
        }

        IEnumerator HaeAanitaulut()
        {
            var t = aanisoitin.Taulut;
            string teksti = null;
            yield return HaeTiedosto("kokoelmat/aanitaulut.json", false, true, x => teksti = x);
            int korit = 0;
            if (teksti != null)
            {
                try { korit = t.LueAanitaulut(teksti); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ääni: aanitaulut ei jäsenny: " + e.Message); }
            }
            if (korit == 0 && !Paataso.RaakaKielletty)
            {
                // Vanhempi paketti (skeema < 1.22) ilman maisemakori-rivejä: kori lasketaan webin moduulin
                // KAUPUNKI_EHDOKKAISTA. Moduuli on raakaa dataa, joten Paataso.RaakaKielletty ohittaa sen.
                string moduuli = null;
                yield return HaeTiedosto("moduulit/js/aani-ehdokkaat.json", false, true, x => moduuli = x);
                try
                {
                    var ex = MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(moduuli ?? "{}")), "exportit") as Dictionary<string, object>;
                    if (MiniJson.Kentta(ex, "KAUPUNKI_EHDOKKAAT") is Dictionary<string, object> e) t.LueKaupunkiEhdokkaat(e);
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ääni: aani-ehdokkaat ei jäsenny: " + e.Message); }
            }
            Debug.Log($"MATKAKIRJA ääni: äänitaulut valmiit (maisemakoreja {korit}, maita {t.Maat.Count})");
            aanitaulutValmiit = true;
        }

        /// <summary>Ruudun lopussa (Update): tapahtumat ruudun lopputilasta ja muutokset AaniTilaan.</summary>
        void PaivitaAanet()
        {
            bool auki = Tila == SilmukanTila.Kysymys;
            if (auki != kysymysAukiAanille)
            {
                kysymysAukiAanille = auki;
                Ilmoita(auki ? KysymysAvautui : KysymysSuljettu);
            }
            if (aanisoitin == null) return;
            bool taulut = aanitaulutValmiit || (aanitaulutAlkoi >= 0 && Time.unscaledTime - aanitaulutAlkoi > AanitaulujenOdotusS);
            var sijainti = matka?.Tila.Pelaaja.Sijainti;
            var s = new Aanitilanne
            {
                Valmis = taulut && verkko != null && Tila != SilmukanTila.Lataa && Tila != SilmukanTila.Virhe
                         && (matka != null || Tila == SilmukanTila.Aloitus),
                Aloitus = Tila == SilmukanTila.Aloitus,
                Aloituslento = AloituslentoKaynnissa,
                Matkalla = Tila == SilmukanTila.Matkalla,
                Ohi = matka != null && matka.Tila.Vaihe == Vaihe.Ohi,
                Kaupunki = PelaajanKaupunki,
                Merireitti = sijainti.HasValue && !sijainti.Value.Kaupungissa && matka.Tila.Kulkutapa == Kulkutapa.Meri,
                KysymysAuki = auki,
            };
            try { aanisoitin.Koukut.Paivita(s); } catch (Exception e) { Debug.LogException(e); }
        }
    }
}
