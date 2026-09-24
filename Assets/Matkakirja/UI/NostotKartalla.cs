// NOSTOT KARTALLA (Natiivi-UI, build 6 -löydös 1): webin pallon nostokerroksen merkit
// (js/pallolauta/nostot.js, js/fokusnosto-symbolit.js) Natiivisepän NostoKerroksen tiedoilla
// (RAJAPINTA.md luku 3c). Kartta päättää, mitkä nostot näkyvät ja missä (Naytettavat, Ruutu);
// tämä piirtää merkin, nimiön ja syttymisen ja avaa kortin napautuksesta.
//
//   ● Thessaloniki        kaupungit ja hetket: piste r 3,4 aihevärillä ja musterengas
//   ✦ Olympos            ihmeet, skandaalit, eläimet: kynäsymboli (NostoMerkit) aihevärillä
//   [kuva] Delfoi         historia, luonto, kulttuuri, kauppa: tyyppimerkki (merkki-*.png)
//
// Nimiö (11 px, Iowan kursiivi, pergamenttihalo) merkin oikealla puolella, tärkeillä (tarkeys ≥ 2)
// hieman isompi. Koko kerros häivähtää Syttyminen-arvon mukaan (0 → 1, 0,7 s). Merkit näkyvät aina; karttaselitteen
// valinta ohjaa vain karttavalojen hehkua (Natiiviseppä, web). Linssin ajan kerros on piilossa (NaytaSallittu).
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
        IKarttaValot valot;
        bool sallittu = true;

        sealed class Merkki
        {
            public VisualElement El, Symboli;
            public Label Nimio;
            public string Id, Tyyppi;
            /// <summary>Ryhmän jäsenet (null = yksittäinen nosto).</summary>
            public List<NostoKerros.Nosto> Ryhma;
            public Vector2 Piste;
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
            var p = UiPalvelut.KarttaValot;
            if (p != valot)
            {
                if (valot != null) valot.Muuttui -= Paivita;
                valot = p;
                if (valot != null) valot.Muuttui += Paivita;
                Paivita();
            }
        }

        void Paivita()
        {
            var k = lahde;
            bool nakyy = sallittu && k != null && k.Nakyvissa && juuri.panel != null;
            juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
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
            foreach (var kasa in Ryhmita(lista, pisteet))
            {
                var karki = kasa[0];
                foreach (int i in kasa) if (lista[i].Tarkeys > lista[karki].Tarkeys) karki = i;
                bool ryhma = kasa.Count > 1;
                var m = Hae(n++, lista[karki], ryhma ? (k.Lahella ? RyhmanNimio(lista[karki].Nimio ?? lista[karki].Nimi) : "") : null, ryhma);
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
                m.El.style.translate = new Translate(Mathf.Round(m.Piste.x), Mathf.Round(m.Piste.y));
            }
            for (int i = n; i < merkit.Count; i++) merkit[i].El.style.display = DisplayStyle.None;
            if (viuhkanAvain != null && !viuhkaLoytyi) SuljeViuhka();
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
            float koko = s.Tarkeys >= 2 ? 13.5f : 11f;
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
        Merkki Hae(int i, NostoKerros.Nosto s, string nimio = null, bool ryhma = false)
        {
            while (merkit.Count <= i)
            {
                var uusi = new Merkki { El = Rakenne.El("mk-nosto-merkki", juuri) };
                var m0 = uusi;
                uusi.El.RegisterCallback<ClickEvent>(_ => Napautus(m0));
                uusi.Nimio = Rakenne.Teksti("", "mk-nosto-merkki__nimio", uusi.El);
                uusi.Nimio.pickingMode = PickingMode.Ignore;
                uusi.Nimio.enableRichText = false;
                Kirjasimet.Aseta(uusi.Nimio, Kirjasin.LukuKursiivi);
                merkit.Add(uusi);
            }
            var m = merkit[i];
            m.El.style.display = DisplayStyle.Flex;
            m.Id = s.Id;
            string tyyppi = ryhma ? "ryhma|" + s.Aihe : (s.Aihe ?? "") + "|" + Kuva(s);
            if (tyyppi != m.Tyyppi)
            {
                m.Tyyppi = tyyppi;
                m.Symboli?.RemoveFromHierarchy();
                m.Symboli = ryhma ? RyhmaSymboli(s) : Symboli(s);
                m.El.Insert(0, m.Symboli);
            }
            string nimi = nimio ?? s.Nimio ?? "";
            if (m.Nimio.text != nimi) m.Nimio.text = nimi;
            m.Nimio.style.display = nimi.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            m.El.EnableInClassList("mk-nosto-merkki--tarkea", s.Tarkeys >= 2);
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

        VisualElement Symboli(NostoKerros.Nosto s)
        {
            var alue = new VisualElement { pickingMode = PickingMode.Ignore };
            alue.AddToClassList("mk-nosto-merkki__symboli");
            if (s.Aihe == null || !rivit.TryGetValue(s.Aihe, out var r)) r = rivit["kaupungit"];
            string kuva = Kuva(s);
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
            taytto.style.color = Kuviot.Vari(r.Vari ?? "#8a6d4a");
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
