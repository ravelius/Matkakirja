// SEIKKAILUN TAPIT (omistaja 7.10.: Olavinlinna seikkailuna, vapaa kävely olan yli; Päätoimittaja kuittasi; Siirtosepän pyyntö):
// kävelytilan kaksi tappia OpasTapit-kaavalla ja TAPPI-pohjalla (Pohjat/ohjausnappi.uss), ei uusia pohjia. Toisin kuin oppaassa
// molemmat antavat täydet 2D-arvot: VASEN = liike (x sivulle, y eteen), OIKEA = katse (x kääntö, y nosto). Näkyvät, kun
// SeikkailuPelaaja.Aktiivinen != null (Siirtoseppä; luetaan heijastuksella, jotta haara ei riipu hänen haarastaan), ja lukevat
// arvot staattisina (Siirtoseppä heijastuksella kuten opas). Kuvakkeet olemassa olevista: kompassi (liike) ja silmä (katse).
using System.Reflection;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuTapit
    {
        /// <summary>Liike: x = sivulle (+ oikealle), y = eteen (+) / taakse (−); −1…1, irrotus → 0.</summary>
        public static Vector2 Vasen { get; private set; }
        /// <summary>Katse: x = kääntö (+ oikealle), y = nosto (+ ylös); −1…1, irrotus → 0.</summary>
        public static Vector2 Oikea { get; private set; }
        /// <summary>Pelaaja koskee jompaakumpaa tappia.</summary>
        public static bool Kosketaan => vasen?.Kosketaan == true || oikea?.Kosketaan == true;
        /// <summary>Testi `ui seikkailutapit on|off|auto`: näkyvyys ilman SeikkailuPelaajaa.</summary>
        public static bool? TestiNakyy;

        static OpasTapit.Tappi vasen, oikea;
        static SeikkailuTapit viimeisin;
        readonly VisualElement juuri;
        bool nakyy;
        static PropertyInfo aktiivinen;
        static bool haettu;

        public SeikkailuTapit(UiKerros kerros, int kerrosNro)
        {
            juuri = Rakenne.El("mk-seikkailutapit", kerros.Turva(kerrosNro), PickingMode.Ignore);
            juuri.style.position = Position.Absolute;
            juuri.style.left = 0; juuri.style.right = 0; juuri.style.top = 0; juuri.style.bottom = 0;
            vasen = new OpasTapit.Tappi(juuri, "mk-tappi mk-tappi--vasen", Ikonit.Viiva["kompassi"], v => Vasen = v);
            oikea = new OpasTapit.Tappi(juuri, "mk-tappi mk-tappi--oikea", Ikonit.Viiva["silma"], v => Oikea = v);
            vasen.Juuri.tooltip = "Liiku";
            oikea.Juuri.tooltip = "Katso ympärillesi";
            kerros.JokaRuutu += Paivita;
            viimeisin = this;
        }

        /// <summary>SeikkailuPelaaja.Aktiivinen != null (Siirtoseppä, Linssit/Unity/SeikkailuPelaaja.cs) heijastuksella.</summary>
        static bool PelaajaAktiivinen()
        {
            if (!haettu)
            {
                haettu = true;
                var t = typeof(SeikkailuTapit).Assembly.GetType("Matkakirja.Natiivi.SeikkailuPelaaja");
                aktiivinen = t?.GetProperty("Aktiivinen", BindingFlags.Public | BindingFlags.Static);
            }
            return aktiivinen?.GetValue(null) is Object o && o != null;
        }

        void Paivita()
        {
            bool nayta = TestiNakyy ?? PelaajaAktiivinen();
            if (nayta == nakyy) return;
            nakyy = nayta;
            vasen.Nayta(nayta);
            oikea.Nayta(nayta);
            // Alareuna ja sivureuna kuten oppaan tapeilla (krediittien yläpuolella, reunasta OpasTapit.Reuna).
            vasen.Juuri.style.bottom = 40f; oikea.Juuri.style.bottom = 40f;
            Debug.Log("MATKAKIRJA seikkailutapit: " + (nayta ? "näkyvät" : "piilossa"));
        }

        /// <summary>Testi: tila, arvot ja laatikot.</summary>
        public static string Kuvaus()
        {
            if (viimeisin == null) return "seikkailutapit: ei luotu";
            Rect a = vasen.Juuri.worldBound, b = oikea.Juuri.worldBound;
            return $"seikkailutapit {(viimeisin.nakyy ? "näkyvät" : "piilossa")}, vasen {Vasen.x:0.00},{Vasen.y:0.00} @ {a.xMin:0},{a.yMin:0} {a.width:0}×{a.height:0}, "
                 + $"oikea {Oikea.x:0.00},{Oikea.y:0.00} @ {b.xMin:0},{b.yMin:0} {b.width:0}×{b.height:0}, kosketaan {Kosketaan}";
        }
    }
}
