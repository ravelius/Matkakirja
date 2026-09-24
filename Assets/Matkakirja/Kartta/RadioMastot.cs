using System;
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Radio;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;
using Num = System.Numerics;

namespace Matkakirja
{
    /// <summary>
    /// RADIOMASTOT PALLOLLA (radiouudistus build 12; suunnitelma docs/raportit/linssi-radiouudistus-suunnitelma-20260924.md
    /// luvut 3–6 ja 9, havainnekuva hyväksytty omistajalla 24.9.2026). Linssisepän RadioLinssi kutsuu tätä
    /// IRadioMastot-rajapinnan kautta (silta Scripts/Kartta/RadioMastotSilta.cs asettaa
    /// LinssiOhjain.RadioSovitin.MastoPiirto), ja tämä piirtää:
    ///
    ///   hämärä     tileset-varjostimen globaali _radioHamara (RadioHamara, Shaders/Cesium/Lahde~/tee_tileset.py) ja sama
    ///              kaava napakansille, mastoille ja kameran taustalle; ei omaa piirtokutsua
    ///   mastot     kolme proseduraalista verkkoa (MastoGeometria: Iso, Keski, Pieni) GPU-instansseina (Shaders/Radiomasto),
    ///              3 piirtokutsua; pinnan normaalin suuntaisina, korkeus ruudulla Mastot.KorkeusPt × pistekerroin × kasvu
    ///              (KorkeusM:n zoomilaki; lyheneminen korvataan 40°:n kallistukseen asti) × nousu; ristikko viivoina;
    ///              kanavaton maa 50 % peittävyydellä ilman valoja; pallon takana olevat karsitaan
    ///   valot      lentoestevalot yhtenä instansoituna billboard-kutsuna (Shaders/Lentoestevalo): tasot
    ///              Mastot.Valotasot, muiden mastojen vilkku varjostimessa (jakso ja vaihe Mastot.Vilkku), valitun
    ///              maston kaikki tasot sen kirkkaudella; halo 6,8 × (valittu 12 ×) valon säde
    ///   maavalo    lämmin #ff8a4a valitun maston ympärillä, säde 110–140 km kirkkauden mukaan, nousee 0,8 s:ssa
    ///              valinnan vaihtuessa (tileset-varjostimen _radioMaavalo, emissiona)
    ///   renkaat    pallokalotti 2 km pinnan yläpuolella yhdellä piirtokutsulla (Shaders/Radiorengas)
    ///   yövalot    uniformit valmiina (_radioYonValot), kerros odottaa Karttasepän Black Marble -polttoa
    ///
    /// Napautus: mastot korvaavat ▶-napit. Osuma-alue on 44 × 44 pt maston puolivälissä (Osuma); osuma ilmoitetaan
    /// PalloKierto.IlmoitaKaupunki-reittiä, jota RadioSovitin kuuntelee (→ RadioLinssi.SoitaKaupunki). Radion aikana
    /// peli ei käsittele kaupungin napautusta (PeliOhjain.NapautusSallittu = RadioLinssi.LuentaSallittu).
    ///
    /// Budjetti iPhonella &lt; 1,0 ms GPU:ta; prosessorilla ei kehyskohtaisia allokaatioita (taulukot varataan
    /// Mastot-kutsussa, joka tulee kerran avauksessa).
    /// </summary>
    public sealed class RadioMastot : MonoBehaviour, IRadioMastot
    {
        public static RadioMastot Instanssi { get; private set; }

        public CesiumGeoreference georeferenssi;
        public PalloKierto kierto;
        public KaupunkiMerkit merkit;
        public Material mastoMateriaali, valoMateriaali, rengasMateriaali;

        [Tooltip("Osuma-alueen sivu iOS-pisteinä maston puolivälissä (suunnitelma luku 4).")]
        public float osumaPt = 44f;
        [Tooltip("Lentoestevalon säde pisteinä 2 600 km:stä (havainnekuva mastot.js 2,1; valittu 2,8).")]
        public float valoPt = 2.1f, valittuValoPt = 2.8f;
        [Tooltip("Renkaiden korkeus pinnan yläpuolella (m).")]
        public float renkaanKorkeusM = 2000f;
        [Tooltip("Maavalon väri (suunnitelma luku 5: #ff8a4a).")]
        public Color maavalonVari = new Color32(0xff, 0x8a, 0x4a, 0xff);
        [Tooltip("Maavalon nousu valinnan vaihtuessa (s).")]
        public float maavalonNousuS = 0.8f;

        /// <summary>Mastoa napautettiin (kaupungin id); ilmoitetaan myös PalloKierto.IlmoitaKaupunki-reittiä.</summary>
        public event Action<string> MastoNapautettu;

        static readonly int HamaraId = Shader.PropertyToID("_radioHamara");
        static readonly int MaavaloId = Shader.PropertyToID("_radioMaavalo");
        static readonly int MaavaloVariId = Shader.PropertyToID("_radioMaavaloVari");
        static readonly int YonValotId = Shader.PropertyToID("_radioYonValot");
        static readonly int PeittoId = Shader.PropertyToID("_Peitto");
        static readonly int ValoId = Shader.PropertyToID("_Valo");
        static readonly int SadeId = Shader.PropertyToID("_Sade");
        static readonly int ViivaId = Shader.PropertyToID("_Viiva");
        static readonly int SadeValittuId = Shader.PropertyToID("_SadeValittu");
        static readonly int KeskusId = Shader.PropertyToID("_Keskus");
        static readonly int PohjaId = Shader.PropertyToID("_Pohja");
        static readonly int ItaId = Shader.PropertyToID("_Ita");
        static readonly int PohjoinenId = Shader.PropertyToID("_Pohjoinen");
        static readonly int MitatId = Shader.PropertyToID("_Mitat");
        static readonly int Renkaat0Id = Shader.PropertyToID("_Renkaat0");
        static readonly int Renkaat1Id = Shader.PropertyToID("_Renkaat1");

        const int EnintaanMastoja = 512, EnintaanValoja = 1023, EnintaanRenkaita = 8;
        const double MaanSade = 6_371_000.0;

        struct Tieto
        {
            public string Id;
            public int Koko;
            public Vector3 Juuri, Normaali;
            public Quaternion Kierto;
            public float Sade;          // juuren etäisyys maan keskipisteestä (paikallinen pinta)
            public float Peitto;        // 1 tai 0,5 (kanavaton)
            public bool Valot;
            public float Jakso, Vaihe;
            public float Nousu;
        }

        readonly Tieto[] tiedot = new Tieto[EnintaanMastoja];
        readonly Dictionary<string, int> indeksi = new Dictionary<string, int>();
        int maara;
        float mastotAika;

        readonly Mesh[] verkot = new Mesh[3];
        Mesh valoVerkko, rengasVerkko;
        readonly Matrix4x4[][] matriisit = { new Matrix4x4[EnintaanMastoja], new Matrix4x4[EnintaanMastoja], new Matrix4x4[EnintaanMastoja] };
        readonly float[][] peitot = { new float[EnintaanMastoja], new float[EnintaanMastoja], new float[EnintaanMastoja] };
        readonly int[] lkm = new int[3];
        readonly MaterialPropertyBlock[] mastoMpb = new MaterialPropertyBlock[3];
        readonly Matrix4x4[] valoMatriisit = new Matrix4x4[EnintaanValoja];
        readonly Vector4[] valoTiedot = new Vector4[EnintaanValoja];
        MaterialPropertyBlock valoMpb, rengasMpb;
        static readonly float[][] Tasot = new float[3][];

        // Osumatesti: näkyvien mastojen puolivälit ruudulla (pikseleinä) edellisestä kehyksestä.
        readonly float[] osumaX = new float[EnintaanMastoja], osumaY = new float[EnintaanMastoja];
        readonly int[] osumaIndeksi = new int[EnintaanMastoja];
        int osumia;

        float hamara;
        int valittu = -1;
        float kirkkaus, maavalo;
        readonly float[] renkaat = new float[EnintaanRenkaita];
        int renkaita;
        double rLat = double.NaN, rLon = double.NaN, rSadeKm;
        Vector3 rPohja, rIta, rPohjoinen;
        float rSade;
        double yLat = double.NaN, yLon = double.NaN;
        Vector3 yPaikka;
        bool maavaloPaalla;

        Vector3 keskus, akseli;
        bool valmis;
        Camera kamera;
        Color alkuTausta;
        bool taustaTallessa;

        // ---- Elinkaari ----

        void Awake()
        {
            Instanssi = this;
            for (int k = 0; k < 3; k++)
            {
                var t = Linssit.Radio.Mastot.Valotasot((MastoKoko)k);
                Tasot[k] = new float[t.Count];
                for (int i = 0; i < t.Count; i++) Tasot[k][i] = (float)t[i];
                mastoMpb[k] = new MaterialPropertyBlock();
            }
            valoMpb = new MaterialPropertyBlock();
            rengasMpb = new MaterialPropertyBlock();
        }

        void Start() => Alusta();

        bool alustettu;

        /// <summary>
        /// Kertaluonteinen alustus (Start, tai ensimmäinen rajapintakutsu, jos silta loi komponentin juuri ennen
        /// radion avausta eikä Start ole vielä ehtinyt).
        /// </summary>
        void Alusta()
        {
            if (alustettu) return;
            alustettu = true;
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (georeferenssi == null) georeferenssi = FindAnyObjectByType<CesiumGeoreference>();
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (merkit == null) merkit = FindAnyObjectByType<KaupunkiMerkit>();
            if (kierto != null) kierto.Napautettu += Napautus;
            // Ajonaikainen varamateriaali (editori, tai jos Rakennus.LuoPallo ei ole vielä luonut materiaaleja):
            // käännöksessä varjostimen pitää olla materiaalissa, muuten URP karsii sen.
            if (mastoMateriaali == null) mastoMateriaali = Varamateriaali("Matkakirja/Radiomasto");
            if (valoMateriaali == null) valoMateriaali = Varamateriaali("Matkakirja/Lentoestevalo");
            if (rengasMateriaali == null) rengasMateriaali = Varamateriaali("Matkakirja/Radiorengas");
            // RenderMeshInstanced vaatii instansoinnin materiaalilta (Rakennus asettaa sen myös assetille).
            if (mastoMateriaali != null) mastoMateriaali.enableInstancing = true;
            if (valoMateriaali != null) valoMateriaali.enableInstancing = true;
            for (int k = 0; k < 3; k++) verkot[k] = Verkko(MastoGeometria.Verkko(k), "Radiomasto " + (MastoKoko)k);
            valoVerkko = Nelio();
            rengasVerkko = Kalotti(16, 96);
            if (georeferenssi != null)
            {
                var gt = georeferenssi.transform;
                keskus = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero));
                akseli = gt.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 0, 1))).normalized;
                valmis = true;
            }
            // Edellisen kohtauksen jäljiltä voimassa olevat globaalit nollaan (0 = tileset ennallaan).
            Shader.SetGlobalFloat(HamaraId, 0f);
            maavaloPaalla = true;
            AsetaGlobaalit();
        }

        void OnDestroy()
        {
            if (kierto != null) kierto.Napautettu -= Napautus;
            if (Instanssi == this) Instanssi = null;
            hamara = 0; maara = 0; valittu = -1; maavaloPaalla = true;
            Shader.SetGlobalFloat(HamaraId, 0f);
            AsetaGlobaalit();
        }

        static Material Varamateriaali(string varjostin)
        {
            var s = Shader.Find(varjostin);
            if (s == null) { Debug.LogWarning("MATKAKIRJA mastot: varjostin puuttuu " + varjostin); return null; }
            return new Material(s) { enableInstancing = true };
        }

        // ---- IRadioMastot ----

        public void Mastot(IReadOnlyList<Masto> lista)
        {
            Alusta();
            maara = 0;
            indeksi.Clear();
            valittu = -1;
            osumia = 0;
            if (lista == null || !valmis) return;
            var gt = georeferenssi.transform;
            for (int i = 0; i < lista.Count && maara < EnintaanMastoja; i++)
            {
                var m = lista[i];
                if (m?.Id == null || indeksi.ContainsKey(m.Id)) continue;
                double korkeus = merkit != null && merkit.PintaKorkeus(m.Id) is double h ? KorkeusKerroin.Sovita(h) : 0;
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(m.Lon, m.Lat, korkeus));
                Vector3 juuri = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef));
                Vector3 n = (juuri - keskus).normalized;
                // Paikallinen pohjoinen (napa-akselin projektio tangenttitasoon): ristikko on kaikkialla samassa asennossa.
                Vector3 pohjoinen = akseli - n * Vector3.Dot(akseli, n);
                if (pohjoinen.sqrMagnitude < 1e-8f) pohjoinen = Vector3.Cross(n, Vector3.right);
                var (jakso, vaihe) = Linssit.Radio.Mastot.Vilkku(m.Asema);
                tiedot[maara] = new Tieto
                {
                    Id = m.Id, Koko = (int)m.Koko, Juuri = juuri, Normaali = n,
                    Kierto = Quaternion.LookRotation(pohjoinen.normalized, n),
                    Sade = (juuri - keskus).magnitude, Peitto = m.Kanava ? 1f : 0.5f, Valot = m.Kanava,
                    Jakso = (float)jakso, Vaihe = (float)vaihe, Nousu = 0f,
                };
                indeksi[m.Id] = maara++;
            }
            mastotAika = Time.unscaledTime;
            Debug.Log($"MATKAKIRJA mastot: {maara} mastoa");
        }

        public void Nousu(string id, float osuus)
        {
            if (id != null && indeksi.TryGetValue(id, out int i)) tiedot[i].Nousu = Mathf.Clamp01(osuus);
        }

        public void Hamara(float h)
        {
            hamara = Mathf.Clamp01(float.IsNaN(h) ? 0 : h);
            Shader.SetGlobalFloat(HamaraId, hamara);
            Tausta();
        }

        public void Valittu(string id, float kirkkaus)
        {
            int uusi = id != null && indeksi.TryGetValue(id, out int i) ? i : -1;
            if (uusi != valittu) maavalo = 0f;   // uusi masto: maavalo nousee alusta (0,8 s)
            valittu = uusi;
            this.kirkkaus = Mathf.Clamp01(kirkkaus);
        }

        public void Renkaat(double lat, double lon, double sadeKm, IReadOnlyList<double> osuudet)
        {
            Alusta();
            renkaita = 0;
            if (osuudet != null)
                for (int i = 0; i < osuudet.Count && renkaita < EnintaanRenkaita; i++)
                    if (osuudet[i] >= 0 && osuudet[i] <= 1) renkaat[renkaita++] = (float)osuudet[i];
            rSadeKm = sadeKm;
            if (renkaita == 0 || sadeKm <= 0 || !valmis) { renkaita = 0; return; }
            if (lat == rLat && lon == rLon) return;
            rLat = lat; rLon = lon;
            var gt = georeferenssi.transform;
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, 0));
            Vector3 p = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef));
            rPohja = (p - keskus).normalized;
            rPohjoinen = (akseli - rPohja * Vector3.Dot(akseli, rPohja)).normalized;
            if (rPohjoinen.sqrMagnitude < 0.5f) rPohjoinen = Vector3.Cross(rPohja, Vector3.right).normalized;
            rIta = Vector3.Cross(rPohjoinen, rPohja).normalized;
            rSade = (p - keskus).magnitude + renkaanKorkeusM;
        }

        public void YonValot(double lat, double lon, float paikallinen)
        {
            // YÖVALOT (suunnitelma luku 3): NASA Black Marble -kerros ei ole vielä käytössä, koska Karttasepän poltto
            // Z0–Z6 puuttuu (tulee E28:n jälkeen). Uniformit asetetaan jo, jotta tileset-varjostimen RadioHamara-funktioon
            // lisätään vain rasterin näyte, kun sarja on ämpärissä.
            Alusta();
            if (!valmis) return;
            if (lat != yLat || lon != yLon)
            {
                yLat = lat; yLon = lon;
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, 0));
                yPaikka = georeferenssi.transform.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef));
            }
            Shader.SetGlobalVector(YonValotId, new Vector4(yPaikka.x, yPaikka.y, yPaikka.z, Mathf.Clamp01(paikallinen)));
        }

        // ---- Tila ja testit ----

        public int Maara => maara;
        public float HamaraArvo => hamara;
        public string ValittuId => valittu >= 0 ? tiedot[valittu].Id : null;
        public int Renkaita => renkaita;
        public int Nakyvia => osumia;
        public int Valoja { get; private set; }

        /// <summary>Kaikkien mastojen id:t (testikomento).</summary>
        public IEnumerable<string> Idt { get { for (int i = 0; i < maara; i++) yield return tiedot[i].Id; } }

        /// <summary>
        /// Osumatesti (suunnitelma luku 4): ruudun piste pikseleinä (origo vasen alakulma kuten PalloKierto.Napautettu)
        /// → maston kaupunki-id tai null. Osuma-alue on osumaPt × osumaPt maston puolivälissä; lähin voittaa.
        /// </summary>
        public string Osuma(Vector2 ruutu)
        {
            int i = MastoGeometria.Osuma(osumaX, osumaY, osumia, ruutu.x, ruutu.y, osumaPt * 0.5f * PalloKierto.Pistekerroin);
            return i < 0 ? null : tiedot[osumaIndeksi[i]].Id;
        }

        /// <summary>Maston puolivälin paikka ruudulla (testikomento "mastot osoita id"); false, jos ei näy.</summary>
        public bool RuutuPaikka(string id, out Vector2 ruutu)
        {
            ruutu = default;
            if (id == null || !indeksi.TryGetValue(id, out int m)) return false;
            for (int i = 0; i < osumia; i++)
                if (osumaIndeksi[i] == m) { ruutu = new Vector2(osumaX[i], osumaY[i]); return true; }
            return false;
        }

        void Napautus(Vector2 ruutu)
        {
            if (maara == 0 || hamara <= 0f) return;
            var id = Osuma(ruutu);
            if (id == null) return;
            Debug.Log("MATKAKIRJA mastot: napautus " + id);
            MastoNapautettu?.Invoke(id);
            kierto.IlmoitaKaupunki(id);
        }

        // ---- Piirto ----

        void LateUpdate()
        {
            Valoja = 0;
            if (!valmis || (maara == 0 && renkaita == 0))
            {
                osumia = 0;
                if (maavaloPaalla) AsetaGlobaalit();
                return;
            }
            if (kamera == null) kamera = kierto != null ? kierto.GetComponent<Camera>() : Camera.main;
            if (kamera == null) return;
            Vector3 kameraPaikka = kamera.transform.position;
            // KOKO RUUDULLA (b12d-korjaus): mastot olivat noin 0,55 × liian lyhyitä, koska Mastot.KorkeusM:n vakio olettaa
            // suoraan ylhäältä katsotun kartan (2 400 km iPadin 1 024 pt:n leveydellä) ja kameran korkeuden. Radion
            // 40°:n kallistuksessa (1) pystymasto lyhenee ruudulla kertoimella sin φ ≈ 0,64 (φ = näkösäteen ja maston
            // välinen kulma) ja (2) tähän syötetty korkeus oli silmän korkeus maan pinnasta (noin 2 200 km), kun
            // PalloKierto.korkeus on etäisyys katsottavaan pisteeseen (2 600 km): 0,87 potenssin 0,85 jälkeen.
            // 0,64 × 0,87 ≈ 0,56. Nyt korkeus lasketaan ruudusta: tavoite = Mastot.KorkeusPt × pistekerroin × kasvu
            // (KorkeusM:n zoomilaki), ja juuren kohdalla mitataan pikseliä metriä kohden normaalin suunnassa.
            // Lyheneminen korvataan 40°:een asti (MastoGeometria.KorkeusRuudulle).
            double etaisyys = kierto != null && kierto.korkeus > 0 ? kierto.korkeus : Math.Max(1000.0, (kameraPaikka - keskus).magnitude - MaanSade);
            float kerroin = PalloKierto.Pistekerroin;
            float kasvu = MastoGeometria.Kasvu(etaisyys);
            var nk = new Num.Vector3(kameraPaikka.x, kameraPaikka.y, kameraPaikka.z);
            var no = new Num.Vector3(keskus.x, keskus.y, keskus.z);
            float t0 = (float)Linssit.Radio.Mastot.KorkeusPt(MastoKoko.Pieni) * kerroin * kasvu;
            float t1 = (float)Linssit.Radio.Mastot.KorkeusPt(MastoKoko.Keski) * kerroin * kasvu;
            float t2 = (float)Linssit.Radio.Mastot.KorkeusPt(MastoKoko.Iso) * kerroin * kasvu;
            const float Mittapuikko = 20_000f;
            bool nousuOhi = Time.unscaledTime - mastotAika > 2f;   // RadioLinssi syöttää nousun vain avauksen ajan

            lkm[0] = lkm[1] = lkm[2] = 0;
            osumia = 0;
            int valoja = 0;
            for (int i = 0; i < maara; i++)
            {
                ref var m = ref tiedot[i];
                float nousu = nousuOhi ? 1f : m.Nousu;
                if (nousu <= 0.001f) continue;
                Vector3 s0 = kamera.WorldToScreenPoint(m.Juuri);
                if (s0.z <= 0) continue;
                Vector3 s1 = kamera.WorldToScreenPoint(m.Juuri + m.Normaali * Mittapuikko);
                float pxPerM = new Vector2(s1.x - s0.x, s1.y - s0.y).magnitude / Mittapuikko;
                float sinPhi = Vector3.Cross((m.Juuri - kameraPaikka).normalized, m.Normaali).magnitude;
                float h = MastoGeometria.KorkeusRuudulle(m.Koko == 2 ? t2 : m.Koko == 1 ? t1 : t0, pxPerM, sinPhi);
                if (h <= 0) continue;
                float korkeusNyt = h * nousu;
                Vector3 huippu = m.Juuri + m.Normaali * korkeusNyt;
                float raja = m.Sade - 500f;
                if (MastoGeometria.PallonTakana(nk, N(huippu), no, raja)) continue;
                int k = m.Koko;
                matriisit[k][lkm[k]] = Matrix4x4.TRS(m.Juuri, m.Kierto, new Vector3(h, korkeusNyt, h));
                peitot[k][lkm[k]] = m.Peitto;
                lkm[k]++;

                Vector3 puoli = m.Juuri + m.Normaali * (korkeusNyt * 0.5f);
                if (!MastoGeometria.PallonTakana(nk, N(puoli), no, raja))
                {
                    Vector3 r = kamera.WorldToScreenPoint(puoli);
                    if (r.z > 0) { osumaX[osumia] = r.x; osumaY[osumia] = r.y; osumaIndeksi[osumia++] = i; }
                }

                if (!m.Valot) continue;
                var tasot = Tasot[k];
                for (int t = 0; t < tasot.Length && valoja < EnintaanValoja; t++)
                {
                    Vector3 p = m.Juuri + m.Normaali * (korkeusNyt * tasot[t]);
                    if (MastoGeometria.PallonTakana(nk, N(p), no, raja)) continue;
                    valoMatriisit[valoja] = Matrix4x4.Translate(p);
                    valoTiedot[valoja++] = new Vector4(m.Jakso, m.Vaihe, i == valittu ? kirkkaus : -1f, nousu);
                }
            }
            Valoja = valoja;

            var rp = new RenderParams(mastoMateriaali)
            {
                camera = kamera,
                layer = gameObject.layer,
                shadowCastingMode = ShadowCastingMode.Off,
                receiveShadows = false,
                worldBounds = new Bounds(keskus, Vector3.one * 2.6e7f),
            };
            if (mastoMateriaali != null)
                for (int k = 0; k < 3; k++)
                {
                    if (lkm[k] == 0) continue;
                    mastoMpb[k].SetFloatArray(PeittoId, peitot[k]);
                    mastoMpb[k].SetFloat(ViivaId, kerroin * Mathf.Clamp(kasvu, 0.8f, 2f));
                    rp.matProps = mastoMpb[k];
                    Graphics.RenderMeshInstanced(rp, verkot[k], 0, matriisit[k], lkm[k]);
                }
            if (valoja > 0 && valoMateriaali != null)
            {
                float mittakaava = MastoGeometria.ValonMittakaava(etaisyys);
                valoMpb.SetVectorArray(ValoId, valoTiedot);
                valoMpb.SetFloat(SadeId, valoPt * mittakaava * kerroin);
                valoMpb.SetFloat(SadeValittuId, valittuValoPt * mittakaava * kerroin);
                rp.material = valoMateriaali;
                rp.matProps = valoMpb;
                Graphics.RenderMeshInstanced(rp, valoVerkko, 0, valoMatriisit, valoja);
            }
            if (renkaita > 0 && rengasMateriaali != null)
            {
                // Kalotti ulottuu kuuluvuussäteen yli hehkun verran (3 pt ≈ alle 3 % pallon mittakaavassa).
                float kulma = (float)(rSadeKm * 1000.0 / MaanSade);
                rengasMpb.SetVector(KeskusId, keskus);
                rengasMpb.SetVector(PohjaId, rPohja);
                rengasMpb.SetVector(ItaId, rIta);
                rengasMpb.SetVector(PohjoinenId, rPohjoinen);
                rengasMpb.SetVector(MitatId, new Vector4(kulma * 1.04f, rSade, kerroin, kulma));
                rengasMpb.SetVector(Renkaat0Id, new Vector4(R(0), R(1), R(2), R(3)));
                rengasMpb.SetVector(Renkaat1Id, new Vector4(R(4), R(5), R(6), R(7)));
                rp.material = rengasMateriaali;
                rp.matProps = rengasMpb;
                Graphics.RenderMesh(rp, rengasVerkko, 0, Matrix4x4.identity);
            }

            // Maavalo valitun maston ympärillä: nousee 0,8 s:ssa valinnan vaihtuessa, seuraa kirkkautta.
            maavalo = valittu >= 0 ? Mathf.MoveTowards(maavalo, 1f, Time.unscaledDeltaTime / Mathf.Max(0.01f, maavalonNousuS)) : 0f;
            AsetaGlobaalit();
        }

        float R(int i) => i < renkaita ? renkaat[i] : -1f;

        static Num.Vector3 N(Vector3 v) => new Num.Vector3(v.x, v.y, v.z);

        void AsetaGlobaalit()
        {
            bool paalla = valittu >= 0 && maara > 0 && kirkkaus > 0f && maavalo > 0f;
            if (paalla)
            {
                var j = tiedot[valittu].Juuri;
                Shader.SetGlobalVector(MaavaloId, new Vector4(j.x, j.y, j.z, MastoGeometria.MaavalonSadeM(kirkkaus)));
                var v = maavalonVari.linear;
                // Tasainen pohja + VU-tahti (b12d: pelkkä kirkkaus 0,25…1 jätti maavalon hiljaisissa kohdissa näkymättömäksi).
                float s = (0.55f + 0.45f * kirkkaus) * Pehmea(maavalo);
                Shader.SetGlobalVector(MaavaloVariId, new Vector4(v.r * s, v.g * s, v.b * s, 1f));
            }
            else if (maavaloPaalla || !Application.isPlaying)
            {
                Shader.SetGlobalVector(MaavaloId, Vector4.zero);
                Shader.SetGlobalVector(MaavaloVariId, Vector4.zero);
            }
            maavaloPaalla = paalla;
            if (maara == 0 && hamara <= 0f) Shader.SetGlobalVector(YonValotId, Vector4.zero);
        }

        static float Pehmea(float t) { t = Mathf.Clamp01(t); return t * t * t * (t * (t * 6f - 15f) + 10f); }

        /// <summary>Kameran tausta (avaruus) tummuu hämärän mukana samalla kaavalla; palautuu, kun hämärä on 0.</summary>
        void Tausta()
        {
            if (kamera == null) kamera = kierto != null ? kierto.GetComponent<Camera>() : Camera.main;
            if (kamera == null || kamera.clearFlags != CameraClearFlags.SolidColor) return;
            if (hamara <= 0f)
            {
                if (taustaTallessa) kamera.backgroundColor = alkuTausta;
                taustaTallessa = false;
                return;
            }
            if (!taustaTallessa) { alkuTausta = kamera.backgroundColor; taustaTallessa = true; }
            var l = alkuTausta.linear;
            var t = new Color(MastoGeometria.Hamara(l.r, 0, hamara), MastoGeometria.Hamara(l.g, 1, hamara), MastoGeometria.Hamara(l.b, 2, hamara), alkuTausta.a);
            kamera.backgroundColor = t.gamma;
        }

        // ---- Verkot ----

        static Mesh Verkko(MastoVerkko v, string nimi)
        {
            int n = v.Paikat.Count;
            var paikat = new Vector3[n];
            var normaalit = new Vector3[n];
            var varit = new Color32[n];
            var viivat = new List<Vector2>(n);
            var alut = new List<Vector3>(n);
            var loput = new List<Vector3>(n);
            for (int i = 0; i < n; i++)
            {
                var p = v.Paikat[i]; var q = v.Normaalit[i]; uint c = v.Varit[i];
                paikat[i] = new Vector3(p.X, p.Y, p.Z);
                normaalit[i] = new Vector3(q.X, q.Y, q.Z);
                varit[i] = new Color32((byte)c, (byte)(c >> 8), (byte)(c >> 16), (byte)(c >> 24));
                viivat.Add(new Vector2(v.Viivat[i].X, v.Viivat[i].Y));
                alut.Add(new Vector3(v.Alut[i].X, v.Alut[i].Y, v.Alut[i].Z));
                loput.Add(new Vector3(v.Loput[i].X, v.Loput[i].Y, v.Loput[i].Z));
            }
            var m = new Mesh { name = nimi };
            m.vertices = paikat;
            m.normals = normaalit;
            m.colors32 = varit;
            m.SetUVs(0, viivat);
            m.SetUVs(1, alut);
            m.SetUVs(2, loput);
            m.triangles = v.Kolmiot.ToArray();
            m.RecalculateBounds();
            m.UploadMeshData(true);
            return m;
        }

        /// <summary>Billboardin neliö: kulmat uv:ssa (−1…1), kärkivaihe levittää ruudulla.</summary>
        static Mesh Nelio()
        {
            var m = new Mesh { name = "Lentoestevalo" };
            m.vertices = new Vector3[4];
            m.uv = new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1) };
            m.triangles = new[] { 0, 2, 1, 0, 3, 2 };
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 1e5f);
            m.UploadMeshData(true);
            return m;
        }

        /// <summary>Napakoordinaattiruudukko kalotille: uv.x = säteen osuus 0…1, uv.y = kiertokulma 0…1.</summary>
        static Mesh Kalotti(int sateita, int kulmia)
        {
            var uv = new Vector2[(sateita + 1) * (kulmia + 1)];
            for (int r = 0; r <= sateita; r++)
                for (int a = 0; a <= kulmia; a++)
                    uv[r * (kulmia + 1) + a] = new Vector2((float)r / sateita, (float)a / kulmia);
            var kolmiot = new int[sateita * kulmia * 6];
            int t = 0;
            for (int r = 0; r < sateita; r++)
                for (int a = 0; a < kulmia; a++)
                {
                    int i = r * (kulmia + 1) + a, j = i + kulmia + 1;
                    kolmiot[t++] = i; kolmiot[t++] = j; kolmiot[t++] = i + 1;
                    kolmiot[t++] = i + 1; kolmiot[t++] = j; kolmiot[t++] = j + 1;
                }
            var m = new Mesh { name = "Radiorenkaat" };
            m.vertices = new Vector3[uv.Length];
            m.uv = uv;
            m.triangles = kolmiot;
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 2.6e7f);
            m.UploadMeshData(true);
            return m;
        }

        // ---- Testitila (Komennot: "mastot koe") ----

        bool koe;
        float koeAlku;
        readonly List<double> koeRenkaat = new List<double>();

        /// <summary>
        /// Kokeilu ilman radiolinssiä: mastot kaupunkimerkeistä (koko vuorotellen, joka viides kanavaton), hämärä 1,
        /// valittu masto kameraa lähinnä, VU-tahtia jäljittelevä kirkkaus ja renkaat Mastot.Renkaat-ajoituksella.
        /// </summary>
        public void Koe(bool paalle, int enintaan = 115)
        {
            koe = paalle;
            if (!paalle)
            {
                Valittu(null, 0); Renkaat(0, 0, 0, null); Hamara(0); Mastot(null);
                return;
            }
            var lista = new List<Masto>();
            if (merkit != null)
                foreach (var k in merkit.Kaupungit())
                {
                    if (lista.Count >= enintaan) break;
                    int n = lista.Count;
                    lista.Add(new Masto { Id = k.id, Asema = k.maa, Lat = k.lat, Lon = k.lon, Koko = (MastoKoko)(n % 3), Kanava = n % 5 != 4 });
                }
            Mastot(lista);
            for (int i = 0; i < maara; i++) tiedot[i].Nousu = 1f;
            Hamara(1);
            string lahin = null;
            if (kierto != null)
            {
                double paras = double.MaxValue;
                foreach (var m in lista)
                {
                    double d = Linssit.Radio.Mastot.EtaisyysKm(kierto.leveys, kierto.pituus, m.Lat, m.Lon);
                    if (m.Kanava && d < paras) { paras = d; lahin = m.Id; }
                }
            }
            koeValittu = lahin;
            koeAlku = Time.unscaledTime;
        }
        string koeValittu;

        void Update()
        {
            if (!koe || koeValittu == null || !indeksi.TryGetValue(koeValittu, out int i)) return;
            float s = Time.unscaledTime - koeAlku;
            float vu = 0.25f + 0.75f * Mathf.Abs(Mathf.Sin(s * 5.3f) * Mathf.Sin(s * 1.7f));
            Valittu(koeValittu, vu);
            koeRenkaat.Clear();
            koeRenkaat.AddRange(Linssit.Radio.Mastot.Renkaat(s));
            var m = tiedot[i];
            double lat = 0, lon = 0;
            if (merkit != null) merkit.Paikka(koeValittu, out lat, out lon);
            Renkaat(lat, lon, Linssit.Radio.Mastot.KuuluvuusKm((MastoKoko)m.Koko), koeRenkaat);
            YonValot(lat, lon, Mathf.Clamp01(s / 1.2f));
        }
    }
}
