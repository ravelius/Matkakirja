using System.Collections;
using System.Collections.Generic;
using CesiumForUnity;
using TMPro;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Sisältöpaketin kaupungit pisteinä ja nimiöinä pallolla.
    ///
    /// Jokainen merkki kääntyy kameraan päin, ja sen koko pidetään vakiona
    /// näytön pikseleissä. Pallon takana olevat merkit piilotetaan. Nimiöt
    /// harvennetaan joka kehys: tärkeysjärjestyksessä (aloituskaupunki,
    /// lentokenttä, muut) nimiö näytetään vain, jos sen suorakulmio ei osu
    /// jo varattuun. Kaukaa näkyvät vain tärkeimmät, ja lähempänä
    /// tilaa riittää useammille.
    ///
    /// JÄRJESTYS WEBIN MUKAAN (löydös 50 vaihe 2, js/pallolauta/lauta.js:4656–4790 ja
    /// js/karttanimet.js ladoRuutunimet): ensin nostojen IKONIT (NostoKerros.VaraaIkonit, ei nimiöitä), sitten
    /// kaikkien näkyvien kaupunkien pisteet (pelimerkit pysyvät paikallaan) ja vasta sitten nimiöt, jotka
    /// väistävät kaikkea jo varattua. Valittavan kaupungin nimi näkyy aina (ennallaan).
    /// </summary>
    public class KaupunkiMerkit : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public Camera kamera;
        public PalloKierto kierto;
        public NimiKortti kortti;
        public Reitit reitit;

        /// <summary>KarttaKerrokset: "kaupungit" (pisteet ja nimiöt) ja "nimiot".</summary>
        public bool merkitNakyvat = true, nimiotNakyvat = true;

        [Header("LINSSINIMET (KarttaKerrokset \"linssinimet\"): web mitattuna, pisteinä")]
        // WEB ON MALLI, MITATTUNA (Linssisepän tilaus, Fablen päätös build 10). Webin linssin aikana kaupunkien
        // nimet ja pisteet jäävät kartalle ilman napautusta. Lähteet (pelin repo origin/main 24.9.2026):
        //  - asu: js/karttanimet.js:388 PAAKAUPUNGIN_ASU { tyylitys: 'small-caps', vali: 0.14 } ja
        //    :433 KOHDEKAUPUNGIN_ASU = sama → harvennettu kapiteeli, kirjainväli 0,14 em (TMP characterSpacing 14);
        //  - muste: js/pallolauta/nimiorasterit.js:69 'rgba(103, 88, 73, 0.92)' (css --karttamuste, ei haloa);
        //  - kokosuhde: js/karttanimet.js:294 isoKaupunki 15 / kaupunki 13,5 = 1,11; pisteet :699–:702
        //    pisteIso 2,6 / piste 2,0 = 1,3; rako pisteestä NIMION_RAKO 3 (:443) = valistys.
        //  - koko ruudulla: mitattu webin linssikuvasta (proto-3d/lokit/linssit-keksinnot-pari-20260924/
        //    web1024/kontakti-pari-keksinnot-1796.png, 1024 × 1366 CSS px, dpr 2): LONTOO versaalin korkeus
        //    15 px = 7,5 pt ja DUBLIN 13,3 px = 6,7 pt → kirjasinkoko noin 10–11 pt (Iowanin versaali ≈ 0,7 em);
        //    Lontoon piste 6,6–8,6 px = 3,3–4,3 pt.
        [Tooltip("Tavallisen kaupungin nimi linssin aikana (pt): 10,5 / 1,11 (web KOKO-suhde).")]
        public float linssiKirjain = 9.5f;
        [Tooltip("Tärkeän kaupungin nimi linssin aikana (pt): mitattu LONTOO/DUBLIN noin 10–11 pt.")]
        public float linssiTarkeaKirjain = 10.5f;
        [Tooltip("Kirjainväli em-yksikköinä (web KOHDEKAUPUNGIN_ASU.vali 0,14).")]
        public float linssiValistysEm = 0.14f;
        [Tooltip("Tavallinen piste linssin aikana (pt): 4,3 / 1,3 (web MERKKI.pisteIso / piste).")]
        public float linssiPiste = 3.3f;
        [Tooltip("Tärkeän kaupungin piste linssin aikana (pt): mitattu Lontoo 3,3–4,3 pt.")]
        public float linssiTarkeaPiste = 4.3f;
        [Tooltip("Web --karttamuste rgba(103, 88, 73, 0.92).")]
        public Color linssiMuste = new Color32(103, 88, 73, 235);

        /// <summary>
        /// LINSSINIMET (KarttaKerrokset.Nakyvyys("linssinimet"), RAJAPINTA luku 4): pisteet ja nimet näkyvät,
        /// vaikka "kaupungit" ja "nimiot" ovat pois, webin linssiasussa (yllä). Napautus ei osu (Osuma null), eikä
        /// aloitusvalinnan huomiorengas näy. Maan kehä (Maaraja) pysyy piilossa "kaupungit"-portin mukaan.
        /// KarttaKerrokset asettaa tämän vain, kun "kaupungit" on pois; pelikerrosten palatessa tila purkautuu.
        /// </summary>
        public bool LinssiTila { get; private set; }

        public void LinssiNimet(bool paalla)
        {
            if (LinssiTila == paalla) return;
            LinssiTila = paalla;
            foreach (var m in merkit) Tyyli(m);
            PaivitaRenkaat();
            Debug.Log($"MATKAKIRJA kaupungit: linssinimet {(paalla ? "päälle" : "pois")} ({merkit.Count} merkkiä)");
        }

        /// <summary>Merkin koko ja nimiön asu nykyisen tilan mukaan (pelin asu tai linssinimet); päivittää nimiön mitat.</summary>
        void Tyyli(Merkki m)
        {
            bool l = LinssiTila, tarkea = m.tyyli > 0;
            float pk = l ? (tarkea ? linssiTarkeaPiste : linssiPiste) : (tarkea ? tarkeaPiste : piste);
            m.pisteKoko = pk;
            float kasvu = m.korostettu ? 1.5f : 1f;
            m.pisteT.localScale = new Vector3(pk * kasvu, pk * kasvu, 1);
            var n = m.nimio;
            n.fontSize = l ? (tarkea ? linssiTarkeaKirjain : linssiKirjain) : (tarkea ? tarkeaKirjain : kirjain);
            n.fontStyle = l ? FontStyles.SmallCaps : m.tyyli == 2 ? FontStyles.Bold : FontStyles.Normal;
            // TMP:n characterSpacing on em/100.
            n.characterSpacing = l ? linssiValistysEm * 100f : 0f;
            n.color = l ? linssiMuste : musteenVari;
            if (m.valintamerkki && !l)
            {
                // Valittavan nimi kohdemerkin asussa (web .target-nimi): lihava, 13 pt, keskellä huomiorenkaan
                // yläpuolella (ks. ValintaNimenY). Nimi on kehotus toimia, joten se ei harvennu (LateUpdate).
                n.fontSize = valintaKirjain;
                n.fontStyle = FontStyles.Bold;
                n.color = valintaMuste;
                n.alignment = TextAlignmentOptions.Bottom;
                n.rectTransform.pivot = new Vector2(0.5f, 0f);
                n.transform.localPosition = new Vector3(0, ValintaNimenY, 0);
            }
            else
            {
                n.alignment = TextAlignmentOptions.MidlineLeft;
                n.rectTransform.pivot = new Vector2(0, 0.5f);
                n.transform.localPosition = new Vector3(pk * 0.5f + valistys, 0, 0);
            }
            n.ForceMeshUpdate(true);
            var koko = n.GetRenderedValues(false) * 10f;
            m.teksti = koko;
            m.lukittu = false; // uudet mitat: paikka lasketaan uudestaan (web: KOKO ON OSA LUKKOA)
            m.piirrettyAsetettu = false;
            m.koko = m.valintamerkki && !l ? new Vector2(koko.x, koko.y)
                                            : new Vector2(koko.x + pk * 0.5f + valistys, math.max(koko.y, pk));
        }

        /// <summary>
        /// Suodatin linsseille (Linssisepän radio: vain kanavakaupungit): null = kaikki näkyvät,
        /// muuten vain luettelon kaupungit. RAJAPINTA luku 2, NaytaKaupungit.
        /// </summary>
        public void NaytaVain(ICollection<string> kaupungit)
        {
            suodatin = kaupungit == null ? null : new HashSet<string>(kaupungit);
        }
        HashSet<string> suodatin;

        /// <summary>Kaupungin maa (ISO3) tai null.</summary>
        public string KaupunginMaa(string id)
        {
            var m = merkit.Find(x => x.kaupunki.id == id);
            return m?.kaupunki.maa;
        }

        /// <summary>Kaupungin pintakorkeus paketista (m, ennen liioittelua) tai null (RadioMastot: maston juuri).</summary>
        public double? PintaKorkeus(string id)
        {
            var m = merkit.Find(x => x.kaupunki.id == id);
            return m?.kaupunki.korkeus;
        }

        /// <summary>Kaupungin paikka (RadioMastot-koe); false, jos kaupunkia ei ole.</summary>
        public bool Paikka(string id, out double lat, out double lon)
        {
            var m = merkit.Find(x => x.kaupunki.id == id);
            lat = m?.kaupunki.lat ?? 0; lon = m?.kaupunki.lon ?? 0;
            return m != null;
        }

        /// <summary>Kaikki kaupungit merkkijärjestyksessä (testikomennot, esim. "mastot koe").</summary>
        public IEnumerable<Sisalto.Kaupunki> Kaupungit()
        {
            foreach (var m in merkit) yield return m.kaupunki;
        }

        /// <summary>Lähimmän kaupungin id annetusta pisteestä (enintään maxAste asteen päässä), muuten null.</summary>
        public string LahinId(double lat, double lon, double maxAste = 0.5)
        {
            string id = null;
            double paras = maxAste * maxAste;
            foreach (var m in merkit)
            {
                double dl = m.kaupunki.lat - lat, dp = (m.kaupunki.lon - lon) * math.cos(math.radians(lat));
                double d = dl * dl + dp * dp;
                if (d <= paras) { paras = d; id = m.kaupunki.id; }
            }
            return id;
        }

        /// <summary>Yksittäisen kaupungin pisteen korostusväri (null = pois). RAJAPINTA luku 2, Korosta.</summary>
        public void Korosta(string id, Color? vari)
        {
            var m = merkit.Find(x => x.kaupunki.id == id);
            if (m == null) return;
            var r = m.pisteT.GetComponent<MeshRenderer>();
            m.korostettu = vari.HasValue;
            if (vari.HasValue)
            {
                korostusLohko ??= new MaterialPropertyBlock();
                korostusLohko.SetColor("_BaseColor", vari.Value);
                r.SetPropertyBlock(korostusLohko);
                m.pisteT.localScale = new Vector3(m.pisteKoko * 1.5f, m.pisteKoko * 1.5f, 1);
            }
            else
            {
                r.SetPropertyBlock(null);
                m.pisteT.localScale = new Vector3(m.pisteKoko, m.pisteKoko, 1);
            }
        }
        MaterialPropertyBlock korostusLohko;

        [Header("Aloitusvalinnan kohdemerkki (web js/pallolauta/merkit.js kohdeElementti, huomio: true)")]
        // WEB ON MALLI, MITATTUNA (Pelikoodarin löydös 24.9.2026: natiivissa valittavilla oli vain kultapiste ja
        // huomiorengas). Webissä jokainen lähtövalinnan kaupunki on nopanheiton kohdemerkki huomiorenkaan sisällä
        // (js/pallolauta/lauta.js:2481 aloitusKohteet → huomio: true). Lähteet, pelin repo origin/main 24.9.2026:
        //  - merkki 24 px (js/pallolauta/merkit.js:40 KOHDEMERKIN_PX), kultalevy rgba(246, 210, 122, 0.72) ja
        //    punamullan katkoviiva --mark #b03a2b, 3 px, katko 6 / väli 4 (css/styles.css:8265 .target-piste,
        //    :90 --mark); hengittävä halo --accent #d9a13b 3,4 px, 2,4 s: säde ×1,14 ↔ ×1,42, peitto 0,85 ↔ 0,4
        //    (css/styles.css:8176 .target-halo, :8188 @keyframes kohde-halo, :8293 .target-halo.fokus). Piirto:
        //    sama Matkakirja/Kohdemerkki-varjostin kuin siirtokohteilla (Siirtokohdemerkit).
        //  - huomiorengas: KOHDEMERKIN_HUOMIO_PX 54 (merkit.js:84), --kulta #eab84e, viiva 2,6, täyttö 0,08,
        //    syke 2,6 s: säde ×1 → ×1,16, peitto 0,92 → 0,42 (css/styles.css:26718 .pallolauta-huomio, :26729).
        //  - nimi: 13 px (merkit.js:44 KOHDEMERKIN_NIMI_PX), paino 600, "Iowan Old Style", väri --map-ink #46331f,
        //    vaalea reunus rgba(247, 237, 216, 0.92) 3 px (css/styles.css:8310 .target-nimi, :87 --map-ink);
        //    perusviiva huomiorenkaan säteen (27) + raon 8 (merkit.js:64 KOHDEMERKIN_NIMI_RAKO_PX) yläpuolella
        //    (merkit.js:214 nimenSade, :240 y = −(nimenSade + rako)).
        [Tooltip("Matkakirja/Kohdemerkki (Rakennus.cs: sama kuin Siirtokohdemerkit.materiaali). Tyhjä = Siirtokohdemerkit.Instanssi.")]
        public Material kohdemerkkiMateriaali;
        [Tooltip("KOHDEMERKIN_PX 24 (merkit.js:40).")]
        public float kohdemerkkiPx = 24f;
        [Tooltip("Valittavan nimen koko (pt): KOHDEMERKIN_NIMI_PX 13 (merkit.js:44).")]
        public float valintaKirjain = 13f;
        [Tooltip("Nimen rako huomiorenkaan yläpuolella (pt): KOHDEMERKIN_NIMI_RAKO_PX 8 (merkit.js:64).")]
        public float valintaNimiRako = 8f;
        [Tooltip("Web --map-ink #46331f (css/styles.css:87).")]
        public Color valintaMuste = new Color32(0x46, 0x33, 0x1f, 0xff);
        /// <summary>Nimen alareuna keskipisteestä (pt): web nimenSade = max(12 × 1,42, 54 / 2) = 27, + rako 8.</summary>
        float ValintaNimenY => Mathf.Max(kohdemerkkiPx * 0.5f * 1.42f, rengasSade) + valintaNimiRako;

        [Header("Aloitusvalinnan huomiorengas (web .pallolauta-huomio)")]
        [Tooltip("Matkakirja/Rengas (Rakennus.cs); väri #eab84e (web --kulta).")]
        public Material rengasMateriaali;
        [Tooltip("Renkaan säde pisteinä: KOHDEMERKIN_HUOMIO_PX 54 / 2. Napautus renkaan sisällä osuu kaupunkiin.")]
        public float rengasSade = 27f;
        [Tooltip("Viivan paksuus pisteinä (web stroke-width 2,6, non-scaling-stroke).")]
        public float rengasPaksuus = 2.6f;
        [Tooltip("Valitun kaupungin rengas (web .target-ring.pick.picked: #e8b23c, stroke-width 3).")]
        public Color rengasValittuVari = new Color32(0xe8, 0xb2, 0x3c, 0xff);
        public float rengasValittuPaksuus = 3f;

        /// <summary>
        /// ALOITUSVALINNAN HUOMIORENKAAT (Natiivi-UI:n lähtövalinta; web .pallolauta-huomio, js/pallolauta/merkit.js):
        /// sykkivä kultarengas (säde 27 pt, viiva 2,6 pt, syke 2,6 s: säde ×1,16 ja peitto 0,92 → 0,42) annettujen
        /// kaupunkien ympärille; <paramref name="valittu"/> (tai null) piirretään valitun värillä #e8b23c ja 3 pt:n
        /// viivalla. idt null tai tyhjä = kaikki renkaat pois. Rengas on kaupunkimerkin osa: se näkyy vain, kun
        /// merkki näkyy (NaytaVain-suodatin, pallon etupuoli, ei aloitusporttia PalloKierto.PorttiSumea), ja
        /// sen koko on vakio näytön pisteinä (Pistekerroin). Napautus renkaan sisällä osuu kaupunkiin
        /// (KaupunkiNapautettu). Kutsun voi tehdä ennen kuin merkit on rakennettu; renkaat tulevat valmistuessa.
        /// <paramref name="vari"/> korvaa kaikkien renkaiden värin (lennon lähtö ja kohde punaisina, omistaja 24.9.).
        /// </summary>
        public void Renkaat(IEnumerable<string> idt, string valittu = null, Color? vari = null)
        {
            rengasVari = vari;
            rengasIdt.Clear();
            if (idt != null)
                foreach (var id in idt)
                    if (!string.IsNullOrEmpty(id)) rengasIdt.Add(id);
            rengasValittu = valittu;
            PaivitaRenkaat();
        }

        readonly HashSet<string> rengasIdt = new HashSet<string>();
        string rengasValittu;
        Color? rengasVari;
        MaterialPropertyBlock rengasLohko;
        bool rengasVaroitettu;
        /// <summary>Neliön sivu pisteinä: suurin säde (1,16 × säde) + puolikas viiva + reunan pehmennys.</summary>
        float RengasNelio => 2f * (rengasSade * 1.16f + Mathf.Max(rengasPaksuus, rengasValittuPaksuus) * 0.5f + 2f);

        void PaivitaRenkaat()
        {
            if (rengasMateriaali == null)
            {
                if (rengasIdt.Count > 0 && !rengasVaroitettu)
                {
                    rengasVaroitettu = true;
                    Debug.LogWarning("MATKAKIRJA kaupungit: rengasMateriaali puuttuu (kohtaus rakennettava uudelleen, Rakennus.LuoPallo)");
                }
                return;
            }
            rengasLohko ??= new MaterialPropertyBlock();
            float sivu = RengasNelio;
            Color perus = rengasMateriaali.GetColor("_BaseColor");
            foreach (var m in merkit)
            {
                // Linssinimissä ei huomiorenkaita (web: linssin aikana ei pelin merkkejä).
                bool paalla = !LinssiTila && rengasIdt.Contains(m.kaupunki.id);
                // Valinnan aikana (ei valittua, ei lennon väriä) rengas saa sisäänsä kohdemerkin ja nimi
                // kohdemerkin asun (web kohdeElementti huomio: true); valittu kaupunki lennon ajan pelkällä renkaalla.
                AsetaValintamerkki(m, paalla && rengasValittu == null && !rengasVari.HasValue);
                if (paalla && m.rengas == null) m.rengas = TeeRengas(m);
                if (m.rengas == null) continue;
                if (m.rengas.gameObject.activeSelf != paalla) m.rengas.gameObject.SetActive(paalla);
                if (!paalla) continue;
                bool valittu = m.kaupunki.id == rengasValittu;
                m.rengas.localScale = new Vector3(sivu, sivu, 1);
                rengasLohko.Clear();
                rengasLohko.SetColor("_BaseColor", rengasVari ?? (valittu ? rengasValittuVari : perus));
                rengasLohko.SetFloat("_Paksuus", valittu ? rengasValittuPaksuus : rengasPaksuus);
                rengasLohko.SetFloat("_Sade", rengasSade);
                rengasLohko.SetFloat("_Koko", sivu);
                m.rengas.GetComponent<MeshRenderer>().SetPropertyBlock(rengasLohko);
            }
            jarjestys.Clear();
            valintamerkkeja = 0;
            foreach (var m in merkit) if (m.valintamerkki) { jarjestys.Add(m); valintamerkkeja++; }
            if (valintamerkkeja > 0) foreach (var m in merkit) if (!m.valintamerkki) jarjestys.Add(m);
        }

        /// <summary>Valittavien järjestys LateUpdatessa: valintamerkit ensin, jotta niiden nimet varaavat tilansa.</summary>
        readonly List<Merkki> jarjestys = new List<Merkki>();
        int valintamerkkeja;
        MaterialPropertyBlock kohdeLohko;

        /// <summary>
        /// Kohdemerkki huomiorenkaan sisään, kaupunkipiste pois (web: valittavalla ei ole erillistä pistettä,
        /// vain .target-piste) ja nimi kohdemerkin asuun (Tyyli). Mitat kuten Siirtokohdemerkit (sivu = laajin halo
        /// + viiva + pehmennys).
        /// </summary>
        void AsetaValintamerkki(Merkki m, bool paalla)
        {
            if (paalla && m.kohdemerkki == null)
            {
                var mat = kohdemerkkiMateriaali != null ? kohdemerkkiMateriaali
                        : Siirtokohdemerkit.Instanssi != null ? Siirtokohdemerkit.Instanssi.materiaali : null;
                if (mat != null)
                {
                    var t = new GameObject("Kohdemerkki").transform;
                    t.SetParent(m.juuri, false);
                    float sivu = kohdemerkkiPx * 1.42f + 8f;
                    t.localScale = new Vector3(sivu, sivu, 1);
                    t.gameObject.AddComponent<MeshFilter>().sharedMesh = nelio;
                    var r = t.gameObject.AddComponent<MeshRenderer>();
                    r.sharedMaterial = mat;
                    r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                    r.receiveShadows = false;
                    kohdeLohko ??= new MaterialPropertyBlock();
                    kohdeLohko.Clear();
                    kohdeLohko.SetFloat("_Sade", kohdemerkkiPx * 0.5f);
                    kohdeLohko.SetFloat("_Koko", sivu);
                    kohdeLohko.SetFloat("_Viiva", 3f);
                    kohdeLohko.SetFloat("_HaloViiva", 3.4f);
                    kohdeLohko.SetVector("_Katko", new Vector4(6, 4, 0, 0));
                    kohdeLohko.SetColor("_Taytto", new Color(0.965f, 0.824f, 0.478f, 0.72f));
                    r.SetPropertyBlock(kohdeLohko);
                    m.kohdemerkki = t;
                }
                else if (!kohdeVaroitettu)
                {
                    kohdeVaroitettu = true;
                    Debug.LogWarning("MATKAKIRJA kaupungit: kohdemerkkiMateriaali puuttuu (ei Siirtokohdemerkit-instanssia)");
                }
            }
            if (m.kohdemerkki != null && m.kohdemerkki.gameObject.activeSelf != paalla) m.kohdemerkki.gameObject.SetActive(paalla);
            if (m.pisteT.gameObject.activeSelf == paalla) m.pisteT.gameObject.SetActive(!paalla);
            if (m.valintamerkki == paalla) return;
            m.valintamerkki = paalla;
            Tyyli(m);
        }
        bool kohdeVaroitettu;

        Transform TeeRengas(Merkki m)
        {
            var t = new GameObject("Rengas").transform;
            t.SetParent(m.juuri, false);
            t.gameObject.AddComponent<MeshFilter>().sharedMesh = nelio;
            var r = t.gameObject.AddComponent<MeshRenderer>();
            r.sharedMaterial = rengasMateriaali;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            return t;
        }
        [Tooltip("Kaupunkiin saapumisen näkymä: kapeamman suunnan kaari asteina " +
                 "(verkkopelin PALLO_SUKELLUSLEVEYS 620 laudan yksikköä = 18,6°).")]
        public double saapumisKaari = 18.6;
        [Tooltip("Verkkopelin PALLOKAMERAN_AJO_MS.")]
        public float saapumisKesto = 1.4f;
        [Tooltip("Napautuksen osuma-alue pisteen ympärillä, näytön pisteinä (web lauta.js:713 NAPAUTUKSEN_SADE_PX = 44, lähin kohde).")]
        public float osumaSade = 44f;
        [Tooltip("Montako merkkiä rakennetaan kehystä kohden (käynnistysnykäyksen välttämiseksi).")]
        public int rakennusKehys = 24;
        public Material pisteMateriaali;
        public TMP_FontAsset fontti;
        public Color musteenVari = new Color(0.20f, 0.15f, 0.10f);

        [Header("Koot näytön pisteinä (iOS point, 1/163 tuumaa)")]
        public float piste = 9f;
        public float tarkeaPiste = 13f;
        public float kirjain = 13f;
        public float tarkeaKirjain = 15f;
        public float valistys = 3f;

        [Tooltip("Merkin korkeus pinnan (maasto tai ellipsoidi) yläpuolella, metreinä.")]
        public double nosto = 5000.0;
        [Tooltip("Lue kaupunkien pintakorkeus maastosta (SampleHeightMostDetailed). Pois oletuksena: " +
                 "iPadilla haku latasi tarkimmat laatat 266 kaupungille 47 s (23.9.). Korkeus tulee " +
                 "sisältöpakettiin (kaupungit.korkeus), ja 5 km:n nosto riittää siihen asti.")]
        public bool maastoKorkeudet = false;
        /// <summary>Pallo, jonka maastosta merkkien pintakorkeus luetaan (tyhjä = haetaan kohtauksesta).</summary>
        public Cesium3DTileset pallo;

        class Merkki
        {
            public Sisalto.Kaupunki kaupunki;
            public Transform juuri;
            public Transform pisteT;
            public Transform rengas; // aloitusvalinnan huomiorengas (Renkaat), luodaan tarvittaessa
            public TextMeshPro nimio;
            public Vector3 normaali;
            public Vector3 pinta; // paikka georeferenssin koordinaateissa
            public int tarkeys;
            public Vector2 koko; // nimiön koko pisteinä
            public float pisteKoko;
            public int tyyli; // Tarkeys 0–2: pisteen ja nimiön asu
            public bool korostettu; // Korosta: piste 1,5-kertainen
            public Transform kohdemerkki; // aloitusvalinnan kohdemerkki renkaan sisällä, luodaan tarvittaessa
            public bool valintamerkki; // valittava kaupunki: kohdemerkki, ei pistettä, nimi renkaan yläpuolella
            public Vector2 teksti; // nimen piirretty koko pisteinä (ilman pistettä ja rakoa)
            public bool lukittu; // nimen paikka lukittu (web LUKKO): vapautuu, kun kaupunki poistuu näkyvistä tai asu vaihtuu
            public NimiLadonta.NimenPaikka lukko; // pikseleinä
            public NimiLadonta.NimenPaikka piirretty; // nimiön nykyinen paikka pikseleinä (asetetaan vain muuttuessa)
            public bool piirrettyAsetettu;
        }

        /// <summary>Osuus etäisyydestä, jonka verran merkki tuodaan pinnan eteen.</summary>
        const float Etuna = 0.3f;

        readonly List<Merkki> merkit = new List<Merkki>();

        /// <summary>
        /// YHTEINEN RUUTUTÖRMÄYS (löydös 38, build 11): kehyksen varatut alueet pikseleinä. Tämä kerros aloittaa
        /// (LateUpdate): ensin <see cref="NostoIkoneita"/> nostojen ikonia, sitten kaupunkien pisteet ja nimiöt;
        /// Nimikerros lisää samaan alue-, meri- ja valtamerinimet (prioriteetti nostoikoni > kaupunki >
        /// maakunta/nykyalue > meri > valtameri, NimiLadonta.Lado). Nostojen nimiöt eivät ole varauksia.
        /// </summary>
        public readonly Ruutuvaraukset Varaukset = new Ruutuvaraukset();
        /// <summary>Tämän kehyksen <see cref="Varaukset"/>-listan alussa olevien nostoikonien määrä (loput: kaupungit, aluenimet).</summary>
        public int NostoIkoneita { get; private set; }
        readonly List<Merkki> nakyvat = new List<Merkki>();
        readonly List<NimiLadonta.KaupunkiEhdokas> ehdokkaat = new List<NimiLadonta.KaupunkiEhdokas>();
        readonly List<bool> naytetaan = new List<bool>();
        readonly List<NimiLadonta.NimenPaikka> nimenPaikat = new List<NimiLadonta.NimenPaikka>();
        readonly List<Ruutulaatikko> pinot = new List<Ruutulaatikko>();
        Nappula nappula;
        Mesh nelio;

        public int Naytetty { get; private set; }

        void Start()
        {
            if (kamera == null) kamera = Camera.main;
            nelio = Nelio();
            if (kierto != null) kierto.Napautettu += Napautus;
            StartCoroutine(Sisalto.Hae<Sisalto.Kaupunki>("kaupungit", k => StartCoroutine(Rakenna(k))));
            StartCoroutine(SeuraaMaastoa());
        }

        /// <summary>
        /// Nimiöt pinnalle: kun pallon lähde on maasto (Komennot "maasto paalle"), merkkien
        /// pintakorkeus luetaan maastosta kerran (Cesium SampleHeightMostDetailed, kaikki
        /// kaupungit yhdellä pyynnöllä); ellipsoidilla korkeus on 0. Merkki on aina
        /// <see cref="nosto"/> metriä pinnan yläpuolella.
        /// </summary>
        IEnumerator SeuraaMaastoa()
        {
            CesiumDataSource? edellinen = null;
            int kaupunkeja = -1;
            var odota = new WaitForSeconds(0.5f);
            while (true)
            {
                yield return odota;
                if (pallo == null) pallo = FindAnyObjectByType<Cesium3DTileset>();
                if (pallo == null || merkit.Count == 0) continue;
                if (pallo.tilesetSource == edellinen && merkit.Count == kaupunkeja) continue;
                edellinen = pallo.tilesetSource;
                kaupunkeja = merkit.Count;
                var kohteet = merkit.ToArray();
                var korkeudet = new double[kohteet.Length];
                for (int i = 0; i < kohteet.Length; i++) korkeudet[i] = kohteet[i].kaupunki.korkeus;
                if (edellinen == CesiumDataSource.FromUrl && maastoKorkeudet)
                {
                    var paikat = new double3[kohteet.Length];
                    for (int i = 0; i < kohteet.Length; i++)
                        paikat[i] = new double3(kohteet[i].kaupunki.lon, kohteet[i].kaupunki.lat, 0);
                    float alku = Time.realtimeSinceStartup;
                    var tehtava = pallo.SampleHeightMostDetailed(paikat);
                    while (!tehtava.IsCompleted) yield return null;
                    if (pallo.tilesetSource != edellinen) continue; // vaihtui kesken: uusi kierros
                    if (tehtava.IsFaulted || tehtava.Result == null)
                    {
                        Debug.LogWarning("MATKAKIRJA kaupungit: maaston korkeudet epäonnistuivat: " + tehtava.Exception?.GetBaseException().Message);
                        continue;
                    }
                    var tulos = tehtava.Result;
                    int onnistui = 0;
                    for (int i = 0; i < kohteet.Length; i++)
                        if (tulos.sampleSuccess[i]) { korkeudet[i] = tulos.longitudeLatitudeHeightPositions[i].z; onnistui++; }
                    Debug.Log($"MATKAKIRJA kaupungit: maastokorkeus {onnistui}/{kohteet.Length} kaupungille, " +
                              $"{(Time.realtimeSinceStartup - alku) * 1000f:0} ms");
                }
                AsetaKorkeudet(kohteet, korkeudet);
            }
        }

        void AsetaKorkeudet(Merkki[] kohteet, double[] korkeudet)
        {
            for (int i = 0; i < kohteet.Length; i++)
            {
                var k = kohteet[i].kaupunki;
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                    new double3(k.lon, k.lat, korkeudet[i] + nosto));
                kohteet[i].pinta = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            }
        }

        /// <summary>Tärkeys 0–2 merkin tyyliä varten: paketin 1.2-kenttä tai vanha päättely.</summary>
        static int Tarkeys(Sisalto.Kaupunki k, bool paketinTarkeys) =>
            paketinTarkeys ? (k.tarkeys >= 3 ? 2 : k.tarkeys == 2 ? 1 : 0)
                           : (k.aloitus ? 2 : k.lentokentta ? 1 : 0);

        /// <summary>Tarkempi järjestysluku harvennukseen (paketin 0–3 tai vanha 0–2).</summary>
        static int Jarjestys(Sisalto.Kaupunki k, bool paketinTarkeys) =>
            paketinTarkeys ? k.tarkeys : (k.aloitus ? 2 : k.lentokentta ? 1 : 0);

        IEnumerator Rakenna(Sisalto.Kaupunki[] kaupungit)
        {
            if (kaupungit == null) yield break;
            bool paketinTarkeys = System.Array.Exists(kaupungit, k => k.tarkeys > 0);
            var valmiit = new List<Merkki>();
            int kehyksessa = 0;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            // Nimiöt piirretään pisteiden (Transparent+1) jälkeen, jotta piste ei peitä tekstiä.
            var nimioMateriaali = new Material(fontti.material) { renderQueue = 3005 };
            foreach (var k in kaupungit)
            {
                if (++kehyksessa > rakennusKehys) { kehyksessa = 0; yield return null; }
                int tarkeys = Tarkeys(k, paketinTarkeys);
                // Paketin korkeus (skeema 1.10; puuttuva = 0) + nosto. Maaston SampleHeight korvaa sen, jos päällä.
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                    new double3(k.lon, k.lat, k.korkeus + nosto));
                double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);

                var juuri = new GameObject("Kaupunki " + k.id).transform;
                juuri.SetParent(georeferenssi.transform, false);
                juuri.localPosition = (float3)u;

                var p = new GameObject("Piste").transform;
                p.SetParent(juuri, false);
                p.gameObject.AddComponent<MeshFilter>().sharedMesh = nelio;
                p.gameObject.AddComponent<MeshRenderer>().sharedMaterial = pisteMateriaali;

                var n = new GameObject("Nimiö").AddComponent<TextMeshPro>();
                n.transform.SetParent(juuri, false);
                n.font = fontti;
                n.fontSharedMaterial = nimioMateriaali;
                n.text = k.nimi;
                n.alignment = TextAlignmentOptions.MidlineLeft;
                n.textWrappingMode = TextWrappingModes.NoWrap;
                n.outlineWidth = 0.2f;
                n.outlineColor = new Color32(250, 243, 225, 220);
                var rt = n.rectTransform;
                rt.pivot = new Vector2(0, 0.5f);
                rt.sizeDelta = new Vector2(400, 40);
                // TMP:n 3D-tekstin fonttikoko 10 = 1 yksikkö; juuren mittakaava on 1 yksikkö/pikseli.
                n.transform.localScale = Vector3.one * 10f;

                var merkki = new Merkki
                {
                    kaupunki = k, juuri = juuri, pisteT = p, nimio = n, tarkeys = Jarjestys(k, paketinTarkeys),
                    tyyli = tarkeys,
                    normaali = (float3)math.normalize(u - keskus),
                    pinta = (float3)u,
                };
                // Koko, asu ja nimiön mitat (pelin asu tai linssinimet, jos tila on jo päällä).
                Tyyli(merkki);
                juuri.gameObject.SetActive(false);
                valmiit.Add(merkki);
            }
            // Tärkeimmät ensin; saman tärkeyden sisällä pidempi nimi ei saa etuoikeutta.
            valmiit.Sort((a, b) => b.tarkeys != a.tarkeys ? b.tarkeys - a.tarkeys : a.nimio.text.Length - b.nimio.text.Length);
            merkit.AddRange(valmiit);
            PaivitaRenkaat();
            Debug.Log($"MATKAKIRJA kaupungit: {merkit.Count} merkkiä, tärkeys {(paketinTarkeys ? "paketista" : "päätelty")}");
        }

        /// <summary>Napautus: lähin näkyvä merkki osuma-alueen sisällä (tai nimiö), muuten kortti piiloon.</summary>
        void Napautus(Vector2 ruutu)
        {
            var paras = Osuma(ruutu);
            if (paras == null) { kortti?.Piilota(); return; }
            ValitseKaupunki(paras.kaupunki);
        }

        /// <summary>Osuuko napautus näkyvään kaupunkimerkkiin (AiheValot: kaupunki voittaa valon).</summary>
        public bool OsuuKaupunkiin(Vector2 ruutu) => Osuma(ruutu) != null;

        Merkki Osuma(Vector2 ruutu)
        {
            // Linssinimet ovat pelkkää karttaa: pisteitä ja nimiä ei voi napauttaa.
            if (LinssiTila) return null;
            float kerroin = PalloKierto.Pistekerroin;
            Merkki paras = null;
            float parasEtaisyys = float.MaxValue;
            foreach (var m in merkit)
            {
                if (!m.juuri.gameObject.activeSelf) continue; // suodatetut ja takapuolen merkit ovat pois
                Vector3 p = kamera.WorldToScreenPoint(m.juuri.position);
                float d = Vector2.Distance(ruutu, p);
                // Huomiorenkaan sisällä napautus osuu (raja suurempi säteistä: rengas 27 pt, osumaSade 44 pt).
                float raja = m.rengas != null && m.rengas.gameObject.activeSelf ? Mathf.Max(osumaSade, rengasSade) * kerroin : osumaSade * kerroin;
                // Näkyvän nimiön päällä napautus osuu myös.
                if (m.nimio.enabled && NimenAla(m, p, kerroin).Contains(ruutu)) d = Mathf.Min(d, 1f);
                if (d < raja && d < parasEtaisyys) { parasEtaisyys = d; paras = m; }
            }
            return paras;
        }

        string valittu;

        /// <summary>
        /// Lento kaupunkiin ja nimikortti saapuessa (myös ohjelmallisesti). Jos edellisestä
        /// valitusta kaupungista on reitti, se korostetaan lennon ajaksi; saavuttaessa
        /// näytetään uuden kaupungin naapurireitit.
        /// </summary>
        public void ValitseKaupunki(Sisalto.Kaupunki k)
        {
            kortti?.Piilota();
            kierto.IlmoitaKaupunki(k.id);
            if (reitit != null)
            {
                reitit.Tyhjenna();
                if (valittu != null && valittu != k.id) reitit.Korosta(valittu, k.id);
            }
            valittu = k.id;
            kierto.Aja(k.lat, k.lon, kierto.KorkeusKaarelle(saapumisKaari), saapumisKesto, () =>
            {
                kortti?.Nayta(k);
                if (reitit != null) { reitit.Tyhjenna(); reitit.NaytaNaapurit(k.id); }
            });
        }

        public bool ValitseKaupunki(string id)
        {
            var m = merkit.Find(x => x.kaupunki.id == id);
            if (m == null) return false;
            ValitseKaupunki(m.kaupunki);
            return true;
        }

        void LateUpdate()
        {
            if (merkit.Count == 0 || kamera == null) return;
            var kt = kamera.transform;
            var gt = georeferenssi.transform;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            // Retina-näytöllä yksi piste on 2–3 pikseliä; mitoitus tehdään pisteinä.
            float kerroin = PalloKierto.Pistekerroin;
            float pikseleita = Screen.height / kerroin;
            Varaukset.Aloita(Time.frameCount);
            int naytetty = 0;

            // 1) Nostojen ikonit ensin (web nostot.paivita → nimet.lado({ varaukset })). NostoKerros ajetaan ennen
            //    tätä (DefaultExecutionOrder), joten ruutupisteet ovat tämän kehyksen. Linssin aikana nostot näkyvät
            //    vain linssinimissä (Natiivi-UI NostotKartalla.NaytaSallittu).
            var nk = NostoKerros.Instanssi;
            NostoIkoneita = nk != null && (!LinssiTila || nk.LinssiNimet) ? nk.VaraaIkonit(Varaukset, kerroin) : 0;

            // 2) Paikat ja ehdokkaat tärkeysjärjestyksessä (valintamerkit ensin: jarjestys, muuten merkit).
            nakyvat.Clear();
            ehdokkaat.Clear();
            foreach (var m in valintamerkkeja > 0 ? jarjestys : merkit)
            {
                // Korkeuskerroin nostaa maastoa: merkki nousee saman verran (paketin pintakorkeudesta).
                Vector3 paikka = gt.TransformPoint(m.pinta + m.normaali * KorkeusKerroin.Lisays(m.kaupunki.korkeus));
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                Vector3 normaali = gt.TransformDirection(m.normaali);
                // Aloitusportissa (PalloKierto.PorttiSumea) ei merkkejä eikä nimiöitä, kuten webin etusivupallossa.
                bool edessa = (merkitNakyvat || LinssiTila) && !PalloKierto.PorttiSumea && (suodatin == null || suodatin.Contains(m.kaupunki.id))
                    && Vector3.Dot(normaali, kohti / etaisyys) > 0.12f;
                if (m.juuri.gameObject.activeSelf != edessa) m.juuri.gameObject.SetActive(edessa);
                if (!edessa) { m.lukittu = false; continue; }

                // Merkki siirretään näkösädettä pitkin kameraa kohti: ruudulla se pysyy
                // samassa kohdassa, mutta kaareva pinta ei enää leikkaa sen neliötä.
                float lahella = etaisyys * (1f - Etuna);
                Vector3 edusta = kt.position - kohti / etaisyys * lahella;
                // Yksi yksikkö juuren sisällä = yksi näytön piste tällä etäisyydellä.
                float mk = 2f * lahella * tanPuoli / pikseleita;
                m.juuri.SetPositionAndRotation(edusta, kt.rotation);
                m.juuri.localScale = Vector3.one * mk;

                Vector3 ruutu = kamera.WorldToScreenPoint(paikka);
                // Lukko vapautuu vasta, kun kaupunki poistuu ruudulta (web LUKKO SÄILYY YHDEN VÄLIIN JÄÄNEEN LADONNAN YLI).
                if (ruutu.x < 0 || ruutu.y < 0 || ruutu.x > Screen.width || ruutu.y > Screen.height) m.lukittu = false;
                // Valittavan nimi näkyy aina (web kohdeElementti piirtää nimen joka merkille).
                bool valinta = m.valintamerkki && !LinssiTila;
                var ala = NimenAla(m, ruutu, kerroin);
                var suorakulmio = new Rect(ala.x - 4 * kerroin, ala.y - 2 * kerroin, ala.width + 8 * kerroin, ala.height + 4 * kerroin);
                float pp = m.pisteKoko * kerroin * (m.korostettu ? 1.5f : 1f);
                nakyvat.Add(m);
                ehdokkaat.Add(new NimiLadonta.KaupunkiEhdokas
                {
                    Piste = Laatikko(new Rect(ruutu.x - pp * 0.5f, ruutu.y - pp * 0.5f, pp, pp)),
                    Nimio = Laatikko(suorakulmio),
                    Pakko = valinta,
                    Sallittu = valinta || nimiotNakyvat || LinssiTila,
                    X = ruutu.x, Y = ruutu.y,
                    Leveys = valinta ? 0 : m.teksti.x * kerroin, Korkeus = m.teksti.y * kerroin,
                    Kirjain = m.nimio.fontSize * kerroin,
                    Sivu = (pp * 0.5f + valistys * kerroin),
                    Lukittu = m.lukittu, Lukko = m.lukko,
                    OnOma = NimiLadonta.OmaPaikka(m.kaupunki.nimionAnkkuri?.tasaus, m.kaupunki.nimionAnkkuri?.dx ?? 0f,
                                                   m.kaupunki.nimionAnkkuri?.dy ?? 0f, m.nimio.fontSize * kerroin, kerroin, out var oma),
                    Oma = oma,
                });
            }

            // 3) Pelinappula (web pinot) ja pisteet ensin, sitten nimiöt, jotka väistävät ikonit, nappulan, muiden
            //    pisteet ja aiemmat nimiöt webin ehdokaskehällä (8 suuntaa; lukittu nimi ei vaihda kylkeä).
            pinot.Clear();
            if (nappula == null) nappula = FindAnyObjectByType<Nappula>();
            if (nappula != null && !LinssiTila && nappula.Pino(kamera, kerroin, NimiLadonta.PelimerkinVara, out var pino)) pinot.Add(pino);
            NimiLadonta.LadoKaupungit(ehdokkaat, pinot, new Ruutulaatikko(0, 0, Screen.width, Screen.height), kerroin,
                                      Varaukset, naytetaan, nimenPaikat);
            for (int i = 0; i < nakyvat.Count; i++)
            {
                var m = nakyvat[i];
                bool mahtuu = naytetaan[i];
                if (mahtuu) naytetty++;
                if (mahtuu && ehdokkaat[i].Leveys > 0)
                {
                    m.lukko = nimenPaikat[i];
                    m.lukittu = true;
                    AsetaNimenPaikka(m, nimenPaikat[i], kerroin);
                }
                if (m.nimio.enabled != mahtuu) m.nimio.enabled = mahtuu;
            }
            Naytetty = naytetty;
        }

        /// <summary>Nimiö ladottuun paikkaan (TMP:n tasaus ja pivot ankkurin mukaan; vain muuttuessa).</summary>
        void AsetaNimenPaikka(Merkki m, NimiLadonta.NimenPaikka p, float kerroin)
        {
            if (m.piirrettyAsetettu && m.piirretty.Ank == p.Ank && m.piirretty.Dx == p.Dx && m.piirretty.Dy == p.Dy) return;
            m.piirretty = p;
            m.piirrettyAsetettu = true;
            var n = m.nimio;
            switch (p.Ank)
            {
                case NimiLadonta.NimenAnkkuri.Alku:
                    n.alignment = TextAlignmentOptions.MidlineLeft; n.rectTransform.pivot = new Vector2(0, 0.5f); break;
                case NimiLadonta.NimenAnkkuri.Loppu:
                    n.alignment = TextAlignmentOptions.MidlineRight; n.rectTransform.pivot = new Vector2(1, 0.5f); break;
                default:
                    n.alignment = TextAlignmentOptions.Midline; n.rectTransform.pivot = new Vector2(0.5f, 0.5f); break;
            }
            n.transform.localPosition = new Vector3(p.Dx / kerroin, p.Dy / kerroin, 0);
        }

        static Ruutulaatikko Laatikko(Rect r) => new Ruutulaatikko(r.xMin, r.yMin, r.xMax, r.yMax);

        /// <summary>Nimiön alue ruudulla (pikseleinä, y ylös): oikealla pisteestä, valintamerkillä keskellä renkaan yläpuolella.</summary>
        Rect NimenAla(Merkki m, Vector2 p, float kerroin)
        {
            var koko = m.koko * kerroin;
            if (m.valintamerkki && !LinssiTila)
                return new Rect(p.x - koko.x * 0.5f, p.y + ValintaNimenY * kerroin, koko.x, koko.y);
            if (m.piirrettyAsetettu)
            {
                var l = NimiLadonta.NimenLaatikko(p.x, p.y, m.piirretty, m.teksti.x * kerroin, m.teksti.y * kerroin, kerroin);
                return Rect.MinMaxRect(l.X0, l.Y0, l.X1, l.Y1);
            }
            return new Rect(p.x, p.y - koko.y * 0.5f, koko.x, koko.y);
        }

        static Mesh Nelio()
        {
            var m = new Mesh { name = "Piste" };
            m.vertices = new[] { new Vector3(-0.5f, -0.5f), new Vector3(0.5f, -0.5f), new Vector3(-0.5f, 0.5f), new Vector3(0.5f, 0.5f) };
            m.uv = new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1) };
            m.triangles = new[] { 0, 2, 1, 1, 2, 3 };
            m.RecalculateBounds();
            return m;
        }
    }
}
