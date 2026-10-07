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
            PallonLepo.Muuttui("kaupungit");
            Debug.Log($"MATKAKIRJA kaupungit: linssinimet {(paalla ? "päälle" : "pois")} ({merkit.Count} merkkiä)");
        }

        // LÄMPÖERÄ (PallonLepo): aloitusvalinnan huomiorengas (Rengas-varjostin, syke 2,6 s) ja kohdemerkin halo
        // (Kohdemerkki, 2,4 s) ovat jatkuva idle-animaatio koko lähtövalinnan (ja lennon punaisten renkaiden) ajan.
        // Fable 25.9. klo 20.1x: ne jäätyvät keskiasentoon 3 s levon jälkeen ja jatkuvat heti aktiivisuudesta (Joutosyke,
        // varjostimien _SykeAika ja _SykeVoima); jäätyneinä ehto on false, ja pallo saa levätä.
        void OnEnable() => PallonLepo.Animoi(RenkaatSykkivat, "kaupungit: huomiorenkaat");
        void OnDisable() => PallonLepo.Poista(RenkaatSykkivat);

        bool RenkaatSykkivat()
        {
            if (!Joutosyke.Elaa || rengasIdt.Count == 0 || LinssiTila || kamera == null) return false;
            float reuna = (rengasSade * 1.16f + 2f) * PalloKierto.Pistekerroin;
            foreach (var m in merkit)
            {
                if (!m.juuri.gameObject.activeSelf) continue;
                bool rengas = m.rengas != null && m.rengas.gameObject.activeSelf;
                bool kohde = m.kohdemerkki != null && m.kohdemerkki.gameObject.activeSelf;
                if ((rengas || kohde) && PallonLepo.Ruudulla(kamera, m.juuri.position, reuna)) return true;
            }
            return false;
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
            // KARTTANIMEN ASU (pariteetti 30.9.2026, web karttanimet.js PAAKAUPUNGIN_ASU / KOHDEKAUPUNGIN_ASU): myös pelin
            // kaupunkinimet harvennettuna kapiteelina (small-caps, kirjainväli 0,14 em); tärkein (tyyli 2) lisäksi lihava.
            n.fontStyle = l ? FontStyles.SmallCaps : m.tyyli == 2 ? FontStyles.SmallCaps | FontStyles.Bold : FontStyles.SmallCaps;
            // TMP:n characterSpacing on em/100.
            n.characterSpacing = (l ? linssiValistysEm : KarttanimenValistysEm) * 100f;
            // Kartan mittakerroin (AsetaMitta) palautuu 1:een; LateUpdate asettaa sen uudelleen, mitat mitataan peruskoossa.
            m.mitta = 1f;
            n.transform.localScale = Vector3.one * 10f;
            n.color = l ? linssiMuste : musteenVari;
            m.nimiPeitto = l ? 1f : musteenVari.a; // LateUpdate kertoo häivytyksen tällä (sepia, palaute 3)
            m.usva = -1f;   // väri nollautui: horisonttiusvan peitto uudelleen (LateUpdate)
            if (m.valintamerkki && !l)
            {
                // Valittavan nimi kohdemerkin asussa (web .target-nimi): lihava, 13 pt, keskellä huomiorenkaan
                // yläpuolella (ks. ValintaNimenY). Nimi on kehotus toimia, joten se ei harvennu (LateUpdate).
                n.fontSize = valintaKirjain;
                n.fontStyle = FontStyles.Bold;
                n.characterSpacing = 0f; // valittavan asu ennallaan (web .target-nimi)
                n.color = valintaMuste;
                m.nimiPeitto = valintaMuste.a;
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
            PaivitaKoko(m);
        }

        /// <summary>Nimiön ja pisteen yhteinen koko pisteinä nykyisellä mittakertoimella (NimenAla).</summary>
        void PaivitaKoko(Merkki m)
        {
            var t = m.teksti * m.mitta;
            m.koko = m.valintamerkki && !LinssiTila ? t
                : new Vector2(t.x + m.pisteKoko * 0.5f + valistys, math.max(t.y, m.pisteKoko));
        }

        /// <summary>
        /// NIMIKYLTTI ON KARTAN MITTA (pariteetti 30.9.2026, web nimet.js nimenKarttakerroin ja ZOOMI SKAALAA LUKON):
        /// nimiön mittakaava × <paramref name="f"/> (TMP-teksti skaalataan transformilla, ei fonttikokoa: ei uutta
        /// mittausta kehyksessä). Lukittu paikka kasvaa samassa suhteessa, joten nimi ei vaihda kylkeä zoomatessa.
        /// </summary>
        void AsetaMitta(Merkki m, float f, float kerroin)
        {
            float s = f / m.mitta;
            m.mitta = f;
            m.nimio.transform.localScale = Vector3.one * (10f * f);
            if (m.lukittu) { m.lukko.Dx *= s; m.lukko.Dy *= s; }
            PaivitaKoko(m);
            if (m.piirrettyAsetettu)
            {
                // Ankkuri ei muutu: vain siirto (ei TMP:n tasausta eikä pivotia kehyksessä).
                m.piirretty.Dx *= s; m.piirretty.Dy *= s;
                m.nimio.transform.localPosition = new Vector3(m.piirretty.Dx / kerroin, m.piirretty.Dy / kerroin, 0);
            }
        }

        /// <summary>
        /// Suodatin linsseille (Linssisepän radio: vain kanavakaupungit): null = kaikki näkyvät,
        /// muuten vain luettelon kaupungit. RAJAPINTA luku 2, NaytaKaupungit.
        /// </summary>
        public void NaytaVain(ICollection<string> kaupungit)
        {
            suodatin = kaupungit == null ? null : new HashSet<string>(kaupungit);
            PallonLepo.Muuttui("kaupungit");
        }
        HashSet<string> suodatin;

        /// <summary>
        /// PELIN KAUPUNKIRAJAUS (build 13, pariteetti D15; web js/pallolauta/lauta.js:2676–2716 pelinKaupunkirajaus):
        /// tavallisessa pelissä näkyvät ja ovat napautettavissa vain kohdemaan kaupungit, oma kaupunki, nopan
        /// siirtokohteet ja tarjotut lentokohteet — Pelikoodari (PeliOhjain) antaa joukon. null = ei rajausta
        /// (nappula reitillä, maailmatila, peli pois). Erillinen NaytaVain-suodattimesta: merkki näkyy vain, jos
        /// molemmat sallivat (leikkaus). Linssinimissä (LinssiTila) pelin rajausta ei käytetä (web linssiPaalla → null).
        /// </summary>
        public void PeliSuodatin(ICollection<string> kaupungit)
        {
            peliSuodatin = kaupungit == null ? null : new HashSet<string>(kaupungit);
            PallonLepo.Muuttui("kaupungit");
        }
        HashSet<string> peliSuodatin;

        /// <summary>
        /// PELAAJAN NÄKYMÄ (omistaja 29.9.2026, web on malli): kehittäjän maailmatilassa pelaajan rajauksen ulkopuoliset pelin
        /// kaupungit näkyvät himmeinä (piste 40 %, koko sama, ei nimeä) ja ovat napautettavia (maailmahyppy). null = ei.
        /// </summary>
        public void Himmeat(ICollection<string> kaupungit)
        {
            himmeat = kaupungit == null || kaupungit.Count == 0 ? null : new HashSet<string>(kaupungit);
            foreach (var m in merkit)
            {
                bool h = himmeat != null && himmeat.Contains(m.kaupunki.id);
                if (m.himmea == h) continue;
                m.himmea = h;
                AsetaPisteenVari(m);
            }
            PallonLepo.Muuttui("kaupungit");
        }
        HashSet<string> himmeat;
        const float HimmeanPeitto = 0.4f;

        /// <summary>Mittari (kehittaja nakyma): himmeitä kaupunkeja kaikkiaan ja niistä ruudulla näkyviä.</summary>
        public (int Kaikki, int Nakyvissa) HimmeidenMaara()
        {
            int k = 0, n = 0;
            foreach (var m in merkit) { if (!m.himmea) continue; k++; if (m.juuri.gameObject.activeSelf) n++; }
            return (k, n);
        }

        /// <summary>Sallivatko NaytaVain- ja pelisuodatin kaupungin (leikkaus).</summary>
        bool Suodatettu(string id) =>
            (suodatin == null || suodatin.Contains(id))
            && (LinssiTila || peliSuodatin == null || peliSuodatin.Contains(id) || (himmeat != null && himmeat.Contains(id)));

        /// <summary>
        /// PELI OHJAA REITTEJÄ (build 13, pariteetti B10/D18/A3/A15/C18, löydökset 57 ja 60): webissä kaupungin
        /// napautus ei piirrä eikä korosta reittejä, vaan reitit tulevat vain ui.matkareittienValinta-säännöstä
        /// (js/ui.js:7885). Tosi = ValitseKaupunki ei koske Reitteihin (ei Tyhjenna, Korosta eikä NaytaNaapurit);
        /// PeliOhjain piirtää matkareitit itse (Reitit.NaytaReitit, Lentokaaret). Oletus epätosi: ilman peliä
        /// (proto-komennot) napautus näyttää naapurireitit kuten ennen.
        /// </summary>
        public bool PeliOhjaaReitit { get; set; }
        /// <summary>Alkulento v3 (omistaja 7.10. 14.5x: "tarkista, ettei kartta nykäise ollenkaan"): aloituskaupungin valinnassa
        /// napautus vain ilmoittaa kaupungin (Aloitusnakyma käynnistää aloituslennon); ei kamera-ajoa kohti kaupunkia, jonka
        /// lennon odotus katkaisi seuraavassa kehyksessä (kamera ehti liikahtaa ja pysähtyi).</summary>
        public bool ValintaIlmanAjoa { get; set; }

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
        /// <summary>
        /// LÖYDÖS 166 (omistaja 1.0.21, Pariisi: nappula "nousee ilmaan" kallistettaessa): kaupungin pisteen korkeus
        /// ellipsoidista (m) — pinta + <see cref="nosto"/> + korkeuskertoimen lisäys, kuten piste piirretään. Pisteen
        /// ulkopuolella kahden lähimmän kaupungin (≤ 3°) etäisyydellä painotettu keskiarvo, jotta nappula liikkuu
        /// kaupunkien välillä ilman hyppyä. NaN, jos merkkejä ei ole lähellä.
        /// </summary>
        public double PisteenKorkeus(double lat, double lon)
        {
            double d1 = double.MaxValue, d2 = double.MaxValue, h1 = double.NaN, h2 = double.NaN;
            double c = math.cos(math.radians(lat));
            foreach (var m in merkit)
            {
                double dl = m.kaupunki.lat - lat, dp = (m.kaupunki.lon - lon) * c;
                double d = dl * dl + dp * dp;
                double h = m.pohjaKorkeus + nosto + KorkeusKerroin.Lisays(m.kaupunki.korkeus);
                if (d < d1) { d2 = d1; h2 = h1; d1 = d; h1 = h; }
                else if (d < d2) { d2 = d; h2 = h; }
            }
            if (double.IsNaN(h1) || d1 > 9.0) return double.NaN;
            if (d1 < 1e-8 || double.IsNaN(h2) || d2 > 9.0) return h1;
            double w1 = 1.0 / math.sqrt(d1), w2 = 1.0 / math.sqrt(d2);
            return (h1 * w1 + h2 * w2) / (w1 + w2);
        }

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
            m.korostettu = vari.HasValue;
            m.korostus = vari;
            AsetaPisteenVari(m);
            float k = vari.HasValue ? 1.5f : 1f;
            m.pisteT.localScale = new Vector3(m.pisteKoko * k, m.pisteKoko * k, 1);
            PallonLepo.Muuttui("kaupungit");
        }
        MaterialPropertyBlock korostusLohko;

        /// <summary>Pisteen väri: korostus tai materiaalin oma, alfa × horisonttiusvan näkyvyys (löydös 153).</summary>
        void AsetaPisteenVari(Merkki m)
        {
            var r = m.pisteT.GetComponent<MeshRenderer>();
            float nak = (m.usva < 0f ? 1f : m.usva) * (m.himmea ? HimmeanPeitto : 1f);
            if (!m.korostus.HasValue && nak >= 0.999f) { r.SetPropertyBlock(null); return; }
            var v = m.korostus ?? (pisteMateriaali != null ? pisteMateriaali.GetColor("_BaseColor") : Color.black);
            v.a *= nak;
            korostusLohko ??= new MaterialPropertyBlock();
            korostusLohko.SetColor("_BaseColor", v);
            r.SetPropertyBlock(korostusLohko);
        }

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
        [Tooltip("Sepia #5a4330, web peitto 0,95 (ennen --map-ink #46331f).")]
        public Color valintaMuste = ValintaSepia;
        /// <summary>Nimen alareuna keskipisteestä (pt): web nimenSade = max(12 × 1,42, 54 / 2) = 27, + rako 8.</summary>
        float ValintaNimenY => Mathf.Max(kohdemerkkiPx * 0.5f * 1.42f, rengasSade) + valintaNimiRako;
        /// <summary>Valittavan nimen yläreuna pisteen yllä (pt): ValintaNimenY + rivin korkeus (v3f-laitekuva 28.9.: ~52 pt).
        /// Aloitusnäkymä rajaa valinnan pelikellon alle (Valintarajaus).</summary>
        public float ValintaNimenYlaPt => ValintaNimenY + valintaKirjain * 1.3f;

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
            PallonLepo.Muuttui("kaupungit");
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
            PaivitaJarjestys();
        }

        /// <summary>
        /// Ladontajärjestys (<see cref="jarjestys"/>): valintamerkit, lennon renkaat, oma kaupunki ja matkan kohteet
        /// ennen muita (web OMAN_KAUPUNGIN_TARKEYS / KOHTEEN_TARKEYS); muiden kesken merkit-lista (tärkeys). Tyhjä =
        /// ei etuoikeutettuja, LateUpdate käy merkit-listan. Vain muutoksissa (renkaat, etusija), ei kehyksessä.
        /// </summary>
        void PaivitaJarjestys()
        {
            jarjestys.Clear();
            valintamerkkeja = 0;
            foreach (var m in merkit)
            {
                string id = m.kaupunki.id;
                m.etuoikeus = m.valintamerkki ? EtuValinta
                    : !LinssiTila && rengasIdt.Contains(id) ? EtuRengas
                    : id == omaKaupunki ? EtuOma
                    : etusija.Contains(id) ? EtuKohde : EtuMuut;
                if (m.valintamerkki) valintamerkkeja++;
            }
            for (int e = EtuValinta; e < EtuMuut; e++)
                foreach (var m in merkit) if (m.etuoikeus == e) jarjestys.Add(m);
            if (jarjestys.Count > 0) foreach (var m in merkit) if (m.etuoikeus == EtuMuut) jarjestys.Add(m);
        }

        /// <summary>
        /// PELAAJAN KAUPUNKI JA MATKAN KOHTEET NIMIBUDJETIN EDELLE (pariteetti 30.9.2026, web nimet.js lado `oma` ja
        /// `etusija` = lauta.js matkanKohteet): oma kaupunki ja tarjotut siirto- ja lentokohteet ladotaan ennen muita,
        /// joten zoomtason nimibudjetti ei pudota niitä. PeliOhjain kutsuu samalla kuin <see cref="PeliSuodatin"/>.
        /// </summary>
        public void Etusija(string oma, ICollection<string> kohteet)
        {
            bool sama = oma == omaKaupunki && (kohteet?.Count ?? 0) == etusija.Count;
            if (sama && kohteet != null) foreach (var k in kohteet) if (!etusija.Contains(k)) { sama = false; break; }
            if (sama) return;
            omaKaupunki = oma;
            etusija.Clear();
            if (kohteet != null) foreach (var k in kohteet) if (!string.IsNullOrEmpty(k)) etusija.Add(k);
            PaivitaJarjestys();
            PallonLepo.Muuttui("kaupungit");
        }
        string omaKaupunki;
        readonly HashSet<string> etusija = new HashSet<string>();

        /// <summary>Ladontajärjestys LateUpdatessa (valintamerkit ja etuoikeutetut ensin, ks. PaivitaJarjestys).</summary>
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
            AsetaLentoaika(m, paalla);
            if (m.pisteT.gameObject.activeSelf == paalla) m.pisteT.gameObject.SetActive(!paalla);
            if (m.valintamerkki == paalla) return;
            m.valintamerkki = paalla;
            Tyyli(m);
        }
        bool kohdeVaroitettu;

        /// <summary>Lähtö (Lontoo): lentoaika lasketaan tästä (Pelikello.LentoTunnit).</summary>
        const double LahtoLat = 51.5074, LahtoLon = -0.1278;
        /// <summary>Lentoajan nimiö renkaan alla (pt): koko ja rako renkaan reunasta.</summary>
        public float lentoaikaKirjain = 11f, lentoaikaRako = 5f;

        /// <summary>
        /// LENTOAIKA VALITTAVAN ALLE (omistaja 28.9.2026 klo 09.38, v3f: "kohdekaupunkien alapuolella lukisi joko plus
        /// kuusi tuntia tai plus kaksitoista tuntia"): Pelikello.LentoTunnit Lontoosta pelin 6 h:n ikkunoin, renkaan
        /// alapuolella keskellä samalla musteella kuin nimi (himmeämpänä). Lontoolla ei lentoaikaa.
        /// </summary>
        void AsetaLentoaika(Merkki m, bool paalla)
        {
            bool nayta = paalla && m.kaupunki.id != "lontoo";
            if (nayta && m.lentoaika == null)
            {
                var n = new GameObject("Lentoaika").AddComponent<TextMeshPro>();
                n.transform.SetParent(m.juuri, false);
                n.font = m.nimio.font;
                n.fontSharedMaterial = m.nimio.fontSharedMaterial;
                n.textWrappingMode = TextWrappingModes.NoWrap;
                n.outlineWidth = 0.2f;
                n.outlineColor = new Color32(250, 243, 225, 220);
                n.alignment = TextAlignmentOptions.Top;
                n.fontSize = lentoaikaKirjain;
                n.color = new Color(valintaMuste.r, valintaMuste.g, valintaMuste.b, 0.82f);
                var rt = n.rectTransform;
                rt.pivot = new Vector2(0.5f, 1f);
                rt.sizeDelta = new Vector2(200, 30);
                n.transform.localScale = Vector3.one * 10f;
                n.transform.localPosition = new Vector3(0, -(Mathf.Max(kohdemerkkiPx * 0.5f * 1.42f, rengasSade) + lentoaikaRako), 0);
                n.text = Pelikello.LentoaikaTeksti(Pelikello.LentoTunnit(LahtoLat, LahtoLon, m.kaupunki.lat, m.kaupunki.lon));
                m.lentoaika = n;
            }
            if (m.lentoaika != null && m.lentoaika.gameObject.activeSelf != nayta) m.lentoaika.gameObject.SetActive(nayta);
        }

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
        /// <summary>
        /// KOHDEKAUPUNKIEN SEPIA (omistajan palaute 3, 29.9.2026): pisteet ja nimet rantaviivan musteella (web RANTA_MUSTE
        /// #5a4330) ja hieman läpikuultavina (web peitto <see cref="KaupunkiPeitto"/>). Natiivin alfa lineaarisesta
        /// sekoituksesta kuten Rannikko.PeittoNatiivi. Korostukset, valinnan nimet ja linssinimet ennallaan.
        /// </summary>
        public const float KaupunkiPeitto = 0.75f;
        public static readonly float KaupunkiPeittoNatiivi =
            (float)Vektorisolut.LineaarinenPeitto(Vektorisolut.RantaMuste, KaupunkiPeitto);
        public static readonly Color KaupunkiMuste = new Color(
            Rannikko.RantaMuste.r, Rannikko.RantaMuste.g, Rannikko.RantaMuste.b, KaupunkiPeittoNatiivi);
        public Color musteenVari = KaupunkiMuste;
        /// <summary>Valinnan ja siirtokohteen nimi samalla musteella vahvempana (Päätoimittaja 29.9.2026: web peitto
        /// <see cref="ValintaPeitto"/>); kulta- ja punamerkit ennallaan.</summary>
        public const float ValintaPeitto = 0.95f;
        public static readonly Color ValintaSepia = new Color(Rannikko.RantaMuste.r, Rannikko.RantaMuste.g,
            Rannikko.RantaMuste.b, (float)Vektorisolut.LineaarinenPeitto(Vektorisolut.RantaMuste, ValintaPeitto));

        [Header("Koot näytön pisteinä (iOS point, 1/163 tuumaa)")]
        public float piste = 9f;
        public float tarkeaPiste = 13f;
        [Tooltip("Tavallisen kaupungin nimi saapumisnäkymässä (pt): web KARTTANIMI_KOOT.kaupunki 13,5 (pariteetti 30.9.2026).")]
        public float kirjain = 13.5f;
        [Tooltip("Tärkeän kaupungin nimi saapumisnäkymässä (pt): web KARTTANIMI_KOOT.isoKaupunki 15.")]
        public float tarkeaKirjain = 15f;
        /// <summary>Karttanimen kirjainväli em-yksikköinä (web PAAKAUPUNGIN_ASU.vali 0,14; TMP characterSpacing 14).</summary>
        public const float KarttanimenValistysEm = 0.14f;
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
            public double pohjaKorkeus; // pinnan korkeus ellipsoidista ennen nostoa (paketti tai maastonäyte), löydös 166
            public int tarkeys;
            public Vector2 koko; // nimiön koko pisteinä
            public float pisteKoko;
            public int tyyli; // Tarkeys 0–2: pisteen ja nimiön asu
            public bool korostettu; // Korosta: piste 1,5-kertainen
            public Color? korostus; // Korosta-väri
            public float usva = -1f; // horisonttiusvan jälkeen näkyvä osuus 0–1 (löydös 153), −1 = asettamatta
            public float nimiPeitto = 1f; // nimen perusalfa (Tyyli): kohdekaupungit KaupunkiPeittoNatiivi, muut 1
            public float nimiHaive = -1f; // nimen häivytys 0–1 (tulo ja lähtö 220 ms), −1 = ensi näkymä: heti
            public bool ruudulla, oliRuudulla, naytettiin; // liikelukko (NimiLadonta.LukittuNakyvyys)
            public Transform kohdemerkki; // aloitusvalinnan kohdemerkki renkaan sisällä, luodaan tarvittaessa
            public TextMeshPro lentoaika; // aloitusvalinnan lentoaika renkaan alla ("+6 h", v3f), luodaan tarvittaessa
            public bool valintamerkki; // valittava kaupunki: kohdemerkki, ei pistettä, nimi renkaan yläpuolella
            public bool himmea; // pelaajan näkymä: rajauksen ulkopuolinen pelin kaupunki, piste 40 %, ei nimeä
            public Vector2 teksti; // nimen piirretty koko pisteinä (ilman pistettä ja rakoa)
            public bool lukittu; // nimen paikka lukittu (web LUKKO): vapautuu, kun kaupunki poistuu näkyvistä tai asu vaihtuu
            public NimiLadonta.NimenPaikka lukko; // pikseleinä
            public NimiLadonta.NimenPaikka piirretty; // nimiön nykyinen paikka pikseleinä (asetetaan vain muuttuessa)
            public bool piirrettyAsetettu;
            public float mitta = 1f; // kartan mittakerroin nimiölle (AsetaMitta; web nimenKarttakerroin), 1 = peruskoko
            public int etuoikeus = EtuMuut; // ladontajärjestys (PaivitaJarjestys): valittava, rengas, oma, matkan kohde, muut
        }

        // Ladonnan etuoikeus (pariteetti 30.9.2026, web nimet.js OMAN_KAUPUNGIN_TARKEYS 1000 ja KOHTEEN_TARKEYS 500):
        // valittavat ensin (pakko), sitten lennon renkaat, oma kaupunki ja matkan kohteet — nimibudjetti ei pudota niitä.
        const int EtuValinta = 0, EtuRengas = 1, EtuOma = 2, EtuKohde = 3, EtuMuut = 4;

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
        /// <summary>
        /// Tämän kehyksen <see cref="Varaukset"/>-listan alussa olevien kiinteiden varausten määrä: nostoikonit ja
        /// <see cref="Kalusteet"/> (loput: kaupungit, aluenimet).
        /// </summary>
        public int NostoIkoneita { get; private set; }

        /// <summary>
        /// Löydös 164 (omistaja 1.0.21, Alankomaat: "Brussel" maan otsikkorivin päällä): ruudun kalusteet (kartussi,
        /// Liiku, pulu, yläpalkki) ruutupikseleinä, y ylös. Natiivi-UI asettaa; ne varataan nostoikonien jälkeen ennen
        /// kaupunkeja, joten kaupunkien ja alueiden nimiöt väistävät niitä (pisteet pysyvät paikallaan).
        /// </summary>
        /// Fablen päätös 27.9. klo 10.3x: myös erikoismallit ovat kalusteita (Symbolimallit.LisaaKalusteet), joten noston,
        /// maastokohteen ja kaupungin nimiö väistää mallia. Asetus (UI) ja luku (KaupunkiMerkit, NostotKartalla) ennallaan.
        public static System.Func<IReadOnlyList<Ruutulaatikko>> Kalusteet
        {
            get => uiKalusteet == null && !Symbolimallit.KalusteitaOn ? null : KalusteetYhdessa;
            set => uiKalusteet = value;
        }
        static System.Func<IReadOnlyList<Ruutulaatikko>> uiKalusteet;
        static readonly List<Ruutulaatikko> kalusteetYhdessa = new List<Ruutulaatikko>();
        static IReadOnlyList<Ruutulaatikko> KalusteetYhdessa()
        {
            kalusteetYhdessa.Clear();
            var ui = uiKalusteet?.Invoke();
            if (ui != null) for (int i = 0; i < ui.Count; i++) kalusteetYhdessa.Add(ui[i]);
            Symbolimallit.LisaaKalusteet(kalusteetYhdessa);
            return kalusteetYhdessa;
        }
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
                kohteet[i].pohjaKorkeus = korkeudet[i];
            }
            PallonLepo.Valmistui("kaupungit");
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
                    pinta = (float3)u, pohjaKorkeus = k.korkeus,
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
            PallonLepo.Valmistui("kaupungit");
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
        /// näytetään uuden kaupungin naapurireitit. Pelitilassa (PeliOhjaaReitit) reitteihin ei kosketa.
        /// </summary>
        public void ValitseKaupunki(Sisalto.Kaupunki k)
        {
            kortti?.Piilota();
            kierto.IlmoitaKaupunki(k.id);
            if (ValintaIlmanAjoa) return;
            var r = PeliOhjaaReitit ? null : reitit;
            if (r != null)
            {
                r.Tyhjenna();
                if (valittu != null && valittu != k.id) r.Korosta(valittu, k.id);
            }
            valittu = k.id;
            kierto.Aja(k.lat, k.lon, kierto.KorkeusKaarelle(saapumisKaari), saapumisKesto, () =>
            {
                kortti?.Nayta(k);
                // Tila luetaan ajon lopussa: peli on voinut ottaa reitit haltuunsa ajon aikana.
                if (reitit != null && !PeliOhjaaReitit) { reitit.Tyhjenna(); reitit.NaytaNaapurit(k.id); }
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
            // Kehyksen hinta (Pelikoodari 25.9.): kehystä ei piirretä (Ruudunpaivitys PAIKALLAAN, 59/60) → ei ladontaa.
            // Kamera ja näkymä ovat silloin levossa, joten edellinen ladonta on voimassa; Nimikerros ohittaa samat kehykset,
            // joten yhteiset Varaukset pysyvät yhtenäisinä. Säästö levossa ~0,25 ms/kehys (kehyksen-hinta-20260925.md).
            if (!UnityEngine.Rendering.OnDemandRendering.willCurrentFrameRender) return;
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
            // Löydös 164: ruudun kalusteet kiinteinä varauksina (kuten ikonit) ennen kaupunkeja.
            var kalusteet = Kalusteet?.Invoke();
            if (kalusteet != null && kalusteet.Count > 0)
            {
                foreach (var k in kalusteet) Varaukset.Varaa(k);
                NostoIkoneita = Varaukset.Maara;
            }

            // KARTAN MITTA JA NIMIBUDJETTI (pariteetti 30.9.2026, web nimet.js nimenKarttakerroin ja nimibudjetti):
            //  - mittakerroin = NostoKerros.ZoomKerroin (saapumisnäkymän korkeus / kameran korkeus, [0,2; 64], porras
            //    1,005; sama kuin nostoilla). Vertailu on laitteen oma saapumisnäkymä (PalloKierto.SaapumisNakyma), joten
            //    perillä nimi on peruskoossa 13,5 / 15 pt; tuntematon vertailu (ei maata, rajat lataamatta) = 1.
            //  - kerroin lattiassa (0,2: kamera kaukana, maailmanäkymä) → nimet pois kuten webissä (LATTIAKERTOIMELLA
            //    LADOTTUA NIMEÄ EI NÄYTETÄ); valittavat ja lennon renkaat jäävät.
            //  - budjetti = round(40 · 20° / näkymän korkeus °) [6, 40] × liikevaran ala (NimiLadonta.Nimibudjetti).
            float zoom = LinssiTila || nk == null ? 1f : nk.ZoomKerroin;
            bool lattialla = zoom <= (float)NostoSaannot.KarttakerroinMin / 1.0025f;
            int katto = LinssiTila || valintamerkkeja > 0 || kierto == null ? int.MaxValue
                : NimiLadonta.LiikevaranKatto(NimiLadonta.Nimibudjetti(NakymanKorkeusAsteina(tanPuoli)), NimiLadonta.LiikevaraOsuus);

            // 2) Paikat ja ehdokkaat tärkeysjärjestyksessä (valintamerkit ja etuoikeutetut ensin: jarjestys, muuten merkit).
            nakyvat.Clear();
            ehdokkaat.Clear();
            foreach (var m in jarjestys.Count > 0 ? jarjestys : merkit)
            {
                // Korkeuskerroin nostaa maastoa: merkki nousee saman verran (paketin pintakorkeudesta).
                Vector3 paikka = gt.TransformPoint(m.pinta + m.normaali * KorkeusKerroin.Lisays(m.kaupunki.korkeus));
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                Vector3 normaali = gt.TransformDirection(m.normaali);
                // Aloitusportissa (PalloKierto.PorttiSumea) ei merkkejä eikä nimiöitä, kuten webin etusivupallossa.
                Vector3 ruutu = kamera.WorldToScreenPoint(paikka);
                bool edessa = (merkitNakyvat || LinssiTila) && !PalloKierto.PorttiSumea && Suodatettu(m.kaupunki.id)
                    && Vector3.Dot(normaali, kohti / etaisyys) > 0.12f
                    // Löydös 164 jatko (Fable 26.9.): kalusteen (kartussi, Liiku, pulu, yläpalkki) alle jäävä piste ja sen
                    // nimi piiloon; valittavan kaupungin merkki näkyy aina.
                    && ((m.valintamerkki && !LinssiTila) || !KalusteenAlla(kalusteet, ruutu));
                if (m.juuri.gameObject.activeSelf != edessa) m.juuri.gameObject.SetActive(edessa);
                m.oliRuudulla = m.ruudulla;
                m.ruudulla = edessa && NimiLadonta.Ruudulla(ruutu.x, ruutu.y, Screen.width, Screen.height, kerroin);
                if (!edessa) { m.lukittu = false; m.naytettiin = false; continue; }

                // Merkki siirretään näkösädettä pitkin kameraa kohti: ruudulla se pysyy
                // samassa kohdassa, mutta kaareva pinta ei enää leikkaa sen neliötä.
                float lahella = etaisyys * (1f - Etuna);
                Vector3 edusta = kt.position - kohti / etaisyys * lahella;
                // Yksi yksikkö juuren sisällä = yksi näytön piste tällä etäisyydellä.
                float mk = 2f * lahella * tanPuoli / pikseleita;
                m.juuri.SetPositionAndRotation(edusta, kt.rotation);
                m.juuri.localScale = Vector3.one * mk;

                // Lukko vapautuu vasta, kun kaupunki poistuu ruudulta (web LUKKO SÄILYY YHDEN VÄLIIN JÄÄNEEN LADONNAN YLI).
                if (ruutu.x < 0 || ruutu.y < 0 || ruutu.x > Screen.width || ruutu.y > Screen.height) m.lukittu = false;
                // Valittavan nimi näkyy aina (web kohdeElementti piirtää nimen joka merkille).
                bool valinta = m.valintamerkki && !LinssiTila;
                // Nimikyltti kartan mitassa (AsetaMitta); valittava ja linssinimet peruskoossa, lennon renkaan nimi ei
                // pienene peruskoosta (kaukaa katsottu lento, ennallaan).
                float mitta = valinta || LinssiTila ? 1f : m.etuoikeus == EtuRengas ? Mathf.Max(zoom, 1f) : zoom;
                if (mitta != m.mitta) AsetaMitta(m, mitta, kerroin);
                // Horisonttiusva (löydös 153): webin paperiusva peittää GL-pisteet ja -nimet; sumu ei koske näitä varjostimia.
                float nak = valinta ? 1f : 1f - Horisonttiusva.Peitto(1f - ruutu.y / Mathf.Max(1f, Screen.height));
                if (Mathf.Abs(nak - m.usva) > 0.01f || (nak >= 1f && m.usva < 1f))
                {
                    m.usva = nak;
                    AsetaPisteenVari(m);
                }
                var ala = NimenAla(m, ruutu, kerroin);
                var suorakulmio = new Rect(ala.x - 4 * kerroin, ala.y - 2 * kerroin, ala.width + 8 * kerroin, ala.height + 4 * kerroin);
                float pp = m.pisteKoko * kerroin * (m.korostettu ? 1.5f : 1f);
                nakyvat.Add(m);
                ehdokkaat.Add(new NimiLadonta.KaupunkiEhdokas
                {
                    Piste = Laatikko(new Rect(ruutu.x - pp * 0.5f, ruutu.y - pp * 0.5f, pp, pp)),
                    Nimio = Laatikko(suorakulmio),
                    Pakko = valinta,
                    // Siirtokohteen nimen piirtää kohdemerkki (Siirtokohdemerkit.NimeaaKaupungin): nimi kerran kuten webissä.
                    // UI-pariteetti rivi 2 (Fable 26.9., web on malli): aloitusvalinnan aikana vain valittavien nimet.
                    Sallittu = valinta || (valintamerkkeja == 0 && (nimiotNakyvat || LinssiTila) && !m.himmea
                                           && (!lattialla || m.etuoikeus == EtuRengas)
                                           && !(Siirtokohdemerkit.Instanssi?.NimeaaKaupungin(m.kaupunki.id) ?? false)),
                    X = ruutu.x, Y = ruutu.y,
                    Leveys = valinta ? 0 : m.teksti.x * m.mitta * kerroin, Korkeus = m.teksti.y * m.mitta * kerroin,
                    Kirjain = m.nimio.fontSize * m.mitta * kerroin,
                    Sivu = (pp * 0.5f + valistys * kerroin),
                    Lukittu = m.lukittu, Lukko = m.lukko,
                    OnOma = NimiLadonta.OmaPaikka(m.kaupunki.nimionAnkkuri?.tasaus, m.kaupunki.nimionAnkkuri?.dx ?? 0f,
                                                   m.kaupunki.nimionAnkkuri?.dy ?? 0f, m.nimio.fontSize * m.mitta * kerroin,
                                                   kerroin * m.mitta, out var oma), // web: lx/ly kasvavat kyltin mukana
                    Oma = oma,
                });
            }

            // 3) Pelinappula (web pinot) ja pisteet ensin, sitten nimiöt, jotka väistävät ikonit, nappulan, muiden
            //    pisteet ja aiemmat nimiöt webin ehdokaskehällä (8 suuntaa; lukittu nimi ei vaihda kylkeä).
            pinot.Clear();
            if (nappula == null) nappula = FindAnyObjectByType<Nappula>();
            if (nappula != null && !LinssiTila && nappula.Pino(kamera, kerroin, NimiLadonta.PelimerkinVara, out var pino)) pinot.Add(pino);
            NimiLadonta.LadoKaupungit(ehdokkaat, pinot, new Ruutulaatikko(0, 0, Screen.width, Screen.height), kerroin,
                                      Varaukset, naytetaan, nimenPaikat, NimiLadonta.LiikevaraOsuus * Mathf.Max(Screen.width, Screen.height),
                                      katto);
            bool levossa = kierto == null || kierto.Levossa;
            for (int i = 0; i < nakyvat.Count; i++)
            {
                var m = nakyvat[i];
                // Liikelukko: ruudulla ollut nimi pitää näkyvyytensä liikkeen ajan (kylki pysyy jo lukolla).
                bool mahtuu = NimiLadonta.LukittuNakyvyys(levossa, m.oliRuudulla, m.naytettiin, naytetaan[i]);
                m.naytettiin = mahtuu;
                if (mahtuu) naytetty++;
                if (mahtuu && naytetaan[i] && ehdokkaat[i].Leveys > 0)
                {
                    m.lukko = nimenPaikat[i];
                    m.lukittu = true;
                    AsetaNimenPaikka(m, nimenPaikat[i], kerroin);
                }
                // PEHMEÄ TULO JA LÄHTÖ (omistaja 28.9.2026; web #3540: paikannimien tulo ja lähtö 220 ms ease-in-out):
                // nimi häipyy paikallaan ja palaa nollasta; ensi näkymällä tila heti.
                float tavoite = mahtuu ? 1f : 0f;
                if (m.nimiHaive < 0f) m.nimiHaive = tavoite;
                else if (m.nimiHaive != tavoite)
                {
                    m.nimiHaive = Mathf.MoveTowards(m.nimiHaive, tavoite, Time.unscaledDeltaTime / NimenHaiveS);
                    Ruudunpaivitys.Herata(0.1f);
                }
                bool paalla = m.nimiHaive > 0.001f;
                if (m.nimio.enabled != paalla) m.nimio.enabled = paalla;
                float h = m.nimiHaive, alfa = m.nimiPeitto * m.usva * h * h * (3f - 2f * h);
                if (Mathf.Abs(m.nimio.alpha - alfa) > 0.004f) m.nimio.alpha = alfa;
            }
            Naytetty = naytetty;
        }

        /// <summary>
        /// Näkymän korkeus asteina WEBIN MITASSA (web lauta.js korkeusAst = nakyva.h · 360 / laudan leveys): kameran
        /// pystykaari 2 · h · tan(fov/2) / R, kerrottuna webin kotelon osuudella ruudun korkeudesta (natiivin kamera kattaa
        /// koko ruudun samalla mittakaavalla, Saapumisnakyma.WebinKotelo). Saapumisnäkymässä ~20° kuten webissä. 0 = tuntematon.
        /// </summary>
        float NakymanKorkeusAsteina(float tanPuoli)
        {
            double h = kierto.korkeus;
            if (!(h > 0)) return 0f;
            int pw = kamera.pixelWidth, ph = kamera.pixelHeight;
            if (pw != koteloPw || ph != koteloPh)
            {
                koteloPw = pw; koteloPh = ph;
                double k = PalloKierto.Pistekerroin, hPt = ph / k;
                var kotelo = Saapumisnakyma.WebinKotelo(pw / k, hPt);
                koteloSuhde = hPt > 0 && kotelo.H > 0 ? (float)(kotelo.H / hPt) : 1f;
            }
            return (float)math.degrees(math.min(math.PI, 2.0 * h * tanPuoli / Saapumisnakyma.Sade)) * koteloSuhde;
        }
        int koteloPw = -1, koteloPh = -1;
        float koteloSuhde = 1f;

        /// <summary>Nimen tulon ja lähdön kesto (web #3540, 220 ms smoothstep).</summary>
        const float NimenHaiveS = 0.22f;

        /// <summary>Onko ruutupiste jonkin <see cref="Kalusteet"/>-laatikon sisällä (kameran takana ei).</summary>
        static bool KalusteenAlla(IReadOnlyList<Ruutulaatikko> kalusteet, Vector3 ruutu)
        {
            if (kalusteet == null || ruutu.z <= 0f) return false;
            foreach (var k in kalusteet)
                if (ruutu.x > k.X0 && ruutu.x < k.X1 && ruutu.y > k.Y0 && ruutu.y < k.Y1) return true;
            return false;
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
                var l = NimiLadonta.NimenLaatikko(p.x, p.y, m.piirretty, m.teksti.x * m.mitta * kerroin, m.teksti.y * m.mitta * kerroin, kerroin);
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
