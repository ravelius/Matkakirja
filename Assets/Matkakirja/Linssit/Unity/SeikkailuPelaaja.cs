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
using System;
using Matkakirja.Linssit.Seikkailu;
using Unity.Cinemachine;
using UnityEngine;
using UnityEngine.InputSystem;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuPelaaja : MonoBehaviour
    {
        public const float Korkeus = 1.75f, Sade = 0.3f, Askel = 0.35f, Painovoima = -18f, HiiriAstePerPx = 0.12f;
        public const float KameraFov = 60f, KameraEtaisyys = 4.5f, OlkaX = 1.45f;
        public static SeikkailuPelaaja Aktiivinen { get; private set; }
        /// <summary>Testisyöte (simulaattoriajot ilman kosketusta): liike ja katse −1…1 kunnes TestiLoppuu.</summary>
        public static KavelySyote Testi; public static float TestiLoppuu = -1f;

        readonly Kavely kavely = new Kavely();
        CharacterController cc;
        Transform olka, hahmo;
        CinemachineCamera kamera;
        float pysty;

        public Kavely Tila => kavely;
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
            p.viimeMaassa = paikka;
            // Hahmo (väliaikainen kapseli; Fogg-glb myöhemmin).
            var h = GameObject.CreatePrimitive(PrimitiveType.Capsule);
            Destroy(h.GetComponent<Collider>());
            h.name = "hahmo"; h.layer = kerros; h.tag = "Player";
            h.transform.SetParent(go.transform, false);
            h.transform.localPosition = new Vector3(0, Korkeus / 2, 0); h.transform.localScale = new Vector3(Sade * 2, Korkeus / 2, Sade * 2);
            var sh = Resources.Load<Shader>("Varjostimet/DioraamaValaistu");
            if (sh != null) h.GetComponent<MeshRenderer>().sharedMaterial = new Material(sh) { color = new Color(0.55f, 0.35f, 0.2f) };
            p.hahmo = h.transform;
            // Olkapiste ja kamera.
            p.olka = new GameObject("olka").transform;
            p.olka.SetParent(go.transform, false);
            p.olka.localPosition = new Vector3(0, 1.55f, 0);
            var cg = new GameObject("CM pelaaja") { layer = kerros };
            cg.transform.SetParent(go.transform, false);
            p.kamera = cg.AddComponent<CinemachineCamera>();
            p.kamera.Follow = p.olka;
            p.kamera.Priority = 1000000;   // DioraamaCinemachine.PaivitaPelaaja varmistaa lisäksi lepokameroiden yli
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
            var vg = new GameObject("täytevalo") { layer = kerros };
            vg.transform.SetParent(go.transform, false);
            vg.transform.localPosition = new Vector3(0.4f, 2.3f, -1.2f);
            var valo = vg.AddComponent<Light>();
            valo.type = LightType.Point; valo.range = 7.5f; valo.intensity = 1.6f; valo.color = new Color(1f, 0.86f, 0.68f);
            valo.shadows = LightShadows.None; valo.renderMode = LightRenderMode.ForcePixel;
            Aktiivinen = p;
            Debug.Log($"MATKAKIRJA seikkailu: pelaaja luotu {paikka}, yaw {yaw:F0}");
            return p;
        }

        /// <summary>Siirto (tarkistuspiste, kiinnijäänti): CharacterController pois siirron ajaksi.</summary>
        public void Siirra(Vector3 paikka)
        {
            cc.enabled = false; transform.position = paikka; cc.enabled = true; pysty = 0; viimeMaassa = paikka;
            kavely.NopeusX = kavely.NopeusZ = 0;
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
            kavely.Paivita(dt, s);
            // Painovoima ja liike.
            if (cc.isGrounded && pysty < 0) pysty = -1f; else pysty += Painovoima * dt;
            cc.Move(new Vector3((float)kavely.NopeusX, pysty, (float)kavely.NopeusZ) * dt);
            hahmo.localRotation = Quaternion.Euler(0, (float)kavely.HahmoYaw, 0);
            olka.rotation = Quaternion.Euler((float)kavely.KameraPitch, (float)kavely.KameraYaw, 0);
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
            var gp = Gamepad.current;
            if (gp != null)
            {
                var l = gp.leftStick.ReadValue(); var r = gp.rightStick.ReadValue();
                if (l.sqrMagnitude > s.LiikeX * s.LiikeX + s.LiikeY * s.LiikeY) { s.LiikeX = l.x; s.LiikeY = l.y; }
                if (Math.Abs(r.x) + Math.Abs(r.y) > 0.05f) { s.KatseX = r.x; s.KatseY = r.y; }
                s.Juoksu |= gp.leftStickButton.isPressed; s.Hiipiminen |= gp.buttonEast.isPressed;
            }
            // Kosketustapit (Natiivi-UI:n SeikkailuTapit, TAPPI-pohja, 2D): heijastuksella, puuttuva luokka ohitetaan.
            if (!tapitHaettu)
            {
                tapitHaettu = true;
                var t = typeof(SeikkailuPelaaja).Assembly.GetType("Matkakirja.Natiivi.SeikkailuTapit");
                const System.Reflection.BindingFlags F = System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static;
                tapVasen = t?.GetProperty("Vasen", F); tapOikea = t?.GetProperty("Oikea", F);
            }
            if (tapVasen != null && tapOikea != null)
            {
                var v = (Vector2)tapVasen.GetValue(null); var o = (Vector2)tapOikea.GetValue(null);
                if (v.sqrMagnitude > s.LiikeX * s.LiikeX + s.LiikeY * s.LiikeY) { s.LiikeX = v.x; s.LiikeY = v.y; }
                if (Math.Abs(o.x) + Math.Abs(o.y) > 0.05f) { s.KatseX = o.x; s.KatseY = o.y; }
                if (v.magnitude > 0.95f) s.Juoksu = true;   // tappi reunaan = juoksu (ei erillistä nappia)
            }
            return s;
        }
        static bool tapitHaettu; static System.Reflection.PropertyInfo tapVasen, tapOikea;

        void OnDestroy() { if (Aktiivinen == this) Aktiivinen = null; }
    }
}
