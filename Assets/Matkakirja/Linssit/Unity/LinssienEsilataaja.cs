// LINSSIEN ESILATAUS (Raamattu ESILATAUSPOLITIIKKA kohdat 4 ja 6; Pelikoodarin Esilataaja erä 4: rajapinta Kuvat.Esilataa,
// Esilataaja.Hae ja Esilataaja.Joutilas, listat Linssisepältä). Listat: Linssit/Ydin/LinssienEsilataus.
//
//   6) LINSSI AUKEAA (Taso.SeuraavaRuutu): koko kaari levylle heti (Kuvat.Esilataa: ei purkua) ja kaksi ensimmäistä
//      pysäkkiä purettuina muistiin (Kuvat.Hae) vasta avauksen jälkeen (TaysinaViiveS), ettei purku osu avauskehykseen.
//      Ihmisen matka I/II, keksinnöt ja astronautin kamera.
//   4) JOUTILAANA (Esilataaja.Joutilas, Taso.TamaKaupunki), kun mikään linssi ei ole auki: Ihmisen matkan kaari levylle,
//      jotta linssi aukeaa ilman verkkoa. Kuvat.Esilataa ohittaa jo levyllä olevat, joten toisto on halpa.
//   LAATAT (kohdat 4 ja 6: "avaruuslinssin topografia nykyisellä zoomilla ±1", "radiomastot ja yövalot"): Ydin
//      Laattalista antaa näkymän laatat tasoilla z, z+1 ja z−1, ja Laattapalvelin.Esilataa hakee ne levylle näkyvän
//      kartan jonon ollessa tyhjä (jo välimuistissa olevat ohitetaan).
//      - Reliefilinssi auki (topografia, vesistöt, radio, astronautin kamera): kamera katsotaan KameranTarkistusS välein,
//        ja kun se on pysähtynyt uuteen näkymään, sen laatat ±1 (radiossa myös yövalot). Edellinen esilataus perutaan.
//      - Joutilaana: kun Esilataajan jono on tyhjä (nostot, lehdet ja puheet ensin), nykyisen näkymän reliefi ja
//        yövalot sekä astronautin kameran avausnäkymä (koko pallo saman paikan yllä, AstronauttiLinssi.Avaa).
//      Mastot ovat aineistoa sisältöpaketissa ja piirtyvät proseduraalisesti, joten niille ei haeta mitään.
//   Radion asemien puskurointi tarvitsee toisen soittimen MatkakirjaRadio.mm:ään (Natiiviseppä), joten se on oma eränsä.
using System;
using System.Collections;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Astronautti;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class LinssienEsilataaja
    {
        /// <summary>Täysinä purettavien kuvien viive linssin avauksesta (s): avauksen raskas kehys ensin.</summary>
        public const float TaysinaViiveS = 1.5f;

        static LinssiOhjain ohjain;
        static Linssirekisteri rekisteri;
        static bool joutilasKytketty;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { ohjain = null; rekisteri = null; joutilasKytketty = false; }

        public static void Kytke(LinssiOhjain o, Linssirekisteri r)
        {
            ohjain = o;
            rekisteri = r;
            r.Vaihtui += Avattu;
            if (!joutilasKytketty)
            {
                Esilataaja.Joutilas += Joutilaana;
                joutilasKytketty = true;
            }
        }

        /// <summary>Linssin esilatauslista, tai null, jos linssillä ei ole pysäkkikuvia.</summary>
        public static EsilatausLista? Lista(ILinssi l) => l switch
        {
            LinssiOhjain.IhmisenMatkaSovitin s => LinssienEsilataus.IhmisenMatka(s.Aineisto),
            LinssiOhjain.KeksinnotSovitin s => LinssienEsilataus.Keksinnot(s.Aineisto),
            LinssiOhjain.AstronauttiSovitin s => LinssienEsilataus.Astronautti(s.Aineisto),
            _ => null,
        };

        static void Avattu(ILinssi l)
        {
            if (l == null) return;
            if (Sarjat(l) is { } sarjat && ohjain != null) ohjain.StartCoroutine(SeuraaKameraa(l, sarjat));
            if (!(Lista(l) is { } lista)) return;
            foreach (var kuva in lista.Kaari) Kuvat.Esilataa(kuva, Taso.SeuraavaRuutu);
            if (ohjain != null && lista.Taysina.Count > 0) ohjain.StartCoroutine(Taysina(l, lista));
            ohjain?.Kirjaa($"esilataus: {l.Tiedot.Id} kaari {lista.Kaari.Count}, täysinä {lista.Taysina.Count}");
        }

        // ── Laatat näkyvälle alueelle (Linssit/Ydin/Laattalista) ─────────────────────────────────────────────

        /// <summary>Kameran tarkistusväli linssin auki ollessa (s): pysähtynyt = sama asento kahdella peräkkäisellä.</summary>
        public const float KameranTarkistusS = 0.5f;
        /// <summary>Joutilaan hetken laattakatot: reliefi ja astronautin avaus, yövalot (mustat jpg:t ovat pieniä).</summary>
        public const int JoutilasKatto = 150, JoutilasYovaloKatto = 80;
        /// <summary>Kauanko joutilas laattalataus odottaa Esilataajan jonon tyhjenemistä (s).</summary>
        public const float JonoOdotusS = 20f;

        static Laattapalvelin.Esilataus linssinLaatat, joutilaatLaatat;

        /// <summary>Linssin laattasarjat (osoite, suurin taso); null, jos linssi ei piirrä reliefiä.</summary>
        public static (string url, int max)[] Sarjat(ILinssi l) => l switch
        {
            Topografia _ => new[] { (Topografia.ReliefiSarja, Topografia.ReliefiMaxTaso) },
            LinssiOhjain.VesistotSovitin _ => new[] { (Topografia.ReliefiSarja, Topografia.ReliefiMaxTaso) },
            LinssiOhjain.RadioSovitin _ => new[]
            {
                (Topografia.ReliefiSarja, Topografia.ReliefiMaxTaso), (RadioMastot.YovaloUrl, RadioMastot.YovaloMaxTaso),
            },
            LinssiOhjain.AstronauttiSovitin _ => new[] { (AstronauttiLinssi.ReliefinSarja(), Topografia.ReliefiMaxTaso) },
            _ => null,
        };

        /// <summary>Linssin auki ollessa: pysähtyneen kameran uuden näkymän laatat ±1.</summary>
        static IEnumerator SeuraaKameraa(ILinssi l, (string url, int max)[] sarjat)
        {
            Nakyma? edellinen = null, ladattu = null;
            while (rekisteri != null && rekisteri.Auki == l && ohjain != null)
            {
                yield return new WaitForSecondsRealtime(KameranTarkistusS);
                if (rekisteri == null || rekisteri.Auki != l || ohjain == null) break;
                var k = ohjain.Kamera;
                bool paikallaan = edellinen is Nakyma e && Lahella(e, k, 0.02);
                edellinen = k;
                if (!paikallaan || (ladattu is Nakyma d && Lahella(d, k, 0.25))) continue;
                ladattu = k;
                linssinLaatat?.Peru();
                linssinLaatat = Lataa(sarjat, k, Laattalista.Katto, l.Tiedot.Id);
            }
            linssinLaatat?.Peru();
            linssinLaatat = null;
        }

        /// <summary>Sama näkymä: keskipisteiden ero alle osuuden näkymän säteestä, korkeus ja kallistus lähes samat.</summary>
        static bool Lahella(Nakyma a, Nakyma b, double osuus)
        {
            double sade = Math.Max(1e-4, Laattalista.KulmaSade(a.Korkeus, ohjain.Nakokulma, ohjain.Kuvasuhde, a.Kallistus));
            return Laattalista.Etaisyys(a.Lat, a.Lon, b.Lat, b.Lon) <= osuus * sade
                && Math.Abs(Math.Log(Math.Max(1, b.Korkeus) / Math.Max(1, a.Korkeus), 2)) <= osuus
                && Math.Abs(a.Kallistus - b.Kallistus) <= 100 * osuus;
        }

        /// <summary>Sarjojen laatat levylle; palauttaa esilatauksen (peruttavissa) ja kirjaa määrän sekä lopputuloksen.</summary>
        static Laattapalvelin.Esilataus Lataa((string url, int max)[] sarjat, Nakyma k, int katto, string syy)
        {
            Laattapalvelin.Esilataus e = null;
            int yhteensa = 0;
            foreach (var (url, max) in sarjat)
            {
                var polut = Laattalista.Polut(url, k, ohjain.Nakokulma, ohjain.Kuvasuhde, Screen.height, 0, max,
                    Laattapalvelin.Ampari, katto);
                if (polut.Count == 0) continue;
                e = Laattapalvelin.Esilataa(polut, e);
                yhteensa += polut.Count;
            }
            if (e == null) return null;
            ohjain.Kirjaa($"esilataus: laatat {syy} {yhteensa} ({k})");
            ohjain.StartCoroutine(KirjaaTulos(e, syy));
            return e;
        }

        static IEnumerator KirjaaTulos(Laattapalvelin.Esilataus e, string syy)
        {
            float alku = Time.realtimeSinceStartup;
            while (e.Osuus < 1f && !e.Peruttu && Time.realtimeSinceStartup - alku < 60f) yield return new WaitForSecondsRealtime(1f);
            ohjain?.Kirjaa($"esilataus: laatat {syy} valmis {e.Valmis}/{e.Yhteensa}, epäonnistui {e.Epaonnistui}"
                + $"{(e.Peruttu ? ", peruttu" : "")} ({Time.realtimeSinceStartup - alku:F1} s)");
        }

        /// <summary>Joutilaana, kun Esilataajan jono on tyhjä: nykyisen näkymän reliefi ja yövalot, astronautin avausnäkymä.</summary>
        static IEnumerator JoutilaatLaatat()
        {
            // Muut Joutilas-kuuntelijat (nostot, lehdet, puheet) jonottavat samassa kehyksessä: ne ensin.
            yield return null;
            float alku = Time.realtimeSinceStartup;
            while ((Esilataaja.Jonossa > 0 || Esilataaja.Kaynnissa > 0) && Time.realtimeSinceStartup - alku < JonoOdotusS)
                yield return new WaitForSecondsRealtime(0.5f);
            if (rekisteri == null || rekisteri.Auki != null || ohjain == null || Esilataaja.Seis) yield break;
            joutilaatLaatat?.Peru();
            var k = ohjain.Kamera;
            joutilaatLaatat = Lataa(new[] { (Topografia.ReliefiSarja, Topografia.ReliefiMaxTaso) }, k, JoutilasKatto,
                "joutilas reliefi");
            Lataa(new[] { (RadioMastot.YovaloUrl, RadioMastot.YovaloMaxTaso) }, k, JoutilasYovaloKatto, "joutilas yövalot");
            // Astronautin kamera avautuu koko pallon korkeudelle saman paikan yllä, leveys ±55° (AstronauttiLinssi.Avaa).
            var avaus = new Nakyma(Math.Max(-55, Math.Min(55, k.Lat)), k.Lon, ohjain.KokoPallonKorkeus);
            Lataa(new[] { (AstronauttiLinssi.ReliefinSarja(), Topografia.ReliefiMaxTaso) }, avaus, JoutilasKatto,
                "joutilas astronautti");
        }

        static IEnumerator Taysina(ILinssi l, EsilatausLista lista)
        {
            yield return new WaitForSecondsRealtime(TaysinaViiveS);
            if (rekisteri == null || rekisteri.Auki != l) yield break;   // linssi vaihtui odottaessa
            foreach (var kuva in lista.Taysina) Kuvat.Hae(kuva, _ => { });
        }

        static void Joutilaana()
        {
            if (rekisteri == null || rekisteri.Auki != null) return;
            if (ohjain != null) ohjain.StartCoroutine(JoutilaatLaatat());
            foreach (var l in rekisteri.Kaikki)
            {
                if (!(l is LinssiOhjain.IhmisenMatkaSovitin s)) continue;
                // I ja II jakavat saman aineiston: yksi lista riittää.
                var kaari = LinssienEsilataus.IhmisenMatka(s.Aineisto).Kaari;
                foreach (var kuva in kaari) Kuvat.Esilataa(kuva, Taso.TamaKaupunki);
                ohjain?.Kirjaa($"esilataus: joutilaana ihmisen matkan kaari {kaari.Count}");
                return;
            }
        }
    }
}
