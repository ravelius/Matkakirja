using System;
using System.Collections.Generic;
using System.Globalization;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// 3D-SYMBOLINOSTOT (omistajan löydös 160, suunnitelma proto-3d/lokit/suunnitelma-160-3d-symbolinostot.md hyväksytty
    /// 26.9.2026; build 21 -prototyyppi): nostot kartalla liioitellun kokoisina low-poly-malleina.
    /// Omat mallit koodina (ei tiedostoja, ei tekstuureja, ei PD/CC-sekamalleja): yksi materiaali, kärkivärit Sisältökirjurin
    /// vari2-paletista (pinta #c8b898, valo #e8d8b8, varjo #887858, sage #7a9a92, terrakotta #b8785e), tasavarjostus.
    /// Erikoismallit: Akropolis, Delfoi ja Meteora (GRC taso 1, Pelikoodarin lista lokit/loydos160-arkkityypit.txt).
    ///
    /// TASO 1: erikoismalli voittaa, muuten arkkityyppi (ArkkityyppiKartoitus, Symbolimallit.Arkkityypit.cs, LOD0), joten
    /// jokainen tason 1 nosto saa 3D-mallin. Piirto kuten prototyypissä: oma MeshRenderer noston mukaan, koko
    /// <see cref="KokoPt"/>.
    /// TASOT 2–3 (omistajan linjaus 26.9. kohta 11): pienet arkkityypit GPU-instansseina, ks. Symbolimallit.Tasot23.cs.
    ///
    /// NÄKYVYYS: malli näkyy, kun sen nosto on NostoKerroksen näytettävissä (samat säännöt kuin 155:n kuvamerkeillä: taso 1
    /// aina), pystyssä pinnan normaalin suuntaan, pohjoinen = mallin +Z, koko vakio ruudulla (<see cref="KokoPt"/>) kuten
    /// KaupunkiMerkit. Löytämätön himmeänä (pergamentti, 70 %). Horisonttiusva kuten 153:n nostoilla. Piilossa lennon, linssin
    /// ja aloitusportin aikana sekä pallon takana. Natiivi-UI piilottaa 2D-kuvamerkin, kun <see cref="OnMalli"/> on tosi.
    /// Kolmiobudjetti enintään 1 500 mallia kohden (erikoismallit), arkkityypit 600/150 (LOD0/LOD1).
    /// Komennot `symbolit tila|pois|paalle|loydetty|himmea|koko pt|taso23 0|1|ylhaalta 3d|2d|iso aste|reuna pt|kategoriat 1|0`.
    ///
    /// KATEGORIASYMBOLIT (omistajan korjaus 26.9. klo 21.5x, sitova): 3D-nostot ovat NOSTOT-paneelin kategoriasymbolit
    /// reliefeinä (Symbolimallit.Kategoriat.cs, KategoriaKartoitus). Järjestys: erikoismalli voittaa aina, sitten
    /// kategoriasymboli, jos sen reliefi on rakennettu (tämä erä: Kaari = historia, Vuori = luonto: vuori), muuten
    /// arkkityyppi kuten ennen. Reliefit näkyvät kokeilussa myös pystysuorasta kamerasta (<see cref="YlhaaltaKelpaa"/>),
    /// ja niiden +Z käännetään ruudun ylös-suuntaan (<see cref="KategoriaRuutuYlos"/>).
    ///
    /// 1.0.27-KOKEILU (omistaja 26.9. klo 21.3x: "Paras ratkaisu olisi, jos 3D-mallit näyttäisivät järkevältä myös ylhäältä
    /// päin"; Linssisepän tyyliohje A–E): Linna, Kirkko ja Majakka näkyvät 3D:nä myös pystysuorasta kamerasta
    /// (<see cref="Ylhaalta3D"/>), mallit kallistuvat itse <see cref="IsoAste"/> astetta poispäin katsojasta, kun kamera on
    /// lähes pystysuora (häivytys kameran kallistuksella 25–35°), ja jokaisella mallilla on ylhäältäkin näkyvä ääriviiva
    /// (<see cref="ReunaPt"/>, varjostimen kohta 6). Maakontakti siirtyy kaakkoon (PohjaSiirto). `symbolit ylhaalta 2d` palauttaa
    /// 1.0.26:n säännön (kaikki mallit vasta kallistuksesta 25°, ei omaa kallistusta), jotta kuvapari saadaan samasta käännöksestä.
    /// </summary>
    [DefaultExecutionOrder(120)]   // NostoKerroksen jälkeen: näytettävät tältä kehykseltä
    public sealed partial class Symbolimallit : MonoBehaviour
    {
        /// <summary>
        /// Tason 1 mallin leveys ruudulla (pt) lähikuvassa (kerroin ≥ <see cref="KokoTaysiKerroin"/>). Löydös 175 (omistaja
        /// 26.9. 1.0.25: 90 pt vakiona oli maatasolla maakuntien kokoinen ja peitti nimistön): koko kasvaa zoomin mukana
        /// kynnyksen <see cref="KokoKynnysPt"/>:stä tähän, enintään kaupunkinimiön leveys (komento `symbolit koko pt`).
        /// Löydös 175c (Linssiseppä): 44 → 40 pt, enintään 2,5 × kaupunkinimiön fonttikoko eikä koskaan nimeä leveämpi.
        /// </summary>
        public static float KokoPt = 40f;
        /// <summary>Tason 1 mallin leveys (pt) 155:n kynnyksellä (kerroin 2,5), josta mallit alkavat näkyä (löydös 175).</summary>
        public static float KokoKynnysPt = 22f;
        /// <summary>Kartan kerroin, jolla malli on täysikokoinen (<see cref="KokoPt"/>).</summary>
        public const double KokoTaysiKerroin = 6.0;

        /// <summary>Tason 1 mallin ruutukoko kartan kertoimella (tasot 2–3 kertovat tämän Taso2Koko/Taso3Koko:lla).</summary>
        public static float KokoNyt(double kerroin)
        {
            double u = (kerroin - NostoSaannot.TyyppimerkinKerroin) / (KokoTaysiKerroin - NostoSaannot.TyyppimerkinKerroin);
            return Mathf.Lerp(KokoKynnysPt, KokoPt, Mathf.Clamp01((float)u));
        }

        /// <summary>
        /// Tason 1 mallit vasta 155:n kynnyksellä kuten tasot 2–3 (löydös 175): sen alla Natiivi-UI piirtää lajin 2D-symbolin
        /// (OnMalli epätosi), ei 3D-mallia.
        /// </summary>
        static bool Taso1Zoom()
        {
            var nk = NostoKerros.Instanssi;
            return nk != null && nk.ZoomKerroin >= NostoSaannot.TyyppimerkinKerroin;
        }

        /// <summary>Tason 1 noston malli nyt: zoom-kynnys ja kallistus (kokeilussa Linna/Kirkko/Majakka myös ylhäältä).</summary>
        static bool Taso1Kaytossa(Tieto t) => Taso1Zoom() && KulmaSallii(t);

        /// <summary>Kallistusraja (astetta): pystysuorasta näkyy vain katto, joten sen alla lajin 2D-symboli (Fable 175).
        /// Kokeilussa (<see cref="Ylhaalta3D"/>) raja ei koske arkkityyppejä Linna, Kirkko ja Majakka.</summary>
        public static float KallistusRajaAste = 25f;

        // ---- 1.0.27-kokeilu: mallit ylhäältä (komennot `symbolit ylhaalta 3d|2d`, `symbolit iso <aste>`, `symbolit reuna <pt>`) ----

        /// <summary>3d (oletus kokeiluhaarassa): Linna, Kirkko ja Majakka 3D:nä myös pystysuorasta ja mallien oma kallistus
        /// käytössä; 2d = 1.0.26:n sääntö (kaikki mallit vasta kallistuksesta <see cref="KallistusRajaAste"/>).</summary>
        public static bool Ylhaalta3D = true;
        /// <summary>Mallin oma kallistus (astetta) pystysuorassa kamerassa: ruudun vaaka-akselin ympäri, pivot mallin pohjassa,
        /// yläpää poispäin katsojasta, jolloin etujulkisivu ja katto näkyvät. 0 = pois.</summary>
        public static float IsoAste = 15f;
        /// <summary>Oma kallistus täysi kameran kallistukseen <see cref="IsoHaivytysAlku"/> asti ja nolla kohdasta
        /// <see cref="IsoHaivytysLoppu"/> (smootherstep välissä, kuten kamera-ajojen Kamerakayrat.Pehmea).</summary>
        public const float IsoHaivytysAlku = 25f, IsoHaivytysLoppu = 35f;
        /// <summary>Ääriviivan leveys ruudulla (pt), vakio mallin koosta riippumatta (myös LOD1); 0 = ei ääriviivaa.</summary>
        public static float ReunaPt = 1.2f;

        /// <summary>Näkyykö malli kokeilussa myös pystysuorasta kamerasta: arkkityypeistä vain Linna, Kirkko ja Majakka
        /// (Linssisepän tyyliohje E) ja kaikki kategoriasymbolit (reliefi on tehty luettavaksi ylhäältä).</summary>
        static bool YlhaaltaKelpaa(Tieto t) =>
            Ylhaalta3D && t != null && t.Erikois == null
            && (KayttaaSymbolia(t) || t.Tyyppi == Arkkityyppi.Linna || t.Tyyppi == Arkkityyppi.Kirkko || t.Tyyppi == Arkkityyppi.Majakka);

        /// <summary>Salliiko kameran kallistus noston mallin: kallistettu näkymä tai kokeilun kolme arkkityyppiä.</summary>
        static bool KulmaSallii(Tieto t) => Kallistettu() || YlhaaltaKelpaa(t);

        /// <summary>Mallin oma kallistus nyt (astetta): <see cref="IsoAste"/> häivytettynä kameran kallistuksen mukaan.</summary>
        static float IsoNyt()
        {
            if (!Ylhaalta3D || IsoAste <= 0f || instanssi == null || instanssi.kierto == null) return 0f;
            float t = Mathf.Clamp01(((float)instanssi.kierto.KaytettyKallistus - IsoHaivytysAlku) / (IsoHaivytysLoppu - IsoHaivytysAlku));
            return IsoAste * (1f - t * t * t * (t * (t * 6f - 15f) + 10f));
        }

        /// <summary>
        /// Mallin oma kallistus kiertona georeferenssin paikallisessa avaruudessa (kerrotaan asennon eteen): pinnan normaali
        /// kääntyy ruudun ylöspäin osoittavan maan suunnan (kameran ylös projisoituna tangenttitasoon) puoleen, eli akseli on
        /// ruudun vaaka-akseli ja yläpää kallistuu poispäin katsojasta. Pivot on mallin origo (pohjan keskipiste).
        /// </summary>
        Quaternion IsoKierto(Vector3 normaali, float aste)
        {
            if (aste <= 0.01f) return Quaternion.identity;
            Vector3 ylos = georeferenssi.transform.InverseTransformDirection(kamera.transform.up);
            Vector3 u = ylos - normaali * Vector3.Dot(ylos, normaali);
            if (u.sqrMagnitude < 1e-8f) return Quaternion.identity;
            u.Normalize();
            float r = aste * Mathf.Deg2Rad;
            return Quaternion.FromToRotation(normaali, normaali * Mathf.Cos(r) + u * Mathf.Sin(r));
        }

        /// <summary>
        /// Kategoriasymbolin asento (<see cref="KategoriaRuutuYlos"/>): pystyssä pinnan normaalin suuntaan ja mallin +Z
        /// (kuvamerkin ylös) ruudun ylös-suuntaan, eli kameran ylös projisoituna tangenttitasoon; kallistetussa kamerassa
        /// sama suunta on poispäin katsojasta. Kartan kierrossa reliefi pysyy pystyssä kuten 2D-merkki. Rappeutuneessa
        /// tapauksessa pohjoinen.
        /// </summary>
        Quaternion RuutuAsento(Vector3 normaali, Quaternion pohjoinen)
        {
            Vector3 ylos = georeferenssi.transform.InverseTransformDirection(kamera.transform.up);
            Vector3 u = ylos - normaali * Vector3.Dot(ylos, normaali);
            if (u.sqrMagnitude < 1e-8f) return pohjoinen;
            return Quaternion.LookRotation(u.normalized, normaali);
        }

        /// <summary>Noston perusasento: kategoriasymbolilla ruudun ylös (valinnainen), muuten pohjoinen.</summary>
        Quaternion PerusAsento(Tieto t, Vector3 normaali, Quaternion pohjoinen) =>
            KategoriaRuutuYlos && KayttaaSymbolia(t) ? RuutuAsento(normaali, pohjoinen) : pohjoinen;

        /// <summary>Ääriviivan leveys mallin yksiköissä, kun malli on <paramref name="pt"/> pistettä leveä (1 yksikkö = pt).</summary>
        static float ReunaYksikoissa(float pt) => ReunaPt > 0f ? ReunaPt / Mathf.Max(1f, pt) : 0f;

        /// <summary>
        /// Kokeilun komennot (Komennot.cs kutsuu, kun `symbolit`-alikomento ei ole sen omia): `ylhaalta 3d|2d`, `iso <aste>`
        /// (0–30) ja `reuna <pt>` (0–4, 0 = pois). Palauttaa, tunnistettiinko komento.
        /// </summary>
        public static bool Komento(string[] o)
        {
            if (o == null || o.Length < 3) return false;
            switch (o[1])
            {
                case "ylhaalta": Ylhaalta3D = o[2] != "2d"; return true;
                case "iso": IsoAste = Mathf.Clamp(float.Parse(o[2], CultureInfo.InvariantCulture), 0f, 30f); return true;
                case "reuna": ReunaPt = Mathf.Clamp(float.Parse(o[2], CultureInfo.InvariantCulture), 0f, 4f); return true;
                case "kategoriat":
                    // 1|0: kategoriasymbolit (reliefit) vai arkkityypit (A/B); ruutu|pohjoinen: reliefin ylös-suunta.
                    if (o[2] == "ruutu" || o[2] == "pohjoinen") KategoriaRuutuYlos = o[2] == "ruutu";
                    else Kategoriat = o[2] != "0" && o[2] != "pois";
                    return true;
                default: return false;
            }
        }
        const float KallistusHystereesi = 3f;
        static bool kallistettu;

        /// <summary>Onko kamera kallistettu niin, että mallin kylki näkyy (hystereesi ±3°, ettei vaihto värise).</summary>
        static bool Kallistettu()
        {
            var k = instanssi != null ? instanssi.kierto : null;
            if (k == null) return false;
            double a = k.KaytettyKallistus;
            if (kallistettu && a < KallistusRajaAste - KallistusHystereesi) kallistettu = false;
            else if (!kallistettu && a >= KallistusRajaAste + KallistusHystereesi) kallistettu = true;
            return kallistettu;
        }
        public static bool Paalla = true;
        /// <summary>Esikatselu (komento `symbolit loydetty|himmea`): kaikki löydettyinä.</summary>
        public static bool PakotaLoydetty;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            KokoPt = 40f; KokoKynnysPt = 22f; KallistusRajaAste = 25f; kallistettu = false; Paalla = true; PakotaLoydetty = false; instanssi = null; verkot.Clear(); tiedot.Clear();
            Ylhaalta3D = true; IsoAste = 15f; ReunaPt = 1.2f;
            NollaaTasot23();
            NollaaKategoriat();
            NollaaLiikkuvat();
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (instanssi != null) return;
            var geo = FindAnyObjectByType<CesiumGeoreference>();
            if (geo == null) return;
            var go = new GameObject("Symbolimallit");
            go.transform.SetParent(geo.transform, false);
            instanssi = go.AddComponent<Symbolimallit>();
            instanssi.georeferenssi = geo;
        }

        static Symbolimallit instanssi;

        // Erikoismallit noston tunnisteen avainsanalla (Nosto.Id tai Tunnus päättyy tähän, esim. "kohde:akropolis"):
        // rekisteröinti ja liikkuvat osat Symbolimallit.Erikoismallit.cs:ssä.
        static readonly Dictionary<string, Mesh> verkot = new Dictionary<string, Mesh>();

        /// <summary>Noston mallitieto (lasketaan kerran noston id:llä): erikoismallin avain tai null, arkkityyppi,
        /// kategoriasymboli (KategoriaKartoitus; null = ei paneelin symbolia) ja taso.</summary>
        sealed class Tieto
        {
            public string Erikois;
            public Arkkityyppi Tyyppi;
            public Kategoriasymboli? Symboli;
            public ArkkityyppiKartoitus.Peruste Peruste;
            public int Taso;
        }
        static readonly Dictionary<string, Tieto> tiedot = new Dictionary<string, Tieto>(StringComparer.Ordinal);

        static Tieto TietoNostolle(NostoKerros.Nosto s)
        {
            if (tiedot.TryGetValue(s.Id, out var t)) return t;
            t = new Tieto { Erikois = Avain(s.Id) ?? Avain(s.Tunnus), Taso = s.Taso };
            t.Tyyppi = ArkkityyppiKartoitus.Kartoita(s.Id, s.Nimi, s.Kategoria, s.Laji, out t.Peruste);
            t.Symboli = KategoriaKartoitus.Symboli(s.Kategoria, s.Laji);
            tiedot[s.Id] = t;
            return t;
        }

        /// <summary>Tieto id:llä: välimuistista tai NostoKerroksen näytettävistä (Natiivi-UI kysyy id:llä); null = ei nostoa.</summary>
        static Tieto TietoIdlla(string id)
        {
            if (string.IsNullOrEmpty(id)) return null;
            if (tiedot.TryGetValue(id, out var t)) return t;
            var nk = NostoKerros.Instanssi;
            if (nk == null) return null;
            foreach (var s in nk.Naytettavat) if (s.Id == id) return TietoNostolle(s);
            return null;
        }

        /// <summary>
        /// Onko nostolla 3D-malli (Natiivi-UI: 2D-kuvamerkki ja musteläikkä pois). Taso 1: kertoimesta 2,5 (löydös 175;
        /// erikoismalli tai arkkityyppi). Tasot 2–3: kun <see cref="Taso23"/> on päällä ja kartan kerroin on 155:n kuvamerkkien kynnyksellä
        /// (NostoSaannot.KuvamerkkiKaytossa, 2,5), eli samoin kuin <see cref="PiirraTasot23"/> piirtää.
        /// HUOM (26.9.): Natiivi-UI:n NostotKartalla piilottaa symbolin vain tasolla 1 (ehto m.Taso1) eikä piilota
        /// musteen jälkeä (AsetaMuste); tasoille 2–3 tarvittava muutos: proto-3d/lokit/loydos160-arkkityypit-RAPORTTI.md.
        /// </summary>
        public static bool OnMalli(string nostoId)
        {
            if (!Paalla) return false;
            var t = TietoIdlla(nostoId);
            if (t == null) return Taso1Zoom() && Kallistettu() && (Avain(nostoId) != null || ArkkityyppiKartoitus.Taulussa(nostoId));
            return t.Taso == 1 ? Taso1Kaytossa(t) : Taso23Kaytossa(t);
        }

        static string Avain(string id)
        {
            if (string.IsNullOrEmpty(id)) return null;
            int k = id.LastIndexOf(':');
            string loppu = k >= 0 ? id.Substring(k + 1) : id;
            if (loppu.StartsWith("hahmotelma-", StringComparison.Ordinal)) loppu = loppu.Substring(11);
            return Mallit.ContainsKey(loppu) ? loppu : null;
        }

        /// <summary>Tila lokiin: taso 1 (erikoismallit ja arkkityypit), tasot 2–3 (instanssit, piirtokutsut) ja kolmiot.</summary>
        public static string Tila()
        {
            if (instanssi == null) return "ei luotu";
            var sb = new System.Text.StringBuilder($"päällä {Paalla}, koko {KokoPt:0} pt, taso23 {(Taso23 ? 1 : 0)}, ylhaalta {(Ylhaalta3D ? "3d" : "2d")}, " +
                $"iso {IsoAste:0.#}° (nyt {IsoNyt():0.#}°), reuna {ReunaPt:0.##} pt, kategoriat {(Kategoriat ? 1 : 0)} " +
                $"({(KategoriaRuutuYlos ? "ruutu" : "pohjoinen")}); taso 1 näkyvissä:");
            int n = 0;
            var taso1 = new int[MalliLukumaara];
            foreach (var p in instanssi.kappaleet)
            {
                if (!p.Value.R.enabled) continue;
                n++;
                var t = tiedot.TryGetValue(p.Key, out var tt) ? tt : null;
                if (t != null && t.Erikois != null) sb.Append(' ').Append(t.Erikois);
                else if (t != null) taso1[MalliIndeksi(t)]++;
            }
            if (n == 0) sb.Append(" ei yhtään");
            for (int i = 0; i < taso1.Length; i++) if (taso1[i] > 0) sb.Append(' ').Append(MallinNimi(i)).Append('×').Append(taso1[i]);
            sb.Append($" ({n} mallia); ");
            instanssi.Tasot23Tila(sb);
            sb.Append("; erikoismallien kolmiot:");
            foreach (var p in verkot) sb.Append(' ').Append(p.Key).Append('=').Append(p.Value.triangles.Length / 3);
            int osiaNakyy = 0;
            foreach (var o in liikkuvat) if (o.Nakyy) osiaNakyy++;
            sb.Append($"; liikkuvat osat {osiaNakyy}/{liikkuvat.Count} (versio {LiikkuvatVersio})");
            foreach (var p in osaVerkot) if (p.Value != null) sb.Append(' ').Append(p.Key).Append('=').Append(p.Value.triangles.Length / 3);
            sb.Append("; arkkityyppien kolmiot LOD0/LOD1:");
            for (int i = 0; i < ArkkityyppiKartoitus.Lukumaara; i++)
            {
                var (k0, k1) = ArkkityyppiKolmiot((Arkkityyppi)i);
                sb.Append(' ').Append((Arkkityyppi)i).Append('=').Append(k0).Append('/').Append(k1);
            }
            sb.Append("; kategoriasymbolien kolmiot LOD0/LOD1:");
            for (int i = 0; i < KategoriaKartoitus.Lukumaara; i++)
                if (SymboliRakennettu((Kategoriasymboli)i))
                    sb.Append(' ').Append((Kategoriasymboli)i).Append('=').Append(SymbolinKolmiot((Kategoriasymboli)i, 0)).Append('/')
                      .Append(SymbolinKolmiot((Kategoriasymboli)i, 1));
            return sb.ToString();
        }

        CesiumGeoreference georeferenssi;
        PalloKierto kierto;
        Camera kamera;
        Aurinko aurinko;
        Material materiaali, pohjaMateriaali, reunaMateriaali;

        /// <summary>Tason 1 kappale: malli, maakontaktilevy (lapsi, löydös 175c) ja ääriviiva (lapsi, 1.0.27-kokeilu).</summary>
        sealed class Kappale
        {
            public Transform T;
            public MeshRenderer R, Pohja, Reuna;
            /// <summary>Mallin ja ääriviivan verkot (vaihtuvat, kun `symbolit kategoriat 1|0` vaihtaa mallin).</summary>
            public MeshFilter Suodin, ReunaSuodin;
            /// <summary>Mallin indeksi (MalliIndeksi) tai −1 = erikoismalli.</summary>
            public int Malli = -1;
            public Vector3 Paikka, Normaali;
            public Quaternion Asento;
            public float Himmea = -1f, Iso, ReunaLeveys = -1f;
            /// <summary>Kaupungin maamerkki (Erikoismalli.Kaupunki): malli kaupunkipisteen vasemmalla puolella.</summary>
            public bool Maamerkki;
        }
        /// <summary>Tason 1 kappaleet noston id:llä.</summary>
        readonly Dictionary<string, Kappale> kappaleet = new Dictionary<string, Kappale>();
        readonly HashSet<string> nyt = new HashSet<string>();
        MaterialPropertyBlock lohko, reunaLohko;
        static readonly int HimmeaId = Shader.PropertyToID("_Himmea"), TilaLohkoId = Shader.PropertyToID("_Tila");

        void Start()
        {
            var s = Resources.Load<Shader>("Symbolimalli");
            if (s == null) { Debug.LogWarning("MATKAKIRJA symbolimallit: varjostin puuttuu"); enabled = false; return; }
            materiaali = new Material(s) { name = "Symbolimalli" };
            pohjaMateriaali = PohjaMateriaali(materiaali);
            reunaMateriaali = ReunaMateriaali(materiaali);
            lohko = new MaterialPropertyBlock();
            reunaLohko = new MaterialPropertyBlock();
            AloitaTasot23(s);
        }

        void LateUpdate()
        {
            if (kamera == null)
            {
                kierto = FindAnyObjectByType<PalloKierto>();
                kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
                aurinko = FindAnyObjectByType<Aurinko>();
                if (kamera == null) return;
            }
            var kk = KarttaKerrokset.Instanssi;
            var nk = NostoKerros.Instanssi;
            bool sallittu = Paalla && nk != null && nk.Nakyvissa && !PalloKierto.PorttiSumea && !(kk != null && kk.LinssiPaalla)
                            && !(aurinko != null && aurinko.Paalla);
            nyt.Clear();
            if (sallittu && Taso1Zoom())
                foreach (var s in nk.Naytettavat)
                {
                    if (s.Taso != 1 || s.Id == null || nyt.Contains(s.Id)) continue;
                    var tieto = TietoNostolle(s);
                    if (!KulmaSallii(tieto)) continue;
                    nyt.Add(s.Id);
                    Paivita(tieto, s);
                }
            foreach (var p in kappaleet)
                if (!nyt.Contains(p.Key) && p.Value.R.enabled)
                {
                    Nayta(p.Value, false);
                    if (osatNostolla.TryGetValue(p.Key, out var osat)) PaivitaOsat(osat, false, default);
                    PallonLepo.Muuttui("symbolimallit");
                }
            if (sallittu && Taso1Zoom()) PaivitaMaamerkit(nk);
            PiirraTasot23(sallittu ? nk : null);
        }

        /// <summary>Paikka ja asento georeferenssin paikallisessa avaruudessa: pystyssä pinnan normaalin suuntaan, +Z pohjoiseen.</summary>
        void Asento(double lat, double lon, out Vector3 paikka, out Quaternion asento, out Vector3 normaali)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, 0));
            var n = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(ecef);
            normaali = ((Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(n)).normalized;
            var napa = new double3(0, 0, 1);
            var poh = math.normalize(napa - n * math.dot(napa, n));
            var pl = ((Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(poh)).normalized;
            paikka = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            asento = Quaternion.LookRotation(pl, normaali);
        }

        /// <summary>Yhden ruutupisteen koko maailmassa etäisyydellä (kameran fov ja PalloKierto.Pistekerroin).</summary>
        float PisteMaailmassa(float etaisyys) =>
            2f * etaisyys * Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad) / (Screen.height / PalloKierto.Pistekerroin);

        static void Nayta(Kappale k, bool nakyy)
        {
            k.R.enabled = k.Pohja.enabled = nakyy;
            k.Reuna.enabled = nakyy && ReunaPt > 0f;
        }

        /// <summary>Lapsiobjekti samaan paikkaan mallin kanssa (maakontakti, ääriviiva): oma verkko ja materiaali.</summary>
        static MeshRenderer Lapsi(Transform isa, string nimi, Mesh verkko, Material m)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(isa, false);
            go.AddComponent<MeshFilter>().sharedMesh = verkko;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = m;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            return r;
        }

        void Paivita(Tieto tieto, NostoKerros.Nosto s)
        {
            if (!kappaleet.TryGetValue(s.Id, out var k))
            {
                Mesh verkko;
                if (tieto.Erikois != null)
                {
                    if (!verkot.TryGetValue(tieto.Erikois, out verkko)) verkot[tieto.Erikois] = verkko = Mallit[tieto.Erikois].Runko();
                }
                else verkko = MallinVerkko(MalliIndeksi(tieto), 0);
                var go = new GameObject("Symbolimalli-" + (tieto.Erikois ?? tieto.Tyyppi.ToString()) + "-" + s.Id);
                go.transform.SetParent(transform, false);
                var suodin = go.AddComponent<MeshFilter>();
                suodin.sharedMesh = verkko;
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = materiaali;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
                Asento(s.OmaLat, s.OmaLon, out var paikka, out var asento, out var nl);
                go.transform.localPosition = paikka;
                go.transform.localRotation = asento;
                k = new Kappale { T = go.transform, R = r, Paikka = paikka, Normaali = nl, Asento = asento, Suodin = suodin,
                                  Malli = tieto.Erikois != null ? -1 : MalliIndeksi(tieto), Maamerkki = OnMaamerkki(s.Id) };
                // Maakontakti (löydös 175c): varjolevy lapsena mallin juuren tasossa, säde 0,6 × mallin leveys; 1.0.27-kokeilussa
                // siirretty kaakkoon (PohjaSiirto, valo luoteesta).
                k.Pohja = Lapsi(go.transform, "Maakontakti", PohjaVerkko(), pohjaMateriaali);
                k.Pohja.transform.localScale = Vector3.one * (PohjaSade * Leveys(verkko));
                k.Pohja.transform.localPosition = PohjaSiirto;
                // Ääriviiva (1.0.27-kokeilu): sama verkko ääriviivamateriaalilla, leveys lohkon _Tila.z:ssa.
                k.Reuna = Lapsi(go.transform, "Aariviiva", verkko, reunaMateriaali);
                k.ReunaSuodin = k.Reuna.GetComponent<MeshFilter>();
                kappaleet[s.Id] = k;
                LuoOsat(s.Id, tieto.Erikois, go.transform);
            }
            else if (tieto.Erikois == null && k.Malli != MalliIndeksi(tieto))
            {
                // `symbolit kategoriat 1|0`: kategoriasymboli ↔ arkkityyppi samaan kappaleeseen (malli, ääriviiva, levyn koko).
                k.Malli = MalliIndeksi(tieto);
                var verkko = MallinVerkko(k.Malli, 0);
                k.Suodin.sharedMesh = k.ReunaSuodin.sharedMesh = verkko;
                k.Pohja.transform.localScale = Vector3.one * (PohjaSade * Leveys(verkko));
                PallonLepo.Muuttui("symbolimallit");
            }
            var osat = osatNostolla.TryGetValue(s.Id, out var oo) ? oo : eiOsia;
            var gt = georeferenssi.transform;
            Vector3 p = gt.TransformPoint(k.Paikka);
            Vector3 kohti = kamera.transform.position - p;
            float etaisyys = kohti.magnitude;
            bool edessa = Vector3.Dot(gt.TransformDirection(k.Normaali).normalized, kohti / Mathf.Max(1e-6f, etaisyys)) > 0.08f;
            if (k.R.enabled != edessa) { Nayta(k, edessa); PallonLepo.Muuttui("symbolimallit"); }
            PaivitaOsat(osat, edessa, p);
            if (!edessa) return;
            float kerroin = tieto.Erikois != null && Mallit.TryGetValue(tieto.Erikois, out var em) ? em.KokoKerroin : 1f;
            float pt = KokoNyt(NostoKerros.Instanssi.ZoomKerroin) * kerroin;
            float koko = PisteMaailmassa(etaisyys) * pt / Mathf.Max(1e-9f, gt.lossyScale.x);
            var sk = Vector3.one * koko;
            if ((k.T.localScale - sk).sqrMagnitude > 1e-6f * koko * koko) k.T.localScale = sk;
            if (k.Maamerkki)
            {
                // Pisteen vasemmalle (nimiö on oletuksena oikealla): mallin puolikas + väli pisteinä, itä = asennon +X.
                var lp = k.Paikka - (k.Asento * Vector3.right) * (koko / Mathf.Max(1e-3f, pt) * (pt * 0.5f + MaamerkkiValiPt));
                if ((k.T.localPosition - lp).sqrMagnitude > 1e-6f * koko * koko) k.T.localPosition = lp;
            }
            // Oma kallistus (kokeilu): lasketaan joka kehys, koska akseli seuraa kameran suuntaa; asetetaan vain muuttuessa.
            float iso = IsoNyt();
            var kierto = IsoKierto(k.Normaali, iso) * PerusAsento(tieto, k.Normaali, k.Asento);
            if (Mathf.Abs(iso - k.Iso) > 0.01f || Quaternion.Angle(k.T.localRotation, kierto) > 0.01f)
            {
                k.T.localRotation = kierto;
                k.Iso = iso;
            }
            if (k.Reuna.enabled != ReunaPt > 0f) k.Reuna.enabled = ReunaPt > 0f;
            float lev = ReunaYksikoissa(pt);
            if (Mathf.Abs(lev - k.ReunaLeveys) > 0.01f * Mathf.Max(lev, 1e-4f))
            {
                reunaLohko.SetVector(TilaLohkoId, new Vector4(0f, 0f, lev, 0f));
                k.Reuna.SetPropertyBlock(reunaLohko);
                k.ReunaLeveys = lev;
            }
            float h = s.Loydetty || PakotaLoydetty ? 0f : 1f;
            if (h != k.Himmea)
            {
                lohko.SetFloat(HimmeaId, h);
                k.R.SetPropertyBlock(lohko);
                HimmennaOsat(osat, lohko);
                k.Himmea = h;
                PallonLepo.Muuttui("symbolimallit");
            }
        }

        // ---- Mallit (paikallinen: +Y ylös, +Z pohjoinen, leveys ~1) ----

        static Mesh Akropolis()
        {
            var r = new Rakentaja();
            // Kallio: epäsäännöllinen 11-kulmainen tasanne, itä–länsi-suunnassa pitkä.
            r.Kallio(Vector3.zero, 0.62f, 0.34f, 0.52f, 0.27f, 0.2f, 11, 7, Varjo, Pinta);
            // Parthenon kallion itäpäässä (8 × 17 pylvään temppeli yksinkertaistettuna 8 + 6 pylvästä sivulla).
            r.Temppeli(new Vector3(0.14f, 0.2f, 0.02f), 0.36f, 0.17f, 0.11f, 8, 5, Valo, Pinta);
            // Propylaia länsipäässä: matala porttirakennus.
            r.Laatikko(new Vector3(-0.38f, 0.2f, -0.02f), new Vector3(0.1f, 0.05f, 0.14f), Valo, Pinta);
            // Erekhtheion pohjoisreunalla.
            r.Laatikko(new Vector3(0.0f, 0.2f, 0.13f), new Vector3(0.12f, 0.06f, 0.06f), Valo, Terrakotta);
            return r.Verkko("Akropolis");
        }

        static Mesh Delfoi()
        {
            var r = new Rakentaja();
            // Ei Parnassosta (Fable: maasto näyttää vuoren itse, tumma möykky hallitsi): temppeli ja tholos ovat mallin ydin.
            // Pengerrys: matala pyöristetty tasanne.
            r.Rengaskallio(new Vector3(0.04f, 0f, -0.1f), new[] { (0f, 0.62f, 0.4f), (0.045f, 0.58f, 0.36f) }, float.NaN, 12, 8, Pinta, Pinta);
            // Oliivipuita alarinteellä varjon sävyssä: löydös 175c (Linssiseppä, yksi aksentti mallia kohden), aksentti on
            // tholoksen terrakottakatto (ennen oliivi #7f8f6a, jolloin aksentteja oli kaksi).
            float[,] puut = { { -0.34f, 0.08f }, { -0.24f, 0.13f }, { 0.3f, 0.1f }, { 0.37f, 0.03f }, { -0.42f, -0.04f } };
            for (int i = 0; i < puut.GetLength(0); i++)
                r.Kartio(new Vector3(puut[i, 0], 0.02f, puut[i, 1]), 0.028f, 0.06f, 6, Varjo);
            // Apollon temppeli raunioina: kolmiportainen stylobaatti, 6 + 6 pylvästä pylväänpäineen eri korkeuksilla,
            // arkkitraavin pala kolmen ehjän pylvään päällä.
            var s = new Vector3(0.06f, 0.045f, -0.1f);
            r.Laatikko(s, new Vector3(0.44f, 0.012f, 0.22f), Valo, Valo);
            r.Laatikko(s + Vector3.up * 0.012f, new Vector3(0.42f, 0.012f, 0.2f), Valo, Valo);
            r.Laatikko(s + Vector3.up * 0.024f, new Vector3(0.4f, 0.012f, 0.18f), Valo, Valo);
            var y = s + Vector3.up * 0.036f;
            float[] etu = { 0.15f, 0.15f, 0.15f, 0.09f, 0.15f, 0.05f };
            float[] taka = { 0.07f, 0.15f, 0.04f, 0.12f, 0.15f, 0.15f };
            for (int i = 0; i < 6; i++)
            {
                r.Doorilainen(y + new Vector3(-0.16f + i * 0.064f, 0, -0.07f), 0.014f, etu[i], Valo, etu[i] >= 0.15f);
                r.Doorilainen(y + new Vector3(-0.16f + i * 0.064f, 0, 0.07f), 0.014f, taka[i], Valo, taka[i] >= 0.15f);
            }
            r.Laatikko(y + new Vector3(-0.096f, 0.162f, -0.07f), new Vector3(0.16f, 0.022f, 0.036f), Valo, Valo);
            // Tholos alempana: pyöreä pohja, pylväskehä ja terrakotta kartiokatto.
            var t = new Vector3(-0.3f, 0.02f, -0.3f);
            r.Rengaskallio(t, new[] { (0f, 0.17f, 0.17f), (0.012f, 0.17f, 0.17f) }, float.NaN, 12, 1, Valo, Valo);
            for (int i = 0; i < 10; i++)
            {
                float a = i * Mathf.PI * 2f / 10f;
                r.Doorilainen(t + new Vector3(Mathf.Cos(a), 0, Mathf.Sin(a)) * 0.06f + Vector3.up * 0.012f, 0.009f, 0.085f, Valo, true);
            }
            r.Rengaskallio(t + Vector3.up * 0.1f, new[] { (0f, 0.15f, 0.15f), (0.008f, 0.15f, 0.15f) }, 0.05f, 12, 1, Terrakotta, Terrakotta);
            return r.Verkko("Delfoi");
        }

        static Mesh Meteora()
        {
            var r = new Rakentaja();
            // Kolme pyöreää, pullistuvaa kalliopilaria (renkaat, kupolimainen laki), luostari korkeimman päällä.
            Pilari(r, new Vector3(-0.22f, 0f, 0.07f), 0.13f, 0.4f, 11, false);
            Pilari(r, new Vector3(0.14f, 0f, -0.08f), 0.16f, 0.52f, 5, true);
            Pilari(r, new Vector3(0.05f, 0f, 0.27f), 0.1f, 0.3f, 3, false);
            // Suuri Meteoron korkeimman pilarin tasaisella laella: päärakennus, punainen harjakatto, kupoli ja kellotorni.
            var y = new Vector3(0.14f, 0.52f * PilarinLaki, -0.08f);
            r.Laatikko(y, new Vector3(0.16f, 0.055f, 0.1f), Valo, Valo);
            r.Harja(y + Vector3.up * 0.055f, new Vector3(0.16f, 0.04f, 0.1f), Terrakotta, Valo);
            r.Pylvas(y + new Vector3(-0.05f, 0.055f, 0f), 0.03f, 0.04f, 10, Valo);
            r.Rengaskallio(y + new Vector3(-0.05f, 0.095f, 0f), new[] { (0f, 0.064f, 0.064f), (0.015f, 0.05f, 0.05f) }, 0.035f, 10, 1, Terrakotta, Terrakotta);
            r.Laatikko(y + new Vector3(0.06f, 0.055f, 0.03f), new Vector3(0.03f, 0.06f, 0.03f), Valo, Terrakotta);
            return r.Verkko("Meteora");
        }

        /// <summary>Ylimmän renkaan korkeus pilarin korkeudesta (luostari istuu tasaisella laella tällä korkeudella).</summary>
        const float PilarinLaki = 0.97f;

        /// <summary>
        /// Meteoran kalliopilari (Fable 26.9. simulaattorin lähikuvasta: 7 fasettia näytti kallistettuna laatikolta):
        /// 11 fasettia epäsäännöllisellä säteellä sivuittain (±16 %, pystysärmät; Fable: ei sileitä kapseleita), lievä
        /// pullistus keskivaiheilla ja kapeneminen latvaa kohti (latva 0,66 × tyvi). Laki matalana kupolina tai tasainen
        /// (luostari).
        /// </summary>
        static void Pilari(Rakentaja r, Vector3 p, float sade, float h, int siemen, bool tasainen)
        {
            float d = sade * 2f;
            r.Rengaskallio(p, new[]
                {
                    (0f, d * 1.0f, d * 0.94f), (h * 0.22f, d * 1.04f, d * 0.98f), (h * 0.45f, d * 1.02f, d * 0.96f),
                    (h * 0.68f, d * 0.9f, d * 0.85f), (h * 0.86f, d * 0.76f, d * 0.72f), (h * PilarinLaki, d * 0.66f, d * 0.62f),
                },
                tasainen ? float.NaN : h * 1.04f, 11, siemen, Kivi, Pinta, 0.32f);
        }
    }
}
