// ÄÄNIKOUKUT (B7 erä 4, §1.3–§1.4 ja §3): pelin tilasta AaniTilan tapahtumiksi, puhtaana C#:na.
//
// Web kutsuu syncAmbiencea jokaisella renderillä ja laskee paikan pelin tilasta (§1.3). Natiivissa
// PeliOhjain antaa ruudun lopussa Aanitilanteen, ja Paivita lähettää AaniTilalle vain muutokset:
// paikka (maisema + pohjaraita), avauksen purku aloitusnäkymästä poistuttaessa, kysymyksen
// visamusiikki ja kohtaamisen tilaraita (vaihe 2). Hetkelliset tapahtumat (liike alkaa, perillä, uusi matka, puhe, lehti, linssin pito,
// intron loppu) tulevat omina kutsuinaan. Kaikki AaniTilan Siirtyma-kutsut kulkevat tätä kautta,
// jotta perillä-sääntö (jalan jatkaa reitin varrella) ei katkaise linssin raitaa.
using System;

namespace Matkakirja.Peli
{
    /// <summary>Pelin tila äänten kannalta (PeliOhjain täyttää ruudun lopussa).</summary>
    public struct Aanitilanne
    {
        /// <summary>Sisältö ja äänitaulut ovat valmiit (ei latausta eikä virhettä).</summary>
        public bool Valmis;
        /// <summary>Aloitusnäkymä (webin pickstart: portti, avausteksti, lähtövalinta).</summary>
        public bool Aloitus;
        /// <summary>
        /// Aloituslento napautuksesta perille (PeliOhjain.AloituslentoKaynnissa; webin lennonAmbienssi ja
        /// body.flight-active avauslennolla): matkustamon maisema. Pelin omat lennot ja mannerlento EIVÄT
        /// ole tätä (web: pallolaudan lennolla ei ole kalvoa eikä flight-active-lippua).
        /// </summary>
        public bool Aloituslento;
        /// <summary>Liike käynnissä (SilmukanTila.Matkalla, myös nopan pyöriessä ja aloituslennon zoomissa).</summary>
        public bool Matkalla;
        /// <summary>Peli ohi (Vaihe.Ohi).</summary>
        public bool Ohi;
        /// <summary>Pelaajan kaupunki; null reitin varrella.</summary>
        public string Kaupunki;
        /// <summary>Reitin varrella meritse (Matka.Tila.Kulkutapa == Meri).</summary>
        public bool Merireitti;
        /// <summary>Kysymys (tai muu tehtävä) auki.</summary>
        public bool KysymysAuki;
        /// <summary>
        /// Kohtaaminen auki (musiikkisuunnitelma vaihe 2, tilaraita 'kohtaaminen'): visa, jossa puhuu paikallinen
        /// tai tarinakaaren henkilö (web visa.js onKohtaaminen: KOHTAAMISET / TARINAKAARI). Visan raita voittaa sen.
        /// </summary>
        public bool Kohtaaminen;
        /// <summary>
        /// Kysymys on auki, mutta visan raita ei soi (vaihe 2): kohtaamisen tervehdyssivu (web kohtaamisSivu:
        /// visa alkaa vasta kysymyssivulla) ja kohtaamisen tulos (web kohtaamisenTulos → stopQuizMusic).
        /// </summary>
        public bool VisaOdottaa;
    }

    public sealed class Aanikoukut
    {
        public const string Etusivu = "etusivu", Lentomatka = "lentomatka", Jalkamatka = "jalkamatka", Merimatka = "merimatka";

        readonly AaniTila tila;
        readonly AaniTaulut t;

        bool lahetetty;
        string paikka, tyyppi;
        bool aloitus, visa, kohtaaminen, puhuu, lehti, pito;
        Kulkutapa? liike;
        int askeleita;
        string siirtymaLaji;

        public Aanikoukut(AaniTila tila, AaniTaulut taulut)
        {
            this.tila = tila ?? throw new ArgumentNullException(nameof(tila));
            t = taulut ?? throw new ArgumentNullException(nameof(taulut));
        }

        public AaniTila Tila => tila;
        /// <summary>Viimeksi AaniTilalle lähetetty paikka (testit ja tilarivi).</summary>
        public string LahetettyPaikka => lahetetty ? paikka : null;
        public string SiirtymaLaji => siirtymaLaji;

        /// <summary>Kulkutapa → siirtymäraita (§1.4): maitse ja bussi jalan, meritse laiva, lento lento.</summary>
        public static string Laji(Kulkutapa tapa) => tapa switch
        {
            Kulkutapa.Maa => "jalan",
            Kulkutapa.Bussi => "jalan",
            Kulkutapa.Meri => "laiva",
            Kulkutapa.Lento => "lento",
            _ => null,
        };

        static bool Siirtymalaji(string laji) => laji == "jalan" || laji == "laiva" || laji == "lento";

        /// <summary>
        /// Paikka-avain (§1.3, webin syncAmbience): (paikka, tyyppi), tai null = ei muutosta (lataus kesken,
        /// tai liike käynnissä ilman lentoa tai jalkamatkaa: lähtöpaikan maisema ja raita soivat, kunnes
        /// render perillä vaihtaa ne). Paikka null = ei maisemaa (reitin varrella maitse, peli ohi), pohjavire soi.
        ///
        /// Lennot (web ui.js, erä 5): matkustamo ('lentomatka') soi VAIN avauslennolla (lennonAmbienssi +
        /// flight-active napautuksesta laskeutumiseen) ja vanhalla kalvolennolla (doFly laudalla 'maailma',
        /// jota peli ei enää käytä). Pelin oma lento (doFly maailmankartalla) ja mannerlento
        /// (actionMannerLento) ovat animatePawn(…, [pos], MANNER_LENTO_MS, { lento }): polulla on yksi askel,
        /// joka on samalla viimeinen, joten ennakoiAmbienssi(kohde) käynnistää kohdekaupungin maiseman ja
        /// pohjaraidan heti lennon alussa (lento = true → kohdekaupunki; PeliOhjaimen tila on jo perillä).
        /// </summary>
        public static (string Paikka, string Tyyppi)? Paikka(Aanitilanne s, bool jalkamatka, bool lento, Func<string, string> kaupunginTyyppi)
        {
            if (!s.Valmis) return null;
            if (s.Aloituslento) return (Lentomatka, "lentokone");
            if (s.Matkalla && jalkamatka) return (Jalkamatka, "metsa");
            if (s.Ohi) return (null, null);
            if (s.Aloitus) return (Etusivu, "lentoasema");
            if (s.Matkalla && !lento) return null;
            if (s.Kaupunki != null) return (s.Kaupunki, kaupunginTyyppi?.Invoke(s.Kaupunki));
            return s.Merireitti ? (Merimatka, "meri") : ((string, string)?)(null, null);
        }

        string Tyyppi(string kaupunki) => kaupunki != null && t.Tyypit.TryGetValue(kaupunki, out var ty) ? ty : null;

        /// <summary>
        /// Web ui.js animatePawn: maitse &amp;&amp; path.length &gt; 1 → metsä-kori. maitse on tosi myös bussilla (autokyyti,
        /// ui.js ~12911), joten bussimatka soi samaa jalkamatkan maisemaa (liikkumisen pariteetti B20).
        /// </summary>
        bool JalkamatkaKaynnissa => (liike == Kulkutapa.Maa || liike == Kulkutapa.Bussi) && askeleita > 1;
        bool LentoKaynnissa => liike == Kulkutapa.Lento;

        /// <summary>Ruudun lopussa: lähettää vain muuttuneet (paikka, avauksen purku, visamusiikki).</summary>
        public void Paivita(Aanitilanne s)
        {
            if (!s.Matkalla) liike = null;
            // Pelaaja etenee aloitusnäkymästä kartalle (webin aloitaKartalta): avauksen sekoitus puretaan.
            if (aloitus && !s.Aloitus) tila.Avaus(false);
            aloitus = s.Aloitus;
            // Web visa.js: kohtaaminen kiinni ENNEN visan pysäytystä ja auki visan käynnistyksen JÄLKEEN, ettei
            // kohtaaminen ehdi välähtää soimaan.
            if (!s.Kohtaaminen && kohtaaminen) { kohtaaminen = false; tila.Kohtaaminen(false); }
            bool visaSoi = s.KysymysAuki && !s.VisaOdottaa;
            if (visaSoi != visa) { visa = visaSoi; tila.Visa(visa); }
            if (s.Kohtaaminen && !kohtaaminen) { kohtaaminen = true; tila.Kohtaaminen(true); }
            if (pito) return; // linssin pito: paikka lähetetään pidon päätyttyä
            var p = Paikka(s, JalkamatkaKaynnissa, LentoKaynnissa, Tyyppi);
            if (!p.HasValue) return;
            if (lahetetty && p.Value.Paikka == paikka && p.Value.Tyyppi == tyyppi) return;
            lahetetty = true;
            paikka = p.Value.Paikka;
            tyyppi = p.Value.Tyyppi;
            tila.Paikka(paikka, tyyppi);
        }

        /// <summary>
        /// Liike alkaa (noppa pysähtyi, kone lähtee): siirtymäraita, jalkamatkan maisema ja lennon kohdepaikka.
        /// siirtymaraita = false: web ei soita siirtymäraitaa avauslennolla (doPickStart) eikä mannerlennolla
        /// (actionMannerLento-napin polku ilman aloitaSiirronMusiikkia); vain doFly ja doMove soittavat sen.
        /// </summary>
        public void LiikeAlkoi(Kulkutapa tapa, int askelia, bool siirtymaraita = true)
        {
            liike = tapa;
            askeleita = askelia;
            var laji = siirtymaraita ? Laji(tapa) : null;
            if (laji != null) Siirtyma(laji);
        }

        /// <summary>
        /// Liike päättyi (kaupunki tai null reitin varrella). Siirtymäraita loppuu, paitsi jalan-raita
        /// reitin varrella (Raamattu 3.9.: se jatkaa seuraavan heiton yli). Linssin raitaan ei kosketa.
        /// </summary>
        public void MatkaPerilla(string kaupunki)
        {
            liike = null;
            if (!Siirtymalaji(siirtymaLaji)) return;
            if (kaupunki == null && siirtymaLaji == "jalan") return;
            Siirtyma(null);
        }

        /// <summary>Siirtymä- tai linssiraita (null = lopeta). Sama laji jo soimassa = ei mitään.</summary>
        public void Siirtyma(string laji)
        {
            if (laji == siirtymaLaji) return;
            siirtymaLaji = laji;
            tila.Siirtyma(laji);
        }

        /// <summary>Linssin raita loppuu vain, jos se soi (siirtymäraita jää).</summary>
        public void LinssinRaitaLoppui()
        {
            if (siirtymaLaji == null || Siirtymalaji(siirtymaLaji)) return;
            Siirtyma(null);
        }

        /// <summary>
        /// Uusi matka (main.js): kaikki pois; paikka lähetetään seuraavassa päivityksessä uudelleen.
        /// pysayta = false (lähtö aloitusnäkymästä): vain siirtymäraita loppuu, ja etusivun raita ja maisema
        /// soivat, kunnes paikka vaihtuu.
        /// </summary>
        public void UusiMatka(bool pysayta = true)
        {
            if (pysayta)
            {
                tila.UusiMatka();
                siirtymaLaji = null;
                lahetetty = false;
                visa = false;
            }
            else Siirtyma(null);
            liike = null;
        }

        /// <summary>Kertojan tai lukijan puhe (Puhe.Puhuu): vain reunat, koska AaniTila laskee puhujia.</summary>
        public void Puhe(bool puhuuNyt)
        {
            if (puhuuNyt == puhuu) return;
            puhuu = puhuuNyt;
            tila.Puhe(puhuuNyt);
        }

        /// <summary>Lehti auki/kiinni (ILehtiNakyma.Avautui/Suljettu): hiljennys 'lehti' ja musiikkitila.</summary>
        public void Lehti(bool auki)
        {
            if (auki == lehti) return;
            lehti = auki;
            tila.Hiljennys("lehti", auki);
        }

        /// <summary>Linssin musiikin pito (LinssiOhjain.MusiikkiKasittelija).</summary>
        public void LinssiPito(bool paalla)
        {
            if (paalla == pito) return;
            pito = paalla;
            tila.LinssiPito(paalla);
            // Kone palaa pidosta viimeksi lähetettyyn paikkaan; muuttunut paikka lähtee seuraavassa päivityksessä.
        }

        /// <summary>Intron luenta päättyi: avauksen sekoitus puretaan (webin lopetaAvauksenAani).</summary>
        public void IntroLoppui() => tila.Avaus(false);
    }
}
