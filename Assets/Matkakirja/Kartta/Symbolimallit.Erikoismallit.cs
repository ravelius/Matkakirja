using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLIEN REKISTERÖINTI JA LIIKKUVAT OSAT (Mallinsepän rajapinta, proto-3d/lokit/mallinseppa-rajapinta.md;
    /// Fablen tilaus ja omistajan hyväksyntä 26.9.2026 klo 22.0x).
    ///
    /// REKISTERÖINTI: yksi tiedosto mallia kohden (Erikoismallit/&lt;Avain&gt;.cs, partial class Symbolimallit) ja siinä yksi
    /// staattinen kenttä, jonka alustus rekisteröi mallin tyypin staattisessa alustuksessa (ei muiden tiedostojen muokkausta,
    /// ei heijastusta, IL2CPP-turvallinen):
    /// <code>
    /// static readonly bool montSaintMichel = Rekisteroi("mont-saint-michel",
    ///     new Erikoismalli { Runko = MontSaintMichelRunko, Osat = MontSaintMichelOsat });
    /// </code>
    /// Avain = noston tunnisteen loppuosa (kohde:&lt;avain&gt; tai kohde:hahmotelma-&lt;avain&gt;). Sama avain kahdesti = virhe lokiin,
    /// ensimmäinen pysyy.
    ///
    /// LIIKKUVAT OSAT (Tivolin logiikka): malli kuvaa osat (<see cref="LiikkuvaOsaMaaritys"/>), Symbolimallit luo ne mallin
    /// lapsiksi Elava-layerille ja julkaisee listan <see cref="LiikkuvatOsat"/>; Linssiseppä ajaa liikkeen (Vaihtelu,
    /// ElavaKerros.Animoi). Osan lepoasento: localPosition = Pivot, localRotation = identiteetti, localScale = 1 (mallin koko
    /// periytyy juuresta). Animoija asettaa Osa.localRotation / localPosition suhteessa lepoasentoon eikä koske mallin juureen.
    /// <see cref="LiikkuvatVersio"/> kasvaa, kun osia syntyy tai katoaa (lista muuttuu); Nakyy ja Jalka päivittyvät
    /// joka kehys ilman allokaatiota.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Liikkuvan osan liike (Linssisepän animoija tulkitsee).</summary>
        public enum Liike { Kierto, Keinunta, Valahdys, Nousu, Aalto, Liuku }

        /// <summary>Liikkuvan osan kuvaus (mallitiedostossa): verkko, paikka mallin avaruudessa ja liikkeen parametrit.</summary>
        public struct LiikkuvaOsaMaaritys
        {
            /// <summary>"siivet", "savu", "lippu" …</summary>
            public string Nimi;
            /// <summary>Osan oma verkko paikallisessa avaruudessa, pivot origossa (Rakentaja → Verkko).</summary>
            public Func<Mesh> Verkko;
            /// <summary>Osan paikka mallin avaruudessa (+Y ylös, +Z pohjoinen, leveys ~1).</summary>
            public Vector3 Pivot;
            public Liike Liike;
            /// <summary>Kierto- tai keinunta-akseli (tai liu'un suunta) osan paikallisessa avaruudessa.</summary>
            public Vector3 Akseli;
            /// <summary>Kierrosta/s tai jaksoa/s.</summary>
            public float Nopeus;
            /// <summary>Keinunnan asteet tai liu'un/nousun matka mallin avaruudessa.</summary>
            public float Laajuus;
            /// <summary>Vaihtelun käynnin ja tauon keskiarvot (s); siemen noston id:stä.</summary>
            public float KayS, TaukoS;
        }

        /// <summary>Erikoismallin rekisteröinti: runko (LOD0), liikkuvat osat (voi olla null) ja LOD1 (valinnainen).</summary>
        public sealed class Erikoismalli
        {
            public Func<Mesh> Runko;
            public Func<LiikkuvaOsaMaaritys[]> Osat;
            /// <summary>Valinnainen; taso 1 piirtää toistaiseksi LOD0:n (kynnys 2,5, koko enintään 40 pt).</summary>
            public Func<Mesh> Lod1;
            /// <summary>
            /// Valinnainen LÄHITASO (omistaja 27.9. klo 08.0x): tarkempi verkko lähizoomiin (kartan kerroin ≥ LahiKerroin), enintään
            /// LahiEnintaan (3) lähintä mallia kerrallaan; muut piirtävät Rungon. Budjetti ≤ LahiKatto kolmiota.
            /// </summary>
            public Func<Mesh> Lahi;
            /// <summary>Valinnainen kolmioarvio (tarkistukseen; oikea luku `symbolit tila` -rivillä).</summary>
            public int Kolmiot0;
            /// <summary>
            /// Ruutukoko suhteessa tason 1 malliin (<see cref="KokoNyt"/>). Omistajan hyväksymä esitys 21.5x: erikoismalli
            /// 1,5 × kategoriasymboli (≈ 60 pt), löydös 175c: enintään 40 pt; oletus 1 = 175c, Mallinseppä asettaa mallikohtaisesti.
            /// </summary>
            public float KokoKerroin = 1f;
            /// <summary>
            /// Kaupungin maamerkki (Mallinseppä 27.9., Fablen vaihtoehto A): kaupunkimerkin id (esim. "rooma"). Malli piirretään
            /// kaupunkipisteen vasemmalle puolelle lähizoomissa (kerroin ≥ 2,5, kallistus kuten tasolla 1), vaikka nostoa ei
            /// olisi pääkartalla; jos saman avaimen nosto on näkyvissä, se voittaa. null = tavallinen noston erikoismalli.
            /// </summary>
            public string Kaupunki;
        }

        /// <summary>Yksi näkyvä liikkuva osa kartalla (Linssisepän animoijalle).</summary>
        public sealed class LiikkuvaOsa
        {
            /// <summary>Noston id (Vaihtelun siemen).</summary>
            public string Id { get; internal set; }
            /// <summary>Erikoismallin avain, esim. "mont-saint-michel".</summary>
            public string Avain { get; internal set; }
            public LiikkuvaOsaMaaritys Maaritys { get; internal set; }
            /// <summary>Osan Transform (mallin lapsi, Elava-layer); lepoasento localPosition = Maaritys.Pivot.</summary>
            public Transform Osa { get; internal set; }
            /// <summary>Mallin juuri maailmassa (maan pinnalla): lähimmät ruudun keskeltä tämän mukaan.</summary>
            public Vector3 Jalka { get; internal set; }
            /// <summary>Malli näkyy (kynnys, kallistus, pallon etupuoli, ei lentoa/linssiä/porttia).</summary>
            public bool Nakyy { get; internal set; }
            internal MeshRenderer renderoija;
        }

        static Dictionary<string, Erikoismalli> mallit;
        /// <summary>Rekisteröidyt erikoismallit avaimella (luodaan ensimmäisessä rekisteröinnissä: kenttien alustusjärjestys
        /// partial-tiedostojen välillä ei ole määrätty).</summary>
        static Dictionary<string, Erikoismalli> Mallit => mallit ??= new Dictionary<string, Erikoismalli>(StringComparer.Ordinal);

        /// <summary>Rekisteröi erikoismallin avaimella (kutsutaan staattisen kentän alustuksessa, ks. luokan kuvaus).</summary>
        static bool Rekisteroi(string avain, Erikoismalli malli)
        {
            if (string.IsNullOrEmpty(avain) || malli == null || malli.Runko == null)
            {
                Debug.LogError($"MATKAKIRJA symbolimallit: virheellinen erikoismalli '{avain}'");
                return false;
            }
            if (Mallit.ContainsKey(avain))
            {
                Debug.LogError($"MATKAKIRJA symbolimallit: erikoismalli '{avain}' rekisteröity kahdesti");
                return false;
            }
            Mallit[avain] = malli;
            return true;
        }

        // Kreikan erikoismallit (Symbolimallit.cs) samalla kaavalla.
        static readonly bool akropolis = Rekisteroi("akropolis", new Erikoismalli { Runko = Akropolis });
        static readonly bool delfoi = Rekisteroi("delfoi", new Erikoismalli { Runko = Delfoi });
        static readonly bool meteora = Rekisteroi("meteora", new Erikoismalli { Runko = Meteora });

        // ---- Kaupunkien maamerkit (Erikoismalli.Kaupunki) ----

        /// <summary>Väli kaupunkipisteen ja maamerkin reunan välillä (pt).</summary>
        const float MaamerkkiValiPt = 8f;
        const string MaamerkkiEtuliite = "maamerkki:";
        static bool OnMaamerkki(string id) => id != null && id.StartsWith(MaamerkkiEtuliite, StringComparison.Ordinal);

        /// <summary>Maamerkkien näennäiset nostot (luodaan kerran, kun kaupungin paikka tunnetaan).</summary>
        readonly Dictionary<string, NostoKerros.Nosto> maamerkit = new Dictionary<string, NostoKerros.Nosto>(StringComparer.Ordinal);
        List<(string avain, string id, string kaupunki)> maamerkkiLista;

        void PaivitaMaamerkit(NostoKerros nk)
        {
            if (maamerkkiLista == null)
            {
                maamerkkiLista = new List<(string, string, string)>();
                foreach (var p in Mallit)
                    if (!string.IsNullOrEmpty(p.Value.Kaupunki)) maamerkkiLista.Add((p.Key, MaamerkkiEtuliite + p.Key, p.Value.Kaupunki));
            }
            if (maamerkkiLista.Count == 0 || nk.merkit == null) return;
            foreach (var (avain, id, kaupunki) in maamerkkiLista)
            {
                if (ErikoismalliPiirretty(avain)) continue;
                if (!maamerkit.TryGetValue(id, out var s))
                {
                    if (!nk.merkit.Paikka(kaupunki, out var la, out var lo)) continue;
                    s = new NostoKerros.Nosto { Id = id, Tunnus = avain, Nimi = avain, Taso = 1, OmaLat = la, OmaLon = lo, Lat = la, Lon = lo, Loydetty = true,
                                                Maa = nk.merkit.KaupunginMaa(kaupunki) };
                    maamerkit[id] = s;
                }
                var tieto = TietoNostolle(s);
                if (!KulmaSallii(tieto)) continue;
                nyt.Add(id);
                Paivita(tieto, s);
            }
        }

        // ---- Erikoismalli kaupungin vieressä (omistaja 28.9. klo 17.4x Päätoimittajan kautta: "jos erikoissymboli on
        // kohdekaupungissa, se pitää siirtää hieman sen viereen") ----

        /// <summary>
        /// Kaupungissa oleva erikoismalli piirretään kaupunkipisteen viereen, ettei se peitä kaupungin pistettä eikä nimeä
        /// (komento `symbolit sivuun 0|1`; 0 = 1.0.37: malli omalla paikallaan, maamerkki idän suuntaan).
        /// Kiinteä sivusuunta: ruudun vasen (kaupungin nimiö on oletuksena oikealla ja väistää mallia kalusteena), mallin
        /// lähin reuna SymbolienVaisto.SivuValiPt pisteen päässä kaupunkipisteen keskeltä, eikä liioiteltu perspektiivi
        /// kallista mallia kaupungin päälle.
        /// </summary>
        public static bool SivuunSaanto = true;

        /// <summary>
        /// Onko noston erikoismalli kaupungissa: kaupungin maamerkki (paikka on kaupunkipiste), kaupunki itse (esim. Visby:
        /// kaupunkimerkki jää näkyviin ja malli sen viereen) tai enintään SymbolienVaisto.SivuSadeKm kaupunkipisteestä
        /// (KaupunkiMerkit). Tulos Tietoon; "ei" tallennetaan vasta, kun kaupungit ovat latautuneet.
        /// </summary>
        static bool Sivuun(Tieto t, NostoKerros.Nosto s)
        {
            if (t == null || t.Erikois == null) return false;
            if (t.Sivu != 0) return t.Sivu == 2;
            if (OnMaamerkki(s.Id)) return AsetaSivu(t, s.OmaLat, s.OmaLon, s.Maa);
            if (t.KaupunkiNosto) return AsetaSivu(t, s.Lat, s.Lon, s.Maa);   // kaupunkimerkin piirtopiste
            var merkit = NostoKerros.Instanssi != null ? NostoKerros.Instanssi.merkit : null;
            if (merkit == null || !KaupungitLadattu(merkit)) return false;
            string id = merkit.LahinId(s.OmaLat, s.OmaLon, SymbolienVaisto.SivuSadeKm / 111.2);
            if (id != null && merkit.Paikka(id, out double la, out double lo)) return AsetaSivu(t, la, lo, merkit.KaupunginMaa(id) ?? s.Maa);
            t.Sivu = 1;
            return false;
        }

        static bool AsetaSivu(Tieto t, double lat, double lon, string maa)
        {
            t.SivuLat = lat; t.SivuLon = lon; t.SivuMaa = maa; t.Sivu = 2;
            return true;
        }

        static bool KaupungitLadattu(KaupunkiMerkit m)
        {
            foreach (var _ in m.Kaupungit()) return true;
            return false;
        }

        /// <summary>
        /// Jalka kaupunkipisteen (k.Paikka) vasemmalle ruudulla (A/B `symbolit maalla 0`, 0ff66cfc): kameran oikea projisoituna
        /// pinnan tasoon, siirto = mallin ulottuma siihen suuntaan + väli pisteinä (koko / pt = paikallisia yksiköitä ruudun
        /// pisteessä mallin etäisyydellä). <paramref name="kohtiKaupunkia"/> = suunta jalasta kaupunkiin (perspektiivin kallistus).
        /// </summary>
        Vector3 SivuunJalka(Kappale k, float koko, float pt, out Vector3 kohtiKaupunkia)
        {
            Vector3 oikea = Vector3.ProjectOnPlane(georeferenssi.transform.InverseTransformDirection(kamera.transform.right), k.Normaali);
            if (oikea.sqrMagnitude < 1e-10f) oikea = k.Asento * Vector3.right;   // rappeutunut: itä
            Vector3 vasen = -oikea.normalized;
            kohtiKaupunkia = -vasen;
            Vector3 dl = Quaternion.Inverse(k.Asento) * vasen;
            return k.Paikka + vasen * SymbolienVaisto.SivuSiirto(dl.x, dl.z, k.Puoli.x, k.Puoli.y, koko, koko / Mathf.Max(1e-3f, pt));
        }

        // ---- Kaupungin vieressä AINA MAALLA (omistaja 28.9. klo 19.1x: Colosseum oli "puoleksi meressä") ----

        /// <summary>
        /// Maalle: suunta kaupunkipisteestä valitaan kerran kaupungin maamaskista (Maamaski, Karttasepän GSHHG-polygonit) 16
        /// ilmansuunnasta niin, että mallin pohja on maalla kaukaa (tason 1 kynnys, suurin koko maailmassa) ja läheltä
        /// kallistettuna (SymbolienVaisto kohta 7); lähes yhtä hyvistä lännen puoleisin. Suunta on kiinteä maailmassa, joten malli
        /// ei hypi. Pienellä saarella (Visby) paras mahdollinen osuus. Ilman maskia (verkko) länsi. `symbolit maalla 0|1`.
        /// </summary>
        public static bool MaallaSaanto = true;

        sealed class MaallaSuunta
        {
            public bool Valmis, Aloitettu;
            public float Atsimuutti = 270f, Maalla = -1f;
        }
        readonly Dictionary<string, MaallaSuunta> maallaSuunnat = new Dictionary<string, MaallaSuunta>(StringComparer.Ordinal);

        /// <summary>Noston suunta maalle; ensimmäinen kutsu käynnistää laskennan (maski + taustasäie), Valmis kertoo tuloksen.</summary>
        MaallaSuunta MaallaSuuntaNostolle(string id, Tieto t, Kappale k)
        {
            if (!maallaSuunnat.TryGetValue(id, out var m)) maallaSuunnat[id] = m = new MaallaSuunta();
            if (m.Valmis || m.Aloitettu) return m;
            var nk = NostoKerros.Instanssi;
            if (nk == null || !(nk.SaapumisKorkeusM > 0) || kamera == null) return m;   // mittakaava ei vielä tiedossa
            m.Aloitettu = true;
            StartCoroutine(LaskeMaalla(id, t, k.Puoli, m));
            return m;
        }

        IEnumerator LaskeMaalla(string id, Tieto t, Vector2 puoli, MaallaSuunta tulos)
        {
            Maamaski.Lahde lahde = null;
            if (!string.IsNullOrEmpty(t.SivuMaa)) yield return Maamaski.Hae(t.SivuMaa, x => lahde = x);
            if (lahde == null)
            {
                Debug.LogWarning($"MATKAKIRJA symbolimallit: {id}: maamaski puuttuu ({t.SivuMaa ?? "maa tuntematon"}), kaupungin viereen länteen");
                tulos.Valmis = true;
                yield break;
            }
            // Mittakaava pääsäikeessä: km yhdessä ruudun pisteessä kertoimella k (katsepisteen etäisyys saapuminen / k, FOV).
            var nk = NostoKerros.Instanssi;
            double saapuminen = nk != null ? nk.SaapumisKorkeusM : 0, tan = Math.Tan(kamera.fieldOfView * 0.5 * Math.PI / 180);
            double korkeusPt = Math.Max(1.0, Screen.height / Math.Max(1e-3, (double)PalloKierto.Pistekerroin));
            double KmPisteessa(double kerroin) => 2.0 * saapuminen / Math.Max(1e-6, kerroin) * tan / korkeusPt / 1000.0;
            float kk = t.Erikois != null && Mallit.TryGetValue(t.Erikois, out var em) ? em.KokoKerroin : 1f;
            var (k0, k1) = KokoValit();
            float pt0 = KokoNyt(k0) * kk * Iso;
            float pt1 = SymbolienVaisto.RuutuKoko(KokoNyt(k1) * kk * Iso, k1, k0, 1, 1, Luonnollinen ? 1 : 0, LisaKasvu, kattoPtNyt);
            var tasot = new[]
            {
                new SymbolienVaisto.MaallaTaso(pt0 * KmPisteessa(k0), KmPisteessa(k0)),
                new SymbolienVaisto.MaallaTaso(pt1 * KmPisteessa(k1), KmPisteessa(k1)),
            };
            double lat = t.SivuLat, lon = t.SivuLon;
            (float a, float osuus) tulokset = (270f, -1f);
            var tehtava = System.Threading.Tasks.Task.Run(() =>
            {
                // Rasteri kaupungin ympärille: suurin siirto + pohjan ulottuma, 256 × 256 (maa 255, järvet ja meri 0).
                double r = 0;
                foreach (var ta in tasot)
                    r = Math.Max(r, SymbolienVaisto.SivuSiirto(1f, 1f, puoli.x, puoli.y, (float)ta.YksikkoKm, (float)ta.KmPisteessa)
                                    + 1.5 * Math.Max(puoli.x, puoli.y) * ta.YksikkoKm);
                double dLat = Math.Min(8.0, r / 111.2 + 0.05), dLon = Math.Min(12.0, dLat / Math.Max(0.05, Math.Cos(lat * Math.PI / 180)));
                const int n = 256;
                var kartta = Maamaski.Rasteroi(lahde, n, n, lon - dLon, lat + dLat, 2 * dLon, 2 * dLat);
                bool OnMaata(double la, double lo)
                {
                    int x = (int)Math.Floor((lo - (lon - dLon)) / (2 * dLon) * n), y = (int)Math.Floor((lat + dLat - la) / (2 * dLat) * n);
                    return x >= 0 && y >= 0 && x < n && y < n && kartta[y * n + x] > 127;
                }
                tulokset = SymbolienVaisto.ValitseMaallaSuunta(OnMaata, lat, lon, puoli.x, puoli.y, tasot);
            });
            while (!tehtava.IsCompleted) yield return null;
            if (tehtava.IsFaulted) Debug.LogWarning($"MATKAKIRJA symbolimallit: {id}: maalle-laskenta kaatui: {tehtava.Exception?.GetBaseException().Message}");
            else { tulos.Atsimuutti = tulokset.a; tulos.Maalla = tulokset.osuus; }
            tulos.Valmis = true;
            Debug.Log($"MATKAKIRJA symbolimallit: {id} kaupungin viereen suuntaan {tulos.Atsimuutti:0}° (maalla {Math.Max(0, tulos.Maalla):P0})");
            PallonLepo.Muuttui("symbolimallit: maalle");
        }

        /// <summary>
        /// Jalka kaupunkipisteestä ilmansuuntaan <paramref name="atsimuutti"/> (0 = pohjoinen, 90 = itä; mallin +Z pohjoinen, +X itä):
        /// siirto = mallin ulottuma siihen suuntaan + väli pisteinä kuten SivuunJalka.
        /// </summary>
        Vector3 SivuunJalkaSuuntaan(Kappale k, float koko, float pt, float atsimuutti, out Vector3 kohtiKaupunkia)
        {
            float a = atsimuutti * Mathf.Deg2Rad;
            var paikallinen = new Vector3(Mathf.Sin(a), 0f, Mathf.Cos(a));
            Vector3 suunta = k.Asento * paikallinen;
            kohtiKaupunkia = -suunta;
            return k.Paikka + suunta * SymbolienVaisto.SivuSiirto(paikallinen.x, paikallinen.z, k.Puoli.x, k.Puoli.y, koko, koko / Mathf.Max(1e-3f, pt));
        }

        // ---- Erikoismallit kartan paletissa (omistaja 28.9. klo 19.1x: "kokonaan erivärinen kuin mikään ympärillä oleva") ----

        /// <summary>
        /// Erikoismallit seepiarampilla kuten kategoriasymbolit ja 2D-merkit (Symbolimalli-varjostimen kohta 8: kärjen alfa 0 →
        /// valoisuus muste #3b2f22 → seepia #8a6a44 → paperi #efe4cc, kiinteä valo vasemmalta ylhäältä; ei harmaata eikä
        /// sinistä). Koskee runkoa, lähitasoa ja liikkuvia osia, kaikkia 18 mallia. `symbolit seepia 0|1` (0 = 0ff66cfc:n värit).
        /// </summary>
        public static bool ErikoisSeepia = true;

        /// <summary>Kärkivärien alfa seepiaramppiin (0) tai tavalliseen valaistukseen (1); palauttaa saman verkon.</summary>
        static Mesh Seepiaksi(Mesh m, bool? seepia = null)
        {
            if (m == null) return null;
            var c = new List<Color>();
            m.GetColors(c);
            if (c.Count == 0) return m;
            float a = (seepia ?? ErikoisSeepia) ? 0f : 1f;
            for (int i = 0; i < c.Count; i++) { var v = c[i]; v.a = a; c[i] = v; }
            m.SetColors(c);
            return m;
        }

        /// <summary>A/B: seepia päälle tai pois jo rakennetuille erikoismallien verkoille (runko, lähitaso, osat).</summary>
        void AsetaSeepia(bool paalla)
        {
            ErikoisSeepia = paalla;
            foreach (var v in verkot.Values) Seepiaksi(v, paalla);
            foreach (var p in lahiVerkot) if (p.Key.StartsWith("e:", StringComparison.Ordinal)) Seepiaksi(p.Value, paalla);
            foreach (var v in osaVerkot.Values) Seepiaksi(v, paalla);
            PallonLepo.Muuttui("symbolimallit: seepia");
        }

        /// <summary>
        /// Kaupungin viereen siirretyn noston erikoismallin jalka ruudulla (pikseleinä, origo vasen ala kuten Nosto.Ruutu):
        /// Natiivi-UI siirtää noston merkin (napautus ja nimiö) mallin kohdalle. Epätosi, jos mallia ei ole siirretty tai nosto
        /// on itse kaupunki (kaupunkimerkki pysyy paikallaan) tai maamerkki (ei merkkiä).
        /// </summary>
        public static bool SiirrettyPiste(string nostoId, out Vector2 ruutu)
        {
            ruutu = default;
            if (instanssi == null || instanssi.kamera == null || nostoId == null || OnMaamerkki(nostoId)) return false;
            if (!instanssi.kappaleet.TryGetValue(nostoId, out var k) || !k.SivuunNyt || !k.R.enabled) return false;
            if (tiedot.TryGetValue(nostoId, out var t) && t.KaupunkiNosto) return false;
            Vector3 r = instanssi.kamera.WorldToScreenPoint(k.JalkaMaailma);
            if (r.z <= 0f) return false;
            ruutu = new Vector2(r.x, r.y);
            return true;
        }

        /// <summary>`symbolit tila`: kaupunkien viereen siirretyt erikoismallit (" (vieressä: visby, maamerkki:colosseum)").</summary>
        string SivuunTila()
        {
            int n = 0;
            var sb = new System.Text.StringBuilder();
            foreach (var p in kappaleet)
            {
                if (!p.Value.SivuunNyt || !p.Value.R.enabled) continue;
                sb.Append(n++ == 0 ? " (vieressä: " : ", ");
                int i = p.Key.LastIndexOf(':');
                sb.Append(OnMaamerkki(p.Key) || i < 0 ? p.Key : p.Key.Substring(i + 1));
                if (MaallaSaanto && maallaSuunnat.TryGetValue(p.Key, out var m) && m.Valmis)
                    sb.Append($" {m.Atsimuutti:0}° maalla {Math.Max(0f, m.Maalla):P0}");
            }
            if (n > 0) sb.Append(')');
            return sb.ToString();
        }

        /// <summary>Piirretäänkö saman avaimen erikoismalli tällä kehyksellä jo oikean noston kautta.</summary>
        bool ErikoismalliPiirretty(string avain)
        {
            foreach (var id in nyt)
                if (!OnMaamerkki(id) && tiedot.TryGetValue(id, out var t) && t.Erikois == avain) return true;
            return false;
        }

        static readonly List<LiikkuvaOsa> liikkuvat = new List<LiikkuvaOsa>();
        /// <summary>Kartalle luodut liikkuvat osat (kaikki, myös piilossa olevat: katso Nakyy).</summary>
        public static IReadOnlyList<LiikkuvaOsa> LiikkuvatOsat => liikkuvat;
        /// <summary>Kasvaa, kun <see cref="LiikkuvatOsat"/> muuttuu (osia syntyy tai katoaa).</summary>
        public static int LiikkuvatVersio { get; private set; }

        /// <summary>Liikkuvien osien verkot avaimella ja osan nimellä (jaettu nostojen kesken kuten rungot).</summary>
        static readonly Dictionary<string, Mesh> osaVerkot = new Dictionary<string, Mesh>(StringComparer.Ordinal);
        /// <summary>Noston liikkuvat osat (tyhjä taulukko, jos mallissa ei ole osia).</summary>
        readonly Dictionary<string, LiikkuvaOsa[]> osatNostolla = new Dictionary<string, LiikkuvaOsa[]>(StringComparer.Ordinal);
        static readonly LiikkuvaOsa[] eiOsia = new LiikkuvaOsa[0];

        static void NollaaLiikkuvat()
        {
            liikkuvat.Clear(); osaVerkot.Clear(); LiikkuvatVersio++;
        }

        /// <summary>Luo mallin liikkuvat osat mallin lapsiksi (kerran noston id:llä).</summary>
        LiikkuvaOsa[] LuoOsat(string id, string avain, Transform juuri)
        {
            if (osatNostolla.TryGetValue(id, out var olemassa)) return olemassa;
            var maaritykset = avain != null && Mallit.TryGetValue(avain, out var m) && m.Osat != null ? m.Osat() : null;
            if (maaritykset == null || maaritykset.Length == 0) { osatNostolla[id] = eiOsia; return eiOsia; }
            var osat = new LiikkuvaOsa[maaritykset.Length];
            int layer = ElavaKerros.Taso;
            for (int i = 0; i < maaritykset.Length; i++)
            {
                var d = maaritykset[i];
                string vk = avain + "/" + d.Nimi;
                if (!osaVerkot.TryGetValue(vk, out var verkko)) osaVerkot[vk] = verkko = d.Verkko != null ? Seepiaksi(d.Verkko()) : null;
                var go = new GameObject("Osa-" + d.Nimi);
                if (layer >= 0) go.layer = layer;
                go.transform.SetParent(juuri, false);
                go.transform.localPosition = d.Pivot;
                go.AddComponent<MeshFilter>().sharedMesh = verkko;
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = materiaali;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
                r.enabled = false;
                osat[i] = new LiikkuvaOsa { Id = id, Avain = avain, Maaritys = d, Osa = go.transform, renderoija = r };
                liikkuvat.Add(osat[i]);
            }
            osatNostolla[id] = osat;
            LiikkuvatVersio++;
            return osat;
        }

        /// <summary>Osien näkyvyys ja jalka mallin mukaan (ei allokaatioita).</summary>
        static void PaivitaOsat(LiikkuvaOsa[] osat, bool nakyy, Vector3 jalka)
        {
            for (int i = 0; i < osat.Length; i++)
            {
                var o = osat[i];
                if (o.Nakyy != nakyy) { o.Nakyy = nakyy; o.renderoija.enabled = nakyy; }
                if (nakyy) o.Jalka = jalka;
            }
        }

        /// <summary>Himmeys (löytämätön) myös osille samalla lohkolla kuin rungolle.</summary>
        static void HimmennaOsat(LiikkuvaOsa[] osat, MaterialPropertyBlock lohko)
        {
            for (int i = 0; i < osat.Length; i++) osat[i].renderoija.SetPropertyBlock(lohko);
        }

        void OnDestroy()
        {
            // Kappaleet ovat tämän lapsia ja tuhoutuvat mukana: lista tyhjäksi, ettei animoija viittaa tuhottuihin.
            if (liikkuvat.Count > 0) { liikkuvat.Clear(); LiikkuvatVersio++; }
        }
    }
}
