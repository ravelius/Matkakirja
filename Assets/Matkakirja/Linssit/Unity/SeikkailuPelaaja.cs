// HISTORIAMOOTTORI V1: PELAAJA VAPAASSA KÄVELYSSÄ, KAMERA OLAN YLI (Siirtoseppä 7.10.2026; omistaja 08.4x–08.5x: vapaa kävely,
// olan yli, nuori Fogg ruudussa; arkkitehtuuri docs/raportit/siirtoseppa-historiamoottori-20261007.md kohta 11).
// - Logiikka Ytimessä (Matkakirja.Linssit.Seikkailu.Kavely): syötteestä kameran kulmat ja haluttu vaakanopeus.
// - Täällä: CharacterController (kapseli 1,75 / 0,3, askel 0,35 m; Linnanrakentajan mitoitus), painovoima, hahmon kääntö ja
//   Cinemachine 3 -kamera (CinemachineThirdPersonFollow: olka (0,45; 0,15), etäisyys 2,6 m, esteiden väistö dioraaman kerroksessa,
//   pelaaja ohitetaan tagilla "Player"). Kamera seuraa "olka"-pistettä, jota kierretään Ytimen kulmilla; DioraamaCinemachinen
//   aivot blendaavat siihen (Priority 100), joten venesaapumisen Timeline voi myöhemmin luovuttaa ohjauksen saumatta.
// - Syöte: näppäimistö (WASD/nuolet, Shift juoksu, Ctrl/C hiipiminen) + hiiri (oikea nappi pohjassa tai lukittu kursori),
//   peliohjain (sauvat, vasen sauvanappi juoksu, B hiipiminen), testi (poikki kavely tapit …). Kosketustapit: Natiivi-UI:n
//   TAPPI-pohja täysillä 2D-arvoilla (pyyntö Natiivi-UI:lle; OpasTapit antaa vasemmasta vain pystyn).
// - Törmäys: LisaaTormaykset lisää MeshColliderit tilojen meshesiin, kunnes Linnanrakentajan kavely/<osa>-tormays.glb tulee.
// Hahmo on toistaiseksi kapseli (DioraamaValaistu); Fogg-glb ja Mixamo-leikkeet kytketään, kun ne ovat paketissa.
// ENSIMMÄINEN PERSOONA (omistaja 7.10. 18.5x, sitova: pelaaja ei samastu minkään näköiseen eikä mihinkään sukupuoleen; mallina Thief):
// kamera silmien korkeudella (1,62 m, kyyryssä 1,0 m, pehmeä siirtymä, ei pään heiluntaa), ei näkyvää vartaloa, käsiä eikä peilikuvaa;
// kannettu esine (kynttilä, kivi) kameran edessä oikealla (Kasi); hahmo kääntyy katseen mukana. Kolmas persoona jää testikytkimeksi.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;
using Unity.Cinemachine;
using UnityEngine;
using UnityEngine.AI;
using UnityEngine.InputSystem;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuPelaaja : MonoBehaviour
    {
        public const float Korkeus = 1.75f, Sade = 0.3f, Askel = 0.35f, Painovoima = -18f, HiiriAstePerPx = 0.12f;
        public const float KameraFov = 60f, KameraEtaisyys = 4.5f, OlkaX = 1.45f;
        public const float SilmaY = 1.62f, KyykkySilmaY = 1.0f, SilmaNopeus = 2.2f, FpFov = 62f;
        /// <summary>Ensimmäinen persoona (oletus); false = vanha olan yli -kamera (testikytkin "poikki kavely fp 0").</summary>
        public static bool Ensimmainen = true;
        /// <summary>Kantokohta: kynttilä ja poimittu esine (ensimmäisessä persoonassa kameran edessä oikealla, muuten käden korkeudella).</summary>
        public Transform Kasi { get; private set; }
        float silmaNyt = SilmaY, eleNotko, leikkausTarkistus;
        // Portaiden pehmennys (pelattavuusmalli kohta 6): silmien maailmankorkeus seuraa 0,1 s:n viiveellä, enintään 0,4 m jäljessä.
        public const float PortaatViive = 0.1f, PortaatMaxJalki = 0.4f;
        float silmaMaailma = float.NaN, silmaNopeus;
        bool hiipiKytkin;

        // Napautuskävely (kohdat 2.1 ja 6): napautus tai napsautus lattiaan → reitti kävelyverkkoa pitkin (NavMesh, vara suora viiva),
        // kävely 1,4 m/s, hiivintä vaaran lähellä (SeikkailuVartijat.Vaara), katse ei käänny; oma ohjaus keskeyttää.
        public const float NapautusM = 30f, PerillaM = 0.25f, JumiS = 1.5f;
        readonly List<Vector3> napautusReitti = new List<Vector3>();
        float jumiAika; Vector3 jumiPaikka;
        public bool Napautuskavely => napautusReitti.Count > 0;
        /// <summary>Vartijan otteessa (pelattavuusmalli 4.1): ei liikettä, katse vapaa; SeikkailuVartijat ohjaa irtipääsyn ja himmennyksen.</summary>
        public bool Otteessa;

        /// <summary>Napautus ruutuun (pikseleinä, Natiivi-UI:n kosketus tai Macin napsautus): lattia → kävely sinne; esine tai seinä
        /// alle 1,2 m:n päässä → toiminto (SeikkailuEsineet). Palauttaa, osuiko napautus maailmaan.</summary>
        public static bool Napautus(Vector2 ruutu)
        {
            var p = Aktiivinen; var cam = Camera.main;
            var n = p != null ? p.GetComponentInParent<DioraamaNayttamo>() : null;
            if (n != null && n.Kamera != null) cam = n.Kamera;
            if (p == null || cam == null || p.Eleessa) return false;
            var sade = cam.ScreenPointToRay(ruutu);
            if (!Physics.Raycast(sade, out var osuma, NapautusM, 1 << DioraamaNayttamo.Kerros, QueryTriggerInteraction.Ignore)) return false;
            var vaaka = osuma.point - p.transform.position; vaaka.y = 0;
            if (osuma.normal.y < 0.7f || osuma.collider.attachedRigidbody != null)
            {
                if (vaaka.magnitude < SeikkailuEsineet.PoimintaM + 0.3f) { SeikkailuEsineet.ToimintoPyydetty = true; return true; }
                return false;
            }
            p.napautusReitti.Clear();
            var polku = new NavMeshPath();
            if (NavMesh.SamplePosition(osuma.point, out var kohde, 0.6f, NavMesh.AllAreas) && NavMesh.CalculatePath(p.transform.position, kohde.position, NavMesh.AllAreas, polku)
                && polku.status != NavMeshPathStatus.PathInvalid && polku.corners.Length > 1)
                for (int i = 1; i < polku.corners.Length; i++) p.napautusReitti.Add(polku.corners[i]);
            else p.napautusReitti.Add(osuma.point);
            p.jumiAika = 0; p.jumiPaikka = p.transform.position;
            Debug.Log($"MATKAKIRJA seikkailu: napautuskävely {p.napautusReitti.Count} pistettä → {osuma.point}");
            return true;
        }

        /// <summary>Kamera kääntyy tapahtuman jälkeen kohti pistettä käännössäännöllä (≤ 10°, ≥ 0,8 s, ei jos pelaaja ohjasi
        /// viimeisen sekunnin aikana; Kavely.PyydaKaanto).</summary>
        public bool PyydaKaanto(Vector3 kohde)
        {
            var d = kohde - transform.position; d.y = 0;
            return d.sqrMagnitude > 0.01f && kavely.PyydaKaanto(Mathf.Atan2(d.x, d.z) * Mathf.Rad2Deg);
        }

        /// <summary>Botti (vianselvitys): kävele pisteeseen napautuskävelyn tavoin (reitti NavMeshillä). Palauttaa, löytyikö reitti.</summary>
        public bool KaveleKohti(Vector3 kohde)
        {
            napautusReitti.Clear();
            var polku = new NavMeshPath();
            bool ok = NavMesh.SamplePosition(kohde, out var k, 1.0f, NavMesh.AllAreas) && NavMesh.CalculatePath(transform.position, k.position, NavMesh.AllAreas, polku)
                && polku.status != NavMeshPathStatus.PathInvalid && polku.corners.Length > 1;
            if (ok) for (int i = 1; i < polku.corners.Length; i++) napautusReitti.Add(polku.corners[i]); else napautusReitti.Add(kohde);
            jumiAika = 0; jumiPaikka = transform.position;
            return ok;
        }

        /// <summary>Napautusreitin syöte: suunta seuraavaan kulmaan kameran kehyksessä (katse ei käänny); vaarassa hiivintä.</summary>
        void NapautusSyote(ref KavelySyote s, float dt)
        {
            if (napautusReitti.Count == 0) return;
            if (Math.Abs(s.LiikeX) > Kavely.KuolleAlue || Math.Abs(s.LiikeY) > Kavely.KuolleAlue) { napautusReitti.Clear(); return; }   // oma ohjaus
            var d = napautusReitti[0] - transform.position; d.y = 0;
            while (d.magnitude < PerillaM) { napautusReitti.RemoveAt(0); if (napautusReitti.Count == 0) return; d = napautusReitti[0] - transform.position; d.y = 0; }
            jumiAika += dt;
            if (jumiAika > JumiS) { if ((transform.position - jumiPaikka).magnitude < 0.1f) { napautusReitti.Clear(); return; } jumiAika = 0; jumiPaikka = transform.position; }
            d.Normalize();
            double y = kavely.KameraYaw * Math.PI / 180, sy = Math.Sin(y), cy = Math.Cos(y);
            s.LiikeY = d.x * sy + d.z * cy; s.LiikeX = d.x * cy - d.z * sy;
            if (SeikkailuVartijat.Vaara(transform.position)) s.Hiipiminen = true;
        }
        public Transform Silmat => olka;

        // Kädet (ensimmäinen persoona, omistaja 7.10. 18.7x): hihat ja hanskat näkyvät hetkittäin toiminnoissa. Perusleike kannosta
        // (kanto_idle, kyyryssä palavan kynttilän kanssa suojaus, muuten piilossa), kertaele toiminnosta (KasiEle) kestonsa ajan.
        string kasiEle; float kasiEleLoppuu; double kasiAika; string kasiPerus = "piilossa";
        public (string Leike, double Aika) KadetLeike()
        {
            string l = kasiEle ?? kasiPerus; double t = kasiAika;
            // Pito (suojaus 15–75 silmukkana niin kauan kuin kyyristytään).
            if (kasiEle == null && Malli?.Kadet != null && Malli.Kadet.PitoS.TryGetValue(l, out var pito) && t > pito.Alku)
                t = pito.Alku + (t - pito.Alku) % (pito.Loppu - pito.Alku);
            return (l, t);
        }
        /// <summary>Käsien solmu nimellä (Sovitin: DioraamaHahmot3D.IrrallisenSolmu); kahva_oikea → Kasi-piste, Kontaktivarjo pois.</summary>
        public Func<string, Transform> KadetSolmu;
        Transform kahva; float kahvaHaku;
        public bool KahvaKiinni => kahva != null;
        /// <summary>Käsien leikkeen tapahtumahetki (ote / irrotus) sekunteina, tai null (ei käsiä tai ei tapahtumaa).</summary>
        public float? KasiTapahtuma(string nimi) => Malli?.Kadet != null && Malli.Kadet.Leikkeet.ContainsKey(nimi) && Malli.Kadet.TapahtumaS.TryGetValue(nimi, out var t) ? (float)t : (float?)null;

        /// <summary>Käsien kertaele (poiminta, laske, heitto, koputus, raapaisu, luukku, nyytti, nousu_laiturille); puuttuva ohitetaan.</summary>
        public void KasiEle(string nimi)
        {
            var k = Malli?.Kadet; if (k == null || !k.Leikkeet.ContainsKey(nimi)) return;
            kasiEle = nimi; kasiAika = 0;
            kasiEleLoppuu = Time.unscaledTime + (float)(k.Liikkeet.TryGetValue(nimi, out var l) ? l.KestoS : 1.0);
        }

        void PaivitaKadet(float dt)
        {
            if (Malli?.Kadet == null) return;
            string perus = "piilossa";
            var ky = SeikkailuKynttilat.Aktiivinen;
            bool kynttila = ky != null && ky.Ydin.OmaPalaa && ky.OmaAsetettu == null;
            if (kynttila) perus = kavely.Tapa == Liiketapa.Hiipiminen && Malli.Kadet.Leikkeet.ContainsKey("suojaus") ? "suojaus" : "kanto_idle";
            else if (SeikkailuEsineet.Aktiivinen?.Kadessa != null) perus = "kanto_idle";
            if (kasiEle != null && Time.unscaledTime >= kasiEleLoppuu) { kasiEle = null; kasiAika = 0; }
            if (kasiEle == null && perus != kasiPerus)
            {
                // Siirtymät: kynttilä esiin (kanto_alku) ja pois (kanto_loppu), jos leikkeet ovat mallissa.
                string siirto = kasiPerus == "piilossa" && perus == "kanto_idle" ? "kanto_alku" : kasiPerus != "piilossa" && perus == "piilossa" && kasiPerus != "suojaus" ? "kanto_loppu" : null;
                kasiPerus = perus; kasiAika = 0;
                if (siirto != null) KasiEle(siirto);
            }
            // Kahva (kahva_oikea): Kasi-piste käden otteeseen heti, kun kädet on rakennettu; kontaktivarjo pois (silmien korkeudella).
            if (kahva == null && KadetSolmu != null && Time.unscaledTime > kahvaHaku)
            {
                kahvaHaku = Time.unscaledTime + 0.5f;
                kahva = KadetSolmu("kahva_oikea");
                if (kahva != null)
                {
                    Kasi.SetParent(kahva, false); Kasi.localPosition = Vector3.zero; Kasi.localRotation = Quaternion.identity;
                    var kv = KadetSolmu("Kontaktivarjo"); if (kv != null) kv.gameObject.SetActive(false);
                    foreach (var smr in olka.GetComponentsInChildren<SkinnedMeshRenderer>(true))   // kädet ovat silmien lapsina (Hahmot3D: Juuri → Isa)
                        smr.localBounds = new Bounds(Vector3.zero, new Vector3(3f, 3f, 3f));
                    Debug.Log("MATKAKIRJA seikkailu: kädet kiinni (kahva_oikea)");
                }
            }
            kasiAika += dt;
            if (kasiEle != null && Malli.Kadet.Liikkeet.TryGetValue(kasiEle, out var l)) kasiAika = Math.Min(kasiAika, l.KestoS - 1e-3);   // ei kierrä alkuun
        }
        public static SeikkailuPelaaja Aktiivinen { get; private set; }
        /// <summary>Testisyöte (simulaattoriajot ilman kosketusta): liike ja katse −1…1 kunnes TestiLoppuu.</summary>
        public static KavelySyote Testi; public static float TestiLoppuu = -1f;

        readonly Kavely kavely = new Kavely();
        CharacterController cc;
        Transform olka, hahmo;
        CinemachineCamera kamera;
        float pysty;

        public Kavely Tila => kavely;
        public Transform Hahmo => hahmo;
        /// <summary>Pelaajahahmon liikkeet (rakennus.json pelaaja): leike ja aika toistokertoimella; null = kapseli.</summary>
        public PelaajaMalli Malli;
        string leike = "idle"; double leikeAika;
        public (string Leike, double Aika) Leike() => (leike, leikeAika);
        GameObject kapseli;
        public void KapseliPiiloon() { if (kapseli != null) kapseli.GetComponent<MeshRenderer>().enabled = false; }
        public CinemachineCamera Kamera => kamera;
        /// <summary>Viimeisin paikka maassa: putoaminen (laiturin reunalta veteen) palauttaa tähän.</summary>
        Vector3 viimeMaassa;

        /// <summary>Luo pelaajan paikkaan (Unity), katse yaw-suuntaan; kerros = dioraaman kerros (kamera piirtää sen).</summary>
        public static SeikkailuPelaaja Luo(Transform isa, Vector3 paikka, float yaw, int kerros)
        {
            Poista();
            var go = new GameObject("Seikkailu pelaaja") { layer = kerros, tag = "Player" };
            go.transform.SetParent(isa, false);
            go.transform.position = paikka;
            var p = go.AddComponent<SeikkailuPelaaja>();
            p.cc = go.AddComponent<CharacterController>();
            p.cc.height = Korkeus; p.cc.radius = Sade; p.cc.stepOffset = Askel; p.cc.center = new Vector3(0, Korkeus / 2, 0);
            p.cc.slopeLimit = 40f; p.cc.skinWidth = 0.03f;
            p.kavely.KameraYaw = p.kavely.HahmoYaw = yaw;
            if (Ensimmainen) { p.kavely.KameraPitch = 0; p.kavely.PitchAla = -75; p.kavely.PitchYla = 75; p.kavely.Kallistusvyohykkeet = true; }
            p.viimeMaassa = paikka;
            // Hahmo (väliaikainen kapseli; Fogg-glb myöhemmin).
            // Hahmosolmu (kääntö, skaalaamaton: Fogg, kynttilä ja esineet sen lapsina) ja kapseli sen lapsena (7.10.: Fogg peri kapselin
            // skaalan 0,6 / 0,875 / 0,6 ja oli kapea ja 1,58 m).
            var hs = new GameObject("hahmo") { layer = kerros, tag = "Player" };
            hs.transform.SetParent(go.transform, false);
            var h = GameObject.CreatePrimitive(PrimitiveType.Capsule);
            Destroy(h.GetComponent<Collider>());
            h.name = "kapseli"; h.layer = kerros; h.tag = "Player";
            h.transform.SetParent(hs.transform, false);
            h.transform.localPosition = new Vector3(0, Korkeus / 2, 0); h.transform.localScale = new Vector3(Sade * 2, Korkeus / 2, Sade * 2);
            var sh = Resources.Load<Shader>("Varjostimet/DioraamaValaistu");
            if (sh != null) h.GetComponent<MeshRenderer>().sharedMaterial = new Material(sh) { color = new Color(0.55f, 0.35f, 0.2f) };
            p.hahmo = hs.transform; p.kapseli = h;
            // Olkapiste (ensimmäisessä persoonassa silmät) ja kamera.
            p.olka = new GameObject(Ensimmainen ? "silmat" : "olka").transform;
            p.olka.SetParent(go.transform, false);
            p.olka.localPosition = new Vector3(0, Ensimmainen ? SilmaY : 1.55f, 0);
            p.Kasi = new GameObject("kasi").transform;
            if (Ensimmainen) { p.Kasi.SetParent(p.olka, false); p.Kasi.localPosition = new Vector3(0.2f, -0.3f, 0.45f); }
            else { p.Kasi.SetParent(hs.transform, false); p.Kasi.localPosition = new Vector3(0.22f, 1.15f, 0.3f); }
            var cg = new GameObject("CM pelaaja") { layer = kerros };
            cg.transform.SetParent(go.transform, false);
            p.kamera = cg.AddComponent<CinemachineCamera>();
            p.kamera.Follow = p.olka;
            p.kamera.Priority = 1000000;   // DioraamaCinemachine.PaivitaPelaaja varmistaa lisäksi lepokameroiden yli
            if (Ensimmainen)
            {
                // Silmät: kamera lukittu silmäpisteeseen ja sen kiertoon (Ytimen kulmat), ei vaimennusta eikä heiluntaa.
                p.KapseliPiiloon();
                var fl = LensSettings.Default; fl.FieldOfView = FpFov; fl.NearClipPlane = 0.05f; fl.FarClipPlane = 4000f;
                p.kamera.Lens = fl;
                cg.AddComponent<CinemachineHardLockToTarget>();
                cg.AddComponent<CinemachineRotateWithFollowTarget>();
                LisaaTaytevalo(go.transform, kerros, new Vector3(0.3f, 2.3f, -0.8f));
                SeikkailuNakyvyys.Luo(go.transform);   // valoisuus kuvana (reunat ja viileys), ei mittaria
                Aktiivinen = p;
                Debug.Log($"MATKAKIRJA seikkailu: pelaaja luotu {paikka}, yaw {yaw:F0} (ensimmäinen persoona)");
                return p;
            }
            // Olan yli (Päätoimittaja 7.10. 14.0x): hahmo vasempaan kolmannekseen ~35 % ruudun korkeudesta, kamera hieman ylempänä.
            // FOV 60° → 4,5 m:n päässä näkyy 5,2 m korkeutta (1,75 m ≈ 34 %); olka 1,45 m oikealle ≈ 17° = vasen kolmannes.
            var lens = LensSettings.Default; lens.FieldOfView = KameraFov; lens.NearClipPlane = 0.1f; lens.FarClipPlane = 4000f;
            p.kamera.Lens = lens;
            var tpf = cg.AddComponent<CinemachineThirdPersonFollow>();
            tpf.ShoulderOffset = new Vector3(OlkaX, 0.35f, 0f); tpf.VerticalArmLength = 0.4f; tpf.CameraSide = 1f; tpf.CameraDistance = KameraEtaisyys;
            tpf.Damping = new Vector3(0.1f, 0.25f, 0.3f);
            var es = tpf.AvoidObstacles;   // oletukset komponentista (Default on internal)
            es.Enabled = true; es.CollisionFilter = 1 << kerros; es.IgnoreTag = "Player"; es.CameraRadius = 0.3f;   // pallopyyhkäisy varressa
            tpf.AvoidObstacles = es;
            // Täytevalo (Päätoimittaja: keittiön lattia ja esineet erottuvat): lämmin pehmeä pistevalo pään yläpuolella hieman takana,
            // ei varjoja (URP:n lisävalo, DioraamaValaistu lukee sen kuten tilojen pistevalot).
            LisaaTaytevalo(go.transform, kerros, new Vector3(0.4f, 2.3f, -1.2f));
            Aktiivinen = p;
            Debug.Log($"MATKAKIRJA seikkailu: pelaaja luotu {paikka}, yaw {yaw:F0}");
            return p;
        }

        /// <summary>Siirto (tarkistuspiste, kiinnijäänti): CharacterController pois siirron ajaksi.</summary>
        public void Siirra(Vector3 paikka)
        {
            cc.enabled = false; transform.position = paikka; cc.enabled = true; pysty = 0; viimeMaassa = paikka;
            kavely.NopeusX = kavely.NopeusZ = 0; napautusReitti.Clear(); silmaMaailma = float.NaN;
        }

        static void LisaaTaytevalo(Transform isa, int kerros, Vector3 paikka)
        {
            var vg = new GameObject("täytevalo") { layer = kerros };
            vg.transform.SetParent(isa, false);
            vg.transform.localPosition = paikka;
            var valo = vg.AddComponent<Light>();
            valo.type = LightType.Point; valo.range = 7.5f; valo.intensity = 1.6f; valo.color = new Color(1f, 0.86f, 0.68f);
            valo.shadows = LightShadows.None; valo.renderMode = LightRenderMode.ForcePixel;
        }

        // Kertaele juurisiirrolla (v44j nousu_laiturille: veneestä kannelle). Kapseli paikallaan ja törmäys pois leikkeen ajan; viimeisellä
        // ruudulla kapseli siirtyy root_siirto (hahmon kehyksessä, +Z kasvot) ja leike vaihtuu idleen (idle alkaa origosta, ei hyppyä).
        float eleLoppuu = -1f, eleKesto; Vector3 eleSiirto, eleAlku; Action eleValmis;
        public bool Eleessa => eleLoppuu >= 0f;

        public void SoitaEle(string nimi, float kesto, Vector3 juuriSiirto, Action valmis = null)
        {
            leike = nimi; leikeAika = 0; eleKesto = kesto; eleLoppuu = Time.unscaledTime + kesto; eleValmis = valmis;
            eleSiirto = hahmo.rotation * juuriSiirto; eleAlku = transform.position;
            cc.enabled = false; pysty = 0; kavely.NopeusX = kavely.NopeusZ = 0;
            Debug.Log($"MATKAKIRJA seikkailu: ele {nimi} {kesto:F1} s, juurisiirto {eleSiirto}");
            if (Ensimmainen) KasiEle(nimi);   // kämmenet kannelle (kädet-v1 samalla ajoituksella)
        }

        bool PaivitaEle(float dt)
        {
            if (eleLoppuu < 0f) return false;
            leikeAika = Math.Min(leikeAika + dt, eleKesto - 1e-3);   // ei kierrä alkuun (Hahmot3D ottaa ajan modulo kesto)
            if (Ensimmainen)
            {
                // Ensimmäinen persoona: kamera kulkee leikkeen juuren polkua (nousu_laiturille: y valmis ruudulla 38/73, eteen ≤ 0,25 m
                // siihen asti, sitten loput eteen) ja painuu polvelle noustessa (notko ≤ 0,55 m), ilman vartaloa.
                float u = Mathf.Clamp01(1f - (eleLoppuu - Time.unscaledTime) / eleKesto);
                if (Malli?.Kadet != null && Malli.Kadet.KameraPolku.TryGetValue(leike, out var kp))
                {
                    // Kädet-v1: silmien polku ruuduittain (glTF hahmon kehys +Z eteen, +X vasen → Unity (−x, y, z) hahmon kierrolla).
                    float f = u * (kp.Length - 1); int i0 = Mathf.Min((int)f, kp.Length - 2); float w = f - i0;
                    var a0 = kp[i0]; var a1 = kp[i0 + 1];
                    var pv = new Vector3((float)-(a0[0] + (a1[0] - a0[0]) * w), (float)(a0[1] + (a1[1] - a0[1]) * w), (float)(a0[2] + (a1[2] - a0[2]) * w));
                    transform.position = eleAlku + hahmo.rotation * pv; eleNotko = 0f;
                }
                else
                {
                    const float Y = 38f / 73f;
                    float fy = u < Y ? Mathf.SmoothStep(0f, 1f, u / Y) : 1f;
                    float fz = u < Y ? 0.26f * u / Y : 0.26f + 0.74f * Mathf.SmoothStep(0f, 1f, (u - Y) / (1f - Y));
                    var vaaka = new Vector3(eleSiirto.x, 0f, eleSiirto.z);
                    transform.position = eleAlku + Vector3.up * eleSiirto.y * fy + vaaka * fz;
                    eleNotko = 0.55f * Mathf.Sin(Mathf.PI * Mathf.Clamp01((u - 0.1f) / 0.8f));
                }
            }
            if (Time.unscaledTime < eleLoppuu) return true;
            eleNotko = 0f;
            transform.position = eleAlku + eleSiirto; viimeMaassa = transform.position;
            cc.enabled = true; leike = "idle"; leikeAika = 0; eleLoppuu = -1f;
            var v = eleValmis; eleValmis = null; v?.Invoke();
            return false;
        }

        public static void Poista()
        {
            if (Aktiivinen != null) Destroy(Aktiivinen.gameObject);
            Aktiivinen = null;
        }

        /// <summary>Väliaikaiset törmäykset: MeshCollider jokaiseen juuren alla olevaan meshiin (luettava mesh). Palauttaa määrän.</summary>
        public static int LisaaTormaykset(Transform juuri)
        {
            int n = 0;
            if (juuri == null) return 0;
            foreach (var mf in juuri.GetComponentsInChildren<MeshFilter>(true))
            {
                if (mf.sharedMesh == null || mf.GetComponent<Collider>() != null || mf.CompareTag("Player")) continue;
                if (!mf.sharedMesh.isReadable) continue;
                var mc = mf.gameObject.AddComponent<MeshCollider>(); mc.sharedMesh = mf.sharedMesh; n++;
            }
            return n;
        }

        void Update()
        {
            float dt = Mathf.Min(Time.unscaledDeltaTime, 0.05f);
            var s = LueSyote();
            NapautusSyote(ref s, dt);
            if (Time.unscaledTime > leikkausTarkistus) { leikkausTarkistus = Time.unscaledTime + 0.5f; SeikkailuKavely.PaivitaLeikkaukset(transform.position); }
            if (Otteessa) { s.LiikeX = s.LiikeY = 0; s.Juoksu = false; napautusReitti.Clear(); }
            PaivitaKadet(dt);
            if (PaivitaEle(dt))
            {
                // Ele: vain katse kääntyy (olan yli -kamera), hahmo ja kapseli paikallaan.
                s.LiikeX = s.LiikeY = 0; s.Juoksu = s.Hiipiminen = false;
                double hy = kavely.HahmoYaw; kavely.Paivita(dt, s); kavely.HahmoYaw = hy; kavely.NopeusX = kavely.NopeusZ = 0;
                olka.rotation = Quaternion.Euler((float)kavely.KameraPitch, (float)kavely.KameraYaw, 0);
                if (Ensimmainen) { olka.localPosition = new Vector3(0f, silmaNyt - eleNotko, 0f); silmaMaailma = float.NaN; }
                return;
            }
            kavely.Paivita(dt, s);
            // Painovoima ja liike.
            if (cc.isGrounded && pysty < 0) pysty = -1f; else pysty += Painovoima * dt;
            cc.Move(new Vector3((float)kavely.NopeusX, pysty, (float)kavely.NopeusZ) * dt);
            if (Ensimmainen) kavely.HahmoYaw = kavely.KameraYaw;   // keho katseen suuntaan (kantokohta ja heitto eteen)
            hahmo.localRotation = Quaternion.Euler(0, (float)kavely.HahmoYaw, 0);
            PaivitaLeike(dt);
            olka.rotation = Quaternion.Euler((float)kavely.KameraPitch, (float)kavely.KameraYaw, 0);
            if (Ensimmainen)
            {
                // Kyykky laskee silmät pehmeästi (ei heiluntaa askelissa).
                silmaNyt = Mathf.MoveTowards(silmaNyt, kavely.Tapa == Liiketapa.Hiipiminen ? KyykkySilmaY : SilmaY, SilmaNopeus * dt);
                // Portaat: maailmankorkeus pehmennetään (askelmat eivät nytkäytä kuvaa), kyykky ei viivästy.
                float tavoite = transform.position.y + silmaNyt;
                if (float.IsNaN(silmaMaailma)) { silmaMaailma = tavoite; silmaNopeus = 0f; }
                silmaMaailma = Mathf.SmoothDamp(silmaMaailma, tavoite, ref silmaNopeus, PortaatViive, Mathf.Infinity, dt);
                silmaMaailma = Mathf.Clamp(silmaMaailma, tavoite - PortaatMaxJalki, tavoite + PortaatMaxJalki);
                olka.localPosition = new Vector3(0f, silmaMaailma - transform.position.y, 0f);
            }
            if (cc.isGrounded) viimeMaassa = transform.position;
            else if (transform.position.y < viimeMaassa.y - 6f)
            {
                // Ei uintia: reunalta pudonnut palaa viimeiseen maakohtaan hieman taaksepäin liikesuunnasta (vesi ei ole törmäys).
                var taakse = new Vector3((float)-kavely.NopeusX, 0, (float)-kavely.NopeusZ);
                var paluu = viimeMaassa + (taakse.sqrMagnitude > 1e-4f ? taakse.normalized * 0.6f : Vector3.zero) + Vector3.up * 0.1f;
                Debug.Log($"MATKAKIRJA seikkailu: putosi, palautus {paluu}");
                cc.enabled = false; transform.position = paluu; cc.enabled = true; pysty = 0;
            }
        }

        /// <summary>Leike liiketavasta ja vauhdista: idle / kyykky_idle seistessä, kavely / juoksu / hiipiminen liikkeessä; toistonopeus =
        /// toistokerroin × vauhti / tavoitenopeus (jalat eivät liu'u). Leikkeen vaihtuessa aika alusta.</summary>
        void PaivitaLeike(float dt)
        {
            double v = kavely.Vauhti;
            string uusi = v < 0.15 ? (kavely.Tapa == Liiketapa.Hiipiminen ? "kyykky_idle" : "idle")
                : kavely.Tapa == Liiketapa.Juoksu ? "juoksu" : kavely.Tapa == Liiketapa.Hiipiminen ? "hiipiminen" : "kavely";
            if (uusi != leike) { leike = uusi; leikeAika = 0; }
            double kerroin = 1;
            if (Malli != null && Malli.Liikkeet.TryGetValue(leike, out var l) && l.TavoiteMs > 0) kerroin = l.Toistokerroin * Math.Max(0.3, v / l.TavoiteMs);
            leikeAika += dt * kerroin;
        }

        KavelySyote LueSyote()
        {
            if (Time.unscaledTime < TestiLoppuu) return Testi;
            var s = new KavelySyote();
            var kb = Keyboard.current;
            if (kb != null)
            {
                s.LiikeX = (kb.dKey.isPressed || kb.rightArrowKey.isPressed ? 1 : 0) - (kb.aKey.isPressed || kb.leftArrowKey.isPressed ? 1 : 0);
                s.LiikeY = (kb.wKey.isPressed || kb.upArrowKey.isPressed ? 1 : 0) - (kb.sKey.isPressed || kb.downArrowKey.isPressed ? 1 : 0);
                s.Juoksu = kb.leftShiftKey.isPressed;
                s.Hiipiminen = kb.leftCtrlKey.isPressed || kb.cKey.isPressed;
            }
            var hiiri = Mouse.current;
            if (hiiri != null && (hiiri.rightButton.isPressed || Cursor.lockState == CursorLockMode.Locked))
            {
                var d = hiiri.delta.ReadValue();
                s.HiiriX = d.x * HiiriAstePerPx; s.HiiriY = d.y * HiiriAstePerPx;
            }
            // Mac: vasen napsautus lattiaan = napautuskävely, esineeseen = toiminto (ei UI-elementin päällä; kosketus tulee Natiivi-UI:lta).
            if (Ensimmainen && hiiri != null && hiiri.leftButton.wasPressedThisFrame && Cursor.lockState != CursorLockMode.Locked)
            {
                var pos = hiiri.position.ReadValue();
                if (!(UiKerros.Olemassa && UiKerros.Hae().PeittaaPisteen(pos))) Napautus(pos);
            }
            var gp = Gamepad.current;
            if (gp != null)
            {
                var l = gp.leftStick.ReadValue(); var r = gp.rightStick.ReadValue();
                if (l.sqrMagnitude > s.LiikeX * s.LiikeX + s.LiikeY * s.LiikeY) { s.LiikeX = l.x; s.LiikeY = l.y; }
                if (Math.Abs(r.x) + Math.Abs(r.y) > 0.05f) { s.KatseX = r.x; s.KatseY = r.y; }
                s.Juoksu |= gp.leftStickButton.isPressed;
                // B: pito (NYK) ja ensimmäisessä persoonassa painallus vaihtaa hiivinnän päälle/pois (pelattavuusmalli kohta 6).
                if (Ensimmainen && gp.buttonEast.wasPressedThisFrame) hiipiKytkin = !hiipiKytkin;
                s.Hiipiminen |= gp.buttonEast.isPressed || hiipiKytkin;
            }
            // Kosketustapit (Natiivi-UI:n SeikkailuTapit, TAPPI-pohja, 2D): heijastuksella, puuttuva luokka ohitetaan.
            if (!tapitHaettu)
            {
                tapitHaettu = true;
                var t = typeof(SeikkailuPelaaja).Assembly.GetType("Matkakirja.Natiivi.SeikkailuTapit");
                const System.Reflection.BindingFlags F = System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static;
                tapVasen = t?.GetProperty("Vasen", F); tapOikea = t?.GetProperty("Oikea", F);
                tapKatse = t?.GetMethod("OtaKatse", F, null, Type.EmptyTypes, null);
            }
            if (tapVasen != null && tapOikea != null)
            {
                var v = (Vector2)tapVasen.GetValue(null); var o = (Vector2)tapOikea.GetValue(null);
                if (v.sqrMagnitude > s.LiikeX * s.LiikeX + s.LiikeY * s.LiikeY) { s.LiikeX = v.x; s.LiikeY = v.y; }
                if (Math.Abs(o.x) + Math.Abs(o.y) > 0.05f) { s.KatseX = o.x; s.KatseY = o.y; }
                if (v.magnitude > 0.95f) s.Juoksu = true;   // tappi reunaan = juoksu (ei erillistä nappia)
            }
            // Oikea veto koko oikealla puoliskolla (Natiivi-UI SeikkailuTapit.OtaKatse: asteet edellisestä lukukerrasta, x + oikealle, y + ylös).
            if (tapKatse != null && tapKatse.Invoke(null, null) is Vector2 k && k.sqrMagnitude > 0f) { s.HiiriX += k.x; s.HiiriY += k.y; }
            return s;
        }
        static bool tapitHaettu; static System.Reflection.PropertyInfo tapVasen, tapOikea; static System.Reflection.MethodInfo tapKatse;

        /// <summary>Katseen syöte asteina ilman pelaajaa (veneessä): x kääntö oikealle, y nosto ylös — hiiri (oikea pohjassa tai lukittu),
        /// peliohjaimen oikea sauva (140°/s), Natiivi-UI:n oikea veto (SeikkailuTapit.OtaKatse).</summary>
        public static Vector2 KatseSyote(float dt)
        {
            var k = Vector2.zero;
            var hiiri = Mouse.current;
            if (hiiri != null && (hiiri.rightButton.isPressed || Cursor.lockState == CursorLockMode.Locked)) k += hiiri.delta.ReadValue() * HiiriAstePerPx;
            var gp = Gamepad.current;
            if (gp != null) { var r = gp.rightStick.ReadValue(); if (r.magnitude > (float)Kavely.KuolleAlue) k += r * (float)Kavely.KatseNopeusAsteS * dt; }
            if (!tapitHaettu) { tapitHaettu = true; var t = typeof(SeikkailuPelaaja).Assembly.GetType("Matkakirja.Natiivi.SeikkailuTapit");
                const System.Reflection.BindingFlags F = System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static;
                tapVasen = t?.GetProperty("Vasen", F); tapOikea = t?.GetProperty("Oikea", F); tapKatse = t?.GetMethod("OtaKatse", F, null, Type.EmptyTypes, null); }
            if (tapKatse != null && tapKatse.Invoke(null, null) is Vector2 v) k += v;
            return k;
        }

        /// <summary>Pulun reunakuvan napautus (Natiivi-UI: Pulu.NapautusKaappaa) pyytää vihjettä. Palauttaa, otettiinko napautus
        /// käyttöön. Vihjeportaat (pelattavuusmalli kohta 5) tulevat tähän; siihen asti false (Natiivi-UI:n oletus jatkuu).</summary>
        public static bool PuluVihje()
        {
            var p = Aktiivinen; if (p == null) return false;
            Debug.Log("MATKAKIRJA seikkailu: Pulun vihje pyydetty");
            return VihjePyydetty != null && VihjePyydetty();
        }
        /// <summary>Vihjeportaiden koukku (SeikkailuVihjeet asettaa); true = vihje annettiin.</summary>
        public static Func<bool> VihjePyydetty;

        void OnDestroy() { if (Aktiivinen == this) Aktiivinen = null; }
    }
}
