// PELIOHJAIN: ENSISAAPUMISEN LUENNAN LYKKÄYS (liikkumisen pariteetti C16; Natiivi-UI).
//
// Web (omistaja 7.9.2026, Raamattu PULUN UUSI RYTMI ATEENASSA): ensimmäisellä saapumisella koskaan pulu
// paljastaa tuuraavansa kahdella kuplalla ENNEN isoisän luentaa. Aloituslennon lopussa lippu nostetaan ennen
// saapumisen piirtoa (ui.js luennanLykkays = livianPaljastusOdottaa), saapuminen tallettaa luennan mutta ei
// soita sitä (asetaMerkinnanLuenta), ja pulun sarja päästää sen liikkeelle toisen kuplan jälkeen
// (livia.js vapautaLuenta → ui.js aloitaLykattyLuenta).
//
// Natiivissa Natiivi-UI:n LivianPaljastus kertoo synkronisesti EnsisaapumisenLykkays-kysymyksellä, onko
// paljastus tulossa; Perilla(aloituslento) nostaa lipun, SaavuLehteen tallettaa luennon ja
// AloitaLykattyLuenta soittaa sen. Muu saapuminen, paikan puheen vaiennus ja uusi matka laskevat lipun.
using System;
using Matkakirja.Peli;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>
        /// Natiivi-UI (LivianPaljastus): lykätäänkö aloituslennon kohteen luentaa pulun kuplien taakse
        /// (web livianPaljastusOdottaa). Kysytään synkronisesti ennen saapumista.
        /// </summary>
        public Func<string, bool> EnsisaapumisenLykkays;

        string lykkaysKaupunki;
        Luento lykattyLuento;

        /// <summary>Kaupungin luenta odottaa pulun kuplia (Saapumisesitys ei kirjoita merkintää ilman luentaa).</summary>
        public bool LuentaLykatty(string kaupunki) => kaupunki != null && kaupunki == lykkaysKaupunki;

        /// <summary>Perilla: lippu vain aloituslennon kohteelle, muu saapuminen laskee sen.</summary>
        void AsetaLykkays(string kaupunki, bool aloituslento)
        {
            lykattyLuento = null;
            lykkaysKaupunki = null;
            if (kaupunki == null || !aloituslento) return;
            try { if (EnsisaapumisenLykkays?.Invoke(kaupunki) == true) lykkaysKaupunki = kaupunki; }
            catch (Exception e) { UnityEngine.Debug.LogException(e); }
        }

        /// <summary>SaavuLehteen: luento talteen, jos lippu on ylhäällä. true = lykättiin.</summary>
        bool LykkaaLuento(string kaupunki, Luento l)
        {
            if (!LuentaLykatty(kaupunki)) return false;
            lykattyLuento = l;
            StartCoroutine(Varakutsu(kaupunki, l));
            return true;
        }

        /// <summary>
        /// Varakutsu (Pelikoodarin huomio 25.9.): jos pulun sarja ei päästä luentaa (kupla kaatui, näkymä suljettiin),
        /// lykätty luento soi viimeistään 30 s kuluttua. Sarja kestää tavallisesti 12–15 s (1,8 s + kaksi kuplaa).
        /// </summary>
        System.Collections.IEnumerator Varakutsu(string kaupunki, Luento l)
        {
            yield return new UnityEngine.WaitForSecondsRealtime(LykkayksenKattoS);
            if (lykkaysKaupunki != kaupunki || lykattyLuento != l) yield break;
            UnityEngine.Debug.Log("MATKAKIRJA peli: lykätty luento varakutsulla (" + kaupunki + ")");
            AloitaLykattyLuenta();
        }

        const float LykkayksenKattoS = 30f;

        /// <summary>Lippu alas ja lykätty luento pois (paikan puheen vaiennus, uusi matka).</summary>
        void PeruLykkays()
        {
            lykkaysKaupunki = null;
            lykattyLuento = null;
        }

        /// <summary>
        /// Web aloitaLykattyLuenta: lippu alas ja lykätty luento soimaan, jos pelaaja on yhä kaupungissa eikä
        /// puhetta ohitettu. Turvallinen kutsua monta kertaa. true = luento lähti soimaan.
        /// </summary>
        public bool AloitaLykattyLuenta()
        {
            var k = lykkaysKaupunki;
            var l = lykattyLuento;
            PeruLykkays();
            if (k == null || l == null || LuentoOhitettu || PelaajanKaupunki != k)
            {
                // Löydös 162: lykätty luento ei soi → saapumisluenta päättyy (ohitus ja lähtö päättivät sen jo).
                if (k != null) saapumisluenta.Paata(k, LuentoOhitettu ? "ohita" : l == null ? "ei luentaa" : "lähtö");
                return false;
            }
            // Löydökset 86/89: ei paikkarivin ilmoitusta (web aloitaLykattyLuenta vain soittaa luennan).
            return SoitaSaapumisluento(k, l, 0f) == null;
        }
    }
}
