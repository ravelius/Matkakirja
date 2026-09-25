using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja
{
    /// <summary>
    /// POHJAPALLO (omistajan löydös 119, build 14: "pallossa on vieläkin todella paljon reikiä, joista näkyy maapallon
    /// läpi"; Fablen hyväksyntä 25.9.2026 klo 18.5x): pergamentinvärinen umpinainen varapinta 3 km ellipsoidin alla.
    /// Laattojen raoista (latauksen aikainen tasohyppy saumassa, Reikakorjaus: Helmat) näkyy pergamenttia eikä
    /// avaruutta, taustaa tai pallon takapuolta. Puhtaat osat ja perustelut Pohjapallolaskenta.cs:ssä.
    ///
    /// KOORDINAATIT: verkko on georeferenssin lapsi, kärjet georeferenssin paikallisissa koordinaateissa
    /// (CesiumGeoreference.ecefToLocalMatrix: ECEF → Unity, mittakaava ja akselien vaihto mukana) maan keskipisteen
    /// suhteen, ja olion paikka on maan keskipiste. CesiumGeoreference.changed (origon siirto) rakentaa verkon uudelleen,
    /// ja georeferenssin oman transformin siirrot periytyvät lapselle.
    ///
    /// PIIRTO (Pohjapallo.shader): opaakkijono laattojen jälkeen (AlphaTest+10 = 2460; tileset-materiaali 2450), joten
    /// syvyystesti hylkää laattojen peittämät fragmentit ennen varjostusta (Applen TBDR-näytönohjaimissa HSR, koska
    /// varjostin ei kirjoita syvyyttä eikä hylkää pikseleitä). Pallon TAKAPINTA (Cull Front) syvyytenä: ks.
    /// Pohjapallolaskenta, ei läpikuultoa karkeiden laattojen jänteiden läpi millään zoomilla.
    /// KUSTANNUS: yksi piirtokutsu (SRP Batcher), 10 242 kärkeä / 20 480 kolmiota (joista takapinnat ~puolet),
    /// valaisematon vakioväri; fragmentteja varjostetaan vain reikien kohdalla. Arvio alle 0,1 ms/kehys laitteella;
    /// ei omaa päivitystä (LateUpdate vain vertaa tiloja), joten lepotilan kehystahtiin ja lämpöön ei vaikutusta.
    ///
    /// SÄVY (Pohjapallolaskenta.Savy): pergamentti #d9d0bb (varalaatan väri); satelliittilennolla Blue Marblen avomeri;
    /// linssin reliefin aikana (pergamenttipohja piilossa: topografia, radio, astronautti, Isoisä) reliefin meri. Pallon
    /// sävy (_pallonTummuus), valokeila (_keila*), radion hämärä (_radioHamara) ja usva (Unityn lineaarinen sumu)
    /// vaikuttavat kuten laattoihin. Magentamittauksessa (PalloReiat) piilossa, ellei tila ole Paalle.
    ///
    /// Komennot: "pallo pohja auto|paalle|pois|tila" ja testitila "pallo pohja paljas paalle|pois" (Komennot.cs).
    /// </summary>
    public class Pohjapallo : MonoBehaviour
    {
        public static Pohjapallo Instanssi { get; private set; }

        /// <summary>Komento "pallo pohja …" (oletus Auto: päällä paitsi magenta-mittauksessa).</summary>
        public static Pohjapallolaskenta.Tila Tila = Pohjapallolaskenta.Tila.Auto;

        /// <summary>
        /// Testikomento "pallo pohja paljas paalle|pois": maastolaattojen renderöijät piiloon (myös uudet laatat), jotta
        /// pohjapallo näkyy kokonaan: sijainti ja siluetti laattoihin verrattuna, sävy eri tiloissa. Ei pelikäyttöön.
        /// </summary>
        public static bool Paljas;

        static readonly int VariId = Shader.PropertyToID("_BaseColor");
        static readonly int SadeId = Shader.PropertyToID("_Sade");

        /// <summary>Editorin pelitila ilman domain reloadia: kokeilut eivät jää edellisestä ajosta.</summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaKokeilut()
        {
            Tila = Pohjapallolaskenta.Tila.Auto;
            Paljas = false;
        }

        /// <summary>Kohtaus ilman tätä komponenttia (Pallo.unity ennen löydöstä 119): liitetään georeferenssiin ajossa.</summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Liita()
        {
            var kk = KarttaKerrokset.Instanssi;
            var g = kk != null ? kk.GetComponent<CesiumGeoreference>() : null;
            if (g == null) g = FindAnyObjectByType<CesiumGeoreference>();
            if (g == null || g.GetComponent<Pohjapallo>() != null) return;
            g.gameObject.AddComponent<Pohjapallo>();
        }

        CesiumGeoreference georeferenssi;
        GameObject olio;
        MeshRenderer piirtaja;
        Material materiaali;
        Mesh verkko;
        Pohjapallolaskenta.Pinta? pinta;
        int karkia, kolmioita;
        bool paljastettu;
        readonly System.Collections.Generic.List<MeshRenderer> laatat = new System.Collections.Generic.List<MeshRenderer>();
        double painuma;

        void OnEnable()
        {
            Instanssi = this;
            georeferenssi = GetComponent<CesiumGeoreference>();
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (georeferenssi == null) { enabled = false; return; }
            if (materiaali == null)
            {
                var varjostin = Resources.Load<Shader>("Pohjapallo");
                if (varjostin == null) varjostin = Shader.Find("Matkakirja/Pohjapallo");
                if (varjostin == null)
                {
                    Debug.LogWarning("MATKAKIRJA pohjapallo: varjostin Matkakirja/Pohjapallo puuttuu");
                    enabled = false;
                    return;
                }
                materiaali = new Material(varjostin) { name = "Pohjapallo" };
            }
            georeferenssi.Initialize();
            georeferenssi.changed += Rakenna;
            Rakenna();
            pinta = null;
            Paivita();
        }

        void OnDisable()
        {
            if (georeferenssi != null) georeferenssi.changed -= Rakenna;
            if (piirtaja != null) piirtaja.enabled = false;
            if (paljastettu) { Paljas = false; Paljasta(); }
            if (Instanssi == this) Instanssi = null;
        }

        void OnDestroy()
        {
            if (olio != null) Destroy(olio);
            if (verkko != null) Destroy(verkko);
            if (materiaali != null) Destroy(materiaali);
        }

        void LateUpdate()
        {
            Paivita();
            if (Paljas || paljastettu) Paljasta();
        }

        /// <summary>Testitila: laattojen renderöijät pois (Paljas) tai takaisin (kerran, kun tila päättyy).</summary>
        void Paljasta()
        {
            var kk = KarttaKerrokset.Instanssi;
            var tileset = kk != null ? kk.pallo : null;
            if (tileset == null) return;
            tileset.GetComponentsInChildren(true, laatat);
            foreach (var r in laatat)
                if (r.enabled == Paljas) r.enabled = !Paljas;
            laatat.Clear();
            paljastettu = Paljas;
        }

        /// <summary>
        /// Verkko georeferenssin nykyisestä muunnoksesta (alussa ja origon siirtyessä): ikosaedrin kärjet ellipsoidin
        /// säteisiin miinus syvyys, ECEF → paikallinen, maan keskipisteen suhteen.
        /// </summary>
        void Rakenna()
        {
            if (georeferenssi == null) return;
            if (olio == null)
            {
                olio = new GameObject("Pohjapallo");
                olio.transform.SetParent(georeferenssi.transform, false);
                olio.AddComponent<MeshFilter>();
                piirtaja = olio.AddComponent<MeshRenderer>();
                piirtaja.sharedMaterial = materiaali;
                piirtaja.shadowCastingMode = ShadowCastingMode.Off;
                piirtaja.receiveShadows = false;
                piirtaja.lightProbeUsage = LightProbeUsage.Off;
                piirtaja.reflectionProbeUsage = ReflectionProbeUsage.Off;
                piirtaja.motionVectorGenerationMode = MotionVectorGenerationMode.ForceNoMotion;
                piirtaja.allowOcclusionWhenDynamic = false;
            }
            double4x4 m = georeferenssi.ecefToLocalMatrix;
            double3 keski = math.mul(m, new double4(0, 0, 0, 1)).xyz;
            var m3 = new double3x3(m.c0.xyz, m.c1.xyz, m.c2.xyz);
            bool kaanna = math.determinant(m3) < 0.0;   // akselien vaihto (ECEF oikeakätinen → Unity vasenkätinen)
            var (karjet, kolmiot) = Pohjapallolaskenta.Ikosaedri(Pohjapallolaskenta.Jako);
            var (rx, ry, rz) = Pohjapallolaskenta.Sateet();
            var paikat = new Vector3[karjet.Count];
            for (int i = 0; i < karjet.Count; i++)
            {
                var k = karjet[i];
                paikat[i] = (float3)math.mul(m3, new double3(k.x * rx, k.y * ry, k.z * rz));
            }
            var indeksit = new int[kolmiot.Count];
            for (int i = 0; i < kolmiot.Count; i += 3)
            {
                indeksit[i] = kolmiot[i];
                indeksit[i + 1] = kaanna ? kolmiot[i + 2] : kolmiot[i + 1];
                indeksit[i + 2] = kaanna ? kolmiot[i + 1] : kolmiot[i + 2];
            }
            if (verkko == null) verkko = new Mesh { name = "Pohjapallo" };
            verkko.Clear();
            verkko.indexFormat = paikat.Length > 65535 ? IndexFormat.UInt32 : IndexFormat.UInt16;
            verkko.vertices = paikat;
            verkko.triangles = indeksit;
            verkko.RecalculateBounds();
            olio.GetComponent<MeshFilter>().sharedMesh = verkko;
            olio.transform.localPosition = (float3)keski;
            olio.transform.localRotation = Quaternion.identity;
            olio.transform.localScale = Vector3.one;
            // Varjostimen etupinnan säde maailman yksiköissä (usvan ja valokeilan osumapiste): päiväntasaajan säde.
            float sade = olio.transform.TransformVector((float3)math.mul(m3, new double3(rx, 0, 0))).magnitude;
            materiaali.SetFloat(SadeId, sade);
            karkia = paikat.Length;
            kolmioita = indeksit.Length / 3;
            painuma = Pohjapallolaskenta.SuurinPainuma(karjet, kolmiot, rx);
        }

        /// <summary>Näkyvyys ja sävy nykytilasta (LateUpdate ja komento); materiaali muuttuu vain tilan vaihtuessa.</summary>
        public void Paivita()
        {
            if (piirtaja == null) return;
            bool nakyy = Pohjapallolaskenta.Nakyy(Tila, PalloReiat.Magenta);
            if (piirtaja.enabled != nakyy) piirtaja.enabled = nakyy;
            if (!nakyy) return;
            var kk = KarttaKerrokset.Instanssi;
            var uusi = Pohjapallolaskenta.Valitse(kk != null && kk.SatelliittiLento, kk == null || kk.pohja == null || kk.pohja.enabled);
            if (pinta == uusi) return;
            pinta = uusi;
            var (r, g, b) = Pohjapallolaskenta.Savy(uusi);
            materiaali.SetColor(VariId, new Color32(r, g, b, 255));
        }

        /// <summary>Tila lokiin (komento "pallo pohja …").</summary>
        public static string Kuvaus()
        {
            var p = Instanssi;
            if (p == null) return $"MATKAKIRJA pohjapallo: tila {Tila}, ei komponenttia (georeferenssi tai varjostin puuttuu)";
            var (r, g, b) = Pohjapallolaskenta.Savy(p.pinta ?? Pohjapallolaskenta.Pinta.Pergamentti);
            return $"MATKAKIRJA pohjapallo: tila {Tila}, näkyy {(p.piirtaja != null && p.piirtaja.enabled ? "kyllä" : "ei")} " +
                   $"(magenta {(PalloReiat.Magenta ? "päällä" : "pois")}), pinta {p.pinta?.ToString() ?? "-"} #{r:x2}{g:x2}{b:x2}, " +
                   $"syvyys {Pohjapallolaskenta.SyvyysM:0} m, {p.karkia} kärkeä / {p.kolmioita} kolmiota, jänne ≤ {p.painuma:0} m, " +
                   $"jono {(p.materiaali != null ? p.materiaali.renderQueue : -1)}{(Paljas ? ", laatat piilossa (paljas)" : "")}";
        }
    }
}
