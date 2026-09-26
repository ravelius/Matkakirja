// Silta Pelikoodarin esilatausrajapinnasta kohdekaupunkien laattoihin (laattojen esilataus erä 2, Natiiviseppä 26.9.2026;
// Raamattu ESILATAUSPOLITIIKKA kohdat 3 ja 5, mitoitus lokit/laatta-esilataus/RAPORTTI-era2.md).
//   PeliOhjain.SaapuminenTiedossa (matkan alku, kohde tiedossa) → kohdemaan saapumisnäkymän laatat tasolla SeuraavaRuutu
//     ja astronautin kameran avausnäkymän reliefi; edellisen matkan ja kaikkien ennakointien esilataukset perutaan.
//   PeliOhjain.KaupunkiEnnakoitu (siirtokohteet näkyvissä tai nopan päässä joutilaana) → saapumisnäkymän laatat tasolla
//     Kohdekaupungit (kuumana ja virransäästössä seis: PeliOhjain ei ennakoi, Esilataaja ei aloita). Sama näkymä yhdistetään
//     (SaapumisLaatat.Avain), nykyisen kaupungin näkymä ohitetaan, ja enintään EnnakointejaEnintaan kerrallaan.
//   PeliOhjain.MatkaPerilla → kaikki perutaan: perillä Cesium pyytää näkymän laatat itse, ja esilatauksen loput olisivat
//     tuplahakuja näkyvän jonon perässä.
// Aloituslento ohitetaan (oma mustan verhon esilatauksensa, erä 1: KarttaKerrokset.EsilataaAvaus). Laatat haetaan taustan
// esilatauksena (Laattapalvelin.Esilataus.Tausta): ei näkyvän jonon, kiirejonon eikä verhon aikana.
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    static class SaapumisLaatatSilta
    {
        /// <summary>Ennakoitujen kohdenäkymien esilatauksia yhtä aikaa (lähimmät ensin, PeliOhjain.NopanPaassa-järjestys).</summary>
        const int EnnakointejaEnintaan = 3;

        static PeliOhjain kytketty;
        static (string avain, string kaupunki, Laattapalvelin.Esilataus e) matkan;
        static readonly List<(string avain, string kaupunki, Laattapalvelin.Esilataus e)> ennakoidut =
            new List<(string, string, Laattapalvelin.Esilataus)>();

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { kytketty = null; matkan = default; ennakoidut.Clear(); }

        // PeliOhjain syntyy omassa AfterSceneLoad-kutsussaan (järjestys ei ole taattu): kytketään, kun se on olemassa.
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista() => Esilataaja.AjaTaustalla(Seuraa());

        static IEnumerator Seuraa()
        {
            var odotus = new WaitForSecondsRealtime(1f);
            while (true)
            {
                var o = PeliOhjain.Instanssi;
                if (o != kytketty)
                {
                    if (kytketty != null)
                    {
                        kytketty.SaapuminenTiedossa -= MatkaAlkoi;
                        kytketty.KaupunkiEnnakoitu -= Ennakoitu;
                        kytketty.MatkaPerilla -= Perilla;
                    }
                    kytketty = o;
                    if (o != null)
                    {
                        o.SaapuminenTiedossa += MatkaAlkoi;
                        o.KaupunkiEnnakoitu += Ennakoitu;
                        o.MatkaPerilla += Perilla;
                    }
                }
                yield return odotus;
            }
        }

        /// <summary>Kaupungin maa ja paikka reittiverkosta sekä saapumisnäkymän avain; false, jos jokin puuttuu.</summary>
        static bool Kohde(string kaupunki, out string maa, out double lat, out double lon, out string avain)
        {
            maa = null; lat = lon = 0; avain = null;
            var v = kytketty != null ? kytketty.Verkko : null;
            var kk = KarttaKerrokset.Instanssi;
            if (kaupunki == null || v == null || kk == null || !v.Kaupungit.TryGetValue(kaupunki, out var k)) return false;
            maa = k.Maa; lat = k.Lat; lon = k.Lon;
            var sn = kk.SaapumisNakyma(maa, lat, lon);
            if (sn == null) return false;
            avain = sn.Value.avain;
            return true;
        }

        static void MatkaAlkoi(string kaupunki)
        {
            if (kytketty == null || kytketty.AloituslentoKaynnissa) return;
            if (!Kohde(kaupunki, out var maa, out var lat, out var lon, out var avain)) return;
            // Kohde vaihtui tai lukittui: ennakoinnit ja edellinen matka pois (jo levylle tulleet laatat jäävät).
            PeruEnnakoinnit();
            if (matkan.e != null && matkan.avain == avain && !matkan.e.Peruttu && matkan.e.Osuus < 1f) return;
            matkan.e?.Peru();
            var e = KarttaKerrokset.Instanssi.EsilataaSaapumisalue(kaupunki, maa, lat, lon, Taso.SeuraavaRuutu, linssi: true);
            matkan = (avain, kaupunki, e);
        }

        static void Ennakoitu(string kaupunki, Taso taso)
        {
            if (kytketty == null || kytketty.AloituslentoKaynnissa || Esilataaja.Seis) return;
            if (!Kohde(kaupunki, out var maa, out var lat, out var lon, out var avain)) return;
            // Nykyisen kaupungin saapumisnäkymä on jo ladattu (pelaaja on siinä), ja sama näkymä ladataan vain kerran.
            if (Kohde(kytketty.PelaajanKaupunki, out _, out _, out _, out var nykyinen) && nykyinen == avain) return;
            ennakoidut.RemoveAll(x => x.e == null || x.e.Peruttu || x.e.Osuus >= 1f);
            if ((matkan.avain == avain && matkan.e != null && !matkan.e.Peruttu) || ennakoidut.Exists(x => x.avain == avain)) return;
            if (ennakoidut.Count >= EnnakointejaEnintaan) return;
            var e = KarttaKerrokset.Instanssi.EsilataaSaapumisalue(kaupunki, maa, lat, lon, taso, linssi: false);
            if (e != null) ennakoidut.Add((avain, kaupunki, e));
        }

        static void Perilla(string kaupunki)
        {
            matkan.e?.Peru();
            matkan = default;
            PeruEnnakoinnit();
        }

        static void PeruEnnakoinnit()
        {
            foreach (var x in ennakoidut) x.e?.Peru();
            ennakoidut.Clear();
        }
    }
}
