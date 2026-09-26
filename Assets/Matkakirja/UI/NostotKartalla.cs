// NOSTOT KARTALLA (Natiivi-UI, build 6 -löydös 1): webin pallon nostokerroksen merkit
// (js/pallolauta/nostot.js, js/fokusnosto-symbolit.js) Natiivisepän NostoKerroksen tiedoilla
// (RAJAPINTA.md luku 3c). Kartta päättää, mitkä nostot näkyvät ja missä (Naytettavat, Ruutu);
// tämä piirtää merkin, nimiön ja syttymisen ja avaa kortin napautuksesta.
//
//   ● Thessaloniki        pisteperheet (kaupungit, historia, kulttuuri, kauppa, hetket): harmaa hehkupiste ja musterengas
//   ∧ Ólympos  ≈ Strymónas   viivamerkit (NostoSaannot.MiniTunnus): luonto vuori-kolmio tai aalto lajin mukaan,
//                        eläimet tassu, skandaalit salama, ihmeet ruusu — musteella, ei aiheväriä
//   [kuva] Delfoi         tyyppimerkki (merkki-*.png) tasolla 1 tai kertoimesta 4 (NostoSaannot.Kuvamerkki: laji ensin)
//
// LÖYDÖS 50 (25.9.2026, web-nostot-kartalla-mitat.txt): mitta = min(katto / 11, 0,7727 × zoomikerroin × oma),
// oma 1,353 kaupungeilla ja 1,3 tasolla 1; katto 16 px, kertoimesta 2 kertoimeen 4 log2-lineaarisesti 22 px:iin.
// Merkki: kuvamerkki vain tasolla 1 (1,6-kertainen ruutu) tai kertoimesta 4; muuten pisteperheet harmaana
// hehkupisteenä ja muut viivamerkkinä musteella. Nimiö Liberation Serif kursiivi 11 × mitta, ilman haloa, lyhennys
// 18 merkkiin kokonaisin sanoin (web nostosymLyhennaNimio). Paikka webin 8 asennosta (nostosymNimioAsemointi),
// väistö levossa (web sovittelu.js): kaupunki > taso 1 > taso 2 > taso 3, lyhyt nimi ensin; ei vapaata → nimiö
// häipyy ja merkki jää. Ryhmitys vain koelipulla (web ?aihemerkit=1, ui aihemerkit on).
// Koko kerros häivähtää Syttyminen-arvon mukaan (0 → 1, 0,7 s). Merkit näkyvät aina; karttaselitteen
// valinta ohjaa vain karttavalojen hehkua (Natiiviseppä, web). Linssin ajan kerros on piilossa (NaytaSallittu),
// paitsi linssinimet-tilassa (NostoKerros.LinssiNimet): merkit näkyvät ilman napautusta ja viuhkaa.
//
// AIHEMERKIT JA VIUHKA (web js/pallolauta/aihemerkit.js, PAATOKSET 27 ja 32): saman aiheen nostot yhdistyvät
// yhdeksi merkiksi, kun niiden nimiölaatikot leikkaavat (vara 1 px) tai pisteet ovat sormen säteen (44 px)
// sisällä; saman kaupungin nostot aina. Ryhmän nimiö on tärkeimmän noston nimi + "…", ei lukumäärää, ja se näkyy
// VAIN LÄHIZOOMISSA (web aihenostonNimioNakyy = lahizoomiAuki, PAATOKSET 27 TARKENNUS 4 kohta 10; natiivissa sama
// portti NostoKerros.Lahella, joka päästää lahizoom-nostot). Ryhmämerkki on pelkkä värilevy ilman sisäsymbolia
// (web piirraAihemerkki, css .pallolauta-aihemerkki-*): paperi r 3,4 peitto 0,95, aiheväri peitto 0,5 ja
// musterengas #4b3a1c 1,1 px peitto 0,85.
// Napautus avaa viuhkan: pystylista merkin tyhjemmälle kyljelle (26 px sivuun, rivit 30 px välein) kehyksettömällä
// paperipohjalla (#efdcb4, peitto 0,82); rivin napautus avaa noston kortin. Lista sulkeutuu kartan
// napautuksesta, zoomista ja panoroinnista (merkin piste liikkuu) sekä toisen viuhkan avauksesta.
//
// LÖYDÖS 125 (omistaja build 16: "Ateenan karttanostoista puuttuu symboleita, ja niiden teksteistä ei saa selvää";
// web mitattu proto-3d/lokit/nostot-125, Natiivisepän patch): 1) luonnon viivamerkit (vuori, aalto) puuttuivat —
// luonto piirtyi harmaana pisteenä; merkin valitsee nyt NostoSaannot.MiniTunnus kategoriasta ja lajista (laji =
// kohteen tyyppi, datassa kun vienti tuo sen), kuvamerkin NostoSaannot.Kuvamerkki ja kaupunkikoon
// NostoKerros.Nosto.Kaupunkimerkki. 2) Hehkupiste: harmaa häive 2,1 r ja vaalea sisus (NostoHehku) musterenkaan alla.
// 3) Kontrasti: UI Toolkit sekoittaa SDF-reunan lineaarisesti, jolloin 4,4–8,5 px:n kursiivi jäi webiä vaaleammaksi ja
// ohuemmaksi; musteen peitot korjataan (NimiLadonta.LineaarinenAlfa, webin 0,92 → 0,97) ja reunaa vahvistetaan
// samalla musteella (NostoKerros.NimionReunaPeitto / NimionPohjaPeitto, mitattu kuvaparista). Meren nimiö on webin
// harvennettu versaali (rgba(120, 108, 84, 0,72), 0,28 em). Sykähdys ±7 % / 2,4 s Joutosykkeen tahdissa (Syke).
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class NostotKartalla
    {
        readonly VisualElement juuri;
        readonly List<Merkki> merkit = new List<Merkki>();
        readonly Dictionary<string, NostoMerkit.Rivi> rivit = new Dictionary<string, NostoMerkit.Rivi>();
        NostoKerros lahde;
        PalloKierto lepoKierto;
        IKarttaValot valot;
        bool sallittu = true;
        /// <summary>Linssinimet-tila: merkit näkyvät linssin aikana ilman napautusta (NostoKerros.LinssiNimet).</summary>
        bool vainNimet;
        /// <summary>
        /// Löydös 106 (web sovittelu.js sääntö 5, nostot.js sovitellutAsennot): nimiön kylki ja näkyvyys NOSTON
        /// Id:llä, ei merkin indeksillä. Merkit kierrätetään indeksillä (Hae), ja Naytettavat-järjestys muuttuu
        /// vedossa aina, kun jokin nosto ylittää ruudun reunan — ennen merkki sai toisen noston ja kylki nollautui.
        /// Ele = lukko tuli eleen aikana (web syy 'ele'). Lukko vapautuu levossa, kun nosto ei ole enää näkyvissä.
        /// </summary>
        sealed class Lukko { public string Kylki; public bool Nakyy, Ele; }
        readonly Dictionary<string, Lukko> lukot = new Dictionary<string, Lukko>();
        /// <summary>Web SOVITTELUN_NAKYVYYSVARA_PX: lukittu laatikko tämän varan sisällä ruudusta pitää kylkensä.</summary>
        const float NakyvyysVara = 16f;

        sealed class Merkki
        {
            public VisualElement El, Symboli;
            public Label Nimio;
            public string Id, Tyyppi;
            /// <summary>Ryhmän jäsenet (null = yksittäinen nosto).</summary>
            public List<NostoKerros.Nosto> Ryhma;
            public Vector2 Piste;
            /// <summary>Mitoitus tältä kehykseltä: mitta (px / yksikkö), ikoniruudun puolikas yksikköinä, prioriteetti.</summary>
            public float Mitta, Ruutu, Paino;
            public bool Kiintea, Taso1;
            /// <summary>Nimiön kylki (web SOVITTELUN_KYLJET) ja näkyvyys väistön jälkeen.</summary>
            public string Kylki;
            public bool NimioNakyy = true;
            public Vector2 NimioKoko;
            /// <summary>Löydös 125: nimiön asu viimeksi asetettuna (muste, reuna, pohja, harvennus px), jottei tyyli likaannu turhaan.</summary>
            public Color Muste;
            public float Reuna = -1f, ReunaLeveys = -1f, Pohja = -1f, Harvennus;
            /// <summary>Elävä kartta, kohta 2: musteen jälki (löytämätön), pääkohteen hehku ja edellinen löydetty-tila (löydön käyrä).</summary>
            public VisualElement Jalki, Hehku;
            public bool? Loydetty;
            public string JaljenId;
        }

        // Löydös 125: nimiön musteet (css/styles.css .nostosym-nimio, NOSTOSYM_TASO1_MUSTE, .nostosym-nimio-meri) peitot
        // lineaariseen sekoitukseen korjattuina (NimiLadonta.LineaarinenAlfa: webin sRGB-sekoitus pergamentilla / merellä).
        static Color Vari(double[] c, double a, double[] pohja) =>
            new Color((float)c[0], (float)c[1], (float)c[2], (float)NimiLadonta.LineaarinenAlfa(c, a, pohja));
        static readonly Color NimionMuste = Vari(NostoSaannot.NimionMuste, NostoSaannot.NimionPeitto, NimiLadonta.PohjaMaa),
            Taso1Muste = Vari(NostoSaannot.Taso1Muste, NostoSaannot.Taso1Peitto, NimiLadonta.PohjaMaa),
            MerenMuste = Vari(NostoSaannot.MerenMuste, NostoSaannot.MerenPeitto, NimiLadonta.PohjaMeri);

        /// <summary>
        /// Nimiön muste ja reunan vahvistus samalla musteella (NostoKerros.NimionReunaPeitto: SDF-ääriviiva lähes
        /// nollaleveydellä, NimionPohjaPeitto: siirtymätön varjo), asetetaan vain muuttuneina.
        /// </summary>
        static void AsetaMuste(Merkki m, Color muste)
        {
            float reuna = NostoKerros.NimionReunaPeitto, leveys = reuna > 0f ? NostoKerros.NimionReunaLeveys : 0f, pohja = NostoKerros.NimionPohjaPeitto;
            if (m.Muste == muste && m.Reuna == reuna && m.ReunaLeveys == leveys && m.Pohja == pohja) return;
            m.Muste = muste; m.Reuna = reuna; m.ReunaLeveys = leveys; m.Pohja = pohja;
            m.Nimio.style.color = muste;
            m.Nimio.style.unityTextOutlineWidth = leveys;
            m.Nimio.style.unityTextOutlineColor = new Color(muste.r, muste.g, muste.b, reuna);
            m.Nimio.style.textShadow = pohja > 0f
                ? new StyleTextShadow(new TextShadow { offset = Vector2.zero, blurRadius = 0f, color = new Color(muste.r, muste.g, muste.b, pohja) })
                : new StyleTextShadow(StyleKeyword.Null);
        }

        /// <summary>Koelippu (web ?aihemerkit=1): saman aiheen nostot ryhmämerkeiksi. Oletus pois (PAATOKSET 34/17 b).</summary>
        public static bool Aihemerkit
        {
            get => PlayerPrefs.GetInt("matkakirja-aihemerkit", 0) == 1;
            set { PlayerPrefs.SetInt("matkakirja-aihemerkit", value ? 1 : 0); PlayerPrefs.Save(); }
        }

        // Web js/pallolauta/nostot.js:398 NOSTON_MITTA (8,5 / 11), fokusnosto-symbolit.js NOSTOSYM_NIMIO_KOKO 11,
        // NOSTOSYM_MINI_RUUTU 7,4, NOSTOSYM_PISTE_R 3,4, NOSTOSYM_NIMIO_X 8,9, NOSTOSYM_NIMIO_Y 0,36 × 11,
        // NOSTOSYM_KUVAMERKIN_KERROIN 1,6, NOSTON_TASO1_KERROIN 1,3, kaupunki 11,5 / 8,5; tyyppimerkin kerroin 4
        // NostoSaannot.KuvamerkkiKaytossa (löydös 125).
        const float NostonMitta = 8.5f / 11f, NimioK = 11f, MiniRuutu = 7.4f, NimioX = 8.9f, NimioY = 0.36f * 11f,
            KuvamerkinKerroin = 1.6f, Taso1Kerroin = 1.3f, KaupunginKerroin = 11.5f / 8.5f,
            NimioMerkkeja = 18f, Nousu = 0.891f, Hystereesi = 6f;
        static readonly string[] Kyljet = { "oikea", "vasen", "yla", "ala", "koillinen", "kaakko", "luode", "lounas" };

        /// <summary>Web kerroin = saapumisnäkymän kameran korkeus / nykyinen (min 0,2; NostoKerros.ZoomKerroin).</summary>
        static float ZoomKerroin(NostoKerros k) => k.ZoomKerroin;

        /// <summary>Datan nimiön kylki (skeema 1.39 karttavalot puoli, Nosto.Puoli).</summary>
        static string DatanKylki(NostoKerros.Nosto s) => s?.Puoli;

        /// <summary>Web nostosymNimionKattoPx: 16 px kertoimeen 2, log2-lineaarisesti 22 px:iin kertoimessa 4.</summary>
        static float NimionKatto(float kerroin) =>
            kerroin <= 2f ? 16f : kerroin >= 4f ? 22f : 16f + 6f * Mathf.Log(kerroin / 2f, 2f);

        /// <summary>Web nostosymLyhennaNimio: yli 18 merkkiä → kokonaiset sanat 18:aan (ennen ja/sekä) + ".".</summary>
        public static string Lyhenna(string nimi)
        {
            string siisti = System.Text.RegularExpressions.Regex.Replace((nimi ?? "").Trim(), @"\s+", " ");
            if (siisti.Length <= NimioMerkkeja) return siisti;
            var sanat = siisti.Split(' ');
            int rinnastus = System.Array.FindIndex(sanat, x => x == "ja" || x == "sekä");
            int n = rinnastus > 0 ? rinnastus : sanat.Length;
            string ulos = sanat[0];
            if (ulos.Length > NimioMerkkeja) return ulos.Substring(0, (int)NimioMerkkeja - 1) + ".";
            for (int i = 1; i < n; i++)
            {
                if ((ulos + " " + sanat[i]).Length > NimioMerkkeja) break;
                ulos += " " + sanat[i];
            }
            return ulos == siisti ? ulos : ulos + ".";
        }

        const float RyhmitysPx = 44f, RyhmitysVara = 1f, ViuhkaSivuun = 26f, ViuhkaVali = 30f, ViuhkaReuna = 10f;
        readonly VisualElement viuhka;
        string viuhkanAvain;
        Vector2 viuhkanPiste;

        public NostotKartalla(UiKerros kerros)
        {
            juuri = Rakenne.El("mk-nostot", kerros.Juuri(UiKerros.Nostot), PickingMode.Ignore);
            foreach (var r in NostoMerkit.Jarjestys) rivit[r.Id] = r;
            viuhka = Rakenne.El("mk-nosto-viuhka", juuri);
            viuhka.style.display = DisplayStyle.None;
            kerros.JokaRuutu += Kytke;
            kerros.JokaRuutu += SuljeOhiNapautuksesta;
            kerros.JokaRuutu += Syke;
        }

        float levonAlku = -1f, sykeNyt = 1f;

        /// <summary>
        /// HEHKUPISTEEN SYKÄHDYS (löydös 125; web glnimiot-sovitin.js glSykeKerroin: koko 1 + 0,07 · a · sin(2π t / 2,4 s),
        /// a nousee 0,6 s levon alusta, liikkeessä 1). Natiivissa aika ja voima Joutosykkeestä (Lampopaatos.SykeJaatyy:
        /// syke elää aktiivisuuden jälkeen ja jäätyy levossa, jotta pallo ja UI saavat levätä PAIKALLAAN-tilassa).
        /// Pistemerkin symboli (hehku ja rengas) skaalautuu keskipisteensä ympäri, nimiö ei; kuvamerkki ei syki.
        /// </summary>
        void Syke()
        {
            bool levossa = lepoKierto == null || lepoKierto.Levossa;
            if (!levossa) levonAlku = -1f;
            else if (levonAlku < 0f) levonAlku = Time.unscaledTime;
            float a = levossa ? Joutosyke.Voima * Mathf.Clamp01((Time.unscaledTime - levonAlku) / (float)NostoSaannot.SykkeenNousuS) : 0f;
            float s = juuri.resolvedStyle.display == DisplayStyle.None ? 1f : (float)NostoSaannot.PisteenSyke(Joutosyke.Aika, a);
            if (Mathf.Abs(s - sykeNyt) < 0.0005f) return;
            sykeNyt = s;
            var koko = new Scale(new Vector3(s, s, 1f));
            foreach (var m in merkit)
                if (m.Symboli != null && m.Symboli.ClassListContains("mk-nosto-merkki__symboli--piste")) m.Symboli.style.scale = koko;
        }

        /// <summary>Linssi päällä tai muu koko ruudun näkymä: merkit piiloon.</summary>
        public void NaytaSallittu(bool sallitaan)
        {
            sallittu = sallitaan;
            Paivita();
        }

        // ELÄVÄ KARTTA, KOHTA 2 (build 20): kokoluokka ja löydetty-tila tulevat NostoKerros.Nosto-kentistä (Natiiviseppä), joihin
        // Linssisepän ElavaHerays kytkee Pelikoodarin musteen; jäljet, hehku ja löydön käyrä MusteJaljetista (Linssiseppä).
        /// <summary>Kokoluokan kerroin suhteessa kohteeseen (pääkohde 1,0 : kohde 0,67 : pieni 0,44; kohde = nykyinen koko).</summary>
        static float LuokanKerroin(int luokka) =>
            luokka == NostoKerros.MusteLuokka.Paakohde ? 1f / 0.67f : luokka == NostoKerros.MusteLuokka.Pieni ? 0.44f / 0.67f : 1f;

        /// <summary>Löytämätön nosto: himmeä musteen jälki ilman nimeä (MusteJalki.JaljenPeitto 0,5).</summary>
        const float LoytamatonPeitto = 0.5f, JaljenKoko = 1.35f, HehkunKoko = 2.6f, LoytoS = 0.3f;

        /// <summary>
        /// Elävä kartta, kohta 2: löytämätön = Linssisepän musteen jälki (MusteJaljet.Hae, muunnelman kierto ja peilaus) peitolla
        /// 0,5 symbolin tilalla; löydetty = täysi merkki, ja löydön hetkellä käyrä MusteJaljet.Loyto (0,3 s, mittakaava ja peitto);
        /// pääkohteella staattinen kultainen hehku merkin alla. Tyylit kirjoitetaan vain muutoksessa (lepopiirto).
        /// </summary>
        void AsetaMuste(Merkki m, NostoKerros.Nosto s, bool loydetty, bool ryhma, float ruutuPx)
        {
            bool loyto = m.Loydetty == false && loydetty && m.JaljenId == s.Id;
            m.Loydetty = loydetty;
            m.JaljenId = s.Id;
            var jalki = loydetty ? null : MusteJaljet.Hae(s.Id);
            if (jalki != null)
            {
                if (m.Jalki == null)
                {
                    m.Jalki = new VisualElement { pickingMode = PickingMode.Ignore };
                    m.Jalki.AddToClassList("mk-nosto-merkki__jalki");
                    m.El.Insert(0, m.Jalki);
                }
                int mu = MusteJaljet.Muunnelma(s.Id);
                float koko = ruutuPx * JaljenKoko;
                m.Jalki.style.backgroundImage = new StyleBackground(jalki);
                m.Jalki.style.width = m.Jalki.style.height = koko;
                m.Jalki.style.left = m.Jalki.style.top = (ruutuPx - koko) / 2f;
                m.Jalki.style.rotate = new Rotate(new Angle(mu * 36f));
                m.Jalki.style.scale = new Scale(new Vector2(mu % 2 == 0 ? 1f : -1f, 1f));
                m.Jalki.style.display = DisplayStyle.Flex;
            }
            else if (m.Jalki != null) m.Jalki.style.display = DisplayStyle.None;
            // Symboli piiloon jäljen ajaksi; ilman valmista poolia löytämätön on himmeä symboli.
            if (m.Symboli != null) m.Symboli.style.display = jalki != null ? DisplayStyle.None : DisplayStyle.Flex;
            float peitto = loydetty ? 1f : LoytamatonPeitto;
            if (!loyto && !Mathf.Approximately(m.El.resolvedStyle.opacity, peitto)) m.El.style.opacity = peitto;
            bool hehku = loydetty && !ryhma && s.Luokka == NostoKerros.MusteLuokka.Paakohde;
            var hehkuTex = hehku ? MusteJaljet.Hehku() : null;
            if (hehkuTex != null)
            {
                if (m.Hehku == null)
                {
                    m.Hehku = new VisualElement { pickingMode = PickingMode.Ignore };
                    m.Hehku.AddToClassList("mk-nosto-merkki__hehku");
                    m.Hehku.style.backgroundImage = new StyleBackground(hehkuTex);
                    m.El.Insert(0, m.Hehku);
                }
                float koko = ruutuPx * HehkunKoko;
                m.Hehku.style.width = m.Hehku.style.height = koko;
                m.Hehku.style.left = m.Hehku.style.top = (ruutuPx - koko) / 2f;
                m.Hehku.style.display = DisplayStyle.Flex;
            }
            else if (m.Hehku != null) m.Hehku.style.display = DisplayStyle.None;
            if (loyto && !LinssiUi.VahennettyLiike()) AnimoiLoyto(m, s.Id);
        }

        /// <summary>Löydön käyrä (MusteJaljet.Loyto, 0,3 s): merkki kasvaa jousella ja peitto nousee; herättää ruudunpäivityksen.</summary>
        static void AnimoiLoyto(Merkki m, string id)
        {
            float alku = Time.unscaledTime;
            IVisualElementScheduledItem ajo = null;
            ajo = m.El.schedule.Execute(() =>
            {
                float t = Time.unscaledTime - alku;
                if (m.Id != id || t >= LoytoS)
                {
                    ajo.Pause();
                    m.El.style.scale = StyleKeyword.Null;
                    m.El.style.opacity = 1f;
                    return;
                }
                Ruudunpaivitys.Herata(0.1f);
                var (k, p) = MusteJaljet.Loyto(t);
                m.El.style.scale = new Scale(new Vector2(k, k));
                m.El.style.opacity = p;
            }).Every(16);
        }

        void Kytke()
        {
            // Ladottujen nimien laatikot (web nimet.laatikot()): uusi ladonta levossa → sovittelu uudelleen.
            var nk = Nimikerros.Instanssi;
            if (nk != nimikerros)
            {
                if (nimikerros != null) nimikerros.LaatikotMuuttuivat -= NimetMuuttuivat;
                nimikerros = nk;
                if (nimikerros != null) nimikerros.LaatikotMuuttuivat += NimetMuuttuivat;
            }
            var k = NostoKerros.Instanssi;
            if (k != lahde)
            {
                if (lahde != null) lahde.Paivittyi -= Paivita;
                lahde = k;
                if (lahde != null) lahde.Paivittyi += Paivita;
                Paivita();
            }
            var kierto = k != null ? k.kierto : null;
            if (kierto != lepoKierto)
            {
                if (lepoKierto != null) lepoKierto.LepoMuuttui -= Lepo;
                lepoKierto = kierto;
                if (lepoKierto != null) lepoKierto.LepoMuuttui += Lepo;
            }
            var p = UiPalvelut.KarttaValot;
            if (p != valot)
            {
                if (valot != null) valot.Muuttui -= Paivita;
                valot = p;
                if (valot != null) valot.Muuttui += Paivita;
                Paivita();
            }
        }

        Nimikerros nimikerros;
        readonly List<Rect> nimet = new List<Rect>();

        void NimetMuuttuivat() { if (lepoKierto == null || lepoKierto.Levossa) Paivita(); }

        /// <summary>Nimikerroksen laatikot (ruudun pikselit, origo vasen ala) paneelin pisteiksi (origo vasen ylä).</summary>
        void LueNimet()
        {
            nimet.Clear();
            var paneeli = juuri.panel;
            if (nimikerros == null || paneeli == null) return;
            foreach (var r in nimikerros.Laatikot)
            {
                var a = RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(r.xMin, Screen.height - r.yMax));
                var b = RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(r.xMax, Screen.height - r.yMin));
                nimet.Add(Rect.MinMaxRect(a.x, a.y, b.x, b.y));
            }
        }

        /// <summary>Kamera pysähtyi: merkit pyöristetyille pikseleille (liikkeen aikana ne kulkevat pyöristämättä).</summary>
        void Lepo(bool levossa)
        {
            if (!levossa) { vetoKyljet.Clear(); kylkivaihdot = 0; return; }
            // Löydös 106 -mittari: montako kertaa näkyvän noston nimiö vaihtoi kylkeä vedon aikana (tavoite 0).
            Debug.Log($"MATKAKIRJA nostot: kylkivaihdot vedossa {kylkivaihdot}");
            Paivita();
        }

        /// <summary>Löydös 106 -mittari: noston viimeksi näytetty kylki vedon aikana.</summary>
        readonly Dictionary<string, string> vetoKyljet = new Dictionary<string, string>();
        int kylkivaihdot;

        void Paivita()
        {
            var k = lahde;
            // Linssin aikana merkit näkyvät, kun Natiivisepän linssinimet on päällä (web: linssikartan nimet),
            // mutta ilman napautusta ja viuhkaa: kerros päästää kosketukset kartalle.
            bool linssinimet = !sallittu && k != null && k.LinssiNimet;
            bool nakyy = (sallittu || linssinimet) && k != null && k.Nakyvissa && juuri.panel != null;
            juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (linssinimet != vainNimet)
            {
                vainNimet = linssinimet;
                foreach (var mk in merkit) { mk.El.pickingMode = vainNimet ? PickingMode.Ignore : PickingMode.Position; AsetaNimionOsuma(mk); }
                if (vainNimet) SuljeViuhka();
            }
            if (!nakyy) return;
            juuri.style.opacity = Mathf.Clamp01(k.Syttyminen);
            // Merkit näkyvät aina (web fokuskohteet); karttaselitteen valinta ohjaa vain karttavalojen hehkua.
            var paneeli = juuri.panel;
            var lista = k.Naytettavat;
            // Ruutu: pikselit, origo vasen ala → paneelin pisteet (origo vasen ylä).
            var pisteet = new Vector2[lista.Count];
            for (int i = 0; i < lista.Count; i++)
                pisteet[i] = RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(lista[i].Ruutu.x, Screen.height - lista[i].Ruutu.y));
            int n = 0;
            bool viuhkaLoytyi = false;
            float kerroin = ZoomKerroin(k);
            foreach (var kasa in Aihemerkit ? Ryhmita(lista, pisteet) : Yksittain(lista.Count))
            {
                var karki = kasa[0];
                foreach (int i in kasa) if (lista[i].Tarkeys > lista[karki].Tarkeys) karki = i;
                bool ryhma = kasa.Count > 1;
                var m = Hae(n++, lista[karki], ryhma ? (k.Lahella ? RyhmanNimio(lista[karki].Nimio ?? lista[karki].Nimi) : "") : null, ryhma, kerroin);
                m.Piste = pisteet[karki];
                if (ryhma)
                {
                    m.Ryhma = new List<NostoKerros.Nosto>(kasa.Count);
                    foreach (int i in kasa) m.Ryhma.Add(lista[i]);
                    m.Ryhma.Sort((a, b) => b.Tarkeys.CompareTo(a.Tarkeys));
                    if (viuhkanAvain != null && RyhmanAvain(m.Ryhma) == viuhkanAvain)
                    {
                        viuhkaLoytyi = true;
                        // Zoomi tai panorointi siirsi merkkiä: lista kiinni (web: sulkeutuu kameran liikkeestä).
                        if ((m.Piste - viuhkanPiste).sqrMagnitude > 9f) SuljeViuhka();
                    }
                }
                else m.Ryhma = null;
                // Löydös 27 (hytinä panoroinnin jälkeen): liu'un hiipuessa kamera liikkuu alle pikselin, ja kokonaisiin
                // pikseleihin pyöristetyt merkit hyppivät kartan päällä edestakaisin. Liikkeen aikana pyöristämättä
                // (merkki kulkee kartan mukana), levossa pikselille (terävä teksti).
                bool liikkuu = lepoKierto != null && !lepoKierto.Levossa;
                m.El.style.translate = liikkuu ? new Translate(m.Piste.x, m.Piste.y)
                    : new Translate(Mathf.Round(m.Piste.x), Mathf.Round(m.Piste.y));
            }
            for (int i = n; i < merkit.Count; i++) merkit[i].El.style.display = DisplayStyle.None;
            if (viuhkanAvain != null && !viuhkaLoytyi) SuljeViuhka();
            // Väistö vain levossa (web sovittelu levossa): liikkeen aikana kyljet ja näkyvyys pysyvät.
            if (lepoKierto == null || lepoKierto.Levossa) Sovita(n);
        }

        static List<List<int>> Yksittain(int n)
        {
            var l = new List<List<int>>(n);
            for (int i = 0; i < n; i++) l.Add(new List<int>(1) { i });
            return l;
        }

        /// <summary>
        /// Web nostosymNimioAsemointi: nimiön laatikko merkin keskipisteen suhteen (paneelin pisteet, y alas).
        /// oikea/vasen: perusviiva +0,36 K, teksti alkaa/loppuu ±(8,9 + lisä); ylä/ala keskitettynä, perusviiva
        /// −(ruutu + 0,25 K) / +(ruutu + 0,78 K); kulmat vaakakyljen x:llä ja ylä-/alarivin perusviivalla.
        /// </summary>
        static Rect NimionLaatikko(Merkki m, string kylki)
        {
            float mt = m.Mitta, fs = NimioK * mt, w = m.NimioKoko.x, h = m.NimioKoko.y;
            float x = (NimioX + (m.Ruutu - MiniRuutu)) * mt;
            float ylaPv = -(m.Ruutu + 0.25f * NimioK) * mt, alaPv = (m.Ruutu + 0.78f * NimioK) * mt, sivuPv = NimioY * mt;
            float vasen, perus;
            switch (kylki)
            {
                case "vasen": vasen = -x - w; perus = sivuPv; break;
                case "yla": vasen = -w / 2f; perus = ylaPv; break;
                case "ala": vasen = -w / 2f; perus = alaPv; break;
                case "koillinen": vasen = x; perus = -m.Ruutu * mt; break;
                case "kaakko": vasen = x; perus = alaPv; break;
                case "luode": vasen = -x - w; perus = -m.Ruutu * mt; break;
                case "lounas": vasen = -x - w; perus = alaPv; break;
                default: vasen = x; perus = sivuPv; break;
            }
            return new Rect(vasen, perus - Nousu * fs, w, h);
        }

        /// <summary>
        /// Web sovittelu.js: jono painon mukaan (kaupunki 0, taso 1 1000, taso 2 2000, taso 3 3000 + nimen pituus),
        /// esteet = ladotut nimet (Nimikerros.Laatikot, kiinteä muste: estää kaikkia), jo sijoitetut nimiöt, muiden
        /// merkkien ikonit (kaupunki ja taso 1 ohittavat ikonit) ja paneelin reunat; ensin nykyinen kylki (näkyvä nimiö
        /// ei vaihda kylkeä), sitten datan kylki ja webin järjestys. Ei vapaata → nimiö häipyy (180 ms), merkki jää.
        /// Taso 1 ei häivy muiden nimiöiden tieltä, vain nimien ja reunan (web sovittelu.js sääntö 4). Hystereesi 6 px.
        /// </summary>
        void Sovita(int n)
        {
            float W = juuri.layout.width, H = juuri.layout.height;
            if (n == 0) lukot.Clear();
            if (n == 0 || float.IsNaN(W) || W <= 0) return;
            var jono = new List<Merkki>(n);
            for (int i = 0; i < n; i++) if (merkit[i].Nimio.text.Length > 0) jono.Add(merkit[i]);
            // Web sovittelu.js jono: levossa lukittu näkyvä (0) ennen eleen aikana tullutta (1) ennen lukotonta (2),
            // sitten paino — tulokas väistää, ruudulla jo ollut ei.
            int Ika(Merkki mm) => mm.Id != null && lukot.TryGetValue(mm.Id, out var l) && l.Nakyy ? (l.Ele ? 1 : 0) : 2;
            jono.Sort((a, b) => { int d = Ika(a).CompareTo(Ika(b)); return d != 0 ? d : a.Paino.CompareTo(b.Paino); });
            var ikonit = new List<Rect>(n);
            for (int i = 0; i < n; i++)
            {
                var m = merkit[i];
                float r = m.Ruutu * m.Mitta;
                ikonit.Add(new Rect(m.Piste.x - r, m.Piste.y - r, 2f * r, 2f * r));
            }
            var varatut = new List<Rect>(jono.Count);
            var uudet = new Dictionary<string, Lukko>(jono.Count);
            LueNimet();
            bool Musteeton(Rect a) { foreach (var e in nimet) if (e.Overlaps(a)) return false; return true; }
            foreach (var m in jono)
            {
                string loytyi = null;
                Rect paikka = default;
                bool Vapaa(Rect r, float vara)
                {
                    var a = new Rect(r.x + m.Piste.x - vara, r.y + m.Piste.y - vara, r.width + 2f * vara, r.height + 2f * vara);
                    if (a.xMin < 0 || a.yMin < 0 || a.xMax > W || a.yMax > H) return false;
                    if (!Musteeton(a)) return false;
                    foreach (var v in varatut) if (v.Overlaps(a)) return false;
                    if (!m.Kiintea)
                        for (int i = 0; i < n; i++)
                            if (merkit[i] != m && ikonit[i].Overlaps(a)) return false;
                    paikka = a;
                    return true;
                }
                // Löydös 106 (web sovittelu.js sääntö 5): lukittu nimiö, jonka laatikko on ruudulla, kokeilee vain
                // lukittua kylkeään. Reunaa ei koeteta (nimi saa leikkautua); tukossa nimiö häipyy paikallaan ja
                // palaa samaan kylkeen hystereesillä — ei koskaan merkin toiselle puolelle.
                if (m.Id != null && lukot.TryGetValue(m.Id, out var lukko))
                {
                    var r0 = NimionLaatikko(m, lukko.Kylki);
                    var a0 = new Rect(r0.x + m.Piste.x, r0.y + m.Piste.y, r0.width, r0.height);
                    if (a0.xMax > -NakyvyysVara && a0.yMax > -NakyvyysVara && a0.xMin < W + NakyvyysVara && a0.yMin < H + NakyvyysVara)
                    {
                        float v = lukko.Nakyy ? 0f : Hystereesi;
                        var av = new Rect(a0.x - v, a0.y - v, a0.width + 2f * v, a0.height + 2f * v);
                        bool vapaa = Musteeton(av);
                        foreach (var e in varatut) if (vapaa && e.Overlaps(av)) vapaa = false;
                        if (vapaa && !m.Kiintea)
                            for (int i = 0; i < n && vapaa; i++) if (merkit[i] != m && ikonit[i].Overlaps(av)) vapaa = false;
                        m.Kylki = lukko.Kylki;
                        m.NimioNakyy = vapaa;
                        if (vapaa) { varatut.Add(a0); AsetaNimio(m); }
                        m.Nimio.style.opacity = vapaa ? 1f : 0f;
                        AsetaNimionOsuma(m);
                        uudet[m.Id] = new Lukko { Kylki = m.Kylki, Nakyy = vapaa };
                        continue;
                    }
                }
                float vara0 = m.NimioNakyy ? 0f : Hystereesi;
                var ehdokkaat = new List<string>(10);
                if (m.NimioNakyy && m.Kylki != null) ehdokkaat.Add(m.Kylki);
                string datasta = DatanKylki(m.Id != null ? LoydaNosto(m.Id) : null);
                if (datasta != null && !ehdokkaat.Contains(datasta)) ehdokkaat.Add(datasta);
                foreach (var ky in Kyljet) if (!ehdokkaat.Contains(ky)) ehdokkaat.Add(ky);
                foreach (var ky in ehdokkaat)
                    if (Vapaa(NimionLaatikko(m, ky), vara0)) { loytyi = ky; break; }
                // Taso 1 ei häivy muiden lappujen tieltä (sovittelu.js sääntö 4): ensimmäinen reunan sisällä oleva
                // nimistä vapaa ehdokas (nykyinen kylki ensin); jos sellaista ei ole, nimiö häipyy ja ikoni jää.
                if (loytyi == null && m.Taso1)
                    foreach (var ky in ehdokkaat)
                    {
                        var r = NimionLaatikko(m, ky);
                        var a = new Rect(r.x + m.Piste.x, r.y + m.Piste.y, r.width, r.height);
                        if (a.xMin < 0 || a.yMin < 0 || a.xMax > W || a.yMax > H || !Musteeton(a)) continue;
                        loytyi = ky;
                        paikka = default;
                        break;
                    }
                m.NimioNakyy = loytyi != null;
                if (loytyi != null)
                {
                    m.Kylki = loytyi;
                    if (paikka.width > 0) varatut.Add(paikka);
                    AsetaNimio(m);
                }
                m.Nimio.style.opacity = m.NimioNakyy ? 1f : 0f;
                AsetaNimionOsuma(m);
                if (m.Id != null) uudet[m.Id] = new Lukko { Kylki = m.Kylki ?? loytyi ?? "oikea", Nakyy = m.NimioNakyy };
            }
            // Lukko kantaa seuraavaan lepoon; näkyvistä poistuneiden nostojen lukot vapautuvat (web tulos.asennot).
            lukot.Clear();
            foreach (var kv in uudet) lukot[kv.Key] = kv.Value;
        }

        NostoKerros.Nosto LoydaNosto(string id)
        {
            if (lahde == null) return null;
            foreach (var s in lahde.Naytettavat) if (s.Id == id) return s;
            return null;
        }

        /// <summary>Nimiö kylkeensä: laatikko merkin keskipisteen suhteen (El:n vasen ylä = keskipiste − ruutu).</summary>
        static void AsetaNimio(Merkki m)
        {
            var r = NimionLaatikko(m, m.Kylki ?? "oikea");
            float puoli = m.Ruutu * m.Mitta;
            m.Nimio.style.left = Mathf.Round(r.x + puoli);
            m.Nimio.style.top = Mathf.Round(r.y + puoli);
        }

        /// <summary>
        /// Web ryhmitaNostot: union-find saman aiheen nostoille; yhdistää, kun nimiölaatikot leikkaavat (vara 1 px)
        /// tai pisteet ovat 44 px:n sisällä, ja saman kaupungin nostot aina. Palauttaa indeksikasat.
        /// </summary>
        List<List<int>> Ryhmita(IReadOnlyList<NostoKerros.Nosto> lista, Vector2[] p)
        {
            int n = lista.Count;
            var isa = new int[n];
            var laatikot = new Rect[n];
            for (int i = 0; i < n; i++) { isa[i] = i; laatikot[i] = Laatikko(lista[i], p[i]); }
            int Juuri(int i) { while (isa[i] != i) { isa[i] = isa[isa[i]]; i = isa[i]; } return i; }
            for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
            {
                if (lista[i].Aihe != lista[j].Aihe) continue;
                bool samaKaupunki = !string.IsNullOrEmpty(lista[i].KaupunkiAvain) && lista[i].KaupunkiAvain == lista[j].KaupunkiAvain;
                var a = laatikot[i];
                var b = laatikot[j];
                bool osuu = a.xMin - RyhmitysVara < b.xMax && b.xMin - RyhmitysVara < a.xMax
                    && a.yMin - RyhmitysVara < b.yMax && b.yMin - RyhmitysVara < a.yMax;
                if (samaKaupunki || osuu || (p[i] - p[j]).sqrMagnitude <= RyhmitysPx * RyhmitysPx) isa[Juuri(i)] = Juuri(j);
            }
            var kasat = new Dictionary<int, List<int>>();
            var jarjestys = new List<List<int>>();
            for (int i = 0; i < n; i++)
            {
                int r = Juuri(i);
                if (!kasat.TryGetValue(r, out var kasa)) { kasat[r] = kasa = new List<int>(); jarjestys.Add(kasa); }
                kasa.Add(i);
            }
            return jarjestys;
        }

        /// <summary>Merkin muste: symboli 20 × 20 pisteen ympärillä ja nimiö oikealla (arvio 0,55 em / merkki).</summary>
        static Rect Laatikko(NostoKerros.Nosto s, Vector2 p)
        {
            float koko = 11f;
            float leveys = 12f + (string.IsNullOrEmpty(s.Nimio) ? 0f : 2f + s.Nimio.Length * koko * 0.55f);
            return new Rect(p.x - 10f, p.y - 10f, 10f + leveys, 20f);
        }

        /// <summary>Web aihenostonNimio: tärkeimmän noston nimi (lyhennys 18 merkkiin) ja "…".</summary>
        static string RyhmanNimio(string nimi)
        {
            if (string.IsNullOrEmpty(nimi)) return "";
            string runko = nimi.Length > 18 ? nimi.Substring(0, 18) : nimi;
            runko = runko.TrimEnd('.', ' ');
            return runko.Length > 0 ? runko + "…" : "";
        }

        static string RyhmanAvain(List<NostoKerros.Nosto> ryhma)
        {
            var idt = new List<string>(ryhma.Count);
            foreach (var r in ryhma) idt.Add(r.Id);
            idt.Sort(System.StringComparer.Ordinal);
            return string.Join("|", idt);
        }

        void Napautus(Merkki m)
        {
            if (vainNimet) return;
            if (m.Ryhma == null) { if (m.Id != null) { SuljeViuhka(); UiPalvelut.IlmoitaValo(m.Id); } return; }
            string avain = RyhmanAvain(m.Ryhma);
            if (avain == viuhkanAvain) { SuljeViuhka(); return; }
            AvaaViuhka(m, avain);
        }

        /// <summary>Web viuhkanAsemat (yksinkertaistettu): tyhjempi kylki, rivit 30 px välein keskitettynä merkkiin, ruudun sisällä.</summary>
        void AvaaViuhka(Merkki m, string avain)
        {
            viuhkanAvain = avain;
            viuhkanPiste = m.Piste;
            viuhka.Clear();
            var pohja = Rakenne.El("mk-nosto-viuhka__pohja", viuhka, PickingMode.Ignore);
            foreach (var s in m.Ryhma)
            {
                var rivi = Rakenne.El("mk-nosto-viuhka__rivi", pohja);
                string id = s.Id;
                rivi.RegisterCallback<ClickEvent>(e => { e.StopPropagation(); SuljeViuhka(); UiPalvelut.IlmoitaValo(id); });
                rivi.Add(Symboli(s));
                var nimi = Rakenne.Teksti(s.Nimio ?? s.Nimi ?? "", "mk-nosto-viuhka__nimi", rivi);
                nimi.enableRichText = false;
                nimi.pickingMode = PickingMode.Ignore;
                Kirjasimet.Aseta(nimi, Kirjasin.LukuKursiivi);
            }
            float leveys = juuri.layout.width, korkeus = juuri.layout.height;
            bool vasen = m.Piste.x > leveys * 0.5f; // tyhjempi puoli: poispäin ruudun keskeltä
            float listanKorkeus = m.Ryhma.Count * ViuhkaVali;
            float y = Mathf.Clamp(m.Piste.y - listanKorkeus * 0.5f, ViuhkaReuna, Mathf.Max(ViuhkaReuna, korkeus - ViuhkaReuna - listanKorkeus));
            viuhka.style.top = y;
            viuhka.style.left = vasen ? StyleKeyword.Auto : m.Piste.x + ViuhkaSivuun - 10f;
            viuhka.style.right = vasen ? leveys - m.Piste.x + ViuhkaSivuun - 10f : StyleKeyword.Auto;
            viuhka.EnableInClassList("mk-nosto-viuhka--vasen", vasen);
            viuhka.style.display = DisplayStyle.Flex;
            viuhka.BringToFront();
        }

        void SuljeViuhka()
        {
            if (viuhkanAvain == null) return;
            viuhkanAvain = null;
            viuhka.style.display = DisplayStyle.None;
            viuhka.Clear();
        }

        /// <summary>Kartan napautus viuhkan ja merkkien ohi sulkee listan (web napautaPintaan).</summary>
        void SuljeOhiNapautuksesta()
        {
            if (viuhkanAvain == null || juuri.panel == null) return;
            var osoitin = UnityEngine.InputSystem.Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame) return;
            var ruutu = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (viuhka.worldBound.Contains(p)) return;
            foreach (var m in merkit)
                if (m.El.resolvedStyle.display == DisplayStyle.Flex
                    && (m.El.worldBound.Contains(p) || m.Nimio.pickingMode == PickingMode.Position && m.Nimio.worldBound.Contains(p))) return;
            SuljeViuhka();
        }

        /// <summary>
        /// LÖYDÖS 93 (omistaja build 13): nosto aukeaa myös nimiöstä, ei vain 11 px:n symbolista. Näkyvä nimiö ottaa
        /// osuman ja ClickEvent kuplii merkkiin (Napautus); piilotettu (kylki ei mahtunut, opasiteetti 0) ja linssinimet
        /// eivät ota, jotta näkymätön teksti ei varasta kartan napautuksia.
        /// </summary>
        void AsetaNimionOsuma(Merkki m) =>
            m.Nimio.pickingMode = !vainNimet && m.NimioNakyy ? PickingMode.Position : PickingMode.Ignore;

        /// <summary>Uusiokäyttö: i:s merkki tälle nostolle (symboli ja nimiö vaihdetaan vain tarvittaessa).</summary>
        Merkki Hae(int i, NostoKerros.Nosto s, string nimio = null, bool ryhma = false, float kerroin = 1f)
        {
            while (merkit.Count <= i)
            {
                var uusi = new Merkki { El = Rakenne.El("mk-nosto-merkki", juuri) };
                var m0 = uusi;
                uusi.El.RegisterCallback<ClickEvent>(_ => Napautus(m0));
                if (vainNimet) uusi.El.pickingMode = PickingMode.Ignore;
                uusi.Nimio = Rakenne.Teksti("", "mk-nosto-merkki__nimio", uusi.El);
                uusi.Nimio.pickingMode = PickingMode.Ignore;
                uusi.Nimio.enableRichText = false;
                Kirjasimet.Aseta(uusi.Nimio, Kirjasin.Atlas);
                merkit.Add(uusi);
            }
            var m = merkit[i];
            m.El.style.display = DisplayStyle.Flex;
            if (m.Id != s.Id)
            {
                // Löydös 106: kylki noston lukosta, muuten datan kylki (web r.puoli ?? 'oikea'). Ennen Kylki = null
                // → AsetaNimio "oikea" koko vedon ajan ja levossa Sovita takaisin datan kylkeen = loikka.
                if (s.Id != null && lukot.TryGetValue(s.Id, out var lk)) { m.Kylki = lk.Kylki; m.NimioNakyy = lk.Nakyy; }
                else
                {
                    m.Kylki = DatanKylki(s) ?? "oikea";
                    m.NimioNakyy = true;
                    // Eleen aikana tullut lukitaan omaan kylkeensä (web sovittele !lepo, syy 'ele').
                    if (s.Id != null && lepoKierto != null && !lepoKierto.Levossa)
                        lukot[s.Id] = new Lukko { Kylki = m.Kylki, Nakyy = true, Ele = true };
                }
                m.Nimio.style.opacity = m.NimioNakyy ? 1f : 0f;
                AsetaNimionOsuma(m);
            }
            m.Id = s.Id;
            if (s.Id != null && m.NimioNakyy && lepoKierto != null && !lepoKierto.Levossa)
            {
                if (vetoKyljet.TryGetValue(s.Id, out var ed) && ed != m.Kylki) kylkivaihdot++;
                vetoKyljet[s.Id] = m.Kylki;
            }
            // Mitoitus (web nostot.js:633): mitta = min(katto / 11, 0,7727 × kerroin × oma). Kaupunkimerkki lajista
            // (web datumin kaupunki = kohde.tyyppi 'kaupunki', löydös 125), ilman lajia aiheesta kuten ennen.
            bool kaupunki = s.Kaupunkimerkki;
            m.Taso1 = s.Taso == 1 && !ryhma;
            float oma = kaupunki ? KaupunginKerroin : m.Taso1 ? Taso1Kerroin : 1f;
            // Elävä kartta, kohta 2: kokoluokka (ei kaupunkimerkkeihin eikä ryhmiin).
            if (!kaupunki && !ryhma) oma *= LuokanKerroin(s.Luokka);
            bool loydetty = ryhma || s.Loydetty;
            m.Mitta = Mathf.Min(NimionKatto(kerroin) / NimioK, NostonMitta * kerroin * oma);
            bool kuvamerkki = !ryhma && loydetty && Kuva(s) != null && NostoSaannot.KuvamerkkiKaytossa(s.Taso, kerroin);
            m.Ruutu = MiniRuutu * (m.Taso1 && kuvamerkki ? KuvamerkinKerroin : 1f);
            m.Kiintea = kaupunki || m.Taso1;
            // Symboli vaihdetaan, kun aihe, kuvamerkki tai minimerkki (luonnossa vuori vai aalto) vaihtuu.
            string tyyppi = ryhma ? "ryhma|" + s.Aihe : (s.Aihe ?? "") + "|" + (kuvamerkki ? Kuva(s) : s.Minimerkki);
            if (tyyppi != m.Tyyppi)
            {
                m.Tyyppi = tyyppi;
                m.Symboli?.RemoveFromHierarchy();
                m.Symboli = ryhma ? RyhmaSymboli(s) : Symboli(s, kuvamerkki);
                if (m.Symboli.ClassListContains("mk-nosto-merkki__symboli--piste") && sykeNyt != 1f)
                    m.Symboli.style.scale = new Scale(new Vector3(sykeNyt, sykeNyt, 1f));
                m.El.Insert(0, m.Symboli);
            }
            // Merkin laatikko = ikoniruutu keskipisteen ympärillä; kuviot (16 yksikköä) keskelle.
            float ruutuPx = 2f * m.Ruutu * m.Mitta, kuvioPx = 16f * m.Mitta;
            m.El.style.width = ruutuPx;
            m.El.style.height = ruutuPx;
            m.El.style.marginLeft = m.El.style.marginTop = -ruutuPx / 2f;
            foreach (var kv in m.Symboli.Children())
            {
                if (!kv.ClassListContains("mk-nosto-merkki__kuvio")) continue;
                kv.style.width = kv.style.height = kuvioPx;
                kv.style.left = kv.style.top = (ruutuPx - kuvioPx) / 2f;
            }
            // Meren nimiö (web NOSTOSYM_NIMIO_ASUT.meri): lyhennys, sitten versaali ja harvennus 0,28 em.
            bool meri = !ryhma && NostoSaannot.OnMerenNimio(s.Laji);
            string nimi = loydetty ? nimio ?? Lyhenna(s.Nimio ?? "") : ""; // löytämätön ilman nimeä
            AsetaMuste(m, s, loydetty, ryhma, ruutuPx);
            if (meri) nimi = nimi.ToUpperInvariant();
            if (m.Nimio.text != nimi) m.Nimio.text = nimi;
            m.Nimio.style.display = nimi.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            float fs = NimioK * m.Mitta;
            if (!Mathf.Approximately(m.Nimio.resolvedStyle.fontSize, fs)) m.Nimio.style.fontSize = fs;
            // UI Toolkitin letter-spacing on em/100 (tyokalut/kirjainvali.py): webin 0,28 em = 28 kaikilla fonttikoilla.
            float harvennus = meri ? (float)(NostoSaannot.MerenHarvennus * 100.0) : 0f;
            if (!Mathf.Approximately(m.Harvennus, harvennus)) { m.Harvennus = harvennus; m.Nimio.style.letterSpacing = harvennus; }
            m.Nimio.EnableInClassList("mk-nosto-merkki__nimio--taso1", m.Taso1 && !meri);
            m.Nimio.EnableInClassList("mk-nosto-merkki__nimio--meri", meri);
            AsetaMuste(m, meri ? MerenMuste : m.Taso1 ? Taso1Muste : NimionMuste);
            m.NimioKoko = nimi.Length > 0
                ? m.Nimio.MeasureTextSize(nimi, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined)
                : Vector2.zero;
            // Web painoarvo (sovittelu.js:146): luokka × 1000 + nimen pituus.
            m.Paino = (kaupunki ? 0 : m.Taso1 ? 1 : s.Taso >= 3 ? 3 : 2) * 1000f + nimi.Length;
            AsetaNimio(m);
            return m;
        }

        /// <summary>
        /// Tyyppimerkin kuva (web nostosymKuvamerkki, löydös 125): lajin merkki ensin (saari, järvi, joki, meri, ruoka,
        /// tekniikka …), sitten kategorian; datan ilman lajia luonto saa vuoren merkin (NostoSaannot.Kuvamerkki).
        /// </summary>
        static string Kuva(NostoKerros.Nosto s) => NostoSaannot.Kuvamerkki(s.Kategoria, s.Laji);

        /// <summary>Web piirraAihemerkki: paperilevy, aiheväri puoliksi läpi ja musterengas, r 3,4 (ei sisäsymbolia).</summary>
        VisualElement RyhmaSymboli(NostoKerros.Nosto s)
        {
            var alue = new VisualElement { pickingMode = PickingMode.Ignore };
            alue.AddToClassList("mk-nosto-merkki__symboli");
            alue.AddToClassList("mk-nosto-merkki__symboli--ryhma");
            if (s.Aihe == null || !rivit.TryGetValue(s.Aihe, out var r)) r = rivit["kaupungit"];
            SvgIkoni Levy(string luokka, bool tayta)
            {
                var levy = new SvgIkoni(NostoMerkit.PisteTaytto) { Ruutu = 16, Alku = new Vector2(-8, -8), pickingMode = PickingMode.Ignore };
                if (tayta) levy.AddToClassList("mk-ikoni--tayta");
                levy.AddToClassList("mk-nosto-merkki__kuvio");
                levy.AddToClassList(luokka);
                alue.Add(levy);
                return levy;
            }
            Levy("mk-nosto-merkki__levy-pohja", true);
            Levy("mk-nosto-merkki__levy-vari", true).style.color = Kuviot.Vari(r.Vari ?? "#8a6d4a");
            Levy("mk-nosto-merkki__levy-keha", false);
            return alue;
        }

        /// <summary>
        /// Web (piirraNostosymMiniCanvas, löydös 125): kuvamerkki (kuvamerkki = true ja tyypillä merkki) koko ruutuun;
        /// pistemerkki (NostoSaannot.OnPistemerkki) harmaana hehkupisteenä — häive 2,1 r ja vaalea sisus yhtenä kuvana
        /// (NostoHehku) — ja musterenkaana päällä; viivamerkki (NostoSaannot.MiniTunnus: vuori, aalto, salama, tassu,
        /// ruusu) rungon ja ohuen vedon musteella rgba(58, 40, 25, 0,86 / 0,52). Aiheväri vain karttaselitteen valossa.
        /// </summary>
        VisualElement Symboli(NostoKerros.Nosto s, bool kuvamerkki = true)
        {
            var alue = new VisualElement { pickingMode = PickingMode.Ignore };
            alue.AddToClassList("mk-nosto-merkki__symboli");
            string kuva = kuvamerkki ? Kuva(s) : null;
            if (kuva != null)
            {
                alue.AddToClassList("mk-nosto-merkki__symboli--kuva");
                Kuvat.Hae(NostoMerkit.KuvaJuuri + kuva, t => { if (t != null) alue.style.backgroundImage = new StyleBackground(t); });
                return alue;
            }
            string tunnus = s.Minimerkki;
            bool piste = NostoSaannot.OnPistemerkki(tunnus) || !NostoMerkit.Viivamerkit.ContainsKey(tunnus);
            alue.EnableInClassList("mk-nosto-merkki__symboli--piste", piste);
            if (piste)
            {
                var hehku = new VisualElement { pickingMode = PickingMode.Ignore };
                hehku.AddToClassList("mk-nosto-merkki__kuvio");
                hehku.AddToClassList("mk-nosto-merkki__hehku");
                hehku.style.backgroundImage = new StyleBackground(NostoHehku.Kuva);
                alue.Add(hehku);
                alue.Add(Kuvio(NostoMerkit.PisteRengas, "mk-nosto-merkki__rengas"));
                return alue;
            }
            var (vahva, ohut) = NostoMerkit.Viivamerkit[tunnus];
            if (ohut != null) alue.Add(Kuvio(ohut, "mk-nosto-merkki__vektori-ohut"));
            alue.Add(Kuvio(vahva, "mk-nosto-merkki__vektori"));
            return alue;
        }

        /// <summary>Minimerkin kuvio (viewBox −8 −8 16 16, täyttö), Hae asettaa koon ja paikan (mk-nosto-merkki__kuvio).</summary>
        static SvgIkoni Kuvio(string polku, string luokka)
        {
            var k = new SvgIkoni(polku) { Ruutu = 16, Alku = new Vector2(-8, -8), pickingMode = PickingMode.Ignore };
            k.AddToClassList("mk-ikoni--tayta");
            k.AddToClassList("mk-nosto-merkki__kuvio");
            k.AddToClassList(luokka);
            return k;
        }
    }
}
