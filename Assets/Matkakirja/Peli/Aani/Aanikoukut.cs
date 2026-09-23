// ÄÄNIKOUKUT (B7 erä 4, §1.3–§1.4 ja §3): pelin tilasta AaniTilan tapahtumiksi, puhtaana C#:na.
//
// Web kutsuu syncAmbiencea jokaisella renderillä ja laskee paikan pelin tilasta (§1.3). Natiivissa
// PeliOhjain antaa ruudun lopussa Aanitilanteen, ja Paivita lähettää AaniTilalle vain muutokset:
// paikka (maisema + pohjaraita), avauksen purku aloitusnäkymästä poistuttaessa ja kysymyksen
// visamusiikki. Hetkelliset tapahtumat (liike alkaa, perillä, uusi matka, puhe, lehti, linssin pito,
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
        /// <summary>Lentomoottori soi (lento tai aloituslento koneen lähdöstä perille).</summary>
        public bool Lento;
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
    }

    public sealed class Aanikoukut
    {
        public const string Etusivu = "etusivu", Lentomatka = "lentomatka", Jalkamatka = "jalkamatka", Merimatka = "merimatka";

        readonly AaniTila tila;
        readonly AaniTaulut t;

        bool lahetetty;
        string paikka, tyyppi;
        bool aloitus, visa, puhuu, lehti, pito;
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
        /// tai liike käynnissä ilman lentoa tai jalkamatkaa: lähtöpaikan maisema ja raita soivat perille asti).
        /// Paikka null = ei maisemaa (reitin varrella maitse, peli ohi), pohjavire soi.
        /// </summary>
        public static (string Paikka, string Tyyppi)? Paikka(Aanitilanne s, bool jalkamatka, Func<string, string> kaupunginTyyppi)
        {
            if (!s.Valmis) return null;
            if (s.Lento) return (Lentomatka, "lentokone");
            if (s.Matkalla && jalkamatka) return (Jalkamatka, "metsa");
            if (s.Ohi) return (null, null);
            if (s.Aloitus) return (Etusivu, "lentoasema");
            if (s.Matkalla) return null;
            if (s.Kaupunki != null) return (s.Kaupunki, kaupunginTyyppi?.Invoke(s.Kaupunki));
            return s.Merireitti ? (Merimatka, "meri") : ((string, string)?)(null, null);
        }

        string Tyyppi(string kaupunki) => kaupunki != null && t.Tyypit.TryGetValue(kaupunki, out var ty) ? ty : null;

        bool JalkamatkaKaynnissa => liike == Kulkutapa.Maa && askeleita > 1;

        /// <summary>Ruudun lopussa: lähettää vain muuttuneet (paikka, avauksen purku, visamusiikki).</summary>
        public void Paivita(Aanitilanne s)
        {
            if (!s.Matkalla) liike = null;
            // Pelaaja etenee aloitusnäkymästä kartalle (webin aloitaKartalta): avauksen sekoitus puretaan.
            if (aloitus && !s.Aloitus) tila.Avaus(false);
            aloitus = s.Aloitus;
            if (s.KysymysAuki != visa) { visa = s.KysymysAuki; tila.Visa(visa); }
            if (pito) return; // linssin pito: paikka lähetetään pidon päätyttyä
            var p = Paikka(s, JalkamatkaKaynnissa, Tyyppi);
            if (!p.HasValue) return;
            if (lahetetty && p.Value.Paikka == paikka && p.Value.Tyyppi == tyyppi) return;
            lahetetty = true;
            paikka = p.Value.Paikka;
            tyyppi = p.Value.Tyyppi;
            tila.Paikka(paikka, tyyppi);
        }

        /// <summary>Liike alkaa (noppa pysähtyi, kone lähtee): siirtymäraita ja jalkamatkan maisema.</summary>
        public void LiikeAlkoi(Kulkutapa tapa, int askelia)
        {
            liike = tapa;
            askeleita = askelia;
            var laji = Laji(tapa);
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
