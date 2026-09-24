// NOSTOT KARTALLA (Natiivi-UI, build 6 -löydös 1): webin pallon nostokerroksen merkit
// (js/pallolauta/nostot.js, js/fokusnosto-symbolit.js) Natiivisepän NostoKerroksen tiedoilla
// (RAJAPINTA.md luku 3c). Kartta päättää, mitkä nostot näkyvät ja missä (Naytettavat, Ruutu);
// tämä piirtää merkin, nimiön ja syttymisen ja avaa kortin napautuksesta.
//
//   ● Thessaloniki        kaupungit ja hetket: piste r 3,4 aihevärillä ja musterengas
//   ✦ Olympos            ihmeet, skandaalit, eläimet: kynäsymboli (NostoMerkit) aihevärillä
//   [kuva] Delfoi         historia, luonto, kulttuuri, kauppa: tyyppimerkki (merkki-*.png)
//
// LÖYDÖS 50 (25.9.2026, web-nostot-kartalla-mitat.txt): mitta = min(katto / 11, 0,7727 × zoomikerroin × oma),
// oma 1,353 kaupungeilla ja 1,3 tasolla 1; katto 16 px, kertoimesta 2 kertoimeen 4 log2-lineaarisesti 22 px:iin.
// Merkki: kuvamerkki vain tasolla 1 (1,6-kertainen ruutu) tai kertoimesta 4; muuten pisteperheet harmaana kiekkona
// (#6f6a61, r 3,4) ja muut vektorina musteella. Nimiö Liberation Serif kursiivi 11 × mitta, ilman haloa, lyhennys
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
        }

        /// <summary>Koelippu (web ?aihemerkit=1): saman aiheen nostot ryhmämerkeiksi. Oletus pois (PAATOKSET 34/17 b).</summary>
        public static bool Aihemerkit
        {
            get => PlayerPrefs.GetInt("matkakirja-aihemerkit", 0) == 1;
            set { PlayerPrefs.SetInt("matkakirja-aihemerkit", value ? 1 : 0); PlayerPrefs.Save(); }
        }

        // Web js/pallolauta/nostot.js:398 NOSTON_MITTA (8,5 / 11), fokusnosto-symbolit.js NOSTOSYM_NIMIO_KOKO 11,
        // NOSTOSYM_MINI_RUUTU 7,4, NOSTOSYM_PISTE_R 3,4, NOSTOSYM_NIMIO_X 8,9, NOSTOSYM_NIMIO_Y 0,36 × 11,
        // NOSTOSYM_KUVAMERKIN_KERROIN 1,6, NOSTON_TASO1_KERROIN 1,3, kaupunki 11,5 / 8,5, NOSTOJEN_TYYPPIMERKIN_KERROIN 4.
        const float NostonMitta = 8.5f / 11f, NimioK = 11f, MiniRuutu = 7.4f, NimioX = 8.9f, NimioY = 0.36f * 11f,
            KuvamerkinKerroin = 1.6f, Taso1Kerroin = 1.3f, KaupunginKerroin = 11.5f / 8.5f, TyyppimerkinKerroin = 4f,
            NimioMerkkeja = 18f, Nousu = 0.891f, Hystereesi = 6f;
        static readonly string[] Kyljet = { "oikea", "vasen", "yla", "ala", "koillinen", "kaakko", "luode", "lounas" };

        /// <summary>
        /// Web kerroin = saapumisnäkymän kameran korkeus / nykyinen (min 0,2). Natiiviseppä lisää NostoKerros.ZoomKerroin;
        /// siihen asti Osuus suhteessa maan syttymishetken osuuteen.
        /// </summary>
        float ZoomKerroin(NostoKerros k)
        {
            // Saapumisnäkymä = maan kerroksen syttymishetki: sen osuus on kerroin 1 (b12q: kiinteä 0,92 antoi natiivin
            // läheisessä saapumisnäkymässä kertoimen ~3 ja nimiöt 16–22 px, web 8,5).
            if (k.NykyinenMaa != saapumisMaa || osuus0 <= 0f) { saapumisMaa = k.NykyinenMaa; osuus0 = k.Osuus; }
            return Mathf.Max(0.2f, osuus0 > 0f ? k.Osuus / osuus0 : 1f);
        }
        string saapumisMaa;
        float osuus0;

        /// <summary>Datan nimiön kylki (Siirtoseppä, skeema 1.39 karttavalot puoli). Natiiviseppä lisää Nosto.Puoli.</summary>
        static string DatanKylki(NostoKerros.Nosto s) => null;

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
        }

        /// <summary>Linssi päällä tai muu koko ruudun näkymä: merkit piiloon.</summary>
        public void NaytaSallittu(bool sallitaan)
        {
            sallittu = sallitaan;
            Paivita();
        }

        void Kytke()
        {
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

        /// <summary>Kamera pysähtyi: merkit pyöristetyille pikseleille (liikkeen aikana ne kulkevat pyöristämättä).</summary>
        void Lepo(bool levossa) { if (levossa) Paivita(); }

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
                foreach (var mk in merkit) mk.El.pickingMode = vainNimet ? PickingMode.Ignore : PickingMode.Position;
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
        /// esteet = jo sijoitetut nimiöt, muiden merkkien ikonit (kaupunki ja taso 1 ohittavat ikonit) ja paneelin
        /// reunat; ensin nykyinen kylki (näkyvä nimiö ei vaihda kylkeä), sitten datan kylki ja webin järjestys.
        /// Ei vapaata → nimiö häipyy (180 ms), merkki jää. Hystereesi 6 px piilotetulle.
        /// </summary>
        void Sovita(int n)
        {
            float W = juuri.layout.width, H = juuri.layout.height;
            if (n == 0 || float.IsNaN(W) || W <= 0) return;
            var jono = new List<Merkki>(n);
            for (int i = 0; i < n; i++) if (merkit[i].Nimio.text.Length > 0) jono.Add(merkit[i]);
            jono.Sort((a, b) => a.Paino.CompareTo(b.Paino));
            var ikonit = new List<Rect>(n);
            for (int i = 0; i < n; i++)
            {
                var m = merkit[i];
                float r = m.Ruutu * m.Mitta;
                ikonit.Add(new Rect(m.Piste.x - r, m.Piste.y - r, 2f * r, 2f * r));
            }
            var varatut = new List<Rect>(jono.Count);
            foreach (var m in jono)
            {
                string loytyi = null;
                Rect paikka = default;
                bool Vapaa(Rect r, float vara)
                {
                    var a = new Rect(r.x + m.Piste.x - vara, r.y + m.Piste.y - vara, r.width + 2f * vara, r.height + 2f * vara);
                    if (a.xMin < 0 || a.yMin < 0 || a.xMax > W || a.yMax > H) return false;
                    foreach (var v in varatut) if (v.Overlaps(a)) return false;
                    if (!m.Kiintea)
                        for (int i = 0; i < n; i++)
                            if (merkit[i] != m && ikonit[i].Overlaps(a)) return false;
                    paikka = a;
                    return true;
                }
                float vara0 = m.NimioNakyy ? 0f : Hystereesi;
                var ehdokkaat = new List<string>(10);
                if (m.NimioNakyy && m.Kylki != null) ehdokkaat.Add(m.Kylki);
                string datasta = DatanKylki(m.Id != null ? LoydaNosto(m.Id) : null);
                if (datasta != null && !ehdokkaat.Contains(datasta)) ehdokkaat.Add(datasta);
                foreach (var ky in Kyljet) if (!ehdokkaat.Contains(ky)) ehdokkaat.Add(ky);
                foreach (var ky in ehdokkaat)
                    if (Vapaa(NimionLaatikko(m, ky), vara0)) { loytyi = ky; break; }
                // Taso 1 ei häivy muiden lappujen tieltä (sovittelu.js:311): pitää kylkensä.
                if (loytyi == null && m.Taso1) { loytyi = m.Kylki ?? datasta ?? "oikea"; paikka = default; }
                m.NimioNakyy = loytyi != null;
                if (loytyi != null)
                {
                    m.Kylki = loytyi;
                    if (paikka.width > 0) varatut.Add(paikka);
                    AsetaNimio(m);
                }
                m.Nimio.style.opacity = m.NimioNakyy ? 1f : 0f;
            }
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
            foreach (var m in merkit) if (m.El.resolvedStyle.display == DisplayStyle.Flex && m.El.worldBound.Contains(p)) return;
            SuljeViuhka();
        }

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
            if (m.Id != s.Id) { m.Kylki = null; m.NimioNakyy = true; }
            m.Id = s.Id;
            // Mitoitus (web nostot.js:633): mitta = min(katto / 11, 0,7727 × kerroin × oma).
            bool kaupunki = s.Aihe == "kaupungit";
            m.Taso1 = s.Taso == 1 && !ryhma;
            float oma = kaupunki ? KaupunginKerroin : m.Taso1 ? Taso1Kerroin : 1f;
            m.Mitta = Mathf.Min(NimionKatto(kerroin) / NimioK, NostonMitta * kerroin * oma);
            bool kuvamerkki = !ryhma && Kuva(s) != null && (m.Taso1 || kerroin >= TyyppimerkinKerroin);
            m.Ruutu = MiniRuutu * (m.Taso1 && kuvamerkki ? KuvamerkinKerroin : 1f);
            m.Kiintea = kaupunki || m.Taso1;
            string tyyppi = ryhma ? "ryhma|" + s.Aihe : (s.Aihe ?? "") + "|" + (kuvamerkki ? Kuva(s) : "-");
            if (tyyppi != m.Tyyppi)
            {
                m.Tyyppi = tyyppi;
                m.Symboli?.RemoveFromHierarchy();
                m.Symboli = ryhma ? RyhmaSymboli(s) : Symboli(s, kuvamerkki);
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
            string nimi = nimio ?? Lyhenna(s.Nimio ?? "");
            if (m.Nimio.text != nimi) m.Nimio.text = nimi;
            m.Nimio.style.display = nimi.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            float fs = NimioK * m.Mitta;
            if (!Mathf.Approximately(m.Nimio.resolvedStyle.fontSize, fs)) m.Nimio.style.fontSize = fs;
            m.Nimio.EnableInClassList("mk-nosto-merkki__nimio--taso1", m.Taso1);
            m.NimioKoko = nimi.Length > 0
                ? m.Nimio.MeasureTextSize(nimi, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined)
                : Vector2.zero;
            // Web painoarvo (sovittelu.js:146): luokka × 1000 + nimen pituus.
            m.Paino = (kaupunki ? 0 : m.Taso1 ? 1 : s.Taso >= 3 ? 3 : 2) * 1000f + nimi.Length;
            AsetaNimio(m);
            return m;
        }

        /// <summary>
        /// Tyyppimerkin kuva aiheen rivistä (webin KARTTASELITE_MERKIT): kategorian oma merkki, jos sellainen on
        /// (ruoka, tekniikka, merenkulku, meri), muuten aiheen ensimmäinen.
        /// </summary>
        string Kuva(NostoKerros.Nosto s)
        {
            if (s.Aihe == null || !rivit.TryGetValue(s.Aihe, out var r) || r.Kuvat.Length == 0) return null;
            foreach (var k in r.Kuvat)
                if (s.Kategoria != null && k == "merkki-" + s.Kategoria + ".png") return k;
            return r.Kuvat[0];
        }

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
        /// Web: kuvamerkki (kuvamerkki = true) koko ruutuun; pisteperheet harmaana kiekkona #6f6a61 ja musterenkaalla
        /// (aiheväri vain karttaselitteen valossa); vektorit musteella rgba(58, 40, 25, 0,86).
        /// </summary>
        VisualElement Symboli(NostoKerros.Nosto s, bool kuvamerkki = true)
        {
            var alue = new VisualElement { pickingMode = PickingMode.Ignore };
            alue.AddToClassList("mk-nosto-merkki__symboli");
            if (s.Aihe == null || !rivit.TryGetValue(s.Aihe, out var r)) r = rivit["kaupungit"];
            string kuva = kuvamerkki ? Kuva(s) : null;
            if (kuva != null)
            {
                alue.AddToClassList("mk-nosto-merkki__symboli--kuva");
                Kuvat.Hae(NostoMerkit.KuvaJuuri + kuva, t => { if (t != null) alue.style.backgroundImage = new StyleBackground(t); });
                return alue;
            }
            bool piste = r.Piste || r.Vektori == null;
            alue.EnableInClassList("mk-nosto-merkki__symboli--piste", piste);
            var taytto = new SvgIkoni(piste ? NostoMerkit.PisteTaytto : r.Vektori) { Ruutu = 16, Alku = new Vector2(-8, -8), pickingMode = PickingMode.Ignore };
            taytto.AddToClassList("mk-ikoni--tayta");
            taytto.AddToClassList("mk-nosto-merkki__kuvio");
            taytto.AddToClassList(piste ? "mk-nosto-merkki__kiekko" : "mk-nosto-merkki__vektori");
            alue.Add(taytto);
            if (piste)
            {
                var rengas = new SvgIkoni(NostoMerkit.PisteRengas) { Ruutu = 16, Alku = new Vector2(-8, -8), pickingMode = PickingMode.Ignore };
                rengas.AddToClassList("mk-ikoni--tayta");
                rengas.AddToClassList("mk-nosto-merkki__kuvio");
                rengas.AddToClassList("mk-nosto-merkki__rengas");
                alue.Add(rengas);
            }
            return alue;
        }
    }
}
