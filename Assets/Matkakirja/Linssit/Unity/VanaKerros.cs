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
// SYVYYS (webin kohta 5, Ihmisen matka II:n erä 1 25.9.2026): fragmentti laskee
// pinnan pisteen PIKSELIN säteestä (käänteinen VP) ja kirjoittaa syvyyden siitä
// (SV_Depth, ZWrite On, ZTest Less). Saman pikselin fragmentit saavat täsmälleen
// saman syvyyden, joten peitto ei summaudu liitoksissa (omistajan näkemä
// raidoitus: 0,75 joka kärjessä) eikä kahden vanan päällekkäisyydessä;
// vahvempi peitto voittaa (webin alfabias). Syvyys vedetään 25 km kameraa kohti
// (SyvyysVetoKm), jotta korostettu maasto ei leikkaa kaistaa. Horisontin takaa
// kurkistava nelikulmio osuu etupinnan pisteeseen, joka on kaukana omasta
// janasta, ja hylätään; kärkivarjostin kutistaa janat, jotka ovat kokonaan
// horisontin takana, ja janat, joihin kello ei ole vielä ehtinyt.
//
// KUVAN ALUE (Ihmisen matka II): kuvanAlue + kuvanPeitto häivyttävät kaistan
// havainnekuvan alta (IhmisenMatka2Tehosteet asettaa joka kehys).
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
        /// <summary>Havainnekuvan alue ruudun osuuksina (origo VASEN YLÄKULMA, kuten UI); käytössä, kun kuvanPeitto > 0.</summary>
        public Rect kuvanAlue;
        /// <summary>Kaistan häivytys kuvan alueelta 0–1 (0 = ei häivytystä, I:ssä aina 0).</summary>
        public float kuvanPeitto;

        /// <summary>Syvyyden veto pinnan pisteestä kameraa kohti (km): korostetun maaston huiput jäävät kaistan taakse.</summary>
        public const double SyvyysVetoKm = 25.0;
        /// <summary>Täyden peiton lisäveto (km): vahvempi fragmentti voittaa (webin KAISTAN_ALFABIAS).</summary>
        public const double VahvuusVetoKm = 0.3;
        /// <summary>Peiton portaat syvyydessä: puolittajan tasapelit saavat saman syvyyden.</summary>
        public const float PeitonPortaat = 16f;
        /// <summary>Kuvan reunan pehmeys (ruudun uv).</summary>
        public const float KuvanReunaUv = 0.02f;

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
        static readonly int IdKaanteinen = Shader.PropertyToID("_MaailmastaYksikkoon");
        static readonly int IdSyvyys = Shader.PropertyToID("_Syvyys");
        static readonly int IdKuvanAlue = Shader.PropertyToID("_KuvanAlue");
        static readonly int IdKuvanHaivytys = Shader.PropertyToID("_KuvanHaivytys");

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
                maskiTekstuuri = JaettuMaski(rantamaski);
                materiaali.SetTexture(IdRantamaski, maskiTekstuuri);
            }
            materiaali.SetVector(IdMaski, new Vector4(maskiTekstuuri != null ? 1f : 0f,
                (float)VanaPiirto.RantamaskinKynnysAla, (float)VanaPiirto.RantamaskinKynnysYla, 0f));
            materiaali.SetFloat(IdLitistys, (float)(skaala.x / skaala.z));
            materiaali.SetVector(IdSyvyys, new Vector4((float)(SyvyysVetoKm * 1000.0 / skaala.x), (float)(VahvuusVetoKm * 1000.0 / skaala.x), PeitonPortaat, 0f));
            materiaali.SetVector(IdKuvanHaivytys, Vector4.zero);
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
            // Jaettu rantamaski elää istunnon (JaettuMaski): ei tuhota.
            maskiTekstuuri = null;
            janoja = 0;
        }

        void OnDestroy() => Pura();

        // ── Jaettu rantamaski ─────────────────────────────────────────────
        // 2880 × 1440 R8 -tekstuuri (4 Mt) rakennettiin ja ladattiin GPU:lle jokaisella ihmisen matkan
        // avauksella (tavumuunnos ~13 ms Macilla, ui piikit 24.9.). Nyt tavut muunnetaan taustasäikeessä
        // (EsivalmisteleMaski) ja tekstuuri luodaan kerran istunnossa ensimmäisellä käytöllä.

        static Ruutumaski jaetunLahde;
        static Texture2D jaettu;
        static System.Threading.Tasks.Task<byte[]> tavutTehtava;
        static Ruutumaski tavujenLahde;

        static byte[] MaskinTavut(Ruutumaski r)
        {
            // Rivi 0 = 90°N tekstuurin ensimmäiseksi riviksi (v = 0), kuten webissä (flipY false).
            var tavut = new byte[r.Maa.Length];
            for (var i = 0; i < tavut.Length; i++) tavut[i] = r.Maa[i] != 0 ? (byte)255 : (byte)0;
            return tavut;
        }

        /// <summary>Muuntaa rantamaskin tavut taustasäikeessä ennen avausta (LinssiOhjain.IhmisenMatkaSovitin).</summary>
        public static void EsivalmisteleMaski(Ruutumaski r)
        {
            if (r?.Maa == null || r == jaetunLahde || r == tavujenLahde) return;
            tavujenLahde = r;
            tavutTehtava = System.Threading.Tasks.Task.Run(() => MaskinTavut(r));
        }

        /// <summary>
        /// Jaettu tekstuuri valmiiksi latausvaiheessa, kun taustasäikeen tavut ovat valmiit (ajo 5, 24.9.: ensimmäinen
        /// ihmisen matkan avaus loi 4 Mt:n tekstuurin ja latasi sen GPU:lle avauksen kehyksessä).
        /// </summary>
        public static System.Collections.IEnumerator EsilataaMaski(Ruutumaski r)
        {
            if (r?.Maa == null) yield break;
            while (jaetunLahde != r && r == tavujenLahde && tavutTehtava != null && !tavutTehtava.IsCompleted) yield return null;
            if (jaetunLahde != r) JaettuMaski(r);
        }

        static Texture2D JaettuMaski(Ruutumaski r)
        {
            if (jaettu != null && jaetunLahde == r) return jaettu;
            if (jaettu != null) Destroy(jaettu);
            byte[] tavut = r == tavujenLahde && tavutTehtava is { IsCompleted: true, IsFaulted: false } ? tavutTehtava.Result : MaskinTavut(r);
            tavutTehtava = null;
            tavujenLahde = null;
            jaettu = new Texture2D(r.Leveys, r.Korkeus, TextureFormat.R8, false, true)
            {
                name = "Rantamaski",
                wrapModeU = TextureWrapMode.Repeat,
                wrapModeV = TextureWrapMode.Clamp,
                filterMode = FilterMode.Bilinear,
                hideFlags = HideFlags.DontSave,
            };
            jaettu.SetPixelData(tavut, 0);
            jaettu.Apply(false, true);
            jaetunLahde = r;
            return jaettu;
        }

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
            materiaali.SetMatrix(IdKaanteinen, (float4x4)yksikkoon);
            // Kuvan alue varjostimen uv:ksi (origo vasen ALAkulma).
            materiaali.SetVector(IdKuvanAlue, new Vector4(kuvanAlue.xMin, 1f - kuvanAlue.yMax, kuvanAlue.xMax, 1f - kuvanAlue.yMin));
            materiaali.SetVector(IdKuvanHaivytys, new Vector4(Mathf.Clamp01(kuvanPeitto), KuvanReunaUv, 0f, 0f));
            materiaali.SetVector(IdKamera, new Vector4((float)kameraU.x, (float)kameraU.y, (float)kameraU.z, 0f));

            // Mittakaava ruudun keskellä: km pistettä kohti korkeudella pinnasta
            // (Retina: yksi piste = LinssiOhjain.Pistekerroin pikseliä, kuten UI).
            var korkeusM = math.max(1.0, (math.length(kameraU) - 1.0) * skaala.x);
            var kerroin = (double)LinssiOhjain.Pistekerroin;
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
