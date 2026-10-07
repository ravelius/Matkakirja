// DIORAAMAN KAMERA CINEMACHINELLA (suunnitelma docs/raportit/linna-unity-suunnitelma-20261005.md kohta 1; omistajan lupa
// 5.10.2026 klo 08.01 "Cinemachine 3.1.7"; Siirtoseppä).
//
// Jokainen lepoasento (yleisnäkymä, kertojan jakso, huone) on oma CinemachineCamera, joka luodaan ajon aikana datasta
// (PoikkileikkausLinssi.LepoHetkella: avain + perusasento). Lepokamera kiertää kohdettaan OrbitalFollow-komponentilla
// (vaimennus 0) ja katsoo sitä HardLookAtilla. Akselit vastaavat Ytimen asentoa täsmälleen: vaaka = atsimuutti + 180°,
// pysty = korkeus, säde = etäisyys (Kameraliike.AsentoSijainti + UnityPiste, z peilattu). Jatkuva orbit ja pelaajan veto
// (DioraamaKameraJousi.Sovella + DioraamaSyote.Sovita) syötetään akseleille joka ruutu.
//
// Siirtymä = CinemachineBrainin blendi (EaseInOut) uuteen lepokameraan Ytimen lennon jäljellä olevassa ajassa, joten
// leikkausikkuna, teksti ja kertojan puhe pysyvät Ytimen ajoituksessa. Napautus kesken lennon vaihtaa kohteen, ja brain
// blendaa keskeneräisestä blendistä uuteen (ei hyppyä). Saapumiskaari järveltä on ainoa poikkeus: sen polku tulee Ytimestä
// (NakymaHetkella) läpikulkukameralle "lento", ja kaaren lopussa blendataan yleisnäkymän lepokameraan.
//
// Eloisuus: BasicMultiChannelPerlin (käsivarakameran hengitys, kiertokohina yhteensä alle 0,3°), vähennetyllä liikkeellä pois.
// Testikomennot: "poikki cinemachine 0|1" (A/B vanhaan jouseen), "poikki kohina 0|1", "poikki cm" (tila lokiin).
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Unity.Cinemachine;
using Unity.Cinemachine.TargetTracking;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaCinemachine
    {
        public static bool Paalla = true, Kohina = true;

        /// <summary>Blendi saapumiskaaren lopusta lepoon ja lyhin lepojen välinen blendi (s). Jalkivenyma: blendi jatkuu tämän
        /// verran Ytimen lennon jälkeen (A/B 5.10.: pelkällä lennon ajalla huippunopeus oli ~30 % jousta suurempi, ruutuerojen p99
        /// 21,1 vs. 16,5); jousikin jäi Ytimestä jälkeen, joten leikkausikkuna ja teksti eivät kärsi.</summary>
        const float SaapumisenLoppuS = 0.5f, LyhinBlendiS = 0.8f, JalkivenymaS = 0.8f;

        /// <summary>Blendin käyrä (A/B 2, 50a2d578): EaseInOut kasasi liikkeen keskelle (huippu 1,5 × keskinopeus, ruutuerot
        /// p99 19,8 vs. jousen 16,5). Tämä käyrä kiihtyy 20 %:ssa tasaiseen 1,25 × keskinopeuteen ja jarruttaa samoin.</summary>
        static readonly AnimationCurve Kayra = new AnimationCurve(
            new Keyframe(0f, 0f, 0f, 0f), new Keyframe(0.2f, 0.125f, 1.25f, 1.25f),
            new Keyframe(0.8f, 0.875f, 1.25f, 1.25f), new Keyframe(1f, 1f, 0f, 0f));
        const string Lento = "lento";

        sealed class Lepo
        {
            public CinemachineCamera Cam;
            public CinemachineOrbitalFollow Orbit;
            public CinemachineBasicMultiChannelPerlin Perlin;
            public Transform Kohde;
            public Asento Perus;
        }

        readonly Transform juuri;
        readonly CinemachineBrain aivot;
        readonly Dictionary<string, Lepo> lepot = new Dictionary<string, Lepo>();
        readonly CinemachineCamera lento;
        readonly CinemachineBasicMultiChannelPerlin lentoPerlin;
        readonly NoiseSettings kohina;
        int prioriteetti = 10;
        /// <summary>DioraamaSovitin.Puolilahikuva-avaimen pääte ("tila:x|puhuja|puolilahi").</summary>
        public const string PuolilahiPaate = "|puolilahi";

        /// <summary>Elävä kamera (lepoavain tai "lento"); null = seuraava vaihto on leikkaus.</summary>
        public string Elava { get; private set; }

        public DioraamaCinemachine(Camera kamera, Transform isa)
        {
            aivot = kamera.GetComponent<CinemachineBrain>();
            if (aivot == null) aivot = kamera.gameObject.AddComponent<CinemachineBrain>();
            aivot.UpdateMethod = CinemachineBrain.UpdateMethods.ManualUpdate;
            aivot.IgnoreTimeScale = true;
            aivot.DefaultBlend = new CinemachineBlendDefinition(CinemachineBlendDefinition.Styles.Cut, 0f);
            juuri = new GameObject("Cinemachine").transform;
            juuri.SetParent(isa, false);
            kohina = LuoKohina();
            var lg = new GameObject("CM " + Lento);
            lg.SetActive(false);
            lg.transform.SetParent(juuri, false);
            lento = lg.AddComponent<CinemachineCamera>();
            lentoPerlin = LisaaPerlin(lg);
            lento.Priority = 0;
            lg.SetActive(true);
        }

        /// <summary>Käsivarakameran hengitys: kaksi oktaavia kiertokohinaa, huippu yhteensä alle 0,3° (suunnitelma kohta 1).</summary>
        static NoiseSettings LuoKohina()
        {
            var n = ScriptableObject.CreateInstance<NoiseSettings>();
            NoiseSettings.NoiseParams P(float f, float a) => new NoiseSettings.NoiseParams { Frequency = f, Amplitude = a, Constant = false };
            n.OrientationNoise = new[]
            {
                new NoiseSettings.TransformNoiseParams { X = P(0.21f, 0.10f), Y = P(0.15f, 0.13f), Z = P(0.09f, 0.03f) },
                new NoiseSettings.TransformNoiseParams { X = P(0.73f, 0.03f), Y = P(0.61f, 0.04f), Z = P(0f, 0f) },
            };
            return n;
        }

        CinemachineBasicMultiChannelPerlin LisaaPerlin(GameObject g)
        {
            var p = g.AddComponent<CinemachineBasicMultiChannelPerlin>();
            p.NoiseProfile = kohina;
            return p;
        }

        Lepo Hae(string avain)
        {
            if (lepot.TryGetValue(avain, out var l)) return l;
            var g = new GameObject("CM " + avain);
            g.SetActive(false);
            g.transform.SetParent(juuri, false);
            var kohde = new GameObject("kohde").transform;
            kohde.SetParent(g.transform, false);
            l = new Lepo { Kohde = kohde, Cam = g.AddComponent<CinemachineCamera>() };
            l.Cam.Follow = kohde;
            l.Cam.LookAt = kohde;
            l.Cam.Priority = 0;
            l.Cam.BlendHint = CinemachineCore.BlendHints.SphericalPosition;
            l.Orbit = g.AddComponent<CinemachineOrbitalFollow>();
            l.Orbit.OrbitStyle = CinemachineOrbitalFollow.OrbitStyles.Sphere;
            var ts = l.Orbit.TrackerSettings;
            ts.BindingMode = BindingMode.WorldSpace;
            ts.PositionDamping = Vector3.zero; ts.RotationDamping = Vector3.zero; ts.QuaternionDamping = 0f;
            l.Orbit.TrackerSettings = ts;
            l.Orbit.HorizontalAxis.Range = new Vector2(-180f, 180f); l.Orbit.HorizontalAxis.Wrap = true;
            l.Orbit.HorizontalAxis.Recentering.Enabled = false;
            l.Orbit.VerticalAxis.Range = new Vector2(-89f, 89f); l.Orbit.VerticalAxis.Wrap = false;
            l.Orbit.VerticalAxis.Recentering.Enabled = false;
            l.Orbit.RadialAxis.Range = new Vector2(1f, 1f); l.Orbit.RadialAxis.Value = 1f;
            l.Orbit.RadialAxis.Recentering.Enabled = false;
            g.AddComponent<CinemachineHardLookAt>();
            l.Perlin = LisaaPerlin(g);
            g.SetActive(true);
            lepot[avain] = l;
            return l;
        }

        /// <summary>Ytimen asento lepokameran akseleiksi (ks. tiedoston alkukommentti).</summary>
        static void Aseta(Lepo l, Asento a, Camera kamera)
        {
            l.Kohde.position = DioraamaNayttamo.UnityPiste(a.Kohde);
            l.Orbit.HorizontalAxis.Value = Mathf.Repeat((float)a.Atsimuutti + 180f + 180f, 360f) - 180f;
            l.Orbit.VerticalAxis.Value = Mathf.Clamp((float)a.Korkeus, -89f, 89f);
            l.Orbit.Radius = Mathf.Max(0.01f, (float)a.Etaisyys);
            AsetaLinssi(l.Cam, a, kamera);
        }

        static void AsetaLinssi(CinemachineCamera c, Asento a, Camera kamera)
        {
            var lens = c.Lens;
            lens.FieldOfView = Mathf.Clamp((float)a.Fov, 1f, 179f);
            lens.NearClipPlane = kamera.nearClipPlane;
            lens.FarClipPlane = kamera.farClipPlane;
            c.Lens = lens;
        }

        /// <summary>Seuraava vaihto leikkaa (avaus, saapumisen odotus, pakotettu kamera).</summary>
        public void Nollaa() => Elava = null;

        /// <summary>Päivittää kamerat ja ajaa brainin. ydin = NakymaHetkella.Kamera (saapumiskaaren polku), lepo =
        /// LepoHetkella, muokkaa = jatkuva orbit + pelaajan poikkeama (sama kuin vanhalla jousipolulla).</summary>
        public void Paivita(Camera kamera, Asento ydin, (string Avain, Asento Perus, double Jaljella, bool Saapumassa) lepo,
            System.Func<Asento, Asento> muokkaa, bool vahennettyLiike, float dt)
        {
            Hae(lepo.Avain).Perus = lepo.Perus;
            foreach (var l in lepot.Values) Aseta(l, muokkaa(l.Perus), kamera);
            if (lepo.Saapumassa)
            {
                var a = muokkaa(ydin);
                var (sijainti, kohde) = Kameraliike.AsentoSijainti(a);
                Vector3 p = DioraamaNayttamo.UnityPiste(sijainti), s = DioraamaNayttamo.UnityPiste(kohde) - p;
                lento.transform.SetPositionAndRotation(p, s.sqrMagnitude > 1e-8f ? Quaternion.LookRotation(s, Vector3.up) : lento.transform.rotation);
                AsetaLinssi(lento, a, kamera);
            }
            string tavoite = lepo.Saapumassa ? Lento : lepo.Avain;
            if (tavoite != Elava)
            {
                // Puhujan vaihto puolilähikuvassa leikkaa (kuva–vastakuva): blendi kulki tyhjän tilan kautta (eleet-2-ajo 7.10.: tyhjät penkit
                // t 22,0 ja 29,2 s). Lepokuvasta puolilähiin ja takaisin blendataan kuten ennen.
                bool puhujanVaihto = Elava != null && Elava.EndsWith(PuolilahiPaate, System.StringComparison.Ordinal) && tavoite.EndsWith(PuolilahiPaate, System.StringComparison.Ordinal);
                float kesto = Elava == null || puhujanVaihto ? 0f : Elava == Lento ? SaapumisenLoppuS : Mathf.Max(LyhinBlendiS, (float)lepo.Jaljella + JalkivenymaS);
                aivot.DefaultBlend = kesto <= 0f ? new CinemachineBlendDefinition(CinemachineBlendDefinition.Styles.Cut, 0f)
                    : new CinemachineBlendDefinition(CinemachineBlendDefinition.Styles.Custom, kesto) { CustomCurve = Kayra };
                (tavoite == Lento ? lento : lepot[tavoite].Cam).Priority = ++prioriteetti;
                Elava = tavoite;
            }
            float vahvuus = Kohina && !vahennettyLiike ? 1f : 0f;
            lentoPerlin.AmplitudeGain = vahvuus;
            foreach (var l in lepot.Values) l.Perlin.AmplitudeGain = vahvuus;
            aivot.ManualUpdate(Time.frameCount, dt);
        }

        /// <summary>Historiamoottorin kävelytila: aivot ajetaan pelaajan olan yli -kameralle (prioriteetti kaikkien lepokameroiden yli).
        /// Jos aivot eivät valitse sitä (rekisteri, kanava), kameran tila kopioidaan suoraan, ettei kuva jää lepokameraan. Palauttaa
        /// diagnostiikan ("aivot" tai "suora") ja Elava nollataan, jotta paluu lepoon leikkaa.</summary>
        public string PaivitaPelaaja(CinemachineCamera pelaaja, Camera kamera, float dt)
        {
            if (pelaaja.Priority.Value <= prioriteetti) pelaaja.Priority = prioriteetti + 1000;
            Elava = null;
            lentoPerlin.AmplitudeGain = 0f;
            foreach (var l in lepot.Values) l.Perlin.AmplitudeGain = 0f;
            aivot.ManualUpdate(Time.frameCount, dt);
            if (ReferenceEquals(aivot.ActiveVirtualCamera, pelaaja)) return "aivot";
            pelaaja.InternalUpdateCameraState(Vector3.up, dt);
            var st = pelaaja.State;
            kamera.transform.SetPositionAndRotation(st.GetFinalPosition(), st.GetFinalOrientation());
            kamera.fieldOfView = st.Lens.FieldOfView;
            return "suora (aivot: " + (aivot.ActiveVirtualCamera?.Name ?? "-") + ")";
        }

        /// <summary>"poikki cm": elävä kamera, blendi ja kameran ero Ytimen asentoon (sama muokkaus) lokiin.</summary>
        public string Tila(Camera kamera, Asento odotettu)
        {
            var (sijainti, _) = Kameraliike.AsentoSijainti(odotettu);
            float ero = Vector3.Distance(kamera.transform.position, DioraamaNayttamo.UnityPiste(sijainti));
            return $"cinemachine {(Paalla ? "päällä" : "pois")}, elävä {Elava ?? "-"}, blendi {(aivot.IsBlending ? "kesken" : "ei")}, " +
                   $"lepokameroita {lepot.Count}, kohina {(Kohina ? "päällä" : "pois")}, ero Ytimeen {ero:F3} m, fov {kamera.fieldOfView:F1}";
        }

        public void Kaytossa(bool paalla)
        {
            if (aivot.enabled == paalla) return;
            aivot.enabled = paalla;
            juuri.gameObject.SetActive(paalla);
            Elava = null;
        }
    }
}
