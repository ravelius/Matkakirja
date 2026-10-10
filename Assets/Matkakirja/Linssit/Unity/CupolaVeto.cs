// CUPOLAN KATSE VETÄMÄLLÄ LASISTA (omistaja 3.10.2026, Päätoimittaja: suora veto lasissa, ei joystickiä eikä uutta
// ohjainelementtiä). Lukee yhden sormen (tai hiiren) ja syöttää eleen puhtaalle logiikalle (Iss.IssKatse): pystyveto
// kääntää katseen kulmaa alas (≈ 21–90°), vaakaveto ilmansuuntaa, inertia 0,3 s, kaksoisnapautus palauttaa oletukseen.
//  - Vain Cupolassa (KyydinTila.Ikkuna) ilman siirtymää, kuvaa tai avaruuskävelyä. Kuvaputken (KUVAA) aikana veto ohitetaan
//    ja liike pysähtyy (IssKatse.Lukittu), jotta kuvattava näkymä ei käänny kesken.
//  - Ele alkaa vain lasin ympyrästä (IssKyytiNakyma.VedonLasi) eikä käyttöliittymän päältä (SyoteLukko.Peittaa: säätöpaneeli,
//    napit, Pulu ja ✕). Lyhyt napautus jää pallon kuuntelijoille (Pulun taulu, pöydän pienennys) kuten ennen: kynnys 10 pt
//    on sama kuin PalloKierto.napautusLiike, joten veto ei ole koskaan napautus eikä napautus veto.
//  - Pallo ei siirrä kameraa yhden sormen vedolla Cupolassa (PalloKierto.YhdenSormenVetoMuualla): kyydin Kuvaa kirjoittaa
//    kameran joka tapauksessa, mutta näin pallon oma siirto ei välähdä kehykseen ennen sitä.
//  - Kutsutaan ennen linssin päivitystä (LinssiOhjain, satelliitti), jolloin veto näkyy samassa kehyksessä. Liikkeen aikana
//    Ruudunpaivitys.Herata pitää täyden taajuuden (Cupolan oma 30 fps:n katto pysyy).
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
using UnityEngine;
using UnityEngine.InputSystem;
using Kosketus = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace Matkakirja.Natiivi
{
    public sealed class CupolaVeto
    {
        /// <summary>
        /// A/B `astro kyyti veto paalla|pois`. OLETUS POIS (omistaja 4.10.2026 "ISS-OHJAAMO UUSIKSI": katsetta ohjataan vain ja
        /// ainoastaan joystickilla). Pallon yhden sormen veto on Cupolassa silti estetty (kyyti kirjoittaa kameran).
        /// </summary>
        public static bool Kaytossa = false;

        /// <summary>A/B `astro kyyti pallolukko 0|1` (omistaja 6.10.: ohjaamossa pallon kosketus ei tee mitään); 0 = entinen käytös.</summary>
        public static bool PalloLukittuOhjaamossa = true;

        bool alhaalla, ohita;
        PalloKierto kierto;

        /// <summary>Viimeisin syy, miksi ele ohitettiin (tilakomento).</summary>
        public string Syy { get; private set; } = "-";

        public void Paivita(AstronauttiLinssi l, PalloKierto pallo)
        {
            kierto = pallo != null ? pallo : kierto;
            var katse = l?.CupolanKatse;
            bool cupola = l != null && l.Kyyti == KyydinTila.Ikkuna;
            if (kierto != null) kierto.YhdenSormenVetoMuualla = cupola;   // pallo ei siirrä kameraa Cupolassa (veto tai joystick)
            // ISS-ohjaamo (omistaja 6.10.: "maapalloon tarttuminen ei saa tehdä mitään"): kaikki pallon eleet pois ohjaamon tiloissa.
            if (kierto != null) kierto.EleetMuualla = PalloLukittuOhjaamossa && l != null && l.Kyydissa
                && (l.Kyyti == KyydinTila.Seuranta || l.Kyyti == KyydinTila.Ikkuna || l.Kyyti == KyydinTila.Kohde);
            if (katse == null) return;
            katse.Lukittu = IssKameraKuva.Kaynnissa;
            bool sallittu = Kaytossa && cupola && !l.KyytiSiirtyy && l.AvoinKuva == null && !l.Kavely.Kaynnissa
                && !(kierto != null && kierto.SyoteEstetty);
            float ruutuW = 0f, ruutuH = 0f;
            Vector3 lasi = default;
            bool lasiOn = sallittu && IssKyytiNakyma.VedonLasi(out lasi, out ruutuW, out ruutuH);
            if (lasiOn) katse.AsteitaPisteelle = IssKuvakulma.IkkunanKentta / ruutuH;

            // Yksi sormi tai hiiri (Mac, editori); toinen sormi keskeyttää eleen ilman inertiaa.
            var sormet = UnityEngine.InputSystem.EnhancedTouch.EnhancedTouchSupport.enabled ? Kosketus.activeTouches : default;
            int n = sormet.Count;
            bool painettu = n == 1 || (n == 0 && Mouse.current != null && Mouse.current.leftButton.isPressed);
            Vector2 px = n >= 1 ? sormet[0].screenPosition : Mouse.current != null ? Mouse.current.position.ReadValue() : Vector2.zero;
            double t = Time.realtimeSinceStartupAsDouble;   // sama kello kuin linssin Aika (IssKyyti.Paivita → IssKatse.Askel)

            if (n > 1)
            {
                // Monisormiele ei ole veto, ennen kuin kaikki sormet ovat nousseet (ei inertiaa eikä napautusta).
                if (alhaalla && !ohita) { katse.Peru(); Syy = "toinen sormi"; }
                alhaalla = ohita = true;
                Herata(katse);
                return;
            }
            if (!painettu)
            {
                if (alhaalla && !ohita)
                {
                    if (!sallittu) katse.Peru();
                    else katse.Nosta(t);
                }
                alhaalla = ohita = false;
                Herata(katse);
                return;
            }
            if (!alhaalla)
            {
                alhaalla = true;
                if (!lasiOn) { ohita = true; Syy = sallittu ? "ei lasin asettelua" : "ei Cupolassa (tai siirtymä, kuva, kävely, esto)"; }
                else if (SyoteLukko.Peittaa(px)) { ohita = true; Syy = "käyttöliittymän päällä"; }
                else ohita = !Lasilla(px, lasi, ruutuW);
                if (!ohita) { var p0 = Pt(px, ruutuW); katse.Paina(t, p0.x, p0.y); }
            }
            else if (!ohita)
            {
                if (!sallittu) { katse.Peru(); ohita = true; Syy = "tila vaihtui kesken"; }
                else { var p = Pt(px, ruutuW); katse.Liiku(t, p.x, p.y); }
            }
            Herata(katse);
        }

        void Herata(IssKatse katse)
        {
            if (katse.Liikkuu || katse.Vetaa) Ruudunpaivitys.Herata();
        }

        /// <summary>Ruudun pikseli (origo vasen alakulma) → UI-pisteet (y alas): k = Screen.width / juuren leveys (ei ScreenToPanel).</summary>
        static Vector2 Pt(Vector2 px, float ruutuW)
        {
            float k = ruutuW > 1f ? Screen.width / ruutuW : 1f;
            return new Vector2(px.x / k, (Screen.height - px.y) / k);
        }

        bool Lasilla(Vector2 px, Vector3 lasi, float ruutuW)
        {
            var p = Pt(px, ruutuW);
            bool sisalla = (p - new Vector2(lasi.x, lasi.y)).sqrMagnitude <= lasi.z * lasi.z;
            Syy = sisalla ? "lasilla" : $"lasin ulkopuolella ({p.x:0}, {p.y:0}) pt";
            return sisalla;
        }

        /// <summary>Tila lokiin (`astro kyyti katse tila`).</summary>
        public string Tila()
        {
            string lasi = IssKyytiNakyma.VedonLasi(out var l, out float w, out float h)
                ? $"lasi ({l.x:0}, {l.y:0}) r {l.z:0} pt ruudulla {w:0} × {h:0}" : "lasi: ei asettelua";
            return $"veto {(Kaytossa ? "käytössä" : "pois")}, {lasi}, ele {(alhaalla ? (ohita ? "ohitettu" : "lasilla") : "ei")}, syy {Syy}, "
                + $"pallon veto {(kierto != null && kierto.YhdenSormenVetoMuualla ? "ohjattu Cupolaan" : "pallolla")}, "
                + $"pallon eleet {(kierto != null && kierto.EleetMuualla ? "lukittu (ohjaamo)" : "auki")}";
        }

        /// <summary>Linssi suljetaan: pallon veto palautuu.</summary>
        public void Pois()
        {
            if (kierto != null) { kierto.YhdenSormenVetoMuualla = false; kierto.EleetMuualla = false; }
            alhaalla = ohita = false;
        }
    }
}
