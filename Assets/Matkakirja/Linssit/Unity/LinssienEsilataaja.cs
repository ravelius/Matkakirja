// LINSSIEN ESILATAUS (Raamattu ESILATAUSPOLITIIKKA kohdat 4 ja 6; Pelikoodarin Esilataaja erä 4: rajapinta Kuvat.Esilataa,
// Esilataaja.Hae ja Esilataaja.Joutilas, listat Linssisepältä). Listat: Linssit/Ydin/LinssienEsilataus.
//
//   6) LINSSI AUKEAA (Taso.SeuraavaRuutu): koko kaari levylle heti (Kuvat.Esilataa: ei purkua) ja kaksi ensimmäistä
//      pysäkkiä purettuina muistiin (Kuvat.Hae) vasta avauksen jälkeen (TaysinaViiveS), ettei purku osu avauskehykseen.
//      Ihmisen matka I/II, keksinnöt ja astronautin kamera.
//   4) JOUTILAANA (Esilataaja.Joutilas, Taso.TamaKaupunki), kun mikään linssi ei ole auki: Ihmisen matkan kaari levylle,
//      jotta linssi aukeaa ilman verkkoa. Kuvat.Esilataa ohittaa jo levyllä olevat, joten toisto on halpa.
//   Radion asemien puskurointi, avaruuslinssin topografia ±1 zoom sekä radiomastot ja yövalot eivät ole kuvia: ne
//   tulevat omina erinään (Laattapalvelin.Esilataa ja radion soitin).
using System.Collections;
using Matkakirja.Linssit;
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
            if (l == null || !(Lista(l) is { } lista)) return;
            foreach (var kuva in lista.Kaari) Kuvat.Esilataa(kuva, Taso.SeuraavaRuutu);
            if (ohjain != null && lista.Taysina.Count > 0) ohjain.StartCoroutine(Taysina(l, lista));
            ohjain?.Kirjaa($"esilataus: {l.Tiedot.Id} kaari {lista.Kaari.Count}, täysinä {lista.Taysina.Count}");
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
            foreach (var l in rekisteri.Kaikki)
            {
                if (!(l is LinssiOhjain.IhmisenMatkaSovitin s)) continue;
                // I ja II jakavat saman aineiston: yksi lista riittää.
                foreach (var kuva in LinssienEsilataus.IhmisenMatka(s.Aineisto).Kaari) Kuvat.Esilataa(kuva, Taso.TamaKaupunki);
                return;
            }
        }
    }
}
