// METROLINJA (omistaja 7.10.2026 klo 10.2x, Päätoimittajan kortti; Pariisin kaupunkiesitys): kierroksen eteneminen pystyviivana
// METROLINJA-pohjalla (Pohjat/metrolinja.uss). Kaikki asemat nimineen himmeinä, nykyinen tummana ja lihavoituna; kuljettu osuus
// viivasta korostusvärillä. Data LS1:ltä (OpasSovitin.KierrosKohteet, KierrosIndeksi, KierrosVaihtui). Paikka ja korkeus OpasValikolta.
// Omistaja 7.10. 12.3x: ei taustaa; porrastus nykyinen (välitotsikko, lihava) > viereiset (apuri) > muut (kapiteeli, hennompi),
// teksti ja viiva oppaan otsikon tyylillä (valkoinen, Himmennys-varjo ja ääriviiva). Kuumailmapallon lähtiessä (LS1
// KierrosLahtee) seuraava suurenee ja nykyinen pienenee pehmeästi ~1 s: sisältöanimaatio koodista joka ruudulla, ei USS-siirtymä.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OpasMetrolinja
    {
        /// <summary>Asemien väli (pt), kun tilaa on; muuten linja tiivistyy enimmäiskorkeuteen.</summary>
        const float AsemaVali = 26f;
        public const float AsemaValiPt = AsemaVali;
        /// <summary>Kompakti (iPhone vaaka, omistaja 13.3x): vain nykyinen ja viereiset nimellä, muut pisteinä tiiviisti.</summary>
        public bool Kompakti;
        /// <summary>iPhone pysty (omistaja 13.3x): Dynamic Islandin tasolla (rivin yläreuna &lt; IslandAlaY, paneelin pt) nimi enintään
        /// IslandKapea pt; alemmat rivit koko leveydellä. 0 = ei rajausta.</summary>
        public float IslandAlaY, IslandKapea;
        /// <summary>Pienin rivikorkeus (pt), jolla nimi mahtuu (apuri-koko + väli).</summary>
        public const float VahinRivi = 16f;
        /// <summary>Asemien määrä (viimeksi rakennettu).</summary>
        public int Maara => asemat.Count;
        readonly VisualElement juuri, viiva, kuljettu;
        readonly List<(VisualElement Rivi, Label Nimi, VisualElement Paikka)> asemat = new List<(VisualElement, Label, VisualElement)>();
        bool nakyy, likainen = true;
        int naytettyIndeksi = -2;
        /// <summary>Korostettava asema (lähdössä jo seuraava) ja animaation alku; porrastus lerpataan Vaihto-sekunnissa.</summary>
        int kohde = -2;
        float vaihtoAlku = -10f;
        float[] alkuTaso = new float[0], nytTaso = new float[0];
        const float Vaihto = 1f;
        /// <summary>
        /// KOHDEOTSIKKO METROLINJAAN (omistaja 7.10. 21.4x: "Notre Dame tulee nyt kaksi kertaa"): KierrosTaulu asettaa Korostus
        /// niin kauan kuin erillinen otsikko ennen näkyi (~3 s saapumisesta); nykyisen aseman nimi suurenee otsikon kokoon
        /// (KorostusKoko) ja sen alle tulee selite (KorostusSelite). Korostuksen päättyessä nimi pienenee ja selite häipyy yhtä aikaa.
        /// </summary>
        public static bool Korostus;
        public static string KorostusSelite;
        /// <summary>
        /// HISTORIAOSION OTSIKKO (Päätoimittaja 9.10.2026, juna 170; Pelikoodarin lentokerronta historia-v1 "otsikko"): lennon aikana soivan
        /// osion otsikko HistoriaNakyyS sekuntia osion alussa lähtö- ja tuloaseman välissä samalla selitteen pohjalla (asemat eivät suurene);
        /// null = osio ei soi. OpasValikko asettaa LS1:n OpasSovitin.HistoriaOtsikko-arvosta.
        /// </summary>
        public static string HistoriaOtsikko;
        public const float HistoriaNakyyS = 3f;
        const float KorostusKoko = 44f;   // KierrosTaulun kohdeotsikon koko (nimi 44 pt)
        const float KorostusVaihto = 0.6f;
        float korostusTaso;
        /// <summary>Korostetun nimen koko tällä ruudulla: KorostusKoko, tai pienempi, jos nimi ei mahdu yhdelle riville (SovitaKorostus).</summary>
        float korostusKoko = KorostusKoko;
        /// <summary>Korostetun nimen rivit (1–3): useampi vain, kun nimi ei mahdu yhdelle riville edes väliotsikon koossa.</summary>
        int korostusRivit = 1;
        string sovitusAvain;
        float sovitusKoko; int sovitusRivit;
        /// <summary>Nimien enimmäisleveys (Paivita, paneelin pt): korostettu nimi sovitetaan tähän yhdelle riville.</summary>
        float leveysRaja;
        Label selite, historia;
        int seliteAsema = -1, historiaAsema = -1;
        string historiaNyt;
        float historiaAlku = -10f, historiaTaso;

        /// <summary>Metrolinjan alareuna paneelin pisteinä (iPhonella otsikko sen alle); 0 = ei näy.</summary>
        public static float Alareuna { get; private set; }

        /// <summary>Testi (`ui opasvalikko metro`): Pariisin kohteet ilman kierrosta.</summary>
        public bool Testi;
        public int TestiIndeksi = 2;
        static readonly string[] TestiNimet = { "Eiffel-torni", "Trocadéro", "Riemukaari", "Champs-Élysées", "Place de la Concorde",
            "Louvre", "Notre-Dame de Paris", "Sacré-Cœurin basilika Montmartren kukkulalla" };

        public OpasMetrolinja(VisualElement isa)
        {
            juuri = Rakenne.El("tk-teema-harmaa mk-metrolinja", isa, PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;
            viiva = Rakenne.El("mk-metrolinja__viiva", juuri, PickingMode.Ignore);
            kuljettu = Rakenne.El("mk-metrolinja__kuljettu", juuri, PickingMode.Ignore);
            // KYLTTI (omistaja 9.10.2026: "metrokartan voisi myös nimetä "kaupunki kierros" kyltillä sen yläpuolelle"): linjan
            // yläpuolelle asemanimien tyylillä (sama valkoinen, varjo ja ääriviiva), lihavana; linja siirtyy kyltin verran alas.
            kyltti = Rakenne.Teksti(Kieli.T("ui.opas.metro.kaupunkikierros"), "mk-metrolinja__nimi", juuri);
            kyltti.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(kyltti, Kirjasin.ModerniLihava);
            kyltti.style.position = Position.Absolute;
            kyltti.style.left = 0; kyltti.style.top = -KylttiKorkeus; kyltti.style.marginLeft = 0;
            kyltti.style.textShadow = new TextShadow { offset = new Vector2(0, 2), blurRadius = 14, color = Tyylikirja.Himmennys.Kuva };
            kyltti.style.unityTextOutlineWidth = 0.8f;
            kyltti.style.unityTextOutlineColor = (Color)Tyylikirja.Himmennys.Tumma;
            OpasSovitin.KierrosVaihtui += () => likainen = true;
            // Lähtö: seuraava korostuu jo lennon alussa (omistaja 12.3x).
            OpasSovitin.KierrosLahtee += (nyk, seur, kesto) => Kohdista(seur);
            juuri.RegisterCallback<GeometryChangedEvent>(_ => AsetteleViiva());
        }

        IReadOnlyList<string> Nimet()
        {
            if (Testi) return TestiNimet;
            var k = OpasSovitin.KierrosKohteet;
            var l = new List<string>();
            if (k != null) foreach (var x in k) l.Add(x.nimi);
            return l;
        }

        int Indeksi => Testi ? Mathf.Clamp(TestiIndeksi, 0, TestiNimet.Length - 1) : OpasSovitin.KierrosIndeksi;

        /// <summary>Korostus siirtyy asemaan i pehmeästi (Vaihto s).</summary>
        public void Kohdista(int i)
        {
            if (i == kohde) return;
            kohde = i;
            alkuTaso = (float[])nytTaso.Clone();
            vaihtoAlku = Time.unscaledTime;
        }

        /// <summary>Aseman taso 0–2: 2 = nykyinen, 1 = viereinen, 0 = muut.</summary>
        static float Taso(int k, int i) => k == i ? 2f : Mathf.Abs(k - i) == 1 ? 1f : 0f;

        readonly Label kyltti;
        /// <summary>Kaupunkikierros-kyltin rivi linjan yläpuolella (pt).</summary>
        public const float KylttiKorkeus = 18f;

        /// <summary>Joka ruudulla: näkyvyys, pystykaista (yla…ala paneelin pisteinä), enimmäiskorkeus ja nimien enimmäisleveys.</summary>
        public void Paivita(bool nayta, float yla, float ala, float maksimi, float maksimiLeveys, float vasen)
        {
            yla += KylttiKorkeus;   // kyltti linjan yläpuolelle kaistan sisään
            var nimet = nayta ? Nimet() : null;
            nayta = nayta && nimet != null && nimet.Count > 1;
            if (nayta != nakyy)
            {
                nakyy = nayta;
                if (nayta) { juuri.style.display = DisplayStyle.Flex; juuri.schedule.Execute(() => { if (nakyy) juuri.AddToClassList("mk-metrolinja--nakyy"); }); }
                else
                {
                    juuri.RemoveFromClassList("mk-metrolinja--nakyy");
                    juuri.schedule.Execute(() => { if (!nakyy) juuri.style.display = DisplayStyle.None; }).StartingIn(Tyylikirja.Kesto.Sulku);
                }
            }
            if (!nayta) { korostusTaso = 0f; return; }
            if (likainen || nimet.Count != asemat.Count) Rakenna(nimet);
            int i = Indeksi;
            // Saapuminen ilman lähtötapahtumaa (tai lähtö jäi väliin): sama siirtymä indeksin muuttuessa.
            if (i != naytettyIndeksi) { naytettyIndeksi = i; if (kohde != i) Kohdista(i); AsetteleViiva(); }
            Animoi();
            // Korkeus: asemaväli × määrä, enintään 40 % ja kaistan korkeus; keskelle kaistaa.
            float kaista = Mathf.Max(0f, ala - yla);
            float korkeus = Kompakti ? Mathf.Min(kaista, 3f * VahinRivi + (nimet.Count - 3) * 10f)
                : Mathf.Max(Mathf.Min(Mathf.Min(maksimi, kaista), AsemaVali * nimet.Count), VahinRivi * nimet.Count);
            // Korostettu nimi ja selite vievät lisätilaa (nimen kasvu rivikorkeutena + selitteen rivit): alemmat asemat siirtyvät
            // sen verran alas ja palaavat korostuksen päättyessä. Lisätila ei rajaudu kaistaan, jotta asemat eivät litisty päällekkäin
            // (Päätoimittaja 8.10.: "Orsayn taidemuseo" rivittyi ja selite osui Eiffel-torniin, video 164 41,5 s).
            if (korostusTaso > 0.001f && selite != null)
                korkeus += korostusTaso * (RiviKerroin * Mathf.Max(0f, korostusRivit * korostusKoko - Tyylikirja.Koko.Valiotsikko) + Mathf.Max(0f, selite.layout.height));
            if (historiaTaso > 0.001f && historia != null) korkeus += historiaTaso * Mathf.Max(0f, historia.layout.height);
            float top = Mathf.Round(Keskita ? yla + (kaista - korkeus) * 0.5f : yla);
            if (juuri.style.top.value.value != top) juuri.style.top = top;
            if (juuri.style.height.value.value != korkeus) juuri.style.height = Mathf.Round(korkeus);
            if (juuri.style.left.value.value != vasen) juuri.style.left = vasen;
            if (juuri.style.maxWidth.value.value != maksimiLeveys) juuri.style.maxWidth = Mathf.Round(maksimiLeveys);
            leveysRaja = Mathf.Round(maksimiLeveys);
        }

        /// <summary>Rivikorkeus / fonttikoko (Moderni): nimen kasvun viemä pystytila.</summary>
        const float RiviKerroin = 1.2f;
        /// <summary>Korostetun nimen rivien yläraja kapeimmassa tilassa.</summary>
        const int MaksRivit = 3;

        /// <summary>
        /// Korostetun nimen koko ja rivit: yksi rivi KorostusKoossa, jos mahtuu leveysRajaan (Dynamic Islandin tasolla IslandKapea),
        /// muuten pienennetty leveyden mukaan (mitattu nykyisellä koolla ja kirjasimella, leveys skaalautuu koon mukana) väliotsikon
        /// kokoon asti. Jos ei mahdu sittenkään (iPhone pystyssä pitkät nimet), kaksi riviä tasaisimmasta sanavälistä ja koko niiden
        /// mukaan (Päätoimittaja 8.10.: mieluummin kaksi riviä kuin pienempi koko; alemmat asemat siirtyvät alas). Tulos välimuistiin
        /// nimen, tilan ja kirjasimen mukaan.
        /// </summary>
        (float Koko, int Rivit) SovitaKorostus(Label nimi, VisualElement rivi)
        {
            float tila = leveysRaja - rivi.layout.x - nimi.parent.layout.x - nimi.resolvedStyle.marginLeft - nimi.resolvedStyle.marginRight - 2f;
            if (IslandAlaY > 0f && rivi.worldBound.yMin < IslandAlaY) tila = Mathf.Min(tila, IslandKapea - 20f);
            float nyt = nimi.resolvedStyle.fontSize;
            if (tila <= 0f || nyt <= 0f || float.IsNaN(tila)) return (korostusKoko, korostusRivit);
            string avain = nimi.text + "|" + Mathf.Round(tila) + "|" + nimi.resolvedStyle.unityFontDefinition.fontAsset?.GetInstanceID() + nimi.resolvedStyle.unityFont?.GetInstanceID();
            if (avain == sovitusAvain) return (sovitusKoko, sovitusRivit);
            float PerPt(string t) { float l = nimi.MeasureTextSize(t, 0f, VisualElement.MeasureMode.Undefined, 0f, VisualElement.MeasureMode.Undefined).x; return l / nyt; }
            float yksi = PerPt(nimi.text);
            if (yksi <= 0f || float.IsNaN(yksi)) return (korostusKoko, korostusRivit);
            float sopiva = Mathf.Floor(tila / yksi * 0.97f);
            float koko = Mathf.Clamp(sopiva, Tyylikirja.Koko.Valiotsikko, KorostusKoko);
            int rivit = 1;
            var sanat = nimi.text.Split(' ');
            if (sopiva < Tyylikirja.Koko.Valiotsikko && sanat.Length > 1)
            {
                float paras = float.MaxValue;
                for (int i = 1; i < sanat.Length; i++)
                    paras = Mathf.Min(paras, Mathf.Max(PerPt(string.Join(" ", sanat, 0, i)), PerPt(string.Join(" ", sanat, i, sanat.Length - i))));
                float kahdella = Mathf.Floor(tila / paras * 0.97f);
                if (kahdella >= Tyylikirja.Koko.Valiotsikko) { koko = Mathf.Min(kahdella, KorostusKoko); rivit = 2; }
                else
                {
                    // Kapein tila (iPhone pysty, pisimmät nimet): väliotsikon koko ja rivit kuten UITK rivittää (sanat ahneesti
                    // riveille), jotta alemmat asemat siirtyvät oikean verran; enintään MaksRivit, loput ellipsiin.
                    koko = Tyylikirja.Koko.Valiotsikko;
                    float raja = tila / koko;
                    rivit = 1;
                    string nykyinen = sanat[0];
                    for (int i = 1; i < sanat.Length; i++)
                    {
                        string koe = nykyinen + " " + sanat[i];
                        if (PerPt(koe) <= raja) nykyinen = koe;
                        else { rivit++; nykyinen = sanat[i]; }
                    }
                    rivit = Mathf.Min(rivit, MaksRivit);
                }
            }
            sovitusAvain = avain; sovitusKoko = koko; sovitusRivit = rivit;
            return (koko, rivit);
        }

        /// <summary>true = kaistan keskelle (iPad), false = kaistan yläreunaan (iPhone: vasen yläkulma).</summary>
        public bool Keskita = true;

        void Animoi()
        {
            int n = asemat.Count;
            if (nytTaso.Length != n) { nytTaso = new float[n]; alkuTaso = new float[n]; for (int k = 0; k < n; k++) nytTaso[k] = alkuTaso[k] = Taso(k, kohde); }
            float t = Mathf.Clamp01((Time.unscaledTime - vaihtoAlku) / Vaihto);
            float e = t * t * (3f - 2f * t);
            // Korostus (kohdeotsikko metrolinjassa): taso 0 → 1 pehmeästi; nimi ja selite samassa tahdissa.
            bool korostus = Korostus && kohde >= 0 && kohde < n;
            korostusTaso = Mathf.MoveTowards(korostusTaso, korostus ? 1f : 0f, Time.unscaledDeltaTime / KorostusVaihto);
            float kt = korostusTaso * korostusTaso * (3f - 2f * korostusTaso);
            if (kohde >= 0 && kohde < n && kt > 0f) (korostusKoko, korostusRivit) = SovitaKorostus(asemat[kohde].Nimi, asemat[kohde].Rivi);
            PaivitaSelite(korostus, kt);
            PaivitaHistoria();
            for (int k = 0; k < n; k++)
            {
                float taso = Mathf.Lerp(alkuTaso.Length == n ? alkuTaso[k] : 0f, Taso(k, kohde), e);
                nytTaso[k] = taso;
                var (rivi, nimi, paikka) = asemat[k];
                // Koko: kapiteeli 12 → apuri 14 → väliotsikko 18; peitto 0,85 → 0,85 → 1; piste 6 → 8 → 12 pt. Kauempien peitto 0,6 → 0,85
                // (pallon UI-katselmointi TF 172, PT 9.10.2026): 0,6 himmensi myös varjon ja ääriviivan, ja nimet hukkuivat yöllä tummaan ja
                // päivällä vaaleaan kaupunkiin. Porrastus jää kokoon ja painoon; ei taustaa (omistaja 7.10. 12.3x).
                float koko = taso < 1f ? Mathf.Lerp(Tyylikirja.Koko.Kapiteeli, Tyylikirja.Koko.Apuri, taso) : Mathf.Lerp(Tyylikirja.Koko.Apuri, Tyylikirja.Koko.Valiotsikko, taso - 1f);
                float peitto = taso < 1f ? 0.85f : Mathf.Lerp(0.85f, 1f, taso - 1f);
                float piste = taso < 1f ? Mathf.Lerp(6f, 8f, taso) : Mathf.Lerp(8f, 12f, taso - 1f);
                // Korostettu nimi yhdellä rivillä, koko leveyden mukaan (SovitaKorostus); kahdelle riville vain, jos ei mahdu muuten.
                if (k == kohde && kt > 0f) koko = Mathf.Lerp(koko, korostusKoko, kt);
                var ws = k == kohde && kt > 0f && korostusRivit > 1 ? WhiteSpace.Normal : WhiteSpace.NoWrap;
                if (nimi.style.whiteSpace != ws) nimi.style.whiteSpace = ws;
                if (Mathf.Abs(nimi.resolvedStyle.fontSize - koko) > 0.05f) nimi.style.fontSize = koko;
                rivi.style.opacity = peitto;
                var p = paikka[0];
                if (Mathf.Abs(p.resolvedStyle.width - piste) > 0.05f) { p.style.width = piste; p.style.height = piste; p.style.borderTopLeftRadius = p.style.borderTopRightRadius = p.style.borderBottomLeftRadius = p.style.borderBottomRightRadius = piste * 0.5f; }
                // Kompaktissa muut kuin nykyinen ja viereiset ilman nimeä (piste jää).
                var nd = Kompakti && taso < 0.5f ? DisplayStyle.None : DisplayStyle.Flex;
                if (nimi.style.display != nd) nimi.style.display = nd;
                float kapea = IslandAlaY > 0f && rivi.worldBound.yMin < IslandAlaY ? IslandKapea - 20f : -1f;
                if (kapea > 0f) { if (nimi.style.maxWidth.value.value != kapea) nimi.style.maxWidth = kapea; }
                else if (nimi.style.maxWidth.keyword != StyleKeyword.Null) nimi.style.maxWidth = StyleKeyword.Null;
                bool lihava = taso > 1.5f;
                if (rivi.ClassListContains("mk-metrolinja__asema--nykyinen") != lihava)
                {
                    rivi.EnableInClassList("mk-metrolinja__asema--nykyinen", lihava);
                    Kirjasimet.Aseta(nimi, lihava ? Kirjasin.ModerniLihava : Kirjasin.Moderni);
                }
            }
            if (t < 1f) AsetteleViiva();
            Alareuna = nakyy ? juuri.worldBound.yMax : 0f;
        }

        /// <summary>Selite korostetun aseman nimen alle (sama nimen pohja, apuri-koko, rivittyy); peitto korostustason mukaan.</summary>
        void PaivitaSelite(bool korostus, float kt)
        {
            if (selite == null) return;
            if (korostus && seliteAsema != kohde)
            {
                seliteAsema = kohde;
                asemat[kohde].Nimi.parent.Add(selite);
            }
            if (korostus && selite.text != (KorostusSelite ?? "")) selite.text = KorostusSelite ?? "";
            var d = kt > 0.001f && !string.IsNullOrEmpty(selite.text) ? DisplayStyle.Flex : DisplayStyle.None;
            if (selite.style.display != d) selite.style.display = d;
            selite.style.opacity = kt;
        }

        /// <summary>Historiaosion otsikko lähtöaseman nimen alle (lento kohti seuraavaa: aseman ja seuraavan väliin), HistoriaNakyyS s.</summary>
        void PaivitaHistoria()
        {
            if (historia == null || asemat.Count == 0) return;
            string o = HistoriaOtsikko;
            if (o != historiaNyt)
            {
                historiaNyt = o;
                if (!string.IsNullOrEmpty(o)) { historia.text = o; historiaAlku = Time.unscaledTime; }
            }
            bool nayta = !string.IsNullOrEmpty(historiaNyt) && Time.unscaledTime - historiaAlku < HistoriaNakyyS;
            int asema = Mathf.Clamp(Mathf.Min(naytettyIndeksi, kohde < 0 ? naytettyIndeksi : kohde), 0, asemat.Count - 1);
            if (nayta && historiaAsema != asema) { historiaAsema = asema; asemat[asema].Nimi.parent.Add(historia); }
            historiaTaso = Mathf.MoveTowards(historiaTaso, nayta ? 1f : 0f, Time.unscaledDeltaTime / KorostusVaihto);
            float ht = historiaTaso * historiaTaso * (3f - 2f * historiaTaso);
            var d = ht > 0.001f ? DisplayStyle.Flex : DisplayStyle.None;
            if (historia.style.display != d) historia.style.display = d;
            historia.style.opacity = ht;
        }

        /// <summary>Testi (`ui opasvalikko historia`): otsikko, näkyvyys ja paikka.</summary>
        public string HistoriaKuvaus() => historia == null ? "historia: ei metrolinjaa"
            : $"historia \"{HistoriaOtsikko ?? "-"}\" {(historia.style.display == DisplayStyle.Flex ? "näkyy" : "piilossa")} peitto {historia.resolvedStyle.opacity:0.00}, "
            + $"aseman {historiaAsema} alla @ {historia.worldBound.xMin:0},{historia.worldBound.yMin:0} {historia.worldBound.width:0}×{historia.worldBound.height:0}";

        /// <summary>Selitteen pohja: aseman nimen pohja apuri-koossa (+2), rivittyy, oppaan otsikon varjo ja ääriviiva.</summary>
        static Label SeliteTeksti()
        {
            var l = Rakenne.Teksti("", "mk-metrolinja__nimi", null);
            Kirjasimet.Aseta(l, Kirjasin.Moderni);
            l.style.fontSize = Tyylikirja.Koko.Apuri + 2f;
            l.style.whiteSpace = WhiteSpace.Normal;
            l.style.textOverflow = TextOverflow.Clip;
            l.style.textShadow = new TextShadow { offset = new Vector2(0, 2), blurRadius = 14, color = Tyylikirja.Himmennys.Kuva };
            l.style.unityTextOutlineWidth = 0.8f;
            l.style.unityTextOutlineColor = (Color)Tyylikirja.Himmennys.Tumma;
            l.style.display = DisplayStyle.None;
            return l;
        }

        void Rakenna(IReadOnlyList<string> nimet)
        {
            likainen = false;
            foreach (var a in asemat) a.Rivi.RemoveFromHierarchy();
            asemat.Clear();
            foreach (var n in nimet)
            {
                var rivi = Rakenne.El("mk-metrolinja__asema", juuri, PickingMode.Ignore);
                var paikka = Rakenne.El("mk-metrolinja__paikka", rivi, PickingMode.Ignore);
                Rakenne.El("mk-metrolinja__piste", paikka, PickingMode.Ignore);
                // Nimi ja (korostettuna) selite pystysarakkeessa pisteen oikealla puolella.
                var sarake = Rakenne.El(null, rivi, PickingMode.Ignore);
                sarake.style.flexDirection = FlexDirection.Column;
                sarake.style.flexShrink = 1;
                var nimi = Rakenne.Teksti(n, "mk-metrolinja__nimi", sarake);
                Kirjasimet.Aseta(nimi, Kirjasin.Moderni);
                // Oppaan otsikon varjo ja ääriviiva (KierrosTaulu): erottuu ilman taustaa vaaleaa ja tummaa karttaa vasten.
                nimi.style.textShadow = new TextShadow { offset = new Vector2(0, 2), blurRadius = 14, color = Tyylikirja.Himmennys.Kuva };
                nimi.style.unityTextOutlineWidth = 0.8f;
                nimi.style.unityTextOutlineColor = (Color)Tyylikirja.Himmennys.Tumma;
                asemat.Add((rivi, nimi, paikka));
            }
            naytettyIndeksi = -2;
            nytTaso = new float[0];
            selite = SeliteTeksti();
            seliteAsema = -1;
            historia = SeliteTeksti();
            historiaAsema = -1;
            historiaTaso = 0f;
        }

        /// <summary>Viiva ensimmäisen ja viimeisen aseman pisteiden keskeltä; kuljettu osuus nykyiseen asti.</summary>
        void AsetteleViiva()
        {
            if (asemat.Count < 2) return;
            var p0 = asemat[0].Paikka.worldBound; var p1 = asemat[asemat.Count - 1].Paikka.worldBound;
            if (p0.height <= 0 || float.IsNaN(p0.y)) return;
            Vector2 a = juuri.WorldToLocal(p0.center), b = juuri.WorldToLocal(p1.center);
            float x = Mathf.Round(a.x - 1f);
            viiva.style.left = x; viiva.style.top = a.y; viiva.style.height = Mathf.Max(0f, b.y - a.y);
            int i = Mathf.Clamp(naytettyIndeksi, 0, asemat.Count - 1);   // kuljettu osuus saavutettuun asemaan
            var pi = juuri.WorldToLocal(asemat[i].Paikka.worldBound.center);
            kuljettu.style.left = x; kuljettu.style.top = a.y; kuljettu.style.height = Mathf.Max(0f, pi.y - a.y);
            viiva.SendToBack(); kuljettu.PlaceInFront(viiva);
        }

        /// <summary>Testi: näkyvyys, laatikko ja nykyinen asema.</summary>
        public string Kuvaus()
        {
            var r = juuri.worldBound;
            return $"metrolinja {(nakyy ? "näkyy" : "piilossa")}, {asemat.Count} asemaa, nykyinen {naytettyIndeksi}, @ {r.xMin:0},{r.yMin:0} {r.width:0}×{r.height:0}";
        }
    }
}
