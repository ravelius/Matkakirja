using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja
{
    /// <summary>
    /// TASOT 2–3 ARKKITYYPPEINÄ (omistajan linjaus 26.9. klo 16.5x, suunnitelman kohta 11, sitova): tasojen 2–3 nostojen
    /// musteläikät ja kuvamerkit korvataan pienellä 3D-arkkityypillä (sama kirjasto kuin tasolla 1, ArkkityyppiKartoitus).
    ///
    ///  - KOKO vakio ruudulla: taso 2 = 0,6 × ja taso 3 = 0,45 × tason 1 <see cref="KokoPt"/>; kertoimilla 2,5–4 lisäksi
    ///    155:n kuvamerkkien pienennys 0,85 (NostoSaannot.KuvamerkkiPieni / TyyppimerkinPieniKoko). Kallistus näyttää
    ///    sivuprofiilin (malli seisoo pinnan normaalin suuntaan kuten tasolla 1).
    ///  - KYNNYKSET kuten 155:n kuvamerkeillä: NostoSaannot.KuvamerkkiKaytossa (kartan kerroin ≥ 2,5); taso 3 lisäksi vain
    ///    lähizoomissa (NostoKerros.Naytettavat, NostoSaannot.Portti). Kynnyksen alla 2D-merkit jäävät ennalleen
    ///    (<see cref="OnMalli"/> epätosi).
    ///  - LÖYTÄMÄTÖN himmeänä musteena (varjostin: desaturoitu, peitto 0,55, mustereuna); löydetty täysväreinä
    ///    <see cref="SyttyminenS"/>:n syttymisellä (musteesta väreihin). Koko kerros häivähtää NostoKerros.Syttyminen-arvon
    ///    mukaan kuten 2D-merkit (myös saapumisen piilotus).
    ///  - PIIRTO GPU-instansointina: Graphics.RenderMeshInstanced yksi kutsu per arkkityyppi ja LOD (enintään 30 kutsua),
    ///    jaettu materiaali (Resources/SymbolimalliInstansoitu.mat, jotta instansointivariantti pysyy käännöksessä),
    ///    instanssin tila MaterialPropertyBlockin taulukossa _Tila = (muste, piilo).
    ///  - LOD ruutukoon mukaan: LOD0, kun malli on vähintään <see cref="Lod1RajaPt"/> pt, muuten LOD1; takaisin LOD0:aan
    ///    vasta 10 % suuremmalla (hystereesi). TODO LOD2: alle <see cref="Lod2RajaPt"/> pt:n siluettikvadi arkkityypin
    ///    atlaksesta (kaksi kolmiota) vaatii atlaksen leivonnan editorissa; siihen asti LOD1.
    ///  - LEPO (PallonLepo): kehyksessä, jota ei piirretä (OnDemandRendering), ei tehdä mitään. Instanssien matriisit ja
    ///    tilat lasketaan uudelleen vain, kun kamera, näytettävät (NostoKerros.Paivittyi), kerroin, syttyminen tai
    ///    asetukset muuttuvat tai syttyminen on käynnissä; muuten piirretään edelliset taulukot sellaisinaan.
    /// A/B-mittaus: `symbolit taso23 0|1` (oletus 1).
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Tasojen 2–3 arkkityypit päällä (komento `symbolit taso23 0|1`, A/B-mittaus).</summary>
        public static bool Taso23 = true;
        /// <summary>Tason 2 ja 3 ruutukoko tason 1 KokoPt:stä (omistaja 26.9. kohta 11).</summary>
        public const float Taso2Koko = 0.6f, Taso3Koko = 0.45f;
        /// <summary>Löydetyn syttyminen musteesta täysiin väreihin (s).</summary>
        public const float SyttyminenS = 0.4f;
        /// <summary>LOD0 ≥ tämä (pt), muuten LOD1; nousu takaisin LOD0:aan (1 + LodHystereesi) × raja.</summary>
        public const float Lod1RajaPt = 48f, LodHystereesi = 0.1f;
        /// <summary>TODO LOD2 (siluettikvadi atlaksesta) tämän alle; atlas vaatii editorin, joten nyt LOD1.</summary>
        public const float Lod2RajaPt = 18f;
        /// <summary>Instansseja enintään per arkkityyppi ja LOD (NostoKerroksen katto on 120).</summary>
        const int EnintaanErassa = 128;

        static void NollaaTasot23() { Taso23 = true; }

        /// <summary>Piirretäänkö tason 2–3 nostolle arkkityyppi nyt (OnMalli ja piirto käyttävät samaa ehtoa).</summary>
        static bool Taso23Kaytossa(int taso)
        {
            if (!Taso23 || taso < 2 || instanssi == null || !instanssi.instansointi) return false;
            var nk = NostoKerros.Instanssi;
            return nk != null && NostoSaannot.KuvamerkkiKaytossa(taso, nk.ZoomKerroin);
        }

        /// <summary>Tason 2–3 noston instanssi: paikka ja asento (georeferenssin paikallinen), LOD ja syttyminen.</summary>
        sealed class Instanssi23
        {
            public Vector3 Paikka, Normaali;
            public Quaternion Asento;
            public int Lod = -1;
            public bool Nahty, Loydetty;
            public float SyttyAlku = -1f;
        }

        readonly Dictionary<string, Instanssi23> instanssit23 = new Dictionary<string, Instanssi23>(StringComparer.Ordinal);
        bool instansointi;
        Material instMateriaali;
        Matrix4x4[][] matriisit;
        Vector4[][] tilat;
        int[] lkm;
        MaterialPropertyBlock[] lohkot;
        Bounds rajat;
        bool animoi23, tilatMuuttuivat;
        static readonly int TilaId = Shader.PropertyToID("_Tila");

        // Lepotarkistus: edellisen laskennan lähtötiedot.
        NostoKerros tilattu;
        int nostoVersio, laskettuVersio = -1;
        Matrix4x4 laskettuKamera, laskettuPallo;
        float laskettuFov, laskettuKerroin, laskettuSyttyminen, laskettuKoko;
        int laskettuKorkeus;
        bool laskettuPakota;

        // Tila (`symbolit tila`): viimeisimmän laskennan määrät.
        readonly int[,] tyypeittain = new int[2, ArkkityyppiKartoitus.Lukumaara];
        readonly int[] tasoittain = new int[2], lodeittain = new int[2];
        int piirtokutsuja, kolmioita23;

        void OnEnable() => PallonLepo.Animoi(Syttyy23, "symbolimallit: syttyminen");
        void OnDisable()
        {
            PallonLepo.Poista(Syttyy23);
            if (tilattu != null) tilattu.Paivittyi -= NostotPaivittyivat;
            tilattu = null;
        }
        bool Syttyy23() => animoi23;
        void NostotPaivittyivat() => nostoVersio++;

        void AloitaTasot23(Shader varjostin)
        {
            instansointi = SystemInfo.supportsInstancing;
            if (!instansointi) { Debug.LogWarning("MATKAKIRJA symbolimallit: GPU-instansointi ei tuettu, tasot 2–3 ilman malleja"); return; }
            var pohja = Resources.Load<Material>("SymbolimalliInstansoitu");
            instMateriaali = pohja != null ? new Material(pohja) : new Material(varjostin);
            instMateriaali.name = "Symbolimalli (instanssit)";
            instMateriaali.enableInstancing = true;
            int n = ArkkityyppiKartoitus.Lukumaara * 2;
            matriisit = new Matrix4x4[n][];
            tilat = new Vector4[n][];
            lkm = new int[n];
            lohkot = new MaterialPropertyBlock[n];
            for (int i = 0; i < n; i++)
            {
                matriisit[i] = new Matrix4x4[EnintaanErassa];
                tilat[i] = new Vector4[EnintaanErassa];
                lohkot[i] = new MaterialPropertyBlock();
            }
        }

        /// <summary>Tasojen 2–3 instanssit tälle kehykselle; nk = null, kun nostot eivät ole sallittuja (linssi, lento …).</summary>
        void PiirraTasot23(NostoKerros nk)
        {
            if (!instansointi || kamera == null) return;
            if (nk != tilattu)
            {
                if (tilattu != null) tilattu.Paivittyi -= NostotPaivittyivat;
                tilattu = nk;
                if (nk != null) nk.Paivittyi += NostotPaivittyivat;
                nostoVersio++;
            }
            if (nk == null || !Taso23)
            {
                if (animoi23 || piirtokutsuja > 0 || tasoittain[0] + tasoittain[1] > 0) Tyhjenna23();
                return;
            }
            // Kehystä ei piirretä (Ruudunpaivitys harventaa levossa): ei laskentaa eikä piirtokutsuja.
            if (!OnDemandRendering.willCurrentFrameRender) return;
            if (animoi23 || Muuttunut(nk)) Laske23(nk);
            Piirra23();
        }

        bool Muuttunut(NostoKerros nk)
        {
            var kameraM = kamera.transform.localToWorldMatrix;
            var palloM = georeferenssi.transform.localToWorldMatrix;
            bool muuttui = laskettuVersio != nostoVersio || laskettuKamera != kameraM || laskettuPallo != palloM
                           || laskettuFov != kamera.fieldOfView || laskettuKerroin != nk.ZoomKerroin || laskettuSyttyminen != nk.Syttyminen
                           || laskettuKoko != KokoPt || laskettuKorkeus != Screen.height || laskettuPakota != PakotaLoydetty;
            if (!muuttui) return false;
            laskettuVersio = nostoVersio; laskettuKamera = kameraM; laskettuPallo = palloM; laskettuFov = kamera.fieldOfView;
            laskettuKerroin = nk.ZoomKerroin; laskettuSyttyminen = nk.Syttyminen; laskettuKoko = KokoPt;
            laskettuKorkeus = Screen.height; laskettuPakota = PakotaLoydetty;
            return true;
        }

        void Tyhjenna23()
        {
            Array.Clear(lkm, 0, lkm.Length);
            Array.Clear(tyypeittain, 0, tyypeittain.Length);
            Array.Clear(tasoittain, 0, tasoittain.Length);
            Array.Clear(lodeittain, 0, lodeittain.Length);
            piirtokutsuja = kolmioita23 = 0;
            animoi23 = false;
            laskettuVersio = -1;
        }

        void Laske23(NostoKerros nk)
        {
            Tyhjenna23();
            laskettuVersio = nostoVersio;
            var gt = georeferenssi.transform;
            var paikallinen = gt.localToWorldMatrix;
            Vector3 kp = kamera.transform.position;
            float skaala = Mathf.Max(1e-9f, gt.lossyScale.x), nyt = Time.unscaledTime, piilo = 1f - nk.Syttyminen;
            bool rajatAlussa = true;
            foreach (var s in nk.Naytettavat)
            {
                if (s.Taso < 2 || s.Id == null || !NostoSaannot.KuvamerkkiKaytossa(s.Taso, nk.ZoomKerroin)) continue;
                var tieto = TietoNostolle(s);
                if (!instanssit23.TryGetValue(s.Id, out var i))
                {
                    i = new Instanssi23();
                    // Piirtopiste (ankkuri tai ladottu) kuten 2D-merkillä, jonka paikalle malli tulee.
                    Asento(s.Lat, s.Lon, out i.Paikka, out i.Asento, out i.Normaali);
                    instanssit23[s.Id] = i;
                }
                Vector3 p = gt.TransformPoint(i.Paikka);
                Vector3 kohti = kp - p;
                float etaisyys = kohti.magnitude;
                if (Vector3.Dot(gt.TransformDirection(i.Normaali).normalized, kohti / Mathf.Max(1e-6f, etaisyys)) <= 0.08f) continue;

                float pt = KokoPt * (s.Taso == 2 ? Taso2Koko : Taso3Koko)
                           * (NostoSaannot.KuvamerkkiPieni(s.Taso, nk.ZoomKerroin) ? NostoSaannot.TyyppimerkinPieniKoko : 1f);
                if (i.Lod < 0) i.Lod = pt >= Lod1RajaPt ? 0 : 1;
                else if (i.Lod == 0 && pt < Lod1RajaPt) i.Lod = 1;
                else if (i.Lod == 1 && pt >= Lod1RajaPt * (1f + LodHystereesi)) i.Lod = 0;

                // Syttyminen: ensimmäinen näkeminen asettaa tilan suoraan, löytö näkyvissä käynnistää 0,4 s:n siirtymän.
                bool loydetty = s.Loydetty || PakotaLoydetty;
                if (!i.Nahty) { i.Nahty = true; i.Loydetty = loydetty; i.SyttyAlku = -1f; }
                else if (loydetty && !i.Loydetty) { i.Loydetty = true; i.SyttyAlku = nyt; }
                else if (!loydetty) { i.Loydetty = false; i.SyttyAlku = -1f; }
                float muste = 1f;
                if (i.Loydetty)
                {
                    muste = i.SyttyAlku < 0f ? 0f : 1f - Mathf.Clamp01((nyt - i.SyttyAlku) / SyttyminenS);
                    if (muste > 0f) animoi23 = true; else i.SyttyAlku = -1f;
                }

                int e = (int)tieto.Tyyppi * 2 + i.Lod;
                if (lkm[e] >= EnintaanErassa) continue;
                float koko = PisteMaailmassa(etaisyys) * pt / skaala;
                matriisit[e][lkm[e]] = paikallinen * Matrix4x4.TRS(i.Paikka, i.Asento, Vector3.one * koko);
                tilat[e][lkm[e]] = new Vector4(muste, piilo, 0f, 0f);
                lkm[e]++;
                var b = new Bounds(p, Vector3.one * (2f * koko * skaala));
                if (rajatAlussa) { rajat = b; rajatAlussa = false; } else rajat.Encapsulate(b);
                tyypeittain[s.Taso == 2 ? 0 : 1, (int)tieto.Tyyppi]++;
                tasoittain[s.Taso == 2 ? 0 : 1]++;
                lodeittain[i.Lod]++;
            }
            tilatMuuttuivat = true;
        }

        void Piirra23()
        {
            piirtokutsuja = kolmioita23 = 0;
            var rp = new RenderParams(instMateriaali)
            {
                camera = kamera,
                layer = gameObject.layer,
                shadowCastingMode = ShadowCastingMode.Off,
                receiveShadows = false,
                worldBounds = rajat,
            };
            for (int e = 0; e < lkm.Length; e++)
            {
                if (lkm[e] == 0) continue;
                if (tilatMuuttuivat) lohkot[e].SetVectorArray(TilaId, tilat[e]);
                rp.matProps = lohkot[e];
                var a = (Arkkityyppi)(e / 2);
                Graphics.RenderMeshInstanced(rp, ArkkityypinVerkko(a, e % 2), 0, matriisit[e], lkm[e]);
                piirtokutsuja++;
                kolmioita23 += lkm[e] * ArkkityypinKolmiot(a, e % 2);
            }
            tilatMuuttuivat = false;
        }

        /// <summary>Tasojen 2–3 tila `symbolit tila` -riville.</summary>
        void Tasot23Tila(System.Text.StringBuilder sb)
        {
            if (!instansointi) { sb.Append("tasot 2–3: instansointi ei tuettu"); return; }
            for (int t = 0; t < 2; t++)
            {
                sb.Append("taso ").Append(t + 2).Append(": ").Append(tasoittain[t]).Append(" instanssia");
                for (int a = 0; a < ArkkityyppiKartoitus.Lukumaara; a++)
                    if (tyypeittain[t, a] > 0) sb.Append(' ').Append((Arkkityyppi)a).Append('×').Append(tyypeittain[t, a]);
                sb.Append("; ");
            }
            sb.Append($"LOD0 {lodeittain[0]}, LOD1 {lodeittain[1]} (raja {Lod1RajaPt:0} pt, LOD2 < {Lod2RajaPt:0} pt TODO), " +
                      $"piirtokutsuja {piirtokutsuja}, kolmioita {kolmioita23}, syttyy {animoi23}");
        }
    }
}
