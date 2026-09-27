// LUKIJAÄÄNI: puhesynteesin persoonat, oletukset ja laitekohtaiset säädöt (Pelikoodari, 24.9.2026).
//
// Webin totuus (verkkopeli origin/main 896f661eb):
//   js/puhe.js          PUHE_PERSOONAT, luePuheAsetukset/tallennaPuheAsetukset, puheenSaadot,
//                       kehittajaKoodi, puheenNopeus/asetaPuheenNopeus, puheenVoima/asetaPuheenVoima,
//                       lukijanTaso, haePala (pyynnön runko, x-pollo-kehittaja, välimuistiavain)
//   js/puhe-oletukset.js PUHE_OLETUKSET (= tools/pollo/worker.js PUHE_PERSOONAT merkilleen)
//   js/main.js          Lukijaääni-dialogi (avaaLukijaaani): PUHE_AANIVAIHTOEHDOT, PUHE_NAYTTEET,
//                       lataaPuheKentat, tallennaPuheKentat, "Palauta oletus"
//   index.html          #puhe-dialog: persoonien nimet ja liukujen rajat
// Kultainen jälki: Peli-testit/Kultaiset/lukijaaanijalki.json (tee-lukijaaanijalki.mjs).
//
// Säilö on webin localStorage samoin avaimin ja samoin merkkijonoin (natiivissa PlayerPrefs,
// Scripts/Peli/Puhe.cs). JSON kirjoitetaan kuten JSON.stringify (avainjärjestys, pakomerkit,
// lukujen muoto), joten vientityökalut ja web-muistiinpanot pätevät.
//
// Worker tottelee äänen ja ohjeen säätöä VAIN kehittäjäkoodilla (otsake x-pollo-kehittaja);
// muilla laitteilla säädöt kulkevat pyynnössä mutta eivät vaikuta. Nopeus toteutuu
// generoinnissa (OpenAI speed), ei toistossa, ja voima on toiston vahvistus (Puhe.cs).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Matkakirja.Peli
{
    /// <summary>Lukijaäänen säädöt ja puhepyyntö puhtaana C#:na. Säilö annetaan kolmella funktiolla.</summary>
    public sealed class Lukijaaani
    {
        // --- säilöavaimet (web localStorage) ---------------------------------------------------
        public const string AsetusAvain = "matkakirja-puhe-persoonat";      // PUHE_ASETUS_AVAIN
        public const string KoodiAvain = "matkakirja-puhe-kehittaja";       // PUHE_KOODI_AVAIN
        public const string PolloKoodiAvain = "matkakirja-pollo-kehittajakoodi"; // pöllön kehittäjäkoodi (varalla)
        public const string VoimaAvain = "matkakirja-puhe-voima";          // VOIMA_AVAIN
        public const string NopeusAvain = "matkakirja-puhe-nopeus";        // NOPEUS_AVAIN

        /// <summary>Pöllön ja puheen worker (js/packs/pollo-asetukset.js POLLOPALVELIN).</summary>
        public const string Palvelin = "https://matkakirja-pollo.samireivinen.workers.dev";
        /// <summary>Kehittäjäkoodin otsake (worker KEHITTAJA_OTSAKE).</summary>
        public const string KoodiOtsake = "x-pollo-kehittaja";

        // --- rajat (js/puhe.js; liukujen askel index.html) ---------------------------------------
        public const double NopeusOletus = 1.15, NopeusMin = 0.6, NopeusMax = 1.6, NopeusAskel = 0.05;
        public const double VoimaOletus = 2.0, VoimaMin = 0.25, VoimaMax = 2.5, VoimaAskel = 0.05;
        /// <summary>Lukija-liu'un oletusasento (web PUHEVOIMA_OLETUS): liuku / tämä = voiman kerroin.</summary>
        public const double LiukuOletus = 0.9;

        /// <summary>Workerin tuntemat persoonat (js/puhe.js PUHE_PERSOONAT). Muu arvo lukee kertojan äänellä.</summary>
        public static readonly IReadOnlyList<string> Tunnetut = new[] { "kertoja", "merkinnat", "pollo" };

        /// <summary>Dialogin lukijat järjestyksessä (index.html #puhe-persoona).</summary>
        public static readonly IReadOnlyList<(string Persoona, string Nimi)> Persoonat = new[]
        {
            ("merkinnat", "Matkakirja — merkinnät"),
            ("kertoja", "Lehdet ja sivut"),
            ("pollo", "Livia"),
        };

        /// <summary>Äänivaihtoehdot (js/main.js PUHE_AANIVAIHTOEHDOT = worker PUHE_AANET).</summary>
        public static readonly IReadOnlyList<string> Aanivaihtoehdot = new[]
        {
            "alloy", "ash", "ballad", "coral", "echo", "fable", "nova", "onyx", "sage", "shimmer", "verse",
        };

        static readonly Dictionary<string, (string Aani, string Ohje)> oletukset = new Dictionary<string, (string, string)>
        {
            ["kertoja"] = ("onyx",
                "Speak Finnish. You are a wise, warm storyteller reading aloud "
                + "from an adventure newspaper and its articles. Calm, "
                + "unhurried pace with a hint of wonder; clear articulation; "
                + "natural pauses at sentence boundaries. Never theatrical."),
            ["merkinnat"] = ("onyx",
                "Speak Finnish. You are reading aloud entries from a Victorian "
                + "explorer's travel journal, as a grandfather sharing his own "
                + "memories. Calm, intimate and slightly weathered narration; "
                + "unhurried pace; natural pauses at sentence boundaries. "
                + "Never theatrical."),
            ["pollo"] = ("sage",
                "Speak Finnish. You are a knowledgeable carrier pigeon, a "
                + "seasoned messenger answering a curious traveller. Matter-of-fact "
                + "and precise, a little quicker than a narrator, clear "
                + "articulation. Never childish or theatrical."),
        };

        static readonly Dictionary<string, string> naytteet = new Dictionary<string, string>
        {
            ["merkinnat"] = "Saavuimme kaupunkiin illansuussa, ja teekaravaanin kellot "
                + "kilisivät kadulla vielä pimeän tultua.",
            ["kertoja"] = "Niilin tulva toi mudan pelloille joka kesä, ja koko "
                + "valtakunnan verokalenteri laskettiin sen mukaan.",
            ["pollo"] = "Hyvä kysymys! Baikal on maailman syvin järvi — sen syvin "
                + "kohta on yli tuhat kuusisataa metriä.",
        };

        /// <summary>Persoonan oletusääni ja -ohje (worker PUHE_PERSOONAT); tuntematon = kertoja kuten workerissa.</summary>
        public static (string Aani, string Ohje) Oletus(string persoona) =>
            persoona != null && oletukset.TryGetValue(persoona, out var o) ? o : oletukset["kertoja"];

        /// <summary>Näytteen teksti (main.js PUHE_NAYTTEET); tuntematon = kertojan näyte.</summary>
        public static string NayteTeksti(string persoona) =>
            persoona != null && naytteet.TryGetValue(persoona, out var t) ? t : naytteet["kertoja"];

        /// <summary>Luennan säilölohko (js/lukija.js lueAaneen): persoona, paitsi pöllöllä ei mitään.</summary>
        public static string OletusLohko(string persoona) => persoona == "pollo" ? null : persoona;

        /// <summary>Palakatto (web js/puhe.js PUHE_PALA_KATTO), workerin PUHE_TEKSTIN_KATTO 2500:n alla.</summary>
        public const int PalaKatto = 2400;

        /// <summary>
        /// LUENNAN PALAT kortin teksteistä (omistaja 27.9.2026 klo 01.5x: pitkä tauko otsikon ja kappaleiden
        /// välissä). Webin säännöt: otsikko (lyhyt rivi ilman lopetusmerkkiä) liitetään seuraavan kappaleen alkuun
        /// pisteellä (js/lukija.js keraaKohdat + paate), hännäksi jäänyt otsikko jää lukematta, ja kappale on yksi
        /// pala — vain kattoa pidempi pilkotaan virkerajalta (js/puhe.js kappaleenPalat). Ei katkaisua: mitään
        /// tekstiä ei pudoteta. Palat luetaan putkena: kutsuja esihakee seuraavat (Puhe.Esihae) edellisen soidessa.
        /// </summary>
        public static List<string> LuennanPalat(IEnumerable<string> tekstit, int katto = PalaKatto)
        {
            var palat = new List<string>();
            string odottava = null;
            foreach (var raaka in tekstit ?? Enumerable.Empty<string>())
            {
                string t = JsTrim(raaka ?? "");
                if (t.Length == 0) continue;
                if (OnOtsikko(t)) { odottava = odottava == null ? Paate(t) : odottava + " " + Paate(t); continue; }
                string kohta = odottava == null ? t : odottava + " " + t;
                odottava = null;
                palat.AddRange(KappaleenPalat(kohta, katto));
            }
            return palat;
        }

        static bool OnOtsikko(string t) => t.Length <= 120 && !Lopetus(t[t.Length - 1]);
        static bool Lopetus(char c) => c == '.' || c == '!' || c == '?' || c == ':' || c == ';' || c == '…';
        static string Paate(string t) => Lopetus(t[t.Length - 1]) ? t : t + ".";

        /// <summary>js/puhe.js kappaleenPalat: koko kappale, jos mahtuu; muuten virkkeet kattoon asti.</summary>
        public static List<string> KappaleenPalat(string rivi, int katto = PalaKatto)
        {
            var palat = new List<string>();
            var kertyma = new StringBuilder();
            foreach (var virke in Regex.Split(JsTrim(rivi ?? ""), @"(?<=[.!?…])\s+"))
            {
                string v = JsTrim(virke);
                if (v.Length == 0) continue;
                if (kertyma.Length > 0 && kertyma.Length + v.Length + 1 > katto) { palat.Add(kertyma.ToString()); kertyma.Clear(); }
                if (kertyma.Length > 0) kertyma.Append(' ');
                kertyma.Append(v);
            }
            if (kertyma.Length > 0) palat.Add(kertyma.ToString());
            return palat;
        }

        /// <summary>Palavirran ensimmäisen palan katto merkkeinä (~2 s generointia, xAI ~70 mrk/s).</summary>
        public const int VirtaEka = 140;
        /// <summary>Palavirran kasvukerroin: seuraava pala generoituu edellisen soidessa (puhe ~14 mrk/s, generointi ~5× nopeampi).</summary>
        public const int VirtaKasvu = 3;

        /// <summary>
        /// PALAVIRTA (natiivin progressiivinen soitto, TF 1.0.29 P1: iOS ei jäsennä striimattua mp3:a,
        /// DownloadHandlerAudioClip streamAudio → DataProcessingError). Teksti pilkotaan virkerajoilta kasvaviin
        /// paloihin: ensimmäinen enintään VirtaEka merkkiä (ääni alkaa sen generoinnin jälkeen, ~2 s), seuraavat
        /// kertoimella VirtaKasvu kattoon asti. Seuraava pala haetaan edellisen soidessa, joten väliin ei jää taukoa.
        /// Virkettä ei katkaista: kattoa pidempi virke on oma palansa. Mitään tekstiä ei pudoteta.
        /// </summary>
        public static List<string> VirtaPalat(string teksti, int eka = VirtaEka, int kasvu = VirtaKasvu, int katto = PalaKatto)
        {
            var palat = new List<string>();
            var kertyma = new StringBuilder();
            int raja = Math.Max(1, eka);
            foreach (var virke in Regex.Split(JsTrim(teksti ?? ""), @"(?<=[.!?…])\s+"))
            {
                string v = JsTrim(virke);
                if (v.Length == 0) continue;
                if (kertyma.Length > 0 && kertyma.Length + v.Length + 1 > raja)
                {
                    palat.Add(kertyma.ToString());
                    kertyma.Clear();
                    raja = Math.Min(katto, raja * Math.Max(1, kasvu));
                }
                if (kertyma.Length > 0) kertyma.Append(' ');
                kertyma.Append(v);
            }
            if (kertyma.Length > 0) palat.Add(kertyma.ToString());
            return palat;
        }

        readonly Func<string, string> lue;
        readonly Action<string, string> kirjoita;
        readonly Action<string> poista;

        /// <summary>Jokin lukijaäänen säätö muuttui (asetus, nopeus tai voima).</summary>
        public event Action Muuttui;

        /// <param name="lue">avaimen arvo tai null (localStorage.getItem)</param>
        /// <param name="kirjoita">setItem</param>
        /// <param name="poista">removeItem</param>
        public Lukijaaani(Func<string, string> lue, Action<string, string> kirjoita, Action<string> poista)
        {
            this.lue = lue ?? throw new ArgumentNullException(nameof(lue));
            this.kirjoita = kirjoita ?? throw new ArgumentNullException(nameof(kirjoita));
            this.poista = poista ?? throw new ArgumentNullException(nameof(poista));
        }

        string Lue(string avain) { try { return lue(avain); } catch { return null; } }

        // --- persoonakohtaiset säädöt ----------------------------------------------------------

        /// <summary>
        /// Dialogin kentät (main.js lataaPuheKentat): Aani = tallennettu ääni, jos se on
        /// Aanivaihtoehdoissa, muuten null (= "(pelin oletus: …)"); Ohje = tallennettu ohje
        /// sellaisenaan, null jos sitä ei ole (= tyhjä kenttä, paikkamerkkinä oletusohje).
        /// </summary>
        public (string Aani, string Ohje) Asetus(string persoona)
        {
            var oma = Taulu().Hae(persoona) as Dictionary<string, object>;
            string aani = oma != null && oma.TryGetValue("aani", out var a) && a is string sa && Aanivaihtoehdot.Contains(sa) ? sa : null;
            string ohje = oma != null && oma.TryGetValue("ohje", out var o) && o is string so && so.Length > 0 ? so : null;
            return (aani, ohje);
        }

        /// <summary>
        /// Pyyntöön menevät säädöt (js/puhe.js puheenSaadot): ääni, jos se on ei-tyhjä merkkijono,
        /// ohje trimmattuna, jos ei tyhjä; null, jos kumpaakaan ei ole.
        /// </summary>
        public (string Aani, string Ohje)? Saadot(string persoona)
        {
            if (!(Taulu().Hae(persoona) is Dictionary<string, object> oma)) return null;
            string aani = oma.TryGetValue("aani", out var a) && a is string sa && sa.Length > 0 ? sa : null;
            string ohje = oma.TryGetValue("ohje", out var o) && o is string so && JsTrim(so).Length > 0 ? JsTrim(so) : null;
            return aani != null || ohje != null ? (aani, ohje) : ((string, string)?)null;
        }

        /// <summary>
        /// Tallentaa persoonan äänen ja ohjeen (main.js tallennaPuheKentat): tyhjä ääni = oletus,
        /// ohje trimmataan ja tyhjä = oletus. Molemmat tyhjinä persoona poistuu taulusta.
        /// </summary>
        public void AsetaAsetus(string persoona, string aani, string ohje)
        {
            if (persoona == null) return;
            var taulu = Taulu();
            var arvo = new Dictionary<string, object>
            {
                ["aani"] = string.IsNullOrEmpty(aani) ? null : aani,
                ["ohje"] = ohje == null || JsTrim(ohje).Length == 0 ? null : JsTrim(ohje),
            };
            taulu.Aseta(persoona, arvo);
            Tallenna(taulu);
        }

        /// <summary>Palauttaa persoonan pelin oletukseen (dialogin "Palauta oletus").</summary>
        public void PoistaAsetus(string persoona)
        {
            if (persoona == null) return;
            var taulu = Taulu();
            taulu.Poista(persoona);
            Tallenna(taulu);
        }

        /// <summary>Koko taulu (luePuheAsetukset): kelvoton tai muu kuin objekti = tyhjä.</summary>
        JarjestettyOlio Taulu()
        {
            string raaka = Lue(AsetusAvain);
            if (raaka == null) return new JarjestettyOlio();
            try { return MiniJson.Jasenna(raaka) is Dictionary<string, object> d ? new JarjestettyOlio(d) : new JarjestettyOlio(); }
            catch { return new JarjestettyOlio(); }
        }

        /// <summary>tallennaPuheAsetukset: siivoaa tyhjät persoonat; tyhjä taulu poistaa avaimen.</summary>
        void Tallenna(JarjestettyOlio taulu)
        {
            var siivottu = new JarjestettyOlio();
            foreach (var (avain, arvo) in taulu.Parit())
            {
                if (!Tosi(arvo)) continue;
                var d = arvo as Dictionary<string, object>;
                object aani = d != null && d.TryGetValue("aani", out var a) ? a : null;
                object ohje = d != null && d.TryGetValue("ohje", out var o) ? o : null;
                if (Tosi(aani) || (ohje is string so && JsTrim(so).Length > 0)) siivottu.Aseta(avain, arvo);
            }
            try
            {
                if (siivottu.Maara > 0) kirjoita(AsetusAvain, siivottu.Json());
                else poista(AsetusAvain);
            }
            catch { /* säilö estetty: säädöt elävät vain istunnon */ }
            Muuttui?.Invoke();
        }

        // --- nopeus ja voima ---------------------------------------------------------------------

        /// <summary>Lukunopeus 0,6–1,6 (oletus 1,15). Toteutuu generoinnissa, seuraavasta pyynnöstä alkaen.</summary>
        public double Nopeus => LueRajattu(NopeusAvain, NopeusMin, NopeusMax, NopeusOletus);

        /// <summary>asetaPuheenNopeus: rajaa, tallentaa ja palauttaa arvon (0 tai NaN = oletus).</summary>
        public double AsetaNopeus(double arvo) => AsetaRajattu(NopeusAvain, arvo, NopeusMin, NopeusMax, NopeusOletus);

        /// <summary>Lukijaäänen vahvistus 0,25–2,5 (oletus 2,0), kaikkien persoonien yhteinen.</summary>
        public double Voima => LueRajattu(VoimaAvain, VoimaMin, VoimaMax, VoimaOletus);

        /// <summary>asetaPuheenVoima: rajaa, tallentaa ja palauttaa arvon (0 tai NaN = oletus).</summary>
        public double AsetaVoima(double arvo) => AsetaRajattu(VoimaAvain, arvo, VoimaMin, VoimaMax, VoimaOletus);

        /// <summary>
        /// Synteesin toistotaso (js/puhe.js lukijanTaso): Voima × Lukija-liuku / 0,9. Liuku on
        /// pelaajan Lukija-äänentaso 0–1 (natiivissa Asetukset.Taso(Voima.Lukija)).
        /// </summary>
        public double LukijanTaso(double liuku) => Voima * (LiukuOletus > 0 ? liuku / LiukuOletus : 1);

        double LueRajattu(string avain, double min, double max, double oletus)
        {
            double x = JsParseFloat(Lue(avain));
            return double.IsNaN(x) || double.IsInfinity(x) ? oletus : Math.Min(max, Math.Max(min, x));
        }

        double AsetaRajattu(string avain, double arvo, double min, double max, double oletus)
        {
            double x = Math.Min(max, Math.Max(min, double.IsNaN(arvo) || arvo == 0 ? oletus : arvo));
            try { kirjoita(avain, JsLuku(x)); } catch { /* ei tallennu — voimassa silti istunnon */ }
            Muuttui?.Invoke();
            return x;
        }

        // --- puhepyyntö ------------------------------------------------------------------------------

        /// <summary>
        /// Kehittäjäkoodin lähde (Fable 24.9.2026: avaimet vain iOS Keychainissa; natiivissa Asetukset.PolloKoodi).
        /// Koodia EI tallenneta säilöön (web: localStorage matkakirja-puhe-kehittaja / matkakirja-pollo-kehittajakoodi).
        /// </summary>
        public Func<string> Koodilahde;

        /// <summary>Kehittäjäkoodi (js/puhe.js kehittajaKoodi) Koodilahteestä; tyhjä = ei.</summary>
        public string Kehittajakoodi
        {
            get
            {
                string k;
                try { k = Koodilahde?.Invoke(); } catch { k = null; }
                return string.IsNullOrEmpty(k) ? null : k;
            }
        }

        /// <summary>
        /// Migraatio: poistaa säilöstä vanhat selväkieliset koodit (KoodiAvain, PolloKoodiAvain), jotka aiempi versio
        /// tallensi PlayerPrefsiin. Kutsutaan kerran käynnistyksessä.
        /// </summary>
        public void PoistaVanhatKoodit()
        {
            try { poista(KoodiAvain); poista(PolloKoodiAvain); }
            catch { /* säilö estetty */ }
        }

        /// <summary>
        /// Puhepyyntö workerille (js/puhe.js haePala): JSON-runko ja x-pollo-kehittaja-otsakkeen arvo
        /// (null = ei otsaketta; koodi lähtee vain, kun persoonalla on säätöjä). Teksti annetaan
        /// valmiiksi trimmattuna ja katkaistuna. lohko null = ei säilötä workerin reunalle/R2:een.
        /// </summary>
        public (string Runko, string Koodi) Pyynto(string teksti, string persoona, string lohko)
        {
            var saadot = Saadot(persoona);
            double nopeus = Nopeus;
            var sb = new StringBuilder(96 + (teksti?.Length ?? 0));
            sb.Append("{\"tehtava\":\"puhe\",\"teksti\":");
            JsonTeksti(sb, teksti ?? "");
            sb.Append(",\"persoona\":");
            JsonTeksti(sb, persoona ?? "");
            if (!string.IsNullOrEmpty(lohko)) { sb.Append(",\"lohko\":"); JsonTeksti(sb, lohko); }
            if (saadot?.Aani != null) { sb.Append(",\"aani\":"); JsonTeksti(sb, saadot.Value.Aani); }
            if (saadot?.Ohje != null) { sb.Append(",\"ohje\":"); JsonTeksti(sb, saadot.Value.Ohje); }
            if (nopeus != 1) sb.Append(",\"nopeus\":").Append(JsLuku(nopeus));
            sb.Append('}');
            return (sb.ToString(), saadot != null ? Kehittajakoodi : null);
        }

        /// <summary>
        /// Välimuistiavain (js/puhe.js haePala): persoona|ääni|ohje|nopeus|teksti. Säädetty ääni ei soi
        /// vanhan äänen välimuistista eikä päinvastoin; nopeus 1,0 ei muuta avainta.
        /// </summary>
        public string Valimuistiavain(string persoona, string teksti)
        {
            var s = Saadot(persoona);
            double nopeus = Nopeus;
            string saato = (s != null ? (s.Value.Aani ?? "") + "|" + (s.Value.Ohje ?? "") : "")
                + (nopeus != 1 ? "|" + JsLuku(nopeus) : "");
            return persoona + "|" + saato + "|" + teksti;
        }

        // --- JavaScript-yhteensopivat apurit ---------------------------------------------------------

        /// <summary>JS-totuusarvo (Boolean(x)) MiniJsonin arvoille.</summary>
        static bool Tosi(object x) => x switch
        {
            null => false,
            bool b => b,
            double d => d != 0 && !double.IsNaN(d),
            string s => s.Length > 0,
            _ => true,
        };

        static bool JsTyhja(char c) =>
            c == ' ' || c == '\t' || c == '\n' || c == '\v' || c == '\f' || c == '\r' || c == '\u00A0' || c == '\uFEFF'
            || c == '\u2028' || c == '\u2029' || CharUnicodeInfo.GetUnicodeCategory(c) == UnicodeCategory.SpaceSeparator;

        /// <summary>String.prototype.trim (JS:n tyhjät merkit, ei .NETin \u0085).</summary>
        public static string JsTrim(string s)
        {
            if (s == null) return null;
            int a = 0, b = s.Length;
            while (a < b && JsTyhja(s[a])) a++;
            while (b > a && JsTyhja(s[b - 1])) b--;
            return s.Substring(a, b - a);
        }

        /// <summary>Number.parseFloat: pisin desimaalietuliite tyhjien jälkeen; muuten NaN (null = NaN).</summary>
        public static double JsParseFloat(string s)
        {
            if (s == null) return double.NaN;
            int i = 0;
            while (i < s.Length && JsTyhja(s[i])) i++;
            int alku = i;
            if (i < s.Length && (s[i] == '+' || s[i] == '-')) i++;
            if (string.CompareOrdinal(s, i, "Infinity", 0, 8) == 0)
                return s[alku] == '-' ? double.NegativeInfinity : double.PositiveInfinity;
            int numerot = 0;
            while (i < s.Length && s[i] >= '0' && s[i] <= '9') { i++; numerot++; }
            if (i < s.Length && s[i] == '.')
            {
                i++;
                while (i < s.Length && s[i] >= '0' && s[i] <= '9') { i++; numerot++; }
            }
            if (numerot == 0) return double.NaN;
            int ennenE = i;
            if (i < s.Length && (s[i] == 'e' || s[i] == 'E'))
            {
                int j = i + 1;
                if (j < s.Length && (s[j] == '+' || s[j] == '-')) j++;
                int k = j;
                while (k < s.Length && s[k] >= '0' && s[k] <= '9') k++;
                i = k > j ? k : ennenE;
            }
            return double.Parse(s.Substring(alku, i - alku), NumberStyles.Float, CultureInfo.InvariantCulture);
        }

        /// <summary>Number.prototype.toString (ECMAScript Number::toString, kanta 10).</summary>
        public static string JsLuku(double x)
        {
            if (double.IsNaN(x)) return "NaN";
            if (x == 0) return "0";
            if (double.IsInfinity(x)) return x > 0 ? "Infinity" : "-Infinity";
            if (x < 0) return "-" + JsLuku(-x);
            // Lyhin takaisin kääntyvä numerosarja (.NET Core 3+ "R" = sama kuin JS:n) ja kymmenpotenssi.
            string lyhin = x.ToString("R", CultureInfo.InvariantCulture);
            string mantissa = lyhin, eks = "0";
            int e = lyhin.IndexOfAny(new[] { 'E', 'e' });
            if (e >= 0) { mantissa = lyhin.Substring(0, e); eks = lyhin.Substring(e + 1); }
            int piste = mantissa.IndexOf('.');
            string kokonais = piste >= 0 ? mantissa.Substring(0, piste) : mantissa;
            string murto = piste >= 0 ? mantissa.Substring(piste + 1) : "";
            string numerotRaaka = kokonais + murto;
            int n = kokonais.Length + int.Parse(eks, NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture);
            // Etunollat pois (0.00123 → 123, n korjataan).
            int etu = 0;
            while (etu < numerotRaaka.Length - 1 && numerotRaaka[etu] == '0') { etu++; n--; }
            string d = numerotRaaka.Substring(etu).TrimEnd('0');
            if (d.Length == 0) return "0";
            int k = d.Length;
            if (k <= n && n <= 21) return d + new string('0', n - k);
            if (0 < n && n <= 21) return d.Substring(0, n) + "." + d.Substring(n);
            if (-6 < n && n <= 0) return "0." + new string('0', -n) + d;
            string ep = (n - 1 >= 0 ? "+" : "-") + Math.Abs(n - 1).ToString(CultureInfo.InvariantCulture);
            return k == 1 ? d + "e" + ep : d.Substring(0, 1) + "." + d.Substring(1) + "e" + ep;
        }

        /// <summary>JSON.stringify merkkijonolle (lyhyet pakomerkit, muut ohjausmerkit \u00xx, orvot sijaismerkit).</summary>
        public static void JsonTeksti(StringBuilder sb, string s)
        {
            sb.Append('"');
            for (int i = 0; i < s.Length; i++)
            {
                char c = s[i];
                switch (c)
                {
                    case '"': sb.Append("\\\""); continue;
                    case '\\': sb.Append("\\\\"); continue;
                    case '\b': sb.Append("\\b"); continue;
                    case '\f': sb.Append("\\f"); continue;
                    case '\n': sb.Append("\\n"); continue;
                    case '\r': sb.Append("\\r"); continue;
                    case '\t': sb.Append("\\t"); continue;
                }
                if (c < 0x20) { sb.Append("\\u").Append(((int)c).ToString("x4", CultureInfo.InvariantCulture)); continue; }
                if (char.IsHighSurrogate(c))
                {
                    if (i + 1 < s.Length && char.IsLowSurrogate(s[i + 1])) { sb.Append(c).Append(s[i + 1]); i++; continue; }
                    sb.Append("\\u").Append(((int)c).ToString("x4", CultureInfo.InvariantCulture)); continue;
                }
                if (char.IsLowSurrogate(c)) { sb.Append("\\u").Append(((int)c).ToString("x4", CultureInfo.InvariantCulture)); continue; }
                sb.Append(c);
            }
            sb.Append('"');
        }

        /// <summary>JSON.stringify MiniJsonin arvolle.</summary>
        static void JsonArvo(StringBuilder sb, object x)
        {
            switch (x)
            {
                case null: sb.Append("null"); break;
                case bool b: sb.Append(b ? "true" : "false"); break;
                case double d: sb.Append(double.IsNaN(d) || double.IsInfinity(d) ? "null" : JsLuku(d)); break;
                case string s: JsonTeksti(sb, s); break;
                case List<object> l:
                    sb.Append('[');
                    for (int i = 0; i < l.Count; i++) { if (i > 0) sb.Append(','); JsonArvo(sb, l[i]); }
                    sb.Append(']');
                    break;
                case Dictionary<string, object> d: new JarjestettyOlio(d).Json(sb); break;
                case JarjestettyOlio o: o.Json(sb); break;
                default: sb.Append("null"); break;
            }
        }

        /// <summary>
        /// JS-olion avainjärjestys: taulukkoindeksin kaltaiset avaimet ("0", "2", …) nousevasti ensin,
        /// muut lisäysjärjestyksessä. Uudelleen asetettu avain pysyy paikallaan.
        /// </summary>
        sealed class JarjestettyOlio
        {
            readonly List<string> avaimet = new List<string>();
            readonly Dictionary<string, object> arvot = new Dictionary<string, object>();

            public JarjestettyOlio() { }
            public JarjestettyOlio(Dictionary<string, object> d) { foreach (var p in d) Aseta(p.Key, p.Value); }

            public int Maara => avaimet.Count;
            public object Hae(string avain) => avain != null && arvot.TryGetValue(avain, out var x) ? x : null;

            public void Aseta(string avain, object arvo)
            {
                if (!arvot.ContainsKey(avain)) avaimet.Add(avain);
                arvot[avain] = arvo;
            }

            public void Poista(string avain)
            {
                if (arvot.Remove(avain)) avaimet.Remove(avain);
            }

            static bool Indeksi(string s, out uint n)
            {
                n = 0;
                if (s.Length == 0 || (s.Length > 1 && s[0] == '0')) return false;
                foreach (char c in s) if (c < '0' || c > '9') return false;
                return uint.TryParse(s, NumberStyles.None, CultureInfo.InvariantCulture, out n) && n != uint.MaxValue;
            }

            public IEnumerable<(string, object)> Parit()
            {
                var indeksit = new List<(uint, string)>();
                foreach (var a in avaimet) if (Indeksi(a, out var n)) indeksit.Add((n, a));
                indeksit.Sort((x, y) => x.Item1.CompareTo(y.Item1));
                foreach (var (_, a) in indeksit) yield return (a, arvot[a]);
                foreach (var a in avaimet) if (!Indeksi(a, out _)) yield return (a, arvot[a]);
            }

            public string Json() { var sb = new StringBuilder(); Json(sb); return sb.ToString(); }

            public void Json(StringBuilder sb)
            {
                sb.Append('{');
                bool eka = true;
                foreach (var (a, x) in Parit())
                {
                    if (!eka) sb.Append(',');
                    eka = false;
                    JsonTeksti(sb, a);
                    sb.Append(':');
                    JsonArvo(sb, x);
                }
                sb.Append('}');
            }
        }
    }
}
