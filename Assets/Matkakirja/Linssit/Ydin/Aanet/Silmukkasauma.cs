// SAUMATON MP3-SILMUKKA (Pelikoodari 9.10.2026, PT:n silmukkatarkistus, juna 174): iOS:n FMOD ei leikkaa MP3:n kooderiviivettä
// (AjattelijaTahti.Mp3Ohitus, mitattu 4.10.: 2257 näytettä = tagikehys 1152 + LAME 576 + dekooderi 529) eikä lopun täytettä, joten
// AudioSource.loop = true soitti jokaisessa saumassa ~51 ms hiljaisuutta (34 silmukkaa). Tämä laskee klipin kelvollisen alueen
// [Alku, Loppu) LAME-tagista tai varalla klipin alun hiljaisuudesta, sekä hetken, jolloin soiva kierros saavuttaa Lopun, jotta seuraava
// kierros ajastetaan näytetarkasti (PlayScheduled) ilman PCM-kopiota muistiin. Puhdas C#: Linssit-testit (SilmukkasaumaTestit).
using System;
using Matkakirja.Linssit.Ajattelijat;

namespace Matkakirja.Linssit.Aanet
{
    public static class Silmukkasauma
    {
        /// <summary>Saumatapa: Liitos = näytetarkka ajastettu jatko (PCM-klippi, tunnettu alue); Risti = 1,2 s ristihäivytys (pakattu klippi,
        /// tai alue tuntematon ja klippi ≥ RistiMinS); Tavallinen = loop = true (lyhyt klippi ilman tunnettua aluetta).</summary>
        public enum Tapa { Liitos, Risti, Tavallinen }

        /// <summary>Ristihäivytyksen mitat (samat kuin KaupunkiAanimaisemaSoitin ja ElavaSilmukka).</summary>
        public const double RistiS = 1.2, RistiAlkuS = 2.5, RistiMinS = 3 * RistiAlkuS;
        /// <summary>Liitoksen ajastus: seuraava kierros ajastetaan, kun Loppuun on alle tämän verran (s); ensimmäinen kierros alkaa näin pian.</summary>
        public const double EnnakkoS = 0.2, AloitusViiveS = 0.03;
        /// <summary>Varalla etsittävän alun hiljaisuuden enimmäispituus (näytteet, FMOD:n 2257 + pelivara) ja raja (−80 dBFS).</summary>
        public const int AlkuEnintaan = 4608; public const double HiljaisuusRaja = 1e-4;

        /// <summary>Kelvollinen alue tagista: alku = Mp3Ohitus, pituus = kehykset × näytteet − viive − täyte; leikattu tai ei tagia → koko klippi.</summary>
        public static (long alku, long loppu) Alue(AjattelijaTahti.Mp3Tiedot? t, long naytteita)
        {
            if (naytteita <= 0) return (0, 0);
            int alku = AjattelijaTahti.Mp3Ohitus(t, naytteita);
            if (alku <= 0 || t == null) return (0, naytteita);
            long pituus = t.Value.Naytteita - t.Value.Viive - t.Value.Tayte;
            if (pituus <= 0) return (alku, naytteita);
            return (alku, Math.Min(naytteita, alku + pituus));
        }

        /// <summary>Vara ilman tagia: alun hiljaisuus (kooderiviive) ohitetaan, enintään AlkuEnintaan näytettä; loppu = klipin loppu
        /// (täyte on hiljaisuutta, enintään ~38 ms). alku = ensimmäinen näyte, jonka itseisarvo ylittää rajan.</summary>
        public static long AlkuHiljaisuudesta(float[] alku, int kanavia)
        {
            if (alku == null || kanavia <= 0) return 0;
            int n = Math.Min(alku.Length / kanavia, AlkuEnintaan);
            for (int i = 0; i < n; i++)
                for (int k = 0; k < kanavia; k++)
                    if (Math.Abs(alku[i * kanavia + k]) > HiljaisuusRaja) return i;
            return n;
        }

        /// <summary>iOS-FMOD:n alkuviive täysillä kehyksillä (tagikehys 1152 + LAME 576 + dekooderi 529).</summary>
        public const int FmodOhitus = 2257;

        /// <summary>Vara-alue ilman tagia: jos klippi on täysiä MP3-kehyksiä (näytteitä × 1152, FMOD ei leikannut), alun hiljaisuus
        /// ohitetaan enintään FmodOhitus näytettä (askelten tarkoituksellinen alkutauko säilyy); muuten (WAV, leikattu) koko klippi.</summary>
        public static (long alku, long loppu) VaraAlue(long hiljaisuus, long naytteita)
            => naytteita > 0 && naytteita % 1152 == 0 ? (Math.Min(Math.Max(0, hiljaisuus), FmodOhitus), naytteita) : (0, Math.Max(0, naytteita));

        /// <summary>Tapa klipin tiedoista: PCM (myös WAV) → Liitos; pakattu, jonka LAME-tagi on tiedossa → Liitos (hakuton jatko ei tarvitse
        /// pakatun MP3:n hakua, joka ei ole näytetarkka; juna 174: pakatut laivat ja lyhyet pankkisilmukat); pakattu ilman tagia → Risti
        /// (≥ RistiMinS) tai Tavallinen.</summary>
        public static Tapa Valitse(bool pakattu, double pituusS, bool tagi = false) => !pakattu || tagi ? Tapa.Liitos : pituusS >= RistiMinS ? Tapa.Risti : Tapa.Tavallinen;

        /// <summary>Soivan kierroksen kohta (näytteet) dsp-hetkellä nyt: kierros alkoi hetkellä t0 kohdasta kohta0, sävelkorkeus savel.</summary>
        public static double Kohta(double kohta0, double t0, double nyt, int taajuus, double savel) => kohta0 + Math.Max(0, nyt - t0) * taajuus * savel;

        /// <summary>Dsp-hetki, jolloin kierros saavuttaa Lopun (seuraavan kierroksen PlayScheduled ja tämän SetScheduledEndTime).</summary>
        public static double LoppuHetki(double kohta0, double t0, long loppu, int taajuus, double savel)
            => t0 + Math.Max(0, loppu - kohta0) / (taajuus * Math.Max(1e-3, savel));

        /// <summary>Seuraavan kierroksen käynnistyshetki klipin ALUSTA (ei hakua): alkuviive (alku näytettä) soi hiljaisuutena edellisen
        /// kierroksen lopun alla, ja kelvollinen alku osuu tasan liitoshetkeen. Hakuton liitos toimii myös pakatulle ja striimatulle
        /// datalle, jonka haku ei ole näytetarkka (loppumusiikki).</summary>
        public static double KaynnistysHetki(double liitos, long alku, int taajuus, double savel) => liitos - alku / (taajuus * Math.Max(1e-3, savel));

        /// <summary>Aloituskohta kelvollisen alueen sisällä (pyydetty kohta näytteinä, esim. satunnainen alku): rajataan [alku, loppu − 1].</summary>
        public static long Aloitus(long pyydetty, long alku, long loppu) => Math.Max(alku, Math.Min(Math.Max(alku, loppu - 1), pyydetty));
    }
}
