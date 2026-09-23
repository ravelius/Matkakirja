// AIKAJANAN LIEKKIVALOT pallolle (web js/aikajana-valo.js luoLiekkivalot +
// js/aikajana.js rakennaValotPallolle/asetaValonTila).
//
// Kaikki ajasta riippuva on puhtaassa ytimessä (Linssit/Ydin/Aikajana/Valot.cs,
// Liekki ja Liekkivalo, kultaiset testit webin koodia vasten). Tämä komponentti
// vain kirjoittaa ytimen luvut meshin kärkidataan joka kehys: yksi mesh
// georeferenssin alla (sama malli kuin Tahtitaivas), jokainen lamppu neljä
// kärkeä samassa keskipisteessä 5 km pinnan yläpuolella, ja varjostin
// (Resources/Varjostimet/Valo) levittää ne kameraan päin kääntyväksi neliöksi,
// jonka koko on vakio ruutupisteinä (webin 128 px:n piirtoruutu).
//
// Pallon takana olevat lamput piilotetaan normaalitestillä kuten Natiivisepän
// KaupunkiMerkit (peitto 0 → neliö kutistuu pisteeksi); laidalla häivytys on
// pehmeä, jottei lamppu välähdä pois.
//
// Linssi kutsuu: Luo(...) kerran, Tila/Sytyta tilanvaihdoissa, Paivita(nytMs)
// joka kehys, Pura() lopuksi. nytMs on linssin oma kello millisekunteina.
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class Valot : MonoBehaviour
    {
        /// <summary>Lampun nosto pinnasta (m): ei uppoa maastoon eikä välky pinnan kanssa.</summary>
        const double Nosto = 5000;
        /// <summary>Takapuolen häivytys: pinnan normaalin ja katsesuunnan pistetulo (KaupunkiMerkit 0,12).</summary>
        const float NakyvaAlku = 0.06f, NakyvaTaysi = 0.16f;

        CesiumGeoreference georeferenssi;
        Camera kamera;
        bool vahennettyLiike;
        Transform olio;
        Mesh mesh;
        Material materiaali;
        double viimeisin;

        readonly List<Liekkivalo> valot = new List<Liekkivalo>();
        readonly List<Vector3> paikat = new List<Vector3>();   // objektin koordinaatit (maan keskipisteestä)
        readonly Dictionary<string, int> tunnukset = new Dictionary<string, int>();
        readonly List<Vector4>[] kanavat =
        {
            new List<Vector4>(), new List<Vector4>(), new List<Vector4>(), new List<Vector4>(), new List<Vector4>(),
        };

        /// <summary>Montako lamppua näkyi viimeisimmässä päivityksessä (mittareille).</summary>
        public int Naytetty { get; private set; }

        /// <summary>
        /// Luo lamput georeferenssin alle. Listan indeksi on webin tapahtuman numero
        /// (valon variaation siemen): anna koko kaari järjestyksessä, ja paalut tai
        /// paikattomat kohteet lat/lon = NaN, jolloin ne ohitetaan kuten webissä.
        /// </summary>
        public static Valot Luo(CesiumGeoreference georeferenssi,
            IReadOnlyList<(string tunnus, double lat, double lon)> kohteet,
            bool vahennettyLiike = false, Camera kamera = null)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Valo");
            if (varjostin == null || georeferenssi == null || kohteet == null)
            {
                Debug.LogWarning("MATKAKIRJA linssit: valojen varjostin, georeferenssi tai kohteet puuttuvat");
                return null;
            }
            var go = new GameObject("AikajananValot");
            go.transform.SetParent(georeferenssi.transform, false);
            var v = go.AddComponent<Valot>();
            v.georeferenssi = georeferenssi;
            v.kamera = kamera;
            v.vahennettyLiike = vahennettyLiike;
            v.Rakenna(varjostin, kohteet);
            return v;
        }

        void Rakenna(Shader varjostin, IReadOnlyList<(string tunnus, double lat, double lon)> kohteet)
        {
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            olio = new GameObject("Valot-mesh").transform;
            olio.SetParent(transform, false);
            olio.localPosition = (Vector3)(float3)keskus;
            for (int i = 0; i < kohteet.Count; i++)
            {
                var (tunnus, lat, lon) = kohteet[i];
                if (!double.IsFinite(lat) || !double.IsFinite(lon)) continue;
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, Nosto));
                paikat.Add((Vector3)(float3)(georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef) - keskus));
                if (tunnus != null) tunnukset[tunnus] = valot.Count;
                valot.Add(new Liekkivalo(i));
            }
            mesh = Mesh();
            olio.gameObject.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = olio.gameObject.AddComponent<MeshRenderer>();
            materiaali = new Material(varjostin);
            r.sharedMaterial = materiaali;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
        }

        static Vector4 Vari(Savy c) => new Vector4(c.R / 255f, c.G / 255f, c.B / 255f, 1);

        Mesh Mesh()
        {
            int n = valot.Count;
            var kulmat = new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1) };
            var karjet = new Vector3[n * 4];
            var ydin = new List<Vector4>(n * 4);
            var keski = new List<Vector4>(n * 4);
            var laita = new List<Vector4>(n * 4);
            var kolmiot = new int[n * 6];
            for (int i = 0; i < n; i++)
            {
                var s = valot[i].Savyt;
                for (int k = 0; k < 4; k++)
                {
                    karjet[i * 4 + k] = paikat[i];
                    ydin.Add(Vari(s.Ydin));
                    keski.Add(Vari(s.Keski));
                    laita.Add(Vari(s.Laita));
                }
                int v = i * 4, t = i * 6;
                kolmiot[t] = v; kolmiot[t + 1] = v + 2; kolmiot[t + 2] = v + 1;
                kolmiot[t + 3] = v; kolmiot[t + 4] = v + 3; kolmiot[t + 5] = v + 2;
            }
            var m = new Mesh { name = "AikajananValot" };
            m.MarkDynamic();
            m.vertices = karjet;
            // Kulmat pysyvät; muu dynaaminen data kirjoitetaan Paivitassa.
            foreach (var kanava in kanavat) { kanava.Clear(); for (int i = 0; i < n * 4; i++) kanava.Add(Vector4.zero); }
            for (int i = 0; i < n; i++)
                for (int k = 0; k < 4; k++) kanavat[0][i * 4 + k] = new Vector4(kulmat[k].x, kulmat[k].y, 0, 0);
            for (int c = 0; c < kanavat.Length; c++) m.SetUVs(c, kanavat[c]);
            m.SetUVs(5, ydin);
            m.SetUVs(6, keski);
            m.SetUVs(7, laita);
            m.triangles = kolmiot;
            // Kärjet ovat keskipisteissä: rajat laajennetaan, ettei karsinta vie lamppuja.
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 20_000_000f);
            return m;
        }

        /// <summary>Lampun tila (web asetaValonTila). nytMs puuttuu → viimeisimmän Paivitan hetki.</summary>
        public void Tila(string tunnus, ValonVaihe vaihe, double? nytMs = null)
        {
            if (tunnus == null || !tunnukset.TryGetValue(tunnus, out int i)) return;
            valot[i].AsetaVaihe(vaihe, nytMs ?? viimeisin);
        }

        /// <summary>Kohteen hiljainen sytytys (web ihmisen-matka-esitys sytytaKohde: palaa, ei nykyinen).</summary>
        public void Sytyta(string tunnus, double? nytMs = null) => Tila(tunnus, ValonVaihe.Palaa, nytMs);

        /// <summary>Kaikki sammuksiin (web alusta).</summary>
        public void Alusta()
        {
            foreach (var v in valot) v.Alusta();
        }

        /// <summary>Joka kehys: nytMs linssin kello (ms), peitto 0…1 koko kerrokselle.</summary>
        public void Paivita(double nytMs, float peitto = 1)
        {
            viimeisin = nytMs;
            if (mesh == null) return;
            if (kamera == null) kamera = Camera.main;
            // Mitoitus ruutupisteinä kuten KaupunkiMerkit: retinalla piste on 2–3 pikseliä.
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            materiaali.SetFloat("_RuudunKorkeusPt", Screen.height / kerroin);
            materiaali.SetFloat("_Peitto", Mathf.Clamp01(peitto));
            Vector3 kameraPaikka = kamera != null ? kamera.transform.position : Vector3.zero;
            int naytetty = 0;
            for (int i = 0; i < valot.Count; i++)
            {
                var valo = valot[i];
                var kuva = valo.Laske(nytMs, vahennettyLiike);
                float nakyvyys = 0;
                if (kuva.Nakyy && kamera != null)
                {
                    Vector3 paikka = olio.TransformPoint(paikat[i]);
                    Vector3 normaali = olio.TransformDirection(paikat[i]).normalized;
                    Vector3 kohti = (kameraPaikka - paikka).normalized;
                    nakyvyys = Mathf.SmoothStep(0, 1, Mathf.InverseLerp(NakyvaAlku, NakyvaTaysi, Vector3.Dot(normaali, kohti)));
                }
                Kirjoita(i, valo, kuva, nakyvyys, nytMs);
                if (nakyvyys > 0) naytetty++;
            }
            Naytetty = naytetty;
            for (int c = 0; c < kanavat.Length; c++) mesh.SetUVs(c, kanavat[c]);
        }

        void Kirjoita(int i, Liekkivalo valo, ValonKuva kuva, float nakyvyys, double nytMs)
        {
            int v0 = i * 4;
            if (nakyvyys <= 0)
            {
                // Laatikko 0: neliö kutistuu pisteeksi eikä piirry.
                for (int k = 0; k < 4; k++)
                {
                    var c0 = kanavat[0][v0 + k];
                    kanavat[0][v0 + k] = new Vector4(c0.x, c0.y, 0, 0);
                }
                return;
            }
            var muoto = valo.Muoto(nytMs, vahennettyLiike);
            float laatikko = (float)kuva.Laatikko;
            float peitto = (float)kuva.Peitto * nakyvyys;
            var k1 = new Vector4((float)(kuva.Sade * kuva.Skaala), (float)kuva.Kirkkaus, (float)muoto.KohinaAlku, (float)muoto.Kohina[4]);
            var kohina = new Vector4((float)muoto.Kohina[0], (float)muoto.Kohina[1], (float)muoto.Kohina[2], (float)muoto.Kohina[3]);
            var voimat = new Vector4((float)muoto.Voimat[0], (float)muoto.Voimat[1], (float)muoto.Voimat[2], (float)muoto.Voimat[3]);
            var vaiheet = new Vector4((float)muoto.Vaiheet[0], (float)muoto.Vaiheet[1], (float)muoto.Vaiheet[2], (float)muoto.Vaiheet[3]);
            for (int k = 0; k < 4; k++)
            {
                var c0 = kanavat[0][v0 + k];
                kanavat[0][v0 + k] = new Vector4(c0.x, c0.y, laatikko, peitto);
                kanavat[1][v0 + k] = k1;
                kanavat[2][v0 + k] = kohina;
                kanavat[3][v0 + k] = voimat;
                kanavat[4][v0 + k] = vaiheet;
            }
        }

        /// <summary>Purku (web pura): olio, mesh ja materiaali pois.</summary>
        public void Pura()
        {
            if (this != null) Destroy(gameObject);
        }

        void OnDestroy()
        {
            if (mesh != null) Destroy(mesh);
            if (materiaali != null) Destroy(materiaali);
            mesh = null;
            materiaali = null;
            valot.Clear();
            tunnukset.Clear();
        }
    }
}
