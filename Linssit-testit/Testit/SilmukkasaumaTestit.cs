// Saumaton MP3-silmukka (Silmukkasauma): kelvollinen alue LAME-tagista, vara alun hiljaisuudesta, tapa ja liitoksen ajastus.
// Luvut: aanet/laatu-korvaajat-v1/kanava-liplatus-01.mp3 (Info-tagi: 1599 kehystä, viive 576, täyte 797; ffmpeg:n aukoton
// purku 1 840 675 näytettä = 1599 × 1152 − 576 − 797, Pelikoodari 9.10.2026) ja iOS-FMOD (tagikehys mukana: 1600 × 1152).
using System;
using Matkakirja.Linssit.Aanet;
using Matkakirja.Linssit.Ajattelijat;

namespace Matkakirja.Linssit.Testit
{
    public static class SilmukkasaumaTestit
    {
        static readonly AjattelijaTahti.Mp3Tiedot Kanava = new AjattelijaTahti.Mp3Tiedot(1599, 1152, 576, 797);

        [Testi] static void AlueFmodinPurustaOnFfmpeginPituus()
        {
            // FMOD iOS: tagikehys dekoodataan hiljaisuudeksi → 1600 × 1152 näytettä, alku 2257, pituus sama kuin ffmpeg:llä.
            var (alku, loppu) = Silmukkasauma.Alue(Kanava, 1600L * 1152);
            Oleta.Sama(2257L, alku);
            Oleta.Sama(1840675L, loppu - alku);
            Oleta.Tosi(loppu <= 1600L * 1152, "loppu klipin sisällä");
            // Ilman tagikehystä (kehykset × näytteet): alku 1105, sama pituus.
            var (a2, l2) = Silmukkasauma.Alue(Kanava, 1599L * 1152);
            Oleta.Sama(1105L, a2); Oleta.Sama(1840675L, l2 - a2);
        }

        [Testi] static void AlueLeikattuTaiIlmanTagiaOnKokoKlippi()
        {
            Oleta.Sama((0L, 1840675L), Silmukkasauma.Alue(Kanava, 1840675));   // dekooderi leikkasi jo (selain, ffmpeg)
            Oleta.Sama((0L, 44100L), Silmukkasauma.Alue(null, 44100));          // WAV tai ei tagia
            Oleta.Sama((0L, 0L), Silmukkasauma.Alue(Kanava, 0));
        }

        [Testi] static void AlkuHiljaisuudestaOhittaaViiveenMuttaEiSisaltoa()
        {
            var x = new float[2 * 5000];
            for (int i = 2257; i < 5000; i++) { x[2 * i] = 0.2f; x[2 * i + 1] = -0.2f; }
            Oleta.Sama(2257L, Silmukkasauma.AlkuHiljaisuudesta(x, 2));
            var hiljainen = new float[2 * 8000];
            Oleta.Sama((long)Silmukkasauma.AlkuEnintaan, Silmukkasauma.AlkuHiljaisuudesta(hiljainen, 2), "enintään AlkuEnintaan (askelten tauko ei leikkaudu)");
            var heti = new float[] { 0.5f, 0.5f };
            Oleta.Sama(0L, Silmukkasauma.AlkuHiljaisuudesta(heti, 2));
        }

        [Testi] static void VaraAlueVainTaysillaKehyksilla()
        {
            Oleta.Sama((2257L, 1152L * 100), Silmukkasauma.VaraAlue(4608, 1152L * 100), "FMOD-kehykset: enintään 2257");
            Oleta.Sama((1105L, 1152L * 100), Silmukkasauma.VaraAlue(1105, 1152L * 100));
            Oleta.Sama((0L, 44101L), Silmukkasauma.VaraAlue(3000, 44101), "WAV: ei leikata");
        }

        [Testi] static void TapaPakatustaJaPcmsta()
        {
            Oleta.Sama(Silmukkasauma.Tapa.Liitos, Silmukkasauma.Valitse(false, 2.0));   // askeleet, sydän: PCM
            Oleta.Sama(Silmukkasauma.Tapa.Liitos, Silmukkasauma.Valitse(false, 60));
            Oleta.Sama(Silmukkasauma.Tapa.Risti, Silmukkasauma.Valitse(true, 20));      // lokkiparvi, laivat: pakattu
            Oleta.Sama(Silmukkasauma.Tapa.Tavallinen, Silmukkasauma.Valitse(true, 5));
            Oleta.Sama(Silmukkasauma.Tapa.Liitos, Silmukkasauma.Valitse(true, 6, tagi: true), "pakattu höyrykone 6 s tagilla: hakuton liitos");
            Oleta.Sama(Silmukkasauma.Tapa.Liitos, Silmukkasauma.Valitse(true, 30, tagi: true));
        }

        [Testi] static void LiitosAjastetaanLopunHetkeen()
        {
            // Kierros alkoi dsp 10,0 s kohdasta 2257; 44,1 kHz, sävel 1 → loppu 2257 + 1 840 675 saavutetaan 41,7387 s myöhemmin.
            var (alku, loppu) = Silmukkasauma.Alue(Kanava, 1600L * 1152);
            double t = Silmukkasauma.LoppuHetki(alku, 10.0, loppu, 44100, 1.0);
            Oleta.Tosi(Math.Abs(t - (10.0 + 1840675.0 / 44100)) < 1e-9, "loppuhetki");
            // Sävel 1,25 (askeleet juoksussa): lyhenee samassa suhteessa; kohta etenee taajuus × sävel.
            Oleta.Tosi(Math.Abs(Silmukkasauma.LoppuHetki(alku, 10.0, loppu, 44100, 1.25) - (10.0 + 1840675.0 / 44100 / 1.25)) < 1e-9, "sävel");
            Oleta.Tosi(Math.Abs(Silmukkasauma.Kohta(alku, 10.0, 11.0, 44100, 1.25) - (alku + 55125)) < 1e-9, "kohta");
            Oleta.Sama(alku, (long)Silmukkasauma.Kohta(alku, 10.0, 9.0, 44100, 1.0), "ei ennen alkua");
        }

        [Testi] static void HakutonKaynnistysEnnenLiitosta()
        {
            // Loppumusiikki (loppu-silmukka.mp3: Info 2211 kehystä, viive 576, täyte 609): FMOD-alku 2257 → seuraava kierros alkaa
            // 2257/44100 s ennen liitosta, jolloin sen ensimmäinen kelvollinen näyte soi liitoshetkellä.
            var t = new AjattelijaTahti.Mp3Tiedot(2211, 1152, 576, 609);
            var (alku, loppu) = Silmukkasauma.Alue(t, 2212L * 1152);
            Oleta.Sama(2257L, alku); Oleta.Sama(2545887L, loppu - alku, "ffmpeg:n aukoton pituus");
            double k = Silmukkasauma.KaynnistysHetki(100.0, alku, 44100, 1.0);
            Oleta.Tosi(Math.Abs(k + alku / 44100.0 - 100.0) < 1e-12, "alku osuu liitokseen");
            Oleta.Tosi(Silmukkasauma.KaynnistysHetki(100.0, alku, 44100, 1.0) > 100.0 - Silmukkasauma.EnnakkoS, "ennakko riittää");
        }

        [Testi] static void AloitusRajataanAlueelle()
        {
            Oleta.Sama(2257L, Silmukkasauma.Aloitus(0, 2257, 100000));     // satunnainen 0 → kelvollinen alku
            Oleta.Sama(99999L, Silmukkasauma.Aloitus(120000, 2257, 100000));
            Oleta.Sama(5000L, Silmukkasauma.Aloitus(5000, 2257, 100000));
        }
    }
}
