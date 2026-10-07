// SEIKKAILUN TAPIT (omistaja 7.10.: Olavinlinna seikkailuna, vapaa kävely olan yli; Päätoimittaja kuittasi; Siirtosepän pyyntö):
// kävelytilan kaksi tappia OpasTapit-kaavalla ja TAPPI-pohjalla (Pohjat/ohjausnappi.uss), ei uusia pohjia. Toisin kuin oppaassa
// molemmat antavat täydet 2D-arvot: VASEN = liike (x sivulle, y eteen), OIKEA = katse (x kääntö, y nosto). Näkyvät, kun
// SeikkailuPelaaja.Aktiivinen != null (Siirtoseppä; luetaan heijastuksella, jotta haara ei riipu hänen haarastaan), ja lukevat
// arvot staattisina (Siirtoseppä heijastuksella kuten opas). Kuvakkeet olemassa olevista: kompassi (liike) ja silmä (katse).
// TOIMINTONAPPI (Siirtoseppä E2, keittiön harhautus): OHJAUSNAPPI-pohjalla oikean tapin yläpuolella; poimi (lähin esine) tai heitä
// (esine kädessä). Napautus asettaa SeikkailuEsineet.ToimintoPyydetty = true; näkyy vain, kun Aktiivinen.Lahin tai .Kadessa
// ei ole null (heijastuksella kuten Aktiivinen). Mac/näppäimistö: E (Siirtoseppä).
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

        /// <summary>Poimi- ja heitä-kuvakkeet (UI-POHJAT-kysymys Päätoimittajalle 7.10. 16.4x: uudet viivaikonit vai olemassa olevat).</summary>
        static string PoimiIkoni => Ikonit.Viiva["peukalo"];
        static string HeitaIkoni => Ikonit.Viiva["nuoli"];
        /// <summary>Testi `ui seikkailutapit toiminto poimi|heita|auto`: napin tila ilman SeikkailuEsineitä.</summary>
        public static string TestiToiminto;
        readonly VisualElement toimintoRivi;
        readonly Button toimintoNappi;
        string toimintoTila;   // null = piilossa, "poimi" tai "heita"
        static PropertyInfo esineetAktiivinen, esineLahin, esineKadessa;
        static FieldInfo esineToiminto;
        static bool esineetHaettu;

        public SeikkailuTapit(UiKerros kerros, int kerrosNro)
        {
            juuri = Rakenne.El("mk-seikkailutapit", kerros.Turva(kerrosNro), PickingMode.Ignore);
            juuri.style.position = Position.Absolute;
            juuri.style.left = 0; juuri.style.right = 0; juuri.style.top = 0; juuri.style.bottom = 0;
            vasen = new OpasTapit.Tappi(juuri, "mk-tappi mk-tappi--vasen", Ikonit.Viiva["kompassi"], v => Vasen = v);
            oikea = new OpasTapit.Tappi(juuri, "mk-tappi mk-tappi--oikea", Ikonit.Viiva["silma"], v => Oikea = v);
            vasen.Juuri.tooltip = "Liiku";
            oikea.Juuri.tooltip = "Katso ympärillesi";
            toimintoRivi = Ohjausnappi.Ryhma(juuri);
            toimintoRivi.style.top = StyleKeyword.Auto;
            toimintoRivi.style.right = OpasTapit.Reuna + OpasTapit.Halkaisija * 0.5f - Tyylikirja.Nappi.Ohjaus * 0.5f;
            toimintoRivi.style.bottom = TappiAla + OpasTapit.Halkaisija + 8f;
            toimintoNappi = Ohjausnappi.Nappi(PoimiIkoni, "Poimi", PyydaToiminto, toimintoRivi);
            toimintoRivi.style.display = DisplayStyle.None;
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

        /// <summary>SeikkailuEsineet (Siirtoseppä, historia-h0): "heita" kun esine kädessä, "kynttila" kun lähin on kappelin kynttilä,
        /// "poimi" kun muu lähin esine, muuten null.</summary>
        static string EsineTila()
        {
            if (!esineetHaettu)
            {
                esineetHaettu = true;
                var t = typeof(SeikkailuTapit).Assembly.GetType("Matkakirja.Natiivi.SeikkailuEsineet");
                esineetAktiivinen = t?.GetProperty("Aktiivinen", BindingFlags.Public | BindingFlags.Static);
                esineLahin = t?.GetProperty("Lahin", BindingFlags.Public | BindingFlags.Instance);
                esineKadessa = t?.GetProperty("Kadessa", BindingFlags.Public | BindingFlags.Instance);
                esineToiminto = t?.GetField("ToimintoPyydetty", BindingFlags.Public | BindingFlags.Static);
            }
            if (!(esineetAktiivinen?.GetValue(null) is Object e) || e == null) return null;
            // Pyhä esine (kalkki, pateeni, liuskekivi) lasketaan, ei heitetä (Siirtoseppä E3); muut kädessä olevat heitetään.
            if (esineKadessa?.GetValue(e) is string k && k.Length > 0) return PyhaEsine(k) ? "laske" : "heita";
            // E3 (Siirtoseppä): kynttilä, koputus ja kivet omina tiloina samalla napilla (VoiceOver-nimi Toimintonimet); kuvake kuten poimi.
            if (esineLahin?.GetValue(e) is string l && l.Length > 0) return Tila(l);
            return null;
        }

        /// <summary>Lahin-tunnuksen tila: kynttila, koputa, irrota (kivi-1…3), nosta (kalkki, pateeni, liuskekivi), muuten poimi.</summary>
        static string Tila(string lahin)
        {
            if (lahin == "kynttila" || lahin == "koputa") return lahin;
            if (lahin.StartsWith("kivi-")) return "irrota";
            if (PyhaEsine(lahin)) return "nosta";
            return "poimi";
        }

        static bool PyhaEsine(string id) => id == "kalkki" || id == "pateeni" || id == "liuskekivi";

        /// <summary>Toimintonapin VoiceOver-nimet tiloittain (Siirtoseppä E2/E3).</summary>
        static readonly System.Collections.Generic.Dictionary<string, string> Toimintonimet = new System.Collections.Generic.Dictionary<string, string>
        {
            ["poimi"] = "Poimi", ["heita"] = "Heitä", ["kynttila"] = "Kynttilä", ["koputa"] = "Koputa", ["irrota"] = "Irrota", ["nosta"] = "Nosta", ["laske"] = "Laske",
        };

        void PyydaToiminto()
        {
            esineToiminto?.SetValue(null, true);
            Debug.Log($"MATKAKIRJA seikkailutapit: toiminto ({toimintoTila ?? "-"}){(esineToiminto == null ? ", SeikkailuEsineet puuttuu" : "")}");
        }

        void PaivitaToiminto()
        {
            string tila = !nakyy ? null : TestiToiminto == null || TestiToiminto == "auto" ? EsineTila() : TestiToiminto == "pois" ? null : TestiToiminto;
            if (tila == toimintoTila) return;
            toimintoTila = tila;
            toimintoRivi.style.display = tila == null ? DisplayStyle.None : DisplayStyle.Flex;
            if (tila == null) return;
            bool heita = tila == "heita";
            toimintoNappi.Clear();
            toimintoNappi.Add(new SvgIkoni(heita ? HeitaIkoni : PoimiIkoni));
            toimintoNappi.tooltip = Toimintonimet.TryGetValue(tila, out var nimi) ? nimi : "Poimi";   // VoiceOver-nimi
        }

        const float TappiAla = 40f;

        void Paivita()
        {
            PaivitaToiminto();
            bool nayta = TestiNakyy ?? PelaajaAktiivinen();
            if (nayta == nakyy) return;
            nakyy = nayta;
            vasen.Nayta(nayta);
            oikea.Nayta(nayta);
            // Alareuna ja sivureuna kuten oppaan tapeilla (krediittien yläpuolella, reunasta OpasTapit.Reuna).
            vasen.Juuri.style.bottom = TappiAla; oikea.Juuri.style.bottom = TappiAla;
            Debug.Log("MATKAKIRJA seikkailutapit: " + (nayta ? "näkyvät" : "piilossa"));
        }

        /// <summary>
        /// SEIKKAILUN LÖYTÖ (Siirtoseppä E3 vaihe 10, liinanyytti): pienenä aarteena olemassa olevalla paikallisaarteen pohjalla
        /// (Paljastus, pergamenttimalli kuten matkamuisto): nimi, lyhyt teksti faktarivinä, valinnainen kuva (URL tai paketin
        /// polku) ja valinnainen alarivi (esim. "+N tp"); ei luettelon tekstejä eikä tietokerrosta. valmis kutsutaan, kun pelaaja
        /// sulkee ("Jatka matkaa"). Siirtoseppä kutsuu heijastuksella: Matkakirja.Natiivi.SeikkailuTapit.NaytaLoyto.
        /// </summary>
        public static void NaytaLoyto(string nimi, string teksti, string kuvaUrl = null, string rivi = null, System.Action valmis = null)
        {
            UiKerros.PaaSaikeessa(() =>
            {
                Debug.Log($"MATKAKIRJA seikkailutapit: löytö {nimi}");
                UiNakymat.Hae().Paljastus.Nayta(new KysymysNaytto
                {
                    Oikein = true, LoytoTyyppi = "seikkailu", LoytoNimi = nimi, LoytoFakta = teksti, LoytoKuvaUrl = kuvaUrl,
                    LoytoRivi = rivi, LoytoPergamentti = true,
                }, valmis);
            });
        }

        /// <summary>Testi: tila, arvot ja laatikot.</summary>
        public static string Kuvaus()
        {
            if (viimeisin == null) return "seikkailutapit: ei luotu";
            Rect a = vasen.Juuri.worldBound, b = oikea.Juuri.worldBound;
            return $"seikkailutapit {(viimeisin.nakyy ? "näkyvät" : "piilossa")}, vasen {Vasen.x:0.00},{Vasen.y:0.00} @ {a.xMin:0},{a.yMin:0} {a.width:0}×{a.height:0}, "
                 + $"oikea {Oikea.x:0.00},{Oikea.y:0.00} @ {b.xMin:0},{b.yMin:0} {b.width:0}×{b.height:0}, kosketaan {Kosketaan}, "
                 + $"toiminto {viimeisin.toimintoTila ?? "piilossa"} @ {viimeisin.toimintoNappi.worldBound.center.x:0},{viimeisin.toimintoNappi.worldBound.center.y:0}";
        }
    }
}
