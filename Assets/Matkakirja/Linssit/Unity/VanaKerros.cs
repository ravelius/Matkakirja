// VANAKERROS: ihmisen matkan vanat pallolla (web js/aikajana-vanat.js, piirto).
//
// Laskenta on puhtaassa ytimessä (Linssit/Ydin/Virrat/VanaPiirto.cs); tämä
// kerros vain kopioi janat GPU-puskuriin kerran ja kehyksen tilan
// varjostimen taulukoihin joka kehys, ja piirtää kaiken yhdellä
// proseduraalisella kutsulla (Graphics.RenderPrimitives, 6 kärkeä per jana,
// StructuredBuffer; toimii Metalilla, ei tarvitse Mesh-olioita eikä
// instanssointia).
//
// KOORDINAATIT: varjostin laskee kaiken YKSIKKÖAVARUUDESSA u = ECEF / (a+h,
// a+h, b+h), missä a ja b ovat WGS84:n säteet ja h = nosto (+3 km). Kaistan
// pinta on siellä yksikköpallo, joten webin säde–pallo-leikkaus ja
// etäisyydet toimivat sellaisinaan (webin uSade = 1). Janojen päätepisteet
// lasketaan CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed
// -kutsulla ja normalisoidaan; yksikköavaruus → maailma on
// georeferenssin muunnos × ecefToLocalMatrix × diag(a+h, a+h, b+h), laskettu
// doubleina joka kehys (PalloKierto voi liikuttaa georeferenssiä).
// Leveydet (km) muunnetaan yksiköiksi jakamalla (a+h):lla; navoilla virhe
// on 0,3 %, mikä ei näy.
//
// SYVYYS: ZTest LEqual pallon syvyyttä vasten, ZWrite Off. Nelikulmio on
// nostettu pinnan yläpuolelle (webin jänteen painuma + 0,001 säteestä), ja
// fragmentti laskee oikean pinnan pisteen säde–pallo-leikkauksella: pallon
// takapuolen janat peittää pallon syvyys, horisontin takaa kurkistava
// nelikulmio osuu etupinnan pisteeseen, joka on kaukana omasta janasta, ja
// hylätään. Lisäksi kärkivarjostin kutistaa janat, jotka ovat kokonaan
// horisontin takana (pallon normaali × suunta kameraan, kuten
// KaupunkiMerkit), ja janat, joihin kello ei ole vielä ehtinyt.
//
// PUUTTUU WEBISTÄ: kaista ei kirjoita syvyyttä, joten kahden ERI vanan
// päällekkäinen alue sekoittuu (webissä syvyystemppu päästää vain
// vahvemman läpi). Saman vanan sisällä omistussääntö pitää huolen, että
// jokainen pikseli kuuluu yhdelle janalle.
//
// KÄYTTÖ (linssi joka kehys):
//   var kerros = gameObject.AddComponent<VanaKerros>();
//   kerros.georeferenssi = …; kerros.varjostin = …; kerros.kamera = …;
//   kerros.Aseta(vanat, aineisto.Virrat, aineisto.Vanat.Kaista, rantamaski,
//                Ruutumaski.Kulkumaskista(aineisto.Maamaski));
//   kerros.Paivita(nyt, pito);          // kello (vuosia sitten)
//   kerros.Korosta("eurooppa");         // tutkimusvaihe; null palauttaa
//   var kohde = kerros.Karki(nyt);      // selkärangan kärki kameralle
//   kerros.Pura();
using System.Collections.Generic;
using System.Runtime.InteropServices;
using CesiumForUnity;
using Matkakirja.Linssit.Virrat;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class VanaKerros : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        [Tooltip("Matkakirja/Vana (Linssit/Varjostimet/Vana.shader).")]
        public Shader varjostin;
        [Tooltip("Kamera, jolle piirretään (km/px ja horisontti); tyhjä = Camera.main.")]
        public Camera kamera;
        [Tooltip("Kaistan pinta ellipsoidin yläpuolella, metreinä (viivat ja merkit ovat 5 km:ssä).")]
        public double nosto = 3000.0;
        [Tooltip("Vähennetty liike: päivitys enintään puolen sekunnin välein.")]
        public bool vahennettyLiike;

        /// <summary>Jana GPU:lle (7 × float4 = 112 tavua; sama järjestys kuin Vana.shaderin Jana).</summary>
        [StructLayout(LayoutKind.Sequential)]
        struct JanaGpu
        {
            public Vector4 P0, P1, P2, P3;   // yksikköavaruus xyz, w = kumulatiivinen matka
            public Vector4 Leveys;           // puolileveys A, B; etäisyys rantaan A, B (yksikköä)
            public Vector4 AikaMeri;         // saapumisaika A, B; merisyys A, B
            public Vector4 Tunnus;           // virta A, virta B, vana, rengas (0/1)
        }

        static readonly int IdJanat = Shader.PropertyToID("_Janat");
        static readonly int IdMatriisi = Shader.PropertyToID("_YksikostaMaailmaan");
        static readonly int IdKamera = Shader.PropertyToID("_Kamera");
        static readonly int IdLitistys = Shader.PropertyToID("_Litistys");
        static readonly int IdKuljettu = Shader.PropertyToID("_Kuljettu");
        static readonly int IdVanaPeitto = Shader.PropertyToID("_VanaPeitto");
        static readonly int IdVanha = Shader.PropertyToID("_Vanha");
        static readonly int IdKirkas = Shader.PropertyToID("_Kirkas");
        static readonly int IdAika = Shader.PropertyToID("_Aika");
        static readonly int IdLeveys = Shader.PropertyToID("_Leveys");
        static readonly int IdRengas = Shader.PropertyToID("_Rengas");
        static readonly int IdRengasVari = Shader.PropertyToID("_RengasVari");
        static readonly int IdMaski = Shader.PropertyToID("_Maski");
        static readonly int IdRantamaski = Shader.PropertyToID("_Rantamaski");

        VanaPiirto piirto;
        GraphicsBuffer puskuri;
        Material materiaali;
        Texture2D maskiTekstuuri;
        int janoja;
        double3 skaala;
        readonly float[] kuljettu = new float[VanaPiirto.VanaTaulukko];
        readonly float[] vanaPeitto = new float[VanaPiirto.VanaTaulukko];
        readonly Vector4[] vanha = new Vector4[VanaPiirto.VirtojaMax];
        readonly Vector4[] kirkas = new Vector4[VanaPiirto.VirtojaMax];

        /// <summary>Ytimen piirtotila (mittarit, testit).</summary>
        public VanaPiirto Piirto => piirto;

        /// <summary>Rakentaa vanat (webin luoVanat) ja lataa janat GPU:lle.</summary>
        public VanaPiirto Aseta(VanatTulos vanat, IReadOnlyList<Virta> virrat, Kaista kaista, Ruutumaski rantamaski,
            Ruutumaski kulkumaski = null)
        {
            var p = new VanaPiirto(vanat, virrat, kaista, rantamaski, kulkumaski);
            Aseta(p, rantamaski);
            return p;
        }

        /// <summary>Valmiiksi rakennettu piirto (sama rantamaski kuin rakennuksessa).</summary>
        public void Aseta(VanaPiirto p, Ruutumaski rantamaski)
        {
            Pura();
            if (p == null || georeferenssi == null || varjostin == null)
            {
                Debug.LogWarning("MATKAKIRJA vanat: piirto, georeferenssi tai varjostin puuttuu");
                return;
            }
            piirto = p;
            piirto.VahennettyLiike = vahennettyLiike;
            var sateet = CesiumWgs84Ellipsoid.GetRadii();
            skaala = new double3(sateet.x + nosto, sateet.y + nosto, sateet.z + nosto);

            // Renkaat ensin: webissä kotipesät piirtyvät ennen kaistaa (renderOrder 0,6 < 2).
            janoja = p.Renkaat.Count + p.Janat.Count;
            if (janoja == 0) return;
            var data = new JanaGpu[janoja];
            var n = 0;
            foreach (var j in p.Renkaat) data[n++] = Gpuksi(j);
            foreach (var j in p.Janat) data[n++] = Gpuksi(j);
            puskuri = new GraphicsBuffer(GraphicsBuffer.Target.Structured, janoja, Marshal.SizeOf<JanaGpu>());
            puskuri.SetData(data);

            materiaali = new Material(varjostin) { name = "Vanat", hideFlags = HideFlags.DontSave };
            materiaali.SetBuffer(IdJanat, puskuri);
            if (p.MaskiKaytossa && rantamaski?.Maa != null)
            {
                maskiTekstuuri = new Texture2D(rantamaski.Leveys, rantamaski.Korkeus, TextureFormat.R8, false, true)
                {
                    name = "Rantamaski",
                    wrapModeU = TextureWrapMode.Repeat,
                    wrapModeV = TextureWrapMode.Clamp,
                    filterMode = FilterMode.Bilinear,
                    hideFlags = HideFlags.DontSave,
                };
                // Rivi 0 = 90°N tekstuurin ensimmäiseksi riviksi (v = 0), kuten webissä (flipY false).
                var tavut = new byte[rantamaski.Maa.Length];
                for (var i = 0; i < tavut.Length; i++) tavut[i] = rantamaski.Maa[i] != 0 ? (byte)255 : (byte)0;
                maskiTekstuuri.SetPixelData(tavut, 0);
                maskiTekstuuri.Apply(false, true);
                materiaali.SetTexture(IdRantamaski, maskiTekstuuri);
            }
            materiaali.SetVector(IdMaski, new Vector4(maskiTekstuuri != null ? 1f : 0f,
                (float)VanaPiirto.RantamaskinKynnysAla, (float)VanaPiirto.RantamaskinKynnysYla, 0f));
            materiaali.SetFloat(IdLitistys, (float)(skaala.x / skaala.z));
            var pv = p.PesanVari;
            materiaali.SetVector(IdRengasVari, new Vector4((float)pv.R, (float)pv.G, (float)pv.B, 1f));
            Debug.Log($"MATKAKIRJA vanat: {p.VanojaPiirrossa} vanaa, {p.Janat.Count} janaa, {p.KotipesiaPiirrossa} kotipesää, maski {(maskiTekstuuri != null)}");
        }

        /// <summary>Kello siirtyi (vuosia sitten). Pito: piirretty vana ei koskaan lyhene.</summary>
        public bool Paivita(double nyt, bool pito = false)
        {
            if (piirto == null) return false;
            piirto.VahennettyLiike = vahennettyLiike;
            return piirto.Paivita(nyt, pito, Time.realtimeSinceStartupAsDouble * 1000.0);
        }

        /// <summary>Tutkimusvaiheen korostus (virran tunnus; null palauttaa).</summary>
        public bool Korosta(string virta) => piirto != null && piirto.Korosta(virta);

        /// <summary>Selkärangan kärki kameralle ennakolla (webin karki).</summary>
        public LatLon? Karki(double nyt) => piirto?.Karki(nyt);

        public void Pura()
        {
            piirto?.Pura();
            piirto = null;
            puskuri?.Release();
            puskuri = null;
            if (materiaali != null) Destroy(materiaali);
            materiaali = null;
            if (maskiTekstuuri != null) Destroy(maskiTekstuuri);
            maskiTekstuuri = null;
            janoja = 0;
        }

        void OnDestroy() => Pura();

        JanaGpu Gpuksi(in VananJana j)
        {
            var km = 1000.0 / skaala.x; // km → yksikkö
            return new JanaGpu
            {
                P0 = Piste(j.P0, j.Matka0),
                P1 = Piste(j.P1, j.Matka1),
                P2 = Piste(j.P2, j.Matka2),
                P3 = Piste(j.P3, j.Matka3),
                Leveys = new Vector4((float)(j.PuoliKmA * km), (float)(j.PuoliKmB * km), (float)(j.RantaKmA * km), (float)(j.RantaKmB * km)),
                AikaMeri = new Vector4((float)j.AikaA, (float)j.AikaB, (float)j.MeriA, (float)j.MeriB),
                Tunnus = new Vector4(j.VirtaA, j.VirtaB, j.Vana, j.Rengas ? 1f : 0f),
            };
        }

        /// <summary>Asteet → yksikköpallon piste (ECEF / säteet, normalisoitu); w = matka.</summary>
        Vector4 Piste(LatLon p, double matka)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.Lon, p.Lat, nosto));
            var u = math.normalize(ecef / skaala);
            return new Vector4((float)u.x, (float)u.y, (float)u.z, (float)matka);
        }

        void LateUpdate()
        {
            if (piirto == null || materiaali == null || janoja == 0) return;
            var pesiaNakyvissa = false;
            for (var i = 0; i < piirto.KotipesiaPiirrossa; i++) pesiaNakyvissa |= piirto.PesaNakyvissa(i);
            if (!piirto.Nakyvissa && !pesiaNakyvissa) return;
            var kam = kamera != null ? kamera : Camera.main;
            if (kam == null) return;

            // Yksikköavaruus → maailma doubleina: georeferenssin muunnos × ECEF→paikallinen × säteet.
            var paikallisesta = new double4x4((float4x4)georeferenssi.transform.localToWorldMatrix);
            var yksikosta = math.mul(math.mul(paikallisesta, georeferenssi.ecefToLocalMatrix),
                new double4x4(skaala.x, 0, 0, 0, 0, skaala.y, 0, 0, 0, 0, skaala.z, 0, 0, 0, 0, 1));
            var yksikkoon = math.inverse(yksikosta);
            var kameraU = math.mul(yksikkoon, new double4((float3)kam.transform.position, 1.0)).xyz;
            materiaali.SetMatrix(IdMatriisi, (float4x4)yksikosta);
            materiaali.SetVector(IdKamera, new Vector4((float)kameraU.x, (float)kameraU.y, (float)kameraU.z, 0f));

            // Mittakaava ruudun keskellä: km pistettä kohti korkeudella pinnasta
            // (Retina: yksi piste = dpi/163 pikseliä, kuten KaupunkiMerkit).
            var korkeusM = math.max(1.0, (math.length(kameraU) - 1.0) * skaala.x);
            var kerroin = Screen.dpi > 0 ? math.max(1.0, Screen.dpi / 163.0) : 1.0;
            var pisteita = math.max(1.0, kam.pixelHeight / kerroin);
            var kmPx = 2.0 * korkeusM * math.tan(math.radians(kam.fieldOfView) * 0.5) / pisteita / 1000.0;
            var mitat = VanaPiirto.Mitat(kmPx);
            var km = 1000.0 / skaala.x;
            materiaali.SetVector(IdLeveys, new Vector4((float)(mitat.MinPuoliKm * km), (float)(mitat.MinPuoliMeriKm * km),
                (float)(mitat.PehmennysKm * km), (float)piirto.MeriKerroin));
            materiaali.SetVector(IdRengas, new Vector4((float)(mitat.RengasPuoliKm * km), (float)(0.5 * kmPx * km), 0f, 0f));
            materiaali.SetVector(IdAika, new Vector4((float)piirto.Nyt, (float)piirto.Rintama, piirto.Pito ? 1f : 0f, (float)piirto.Peitto));

            for (var i = 0; i < VanaPiirto.VanojaMax; i++)
            {
                kuljettu[i] = (float)piirto.Kuljettu[i];
                vanaPeitto[i] = (float)piirto.VanaPeitto[i];
            }
            for (var i = 0; i < VanaPiirto.KotipesiaMax; i++)
            {
                var nakyva = i < piirto.KotipesiaPiirrossa && piirto.PesaNakyvissa(i);
                kuljettu[VanaPiirto.VanojaMax + i] = nakyva ? 1e30f : 0f;
                vanaPeitto[VanaPiirto.VanojaMax + i] = i < piirto.KotipesiaPiirrossa ? (float)piirto.PesanPeitto(i) : 0f;
            }
            for (var i = 0; i < VanaPiirto.VirtojaMax; i++)
            {
                vanha[i] = new Vector4((float)piirto.Vanha[i * 3], (float)piirto.Vanha[i * 3 + 1], (float)piirto.Vanha[i * 3 + 2], 1f);
                kirkas[i] = new Vector4((float)piirto.Kirkas[i * 3], (float)piirto.Kirkas[i * 3 + 1], (float)piirto.Kirkas[i * 3 + 2], 1f);
            }
            materiaali.SetFloatArray(IdKuljettu, kuljettu);
            materiaali.SetFloatArray(IdVanaPeitto, vanaPeitto);
            materiaali.SetVectorArray(IdVanha, vanha);
            materiaali.SetVectorArray(IdKirkas, kirkas);

            var keskus = math.mul(yksikosta, new double4(0, 0, 0, 1)).xyz;
            var rp = new RenderParams(materiaali)
            {
                worldBounds = new Bounds((Vector3)(float3)keskus, Vector3.one * (float)(4.0 * skaala.x)),
                camera = kamera,
                layer = gameObject.layer,
                shadowCastingMode = ShadowCastingMode.Off,
                receiveShadows = false,
            };
            Graphics.RenderPrimitives(rp, MeshTopology.Triangles, janoja * 6, 1);
        }
    }
}
