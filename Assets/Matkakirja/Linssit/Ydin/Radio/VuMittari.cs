// VU-MITTARI maailmanradioon (omistaja 24.9.2026 klo 11.3x, BUILD 7: "aito VU-mittari palaa natiiviin").
//
// Webissä mittari oli v237–v267 ja poistettiin 5.8.2026, koska WebKit ei päästä suoratoiston ääntä
// analysaattoriin ("ei täydellisessä synkassa"). Natiivissa AVPlayer antaa oikean tason
// (MatkakirjaRadio_Taso, Natiiviseppä), joten neula lukee lähetystä. Luvut ovat webin poistetusta
// toteutuksesta (js/linssit/radiosoitin.js ja radio.js v267), koska ne on mitattu ja kuunneltu:
//
//   BALLISTIIKKA: VU, ei PPM. Nousu τ 0,065 s (≈ 300 ms täyteen), lasku τ 0,34 s — viisi kertaa
//   hitaampi. Vähennetty liike: 0,5 s / 1,1 s (neula ajautuu, ei väräjä; pysähtynyt neula näyttäisi rikki).
//   ASTEIKKO lähetykselle −40 … −6 dB (RMS 0…1 → 20·log10). Nolla VU kohdassa 0,76, punainen siitä ylös.
//   LEPO 0,045: neula irti vasteesta, kuten oikeassa laitteessa.
//   VARAKUVIO, kun tasoa ei saada (−1: HLS tai ei mittausta): kolmen siniaallon "puhe" (lause 0,9,
//   tavu 7,3, särmä 19,4 rad/s) pohjalla 0,34 — ei satunnaislukuja, jotka näyttäisivät tärinältä.
//   Vaiennut, tauolla oleva tai hiljainen lähetys: neula lepää.
//
// Mittari on puhdas: RadioLinssi päivittää sen joka kehys, ja Natiivi-UI / VuMittariNakyma piirtää
// neulan kulman (KulmaAsteina). Piirtoa ei tarvita, kun kulma ei muutu (Levossa).
using System;

namespace Matkakirja.Linssit.Radio
{
    public sealed class VuMittari
    {
        public const double NousuS = 0.065, LaskuS = 0.34, VaisuNousuS = 0.5, VaisuLaskuS = 1.1;
        public const double PohjaDb = -40, KattoDb = -6;
        public const double Lepo = 0.045, Punainen = 0.76;
        /// <summary>Neulan kääntökulma asteina keskiasennosta kumpaankin suuntaan (web MITTARIN_KUVA.kulma).</summary>
        public const double Kulma = 48;
        public const double JaljitelmanPohja = 0.34;

        /// <summary>Asteikon jaot (web MITTARIN_JAOT): osuus kaarella, pitkä viiva, teksti, punainen.</summary>
        public static readonly (double Osuus, bool Pitka, string Teksti, bool Punainen)[] Jaot =
        {
            (0, true, "-20", false), (0.28, true, null, false), (0.38, false, null, false), (0.46, true, "-5", false),
            (0.56, false, null, false), (0.61, false, null, false), (0.67, false, null, false),
            (0.76, true, "0", true), (0.85, false, null, true), (0.93, false, null, true), (1, true, "+3", true),
        };

        /// <summary>Neulan asento 0…1 (lepo 0,045).</summary>
        public double Osuus { get; private set; } = Lepo;
        /// <summary>Luettiinko viimeksi varakuviota (taso −1).</summary>
        public bool Jaljitelty { get; private set; }
        /// <summary>Neulan kulma asteina: −Kulma vasen laita, +Kulma oikea.</summary>
        public double KulmaAsteina => (2 * Osuus - 1) * Kulma;
        /// <summary>Neula levossa (piirtoa ei tarvita).</summary>
        public bool Levossa => Math.Abs(Osuus - Lepo) < 1e-4;

        /// <summary>Lähetyksen RMS-taso 0…1 asteikolle 0…1 (−40…−6 dB); hiljaisuus 0.</summary>
        public static double Lukema(double rms)
        {
            if (!(rms > 0)) return 0;
            double db = 20 * Math.Log10(rms);
            return Math.Max(0, Math.Min(1, (db - PohjaDb) / (KattoDb - PohjaDb)));
        }

        /// <summary>
        /// MatkakirjaRadio_Taso palauttaa näyttötason (dBFS −60…0 → 0…1, VuAsteikko), ei RMS:ää. Ilman
        /// paluumuunnosta −30 dBFS (0,5) luettaisiin −6 dB:ksi ja neula löisi ylälaitaan tavallisella musiikilla.
        /// −1 (ei saatavilla) säilyy, 0 = hiljaisuus.
        /// </summary>
        public static double RmsNayttotasosta(double taso)
        {
            if (taso < 0) return -1;
            if (!(taso > 0)) return 0;
            return Math.Pow(10, (60 * Math.Min(1, taso) - 60) / 20);
        }

        /// <summary>Varakuvio (web jaljiteltyLukija): lause, tavu ja särmä, kerrottuna äänenvoimakkuudella.</summary>
        public static double Jaljitelma(double tS, double voimakkuus)
        {
            double lause = 0.5 + 0.5 * Math.Sin(tS * 0.9 + 0.4);
            double tavu = 0.5 + 0.5 * Math.Sin(tS * 7.3 + 1.7);
            double sarma = 0.5 + 0.5 * Math.Sin(tS * 19.4 + 2.9);
            return (JaljitelmanPohja + 0.30 * lause + 0.22 * tavu + 0.10 * sarma) * Math.Max(0, Math.Min(1, voimakkuus));
        }

        /// <summary>
        /// Yksi kehys. taso = RMS 0…1 tai −1 (ei saatavilla → varakuvio); soi = lähetys kuuluu eikä ole tauolla;
        /// voimakkuus 0…1 (0 = vaiennettu → lepo); tS = kello varakuviolle.
        /// </summary>
        public void Paivita(double dtS, double taso, bool soi, double voimakkuus, double tS, bool vahennetty = false)
        {
            double kohde;
            Jaljitelty = false;
            if (!soi || !(voimakkuus > 0)) kohde = 0;
            else if (taso < 0) { Jaljitelty = true; kohde = Jaljitelma(tS, voimakkuus); }
            else kohde = Lukema(taso);
            kohde = Math.Max(Lepo, Math.Min(1, kohde));
            if (!(dtS > 0)) return;
            double tau = kohde > Osuus ? (vahennetty ? VaisuNousuS : NousuS) : (vahennetty ? VaisuLaskuS : LaskuS);
            Osuus += (kohde - Osuus) * (1 - Math.Exp(-dtS / tau));
            if (Math.Abs(Osuus - kohde) < 1e-5) Osuus = kohde;
        }

        /// <summary>Neula heti lepoon (radio suljettu).</summary>
        public void Nollaa() { Osuus = Lepo; Jaljitelty = false; }
    }

    /// <summary>Radiovirran todellinen äänitaso (MatkakirjaRadio_Taso): RMS 0…1, −1 = ei saatavilla.</summary>
    public interface IRadioTaso
    {
        float Taso { get; }
    }
}
