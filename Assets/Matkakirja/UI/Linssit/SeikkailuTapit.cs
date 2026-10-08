// SEIKKAILUN TAPIT (omistaja 7.10.: Olavinlinna seikkailuna, vapaa kävely olan yli; Päätoimittaja kuittasi; Siirtosepän pyyntö):
// kävelytilan kaksi tappia OpasTapit-kaavalla ja TAPPI-pohjalla (Pohjat/ohjausnappi.uss), ei uusia pohjia. Toisin kuin oppaassa
// molemmat antavat täydet 2D-arvot: VASEN = liike (x sivulle, y eteen), OIKEA = katse (x kääntö, y nosto). Näkyvät, kun
// SeikkailuPelaaja.Aktiivinen != null (Siirtoseppä; luetaan heijastuksella, jotta haara ei riipu hänen haarastaan), ja lukevat
// arvot staattisina (Siirtoseppä heijastuksella kuten opas). Kuvakkeet olemassa olevista: kompassi (liike) ja silmä (katse).
// TOIMINTONAPPI (Siirtoseppä E2, keittiön harhautus): OHJAUSNAPPI-pohjalla oikean tapin yläpuolella; poimi (lähin esine) tai heitä
// (esine kädessä). Napautus asettaa SeikkailuEsineet.ToimintoPyydetty = true; näkyy vain, kun Aktiivinen.Lahin tai .Kadessa
// ei ole null (heijastuksella kuten Aktiivinen). Mac/näppäimistö: E (Siirtoseppä).
// TIETOKERROS (Siirtoseppä E3, Päätoimittaja 7.10. 18.0x, olemassa olevat pohjat, ei hehkua): pelin aikana tietokortin avautuessa
// vain Pulun ele Tunne("utelias", 0.3) ilman tekstiä; lopussa Pulun ele Tunne("ilo") ja kortisto KORTTI-pohjalla, joka EI avaudu
// itsestään vaan vasta Pulun napautuksesta (tieto vain halutessaan). Tarjous päättyy, kun seikkailu päättyy.
// PELATTAVUUSMALLI (docs/raportit/pelattavuusmalli-olavinlinna.md kohta 6, 8.10.): kosketuksella KATSE vedetään koko oikealla
// puoliskolla CupolaVedon kaavalla (Input Systemin kosketukset suoraan, UI:n päältä alkava ohitetaan, 10 pt:n napautusraja):
// 0,30°/pt vaaka, 0,22°/pt pysty, ei liukumaa, "kuin kuvaa selaisi" (sormi oikealle → katse vasemmalle); Siirtoseppä lukee
// OtaKatse() joka ruutu. Oikea TAPPI on testikytkin (oletus piilossa). Lyhyt napautus maailmaan (ei UI, ei vetoa) kutsuu
// SeikkailuPelaaja.Napautus(px) (napautuskävely tai toiminto alle 1,2 m:n esineeseen). Mac: hiiri on Siirtosepän.
// Pulun vihje myös näppäimellä: Mac P, peliohjain Y (LuePuluNappain → PuluKaappaa).
// KÄSITTELY KÄSIN (pelattavuusmalli kohta 6, Päätoimittaja 8.10.): kosketus, joka alkaa käsin käsiteltävän esineen päältä
// (KasittelyAlkaa(px) = true; Siirtoseppä asettaa), ei käännä katsetta: napautusrajan ylittävä veto syötetään Kasittely-vetoon
// (Ydin KasittelyVeto: asteet ja kulmanopeus °/s, alle 30°/s hiljainen). Lyhyt napautus samaan esineeseen pysyy napautuksena.
// Veto on Kaynnissa kosketuksen alusta (Siirtosepän SeikkailuKasittely pitää kohteen aktiivisena), liike vasta napautusrajan jälkeen.
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using UnityEngine;
using UnityEngine.UIElements;
using Kosketus = UnityEngine.InputSystem.EnhancedTouch.Touch;
using KosketusVaihe = UnityEngine.InputSystem.TouchPhase;

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

        /// <summary>
        /// Kontekstikuvake verbin mukaan (omistaja 7.10. 20.3x): kaari = heitä, liekki = sytytä/puhalla/sammuta, muuten käsi
        /// (poimi, käytä, avaa, aseta, laske, ota, irrota, koputa …).
        /// </summary>
        static string Kuvake(string tila)
        {
            switch ((tila ?? "").ToLowerInvariant())
            {
                case "heita": case "heitä": return Ikonit.Heittokaari;
                case "sytyta": case "sytytä": case "puhalla": case "sammuta": case "kynttila": return Ikonit.Liekki;
                default: return Ikonit.Kasi;
            }
        }
        /// <summary>Testi `ui seikkailutapit toiminto poimi|heita|auto`: napin tila ilman SeikkailuEsineitä.</summary>
        public static string TestiToiminto;
        readonly UiKerros kerros;
        readonly int kerrosNro;

        /// <summary>Katseen vetokertoimet (pelattavuusmalli kohta 6) ja suunta: true = kamera seuraa sormea (testi), false = selaus.</summary>
        public static float AsteitaVaaka = 0.30f, AsteitaPysty = 0.22f;
        public static bool VetoSuora;
        /// <summary>Oikea TAPPI näkyvissä (testikytkin `ui seikkailutapit oikeatappi on|off`); oletus piilossa, katse vedolla.</summary>
        public static bool OikeaTappi;
        const float NapautusPt = 10f;   // sama raja kuin PalloKierto.napautusLiike / CupolaVeto
        const double NapautusS = 0.35;

        sealed class Sormi { public Vector2 Alku, Edellinen; public double AlkuT; public bool Ui, Veto, Oikealla, Kasittely; }
        static readonly Dictionary<int, Sormi> sormet = new Dictionary<int, Sormi>();
        static readonly HashSet<int> nahdyt = new HashSet<int>();
        static Vector2 katseKertyma;
        static MethodInfo pelaajaNapautus;
        static bool napautusHaettu;
        static string viimeNapautus = "-";

        /// <summary>Katseen veto asteina edellisestä lukukerrasta (x kääntö + oikealle, y nosto + ylös); lukeminen nollaa.</summary>
        public static Vector2 OtaKatse() { var k = katseKertyma; katseKertyma = Vector2.zero; return k; }

        /// <summary>
        /// Käsittelyn alku (Siirtoseppä asettaa): true = sormen alla (näytön pikselit, Input System, y ylös) on ulottuvilla oleva käsin
        /// käsiteltävä esine (ovi, arkun kilpi). null = ei käsittelyä (kaikki vedot katseeksi kuten ennen).
        /// </summary>
        public static System.Func<Vector2, bool> KasittelyAlkaa;
        /// <summary>Käsittelyveto: Kaynnissa, NopeusAsteS, Hiljainen, Narahdukset, AsteetX/Y (vedon alusta).</summary>
        public static readonly Matkakirja.Linssit.Seikkailu.KasittelyVeto Kasittely = new Matkakirja.Linssit.Seikkailu.KasittelyVeto();
        /// <summary>Käsittelyn asteet edellisestä lukukerrasta (x + oikealle, y + ylös, sormen suuntaan); lukeminen nollaa.</summary>
        public static Vector2 OtaKasittely() { var (x, y) = Kasittely.Ota(); return new Vector2((float)x, (float)y); }
        static int kasittelySormi = -1;
        readonly VisualElement toimintoRivi;
        readonly Button toimintoNappi;
        string toimintoTila;   // null = piilossa, "poimi" tai "heita"
        static PropertyInfo esineetAktiivinen, esineLahin, esineKadessa, esineVerbi;
        static FieldInfo esineToiminto;
        static bool esineetHaettu;

        public SeikkailuTapit(UiKerros kerros, int kerrosNro)
        {
            this.kerros = kerros;
            this.kerrosNro = kerrosNro;
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
            toimintoNappi = Ohjausnappi.Nappi(Ikonit.Kasi, "Poimi", PyydaToiminto, toimintoRivi);
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
                esineVerbi = t?.GetProperty("Toiminto", BindingFlags.Public | BindingFlags.Instance);
                esineToiminto = t?.GetField("ToimintoPyydetty", BindingFlags.Public | BindingFlags.Static);
            }
            if (!(esineetAktiivinen?.GetValue(null) is Object e) || e == null) return null;
            // VALMIS VERBI (Siirtoseppä, historia-fp d1734576): SeikkailuEsineet.Toiminto ("Poimi", "Heitä", "Aseta", "Avaa" …),
            // null = nappi piiloon. Tila on verbi sellaisenaan (VoiceOver-nimi); alla oleva tunnuskartta vain vanhalle rajapinnalle.
            if (esineVerbi != null) return esineVerbi.GetValue(e) as string is string v && v.Length > 0 ? v : null;
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
            toimintoNappi.Clear();
            toimintoNappi.Add(new SvgIkoni(Kuvake(tila)));
            // VoiceOver-nimi: valmis verbi sellaisenaan, vanhan rajapinnan tila Toimintonimistä.
            toimintoNappi.tooltip = Toimintonimet.TryGetValue(tila, out var nimi) ? nimi : tila;
        }

        const float TappiAla = 40f;

        /// <summary>Kosketukset joka ruutu (vain seikkailussa): oikean puoliskon veto katseeksi, lyhyt napautus maailmaan.</summary>
        void LueKosketukset()
        {
            if (!nakyy) { sormet.Clear(); katseKertyma = Vector2.zero; LopetaKasittely(); return; }
            float lev = kerros.Juuri(kerrosNro).layout.width;
            float k = lev > 1f && !float.IsNaN(lev) ? Screen.width / lev : 1f;   // pikseliä pisteessä
            nahdyt.Clear();
            foreach (var t in Kosketus.activeTouches)
            {
                int id = t.touchId;
                var px = t.screenPosition;
                nahdyt.Add(id);
                if (t.phase == KosketusVaihe.Began || !sormet.TryGetValue(id, out var s))
                {
                    s = new Sormi { Alku = px, Edellinen = px, AlkuT = t.startTime, Ui = UiKerros.Peittaa(px), Oikealla = px.x >= Screen.width * 0.5f };
                    // Vain yksi käsittely kerrallaan (ei Macin/ohjaimen käynnissä olevan päälle); esineen tunnistus Siirtosepältä.
                    // Veto käynnistyy heti kosketuksesta (Kaynnissa: kohde pysyy aktiivisena ja katse paikallaan), mutta liike
                    // syötetään vasta napautusrajan jälkeen; lyhyt napautus päättää käsittelyn ilman kääntöä.
                    s.Kasittely = !s.Ui && kasittelySormi < 0 && !Kasittely.Kaynnissa && KasittelyAlkaa != null && KasittelyAlkaa(px);
                    if (s.Kasittely) { kasittelySormi = id; Kasittely.Aloita(); }
                    sormet[id] = s;
                }
                if (s.Kasittely)
                {
                    // Napautusrajan ylitys aloittaa vedon koko matkalla alusta (ei hukkaa ensimmäisiä pisteitä); sitten kehys kerrallaan.
                    if (!s.Veto && ((px - s.Alku) / k).magnitude > NapautusPt)
                    {
                        s.Veto = true;
                        var d0 = (px - s.Alku) / k;
                        Kasittely.Liiku(d0.x, d0.y, t.time - s.AlkuT);
                    }
                    else if (s.Veto)
                    {
                        var d = (px - s.Edellinen) / k;
                        Kasittely.Liiku(d.x, d.y, Time.unscaledDeltaTime);
                    }
                    if (s.Veto) Ruudunpaivitys.Herata();
                }
                else if (!s.Ui)
                {
                    if (!s.Veto && ((px - s.Alku) / k).magnitude > NapautusPt) s.Veto = true;
                    if (s.Veto && s.Oikealla && !OikeaTappi)
                    {
                        var d = (px - s.Edellinen) / k;   // pisteinä, y ylös (Input System)
                        float suunta = VetoSuora ? 1f : -1f;
                        katseKertyma += new Vector2(suunta * d.x * AsteitaVaaka, suunta * d.y * AsteitaPysty);
                        Ruudunpaivitys.Herata();
                    }
                }
                s.Edellinen = px;
                if (t.phase == KosketusVaihe.Ended || t.phase == KosketusVaihe.Canceled)
                {
                    if (t.phase == KosketusVaihe.Ended && !s.Ui && !s.Veto && t.time - s.AlkuT <= NapautusS) Napauta(px);
                    if (s.Kasittely) LopetaKasittely();
                    sormet.Remove(id);
                }
            }
            if (sormet.Count > nahdyt.Count)
                foreach (var id in new List<int>(sormet.Keys)) if (!nahdyt.Contains(id)) { if (id == kasittelySormi) LopetaKasittely(); sormet.Remove(id); }
        }

        static void LopetaKasittely()
        {
            if (kasittelySormi < 0 && !Kasittely.Kaynnissa) return;
            if (Kasittely.Kaynnissa) Debug.Log($"MATKAKIRJA seikkailutapit: käsittely loppui ({Kasittely.AsteetX:0.0}°, {Kasittely.AsteetY:0.0}°), huippu {Kasittely.HuippuAsteS:0} °/s, narahdukset {Kasittely.Narahdukset}");
            Kasittely.Lopeta();
            kasittelySormi = -1;
        }

        /// <summary>Napautus maailmaan: SeikkailuPelaaja.Napautus(Vector2 px) (Siirtoseppä, historia-fp) heijastuksella.</summary>
        static void Napauta(Vector2 px)
        {
            if (!napautusHaettu)
            {
                napautusHaettu = true;
                var tp = typeof(SeikkailuTapit).Assembly.GetType("Matkakirja.Natiivi.SeikkailuPelaaja");
                pelaajaNapautus = tp?.GetMethod("Napautus", BindingFlags.Public | BindingFlags.Static, null, new[] { typeof(Vector2) }, null);
            }
            object osui = pelaajaNapautus?.Invoke(null, new object[] { px });
            viimeNapautus = $"({px.x:0}, {px.y:0}) px → {(pelaajaNapautus == null ? "ei SeikkailuPelaaja.Napautusta" : osui is bool b && b ? "maailma" : "ei osumaa")}";
            Debug.Log("MATKAKIRJA seikkailutapit: napautus " + viimeNapautus);
        }

        bool oikeaNakyy;

        void Paivita()
        {
            PaivitaToiminto();
            LueKosketukset();
            LuePuluNappain();
            bool oikeaNyt = nakyy && OikeaTappi;
            if (oikeaNyt != oikeaNakyy) { oikeaNakyy = oikeaNyt; oikea.Nayta(oikeaNyt); }
            bool nayta = TestiNakyy ?? PelaajaAktiivinen();
            if (nayta == nakyy) return;
            nakyy = nayta;
            if (!nayta) PoistaTietokerros();   // seikkailu päättyi: tietokerroksen tarjous pois
            // Pulun napautus seikkailun ajan: tietokerros tai vihje (PuluKaappaa); muulloin Pulun oma (chat).
            Pulu.Hae().NapautusKaappaa = nayta ? PuluKaappaa : (System.Func<bool>)null;
            vasen.Nayta(nayta);
            oikeaNakyy = nayta && OikeaTappi;
            oikea.Nayta(oikeaNakyy);
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

        /// <summary>Tietokortti avautui pelin aikana (Siirtoseppä E3): vain hiljainen merkki, Pulun ele, ei tekstiä.</summary>
        public static void TietokorttiAvautui(string lyhyt)
        {
            UiKerros.PaaSaikeessa(() =>
            {
                Debug.Log($"MATKAKIRJA seikkailutapit: tietokortti {lyhyt}");
                Pulu.Hae().Tunne("utelias", 0.3f);
            });
        }

        static string[] tkOtsikot, tkTekstit, tkLyhyet;
        static VisualElement tkHimmennys;

        /// <summary>
        /// Tietokerros tarjolle (Siirtoseppä E3 vaihe 11, nousun jälkeen): Pulun ele Tunne("ilo"); kortisto avautuu vasta, kun
        /// pelaaja napauttaa Pulua (Pulu.NapautusKaappaa). otsikot/tekstit/lyhyet samanpituiset (lyhyet voi olla null).
        /// </summary>
        public static void NaytaTietokerros(string[] otsikot, string[] tekstit, string[] lyhyet)
        {
            UiKerros.PaaSaikeessa(() =>
            {
                tkOtsikot = otsikot; tkTekstit = tekstit; tkLyhyet = lyhyet;
                tkHimmennys?.RemoveFromHierarchy(); tkHimmennys = null;
                var pulu = Pulu.Hae();
                pulu.NapautusKaappaa = PuluKaappaa;
                pulu.Tunne("ilo");
                Debug.Log($"MATKAKIRJA seikkailutapit: tietokerros tarjolla, {otsikot?.Length ?? 0} korttia");
            });
        }

        static MethodInfo puluVihje;
        static bool vihjeHaettu;

        /// <summary>
        /// Pulun reunakuvan napautus seikkailussa: tietokerroksen tarjous edelle, muuten SeikkailuPelaaja.PuluVihje() (Siirtoseppä,
        /// vihjeportaat; false = ei vihjettä → Pulun tavallinen napautus).
        /// </summary>
        static bool PuluKaappaa()
        {
            if (tkOtsikot != null) { AvaaTietokerros(); return true; }
            if (!vihjeHaettu)
            {
                vihjeHaettu = true;
                var tp = typeof(SeikkailuTapit).Assembly.GetType("Matkakirja.Natiivi.SeikkailuPelaaja");
                puluVihje = tp?.GetMethod("PuluVihje", BindingFlags.Public | BindingFlags.Static, null, System.Type.EmptyTypes, null);
            }
            bool kaytetty = puluVihje?.Invoke(null, null) is bool b && b;
            Debug.Log("MATKAKIRJA seikkailutapit: Pulun napautus → " + (kaytetty ? "vihje" : "ei vihjettä"));
            return kaytetty;
        }

        /// <summary>
        /// Pulun vihje näppäimellä (pelattavuusmalli kohta 6): Mac P, peliohjain Y (pohjoinen nappi) tekee seikkailun aikana saman
        /// kuin reunakuvan napautus (PuluKaappaa: tietokerros tai vihje). Ei tekstikentän ollessa kohdistettuna.
        /// </summary>
        void LuePuluNappain()
        {
            if (!nakyy) return;
            var kb = UnityEngine.InputSystem.Keyboard.current; var gp = UnityEngine.InputSystem.Gamepad.current;
            bool p = kb != null && kb.pKey.wasPressedThisFrame;
            bool y = gp != null && gp.buttonNorth.wasPressedThisFrame;
            if (!p && !y) return;
            if (p && vasen.Juuri.panel?.focusController?.focusedElement is TextField) return;
            Debug.Log("MATKAKIRJA seikkailutapit: Pulun vihje " + (p ? "P" : "Y"));
            PuluKaappaa();
        }

        /// <summary>Seikkailu käynnissä (SeikkailuPelaaja.Aktiivinen; linnan ☰-valikon Vihje-rivi näkyy vain silloin).</summary>
        public static bool SeikkailuKaynnissa => PelaajaAktiivinen();

        /// <summary>
        /// VIHJEEN PYYNTÖ ILMAN PULUA (omistaja 8.10.: videopeleissä ei Pulua; Päätoimittaja: linnan ☰ → Vihje): sama vihjereitti kuin
        /// P/Y-näppäimellä, mutta ilman tietokerroksen tarjousta. Siirtosepän maailmavihje (kimallus + ääni) tulee SeikkailuPelaaja.
        /// PuluVihje()/VihjePyydetty-koukkuun (rajapinnan nimi sovitaan junan 167 jälkeen). true = vihje annettiin.
        /// </summary>
        public static bool PyydaVihje(string lahde)
        {
            if (!vihjeHaettu)
            {
                vihjeHaettu = true;
                var tp = typeof(SeikkailuTapit).Assembly.GetType("Matkakirja.Natiivi.SeikkailuPelaaja");
                puluVihje = tp?.GetMethod("PuluVihje", BindingFlags.Public | BindingFlags.Static, null, System.Type.EmptyTypes, null);
            }
            bool annettu = puluVihje?.Invoke(null, null) is bool b && b;
            Debug.Log($"MATKAKIRJA seikkailutapit: vihje pyydetty ({lahde}) → " + (annettu ? "annettu" : "ei vihjettä"));
            return annettu;
        }

        /// <summary>Tarjous pois (seikkailu päättyi): Pulun napautus palaa ennalleen.</summary>
        static void PoistaTietokerros()
        {
            if (tkOtsikot == null) return;
            tkOtsikot = tkTekstit = tkLyhyet = null;
            if (tkHimmennys != null) { tkHimmennys.RemoveFromHierarchy(); tkHimmennys = null; }
        }

        /// <summary>Kortisto KORTTI-pohjalla (kuten apurahakortti): otsikko, kortit kapiteelein, lyhyt kursiivina, teksti; Takaisin.</summary>
        static void AvaaTietokerros()
        {
            if (tkOtsikot == null || viimeisin == null) return;
            if (tkHimmennys == null)
            {
                var h = Rakenne.El("mk-himmennys mk-himmennys--tumma", viimeisin.kerros.Juuri(UiKerros.Pelidialogit));
                h.style.display = DisplayStyle.None;
                h.RegisterCallback<PointerDownEvent>(ev => { if (ev.target == h) Rakenne.Nayta(h, false, 250); });
                var kortti = new Kortti("mk-tietoja", pohja: true);
                h.Add(kortti);
                var vieritys = new ScrollView(ScrollViewMode.Vertical);
                vieritys.AddToClassList("mk-tietoja__vieritys");
                vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
                Kirjasimet.Aseta(Rakenne.Teksti("Olavinlinna", "mk-kortti__otsikko", vieritys), Tyylikirja.Kirjain.Otsikko);
                for (int i = 0; i < tkOtsikot.Length; i++)
                {
                    Kirjasimet.Aseta(Rakenne.Teksti((tkOtsikot[i] ?? "").ToUpperInvariant(), "mk-kortti__kapiteeli", vieritys), Kirjasin.Kone);
                    string lyhyt = tkLyhyet != null && i < tkLyhyet.Length ? tkLyhyet[i] : null;
                    if (!string.IsNullOrEmpty(lyhyt)) Kirjasimet.Aseta(Rakenne.Teksti(lyhyt, "mk-kortti__teksti", vieritys), Kirjasin.LukuKursiivi);
                    string teksti = tkTekstit != null && i < tkTekstit.Length ? tkTekstit[i] : null;
                    if (!string.IsNullOrEmpty(teksti)) Rakenne.Teksti(teksti, "mk-kortti__teksti", vieritys);
                }
                kortti.Sisus.Add(vieritys);
                var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Nappi("Takaisin", "mk-nappi--toiminto", () => Rakenne.Nayta(h, false, 250), napit), Kirjasin.KoneLihava);
                tkHimmennys = h;
            }
            Debug.Log("MATKAKIRJA seikkailutapit: tietokerros auki");
            Rakenne.Nayta(tkHimmennys, true, 250);
        }

        /// <summary>
        /// TEKSTIVAHTI (pelattavuusmalli kohta 11, vaihe 3): seikkailussa ei näkyvää tekstiä paitsi löytö- (Paljastus, .mk-paljastus)
        /// ja tietokerrospohjissa. Käy UiKerroksen kaikki kerrokset: näkyvä = koko ketju display ≠ None, visibility näkyvä,
        /// peitto > 0,01 ja laatikko ruudulla. Karttakrediitit ovat Cesiumin omassa dokumentissa (pakolliset, eivät kuulu tähän).
        /// Palauttaa "OK" tai "VIRHE n: teksti @ polku …" (testi `ui seikkailutapit teksti`, Siirtosepän botti lokiväittämäksi).
        /// </summary>
        public static string Tekstivahti()
        {
            var ui = UiKerros.Hae();
            var loydot = new List<string>();
            foreach (var (nro, juuri) in ui.Juuret)
            {
                float w = juuri.layout.width, h = juuri.layout.height;
                juuri.Query<TextElement>().ForEach(t =>
                {
                    if (string.IsNullOrWhiteSpace(t.text) || !Nakyva(t, w, h)) return;
                    for (var e = (VisualElement)t; e != null; e = e.parent)
                        if (e.ClassListContains("mk-paljastus") || e == tkHimmennys) return;
                    loydot.Add($"\"{(t.text.Length > 30 ? t.text.Substring(0, 30) + "…" : t.text)}\" @ {nro}/{t.parent?.GetClasses().FirstOrDefault() ?? t.parent?.name ?? "-"}");
                });
            }
            return loydot.Count == 0 ? "OK" : $"VIRHE {loydot.Count}: " + string.Join("; ", loydot.Take(12));
        }

        static bool Nakyva(VisualElement t, float w, float h)
        {
            var r = t.worldBound;
            if (r.width < 1f || r.height < 1f || r.xMax <= 0f || r.yMax <= 0f || r.xMin >= w || r.yMin >= h) return false;
            for (var e = t; e != null; e = e.parent)
            {
                var rs = e.resolvedStyle;
                if (rs.display == DisplayStyle.None || rs.visibility == Visibility.Hidden || rs.opacity < 0.01f) return false;
            }
            return true;
        }

        /// <summary>
        /// PELATTAVAN PALAN AVAUS JATKA/ALUSTA-VALINNALLA (Siirtoseppä V6-tallennus, Päätoimittaja 7.10. 20.1x): jos tallennus on
        /// (SeikkailuTallentaja.LueTiedosto("olavinlinna", DioraamaSovitin.PelattavaPalaHash) != null), olemassa oleva Vahvistus-
        /// dialogi "Olavinlinna" / "Jatketaanko siitä, mihin jäit?" / Alusta (TOIMINTO) ja Jatka (kulta); Jatka asettaa
        /// DioraamaSovitin.PelattavaPalaJatka = true ennen LinssiOhjain.AvaaPelattavaPala(). Ilman tallennusta suoraan alusta.
        /// Esc sulkee käynnistämättä. Siirtosepän luokat heijastuksella (historia-fp); Paavalikon rivi kutsuu tätä.
        /// </summary>
        public static void AvaaPelattavaPala()
        {
            var asm = typeof(SeikkailuTapit).Assembly;
            var sovitin = asm.GetType("Matkakirja.Natiivi.DioraamaSovitin");
            var tallentaja = asm.GetType("Matkakirja.Natiivi.SeikkailuTallentaja");
            var avaa = asm.GetType("Matkakirja.Natiivi.LinssiOhjain")?.GetMethod("AvaaPelattavaPala", BindingFlags.Public | BindingFlags.Static, null, System.Type.EmptyTypes, null);
            var jatkaKentta = sovitin?.GetField("PelattavaPalaJatka", BindingFlags.Public | BindingFlags.Static);
            string hash = sovitin?.GetField("PelattavaPalaHash", BindingFlags.Public | BindingFlags.Static)?.GetValue(null) as string;
            var lue = tallentaja?.GetMethod("LueTiedosto", BindingFlags.Public | BindingFlags.Static, null, new[] { typeof(string), typeof(string) }, null);
            if (avaa == null) { Debug.LogWarning("MATKAKIRJA seikkailutapit: LinssiOhjain.AvaaPelattavaPala puuttuu"); return; }
            void Aloita(bool jatka)
            {
                jatkaKentta?.SetValue(null, jatka);
                Debug.Log("MATKAKIRJA seikkailutapit: pelattava pala " + (jatka ? "jatkaa tallennuksesta" : "alusta"));
                avaa.Invoke(null, null);
            }
            object tallennus = hash != null ? lue?.Invoke(null, new object[] { "olavinlinna", hash }) : null;
            if (tallennus == null) { Aloita(false); return; }
            UiNakymat.Hae().Vahvistus.Kysy("Olavinlinna", "Jatketaanko siitä, mihin jäit?", "Alusta", "Jatka",
                () => Aloita(true), kunPeruttu: () => Aloita(false));
        }

        /// <summary>Testi: tila, arvot ja laatikot.</summary>
        public static string Kuvaus()
        {
            if (viimeisin == null) return "seikkailutapit: ei luotu";
            Rect a = vasen.Juuri.worldBound, b = oikea.Juuri.worldBound;
            return $"seikkailutapit {(viimeisin.nakyy ? "näkyvät" : "piilossa")}, vasen {Vasen.x:0.00},{Vasen.y:0.00} @ {a.xMin:0},{a.yMin:0} {a.width:0}×{a.height:0}, "
                 + $"oikea {Oikea.x:0.00},{Oikea.y:0.00} @ {b.xMin:0},{b.yMin:0} {b.width:0}×{b.height:0}, kosketaan {Kosketaan}, "
                 + $"oikea tappi {(OikeaTappi ? "päällä" : "piilossa (veto)")}, veto {(VetoSuora ? "suora" : "selaus")}, sormia {sormet.Count}, napautus {viimeNapautus}, "
                 + $"toiminto {viimeisin.toimintoTila ?? "piilossa"} @ {viimeisin.toimintoNappi.worldBound.center.x:0},{viimeisin.toimintoNappi.worldBound.center.y:0}, "
                 + $"käsittely {(KasittelyAlkaa == null ? "ei kytketty" : Kasittely.Kaynnissa ? $"käynnissä {Kasittely.AsteetX:0.0}°,{Kasittely.AsteetY:0.0}° {Kasittely.NopeusAsteS:0} °/s {(Kasittely.Hiljainen ? "hiljainen" : "narahtaa")}" : "odottaa")}";
        }
    }
}
