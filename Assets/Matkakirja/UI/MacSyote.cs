// MAC-SYÖTE (Natiivi-UI 30.9.2026; omistaja Päätoimittajan kautta: "saako macin ipad appiin kahden sormen panoroinnin
// karttaan ja teksteihin sekä kahden sormen pinch zoomauksen karttaan?"). Vain kun iPad-sovellus ajetaan Macilla
// (NSProcessInfo.isiOSAppOnMac; Plugins/iOS/MatkakirjaMacSyote.mm) tai testikomento pakottaa:
//   - ohjauslevyn kahden sormen veto: kartta panoroi, tekstit (ScrollView osoittimen alla) vierivät
//   - ohjauslevyn nipistys: kartta zoomaa osoittimen kohtaan
//   - hiiren rulla: kartta zoomaa osoittimen kohtaan, tekstit vierivät
// Kartan eleet menevät PalloKierron samoille rajoille kuin sormet (MacPanoroi, MacZoomaa). Unityn trampoliini välittää
// hiiren rullan myös Input Systemille (GCMouse → Mouse.scroll), jolloin UI Toolkit voi vierittää tekstiä itse: jos se
// näkyy samassa ruudussa, tämä luovuttaa tekstin vierityksen Unitylle (lukitus lähteittäin), ettei teksti vieri kahdesti.
// Testit simulaattorissa: ui mac tila | pakota | veto dx dy [x y] | rulla dy [x y] | nipistys s [x y].
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;
using Unity.Mathematics;

namespace Matkakirja.Natiivi
{
    public sealed class MacSyote : MonoBehaviour
    {
        /// <summary>Rullan zoomin herkkyys: kerroin = exp(pikselit × tämä), noin 1,1 per rullan askel.</summary>
        const float RullanZoomi = 0.006f;

        static MacSyote instanssi;
        bool kaytossa, pakotettu;
        int yrityksia;
        bool vetoUnitylle, rullaUnitylle;
        string viimeKohde = "–";
        int tapahtumia;
        readonly float[] luku = new float[8];

        /// <summary>Tunnistimet asennettu (Mac tai pakotettu testi).</summary>
        public static bool Kaytossa => instanssi != null && instanssi.kaytossa;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Luo()
        {
#if UNITY_IOS && !UNITY_EDITOR
            if (instanssi != null) return;
            var go = new GameObject("MacSyote");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<MacSyote>();
#endif
        }

        /// <summary>Testikomento: asentaa tunnistimet myös muualla kuin Macilla (ui mac pakota).</summary>
        public static string Pakota()
        {
            if (instanssi == null)
            {
                var go = new GameObject("MacSyote");
                DontDestroyOnLoad(go);
                instanssi = go.AddComponent<MacSyote>();
            }
            instanssi.pakotettu = true;
            instanssi.yrityksia = 0;
            instanssi.Asenna();
            return Tila();
        }

        public static string Tila() => instanssi == null ? "ei luotu"
            : $"käytössä {instanssi.kaytossa} (pakotettu {instanssi.pakotettu}), tapahtumia {instanssi.tapahtumia}, " +
              $"teksti Unitylle: veto {instanssi.vetoUnitylle}, rulla {instanssi.rullaUnitylle}, viimeksi {instanssi.viimeKohde}";

        void Asenna()
        {
#if UNITY_IOS && !UNITY_EDITOR
            kaytossa = MatkakirjaMacSyote_Asenna(pakotettu ? 1 : 0) != 0;
#endif
            if (kaytossa) Debug.Log("MATKAKIRJA mac-syöte: tunnistimet käytössä" + (pakotettu ? " (pakotettu)" : ""));
        }

        void Update()
        {
            if (!kaytossa)
            {
                // Unityn näkymä voi puuttua ensimmäisissä ruuduissa; Macilla yritetään hetken, muualla ei kertaakaan.
                if (yrityksia++ < 120 && (pakotettu || yrityksia == 1 || yrityksia % 30 == 0)) Asenna();
                return;
            }
#if UNITY_IOS && !UNITY_EDITOR
            var a = luku;
            MatkakirjaMacSyote_Lue(a);
            tapahtumia = (int)a[7];
            if (a[0] != 0 || a[1] != 0 || a[2] != 0 || a[3] != 0 || a[4] != 1f)
                Kasittele(new Vector2(a[0], a[1]), new Vector2(a[2], a[3]), a[4], new Vector2(a[5], a[6]));
#endif
        }

        /// <summary>Testikomento: sama käsittely kuin tunnistimilta (pikselit, origo vasen yläkulma kuten UIKitissä).</summary>
        public static string Testi(Vector2 veto, Vector2 rulla, float nipistys, Vector2 osoitin)
        {
            if (instanssi == null) Pakota();
            instanssi.Kasittele(veto, rulla, nipistys, osoitin);
            return instanssi.viimeKohde;
        }

        /// <summary>veto ja rulla UIKitin suunnassa (y alas), osoitin yläkulmasta; negatiivinen osoitin = hiiren paikka.</summary>
        void Kasittele(Vector2 veto, Vector2 rulla, float nipistys, Vector2 osoitin)
        {
            Vector2 ruutu = osoitin.x >= 0 && osoitin.y >= 0
                ? new Vector2(osoitin.x, Screen.height - osoitin.y)
                : Mouse.current != null ? Mouse.current.position.ReadValue() : new Vector2(Screen.width / 2f, Screen.height / 2f);
            bool unityRullaa = Mouse.current != null && Mouse.current.scroll.ReadValue().sqrMagnitude > 0f;
            bool uiPeittaa = UiKerros.Peittaa(ruutu);
            var kierto = uiPeittaa ? null : FindAnyObjectByType<PalloKierto>();

            if (veto != Vector2.zero)
            {
                if (uiPeittaa)
                {
                    if (unityRullaa) vetoUnitylle = true;
                    viimeKohde = vetoUnitylle ? "veto: teksti Unitylle" : "veto: " + Vierita(ruutu, veto);
                }
                else viimeKohde = kierto != null && kierto.MacPanoroi(new float2(veto.x, -veto.y)) ? "veto: kartta" : "veto: kartta estetty";
            }
            if (rulla != Vector2.zero)
            {
                if (uiPeittaa)
                {
                    if (unityRullaa) rullaUnitylle = true;
                    viimeKohde = rullaUnitylle ? "rulla: teksti Unitylle" : "rulla: " + Vierita(ruutu, rulla);
                }
                else
                {
                    // Rulla eteenpäin (sisältö alas) tuo kartan lähemmäs.
                    double k = math.exp(rulla.y * RullanZoomi);
                    viimeKohde = kierto != null && kierto.MacZoomaa(k, ruutu) ? $"rulla: zoomi {k:0.###}" : "rulla: kartta estetty";
                }
            }
            if (nipistys > 0f && nipistys != 1f)
                viimeKohde = uiPeittaa ? "nipistys: UI (ohitettu)"
                    : kierto != null && kierto.MacZoomaa(nipistys, ruutu) ? $"nipistys: zoomi {nipistys:0.###}" : "nipistys: kartta estetty";
        }

        /// <summary>Osoittimen alla olevan ScrollViewn vieritys: sisältö seuraa sormia (UIKitin y alas).</summary>
        static string Vierita(Vector2 ruutu, Vector2 pikselit)
        {
            var sv = UiKerros.Hae().VieritettavaPisteessa(ruutu, out float k);
            if (sv == null) return "ei vieritettävää";
            sv.scrollOffset -= pikselit / k;
            return "teksti " + (sv.name ?? sv.GetType().Name) + $" {sv.scrollOffset.y:0}";
        }

#if UNITY_IOS && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")]
        static extern int MatkakirjaMacSyote_Asenna(int pakota);
        [System.Runtime.InteropServices.DllImport("__Internal")]
        static extern void MatkakirjaMacSyote_Lue(float[] ulos);
#endif
    }
}
