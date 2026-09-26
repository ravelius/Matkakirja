// KEKSINTÖJEN ÄÄNTEN AJOITUS (web js/aikajana.js: kehys → naytaVuosi → naksahda ja sytyta → keksinnonAani).
//
//   KILAHDUS ("keksinto", omistaja 3.9.2026: "pieni lamppu syttyy"): pysäkin syttyessä käyvällä kellolla. Webissä
//   sytyta-kutsun tekee vain kehys, joten selaus, karuselli ja lampun napautus eivät kilahda. Merkkipaalu (1873) ei ole
//   keksintö eikä kilahda (keksinnonAani: t.paalu), eikä hiljainen pysäkki soi (sytyta palaa ennen ääntä).
//   NAKSAHDUS ("vuosi", omistaja 3.9.2026: "kun vuosiluku vaihtuu … pieni ääniefekti taustalla"): kellon lukema vaihtuu
//   kokonaisen askeleen (keksintökaaren asteikolla askel on vuosi: kellonNaytto = floor) ELÄVÄSTI eli kello käy eikä
//   ensimmäinen asetus (linssin avaus, Alusta) ole vaihdos. Pysäkin tauolla ykkösrulla hiipii alle vuoden, joten tauko
//   on hiljainen; selaus rullaa vuoden hiljaa (kello seis). Tiheät ohitetaan: AIKAJANA_NAKSU_VALI_MS 125 eli enintään
//   kahdeksan naksahdusta sekunnissa (nopeutettu tahti ja vähennetty liike voivat vaihtaa vuoden joka kehyksellä).
//   Kun kello saapuu pysäkille, sama kehys voi soittaa sekä naksun että kilahduksen (web sama).
// Äänet itse: Synteesi (PCM) ja Unity-puolen LinssiTehosteet; KeksinnotLinssi kutsuu ILinssiYmparisto.Tehoste.
using System;
using Pysakki = Matkakirja.Linssit.Aikajana.Pysakki;

namespace Matkakirja.Linssit.Aanet
{
    public sealed class KeksintojenAanet
    {
        /// <summary>Tehosteiden nimet (web sfx.play-nimet, ILinssiYmparisto.Tehoste).</summary>
        public const string Keksinto = "keksinto", Vuosi = "vuosi";
        /// <summary>Naksahdusten vähimmäisväli (web AIKAJANA_NAKSU_VALI_MS).</summary>
        public const double NaksuValiMs = Matkakirja.Linssit.Aikajana.Kello.NaksuValiMs;

        long? askel;
        double viimeNaksu = double.NegativeInfinity;

        /// <summary>Soineet kilahdukset ja naksahdukset sekä harvennuksen ohittamat (linssi-loki ja testit).</summary>
        public int Kilahduksia { get; private set; }
        public int Naksuja { get; private set; }
        public int Harvennettuja { get; private set; }

        /// <summary>Kellon näytetty askel (web kellonNaytto(arvo, 1, 1)): kokonainen vuosi, ei negatiivinen.</summary>
        public static long Askel(double paikka) => (long)Math.Floor(Math.Max(0, paikka));

        /// <summary>
        /// Kellon lukema joka kehys (web naytaVuosi). True = naksahdus soi nyt. kaynnissa = kello käy (web this.kaynnissa),
        /// nytMs = seinäkello millisekunteina (web performance.now()).
        /// </summary>
        public bool Kello(double paikka, bool kaynnissa, double nytMs)
        {
            long uusi = Askel(paikka);
            bool elava = askel.HasValue && askel.Value != uusi;
            askel = uusi;
            if (!elava || !kaynnissa) return false;
            if (nytMs - viimeNaksu < NaksuValiMs) { Harvennettuja++; return false; }
            viimeNaksu = nytMs;
            Naksuja++;
            return true;
        }

        /// <summary>Pysäkki syttyi käyvällä kellolla (web sytyta → keksinnonAani). True = kilahdus soi.</summary>
        public bool Sytyta(Pysakki p)
        {
            if (p == null || p.Hiljainen || p.Paalu) return false;
            Kilahduksia++;
            return true;
        }

        /// <summary>Kello asetetaan alkuun ilman ääntä (web alusta: naytaVuosi(alku, true)).</summary>
        public void Nollaa() => askel = null;
    }
}
